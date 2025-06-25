var kf = Object.defineProperty;
var mc = (e) => {
  throw TypeError(e);
};
var zf = (e, t, r) => t in e ? kf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var L = (e, t, r) => zf(e, typeof t != "symbol" ? t + "" : t, r), ji = (e, t, r) => t.has(e) || mc("Cannot " + r);
var Qt = (e, t, r) => (ji(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Ue = (e, t, r) => t.has(e) ? mc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Je = (e, t, r, n) => (ji(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), fs = (e, t, r) => (ji(e, t, "access private method"), r);
function Gf(e, t) {
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
function V_() {
  return {
    FUEL_CORE: "0.41.9",
    FORC: "0.67.0",
    FUELS: "0.100.0"
  };
}
function yc(e) {
  const [t, r, n] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: r, patch: n };
}
function ui(e, t) {
  const r = yc(e), n = yc(t), s = r.major - n.major, i = r.minor - n.minor, a = r.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: a,
    fullVersionDiff: s || i || a
  };
}
function Uf(e, t) {
  const { fullVersionDiff: r } = ui(e, t);
  return r >= 0;
}
function Vf(e, t) {
  const { major: r } = ui(e, t);
  return r === 0;
}
function Yf(e, t) {
  const { minor: r } = ui(e, t);
  return r === 0;
}
function Hf(e, t) {
  const { patch: r } = ui(e, t);
  return r === 0;
}
function Xf(e) {
  const { FUEL_CORE: t } = V_();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: Vf(e, t),
    isMinorSupported: Yf(e, t),
    isPatchSupported: Hf(e, t)
  };
}
var Y_ = V_(), Zf = Object.defineProperty, Wf = (e, t, r) => t in e ? Zf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, jf = (e, t, r) => (Wf(e, t + "", r), r), M = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_ADDRESS = "invalid-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_URL = "invalid-url", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.INSUFFICIENT_FUNDS_OR_MAX_COINS = "not-enough-funds-or-max-coins-reached", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.ASSET_BURN_DETECTED = "asset-burn-detected", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ASSET_NOT_FOUND = "asset-not-found", e.NUMBER_TOO_BIG = "number-too-big", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(M || {}), Bs = class extends Error {
  constructor(t, r, n = {}, s = null) {
    super(r);
    L(this, "VERSIONS", Y_);
    L(this, "metadata");
    L(this, "rawError");
    L(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new Bs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(M);
    if (!n.includes(r.code))
      throw new Bs(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new Bs(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: a } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: a };
  }
}, C = Bs;
jf(C, "CODES", M);
var bc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function H_(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Jf(e) {
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
var xs = { exports: {} };
const qf = {}, $f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qf
}, Symbol.toStringTag, { value: "Module" })), Kf = /* @__PURE__ */ Jf($f);
var tA = xs.exports, Ic;
function eA() {
  return Ic || (Ic = 1, function(e) {
    (function(t, r) {
      function n(v, d) {
        if (!v) throw new Error(d || "Assertion failed");
      }
      function s(v, d) {
        v.super_ = d;
        var _ = function() {
        };
        _.prototype = d.prototype, v.prototype = new _(), v.prototype.constructor = v;
      }
      function i(v, d, _) {
        if (i.isBN(v))
          return v;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, v !== null && ((d === "le" || d === "be") && (_ = d, d = 10), this._init(v || 0, d || 10, _ || "be"));
      }
      typeof t == "object" ? t.exports = i : r.BN = i, i.BN = i, i.wordSize = 26;
      var a;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? a = window.Buffer : a = Kf.Buffer;
      } catch {
      }
      i.isBN = function(d) {
        return d instanceof i ? !0 : d !== null && typeof d == "object" && d.constructor.wordSize === i.wordSize && Array.isArray(d.words);
      }, i.max = function(d, _) {
        return d.cmp(_) > 0 ? d : _;
      }, i.min = function(d, _) {
        return d.cmp(_) < 0 ? d : _;
      }, i.prototype._init = function(d, _, A) {
        if (typeof d == "number")
          return this._initNumber(d, _, A);
        if (typeof d == "object")
          return this._initArray(d, _, A);
        _ === "hex" && (_ = 16), n(_ === (_ | 0) && _ >= 2 && _ <= 36), d = d.toString().replace(/\s+/g, "");
        var w = 0;
        d[0] === "-" && (w++, this.negative = 1), w < d.length && (_ === 16 ? this._parseHex(d, w, A) : (this._parseBase(d, _, w), A === "le" && this._initArray(this.toArray(), _, A)));
      }, i.prototype._initNumber = function(d, _, A) {
        d < 0 && (this.negative = 1, d = -d), d < 67108864 ? (this.words = [d & 67108863], this.length = 1) : d < 4503599627370496 ? (this.words = [
          d & 67108863,
          d / 67108864 & 67108863
        ], this.length = 2) : (n(d < 9007199254740992), this.words = [
          d & 67108863,
          d / 67108864 & 67108863,
          1
        ], this.length = 3), A === "le" && this._initArray(this.toArray(), _, A);
      }, i.prototype._initArray = function(d, _, A) {
        if (n(typeof d.length == "number"), d.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(d.length / 3), this.words = new Array(this.length);
        for (var w = 0; w < this.length; w++)
          this.words[w] = 0;
        var y, B, N = 0;
        if (A === "be")
          for (w = d.length - 1, y = 0; w >= 0; w -= 3)
            B = d[w] | d[w - 1] << 8 | d[w - 2] << 16, this.words[y] |= B << N & 67108863, this.words[y + 1] = B >>> 26 - N & 67108863, N += 24, N >= 26 && (N -= 26, y++);
        else if (A === "le")
          for (w = 0, y = 0; w < d.length; w += 3)
            B = d[w] | d[w + 1] << 8 | d[w + 2] << 16, this.words[y] |= B << N & 67108863, this.words[y + 1] = B >>> 26 - N & 67108863, N += 24, N >= 26 && (N -= 26, y++);
        return this._strip();
      };
      function o(v, d) {
        var _ = v.charCodeAt(d);
        if (_ >= 48 && _ <= 57)
          return _ - 48;
        if (_ >= 65 && _ <= 70)
          return _ - 55;
        if (_ >= 97 && _ <= 102)
          return _ - 87;
        n(!1, "Invalid character in " + v);
      }
      function u(v, d, _) {
        var A = o(v, _);
        return _ - 1 >= d && (A |= o(v, _ - 1) << 4), A;
      }
      i.prototype._parseHex = function(d, _, A) {
        this.length = Math.ceil((d.length - _) / 6), this.words = new Array(this.length);
        for (var w = 0; w < this.length; w++)
          this.words[w] = 0;
        var y = 0, B = 0, N;
        if (A === "be")
          for (w = d.length - 1; w >= _; w -= 2)
            N = u(d, _, w) << y, this.words[B] |= N & 67108863, y >= 18 ? (y -= 18, B += 1, this.words[B] |= N >>> 26) : y += 8;
        else {
          var b = d.length - _;
          for (w = b % 2 === 0 ? _ + 1 : _; w < d.length; w += 2)
            N = u(d, _, w) << y, this.words[B] |= N & 67108863, y >= 18 ? (y -= 18, B += 1, this.words[B] |= N >>> 26) : y += 8;
        }
        this._strip();
      };
      function f(v, d, _, A) {
        for (var w = 0, y = 0, B = Math.min(v.length, _), N = d; N < B; N++) {
          var b = v.charCodeAt(N) - 48;
          w *= A, b >= 49 ? y = b - 49 + 10 : b >= 17 ? y = b - 17 + 10 : y = b, n(b >= 0 && y < A, "Invalid character"), w += y;
        }
        return w;
      }
      i.prototype._parseBase = function(d, _, A) {
        this.words = [0], this.length = 1;
        for (var w = 0, y = 1; y <= 67108863; y *= _)
          w++;
        w--, y = y / _ | 0;
        for (var B = d.length - A, N = B % w, b = Math.min(B, B - N) + A, l = 0, E = A; E < b; E += w)
          l = f(d, E, E + w, _), this.imuln(y), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
        if (N !== 0) {
          var K = 1;
          for (l = f(d, E, d.length, _), E = 0; E < N; E++)
            K *= _;
          this.imuln(K), this.words[0] + l < 67108864 ? this.words[0] += l : this._iaddn(l);
        }
        this._strip();
      }, i.prototype.copy = function(d) {
        d.words = new Array(this.length);
        for (var _ = 0; _ < this.length; _++)
          d.words[_] = this.words[_];
        d.length = this.length, d.negative = this.negative, d.red = this.red;
      };
      function p(v, d) {
        v.words = d.words, v.length = d.length, v.negative = d.negative, v.red = d.red;
      }
      if (i.prototype._move = function(d) {
        p(d, this);
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
          i.prototype[Symbol.for("nodejs.util.inspect.custom")] = m;
        } catch {
          i.prototype.inspect = m;
        }
      else
        i.prototype.inspect = m;
      function m() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var I = [
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
      ], S = [
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
      ], F = [
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
        var A;
        if (d === 16 || d === "hex") {
          A = "";
          for (var w = 0, y = 0, B = 0; B < this.length; B++) {
            var N = this.words[B], b = ((N << w | y) & 16777215).toString(16);
            y = N >>> 24 - w & 16777215, w += 2, w >= 26 && (w -= 26, B--), y !== 0 || B !== this.length - 1 ? A = I[6 - b.length] + b + A : A = b + A;
          }
          for (y !== 0 && (A = y.toString(16) + A); A.length % _ !== 0; )
            A = "0" + A;
          return this.negative !== 0 && (A = "-" + A), A;
        }
        if (d === (d | 0) && d >= 2 && d <= 36) {
          var l = S[d], E = F[d];
          A = "";
          var K = this.clone();
          for (K.negative = 0; !K.isZero(); ) {
            var tt = K.modrn(E).toString(d);
            K = K.idivn(E), K.isZero() ? A = tt + A : A = I[l - tt.length] + tt + A;
          }
          for (this.isZero() && (A = "0" + A); A.length % _ !== 0; )
            A = "0" + A;
          return this.negative !== 0 && (A = "-" + A), A;
        }
        n(!1, "Base should be between 2 and 36");
      }, i.prototype.toNumber = function() {
        var d = this.words[0];
        return this.length === 2 ? d += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? d += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -d : d;
      }, i.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, a && (i.prototype.toBuffer = function(d, _) {
        return this.toArrayLike(a, d, _);
      }), i.prototype.toArray = function(d, _) {
        return this.toArrayLike(Array, d, _);
      };
      var R = function(d, _) {
        return d.allocUnsafe ? d.allocUnsafe(_) : new d(_);
      };
      i.prototype.toArrayLike = function(d, _, A) {
        this._strip();
        var w = this.byteLength(), y = A || Math.max(1, w);
        n(w <= y, "byte array longer than desired length"), n(y > 0, "Requested array length <= 0");
        var B = R(d, y), N = _ === "le" ? "LE" : "BE";
        return this["_toArrayLike" + N](B, w), B;
      }, i.prototype._toArrayLikeLE = function(d, _) {
        for (var A = 0, w = 0, y = 0, B = 0; y < this.length; y++) {
          var N = this.words[y] << B | w;
          d[A++] = N & 255, A < d.length && (d[A++] = N >> 8 & 255), A < d.length && (d[A++] = N >> 16 & 255), B === 6 ? (A < d.length && (d[A++] = N >> 24 & 255), w = 0, B = 0) : (w = N >>> 24, B += 2);
        }
        if (A < d.length)
          for (d[A++] = w; A < d.length; )
            d[A++] = 0;
      }, i.prototype._toArrayLikeBE = function(d, _) {
        for (var A = d.length - 1, w = 0, y = 0, B = 0; y < this.length; y++) {
          var N = this.words[y] << B | w;
          d[A--] = N & 255, A >= 0 && (d[A--] = N >> 8 & 255), A >= 0 && (d[A--] = N >> 16 & 255), B === 6 ? (A >= 0 && (d[A--] = N >> 24 & 255), w = 0, B = 0) : (w = N >>> 24, B += 2);
        }
        if (A >= 0)
          for (d[A--] = w; A >= 0; )
            d[A--] = 0;
      }, Math.clz32 ? i.prototype._countBits = function(d) {
        return 32 - Math.clz32(d);
      } : i.prototype._countBits = function(d) {
        var _ = d, A = 0;
        return _ >= 4096 && (A += 13, _ >>>= 13), _ >= 64 && (A += 7, _ >>>= 7), _ >= 8 && (A += 4, _ >>>= 4), _ >= 2 && (A += 2, _ >>>= 2), A + _;
      }, i.prototype._zeroBits = function(d) {
        if (d === 0) return 26;
        var _ = d, A = 0;
        return _ & 8191 || (A += 13, _ >>>= 13), _ & 127 || (A += 7, _ >>>= 7), _ & 15 || (A += 4, _ >>>= 4), _ & 3 || (A += 2, _ >>>= 2), _ & 1 || A++, A;
      }, i.prototype.bitLength = function() {
        var d = this.words[this.length - 1], _ = this._countBits(d);
        return (this.length - 1) * 26 + _;
      };
      function D(v) {
        for (var d = new Array(v.bitLength()), _ = 0; _ < d.length; _++) {
          var A = _ / 26 | 0, w = _ % 26;
          d[_] = v.words[A] >>> w & 1;
        }
        return d;
      }
      i.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var d = 0, _ = 0; _ < this.length; _++) {
          var A = this._zeroBits(this.words[_]);
          if (d += A, A !== 26) break;
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
        for (var A = 0; A < _.length; A++)
          this.words[A] = this.words[A] & d.words[A];
        return this.length = _.length, this._strip();
      }, i.prototype.iand = function(d) {
        return n((this.negative | d.negative) === 0), this.iuand(d);
      }, i.prototype.and = function(d) {
        return this.length > d.length ? this.clone().iand(d) : d.clone().iand(this);
      }, i.prototype.uand = function(d) {
        return this.length > d.length ? this.clone().iuand(d) : d.clone().iuand(this);
      }, i.prototype.iuxor = function(d) {
        var _, A;
        this.length > d.length ? (_ = this, A = d) : (_ = d, A = this);
        for (var w = 0; w < A.length; w++)
          this.words[w] = _.words[w] ^ A.words[w];
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
        var _ = Math.ceil(d / 26) | 0, A = d % 26;
        this._expand(_), A > 0 && _--;
        for (var w = 0; w < _; w++)
          this.words[w] = ~this.words[w] & 67108863;
        return A > 0 && (this.words[w] = ~this.words[w] & 67108863 >> 26 - A), this._strip();
      }, i.prototype.notn = function(d) {
        return this.clone().inotn(d);
      }, i.prototype.setn = function(d, _) {
        n(typeof d == "number" && d >= 0);
        var A = d / 26 | 0, w = d % 26;
        return this._expand(A + 1), _ ? this.words[A] = this.words[A] | 1 << w : this.words[A] = this.words[A] & ~(1 << w), this._strip();
      }, i.prototype.iadd = function(d) {
        var _;
        if (this.negative !== 0 && d.negative === 0)
          return this.negative = 0, _ = this.isub(d), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && d.negative !== 0)
          return d.negative = 0, _ = this.isub(d), d.negative = 1, _._normSign();
        var A, w;
        this.length > d.length ? (A = this, w = d) : (A = d, w = this);
        for (var y = 0, B = 0; B < w.length; B++)
          _ = (A.words[B] | 0) + (w.words[B] | 0) + y, this.words[B] = _ & 67108863, y = _ >>> 26;
        for (; y !== 0 && B < A.length; B++)
          _ = (A.words[B] | 0) + y, this.words[B] = _ & 67108863, y = _ >>> 26;
        if (this.length = A.length, y !== 0)
          this.words[this.length] = y, this.length++;
        else if (A !== this)
          for (; B < A.length; B++)
            this.words[B] = A.words[B];
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
        var A = this.cmp(d);
        if (A === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var w, y;
        A > 0 ? (w = this, y = d) : (w = d, y = this);
        for (var B = 0, N = 0; N < y.length; N++)
          _ = (w.words[N] | 0) - (y.words[N] | 0) + B, B = _ >> 26, this.words[N] = _ & 67108863;
        for (; B !== 0 && N < w.length; N++)
          _ = (w.words[N] | 0) + B, B = _ >> 26, this.words[N] = _ & 67108863;
        if (B === 0 && N < w.length && w !== this)
          for (; N < w.length; N++)
            this.words[N] = w.words[N];
        return this.length = Math.max(this.length, N), w !== this && (this.negative = 1), this._strip();
      }, i.prototype.sub = function(d) {
        return this.clone().isub(d);
      };
      function z(v, d, _) {
        _.negative = d.negative ^ v.negative;
        var A = v.length + d.length | 0;
        _.length = A, A = A - 1 | 0;
        var w = v.words[0] | 0, y = d.words[0] | 0, B = w * y, N = B & 67108863, b = B / 67108864 | 0;
        _.words[0] = N;
        for (var l = 1; l < A; l++) {
          for (var E = b >>> 26, K = b & 67108863, tt = Math.min(l, d.length - 1), rt = Math.max(0, l - v.length + 1); rt <= tt; rt++) {
            var xt = l - rt | 0;
            w = v.words[xt] | 0, y = d.words[rt] | 0, B = w * y + K, E += B / 67108864 | 0, K = B & 67108863;
          }
          _.words[l] = K | 0, b = E | 0;
        }
        return b !== 0 ? _.words[l] = b | 0 : _.length--, _._strip();
      }
      var Y = function(d, _, A) {
        var w = d.words, y = _.words, B = A.words, N = 0, b, l, E, K = w[0] | 0, tt = K & 8191, rt = K >>> 13, xt = w[1] | 0, ht = xt & 8191, mt = xt >>> 13, Ge = w[2] | 0, bt = Ge & 8191, yt = Ge >>> 13, Ce = w[3] | 0, Et = Ce & 8191, Rt = Ce >>> 13, nc = w[4] | 0, Pt = nc & 8191, kt = nc >>> 13, sc = w[5] | 0, zt = sc & 8191, Gt = sc >>> 13, ic = w[6] | 0, Ut = ic & 8191, Vt = ic >>> 13, ac = w[7] | 0, Yt = ac & 8191, Ht = ac >>> 13, oc = w[8] | 0, Xt = oc & 8191, Zt = oc >>> 13, cc = w[9] | 0, Wt = cc & 8191, jt = cc >>> 13, dc = y[0] | 0, Jt = dc & 8191, qt = dc >>> 13, uc = y[1] | 0, $t = uc & 8191, Kt = uc >>> 13, _c = y[2] | 0, te = _c & 8191, ee = _c >>> 13, hc = y[3] | 0, re = hc & 8191, ne = hc >>> 13, lc = y[4] | 0, se = lc & 8191, ie = lc >>> 13, fc = y[5] | 0, ae = fc & 8191, oe = fc >>> 13, Ac = y[6] | 0, ce = Ac & 8191, de = Ac >>> 13, pc = y[7] | 0, ue = pc & 8191, _e = pc >>> 13, gc = y[8] | 0, he = gc & 8191, le = gc >>> 13, wc = y[9] | 0, fe = wc & 8191, Ae = wc >>> 13;
        A.negative = d.negative ^ _.negative, A.length = 19, b = Math.imul(tt, Jt), l = Math.imul(tt, qt), l = l + Math.imul(rt, Jt) | 0, E = Math.imul(rt, qt);
        var Ti = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, b = Math.imul(ht, Jt), l = Math.imul(ht, qt), l = l + Math.imul(mt, Jt) | 0, E = Math.imul(mt, qt), b = b + Math.imul(tt, $t) | 0, l = l + Math.imul(tt, Kt) | 0, l = l + Math.imul(rt, $t) | 0, E = E + Math.imul(rt, Kt) | 0;
        var Ni = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, b = Math.imul(bt, Jt), l = Math.imul(bt, qt), l = l + Math.imul(yt, Jt) | 0, E = Math.imul(yt, qt), b = b + Math.imul(ht, $t) | 0, l = l + Math.imul(ht, Kt) | 0, l = l + Math.imul(mt, $t) | 0, E = E + Math.imul(mt, Kt) | 0, b = b + Math.imul(tt, te) | 0, l = l + Math.imul(tt, ee) | 0, l = l + Math.imul(rt, te) | 0, E = E + Math.imul(rt, ee) | 0;
        var Di = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, b = Math.imul(Et, Jt), l = Math.imul(Et, qt), l = l + Math.imul(Rt, Jt) | 0, E = Math.imul(Rt, qt), b = b + Math.imul(bt, $t) | 0, l = l + Math.imul(bt, Kt) | 0, l = l + Math.imul(yt, $t) | 0, E = E + Math.imul(yt, Kt) | 0, b = b + Math.imul(ht, te) | 0, l = l + Math.imul(ht, ee) | 0, l = l + Math.imul(mt, te) | 0, E = E + Math.imul(mt, ee) | 0, b = b + Math.imul(tt, re) | 0, l = l + Math.imul(tt, ne) | 0, l = l + Math.imul(rt, re) | 0, E = E + Math.imul(rt, ne) | 0;
        var Fi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, b = Math.imul(Pt, Jt), l = Math.imul(Pt, qt), l = l + Math.imul(kt, Jt) | 0, E = Math.imul(kt, qt), b = b + Math.imul(Et, $t) | 0, l = l + Math.imul(Et, Kt) | 0, l = l + Math.imul(Rt, $t) | 0, E = E + Math.imul(Rt, Kt) | 0, b = b + Math.imul(bt, te) | 0, l = l + Math.imul(bt, ee) | 0, l = l + Math.imul(yt, te) | 0, E = E + Math.imul(yt, ee) | 0, b = b + Math.imul(ht, re) | 0, l = l + Math.imul(ht, ne) | 0, l = l + Math.imul(mt, re) | 0, E = E + Math.imul(mt, ne) | 0, b = b + Math.imul(tt, se) | 0, l = l + Math.imul(tt, ie) | 0, l = l + Math.imul(rt, se) | 0, E = E + Math.imul(rt, ie) | 0;
        var Qi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, b = Math.imul(zt, Jt), l = Math.imul(zt, qt), l = l + Math.imul(Gt, Jt) | 0, E = Math.imul(Gt, qt), b = b + Math.imul(Pt, $t) | 0, l = l + Math.imul(Pt, Kt) | 0, l = l + Math.imul(kt, $t) | 0, E = E + Math.imul(kt, Kt) | 0, b = b + Math.imul(Et, te) | 0, l = l + Math.imul(Et, ee) | 0, l = l + Math.imul(Rt, te) | 0, E = E + Math.imul(Rt, ee) | 0, b = b + Math.imul(bt, re) | 0, l = l + Math.imul(bt, ne) | 0, l = l + Math.imul(yt, re) | 0, E = E + Math.imul(yt, ne) | 0, b = b + Math.imul(ht, se) | 0, l = l + Math.imul(ht, ie) | 0, l = l + Math.imul(mt, se) | 0, E = E + Math.imul(mt, ie) | 0, b = b + Math.imul(tt, ae) | 0, l = l + Math.imul(tt, oe) | 0, l = l + Math.imul(rt, ae) | 0, E = E + Math.imul(rt, oe) | 0;
        var Oi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, b = Math.imul(Ut, Jt), l = Math.imul(Ut, qt), l = l + Math.imul(Vt, Jt) | 0, E = Math.imul(Vt, qt), b = b + Math.imul(zt, $t) | 0, l = l + Math.imul(zt, Kt) | 0, l = l + Math.imul(Gt, $t) | 0, E = E + Math.imul(Gt, Kt) | 0, b = b + Math.imul(Pt, te) | 0, l = l + Math.imul(Pt, ee) | 0, l = l + Math.imul(kt, te) | 0, E = E + Math.imul(kt, ee) | 0, b = b + Math.imul(Et, re) | 0, l = l + Math.imul(Et, ne) | 0, l = l + Math.imul(Rt, re) | 0, E = E + Math.imul(Rt, ne) | 0, b = b + Math.imul(bt, se) | 0, l = l + Math.imul(bt, ie) | 0, l = l + Math.imul(yt, se) | 0, E = E + Math.imul(yt, ie) | 0, b = b + Math.imul(ht, ae) | 0, l = l + Math.imul(ht, oe) | 0, l = l + Math.imul(mt, ae) | 0, E = E + Math.imul(mt, oe) | 0, b = b + Math.imul(tt, ce) | 0, l = l + Math.imul(tt, de) | 0, l = l + Math.imul(rt, ce) | 0, E = E + Math.imul(rt, de) | 0;
        var Mi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, b = Math.imul(Yt, Jt), l = Math.imul(Yt, qt), l = l + Math.imul(Ht, Jt) | 0, E = Math.imul(Ht, qt), b = b + Math.imul(Ut, $t) | 0, l = l + Math.imul(Ut, Kt) | 0, l = l + Math.imul(Vt, $t) | 0, E = E + Math.imul(Vt, Kt) | 0, b = b + Math.imul(zt, te) | 0, l = l + Math.imul(zt, ee) | 0, l = l + Math.imul(Gt, te) | 0, E = E + Math.imul(Gt, ee) | 0, b = b + Math.imul(Pt, re) | 0, l = l + Math.imul(Pt, ne) | 0, l = l + Math.imul(kt, re) | 0, E = E + Math.imul(kt, ne) | 0, b = b + Math.imul(Et, se) | 0, l = l + Math.imul(Et, ie) | 0, l = l + Math.imul(Rt, se) | 0, E = E + Math.imul(Rt, ie) | 0, b = b + Math.imul(bt, ae) | 0, l = l + Math.imul(bt, oe) | 0, l = l + Math.imul(yt, ae) | 0, E = E + Math.imul(yt, oe) | 0, b = b + Math.imul(ht, ce) | 0, l = l + Math.imul(ht, de) | 0, l = l + Math.imul(mt, ce) | 0, E = E + Math.imul(mt, de) | 0, b = b + Math.imul(tt, ue) | 0, l = l + Math.imul(tt, _e) | 0, l = l + Math.imul(rt, ue) | 0, E = E + Math.imul(rt, _e) | 0;
        var Li = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, b = Math.imul(Xt, Jt), l = Math.imul(Xt, qt), l = l + Math.imul(Zt, Jt) | 0, E = Math.imul(Zt, qt), b = b + Math.imul(Yt, $t) | 0, l = l + Math.imul(Yt, Kt) | 0, l = l + Math.imul(Ht, $t) | 0, E = E + Math.imul(Ht, Kt) | 0, b = b + Math.imul(Ut, te) | 0, l = l + Math.imul(Ut, ee) | 0, l = l + Math.imul(Vt, te) | 0, E = E + Math.imul(Vt, ee) | 0, b = b + Math.imul(zt, re) | 0, l = l + Math.imul(zt, ne) | 0, l = l + Math.imul(Gt, re) | 0, E = E + Math.imul(Gt, ne) | 0, b = b + Math.imul(Pt, se) | 0, l = l + Math.imul(Pt, ie) | 0, l = l + Math.imul(kt, se) | 0, E = E + Math.imul(kt, ie) | 0, b = b + Math.imul(Et, ae) | 0, l = l + Math.imul(Et, oe) | 0, l = l + Math.imul(Rt, ae) | 0, E = E + Math.imul(Rt, oe) | 0, b = b + Math.imul(bt, ce) | 0, l = l + Math.imul(bt, de) | 0, l = l + Math.imul(yt, ce) | 0, E = E + Math.imul(yt, de) | 0, b = b + Math.imul(ht, ue) | 0, l = l + Math.imul(ht, _e) | 0, l = l + Math.imul(mt, ue) | 0, E = E + Math.imul(mt, _e) | 0, b = b + Math.imul(tt, he) | 0, l = l + Math.imul(tt, le) | 0, l = l + Math.imul(rt, he) | 0, E = E + Math.imul(rt, le) | 0;
        var Pi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, b = Math.imul(Wt, Jt), l = Math.imul(Wt, qt), l = l + Math.imul(jt, Jt) | 0, E = Math.imul(jt, qt), b = b + Math.imul(Xt, $t) | 0, l = l + Math.imul(Xt, Kt) | 0, l = l + Math.imul(Zt, $t) | 0, E = E + Math.imul(Zt, Kt) | 0, b = b + Math.imul(Yt, te) | 0, l = l + Math.imul(Yt, ee) | 0, l = l + Math.imul(Ht, te) | 0, E = E + Math.imul(Ht, ee) | 0, b = b + Math.imul(Ut, re) | 0, l = l + Math.imul(Ut, ne) | 0, l = l + Math.imul(Vt, re) | 0, E = E + Math.imul(Vt, ne) | 0, b = b + Math.imul(zt, se) | 0, l = l + Math.imul(zt, ie) | 0, l = l + Math.imul(Gt, se) | 0, E = E + Math.imul(Gt, ie) | 0, b = b + Math.imul(Pt, ae) | 0, l = l + Math.imul(Pt, oe) | 0, l = l + Math.imul(kt, ae) | 0, E = E + Math.imul(kt, oe) | 0, b = b + Math.imul(Et, ce) | 0, l = l + Math.imul(Et, de) | 0, l = l + Math.imul(Rt, ce) | 0, E = E + Math.imul(Rt, de) | 0, b = b + Math.imul(bt, ue) | 0, l = l + Math.imul(bt, _e) | 0, l = l + Math.imul(yt, ue) | 0, E = E + Math.imul(yt, _e) | 0, b = b + Math.imul(ht, he) | 0, l = l + Math.imul(ht, le) | 0, l = l + Math.imul(mt, he) | 0, E = E + Math.imul(mt, le) | 0, b = b + Math.imul(tt, fe) | 0, l = l + Math.imul(tt, Ae) | 0, l = l + Math.imul(rt, fe) | 0, E = E + Math.imul(rt, Ae) | 0;
        var ki = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, b = Math.imul(Wt, $t), l = Math.imul(Wt, Kt), l = l + Math.imul(jt, $t) | 0, E = Math.imul(jt, Kt), b = b + Math.imul(Xt, te) | 0, l = l + Math.imul(Xt, ee) | 0, l = l + Math.imul(Zt, te) | 0, E = E + Math.imul(Zt, ee) | 0, b = b + Math.imul(Yt, re) | 0, l = l + Math.imul(Yt, ne) | 0, l = l + Math.imul(Ht, re) | 0, E = E + Math.imul(Ht, ne) | 0, b = b + Math.imul(Ut, se) | 0, l = l + Math.imul(Ut, ie) | 0, l = l + Math.imul(Vt, se) | 0, E = E + Math.imul(Vt, ie) | 0, b = b + Math.imul(zt, ae) | 0, l = l + Math.imul(zt, oe) | 0, l = l + Math.imul(Gt, ae) | 0, E = E + Math.imul(Gt, oe) | 0, b = b + Math.imul(Pt, ce) | 0, l = l + Math.imul(Pt, de) | 0, l = l + Math.imul(kt, ce) | 0, E = E + Math.imul(kt, de) | 0, b = b + Math.imul(Et, ue) | 0, l = l + Math.imul(Et, _e) | 0, l = l + Math.imul(Rt, ue) | 0, E = E + Math.imul(Rt, _e) | 0, b = b + Math.imul(bt, he) | 0, l = l + Math.imul(bt, le) | 0, l = l + Math.imul(yt, he) | 0, E = E + Math.imul(yt, le) | 0, b = b + Math.imul(ht, fe) | 0, l = l + Math.imul(ht, Ae) | 0, l = l + Math.imul(mt, fe) | 0, E = E + Math.imul(mt, Ae) | 0;
        var zi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, b = Math.imul(Wt, te), l = Math.imul(Wt, ee), l = l + Math.imul(jt, te) | 0, E = Math.imul(jt, ee), b = b + Math.imul(Xt, re) | 0, l = l + Math.imul(Xt, ne) | 0, l = l + Math.imul(Zt, re) | 0, E = E + Math.imul(Zt, ne) | 0, b = b + Math.imul(Yt, se) | 0, l = l + Math.imul(Yt, ie) | 0, l = l + Math.imul(Ht, se) | 0, E = E + Math.imul(Ht, ie) | 0, b = b + Math.imul(Ut, ae) | 0, l = l + Math.imul(Ut, oe) | 0, l = l + Math.imul(Vt, ae) | 0, E = E + Math.imul(Vt, oe) | 0, b = b + Math.imul(zt, ce) | 0, l = l + Math.imul(zt, de) | 0, l = l + Math.imul(Gt, ce) | 0, E = E + Math.imul(Gt, de) | 0, b = b + Math.imul(Pt, ue) | 0, l = l + Math.imul(Pt, _e) | 0, l = l + Math.imul(kt, ue) | 0, E = E + Math.imul(kt, _e) | 0, b = b + Math.imul(Et, he) | 0, l = l + Math.imul(Et, le) | 0, l = l + Math.imul(Rt, he) | 0, E = E + Math.imul(Rt, le) | 0, b = b + Math.imul(bt, fe) | 0, l = l + Math.imul(bt, Ae) | 0, l = l + Math.imul(yt, fe) | 0, E = E + Math.imul(yt, Ae) | 0;
        var Gi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, b = Math.imul(Wt, re), l = Math.imul(Wt, ne), l = l + Math.imul(jt, re) | 0, E = Math.imul(jt, ne), b = b + Math.imul(Xt, se) | 0, l = l + Math.imul(Xt, ie) | 0, l = l + Math.imul(Zt, se) | 0, E = E + Math.imul(Zt, ie) | 0, b = b + Math.imul(Yt, ae) | 0, l = l + Math.imul(Yt, oe) | 0, l = l + Math.imul(Ht, ae) | 0, E = E + Math.imul(Ht, oe) | 0, b = b + Math.imul(Ut, ce) | 0, l = l + Math.imul(Ut, de) | 0, l = l + Math.imul(Vt, ce) | 0, E = E + Math.imul(Vt, de) | 0, b = b + Math.imul(zt, ue) | 0, l = l + Math.imul(zt, _e) | 0, l = l + Math.imul(Gt, ue) | 0, E = E + Math.imul(Gt, _e) | 0, b = b + Math.imul(Pt, he) | 0, l = l + Math.imul(Pt, le) | 0, l = l + Math.imul(kt, he) | 0, E = E + Math.imul(kt, le) | 0, b = b + Math.imul(Et, fe) | 0, l = l + Math.imul(Et, Ae) | 0, l = l + Math.imul(Rt, fe) | 0, E = E + Math.imul(Rt, Ae) | 0;
        var Ui = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, b = Math.imul(Wt, se), l = Math.imul(Wt, ie), l = l + Math.imul(jt, se) | 0, E = Math.imul(jt, ie), b = b + Math.imul(Xt, ae) | 0, l = l + Math.imul(Xt, oe) | 0, l = l + Math.imul(Zt, ae) | 0, E = E + Math.imul(Zt, oe) | 0, b = b + Math.imul(Yt, ce) | 0, l = l + Math.imul(Yt, de) | 0, l = l + Math.imul(Ht, ce) | 0, E = E + Math.imul(Ht, de) | 0, b = b + Math.imul(Ut, ue) | 0, l = l + Math.imul(Ut, _e) | 0, l = l + Math.imul(Vt, ue) | 0, E = E + Math.imul(Vt, _e) | 0, b = b + Math.imul(zt, he) | 0, l = l + Math.imul(zt, le) | 0, l = l + Math.imul(Gt, he) | 0, E = E + Math.imul(Gt, le) | 0, b = b + Math.imul(Pt, fe) | 0, l = l + Math.imul(Pt, Ae) | 0, l = l + Math.imul(kt, fe) | 0, E = E + Math.imul(kt, Ae) | 0;
        var Vi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, b = Math.imul(Wt, ae), l = Math.imul(Wt, oe), l = l + Math.imul(jt, ae) | 0, E = Math.imul(jt, oe), b = b + Math.imul(Xt, ce) | 0, l = l + Math.imul(Xt, de) | 0, l = l + Math.imul(Zt, ce) | 0, E = E + Math.imul(Zt, de) | 0, b = b + Math.imul(Yt, ue) | 0, l = l + Math.imul(Yt, _e) | 0, l = l + Math.imul(Ht, ue) | 0, E = E + Math.imul(Ht, _e) | 0, b = b + Math.imul(Ut, he) | 0, l = l + Math.imul(Ut, le) | 0, l = l + Math.imul(Vt, he) | 0, E = E + Math.imul(Vt, le) | 0, b = b + Math.imul(zt, fe) | 0, l = l + Math.imul(zt, Ae) | 0, l = l + Math.imul(Gt, fe) | 0, E = E + Math.imul(Gt, Ae) | 0;
        var Yi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, b = Math.imul(Wt, ce), l = Math.imul(Wt, de), l = l + Math.imul(jt, ce) | 0, E = Math.imul(jt, de), b = b + Math.imul(Xt, ue) | 0, l = l + Math.imul(Xt, _e) | 0, l = l + Math.imul(Zt, ue) | 0, E = E + Math.imul(Zt, _e) | 0, b = b + Math.imul(Yt, he) | 0, l = l + Math.imul(Yt, le) | 0, l = l + Math.imul(Ht, he) | 0, E = E + Math.imul(Ht, le) | 0, b = b + Math.imul(Ut, fe) | 0, l = l + Math.imul(Ut, Ae) | 0, l = l + Math.imul(Vt, fe) | 0, E = E + Math.imul(Vt, Ae) | 0;
        var Hi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, b = Math.imul(Wt, ue), l = Math.imul(Wt, _e), l = l + Math.imul(jt, ue) | 0, E = Math.imul(jt, _e), b = b + Math.imul(Xt, he) | 0, l = l + Math.imul(Xt, le) | 0, l = l + Math.imul(Zt, he) | 0, E = E + Math.imul(Zt, le) | 0, b = b + Math.imul(Yt, fe) | 0, l = l + Math.imul(Yt, Ae) | 0, l = l + Math.imul(Ht, fe) | 0, E = E + Math.imul(Ht, Ae) | 0;
        var Xi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, b = Math.imul(Wt, he), l = Math.imul(Wt, le), l = l + Math.imul(jt, he) | 0, E = Math.imul(jt, le), b = b + Math.imul(Xt, fe) | 0, l = l + Math.imul(Xt, Ae) | 0, l = l + Math.imul(Zt, fe) | 0, E = E + Math.imul(Zt, Ae) | 0;
        var Zi = (N + b | 0) + ((l & 8191) << 13) | 0;
        N = (E + (l >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, b = Math.imul(Wt, fe), l = Math.imul(Wt, Ae), l = l + Math.imul(jt, fe) | 0, E = Math.imul(jt, Ae);
        var Wi = (N + b | 0) + ((l & 8191) << 13) | 0;
        return N = (E + (l >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, B[0] = Ti, B[1] = Ni, B[2] = Di, B[3] = Fi, B[4] = Qi, B[5] = Oi, B[6] = Mi, B[7] = Li, B[8] = Pi, B[9] = ki, B[10] = zi, B[11] = Gi, B[12] = Ui, B[13] = Vi, B[14] = Yi, B[15] = Hi, B[16] = Xi, B[17] = Zi, B[18] = Wi, N !== 0 && (B[19] = N, A.length++), A;
      };
      Math.imul || (Y = z);
      function U(v, d, _) {
        _.negative = d.negative ^ v.negative, _.length = v.length + d.length;
        for (var A = 0, w = 0, y = 0; y < _.length - 1; y++) {
          var B = w;
          w = 0;
          for (var N = A & 67108863, b = Math.min(y, d.length - 1), l = Math.max(0, y - v.length + 1); l <= b; l++) {
            var E = y - l, K = v.words[E] | 0, tt = d.words[l] | 0, rt = K * tt, xt = rt & 67108863;
            B = B + (rt / 67108864 | 0) | 0, xt = xt + N | 0, N = xt & 67108863, B = B + (xt >>> 26) | 0, w += B >>> 26, B &= 67108863;
          }
          _.words[y] = N, A = B, B = w;
        }
        return A !== 0 ? _.words[y] = A : _.length--, _._strip();
      }
      function Q(v, d, _) {
        return U(v, d, _);
      }
      i.prototype.mulTo = function(d, _) {
        var A, w = this.length + d.length;
        return this.length === 10 && d.length === 10 ? A = Y(this, d, _) : w < 63 ? A = z(this, d, _) : w < 1024 ? A = U(this, d, _) : A = Q(this, d, _), A;
      }, i.prototype.mul = function(d) {
        var _ = new i(null);
        return _.words = new Array(this.length + d.length), this.mulTo(d, _);
      }, i.prototype.mulf = function(d) {
        var _ = new i(null);
        return _.words = new Array(this.length + d.length), Q(this, d, _);
      }, i.prototype.imul = function(d) {
        return this.clone().mulTo(d, this);
      }, i.prototype.imuln = function(d) {
        var _ = d < 0;
        _ && (d = -d), n(typeof d == "number"), n(d < 67108864);
        for (var A = 0, w = 0; w < this.length; w++) {
          var y = (this.words[w] | 0) * d, B = (y & 67108863) + (A & 67108863);
          A >>= 26, A += y / 67108864 | 0, A += B >>> 26, this.words[w] = B & 67108863;
        }
        return A !== 0 && (this.words[w] = A, this.length++), _ ? this.ineg() : this;
      }, i.prototype.muln = function(d) {
        return this.clone().imuln(d);
      }, i.prototype.sqr = function() {
        return this.mul(this);
      }, i.prototype.isqr = function() {
        return this.imul(this.clone());
      }, i.prototype.pow = function(d) {
        var _ = D(d);
        if (_.length === 0) return new i(1);
        for (var A = this, w = 0; w < _.length && _[w] === 0; w++, A = A.sqr())
          ;
        if (++w < _.length)
          for (var y = A.sqr(); w < _.length; w++, y = y.sqr())
            _[w] !== 0 && (A = A.mul(y));
        return A;
      }, i.prototype.iushln = function(d) {
        n(typeof d == "number" && d >= 0);
        var _ = d % 26, A = (d - _) / 26, w = 67108863 >>> 26 - _ << 26 - _, y;
        if (_ !== 0) {
          var B = 0;
          for (y = 0; y < this.length; y++) {
            var N = this.words[y] & w, b = (this.words[y] | 0) - N << _;
            this.words[y] = b | B, B = N >>> 26 - _;
          }
          B && (this.words[y] = B, this.length++);
        }
        if (A !== 0) {
          for (y = this.length - 1; y >= 0; y--)
            this.words[y + A] = this.words[y];
          for (y = 0; y < A; y++)
            this.words[y] = 0;
          this.length += A;
        }
        return this._strip();
      }, i.prototype.ishln = function(d) {
        return n(this.negative === 0), this.iushln(d);
      }, i.prototype.iushrn = function(d, _, A) {
        n(typeof d == "number" && d >= 0);
        var w;
        _ ? w = (_ - _ % 26) / 26 : w = 0;
        var y = d % 26, B = Math.min((d - y) / 26, this.length), N = 67108863 ^ 67108863 >>> y << y, b = A;
        if (w -= B, w = Math.max(0, w), b) {
          for (var l = 0; l < B; l++)
            b.words[l] = this.words[l];
          b.length = B;
        }
        if (B !== 0) if (this.length > B)
          for (this.length -= B, l = 0; l < this.length; l++)
            this.words[l] = this.words[l + B];
        else
          this.words[0] = 0, this.length = 1;
        var E = 0;
        for (l = this.length - 1; l >= 0 && (E !== 0 || l >= w); l--) {
          var K = this.words[l] | 0;
          this.words[l] = E << 26 - y | K >>> y, E = K & N;
        }
        return b && E !== 0 && (b.words[b.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, i.prototype.ishrn = function(d, _, A) {
        return n(this.negative === 0), this.iushrn(d, _, A);
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
        var _ = d % 26, A = (d - _) / 26, w = 1 << _;
        if (this.length <= A) return !1;
        var y = this.words[A];
        return !!(y & w);
      }, i.prototype.imaskn = function(d) {
        n(typeof d == "number" && d >= 0);
        var _ = d % 26, A = (d - _) / 26;
        if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= A)
          return this;
        if (_ !== 0 && A++, this.length = Math.min(A, this.length), _ !== 0) {
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
      }, i.prototype._ishlnsubmul = function(d, _, A) {
        var w = d.length + A, y;
        this._expand(w);
        var B, N = 0;
        for (y = 0; y < d.length; y++) {
          B = (this.words[y + A] | 0) + N;
          var b = (d.words[y] | 0) * _;
          B -= b & 67108863, N = (B >> 26) - (b / 67108864 | 0), this.words[y + A] = B & 67108863;
        }
        for (; y < this.length - A; y++)
          B = (this.words[y + A] | 0) + N, N = B >> 26, this.words[y + A] = B & 67108863;
        if (N === 0) return this._strip();
        for (n(N === -1), N = 0, y = 0; y < this.length; y++)
          B = -(this.words[y] | 0) + N, N = B >> 26, this.words[y] = B & 67108863;
        return this.negative = 1, this._strip();
      }, i.prototype._wordDiv = function(d, _) {
        var A = this.length - d.length, w = this.clone(), y = d, B = y.words[y.length - 1] | 0, N = this._countBits(B);
        A = 26 - N, A !== 0 && (y = y.ushln(A), w.iushln(A), B = y.words[y.length - 1] | 0);
        var b = w.length - y.length, l;
        if (_ !== "mod") {
          l = new i(null), l.length = b + 1, l.words = new Array(l.length);
          for (var E = 0; E < l.length; E++)
            l.words[E] = 0;
        }
        var K = w.clone()._ishlnsubmul(y, 1, b);
        K.negative === 0 && (w = K, l && (l.words[b] = 1));
        for (var tt = b - 1; tt >= 0; tt--) {
          var rt = (w.words[y.length + tt] | 0) * 67108864 + (w.words[y.length + tt - 1] | 0);
          for (rt = Math.min(rt / B | 0, 67108863), w._ishlnsubmul(y, rt, tt); w.negative !== 0; )
            rt--, w.negative = 0, w._ishlnsubmul(y, 1, tt), w.isZero() || (w.negative ^= 1);
          l && (l.words[tt] = rt);
        }
        return l && l._strip(), w._strip(), _ !== "div" && A !== 0 && w.iushrn(A), {
          div: l || null,
          mod: w
        };
      }, i.prototype.divmod = function(d, _, A) {
        if (n(!d.isZero()), this.isZero())
          return {
            div: new i(0),
            mod: new i(0)
          };
        var w, y, B;
        return this.negative !== 0 && d.negative === 0 ? (B = this.neg().divmod(d, _), _ !== "mod" && (w = B.div.neg()), _ !== "div" && (y = B.mod.neg(), A && y.negative !== 0 && y.iadd(d)), {
          div: w,
          mod: y
        }) : this.negative === 0 && d.negative !== 0 ? (B = this.divmod(d.neg(), _), _ !== "mod" && (w = B.div.neg()), {
          div: w,
          mod: B.mod
        }) : this.negative & d.negative ? (B = this.neg().divmod(d.neg(), _), _ !== "div" && (y = B.mod.neg(), A && y.negative !== 0 && y.isub(d)), {
          div: B.div,
          mod: y
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
        var A = _.div.negative !== 0 ? _.mod.isub(d) : _.mod, w = d.ushrn(1), y = d.andln(1), B = A.cmp(w);
        return B < 0 || y === 1 && B === 0 ? _.div : _.div.negative !== 0 ? _.div.isubn(1) : _.div.iaddn(1);
      }, i.prototype.modrn = function(d) {
        var _ = d < 0;
        _ && (d = -d), n(d <= 67108863);
        for (var A = (1 << 26) % d, w = 0, y = this.length - 1; y >= 0; y--)
          w = (A * w + (this.words[y] | 0)) % d;
        return _ ? -w : w;
      }, i.prototype.modn = function(d) {
        return this.modrn(d);
      }, i.prototype.idivn = function(d) {
        var _ = d < 0;
        _ && (d = -d), n(d <= 67108863);
        for (var A = 0, w = this.length - 1; w >= 0; w--) {
          var y = (this.words[w] | 0) + A * 67108864;
          this.words[w] = y / d | 0, A = y % d;
        }
        return this._strip(), _ ? this.ineg() : this;
      }, i.prototype.divn = function(d) {
        return this.clone().idivn(d);
      }, i.prototype.egcd = function(d) {
        n(d.negative === 0), n(!d.isZero());
        var _ = this, A = d.clone();
        _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
        for (var w = new i(1), y = new i(0), B = new i(0), N = new i(1), b = 0; _.isEven() && A.isEven(); )
          _.iushrn(1), A.iushrn(1), ++b;
        for (var l = A.clone(), E = _.clone(); !_.isZero(); ) {
          for (var K = 0, tt = 1; !(_.words[0] & tt) && K < 26; ++K, tt <<= 1) ;
          if (K > 0)
            for (_.iushrn(K); K-- > 0; )
              (w.isOdd() || y.isOdd()) && (w.iadd(l), y.isub(E)), w.iushrn(1), y.iushrn(1);
          for (var rt = 0, xt = 1; !(A.words[0] & xt) && rt < 26; ++rt, xt <<= 1) ;
          if (rt > 0)
            for (A.iushrn(rt); rt-- > 0; )
              (B.isOdd() || N.isOdd()) && (B.iadd(l), N.isub(E)), B.iushrn(1), N.iushrn(1);
          _.cmp(A) >= 0 ? (_.isub(A), w.isub(B), y.isub(N)) : (A.isub(_), B.isub(w), N.isub(y));
        }
        return {
          a: B,
          b: N,
          gcd: A.iushln(b)
        };
      }, i.prototype._invmp = function(d) {
        n(d.negative === 0), n(!d.isZero());
        var _ = this, A = d.clone();
        _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
        for (var w = new i(1), y = new i(0), B = A.clone(); _.cmpn(1) > 0 && A.cmpn(1) > 0; ) {
          for (var N = 0, b = 1; !(_.words[0] & b) && N < 26; ++N, b <<= 1) ;
          if (N > 0)
            for (_.iushrn(N); N-- > 0; )
              w.isOdd() && w.iadd(B), w.iushrn(1);
          for (var l = 0, E = 1; !(A.words[0] & E) && l < 26; ++l, E <<= 1) ;
          if (l > 0)
            for (A.iushrn(l); l-- > 0; )
              y.isOdd() && y.iadd(B), y.iushrn(1);
          _.cmp(A) >= 0 ? (_.isub(A), w.isub(y)) : (A.isub(_), y.isub(w));
        }
        var K;
        return _.cmpn(1) === 0 ? K = w : K = y, K.cmpn(0) < 0 && K.iadd(d), K;
      }, i.prototype.gcd = function(d) {
        if (this.isZero()) return d.abs();
        if (d.isZero()) return this.abs();
        var _ = this.clone(), A = d.clone();
        _.negative = 0, A.negative = 0;
        for (var w = 0; _.isEven() && A.isEven(); w++)
          _.iushrn(1), A.iushrn(1);
        do {
          for (; _.isEven(); )
            _.iushrn(1);
          for (; A.isEven(); )
            A.iushrn(1);
          var y = _.cmp(A);
          if (y < 0) {
            var B = _;
            _ = A, A = B;
          } else if (y === 0 || A.cmpn(1) === 0)
            break;
          _.isub(A);
        } while (!0);
        return A.iushln(w);
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
        var _ = d % 26, A = (d - _) / 26, w = 1 << _;
        if (this.length <= A)
          return this._expand(A + 1), this.words[A] |= w, this;
        for (var y = w, B = A; y !== 0 && B < this.length; B++) {
          var N = this.words[B] | 0;
          N += y, y = N >>> 26, N &= 67108863, this.words[B] = N;
        }
        return y !== 0 && (this.words[B] = y, this.length++), this;
      }, i.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, i.prototype.cmpn = function(d) {
        var _ = d < 0;
        if (this.negative !== 0 && !_) return -1;
        if (this.negative === 0 && _) return 1;
        this._strip();
        var A;
        if (this.length > 1)
          A = 1;
        else {
          _ && (d = -d), n(d <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          A = w === d ? 0 : w < d ? -1 : 1;
        }
        return this.negative !== 0 ? -A | 0 : A;
      }, i.prototype.cmp = function(d) {
        if (this.negative !== 0 && d.negative === 0) return -1;
        if (this.negative === 0 && d.negative !== 0) return 1;
        var _ = this.ucmp(d);
        return this.negative !== 0 ? -_ | 0 : _;
      }, i.prototype.ucmp = function(d) {
        if (this.length > d.length) return 1;
        if (this.length < d.length) return -1;
        for (var _ = 0, A = this.length - 1; A >= 0; A--) {
          var w = this.words[A] | 0, y = d.words[A] | 0;
          if (w !== y) {
            w < y ? _ = -1 : w > y && (_ = 1);
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
        return new j(d);
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
      var T = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function O(v, d) {
        this.name = v, this.p = new i(d, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      O.prototype._tmp = function() {
        var d = new i(null);
        return d.words = new Array(Math.ceil(this.n / 13)), d;
      }, O.prototype.ireduce = function(d) {
        var _ = d, A;
        do
          this.split(_, this.tmp), _ = this.imulK(_), _ = _.iadd(this.tmp), A = _.bitLength();
        while (A > this.n);
        var w = A < this.n ? -1 : _.ucmp(this.p);
        return w === 0 ? (_.words[0] = 0, _.length = 1) : w > 0 ? _.isub(this.p) : _.strip !== void 0 ? _.strip() : _._strip(), _;
      }, O.prototype.split = function(d, _) {
        d.iushrn(this.n, 0, _);
      }, O.prototype.imulK = function(d) {
        return d.imul(this.k);
      };
      function P() {
        O.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      s(P, O), P.prototype.split = function(d, _) {
        for (var A = 4194303, w = Math.min(d.length, 9), y = 0; y < w; y++)
          _.words[y] = d.words[y];
        if (_.length = w, d.length <= 9) {
          d.words[0] = 0, d.length = 1;
          return;
        }
        var B = d.words[9];
        for (_.words[_.length++] = B & A, y = 10; y < d.length; y++) {
          var N = d.words[y] | 0;
          d.words[y - 10] = (N & A) << 4 | B >>> 22, B = N;
        }
        B >>>= 22, d.words[y - 10] = B, B === 0 && d.length > 10 ? d.length -= 10 : d.length -= 9;
      }, P.prototype.imulK = function(d) {
        d.words[d.length] = 0, d.words[d.length + 1] = 0, d.length += 2;
        for (var _ = 0, A = 0; A < d.length; A++) {
          var w = d.words[A] | 0;
          _ += w * 977, d.words[A] = _ & 67108863, _ = w * 64 + (_ / 67108864 | 0);
        }
        return d.words[d.length - 1] === 0 && (d.length--, d.words[d.length - 1] === 0 && d.length--), d;
      };
      function G() {
        O.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      s(G, O);
      function k() {
        O.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      s(k, O);
      function W() {
        O.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      s(W, O), W.prototype.imulK = function(d) {
        for (var _ = 0, A = 0; A < d.length; A++) {
          var w = (d.words[A] | 0) * 19 + _, y = w & 67108863;
          w >>>= 26, d.words[A] = y, _ = w;
        }
        return _ !== 0 && (d.words[d.length++] = _), d;
      }, i._prime = function(d) {
        if (T[d]) return T[d];
        var _;
        if (d === "k256")
          _ = new P();
        else if (d === "p224")
          _ = new G();
        else if (d === "p192")
          _ = new k();
        else if (d === "p25519")
          _ = new W();
        else
          throw new Error("Unknown prime " + d);
        return T[d] = _, _;
      };
      function j(v) {
        if (typeof v == "string") {
          var d = i._prime(v);
          this.m = d.p, this.prime = d;
        } else
          n(v.gtn(1), "modulus must be greater than 1"), this.m = v, this.prime = null;
      }
      j.prototype._verify1 = function(d) {
        n(d.negative === 0, "red works only with positives"), n(d.red, "red works only with red numbers");
      }, j.prototype._verify2 = function(d, _) {
        n((d.negative | _.negative) === 0, "red works only with positives"), n(
          d.red && d.red === _.red,
          "red works only with red numbers"
        );
      }, j.prototype.imod = function(d) {
        return this.prime ? this.prime.ireduce(d)._forceRed(this) : (p(d, d.umod(this.m)._forceRed(this)), d);
      }, j.prototype.neg = function(d) {
        return d.isZero() ? d.clone() : this.m.sub(d)._forceRed(this);
      }, j.prototype.add = function(d, _) {
        this._verify2(d, _);
        var A = d.add(_);
        return A.cmp(this.m) >= 0 && A.isub(this.m), A._forceRed(this);
      }, j.prototype.iadd = function(d, _) {
        this._verify2(d, _);
        var A = d.iadd(_);
        return A.cmp(this.m) >= 0 && A.isub(this.m), A;
      }, j.prototype.sub = function(d, _) {
        this._verify2(d, _);
        var A = d.sub(_);
        return A.cmpn(0) < 0 && A.iadd(this.m), A._forceRed(this);
      }, j.prototype.isub = function(d, _) {
        this._verify2(d, _);
        var A = d.isub(_);
        return A.cmpn(0) < 0 && A.iadd(this.m), A;
      }, j.prototype.shl = function(d, _) {
        return this._verify1(d), this.imod(d.ushln(_));
      }, j.prototype.imul = function(d, _) {
        return this._verify2(d, _), this.imod(d.imul(_));
      }, j.prototype.mul = function(d, _) {
        return this._verify2(d, _), this.imod(d.mul(_));
      }, j.prototype.isqr = function(d) {
        return this.imul(d, d.clone());
      }, j.prototype.sqr = function(d) {
        return this.mul(d, d);
      }, j.prototype.sqrt = function(d) {
        if (d.isZero()) return d.clone();
        var _ = this.m.andln(3);
        if (n(_ % 2 === 1), _ === 3) {
          var A = this.m.add(new i(1)).iushrn(2);
          return this.pow(d, A);
        }
        for (var w = this.m.subn(1), y = 0; !w.isZero() && w.andln(1) === 0; )
          y++, w.iushrn(1);
        n(!w.isZero());
        var B = new i(1).toRed(this), N = B.redNeg(), b = this.m.subn(1).iushrn(1), l = this.m.bitLength();
        for (l = new i(2 * l * l).toRed(this); this.pow(l, b).cmp(N) !== 0; )
          l.redIAdd(N);
        for (var E = this.pow(l, w), K = this.pow(d, w.addn(1).iushrn(1)), tt = this.pow(d, w), rt = y; tt.cmp(B) !== 0; ) {
          for (var xt = tt, ht = 0; xt.cmp(B) !== 0; ht++)
            xt = xt.redSqr();
          n(ht < rt);
          var mt = this.pow(E, new i(1).iushln(rt - ht - 1));
          K = K.redMul(mt), E = mt.redSqr(), tt = tt.redMul(E), rt = ht;
        }
        return K;
      }, j.prototype.invm = function(d) {
        var _ = d._invmp(this.m);
        return _.negative !== 0 ? (_.negative = 0, this.imod(_).redNeg()) : this.imod(_);
      }, j.prototype.pow = function(d, _) {
        if (_.isZero()) return new i(1).toRed(this);
        if (_.cmpn(1) === 0) return d.clone();
        var A = 4, w = new Array(1 << A);
        w[0] = new i(1).toRed(this), w[1] = d;
        for (var y = 2; y < w.length; y++)
          w[y] = this.mul(w[y - 1], d);
        var B = w[0], N = 0, b = 0, l = _.bitLength() % 26;
        for (l === 0 && (l = 26), y = _.length - 1; y >= 0; y--) {
          for (var E = _.words[y], K = l - 1; K >= 0; K--) {
            var tt = E >> K & 1;
            if (B !== w[0] && (B = this.sqr(B)), tt === 0 && N === 0) {
              b = 0;
              continue;
            }
            N <<= 1, N |= tt, b++, !(b !== A && (y !== 0 || K !== 0)) && (B = this.mul(B, w[N]), b = 0, N = 0);
          }
          l = 26;
        }
        return B;
      }, j.prototype.convertTo = function(d) {
        var _ = d.umod(this.m);
        return _ === d ? _.clone() : _;
      }, j.prototype.convertFrom = function(d) {
        var _ = d.clone();
        return _.red = null, _;
      }, i.mont = function(d) {
        return new J(d);
      };
      function J(v) {
        j.call(this, v), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      s(J, j), J.prototype.convertTo = function(d) {
        return this.imod(d.ushln(this.shift));
      }, J.prototype.convertFrom = function(d) {
        var _ = this.imod(d.mul(this.rinv));
        return _.red = null, _;
      }, J.prototype.imul = function(d, _) {
        if (d.isZero() || _.isZero())
          return d.words[0] = 0, d.length = 1, d;
        var A = d.imul(_), w = A.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = A.isub(w).iushrn(this.shift), B = y;
        return y.cmp(this.m) >= 0 ? B = y.isub(this.m) : y.cmpn(0) < 0 && (B = y.iadd(this.m)), B._forceRed(this);
      }, J.prototype.mul = function(d, _) {
        if (d.isZero() || _.isZero()) return new i(0)._forceRed(this);
        var A = d.mul(_), w = A.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = A.isub(w).iushrn(this.shift), B = y;
        return y.cmp(this.m) >= 0 ? B = y.isub(this.m) : y.cmpn(0) < 0 && (B = y.iadd(this.m)), B._forceRed(this);
      }, J.prototype.invm = function(d) {
        var _ = this.imod(d._invmp(this.m).mul(this.r2));
        return _._forceRed(this);
      };
    })(e, tA);
  }(xs)), xs.exports;
}
var rA = eA();
const As = /* @__PURE__ */ H_(rA);
var X_ = 9, Z_ = 3, Sa = 9, Mt = class extends As {
  constructor(t, r, n) {
    let s = t, i = r;
    if (Mt.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = r || "hex"), typeof s == "number" && s > Number.MAX_SAFE_INTEGER)
      throw new C(
        M.NUMBER_TOO_BIG,
        `Value ${s} is too large to be represented as a number, use string instead.`
      );
    super(s ?? 0, i, n);
    L(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new C(M.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new C(
        M.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, n);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new C(M.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: r = Sa,
      precision: n = X_,
      minPrecision: s = Z_
    } = t || {};
    if (r === 0)
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const i = s > n ? n : s, a = n > s ? n : s, o = this.formatUnits(r), [u, f = ""] = o.split("."), p = u.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (a === 0)
      return p;
    let m = f.replace(/0+$/, "");
    if (m.length > a)
      if (u === "0") {
        const I = m.search(/[1-9]/);
        I >= 0 && I < a ? m = m.slice(0, a) : m = m.slice(0, I + 1);
      } else
        m = m.slice(0, a);
    else
      m = m.slice(0, a);
    return m.length < i && (m = m.padEnd(i, "0")), m === "" && i === 0 ? p : m ? `${p}.${m}` : p;
  }
  formatUnits(t = Sa) {
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
    return new Mt(super.sqr().toArray());
  }
  neg() {
    return new Mt(super.neg().toArray());
  }
  abs() {
    return new Mt(super.abs().toArray());
  }
  toTwos(t) {
    return new Mt(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Mt(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, r) {
    const n = super[r](new Mt(t));
    return Mt.isBN(n) ? new Mt(n.toArray()) : n;
  }
  clone() {
    return new Mt(this.toArray());
  }
  mulTo(t, r) {
    const n = new As(this.toArray()).mulTo(t, r);
    return new Mt(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new As(this.toArray()).egcd(t);
    return {
      a: new Mt(r.toArray()),
      b: new Mt(n.toArray()),
      gcd: new Mt(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new As(this.toArray()).divmod(new Mt(t), r, n);
    return {
      div: new Mt(s == null ? void 0 : s.toArray()),
      mod: new Mt(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Mt(this.MAX_U64) : this;
  }
  max(t) {
    return this.gte(t) ? new Mt(t) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Mt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, x = (e, t, r) => new Mt(e, t, r);
x.parseUnits = (e, t = Sa) => {
  const r = e === "." ? "0." : e, [n = "0", s = "0"] = r.split("."), i = s.length;
  if (t === 0) {
    const u = r.replace(",", "").split(".")[0];
    return x(u);
  }
  if (i > t)
    throw new C(
      M.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const a = Array.from({ length: t }).fill("0");
  a.splice(0, i, s);
  const o = `${n.replaceAll(",", "")}${a.join("")}`;
  return x(o);
};
function IB(e, t) {
  const { precision: r = X_, minPrecision: n = Z_ } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), a = /(\d)(?=(\d{3})+\b)/g, o = s.replace(a, "$1,");
  let u = i.slice(0, r);
  if (n < r) {
    const p = u.match(/.*[1-9]{1}/), m = (p == null ? void 0 : p[0].length) || 0, I = Math.max(n, m);
    u = u.slice(0, I);
  }
  const f = u ? `.${u}` : "";
  return `${o}${f}`;
}
function Rr(e) {
  return x(e).toNumber();
}
function ho(e, t) {
  return x(e).toHex(t);
}
function pr(e, t) {
  return x(e).toBytes(t);
}
function EB(e, t) {
  return x(e).formatUnits(t);
}
function vB(e, t) {
  return x(e).format(t);
}
function CB(...e) {
  return e.reduce((t, r) => x(r).gt(t) ? x(r) : t, x(0));
}
function BB(...e) {
  return x(Math.ceil(e.reduce((t, r) => x(t).mul(r), x(1)).toNumber()));
}
var be = Uint8Array, Me = Uint16Array, lo = Int32Array, _i = new be([
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
]), hi = new be([
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
]), Ta = new be([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), W_ = function(e, t) {
  for (var r = new Me(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new lo(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, j_ = W_(_i, 2), J_ = j_.b, Na = j_.r;
J_[28] = 258, Na[258] = 28;
var q_ = W_(hi, 0), nA = q_.b, Ec = q_.r, Da = new Me(32768);
for (var Ft = 0; Ft < 32768; ++Ft) {
  var yr = (Ft & 43690) >> 1 | (Ft & 21845) << 1;
  yr = (yr & 52428) >> 2 | (yr & 13107) << 2, yr = (yr & 61680) >> 4 | (yr & 3855) << 4, Da[Ft] = ((yr & 65280) >> 8 | (yr & 255) << 8) >> 1;
}
var rr = function(e, t, r) {
  for (var n = e.length, s = 0, i = new Me(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var a = new Me(t);
  for (s = 1; s < t; ++s)
    a[s] = a[s - 1] + i[s - 1] << 1;
  var o;
  if (r) {
    o = new Me(1 << t);
    var u = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var f = s << 4 | e[s], p = t - e[s], m = a[e[s] - 1]++ << p, I = m | (1 << p) - 1; m <= I; ++m)
          o[Da[m] >> u] = f;
  } else
    for (o = new Me(n), s = 0; s < n; ++s)
      e[s] && (o[s] = Da[a[e[s] - 1]++] >> 15 - e[s]);
  return o;
}, Fr = new be(288);
for (var Ft = 0; Ft < 144; ++Ft)
  Fr[Ft] = 8;
for (var Ft = 144; Ft < 256; ++Ft)
  Fr[Ft] = 9;
for (var Ft = 256; Ft < 280; ++Ft)
  Fr[Ft] = 7;
for (var Ft = 280; Ft < 288; ++Ft)
  Fr[Ft] = 8;
var Hn = new be(32);
for (var Ft = 0; Ft < 32; ++Ft)
  Hn[Ft] = 5;
var sA = /* @__PURE__ */ rr(Fr, 9, 0), iA = /* @__PURE__ */ rr(Fr, 9, 1), aA = /* @__PURE__ */ rr(Hn, 5, 0), oA = /* @__PURE__ */ rr(Hn, 5, 1), Ji = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, Ve = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, qi = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, fo = function(e) {
  return (e + 7) / 8 | 0;
}, $_ = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new be(e.subarray(t, r));
}, cA = [
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
], He = function(e, t, r) {
  var n = new Error(t || cA[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, He), !r)
    throw n;
  return n;
}, dA = function(e, t, r, n) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return r || new be(0);
  var a = !r, o = a || t.i != 2, u = t.i;
  a && (r = new be(s * 3));
  var f = function(bt) {
    var yt = r.length;
    if (bt > yt) {
      var Ce = new be(Math.max(yt * 2, bt));
      Ce.set(r), r = Ce;
    }
  }, p = t.f || 0, m = t.p || 0, I = t.b || 0, S = t.l, F = t.d, R = t.m, D = t.n, z = s * 8;
  do {
    if (!S) {
      p = Ve(e, m, 1);
      var Y = Ve(e, m + 1, 3);
      if (m += 3, Y)
        if (Y == 1)
          S = iA, F = oA, R = 9, D = 5;
        else if (Y == 2) {
          var O = Ve(e, m, 31) + 257, P = Ve(e, m + 10, 15) + 4, G = O + Ve(e, m + 5, 31) + 1;
          m += 14;
          for (var k = new be(G), W = new be(19), j = 0; j < P; ++j)
            W[Ta[j]] = Ve(e, m + j * 3, 7);
          m += P * 3;
          for (var J = Ji(W), v = (1 << J) - 1, d = rr(W, J, 1), j = 0; j < G; ) {
            var _ = d[Ve(e, m, v)];
            m += _ & 15;
            var U = _ >> 4;
            if (U < 16)
              k[j++] = U;
            else {
              var A = 0, w = 0;
              for (U == 16 ? (w = 3 + Ve(e, m, 3), m += 2, A = k[j - 1]) : U == 17 ? (w = 3 + Ve(e, m, 7), m += 3) : U == 18 && (w = 11 + Ve(e, m, 127), m += 7); w--; )
                k[j++] = A;
            }
          }
          var y = k.subarray(0, O), B = k.subarray(O);
          R = Ji(y), D = Ji(B), S = rr(y, R, 1), F = rr(B, D, 1);
        } else
          He(1);
      else {
        var U = fo(m) + 4, Q = e[U - 4] | e[U - 3] << 8, T = U + Q;
        if (T > s) {
          u && He(0);
          break;
        }
        o && f(I + Q), r.set(e.subarray(U, T), I), t.b = I += Q, t.p = m = T * 8, t.f = p;
        continue;
      }
      if (m > z) {
        u && He(0);
        break;
      }
    }
    o && f(I + 131072);
    for (var N = (1 << R) - 1, b = (1 << D) - 1, l = m; ; l = m) {
      var A = S[qi(e, m) & N], E = A >> 4;
      if (m += A & 15, m > z) {
        u && He(0);
        break;
      }
      if (A || He(2), E < 256)
        r[I++] = E;
      else if (E == 256) {
        l = m, S = null;
        break;
      } else {
        var K = E - 254;
        if (E > 264) {
          var j = E - 257, tt = _i[j];
          K = Ve(e, m, (1 << tt) - 1) + J_[j], m += tt;
        }
        var rt = F[qi(e, m) & b], xt = rt >> 4;
        rt || He(3), m += rt & 15;
        var B = nA[xt];
        if (xt > 3) {
          var tt = hi[xt];
          B += qi(e, m) & (1 << tt) - 1, m += tt;
        }
        if (m > z) {
          u && He(0);
          break;
        }
        o && f(I + 131072);
        var ht = I + K;
        if (I < B) {
          var mt = i - B, Ge = Math.min(B, ht);
          for (mt + I < 0 && He(3); I < Ge; ++I)
            r[I] = n[mt + I];
        }
        for (; I < ht; ++I)
          r[I] = r[I - B];
      }
    }
    t.l = S, t.p = l, t.b = I, t.f = p, S && (p = 1, t.m = R, t.d = F, t.n = D);
  } while (!p);
  return I != r.length && a ? $_(r, 0, I) : r.subarray(0, I);
}, dr = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Tn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, $i = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: th, l: 0 };
  if (s == 1) {
    var a = new be(r[0].s + 1);
    return a[r[0].s] = 1, { t: a, l: 1 };
  }
  r.sort(function(T, O) {
    return T.f - O.f;
  }), r.push({ s: -1, f: 25001 });
  var o = r[0], u = r[1], f = 0, p = 1, m = 2;
  for (r[0] = { s: -1, f: o.f + u.f, l: o, r: u }; p != s - 1; )
    o = r[r[f].f < r[m].f ? f++ : m++], u = r[f != p && r[f].f < r[m].f ? f++ : m++], r[p++] = { s: -1, f: o.f + u.f, l: o, r: u };
  for (var I = i[0].s, n = 1; n < s; ++n)
    i[n].s > I && (I = i[n].s);
  var S = new Me(I + 1), F = Fa(r[p - 1], S, 0);
  if (F > t) {
    var n = 0, R = 0, D = F - t, z = 1 << D;
    for (i.sort(function(O, P) {
      return S[P.s] - S[O.s] || O.f - P.f;
    }); n < s; ++n) {
      var Y = i[n].s;
      if (S[Y] > t)
        R += z - (1 << F - S[Y]), S[Y] = t;
      else
        break;
    }
    for (R >>= D; R > 0; ) {
      var U = i[n].s;
      S[U] < t ? R -= 1 << t - S[U]++ - 1 : ++n;
    }
    for (; n >= 0 && R; --n) {
      var Q = i[n].s;
      S[Q] == t && (--S[Q], ++R);
    }
    F = t;
  }
  return { t: new be(S), l: F };
}, Fa = function(e, t, r) {
  return e.s == -1 ? Math.max(Fa(e.l, t, r + 1), Fa(e.r, t, r + 1)) : t[e.s] = r;
}, vc = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new Me(++t), n = 0, s = e[0], i = 1, a = function(u) {
    r[n++] = u;
  }, o = 1; o <= t; ++o)
    if (e[o] == s && o != t)
      ++i;
    else {
      if (!s && i > 2) {
        for (; i > 138; i -= 138)
          a(32754);
        i > 2 && (a(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0);
      } else if (i > 3) {
        for (a(s), --i; i > 6; i -= 6)
          a(8304);
        i > 2 && (a(i - 3 << 5 | 8208), i = 0);
      }
      for (; i--; )
        a(s);
      i = 1, s = e[o];
    }
  return { c: r.subarray(0, n), n: t };
}, Nn = function(e, t) {
  for (var r = 0, n = 0; n < t.length; ++n)
    r += e[n] * t[n];
  return r;
}, K_ = function(e, t, r) {
  var n = r.length, s = fo(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, Cc = function(e, t, r, n, s, i, a, o, u, f, p) {
  dr(t, p++, r), ++s[256];
  for (var m = $i(s, 15), I = m.t, S = m.l, F = $i(i, 15), R = F.t, D = F.l, z = vc(I), Y = z.c, U = z.n, Q = vc(R), T = Q.c, O = Q.n, P = new Me(19), G = 0; G < Y.length; ++G)
    ++P[Y[G] & 31];
  for (var G = 0; G < T.length; ++G)
    ++P[T[G] & 31];
  for (var k = $i(P, 7), W = k.t, j = k.l, J = 19; J > 4 && !W[Ta[J - 1]]; --J)
    ;
  var v = f + 5 << 3, d = Nn(s, Fr) + Nn(i, Hn) + a, _ = Nn(s, I) + Nn(i, R) + a + 14 + 3 * J + Nn(P, W) + 2 * P[16] + 3 * P[17] + 7 * P[18];
  if (u >= 0 && v <= d && v <= _)
    return K_(t, p, e.subarray(u, u + f));
  var A, w, y, B;
  if (dr(t, p, 1 + (_ < d)), p += 2, _ < d) {
    A = rr(I, S, 0), w = I, y = rr(R, D, 0), B = R;
    var N = rr(W, j, 0);
    dr(t, p, U - 257), dr(t, p + 5, O - 1), dr(t, p + 10, J - 4), p += 14;
    for (var G = 0; G < J; ++G)
      dr(t, p + 3 * G, W[Ta[G]]);
    p += 3 * J;
    for (var b = [Y, T], l = 0; l < 2; ++l)
      for (var E = b[l], G = 0; G < E.length; ++G) {
        var K = E[G] & 31;
        dr(t, p, N[K]), p += W[K], K > 15 && (dr(t, p, E[G] >> 5 & 127), p += E[G] >> 12);
      }
  } else
    A = sA, w = Fr, y = aA, B = Hn;
  for (var G = 0; G < o; ++G) {
    var tt = n[G];
    if (tt > 255) {
      var K = tt >> 18 & 31;
      Tn(t, p, A[K + 257]), p += w[K + 257], K > 7 && (dr(t, p, tt >> 23 & 31), p += _i[K]);
      var rt = tt & 31;
      Tn(t, p, y[rt]), p += B[rt], rt > 3 && (Tn(t, p, tt >> 5 & 8191), p += hi[rt]);
    } else
      Tn(t, p, A[tt]), p += w[tt];
  }
  return Tn(t, p, A[256]), p + w[256];
}, uA = /* @__PURE__ */ new lo([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), th = /* @__PURE__ */ new be(0), _A = function(e, t, r, n, s, i) {
  var a = i.z || e.length, o = new be(n + a + 5 * (1 + Math.ceil(a / 7e3)) + s), u = o.subarray(n, o.length - s), f = i.l, p = (i.r || 0) & 7;
  if (t) {
    p && (u[0] = i.r >> 3);
    for (var m = uA[t - 1], I = m >> 13, S = m & 8191, F = (1 << r) - 1, R = i.p || new Me(32768), D = i.h || new Me(F + 1), z = Math.ceil(r / 3), Y = 2 * z, U = function(Et) {
      return (e[Et] ^ e[Et + 1] << z ^ e[Et + 2] << Y) & F;
    }, Q = new lo(25e3), T = new Me(288), O = new Me(32), P = 0, G = 0, k = i.i || 0, W = 0, j = i.w || 0, J = 0; k + 2 < a; ++k) {
      var v = U(k), d = k & 32767, _ = D[v];
      if (R[d] = _, D[v] = d, j <= k) {
        var A = a - k;
        if ((P > 7e3 || W > 24576) && (A > 423 || !f)) {
          p = Cc(e, u, 0, Q, T, O, G, W, J, k - J, p), W = P = G = 0, J = k;
          for (var w = 0; w < 286; ++w)
            T[w] = 0;
          for (var w = 0; w < 30; ++w)
            O[w] = 0;
        }
        var y = 2, B = 0, N = S, b = d - _ & 32767;
        if (A > 2 && v == U(k - b))
          for (var l = Math.min(I, A) - 1, E = Math.min(32767, k), K = Math.min(258, A); b <= E && --N && d != _; ) {
            if (e[k + y] == e[k + y - b]) {
              for (var tt = 0; tt < K && e[k + tt] == e[k + tt - b]; ++tt)
                ;
              if (tt > y) {
                if (y = tt, B = b, tt > l)
                  break;
                for (var rt = Math.min(b, tt - 2), xt = 0, w = 0; w < rt; ++w) {
                  var ht = k - b + w & 32767, mt = R[ht], Ge = ht - mt & 32767;
                  Ge > xt && (xt = Ge, _ = ht);
                }
              }
            }
            d = _, _ = R[d], b += d - _ & 32767;
          }
        if (B) {
          Q[W++] = 268435456 | Na[y] << 18 | Ec[B];
          var bt = Na[y] & 31, yt = Ec[B] & 31;
          G += _i[bt] + hi[yt], ++T[257 + bt], ++O[yt], j = k + y, ++P;
        } else
          Q[W++] = e[k], ++T[e[k]];
      }
    }
    for (k = Math.max(k, j); k < a; ++k)
      Q[W++] = e[k], ++T[e[k]];
    p = Cc(e, u, f, Q, T, O, G, W, J, k - J, p), f || (i.r = p & 7 | u[p / 8 | 0] << 3, p -= 7, i.h = D, i.p = R, i.i = k, i.w = j);
  } else {
    for (var k = i.w || 0; k < a + f; k += 65535) {
      var Ce = k + 65535;
      Ce >= a && (u[p / 8 | 0] = f, Ce = a), p = K_(u, p + 1, e.subarray(k, Ce));
    }
    i.i = a;
  }
  return $_(o, 0, n + fo(p) + s);
}, hA = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), lA = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = hA[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, fA = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), a = new be(i.length + e.length);
    a.set(i), a.set(e, i.length), e = a, s.w = i.length;
  }
  return _A(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, Qa = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, AA = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Qa(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, pA = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && He(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, gA = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, wA = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function mA(e, t) {
  t || (t = {});
  var r = lA(), n = e.length;
  r.p(e);
  var s = fA(e, t, wA(t), 8), i = s.length;
  return AA(s, t), Qa(s, i - 8, r.d()), Qa(s, i - 4, n), s;
}
function yA(e, t) {
  var r = pA(e);
  return r + 8 > e.length && He(6, "invalid gzip data"), dA(e.subarray(r, -8), { i: 2 }, new be(gA(e)), t);
}
var bA = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), IA = 0;
try {
  bA.decode(th, { stream: !0 }), IA = 1;
} catch {
}
var EA = Object.defineProperty, vA = (e, t, r) => t in e ? EA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, CA = (e, t, r) => (vA(e, t + "", r), r), xB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, eh = (e, t) => {
  const r = [];
  for (let o = 0; o < e.length; o += t) {
    const u = new Uint8Array(t);
    u.set(e.slice(o, o + t)), r.push(u);
  }
  const n = r[r.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, a = n.slice(0, i);
  return r[r.length - 1] = a, r;
}, Z = (e, t, r = !0) => {
  if (e instanceof Uint8Array)
    return r ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((e.length - 2) / 2);
    let a = 2;
    for (let o = 0; o < i.length; o++)
      i[o] = parseInt(e.substring(a, a + 2), 16), a += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${e}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new C(M.INVALID_DATA, s);
}, li = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), r = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(r);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, at = (e) => {
  const t = e.map((r) => Z(r));
  return li(t);
}, Bc = "0123456789abcdef";
function X(e) {
  const t = Z(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += Bc[(s & 240) >> 4] + Bc[s & 15];
  }
  return r;
}
var RB = (e) => {
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
    throw new C(M.PARSE_FAILED, n);
  }
  return r;
}, BA = 37, rh = BigInt(2 ** 62) + BigInt(BA), xA = (e) => Math.floor(e / 1e3), nh = (e) => e * 1e3, RA = (e) => Number(BigInt(e) - rh), SA = (e) => String(BigInt(e) + rh), TA = (e) => nh(RA(e)), Rs = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Rs(TA(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Rs(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Rs(nh(e));
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
    return SA(this.toUnixSeconds());
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
    return xA(this.getTime());
  }
}, Ao = Rs;
CA(Ao, "TAI64_NULL", "");
function NA(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var DA = {
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
          ecop: 2,
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
          epar: {
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
}, FA = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, QA = {
  coins: [],
  messages: [],
  contracts: [],
  blobs: [],
  block_height: 0,
  da_block_height: 0
}, SB = {
  chainConfig: DA,
  metadata: FA,
  stateConfig: QA
}, TB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function je(e) {
  return e !== void 0;
}
var sh = x(0), Oa = x(58), Ms = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", ps = null;
function OA(e) {
  if (ps == null) {
    ps = {};
    for (let r = 0; r < Ms.length; r++)
      ps[Ms[r]] = x(r);
  }
  const t = ps[e];
  if (t == null)
    throw new C(M.INVALID_DATA, `invalid base58 value ${e}`);
  return x(t);
}
function ih(e) {
  const t = Z(e);
  let r = x(t), n = "";
  for (; r.gt(sh); )
    n = Ms[Number(r.mod(Oa))] + n, r = r.div(Oa);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Ms[0] + n;
  return n;
}
function MA(e) {
  let t = sh;
  for (let r = 0; r < e.length; r++)
    t = t.mul(Oa), t = t.add(OA(e[r].toString()));
  return t;
}
function po(e, t, r) {
  const n = Z(e);
  if (r != null && r > n.length)
    throw new C(M.INVALID_DATA, "cannot slice beyond data bounds");
  return X(n.slice(t ?? 0, r ?? n.length));
}
function tr(e, t = !0) {
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
      const a = r.charCodeAt(s);
      if (s >= r.length || (a & 64512) !== 56320)
        throw new C(
          M.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((i & 1023) << 10) + (a & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(i >> 12 | 224), n.push(i >> 6 & 63 | 128), n.push(i & 63 | 128);
  }
  return new Uint8Array(n);
}
function Lr(e, t, r, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${r}`), t;
}
function LA(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function PA(e) {
  const t = Z(e, "bytes"), r = [];
  let n = 0;
  for (; n < t.length; ) {
    const s = t[n++];
    if (!(s >> 7)) {
      r.push(s);
      continue;
    }
    let i = null, a = null;
    if ((s & 224) === 192)
      i = 1, a = 127;
    else if ((s & 240) === 224)
      i = 2, a = 2047;
    else if ((s & 248) === 240)
      i = 3, a = 65535;
    else {
      (s & 192) === 128 ? n += Lr("UNEXPECTED_CONTINUE", n - 1, t) : n += Lr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Lr("OVERRUN", n - 1, t);
      continue;
    }
    let o = s & (1 << 8 - i - 1) - 1;
    for (let u = 0; u < i; u++) {
      const f = t[n];
      if ((f & 192) !== 128) {
        n += Lr("MISSING_CONTINUE", n, t), o = null;
        break;
      }
      o = o << 6 | f & 63, n++;
    }
    if (o !== null) {
      if (o > 1114111) {
        n += Lr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (o >= 55296 && o <= 57343) {
        n += Lr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (o <= a) {
        n += Lr("OVERLONG", n - 1 - i, t);
        continue;
      }
      r.push(o);
    }
  }
  return r;
}
function go(e) {
  return LA(PA(e));
}
var NB = (e) => {
  if (!e)
    return "";
  const t = Z(e), r = mA(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(r)
  );
  return btoa(n);
}, kA = (e) => {
  const t = atob(e), r = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return yA(r);
};
function zA(e) {
  throw new Error("Didn't expect to get here");
}
function Oe(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error("positive integer expected, got " + e);
}
function GA(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function ns(e, ...t) {
  if (!GA(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function ah(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Oe(e.outputLen), Oe(e.blockLen);
}
function pn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function oh(e, t) {
  ns(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error("digestInto() expects output buffer of length at least " + r);
}
const tn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ss(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function Ts(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function qe(e, t) {
  return e << 32 - t | e >>> t;
}
function gt(e, t) {
  return e << t | e >>> 32 - t >>> 0;
}
const Ls = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function UA(e) {
  return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
}
function Ps(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = UA(e[t]);
}
function VA(e) {
  if (typeof e != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof e);
  return new Uint8Array(new TextEncoder().encode(e));
}
function gn(e) {
  return typeof e == "string" && (e = VA(e)), ns(e), e;
}
function YA(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    ns(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
class wo {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function ch(e, t) {
  if (t !== void 0 && {}.toString.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function fi(e) {
  const t = (n) => e().update(gn(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function HA(e = 32) {
  if (tn && typeof tn.getRandomValues == "function")
    return tn.getRandomValues(new Uint8Array(e));
  if (tn && typeof tn.randomBytes == "function")
    return tn.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
class dh extends wo {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, ah(t);
    const n = gn(r);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(n.length > s ? t.create().update(n).digest() : n);
    for (let a = 0; a < i.length; a++)
      i[a] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let a = 0; a < i.length; a++)
      i[a] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return pn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    pn(this), ns(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: r, iHash: n, finished: s, destroyed: i, blockLen: a, outputLen: o } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = a, t.outputLen = o, t.oHash = r._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Ai = (e, t, r) => new dh(e, t).update(r).digest();
Ai.create = (e, t) => new dh(e, t);
function XA(e, t, r, n) {
  ah(e);
  const s = ch({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: a, asyncTick: o } = s;
  if (Oe(i), Oe(a), Oe(o), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const u = gn(t), f = gn(r), p = new Uint8Array(a), m = Ai.create(e, u), I = m._cloneInto().update(f);
  return { c: i, dkLen: a, asyncTick: o, DK: p, PRF: m, PRFSalt: I };
}
function ZA(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function mo(e, t, r, n) {
  const { c: s, dkLen: i, DK: a, PRF: o, PRFSalt: u } = XA(e, t, r, n);
  let f;
  const p = new Uint8Array(4), m = Ts(p), I = new Uint8Array(o.outputLen);
  for (let S = 1, F = 0; F < i; S++, F += o.outputLen) {
    const R = a.subarray(F, F + o.outputLen);
    m.setInt32(0, S, !1), (f = u._cloneInto(f)).update(p).digestInto(I), R.set(I.subarray(0, R.length));
    for (let D = 1; D < s; D++) {
      o._cloneInto(f).update(I).digestInto(I);
      for (let z = 0; z < R.length; z++)
        R[z] ^= I[z];
    }
  }
  return ZA(o, u, a, f, I);
}
function WA(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), a = Number(r >> s & i), o = Number(r & i), u = n ? 4 : 0, f = n ? 0 : 4;
  e.setUint32(t + u, a, n), e.setUint32(t + f, o, n);
}
function jA(e, t, r) {
  return e & t ^ ~e & r;
}
function JA(e, t, r) {
  return e & t ^ e & r ^ t & r;
}
class yo extends wo {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ts(this.buffer);
  }
  update(t) {
    pn(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = gn(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(s - this.pos, i - a);
      if (o === s) {
        const u = Ts(t);
        for (; s <= i - a; a += s)
          this.process(u, a);
        continue;
      }
      n.set(t.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    pn(this), oh(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: a } = this;
    r[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(n, 0), a = 0);
    for (let m = a; m < s; m++)
      r[m] = 0;
    WA(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const o = Ts(t), u = this.outputLen;
    if (u % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = u / 4, p = this.get();
    if (f > p.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < f; m++)
      o.setUint32(4 * m, p[m], i);
  }
  digest() {
    const { buffer: t, outputLen: r } = this;
    this.digestInto(t);
    const n = t.slice(0, r);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: r, buffer: n, length: s, finished: i, destroyed: a, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = a, s % r && t.buffer.set(n), t;
  }
}
const qA = /* @__PURE__ */ new Uint32Array([
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
]), br = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Ir = /* @__PURE__ */ new Uint32Array(64);
class $A extends yo {
  constructor() {
    super(64, 32, 8, !1), this.A = br[0] | 0, this.B = br[1] | 0, this.C = br[2] | 0, this.D = br[3] | 0, this.E = br[4] | 0, this.F = br[5] | 0, this.G = br[6] | 0, this.H = br[7] | 0;
  }
  get() {
    const { A: t, B: r, C: n, D: s, E: i, F: a, G: o, H: u } = this;
    return [t, r, n, s, i, a, o, u];
  }
  // prettier-ignore
  set(t, r, n, s, i, a, o, u) {
    this.A = t | 0, this.B = r | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = u | 0;
  }
  process(t, r) {
    for (let m = 0; m < 16; m++, r += 4)
      Ir[m] = t.getUint32(r, !1);
    for (let m = 16; m < 64; m++) {
      const I = Ir[m - 15], S = Ir[m - 2], F = qe(I, 7) ^ qe(I, 18) ^ I >>> 3, R = qe(S, 17) ^ qe(S, 19) ^ S >>> 10;
      Ir[m] = R + Ir[m - 7] + F + Ir[m - 16] | 0;
    }
    let { A: n, B: s, C: i, D: a, E: o, F: u, G: f, H: p } = this;
    for (let m = 0; m < 64; m++) {
      const I = qe(o, 6) ^ qe(o, 11) ^ qe(o, 25), S = p + I + jA(o, u, f) + qA[m] + Ir[m] | 0, R = (qe(n, 2) ^ qe(n, 13) ^ qe(n, 22)) + JA(n, s, i) | 0;
      p = f, f = u, u = o, o = a + S | 0, a = i, i = s, s = n, n = S + R | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, u = u + this.F | 0, f = f + this.G | 0, p = p + this.H | 0, this.set(n, s, i, a, o, u, f, p);
  }
  roundClean() {
    Ir.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Mr = /* @__PURE__ */ fi(() => new $A());
function xc(e, t, r, n, s, i) {
  let a = e[t++] ^ r[n++], o = e[t++] ^ r[n++], u = e[t++] ^ r[n++], f = e[t++] ^ r[n++], p = e[t++] ^ r[n++], m = e[t++] ^ r[n++], I = e[t++] ^ r[n++], S = e[t++] ^ r[n++], F = e[t++] ^ r[n++], R = e[t++] ^ r[n++], D = e[t++] ^ r[n++], z = e[t++] ^ r[n++], Y = e[t++] ^ r[n++], U = e[t++] ^ r[n++], Q = e[t++] ^ r[n++], T = e[t++] ^ r[n++], O = a, P = o, G = u, k = f, W = p, j = m, J = I, v = S, d = F, _ = R, A = D, w = z, y = Y, B = U, N = Q, b = T;
  for (let l = 0; l < 8; l += 2)
    W ^= gt(O + y | 0, 7), d ^= gt(W + O | 0, 9), y ^= gt(d + W | 0, 13), O ^= gt(y + d | 0, 18), _ ^= gt(j + P | 0, 7), B ^= gt(_ + j | 0, 9), P ^= gt(B + _ | 0, 13), j ^= gt(P + B | 0, 18), N ^= gt(A + J | 0, 7), G ^= gt(N + A | 0, 9), J ^= gt(G + N | 0, 13), A ^= gt(J + G | 0, 18), k ^= gt(b + w | 0, 7), v ^= gt(k + b | 0, 9), w ^= gt(v + k | 0, 13), b ^= gt(w + v | 0, 18), P ^= gt(O + k | 0, 7), G ^= gt(P + O | 0, 9), k ^= gt(G + P | 0, 13), O ^= gt(k + G | 0, 18), J ^= gt(j + W | 0, 7), v ^= gt(J + j | 0, 9), W ^= gt(v + J | 0, 13), j ^= gt(W + v | 0, 18), w ^= gt(A + _ | 0, 7), d ^= gt(w + A | 0, 9), _ ^= gt(d + w | 0, 13), A ^= gt(_ + d | 0, 18), y ^= gt(b + N | 0, 7), B ^= gt(y + b | 0, 9), N ^= gt(B + y | 0, 13), b ^= gt(N + B | 0, 18);
  s[i++] = a + O | 0, s[i++] = o + P | 0, s[i++] = u + G | 0, s[i++] = f + k | 0, s[i++] = p + W | 0, s[i++] = m + j | 0, s[i++] = I + J | 0, s[i++] = S + v | 0, s[i++] = F + d | 0, s[i++] = R + _ | 0, s[i++] = D + A | 0, s[i++] = z + w | 0, s[i++] = Y + y | 0, s[i++] = U + B | 0, s[i++] = Q + N | 0, s[i++] = T + b | 0;
}
function Ki(e, t, r, n, s) {
  let i = n + 0, a = n + 16 * s;
  for (let o = 0; o < 16; o++)
    r[a + o] = e[t + (2 * s - 1) * 16 + o];
  for (let o = 0; o < s; o++, i += 16, t += 16)
    xc(r, a, e, t, r, i), o > 0 && (a += 16), xc(r, i, e, t += 16, r, a);
}
function KA(e, t, r) {
  const n = ch({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: a, dkLen: o, asyncTick: u, maxmem: f, onProgress: p } = n;
  if (Oe(s), Oe(i), Oe(a), Oe(o), Oe(u), Oe(f), p !== void 0 && typeof p != "function")
    throw new Error("progressCb should be function");
  const m = 128 * i, I = m / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (a < 0 || a > (2 ** 32 - 1) * 32 / m)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (o < 0 || o > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  if (m * (s + a) > f)
    throw new Error("Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of " + f);
  const F = mo(Mr, e, t, { c: 1, dkLen: m * a }), R = Ss(F), D = Ss(new Uint8Array(m * s)), z = Ss(new Uint8Array(m));
  let Y = () => {
  };
  if (p) {
    const U = 2 * s * a, Q = Math.max(Math.floor(U / 1e4), 1);
    let T = 0;
    Y = () => {
      T++, p && (!(T % Q) || T === U) && p(T / U);
    };
  }
  return { N: s, r: i, p: a, dkLen: o, blockSize32: I, V: D, B32: R, B: F, tmp: z, blockMixCb: Y, asyncTick: u };
}
function tp(e, t, r, n, s) {
  const i = mo(Mr, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function ep(e, t, r) {
  const { N: n, r: s, p: i, dkLen: a, blockSize32: o, V: u, B32: f, B: p, tmp: m, blockMixCb: I } = KA(e, t, r);
  Ls || Ps(f);
  for (let S = 0; S < i; S++) {
    const F = o * S;
    for (let R = 0; R < o; R++)
      u[R] = f[F + R];
    for (let R = 0, D = 0; R < n - 1; R++)
      Ki(u, D, u, D += o, s), I();
    Ki(u, (n - 1) * o, f, F, s), I();
    for (let R = 0; R < n; R++) {
      const D = f[F + o - 16] % n;
      for (let z = 0; z < o; z++)
        m[z] = f[F + z] ^ u[D * o + z];
      Ki(m, 0, f, F, s), I();
    }
  }
  return Ls || Ps(f), tp(e, a, p, u, m);
}
const gs = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ma = /* @__PURE__ */ BigInt(32);
function uh(e, t = !1) {
  return t ? { h: Number(e & gs), l: Number(e >> Ma & gs) } : { h: Number(e >> Ma & gs) | 0, l: Number(e & gs) | 0 };
}
function _h(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: a } = uh(e[s], t);
    [r[s], n[s]] = [i, a];
  }
  return [r, n];
}
const rp = (e, t) => BigInt(e >>> 0) << Ma | BigInt(t >>> 0), np = (e, t, r) => e >>> r, sp = (e, t, r) => e << 32 - r | t >>> r, ip = (e, t, r) => e >>> r | t << 32 - r, ap = (e, t, r) => e << 32 - r | t >>> r, op = (e, t, r) => e << 64 - r | t >>> r - 32, cp = (e, t, r) => e >>> r - 32 | t << 64 - r, dp = (e, t) => t, up = (e, t) => e, hh = (e, t, r) => e << r | t >>> 32 - r, lh = (e, t, r) => t << r | e >>> 32 - r, fh = (e, t, r) => t << r - 32 | e >>> 64 - r, Ah = (e, t, r) => e << r - 32 | t >>> 64 - r;
function _p(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const hp = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), lp = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, fp = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), Ap = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, pp = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), gp = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, lt = {
  fromBig: uh,
  split: _h,
  toBig: rp,
  shrSH: np,
  shrSL: sp,
  rotrSH: ip,
  rotrSL: ap,
  rotrBH: op,
  rotrBL: cp,
  rotr32H: dp,
  rotr32L: up,
  rotlSH: hh,
  rotlSL: lh,
  rotlBH: fh,
  rotlBL: Ah,
  add: _p,
  add3L: hp,
  add3H: lp,
  add4L: fp,
  add4H: Ap,
  add5H: gp,
  add5L: pp
}, ph = [], gh = [], wh = [], wp = /* @__PURE__ */ BigInt(0), Dn = /* @__PURE__ */ BigInt(1), mp = /* @__PURE__ */ BigInt(2), yp = /* @__PURE__ */ BigInt(7), bp = /* @__PURE__ */ BigInt(256), Ip = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = Dn, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], ph.push(2 * (5 * n + r)), gh.push((e + 1) * (e + 2) / 2 % 64);
  let s = wp;
  for (let i = 0; i < 7; i++)
    t = (t << Dn ^ (t >> yp) * Ip) % bp, t & mp && (s ^= Dn << (Dn << /* @__PURE__ */ BigInt(i)) - Dn);
  wh.push(s);
}
const [Ep, vp] = /* @__PURE__ */ _h(wh, !0), Rc = (e, t, r) => r > 32 ? fh(e, t, r) : hh(e, t, r), Sc = (e, t, r) => r > 32 ? Ah(e, t, r) : lh(e, t, r);
function Cp(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let a = 0; a < 10; a++)
      r[a] = e[a] ^ e[a + 10] ^ e[a + 20] ^ e[a + 30] ^ e[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const o = (a + 8) % 10, u = (a + 2) % 10, f = r[u], p = r[u + 1], m = Rc(f, p, 1) ^ r[o], I = Sc(f, p, 1) ^ r[o + 1];
      for (let S = 0; S < 50; S += 10)
        e[a + S] ^= m, e[a + S + 1] ^= I;
    }
    let s = e[2], i = e[3];
    for (let a = 0; a < 24; a++) {
      const o = gh[a], u = Rc(s, i, o), f = Sc(s, i, o), p = ph[a];
      s = e[p], i = e[p + 1], e[p] = u, e[p + 1] = f;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let o = 0; o < 10; o++)
        r[o] = e[a + o];
      for (let o = 0; o < 10; o++)
        e[a + o] ^= ~r[(o + 2) % 10] & r[(o + 4) % 10];
    }
    e[0] ^= Ep[n], e[1] ^= vp[n];
  }
  r.fill(0);
}
class bo extends wo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Oe(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ss(this.state);
  }
  keccak() {
    Ls || Ps(this.state32), Cp(this.state32, this.rounds), Ls || Ps(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    pn(this);
    const { blockLen: r, state: n } = this;
    t = gn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const a = Math.min(r - this.pos, s - i);
      for (let o = 0; o < a; o++)
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
    pn(this, !1), ns(t), this.finish();
    const r = this.state, { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const a = Math.min(n - this.posOut, i - s);
      t.set(r.subarray(this.posOut, this.posOut + a), s), this.posOut += a, s += a;
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
    if (oh(t, this), this.finished)
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
    const { blockLen: r, suffix: n, outputLen: s, rounds: i, enableXOF: a } = this;
    return t || (t = new bo(r, n, s, a, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = a, t.destroyed = this.destroyed, t;
  }
}
const Bp = (e, t, r) => fi(() => new bo(t, e, r)), xp = /* @__PURE__ */ Bp(1, 136, 256 / 8), Rp = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), mh = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((e, t) => t)), Sp = /* @__PURE__ */ mh.map((e) => (9 * e + 5) % 16);
let Io = [mh], Eo = [Sp];
for (let e = 0; e < 4; e++)
  for (let t of [Io, Eo])
    t.push(t[e].map((r) => Rp[r]));
const yh = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Tp = /* @__PURE__ */ Io.map((e, t) => e.map((r) => yh[t][r])), Np = /* @__PURE__ */ Eo.map((e, t) => e.map((r) => yh[t][r])), Dp = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Fp = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function Tc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const ws = /* @__PURE__ */ new Uint32Array(16);
class Qp extends yo {
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
    for (let S = 0; S < 16; S++, r += 4)
      ws[S] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, a = i, o = this.h2 | 0, u = o, f = this.h3 | 0, p = f, m = this.h4 | 0, I = m;
    for (let S = 0; S < 5; S++) {
      const F = 4 - S, R = Dp[S], D = Fp[S], z = Io[S], Y = Eo[S], U = Tp[S], Q = Np[S];
      for (let T = 0; T < 16; T++) {
        const O = gt(n + Tc(S, i, o, f) + ws[z[T]] + R, U[T]) + m | 0;
        n = m, m = f, f = gt(o, 10) | 0, o = i, i = O;
      }
      for (let T = 0; T < 16; T++) {
        const O = gt(s + Tc(F, a, u, p) + ws[Y[T]] + D, Q[T]) + I | 0;
        s = I, I = p, p = gt(u, 10) | 0, u = a, a = O;
      }
    }
    this.set(this.h1 + o + p | 0, this.h2 + f + I | 0, this.h3 + m + s | 0, this.h4 + n + a | 0, this.h0 + i + u | 0);
  }
  roundClean() {
    ws.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Op = /* @__PURE__ */ fi(() => new Qp()), [Mp, Lp] = lt.split([
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
].map((e) => BigInt(e))), Er = /* @__PURE__ */ new Uint32Array(80), vr = /* @__PURE__ */ new Uint32Array(80);
class Pp extends yo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: a, Dh: o, Dl: u, Eh: f, El: p, Fh: m, Fl: I, Gh: S, Gl: F, Hh: R, Hl: D } = this;
    return [t, r, n, s, i, a, o, u, f, p, m, I, S, F, R, D];
  }
  // prettier-ignore
  set(t, r, n, s, i, a, o, u, f, p, m, I, S, F, R, D) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = u | 0, this.Eh = f | 0, this.El = p | 0, this.Fh = m | 0, this.Fl = I | 0, this.Gh = S | 0, this.Gl = F | 0, this.Hh = R | 0, this.Hl = D | 0;
  }
  process(t, r) {
    for (let U = 0; U < 16; U++, r += 4)
      Er[U] = t.getUint32(r), vr[U] = t.getUint32(r += 4);
    for (let U = 16; U < 80; U++) {
      const Q = Er[U - 15] | 0, T = vr[U - 15] | 0, O = lt.rotrSH(Q, T, 1) ^ lt.rotrSH(Q, T, 8) ^ lt.shrSH(Q, T, 7), P = lt.rotrSL(Q, T, 1) ^ lt.rotrSL(Q, T, 8) ^ lt.shrSL(Q, T, 7), G = Er[U - 2] | 0, k = vr[U - 2] | 0, W = lt.rotrSH(G, k, 19) ^ lt.rotrBH(G, k, 61) ^ lt.shrSH(G, k, 6), j = lt.rotrSL(G, k, 19) ^ lt.rotrBL(G, k, 61) ^ lt.shrSL(G, k, 6), J = lt.add4L(P, j, vr[U - 7], vr[U - 16]), v = lt.add4H(J, O, W, Er[U - 7], Er[U - 16]);
      Er[U] = v | 0, vr[U] = J | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: a, Ch: o, Cl: u, Dh: f, Dl: p, Eh: m, El: I, Fh: S, Fl: F, Gh: R, Gl: D, Hh: z, Hl: Y } = this;
    for (let U = 0; U < 80; U++) {
      const Q = lt.rotrSH(m, I, 14) ^ lt.rotrSH(m, I, 18) ^ lt.rotrBH(m, I, 41), T = lt.rotrSL(m, I, 14) ^ lt.rotrSL(m, I, 18) ^ lt.rotrBL(m, I, 41), O = m & S ^ ~m & R, P = I & F ^ ~I & D, G = lt.add5L(Y, T, P, Lp[U], vr[U]), k = lt.add5H(G, z, Q, O, Mp[U], Er[U]), W = G | 0, j = lt.rotrSH(n, s, 28) ^ lt.rotrBH(n, s, 34) ^ lt.rotrBH(n, s, 39), J = lt.rotrSL(n, s, 28) ^ lt.rotrBL(n, s, 34) ^ lt.rotrBL(n, s, 39), v = n & i ^ n & o ^ i & o, d = s & a ^ s & u ^ a & u;
      z = R | 0, Y = D | 0, R = S | 0, D = F | 0, S = m | 0, F = I | 0, { h: m, l: I } = lt.add(f | 0, p | 0, k | 0, W | 0), f = o | 0, p = u | 0, o = i | 0, u = a | 0, i = n | 0, a = s | 0;
      const _ = lt.add3L(W, J, d);
      n = lt.add3H(_, k, j, v), s = _ | 0;
    }
    ({ h: n, l: s } = lt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: a } = lt.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: o, l: u } = lt.add(this.Ch | 0, this.Cl | 0, o | 0, u | 0), { h: f, l: p } = lt.add(this.Dh | 0, this.Dl | 0, f | 0, p | 0), { h: m, l: I } = lt.add(this.Eh | 0, this.El | 0, m | 0, I | 0), { h: S, l: F } = lt.add(this.Fh | 0, this.Fl | 0, S | 0, F | 0), { h: R, l: D } = lt.add(this.Gh | 0, this.Gl | 0, R | 0, D | 0), { h: z, l: Y } = lt.add(this.Hh | 0, this.Hl | 0, z | 0, Y | 0), this.set(n, s, i, a, o, u, f, p, m, I, S, F, R, D, z, Y);
  }
  roundClean() {
    Er.fill(0), vr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const bh = /* @__PURE__ */ fi(() => new Pp());
var kp = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: a } = e;
  return ep(t, r, { N: n, r: i, p: s, dkLen: a });
}, zp = (e) => xp(e);
function Gp(e) {
  const t = Z(e, "data");
  return Op(t);
}
var ln = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextEncoder().encode(e);
    case "base64": {
      const r = atob(e), n = r.length;
      return new Uint8Array(n).map((i, a) => r.charCodeAt(a));
    }
    case "hex":
    default: {
      const r = e.length / 2;
      return new Uint8Array(r).map((s, i) => {
        const a = i * 2;
        return parseInt(e.substring(a, a + 2), 16);
      });
    }
  }
}, Ih = (e, t, r, n, s) => {
  const i = { sha256: Mr, sha512: bh }[s];
  return X(mo(i, e, t, { c: r, dkLen: n }));
}, { crypto: ss, btoa: Eh } = globalThis;
if (!ss)
  throw new C(
    M.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Eh)
  throw new C(
    M.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var La = (e) => ss.getRandomValues(new Uint8Array(e)), Ns = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return Eh(r);
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
}, vh = "AES-CTR", vo = (e, t) => {
  const r = ln(String(e).normalize("NFKC"), "utf-8"), n = Ih(r, t, 1e5, 32, "sha256");
  return Z(n);
}, Up = async (e, t) => {
  const r = La(16), n = La(32), s = vo(e, n), i = JSON.stringify(t), a = ln(i, "utf-8"), o = {
    name: vh,
    counter: r,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, o, !1, ["encrypt"]), f = await crypto.subtle.encrypt(o, u, a);
  return {
    data: Ns(new Uint8Array(f)),
    iv: Ns(r),
    salt: Ns(n)
  };
}, Vp = async (e, t) => {
  const r = ln(t.iv), n = ln(t.salt), s = vo(e, n), i = ln(t.data), a = {
    name: vh,
    counter: r,
    length: 64
  }, o = await crypto.subtle.importKey("raw", s, a, !1, ["decrypt"]), u = await crypto.subtle.decrypt(a, o, i), f = new TextDecoder().decode(u);
  try {
    return JSON.parse(f);
  } catch {
    throw new C(M.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Yp = async (e, t, r) => {
  const n = ss.subtle, s = new Uint8Array(t.subarray(0, 16)), i = r, a = e, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), u = await n.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(u);
}, Hp = async (e, t, r) => {
  const n = ss.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(r).buffer, a = new Uint8Array(e).buffer, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), u = await n.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(u);
}, Xp = (e, t, r) => {
  const n = e === "sha256" ? Mr : bh, s = Ai.create(n, t).update(r).digest();
  return X(s);
}, Zp = () => ss.randomUUID(), Wp = {
  bufferFromString: ln,
  stringFromBuffer: Ns,
  decrypt: Vp,
  encrypt: Up,
  keyFromPassword: vo,
  randomBytes: La,
  scrypt: kp,
  keccak256: zp,
  decryptJsonWalletData: Hp,
  encryptJsonWalletData: Yp,
  computeHmac: Xp,
  pbkdf2: Ih,
  ripemd160: Gp,
  randomUUID: Zp
}, jp = Wp, {
  bufferFromString: Vr,
  decrypt: Jp,
  encrypt: qp,
  keyFromPassword: DB,
  randomBytes: ze,
  stringFromBuffer: Mn,
  scrypt: Ch,
  keccak256: Bh,
  decryptJsonWalletData: $p,
  encryptJsonWalletData: Kp,
  pbkdf2: tg,
  computeHmac: xh,
  ripemd160: eg,
  randomUUID: rg
} = jp, ng = `Fuel Signed Message:
`;
function ge(e) {
  return X(Mr(Z(e)));
}
function sr(e) {
  return ge(e);
}
function sg(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function ig(e) {
  if (typeof e == "string")
    return ge(tr(e));
  const { personalSign: t } = e, r = typeof t == "string" ? tr(t) : t, n = at([
    tr(ng),
    tr(String(r.length)),
    r
  ]);
  return X(ge(n));
}
var ag = Object.defineProperty, og = (e, t, r) => t in e ? ag(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Co = (e, t, r) => (og(e, t + "", r), r), At = class {
  constructor(e, t, r) {
    L(this, "name");
    L(this, "type");
    L(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, cg = "u8", dg = "u16", ug = "u32", _g = "u64", hg = "u256", lg = "raw untyped ptr", fg = "raw untyped slice", Ag = "bool", pg = "b256", gg = "struct std::b512::B512", ks = "enum std::option::Option", wg = "struct std::vec::Vec", mg = "struct std::bytes::Bytes", yg = "struct std::string::String", bg = "str", is = "()", Rh = /^enum (std::option::)?Option$/m, Sh = /^str\[(?<length>[0-9]+)\]/, Pa = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Th = /^struct.+/, Nh = /^enum.+$/, Ig = /^\((?<items>.*)\)$/, Eg = /^generic.+$/, vg = /([^\s]+)$/m, zs = "1", dt = 8, gr = 32, Gs = gr + 2, Xn = gr, ka = gr, Cg = gr, Bg = dt * 4, xg = dt * 2, Dh = 2 ** 32 - 1, Fh = ({ maxInputs: e }) => gr + // Tx ID
Xn + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Xn + dt) + dt, Qh = dt + // Identifier
dt + // Gas limit
dt + // Script size
dt + // Script data size
dt + // Policies
dt + // Inputs size
dt + // Outputs size
dt + // Witnesses size
gr, FB = dt + // Identifier
Bg + // Utxo Length
dt + // Output Index
Cg + // Owner
dt + // Amount
Xn + // Asset id
xg + // TxPointer
dt + // Witnesses index
dt + // Predicate size
dt + // Predicate data size
dt, Nc = (e) => e instanceof Uint8Array, Cn = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const r of t)
    if (r.type === ks || "coder" in r && r.coder.type === ks || "coders" in r && Cn(r.coders))
      return !0;
  return !1;
}, Kn, M_, ft = (M_ = class extends At {
  constructor(t, r) {
    super("array", `[${t.type}; ${r}]`, r * t.encodedLength);
    L(this, "coder");
    L(this, "length");
    Ue(this, Kn);
    this.coder = t, this.length = r, Je(this, Kn, Cn([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new C(M.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new C(M.ENCODE_ERROR, "Types/values length mismatch.");
    return at(Array.from(t).map((r) => this.coder.encode(r)));
  }
  decode(t, r) {
    if (!Qt(this, Kn) && t.length < this.encodedLength || t.length > Dh)
      throw new C(M.DECODE_ERROR, "Invalid array data size.");
    let n = r;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, n] = this.coder.decode(t, n), i;
    }), n];
  }
}, Kn = new WeakMap(), M_), it = class extends At {
  constructor() {
    super("b256", "b256", dt * 4);
  }
  encode(e) {
    let t;
    try {
      t = Z(e);
    } catch {
      throw new C(M.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new C(M.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid b256 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (x(r).isZero() && (r = new Uint8Array(32)), r.length !== this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid b256 byte data size.");
    return [ho(r, 32), t + 32];
  }
}, Rg = class extends At {
  constructor() {
    super("b512", "struct B512", dt * 8);
  }
  encode(e) {
    let t;
    try {
      t = Z(e);
    } catch {
      throw new C(M.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new C(M.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid b512 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (x(r).isZero() && (r = new Uint8Array(64)), r.length !== this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid b512 byte data size.");
    return [ho(r, this.encodedLength), t + this.encodedLength];
  }
}, Sg = {
  u64: dt,
  u256: dt * 4
}, et = class extends At {
  constructor(e) {
    super("bigNumber", e, Sg[e]);
  }
  encode(e) {
    let t;
    if (typeof e == "number" && e > Number.MAX_SAFE_INTEGER)
      throw new C(
        M.ENCODE_ERROR,
        `Invalid ${this.type} type - number value is too large. Number can only safely handle up to 53 bits.`
      );
    try {
      t = pr(e, this.encodedLength);
    } catch {
      throw new C(M.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let r = e.slice(t, t + this.encodedLength);
    if (r = r.slice(0, this.encodedLength), r.length !== this.encodedLength)
      throw new C(M.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [x(r), t + this.encodedLength];
  }
}, Tg = class extends At {
  constructor(t = {
    padToWordSize: !1
  }) {
    const r = t.padToWordSize ? dt : 1;
    super("boolean", "boolean", r);
    L(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new C(M.ENCODE_ERROR, "Invalid boolean value.");
    return pr(t ? 1 : 0, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid boolean data size.");
    const n = x(t.slice(r, r + this.encodedLength));
    if (n.isZero())
      return [!1, r + this.encodedLength];
    if (!n.eq(x(1)))
      throw new C(M.DECODE_ERROR, "Invalid boolean value.");
    return [!0, r + this.encodedLength];
  }
}, Oh = class extends At {
  constructor() {
    super("struct", "struct Bytes", dt);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), r = new et("u64").encode(t.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < dt)
      throw new C(M.DECODE_ERROR, "Invalid byte data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new et("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(M.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, r + s];
  }
};
Co(Oh, "memorySize", 1);
var Zr, ts, fn, Or, Lh, Ph, kh, L_, Mh = (L_ = class extends At {
  constructor(t, r) {
    const n = new et("u64"), s = Object.values(r).reduce(
      (i, a) => Math.min(i, a.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    Ue(this, Or);
    L(this, "name");
    L(this, "coders");
    Ue(this, Zr);
    Ue(this, ts);
    Ue(this, fn);
    this.name = t, this.coders = r, Je(this, Zr, n), Je(this, ts, s), Je(this, fn, !(Rh.test(this.type) || Cn(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return fs(this, Or, Ph).call(this, t);
    const [r, ...n] = Object.keys(t);
    if (!r)
      throw new C(M.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (n.length !== 0)
      throw new C(M.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[r], i = Object.keys(this.coders).indexOf(r);
    if (i === -1) {
      const o = Object.keys(this.coders).map((u) => `'${u}'`).join(", ");
      throw new C(
        M.INVALID_DECODE_VALUE,
        `Invalid case '${r}'. Valid cases: ${o}.`
      );
    }
    const a = s.encode(t[r]);
    return new Uint8Array([...Qt(this, Zr).encode(i), ...a]);
  }
  decode(t, r) {
    if (Qt(this, fn) && t.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid enum data size.");
    const n = new et("u64").decode(t, r)[0], s = Rr(n), i = Object.keys(this.coders)[s];
    if (!i)
      throw new C(
        M.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const a = this.coders[i], o = r + Qt(this, Zr).encodedLength;
    if (Qt(this, fn) && t.length < o + a.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid enum data size.");
    const [u, f] = a.decode(t, o);
    return fs(this, Or, Lh).call(this, this.coders[i]) ? fs(this, Or, kh).call(this, i, f) : [{ [i]: u }, f];
  }
}, Zr = new WeakMap(), ts = new WeakMap(), fn = new WeakMap(), Or = new WeakSet(), // Checks that we're handling a native enum that is of type void.
Lh = function(t) {
  return this.type !== ks && t.type === is;
}, Ph = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Qt(this, ts) - r.encodedLength);
  return at([Qt(this, Zr).encode(s), i, n]);
}, kh = function(t, r) {
  return [t, r];
}, L_), Ng = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new C(M.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, q = class extends At {
  constructor(t, r = {
    padToWordSize: !1
  }) {
    const n = r.padToWordSize ? dt : Ng(t);
    super("number", t, n);
    L(this, "baseType");
    L(this, "options");
    this.baseType = t, this.options = r;
  }
  encode(t) {
    let r;
    try {
      r = pr(t);
    } catch {
      throw new C(M.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (r.length > this.encodedLength)
      throw new C(M.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return pr(r, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid number data size.");
    const n = t.slice(r, r + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid number byte data size.");
    return [Rr(n), r + this.encodedLength];
  }
}, zh = class extends Mh {
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
}, Dg = class extends At {
  constructor() {
    super("raw untyped slice", "raw untyped slice", dt);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new C(M.ENCODE_ERROR, "Expected array value.");
    const r = new ft(new q("u8"), e.length).encode(e), n = new et("u64").encode(r.length);
    return new Uint8Array([...n, ...r]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid raw slice data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new et("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(M.DECODE_ERROR, "Invalid raw slice byte data size.");
    const a = new ft(new q("u8"), s), [o] = a.decode(i, 0);
    return [o, r + s];
  }
}, pi = class extends At {
  constructor() {
    super("struct", "struct String", dt);
  }
  encode(e) {
    const t = tr(e), r = new et("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid std string data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new et("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(M.DECODE_ERROR, "Invalid std string byte data size.");
    return [go(i), r + s];
  }
};
Co(pi, "memorySize", 1);
var Gh = class extends At {
  constructor() {
    super("strSlice", "str", dt);
  }
  encode(e) {
    const t = tr(e), r = new et("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid string slice data size.");
    const r = t + dt, n = e.slice(t, r), s = x(new et("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new C(M.DECODE_ERROR, "Invalid string slice byte data size.");
    return [go(i), r + s];
  }
};
Co(Gh, "memorySize", 1);
var Fg = class extends At {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new C(M.ENCODE_ERROR, "Value length mismatch during encode.");
    return tr(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(t, t + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid string byte data size.");
    return [go(r), t + this.encodedLength];
  }
}, es, P_, gi = (P_ = class extends At {
  constructor(t, r) {
    const n = Object.values(r).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, n);
    L(this, "name");
    L(this, "coders");
    Ue(this, es);
    this.name = t, this.coders = r, Je(this, es, Cn(r));
  }
  encode(t) {
    return li(
      Object.keys(this.coders).map((r) => {
        const n = this.coders[r], s = t[r];
        if (!(n instanceof zh) && s == null)
          throw new C(
            M.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${r}" not present.`
          );
        return n.encode(s);
      })
    );
  }
  decode(t, r) {
    if (!Qt(this, es) && t.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid struct data size.");
    let n = r;
    return [Object.keys(this.coders).reduce((i, a) => {
      const o = this.coders[a];
      let u;
      return [u, n] = o.decode(t, n), i[a] = u, i;
    }, {}), n];
  }
}, es = new WeakMap(), P_), rs, k_, Uh = (k_ = class extends At {
  constructor(t) {
    const r = t.reduce((n, s) => n + s.encodedLength, 0);
    super("tuple", `(${t.map((n) => n.type).join(", ")})`, r);
    L(this, "coders");
    Ue(this, rs);
    this.coders = t, Je(this, rs, Cn(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new C(M.ENCODE_ERROR, "Types/values length mismatch.");
    return li(this.coders.map((r, n) => r.encode(t[n])));
  }
  decode(t, r) {
    if (!Qt(this, rs) && t.length < this.encodedLength)
      throw new C(M.DECODE_ERROR, "Invalid tuple data size.");
    let n = r;
    return [this.coders.map((i) => {
      let a;
      return [a, n] = i.decode(t, n), a;
    }), n];
  }
}, rs = new WeakMap(), k_), An, z_, Qg = (z_ = class extends At {
  constructor(t) {
    super("struct", "struct Vec", dt);
    L(this, "coder");
    Ue(this, An);
    this.coder = t, Je(this, An, Cn([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !Nc(t))
      throw new C(
        M.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const r = new et("u64");
    if (Nc(t))
      return new Uint8Array([...r.encode(t.length), ...t]);
    const n = t.map((i) => this.coder.encode(i)), s = r.encode(t.length);
    return new Uint8Array([...s, ...li(n)]);
  }
  decode(t, r) {
    if (!Qt(this, An) && t.length < this.encodedLength || t.length > Dh)
      throw new C(M.DECODE_ERROR, "Invalid vec data size.");
    const n = r + dt, s = t.slice(r, n), i = x(new et("u64").decode(s, 0)[0]).toNumber(), a = i * this.coder.encodedLength, o = t.slice(n, n + a);
    if (!Qt(this, An) && o.length !== a)
      throw new C(M.DECODE_ERROR, "Invalid vec byte data size.");
    let u = n;
    const f = [];
    for (let p = 0; p < i; p++) {
      const [m, I] = this.coder.decode(t, u);
      f.push(m), u = I;
    }
    return [f, u];
  }
}, An = new WeakMap(), z_), Vh = (e) => {
  switch (e) {
    case void 0:
    case zs:
      return zs;
    default:
      throw new C(
        M.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Un = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new C(
      M.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, Og = (e, t) => t.filter((r) => Un(e, r.type).type !== is), Mg = (e) => {
  var n;
  const t = e.find((s) => s.name === "buf"), r = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !r)
    throw new C(
      M.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return r;
}, Sr = class {
  constructor(e, t) {
    L(this, "abi");
    L(this, "name");
    L(this, "type");
    L(this, "originalTypeArguments");
    L(this, "components");
    this.abi = e, this.name = t.name;
    const r = Un(e, t.type);
    if (r.type.length > 256)
      throw new C(
        M.INVALID_COMPONENT,
        `The provided ABI type is too long: ${r.type}.`
      );
    this.type = r.type, this.originalTypeArguments = t.typeArguments, this.components = Sr.getResolvedGenericComponents(
      e,
      t,
      r.components,
      r.typeParameters ?? Sr.getImplicitGenericTypeParameters(e, r.components)
    );
  }
  static getResolvedGenericComponents(e, t, r, n) {
    if (r === null)
      return null;
    if (n === null || n.length === 0)
      return r.map((a) => new Sr(e, a));
    const s = n.reduce(
      (a, o, u) => {
        var p;
        const f = { ...a };
        return f[o] = structuredClone(
          (p = t.typeArguments) == null ? void 0 : p[u]
        ), f;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      r,
      s
    ).map((a) => new Sr(e, a));
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
      const s = Un(e, n.type), i = this.getImplicitGenericTypeParameters(e, s.components);
      return i && i.length > 0 ? {
        ...structuredClone(n),
        typeArguments: i.map((a) => r[a])
      } : n;
    });
  }
  static getImplicitGenericTypeParameters(e, t, r) {
    if (!Array.isArray(t))
      return null;
    const n = r ?? [];
    return t.forEach((s) => {
      const i = Un(e, s.type);
      if (Eg.test(i.type)) {
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
    return Th.test(this.type) ? "s" : Pa.test(this.type) ? "a" : Nh.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Sh.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Pa.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((a) => new Sr(this.abi, a).getSignature()).join(",")}>` : "", n = `(${this.components.map((a) => a.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, Lg = class extends At {
  constructor() {
    super("void", is, 0);
  }
  encode(e) {
    return new Uint8Array([]);
  }
  decode(e, t) {
    return [void 0, t];
  }
};
function Dc(e, t) {
  const { getCoder: r } = t;
  return e.reduce((n, s) => {
    const i = n;
    return i[s.name] = r(s, t), i;
  }, {});
}
var sn = (e, t) => {
  var f, p, m, I;
  switch (e.type) {
    case cg:
    case dg:
    case ug:
      return new q(e.type);
    case _g:
    case lg:
      return new et("u64");
    case hg:
      return new et("u256");
    case fg:
      return new Dg();
    case Ag:
      return new Tg();
    case pg:
      return new it();
    case gg:
      return new Rg();
    case mg:
      return new Oh();
    case yg:
      return new pi();
    case bg:
      return new Gh();
    case is:
      return new Lg();
  }
  const r = (f = Sh.exec(e.type)) == null ? void 0 : f.groups;
  if (r) {
    const S = parseInt(r.length, 10);
    return new Fg(S);
  }
  const n = e.components, s = (p = Pa.exec(e.type)) == null ? void 0 : p.groups;
  if (s) {
    const S = parseInt(s.length, 10), F = n[0];
    if (!F)
      throw new C(
        M.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = sn(F);
    return new ft(R, S);
  }
  if (e.type === wg) {
    const S = Mg(n), F = new Sr(e.abi, S), R = sn(F);
    return new Qg(R);
  }
  const i = (m = e.type.match(vg)) == null ? void 0 : m[0];
  if (Th.test(e.type) && i) {
    const S = Dc(n, { getCoder: sn });
    return new gi(i, S);
  }
  if (Nh.test(e.type) && i) {
    const S = Dc(n, { getCoder: sn });
    return e.type === ks ? new zh(i, S) : new Mh(i, S);
  }
  if ((I = Ig.exec(e.type)) == null ? void 0 : I.groups) {
    const S = n.map((F) => sn(F));
    return new Uh(S);
  }
  throw new C(
    M.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Pg(e = zs) {
  switch (e) {
    case zs:
      return sn;
    default:
      throw new C(
        M.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Yr = class {
  static getCoder(e, t, r = {
    padToWordSize: !1
  }) {
    const n = new Sr(e, t);
    return Pg(r.encoding)(n, r);
  }
  static encode(e, t, r, n) {
    return this.getCoder(e, t, n).encode(r);
  }
  static decode(e, t, r, n, s) {
    return this.getCoder(e, t, s).decode(r, n);
  }
}, kg = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const a = Un(t, i.type);
    return n = n || a.type !== is && !Rh.test(a.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, zg = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, za = class {
  constructor(e, t) {
    L(this, "signature");
    L(this, "selector");
    L(this, "selectorBytes");
    L(this, "encoding");
    L(this, "name");
    L(this, "jsonFn");
    L(this, "attributes");
    L(this, "jsonAbiOld");
    L(this, "jsonFnOld");
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = za.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = za.getFunctionSelector(this.signature), this.selectorBytes = new pi().encode(this.name), this.encoding = Vh(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const r = t.inputs.map(
      (n) => new Sr(e, n).getSignature()
    );
    return `${t.name}(${r.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = ge(Vr(e, "utf-8"));
    return x(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    const r = kg({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new C(
        M.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Yr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = zg(e, this.jsonFn.inputs);
    return new Uh(n).encode(s);
  }
  decodeArguments(e) {
    const t = Z(e), r = Og(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (r.length === 0) {
      if (t.length === 0)
        return;
      throw new C(
        M.DECODE_ERROR,
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
        const a = Yr.getCoder(this.jsonAbiOld, i, { encoding: this.encoding }), [o, u] = a.decode(t, s.offset);
        return {
          decoded: [...s.decoded, o],
          offset: u
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    const t = Z(e);
    return Yr.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
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
}, Gg = (e, t) => e.find((r) => r.concreteTypeId === t), Bo = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function xo(e, t, r) {
  const n = Bo(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = Gg(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: Ro(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function Yh(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = Bo(e, s);
    return {
      name: "",
      type: isNaN(s) ? xo(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: Yh(e, t, i)
    };
  })) ?? null;
}
function cn(e, t, r, n) {
  const s = xo(e, t, r), i = Bo(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: Yh(e, t, i)
  };
}
function Ro(e, t, r) {
  return (r == null ? void 0 : r.map((n) => {
    const { typeId: s, name: i, typeArguments: a } = n, o = isNaN(s) ? xo(e, t, s) : s;
    return {
      name: i,
      type: o,
      // originalTypeId: typeId,
      typeArguments: Ro(e, t, a)
    };
  })) ?? null;
}
function Ug(e) {
  if (!e.specVersion)
    return e;
  const t = [];
  e.metadataTypes.forEach((a) => {
    const o = {
      typeId: a.metadataTypeId,
      type: a.type,
      components: a.components ?? (a.type === "()" ? [] : null),
      typeParameters: a.typeParameters ?? null
    };
    t.push(o);
  }), t.forEach((a) => {
    a.components = Ro(e, t, a.components);
  });
  const r = e.functions.map((a) => {
    const o = a.inputs.map(
      ({ concreteTypeId: f, name: p }) => cn(e, t, f, p)
    ), u = cn(e, t, a.output, "");
    return { ...a, inputs: o, output: u };
  }), n = e.configurables.map((a) => ({
    name: a.name,
    configurableType: cn(e, t, a.concreteTypeId),
    offset: a.offset
  })), s = e.loggedTypes.map((a) => ({
    logId: a.logId,
    loggedType: cn(e, t, a.concreteTypeId)
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
var wr = class {
  constructor(e) {
    L(this, "functions");
    L(this, "configurables");
    L(this, "jsonAbi");
    L(this, "encoding");
    L(this, "jsonAbiOld");
    this.jsonAbi = e, this.encoding = Vh(e.encodingVersion), this.jsonAbiOld = Ug(e), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new za(this.jsonAbiOld, t)])
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
    throw new C(
      M.FUNCTION_NOT_FOUND,
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
      throw new C(
        M.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Yr.decode(this.jsonAbiOld, r.loggedType, Z(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const r = this.jsonAbiOld.configurables.find((n) => n.name === e);
    if (!r)
      throw new C(
        M.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Yr.encode(this.jsonAbiOld, r.configurableType, t, {
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
    return Yr.encode(this.jsonAbiOld, r, t, {
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
    return Yr.decode(this.jsonAbiOld, r, t, 0, { encoding: this.encoding });
  }
}, QB = (e, t) => {
  const [r, n] = new et("u64").decode(e, 0), [s, i] = new it().decode(e, n), [a, o] = new it().decode(e, i), [u, f] = new pi().decode(
    e,
    o + dt + dt
  ), p = e.slice(f), m = t ? new wr(t).getFunction(u).decodeArguments(p) : void 0;
  return {
    amount: r,
    assetId: s,
    contractId: a,
    functionSelector: u,
    functionArgs: m
  };
};
function wn(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Hh(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function So(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Vg(e) {
  return e.toLowerCase();
}
function ta(e) {
  return "b256Address" in e;
}
var Ln = (e) => {
  if (ta(e))
    return e;
  if ("address" in e && ta(e.address))
    return e.address;
  if ("id" in e && ta(e.id))
    return e.id;
  throw new C(C.CODES.INVALID_ADDRESS, "Invalid address");
}, Yg = () => X(ze(32)), Hg = (e) => {
  try {
    if (!wn(e))
      throw new C(C.CODES.INVALID_B256_ADDRESS, `Invalid B256 Address: ${e}.`);
    const t = Z(e).slice(12), r = new Uint8Array(12).fill(0);
    return X(at([r, t]));
  } catch {
    throw new C(
      C.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
}, Xg = (e) => {
  if (!So(e))
    throw new C(C.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, Zg = (e) => Xg(e), Xh = (e) => {
  if (!Hh(e))
    throw new C(C.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${e}.`);
  return X(Mr(Z(e)));
}, Wg = (e) => {
  if (typeof e != "string" && "toB256" in e)
    return e.toB256();
  if (wn(e))
    return e;
  if (Hh(e))
    return Xh(e);
  if (So(e))
    return Zg(e);
  throw new C(
    C.CODES.PARSE_FAILED,
    "Unknown address format: only 'B256', 'Public Key (512)', or 'EVM Address' are supported."
  );
}, ct = class {
  // #endregion address-2
  /**
   * @param address - A B256 address, public key, EVM address, or Address instance
   */
  constructor(e) {
    // #region address-2
    L(this, "b256Address");
    const t = Wg(e);
    this.b256Address = Vg(t);
  }
  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum() {
    return ct.toChecksum(this.b256Address);
  }
  /**
   * Returns the `b256Address` property
   */
  toAddress() {
    return this.b256Address;
  }
  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toB256() {
    return this.b256Address;
  }
  /**
   * Returns the B256 hash address as a Uint8Array
   *
   * @returns The B256 address as a Uint8Array
   */
  toBytes() {
    return Z(this.b256Address);
  }
  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toHexString() {
    return this.toB256();
  }
  /**
   * returns the address `checksum` as a string
   *
   * @returns The `b256Address` property as a string
   */
  toString() {
    return this.toChecksum();
  }
  /**
   * Converts and returns the `b256Address` property as a string
   * @returns The `b256Address` property as a JSON string
   */
  toJSON() {
    return this.b256Address;
  }
  /**
   * Converts to an EVM address
   *
   * @returns an {@link EvmAddress | `EvmAddress`} representation of the address
   */
  toEvmAddress() {
    return {
      bits: Hg(this.b256Address)
    };
  }
  /**
   * Wraps the B256 property and returns as an `AssetId`.
   * @returns The B256 property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      bits: this.b256Address
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
   * Compares this the `b256Address` property to another for direct equality
   * @param other - Another address to compare against
   * @returns The equality of the comparison
   */
  equals(e) {
    return this.toChecksum() === e.toChecksum();
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromPublicKey(e) {
    const t = Xh(e);
    return new ct(t);
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromB256(e) {
    if (!wn(e))
      throw new C(
        C.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${e}.`
      );
    return new ct(e);
  }
  /**
   * Creates an `Address` with a randomized `b256Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return new ct(Yg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromString(e) {
    return new ct(e);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromAddressOrString(e) {
    return new ct(e);
  }
  /**
   * Takes a dynamic string or `Address` and creates an `Address`
   *
   * @param addressId - A string containing B256, or Public Key
   * @throws Error - Unknown address if the format is not recognized
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromDynamicInput(e) {
    return new ct(e);
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromEvmAddress(e) {
    if (!So(e))
      throw new C(
        C.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${e}.`
      );
    return new ct(e);
  }
  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(e) {
    let t = e;
    return e.startsWith("0x") || (t = `0x${e}`), t.trim().length !== 66 ? !1 : ct.toChecksum(X(t)) === t;
  }
  /** @hidden */
  static toChecksum(e) {
    if (!wn(e))
      throw new C(
        C.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${e}.`
      );
    const t = X(e).toLowerCase().slice(2), r = Mr(t);
    let n = "0x";
    for (let s = 0; s < 32; ++s) {
      const i = r[s], a = t.charAt(s * 2), o = t.charAt(s * 2 + 1);
      n += (i & 240) >= 128 ? a.toUpperCase() : a, n += (i & 15) >= 8 ? o.toUpperCase() : o;
    }
    return n;
  }
}, Nr, G_, St = (G_ = class extends At {
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
    L(this, "length");
    Ue(this, Nr);
    this.length = t, Je(this, Nr, r);
  }
  encode(t) {
    const r = [], n = Z(t);
    return r.push(n), Qt(this, Nr) && r.push(new Uint8Array(Qt(this, Nr))), at(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [X(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return Qt(this, Nr) && ([n, s] = [null, s + Qt(this, Nr)]), [i, s];
  }
}, Nr = new WeakMap(), G_), Jr = class extends gi {
  constructor() {
    super("TxPointer", {
      blockHeight: new q("u32", { padToWordSize: !0 }),
      txIndex: new q("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(e) {
    if (e.length !== 12)
      throw new C(
        M.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${e.length}. It must have length 12.`
      );
    const [t, r] = [e.substring(0, 8), e.substring(8)];
    return {
      blockHeight: parseInt(t, 16),
      txIndex: parseInt(r, 16)
    };
  }
}, vt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(vt || {}), Fc = class extends At {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.txID)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new it().encode(e.owner)), t.push(new et("u64").encode(e.amount)), t.push(new it().encode(e.assetId)), t.push(new Jr().encode(e.txPointer)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new et("u64").encode(e.predicateGasUsed)), t.push(new et("u64").encode(e.predicateLength)), t.push(new et("u64").encode(e.predicateDataLength)), t.push(new St(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new St(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new it().decode(e, n);
    const a = r;
    [r, n] = new et("u64").decode(e, n);
    const o = r;
    [r, n] = new it().decode(e, n);
    const u = r;
    [r, n] = new Jr().decode(e, n);
    const f = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const p = Number(r);
    [r, n] = new et("u64").decode(e, n);
    const m = r;
    [r, n] = new et("u64").decode(e, n);
    const I = r;
    [r, n] = new et("u64").decode(e, n);
    const S = r;
    [r, n] = new St(I.toNumber()).decode(e, n);
    const F = r;
    return [r, n] = new St(S.toNumber()).decode(e, n), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: a,
        amount: o,
        assetId: u,
        txPointer: f,
        witnessIndex: p,
        predicateGasUsed: m,
        predicateLength: I,
        predicateDataLength: S,
        predicate: F,
        predicateData: r
      },
      n
    ];
  }
}, Us = class extends At {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.txID)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new it().encode(e.balanceRoot)), t.push(new it().encode(e.stateRoot)), t.push(new Jr().encode(e.txPointer)), t.push(new it().encode(e.contractID)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new it().decode(e, n);
    const a = r;
    [r, n] = new it().decode(e, n);
    const o = r;
    [r, n] = new Jr().decode(e, n);
    const u = r;
    return [r, n] = new it().decode(e, n), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: a,
        stateRoot: o,
        txPointer: u,
        contractID: r
      },
      n
    ];
  }
}, Dr = class extends At {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new St(32).encode(e.nonce)), t.push(new et("u64").encode(e.amount)), t.push(Z(e.data || "0x")), ge(at(t));
  }
  static encodeData(e) {
    const t = Z(e || "0x"), r = t.length;
    return new St(r).encode(t);
  }
  encode(e) {
    const t = [], r = Dr.encodeData(e.data);
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new et("u64").encode(e.amount)), t.push(new St(32).encode(e.nonce)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new et("u64").encode(e.predicateGasUsed)), t.push(new et("u64").encode(r.length)), t.push(new et("u64").encode(e.predicateLength)), t.push(new et("u64").encode(e.predicateDataLength)), t.push(new St(r.length).encode(r)), t.push(new St(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new St(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), at(t);
  }
  static decodeData(e) {
    const t = Z(e), r = t.length, [n] = new St(r).decode(t, 0);
    return Z(n);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new it().decode(e, n);
    const i = r;
    [r, n] = new et("u64").decode(e, n);
    const a = r;
    [r, n] = new it().decode(e, n);
    const o = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const u = Number(r);
    [r, n] = new et("u64").decode(e, n);
    const f = r;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new et("u64").decode(e, n);
    const m = r;
    [r, n] = new et("u64").decode(e, n);
    const I = r;
    [r, n] = new St(p).decode(e, n);
    const S = r;
    [r, n] = new St(m.toNumber()).decode(e, n);
    const F = r;
    return [r, n] = new St(I.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: a,
        witnessIndex: u,
        nonce: o,
        predicateGasUsed: f,
        dataLength: p,
        predicateLength: m,
        predicateDataLength: I,
        data: S,
        predicate: F,
        predicateData: r
      },
      n
    ];
  }
}, ir = class extends At {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new q("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Fc().encode(e));
        break;
      }
      case 1: {
        t.push(new Us().encode(e));
        break;
      }
      case 2: {
        t.push(new Dr().encode(e));
        break;
      }
      default:
        throw new C(
          M.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${r}.`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Fc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Us().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Dr().decode(e, n), [r, n];
      default:
        throw new C(
          M.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, wt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(wt || {}), Qc = class extends At {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.to)), t.push(new et("u64").encode(e.amount)), t.push(new it().encode(e.assetId)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new et("u64").decode(e, n);
    const i = r;
    return [r, n] = new it().decode(e, n), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Vs = class extends At {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new it().encode(e.balanceRoot)), t.push(new it().encode(e.stateRoot)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new it().decode(e, n);
    const i = r;
    return [r, n] = new it().decode(e, n), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: r
      },
      n
    ];
  }
}, Oc = class extends At {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.to)), t.push(new et("u64").encode(e.amount)), t.push(new it().encode(e.assetId)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new et("u64").decode(e, n);
    const i = r;
    return [r, n] = new it().decode(e, n), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Mc = class extends At {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.to)), t.push(new et("u64").encode(e.amount)), t.push(new it().encode(e.assetId)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new et("u64").decode(e, n);
    const i = r;
    return [r, n] = new it().decode(e, n), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Lc = class extends At {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.contractId)), t.push(new it().encode(e.stateRoot)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    return [r, n] = new it().decode(e, n), [
      {
        type: 4,
        contractId: s,
        stateRoot: r
      },
      n
    ];
  }
}, ar = class extends At {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new q("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Qc().encode(e));
        break;
      }
      case 1: {
        t.push(new Vs().encode(e));
        break;
      }
      case 2: {
        t.push(new Oc().encode(e));
        break;
      }
      case 3: {
        t.push(new Mc().encode(e));
        break;
      }
      case 4: {
        t.push(new Lc().encode(e));
        break;
      }
      default:
        throw new C(
          M.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${r}.`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Qc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Vs().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Oc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Mc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Lc().decode(e, n), [r, n];
      default:
        throw new C(
          M.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Qe = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e[e.Expiration = 16] = "Expiration", e))(Qe || {}), jg = (e) => e.sort((t, r) => t.type - r.type);
function Jg(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((r) => {
    if (t.has(r.type))
      throw new C(
        M.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(r.type);
  });
}
var or = class extends At {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Jg(e);
    const t = jg(e), r = [];
    return t.forEach(({ data: n, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          r.push(new et("u64").encode(n));
          break;
        case 4:
        case 16:
          r.push(new q("u32", { padToWordSize: !0 }).encode(n));
          break;
        default:
          throw new C(M.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), at(r);
  }
  decode(e, t, r) {
    let n = t;
    const s = [];
    if (r & 1) {
      const [i, a] = new et("u64").decode(e, n);
      n = a, s.push({ type: 1, data: i });
    }
    if (r & 2) {
      const [i, a] = new et("u64").decode(e, n);
      n = a, s.push({ type: 2, data: i });
    }
    if (r & 4) {
      const [i, a] = new q("u32", { padToWordSize: !0 }).decode(
        e,
        n
      );
      n = a, s.push({ type: 4, data: i });
    }
    if (r & 8) {
      const [i, a] = new et("u64").decode(e, n);
      n = a, s.push({ type: 8, data: i });
    }
    if (r & 16) {
      const [i, a] = new q("u32", { padToWordSize: !0 }).decode(
        e,
        n
      );
      n = a, s.push({ type: 16, data: i });
    }
    return [s, n];
  }
}, ut = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ut || {}), Ga = (e, t) => {
  const r = Z(e), n = Z(t);
  return ge(at([r, n]));
}, OB = (e, t) => ({
  bits: Ga(e, t)
}), MB = (e) => {
  const t = [];
  return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new St(32).encode(e.nonce)), t.push(new et("u64").encode(e.amount)), t.push(Z(e.data || "0x")), ge(at(t));
}, Pc = class extends gi {
  constructor() {
    super("StorageSlot", {
      key: new it(),
      value: new it()
    });
  }
}, ke = /* @__PURE__ */ ((e) => (e[e.ConsensusParameters = 0] = "ConsensusParameters", e[e.StateTransition = 1] = "StateTransition", e))(ke || {}), kc = class extends At {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: r } = e;
    switch (t.push(new q("u8", { padToWordSize: !0 }).encode(r)), r) {
      case 0: {
        const n = e.data;
        t.push(new q("u16", { padToWordSize: !0 }).encode(n.witnessIndex)), t.push(new it().encode(n.checksum));
        break;
      }
      case 1: {
        const n = e.data;
        t.push(new it().encode(n.bytecodeRoot));
        break;
      }
      default:
        throw new C(
          M.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r = t, n;
    [n, r] = new q("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0: {
        [n, r] = new q("u16", { padToWordSize: !0 }).decode(e, r);
        const i = n;
        return [n, r] = new it().decode(e, r), [{ type: s, data: { witnessIndex: i, checksum: n } }, r];
      }
      case 1:
        return [n, r] = new it().decode(e, r), [{ type: s, data: { bytecodeRoot: n } }, r];
      default:
        throw new C(
          M.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, cr = class extends At {
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
    return t.push(new q("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new St(e.dataLength).encode(e.data)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    return [r, n] = new St(s).decode(e, n), [
      {
        dataLength: s,
        data: r
      },
      n
    ];
  }
}, It = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e[e.Blob = 5] = "Blob", e))(It || {}), zc = class extends At {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new et("u64").encode(e.scriptGasLimit)), t.push(new it().encode(e.receiptsRoot)), t.push(new et("u64").encode(e.scriptLength)), t.push(new et("u64").encode(e.scriptDataLength)), t.push(new q("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new St(e.scriptLength.toNumber()).encode(e.script)), t.push(new St(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new or().encode(e.policies)), t.push(new ft(new ir(), e.inputsCount).encode(e.inputs)), t.push(new ft(new ar(), e.outputsCount).encode(e.outputs)), t.push(new ft(new cr(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u64").decode(e, n);
    const s = r;
    [r, n] = new it().decode(e, n);
    const i = r;
    [r, n] = new et("u64").decode(e, n);
    const a = r;
    [r, n] = new et("u64").decode(e, n);
    const o = r;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const m = r;
    [r, n] = new St(a.toNumber()).decode(e, n);
    const I = r;
    [r, n] = new St(o.toNumber()).decode(e, n);
    const S = r;
    [r, n] = new or().decode(e, n, u);
    const F = r;
    [r, n] = new ft(new ir(), f).decode(e, n);
    const R = r;
    [r, n] = new ft(new ar(), p).decode(e, n);
    const D = r;
    return [r, n] = new ft(new cr(), m).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: a,
        scriptDataLength: o,
        policyTypes: u,
        inputsCount: f,
        outputsCount: p,
        witnessesCount: m,
        receiptsRoot: i,
        script: I,
        scriptData: S,
        policies: F,
        inputs: R,
        outputs: D,
        witnesses: r
      },
      n
    ];
  }
}, Gc = class extends At {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new it().encode(e.salt)), t.push(new et("u64").encode(e.storageSlotsCount)), t.push(new q("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new ft(new Pc(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new or().encode(e.policies)), t.push(new ft(new ir(), e.inputsCount).encode(e.inputs)), t.push(new ft(new ar(), e.outputsCount).encode(e.outputs)), t.push(new ft(new cr(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new it().decode(e, n);
    const i = r;
    [r, n] = new et("u64").decode(e, n);
    const a = r;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new ft(new Pc(), a.toNumber()).decode(
      e,
      n
    );
    const m = r;
    [r, n] = new or().decode(e, n, o);
    const I = r;
    [r, n] = new ft(new ir(), u).decode(e, n);
    const S = r;
    [r, n] = new ft(new ar(), f).decode(e, n);
    const F = r;
    return [r, n] = new ft(new cr(), p).decode(e, n), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: o,
        storageSlotsCount: a,
        inputsCount: u,
        outputsCount: f,
        witnessesCount: p,
        salt: i,
        policies: I,
        storageSlots: m,
        inputs: S,
        outputs: F,
        witnesses: r
      },
      n
    ];
  }
}, Uc = class extends At {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Jr().encode(e.txPointer)), t.push(new Us().encode(e.inputContract)), t.push(new Vs().encode(e.outputContract)), t.push(new et("u64").encode(e.mintAmount)), t.push(new it().encode(e.mintAssetId)), t.push(new et("u64").encode(e.gasPrice)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Jr().decode(e, n);
    const s = r;
    [r, n] = new Us().decode(e, n);
    const i = r;
    [r, n] = new Vs().decode(e, n);
    const a = r;
    [r, n] = new et("u64").decode(e, n);
    const o = r;
    [r, n] = new it().decode(e, n);
    const u = r;
    return [r, n] = new et("u64").decode(e, n), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: a,
        mintAmount: o,
        mintAssetId: u,
        gasPrice: r
      },
      n
    ];
  }
}, Vc = class extends At {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new kc().encode(e.upgradePurpose)), t.push(new q("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new or().encode(e.policies)), t.push(new ft(new ir(), e.inputsCount).encode(e.inputs)), t.push(new ft(new ar(), e.outputsCount).encode(e.outputs)), t.push(new ft(new cr(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new kc().decode(e, n);
    const s = r;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new or().decode(e, n, i);
    const f = r;
    [r, n] = new ft(new ir(), a).decode(e, n);
    const p = r;
    [r, n] = new ft(new ar(), o).decode(e, n);
    const m = r;
    return [r, n] = new ft(new cr(), u).decode(e, n), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: a,
        outputsCount: o,
        witnessesCount: u,
        policies: f,
        inputs: p,
        outputs: m,
        witnesses: r
      },
      n
    ];
  }
}, Yc = class extends At {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.root)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new q("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new ft(new it(), e.proofSetCount).encode(e.proofSet)), t.push(new or().encode(e.policies)), t.push(new ft(new ir(), e.inputsCount).encode(e.inputs)), t.push(new ft(new ar(), e.outputsCount).encode(e.outputs)), t.push(new ft(new cr(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const p = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const m = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const I = r;
    [r, n] = new ft(new it(), u).decode(e, n);
    const S = r;
    [r, n] = new or().decode(e, n, f);
    const F = r;
    [r, n] = new ft(new ir(), p).decode(e, n);
    const R = r;
    [r, n] = new ft(new ar(), m).decode(e, n);
    const D = r;
    return [r, n] = new ft(new cr(), I).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: a,
        subsectionsNumber: o,
        proofSetCount: u,
        policyTypes: f,
        inputsCount: p,
        outputsCount: m,
        witnessesCount: I,
        proofSet: S,
        policies: F,
        inputs: R,
        outputs: D,
        witnesses: r
      },
      n
    ];
  }
}, Hc = class extends At {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new it().encode(e.blobId)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new q("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new q("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new or().encode(e.policies)), t.push(new ft(new ir(), e.inputsCount).encode(e.inputs)), t.push(new ft(new ar(), e.outputsCount).encode(e.outputs)), t.push(new ft(new cr(), e.witnessesCount).encode(e.witnesses)), at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new it().decode(e, n);
    const s = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new q("u32", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new q("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new or().decode(e, n, a);
    const p = r;
    [r, n] = new ft(new ir(), o).decode(e, n);
    const m = r;
    [r, n] = new ft(new ar(), u).decode(e, n);
    const I = r;
    return [r, n] = new ft(new cr(), f).decode(e, n), [
      {
        type: 5,
        blobId: s,
        witnessIndex: i,
        policyTypes: a,
        inputsCount: o,
        outputsCount: u,
        witnessesCount: f,
        policies: p,
        inputs: m,
        outputs: I,
        witnesses: r
      },
      n
    ];
  }
}, nr = class extends At {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new q("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new zc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Gc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Uc().encode(e));
        break;
      }
      case 3: {
        t.push(
          new Vc().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new Yc().encode(e)
        );
        break;
      }
      case 5: {
        t.push(new Hc().encode(e));
        break;
      }
      default:
        throw new C(
          M.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return at(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new zc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Gc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Uc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Vc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Yc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new Hc().decode(e, n), [r, n];
      default:
        throw new C(
          M.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, LB = class extends gi {
  constructor() {
    super("UtxoId", {
      transactionId: new it(),
      outputIndex: new q("u16", { padToWordSize: !0 })
    });
  }
};
function qg(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Zh(e) {
  return function t(r) {
    return arguments.length === 0 || qg(r) ? t : e.apply(this, arguments);
  };
}
var $g = /* @__PURE__ */ Zh(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Kg(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Wh(e, t, r) {
  if (r || (r = new ew()), tw(e))
    return e;
  var n = function(i) {
    var a = r.get(e);
    if (a)
      return a;
    r.set(e, i);
    for (var o in e)
      Object.prototype.hasOwnProperty.call(e, o) && (i[o] = Wh(e[o], !0, r));
    return i;
  };
  switch ($g(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Kg(e);
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
function tw(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var ew = /* @__PURE__ */ function() {
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
        for (var a = this.map[r], n = 0; n < a.length; n += 1) {
          var s = a[n];
          if (s[0] === t)
            return s[1];
        }
      return;
    }
    var i = this.hash(t), a = this.map[i];
    if (a)
      for (var n = 0; n < a.length; n += 1) {
        var s = a[n];
        if (s[0] === t)
          return s[1];
      }
  }, e;
}(), ve = /* @__PURE__ */ Zh(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Wh(t);
});
const To = JSON, rw = (e) => e.toUpperCase(), nw = (e) => {
  const t = {};
  return e.forEach((r, n) => {
    t[n] = r;
  }), t;
}, sw = (e, t, r) => e.document ? e : {
  document: e,
  variables: t,
  requestHeaders: r,
  signal: void 0
}, iw = (e, t, r) => e.query ? e : {
  query: e,
  variables: t,
  requestHeaders: r,
  signal: void 0
}, aw = (e, t) => e.documents ? e : {
  documents: e,
  requestHeaders: t,
  signal: void 0
};
function Ds(e, t) {
  if (!!!e)
    throw new Error(t);
}
function ow(e) {
  return typeof e == "object" && e !== null;
}
function cw(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const dw = /\r\n|[\n\r]/g;
function Ua(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(dw)) {
    if (typeof s.index == "number" || cw(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function uw(e) {
  return jh(
    e.source,
    Ua(e.source, e.start)
  );
}
function jh(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, a = t.line + i, o = t.line === 1 ? r : 0, u = t.column + o, f = `${e.name}:${a}:${u}
`, p = n.split(/\r\n|[\n\r]/g), m = p[s];
  if (m.length > 120) {
    const I = Math.floor(u / 80), S = u % 80, F = [];
    for (let R = 0; R < m.length; R += 80)
      F.push(m.slice(R, R + 80));
    return f + Xc([
      [`${a} |`, F[0]],
      ...F.slice(1, I + 1).map((R) => ["|", R]),
      ["|", "^".padStart(S)],
      ["|", F[I + 1]]
    ]);
  }
  return f + Xc([
    // Lines specified like this: ["prefix", "string"],
    [`${a - 1} |`, p[s - 1]],
    [`${a} |`, m],
    ["|", "^".padStart(u)],
    [`${a + 1} |`, p[s + 1]]
  ]);
}
function Xc(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function _w(e) {
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
  constructor(t, ...r) {
    var n, s, i;
    const { nodes: a, source: o, positions: u, path: f, originalError: p, extensions: m } = _w(r);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = p ?? void 0, this.nodes = Zc(
      Array.isArray(a) ? a : a ? [a] : void 0
    );
    const I = Zc(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((F) => F.loc).filter((F) => F != null)
    );
    this.source = o ?? (I == null || (s = I[0]) === null || s === void 0 ? void 0 : s.source), this.positions = u ?? (I == null ? void 0 : I.map((F) => F.start)), this.locations = u && o ? u.map((F) => Ua(o, F)) : I == null ? void 0 : I.map((F) => Ua(F.source, F.start));
    const S = ow(
      p == null ? void 0 : p.extensions
    ) ? p == null ? void 0 : p.extensions : void 0;
    this.extensions = (i = m ?? S) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), p != null && p.stack ? Object.defineProperty(this, "stack", {
      value: p.stack,
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
      for (const r of this.nodes)
        r.loc && (t += `

` + uw(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + jh(this.source, r);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Zc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function me(e, t, r) {
  return new No(`Syntax Error: ${r}`, {
    source: e,
    positions: [t]
  });
}
class hw {
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
class Jh {
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
  constructor(t, r, n, s, i, a) {
    this.kind = t, this.start = r, this.end = n, this.line = s, this.column = i, this.value = a, this.prev = null, this.next = null;
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
const qh = {
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
}, lw = new Set(Object.keys(qh));
function Wc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && lw.has(t);
}
var dn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(dn || (dn = {}));
var Va;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Va || (Va = {}));
var ot;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ot || (ot = {}));
function Ya(e) {
  return e === 9 || e === 32;
}
function Zn(e) {
  return e >= 48 && e <= 57;
}
function $h(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Kh(e) {
  return $h(e) || e === 95;
}
function fw(e) {
  return $h(e) || Zn(e) || e === 95;
}
function Aw(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let a = 0; a < e.length; ++a) {
    var i;
    const o = e[a], u = pw(o);
    u !== o.length && (n = (i = n) !== null && i !== void 0 ? i : a, s = a, a !== 0 && u < r && (r = u));
  }
  return e.map((a, o) => o === 0 ? a : a.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function pw(e) {
  let t = 0;
  for (; t < e.length && Ya(e.charCodeAt(t)); )
    ++t;
  return t;
}
function gw(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((S) => S.length === 0 || Ya(S.charCodeAt(0))), a = r.endsWith('\\"""'), o = e.endsWith('"') && !a, u = e.endsWith("\\"), f = o || u, p = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || f || i || a
  );
  let m = "";
  const I = s && Ya(e.charCodeAt(0));
  return (p && !I || i) && (m += `
`), m += r, (p || f) && (m += `
`), '"""' + m + '"""';
}
var H;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(H || (H = {}));
class ww {
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
    const r = new Jh(H.SOF, 0, 0, 0, 0);
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
          const r = yw(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === H.COMMENT);
    return t;
  }
}
function mw(e) {
  return e === H.BANG || e === H.DOLLAR || e === H.AMP || e === H.PAREN_L || e === H.PAREN_R || e === H.SPREAD || e === H.COLON || e === H.EQUALS || e === H.AT || e === H.BRACKET_L || e === H.BRACKET_R || e === H.BRACE_L || e === H.PIPE || e === H.BRACE_R;
}
function Bn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function wi(e, t) {
  return tl(e.charCodeAt(t)) && el(e.charCodeAt(t + 1));
}
function tl(e) {
  return e >= 55296 && e <= 56319;
}
function el(e) {
  return e >= 56320 && e <= 57343;
}
function qr(e, t) {
  const r = e.source.body.codePointAt(t);
  if (r === void 0)
    return H.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function pe(e, t, r, n, s) {
  const i = e.line, a = 1 + r - e.lineStart;
  return new Jh(t, r, n, i, a, s);
}
function yw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    switch (i) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++s;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++s, ++e.line, e.lineStart = s;
        continue;
      case 13:
        r.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++e.line, e.lineStart = s;
        continue;
      // Comment
      case 35:
        return bw(e, s);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return pe(e, H.BANG, s, s + 1);
      case 36:
        return pe(e, H.DOLLAR, s, s + 1);
      case 38:
        return pe(e, H.AMP, s, s + 1);
      case 40:
        return pe(e, H.PAREN_L, s, s + 1);
      case 41:
        return pe(e, H.PAREN_R, s, s + 1);
      case 46:
        if (r.charCodeAt(s + 1) === 46 && r.charCodeAt(s + 2) === 46)
          return pe(e, H.SPREAD, s, s + 3);
        break;
      case 58:
        return pe(e, H.COLON, s, s + 1);
      case 61:
        return pe(e, H.EQUALS, s, s + 1);
      case 64:
        return pe(e, H.AT, s, s + 1);
      case 91:
        return pe(e, H.BRACKET_L, s, s + 1);
      case 93:
        return pe(e, H.BRACKET_R, s, s + 1);
      case 123:
        return pe(e, H.BRACE_L, s, s + 1);
      case 124:
        return pe(e, H.PIPE, s, s + 1);
      case 125:
        return pe(e, H.BRACE_R, s, s + 1);
      // StringValue
      case 34:
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? xw(e, s) : Ew(e, s);
    }
    if (Zn(i) || i === 45)
      return Iw(e, s, i);
    if (Kh(i))
      return Rw(e, s);
    throw me(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Bn(i) || wi(r, s) ? `Unexpected character: ${qr(e, s)}.` : `Invalid character: ${qr(e, s)}.`
    );
  }
  return pe(e, H.EOF, n, n);
}
function bw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Bn(i))
      ++s;
    else if (wi(r, s))
      s += 2;
    else
      break;
  }
  return pe(
    e,
    H.COMMENT,
    t,
    s,
    r.slice(t + 1, s)
  );
}
function Iw(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, a = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), Zn(i))
      throw me(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${qr(
          e,
          s
        )}.`
      );
  } else
    s = ea(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (a = !0, i = n.charCodeAt(++s), s = ea(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (a = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = ea(e, s, i), i = n.charCodeAt(s)), i === 46 || Kh(i))
    throw me(
      e.source,
      s,
      `Invalid number, expected digit but got: ${qr(
        e,
        s
      )}.`
    );
  return pe(
    e,
    a ? H.FLOAT : H.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function ea(e, t, r) {
  if (!Zn(r))
    throw me(
      e.source,
      t,
      `Invalid number, expected digit but got: ${qr(
        e,
        t
      )}.`
    );
  const n = e.source.body;
  let s = t + 1;
  for (; Zn(n.charCodeAt(s)); )
    ++s;
  return s;
}
function Ew(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, a = "";
  for (; s < n; ) {
    const o = r.charCodeAt(s);
    if (o === 34)
      return a += r.slice(i, s), pe(e, H.STRING, t, s + 1, a);
    if (o === 92) {
      a += r.slice(i, s);
      const u = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? vw(e, s) : Cw(e, s) : Bw(e, s);
      a += u.value, s += u.size, i = s;
      continue;
    }
    if (o === 10 || o === 13)
      break;
    if (Bn(o))
      ++s;
    else if (wi(r, s))
      s += 2;
    else
      throw me(
        e.source,
        s,
        `Invalid character within String: ${qr(
          e,
          s
        )}.`
      );
  }
  throw me(e.source, s, "Unterminated string.");
}
function vw(e, t) {
  const r = e.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = r.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Bn(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Pn(i), n < 0)
      break;
  }
  throw me(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(
      t,
      t + s
    )}".`
  );
}
function Cw(e, t) {
  const r = e.source.body, n = jc(r, t + 2);
  if (Bn(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (tl(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = jc(r, t + 8);
    if (el(s))
      return {
        value: String.fromCodePoint(n, s),
        size: 12
      };
  }
  throw me(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(t, t + 6)}".`
  );
}
function jc(e, t) {
  return Pn(e.charCodeAt(t)) << 12 | Pn(e.charCodeAt(t + 1)) << 8 | Pn(e.charCodeAt(t + 2)) << 4 | Pn(e.charCodeAt(t + 3));
}
function Pn(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Bw(e, t) {
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
  throw me(
    e.source,
    t,
    `Invalid character escape sequence: "${r.slice(
      t,
      t + 2
    )}".`
  );
}
function xw(e, t) {
  const r = e.source.body, n = r.length;
  let s = e.lineStart, i = t + 3, a = i, o = "";
  const u = [];
  for (; i < n; ) {
    const f = r.charCodeAt(i);
    if (f === 34 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34) {
      o += r.slice(a, i), u.push(o);
      const p = pe(
        e,
        H.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Aw(u).join(`
`)
      );
      return e.line += u.length - 1, e.lineStart = s, p;
    }
    if (f === 92 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 && r.charCodeAt(i + 3) === 34) {
      o += r.slice(a, i), a = i + 1, i += 4;
      continue;
    }
    if (f === 10 || f === 13) {
      o += r.slice(a, i), u.push(o), f === 13 && r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, o = "", a = i, s = i;
      continue;
    }
    if (Bn(f))
      ++i;
    else if (wi(r, i))
      i += 2;
    else
      throw me(
        e.source,
        i,
        `Invalid character within String: ${qr(
          e,
          i
        )}.`
      );
  }
  throw me(e.source, i, "Unterminated string.");
}
function Rw(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (fw(i))
      ++s;
    else
      break;
  }
  return pe(
    e,
    H.NAME,
    t,
    s,
    r.slice(t, s)
  );
}
const Sw = 10, rl = 2;
function Do(e) {
  return mi(e, []);
}
function mi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Tw(e, t);
    default:
      return String(e);
  }
}
function Tw(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if (Nw(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : mi(n, r);
  } else if (Array.isArray(e))
    return Fw(e, r);
  return Dw(e, r);
}
function Nw(e) {
  return typeof e.toJSON == "function";
}
function Dw(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > rl ? "[" + Qw(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + mi(i, t)
  ).join(", ") + " }";
}
function Fw(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > rl)
    return "[Array]";
  const r = Math.min(Sw, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(mi(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function Qw(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const Ow = globalThis.process && // eslint-disable-next-line no-undef
!0, Mw = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Ow ? function(t, r) {
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
        const a = Do(t);
        throw new Error(`Cannot use ${s} "${a}" from another module or realm.

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
class nl {
  constructor(t, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ds(!1, `Body must be a string. Received: ${Do(t)}.`), this.body = t, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || Ds(
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
function Lw(e) {
  return Mw(e, nl);
}
function sl(e, t) {
  const r = new Pw(e, t), n = r.parseDocument();
  return Object.defineProperty(n, "tokenCount", {
    enumerable: !1,
    value: r.tokenCount
  }), n;
}
class Pw {
  constructor(t, r = {}) {
    const n = Lw(t) ? t : new nl(t);
    this._lexer = new ww(n), this._options = r, this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(H.NAME);
    return this.node(t, {
      kind: ot.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ot.DOCUMENT,
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
        throw me(
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
        kind: ot.OPERATION_DEFINITION,
        operation: dn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(H.NAME) && (n = this.parseName()), this.node(t, {
      kind: ot.OPERATION_DEFINITION,
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
        return dn.QUERY;
      case "mutation":
        return dn.MUTATION;
      case "subscription":
        return dn.SUBSCRIPTION;
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
      kind: ot.VARIABLE_DEFINITION,
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
      kind: ot.VARIABLE,
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
      kind: ot.SELECTION_SET,
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
      kind: ot.FIELD,
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
      kind: ot.ARGUMENT,
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
      kind: ot.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: ot.INLINE_FRAGMENT,
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
      kind: ot.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: ot.FRAGMENT_DEFINITION,
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
          kind: ot.INT,
          value: r.value
        });
      case H.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: ot.FLOAT,
          value: r.value
        });
      case H.STRING:
      case H.BLOCK_STRING:
        return this.parseStringLiteral();
      case H.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: ot.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: ot.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: ot.NULL
            });
          default:
            return this.node(r, {
              kind: ot.ENUM,
              value: r.value
            });
        }
      case H.DOLLAR:
        if (t)
          if (this.expectToken(H.DOLLAR), this._lexer.token.kind === H.NAME) {
            const n = this._lexer.token.value;
            throw me(
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
      kind: ot.STRING,
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
      kind: ot.LIST,
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
      kind: ot.OBJECT,
      fields: this.any(H.BRACE_L, r, H.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(H.COLON), this.node(r, {
      kind: ot.OBJECT_FIELD,
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
      kind: ot.DIRECTIVE,
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
        kind: ot.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(H.BANG) ? this.node(t, {
      kind: ot.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ot.NAMED_TYPE,
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
      kind: ot.SCHEMA_DEFINITION,
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
      kind: ot.OPERATION_TYPE_DEFINITION,
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
      kind: ot.SCALAR_TYPE_DEFINITION,
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
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ot.OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: s,
      directives: i,
      fields: a
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
    const i = this.parseTypeReference(), a = this.parseConstDirectives();
    return this.node(t, {
      kind: ot.FIELD_DEFINITION,
      description: r,
      name: n,
      arguments: s,
      type: i,
      directives: a
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
    const a = this.parseConstDirectives();
    return this.node(t, {
      kind: ot.INPUT_VALUE_DEFINITION,
      description: r,
      name: n,
      type: s,
      defaultValue: i,
      directives: a
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const t = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: ot.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: s,
      directives: i,
      fields: a
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
      kind: ot.UNION_TYPE_DEFINITION,
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
      kind: ot.ENUM_TYPE_DEFINITION,
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
      kind: ot.ENUM_VALUE_DEFINITION,
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
      throw me(
        this._lexer.source,
        this._lexer.token.start,
        `${ms(
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
      kind: ot.INPUT_OBJECT_TYPE_DEFINITION,
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
      kind: ot.SCHEMA_EXTENSION,
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
      kind: ot.SCALAR_TYPE_EXTENSION,
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
      kind: ot.OBJECT_TYPE_EXTENSION,
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
      kind: ot.INTERFACE_TYPE_EXTENSION,
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
      kind: ot.UNION_TYPE_EXTENSION,
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
      kind: ot.ENUM_TYPE_EXTENSION,
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
      kind: ot.INPUT_OBJECT_TYPE_EXTENSION,
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
    const a = this.parseDirectiveLocations();
    return this.node(t, {
      kind: ot.DIRECTIVE_DEFINITION,
      description: r,
      name: n,
      arguments: s,
      repeatable: i,
      locations: a
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
    if (Object.prototype.hasOwnProperty.call(Va, r.value))
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
    return this._options.noLocation !== !0 && (r.loc = new hw(
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
    throw me(
      this._lexer.source,
      r.start,
      `Expected ${il(t)}, found ${ms(r)}.`
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
      throw me(
        this._lexer.source,
        r.start,
        `Expected "${t}", found ${ms(r)}.`
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
    return me(
      this._lexer.source,
      r.start,
      `Unexpected ${ms(r)}.`
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
    if (r.kind !== H.EOF && (++this._tokenCounter, t !== void 0 && this._tokenCounter > t))
      throw me(
        this._lexer.source,
        r.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ms(e) {
  const t = e.value;
  return il(e.kind) + (t != null ? ` "${t}"` : "");
}
function il(e) {
  return mw(e) ? `"${e}"` : e;
}
function kw(e) {
  return `"${e.replace(zw, Gw)}"`;
}
const zw = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Gw(e) {
  return Uw[e.charCodeAt(0)];
}
const Uw = [
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
], Vw = Object.freeze({});
function Yw(e, t, r = qh) {
  const n = /* @__PURE__ */ new Map();
  for (const z of Object.values(ot))
    n.set(z, Hw(t, z));
  let s, i = Array.isArray(e), a = [e], o = -1, u = [], f = e, p, m;
  const I = [], S = [];
  do {
    o++;
    const z = o === a.length, Y = z && u.length !== 0;
    if (z) {
      if (p = S.length === 0 ? void 0 : I[I.length - 1], f = m, m = S.pop(), Y)
        if (i) {
          f = f.slice();
          let Q = 0;
          for (const [T, O] of u) {
            const P = T - Q;
            O === null ? (f.splice(P, 1), Q++) : f[P] = O;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [Q, T] of u)
            f[Q] = T;
        }
      o = s.index, a = s.keys, u = s.edits, i = s.inArray, s = s.prev;
    } else if (m) {
      if (p = i ? o : a[o], f = m[p], f == null)
        continue;
      I.push(p);
    }
    let U;
    if (!Array.isArray(f)) {
      var F, R;
      Wc(f) || Ds(!1, `Invalid AST Node: ${Do(f)}.`);
      const Q = z ? (F = n.get(f.kind)) === null || F === void 0 ? void 0 : F.leave : (R = n.get(f.kind)) === null || R === void 0 ? void 0 : R.enter;
      if (U = Q == null ? void 0 : Q.call(t, f, p, m, I, S), U === Vw)
        break;
      if (U === !1) {
        if (!z) {
          I.pop();
          continue;
        }
      } else if (U !== void 0 && (u.push([p, U]), !z))
        if (Wc(U))
          f = U;
        else {
          I.pop();
          continue;
        }
    }
    if (U === void 0 && Y && u.push([p, f]), z)
      I.pop();
    else {
      var D;
      s = {
        inArray: i,
        index: o,
        keys: a,
        edits: u,
        prev: s
      }, i = Array.isArray(f), a = i ? f : (D = r[f.kind]) !== null && D !== void 0 ? D : [], o = -1, u = [], m && S.push(m), m = f;
    }
  } while (s !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function Hw(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function al(e) {
  return Yw(e, Zw);
}
const Xw = 80, Zw = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => nt(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = pt("(", nt(e.variableDefinitions, ", "), ")"), r = nt(
        [
          e.operation,
          nt([e.name, t]),
          nt(e.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: r, directives: n }) => e + ": " + t + pt(" = ", r) + pt(" ", nt(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Ye(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = pt("", e, ": ") + t;
      let a = i + pt("(", nt(r, ", "), ")");
      return a.length > Xw && (a = i + pt(`(
`, Fs(nt(r, `
`)), `
)`)), nt([a, nt(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + pt(" ", nt(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: r }) => nt(
      [
        "...",
        pt("on ", e),
        nt(t, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: r, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${pt("(", nt(r, ", "), ")")} on ${t} ${pt("", nt(n, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? gw(e) : kw(e)
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
    leave: ({ values: e }) => "[" + nt(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + nt(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + pt("(", nt(t, ", "), ")")
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
    leave: ({ description: e, directives: t, operationTypes: r }) => pt("", e, `
`) + nt(["schema", nt(t, " "), Ye(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: r }) => pt("", e, `
`) + nt(["scalar", t, nt(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => pt("", e, `
`) + nt(
      [
        "type",
        t,
        pt("implements ", nt(r, " & ")),
        nt(n, " "),
        Ye(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: r, type: n, directives: s }) => pt("", e, `
`) + t + (Jc(r) ? pt(`(
`, Fs(nt(r, `
`)), `
)`) : pt("(", nt(r, ", "), ")")) + ": " + n + pt(" ", nt(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: r, defaultValue: n, directives: s }) => pt("", e, `
`) + nt(
      [t + ": " + r, pt("= ", n), nt(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => pt("", e, `
`) + nt(
      [
        "interface",
        t,
        pt("implements ", nt(r, " & ")),
        nt(n, " "),
        Ye(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, types: n }) => pt("", e, `
`) + nt(
      ["union", t, nt(r, " "), pt("= ", nt(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, values: n }) => pt("", e, `
`) + nt(["enum", t, nt(r, " "), Ye(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => pt("", e, `
`) + nt([t, nt(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => pt("", e, `
`) + nt(["input", t, nt(r, " "), Ye(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: r, repeatable: n, locations: s }) => pt("", e, `
`) + "directive @" + t + (Jc(r) ? pt(`(
`, Fs(nt(r, `
`)), `
)`) : pt("(", nt(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + nt(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => nt(
      ["extend schema", nt(e, " "), Ye(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => nt(["extend scalar", e, nt(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => nt(
      [
        "extend type",
        e,
        pt("implements ", nt(t, " & ")),
        nt(r, " "),
        Ye(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => nt(
      [
        "extend interface",
        e,
        pt("implements ", nt(t, " & ")),
        nt(r, " "),
        Ye(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: r }) => nt(
      [
        "extend union",
        e,
        nt(t, " "),
        pt("= ", nt(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: r }) => nt(["extend enum", e, nt(t, " "), Ye(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => nt(["extend input", e, nt(t, " "), Ye(r)], " ")
  }
};
function nt(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function Ye(e) {
  return pt(`{
`, Fs(nt(e, `
`)), `
}`);
}
function pt(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function Fs(e) {
  return pt("  ", e.replace(/\n/g, `
  `));
}
function Jc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((r) => r.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const qc = (e) => {
  var n, s;
  let t;
  const r = e.definitions.filter((i) => i.kind === "OperationDefinition");
  return r.length === 1 && (t = (s = (n = r[0]) == null ? void 0 : n.name) == null ? void 0 : s.value), t;
}, ra = (e) => {
  if (typeof e == "string") {
    let r;
    try {
      const n = sl(e);
      r = qc(n);
    } catch {
    }
    return { query: e, operationName: r };
  }
  const t = qc(e);
  return { query: al(e), operationName: t };
};
class Vn extends Error {
  constructor(t, r) {
    const n = `${Vn.extractMessage(t)}: ${JSON.stringify({
      response: t,
      request: r
    })}`;
    super(n), Object.setPrototypeOf(this, Vn.prototype), this.response = t, this.request = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Vn);
  }
  static extractMessage(t) {
    var r, n;
    return ((n = (r = t.errors) == null ? void 0 : r[0]) == null ? void 0 : n.message) ?? `GraphQL Error (Code: ${t.status})`;
  }
}
var ys = { exports: {} }, $c;
function Ww() {
  return $c || ($c = 1, function(e, t) {
    var r = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof bc < "u" && bc, n = function() {
      function i() {
        this.fetch = !1, this.DOMException = r.DOMException;
      }
      return i.prototype = r, new i();
    }();
    (function(i) {
      (function(a) {
        var o = typeof i < "u" && i || typeof self < "u" && self || typeof o < "u" && o, u = {
          searchParams: "URLSearchParams" in o,
          iterable: "Symbol" in o && "iterator" in Symbol,
          blob: "FileReader" in o && "Blob" in o && function() {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          }(),
          formData: "FormData" in o,
          arrayBuffer: "ArrayBuffer" in o
        };
        function f(_) {
          return _ && DataView.prototype.isPrototypeOf(_);
        }
        if (u.arrayBuffer)
          var p = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ], m = ArrayBuffer.isView || function(_) {
            return _ && p.indexOf(Object.prototype.toString.call(_)) > -1;
          };
        function I(_) {
          if (typeof _ != "string" && (_ = String(_)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(_) || _ === "")
            throw new TypeError('Invalid character in header field name: "' + _ + '"');
          return _.toLowerCase();
        }
        function S(_) {
          return typeof _ != "string" && (_ = String(_)), _;
        }
        function F(_) {
          var A = {
            next: function() {
              var w = _.shift();
              return { done: w === void 0, value: w };
            }
          };
          return u.iterable && (A[Symbol.iterator] = function() {
            return A;
          }), A;
        }
        function R(_) {
          this.map = {}, _ instanceof R ? _.forEach(function(A, w) {
            this.append(w, A);
          }, this) : Array.isArray(_) ? _.forEach(function(A) {
            this.append(A[0], A[1]);
          }, this) : _ && Object.getOwnPropertyNames(_).forEach(function(A) {
            this.append(A, _[A]);
          }, this);
        }
        R.prototype.append = function(_, A) {
          _ = I(_), A = S(A);
          var w = this.map[_];
          this.map[_] = w ? w + ", " + A : A;
        }, R.prototype.delete = function(_) {
          delete this.map[I(_)];
        }, R.prototype.get = function(_) {
          return _ = I(_), this.has(_) ? this.map[_] : null;
        }, R.prototype.has = function(_) {
          return this.map.hasOwnProperty(I(_));
        }, R.prototype.set = function(_, A) {
          this.map[I(_)] = S(A);
        }, R.prototype.forEach = function(_, A) {
          for (var w in this.map)
            this.map.hasOwnProperty(w) && _.call(A, this.map[w], w, this);
        }, R.prototype.keys = function() {
          var _ = [];
          return this.forEach(function(A, w) {
            _.push(w);
          }), F(_);
        }, R.prototype.values = function() {
          var _ = [];
          return this.forEach(function(A) {
            _.push(A);
          }), F(_);
        }, R.prototype.entries = function() {
          var _ = [];
          return this.forEach(function(A, w) {
            _.push([w, A]);
          }), F(_);
        }, u.iterable && (R.prototype[Symbol.iterator] = R.prototype.entries);
        function D(_) {
          if (_.bodyUsed)
            return Promise.reject(new TypeError("Already read"));
          _.bodyUsed = !0;
        }
        function z(_) {
          return new Promise(function(A, w) {
            _.onload = function() {
              A(_.result);
            }, _.onerror = function() {
              w(_.error);
            };
          });
        }
        function Y(_) {
          var A = new FileReader(), w = z(A);
          return A.readAsArrayBuffer(_), w;
        }
        function U(_) {
          var A = new FileReader(), w = z(A);
          return A.readAsText(_), w;
        }
        function Q(_) {
          for (var A = new Uint8Array(_), w = new Array(A.length), y = 0; y < A.length; y++)
            w[y] = String.fromCharCode(A[y]);
          return w.join("");
        }
        function T(_) {
          if (_.slice)
            return _.slice(0);
          var A = new Uint8Array(_.byteLength);
          return A.set(new Uint8Array(_)), A.buffer;
        }
        function O() {
          return this.bodyUsed = !1, this._initBody = function(_) {
            this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && f(_) ? (this._bodyArrayBuffer = T(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || m(_)) ? this._bodyArrayBuffer = T(_) : this._bodyText = _ = Object.prototype.toString.call(_) : this._bodyText = "", this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, u.blob && (this.blob = function() {
            var _ = D(this);
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
              var _ = D(this);
              return _ || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              ) : Promise.resolve(this._bodyArrayBuffer));
            } else
              return this.blob().then(Y);
          }), this.text = function() {
            var _ = D(this);
            if (_)
              return _;
            if (this._bodyBlob)
              return U(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(Q(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, u.formData && (this.formData = function() {
            return this.text().then(W);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        var P = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function G(_) {
          var A = _.toUpperCase();
          return P.indexOf(A) > -1 ? A : _;
        }
        function k(_, A) {
          if (!(this instanceof k))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          A = A || {};
          var w = A.body;
          if (_ instanceof k) {
            if (_.bodyUsed)
              throw new TypeError("Already read");
            this.url = _.url, this.credentials = _.credentials, A.headers || (this.headers = new R(_.headers)), this.method = _.method, this.mode = _.mode, this.signal = _.signal, !w && _._bodyInit != null && (w = _._bodyInit, _.bodyUsed = !0);
          } else
            this.url = String(_);
          if (this.credentials = A.credentials || this.credentials || "same-origin", (A.headers || !this.headers) && (this.headers = new R(A.headers)), this.method = G(A.method || this.method || "GET"), this.mode = A.mode || this.mode || null, this.signal = A.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && w)
            throw new TypeError("Body not allowed for GET or HEAD requests");
          if (this._initBody(w), (this.method === "GET" || this.method === "HEAD") && (A.cache === "no-store" || A.cache === "no-cache")) {
            var y = /([?&])_=[^&]*/;
            if (y.test(this.url))
              this.url = this.url.replace(y, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            else {
              var B = /\?/;
              this.url += (B.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
        k.prototype.clone = function() {
          return new k(this, { body: this._bodyInit });
        };
        function W(_) {
          var A = new FormData();
          return _.trim().split("&").forEach(function(w) {
            if (w) {
              var y = w.split("="), B = y.shift().replace(/\+/g, " "), N = y.join("=").replace(/\+/g, " ");
              A.append(decodeURIComponent(B), decodeURIComponent(N));
            }
          }), A;
        }
        function j(_) {
          var A = new R(), w = _.replace(/\r?\n[\t ]+/g, " ");
          return w.split("\r").map(function(y) {
            return y.indexOf(`
`) === 0 ? y.substr(1, y.length) : y;
          }).forEach(function(y) {
            var B = y.split(":"), N = B.shift().trim();
            if (N) {
              var b = B.join(":").trim();
              A.append(N, b);
            }
          }), A;
        }
        O.call(k.prototype);
        function J(_, A) {
          if (!(this instanceof J))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          A || (A = {}), this.type = "default", this.status = A.status === void 0 ? 200 : A.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = A.statusText === void 0 ? "" : "" + A.statusText, this.headers = new R(A.headers), this.url = A.url || "", this._initBody(_);
        }
        O.call(J.prototype), J.prototype.clone = function() {
          return new J(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new R(this.headers),
            url: this.url
          });
        }, J.error = function() {
          var _ = new J(null, { status: 0, statusText: "" });
          return _.type = "error", _;
        };
        var v = [301, 302, 303, 307, 308];
        J.redirect = function(_, A) {
          if (v.indexOf(A) === -1)
            throw new RangeError("Invalid status code");
          return new J(null, { status: A, headers: { location: _ } });
        }, a.DOMException = o.DOMException;
        try {
          new a.DOMException();
        } catch {
          a.DOMException = function(A, w) {
            this.message = A, this.name = w;
            var y = Error(A);
            this.stack = y.stack;
          }, a.DOMException.prototype = Object.create(Error.prototype), a.DOMException.prototype.constructor = a.DOMException;
        }
        function d(_, A) {
          return new Promise(function(w, y) {
            var B = new k(_, A);
            if (B.signal && B.signal.aborted)
              return y(new a.DOMException("Aborted", "AbortError"));
            var N = new XMLHttpRequest();
            function b() {
              N.abort();
            }
            N.onload = function() {
              var E = {
                status: N.status,
                statusText: N.statusText,
                headers: j(N.getAllResponseHeaders() || "")
              };
              E.url = "responseURL" in N ? N.responseURL : E.headers.get("X-Request-URL");
              var K = "response" in N ? N.response : N.responseText;
              setTimeout(function() {
                w(new J(K, E));
              }, 0);
            }, N.onerror = function() {
              setTimeout(function() {
                y(new TypeError("Network request failed"));
              }, 0);
            }, N.ontimeout = function() {
              setTimeout(function() {
                y(new TypeError("Network request failed"));
              }, 0);
            }, N.onabort = function() {
              setTimeout(function() {
                y(new a.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function l(E) {
              try {
                return E === "" && o.location.href ? o.location.href : E;
              } catch {
                return E;
              }
            }
            N.open(B.method, l(B.url), !0), B.credentials === "include" ? N.withCredentials = !0 : B.credentials === "omit" && (N.withCredentials = !1), "responseType" in N && (u.blob ? N.responseType = "blob" : u.arrayBuffer && B.headers.get("Content-Type") && B.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (N.responseType = "arraybuffer")), A && typeof A.headers == "object" && !(A.headers instanceof R) ? Object.getOwnPropertyNames(A.headers).forEach(function(E) {
              N.setRequestHeader(E, S(A.headers[E]));
            }) : B.headers.forEach(function(E, K) {
              N.setRequestHeader(K, E);
            }), B.signal && (B.signal.addEventListener("abort", b), N.onreadystatechange = function() {
              N.readyState === 4 && B.signal.removeEventListener("abort", b);
            }), N.send(typeof B._bodyInit > "u" ? null : B._bodyInit);
          });
        }
        return d.polyfill = !0, o.fetch || (o.fetch = d, o.Headers = R, o.Request = k, o.Response = J), a.Headers = R, a.Request = k, a.Response = J, a.fetch = d, a;
      })({});
    })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
    var s = r.fetch ? r : n;
    t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
  }(ys, ys.exports)), ys.exports;
}
var Ys = Ww();
const Qs = /* @__PURE__ */ H_(Ys), jw = /* @__PURE__ */ Gf({
  __proto__: null,
  default: Qs
}, [Ys]), en = (e) => {
  let t = {};
  return e && (typeof Headers < "u" && e instanceof Headers || jw && Ys.Headers && e instanceof Ys.Headers ? t = nw(e) : Array.isArray(e) ? e.forEach(([r, n]) => {
    r && n !== void 0 && (t[r] = n);
  }) : t = e), t;
}, Kc = (e) => e.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), Jw = (e) => {
  if (!Array.isArray(e.query)) {
    const n = e, s = [`query=${encodeURIComponent(Kc(n.query))}`];
    return e.variables && s.push(`variables=${encodeURIComponent(n.jsonSerializer.stringify(n.variables))}`), n.operationName && s.push(`operationName=${encodeURIComponent(n.operationName)}`), s.join("&");
  }
  if (typeof e.variables < "u" && !Array.isArray(e.variables))
    throw new Error("Cannot create query with given variable type, array expected");
  const t = e, r = e.query.reduce((n, s, i) => (n.push({
    query: Kc(s),
    variables: t.variables ? t.jsonSerializer.stringify(t.variables[i]) : void 0
  }), n), []);
  return `query=${encodeURIComponent(t.jsonSerializer.stringify(r))}`;
}, qw = (e) => async (t) => {
  const { url: r, query: n, variables: s, operationName: i, fetch: a, fetchOptions: o, middleware: u } = t, f = { ...t.headers };
  let p = "", m;
  e === "POST" ? (m = Kw(n, s, i, o.jsonSerializer), typeof m == "string" && (f["Content-Type"] = "application/json")) : p = Jw({
    query: n,
    variables: s,
    operationName: i,
    jsonSerializer: o.jsonSerializer ?? To
  });
  const I = {
    method: e,
    headers: f,
    body: m,
    ...o
  };
  let S = r, F = I;
  if (u) {
    const R = await Promise.resolve(u({ ...I, url: r, operationName: i, variables: s })), { url: D, ...z } = R;
    S = D, F = z;
  }
  return p && (S = `${S}?${p}`), await a(S, F);
};
class $w {
  constructor(t, r = {}) {
    this.url = t, this.requestConfig = r, this.rawRequest = async (...n) => {
      const [s, i, a] = n, o = iw(s, i, a), { headers: u, fetch: f = Qs, method: p = "POST", requestMiddleware: m, responseMiddleware: I, ...S } = this.requestConfig, { url: F } = this;
      o.signal !== void 0 && (S.signal = o.signal);
      const { operationName: R } = ra(o.query);
      return na({
        url: F,
        query: o.query,
        variables: o.variables,
        headers: {
          ...en(sa(u)),
          ...en(o.requestHeaders)
        },
        operationName: R,
        fetch: f,
        method: p,
        fetchOptions: S,
        middleware: m
      }).then((D) => (I && I(D), D)).catch((D) => {
        throw I && I(D), D;
      });
    };
  }
  async request(t, ...r) {
    const [n, s] = r, i = sw(t, n, s), { headers: a, fetch: o = Qs, method: u = "POST", requestMiddleware: f, responseMiddleware: p, ...m } = this.requestConfig, { url: I } = this;
    i.signal !== void 0 && (m.signal = i.signal);
    const { query: S, operationName: F } = ra(i.document);
    return na({
      url: I,
      query: S,
      variables: i.variables,
      headers: {
        ...en(sa(a)),
        ...en(i.requestHeaders)
      },
      operationName: F,
      fetch: o,
      method: u,
      fetchOptions: m,
      middleware: f
    }).then((R) => (p && p(R), R.data)).catch((R) => {
      throw p && p(R), R;
    });
  }
  // prettier-ignore
  batchRequests(t, r) {
    const n = aw(t, r), { headers: s, ...i } = this.requestConfig;
    n.signal !== void 0 && (i.signal = n.signal);
    const a = n.documents.map(({ document: u }) => ra(u).query), o = n.documents.map(({ variables: u }) => u);
    return na({
      url: this.url,
      query: a,
      // @ts-expect-error TODO reconcile batch variables into system.
      variables: o,
      headers: {
        ...en(sa(s)),
        ...en(n.requestHeaders)
      },
      operationName: void 0,
      fetch: this.requestConfig.fetch ?? Qs,
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
const na = async (e) => {
  const { query: t, variables: r, fetchOptions: n } = e, s = qw(rw(e.method ?? "post")), i = Array.isArray(e.query), a = await s(e), o = await t0(a, n.jsonSerializer ?? To), u = Array.isArray(o) ? !o.some(({ data: p }) => !p) : !!o.data, f = Array.isArray(o) || !o.errors || Array.isArray(o.errors) && !o.errors.length || n.errorPolicy === "all" || n.errorPolicy === "ignore";
  if (a.ok && f && u) {
    const { errors: p, ...m } = (Array.isArray(o), o), I = n.errorPolicy === "ignore" ? m : o;
    return {
      ...i ? { data: I } : I,
      headers: a.headers,
      status: a.status
    };
  } else {
    const p = typeof o == "string" ? {
      error: o
    } : o;
    throw new Vn(
      // @ts-expect-error TODO
      { ...p, status: a.status, headers: a.headers },
      { query: t, variables: r }
    );
  }
}, Kw = (e, t, r, n) => {
  const s = n ?? To;
  if (!Array.isArray(e))
    return s.stringify({ query: e, variables: t, operationName: r });
  if (typeof t < "u" && !Array.isArray(t))
    throw new Error("Cannot create request body with given variable type, array expected");
  const i = e.reduce((a, o, u) => (a.push({ query: o, variables: t ? t[u] : void 0 }), a), []);
  return s.stringify(i);
}, t0 = async (e, t) => {
  let r;
  return e.headers.forEach((n, s) => {
    s.toLowerCase() === "content-type" && (r = n);
  }), r && (r.toLowerCase().startsWith("application/json") || r.toLowerCase().startsWith("application/graphql+json") || r.toLowerCase().startsWith("application/graphql-response+json")) ? t.parse(await e.text()) : e.text();
}, sa = (e) => typeof e == "function" ? e() : e;
var Hs = function() {
  return Hs = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, Hs.apply(this, arguments);
};
var Os = /* @__PURE__ */ new Map(), Ha = /* @__PURE__ */ new Map(), ol = !0, Xs = !1;
function cl(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function e0(e) {
  return cl(e.source.body.substring(e.start, e.end));
}
function r0(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = e0(n.loc), a = Ha.get(s);
      a && !a.has(i) ? ol && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : a || Ha.set(s, a = /* @__PURE__ */ new Set()), a.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), Hs(Hs({}, e), { definitions: r });
}
function n0(e) {
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
function s0(e) {
  var t = cl(e);
  if (!Os.has(t)) {
    var r = sl(e, {
      experimentalFragmentVariables: Xs,
      allowLegacyFragmentVariables: Xs
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Os.set(t, n0(r0(r)));
  }
  return Os.get(t);
}
function $(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), s0(n);
}
function i0() {
  Os.clear(), Ha.clear();
}
function a0() {
  ol = !1;
}
function o0() {
  Xs = !0;
}
function c0() {
  Xs = !1;
}
var Fn = {
  gql: $,
  resetCaches: i0,
  disableFragmentWarnings: a0,
  enableExperimentalFragmentVariables: o0,
  disableExperimentalFragmentVariables: c0
};
(function(e) {
  e.gql = Fn.gql, e.resetCaches = Fn.resetCaches, e.disableFragmentWarnings = Fn.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Fn.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Fn.disableExperimentalFragmentVariables;
})($ || ($ = {}));
$.default = $;
var Tt = "0x0000000000000000000000000000000000000000000000000000000000000000", PB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", kB = 16 * 1024, zB = 16, GB = 1024 * 1024 * 1024, UB = 1024 * 1024 * 1024, VB = 255, YB = 1024 * 1024, HB = 1024 * 1024, d0 = "0xffffffffffff0000", dl = "0xffffffffffff0001", u0 = "0xffffffffffff0003", _0 = "0xffffffffffff0004", h0 = "0xffffffffffff0005", XB = "0x0", l0 = [
  "ArithmeticError",
  "ArithmeticOverflow",
  "AssetIdNotFound",
  "BalanceOverflow",
  "BlobIdAlreadyUploaded",
  "BlobNotFound",
  "BytecodeAlreadyUploaded",
  "ContractIdAlreadyDeployed",
  "ContractInstructionNotAllowed",
  "ContractMaxSize",
  "ContractMismatch",
  "ContractNotFound",
  "ContractNotInInputs",
  "EcalError",
  "ExpectedCoinInput",
  "ExpectedInternalContext",
  "ExpectedNestedCaller",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "ExpectedUnallocatedStack",
  "GasCostNotDefined",
  "InputContractDoesNotExist",
  "InputNotFound",
  "InternalBalanceOverflow",
  "InvalidBlockHeight",
  "InvalidEllipticCurvePoint",
  "InvalidFlags",
  "InvalidImmediateValue",
  "InvalidInstruction",
  "InvalidMetadataIdentifier",
  "MalformedCallStructure",
  "MaxStaticContractsReached",
  "MemoryGrowthOverlap",
  "MemoryNotExecutable",
  "MemoryOverflow",
  "MemoryOwnership",
  "MemoryWriteOverlap",
  "MessageDataTooLong",
  "NotEnoughBalance",
  "OutOfGas",
  "OutputNotFound",
  "OverridingConsensusParameters",
  "OverridingStateTransactionBytecode",
  "PolicyIsNotSet",
  "PolicyNotFound",
  "PredicateReturnedNonOne",
  "ReservedRegisterNotWritable",
  "Revert",
  "ThePartIsNotSequentiallyConnected",
  "TooManyReceipts",
  "TooManySlots",
  "TransactionMaturity",
  "TransactionValidity",
  "TransferAmountCannotBeZero",
  "TransferZeroCoins",
  "UninitalizedMemoryAccess",
  "UnknownPanicReason",
  "UnknownStateTransactionBytecodeRoot",
  "UnsupportedCurveId",
  "UnsupportedOperationType",
  "WitnessNotFound"
], f0 = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const ul = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && ul.decode();
let kn = null;
function _l() {
  return (kn === null || kn.byteLength === 0) && (kn = new Uint8Array(c.memory.buffer)), kn;
}
function A0(e, t) {
  return e = e >>> 0, ul.decode(_l().subarray(e, e + t));
}
function g(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
}
function p0(e, t) {
  const r = c.gm_args(e, t);
  return V.__wrap(r);
}
function g0(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return V.__wrap(n);
}
function w0(e, t, r, n) {
  g(n, Qr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return V.__wrap(i);
}
function m0(e, t, r, n) {
  g(n, Qr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return V.__wrap(i);
}
function y0(e, t, r, n) {
  g(n, os);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return V.__wrap(i);
}
function b0(e, t, r, n) {
  g(n, os);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return V.__wrap(i);
}
function I0(e, t, r, n) {
  g(n, cs);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return V.__wrap(i);
}
function E0(e, t, r, n) {
  g(n, cs);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return V.__wrap(i);
}
function v0(e, t, r, n) {
  g(n, as);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return V.__wrap(i);
}
function C0(e, t, r, n) {
  g(n, as);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return V.__wrap(i);
}
function B0(e, t, r) {
  const n = c.add(e, t, r);
  return V.__wrap(n);
}
function x0(e, t, r) {
  const n = c.and(e, t, r);
  return V.__wrap(n);
}
function R0(e, t, r) {
  const n = c.div(e, t, r);
  return V.__wrap(n);
}
function S0(e, t, r) {
  const n = c.eq(e, t, r);
  return V.__wrap(n);
}
function T0(e, t, r) {
  const n = c.exp(e, t, r);
  return V.__wrap(n);
}
function N0(e, t, r) {
  const n = c.gt(e, t, r);
  return V.__wrap(n);
}
function D0(e, t, r) {
  const n = c.lt(e, t, r);
  return V.__wrap(n);
}
function F0(e, t, r) {
  const n = c.mlog(e, t, r);
  return V.__wrap(n);
}
function Q0(e, t, r) {
  const n = c.mroo(e, t, r);
  return V.__wrap(n);
}
function O0(e, t, r) {
  const n = c.mod_(e, t, r);
  return V.__wrap(n);
}
function Hr(e, t) {
  const r = c.move_(e, t);
  return V.__wrap(r);
}
function M0(e, t, r) {
  const n = c.mul(e, t, r);
  return V.__wrap(n);
}
function L0(e, t) {
  const r = c.not(e, t);
  return V.__wrap(r);
}
function P0(e, t, r) {
  const n = c.or(e, t, r);
  return V.__wrap(n);
}
function k0(e, t, r) {
  const n = c.sll(e, t, r);
  return V.__wrap(n);
}
function z0(e, t, r) {
  const n = c.srl(e, t, r);
  return V.__wrap(n);
}
function Zs(e, t, r) {
  const n = c.sub(e, t, r);
  return V.__wrap(n);
}
function G0(e, t, r) {
  const n = c.xor(e, t, r);
  return V.__wrap(n);
}
function U0(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return V.__wrap(s);
}
function Fo(e) {
  const t = c.ret(e);
  return V.__wrap(t);
}
function V0(e, t) {
  const r = c.retd(e, t);
  return V.__wrap(r);
}
function Y0(e) {
  const t = c.aloc(e);
  return V.__wrap(t);
}
function H0(e, t) {
  const r = c.mcl(e, t);
  return V.__wrap(r);
}
function X0(e, t, r) {
  const n = c.mcp(e, t, r);
  return V.__wrap(n);
}
function Z0(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return V.__wrap(s);
}
function W0(e, t) {
  const r = c.bhsh(e, t);
  return V.__wrap(r);
}
function j0(e) {
  const t = c.bhei(e);
  return V.__wrap(t);
}
function J0(e, t) {
  const r = c.burn(e, t);
  return V.__wrap(r);
}
function Xa(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return V.__wrap(s);
}
function q0(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return V.__wrap(s);
}
function $0(e, t) {
  const r = c.croo(e, t);
  return V.__wrap(r);
}
function K0(e, t) {
  const r = c.csiz(e, t);
  return V.__wrap(r);
}
function tm(e) {
  const t = c.cb(e);
  return V.__wrap(t);
}
function Yn(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return V.__wrap(s);
}
function em(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return V.__wrap(s);
}
function rm(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return V.__wrap(s);
}
function nm(e, t) {
  const r = c.mint(e, t);
  return V.__wrap(r);
}
function sm(e) {
  const t = c.rvrt(e);
  return V.__wrap(t);
}
function im(e, t, r) {
  const n = c.scwq(e, t, r);
  return V.__wrap(n);
}
function am(e, t, r) {
  const n = c.srw(e, t, r);
  return V.__wrap(n);
}
function om(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return V.__wrap(s);
}
function cm(e, t, r) {
  const n = c.sww(e, t, r);
  return V.__wrap(n);
}
function dm(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return V.__wrap(s);
}
function hl(e, t, r) {
  const n = c.tr(e, t, r);
  return V.__wrap(n);
}
function um(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return V.__wrap(s);
}
function _m(e, t, r) {
  const n = c.eck1(e, t, r);
  return V.__wrap(n);
}
function hm(e, t, r) {
  const n = c.ecr1(e, t, r);
  return V.__wrap(n);
}
function lm(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return V.__wrap(s);
}
function fm(e, t, r) {
  const n = c.k256(e, t, r);
  return V.__wrap(n);
}
function Am(e, t, r) {
  const n = c.s256(e, t, r);
  return V.__wrap(n);
}
function pm(e, t) {
  const r = c.time(e, t);
  return V.__wrap(r);
}
function gm() {
  const e = c.noop();
  return V.__wrap(e);
}
function wm(e) {
  const t = c.flag(e);
  return V.__wrap(t);
}
function mm(e, t, r) {
  const n = c.bal(e, t, r);
  return V.__wrap(n);
}
function Ws(e) {
  const t = c.jmp(e);
  return V.__wrap(t);
}
function ym(e, t, r) {
  const n = c.jne(e, t, r);
  return V.__wrap(n);
}
function bm(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return V.__wrap(s);
}
function er(e, t, r) {
  const n = c.addi(e, t, r);
  return V.__wrap(n);
}
function Im(e, t, r) {
  const n = c.andi(e, t, r);
  return V.__wrap(n);
}
function js(e, t, r) {
  const n = c.divi(e, t, r);
  return V.__wrap(n);
}
function Em(e, t, r) {
  const n = c.expi(e, t, r);
  return V.__wrap(n);
}
function vm(e, t, r) {
  const n = c.modi(e, t, r);
  return V.__wrap(n);
}
function Cm(e, t, r) {
  const n = c.muli(e, t, r);
  return V.__wrap(n);
}
function Bm(e, t, r) {
  const n = c.ori(e, t, r);
  return V.__wrap(n);
}
function xm(e, t, r) {
  const n = c.slli(e, t, r);
  return V.__wrap(n);
}
function Rm(e, t, r) {
  const n = c.srli(e, t, r);
  return V.__wrap(n);
}
function ll(e, t, r) {
  const n = c.subi(e, t, r);
  return V.__wrap(n);
}
function Sm(e, t, r) {
  const n = c.xori(e, t, r);
  return V.__wrap(n);
}
function Tm(e, t, r) {
  const n = c.jnei(e, t, r);
  return V.__wrap(n);
}
function Nm(e, t, r) {
  const n = c.lb(e, t, r);
  return V.__wrap(n);
}
function Wn(e, t, r) {
  const n = c.lw(e, t, r);
  return V.__wrap(n);
}
function Dm(e, t, r) {
  const n = c.sb(e, t, r);
  return V.__wrap(n);
}
function Fm(e, t, r) {
  const n = c.sw(e, t, r);
  return V.__wrap(n);
}
function Qm(e, t, r) {
  const n = c.mcpi(e, t, r);
  return V.__wrap(n);
}
function fl(e, t, r) {
  const n = c.gtf(e, t, r);
  return V.__wrap(n);
}
function Om(e, t) {
  const r = c.mcli(e, t);
  return V.__wrap(r);
}
function Mm(e, t) {
  const r = c.gm(e, t);
  return V.__wrap(r);
}
function un(e, t) {
  const r = c.movi(e, t);
  return V.__wrap(r);
}
function Lm(e, t) {
  const r = c.jnzi(e, t);
  return V.__wrap(r);
}
function Pm(e, t) {
  const r = c.jmpf(e, t);
  return V.__wrap(r);
}
function km(e, t) {
  const r = c.jmpb(e, t);
  return V.__wrap(r);
}
function zm(e, t, r) {
  const n = c.jnzf(e, t, r);
  return V.__wrap(n);
}
function Al(e, t, r) {
  const n = c.jnzb(e, t, r);
  return V.__wrap(n);
}
function Gm(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return V.__wrap(s);
}
function Um(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return V.__wrap(s);
}
function Vm(e) {
  const t = c.ji(e);
  return V.__wrap(t);
}
function Ym(e) {
  const t = c.cfei(e);
  return V.__wrap(t);
}
function Hm(e) {
  const t = c.cfsi(e);
  return V.__wrap(t);
}
function Xm(e) {
  const t = c.cfe(e);
  return V.__wrap(t);
}
function Zm(e) {
  const t = c.cfs(e);
  return V.__wrap(t);
}
function Wm(e) {
  const t = c.pshl(e);
  return V.__wrap(t);
}
function jm(e) {
  const t = c.pshh(e);
  return V.__wrap(t);
}
function Jm(e) {
  const t = c.popl(e);
  return V.__wrap(t);
}
function qm(e) {
  const t = c.poph(e);
  return V.__wrap(t);
}
function $m(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return V.__wrap(s);
}
function Km(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return V.__wrap(s);
}
function ty(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return V.__wrap(s);
}
function ey(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return V.__wrap(s);
}
function ry(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return V.__wrap(s);
}
function ny(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return V.__wrap(s);
}
function sy(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return V.__wrap(s);
}
function iy(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return V.__wrap(s);
}
function ay(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return V.__wrap(s);
}
function oy(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return V.__wrap(s);
}
function cy(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return V.__wrap(s);
}
function dy(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return V.__wrap(s);
}
function uy(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return V.__wrap(s);
}
function _y(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return V.__wrap(s);
}
function hy(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return V.__wrap(s);
}
function Js(e, t) {
  const r = c.bsiz(e, t);
  return V.__wrap(r);
}
function ly(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return V.__wrap(s);
}
function fy(e, t, r, n) {
  const s = c.ecop(e, t, r, n);
  return V.__wrap(s);
}
function Ay(e, t, r, n) {
  const s = c.epar(e, t, r, n);
  return V.__wrap(s);
}
let kr = null;
function td() {
  return (kr === null || kr.buffer.detached === !0 || kr.buffer.detached === void 0 && kr.buffer !== c.memory.buffer) && (kr = new DataView(c.memory.buffer)), kr;
}
function py(e, t) {
  return e = e >>> 0, _l().subarray(e / 1, e / 1 + t);
}
const gy = Object.freeze({
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
}), wy = Object.freeze({
  /**
   * r" Get if caller is external.
   */
  IsCallerExternal: 1,
  1: "IsCallerExternal",
  /**
   * r" Get caller's contract ID.
   */
  GetCaller: 2,
  2: "GetCaller",
  /**
   * r" Get index of current predicate.
   */
  GetVerifyingPredicate: 3,
  3: "GetVerifyingPredicate",
  /**
   * r" Get the Chain ID this VM is operating within
   */
  GetChainId: 4,
  4: "GetChainId",
  /**
   * r" Get memory address where the transaction is located
   */
  TxStart: 5,
  5: "TxStart",
  /**
   * r" Get memory address of base asset ID
   */
  BaseAssetId: 6,
  6: "BaseAssetId"
}), pl = Object.freeze({
  /**
   * r" Set `$rA` to `tx.type`
   */
  Type: 1,
  1: "Type",
  /**
   * r" Set `$rA` to `tx.scriptGasLimit`
   */
  ScriptGasLimit: 2,
  2: "ScriptGasLimit",
  /**
   * r" Set `$rA` to `tx.scriptLength`
   */
  ScriptLength: 3,
  3: "ScriptLength",
  /**
   * r" Set `$rA` to `tx.scriptDataLength`
   */
  ScriptDataLength: 4,
  4: "ScriptDataLength",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  ScriptInputsCount: 5,
  5: "ScriptInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  ScriptOutputsCount: 6,
  6: "ScriptOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  ScriptWitnessesCount: 7,
  7: "ScriptWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.script`
   */
  Script: 9,
  9: "Script",
  /**
   * r" Set `$rA` to `Memory address of tx.scriptData`
   */
  ScriptData: 10,
  10: "ScriptData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  ScriptInputAtIndex: 11,
  11: "ScriptInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  ScriptOutputAtIndex: 12,
  12: "ScriptOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  ScriptWitnessAtIndex: 13,
  13: "ScriptWitnessAtIndex",
  /**
   * r" Set `$rA` to size of the transaction in memory, in bytes
   */
  TxLength: 14,
  14: "TxLength",
  /**
   * r" Set `$rA` to `tx.bytecodeWitnessIndex`
   */
  CreateBytecodeWitnessIndex: 257,
  257: "CreateBytecodeWitnessIndex",
  /**
   * r" Set `$rA` to `tx.storageSlotsCount`
   */
  CreateStorageSlotsCount: 258,
  258: "CreateStorageSlotsCount",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  CreateInputsCount: 259,
  259: "CreateInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  CreateOutputsCount: 260,
  260: "CreateOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  CreateWitnessesCount: 261,
  261: "CreateWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.salt`
   */
  CreateSalt: 262,
  262: "CreateSalt",
  /**
   * r" Set `$rA` to `Memory address of tx.storageSlots[$rB]`
   */
  CreateStorageSlotAtIndex: 263,
  263: "CreateStorageSlotAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  CreateInputAtIndex: 264,
  264: "CreateInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  CreateOutputAtIndex: 265,
  265: "CreateOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  CreateWitnessAtIndex: 266,
  266: "CreateWitnessAtIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].type`
   */
  InputType: 512,
  512: "InputType",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
   */
  InputCoinTxId: 513,
  513: "InputCoinTxId",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].outputIndex`
   */
  InputCoinOutputIndex: 514,
  514: "InputCoinOutputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].owner`
   */
  InputCoinOwner: 515,
  515: "InputCoinOwner",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].amount`
   */
  InputCoinAmount: 516,
  516: "InputCoinAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
   */
  InputCoinAssetId: 517,
  517: "InputCoinAssetId",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
   */
  InputCoinTxPointer: 518,
  518: "InputCoinTxPointer",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
   */
  InputCoinWitnessIndex: 519,
  519: "InputCoinWitnessIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateLength`
   */
  InputCoinPredicateLength: 521,
  521: "InputCoinPredicateLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
   */
  InputCoinPredicateDataLength: 522,
  522: "InputCoinPredicateDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
   */
  InputCoinPredicate: 523,
  523: "InputCoinPredicate",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
   */
  InputCoinPredicateData: 524,
  524: "InputCoinPredicateData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
   */
  InputCoinPredicateGasUsed: 525,
  525: "InputCoinPredicateGasUsed",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
   */
  InputContractTxId: 544,
  544: "InputContractTxId",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].outputIndex`
   */
  InputContractOutputIndex: 545,
  545: "InputContractOutputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
   */
  InputContractId: 549,
  549: "InputContractId",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].sender`
   */
  InputMessageSender: 576,
  576: "InputMessageSender",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
   */
  InputMessageRecipient: 577,
  577: "InputMessageRecipient",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].amount`
   */
  InputMessageAmount: 578,
  578: "InputMessageAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
   */
  InputMessageNonce: 579,
  579: "InputMessageNonce",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
   */
  InputMessageWitnessIndex: 580,
  580: "InputMessageWitnessIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].dataLength`
   */
  InputMessageDataLength: 581,
  581: "InputMessageDataLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateLength`
   */
  InputMessagePredicateLength: 582,
  582: "InputMessagePredicateLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
   */
  InputMessagePredicateDataLength: 583,
  583: "InputMessagePredicateDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].data`
   */
  InputMessageData: 584,
  584: "InputMessageData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
   */
  InputMessagePredicate: 585,
  585: "InputMessagePredicate",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
   */
  InputMessagePredicateData: 586,
  586: "InputMessagePredicateData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
   */
  InputMessagePredicateGasUsed: 587,
  587: "InputMessagePredicateGasUsed",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].type`
   */
  OutputType: 768,
  768: "OutputType",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].to`
   */
  OutputCoinTo: 769,
  769: "OutputCoinTo",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].amount`
   */
  OutputCoinAmount: 770,
  770: "OutputCoinAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
   */
  OutputCoinAssetId: 771,
  771: "OutputCoinAssetId",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].inputIndex`
   */
  OutputContractInputIndex: 772,
  772: "OutputContractInputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
   */
  OutputContractCreatedContractId: 775,
  775: "OutputContractCreatedContractId",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
   */
  OutputContractCreatedStateRoot: 776,
  776: "OutputContractCreatedStateRoot",
  /**
   * r" Set `$rA` to `tx.witnesses[$rB].dataLength`
   */
  WitnessDataLength: 1024,
  1024: "WitnessDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB].data`
   */
  WitnessData: 1025,
  1025: "WitnessData",
  /**
   * r" Set `$rA` to `tx.policyTypes`
   */
  PolicyTypes: 1280,
  1280: "PolicyTypes",
  /**
   * r" Set `$rA` to `tx.policies[0x00].gasPrice`
   */
  PolicyTip: 1281,
  1281: "PolicyTip",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b11 & tx.policyTypes) - 1].witnessLimit`
   */
  PolicyWitnessLimit: 1282,
  1282: "PolicyWitnessLimit",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b111 & tx.policyTypes) - 1].maturity`
   */
  PolicyMaturity: 1283,
  1283: "PolicyMaturity",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b1111 & tx.policyTypes) - 1].maxFee`
   */
  PolicyMaxFee: 1284,
  1284: "PolicyMaxFee",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b11111 & tx.policyTypes) - 1].expiration`
   */
  PolicyExpiration: 1285,
  1285: "PolicyExpiration"
}), my = Object.freeze({
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
}), yy = Object.freeze({
  /**
   * r" The byte can't be mapped to any known `PanicReason`.
   */
  UnknownPanicReason: 0,
  0: "UnknownPanicReason",
  /**
   * r" Found `RVRT` instruction.
   */
  Revert: 1,
  1: "Revert",
  /**
   * r" Execution ran out of gas.
   */
  OutOfGas: 2,
  2: "OutOfGas",
  /**
   * r" The transaction validity is violated.
   */
  TransactionValidity: 3,
  3: "TransactionValidity",
  /**
   * r" Attempt to write outside interpreter memory boundaries.
   */
  MemoryOverflow: 4,
  4: "MemoryOverflow",
  /**
   * r" Overflow while executing arithmetic operation.
   * r" These errors are ignored using the WRAPPING flag.
   */
  ArithmeticOverflow: 5,
  5: "ArithmeticOverflow",
  /**
   * r" Designed contract was not found in the storage.
   */
  ContractNotFound: 6,
  6: "ContractNotFound",
  /**
   * r" Memory ownership rules are violated.
   */
  MemoryOwnership: 7,
  7: "MemoryOwnership",
  /**
   * r" The asset ID balance isn't enough for the instruction.
   */
  NotEnoughBalance: 8,
  8: "NotEnoughBalance",
  /**
   * r" The interpreter is expected to be in internal context.
   */
  ExpectedInternalContext: 9,
  9: "ExpectedInternalContext",
  /**
   * r" The queried asset ID was not found in the state.
   */
  AssetIdNotFound: 10,
  10: "AssetIdNotFound",
  /**
   * r" The provided input is not found in the transaction.
   */
  InputNotFound: 11,
  11: "InputNotFound",
  /**
   * r" The provided output is not found in the transaction.
   */
  OutputNotFound: 12,
  12: "OutputNotFound",
  /**
   * r" The provided witness is not found in the transaction.
   */
  WitnessNotFound: 13,
  13: "WitnessNotFound",
  /**
   * r" The transaction maturity is not valid for this request.
   */
  TransactionMaturity: 14,
  14: "TransactionMaturity",
  /**
   * r" The metadata identifier is invalid.
   */
  InvalidMetadataIdentifier: 15,
  15: "InvalidMetadataIdentifier",
  /**
   * r" The call structure is not valid.
   */
  MalformedCallStructure: 16,
  16: "MalformedCallStructure",
  /**
   * r" The provided register does not allow write operations.
   */
  ReservedRegisterNotWritable: 17,
  17: "ReservedRegisterNotWritable",
  /**
   * r" The execution resulted in an erroneous state of the interpreter.
   */
  InvalidFlags: 18,
  18: "InvalidFlags",
  /**
   * r" The provided immediate value is not valid for this instruction.
   */
  InvalidImmediateValue: 19,
  19: "InvalidImmediateValue",
  /**
   * r" The provided transaction input is not of type `Coin`.
   */
  ExpectedCoinInput: 20,
  20: "ExpectedCoinInput",
  /**
   * r" `ECAL` instruction failed.
   */
  EcalError: 21,
  21: "EcalError",
  /**
   * r" Two segments of the interpreter memory should not intersect for write operations.
   */
  MemoryWriteOverlap: 22,
  22: "MemoryWriteOverlap",
  /**
   * r" The requested contract is not listed in the transaction inputs.
   */
  ContractNotInInputs: 23,
  23: "ContractNotInInputs",
  /**
   * r" The internal asset ID balance overflowed with the provided instruction.
   */
  InternalBalanceOverflow: 24,
  24: "InternalBalanceOverflow",
  /**
   * r" The maximum allowed contract size is violated.
   */
  ContractMaxSize: 25,
  25: "ContractMaxSize",
  /**
   * r" This instruction expects the stack area to be unallocated for this call.
   */
  ExpectedUnallocatedStack: 26,
  26: "ExpectedUnallocatedStack",
  /**
   * r" The maximum allowed number of static contracts was reached for this transaction.
   */
  MaxStaticContractsReached: 27,
  27: "MaxStaticContractsReached",
  /**
   * r" The requested transfer amount cannot be zero.
   */
  TransferAmountCannotBeZero: 28,
  28: "TransferAmountCannotBeZero",
  /**
   * r" The provided transaction output should be of type `Variable`.
   */
  ExpectedOutputVariable: 29,
  29: "ExpectedOutputVariable",
  /**
   * r" The expected context of the stack parent is internal.
   */
  ExpectedParentInternalContext: 30,
  30: "ExpectedParentInternalContext",
  /**
   * r" The predicate returned non `1`. The `1` means successful verification
   * r" of the predicate, all other values means unsuccessful.
   */
  PredicateReturnedNonOne: 31,
  31: "PredicateReturnedNonOne",
  /**
   * r" The contract ID is already deployed and can't be overwritten.
   */
  ContractIdAlreadyDeployed: 32,
  32: "ContractIdAlreadyDeployed",
  /**
   * r" The loaded contract mismatch expectations.
   */
  ContractMismatch: 33,
  33: "ContractMismatch",
  /**
   * r" Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
   */
  MessageDataTooLong: 34,
  34: "MessageDataTooLong",
  /**
   * r" Mathematically invalid arguments where given to an arithmetic instruction.
   * r" For instance, division by zero produces this.
   * r" These errors are ignored using the UNSAFEMATH flag.
   */
  ArithmeticError: 35,
  35: "ArithmeticError",
  /**
   * r" The contract instruction is not allowed in predicates.
   */
  ContractInstructionNotAllowed: 36,
  36: "ContractInstructionNotAllowed",
  /**
   * r" Transfer of zero coins is not allowed.
   */
  TransferZeroCoins: 37,
  37: "TransferZeroCoins",
  /**
   * r" Attempted to execute an invalid instruction
   */
  InvalidInstruction: 38,
  38: "InvalidInstruction",
  /**
   * r" Memory outside $is..$ssp range is not executable
   */
  MemoryNotExecutable: 39,
  39: "MemoryNotExecutable",
  /**
   * r" The policy is not set.
   */
  PolicyIsNotSet: 40,
  40: "PolicyIsNotSet",
  /**
   * r" The policy is not found across policies.
   */
  PolicyNotFound: 41,
  41: "PolicyNotFound",
  /**
   * r" Receipt context is full
   */
  TooManyReceipts: 42,
  42: "TooManyReceipts",
  /**
   * r" Balance of a contract overflowed
   */
  BalanceOverflow: 43,
  43: "BalanceOverflow",
  /**
   * r" Block height value is invalid, typically because it is too large
   */
  InvalidBlockHeight: 44,
  44: "InvalidBlockHeight",
  /**
   * r" Attempt to use sequential memory instructions with too large slot count,
   * r" typically because it cannot fit into usize
   */
  TooManySlots: 45,
  45: "TooManySlots",
  /**
   * r" Caller of this internal context is also expected to be internal,
   * r" i.e. $fp->$fp must be non-zero.
   */
  ExpectedNestedCaller: 46,
  46: "ExpectedNestedCaller",
  /**
   * r" During memory growth, the stack overlapped with the heap
   */
  MemoryGrowthOverlap: 47,
  47: "MemoryGrowthOverlap",
  /**
   * r" Attempting to read or write uninitialized memory.
   * r" Also occurs when boundary crosses from stack to heap.
   */
  UninitalizedMemoryAccess: 48,
  48: "UninitalizedMemoryAccess",
  /**
   * r" Overriding consensus parameters is not allowed.
   */
  OverridingConsensusParameters: 49,
  49: "OverridingConsensusParameters",
  /**
   * r" The storage doesn't know about the hash of the state transition bytecode.
   */
  UnknownStateTransactionBytecodeRoot: 50,
  50: "UnknownStateTransactionBytecodeRoot",
  /**
   * r" Overriding the state transition bytecode is not allowed.
   */
  OverridingStateTransactionBytecode: 51,
  51: "OverridingStateTransactionBytecode",
  /**
   * r" The bytecode is already uploaded and cannot be uploaded again.
   */
  BytecodeAlreadyUploaded: 52,
  52: "BytecodeAlreadyUploaded",
  /**
   * r" The part of the bytecode is not sequentially connected to the previous parts.
   */
  ThePartIsNotSequentiallyConnected: 53,
  53: "ThePartIsNotSequentiallyConnected",
  /**
   * r" The requested blob is not found.
   */
  BlobNotFound: 54,
  54: "BlobNotFound",
  /**
   * r" The blob was already
   */
  BlobIdAlreadyUploaded: 55,
  55: "BlobIdAlreadyUploaded",
  /**
   * r" Active gas costs do not define the cost for this instruction.
   */
  GasCostNotDefined: 56,
  56: "GasCostNotDefined",
  /**
   * r" The curve id is not supported.
   */
  UnsupportedCurveId: 57,
  57: "UnsupportedCurveId",
  /**
   * r" The operation type is not supported.
   */
  UnsupportedOperationType: 58,
  58: "UnsupportedOperationType",
  /**
   * r" Read alt_bn_128 curve point is invalid.
   */
  InvalidEllipticCurvePoint: 59,
  59: "InvalidEllipticCurvePoint",
  /**
   * r" Given input contract does not exist.
   */
  InputContractDoesNotExist: 60,
  60: "InputContractDoesNotExist"
}), ed = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_add_free(e >>> 0, 1));
class by {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ed.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ed.register(this, this.__wbg_ptr, this), this;
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
const rd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_addi_free(e >>> 0, 1));
class Iy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, rd.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_aloc_free(e >>> 0, 1));
class Ey {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nd.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, nd.register(this, this.__wbg_ptr, this), this;
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
const sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_and_free(e >>> 0, 1));
class vy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, sd.register(this, this.__wbg_ptr, this), this;
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
const id = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_andi_free(e >>> 0, 1));
class Cy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, id.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, id.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const ad = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bal_free(e >>> 0, 1));
class By {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ad.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ad.register(this, this.__wbg_ptr, this), this;
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
const od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhei_free(e >>> 0, 1));
class xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, od.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, od.register(this, this.__wbg_ptr, this), this;
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
const cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhsh_free(e >>> 0, 1));
class Ry {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cd.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, cd.register(this, this.__wbg_ptr, this), this;
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
const dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bldd_free(e >>> 0, 1));
class Sy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, dd.register(this, this.__wbg_ptr, this), this;
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
const ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bsiz_free(e >>> 0, 1));
class Ty {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ud.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, ud.register(this, this.__wbg_ptr, this), this;
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
const _d = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_burn_free(e >>> 0, 1));
class Ny {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _d.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, _d.register(this, this.__wbg_ptr, this), this;
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
const hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_call_free(e >>> 0, 1));
class Dy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, hd.register(this, this.__wbg_ptr, this), this;
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
const ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cb_free(e >>> 0, 1));
class Fy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ld.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, ld.register(this, this.__wbg_ptr, this), this;
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
const fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ccp_free(e >>> 0, 1));
class Qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, fd.register(this, this.__wbg_ptr, this), this;
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
const Ad = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfe_free(e >>> 0, 1));
class Oy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ad.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Ad.register(this, this.__wbg_ptr, this), this;
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
const pd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfei_free(e >>> 0, 1));
class My {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pd.unregister(this), t;
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
    g(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, pd.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const gd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfs_free(e >>> 0, 1));
class Ly {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gd.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, gd.register(this, this.__wbg_ptr, this), this;
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
const wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfsi_free(e >>> 0, 1));
class Py {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wd.unregister(this), t;
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
    g(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, wd.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_croo_free(e >>> 0, 1));
class ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, md.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, md.register(this, this.__wbg_ptr, this), this;
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
const yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_csiz_free(e >>> 0, 1));
class zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yd.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, yd.register(this, this.__wbg_ptr, this), this;
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
const bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_compareargs_free(e >>> 0, 1));
class Qr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Qr.prototype);
    return r.__wbg_ptr = t, bd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bd.unregister(this), t;
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
    return Nt.__wrap(r);
  }
  /**
   * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
   * @param {Imm06} bits
   * @returns {CompareArgs | undefined}
   */
  static from_imm(t) {
    g(t, Nt);
    var r = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(r);
    return n === 0 ? void 0 : Qr.__wrap(n);
  }
}
const Id = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0, 1));
class Gy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Id.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Id.register(this, this.__wbg_ptr, this), this;
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
const Ed = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divi_free(e >>> 0, 1));
class Uy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ed.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ed.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Vy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0, 1));
class as {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vy.unregister(this), t;
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
const vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecal_free(e >>> 0, 1));
class Yy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, vd.register(this, this.__wbg_ptr, this), this;
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
const Cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eck1_free(e >>> 0, 1));
class Hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Cd.register(this, this.__wbg_ptr, this), this;
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
const Bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecop_free(e >>> 0, 1));
class Xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecop_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} curve_id
   * @param {RegId} operation_type
   * @param {RegId} points_ptr
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Bd.register(this, this.__wbg_ptr, this), this;
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
const xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecr1_free(e >>> 0, 1));
class Zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, xd.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_ed19_free(e >>> 0, 1));
class Wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Rd.register(this, this.__wbg_ptr, this), this;
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
const Sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_epar_free(e >>> 0, 1));
class jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_epar_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} success
   * @param {RegId} curve_id
   * @param {RegId} number_elements
   * @param {RegId} points_ptr
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Sd.register(this, this.__wbg_ptr, this), this;
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
const Td = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0, 1));
class Jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Td.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Td.register(this, this.__wbg_ptr, this), this;
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
const Nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0, 1));
class qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Nd.register(this, this.__wbg_ptr, this), this;
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
const Dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0, 1));
class $y {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Dd.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_flag_free(e >>> 0, 1));
class Ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fd.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Fd.register(this, this.__wbg_ptr, this), this;
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
const ia = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0, 1));
class qs {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(qs.prototype);
    return r.__wbg_ptr = t, ia.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ia.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, r);
    return qs.__wrap(s);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {Imm18} selector
   */
  constructor(t, r) {
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, ia.register(this, this.__wbg_ptr, this), this;
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
const Qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0, 1));
class tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Qd.register(this, this.__wbg_ptr, this), this;
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
const aa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0, 1));
class $s {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create($s.prototype);
    return r.__wbg_ptr = t, aa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, aa.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    const a = c.gtf_from_args(s, i, n);
    return $s.__wrap(a);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} arg
   * @param {Imm12} selector
   */
  constructor(t, r, n) {
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.gtf_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, aa.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0, 1));
class Nt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Nt.prototype);
    return r.__wbg_ptr = t, Od.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Od.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t, 0);
  }
}
const Md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm12_free(e >>> 0, 1));
class _t {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(_t.prototype);
    return r.__wbg_ptr = t, Md.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Md.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t, 0);
  }
}
const Ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm18_free(e >>> 0, 1));
class Se {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Se.prototype);
    return r.__wbg_ptr = t, Ld.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ld.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t, 0);
  }
}
const Pd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm24_free(e >>> 0, 1));
class Ie {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ie.prototype);
    return r.__wbg_ptr = t, Pd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t, 0);
  }
}
const kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_instruction_free(e >>> 0, 1));
class V {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(V.prototype);
    return r.__wbg_ptr = t, kd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kd.unregister(this), t;
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
      var t = td().getInt32(s + 4 * 0, !0), r = td().getInt32(s + 4 * 1, !0), n = py(t, r).slice();
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
const zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ji_free(e >>> 0, 1));
class eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zd.unregister(this), t;
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
    g(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Gd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmp_free(e >>> 0, 1));
class rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gd.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Gd.register(this, this.__wbg_ptr, this), this;
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
const Ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpb_free(e >>> 0, 1));
class nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ud.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Ud.register(this, this.__wbg_ptr, this), this;
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
const Vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpf_free(e >>> 0, 1));
class sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vd.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
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
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Se.__wrap(t);
  }
}
const Yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jne_free(e >>> 0, 1));
class ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Yd.register(this, this.__wbg_ptr, this), this;
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
const Hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jneb_free(e >>> 0, 1));
class ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Hd.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const Xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnef_free(e >>> 0, 1));
class ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Xd.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const Zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnei_free(e >>> 0, 1));
class cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Zd.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzb_free(e >>> 0, 1));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Wd.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzf_free(e >>> 0, 1));
class ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, jd.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzi_free(e >>> 0, 1));
class _b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jd.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Jd.register(this, this.__wbg_ptr, this), this;
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
const qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_k256_free(e >>> 0, 1));
class hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qd.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, qd.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_lb_free(e >>> 0, 1));
class lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $d.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, $d.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ldc_free(e >>> 0, 1));
class fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kd.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Kd.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_log_free(e >>> 0, 1));
class Ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, tu.register(this, this.__wbg_ptr, this), this;
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
const eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_logd_free(e >>> 0, 1));
class pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, eu.register(this, this.__wbg_ptr, this), this;
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
const ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lt_free(e >>> 0, 1));
class gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ru.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ru.register(this, this.__wbg_ptr, this), this;
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
const nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lw_free(e >>> 0, 1));
class wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, nu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcl_free(e >>> 0, 1));
class mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, su.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, su.register(this, this.__wbg_ptr, this), this;
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
const iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcli_free(e >>> 0, 1));
class yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iu.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, iu.register(this, this.__wbg_ptr, this), this;
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
const au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcp_free(e >>> 0, 1));
class bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, au.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, au.register(this, this.__wbg_ptr, this), this;
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
const ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcpi_free(e >>> 0, 1));
class Ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ou.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ou.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_meq_free(e >>> 0, 1));
class Eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, cu.register(this, this.__wbg_ptr, this), this;
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
const du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mint_free(e >>> 0, 1));
class vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, du.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
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
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return h.__wrap(t);
  }
}
const uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mldv_free(e >>> 0, 1));
class Cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, uu.register(this, this.__wbg_ptr, this), this;
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
const _u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mlog_free(e >>> 0, 1));
class Bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _u.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, _u.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_mod_free(e >>> 0, 1));
class xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, hu.register(this, this.__wbg_ptr, this), this;
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
const lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_modi_free(e >>> 0, 1));
class Rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, lu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_move_free(e >>> 0, 1));
class Sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fu.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, fu.register(this, this.__wbg_ptr, this), this;
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
const Au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_movi_free(e >>> 0, 1));
class Tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Au.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, Se);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Au.register(this, this.__wbg_ptr, this), this;
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
const pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mroo_free(e >>> 0, 1));
class Nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, pu.register(this, this.__wbg_ptr, this), this;
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
const gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mul_free(e >>> 0, 1));
class Db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, gu.register(this, this.__wbg_ptr, this), this;
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
const wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_muli_free(e >>> 0, 1));
class Fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, wu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Qb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0, 1));
class os {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qb.unregister(this), t;
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
const Ob = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0, 1));
class cs {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ob.unregister(this), t;
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
const mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_noop_free(e >>> 0, 1));
class Mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mu.unregister(this), t;
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
    return this.__wbg_ptr = t >>> 0, mu.register(this, this.__wbg_ptr, this), this;
  }
}
const yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_not_free(e >>> 0, 1));
class Lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yu.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, yu.register(this, this.__wbg_ptr, this), this;
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
const bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_or_free(e >>> 0, 1));
class Pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, bu.register(this, this.__wbg_ptr, this), this;
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
const Iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ori_free(e >>> 0, 1));
class kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Iu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Iu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_poph_free(e >>> 0, 1));
class zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eu.unregister(this), t;
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
    g(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Eu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_popl_free(e >>> 0, 1));
class Gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vu.unregister(this), t;
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
    g(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, vu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const Cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshh_free(e >>> 0, 1));
class Ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cu.unregister(this), t;
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
    g(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Cu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const Bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshl_free(e >>> 0, 1));
class Vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bu.unregister(this), t;
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
    g(t, Ie);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Bu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ie.__wrap(t);
  }
}
const xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_panicinstruction_free(e >>> 0, 1));
class Yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xu.unregister(this), t;
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
    return this.__wbg_ptr = n >>> 0, xu.register(this, this.__wbg_ptr, this), this;
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
const Ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ret_free(e >>> 0, 1));
class Hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ru.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Ru.register(this, this.__wbg_ptr, this), this;
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
const Su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_retd_free(e >>> 0, 1));
class Xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Su.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Su.register(this, this.__wbg_ptr, this), this;
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
const Tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0, 1));
class Zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tu.unregister(this), t;
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
    g(t, h);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Tu.register(this, this.__wbg_ptr, this), this;
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
const oa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0, 1));
class h {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(h.prototype);
    return r.__wbg_ptr = t, oa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, oa.unregister(this), t;
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
    return this.__wbg_ptr = r >>> 0, oa.register(this, this.__wbg_ptr, this), this;
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
const Nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0, 1));
class Wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Nu.register(this, this.__wbg_ptr, this), this;
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
const Du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sb_free(e >>> 0, 1));
class jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Du.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Du.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_scwq_free(e >>> 0, 1));
class Jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Fu.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0, 1));
class qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Qu.register(this, this.__wbg_ptr, this), this;
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
const Ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0, 1));
class $b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ou.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ou.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_smo_free(e >>> 0, 1));
class Kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Mu.register(this, this.__wbg_ptr, this), this;
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
const Lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srl_free(e >>> 0, 1));
class tI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Lu.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_srli_free(e >>> 0, 1));
class eI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Pu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srw_free(e >>> 0, 1));
class rI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ku.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, ku.register(this, this.__wbg_ptr, this), this;
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
const zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srwq_free(e >>> 0, 1));
class nI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, zu.register(this, this.__wbg_ptr, this), this;
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
const Gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sub_free(e >>> 0, 1));
class sI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Gu.register(this, this.__wbg_ptr, this), this;
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
const Uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_subi_free(e >>> 0, 1));
class iI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Uu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sw_free(e >>> 0, 1));
class aI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Vu.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
const Yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sww_free(e >>> 0, 1));
class oI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Yu.register(this, this.__wbg_ptr, this), this;
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
const Hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_swwq_free(e >>> 0, 1));
class cI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Hu.register(this, this.__wbg_ptr, this), this;
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
const Xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_time_free(e >>> 0, 1));
class dI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xu.unregister(this), t;
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
    g(t, h);
    var n = t.__destroy_into_raw();
    g(r, h);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Xu.register(this, this.__wbg_ptr, this), this;
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
const Zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tr_free(e >>> 0, 1));
class uI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zu.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Zu.register(this, this.__wbg_ptr, this), this;
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
const Wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tro_free(e >>> 0, 1));
class _I {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Wu.register(this, this.__wbg_ptr, this), this;
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
const ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdam_free(e >>> 0, 1));
class hI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ju.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, ju.register(this, this.__wbg_ptr, this), this;
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
const ca = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0, 1));
class Ks {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ks.prototype);
    return r.__wbg_ptr = t, ca.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ca.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Qr);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_from_args(i, a, o, u);
    return Ks.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, ca.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const da = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0, 1));
class ti {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ti.prototype);
    return r.__wbg_ptr = t, da.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, da.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, as);
    var u = s.__destroy_into_raw();
    const f = c.wddv_from_args(i, a, o, u);
    return ti.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, da.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const Ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0, 1));
class lI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ju.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Ju.register(this, this.__wbg_ptr, this), this;
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
const ua = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0, 1));
class ei {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ei.prototype);
    return r.__wbg_ptr = t, ua.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ua.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, cs);
    var u = s.__destroy_into_raw();
    const f = c.wdml_from_args(i, a, o, u);
    return ei.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, ua.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0, 1));
class fI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qu.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, qu.register(this, this.__wbg_ptr, this), this;
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
const _a = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0, 1));
class ri {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ri.prototype);
    return r.__wbg_ptr = t, _a.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _a.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, os);
    var u = s.__destroy_into_raw();
    const f = c.wdop_from_args(i, a, o, u);
    return ri.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, _a.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const $u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqam_free(e >>> 0, 1));
class AI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $u.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, $u.register(this, this.__wbg_ptr, this), this;
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
const ha = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0, 1));
class ni {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ni.prototype);
    return r.__wbg_ptr = t, ha.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ha.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Qr);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_from_args(i, a, o, u);
    return ni.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, ha.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const la = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0, 1));
class si {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(si.prototype);
    return r.__wbg_ptr = t, la.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, la.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, as);
    var u = s.__destroy_into_raw();
    const f = c.wddv_from_args(i, a, o, u);
    return si.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, la.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const Ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0, 1));
class pI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ku.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Ku.register(this, this.__wbg_ptr, this), this;
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
const fa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0, 1));
class ii {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ii.prototype);
    return r.__wbg_ptr = t, fa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fa.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, cs);
    var u = s.__destroy_into_raw();
    const f = c.wdml_from_args(i, a, o, u);
    return ii.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, fa.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const t_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0, 1));
class gI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t_.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, h);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, t_.register(this, this.__wbg_ptr, this), this;
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
const Aa = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0, 1));
class ai {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ai.prototype);
    return r.__wbg_ptr = t, Aa.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Aa.unregister(this), t;
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
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, os);
    var u = s.__destroy_into_raw();
    const f = c.wdop_from_args(i, a, o, u);
    return ai.__wrap(f);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, r, n, s) {
    g(t, h);
    var i = t.__destroy_into_raw();
    g(r, h);
    var a = r.__destroy_into_raw();
    g(n, h);
    var o = n.__destroy_into_raw();
    g(s, Nt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, a, o, u);
    return this.__wbg_ptr = f >>> 0, Aa.register(this, this.__wbg_ptr, this), this;
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
    return Nt.__wrap(t);
  }
}
const e_ = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xor_free(e >>> 0, 1));
class wI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, e_.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, h);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, e_.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_xori_free(e >>> 0, 1));
class mI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, r_.unregister(this), t;
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
    g(t, h);
    var s = t.__destroy_into_raw();
    g(r, h);
    var i = r.__destroy_into_raw();
    g(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, r_.register(this, this.__wbg_ptr, this), this;
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
    return _t.__wrap(t);
  }
}
async function yI(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(e, t);
      } catch (n) {
        if (e.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
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
function gl() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(A0(t, r));
  }, e;
}
function wl(e, t) {
  return c = e.exports, ml.__wbindgen_wasm_module = t, kr = null, kn = null, c;
}
function bI(e) {
  if (c !== void 0) return c;
  typeof e < "u" && (Object.getPrototypeOf(e) === Object.prototype ? { module: e } = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const t = gl();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return wl(r, e);
}
async function ml(e) {
  if (c !== void 0) return c;
  typeof e < "u" && (Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
  const t = gl(), { instance: r, module: n } = await yI(await e, t);
  return wl(r, n);
}
function II(e, t, r, n) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(r, "base64");
  else {
    var a = globalThis.atob(r), o = a.length;
    s = new Uint8Array(new ArrayBuffer(o));
    for (var u = 0; u < o; u++)
      s[u] = a.charCodeAt(u);
  }
  {
    var f = new WebAssembly.Module(s);
    return n ? new WebAssembly.Instance(f, n) : f;
  }
}
function EI(e) {
  return II(1, null, "AGFzbQEAAAABOgpgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAABf2AFf39/f38Bf2ABfwBgA39/fwBgAAACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cAAwOBAv8BAQEDAwMDAwMBAQMDAQEBAwMBAQEEAQMDAwEBAwEBAQQCAQMCAgICAgIDAwMEBAQEBAQEBAEBAQMDAAICBAQEBAQEBAQEBAABAQgDAwQBAQEBAQEBAgcDAQAAAQEDBwcBAwEDAgIBAQEAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBBQEBAQEEAAQBBgICAwMAAgAHAQgEAQQBCQMBAQcBBQUFBQUFBQUFBQUFBQUFBQUFBQMGBgICBAIGBgAACAAEBQMBABEGCQF/AUGAgMAACwe9Td0FBm1lbW9yeQIAFl9fd2JnX2NvbXBhcmVhcmdzX2ZyZWUAEBpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQBIGl9fd2JnX3NldF9jb21wYXJlYXJnc19tb2RlADgiX193YmdfZ2V0X2NvbXBhcmVhcmdzX2luZGlyZWN0X3JocwBJIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMASxJjb21wYXJlYXJnc190b19pbW0AWBRjb21wYXJlYXJnc19mcm9tX2ltbQAfFV9fd2JnX2dldF9tYXRoYXJnc19vcABIFV9fd2JnX3NldF9tYXRoYXJnc19vcAA5El9fd2JnX211bGFyZ3NfZnJlZQARHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X3JocwBIHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwBMEl9fd2JnX2RpdmFyZ3NfZnJlZQAjHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwC7AR5fX3diZ19zZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAYxtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAFyFwYW5pY2luc3RydWN0aW9uX2Vycm9yX3R5cGVzY3JpcHQATRdwYW5pY2luc3RydWN0aW9uX3JlYXNvbgBbHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AXAxnbV9mcm9tX2FyZ3MA1wENZ3RmX2Zyb21fYXJncwDPAQdnbV9hcmdzAIoBCGd0Zl9hcmdzAGkOd2RjbV9mcm9tX2FyZ3MAOw53ZG9wX2Zyb21fYXJncwA7DndkbWxfZnJvbV9hcmdzADwOd2Rkdl9mcm9tX2FyZ3MAywEJd2RjbV9hcmdzACQJd3FjbV9hcmdzACUJd2RvcF9hcmdzACYJd3FvcF9hcmdzACcJd2RtbF9hcmdzACgJd3FtbF9hcmdzACkJd2Rkdl9hcmdzAGQJd3Fkdl9hcmdzAGUQX193YmdfaW1tMDZfZnJlZQAqEF9fd2JnX2ltbTEyX2ZyZWUAKxBfX3diZ19pbW0xOF9mcmVlACwOX193YmdfYWRkX2ZyZWUAGA9fX3diZ19ub29wX2ZyZWUABxJhZGRfbmV3X3R5cGVzY3JpcHQAWQZhZGRfcmEANQZhZGRfcmIAEgZhZGRfcmMAGgNhZGQAxwEDYW5kAIwBA2RpdgCNAQJlcQCOAQNleHAAjwECZ3QAkAECbHQAkQEEbWxvZwCSAQRtcm9vAJMBBG1vZF8AlAEFbW92ZV8APQNtdWwAlQEDbm90AD4Cb3IAlgEDc2xsAJcBA3NybACYAQNzdWIAmQEDeG9yAJoBBG1sZHYAagNyZXQAvAEEcmV0ZAA/E2Fsb2NfbmV3X3R5cGVzY3JpcHQAYAdhbG9jX3JhACIEYWxvYwC9AQNtY2wAQANtY3AAmwEDbWVxAGsTYmhzaF9uZXdfdHlwZXNjcmlwdAAgBGJoc2gALQRiaGVpAL4BBGJ1cm4AQQRjYWxsAGwDY2NwAG0EY3JvbwBCBGNzaXoAQwJjYgC/AQNsZGMAbgNsb2cAbwRsb2dkAHAEbWludABEBHJ2cnQAwAEEc2N3cQCcAQNzcncAnQEEc3J3cQBxA3N3dwCeAQRzd3dxAHICdHIAnwEDdHJvAHMEZWNrMQCgAQRlY3IxAKEBBGVkMTkAdARrMjU2AKIBBHMyNTYAowEEdGltZQBFE25vb3BfbmV3X3R5cGVzY3JpcHQAwQEEbm9vcADfAQRmbGFnAMIBA2JhbACkAQNqbXAAwwEDam5lAKUBA3NtbwB1E2FkZGlfbmV3X3R5cGVzY3JpcHQAWgphZGRpX2ltbTEyAAkEYWRkaQCmAQRhbmRpAKcBBGRpdmkAqAEEZXhwaQCpAQRtb2RpAKoBBG11bGkAqwEDb3JpAKwBBHNsbGkArQEEc3JsaQCuAQRzdWJpAK8BBHhvcmkAsAEEam5laQCxAQJsYgCyAQJsdwCzAQJzYgC0AQJzdwC1AQRtY3BpALYBEmd0Zl9uZXdfdHlwZXNjcmlwdADRAQNndGYAtwEEbWNsaQAuEWdtX25ld190eXBlc2NyaXB0AEYIZ21faW1tMTgADQJnbQAvBG1vdmkAMARqbnppADEEam1wZgAyE2ptcGJfbmV3X3R5cGVzY3JpcHQAFQRqbXBiADMEam56ZgC4AQRqbnpiALkBBGpuZWYAdgpqbmViX2ltbTA2ADYEam5lYgB3AmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdAA3CmNmZWlfaW1tMjQACgRjZmVpAE8EY2ZzaQBQA2NmZQDEAQNjZnMAxQEEcHNobABRBHBzaGgAUgRwb3BsAFMEcG9waABUE3dkY21fbmV3X3R5cGVzY3JpcHQAzAEEd2RjbQB4BHdxY20AeQR3ZG9wAHoEd3FvcAB7BHdkbWwAfAR3cW1sAH0Ed2RkdgB+BHdxZHYAfwR3ZG1kAIABBHdxbWQAgQEEd2RhbQCCAQR3cWFtAIMBBHdkbW0AhAEEd3FtbQCFAQRlY2FsAIYBBGJzaXoANBNibGRkX25ld190eXBlc2NyaXB0AFUHYmxkZF9yZAA2BGJsZGQAhwEEZWNvcACIAQRlcGFyAIkBFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADBRpbnN0cnVjdGlvbl90b19ieXRlcwAGEGluc3RydWN0aW9uX3NpemUA8QERcmVnaWRfbmV3X2NoZWNrZWQAugEJcmVnaWRfYmFsAOABCnJlZ2lkX2NnYXMA4QEJcmVnaWRfZXJyAOIBCnJlZ2lkX2ZsYWcA4wEIcmVnaWRfZnAA5AEKcmVnaWRfZ2dhcwDlAQhyZWdpZF9ocADmAQhyZWdpZF9pcwDnAQhyZWdpZF9vZgDoAQlyZWdpZF9vbmUA6QEIcmVnaWRfcGMA6gEJcmVnaWRfcmV0AOsBCnJlZ2lkX3JldGwA7AEIcmVnaWRfc3AA7QEJcmVnaWRfc3BwAO4BDnJlZ2lkX3dyaXRhYmxlAO8BCnJlZ2lkX3plcm8A8AEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA2wELcmVnaWRfdG9fdTgA3AESYW5kX25ld190eXBlc2NyaXB0AFkSZGl2X25ld190eXBlc2NyaXB0AFkRZXFfbmV3X3R5cGVzY3JpcHQAWRJleHBfbmV3X3R5cGVzY3JpcHQAWRFndF9uZXdfdHlwZXNjcmlwdABZEWx0X25ld190eXBlc2NyaXB0AFkTbWxvZ19uZXdfdHlwZXNjcmlwdABZE21yb29fbmV3X3R5cGVzY3JpcHQAWRJtb2RfbmV3X3R5cGVzY3JpcHQAWRJtdWxfbmV3X3R5cGVzY3JpcHQAWRFvcl9uZXdfdHlwZXNjcmlwdABZEnNsbF9uZXdfdHlwZXNjcmlwdABZEnNybF9uZXdfdHlwZXNjcmlwdABZEnN1Yl9uZXdfdHlwZXNjcmlwdABZEnhvcl9uZXdfdHlwZXNjcmlwdABZEm1jcF9uZXdfdHlwZXNjcmlwdABZE3Njd3FfbmV3X3R5cGVzY3JpcHQAWRJzcndfbmV3X3R5cGVzY3JpcHQAWRJzd3dfbmV3X3R5cGVzY3JpcHQAWRF0cl9uZXdfdHlwZXNjcmlwdABZE2VjazFfbmV3X3R5cGVzY3JpcHQAWRNlY3IxX25ld190eXBlc2NyaXB0AFkTazI1Nl9uZXdfdHlwZXNjcmlwdABZE3MyNTZfbmV3X3R5cGVzY3JpcHQAWRJiYWxfbmV3X3R5cGVzY3JpcHQAWRJqbmVfbmV3X3R5cGVzY3JpcHQAWRNhbmRpX25ld190eXBlc2NyaXB0AFoTZGl2aV9uZXdfdHlwZXNjcmlwdABaE2V4cGlfbmV3X3R5cGVzY3JpcHQAWhNtb2RpX25ld190eXBlc2NyaXB0AFoTbXVsaV9uZXdfdHlwZXNjcmlwdABaEm9yaV9uZXdfdHlwZXNjcmlwdABaE3NsbGlfbmV3X3R5cGVzY3JpcHQAWhNzcmxpX25ld190eXBlc2NyaXB0AFoTc3ViaV9uZXdfdHlwZXNjcmlwdABaE3hvcmlfbmV3X3R5cGVzY3JpcHQAWhNqbmVpX25ld190eXBlc2NyaXB0AFoRbGJfbmV3X3R5cGVzY3JpcHQAWhFsd19uZXdfdHlwZXNjcmlwdABaEXNiX25ld190eXBlc2NyaXB0AFoRc3dfbmV3X3R5cGVzY3JpcHQAWhNtY3BpX25ld190eXBlc2NyaXB0AFoTam56Zl9uZXdfdHlwZXNjcmlwdABaE2puemJfbmV3X3R5cGVzY3JpcHQAWhFqaV9uZXdfdHlwZXNjcmlwdAA3E2Nmc2lfbmV3X3R5cGVzY3JpcHQANxNwc2hsX25ld190eXBlc2NyaXB0ADcTcHNoaF9uZXdfdHlwZXNjcmlwdAA3E3BvcGxfbmV3X3R5cGVzY3JpcHQANxNwb3BoX25ld190eXBlc2NyaXB0ADcTbW92aV9uZXdfdHlwZXNjcmlwdAAVE21jbGlfbmV3X3R5cGVzY3JpcHQAFRNqbnppX25ld190eXBlc2NyaXB0ABUTam1wZl9uZXdfdHlwZXNjcmlwdAAVEm5vdF9uZXdfdHlwZXNjcmlwdAAgE3JldGRfbmV3X3R5cGVzY3JpcHQAIBNtb3ZlX25ld190eXBlc2NyaXB0ACASbWNsX25ld190eXBlc2NyaXB0ACATYnVybl9uZXdfdHlwZXNjcmlwdAAgE2Nyb29fbmV3X3R5cGVzY3JpcHQAIBNjc2l6X25ld190eXBlc2NyaXB0ACATbWludF9uZXdfdHlwZXNjcmlwdAAgE3RpbWVfbmV3X3R5cGVzY3JpcHQAIBNic2l6X25ld190eXBlc2NyaXB0ACAGcmV0X3JhACIHYmhlaV9yYQAiBWNiX3JhACIHcnZydF9yYQAiB2ZsYWdfcmEAIgZqbXBfcmEAIghqaV9pbW0yNAAKCmNmc2lfaW1tMjQACgZjZmVfcmEAIgZjZnNfcmEAIgpwc2hsX2ltbTI0AAoKcHNoaF9pbW0yNAAKCnBvcGxfaW1tMjQACgpwb3BoX2ltbTI0AAoTbWxkdl9uZXdfdHlwZXNjcmlwdABVEm1lcV9uZXdfdHlwZXNjcmlwdABVEmNjcF9uZXdfdHlwZXNjcmlwdABVEmxvZ19uZXdfdHlwZXNjcmlwdABVE2xvZ2RfbmV3X3R5cGVzY3JpcHQAVRNzcndxX25ld190eXBlc2NyaXB0AFUTc3d3cV9uZXdfdHlwZXNjcmlwdABVEnRyb19uZXdfdHlwZXNjcmlwdABVE2VkMTlfbmV3X3R5cGVzY3JpcHQAVRJzbW9fbmV3X3R5cGVzY3JpcHQAVRJsZGNfbmV3X3R5cGVzY3JpcHQAVRNqbmVmX25ld190eXBlc2NyaXB0AFUTd2RtZF9uZXdfdHlwZXNjcmlwdABVE3dxbWRfbmV3X3R5cGVzY3JpcHQAVRN3ZGFtX25ld190eXBlc2NyaXB0AFUTd3FhbV9uZXdfdHlwZXNjcmlwdABVE3dkbW1fbmV3X3R5cGVzY3JpcHQAVRN3cW1tX25ld190eXBlc2NyaXB0AFUTZWNhbF9uZXdfdHlwZXNjcmlwdABVE2NhbGxfbmV3X3R5cGVzY3JpcHQAVRNlY29wX25ld190eXBlc2NyaXB0AFUTZXBhcl9uZXdfdHlwZXNjcmlwdABVE19fd2JnX21hdGhhcmdzX2ZyZWUAEB9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzAEseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAEsfX193YmdfZ2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwBJHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwBJEnJldF9uZXdfdHlwZXNjcmlwdABgE2JoZWlfbmV3X3R5cGVzY3JpcHQAYBFjYl9uZXdfdHlwZXNjcmlwdABgE3J2cnRfbmV3X3R5cGVzY3JpcHQAYBNmbGFnX25ld190eXBlc2NyaXB0AGASam1wX25ld190eXBlc2NyaXB0AGASY2ZlX25ld190eXBlc2NyaXB0AGASY2ZzX25ld190eXBlc2NyaXB0AGAPX193Ymdfam1wZl9mcmVlABgPX193Ymdfc3ViaV9mcmVlABgNX193YmdfamlfZnJlZQAYD19fd2JnX2VjYWxfZnJlZQAYD19fd2JnX3BvcGxfZnJlZQAYDl9fd2JnX2xkY19mcmVlABgPX193Ymdfd2RtbF9mcmVlABgNX193YmdfbHdfZnJlZQAYD19fd2JnX3dxbWxfZnJlZQAYD19fd2JnX2V4cGlfZnJlZQAYD19fd2JnX2puZWZfZnJlZQAYDl9fd2JnX3Nyd19mcmVlABgPX193YmdfYmxkZF9mcmVlABgOX193YmdfbWNwX2ZyZWUAGA9fX3diZ193ZG9wX2ZyZWUAGA9fX3diZ190aW1lX2ZyZWUAGA9fX3diZ19zcndxX2ZyZWUAGA5fX3diZ19jZmVfZnJlZQAYDV9fd2JnX2x0X2ZyZWUAGA9fX3diZ19ydnJ0X2ZyZWUAGA9fX3diZ19kaXZpX2ZyZWUAGA9fX3diZ19tbGR2X2ZyZWUAGA1fX3diZ19sYl9mcmVlABgNX193YmdfY2JfZnJlZQAYDl9fd2JnX2xvZ19mcmVlABgOX193YmdfbWNsX2ZyZWUAGA9fX3diZ193cW1tX2ZyZWUAGA9fX3diZ19zd3dxX2ZyZWUAGA9fX3diZ19idXJuX2ZyZWUAGA5fX3diZ194b3JfZnJlZQAYDl9fd2JnX2V4cF9mcmVlABgPX193Ymdfd3FvcF9mcmVlABgPX193YmdfczI1Nl9mcmVlABgPX193Ymdfd2RhbV9mcmVlABgPX193Ymdfam5lYl9mcmVlABgPX193YmdfbW92aV9mcmVlABgOX193Ymdfam1wX2ZyZWUAGA5fX3diZ19zbW9fZnJlZQAYD19fd2JnX2Joc2hfZnJlZQAYD19fd2JnX211bGlfZnJlZQAYD19fd2JnX21vZGlfZnJlZQAYDl9fd2JnX3Ryb19mcmVlABgPX193Ymdfc2N3cV9mcmVlABgPX193Ymdfd3FjbV9mcmVlABgPX193Ymdfd3FtZF9mcmVlABgPX193YmdfZWNyMV9mcmVlABgNX193Ymdfc3dfZnJlZQAYD19fd2JnX2xvZ2RfZnJlZQAYD19fd2JnX21pbnRfZnJlZQAYD19fd2JnX3dkbWRfZnJlZQAYD19fd2JnX3hvcmlfZnJlZQAYD19fd2JnX2FuZGlfZnJlZQAYD19fd2JnX3NybGlfZnJlZQAYD19fd2JnX2NhbGxfZnJlZQAYD19fd2JnX21vdmVfZnJlZQAYDV9fd2JnX2VxX2ZyZWUAGA9fX3diZ19qbmVpX2ZyZWUAGA9fX3diZ19lZDE5X2ZyZWUAGA9fX3diZ19wc2hoX2ZyZWUAGA5fX3diZ19zbGxfZnJlZQAYD19fd2JnX2FkZGlfZnJlZQAYD19fd2JnX2puemJfZnJlZQAYDl9fd2JnX3N3d19mcmVlABgOX193YmdfY2NwX2ZyZWUAGA9fX3diZ19qbXBiX2ZyZWUAGA9fX3diZ19tbG9nX2ZyZWUAGA9fX3diZ19tY3BpX2ZyZWUAGA1fX3diZ19ndF9mcmVlABgPX193YmdfYnNpel9mcmVlABgPX193Ymdfam56aV9mcmVlABgOX193Ymdfc3ViX2ZyZWUAGA5fX3diZ19kaXZfZnJlZQAYDl9fd2JnX2puZV9mcmVlABgOX193YmdfcmV0X2ZyZWUAGA9fX3diZ19lY29wX2ZyZWUAGA9fX3diZ19yZXRkX2ZyZWUAGA1fX3diZ19vcl9mcmVlABgPX193YmdfY2ZzaV9mcmVlABgPX193YmdfcG9waF9mcmVlABgOX193YmdfYmFsX2ZyZWUAGA9fX3diZ193ZGR2X2ZyZWUAGA9fX3diZ19tcm9vX2ZyZWUAGA9fX3diZ19rMjU2X2ZyZWUAGA1fX3diZ190cl9mcmVlABgOX193YmdfY2ZzX2ZyZWUAGA9fX3diZ193cWFtX2ZyZWUAGA1fX3diZ19zYl9mcmVlABgOX193YmdfZ3RmX2ZyZWUAGA9fX3diZ19qbnpmX2ZyZWUAGA9fX3diZ19mbGFnX2ZyZWUAGA5fX3diZ19tZXFfZnJlZQAYD19fd2JnX2VwYXJfZnJlZQAYD19fd2JnX21jbGlfZnJlZQAYD19fd2JnX3dkY21fZnJlZQAYD19fd2JnX2NmZWlfZnJlZQAYD19fd2JnX2Fsb2NfZnJlZQAYDV9fd2JnX2dtX2ZyZWUAGA9fX3diZ193cWR2X2ZyZWUAGA5fX3diZ19zcmxfZnJlZQAYDl9fd2JnX25vdF9mcmVlABgPX193YmdfY3Npel9mcmVlABgOX193YmdfbW9kX2ZyZWUAGA9fX3diZ193ZG1tX2ZyZWUAGA9fX3diZ19zbGxpX2ZyZWUAGA9fX3diZ19iaGVpX2ZyZWUAGA9fX3diZ19lY2sxX2ZyZWUAGA9fX3diZ19wc2hsX2ZyZWUAGA9fX3diZ19jcm9vX2ZyZWUAGA5fX3diZ19tdWxfZnJlZQAYDl9fd2JnX2FuZF9mcmVlABgOX193Ymdfb3JpX2ZyZWUAGBN3cWR2X25ld190eXBlc2NyaXB0AMwBE3dxbWxfbmV3X3R5cGVzY3JpcHQAzAETd2RtbF9uZXdfdHlwZXNjcmlwdADMARN3cW9wX25ld190eXBlc2NyaXB0AMwBE3dkb3BfbmV3X3R5cGVzY3JpcHQAzAETd3FjbV9uZXdfdHlwZXNjcmlwdADMARN3ZGR2X25ld190eXBlc2NyaXB0AMwBDndxY21fZnJvbV9hcmdzADsKd3Fkdl9pbW0wNgA2CndxbWxfaW1tMDYANgp3ZG1sX2ltbTA2ADYKd3FvcF9pbW0wNgA2Cndkb3BfaW1tMDYANgp3cWNtX2ltbTA2ADYKd2Rkdl9pbW0wNgA2CndkY21faW1tMDYANgpqbmVmX2ltbTA2ADYJbGRjX2ltbTA2ADYOd3Fkdl9mcm9tX2FyZ3MAywEOd3FvcF9mcm9tX2FyZ3MAOwVnbV9yYQA1BWd0X3JjABoFZ3RfcmIAEgVndF9yYQA1BWxiX3JiABIFbGJfcmEANQVsdF9yYwAaBWx0X3JiABIFbHRfcmEANQhsd19pbW0xMgAJBWx3X3JiABIFbHdfcmEANQVvcl9yYwAaBW9yX3JiABIFb3JfcmEANQhzYl9pbW0xMgAJBXNiX3JiABIFc2JfcmEANQhzd19pbW0xMgAJBXN3X3JiABIFc3dfcmEANQV0cl9yYwAaBXRyX3JiABIFdHJfcmEANQVlcV9yYwAaBWVxX3JiABIFZXFfcmEANQZhbmRfcmMAGgZhbmRfcmIAEgZhbmRfcmEANQZiYWxfcmMAGgZiYWxfcmIAEgZiYWxfcmEANQZjY3BfcmMAGgZjY3BfcmIAEgZjY3BfcmEANQZkaXZfcmMAGgZkaXZfcmIAEgZkaXZfcmEANQZleHBfcmMAGgZleHBfcmIAEgZleHBfcmEANQhsYl9pbW0xMgAJBmd0Zl9yYgASBmd0Zl9yYQA1BmpuZV9yYwAaBmpuZV9yYgASBmpuZV9yYQA1BmxkY19yYwAaBmxkY19yYgASBmxkY19yYQA1BmxvZ19yZAA2BmxvZ19yYwAaBmxvZ19yYgASBmxvZ19yYQA1Bm1jbF9yYgASBm1jbF9yYQA1Bm1jcF9yYwAaBm1jcF9yYgASBm1jcF9yYQA1Bm1lcV9yZAA2Bm1lcV9yYwAaBm1lcV9yYgASBm1lcV9yYQA1Bm1vZF9yYwAaBm1vZF9yYgASBm1vZF9yYQA1Bm11bF9yYwAaBm11bF9yYgASBm11bF9yYQA1Bm5vdF9yYgASBm5vdF9yYQA1CW9yaV9pbW0xMgAJBm9yaV9yYgASBm9yaV9yYQA1BnNsbF9yYwAaBnNsbF9yYgASBnNsbF9yYQA1BnNtb19yZAA2BnNtb19yYwAaBnNtb19yYgASBnNtb19yYQA1BnNybF9yYwAaBnNybF9yYgASBnNybF9yYQA1BnNyd19yYwAaBnNyd19yYgASBnNyd19yYQA1BnN1Yl9yYwAaBnN1Yl9yYgASBnN1Yl9yYQA1BnN3d19yYwAaBnN3d19yYgASBnN3d19yYQA1BnRyb19yZAA2BnRyb19yYwAaBnRyb19yYgASBnRyb19yYQA1Bnhvcl9yYwAaBnhvcl9yYgASBnhvcl9yYQA1CWd0Zl9pbW0xMgAJB2FkZGlfcmIAEgdhZGRpX3JhADUKYW5kaV9pbW0xMgAJB2FuZGlfcmIAEgdhbmRpX3JhADUHYmhzaF9yYgASB2Joc2hfcmEANQZjY3BfcmQANgdibGRkX3JjABoHYmxkZF9yYgASB2JsZGRfcmEANQdic2l6X3JiABIHYnNpel9yYQA1B2J1cm5fcmIAEgdidXJuX3JhADUHY2FsbF9yZAA2B2NhbGxfcmMAGgdjYWxsX3JiABIHY2FsbF9yYQA1B2Nyb29fcmIAEgdjcm9vX3JhADUHY3Npel9yYgASB2NzaXpfcmEANQpkaXZpX2ltbTEyAAkHZGl2aV9yYgASB2RpdmlfcmEANQdlY2FsX3JkADYHZWNhbF9yYwAaB2VjYWxfcmIAEgdlY2FsX3JhADUHZWNrMV9yYwAaB2VjazFfcmIAEgdlY2sxX3JhADUHZWNvcF9yZAA2B2Vjb3BfcmMAGgdlY29wX3JiABIHZWNvcF9yYQA1B2VjcjFfcmMAGgdlY3IxX3JiABIHZWNyMV9yYQA1B2VkMTlfcmQANgdlZDE5X3JjABoHZWQxOV9yYgASB2VkMTlfcmEANQdlcGFyX3JkADYHZXBhcl9yYwAaB2VwYXJfcmIAEgdlcGFyX3JhADUKZXhwaV9pbW0xMgAJB2V4cGlfcmIAEgdleHBpX3JhADUKam1wYl9pbW0xOAANB2ptcGJfcmEANQpqbXBmX2ltbTE4AA0Ham1wZl9yYQA1B2puZWJfcmMAGgdqbmViX3JiABIHam5lYl9yYQA1B2puZWZfcmMAGgdqbmVmX3JiABIHam5lZl9yYQA1CmpuZWlfaW1tMTIACQdqbmVpX3JiABIHam5laV9yYQA1CmpuemJfaW1tMTIACQdqbnpiX3JiABIHam56Yl9yYQA1CmpuemZfaW1tMTIACQdqbnpmX3JiABIHam56Zl9yYQA1CmpuemlfaW1tMTgADQdqbnppX3JhADUHazI1Nl9yYwAaB2syNTZfcmIAEgdrMjU2X3JhADUHbG9nZF9yZAA2B2xvZ2RfcmMAGgdsb2dkX3JiABIHbG9nZF9yYQA1Cm1jbGlfaW1tMTgADQdtY2xpX3JhADUKbWNwaV9pbW0xMgAJB21jcGlfcmIAEgdtY3BpX3JhADUHbWludF9yYgASB21pbnRfcmEANQdtbGR2X3JkADYHbWxkdl9yYwAaB21sZHZfcmIAEgdtbGR2X3JhADUHbWxvZ19yYwAaB21sb2dfcmIAEgdtbG9nX3JhADUKbW9kaV9pbW0xMgAJB21vZGlfcmIAEgdtb2RpX3JhADUHbW92ZV9yYgASB21vdmVfcmEANQptb3ZpX2ltbTE4AA0HbW92aV9yYQA1B21yb29fcmMAGgdtcm9vX3JiABIHbXJvb19yYQA1Cm11bGlfaW1tMTIACQdtdWxpX3JiABIHbXVsaV9yYQA1B3JldGRfcmIAEgdyZXRkX3JhADUHczI1Nl9yYwAaB3MyNTZfcmIAEgdzMjU2X3JhADUHc2N3cV9yYwAaB3Njd3FfcmIAEgdzY3dxX3JhADUKc2xsaV9pbW0xMgAJB3NsbGlfcmIAEgdzbGxpX3JhADUKc3JsaV9pbW0xMgAJB3NybGlfcmIAEgdzcmxpX3JhADUHc3J3cV9yZAA2B3Nyd3FfcmMAGgdzcndxX3JiABIHc3J3cV9yYQA1CnN1YmlfaW1tMTIACQdzdWJpX3JiABIHc3ViaV9yYQA1B3N3d3FfcmQANgdzd3dxX3JjABoHc3d3cV9yYgASB3N3d3FfcmEANQd0aW1lX3JiABIHdGltZV9yYQA1B3dkYW1fcmQANgd3ZGFtX3JjABoHd2RhbV9yYgASB3dkYW1fcmEANQd3ZGNtX3JjABoHd2RjbV9yYgASB3dkY21fcmEANQd3ZGR2X3JjABoHd2Rkdl9yYgASB3dkZHZfcmEANQd3ZG1kX3JkADYHd2RtZF9yYwAaB3dkbWRfcmIAEgd3ZG1kX3JhADUHd2RtbF9yYwAaB3dkbWxfcmIAEgd3ZG1sX3JhADUHd2RtbV9yZAA2B3dkbW1fcmMAGgd3ZG1tX3JiABIHd2RtbV9yYQA1B3dkb3BfcmMAGgd3ZG9wX3JiABIHd2RvcF9yYQA1B3dxYW1fcmQANgd3cWFtX3JjABoHd3FhbV9yYgASB3dxYW1fcmEANQd3cWNtX3JjABoHd3FjbV9yYgASB3dxY21fcmEANQd3cWR2X3JjABoHd3Fkdl9yYgASB3dxZHZfcmEANQd3cW1kX3JkADYHd3FtZF9yYwAaB3dxbWRfcmIAEgd3cW1kX3JhADUHd3FtbF9yYwAaB3dxbWxfcmIAEgd3cW1sX3JhADUHd3FtbV9yZAA2B3dxbW1fcmMAGgd3cW1tX3JiABIHd3FtbV9yYQA1B3dxb3BfcmMAGgd3cW9wX3JiABIHd3FvcF9yYQA1CnhvcmlfaW1tMTIACQd4b3JpX3JiABIHeG9yaV9yYQA1E2puZWJfbmV3X3R5cGVzY3JpcHQAVRBfX3diZ19yZWdpZF9mcmVlACoOd3FtbF9mcm9tX2FyZ3MAPBBfX3diZ19pbW0yNF9mcmVlACwfX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcgDYARNfX3diaW5kZ2VuX2V4cG9ydF8wANQBCqt7/wHtIgIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQeyOwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdCLwABqKAIAIgJFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgAigCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgAiEBIAYiBA0AQQAhBCABIQAMBAsgAigCFCIGIAAgBiACIANBHXZBBHFqQRBqKAIAIgJHGyAAIAYbIQAgA0EBdCEDIAINAAsMAQtB6I7AACgCACICQRAgAEELakH4A3EgAEELSRsiBUEDdiIAdiIBQQNxBEACQCABQX9zQQFxIABqIgFBA3QiAEHgjMAAaiIDIABB6IzAAGooAgAiACgCCCIERwRAIAQgAzYCDCADIAQ2AggMAQtB6I7AACACQX4gAXdxNgIACyAAIAFBA3QiAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwICyAFQfCOwAAoAgBNDQMCQAJAIAFFBEBB7I7AACgCACIARQ0GIABoQQJ0QdCLwABqKAIAIgEoAgRBeHEgBWshBCABIQIDQAJAIAEoAhAiAA0AIAEoAhQiAA0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAigCFCIAG2ooAgAiAQ0BQQAhAAwCCyACKAIIIgEgADYCDCAAIAE2AggMAQsgAkEUaiACQRBqIAAbIQMDQCADIQYgASIAQRRqIABBEGogACgCFCIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB0IvAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB7I7AAEHsjsAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeCMwABqIgMgAUHojMAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0HojsAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfCOwAAoAgAiAgRAIAJBeHFB4IzAAGohAEH4jsAAKAIAIQMCf0HojsAAKAIAIgVBASACQQN2dCICcUUEQEHojsAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtB+I7AACAGNgIAQfCOwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB8I7AACgCACIDRQ0BIANBeHFB4IzAAGohAEH4jsAAKAIAIQECf0HojsAAKAIAIgZBASADQQN2dCIDcUUEQEHojsAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0H4jsAAIAU2AgBB8I7AACAENgIACyACQQhqDwsgACABckUEQEEAIQFBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB0IvAAGooAgAhAAsgAEUNAQsDQCAAIAEgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgJFBEAgACgCFCECCyABIAggAyAFSSIAGyEBIAQgBiAEIAcbIAAbIQQgAiIADQALCyABRQ0AIAVB8I7AACgCACIATSAEIAAgBWtPcQ0AIAEoAhghBwJAAkAgASABKAIMIgBGBEAgAUEUQRAgASgCFCIAG2ooAgAiAg0BQQAhAAwCCyABKAIIIgIgADYCDCAAIAI2AggMAQsgAUEUaiABQRBqIAAbIQMDQCADIQYgAiIAQRRqIABBEGogACgCFCICGyEDIABBFEEQIAIbaigCACICDQALIAZBADYCAAsgB0UNAyABIAEoAhxBAnRB0IvAAGoiAigCAEcEQCAHQRBBFCAHKAIQIAFGG2ogADYCACAARQ0EDAMLIAIgADYCACAADQJB7I7AAEHsjsAAKAIAQX4gASgCHHdxNgIADAMLAkACQAJAAkACQCAFQfCOwAAoAgAiAUsEQCAFQfSOwAAoAgAiAE8EQEEAIQQgBUGvgARqIgBBEHZAACIBQX9GIgMNByABQRB0IgJFDQdBgI/AAEEAIABBgIB8cSADGyIEQYCPwAAoAgBqIgA2AgBBhI/AAEGEj8AAKAIAIgEgACAAIAFJGzYCAAJAAkBB/I7AACgCACIDBEBB0IzAACEAA0AgACgCACIBIAAoAgQiBmogAkYNAiAAKAIIIgANAAsMAgtBjI/AACgCACIAQQAgACACTRtFBEBBjI/AACACNgIAC0GQj8AAQf8fNgIAQdSMwAAgBDYCAEHQjMAAIAI2AgBB7IzAAEHgjMAANgIAQfSMwABB6IzAADYCAEHojMAAQeCMwAA2AgBB/IzAAEHwjMAANgIAQfCMwABB6IzAADYCAEGEjcAAQfiMwAA2AgBB+IzAAEHwjMAANgIAQYyNwABBgI3AADYCAEGAjcAAQfiMwAA2AgBBlI3AAEGIjcAANgIAQYiNwABBgI3AADYCAEGcjcAAQZCNwAA2AgBBkI3AAEGIjcAANgIAQaSNwABBmI3AADYCAEGYjcAAQZCNwAA2AgBB3IzAAEEANgIAQayNwABBoI3AADYCAEGgjcAAQZiNwAA2AgBBqI3AAEGgjcAANgIAQbSNwABBqI3AADYCAEGwjcAAQaiNwAA2AgBBvI3AAEGwjcAANgIAQbiNwABBsI3AADYCAEHEjcAAQbiNwAA2AgBBwI3AAEG4jcAANgIAQcyNwABBwI3AADYCAEHIjcAAQcCNwAA2AgBB1I3AAEHIjcAANgIAQdCNwABByI3AADYCAEHcjcAAQdCNwAA2AgBB2I3AAEHQjcAANgIAQeSNwABB2I3AADYCAEHgjcAAQdiNwAA2AgBB7I3AAEHgjcAANgIAQfSNwABB6I3AADYCAEHojcAAQeCNwAA2AgBB/I3AAEHwjcAANgIAQfCNwABB6I3AADYCAEGEjsAAQfiNwAA2AgBB+I3AAEHwjcAANgIAQYyOwABBgI7AADYCAEGAjsAAQfiNwAA2AgBBlI7AAEGIjsAANgIAQYiOwABBgI7AADYCAEGcjsAAQZCOwAA2AgBBkI7AAEGIjsAANgIAQaSOwABBmI7AADYCAEGYjsAAQZCOwAA2AgBBrI7AAEGgjsAANgIAQaCOwABBmI7AADYCAEG0jsAAQaiOwAA2AgBBqI7AAEGgjsAANgIAQbyOwABBsI7AADYCAEGwjsAAQaiOwAA2AgBBxI7AAEG4jsAANgIAQbiOwABBsI7AADYCAEHMjsAAQcCOwAA2AgBBwI7AAEG4jsAANgIAQdSOwABByI7AADYCAEHIjsAAQcCOwAA2AgBB3I7AAEHQjsAANgIAQdCOwABByI7AADYCAEHkjsAAQdiOwAA2AgBB2I7AAEHQjsAANgIAQfyOwAAgAjYCAEHgjsAAQdiOwAA2AgBB9I7AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGIj8AAQYCAgAE2AgAMCAsgAiADTSABIANLcg0AIAAoAgxFDQMLQYyPwABBjI/AACgCACIAIAIgACACSRs2AgAgAiAEaiEBQdCMwAAhAAJAAkADQCABIAAoAgBHBEAgACgCCCIADQEMAgsLIAAoAgxFDQELQdCMwAAhAANAAkAgAyAAKAIAIgFPBEAgASAAKAIEaiIGIANLDQELIAAoAgghAAwBCwtB/I7AACACNgIAQfSOwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBiI/AAEGAgIABNgIAIAMgBkEga0F4cUEIayIAIAAgA0EQakkbIgFBGzYCBEHQjMAAKQIAIQkgAUEQakHYjMAAKQIANwIAIAEgCTcCCEHUjMAAIAQ2AgBB0IzAACACNgIAQdiMwAAgAUEIajYCAEHcjMAAQQA2AgAgAUEcaiEAA0AgAEEHNgIAIABBBGoiACAGSQ0ACyABIANGDQcgASABKAIEQX5xNgIEIAMgASADayIAQQFyNgIEIAEgADYCACAAQYACTwRAIAMgABAFDAgLIABBeHFB4IzAAGohAQJ/QeiOwAAoAgAiAkEBIABBA3Z0IgBxRQRAQeiOwAAgACACcjYCACABDAELIAEoAggLIQAgASADNgIIIAAgAzYCDCADIAE2AgwgAyAANgIIDAcLIAAgAjYCACAAIAAoAgQgBGo2AgQgAiAFQQNyNgIEIAEgAiAFaiIDayEFIAFB/I7AACgCAEYNAyABQfiOwAAoAgBGDQQgASgCBCIEQQNxQQFGBEAgASAEQXhxIgAQBCAAIAVqIQUgACABaiIBKAIEIQQLIAEgBEF+cTYCBCADIAVBAXI2AgQgAyAFaiAFNgIAIAVBgAJPBEAgAyAFEAUMBgsgBUF4cUHgjMAAaiEAAn9B6I7AACgCACIBQQEgBUEDdnQiBHFFBEBB6I7AACABIARyNgIAIAAMAQsgACgCCAshBSAAIAM2AgggBSADNgIMIAMgADYCDCADIAU2AggMBQtB9I7AACAAIAVrIgE2AgBB/I7AAEH8jsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGohBAwGC0H4jsAAKAIAIQACQCABIAVrIgJBD00EQEH4jsAAQQA2AgBB8I7AAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0HwjsAAIAI2AgBB+I7AACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLDAgLIAAgBCAGajYCBEH8jsAAQfyOwAAoAgAiAEEPakF4cSIBQQhrIgI2AgBB9I7AAEH0jsAAKAIAIARqIgMgACABa2pBCGoiATYCACACIAFBAXI2AgQgACADakEoNgIEQYiPwABBgICAATYCAAwDC0H8jsAAIAM2AgBB9I7AAEH0jsAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEDAELQfiOwAAgAzYCAEHwjsAAQfCOwAAoAgAgBWoiADYCACADIABBAXI2AgQgACADaiAANgIACyACQQhqDwtBACEEQfSOwAAoAgAiACAFTQ0AQfSOwAAgACAFayIBNgIAQfyOwABB/I7AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBAwDCyAEDwsgACAHNgIYIAEoAhAiAgRAIAAgAjYCECACIAA2AhgLIAEoAhQiAkUNACAAIAI2AhQgAiAANgIYCwJAIARBEE8EQCABIAVBA3I2AgQgASAFaiICIARBAXI2AgQgAiAEaiAENgIAIARBgAJPBEAgAiAEEAUMAgsgBEF4cUHgjMAAaiEAAn9B6I7AACgCACIDQQEgBEEDdnQiBHFFBEBB6I7AACADIARyNgIAIAAMAQsgACgCCAshBCAAIAI2AgggBCACNgIMIAIgADYCDCACIAQ2AggMAQsgASAEIAVqIgBBA3I2AgQgACABaiIAIAAoAgRBAXI2AgQLIAFBCGoPCyAAQQhqC4MFAQF/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcILQkKCwwNLS0tLS0tLS0tLS0tLS0tLS0tDg8tLS0QAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5CAQIDBAUGQwcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N0NDODkACwJAIABBgAprDgY8PT4/QEEACyAAQYAIaw4COTpCC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EJDwtBCg8LQQsPC0EMDwtBDQ8LQQ4PC0GBAg8LQYICDwtBgwIPC0GEAg8LQYUCDwtBhgIPC0GHAg8LQYgCDwtBiQIPC0GKAg8LQYAEDwtBgQQPC0GCBA8LQYMEDwtBhAQPC0GFBA8LQYYEDwtBhwQPC0GJBA8LQYoEDwtBiwQPC0GMBA8LQY0EDwtBoAQPC0GhBA8LQaUEDwtBwAQPC0HBBA8LQcIEDwtBwwQPC0HEBA8LQcUEDwtBxgQPC0HHBA8LQcgEDwtByQQPC0HKBA8LQcsEDwtBgAYPC0GBBg8LQYIGDwtBgwYPC0GEBg8LQYcGDwtBiAYPC0GACA8LQYEIDwtBgAoPC0GBCg8LQYIKDwtBgwoPC0GECg8LQYUKIQELIAEPC0HggsAAQRkQ2gEAC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB+I7AACgCAEYEQCACKAIEQQNxQQNHDQFB8I7AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAECwJAAkACQCACKAIEIgNBAnFFBEAgAkH8jsAAKAIARg0CIAJB+I7AACgCAEYNAyACIANBeHEiAhAEIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfiOwAAoAgBHDQFB8I7AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAUPCyABQXhxQeCMwABqIQICf0HojsAAKAIAIgNBASABQQN2dCIBcUUEQEHojsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfyOwAAgADYCAEH0jsAAQfSOwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEH4jsAAKAIARw0BQfCOwABBADYCAEH4jsAAQQA2AgAPC0H4jsAAIAA2AgBB8I7AAEHwjsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdCLwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeyOwABB7I7AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB6I7AAEHojsAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdCLwABqIQRBASACdCIDQeyOwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHsjsAAQeyOwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDSASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ1QEiAg0CCwALENkBAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBWIABBBDYCBCAAIAI2AgALiwEBAn8gABDSASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/ENoBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQGQsLdQIBfwF+IAEQ0gEgAUEIayICKAIAQQFGBEAgATUCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQgGDPAAAIAAgA6dBCHZBAXE6AAEPC0H5gsAAQT8Q2gEAC3cBAn8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCIALwAAIABBAmotAABBEHRyEN4BIQIgASgCCCABKAIMEM0BQRBBBBDIASIAIAJBCHZBgB5xIAJBGHZyOwEMIABBADYCCCAAQoGAgIAQNwIAIAFBEGokACAAQQhqC2wBAn8gABDSASAAQQhrIgEgASgCAEEBaiICNgIAAkAgAgRAIAAoAgBBf0YNASAALwAEIABBBmotAABBEHRyEN4BIQAgARBeIABBCHZBgP4DcSAAQRh2ciAAQYD+A3FBCHRyEGcPCwALENkBAAtvAQJ/IAEQ0gEgAUEIayICKAIAQQFGBEAgASgCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQQh2OgABIAAgA0EBcToAAA8LQfmCwABBPxDaAQALawEBfyAAENIBIABBCGshAgJAIAFFBEAgAigCAEEBRw0BIAAoAgQgAkEANgIAAkAgAkF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAJBEBAZCxDdAQ8LIAIQVg8LQfmCwABBPxDaAQALYQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gEhACABKAIIIAEoAgwQzQEgAEEIdkGA/gNxIABBGHZyIABBgAZxQQh0chBnIAFBEGokAAtqAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQQI2AhQgAUH0gMAANgIQIAFCATcCHCABQQE2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQVwALIAFBMGokACAAC2sBAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQQI2AhQgAUG4gcAANgIQIAFCATcCHCABQQI2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQVwALIAFBMGokACAAC2MBAn8jAEEQayICJAACQCABRQRAIAJBCGogABALDAELIAAQ0gEgAEEIayIBIAEoAgBBAWsiAzYCACADDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLIAJBEGokAAtjAQJ/IwBBEGsiAiQAAkAgAUUEQCACQQhqIAAQCAwBCyAAENIBIABBCGsiASABKAIAQQFrIgM2AgAgAw0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCyACQRBqJAALXgEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gEhACABKAIIIAEoAgwQzQEgAEEIdkGA4ANxIABBgAZxQQh0ckEMdhBoIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ+AELFgAgAEHQgsAAQcCCwABBgICACBD4AQtgAQF/IAAQGyECIAEQHiEAQRBBBBDIASIBQoGAgIAQNwIAIAEgAEEQdEGAgPwHcSAAIAJB/wFxQRJ0ciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnKtQiCGNwIIIAFBCGoLXAECfyAAENIBIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZC0EBcQ8LQfmCwABBPxDaAQALYAEBfyAAENIBIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEUEBkPC0H5gsAAQT8Q2gEACyACEF8LC2ABAX8gABDSASAAQQhrIQICQCABRQRAIAIoAgBBAUYEQCACQQA2AgAgAkF/Rg0CIABBBGsiACAAKAIAQQFrIgA2AgAgAA0CIAJBEBAZDwtB+YLAAEE/ENoBAAsgAhBeCwvQBgEEfwJAIABBBGsoAgAiBCICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgAEEIayIBIAQiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB+I7AACgCAEYEQCACKAIEQQNxQQNHDQFB8I7AACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADAILIAEgAxAECwJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfyOwAAoAgBGDQIgAkH4jsAAKAIARg0EIAIgA0F4cSICEAQgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB+I7AACgCAEcNAUHwjsAAIAA2AgAMBQsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQEgASAAEAVBACEBQZCPwABBkI/AACgCAEEBayIANgIAIAANA0HYjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQZCPwABB/x8gASABQf8fTRs2AgAMAwtB/I7AACABNgIAQfSOwABB9I7AACgCACAAaiIANgIAIAEgAEEBcjYCBEH4jsAAKAIAIAFGBEBB8I7AAEEANgIAQfiOwABBADYCAAsgAEGIj8AAKAIAIgNNDQJB/I7AACgCACICRQ0CQQAhAQJAQfSOwAAoAgAiBEEpSQ0AQdCMwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HYjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQZCPwABB/x8gASABQf8fTRs2AgAgAyAETw0CQYiPwABBfzYCAAwCCyAAQXhxQeCMwABqIQICf0HojsAAKAIAIgNBASAAQQN2dCIAcUUEQEHojsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCAwBC0H4jsAAIAE2AgBB8I7AAEHwjsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAsPC0GxicAAQS5B4InAABBKAAtB8InAAEEuQaCKwAAQSgALVQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gEhACABKAIIIAEoAgwQzQEgAEEOdkE8cSAAQR52chBoIAFBEGokAAtZAQJ/IAAQ0gEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENoBAAtZAQJ/IAEQ0gEgAUEIayIDIAMoAgBBAWoiAjYCAAJAIAIEQCABKAIAIgJBf0YNASAAIAM2AgggACABNgIEIAAgAUEEajYCACABIAJBAWo2AgAPCwALENkBAAtZAQJ/IAAQ0gEgAEEIayIBKAIAQQFGBEAgAC8BBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENoBAAtZAQJ/IAAQ0gEgAEEIayIBKAIAQQFGBEAgACgCBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENoBAAtRAQJ/AkAgABAbIgBBGHENACAAQQdxIgJBB0YNAEEQQQQQyAEiAUKBgICAEDcCACABIABBBXZBAXGtQiCGIAKtQiiGhDcCCCABQQhqIQELIAELVwEBfyAAEBshAiABEBshAUEQQQQQyAEiAEKBgICAEDcCACAAIAFB/wFxQQx0IAJBEnRyIgFBgOADcUEIdCABQQh2QYD+A3FyQQh2rUIghjcCCCAAQQhqC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENIBIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ1gEgARBeEGgPCwALENkBAAtOAQF/IAFFBEAgABAWGg8LIAAQ0gEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLEAAgACABIAIgA0HeABD5AQsQACAAIAEgAiADQd8AEPkBCxAAIAAgASACIANB4AAQ+QELEAAgACABIAIgA0HhABD5AQsQACAAIAEgAiADQeIAEPoBCxAAIAAgASACIANB4wAQ+gELTgEBfyABRQRAIAAQGxoPCyAAENIBIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLC04BAX8gAUUEQCAAEB0aDwsgABDSASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCwtOAQF/IAFFBEAgABAeGg8LIAAQ0gEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLDwAgACABQYCAgMgBEPsBCwwAIAAgAUHLABD8AQsMACAAIAFBzAAQ/AELDAAgACABQc0AEPwBCwwAIAAgAUHOABD8AQsMACAAIAFBzwAQ/AELDAAgACABQdAAEPwBCw8AIAAgAUGAgIDoBhD7AQtFAQF/IwBBEGsiASQAIAFBBGogABAcIAEoAgQiAC8AACAAQQJqLQAAQRB0chDWASABKAIIIAEoAgwQzQEQaCABQRBqJAALSwEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3gFBGHZBP3EgASgCCCABKAIMEM0BEGggAUEQaiQAC04BAX8gABAeIQBBEEEEEMgBIgFCgYCAgBA3AgAgASAAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2cq1CIIY3AgggAUEIagsLACAAIAFBBxD9AQsLACAAIAFBCBD9AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCyAELQAIIAQtAAkQygEQYiAEQRBqJAALOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCCAELQAIIAQtAAkQiwEQYiAEQRBqJAALCwAgACABQQoQ/gELCwAgACABQQwQ/gELCwAgACABQRQQ/gELCwAgACABQRYQ/gELCwAgACABQRsQ/gELCwAgACABQR4Q/gELCwAgACABQR8Q/gELCwAgACABQSQQ/gELCwAgACABQTIQ/gELPgAgABAbIQAgARAeIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEGILOAAgAkEQdEGAgPwHcSABQf8BcUEMdCIBIAJyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILPAECfyMAQRBrIgEkACAAENIBIAFBCGogABBdIAEoAggtAAEgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzwBAn8jAEEQayIBJAAgABDSASABQQhqIAAQXSABKAIILQAAIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAtBAQF/IwBBIGsiAyQAIANBADYCECADQQE2AgQgA0IENwIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBXAAs5AQF/IwBBEGsiAiQAIAAQ0gEgAkEIaiAAEGEgAigCDCACKAIIIAFBAEc6AABBADYCACACQRBqJAALOQEBfyMAQRBrIgIkACAAENIBIAJBCGogABBhIAIoAgwgAigCCCABQQBHOgABQQA2AgAgAkEQaiQAC0MBAX8gAEE9TwRAQeCCwABBGRDaAQALQRRBBBDIASICIAA6ABAgAiABNgIMIAJBADYCCCACQoGAgIAQNwIAIAJBCGoLCgAgAEHVABD/AQsKACAAQdYAEP8BCwoAIABB1wAQ/wELCgAgAEHaABD/AQsKACAAQdsAEP8BCwoAIABB3AAQ/wELCgAgAEHdABD/AQs+ACAAEBsgARAbIAIQGyADEBsQISEBQRBBBBDIASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags7AQF/IAAgACgCAEEBayIBNgIAAkAgAQ0AIAAoAgwQ3QEgACAAKAIEQQFrIgE2AgQgAQ0AIABBEBAZCwvIAQEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbCHwAA2AhAgAkEBNgIMIAJBDGoiACgCCCIBRQRAQYSHwABBK0HMisAAEEoACyABKAIMGiABKAIEGiAALQAQIQEgAC0AERpBzIvAAEHMi8AAKAIAIgBBAWo2AgACQCAAQQBIDQBBmI/AAC0AAEEBcQ0AQZSPwABBlI/AACgCAEEBajYCAEHIi8AAKAIAQQBIDQBBmI/AAEEAOgAAIAFFDQAACwALLwEBfyMAQRBrIgEkACABQQhqIAAQCyABLQAJQSBBACABLQAIG3IQaCABQRBqJAALOgAgABAbIAEQGyACEBsQOiEBQRBBBBDIASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags6ACAAEBsgARAbIAIQHRBHIQFBEEEEEMgBIgBCgYCAgBA3AgAgACABrUL///8Hg0IghjcCCCAAQQhqCzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBC0ABCABKAIIIAEoAgwQzgEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCgCACABKAIIIAEoAgwQzgEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDZAQALCQAgAEEQEPIBCwkAIABBFBDyAQszAQF/IAAQGyEBQRBBBBDIASIAQoGAgIAQNwIAIAAgAUECdEH8AXGtQiCGNwIIIABBCGoLKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENkBAAssAQF/QRBBBBDIASIBQoGAgIAQNwIAIAEgAK1C////B4NCIIY3AgggAUEIagskACAAENIBIAAoAgAEQBDZAQALIABBADYCACAAIAFBAEc6AAQLKAAgAxAWIQMgABDJASABEMkBIAIQyQEgAxDQAUEIdEHkAHIQ0wEQZwsoACADEBYhAyAAEMkBIAEQyQEgAhDJASADENABQQh0QeUAchDTARBnCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ2gEACykBAX9BEEEEEMgBIgEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCykBAX9BEEEEEMgBIgEgADoADCABQQA2AgggAUKBgICAEDcCACABQQhqCyIAIAIQAiECIAAQyQEgARDJASACEEdBCHRBygByENMBEGcLDwAgACABIAIgA0ESEPMBCw8AIAAgASACIANBGBDzAQsPACAAIAEgAiADQRwQ8wELDwAgACABIAIgA0EdEPMBCw8AIAAgASACIANBIRD0AQsPACAAIAEgAiADQSIQ8wELDwAgACABIAIgA0EjEPMBCw8AIAAgASACIANBKBDzAQsPACAAIAEgAiADQSoQ8wELDwAgACABIAIgA0EsEPMBCw8AIAAgASACIANBLxDzAQsPACAAIAEgAiADQTgQ8wELEAAgACABIAIgA0HTABD0AQsQACAAIAEgAiADQdQAEPQBCxAAIAAgASACIANB3gAQ9AELEAAgACABIAIgA0HfABD0AQsQACAAIAEgAiADQeAAEPQBCxAAIAAgASACIANB4QAQ9AELEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBCxAAIAAgASACIANB5AAQ9AELEAAgACABIAIgA0HlABD0AQsQACAAIAEgAiADQeYAEPMBCxAAIAAgASACIANB5wAQ8wELEAAgACABIAIgA0HoABDzAQsQACAAIAEgAiADQekAEPMBCxAAIAAgASACIANB6gAQ8wELEAAgACABIAIgA0HrABDzAQsQACAAIAEgAiADQewAEPMBCxAAIAAgASACIANB7gAQ8wELEAAgACABIAIgA0HvABDzAQsQACAAIAEgAiADQfAAEPMBCx4AIAEQZiEBIAAQyQEgARDGAUEIdEHMAHIQ0wEQZwsZACAAIAEgAkEgQQAgBBtBEEEAIAMbchAhCw0AIAAgASACQQEQ9QELDQAgACABIAJBAhD1AQsNACAAIAEgAkEDEPUBCw0AIAAgASACQQQQ9QELDQAgACABIAJBBRD1AQsNACAAIAEgAkEGEPUBCw0AIAAgASACQQcQ9QELDQAgACABIAJBCBD1AQsNACAAIAEgAkEJEPUBCw0AIAAgASACQQsQ9QELDQAgACABIAJBDRD1AQsNACAAIAEgAkEOEPUBCw0AIAAgASACQQ8Q9QELDQAgACABIAJBEBD1AQsNACAAIAEgAkEREPUBCw0AIAAgASACQRcQ9QELDQAgACABIAJBJhD1AQsNACAAIAEgAkEnEPUBCw0AIAAgASACQSkQ9QELDQAgACABIAJBKxD1AQsNACAAIAEgAkEtEPUBCw0AIAAgASACQS4Q9QELDQAgACABIAJBMBD1AQsNACAAIAEgAkExEPUBCw0AIAAgASACQTUQ9QELDQAgACABIAJBNxD1AQsNACAAIAEgAkE5EPYBCw0AIAAgASACQToQ9gELDQAgACABIAJBOxD2AQsNACAAIAEgAkE8EPYBCw0AIAAgASACQT0Q9gELDQAgACABIAJBPhD2AQsNACAAIAEgAkE/EPYBCw4AIAAgASACQcAAEPYBCw4AIAAgASACQcEAEPYBCw4AIAAgASACQcIAEPYBCw4AIAAgASACQcMAEPYBCw4AIAAgASACQcQAEPYBCw4AIAAgASACQcUAEPYBCw4AIAAgASACQcYAEPYBCw4AIAAgASACQccAEPYBCw4AIAAgASACQcgAEPYBCw4AIAAgASACQckAEPYBCw4AIAAgASACQcoAEPYBCw4AIAAgASACQdEAEPYBCw4AIAAgASACQdIAEPYBCxcBAX8gAEH/AXFBP00EfyAAEGgFQQALCxsAIAAQ0gEgACgCAEF/RgRAENkBAAsgAC0ABAsJACAAQRMQ9wELCQAgAEEVEPcBCwkAIABBGhD3AQsJACAAQSAQ9wELCQAgAEElEPcBCyIBAX9BEEEEEMgBIgBCADcCCCAAQoGAgIAQNwIAIABBCGoLCQAgAEE0EPcBCwkAIABBNhD3AQsKACAAQdgAEPcBCwoAIABB2QAQ9wELFwAgAUEQdEGAgPwDcSAAQQJ0QfwBcXILGwAgABDJASABEMkBIAIQyQEQOkEIdBDTARBnCxIAIAEgABDVASIABEAgAA8LAAt1AQF/IABB/wFxQcAATwRAIwBBEGsiASQAIAFBIjYCDCABQYCAwAA2AggjAEEgayIAJAAgAEEBNgIEIABB/IbAADYCACAAQgE3AgwgACABQQhqrUKAgICAwACENwMYIAAgAEEYajYCCCAAQbiAwAAQVwALIAALFAAgACABIAJBIEEAIAMbIARyECELFwAgABAbIAEQGyACEBsgAxAWENABEGILFgAgABAbIAEQGyACEBsgAxAbECEQYgsTACAAIAAoAgBBAWs2AgAgARBeCxMAIAAgACgCAEEBazYCACABEF8LEgAgABAbIAEQGyACEAIQRxBiCxEAIAAgASACQSBBACADGxAhCxIAIAAQGyABEBsgAhAdEEcQYgsTACAABEAPC0HcisAAQRsQ2gEACxQBAX9BBEEBEMgBIgEgADYAACABCw0AIAEEQCAAIAEQGQsLgQMBBX9BmY/AAC0AABoCfyAAQQlPBEACQEHN/3tBECAAIABBEE0bIgBrIAFNDQAgAEEQIAFBC2pBeHEgAUELSRsiBGpBDGoQASICRQ0AIAJBCGshAQJAIABBAWsiAyACcUUEQCABIQAMAQsgAkEEayIFKAIAIgZBeHEgAiADakEAIABrcUEIayICIABBACACIAFrQRBNG2oiACABayICayEDIAZBA3EEQCAAIAMgACgCBEEBcXJBAnI2AgQgACADaiIDIAMoAgRBAXI2AgQgBSACIAUoAgBBAXFyQQJyNgIAIAEgAmoiAyADKAIEQQFyNgIEIAEgAhADDAELIAEoAgAhASAAIAM2AgQgACABIAJqNgIACwJAIAAoAgQiAUEDcUUNACABQXhxIgIgBEEQak0NACAAIAQgAUEBcXJBAnI2AgQgACAEaiIBIAIgBGsiBEEDcjYCBCAAIAJqIgIgAigCBEEBcjYCBCABIAQQAwsgAEEIaiEDCyADDAELIAEQAQsLDQAgABDeAUEKdkE/cQsPACAAEBsgARBmEMYBEGILCwAgACMAaiQAIwALDgBB94rAAEHPABDaAQALCQAgACABEAAACwkAIABBP3EQaAsKACAAEBtB/wFxCwgAIABBBBAZCwcAIABBCHQLCQBBMxDTARBnCwYAQQsQaAsGAEEKEGgLBgBBCBBoCwYAQQ8QaAsGAEEGEGgLBgBBCRBoCwYAQQcQaAsGAEEMEGgLBgBBAhBoCwYAQQEQaAsGAEEDEGgLBgBBDRBoCwYAQQ4QaAsGAEEFEGgLBgBBBBBoCwYAQRAQaAsGAEEAEGgLBABBBAszAQF/IAAgACgCAEEBayICNgIAAkAgAg0AIAAgACgCBEEBayICNgIEIAINACAAIAEQGQsLIwAgABDJASABEMkBIAIQyQEgAxDJARAhQQh0IARyENMBEGcLIgAgABDJASABEMkBIAIQyQEgAxAOECFBCHQgBHIQ0wEQZwseACAAEMkBIAEQyQEgAhDJARA6QQh0IANyENMBEGcLHQAgABDJASABEMkBIAIQDxBHQQh0IANyENMBEGcLGgAgABDJARogAEEKdEGA+ANxIAFyENMBEGcLXwEBfyMAQTBrIgQkACAEIAA2AgwgACADTwRAIARBAjYCFCAEIAI2AhAgBEIBNwIcIARBAzYCLCAEIARBKGo2AhggBCAEQQxqNgIoIARBEGogARBXAAsgBEEwaiQAIAALTAECfyMAQRBrIgUkACAFQQhqIAMQCyAFLQAJIQMgBS0ACCEGIAAQyQEgARDJASACEMkBIAYgAxDKAUEIdCAEchDTARBnIAVBEGokAAtMAQJ/IwBBEGsiBSQAIAVBCGogAxAIIAUtAAkhAyAFLQAIIQYgABDJASABEMkBIAIQyQEgBiADEIsBQQh0IARyENMBEGcgBUEQaiQAC0kAIAAQyQEaIAEQyQEaIABBEnRBgIDwF3EiACABQQx0QYDgP3FyIgFBgOADcUEIdCABQQh2QYD+A3EgACACckEYdnJyENMBEGcLSQAgABDJARogARATIgFBEHRBgID8B3EgAEESdEGAgPAfcSABciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnJBCHQgAnIQ0wEQZwtJAQF/IwBBEGsiAyQAIAAQ0gEgASACTwRAQeCCwABBGRDaAQALIANBCGogABBhIAMoAgwgAygCCCABOgABQQA2AgAgA0EQaiQAC0EAIAAQyQEaIAEQyQEaIABBEnRBgIDwB3EgAUEMdEGA4D9xciIAQQh2QYD+A3EgAEGA4ANxQQh0ciACchDTARBnCzUAIAAQFCIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDTARBnCwvQCwEAQYCAwAALxgtDaGVja1JlZ0lkIHdhcyBnaXZlbiBpbnZhbGlkIFJlZ0lkZnVlbC1hc20vc3JjL2xpYi5ycwAAACIAEAATAAAAbgAAACIAAABWYWx1ZSBgYCBvdXQgb2YgcmFuZ2UgZm9yIDYtYml0IGltbWVkaWF0ZQAAAEgAEAAHAAAATwAQACIAAAAiABAAEwAAALMDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDEyLWJpdCBpbW1lZGlhdGUASAAQAAcAAACUABAAIwAAACIAEAATAAAAuAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMTgtYml0IGltbWVkaWF0ZQBIABAABwAAANgAEAAjAAAAIgAQABMAAAC9AwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAyNC1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAHAEQACMAAAAiABAAEwAAAMIDAAAcAAAAaW52YWxpZCBlbnVtIHZhbHVlIHBhc3NlZGF0dGVtcHRlZCB0byB0YWtlIG93bmVyc2hpcCBvZiBSdXN0IHZhbHVlIHdoaWxlIGl0IHdhcyBib3Jyb3dlZBAAAAARAAAAEgAAABMAAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAABwAAAAdAAAAHgAAAB8AAAAgAAAAIQAAACIAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAwAAAAMQAAADIAAAAzAAAANAAAADUAAAA2AAAANwAAADgAAAA5AAAAOgAAADsAAAA8AAAAPQAAAD4AAAA/AAAAQAAAAEEAAABCAAAAQwAAAEcAAABIAAAASQAAAEoAAABLAAAATAAAAFAAAABRAAAAUgAAAFMAAABUAAAAVQAAAFYAAABXAAAAWAAAAFkAAABaAAAAWwAAAFwAAABdAAAAXgAAAF8AAABgAAAAYQAAAHAAAABxAAAAcgAAAHMAAAB0AAAAdQAAAHYAAAB3AAAAeAAAAHkAAACQAAAAkQAAAJIAAACTAAAAlAAAAJUAAACWAAAAlwAAAJgAAACgAAAAoQAAAKIAAACjAAAApAAAAKUAAACmAAAApwAAAKgAAACpAAAAqgAAAKsAAACsAAAArQAAALAAAAC6AAAAuwAAALwAAAC+AAAAAQAAAAAAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACIBBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAiAQQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9wYW5pY2tpbmcucnMwBRAAHAAAAIsCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMy4zDHdhc20tYmluZGdlbgYwLjIuOTk=", e);
}
async function yi() {
  return await ml(EI());
}
yi();
const yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: by,
  ADDI: Iy,
  ALOC: Ey,
  AND: vy,
  ANDI: Cy,
  BAL: By,
  BHEI: xy,
  BHSH: Ry,
  BLDD: Sy,
  BSIZ: Ty,
  BURN: Ny,
  CALL: Dy,
  CB: Fy,
  CCP: Qy,
  CFE: Oy,
  CFEI: My,
  CFS: Ly,
  CFSI: Py,
  CROO: ky,
  CSIZ: zy,
  CompareArgs: Qr,
  CompareMode: gy,
  DIV: Gy,
  DIVI: Uy,
  DivArgs: as,
  ECAL: Yy,
  ECK1: Hy,
  ECOP: Xy,
  ECR1: Zy,
  ED19: Wy,
  EPAR: jy,
  EQ: Jy,
  EXP: qy,
  EXPI: $y,
  FLAG: Ky,
  GM: qs,
  GMArgs: wy,
  GT: tb,
  GTF: $s,
  GTFArgs: pl,
  Imm06: Nt,
  Imm12: _t,
  Imm18: Se,
  Imm24: Ie,
  Instruction: V,
  JI: eb,
  JMP: rb,
  JMPB: nb,
  JMPF: sb,
  JNE: ib,
  JNEB: ab,
  JNEF: ob,
  JNEI: cb,
  JNZB: db,
  JNZF: ub,
  JNZI: _b,
  K256: hb,
  LB: lb,
  LDC: fb,
  LOG: Ab,
  LOGD: pb,
  LT: gb,
  LW: wb,
  MCL: mb,
  MCLI: yb,
  MCP: bb,
  MCPI: Ib,
  MEQ: Eb,
  MINT: vb,
  MLDV: Cb,
  MLOG: Bb,
  MOD: xb,
  MODI: Rb,
  MOVE: Sb,
  MOVI: Tb,
  MROO: Nb,
  MUL: Db,
  MULI: Fb,
  MathArgs: os,
  MathOp: my,
  MulArgs: cs,
  NOOP: Mb,
  NOT: Lb,
  OR: Pb,
  ORI: kb,
  POPH: zb,
  POPL: Gb,
  PSHH: Ub,
  PSHL: Vb,
  PanicInstruction: Yb,
  PanicReason: yy,
  RET: Hb,
  RETD: Xb,
  RVRT: Zb,
  RegId: h,
  S256: Wb,
  SB: jb,
  SCWQ: Jb,
  SLL: qb,
  SLLI: $b,
  SMO: Kb,
  SRL: tI,
  SRLI: eI,
  SRW: rI,
  SRWQ: nI,
  SUB: sI,
  SUBI: iI,
  SW: aI,
  SWW: oI,
  SWWQ: cI,
  TIME: dI,
  TR: uI,
  TRO: _I,
  WDAM: hI,
  WDCM: Ks,
  WDDV: ti,
  WDMD: lI,
  WDML: ei,
  WDMM: fI,
  WDOP: ri,
  WQAM: AI,
  WQCM: ni,
  WQDV: si,
  WQMD: pI,
  WQML: ii,
  WQMM: gI,
  WQOP: ai,
  XOR: wI,
  XORI: mI,
  add: B0,
  addi: er,
  aloc: Y0,
  and: x0,
  andi: Im,
  bal: mm,
  bhei: j0,
  bhsh: W0,
  bldd: ly,
  bsiz: Js,
  burn: J0,
  call: Xa,
  cb: tm,
  ccp: q0,
  cfe: Xm,
  cfei: Ym,
  cfs: Zm,
  cfsi: Hm,
  croo: $0,
  csiz: K0,
  div: R0,
  divi: js,
  ecal: hy,
  eck1: _m,
  ecop: fy,
  ecr1: hm,
  ed19: lm,
  epar: Ay,
  eq: S0,
  exp: T0,
  expi: Em,
  flag: wm,
  gm: Mm,
  gm_args: p0,
  gt: N0,
  gtf: fl,
  gtf_args: g0,
  initSync: bI,
  initWasm: yi,
  ji: Vm,
  jmp: Ws,
  jmpb: km,
  jmpf: Pm,
  jne: ym,
  jneb: Um,
  jnef: Gm,
  jnei: Tm,
  jnzb: Al,
  jnzf: zm,
  jnzi: Lm,
  k256: fm,
  lb: Nm,
  ldc: Yn,
  log: em,
  logd: rm,
  lt: D0,
  lw: Wn,
  mcl: H0,
  mcli: Om,
  mcp: X0,
  mcpi: Qm,
  meq: Z0,
  mint: nm,
  mldv: U0,
  mlog: F0,
  mod_: O0,
  modi: vm,
  move_: Hr,
  movi: un,
  mroo: Q0,
  mul: M0,
  muli: Cm,
  noop: gm,
  not: L0,
  or: P0,
  ori: Bm,
  poph: qm,
  popl: Jm,
  pshh: jm,
  pshl: Wm,
  ret: Fo,
  retd: V0,
  rvrt: sm,
  s256: Am,
  sb: Dm,
  scwq: im,
  sll: k0,
  slli: xm,
  smo: bm,
  srl: z0,
  srli: Rm,
  srw: am,
  srwq: om,
  sub: Zs,
  subi: ll,
  sw: Fm,
  sww: cm,
  swwq: dm,
  time: pm,
  tr: hl,
  tro: um,
  wdam: cy,
  wdcm: $m,
  wdcm_args: w0,
  wddv: sy,
  wddv_args: v0,
  wdmd: ay,
  wdml: ry,
  wdml_args: I0,
  wdmm: uy,
  wdop: ty,
  wdop_args: y0,
  wqam: dy,
  wqcm: Km,
  wqcm_args: m0,
  wqdv: iy,
  wqdv_args: C0,
  wqmd: oy,
  wqml: ny,
  wqml_args: E0,
  wqmm: _y,
  wqop: ey,
  wqop_args: b0,
  xor: G0,
  xori: Sm
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const bi = /* @__PURE__ */ BigInt(0), Ii = /* @__PURE__ */ BigInt(1), vI = /* @__PURE__ */ BigInt(2);
function $r(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function ds(e) {
  if (!$r(e))
    throw new Error("Uint8Array expected");
}
function mn(e, t) {
  if (typeof t != "boolean")
    throw new Error(e + " boolean expected, got " + t);
}
const CI = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function yn(e) {
  ds(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += CI[e[r]];
  return t;
}
function _n(e) {
  const t = e.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Qo(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return e === "" ? bi : BigInt("0x" + e);
}
const ur = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function n_(e) {
  if (e >= ur._0 && e <= ur._9)
    return e - ur._0;
  if (e >= ur.A && e <= ur.F)
    return e - (ur.A - 10);
  if (e >= ur.a && e <= ur.f)
    return e - (ur.a - 10);
}
function bn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, r = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(r);
  for (let s = 0, i = 0; s < r; s++, i += 2) {
    const a = n_(e.charCodeAt(i)), o = n_(e.charCodeAt(i + 1));
    if (a === void 0 || o === void 0) {
      const u = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + u + '" at index ' + i);
    }
    n[s] = a * 16 + o;
  }
  return n;
}
function Wr(e) {
  return Qo(yn(e));
}
function Oo(e) {
  return ds(e), Qo(yn(Uint8Array.from(e).reverse()));
}
function In(e, t) {
  return bn(e.toString(16).padStart(t * 2, "0"));
}
function Mo(e, t) {
  return In(e, t).reverse();
}
function BI(e) {
  return bn(_n(e));
}
function Xe(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = bn(t);
    } catch (i) {
      throw new Error(e + " must be hex string or Uint8Array, cause: " + i);
    }
  else if ($r(t))
    n = Uint8Array.from(t);
  else
    throw new Error(e + " must be hex string or Uint8Array");
  const s = n.length;
  if (typeof r == "number" && s !== r)
    throw new Error(e + " of length " + r + " expected, got " + s);
  return n;
}
function jn(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    ds(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
function xI(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function RI(e) {
  if (typeof e != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e));
}
const pa = (e) => typeof e == "bigint" && bi <= e;
function Ei(e, t, r) {
  return pa(e) && pa(t) && pa(r) && t <= e && e < r;
}
function jr(e, t, r, n) {
  if (!Ei(t, r, n))
    throw new Error("expected valid " + e + ": " + r + " <= n < " + n + ", got " + t);
}
function bl(e) {
  let t;
  for (t = 0; e > bi; e >>= Ii, t += 1)
    ;
  return t;
}
function SI(e, t) {
  return e >> BigInt(t) & Ii;
}
function TI(e, t, r) {
  return e | (r ? Ii : bi) << BigInt(t);
}
const Lo = (e) => (vI << BigInt(e - 1)) - Ii, ga = (e) => new Uint8Array(e), s_ = (e) => Uint8Array.from(e);
function Il(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = ga(e), s = ga(e), i = 0;
  const a = () => {
    n.fill(1), s.fill(0), i = 0;
  }, o = (...m) => r(s, n, ...m), u = (m = ga()) => {
    s = o(s_([0]), m), n = o(), m.length !== 0 && (s = o(s_([1]), m), n = o());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let m = 0;
    const I = [];
    for (; m < t; ) {
      n = o();
      const S = n.slice();
      I.push(S), m += n.length;
    }
    return jn(...I);
  };
  return (m, I) => {
    a(), u(m);
    let S;
    for (; !(S = I(f())); )
      u();
    return a(), S;
  };
}
const NI = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || $r(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function us(e, t, r = {}) {
  const n = (s, i, a) => {
    const o = NI[i];
    if (typeof o != "function")
      throw new Error("invalid validator function");
    const u = e[s];
    if (!(a && u === void 0) && !o(u, e))
      throw new Error("param " + String(s) + " is invalid. Expected " + i + ", got " + u);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(r))
    n(s, i, !0);
  return e;
}
const DI = () => {
  throw new Error("not implemented");
};
function Za(e) {
  const t = /* @__PURE__ */ new WeakMap();
  return (r, ...n) => {
    const s = t.get(r);
    if (s !== void 0)
      return s;
    const i = e(r, ...n);
    return t.set(r, i), i;
  };
}
const FI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: jr,
  abool: mn,
  abytes: ds,
  bitGet: SI,
  bitLen: bl,
  bitMask: Lo,
  bitSet: TI,
  bytesToHex: yn,
  bytesToNumberBE: Wr,
  bytesToNumberLE: Oo,
  concatBytes: jn,
  createHmacDrbg: Il,
  ensureBytes: Xe,
  equalBytes: xI,
  hexToBytes: bn,
  hexToNumber: Qo,
  inRange: Ei,
  isBytes: $r,
  memoized: Za,
  notImplemented: DI,
  numberToBytesBE: In,
  numberToBytesLE: Mo,
  numberToHexUnpadded: _n,
  numberToVarBytesBE: BI,
  utf8ToBytes: RI,
  validateObject: us
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ye = BigInt(0), Lt = BigInt(1), Ur = /* @__PURE__ */ BigInt(2), QI = /* @__PURE__ */ BigInt(3), Wa = /* @__PURE__ */ BigInt(4), i_ = /* @__PURE__ */ BigInt(5), a_ = /* @__PURE__ */ BigInt(8);
function Ne(e, t) {
  const r = e % t;
  return r >= ye ? r : t + r;
}
function OI(e, t, r) {
  if (t < ye)
    throw new Error("invalid exponent, negatives unsupported");
  if (r <= ye)
    throw new Error("invalid modulus");
  if (r === Lt)
    return ye;
  let n = Lt;
  for (; t > ye; )
    t & Lt && (n = n * e % r), e = e * e % r, t >>= Lt;
  return n;
}
function Le(e, t, r) {
  let n = e;
  for (; t-- > ye; )
    n *= n, n %= r;
  return n;
}
function ja(e, t) {
  if (e === ye)
    throw new Error("invert: expected non-zero number");
  if (t <= ye)
    throw new Error("invert: expected positive modulus, got " + t);
  let r = Ne(e, t), n = t, s = ye, i = Lt;
  for (; r !== ye; ) {
    const o = n / r, u = n % r, f = s - i * o;
    n = r, r = u, s = i, i = f;
  }
  if (n !== Lt)
    throw new Error("invert: does not exist");
  return Ne(s, t);
}
function MI(e) {
  const t = (e - Lt) / Ur;
  let r, n, s;
  for (r = e - Lt, n = 0; r % Ur === ye; r /= Ur, n++)
    ;
  for (s = Ur; s < e && OI(s, t, e) !== e - Lt; s++)
    if (s > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const a = (e + Lt) / Wa;
    return function(u, f) {
      const p = u.pow(f, a);
      if (!u.eql(u.sqr(p), f))
        throw new Error("Cannot find square root");
      return p;
    };
  }
  const i = (r + Lt) / Ur;
  return function(o, u) {
    if (o.pow(u, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let f = n, p = o.pow(o.mul(o.ONE, s), r), m = o.pow(u, i), I = o.pow(u, r);
    for (; !o.eql(I, o.ONE); ) {
      if (o.eql(I, o.ZERO))
        return o.ZERO;
      let S = 1;
      for (let R = o.sqr(I); S < f && !o.eql(R, o.ONE); S++)
        R = o.sqr(R);
      const F = o.pow(p, Lt << BigInt(f - S - 1));
      p = o.sqr(F), m = o.mul(m, F), I = o.mul(I, p), f = S;
    }
    return m;
  };
}
function LI(e) {
  if (e % Wa === QI) {
    const t = (e + Lt) / Wa;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % a_ === i_) {
    const t = (e - i_) / a_;
    return function(n, s) {
      const i = n.mul(s, Ur), a = n.pow(i, t), o = n.mul(s, a), u = n.mul(n.mul(o, Ur), a), f = n.mul(o, n.sub(u, n.ONE));
      if (!n.eql(n.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return MI(e);
}
const PI = [
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
function kI(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = PI.reduce((n, s) => (n[s] = "function", n), t);
  return us(e, r);
}
function zI(e, t, r) {
  if (r < ye)
    throw new Error("invalid exponent, negatives unsupported");
  if (r === ye)
    return e.ONE;
  if (r === Lt)
    return t;
  let n = e.ONE, s = t;
  for (; r > ye; )
    r & Lt && (n = e.mul(n, s)), s = e.sqr(s), r >>= Lt;
  return n;
}
function GI(e, t) {
  const r = new Array(t.length), n = t.reduce((i, a, o) => e.is0(a) ? i : (r[o] = i, e.mul(i, a)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, a, o) => e.is0(a) ? i : (r[o] = e.mul(i, r[o]), e.mul(i, a)), s), r;
}
function El(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function vl(e, t, r = !1, n = {}) {
  if (e <= ye)
    throw new Error("invalid field: expected ORDER > 0, got " + e);
  const { nBitLength: s, nByteLength: i } = El(e, t);
  if (i > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a;
  const o = Object.freeze({
    ORDER: e,
    isLE: r,
    BITS: s,
    BYTES: i,
    MASK: Lo(s),
    ZERO: ye,
    ONE: Lt,
    create: (u) => Ne(u, e),
    isValid: (u) => {
      if (typeof u != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof u);
      return ye <= u && u < e;
    },
    is0: (u) => u === ye,
    isOdd: (u) => (u & Lt) === Lt,
    neg: (u) => Ne(-u, e),
    eql: (u, f) => u === f,
    sqr: (u) => Ne(u * u, e),
    add: (u, f) => Ne(u + f, e),
    sub: (u, f) => Ne(u - f, e),
    mul: (u, f) => Ne(u * f, e),
    pow: (u, f) => zI(o, u, f),
    div: (u, f) => Ne(u * ja(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (u) => u * u,
    addN: (u, f) => u + f,
    subN: (u, f) => u - f,
    mulN: (u, f) => u * f,
    inv: (u) => ja(u, e),
    sqrt: n.sqrt || ((u) => (a || (a = LI(e)), a(o, u))),
    invertBatch: (u) => GI(o, u),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (u, f, p) => p ? f : u,
    toBytes: (u) => r ? Mo(u, i) : In(u, i),
    fromBytes: (u) => {
      if (u.length !== i)
        throw new Error("Field.fromBytes: expected " + i + " bytes, got " + u.length);
      return r ? Oo(u) : Wr(u);
    }
  });
  return Object.freeze(o);
}
function Cl(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Bl(e) {
  const t = Cl(e);
  return t + Math.ceil(t / 2);
}
function UI(e, t, r = !1) {
  const n = e.length, s = Cl(t), i = Bl(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + n);
  const a = r ? Oo(e) : Wr(e), o = Ne(a, t - Lt) + Lt;
  return r ? Mo(o, s) : In(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const o_ = BigInt(0), bs = BigInt(1);
function wa(e, t) {
  const r = t.negate();
  return e ? r : t;
}
function xl(e, t) {
  if (!Number.isSafeInteger(e) || e <= 0 || e > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function ma(e, t) {
  xl(e, t);
  const r = Math.ceil(t / e) + 1, n = 2 ** (e - 1);
  return { windows: r, windowSize: n };
}
function VI(e, t) {
  if (!Array.isArray(e))
    throw new Error("array expected");
  e.forEach((r, n) => {
    if (!(r instanceof t))
      throw new Error("invalid point at index " + n);
  });
}
function YI(e, t) {
  if (!Array.isArray(e))
    throw new Error("array of scalars expected");
  e.forEach((r, n) => {
    if (!t.isValid(r))
      throw new Error("invalid scalar at index " + n);
  });
}
const ya = /* @__PURE__ */ new WeakMap(), Rl = /* @__PURE__ */ new WeakMap();
function ba(e) {
  return Rl.get(e) || 1;
}
function HI(e, t) {
  return {
    constTimeNegate: wa,
    hasPrecomputes(r) {
      return ba(r) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(r, n, s = e.ZERO) {
      let i = r;
      for (; n > o_; )
        n & bs && (s = s.add(i)), i = i.double(), n >>= bs;
      return s;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(r, n) {
      const { windows: s, windowSize: i } = ma(n, t), a = [];
      let o = r, u = o;
      for (let f = 0; f < s; f++) {
        u = o, a.push(u);
        for (let p = 1; p < i; p++)
          u = u.add(o), a.push(u);
        o = u.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(r, n, s) {
      const { windows: i, windowSize: a } = ma(r, t);
      let o = e.ZERO, u = e.BASE;
      const f = BigInt(2 ** r - 1), p = 2 ** r, m = BigInt(r);
      for (let I = 0; I < i; I++) {
        const S = I * a;
        let F = Number(s & f);
        s >>= m, F > a && (F -= p, s += bs);
        const R = S, D = S + Math.abs(F) - 1, z = I % 2 !== 0, Y = F < 0;
        F === 0 ? u = u.add(wa(z, n[R])) : o = o.add(wa(Y, n[D]));
      }
      return { p: o, f: u };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(r, n, s, i = e.ZERO) {
      const { windows: a, windowSize: o } = ma(r, t), u = BigInt(2 ** r - 1), f = 2 ** r, p = BigInt(r);
      for (let m = 0; m < a; m++) {
        const I = m * o;
        if (s === o_)
          break;
        let S = Number(s & u);
        if (s >>= p, S > o && (S -= f, s += bs), S === 0)
          continue;
        let F = n[I + Math.abs(S) - 1];
        S < 0 && (F = F.negate()), i = i.add(F);
      }
      return i;
    },
    getPrecomputes(r, n, s) {
      let i = ya.get(n);
      return i || (i = this.precomputeWindow(n, r), r !== 1 && ya.set(n, s(i))), i;
    },
    wNAFCached(r, n, s) {
      const i = ba(r);
      return this.wNAF(i, this.getPrecomputes(i, r, s), n);
    },
    wNAFCachedUnsafe(r, n, s, i) {
      const a = ba(r);
      return a === 1 ? this.unsafeLadder(r, n, i) : this.wNAFUnsafe(a, this.getPrecomputes(a, r, s), n, i);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(r, n) {
      xl(n, t), Rl.set(r, n), ya.delete(r);
    }
  };
}
function XI(e, t, r, n) {
  if (VI(r, e), YI(n, t), r.length !== n.length)
    throw new Error("arrays of points and scalars must have equal length");
  const s = e.ZERO, i = bl(BigInt(r.length)), a = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, o = (1 << a) - 1, u = new Array(o + 1).fill(s), f = Math.floor((t.BITS - 1) / a) * a;
  let p = s;
  for (let m = f; m >= 0; m -= a) {
    u.fill(s);
    for (let S = 0; S < n.length; S++) {
      const F = n[S], R = Number(F >> BigInt(m) & BigInt(o));
      u[R] = u[R].add(r[S]);
    }
    let I = s;
    for (let S = u.length - 1, F = s; S > 0; S--)
      F = F.add(u[S]), I = I.add(F);
    if (p = p.add(I), m !== 0)
      for (let S = 0; S < a; S++)
        p = p.double();
  }
  return p;
}
function Sl(e) {
  return kI(e.Fp), us(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...El(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function c_(e) {
  e.lowS !== void 0 && mn("lowS", e.lowS), e.prehash !== void 0 && mn("prehash", e.prehash);
}
function ZI(e) {
  const t = Sl(e);
  us(t, {
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
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof r != "object" || typeof r.beta != "bigint" || typeof r.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: WI, hexToBytes: jI } = FI;
class JI extends Error {
  constructor(t = "") {
    super(t);
  }
}
const fr = {
  // asn.1 DER encoding utils
  Err: JI,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (e, t) => {
      const { Err: r } = fr;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new r("tlv.encode: unpadded data");
      const n = t.length / 2, s = _n(n);
      if (s.length / 2 & 128)
        throw new r("tlv.encode: long form length too big");
      const i = n > 127 ? _n(s.length / 2 | 128) : "";
      return _n(e) + i + s + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(e, t) {
      const { Err: r } = fr;
      let n = 0;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== e)
        throw new r("tlv.decode: wrong tlv");
      const s = t[n++], i = !!(s & 128);
      let a = 0;
      if (!i)
        a = s;
      else {
        const u = s & 127;
        if (!u)
          throw new r("tlv.decode(long): indefinite length not supported");
        if (u > 4)
          throw new r("tlv.decode(long): byte length is too big");
        const f = t.subarray(n, n + u);
        if (f.length !== u)
          throw new r("tlv.decode: length bytes not complete");
        if (f[0] === 0)
          throw new r("tlv.decode(long): zero leftmost byte");
        for (const p of f)
          a = a << 8 | p;
        if (n += u, a < 128)
          throw new r("tlv.decode(long): not minimal encoding");
      }
      const o = t.subarray(n, n + a);
      if (o.length !== a)
        throw new r("tlv.decode: wrong value length");
      return { v: o, l: t.subarray(n + a) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(e) {
      const { Err: t } = fr;
      if (e < Ar)
        throw new t("integer: negative integers are not allowed");
      let r = _n(e);
      if (Number.parseInt(r[0], 16) & 8 && (r = "00" + r), r.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return r;
    },
    decode(e) {
      const { Err: t } = fr;
      if (e[0] & 128)
        throw new t("invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return WI(e);
    }
  },
  toSig(e) {
    const { Err: t, _int: r, _tlv: n } = fr, s = typeof e == "string" ? jI(e) : e;
    ds(s);
    const { v: i, l: a } = n.decode(48, s);
    if (a.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: o, l: u } = n.decode(2, i), { v: f, l: p } = n.decode(2, u);
    if (p.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: r.decode(o), s: r.decode(f) };
  },
  hexFromSig(e) {
    const { _tlv: t, _int: r } = fr, n = t.encode(2, r.encode(e.r)), s = t.encode(2, r.encode(e.s)), i = n + s;
    return t.encode(48, i);
  }
}, Ar = BigInt(0), we = BigInt(1);
BigInt(2);
const d_ = BigInt(3);
BigInt(4);
function qI(e) {
  const t = ZI(e), { Fp: r } = t, n = vl(t.n, t.nBitLength), s = t.toBytes || ((R, D, z) => {
    const Y = D.toAffine();
    return jn(Uint8Array.from([4]), r.toBytes(Y.x), r.toBytes(Y.y));
  }), i = t.fromBytes || ((R) => {
    const D = R.subarray(1), z = r.fromBytes(D.subarray(0, r.BYTES)), Y = r.fromBytes(D.subarray(r.BYTES, 2 * r.BYTES));
    return { x: z, y: Y };
  });
  function a(R) {
    const { a: D, b: z } = t, Y = r.sqr(R), U = r.mul(Y, R);
    return r.add(r.add(U, r.mul(R, D)), z);
  }
  if (!r.eql(r.sqr(t.Gy), a(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(R) {
    return Ei(R, we, t.n);
  }
  function u(R) {
    const { allowedPrivateKeyLengths: D, nByteLength: z, wrapPrivateKey: Y, n: U } = t;
    if (D && typeof R != "bigint") {
      if ($r(R) && (R = yn(R)), typeof R != "string" || !D.includes(R.length))
        throw new Error("invalid private key");
      R = R.padStart(z * 2, "0");
    }
    let Q;
    try {
      Q = typeof R == "bigint" ? R : Wr(Xe("private key", R, z));
    } catch {
      throw new Error("invalid private key, expected hex or " + z + " bytes, got " + typeof R);
    }
    return Y && (Q = Ne(Q, U)), jr("private key", Q, we, U), Q;
  }
  function f(R) {
    if (!(R instanceof I))
      throw new Error("ProjectivePoint expected");
  }
  const p = Za((R, D) => {
    const { px: z, py: Y, pz: U } = R;
    if (r.eql(U, r.ONE))
      return { x: z, y: Y };
    const Q = R.is0();
    D == null && (D = Q ? r.ONE : r.inv(U));
    const T = r.mul(z, D), O = r.mul(Y, D), P = r.mul(U, D);
    if (Q)
      return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(P, r.ONE))
      throw new Error("invZ was invalid");
    return { x: T, y: O };
  }), m = Za((R) => {
    if (R.is0()) {
      if (t.allowInfinityPoint && !r.is0(R.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: D, y: z } = R.toAffine();
    if (!r.isValid(D) || !r.isValid(z))
      throw new Error("bad point: x or y not FE");
    const Y = r.sqr(z), U = a(D);
    if (!r.eql(Y, U))
      throw new Error("bad point: equation left != right");
    if (!R.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class I {
    constructor(D, z, Y) {
      if (this.px = D, this.py = z, this.pz = Y, D == null || !r.isValid(D))
        throw new Error("x required");
      if (z == null || !r.isValid(z))
        throw new Error("y required");
      if (Y == null || !r.isValid(Y))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(D) {
      const { x: z, y: Y } = D || {};
      if (!D || !r.isValid(z) || !r.isValid(Y))
        throw new Error("invalid affine point");
      if (D instanceof I)
        throw new Error("projective point not allowed");
      const U = (Q) => r.eql(Q, r.ZERO);
      return U(z) && U(Y) ? I.ZERO : new I(z, Y, r.ONE);
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
    static normalizeZ(D) {
      const z = r.invertBatch(D.map((Y) => Y.pz));
      return D.map((Y, U) => Y.toAffine(z[U])).map(I.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(D) {
      const z = I.fromAffine(i(Xe("pointHex", D)));
      return z.assertValidity(), z;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(D) {
      return I.BASE.multiply(u(D));
    }
    // Multiscalar Multiplication
    static msm(D, z) {
      return XI(I, n, D, z);
    }
    // "Private method", don't use it directly
    _setWindowSize(D) {
      F.setWindowSize(this, D);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      m(this);
    }
    hasEvenY() {
      const { y: D } = this.toAffine();
      if (r.isOdd)
        return !r.isOdd(D);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(D) {
      f(D);
      const { px: z, py: Y, pz: U } = this, { px: Q, py: T, pz: O } = D, P = r.eql(r.mul(z, O), r.mul(Q, U)), G = r.eql(r.mul(Y, O), r.mul(T, U));
      return P && G;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new I(this.px, r.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: D, b: z } = t, Y = r.mul(z, d_), { px: U, py: Q, pz: T } = this;
      let O = r.ZERO, P = r.ZERO, G = r.ZERO, k = r.mul(U, U), W = r.mul(Q, Q), j = r.mul(T, T), J = r.mul(U, Q);
      return J = r.add(J, J), G = r.mul(U, T), G = r.add(G, G), O = r.mul(D, G), P = r.mul(Y, j), P = r.add(O, P), O = r.sub(W, P), P = r.add(W, P), P = r.mul(O, P), O = r.mul(J, O), G = r.mul(Y, G), j = r.mul(D, j), J = r.sub(k, j), J = r.mul(D, J), J = r.add(J, G), G = r.add(k, k), k = r.add(G, k), k = r.add(k, j), k = r.mul(k, J), P = r.add(P, k), j = r.mul(Q, T), j = r.add(j, j), k = r.mul(j, J), O = r.sub(O, k), G = r.mul(j, W), G = r.add(G, G), G = r.add(G, G), new I(O, P, G);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(D) {
      f(D);
      const { px: z, py: Y, pz: U } = this, { px: Q, py: T, pz: O } = D;
      let P = r.ZERO, G = r.ZERO, k = r.ZERO;
      const W = t.a, j = r.mul(t.b, d_);
      let J = r.mul(z, Q), v = r.mul(Y, T), d = r.mul(U, O), _ = r.add(z, Y), A = r.add(Q, T);
      _ = r.mul(_, A), A = r.add(J, v), _ = r.sub(_, A), A = r.add(z, U);
      let w = r.add(Q, O);
      return A = r.mul(A, w), w = r.add(J, d), A = r.sub(A, w), w = r.add(Y, U), P = r.add(T, O), w = r.mul(w, P), P = r.add(v, d), w = r.sub(w, P), k = r.mul(W, A), P = r.mul(j, d), k = r.add(P, k), P = r.sub(v, k), k = r.add(v, k), G = r.mul(P, k), v = r.add(J, J), v = r.add(v, J), d = r.mul(W, d), A = r.mul(j, A), v = r.add(v, d), d = r.sub(J, d), d = r.mul(W, d), A = r.add(A, d), J = r.mul(v, A), G = r.add(G, J), J = r.mul(w, A), P = r.mul(_, P), P = r.sub(P, J), J = r.mul(_, v), k = r.mul(w, k), k = r.add(k, J), new I(P, G, k);
    }
    subtract(D) {
      return this.add(D.negate());
    }
    is0() {
      return this.equals(I.ZERO);
    }
    wNAF(D) {
      return F.wNAFCached(this, D, I.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(D) {
      const { endo: z, n: Y } = t;
      jr("scalar", D, Ar, Y);
      const U = I.ZERO;
      if (D === Ar)
        return U;
      if (this.is0() || D === we)
        return this;
      if (!z || F.hasPrecomputes(this))
        return F.wNAFCachedUnsafe(this, D, I.normalizeZ);
      let { k1neg: Q, k1: T, k2neg: O, k2: P } = z.splitScalar(D), G = U, k = U, W = this;
      for (; T > Ar || P > Ar; )
        T & we && (G = G.add(W)), P & we && (k = k.add(W)), W = W.double(), T >>= we, P >>= we;
      return Q && (G = G.negate()), O && (k = k.negate()), k = new I(r.mul(k.px, z.beta), k.py, k.pz), G.add(k);
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
    multiply(D) {
      const { endo: z, n: Y } = t;
      jr("scalar", D, we, Y);
      let U, Q;
      if (z) {
        const { k1neg: T, k1: O, k2neg: P, k2: G } = z.splitScalar(D);
        let { p: k, f: W } = this.wNAF(O), { p: j, f: J } = this.wNAF(G);
        k = F.constTimeNegate(T, k), j = F.constTimeNegate(P, j), j = new I(r.mul(j.px, z.beta), j.py, j.pz), U = k.add(j), Q = W.add(J);
      } else {
        const { p: T, f: O } = this.wNAF(D);
        U = T, Q = O;
      }
      return I.normalizeZ([U, Q])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(D, z, Y) {
      const U = I.BASE, Q = (O, P) => P === Ar || P === we || !O.equals(U) ? O.multiplyUnsafe(P) : O.multiply(P), T = Q(this, z).add(Q(D, Y));
      return T.is0() ? void 0 : T;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(D) {
      return p(this, D);
    }
    isTorsionFree() {
      const { h: D, isTorsionFree: z } = t;
      if (D === we)
        return !0;
      if (z)
        return z(I, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: D, clearCofactor: z } = t;
      return D === we ? this : z ? z(I, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(D = !0) {
      return mn("isCompressed", D), this.assertValidity(), s(I, this, D);
    }
    toHex(D = !0) {
      return mn("isCompressed", D), yn(this.toRawBytes(D));
    }
  }
  I.BASE = new I(t.Gx, t.Gy, r.ONE), I.ZERO = new I(r.ZERO, r.ONE, r.ZERO);
  const S = t.nBitLength, F = HI(I, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: I,
    normPrivateKeyToScalar: u,
    weierstrassEquation: a,
    isWithinCurveOrder: o
  };
}
function $I(e) {
  const t = Sl(e);
  return us(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function KI(e) {
  const t = $I(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function a(d) {
    return Ne(d, n);
  }
  function o(d) {
    return ja(d, n);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: f, weierstrassEquation: p, isWithinCurveOrder: m } = qI({
    ...t,
    toBytes(d, _, A) {
      const w = _.toAffine(), y = r.toBytes(w.x), B = jn;
      return mn("isCompressed", A), A ? B(Uint8Array.from([_.hasEvenY() ? 2 : 3]), y) : B(Uint8Array.from([4]), y, r.toBytes(w.y));
    },
    fromBytes(d) {
      const _ = d.length, A = d[0], w = d.subarray(1);
      if (_ === s && (A === 2 || A === 3)) {
        const y = Wr(w);
        if (!Ei(y, we, r.ORDER))
          throw new Error("Point is not on curve");
        const B = p(y);
        let N;
        try {
          N = r.sqrt(B);
        } catch (E) {
          const K = E instanceof Error ? ": " + E.message : "";
          throw new Error("Point is not on curve" + K);
        }
        const b = (N & we) === we;
        return (A & 1) === 1 !== b && (N = r.neg(N)), { x: y, y: N };
      } else if (_ === i && A === 4) {
        const y = r.fromBytes(w.subarray(0, r.BYTES)), B = r.fromBytes(w.subarray(r.BYTES, 2 * r.BYTES));
        return { x: y, y: B };
      } else {
        const y = s, B = i;
        throw new Error("invalid Point, expected length of " + y + ", or uncompressed " + B + ", got " + _);
      }
    }
  }), I = (d) => yn(In(d, t.nByteLength));
  function S(d) {
    const _ = n >> we;
    return d > _;
  }
  function F(d) {
    return S(d) ? a(-d) : d;
  }
  const R = (d, _, A) => Wr(d.slice(_, A));
  class D {
    constructor(_, A, w) {
      this.r = _, this.s = A, this.recovery = w, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(_) {
      const A = t.nByteLength;
      return _ = Xe("compactSignature", _, A * 2), new D(R(_, 0, A), R(_, A, 2 * A));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(_) {
      const { r: A, s: w } = fr.toSig(Xe("DER", _));
      return new D(A, w);
    }
    assertValidity() {
      jr("r", this.r, we, n), jr("s", this.s, we, n);
    }
    addRecoveryBit(_) {
      return new D(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: A, s: w, recovery: y } = this, B = O(Xe("msgHash", _));
      if (y == null || ![0, 1, 2, 3].includes(y))
        throw new Error("recovery id invalid");
      const N = y === 2 || y === 3 ? A + t.n : A;
      if (N >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const b = y & 1 ? "03" : "02", l = u.fromHex(b + I(N)), E = o(N), K = a(-B * E), tt = a(w * E), rt = u.BASE.multiplyAndAddUnsafe(l, K, tt);
      if (!rt)
        throw new Error("point at infinify");
      return rt.assertValidity(), rt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return S(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new D(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return bn(this.toDERHex());
    }
    toDERHex() {
      return fr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return bn(this.toCompactHex());
    }
    toCompactHex() {
      return I(this.r) + I(this.s);
    }
  }
  const z = {
    isValidPrivateKey(d) {
      try {
        return f(d), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: f,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const d = Bl(t.n);
      return UI(t.randomBytes(d), t.n);
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
  function Y(d, _ = !0) {
    return u.fromPrivateKey(d).toRawBytes(_);
  }
  function U(d) {
    const _ = $r(d), A = typeof d == "string", w = (_ || A) && d.length;
    return _ ? w === s || w === i : A ? w === 2 * s || w === 2 * i : d instanceof u;
  }
  function Q(d, _, A = !0) {
    if (U(d))
      throw new Error("first arg must be private key");
    if (!U(_))
      throw new Error("second arg must be public key");
    return u.fromHex(_).multiply(f(d)).toRawBytes(A);
  }
  const T = t.bits2int || function(d) {
    if (d.length > 8192)
      throw new Error("input is too large");
    const _ = Wr(d), A = d.length * 8 - t.nBitLength;
    return A > 0 ? _ >> BigInt(A) : _;
  }, O = t.bits2int_modN || function(d) {
    return a(T(d));
  }, P = Lo(t.nBitLength);
  function G(d) {
    return jr("num < 2^" + t.nBitLength, d, Ar, P), In(d, t.nByteLength);
  }
  function k(d, _, A = W) {
    if (["recovered", "canonical"].some((ht) => ht in A))
      throw new Error("sign() legacy options not supported");
    const { hash: w, randomBytes: y } = t;
    let { lowS: B, prehash: N, extraEntropy: b } = A;
    B == null && (B = !0), d = Xe("msgHash", d), c_(A), N && (d = Xe("prehashed msgHash", w(d)));
    const l = O(d), E = f(_), K = [G(E), G(l)];
    if (b != null && b !== !1) {
      const ht = b === !0 ? y(r.BYTES) : b;
      K.push(Xe("extraEntropy", ht));
    }
    const tt = jn(...K), rt = l;
    function xt(ht) {
      const mt = T(ht);
      if (!m(mt))
        return;
      const Ge = o(mt), bt = u.BASE.multiply(mt).toAffine(), yt = a(bt.x);
      if (yt === Ar)
        return;
      const Ce = a(Ge * a(rt + yt * E));
      if (Ce === Ar)
        return;
      let Et = (bt.x === yt ? 0 : 2) | Number(bt.y & we), Rt = Ce;
      return B && S(Ce) && (Rt = F(Ce), Et ^= 1), new D(yt, Rt, Et);
    }
    return { seed: tt, k2sig: xt };
  }
  const W = { lowS: t.lowS, prehash: !1 }, j = { lowS: t.lowS, prehash: !1 };
  function J(d, _, A = W) {
    const { seed: w, k2sig: y } = k(d, _, A), B = t;
    return Il(B.hash.outputLen, B.nByteLength, B.hmac)(w, y);
  }
  u.BASE._setWindowSize(8);
  function v(d, _, A, w = j) {
    var Et;
    const y = d;
    _ = Xe("msgHash", _), A = Xe("publicKey", A);
    const { lowS: B, prehash: N, format: b } = w;
    if (c_(w), "strict" in w)
      throw new Error("options.strict was renamed to lowS");
    if (b !== void 0 && b !== "compact" && b !== "der")
      throw new Error("format must be compact or der");
    const l = typeof y == "string" || $r(y), E = !l && !b && typeof y == "object" && y !== null && typeof y.r == "bigint" && typeof y.s == "bigint";
    if (!l && !E)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let K, tt;
    try {
      if (E && (K = new D(y.r, y.s)), l) {
        try {
          b !== "compact" && (K = D.fromDER(y));
        } catch (Rt) {
          if (!(Rt instanceof fr.Err))
            throw Rt;
        }
        !K && b !== "der" && (K = D.fromCompact(y));
      }
      tt = u.fromHex(A);
    } catch {
      return !1;
    }
    if (!K || B && K.hasHighS())
      return !1;
    N && (_ = t.hash(_));
    const { r: rt, s: xt } = K, ht = O(_), mt = o(xt), Ge = a(ht * mt), bt = a(rt * mt), yt = (Et = u.BASE.multiplyAndAddUnsafe(tt, Ge, bt)) == null ? void 0 : Et.toAffine();
    return yt ? a(yt.x) === rt : !1;
  }
  return {
    CURVE: t,
    getPublicKey: Y,
    getSharedSecret: Q,
    sign: J,
    verify: v,
    ProjectivePoint: u,
    Signature: D,
    utils: z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function tE(e) {
  return {
    hash: e,
    hmac: (t, ...r) => Ai(e, t, YA(...r)),
    randomBytes: HA
  };
}
function eE(e, t) {
  const r = (n) => KI({ ...e, ...tE(n) });
  return { ...r(t), create: r };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Tl = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), u_ = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), rE = BigInt(1), Ja = BigInt(2), __ = (e, t) => (e + t / Ja) / t;
function nE(e) {
  const t = Tl, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), a = BigInt(23), o = BigInt(44), u = BigInt(88), f = e * e * e % t, p = f * f * e % t, m = Le(p, r, t) * p % t, I = Le(m, r, t) * p % t, S = Le(I, Ja, t) * f % t, F = Le(S, s, t) * S % t, R = Le(F, i, t) * F % t, D = Le(R, o, t) * R % t, z = Le(D, u, t) * D % t, Y = Le(z, o, t) * R % t, U = Le(Y, r, t) * p % t, Q = Le(U, a, t) * F % t, T = Le(Q, n, t) * f % t, O = Le(T, Ja, t);
  if (!qa.eql(qa.sqr(O), e))
    throw new Error("Cannot find square root");
  return O;
}
const qa = vl(Tl, void 0, void 0, { sqrt: nE }), Cr = eE({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  Fp: qa,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: u_,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (e) => {
      const t = u_, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -rE * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, a = BigInt("0x100000000000000000000000000000000"), o = __(i * e, t), u = __(-n * e, t);
      let f = Ne(e - o * r - u * s, t), p = Ne(-o * n - u * i, t);
      const m = f > a, I = p > a;
      if (m && (f = t - f), I && (p = t - p), f > a || p > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: m, k1: f, k2neg: I, k2: p };
    }
  }
}, Mr);
BigInt(0);
Cr.ProjectivePoint;
var Is = { exports: {} }, h_;
function sE() {
  if (h_) return Is.exports;
  h_ = 1;
  var e = typeof Reflect == "object" ? Reflect : null, t = e && typeof e.apply == "function" ? e.apply : function(T, O, P) {
    return Function.prototype.apply.call(T, O, P);
  }, r;
  e && typeof e.ownKeys == "function" ? r = e.ownKeys : Object.getOwnPropertySymbols ? r = function(T) {
    return Object.getOwnPropertyNames(T).concat(Object.getOwnPropertySymbols(T));
  } : r = function(T) {
    return Object.getOwnPropertyNames(T);
  };
  function n(Q) {
    console && console.warn && console.warn(Q);
  }
  var s = Number.isNaN || function(T) {
    return T !== T;
  };
  function i() {
    i.init.call(this);
  }
  Is.exports = i, Is.exports.once = z, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
  var a = 10;
  function o(Q) {
    if (typeof Q != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof Q);
  }
  Object.defineProperty(i, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return a;
    },
    set: function(Q) {
      if (typeof Q != "number" || Q < 0 || s(Q))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + Q + ".");
      a = Q;
    }
  }), i.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, i.prototype.setMaxListeners = function(T) {
    if (typeof T != "number" || T < 0 || s(T))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + T + ".");
    return this._maxListeners = T, this;
  };
  function u(Q) {
    return Q._maxListeners === void 0 ? i.defaultMaxListeners : Q._maxListeners;
  }
  i.prototype.getMaxListeners = function() {
    return u(this);
  }, i.prototype.emit = function(T) {
    for (var O = [], P = 1; P < arguments.length; P++) O.push(arguments[P]);
    var G = T === "error", k = this._events;
    if (k !== void 0)
      G = G && k.error === void 0;
    else if (!G)
      return !1;
    if (G) {
      var W;
      if (O.length > 0 && (W = O[0]), W instanceof Error)
        throw W;
      var j = new Error("Unhandled error." + (W ? " (" + W.message + ")" : ""));
      throw j.context = W, j;
    }
    var J = k[T];
    if (J === void 0)
      return !1;
    if (typeof J == "function")
      t(J, this, O);
    else
      for (var v = J.length, d = F(J, v), P = 0; P < v; ++P)
        t(d[P], this, O);
    return !0;
  };
  function f(Q, T, O, P) {
    var G, k, W;
    if (o(O), k = Q._events, k === void 0 ? (k = Q._events = /* @__PURE__ */ Object.create(null), Q._eventsCount = 0) : (k.newListener !== void 0 && (Q.emit(
      "newListener",
      T,
      O.listener ? O.listener : O
    ), k = Q._events), W = k[T]), W === void 0)
      W = k[T] = O, ++Q._eventsCount;
    else if (typeof W == "function" ? W = k[T] = P ? [O, W] : [W, O] : P ? W.unshift(O) : W.push(O), G = u(Q), G > 0 && W.length > G && !W.warned) {
      W.warned = !0;
      var j = new Error("Possible EventEmitter memory leak detected. " + W.length + " " + String(T) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      j.name = "MaxListenersExceededWarning", j.emitter = Q, j.type = T, j.count = W.length, n(j);
    }
    return Q;
  }
  i.prototype.addListener = function(T, O) {
    return f(this, T, O, !1);
  }, i.prototype.on = i.prototype.addListener, i.prototype.prependListener = function(T, O) {
    return f(this, T, O, !0);
  };
  function p() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function m(Q, T, O) {
    var P = { fired: !1, wrapFn: void 0, target: Q, type: T, listener: O }, G = p.bind(P);
    return G.listener = O, P.wrapFn = G, G;
  }
  i.prototype.once = function(T, O) {
    return o(O), this.on(T, m(this, T, O)), this;
  }, i.prototype.prependOnceListener = function(T, O) {
    return o(O), this.prependListener(T, m(this, T, O)), this;
  }, i.prototype.removeListener = function(T, O) {
    var P, G, k, W, j;
    if (o(O), G = this._events, G === void 0)
      return this;
    if (P = G[T], P === void 0)
      return this;
    if (P === O || P.listener === O)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete G[T], G.removeListener && this.emit("removeListener", T, P.listener || O));
    else if (typeof P != "function") {
      for (k = -1, W = P.length - 1; W >= 0; W--)
        if (P[W] === O || P[W].listener === O) {
          j = P[W].listener, k = W;
          break;
        }
      if (k < 0)
        return this;
      k === 0 ? P.shift() : R(P, k), P.length === 1 && (G[T] = P[0]), G.removeListener !== void 0 && this.emit("removeListener", T, j || O);
    }
    return this;
  }, i.prototype.off = i.prototype.removeListener, i.prototype.removeAllListeners = function(T) {
    var O, P, G;
    if (P = this._events, P === void 0)
      return this;
    if (P.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : P[T] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete P[T]), this;
    if (arguments.length === 0) {
      var k = Object.keys(P), W;
      for (G = 0; G < k.length; ++G)
        W = k[G], W !== "removeListener" && this.removeAllListeners(W);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (O = P[T], typeof O == "function")
      this.removeListener(T, O);
    else if (O !== void 0)
      for (G = O.length - 1; G >= 0; G--)
        this.removeListener(T, O[G]);
    return this;
  };
  function I(Q, T, O) {
    var P = Q._events;
    if (P === void 0)
      return [];
    var G = P[T];
    return G === void 0 ? [] : typeof G == "function" ? O ? [G.listener || G] : [G] : O ? D(G) : F(G, G.length);
  }
  i.prototype.listeners = function(T) {
    return I(this, T, !0);
  }, i.prototype.rawListeners = function(T) {
    return I(this, T, !1);
  }, i.listenerCount = function(Q, T) {
    return typeof Q.listenerCount == "function" ? Q.listenerCount(T) : S.call(Q, T);
  }, i.prototype.listenerCount = S;
  function S(Q) {
    var T = this._events;
    if (T !== void 0) {
      var O = T[Q];
      if (typeof O == "function")
        return 1;
      if (O !== void 0)
        return O.length;
    }
    return 0;
  }
  i.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  };
  function F(Q, T) {
    for (var O = new Array(T), P = 0; P < T; ++P)
      O[P] = Q[P];
    return O;
  }
  function R(Q, T) {
    for (; T + 1 < Q.length; T++)
      Q[T] = Q[T + 1];
    Q.pop();
  }
  function D(Q) {
    for (var T = new Array(Q.length), O = 0; O < T.length; ++O)
      T[O] = Q[O].listener || Q[O];
    return T;
  }
  function z(Q, T) {
    return new Promise(function(O, P) {
      function G(W) {
        Q.removeListener(T, k), P(W);
      }
      function k() {
        typeof Q.removeListener == "function" && Q.removeListener("error", G), O([].slice.call(arguments));
      }
      U(Q, T, k, { once: !0 }), T !== "error" && Y(Q, G, { once: !0 });
    });
  }
  function Y(Q, T, O) {
    typeof Q.on == "function" && U(Q, "error", T, O);
  }
  function U(Q, T, O, P) {
    if (typeof Q.on == "function")
      P.once ? Q.once(T, O) : Q.on(T, O);
    else if (typeof Q.addEventListener == "function")
      Q.addEventListener(T, function G(k) {
        P.once && Q.removeEventListener(T, G), O(k);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof Q);
  }
  return Is.exports;
}
var Nl = sE(), iE = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", aE = class {
  constructor(e, t, r, n, s, i = 0) {
    L(this, "left");
    L(this, "right");
    L(this, "parent");
    L(this, "hash");
    L(this, "data");
    L(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, l_ = aE;
function oE(e) {
  return sr("0x00".concat(e.slice(2)));
}
function cE(e, t) {
  return sr("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Dl(e) {
  if (!e.length)
    return iE;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const a = oE(e[i]);
    t.push(new l_(-1, -1, -1, a, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const a = i << 1, o = cE(r[a].hash, r[a + 1].hash);
      t[i] = new l_(r[a].index, r[a + 1].index, -1, o, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var dE = "0x00", Fl = "0x01";
function uE(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(sr(t).slice(2));
  return [sr(r), r];
}
function rn(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [sr(r), r];
}
function Ia(e) {
  const t = Fl.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function _E(e) {
  const t = Fl.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Ea(e) {
  return e.slice(0, 4) === dE;
}
var hE = class {
  constructor(e, t, r, n, s) {
    L(this, "SideNodes");
    L(this, "NonMembershipLeafData");
    L(this, "BitMask");
    L(this, "NumSideNodes");
    L(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, lE = hE, fE = class {
  constructor(e, t, r) {
    L(this, "SideNodes");
    L(this, "NonMembershipLeafData");
    L(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, AE = fE, Fe = "0x0000000000000000000000000000000000000000000000000000000000000000", lr = 256;
function hn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function pE(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function gE(e, t) {
  let r = 0;
  for (let n = 0; n < lr && hn(e, n) === hn(t, n); n += 1)
    r += 1;
  return r;
}
function wE(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Fe ? t.push(0) : (r.push(n), t.push(1));
  return new lE(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var mE = class {
  constructor() {
    L(this, "ms");
    L(this, "root");
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
    if (Ea(n))
      return [r, t, n, ""];
    let s, i, a = "", o = "";
    for (let f = 0; f < lr; f += 1) {
      if ([s, i] = _E(n), hn(e, f) === 1 ? (o = s, a = i) : (o = i, a = s), r.push(o), a === Fe) {
        n = "";
        break;
      }
      if (n = this.get(a), Ea(n))
        break;
    }
    const u = this.get(o);
    return [pE(r), a, n, u];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Fe)
      return this.root;
    const [s] = Ia(n);
    if (s !== e)
      return this.root;
    let i = "", a = "", o = "", u = "", f = !1;
    for (let p = 0; p < t.length; p += 1)
      if (t[p] !== "") {
        if (o = t[p], a === "")
          if (u = this.get(o), Ea(u)) {
            i = o, a = o;
            continue;
          } else
            a = Fe, f = !0;
        !f && o === Fe || (f || (f = !0), hn(e, t.length - 1 - p) === 1 ? [i, a] = rn(o, a) : [i, a] = rn(a, o), this.set(i, a), a = i);
      }
    return i === "" && (i = Fe), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, a;
    this.set(sr(t), t), [i, a] = uE(e, t), this.set(i, a), a = i;
    let o;
    if (n === Fe)
      o = lr;
    else {
      const [u] = Ia(s);
      o = gE(e, u);
    }
    o !== lr && (hn(e, o) === 1 ? [i, a] = rn(n, a) : [i, a] = rn(a, n), this.set(i, a), a = i);
    for (let u = 0; u < lr; u += 1) {
      let f;
      const p = lr - r.length;
      if (u - p < 0 || r[u - p] === "")
        if (o !== lr && o > lr - 1 - u)
          f = Fe;
        else
          continue;
      else
        f = r[u - p];
      hn(e, lr - 1 - u) === 1 ? [i, a] = rn(f, a) : [i, a] = rn(a, f), this.set(i, a), a = i;
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
    let a = "";
    if (r !== Fe) {
      const [u] = Ia(n);
      u !== e && (a = n);
    }
    return new AE(i, a, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return wE(t);
  }
}, yE = Object.defineProperty, bE = (e, t, r) => t in e ? yE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ct = (e, t, r) => (bE(e, typeof t != "symbol" ? t + "" : t, r), r), Po = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Dt = (e, t, r) => (Po(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Tr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Ze = (e, t, r, n) => (Po(e, t, "write to private field"), t.set(e, r), r), $a = (e, t, r) => (Po(e, t, "access private method"), r), st = {
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
}, IE = (e) => {
  if (e === "ethereum")
    return st.eth.sepolia;
  if (e === "fuel")
    return st.fuel.testnet;
}, EE = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), Ql = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? IE(r);
  if (i === void 0)
    return;
  const a = EE({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (a)
    return {
      ...s,
      ...a
    };
}, ZB = (e, t) => Ql({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), WB = (e, t) => Ql({
  asset: e,
  networkType: "fuel",
  chainId: t
}), vE = "/", CE = /^\/|\/$/g, BE = (e = "") => e.replace(CE, "");
function xE(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(BE);
  return n && r && s.unshift(""), s.join(vE);
}
function RE(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: xE(t, r.icon)
  }));
}
var SE = "https://assets.fuel.network/providers/", TE = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: st.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: st.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: st.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: st.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
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
        chainId: st.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: st.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 9
      }
    ]
  }
], jB = RE(TE, SE), Ol = {
  mainnet: "https://mainnet-explorer.fuel.network",
  testnet: "https://explorer-indexer-testnet.fuel.network"
}, Ml = async (e, t) => {
  const r = await fetch(`${e}${t}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  try {
    return await r.json();
  } catch {
    return null;
  }
}, NE = (e) => {
  const t = new URLSearchParams();
  return Object.entries(e).forEach(([r, n]) => {
    t.set(r, n.toString());
  }), t.size > 0 ? `?${t.toString()}` : "";
}, JB = (e) => {
  const { network: t = "mainnet", assetId: r } = e, n = Ol[t];
  return Ml(n, `/assets/${r}`);
}, qB = async (e) => {
  const { network: t = "mainnet", owner: r, pagination: n = { last: 10 } } = e, s = Ol[t], { last: i } = n, a = NE({ last: i }), o = await Ml(s, `/accounts/${r}/assets${a}`);
  return o || { data: [], pageInfo: { count: 0 } };
}, ko = (e) => {
  let t, r, n;
  return Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0), {
    assetId: X(t),
    amount: x(r),
    max: n ? x(n) : void 0
  };
}, DE = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, zo = $`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Go = $`
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
    `, Ll = $`
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
    ${Go}`, Pl = $`
    fragment SuccessStatusWithBlockIdFragment on SuccessStatus {
  ...SuccessStatusFragment
  block {
    id
  }
}
    ${Ll}`, FE = $`
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
    `, kl = $`
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
    ${Go}`, zl = $`
    fragment FailureStatusWithBlockIdFragment on FailureStatus {
  ...FailureStatusFragment
  block {
    id
  }
}
    ${kl}`, Uo = $`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, Gl = $`
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
    ${zo}
${Pl}
${FE}
${zl}
${Uo}`, QE = $`
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
    ${zo}
${Ll}
${kl}
${Uo}`, Ul = $`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${QE}`, OE = $`
    fragment transactionRawPayloadFragment on Transaction {
  id
  rawPayload
}
    `, ME = $`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Vl = $`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${ME}`, LE = $`
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
    `, PE = $`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, kE = $`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${LE}
${PE}`, zE = $`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${kE}
${Go}`, vi = $`
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
    `, Vo = $`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, GE = $`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Yl = $`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  daHeight
}
    `, UE = $`
    fragment getMessageFragment on Message {
  ...messageFragment
  nonce
}
    ${Yl}`, VE = $`
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
    `, YE = $`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, HE = $`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, XE = $`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, ZE = $`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, WE = $`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, jE = $`
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
    `, JE = $`
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
    ${jE}`, qE = $`
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
    ${YE}
${HE}
${XE}
${ZE}
${WE}
${JE}`, Hl = $`
    fragment chainInfoFragment on ChainInfo {
  name
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
}
    ${qE}`, $E = $`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, xn = $`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Xl = $`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, KE = $`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, tv = $`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, ev = $`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Xl}`, rv = $`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Hl}`, nv = $`
    query getChainAndNodeInfo {
  chain {
    ...chainInfoFragment
  }
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Hl}
${Xl}`, sv = $`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Ul}`, iv = $`
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
    ${zo}
${Pl}
${zl}
${Uo}`, av = $`
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
    ${xn}`, ov = $`
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
    ${xn}
${Ul}`, cv = $`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Vl}`, dv = $`
    query estimatePredicatesAndGasPrice($encodedTransaction: HexString!, $blockHorizon: U32!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    ${Vl}`, uv = $`
    query getLatestBlock {
  chain {
    latestBlock {
      ...blockFragment
    }
  }
}
    ${vi}`, _v = $`
    query getLatestBlockHeight {
  chain {
    latestBlock {
      height
    }
  }
}
    `, hv = $`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${vi}`, lv = $`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionRawPayloadFragment
    }
  }
}
    ${vi}
${OE}`, fv = $`
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
    ${xn}
${vi}`, Av = $`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
    owner
  }
}
    ${Vo}`, pv = $`
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
    ${xn}
${Vo}`, gv = $`
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
    ${Vo}
${GE}`, wv = $`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, mv = $`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${$E}`, yv = $`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amount
  }
}
    `, bv = $`
    query getBalanceV2($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amountU128
  }
}
    `, Iv = $`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, Ev = $`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, vv = $`
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
        assetId
        amount
      }
    }
  }
}
    `, Cv = $`
    query getBalancesV2($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
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
        amountU128
      }
    }
  }
}
    ${xn}`, Bv = $`
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
    ${xn}
${UE}`, xv = $`
    query daCompressedBlock($height: U32!) {
  daCompressedBlock(height: $height) {
    bytes
  }
}
    `, Rv = $`
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
    ${VE}`, Sv = $`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Tv = $`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${KE}`, Nv = $`
    query getAssetDetails($assetId: AssetId!) {
  assetDetails(id: $assetId) {
    subId
    contractId
    totalSupply
  }
}
    `, Dv = $`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${zE}`, Fv = $`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, Qv = $`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, Ov = $`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${Yl}`, Mv = $`
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
    `, Lv = $`
    query getConsensusParametersVersion {
  chain {
    latestBlock {
      header {
        consensusParametersVersion
      }
    }
  }
}
    `, Pv = $`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Gl}`, kv = $`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Gl}`;
function zv(e) {
  return {
    getVersion(t, r) {
      return e(tv, t, r);
    },
    getNodeInfo(t, r) {
      return e(ev, t, r);
    },
    getChain(t, r) {
      return e(rv, t, r);
    },
    getChainAndNodeInfo(t, r) {
      return e(nv, t, r);
    },
    getTransaction(t, r) {
      return e(sv, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(iv, t, r);
    },
    getTransactions(t, r) {
      return e(av, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(ov, t, r);
    },
    estimatePredicates(t, r) {
      return e(cv, t, r);
    },
    estimatePredicatesAndGasPrice(t, r) {
      return e(dv, t, r);
    },
    getLatestBlock(t, r) {
      return e(uv, t, r);
    },
    getLatestBlockHeight(t, r) {
      return e(_v, t, r);
    },
    getBlock(t, r) {
      return e(hv, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(lv, t, r);
    },
    getBlocks(t, r) {
      return e(fv, t, r);
    },
    getCoin(t, r) {
      return e(Av, t, r);
    },
    getCoins(t, r) {
      return e(pv, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(gv, t, r);
    },
    getContract(t, r) {
      return e(wv, t, r);
    },
    getContractBalance(t, r) {
      return e(mv, t, r);
    },
    getBalance(t, r) {
      return e(yv, t, r);
    },
    getBalanceV2(t, r) {
      return e(bv, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(Iv, t, r);
    },
    estimateGasPrice(t, r) {
      return e(Ev, t, r);
    },
    getBalances(t, r) {
      return e(vv, t, r);
    },
    getBalancesV2(t, r) {
      return e(Cv, t, r);
    },
    getMessages(t, r) {
      return e(Bv, t, r);
    },
    daCompressedBlock(t, r) {
      return e(xv, t, r);
    },
    getMessageProof(t, r) {
      return e(Rv, t, r);
    },
    getMessageStatus(t, r) {
      return e(Sv, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(Tv, t, r);
    },
    getAssetDetails(t, r) {
      return e(Nv, t, r);
    },
    dryRun(t, r) {
      return e(Dv, t, r);
    },
    submit(t, r) {
      return e(Fv, t, r);
    },
    produceBlocks(t, r) {
      return e(Qv, t, r);
    },
    getMessageByNonce(t, r) {
      return e(Ov, t, r);
    },
    isUserAccount(t, r) {
      return e(Mv, t, r);
    },
    getConsensusParametersVersion(t, r) {
      return e(Lv, t, r);
    },
    submitAndAwaitStatus(t, r) {
      return e(Pv, t, r);
    },
    statusChange(t, r) {
      return e(kv, t, r);
    }
  };
}
var Gv = (e) => new RegExp(
  "the target cannot be met due to no coins available or exceeding the \\d+ coin limit."
  /* NOT_ENOUGH_COINS_MAX_COINS */
).test(e.message) ? new C(
  M.INSUFFICIENT_FUNDS_OR_MAX_COINS,
  "Insufficient funds or too many small value coins. Consider combining UTXOs.",
  {},
  e
) : new RegExp(
  "resource was not found in table"
  /* ASSET_NOT_FOUND */
).test(e.message) ? new C(
  M.ASSET_NOT_FOUND,
  "Asset not found for given asset id.",
  {},
  e
) : new C(M.INVALID_REQUEST, e.message, {}, e), f_ = (e, t) => t ? new C(
  e.code,
  `${e.message}

${t}`,
  e.metadata,
  e.rawError
) : e, Zl = (e, t = !1) => {
  if (!Array.isArray(e))
    return;
  const r = e.map(Gv);
  if (r.length === 1)
    throw f_(r[0], t);
  const n = r.map((s) => s.message).join(`
`);
  throw f_(
    new C(M.INVALID_REQUEST, n, {}, r),
    t
  );
}, zn = class {
  constructor(e) {
    L(this, "events", []);
    L(this, "parsingLeftover", "");
    this.stream = e;
  }
  static async create(e) {
    const { url: t, query: r, variables: n, fetchFn: s } = e, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: al(r),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [a, o] = i.body.tee().map((u) => u.getReader());
    return await new zn(a).next(), new zn(o);
  }
  async next() {
    for (; ; ) {
      if (this.events.length > 0) {
        const { data: a, errors: o } = this.events.shift();
        return Zl(o, zn.incompatibleNodeVersionMessage), { value: a, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const r = zn.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (r === "")
        continue;
      const n = `${this.parsingLeftover}${r}`, s = /data:.*\n\n/g, i = [...n.matchAll(s)].flatMap((a) => a);
      i.forEach((a) => {
        try {
          this.events.push(JSON.parse(a.replace(/^data:/, "")));
        } catch {
          throw new C(
            M.STREAM_PARSING_ERROR,
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
}, oi = zn;
Ct(oi, "incompatibleNodeVersionMessage", !1);
Ct(oi, "textDecoder", new TextDecoder());
var Uv = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case vt.Coin: {
      const r = Z(e.predicate ?? "0x"), n = Z(e.predicateData ?? "0x");
      return {
        type: vt.Coin,
        txID: X(Z(e.id).slice(0, gr)),
        outputIndex: Rr(Z(e.id).slice(gr, Gs)),
        owner: X(e.owner),
        amount: x(e.amount),
        assetId: X(e.assetId),
        txPointer: {
          blockHeight: Rr(Z(e.txPointer).slice(0, 8)),
          txIndex: Rr(Z(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(r.length),
        predicateDataLength: x(n.length),
        predicate: X(r),
        predicateData: X(n)
      };
    }
    case vt.Contract:
      return {
        type: vt.Contract,
        txID: Tt,
        outputIndex: 0,
        balanceRoot: Tt,
        stateRoot: Tt,
        txPointer: {
          blockHeight: Rr(Z(e.txPointer).slice(0, 8)),
          txIndex: Rr(Z(e.txPointer).slice(8, 16))
        },
        contractID: X(e.contractId)
      };
    case vt.Message: {
      const r = Z(e.predicate ?? "0x"), n = Z(e.predicateData ?? "0x"), s = Z(e.data ?? "0x");
      return {
        type: vt.Message,
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
      throw new C(
        M.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, Vv = (e) => {
  const { type: t } = e;
  switch (t) {
    case wt.Coin:
      return {
        type: wt.Coin,
        to: X(e.to),
        amount: x(e.amount),
        assetId: X(e.assetId)
      };
    case wt.Contract:
      return {
        type: wt.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Tt,
        stateRoot: Tt
      };
    case wt.Change:
      return {
        type: wt.Change,
        to: X(e.to),
        amount: x(0),
        assetId: X(e.assetId)
      };
    case wt.Variable:
      return {
        type: wt.Variable,
        to: Tt,
        amount: x(0),
        assetId: Tt
      };
    case wt.ContractCreated:
      return {
        type: wt.ContractCreated,
        contractId: X(e.contractId),
        stateRoot: X(e.stateRoot)
      };
    default:
      throw new C(
        M.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, A_ = (e) => !("data" in e), $B = (e) => "utxoId" in e, KB = (e) => "recipient" in e, Yv = (e) => "id" in e, t2 = (e) => "recipient" in e, Ka = (e) => {
  const { name: t, daHeight: r, consensusParameters: n } = e, {
    contractParams: s,
    feeParams: i,
    predicateParams: a,
    scriptParams: o,
    txParams: u,
    gasCosts: f,
    baseAssetId: p,
    chainId: m,
    version: I
  } = n;
  return {
    name: t,
    baseChainHeight: x(r),
    consensusParameters: {
      version: I,
      chainId: x(m),
      baseAssetId: p,
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
        version: a.version,
        maxPredicateLength: x(a.maxPredicateLength),
        maxPredicateDataLength: x(a.maxPredicateDataLength),
        maxGasPerPredicate: x(a.maxGasPerPredicate),
        maxMessageDataLength: x(a.maxMessageDataLength)
      },
      scriptParameters: {
        version: o.version,
        maxScriptLength: x(o.maxScriptLength),
        maxScriptDataLength: x(o.maxScriptDataLength)
      },
      gasCosts: f
    }
  };
}, Hv = (e) => {
  const { name: t, baseChainHeight: r, consensusParameters: n } = e, {
    contractParameters: s,
    feeParameters: i,
    predicateParameters: a,
    scriptParameters: o,
    txParameters: u,
    gasCosts: f,
    baseAssetId: p,
    chainId: m,
    version: I
  } = n;
  return {
    name: t,
    daHeight: r.toString(),
    consensusParameters: {
      version: I,
      chainId: m.toString(),
      baseAssetId: p,
      feeParams: {
        version: i.version,
        gasPerByte: i.gasPerByte.toString(),
        gasPriceFactor: i.gasPriceFactor.toString()
      },
      contractParams: {
        version: s.version,
        contractMaxSize: s.contractMaxSize.toString(),
        maxStorageSlots: s.maxStorageSlots.toString()
      },
      txParams: {
        version: u.version,
        maxInputs: u.maxInputs.toString(),
        maxOutputs: u.maxOutputs.toString(),
        maxWitnesses: u.maxWitnesses.toString(),
        maxGasPerTx: u.maxGasPerTx.toString(),
        maxSize: u.maxSize.toString(),
        maxBytecodeSubsections: u.maxBytecodeSubsections.toString()
      },
      predicateParams: {
        version: a.version,
        maxPredicateLength: a.maxPredicateLength.toString(),
        maxPredicateDataLength: a.maxPredicateDataLength.toString(),
        maxGasPerPredicate: a.maxGasPerPredicate.toString(),
        maxMessageDataLength: a.maxMessageDataLength.toString()
      },
      scriptParams: {
        version: o.version,
        maxScriptLength: o.maxScriptLength.toString(),
        maxScriptDataLength: o.maxScriptDataLength.toString()
      },
      gasCosts: f
    }
  };
}, to = (e) => {
  const { maxDepth: t, maxTx: r, nodeVersion: n, utxoValidation: s, vmBacktrace: i } = e;
  return {
    maxDepth: x(t),
    maxTx: x(r),
    nodeVersion: n,
    utxoValidation: s,
    vmBacktrace: i
  };
}, Xv = (e) => {
  const { maxDepth: t, maxTx: r, nodeVersion: n, utxoValidation: s, vmBacktrace: i } = e;
  return {
    maxDepth: t.toString(),
    maxTx: r.toString(),
    nodeVersion: n,
    utxoValidation: s,
    vmBacktrace: i
  };
}, Zv = (e) => ({
  consensusParametersTimestamp: e.consensusParametersTimestamp,
  chain: Ka(e.chain),
  nodeInfo: to(e.nodeInfo)
}), Wv = async (e) => ({
  consensusParametersTimestamp: e.consensusParametersTimestamp,
  chain: Hv(await e.getChain()),
  nodeInfo: Xv(await e.getNode())
}), Bt = (e) => e || Tt, We = (e) => {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL": {
      const r = Bt(e.id || e.contractId);
      return {
        type: ut.Call,
        id: r,
        to: Bt(e == null ? void 0 : e.to),
        amount: x(e.amount),
        assetId: Bt(e.assetId),
        gas: x(e.gas),
        param1: x(e.param1),
        param2: x(e.param2),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "RETURN":
      return {
        type: ut.Return,
        id: Bt(e.id || e.contractId),
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ut.ReturnData,
        id: Bt(e.id || e.contractId),
        ptr: x(e.ptr),
        len: x(e.len),
        digest: Bt(e.digest),
        pc: x(e.pc),
        data: Bt(e.data),
        is: x(e.is)
      };
    case "PANIC":
      return {
        type: ut.Panic,
        id: Bt(e.id),
        reason: x(e.reason),
        pc: x(e.pc),
        is: x(e.is),
        contractId: Bt(e.contractId)
      };
    case "REVERT":
      return {
        type: ut.Revert,
        id: Bt(e.id || e.contractId),
        val: x(e.ra),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG": {
      const r = x(e.ra), n = x(e.rb), s = x(e.rc), i = x(e.rd);
      return {
        type: ut.Log,
        id: Bt(e.id || e.contractId),
        ra: r,
        rb: n,
        rc: s,
        rd: i,
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "LOG_DATA": {
      const r = x(e.ra), n = x(e.rb);
      return {
        type: ut.LogData,
        id: Bt(e.id || e.contractId),
        ra: r,
        rb: n,
        ptr: x(e.ptr),
        len: x(e.len),
        digest: Bt(e.digest),
        pc: x(e.pc),
        data: Bt(e.data),
        is: x(e.is)
      };
    }
    case "TRANSFER": {
      const r = Bt(e.id || e.contractId);
      return {
        type: ut.Transfer,
        id: r,
        to: Bt(e.toAddress || (e == null ? void 0 : e.to)),
        amount: x(e.amount),
        assetId: Bt(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "TRANSFER_OUT": {
      const r = Bt(e.id || e.contractId);
      return {
        type: ut.TransferOut,
        id: r,
        to: Bt(e.toAddress || e.to),
        amount: x(e.amount),
        assetId: Bt(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "SCRIPT_RESULT":
      return {
        type: ut.ScriptResult,
        result: x(e.result),
        gasUsed: x(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const r = Bt(e.sender), n = Bt(e.recipient), s = Bt(e.nonce), i = x(e.amount), a = e.data ? Z(e.data) : Uint8Array.from([]), o = Bt(e.digest), u = x(e.len).toNumber(), f = Dr.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: X(a)
      });
      return {
        type: ut.MessageOut,
        sender: r,
        recipient: n,
        amount: i,
        nonce: s,
        len: u,
        data: a,
        digest: o,
        messageId: f
      };
    }
    case "MINT": {
      const r = Bt(e.id || e.contractId), n = Bt(e.subId), s = Ga(r, n);
      return {
        type: ut.Mint,
        subId: n,
        contractId: r,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "BURN": {
      const r = Bt(e.id || e.contractId), n = Bt(e.subId), s = Ga(r, n);
      return {
        type: ut.Burn,
        subId: n,
        contractId: r,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    default:
      throw new C(M.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}, jv = (e) => e.type === ut.Revert && e.val.toString("hex") === dl, Jv = (e) => e.type === ut.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", p_ = (e) => e.reduce(
  (t, r) => (jv(r) && t.missingOutputVariables.push(r), Jv(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), e2 = (e) => We(e), qv = "https://app.fuel.network", $v = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, r2 = (e = {}) => {
  const { blockExplorerUrl: t, path: r, providerUrl: n, address: s, txId: i, blockNumber: a } = e, o = t || qv, u = [
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
      value: a
    }
  ], f = u.filter((Q) => !!Q.value).map(({ key: Q, value: T }) => ({
    key: Q,
    value: T
  })), p = f.length > 0;
  if (f.length > 1)
    throw new C(
      M.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${u.map((Q) => Q.key).join(", ")}.`
    );
  if (r && f.length > 0) {
    const Q = u.map(({ key: T }) => T).join(", ");
    throw new C(
      M.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${Q}.`
    );
  }
  const m = p ? $v(
    f[0].key,
    f[0].value
  ) : "", I = /^\/|\/$/gm, S = r ? r.replace(I, "") : m, F = o.replace(I, ""), R = n == null ? void 0 : n.replace(I, ""), D = R ? encodeURIComponent(R) : void 0, z = F.match(/^https?:\/\//) ? "" : "https://", Y = R != null && R.match(/^https?:\/\//) ? "" : "https://";
  return `${z}${F}/${S}${D ? `?providerUrl=${Y}${D}` : ""}`;
}, Ci = (e) => e.filter(
  (n) => n.type === ut.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), x(0));
function xe(e, t) {
  const r = x(t.base);
  let n = x(0);
  return "unitsPerGas" in t ? n = x(e).div(x(t.unitsPerGas)) : n = x(e).mul(x(t.gasPerUnit)), r.add(n);
}
function Kv(e, t, r) {
  const n = [], s = e.filter((o) => {
    if ("owner" in o || "sender" in o) {
      if ("predicate" in o && o.predicate && o.predicate !== "0x")
        return !0;
      if (!n.includes(o.witnessIndex))
        return n.push(o.witnessIndex), !0;
    }
    return !1;
  }), i = xe(t, r.vmInitialization);
  return s.reduce((o, u) => "predicate" in u && u.predicate && u.predicate !== "0x" ? o.add(
    i.add(xe(Z(u.predicate).length, r.contractRoot)).add(x(u.predicateGasUsed))
  ) : o.add(r.ecr1), x(0));
}
function Wl(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, a = xe(i, t.vmInitialization), o = x(i).mul(r), u = Kv(n, i, t);
  return a.add(o).add(u).add(s).maxU64();
}
function Yo(e) {
  const {
    gasPerByte: t,
    witnessesLength: r,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = x(0),
    maxGasPerTx: a
  } = e;
  let o = x(0);
  n != null && n.gt(0) && n.gte(r) && (o = x(n).sub(r).mul(t));
  const u = o.add(s).add(i);
  return u.gte(a) ? a : u;
}
function jl({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = xe(n, e.contractRoot), i = xe(t, e.stateRoot), a = xe(r, e.s256), o = x(100), u = xe(o, e.s256);
  return s.add(i).add(a).add(u).maxU64();
}
function Jl({
  gasCosts: e,
  txBytesSize: t
}) {
  return xe(t, e.s256);
}
function tC({
  gasCosts: e,
  txBytesSize: t,
  witnessBytesSize: r
}) {
  const n = xe(t, e.s256), s = xe(r, e.s256);
  return n.add(s);
}
function g_({
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
function eC({
  gasCosts: e,
  txBytesSize: t,
  subsectionSize: r,
  subsectionsSize: n
}) {
  const s = xe(t, e.s256), i = xe(r, e.s256);
  s.add(i);
  const a = xe(n, e.stateRoot);
  return s.add(a), s;
}
function rC({
  gasCosts: e,
  baseMinGas: t,
  subsectionSize: r
}) {
  const n = x(e.newStoragePerByte).mul(r);
  return x(t).add(n);
}
var En = (e) => {
  const { gas: t, gasPrice: r, priceFactor: n, tip: s } = e;
  return t.mul(r).div(n).add(x(s));
};
function eo(e) {
  return Object.keys(e).forEach((t) => {
    var r;
    switch ((r = e[t]) == null ? void 0 : r.constructor.name) {
      case "Uint8Array":
        e[t] = X(e[t]);
        break;
      case "Array":
        e[t] = eo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = eo(e[t]);
        break;
    }
  }), e;
}
function nC(e) {
  return eo(ve(e));
}
var sC = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return l0.includes(e) && (r = `${r}

You can read more about this error at:

${f0}#variant.${e}`), new C(M.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, Qn = (e) => JSON.stringify(e, null, 2), iC = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: a }) => a === ut.Revert);
  let i = "";
  if (s) {
    const a = x(s.val).toHex(), o = t[t.length - 1], u = t[t.length - 2];
    switch (a) {
      case d0: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Qn(o) : "an error."}.`;
        break;
      }
      case u0: {
        const f = t.length >= 2 ? ` comparing ${Qn(o)} and ${Qn(u)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${f}`;
        break;
      }
      case h0: {
        const f = t.length >= 2 ? ` comparing ${Qn(u)} and ${Qn(o)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${f}`;
        break;
      }
      case _0:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case dl:
        i = "MissingOutputVariable", n = `The transaction reverted because it's missing an "OutputVariable".`;
        break;
      default:
        throw new C(
          M.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...r,
            reason: "unknown"
          }
        );
    }
  }
  return new C(M.SCRIPT_REVERTED, n, {
    ...r,
    reason: i
  });
}, Ho = (e) => {
  const { receipts: t, statusReason: r, logs: n } = e, s = t.some(({ type: o }) => o === ut.Panic), i = t.some(({ type: o }) => o === ut.Revert), a = {
    logs: n,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? sC(r, a) : iC(t, n, a);
}, n2 = class extends Error {
  constructor() {
    super(...arguments);
    L(this, "name", "ChangeOutputCollisionError");
    L(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, aC = class extends Error {
  constructor(t) {
    super();
    L(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, s2 = class extends Error {
  constructor(t) {
    super();
    L(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, mr = (e) => e.type === vt.Coin, Bi = (e) => e.type === vt.Message, ql = (e) => e.type === vt.Message && x(e.data).isZero(), xi = (e) => mr(e) || Bi(e), Kr = (e) => mr(e) || ql(e), $l = (e) => mr(e) ? e.owner : e.recipient, ro = (e, t) => $l(e) === t.toB256(), w_ = (e) => xi(e) && !!e.predicate && X(e.predicate) !== "0x", oC = (e, t, r) => e.filter(Kr).reduce((n, s) => mr(s) && s.assetId === t || Bi(s) && t === r ? n.add(s.amount) : n, x(0)), i2 = (e) => e.filter(Kr).reduce(
  (t, r) => (mr(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), cC = (e, t) => e.reduce(
  (r, n) => (mr(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : Bi(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), dC = (e, t) => {
  const { inputs: r, outputs: n } = t, s = new Set(r.filter(mr).map((o) => o.assetId));
  r.some((o) => Bi(o) && x(o.amount).gt(0)) && s.add(e);
  const i = new Set(
    n.filter((o) => o.type === wt.Change).map((o) => o.assetId)
  );
  return new Set([...s].filter((o) => !i.has(o))).size;
}, Kl = (e, t, r = !1) => {
  if (r === !0 || dC(e, t) <= 0)
    return;
  const n = [
    "Asset burn detected.",
    "Add the relevant change outputs to the transaction to avoid burning assets.",
    "Or enable asset burn, upon sending the transaction."
  ].join(`
`);
  throw new C(M.ASSET_BURN_DETECTED, n);
}, uC = (e) => {
  const t = Z(e);
  return {
    data: X(t),
    dataLength: t.length
  };
}, Rn = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: e,
    maturity: t,
    expiration: r,
    maxFee: n,
    witnessLimit: s,
    inputs: i,
    outputs: a,
    witnesses: o
  } = {}) {
    /** Gas price for transaction */
    L(this, "tip");
    /** Block until which tx cannot be included */
    L(this, "maturity");
    /** The block number after which the transaction is no longer valid. */
    L(this, "expiration");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    L(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    L(this, "witnessLimit");
    /** List of inputs */
    L(this, "inputs", []);
    /** List of outputs */
    L(this, "outputs", []);
    /** List of witnesses */
    L(this, "witnesses", []);
    /**
     * @hidden
     *
     * The current status of the transaction
     */
    L(this, "flag", { state: void 0, transactionId: void 0, summary: void 0 });
    this.tip = e ? x(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.expiration = r && r > 0 ? r : void 0, this.witnessLimit = je(s) ? x(s) : void 0, this.maxFee = x(n), this.inputs = i ?? [], this.outputs = a ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const r = [], { tip: n, witnessLimit: s, maturity: i, expiration: a } = e;
    return x(n).gt(0) && (t += Qe.Tip, r.push({ data: x(n), type: Qe.Tip })), je(s) && x(s).gte(0) && (t += Qe.WitnessLimit, r.push({ data: x(s), type: Qe.WitnessLimit })), i && i > 0 && (t += Qe.Maturity, r.push({ data: i, type: Qe.Maturity })), t += Qe.MaxFee, r.push({ data: e.maxFee, type: Qe.MaxFee }), a && a > 0 && (t += Qe.Expiration, r.push({ data: a, type: Qe.Expiration })), {
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
    var i, a, o;
    const e = ((i = this.inputs) == null ? void 0 : i.map(Uv)) ?? [], t = ((a = this.outputs) == null ? void 0 : a.map(Vv)) ?? [], r = ((o = this.witnesses) == null ? void 0 : o.map(uC)) ?? [], { policyTypes: n, policies: s } = Rn.getPolicyMeta(this);
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
    return new nr().encode(this.toTransaction());
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
    return this.addWitness(at([Tt, Tt]));
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const r = new ct(e), n = this.getCoinInputWitnessIndexByOwner(r);
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
      throw new aC(e);
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
      (e) => e.type === vt.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === wt.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === wt.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = Ln(e), r = this.inputs.find((n) => {
      switch (n.type) {
        case vt.Coin:
          return X(n.owner) === t.toB256();
        case vt.Message:
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
    const { assetId: t, owner: r, amount: n, id: s, predicate: i, predicateData: a } = e;
    let o;
    e.predicate ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(r), typeof o != "number" && (o = this.addEmptyWitness()));
    const u = {
      id: s,
      type: vt.Coin,
      owner: r.toB256(),
      amount: n,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: o,
      predicate: i,
      predicateData: a
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
    const { recipient: t, sender: r, amount: n, predicate: s, nonce: i, predicateData: a } = e;
    let o;
    e.predicate ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(t), typeof o != "number" && (o = this.addEmptyWitness()));
    const u = {
      nonce: i,
      type: vt.Message,
      sender: r.toB256(),
      recipient: t.toB256(),
      data: A_(e) ? "0x" : e.data,
      amount: n,
      witnessIndex: o,
      predicate: s,
      predicateData: a
    };
    this.pushInput(u), A_(e) && this.addChangeOutput(t, e.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return Yv(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      type: wt.Coin,
      to: Ln(e).toB256(),
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
    return t.map(ko).forEach((r) => {
      this.pushOutput({
        type: wt.Coin,
        to: Ln(e).toB256(),
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
      type: wt.Change,
      to: Ln(e).toB256(),
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(e) {
    const { consensusParameters: t } = e, {
      gasCosts: r,
      feeParameters: { gasPerByte: n }
    } = t;
    return Wl({
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
      (a, o) => a + o.dataLength,
      0
    );
    return Yo({
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
    const n = (i) => this.inputs.find((a) => "assetId" in a ? a.assetId === i : !1), s = (i, a) => {
      const o = n(i);
      let u = a;
      i === t && (u = x("1000000000000000000")), o && "assetId" in o ? (o.id = X(ze(Gs)), o.amount = u) : this.addResources([
        {
          id: X(ze(Gs)),
          amount: u,
          assetId: i,
          owner: r || ct.fromRandom(),
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
    return nC(this);
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
    const t = e.filter(xi);
    this.inputs.filter(Kr).forEach((r) => {
      const n = $l(r), s = t.find(
        (i) => ro(i, new ct(String(n)))
      );
      s && "predicateGasUsed" in s && x(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
  /**
   * @hidden
   *
   * Used internally to update the state of a transaction request.
   *
   * @param state - The state to update.
   */
  updateState(e, t, r) {
    if (!t) {
      this.flag = { state: void 0, transactionId: void 0, summary: void 0 };
      return;
    }
    const n = this.getTransactionId(e);
    this.flag = { state: t, transactionId: n, summary: r };
  }
};
function _s(e, t) {
  const r = e.toTransaction();
  r.type === It.Script && (r.receiptsRoot = Tt), r.inputs = r.inputs.map((i) => {
    const a = ve(i);
    switch (a.type) {
      case vt.Coin:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.predicateGasUsed = x(0), a;
      case vt.Message:
        return a.predicateGasUsed = x(0), a;
      case vt.Contract:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.txID = Tt, a.outputIndex = 0, a.balanceRoot = Tt, a.stateRoot = Tt, a;
      default:
        return a;
    }
  }), r.outputs = r.outputs.map((i) => {
    const a = ve(i);
    switch (a.type) {
      case wt.Contract:
        return a.balanceRoot = Tt, a.stateRoot = Tt, a;
      case wt.Change:
        return a.amount = x(0), a;
      case wt.Variable:
        return a.to = Tt, a.amount = x(0), a.assetId = Tt, a;
      default:
        return a;
    }
  }), r.witnessesCount = 0, r.witnesses = [];
  const n = sg(t), s = at([n, new nr().encode(r)]);
  return ge(s);
}
var ci = class extends Rn {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, blobId: r, ...n }) {
    super(n);
    /** Type of the transaction */
    L(this, "type", It.Blob);
    /** Blob ID */
    L(this, "blobId");
    /** Witness index of the bytecode to create */
    L(this, "witnessIndex");
    this.blobId = r, this.witnessIndex = t ?? 0;
  }
  static from(t) {
    return new this(ve(t));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { witnessIndex: r, blobId: n } = this;
    return {
      type: It.Blob,
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
    return _s(this, t);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(t) {
    return tC({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, _C = (e) => {
  const t = new Uint8Array(32);
  return t.set(Z(e)), t;
}, hC = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: X(t),
    value: X(_C(r))
  };
}, no = class extends Rn {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: r, storageSlots: n, ...s }) {
    super(s);
    /** Type of the transaction */
    L(this, "type", It.Create);
    /** Witness index of contract bytecode to create */
    L(this, "bytecodeWitnessIndex");
    /** Salt */
    L(this, "salt");
    /** List of storage slots to initialize */
    L(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = X(r ?? Tt), this.storageSlots = [...n ?? []];
  }
  static from(t) {
    return new this(ve(t));
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var s;
    const t = this.getBaseTransaction(), r = this.bytecodeWitnessIndex, n = ((s = this.storageSlots) == null ? void 0 : s.map(hC)) ?? [];
    return {
      type: It.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: x(n.length),
      salt: this.salt ? X(this.salt) : Tt,
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
      (t) => t.type === wt.ContractCreated
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
    return _s(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, r) {
    this.pushOutput({
      type: wt.ContractCreated,
      contractId: t,
      stateRoot: r
    });
  }
  metadataGas(t) {
    return jl({
      contractBytesSize: x(Z(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, m_ = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Z("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, lC = {
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
  bytes: Z("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Xr = class extends Rn {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: r, gasLimit: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    L(this, "type", It.Script);
    /** Gas limit for transaction */
    L(this, "gasLimit");
    /** Script to execute */
    L(this, "script");
    /** Script input data (parameters) */
    L(this, "scriptData");
    L(this, "abis");
    this.gasLimit = x(n), this.script = Z(t ?? m_.bytes), this.scriptData = Z(r ?? m_.encodeScriptData()), this.abis = s.abis;
  }
  static from(t) {
    return new this(ve(t));
  }
  /**
   * Helper function to estimate and fund the transaction request with a specified account.
   *
   * @param account - The account to fund the transaction.
   * @param params - The parameters for the transaction cost.
   * @returns The current instance of the `ScriptTransactionRequest` funded.
   */
  async estimateAndFund(t, { signatureCallback: r, quantities: n = [] } = {}) {
    const s = await t.getTransactionCost(this, { signatureCallback: r, quantities: n });
    return this.maxFee = s.maxFee, this.gasLimit = s.gasUsed, await t.fund(this, s), this;
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const t = Z(this.script ?? "0x"), r = Z(this.scriptData ?? "0x");
    return {
      type: It.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: x(t.length),
      scriptDataLength: x(r.length),
      receiptsRoot: Tt,
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
      (t) => t.type === vt.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === wt.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === wt.Variable
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
        type: wt.Variable
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
    } = n, a = this.toTransaction().witnesses.reduce(
      (o, u) => o + u.dataLength,
      0
    );
    return Yo({
      gasPerByte: s,
      minGas: r,
      witnessesLength: a,
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
    const r = Ln(t);
    if (this.getContractInputs().find((s) => s.contractId === r.toB256()))
      return this;
    const n = super.pushInput({
      type: vt.Contract,
      contractId: r.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: wt.Contract,
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
    return _s(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, r) {
    const n = new wr(t);
    return this.scriptData = n.functions.main.encodeArguments(r), this;
  }
  metadataGas(t) {
    return Jl({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, so = class extends Rn {
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
    L(this, "type", It.Upgrade);
    /** The upgrade purpose */
    L(this, "upgradePurpose");
    /** Witness index of consensus */
    L(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = r ?? 0, this.upgradePurpose = t ?? {
      type: ke.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(t) {
    return t instanceof so ? t : new this(ve(t));
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
      checksum: sr(t)
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
      throw new C(C.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: It.Upgrade,
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
    return _s(this, t);
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
      return g_({
        gasCosts: t,
        txBytesSize: r,
        consensusSize: s
      });
    }
    if (this.upgradePurpose.type === ke.StateTransition)
      return g_({
        gasCosts: t,
        txBytesSize: r
      });
    throw new C(C.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, io = class extends Rn {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, subsection: r, ...n } = {}) {
    super(n);
    /** Type of the transaction */
    L(this, "type", It.Upload);
    /** The witness index of the subsection of the bytecode. */
    L(this, "witnessIndex");
    /** The subsection data. */
    L(this, "subsection");
    this.witnessIndex = t ?? 0, this.subsection = r ?? {
      proofSet: [],
      root: Tt,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(t) {
    return t instanceof io ? t : new this(ve(t));
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
    return _s(this, t);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { subsectionIndex: r, subsectionsNumber: n, root: s, proofSet: i } = this.subsection;
    return {
      type: It.Upload,
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
    return eC({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      subsectionSize: Z(this.witnesses[this.witnessIndex]).length,
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
    const r = super.calculateMinGas(t), { gasCosts: n } = t.consensusParameters, s = this.witnesses[this.witnessIndex] ?? Tt;
    return rC({
      gasCosts: n,
      baseMinGas: r.toNumber(),
      subsectionSize: Z(s).length
    });
  }
}, a2 = class {
}, Re = (e) => {
  if (e instanceof Xr || e instanceof no || e instanceof ci || e instanceof so || e instanceof io)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case It.Script:
      return Xr.from(e);
    case It.Create:
      return no.from(e);
    case It.Blob:
      return ci.from(e);
    case It.Upgrade:
      return so.from(e);
    case It.Upload:
      return io.from(e);
    default:
      throw new C(
        M.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, Pr = (e) => e.type === It.Script, fC = (e) => e.type === It.Create, o2 = (e) => e.type === It.Blob, c2 = (e) => e.type === It.Upgrade, d2 = (e) => e.type === It.Upload, On = /* @__PURE__ */ new Map(), y_ = class {
  constructor(e) {
    L(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new C(
        M.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(e, t) {
    const r = this.setupResourcesCache(t);
    On.set(e, r);
  }
  unset(e) {
    On.delete(e);
  }
  getActiveData(e) {
    const t = { utxos: [], messages: [] }, r = Date.now(), n = [];
    return On.forEach((s, i) => {
      if (r - s.timestamp < this.ttl) {
        const o = s.owners.get(e);
        o && (t.utxos.push(...o.utxos), t.messages.push(...o.messages));
      } else
        n.push(i);
    }), n.forEach(this.unset), t.utxos.reverse(), t.messages.reverse(), t;
  }
  isCached(e, t) {
    const r = Date.now();
    let n = !1;
    const s = [];
    for (const [i, a] of On.entries())
      if (r - a.timestamp < this.ttl) {
        const u = a.owners.get(e);
        if (u != null && u.utxos.has(t) || u != null && u.messages.has(t)) {
          n = !0;
          break;
        }
      } else
        s.push(i);
    return s.forEach(this.unset), n;
  }
  clear() {
    On.clear();
  }
  setupResourcesCache(e) {
    const t = Date.now(), r = {
      owners: /* @__PURE__ */ new Map(),
      timestamp: t
    };
    return e.filter(xi).forEach((n) => {
      var o, u;
      const { owner: s, key: i, type: a } = this.extractResourceData(n);
      r.owners.has(s) || r.owners.set(s, { utxos: /* @__PURE__ */ new Set(), messages: /* @__PURE__ */ new Set() }), a === "utxo" ? (o = r.owners.get(s)) == null || o.utxos.add(i) : (u = r.owners.get(s)) == null || u.messages.add(i);
    }), r;
  }
  extractResourceData(e) {
    return mr(e) ? { owner: X(e.owner), key: X(e.id), type: "utxo" } : { owner: X(e.recipient), key: X(e.nonce), type: "message" };
  }
}, AC = (e) => {
  var O;
  const {
    gasPrice: t,
    rawPayload: r,
    tip: n,
    consensusParameters: { gasCosts: s, feeParams: i, maxGasPerTx: a }
  } = e, o = x(i.gasPerByte), u = x(i.gasPriceFactor), f = Z(r), [p] = new nr().decode(f, 0), { type: m, witnesses: I, inputs: S, policies: F } = p;
  let R = x(0), D = x(0);
  if (m !== It.Create && m !== It.Script)
    return x(0);
  if (m === It.Create) {
    const { bytecodeWitnessIndex: P, storageSlots: G } = p, k = x(Z(I[P].data).length);
    R = jl({
      contractBytesSize: k,
      gasCosts: s,
      stateRootSize: G.length || 0,
      txBytesSize: f.length
    });
  } else {
    const { scriptGasLimit: P } = p;
    P && (D = P), R = Jl({
      gasCosts: s,
      txBytesSize: f.length
    });
  }
  const z = Wl({
    gasCosts: s,
    gasPerByte: x(o),
    inputs: S,
    metadataGas: R,
    txBytesSize: f.length
  }), Y = (O = F.find((P) => P.type === Qe.WitnessLimit)) == null ? void 0 : O.data, U = I.reduce((P, G) => P + G.dataLength, 0), Q = Yo({
    gasPerByte: o,
    minGas: z,
    witnessesLength: U,
    gasLimit: D,
    witnessLimit: Y,
    maxGasPerTx: a
  });
  return En({
    gasPrice: t,
    gas: Q,
    priceFactor: u,
    tip: n
  });
};
function pC(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function Xo(e, t) {
  return e.filter((r) => r.type === t);
}
function gC(e) {
  return Xo(e, vt.Coin);
}
function wC(e) {
  return Xo(e, vt.Message);
}
function tf(e) {
  return pC(e, [vt.Coin, vt.Message]);
}
function b_(e) {
  return e.type === vt.Coin;
}
function mC(e) {
  return Xo(e, vt.Contract);
}
function yC(e, t) {
  return gC(e).find((n) => n.assetId === t);
}
function bC(e, t) {
  const r = /* @__PURE__ */ new Map();
  return tf(e).forEach((n) => {
    const s = b_(n) ? n.assetId : t, i = b_(n) ? n.owner : n.recipient;
    let a = r.get(s);
    a || (a = /* @__PURE__ */ new Map(), r.set(s, a));
    let o = a.get(i);
    o || (o = new Mt(0), a.set(i, o)), a.set(i, o.add(n.amount));
  }), r;
}
function IC(e) {
  var t;
  return (t = wC(e)) == null ? void 0 : t[0];
}
function ef(e, t, r = !1) {
  const n = yC(e, t);
  if (n)
    return n;
  if (r)
    return IC(e);
}
function EC(e, t) {
  if (t == null)
    return;
  const r = e == null ? void 0 : e[t];
  if (r) {
    if (r.type !== vt.Contract)
      throw new C(
        M.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return r;
  }
}
function Zo(e) {
  return e.type === vt.Coin ? e.owner.toString() : e.type === vt.Message ? e.recipient.toString() : "";
}
function hs(e, t) {
  return e.filter((r) => r.type === t);
}
function vC(e) {
  return hs(e, wt.ContractCreated);
}
function rf(e) {
  return hs(e, wt.Coin);
}
function CC(e) {
  return hs(e, wt.Change);
}
function BC(e) {
  return hs(e, wt.Contract);
}
function u2(e) {
  return hs(e, wt.Variable);
}
var xC = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(xC || {}), nf = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(nf || {}), RC = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(RC || {}), SC = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(SC || {}), TC = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(TC || {});
function Jn(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function sf(e) {
  switch (e) {
    case It.Mint:
      return "Mint";
    case It.Create:
      return "Create";
    case It.Script:
      return "Script";
    case It.Blob:
      return "Blob";
    case It.Upgrade:
      return "Upgrade";
    case It.Upload:
      return "Upload";
    default:
      throw new C(
        M.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function Sn(e, t) {
  return sf(e) === t;
}
function NC(e) {
  return Sn(
    e,
    "Mint"
    /* Mint */
  );
}
function af(e) {
  return Sn(
    e,
    "Create"
    /* Create */
  );
}
function of(e) {
  return Sn(
    e,
    "Script"
    /* Script */
  );
}
function DC(e) {
  return Sn(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function FC(e) {
  return Sn(
    e,
    "Upload"
    /* Upload */
  );
}
function QC(e) {
  return Sn(
    e,
    "Blob"
    /* Blob */
  );
}
function _2(e) {
  return (t) => e.assetId === t.assetId;
}
function OC(e) {
  return Jn(e, ut.Call);
}
function MC(e) {
  return Jn(e, ut.MessageOut);
}
function LC(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const a = s.get(i.assetId);
    a ? a.amount = x(a.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function PC(e, t) {
  var r, n, s, i, a, o, u, f;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((a = e.from) == null ? void 0 : a.type) === ((o = t.from) == null ? void 0 : o.type) && ((u = e.to) == null ? void 0 : u.type) === ((f = t.to) == null ? void 0 : f.type);
}
function kC(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? LC(e, t) : t.assetsSent : e.assetsSent;
}
function zC(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function GC(e, t) {
  var r;
  return {
    ...e,
    assetsSent: kC(e, t),
    calls: zC(e, t),
    receipts: [
      ...e.receipts || [],
      ...((r = t.receipts) == null ? void 0 : r.filter((n) => {
        var s;
        return !((s = e.receipts) != null && s.some((i) => i === n));
      })) || []
    ]
  };
}
function qn(e, t) {
  const r = e.findIndex((n) => PC(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? GC(n, t) : n);
}
function h2(e) {
  return Jn(e, ut.TransferOut);
}
function UC({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return MC(t).reduce(
    (i, a) => {
      const o = ef(e, r, !0);
      if (o) {
        const u = Zo(o);
        return qn(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: u
          },
          to: {
            type: 1,
            address: a.recipient.toString(),
            chain: "ethereum"
            /* ethereum */
          },
          assetsSent: [
            {
              amount: a.amount,
              assetId: r
            }
          ],
          receipts: [a]
        });
      }
      return i;
    },
    []
  );
}
function VC(e, t, r, n, s) {
  return (t == null ? void 0 : t[e.contractID]) ? [] : [];
}
function YC(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function HC(e, t, r, n, s, i, a) {
  const o = e.assetId === Tt ? a : e.assetId, u = ef(r, o, o === a);
  if (!u)
    return [];
  const f = Zo(u), p = VC(t, n);
  return [
    {
      name: "Contract call",
      from: {
        type: 1,
        address: f
      },
      to: {
        type: 0,
        address: e.to
      },
      assetsSent: YC(e),
      calls: p,
      receipts: [e]
    }
  ];
}
function XC({
  inputs: e,
  outputs: t,
  receipts: r,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: a
}) {
  const o = OC(r);
  return BC(t).flatMap((f) => {
    const p = EC(e, f.inputIndex);
    return p ? o.filter((m) => m.to === p.contractID).flatMap(
      (m) => HC(
        m,
        p,
        e,
        n,
        s,
        i,
        a
      )
    ) : [];
  });
}
function ZC(e, t, r) {
  const { to: n, assetId: s, amount: i } = e;
  let { id: a } = e;
  const o = t.some((f) => f.contractID === n) ? 0 : 1;
  if (Tt === a) {
    const f = r.find((p) => p.assetId === s);
    a = (f == null ? void 0 : f.to) || a;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((f) => f.contractID === a) ? 0 : 1,
      address: a
    },
    to: {
      type: o,
      address: n
    },
    assetsSent: [
      {
        assetId: s.toString(),
        amount: i
      }
    ],
    receipts: [e]
  };
}
function WC({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = rf(t), a = mC(e), o = CC(t), u = bC(e, n);
  i.forEach(({ amount: m, assetId: I, to: S }) => {
    const F = u.get(I) || /* @__PURE__ */ new Map();
    let R, D;
    for (const [z, Y] of F)
      if (D || (D = z), Y.gte(m)) {
        R = z;
        break;
      }
    R = R || D, R && (s = qn(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: R
      },
      to: {
        type: 1,
        address: S
      },
      assetsSent: [{ assetId: I, amount: m }]
    }));
  });
  const f = Jn(
    r,
    ut.Transfer
  ), p = Jn(
    r,
    ut.TransferOut
  );
  return [...f, ...p].forEach((m) => {
    const I = ZC(m, a, o);
    s = qn(s, I);
  }), s;
}
function jC(e) {
  return rf(e).reduce((n, s) => qn(n, {
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
function JC({ inputs: e, outputs: t }) {
  const r = vC(t), n = tf(e)[0], s = Zo(n);
  return r.reduce((a, o) => qn(a, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (o == null ? void 0 : o.contractId) || ""
    }
  }), []);
}
function qC({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: a,
  baseAssetId: o
}) {
  return af(e) ? [...JC({ inputs: t, outputs: r })] : of(e) ? [
    ...WC({ inputs: t, outputs: r, receipts: n, baseAssetId: o }),
    ...XC({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: a,
      baseAssetId: o
    }),
    ...UC({ inputs: t, receipts: n, baseAssetId: o })
  ] : [...jC(r)];
}
var l2 = (e) => We(e), $C = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === ut.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, KC = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === ut.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, t1 = (e) => {
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
      throw new C(
        M.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, e1 = (e) => {
  var p, m;
  let t, r, n, s, i, a = !1, o = !1, u = !1;
  if (e != null && e.type)
    switch (n = t1(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, r = (p = e.block) == null ? void 0 : p.id, o = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, r = (m = e.block) == null ? void 0 : m.id, a = !0, s = x(e.totalFee), i = x(e.totalGas);
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
    isStatusFailure: a,
    isStatusSuccess: o,
    isStatusPending: u
  };
}, cf = (e) => e && "totalFee" in e ? x(e.totalFee) : void 0;
function ls(e) {
  var _, A;
  const {
    id: t,
    receipts: r,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: a,
    gqlTransactionStatus: o,
    abiMap: u = {},
    maxInputs: f,
    gasCosts: p,
    maxGasPerTx: m,
    gasPrice: I,
    baseAssetId: S
  } = e, F = Ci(r), R = X(a), D = qC({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: R,
    abiMap: u,
    maxInputs: f,
    baseAssetId: S
  }), z = sf(i.type), Y = x((A = (_ = i.policies) == null ? void 0 : _.find((w) => w.type === Qe.Tip)) == null ? void 0 : A.data), { isStatusFailure: U, isStatusPending: Q, isStatusSuccess: T, blockId: O, status: P, time: G, totalFee: k } = e1(o), W = k ?? AC({
    gasPrice: I,
    rawPayload: R,
    tip: Y,
    consensusParameters: {
      gasCosts: p,
      maxGasPerTx: m,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), j = $C(r), J = KC(r);
  let v;
  return G && (v = Ao.fromTai64(G)), {
    id: t,
    tip: Y,
    fee: W,
    gasUsed: F,
    operations: D,
    type: z,
    blockId: O,
    time: G,
    status: P,
    receipts: r,
    mintedAssets: j,
    burnedAssets: J,
    isTypeMint: NC(i.type),
    isTypeCreate: af(i.type),
    isTypeScript: of(i.type),
    isTypeUpgrade: DC(i.type),
    isTypeUpload: FC(i.type),
    isTypeBlob: QC(i.type),
    isStatusFailure: U,
    isStatusSuccess: T,
    isStatusPending: Q,
    date: v,
    transaction: i
  };
}
function Wo(e, t, r = {}) {
  return e.reduce((n, s) => {
    if (s.type === ut.LogData || s.type === ut.Log) {
      const i = new wr(r[s.id] || t), a = s.type === ut.Log ? new et("u64").encode(s.ra) : s.data, [o] = i.decodeLog(a, s.rb.toString());
      n.push(o);
    }
    return n;
  }, []);
}
function r1(e) {
  return e.map((t) => {
    const r = "amount" in t ? { ...t, amount: x(t.amount) } : t;
    switch (r.type) {
      case "CoinOutput":
        return { ...r, type: wt.Coin };
      case "ContractOutput":
        return {
          ...r,
          type: wt.Contract,
          inputIndex: parseInt(r.inputIndex, 10)
        };
      case "ChangeOutput":
        return {
          ...r,
          type: wt.Change
        };
      case "VariableOutput":
        return { ...r, type: wt.Variable };
      case "ContractCreated":
        return {
          ...r,
          type: wt.ContractCreated,
          contractId: r.contract
        };
      default:
        return zA();
    }
  });
}
var ao = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(e, t, r, n, s) {
    /** Transaction ID */
    L(this, "id");
    /** Current provider */
    L(this, "provider");
    /** Gas used on the transaction */
    L(this, "gasUsed", x(0));
    /** The graphql Transaction with receipts object. */
    L(this, "gqlTransaction");
    L(this, "request");
    L(this, "status");
    L(this, "abis");
    this.submitTxSubscription = s, this.id = typeof e == "string" ? e : e.getTransactionId(r), this.provider = t, this.abis = n, this.request = typeof e == "string" ? void 0 : e, this.waitForResult = this.waitForResult.bind(this);
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
    const n = await t.getChainId(), s = new ao(e, t, n, r);
    return await s.fetch(), s;
  }
  applyMalleableSubscriptionFields(e) {
    const t = this.status;
    if (!t)
      return;
    const r = e;
    (t.type === "SuccessStatus" || t.type === "FailureStatus") && (r.inputs = r.inputs.map((n, s) => {
      var i;
      if ("txPointer" in n) {
        const a = (i = t.transaction.inputs) == null ? void 0 : i[s];
        return {
          ...n,
          txPointer: Jr.decodeFromGqlScalar(a.txPointer)
        };
      }
      return n;
    }), r.outputs = r1(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
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
      bytes: Z(e.rawPayload)
    };
  }
  getReceipts() {
    var t;
    const e = this.status ?? ((t = this.gqlTransaction) == null ? void 0 : t.status);
    switch (e == null ? void 0 : e.type) {
      case "SuccessStatus":
      case "FailureStatus":
        return e.receipts.map(We);
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
    return (t = new nr().decode(
      Z(e.rawPayload),
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
    var I, S;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: a } = await this.provider.getGasConfig(), u = cf(this.status ?? ((I = this.gqlTransaction) == null ? void 0 : I.status)) ? x(0) : await this.provider.getLatestGasPrice(), f = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs, p = await this.provider.getBaseAssetId();
    return ls({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((S = this.gqlTransaction) == null ? void 0 : S.status),
      gasPerByte: n,
      gasPriceFactor: s,
      abiMap: e,
      maxInputs: f,
      gasCosts: i,
      maxGasPerTx: a,
      gasPrice: u,
      baseAssetId: p
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
        throw this.unsetResourceCache(), new C(
          M.TRANSACTION_SQUEEZED_OUT,
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
    var a;
    const t = await this.getTransactionSummary(e), r = {
      ...t
    };
    let n = [];
    this.abis && (n = Wo(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), r.logs = n);
    const { receipts: s } = r, i = this.status ?? ((a = this.gqlTransaction) == null ? void 0 : a.status);
    if ((i == null ? void 0 : i.type) === "FailureStatus") {
      const { reason: o } = i;
      throw Ho({
        receipts: s,
        statusReason: o,
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
    return await this.waitForStatusChange(), this.unsetResourceCache(), this.assembleResult(e);
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
function n1(e, t) {
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
function df(e, t, r = 0) {
  return t === void 0 ? e : async (...n) => {
    var s;
    try {
      return await e(...n);
    } catch (i) {
      const a = i;
      if (((s = a.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw a;
      const o = r + 1;
      if (o > t.maxRetries)
        throw a;
      const u = n1(t, o);
      return await NA(u), df(e, t, o)(...n);
    }
  };
}
var s1 = (e) => {
  const { userInput: t, cached: r, maxInputs: n } = e, s = { ...t };
  let i = s.utxos.length + s.messages.length;
  return i >= n || (s.utxos = [...s.utxos, ...r.utxos.slice(0, n - i)], i = s.utxos.length + s.messages.length, i < n && (s.messages = [...s.messages, ...r.messages.slice(0, n - i)])), s;
}, an = (e) => {
  const { paginationLimit: t, inputArgs: r = {} } = e, { first: n, last: s, after: i, before: a } = r;
  if (i && a)
    throw new C(
      M.INVALID_INPUT_PARAMETERS,
      'Pagination arguments "after" and "before" cannot be used together'
    );
  if ((n || 0) > t || (s || 0) > t)
    throw new C(
      M.INVALID_INPUT_PARAMETERS,
      `Pagination limit for this query cannot exceed ${t} items`
    );
  if (n && a)
    throw new C(
      M.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "first" with "before" is not supported'
    );
  if (s && i)
    throw new C(
      M.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "last" with "after" is not supported'
    );
  return !n && !s && (r.first = t), r;
}, I_ = 10, E_ = 512, uf = 60, i1 = 100, a1 = 5, o1 = 2e4, c1 = 1.2, oo, _f, Ot = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    Tr(this, oo), Ct(this, "operations"), Ct(this, "cache"), Ct(this, "url"), Ct(this, "urlWithoutAuth"), Ct(this, "features", {
      balancePagination: !1,
      amount128: !1
    }), Ct(this, "consensusParametersTimestamp"), Ct(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0,
      cache: void 0
    });
    const { url: r, urlWithoutAuth: n, headers: s } = Ot.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.url = e;
    const { FUELS: i } = Y_, a = { ...s, ...t.headers, Source: `ts-sdk-${i}` };
    this.options = {
      ...this.options,
      ...t,
      headers: a
    }, this.operations = this.createOperations();
    const { resourceCacheTTL: o, cache: u } = this.options;
    if (u) {
      const { consensusParametersTimestamp: f, chain: p, nodeInfo: m } = Zv(u);
      this.consensusParametersTimestamp = f, Ot.chainInfoCache[this.urlWithoutAuth] = p, Ot.nodeInfoCache[this.urlWithoutAuth] = m;
    }
    je(o) ? o !== -1 ? this.cache = new y_(o) : this.cache = void 0 : this.cache = new y_(o1);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    Ot.nodeInfoCache = {}, Ot.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r, headers: n } = e;
    return df(async (...s) => {
      const i = s[0], a = s[1], o = r ? AbortSignal.timeout(r) : void 0;
      let u = {
        ...a,
        signal: o,
        headers: { ...a == null ? void 0 : a.headers, ...n }
      };
      return e.requestMiddleware && (u = await e.requestMiddleware(u)), e.fetch ? e.fetch(i, u, e) : fetch(i, u);
    }, t);
  }
  static extractBasicAuth(e) {
    let t;
    try {
      t = new URL(e);
    } catch (i) {
      throw new C(C.CODES.INVALID_URL, "Invalid URL provided.", { url: e }, i);
    }
    const r = t.username, n = t.password, s = `${t.origin}${t.pathname}`;
    return r && n ? {
      url: e,
      urlWithoutAuth: s,
      headers: { Authorization: `Basic ${btoa(`${r}:${n}`)}` }
    } : { url: e, urlWithoutAuth: e, headers: void 0 };
  }
  /**
   * Initialize Provider async stuff
   */
  async init() {
    const { nodeInfo: e } = await this.fetchChainAndNodeInfo();
    return this.setupFeatures(e.nodeVersion), this;
  }
  /**
   * Returns the `chainInfo` for the current network.
   *
   * @returns the chain information configuration.
   */
  async getChain() {
    return await this.init(), Ot.chainInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns the `nodeInfo` for the current network.
   *
   * @returns the node information configuration.
   */
  async getNode() {
    return await this.init(), Ot.nodeInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  async getGasConfig() {
    const {
      txParameters: { maxGasPerTx: e },
      predicateParameters: { maxGasPerPredicate: t },
      feeParameters: { gasPriceFactor: r, gasPerByte: n },
      gasCosts: s
    } = (await this.getChain()).consensusParameters;
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
    const { url: r, urlWithoutAuth: n, headers: s } = Ot.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = t ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...s } }, this.operations = this.createOperations(), await this.init();
  }
  /**
   * Return the chain and node information.
   * @param ignoreCache - If true, ignores the cache and re-fetch configs.
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo(e = !1) {
    let t, r;
    try {
      if (t = Ot.nodeInfoCache[this.urlWithoutAuth], r = Ot.chainInfoCache[this.urlWithoutAuth], e || (!t || !r))
        throw new Error("Jumps to the catch block and re-fetch");
    } catch {
      const s = await this.operations.getChainAndNodeInfo();
      t = to(s.nodeInfo), Ot.setIncompatibleNodeVersionMessage(t), r = Ka(s.chain), Ot.chainInfoCache[this.urlWithoutAuth] = r, Ot.nodeInfoCache[this.urlWithoutAuth] = t, this.consensusParametersTimestamp = Date.now();
    }
    return {
      chain: r,
      nodeInfo: t
    };
  }
  /**
   * @hidden
   */
  static setIncompatibleNodeVersionMessage(e) {
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = Xf(e.nodeVersion);
    (!t || !r) && (Ot.incompatibleNodeVersionMessage = [
      `The Fuel Node that you are trying to connect to is using fuel-core version ${e.nodeVersion}.`,
      `The TS SDK currently supports fuel-core version ${n}.`,
      "Things may not work as expected."
    ].join(`
`), oi.incompatibleNodeVersionMessage = Ot.incompatibleNodeVersionMessage);
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  createOperations() {
    const e = Ot.getFetchFn(this.options), t = new $w(this.urlWithoutAuth, {
      fetch: (s, i) => e(s.toString(), i || {}, this.options),
      responseMiddleware: (s) => {
        if ("response" in s) {
          const i = s.response;
          Zl(
            i.errors,
            Ot.incompatibleNodeVersionMessage
          );
        }
      }
    }), r = (s, i) => {
      const a = s.definitions.find((u) => u.kind === "OperationDefinition");
      return (a == null ? void 0 : a.operation) === "subscription" ? oi.create({
        url: this.urlWithoutAuth,
        query: s,
        fetchFn: (u, f) => e(u, f, this.options),
        variables: i
      }) : t.request(s, i);
    }, n = (s) => ({
      getBlobs(i) {
        const a = i.blobIds.map((p, m) => `$blobId${m}: BlobId!`).join(", "), o = i.blobIds.map((p, m) => `blob${m}: blob(id: $blobId${m}) { id }`).join(`
`), u = i.blobIds.reduce(
          (p, m, I) => (p[`blobId${I}`] = m, p),
          {}
        ), f = $`
          query getBlobs(${a}) {
            ${o}
          }
        `;
        return s(f, u);
      }
    });
    return { ...zv(r), ...n(r) };
  }
  /**
   * @hidden
   */
  setupFeatures(e) {
    Uf(e, "0.41.0") && (this.features.balancePagination = !0, this.features.amount128 = !0);
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
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = to(e);
    return Ot.nodeInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = Ka(e);
    return Ot.chainInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  async getChainId() {
    const {
      consensusParameters: { chainId: e }
    } = await this.getChain();
    return e.toNumber();
  }
  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
   */
  async getBaseAssetId() {
    const e = await this.getChain(), {
      consensusParameters: { baseAssetId: t }
    } = e;
    return t;
  }
  /**
   * Retrieves the details of an asset given its ID.
   *
   * @param assetId - The unique identifier of the asset.
   * @returns A promise that resolves to an object containing the asset details.
   */
  async getAssetDetails(e) {
    const { assetDetails: t } = await this.operations.getAssetDetails({ assetId: e }), { contractId: r, subId: n, totalSupply: s } = t;
    return {
      subId: n,
      contractId: r,
      totalSupply: x(s)
    };
  }
  /**
   * @hidden
   */
  async validateTransaction(e) {
    const {
      consensusParameters: {
        txParameters: { maxInputs: t, maxOutputs: r }
      }
    } = await this.getChain();
    if (x(e.inputs.length).gt(t))
      throw new C(
        M.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${e.inputs.length}, max inputs: ${t}`
      );
    if (x(e.outputs.length).gt(r))
      throw new C(
        M.MAX_OUTPUTS_EXCEEDED,
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
  async sendTransaction(e, { estimateTxDependencies: t = !0, enableAssetBurn: r } = {}) {
    const n = Re(e);
    Kl(
      await this.getBaseAssetId(),
      n,
      r
    ), t && await this.estimateTxDependencies(n), await this.validateTransaction(n);
    const s = X(n.toTransactionBytes());
    let i;
    Pr(n) && (i = n.abis);
    const a = await this.operations.submitAndAwaitStatus({ encodedTransaction: s });
    $a(this, oo, _f).call(this, n.inputs, n.getTransactionId(await this.getChainId()));
    const o = await this.getChainId();
    return new ao(n, this, o, i, a);
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
    }), [{ receipts: a, status: o }] = i;
    return { receipts: a.map(We), dryRunStatus: o };
  }
  /**
   * Estimates the gas usage for predicates in a transaction request.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request to estimate predicates for.
   * @returns A promise that resolves to the updated transaction request with estimated gas usage for predicates.
   */
  async estimatePredicates(e) {
    if (!e.inputs.some(
      (i) => w_(i) && x(i.predicateGasUsed).isZero()
    ))
      return e;
    const r = X(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: r
    }), { estimatePredicates: s } = n;
    return e = this.parseEstimatePredicatesResponse(
      e,
      s
    ), e;
  }
  /**
   * Estimates the gas price and predicates for a given transaction request and block horizon.
   *
   * @param transactionRequest - The transaction request to estimate predicates and gas price for.
   * @param blockHorizon - The block horizon to use for gas price estimation.
   * @returns A promise that resolves to an object containing the updated transaction
   * request and the estimated gas price.
   */
  async estimatePredicatesAndGasPrice(e, t) {
    if (!e.inputs.some(
      (i) => w_(i) && x(i.predicateGasUsed).isZero()
    )) {
      const i = await this.estimateGasPrice(t);
      return { transactionRequest: e, gasPrice: i };
    }
    const {
      estimateGasPrice: { gasPrice: n },
      estimatePredicates: s
    } = await this.operations.estimatePredicatesAndGasPrice({
      blockHorizon: String(t),
      encodedTransaction: X(e.toTransactionBytes())
    });
    return e = this.parseEstimatePredicatesResponse(
      e,
      s
    ), { transactionRequest: e, gasPrice: x(n) };
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @param gasPrice - The gas price to use for the transaction, if not provided it will be fetched.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(e, { gasPrice: t } = {}) {
    if (fC(e))
      return {
        rawReceipts: [],
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let r = [], n = [];
    const s = [];
    let i = 0, a;
    await this.validateTransaction(e);
    const o = t ?? await this.estimateGasPrice(10);
    for (let u = 0; u < I_; u++) {
      const {
        dryRun: [{ receipts: f, status: p }]
      } = await this.operations.dryRun({
        encodedTransactions: [X(e.toTransactionBytes())],
        utxoValidation: !1,
        gasPrice: o.toString()
      });
      r = f, n = f.map(We), a = p;
      const { missingOutputVariables: m, missingOutputContractIds: I } = p_(n);
      if ((m.length !== 0 || I.length !== 0) && Pr(e)) {
        i += m.length, e.addVariableOutputs(m.length), I.forEach(({ contractId: R }) => {
          e.addContractInputAndOutput(new ct(R)), s.push(R);
        });
        const { maxFee: F } = await this.estimateTxGasAndFee({
          transactionRequest: e,
          gasPrice: o
        });
        e.maxFee = F;
      } else
        break;
    }
    return {
      rawReceipts: r,
      receipts: n,
      outputVariables: i,
      missingContractIds: s,
      dryRunStatus: a
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
      rawReceipts: [],
      receipts: [],
      outputVariables: 0,
      missingContractIds: [],
      dryRunStatus: void 0
    })), r = ve(e), n = /* @__PURE__ */ new Map();
    r.forEach((a, o) => {
      Pr(a) && n.set(o, X(a.toTransactionBytes()));
    });
    let s = Array.from(n.keys()), i = 0;
    for (; s.length > 0 && i < I_; ) {
      const a = s.map(
        (f) => n.get(f)
      ), o = await this.operations.dryRun({
        encodedTransactions: a,
        utxoValidation: !1
      }), u = [];
      for (let f = 0; f < o.dryRun.length; f++) {
        const p = s[f], { receipts: m, status: I } = o.dryRun[f], S = t[p];
        S.receipts = m.map(We), S.dryRunStatus = I;
        const { missingOutputVariables: F, missingOutputContractIds: R } = p_(
          S.receipts
        ), D = F.length > 0 || R.length > 0, z = r[p];
        if (D && Pr(z)) {
          S.outputVariables += F.length, z.addVariableOutputs(F.length), R.forEach(({ contractId: U }) => {
            z.addContractInputAndOutput(new ct(U)), S.missingContractIds.push(U);
          });
          const { maxFee: Y } = await this.estimateTxGasAndFee({
            transactionRequest: z
          });
          z.maxFee = Y, n.set(p, X(z.toTransactionBytes())), u.push(p);
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
    const n = e.map((a) => X(a.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: a, status: o }) => ({ receipts: a.map(We), dryRunStatus: o }));
  }
  async autoRefetchConfigs() {
    var i;
    if (Date.now() - (this.consensusParametersTimestamp ?? 0) < 6e4)
      return;
    if (!((i = Ot.chainInfoCache) != null && i[this.urlWithoutAuth])) {
      await this.fetchChainAndNodeInfo(!0);
      return;
    }
    const r = Ot.chainInfoCache[this.urlWithoutAuth], {
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
   * @param params - The parameters for estimating the transaction gas and fee.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(e) {
    const { transactionRequest: t, gasPrice: r } = e;
    let n = r;
    await this.autoRefetchConfigs();
    const s = await this.getChain(), { gasPriceFactor: i, maxGasPerTx: a } = await this.getGasConfig(), o = t.calculateMinGas(s);
    je(n) || (n = await this.estimateGasPrice(10));
    const u = En({
      gasPrice: x(n),
      gas: o,
      priceFactor: i,
      tip: t.tip
    }).add(1);
    let f = x(0);
    Pr(t) && (f = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = a.sub(
      t.calculateMaxGas(s, o)
    ), f = t.gasLimit));
    const p = t.calculateMaxGas(s, o), m = En({
      gasPrice: x(n),
      gas: p,
      priceFactor: i,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: u,
      maxGas: p,
      maxFee: m,
      gasPrice: n,
      gasLimit: f
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
    return { receipts: s.map((a) => {
      const { id: o, receipts: u, status: f } = a, p = u.map(We);
      return { id: o, receipts: p, status: f };
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
  async getTransactionCost(e, { signatureCallback: t, gasPrice: r } = {}) {
    const n = ve(Re(e)), s = n.maxFee.eq(0), i = Pr(n);
    i && (n.gasLimit = x(0));
    const a = ve(n);
    let o = 0;
    if (t && Pr(a)) {
      const T = a.witnesses.length;
      await t(a), o = a.witnesses.length - T;
    }
    let u;
    r ? (u = r, await this.estimatePredicates(a)) : { gasPrice: u } = await this.estimatePredicatesAndGasPrice(a, 10), n.updatePredicateGasUsed(a.inputs);
    let { maxFee: f, maxGas: p, minFee: m, minGas: I, gasLimit: S } = await this.estimateTxGasAndFee({
      // Fetches and returns a gas price
      transactionRequest: a,
      gasPrice: u
    }), F = [], R = [], D, z = [], Y = 0, U = x(0);
    if (n.maxFee = f, i) {
      if (n.gasLimit = S, t && await t(n), { rawReceipts: F, receipts: R, missingContractIds: z, outputVariables: Y, dryRunStatus: D } = await this.estimateTxDependencies(n, { gasPrice: u }), D && "reason" in D)
        throw this.extractDryRunError(n, R, D);
      const { maxGasPerTx: T } = await this.getGasConfig(), O = Ci(R);
      U = x(O.muln(c1)).max(T.sub(I)), n.gasLimit = U, { maxFee: f, maxGas: p, minFee: m, minGas: I } = await this.estimateTxGasAndFee({
        transactionRequest: n,
        gasPrice: u
      });
    }
    const Q = {
      gasPrice: u.toString(),
      receipts: F
    };
    return {
      rawReceipts: F,
      receipts: R,
      gasUsed: U,
      gasPrice: u,
      minGas: I,
      maxGas: p,
      minFee: m,
      maxFee: f,
      outputVariables: Y,
      missingContractIds: z,
      addedSignatures: o,
      estimatedPredicates: n.inputs,
      dryRunStatus: D,
      updateMaxFee: s,
      transactionSummary: Q
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
    const n = new ct(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...an({
        paginationLimit: E_,
        inputArgs: r
      }),
      filter: { owner: n.toB256(), assetId: t && X(t) }
    });
    return {
      coins: s.map(({ node: o }) => ({
        id: o.utxoId,
        assetId: o.assetId,
        amount: x(o.amount),
        owner: n,
        blockCreated: x(o.blockCreated),
        txCreatedIdx: x(o.txCreatedIdx)
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
    var u, f;
    const n = new ct(e);
    let s = {
      messages: ((u = r == null ? void 0 : r.messages) == null ? void 0 : u.map((p) => X(p))) || [],
      utxos: ((f = r == null ? void 0 : r.utxos) == null ? void 0 : f.map((p) => X(p))) || []
    };
    if (this.cache) {
      const p = this.cache.getActiveData(n.toB256());
      if (p.utxos.length || p.messages.length) {
        const {
          consensusParameters: {
            txParameters: { maxInputs: m }
          }
        } = await this.getChain();
        s = s1({
          userInput: s,
          cached: p,
          maxInputs: m.toNumber()
        });
      }
    }
    const i = {
      owner: n.toB256(),
      queryPerAsset: t.map(ko).map(({ assetId: p, amount: m, max: I }) => ({
        assetId: X(p),
        amount: (m.eqn(0) ? x(1) : m).toString(10),
        max: I ? I.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((p) => {
      switch (p.type) {
        case "MessageCoin":
          return {
            amount: x(p.amount),
            assetId: p.assetId,
            daHeight: x(p.daHeight),
            sender: new ct(p.sender),
            recipient: new ct(p.recipient),
            nonce: p.nonce
          };
        case "Coin":
          return {
            id: p.utxoId,
            amount: x(p.amount),
            assetId: p.assetId,
            owner: n,
            blockCreated: x(p.blockCreated),
            txCreatedIdx: x(p.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((p) => !!p);
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
        chain: { latestBlock: a }
      } = await this.operations.getLatestBlock();
      t = a;
    } else {
      const o = typeof e == "string" && wn(e) ? { blockId: e } : { height: x(e).toString(10) };
      t = (await this.operations.getBlock(o)).block;
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
      transactionIds: i.map((a) => a.id)
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
      ...an({
        paginationLimit: a1,
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
    typeof e == "number" ? t = { blockHeight: x(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : typeof e == "string" && wn(e) ? t = { blockId: e } : t = { blockHeight: x(e).toString() };
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
          return (s = new nr().decode(Z(n.rawPayload), 0)) == null ? void 0 : s[0];
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
      return (r = new nr().decode(
        Z(t.rawPayload),
        0
      )) == null ? void 0 : r[0];
    } catch (n) {
      if (n instanceof C && n.code === M.UNSUPPORTED_TRANSACTION_TYPE)
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
      ...an({
        inputArgs: e,
        paginationLimit: uf
      })
    }), n = new nr();
    return { transactions: t.map(({ node: { rawPayload: i } }) => {
      try {
        return n.decode(Z(i), 0)[0];
      } catch (a) {
        if (a instanceof C && a.code === M.UNSUPPORTED_TRANSACTION_TYPE)
          return console.warn("Unsupported transaction type encountered"), null;
        throw a;
      }
    }).filter((i) => i !== null), pageInfo: r };
  }
  /**
   * Fetches a compressed block at the specified height.
   *
   * @param height - The height of the block to fetch.
   * @returns The compressed block if available, otherwise `null`.
   */
  async daCompressedBlock(e) {
    const { daCompressedBlock: t } = await this.operations.daCompressedBlock({
      height: e
    });
    return t || null;
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
      contract: new ct(e).toB256(),
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
    const r = new ct(e).toB256(), n = X(t);
    if (!this.features.amount128) {
      const { balance: i } = await this.operations.getBalance({
        owner: r,
        assetId: n
      });
      return x(i.amount, 10);
    }
    const { balance: s } = await this.operations.getBalanceV2({
      owner: r,
      assetId: n
    });
    return x(s.amountU128, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(e, t) {
    return this.features.balancePagination ? this.getBalancesV2(e, t) : this.getBalancesV1(e, t);
  }
  /**
   * @hidden
   */
  async getBalancesV1(e, t) {
    const {
      balances: { edges: r }
    } = await this.operations.getBalances({
      /**
       * The query parameters for this method were designed to support pagination,
       * but the current Fuel-Core implementation does not support pagination yet.
       */
      first: 1e4,
      filter: { owner: new ct(e).toB256() }
    });
    return { balances: r.map(({ node: s }) => ({
      assetId: s.assetId,
      amount: x(s.amount)
    })) };
  }
  /**
   * @hidden
   */
  async getBalancesV2(e, t) {
    const {
      balances: { edges: r, pageInfo: n }
    } = await this.operations.getBalancesV2({
      ...an({
        inputArgs: t,
        paginationLimit: i1
      }),
      filter: { owner: new ct(e).toB256() }
    });
    return { balances: r.map(({ node: i }) => ({
      assetId: i.assetId,
      amount: x(i.amountU128)
    })), pageInfo: n };
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
      ...an({
        inputArgs: t,
        paginationLimit: E_
      }),
      owner: new ct(e).toB256()
    });
    return {
      messages: r.map(({ node: i }) => ({
        messageId: Dr.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: x(i.amount),
          data: i.data
        }),
        sender: new ct(i.sender),
        recipient: new ct(i.recipient),
        nonce: i.nonce,
        amount: x(i.amount),
        data: Dr.decodeData(i.data),
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
      throw new C(
        M.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    r && (s = {
      ...s,
      commitBlockId: r
    }), n && (s = {
      ...s,
      // Convert BN into a number string required on the query
      // This should probably be fixed on the fuel client side
      commitBlockHeight: n.toNumber().toString()
    });
    const i = await this.operations.getMessageProof(s), {
      messageProof: a,
      messageBlockHeader: o,
      commitBlockHeader: u,
      blockProof: f,
      sender: p,
      recipient: m,
      amount: I,
      data: S
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: x(a.proofIndex),
        proofSet: a.proofSet
      },
      blockProof: {
        proofIndex: x(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: o.id,
        daHeight: x(o.daHeight),
        transactionsCount: Number(o.transactionsCount),
        transactionsRoot: o.transactionsRoot,
        height: x(o.height),
        prevRoot: o.prevRoot,
        time: o.time,
        applicationHash: o.applicationHash,
        messageReceiptCount: Number(o.messageReceiptCount),
        messageOutboxRoot: o.messageOutboxRoot,
        consensusParametersVersion: Number(o.consensusParametersVersion),
        eventInboxRoot: o.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(o.stateTransitionBytecodeVersion)
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
      sender: new ct(p),
      recipient: new ct(m),
      nonce: t,
      amount: x(I),
      data: S
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
      startTimestamp: t ? Ao.fromUnixMilliseconds(t).toTai64() : void 0
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
    return await this.getAddressType(e) === "Account";
  }
  /**
   * Determines the type of address based on the provided ID.
   *
   * @param id - The ID to be checked.
   * @returns A promise that resolves to a string indicating the type of address.
   */
  async getAddressType(e) {
    const { contract: t, blob: r, transaction: n } = await this.operations.isUserAccount({
      blobId: e,
      contractId: e,
      transactionId: e
    });
    if (t)
      return "Contract";
    if (r)
      return "Blob";
    if (n)
      return "Transaction";
    try {
      if (await this.getAssetDetails(e))
        return "Asset";
    } catch {
    }
    return "Account";
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  async getTransactionResponse(e) {
    const t = await this.getChainId();
    return new ao(e, this, t);
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
      messageId: Dr.getMessageId({
        sender: t.sender,
        recipient: t.recipient,
        nonce: e,
        amount: x(t.amount),
        data: t.data
      }),
      sender: new ct(t.sender),
      recipient: new ct(t.recipient),
      nonce: e,
      amount: x(t.amount),
      data: Dr.decodeData(t.data),
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
    return e.abis && (s = Wo(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Ho({
      logs: s,
      receipts: t,
      statusReason: n.reason
    });
  }
  /**
   * @hidden
   */
  parseEstimatePredicatesResponse(e, { inputs: t }) {
    return t && t.forEach((r, n) => {
      r && "predicateGasUsed" in r && x(r.predicateGasUsed).gt(0) && (e.inputs[n].predicateGasUsed = r.predicateGasUsed);
    }), e;
  }
}, $n = Ot;
oo = /* @__PURE__ */ new WeakSet();
_f = function(e, t) {
  this.cache && this.cache.set(t, e);
};
Ct($n, "chainInfoCache", {});
Ct($n, "nodeInfoCache", {});
Ct($n, "incompatibleNodeVersionMessage", "");
async function f2(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new C(
      M.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new nr().decode(
    Z(s.rawPayload),
    0
  );
  let a = [];
  s != null && s.status && "receipts" in s.status && (a = s.status.receipts);
  const o = a.map(We), {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: f },
      txParameters: { maxInputs: p, maxGasPerTx: m },
      gasCosts: I
    }
  } = await r.getChain(), F = cf(s.status) ? x(0) : await r.getLatestGasPrice(), R = await r.getBaseAssetId();
  return {
    ...ls({
      id: s.id,
      receipts: o,
      transaction: i,
      transactionBytes: Z(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: x(u),
      gasPriceFactor: x(f),
      abiMap: n,
      maxInputs: p,
      gasCosts: I,
      maxGasPerTx: m,
      gasPrice: F,
      baseAssetId: R
    })
  };
}
async function A2(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: a, gasCosts: o, maxGasPerTx: u } = await t.getGasConfig(), f = (await t.getChain()).consensusParameters.txParameters.maxInputs, p = r.toTransaction(), m = r.toTransactionBytes(), I = await t.getLatestGasPrice(), S = await t.getBaseAssetId();
  return ls({
    id: r.getTransactionId(await t.getChainId()),
    receipts: s,
    transaction: p,
    transactionBytes: m,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: a,
    maxInputs: f,
    gasCosts: o,
    maxGasPerTx: u,
    gasPrice: I,
    baseAssetId: S
  });
}
async function p2(e) {
  const { filters: t, provider: r, abiMap: n } = e, { owner: s, ...i } = t, a = an({
    inputArgs: i,
    paginationLimit: uf
  }), { transactionsByOwner: o } = await r.operations.getTransactionsByOwner({
    ...a,
    owner: s
  }), { edges: u, pageInfo: f } = o, {
    consensusParameters: {
      feeParameters: { gasPerByte: p, gasPriceFactor: m },
      txParameters: { maxInputs: I, maxGasPerTx: S },
      gasCosts: F
    }
  } = await r.getChain(), R = await r.getLatestGasPrice(), D = await r.getBaseAssetId();
  return {
    transactions: u.map((Y) => {
      const { node: U } = Y, { id: Q, rawPayload: T, status: O } = U, [P] = new nr().decode(Z(T), 0);
      let G = [];
      U != null && U.status && "receipts" in U.status && (G = U.status.receipts);
      const k = G.map(We);
      return {
        ...ls({
          id: Q,
          receipts: k,
          transaction: P,
          transactionBytes: Z(T),
          gqlTransactionStatus: O,
          abiMap: n,
          gasPerByte: p,
          gasPriceFactor: m,
          maxInputs: I,
          gasCosts: F,
          maxGasPerTx: S,
          gasPrice: R,
          baseAssetId: D
        })
      };
    }),
    pageInfo: f
  };
}
var g2 = async (e) => {
  const { provider: t, transactionSummary: r } = e, { id: n, transactionBytes: s, gasPrice: i, receipts: a } = r, {
    consensusParameters: {
      baseAssetId: o,
      txParameters: { maxInputs: u, maxGasPerTx: f },
      feeParameters: { gasPriceFactor: p, gasPerByte: m },
      gasCosts: I
    }
  } = await t.getChain(), S = Z(s), [F] = new nr().decode(S, 0);
  return ls({
    id: n,
    transaction: F,
    transactionBytes: S,
    receipts: a.map(We),
    gasPrice: x(i),
    // From chain
    baseAssetId: o,
    maxInputs: u,
    gasCosts: I,
    maxGasPerTx: f,
    gasPerByte: m,
    gasPriceFactor: p
  });
}, v_ = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, d1 = class {
}, u1 = (e) => {
  const t = new et("u64");
  return e.reduce((r, n) => {
    const { assetId: s, amount: i, contractId: a } = n, o = t.encode(i), u = at([new ct(a).toBytes(), o, Z(s)]);
    return at([r, u]);
  }, new Uint8Array());
}, _1 = async (e) => {
  const t = u1(e);
  await yi();
  let r = new Uint8Array();
  return e.forEach((n, s) => {
    const i = (ka + dt + Xn) * s;
    r = at([
      r,
      // Load ScriptData into register 0x10.
      fl(16, 0, pl.ScriptData).to_bytes(),
      // Add the offset to 0x10 so it will point to the current contract ID, store in 0x11.
      er(17, 16, i).to_bytes(),
      // Add CONTRACT_ID_LEN to 0x11 to point to the amount in the ScriptData, store in 0x12.
      er(18, 17, ka).to_bytes(),
      // Load word to the amount at 0x12 into register 0x13.
      Wn(19, 18, 0).to_bytes(),
      // Add WORD_SIZE to 0x12 to point to the asset ID in the ScriptData, store in 0x14.
      er(20, 18, dt).to_bytes(),
      // Perform the transfer using contract ID in 0x11, amount in 0x13, and asset ID in 0x14.
      hl(17, 19, 20).to_bytes()
    ]);
  }), r = at([r, Fo(1).to_bytes()]), { script: r, scriptData: t };
}, h1 = 5, Ri = class extends d1 {
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
    L(this, "address");
    /**
     * The provider used to interact with the network.
     */
    L(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    L(this, "_connector");
    this._provider = r, this._connector = n, this.address = new ct(t);
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
      throw new C(M.MISSING_PROVIDER, "Provider not set");
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
    const r = t ?? await this.provider.getBaseAssetId();
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
    var Q;
    const {
      addedSignatures: n,
      estimatedPredicates: s,
      requiredQuantities: i,
      updateMaxFee: a,
      gasPrice: o,
      transactionSummary: u
    } = r, f = await this.provider.getChainId(), p = t.maxFee, m = await this.provider.getBaseAssetId(), I = ((Q = i.find((T) => T.assetId === m)) == null ? void 0 : Q.amount) || x(0), S = DE({
      amount: x(p),
      assetId: m,
      coinQuantities: i
    }), F = {};
    S.forEach(({ amount: T, assetId: O }) => {
      F[O] = {
        required: T,
        owned: x(0)
      };
    }), t.inputs.filter(Kr).forEach((T) => {
      const P = mr(T) ? String(T.assetId) : m;
      F[P] && (F[P].owned = F[P].owned.add(T.amount));
    });
    let R = [];
    Object.entries(F).forEach(([T, { owned: O, required: P }]) => {
      O.lt(P) && R.push({
        assetId: T,
        amount: P.sub(O)
      });
    });
    let D = R.length > 0, z = 0;
    for (; D && z < h1; ) {
      const T = await this.getResourcesToSpend(
        R,
        cC(t.inputs, this.address)
      );
      t.addResources(T), t.updatePredicateGasUsed(s);
      const O = ve(t);
      if (n && Array.from({ length: n }).forEach(
        () => O.addEmptyWitness()
      ), !a) {
        D = !1;
        break;
      }
      const { maxFee: P } = await this.provider.estimateTxGasAndFee({
        transactionRequest: O,
        gasPrice: o
      }), G = oC(
        t.inputs.filter(Kr),
        m,
        m
      ), k = I.add(P);
      G.gt(k) ? D = !1 : R = [
        {
          amount: k.sub(G),
          assetId: m
        }
      ], z += 1;
    }
    if (D)
      throw new C(
        M.INSUFFICIENT_FUNDS_OR_MAX_COINS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    t.updateState(f, "funded", u), await this.provider.validateTransaction(t), t.updatePredicateGasUsed(s);
    const Y = ve(t);
    if (n && Array.from({ length: n }).forEach(() => Y.addEmptyWitness()), !a)
      return t;
    const { maxFee: U } = await this.provider.estimateTxGasAndFee({
      transactionRequest: Y,
      gasPrice: o
    });
    return t.maxFee = U, t;
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
    return i = this.addTransfer(i, {
      destination: t,
      amount: r,
      assetId: n || await this.provider.getBaseAssetId()
    }), i = await this.estimateAndFundTransaction(i, s), i;
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
    return this.validateTransferAmount(s), t.addCoinOutput(new ct(n), s, i), t;
  }
  /**
   * Adds multiple transfers to a script transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The updated script transaction request.
   */
  addBatchTransfer(t, r) {
    return r.forEach(({ destination: n, amount: s, assetId: i }) => {
      this.addTransfer(t, {
        destination: n,
        amount: s,
        assetId: i
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
    const s = [], i = await this.provider.getBaseAssetId(), a = t.map((f) => {
      const p = x(f.amount), m = new ct(f.contractId), I = f.assetId ? X(f.assetId) : i;
      if (p.lte(0))
        throw new C(
          M.INVALID_TRANSFER_AMOUNT,
          "Transfer amount must be a positive number."
        );
      return n.addContractInputAndOutput(m), s.push({ amount: p, assetId: I }), {
        amount: p,
        contractId: m.toB256(),
        assetId: I
      };
    }), { script: o, scriptData: u } = await _1(a);
    return n.script = o, n.scriptData = u, n = await this.estimateAndFundTransaction(n, r, { quantities: s }), this.sendTransaction(n);
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
    const s = new ct(t), i = Z(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), a = Z(
      "0x".concat(x(r).toHex().substring(2).padStart(16, "0"))
    ), u = { script: new Uint8Array([
      ...Z(lC.bytes),
      ...i,
      ...a
    ]), ...n }, f = await this.provider.getBaseAssetId();
    let p = new Xr(u);
    const m = [{ amount: x(r), assetId: f }], I = await this.getTransactionCost(p, { quantities: m });
    return p = this.validateGasLimitAndMaxFee({
      transactionRequest: p,
      gasUsed: I.gasUsed,
      maxFee: I.maxFee,
      txParams: n
    }), await this.fund(p, I), this.sendTransaction(p);
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
  async getTransactionCost(t, { signatureCallback: r, quantities: n = [], gasPrice: s } = {}) {
    const i = ve(Re(t)), a = await this.provider.getBaseAssetId(), o = i.getCoinOutputsQuantities(), u = v_(o, n), f = [{ assetId: a, amount: x("100000000000000000") }], p = (S) => i.inputs.find((F) => F.type === vt.Coin ? F.assetId === S : ql(F) ? a === S : !1), m = (S, F) => {
      const R = p(S), D = F;
      R && "amount" in R ? R.amount = D : i.addResources(
        this.generateFakeResources([
          {
            amount: F,
            assetId: S
          }
        ])
      );
    };
    return v_(u, f).forEach(
      ({ amount: S, assetId: F }) => m(F, S)
    ), {
      ...await this.provider.getTransactionCost(i, {
        signatureCallback: r,
        gasPrice: s
      }),
      requiredQuantities: u
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
      throw new C(M.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
      throw new C(
        M.MISSING_CONNECTOR,
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
  async sendTransaction(t, { estimateTxDependencies: r = !0, ...n } = {}) {
    let s = Re(t);
    if (this._connector) {
      const { onBeforeSend: i, skipCustomFee: a = !1 } = n;
      s = await this.prepareTransactionForSend(s);
      const o = {
        onBeforeSend: i,
        skipCustomFee: a,
        provider: {
          url: this.provider.url,
          cache: await Wv(this.provider)
        },
        transactionState: s.flag.state,
        transactionSummary: await this.prepareTransactionSummary(s)
      }, u = await this._connector.sendTransaction(
        this.address.toString(),
        s,
        o
      );
      return typeof u == "string" ? this.provider.getTransactionResponse(u) : u;
    }
    return r && await this.provider.estimateTxDependencies(s), this.provider.sendTransaction(s, {
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
      id: X(ze(Gs)),
      owner: this.address,
      blockCreated: x(1),
      txCreatedIdx: x(1),
      ...r
    }));
  }
  /** @hidden */
  async prepareTransactionForSend(t) {
    const { transactionId: r } = t.flag;
    if (!je(r))
      return t;
    const n = await this.provider.getChainId(), s = t.getTransactionId(n);
    return r !== s && t.updateState(n), t;
  }
  /** @hidden */
  async prepareTransactionSummary(t) {
    const r = await this.provider.getChainId();
    return je(t.flag.summary) ? {
      ...t.flag.summary,
      id: t.getTransactionId(r),
      transactionBytes: X(t.toTransactionBytes())
    } : void 0;
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (x(t).lte(0))
      throw new C(
        M.INVALID_TRANSFER_AMOUNT,
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
    const a = Re(n);
    if (!je(s))
      a.gasLimit = t;
    else if (t.gt(s))
      throw new C(
        M.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!je(i))
      a.maxFee = r;
    else if (r.gt(i))
      throw new C(
        M.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${r}'.`
      );
    return a;
  }
}, vn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    L(this, "address");
    L(this, "publicKey");
    L(this, "compressedPublicKey");
    L(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = pr(e, 32);
    this.privateKey = X(t), this.publicKey = X(Cr.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = X(Cr.getPublicKey(t, !0)), this.address = new ct(this.publicKey);
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
    const t = Cr.sign(Z(e), Z(this.privateKey)), r = pr(`0x${t.r.toString(16)}`, 32), n = pr(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, X(at([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = Cr.ProjectivePoint.fromHex(Z(this.compressedPublicKey)), r = Cr.ProjectivePoint.fromHex(Z(e));
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
    const r = Z(t), n = r.slice(0, 32), s = r.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const o = new Cr.Signature(BigInt(X(n)), BigInt(X(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Z(e)).toRawBytes(!1).slice(1);
    return X(o);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return new ct(vn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? sr(at([ze(32), Z(e)])) : ze(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = Cr.ProjectivePoint.fromHex(Z(e));
    return X(t.toRawBytes(!1).slice(1));
  }
}, C_ = 13, B_ = 8, x_ = 1, va = 32, l1 = 16, R_ = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function f1(e, t, r) {
  const n = Vr(R_(e), "hex"), s = new ct(t), i = ze(va), a = Ch({
    password: Vr(r),
    salt: i,
    dklen: va,
    n: 2 ** C_,
    r: B_,
    p: x_
  }), o = ze(l1), u = await Kp(n, a, o), f = Uint8Array.from([...a.subarray(16, 32), ...u]), p = Bh(f), m = Mn(p, "hex"), I = {
    id: rg(),
    version: 3,
    address: R_(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: m,
      cipherparams: { iv: Mn(o, "hex") },
      ciphertext: Mn(u, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: va,
        n: 2 ** C_,
        p: x_,
        r: B_,
        salt: Mn(i, "hex")
      }
    }
  };
  return JSON.stringify(I);
}
async function A1(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: a, n: o, r: u, p: f, salt: p }
    }
  } = r, m = Vr(s, "hex"), I = Vr(i, "hex"), S = Vr(p, "hex"), F = Vr(t), R = Ch({
    password: F,
    salt: S,
    n: o,
    p: f,
    r: u,
    dklen: a
  }), D = Uint8Array.from([...R.subarray(16, 32), ...m]), z = Bh(D), Y = Mn(z, "hex");
  if (n !== Y)
    throw new C(
      M.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const U = await $p(m, R, I);
  return X(U);
}
var hf = class extends Ri {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, r) {
    const n = new vn(t);
    super(n.address, r);
    /**
     * A function that returns the wallet's signer.
     */
    L(this, "signer");
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
    const r = await this.signer().sign(ig(t));
    return X(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Re(t), n = await this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
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
  async sendTransaction(t, { estimateTxDependencies: r = !1, enableAssetBurn: n } = {}) {
    const s = Re(t);
    return Kl(
      await this.provider.getBaseAssetId(),
      s,
      n
    ), r && await this.provider.estimateTxDependencies(s), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(s),
      { estimateTxDependencies: !1, enableAssetBurn: n }
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
    return f1(this.privateKey, this.address, t);
  }
};
Ct(hf, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Es = [
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
], p1 = /* @__PURE__ */ ((e) => (e.english = "english", e))(p1 || {});
function g1(e) {
  return (1 << e) - 1;
}
function lf(e) {
  return (1 << e) - 1 << 8 - e;
}
function Ca(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function w1(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function m1(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & g1(8 - r)), r += 3);
  const n = e.length / 4, s = Z(ge(e))[0] & lf(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function y1(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = Z(new Uint8Array(r));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const p = t.indexOf(e[f].normalize("NFKD"));
    if (p === -1)
      throw new C(
        M.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let m = 0; m < 11; m += 1)
      p & 1 << 10 - m && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, a = e.length / 3, o = lf(a);
  if ((Z(ge(n.slice(0, i / 8)))[0] & o) !== (n[n.length - 1] & o))
    throw new C(
      M.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var b1 = tr("Bitcoin seed"), I1 = "0x0488ade4", E1 = "0x04358394", S_ = [12, 15, 18, 21, 24];
function T_(e) {
  if (e.length !== 2048)
    throw new C(
      M.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function v1(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new C(
      M.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Ba(e) {
  if (!S_.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${S_.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new C(M.INVALID_MNEMONIC, t);
  }
}
var Br = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Es) {
    L(this, "wordlist");
    this.wordlist = e, T_(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return Br.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return Br.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Es) {
    const r = Ca(e);
    return Ba(r), X(y1(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Es) {
    const r = Z(e);
    return T_(t), v1(r), m1(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Ba(Ca(e));
    const r = tr(w1(e)), n = tr(`mnemonic${t}`);
    return tg(r, n, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const r = Br.mnemonicToSeed(e, t);
    return Br.masterKeysFromSeed(r);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = Ca(e);
    let r = 0;
    try {
      Ba(t);
    } catch {
      return !1;
    }
    for (; r < t.length; ) {
      if (Br.binarySearch(t[r]) === !1)
        return !1;
      r += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Es;
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
    const t = Z(e);
    if (t.length < 16 || t.length > 64)
      throw new C(
        M.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Z(xh("sha512", b1, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = Br.masterKeysFromSeed(e), n = Z(t ? E1 : I1), s = "0x00", i = "0x00000000", a = "0x00000000", o = r.slice(32), u = r.slice(0, 32), f = at([
      n,
      s,
      i,
      a,
      o,
      at(["0x00", u])
    ]), p = po(ge(ge(f)), 0, 4);
    return ih(at([f, p]));
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
    const r = t ? ge(at([ze(e), Z(t)])) : ze(e);
    return Br.entropyToMnemonic(r);
  }
}, jo = Br, ff = 2147483648, Af = X("0x0488ade4"), Jo = X("0x0488b21e"), pf = X("0x04358394"), qo = X("0x043587cf");
function N_(e) {
  return ih(at([e, po(ge(ge(e)), 0, 4)]));
}
function C1(e = !1, t = !1) {
  return e ? t ? qo : Jo : t ? pf : Af;
}
function B1(e) {
  return [Jo, qo].includes(X(e.slice(0, 4)));
}
function x1(e) {
  return [Af, pf, Jo, qo].includes(
    X(e.slice(0, 4))
  );
}
function R1(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new C(M.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + ff : parseInt(n, 10)
  );
}
var on = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    L(this, "depth", 0);
    L(this, "index", 0);
    L(this, "fingerprint", X("0x00000000"));
    L(this, "parentFingerprint", X("0x00000000"));
    L(this, "privateKey");
    L(this, "publicKey");
    L(this, "chainCode");
    if (e.privateKey) {
      const t = new vn(e.privateKey);
      this.publicKey = X(t.compressedPublicKey), this.privateKey = X(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new C(
          M.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = po(eg(ge(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && Z(this.privateKey), r = Z(this.publicKey), n = Z(this.chainCode), s = new Uint8Array(37);
    if (e & ff) {
      if (!t)
        throw new C(
          M.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Z(this.publicKey));
    s.set(pr(e, 4), 33);
    const i = Z(xh("sha512", n, s)), a = i.slice(0, 32), o = i.slice(32);
    if (t) {
      const m = x(a).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new on({
        privateKey: m,
        chainCode: o,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new vn(X(a)).addPoint(r);
    return new on({
      publicKey: f,
      chainCode: o,
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
    return R1(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
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
      throw new C(
        M.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const r = C1(this.privateKey == null || e, t), n = X(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = ho(this.index, 4), a = this.chainCode, o = this.privateKey != null && !e ? at(["0x00", this.privateKey]) : this.publicKey, u = Z(at([r, n, s, i, a, o]));
    return N_(u);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = jo.masterKeysFromSeed(e);
    return new on({
      chainCode: Z(t.slice(32)),
      privateKey: Z(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = X(pr(MA(e))), r = Z(t), n = N_(r.slice(0, 78)) === e;
    if (r.length !== 82 || !x1(r))
      throw new C(M.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new C(M.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = X(r.slice(5, 9)), a = parseInt(X(r.slice(9, 13)).substring(2), 16), o = X(r.slice(13, 45)), u = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && a !== 0)
      throw new C(
        M.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (B1(r)) {
      if (u[0] !== 3)
        throw new C(M.HD_WALLET_ERROR, "Invalid public extended key.");
      return new on({
        publicKey: u,
        chainCode: o,
        index: a,
        depth: s,
        parentFingerprint: i
      });
    }
    if (u[0] !== 0)
      throw new C(M.HD_WALLET_ERROR, "Invalid private extended key.");
    return new on({
      privateKey: u.slice(1),
      chainCode: o,
      index: a,
      depth: s,
      parentFingerprint: i
    });
  }
}, xa = on, gf = class extends Ri {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new De(e, this._provider);
  }
}, De = class extends hf {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new vn("0x00"), new gf(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = vn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new De(t, e == null ? void 0 : e.provider);
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
    const s = xa.fromSeed(e).derivePath(t || De.defaultPath);
    return new De(s.privateKey, r);
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
    const s = jo.mnemonicToSeed(e, r), a = xa.fromSeed(s).derivePath(t || De.defaultPath);
    return new De(a.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const r = xa.fromExtendedKey(e);
    return new De(r.privateKey, t);
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
    const n = await A1(e, t);
    return new De(n, r);
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
    return new gf(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new De(e, t);
  }
};
Ct(Be, "generate", De.generate);
Ct(Be, "fromSeed", De.fromSeed);
Ct(Be, "fromMnemonic", De.fromMnemonic);
Ct(Be, "fromExtendedKey", De.fromExtendedKey);
Ct(Be, "fromEncryptedJson", De.fromEncryptedJson);
var S1 = class {
  constructor() {
    L(this, "storage", /* @__PURE__ */ new Map());
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
}, zr, wf = class {
  constructor(e) {
    Tr(this, zr, void 0), Ct(this, "pathKey", "{}"), Ct(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Ct(this, "numberOfAccounts", 0), Ze(this, zr, e.secret || jo.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
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
    const r = new ct(e);
    do {
      const n = Be.fromMnemonic(Dt(this, zr), this.getDerivePath(t));
      if (n.address.equals(r))
        return n.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new C(
      M.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Be.fromPrivateKey(t);
  }
};
zr = /* @__PURE__ */ new WeakMap();
Ct(wf, "type", "mnemonic");
var xr, mf = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Tr(this, xr, []), e.secret ? Ze(this, xr, [e.secret]) : Ze(this, xr, e.accounts || [Be.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Dt(this, xr)
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
    return Dt(this, xr).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Be.generate();
    return Dt(this, xr).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = new ct(e), r = Dt(this, xr).find(
      (n) => Be.fromPrivateKey(n).address.equals(t)
    );
    if (!r)
      throw new C(
        M.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return r;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Be.fromPrivateKey(t);
  }
};
xr = /* @__PURE__ */ new WeakMap();
Ct(mf, "type", "privateKey");
var _r = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked."
};
function hr(e, t) {
  if (!e)
    throw new C(M.WALLET_MANAGER_ERROR, t);
}
var Te, Gr, $e, co, yf, uo, bf, If = class extends Nl.EventEmitter {
  constructor(e) {
    super(), Tr(this, co), Tr(this, uo), Ct(this, "storage", new S1()), Ct(this, "STORAGE_KEY", "WalletManager"), Tr(this, Te, []), Tr(this, Gr, ""), Tr(this, $e, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Dt(this, $e);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    hr(!Dt(this, $e), _r.wallet_not_unlocked);
    const t = Dt(this, Te).find((r, n) => n === e);
    return hr(t, _r.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Dt(this, Te).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Dt(this, Te).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = new ct(e), r = Dt(this, Te).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return hr(r, _r.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = new ct(e);
    hr(!Dt(this, $e), _r.wallet_not_unlocked);
    const r = Dt(this, Te).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return hr(r, _r.address_not_found), r.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Dt(this, Te)[(e == null ? void 0 : e.vaultId) || 0];
    await hr(t, _r.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Dt(this, Te).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    Ze(this, Te, Dt(this, Te).concat({
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
    Ze(this, $e, !0), Ze(this, Te, []), Ze(this, Gr, ""), this.emit("lock");
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
    await hr(!Dt(this, $e), _r.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Jp(Dt(this, Gr), JSON.parse(e));
      Ze(this, Te, $a(this, uo, bf).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await hr(!Dt(this, $e), _r.wallet_not_unlocked);
    const e = await qp(Dt(this, Gr), {
      vaults: $a(this, co, yf).call(this, Dt(this, Te))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = If.Vaults.find((r) => r.type === e);
    return hr(t, _r.invalid_vault_type), t;
  }
}, T1 = If;
Te = /* @__PURE__ */ new WeakMap();
Gr = /* @__PURE__ */ new WeakMap();
$e = /* @__PURE__ */ new WeakMap();
co = /* @__PURE__ */ new WeakSet();
yf = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
uo = /* @__PURE__ */ new WeakSet();
bf = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Ct(T1, "Vaults", [wf, mf]);
var N1 = class {
  constructor(e) {
    throw new C(M.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new C(M.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new C(M.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new C(M.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new C(M.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new C(M.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Ct(N1, "type");
var w2 = class {
}, D1 = 32, Ee = 16, Pe = 17, nn = 18, F1 = 8, Q1 = 8, O1 = 16;
function M1(e) {
  const [t] = new et("u64").decode(e, Q1);
  return t.toNumber();
}
function $o(e) {
  const [t] = new et("u64").decode(e, O1);
  return t.toNumber();
}
function L1(e) {
  const t = $o(e), r = e.slice(0, t);
  return ge(r);
}
function m2(e) {
  const t = M1(e), r = e.slice(0, t);
  return ge(r);
}
function P1(e, t) {
  const { RegId: r, Instruction: n } = yl, s = r.pc().to_u8(), i = r.sp().to_u8(), a = r.is().to_u8(), o = (R) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Hr(Ee, s),
    // hold the address of the blob ID.
    er(
      Ee,
      Ee,
      R * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Hr(Pe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Js(nn, Ee),
    // Push the blob contents onto the stack.
    Yn(Ee, 0, nn, 1),
    // Move on to the data section length
    er(Ee, Ee, D1),
    // load the size of the data section into REG_GENERAL_USE
    Wn(nn, Ee, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    er(Ee, Ee, F1),
    // load the data section of the executable
    Yn(Ee, 0, nn, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Zs(Pe, Pe, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    js(Pe, Pe, 4),
    // Jump to the start of the contract we loaded.
    Ws(Pe)
  ], u = (R) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Hr(Ee, s),
    // hold the address of the blob ID.
    er(
      Ee,
      Ee,
      R * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Hr(Pe, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Js(nn, Ee),
    // Push the blob contents onto the stack.
    Yn(Ee, 0, nn, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Zs(Pe, Pe, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    js(Pe, Pe, 4),
    // Jump to the start of the contract we loaded.
    Ws(Pe)
  ], f = $o(e);
  if (e.length < f)
    throw new Error(
      `Data section offset is out of bounds, offset: ${f}, binary length: ${e.length}`
    );
  const p = e.slice(f);
  if (p.length > 0) {
    const R = o(0).length;
    if (R > 65535)
      throw new Error("Too many instructions, exceeding u16::MAX.");
    const D = new Uint8Array(
      o(R).flatMap(
        (T) => Array.from(T.to_bytes())
      )
    ), z = new Uint8Array(t), Y = new Uint8Array(8);
    new DataView(Y.buffer).setBigUint64(0, BigInt(p.length), !1);
    const Q = new Uint8Array([
      ...D,
      ...z,
      ...Y
    ]);
    return {
      loaderBytecode: at([Q, p]),
      blobOffset: Q.length
    };
  }
  const m = u(0).length;
  if (m > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const I = new Uint8Array(
    u(m).flatMap(
      (R) => Array.from(R.to_bytes())
    )
  ), S = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...I, ...S]) };
}
async function k1(e, t) {
  let r = x(0);
  const n = await e.provider.getChain(), s = await e.provider.estimateGasPrice(10), i = n.consensusParameters.feeParameters.gasPriceFactor, a = t.calculateMinGas(n), o = En({
    gasPrice: s,
    gas: a,
    priceFactor: i,
    tip: t.tip
  }).add(1);
  if (r = r.add(o), r.gt(await e.getBalance()))
    throw new C(M.FUNDS_TOO_LOW, "Insufficient balance to deploy predicate.");
  const u = await e.getTransactionCost(t);
  return t.maxFee = u.maxFee, e.fund(t, u);
}
function z1(e, t) {
  const { configurables: r } = e, n = [];
  return r.forEach((s) => {
    n.push({ ...s, offset: s.offset - t });
  }), { ...e, configurables: n };
}
async function Ef({
  deployer: e,
  bytecode: t,
  abi: r,
  loaderInstanceCallback: n
}) {
  const s = L1(Z(t)), i = $o(Z(t)), a = t.slice(0, i), o = new ci({
    blobId: s,
    witnessIndex: 0,
    witnesses: [a]
  }), { loaderBytecode: u, blobOffset: f } = P1(
    Z(t),
    Z(s)
  ), p = a.length - (f || 0), m = z1(r, p), I = (await e.provider.getBlobs([s])).length > 0, S = n(u, m);
  if (I)
    return {
      waitForResult: () => Promise.resolve(S),
      blobId: s
    };
  const F = await k1(e, o);
  return {
    waitForResult: async () => {
      try {
        if ((await (await e.sendTransaction(F)).waitForResult()).status !== "success")
          throw new Error();
      } catch {
        throw new C(M.TRANSACTION_FAILED, "Failed to deploy predicate chunk");
      }
      return S;
    },
    blobId: s
  };
}
var G1 = (e) => {
  const r = Z(e), n = eh(r, 16384), s = Dl(n.map((a) => X(a)));
  return sr(at(["0x4655454C", s]));
}, vs = class extends Ri {
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
    const { predicateBytes: a, predicateInterface: o } = vs.processPredicateData(
      t,
      r,
      i
    ), u = new ct(G1(a));
    super(u, n);
    L(this, "bytes");
    L(this, "predicateData", []);
    L(this, "interface");
    L(this, "initialBytecode");
    L(this, "configurableConstants");
    this.initialBytecode = Z(t), this.bytes = a, this.interface = o, this.configurableConstants = i, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const r = Re(t), n = this.getIndexFromPlaceholderWitness(r);
    return n !== -1 && r.removeWitness(n), r.inputs.filter(xi).forEach((s) => {
      ro(s, this.address) && (s.predicate = X(this.bytes), s.predicateData = X(this.getPredicateData()), s.witnessIndex = 0);
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
   * Creates a new Predicate instance from an existing Predicate instance.
   * @param overrides - The data and configurable constants to override.
   * @returns A new Predicate instance with the same bytecode, ABI and provider but with the ability to set the data and configurable constants.
   */
  toNewInstance(t = {}) {
    return new vs({
      bytecode: this.initialBytecode,
      abi: this.interface.jsonAbi,
      provider: this.provider,
      data: t.data ?? this.predicateData,
      configurableConstants: t.configurableConstants ?? this.configurableConstants
    });
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
    let s = Z(t);
    const i = new wr(r);
    if (i.functions.main === void 0)
      throw new C(
        M.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = vs.setConfigurableConstants(
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
        throw new C(
          M.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(r).forEach(([i, a]) => {
        if (!(n != null && n.configurables[i]))
          throw new C(
            M.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${i}' found in the Predicate`
          );
        const { offset: o } = n.configurables[i], u = n.encodeConfigurable(i, a);
        s.set(u, o);
      });
    } catch (i) {
      throw new C(
        M.INVALID_CONFIGURABLE_CONSTANTS,
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
    const r = t.inputs.filter(Kr).filter((a) => ro(a, this.address));
    let n = -1;
    const s = r.find((a) => !a.predicate);
    return s && (n = s.witnessIndex, r.every((o) => !o.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
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
    return Ef({
      deployer: t,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (r, n) => new vs({
        bytecode: r,
        abi: n,
        provider: this.provider,
        data: this.predicateData
      })
    });
  }
}, vf = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(vf || {}), Ko = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Ko || {}), Cf = "FuelConnector", U1 = class {
  constructor(e) {
    L(this, "storage");
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
}, V1 = class extends Nl.EventEmitter {
  constructor() {
    super(...arguments);
    L(this, "name", "");
    L(this, "metadata", {});
    L(this, "connected", !1);
    L(this, "installed", !1);
    L(this, "external", !0);
    L(this, "events", Ko);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
   * @param params - Optional parameters to send the transaction
   * @returns The transaction id or transaction response
   */
  async sendTransaction(t, r, n) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(t, r) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(t) {
    throw new C(C.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
function Y1(e, { cache: t, cacheTime: r, key: n }) {
  return async (...s) => {
    var a, o, u;
    if (t[n] && ((a = t[n]) != null && a.value))
      return (o = t[n]) == null ? void 0 : o.value;
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
function y2(e) {
  window.dispatchEvent(
    new CustomEvent(Cf, {
      detail: e
    })
  );
}
function H1() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function Cs(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new C(C.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var X1 = 2e3, Z1 = 5e3, { warn: W1 } = console, Gn = class extends V1 {
  constructor(t = Gn.defaultConfig) {
    super();
    L(this, "_storage", null);
    L(this, "_connectors", []);
    L(this, "_targetObject", null);
    L(this, "_unsubscribes", []);
    L(this, "_targetUnsubscribe", () => {
    });
    L(this, "_pingCache", {});
    L(this, "_currentConnector");
    L(this, "_initializationPromise", null);
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    L(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, r = Cf;
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
    L(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    L(this, "triggerConnectorEvents", async () => {
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
    L(this, "getConnector", (t) => this._connectors.find((r) => {
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
      throw new C(M.INVALID_PROVIDER, "Error initializing Fuel Connector");
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
      return new U1(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(Gn.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
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
      throw new C(
        M.MISSING_CONNECTOR,
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
    Object.values(vf).forEach((t) => {
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
      return await Y1(async () => Cs(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: Z1
      })();
    } catch {
      throw new C(M.INVALID_PROVIDER, "Current connector is not available.");
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
    var i, a;
    const n = this.getConnector(t);
    if (!n)
      return !1;
    if (((i = this._currentConnector) == null ? void 0 : i.name) === t)
      return !0;
    const { installed: s } = await this.fetchConnectorStatus(n);
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(Ko)), await ((a = this._storage) == null ? void 0 : a.setItem(Gn.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = H1();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Cs(t.promise, X1).then(() => !0).catch(() => !1);
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
    return W1(
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
      r = new $n(t.url);
    else {
      if (t)
        throw new C(M.INVALID_PROVIDER, "Provider is not valid.");
      {
        const n = await this.currentNetwork();
        r = new $n(n.url);
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
    return new Ri(t, n, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Gn.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Bf = Gn;
Ct(Bf, "STORAGE_KEY", "fuel-current-connector");
Ct(Bf, "defaultConfig", {});
var xf = class {
}, b2 = class extends xf {
};
function D_(e, t) {
  if (!e)
    throw new C(M.TRANSACTION_ERROR, t);
}
function Rf(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Sf = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = Rf(r);
  return Wo(e, n, s);
}, Ke, U_, tc = (U_ = class {
  constructor(...e) {
    Ue(this, Ke);
    Je(this, Ke, e || []);
  }
  entries() {
    return Qt(this, Ke);
  }
  push(...e) {
    Qt(this, Ke).push(...e);
  }
  concat(e) {
    return Qt(this, Ke).concat(e);
  }
  extend(e) {
    Qt(this, Ke).push(...e);
  }
  toBytes() {
    return at(
      Qt(this, Ke).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Qt(this, Ke), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ke = new WeakMap(), U_), j1 = (e) => Qh + Fh({ maxInputs: e });
function J1(e) {
  const t = [...e.receipts];
  let r, n;
  if (t.forEach((i) => {
    i.type === ut.ScriptResult ? r = i : (i.type === ut.Return || i.type === ut.ReturnData || i.type === ut.Revert) && (n = i);
  }), !r || !n)
    throw new C(M.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: r.result,
    gasUsed: r.gasUsed,
    receipts: t,
    scriptResultReceipt: r,
    returnReceipt: n,
    callResult: e
  };
}
function ec(e, t, r = []) {
  var n;
  try {
    const s = J1(e);
    return t(s);
  } catch (s) {
    if (s.code === M.SCRIPT_REVERTED) {
      const i = (n = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : n.reason;
      throw Ho({
        logs: r,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function q1(e, t, r) {
  return ec(
    e,
    (n) => {
      if (n.returnReceipt.type === ut.Revert)
        throw new C(
          M.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(r)}`
        );
      if (n.returnReceipt.type !== ut.Return && n.returnReceipt.type !== ut.ReturnData) {
        const { type: i } = n.returnReceipt;
        throw new C(
          M.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: r,
            receipt: n.returnReceipt
          })}`
        );
      }
      let s;
      return n.returnReceipt.type === ut.Return && (s = n.returnReceipt.val), n.returnReceipt.type === ut.ReturnData && (s = t.func.decodeOutput(n.returnReceipt.data)[0]), s;
    },
    r
  );
}
var Si = class {
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
    L(this, "bytes");
    /**
     * A function to encode the script data.
     */
    L(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    L(this, "scriptResultDecoder");
    this.bytes = Z(e), this.scriptDataEncoder = t, this.scriptResultDecoder = r;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return Fh({ maxInputs: t }) + Qh + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Si.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = Z(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return ec(e, this.scriptResultDecoder, t);
  }
}, Tf = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, $1 = Tt, Nf = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: r,
  assetIdOffset: n
}) => {
  const s = new tc(
    un(16, e),
    un(17, r),
    Wn(17, 17, 0),
    un(18, n)
  );
  return t ? s.push(
    un(19, t),
    Wn(19, 19, 0),
    Xa(16, 17, 18, 19)
  ) : s.push(Xa(16, 17, 18, h.cgas().to_u8())), s;
};
function F_(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new tc();
  for (let r = 0; r < e.length; r += 1)
    t.extend(Nf(e[r]).entries());
  return t.push(Fo(1)), t.toBytes();
}
var K1 = (e) => e === ut.Return || e === ut.ReturnData, tB = (e, t) => e.find(
  ({ type: r, id: n, to: s }) => r === ut.Call && n === $1 && s === t
), eB = (e) => (t) => {
  if (Rr(t.code) !== 0)
    throw new C(M.SCRIPT_REVERTED, "Transaction reverted.");
  const r = tB(
    t.receipts,
    e.toB256()
  ), n = x(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => K1(i)).flatMap((i) => n.eq(x(i.is)) ? i.type === ut.Return ? [new et("u64").encode(i.val)] : i.type === ut.ReturnData ? [Z(i.data)] : [new Uint8Array()] : []);
}, rB = (e, t, r = []) => ec(e, eB(t), r), nB = (e) => e.reduce(
  (t, r) => {
    const n = { ...Tf };
    return r.gas && (n.gasForwardedOffset = 1), t + Nf(n).byteLength();
  },
  V.size()
  // placeholder for single RET instruction which is added later
), sB = (e, t) => new Si(
  // Script to call the contract, start with stub size matching length of calls
  F_(new Array(e.length).fill(Tf)),
  (r) => {
    var S;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = nB(r), i = (8 - s % 8) % 8, a = s + i, o = j1(t.toNumber()) + a, u = [];
    let f = o;
    const p = [];
    for (let F = 0; F < n; F += 1) {
      const R = r[F], D = f, z = D + dt, Y = z + Xn, U = Y + ka + dt + dt, Q = U + R.fnSelectorBytes.byteLength, T = Z(R.data);
      let O = 0;
      p.push(new et("u64").encode(R.amount || 0)), p.push(new it().encode(((S = R.assetId) == null ? void 0 : S.toString()) || Tt)), p.push(R.contractId.toBytes()), p.push(new et("u64").encode(U)), p.push(new et("u64").encode(Q)), p.push(R.fnSelectorBytes), p.push(T), R.gas && (p.push(new et("u64").encode(R.gas)), O = Q + T.byteLength);
      const P = {
        amountOffset: D,
        assetIdOffset: z,
        gasForwardedOffset: O,
        callDataOffset: Y
      };
      u.push(P), f = o + at(p).byteLength;
    }
    const m = F_(u);
    return { data: at(p), script: m };
  },
  () => [new Uint8Array()]
), Df = (e, t, r, n) => {
  var o;
  const s = (o = e[0]) == null ? void 0 : o.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return q1({ receipts: t }, s, n);
  const a = rB(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((u, f) => {
    var m;
    const { func: p } = e[f].getCallConfig();
    return (m = p.decodeOutput(u)) == null ? void 0 : m[0];
  });
  return r ? a : a == null ? void 0 : a[0];
}, iB = async (e) => {
  var S;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: a } = i, o = Array.isArray(t) ? t : [t], u = (S = o[0]) == null ? void 0 : S.getCallConfig(), f = Sf(a, u, o), p = Df(o, a, r, f), m = Ci(a);
  return {
    isMultiCall: r,
    functionScopes: o,
    value: p,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: f,
    gasUsed: m
  };
}, Ra = (e) => {
  var m;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], a = (m = i[0]) == null ? void 0 : m.getCallConfig(), o = Sf(s, a, i), u = Df(i, s, n, o), f = Ci(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: f,
    value: u
  };
};
function aB(e) {
  const { program: t, args: r, forward: n, func: s, callParameters: i, externalAbis: a } = e.getCallConfig(), o = s.encodeArguments(r);
  return {
    contractId: t.id,
    fnSelectorBytes: s.selectorBytes,
    data: o,
    assetId: n == null ? void 0 : n.assetId,
    amount: n == null ? void 0 : n.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: a
  };
}
var Ff = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    L(this, "transactionRequest");
    L(this, "program");
    L(this, "functionInvocationScopes", []);
    L(this, "txParameters");
    L(this, "requiredCoins", []);
    L(this, "isMultiCall", !1);
    L(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    L(this, "externalAbis", {});
    L(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Xr();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    return this.functionInvocationScopes.map((e) => aB(e));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  async updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = await e.getChain(), r = sB(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(r, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (r) => this.transactionRequest.addContractInputAndOutput(new ct(r))
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
      var a;
      const i = ((a = r.get(n)) == null ? void 0 : a.amount) || x(0);
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
    await yi(), await this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === It.Script && (this.transactionRequest.abis = Rf(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, r) => t.add(r.gas || 0), x(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new C(
        M.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost for dry running the transaction.
   *
   * @returns The transaction cost details.
   */
  async getTransactionCost() {
    const e = ve(await this.getTransactionRequest());
    return (this.program.account ?? Be.generate({ provider: this.getProvider() })).getTransactionCost(e, {
      quantities: this.getRequiredCoins(),
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Costs and funds the underlying transaction request.
   *
   * @returns The invocation scope as a funded transaction request.
   */
  async fundWithRequiredCoins() {
    var a;
    let e = await this.getTransactionRequest();
    e = ve(e);
    const t = await this.getTransactionCost(), { gasUsed: r, missingContractIds: n, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, r, i), n.forEach((o) => {
      e.addContractInputAndOutput(new ct(o));
    }), e.addVariableOutputs(s), await ((a = this.program.account) == null ? void 0 : a.fund(e, t)), this.addSignersCallback && await this.addSignersCallback(e), e;
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
    return t.tip = x(e.tip || t.tip), t.gasLimit = x(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? x(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? x(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.expiration = e.expiration || t.expiration, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
    const { amount: t, destination: r, assetId: n } = e;
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      new ct(r),
      t,
      n
    ), this;
  }
  /**
   * Adds multiple transfers to the contract call transaction request.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The current instance of the class.
   */
  addBatchTransfer(e) {
    return e.forEach(({ destination: t, amount: r, assetId: n }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        new ct(t),
        r,
        n
      );
    }), this;
  }
  addSigners(e) {
    return this.addSignersCallback = (t) => t.addAccountWitnesses(e), this;
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
    D_(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => iB({
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
    if (D_(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new C(
        M.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return Ra({
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
    return Ra({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return Ra({
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
    var o, u;
    const n = je((o = this.txParameters) == null ? void 0 : o.gasLimit) || this.hasCallParamsGasLimit, s = je((u = this.txParameters) == null ? void 0 : u.maxFee), { gasLimit: i, maxFee: a } = e;
    if (!n)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new C(
        M.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = r;
    else if (r.gt(a))
      throw new C(
        M.MAX_FEE_TOO_LOW,
        `Max fee '${a}' is lower than the required: '${r}'.`
      );
  }
}, Qf = class extends Ff {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, r, n) {
    super(t, !1);
    L(this, "func");
    L(this, "callParameters");
    L(this, "forward");
    L(this, "args");
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
        throw new C(
          M.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = ko(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, oB = class extends Ff {
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
}, _o = class {
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
    L(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    L(this, "provider");
    /**
     * The contract's ABI interface.
     */
    L(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    L(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    L(this, "functions", {});
    this.interface = t instanceof wr ? t : new wr(t), this.id = new ct(e), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), Object.keys(this.interface.functions).forEach((n) => {
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
      const t = (...r) => new Qf(this, e, r);
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
    return new oB(this, e);
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
}, cB = class extends Qf {
  constructor() {
    super(...arguments);
    L(this, "scriptRequest");
  }
  async updateScriptRequest() {
    this.scriptRequest || await this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  async buildScriptRequest() {
    const t = this.program.bytes;
    if (!await this.program.provider.getChain())
      throw new C(
        C.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `new Provider()`"
      );
    this.scriptRequest = new Si(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, dB = class extends xf {
}, uB = class extends dB {
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
    L(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    L(this, "interface");
    /**
     * The account associated with the script.
     */
    L(this, "account");
    /**
     * The script request object.
     */
    L(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    L(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    L(this, "functions");
    this.bytes = Z(t), this.interface = new wr(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new cB(this, this.interface.getFunction("main"), s)
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
        throw new C(
          C.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(t).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new C(
            C.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n);
        this.bytes.set(i, s);
      });
    } catch (r) {
      throw new C(
        C.CODES.INVALID_CONFIGURABLE_CONSTANTS,
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
    return Ef({
      deployer: t,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: (r, n) => new uB(r, n, this.account)
    });
  }
};
new Si(
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
function I2(e) {
  return e;
}
var _B = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(_B || {}), hB = (e) => {
  const { RegId: t, Instruction: r } = yl, n = 12, s = e.length, i = gr, a = at(e.map((u) => Z(u))), o = new tc(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    Hr(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    er(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    Hr(22, t.sp().to_u8()),
    // loop counter
    un(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    Js(17, 16),
    // push the blob contents onto the stack
    Yn(16, 0, 17, 1),
    // move on to the next blob
    er(16, 16, i),
    // decrement the loop counter
    ll(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    Al(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    Zs(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    js(22, 22, 4),
    // jump to the start of the contract we loaded
    Ws(22)
  ).toBytes();
  return at([o, a]);
}, lB = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), a = i.length;
    a % dt !== 0 && (i = at([i, new Uint8Array(t - i.length)]), a = i.length), r.push({ id: s, size: a, bytecode: i });
  }
  return r;
}, fB = (e) => {
  const r = Z(e), n = eh(r, 16384);
  return Dl(n.map((s) => X(s)));
}, AB = (e) => {
  const t = new mE();
  return e.forEach(({ key: r, value: n }) => t.update(ge(r), n)), t.root;
}, pB = (e, t, r) => {
  const n = fB(Z(e));
  return ge(at(["0x4655454C", t, n, r]));
}, Q_ = (e) => X(e.startsWith("0x") ? e : `0x${e}`), O_ = 0.95, Of = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, r = null, n = []) {
    L(this, "bytecode");
    L(this, "interface");
    L(this, "provider");
    L(this, "account");
    L(this, "storageSlots");
    this.bytecode = Z(e), t instanceof wr ? this.interface = t : this.interface = new wr(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), this.storageSlots = n;
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new Of(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    const t = ((e == null ? void 0 : e.storageSlots) ?? []).concat(this.storageSlots).map(({ key: o, value: u }) => ({
      key: Q_(o),
      value: Q_(u)
    })).filter((o, u, f) => f.findIndex((p) => p.key === o.key) === u).sort(({ key: o }, { key: u }) => o.localeCompare(u)), r = {
      salt: ze(32),
      ...e ?? {},
      storageSlots: t
    };
    if (!this.provider)
      throw new C(
        M.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || AB(r.storageSlots), i = pB(n, r.salt, s), a = new no({
      bytecodeWitnessIndex: 0,
      witnesses: [n],
      ...r
    });
    return a.addContractCreatedOutput(i, s), {
      contractId: i,
      transactionRequest: a
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
    if (je(n)) {
      if (s.maxFee.gt(n))
        throw new C(
          M.MAX_FEE_TOO_LOW,
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
    const t = this.getAccount(), { consensusParameters: r } = await t.provider.getChain(), n = r.contractParameters.contractMaxSize.toNumber();
    return this.bytecode.length > n ? this.deployAsBlobTx(e) : this.deployAsCreateTx(e);
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsCreateTx(e = {}) {
    const t = this.getAccount(), { consensusParameters: r } = await t.provider.getChain(), n = r.contractParameters.contractMaxSize.toNumber();
    if (this.bytecode.length > n)
      throw new C(
        M.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: s, transactionRequest: i } = await this.prepareDeploy(e), a = await t.sendTransaction(i);
    return {
      contractId: s,
      waitForTransactionId: () => Promise.resolve(a.id),
      waitForResult: async () => {
        const u = await a.waitForResult();
        return { contract: new _o(s, this.interface, t), transactionResult: u };
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
    chunkSizeMultiplier: O_
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = await this.getMaxChunkSize(e, n), i = lB(Z(this.bytecode), s).map((T) => {
      const O = this.blobTransactionRequest({
        ...e,
        bytecode: T.bytecode
      });
      return {
        ...T,
        transactionRequest: O,
        blobId: O.blobId
      };
    }), a = i.map(({ blobId: T }) => T), o = hB(a), { contractId: u, transactionRequest: f } = this.createTransactionRequest({
      bytecode: o,
      ...e
    }), p = [...new Set(a)], m = await t.provider.getBlobs(p), I = p.filter((T) => !m.includes(T));
    let S = x(0);
    const F = await t.provider.getChain(), R = await t.provider.estimateGasPrice(10), D = F.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: T, blobId: O } of i) {
      if (I.includes(O)) {
        const k = T.calculateMinGas(F), W = En({
          gasPrice: R,
          gas: k,
          priceFactor: D,
          tip: T.tip
        }).add(1);
        S = S.add(W);
      }
      const P = f.calculateMinGas(F), G = En({
        gasPrice: R,
        gas: P,
        priceFactor: D,
        tip: f.tip
      }).add(1);
      S = S.add(G);
    }
    if (S.gt(await t.getBalance()))
      throw new C(M.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let z;
    const Y = new Promise((T) => {
      z = T;
    });
    return { waitForResult: async () => {
      const T = [];
      for (const { blobId: k, transactionRequest: W } of i)
        if (!T.includes(k) && I.includes(k)) {
          const j = await this.fundTransactionRequest(
            W,
            e
          );
          let J;
          try {
            J = await (await t.sendTransaction(j)).waitForResult();
          } catch (v) {
            if (v.message.indexOf(`BlobId is already taken ${k}`) > -1) {
              T.push(k);
              continue;
            }
            throw new C(M.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!J.status || J.status !== nf.success)
            throw new C(M.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          T.push(k);
        }
      await this.fundTransactionRequest(f, e), z(f.getTransactionId(await t.provider.getChainId()));
      const P = await (await t.sendTransaction(f)).waitForResult();
      return { contract: new _o(u, this.interface, t), transactionResult: P };
    }, contractId: u, waitForTransactionId: () => Y };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new C(
          M.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(e).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new C(
            M.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n), a = Z(this.bytecode);
        a.set(i, s), this.bytecode = a;
      });
    } catch (t) {
      throw new C(
        M.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new C(M.ACCOUNT_REQUIRED, "Account not assigned to contract.");
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
    return new ci({
      blobId: sr(t),
      witnessIndex: 0,
      witnesses: [t],
      ...e
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  async getMaxChunkSize(e, t = O_) {
    if (t < 0 || t > 1)
      throw new C(
        M.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const r = this.getAccount(), { consensusParameters: n } = await r.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber(), i = n.txParameters.maxSize.toNumber(), a = 64e3, o = i < s ? i : s, u = o < a ? o : a, f = this.blobTransactionRequest({
      ...e,
      bytecode: ze(32)
    }).addResources(
      r.generateFakeResources([
        { assetId: await r.provider.getBaseAssetId(), amount: x(1) }
      ])
    ), p = (u - f.byteLength() - dt) * t;
    return Math.round(p / dt) * dt;
  }
}, E2 = 9, v2 = 3, C2 = 9, B2 = 9, x2 = 18, R2 = 15, S2 = 12, T2 = 9, N2 = "https://devnet.fuel.network/v1/graphql", D2 = "https://testnet.fuel.network/v1/graphql", gB = Object.defineProperty, wB = (e, t, r) => t in e ? gB(e, t, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: r
}) : e[t] = r, rc = (e, t, r) => (wB(e, typeof t != "symbol" ? t + "" : t, r), r), Mf = {
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
}, mB = [
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
], di = class extends _o {
  constructor(e, t) {
    super(e, Mf, t);
  }
};
rc(di, "abi", Mf);
rc(di, "storageSlots", mB);
var Lf = kA(
  "H4sIAAAAAAAAA9Vbe3Abx3lfgCAFvayz+TAFSjaUUjJkRwosUQ4ly9IhIATSEM2DSVpUGBhg64c0cSyIlVQ5tsccN001aSZlHcdlO06GrtOp6z4GAB+C7T7YR2bUiTtlZhxbTeMWmiatFAst60YZqm6j/r5v93DHw4GOJ84f0QznFne73+5+j9/32FVgISxOCOEV/K/Dn7o259GuXRO/JcSQ8c6CML4nwkZJF8HFnWLovZLXeK/kOyG89+JbGN9C+BZe+q2uEfRE4LIBGiv1VHThdi0i5gJdGTHa7TW0WNNY4JLmoFfXE4jPi3T5ep/q112j337Vr8WIF3PV373nAol5YfTls6OG8Id6m9E3+DG0tVB5F96/onG7b0akejWh9XaMpWNhYcSnL44exPv49JzLnNtoTtDMpMvaR0FvmxHPaaPd6B/rGDMSxRCP7WmaMxJ5I10Wt47qYg2etxnR/CJ/i7Tj29nuSr/42Tlux3yYLygC36+aMxiIzotTuuck+LeD+If9hoxEIQS6MdDX8DxgRAudNvrzNvql96Hvl/TFJdDfaaPfDbo9oL8az7tBf8hGf8GiXxTL0/cuKPpPg36Hjf4R0O1V678H9E9b9IuaRX+m9X3on1f0HwD9XTb6Z0A3Cfrr8LwX9Ccs+jOWnOIzkm+16c8p+juXvl/9f0Z0GnonHP19CeqfigmR6hGeVER4jb5Z7FH7a+jL32Atf2tEp84ELoUxV9XYQzQWOnVO6pRvzIi+AhugdTehPVtpV8/r/TyPTcxWdIv246CfIf3dHNGEES0GjXihRHSq9+z5slrHBOYLy3XkJ7nN6zg7brar17F6c0AXYjP+lr5fNWW+x/4nqsc1PK3mHLLmLGatOaddxtSxboHPsGHF6/7Zc6MDGJNs1o347CJ4/i/pcrgEvl/AvOcCl3Teb+CCk5b/tmq5zVyE3P4cNP4C4/8S40+7y63uklr7GUtuReKXktuMfxm5tSq5ST10lVvdu6bcoON3KB0PGokpjTAq8H1nf8/vME4lcoRlQann+TFux9rnHLTfgQ2QzuCbbw57PgJcDIZ660lOYab/PejIBez77aq1vyH3nfdjfDePjxaL3I5gzmh+Pn1Z22P0Cr+kuRnYOTuEdjfhMeQziXYoFKsXkq9OPVxxCnbrH+3C2Eg75Dnt5geO0V5TPeBNr+ZJxTTowNkh6EAwlKzXoaunIb//hA4sQJb/ZcSnFqUO0J6ctPyHXXRgHuNeBY3XoAN/Bj08X0MHjigd6LZ0oPCSKXfIbX0qnhtMJXL3dXh891q2MA0ZOmmt/JaiFcR48If1qZPb0haOuNjCtiW2kBTe1CDah9U+0oXiaAbjUy0C6/A1xjRxqktsT0VzhxojQge+ebHGwB28pkLRiAi/EX8lyHyMgY/xmUnwYBp8nEmX9VkjMW0ELpLukS059c/7lotMNJtMwqD1b6D17+DtRcgEOFRLJit+6JQJYgoN6wG+G/l0OVOAXKbAk87ARYll1bbtnXKRaxFzn8U68BSvYDywwU2u3neVLM7bbDtj2fb0Ym3b9mxStl3xN9W27X3PtO2vCHHzc34zXhKTgeikCMTHRSAxJgJ9JWH052CP5h6dcZgI8B4jAnGOWIv1HjGiuU6JD851iTbqC7sKh8o+yCOX5XZ02mr3+PTAD4V4htZxNSwmsK7fxvruXhS0zhXmOuUasb5ESaTB38AVzHc1aPZfofo/Ze3Lc5HHDGNfh0qw+6q1fZL40QjdOdUt7sZTx3M1/Li3MdJEfthzB2JKrHMB6/RChjch1jpjrhnjd5PfAu40utCOUkzY2BsUpw6KGxt7gkRb0kvkzmHMesR2uuRx2Dm2i2XZB5s08TESlLgWoXgyn8EaQ6HedoqhbwC9bPqyuA7vgzXohVkGhLtl4CbRonZ0Ghhs0TIiGvkO2D3Fl9inTvtsIswtcjvG89WDHzrmg83ivfKf/P1wE2SSgRzB96uGKZenlFwq+iblWJL40RMkDBEUN2u9u0Q6Aru4gtjoqubUA7u+ZphGAnKFrpKtMW/KhPM5ndtxxNrqvRZDPM5xCPhJ+A7d4yfpHeaC3mVc9M4+H3x/lX1ka9nHSSH+2GYfrZgXtrhUP9AnyrqXhO4ZogUYqQMjpX4A16EfKzEHYgCao4r+J1ievGfSDciN2tEZWtcEyzPZZMoqCFn5+H0XvWcbPMftSJfVtmxwwYUXdVWyw94CV/BnyanOaa/gm2b2Z9wq+8YC0VxlLObSbONN+91vG29YfAcNwjXob+CdXLV+98Fe+pEfDaAP4jHCeEefWwL9ZI+78AcdMwTZ5QbYWJhzM9gYYbJjzK2Krr4M3U0c//RDt7hPvVsfznu2JjuMwBWd9m3YcGv/B+CbZxm+fYh8rzsXOITx/ZBzdOHjMgbMXwQtituADYiTONajGCxvWHEb7LYqbhMPKfzvlvg/NcZtxv9Cd6Udz8MnuuUHvqwt1pHzRwuUE9A4Fz/oOy79YIH8oBmPIp6nfMvN54tBRf+IlQtMEQ6qXGAqo74Beym2yl2PmOYG+t3WA9w7KPxtPR1jW7pBuzsLbJ7K7O7xzcN3NJDfgO3BZxTO23zGdYQHsG/KNf1tsQ5diyHeTMA+D5IdYr0xxLDURvxsHwteE35hXe2ob+SGVSylfFQ+KOOoKRm7ESaTXQ8SxhmQOWR6VXfqnN3WupdiXJblz3FUuV6H7/Nh3SEzPgbGdIf6pqFPYdKnbhfa12x+2MLPYdCGL8Yawbcm4l9I62mnusTN6ll/s3z61qea5jAfeHRC534x/KZ+8ll/M56w35zpI7EmrLWDeEE1CenfIANT9g6575R6Aru1dFnlOFV9Q8ofS9/C+UqecAO8QJ6RyMs19LBvzr7Y63uB7IJ1BjqK71m8H8f7SV4b6xJ8bDRntRO5jLWOnMyfUD8A35vS5Wwzy/0wyZL9KzC64l+vKX6vs8lSt+Mm4T/+6vHXAH+0gv2gigWYZ3GSo0Zy1G24tK46nhLjLn7wNHSklbARa2wNleFT4oypreyDh3MNqUO5FbAZ8lF+LdksmpMxHT7PQ/4J77xtg4NiywCYvPEBPTCUFVryAT2dhO/W0R9xGPvDcmYlYvBVWP9qrL+V6UfY32e4jbwO/VspXlE+fdzmx8wYxM4jpe+kiz5h2W+uFXF6Hb3Dk/kGGWFfLKMw+NYaSkyT/mH+9jmFp9D/Cp6afLPbFvI1Sx6Yw+A1S50l2hSbEF61ks6m+nL1sGWN/A7yFr/Rq/vBY9QVKZ/B3rm21GXV8qTsjnz4PsVjs2H/PNktchCOSRx5xXa2jzTHyeFQClg1nA8D47YcBz4Bo6j+cx68HKY8H+8fOt5NeZFpu2RDs0XLhmaGpM06/XHdE7LOCrsxx/WofJ/G9SAOYgwlGzpLORRjOHKjuxzr/W/269H8ONa0g2p4JmZSXNAC3mLN7ci9QqgD6Oa3VDRfrzB3DfD3DNqUI9hy2akh7O3T+DuGuuWQGVdBz9eCb7rE5yL5FunH4lN+zD+i1i1tn8ZR/MZx91mKq8kPUCyHmtL0S2bu6tjPd5SPJblCR4qEm5r0sVMU33Ebaxamz6DaO35/Vu1hFdqP2b7V0TfKeRojPs7XtaSuI+6MEW2su5KfgietDppPKJoRtB930HzCheYnZT7suq+vK99MMlD58BTlHKrOkfM76J+20Yf/RV32skiCp1TXMWVxI+Regoz2jsQ+EYHeTaBWAd63YJ4Z5LCuddl/VjUuo9KXfDS1Y1vw3qIPmYVtMtuFvRVr7O0zam+qpk97m6Y4w9wb9rGEr19SfKV9ZbCvg1h7ybGvIvb1ceyrDt9O2/bVWmNfL6l9Bd33ZdG37ws6QLVaVR8iG5mi2HCJjQS6eK2eQBfXfr5CY1CDq9iZrG25+doKX6geq+I9qrHPEu+xlgbCINTV3Hy6937l08flfqjvzEVuR4gPs5W9uceagmurWPfDdMYBXsbB5wTbYWXdUxR78t4hkwUlo1a0R13wYFzZ/GnL5gtk89C7Qg7P+4xelddzjq/wS557vGTm31jXKkULOIrzoMvaR4EZ5C/8CjMqfRn3VIwI7CLd4pgW63tPrU/Fi9OaWhvFKXJvsYzM/3mfM7LOETlB9TiV5z/A8bYL3zg+MvdPeSTe3YQzBML8f8J4lcdW1VPvUzVdqj2a9k28NuuYbYgbsqhjHqc6Jn5vIL5K3PCg5kQ6ZWG3ev/oM+SrKvGRx4yPbPm8p1TxxxTj0t7gD+Fbw1bcD9/UJTI1cHOD+t2EdovJV9s3wXqP8yz6bsMkE6c2mO9UP9gJ8yxK80q54BnTwvjzq9hQ+rVIkORO+sfxKugYKh9Y41jHLer3BrQ/4lg/favYKNeQQEvOi2dMC8l5cQ5jxcYUb1AOpM6uqmLkAGHJMrRs8a06H6hNawXRknENZGXlFmY9omasW6lxmTEu5nghOh1UMY5bfGvPexdteW+nzHuR61p5r8opeQ+o/9TOe08q3bblvaRPZt57xJb3XqxhUwWXvDdXO+8VXHems1Rb3gvfUzPv3eeS99r0H3jzwfLecSvvzVPOgTOjwiL22WnLe7nu6ZL3EnaZeS/VGSnvrYwFvU5uSz1PO/LeTpX3Up1c1iIJt6y8d/GnyE3DP2FuGv4wc1PozuhPmpui75M/T7lpla2q/MXFLt1qjr73qzkGoiUxgjqqqunX2+uqhLXQQ8Za9b1Bfa/47JEuTx31AY16uS7hrJPZ68LIoaz9OGq07ZRjNCd9c5TrNsrntpGIF/VHrj0G8dTxbAIfyBdQzkE1I1lb70esSfkdxhEekm+C7TRQX+SEK+zfIXuq4aOG2UX7Ixqo+WrIXbV6/qbqm1Sz5n7JDrOfhj5ezFfH3xQ97hPrYvxFP8qBSX/pnopZJxizycsNkxEPLJFziDCZ6o9LbRc1AZsOgG7IRQ/sdHE/pRrrHTWM4PI1DJu9Uz5LfKT4IQnMg79ifGWsz827nXdDrgXyTWwbZR5Ddwh4jPO8GH1zCmMXuD/OlEF30rRj51nmSeF73XYW63IXIj+vvpmY7Acmr6yNyfn53T0dhDcW3vYhRxqi857YmDwPBy7E8/N3xnzjsv6/xH7NuokNL71WTT4NvBy24iclX4opvmCLmW6kNvqQjo8tjY8RE1BthfYWz1GM6a3lr8CbF1zOZo+RDgHD6O6BjI8SeaqPUB0I/g9nNHxuDJrV9Gaqz40R/w2QLtSTn2lQe6Fza2o7zq1zYfY7/QUaI8+a+/OoUwW3wj5vBTbehvkn5fzI/6rn/3b1/MDqyrk17jOUg3tA607Q2gtaiBNqnVuLAy68CdnWaJ2H96MuUw5uAd1bQBe5W+6MPMt2XeOPXdZI9T5zjROgtRO0OkBrF2jBZmqucaPLGtdRrGDTgSG5Fjf51/P5tn18OqWJdCroSaegN1ey0F3o5tWM0/fYdFfI8+Cl9ctWaz/QQaplRsxaJp+VGdymPGA4twq1TIrp11AdXIv59OZYM/sXrmXCj7QNDuiqlimolskx1KcI42JzqGsKbiebKXYIaoj/if+obV6P2uYNqG020jm6rbZJd1a4tsn+2HxPbVqTdX6J89ZKrdPct73+uMRPAQNCzrMu8PcA+atUMixSg2FPqjfstdmzXe9x11BHHdbAXb3wGtDSLJlV0fwSywz+DndE5F2IQzncxQuvBY3rsF/IP4fzMvjtqrimvk+dWfOZ3zL+x4zpbBjvteIMC+NxT4vxmvDTxHjcBXHDeO9tDoynOLgGxnu3qhxW9pcYz3dE3THe+zUXjKe43sT40gfE+JILxo8B48MK4zEHY3zJwnjwZ5nzefhI1IoRb8UXdmsxDZiawx0g5z5WrKZarPTtFK9TjV5bCb1sw3MV363j+jR/O8/9UDfHeuncGvEI67c6l8N5bDVebFe1Kds5HuxT3SujGo/7fTTRoPwY6tmV2M3tTF/FEuy/KI7gengYdxICB6lgnRTPoha8Q4d8dKFvge6nN8I29KwIRurEvYhF78Y7GW9U3VWwxxvFKswZ5lhdCx0GD/rhryyf8wvKz9yv2g7bk/dFlsqhoYPthM8ouIZR4jbH9nxWQDhBcTvdeeUzC2DYuhTOyimnQx95V1jyl843TJmNm++hf42UE9HdaIV5VNOzMC/ZpW8Br0IbB0RggDFP3kdEvUiLDQicZzTzfWfUAVDLaWL68EvAP5ozByxpAR7cqO5KkK2a/oDupgL/2EaoLiTfo61s0vyG8wK33KgB90QqOa6qL+H+oFVf2oy9bcKaPkL1JZVPtqraxQTnTYy9aC+5LwKZLn+2pGIkyBr662I737HbDseflNPLGgV8WNVZkh3bcFcLdBGrVmORb4fCLcRjzD+ZS+B+OOfV0v4kJsD+3M5YQOPv+F6KvLO3AxiwhzAglVi4U+sJ4mxqYa/WG55L9S/chXrbHPA8C6wJhgabxzDXDUbMCPHv2OYxo0sPc/45BOzsGRwzDuFeOsWe6CvnBoOXYuMlFQdiPO7IXxZtqs4J3nfNGd068A41mMqdzgLdtwe+bXa904la4OdULbIFtRO6B9MFvqk7V1V9v6l0hWogpq5U7kBDV7ZDV4LQlU32WiSwFHfWKjhj6oJNXnXynBFxskM33yS9xJrWgkeEj3TGD/mg3rSsfOpvN+WjZPQpyGifxGlVVyNb7kPewPUAxlnEjqBVuVvr3Lvfo7CW7sJDVoQFU6Sf8Hmw1XjhTKWdKJCv4bW6+07PBcddbr5H6ND/keq71Pg/BZW71HRfP9iLOOEeYEKftG/3u9Sof2ypvm+Zp9pEJ2jsxvg9GN/tdt8S6zDv0VIOp2Su7l5KmX8MMm+DzDfwPVqpS83QJdJNA7pUuQPm0GM+h7DO4/iOlTqDWwiD5nrQDCzVI+iJFbsu55P31/bJ/oWfpU+GbDln+qA+GePeruWTf1b/sqPHTj+WPjEy+vCD9N+CxC8/eCJtf/f49NCf/NW3Wo/vXP/7r06u2ub76pu9W1viT24589bR7LmJvx+UfY/9yqMPjjK9o48ePXF05JGjn31QkrHoyT4bv7vq7RduWeV5nf8J7/7s9hd3bXj+pmv8T4jXHnvm8eZ/3Py1F1vevVzY+uQj536t9cwfPn167vdK+wIrb/qDgQMjjzzyiyO/9OnY6Oix0T17BniR9xw70S+XL764+Zt3fP7A9t/N/+ZE57Nf/vrLvkvPvzZ7cNOb//qZYwfLl18+uv/V/5j8h4eu+8Ku/xk+uePbe3/06xf23ZVr+sG7/m8Uv9HxR0fvemvl2vu9D6f3bfzxUz/47sbnHn7u7V/9ja6rX/3i3kfH/9To/dHLkms7/1c+d7yuns+r50H5vF19335ePtvfkM8W9X3lEfn0qff1n1PPDvV8Vj7rJuXT88b/AzdExjYINgAA"
), Pf = class extends Of {
  constructor(e) {
    super(
      Lf,
      di.abi,
      e,
      di.storageSlots
    );
  }
  static deploy(e, t = {}) {
    return new Pf(e).deploy(t);
  }
}, yB = Pf;
rc(yB, "bytecode", Lf);
export {
  Xn as ASSET_ID_LEN,
  d1 as AbstractAccount,
  b2 as AbstractContract,
  xf as AbstractProgram,
  a2 as AbstractScriptRequest,
  Ri as Account,
  ct as Address,
  SC as AddressType,
  ft as ArrayCoder,
  it as B256Coder,
  Rg as B512Coder,
  i1 as BALANCES_PAGE_SIZE_LIMIT,
  a1 as BLOCKS_PAGE_SIZE_LIMIT,
  Mt as BN,
  gr as BYTES_32,
  Rn as BaseTransactionRequest,
  hf as BaseWalletUnlocked,
  et as BigNumberCoder,
  ci as BlobTransactionRequest,
  Tg as BooleanCoder,
  St as ByteArrayCoder,
  Oh as ByteCoder,
  st as CHAIN_IDS,
  ka as CONTRACT_ID_LEN,
  kB as CONTRACT_MAX_SIZE,
  TC as ChainName,
  n2 as ChangeOutputCollisionError,
  At as Coder,
  _B as Commands,
  _o as Contract,
  Of as ContractFactory,
  no as CreateTransactionRequest,
  B2 as DECIMAL_FUEL,
  T2 as DECIMAL_GWEI,
  R2 as DECIMAL_KWEI,
  S2 as DECIMAL_MWEI,
  x2 as DECIMAL_WEI,
  C2 as DEFAULT_DECIMAL_UNITS,
  v2 as DEFAULT_MIN_PRECISION,
  E2 as DEFAULT_PRECISION,
  o1 as DEFAULT_RESOURCE_CACHE_TTL,
  N2 as DEVNET_NETWORK_URL,
  Ao as DateTime,
  zs as ENCODING_V1,
  PB as EmptyRoot,
  Mh as EnumCoder,
  M as ErrorCode,
  u0 as FAILED_ASSERT_EQ_SIGNAL,
  h0 as FAILED_ASSERT_NE_SIGNAL,
  _0 as FAILED_ASSERT_SIGNAL,
  d0 as FAILED_REQUIRE_SIGNAL,
  dl as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  XB as FAILED_UNKNOWN_SIGNAL,
  Bf as Fuel,
  V1 as FuelConnector,
  Cf as FuelConnectorEventType,
  Ko as FuelConnectorEventTypes,
  vf as FuelConnectorMethods,
  C as FuelError,
  Qf as FunctionInvocationScope,
  c1 as GAS_USED_MODIFIER,
  xa as HDWallet,
  FB as INPUT_COIN_FIXED_SIZE,
  ir as InputCoder,
  Fc as InputCoinCoder,
  Us as InputContractCoder,
  Dr as InputMessageCoder,
  vt as InputType,
  tc as InstructionSet,
  wr as Interface,
  p1 as Language,
  U1 as LocalStorage,
  HB as MAX_PREDICATE_DATA_LENGTH,
  YB as MAX_PREDICATE_LENGTH,
  UB as MAX_SCRIPT_DATA_LENGTH,
  GB as MAX_SCRIPT_LENGTH,
  VB as MAX_STATIC_CONTRACTS,
  zB as MAX_WITNESSES,
  S_ as MNEMONIC_SIZES,
  S1 as MemoryStorage,
  jo as Mnemonic,
  wf as MnemonicVault,
  oB as MultiCallInvocationScope,
  aC as NoWitnessAtIndexError,
  s2 as NoWitnessByOwnerError,
  q as NumberCoder,
  RC as OperationName,
  zh as OptionCoder,
  Oc as OutputChangeCoder,
  ar as OutputCoder,
  Qc as OutputCoinCoder,
  Vs as OutputContractCoder,
  Lc as OutputContractCreatedCoder,
  wt as OutputType,
  Mc as OutputVariableCoder,
  f0 as PANIC_DOC_URL,
  l0 as PANIC_REASONS,
  or as PoliciesCoder,
  Qe as PolicyType,
  vs as Predicate,
  mf as PrivateKeyVault,
  $n as Provider,
  E_ as RESOURCES_PAGE_SIZE_LIMIT,
  Dg as RawSliceCoder,
  ut as ReceiptType,
  Qh as SCRIPT_FIXED_SIZE,
  uB as Script,
  Si as ScriptRequest,
  Xr as ScriptTransactionRequest,
  vn as Signer,
  di as Src14OwnedProxy,
  yB as Src14OwnedProxyFactory,
  pi as StdStringCoder,
  w2 as StorageAbstract,
  Pc as StorageSlotCoder,
  Gh as StrSliceCoder,
  Fg as StringCoder,
  gi as StructCoder,
  D2 as TESTNET_NETWORK_URL,
  uf as TRANSACTIONS_PAGE_SIZE_LIMIT,
  Hc as TransactionBlobCoder,
  nr as TransactionCoder,
  Gc as TransactionCreateCoder,
  Uc as TransactionMintCoder,
  ao as TransactionResponse,
  zc as TransactionScriptCoder,
  nf as TransactionStatus,
  It as TransactionType,
  xC as TransactionTypeName,
  Vc as TransactionUpgradeCoder,
  Yc as TransactionUploadCoder,
  Uh as TupleCoder,
  Jr as TxPointerCoder,
  Gs as UTXO_ID_LEN,
  kc as UpgradePurposeCoder,
  ke as UpgradePurposeTypeEnum,
  so as UpgradeTransactionRequest,
  io as UploadTransactionRequest,
  LB as UtxoIdCoder,
  N1 as Vault,
  Qg as VecCoder,
  dt as WORD_SIZE,
  Be as Wallet,
  gf as WalletLocked,
  T1 as WalletManager,
  De as WalletUnlocked,
  cr as WitnessCoder,
  Tt as ZeroBytes32,
  DE as addAmountToCoinQuantities,
  qn as addOperation,
  Ln as addressify,
  bC as aggregateInputsAmountsByAssetAndOwner,
  Z as arrayify,
  sC as assemblePanicError,
  e2 as assembleReceiptByType,
  iC as assembleRevertError,
  ls as assembleTransactionSummary,
  g2 as assembleTransactionSummaryFromJson,
  D_ as assert,
  zA as assertUnreachable,
  jB as assets,
  x as bn,
  Vr as bufferFromString,
  r2 as buildBlockExplorerUrl,
  Ra as buildDryRunResult,
  iB as buildFunctionResult,
  Y1 as cacheFor,
  i2 as cacheRequestInputsResources,
  cC as cacheRequestInputsResourcesFromOwner,
  En as calculateGasFee,
  tC as calculateMetadataGasForTxBlob,
  jl as calculateMetadataGasForTxCreate,
  Jl as calculateMetadataGasForTxScript,
  g_ as calculateMetadataGasForTxUpgrade,
  eC as calculateMetadataGasForTxUpload,
  rC as calculateMinGasForTxUpload,
  AC as calculateTXFeeForSummary,
  Fh as calculateVmTxMemory,
  xB as capitalizeString,
  eh as chunkAndPadBytes,
  ko as coinQuantityfy,
  NB as compressBytecode,
  xh as computeHmac,
  at as concat,
  li as concatBytes,
  OB as createAssetId,
  I2 as createConfig,
  po as dataSlice,
  MA as decodeBase58,
  QB as decodeScriptData,
  kA as decompressBytecode,
  Jp as decrypt,
  $p as decryptJsonWalletData,
  TB as defaultConsensusKey,
  SB as defaultSnapshotConfigs,
  H1 as deferPromise,
  Ef as deployScriptOrPredicate,
  Ka as deserializeChain,
  to as deserializeNodeInfo,
  Zv as deserializeProviderCache,
  We as deserializeReceipt,
  y2 as dispatchFuelConnectorEvent,
  ih as encodeBase58,
  qp as encrypt,
  Kp as encryptJsonWalletData,
  Es as english,
  KC as extractBurnedAssetsFromReceipts,
  Df as extractInvocationResult,
  $C as extractMintedAssetsFromReceipts,
  Ho as extractTxError,
  vB as format,
  EB as formatUnits,
  Wg as fromDynamicInputToB256,
  Zg as fromEvmAddressToB256,
  Xh as fromPublicKeyToB256,
  SE as fuelAssetsBaseUrl,
  Kv as gasUsedByInputs,
  Rf as getAbisFromAllCalls,
  oC as getAssetAmountInRequestInputs,
  JB as getAssetById,
  ZB as getAssetEth,
  WB as getAssetFuel,
  EE as getAssetNetwork,
  Ql as getAssetWithNetwork,
  qB as getAssetsByOwner,
  dC as getBurnableAssetCount,
  $o as getBytecodeConfigurableOffset,
  M1 as getBytecodeDataOffset,
  L1 as getBytecodeId,
  XC as getContractCallOperations,
  JC as getContractCreatedOperations,
  pB as getContractId,
  fB as getContractRoot,
  AB as getContractStorageRoot,
  Wo as getDecodedLogs,
  IE as getDefaultChainId,
  Ci as getGasUsedFromReceipts,
  Zo as getInputAccountAddress,
  EC as getInputContractFromIndex,
  ef as getInputFromAssetId,
  Xo as getInputsByType,
  pC as getInputsByTypes,
  gC as getInputsCoin,
  tf as getInputsCoinAndMessage,
  mC as getInputsContract,
  wC as getInputsMessage,
  m2 as getLegacyBlobId,
  Yo as getMaxGas,
  MB as getMessageId,
  Wl as getMinGas,
  Ga as getMintedAssetId,
  qC as getOperations,
  hs as getOutputsByType,
  CC as getOutputsChange,
  rf as getOutputsCoin,
  BC as getOutputsContract,
  vC as getOutputsContractCreated,
  u2 as getOutputsVariable,
  jC as getPayProducerOperations,
  G1 as getPredicateRoot,
  Yg as getRandomB256,
  Jn as getReceiptsByType,
  OC as getReceiptsCall,
  MC as getReceiptsMessageOut,
  h2 as getReceiptsTransferOut,
  p_ as getReceiptsWithMissingData,
  $l as getRequestInputResourceOwner,
  Sf as getResultLogs,
  cf as getTotalFeeFromStatus,
  t1 as getTransactionStatusName,
  f2 as getTransactionSummary,
  A2 as getTransactionSummaryFromRequest,
  sf as getTransactionTypeName,
  p2 as getTransactionsSummaries,
  WC as getTransferOperations,
  UC as getWithdrawFromFuelOperations,
  _2 as hasSameAssetId,
  sr as hash,
  ig as hashMessage,
  X as hexlify,
  Q_ as hexlifyWithPrefix,
  Uv as inputify,
  ta as isAddress,
  wn as isB256,
  Yv as isCoin,
  je as isDefined,
  So as isEvmAddress,
  b_ as isInputCoin,
  t2 as isMessage,
  A_ as isMessageCoin,
  w_ as isPredicate,
  Hh as isPublicKey,
  $B as isRawCoin,
  KB as isRawMessage,
  mr as isRequestInputCoin,
  xi as isRequestInputCoinOrMessage,
  Bi as isRequestInputMessage,
  ql as isRequestInputMessageWithoutData,
  Kr as isRequestInputResource,
  ro as isRequestInputResourceFromOwner,
  o2 as isTransactionTypeBlob,
  fC as isTransactionTypeCreate,
  Pr as isTransactionTypeScript,
  c2 as isTransactionTypeUpgrade,
  d2 as isTransactionTypeUpload,
  Sn as isType,
  QC as isTypeBlob,
  af as isTypeCreate,
  NC as isTypeMint,
  of as isTypeScript,
  DC as isTypeUpgrade,
  FC as isTypeUpload,
  Bh as keccak256,
  DB as keyFromPassword,
  CB as max,
  BB as multiply,
  Vg as normalizeB256,
  nC as normalizeJSON,
  RB as normalizeString,
  Vv as outputify,
  Xg as padFirst12BytesOfEvmAddress,
  tg as pbkdf2,
  l2 as processGqlReceipt,
  e1 as processGraphqlStatus,
  ze as randomBytes,
  rg as randomUUID,
  TE as rawAssets,
  xe as resolveGasDependentCosts,
  RE as resolveIconPaths,
  m_ as returnZeroScript,
  eg as ripemd160,
  Ch as scrypt,
  Hv as serializeChain,
  Xv as serializeNodeInfo,
  Wv as serializeProviderCache,
  ge as sha256,
  NA as sleep,
  jg as sortPolicies,
  Mn as stringFromBuffer,
  Hg as toB256AddressEvm,
  pr as toBytes,
  IB as toFixed,
  ho as toHex,
  Rr as toNumber,
  tr as toUtf8Bytes,
  go as toUtf8String,
  Re as transactionRequestify,
  sg as uint64ToBytesBE,
  xE as urlJoin,
  Kl as validateTransactionForAssetBurn,
  Cs as withTimeout,
  lC as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
