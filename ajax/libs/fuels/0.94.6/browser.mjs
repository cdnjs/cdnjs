var K_ = Object.defineProperty;
var sc = (e) => {
  throw TypeError(e);
};
var th = (e, t, r) => t in e ? K_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var F = (e, t, r) => th(e, typeof t != "symbol" ? t + "" : t, r), Hi = (e, t, r) => t.has(e) || sc("Cannot " + r);
var Wt = (e, t, r) => (Hi(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Ge = (e, t, r) => t.has(e) ? sc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), qe = (e, t, r, n) => (Hi(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), ps = (e, t, r) => (Hi(e, t, "access private method"), r);
function tu() {
  return {
    FORC: "0.63.5",
    FUEL_CORE: "0.35.0",
    FUELS: "0.94.6"
  };
}
function ic(e) {
  const [t, r, n] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: r, patch: n };
}
function Zo(e, t) {
  const r = ic(e), n = ic(t), s = r.major - n.major, i = r.minor - n.minor, o = r.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function eh(e, t) {
  const { major: r } = Zo(e, t);
  return r === 0;
}
function rh(e, t) {
  const { minor: r } = Zo(e, t);
  return r === 0;
}
function nh(e, t) {
  const { patch: r } = Zo(e, t);
  return r === 0;
}
function sh(e) {
  const { FUEL_CORE: t } = tu();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: eh(e, t),
    isMinorSupported: rh(e, t),
    isPatchSupported: nh(e, t)
  };
}
var ih = tu(), oh = Object.defineProperty, ah = (e, t, r) => t in e ? oh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ch = (e, t, r) => (ah(e, t + "", r), r), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_URL = "invalid-url", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.NOT_ENOUGH_FUNDS = "not-enough-funds", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(D || {}), vs = class extends Error {
  constructor(t, r, n = {}, s = null) {
    super(r);
    F(this, "VERSIONS", ih);
    F(this, "metadata");
    F(this, "rawError");
    F(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new vs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(D);
    if (!n.includes(r.code))
      throw new vs(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new vs(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o };
  }
}, x = vs;
ch(x, "CODES", D);
var Rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Jo(e) {
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
var qo = { exports: {} };
const uh = {}, _h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: uh
}, Symbol.toStringTag, { value: "Module" })), hh = /* @__PURE__ */ Jo(_h);
qo.exports;
(function(e) {
  (function(t, r) {
    function n(B, d) {
      if (!B) throw new Error(d || "Assertion failed");
    }
    function s(B, d) {
      B.super_ = d;
      var _ = function() {
      };
      _.prototype = d.prototype, B.prototype = new _(), B.prototype.constructor = B;
    }
    function i(B, d, _) {
      if (i.isBN(B))
        return B;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, B !== null && ((d === "le" || d === "be") && (_ = d, d = 10), this._init(B || 0, d || 10, _ || "be"));
    }
    typeof t == "object" ? t.exports = i : r.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = hh.Buffer;
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
      var m = 0;
      d[0] === "-" && (m++, this.negative = 1), m < d.length && (_ === 16 ? this._parseHex(d, m, A) : (this._parseBase(d, _, m), A === "le" && this._initArray(this.toArray(), _, A)));
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
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var p, I, v = 0;
      if (A === "be")
        for (m = d.length - 1, p = 0; m >= 0; m -= 3)
          I = d[m] | d[m - 1] << 8 | d[m - 2] << 16, this.words[p] |= I << v & 67108863, this.words[p + 1] = I >>> 26 - v & 67108863, v += 24, v >= 26 && (v -= 26, p++);
      else if (A === "le")
        for (m = 0, p = 0; m < d.length; m += 3)
          I = d[m] | d[m + 1] << 8 | d[m + 2] << 16, this.words[p] |= I << v & 67108863, this.words[p + 1] = I >>> 26 - v & 67108863, v += 24, v >= 26 && (v -= 26, p++);
      return this._strip();
    };
    function a(B, d) {
      var _ = B.charCodeAt(d);
      if (_ >= 48 && _ <= 57)
        return _ - 48;
      if (_ >= 65 && _ <= 70)
        return _ - 55;
      if (_ >= 97 && _ <= 102)
        return _ - 87;
      n(!1, "Invalid character in " + B);
    }
    function u(B, d, _) {
      var A = a(B, _);
      return _ - 1 >= d && (A |= a(B, _ - 1) << 4), A;
    }
    i.prototype._parseHex = function(d, _, A) {
      this.length = Math.ceil((d.length - _) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var p = 0, I = 0, v;
      if (A === "be")
        for (m = d.length - 1; m >= _; m -= 2)
          v = u(d, _, m) << p, this.words[I] |= v & 67108863, p >= 18 ? (p -= 18, I += 1, this.words[I] |= v >>> 26) : p += 8;
      else {
        var w = d.length - _;
        for (m = w % 2 === 0 ? _ + 1 : _; m < d.length; m += 2)
          v = u(d, _, m) << p, this.words[I] |= v & 67108863, p >= 18 ? (p -= 18, I += 1, this.words[I] |= v >>> 26) : p += 8;
      }
      this._strip();
    };
    function f(B, d, _, A) {
      for (var m = 0, p = 0, I = Math.min(B.length, _), v = d; v < I; v++) {
        var w = B.charCodeAt(v) - 48;
        m *= A, w >= 49 ? p = w - 49 + 10 : w >= 17 ? p = w - 17 + 10 : p = w, n(w >= 0 && p < A, "Invalid character"), m += p;
      }
      return m;
    }
    i.prototype._parseBase = function(d, _, A) {
      this.words = [0], this.length = 1;
      for (var m = 0, p = 1; p <= 67108863; p *= _)
        m++;
      m--, p = p / _ | 0;
      for (var I = d.length - A, v = I % m, w = Math.min(I, I - v) + A, h = 0, b = A; b < w; b += m)
        h = f(d, b, b + m, _), this.imuln(p), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
      if (v !== 0) {
        var q = 1;
        for (h = f(d, b, d.length, _), b = 0; b < v; b++)
          q *= _;
        this.imuln(q), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
      }
      this._strip();
    }, i.prototype.copy = function(d) {
      d.words = new Array(this.length);
      for (var _ = 0; _ < this.length; _++)
        d.words[_] = this.words[_];
      d.length = this.length, d.negative = this.negative, d.red = this.red;
    };
    function g(B, d) {
      B.words = d.words, B.length = d.length, B.negative = d.negative, B.red = d.red;
    }
    if (i.prototype._move = function(d) {
      g(d, this);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = E;
      } catch {
        i.prototype.inspect = E;
      }
    else
      i.prototype.inspect = E;
    function E() {
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
      var A;
      if (d === 16 || d === "hex") {
        A = "";
        for (var m = 0, p = 0, I = 0; I < this.length; I++) {
          var v = this.words[I], w = ((v << m | p) & 16777215).toString(16);
          p = v >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, I--), p !== 0 || I !== this.length - 1 ? A = C[6 - w.length] + w + A : A = w + A;
        }
        for (p !== 0 && (A = p.toString(16) + A); A.length % _ !== 0; )
          A = "0" + A;
        return this.negative !== 0 && (A = "-" + A), A;
      }
      if (d === (d | 0) && d >= 2 && d <= 36) {
        var h = S[d], b = Q[d];
        A = "";
        var q = this.clone();
        for (q.negative = 0; !q.isZero(); ) {
          var Z = q.modrn(b).toString(d);
          q = q.idivn(b), q.isZero() ? A = Z + A : A = C[h - Z.length] + Z + A;
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
    }, o && (i.prototype.toBuffer = function(d, _) {
      return this.toArrayLike(o, d, _);
    }), i.prototype.toArray = function(d, _) {
      return this.toArrayLike(Array, d, _);
    };
    var N = function(d, _) {
      return d.allocUnsafe ? d.allocUnsafe(_) : new d(_);
    };
    i.prototype.toArrayLike = function(d, _, A) {
      this._strip();
      var m = this.byteLength(), p = A || Math.max(1, m);
      n(m <= p, "byte array longer than desired length"), n(p > 0, "Requested array length <= 0");
      var I = N(d, p), v = _ === "le" ? "LE" : "BE";
      return this["_toArrayLike" + v](I, m), I;
    }, i.prototype._toArrayLikeLE = function(d, _) {
      for (var A = 0, m = 0, p = 0, I = 0; p < this.length; p++) {
        var v = this.words[p] << I | m;
        d[A++] = v & 255, A < d.length && (d[A++] = v >> 8 & 255), A < d.length && (d[A++] = v >> 16 & 255), I === 6 ? (A < d.length && (d[A++] = v >> 24 & 255), m = 0, I = 0) : (m = v >>> 24, I += 2);
      }
      if (A < d.length)
        for (d[A++] = m; A < d.length; )
          d[A++] = 0;
    }, i.prototype._toArrayLikeBE = function(d, _) {
      for (var A = d.length - 1, m = 0, p = 0, I = 0; p < this.length; p++) {
        var v = this.words[p] << I | m;
        d[A--] = v & 255, A >= 0 && (d[A--] = v >> 8 & 255), A >= 0 && (d[A--] = v >> 16 & 255), I === 6 ? (A >= 0 && (d[A--] = v >> 24 & 255), m = 0, I = 0) : (m = v >>> 24, I += 2);
      }
      if (A >= 0)
        for (d[A--] = m; A >= 0; )
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
    function T(B) {
      for (var d = new Array(B.bitLength()), _ = 0; _ < d.length; _++) {
        var A = _ / 26 | 0, m = _ % 26;
        d[_] = B.words[A] >>> m & 1;
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
      for (var m = 0; m < A.length; m++)
        this.words[m] = _.words[m] ^ A.words[m];
      if (this !== _)
        for (; m < _.length; m++)
          this.words[m] = _.words[m];
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
      for (var m = 0; m < _; m++)
        this.words[m] = ~this.words[m] & 67108863;
      return A > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - A), this._strip();
    }, i.prototype.notn = function(d) {
      return this.clone().inotn(d);
    }, i.prototype.setn = function(d, _) {
      n(typeof d == "number" && d >= 0);
      var A = d / 26 | 0, m = d % 26;
      return this._expand(A + 1), _ ? this.words[A] = this.words[A] | 1 << m : this.words[A] = this.words[A] & ~(1 << m), this._strip();
    }, i.prototype.iadd = function(d) {
      var _;
      if (this.negative !== 0 && d.negative === 0)
        return this.negative = 0, _ = this.isub(d), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && d.negative !== 0)
        return d.negative = 0, _ = this.isub(d), d.negative = 1, _._normSign();
      var A, m;
      this.length > d.length ? (A = this, m = d) : (A = d, m = this);
      for (var p = 0, I = 0; I < m.length; I++)
        _ = (A.words[I] | 0) + (m.words[I] | 0) + p, this.words[I] = _ & 67108863, p = _ >>> 26;
      for (; p !== 0 && I < A.length; I++)
        _ = (A.words[I] | 0) + p, this.words[I] = _ & 67108863, p = _ >>> 26;
      if (this.length = A.length, p !== 0)
        this.words[this.length] = p, this.length++;
      else if (A !== this)
        for (; I < A.length; I++)
          this.words[I] = A.words[I];
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
      var m, p;
      A > 0 ? (m = this, p = d) : (m = d, p = this);
      for (var I = 0, v = 0; v < p.length; v++)
        _ = (m.words[v] | 0) - (p.words[v] | 0) + I, I = _ >> 26, this.words[v] = _ & 67108863;
      for (; I !== 0 && v < m.length; v++)
        _ = (m.words[v] | 0) + I, I = _ >> 26, this.words[v] = _ & 67108863;
      if (I === 0 && v < m.length && m !== this)
        for (; v < m.length; v++)
          this.words[v] = m.words[v];
      return this.length = Math.max(this.length, v), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(d) {
      return this.clone().isub(d);
    };
    function M(B, d, _) {
      _.negative = d.negative ^ B.negative;
      var A = B.length + d.length | 0;
      _.length = A, A = A - 1 | 0;
      var m = B.words[0] | 0, p = d.words[0] | 0, I = m * p, v = I & 67108863, w = I / 67108864 | 0;
      _.words[0] = v;
      for (var h = 1; h < A; h++) {
        for (var b = w >>> 26, q = w & 67108863, Z = Math.min(h, d.length - 1), et = Math.max(0, h - B.length + 1); et <= Z; et++) {
          var nt = h - et | 0;
          m = B.words[nt] | 0, p = d.words[et] | 0, I = m * p + q, b += I / 67108864 | 0, q = I & 67108863;
        }
        _.words[h] = q | 0, w = b | 0;
      }
      return w !== 0 ? _.words[h] = w | 0 : _.length--, _._strip();
    }
    var H = function(d, _, A) {
      var m = d.words, p = _.words, I = A.words, v = 0, w, h, b, q = m[0] | 0, Z = q & 8191, et = q >>> 13, nt = m[1] | 0, st = nt & 8191, at = nt >>> 13, Mt = m[2] | 0, ht = Mt & 8191, dt = Mt >>> 13, Tt = m[3] | 0, pt = Tt & 8191, yt = Tt >>> 13, Or = m[4] | 0, Ot = Or & 8191, xt = Or >>> 13, Rn = m[5] | 0, Ut = Rn & 8191, Gt = Rn >>> 13, As = m[6] | 0, Ht = As & 8191, Yt = As >>> 13, Ha = m[7] | 0, Vt = Ha & 8191, Zt = Ha >>> 13, Ya = m[8] | 0, Jt = Ya & 8191, qt = Ya >>> 13, Va = m[9] | 0, jt = Va & 8191, $t = Va >>> 13, Za = p[0] | 0, Kt = Za & 8191, te = Za >>> 13, Ja = p[1] | 0, ee = Ja & 8191, re = Ja >>> 13, qa = p[2] | 0, ne = qa & 8191, se = qa >>> 13, ja = p[3] | 0, ie = ja & 8191, oe = ja >>> 13, $a = p[4] | 0, ae = $a & 8191, ce = $a >>> 13, Ka = p[5] | 0, de = Ka & 8191, ue = Ka >>> 13, tc = p[6] | 0, _e = tc & 8191, he = tc >>> 13, ec = p[7] | 0, le = ec & 8191, fe = ec >>> 13, rc = p[8] | 0, Ae = rc & 8191, pe = rc >>> 13, nc = p[9] | 0, ge = nc & 8191, we = nc >>> 13;
      A.negative = d.negative ^ _.negative, A.length = 19, w = Math.imul(Z, Kt), h = Math.imul(Z, te), h = h + Math.imul(et, Kt) | 0, b = Math.imul(et, te);
      var Bi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, w = Math.imul(st, Kt), h = Math.imul(st, te), h = h + Math.imul(at, Kt) | 0, b = Math.imul(at, te), w = w + Math.imul(Z, ee) | 0, h = h + Math.imul(Z, re) | 0, h = h + Math.imul(et, ee) | 0, b = b + Math.imul(et, re) | 0;
      var xi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, w = Math.imul(ht, Kt), h = Math.imul(ht, te), h = h + Math.imul(dt, Kt) | 0, b = Math.imul(dt, te), w = w + Math.imul(st, ee) | 0, h = h + Math.imul(st, re) | 0, h = h + Math.imul(at, ee) | 0, b = b + Math.imul(at, re) | 0, w = w + Math.imul(Z, ne) | 0, h = h + Math.imul(Z, se) | 0, h = h + Math.imul(et, ne) | 0, b = b + Math.imul(et, se) | 0;
      var Ri = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, w = Math.imul(pt, Kt), h = Math.imul(pt, te), h = h + Math.imul(yt, Kt) | 0, b = Math.imul(yt, te), w = w + Math.imul(ht, ee) | 0, h = h + Math.imul(ht, re) | 0, h = h + Math.imul(dt, ee) | 0, b = b + Math.imul(dt, re) | 0, w = w + Math.imul(st, ne) | 0, h = h + Math.imul(st, se) | 0, h = h + Math.imul(at, ne) | 0, b = b + Math.imul(at, se) | 0, w = w + Math.imul(Z, ie) | 0, h = h + Math.imul(Z, oe) | 0, h = h + Math.imul(et, ie) | 0, b = b + Math.imul(et, oe) | 0;
      var Si = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, w = Math.imul(Ot, Kt), h = Math.imul(Ot, te), h = h + Math.imul(xt, Kt) | 0, b = Math.imul(xt, te), w = w + Math.imul(pt, ee) | 0, h = h + Math.imul(pt, re) | 0, h = h + Math.imul(yt, ee) | 0, b = b + Math.imul(yt, re) | 0, w = w + Math.imul(ht, ne) | 0, h = h + Math.imul(ht, se) | 0, h = h + Math.imul(dt, ne) | 0, b = b + Math.imul(dt, se) | 0, w = w + Math.imul(st, ie) | 0, h = h + Math.imul(st, oe) | 0, h = h + Math.imul(at, ie) | 0, b = b + Math.imul(at, oe) | 0, w = w + Math.imul(Z, ae) | 0, h = h + Math.imul(Z, ce) | 0, h = h + Math.imul(et, ae) | 0, b = b + Math.imul(et, ce) | 0;
      var Ni = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, w = Math.imul(Ut, Kt), h = Math.imul(Ut, te), h = h + Math.imul(Gt, Kt) | 0, b = Math.imul(Gt, te), w = w + Math.imul(Ot, ee) | 0, h = h + Math.imul(Ot, re) | 0, h = h + Math.imul(xt, ee) | 0, b = b + Math.imul(xt, re) | 0, w = w + Math.imul(pt, ne) | 0, h = h + Math.imul(pt, se) | 0, h = h + Math.imul(yt, ne) | 0, b = b + Math.imul(yt, se) | 0, w = w + Math.imul(ht, ie) | 0, h = h + Math.imul(ht, oe) | 0, h = h + Math.imul(dt, ie) | 0, b = b + Math.imul(dt, oe) | 0, w = w + Math.imul(st, ae) | 0, h = h + Math.imul(st, ce) | 0, h = h + Math.imul(at, ae) | 0, b = b + Math.imul(at, ce) | 0, w = w + Math.imul(Z, de) | 0, h = h + Math.imul(Z, ue) | 0, h = h + Math.imul(et, de) | 0, b = b + Math.imul(et, ue) | 0;
      var Ti = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, w = Math.imul(Ht, Kt), h = Math.imul(Ht, te), h = h + Math.imul(Yt, Kt) | 0, b = Math.imul(Yt, te), w = w + Math.imul(Ut, ee) | 0, h = h + Math.imul(Ut, re) | 0, h = h + Math.imul(Gt, ee) | 0, b = b + Math.imul(Gt, re) | 0, w = w + Math.imul(Ot, ne) | 0, h = h + Math.imul(Ot, se) | 0, h = h + Math.imul(xt, ne) | 0, b = b + Math.imul(xt, se) | 0, w = w + Math.imul(pt, ie) | 0, h = h + Math.imul(pt, oe) | 0, h = h + Math.imul(yt, ie) | 0, b = b + Math.imul(yt, oe) | 0, w = w + Math.imul(ht, ae) | 0, h = h + Math.imul(ht, ce) | 0, h = h + Math.imul(dt, ae) | 0, b = b + Math.imul(dt, ce) | 0, w = w + Math.imul(st, de) | 0, h = h + Math.imul(st, ue) | 0, h = h + Math.imul(at, de) | 0, b = b + Math.imul(at, ue) | 0, w = w + Math.imul(Z, _e) | 0, h = h + Math.imul(Z, he) | 0, h = h + Math.imul(et, _e) | 0, b = b + Math.imul(et, he) | 0;
      var Di = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, w = Math.imul(Vt, Kt), h = Math.imul(Vt, te), h = h + Math.imul(Zt, Kt) | 0, b = Math.imul(Zt, te), w = w + Math.imul(Ht, ee) | 0, h = h + Math.imul(Ht, re) | 0, h = h + Math.imul(Yt, ee) | 0, b = b + Math.imul(Yt, re) | 0, w = w + Math.imul(Ut, ne) | 0, h = h + Math.imul(Ut, se) | 0, h = h + Math.imul(Gt, ne) | 0, b = b + Math.imul(Gt, se) | 0, w = w + Math.imul(Ot, ie) | 0, h = h + Math.imul(Ot, oe) | 0, h = h + Math.imul(xt, ie) | 0, b = b + Math.imul(xt, oe) | 0, w = w + Math.imul(pt, ae) | 0, h = h + Math.imul(pt, ce) | 0, h = h + Math.imul(yt, ae) | 0, b = b + Math.imul(yt, ce) | 0, w = w + Math.imul(ht, de) | 0, h = h + Math.imul(ht, ue) | 0, h = h + Math.imul(dt, de) | 0, b = b + Math.imul(dt, ue) | 0, w = w + Math.imul(st, _e) | 0, h = h + Math.imul(st, he) | 0, h = h + Math.imul(at, _e) | 0, b = b + Math.imul(at, he) | 0, w = w + Math.imul(Z, le) | 0, h = h + Math.imul(Z, fe) | 0, h = h + Math.imul(et, le) | 0, b = b + Math.imul(et, fe) | 0;
      var Qi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, w = Math.imul(Jt, Kt), h = Math.imul(Jt, te), h = h + Math.imul(qt, Kt) | 0, b = Math.imul(qt, te), w = w + Math.imul(Vt, ee) | 0, h = h + Math.imul(Vt, re) | 0, h = h + Math.imul(Zt, ee) | 0, b = b + Math.imul(Zt, re) | 0, w = w + Math.imul(Ht, ne) | 0, h = h + Math.imul(Ht, se) | 0, h = h + Math.imul(Yt, ne) | 0, b = b + Math.imul(Yt, se) | 0, w = w + Math.imul(Ut, ie) | 0, h = h + Math.imul(Ut, oe) | 0, h = h + Math.imul(Gt, ie) | 0, b = b + Math.imul(Gt, oe) | 0, w = w + Math.imul(Ot, ae) | 0, h = h + Math.imul(Ot, ce) | 0, h = h + Math.imul(xt, ae) | 0, b = b + Math.imul(xt, ce) | 0, w = w + Math.imul(pt, de) | 0, h = h + Math.imul(pt, ue) | 0, h = h + Math.imul(yt, de) | 0, b = b + Math.imul(yt, ue) | 0, w = w + Math.imul(ht, _e) | 0, h = h + Math.imul(ht, he) | 0, h = h + Math.imul(dt, _e) | 0, b = b + Math.imul(dt, he) | 0, w = w + Math.imul(st, le) | 0, h = h + Math.imul(st, fe) | 0, h = h + Math.imul(at, le) | 0, b = b + Math.imul(at, fe) | 0, w = w + Math.imul(Z, Ae) | 0, h = h + Math.imul(Z, pe) | 0, h = h + Math.imul(et, Ae) | 0, b = b + Math.imul(et, pe) | 0;
      var Fi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, w = Math.imul(jt, Kt), h = Math.imul(jt, te), h = h + Math.imul($t, Kt) | 0, b = Math.imul($t, te), w = w + Math.imul(Jt, ee) | 0, h = h + Math.imul(Jt, re) | 0, h = h + Math.imul(qt, ee) | 0, b = b + Math.imul(qt, re) | 0, w = w + Math.imul(Vt, ne) | 0, h = h + Math.imul(Vt, se) | 0, h = h + Math.imul(Zt, ne) | 0, b = b + Math.imul(Zt, se) | 0, w = w + Math.imul(Ht, ie) | 0, h = h + Math.imul(Ht, oe) | 0, h = h + Math.imul(Yt, ie) | 0, b = b + Math.imul(Yt, oe) | 0, w = w + Math.imul(Ut, ae) | 0, h = h + Math.imul(Ut, ce) | 0, h = h + Math.imul(Gt, ae) | 0, b = b + Math.imul(Gt, ce) | 0, w = w + Math.imul(Ot, de) | 0, h = h + Math.imul(Ot, ue) | 0, h = h + Math.imul(xt, de) | 0, b = b + Math.imul(xt, ue) | 0, w = w + Math.imul(pt, _e) | 0, h = h + Math.imul(pt, he) | 0, h = h + Math.imul(yt, _e) | 0, b = b + Math.imul(yt, he) | 0, w = w + Math.imul(ht, le) | 0, h = h + Math.imul(ht, fe) | 0, h = h + Math.imul(dt, le) | 0, b = b + Math.imul(dt, fe) | 0, w = w + Math.imul(st, Ae) | 0, h = h + Math.imul(st, pe) | 0, h = h + Math.imul(at, Ae) | 0, b = b + Math.imul(at, pe) | 0, w = w + Math.imul(Z, ge) | 0, h = h + Math.imul(Z, we) | 0, h = h + Math.imul(et, ge) | 0, b = b + Math.imul(et, we) | 0;
      var Mi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, w = Math.imul(jt, ee), h = Math.imul(jt, re), h = h + Math.imul($t, ee) | 0, b = Math.imul($t, re), w = w + Math.imul(Jt, ne) | 0, h = h + Math.imul(Jt, se) | 0, h = h + Math.imul(qt, ne) | 0, b = b + Math.imul(qt, se) | 0, w = w + Math.imul(Vt, ie) | 0, h = h + Math.imul(Vt, oe) | 0, h = h + Math.imul(Zt, ie) | 0, b = b + Math.imul(Zt, oe) | 0, w = w + Math.imul(Ht, ae) | 0, h = h + Math.imul(Ht, ce) | 0, h = h + Math.imul(Yt, ae) | 0, b = b + Math.imul(Yt, ce) | 0, w = w + Math.imul(Ut, de) | 0, h = h + Math.imul(Ut, ue) | 0, h = h + Math.imul(Gt, de) | 0, b = b + Math.imul(Gt, ue) | 0, w = w + Math.imul(Ot, _e) | 0, h = h + Math.imul(Ot, he) | 0, h = h + Math.imul(xt, _e) | 0, b = b + Math.imul(xt, he) | 0, w = w + Math.imul(pt, le) | 0, h = h + Math.imul(pt, fe) | 0, h = h + Math.imul(yt, le) | 0, b = b + Math.imul(yt, fe) | 0, w = w + Math.imul(ht, Ae) | 0, h = h + Math.imul(ht, pe) | 0, h = h + Math.imul(dt, Ae) | 0, b = b + Math.imul(dt, pe) | 0, w = w + Math.imul(st, ge) | 0, h = h + Math.imul(st, we) | 0, h = h + Math.imul(at, ge) | 0, b = b + Math.imul(at, we) | 0;
      var Oi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, w = Math.imul(jt, ne), h = Math.imul(jt, se), h = h + Math.imul($t, ne) | 0, b = Math.imul($t, se), w = w + Math.imul(Jt, ie) | 0, h = h + Math.imul(Jt, oe) | 0, h = h + Math.imul(qt, ie) | 0, b = b + Math.imul(qt, oe) | 0, w = w + Math.imul(Vt, ae) | 0, h = h + Math.imul(Vt, ce) | 0, h = h + Math.imul(Zt, ae) | 0, b = b + Math.imul(Zt, ce) | 0, w = w + Math.imul(Ht, de) | 0, h = h + Math.imul(Ht, ue) | 0, h = h + Math.imul(Yt, de) | 0, b = b + Math.imul(Yt, ue) | 0, w = w + Math.imul(Ut, _e) | 0, h = h + Math.imul(Ut, he) | 0, h = h + Math.imul(Gt, _e) | 0, b = b + Math.imul(Gt, he) | 0, w = w + Math.imul(Ot, le) | 0, h = h + Math.imul(Ot, fe) | 0, h = h + Math.imul(xt, le) | 0, b = b + Math.imul(xt, fe) | 0, w = w + Math.imul(pt, Ae) | 0, h = h + Math.imul(pt, pe) | 0, h = h + Math.imul(yt, Ae) | 0, b = b + Math.imul(yt, pe) | 0, w = w + Math.imul(ht, ge) | 0, h = h + Math.imul(ht, we) | 0, h = h + Math.imul(dt, ge) | 0, b = b + Math.imul(dt, we) | 0;
      var Li = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, w = Math.imul(jt, ie), h = Math.imul(jt, oe), h = h + Math.imul($t, ie) | 0, b = Math.imul($t, oe), w = w + Math.imul(Jt, ae) | 0, h = h + Math.imul(Jt, ce) | 0, h = h + Math.imul(qt, ae) | 0, b = b + Math.imul(qt, ce) | 0, w = w + Math.imul(Vt, de) | 0, h = h + Math.imul(Vt, ue) | 0, h = h + Math.imul(Zt, de) | 0, b = b + Math.imul(Zt, ue) | 0, w = w + Math.imul(Ht, _e) | 0, h = h + Math.imul(Ht, he) | 0, h = h + Math.imul(Yt, _e) | 0, b = b + Math.imul(Yt, he) | 0, w = w + Math.imul(Ut, le) | 0, h = h + Math.imul(Ut, fe) | 0, h = h + Math.imul(Gt, le) | 0, b = b + Math.imul(Gt, fe) | 0, w = w + Math.imul(Ot, Ae) | 0, h = h + Math.imul(Ot, pe) | 0, h = h + Math.imul(xt, Ae) | 0, b = b + Math.imul(xt, pe) | 0, w = w + Math.imul(pt, ge) | 0, h = h + Math.imul(pt, we) | 0, h = h + Math.imul(yt, ge) | 0, b = b + Math.imul(yt, we) | 0;
      var ki = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, w = Math.imul(jt, ae), h = Math.imul(jt, ce), h = h + Math.imul($t, ae) | 0, b = Math.imul($t, ce), w = w + Math.imul(Jt, de) | 0, h = h + Math.imul(Jt, ue) | 0, h = h + Math.imul(qt, de) | 0, b = b + Math.imul(qt, ue) | 0, w = w + Math.imul(Vt, _e) | 0, h = h + Math.imul(Vt, he) | 0, h = h + Math.imul(Zt, _e) | 0, b = b + Math.imul(Zt, he) | 0, w = w + Math.imul(Ht, le) | 0, h = h + Math.imul(Ht, fe) | 0, h = h + Math.imul(Yt, le) | 0, b = b + Math.imul(Yt, fe) | 0, w = w + Math.imul(Ut, Ae) | 0, h = h + Math.imul(Ut, pe) | 0, h = h + Math.imul(Gt, Ae) | 0, b = b + Math.imul(Gt, pe) | 0, w = w + Math.imul(Ot, ge) | 0, h = h + Math.imul(Ot, we) | 0, h = h + Math.imul(xt, ge) | 0, b = b + Math.imul(xt, we) | 0;
      var Pi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, w = Math.imul(jt, de), h = Math.imul(jt, ue), h = h + Math.imul($t, de) | 0, b = Math.imul($t, ue), w = w + Math.imul(Jt, _e) | 0, h = h + Math.imul(Jt, he) | 0, h = h + Math.imul(qt, _e) | 0, b = b + Math.imul(qt, he) | 0, w = w + Math.imul(Vt, le) | 0, h = h + Math.imul(Vt, fe) | 0, h = h + Math.imul(Zt, le) | 0, b = b + Math.imul(Zt, fe) | 0, w = w + Math.imul(Ht, Ae) | 0, h = h + Math.imul(Ht, pe) | 0, h = h + Math.imul(Yt, Ae) | 0, b = b + Math.imul(Yt, pe) | 0, w = w + Math.imul(Ut, ge) | 0, h = h + Math.imul(Ut, we) | 0, h = h + Math.imul(Gt, ge) | 0, b = b + Math.imul(Gt, we) | 0;
      var Ui = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, w = Math.imul(jt, _e), h = Math.imul(jt, he), h = h + Math.imul($t, _e) | 0, b = Math.imul($t, he), w = w + Math.imul(Jt, le) | 0, h = h + Math.imul(Jt, fe) | 0, h = h + Math.imul(qt, le) | 0, b = b + Math.imul(qt, fe) | 0, w = w + Math.imul(Vt, Ae) | 0, h = h + Math.imul(Vt, pe) | 0, h = h + Math.imul(Zt, Ae) | 0, b = b + Math.imul(Zt, pe) | 0, w = w + Math.imul(Ht, ge) | 0, h = h + Math.imul(Ht, we) | 0, h = h + Math.imul(Yt, ge) | 0, b = b + Math.imul(Yt, we) | 0;
      var zi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, w = Math.imul(jt, le), h = Math.imul(jt, fe), h = h + Math.imul($t, le) | 0, b = Math.imul($t, fe), w = w + Math.imul(Jt, Ae) | 0, h = h + Math.imul(Jt, pe) | 0, h = h + Math.imul(qt, Ae) | 0, b = b + Math.imul(qt, pe) | 0, w = w + Math.imul(Vt, ge) | 0, h = h + Math.imul(Vt, we) | 0, h = h + Math.imul(Zt, ge) | 0, b = b + Math.imul(Zt, we) | 0;
      var Gi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, w = Math.imul(jt, Ae), h = Math.imul(jt, pe), h = h + Math.imul($t, Ae) | 0, b = Math.imul($t, pe), w = w + Math.imul(Jt, ge) | 0, h = h + Math.imul(Jt, we) | 0, h = h + Math.imul(qt, ge) | 0, b = b + Math.imul(qt, we) | 0;
      var Wi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, w = Math.imul(jt, ge), h = Math.imul(jt, we), h = h + Math.imul($t, ge) | 0, b = Math.imul($t, we);
      var Xi = (v + w | 0) + ((h & 8191) << 13) | 0;
      return v = (b + (h >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, I[0] = Bi, I[1] = xi, I[2] = Ri, I[3] = Si, I[4] = Ni, I[5] = Ti, I[6] = Di, I[7] = Qi, I[8] = Fi, I[9] = Mi, I[10] = Oi, I[11] = Li, I[12] = ki, I[13] = Pi, I[14] = Ui, I[15] = zi, I[16] = Gi, I[17] = Wi, I[18] = Xi, v !== 0 && (I[19] = v, A.length++), A;
    };
    Math.imul || (H = M);
    function G(B, d, _) {
      _.negative = d.negative ^ B.negative, _.length = B.length + d.length;
      for (var A = 0, m = 0, p = 0; p < _.length - 1; p++) {
        var I = m;
        m = 0;
        for (var v = A & 67108863, w = Math.min(p, d.length - 1), h = Math.max(0, p - B.length + 1); h <= w; h++) {
          var b = p - h, q = B.words[b] | 0, Z = d.words[h] | 0, et = q * Z, nt = et & 67108863;
          I = I + (et / 67108864 | 0) | 0, nt = nt + v | 0, v = nt & 67108863, I = I + (nt >>> 26) | 0, m += I >>> 26, I &= 67108863;
        }
        _.words[p] = v, A = I, I = m;
      }
      return A !== 0 ? _.words[p] = A : _.length--, _._strip();
    }
    function Y(B, d, _) {
      return G(B, d, _);
    }
    i.prototype.mulTo = function(d, _) {
      var A, m = this.length + d.length;
      return this.length === 10 && d.length === 10 ? A = H(this, d, _) : m < 63 ? A = M(this, d, _) : m < 1024 ? A = G(this, d, _) : A = Y(this, d, _), A;
    }, i.prototype.mul = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), this.mulTo(d, _);
    }, i.prototype.mulf = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), Y(this, d, _);
    }, i.prototype.imul = function(d) {
      return this.clone().mulTo(d, this);
    }, i.prototype.imuln = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(typeof d == "number"), n(d < 67108864);
      for (var A = 0, m = 0; m < this.length; m++) {
        var p = (this.words[m] | 0) * d, I = (p & 67108863) + (A & 67108863);
        A >>= 26, A += p / 67108864 | 0, A += I >>> 26, this.words[m] = I & 67108863;
      }
      return A !== 0 && (this.words[m] = A, this.length++), _ ? this.ineg() : this;
    }, i.prototype.muln = function(d) {
      return this.clone().imuln(d);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(d) {
      var _ = T(d);
      if (_.length === 0) return new i(1);
      for (var A = this, m = 0; m < _.length && _[m] === 0; m++, A = A.sqr())
        ;
      if (++m < _.length)
        for (var p = A.sqr(); m < _.length; m++, p = p.sqr())
          _[m] !== 0 && (A = A.mul(p));
      return A;
    }, i.prototype.iushln = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, A = (d - _) / 26, m = 67108863 >>> 26 - _ << 26 - _, p;
      if (_ !== 0) {
        var I = 0;
        for (p = 0; p < this.length; p++) {
          var v = this.words[p] & m, w = (this.words[p] | 0) - v << _;
          this.words[p] = w | I, I = v >>> 26 - _;
        }
        I && (this.words[p] = I, this.length++);
      }
      if (A !== 0) {
        for (p = this.length - 1; p >= 0; p--)
          this.words[p + A] = this.words[p];
        for (p = 0; p < A; p++)
          this.words[p] = 0;
        this.length += A;
      }
      return this._strip();
    }, i.prototype.ishln = function(d) {
      return n(this.negative === 0), this.iushln(d);
    }, i.prototype.iushrn = function(d, _, A) {
      n(typeof d == "number" && d >= 0);
      var m;
      _ ? m = (_ - _ % 26) / 26 : m = 0;
      var p = d % 26, I = Math.min((d - p) / 26, this.length), v = 67108863 ^ 67108863 >>> p << p, w = A;
      if (m -= I, m = Math.max(0, m), w) {
        for (var h = 0; h < I; h++)
          w.words[h] = this.words[h];
        w.length = I;
      }
      if (I !== 0) if (this.length > I)
        for (this.length -= I, h = 0; h < this.length; h++)
          this.words[h] = this.words[h + I];
      else
        this.words[0] = 0, this.length = 1;
      var b = 0;
      for (h = this.length - 1; h >= 0 && (b !== 0 || h >= m); h--) {
        var q = this.words[h] | 0;
        this.words[h] = b << 26 - p | q >>> p, b = q & v;
      }
      return w && b !== 0 && (w.words[w.length++] = b), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var _ = d % 26, A = (d - _) / 26, m = 1 << _;
      if (this.length <= A) return !1;
      var p = this.words[A];
      return !!(p & m);
    }, i.prototype.imaskn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, A = (d - _) / 26;
      if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= A)
        return this;
      if (_ !== 0 && A++, this.length = Math.min(A, this.length), _ !== 0) {
        var m = 67108863 ^ 67108863 >>> _ << _;
        this.words[this.length - 1] &= m;
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
      var m = d.length + A, p;
      this._expand(m);
      var I, v = 0;
      for (p = 0; p < d.length; p++) {
        I = (this.words[p + A] | 0) + v;
        var w = (d.words[p] | 0) * _;
        I -= w & 67108863, v = (I >> 26) - (w / 67108864 | 0), this.words[p + A] = I & 67108863;
      }
      for (; p < this.length - A; p++)
        I = (this.words[p + A] | 0) + v, v = I >> 26, this.words[p + A] = I & 67108863;
      if (v === 0) return this._strip();
      for (n(v === -1), v = 0, p = 0; p < this.length; p++)
        I = -(this.words[p] | 0) + v, v = I >> 26, this.words[p] = I & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(d, _) {
      var A = this.length - d.length, m = this.clone(), p = d, I = p.words[p.length - 1] | 0, v = this._countBits(I);
      A = 26 - v, A !== 0 && (p = p.ushln(A), m.iushln(A), I = p.words[p.length - 1] | 0);
      var w = m.length - p.length, h;
      if (_ !== "mod") {
        h = new i(null), h.length = w + 1, h.words = new Array(h.length);
        for (var b = 0; b < h.length; b++)
          h.words[b] = 0;
      }
      var q = m.clone()._ishlnsubmul(p, 1, w);
      q.negative === 0 && (m = q, h && (h.words[w] = 1));
      for (var Z = w - 1; Z >= 0; Z--) {
        var et = (m.words[p.length + Z] | 0) * 67108864 + (m.words[p.length + Z - 1] | 0);
        for (et = Math.min(et / I | 0, 67108863), m._ishlnsubmul(p, et, Z); m.negative !== 0; )
          et--, m.negative = 0, m._ishlnsubmul(p, 1, Z), m.isZero() || (m.negative ^= 1);
        h && (h.words[Z] = et);
      }
      return h && h._strip(), m._strip(), _ !== "div" && A !== 0 && m.iushrn(A), {
        div: h || null,
        mod: m
      };
    }, i.prototype.divmod = function(d, _, A) {
      if (n(!d.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var m, p, I;
      return this.negative !== 0 && d.negative === 0 ? (I = this.neg().divmod(d, _), _ !== "mod" && (m = I.div.neg()), _ !== "div" && (p = I.mod.neg(), A && p.negative !== 0 && p.iadd(d)), {
        div: m,
        mod: p
      }) : this.negative === 0 && d.negative !== 0 ? (I = this.divmod(d.neg(), _), _ !== "mod" && (m = I.div.neg()), {
        div: m,
        mod: I.mod
      }) : this.negative & d.negative ? (I = this.neg().divmod(d.neg(), _), _ !== "div" && (p = I.mod.neg(), A && p.negative !== 0 && p.isub(d)), {
        div: I.div,
        mod: p
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
      var A = _.div.negative !== 0 ? _.mod.isub(d) : _.mod, m = d.ushrn(1), p = d.andln(1), I = A.cmp(m);
      return I < 0 || p === 1 && I === 0 ? _.div : _.div.negative !== 0 ? _.div.isubn(1) : _.div.iaddn(1);
    }, i.prototype.modrn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var A = (1 << 26) % d, m = 0, p = this.length - 1; p >= 0; p--)
        m = (A * m + (this.words[p] | 0)) % d;
      return _ ? -m : m;
    }, i.prototype.modn = function(d) {
      return this.modrn(d);
    }, i.prototype.idivn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var A = 0, m = this.length - 1; m >= 0; m--) {
        var p = (this.words[m] | 0) + A * 67108864;
        this.words[m] = p / d | 0, A = p % d;
      }
      return this._strip(), _ ? this.ineg() : this;
    }, i.prototype.divn = function(d) {
      return this.clone().idivn(d);
    }, i.prototype.egcd = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, A = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var m = new i(1), p = new i(0), I = new i(0), v = new i(1), w = 0; _.isEven() && A.isEven(); )
        _.iushrn(1), A.iushrn(1), ++w;
      for (var h = A.clone(), b = _.clone(); !_.isZero(); ) {
        for (var q = 0, Z = 1; !(_.words[0] & Z) && q < 26; ++q, Z <<= 1) ;
        if (q > 0)
          for (_.iushrn(q); q-- > 0; )
            (m.isOdd() || p.isOdd()) && (m.iadd(h), p.isub(b)), m.iushrn(1), p.iushrn(1);
        for (var et = 0, nt = 1; !(A.words[0] & nt) && et < 26; ++et, nt <<= 1) ;
        if (et > 0)
          for (A.iushrn(et); et-- > 0; )
            (I.isOdd() || v.isOdd()) && (I.iadd(h), v.isub(b)), I.iushrn(1), v.iushrn(1);
        _.cmp(A) >= 0 ? (_.isub(A), m.isub(I), p.isub(v)) : (A.isub(_), I.isub(m), v.isub(p));
      }
      return {
        a: I,
        b: v,
        gcd: A.iushln(w)
      };
    }, i.prototype._invmp = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, A = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var m = new i(1), p = new i(0), I = A.clone(); _.cmpn(1) > 0 && A.cmpn(1) > 0; ) {
        for (var v = 0, w = 1; !(_.words[0] & w) && v < 26; ++v, w <<= 1) ;
        if (v > 0)
          for (_.iushrn(v); v-- > 0; )
            m.isOdd() && m.iadd(I), m.iushrn(1);
        for (var h = 0, b = 1; !(A.words[0] & b) && h < 26; ++h, b <<= 1) ;
        if (h > 0)
          for (A.iushrn(h); h-- > 0; )
            p.isOdd() && p.iadd(I), p.iushrn(1);
        _.cmp(A) >= 0 ? (_.isub(A), m.isub(p)) : (A.isub(_), p.isub(m));
      }
      var q;
      return _.cmpn(1) === 0 ? q = m : q = p, q.cmpn(0) < 0 && q.iadd(d), q;
    }, i.prototype.gcd = function(d) {
      if (this.isZero()) return d.abs();
      if (d.isZero()) return this.abs();
      var _ = this.clone(), A = d.clone();
      _.negative = 0, A.negative = 0;
      for (var m = 0; _.isEven() && A.isEven(); m++)
        _.iushrn(1), A.iushrn(1);
      do {
        for (; _.isEven(); )
          _.iushrn(1);
        for (; A.isEven(); )
          A.iushrn(1);
        var p = _.cmp(A);
        if (p < 0) {
          var I = _;
          _ = A, A = I;
        } else if (p === 0 || A.cmpn(1) === 0)
          break;
        _.isub(A);
      } while (!0);
      return A.iushln(m);
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
      var _ = d % 26, A = (d - _) / 26, m = 1 << _;
      if (this.length <= A)
        return this._expand(A + 1), this.words[A] |= m, this;
      for (var p = m, I = A; p !== 0 && I < this.length; I++) {
        var v = this.words[I] | 0;
        v += p, p = v >>> 26, v &= 67108863, this.words[I] = v;
      }
      return p !== 0 && (this.words[I] = p, this.length++), this;
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
        var m = this.words[0] | 0;
        A = m === d ? 0 : m < d ? -1 : 1;
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
        var m = this.words[A] | 0, p = d.words[A] | 0;
        if (m !== p) {
          m < p ? _ = -1 : m > p && (_ = 1);
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
      return new V(d);
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
    var O = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function L(B, d) {
      this.name = B, this.p = new i(d, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    L.prototype._tmp = function() {
      var d = new i(null);
      return d.words = new Array(Math.ceil(this.n / 13)), d;
    }, L.prototype.ireduce = function(d) {
      var _ = d, A;
      do
        this.split(_, this.tmp), _ = this.imulK(_), _ = _.iadd(this.tmp), A = _.bitLength();
      while (A > this.n);
      var m = A < this.n ? -1 : _.ucmp(this.p);
      return m === 0 ? (_.words[0] = 0, _.length = 1) : m > 0 ? _.isub(this.p) : _.strip !== void 0 ? _.strip() : _._strip(), _;
    }, L.prototype.split = function(d, _) {
      d.iushrn(this.n, 0, _);
    }, L.prototype.imulK = function(d) {
      return d.imul(this.k);
    };
    function z() {
      L.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(z, L), z.prototype.split = function(d, _) {
      for (var A = 4194303, m = Math.min(d.length, 9), p = 0; p < m; p++)
        _.words[p] = d.words[p];
      if (_.length = m, d.length <= 9) {
        d.words[0] = 0, d.length = 1;
        return;
      }
      var I = d.words[9];
      for (_.words[_.length++] = I & A, p = 10; p < d.length; p++) {
        var v = d.words[p] | 0;
        d.words[p - 10] = (v & A) << 4 | I >>> 22, I = v;
      }
      I >>>= 22, d.words[p - 10] = I, I === 0 && d.length > 10 ? d.length -= 10 : d.length -= 9;
    }, z.prototype.imulK = function(d) {
      d.words[d.length] = 0, d.words[d.length + 1] = 0, d.length += 2;
      for (var _ = 0, A = 0; A < d.length; A++) {
        var m = d.words[A] | 0;
        _ += m * 977, d.words[A] = _ & 67108863, _ = m * 64 + (_ / 67108864 | 0);
      }
      return d.words[d.length - 1] === 0 && (d.length--, d.words[d.length - 1] === 0 && d.length--), d;
    };
    function U() {
      L.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(U, L);
    function k() {
      L.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(k, L);
    function j() {
      L.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(j, L), j.prototype.imulK = function(d) {
      for (var _ = 0, A = 0; A < d.length; A++) {
        var m = (d.words[A] | 0) * 19 + _, p = m & 67108863;
        m >>>= 26, d.words[A] = p, _ = m;
      }
      return _ !== 0 && (d.words[d.length++] = _), d;
    }, i._prime = function(d) {
      if (O[d]) return O[d];
      var _;
      if (d === "k256")
        _ = new z();
      else if (d === "p224")
        _ = new U();
      else if (d === "p192")
        _ = new k();
      else if (d === "p25519")
        _ = new j();
      else
        throw new Error("Unknown prime " + d);
      return O[d] = _, _;
    };
    function V(B) {
      if (typeof B == "string") {
        var d = i._prime(B);
        this.m = d.p, this.prime = d;
      } else
        n(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    V.prototype._verify1 = function(d) {
      n(d.negative === 0, "red works only with positives"), n(d.red, "red works only with red numbers");
    }, V.prototype._verify2 = function(d, _) {
      n((d.negative | _.negative) === 0, "red works only with positives"), n(
        d.red && d.red === _.red,
        "red works only with red numbers"
      );
    }, V.prototype.imod = function(d) {
      return this.prime ? this.prime.ireduce(d)._forceRed(this) : (g(d, d.umod(this.m)._forceRed(this)), d);
    }, V.prototype.neg = function(d) {
      return d.isZero() ? d.clone() : this.m.sub(d)._forceRed(this);
    }, V.prototype.add = function(d, _) {
      this._verify2(d, _);
      var A = d.add(_);
      return A.cmp(this.m) >= 0 && A.isub(this.m), A._forceRed(this);
    }, V.prototype.iadd = function(d, _) {
      this._verify2(d, _);
      var A = d.iadd(_);
      return A.cmp(this.m) >= 0 && A.isub(this.m), A;
    }, V.prototype.sub = function(d, _) {
      this._verify2(d, _);
      var A = d.sub(_);
      return A.cmpn(0) < 0 && A.iadd(this.m), A._forceRed(this);
    }, V.prototype.isub = function(d, _) {
      this._verify2(d, _);
      var A = d.isub(_);
      return A.cmpn(0) < 0 && A.iadd(this.m), A;
    }, V.prototype.shl = function(d, _) {
      return this._verify1(d), this.imod(d.ushln(_));
    }, V.prototype.imul = function(d, _) {
      return this._verify2(d, _), this.imod(d.imul(_));
    }, V.prototype.mul = function(d, _) {
      return this._verify2(d, _), this.imod(d.mul(_));
    }, V.prototype.isqr = function(d) {
      return this.imul(d, d.clone());
    }, V.prototype.sqr = function(d) {
      return this.mul(d, d);
    }, V.prototype.sqrt = function(d) {
      if (d.isZero()) return d.clone();
      var _ = this.m.andln(3);
      if (n(_ % 2 === 1), _ === 3) {
        var A = this.m.add(new i(1)).iushrn(2);
        return this.pow(d, A);
      }
      for (var m = this.m.subn(1), p = 0; !m.isZero() && m.andln(1) === 0; )
        p++, m.iushrn(1);
      n(!m.isZero());
      var I = new i(1).toRed(this), v = I.redNeg(), w = this.m.subn(1).iushrn(1), h = this.m.bitLength();
      for (h = new i(2 * h * h).toRed(this); this.pow(h, w).cmp(v) !== 0; )
        h.redIAdd(v);
      for (var b = this.pow(h, m), q = this.pow(d, m.addn(1).iushrn(1)), Z = this.pow(d, m), et = p; Z.cmp(I) !== 0; ) {
        for (var nt = Z, st = 0; nt.cmp(I) !== 0; st++)
          nt = nt.redSqr();
        n(st < et);
        var at = this.pow(b, new i(1).iushln(et - st - 1));
        q = q.redMul(at), b = at.redSqr(), Z = Z.redMul(b), et = st;
      }
      return q;
    }, V.prototype.invm = function(d) {
      var _ = d._invmp(this.m);
      return _.negative !== 0 ? (_.negative = 0, this.imod(_).redNeg()) : this.imod(_);
    }, V.prototype.pow = function(d, _) {
      if (_.isZero()) return new i(1).toRed(this);
      if (_.cmpn(1) === 0) return d.clone();
      var A = 4, m = new Array(1 << A);
      m[0] = new i(1).toRed(this), m[1] = d;
      for (var p = 2; p < m.length; p++)
        m[p] = this.mul(m[p - 1], d);
      var I = m[0], v = 0, w = 0, h = _.bitLength() % 26;
      for (h === 0 && (h = 26), p = _.length - 1; p >= 0; p--) {
        for (var b = _.words[p], q = h - 1; q >= 0; q--) {
          var Z = b >> q & 1;
          if (I !== m[0] && (I = this.sqr(I)), Z === 0 && v === 0) {
            w = 0;
            continue;
          }
          v <<= 1, v |= Z, w++, !(w !== A && (p !== 0 || q !== 0)) && (I = this.mul(I, m[v]), w = 0, v = 0);
        }
        h = 26;
      }
      return I;
    }, V.prototype.convertTo = function(d) {
      var _ = d.umod(this.m);
      return _ === d ? _.clone() : _;
    }, V.prototype.convertFrom = function(d) {
      var _ = d.clone();
      return _.red = null, _;
    }, i.mont = function(d) {
      return new tt(d);
    };
    function tt(B) {
      V.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(tt, V), tt.prototype.convertTo = function(d) {
      return this.imod(d.ushln(this.shift));
    }, tt.prototype.convertFrom = function(d) {
      var _ = this.imod(d.mul(this.rinv));
      return _.red = null, _;
    }, tt.prototype.imul = function(d, _) {
      if (d.isZero() || _.isZero())
        return d.words[0] = 0, d.length = 1, d;
      var A = d.imul(_), m = A.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), p = A.isub(m).iushrn(this.shift), I = p;
      return p.cmp(this.m) >= 0 ? I = p.isub(this.m) : p.cmpn(0) < 0 && (I = p.iadd(this.m)), I._forceRed(this);
    }, tt.prototype.mul = function(d, _) {
      if (d.isZero() || _.isZero()) return new i(0)._forceRed(this);
      var A = d.mul(_), m = A.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), p = A.isub(m).iushrn(this.shift), I = p;
      return p.cmp(this.m) >= 0 ? I = p.isub(this.m) : p.cmpn(0) < 0 && (I = p.iadd(this.m)), I._forceRed(this);
    }, tt.prototype.invm = function(d) {
      var _ = this.imod(d._invmp(this.m).mul(this.r2));
      return _._forceRed(this);
    };
  })(e, Rt);
})(qo);
var lh = qo.exports;
const gs = /* @__PURE__ */ dh(lh);
var eu = 9, ru = 3, uo = 9;
function fh(e, t) {
  const { precision: r = eu, minPrecision: n = ru } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let u = i.slice(0, r);
  if (n < r) {
    const g = u.match(/.*[1-9]{1}/), E = (g == null ? void 0 : g[0].length) || 0, C = Math.max(n, E);
    u = u.slice(0, C);
  }
  const f = u ? `.${u}` : "";
  return `${a}${f}`;
}
var zt = class extends gs {
  constructor(t, r, n) {
    let s = t, i = r;
    zt.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = r || "hex");
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
      throw new x(D.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new x(
        D.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, n);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new x(D.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: r = uo,
      precision: n = eu,
      minPrecision: s = ru
    } = t || {}, i = this.formatUnits(r), o = fh(i, { precision: n, minPrecision: s });
    if (!parseFloat(o)) {
      const [, a = "0"] = i.split("."), u = a.match(/[1-9]/);
      if (u && u.index && u.index + 1 > n) {
        const [f = "0"] = o.split(".");
        return `${f}.${a.slice(0, u.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = uo) {
    const r = this.toString().slice(0, t * -1), n = this.toString().slice(t * -1), s = n.length, i = Array.from({ length: t - s }).fill("0").join("");
    return `${r ? `${r}.` : "0."}${i}${n}`;
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
    return new zt(super.sqr().toArray());
  }
  neg() {
    return new zt(super.neg().toArray());
  }
  abs() {
    return new zt(super.abs().toArray());
  }
  toTwos(t) {
    return new zt(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new zt(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, r) {
    const n = super[r](new zt(t));
    return zt.isBN(n) ? new zt(n.toArray()) : n;
  }
  clone() {
    return new zt(this.toArray());
  }
  mulTo(t, r) {
    const n = new gs(this.toArray()).mulTo(t, r);
    return new zt(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new gs(this.toArray()).egcd(t);
    return {
      a: new zt(r.toArray()),
      b: new zt(n.toArray()),
      gcd: new zt(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new gs(this.toArray()).divmod(new zt(t), r, n);
    return {
      div: new zt(s == null ? void 0 : s.toArray()),
      mod: new zt(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new zt(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new zt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, R = (e, t, r) => new zt(e, t, r);
R.parseUnits = (e, t = uo) => {
  const r = e === "." ? "0." : e, [n = "0", s = "0"] = r.split("."), i = s.length;
  if (i > t)
    throw new x(
      D.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const a = `${n.replaceAll(",", "")}${o.join("")}`;
  return R(a);
};
function Cr(e) {
  return R(e).toNumber();
}
function jo(e, t) {
  return R(e).toHex(t);
}
function hr(e, t) {
  return R(e).toBytes(t);
}
function gC(e, t) {
  return R(e).formatUnits(t);
}
function wC(e, t) {
  return R(e).format(t);
}
function mC(...e) {
  return e.reduce((t, r) => R(r).gt(t) ? R(r) : t, R(0));
}
function yC(...e) {
  return R(Math.ceil(e.reduce((t, r) => R(t).mul(r), R(1)).toNumber()));
}
var Ee = Uint8Array, Le = Uint16Array, $o = Int32Array, ci = new Ee([
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
]), di = new Ee([
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
]), _o = new Ee([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), nu = function(e, t) {
  for (var r = new Le(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new $o(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, su = nu(ci, 2), iu = su.b, ho = su.r;
iu[28] = 258, ho[258] = 28;
var ou = nu(di, 0), Ah = ou.b, oc = ou.r, lo = new Le(32768);
for (var kt = 0; kt < 32768; ++kt) {
  var pr = (kt & 43690) >> 1 | (kt & 21845) << 1;
  pr = (pr & 52428) >> 2 | (pr & 13107) << 2, pr = (pr & 61680) >> 4 | (pr & 3855) << 4, lo[kt] = ((pr & 65280) >> 8 | (pr & 255) << 8) >> 1;
}
var tr = function(e, t, r) {
  for (var n = e.length, s = 0, i = new Le(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var o = new Le(t);
  for (s = 1; s < t; ++s)
    o[s] = o[s - 1] + i[s - 1] << 1;
  var a;
  if (r) {
    a = new Le(1 << t);
    var u = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var f = s << 4 | e[s], g = t - e[s], E = o[e[s] - 1]++ << g, C = E | (1 << g) - 1; E <= C; ++E)
          a[lo[E] >> u] = f;
  } else
    for (a = new Le(n), s = 0; s < n; ++s)
      e[s] && (a[s] = lo[o[e[s] - 1]++] >> 15 - e[s]);
  return a;
}, Dr = new Ee(288);
for (var kt = 0; kt < 144; ++kt)
  Dr[kt] = 8;
for (var kt = 144; kt < 256; ++kt)
  Dr[kt] = 9;
for (var kt = 256; kt < 280; ++kt)
  Dr[kt] = 7;
for (var kt = 280; kt < 288; ++kt)
  Dr[kt] = 8;
var Gn = new Ee(32);
for (var kt = 0; kt < 32; ++kt)
  Gn[kt] = 5;
var ph = /* @__PURE__ */ tr(Dr, 9, 0), gh = /* @__PURE__ */ tr(Dr, 9, 1), wh = /* @__PURE__ */ tr(Gn, 5, 0), mh = /* @__PURE__ */ tr(Gn, 5, 1), Yi = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, We = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, Vi = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, Ko = function(e) {
  return (e + 7) / 8 | 0;
}, au = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new Ee(e.subarray(t, r));
}, yh = [
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
  var n = new Error(t || yh[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, He), !r)
    throw n;
  return n;
}, bh = function(e, t, r, n) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return r || new Ee(0);
  var o = !r, a = o || t.i != 2, u = t.i;
  o && (r = new Ee(s * 3));
  var f = function(ht) {
    var dt = r.length;
    if (ht > dt) {
      var Tt = new Ee(Math.max(dt * 2, ht));
      Tt.set(r), r = Tt;
    }
  }, g = t.f || 0, E = t.p || 0, C = t.b || 0, S = t.l, Q = t.d, N = t.m, T = t.n, M = s * 8;
  do {
    if (!S) {
      g = We(e, E, 1);
      var H = We(e, E + 1, 3);
      if (E += 3, H)
        if (H == 1)
          S = gh, Q = mh, N = 9, T = 5;
        else if (H == 2) {
          var L = We(e, E, 31) + 257, z = We(e, E + 10, 15) + 4, U = L + We(e, E + 5, 31) + 1;
          E += 14;
          for (var k = new Ee(U), j = new Ee(19), V = 0; V < z; ++V)
            j[_o[V]] = We(e, E + V * 3, 7);
          E += z * 3;
          for (var tt = Yi(j), B = (1 << tt) - 1, d = tr(j, tt, 1), V = 0; V < U; ) {
            var _ = d[We(e, E, B)];
            E += _ & 15;
            var G = _ >> 4;
            if (G < 16)
              k[V++] = G;
            else {
              var A = 0, m = 0;
              for (G == 16 ? (m = 3 + We(e, E, 3), E += 2, A = k[V - 1]) : G == 17 ? (m = 3 + We(e, E, 7), E += 3) : G == 18 && (m = 11 + We(e, E, 127), E += 7); m--; )
                k[V++] = A;
            }
          }
          var p = k.subarray(0, L), I = k.subarray(L);
          N = Yi(p), T = Yi(I), S = tr(p, N, 1), Q = tr(I, T, 1);
        } else
          He(1);
      else {
        var G = Ko(E) + 4, Y = e[G - 4] | e[G - 3] << 8, O = G + Y;
        if (O > s) {
          u && He(0);
          break;
        }
        a && f(C + Y), r.set(e.subarray(G, O), C), t.b = C += Y, t.p = E = O * 8, t.f = g;
        continue;
      }
      if (E > M) {
        u && He(0);
        break;
      }
    }
    a && f(C + 131072);
    for (var v = (1 << N) - 1, w = (1 << T) - 1, h = E; ; h = E) {
      var A = S[Vi(e, E) & v], b = A >> 4;
      if (E += A & 15, E > M) {
        u && He(0);
        break;
      }
      if (A || He(2), b < 256)
        r[C++] = b;
      else if (b == 256) {
        h = E, S = null;
        break;
      } else {
        var q = b - 254;
        if (b > 264) {
          var V = b - 257, Z = ci[V];
          q = We(e, E, (1 << Z) - 1) + iu[V], E += Z;
        }
        var et = Q[Vi(e, E) & w], nt = et >> 4;
        et || He(3), E += et & 15;
        var I = Ah[nt];
        if (nt > 3) {
          var Z = di[nt];
          I += Vi(e, E) & (1 << Z) - 1, E += Z;
        }
        if (E > M) {
          u && He(0);
          break;
        }
        a && f(C + 131072);
        var st = C + q;
        if (C < I) {
          var at = i - I, Mt = Math.min(I, st);
          for (at + C < 0 && He(3); C < Mt; ++C)
            r[C] = n[at + C];
        }
        for (; C < st; ++C)
          r[C] = r[C - I];
      }
    }
    t.l = S, t.p = h, t.b = C, t.f = g, S && (g = 1, t.m = N, t.d = Q, t.n = T);
  } while (!g);
  return C != r.length && o ? au(r, 0, C) : r.subarray(0, C);
}, ir = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Sn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, Zi = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: du, l: 0 };
  if (s == 1) {
    var o = new Ee(r[0].s + 1);
    return o[r[0].s] = 1, { t: o, l: 1 };
  }
  r.sort(function(O, L) {
    return O.f - L.f;
  }), r.push({ s: -1, f: 25001 });
  var a = r[0], u = r[1], f = 0, g = 1, E = 2;
  for (r[0] = { s: -1, f: a.f + u.f, l: a, r: u }; g != s - 1; )
    a = r[r[f].f < r[E].f ? f++ : E++], u = r[f != g && r[f].f < r[E].f ? f++ : E++], r[g++] = { s: -1, f: a.f + u.f, l: a, r: u };
  for (var C = i[0].s, n = 1; n < s; ++n)
    i[n].s > C && (C = i[n].s);
  var S = new Le(C + 1), Q = fo(r[g - 1], S, 0);
  if (Q > t) {
    var n = 0, N = 0, T = Q - t, M = 1 << T;
    for (i.sort(function(L, z) {
      return S[z.s] - S[L.s] || L.f - z.f;
    }); n < s; ++n) {
      var H = i[n].s;
      if (S[H] > t)
        N += M - (1 << Q - S[H]), S[H] = t;
      else
        break;
    }
    for (N >>= T; N > 0; ) {
      var G = i[n].s;
      S[G] < t ? N -= 1 << t - S[G]++ - 1 : ++n;
    }
    for (; n >= 0 && N; --n) {
      var Y = i[n].s;
      S[Y] == t && (--S[Y], ++N);
    }
    Q = t;
  }
  return { t: new Ee(S), l: Q };
}, fo = function(e, t, r) {
  return e.s == -1 ? Math.max(fo(e.l, t, r + 1), fo(e.r, t, r + 1)) : t[e.s] = r;
}, ac = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new Le(++t), n = 0, s = e[0], i = 1, o = function(u) {
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
}, Nn = function(e, t) {
  for (var r = 0, n = 0; n < t.length; ++n)
    r += e[n] * t[n];
  return r;
}, cu = function(e, t, r) {
  var n = r.length, s = Ko(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, cc = function(e, t, r, n, s, i, o, a, u, f, g) {
  ir(t, g++, r), ++s[256];
  for (var E = Zi(s, 15), C = E.t, S = E.l, Q = Zi(i, 15), N = Q.t, T = Q.l, M = ac(C), H = M.c, G = M.n, Y = ac(N), O = Y.c, L = Y.n, z = new Le(19), U = 0; U < H.length; ++U)
    ++z[H[U] & 31];
  for (var U = 0; U < O.length; ++U)
    ++z[O[U] & 31];
  for (var k = Zi(z, 7), j = k.t, V = k.l, tt = 19; tt > 4 && !j[_o[tt - 1]]; --tt)
    ;
  var B = f + 5 << 3, d = Nn(s, Dr) + Nn(i, Gn) + o, _ = Nn(s, C) + Nn(i, N) + o + 14 + 3 * tt + Nn(z, j) + 2 * z[16] + 3 * z[17] + 7 * z[18];
  if (u >= 0 && B <= d && B <= _)
    return cu(t, g, e.subarray(u, u + f));
  var A, m, p, I;
  if (ir(t, g, 1 + (_ < d)), g += 2, _ < d) {
    A = tr(C, S, 0), m = C, p = tr(N, T, 0), I = N;
    var v = tr(j, V, 0);
    ir(t, g, G - 257), ir(t, g + 5, L - 1), ir(t, g + 10, tt - 4), g += 14;
    for (var U = 0; U < tt; ++U)
      ir(t, g + 3 * U, j[_o[U]]);
    g += 3 * tt;
    for (var w = [H, O], h = 0; h < 2; ++h)
      for (var b = w[h], U = 0; U < b.length; ++U) {
        var q = b[U] & 31;
        ir(t, g, v[q]), g += j[q], q > 15 && (ir(t, g, b[U] >> 5 & 127), g += b[U] >> 12);
      }
  } else
    A = ph, m = Dr, p = wh, I = Gn;
  for (var U = 0; U < a; ++U) {
    var Z = n[U];
    if (Z > 255) {
      var q = Z >> 18 & 31;
      Sn(t, g, A[q + 257]), g += m[q + 257], q > 7 && (ir(t, g, Z >> 23 & 31), g += ci[q]);
      var et = Z & 31;
      Sn(t, g, p[et]), g += I[et], et > 3 && (Sn(t, g, Z >> 5 & 8191), g += di[et]);
    } else
      Sn(t, g, A[Z]), g += m[Z];
  }
  return Sn(t, g, A[256]), g + m[256];
}, Ih = /* @__PURE__ */ new $o([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), du = /* @__PURE__ */ new Ee(0), Eh = function(e, t, r, n, s, i) {
  var o = i.z || e.length, a = new Ee(n + o + 5 * (1 + Math.ceil(o / 7e3)) + s), u = a.subarray(n, a.length - s), f = i.l, g = (i.r || 0) & 7;
  if (t) {
    g && (u[0] = i.r >> 3);
    for (var E = Ih[t - 1], C = E >> 13, S = E & 8191, Q = (1 << r) - 1, N = i.p || new Le(32768), T = i.h || new Le(Q + 1), M = Math.ceil(r / 3), H = 2 * M, G = function(pt) {
      return (e[pt] ^ e[pt + 1] << M ^ e[pt + 2] << H) & Q;
    }, Y = new $o(25e3), O = new Le(288), L = new Le(32), z = 0, U = 0, k = i.i || 0, j = 0, V = i.w || 0, tt = 0; k + 2 < o; ++k) {
      var B = G(k), d = k & 32767, _ = T[B];
      if (N[d] = _, T[B] = d, V <= k) {
        var A = o - k;
        if ((z > 7e3 || j > 24576) && (A > 423 || !f)) {
          g = cc(e, u, 0, Y, O, L, U, j, tt, k - tt, g), j = z = U = 0, tt = k;
          for (var m = 0; m < 286; ++m)
            O[m] = 0;
          for (var m = 0; m < 30; ++m)
            L[m] = 0;
        }
        var p = 2, I = 0, v = S, w = d - _ & 32767;
        if (A > 2 && B == G(k - w))
          for (var h = Math.min(C, A) - 1, b = Math.min(32767, k), q = Math.min(258, A); w <= b && --v && d != _; ) {
            if (e[k + p] == e[k + p - w]) {
              for (var Z = 0; Z < q && e[k + Z] == e[k + Z - w]; ++Z)
                ;
              if (Z > p) {
                if (p = Z, I = w, Z > h)
                  break;
                for (var et = Math.min(w, Z - 2), nt = 0, m = 0; m < et; ++m) {
                  var st = k - w + m & 32767, at = N[st], Mt = st - at & 32767;
                  Mt > nt && (nt = Mt, _ = st);
                }
              }
            }
            d = _, _ = N[d], w += d - _ & 32767;
          }
        if (I) {
          Y[j++] = 268435456 | ho[p] << 18 | oc[I];
          var ht = ho[p] & 31, dt = oc[I] & 31;
          U += ci[ht] + di[dt], ++O[257 + ht], ++L[dt], V = k + p, ++z;
        } else
          Y[j++] = e[k], ++O[e[k]];
      }
    }
    for (k = Math.max(k, V); k < o; ++k)
      Y[j++] = e[k], ++O[e[k]];
    g = cc(e, u, f, Y, O, L, U, j, tt, k - tt, g), f || (i.r = g & 7 | u[g / 8 | 0] << 3, g -= 7, i.h = T, i.p = N, i.i = k, i.w = V);
  } else {
    for (var k = i.w || 0; k < o + f; k += 65535) {
      var Tt = k + 65535;
      Tt >= o && (u[g / 8 | 0] = f, Tt = o), g = cu(u, g + 1, e.subarray(k, Tt));
    }
    i.i = o;
  }
  return au(a, 0, n + Ko(g) + s);
}, vh = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), Ch = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = vh[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, Bh = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), o = new Ee(i.length + e.length);
    o.set(i), o.set(e, i.length), e = o, s.w = i.length;
  }
  return Eh(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, Ao = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, xh = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Ao(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, Rh = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && He(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, Sh = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, Nh = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function Th(e, t) {
  t || (t = {});
  var r = Ch(), n = e.length;
  r.p(e);
  var s = Bh(e, t, Nh(t), 8), i = s.length;
  return xh(s, t), Ao(s, i - 8, r.d()), Ao(s, i - 4, n), s;
}
function Dh(e, t) {
  var r = Rh(e);
  return r + 8 > e.length && He(6, "invalid gzip data"), bh(e.subarray(r, -8), { i: 2 }, new Ee(Sh(e)), t);
}
var Qh = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Fh = 0;
try {
  Qh.decode(du, { stream: !0 }), Fh = 1;
} catch {
}
var Mh = Object.defineProperty, Oh = (e, t, r) => t in e ? Mh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Lh = (e, t, r) => (Oh(e, t + "", r), r), bC = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, uu = (e, t) => {
  const r = [];
  for (let a = 0; a < e.length; a += t) {
    const u = new Uint8Array(t);
    u.set(e.slice(a, a + t)), r.push(u);
  }
  const n = r[r.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = n.slice(0, i);
  return r[r.length - 1] = o, r;
}, $ = (e, t, r = !0) => {
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
  throw new x(D.INVALID_DATA, s);
}, ui = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), r = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(r);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, ut = (e) => {
  const t = e.map((r) => $(r));
  return ui(t);
}, dc = "0123456789abcdef";
function K(e) {
  const t = $(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += dc[(s & 240) >> 4] + dc[s & 15];
  }
  return r;
}
var IC = (e) => {
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
    throw new x(D.PARSE_FAILED, n);
  }
  return r;
}, kh = 37, _u = BigInt(2 ** 62) + BigInt(kh), Ph = (e) => Math.floor(e / 1e3), hu = (e) => e * 1e3, Uh = (e) => Number(BigInt(e) - _u), zh = (e) => String(BigInt(e) + _u), Gh = (e) => hu(Uh(e)), Cs = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Cs(Gh(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Cs(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Cs(hu(e));
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
    return zh(this.toUnixSeconds());
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
    return Ph(this.getTime());
  }
}, ta = Cs;
Lh(ta, "TAI64_NULL", "");
function Wh(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Xh = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V1: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 3e7,
          max_size: 262144,
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
          contract_max_size: 262144,
          max_storage_slots: 1760
        }
      },
      fee_params: {
        V1: {
          gas_price_factor: 92e3,
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
          bal: 29,
          bhei: 2,
          bhsh: 2,
          burn: 19976,
          cb: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 1907,
          ecr1: 26135,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 2,
          gm: 2,
          gt: 2,
          gtf: 13,
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
          log: 102,
          lt: 2,
          lw: 2,
          mint: 18042,
          mlog: 2,
          mod: 2,
          modi: 2,
          move: 2,
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
          pshh: 5,
          pshl: 5,
          ret_contract: 53,
          rvrt_contract: 52,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 177,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 17302,
          time: 35,
          tr: 27852,
          tro: 19718,
          wdcm: 2,
          wqcm: 2,
          wdop: 3,
          wqop: 3,
          wdml: 3,
          wqml: 3,
          wddv: 4,
          wqdv: 5,
          wdmd: 8,
          wqmd: 12,
          wdam: 7,
          wqam: 8,
          wdmm: 8,
          wqmm: 8,
          xor: 2,
          xori: 2,
          aloc: {
            LightOperation: {
              base: 2,
              units_per_gas: 15
            }
          },
          bsiz: {
            LightOperation: {
              base: 17,
              units_per_gas: 790
            }
          },
          bldd: {
            LightOperation: {
              base: 15,
              units_per_gas: 272
            }
          },
          cfe: {
            LightOperation: {
              base: 10,
              units_per_gas: 1818181
            }
          },
          cfei: {
            LightOperation: {
              base: 2,
              units_per_gas: 1e6
            }
          },
          call: {
            LightOperation: {
              base: 13513,
              units_per_gas: 7
            }
          },
          ccp: {
            LightOperation: {
              base: 34,
              units_per_gas: 39
            }
          },
          croo: {
            LightOperation: {
              base: 91,
              units_per_gas: 3
            }
          },
          csiz: {
            LightOperation: {
              base: 31,
              units_per_gas: 438
            }
          },
          ed19: {
            LightOperation: {
              base: 3e3,
              units_per_gas: 214
            }
          },
          k256: {
            LightOperation: {
              base: 27,
              units_per_gas: 5
            }
          },
          ldc: {
            LightOperation: {
              base: 43,
              units_per_gas: 102
            }
          },
          logd: {
            LightOperation: {
              base: 363,
              units_per_gas: 4
            }
          },
          mcl: {
            LightOperation: {
              base: 2,
              units_per_gas: 1041
            }
          },
          mcli: {
            LightOperation: {
              base: 2,
              units_per_gas: 1025
            }
          },
          mcp: {
            LightOperation: {
              base: 4,
              units_per_gas: 325
            }
          },
          mcpi: {
            LightOperation: {
              base: 8,
              units_per_gas: 511
            }
          },
          meq: {
            LightOperation: {
              base: 3,
              units_per_gas: 940
            }
          },
          retd_contract: {
            LightOperation: {
              base: 305,
              units_per_gas: 4
            }
          },
          s256: {
            LightOperation: {
              base: 31,
              units_per_gas: 4
            }
          },
          scwq: {
            HeavyOperation: {
              base: 16346,
              gas_per_unit: 17163
            }
          },
          smo: {
            LightOperation: {
              base: 40860,
              units_per_gas: 2
            }
          },
          srwq: {
            HeavyOperation: {
              base: 187,
              gas_per_unit: 179
            }
          },
          swwq: {
            HeavyOperation: {
              base: 17046,
              gas_per_unit: 16232
            }
          },
          contract_root: {
            LightOperation: {
              base: 31,
              units_per_gas: 2
            }
          },
          state_root: {
            HeavyOperation: {
              base: 236,
              gas_per_unit: 122
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            LightOperation: {
              base: 3957,
              units_per_gas: 48
            }
          }
        }
      },
      base_asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07",
      block_gas_limit: 3e7,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, Hh = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Yh = {
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
  blobs: [],
  block_height: 0,
  da_block_height: 0
}, EC = {
  chainConfig: Xh,
  metadata: Hh,
  stateConfig: Yh
}, vC = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Qr(e) {
  return e !== void 0;
}
var lu = R(0), po = R(58), Os = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", ws = null;
function Vh(e) {
  if (ws == null) {
    ws = {};
    for (let r = 0; r < Os.length; r++)
      ws[Os[r]] = R(r);
  }
  const t = ws[e];
  if (t == null)
    throw new x(D.INVALID_DATA, `invalid base58 value ${e}`);
  return R(t);
}
function fu(e) {
  const t = $(e);
  let r = R(t), n = "";
  for (; r.gt(lu); )
    n = Os[Number(r.mod(po))] + n, r = r.div(po);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Os[0] + n;
  return n;
}
function Zh(e) {
  let t = lu;
  for (let r = 0; r < e.length; r++)
    t = t.mul(po), t = t.add(Vh(e[r].toString()));
  return t;
}
function ea(e, t, r) {
  const n = $(e);
  if (r != null && r > n.length)
    throw new x(D.INVALID_DATA, "cannot slice beyond data bounds");
  return K(n.slice(t ?? 0, r ?? n.length));
}
function fn(e, t = !0) {
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
        throw new x(
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
function Lr(e, t, r, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${r}`), t;
}
function Jh(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function qh(e) {
  const t = $(e, "bytes"), r = [];
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
      (s & 192) === 128 ? n += Lr("UNEXPECTED_CONTINUE", n - 1, t) : n += Lr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Lr("OVERRUN", n - 1, t);
      continue;
    }
    let a = s & (1 << 8 - i - 1) - 1;
    for (let u = 0; u < i; u++) {
      const f = t[n];
      if ((f & 192) !== 128) {
        n += Lr("MISSING_CONTINUE", n, t), a = null;
        break;
      }
      a = a << 6 | f & 63, n++;
    }
    if (a !== null) {
      if (a > 1114111) {
        n += Lr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (a >= 55296 && a <= 57343) {
        n += Lr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (a <= o) {
        n += Lr("OVERLONG", n - 1 - i, t);
        continue;
      }
      r.push(a);
    }
  }
  return r;
}
function ra(e) {
  return Jh(qh(e));
}
var CC = (e) => {
  if (!e)
    return "";
  const t = $(e), r = Th(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(r)
  );
  return btoa(n);
}, BC = (e) => {
  const t = atob(e), r = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return Dh(r);
};
function jh(e) {
  throw new Error("Didn't expect to get here");
}
function Oe(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function $h(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function es(e, ...t) {
  if (!$h(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function Au(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Oe(e.outputLen), Oe(e.blockLen);
}
function An(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function pu(e, t) {
  es(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
const Kr = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Bs = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), xs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), je = (e, t) => e << 32 - t | e >>> t, Et = (e, t) => e << t | e >>> 32 - t >>> 0, Ls = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, Kh = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
function ks(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = Kh(e[t]);
}
function tl(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function pn(e) {
  return typeof e == "string" && (e = tl(e)), es(e), e;
}
function el(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    es(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
class na {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const rl = {}.toString;
function gu(e, t) {
  if (t !== void 0 && rl.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function _i(e) {
  const t = (n) => e().update(pn(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function nl(e = 32) {
  if (Kr && typeof Kr.getRandomValues == "function")
    return Kr.getRandomValues(new Uint8Array(e));
  if (Kr && typeof Kr.randomBytes == "function")
    return Kr.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function sl(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(r >> s & i), a = Number(r & i), u = n ? 4 : 0, f = n ? 0 : 4;
  e.setUint32(t + u, o, n), e.setUint32(t + f, a, n);
}
const il = (e, t, r) => e & t ^ ~e & r, ol = (e, t, r) => e & t ^ e & r ^ t & r;
class sa extends na {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = xs(this.buffer);
  }
  update(t) {
    An(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = pn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const u = xs(t);
        for (; s <= i - o; o += s)
          this.process(u, o);
        continue;
      }
      n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    An(this), pu(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(n, 0), o = 0);
    for (let E = o; E < s; E++)
      r[E] = 0;
    sl(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const a = xs(t), u = this.outputLen;
    if (u % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = u / 4, g = this.get();
    if (f > g.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let E = 0; E < f; E++)
      a.setUint32(4 * E, g[E], i);
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
const al = /* @__PURE__ */ new Uint32Array([
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
]), gr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), wr = /* @__PURE__ */ new Uint32Array(64);
class cl extends sa {
  constructor() {
    super(64, 32, 8, !1), this.A = gr[0] | 0, this.B = gr[1] | 0, this.C = gr[2] | 0, this.D = gr[3] | 0, this.E = gr[4] | 0, this.F = gr[5] | 0, this.G = gr[6] | 0, this.H = gr[7] | 0;
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
    for (let E = 0; E < 16; E++, r += 4)
      wr[E] = t.getUint32(r, !1);
    for (let E = 16; E < 64; E++) {
      const C = wr[E - 15], S = wr[E - 2], Q = je(C, 7) ^ je(C, 18) ^ C >>> 3, N = je(S, 17) ^ je(S, 19) ^ S >>> 10;
      wr[E] = N + wr[E - 7] + Q + wr[E - 16] | 0;
    }
    let { A: n, B: s, C: i, D: o, E: a, F: u, G: f, H: g } = this;
    for (let E = 0; E < 64; E++) {
      const C = je(a, 6) ^ je(a, 11) ^ je(a, 25), S = g + C + il(a, u, f) + al[E] + wr[E] | 0, N = (je(n, 2) ^ je(n, 13) ^ je(n, 22)) + ol(n, s, i) | 0;
      g = f, f = u, u = a, a = o + S | 0, o = i, i = s, s = n, n = S + N | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, u = u + this.F | 0, f = f + this.G | 0, g = g + this.H | 0, this.set(n, s, i, o, a, u, f, g);
  }
  roundClean() {
    wr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const jr = /* @__PURE__ */ _i(() => new cl());
class wu extends na {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, Au(t);
    const n = pn(r);
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
    return An(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    An(this), es(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const hi = (e, t, r) => new wu(e, t).update(r).digest();
hi.create = (e, t) => new wu(e, t);
function dl(e, t, r, n) {
  Au(e);
  const s = gu({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: o, asyncTick: a } = s;
  if (Oe(i), Oe(o), Oe(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const u = pn(t), f = pn(r), g = new Uint8Array(o), E = hi.create(e, u), C = E._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: a, DK: g, PRF: E, PRFSalt: C };
}
function ul(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function ia(e, t, r, n) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: u } = dl(e, t, r, n);
  let f;
  const g = new Uint8Array(4), E = xs(g), C = new Uint8Array(a.outputLen);
  for (let S = 1, Q = 0; Q < i; S++, Q += a.outputLen) {
    const N = o.subarray(Q, Q + a.outputLen);
    E.setInt32(0, S, !1), (f = u._cloneInto(f)).update(g).digestInto(C), N.set(C.subarray(0, N.length));
    for (let T = 1; T < s; T++) {
      a._cloneInto(f).update(C).digestInto(C);
      for (let M = 0; M < N.length; M++)
        N[M] ^= C[M];
    }
  }
  return ul(a, u, o, f, C);
}
function uc(e, t, r, n, s, i) {
  let o = e[t++] ^ r[n++], a = e[t++] ^ r[n++], u = e[t++] ^ r[n++], f = e[t++] ^ r[n++], g = e[t++] ^ r[n++], E = e[t++] ^ r[n++], C = e[t++] ^ r[n++], S = e[t++] ^ r[n++], Q = e[t++] ^ r[n++], N = e[t++] ^ r[n++], T = e[t++] ^ r[n++], M = e[t++] ^ r[n++], H = e[t++] ^ r[n++], G = e[t++] ^ r[n++], Y = e[t++] ^ r[n++], O = e[t++] ^ r[n++], L = o, z = a, U = u, k = f, j = g, V = E, tt = C, B = S, d = Q, _ = N, A = T, m = M, p = H, I = G, v = Y, w = O;
  for (let h = 0; h < 8; h += 2)
    j ^= Et(L + p | 0, 7), d ^= Et(j + L | 0, 9), p ^= Et(d + j | 0, 13), L ^= Et(p + d | 0, 18), _ ^= Et(V + z | 0, 7), I ^= Et(_ + V | 0, 9), z ^= Et(I + _ | 0, 13), V ^= Et(z + I | 0, 18), v ^= Et(A + tt | 0, 7), U ^= Et(v + A | 0, 9), tt ^= Et(U + v | 0, 13), A ^= Et(tt + U | 0, 18), k ^= Et(w + m | 0, 7), B ^= Et(k + w | 0, 9), m ^= Et(B + k | 0, 13), w ^= Et(m + B | 0, 18), z ^= Et(L + k | 0, 7), U ^= Et(z + L | 0, 9), k ^= Et(U + z | 0, 13), L ^= Et(k + U | 0, 18), tt ^= Et(V + j | 0, 7), B ^= Et(tt + V | 0, 9), j ^= Et(B + tt | 0, 13), V ^= Et(j + B | 0, 18), m ^= Et(A + _ | 0, 7), d ^= Et(m + A | 0, 9), _ ^= Et(d + m | 0, 13), A ^= Et(_ + d | 0, 18), p ^= Et(w + v | 0, 7), I ^= Et(p + w | 0, 9), v ^= Et(I + p | 0, 13), w ^= Et(v + I | 0, 18);
  s[i++] = o + L | 0, s[i++] = a + z | 0, s[i++] = u + U | 0, s[i++] = f + k | 0, s[i++] = g + j | 0, s[i++] = E + V | 0, s[i++] = C + tt | 0, s[i++] = S + B | 0, s[i++] = Q + d | 0, s[i++] = N + _ | 0, s[i++] = T + A | 0, s[i++] = M + m | 0, s[i++] = H + p | 0, s[i++] = G + I | 0, s[i++] = Y + v | 0, s[i++] = O + w | 0;
}
function Ji(e, t, r, n, s) {
  let i = n + 0, o = n + 16 * s;
  for (let a = 0; a < 16; a++)
    r[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    uc(r, o, e, t, r, i), a > 0 && (o += 16), uc(r, i, e, t += 16, r, o);
}
function _l(e, t, r) {
  const n = gu({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: o, dkLen: a, asyncTick: u, maxmem: f, onProgress: g } = n;
  if (Oe(s), Oe(i), Oe(o), Oe(a), Oe(u), Oe(f), g !== void 0 && typeof g != "function")
    throw new Error("progressCb should be function");
  const E = 128 * i, C = E / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / E)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const S = E * (s + o);
  if (S > f)
    throw new Error(`Scrypt: parameters too large, ${S} (128 * r * (N + p)) > ${f} (maxmem)`);
  const Q = ia(jr, e, t, { c: 1, dkLen: E * o }), N = Bs(Q), T = Bs(new Uint8Array(E * s)), M = Bs(new Uint8Array(E));
  let H = () => {
  };
  if (g) {
    const G = 2 * s * o, Y = Math.max(Math.floor(G / 1e4), 1);
    let O = 0;
    H = () => {
      O++, g && (!(O % Y) || O === G) && g(O / G);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: C, V: T, B32: N, B: Q, tmp: M, blockMixCb: H, asyncTick: u };
}
function hl(e, t, r, n, s) {
  const i = ia(jr, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function ll(e, t, r) {
  const { N: n, r: s, p: i, dkLen: o, blockSize32: a, V: u, B32: f, B: g, tmp: E, blockMixCb: C } = _l(e, t, r);
  Ls || ks(f);
  for (let S = 0; S < i; S++) {
    const Q = a * S;
    for (let N = 0; N < a; N++)
      u[N] = f[Q + N];
    for (let N = 0, T = 0; N < n - 1; N++)
      Ji(u, T, u, T += a, s), C();
    Ji(u, (n - 1) * a, f, Q, s), C();
    for (let N = 0; N < n; N++) {
      const T = f[Q + a - 16] % n;
      for (let M = 0; M < a; M++)
        E[M] = f[Q + M] ^ u[T * a + M];
      Ji(E, 0, f, Q, s), C();
    }
  }
  return Ls || ks(f), hl(e, o, g, u, E);
}
const ms = /* @__PURE__ */ BigInt(2 ** 32 - 1), go = /* @__PURE__ */ BigInt(32);
function mu(e, t = !1) {
  return t ? { h: Number(e & ms), l: Number(e >> go & ms) } : { h: Number(e >> go & ms) | 0, l: Number(e & ms) | 0 };
}
function yu(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = mu(e[s], t);
    [r[s], n[s]] = [i, o];
  }
  return [r, n];
}
const fl = (e, t) => BigInt(e >>> 0) << go | BigInt(t >>> 0), Al = (e, t, r) => e >>> r, pl = (e, t, r) => e << 32 - r | t >>> r, gl = (e, t, r) => e >>> r | t << 32 - r, wl = (e, t, r) => e << 32 - r | t >>> r, ml = (e, t, r) => e << 64 - r | t >>> r - 32, yl = (e, t, r) => e >>> r - 32 | t << 64 - r, bl = (e, t) => t, Il = (e, t) => e, bu = (e, t, r) => e << r | t >>> 32 - r, Iu = (e, t, r) => t << r | e >>> 32 - r, Eu = (e, t, r) => t << r - 32 | e >>> 64 - r, vu = (e, t, r) => e << r - 32 | t >>> 64 - r;
function El(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const vl = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), Cl = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, Bl = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), xl = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, Rl = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), Sl = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, mt = {
  fromBig: mu,
  split: yu,
  toBig: fl,
  shrSH: Al,
  shrSL: pl,
  rotrSH: gl,
  rotrSL: wl,
  rotrBH: ml,
  rotrBL: yl,
  rotr32H: bl,
  rotr32L: Il,
  rotlSH: bu,
  rotlSL: Iu,
  rotlBH: Eu,
  rotlBL: vu,
  add: El,
  add3L: vl,
  add3H: Cl,
  add4L: Bl,
  add4H: xl,
  add5H: Sl,
  add5L: Rl
}, Cu = [], Bu = [], xu = [], Nl = /* @__PURE__ */ BigInt(0), Tn = /* @__PURE__ */ BigInt(1), Tl = /* @__PURE__ */ BigInt(2), Dl = /* @__PURE__ */ BigInt(7), Ql = /* @__PURE__ */ BigInt(256), Fl = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = Tn, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], Cu.push(2 * (5 * n + r)), Bu.push((e + 1) * (e + 2) / 2 % 64);
  let s = Nl;
  for (let i = 0; i < 7; i++)
    t = (t << Tn ^ (t >> Dl) * Fl) % Ql, t & Tl && (s ^= Tn << (Tn << /* @__PURE__ */ BigInt(i)) - Tn);
  xu.push(s);
}
const [Ml, Ol] = /* @__PURE__ */ yu(xu, !0), _c = (e, t, r) => r > 32 ? Eu(e, t, r) : bu(e, t, r), hc = (e, t, r) => r > 32 ? vu(e, t, r) : Iu(e, t, r);
function Ll(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let o = 0; o < 10; o++)
      r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, u = (o + 2) % 10, f = r[u], g = r[u + 1], E = _c(f, g, 1) ^ r[a], C = hc(f, g, 1) ^ r[a + 1];
      for (let S = 0; S < 50; S += 10)
        e[o + S] ^= E, e[o + S + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = Bu[o], u = _c(s, i, a), f = hc(s, i, a), g = Cu[o];
      s = e[g], i = e[g + 1], e[g] = u, e[g + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        r[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    e[0] ^= Ml[n], e[1] ^= Ol[n];
  }
  r.fill(0);
}
class oa extends na {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Oe(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Bs(this.state);
  }
  keccak() {
    Ls || ks(this.state32), Ll(this.state32, this.rounds), Ls || ks(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    An(this);
    const { blockLen: r, state: n } = this;
    t = pn(t);
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
    An(this, !1), es(t), this.finish();
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
    if (pu(t, this), this.finished)
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
    return t || (t = new oa(r, n, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const kl = (e, t, r) => _i(() => new oa(t, e, r)), Pl = /* @__PURE__ */ kl(1, 136, 256 / 8), Ul = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Ru = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((e, t) => t)), zl = /* @__PURE__ */ Ru.map((e) => (9 * e + 5) % 16);
let aa = [Ru], ca = [zl];
for (let e = 0; e < 4; e++)
  for (let t of [aa, ca])
    t.push(t[e].map((r) => Ul[r]));
const Su = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Gl = /* @__PURE__ */ aa.map((e, t) => e.map((r) => Su[t][r])), Wl = /* @__PURE__ */ ca.map((e, t) => e.map((r) => Su[t][r])), Xl = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Hl = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function lc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const ys = /* @__PURE__ */ new Uint32Array(16);
class Yl extends sa {
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
      ys[S] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, o = i, a = this.h2 | 0, u = a, f = this.h3 | 0, g = f, E = this.h4 | 0, C = E;
    for (let S = 0; S < 5; S++) {
      const Q = 4 - S, N = Xl[S], T = Hl[S], M = aa[S], H = ca[S], G = Gl[S], Y = Wl[S];
      for (let O = 0; O < 16; O++) {
        const L = Et(n + lc(S, i, a, f) + ys[M[O]] + N, G[O]) + E | 0;
        n = E, E = f, f = Et(a, 10) | 0, a = i, i = L;
      }
      for (let O = 0; O < 16; O++) {
        const L = Et(s + lc(Q, o, u, g) + ys[H[O]] + T, Y[O]) + C | 0;
        s = C, C = g, g = Et(u, 10) | 0, u = o, o = L;
      }
    }
    this.set(this.h1 + a + g | 0, this.h2 + f + C | 0, this.h3 + E + s | 0, this.h4 + n + o | 0, this.h0 + i + u | 0);
  }
  roundClean() {
    ys.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Vl = /* @__PURE__ */ _i(() => new Yl()), [Zl, Jl] = mt.split([
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
].map((e) => BigInt(e))), mr = /* @__PURE__ */ new Uint32Array(80), yr = /* @__PURE__ */ new Uint32Array(80);
class ql extends sa {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: o, Dh: a, Dl: u, Eh: f, El: g, Fh: E, Fl: C, Gh: S, Gl: Q, Hh: N, Hl: T } = this;
    return [t, r, n, s, i, o, a, u, f, g, E, C, S, Q, N, T];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, u, f, g, E, C, S, Q, N, T) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = u | 0, this.Eh = f | 0, this.El = g | 0, this.Fh = E | 0, this.Fl = C | 0, this.Gh = S | 0, this.Gl = Q | 0, this.Hh = N | 0, this.Hl = T | 0;
  }
  process(t, r) {
    for (let G = 0; G < 16; G++, r += 4)
      mr[G] = t.getUint32(r), yr[G] = t.getUint32(r += 4);
    for (let G = 16; G < 80; G++) {
      const Y = mr[G - 15] | 0, O = yr[G - 15] | 0, L = mt.rotrSH(Y, O, 1) ^ mt.rotrSH(Y, O, 8) ^ mt.shrSH(Y, O, 7), z = mt.rotrSL(Y, O, 1) ^ mt.rotrSL(Y, O, 8) ^ mt.shrSL(Y, O, 7), U = mr[G - 2] | 0, k = yr[G - 2] | 0, j = mt.rotrSH(U, k, 19) ^ mt.rotrBH(U, k, 61) ^ mt.shrSH(U, k, 6), V = mt.rotrSL(U, k, 19) ^ mt.rotrBL(U, k, 61) ^ mt.shrSL(U, k, 6), tt = mt.add4L(z, V, yr[G - 7], yr[G - 16]), B = mt.add4H(tt, L, j, mr[G - 7], mr[G - 16]);
      mr[G] = B | 0, yr[G] = tt | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: o, Ch: a, Cl: u, Dh: f, Dl: g, Eh: E, El: C, Fh: S, Fl: Q, Gh: N, Gl: T, Hh: M, Hl: H } = this;
    for (let G = 0; G < 80; G++) {
      const Y = mt.rotrSH(E, C, 14) ^ mt.rotrSH(E, C, 18) ^ mt.rotrBH(E, C, 41), O = mt.rotrSL(E, C, 14) ^ mt.rotrSL(E, C, 18) ^ mt.rotrBL(E, C, 41), L = E & S ^ ~E & N, z = C & Q ^ ~C & T, U = mt.add5L(H, O, z, Jl[G], yr[G]), k = mt.add5H(U, M, Y, L, Zl[G], mr[G]), j = U | 0, V = mt.rotrSH(n, s, 28) ^ mt.rotrBH(n, s, 34) ^ mt.rotrBH(n, s, 39), tt = mt.rotrSL(n, s, 28) ^ mt.rotrBL(n, s, 34) ^ mt.rotrBL(n, s, 39), B = n & i ^ n & a ^ i & a, d = s & o ^ s & u ^ o & u;
      M = N | 0, H = T | 0, N = S | 0, T = Q | 0, S = E | 0, Q = C | 0, { h: E, l: C } = mt.add(f | 0, g | 0, k | 0, j | 0), f = a | 0, g = u | 0, a = i | 0, u = o | 0, i = n | 0, o = s | 0;
      const _ = mt.add3L(j, tt, d);
      n = mt.add3H(_, k, V, B), s = _ | 0;
    }
    ({ h: n, l: s } = mt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: o } = mt.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: u } = mt.add(this.Ch | 0, this.Cl | 0, a | 0, u | 0), { h: f, l: g } = mt.add(this.Dh | 0, this.Dl | 0, f | 0, g | 0), { h: E, l: C } = mt.add(this.Eh | 0, this.El | 0, E | 0, C | 0), { h: S, l: Q } = mt.add(this.Fh | 0, this.Fl | 0, S | 0, Q | 0), { h: N, l: T } = mt.add(this.Gh | 0, this.Gl | 0, N | 0, T | 0), { h: M, l: H } = mt.add(this.Hh | 0, this.Hl | 0, M | 0, H | 0), this.set(n, s, i, o, a, u, f, g, E, C, S, Q, N, T, M, H);
  }
  roundClean() {
    mr.fill(0), yr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Nu = /* @__PURE__ */ _i(() => new ql());
var jl = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: o } = e;
  return ll(t, r, { N: n, r: i, p: s, dkLen: o });
}, $l = (e) => Pl(e);
function Kl(e) {
  const t = $(e, "data");
  return Vl(t);
}
var dn = (e, t = "base64") => {
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
}, Tu = (e, t, r, n, s) => {
  const i = { sha256: jr, sha512: Nu }[s];
  return K(ia(i, e, t, { c: r, dkLen: n }));
}, { crypto: rs, btoa: Du } = globalThis;
if (!rs)
  throw new x(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Du)
  throw new x(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var wo = (e) => rs.getRandomValues(new Uint8Array(e)), Rs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return Du(r);
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
}, Qu = "AES-CTR", da = (e, t) => {
  const r = dn(String(e).normalize("NFKC"), "utf-8"), n = Tu(r, t, 1e5, 32, "sha256");
  return $(n);
}, tf = async (e, t) => {
  const r = wo(16), n = wo(32), s = da(e, n), i = JSON.stringify(t), o = dn(i, "utf-8"), a = {
    name: Qu,
    counter: r,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), f = await crypto.subtle.encrypt(a, u, o);
  return {
    data: Rs(new Uint8Array(f)),
    iv: Rs(r),
    salt: Rs(n)
  };
}, ef = async (e, t) => {
  const r = dn(t.iv), n = dn(t.salt), s = da(e, n), i = dn(t.data), o = {
    name: Qu,
    counter: r,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), u = await crypto.subtle.decrypt(o, a, i), f = new TextDecoder().decode(u);
  try {
    return JSON.parse(f);
  } catch {
    throw new x(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, rf = async (e, t, r) => {
  const n = rs.subtle, s = new Uint8Array(t.subarray(0, 16)), i = r, o = e, a = await n.importKey(
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
}, nf = async (e, t, r) => {
  const n = rs.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(r).buffer, o = new Uint8Array(e).buffer, a = await n.importKey(
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
}, sf = (e, t, r) => {
  const n = e === "sha256" ? jr : Nu, s = hi.create(n, t).update(r).digest();
  return K(s);
}, of = () => rs.randomUUID(), af = {
  bufferFromString: dn,
  stringFromBuffer: Rs,
  decrypt: ef,
  encrypt: tf,
  keyFromPassword: da,
  randomBytes: wo,
  scrypt: jl,
  keccak256: $l,
  decryptJsonWalletData: nf,
  encryptJsonWalletData: rf,
  computeHmac: sf,
  pbkdf2: Tu,
  ripemd160: Kl,
  randomUUID: of
}, cf = af, {
  bufferFromString: Nr,
  decrypt: df,
  encrypt: uf,
  keyFromPassword: xC,
  randomBytes: ze,
  stringFromBuffer: Mn,
  scrypt: Fu,
  keccak256: Mu,
  decryptJsonWalletData: _f,
  encryptJsonWalletData: hf,
  pbkdf2: lf,
  computeHmac: Ou,
  ripemd160: ff,
  randomUUID: Af
} = cf;
function Ce(e) {
  return K(jr($(e)));
}
function Je(e) {
  return Ce(e);
}
function pf(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function gf(e) {
  return Je(Nr(e, "utf-8"));
}
var wf = Object.defineProperty, mf = (e, t, r) => t in e ? wf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ua = (e, t, r) => (mf(e, t + "", r), r), _t = class {
  constructor(e, t, r) {
    F(this, "name");
    F(this, "type");
    F(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, yf = "u8", bf = "u16", If = "u32", Ef = "u64", vf = "u256", Cf = "raw untyped ptr", Bf = "raw untyped slice", xf = "bool", Rf = "b256", Sf = "struct std::b512::B512", Ps = "enum std::option::Option", Nf = "struct std::vec::Vec", Tf = "struct std::bytes::Bytes", Df = "struct std::string::String", Qf = "str", ns = "()", Lu = /^enum (std::option::)?Option$/m, ku = /^str\[(?<length>[0-9]+)\]/, mo = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Pu = /^struct.+/, Uu = /^enum.+$/, Ff = /^\((?<items>.*)\)$/, Mf = /^generic.+$/, Of = /([^\s]+)$/m, Us = "1", gt = 8, fr = 32, zs = fr + 2, Gs = fr, Lf = fr, kf = fr, Pf = gt * 4, Uf = gt * 2, zu = 2 ** 32 - 1, Gu = ({ maxInputs: e }) => fr + // Tx ID
Gs + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Gs + gt) + gt, Wu = gt + // Identifier
gt + // Gas limit
gt + // Script size
gt + // Script data size
gt + // Policies
gt + // Inputs size
gt + // Outputs size
gt + // Witnesses size
fr, RC = gt + // Identifier
Pf + // Utxo Length
gt + // Output Index
kf + // Owner
gt + // Amount
Gs + // Asset id
Uf + // TxPointer
gt + // Witnesses index
gt + // Predicate size
gt + // Predicate data size
gt, fc = (e) => e instanceof Uint8Array, En = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const r of t)
    if (r.type === Ps || "coder" in r && r.coder.type === Ps || "coders" in r && En(r.coders))
      return !0;
  return !1;
}, jn, Vd, bt = (Vd = class extends _t {
  constructor(t, r) {
    super("array", `[${t.type}; ${r}]`, r * t.encodedLength);
    F(this, "coder");
    F(this, "length");
    Ge(this, jn);
    this.coder = t, this.length = r, qe(this, jn, En([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(D.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new x(D.ENCODE_ERROR, "Types/values length mismatch.");
    return ut(Array.from(t).map((r) => this.coder.encode(r)));
  }
  decode(t, r) {
    if (!Wt(this, jn) && t.length < this.encodedLength || t.length > zu)
      throw new x(D.DECODE_ERROR, "Invalid array data size.");
    let n = r;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, n] = this.coder.decode(t, n), i;
    }), n];
  }
}, jn = new WeakMap(), Vd), J = class extends _t {
  constructor() {
    super("b256", "b256", gt * 4);
  }
  encode(e) {
    let t;
    try {
      t = $(e);
    } catch {
      throw new x(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new x(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid b256 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (R(r).isZero() && (r = new Uint8Array(32)), r.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid b256 byte data size.");
    return [jo(r, 32), t + 32];
  }
}, zf = class extends _t {
  constructor() {
    super("b512", "struct B512", gt * 8);
  }
  encode(e) {
    let t;
    try {
      t = $(e);
    } catch {
      throw new x(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new x(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid b512 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (R(r).isZero() && (r = new Uint8Array(64)), r.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid b512 byte data size.");
    return [jo(r, this.encodedLength), t + this.encodedLength];
  }
}, Gf = {
  u64: gt,
  u256: gt * 4
}, P = class extends _t {
  constructor(e) {
    super("bigNumber", e, Gf[e]);
  }
  encode(e) {
    let t;
    try {
      t = hr(e, this.encodedLength);
    } catch {
      throw new x(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let r = e.slice(t, t + this.encodedLength);
    if (r = r.slice(0, this.encodedLength), r.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [R(r), t + this.encodedLength];
  }
}, Wf = class extends _t {
  constructor(t = {
    padToWordSize: !1
  }) {
    const r = t.padToWordSize ? gt : 1;
    super("boolean", "boolean", r);
    F(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new x(D.ENCODE_ERROR, "Invalid boolean value.");
    return hr(t ? 1 : 0, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid boolean data size.");
    const n = R(t.slice(r, r + this.encodedLength));
    if (n.isZero())
      return [!1, r + this.encodedLength];
    if (!n.eq(R(1)))
      throw new x(D.DECODE_ERROR, "Invalid boolean value.");
    return [!0, r + this.encodedLength];
  }
}, Xu = class extends _t {
  constructor() {
    super("struct", "struct Bytes", gt);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), r = new P("u64").encode(t.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < gt)
      throw new x(D.DECODE_ERROR, "Invalid byte data size.");
    const r = t + gt, n = e.slice(t, r), s = R(new P("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new x(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, r + s];
  }
};
ua(Xu, "memorySize", 1);
var Xr, $n, hn, Mr, Yu, Vu, Zu, Zd, Hu = (Zd = class extends _t {
  constructor(t, r) {
    const n = new P("u64"), s = Object.values(r).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    Ge(this, Mr);
    F(this, "name");
    F(this, "coders");
    Ge(this, Xr);
    Ge(this, $n);
    Ge(this, hn);
    this.name = t, this.coders = r, qe(this, Xr, n), qe(this, $n, s), qe(this, hn, !(Lu.test(this.type) || En(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return ps(this, Mr, Vu).call(this, t);
    const [r, ...n] = Object.keys(t);
    if (!r)
      throw new x(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (n.length !== 0)
      throw new x(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[r], i = Object.keys(this.coders).indexOf(r);
    if (i === -1) {
      const a = Object.keys(this.coders).map((u) => `'${u}'`).join(", ");
      throw new x(
        D.INVALID_DECODE_VALUE,
        `Invalid case '${r}'. Valid cases: ${a}.`
      );
    }
    const o = s.encode(t[r]);
    return new Uint8Array([...Wt(this, Xr).encode(i), ...o]);
  }
  decode(t, r) {
    if (Wt(this, hn) && t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid enum data size.");
    const n = new P("u64").decode(t, r)[0], s = Cr(n), i = Object.keys(this.coders)[s];
    if (!i)
      throw new x(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], a = r + Wt(this, Xr).encodedLength;
    if (Wt(this, hn) && t.length < a + o.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid enum data size.");
    const [u, f] = o.decode(t, a);
    return ps(this, Mr, Yu).call(this, this.coders[i]) ? ps(this, Mr, Zu).call(this, i, f) : [{ [i]: u }, f];
  }
}, Xr = new WeakMap(), $n = new WeakMap(), hn = new WeakMap(), Mr = new WeakSet(), // Checks that we're handling a native enum that is of type void.
Yu = function(t) {
  return this.type !== Ps && t.type === ns;
}, Vu = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Wt(this, $n) - r.encodedLength);
  return ut([Wt(this, Xr).encode(s), i, n]);
}, Zu = function(t, r) {
  return [t, r];
}, Zd), Xf = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new x(D.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, rt = class extends _t {
  constructor(t, r = {
    padToWordSize: !1
  }) {
    const n = r.padToWordSize ? gt : Xf(t);
    super("number", t, n);
    F(this, "baseType");
    F(this, "options");
    this.baseType = t, this.options = r;
  }
  encode(t) {
    let r;
    try {
      r = hr(t);
    } catch {
      throw new x(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (r.length > this.encodedLength)
      throw new x(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return hr(r, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid number data size.");
    const n = t.slice(r, r + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid number byte data size.");
    return [Cr(n), r + this.encodedLength];
  }
}, Ju = class extends Hu {
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
}, Hf = class extends _t {
  constructor() {
    super("raw untyped slice", "raw untyped slice", gt);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(D.ENCODE_ERROR, "Expected array value.");
    const r = new bt(new rt("u8"), e.length).encode(e), n = new P("u64").encode(r.length);
    return new Uint8Array([...n, ...r]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid raw slice data size.");
    const r = t + gt, n = e.slice(t, r), s = R(new P("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new x(D.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new bt(new rt("u8"), s), [a] = o.decode(i, 0);
    return [a, r + s];
  }
}, _a = class extends _t {
  constructor() {
    super("struct", "struct String", gt);
  }
  encode(e) {
    const t = fn(e), r = new P("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid std string data size.");
    const r = t + gt, n = e.slice(t, r), s = R(new P("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new x(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [ra(i), r + s];
  }
};
ua(_a, "memorySize", 1);
var qu = class extends _t {
  constructor() {
    super("strSlice", "str", gt);
  }
  encode(e) {
    const t = fn(e), r = new P("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid string slice data size.");
    const r = t + gt, n = e.slice(t, r), s = R(new P("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new x(D.DECODE_ERROR, "Invalid string slice byte data size.");
    return [ra(i), r + s];
  }
};
ua(qu, "memorySize", 1);
var Yf = class extends _t {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new x(D.ENCODE_ERROR, "Value length mismatch during encode.");
    return fn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(t, t + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid string byte data size.");
    return [ra(r), t + this.encodedLength];
  }
}, Kn, Jd, li = (Jd = class extends _t {
  constructor(t, r) {
    const n = Object.values(r).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, n);
    F(this, "name");
    F(this, "coders");
    Ge(this, Kn);
    this.name = t, this.coders = r, qe(this, Kn, En(r));
  }
  encode(t) {
    return ui(
      Object.keys(this.coders).map((r) => {
        const n = this.coders[r], s = t[r];
        if (!(n instanceof Ju) && s == null)
          throw new x(
            D.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${r}" not present.`
          );
        return n.encode(s);
      })
    );
  }
  decode(t, r) {
    if (!Wt(this, Kn) && t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid struct data size.");
    let n = r;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let u;
      return [u, n] = a.decode(t, n), i[o] = u, i;
    }, {}), n];
  }
}, Kn = new WeakMap(), Jd), ts, qd, ju = (qd = class extends _t {
  constructor(t) {
    const r = t.reduce((n, s) => n + s.encodedLength, 0);
    super("tuple", `(${t.map((n) => n.type).join(", ")})`, r);
    F(this, "coders");
    Ge(this, ts);
    this.coders = t, qe(this, ts, En(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(D.ENCODE_ERROR, "Types/values length mismatch.");
    return ui(this.coders.map((r, n) => r.encode(t[n])));
  }
  decode(t, r) {
    if (!Wt(this, ts) && t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid tuple data size.");
    let n = r;
    return [this.coders.map((i) => {
      let o;
      return [o, n] = i.decode(t, n), o;
    }), n];
  }
}, ts = new WeakMap(), qd), ln, jd, Vf = (jd = class extends _t {
  constructor(t) {
    super("struct", "struct Vec", gt);
    F(this, "coder");
    Ge(this, ln);
    this.coder = t, qe(this, ln, En([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !fc(t))
      throw new x(
        D.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const r = new P("u64");
    if (fc(t))
      return new Uint8Array([...r.encode(t.length), ...t]);
    const n = t.map((i) => this.coder.encode(i)), s = r.encode(t.length);
    return new Uint8Array([...s, ...ui(n)]);
  }
  decode(t, r) {
    if (!Wt(this, ln) && t.length < this.encodedLength || t.length > zu)
      throw new x(D.DECODE_ERROR, "Invalid vec data size.");
    const n = r + gt, s = t.slice(r, n), i = R(new P("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, a = t.slice(n, n + o);
    if (!Wt(this, ln) && a.length !== o)
      throw new x(D.DECODE_ERROR, "Invalid vec byte data size.");
    let u = n;
    const f = [];
    for (let g = 0; g < i; g++) {
      const [E, C] = this.coder.decode(t, u);
      f.push(E), u = C;
    }
    return [f, u];
  }
}, ln = new WeakMap(), jd), $u = (e) => {
  switch (e) {
    case void 0:
    case Us:
      return Us;
    default:
      throw new x(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, zn = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new x(
      D.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, Zf = (e, t) => t.filter((r) => zn(e, r.type).type !== ns), Jf = (e) => {
  var n;
  const t = e.find((s) => s.name === "buf"), r = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !r)
    throw new x(
      D.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return r;
}, Br = class {
  constructor(e, t) {
    F(this, "abi");
    F(this, "name");
    F(this, "type");
    F(this, "originalTypeArguments");
    F(this, "components");
    this.abi = e, this.name = t.name;
    const r = zn(e, t.type);
    if (r.type.length > 256)
      throw new x(
        D.INVALID_COMPONENT,
        `The provided ABI type is too long: ${r.type}.`
      );
    this.type = r.type, this.originalTypeArguments = t.typeArguments, this.components = Br.getResolvedGenericComponents(
      e,
      t,
      r.components,
      r.typeParameters ?? Br.getImplicitGenericTypeParameters(e, r.components)
    );
  }
  static getResolvedGenericComponents(e, t, r, n) {
    if (r === null)
      return null;
    if (n === null || n.length === 0)
      return r.map((o) => new Br(e, o));
    const s = n.reduce(
      (o, a, u) => {
        var g;
        const f = { ...o };
        return f[a] = structuredClone(
          (g = t.typeArguments) == null ? void 0 : g[u]
        ), f;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      r,
      s
    ).map((o) => new Br(e, o));
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
      const s = zn(e, n.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = zn(e, s.type);
      if (Mf.test(i.type)) {
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
    return Pu.test(this.type) ? "s" : mo.test(this.type) ? "a" : Uu.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = ku.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = mo.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new Br(this.abi, o).getSignature()).join(",")}>` : "", n = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, qf = class extends _t {
  constructor() {
    super("void", ns, 0);
  }
  encode(e) {
    return new Uint8Array([]);
  }
  decode(e, t) {
    return [void 0, t];
  }
};
function Ac(e, t) {
  const { getCoder: r } = t;
  return e.reduce((n, s) => {
    const i = n;
    return i[s.name] = r(s, t), i;
  }, {});
}
var en = (e, t) => {
  var f, g, E, C;
  switch (e.type) {
    case yf:
    case bf:
    case If:
      return new rt(e.type);
    case Ef:
    case Cf:
      return new P("u64");
    case vf:
      return new P("u256");
    case Bf:
      return new Hf();
    case xf:
      return new Wf();
    case Rf:
      return new J();
    case Sf:
      return new zf();
    case Tf:
      return new Xu();
    case Df:
      return new _a();
    case Qf:
      return new qu();
    case ns:
      return new qf();
  }
  const r = (f = ku.exec(e.type)) == null ? void 0 : f.groups;
  if (r) {
    const S = parseInt(r.length, 10);
    return new Yf(S);
  }
  const n = e.components, s = (g = mo.exec(e.type)) == null ? void 0 : g.groups;
  if (s) {
    const S = parseInt(s.length, 10), Q = n[0];
    if (!Q)
      throw new x(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const N = en(Q);
    return new bt(N, S);
  }
  if (e.type === Nf) {
    const S = Jf(n), Q = new Br(e.abi, S), N = en(Q);
    return new Vf(N);
  }
  const i = (E = e.type.match(Of)) == null ? void 0 : E[0];
  if (Pu.test(e.type) && i) {
    const S = Ac(n, { getCoder: en });
    return new li(i, S);
  }
  if (Uu.test(e.type) && i) {
    const S = Ac(n, { getCoder: en });
    return e.type === Ps ? new Ju(i, S) : new Hu(i, S);
  }
  if ((C = Ff.exec(e.type)) == null ? void 0 : C.groups) {
    const S = n.map((Q) => en(Q));
    return new ju(S);
  }
  throw new x(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function jf(e = Us) {
  switch (e) {
    case Us:
      return en;
    default:
      throw new x(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Gr = class {
  static getCoder(e, t, r = {
    padToWordSize: !1
  }) {
    const n = new Br(e, t);
    return jf(r.encoding)(n, r);
  }
  static encode(e, t, r, n) {
    return this.getCoder(e, t, n).encode(r);
  }
  static decode(e, t, r, n, s) {
    return this.getCoder(e, t, s).decode(r, n);
  }
}, $f = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const o = zn(t, i.type);
    return n = n || o.type !== ns && !Lu.test(o.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, Kf = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, yo = class {
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
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = yo.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = yo.getFunctionSelector(this.signature), this.selectorBytes = new _a().encode(this.name), this.encoding = $u(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const r = t.inputs.map(
      (n) => new Br(e, n).getSignature()
    );
    return `${t.name}(${r.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Ce(Nr(e, "utf-8"));
    return R(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    const r = $f({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new x(
        D.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Gr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = Kf(e, this.jsonFn.inputs);
    return new ju(n).encode(s);
  }
  decodeArguments(e) {
    const t = $(e), r = Zf(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (r.length === 0) {
      if (t.length === 0)
        return;
      throw new x(
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
        const o = Gr.getCoder(this.jsonAbiOld, i, { encoding: this.encoding }), [a, u] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, a],
          offset: s.offset + u
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    const t = $(e);
    return Gr.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
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
}, tA = (e, t) => e.find((r) => r.concreteTypeId === t), ha = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function la(e, t, r) {
  const n = ha(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = tA(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: fa(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function Ku(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = ha(e, s);
    return {
      name: "",
      type: isNaN(s) ? la(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: Ku(e, t, i)
    };
  })) ?? null;
}
function nn(e, t, r, n) {
  const s = la(e, t, r), i = ha(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: Ku(e, t, i)
  };
}
function fa(e, t, r) {
  return (r == null ? void 0 : r.map((n) => {
    const { typeId: s, name: i, typeArguments: o } = n, a = isNaN(s) ? la(e, t, s) : s;
    return {
      name: i,
      type: a,
      // originalTypeId: typeId,
      typeArguments: fa(e, t, o)
    };
  })) ?? null;
}
function eA(e) {
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
    o.components = fa(e, t, o.components);
  });
  const r = e.functions.map((o) => {
    const a = o.inputs.map(
      ({ concreteTypeId: f, name: g }) => nn(e, t, f, g)
    ), u = nn(e, t, o.output, "");
    return { ...o, inputs: a, output: u };
  }), n = e.configurables.map((o) => ({
    name: o.name,
    configurableType: nn(e, t, o.concreteTypeId),
    offset: o.offset
  })), s = e.loggedTypes.map((o) => ({
    logId: o.logId,
    loggedType: nn(e, t, o.concreteTypeId)
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
var Ar = class {
  constructor(e) {
    F(this, "functions");
    F(this, "configurables");
    F(this, "jsonAbi");
    F(this, "encoding");
    F(this, "jsonAbiOld");
    this.jsonAbi = e, this.encoding = $u(e.encodingVersion), this.jsonAbiOld = eA(e), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new yo(this.jsonAbiOld, t)])
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
    throw new x(
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
      throw new x(
        D.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Gr.decode(this.jsonAbiOld, r.loggedType, $(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const r = this.jsonAbiOld.configurables.find((n) => n.name === e);
    if (!r)
      throw new x(
        D.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Gr.encode(this.jsonAbiOld, r.configurableType, t, {
      encoding: this.encoding
    });
  }
  encodeType(e, t) {
    const r = nn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Gr.encode(this.jsonAbiOld, r, t, {
      encoding: this.encoding
    });
  }
  decodeType(e, t) {
    const r = nn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Gr.decode(this.jsonAbiOld, r, t, 0, { encoding: this.encoding });
  }
}, SC = class {
}, rA = class {
}, t0 = class {
}, e0 = class {
}, nA = class extends e0 {
}, sA = class extends e0 {
}, Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
var gn = Wn.bech32m = Wn.bech32 = void 0;
const Ws = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", r0 = {};
for (let e = 0; e < Ws.length; e++) {
  const t = Ws.charAt(e);
  r0[t] = e;
}
function un(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function pc(e) {
  let t = 1;
  for (let r = 0; r < e.length; ++r) {
    const n = e.charCodeAt(r);
    if (n < 33 || n > 126)
      return "Invalid prefix (" + e + ")";
    t = un(t) ^ n >> 5;
  }
  t = un(t);
  for (let r = 0; r < e.length; ++r) {
    const n = e.charCodeAt(r);
    t = un(t) ^ n & 31;
  }
  return t;
}
function Aa(e, t, r, n) {
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
function iA(e) {
  return Aa(e, 8, 5, !0);
}
function oA(e) {
  const t = Aa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function aA(e) {
  const t = Aa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function n0(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function r(o, a, u) {
    if (u = u || 90, o.length + 7 + a.length > u)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let f = pc(o);
    if (typeof f == "string")
      throw new Error(f);
    let g = o + "1";
    for (let E = 0; E < a.length; ++E) {
      const C = a[E];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      f = un(f) ^ C, g += Ws.charAt(C);
    }
    for (let E = 0; E < 6; ++E)
      f = un(f);
    f ^= t;
    for (let E = 0; E < 6; ++E) {
      const C = f >> (5 - E) * 5 & 31;
      g += Ws.charAt(C);
    }
    return g;
  }
  function n(o, a) {
    if (a = a || 90, o.length < 8)
      return o + " too short";
    if (o.length > a)
      return "Exceeds length limit";
    const u = o.toLowerCase(), f = o.toUpperCase();
    if (o !== u && o !== f)
      return "Mixed-case string " + o;
    o = u;
    const g = o.lastIndexOf("1");
    if (g === -1)
      return "No separator character for " + o;
    if (g === 0)
      return "Missing prefix for " + o;
    const E = o.slice(0, g), C = o.slice(g + 1);
    if (C.length < 6)
      return "Data too short";
    let S = pc(E);
    if (typeof S == "string")
      return S;
    const Q = [];
    for (let N = 0; N < C.length; ++N) {
      const T = C.charAt(N), M = r0[T];
      if (M === void 0)
        return "Unknown character " + T;
      S = un(S) ^ M, !(N + 6 >= C.length) && Q.push(M);
    }
    return S !== t ? "Invalid checksum for " + o : { prefix: E, words: Q };
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
    toWords: iA,
    fromWordsUnsafe: oA,
    fromWords: aA
  };
}
Wn.bech32 = n0("bech32");
gn = Wn.bech32m = n0("bech32m");
var Xs = "fuel";
function pa(e) {
  return gn.decode(e);
}
function Ss(e) {
  return gn.encode(
    Xs,
    gn.toWords($(K(e)))
  );
}
function Ns(e) {
  return typeof e == "string" && e.indexOf(Xs + 1) === 0 && pa(e).prefix === Xs;
}
function bo(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function gc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Io(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function ga(e) {
  return new Uint8Array(gn.fromWords(pa(e).words));
}
function wc(e) {
  if (!Ns(e))
    throw new x(
      x.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return K(ga(e));
}
function cA(e) {
  const { words: t } = pa(e);
  return gn.encode(Xs, t);
}
var On = (e) => e instanceof t0 ? e.address : e instanceof nA ? e.id : e, dA = () => K(ze(32)), uA = (e) => {
  let t;
  try {
    if (!bo(e))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = ga(Ss(e)), t = K(t.fill(0, 0, 12));
  } catch {
    throw new x(
      x.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, _A = (e) => {
  if (!Io(e))
    throw new x(x.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ft = class extends rA {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    F(this, "bech32Address");
    if (this.bech32Address = cA(t), !Ns(this.bech32Address))
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
    return wc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return ga(this.bech32Address);
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
    const t = wc(this.bech32Address);
    return {
      bits: uA(t)
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
    if (!gc(t))
      throw new x(x.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const r = K(jr($(t)));
    return new ft(Ss(r));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!bo(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ft(Ss(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(dA());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Ns(t) ? new ft(t) : this.fromB256(t);
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
      return ft.fromB256(t.toB256());
    if (gc(t))
      return ft.fromPublicKey(t);
    if (Ns(t))
      return new ft(t);
    if (bo(t))
      return ft.fromB256(t);
    if (Io(t))
      return ft.fromEvmAddress(t);
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
    if (!Io(t))
      throw new x(
        x.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const r = _A(t);
    return new ft(Ss(r));
  }
}, Sr, $d, St = ($d = class extends _t {
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
    Ge(this, Sr);
    this.length = t, qe(this, Sr, r);
  }
  encode(t) {
    const r = [], n = $(t);
    return r.push(n), Wt(this, Sr) && r.push(new Uint8Array(Wt(this, Sr))), ut(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [K(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return Wt(this, Sr) && ([n, s] = [null, s + Wt(this, Sr)]), [i, s];
  }
}, Sr = new WeakMap(), $d), Vr = class extends li {
  constructor() {
    super("TxPointer", {
      blockHeight: new rt("u32", { padToWordSize: !0 }),
      txIndex: new rt("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(e) {
    if (e.length !== 12)
      throw new x(
        D.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${e.length}. It must have length 12.`
      );
    const [t, r] = [e.substring(0, 8), e.substring(8)];
    return {
      blockHeight: parseInt(t, 16),
      txIndex: parseInt(r, 16)
    };
  }
}, Ct = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ct || {}), mc = class extends _t {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.txID)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new J().encode(e.owner)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), t.push(new Vr().encode(e.txPointer)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new P("u64").encode(e.predicateGasUsed)), t.push(new P("u64").encode(e.predicateLength)), t.push(new P("u64").encode(e.predicateDataLength)), t.push(new St(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new St(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J().decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new J().decode(e, n);
    const u = r;
    [r, n] = new Vr().decode(e, n);
    const f = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const g = Number(r);
    [r, n] = new P("u64").decode(e, n);
    const E = r;
    [r, n] = new P("u64").decode(e, n);
    const C = r;
    [r, n] = new P("u64").decode(e, n);
    const S = r;
    [r, n] = new St(C.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new St(S.toNumber()).decode(e, n), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: a,
        assetId: u,
        txPointer: f,
        witnessIndex: g,
        predicateGasUsed: E,
        predicateLength: C,
        predicateDataLength: S,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, Hs = class extends _t {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.txID)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new J().encode(e.balanceRoot)), t.push(new J().encode(e.stateRoot)), t.push(new Vr().encode(e.txPointer)), t.push(new J().encode(e.contractID)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new J().decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new Vr().decode(e, n);
    const u = r;
    return [r, n] = new J().decode(e, n), [
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
}, Tr = class extends _t {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new St(32).encode(e.nonce)), t.push(new P("u64").encode(e.amount)), t.push($(e.data || "0x")), Ce(ut(t));
  }
  static encodeData(e) {
    const t = $(e || "0x"), r = t.length;
    return new St(r).encode(t);
  }
  encode(e) {
    const t = [], r = Tr.encodeData(e.data);
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new P("u64").encode(e.amount)), t.push(new St(32).encode(e.nonce)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new P("u64").encode(e.predicateGasUsed)), t.push(new P("u64").encode(r.length)), t.push(new P("u64").encode(e.predicateLength)), t.push(new P("u64").encode(e.predicateDataLength)), t.push(new St(r.length).encode(r)), t.push(new St(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new St(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ut(t);
  }
  static decodeData(e) {
    const t = $(e), r = t.length, [n] = new St(r).decode(t, 0);
    return $(n);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = Number(r);
    [r, n] = new P("u64").decode(e, n);
    const f = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new P("u64").decode(e, n);
    const E = r;
    [r, n] = new P("u64").decode(e, n);
    const C = r;
    [r, n] = new St(g).decode(e, n);
    const S = r;
    [r, n] = new St(E.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new St(C.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: u,
        nonce: a,
        predicateGasUsed: f,
        dataLength: g,
        predicateLength: E,
        predicateDataLength: C,
        data: S,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, er = class extends _t {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new mc().encode(e));
        break;
      }
      case 1: {
        t.push(new Hs().encode(e));
        break;
      }
      case 2: {
        t.push(new Tr().encode(e));
        break;
      }
      default:
        throw new x(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${r}.`
        );
    }
    return ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new mc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Hs().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Tr().decode(e, n), [r, n];
      default:
        throw new x(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, vt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(vt || {}), yc = class extends _t {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    return [r, n] = new J().decode(e, n), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Ys = class extends _t {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new rt("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new J().encode(e.balanceRoot)), t.push(new J().encode(e.stateRoot)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    return [r, n] = new J().decode(e, n), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: r
      },
      n
    ];
  }
}, bc = class extends _t {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    return [r, n] = new J().decode(e, n), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Ic = class extends _t {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    return [r, n] = new J().decode(e, n), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Ec = class extends _t {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.contractId)), t.push(new J().encode(e.stateRoot)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    return [r, n] = new J().decode(e, n), [
      {
        type: 4,
        contractId: s,
        stateRoot: r
      },
      n
    ];
  }
}, rr = class extends _t {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new yc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ys().encode(e));
        break;
      }
      case 2: {
        t.push(new bc().encode(e));
        break;
      }
      case 3: {
        t.push(new Ic().encode(e));
        break;
      }
      case 4: {
        t.push(new Ec().encode(e));
        break;
      }
      default:
        throw new x(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${r}.`
        );
    }
    return ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new yc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Ys().decode(e, n), [r, n];
      case 2:
        return [r, n] = new bc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Ic().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Ec().decode(e, n), [r, n];
      default:
        throw new x(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Ye = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Ye || {}), hA = (e) => e.sort((t, r) => t.type - r.type);
function lA(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((r) => {
    if (t.has(r.type))
      throw new x(
        D.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(r.type);
  });
}
var nr = class extends _t {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    lA(e);
    const t = hA(e), r = [];
    return t.forEach(({ data: n, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          r.push(new P("u64").encode(n));
          break;
        case 4:
          r.push(new rt("u32", { padToWordSize: !0 }).encode(n));
          break;
        default:
          throw new x(D.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), ut(r);
  }
  decode(e, t, r) {
    let n = t;
    const s = [];
    if (r & 1) {
      const [i, o] = new P("u64").decode(e, n);
      n = o, s.push({ type: 1, data: i });
    }
    if (r & 2) {
      const [i, o] = new P("u64").decode(e, n);
      n = o, s.push({ type: 2, data: i });
    }
    if (r & 4) {
      const [i, o] = new rt("u32", { padToWordSize: !0 }).decode(
        e,
        n
      );
      n = o, s.push({ type: 4, data: i });
    }
    if (r & 8) {
      const [i, o] = new P("u64").decode(e, n);
      n = o, s.push({ type: 8, data: i });
    }
    return [s, n];
  }
}, At = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(At || {}), vc = class extends _t {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.from)), t.push(new J().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), t.push(new P("u64").encode(e.gas)), t.push(new P("u64").encode(e.param1)), t.push(new P("u64").encode(e.param2)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    [r, n] = new P("u64").decode(e, n);
    const f = r;
    [r, n] = new P("u64").decode(e, n);
    const g = r;
    [r, n] = new P("u64").decode(e, n);
    const E = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        gas: u,
        param1: f,
        param2: g,
        pc: E,
        is: r
      },
      n
    ];
  }
}, Cc = class extends _t {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.id)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    return [r, n] = new P("u64").decode(e, n), [
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
}, Bc = class extends _t {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.id)), t.push(new P("u64").encode(e.ptr)), t.push(new P("u64").encode(e.len)), t.push(new J().encode(e.digest)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: a,
        pc: u,
        is: r
      },
      n
    ];
  }
}, xc = class extends _t {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.id)), t.push(new P("u64").encode(e.reason)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), t.push(new J().encode(e.contractId)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    return [r, n] = new J().decode(e, n), [
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
}, Rc = class extends _t {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.id)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    return [r, n] = new P("u64").decode(e, n), [
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
}, Sc = class extends _t {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.id)), t.push(new P("u64").encode(e.val0)), t.push(new P("u64").encode(e.val1)), t.push(new P("u64").encode(e.val2)), t.push(new P("u64").encode(e.val3)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    [r, n] = new P("u64").decode(e, n);
    const f = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: a,
        val3: u,
        pc: f,
        is: r
      },
      n
    ];
  }
}, Nc = class extends _t {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.id)), t.push(new P("u64").encode(e.val0)), t.push(new P("u64").encode(e.val1)), t.push(new P("u64").encode(e.ptr)), t.push(new P("u64").encode(e.len)), t.push(new J().encode(e.digest)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    [r, n] = new J().decode(e, n);
    const f = r;
    [r, n] = new P("u64").decode(e, n);
    const g = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: a,
        len: u,
        digest: f,
        pc: g,
        is: r
      },
      n
    ];
  }
}, Tc = class extends _t {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.from)), t.push(new J().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 7,
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
}, Dc = class extends _t {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.from)), t.push(new J().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.assetId)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 8,
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
}, Qc = class extends _t {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new P("u64").encode(e.result)), t.push(new P("u64").encode(e.gasUsed)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new P("u64").decode(e, n);
    const s = r;
    return [r, n] = new P("u64").decode(e, n), [
      {
        type: 9,
        result: s,
        gasUsed: r
      },
      n
    ];
  }
}, Eo = class extends _t {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  /**
   * @deprecated `ReceiptMessageOutCoder.getMessageId` is deprecated and will be removed in future versions.
   * Use the static method `InputMessageCoder.getMessageId` instead.
   */
  static getMessageId(e) {
    const t = [];
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new St(32).encode(e.nonce)), t.push(new P("u64").encode(e.amount)), t.push($(e.data || "0x")), Ce(ut(t));
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.sender)), t.push(new J().encode(e.recipient)), t.push(new P("u64").encode(e.amount)), t.push(new J().encode(e.nonce)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new J().encode(e.digest)), t.push(new St(e.data.length).encode(e.data)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new J().decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new J().decode(e, n);
    const f = r;
    [r, n] = new St(u).decode(e, n);
    const g = $(r), E = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: a,
      digest: f,
      data: g
    };
    return E.messageId = Eo.getMessageId(E), [E, n];
  }
}, Xn = (e, t) => {
  const r = $(e), n = $(t);
  return Ce(ut([r, n]));
}, NC = (e, t) => ({
  bits: Xn(e, t)
}), Vs = class extends _t {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  /**
   * @deprecated `ReceiptMintCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return Xn(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.subId)), t.push(new J().encode(e.contractId)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r, f = Vs.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: u,
      assetId: f
    }, n];
  }
}, Fc = class extends _t {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  /**
   * @deprecated `ReceiptBurnCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return Xn(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.subId)), t.push(new J().encode(e.contractId)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r, f = Vs.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: u,
      assetId: f
    }, n];
  }
}, TC = class extends _t {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(new vc().encode(e));
        break;
      }
      case 1: {
        t.push(new Cc().encode(e));
        break;
      }
      case 2: {
        t.push(new Bc().encode(e));
        break;
      }
      case 3: {
        t.push(new xc().encode(e));
        break;
      }
      case 4: {
        t.push(new Rc().encode(e));
        break;
      }
      case 5: {
        t.push(new Sc().encode(e));
        break;
      }
      case 6: {
        t.push(new Nc().encode(e));
        break;
      }
      case 7: {
        t.push(new Tc().encode(e));
        break;
      }
      case 8: {
        t.push(new Dc().encode(e));
        break;
      }
      case 9: {
        t.push(new Qc().encode(e));
        break;
      }
      case 10: {
        t.push(new Eo().encode(e));
        break;
      }
      case 11: {
        t.push(new Vs().encode(e));
        break;
      }
      case 12: {
        t.push(new Fc().encode(e));
        break;
      }
      default:
        throw new x(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${r}`);
    }
    return ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new vc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Cc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Bc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new xc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Rc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new Sc().decode(e, n), [r, n];
      case 6:
        return [r, n] = new Nc().decode(e, n), [r, n];
      case 7:
        return [r, n] = new Tc().decode(e, n), [r, n];
      case 8:
        return [r, n] = new Dc().decode(e, n), [r, n];
      case 9:
        return [r, n] = new Qc().decode(e, n), [r, n];
      case 10:
        return [r, n] = new Eo().decode(e, n), [r, n];
      case 11:
        return [r, n] = new Vs().decode(e, n), [r, n];
      case 12:
        return [r, n] = new Fc().decode(e, n), [r, n];
      default:
        throw new x(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Mc = class extends li {
  constructor() {
    super("StorageSlot", {
      key: new J(),
      value: new J()
    });
  }
}, Pe = /* @__PURE__ */ ((e) => (e[e.ConsensusParameters = 0] = "ConsensusParameters", e[e.StateTransition = 1] = "StateTransition", e))(Pe || {}), Oc = class extends _t {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: r } = e;
    switch (t.push(new rt("u8", { padToWordSize: !0 }).encode(r)), r) {
      case 0: {
        const n = e.data;
        t.push(new rt("u16", { padToWordSize: !0 }).encode(n.witnessIndex)), t.push(new J().encode(n.checksum));
        break;
      }
      case 1: {
        const n = e.data;
        t.push(new J().encode(n.bytecodeRoot));
        break;
      }
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return ut(t);
  }
  decode(e, t) {
    let r = t, n;
    [n, r] = new rt("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0: {
        [n, r] = new rt("u16", { padToWordSize: !0 }).decode(e, r);
        const i = n;
        return [n, r] = new J().decode(e, r), [{ type: s, data: { witnessIndex: i, checksum: n } }, r];
      }
      case 1:
        return [n, r] = new J().decode(e, r), [{ type: s, data: { bytecodeRoot: n } }, r];
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, sr = class extends _t {
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
    return t.push(new rt("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new St(e.dataLength).encode(e.data)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    return [r, n] = new St(s).decode(e, n), [
      {
        dataLength: s,
        data: r
      },
      n
    ];
  }
}, Bt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e[e.Blob = 5] = "Blob", e))(Bt || {}), Lc = class extends _t {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new P("u64").encode(e.scriptGasLimit)), t.push(new J().encode(e.receiptsRoot)), t.push(new P("u64").encode(e.scriptLength)), t.push(new P("u64").encode(e.scriptDataLength)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new St(e.scriptLength.toNumber()).encode(e.script)), t.push(new St(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new nr().encode(e.policies)), t.push(new bt(new er(), e.inputsCount).encode(e.inputs)), t.push(new bt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new sr(), e.witnessesCount).encode(e.witnesses)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new P("u64").decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const E = r;
    [r, n] = new St(o.toNumber()).decode(e, n);
    const C = r;
    [r, n] = new St(a.toNumber()).decode(e, n);
    const S = r;
    [r, n] = new nr().decode(e, n, u);
    const Q = r;
    [r, n] = new bt(new er(), f).decode(e, n);
    const N = r;
    [r, n] = new bt(new rr(), g).decode(e, n);
    const T = r;
    return [r, n] = new bt(new sr(), E).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: a,
        policyTypes: u,
        inputsCount: f,
        outputsCount: g,
        witnessesCount: E,
        receiptsRoot: i,
        script: C,
        scriptData: S,
        policies: Q,
        inputs: N,
        outputs: T,
        witnesses: r
      },
      n
    ];
  }
}, kc = class extends _t {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new rt("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new J().encode(e.salt)), t.push(new P("u64").encode(e.storageSlotsCount)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new bt(new Mc(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new nr().encode(e.policies)), t.push(new bt(new er(), e.inputsCount).encode(e.inputs)), t.push(new bt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new sr(), e.witnessesCount).encode(e.witnesses)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new J().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new bt(new Mc(), o.toNumber()).decode(
      e,
      n
    );
    const E = r;
    [r, n] = new nr().decode(e, n, a);
    const C = r;
    [r, n] = new bt(new er(), u).decode(e, n);
    const S = r;
    [r, n] = new bt(new rr(), f).decode(e, n);
    const Q = r;
    return [r, n] = new bt(new sr(), g).decode(e, n), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: a,
        storageSlotsCount: o,
        inputsCount: u,
        outputsCount: f,
        witnessesCount: g,
        salt: i,
        policies: C,
        storageSlots: E,
        inputs: S,
        outputs: Q,
        witnesses: r
      },
      n
    ];
  }
}, Pc = class extends _t {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Vr().encode(e.txPointer)), t.push(new Hs().encode(e.inputContract)), t.push(new Ys().encode(e.outputContract)), t.push(new P("u64").encode(e.mintAmount)), t.push(new J().encode(e.mintAssetId)), t.push(new P("u64").encode(e.gasPrice)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Vr().decode(e, n);
    const s = r;
    [r, n] = new Hs().decode(e, n);
    const i = r;
    [r, n] = new Ys().decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new J().decode(e, n);
    const u = r;
    return [r, n] = new P("u64").decode(e, n), [
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
}, Uc = class extends _t {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Oc().encode(e.upgradePurpose)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new nr().encode(e.policies)), t.push(new bt(new er(), e.inputsCount).encode(e.inputs)), t.push(new bt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new sr(), e.witnessesCount).encode(e.witnesses)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Oc().decode(e, n);
    const s = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new nr().decode(e, n, i);
    const f = r;
    [r, n] = new bt(new er(), o).decode(e, n);
    const g = r;
    [r, n] = new bt(new rr(), a).decode(e, n);
    const E = r;
    return [r, n] = new bt(new sr(), u).decode(e, n), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: a,
        witnessesCount: u,
        policies: f,
        inputs: g,
        outputs: E,
        witnesses: r
      },
      n
    ];
  }
}, zc = class extends _t {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.root)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new bt(new J(), e.proofSetCount).encode(e.proofSet)), t.push(new nr().encode(e.policies)), t.push(new bt(new er(), e.inputsCount).encode(e.inputs)), t.push(new bt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new sr(), e.witnessesCount).encode(e.witnesses)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const E = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const C = r;
    [r, n] = new bt(new J(), u).decode(e, n);
    const S = r;
    [r, n] = new nr().decode(e, n, f);
    const Q = r;
    [r, n] = new bt(new er(), g).decode(e, n);
    const N = r;
    [r, n] = new bt(new rr(), E).decode(e, n);
    const T = r;
    return [r, n] = new bt(new sr(), C).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: a,
        proofSetCount: u,
        policyTypes: f,
        inputsCount: g,
        outputsCount: E,
        witnessesCount: C,
        proofSet: S,
        policies: Q,
        inputs: N,
        outputs: T,
        witnesses: r
      },
      n
    ];
  }
}, Gc = class extends _t {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new J().encode(e.blobId)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new nr().encode(e.policies)), t.push(new bt(new er(), e.inputsCount).encode(e.inputs)), t.push(new bt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new sr(), e.witnessesCount).encode(e.witnesses)), ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new J().decode(e, n);
    const s = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const f = r;
    [r, n] = new nr().decode(e, n, o);
    const g = r;
    [r, n] = new bt(new er(), a).decode(e, n);
    const E = r;
    [r, n] = new bt(new rr(), u).decode(e, n);
    const C = r;
    return [r, n] = new bt(new sr(), f).decode(e, n), [
      {
        type: 5,
        blobId: s,
        witnessIndex: i,
        policyTypes: o,
        inputsCount: a,
        outputsCount: u,
        witnessesCount: f,
        policies: g,
        inputs: E,
        outputs: C,
        witnesses: r
      },
      n
    ];
  }
}, lr = class extends _t {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new Lc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new kc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Pc().encode(e));
        break;
      }
      case 3: {
        t.push(
          new Uc().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new zc().encode(e)
        );
        break;
      }
      case 5: {
        t.push(new Gc().encode(e));
        break;
      }
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return ut(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Lc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new kc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Pc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Uc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new zc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new Gc().decode(e, n), [r, n];
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, DC = class extends li {
  constructor() {
    super("UtxoId", {
      transactionId: new J(),
      outputIndex: new rt("u16", { padToWordSize: !0 })
    });
  }
};
function fA(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function s0(e) {
  return function t(r) {
    return arguments.length === 0 || fA(r) ? t : e.apply(this, arguments);
  };
}
var AA = /* @__PURE__ */ s0(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function pA(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function i0(e, t, r) {
  if (r || (r = new wA()), gA(e))
    return e;
  var n = function(i) {
    var o = r.get(e);
    if (o)
      return o;
    r.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = i0(e[a], !0, r));
    return i;
  };
  switch (AA(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return pA(e);
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
function gA(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var wA = /* @__PURE__ */ function() {
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
}(), Be = /* @__PURE__ */ s0(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : i0(t);
});
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const wa = /* @__PURE__ */ BigInt(0), fi = /* @__PURE__ */ BigInt(1), mA = /* @__PURE__ */ BigInt(2);
function Zr(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function ss(e) {
  if (!Zr(e))
    throw new Error("Uint8Array expected");
}
function wn(e, t) {
  if (typeof t != "boolean")
    throw new Error(`${e} must be valid boolean, got "${t}".`);
}
const yA = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function mn(e) {
  ss(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += yA[e[r]];
  return t;
}
function sn(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function ma(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const or = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Wc(e) {
  if (e >= or._0 && e <= or._9)
    return e - or._0;
  if (e >= or._A && e <= or._F)
    return e - (or._A - 10);
  if (e >= or._a && e <= or._f)
    return e - (or._a - 10);
}
function yn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, r = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(r);
  for (let s = 0, i = 0; s < r; s++, i += 2) {
    const o = Wc(e.charCodeAt(i)), a = Wc(e.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const u = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + u + '" at index ' + i);
    }
    n[s] = o * 16 + a;
  }
  return n;
}
function Hr(e) {
  return ma(mn(e));
}
function ya(e) {
  return ss(e), ma(mn(Uint8Array.from(e).reverse()));
}
function bn(e, t) {
  return yn(e.toString(16).padStart(t * 2, "0"));
}
function ba(e, t) {
  return bn(e, t).reverse();
}
function bA(e) {
  return yn(sn(e));
}
function Ve(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = yn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Zr(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = n.length;
  if (typeof r == "number" && s !== r)
    throw new Error(`${e} expected ${r} bytes, got ${s}`);
  return n;
}
function Hn(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    ss(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
function o0(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function IA(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const qi = (e) => typeof e == "bigint" && wa <= e;
function Ai(e, t, r) {
  return qi(e) && qi(t) && qi(r) && t <= e && e < r;
}
function Yr(e, t, r, n) {
  if (!Ai(t, r, n))
    throw new Error(`expected valid ${e}: ${r} <= n < ${n}, got ${typeof t} ${t}`);
}
function a0(e) {
  let t;
  for (t = 0; e > wa; e >>= fi, t += 1)
    ;
  return t;
}
function EA(e, t) {
  return e >> BigInt(t) & fi;
}
function vA(e, t, r) {
  return e | (r ? fi : wa) << BigInt(t);
}
const Ia = (e) => (mA << BigInt(e - 1)) - fi, ji = (e) => new Uint8Array(e), Xc = (e) => Uint8Array.from(e);
function c0(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = ji(e), s = ji(e), i = 0;
  const o = () => {
    n.fill(1), s.fill(0), i = 0;
  }, a = (...E) => r(s, n, ...E), u = (E = ji()) => {
    s = a(Xc([0]), E), n = a(), E.length !== 0 && (s = a(Xc([1]), E), n = a());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let E = 0;
    const C = [];
    for (; E < t; ) {
      n = a();
      const S = n.slice();
      C.push(S), E += n.length;
    }
    return Hn(...C);
  };
  return (E, C) => {
    o(), u(E);
    let S;
    for (; !(S = C(f())); )
      u();
    return o(), S;
  };
}
const CA = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Zr(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function is(e, t, r = {}) {
  const n = (s, i, o) => {
    const a = CA[i];
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
const BA = () => {
  throw new Error("not implemented");
};
function vo(e) {
  const t = /* @__PURE__ */ new WeakMap();
  return (r, ...n) => {
    const s = t.get(r);
    if (s !== void 0)
      return s;
    const i = e(r, ...n);
    return t.set(r, i), i;
  };
}
const xA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: Yr,
  abool: wn,
  abytes: ss,
  bitGet: EA,
  bitLen: a0,
  bitMask: Ia,
  bitSet: vA,
  bytesToHex: mn,
  bytesToNumberBE: Hr,
  bytesToNumberLE: ya,
  concatBytes: Hn,
  createHmacDrbg: c0,
  ensureBytes: Ve,
  equalBytes: o0,
  hexToBytes: yn,
  hexToNumber: ma,
  inRange: Ai,
  isBytes: Zr,
  memoized: vo,
  notImplemented: BA,
  numberToBytesBE: bn,
  numberToBytesLE: ba,
  numberToHexUnpadded: sn,
  numberToVarBytesBE: bA,
  utf8ToBytes: IA,
  validateObject: is
}, Symbol.toStringTag, { value: "Module" }));
var $i = {}, Co = { exports: {} };
(function(e, t) {
  var r = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Rt < "u" && Rt, n = function() {
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
      function f(_) {
        return _ && DataView.prototype.isPrototypeOf(_);
      }
      if (u.arrayBuffer)
        var g = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], E = ArrayBuffer.isView || function(_) {
          return _ && g.indexOf(Object.prototype.toString.call(_)) > -1;
        };
      function C(_) {
        if (typeof _ != "string" && (_ = String(_)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(_) || _ === "")
          throw new TypeError('Invalid character in header field name: "' + _ + '"');
        return _.toLowerCase();
      }
      function S(_) {
        return typeof _ != "string" && (_ = String(_)), _;
      }
      function Q(_) {
        var A = {
          next: function() {
            var m = _.shift();
            return { done: m === void 0, value: m };
          }
        };
        return u.iterable && (A[Symbol.iterator] = function() {
          return A;
        }), A;
      }
      function N(_) {
        this.map = {}, _ instanceof N ? _.forEach(function(A, m) {
          this.append(m, A);
        }, this) : Array.isArray(_) ? _.forEach(function(A) {
          this.append(A[0], A[1]);
        }, this) : _ && Object.getOwnPropertyNames(_).forEach(function(A) {
          this.append(A, _[A]);
        }, this);
      }
      N.prototype.append = function(_, A) {
        _ = C(_), A = S(A);
        var m = this.map[_];
        this.map[_] = m ? m + ", " + A : A;
      }, N.prototype.delete = function(_) {
        delete this.map[C(_)];
      }, N.prototype.get = function(_) {
        return _ = C(_), this.has(_) ? this.map[_] : null;
      }, N.prototype.has = function(_) {
        return this.map.hasOwnProperty(C(_));
      }, N.prototype.set = function(_, A) {
        this.map[C(_)] = S(A);
      }, N.prototype.forEach = function(_, A) {
        for (var m in this.map)
          this.map.hasOwnProperty(m) && _.call(A, this.map[m], m, this);
      }, N.prototype.keys = function() {
        var _ = [];
        return this.forEach(function(A, m) {
          _.push(m);
        }), Q(_);
      }, N.prototype.values = function() {
        var _ = [];
        return this.forEach(function(A) {
          _.push(A);
        }), Q(_);
      }, N.prototype.entries = function() {
        var _ = [];
        return this.forEach(function(A, m) {
          _.push([m, A]);
        }), Q(_);
      }, u.iterable && (N.prototype[Symbol.iterator] = N.prototype.entries);
      function T(_) {
        if (_.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        _.bodyUsed = !0;
      }
      function M(_) {
        return new Promise(function(A, m) {
          _.onload = function() {
            A(_.result);
          }, _.onerror = function() {
            m(_.error);
          };
        });
      }
      function H(_) {
        var A = new FileReader(), m = M(A);
        return A.readAsArrayBuffer(_), m;
      }
      function G(_) {
        var A = new FileReader(), m = M(A);
        return A.readAsText(_), m;
      }
      function Y(_) {
        for (var A = new Uint8Array(_), m = new Array(A.length), p = 0; p < A.length; p++)
          m[p] = String.fromCharCode(A[p]);
        return m.join("");
      }
      function O(_) {
        if (_.slice)
          return _.slice(0);
        var A = new Uint8Array(_.byteLength);
        return A.set(new Uint8Array(_)), A.buffer;
      }
      function L() {
        return this.bodyUsed = !1, this._initBody = function(_) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && f(_) ? (this._bodyArrayBuffer = O(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || E(_)) ? this._bodyArrayBuffer = O(_) : this._bodyText = _ = Object.prototype.toString.call(_) : this._bodyText = "", this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, u.blob && (this.blob = function() {
          var _ = T(this);
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
            var _ = T(this);
            return _ || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(H);
        }), this.text = function() {
          var _ = T(this);
          if (_)
            return _;
          if (this._bodyBlob)
            return G(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(Y(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, u.formData && (this.formData = function() {
          return this.text().then(j);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var z = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function U(_) {
        var A = _.toUpperCase();
        return z.indexOf(A) > -1 ? A : _;
      }
      function k(_, A) {
        if (!(this instanceof k))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        A = A || {};
        var m = A.body;
        if (_ instanceof k) {
          if (_.bodyUsed)
            throw new TypeError("Already read");
          this.url = _.url, this.credentials = _.credentials, A.headers || (this.headers = new N(_.headers)), this.method = _.method, this.mode = _.mode, this.signal = _.signal, !m && _._bodyInit != null && (m = _._bodyInit, _.bodyUsed = !0);
        } else
          this.url = String(_);
        if (this.credentials = A.credentials || this.credentials || "same-origin", (A.headers || !this.headers) && (this.headers = new N(A.headers)), this.method = U(A.method || this.method || "GET"), this.mode = A.mode || this.mode || null, this.signal = A.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (A.cache === "no-store" || A.cache === "no-cache")) {
          var p = /([?&])_=[^&]*/;
          if (p.test(this.url))
            this.url = this.url.replace(p, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var I = /\?/;
            this.url += (I.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      k.prototype.clone = function() {
        return new k(this, { body: this._bodyInit });
      };
      function j(_) {
        var A = new FormData();
        return _.trim().split("&").forEach(function(m) {
          if (m) {
            var p = m.split("="), I = p.shift().replace(/\+/g, " "), v = p.join("=").replace(/\+/g, " ");
            A.append(decodeURIComponent(I), decodeURIComponent(v));
          }
        }), A;
      }
      function V(_) {
        var A = new N(), m = _.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(p) {
          return p.indexOf(`
`) === 0 ? p.substr(1, p.length) : p;
        }).forEach(function(p) {
          var I = p.split(":"), v = I.shift().trim();
          if (v) {
            var w = I.join(":").trim();
            A.append(v, w);
          }
        }), A;
      }
      L.call(k.prototype);
      function tt(_, A) {
        if (!(this instanceof tt))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        A || (A = {}), this.type = "default", this.status = A.status === void 0 ? 200 : A.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = A.statusText === void 0 ? "" : "" + A.statusText, this.headers = new N(A.headers), this.url = A.url || "", this._initBody(_);
      }
      L.call(tt.prototype), tt.prototype.clone = function() {
        return new tt(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new N(this.headers),
          url: this.url
        });
      }, tt.error = function() {
        var _ = new tt(null, { status: 0, statusText: "" });
        return _.type = "error", _;
      };
      var B = [301, 302, 303, 307, 308];
      tt.redirect = function(_, A) {
        if (B.indexOf(A) === -1)
          throw new RangeError("Invalid status code");
        return new tt(null, { status: A, headers: { location: _ } });
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(A, m) {
          this.message = A, this.name = m;
          var p = Error(A);
          this.stack = p.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function d(_, A) {
        return new Promise(function(m, p) {
          var I = new k(_, A);
          if (I.signal && I.signal.aborted)
            return p(new o.DOMException("Aborted", "AbortError"));
          var v = new XMLHttpRequest();
          function w() {
            v.abort();
          }
          v.onload = function() {
            var b = {
              status: v.status,
              statusText: v.statusText,
              headers: V(v.getAllResponseHeaders() || "")
            };
            b.url = "responseURL" in v ? v.responseURL : b.headers.get("X-Request-URL");
            var q = "response" in v ? v.response : v.responseText;
            setTimeout(function() {
              m(new tt(q, b));
            }, 0);
          }, v.onerror = function() {
            setTimeout(function() {
              p(new TypeError("Network request failed"));
            }, 0);
          }, v.ontimeout = function() {
            setTimeout(function() {
              p(new TypeError("Network request failed"));
            }, 0);
          }, v.onabort = function() {
            setTimeout(function() {
              p(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function h(b) {
            try {
              return b === "" && a.location.href ? a.location.href : b;
            } catch {
              return b;
            }
          }
          v.open(I.method, h(I.url), !0), I.credentials === "include" ? v.withCredentials = !0 : I.credentials === "omit" && (v.withCredentials = !1), "responseType" in v && (u.blob ? v.responseType = "blob" : u.arrayBuffer && I.headers.get("Content-Type") && I.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (v.responseType = "arraybuffer")), A && typeof A.headers == "object" && !(A.headers instanceof N) ? Object.getOwnPropertyNames(A.headers).forEach(function(b) {
            v.setRequestHeader(b, S(A.headers[b]));
          }) : I.headers.forEach(function(b, q) {
            v.setRequestHeader(q, b);
          }), I.signal && (I.signal.addEventListener("abort", w), v.onreadystatechange = function() {
            v.readyState === 4 && I.signal.removeEventListener("abort", w);
          }), v.send(typeof I._bodyInit > "u" ? null : I._bodyInit);
        });
      }
      return d.polyfill = !0, a.fetch || (a.fetch = d, a.Headers = N, a.Request = k, a.Response = tt), o.Headers = N, o.Request = k, o.Response = tt, o.fetch = d, o;
    })({});
  })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
  var s = r.fetch ? r : n;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Co, Co.exports);
var RA = Co.exports;
function SA(e) {
  return typeof e == "object" && e !== null;
}
function NA(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const TA = /\r\n|[\n\r]/g;
function Bo(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(TA)) {
    if (typeof s.index == "number" || NA(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function DA(e) {
  return d0(
    e.source,
    Bo(e.source, e.start)
  );
}
function d0(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? r : 0, u = t.column + a, f = `${e.name}:${o}:${u}
`, g = n.split(/\r\n|[\n\r]/g), E = g[s];
  if (E.length > 120) {
    const C = Math.floor(u / 80), S = u % 80, Q = [];
    for (let N = 0; N < E.length; N += 80)
      Q.push(E.slice(N, N + 80));
    return f + Hc([
      [`${o} |`, Q[0]],
      ...Q.slice(1, C + 1).map((N) => ["|", N]),
      ["|", "^".padStart(S)],
      ["|", Q[C + 1]]
    ]);
  }
  return f + Hc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, g[s - 1]],
    [`${o} |`, E],
    ["|", "^".padStart(u)],
    [`${o + 1} |`, g[s + 1]]
  ]);
}
function Hc(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function QA(e) {
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
class Ea extends Error {
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
    const { nodes: o, source: a, positions: u, path: f, originalError: g, extensions: E } = QA(r);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = g ?? void 0, this.nodes = Yc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = Yc(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((Q) => Q.loc).filter((Q) => Q != null)
    );
    this.source = a ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = u ?? (C == null ? void 0 : C.map((Q) => Q.start)), this.locations = u && a ? u.map((Q) => Bo(a, Q)) : C == null ? void 0 : C.map((Q) => Bo(Q.source, Q.start));
    const S = SA(
      g == null ? void 0 : g.extensions
    ) ? g == null ? void 0 : g.extensions : void 0;
    this.extensions = (i = E ?? S) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), g != null && g.stack ? Object.defineProperty(this, "stack", {
      value: g.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Ea) : Object.defineProperty(this, "stack", {
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

` + DA(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + d0(this.source, r);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Yc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function be(e, t, r) {
  return new Ea(`Syntax Error: ${r}`, {
    source: e,
    positions: [t]
  });
}
class FA {
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
class u0 {
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
const _0 = {
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
}, MA = new Set(Object.keys(_0));
function Vc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && MA.has(t);
}
var on;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(on || (on = {}));
var xo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(xo || (xo = {}));
var lt;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(lt || (lt = {}));
function Ro(e) {
  return e === 9 || e === 32;
}
function Yn(e) {
  return e >= 48 && e <= 57;
}
function h0(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function l0(e) {
  return h0(e) || e === 95;
}
function OA(e) {
  return h0(e) || Yn(e) || e === 95;
}
function LA(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], u = kA(a);
    u !== a.length && (n = (i = n) !== null && i !== void 0 ? i : o, s = o, o !== 0 && u < r && (r = u));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function kA(e) {
  let t = 0;
  for (; t < e.length && Ro(e.charCodeAt(t)); )
    ++t;
  return t;
}
function PA(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((S) => S.length === 0 || Ro(S.charCodeAt(0))), o = r.endsWith('\\"""'), a = e.endsWith('"') && !o, u = e.endsWith("\\"), f = a || u, g = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || f || i || o
  );
  let E = "";
  const C = s && Ro(e.charCodeAt(0));
  return (g && !C || i) && (E += `
`), E += r, (g || f) && (E += `
`), '"""' + E + '"""';
}
var X;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(X || (X = {}));
class UA {
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
    const r = new u0(X.SOF, 0, 0, 0, 0);
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
    if (t.kind !== X.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const r = GA(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === X.COMMENT);
    return t;
  }
}
function zA(e) {
  return e === X.BANG || e === X.DOLLAR || e === X.AMP || e === X.PAREN_L || e === X.PAREN_R || e === X.SPREAD || e === X.COLON || e === X.EQUALS || e === X.AT || e === X.BRACKET_L || e === X.BRACKET_R || e === X.BRACE_L || e === X.PIPE || e === X.BRACE_R;
}
function vn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function pi(e, t) {
  return f0(e.charCodeAt(t)) && A0(e.charCodeAt(t + 1));
}
function f0(e) {
  return e >= 55296 && e <= 56319;
}
function A0(e) {
  return e >= 56320 && e <= 57343;
}
function Jr(e, t) {
  const r = e.source.body.codePointAt(t);
  if (r === void 0)
    return X.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function me(e, t, r, n, s) {
  const i = e.line, o = 1 + r - e.lineStart;
  return new u0(t, r, n, i, o, s);
}
function GA(e, t) {
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
        return WA(e, s);
      case 33:
        return me(e, X.BANG, s, s + 1);
      case 36:
        return me(e, X.DOLLAR, s, s + 1);
      case 38:
        return me(e, X.AMP, s, s + 1);
      case 40:
        return me(e, X.PAREN_L, s, s + 1);
      case 41:
        return me(e, X.PAREN_R, s, s + 1);
      case 46:
        if (r.charCodeAt(s + 1) === 46 && r.charCodeAt(s + 2) === 46)
          return me(e, X.SPREAD, s, s + 3);
        break;
      case 58:
        return me(e, X.COLON, s, s + 1);
      case 61:
        return me(e, X.EQUALS, s, s + 1);
      case 64:
        return me(e, X.AT, s, s + 1);
      case 91:
        return me(e, X.BRACKET_L, s, s + 1);
      case 93:
        return me(e, X.BRACKET_R, s, s + 1);
      case 123:
        return me(e, X.BRACE_L, s, s + 1);
      case 124:
        return me(e, X.PIPE, s, s + 1);
      case 125:
        return me(e, X.BRACE_R, s, s + 1);
      case 34:
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? JA(e, s) : HA(e, s);
    }
    if (Yn(i) || i === 45)
      return XA(e, s, i);
    if (l0(i))
      return qA(e, s);
    throw be(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : vn(i) || pi(r, s) ? `Unexpected character: ${Jr(e, s)}.` : `Invalid character: ${Jr(e, s)}.`
    );
  }
  return me(e, X.EOF, n, n);
}
function WA(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (vn(i))
      ++s;
    else if (pi(r, s))
      s += 2;
    else
      break;
  }
  return me(
    e,
    X.COMMENT,
    t,
    s,
    r.slice(t + 1, s)
  );
}
function XA(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, o = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), Yn(i))
      throw be(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Jr(
          e,
          s
        )}.`
      );
  } else
    s = Ki(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (o = !0, i = n.charCodeAt(++s), s = Ki(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = Ki(e, s, i), i = n.charCodeAt(s)), i === 46 || l0(i))
    throw be(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Jr(
        e,
        s
      )}.`
    );
  return me(
    e,
    o ? X.FLOAT : X.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function Ki(e, t, r) {
  if (!Yn(r))
    throw be(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Jr(
        e,
        t
      )}.`
    );
  const n = e.source.body;
  let s = t + 1;
  for (; Yn(n.charCodeAt(s)); )
    ++s;
  return s;
}
function HA(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, o = "";
  for (; s < n; ) {
    const a = r.charCodeAt(s);
    if (a === 34)
      return o += r.slice(i, s), me(e, X.STRING, t, s + 1, o);
    if (a === 92) {
      o += r.slice(i, s);
      const u = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? YA(e, s) : VA(e, s) : ZA(e, s);
      o += u.value, s += u.size, i = s;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (vn(a))
      ++s;
    else if (pi(r, s))
      s += 2;
    else
      throw be(
        e.source,
        s,
        `Invalid character within String: ${Jr(
          e,
          s
        )}.`
      );
  }
  throw be(e.source, s, "Unterminated string.");
}
function YA(e, t) {
  const r = e.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = r.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !vn(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Ln(i), n < 0)
      break;
  }
  throw be(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(
      t,
      t + s
    )}".`
  );
}
function VA(e, t) {
  const r = e.source.body, n = Zc(r, t + 2);
  if (vn(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (f0(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = Zc(r, t + 8);
    if (A0(s))
      return {
        value: String.fromCodePoint(n, s),
        size: 12
      };
  }
  throw be(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${r.slice(t, t + 6)}".`
  );
}
function Zc(e, t) {
  return Ln(e.charCodeAt(t)) << 12 | Ln(e.charCodeAt(t + 1)) << 8 | Ln(e.charCodeAt(t + 2)) << 4 | Ln(e.charCodeAt(t + 3));
}
function Ln(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function ZA(e, t) {
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
  throw be(
    e.source,
    t,
    `Invalid character escape sequence: "${r.slice(
      t,
      t + 2
    )}".`
  );
}
function JA(e, t) {
  const r = e.source.body, n = r.length;
  let s = e.lineStart, i = t + 3, o = i, a = "";
  const u = [];
  for (; i < n; ) {
    const f = r.charCodeAt(i);
    if (f === 34 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34) {
      a += r.slice(o, i), u.push(a);
      const g = me(
        e,
        X.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        LA(u).join(`
`)
      );
      return e.line += u.length - 1, e.lineStart = s, g;
    }
    if (f === 92 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 && r.charCodeAt(i + 3) === 34) {
      a += r.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (f === 10 || f === 13) {
      a += r.slice(o, i), u.push(a), f === 13 && r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, a = "", o = i, s = i;
      continue;
    }
    if (vn(f))
      ++i;
    else if (pi(r, i))
      i += 2;
    else
      throw be(
        e.source,
        i,
        `Invalid character within String: ${Jr(
          e,
          i
        )}.`
      );
  }
  throw be(e.source, i, "Unterminated string.");
}
function qA(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (OA(i))
      ++s;
    else
      break;
  }
  return me(
    e,
    X.NAME,
    t,
    s,
    r.slice(t, s)
  );
}
function Ts(e, t) {
  if (!!!e)
    throw new Error(t);
}
const jA = 10, p0 = 2;
function va(e) {
  return gi(e, []);
}
function gi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return $A(e, t);
    default:
      return String(e);
  }
}
function $A(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if (KA(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : gi(n, r);
  } else if (Array.isArray(e))
    return ep(e, r);
  return tp(e, r);
}
function KA(e) {
  return typeof e.toJSON == "function";
}
function tp(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > p0 ? "[" + rp(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + gi(i, t)
  ).join(", ") + " }";
}
function ep(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > p0)
    return "[Array]";
  const r = Math.min(jA, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(gi(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function rp(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const np = globalThis.process && // eslint-disable-next-line no-undef
!0, sp = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  np ? function(t, r) {
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
        const o = va(t);
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
class g0 {
  constructor(t, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ts(!1, `Body must be a string. Received: ${va(t)}.`), this.body = t, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || Ts(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Ts(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function ip(e) {
  return sp(e, g0);
}
function w0(e, t) {
  return new os(e, t).parseDocument();
}
function op(e, t) {
  const r = new os(e, t);
  r.expectToken(X.SOF);
  const n = r.parseValueLiteral(!1);
  return r.expectToken(X.EOF), n;
}
function ap(e, t) {
  const r = new os(e, t);
  r.expectToken(X.SOF);
  const n = r.parseConstValueLiteral();
  return r.expectToken(X.EOF), n;
}
function cp(e, t) {
  const r = new os(e, t);
  r.expectToken(X.SOF);
  const n = r.parseTypeReference();
  return r.expectToken(X.EOF), n;
}
class os {
  constructor(t, r = {}) {
    const n = ip(t) ? t : new g0(t);
    this._lexer = new UA(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(X.NAME);
    return this.node(t, {
      kind: lt.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: lt.DOCUMENT,
      definitions: this.many(
        X.SOF,
        this.parseDefinition,
        X.EOF
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
    if (this.peek(X.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), r = t ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === X.NAME) {
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
        throw be(
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
    if (this.peek(X.BRACE_L))
      return this.node(t, {
        kind: lt.OPERATION_DEFINITION,
        operation: on.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(X.NAME) && (n = this.parseName()), this.node(t, {
      kind: lt.OPERATION_DEFINITION,
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
    const t = this.expectToken(X.NAME);
    switch (t.value) {
      case "query":
        return on.QUERY;
      case "mutation":
        return on.MUTATION;
      case "subscription":
        return on.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      X.PAREN_L,
      this.parseVariableDefinition,
      X.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: lt.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(X.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(X.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(X.DOLLAR), this.node(t, {
      kind: lt.VARIABLE,
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
      kind: lt.SELECTION_SET,
      selections: this.many(
        X.BRACE_L,
        this.parseSelection,
        X.BRACE_R
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
    return this.peek(X.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, r = this.parseName();
    let n, s;
    return this.expectOptionalToken(X.COLON) ? (n = r, s = this.parseName()) : s = r, this.node(t, {
      kind: lt.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(X.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const r = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(X.PAREN_L, r, X.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(X.COLON), this.node(r, {
      kind: lt.ARGUMENT,
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
    this.expectToken(X.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(X.NAME) ? this.node(t, {
      kind: lt.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: lt.INLINE_FRAGMENT,
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
      kind: lt.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: lt.FRAGMENT_DEFINITION,
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
      case X.BRACKET_L:
        return this.parseList(t);
      case X.BRACE_L:
        return this.parseObject(t);
      case X.INT:
        return this.advanceLexer(), this.node(r, {
          kind: lt.INT,
          value: r.value
        });
      case X.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: lt.FLOAT,
          value: r.value
        });
      case X.STRING:
      case X.BLOCK_STRING:
        return this.parseStringLiteral();
      case X.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: lt.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: lt.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: lt.NULL
            });
          default:
            return this.node(r, {
              kind: lt.ENUM,
              value: r.value
            });
        }
      case X.DOLLAR:
        if (t)
          if (this.expectToken(X.DOLLAR), this._lexer.token.kind === X.NAME) {
            const n = this._lexer.token.value;
            throw be(
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
      kind: lt.STRING,
      value: t.value,
      block: t.kind === X.BLOCK_STRING
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
      kind: lt.LIST,
      values: this.any(X.BRACKET_L, r, X.BRACKET_R)
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
      kind: lt.OBJECT,
      fields: this.any(X.BRACE_L, r, X.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(X.COLON), this.node(r, {
      kind: lt.OBJECT_FIELD,
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
    for (; this.peek(X.AT); )
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
    return this.expectToken(X.AT), this.node(r, {
      kind: lt.DIRECTIVE,
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
    if (this.expectOptionalToken(X.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(X.BRACKET_R), r = this.node(t, {
        kind: lt.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(X.BANG) ? this.node(t, {
      kind: lt.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: lt.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(X.STRING) || this.peek(X.BLOCK_STRING);
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
      X.BRACE_L,
      this.parseOperationTypeDefinition,
      X.BRACE_R
    );
    return this.node(t, {
      kind: lt.SCHEMA_DEFINITION,
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
    this.expectToken(X.COLON);
    const n = this.parseNamedType();
    return this.node(t, {
      kind: lt.OPERATION_TYPE_DEFINITION,
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
      kind: lt.SCALAR_TYPE_DEFINITION,
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
      kind: lt.OBJECT_TYPE_DEFINITION,
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(X.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      X.BRACE_L,
      this.parseFieldDefinition,
      X.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(X.COLON);
    const i = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(t, {
      kind: lt.FIELD_DEFINITION,
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
      X.PAREN_L,
      this.parseInputValueDef,
      X.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(X.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(X.EQUALS) && (i = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(t, {
      kind: lt.INPUT_VALUE_DEFINITION,
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
      kind: lt.INTERFACE_TYPE_DEFINITION,
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
      kind: lt.UNION_TYPE_DEFINITION,
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
    return this.expectOptionalToken(X.EQUALS) ? this.delimitedMany(X.PIPE, this.parseNamedType) : [];
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
      kind: lt.ENUM_TYPE_DEFINITION,
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
      X.BRACE_L,
      this.parseEnumValueDefinition,
      X.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: lt.ENUM_VALUE_DEFINITION,
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
      throw be(
        this._lexer.source,
        this._lexer.token.start,
        `${bs(
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
      kind: lt.INPUT_OBJECT_TYPE_DEFINITION,
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
      X.BRACE_L,
      this.parseInputValueDef,
      X.BRACE_R
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
    if (t.kind === X.NAME)
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
      X.BRACE_L,
      this.parseOperationTypeDefinition,
      X.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: lt.SCHEMA_EXTENSION,
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
      kind: lt.SCALAR_TYPE_EXTENSION,
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
      kind: lt.OBJECT_TYPE_EXTENSION,
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
      kind: lt.INTERFACE_TYPE_EXTENSION,
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
      kind: lt.UNION_TYPE_EXTENSION,
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
      kind: lt.ENUM_TYPE_EXTENSION,
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
      kind: lt.INPUT_OBJECT_TYPE_EXTENSION,
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
    this.expectKeyword("directive"), this.expectToken(X.AT);
    const n = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(t, {
      kind: lt.DIRECTIVE_DEFINITION,
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
    return this.delimitedMany(X.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(xo, r.value))
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
    return this._options.noLocation !== !0 && (r.loc = new FA(
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
    throw be(
      this._lexer.source,
      r.start,
      `Expected ${m0(t)}, found ${bs(r)}.`
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
    if (r.kind === X.NAME && r.value === t)
      this.advanceLexer();
    else
      throw be(
        this._lexer.source,
        r.start,
        `Expected "${t}", found ${bs(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const r = this._lexer.token;
    return r.kind === X.NAME && r.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const r = t ?? this._lexer.token;
    return be(
      this._lexer.source,
      r.start,
      `Unexpected ${bs(r)}.`
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
    if (t !== void 0 && r.kind !== X.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw be(
        this._lexer.source,
        r.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function bs(e) {
  const t = e.value;
  return m0(e.kind) + (t != null ? ` "${t}"` : "");
}
function m0(e) {
  return zA(e) ? `"${e}"` : e;
}
const dp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: os,
  parse: w0,
  parseConstValue: ap,
  parseType: cp,
  parseValue: op
}, Symbol.toStringTag, { value: "Module" })), up = /* @__PURE__ */ Jo(dp);
function _p(e) {
  return `"${e.replace(hp, lp)}"`;
}
const hp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function lp(e) {
  return fp[e.charCodeAt(0)];
}
const fp = [
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
], Ap = Object.freeze({});
function pp(e, t, r = _0) {
  const n = /* @__PURE__ */ new Map();
  for (const M of Object.values(lt))
    n.set(M, gp(t, M));
  let s, i = Array.isArray(e), o = [e], a = -1, u = [], f = e, g, E;
  const C = [], S = [];
  do {
    a++;
    const M = a === o.length, H = M && u.length !== 0;
    if (M) {
      if (g = S.length === 0 ? void 0 : C[C.length - 1], f = E, E = S.pop(), H)
        if (i) {
          f = f.slice();
          let Y = 0;
          for (const [O, L] of u) {
            const z = O - Y;
            L === null ? (f.splice(z, 1), Y++) : f[z] = L;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [Y, O] of u)
            f[Y] = O;
        }
      a = s.index, o = s.keys, u = s.edits, i = s.inArray, s = s.prev;
    } else if (E) {
      if (g = i ? a : o[a], f = E[g], f == null)
        continue;
      C.push(g);
    }
    let G;
    if (!Array.isArray(f)) {
      var Q, N;
      Vc(f) || Ts(!1, `Invalid AST Node: ${va(f)}.`);
      const Y = M ? (Q = n.get(f.kind)) === null || Q === void 0 ? void 0 : Q.leave : (N = n.get(f.kind)) === null || N === void 0 ? void 0 : N.enter;
      if (G = Y == null ? void 0 : Y.call(t, f, g, E, C, S), G === Ap)
        break;
      if (G === !1) {
        if (!M) {
          C.pop();
          continue;
        }
      } else if (G !== void 0 && (u.push([g, G]), !M))
        if (Vc(G))
          f = G;
        else {
          C.pop();
          continue;
        }
    }
    if (G === void 0 && H && u.push([g, f]), M)
      C.pop();
    else {
      var T;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: u,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (T = r[f.kind]) !== null && T !== void 0 ? T : [], a = -1, u = [], E && S.push(E), E = f;
    }
  } while (s !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function gp(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function y0(e) {
  return pp(e, mp);
}
const wp = 80, mp = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => ct(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = It("(", ct(e.variableDefinitions, ", "), ")"), r = ct(
        [
          e.operation,
          ct([e.name, t]),
          ct(e.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: r, directives: n }) => e + ": " + t + It(" = ", r) + It(" ", ct(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Xe(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = It("", e, ": ") + t;
      let o = i + It("(", ct(r, ", "), ")");
      return o.length > wp && (o = i + It(`(
`, Ds(ct(r, `
`)), `
)`)), ct([o, ct(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + It(" ", ct(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: r }) => ct(
      [
        "...",
        It("on ", e),
        ct(t, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: r, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${It("(", ct(r, ", "), ")")} on ${t} ${It("", ct(n, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? PA(e) : _p(e)
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
    leave: ({ values: e }) => "[" + ct(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + ct(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + It("(", ct(t, ", "), ")")
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
    leave: ({ description: e, directives: t, operationTypes: r }) => It("", e, `
`) + ct(["schema", ct(t, " "), Xe(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: r }) => It("", e, `
`) + ct(["scalar", t, ct(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => It("", e, `
`) + ct(
      [
        "type",
        t,
        It("implements ", ct(r, " & ")),
        ct(n, " "),
        Xe(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: r, type: n, directives: s }) => It("", e, `
`) + t + (Jc(r) ? It(`(
`, Ds(ct(r, `
`)), `
)`) : It("(", ct(r, ", "), ")")) + ": " + n + It(" ", ct(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: r, defaultValue: n, directives: s }) => It("", e, `
`) + ct(
      [t + ": " + r, It("= ", n), ct(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => It("", e, `
`) + ct(
      [
        "interface",
        t,
        It("implements ", ct(r, " & ")),
        ct(n, " "),
        Xe(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, types: n }) => It("", e, `
`) + ct(
      ["union", t, ct(r, " "), It("= ", ct(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, values: n }) => It("", e, `
`) + ct(["enum", t, ct(r, " "), Xe(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => It("", e, `
`) + ct([t, ct(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => It("", e, `
`) + ct(["input", t, ct(r, " "), Xe(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: r, repeatable: n, locations: s }) => It("", e, `
`) + "directive @" + t + (Jc(r) ? It(`(
`, Ds(ct(r, `
`)), `
)`) : It("(", ct(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + ct(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => ct(
      ["extend schema", ct(e, " "), Xe(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => ct(["extend scalar", e, ct(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => ct(
      [
        "extend type",
        e,
        It("implements ", ct(t, " & ")),
        ct(r, " "),
        Xe(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => ct(
      [
        "extend interface",
        e,
        It("implements ", ct(t, " & ")),
        ct(r, " "),
        Xe(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: r }) => ct(
      [
        "extend union",
        e,
        ct(t, " "),
        It("= ", ct(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: r }) => ct(["extend enum", e, ct(t, " "), Xe(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => ct(["extend input", e, ct(t, " "), Xe(r)], " ")
  }
};
function ct(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function Xe(e) {
  return It(`{
`, Ds(ct(e, `
`)), `
}`);
}
function It(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function Ds(e) {
  return It("  ", e.replace(/\n/g, `
  `));
}
function Jc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((r) => r.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: y0
}, Symbol.toStringTag, { value: "Module" })), bp = /* @__PURE__ */ Jo(yp);
var Ca = {}, wi = {}, b0 = function(t) {
  var r = t.uri, n = t.name, s = t.type;
  this.uri = r, this.name = n, this.type = s;
}, Ip = b0, I0 = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Ip;
}, Ep = I0, vp = function e(t, r, n) {
  r === void 0 && (r = ""), n === void 0 && (n = Ep);
  var s, i = /* @__PURE__ */ new Map();
  function o(g, E) {
    var C = i.get(E);
    C ? C.push.apply(C, g) : i.set(E, g);
  }
  if (n(t))
    s = null, o([r], t);
  else {
    var a = r ? r + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(g, E) {
        return o(["" + a + E], g), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(g, E) {
        var C = e(g, "" + a + E, n);
        return C.files.forEach(o), C.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var u in t) {
        var f = e(t[u], "" + a + u, n);
        f.files.forEach(o), s[u] = f.clone;
      }
    } else s = t;
  }
  return {
    clone: s,
    files: i
  };
};
wi.ReactNativeFile = b0;
wi.extractFiles = vp;
wi.isExtractableFile = I0;
var Cp = typeof self == "object" ? self.FormData : window.FormData, as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.defaultJsonSerializer = void 0;
as.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Bp = Rt && Rt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ca, "__esModule", { value: !0 });
var E0 = wi, xp = Bp(Cp), Rp = as, Sp = function(e) {
  return E0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Np(e, t, r, n) {
  n === void 0 && (n = Rp.defaultJsonSerializer);
  var s = E0.extractFiles({ query: e, variables: t, operationName: r }, "", Sp), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return n.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var a = e.reduce(function(C, S, Q) {
      return C.push({ query: S, variables: t ? t[Q] : void 0 }), C;
    }, []);
    return n.stringify(a);
  }
  var u = typeof FormData > "u" ? xp.default : FormData, f = new u();
  f.append("operations", n.stringify(i));
  var g = {}, E = 0;
  return o.forEach(function(C) {
    g[++E] = C;
  }), f.append("map", n.stringify(g)), E = 0, o.forEach(function(C, S) {
    f.append("" + ++E, S);
  }), f;
}
Ca.default = Np;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
Fe.parseBatchRequestsExtendedArgs = Fe.parseRawRequestExtendedArgs = Fe.parseRequestExtendedArgs = Fe.parseBatchRequestArgs = Fe.parseRawRequestArgs = Fe.parseRequestArgs = void 0;
function Tp(e, t, r) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Fe.parseRequestArgs = Tp;
function Dp(e, t, r) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Fe.parseRawRequestArgs = Dp;
function Qp(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Fe.parseBatchRequestArgs = Qp;
function Fp(e, t, r, n) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Fe.parseRequestExtendedArgs = Fp;
function Mp(e, t, r, n) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Fe.parseRawRequestExtendedArgs = Mp;
function Op(e, t, r) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: r,
    signal: void 0
  };
}
Fe.parseBatchRequestsExtendedArgs = Op;
var cs = {}, Lp = Rt && Rt.__extends || /* @__PURE__ */ function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, s) {
      n.__proto__ = s;
    } || function(n, s) {
      for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (n[i] = s[i]);
    }, e(t, r);
  };
  return function(t, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}();
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.ClientError = void 0;
var kp = (
  /** @class */
  function(e) {
    Lp(t, e);
    function t(r, n) {
      var s = this, i = t.extractMessage(r) + ": " + JSON.stringify({
        response: r,
        request: n
      });
      return s = e.call(this, i) || this, Object.setPrototypeOf(s, t.prototype), s.response = r, s.request = n, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(s, t), s;
    }
    return t.extractMessage = function(r) {
      try {
        return r.errors[0].message;
      } catch {
        return "GraphQL Error (Code: " + r.status + ")";
      }
    }, t;
  }(Error)
);
cs.ClientError = kp;
var Dn = {}, qc;
function Pp() {
  if (qc) return Dn;
  qc = 1;
  var e = Rt && Rt.__assign || function() {
    return e = Object.assign || function(O) {
      for (var L, z = 1, U = arguments.length; z < U; z++) {
        L = arguments[z];
        for (var k in L) Object.prototype.hasOwnProperty.call(L, k) && (O[k] = L[k]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = Rt && Rt.__awaiter || function(O, L, z, U) {
    function k(j) {
      return j instanceof z ? j : new z(function(V) {
        V(j);
      });
    }
    return new (z || (z = Promise))(function(j, V) {
      function tt(_) {
        try {
          d(U.next(_));
        } catch (A) {
          V(A);
        }
      }
      function B(_) {
        try {
          d(U.throw(_));
        } catch (A) {
          V(A);
        }
      }
      function d(_) {
        _.done ? j(_.value) : k(_.value).then(tt, B);
      }
      d((U = U.apply(O, L || [])).next());
    });
  }, r = Rt && Rt.__generator || function(O, L) {
    var z = { label: 0, sent: function() {
      if (j[0] & 1) throw j[1];
      return j[1];
    }, trys: [], ops: [] }, U, k, j, V;
    return V = { next: tt(0), throw: tt(1), return: tt(2) }, typeof Symbol == "function" && (V[Symbol.iterator] = function() {
      return this;
    }), V;
    function tt(d) {
      return function(_) {
        return B([d, _]);
      };
    }
    function B(d) {
      if (U) throw new TypeError("Generator is already executing.");
      for (; z; ) try {
        if (U = 1, k && (j = d[0] & 2 ? k.return : d[0] ? k.throw || ((j = k.return) && j.call(k), 0) : k.next) && !(j = j.call(k, d[1])).done) return j;
        switch (k = 0, j && (d = [d[0] & 2, j.value]), d[0]) {
          case 0:
          case 1:
            j = d;
            break;
          case 4:
            return z.label++, { value: d[1], done: !1 };
          case 5:
            z.label++, k = d[1], d = [0];
            continue;
          case 7:
            d = z.ops.pop(), z.trys.pop();
            continue;
          default:
            if (j = z.trys, !(j = j.length > 0 && j[j.length - 1]) && (d[0] === 6 || d[0] === 2)) {
              z = 0;
              continue;
            }
            if (d[0] === 3 && (!j || d[1] > j[0] && d[1] < j[3])) {
              z.label = d[1];
              break;
            }
            if (d[0] === 6 && z.label < j[1]) {
              z.label = j[1], j = d;
              break;
            }
            if (j && z.label < j[2]) {
              z.label = j[2], z.ops.push(d);
              break;
            }
            j[2] && z.ops.pop(), z.trys.pop();
            continue;
        }
        d = L.call(O, z);
      } catch (_) {
        d = [6, _], k = 0;
      } finally {
        U = j = 0;
      }
      if (d[0] & 5) throw d[1];
      return { value: d[0] ? d[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Dn, "__esModule", { value: !0 }), Dn.GraphQLWebSocketClient = void 0;
  var n = cs, s = v0(), i = "connection_init", o = "connection_ack", a = "ping", u = "pong", f = "subscribe", g = "next", E = "error", C = "complete", S = (
    /** @class */
    function() {
      function O(L, z, U) {
        this._type = L, this._payload = z, this._id = U;
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
          var L = { type: this.type };
          return this.id != null && this.id != null && (L.id = this.id), this.payload != null && this.payload != null && (L.payload = this.payload), JSON.stringify(L);
        },
        enumerable: !1,
        configurable: !0
      }), O.parse = function(L, z) {
        var U = JSON.parse(L), k = U.type, j = U.payload, V = U.id;
        return new O(k, z(j), V);
      }, O;
    }()
  ), Q = (
    /** @class */
    function() {
      function O(L, z) {
        var U = this, k = z.onInit, j = z.onAcknowledged, V = z.onPing, tt = z.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = L, L.onopen = function(B) {
          return t(U, void 0, void 0, function() {
            var d, _, A, m;
            return r(this, function(p) {
              switch (p.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, _ = (d = L).send, A = T, k ? [4, k()] : [3, 2];
                case 1:
                  return m = p.sent(), [3, 3];
                case 2:
                  m = null, p.label = 3;
                case 3:
                  return _.apply(d, [A.apply(void 0, [m]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, L.onclose = function(B) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, L.onerror = function(B) {
          console.error(B);
        }, L.onmessage = function(B) {
          try {
            var d = N(B.data);
            switch (d.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, j && j(d.payload));
                return;
              }
              case a: {
                V ? V(d.payload).then(function(I) {
                  return L.send(H(I).text);
                }) : L.send(H(null).text);
                return;
              }
              case u: {
                tt && tt(d.payload);
                return;
              }
            }
            if (!U.socketState.acknowledged || d.id === void 0 || d.id === null || !U.socketState.subscriptions[d.id])
              return;
            var _ = U.socketState.subscriptions[d.id], A = _.query, m = _.variables, p = _.subscriber;
            switch (d.type) {
              case g: {
                !d.payload.errors && d.payload.data && p.next && p.next(d.payload.data), d.payload.errors && p.error && p.error(new n.ClientError(e(e({}, d.payload), { status: 200 }), { query: A, variables: m }));
                return;
              }
              case E: {
                p.error && p.error(new n.ClientError({ errors: d.payload, status: 200 }, { query: A, variables: m }));
                return;
              }
              case C: {
                p.complete && p.complete(), delete U.socketState.subscriptions[d.id];
                return;
              }
            }
          } catch (I) {
            console.error(I), L.close(1006);
          }
          L.close(4400, "Unknown graphql-ws message.");
        };
      }
      return O.prototype.makeSubscribe = function(L, z, U, k) {
        var j = this, V = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[V] = { query: L, variables: U, subscriber: k }, this.socket.send(G(V, { query: L, operationName: z, variables: U }).text), function() {
          j.socket.send(Y(V).text), delete j.socketState.subscriptions[V];
        };
      }, O.prototype.rawRequest = function(L, z) {
        var U = this;
        return new Promise(function(k, j) {
          var V;
          U.rawSubscribe(L, {
            next: function(tt, B) {
              return V = { data: tt, extensions: B };
            },
            error: j,
            complete: function() {
              return k(V);
            }
          }, z);
        });
      }, O.prototype.request = function(L, z) {
        var U = this;
        return new Promise(function(k, j) {
          var V;
          U.subscribe(L, {
            next: function(tt) {
              return V = tt;
            },
            error: j,
            complete: function() {
              return k(V);
            }
          }, z);
        });
      }, O.prototype.subscribe = function(L, z, U) {
        var k = s.resolveRequestDocument(L), j = k.query, V = k.operationName;
        return this.makeSubscribe(j, V, U, z);
      }, O.prototype.rawSubscribe = function(L, z, U) {
        return this.makeSubscribe(L, void 0, U, z);
      }, O.prototype.ping = function(L) {
        this.socket.send(M(L).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  Dn.GraphQLWebSocketClient = Q;
  function N(O, L) {
    L === void 0 && (L = function(U) {
      return U;
    });
    var z = S.parse(O, L);
    return z;
  }
  function T(O) {
    return new S(i, O);
  }
  function M(O) {
    return new S(a, O, void 0);
  }
  function H(O) {
    return new S(u, O, void 0);
  }
  function G(O, L) {
    return new S(f, L, O);
  }
  function Y(O) {
    return new S(C, void 0, O);
  }
  return Dn;
}
var jc;
function v0() {
  return jc || (jc = 1, function(e) {
    var t = Rt && Rt.__assign || function() {
      return t = Object.assign || function(p) {
        for (var I, v = 1, w = arguments.length; v < w; v++) {
          I = arguments[v];
          for (var h in I) Object.prototype.hasOwnProperty.call(I, h) && (p[h] = I[h]);
        }
        return p;
      }, t.apply(this, arguments);
    }, r = Rt && Rt.__createBinding || (Object.create ? function(p, I, v, w) {
      w === void 0 && (w = v), Object.defineProperty(p, w, { enumerable: !0, get: function() {
        return I[v];
      } });
    } : function(p, I, v, w) {
      w === void 0 && (w = v), p[w] = I[v];
    }), n = Rt && Rt.__setModuleDefault || (Object.create ? function(p, I) {
      Object.defineProperty(p, "default", { enumerable: !0, value: I });
    } : function(p, I) {
      p.default = I;
    }), s = Rt && Rt.__importStar || function(p) {
      if (p && p.__esModule) return p;
      var I = {};
      if (p != null) for (var v in p) v !== "default" && Object.prototype.hasOwnProperty.call(p, v) && r(I, p, v);
      return n(I, p), I;
    }, i = Rt && Rt.__awaiter || function(p, I, v, w) {
      function h(b) {
        return b instanceof v ? b : new v(function(q) {
          q(b);
        });
      }
      return new (v || (v = Promise))(function(b, q) {
        function Z(st) {
          try {
            nt(w.next(st));
          } catch (at) {
            q(at);
          }
        }
        function et(st) {
          try {
            nt(w.throw(st));
          } catch (at) {
            q(at);
          }
        }
        function nt(st) {
          st.done ? b(st.value) : h(st.value).then(Z, et);
        }
        nt((w = w.apply(p, I || [])).next());
      });
    }, o = Rt && Rt.__generator || function(p, I) {
      var v = { label: 0, sent: function() {
        if (b[0] & 1) throw b[1];
        return b[1];
      }, trys: [], ops: [] }, w, h, b, q;
      return q = { next: Z(0), throw: Z(1), return: Z(2) }, typeof Symbol == "function" && (q[Symbol.iterator] = function() {
        return this;
      }), q;
      function Z(nt) {
        return function(st) {
          return et([nt, st]);
        };
      }
      function et(nt) {
        if (w) throw new TypeError("Generator is already executing.");
        for (; v; ) try {
          if (w = 1, h && (b = nt[0] & 2 ? h.return : nt[0] ? h.throw || ((b = h.return) && b.call(h), 0) : h.next) && !(b = b.call(h, nt[1])).done) return b;
          switch (h = 0, b && (nt = [nt[0] & 2, b.value]), nt[0]) {
            case 0:
            case 1:
              b = nt;
              break;
            case 4:
              return v.label++, { value: nt[1], done: !1 };
            case 5:
              v.label++, h = nt[1], nt = [0];
              continue;
            case 7:
              nt = v.ops.pop(), v.trys.pop();
              continue;
            default:
              if (b = v.trys, !(b = b.length > 0 && b[b.length - 1]) && (nt[0] === 6 || nt[0] === 2)) {
                v = 0;
                continue;
              }
              if (nt[0] === 3 && (!b || nt[1] > b[0] && nt[1] < b[3])) {
                v.label = nt[1];
                break;
              }
              if (nt[0] === 6 && v.label < b[1]) {
                v.label = b[1], b = nt;
                break;
              }
              if (b && v.label < b[2]) {
                v.label = b[2], v.ops.push(nt);
                break;
              }
              b[2] && v.ops.pop(), v.trys.pop();
              continue;
          }
          nt = I.call(p, v);
        } catch (st) {
          nt = [6, st], h = 0;
        } finally {
          w = b = 0;
        }
        if (nt[0] & 5) throw nt[1];
        return { value: nt[0] ? nt[1] : void 0, done: !0 };
      }
    }, a = Rt && Rt.__rest || function(p, I) {
      var v = {};
      for (var w in p) Object.prototype.hasOwnProperty.call(p, w) && I.indexOf(w) < 0 && (v[w] = p[w]);
      if (p != null && typeof Object.getOwnPropertySymbols == "function")
        for (var h = 0, w = Object.getOwnPropertySymbols(p); h < w.length; h++)
          I.indexOf(w[h]) < 0 && Object.prototype.propertyIsEnumerable.call(p, w[h]) && (v[w[h]] = p[w[h]]);
      return v;
    }, u = Rt && Rt.__importDefault || function(p) {
      return p && p.__esModule ? p : { default: p };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(RA), g = f, E = up, C = bp, S = u(Ca), Q = as, N = Fe, T = cs;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return T.ClientError;
    } });
    var M = function(p) {
      var I = {};
      return p && (typeof Headers < "u" && p instanceof Headers || g && g.Headers && p instanceof g.Headers ? I = A(p) : Array.isArray(p) ? p.forEach(function(v) {
        var w = v[0], h = v[1];
        I[w] = h;
      }) : I = p), I;
    }, H = function(p) {
      return p.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, G = function(p) {
      var I = p.query, v = p.variables, w = p.operationName, h = p.jsonSerializer;
      if (!Array.isArray(I)) {
        var b = ["query=" + encodeURIComponent(H(I))];
        return v && b.push("variables=" + encodeURIComponent(h.stringify(v))), w && b.push("operationName=" + encodeURIComponent(w)), b.join("&");
      }
      if (typeof v < "u" && !Array.isArray(v))
        throw new Error("Cannot create query with given variable type, array expected");
      var q = I.reduce(function(Z, et, nt) {
        return Z.push({
          query: H(et),
          variables: v ? h.stringify(v[nt]) : void 0
        }), Z;
      }, []);
      return "query=" + encodeURIComponent(h.stringify(q));
    }, Y = function(p) {
      var I = p.url, v = p.query, w = p.variables, h = p.operationName, b = p.headers, q = p.fetch, Z = p.fetchOptions, et = p.middleware;
      return i(void 0, void 0, void 0, function() {
        var nt, st;
        return o(this, function(at) {
          switch (at.label) {
            case 0:
              return nt = S.default(v, w, h, Z.jsonSerializer), st = t({ method: "POST", headers: t(t({}, typeof nt == "string" ? { "Content-Type": "application/json" } : {}), b), body: nt }, Z), et ? [4, Promise.resolve(et(st))] : [3, 2];
            case 1:
              st = at.sent(), at.label = 2;
            case 2:
              return [4, q(I, st)];
            case 3:
              return [2, at.sent()];
          }
        });
      });
    }, O = function(p) {
      var I = p.url, v = p.query, w = p.variables, h = p.operationName, b = p.headers, q = p.fetch, Z = p.fetchOptions, et = p.middleware;
      return i(void 0, void 0, void 0, function() {
        var nt, st;
        return o(this, function(at) {
          switch (at.label) {
            case 0:
              return nt = G({
                query: v,
                variables: w,
                operationName: h,
                jsonSerializer: Z.jsonSerializer
              }), st = t({ method: "GET", headers: b }, Z), et ? [4, Promise.resolve(et(st))] : [3, 2];
            case 1:
              st = at.sent(), at.label = 2;
            case 2:
              return [4, q(I + "?" + nt, st)];
            case 3:
              return [2, at.sent()];
          }
        });
      });
    }, L = (
      /** @class */
      function() {
        function p(I, v) {
          v === void 0 && (v = {}), this.url = I, this.options = v;
        }
        return p.prototype.rawRequest = function(I, v, w) {
          return i(this, void 0, void 0, function() {
            var h, b, q, Z, et, nt, st, at, Mt, ht, dt, Tt;
            return o(this, function(pt) {
              return h = N.parseRawRequestArgs(I, v, w), b = this.options, q = b.headers, Z = b.fetch, et = Z === void 0 ? f.default : Z, nt = b.method, st = nt === void 0 ? "POST" : nt, at = b.requestMiddleware, Mt = b.responseMiddleware, ht = a(b, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), dt = this.url, h.signal !== void 0 && (ht.signal = h.signal), Tt = B(h.query).operationName, [2, z({
                url: dt,
                query: h.query,
                variables: h.variables,
                headers: t(t({}, M(d(q))), M(h.requestHeaders)),
                operationName: Tt,
                fetch: et,
                method: st,
                fetchOptions: ht,
                middleware: at
              }).then(function(yt) {
                return Mt && Mt(yt), yt;
              }).catch(function(yt) {
                throw Mt && Mt(yt), yt;
              })];
            });
          });
        }, p.prototype.request = function(I) {
          for (var v = [], w = 1; w < arguments.length; w++)
            v[w - 1] = arguments[w];
          var h = v[0], b = v[1], q = N.parseRequestArgs(I, h, b), Z = this.options, et = Z.headers, nt = Z.fetch, st = nt === void 0 ? f.default : nt, at = Z.method, Mt = at === void 0 ? "POST" : at, ht = Z.requestMiddleware, dt = Z.responseMiddleware, Tt = a(Z, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), pt = this.url;
          q.signal !== void 0 && (Tt.signal = q.signal);
          var yt = B(q.document), Or = yt.query, Ot = yt.operationName;
          return z({
            url: pt,
            query: Or,
            variables: q.variables,
            headers: t(t({}, M(d(et))), M(q.requestHeaders)),
            operationName: Ot,
            fetch: st,
            method: Mt,
            fetchOptions: Tt,
            middleware: ht
          }).then(function(xt) {
            return dt && dt(xt), xt.data;
          }).catch(function(xt) {
            throw dt && dt(xt), xt;
          });
        }, p.prototype.batchRequests = function(I, v) {
          var w = N.parseBatchRequestArgs(I, v), h = this.options, b = h.headers, q = h.fetch, Z = q === void 0 ? f.default : q, et = h.method, nt = et === void 0 ? "POST" : et, st = h.requestMiddleware, at = h.responseMiddleware, Mt = a(h, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ht = this.url;
          w.signal !== void 0 && (Mt.signal = w.signal);
          var dt = w.documents.map(function(pt) {
            var yt = pt.document;
            return B(yt).query;
          }), Tt = w.documents.map(function(pt) {
            var yt = pt.variables;
            return yt;
          });
          return z({
            url: ht,
            query: dt,
            variables: Tt,
            headers: t(t({}, M(d(b))), M(w.requestHeaders)),
            operationName: void 0,
            fetch: Z,
            method: nt,
            fetchOptions: Mt,
            middleware: st
          }).then(function(pt) {
            return at && at(pt), pt.data;
          }).catch(function(pt) {
            throw at && at(pt), pt;
          });
        }, p.prototype.setHeaders = function(I) {
          return this.options.headers = I, this;
        }, p.prototype.setHeader = function(I, v) {
          var w, h = this.options.headers;
          return h ? h[I] = v : this.options.headers = (w = {}, w[I] = v, w), this;
        }, p.prototype.setEndpoint = function(I) {
          return this.url = I, this;
        }, p;
      }()
    );
    e.GraphQLClient = L;
    function z(p) {
      var I = p.url, v = p.query, w = p.variables, h = p.headers, b = p.operationName, q = p.fetch, Z = p.method, et = Z === void 0 ? "POST" : Z, nt = p.fetchOptions, st = p.middleware;
      return i(this, void 0, void 0, function() {
        var at, Mt, ht, dt, Tt, pt, yt, Or, Ot, xt, Rn;
        return o(this, function(Ut) {
          switch (Ut.label) {
            case 0:
              return at = et.toUpperCase() === "POST" ? Y : O, Mt = Array.isArray(v), [4, at({
                url: I,
                query: v,
                variables: w,
                operationName: b,
                headers: h,
                fetch: q,
                fetchOptions: nt,
                middleware: st
              })];
            case 1:
              return ht = Ut.sent(), [4, V(ht, nt.jsonSerializer)];
            case 2:
              if (dt = Ut.sent(), Tt = Mt && Array.isArray(dt) ? !dt.some(function(Gt) {
                var As = Gt.data;
                return !As;
              }) : !!dt.data, pt = !dt.errors || nt.errorPolicy === "all" || nt.errorPolicy === "ignore", ht.ok && pt && Tt)
                return yt = ht.headers, Or = ht.status, dt.errors, Ot = a(dt, ["errors"]), xt = nt.errorPolicy === "ignore" ? Ot : dt, [2, t(t({}, Mt ? { data: xt } : xt), { headers: yt, status: Or })];
              throw Rn = typeof dt == "string" ? { error: dt } : dt, new T.ClientError(t(t({}, Rn), { status: ht.status, headers: ht.headers }), { query: v, variables: w });
          }
        });
      });
    }
    function U(p, I, v, w) {
      return i(this, void 0, void 0, function() {
        var h, b;
        return o(this, function(q) {
          return h = N.parseRawRequestExtendedArgs(p, I, v, w), b = new L(h.url), [2, b.rawRequest(t({}, h))];
        });
      });
    }
    e.rawRequest = U;
    function k(p, I) {
      for (var v = [], w = 2; w < arguments.length; w++)
        v[w - 2] = arguments[w];
      return i(this, void 0, void 0, function() {
        var h, b, q, Z;
        return o(this, function(et) {
          return h = v[0], b = v[1], q = N.parseRequestExtendedArgs(p, I, h, b), Z = new L(q.url), [2, Z.request(t({}, q))];
        });
      });
    }
    e.request = k;
    function j(p, I, v) {
      return i(this, void 0, void 0, function() {
        var w, h;
        return o(this, function(b) {
          return w = N.parseBatchRequestsExtendedArgs(p, I, v), h = new L(w.url), [2, h.batchRequests(t({}, w))];
        });
      });
    }
    e.batchRequests = j, e.default = k;
    function V(p, I) {
      return I === void 0 && (I = Q.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var v, w, h;
        return o(this, function(b) {
          switch (b.label) {
            case 0:
              return p.headers.forEach(function(q, Z) {
                Z.toLowerCase() === "content-type" && (v = q);
              }), v && v.toLowerCase().startsWith("application/json") ? (h = (w = I).parse, [4, p.text()]) : [3, 2];
            case 1:
              return [2, h.apply(w, [b.sent()])];
            case 2:
              return [2, p.text()];
          }
        });
      });
    }
    function tt(p) {
      var I, v = void 0, w = p.definitions.filter(function(h) {
        return h.kind === "OperationDefinition";
      });
      return w.length === 1 && (v = (I = w[0].name) === null || I === void 0 ? void 0 : I.value), v;
    }
    function B(p) {
      if (typeof p == "string") {
        var I = void 0;
        try {
          var v = E.parse(p);
          I = tt(v);
        } catch {
        }
        return { query: p, operationName: I };
      }
      var w = tt(p);
      return { query: C.print(p), operationName: w };
    }
    e.resolveRequestDocument = B;
    function d(p) {
      return typeof p == "function" ? p() : p;
    }
    function _(p) {
      for (var I = [], v = 1; v < arguments.length; v++)
        I[v - 1] = arguments[v];
      return p.reduce(function(w, h, b) {
        return "" + w + h + (b in I ? I[b] : "");
      }, "");
    }
    e.gql = _;
    function A(p) {
      var I = {};
      return p.forEach(function(v, w) {
        I[w] = v;
      }), I;
    }
    var m = Pp();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }($i)), $i;
}
var Up = v0(), Zs = function() {
  return Zs = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, Zs.apply(this, arguments);
};
var Qs = /* @__PURE__ */ new Map(), So = /* @__PURE__ */ new Map(), C0 = !0, Js = !1;
function B0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function zp(e) {
  return B0(e.source.body.substring(e.start, e.end));
}
function Gp(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = zp(n.loc), o = So.get(s);
      o && !o.has(i) ? C0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || So.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), Zs(Zs({}, e), { definitions: r });
}
function Wp(e) {
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
function Xp(e) {
  var t = B0(e);
  if (!Qs.has(t)) {
    var r = w0(e, {
      experimentalFragmentVariables: Js,
      allowLegacyFragmentVariables: Js
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Qs.set(t, Wp(Gp(r)));
  }
  return Qs.get(t);
}
function it(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), Xp(n);
}
function Hp() {
  Qs.clear(), So.clear();
}
function Yp() {
  C0 = !1;
}
function Vp() {
  Js = !0;
}
function Zp() {
  Js = !1;
}
var Qn = {
  gql: it,
  resetCaches: Hp,
  disableFragmentWarnings: Yp,
  enableExperimentalFragmentVariables: Vp,
  disableExperimentalFragmentVariables: Zp
};
(function(e) {
  e.gql = Qn.gql, e.resetCaches = Qn.resetCaches, e.disableFragmentWarnings = Qn.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Qn.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Qn.disableExperimentalFragmentVariables;
})(it || (it = {}));
it.default = it;
var Dt = "0x0000000000000000000000000000000000000000000000000000000000000000", QC = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", FC = 16 * 1024, MC = 16, OC = 1024 * 1024 * 1024, LC = 1024 * 1024 * 1024, kC = 255, PC = 1024 * 1024, UC = 1024 * 1024, Jp = "0xffffffffffff0000", x0 = "0xffffffffffff0001", qp = "0xffffffffffff0003", jp = "0xffffffffffff0004", $p = "0xffffffffffff0005", zC = "0x0", Kp = [
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
], tg = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const R0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && R0.decode();
let kn = null;
function S0() {
  return (kn === null || kn.byteLength === 0) && (kn = new Uint8Array(c.memory.buffer)), kn;
}
function eg(e, t) {
  return e = e >>> 0, R0.decode(S0().subarray(e, e + t));
}
function y(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
function rg(e, t) {
  const r = c.gm_args(e, t);
  return W.__wrap(r);
}
function ng(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return W.__wrap(n);
}
function sg(e, t, r, n) {
  y(n, Fr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return W.__wrap(i);
}
function ig(e, t, r, n) {
  y(n, Fr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return W.__wrap(i);
}
function og(e, t, r, n) {
  y(n, us);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return W.__wrap(i);
}
function ag(e, t, r, n) {
  y(n, us);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return W.__wrap(i);
}
function cg(e, t, r, n) {
  y(n, _s);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return W.__wrap(i);
}
function dg(e, t, r, n) {
  y(n, _s);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return W.__wrap(i);
}
function ug(e, t, r, n) {
  y(n, ds);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return W.__wrap(i);
}
function _g(e, t, r, n) {
  y(n, ds);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return W.__wrap(i);
}
function hg(e, t, r) {
  const n = c.add(e, t, r);
  return W.__wrap(n);
}
function lg(e, t, r) {
  const n = c.and(e, t, r);
  return W.__wrap(n);
}
function fg(e, t, r) {
  const n = c.div(e, t, r);
  return W.__wrap(n);
}
function Ag(e, t, r) {
  const n = c.eq(e, t, r);
  return W.__wrap(n);
}
function pg(e, t, r) {
  const n = c.exp(e, t, r);
  return W.__wrap(n);
}
function gg(e, t, r) {
  const n = c.gt(e, t, r);
  return W.__wrap(n);
}
function wg(e, t, r) {
  const n = c.lt(e, t, r);
  return W.__wrap(n);
}
function mg(e, t, r) {
  const n = c.mlog(e, t, r);
  return W.__wrap(n);
}
function yg(e, t, r) {
  const n = c.mroo(e, t, r);
  return W.__wrap(n);
}
function bg(e, t, r) {
  const n = c.mod_(e, t, r);
  return W.__wrap(n);
}
function No(e, t) {
  const r = c.move_(e, t);
  return W.__wrap(r);
}
function Ig(e, t, r) {
  const n = c.mul(e, t, r);
  return W.__wrap(n);
}
function Eg(e, t) {
  const r = c.not(e, t);
  return W.__wrap(r);
}
function vg(e, t, r) {
  const n = c.or(e, t, r);
  return W.__wrap(n);
}
function Cg(e, t, r) {
  const n = c.sll(e, t, r);
  return W.__wrap(n);
}
function Bg(e, t, r) {
  const n = c.srl(e, t, r);
  return W.__wrap(n);
}
function N0(e, t, r) {
  const n = c.sub(e, t, r);
  return W.__wrap(n);
}
function xg(e, t, r) {
  const n = c.xor(e, t, r);
  return W.__wrap(n);
}
function Rg(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return W.__wrap(s);
}
function Ba(e) {
  const t = c.ret(e);
  return W.__wrap(t);
}
function Sg(e, t) {
  const r = c.retd(e, t);
  return W.__wrap(r);
}
function Ng(e) {
  const t = c.aloc(e);
  return W.__wrap(t);
}
function Tg(e, t) {
  const r = c.mcl(e, t);
  return W.__wrap(r);
}
function Dg(e, t, r) {
  const n = c.mcp(e, t, r);
  return W.__wrap(n);
}
function Qg(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return W.__wrap(s);
}
function Fg(e, t) {
  const r = c.bhsh(e, t);
  return W.__wrap(r);
}
function Mg(e) {
  const t = c.bhei(e);
  return W.__wrap(t);
}
function Og(e, t) {
  const r = c.burn(e, t);
  return W.__wrap(r);
}
function To(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return W.__wrap(s);
}
function Lg(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return W.__wrap(s);
}
function kg(e, t) {
  const r = c.croo(e, t);
  return W.__wrap(r);
}
function Pg(e, t) {
  const r = c.csiz(e, t);
  return W.__wrap(r);
}
function Ug(e) {
  const t = c.cb(e);
  return W.__wrap(t);
}
function T0(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return W.__wrap(s);
}
function zg(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return W.__wrap(s);
}
function Gg(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return W.__wrap(s);
}
function Wg(e, t) {
  const r = c.mint(e, t);
  return W.__wrap(r);
}
function Xg(e) {
  const t = c.rvrt(e);
  return W.__wrap(t);
}
function Hg(e, t, r) {
  const n = c.scwq(e, t, r);
  return W.__wrap(n);
}
function Yg(e, t, r) {
  const n = c.srw(e, t, r);
  return W.__wrap(n);
}
function Vg(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return W.__wrap(s);
}
function Zg(e, t, r) {
  const n = c.sww(e, t, r);
  return W.__wrap(n);
}
function Jg(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return W.__wrap(s);
}
function D0(e, t, r) {
  const n = c.tr(e, t, r);
  return W.__wrap(n);
}
function qg(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return W.__wrap(s);
}
function jg(e, t, r) {
  const n = c.eck1(e, t, r);
  return W.__wrap(n);
}
function $g(e, t, r) {
  const n = c.ecr1(e, t, r);
  return W.__wrap(n);
}
function Kg(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return W.__wrap(s);
}
function tw(e, t, r) {
  const n = c.k256(e, t, r);
  return W.__wrap(n);
}
function ew(e, t, r) {
  const n = c.s256(e, t, r);
  return W.__wrap(n);
}
function rw(e, t) {
  const r = c.time(e, t);
  return W.__wrap(r);
}
function nw() {
  const e = c.noop();
  return W.__wrap(e);
}
function sw(e) {
  const t = c.flag(e);
  return W.__wrap(t);
}
function iw(e, t, r) {
  const n = c.bal(e, t, r);
  return W.__wrap(n);
}
function Q0(e) {
  const t = c.jmp(e);
  return W.__wrap(t);
}
function ow(e, t, r) {
  const n = c.jne(e, t, r);
  return W.__wrap(n);
}
function aw(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return W.__wrap(s);
}
function Vn(e, t, r) {
  const n = c.addi(e, t, r);
  return W.__wrap(n);
}
function cw(e, t, r) {
  const n = c.andi(e, t, r);
  return W.__wrap(n);
}
function F0(e, t, r) {
  const n = c.divi(e, t, r);
  return W.__wrap(n);
}
function dw(e, t, r) {
  const n = c.expi(e, t, r);
  return W.__wrap(n);
}
function uw(e, t, r) {
  const n = c.modi(e, t, r);
  return W.__wrap(n);
}
function _w(e, t, r) {
  const n = c.muli(e, t, r);
  return W.__wrap(n);
}
function hw(e, t, r) {
  const n = c.ori(e, t, r);
  return W.__wrap(n);
}
function lw(e, t, r) {
  const n = c.slli(e, t, r);
  return W.__wrap(n);
}
function fw(e, t, r) {
  const n = c.srli(e, t, r);
  return W.__wrap(n);
}
function M0(e, t, r) {
  const n = c.subi(e, t, r);
  return W.__wrap(n);
}
function Aw(e, t, r) {
  const n = c.xori(e, t, r);
  return W.__wrap(n);
}
function pw(e, t, r) {
  const n = c.jnei(e, t, r);
  return W.__wrap(n);
}
function gw(e, t, r) {
  const n = c.lb(e, t, r);
  return W.__wrap(n);
}
function qs(e, t, r) {
  const n = c.lw(e, t, r);
  return W.__wrap(n);
}
function ww(e, t, r) {
  const n = c.sb(e, t, r);
  return W.__wrap(n);
}
function mw(e, t, r) {
  const n = c.sw(e, t, r);
  return W.__wrap(n);
}
function yw(e, t, r) {
  const n = c.mcpi(e, t, r);
  return W.__wrap(n);
}
function O0(e, t, r) {
  const n = c.gtf(e, t, r);
  return W.__wrap(n);
}
function bw(e, t) {
  const r = c.mcli(e, t);
  return W.__wrap(r);
}
function Iw(e, t) {
  const r = c.gm(e, t);
  return W.__wrap(r);
}
function an(e, t) {
  const r = c.movi(e, t);
  return W.__wrap(r);
}
function Ew(e, t) {
  const r = c.jnzi(e, t);
  return W.__wrap(r);
}
function vw(e, t) {
  const r = c.jmpf(e, t);
  return W.__wrap(r);
}
function Cw(e, t) {
  const r = c.jmpb(e, t);
  return W.__wrap(r);
}
function Bw(e, t, r) {
  const n = c.jnzf(e, t, r);
  return W.__wrap(n);
}
function L0(e, t, r) {
  const n = c.jnzb(e, t, r);
  return W.__wrap(n);
}
function xw(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return W.__wrap(s);
}
function Rw(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return W.__wrap(s);
}
function Sw(e) {
  const t = c.ji(e);
  return W.__wrap(t);
}
function Nw(e) {
  const t = c.cfei(e);
  return W.__wrap(t);
}
function Tw(e) {
  const t = c.cfsi(e);
  return W.__wrap(t);
}
function Dw(e) {
  const t = c.cfe(e);
  return W.__wrap(t);
}
function Qw(e) {
  const t = c.cfs(e);
  return W.__wrap(t);
}
function Fw(e) {
  const t = c.pshl(e);
  return W.__wrap(t);
}
function Mw(e) {
  const t = c.pshh(e);
  return W.__wrap(t);
}
function Ow(e) {
  const t = c.popl(e);
  return W.__wrap(t);
}
function Lw(e) {
  const t = c.poph(e);
  return W.__wrap(t);
}
function kw(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return W.__wrap(s);
}
function Pw(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return W.__wrap(s);
}
function Uw(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return W.__wrap(s);
}
function zw(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return W.__wrap(s);
}
function Gw(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return W.__wrap(s);
}
function Ww(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return W.__wrap(s);
}
function Xw(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return W.__wrap(s);
}
function Hw(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return W.__wrap(s);
}
function Yw(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return W.__wrap(s);
}
function Vw(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return W.__wrap(s);
}
function Zw(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return W.__wrap(s);
}
function Jw(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return W.__wrap(s);
}
function qw(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return W.__wrap(s);
}
function jw(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return W.__wrap(s);
}
function $w(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return W.__wrap(s);
}
function k0(e, t) {
  const r = c.bsiz(e, t);
  return W.__wrap(r);
}
function Kw(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return W.__wrap(s);
}
let Pn = null;
function $c() {
  return (Pn === null || Pn.byteLength === 0) && (Pn = new Int32Array(c.memory.buffer)), Pn;
}
function tm(e, t) {
  return e = e >>> 0, S0().subarray(e / 1, e / 1 + t);
}
const em = Object.freeze({
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
}), rm = Object.freeze({
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
}), nm = Object.freeze({
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
}), P0 = Object.freeze({
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
}), sm = Object.freeze({
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
}), im = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_add_free(e >>> 0));
class om {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, im.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_add_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const am = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_addi_free(e >>> 0));
class cm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, am.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_addi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const dm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_aloc_free(e >>> 0));
class um {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_aloc_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} bytes
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const _m = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_and_free(e >>> 0));
class hm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _m.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_and_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const lm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_andi_free(e >>> 0));
class fm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_andi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Am = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bal_free(e >>> 0));
class pm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Am.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bal_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} asset_id_addr
  * @param {RegId} contract_id_addr
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const gm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhei_free(e >>> 0));
class wm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhei_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const mm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhsh_free(e >>> 0));
class ym {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhsh_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} heigth
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const bm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bldd_free(e >>> 0));
class Im {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bldd_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_ptr
  * @param {RegId} blob_id_ptr
  * @param {RegId} offset
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Em = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bsiz_free(e >>> 0));
class vm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Em.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bsiz_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} blob_id_ptr
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Cm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_burn_free(e >>> 0));
class Bm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_burn_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  * @param {RegId} sub_id_addr
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const xm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_call_free(e >>> 0));
class Rm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_call_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} target_struct
  * @param {RegId} fwd_coins
  * @param {RegId} asset_id_addr
  * @param {RegId} fwd_gas
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Sm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cb_free(e >>> 0));
class Nm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cb_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Tm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ccp_free(e >>> 0));
class Dm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ccp_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} contract_id_addr
  * @param {RegId} offset
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Qm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfe_free(e >>> 0));
class Fm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfe_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Mm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfei_free(e >>> 0));
class Om {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfei_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} amount
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const Lm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfs_free(e >>> 0));
class km {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfs_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Pm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfsi_free(e >>> 0));
class Um {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfsi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} amount
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const zm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_croo_free(e >>> 0));
class Gm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_croo_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} contract_id_addr
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Wm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_csiz_free(e >>> 0));
class Xm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_csiz_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} contract_id_addr
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Kc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_compareargs_free(e >>> 0));
class Fr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Fr.prototype);
    return r.__wbg_ptr = t, Kc.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_compareargs_free(t);
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
    return Qt.__wrap(r);
  }
  /**
  * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
  * @param {Imm06} bits
  * @returns {CompareArgs | undefined}
  */
  static from_imm(t) {
    y(t, Qt);
    var r = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(r);
    return n === 0 ? void 0 : Fr.__wrap(n);
  }
}
const Hm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0));
class Ym {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_div_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Vm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divi_free(e >>> 0));
class Zm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Jm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0));
class ds {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divargs_free(t);
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
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const qm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecal_free(e >>> 0));
class jm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecal_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} a
  * @param {RegId} b
  * @param {RegId} c
  * @param {RegId} d
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const $m = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eck1_free(e >>> 0));
class Km {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $m.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eck1_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} sig_addr
  * @param {RegId} msg_hash_addr
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ty = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecr1_free(e >>> 0));
class ey {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ty.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecr1_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} sig_addr
  * @param {RegId} msg_hash_addr
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ry = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ed19_free(e >>> 0));
class ny {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ry.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ed19_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} pub_key_addr
  * @param {RegId} sig_addr
  * @param {RegId} msg_addr
  * @param {RegId} msg_len
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const sy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0));
class iy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eq_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const oy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0));
class ay {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, oy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_exp_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const cy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0));
class dy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_expi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const uy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_flag_free(e >>> 0));
class _y {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_flag_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} value
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const td = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0));
class js {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(js.prototype);
    return r.__wbg_ptr = t, td.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, td.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gm_free(t);
  }
  /**
  * Construct a `GM` instruction from its arguments.
  * @param {RegId} ra
  * @param {GMArgs} args
  * @returns {GM}
  */
  static from_args(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, r);
    return js.__wrap(s);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} selector
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Ne);
    var s = r.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const hy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0));
class ly {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gt_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ed = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0));
class $s {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create($s.prototype);
    return r.__wbg_ptr = t, ed.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ed.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gtf_free(t);
  }
  /**
  * Construct a `GTF` instruction from its arguments.
  * @param {RegId} ra
  * @param {RegId} rb
  * @param {GTFArgs} args
  * @returns {GTF}
  */
  static from_args(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    const o = c.gtf_from_args(s, i, n);
    return $s.__wrap(o);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} arg
  * @param {Imm12} selector
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.gtf_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const rd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0));
class Qt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Qt.prototype);
    return r.__wbg_ptr = t, rd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t);
  }
}
const nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm12_free(e >>> 0));
class wt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(wt.prototype);
    return r.__wbg_ptr = t, nd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t);
  }
}
const sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm18_free(e >>> 0));
class Ne {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ne.prototype);
    return r.__wbg_ptr = t, sd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t);
  }
}
const id = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm24_free(e >>> 0));
class ve {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ve.prototype);
    return r.__wbg_ptr = t, id.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, id.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t);
  }
}
const od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_instruction_free(e >>> 0));
class W {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(W.prototype);
    return r.__wbg_ptr = t, od.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, od.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = c.__wbindgen_add_to_stack_pointer(-16);
      c.instruction_to_bytes(s, this.__wbg_ptr);
      var t = $c()[s / 4 + 0], r = $c()[s / 4 + 1], n = tm(t, r).slice();
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
const fy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ji_free(e >>> 0));
class Ay {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ji_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} abs_target
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const py = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmp_free(e >>> 0));
class gy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, py.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmp_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} abs_target
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpb_free(e >>> 0));
class my {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpb_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dynamic
  * @param {Imm18} fixed
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Ne);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const yy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpf_free(e >>> 0));
class by {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpf_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dynamic
  * @param {Imm18} fixed
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Ne);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const Iy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jne_free(e >>> 0));
class Ey {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Iy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jne_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} abs_target
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const vy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jneb_free(e >>> 0));
class Cy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jneb_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_lhs
  * @param {RegId} cond_rhs
  * @param {RegId} dynamic
  * @param {Imm06} fixed
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const By = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnef_free(e >>> 0));
class xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, By.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnef_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_lhs
  * @param {RegId} cond_rhs
  * @param {RegId} dynamic
  * @param {Imm06} fixed
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const Ry = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnei_free(e >>> 0));
class Sy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ry.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnei_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_lhs
  * @param {RegId} cond_rhs
  * @param {Imm12} abs_target
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Ny = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzb_free(e >>> 0));
class Ty {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ny.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzb_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_nz
  * @param {RegId} dynamic
  * @param {Imm12} fixed
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Dy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzf_free(e >>> 0));
class Qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzf_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_nz
  * @param {RegId} dynamic
  * @param {Imm12} fixed
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Fy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzi_free(e >>> 0));
class My {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} cond_nz
  * @param {Imm18} abs_target
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Ne);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const Oy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_k256_free(e >>> 0));
class Ly {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Oy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_k256_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {RegId} len
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ky = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lb_free(e >>> 0));
class Py {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ky.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lb_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} addr
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Uy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ldc_free(e >>> 0));
class zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ldc_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} contract_id_addr
  * @param {RegId} offset
  * @param {RegId} len
  * @param {Imm06} mode
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const Gy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_log_free(e >>> 0));
class Wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_log_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} a
  * @param {RegId} b
  * @param {RegId} c
  * @param {RegId} d
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Xy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_logd_free(e >>> 0));
class Hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_logd_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} a
  * @param {RegId} b
  * @param {RegId} addr
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Yy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lt_free(e >>> 0));
class Vy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lt_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Zy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lw_free(e >>> 0));
class Jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lw_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} addr
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const qy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcl_free(e >>> 0));
class jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcl_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} len
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const $y = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcli_free(e >>> 0));
class Ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $y.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcli_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {Imm18} count
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Ne);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const tb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcp_free(e >>> 0));
class eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcp_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {RegId} len
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const rb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcpi_free(e >>> 0));
class nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcpi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {Imm12} len
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const sb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_meq_free(e >>> 0));
class ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_meq_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} result
  * @param {RegId} lhs_addr
  * @param {RegId} rhs_addr
  * @param {RegId} len
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ob = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mint_free(e >>> 0));
class ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ob.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mint_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} amount
  * @param {RegId} sub_id_addr
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const cb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mldv_free(e >>> 0));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mldv_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} divisor
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ub = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mlog_free(e >>> 0));
class _b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ub.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mlog_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const hb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mod_free(e >>> 0));
class lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mod_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const fb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_modi_free(e >>> 0));
class Ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_modi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const pb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_move_free(e >>> 0));
class gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_move_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} src
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_movi_free(e >>> 0));
class mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_movi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} val
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Ne);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const yb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mroo_free(e >>> 0));
class bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mroo_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ib = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mul_free(e >>> 0));
class Eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ib.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mul_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const vb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_muli_free(e >>> 0));
class Cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_muli_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Bb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0));
class us {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mathargs_free(t);
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
const xb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0));
class _s {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mulargs_free(t);
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
const Rb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_noop_free(e >>> 0));
class Sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_noop_free(t);
  }
  /**
  * Construct the instruction.
  */
  constructor() {
    const t = c.noop_new_typescript();
    return this.__wbg_ptr = t >>> 0, this;
  }
}
const Nb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_not_free(e >>> 0));
class Tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_not_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} arg
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Db = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_or_free(e >>> 0));
class Qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Db.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_or_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Fb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ori_free(e >>> 0));
class Mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ori_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const Ob = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_poph_free(e >>> 0));
class Lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ob.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_poph_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const kb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_popl_free(e >>> 0));
class Pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_popl_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const Ub = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshh_free(e >>> 0));
class zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ub.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshh_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const Gb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshl_free(e >>> 0));
class Wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshl_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {Imm24} bitmask
  */
  constructor(t) {
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the 24-bit immediate value.
  * @returns {Imm24}
  */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return ve.__wrap(t);
  }
}
const Xb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_panicinstruction_free(e >>> 0));
class Hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_panicinstruction_free(t);
  }
  /**
  * Represents an error described by a reason and an instruction.
  * @param {PanicReason} reason
  * @param {number} instruction
  */
  constructor(t, r) {
    const n = c.panicinstruction_error_typescript(t, r);
    return this.__wbg_ptr = n >>> 0, this;
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
const Yb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ret_free(e >>> 0));
class Vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ret_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} value
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Zb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_retd_free(e >>> 0));
class Jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_retd_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {RegId} len
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const qb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0));
class jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qb.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_rvrt_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} value
  */
  constructor(t) {
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ad = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0));
class l {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(l.prototype);
    return r.__wbg_ptr = t, ad.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ad.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_regid_free(t);
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
    return r === 0 ? void 0 : l.__wrap(r);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = c.regid_bal();
    return l.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = c.regid_cgas();
    return l.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = c.regid_err();
    return l.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = c.regid_flag();
    return l.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = c.regid_fp();
    return l.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = c.regid_ggas();
    return l.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = c.regid_hp();
    return l.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = c.regid_is();
    return l.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = c.regid_of();
    return l.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = c.regid_one();
    return l.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = c.regid_pc();
    return l.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = c.regid_ret();
    return l.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = c.regid_retl();
    return l.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = c.regid_sp();
    return l.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = c.regid_spp();
    return l.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = c.regid_writable();
    return l.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = c.regid_zero();
    return l.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const r = c.regid_new_typescript(t);
    return this.__wbg_ptr = r >>> 0, this;
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
const $b = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0));
class Kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $b.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_s256_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} src_addr
  * @param {RegId} len
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const tI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sb_free(e >>> 0));
class eI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sb_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {RegId} value
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const rI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_scwq_free(e >>> 0));
class nI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_scwq_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} key_addr
  * @param {RegId} status
  * @param {RegId} lenq
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const sI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0));
class iI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sll_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const oI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0));
class aI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, oI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_slli_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const cI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_smo_free(e >>> 0));
class dI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_smo_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} recipient_addr
  * @param {RegId} data_addr
  * @param {RegId} data_len
  * @param {RegId} coins
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const uI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srl_free(e >>> 0));
class _I {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srl_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const hI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srli_free(e >>> 0));
class lI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srli_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const fI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srw_free(e >>> 0));
class AI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srw_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} status
  * @param {RegId} key_addr
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const pI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srwq_free(e >>> 0));
class gI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srwq_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst_addr
  * @param {RegId} status
  * @param {RegId} key_addr
  * @param {RegId} lenq
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sub_free(e >>> 0));
class mI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sub_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_subi_free(e >>> 0));
class bI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_subi_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const II = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sw_free(e >>> 0));
class EI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, II.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sw_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} addr
  * @param {RegId} value
  * @param {Imm12} offset
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
const vI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sww_free(e >>> 0));
class CI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sww_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} key_addr
  * @param {RegId} status
  * @param {RegId} value
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const BI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_swwq_free(e >>> 0));
class xI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, BI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_swwq_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} key_addr
  * @param {RegId} status
  * @param {RegId} src_addr
  * @param {RegId} lenq
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const RI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_time_free(e >>> 0));
class SI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, RI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_time_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} heigth
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const NI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tr_free(e >>> 0));
class TI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, NI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tr_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} contract_id_addr
  * @param {RegId} amount
  * @param {RegId} asset_id_addr
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const DI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tro_free(e >>> 0));
class QI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, DI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tro_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} contract_id_addr
  * @param {RegId} output_index
  * @param {RegId} amount
  * @param {RegId} asset_id_addr
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const FI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdam_free(e >>> 0));
class MI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, FI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdam_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} add_lhs
  * @param {RegId} add_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0));
class Ks {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ks.prototype);
    return r.__wbg_ptr = t, cd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdcm_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Fr);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0));
class ti {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ti.prototype);
    return r.__wbg_ptr = t, dd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wddv_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, ds);
    var u = s.__destroy_into_raw();
    const f = c.wddv_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const OI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0));
class LI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, OI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmd_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} divisor
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0));
class ei {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ei.prototype);
    return r.__wbg_ptr = t, ud.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ud.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdml_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, _s);
    var u = s.__destroy_into_raw();
    const f = c.wdml_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const kI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0));
class PI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmm_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const _d = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0));
class ri {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ri.prototype);
    return r.__wbg_ptr = t, _d.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _d.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdop_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, us);
    var u = s.__destroy_into_raw();
    const f = c.wdop_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const UI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqam_free(e >>> 0));
class zI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, UI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqam_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} add_lhs
  * @param {RegId} add_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0));
class ni {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ni.prototype);
    return r.__wbg_ptr = t, hd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqcm_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Fr);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0));
class si {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(si.prototype);
    return r.__wbg_ptr = t, ld.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ld.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqdv_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, ds);
    var u = s.__destroy_into_raw();
    const f = c.wddv_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const GI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0));
class WI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, GI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmd_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} divisor
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0));
class ii {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ii.prototype);
    return r.__wbg_ptr = t, fd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqml_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, _s);
    var u = s.__destroy_into_raw();
    const f = c.wdml_from_args(i, o, a, u);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const XI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0));
class HI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, XI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmm_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} mul_lhs
  * @param {RegId} mul_rhs
  * @param {RegId} modulo
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register D.
  * @returns {RegId}
  */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ad = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0));
class oi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(oi.prototype);
    return r.__wbg_ptr = t, Ad.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ad.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqop_free(t);
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, us);
    var u = s.__destroy_into_raw();
    const f = c.wdop_from_args(i, o, a, u);
    return oi.__wrap(f);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Qt);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 6-bit immediate value.
  * @returns {Imm06}
  */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Qt.__wrap(t);
  }
}
const YI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xor_free(e >>> 0));
class VI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, YI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xor_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register C.
  * @returns {RegId}
  */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ZI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xori_free(e >>> 0));
class JI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ZI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xori_free(t);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {Imm12} rhs
  */
  constructor(t, r, n) {
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the ID for register B.
  * @returns {RegId}
  */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
  * Access the 12-bit immediate value.
  * @returns {Imm12}
  */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return wt.__wrap(t);
  }
}
async function qI(e, t) {
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
function U0() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(eg(t, r));
  }, e;
}
function z0(e, t) {
  return c = e.exports, G0.__wbindgen_wasm_module = t, Pn = null, kn = null, c;
}
function jI(e) {
  if (c !== void 0) return c;
  const t = U0();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return z0(r, e);
}
async function G0(e) {
  if (c !== void 0) return c;
  const t = U0(), { instance: r, module: n } = await qI(await e, t);
  return z0(r, n);
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
    var f = new WebAssembly.Module(s);
    return n ? new WebAssembly.Instance(f, n) : f;
  }
}
function KI(e) {
  return $I(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP9AfsBAQMKBgEFBQUBBQEBAQEBAQECBQICAQMBAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAwEAAQEFBQEBAQEBAQEBAQECAQUFBQMCAQAAAQEBBQICAQEGAAYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBgMHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQMGAAMBAQEHAgIAAgAGAQQDAQMFCAEJCQMDAwUBAQEGBgYGBAQEBAQEBAQEBAQEBAQEBAQEBAYHBwICAgMHBwAIAAMEBQFwAQcHBQMBABEGCQF/AUGAgMAACwf4TM8FBm1lbW9yeQIAFl9fd2JnX2NvbXBhcmVhcmdzX2ZyZWUAexpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQA6Gl9fd2JnX3NldF9jb21wYXJlYXJnc19tb2RlACgiX193YmdfZ2V0X2NvbXBhcmVhcmdzX2luZGlyZWN0X3JocwA7Il9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAPBJjb21wYXJlYXJnc190b19pbW0ASRRjb21wYXJlYXJnc19mcm9tX2ltbQApFV9fd2JnX2dldF9tYXRoYXJnc19vcAA6FV9fd2JnX3NldF9tYXRoYXJnc19vcAAqEl9fd2JnX211bGFyZ3NfZnJlZQB8Hl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X3JocwA6Hl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwA9El9fd2JnX2RpdmFyZ3NfZnJlZQDYAR5fX3diZ19nZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMArwEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AE0XcGFuaWNpbnN0cnVjdGlvbl9yZWFzb24APxxwYW5pY2luc3RydWN0aW9uX2luc3RydWN0aW9uAEAMZ21fZnJvbV9hcmdzAMsBDWd0Zl9mcm9tX2FyZ3MAwwEHZ21fYXJncwB9CGd0Zl9hcmdzAFsOd2RjbV9mcm9tX2FyZ3MAJg53ZG9wX2Zyb21fYXJncwAmDndkbWxfZnJvbV9hcmdzAB4Od2Rkdl9mcm9tX2FyZ3MAwQEJd2RjbV9hcmdzABkJd3FjbV9hcmdzABoJd2RvcF9hcmdzABsJd3FvcF9hcmdzABwJd2RtbF9hcmdzABQJd3FtbF9hcmdzABUJd2Rkdl9hcmdzAFYJd3Fkdl9hcmdzAFcQX193YmdfaW1tMDZfZnJlZQDZARBfX3diZ19pbW0xMl9mcmVlANoBEF9fd2JnX2ltbTE4X2ZyZWUA2wEOX193YmdfYWRkX2ZyZWUAugEPX193Ymdfbm9vcF9mcmVlAFwSYWRkX25ld190eXBlc2NyaXB0AFAGYWRkX3JhABYGYWRkX3JiAAsGYWRkX3JjAA8DYWRkALsBA2FuZAB/A2RpdgCAAQJlcQCBAQNleHAAggECZ3QAgwECbHQAhAEEbWxvZwCFAQRtcm9vAIYBBG1vZF8AhwEFbW92ZV8ALANtdWwAiAEDbm90AC0Cb3IAiQEDc2xsAIoBA3NybACLAQNzdWIAjAEDeG9yAI0BBG1sZHYAXQNyZXQAsAEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAWAdhbG9jX3JhAE8EYWxvYwCxAQNtY2wALwNtY3AAjgEDbWVxAF4TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALIBBGJ1cm4AMQRjYWxsAF8DY2NwAGAEY3JvbwAyBGNzaXoAMwJjYgCzAQNsZGMAYQNsb2cAYgRsb2dkAGMEbWludAA0BHJ2cnQAtAEEc2N3cQCPAQNzcncAkAEEc3J3cQBkA3N3dwCRAQRzd3dxAGUCdHIAkgEDdHJvAGYEZWNrMQCTAQRlY3IxAJQBBGVkMTkAZwRrMjU2AJUBBHMyNTYAlgEEdGltZQA1E25vb3BfbmV3X3R5cGVzY3JpcHQAyAEEbm9vcADcAQRmbGFnALUBA2JhbACXAQNqbXAAtgEDam5lAJgBA3NtbwBoE2FkZGlfbmV3X3R5cGVzY3JpcHQAUQphZGRpX2ltbTEyAAwEYWRkaQCZAQRhbmRpAJoBBGRpdmkAmwEEZXhwaQCcAQRtb2RpAJ0BBG11bGkAngEDb3JpAJ8BBHNsbGkAoAEEc3JsaQChAQRzdWJpAKIBBHhvcmkAowEEam5laQCkAQJsYgClAQJsdwCmAQJzYgCnAQJzdwCoAQRtY3BpAKkBEmd0Zl9uZXdfdHlwZXNjcmlwdADFAQNndGYAqgEEbWNsaQAgEWdtX25ld190eXBlc2NyaXB0ADYIZ21faW1tMTgACQJnbQAhBG1vdmkAIgRqbnppACMEam1wZgAkE2ptcGJfbmV3X3R5cGVzY3JpcHQAFwRqbXBiACUEam56ZgCrAQRqbnpiAKwBBGpuZWYAaQpqbmViX2ltbTA2ABgEam5lYgBqAmppAEETY2ZlaV9uZXdfdHlwZXNjcmlwdAA4CmNmZWlfaW1tMjQAJwRjZmVpAEIEY2ZzaQBDA2NmZQC3AQNjZnMAuAEEcHNobABEBHBzaGgARQRwb3BsAEYEcG9waABHE3dkY21fbmV3X3R5cGVzY3JpcHQAwgEEd2RjbQBrBHdxY20AbAR3ZG9wAG0Ed3FvcABuBHdkbWwAbwR3cW1sAHAEd2RkdgBxBHdxZHYAcgR3ZG1kAHMEd3FtZAB0BHdkYW0AdQR3cWFtAHYEd2RtbQB3BHdxbW0AeARlY2FsAHkEYnNpegA3E2JsZGRfbmV3X3R5cGVzY3JpcHQATgdibGRkX3JkABgEYmxkZAB6Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWhRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7gERcmVnaWRfbmV3X2NoZWNrZWQArQEJcmVnaWRfYmFsAN0BCnJlZ2lkX2NnYXMA3gEJcmVnaWRfZXJyAN8BCnJlZ2lkX2ZsYWcA4AEIcmVnaWRfZnAA4QEKcmVnaWRfZ2dhcwDiAQhyZWdpZF9ocADjAQhyZWdpZF9pcwDkAQhyZWdpZF9vZgDlAQlyZWdpZF9vbmUA5gEIcmVnaWRfcGMA5wEJcmVnaWRfcmV0AOgBCnJlZ2lkX3JldGwA6QEIcmVnaWRfc3AA6gEJcmVnaWRfc3BwAOsBDnJlZ2lkX3dyaXRhYmxlAOwBCnJlZ2lkX3plcm8A7QEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA1QELcmVnaWRfdG9fdTgA1gETbW92aV9uZXdfdHlwZXNjcmlwdAAXE21jbGlfbmV3X3R5cGVzY3JpcHQAFxNqbnppX25ld190eXBlc2NyaXB0ABcTam1wZl9uZXdfdHlwZXNjcmlwdAAXEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxNic2l6X25ld190eXBlc2NyaXB0AB8ScmV0X25ld190eXBlc2NyaXB0AFgTYmhlaV9uZXdfdHlwZXNjcmlwdABYEWNiX25ld190eXBlc2NyaXB0AFgTcnZydF9uZXdfdHlwZXNjcmlwdABYE2ZsYWdfbmV3X3R5cGVzY3JpcHQAWBJqbXBfbmV3X3R5cGVzY3JpcHQAWBJjZmVfbmV3X3R5cGVzY3JpcHQAWBJjZnNfbmV3X3R5cGVzY3JpcHQAWBNtbGR2X25ld190eXBlc2NyaXB0AE4SbWVxX25ld190eXBlc2NyaXB0AE4SY2NwX25ld190eXBlc2NyaXB0AE4SbG9nX25ld190eXBlc2NyaXB0AE4TbG9nZF9uZXdfdHlwZXNjcmlwdABOE3Nyd3FfbmV3X3R5cGVzY3JpcHQAThNzd3dxX25ld190eXBlc2NyaXB0AE4SdHJvX25ld190eXBlc2NyaXB0AE4TZWQxOV9uZXdfdHlwZXNjcmlwdABOEnNtb19uZXdfdHlwZXNjcmlwdABOEmxkY19uZXdfdHlwZXNjcmlwdABOE2puZWZfbmV3X3R5cGVzY3JpcHQAThN3ZG1kX25ld190eXBlc2NyaXB0AE4Td3FtZF9uZXdfdHlwZXNjcmlwdABOE3dkYW1fbmV3X3R5cGVzY3JpcHQAThN3cWFtX25ld190eXBlc2NyaXB0AE4Td2RtbV9uZXdfdHlwZXNjcmlwdABOE3dxbW1fbmV3X3R5cGVzY3JpcHQAThNlY2FsX25ld190eXBlc2NyaXB0AE4TY2FsbF9uZXdfdHlwZXNjcmlwdABOEmFuZF9uZXdfdHlwZXNjcmlwdABQEmRpdl9uZXdfdHlwZXNjcmlwdABQEWVxX25ld190eXBlc2NyaXB0AFASZXhwX25ld190eXBlc2NyaXB0AFARZ3RfbmV3X3R5cGVzY3JpcHQAUBFsdF9uZXdfdHlwZXNjcmlwdABQE21sb2dfbmV3X3R5cGVzY3JpcHQAUBNtcm9vX25ld190eXBlc2NyaXB0AFASbW9kX25ld190eXBlc2NyaXB0AFASbXVsX25ld190eXBlc2NyaXB0AFARb3JfbmV3X3R5cGVzY3JpcHQAUBJzbGxfbmV3X3R5cGVzY3JpcHQAUBJzcmxfbmV3X3R5cGVzY3JpcHQAUBJzdWJfbmV3X3R5cGVzY3JpcHQAUBJ4b3JfbmV3X3R5cGVzY3JpcHQAUBJtY3BfbmV3X3R5cGVzY3JpcHQAUBNzY3dxX25ld190eXBlc2NyaXB0AFASc3J3X25ld190eXBlc2NyaXB0AFASc3d3X25ld190eXBlc2NyaXB0AFARdHJfbmV3X3R5cGVzY3JpcHQAUBNlY2sxX25ld190eXBlc2NyaXB0AFATZWNyMV9uZXdfdHlwZXNjcmlwdABQE2syNTZfbmV3X3R5cGVzY3JpcHQAUBNzMjU2X25ld190eXBlc2NyaXB0AFASYmFsX25ld190eXBlc2NyaXB0AFASam5lX25ld190eXBlc2NyaXB0AFATYW5kaV9uZXdfdHlwZXNjcmlwdABRE2RpdmlfbmV3X3R5cGVzY3JpcHQAURNleHBpX25ld190eXBlc2NyaXB0AFETbW9kaV9uZXdfdHlwZXNjcmlwdABRE211bGlfbmV3X3R5cGVzY3JpcHQAURJvcmlfbmV3X3R5cGVzY3JpcHQAURNzbGxpX25ld190eXBlc2NyaXB0AFETc3JsaV9uZXdfdHlwZXNjcmlwdABRE3N1YmlfbmV3X3R5cGVzY3JpcHQAURN4b3JpX25ld190eXBlc2NyaXB0AFETam5laV9uZXdfdHlwZXNjcmlwdABREWxiX25ld190eXBlc2NyaXB0AFERbHdfbmV3X3R5cGVzY3JpcHQAURFzYl9uZXdfdHlwZXNjcmlwdABREXN3X25ld190eXBlc2NyaXB0AFETbWNwaV9uZXdfdHlwZXNjcmlwdABRE2puemZfbmV3X3R5cGVzY3JpcHQAURNqbnpiX25ld190eXBlc2NyaXB0AFEOd3FjbV9mcm9tX2FyZ3MAJg53cW9wX2Zyb21fYXJncwAmH19fd2JnX3NldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAPB5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMAPB5fX3diZ19zZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAPBFqaV9uZXdfdHlwZXNjcmlwdAA4E2Nmc2lfbmV3X3R5cGVzY3JpcHQAOBNwc2hsX25ld190eXBlc2NyaXB0ADgTcHNoaF9uZXdfdHlwZXNjcmlwdAA4E3BvcGxfbmV3X3R5cGVzY3JpcHQAOBNwb3BoX25ld190eXBlc2NyaXB0ADgTd3FvcF9uZXdfdHlwZXNjcmlwdADCARN3ZG1sX25ld190eXBlc2NyaXB0AMIBE3dkZHZfbmV3X3R5cGVzY3JpcHQAwgETd2RvcF9uZXdfdHlwZXNjcmlwdADCARN3cW1sX25ld190eXBlc2NyaXB0AMIBDndxbWxfZnJvbV9hcmdzAB4Td3Fkdl9uZXdfdHlwZXNjcmlwdADCAQ53cWR2X2Zyb21fYXJncwDBARN3cWNtX25ld190eXBlc2NyaXB0AMIBEF9fd2JnX3JlZ2lkX2ZyZWUA2QEQX193YmdfaW1tMjRfZnJlZQDbAQ5fX3diZ19tdWxfZnJlZQC6AQZqbXBfcmEATw5fX3diZ19qbXBfZnJlZQC6AQZjZmVfcmEATw5fX3diZ19jZmVfZnJlZQC6AQ1fX3diZ19nbV9mcmVlALoBD19fd2JnX2puemlfZnJlZQC6AQ9fX3diZ193ZGNtX2ZyZWUAugEOX193Ymdfc3J3X2ZyZWUAugEPX193YmdfbG9nZF9mcmVlALoBDl9fd2JnX3NybF9mcmVlALoBD19fd2JnX2Nyb29fZnJlZQC6AQ9fX3diZ19yZXRkX2ZyZWUAugEPX193Ymdfd3FtbV9mcmVlALoBDV9fd2JnX3NiX2ZyZWUAugEPX193YmdfdGltZV9mcmVlALoBD19fd2JnX3dxbWxfZnJlZQC6AQ9fX3diZ19zdWJpX2ZyZWUAugEOX193Ymdfc3ViX2ZyZWUAugEOX193Ymdfbm90X2ZyZWUAugENX193YmdfbGJfZnJlZQC6AQ9fX3diZ193cWFtX2ZyZWUAugEPX193YmdfczI1Nl9mcmVlALoBBWNiX3JhAE8NX193YmdfY2JfZnJlZQC6AQ9fX3diZ19wb3BoX2ZyZWUAugEPX193YmdfZGl2aV9mcmVlALoBD19fd2JnX21vZGlfZnJlZQC6AQ5fX3diZ19zd3dfZnJlZQC6AQ5fX3diZ19ndGZfZnJlZQC6AQpwb3BoX2ltbTI0ACcNX193YmdfamlfZnJlZQC6AQ9fX3diZ19zcndxX2ZyZWUAugEPX193Ymdfam1wZl9mcmVlALoBD19fd2JnX2syNTZfZnJlZQC6AQ9fX3diZ193ZG9wX2ZyZWUAugEPX193YmdfYW5kaV9mcmVlALoBD19fd2JnX3NsbGlfZnJlZQC6AQ5fX3diZ19tb2RfZnJlZQC6AQpwb3BsX2ltbTI0ACcPX193YmdfcG9wbF9mcmVlALoBD19fd2JnX2Fsb2NfZnJlZQC6AQ9fX3diZ193ZG1kX2ZyZWUAugEPX193YmdfbWxkdl9mcmVlALoBDV9fd2JnX3N3X2ZyZWUAugEPX193Ymdfam5lYl9mcmVlALoBDl9fd2JnX3Ryb19mcmVlALoBDl9fd2JnX29yaV9mcmVlALoBDl9fd2JnX3NsbF9mcmVlALoBD19fd2JnX3dxZHZfZnJlZQC6AQ9fX3diZ193cW1kX2ZyZWUAugEOX193Ymdfam5lX2ZyZWUAugEPX193YmdfbWxvZ19mcmVlALoBD19fd2JnX21pbnRfZnJlZQC6AQ9fX3diZ193cWNtX2ZyZWUAugEPX193YmdfbXVsaV9mcmVlALoBHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwA7D19fd2JnX21jbGlfZnJlZQC6AQ9fX3diZ19qbmVpX2ZyZWUAugEPX193YmdfY3Npel9mcmVlALoBDV9fd2JnX3RyX2ZyZWUAugEPX193YmdfYmxkZF9mcmVlALoBD19fd2JnX2V4cGlfZnJlZQC6AQ9fX3diZ194b3JpX2ZyZWUAugENX193Ymdfb3JfZnJlZQC6AQ9fX3diZ19lY2sxX2ZyZWUAugEHYmhlaV9yYQBPD19fd2JnX2JoZWlfZnJlZQC6AQhqaV9pbW0yNAAnD19fd2JnX2Nmc2lfZnJlZQC6AQ5fX3diZ19tY2xfZnJlZQC6AQ9fX3diZ19qbnpmX2ZyZWUAugEPX193Ymdfc3d3cV9mcmVlALoBDV9fd2JnX2d0X2ZyZWUAugEPX193Ymdfam1wYl9mcmVlALoBDl9fd2JnX2Rpdl9mcmVlALoBD19fd2JnX2J1cm5fZnJlZQC6AR9fX3diZ19nZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADsOX193YmdfeG9yX2ZyZWUAugEHcnZydF9yYQBPD19fd2JnX3J2cnRfZnJlZQC6AQZyZXRfcmEATw5fX3diZ19yZXRfZnJlZQC6AQ9fX3diZ193ZG1sX2ZyZWUAugEPX193YmdfY2FsbF9mcmVlALoBD19fd2JnX3dkbW1fZnJlZQC6AQ9fX3diZ19tY3BpX2ZyZWUAugEPX193YmdfYWRkaV9mcmVlALoBD19fd2JnX2puemJfZnJlZQC6AQ9fX3diZ19tcm9vX2ZyZWUAugEOX193YmdfZXhwX2ZyZWUAugEOX193YmdfYmFsX2ZyZWUAugEGY2ZzX3JhAE8OX193YmdfY2ZzX2ZyZWUAugEPX193YmdfZWQxOV9mcmVlALoBD19fd2JnX3NybGlfZnJlZQC6AQpwc2hsX2ltbTI0ACcPX193YmdfcHNobF9mcmVlALoBDl9fd2JnX21lcV9mcmVlALoBD19fd2JnX2Joc2hfZnJlZQC6AQ5fX3diZ19sZGNfZnJlZQC6AQ9fX3diZ19qbmVmX2ZyZWUAugEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC6AQ9fX3diZ193ZGFtX2ZyZWUAugEOX193YmdfbWNwX2ZyZWUAugENX193YmdfbHRfZnJlZQC6AQ9fX3diZ193cW9wX2ZyZWUAugEOX193YmdfYW5kX2ZyZWUAugEPX193YmdfYnNpel9mcmVlALoBD19fd2JnX3dkZHZfZnJlZQC6AQ9fX3diZ19lY2FsX2ZyZWUAugEKY2ZzaV9pbW0yNAAnD19fd2JnX2NmZWlfZnJlZQC6AQ9fX3diZ19lY3IxX2ZyZWUAugEPX193YmdfbW92aV9mcmVlALoBB2ZsYWdfcmEATw9fX3diZ19mbGFnX2ZyZWUAugEPX193YmdfbW92ZV9mcmVlALoBD19fd2JnX3Njd3FfZnJlZQC6AQ1fX3diZ19lcV9mcmVlALoBDl9fd2JnX3Ntb19mcmVlALoBDl9fd2JnX2xvZ19mcmVlALoBDl9fd2JnX2NjcF9mcmVlALoBDV9fd2JnX2x3X2ZyZWUAugETam5lYl9uZXdfdHlwZXNjcmlwdABOCndxZHZfaW1tMDYAGAp3cW1sX2ltbTA2ABgKd2RtbF9pbW0wNgAYCndxb3BfaW1tMDYAGAp3ZG9wX2ltbTA2ABgKd3FjbV9pbW0wNgAYCndkZHZfaW1tMDYAGAp3ZGNtX2ltbTA2ABgKam5lZl9pbW0wNgAYCWxkY19pbW0wNgAYBm11bF9yYQAWB3dkY21fcmMADwd3ZGNtX3JiAAsHd2RjbV9yYQAWBnNyd19yYwAPBnNyd19yYgALBnNyd19yYQAWBm11bF9yYwAPBm11bF9yYgALB2xvZ2RfcmEAFgZzcmxfcmMADwZzcmxfcmIACwZzcmxfcmEAFgdsb2dkX3JiAAsHam56aV9yYQAWB3JldGRfcmIACwdyZXRkX3JhABYHd3FtbV9yZAAYB3dxbW1fcmMADwd3cW1tX3JiAAsHd3FtbV9yYQAWBXNiX3JiAAsFc2JfcmEAFgd0aW1lX3JiAAsHdGltZV9yYQAWB3dxbWxfcmMADwd3cW1sX3JiAAsHd3FtbF9yYQAWCnN1YmlfaW1tMTIADAdzdWJpX3JiAAsHc3ViaV9yYQAWBnN1Yl9yYwAPBnN1Yl9yYgALBnN1Yl9yYQAWBm5vdF9yYgALBm5vdF9yYQAWCHNiX2ltbTEyAAwFbGJfcmIACwVsYl9yYQAWB3dxYW1fcmQAGAd3cWFtX3JjAA8Hd3FhbV9yYgALB3dxYW1fcmEAFgdzMjU2X3JjAA8HczI1Nl9yYgALB3MyNTZfcmEAFghsYl9pbW0xMgAMB2RpdmlfcmIACwdkaXZpX3JhABYKbW9kaV9pbW0xMgAMB21vZGlfcmIACwdtb2RpX3JhABYGc3d3X3JjAA8Gc3d3X3JiAAsGc3d3X3JhABYJZ3RmX2ltbTEyAAwGZ3RmX3JiAAsGZ3RmX3JhABYHc3J3cV9yZAAYB3Nyd3FfcmMADwdzcndxX3JiAAsHc3J3cV9yYQAWCmpuemlfaW1tMTgACQdqbXBmX3JhABYHbG9nZF9yYwAPB2syNTZfcmIACwdrMjU2X3JhABYHd2RvcF9yYwAPB3dkb3BfcmIACwd3ZG9wX3JhABYKZGl2aV9pbW0xMgAMB2Nyb29fcmIACwdjcm9vX3JhABYKc2xsaV9pbW0xMgAMB3NsbGlfcmIACwdzbGxpX3JhABYGbW9kX3JjAA8GbW9kX3JiAAsGbW9kX3JhABYKYW5kaV9pbW0xMgAMB2FuZGlfcmIACwdhbmRpX3JhABYHd2RtZF9yZAAYB3dkbWRfcmMADwd3ZG1kX3JiAAsHd2RtZF9yYQAWB21sZHZfcmQAGAdtbGR2X3JjAA8HbWxkdl9yYgALB21sZHZfcmEAFghzd19pbW0xMgAMBXN3X3JiAAsFc3dfcmEAFgdrMjU2X3JjAA8Ham5lYl9yYgALB2puZWJfcmEAFgZ0cm9fcmQAGAZ0cm9fcmMADwZ0cm9fcmIACwZ0cm9fcmEAFglvcmlfaW1tMTIADAZvcmlfcmIACwZvcmlfcmEAFgZzbGxfcmMADwZzbGxfcmIACwZzbGxfcmEAFgd3cWR2X3JjAA8Hd3Fkdl9yYgALB3dxZHZfcmEAFgd3cW1kX3JkABgHd3FtZF9yYwAPB3dxbWRfcmIACwd3cW1kX3JhABYHam5lYl9yYwAPBmpuZV9yYgALBmpuZV9yYQAWB21sb2dfcmMADwdtbG9nX3JiAAsHbWxvZ19yYQAWB21pbnRfcmIACwdtaW50X3JhABYHd3FjbV9yYwAPB3dxY21fcmIACwd3cWNtX3JhABYKbXVsaV9pbW0xMgAMB211bGlfcmIACwdtdWxpX3JhABYKbWNsaV9pbW0xOAAJB21jbGlfcmEAFgpqbmVpX2ltbTEyAAwHam5laV9yYgALB2puZWlfcmEAFgdjc2l6X3JiAAsHY3Npel9yYQAWBXRyX3JjAA8FdHJfcmIACwV0cl9yYQAWB2xvZ2RfcmQAGAZqbmVfcmMADwdibGRkX3JiAAsHYmxkZF9yYQAWCmV4cGlfaW1tMTIADAdleHBpX3JiAAsHZXhwaV9yYQAWCnhvcmlfaW1tMTIADAd4b3JpX3JiAAsHeG9yaV9yYQAWBW9yX3JjAA8Fb3JfcmIACwVvcl9yYQAWB2VjazFfcmMADwdlY2sxX3JiAAsHZWNrMV9yYQAWBm1jbF9yYgALBm1jbF9yYQAWCmpuemZfaW1tMTIADAdqbnpmX3JiAAsHam56Zl9yYQAWB3N3d3FfcmQAGAdzd3dxX3JjAA8Hc3d3cV9yYgALB3N3d3FfcmEAFgVndF9yYwAPBWd0X3JiAAsFZ3RfcmEAFgpqbXBmX2ltbTE4AAkHam1wYl9yYQAWBmRpdl9yYwAPBmRpdl9yYgALBmRpdl9yYQAWB2J1cm5fcmIACwdidXJuX3JhABYTX193YmdfbWF0aGFyZ3NfZnJlZQB7Bnhvcl9yYwAPBnhvcl9yYgALBnhvcl9yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWB2NhbGxfcmQAGAdjYWxsX3JjAA8HY2FsbF9yYgALB2NhbGxfcmEAFgd3ZG1tX3JkABgHd2RtbV9yYwAPB3dkbW1fcmIACwd3ZG1tX3JhABYKbWNwaV9pbW0xMgAMB21jcGlfcmIACwdtY3BpX3JhABYHYmxkZF9yYwAPB2FkZGlfcmIACwdhZGRpX3JhABYKam56Yl9pbW0xMgAMB2puemJfcmIACwdqbnpiX3JhABYHbXJvb19yYwAPB21yb29fcmIACwdtcm9vX3JhABYGZXhwX3JjAA8GZXhwX3JiAAsGZXhwX3JhABYGYmFsX3JjAA8GYmFsX3JiAAsGYmFsX3JhABYHZWQxOV9yZAAYB2VkMTlfcmMADwdlZDE5X3JiAAsHZWQxOV9yYQAWCnNybGlfaW1tMTIADAdzcmxpX3JiAAsHc3JsaV9yYQAWBm1lcV9yZAAYBm1lcV9yYwAPBm1lcV9yYgALBm1lcV9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYGbGRjX3JjAA8GbGRjX3JiAAsGbGRjX3JhABYHam5lZl9yYwAPB2puZWZfcmIACwdqbmVmX3JhABYHd2RhbV9yZAAYB3dkYW1fcmMADwd3ZGFtX3JiAAsHd2RhbV9yYQAWBm1jcF9yYwAPBm1jcF9yYgALBm1jcF9yYQAWBWx0X3JjAA8FbHRfcmIACwVsdF9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWBmFuZF9yYwAPBmFuZF9yYgALBmFuZF9yYQAWB2JzaXpfcmIACwdic2l6X3JhABYHd2Rkdl9yYwAPB3dkZHZfcmIACwd3ZGR2X3JhABYHZWNhbF9yZAAYB2VjYWxfcmMADwdlY2FsX3JiAAsHZWNhbF9yYQAWB2VjcjFfcmMADwdlY3IxX3JiAAsHZWNyMV9yYQAWCm1vdmlfaW1tMTgACQdtb3ZpX3JhABYKam1wYl9pbW0xOAAJBWdtX3JhABYHbW92ZV9yYgALB21vdmVfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgVlcV9yYwAPBWVxX3JiAAsFZXFfcmEAFgZzbW9fcmQAGAZzbW9fcmMADwZzbW9fcmIACwZzbW9fcmEAFgZsb2dfcmQAGAZsb2dfcmMADwZsb2dfcmIACwZsb2dfcmEAFgZjY3BfcmQAGAZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFghsd19pbW0xMgAMBWx3X3JiAAsFbHdfcmEAFhtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAugEfX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcgDOARNfX3diaW5kZ2VuX2V4cG9ydF8wAM0BCREBAEEBCwYC0QHSAdMB7wHMAQrygQH7AYkjAgh/AX4CQAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQUgAEELaiIAQXhxIQVBgI3AACgCACIIRQ0EQQAgBWshBAJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRB5InAAGooAgAiAUUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEDA0ACQCABKAIEQXhxIgYgBUkNACAGIAVrIgYgBE8NACABIQIgBiIEDQBBACEEIAEhAAwECyABQRRqKAIAIgYgACAGIAEgA0EddkEEcWpBEGooAgAiAUcbIAAgBhshACADQQF0IQMgAQ0ACwwBC0H8jMAAKAIAIgJBECAAQQtqQXhxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIBQQN0IgBB9IrAAGoiAyAAQfyKwABqKAIAIgAoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQfyMwAAgAkF+IAF3cTYCAAsgACABQQN0IgFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMCAsgBUGEjcAAKAIATQ0DAkACQCABRQRAQYCNwAAoAgAiAEUNBiAAaEECdEHkicAAaigCACIBKAIEQXhxIAVrIQQgASECA0ACQCABKAIQIgANACABQRRqKAIAIgANACACKAIYIQcCQAJAIAIgAigCDCIARgRAIAJBFEEQIAJBFGoiACgCACIDG2ooAgAiAQ0BQQAhAAwCCyACKAIIIgEgADYCDCAAIAE2AggMAQsgACACQRBqIAMbIQMDQCADIQYgASIAQRRqIgEgAEEQaiABKAIAIgEbIQMgAEEUQRAgARtqKAIAIgENAAsgBkEANgIACyAHRQ0EIAIgAigCHEECdEHkicAAaiIBKAIARwRAIAdBEEEUIAcoAhAgAkYbaiAANgIAIABFDQUMBAsgASAANgIAIAANA0GAjcAAQYCNwAAoAgBBfiACKAIcd3E2AgAMBAsgACgCBEF4cSAFayIBIAQgASAESSIBGyEEIAAgAiABGyECIAAhAQwACwALAkBBAiAAdCIDQQAgA2tyIAEgAHRxaCIAQQN0IgFB9IrAAGoiAyABQfyKwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQfyMwAAgAkF+IAB3cTYCAAsgASAFQQNyNgIEIAEgBWoiBiAAQQN0IgAgBWsiBEEBcjYCBCAAIAFqIAQ2AgBBhI3AACgCACICBEAgAkF4cUH0isAAaiEAQYyNwAAoAgAhAwJ/QfyMwAAoAgAiBUEBIAJBA3Z0IgJxRQRAQfyMwAAgAiAFcjYCACAADAELIAAoAggLIQIgACADNgIIIAIgAzYCDCADIAA2AgwgAyACNgIIC0GMjcAAIAY2AgBBhI3AACAENgIAIAFBCGoPCyAAIAc2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAkEUaigCACIBRQ0AIABBFGogATYCACABIAA2AhgLAkACQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiBSAEQQFyNgIEIAQgBWogBDYCAEGEjcAAKAIAIgNFDQEgA0F4cUH0isAAaiEAQYyNwAAoAgAhAQJ/QfyMwAAoAgAiBkEBIANBA3Z0IgNxRQRAQfyMwAAgAyAGcjYCACAADAELIAAoAggLIQMgACABNgIIIAMgATYCDCABIAA2AgwgASADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIEDAELQYyNwAAgBTYCAEGEjcAAIAQ2AgALIAJBCGoPCyAAIAJyRQRAQQAhAkECIAd0IgBBACAAa3IgCHEiAEUNAyAAaEECdEHkicAAaigCACEACyAARQ0BCwNAIAAgAiAAKAIEQXhxIgMgBWsiBiAESSIHGyEIIAAoAhAiAUUEQCAAQRRqKAIAIQELIAIgCCADIAVJIgAbIQIgBCAGIAQgBxsgABshBCABIgANAAsLIAJFDQAgBUGEjcAAKAIAIgBNIAQgACAFa09xDQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNAyACIAIoAhxBAnRB5InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0EDAMLIAEgADYCACAADQJBgI3AAEGAjcAAKAIAQX4gAigCHHdxNgIADAMLAkACQAJAAkACQCAFQYSNwAAoAgAiAUsEQCAFQYiNwAAoAgAiAE8EQEEAIQQgBUGvgARqIgBBEHZAACIBQX9GIgMNByABQRB0IgJFDQdBlI3AAEEAIABBgIB8cSADGyIEQZSNwAAoAgBqIgA2AgBBmI3AAEGYjcAAKAIAIgEgACAAIAFJGzYCAAJAAkBBkI3AACgCACIDBEBB5IrAACEAA0AgACgCACIBIAAoAgQiBmogAkYNAiAAKAIIIgANAAsMAgtBoI3AACgCACIAQQAgACACTRtFBEBBoI3AACACNgIAC0GkjcAAQf8fNgIAQeiKwAAgBDYCAEHkisAAIAI2AgBBgIvAAEH0isAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQbiLwABBrIvAADYCAEGsi8AAQaSLwAA2AgBB8IrAAEEANgIAQcCLwABBtIvAADYCAEG0i8AAQayLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEH0i8AAQeyLwAA2AgBBgIzAAEH0i8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEH4jMAAQeyMwAA2AgBB7IzAAEHkjMAANgIAQZCNwAAgAjYCAEH0jMAAQeyMwAA2AgBBiI3AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGcjcAAQYCAgAE2AgAMCAsgAiADTSABIANLcg0AIAAoAgxFDQMLQaCNwABBoI3AACgCACIAIAIgACACSRs2AgAgAiAEaiEBQeSKwAAhAAJAAkADQCABIAAoAgBHBEAgACgCCCIADQEMAgsLIAAoAgxFDQELQeSKwAAhAANAAkAgAyAAKAIAIgFPBEAgASAAKAIEaiIGIANLDQELIAAoAgghAAwBCwtBkI3AACACNgIAQYiNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBnI3AAEGAgIABNgIAIAMgBkEga0F4cUEIayIAIAAgA0EQakkbIgFBGzYCBEHkisAAKQIAIQkgAUEQakHsisAAKQIANwIAIAEgCTcCCEHoisAAIAQ2AgBB5IrAACACNgIAQeyKwAAgAUEIajYCAEHwisAAQQA2AgAgAUEcaiEAA0AgAEEHNgIAIABBBGoiACAGSQ0ACyABIANGDQcgASABKAIEQX5xNgIEIAMgASADayIAQQFyNgIEIAEgADYCACAAQYACTwRAIAMgABAIDAgLIABBeHFB9IrAAGohAQJ/QfyMwAAoAgAiAkEBIABBA3Z0IgBxRQRAQfyMwAAgACACcjYCACABDAELIAEoAggLIQAgASADNgIIIAAgAzYCDCADIAE2AgwgAyAANgIIDAcLIAAgAjYCACAAIAAoAgQgBGo2AgQgAiAFQQNyNgIEIAEgAiAFaiIDayEFIAFBkI3AACgCAEYNAyABQYyNwAAoAgBGDQQgASgCBCIEQQNxQQFGBEAgASAEQXhxIgAQByAAIAVqIQUgACABaiIBKAIEIQQLIAEgBEF+cTYCBCADIAVBAXI2AgQgAyAFaiAFNgIAIAVBgAJPBEAgAyAFEAgMBgsgBUF4cUH0isAAaiEAAn9B/IzAACgCACIBQQEgBUEDdnQiBHFFBEBB/IzAACABIARyNgIAIAAMAQsgACgCCAshBSAAIAM2AgggBSADNgIMIAMgADYCDCADIAU2AggMBQtBiI3AACAAIAVrIgE2AgBBkI3AAEGQjcAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGohBAwGC0GMjcAAKAIAIQACQCABIAVrIgJBD00EQEGMjcAAQQA2AgBBhI3AAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0GEjcAAIAI2AgBBjI3AACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLDAgLIAAgBCAGajYCBEGQjcAAQZCNwAAoAgAiAEEPakF4cSIBQQhrIgI2AgBBiI3AAEGIjcAAKAIAIARqIgMgACABa2pBCGoiATYCACACIAFBAXI2AgQgACADakEoNgIEQZyNwABBgICAATYCAAwDC0GQjcAAIAM2AgBBiI3AAEGIjcAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEDAELQYyNwAAgAzYCAEGEjcAAQYSNwAAoAgAgBWoiADYCACADIABBAXI2AgQgACADaiAANgIACyACQQhqDwtBACEEQYiNwAAoAgAiACAFTQ0AQYiNwAAgACAFayIBNgIAQZCNwABBkI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBAwDCyAEDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAIARBEE8EQCACIAVBA3I2AgQgAiAFaiIBIARBAXI2AgQgASAEaiAENgIAIARBgAJPBEAgASAEEAgMAgsgBEF4cUH0isAAaiEAAn9B/IzAACgCACIDQQEgBEEDdnQiBHFFBEBB/IzAACADIARyNgIAIAAMAQsgACgCCAshBCAAIAE2AgggBCABNgIMIAEgADYCDCABIAQ2AggMAQsgAiAEIAVqIgBBA3I2AgQgACACaiIAIAAoAgRBAXI2AgQLIAJBCGoPCyAAQQhqC+0LAQt/IAAoAgQhByAAKAIAIQUCQAJAAkAgASgCACIKIAEoAggiAHIEQAJAIABFDQAgBSAHaiEJIAFBDGooAgBBAWohBiAFIQIDQAJAIAIhACAGQQFrIgZFDQAgACAJRg0CAn8gACwAACIEQQBOBEAgBEH/AXEhBCAAQQFqDAELIAAtAAFBP3EhCCAEQR9xIQIgBEFfTQRAIAJBBnQgCHIhBCAAQQJqDAELIAAtAAJBP3EgCEEGdHIhCCAEQXBJBEAgCCACQQx0ciEEIABBA2oMAQsgAkESdEGAgPAAcSAALQADQT9xIAhBBnRyciIEQYCAxABGDQMgAEEEagsiAiADIABraiEDIARBgIDEAEcNAQwCCwsgACAJRg0AIAAsAAAiAkEATiACQWBJciACQXBJckUEQCACQf8BcUESdEGAgPAAcSAALQADQT9xIAAtAAJBP3FBBnQgAC0AAUE/cUEMdHJyckGAgMQARg0BCwJAAkAgA0UNACADIAdPBEBBACEAIAMgB0YNAQwCC0EAIQAgAyAFaiwAAEFASA0BCyAFIQALIAMgByAAGyEHIAAgBSAAGyEFCyAKRQ0DIAEoAgQhCyAHQRBPBEAgByAFIAVBA2pBfHEiBGsiBmoiCkEDcSEIQQAhCUEAIQAgBCAFRwRAIAQgBUF/c2pBA08EQEEAIQMDQCAAIAMgBWoiAiwAAEG/f0pqIAJBAWosAABBv39KaiACQQJqLAAAQb9/SmogAkEDaiwAAEG/f0pqIQAgA0EEaiIDDQALCyAFIQIDQCAAIAIsAABBv39KaiEAIAJBAWohAiAGQQFqIgYNAAsLAkAgCEUNACAEIApBfHFqIgIsAABBv39KIQkgCEEBRg0AIAkgAiwAAUG/f0pqIQkgCEECRg0AIAkgAiwAAkG/f0pqIQkLIApBAnYhCCAAIAlqIQMDQCAEIQYgCEUNBEHAASAIIAhBwAFPGyIJQQNxIQogCUECdCEEQQAhAiAJQQRPBEAgBiAEQfAHcWohDCAGIQADQCACIAAoAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEEaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQhqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBDGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWohAiAAQRBqIgAgDEcNAAsLIAggCWshCCAEIAZqIQQgAkEIdkH/gfwHcSACQf+B/AdxakGBgARsQRB2IANqIQMgCkUNAAsgBiAJQfwBcUECdGoiAigCACIAQX9zQQd2IABBBnZyQYGChAhxIQAgCkEBRg0CIAAgAigCBCIAQX9zQQd2IABBBnZyQYGChAhxaiEAIApBAkYNAiAAIAIoAggiAEF/c0EHdiAAQQZ2ckGBgoQIcWohAAwCCyAHRQRAQQAhAwwDCyAHQQNxIQICQCAHQQRJBEBBACEDQQAhBgwBC0EAIQMgBSEAIAdBfHEiBiEEA0AgAyAALAAAQb9/SmogAEEBaiwAAEG/f0pqIABBAmosAABBv39KaiAAQQNqLAAAQb9/SmohAyAAQQRqIQAgBEEEayIEDQALCyACRQ0CIAUgBmohAANAIAMgACwAAEG/f0pqIQMgAEEBaiEAIAJBAWsiAg0ACwwCCwwCCyAAQQh2Qf+BHHEgAEH/gfwHcWpBgYAEbEEQdiADaiEDCwJAIAMgC0kEQCALIANrIQNBACEAAkACQAJAIAEtACBBAWsOAgABAgsgAyEAQQAhAwwBCyADQQF2IQAgA0EBakEBdiEDCyAAQQFqIQAgAUEYaigCACECIAEoAhAhBiABKAIUIQEDQCAAQQFrIgBFDQIgASAGIAIoAhARAwBFDQALQQEPCwwBC0EBIQAgASAFIAcgAigCDBEAAAR/QQEFQQAhAAJ/A0AgAyAAIANGDQEaIABBAWohACABIAYgAigCEBEDAEUNAAsgAEEBawsgA0kLDwsgASgCFCAFIAcgAUEYaigCACgCDBEAAAumBgINfwF+IwBBMGsiByQAQSchAgJAIABCkM4AVARAIAAhDwwBCwNAIAdBCWogAmoiBkEEayAAQpDOAIAiD0LwsQN+IAB8pyIEQf//A3FB5ABuIgNBAXRB0IbAAGovAAA7AAAgBkECayADQZx/bCAEakH//wNxQQF0QdCGwABqLwAAOwAAIAJBBGshAiAAQv/B1y9WIA8hAA0ACwsgD6ciBEHjAEsEQCACQQJrIgIgB0EJamogD6ciA0H//wNxQeQAbiIEQZx/bCADakH//wNxQQF0QdCGwABqLwAAOwAACwJAIARBCk8EQCACQQJrIgIgB0EJamogBEEBdEHQhsAAai8AADsAAAwBCyACQQFrIgIgB0EJamogBEEwajoAAAtBJyACayEIQQEhBUErQYCAxAAgASgCHCIEQQFxIgwbIQkgBEEddEEfdUHwiMAAcSEKIAdBCWogAmohCwJAIAEoAgBFBEAgASgCFCIDIAEoAhgiASAJIAoQSA0BIAMgCyAIIAEoAgwRAAAhBQwBCyABKAIEIg0gCCAMaiIDTQRAIAEoAhQiAyABKAIYIgEgCSAKEEgNASADIAsgCCABKAIMEQAAIQUMAQsgBEEIcQRAIAEoAhAhBCABQTA2AhAgAS0AICEDIAFBAToAICABKAIUIg4gASgCGCIGIAkgChBIDQEgAiANaiAMa0EmayECA0AgAkEBayICBEAgDkEwIAYoAhARAwBFDQEMAwsLIA4gCyAIIAYoAgwRAAANASABIAM6ACAgASAENgIQQQAhBQwBCyANIANrIQMCQAJAAkAgAS0AICICQQFrDgMAAQACCyADIQJBACEDDAELIANBAXYhAiADQQFqQQF2IQMLIAJBAWohAiABQRhqKAIAIQYgASgCECEEIAEoAhQhAQJAA0AgAkEBayICRQ0BIAEgBCAGKAIQEQMARQ0ACwwBCyABIAYgCSAKEEgNACABIAsgCCAGKAIMEQAADQBBACECA0AgAiADRgRAQQAhBQwCCyACQQFqIQIgASAEIAYoAhARAwBFDQALIAJBAWsgA0khBQsgB0EwaiQAIAUL/AUBBX8gAEEIayIBIABBBGsoAgAiA0F4cSIAaiECAkACQAJAAkAgA0EBcQ0AIANBA3FFDQEgASgCACIDIABqIQAgASADayIBQYyNwAAoAgBGBEAgAigCBEEDcUEDRw0BQYSNwAAgADYCACACIAIoAgRBfnE2AgQgASAAQQFyNgIEIAIgADYCAA8LIAEgAxAHCwJAAkAgAigCBCIDQQJxRQRAIAJBkI3AACgCAEYNAiACQYyNwAAoAgBGDQUgAiADQXhxIgIQByABIAAgAmoiAEEBcjYCBCAAIAFqIAA2AgAgAUGMjcAAKAIARw0BQYSNwAAgADYCAA8LIAIgA0F+cTYCBCABIABBAXI2AgQgACABaiAANgIACyAAQYACSQ0CIAEgABAIQQAhAUGkjcAAQaSNwAAoAgBBAWsiADYCACAADQFB7IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GkjcAAQf8fIAEgAUH/H00bNgIADwtBkI3AACABNgIAQYiNwABBiI3AACgCACAAaiIANgIAIAEgAEEBcjYCBEGMjcAAKAIAIAFGBEBBhI3AAEEANgIAQYyNwABBADYCAAsgAEGcjcAAKAIAIgNNDQBBkI3AACgCACICRQ0AQQAhAQJAQYiNwAAoAgAiBEEpSQ0AQeSKwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HsisAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQaSNwABB/x8gASABQf8fTRs2AgAgAyAETw0AQZyNwABBfzYCAAsPCyAAQXhxQfSKwABqIQICf0H8jMAAKAIAIgNBASAAQQN2dCIAcUUEQEH8jMAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCA8LQYyNwAAgATYCAEGEjcAAQYSNwAAoAgAgAGoiADYCACABIABBAXI2AgQgACABaiAANgIAC/sEAQF/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBgARrDiYBAgMEBQYHCCwJCgsMDSwsLCwsLCwsLCwsLCwsLCwsLA4PLCwsEAALQQEhAQJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEBaw4OQQECAwQFBkIHCAkKCwwACwJAIABBwARrDgwnKCkqKywtLi8wMTIACwJAIABBgQJrDgoNDg8QERITFBUWAAsCQCAAQYAGaw4JMzQ1NjdCQjg5AAsCQCAAQYAKaw4FPD0+P0AACyAAQYAIaw4COTpBC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EJDwtBCg8LQQsPC0EMDwtBDQ8LQQ4PC0GBAg8LQYICDwtBgwIPC0GEAg8LQYUCDwtBhgIPC0GHAg8LQYgCDwtBiQIPC0GKAg8LQYAEDwtBgQQPC0GCBA8LQYMEDwtBhAQPC0GFBA8LQYYEDwtBhwQPC0GJBA8LQYoEDwtBiwQPC0GMBA8LQY0EDwtBoAQPC0GhBA8LQaUEDwtBwAQPC0HBBA8LQcIEDwtBwwQPC0HEBA8LQcUEDwtBxgQPC0HHBA8LQcgEDwtByQQPC0HKBA8LQcsEDwtBgAYPC0GBBg8LQYIGDwtBgwYPC0GEBg8LQYcGDwtBiAYPC0GACA8LQYEIDwtBgAoPC0GBCg8LQYIKDwtBgwoPC0GECiEBCyABDwtB4ILAAEEZENQBAAv4AwECfyAAIAFqIQICQAJAIAAoAgQiA0EBcQ0AIANBA3FFDQEgACgCACIDIAFqIQEgACADayIAQYyNwAAoAgBGBEAgAigCBEEDcUEDRw0BQYSNwAAgATYCACACIAIoAgRBfnE2AgQgACABQQFyNgIEIAIgATYCAA8LIAAgAxAHCwJAAkACQCACKAIEIgNBAnFFBEAgAkGQjcAAKAIARg0CIAJBjI3AACgCAEYNAyACIANBeHEiAhAHIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQYyNwAAoAgBHDQFBhI3AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAgMAwsgAUF4cUH0isAAaiECAn9B/IzAACgCACIDQQEgAUEDdnQiAXFFBEBB/IzAACABIANyNgIAIAIMAQsgAigCCAshASACIAA2AgggASAANgIMIAAgAjYCDCAAIAE2AggPC0GQjcAAIAA2AgBBiI3AAEGIjcAAKAIAIAFqIgE2AgAgACABQQFyNgIEIABBjI3AACgCAEcNAUGEjcAAQQA2AgBBjI3AAEEANgIADwtBjI3AACAANgIAQYSNwABBhI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAIAFqIAE2AgALC/sCAQR/IAAoAgwhAgJAAkAgAUGAAk8EQCAAKAIYIQMCQAJAIAAgAkYEQCAAQRRBECAAQRRqIgIoAgAiBBtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIAIgAEEQaiAEGyEEA0AgBCEFIAEiAkEUaiIBIAJBEGogASgCACIBGyEEIAJBFEEQIAEbaigCACIBDQALIAVBADYCAAsgA0UNAiAAIAAoAhxBAnRB5InAAGoiASgCAEcEQCADQRBBFCADKAIQIABGG2ogAjYCACACRQ0DDAILIAEgAjYCACACDQFBgI3AAEGAjcAAKAIAQX4gACgCHHdxNgIADAILIAAoAggiACACRwRAIAAgAjYCDCACIAA2AggPC0H8jMAAQfyMwAAoAgBBfiABQQN2d3E2AgAPCyACIAM2AhggACgCECIBBEAgAiABNgIQIAEgAjYCGAsgAEEUaigCACIARQ0AIAJBFGogADYCACAAIAI2AhgLC6wCAQR/QR8hAiAAQgA3AhAgAUH///8HTQRAIAFBBiABQQh2ZyIDa3ZBAXEgA0EBdGtBPmohAgsgACACNgIcIAJBAnRB5InAAGohBAJAQYCNwAAoAgAiBUEBIAJ0IgNxRQRAQYCNwAAgAyAFcjYCACAEIAA2AgAgACAENgIYDAELAkACQCABIAQoAgAiAygCBEF4cUYEQCADIQIMAQsgAUEZIAJBAXZrQQAgAkEfRxt0IQQDQCADIARBHXZBBHFqQRBqIgUoAgAiAkUNAiAEQQF0IQQgAiEDIAIoAgRBeHEgAUcNAAsLIAIoAggiASAANgIMIAIgADYCCCAAQQA2AhggACACNgIMIAAgATYCCA8LIAUgADYCACAAIAM2AhgLIAAgADYCDCAAIAA2AggLaQEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENcBIgBBgAZxQQh0IABBCHZBgP4DcSAAQRh2cnIQvgEgAUEQaiQAC3kBA38gARDGAQJAIAEoAgAiAkF/RwRAIAEgAkEBajYCACABKAIEKAAAIgNBGHRBFnVB/ILAAGooAgAhBEEBQQQQyQEiAkUNASACIAQgA0GAfnFyNgAAIAEgASgCAEEBazYCACAAQQQ2AgQgACACNgIADwsQ0AEACwALZgEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENcBIgBBgAZxQQh0IABBCHZBgOADcXJBDHYQvQEgAUEQaiQAC24BAn8jAEEQayIBJAAgAUEIaiAAEEsgASgCCCIALwAAIABBAmotAABBEHRyENcBIQAgASgCDCICIAIoAgBBAWs2AgBBCEEEELwBIgIgAEEIdkGAHnEgAEEYdnI7AQQgAkEANgIAIAFBEGokACACC20BAX8jAEEwayIBJAAgASAAOgAPIABB/wFxQcAATwRAIAFBHGpCATcCACABQQI2AhQgAUH0gMAANgIQIAFBAjYCLCABIAFBKGo2AhggASABQQ9qNgIoIAFBEGpBhIHAABBKAAsgAUEwaiQAIAALbgEBfyMAQTBrIgEkACABIAA7AQ4gAEH//wNxQYAgTwRAIAFBHGpCATcCACABQQI2AhQgAUG4gcAANgIQIAFBAzYCLCABIAFBKGo2AhggASABQQ5qNgIoIAFBEGpByIHAABBKAAsgAUEwaiQAIAALXQEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENcBIgBBHnYgAEEOdkE8cXIQvQEgAUEQaiQACxUAIABBjILAAEH8gcAAQYCAEBDzAQsWACAAQdCCwABBwILAAEGAgIAIEPMBC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILVQIBfwF+IwBBEGsiAiQAIAEQxgEgAkEIaiABEFUgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIp0EBcToAASAAIANCIIinQQFxOgAAIAJBEGokAAsQACAAIAEgAiADQeIAEPYBCxAAIAAgASACIANB4wAQ9gELTwEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyEMoBEL0BIAFBEGokAAtSAQF/IAAQUiECIAEQVCEAQQhBBBC8ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABC1UBA38jAEEQayIBJAAgAUEIaiAAEEsgASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDXAUEYdkE/cRC9ASABQRBqJAALEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQtRAgF/AX4jAEEQayICJAAgARDGASACQQhqIAEQVSACKAIMQQA2AgAgASkCACEDIAEQBCAAIANCKIg8AAEgACADQiCIp0EBcToAACACQRBqJAALPgEBfyMAQRBrIgQkACAAEFIgARBSIAIQUiAEQQhqIAMQEyAELQAIQQFxIAQtAAlBAXEQfhCuASAEQRBqJAALSQEBfyAAEFIhACABEFIhAUEIQQQQvAEiAiABQf8BcUEMdCAAQRJ0ciIAQYDgA3FBCHQgAEEIdkGA/gNxckEIdq1CIIY3AgAgAgsMACAAIAFBywAQ+AELDAAgACABQcwAEPgBCwwAIAAgAUHNABD4AQsMACAAIAFBzgAQ+AELDAAgACABQc8AEPgBCwwAIAAgAUHQABD4AQs8AQF/IwBBEGsiBCQAIAAQUiABEFIgAhBSIARBCGogAxAdIAQtAAhBAXEgBC0ACRDAARCuASAEQRBqJAALSAAgABDGASAAKAIAQX9GBEAQ0AEACyAALwAEIABBBmotAABBEHRyENcBIgBBgP4DcUEIdCAAQQh2QYD+A3EgAEEYdnJyEL4BCwsAIAAgAUEHEPkBCz8BAn8CQCAAEFIiAEEYcQ0AIABBB3EiAkEHRg0AQQhBBBC8ASIBIABBBXZBAXGtQiCGIAKtQiiGhDcCAAsgAQsLACAAIAFBCBD5AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILCwAgACABQQoQ+gELCwAgACABQQwQ+gELCwAgACABQRQQ+gELCwAgACABQRYQ+gELCwAgACABQRkQ+gELCwAgACABQRsQ+gELCwAgACABQR4Q+gELCwAgACABQR8Q+gELCwAgACABQSQQ+gELCwAgACABQTIQ+gELPwAgABBSIQAgARBUIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEK4BCwwAIAAgAUHtABD6AQtAAQF/IAAQVCEAQQhBBBC8ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDGASABQQhqIAAQTCABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxgEgAUEIaiAAEEwgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMYBIAJBCGogABBVIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDGASACQQhqIAAQVSACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxgEgAUEIaiAAEFUgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBLIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEsgASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD7AQsKACAAQdYAEPsBCwoAIABB1wAQ+wELCgAgAEHaABD7AQsKACAAQdsAEPsBCwoAIABB3AAQ+wELCgAgAEHdABD7AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyEL0BIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQcCGwAA2AhAgAkHwiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHwiMAANgIIIABBKzYCHCAAQZiIwAA2AhggACAAQRhqNgIAIABB4IjAABBKAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQeCJwABB4InAACgCACIAQQFqNgIAAkAgAEEASA0AQayNwAAtAABBAXENAEGsjcAAQQE6AABBqI3AAEGojcAAKAIAQQFqNgIAQdyJwAAoAgBBAEgNAEGsjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxgEgASgCACICQX9GBEAQ0AEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQ0AEACzUBAX8gAEE5TwRAQeCCwABBGRDUAQALQQxBBBC8ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUiABEFIgAhBSIAMQUhASIQBBCEEEELwBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMYBIAAoAgBBf0YEQBDQAQALIAAvAAQgAEEGai0AAEEQdHIQygEQvQELLAAgABBSIAEQUiACEFIQKyEAQQhBBBC8ASIBIACtQv///weDQiCGNwIAIAELLAAgABBSIAEQUiACEFMQOSEAQQhBBBC8ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDPAQALENABAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM8BAAsQ0AEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzwEACxDQAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENABAAspACADED4hAyAAEL8BIAEQvwEgAhC/ASADEMQBQQh0QeQAchDHARC+AQspACADED4hAyAAEL8BIAEQvwEgAhC/ASADEMQBQQh0QeUAchDHARC+AQslAQF/IAAQUiEAQQhBBBC8ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ1AEACyABAX8gABDGASAAKAIABEAQ0AEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvwEgARC/ASACEDlBCHRBygByEMcBEL4BCx4AAkAgAARAIAAoAgANASAAEAQPCxDPAQALENABAAsPACAAIAEgAiADQRIQ8AELDwAgACABIAIgA0EYEPABCw8AIAAgASACIANBHBDwAQsPACAAIAEgAiADQR0Q8AELDwAgACABIAIgA0EhEPEBCw8AIAAgASACIANBIhDwAQsPACAAIAEgAiADQSMQ8AELDwAgACABIAIgA0EoEPABCw8AIAAgASACIANBKhDwAQsPACAAIAEgAiADQSwQ8AELDwAgACABIAIgA0EvEPABCw8AIAAgASACIANBOBDwAQsQACAAIAEgAiADQdMAEPEBCxAAIAAgASACIANB1AAQ8QELEAAgACABIAIgA0HeABDxAQsQACAAIAEgAiADQd8AEPEBCxAAIAAgASACIANB4AAQ8QELEAAgACABIAIgA0HhABDxAQsQACAAIAEgAiADQeIAEPEBCxAAIAAgASACIANB4wAQ8QELEAAgACABIAIgA0HkABDxAQsQACAAIAEgAiADQeUAEPEBCxAAIAAgASACIANB5gAQ8AELEAAgACABIAIgA0HnABDwAQsQACAAIAEgAiADQegAEPABCxAAIAAgASACIANB6QAQ8AELEAAgACABIAIgA0HqABDwAQsQACAAIAEgAiADQesAEPABCxAAIAAgASACIANB7AAQ8AELEAAgACABIAIgA0HuABDwAQsdAQF/IwBBEGsiASQAIAFBCGogABAdIAFBEGokAAsdAQF/IwBBEGsiASQAIAFBCGogABATIAFBEGokAAsfACABEFkhASAAEL8BIAEQuQFBCHRBzAByEMcBEL4BCxkAIAAgASACQSBBACAEG0EQQQAgAxtyEBILDQAgACABIAJBARDyAQsNACAAIAEgAkECEPIBCw0AIAAgASACQQMQ8gELDQAgACABIAJBBBDyAQsNACAAIAEgAkEFEPIBCw0AIAAgASACQQYQ8gELDQAgACABIAJBBxDyAQsNACAAIAEgAkEIEPIBCw0AIAAgASACQQkQ8gELDQAgACABIAJBCxDyAQsNACAAIAEgAkENEPIBCw0AIAAgASACQQ4Q8gELDQAgACABIAJBDxDyAQsNACAAIAEgAkEQEPIBCw0AIAAgASACQREQ8gELDQAgACABIAJBFxDyAQsNACAAIAEgAkEmEPIBCw0AIAAgASACQScQ8gELDQAgACABIAJBKRDyAQsNACAAIAEgAkErEPIBCw0AIAAgASACQS0Q8gELDQAgACABIAJBLhDyAQsNACAAIAEgAkEwEPIBCw0AIAAgASACQTEQ8gELDQAgACABIAJBNRDyAQsNACAAIAEgAkE3EPIBCw0AIAAgASACQTkQ9AELDQAgACABIAJBOhD0AQsNACAAIAEgAkE7EPQBCw0AIAAgASACQTwQ9AELDQAgACABIAJBPRD0AQsNACAAIAEgAkE+EPQBCw0AIAAgASACQT8Q9AELDgAgACABIAJBwAAQ9AELDgAgACABIAJBwQAQ9AELDgAgACABIAJBwgAQ9AELDgAgACABIAJBwwAQ9AELDgAgACABIAJBxAAQ9AELDgAgACABIAJBxQAQ9AELDgAgACABIAJBxgAQ9AELDgAgACABIAJBxwAQ9AELDgAgACABIAJByAAQ9AELDgAgACABIAJByQAQ9AELDgAgACABIAJBygAQ9AELDgAgACABIAJB0QAQ9AELDgAgACABIAJB0gAQ9AELGAEBfyAAQf8BcUE/TQR/IAAQvQEFQQALCx4BAX9BCEEEELwBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMYBIAAoAgBBf0YEQBDQAQALIAAtAAQLCQAgAEETEPUBCwkAIABBFRD1AQsJACAAQRoQ9QELCQAgAEEgEPUBCwkAIABBJRD1AQsJACAAQTQQ9QELCQAgAEE2EPUBCwoAIABB2AAQ9QELCgAgAEHZABD1AQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMYBIAAoAgAEQBDQAQALIAAQBAscACAAEL8BIAEQvwEgAhC/ARArQQh0EMcBEL4BCxIAIAEgABDJASIABEAgAA8LAAsbAQF/QQhBBBC8ASIBIAA6AAQgAUEANgIAIAELGwEBf0EIQQQQvAEiASAANgIEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbiGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEoACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUiABEFIgAhBSIAMQPhDEARCuAQsXACAAEFIgARBSIAIQUiADEFIQEhCuAQsTACAAEFIgARBSIAIQBRA5EK4BCxEAIAAgASACQSBBACADGxASCxMAIAAQUiABEFIgAhBTEDkQrgELDAAgAARADwsQzwEACxQBAX9BBEEBELwBIgEgADYAACABCxQBAX9BCEEEELwBIgBCADcCACAAC4EDAQV/Qa2NwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1wFBCnZBP3ELEAAgABBSIAEQWRC5ARCuAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHwiMAAQRsQ1AEACw4AQYuJwABBzwAQ1AEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xEL0BCwoAIAAQUkH/AXELBwAgAEEIdAsHACAAED4aCwcAIAAQUhoLBwAgABBTGgsHACAAEFQaCwoAQTMQxwEQvgELBwBBCxC9AQsHAEEKEL0BCwcAQQgQvQELBwBBDxC9AQsHAEEGEL0BCwcAQQkQvQELBwBBBxC9AQsHAEEMEL0BCwcAQQIQvQELBwBBARC9AQsHAEEDEL0BCwcAQQ0QvQELBwBBDhC9AQsHAEEFEL0BCwcAQQQQvQELBwBBEBC9AQsHAEEAEL0BCwQAQQQLAgALJAAgABC/ASABEL8BIAIQvwEgAxC/ARASQQh0IARyEMcBEL4BCyMAIAAQvwEgARC/ASACEL8BIAMQDRASQQh0IARyEMcBEL4BCx8AIAAQvwEgARC/ASACEL8BECtBCHQgA3IQxwEQvgELYgEBfyMAQTBrIgQkACAEIAA2AgwgACADTwRAIARBHGpCATcCACAEQQI2AhQgBCACNgIQIARBBDYCLCAEIARBKGo2AhggBCAEQQxqNgIoIARBEGogARBKAAsgBEEwaiQAIAALHgAgABC/ASABEL8BIAIQDhA5QQh0IANyEMcBEL4BCxsAIAAQvwEaIABBCnRBgPgDcSABchDHARC+AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC/ASABEL8BIAIQvwEgBkEBcSADQQFxEH5BCHQgBHIQxwEQvgEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL8BIAEQvwEgAhC/ASADQQFxIAYQwAFBCHQgBHIQxwEQvgEgBUEQaiQAC0oAIAAQvwEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMcBEL4BC0kBAX8jAEEQayIDJAAgABDGASABIAJPBEBB4ILAAEEZENQBAAsgA0EIaiAAEFUgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC/ARogARC/ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMcBEL4BCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDHARC+AQsL5AkBAEGAgMAAC9oJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG4AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACuAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAALMDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAuAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAAC9AwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAugAAALsAAABwBBAAAAAAAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OWNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWVsaWJyYXJ5L3N0ZC9zcmMvcGFuaWNraW5nLnJzAEMEEAAcAAAAhAIAAB4AAABudWxsIHBvaW50ZXIgcGFzc2VkIHRvIHJ1c3RyZWN1cnNpdmUgdXNlIG9mIGFuIG9iamVjdCBkZXRlY3RlZCB3aGljaCB3b3VsZCBsZWFkIHRvIHVuc2FmZSBhbGlhc2luZyBpbiBydXN0ADsJcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkCBndhbHJ1cwYwLjIwLjMMd2FzbS1iaW5kZ2VuBjAuMi45Mg==", e);
}
async function mi() {
  return await G0(KI());
}
mi();
const t1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: om,
  ADDI: cm,
  ALOC: um,
  AND: hm,
  ANDI: fm,
  BAL: pm,
  BHEI: wm,
  BHSH: ym,
  BLDD: Im,
  BSIZ: vm,
  BURN: Bm,
  CALL: Rm,
  CB: Nm,
  CCP: Dm,
  CFE: Fm,
  CFEI: Om,
  CFS: km,
  CFSI: Um,
  CROO: Gm,
  CSIZ: Xm,
  CompareArgs: Fr,
  CompareMode: rm,
  DIV: Ym,
  DIVI: Zm,
  DivArgs: ds,
  ECAL: jm,
  ECK1: Km,
  ECR1: ey,
  ED19: ny,
  EQ: iy,
  EXP: ay,
  EXPI: dy,
  FLAG: _y,
  GM: js,
  GMArgs: em,
  GT: ly,
  GTF: $s,
  GTFArgs: P0,
  Imm06: Qt,
  Imm12: wt,
  Imm18: Ne,
  Imm24: ve,
  Instruction: W,
  JI: Ay,
  JMP: gy,
  JMPB: my,
  JMPF: by,
  JNE: Ey,
  JNEB: Cy,
  JNEF: xy,
  JNEI: Sy,
  JNZB: Ty,
  JNZF: Qy,
  JNZI: My,
  K256: Ly,
  LB: Py,
  LDC: zy,
  LOG: Wy,
  LOGD: Hy,
  LT: Vy,
  LW: Jy,
  MCL: jy,
  MCLI: Ky,
  MCP: eb,
  MCPI: nb,
  MEQ: ib,
  MINT: ab,
  MLDV: db,
  MLOG: _b,
  MOD: lb,
  MODI: Ab,
  MOVE: gb,
  MOVI: mb,
  MROO: bb,
  MUL: Eb,
  MULI: Cb,
  MathArgs: us,
  MathOp: sm,
  MulArgs: _s,
  NOOP: Sb,
  NOT: Tb,
  OR: Qb,
  ORI: Mb,
  POPH: Lb,
  POPL: Pb,
  PSHH: zb,
  PSHL: Wb,
  PanicInstruction: Hb,
  PanicReason: nm,
  RET: Vb,
  RETD: Jb,
  RVRT: jb,
  RegId: l,
  S256: Kb,
  SB: eI,
  SCWQ: nI,
  SLL: iI,
  SLLI: aI,
  SMO: dI,
  SRL: _I,
  SRLI: lI,
  SRW: AI,
  SRWQ: gI,
  SUB: mI,
  SUBI: bI,
  SW: EI,
  SWW: CI,
  SWWQ: xI,
  TIME: SI,
  TR: TI,
  TRO: QI,
  WDAM: MI,
  WDCM: Ks,
  WDDV: ti,
  WDMD: LI,
  WDML: ei,
  WDMM: PI,
  WDOP: ri,
  WQAM: zI,
  WQCM: ni,
  WQDV: si,
  WQMD: WI,
  WQML: ii,
  WQMM: HI,
  WQOP: oi,
  XOR: VI,
  XORI: JI,
  add: hg,
  addi: Vn,
  aloc: Ng,
  and: lg,
  andi: cw,
  bal: iw,
  bhei: Mg,
  bhsh: Fg,
  bldd: Kw,
  bsiz: k0,
  burn: Og,
  call: To,
  cb: Ug,
  ccp: Lg,
  cfe: Dw,
  cfei: Nw,
  cfs: Qw,
  cfsi: Tw,
  croo: kg,
  csiz: Pg,
  div: fg,
  divi: F0,
  ecal: $w,
  eck1: jg,
  ecr1: $g,
  ed19: Kg,
  eq: Ag,
  exp: pg,
  expi: dw,
  flag: sw,
  gm: Iw,
  gm_args: rg,
  gt: gg,
  gtf: O0,
  gtf_args: ng,
  initSync: jI,
  initWasm: mi,
  ji: Sw,
  jmp: Q0,
  jmpb: Cw,
  jmpf: vw,
  jne: ow,
  jneb: Rw,
  jnef: xw,
  jnei: pw,
  jnzb: L0,
  jnzf: Bw,
  jnzi: Ew,
  k256: tw,
  lb: gw,
  ldc: T0,
  log: zg,
  logd: Gg,
  lt: wg,
  lw: qs,
  mcl: Tg,
  mcli: bw,
  mcp: Dg,
  mcpi: yw,
  meq: Qg,
  mint: Wg,
  mldv: Rg,
  mlog: mg,
  mod_: bg,
  modi: uw,
  move_: No,
  movi: an,
  mroo: yg,
  mul: Ig,
  muli: _w,
  noop: nw,
  not: Eg,
  or: vg,
  ori: hw,
  poph: Lw,
  popl: Ow,
  pshh: Mw,
  pshl: Fw,
  ret: Ba,
  retd: Sg,
  rvrt: Xg,
  s256: ew,
  sb: ww,
  scwq: Hg,
  sll: Cg,
  slli: lw,
  smo: aw,
  srl: Bg,
  srli: fw,
  srw: Yg,
  srwq: Vg,
  sub: N0,
  subi: M0,
  sw: mw,
  sww: Zg,
  swwq: Jg,
  time: rw,
  tr: D0,
  tro: qg,
  wdam: Zw,
  wdcm: kw,
  wdcm_args: sg,
  wddv: Xw,
  wddv_args: ug,
  wdmd: Yw,
  wdml: Gw,
  wdml_args: cg,
  wdmm: qw,
  wdop: Uw,
  wdop_args: og,
  wqam: Jw,
  wqcm: Pw,
  wqcm_args: ig,
  wqdv: Hw,
  wqdv_args: _g,
  wqmd: Vw,
  wqml: Ww,
  wqml_args: dg,
  wqmm: jw,
  wqop: zw,
  wqop_args: ag,
  xor: xg,
  xori: Aw
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ie = BigInt(0), Xt = BigInt(1), zr = BigInt(2), e1 = BigInt(3), Do = BigInt(4), pd = BigInt(5), gd = BigInt(8);
BigInt(9);
BigInt(16);
function De(e, t) {
  const r = e % t;
  return r >= Ie ? r : t + r;
}
function r1(e, t, r) {
  if (r <= Ie || t < Ie)
    throw new Error("Expected power/modulo > 0");
  if (r === Xt)
    return Ie;
  let n = Xt;
  for (; t > Ie; )
    t & Xt && (n = n * e % r), e = e * e % r, t >>= Xt;
  return n;
}
function ke(e, t, r) {
  let n = e;
  for (; t-- > Ie; )
    n *= n, n %= r;
  return n;
}
function Qo(e, t) {
  if (e === Ie || t <= Ie)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = De(e, t), n = t, s = Ie, i = Xt;
  for (; r !== Ie; ) {
    const a = n / r, u = n % r, f = s - i * a;
    n = r, r = u, s = i, i = f;
  }
  if (n !== Xt)
    throw new Error("invert: does not exist");
  return De(s, t);
}
function n1(e) {
  const t = (e - Xt) / zr;
  let r, n, s;
  for (r = e - Xt, n = 0; r % zr === Ie; r /= zr, n++)
    ;
  for (s = zr; s < e && r1(s, t, e) !== e - Xt; s++)
    ;
  if (n === 1) {
    const o = (e + Xt) / Do;
    return function(u, f) {
      const g = u.pow(f, o);
      if (!u.eql(u.sqr(g), f))
        throw new Error("Cannot find square root");
      return g;
    };
  }
  const i = (r + Xt) / zr;
  return function(a, u) {
    if (a.pow(u, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let f = n, g = a.pow(a.mul(a.ONE, s), r), E = a.pow(u, i), C = a.pow(u, r);
    for (; !a.eql(C, a.ONE); ) {
      if (a.eql(C, a.ZERO))
        return a.ZERO;
      let S = 1;
      for (let N = a.sqr(C); S < f && !a.eql(N, a.ONE); S++)
        N = a.sqr(N);
      const Q = a.pow(g, Xt << BigInt(f - S - 1));
      g = a.sqr(Q), E = a.mul(E, Q), C = a.mul(C, g), f = S;
    }
    return E;
  };
}
function s1(e) {
  if (e % Do === e1) {
    const t = (e + Xt) / Do;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % gd === pd) {
    const t = (e - pd) / gd;
    return function(n, s) {
      const i = n.mul(s, zr), o = n.pow(i, t), a = n.mul(s, o), u = n.mul(n.mul(a, zr), o), f = n.mul(a, n.sub(u, n.ONE));
      if (!n.eql(n.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return n1(e);
}
const i1 = [
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
function o1(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = i1.reduce((n, s) => (n[s] = "function", n), t);
  return is(e, r);
}
function a1(e, t, r) {
  if (r < Ie)
    throw new Error("Expected power > 0");
  if (r === Ie)
    return e.ONE;
  if (r === Xt)
    return t;
  let n = e.ONE, s = t;
  for (; r > Ie; )
    r & Xt && (n = e.mul(n, s)), s = e.sqr(s), r >>= Xt;
  return n;
}
function c1(e, t) {
  const r = new Array(t.length), n = t.reduce((i, o, a) => e.is0(o) ? i : (r[a] = i, e.mul(i, o)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (r[a] = e.mul(i, r[a]), e.mul(i, o)), s), r;
}
function W0(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function X0(e, t, r = !1, n = {}) {
  if (e <= Ie)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = W0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = s1(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: Ia(s),
    ZERO: Ie,
    ONE: Xt,
    create: (u) => De(u, e),
    isValid: (u) => {
      if (typeof u != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof u}`);
      return Ie <= u && u < e;
    },
    is0: (u) => u === Ie,
    isOdd: (u) => (u & Xt) === Xt,
    neg: (u) => De(-u, e),
    eql: (u, f) => u === f,
    sqr: (u) => De(u * u, e),
    add: (u, f) => De(u + f, e),
    sub: (u, f) => De(u - f, e),
    mul: (u, f) => De(u * f, e),
    pow: (u, f) => a1(a, u, f),
    div: (u, f) => De(u * Qo(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (u) => u * u,
    addN: (u, f) => u + f,
    subN: (u, f) => u - f,
    mulN: (u, f) => u * f,
    inv: (u) => Qo(u, e),
    sqrt: n.sqrt || ((u) => o(a, u)),
    invertBatch: (u) => c1(a, u),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (u, f, g) => g ? f : u,
    toBytes: (u) => r ? ba(u, i) : bn(u, i),
    fromBytes: (u) => {
      if (u.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${u.length}`);
      return r ? ya(u) : Hr(u);
    }
  });
  return Object.freeze(a);
}
function H0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Y0(e) {
  const t = H0(e);
  return t + Math.ceil(t / 2);
}
function d1(e, t, r = !1) {
  const n = e.length, s = H0(t), i = Y0(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const o = r ? Hr(e) : ya(e), a = De(o, t - Xt) + Xt;
  return r ? ba(a, s) : bn(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u1 = BigInt(0), to = BigInt(1), eo = /* @__PURE__ */ new WeakMap(), wd = /* @__PURE__ */ new WeakMap();
function _1(e, t) {
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
      for (; o > u1; )
        o & to && (a = a.add(u)), u = u.double(), o >>= to;
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
      const { windows: a, windowSize: u } = s(o), f = [];
      let g = i, E = g;
      for (let C = 0; C < a; C++) {
        E = g, f.push(E);
        for (let S = 1; S < u; S++)
          E = E.add(g), f.push(E);
        g = E.double();
      }
      return f;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(i, o, a) {
      const { windows: u, windowSize: f } = s(i);
      let g = e.ZERO, E = e.BASE;
      const C = BigInt(2 ** i - 1), S = 2 ** i, Q = BigInt(i);
      for (let N = 0; N < u; N++) {
        const T = N * f;
        let M = Number(a & C);
        a >>= Q, M > f && (M -= S, a += to);
        const H = T, G = T + Math.abs(M) - 1, Y = N % 2 !== 0, O = M < 0;
        M === 0 ? E = E.add(r(Y, o[H])) : g = g.add(r(O, o[G]));
      }
      return { p: g, f: E };
    },
    wNAFCached(i, o, a) {
      const u = wd.get(i) || 1;
      let f = eo.get(i);
      return f || (f = this.precomputeWindow(i, u), u !== 1 && eo.set(i, a(f))), this.wNAF(u, f, o);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(i, o) {
      n(o), wd.set(i, o), eo.delete(i);
    }
  };
}
function h1(e, t, r, n) {
  if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  n.forEach((g, E) => {
    if (!t.isValid(g))
      throw new Error(`wrong scalar at index ${E}`);
  }), r.forEach((g, E) => {
    if (!(g instanceof e))
      throw new Error(`wrong point at index ${E}`);
  });
  const s = a0(BigInt(r.length)), i = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, o = (1 << i) - 1, a = new Array(o + 1).fill(e.ZERO), u = Math.floor((t.BITS - 1) / i) * i;
  let f = e.ZERO;
  for (let g = u; g >= 0; g -= i) {
    a.fill(e.ZERO);
    for (let C = 0; C < n.length; C++) {
      const S = n[C], Q = Number(S >> BigInt(g) & BigInt(o));
      a[Q] = a[Q].add(r[C]);
    }
    let E = e.ZERO;
    for (let C = a.length - 1, S = e.ZERO; C > 0; C--)
      S = S.add(a[C]), E = E.add(S);
    if (f = f.add(E), g !== 0)
      for (let C = 0; C < i; C++)
        f = f.double();
  }
  return f;
}
function V0(e) {
  return o1(e.Fp), is(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...W0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function md(e) {
  e.lowS !== void 0 && wn("lowS", e.lowS), e.prehash !== void 0 && wn("prehash", e.prehash);
}
function l1(e) {
  const t = V0(e);
  is(t, {
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
const { bytesToNumberBE: f1, hexToBytes: A1 } = xA, ur = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (e, t) => {
      const { Err: r } = ur;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new r("tlv.encode: unpadded data");
      const n = t.length / 2, s = sn(n);
      if (s.length / 2 & 128)
        throw new r("tlv.encode: long form length too big");
      const i = n > 127 ? sn(s.length / 2 | 128) : "";
      return `${sn(e)}${i}${s}${t}`;
    },
    // v - value, l - left bytes (unparsed)
    decode(e, t) {
      const { Err: r } = ur;
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
        const f = t.subarray(n, n + u);
        if (f.length !== u)
          throw new r("tlv.decode: length bytes not complete");
        if (f[0] === 0)
          throw new r("tlv.decode(long): zero leftmost byte");
        for (const g of f)
          o = o << 8 | g;
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
      const { Err: t } = ur;
      if (e < _r)
        throw new t("integer: negative integers are not allowed");
      let r = sn(e);
      if (Number.parseInt(r[0], 16) & 8 && (r = "00" + r), r.length & 1)
        throw new t("unexpected assertion");
      return r;
    },
    decode(e) {
      const { Err: t } = ur;
      if (e[0] & 128)
        throw new t("Invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new t("Invalid signature integer: unnecessary leading zero");
      return f1(e);
    }
  },
  toSig(e) {
    const { Err: t, _int: r, _tlv: n } = ur, s = typeof e == "string" ? A1(e) : e;
    ss(s);
    const { v: i, l: o } = n.decode(48, s);
    if (o.length)
      throw new t("Invalid signature: left bytes after parsing");
    const { v: a, l: u } = n.decode(2, i), { v: f, l: g } = n.decode(2, u);
    if (g.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: r.decode(a), s: r.decode(f) };
  },
  hexFromSig(e) {
    const { _tlv: t, _int: r } = ur, n = `${t.encode(2, r.encode(e.r))}${t.encode(2, r.encode(e.s))}`;
    return t.encode(48, n);
  }
}, _r = BigInt(0), ye = BigInt(1);
BigInt(2);
const yd = BigInt(3);
BigInt(4);
function p1(e) {
  const t = l1(e), { Fp: r } = t, n = X0(t.n, t.nBitLength), s = t.toBytes || ((N, T, M) => {
    const H = T.toAffine();
    return Hn(Uint8Array.from([4]), r.toBytes(H.x), r.toBytes(H.y));
  }), i = t.fromBytes || ((N) => {
    const T = N.subarray(1), M = r.fromBytes(T.subarray(0, r.BYTES)), H = r.fromBytes(T.subarray(r.BYTES, 2 * r.BYTES));
    return { x: M, y: H };
  });
  function o(N) {
    const { a: T, b: M } = t, H = r.sqr(N), G = r.mul(H, N);
    return r.add(r.add(G, r.mul(N, T)), M);
  }
  if (!r.eql(r.sqr(t.Gy), o(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(N) {
    return Ai(N, ye, t.n);
  }
  function u(N) {
    const { allowedPrivateKeyLengths: T, nByteLength: M, wrapPrivateKey: H, n: G } = t;
    if (T && typeof N != "bigint") {
      if (Zr(N) && (N = mn(N)), typeof N != "string" || !T.includes(N.length))
        throw new Error("Invalid key");
      N = N.padStart(M * 2, "0");
    }
    let Y;
    try {
      Y = typeof N == "bigint" ? N : Hr(Ve("private key", N, M));
    } catch {
      throw new Error(`private key must be ${M} bytes, hex or bigint, not ${typeof N}`);
    }
    return H && (Y = De(Y, G)), Yr("private key", Y, ye, G), Y;
  }
  function f(N) {
    if (!(N instanceof C))
      throw new Error("ProjectivePoint expected");
  }
  const g = vo((N, T) => {
    const { px: M, py: H, pz: G } = N;
    if (r.eql(G, r.ONE))
      return { x: M, y: H };
    const Y = N.is0();
    T == null && (T = Y ? r.ONE : r.inv(G));
    const O = r.mul(M, T), L = r.mul(H, T), z = r.mul(G, T);
    if (Y)
      return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(z, r.ONE))
      throw new Error("invZ was invalid");
    return { x: O, y: L };
  }), E = vo((N) => {
    if (N.is0()) {
      if (t.allowInfinityPoint && !r.is0(N.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: T, y: M } = N.toAffine();
    if (!r.isValid(T) || !r.isValid(M))
      throw new Error("bad point: x or y not FE");
    const H = r.sqr(M), G = o(T);
    if (!r.eql(H, G))
      throw new Error("bad point: equation left != right");
    if (!N.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class C {
    constructor(T, M, H) {
      if (this.px = T, this.py = M, this.pz = H, T == null || !r.isValid(T))
        throw new Error("x required");
      if (M == null || !r.isValid(M))
        throw new Error("y required");
      if (H == null || !r.isValid(H))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(T) {
      const { x: M, y: H } = T || {};
      if (!T || !r.isValid(M) || !r.isValid(H))
        throw new Error("invalid affine point");
      if (T instanceof C)
        throw new Error("projective point not allowed");
      const G = (Y) => r.eql(Y, r.ZERO);
      return G(M) && G(H) ? C.ZERO : new C(M, H, r.ONE);
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
    static normalizeZ(T) {
      const M = r.invertBatch(T.map((H) => H.pz));
      return T.map((H, G) => H.toAffine(M[G])).map(C.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(T) {
      const M = C.fromAffine(i(Ve("pointHex", T)));
      return M.assertValidity(), M;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(T) {
      return C.BASE.multiply(u(T));
    }
    // Multiscalar Multiplication
    static msm(T, M) {
      return h1(C, n, T, M);
    }
    // "Private method", don't use it directly
    _setWindowSize(T) {
      Q.setWindowSize(this, T);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      E(this);
    }
    hasEvenY() {
      const { y: T } = this.toAffine();
      if (r.isOdd)
        return !r.isOdd(T);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(T) {
      f(T);
      const { px: M, py: H, pz: G } = this, { px: Y, py: O, pz: L } = T, z = r.eql(r.mul(M, L), r.mul(Y, G)), U = r.eql(r.mul(H, L), r.mul(O, G));
      return z && U;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new C(this.px, r.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: T, b: M } = t, H = r.mul(M, yd), { px: G, py: Y, pz: O } = this;
      let L = r.ZERO, z = r.ZERO, U = r.ZERO, k = r.mul(G, G), j = r.mul(Y, Y), V = r.mul(O, O), tt = r.mul(G, Y);
      return tt = r.add(tt, tt), U = r.mul(G, O), U = r.add(U, U), L = r.mul(T, U), z = r.mul(H, V), z = r.add(L, z), L = r.sub(j, z), z = r.add(j, z), z = r.mul(L, z), L = r.mul(tt, L), U = r.mul(H, U), V = r.mul(T, V), tt = r.sub(k, V), tt = r.mul(T, tt), tt = r.add(tt, U), U = r.add(k, k), k = r.add(U, k), k = r.add(k, V), k = r.mul(k, tt), z = r.add(z, k), V = r.mul(Y, O), V = r.add(V, V), k = r.mul(V, tt), L = r.sub(L, k), U = r.mul(V, j), U = r.add(U, U), U = r.add(U, U), new C(L, z, U);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(T) {
      f(T);
      const { px: M, py: H, pz: G } = this, { px: Y, py: O, pz: L } = T;
      let z = r.ZERO, U = r.ZERO, k = r.ZERO;
      const j = t.a, V = r.mul(t.b, yd);
      let tt = r.mul(M, Y), B = r.mul(H, O), d = r.mul(G, L), _ = r.add(M, H), A = r.add(Y, O);
      _ = r.mul(_, A), A = r.add(tt, B), _ = r.sub(_, A), A = r.add(M, G);
      let m = r.add(Y, L);
      return A = r.mul(A, m), m = r.add(tt, d), A = r.sub(A, m), m = r.add(H, G), z = r.add(O, L), m = r.mul(m, z), z = r.add(B, d), m = r.sub(m, z), k = r.mul(j, A), z = r.mul(V, d), k = r.add(z, k), z = r.sub(B, k), k = r.add(B, k), U = r.mul(z, k), B = r.add(tt, tt), B = r.add(B, tt), d = r.mul(j, d), A = r.mul(V, A), B = r.add(B, d), d = r.sub(tt, d), d = r.mul(j, d), A = r.add(A, d), tt = r.mul(B, A), U = r.add(U, tt), tt = r.mul(m, A), z = r.mul(_, z), z = r.sub(z, tt), tt = r.mul(_, B), k = r.mul(m, k), k = r.add(k, tt), new C(z, U, k);
    }
    subtract(T) {
      return this.add(T.negate());
    }
    is0() {
      return this.equals(C.ZERO);
    }
    wNAF(T) {
      return Q.wNAFCached(this, T, C.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(T) {
      Yr("scalar", T, _r, t.n);
      const M = C.ZERO;
      if (T === _r)
        return M;
      if (T === ye)
        return this;
      const { endo: H } = t;
      if (!H)
        return Q.unsafeLadder(this, T);
      let { k1neg: G, k1: Y, k2neg: O, k2: L } = H.splitScalar(T), z = M, U = M, k = this;
      for (; Y > _r || L > _r; )
        Y & ye && (z = z.add(k)), L & ye && (U = U.add(k)), k = k.double(), Y >>= ye, L >>= ye;
      return G && (z = z.negate()), O && (U = U.negate()), U = new C(r.mul(U.px, H.beta), U.py, U.pz), z.add(U);
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
    multiply(T) {
      const { endo: M, n: H } = t;
      Yr("scalar", T, ye, H);
      let G, Y;
      if (M) {
        const { k1neg: O, k1: L, k2neg: z, k2: U } = M.splitScalar(T);
        let { p: k, f: j } = this.wNAF(L), { p: V, f: tt } = this.wNAF(U);
        k = Q.constTimeNegate(O, k), V = Q.constTimeNegate(z, V), V = new C(r.mul(V.px, M.beta), V.py, V.pz), G = k.add(V), Y = j.add(tt);
      } else {
        const { p: O, f: L } = this.wNAF(T);
        G = O, Y = L;
      }
      return C.normalizeZ([G, Y])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(T, M, H) {
      const G = C.BASE, Y = (L, z) => z === _r || z === ye || !L.equals(G) ? L.multiplyUnsafe(z) : L.multiply(z), O = Y(this, M).add(Y(T, H));
      return O.is0() ? void 0 : O;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(T) {
      return g(this, T);
    }
    isTorsionFree() {
      const { h: T, isTorsionFree: M } = t;
      if (T === ye)
        return !0;
      if (M)
        return M(C, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: T, clearCofactor: M } = t;
      return T === ye ? this : M ? M(C, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(T = !0) {
      return wn("isCompressed", T), this.assertValidity(), s(C, this, T);
    }
    toHex(T = !0) {
      return wn("isCompressed", T), mn(this.toRawBytes(T));
    }
  }
  C.BASE = new C(t.Gx, t.Gy, r.ONE), C.ZERO = new C(r.ZERO, r.ONE, r.ZERO);
  const S = t.nBitLength, Q = _1(C, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: C,
    normPrivateKeyToScalar: u,
    weierstrassEquation: o,
    isWithinCurveOrder: a
  };
}
function g1(e) {
  const t = V0(e);
  return is(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function w1(e) {
  const t = g1(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function o(d) {
    return De(d, n);
  }
  function a(d) {
    return Qo(d, n);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: f, weierstrassEquation: g, isWithinCurveOrder: E } = p1({
    ...t,
    toBytes(d, _, A) {
      const m = _.toAffine(), p = r.toBytes(m.x), I = Hn;
      return wn("isCompressed", A), A ? I(Uint8Array.from([_.hasEvenY() ? 2 : 3]), p) : I(Uint8Array.from([4]), p, r.toBytes(m.y));
    },
    fromBytes(d) {
      const _ = d.length, A = d[0], m = d.subarray(1);
      if (_ === s && (A === 2 || A === 3)) {
        const p = Hr(m);
        if (!Ai(p, ye, r.ORDER))
          throw new Error("Point is not on curve");
        const I = g(p);
        let v;
        try {
          v = r.sqrt(I);
        } catch (b) {
          const q = b instanceof Error ? ": " + b.message : "";
          throw new Error("Point is not on curve" + q);
        }
        const w = (v & ye) === ye;
        return (A & 1) === 1 !== w && (v = r.neg(v)), { x: p, y: v };
      } else if (_ === i && A === 4) {
        const p = r.fromBytes(m.subarray(0, r.BYTES)), I = r.fromBytes(m.subarray(r.BYTES, 2 * r.BYTES));
        return { x: p, y: I };
      } else
        throw new Error(`Point of length ${_} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), C = (d) => mn(bn(d, t.nByteLength));
  function S(d) {
    const _ = n >> ye;
    return d > _;
  }
  function Q(d) {
    return S(d) ? o(-d) : d;
  }
  const N = (d, _, A) => Hr(d.slice(_, A));
  class T {
    constructor(_, A, m) {
      this.r = _, this.s = A, this.recovery = m, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(_) {
      const A = t.nByteLength;
      return _ = Ve("compactSignature", _, A * 2), new T(N(_, 0, A), N(_, A, 2 * A));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(_) {
      const { r: A, s: m } = ur.toSig(Ve("DER", _));
      return new T(A, m);
    }
    assertValidity() {
      Yr("r", this.r, ye, n), Yr("s", this.s, ye, n);
    }
    addRecoveryBit(_) {
      return new T(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: A, s: m, recovery: p } = this, I = L(Ve("msgHash", _));
      if (p == null || ![0, 1, 2, 3].includes(p))
        throw new Error("recovery id invalid");
      const v = p === 2 || p === 3 ? A + t.n : A;
      if (v >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const w = p & 1 ? "03" : "02", h = u.fromHex(w + C(v)), b = a(v), q = o(-I * b), Z = o(m * b), et = u.BASE.multiplyAndAddUnsafe(h, q, Z);
      if (!et)
        throw new Error("point at infinify");
      return et.assertValidity(), et;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return S(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new T(this.r, o(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return yn(this.toDERHex());
    }
    toDERHex() {
      return ur.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return yn(this.toCompactHex());
    }
    toCompactHex() {
      return C(this.r) + C(this.s);
    }
  }
  const M = {
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
      const d = Y0(t.n);
      return d1(t.randomBytes(d), t.n);
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
  function H(d, _ = !0) {
    return u.fromPrivateKey(d).toRawBytes(_);
  }
  function G(d) {
    const _ = Zr(d), A = typeof d == "string", m = (_ || A) && d.length;
    return _ ? m === s || m === i : A ? m === 2 * s || m === 2 * i : d instanceof u;
  }
  function Y(d, _, A = !0) {
    if (G(d))
      throw new Error("first arg must be private key");
    if (!G(_))
      throw new Error("second arg must be public key");
    return u.fromHex(_).multiply(f(d)).toRawBytes(A);
  }
  const O = t.bits2int || function(d) {
    const _ = Hr(d), A = d.length * 8 - t.nBitLength;
    return A > 0 ? _ >> BigInt(A) : _;
  }, L = t.bits2int_modN || function(d) {
    return o(O(d));
  }, z = Ia(t.nBitLength);
  function U(d) {
    return Yr(`num < 2^${t.nBitLength}`, d, _r, z), bn(d, t.nByteLength);
  }
  function k(d, _, A = j) {
    if (["recovered", "canonical"].some((st) => st in A))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: p } = t;
    let { lowS: I, prehash: v, extraEntropy: w } = A;
    I == null && (I = !0), d = Ve("msgHash", d), md(A), v && (d = Ve("prehashed msgHash", m(d)));
    const h = L(d), b = f(_), q = [U(b), U(h)];
    if (w != null && w !== !1) {
      const st = w === !0 ? p(r.BYTES) : w;
      q.push(Ve("extraEntropy", st));
    }
    const Z = Hn(...q), et = h;
    function nt(st) {
      const at = O(st);
      if (!E(at))
        return;
      const Mt = a(at), ht = u.BASE.multiply(at).toAffine(), dt = o(ht.x);
      if (dt === _r)
        return;
      const Tt = o(Mt * o(et + dt * b));
      if (Tt === _r)
        return;
      let pt = (ht.x === dt ? 0 : 2) | Number(ht.y & ye), yt = Tt;
      return I && S(Tt) && (yt = Q(Tt), pt ^= 1), new T(dt, yt, pt);
    }
    return { seed: Z, k2sig: nt };
  }
  const j = { lowS: t.lowS, prehash: !1 }, V = { lowS: t.lowS, prehash: !1 };
  function tt(d, _, A = j) {
    const { seed: m, k2sig: p } = k(d, _, A), I = t;
    return c0(I.hash.outputLen, I.nByteLength, I.hmac)(m, p);
  }
  u.BASE._setWindowSize(8);
  function B(d, _, A, m = V) {
    var ht;
    const p = d;
    if (_ = Ve("msgHash", _), A = Ve("publicKey", A), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    md(m);
    const { lowS: I, prehash: v } = m;
    let w, h;
    try {
      if (typeof p == "string" || Zr(p))
        try {
          w = T.fromDER(p);
        } catch (dt) {
          if (!(dt instanceof ur.Err))
            throw dt;
          w = T.fromCompact(p);
        }
      else if (typeof p == "object" && typeof p.r == "bigint" && typeof p.s == "bigint") {
        const { r: dt, s: Tt } = p;
        w = new T(dt, Tt);
      } else
        throw new Error("PARSE");
      h = u.fromHex(A);
    } catch (dt) {
      if (dt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (I && w.hasHighS())
      return !1;
    v && (_ = t.hash(_));
    const { r: b, s: q } = w, Z = L(_), et = a(q), nt = o(Z * et), st = o(b * et), at = (ht = u.BASE.multiplyAndAddUnsafe(h, nt, st)) == null ? void 0 : ht.toAffine();
    return at ? o(at.x) === b : !1;
  }
  return {
    CURVE: t,
    getPublicKey: H,
    getSharedSecret: Y,
    sign: tt,
    verify: B,
    ProjectivePoint: u,
    Signature: T,
    utils: M
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function m1(e) {
  return {
    hash: e,
    hmac: (t, ...r) => hi(e, t, el(...r)),
    randomBytes: nl
  };
}
function y1(e, t) {
  const r = (n) => w1({ ...e, ...m1(n) });
  return Object.freeze({ ...r(t), create: r });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Z0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), bd = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), b1 = BigInt(1), Fo = BigInt(2), Id = (e, t) => (e + t / Fo) / t;
function I1(e) {
  const t = Z0, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), u = BigInt(88), f = e * e * e % t, g = f * f * e % t, E = ke(g, r, t) * g % t, C = ke(E, r, t) * g % t, S = ke(C, Fo, t) * f % t, Q = ke(S, s, t) * S % t, N = ke(Q, i, t) * Q % t, T = ke(N, a, t) * N % t, M = ke(T, u, t) * T % t, H = ke(M, a, t) * N % t, G = ke(H, r, t) * g % t, Y = ke(G, o, t) * Q % t, O = ke(Y, n, t) * f % t, L = ke(O, Fo, t);
  if (!Mo.eql(Mo.sqr(L), e))
    throw new Error("Cannot find square root");
  return L;
}
const Mo = X0(Z0, void 0, void 0, { sqrt: I1 }), Ir = y1({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Mo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: bd,
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
      const t = bd, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -b1 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, o = BigInt("0x100000000000000000000000000000000"), a = Id(i * e, t), u = Id(-n * e, t);
      let f = De(e - a * r - u * s, t), g = De(-a * n - u * i, t);
      const E = f > o, C = g > o;
      if (E && (f = t - f), C && (g = t - g), f > o || g > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: E, k1: f, k2neg: C, k2: g };
    }
  }
}, jr);
BigInt(0);
Ir.ProjectivePoint;
var xa = { exports: {} }, _n = typeof Reflect == "object" ? Reflect : null, Ed = _n && typeof _n.apply == "function" ? _n.apply : function(t, r, n) {
  return Function.prototype.apply.call(t, r, n);
}, Fs;
_n && typeof _n.ownKeys == "function" ? Fs = _n.ownKeys : Object.getOwnPropertySymbols ? Fs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Fs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function E1(e) {
  console && console.warn && console.warn(e);
}
var J0 = Number.isNaN || function(t) {
  return t !== t;
};
function Nt() {
  Nt.init.call(this);
}
xa.exports = Nt;
xa.exports.once = x1;
Nt.EventEmitter = Nt;
Nt.prototype._events = void 0;
Nt.prototype._eventsCount = 0;
Nt.prototype._maxListeners = void 0;
var vd = 10;
function yi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Nt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return vd;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || J0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    vd = e;
  }
});
Nt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Nt.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || J0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function q0(e) {
  return e._maxListeners === void 0 ? Nt.defaultMaxListeners : e._maxListeners;
}
Nt.prototype.getMaxListeners = function() {
  return q0(this);
};
Nt.prototype.emit = function(t) {
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
    Ed(u, this, r);
  else
    for (var f = u.length, g = e_(u, f), n = 0; n < f; ++n)
      Ed(g[n], this, r);
  return !0;
};
function j0(e, t, r, n) {
  var s, i, o;
  if (yi(r), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    r.listener ? r.listener : r
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = r, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), s = q0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, E1(a);
  }
  return e;
}
Nt.prototype.addListener = function(t, r) {
  return j0(this, t, r, !1);
};
Nt.prototype.on = Nt.prototype.addListener;
Nt.prototype.prependListener = function(t, r) {
  return j0(this, t, r, !0);
};
function v1() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function $0(e, t, r) {
  var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r }, s = v1.bind(n);
  return s.listener = r, n.wrapFn = s, s;
}
Nt.prototype.once = function(t, r) {
  return yi(r), this.on(t, $0(this, t, r)), this;
};
Nt.prototype.prependOnceListener = function(t, r) {
  return yi(r), this.prependListener(t, $0(this, t, r)), this;
};
Nt.prototype.removeListener = function(t, r) {
  var n, s, i, o, a;
  if (yi(r), s = this._events, s === void 0)
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
    i === 0 ? n.shift() : C1(n, i), n.length === 1 && (s[t] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || r);
  }
  return this;
};
Nt.prototype.off = Nt.prototype.removeListener;
Nt.prototype.removeAllListeners = function(t) {
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
function K0(e, t, r) {
  var n = e._events;
  if (n === void 0)
    return [];
  var s = n[t];
  return s === void 0 ? [] : typeof s == "function" ? r ? [s.listener || s] : [s] : r ? B1(s) : e_(s, s.length);
}
Nt.prototype.listeners = function(t) {
  return K0(this, t, !0);
};
Nt.prototype.rawListeners = function(t) {
  return K0(this, t, !1);
};
Nt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : t_.call(e, t);
};
Nt.prototype.listenerCount = t_;
function t_(e) {
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
Nt.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Fs(this._events) : [];
};
function e_(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e[n];
  return r;
}
function C1(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function B1(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
    t[r] = e[r].listener || e[r];
  return t;
}
function x1(e, t) {
  return new Promise(function(r, n) {
    function s(o) {
      e.removeListener(t, i), n(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), r([].slice.call(arguments));
    }
    r_(e, t, i, { once: !0 }), t !== "error" && R1(e, s, { once: !0 });
  });
}
function R1(e, t, r) {
  typeof e.on == "function" && r_(e, "error", t, r);
}
function r_(e, t, r, n) {
  if (typeof e.on == "function")
    n.once ? e.once(t, r) : e.on(t, r);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      n.once && e.removeEventListener(t, s), r(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var n_ = xa.exports, S1 = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", N1 = class {
  constructor(e, t, r, n, s, i = 0) {
    F(this, "left");
    F(this, "right");
    F(this, "parent");
    F(this, "hash");
    F(this, "data");
    F(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, Cd = N1;
function T1(e) {
  return Je("0x00".concat(e.slice(2)));
}
function D1(e, t) {
  return Je("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function s_(e) {
  if (!e.length)
    return S1;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = T1(e[i]);
    t.push(new Cd(-1, -1, -1, o, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const o = i << 1, a = D1(r[o].hash, r[o + 1].hash);
      t[i] = new Cd(r[o].index, r[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var Q1 = "0x00", i_ = "0x01";
function F1(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(Je(t).slice(2));
  return [Je(r), r];
}
function tn(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Je(r), r];
}
function ro(e) {
  const t = i_.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function M1(e) {
  const t = i_.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function no(e) {
  return e.slice(0, 4) === Q1;
}
var O1 = class {
  constructor(e, t, r, n, s) {
    F(this, "SideNodes");
    F(this, "NonMembershipLeafData");
    F(this, "BitMask");
    F(this, "NumSideNodes");
    F(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, L1 = O1, k1 = class {
  constructor(e, t, r) {
    F(this, "SideNodes");
    F(this, "NonMembershipLeafData");
    F(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, P1 = k1, Me = "0x0000000000000000000000000000000000000000000000000000000000000000", dr = 256;
function cn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function U1(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function z1(e, t) {
  let r = 0;
  for (let n = 0; n < dr && cn(e, n) === cn(t, n); n += 1)
    r += 1;
  return r;
}
function G1(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Me ? t.push(0) : (r.push(n), t.push(1));
  return new L1(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var W1 = class {
  constructor() {
    F(this, "ms");
    F(this, "root");
    const e = {};
    this.ms = e, this.root = Me, this.ms[this.root] = Me;
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
    if (t === Me)
      return [r, Me, "", ""];
    let n = this.get(t);
    if (no(n))
      return [r, t, n, ""];
    let s, i, o = "", a = "";
    for (let f = 0; f < dr; f += 1) {
      if ([s, i] = M1(n), cn(e, f) === 1 ? (a = s, o = i) : (a = i, o = s), r.push(a), o === Me) {
        n = "";
        break;
      }
      if (n = this.get(o), no(n))
        break;
    }
    const u = this.get(a);
    return [U1(r), o, n, u];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Me)
      return this.root;
    const [s] = ro(n);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", u = "", f = !1;
    for (let g = 0; g < t.length; g += 1)
      if (t[g] !== "") {
        if (a = t[g], o === "")
          if (u = this.get(a), no(u)) {
            i = a, o = a;
            continue;
          } else
            o = Me, f = !0;
        !f && a === Me || (f || (f = !0), cn(e, t.length - 1 - g) === 1 ? [i, o] = tn(a, o) : [i, o] = tn(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Me), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, o;
    this.set(Je(t), t), [i, o] = F1(e, t), this.set(i, o), o = i;
    let a;
    if (n === Me)
      a = dr;
    else {
      const [u] = ro(s);
      a = z1(e, u);
    }
    a !== dr && (cn(e, a) === 1 ? [i, o] = tn(n, o) : [i, o] = tn(o, n), this.set(i, o), o = i);
    for (let u = 0; u < dr; u += 1) {
      let f;
      const g = dr - r.length;
      if (u - g < 0 || r[u - g] === "")
        if (a !== dr && a > dr - 1 - u)
          f = Me;
        else
          continue;
      else
        f = r[u - g];
      cn(e, dr - 1 - u) === 1 ? [i, o] = tn(f, o) : [i, o] = tn(o, f), this.set(i, o), o = i;
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
    if (r !== Me) {
      const [u] = ro(n);
      u !== e && (o = n);
    }
    return new P1(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return G1(t);
  }
}, X1 = Object.defineProperty, H1 = (e, t, r) => t in e ? X1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Pt = (e, t, r) => (H1(e, typeof t != "symbol" ? t + "" : t, r), r), Ra = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Lt = (e, t, r) => (Ra(e, t, "read from private field"), r ? r.call(e) : t.get(e)), xr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Ze = (e, t, r, n) => (Ra(e, t, "write to private field"), t.set(e, r), r), Oo = (e, t, r) => (Ra(e, t, "access private method"), r), Sa = (e) => {
  let t, r, n;
  Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0);
  const s = R(r);
  return {
    assetId: K(t),
    amount: s.lt(1) ? R(1) : s,
    max: n ? R(n) : void 0
  };
}, Y1 = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, o_ = it`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Na = it`
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
    `, a_ = it`
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
    ${Na}`, V1 = it`
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
    `, c_ = it`
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
    ${Na}`, d_ = it`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, Ta = it`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on FailureStatus {
    ...FailureStatusFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
}
    ${o_}
${a_}
${V1}
${c_}
${d_}`, Z1 = it`
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
    ${o_}
${a_}
${c_}
${d_}`, hs = it`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${Z1}`, J1 = it`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, q1 = it`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${J1}`, j1 = it`
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
    `, $1 = it`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, K1 = it`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${j1}
${$1}`, tE = it`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${K1}
${Na}`, Da = it`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, eE = it`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, u_ = it`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, rE = it`
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
    `, __ = it`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, bi = it`
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
    `, nE = it`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, sE = it`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, iE = it`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, oE = it`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, aE = it`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, cE = it`
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
    `, dE = it`
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
  bldd {
    ...DependentCostFragment
  }
  bsiz {
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
  ed19DependentCost {
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
    ${cE}`, uE = it`
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
    ${nE}
${sE}
${iE}
${oE}
${aE}
${dE}`, _E = it`
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
    ${bi}
${uE}`, hE = it`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Cn = it`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, lE = it`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, fE = it`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, AE = it`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, pE = it`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${lE}`, gE = it`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${_E}`, wE = it`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${hs}`, mE = it`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${hs}`, yE = it`
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
    ${hs}
${Cn}`, bE = it`
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
    ${Cn}
${hs}`, IE = it`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${q1}`, EE = it`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${bi}`, vE = it`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${bi}
${hs}`, CE = it`
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
    ${Cn}
${bi}`, BE = it`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${Da}`, xE = it`
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
    ${Cn}
${Da}`, RE = it`
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
    ${Da}
${eE}`, SE = it`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, NE = it`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${hE}`, TE = it`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${__}`, DE = it`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, QE = it`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, FE = it`
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
    ${Cn}
${__}`, ME = it`
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
    ${Cn}
${u_}`, OE = it`
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
    ${rE}`, LE = it`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, kE = it`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${fE}`, PE = it`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${tE}`, UE = it`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, zE = it`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, GE = it`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${u_}`, WE = it`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ta}`, XE = it`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ta}`, HE = it`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ta}`;
function YE(e) {
  return {
    getVersion(t, r) {
      return e(AE, t, r);
    },
    getNodeInfo(t, r) {
      return e(pE, t, r);
    },
    getChain(t, r) {
      return e(gE, t, r);
    },
    getTransaction(t, r) {
      return e(wE, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(mE, t, r);
    },
    getTransactions(t, r) {
      return e(yE, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(bE, t, r);
    },
    estimatePredicates(t, r) {
      return e(IE, t, r);
    },
    getBlock(t, r) {
      return e(EE, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(vE, t, r);
    },
    getBlocks(t, r) {
      return e(CE, t, r);
    },
    getCoin(t, r) {
      return e(BE, t, r);
    },
    getCoins(t, r) {
      return e(xE, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(RE, t, r);
    },
    getContract(t, r) {
      return e(SE, t, r);
    },
    getContractBalance(t, r) {
      return e(NE, t, r);
    },
    getBalance(t, r) {
      return e(TE, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(DE, t, r);
    },
    estimateGasPrice(t, r) {
      return e(QE, t, r);
    },
    getBalances(t, r) {
      return e(FE, t, r);
    },
    getMessages(t, r) {
      return e(ME, t, r);
    },
    getMessageProof(t, r) {
      return e(OE, t, r);
    },
    getMessageStatus(t, r) {
      return e(LE, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(kE, t, r);
    },
    dryRun(t, r) {
      return e(PE, t, r);
    },
    submit(t, r) {
      return e(UE, t, r);
    },
    produceBlocks(t, r) {
      return e(zE, t, r);
    },
    getMessageByNonce(t, r) {
      return e(GE, t, r);
    },
    submitAndAwait(t, r) {
      return e(WE, t, r);
    },
    submitAndAwaitStatus(t, r) {
      return e(XE, t, r);
    },
    statusChange(t, r) {
      return e(HE, t, r);
    }
  };
}
var Ms = class {
  constructor(e) {
    F(this, "events", []);
    F(this, "parsingLeftover", "");
    this.stream = e;
  }
  static async create(e) {
    const { url: t, query: r, variables: n, fetchFn: s } = e, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: y0(r),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [o, a] = i.body.tee().map((u) => u.getReader());
    return await new Ms(o).next(), new Ms(a);
  }
  async next() {
    for (; ; ) {
      if (this.events.length > 0) {
        const { data: o, errors: a } = this.events.shift();
        if (Array.isArray(a))
          throw new x(
            x.CODES.INVALID_REQUEST,
            a.map((u) => u.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const r = Ms.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (r === "")
        continue;
      const n = `${this.parsingLeftover}${r}`, s = /data:.*\n\n/g, i = [...n.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new x(
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
}, h_ = Ms;
Pt(h_, "textDecoder", new TextDecoder());
var br = /* @__PURE__ */ new Map(), Bd = class {
  constructor(e) {
    F(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new x(
        D.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(e, t) {
    const r = Date.now(), n = br.get(e) || {
      utxos: /* @__PURE__ */ new Set(),
      messages: /* @__PURE__ */ new Set(),
      timestamp: r
    };
    t.utxos.forEach((s) => n.utxos.add(K(s))), t.messages.forEach((s) => n.messages.add(K(s))), br.set(e, n);
  }
  // Remove resources from the cache for a given transaction ID
  unset(e) {
    br.delete(e);
  }
  // Get all cached resources and remove expired ones
  getActiveData() {
    const e = { utxos: [], messages: [] }, t = Date.now();
    return br.forEach((r, n) => {
      t - r.timestamp < this.ttl ? (e.utxos.push(...r.utxos), e.messages.push(...r.messages)) : br.delete(n);
    }), e;
  }
  // Check if a UTXO ID or message nonce is already cached and not expired
  isCached(e) {
    const t = Date.now();
    for (const [r, n] of br.entries())
      if (t - n.timestamp > this.ttl)
        br.delete(r);
      else if (n.utxos.has(e) || n.messages.has(e))
        return !0;
    return !1;
  }
  clear() {
    br.clear();
  }
}, VE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ct.Coin: {
      const r = $(e.predicate ?? "0x"), n = $(e.predicateData ?? "0x");
      return {
        type: Ct.Coin,
        txID: K($(e.id).slice(0, fr)),
        outputIndex: Cr($(e.id).slice(fr, zs)),
        owner: K(e.owner),
        amount: R(e.amount),
        assetId: K(e.assetId),
        txPointer: {
          blockHeight: Cr($(e.txPointer).slice(0, 8)),
          txIndex: Cr($(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: R(e.predicateGasUsed),
        predicateLength: R(r.length),
        predicateDataLength: R(n.length),
        predicate: K(r),
        predicateData: K(n)
      };
    }
    case Ct.Contract:
      return {
        type: Ct.Contract,
        txID: Dt,
        outputIndex: 0,
        balanceRoot: Dt,
        stateRoot: Dt,
        txPointer: {
          blockHeight: Cr($(e.txPointer).slice(0, 8)),
          txIndex: Cr($(e.txPointer).slice(8, 16))
        },
        contractID: K(e.contractId)
      };
    case Ct.Message: {
      const r = $(e.predicate ?? "0x"), n = $(e.predicateData ?? "0x"), s = $(e.data ?? "0x");
      return {
        type: Ct.Message,
        sender: K(e.sender),
        recipient: K(e.recipient),
        amount: R(e.amount),
        nonce: K(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: R(e.predicateGasUsed),
        predicateLength: R(r.length),
        predicateDataLength: R(n.length),
        predicate: K(r),
        predicateData: K(n),
        data: K(s),
        dataLength: s.length
      };
    }
    default:
      throw new x(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, ZE = (e) => {
  const { type: t } = e;
  switch (t) {
    case vt.Coin:
      return {
        type: vt.Coin,
        to: K(e.to),
        amount: R(e.amount),
        assetId: K(e.assetId)
      };
    case vt.Contract:
      return {
        type: vt.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Dt,
        stateRoot: Dt
      };
    case vt.Change:
      return {
        type: vt.Change,
        to: K(e.to),
        amount: R(0),
        assetId: K(e.assetId)
      };
    case vt.Variable:
      return {
        type: vt.Variable,
        to: Dt,
        amount: R(0),
        assetId: Dt
      };
    case vt.ContractCreated:
      return {
        type: vt.ContractCreated,
        contractId: K(e.contractId),
        stateRoot: K(e.stateRoot)
      };
    default:
      throw new x(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, xd = (e) => !("data" in e), WC = (e) => "utxoId" in e, XC = (e) => "recipient" in e, JE = (e) => "id" in e, HC = (e) => "recipient" in e, qE = (e) => e.type === At.Revert && e.val.toString("hex") === x0, jE = (e) => e.type === At.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Rd = (e) => e.reduce(
  (t, r) => (qE(r) && t.missingOutputVariables.push(r), jE(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Ft = (e) => e || Dt;
function $E(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: At.Call,
        from: Ft(e.id || e.contractId),
        to: Ft(e == null ? void 0 : e.to),
        amount: R(e.amount),
        assetId: Ft(e.assetId),
        gas: R(e.gas),
        param1: R(e.param1),
        param2: R(e.param2),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "RETURN":
      return {
        type: At.Return,
        id: Ft(e.id || e.contractId),
        val: R(e.val),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "RETURN_DATA":
      return {
        type: At.ReturnData,
        id: Ft(e.id || e.contractId),
        ptr: R(e.ptr),
        len: R(e.len),
        digest: Ft(e.digest),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "PANIC":
      return {
        type: At.Panic,
        id: Ft(e.id),
        reason: R(e.reason),
        pc: R(e.pc),
        is: R(e.is),
        contractId: Ft(e.contractId)
      };
    case "REVERT":
      return {
        type: At.Revert,
        id: Ft(e.id || e.contractId),
        val: R(e.ra),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "LOG":
      return {
        type: At.Log,
        id: Ft(e.id || e.contractId),
        val0: R(e.ra),
        val1: R(e.rb),
        val2: R(e.rc),
        val3: R(e.rd),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "LOG_DATA":
      return {
        type: At.LogData,
        id: Ft(e.id || e.contractId),
        val0: R(e.ra),
        val1: R(e.rb),
        ptr: R(e.ptr),
        len: R(e.len),
        digest: Ft(e.digest),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "TRANSFER":
      return {
        type: At.Transfer,
        from: Ft(e.id || e.contractId),
        to: Ft(e.toAddress || (e == null ? void 0 : e.to)),
        amount: R(e.amount),
        assetId: Ft(e.assetId),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: At.TransferOut,
        from: Ft(e.id || e.contractId),
        to: Ft(e.toAddress || e.to),
        amount: R(e.amount),
        assetId: Ft(e.assetId),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: At.ScriptResult,
        result: R(e.result),
        gasUsed: R(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const r = Ft(e.sender), n = Ft(e.recipient), s = Ft(e.nonce), i = R(e.amount), o = e.data ? $(e.data) : Uint8Array.from([]), a = Ft(e.digest), u = Tr.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: K(o)
      });
      return {
        type: At.MessageOut,
        sender: r,
        recipient: n,
        amount: i,
        nonce: s,
        data: o,
        digest: a,
        messageId: u
      };
    }
    case "MINT": {
      const r = Ft(e.id || e.contractId), n = Ft(e.subId), s = Xn(r, n);
      return {
        type: At.Mint,
        subId: n,
        contractId: r,
        assetId: s,
        val: R(e.val),
        pc: R(e.pc),
        is: R(e.is)
      };
    }
    case "BURN": {
      const r = Ft(e.id || e.contractId), n = Ft(e.subId), s = Xn(r, n);
      return {
        type: At.Burn,
        subId: n,
        contractId: r,
        assetId: s,
        val: R(e.val),
        pc: R(e.pc),
        is: R(e.is)
      };
    }
    default:
      throw new x(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var KE = "https://app.fuel.network", tv = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, YC = (e = {}) => {
  const { blockExplorerUrl: t, path: r, providerUrl: n, address: s, txId: i, blockNumber: o } = e, a = t || KE, u = [
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
  ], f = u.filter((Y) => !!Y.value).map(({ key: Y, value: O }) => ({
    key: Y,
    value: O
  })), g = f.length > 0;
  if (f.length > 1)
    throw new x(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${u.map((Y) => Y.key).join(", ")}.`
    );
  if (r && f.length > 0) {
    const Y = u.map(({ key: O }) => O).join(", ");
    throw new x(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${Y}.`
    );
  }
  const E = g ? tv(
    f[0].key,
    f[0].value
  ) : "", C = /^\/|\/$/gm, S = r ? r.replace(C, "") : E, Q = a.replace(C, ""), N = n == null ? void 0 : n.replace(C, ""), T = N ? encodeURIComponent(N) : void 0, M = Q.match(/^https?:\/\//) ? "" : "https://", H = N != null && N.match(/^https?:\/\//) ? "" : "https://";
  return `${M}${Q}/${S}${T ? `?providerUrl=${H}${T}` : ""}`;
}, Ii = (e) => e.filter(
  (n) => n.type === At.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), R(0));
function Re(e, t) {
  const r = R(t.base);
  let n = R(0);
  return "unitsPerGas" in t ? n = R(e).div(R(t.unitsPerGas)) : n = R(e).mul(R(t.gasPerUnit)), r.add(n);
}
function ev(e, t, r) {
  const n = [], s = e.filter((a) => {
    if ("owner" in a || "sender" in a) {
      if ("predicate" in a && a.predicate && a.predicate !== "0x")
        return !0;
      if (!n.includes(a.witnessIndex))
        return n.push(a.witnessIndex), !0;
    }
    return !1;
  }), i = Re(t, r.vmInitialization);
  return s.reduce((a, u) => "predicate" in u && u.predicate && u.predicate !== "0x" ? a.add(
    i.add(Re($(u.predicate).length, r.contractRoot)).add(R(u.predicateGasUsed))
  ) : a.add(r.ecr1), R(0));
}
function l_(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, o = Re(i, t.vmInitialization), a = R(i).mul(r), u = ev(n, i, t);
  return o.add(a).add(u).add(s).maxU64();
}
function Qa(e) {
  const {
    gasPerByte: t,
    witnessesLength: r,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = R(0),
    maxGasPerTx: o
  } = e;
  let a = R(0);
  n != null && n.gt(0) && n.gte(r) && (a = R(n).sub(r).mul(t));
  const u = a.add(s).add(i);
  return u.gte(o) ? o : u;
}
function f_({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = Re(n, e.contractRoot), i = Re(t, e.stateRoot), o = Re(r, e.s256), a = R(100), u = Re(a, e.s256);
  return s.add(i).add(o).add(u).maxU64();
}
function A_({
  gasCosts: e,
  txBytesSize: t
}) {
  return Re(t, e.s256);
}
function rv({
  gasCosts: e,
  txBytesSize: t,
  witnessBytesSize: r
}) {
  const n = Re(t, e.s256), s = Re(r, e.s256);
  return n.add(s);
}
function Sd({
  gasCosts: e,
  txBytesSize: t,
  consensusSize: r
}) {
  const n = Re(t, e.s256);
  if (r) {
    const s = Re(r, e.s256);
    n.add(s);
  }
  return n;
}
function nv({
  gasCosts: e,
  txBytesSize: t,
  subsectionSize: r,
  subsectionsSize: n
}) {
  const s = Re(t, e.s256), i = Re(r, e.s256);
  s.add(i);
  const o = Re(n, e.stateRoot);
  return s.add(o), s;
}
function sv({
  gasCosts: e,
  baseMinGas: t,
  subsectionSize: r
}) {
  const n = R(e.newStoragePerByte).mul(r);
  return R(t).add(n);
}
var Zn = (e) => {
  const { gas: t, gasPrice: r, priceFactor: n, tip: s } = e;
  return t.mul(r).div(n).add(R(s));
};
function Lo(e) {
  return Object.keys(e).forEach((t) => {
    var r;
    switch ((r = e[t]) == null ? void 0 : r.constructor.name) {
      case "Uint8Array":
        e[t] = K(e[t]);
        break;
      case "Array":
        e[t] = Lo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Lo(e[t]);
        break;
    }
  }), e;
}
function iv(e) {
  return Lo(Be(e));
}
var ov = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return Kp.includes(e) && (r = `${r}

You can read more about this error at:

${tg}#variant.${e}`), new x(D.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, Fn = (e) => JSON.stringify(e, null, 2), av = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === At.Revert);
  let i = "";
  if (s) {
    const o = R(s.val).toHex(), a = t[t.length - 1], u = t[t.length - 2];
    switch (o) {
      case Jp: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Fn(a) : "an error."}.`;
        break;
      }
      case qp: {
        const f = t.length >= 2 ? ` comparing ${Fn(a)} and ${Fn(u)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${f}`;
        break;
      }
      case $p: {
        const f = t.length >= 2 ? ` comparing ${Fn(u)} and ${Fn(a)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${f}`;
        break;
      }
      case jp:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case x0:
        i = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        throw new x(
          D.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...r,
            reason: "unknown"
          }
        );
    }
  }
  return new x(D.SCRIPT_REVERTED, n, {
    ...r,
    reason: i
  });
}, Fa = (e) => {
  const { receipts: t, statusReason: r, logs: n } = e, s = t.some(({ type: a }) => a === At.Panic), i = t.some(({ type: a }) => a === At.Revert), o = {
    logs: n,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? ov(r, o) : av(t, n, o);
}, VC = class extends Error {
  constructor() {
    super(...arguments);
    F(this, "name", "ChangeOutputCollisionError");
    F(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, cv = class extends Error {
  constructor(t) {
    super();
    F(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, ZC = class extends Error {
  constructor(t) {
    super();
    F(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, $r = (e) => e.type === Ct.Coin, Ma = (e) => e.type === Ct.Message, p_ = (e) => e.type === Ct.Message && R(e.data).isZero(), g_ = (e) => $r(e) || Ma(e), qr = (e) => $r(e) || p_(e), w_ = (e) => $r(e) ? e.owner : e.recipient, ko = (e, t) => w_(e) === t.toB256(), dv = (e, t, r) => e.filter(qr).reduce((n, s) => $r(s) && s.assetId === t || Ma(s) && t === r ? n.add(s.amount) : n, R(0)), JC = (e) => e.filter(qr).reduce(
  (t, r) => ($r(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), uv = (e, t) => e.reduce(
  (r, n) => ($r(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : Ma(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), _v = (e) => {
  const t = $(e);
  return {
    data: K(t),
    dataLength: t.length
  };
}, Bn = class {
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
    this.tip = e ? R(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = Qr(n) ? R(n) : void 0, this.maxFee = R(r), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const r = [], { tip: n, witnessLimit: s, maturity: i } = e;
    return R(n).gt(0) && (t += Ye.Tip, r.push({ data: R(n), type: Ye.Tip })), Qr(s) && R(s).gte(0) && (t += Ye.WitnessLimit, r.push({ data: R(s), type: Ye.WitnessLimit })), i && i > 0 && (t += Ye.Maturity, r.push({ data: i, type: Ye.Maturity })), t += Ye.MaxFee, r.push({ data: e.maxFee, type: Ye.MaxFee }), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(VE)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(ZE)) ?? [], r = ((a = this.witnesses) == null ? void 0 : a.map(_v)) ?? [], { policyTypes: n, policies: s } = Bn.getPolicyMeta(this);
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
    return new lr().encode(this.toTransaction());
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
    return this.addWitness(ut([Dt, Dt])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const r = ft.fromAddressOrString(e), n = this.getCoinInputWitnessIndexByOwner(r);
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
      throw new cv(e);
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
      (e) => e.type === Ct.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === vt.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === vt.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = On(e), r = this.inputs.find((n) => {
      switch (n.type) {
        case Ct.Coin:
          return K(n.owner) === t.toB256();
        case Ct.Message:
          return K(n.recipient) === t.toB256();
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
      type: Ct.Coin,
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
      type: Ct.Message,
      sender: r.toB256(),
      recipient: t.toB256(),
      data: xd(e) ? "0x" : e.data,
      amount: n,
      witnessIndex: a,
      predicate: s,
      predicateData: o
    };
    this.pushInput(u), xd(e) && this.addChangeOutput(t, e.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return JE(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      type: vt.Coin,
      to: On(e).toB256(),
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
    return t.map(Sa).forEach((r) => {
      this.pushOutput({
        type: vt.Coin,
        to: On(e).toB256(),
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
      (n) => K(n.assetId) === t
    ) || this.pushOutput({
      type: vt.Change,
      to: On(e).toB256(),
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(e) {
    const { consensusParameters: t } = e, {
      gasCosts: r,
      feeParameters: { gasPerByte: n }
    } = t;
    return l_({
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
    return Qa({
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
      i === t && (u = R("1000000000000000000")), a && "assetId" in a ? (a.id = K(ze(zs)), a.amount = u) : this.addResources([
        {
          id: K(ze(zs)),
          amount: u,
          assetId: i,
          owner: r || ft.fromRandom(),
          blockCreated: R(1),
          txCreatedIdx: R(1)
        }
      ]);
    };
    return s(t, R(1e11)), e.forEach((i) => s(i.assetId, i.amount)), this;
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: r }) => ({
      amount: R(t),
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
    return iv(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(qr).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(g_);
    this.inputs.filter(qr).forEach((r) => {
      const n = w_(r), s = t.find(
        (i) => ko(i, ft.fromString(String(n)))
      );
      s && "predicateGasUsed" in s && R(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
};
function ls(e, t) {
  const r = e.toTransaction();
  r.type === Bt.Script && (r.receiptsRoot = Dt), r.inputs = r.inputs.map((i) => {
    const o = Be(i);
    switch (o.type) {
      case Ct.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = R(0), o;
      case Ct.Message:
        return o.predicateGasUsed = R(0), o;
      case Ct.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Dt, o.outputIndex = 0, o.balanceRoot = Dt, o.stateRoot = Dt, o;
      default:
        return o;
    }
  }), r.outputs = r.outputs.map((i) => {
    const o = Be(i);
    switch (o.type) {
      case vt.Contract:
        return o.balanceRoot = Dt, o.stateRoot = Dt, o;
      case vt.Change:
        return o.amount = R(0), o;
      case vt.Variable:
        return o.to = Dt, o.amount = R(0), o.assetId = Dt, o;
      default:
        return o;
    }
  }), r.witnessesCount = 0, r.witnesses = [];
  const n = pf(t), s = ut([n, new lr().encode(r)]);
  return Ce(s);
}
var Po = class extends Bn {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, blobId: r, ...n }) {
    super(n);
    /** Type of the transaction */
    F(this, "type", Bt.Blob);
    /** Blob ID */
    F(this, "blobId");
    /** Witness index of contract bytecode to create */
    F(this, "witnessIndex");
    this.blobId = r, this.witnessIndex = t ?? 0;
  }
  static from(t) {
    return new this(Be(t));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { witnessIndex: r, blobId: n } = this;
    return {
      type: Bt.Blob,
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
    return ls(this, t);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(t) {
    return rv({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, hv = (e) => {
  const t = new Uint8Array(32);
  return t.set($(e)), t;
}, lv = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: K(t),
    value: K(hv(r))
  };
}, Uo = class extends Bn {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: r, storageSlots: n, ...s }) {
    super(s);
    /** Type of the transaction */
    F(this, "type", Bt.Create);
    /** Witness index of contract bytecode to create */
    F(this, "bytecodeWitnessIndex");
    /** Salt */
    F(this, "salt");
    /** List of storage slots to initialize */
    F(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = K(r ?? Dt), this.storageSlots = [...n ?? []];
  }
  static from(t) {
    return new this(Be(t));
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var s;
    const t = this.getBaseTransaction(), r = this.bytecodeWitnessIndex, n = ((s = this.storageSlots) == null ? void 0 : s.map(lv)) ?? [];
    return {
      type: Bt.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: R(n.length),
      salt: this.salt ? K(this.salt) : Dt,
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
      (t) => t.type === vt.ContractCreated
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
    return ls(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, r) {
    this.pushOutput({
      type: vt.ContractCreated,
      contractId: t,
      stateRoot: r
    });
  }
  metadataGas(t) {
    return f_({
      contractBytesSize: R($(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Nd = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: $("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, fv = {
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
  bytes: $("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Wr = class extends Bn {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: r, gasLimit: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    F(this, "type", Bt.Script);
    /** Gas limit for transaction */
    F(this, "gasLimit");
    /** Script to execute */
    F(this, "script");
    /** Script input data (parameters) */
    F(this, "scriptData");
    F(this, "abis");
    this.gasLimit = R(n), this.script = $(t ?? Nd.bytes), this.scriptData = $(r ?? Nd.encodeScriptData()), this.abis = s.abis;
  }
  static from(t) {
    return new this(Be(t));
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const t = $(this.script ?? "0x"), r = $(this.scriptData ?? "0x");
    return {
      type: Bt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: R(t.length),
      scriptDataLength: R(r.length),
      receiptsRoot: Dt,
      script: K(t),
      scriptData: K(r)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === Ct.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === vt.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === vt.Variable
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
        type: vt.Variable
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
    return Qa({
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
    const r = On(t);
    if (this.getContractInputs().find((s) => s.contractId === r.toB256()))
      return this;
    const n = super.pushInput({
      type: Ct.Contract,
      contractId: r.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: vt.Contract,
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
    return ls(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, r) {
    const n = new Ar(t);
    return this.scriptData = n.functions.main.encodeArguments(r), this;
  }
  metadataGas(t) {
    return A_({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, zo = class extends Bn {
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
    F(this, "type", Bt.Upgrade);
    /** The upgrade purpose */
    F(this, "upgradePurpose");
    /** Witness index of consensus */
    F(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = r ?? 0, this.upgradePurpose = t ?? {
      type: Pe.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(t) {
    return t instanceof zo ? t : new this(Be(t));
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
      type: Pe.ConsensusParameters,
      checksum: Je(t)
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
      type: Pe.StateTransition,
      data: K(t)
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
    return t === Pe.ConsensusParameters && this.addConsensusParametersUpgradePurpose(r), t === Pe.StateTransition && this.addStateTransitionUpgradePurpose(r), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let t;
    if (this.upgradePurpose.type === Pe.ConsensusParameters)
      t = {
        type: Pe.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === Pe.StateTransition)
      t = {
        type: Pe.StateTransition,
        data: {
          bytecodeRoot: K(this.upgradePurpose.data)
        }
      };
    else
      throw new x(x.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: Bt.Upgrade,
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
    return ls(this, t);
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
    if (this.upgradePurpose.type === Pe.ConsensusParameters) {
      const n = this.bytecodeWitnessIndex, s = this.witnesses[n].length;
      return Sd({
        gasCosts: t,
        txBytesSize: r,
        consensusSize: s
      });
    }
    if (this.upgradePurpose.type === Pe.StateTransition)
      return Sd({
        gasCosts: t,
        txBytesSize: r
      });
    throw new x(x.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, Go = class extends Bn {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, subsection: r, ...n } = {}) {
    super(n);
    /** Type of the transaction */
    F(this, "type", Bt.Upload);
    /** The witness index of the subsection of the bytecode. */
    F(this, "witnessIndex");
    /** The subsection data. */
    F(this, "subsection");
    this.witnessIndex = t ?? 0, this.subsection = r ?? {
      proofSet: [],
      root: Dt,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(t) {
    return t instanceof Go ? t : new this(Be(t));
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
    return ls(this, t);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { subsectionIndex: r, subsectionsNumber: n, root: s, proofSet: i } = this.subsection;
    return {
      type: Bt.Upload,
      ...t,
      subsectionIndex: r,
      subsectionsNumber: n,
      root: K(s),
      proofSet: i.map(K),
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
    return nv({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      subsectionSize: $(this.witnesses[this.witnessIndex]).length,
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
    const r = super.calculateMinGas(t), { gasCosts: n } = t.consensusParameters, s = this.witnesses[this.witnessIndex] ?? Dt;
    return sv({
      gasCosts: n,
      baseMinGas: r.toNumber(),
      subsectionSize: $(s).length
    });
  }
}, Se = (e) => {
  if (e instanceof Wr || e instanceof Uo || e instanceof Po || e instanceof zo || e instanceof Go)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Bt.Script:
      return Wr.from(e);
    case Bt.Create:
      return Uo.from(e);
    case Bt.Blob:
      return Po.from(e);
    case Bt.Upgrade:
      return zo.from(e);
    case Bt.Upload:
      return Go.from(e);
    default:
      throw new x(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, kr = (e) => e.type === Bt.Script, Av = (e) => e.type === Bt.Create, qC = (e) => e.type === Bt.Blob, jC = (e) => e.type === Bt.Upgrade, $C = (e) => e.type === Bt.Upload, pv = (e) => {
  var z;
  const {
    gasPrice: t,
    rawPayload: r,
    tip: n,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: a }
  } = e;
  if (s)
    return s;
  const u = R(o.gasPerByte), f = R(o.gasPriceFactor), g = $(r), [E] = new lr().decode(g, 0), { type: C, witnesses: S, inputs: Q, policies: N } = E;
  let T = R(0), M = R(0);
  if (C !== Bt.Create && C !== Bt.Script)
    return R(0);
  if (C === Bt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: k } = E, j = R($(S[U].data).length);
    T = f_({
      contractBytesSize: j,
      gasCosts: i,
      stateRootSize: k.length || 0,
      txBytesSize: g.length
    });
  } else {
    const { scriptGasLimit: U } = E;
    U && (M = U), T = A_({
      gasCosts: i,
      txBytesSize: g.length
    });
  }
  const H = l_({
    gasCosts: i,
    gasPerByte: R(u),
    inputs: Q,
    metadataGas: T,
    txBytesSize: g.length
  }), G = (z = N.find((U) => U.type === Ye.WitnessLimit)) == null ? void 0 : z.data, Y = S.reduce((U, k) => U + k.dataLength, 0), O = Qa({
    gasPerByte: u,
    minGas: H,
    witnessesLength: Y,
    gasLimit: M,
    witnessLimit: G,
    maxGasPerTx: a
  });
  return Zn({
    gasPrice: t,
    gas: O,
    priceFactor: f,
    tip: n
  });
}, gv = ({ abi: e, receipt: t }) => {
  var g;
  const r = new Ar(e), n = t.param1.toHex(8), s = r.getFunction(n), i = s.jsonFn.inputs, o = t.param2.toHex();
  let a;
  const u = s.decodeArguments(o);
  return u && (a = i.reduce((E, C, S) => {
    const Q = u[S], N = C.name;
    return N ? {
      ...E,
      // reparse to remove bn
      [N]: JSON.parse(JSON.stringify(Q))
    } : E;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: a,
    ...(g = t.amount) != null && g.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function wv(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function Oa(e, t) {
  return e.filter((r) => r.type === t);
}
function mv(e) {
  return Oa(e, Ct.Coin);
}
function yv(e) {
  return Oa(e, Ct.Message);
}
function m_(e) {
  return wv(e, [Ct.Coin, Ct.Message]);
}
function Td(e) {
  return e.type === Ct.Coin;
}
function bv(e) {
  return Oa(e, Ct.Contract);
}
function Iv(e, t) {
  return mv(e).find((n) => n.assetId === t);
}
function Ev(e, t) {
  const r = /* @__PURE__ */ new Map();
  return m_(e).forEach((n) => {
    const s = Td(n) ? n.assetId : t, i = Td(n) ? n.owner : n.recipient;
    let o = r.get(s);
    o || (o = /* @__PURE__ */ new Map(), r.set(s, o));
    let a = o.get(i);
    a || (a = new zt(0), o.set(i, a)), o.set(i, a.add(n.amount));
  }), r;
}
function vv(e) {
  var t;
  return (t = yv(e)) == null ? void 0 : t[0];
}
function y_(e, t, r = !1) {
  const n = Iv(e, t);
  if (n)
    return n;
  if (r)
    return vv(e);
}
function Cv(e, t) {
  if (t == null)
    return;
  const r = e == null ? void 0 : e[t];
  if (r) {
    if (r.type !== Ct.Contract)
      throw new x(
        D.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return r;
  }
}
function La(e) {
  return e.type === Ct.Coin ? e.owner.toString() : e.type === Ct.Message ? e.recipient.toString() : "";
}
function fs(e, t) {
  return e.filter((r) => r.type === t);
}
function Bv(e) {
  return fs(e, vt.ContractCreated);
}
function b_(e) {
  return fs(e, vt.Coin);
}
function xv(e) {
  return fs(e, vt.Change);
}
function Rv(e) {
  return fs(e, vt.Contract);
}
function KC(e) {
  return fs(e, vt.Variable);
}
var Sv = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(Sv || {}), I_ = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(I_ || {}), Nv = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Nv || {}), Tv = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Tv || {}), Dv = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Dv || {});
function Jn(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function E_(e) {
  switch (e) {
    case Bt.Mint:
      return "Mint";
    case Bt.Create:
      return "Create";
    case Bt.Script:
      return "Script";
    case Bt.Blob:
      return "Blob";
    case Bt.Upgrade:
      return "Upgrade";
    case Bt.Upload:
      return "Upload";
    default:
      throw new x(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function xn(e, t) {
  return E_(e) === t;
}
function Qv(e) {
  return xn(
    e,
    "Mint"
    /* Mint */
  );
}
function v_(e) {
  return xn(
    e,
    "Create"
    /* Create */
  );
}
function C_(e) {
  return xn(
    e,
    "Script"
    /* Script */
  );
}
function Fv(e) {
  return xn(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function Mv(e) {
  return xn(
    e,
    "Upload"
    /* Upload */
  );
}
function Ov(e) {
  return xn(
    e,
    "Blob"
    /* Blob */
  );
}
function tB(e) {
  return (t) => e.assetId === t.assetId;
}
function Lv(e) {
  return Jn(e, At.Call);
}
function kv(e) {
  return Jn(e, At.MessageOut);
}
function Pv(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const o = s.get(i.assetId);
    o ? o.amount = R(o.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function Uv(e, t) {
  var r, n, s, i, o, a, u, f;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((u = e.to) == null ? void 0 : u.type) === ((f = t.to) == null ? void 0 : f.type);
}
function zv(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? Pv(e, t) : t.assetsSent : e.assetsSent;
}
function Gv(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function Wv(e, t) {
  return {
    ...e,
    assetsSent: zv(e, t),
    calls: Gv(e, t)
  };
}
function qn(e, t) {
  const r = e.findIndex((n) => Uv(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? Wv(n, t) : n);
}
function eB(e) {
  return Jn(e, At.TransferOut);
}
function Xv({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return kv(t).reduce(
    (i, o) => {
      const a = y_(e, r, !0);
      if (a) {
        const u = La(a);
        return qn(i, {
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
function Hv(e, t, r, n, s) {
  const i = t == null ? void 0 : t[e.contractID];
  return i ? [
    gv({
      abi: i,
      receipt: r,
      rawPayload: n,
      maxInputs: s
    })
  ] : [];
}
function Yv(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function Vv(e, t, r, n, s, i, o) {
  const a = e.assetId === Dt ? o : e.assetId, u = y_(r, a, a === o);
  if (!u)
    return [];
  const f = La(u), g = Hv(t, n, e, s, i);
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
      assetsSent: Yv(e),
      calls: g
    }
  ];
}
function Zv({
  inputs: e,
  outputs: t,
  receipts: r,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: o
}) {
  const a = Lv(r);
  return Rv(t).flatMap((f) => {
    const g = Cv(e, f.inputIndex);
    return g ? a.filter((E) => E.to === g.contractID).flatMap(
      (E) => Vv(
        E,
        g,
        e,
        n,
        s,
        i,
        o
      )
    ) : [];
  });
}
function Jv(e, t, r) {
  const { to: n, assetId: s, amount: i } = e;
  let { from: o } = e;
  const a = t.some((f) => f.contractID === n) ? 0 : 1;
  if (Dt === o) {
    const f = r.find((g) => g.assetId === s);
    o = (f == null ? void 0 : f.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((f) => f.contractID === o) ? 0 : 1,
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
function qv({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = b_(t), o = bv(e), a = xv(t), u = Ev(e, n);
  i.forEach(({ amount: E, assetId: C, to: S }) => {
    const Q = u.get(C) || /* @__PURE__ */ new Map();
    let N, T;
    for (const [M, H] of Q)
      if (T || (T = M), H.gte(E)) {
        N = M;
        break;
      }
    N = N || T, N && (s = qn(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: N
      },
      to: {
        type: 1,
        address: S
      },
      assetsSent: [{ assetId: C, amount: E }]
    }));
  });
  const f = Jn(
    r,
    At.Transfer
  ), g = Jn(
    r,
    At.TransferOut
  );
  return [...f, ...g].forEach((E) => {
    const C = Jv(E, o, a);
    s = qn(s, C);
  }), s;
}
function jv(e) {
  return b_(e).reduce((n, s) => qn(n, {
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
function $v({ inputs: e, outputs: t }) {
  const r = Bv(t), n = m_(e)[0], s = La(n);
  return r.reduce((o, a) => qn(o, {
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
function Kv({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: a
}) {
  return v_(e) ? [...$v({ inputs: t, outputs: r })] : C_(e) ? [
    ...qv({ inputs: t, outputs: r, receipts: n, baseAssetId: a }),
    ...Zv({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: o,
      baseAssetId: a
    }),
    ...Xv({ inputs: t, receipts: n, baseAssetId: a })
  ] : [...jv(r)];
}
var Rr = (e) => {
  const t = $E(e);
  switch (t.type) {
    case At.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case At.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, t2 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === At.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, e2 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === At.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, r2 = (e) => {
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
        D.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, n2 = (e) => {
  let t, r, n, s, i, o = !1, a = !1, u = !1;
  if (e != null && e.type)
    switch (n = r2(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, r = e.block.id, a = !0, s = R(e.totalFee), i = R(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, r = e.block.id, o = !0, s = R(e.totalFee), i = R(e.totalGas);
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
function Ei(e) {
  var _, A;
  const {
    id: t,
    receipts: r,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: a,
    abiMap: u = {},
    maxInputs: f,
    gasCosts: g,
    maxGasPerTx: E,
    gasPrice: C,
    baseAssetId: S
  } = e, Q = Ii(r), N = K(o), T = Kv({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: N,
    abiMap: u,
    maxInputs: f,
    baseAssetId: S
  }), M = E_(i.type), H = R((A = (_ = i.policies) == null ? void 0 : _.find((m) => m.type === Ye.Tip)) == null ? void 0 : A.data), { isStatusFailure: G, isStatusPending: Y, isStatusSuccess: O, blockId: L, status: z, time: U, totalFee: k } = n2(a), j = pv({
    totalFee: k,
    gasPrice: C,
    rawPayload: N,
    tip: H,
    consensusParameters: {
      gasCosts: g,
      maxGasPerTx: E,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), V = t2(r), tt = e2(r);
  let B;
  return U && (B = ta.fromTai64(U)), {
    id: t,
    tip: H,
    fee: j,
    gasUsed: Q,
    operations: T,
    type: M,
    blockId: L,
    time: U,
    status: z,
    receipts: r,
    mintedAssets: V,
    burnedAssets: tt,
    isTypeMint: Qv(i.type),
    isTypeCreate: v_(i.type),
    isTypeScript: C_(i.type),
    isTypeUpgrade: Fv(i.type),
    isTypeUpload: Mv(i.type),
    isTypeBlob: Ov(i.type),
    isStatusFailure: G,
    isStatusSuccess: O,
    isStatusPending: Y,
    date: B,
    transaction: i
  };
}
function ka(e, t, r = {}) {
  return e.reduce((n, s) => {
    if (s.type === At.LogData || s.type === At.Log) {
      const i = new Ar(r[s.id] || t), o = s.type === At.Log ? new P("u64").encode(s.val0) : s.data, [a] = i.decodeLog(o, s.val1.toString());
      n.push(a);
    }
    return n;
  }, []);
}
function s2(e) {
  return e.map((t) => {
    const r = "amount" in t ? { ...t, amount: R(t.amount) } : t;
    switch (r.type) {
      case "CoinOutput":
        return { ...r, type: vt.Coin };
      case "ContractOutput":
        return {
          ...r,
          type: vt.Contract,
          inputIndex: parseInt(r.inputIndex, 10)
        };
      case "ChangeOutput":
        return {
          ...r,
          type: vt.Change
        };
      case "VariableOutput":
        return { ...r, type: vt.Variable };
      case "ContractCreated":
        return {
          ...r,
          type: vt.ContractCreated,
          contractId: r.contract
        };
      default:
        return jh();
    }
  });
}
var Wo = class {
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
    F(this, "gasUsed", R(0));
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
    const n = new Wo(e, t, r);
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
          txPointer: Vr.decodeFromGqlScalar(o.txPointer)
        };
      }
      return n;
    }), r.outputs = s2(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
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
      bytes: $(e.rawPayload)
    };
  }
  getReceipts() {
    var t;
    const e = this.status ?? ((t = this.gqlTransaction) == null ? void 0 : t.status);
    switch (e == null ? void 0 : e.type) {
      case "SuccessStatus":
      case "FailureStatus":
        return e.receipts.map(Rr);
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
    return (t = new lr().decode(
      $(e.rawPayload),
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
    var E;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: o } = this.provider.getGasConfig(), a = await this.provider.getLatestGasPrice(), u = this.provider.getChain().consensusParameters.txParameters.maxInputs, f = this.provider.getBaseAssetId();
    return Ei({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((E = this.gqlTransaction) == null ? void 0 : E.status),
      gasPerByte: n,
      gasPriceFactor: s,
      abiMap: e,
      maxInputs: u,
      gasCosts: i,
      maxGasPerTx: o,
      gasPrice: a,
      baseAssetId: f
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
        throw this.unsetResourceCache(), new x(
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
    this.abis && (n = ka(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), r.logs = n);
    const { receipts: s } = r, i = this.status ?? ((o = this.gqlTransaction) == null ? void 0 : o.status);
    if ((i == null ? void 0 : i.type) === "FailureStatus") {
      this.unsetResourceCache();
      const { reason: a } = i;
      throw Fa({
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
function i2(e, t) {
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
function B_(e, t, r = 0) {
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
      const u = i2(t, a);
      return await Wh(u), B_(e, t, a)(...n);
    }
  };
}
var o2 = (e, t) => {
  switch (e) {
    case "not enough coins to fit the target":
      throw new x(
        D.NOT_ENOUGH_FUNDS,
        "The account(s) sending the transaction don't have enough funds to cover the transaction.",
        {},
        t
      );
    default:
      throw new x(D.INVALID_REQUEST, e);
  }
}, Dd = 10, Qd = 512, a2 = 5, c2 = 2e4, d2 = (e) => {
  const { name: t, daHeight: r, consensusParameters: n, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: a,
    scriptParams: u,
    txParams: f,
    gasCosts: g,
    baseAssetId: E,
    chainId: C,
    version: S
  } = n;
  return {
    name: t,
    baseChainHeight: R(r),
    consensusParameters: {
      version: S,
      chainId: R(C),
      baseAssetId: E,
      feeParameters: {
        version: o.version,
        gasPerByte: R(o.gasPerByte),
        gasPriceFactor: R(o.gasPriceFactor)
      },
      contractParameters: {
        version: i.version,
        contractMaxSize: R(i.contractMaxSize),
        maxStorageSlots: R(i.maxStorageSlots)
      },
      txParameters: {
        version: f.version,
        maxInputs: R(f.maxInputs),
        maxOutputs: R(f.maxOutputs),
        maxWitnesses: R(f.maxWitnesses),
        maxGasPerTx: R(f.maxGasPerTx),
        maxSize: R(f.maxSize),
        maxBytecodeSubsections: R(f.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: a.version,
        maxPredicateLength: R(a.maxPredicateLength),
        maxPredicateDataLength: R(a.maxPredicateDataLength),
        maxGasPerPredicate: R(a.maxGasPerPredicate),
        maxMessageDataLength: R(a.maxMessageDataLength)
      },
      scriptParameters: {
        version: u.version,
        maxScriptLength: R(u.maxScriptLength),
        maxScriptDataLength: R(u.maxScriptDataLength)
      },
      gasCosts: g
    },
    latestBlock: {
      id: s.id,
      height: R(s.height),
      time: s.header.time,
      transactions: s.transactions.map((Q) => ({
        id: Q.id
      }))
    }
  };
}, Xo, x_, Ue = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    xr(this, Xo), Pt(this, "operations"), Pt(this, "cache"), Pt(this, "url"), Pt(this, "urlWithoutAuth"), Pt(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0
    });
    const { url: r, urlWithoutAuth: n, headers: s } = Ue.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = { ...this.options, ...t }, this.url = e, s && (this.options = { ...this.options, headers: { ...this.options.headers, ...s } }), this.operations = this.createOperations();
    const { resourceCacheTTL: i } = this.options;
    Qr(i) ? i !== -1 ? this.cache = new Bd(i) : this.cache = void 0 : this.cache = new Bd(c2);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    Ue.nodeInfoCache = {}, Ue.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r, headers: n } = e;
    return B_(async (...s) => {
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
      throw new x(x.CODES.INVALID_URL, "Invalid URL provided.", { url: e }, i);
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
    const r = new Ue(e, t);
    return await r.fetchChainAndNodeInfo(), r;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = Ue.chainInfoCache[this.urlWithoutAuth];
    if (!e)
      throw new x(
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
    const e = Ue.nodeInfoCache[this.urlWithoutAuth];
    if (!e)
      throw new x(
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
    const { url: r, urlWithoutAuth: n, headers: s } = Ue.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = t ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...s } }, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Return the chain and node information.
   *
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo() {
    const e = await this.fetchNode();
    return Ue.ensureClientVersionIsSupported(e), {
      chain: await this.fetchChain(),
      nodeInfo: e
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = sh(e.nodeVersion);
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
    const e = Ue.getFetchFn(this.options), t = new Up.GraphQLClient(this.urlWithoutAuth, {
      fetch: (s, i) => e(s, i, this.options),
      responseMiddleware: (s) => {
        if ("response" in s) {
          const i = s.response;
          if (Array.isArray(i == null ? void 0 : i.errors))
            for (const o of i.errors)
              o2(o.message, o);
        }
      }
    }), r = (s, i) => {
      const o = s.definitions.find((u) => u.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? h_.create({
        url: this.urlWithoutAuth,
        query: s,
        fetchFn: (u, f) => e(u, f, this.options),
        variables: i
      }) : t.request(s, i);
    }, n = (s) => ({
      getBlobs(i) {
        const o = i.blobIds.map((g, E) => `$blobId${E}: BlobId!`).join(", "), a = i.blobIds.map((g, E) => `blob${E}: blob(id: $blobId${E}) { id }`).join(`
`), u = i.blobIds.reduce(
          (g, E, C) => (g[`blobId${C}`] = E, g),
          {}
        ), f = it`
          query getBlobs(${o}) {
            ${a}
          }
        `;
        return s(f, u);
      }
    });
    return { ...YE(r), ...n(r) };
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
    return R(e.latestBlock.height, 10);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: R(e.maxDepth),
      maxTx: R(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Ue.nodeInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = d2(e);
    return Ue.chainInfoCache[this.urlWithoutAuth] = t, t;
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
  validateTransaction(e, t) {
    const { maxOutputs: r, maxInputs: n } = t.txParameters;
    if (R(e.inputs.length).gt(n))
      throw new x(
        D.MAX_INPUTS_EXCEEDED,
        "The transaction exceeds the maximum allowed number of inputs."
      );
    if (R(e.outputs.length).gt(r))
      throw new x(
        D.MAX_OUTPUTS_EXCEEDED,
        "The transaction exceeds the maximum allowed number of outputs."
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
    const r = Se(e);
    t && await this.estimateTxDependencies(r);
    const { consensusParameters: n } = this.getChain();
    this.validateTransaction(r, n);
    const s = K(r.toTransactionBytes());
    let i;
    kr(r) && (i = r.abis);
    const o = await this.operations.submitAndAwaitStatus({ encodedTransaction: s });
    return Oo(this, Xo, x_).call(this, r.inputs, r.getTransactionId(this.getChainId())), new Wo(r, this, i, o);
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
    const n = Se(e);
    if (r)
      return this.estimateTxDependencies(n);
    const s = K(n.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: a }] = i;
    return { receipts: o.map(Rr), dryRunStatus: a };
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
      (i) => "predicate" in i && i.predicate && !o0($(i.predicate), $("0x")) && new zt(i.predicateGasUsed).isZero()
    ))
      return e;
    const r = K(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: r
    }), {
      estimatePredicates: { inputs: s }
    } = n;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && R(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
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
    if (Av(e))
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const r = [];
    let n = 0, s;
    for (let i = 0; i < Dd; i++) {
      const {
        dryRun: [{ receipts: o, status: a }]
      } = await this.operations.dryRun({
        encodedTransactions: [K(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(Rr), s = a;
      const { missingOutputVariables: u, missingOutputContractIds: f } = Rd(t);
      if ((u.length !== 0 || f.length !== 0) && kr(e)) {
        n += u.length, e.addVariableOutputs(u.length), f.forEach(({ contractId: C }) => {
          e.addContractInputAndOutput(ft.fromString(C)), r.push(C);
        });
        const { maxFee: E } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = E;
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
    })), r = Be(e), n = /* @__PURE__ */ new Map();
    r.forEach((o, a) => {
      kr(o) && n.set(a, K(o.toTransactionBytes()));
    });
    let s = Array.from(n.keys()), i = 0;
    for (; s.length > 0 && i < Dd; ) {
      const o = s.map(
        (f) => n.get(f)
      ), a = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), u = [];
      for (let f = 0; f < a.dryRun.length; f++) {
        const g = s[f], { receipts: E, status: C } = a.dryRun[f], S = t[g];
        S.receipts = E.map(Rr), S.dryRunStatus = C;
        const { missingOutputVariables: Q, missingOutputContractIds: N } = Rd(
          S.receipts
        ), T = Q.length > 0 || N.length > 0, M = r[g];
        if (T && kr(M)) {
          S.outputVariables += Q.length, M.addVariableOutputs(Q.length), N.forEach(({ contractId: G }) => {
            M.addContractInputAndOutput(ft.fromString(G)), S.missingContractIds.push(G);
          });
          const { maxFee: H } = await this.estimateTxGasAndFee({
            transactionRequest: M
          });
          M.maxFee = H, n.set(g, K(M.toTransactionBytes())), u.push(g);
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
    const n = e.map((o) => K(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: a }) => ({ receipts: o.map(Rr), dryRunStatus: a }));
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e;
    let { gasPrice: r } = e;
    const n = this.getChain(), { gasPriceFactor: s, maxGasPerTx: i } = this.getGasConfig(), o = t.calculateMinGas(n);
    r || (r = await this.estimateGasPrice(10));
    const a = Zn({
      gasPrice: R(r),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let u = R(0);
    kr(t) && (u = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(n, o)
    ), u = t.gasLimit));
    const f = t.calculateMaxGas(n, o), g = Zn({
      gasPrice: R(r),
      gas: f,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: a,
      maxGas: f,
      maxFee: g,
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
    const r = Se(e);
    if (t)
      return this.estimateTxDependencies(r);
    const n = [K(r.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: a, receipts: u, status: f } = o, g = u.map(Rr);
      return { id: a, receipts: g, status: f };
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
    const r = Be(Se(e)), n = r.maxFee.eq(0), s = kr(r);
    s && (r.gasLimit = R(0));
    const i = Be(r);
    let o = 0;
    if (t && kr(i)) {
      const H = i.witnesses.length;
      await t(i), o = i.witnesses.length - H;
    }
    await this.estimatePredicates(i), r.updatePredicateGasUsed(i.inputs);
    let { maxFee: a, maxGas: u, minFee: f, minGas: g, gasPrice: E, gasLimit: C } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), S = [], Q, N = [], T = 0, M = R(0);
    if (r.maxFee = a, s) {
      if (r.gasLimit = C, t && await t(r), { receipts: S, missingContractIds: N, outputVariables: T, dryRunStatus: Q } = await this.estimateTxDependencies(r), Q && "reason" in Q)
        throw this.extractDryRunError(r, S, Q);
      M = Ii(S), r.gasLimit = M, { maxFee: a, maxGas: u, minFee: f, minGas: g, gasPrice: E } = await this.estimateTxGasAndFee({
        transactionRequest: r,
        gasPrice: E
      });
    }
    return {
      receipts: S,
      gasUsed: M,
      gasPrice: E,
      minGas: g,
      maxGas: u,
      minFee: f,
      maxFee: a,
      outputVariables: T,
      missingContractIds: N,
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
    const n = ft.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...this.validatePaginationArgs({
        paginationLimit: Qd,
        inputArgs: r
      }),
      filter: { owner: n.toB256(), assetId: t && K(t) }
    });
    return {
      coins: s.map(({ node: a }) => ({
        id: a.utxoId,
        assetId: a.assetId,
        amount: R(a.amount),
        owner: ft.fromAddressOrString(a.owner),
        blockCreated: R(a.blockCreated),
        txCreatedIdx: R(a.txCreatedIdx)
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
    const n = ft.fromAddressOrString(e), s = {
      messages: ((u = r == null ? void 0 : r.messages) == null ? void 0 : u.map((g) => K(g))) || [],
      utxos: ((f = r == null ? void 0 : r.utxos) == null ? void 0 : f.map((g) => K(g))) || []
    };
    if (this.cache) {
      const g = this.cache.getActiveData();
      s.messages.push(...g.messages), s.utxos.push(...g.utxos);
    }
    const i = {
      owner: n.toB256(),
      queryPerAsset: t.map(Sa).map(({ assetId: g, amount: E, max: C }) => ({
        assetId: K(g),
        amount: E.toString(10),
        max: C ? C.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((g) => {
      switch (g.type) {
        case "MessageCoin":
          return {
            amount: R(g.amount),
            assetId: g.assetId,
            daHeight: R(g.daHeight),
            sender: ft.fromAddressOrString(g.sender),
            recipient: ft.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: R(g.amount),
            assetId: g.assetId,
            owner: ft.fromAddressOrString(g.owner),
            blockCreated: R(g.blockCreated),
            txCreatedIdx: R(g.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((g) => !!g);
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
    typeof e == "number" ? t = { height: R(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: R(e).toString(10) };
    const { block: r } = await this.operations.getBlock(t);
    if (!r)
      return null;
    const { header: n, height: s, id: i, transactions: o } = r;
    return {
      id: i,
      height: R(s),
      time: n.time,
      header: {
        applicationHash: n.applicationHash,
        daHeight: R(n.daHeight),
        eventInboxRoot: n.eventInboxRoot,
        messageOutboxRoot: n.messageOutboxRoot,
        prevRoot: n.prevRoot,
        stateTransitionBytecodeVersion: n.stateTransitionBytecodeVersion,
        transactionsCount: n.transactionsCount,
        transactionsRoot: n.transactionsRoot
      },
      transactionIds: o.map((a) => a.id)
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
      ...this.validatePaginationArgs({
        paginationLimit: a2,
        inputArgs: e
      })
    });
    return { blocks: t.map(({ node: s }) => ({
      id: s.id,
      height: R(s.height),
      time: s.header.time,
      header: {
        applicationHash: s.header.applicationHash,
        daHeight: R(s.header.daHeight),
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
    typeof e == "number" ? t = { blockHeight: R(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: r } = await this.operations.getBlockWithTransactions(t);
    return r ? {
      id: r.id,
      height: R(r.height, 10),
      time: r.header.time,
      header: {
        applicationHash: r.header.applicationHash,
        daHeight: R(r.header.daHeight),
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
          return (s = new lr().decode($(n.rawPayload), 0)) == null ? void 0 : s[0];
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
      return (r = new lr().decode(
        $(t.rawPayload),
        0
      )) == null ? void 0 : r[0];
    } catch (n) {
      if (n instanceof x && n.code === D.UNSUPPORTED_TRANSACTION_TYPE)
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
    } = await this.operations.getTransactions(e), n = new lr();
    return { transactions: t.map(({ node: { rawPayload: i } }) => {
      try {
        return n.decode($(i), 0)[0];
      } catch (o) {
        if (o instanceof x && o.code === D.UNSUPPORTED_TRANSACTION_TYPE)
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
      contract: ft.fromAddressOrString(e).toB256(),
      asset: K(t)
    });
    return R(r.amount, 10);
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
      owner: ft.fromAddressOrString(e).toB256(),
      assetId: K(t)
    });
    return R(r.amount, 10);
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
      filter: { owner: ft.fromAddressOrString(e).toB256() }
    });
    return { balances: t.map(({ node: n }) => ({
      assetId: n.assetId,
      amount: R(n.amount)
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
      ...this.validatePaginationArgs({
        inputArgs: t,
        paginationLimit: Qd
      }),
      owner: ft.fromAddressOrString(e).toB256()
    });
    return {
      messages: r.map(({ node: i }) => ({
        messageId: Tr.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: R(i.amount),
          data: i.data
        }),
        sender: ft.fromAddressOrString(i.sender),
        recipient: ft.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: R(i.amount),
        data: Tr.decodeData(i.data),
        daHeight: R(i.daHeight)
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
      throw new x(
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
      blockProof: f,
      sender: g,
      recipient: E,
      amount: C,
      data: S
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: R(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: R(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: a.id,
        daHeight: R(a.daHeight),
        transactionsCount: Number(a.transactionsCount),
        transactionsRoot: a.transactionsRoot,
        height: R(a.height),
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
        daHeight: R(u.daHeight),
        transactionsCount: Number(u.transactionsCount),
        transactionsRoot: u.transactionsRoot,
        height: R(u.height),
        prevRoot: u.prevRoot,
        time: u.time,
        applicationHash: u.applicationHash,
        messageReceiptCount: Number(u.messageReceiptCount),
        messageOutboxRoot: u.messageOutboxRoot,
        consensusParametersVersion: Number(u.consensusParametersVersion),
        eventInboxRoot: u.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(u.stateTransitionBytecodeVersion)
      },
      sender: ft.fromAddressOrString(g),
      recipient: ft.fromAddressOrString(E),
      nonce: t,
      amount: R(C),
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
    return R(e.gasPrice);
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
    return R(t.gasPrice);
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
      blocksToProduce: R(e).toString(10),
      startTimestamp: t ? ta.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return R(r);
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Wo(e, this);
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
      messageId: Tr.getMessageId({
        sender: t.sender,
        recipient: t.recipient,
        nonce: t.nonce,
        amount: R(t.amount),
        data: t.data
      }),
      sender: ft.fromAddressOrString(t.sender),
      recipient: ft.fromAddressOrString(t.recipient),
      nonce: t.nonce,
      amount: R(t.amount),
      data: Tr.decodeData(t.data),
      daHeight: R(t.daHeight)
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
  validatePaginationArgs(e) {
    const { paginationLimit: t, inputArgs: r = {} } = e, { first: n, last: s, after: i, before: o } = r;
    if (i && o)
      throw new x(
        D.INVALID_INPUT_PARAMETERS,
        'Pagination arguments "after" and "before" cannot be used together'
      );
    if ((n || 0) > t || (s || 0) > t)
      throw new x(
        D.INVALID_INPUT_PARAMETERS,
        `Pagination limit for this query cannot exceed ${t} items`
      );
    if (n && o)
      throw new x(
        D.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "first" with "before" is not supported'
      );
    if (s && i)
      throw new x(
        D.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "last" with "after" is not supported'
      );
    return !n && !s && (r.first = t), r;
  }
  /**
   * @hidden
   */
  extractDryRunError(e, t, r) {
    const n = r;
    let s = [];
    return e.abis && (s = ka(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Fa({
      logs: s,
      receipts: t,
      statusReason: n.reason
    });
  }
}, ai = Ue;
Xo = /* @__PURE__ */ new WeakSet();
x_ = function(e, t) {
  if (!this.cache)
    return;
  const r = e.reduce(
    (n, s) => (s.type === Ct.Coin ? n.utxos.push(s.id) : s.type === Ct.Message && n.messages.push(s.nonce), n),
    { utxos: [], messages: [] }
  );
  this.cache.set(t, r);
};
Pt(ai, "chainInfoCache", {});
Pt(ai, "nodeInfoCache", {});
async function rB(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new x(
      D.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new lr().decode(
    $(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const a = o.map(Rr), {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: f },
      txParameters: { maxInputs: g, maxGasPerTx: E },
      gasCosts: C
    }
  } = r.getChain(), S = await r.getLatestGasPrice(), Q = r.getBaseAssetId();
  return {
    ...Ei({
      id: s.id,
      receipts: a,
      transaction: i,
      transactionBytes: $(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: R(u),
      gasPriceFactor: R(f),
      abiMap: n,
      maxInputs: g,
      gasCosts: C,
      maxGasPerTx: E,
      gasPrice: S,
      baseAssetId: Q
    })
  };
}
async function nB(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: o, gasCosts: a, maxGasPerTx: u } = t.getGasConfig(), f = t.getChain().consensusParameters.txParameters.maxInputs, g = r.toTransaction(), E = r.toTransactionBytes(), C = await t.getLatestGasPrice(), S = t.getBaseAssetId();
  return Ei({
    id: r.getTransactionId(t.getChainId()),
    receipts: s,
    transaction: g,
    transactionBytes: E,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: f,
    gasCosts: a,
    maxGasPerTx: u,
    gasPrice: C,
    baseAssetId: S
  });
}
async function sB(e) {
  const { filters: t, provider: r, abiMap: n } = e, { transactionsByOwner: s } = await r.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: a, gasPriceFactor: u },
      txParameters: { maxInputs: f, maxGasPerTx: g },
      gasCosts: E
    }
  } = r.getChain(), C = await r.getLatestGasPrice(), S = r.getBaseAssetId();
  return {
    transactions: i.map((N) => {
      const { node: T } = N, { id: M, rawPayload: H, status: G } = T, [Y] = new lr().decode($(H), 0);
      let O = [];
      T != null && T.status && "receipts" in T.status && (O = T.status.receipts);
      const L = O.map(Rr);
      return {
        ...Ei({
          id: M,
          receipts: L,
          transaction: Y,
          transactionBytes: $(H),
          gqlTransactionStatus: G,
          abiMap: n,
          gasPerByte: a,
          gasPriceFactor: u,
          maxInputs: f,
          gasCosts: E,
          maxGasPerTx: g,
          gasPrice: C,
          baseAssetId: S
        })
      };
    }),
    pageInfo: o
  };
}
var ot = {
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
}, u2 = (e) => {
  if (e === "ethereum")
    return ot.eth.sepolia;
  if (e === "fuel")
    return ot.fuel.testnet;
}, _2 = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), R_ = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? u2(r);
  if (i === void 0)
    return;
  const o = _2({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, iB = (e, t) => R_({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), oB = (e, t) => R_({
  asset: e,
  networkType: "fuel",
  chainId: t
}), h2 = "/", l2 = /^\/|\/$/g, f2 = (e = "") => e.replace(l2, "");
function A2(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(f2);
  return n && r && s.unshift(""), s.join(h2);
}
function p2(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: A2(t, r.icon)
  }));
}
var g2 = "https://cdn.fuel.network/assets/", w2 = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: ot.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ot.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ot.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: ot.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
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
        chainId: ot.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x962792286fbc9b1d5860b4551362a12249362c21594c77abf4b3fe2bbe8d977a",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x05fc623e57bd7bc1258efa8e4f62b05af5471d73df6f2c2dc11ecc81134c4f36",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
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
        chainId: ot.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
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
        chainId: ot.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x642a5db59ec323c2f846d4d4cf3e58d78aff64accf4f8f6455ba0aa3ef000a3b",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
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
        chainId: ot.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
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
        chainId: ot.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ot.eth.sepolia,
        address: "0xc6387efad0f184a90b34f397c3d6fd63135ef790",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb6133b2ef9f6153eb869125d23dcf20d1e735331b5e41b15a6a7a6cec70e8651",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.testnet,
        contractId: "0xC6387efAD0F184a90B34f397C3d6Fd63135ef790",
        assetId: "0xf5c6d72d0f2c782fa47d8e228c198a08654e9fc66ca60ad85902b1d09046a7ab",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ot.eth.sepolia,
        address: "0xb8f4f4eafc1d2a3c0a4d519bbf1114c311cc9b1b",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xd05563025104fc36496c15c7021ad6b31034b0e89a356f4f818045d1f48808bc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.testnet,
        contractId: "0xC6387efAD0F184a90B34f397C3d6Fd63135ef790",
        assetId: "0xa86e37d385c08beddbb02c8260f9ec535d484c8ea908fc19d4e6dc8d5141fb2e",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x78d4522ec607f6e8efb66ea49439d1ee48623cf763f9688a8eada025def033d9",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ot.eth.sepolia,
        address: "0xB82381A3fBD3FaFA77B3a7bE693342618240067b",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1a7815cc9f75db5c24a5b0814bfb706bb9fe485333e98254015de8f48f84c67b",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.testnet,
        contractId: "0xC6387efAD0F184a90B34f397C3d6Fd63135ef790",
        assetId: "0x4c467e3fd4f32179e1aad3b92ebbdaa6ff6aeda5b8da5f8e64e96405eb52a7f5",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf2fc648c23a5db24610a1cf696acc4f0f6d9a7d6028dd9944964ab23f6e35995",
        decimals: 18
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
        chainId: ot.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ot.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 18
      }
    ]
  }
], aB = p2(w2, g2), Fd = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, m2 = (e) => {
  const { assetId: t, amountToTransfer: r, hexlifiedContractId: n } = e, i = new P("u64").encode(new zt(r).toNumber());
  return Uint8Array.from([
    ...$(n),
    ...i,
    ...$(t)
  ]);
}, y2 = async (e) => {
  const t = m2(e);
  await mi();
  const r = O0(16, 0, P0.ScriptData), n = Vn(17, 16, 32), s = qs(18, 17, 0), i = Vn(19, 17, 8), o = D0(16, 18, 19), a = Ba(1);
  return { script: Uint8Array.from([
    ...r.to_bytes(),
    ...n.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...a.to_bytes()
  ]), scriptData: t };
}, b2 = 5, vi = class extends t0 {
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
    this._provider = r, this._connector = n, this.address = ft.fromDynamicInput(t);
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
      throw new x(D.MISSING_PROVIDER, "Provider not set");
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
    var H;
    const { addedSignatures: n, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o, gasPrice: a } = r, u = t.maxFee, f = this.provider.getBaseAssetId(), g = ((H = i.find((G) => G.assetId === f)) == null ? void 0 : H.amount) || R(0), E = Y1({
      amount: R(u),
      assetId: f,
      coinQuantities: i
    }), C = {};
    E.forEach(({ amount: G, assetId: Y }) => {
      C[Y] = {
        required: G,
        owned: R(0)
      };
    }), t.inputs.filter(qr).forEach((G) => {
      const O = $r(G) ? String(G.assetId) : f;
      C[O] && (C[O].owned = C[O].owned.add(G.amount));
    });
    let S = [];
    Object.entries(C).forEach(([G, { owned: Y, required: O }]) => {
      Y.lt(O) && S.push({
        assetId: G,
        amount: O.sub(Y)
      });
    });
    let Q = S.length > 0, N = 0;
    for (; Q && N < b2; ) {
      const G = await this.getResourcesToSpend(
        S,
        uv(t.inputs, this.address)
      );
      t.addResources(G), t.updatePredicateGasUsed(s);
      const Y = Be(t);
      if (n && Array.from({ length: n }).forEach(
        () => Y.addEmptyWitness()
      ), !o) {
        Q = !1;
        break;
      }
      const { maxFee: O } = await this.provider.estimateTxGasAndFee({
        transactionRequest: Y,
        gasPrice: a
      }), L = dv(
        t.inputs.filter(qr),
        f,
        f
      ), z = g.add(O);
      L.gt(z) ? Q = !1 : S = [
        {
          amount: z.sub(L),
          assetId: f
        }
      ], N += 1;
    }
    if (Q)
      throw new x(
        D.NOT_ENOUGH_FUNDS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    t.updatePredicateGasUsed(s);
    const T = Be(t);
    if (n && Array.from({ length: n }).forEach(() => T.addEmptyWitness()), !o)
      return t;
    const { maxFee: M } = await this.provider.estimateTxGasAndFee({
      transactionRequest: T
    });
    return t.maxFee = M, t;
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
    let i = new Wr(s);
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
    let n = new Wr(r);
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
      ft.fromAddressOrString(n),
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
    if (R(r).lte(0))
      throw new x(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = ft.fromAddressOrString(t), o = n ?? this.provider.getBaseAssetId(), { script: a, scriptData: u } = await y2({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: R(r),
      assetId: o
    });
    let f = new Wr({
      ...s,
      script: a,
      scriptData: u
    });
    f.addContractInputAndOutput(i);
    const g = await this.getTransactionCost(f, {
      quantities: [{ amount: R(r), assetId: String(o) }]
    });
    return f = this.validateGasLimitAndMaxFee({
      transactionRequest: f,
      gasUsed: g.gasUsed,
      maxFee: g.maxFee,
      txParams: s
    }), await this.fund(f, g), this.sendTransaction(f);
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
    const s = ft.fromAddressOrString(t), i = $(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = $(
      "0x".concat(R(r).toHex().substring(2).padStart(16, "0"))
    ), u = { script: new Uint8Array([
      ...$(fv.bytes),
      ...i,
      ...o
    ]), ...n }, f = this.provider.getBaseAssetId();
    let g = new Wr(u);
    const E = [{ amount: R(r), assetId: f }], C = await this.getTransactionCost(g, { quantities: E });
    return g = this.validateGasLimitAndMaxFee({
      transactionRequest: g,
      gasUsed: C.gasUsed,
      maxFee: C.maxFee,
      txParams: n
    }), await this.fund(g, C), this.sendTransaction(g);
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
    const s = Be(Se(t)), i = this.provider.getBaseAssetId(), o = s.getCoinOutputsQuantities(), a = Fd(o, n), u = [{ assetId: i, amount: R("100000000000000000") }], f = (C) => s.inputs.find((S) => S.type === Ct.Coin ? S.assetId === C : p_(S) ? i === C : !1), g = (C, S) => {
      const Q = f(C), N = S;
      Q && "amount" in Q ? Q.amount = N : s.addResources(
        this.generateFakeResources([
          {
            amount: S,
            assetId: C
          }
        ])
      );
    };
    return Fd(a, u).forEach(
      ({ amount: C, assetId: S }) => g(S, C)
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
      throw new x(D.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
    const n = Se(t);
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
    const n = Se(t);
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
      id: K(ze(zs)),
      owner: this.address,
      blockCreated: R(1),
      txCreatedIdx: R(1),
      ...r
    }));
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (R(t).lte(0))
      throw new x(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(t, r) {
    let n = t;
    const s = await this.getTransactionCost(n);
    return n = this.validateGasLimitAndMaxFee({
      transactionRequest: n,
      gasUsed: s.gasUsed,
      maxFee: s.maxFee,
      txParams: r
    }), n = await this.fund(n, s), n;
  }
  /** @hidden * */
  validateGasLimitAndMaxFee({
    gasUsed: t,
    maxFee: r,
    transactionRequest: n,
    txParams: { gasLimit: s, maxFee: i }
  }) {
    const o = Se(n);
    if (!Qr(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new x(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!Qr(i))
      o.maxFee = r;
    else if (r.gt(i))
      throw new x(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${r}'.`
      );
    return o;
  }
}, In = class {
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
    const t = hr(e, 32);
    this.privateKey = K(t), this.publicKey = K(Ir.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = K(Ir.getPublicKey(t, !0)), this.address = ft.fromPublicKey(this.publicKey);
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
    const t = Ir.sign($(e), $(this.privateKey)), r = hr(`0x${t.r.toString(16)}`, 32), n = hr(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, K(ut([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = Ir.ProjectivePoint.fromHex($(this.compressedPublicKey)), r = Ir.ProjectivePoint.fromHex($(e));
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
    const r = $(t), n = r.slice(0, 32), s = r.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const a = new Ir.Signature(BigInt(K(n)), BigInt(K(s))).addRecoveryBit(
      i
    ).recoverPublicKey($(e)).toRawBytes(!1).slice(1);
    return K(a);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return ft.fromPublicKey(In.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Je(ut([ze(32), $(e)])) : ze(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = Ir.ProjectivePoint.fromHex($(e));
    return K(t.toRawBytes(!1).slice(1));
  }
}, Md = 13, Od = 8, Ld = 1, so = 32, I2 = 16, kd = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function E2(e, t, r) {
  const n = Nr(kd(e), "hex"), s = ft.fromAddressOrString(t), i = ze(so), o = Fu({
    password: Nr(r),
    salt: i,
    dklen: so,
    n: 2 ** Md,
    r: Od,
    p: Ld
  }), a = ze(I2), u = await hf(n, o, a), f = Uint8Array.from([...o.subarray(16, 32), ...u]), g = Mu(f), E = Mn(g, "hex"), C = {
    id: Af(),
    version: 3,
    address: kd(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: E,
      cipherparams: { iv: Mn(a, "hex") },
      ciphertext: Mn(u, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: so,
        n: 2 ** Md,
        p: Ld,
        r: Od,
        salt: Mn(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function v2(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: u, p: f, salt: g }
    }
  } = r, E = Nr(s, "hex"), C = Nr(i, "hex"), S = Nr(g, "hex"), Q = Nr(t), N = Fu({
    password: Q,
    salt: S,
    n: a,
    p: f,
    r: u,
    dklen: o
  }), T = Uint8Array.from([...N.subarray(16, 32), ...E]), M = Mu(T), H = Mn(M, "hex");
  if (n !== H)
    throw new x(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const G = await _f(E, N, C);
  return K(G);
}
var S_ = class extends vi {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, r) {
    const n = new In(t);
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
    const r = await this.signer().sign(gf(t));
    return K(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Se(t), n = this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
    return K(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const r = Se(t), n = await this.signTransaction(r);
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
    const n = Se(t);
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
    const n = Se(t);
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
    return E2(this.privateKey, this.address, t);
  }
};
Pt(S_, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Is = [
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
], C2 = /* @__PURE__ */ ((e) => (e.english = "english", e))(C2 || {});
function B2(e) {
  return (1 << e) - 1;
}
function N_(e) {
  return (1 << e) - 1 << 8 - e;
}
function io(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function x2(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function R2(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & B2(8 - r)), r += 3);
  const n = e.length / 4, s = $(Ce(e))[0] & N_(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function S2(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = $(new Uint8Array(r));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const g = t.indexOf(e[f].normalize("NFKD"));
    if (g === -1)
      throw new x(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let E = 0; E < 11; E += 1)
      g & 1 << 10 - E && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = N_(o);
  if (($(Ce(n.slice(0, i / 8)))[0] & a) !== (n[n.length - 1] & a))
    throw new x(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var N2 = fn("Bitcoin seed"), T2 = "0x0488ade4", D2 = "0x04358394", Pd = [12, 15, 18, 21, 24];
function Ud(e) {
  if (e.length !== 2048)
    throw new x(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function Q2(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new x(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function oo(e) {
  if (!Pd.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Pd.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new x(D.INVALID_MNEMONIC, t);
  }
}
var Er = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Is) {
    F(this, "wordlist");
    this.wordlist = e, Ud(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return Er.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return Er.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Is) {
    const r = io(e);
    return oo(r), K(S2(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Is) {
    const r = $(e);
    return Ud(t), Q2(r), R2(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    oo(io(e));
    const r = fn(x2(e)), n = fn(`mnemonic${t}`);
    return lf(r, n, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const r = Er.mnemonicToSeed(e, t);
    return Er.masterKeysFromSeed(r);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = io(e);
    let r = 0;
    try {
      oo(t);
    } catch {
      return !1;
    }
    for (; r < t.length; ) {
      if (Er.binarySearch(t[r]) === !1)
        return !1;
      r += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Is;
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
    const t = $(e);
    if (t.length < 16 || t.length > 64)
      throw new x(
        D.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return $(Ou("sha512", N2, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = Er.masterKeysFromSeed(e), n = $(t ? D2 : T2), s = "0x00", i = "0x00000000", o = "0x00000000", a = r.slice(32), u = r.slice(0, 32), f = ut([
      n,
      s,
      i,
      o,
      a,
      ut(["0x00", u])
    ]), g = ea(Ce(Ce(f)), 0, 4);
    return fu(ut([f, g]));
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
    const r = t ? Ce(ut([ze(e), $(t)])) : ze(e);
    return Er.entropyToMnemonic(r);
  }
}, Pa = Er, T_ = 2147483648, D_ = K("0x0488ade4"), Ua = K("0x0488b21e"), Q_ = K("0x04358394"), za = K("0x043587cf");
function zd(e) {
  return fu(ut([e, ea(Ce(Ce(e)), 0, 4)]));
}
function F2(e = !1, t = !1) {
  return e ? t ? za : Ua : t ? Q_ : D_;
}
function M2(e) {
  return [Ua, za].includes(K(e.slice(0, 4)));
}
function O2(e) {
  return [D_, Q_, Ua, za].includes(
    K(e.slice(0, 4))
  );
}
function L2(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new x(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + T_ : parseInt(n, 10)
  );
}
var rn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    F(this, "depth", 0);
    F(this, "index", 0);
    F(this, "fingerprint", K("0x00000000"));
    F(this, "parentFingerprint", K("0x00000000"));
    F(this, "privateKey");
    F(this, "publicKey");
    F(this, "chainCode");
    if (e.privateKey) {
      const t = new In(e.privateKey);
      this.publicKey = K(t.compressedPublicKey), this.privateKey = K(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new x(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = K(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ea(ff(Ce(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && $(this.privateKey), r = $(this.publicKey), n = $(this.chainCode), s = new Uint8Array(37);
    if (e & T_) {
      if (!t)
        throw new x(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set($(this.publicKey));
    s.set(hr(e, 4), 33);
    const i = $(Ou("sha512", n, s)), o = i.slice(0, 32), a = i.slice(32);
    if (t) {
      const E = R(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new rn({
        privateKey: E,
        chainCode: a,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new In(K(o)).addPoint(r);
    return new rn({
      publicKey: f,
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
    return L2(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
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
        D.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const r = F2(this.privateKey == null || e, t), n = K(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = jo(this.index, 4), o = this.chainCode, a = this.privateKey != null && !e ? ut(["0x00", this.privateKey]) : this.publicKey, u = $(ut([r, n, s, i, o, a]));
    return zd(u);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Pa.masterKeysFromSeed(e);
    return new rn({
      chainCode: $(t.slice(32)),
      privateKey: $(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = K(hr(Zh(e))), r = $(t), n = zd(r.slice(0, 78)) === e;
    if (r.length !== 82 || !O2(r))
      throw new x(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new x(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = K(r.slice(5, 9)), o = parseInt(K(r.slice(9, 13)).substring(2), 16), a = K(r.slice(13, 45)), u = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new x(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (M2(r)) {
      if (u[0] !== 3)
        throw new x(D.HD_WALLET_ERROR, "Invalid public extended key.");
      return new rn({
        publicKey: u,
        chainCode: a,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (u[0] !== 0)
      throw new x(D.HD_WALLET_ERROR, "Invalid private extended key.");
    return new rn({
      privateKey: u.slice(1),
      chainCode: a,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, ao = rn, F_ = class extends vi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Qe(e, this._provider);
  }
}, Qe = class extends S_ {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new In("0x00"), new F_(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = In.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = ao.fromSeed(e).derivePath(t || Qe.defaultPath);
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
    const s = Pa.mnemonicToSeed(e, r), o = ao.fromSeed(s).derivePath(t || Qe.defaultPath);
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
    const r = ao.fromExtendedKey(e);
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
    const n = await v2(e, t);
    return new Qe(n, r);
  }
}, xe = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new F_(e, t);
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
Pt(xe, "generate", Qe.generate);
Pt(xe, "fromSeed", Qe.fromSeed);
Pt(xe, "fromMnemonic", Qe.fromMnemonic);
Pt(xe, "fromExtendedKey", Qe.fromExtendedKey);
Pt(xe, "fromEncryptedJson", Qe.fromEncryptedJson);
var k2 = class {
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
}, Pr, M_ = class {
  constructor(e) {
    xr(this, Pr, void 0), Pt(this, "pathKey", "{}"), Pt(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Pt(this, "numberOfAccounts", 0), Ze(this, Pr, e.secret || Pa.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Lt(this, Pr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const r = xe.fromMnemonic(Lt(this, Pr), this.getDerivePath(t));
      e.push({
        publicKey: r.publicKey,
        address: r.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = xe.fromMnemonic(Lt(this, Pr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const r = ft.fromAddressOrString(e);
    do {
      const n = xe.fromMnemonic(Lt(this, Pr), this.getDerivePath(t));
      if (n.address.equals(r))
        return n.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new x(
      D.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return xe.fromPrivateKey(t);
  }
};
Pr = /* @__PURE__ */ new WeakMap();
Pt(M_, "type", "mnemonic");
var vr, O_ = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    xr(this, vr, []), e.secret ? Ze(this, vr, [e.secret]) : Ze(this, vr, e.accounts || [xe.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Lt(this, vr)
    };
  }
  getPublicAccount(e) {
    const t = xe.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Lt(this, vr).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = xe.generate();
    return Lt(this, vr).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ft.fromAddressOrString(e), r = Lt(this, vr).find(
      (n) => xe.fromPrivateKey(n).address.equals(t)
    );
    if (!r)
      throw new x(
        D.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return r;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return xe.fromPrivateKey(t);
  }
};
vr = /* @__PURE__ */ new WeakMap();
Pt(O_, "type", "privateKey");
var ar = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function cr(e, t) {
  if (!e)
    throw new x(D.WALLET_MANAGER_ERROR, t);
}
var Te, Ur, $e, Ho, L_, Yo, k_, P_ = class extends n_.EventEmitter {
  constructor(e) {
    super(), xr(this, Ho), xr(this, Yo), Pt(this, "storage", new k2()), Pt(this, "STORAGE_KEY", "WalletManager"), xr(this, Te, []), xr(this, Ur, ""), xr(this, $e, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Lt(this, $e);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    cr(!Lt(this, $e), ar.wallet_not_unlocked);
    const t = Lt(this, Te).find((r, n) => n === e);
    return cr(t, ar.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Lt(this, Te).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Lt(this, Te).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = ft.fromAddressOrString(e), r = Lt(this, Te).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return cr(r, ar.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ft.fromAddressOrString(e);
    cr(!Lt(this, $e), ar.wallet_not_unlocked);
    const r = Lt(this, Te).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return cr(r, ar.address_not_found), r.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Lt(this, Te)[(e == null ? void 0 : e.vaultId) || 0];
    await cr(t, ar.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Lt(this, Te).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    Ze(this, Te, Lt(this, Te).concat({
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
    Ze(this, $e, !0), Ze(this, Te, []), Ze(this, Ur, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Ze(this, Ur, e), Ze(this, $e, !1);
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
    const r = Lt(this, $e);
    await this.unlock(e), Ze(this, Ur, t), await this.saveState(), await this.loadState(), r && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await cr(!Lt(this, $e), ar.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await df(Lt(this, Ur), JSON.parse(e));
      Ze(this, Te, Oo(this, Yo, k_).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await cr(!Lt(this, $e), ar.wallet_not_unlocked);
    const e = await uf(Lt(this, Ur), {
      vaults: Oo(this, Ho, L_).call(this, Lt(this, Te))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = P_.Vaults.find((r) => r.type === e);
    return cr(t, ar.invalid_vault_type), t;
  }
}, P2 = P_;
Te = /* @__PURE__ */ new WeakMap();
Ur = /* @__PURE__ */ new WeakMap();
$e = /* @__PURE__ */ new WeakMap();
Ho = /* @__PURE__ */ new WeakSet();
L_ = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
Yo = /* @__PURE__ */ new WeakSet();
k_ = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Pt(P2, "Vaults", [M_, O_]);
var U2 = class {
  constructor(e) {
    throw new x(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new x(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new x(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new x(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new x(D.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new x(D.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Pt(U2, "type");
var cB = class {
}, z2 = (e) => {
  const r = $(e), n = uu(r, 16384), s = s_(n.map((o) => K(o)));
  return Je(ut(["0x4655454C", s]));
}, Gd = class extends vi {
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
    const { predicateBytes: o, predicateInterface: a } = Gd.processPredicateData(
      t,
      r,
      i
    ), u = ft.fromB256(z2(o));
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
    const r = Se(t), n = this.getIndexFromPlaceholderWitness(r);
    return n !== -1 && r.removeWitness(n), r.inputs.filter(g_).forEach((s) => {
      ko(s, this.address) && (s.predicate = K(this.bytes), s.predicateData = K(this.getPredicateData()), s.witnessIndex = 0);
    }), r;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const r = Se(t);
    return super.sendTransaction(r, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const r = Se(t);
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
    let s = $(t), i;
    if (r && (i = new Ar(r), i.functions.main === void 0))
      throw new x(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = Gd.setConfigurableConstants(
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
      predicate: K(this.bytes),
      predicateData: K(this.getPredicateData())
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
      predicate: K(this.bytes),
      predicateData: K(this.getPredicateData())
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
      if (!n)
        throw new x(
          D.INVALID_CONFIGURABLE_CONSTANTS,
          "Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI"
        );
      if (Object.keys(n.configurables).length === 0)
        throw new x(
          D.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(r).forEach(([i, o]) => {
        if (!(n != null && n.configurables[i]))
          throw new x(
            D.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${i}' found in the Predicate`
          );
        const { offset: a } = n.configurables[i], u = n.encodeConfigurable(i, o);
        s.set(u, a);
      });
    } catch (i) {
      throw new x(
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
    const r = t.inputs.filter(qr).filter((o) => ko(o, this.address));
    let n = -1;
    const s = r.find((o) => !o.predicate);
    return s && (n = s.witnessIndex, r.every((a) => !a.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
  }
}, U_ = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(U_ || {}), Ga = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Ga || {}), z_ = "FuelConnector", G2 = class {
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
}, W2 = class extends n_.EventEmitter {
  constructor() {
    super(...arguments);
    F(this, "name", "");
    F(this, "metadata", {});
    F(this, "connected", !1);
    F(this, "installed", !1);
    F(this, "events", Ga);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(t, r) {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(t) {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(t) {
    throw new x(x.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
function X2(e, { cache: t, cacheTime: r, key: n }) {
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
function dB(e) {
  window.dispatchEvent(
    new CustomEvent(z_, {
      detail: e
    })
  );
}
function H2() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function Es(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new x(x.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var Y2 = 2e3, V2 = 5e3, { warn: Z2 } = console, Un = class extends W2 {
  constructor(t = Un.defaultConfig) {
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
      const { _targetObject: t } = this, r = z_;
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
      await this.setDefaultConnector(), this._targetUnsubscribe = this.setupConnectorListener();
    } catch {
      throw new x(D.INVALID_PROVIDER, "Error initializing Fuel Connector");
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
      return new G2(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(Un.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
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
      throw new x(
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
    Object.values(U_).forEach((t) => {
      this[t] = async (...r) => this.callMethod(t, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const r = Date.now(), [n, s] = await Promise.allSettled([
      Es(t.isConnected()),
      Es(this.pingConnector(t))
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
      return await X2(async () => Es(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: V2
      })();
    } catch {
      throw new x(D.INVALID_PROVIDER, "Current connector is not available.");
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
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(Ga)), await ((o = this._storage) == null ? void 0 : o.setItem(Un.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = H2();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Es(t.promise, Y2).then(() => !0).catch(() => !1);
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
    return Z2(
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
      r = await ai.create(t.url);
    else {
      if (t)
        throw new x(D.INVALID_PROVIDER, "Provider is not valid.");
      {
        const n = await this.currentNetwork();
        r = await ai.create(n.url);
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
    return new vi(t, n, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Un.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, G_ = Un;
Pt(G_, "STORAGE_KEY", "fuel-current-connector");
Pt(G_, "defaultConfig", {});
function Wd(e, t) {
  if (!e)
    throw new x(D.TRANSACTION_ERROR, t);
}
function W_(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var X_ = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = W_(r);
  return ka(e, n, s);
}, Ke, Kd, Wa = (Kd = class {
  constructor(...e) {
    Ge(this, Ke);
    qe(this, Ke, e || []);
  }
  entries() {
    return Wt(this, Ke);
  }
  push(...e) {
    Wt(this, Ke).push(...e);
  }
  concat(e) {
    return Wt(this, Ke).concat(e);
  }
  extend(e) {
    Wt(this, Ke).push(...e);
  }
  toBytes() {
    return ut(
      Wt(this, Ke).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return K(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Wt(this, Ke), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Ke = new WeakMap(), Kd), J2 = (e) => Wu + Gu({ maxInputs: e });
function q2(e) {
  const t = [...e.receipts];
  let r, n;
  if (t.forEach((i) => {
    i.type === At.ScriptResult ? r = i : (i.type === At.Return || i.type === At.ReturnData || i.type === At.Revert) && (n = i);
  }), !r || !n)
    throw new x(D.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: r.result,
    gasUsed: r.gasUsed,
    receipts: t,
    scriptResultReceipt: r,
    returnReceipt: n,
    callResult: e
  };
}
function Xa(e, t, r = []) {
  var n;
  try {
    const s = q2(e);
    return t(s);
  } catch (s) {
    if (s.code === D.SCRIPT_REVERTED) {
      const i = (n = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : n.reason;
      throw Fa({
        logs: r,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function j2(e, t, r) {
  return Xa(
    e,
    (n) => {
      if (n.returnReceipt.type === At.Revert)
        throw new x(
          D.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(r)}`
        );
      if (n.returnReceipt.type !== At.Return && n.returnReceipt.type !== At.ReturnData) {
        const { type: i } = n.returnReceipt;
        throw new x(
          D.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: r,
            receipt: n.returnReceipt
          })}`
        );
      }
      let s;
      return n.returnReceipt.type === At.Return && (s = n.returnReceipt.val), n.returnReceipt.type === At.ReturnData && (s = t.func.decodeOutput(n.returnReceipt.data)[0]), s;
    },
    r
  );
}
var Ci = class {
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
    this.bytes = $(e), this.scriptDataEncoder = t, this.scriptResultDecoder = r;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return Gu({ maxInputs: t }) + Wu + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Ci.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = $(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Xa(e, this.scriptResultDecoder, t);
  }
}, H_ = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, $2 = Dt, Y_ = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: r,
  assetIdOffset: n
}) => {
  const s = new Wa(
    an(16, e),
    an(17, r),
    qs(17, 17, 0),
    an(18, n)
  );
  return t ? s.push(
    an(19, t),
    qs(19, 19, 0),
    To(16, 17, 18, 19)
  ) : s.push(To(16, 17, 18, l.cgas().to_u8())), s;
};
function Xd(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new Wa();
  for (let r = 0; r < e.length; r += 1)
    t.extend(Y_(e[r]).entries());
  return t.push(Ba(1)), t.toBytes();
}
var K2 = (e) => e === At.Return || e === At.ReturnData, tC = (e, t) => e.find(
  ({ type: r, from: n, to: s }) => r === At.Call && n === $2 && s === t
), eC = (e) => (t) => {
  if (Cr(t.code) !== 0)
    throw new x(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = tC(
    t.receipts,
    e.toB256()
  ), n = R(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => K2(i)).flatMap((i) => n.eq(R(i.is)) ? i.type === At.Return ? [new P("u64").encode(i.val)] : i.type === At.ReturnData ? [$(i.data)] : [new Uint8Array()] : []);
}, rC = (e, t, r = []) => Xa(e, eC(t), r), nC = (e) => e.reduce(
  (t, r) => {
    const n = { ...H_ };
    return r.gas && (n.gasForwardedOffset = 1), t + Y_(n).byteLength();
  },
  W.size()
  // placeholder for single RET instruction which is added later
), sC = (e, t) => new Ci(
  // Script to call the contract, start with stub size matching length of calls
  Xd(new Array(e.length).fill(H_)),
  (r) => {
    var S;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = nC(r), i = (8 - s % 8) % 8, o = s + i, a = J2(t.toNumber()) + o, u = [];
    let f = a;
    const g = [];
    for (let Q = 0; Q < n; Q += 1) {
      const N = r[Q], T = f, M = T + gt, H = M + Gs, G = H + Lf + gt + gt, Y = G + N.fnSelectorBytes.byteLength, O = $(N.data);
      let L = 0;
      g.push(new P("u64").encode(N.amount || 0)), g.push(new J().encode(((S = N.assetId) == null ? void 0 : S.toString()) || Dt)), g.push(N.contractId.toBytes()), g.push(new P("u64").encode(G)), g.push(new P("u64").encode(Y)), g.push(N.fnSelectorBytes), g.push(O), N.gas && (g.push(new P("u64").encode(N.gas)), L = Y + O.byteLength);
      const z = {
        amountOffset: T,
        assetIdOffset: M,
        gasForwardedOffset: L,
        callDataOffset: H
      };
      u.push(z), f = a + ut(g).byteLength;
    }
    const E = Xd(u);
    return { data: ut(g), script: E };
  },
  () => [new Uint8Array()]
), V_ = (e, t, r, n) => {
  var a;
  const s = (a = e[0]) == null ? void 0 : a.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return j2({ receipts: t }, s, n);
  const o = rC(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((u, f) => {
    var E;
    const { func: g } = e[f].getCallConfig();
    return (E = g.decodeOutput(u)) == null ? void 0 : E[0];
  });
  return r ? o : o == null ? void 0 : o[0];
}, iC = async (e) => {
  var S;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, a = Array.isArray(t) ? t : [t], u = (S = a[0]) == null ? void 0 : S.getCallConfig(), f = X_(o, u, a), g = V_(a, o, r, f), E = Ii(o);
  return {
    isMultiCall: r,
    functionScopes: a,
    value: g,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: f,
    gasUsed: E
  };
}, co = (e) => {
  var E;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], o = (E = i[0]) == null ? void 0 : E.getCallConfig(), a = X_(s, o, i), u = V_(i, s, n, a), f = Ii(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: f,
    value: u
  };
};
function oC(e) {
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
var Z_ = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Wr();
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
    return this.functionInvocationScopes.map((r) => oC(r));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), r = sC(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(r, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (r) => this.transactionRequest.addContractInputAndOutput(ft.fromB256(r))
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
      amount: R(t.amount || 0)
    })).filter(({ assetId: t, amount: r }) => t && !R(r).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (r, { assetId: n, amount: s }) => {
      var o;
      const i = ((o = r.get(n)) == null ? void 0 : o.amount) || R(0);
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
    await mi(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Bt.Script && (this.transactionRequest.abis = W_(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, r) => t.add(r.gas || 0), R(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new x(
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
    const e = Be(await this.getTransactionRequest());
    return (this.program.account ?? xe.generate({ provider: this.getProvider() })).getTransactionCost(e, {
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
    e = Be(e);
    const t = await this.getTransactionCost(), { gasUsed: r, missingContractIds: n, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, r, i), e.inputs = e.inputs.filter((a) => a.type !== Ct.Coin), n.forEach((a) => {
      e.addContractInputAndOutput(ft.fromString(a));
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
    return t.tip = R(e.tip || t.tip), t.gasLimit = R(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? R(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? R(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
      ft.fromAddressOrString(r),
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
        ft.fromAddressOrString(r),
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
    Wd(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => iC({
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
    if (Wd(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new x(
        D.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return co({
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
    return co({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return co({
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
    const n = Qr((a = this.txParameters) == null ? void 0 : a.gasLimit) || this.hasCallParamsGasLimit, s = Qr((u = this.txParameters) == null ? void 0 : u.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!n)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new x(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = r;
    else if (r.gt(o))
      throw new x(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${r}'.`
      );
  }
}, J_ = class extends Z_ {
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
        throw new x(
          D.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Sa(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, aC = class extends Z_ {
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
}, Hd = class {
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
    this.interface = t instanceof Ar ? t : new Ar(t), this.id = ft.fromAddressOrString(e), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), Object.keys(this.interface.functions).forEach((n) => {
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
      const t = (...r) => new J_(this, e, r);
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
    return new aC(this, e);
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
}, cC = class extends J_ {
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
      throw new x(
        x.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    this.scriptRequest = new Ci(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, uB = class extends sA {
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
    this.bytes = $(t), this.interface = new Ar(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new cC(this, this.interface.getFunction("main"), s)
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
        throw new x(
          x.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(t).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new x(
            x.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n);
        this.bytes.set(i, s);
      });
    } catch (r) {
      throw new x(
        x.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${r.message}.`
      );
    }
    return this;
  }
};
new Ci(
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
function _B(e) {
  return e;
}
var dC = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(dC || {}), uC = Object.defineProperty, _C = (e, t) => {
  for (var r in t)
    uC(e, r, { get: t[r], enumerable: !0 });
}, hC = (e) => {
  const { RegId: t, Instruction: r } = t1, n = 12, s = e.length, i = fr, o = ut(e.map((u) => $(u))), a = new Wa(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    No(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    Vn(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    No(22, t.sp().to_u8()),
    // loop counter
    an(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    k0(17, 16),
    // push the blob contents onto the stack
    T0(16, 0, 17, 1),
    // move on to the next blob
    Vn(16, 16, i),
    // decrement the loop counter
    M0(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    L0(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    N0(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    F0(22, 22, 4),
    // jump to the start of the contract we loaded
    Q0(22)
  ).toBytes();
  return ut([a, o]);
}, lC = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), o = i.length;
    o % gt !== 0 && (i = ut([i, new Uint8Array(t - i.length)]), o = i.length), r.push({ id: s, size: o, bytecode: i });
  }
  return r;
}, fC = {};
_C(fC, {
  getContractId: () => $_,
  getContractRoot: () => q_,
  getContractStorageRoot: () => j_,
  hexlifyWithPrefix: () => Vo
});
var q_ = (e) => {
  const r = $(e), n = uu(r, 16384);
  return s_(n.map((s) => K(s)));
}, j_ = (e) => {
  const t = new W1();
  return e.forEach(({ key: r, value: n }) => t.update(Ce(r), n)), t.root;
}, $_ = (e, t, r) => {
  const n = q_($(e));
  return Ce(ut(["0x4655454C", t, n, r]));
}, Vo = (e) => K(e.startsWith("0x") ? e : `0x${e}`), Yd = 0.95, AC = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, r = null) {
    F(this, "bytecode");
    F(this, "interface");
    F(this, "provider");
    F(this, "account");
    this.bytecode = $(e), t instanceof Ar ? this.interface = t : this.interface = new Ar(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new AC(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var a;
    const t = (a = e == null ? void 0 : e.storageSlots) == null ? void 0 : a.map(({ key: u, value: f }) => ({
      key: Vo(u),
      value: Vo(f)
    })).sort(({ key: u }, { key: f }) => u.localeCompare(f)), r = {
      salt: ze(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new x(
        D.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || j_(r.storageSlots), i = $_(n, r.salt, s), o = new Uo({
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
    if (Qr(n)) {
      if (s.maxFee.gt(n))
        throw new x(
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
      throw new x(
        D.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: s, transactionRequest: i } = await this.prepareDeploy(e), o = await t.sendTransaction(i);
    return {
      contractId: s,
      waitForTransactionId: () => Promise.resolve(o.id),
      waitForResult: async () => {
        const u = await o.waitForResult();
        return { contract: new Hd(s, this.interface, t), transactionResult: u };
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
    chunkSizeMultiplier: Yd
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = this.getMaxChunkSize(e, n), i = lC($(this.bytecode), s).map((O) => {
      const L = this.blobTransactionRequest({
        ...e,
        bytecode: O.bytecode
      });
      return {
        ...O,
        transactionRequest: L,
        blobId: L.blobId
      };
    }), o = i.map(({ blobId: O }) => O), a = hC(o), { contractId: u, transactionRequest: f } = this.createTransactionRequest({
      bytecode: a,
      ...e
    }), g = [...new Set(o)], E = await t.provider.getBlobs(g), C = g.filter((O) => !E.includes(O));
    let S = R(0);
    const Q = t.provider.getChain(), N = await t.provider.estimateGasPrice(10), T = Q.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: O, blobId: L } of i) {
      if (C.includes(L)) {
        const k = O.calculateMinGas(Q), j = Zn({
          gasPrice: N,
          gas: k,
          priceFactor: T,
          tip: O.tip
        }).add(1);
        S = S.add(j);
      }
      const z = f.calculateMinGas(Q), U = Zn({
        gasPrice: N,
        gas: z,
        priceFactor: T,
        tip: f.tip
      }).add(1);
      S = S.add(U);
    }
    if (S.gt(await t.getBalance()))
      throw new x(D.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let M;
    const H = new Promise((O) => {
      M = O;
    });
    return { waitForResult: async () => {
      const O = [];
      for (const { blobId: k, transactionRequest: j } of i)
        if (!O.includes(k) && C.includes(k)) {
          const V = await this.fundTransactionRequest(
            j,
            e
          );
          let tt;
          try {
            tt = await (await t.sendTransaction(V)).waitForResult();
          } catch (B) {
            if (B.message.indexOf(`BlobId is already taken ${k}`) > -1) {
              O.push(k);
              continue;
            }
            throw new x(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!tt.status || tt.status !== I_.success)
            throw new x(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          O.push(k);
        }
      await this.fundTransactionRequest(f, e), M(f.getTransactionId(t.provider.getChainId()));
      const z = await (await t.sendTransaction(f)).waitForResult();
      return { contract: new Hd(u, this.interface, t), transactionResult: z };
    }, contractId: u, waitForTransactionId: () => H };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new x(
          D.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(e).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new x(
            D.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n), o = $(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new x(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new x(D.ACCOUNT_REQUIRED, "Account not assigned to contract.");
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
    return new Po({
      blobId: Je(t),
      witnessIndex: 0,
      witnesses: [t],
      ...e
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  getMaxChunkSize(e, t = Yd) {
    if (t < 0 || t > 1)
      throw new x(
        D.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const r = this.getAccount(), { consensusParameters: n } = r.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber(), i = n.txParameters.maxSize.toNumber(), o = 64e3, a = i < s ? i : s, u = a < o ? a : o, f = this.blobTransactionRequest({
      ...e,
      bytecode: ze(32)
    }).addResources(
      r.generateFakeResources([{ assetId: r.provider.getBaseAssetId(), amount: R(1) }])
    ), g = (u - f.byteLength() - gt) * t;
    return Math.round(g / gt) * gt;
  }
}, hB = 9, lB = 3, fB = 9, AB = 9, pB = 18, gB = 15, wB = 12, mB = 9, yB = "https://devnet.fuel.network/v1/graphql", bB = "https://testnet.fuel.network/v1/graphql";
export {
  Gs as ASSET_ID_LEN,
  t0 as AbstractAccount,
  rA as AbstractAddress,
  nA as AbstractContract,
  e0 as AbstractProgram,
  sA as AbstractScript,
  SC as AbstractScriptRequest,
  vi as Account,
  ft as Address,
  Tv as AddressType,
  bt as ArrayCoder,
  J as B256Coder,
  zf as B512Coder,
  a2 as BLOCKS_PAGE_SIZE_LIMIT,
  zt as BN,
  fr as BYTES_32,
  Bn as BaseTransactionRequest,
  S_ as BaseWalletUnlocked,
  P as BigNumberCoder,
  Po as BlobTransactionRequest,
  Wf as BooleanCoder,
  St as ByteArrayCoder,
  Xu as ByteCoder,
  ot as CHAIN_IDS,
  Lf as CONTRACT_ID_LEN,
  FC as CONTRACT_MAX_SIZE,
  Dv as ChainName,
  VC as ChangeOutputCollisionError,
  _t as Coder,
  dC as Commands,
  Hd as Contract,
  AC as ContractFactory,
  fC as ContractUtils,
  Uo as CreateTransactionRequest,
  AB as DECIMAL_FUEL,
  mB as DECIMAL_GWEI,
  gB as DECIMAL_KWEI,
  wB as DECIMAL_MWEI,
  pB as DECIMAL_WEI,
  fB as DEFAULT_DECIMAL_UNITS,
  lB as DEFAULT_MIN_PRECISION,
  hB as DEFAULT_PRECISION,
  c2 as DEFAULT_RESOURCE_CACHE_TTL,
  yB as DEVNET_NETWORK_URL,
  ta as DateTime,
  Us as ENCODING_V1,
  QC as EmptyRoot,
  Hu as EnumCoder,
  D as ErrorCode,
  qp as FAILED_ASSERT_EQ_SIGNAL,
  $p as FAILED_ASSERT_NE_SIGNAL,
  jp as FAILED_ASSERT_SIGNAL,
  Jp as FAILED_REQUIRE_SIGNAL,
  x0 as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  zC as FAILED_UNKNOWN_SIGNAL,
  Xs as FUEL_BECH32_HRP_PREFIX,
  G_ as Fuel,
  W2 as FuelConnector,
  z_ as FuelConnectorEventType,
  Ga as FuelConnectorEventTypes,
  U_ as FuelConnectorMethods,
  x as FuelError,
  J_ as FunctionInvocationScope,
  ao as HDWallet,
  RC as INPUT_COIN_FIXED_SIZE,
  er as InputCoder,
  mc as InputCoinCoder,
  Hs as InputContractCoder,
  Tr as InputMessageCoder,
  Ct as InputType,
  Wa as InstructionSet,
  Ar as Interface,
  C2 as Language,
  G2 as LocalStorage,
  UC as MAX_PREDICATE_DATA_LENGTH,
  PC as MAX_PREDICATE_LENGTH,
  LC as MAX_SCRIPT_DATA_LENGTH,
  OC as MAX_SCRIPT_LENGTH,
  kC as MAX_STATIC_CONTRACTS,
  MC as MAX_WITNESSES,
  Pd as MNEMONIC_SIZES,
  k2 as MemoryStorage,
  Pa as Mnemonic,
  M_ as MnemonicVault,
  aC as MultiCallInvocationScope,
  cv as NoWitnessAtIndexError,
  ZC as NoWitnessByOwnerError,
  rt as NumberCoder,
  Nv as OperationName,
  Ju as OptionCoder,
  bc as OutputChangeCoder,
  rr as OutputCoder,
  yc as OutputCoinCoder,
  Ys as OutputContractCoder,
  Ec as OutputContractCreatedCoder,
  vt as OutputType,
  Ic as OutputVariableCoder,
  tg as PANIC_DOC_URL,
  Kp as PANIC_REASONS,
  nr as PoliciesCoder,
  Ye as PolicyType,
  Gd as Predicate,
  O_ as PrivateKeyVault,
  ai as Provider,
  Qd as RESOURCES_PAGE_SIZE_LIMIT,
  Hf as RawSliceCoder,
  Fc as ReceiptBurnCoder,
  vc as ReceiptCallCoder,
  TC as ReceiptCoder,
  Sc as ReceiptLogCoder,
  Nc as ReceiptLogDataCoder,
  Eo as ReceiptMessageOutCoder,
  Vs as ReceiptMintCoder,
  xc as ReceiptPanicCoder,
  Cc as ReceiptReturnCoder,
  Bc as ReceiptReturnDataCoder,
  Rc as ReceiptRevertCoder,
  Qc as ReceiptScriptResultCoder,
  Tc as ReceiptTransferCoder,
  Dc as ReceiptTransferOutCoder,
  At as ReceiptType,
  Wu as SCRIPT_FIXED_SIZE,
  uB as Script,
  Ci as ScriptRequest,
  Wr as ScriptTransactionRequest,
  In as Signer,
  _a as StdStringCoder,
  cB as StorageAbstract,
  Mc as StorageSlotCoder,
  qu as StrSliceCoder,
  Yf as StringCoder,
  li as StructCoder,
  bB as TESTNET_NETWORK_URL,
  Gc as TransactionBlobCoder,
  lr as TransactionCoder,
  kc as TransactionCreateCoder,
  Pc as TransactionMintCoder,
  Wo as TransactionResponse,
  Lc as TransactionScriptCoder,
  I_ as TransactionStatus,
  Bt as TransactionType,
  Sv as TransactionTypeName,
  Uc as TransactionUpgradeCoder,
  zc as TransactionUploadCoder,
  ju as TupleCoder,
  Vr as TxPointerCoder,
  zs as UTXO_ID_LEN,
  Oc as UpgradePurposeCoder,
  Pe as UpgradePurposeTypeEnum,
  zo as UpgradeTransactionRequest,
  Go as UploadTransactionRequest,
  DC as UtxoIdCoder,
  U2 as Vault,
  Vf as VecCoder,
  gt as WORD_SIZE,
  xe as Wallet,
  F_ as WalletLocked,
  P2 as WalletManager,
  Qe as WalletUnlocked,
  sr as WitnessCoder,
  Dt as ZeroBytes32,
  Y1 as addAmountToCoinQuantities,
  qn as addOperation,
  On as addressify,
  Ev as aggregateInputsAmountsByAssetAndOwner,
  $ as arrayify,
  ov as assemblePanicError,
  $E as assembleReceiptByType,
  av as assembleRevertError,
  Ei as assembleTransactionSummary,
  Wd as assert,
  jh as assertUnreachable,
  aB as assets,
  R as bn,
  Nr as bufferFromString,
  YC as buildBlockExplorerUrl,
  co as buildDryRunResult,
  iC as buildFunctionResult,
  X2 as cacheFor,
  JC as cacheRequestInputsResources,
  uv as cacheRequestInputsResourcesFromOwner,
  Zn as calculateGasFee,
  rv as calculateMetadataGasForTxBlob,
  f_ as calculateMetadataGasForTxCreate,
  A_ as calculateMetadataGasForTxScript,
  Sd as calculateMetadataGasForTxUpgrade,
  nv as calculateMetadataGasForTxUpload,
  sv as calculateMinGasForTxUpload,
  pv as calculateTXFeeForSummary,
  Gu as calculateVmTxMemory,
  bC as capitalizeString,
  uu as chunkAndPadBytes,
  uA as clearFirst12BytesFromB256,
  Sa as coinQuantityfy,
  CC as compressBytecode,
  Ou as computeHmac,
  ut as concat,
  ui as concatBytes,
  NC as createAssetId,
  _B as createConfig,
  ea as dataSlice,
  Zh as decodeBase58,
  BC as decompressBytecode,
  df as decrypt,
  _f as decryptJsonWalletData,
  vC as defaultConsensusKey,
  EC as defaultSnapshotConfigs,
  H2 as deferPromise,
  dB as dispatchFuelConnectorEvent,
  fu as encodeBase58,
  uf as encrypt,
  hf as encryptJsonWalletData,
  Is as english,
  e2 as extractBurnedAssetsFromReceipts,
  V_ as extractInvocationResult,
  t2 as extractMintedAssetsFromReceipts,
  Fa as extractTxError,
  wC as format,
  gC as formatUnits,
  pa as fromBech32,
  g2 as fuelAssetsBaseUrl,
  ev as gasUsedByInputs,
  W_ as getAbisFromAllCalls,
  dv as getAssetAmountInRequestInputs,
  iB as getAssetEth,
  oB as getAssetFuel,
  _2 as getAssetNetwork,
  R_ as getAssetWithNetwork,
  ga as getBytesFromBech32,
  Zv as getContractCallOperations,
  $v as getContractCreatedOperations,
  ka as getDecodedLogs,
  u2 as getDefaultChainId,
  Ii as getGasUsedFromReceipts,
  La as getInputAccountAddress,
  Cv as getInputContractFromIndex,
  y_ as getInputFromAssetId,
  Oa as getInputsByType,
  wv as getInputsByTypes,
  mv as getInputsCoin,
  m_ as getInputsCoinAndMessage,
  bv as getInputsContract,
  yv as getInputsMessage,
  Qa as getMaxGas,
  l_ as getMinGas,
  Xn as getMintedAssetId,
  Kv as getOperations,
  fs as getOutputsByType,
  xv as getOutputsChange,
  b_ as getOutputsCoin,
  Rv as getOutputsContract,
  Bv as getOutputsContractCreated,
  KC as getOutputsVariable,
  jv as getPayProducerOperations,
  z2 as getPredicateRoot,
  dA as getRandomB256,
  Jn as getReceiptsByType,
  Lv as getReceiptsCall,
  kv as getReceiptsMessageOut,
  eB as getReceiptsTransferOut,
  Rd as getReceiptsWithMissingData,
  w_ as getRequestInputResourceOwner,
  X_ as getResultLogs,
  r2 as getTransactionStatusName,
  rB as getTransactionSummary,
  nB as getTransactionSummaryFromRequest,
  E_ as getTransactionTypeName,
  sB as getTransactionsSummaries,
  qv as getTransferOperations,
  Xv as getWithdrawFromFuelOperations,
  tB as hasSameAssetId,
  Je as hash,
  gf as hashMessage,
  K as hexlify,
  VE as inputify,
  bo as isB256,
  Ns as isBech32,
  JE as isCoin,
  Qr as isDefined,
  Io as isEvmAddress,
  Td as isInputCoin,
  HC as isMessage,
  xd as isMessageCoin,
  gc as isPublicKey,
  WC as isRawCoin,
  XC as isRawMessage,
  $r as isRequestInputCoin,
  g_ as isRequestInputCoinOrMessage,
  Ma as isRequestInputMessage,
  p_ as isRequestInputMessageWithoutData,
  qr as isRequestInputResource,
  ko as isRequestInputResourceFromOwner,
  qC as isTransactionTypeBlob,
  Av as isTransactionTypeCreate,
  kr as isTransactionTypeScript,
  jC as isTransactionTypeUpgrade,
  $C as isTransactionTypeUpload,
  xn as isType,
  Ov as isTypeBlob,
  v_ as isTypeCreate,
  Qv as isTypeMint,
  C_ as isTypeScript,
  Fv as isTypeUpgrade,
  Mv as isTypeUpload,
  Mu as keccak256,
  xC as keyFromPassword,
  mC as max,
  yC as multiply,
  cA as normalizeBech32,
  iv as normalizeJSON,
  IC as normalizeString,
  ZE as outputify,
  _A as padFirst12BytesOfEvmAddress,
  lf as pbkdf2,
  Rr as processGqlReceipt,
  n2 as processGraphqlStatus,
  ze as randomBytes,
  Af as randomUUID,
  w2 as rawAssets,
  Re as resolveGasDependentCosts,
  p2 as resolveIconPaths,
  Nd as returnZeroScript,
  ff as ripemd160,
  Fu as scrypt,
  Ce as sha256,
  Wh as sleep,
  hA as sortPolicies,
  Mn as stringFromBuffer,
  wc as toB256,
  Ss as toBech32,
  hr as toBytes,
  fh as toFixed,
  jo as toHex,
  Cr as toNumber,
  fn as toUtf8Bytes,
  ra as toUtf8String,
  Se as transactionRequestify,
  pf as uint64ToBytesBE,
  A2 as urlJoin,
  Es as withTimeout,
  fv as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
