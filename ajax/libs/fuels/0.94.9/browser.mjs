var $l = Object.defineProperty;
var vc = (e) => {
  throw TypeError(e);
};
var Kl = (e, t, r) => t in e ? $l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var O = (e, t, r) => Kl(e, typeof t != "symbol" ? t + "" : t, r), to = (e, t, r) => t.has(e) || vc("Cannot " + r);
var Vt = (e, t, r) => (to(e, t, "read from private field"), r ? r.call(e) : t.get(e)), He = (e, t, r) => t.has(e) ? vc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), $e = (e, t, r, n) => (to(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), Is = (e, t, r) => (to(e, t, "access private method"), r);
function n_() {
  return {
    FORC: "0.64.0",
    FUEL_CORE: "0.37.0",
    FUELS: "0.94.9"
  };
}
function Cc(e) {
  const [t, r, n] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: r, patch: n };
}
function fa(e, t) {
  const r = Cc(e), n = Cc(t), s = r.major - n.major, i = r.minor - n.minor, o = r.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function tf(e, t) {
  const { major: r } = fa(e, t);
  return r === 0;
}
function ef(e, t) {
  const { minor: r } = fa(e, t);
  return r === 0;
}
function rf(e, t) {
  const { patch: r } = fa(e, t);
  return r === 0;
}
function nf(e) {
  const { FUEL_CORE: t } = n_();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: tf(e, t),
    isMinorSupported: ef(e, t),
    isPatchSupported: rf(e, t)
  };
}
var sf = n_(), of = Object.defineProperty, af = (e, t, r) => t in e ? of(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, cf = (e, t, r) => (af(e, t + "", r), r), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_URL = "invalid-url", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.NOT_ENOUGH_FUNDS = "not-enough-funds", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(D || {}), Ns = class extends Error {
  constructor(t, r, n = {}, s = null) {
    super(r);
    O(this, "VERSIONS", sf);
    O(this, "metadata");
    O(this, "rawError");
    O(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new Ns(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(D);
    if (!n.includes(r.code))
      throw new Ns(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new Ns(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o };
  }
}, x = Ns;
cf(x, "CODES", D);
var St = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function df(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function pa(e) {
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
var Aa = { exports: {} };
const uf = {}, _f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: uf
}, Symbol.toStringTag, { value: "Module" })), hf = /* @__PURE__ */ pa(_f);
Aa.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = hf.Buffer;
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
      var m = 0;
      d[0] === "-" && (m++, this.negative = 1), m < d.length && (_ === 16 ? this._parseHex(d, m, p) : (this._parseBase(d, _, m), p === "le" && this._initArray(this.toArray(), _, p)));
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
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var A, E, v = 0;
      if (p === "be")
        for (m = d.length - 1, A = 0; m >= 0; m -= 3)
          E = d[m] | d[m - 1] << 8 | d[m - 2] << 16, this.words[A] |= E << v & 67108863, this.words[A + 1] = E >>> 26 - v & 67108863, v += 24, v >= 26 && (v -= 26, A++);
      else if (p === "le")
        for (m = 0, A = 0; m < d.length; m += 3)
          E = d[m] | d[m + 1] << 8 | d[m + 2] << 16, this.words[A] |= E << v & 67108863, this.words[A + 1] = E >>> 26 - v & 67108863, v += 24, v >= 26 && (v -= 26, A++);
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
      var p = a(B, _);
      return _ - 1 >= d && (p |= a(B, _ - 1) << 4), p;
    }
    i.prototype._parseHex = function(d, _, p) {
      this.length = Math.ceil((d.length - _) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var A = 0, E = 0, v;
      if (p === "be")
        for (m = d.length - 1; m >= _; m -= 2)
          v = u(d, _, m) << A, this.words[E] |= v & 67108863, A >= 18 ? (A -= 18, E += 1, this.words[E] |= v >>> 26) : A += 8;
      else {
        var w = d.length - _;
        for (m = w % 2 === 0 ? _ + 1 : _; m < d.length; m += 2)
          v = u(d, _, m) << A, this.words[E] |= v & 67108863, A >= 18 ? (A -= 18, E += 1, this.words[E] |= v >>> 26) : A += 8;
      }
      this._strip();
    };
    function f(B, d, _, p) {
      for (var m = 0, A = 0, E = Math.min(B.length, _), v = d; v < E; v++) {
        var w = B.charCodeAt(v) - 48;
        m *= p, w >= 49 ? A = w - 49 + 10 : w >= 17 ? A = w - 17 + 10 : A = w, n(w >= 0 && A < p, "Invalid character"), m += A;
      }
      return m;
    }
    i.prototype._parseBase = function(d, _, p) {
      this.words = [0], this.length = 1;
      for (var m = 0, A = 1; A <= 67108863; A *= _)
        m++;
      m--, A = A / _ | 0;
      for (var E = d.length - p, v = E % m, w = Math.min(E, E - v) + p, h = 0, b = p; b < w; b += m)
        h = f(d, b, b + m, _), this.imuln(A), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = I;
      } catch {
        i.prototype.inspect = I;
      }
    else
      i.prototype.inspect = I;
    function I() {
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
      var p;
      if (d === 16 || d === "hex") {
        p = "";
        for (var m = 0, A = 0, E = 0; E < this.length; E++) {
          var v = this.words[E], w = ((v << m | A) & 16777215).toString(16);
          A = v >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, E--), A !== 0 || E !== this.length - 1 ? p = C[6 - w.length] + w + p : p = w + p;
        }
        for (A !== 0 && (p = A.toString(16) + p); p.length % _ !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      if (d === (d | 0) && d >= 2 && d <= 36) {
        var h = S[d], b = Q[d];
        p = "";
        var q = this.clone();
        for (q.negative = 0; !q.isZero(); ) {
          var W = q.modrn(b).toString(d);
          q = q.idivn(b), q.isZero() ? p = W + p : p = C[h - W.length] + W + p;
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
    var N = function(d, _) {
      return d.allocUnsafe ? d.allocUnsafe(_) : new d(_);
    };
    i.prototype.toArrayLike = function(d, _, p) {
      this._strip();
      var m = this.byteLength(), A = p || Math.max(1, m);
      n(m <= A, "byte array longer than desired length"), n(A > 0, "Requested array length <= 0");
      var E = N(d, A), v = _ === "le" ? "LE" : "BE";
      return this["_toArrayLike" + v](E, m), E;
    }, i.prototype._toArrayLikeLE = function(d, _) {
      for (var p = 0, m = 0, A = 0, E = 0; A < this.length; A++) {
        var v = this.words[A] << E | m;
        d[p++] = v & 255, p < d.length && (d[p++] = v >> 8 & 255), p < d.length && (d[p++] = v >> 16 & 255), E === 6 ? (p < d.length && (d[p++] = v >> 24 & 255), m = 0, E = 0) : (m = v >>> 24, E += 2);
      }
      if (p < d.length)
        for (d[p++] = m; p < d.length; )
          d[p++] = 0;
    }, i.prototype._toArrayLikeBE = function(d, _) {
      for (var p = d.length - 1, m = 0, A = 0, E = 0; A < this.length; A++) {
        var v = this.words[A] << E | m;
        d[p--] = v & 255, p >= 0 && (d[p--] = v >> 8 & 255), p >= 0 && (d[p--] = v >> 16 & 255), E === 6 ? (p >= 0 && (d[p--] = v >> 24 & 255), m = 0, E = 0) : (m = v >>> 24, E += 2);
      }
      if (p >= 0)
        for (d[p--] = m; p >= 0; )
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
    function T(B) {
      for (var d = new Array(B.bitLength()), _ = 0; _ < d.length; _++) {
        var p = _ / 26 | 0, m = _ % 26;
        d[_] = B.words[p] >>> m & 1;
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
      for (var m = 0; m < p.length; m++)
        this.words[m] = _.words[m] ^ p.words[m];
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
      var _ = Math.ceil(d / 26) | 0, p = d % 26;
      this._expand(_), p > 0 && _--;
      for (var m = 0; m < _; m++)
        this.words[m] = ~this.words[m] & 67108863;
      return p > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - p), this._strip();
    }, i.prototype.notn = function(d) {
      return this.clone().inotn(d);
    }, i.prototype.setn = function(d, _) {
      n(typeof d == "number" && d >= 0);
      var p = d / 26 | 0, m = d % 26;
      return this._expand(p + 1), _ ? this.words[p] = this.words[p] | 1 << m : this.words[p] = this.words[p] & ~(1 << m), this._strip();
    }, i.prototype.iadd = function(d) {
      var _;
      if (this.negative !== 0 && d.negative === 0)
        return this.negative = 0, _ = this.isub(d), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && d.negative !== 0)
        return d.negative = 0, _ = this.isub(d), d.negative = 1, _._normSign();
      var p, m;
      this.length > d.length ? (p = this, m = d) : (p = d, m = this);
      for (var A = 0, E = 0; E < m.length; E++)
        _ = (p.words[E] | 0) + (m.words[E] | 0) + A, this.words[E] = _ & 67108863, A = _ >>> 26;
      for (; A !== 0 && E < p.length; E++)
        _ = (p.words[E] | 0) + A, this.words[E] = _ & 67108863, A = _ >>> 26;
      if (this.length = p.length, A !== 0)
        this.words[this.length] = A, this.length++;
      else if (p !== this)
        for (; E < p.length; E++)
          this.words[E] = p.words[E];
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
      var m, A;
      p > 0 ? (m = this, A = d) : (m = d, A = this);
      for (var E = 0, v = 0; v < A.length; v++)
        _ = (m.words[v] | 0) - (A.words[v] | 0) + E, E = _ >> 26, this.words[v] = _ & 67108863;
      for (; E !== 0 && v < m.length; v++)
        _ = (m.words[v] | 0) + E, E = _ >> 26, this.words[v] = _ & 67108863;
      if (E === 0 && v < m.length && m !== this)
        for (; v < m.length; v++)
          this.words[v] = m.words[v];
      return this.length = Math.max(this.length, v), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(d) {
      return this.clone().isub(d);
    };
    function F(B, d, _) {
      _.negative = d.negative ^ B.negative;
      var p = B.length + d.length | 0;
      _.length = p, p = p - 1 | 0;
      var m = B.words[0] | 0, A = d.words[0] | 0, E = m * A, v = E & 67108863, w = E / 67108864 | 0;
      _.words[0] = v;
      for (var h = 1; h < p; h++) {
        for (var b = w >>> 26, q = w & 67108863, W = Math.min(h, d.length - 1), et = Math.max(0, h - B.length + 1); et <= W; et++) {
          var nt = h - et | 0;
          m = B.words[nt] | 0, A = d.words[et] | 0, E = m * A + q, b += E / 67108864 | 0, q = E & 67108863;
        }
        _.words[h] = q | 0, w = b | 0;
      }
      return w !== 0 ? _.words[h] = w | 0 : _.length--, _._strip();
    }
    var Y = function(d, _, p) {
      var m = d.words, A = _.words, E = p.words, v = 0, w, h, b, q = m[0] | 0, W = q & 8191, et = q >>> 13, nt = m[1] | 0, st = nt & 8191, ot = nt >>> 13, Ot = m[2] | 0, ht = Ot & 8191, dt = Ot >>> 13, Dt = m[3] | 0, At = Dt & 8191, yt = Dt >>> 13, Pr = m[4] | 0, Mt = Pr & 8191, Rt = Pr >>> 13, On = m[5] | 0, Ut = On & 8191, zt = On >>> 13, bs = m[6] | 0, Ht = bs & 8191, Xt = bs >>> 13, _c = m[7] | 0, Zt = _c & 8191, Wt = _c >>> 13, hc = m[8] | 0, jt = hc & 8191, qt = hc >>> 13, lc = m[9] | 0, Jt = lc & 8191, $t = lc >>> 13, fc = A[0] | 0, Kt = fc & 8191, te = fc >>> 13, pc = A[1] | 0, ee = pc & 8191, re = pc >>> 13, Ac = A[2] | 0, ne = Ac & 8191, se = Ac >>> 13, gc = A[3] | 0, ie = gc & 8191, oe = gc >>> 13, wc = A[4] | 0, ae = wc & 8191, ce = wc >>> 13, mc = A[5] | 0, de = mc & 8191, ue = mc >>> 13, yc = A[6] | 0, _e = yc & 8191, he = yc >>> 13, bc = A[7] | 0, le = bc & 8191, fe = bc >>> 13, Ic = A[8] | 0, pe = Ic & 8191, Ae = Ic >>> 13, Ec = A[9] | 0, ge = Ec & 8191, we = Ec >>> 13;
      p.negative = d.negative ^ _.negative, p.length = 19, w = Math.imul(W, Kt), h = Math.imul(W, te), h = h + Math.imul(et, Kt) | 0, b = Math.imul(et, te);
      var Oi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, w = Math.imul(st, Kt), h = Math.imul(st, te), h = h + Math.imul(ot, Kt) | 0, b = Math.imul(ot, te), w = w + Math.imul(W, ee) | 0, h = h + Math.imul(W, re) | 0, h = h + Math.imul(et, ee) | 0, b = b + Math.imul(et, re) | 0;
      var Mi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, w = Math.imul(ht, Kt), h = Math.imul(ht, te), h = h + Math.imul(dt, Kt) | 0, b = Math.imul(dt, te), w = w + Math.imul(st, ee) | 0, h = h + Math.imul(st, re) | 0, h = h + Math.imul(ot, ee) | 0, b = b + Math.imul(ot, re) | 0, w = w + Math.imul(W, ne) | 0, h = h + Math.imul(W, se) | 0, h = h + Math.imul(et, ne) | 0, b = b + Math.imul(et, se) | 0;
      var Li = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, w = Math.imul(At, Kt), h = Math.imul(At, te), h = h + Math.imul(yt, Kt) | 0, b = Math.imul(yt, te), w = w + Math.imul(ht, ee) | 0, h = h + Math.imul(ht, re) | 0, h = h + Math.imul(dt, ee) | 0, b = b + Math.imul(dt, re) | 0, w = w + Math.imul(st, ne) | 0, h = h + Math.imul(st, se) | 0, h = h + Math.imul(ot, ne) | 0, b = b + Math.imul(ot, se) | 0, w = w + Math.imul(W, ie) | 0, h = h + Math.imul(W, oe) | 0, h = h + Math.imul(et, ie) | 0, b = b + Math.imul(et, oe) | 0;
      var ki = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, w = Math.imul(Mt, Kt), h = Math.imul(Mt, te), h = h + Math.imul(Rt, Kt) | 0, b = Math.imul(Rt, te), w = w + Math.imul(At, ee) | 0, h = h + Math.imul(At, re) | 0, h = h + Math.imul(yt, ee) | 0, b = b + Math.imul(yt, re) | 0, w = w + Math.imul(ht, ne) | 0, h = h + Math.imul(ht, se) | 0, h = h + Math.imul(dt, ne) | 0, b = b + Math.imul(dt, se) | 0, w = w + Math.imul(st, ie) | 0, h = h + Math.imul(st, oe) | 0, h = h + Math.imul(ot, ie) | 0, b = b + Math.imul(ot, oe) | 0, w = w + Math.imul(W, ae) | 0, h = h + Math.imul(W, ce) | 0, h = h + Math.imul(et, ae) | 0, b = b + Math.imul(et, ce) | 0;
      var Pi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, w = Math.imul(Ut, Kt), h = Math.imul(Ut, te), h = h + Math.imul(zt, Kt) | 0, b = Math.imul(zt, te), w = w + Math.imul(Mt, ee) | 0, h = h + Math.imul(Mt, re) | 0, h = h + Math.imul(Rt, ee) | 0, b = b + Math.imul(Rt, re) | 0, w = w + Math.imul(At, ne) | 0, h = h + Math.imul(At, se) | 0, h = h + Math.imul(yt, ne) | 0, b = b + Math.imul(yt, se) | 0, w = w + Math.imul(ht, ie) | 0, h = h + Math.imul(ht, oe) | 0, h = h + Math.imul(dt, ie) | 0, b = b + Math.imul(dt, oe) | 0, w = w + Math.imul(st, ae) | 0, h = h + Math.imul(st, ce) | 0, h = h + Math.imul(ot, ae) | 0, b = b + Math.imul(ot, ce) | 0, w = w + Math.imul(W, de) | 0, h = h + Math.imul(W, ue) | 0, h = h + Math.imul(et, de) | 0, b = b + Math.imul(et, ue) | 0;
      var Ui = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, w = Math.imul(Ht, Kt), h = Math.imul(Ht, te), h = h + Math.imul(Xt, Kt) | 0, b = Math.imul(Xt, te), w = w + Math.imul(Ut, ee) | 0, h = h + Math.imul(Ut, re) | 0, h = h + Math.imul(zt, ee) | 0, b = b + Math.imul(zt, re) | 0, w = w + Math.imul(Mt, ne) | 0, h = h + Math.imul(Mt, se) | 0, h = h + Math.imul(Rt, ne) | 0, b = b + Math.imul(Rt, se) | 0, w = w + Math.imul(At, ie) | 0, h = h + Math.imul(At, oe) | 0, h = h + Math.imul(yt, ie) | 0, b = b + Math.imul(yt, oe) | 0, w = w + Math.imul(ht, ae) | 0, h = h + Math.imul(ht, ce) | 0, h = h + Math.imul(dt, ae) | 0, b = b + Math.imul(dt, ce) | 0, w = w + Math.imul(st, de) | 0, h = h + Math.imul(st, ue) | 0, h = h + Math.imul(ot, de) | 0, b = b + Math.imul(ot, ue) | 0, w = w + Math.imul(W, _e) | 0, h = h + Math.imul(W, he) | 0, h = h + Math.imul(et, _e) | 0, b = b + Math.imul(et, he) | 0;
      var Gi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, w = Math.imul(Zt, Kt), h = Math.imul(Zt, te), h = h + Math.imul(Wt, Kt) | 0, b = Math.imul(Wt, te), w = w + Math.imul(Ht, ee) | 0, h = h + Math.imul(Ht, re) | 0, h = h + Math.imul(Xt, ee) | 0, b = b + Math.imul(Xt, re) | 0, w = w + Math.imul(Ut, ne) | 0, h = h + Math.imul(Ut, se) | 0, h = h + Math.imul(zt, ne) | 0, b = b + Math.imul(zt, se) | 0, w = w + Math.imul(Mt, ie) | 0, h = h + Math.imul(Mt, oe) | 0, h = h + Math.imul(Rt, ie) | 0, b = b + Math.imul(Rt, oe) | 0, w = w + Math.imul(At, ae) | 0, h = h + Math.imul(At, ce) | 0, h = h + Math.imul(yt, ae) | 0, b = b + Math.imul(yt, ce) | 0, w = w + Math.imul(ht, de) | 0, h = h + Math.imul(ht, ue) | 0, h = h + Math.imul(dt, de) | 0, b = b + Math.imul(dt, ue) | 0, w = w + Math.imul(st, _e) | 0, h = h + Math.imul(st, he) | 0, h = h + Math.imul(ot, _e) | 0, b = b + Math.imul(ot, he) | 0, w = w + Math.imul(W, le) | 0, h = h + Math.imul(W, fe) | 0, h = h + Math.imul(et, le) | 0, b = b + Math.imul(et, fe) | 0;
      var zi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, w = Math.imul(jt, Kt), h = Math.imul(jt, te), h = h + Math.imul(qt, Kt) | 0, b = Math.imul(qt, te), w = w + Math.imul(Zt, ee) | 0, h = h + Math.imul(Zt, re) | 0, h = h + Math.imul(Wt, ee) | 0, b = b + Math.imul(Wt, re) | 0, w = w + Math.imul(Ht, ne) | 0, h = h + Math.imul(Ht, se) | 0, h = h + Math.imul(Xt, ne) | 0, b = b + Math.imul(Xt, se) | 0, w = w + Math.imul(Ut, ie) | 0, h = h + Math.imul(Ut, oe) | 0, h = h + Math.imul(zt, ie) | 0, b = b + Math.imul(zt, oe) | 0, w = w + Math.imul(Mt, ae) | 0, h = h + Math.imul(Mt, ce) | 0, h = h + Math.imul(Rt, ae) | 0, b = b + Math.imul(Rt, ce) | 0, w = w + Math.imul(At, de) | 0, h = h + Math.imul(At, ue) | 0, h = h + Math.imul(yt, de) | 0, b = b + Math.imul(yt, ue) | 0, w = w + Math.imul(ht, _e) | 0, h = h + Math.imul(ht, he) | 0, h = h + Math.imul(dt, _e) | 0, b = b + Math.imul(dt, he) | 0, w = w + Math.imul(st, le) | 0, h = h + Math.imul(st, fe) | 0, h = h + Math.imul(ot, le) | 0, b = b + Math.imul(ot, fe) | 0, w = w + Math.imul(W, pe) | 0, h = h + Math.imul(W, Ae) | 0, h = h + Math.imul(et, pe) | 0, b = b + Math.imul(et, Ae) | 0;
      var Vi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, w = Math.imul(Jt, Kt), h = Math.imul(Jt, te), h = h + Math.imul($t, Kt) | 0, b = Math.imul($t, te), w = w + Math.imul(jt, ee) | 0, h = h + Math.imul(jt, re) | 0, h = h + Math.imul(qt, ee) | 0, b = b + Math.imul(qt, re) | 0, w = w + Math.imul(Zt, ne) | 0, h = h + Math.imul(Zt, se) | 0, h = h + Math.imul(Wt, ne) | 0, b = b + Math.imul(Wt, se) | 0, w = w + Math.imul(Ht, ie) | 0, h = h + Math.imul(Ht, oe) | 0, h = h + Math.imul(Xt, ie) | 0, b = b + Math.imul(Xt, oe) | 0, w = w + Math.imul(Ut, ae) | 0, h = h + Math.imul(Ut, ce) | 0, h = h + Math.imul(zt, ae) | 0, b = b + Math.imul(zt, ce) | 0, w = w + Math.imul(Mt, de) | 0, h = h + Math.imul(Mt, ue) | 0, h = h + Math.imul(Rt, de) | 0, b = b + Math.imul(Rt, ue) | 0, w = w + Math.imul(At, _e) | 0, h = h + Math.imul(At, he) | 0, h = h + Math.imul(yt, _e) | 0, b = b + Math.imul(yt, he) | 0, w = w + Math.imul(ht, le) | 0, h = h + Math.imul(ht, fe) | 0, h = h + Math.imul(dt, le) | 0, b = b + Math.imul(dt, fe) | 0, w = w + Math.imul(st, pe) | 0, h = h + Math.imul(st, Ae) | 0, h = h + Math.imul(ot, pe) | 0, b = b + Math.imul(ot, Ae) | 0, w = w + Math.imul(W, ge) | 0, h = h + Math.imul(W, we) | 0, h = h + Math.imul(et, ge) | 0, b = b + Math.imul(et, we) | 0;
      var Yi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, w = Math.imul(Jt, ee), h = Math.imul(Jt, re), h = h + Math.imul($t, ee) | 0, b = Math.imul($t, re), w = w + Math.imul(jt, ne) | 0, h = h + Math.imul(jt, se) | 0, h = h + Math.imul(qt, ne) | 0, b = b + Math.imul(qt, se) | 0, w = w + Math.imul(Zt, ie) | 0, h = h + Math.imul(Zt, oe) | 0, h = h + Math.imul(Wt, ie) | 0, b = b + Math.imul(Wt, oe) | 0, w = w + Math.imul(Ht, ae) | 0, h = h + Math.imul(Ht, ce) | 0, h = h + Math.imul(Xt, ae) | 0, b = b + Math.imul(Xt, ce) | 0, w = w + Math.imul(Ut, de) | 0, h = h + Math.imul(Ut, ue) | 0, h = h + Math.imul(zt, de) | 0, b = b + Math.imul(zt, ue) | 0, w = w + Math.imul(Mt, _e) | 0, h = h + Math.imul(Mt, he) | 0, h = h + Math.imul(Rt, _e) | 0, b = b + Math.imul(Rt, he) | 0, w = w + Math.imul(At, le) | 0, h = h + Math.imul(At, fe) | 0, h = h + Math.imul(yt, le) | 0, b = b + Math.imul(yt, fe) | 0, w = w + Math.imul(ht, pe) | 0, h = h + Math.imul(ht, Ae) | 0, h = h + Math.imul(dt, pe) | 0, b = b + Math.imul(dt, Ae) | 0, w = w + Math.imul(st, ge) | 0, h = h + Math.imul(st, we) | 0, h = h + Math.imul(ot, ge) | 0, b = b + Math.imul(ot, we) | 0;
      var Hi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, w = Math.imul(Jt, ne), h = Math.imul(Jt, se), h = h + Math.imul($t, ne) | 0, b = Math.imul($t, se), w = w + Math.imul(jt, ie) | 0, h = h + Math.imul(jt, oe) | 0, h = h + Math.imul(qt, ie) | 0, b = b + Math.imul(qt, oe) | 0, w = w + Math.imul(Zt, ae) | 0, h = h + Math.imul(Zt, ce) | 0, h = h + Math.imul(Wt, ae) | 0, b = b + Math.imul(Wt, ce) | 0, w = w + Math.imul(Ht, de) | 0, h = h + Math.imul(Ht, ue) | 0, h = h + Math.imul(Xt, de) | 0, b = b + Math.imul(Xt, ue) | 0, w = w + Math.imul(Ut, _e) | 0, h = h + Math.imul(Ut, he) | 0, h = h + Math.imul(zt, _e) | 0, b = b + Math.imul(zt, he) | 0, w = w + Math.imul(Mt, le) | 0, h = h + Math.imul(Mt, fe) | 0, h = h + Math.imul(Rt, le) | 0, b = b + Math.imul(Rt, fe) | 0, w = w + Math.imul(At, pe) | 0, h = h + Math.imul(At, Ae) | 0, h = h + Math.imul(yt, pe) | 0, b = b + Math.imul(yt, Ae) | 0, w = w + Math.imul(ht, ge) | 0, h = h + Math.imul(ht, we) | 0, h = h + Math.imul(dt, ge) | 0, b = b + Math.imul(dt, we) | 0;
      var Xi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, w = Math.imul(Jt, ie), h = Math.imul(Jt, oe), h = h + Math.imul($t, ie) | 0, b = Math.imul($t, oe), w = w + Math.imul(jt, ae) | 0, h = h + Math.imul(jt, ce) | 0, h = h + Math.imul(qt, ae) | 0, b = b + Math.imul(qt, ce) | 0, w = w + Math.imul(Zt, de) | 0, h = h + Math.imul(Zt, ue) | 0, h = h + Math.imul(Wt, de) | 0, b = b + Math.imul(Wt, ue) | 0, w = w + Math.imul(Ht, _e) | 0, h = h + Math.imul(Ht, he) | 0, h = h + Math.imul(Xt, _e) | 0, b = b + Math.imul(Xt, he) | 0, w = w + Math.imul(Ut, le) | 0, h = h + Math.imul(Ut, fe) | 0, h = h + Math.imul(zt, le) | 0, b = b + Math.imul(zt, fe) | 0, w = w + Math.imul(Mt, pe) | 0, h = h + Math.imul(Mt, Ae) | 0, h = h + Math.imul(Rt, pe) | 0, b = b + Math.imul(Rt, Ae) | 0, w = w + Math.imul(At, ge) | 0, h = h + Math.imul(At, we) | 0, h = h + Math.imul(yt, ge) | 0, b = b + Math.imul(yt, we) | 0;
      var Zi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, w = Math.imul(Jt, ae), h = Math.imul(Jt, ce), h = h + Math.imul($t, ae) | 0, b = Math.imul($t, ce), w = w + Math.imul(jt, de) | 0, h = h + Math.imul(jt, ue) | 0, h = h + Math.imul(qt, de) | 0, b = b + Math.imul(qt, ue) | 0, w = w + Math.imul(Zt, _e) | 0, h = h + Math.imul(Zt, he) | 0, h = h + Math.imul(Wt, _e) | 0, b = b + Math.imul(Wt, he) | 0, w = w + Math.imul(Ht, le) | 0, h = h + Math.imul(Ht, fe) | 0, h = h + Math.imul(Xt, le) | 0, b = b + Math.imul(Xt, fe) | 0, w = w + Math.imul(Ut, pe) | 0, h = h + Math.imul(Ut, Ae) | 0, h = h + Math.imul(zt, pe) | 0, b = b + Math.imul(zt, Ae) | 0, w = w + Math.imul(Mt, ge) | 0, h = h + Math.imul(Mt, we) | 0, h = h + Math.imul(Rt, ge) | 0, b = b + Math.imul(Rt, we) | 0;
      var Wi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, w = Math.imul(Jt, de), h = Math.imul(Jt, ue), h = h + Math.imul($t, de) | 0, b = Math.imul($t, ue), w = w + Math.imul(jt, _e) | 0, h = h + Math.imul(jt, he) | 0, h = h + Math.imul(qt, _e) | 0, b = b + Math.imul(qt, he) | 0, w = w + Math.imul(Zt, le) | 0, h = h + Math.imul(Zt, fe) | 0, h = h + Math.imul(Wt, le) | 0, b = b + Math.imul(Wt, fe) | 0, w = w + Math.imul(Ht, pe) | 0, h = h + Math.imul(Ht, Ae) | 0, h = h + Math.imul(Xt, pe) | 0, b = b + Math.imul(Xt, Ae) | 0, w = w + Math.imul(Ut, ge) | 0, h = h + Math.imul(Ut, we) | 0, h = h + Math.imul(zt, ge) | 0, b = b + Math.imul(zt, we) | 0;
      var ji = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, w = Math.imul(Jt, _e), h = Math.imul(Jt, he), h = h + Math.imul($t, _e) | 0, b = Math.imul($t, he), w = w + Math.imul(jt, le) | 0, h = h + Math.imul(jt, fe) | 0, h = h + Math.imul(qt, le) | 0, b = b + Math.imul(qt, fe) | 0, w = w + Math.imul(Zt, pe) | 0, h = h + Math.imul(Zt, Ae) | 0, h = h + Math.imul(Wt, pe) | 0, b = b + Math.imul(Wt, Ae) | 0, w = w + Math.imul(Ht, ge) | 0, h = h + Math.imul(Ht, we) | 0, h = h + Math.imul(Xt, ge) | 0, b = b + Math.imul(Xt, we) | 0;
      var qi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, w = Math.imul(Jt, le), h = Math.imul(Jt, fe), h = h + Math.imul($t, le) | 0, b = Math.imul($t, fe), w = w + Math.imul(jt, pe) | 0, h = h + Math.imul(jt, Ae) | 0, h = h + Math.imul(qt, pe) | 0, b = b + Math.imul(qt, Ae) | 0, w = w + Math.imul(Zt, ge) | 0, h = h + Math.imul(Zt, we) | 0, h = h + Math.imul(Wt, ge) | 0, b = b + Math.imul(Wt, we) | 0;
      var Ji = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, w = Math.imul(Jt, pe), h = Math.imul(Jt, Ae), h = h + Math.imul($t, pe) | 0, b = Math.imul($t, Ae), w = w + Math.imul(jt, ge) | 0, h = h + Math.imul(jt, we) | 0, h = h + Math.imul(qt, ge) | 0, b = b + Math.imul(qt, we) | 0;
      var $i = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (b + (h >>> 13) | 0) + ($i >>> 26) | 0, $i &= 67108863, w = Math.imul(Jt, ge), h = Math.imul(Jt, we), h = h + Math.imul($t, ge) | 0, b = Math.imul($t, we);
      var Ki = (v + w | 0) + ((h & 8191) << 13) | 0;
      return v = (b + (h >>> 13) | 0) + (Ki >>> 26) | 0, Ki &= 67108863, E[0] = Oi, E[1] = Mi, E[2] = Li, E[3] = ki, E[4] = Pi, E[5] = Ui, E[6] = Gi, E[7] = zi, E[8] = Vi, E[9] = Yi, E[10] = Hi, E[11] = Xi, E[12] = Zi, E[13] = Wi, E[14] = ji, E[15] = qi, E[16] = Ji, E[17] = $i, E[18] = Ki, v !== 0 && (E[19] = v, p.length++), p;
    };
    Math.imul || (Y = F);
    function z(B, d, _) {
      _.negative = d.negative ^ B.negative, _.length = B.length + d.length;
      for (var p = 0, m = 0, A = 0; A < _.length - 1; A++) {
        var E = m;
        m = 0;
        for (var v = p & 67108863, w = Math.min(A, d.length - 1), h = Math.max(0, A - B.length + 1); h <= w; h++) {
          var b = A - h, q = B.words[b] | 0, W = d.words[h] | 0, et = q * W, nt = et & 67108863;
          E = E + (et / 67108864 | 0) | 0, nt = nt + v | 0, v = nt & 67108863, E = E + (nt >>> 26) | 0, m += E >>> 26, E &= 67108863;
        }
        _.words[A] = v, p = E, E = m;
      }
      return p !== 0 ? _.words[A] = p : _.length--, _._strip();
    }
    function H(B, d, _) {
      return z(B, d, _);
    }
    i.prototype.mulTo = function(d, _) {
      var p, m = this.length + d.length;
      return this.length === 10 && d.length === 10 ? p = Y(this, d, _) : m < 63 ? p = F(this, d, _) : m < 1024 ? p = z(this, d, _) : p = H(this, d, _), p;
    }, i.prototype.mul = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), this.mulTo(d, _);
    }, i.prototype.mulf = function(d) {
      var _ = new i(null);
      return _.words = new Array(this.length + d.length), H(this, d, _);
    }, i.prototype.imul = function(d) {
      return this.clone().mulTo(d, this);
    }, i.prototype.imuln = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(typeof d == "number"), n(d < 67108864);
      for (var p = 0, m = 0; m < this.length; m++) {
        var A = (this.words[m] | 0) * d, E = (A & 67108863) + (p & 67108863);
        p >>= 26, p += A / 67108864 | 0, p += E >>> 26, this.words[m] = E & 67108863;
      }
      return p !== 0 && (this.words[m] = p, this.length++), _ ? this.ineg() : this;
    }, i.prototype.muln = function(d) {
      return this.clone().imuln(d);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(d) {
      var _ = T(d);
      if (_.length === 0) return new i(1);
      for (var p = this, m = 0; m < _.length && _[m] === 0; m++, p = p.sqr())
        ;
      if (++m < _.length)
        for (var A = p.sqr(); m < _.length; m++, A = A.sqr())
          _[m] !== 0 && (p = p.mul(A));
      return p;
    }, i.prototype.iushln = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, p = (d - _) / 26, m = 67108863 >>> 26 - _ << 26 - _, A;
      if (_ !== 0) {
        var E = 0;
        for (A = 0; A < this.length; A++) {
          var v = this.words[A] & m, w = (this.words[A] | 0) - v << _;
          this.words[A] = w | E, E = v >>> 26 - _;
        }
        E && (this.words[A] = E, this.length++);
      }
      if (p !== 0) {
        for (A = this.length - 1; A >= 0; A--)
          this.words[A + p] = this.words[A];
        for (A = 0; A < p; A++)
          this.words[A] = 0;
        this.length += p;
      }
      return this._strip();
    }, i.prototype.ishln = function(d) {
      return n(this.negative === 0), this.iushln(d);
    }, i.prototype.iushrn = function(d, _, p) {
      n(typeof d == "number" && d >= 0);
      var m;
      _ ? m = (_ - _ % 26) / 26 : m = 0;
      var A = d % 26, E = Math.min((d - A) / 26, this.length), v = 67108863 ^ 67108863 >>> A << A, w = p;
      if (m -= E, m = Math.max(0, m), w) {
        for (var h = 0; h < E; h++)
          w.words[h] = this.words[h];
        w.length = E;
      }
      if (E !== 0) if (this.length > E)
        for (this.length -= E, h = 0; h < this.length; h++)
          this.words[h] = this.words[h + E];
      else
        this.words[0] = 0, this.length = 1;
      var b = 0;
      for (h = this.length - 1; h >= 0 && (b !== 0 || h >= m); h--) {
        var q = this.words[h] | 0;
        this.words[h] = b << 26 - A | q >>> A, b = q & v;
      }
      return w && b !== 0 && (w.words[w.length++] = b), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var _ = d % 26, p = (d - _) / 26, m = 1 << _;
      if (this.length <= p) return !1;
      var A = this.words[p];
      return !!(A & m);
    }, i.prototype.imaskn = function(d) {
      n(typeof d == "number" && d >= 0);
      var _ = d % 26, p = (d - _) / 26;
      if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
        return this;
      if (_ !== 0 && p++, this.length = Math.min(p, this.length), _ !== 0) {
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
    }, i.prototype._ishlnsubmul = function(d, _, p) {
      var m = d.length + p, A;
      this._expand(m);
      var E, v = 0;
      for (A = 0; A < d.length; A++) {
        E = (this.words[A + p] | 0) + v;
        var w = (d.words[A] | 0) * _;
        E -= w & 67108863, v = (E >> 26) - (w / 67108864 | 0), this.words[A + p] = E & 67108863;
      }
      for (; A < this.length - p; A++)
        E = (this.words[A + p] | 0) + v, v = E >> 26, this.words[A + p] = E & 67108863;
      if (v === 0) return this._strip();
      for (n(v === -1), v = 0, A = 0; A < this.length; A++)
        E = -(this.words[A] | 0) + v, v = E >> 26, this.words[A] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(d, _) {
      var p = this.length - d.length, m = this.clone(), A = d, E = A.words[A.length - 1] | 0, v = this._countBits(E);
      p = 26 - v, p !== 0 && (A = A.ushln(p), m.iushln(p), E = A.words[A.length - 1] | 0);
      var w = m.length - A.length, h;
      if (_ !== "mod") {
        h = new i(null), h.length = w + 1, h.words = new Array(h.length);
        for (var b = 0; b < h.length; b++)
          h.words[b] = 0;
      }
      var q = m.clone()._ishlnsubmul(A, 1, w);
      q.negative === 0 && (m = q, h && (h.words[w] = 1));
      for (var W = w - 1; W >= 0; W--) {
        var et = (m.words[A.length + W] | 0) * 67108864 + (m.words[A.length + W - 1] | 0);
        for (et = Math.min(et / E | 0, 67108863), m._ishlnsubmul(A, et, W); m.negative !== 0; )
          et--, m.negative = 0, m._ishlnsubmul(A, 1, W), m.isZero() || (m.negative ^= 1);
        h && (h.words[W] = et);
      }
      return h && h._strip(), m._strip(), _ !== "div" && p !== 0 && m.iushrn(p), {
        div: h || null,
        mod: m
      };
    }, i.prototype.divmod = function(d, _, p) {
      if (n(!d.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var m, A, E;
      return this.negative !== 0 && d.negative === 0 ? (E = this.neg().divmod(d, _), _ !== "mod" && (m = E.div.neg()), _ !== "div" && (A = E.mod.neg(), p && A.negative !== 0 && A.iadd(d)), {
        div: m,
        mod: A
      }) : this.negative === 0 && d.negative !== 0 ? (E = this.divmod(d.neg(), _), _ !== "mod" && (m = E.div.neg()), {
        div: m,
        mod: E.mod
      }) : this.negative & d.negative ? (E = this.neg().divmod(d.neg(), _), _ !== "div" && (A = E.mod.neg(), p && A.negative !== 0 && A.isub(d)), {
        div: E.div,
        mod: A
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
      var p = _.div.negative !== 0 ? _.mod.isub(d) : _.mod, m = d.ushrn(1), A = d.andln(1), E = p.cmp(m);
      return E < 0 || A === 1 && E === 0 ? _.div : _.div.negative !== 0 ? _.div.isubn(1) : _.div.iaddn(1);
    }, i.prototype.modrn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var p = (1 << 26) % d, m = 0, A = this.length - 1; A >= 0; A--)
        m = (p * m + (this.words[A] | 0)) % d;
      return _ ? -m : m;
    }, i.prototype.modn = function(d) {
      return this.modrn(d);
    }, i.prototype.idivn = function(d) {
      var _ = d < 0;
      _ && (d = -d), n(d <= 67108863);
      for (var p = 0, m = this.length - 1; m >= 0; m--) {
        var A = (this.words[m] | 0) + p * 67108864;
        this.words[m] = A / d | 0, p = A % d;
      }
      return this._strip(), _ ? this.ineg() : this;
    }, i.prototype.divn = function(d) {
      return this.clone().idivn(d);
    }, i.prototype.egcd = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, p = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var m = new i(1), A = new i(0), E = new i(0), v = new i(1), w = 0; _.isEven() && p.isEven(); )
        _.iushrn(1), p.iushrn(1), ++w;
      for (var h = p.clone(), b = _.clone(); !_.isZero(); ) {
        for (var q = 0, W = 1; !(_.words[0] & W) && q < 26; ++q, W <<= 1) ;
        if (q > 0)
          for (_.iushrn(q); q-- > 0; )
            (m.isOdd() || A.isOdd()) && (m.iadd(h), A.isub(b)), m.iushrn(1), A.iushrn(1);
        for (var et = 0, nt = 1; !(p.words[0] & nt) && et < 26; ++et, nt <<= 1) ;
        if (et > 0)
          for (p.iushrn(et); et-- > 0; )
            (E.isOdd() || v.isOdd()) && (E.iadd(h), v.isub(b)), E.iushrn(1), v.iushrn(1);
        _.cmp(p) >= 0 ? (_.isub(p), m.isub(E), A.isub(v)) : (p.isub(_), E.isub(m), v.isub(A));
      }
      return {
        a: E,
        b: v,
        gcd: p.iushln(w)
      };
    }, i.prototype._invmp = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, p = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var m = new i(1), A = new i(0), E = p.clone(); _.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
        for (var v = 0, w = 1; !(_.words[0] & w) && v < 26; ++v, w <<= 1) ;
        if (v > 0)
          for (_.iushrn(v); v-- > 0; )
            m.isOdd() && m.iadd(E), m.iushrn(1);
        for (var h = 0, b = 1; !(p.words[0] & b) && h < 26; ++h, b <<= 1) ;
        if (h > 0)
          for (p.iushrn(h); h-- > 0; )
            A.isOdd() && A.iadd(E), A.iushrn(1);
        _.cmp(p) >= 0 ? (_.isub(p), m.isub(A)) : (p.isub(_), A.isub(m));
      }
      var q;
      return _.cmpn(1) === 0 ? q = m : q = A, q.cmpn(0) < 0 && q.iadd(d), q;
    }, i.prototype.gcd = function(d) {
      if (this.isZero()) return d.abs();
      if (d.isZero()) return this.abs();
      var _ = this.clone(), p = d.clone();
      _.negative = 0, p.negative = 0;
      for (var m = 0; _.isEven() && p.isEven(); m++)
        _.iushrn(1), p.iushrn(1);
      do {
        for (; _.isEven(); )
          _.iushrn(1);
        for (; p.isEven(); )
          p.iushrn(1);
        var A = _.cmp(p);
        if (A < 0) {
          var E = _;
          _ = p, p = E;
        } else if (A === 0 || p.cmpn(1) === 0)
          break;
        _.isub(p);
      } while (!0);
      return p.iushln(m);
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
      var _ = d % 26, p = (d - _) / 26, m = 1 << _;
      if (this.length <= p)
        return this._expand(p + 1), this.words[p] |= m, this;
      for (var A = m, E = p; A !== 0 && E < this.length; E++) {
        var v = this.words[E] | 0;
        v += A, A = v >>> 26, v &= 67108863, this.words[E] = v;
      }
      return A !== 0 && (this.words[E] = A, this.length++), this;
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
        var m = this.words[0] | 0;
        p = m === d ? 0 : m < d ? -1 : 1;
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
        var m = this.words[p] | 0, A = d.words[p] | 0;
        if (m !== A) {
          m < A ? _ = -1 : m > A && (_ = 1);
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
      return new Z(d);
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
    var M = {
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
      var _ = d, p;
      do
        this.split(_, this.tmp), _ = this.imulK(_), _ = _.iadd(this.tmp), p = _.bitLength();
      while (p > this.n);
      var m = p < this.n ? -1 : _.ucmp(this.p);
      return m === 0 ? (_.words[0] = 0, _.length = 1) : m > 0 ? _.isub(this.p) : _.strip !== void 0 ? _.strip() : _._strip(), _;
    }, L.prototype.split = function(d, _) {
      d.iushrn(this.n, 0, _);
    }, L.prototype.imulK = function(d) {
      return d.imul(this.k);
    };
    function G() {
      L.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(G, L), G.prototype.split = function(d, _) {
      for (var p = 4194303, m = Math.min(d.length, 9), A = 0; A < m; A++)
        _.words[A] = d.words[A];
      if (_.length = m, d.length <= 9) {
        d.words[0] = 0, d.length = 1;
        return;
      }
      var E = d.words[9];
      for (_.words[_.length++] = E & p, A = 10; A < d.length; A++) {
        var v = d.words[A] | 0;
        d.words[A - 10] = (v & p) << 4 | E >>> 22, E = v;
      }
      E >>>= 22, d.words[A - 10] = E, E === 0 && d.length > 10 ? d.length -= 10 : d.length -= 9;
    }, G.prototype.imulK = function(d) {
      d.words[d.length] = 0, d.words[d.length + 1] = 0, d.length += 2;
      for (var _ = 0, p = 0; p < d.length; p++) {
        var m = d.words[p] | 0;
        _ += m * 977, d.words[p] = _ & 67108863, _ = m * 64 + (_ / 67108864 | 0);
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
    function J() {
      L.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(J, L), J.prototype.imulK = function(d) {
      for (var _ = 0, p = 0; p < d.length; p++) {
        var m = (d.words[p] | 0) * 19 + _, A = m & 67108863;
        m >>>= 26, d.words[p] = A, _ = m;
      }
      return _ !== 0 && (d.words[d.length++] = _), d;
    }, i._prime = function(d) {
      if (M[d]) return M[d];
      var _;
      if (d === "k256")
        _ = new G();
      else if (d === "p224")
        _ = new U();
      else if (d === "p192")
        _ = new k();
      else if (d === "p25519")
        _ = new J();
      else
        throw new Error("Unknown prime " + d);
      return M[d] = _, _;
    };
    function Z(B) {
      if (typeof B == "string") {
        var d = i._prime(B);
        this.m = d.p, this.prime = d;
      } else
        n(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    Z.prototype._verify1 = function(d) {
      n(d.negative === 0, "red works only with positives"), n(d.red, "red works only with red numbers");
    }, Z.prototype._verify2 = function(d, _) {
      n((d.negative | _.negative) === 0, "red works only with positives"), n(
        d.red && d.red === _.red,
        "red works only with red numbers"
      );
    }, Z.prototype.imod = function(d) {
      return this.prime ? this.prime.ireduce(d)._forceRed(this) : (g(d, d.umod(this.m)._forceRed(this)), d);
    }, Z.prototype.neg = function(d) {
      return d.isZero() ? d.clone() : this.m.sub(d)._forceRed(this);
    }, Z.prototype.add = function(d, _) {
      this._verify2(d, _);
      var p = d.add(_);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
    }, Z.prototype.iadd = function(d, _) {
      this._verify2(d, _);
      var p = d.iadd(_);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p;
    }, Z.prototype.sub = function(d, _) {
      this._verify2(d, _);
      var p = d.sub(_);
      return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
    }, Z.prototype.isub = function(d, _) {
      this._verify2(d, _);
      var p = d.isub(_);
      return p.cmpn(0) < 0 && p.iadd(this.m), p;
    }, Z.prototype.shl = function(d, _) {
      return this._verify1(d), this.imod(d.ushln(_));
    }, Z.prototype.imul = function(d, _) {
      return this._verify2(d, _), this.imod(d.imul(_));
    }, Z.prototype.mul = function(d, _) {
      return this._verify2(d, _), this.imod(d.mul(_));
    }, Z.prototype.isqr = function(d) {
      return this.imul(d, d.clone());
    }, Z.prototype.sqr = function(d) {
      return this.mul(d, d);
    }, Z.prototype.sqrt = function(d) {
      if (d.isZero()) return d.clone();
      var _ = this.m.andln(3);
      if (n(_ % 2 === 1), _ === 3) {
        var p = this.m.add(new i(1)).iushrn(2);
        return this.pow(d, p);
      }
      for (var m = this.m.subn(1), A = 0; !m.isZero() && m.andln(1) === 0; )
        A++, m.iushrn(1);
      n(!m.isZero());
      var E = new i(1).toRed(this), v = E.redNeg(), w = this.m.subn(1).iushrn(1), h = this.m.bitLength();
      for (h = new i(2 * h * h).toRed(this); this.pow(h, w).cmp(v) !== 0; )
        h.redIAdd(v);
      for (var b = this.pow(h, m), q = this.pow(d, m.addn(1).iushrn(1)), W = this.pow(d, m), et = A; W.cmp(E) !== 0; ) {
        for (var nt = W, st = 0; nt.cmp(E) !== 0; st++)
          nt = nt.redSqr();
        n(st < et);
        var ot = this.pow(b, new i(1).iushln(et - st - 1));
        q = q.redMul(ot), b = ot.redSqr(), W = W.redMul(b), et = st;
      }
      return q;
    }, Z.prototype.invm = function(d) {
      var _ = d._invmp(this.m);
      return _.negative !== 0 ? (_.negative = 0, this.imod(_).redNeg()) : this.imod(_);
    }, Z.prototype.pow = function(d, _) {
      if (_.isZero()) return new i(1).toRed(this);
      if (_.cmpn(1) === 0) return d.clone();
      var p = 4, m = new Array(1 << p);
      m[0] = new i(1).toRed(this), m[1] = d;
      for (var A = 2; A < m.length; A++)
        m[A] = this.mul(m[A - 1], d);
      var E = m[0], v = 0, w = 0, h = _.bitLength() % 26;
      for (h === 0 && (h = 26), A = _.length - 1; A >= 0; A--) {
        for (var b = _.words[A], q = h - 1; q >= 0; q--) {
          var W = b >> q & 1;
          if (E !== m[0] && (E = this.sqr(E)), W === 0 && v === 0) {
            w = 0;
            continue;
          }
          v <<= 1, v |= W, w++, !(w !== p && (A !== 0 || q !== 0)) && (E = this.mul(E, m[v]), w = 0, v = 0);
        }
        h = 26;
      }
      return E;
    }, Z.prototype.convertTo = function(d) {
      var _ = d.umod(this.m);
      return _ === d ? _.clone() : _;
    }, Z.prototype.convertFrom = function(d) {
      var _ = d.clone();
      return _.red = null, _;
    }, i.mont = function(d) {
      return new tt(d);
    };
    function tt(B) {
      Z.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(tt, Z), tt.prototype.convertTo = function(d) {
      return this.imod(d.ushln(this.shift));
    }, tt.prototype.convertFrom = function(d) {
      var _ = this.imod(d.mul(this.rinv));
      return _.red = null, _;
    }, tt.prototype.imul = function(d, _) {
      if (d.isZero() || _.isZero())
        return d.words[0] = 0, d.length = 1, d;
      var p = d.imul(_), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), A = p.isub(m).iushrn(this.shift), E = A;
      return A.cmp(this.m) >= 0 ? E = A.isub(this.m) : A.cmpn(0) < 0 && (E = A.iadd(this.m)), E._forceRed(this);
    }, tt.prototype.mul = function(d, _) {
      if (d.isZero() || _.isZero()) return new i(0)._forceRed(this);
      var p = d.mul(_), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), A = p.isub(m).iushrn(this.shift), E = A;
      return A.cmp(this.m) >= 0 ? E = A.isub(this.m) : A.cmpn(0) < 0 && (E = A.iadd(this.m)), E._forceRed(this);
    }, tt.prototype.invm = function(d) {
      var _ = this.imod(d._invmp(this.m).mul(this.r2));
      return _._forceRed(this);
    };
  })(e, St);
})(Aa);
var lf = Aa.exports;
const Es = /* @__PURE__ */ df(lf);
var s_ = 9, i_ = 3, No = 9;
function ff(e, t) {
  const { precision: r = s_, minPrecision: n = i_ } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let u = i.slice(0, r);
  if (n < r) {
    const g = u.match(/.*[1-9]{1}/), I = (g == null ? void 0 : g[0].length) || 0, C = Math.max(n, I);
    u = u.slice(0, C);
  }
  const f = u ? `.${u}` : "";
  return `${a}${f}`;
}
var Gt = class extends Es {
  constructor(t, r, n) {
    let s = t, i = r;
    Gt.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = r || "hex");
    super(s ?? 0, i, n);
    O(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      units: r = No,
      precision: n = s_,
      minPrecision: s = i_
    } = t || {}, i = this.formatUnits(r), o = ff(i, { precision: n, minPrecision: s });
    if (!parseFloat(o)) {
      const [, a = "0"] = i.split("."), u = a.match(/[1-9]/);
      if (u && u.index && u.index + 1 > n) {
        const [f = "0"] = o.split(".");
        return `${f}.${a.slice(0, u.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = No) {
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
    return new Gt(super.sqr().toArray());
  }
  neg() {
    return new Gt(super.neg().toArray());
  }
  abs() {
    return new Gt(super.abs().toArray());
  }
  toTwos(t) {
    return new Gt(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Gt(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, r) {
    const n = super[r](new Gt(t));
    return Gt.isBN(n) ? new Gt(n.toArray()) : n;
  }
  clone() {
    return new Gt(this.toArray());
  }
  mulTo(t, r) {
    const n = new Es(this.toArray()).mulTo(t, r);
    return new Gt(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new Es(this.toArray()).egcd(t);
    return {
      a: new Gt(r.toArray()),
      b: new Gt(n.toArray()),
      gcd: new Gt(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new Es(this.toArray()).divmod(new Gt(t), r, n);
    return {
      div: new Gt(s == null ? void 0 : s.toArray()),
      mod: new Gt(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Gt(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Gt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, R = (e, t, r) => new Gt(e, t, r);
R.parseUnits = (e, t = No) => {
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
function Rr(e) {
  return R(e).toNumber();
}
function ga(e, t) {
  return R(e).toHex(t);
}
function pr(e, t) {
  return R(e).toBytes(t);
}
function CC(e, t) {
  return R(e).formatUnits(t);
}
function BC(e, t) {
  return R(e).format(t);
}
function xC(...e) {
  return e.reduce((t, r) => R(r).gt(t) ? R(r) : t, R(0));
}
function RC(...e) {
  return R(Math.ceil(e.reduce((t, r) => R(t).mul(r), R(1)).toNumber()));
}
var Ee = Uint8Array, ke = Uint16Array, wa = Int32Array, gi = new Ee([
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
]), wi = new Ee([
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
]), To = new Ee([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), o_ = function(e, t) {
  for (var r = new ke(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new wa(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, a_ = o_(gi, 2), c_ = a_.b, Do = a_.r;
c_[28] = 258, Do[258] = 28;
var d_ = o_(wi, 0), pf = d_.b, Bc = d_.r, Qo = new ke(32768);
for (var kt = 0; kt < 32768; ++kt) {
  var mr = (kt & 43690) >> 1 | (kt & 21845) << 1;
  mr = (mr & 52428) >> 2 | (mr & 13107) << 2, mr = (mr & 61680) >> 4 | (mr & 3855) << 4, Qo[kt] = ((mr & 65280) >> 8 | (mr & 255) << 8) >> 1;
}
var rr = function(e, t, r) {
  for (var n = e.length, s = 0, i = new ke(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var o = new ke(t);
  for (s = 1; s < t; ++s)
    o[s] = o[s - 1] + i[s - 1] << 1;
  var a;
  if (r) {
    a = new ke(1 << t);
    var u = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var f = s << 4 | e[s], g = t - e[s], I = o[e[s] - 1]++ << g, C = I | (1 << g) - 1; I <= C; ++I)
          a[Qo[I] >> u] = f;
  } else
    for (a = new ke(n), s = 0; s < n; ++s)
      e[s] && (a[s] = Qo[o[e[s] - 1]++] >> 15 - e[s]);
  return a;
}, Or = new Ee(288);
for (var kt = 0; kt < 144; ++kt)
  Or[kt] = 8;
for (var kt = 144; kt < 256; ++kt)
  Or[kt] = 9;
for (var kt = 256; kt < 280; ++kt)
  Or[kt] = 7;
for (var kt = 280; kt < 288; ++kt)
  Or[kt] = 8;
var jn = new Ee(32);
for (var kt = 0; kt < 32; ++kt)
  jn[kt] = 5;
var Af = /* @__PURE__ */ rr(Or, 9, 0), gf = /* @__PURE__ */ rr(Or, 9, 1), wf = /* @__PURE__ */ rr(jn, 5, 0), mf = /* @__PURE__ */ rr(jn, 5, 1), eo = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, Xe = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, ro = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, ma = function(e) {
  return (e + 7) / 8 | 0;
}, u_ = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new Ee(e.subarray(t, r));
}, yf = [
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
], We = function(e, t, r) {
  var n = new Error(t || yf[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, We), !r)
    throw n;
  return n;
}, bf = function(e, t, r, n) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return r || new Ee(0);
  var o = !r, a = o || t.i != 2, u = t.i;
  o && (r = new Ee(s * 3));
  var f = function(ht) {
    var dt = r.length;
    if (ht > dt) {
      var Dt = new Ee(Math.max(dt * 2, ht));
      Dt.set(r), r = Dt;
    }
  }, g = t.f || 0, I = t.p || 0, C = t.b || 0, S = t.l, Q = t.d, N = t.m, T = t.n, F = s * 8;
  do {
    if (!S) {
      g = Xe(e, I, 1);
      var Y = Xe(e, I + 1, 3);
      if (I += 3, Y)
        if (Y == 1)
          S = gf, Q = mf, N = 9, T = 5;
        else if (Y == 2) {
          var L = Xe(e, I, 31) + 257, G = Xe(e, I + 10, 15) + 4, U = L + Xe(e, I + 5, 31) + 1;
          I += 14;
          for (var k = new Ee(U), J = new Ee(19), Z = 0; Z < G; ++Z)
            J[To[Z]] = Xe(e, I + Z * 3, 7);
          I += G * 3;
          for (var tt = eo(J), B = (1 << tt) - 1, d = rr(J, tt, 1), Z = 0; Z < U; ) {
            var _ = d[Xe(e, I, B)];
            I += _ & 15;
            var z = _ >> 4;
            if (z < 16)
              k[Z++] = z;
            else {
              var p = 0, m = 0;
              for (z == 16 ? (m = 3 + Xe(e, I, 3), I += 2, p = k[Z - 1]) : z == 17 ? (m = 3 + Xe(e, I, 7), I += 3) : z == 18 && (m = 11 + Xe(e, I, 127), I += 7); m--; )
                k[Z++] = p;
            }
          }
          var A = k.subarray(0, L), E = k.subarray(L);
          N = eo(A), T = eo(E), S = rr(A, N, 1), Q = rr(E, T, 1);
        } else
          We(1);
      else {
        var z = ma(I) + 4, H = e[z - 4] | e[z - 3] << 8, M = z + H;
        if (M > s) {
          u && We(0);
          break;
        }
        a && f(C + H), r.set(e.subarray(z, M), C), t.b = C += H, t.p = I = M * 8, t.f = g;
        continue;
      }
      if (I > F) {
        u && We(0);
        break;
      }
    }
    a && f(C + 131072);
    for (var v = (1 << N) - 1, w = (1 << T) - 1, h = I; ; h = I) {
      var p = S[ro(e, I) & v], b = p >> 4;
      if (I += p & 15, I > F) {
        u && We(0);
        break;
      }
      if (p || We(2), b < 256)
        r[C++] = b;
      else if (b == 256) {
        h = I, S = null;
        break;
      } else {
        var q = b - 254;
        if (b > 264) {
          var Z = b - 257, W = gi[Z];
          q = Xe(e, I, (1 << W) - 1) + c_[Z], I += W;
        }
        var et = Q[ro(e, I) & w], nt = et >> 4;
        et || We(3), I += et & 15;
        var E = pf[nt];
        if (nt > 3) {
          var W = wi[nt];
          E += ro(e, I) & (1 << W) - 1, I += W;
        }
        if (I > F) {
          u && We(0);
          break;
        }
        a && f(C + 131072);
        var st = C + q;
        if (C < E) {
          var ot = i - E, Ot = Math.min(E, st);
          for (ot + C < 0 && We(3); C < Ot; ++C)
            r[C] = n[ot + C];
        }
        for (; C < st; ++C)
          r[C] = r[C - E];
      }
    }
    t.l = S, t.p = h, t.b = C, t.f = g, S && (g = 1, t.m = N, t.d = Q, t.n = T);
  } while (!g);
  return C != r.length && o ? u_(r, 0, C) : r.subarray(0, C);
}, ar = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Mn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, no = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: h_, l: 0 };
  if (s == 1) {
    var o = new Ee(r[0].s + 1);
    return o[r[0].s] = 1, { t: o, l: 1 };
  }
  r.sort(function(M, L) {
    return M.f - L.f;
  }), r.push({ s: -1, f: 25001 });
  var a = r[0], u = r[1], f = 0, g = 1, I = 2;
  for (r[0] = { s: -1, f: a.f + u.f, l: a, r: u }; g != s - 1; )
    a = r[r[f].f < r[I].f ? f++ : I++], u = r[f != g && r[f].f < r[I].f ? f++ : I++], r[g++] = { s: -1, f: a.f + u.f, l: a, r: u };
  for (var C = i[0].s, n = 1; n < s; ++n)
    i[n].s > C && (C = i[n].s);
  var S = new ke(C + 1), Q = Fo(r[g - 1], S, 0);
  if (Q > t) {
    var n = 0, N = 0, T = Q - t, F = 1 << T;
    for (i.sort(function(L, G) {
      return S[G.s] - S[L.s] || L.f - G.f;
    }); n < s; ++n) {
      var Y = i[n].s;
      if (S[Y] > t)
        N += F - (1 << Q - S[Y]), S[Y] = t;
      else
        break;
    }
    for (N >>= T; N > 0; ) {
      var z = i[n].s;
      S[z] < t ? N -= 1 << t - S[z]++ - 1 : ++n;
    }
    for (; n >= 0 && N; --n) {
      var H = i[n].s;
      S[H] == t && (--S[H], ++N);
    }
    Q = t;
  }
  return { t: new Ee(S), l: Q };
}, Fo = function(e, t, r) {
  return e.s == -1 ? Math.max(Fo(e.l, t, r + 1), Fo(e.r, t, r + 1)) : t[e.s] = r;
}, xc = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new ke(++t), n = 0, s = e[0], i = 1, o = function(u) {
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
}, Ln = function(e, t) {
  for (var r = 0, n = 0; n < t.length; ++n)
    r += e[n] * t[n];
  return r;
}, __ = function(e, t, r) {
  var n = r.length, s = ma(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, Rc = function(e, t, r, n, s, i, o, a, u, f, g) {
  ar(t, g++, r), ++s[256];
  for (var I = no(s, 15), C = I.t, S = I.l, Q = no(i, 15), N = Q.t, T = Q.l, F = xc(C), Y = F.c, z = F.n, H = xc(N), M = H.c, L = H.n, G = new ke(19), U = 0; U < Y.length; ++U)
    ++G[Y[U] & 31];
  for (var U = 0; U < M.length; ++U)
    ++G[M[U] & 31];
  for (var k = no(G, 7), J = k.t, Z = k.l, tt = 19; tt > 4 && !J[To[tt - 1]]; --tt)
    ;
  var B = f + 5 << 3, d = Ln(s, Or) + Ln(i, jn) + o, _ = Ln(s, C) + Ln(i, N) + o + 14 + 3 * tt + Ln(G, J) + 2 * G[16] + 3 * G[17] + 7 * G[18];
  if (u >= 0 && B <= d && B <= _)
    return __(t, g, e.subarray(u, u + f));
  var p, m, A, E;
  if (ar(t, g, 1 + (_ < d)), g += 2, _ < d) {
    p = rr(C, S, 0), m = C, A = rr(N, T, 0), E = N;
    var v = rr(J, Z, 0);
    ar(t, g, z - 257), ar(t, g + 5, L - 1), ar(t, g + 10, tt - 4), g += 14;
    for (var U = 0; U < tt; ++U)
      ar(t, g + 3 * U, J[To[U]]);
    g += 3 * tt;
    for (var w = [Y, M], h = 0; h < 2; ++h)
      for (var b = w[h], U = 0; U < b.length; ++U) {
        var q = b[U] & 31;
        ar(t, g, v[q]), g += J[q], q > 15 && (ar(t, g, b[U] >> 5 & 127), g += b[U] >> 12);
      }
  } else
    p = Af, m = Or, A = wf, E = jn;
  for (var U = 0; U < a; ++U) {
    var W = n[U];
    if (W > 255) {
      var q = W >> 18 & 31;
      Mn(t, g, p[q + 257]), g += m[q + 257], q > 7 && (ar(t, g, W >> 23 & 31), g += gi[q]);
      var et = W & 31;
      Mn(t, g, A[et]), g += E[et], et > 3 && (Mn(t, g, W >> 5 & 8191), g += wi[et]);
    } else
      Mn(t, g, p[W]), g += m[W];
  }
  return Mn(t, g, p[256]), g + m[256];
}, If = /* @__PURE__ */ new wa([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), h_ = /* @__PURE__ */ new Ee(0), Ef = function(e, t, r, n, s, i) {
  var o = i.z || e.length, a = new Ee(n + o + 5 * (1 + Math.ceil(o / 7e3)) + s), u = a.subarray(n, a.length - s), f = i.l, g = (i.r || 0) & 7;
  if (t) {
    g && (u[0] = i.r >> 3);
    for (var I = If[t - 1], C = I >> 13, S = I & 8191, Q = (1 << r) - 1, N = i.p || new ke(32768), T = i.h || new ke(Q + 1), F = Math.ceil(r / 3), Y = 2 * F, z = function(At) {
      return (e[At] ^ e[At + 1] << F ^ e[At + 2] << Y) & Q;
    }, H = new wa(25e3), M = new ke(288), L = new ke(32), G = 0, U = 0, k = i.i || 0, J = 0, Z = i.w || 0, tt = 0; k + 2 < o; ++k) {
      var B = z(k), d = k & 32767, _ = T[B];
      if (N[d] = _, T[B] = d, Z <= k) {
        var p = o - k;
        if ((G > 7e3 || J > 24576) && (p > 423 || !f)) {
          g = Rc(e, u, 0, H, M, L, U, J, tt, k - tt, g), J = G = U = 0, tt = k;
          for (var m = 0; m < 286; ++m)
            M[m] = 0;
          for (var m = 0; m < 30; ++m)
            L[m] = 0;
        }
        var A = 2, E = 0, v = S, w = d - _ & 32767;
        if (p > 2 && B == z(k - w))
          for (var h = Math.min(C, p) - 1, b = Math.min(32767, k), q = Math.min(258, p); w <= b && --v && d != _; ) {
            if (e[k + A] == e[k + A - w]) {
              for (var W = 0; W < q && e[k + W] == e[k + W - w]; ++W)
                ;
              if (W > A) {
                if (A = W, E = w, W > h)
                  break;
                for (var et = Math.min(w, W - 2), nt = 0, m = 0; m < et; ++m) {
                  var st = k - w + m & 32767, ot = N[st], Ot = st - ot & 32767;
                  Ot > nt && (nt = Ot, _ = st);
                }
              }
            }
            d = _, _ = N[d], w += d - _ & 32767;
          }
        if (E) {
          H[J++] = 268435456 | Do[A] << 18 | Bc[E];
          var ht = Do[A] & 31, dt = Bc[E] & 31;
          U += gi[ht] + wi[dt], ++M[257 + ht], ++L[dt], Z = k + A, ++G;
        } else
          H[J++] = e[k], ++M[e[k]];
      }
    }
    for (k = Math.max(k, Z); k < o; ++k)
      H[J++] = e[k], ++M[e[k]];
    g = Rc(e, u, f, H, M, L, U, J, tt, k - tt, g), f || (i.r = g & 7 | u[g / 8 | 0] << 3, g -= 7, i.h = T, i.p = N, i.i = k, i.w = Z);
  } else {
    for (var k = i.w || 0; k < o + f; k += 65535) {
      var Dt = k + 65535;
      Dt >= o && (u[g / 8 | 0] = f, Dt = o), g = __(u, g + 1, e.subarray(k, Dt));
    }
    i.i = o;
  }
  return u_(a, 0, n + ma(g) + s);
}, vf = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), Cf = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = vf[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, Bf = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), o = new Ee(i.length + e.length);
    o.set(i), o.set(e, i.length), e = o, s.w = i.length;
  }
  return Ef(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, Oo = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, xf = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Oo(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, Rf = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && We(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, Sf = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, Nf = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function Tf(e, t) {
  t || (t = {});
  var r = Cf(), n = e.length;
  r.p(e);
  var s = Bf(e, t, Nf(t), 8), i = s.length;
  return xf(s, t), Oo(s, i - 8, r.d()), Oo(s, i - 4, n), s;
}
function Df(e, t) {
  var r = Rf(e);
  return r + 8 > e.length && We(6, "invalid gzip data"), bf(e.subarray(r, -8), { i: 2 }, new Ee(Sf(e)), t);
}
var Qf = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Ff = 0;
try {
  Qf.decode(h_, { stream: !0 }), Ff = 1;
} catch {
}
var Of = Object.defineProperty, Mf = (e, t, r) => t in e ? Of(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Lf = (e, t, r) => (Mf(e, t + "", r), r), SC = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, l_ = (e, t) => {
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
}, mi = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), r = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(r);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, ct = (e) => {
  const t = e.map((r) => $(r));
  return mi(t);
}, Sc = "0123456789abcdef";
function K(e) {
  const t = $(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += Sc[(s & 240) >> 4] + Sc[s & 15];
  }
  return r;
}
var NC = (e) => {
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
}, kf = 37, f_ = BigInt(2 ** 62) + BigInt(kf), Pf = (e) => Math.floor(e / 1e3), p_ = (e) => e * 1e3, Uf = (e) => Number(BigInt(e) - f_), Gf = (e) => String(BigInt(e) + f_), zf = (e) => p_(Uf(e)), Ts = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Ts(zf(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Ts(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Ts(p_(e));
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
    return Gf(this.toUnixSeconds());
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
    return Pf(this.getTime());
  }
}, ya = Ts;
Lf(ya, "TAI64_NULL", "");
function Vf(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Yf = {
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
}, Hf = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Xf = {
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
}, TC = {
  chainConfig: Yf,
  metadata: Hf,
  stateConfig: Xf
}, DC = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Mr(e) {
  return e !== void 0;
}
var A_ = R(0), Mo = R(58), zs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", vs = null;
function Zf(e) {
  if (vs == null) {
    vs = {};
    for (let r = 0; r < zs.length; r++)
      vs[zs[r]] = R(r);
  }
  const t = vs[e];
  if (t == null)
    throw new x(D.INVALID_DATA, `invalid base58 value ${e}`);
  return R(t);
}
function g_(e) {
  const t = $(e);
  let r = R(t), n = "";
  for (; r.gt(A_); )
    n = zs[Number(r.mod(Mo))] + n, r = r.div(Mo);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = zs[0] + n;
  return n;
}
function Wf(e) {
  let t = A_;
  for (let r = 0; r < e.length; r++)
    t = t.mul(Mo), t = t.add(Zf(e[r].toString()));
  return t;
}
function ba(e, t, r) {
  const n = $(e);
  if (r != null && r > n.length)
    throw new x(D.INVALID_DATA, "cannot slice beyond data bounds");
  return K(n.slice(t ?? 0, r ?? n.length));
}
function bn(e, t = !0) {
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
function Ur(e, t, r, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${r}`), t;
}
function jf(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function qf(e) {
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
      (s & 192) === 128 ? n += Ur("UNEXPECTED_CONTINUE", n - 1, t) : n += Ur("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Ur("OVERRUN", n - 1, t);
      continue;
    }
    let a = s & (1 << 8 - i - 1) - 1;
    for (let u = 0; u < i; u++) {
      const f = t[n];
      if ((f & 192) !== 128) {
        n += Ur("MISSING_CONTINUE", n, t), a = null;
        break;
      }
      a = a << 6 | f & 63, n++;
    }
    if (a !== null) {
      if (a > 1114111) {
        n += Ur("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (a >= 55296 && a <= 57343) {
        n += Ur("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (a <= o) {
        n += Ur("OVERLONG", n - 1 - i, t);
        continue;
      }
      r.push(a);
    }
  }
  return r;
}
function Ia(e) {
  return jf(qf(e));
}
var QC = (e) => {
  if (!e)
    return "";
  const t = $(e), r = Tf(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(r)
  );
  return btoa(n);
}, FC = (e) => {
  const t = atob(e), r = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return Df(r);
};
function Jf(e) {
  throw new Error("Didn't expect to get here");
}
function Le(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function $f(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function as(e, ...t) {
  if (!$f(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function w_(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Le(e.outputLen), Le(e.blockLen);
}
function In(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function m_(e, t) {
  as(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
const sn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ds = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Qs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ke = (e, t) => e << 32 - t | e >>> t, Et = (e, t) => e << t | e >>> 32 - t >>> 0, Vs = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, Kf = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
function Ys(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = Kf(e[t]);
}
function tp(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function En(e) {
  return typeof e == "string" && (e = tp(e)), as(e), e;
}
function ep(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    as(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
class Ea {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const rp = {}.toString;
function y_(e, t) {
  if (t !== void 0 && rp.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function yi(e) {
  const t = (n) => e().update(En(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function np(e = 32) {
  if (sn && typeof sn.getRandomValues == "function")
    return sn.getRandomValues(new Uint8Array(e));
  if (sn && typeof sn.randomBytes == "function")
    return sn.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function sp(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(r >> s & i), a = Number(r & i), u = n ? 4 : 0, f = n ? 0 : 4;
  e.setUint32(t + u, o, n), e.setUint32(t + f, a, n);
}
const ip = (e, t, r) => e & t ^ ~e & r, op = (e, t, r) => e & t ^ e & r ^ t & r;
class va extends Ea {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Qs(this.buffer);
  }
  update(t) {
    In(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = En(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const u = Qs(t);
        for (; s <= i - o; o += s)
          this.process(u, o);
        continue;
      }
      n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    In(this), m_(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(n, 0), o = 0);
    for (let I = o; I < s; I++)
      r[I] = 0;
    sp(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const a = Qs(t), u = this.outputLen;
    if (u % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = u / 4, g = this.get();
    if (f > g.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let I = 0; I < f; I++)
      a.setUint32(4 * I, g[I], i);
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
const ap = /* @__PURE__ */ new Uint32Array([
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
]), yr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), br = /* @__PURE__ */ new Uint32Array(64);
class cp extends va {
  constructor() {
    super(64, 32, 8, !1), this.A = yr[0] | 0, this.B = yr[1] | 0, this.C = yr[2] | 0, this.D = yr[3] | 0, this.E = yr[4] | 0, this.F = yr[5] | 0, this.G = yr[6] | 0, this.H = yr[7] | 0;
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
    for (let I = 0; I < 16; I++, r += 4)
      br[I] = t.getUint32(r, !1);
    for (let I = 16; I < 64; I++) {
      const C = br[I - 15], S = br[I - 2], Q = Ke(C, 7) ^ Ke(C, 18) ^ C >>> 3, N = Ke(S, 17) ^ Ke(S, 19) ^ S >>> 10;
      br[I] = N + br[I - 7] + Q + br[I - 16] | 0;
    }
    let { A: n, B: s, C: i, D: o, E: a, F: u, G: f, H: g } = this;
    for (let I = 0; I < 64; I++) {
      const C = Ke(a, 6) ^ Ke(a, 11) ^ Ke(a, 25), S = g + C + ip(a, u, f) + ap[I] + br[I] | 0, N = (Ke(n, 2) ^ Ke(n, 13) ^ Ke(n, 22)) + op(n, s, i) | 0;
      g = f, f = u, u = a, a = o + S | 0, o = i, i = s, s = n, n = S + N | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, u = u + this.F | 0, f = f + this.G | 0, g = g + this.H | 0, this.set(n, s, i, o, a, u, f, g);
  }
  roundClean() {
    br.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const rn = /* @__PURE__ */ yi(() => new cp());
class b_ extends Ea {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, w_(t);
    const n = En(r);
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
    return In(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    In(this), as(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const bi = (e, t, r) => new b_(e, t).update(r).digest();
bi.create = (e, t) => new b_(e, t);
function dp(e, t, r, n) {
  w_(e);
  const s = y_({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: o, asyncTick: a } = s;
  if (Le(i), Le(o), Le(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const u = En(t), f = En(r), g = new Uint8Array(o), I = bi.create(e, u), C = I._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: a, DK: g, PRF: I, PRFSalt: C };
}
function up(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function Ca(e, t, r, n) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: u } = dp(e, t, r, n);
  let f;
  const g = new Uint8Array(4), I = Qs(g), C = new Uint8Array(a.outputLen);
  for (let S = 1, Q = 0; Q < i; S++, Q += a.outputLen) {
    const N = o.subarray(Q, Q + a.outputLen);
    I.setInt32(0, S, !1), (f = u._cloneInto(f)).update(g).digestInto(C), N.set(C.subarray(0, N.length));
    for (let T = 1; T < s; T++) {
      a._cloneInto(f).update(C).digestInto(C);
      for (let F = 0; F < N.length; F++)
        N[F] ^= C[F];
    }
  }
  return up(a, u, o, f, C);
}
function Nc(e, t, r, n, s, i) {
  let o = e[t++] ^ r[n++], a = e[t++] ^ r[n++], u = e[t++] ^ r[n++], f = e[t++] ^ r[n++], g = e[t++] ^ r[n++], I = e[t++] ^ r[n++], C = e[t++] ^ r[n++], S = e[t++] ^ r[n++], Q = e[t++] ^ r[n++], N = e[t++] ^ r[n++], T = e[t++] ^ r[n++], F = e[t++] ^ r[n++], Y = e[t++] ^ r[n++], z = e[t++] ^ r[n++], H = e[t++] ^ r[n++], M = e[t++] ^ r[n++], L = o, G = a, U = u, k = f, J = g, Z = I, tt = C, B = S, d = Q, _ = N, p = T, m = F, A = Y, E = z, v = H, w = M;
  for (let h = 0; h < 8; h += 2)
    J ^= Et(L + A | 0, 7), d ^= Et(J + L | 0, 9), A ^= Et(d + J | 0, 13), L ^= Et(A + d | 0, 18), _ ^= Et(Z + G | 0, 7), E ^= Et(_ + Z | 0, 9), G ^= Et(E + _ | 0, 13), Z ^= Et(G + E | 0, 18), v ^= Et(p + tt | 0, 7), U ^= Et(v + p | 0, 9), tt ^= Et(U + v | 0, 13), p ^= Et(tt + U | 0, 18), k ^= Et(w + m | 0, 7), B ^= Et(k + w | 0, 9), m ^= Et(B + k | 0, 13), w ^= Et(m + B | 0, 18), G ^= Et(L + k | 0, 7), U ^= Et(G + L | 0, 9), k ^= Et(U + G | 0, 13), L ^= Et(k + U | 0, 18), tt ^= Et(Z + J | 0, 7), B ^= Et(tt + Z | 0, 9), J ^= Et(B + tt | 0, 13), Z ^= Et(J + B | 0, 18), m ^= Et(p + _ | 0, 7), d ^= Et(m + p | 0, 9), _ ^= Et(d + m | 0, 13), p ^= Et(_ + d | 0, 18), A ^= Et(w + v | 0, 7), E ^= Et(A + w | 0, 9), v ^= Et(E + A | 0, 13), w ^= Et(v + E | 0, 18);
  s[i++] = o + L | 0, s[i++] = a + G | 0, s[i++] = u + U | 0, s[i++] = f + k | 0, s[i++] = g + J | 0, s[i++] = I + Z | 0, s[i++] = C + tt | 0, s[i++] = S + B | 0, s[i++] = Q + d | 0, s[i++] = N + _ | 0, s[i++] = T + p | 0, s[i++] = F + m | 0, s[i++] = Y + A | 0, s[i++] = z + E | 0, s[i++] = H + v | 0, s[i++] = M + w | 0;
}
function so(e, t, r, n, s) {
  let i = n + 0, o = n + 16 * s;
  for (let a = 0; a < 16; a++)
    r[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    Nc(r, o, e, t, r, i), a > 0 && (o += 16), Nc(r, i, e, t += 16, r, o);
}
function _p(e, t, r) {
  const n = y_({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: o, dkLen: a, asyncTick: u, maxmem: f, onProgress: g } = n;
  if (Le(s), Le(i), Le(o), Le(a), Le(u), Le(f), g !== void 0 && typeof g != "function")
    throw new Error("progressCb should be function");
  const I = 128 * i, C = I / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / I)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const S = I * (s + o);
  if (S > f)
    throw new Error(`Scrypt: parameters too large, ${S} (128 * r * (N + p)) > ${f} (maxmem)`);
  const Q = Ca(rn, e, t, { c: 1, dkLen: I * o }), N = Ds(Q), T = Ds(new Uint8Array(I * s)), F = Ds(new Uint8Array(I));
  let Y = () => {
  };
  if (g) {
    const z = 2 * s * o, H = Math.max(Math.floor(z / 1e4), 1);
    let M = 0;
    Y = () => {
      M++, g && (!(M % H) || M === z) && g(M / z);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: C, V: T, B32: N, B: Q, tmp: F, blockMixCb: Y, asyncTick: u };
}
function hp(e, t, r, n, s) {
  const i = Ca(rn, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function lp(e, t, r) {
  const { N: n, r: s, p: i, dkLen: o, blockSize32: a, V: u, B32: f, B: g, tmp: I, blockMixCb: C } = _p(e, t, r);
  Vs || Ys(f);
  for (let S = 0; S < i; S++) {
    const Q = a * S;
    for (let N = 0; N < a; N++)
      u[N] = f[Q + N];
    for (let N = 0, T = 0; N < n - 1; N++)
      so(u, T, u, T += a, s), C();
    so(u, (n - 1) * a, f, Q, s), C();
    for (let N = 0; N < n; N++) {
      const T = f[Q + a - 16] % n;
      for (let F = 0; F < a; F++)
        I[F] = f[Q + F] ^ u[T * a + F];
      so(I, 0, f, Q, s), C();
    }
  }
  return Vs || Ys(f), hp(e, o, g, u, I);
}
const Cs = /* @__PURE__ */ BigInt(2 ** 32 - 1), Lo = /* @__PURE__ */ BigInt(32);
function I_(e, t = !1) {
  return t ? { h: Number(e & Cs), l: Number(e >> Lo & Cs) } : { h: Number(e >> Lo & Cs) | 0, l: Number(e & Cs) | 0 };
}
function E_(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = I_(e[s], t);
    [r[s], n[s]] = [i, o];
  }
  return [r, n];
}
const fp = (e, t) => BigInt(e >>> 0) << Lo | BigInt(t >>> 0), pp = (e, t, r) => e >>> r, Ap = (e, t, r) => e << 32 - r | t >>> r, gp = (e, t, r) => e >>> r | t << 32 - r, wp = (e, t, r) => e << 32 - r | t >>> r, mp = (e, t, r) => e << 64 - r | t >>> r - 32, yp = (e, t, r) => e >>> r - 32 | t << 64 - r, bp = (e, t) => t, Ip = (e, t) => e, v_ = (e, t, r) => e << r | t >>> 32 - r, C_ = (e, t, r) => t << r | e >>> 32 - r, B_ = (e, t, r) => t << r - 32 | e >>> 64 - r, x_ = (e, t, r) => e << r - 32 | t >>> 64 - r;
function Ep(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const vp = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), Cp = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, Bp = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), xp = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, Rp = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), Sp = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, mt = {
  fromBig: I_,
  split: E_,
  toBig: fp,
  shrSH: pp,
  shrSL: Ap,
  rotrSH: gp,
  rotrSL: wp,
  rotrBH: mp,
  rotrBL: yp,
  rotr32H: bp,
  rotr32L: Ip,
  rotlSH: v_,
  rotlSL: C_,
  rotlBH: B_,
  rotlBL: x_,
  add: Ep,
  add3L: vp,
  add3H: Cp,
  add4L: Bp,
  add4H: xp,
  add5H: Sp,
  add5L: Rp
}, R_ = [], S_ = [], N_ = [], Np = /* @__PURE__ */ BigInt(0), kn = /* @__PURE__ */ BigInt(1), Tp = /* @__PURE__ */ BigInt(2), Dp = /* @__PURE__ */ BigInt(7), Qp = /* @__PURE__ */ BigInt(256), Fp = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = kn, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], R_.push(2 * (5 * n + r)), S_.push((e + 1) * (e + 2) / 2 % 64);
  let s = Np;
  for (let i = 0; i < 7; i++)
    t = (t << kn ^ (t >> Dp) * Fp) % Qp, t & Tp && (s ^= kn << (kn << /* @__PURE__ */ BigInt(i)) - kn);
  N_.push(s);
}
const [Op, Mp] = /* @__PURE__ */ E_(N_, !0), Tc = (e, t, r) => r > 32 ? B_(e, t, r) : v_(e, t, r), Dc = (e, t, r) => r > 32 ? x_(e, t, r) : C_(e, t, r);
function Lp(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let o = 0; o < 10; o++)
      r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, u = (o + 2) % 10, f = r[u], g = r[u + 1], I = Tc(f, g, 1) ^ r[a], C = Dc(f, g, 1) ^ r[a + 1];
      for (let S = 0; S < 50; S += 10)
        e[o + S] ^= I, e[o + S + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = S_[o], u = Tc(s, i, a), f = Dc(s, i, a), g = R_[o];
      s = e[g], i = e[g + 1], e[g] = u, e[g + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        r[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    e[0] ^= Op[n], e[1] ^= Mp[n];
  }
  r.fill(0);
}
class Ba extends Ea {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Le(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ds(this.state);
  }
  keccak() {
    Vs || Ys(this.state32), Lp(this.state32, this.rounds), Vs || Ys(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    In(this);
    const { blockLen: r, state: n } = this;
    t = En(t);
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
    In(this, !1), as(t), this.finish();
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
    return Le(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (m_(t, this), this.finished)
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
    return t || (t = new Ba(r, n, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const kp = (e, t, r) => yi(() => new Ba(t, e, r)), Pp = /* @__PURE__ */ kp(1, 136, 256 / 8), Up = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), T_ = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((e, t) => t)), Gp = /* @__PURE__ */ T_.map((e) => (9 * e + 5) % 16);
let xa = [T_], Ra = [Gp];
for (let e = 0; e < 4; e++)
  for (let t of [xa, Ra])
    t.push(t[e].map((r) => Up[r]));
const D_ = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), zp = /* @__PURE__ */ xa.map((e, t) => e.map((r) => D_[t][r])), Vp = /* @__PURE__ */ Ra.map((e, t) => e.map((r) => D_[t][r])), Yp = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Hp = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function Qc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const Bs = /* @__PURE__ */ new Uint32Array(16);
class Xp extends va {
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
      Bs[S] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, o = i, a = this.h2 | 0, u = a, f = this.h3 | 0, g = f, I = this.h4 | 0, C = I;
    for (let S = 0; S < 5; S++) {
      const Q = 4 - S, N = Yp[S], T = Hp[S], F = xa[S], Y = Ra[S], z = zp[S], H = Vp[S];
      for (let M = 0; M < 16; M++) {
        const L = Et(n + Qc(S, i, a, f) + Bs[F[M]] + N, z[M]) + I | 0;
        n = I, I = f, f = Et(a, 10) | 0, a = i, i = L;
      }
      for (let M = 0; M < 16; M++) {
        const L = Et(s + Qc(Q, o, u, g) + Bs[Y[M]] + T, H[M]) + C | 0;
        s = C, C = g, g = Et(u, 10) | 0, u = o, o = L;
      }
    }
    this.set(this.h1 + a + g | 0, this.h2 + f + C | 0, this.h3 + I + s | 0, this.h4 + n + o | 0, this.h0 + i + u | 0);
  }
  roundClean() {
    Bs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Zp = /* @__PURE__ */ yi(() => new Xp()), [Wp, jp] = mt.split([
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
].map((e) => BigInt(e))), Ir = /* @__PURE__ */ new Uint32Array(80), Er = /* @__PURE__ */ new Uint32Array(80);
class qp extends va {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: o, Dh: a, Dl: u, Eh: f, El: g, Fh: I, Fl: C, Gh: S, Gl: Q, Hh: N, Hl: T } = this;
    return [t, r, n, s, i, o, a, u, f, g, I, C, S, Q, N, T];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, u, f, g, I, C, S, Q, N, T) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = u | 0, this.Eh = f | 0, this.El = g | 0, this.Fh = I | 0, this.Fl = C | 0, this.Gh = S | 0, this.Gl = Q | 0, this.Hh = N | 0, this.Hl = T | 0;
  }
  process(t, r) {
    for (let z = 0; z < 16; z++, r += 4)
      Ir[z] = t.getUint32(r), Er[z] = t.getUint32(r += 4);
    for (let z = 16; z < 80; z++) {
      const H = Ir[z - 15] | 0, M = Er[z - 15] | 0, L = mt.rotrSH(H, M, 1) ^ mt.rotrSH(H, M, 8) ^ mt.shrSH(H, M, 7), G = mt.rotrSL(H, M, 1) ^ mt.rotrSL(H, M, 8) ^ mt.shrSL(H, M, 7), U = Ir[z - 2] | 0, k = Er[z - 2] | 0, J = mt.rotrSH(U, k, 19) ^ mt.rotrBH(U, k, 61) ^ mt.shrSH(U, k, 6), Z = mt.rotrSL(U, k, 19) ^ mt.rotrBL(U, k, 61) ^ mt.shrSL(U, k, 6), tt = mt.add4L(G, Z, Er[z - 7], Er[z - 16]), B = mt.add4H(tt, L, J, Ir[z - 7], Ir[z - 16]);
      Ir[z] = B | 0, Er[z] = tt | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: o, Ch: a, Cl: u, Dh: f, Dl: g, Eh: I, El: C, Fh: S, Fl: Q, Gh: N, Gl: T, Hh: F, Hl: Y } = this;
    for (let z = 0; z < 80; z++) {
      const H = mt.rotrSH(I, C, 14) ^ mt.rotrSH(I, C, 18) ^ mt.rotrBH(I, C, 41), M = mt.rotrSL(I, C, 14) ^ mt.rotrSL(I, C, 18) ^ mt.rotrBL(I, C, 41), L = I & S ^ ~I & N, G = C & Q ^ ~C & T, U = mt.add5L(Y, M, G, jp[z], Er[z]), k = mt.add5H(U, F, H, L, Wp[z], Ir[z]), J = U | 0, Z = mt.rotrSH(n, s, 28) ^ mt.rotrBH(n, s, 34) ^ mt.rotrBH(n, s, 39), tt = mt.rotrSL(n, s, 28) ^ mt.rotrBL(n, s, 34) ^ mt.rotrBL(n, s, 39), B = n & i ^ n & a ^ i & a, d = s & o ^ s & u ^ o & u;
      F = N | 0, Y = T | 0, N = S | 0, T = Q | 0, S = I | 0, Q = C | 0, { h: I, l: C } = mt.add(f | 0, g | 0, k | 0, J | 0), f = a | 0, g = u | 0, a = i | 0, u = o | 0, i = n | 0, o = s | 0;
      const _ = mt.add3L(J, tt, d);
      n = mt.add3H(_, k, Z, B), s = _ | 0;
    }
    ({ h: n, l: s } = mt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: o } = mt.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: u } = mt.add(this.Ch | 0, this.Cl | 0, a | 0, u | 0), { h: f, l: g } = mt.add(this.Dh | 0, this.Dl | 0, f | 0, g | 0), { h: I, l: C } = mt.add(this.Eh | 0, this.El | 0, I | 0, C | 0), { h: S, l: Q } = mt.add(this.Fh | 0, this.Fl | 0, S | 0, Q | 0), { h: N, l: T } = mt.add(this.Gh | 0, this.Gl | 0, N | 0, T | 0), { h: F, l: Y } = mt.add(this.Hh | 0, this.Hl | 0, F | 0, Y | 0), this.set(n, s, i, o, a, u, f, g, I, C, S, Q, N, T, F, Y);
  }
  roundClean() {
    Ir.fill(0), Er.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Q_ = /* @__PURE__ */ yi(() => new qp());
var Jp = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: o } = e;
  return lp(t, r, { N: n, r: i, p: s, dkLen: o });
}, $p = (e) => Pp(e);
function Kp(e) {
  const t = $(e, "data");
  return Zp(t);
}
var pn = (e, t = "base64") => {
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
}, F_ = (e, t, r, n, s) => {
  const i = { sha256: rn, sha512: Q_ }[s];
  return K(Ca(i, e, t, { c: r, dkLen: n }));
}, { crypto: cs, btoa: O_ } = globalThis;
if (!cs)
  throw new x(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!O_)
  throw new x(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var ko = (e) => cs.getRandomValues(new Uint8Array(e)), Fs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return O_(r);
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
}, M_ = "AES-CTR", Sa = (e, t) => {
  const r = pn(String(e).normalize("NFKC"), "utf-8"), n = F_(r, t, 1e5, 32, "sha256");
  return $(n);
}, tA = async (e, t) => {
  const r = ko(16), n = ko(32), s = Sa(e, n), i = JSON.stringify(t), o = pn(i, "utf-8"), a = {
    name: M_,
    counter: r,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), f = await crypto.subtle.encrypt(a, u, o);
  return {
    data: Fs(new Uint8Array(f)),
    iv: Fs(r),
    salt: Fs(n)
  };
}, eA = async (e, t) => {
  const r = pn(t.iv), n = pn(t.salt), s = Sa(e, n), i = pn(t.data), o = {
    name: M_,
    counter: r,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), u = await crypto.subtle.decrypt(o, a, i), f = new TextDecoder().decode(u);
  try {
    return JSON.parse(f);
  } catch {
    throw new x(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, rA = async (e, t, r) => {
  const n = cs.subtle, s = new Uint8Array(t.subarray(0, 16)), i = r, o = e, a = await n.importKey(
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
}, nA = async (e, t, r) => {
  const n = cs.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(r).buffer, o = new Uint8Array(e).buffer, a = await n.importKey(
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
}, sA = (e, t, r) => {
  const n = e === "sha256" ? rn : Q_, s = bi.create(n, t).update(r).digest();
  return K(s);
}, iA = () => cs.randomUUID(), oA = {
  bufferFromString: pn,
  stringFromBuffer: Fs,
  decrypt: eA,
  encrypt: tA,
  keyFromPassword: Sa,
  randomBytes: ko,
  scrypt: Jp,
  keccak256: $p,
  decryptJsonWalletData: nA,
  encryptJsonWalletData: rA,
  computeHmac: sA,
  pbkdf2: F_,
  ripemd160: Kp,
  randomUUID: iA
}, aA = oA, {
  bufferFromString: Qr,
  decrypt: cA,
  encrypt: dA,
  keyFromPassword: OC,
  randomBytes: Ve,
  stringFromBuffer: zn,
  scrypt: L_,
  keccak256: k_,
  decryptJsonWalletData: uA,
  encryptJsonWalletData: _A,
  pbkdf2: hA,
  computeHmac: P_,
  ripemd160: lA,
  randomUUID: fA
} = aA;
function Be(e) {
  return K(rn($(e)));
}
function Ye(e) {
  return Be(e);
}
function pA(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function AA(e) {
  return Ye(Qr(e, "utf-8"));
}
var gA = Object.defineProperty, wA = (e, t, r) => t in e ? gA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Na = (e, t, r) => (wA(e, t + "", r), r), _t = class {
  constructor(e, t, r) {
    O(this, "name");
    O(this, "type");
    O(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, mA = "u8", yA = "u16", bA = "u32", IA = "u64", EA = "u256", vA = "raw untyped ptr", CA = "raw untyped slice", BA = "bool", xA = "b256", RA = "struct std::b512::B512", Hs = "enum std::option::Option", SA = "struct std::vec::Vec", NA = "struct std::bytes::Bytes", TA = "struct std::string::String", DA = "str", ds = "()", U_ = /^enum (std::option::)?Option$/m, G_ = /^str\[(?<length>[0-9]+)\]/, Po = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, z_ = /^struct.+/, V_ = /^enum.+$/, QA = /^\((?<items>.*)\)$/, FA = /^generic.+$/, OA = /([^\s]+)$/m, Xs = "1", gt = 8, gr = 32, Zs = gr + 2, Ws = gr, MA = gr, LA = gr, kA = gt * 4, PA = gt * 2, Y_ = 2 ** 32 - 1, H_ = ({ maxInputs: e }) => gr + // Tx ID
Ws + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Ws + gt) + gt, X_ = gt + // Identifier
gt + // Gas limit
gt + // Script size
gt + // Script data size
gt + // Policies
gt + // Inputs size
gt + // Outputs size
gt + // Witnesses size
gr, MC = gt + // Identifier
kA + // Utxo Length
gt + // Output Index
LA + // Owner
gt + // Amount
Ws + // Asset id
PA + // TxPointer
gt + // Witnesses index
gt + // Predicate size
gt + // Predicate data size
gt, Fc = (e) => e instanceof Uint8Array, Nn = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const r of t)
    if (r.type === Hs || "coder" in r && r.coder.type === Hs || "coders" in r && Nn(r.coders))
      return !0;
  return !1;
}, ns, q0, bt = (q0 = class extends _t {
  constructor(t, r) {
    super("array", `[${t.type}; ${r}]`, r * t.encodedLength);
    O(this, "coder");
    O(this, "length");
    He(this, ns);
    this.coder = t, this.length = r, $e(this, ns, Nn([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(D.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new x(D.ENCODE_ERROR, "Types/values length mismatch.");
    return ct(Array.from(t).map((r) => this.coder.encode(r)));
  }
  decode(t, r) {
    if (!Vt(this, ns) && t.length < this.encodedLength || t.length > Y_)
      throw new x(D.DECODE_ERROR, "Invalid array data size.");
    let n = r;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, n] = this.coder.decode(t, n), i;
    }), n];
  }
}, ns = new WeakMap(), q0), j = class extends _t {
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
    return [ga(r, 32), t + 32];
  }
}, UA = class extends _t {
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
    return [ga(r, this.encodedLength), t + this.encodedLength];
  }
}, GA = {
  u64: gt,
  u256: gt * 4
}, P = class extends _t {
  constructor(e) {
    super("bigNumber", e, GA[e]);
  }
  encode(e) {
    let t;
    try {
      t = pr(e, this.encodedLength);
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
}, zA = class extends _t {
  constructor(t = {
    padToWordSize: !1
  }) {
    const r = t.padToWordSize ? gt : 1;
    super("boolean", "boolean", r);
    O(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new x(D.ENCODE_ERROR, "Invalid boolean value.");
    return pr(t ? 1 : 0, this.encodedLength);
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
}, Z_ = class extends _t {
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
Na(Z_, "memorySize", 1);
var jr, ss, mn, kr, j_, q_, J_, J0, W_ = (J0 = class extends _t {
  constructor(t, r) {
    const n = new P("u64"), s = Object.values(r).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    He(this, kr);
    O(this, "name");
    O(this, "coders");
    He(this, jr);
    He(this, ss);
    He(this, mn);
    this.name = t, this.coders = r, $e(this, jr, n), $e(this, ss, s), $e(this, mn, !(U_.test(this.type) || Nn(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return Is(this, kr, q_).call(this, t);
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
    return new Uint8Array([...Vt(this, jr).encode(i), ...o]);
  }
  decode(t, r) {
    if (Vt(this, mn) && t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid enum data size.");
    const n = new P("u64").decode(t, r)[0], s = Rr(n), i = Object.keys(this.coders)[s];
    if (!i)
      throw new x(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], a = r + Vt(this, jr).encodedLength;
    if (Vt(this, mn) && t.length < a + o.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid enum data size.");
    const [u, f] = o.decode(t, a);
    return Is(this, kr, j_).call(this, this.coders[i]) ? Is(this, kr, J_).call(this, i, f) : [{ [i]: u }, f];
  }
}, jr = new WeakMap(), ss = new WeakMap(), mn = new WeakMap(), kr = new WeakSet(), // Checks that we're handling a native enum that is of type void.
j_ = function(t) {
  return this.type !== Hs && t.type === ds;
}, q_ = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Vt(this, ss) - r.encodedLength);
  return ct([Vt(this, jr).encode(s), i, n]);
}, J_ = function(t, r) {
  return [t, r];
}, J0), VA = (e) => {
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
    const n = r.padToWordSize ? gt : VA(t);
    super("number", t, n);
    O(this, "baseType");
    O(this, "options");
    this.baseType = t, this.options = r;
  }
  encode(t) {
    let r;
    try {
      r = pr(t);
    } catch {
      throw new x(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (r.length > this.encodedLength)
      throw new x(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return pr(r, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid number data size.");
    const n = t.slice(r, r + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid number byte data size.");
    return [Rr(n), r + this.encodedLength];
  }
}, $_ = class extends W_ {
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
}, YA = class extends _t {
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
}, Ta = class extends _t {
  constructor() {
    super("struct", "struct String", gt);
  }
  encode(e) {
    const t = bn(e), r = new P("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid std string data size.");
    const r = t + gt, n = e.slice(t, r), s = R(new P("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new x(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [Ia(i), r + s];
  }
};
Na(Ta, "memorySize", 1);
var K_ = class extends _t {
  constructor() {
    super("strSlice", "str", gt);
  }
  encode(e) {
    const t = bn(e), r = new P("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid string slice data size.");
    const r = t + gt, n = e.slice(t, r), s = R(new P("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new x(D.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Ia(i), r + s];
  }
};
Na(K_, "memorySize", 1);
var HA = class extends _t {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new x(D.ENCODE_ERROR, "Value length mismatch during encode.");
    return bn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(t, t + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid string byte data size.");
    return [Ia(r), t + this.encodedLength];
  }
}, is, $0, Ii = ($0 = class extends _t {
  constructor(t, r) {
    const n = Object.values(r).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, n);
    O(this, "name");
    O(this, "coders");
    He(this, is);
    this.name = t, this.coders = r, $e(this, is, Nn(r));
  }
  encode(t) {
    return mi(
      Object.keys(this.coders).map((r) => {
        const n = this.coders[r], s = t[r];
        if (!(n instanceof $_) && s == null)
          throw new x(
            D.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${r}" not present.`
          );
        return n.encode(s);
      })
    );
  }
  decode(t, r) {
    if (!Vt(this, is) && t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid struct data size.");
    let n = r;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let u;
      return [u, n] = a.decode(t, n), i[o] = u, i;
    }, {}), n];
  }
}, is = new WeakMap(), $0), os, K0, th = (K0 = class extends _t {
  constructor(t) {
    const r = t.reduce((n, s) => n + s.encodedLength, 0);
    super("tuple", `(${t.map((n) => n.type).join(", ")})`, r);
    O(this, "coders");
    He(this, os);
    this.coders = t, $e(this, os, Nn(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(D.ENCODE_ERROR, "Types/values length mismatch.");
    return mi(this.coders.map((r, n) => r.encode(t[n])));
  }
  decode(t, r) {
    if (!Vt(this, os) && t.length < this.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid tuple data size.");
    let n = r;
    return [this.coders.map((i) => {
      let o;
      return [o, n] = i.decode(t, n), o;
    }), n];
  }
}, os = new WeakMap(), K0), yn, t_, XA = (t_ = class extends _t {
  constructor(t) {
    super("struct", "struct Vec", gt);
    O(this, "coder");
    He(this, yn);
    this.coder = t, $e(this, yn, Nn([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !Fc(t))
      throw new x(
        D.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const r = new P("u64");
    if (Fc(t))
      return new Uint8Array([...r.encode(t.length), ...t]);
    const n = t.map((i) => this.coder.encode(i)), s = r.encode(t.length);
    return new Uint8Array([...s, ...mi(n)]);
  }
  decode(t, r) {
    if (!Vt(this, yn) && t.length < this.encodedLength || t.length > Y_)
      throw new x(D.DECODE_ERROR, "Invalid vec data size.");
    const n = r + gt, s = t.slice(r, n), i = R(new P("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, a = t.slice(n, n + o);
    if (!Vt(this, yn) && a.length !== o)
      throw new x(D.DECODE_ERROR, "Invalid vec byte data size.");
    let u = n;
    const f = [];
    for (let g = 0; g < i; g++) {
      const [I, C] = this.coder.decode(t, u);
      f.push(I), u = C;
    }
    return [f, u];
  }
}, yn = new WeakMap(), t_), eh = (e) => {
  switch (e) {
    case void 0:
    case Xs:
      return Xs;
    default:
      throw new x(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Zn = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new x(
      D.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, ZA = (e, t) => t.filter((r) => Zn(e, r.type).type !== ds), WA = (e) => {
  var n;
  const t = e.find((s) => s.name === "buf"), r = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !r)
    throw new x(
      D.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return r;
}, Sr = class {
  constructor(e, t) {
    O(this, "abi");
    O(this, "name");
    O(this, "type");
    O(this, "originalTypeArguments");
    O(this, "components");
    this.abi = e, this.name = t.name;
    const r = Zn(e, t.type);
    if (r.type.length > 256)
      throw new x(
        D.INVALID_COMPONENT,
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
      return r.map((o) => new Sr(e, o));
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
    ).map((o) => new Sr(e, o));
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
      const s = Zn(e, n.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Zn(e, s.type);
      if (FA.test(i.type)) {
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
    return z_.test(this.type) ? "s" : Po.test(this.type) ? "a" : V_.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = G_.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Po.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new Sr(this.abi, o).getSignature()).join(",")}>` : "", n = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, jA = class extends _t {
  constructor() {
    super("void", ds, 0);
  }
  encode(e) {
    return new Uint8Array([]);
  }
  decode(e, t) {
    return [void 0, t];
  }
};
function Oc(e, t) {
  const { getCoder: r } = t;
  return e.reduce((n, s) => {
    const i = n;
    return i[s.name] = r(s, t), i;
  }, {});
}
var cn = (e, t) => {
  var f, g, I, C;
  switch (e.type) {
    case mA:
    case yA:
    case bA:
      return new rt(e.type);
    case IA:
    case vA:
      return new P("u64");
    case EA:
      return new P("u256");
    case CA:
      return new YA();
    case BA:
      return new zA();
    case xA:
      return new j();
    case RA:
      return new UA();
    case NA:
      return new Z_();
    case TA:
      return new Ta();
    case DA:
      return new K_();
    case ds:
      return new jA();
  }
  const r = (f = G_.exec(e.type)) == null ? void 0 : f.groups;
  if (r) {
    const S = parseInt(r.length, 10);
    return new HA(S);
  }
  const n = e.components, s = (g = Po.exec(e.type)) == null ? void 0 : g.groups;
  if (s) {
    const S = parseInt(s.length, 10), Q = n[0];
    if (!Q)
      throw new x(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const N = cn(Q);
    return new bt(N, S);
  }
  if (e.type === SA) {
    const S = WA(n), Q = new Sr(e.abi, S), N = cn(Q);
    return new XA(N);
  }
  const i = (I = e.type.match(OA)) == null ? void 0 : I[0];
  if (z_.test(e.type) && i) {
    const S = Oc(n, { getCoder: cn });
    return new Ii(i, S);
  }
  if (V_.test(e.type) && i) {
    const S = Oc(n, { getCoder: cn });
    return e.type === Hs ? new $_(i, S) : new W_(i, S);
  }
  if ((C = QA.exec(e.type)) == null ? void 0 : C.groups) {
    const S = n.map((Q) => cn(Q));
    return new th(S);
  }
  throw new x(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function qA(e = Xs) {
  switch (e) {
    case Xs:
      return cn;
    default:
      throw new x(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Xr = class {
  static getCoder(e, t, r = {
    padToWordSize: !1
  }) {
    const n = new Sr(e, t);
    return qA(r.encoding)(n, r);
  }
  static encode(e, t, r, n) {
    return this.getCoder(e, t, n).encode(r);
  }
  static decode(e, t, r, n, s) {
    return this.getCoder(e, t, s).decode(r, n);
  }
}, JA = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const o = Zn(t, i.type);
    return n = n || o.type !== ds && !U_.test(o.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, $A = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, Uo = class {
  constructor(e, t) {
    O(this, "signature");
    O(this, "selector");
    O(this, "selectorBytes");
    O(this, "encoding");
    O(this, "name");
    O(this, "jsonFn");
    O(this, "attributes");
    O(this, "jsonAbiOld");
    O(this, "jsonFnOld");
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = Uo.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = Uo.getFunctionSelector(this.signature), this.selectorBytes = new Ta().encode(this.name), this.encoding = eh(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const r = t.inputs.map(
      (n) => new Sr(e, n).getSignature()
    );
    return `${t.name}(${r.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Be(Qr(e, "utf-8"));
    return R(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    const r = JA({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new x(
        D.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Xr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = $A(e, this.jsonFn.inputs);
    return new th(n).encode(s);
  }
  decodeArguments(e) {
    const t = $(e), r = ZA(this.jsonAbiOld, this.jsonFnOld.inputs);
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
        const o = Xr.getCoder(this.jsonAbiOld, i, { encoding: this.encoding }), [a, u] = o.decode(t, s.offset);
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
    return Xr.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
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
}, KA = (e, t) => e.find((r) => r.concreteTypeId === t), Da = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function Qa(e, t, r) {
  const n = Da(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = KA(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: Fa(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function rh(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = Da(e, s);
    return {
      name: "",
      type: isNaN(s) ? Qa(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: rh(e, t, i)
    };
  })) ?? null;
}
function un(e, t, r, n) {
  const s = Qa(e, t, r), i = Da(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: rh(e, t, i)
  };
}
function Fa(e, t, r) {
  return (r == null ? void 0 : r.map((n) => {
    const { typeId: s, name: i, typeArguments: o } = n, a = isNaN(s) ? Qa(e, t, s) : s;
    return {
      name: i,
      type: a,
      // originalTypeId: typeId,
      typeArguments: Fa(e, t, o)
    };
  })) ?? null;
}
function tg(e) {
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
    o.components = Fa(e, t, o.components);
  });
  const r = e.functions.map((o) => {
    const a = o.inputs.map(
      ({ concreteTypeId: f, name: g }) => un(e, t, f, g)
    ), u = un(e, t, o.output, "");
    return { ...o, inputs: a, output: u };
  }), n = e.configurables.map((o) => ({
    name: o.name,
    configurableType: un(e, t, o.concreteTypeId),
    offset: o.offset
  })), s = e.loggedTypes.map((o) => ({
    logId: o.logId,
    loggedType: un(e, t, o.concreteTypeId)
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
    O(this, "functions");
    O(this, "configurables");
    O(this, "jsonAbi");
    O(this, "encoding");
    O(this, "jsonAbiOld");
    this.jsonAbi = e, this.encoding = eh(e.encodingVersion), this.jsonAbiOld = tg(e), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new Uo(this.jsonAbiOld, t)])
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
    return Xr.decode(this.jsonAbiOld, r.loggedType, $(e), 0, {
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
    return Xr.encode(this.jsonAbiOld, r.configurableType, t, {
      encoding: this.encoding
    });
  }
  encodeType(e, t) {
    const r = un(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Xr.encode(this.jsonAbiOld, r, t, {
      encoding: this.encoding
    });
  }
  decodeType(e, t) {
    const r = un(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Xr.decode(this.jsonAbiOld, r, t, 0, { encoding: this.encoding });
  }
}, LC = class {
}, eg = class {
}, nh = class {
}, sh = class {
}, rg = class extends sh {
}, ng = class extends sh {
}, qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
var vn = qn.bech32m = qn.bech32 = void 0;
const js = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", ih = {};
for (let e = 0; e < js.length; e++) {
  const t = js.charAt(e);
  ih[t] = e;
}
function An(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Mc(e) {
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
function Oa(e, t, r, n) {
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
function sg(e) {
  return Oa(e, 8, 5, !0);
}
function ig(e) {
  const t = Oa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function og(e) {
  const t = Oa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function oh(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function r(o, a, u) {
    if (u = u || 90, o.length + 7 + a.length > u)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let f = Mc(o);
    if (typeof f == "string")
      throw new Error(f);
    let g = o + "1";
    for (let I = 0; I < a.length; ++I) {
      const C = a[I];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      f = An(f) ^ C, g += js.charAt(C);
    }
    for (let I = 0; I < 6; ++I)
      f = An(f);
    f ^= t;
    for (let I = 0; I < 6; ++I) {
      const C = f >> (5 - I) * 5 & 31;
      g += js.charAt(C);
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
    const I = o.slice(0, g), C = o.slice(g + 1);
    if (C.length < 6)
      return "Data too short";
    let S = Mc(I);
    if (typeof S == "string")
      return S;
    const Q = [];
    for (let N = 0; N < C.length; ++N) {
      const T = C.charAt(N), F = ih[T];
      if (F === void 0)
        return "Unknown character " + T;
      S = An(S) ^ F, !(N + 6 >= C.length) && Q.push(F);
    }
    return S !== t ? "Invalid checksum for " + o : { prefix: I, words: Q };
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
    toWords: sg,
    fromWordsUnsafe: ig,
    fromWords: og
  };
}
qn.bech32 = oh("bech32");
vn = qn.bech32m = oh("bech32m");
var qs = "fuel";
function Ma(e) {
  return vn.decode(e);
}
function Os(e) {
  return vn.encode(
    qs,
    vn.toWords($(K(e)))
  );
}
function Ms(e) {
  return typeof e == "string" && e.indexOf(qs + 1) === 0 && Ma(e).prefix === qs;
}
function Go(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Lc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function zo(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function La(e) {
  return new Uint8Array(vn.fromWords(Ma(e).words));
}
function kc(e) {
  if (!Ms(e))
    throw new x(
      x.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return K(La(e));
}
function ag(e) {
  const { words: t } = Ma(e);
  return vn.encode(qs, t);
}
var Vn = (e) => e instanceof nh ? e.address : e instanceof rg ? e.id : e, cg = () => K(Ve(32)), dg = (e) => {
  let t;
  try {
    if (!Go(e))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = La(Os(e)), t = K(t.fill(0, 0, 12));
  } catch {
    throw new x(
      x.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, ug = (e) => {
  if (!zo(e))
    throw new x(x.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ft = class extends eg {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    O(this, "bech32Address");
    if (this.bech32Address = ag(t), !Ms(this.bech32Address))
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
    return kc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return La(this.bech32Address);
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
    const t = kc(this.bech32Address);
    return {
      bits: dg(t)
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
    if (!Lc(t))
      throw new x(x.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const r = K(rn($(t)));
    return new ft(Os(r));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Go(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ft(Os(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(cg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Ms(t) ? new ft(t) : this.fromB256(t);
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
    if (Lc(t))
      return ft.fromPublicKey(t);
    if (Ms(t))
      return new ft(t);
    if (Go(t))
      return ft.fromB256(t);
    if (zo(t))
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
    if (!zo(t))
      throw new x(
        x.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const r = ug(t);
    return new ft(Os(r));
  }
}, Dr, e_, Ct = (e_ = class extends _t {
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
    O(this, "length");
    He(this, Dr);
    this.length = t, $e(this, Dr, r);
  }
  encode(t) {
    const r = [], n = $(t);
    return r.push(n), Vt(this, Dr) && r.push(new Uint8Array(Vt(this, Dr))), ct(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [K(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return Vt(this, Dr) && ([n, s] = [null, s + Vt(this, Dr)]), [i, s];
  }
}, Dr = new WeakMap(), e_), $r = class extends Ii {
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
}, Bt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Bt || {}), Pc = class extends _t {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.txID)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new j().encode(e.owner)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), t.push(new $r().encode(e.txPointer)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new P("u64").encode(e.predicateGasUsed)), t.push(new P("u64").encode(e.predicateLength)), t.push(new P("u64").encode(e.predicateDataLength)), t.push(new Ct(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ct(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new j().decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new j().decode(e, n);
    const u = r;
    [r, n] = new $r().decode(e, n);
    const f = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const g = Number(r);
    [r, n] = new P("u64").decode(e, n);
    const I = r;
    [r, n] = new P("u64").decode(e, n);
    const C = r;
    [r, n] = new P("u64").decode(e, n);
    const S = r;
    [r, n] = new Ct(C.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new Ct(S.toNumber()).decode(e, n), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: a,
        assetId: u,
        txPointer: f,
        witnessIndex: g,
        predicateGasUsed: I,
        predicateLength: C,
        predicateDataLength: S,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, Js = class extends _t {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.txID)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new j().encode(e.balanceRoot)), t.push(new j().encode(e.stateRoot)), t.push(new $r().encode(e.txPointer)), t.push(new j().encode(e.contractID)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new j().decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
    const a = r;
    [r, n] = new $r().decode(e, n);
    const u = r;
    return [r, n] = new j().decode(e, n), [
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
}, Fr = class extends _t {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ct(32).encode(e.sender)), t.push(new Ct(32).encode(e.recipient)), t.push(new Ct(32).encode(e.nonce)), t.push(new P("u64").encode(e.amount)), t.push($(e.data || "0x")), Be(ct(t));
  }
  static encodeData(e) {
    const t = $(e || "0x"), r = t.length;
    return new Ct(r).encode(t);
  }
  encode(e) {
    const t = [], r = Fr.encodeData(e.data);
    return t.push(new Ct(32).encode(e.sender)), t.push(new Ct(32).encode(e.recipient)), t.push(new P("u64").encode(e.amount)), t.push(new Ct(32).encode(e.nonce)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new P("u64").encode(e.predicateGasUsed)), t.push(new P("u64").encode(r.length)), t.push(new P("u64").encode(e.predicateLength)), t.push(new P("u64").encode(e.predicateDataLength)), t.push(new Ct(r.length).encode(r)), t.push(new Ct(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ct(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ct(t);
  }
  static decodeData(e) {
    const t = $(e), r = t.length, [n] = new Ct(r).decode(t, 0);
    return $(n);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = Number(r);
    [r, n] = new P("u64").decode(e, n);
    const f = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new P("u64").decode(e, n);
    const I = r;
    [r, n] = new P("u64").decode(e, n);
    const C = r;
    [r, n] = new Ct(g).decode(e, n);
    const S = r;
    [r, n] = new Ct(I.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new Ct(C.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: u,
        nonce: a,
        predicateGasUsed: f,
        dataLength: g,
        predicateLength: I,
        predicateDataLength: C,
        data: S,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, nr = class extends _t {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Pc().encode(e));
        break;
      }
      case 1: {
        t.push(new Js().encode(e));
        break;
      }
      case 2: {
        t.push(new Fr().encode(e));
        break;
      }
      default:
        throw new x(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${r}.`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Pc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Js().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Fr().decode(e, n), [r, n];
      default:
        throw new x(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, vt = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(vt || {}), Uc = class extends _t {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    return [r, n] = new j().decode(e, n), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, $s = class extends _t {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new rt("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new j().encode(e.balanceRoot)), t.push(new j().encode(e.stateRoot)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    return [r, n] = new j().decode(e, n), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: r
      },
      n
    ];
  }
}, Gc = class extends _t {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    return [r, n] = new j().decode(e, n), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, zc = class extends _t {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    return [r, n] = new j().decode(e, n), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Vc = class extends _t {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.contractId)), t.push(new j().encode(e.stateRoot)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    return [r, n] = new j().decode(e, n), [
      {
        type: 4,
        contractId: s,
        stateRoot: r
      },
      n
    ];
  }
}, sr = class extends _t {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new Uc().encode(e));
        break;
      }
      case 1: {
        t.push(new $s().encode(e));
        break;
      }
      case 2: {
        t.push(new Gc().encode(e));
        break;
      }
      case 3: {
        t.push(new zc().encode(e));
        break;
      }
      case 4: {
        t.push(new Vc().encode(e));
        break;
      }
      default:
        throw new x(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${r}.`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Uc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new $s().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Gc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new zc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Vc().decode(e, n), [r, n];
      default:
        throw new x(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, je = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(je || {}), _g = (e) => e.sort((t, r) => t.type - r.type);
function hg(e) {
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
var ir = class extends _t {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    hg(e);
    const t = _g(e), r = [];
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
    }), ct(r);
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
}, pt = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(pt || {}), Yc = class extends _t {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.from)), t.push(new j().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), t.push(new P("u64").encode(e.gas)), t.push(new P("u64").encode(e.param1)), t.push(new P("u64").encode(e.param2)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    [r, n] = new P("u64").decode(e, n);
    const f = r;
    [r, n] = new P("u64").decode(e, n);
    const g = r;
    [r, n] = new P("u64").decode(e, n);
    const I = r;
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
        pc: I,
        is: r
      },
      n
    ];
  }
}, Hc = class extends _t {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.id)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
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
}, Xc = class extends _t {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.id)), t.push(new P("u64").encode(e.ptr)), t.push(new P("u64").encode(e.len)), t.push(new j().encode(e.digest)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), t.push(new Ct(e.len.toNumber()).encode(e.data)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    [r, n] = new P("u64").decode(e, n);
    const f = r;
    return [r, n] = new Ct(o.toNumber()).decode(e, n), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: a,
        pc: u,
        is: f,
        data: r
      },
      n
    ];
  }
}, Zc = class extends _t {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.id)), t.push(new P("u64").encode(e.reason)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), t.push(new j().encode(e.contractId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    return [r, n] = new j().decode(e, n), [
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
}, Wc = class extends _t {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.id)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
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
}, jc = class extends _t {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.id)), t.push(new P("u64").encode(e.val0)), t.push(new P("u64").encode(e.val1)), t.push(new P("u64").encode(e.val2)), t.push(new P("u64").encode(e.val3)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
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
}, qc = class extends _t {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.id)), t.push(new P("u64").encode(e.val0)), t.push(new P("u64").encode(e.val1)), t.push(new P("u64").encode(e.ptr)), t.push(new P("u64").encode(e.len)), t.push(new j().encode(e.digest)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), t.push(new Ct(e.len.toNumber()).encode(e.data)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new P("u64").decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r;
    [r, n] = new j().decode(e, n);
    const f = r;
    [r, n] = new P("u64").decode(e, n);
    const g = r;
    [r, n] = new P("u64").decode(e, n);
    const I = r;
    return [r, n] = new Ct(u.toNumber()).decode(e, n), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: a,
        len: u,
        digest: f,
        pc: g,
        is: I,
        data: r
      },
      n
    ];
  }
}, Jc = class extends _t {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.from)), t.push(new j().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
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
}, $c = class extends _t {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.from)), t.push(new j().encode(e.to)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
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
}, Kc = class extends _t {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new P("u64").encode(e.result)), t.push(new P("u64").encode(e.gasUsed)), ct(t);
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
}, Vo = class extends _t {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  /**
   * @deprecated `ReceiptMessageOutCoder.getMessageId` is deprecated and will be removed in future versions.
   * Use the static method `InputMessageCoder.getMessageId` instead.
   */
  static getMessageId(e) {
    const t = [];
    return t.push(new Ct(32).encode(e.sender)), t.push(new Ct(32).encode(e.recipient)), t.push(new Ct(32).encode(e.nonce)), t.push(new P("u64").encode(e.amount)), t.push($(e.data || "0x")), Be(ct(t));
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.sender)), t.push(new j().encode(e.recipient)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.nonce)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new j().encode(e.digest)), t.push(new Ct(e.data.length).encode(e.data)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new j().decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new j().decode(e, n);
    const f = r;
    [r, n] = new Ct(u).decode(e, n);
    const g = $(r), I = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: a,
      len: u,
      digest: f,
      data: g
    };
    return I.messageId = Vo.getMessageId(I), [I, n];
  }
}, Jn = (e, t) => {
  const r = $(e), n = $(t);
  return Be(ct([r, n]));
}, kC = (e, t) => ({
  bits: Jn(e, t)
}), Ks = class extends _t {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  /**
   * @deprecated `ReceiptMintCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return Jn(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.subId)), t.push(new j().encode(e.contractId)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r, f = Ks.getAssetId(i, s);
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
}, td = class extends _t {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  /**
   * @deprecated `ReceiptBurnCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return Jn(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.subId)), t.push(new j().encode(e.contractId)), t.push(new P("u64").encode(e.val)), t.push(new P("u64").encode(e.pc)), t.push(new P("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
    const i = r;
    [r, n] = new P("u64").decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new P("u64").decode(e, n);
    const u = r, f = Ks.getAssetId(i, s);
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
}, PC = class extends _t {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new rt("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(new Yc().encode(e));
        break;
      }
      case 1: {
        t.push(new Hc().encode(e));
        break;
      }
      case 2: {
        t.push(new Xc().encode(e));
        break;
      }
      case 3: {
        t.push(new Zc().encode(e));
        break;
      }
      case 4: {
        t.push(new Wc().encode(e));
        break;
      }
      case 5: {
        t.push(new jc().encode(e));
        break;
      }
      case 6: {
        t.push(new qc().encode(e));
        break;
      }
      case 7: {
        t.push(new Jc().encode(e));
        break;
      }
      case 8: {
        t.push(new $c().encode(e));
        break;
      }
      case 9: {
        t.push(new Kc().encode(e));
        break;
      }
      case 10: {
        t.push(new Vo().encode(e));
        break;
      }
      case 11: {
        t.push(new Ks().encode(e));
        break;
      }
      case 12: {
        t.push(new td().encode(e));
        break;
      }
      default:
        throw new x(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${r}`);
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Yc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Hc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Xc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Zc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Wc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new jc().decode(e, n), [r, n];
      case 6:
        return [r, n] = new qc().decode(e, n), [r, n];
      case 7:
        return [r, n] = new Jc().decode(e, n), [r, n];
      case 8:
        return [r, n] = new $c().decode(e, n), [r, n];
      case 9:
        return [r, n] = new Kc().decode(e, n), [r, n];
      case 10:
        return [r, n] = new Vo().decode(e, n), [r, n];
      case 11:
        return [r, n] = new Ks().decode(e, n), [r, n];
      case 12:
        return [r, n] = new td().decode(e, n), [r, n];
      default:
        throw new x(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, ed = class extends Ii {
  constructor() {
    super("StorageSlot", {
      key: new j(),
      value: new j()
    });
  }
}, Ge = /* @__PURE__ */ ((e) => (e[e.ConsensusParameters = 0] = "ConsensusParameters", e[e.StateTransition = 1] = "StateTransition", e))(Ge || {}), rd = class extends _t {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: r } = e;
    switch (t.push(new rt("u8", { padToWordSize: !0 }).encode(r)), r) {
      case 0: {
        const n = e.data;
        t.push(new rt("u16", { padToWordSize: !0 }).encode(n.witnessIndex)), t.push(new j().encode(n.checksum));
        break;
      }
      case 1: {
        const n = e.data;
        t.push(new j().encode(n.bytecodeRoot));
        break;
      }
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r = t, n;
    [n, r] = new rt("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0: {
        [n, r] = new rt("u16", { padToWordSize: !0 }).decode(e, r);
        const i = n;
        return [n, r] = new j().decode(e, r), [{ type: s, data: { witnessIndex: i, checksum: n } }, r];
      }
      case 1:
        return [n, r] = new j().decode(e, r), [{ type: s, data: { bytecodeRoot: n } }, r];
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, or = class extends _t {
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
    return t.push(new rt("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new Ct(e.dataLength).encode(e.data)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    return [r, n] = new Ct(s).decode(e, n), [
      {
        dataLength: s,
        data: r
      },
      n
    ];
  }
}, xt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e[e.Blob = 5] = "Blob", e))(xt || {}), nd = class extends _t {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new P("u64").encode(e.scriptGasLimit)), t.push(new j().encode(e.receiptsRoot)), t.push(new P("u64").encode(e.scriptLength)), t.push(new P("u64").encode(e.scriptDataLength)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new Ct(e.scriptLength.toNumber()).encode(e.script)), t.push(new Ct(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new ir().encode(e.policies)), t.push(new bt(new nr(), e.inputsCount).encode(e.inputs)), t.push(new bt(new sr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new or(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new P("u64").decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
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
    const I = r;
    [r, n] = new Ct(o.toNumber()).decode(e, n);
    const C = r;
    [r, n] = new Ct(a.toNumber()).decode(e, n);
    const S = r;
    [r, n] = new ir().decode(e, n, u);
    const Q = r;
    [r, n] = new bt(new nr(), f).decode(e, n);
    const N = r;
    [r, n] = new bt(new sr(), g).decode(e, n);
    const T = r;
    return [r, n] = new bt(new or(), I).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: a,
        policyTypes: u,
        inputsCount: f,
        outputsCount: g,
        witnessesCount: I,
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
}, sd = class extends _t {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new rt("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new j().encode(e.salt)), t.push(new P("u64").encode(e.storageSlotsCount)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new bt(new ed(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new ir().encode(e.policies)), t.push(new bt(new nr(), e.inputsCount).encode(e.inputs)), t.push(new bt(new sr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new or(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new j().decode(e, n);
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
    [r, n] = new bt(new ed(), o.toNumber()).decode(
      e,
      n
    );
    const I = r;
    [r, n] = new ir().decode(e, n, a);
    const C = r;
    [r, n] = new bt(new nr(), u).decode(e, n);
    const S = r;
    [r, n] = new bt(new sr(), f).decode(e, n);
    const Q = r;
    return [r, n] = new bt(new or(), g).decode(e, n), [
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
        storageSlots: I,
        inputs: S,
        outputs: Q,
        witnesses: r
      },
      n
    ];
  }
}, id = class extends _t {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $r().encode(e.txPointer)), t.push(new Js().encode(e.inputContract)), t.push(new $s().encode(e.outputContract)), t.push(new P("u64").encode(e.mintAmount)), t.push(new j().encode(e.mintAssetId)), t.push(new P("u64").encode(e.gasPrice)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new $r().decode(e, n);
    const s = r;
    [r, n] = new Js().decode(e, n);
    const i = r;
    [r, n] = new $s().decode(e, n);
    const o = r;
    [r, n] = new P("u64").decode(e, n);
    const a = r;
    [r, n] = new j().decode(e, n);
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
}, od = class extends _t {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new rd().encode(e.upgradePurpose)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new ir().encode(e.policies)), t.push(new bt(new nr(), e.inputsCount).encode(e.inputs)), t.push(new bt(new sr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new or(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rd().decode(e, n);
    const s = r;
    [r, n] = new rt("u32", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const u = r;
    [r, n] = new ir().decode(e, n, i);
    const f = r;
    [r, n] = new bt(new nr(), o).decode(e, n);
    const g = r;
    [r, n] = new bt(new sr(), a).decode(e, n);
    const I = r;
    return [r, n] = new bt(new or(), u).decode(e, n), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: a,
        witnessesCount: u,
        policies: f,
        inputs: g,
        outputs: I,
        witnesses: r
      },
      n
    ];
  }
}, ad = class extends _t {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.root)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new bt(new j(), e.proofSetCount).encode(e.proofSet)), t.push(new ir().encode(e.policies)), t.push(new bt(new nr(), e.inputsCount).encode(e.inputs)), t.push(new bt(new sr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new or(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
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
    const I = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const C = r;
    [r, n] = new bt(new j(), u).decode(e, n);
    const S = r;
    [r, n] = new ir().decode(e, n, f);
    const Q = r;
    [r, n] = new bt(new nr(), g).decode(e, n);
    const N = r;
    [r, n] = new bt(new sr(), I).decode(e, n);
    const T = r;
    return [r, n] = new bt(new or(), C).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: a,
        proofSetCount: u,
        policyTypes: f,
        inputsCount: g,
        outputsCount: I,
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
}, cd = class extends _t {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.blobId)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new rt("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new ir().encode(e.policies)), t.push(new bt(new nr(), e.inputsCount).encode(e.inputs)), t.push(new bt(new sr(), e.outputsCount).encode(e.outputs)), t.push(new bt(new or(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new j().decode(e, n);
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
    [r, n] = new ir().decode(e, n, o);
    const g = r;
    [r, n] = new bt(new nr(), a).decode(e, n);
    const I = r;
    [r, n] = new bt(new sr(), u).decode(e, n);
    const C = r;
    return [r, n] = new bt(new or(), f).decode(e, n), [
      {
        type: 5,
        blobId: s,
        witnessIndex: i,
        policyTypes: o,
        inputsCount: a,
        outputsCount: u,
        witnessesCount: f,
        policies: g,
        inputs: I,
        outputs: C,
        witnesses: r
      },
      n
    ];
  }
}, Ar = class extends _t {
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
          new nd().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new sd().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new id().encode(e));
        break;
      }
      case 3: {
        t.push(
          new od().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new ad().encode(e)
        );
        break;
      }
      case 5: {
        t.push(new cd().encode(e));
        break;
      }
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new rt("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new nd().decode(e, n), [r, n];
      case 1:
        return [r, n] = new sd().decode(e, n), [r, n];
      case 2:
        return [r, n] = new id().decode(e, n), [r, n];
      case 3:
        return [r, n] = new od().decode(e, n), [r, n];
      case 4:
        return [r, n] = new ad().decode(e, n), [r, n];
      case 5:
        return [r, n] = new cd().decode(e, n), [r, n];
      default:
        throw new x(
          D.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, UC = class extends Ii {
  constructor() {
    super("UtxoId", {
      transactionId: new j(),
      outputIndex: new rt("u16", { padToWordSize: !0 })
    });
  }
};
function lg(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function ah(e) {
  return function t(r) {
    return arguments.length === 0 || lg(r) ? t : e.apply(this, arguments);
  };
}
var fg = /* @__PURE__ */ ah(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function pg(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function ch(e, t, r) {
  if (r || (r = new gg()), Ag(e))
    return e;
  var n = function(i) {
    var o = r.get(e);
    if (o)
      return o;
    r.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = ch(e[a], !0, r));
    return i;
  };
  switch (fg(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return pg(e);
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
function Ag(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var gg = /* @__PURE__ */ function() {
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
}(), xe = /* @__PURE__ */ ah(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : ch(t);
});
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ka = /* @__PURE__ */ BigInt(0), Ei = /* @__PURE__ */ BigInt(1), wg = /* @__PURE__ */ BigInt(2);
function Kr(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function us(e) {
  if (!Kr(e))
    throw new Error("Uint8Array expected");
}
function Cn(e, t) {
  if (typeof t != "boolean")
    throw new Error(`${e} must be valid boolean, got "${t}".`);
}
const mg = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Bn(e) {
  us(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += mg[e[r]];
  return t;
}
function _n(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Pa(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const cr = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function dd(e) {
  if (e >= cr._0 && e <= cr._9)
    return e - cr._0;
  if (e >= cr._A && e <= cr._F)
    return e - (cr._A - 10);
  if (e >= cr._a && e <= cr._f)
    return e - (cr._a - 10);
}
function xn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, r = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(r);
  for (let s = 0, i = 0; s < r; s++, i += 2) {
    const o = dd(e.charCodeAt(i)), a = dd(e.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const u = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + u + '" at index ' + i);
    }
    n[s] = o * 16 + a;
  }
  return n;
}
function qr(e) {
  return Pa(Bn(e));
}
function Ua(e) {
  return us(e), Pa(Bn(Uint8Array.from(e).reverse()));
}
function Rn(e, t) {
  return xn(e.toString(16).padStart(t * 2, "0"));
}
function Ga(e, t) {
  return Rn(e, t).reverse();
}
function yg(e) {
  return xn(_n(e));
}
function qe(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = xn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Kr(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = n.length;
  if (typeof r == "number" && s !== r)
    throw new Error(`${e} expected ${r} bytes, got ${s}`);
  return n;
}
function $n(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    us(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
function dh(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function bg(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const io = (e) => typeof e == "bigint" && ka <= e;
function vi(e, t, r) {
  return io(e) && io(t) && io(r) && t <= e && e < r;
}
function Jr(e, t, r, n) {
  if (!vi(t, r, n))
    throw new Error(`expected valid ${e}: ${r} <= n < ${n}, got ${typeof t} ${t}`);
}
function uh(e) {
  let t;
  for (t = 0; e > ka; e >>= Ei, t += 1)
    ;
  return t;
}
function Ig(e, t) {
  return e >> BigInt(t) & Ei;
}
function Eg(e, t, r) {
  return e | (r ? Ei : ka) << BigInt(t);
}
const za = (e) => (wg << BigInt(e - 1)) - Ei, oo = (e) => new Uint8Array(e), ud = (e) => Uint8Array.from(e);
function _h(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = oo(e), s = oo(e), i = 0;
  const o = () => {
    n.fill(1), s.fill(0), i = 0;
  }, a = (...I) => r(s, n, ...I), u = (I = oo()) => {
    s = a(ud([0]), I), n = a(), I.length !== 0 && (s = a(ud([1]), I), n = a());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let I = 0;
    const C = [];
    for (; I < t; ) {
      n = a();
      const S = n.slice();
      C.push(S), I += n.length;
    }
    return $n(...C);
  };
  return (I, C) => {
    o(), u(I);
    let S;
    for (; !(S = C(f())); )
      u();
    return o(), S;
  };
}
const vg = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Kr(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function _s(e, t, r = {}) {
  const n = (s, i, o) => {
    const a = vg[i];
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
const Cg = () => {
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
const Bg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: Jr,
  abool: Cn,
  abytes: us,
  bitGet: Ig,
  bitLen: uh,
  bitMask: za,
  bitSet: Eg,
  bytesToHex: Bn,
  bytesToNumberBE: qr,
  bytesToNumberLE: Ua,
  concatBytes: $n,
  createHmacDrbg: _h,
  ensureBytes: qe,
  equalBytes: dh,
  hexToBytes: xn,
  hexToNumber: Pa,
  inRange: vi,
  isBytes: Kr,
  memoized: Yo,
  notImplemented: Cg,
  numberToBytesBE: Rn,
  numberToBytesLE: Ga,
  numberToHexUnpadded: _n,
  numberToVarBytesBE: yg,
  utf8ToBytes: bg,
  validateObject: _s
}, Symbol.toStringTag, { value: "Module" }));
var ao = {}, Ho = { exports: {} };
(function(e, t) {
  var r = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof St < "u" && St, n = function() {
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
        ], I = ArrayBuffer.isView || function(_) {
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
        var p = {
          next: function() {
            var m = _.shift();
            return { done: m === void 0, value: m };
          }
        };
        return u.iterable && (p[Symbol.iterator] = function() {
          return p;
        }), p;
      }
      function N(_) {
        this.map = {}, _ instanceof N ? _.forEach(function(p, m) {
          this.append(m, p);
        }, this) : Array.isArray(_) ? _.forEach(function(p) {
          this.append(p[0], p[1]);
        }, this) : _ && Object.getOwnPropertyNames(_).forEach(function(p) {
          this.append(p, _[p]);
        }, this);
      }
      N.prototype.append = function(_, p) {
        _ = C(_), p = S(p);
        var m = this.map[_];
        this.map[_] = m ? m + ", " + p : p;
      }, N.prototype.delete = function(_) {
        delete this.map[C(_)];
      }, N.prototype.get = function(_) {
        return _ = C(_), this.has(_) ? this.map[_] : null;
      }, N.prototype.has = function(_) {
        return this.map.hasOwnProperty(C(_));
      }, N.prototype.set = function(_, p) {
        this.map[C(_)] = S(p);
      }, N.prototype.forEach = function(_, p) {
        for (var m in this.map)
          this.map.hasOwnProperty(m) && _.call(p, this.map[m], m, this);
      }, N.prototype.keys = function() {
        var _ = [];
        return this.forEach(function(p, m) {
          _.push(m);
        }), Q(_);
      }, N.prototype.values = function() {
        var _ = [];
        return this.forEach(function(p) {
          _.push(p);
        }), Q(_);
      }, N.prototype.entries = function() {
        var _ = [];
        return this.forEach(function(p, m) {
          _.push([m, p]);
        }), Q(_);
      }, u.iterable && (N.prototype[Symbol.iterator] = N.prototype.entries);
      function T(_) {
        if (_.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        _.bodyUsed = !0;
      }
      function F(_) {
        return new Promise(function(p, m) {
          _.onload = function() {
            p(_.result);
          }, _.onerror = function() {
            m(_.error);
          };
        });
      }
      function Y(_) {
        var p = new FileReader(), m = F(p);
        return p.readAsArrayBuffer(_), m;
      }
      function z(_) {
        var p = new FileReader(), m = F(p);
        return p.readAsText(_), m;
      }
      function H(_) {
        for (var p = new Uint8Array(_), m = new Array(p.length), A = 0; A < p.length; A++)
          m[A] = String.fromCharCode(p[A]);
        return m.join("");
      }
      function M(_) {
        if (_.slice)
          return _.slice(0);
        var p = new Uint8Array(_.byteLength);
        return p.set(new Uint8Array(_)), p.buffer;
      }
      function L() {
        return this.bodyUsed = !1, this._initBody = function(_) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && f(_) ? (this._bodyArrayBuffer = M(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || I(_)) ? this._bodyArrayBuffer = M(_) : this._bodyText = _ = Object.prototype.toString.call(_) : this._bodyText = "", this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
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
            return this.blob().then(Y);
        }), this.text = function() {
          var _ = T(this);
          if (_)
            return _;
          if (this._bodyBlob)
            return z(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(H(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, u.formData && (this.formData = function() {
          return this.text().then(J);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var G = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function U(_) {
        var p = _.toUpperCase();
        return G.indexOf(p) > -1 ? p : _;
      }
      function k(_, p) {
        if (!(this instanceof k))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        p = p || {};
        var m = p.body;
        if (_ instanceof k) {
          if (_.bodyUsed)
            throw new TypeError("Already read");
          this.url = _.url, this.credentials = _.credentials, p.headers || (this.headers = new N(_.headers)), this.method = _.method, this.mode = _.mode, this.signal = _.signal, !m && _._bodyInit != null && (m = _._bodyInit, _.bodyUsed = !0);
        } else
          this.url = String(_);
        if (this.credentials = p.credentials || this.credentials || "same-origin", (p.headers || !this.headers) && (this.headers = new N(p.headers)), this.method = U(p.method || this.method || "GET"), this.mode = p.mode || this.mode || null, this.signal = p.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (p.cache === "no-store" || p.cache === "no-cache")) {
          var A = /([?&])_=[^&]*/;
          if (A.test(this.url))
            this.url = this.url.replace(A, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var E = /\?/;
            this.url += (E.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      k.prototype.clone = function() {
        return new k(this, { body: this._bodyInit });
      };
      function J(_) {
        var p = new FormData();
        return _.trim().split("&").forEach(function(m) {
          if (m) {
            var A = m.split("="), E = A.shift().replace(/\+/g, " "), v = A.join("=").replace(/\+/g, " ");
            p.append(decodeURIComponent(E), decodeURIComponent(v));
          }
        }), p;
      }
      function Z(_) {
        var p = new N(), m = _.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(A) {
          return A.indexOf(`
`) === 0 ? A.substr(1, A.length) : A;
        }).forEach(function(A) {
          var E = A.split(":"), v = E.shift().trim();
          if (v) {
            var w = E.join(":").trim();
            p.append(v, w);
          }
        }), p;
      }
      L.call(k.prototype);
      function tt(_, p) {
        if (!(this instanceof tt))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        p || (p = {}), this.type = "default", this.status = p.status === void 0 ? 200 : p.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = p.statusText === void 0 ? "" : "" + p.statusText, this.headers = new N(p.headers), this.url = p.url || "", this._initBody(_);
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
      tt.redirect = function(_, p) {
        if (B.indexOf(p) === -1)
          throw new RangeError("Invalid status code");
        return new tt(null, { status: p, headers: { location: _ } });
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(p, m) {
          this.message = p, this.name = m;
          var A = Error(p);
          this.stack = A.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function d(_, p) {
        return new Promise(function(m, A) {
          var E = new k(_, p);
          if (E.signal && E.signal.aborted)
            return A(new o.DOMException("Aborted", "AbortError"));
          var v = new XMLHttpRequest();
          function w() {
            v.abort();
          }
          v.onload = function() {
            var b = {
              status: v.status,
              statusText: v.statusText,
              headers: Z(v.getAllResponseHeaders() || "")
            };
            b.url = "responseURL" in v ? v.responseURL : b.headers.get("X-Request-URL");
            var q = "response" in v ? v.response : v.responseText;
            setTimeout(function() {
              m(new tt(q, b));
            }, 0);
          }, v.onerror = function() {
            setTimeout(function() {
              A(new TypeError("Network request failed"));
            }, 0);
          }, v.ontimeout = function() {
            setTimeout(function() {
              A(new TypeError("Network request failed"));
            }, 0);
          }, v.onabort = function() {
            setTimeout(function() {
              A(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function h(b) {
            try {
              return b === "" && a.location.href ? a.location.href : b;
            } catch {
              return b;
            }
          }
          v.open(E.method, h(E.url), !0), E.credentials === "include" ? v.withCredentials = !0 : E.credentials === "omit" && (v.withCredentials = !1), "responseType" in v && (u.blob ? v.responseType = "blob" : u.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (v.responseType = "arraybuffer")), p && typeof p.headers == "object" && !(p.headers instanceof N) ? Object.getOwnPropertyNames(p.headers).forEach(function(b) {
            v.setRequestHeader(b, S(p.headers[b]));
          }) : E.headers.forEach(function(b, q) {
            v.setRequestHeader(q, b);
          }), E.signal && (E.signal.addEventListener("abort", w), v.onreadystatechange = function() {
            v.readyState === 4 && E.signal.removeEventListener("abort", w);
          }), v.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return d.polyfill = !0, a.fetch || (a.fetch = d, a.Headers = N, a.Request = k, a.Response = tt), o.Headers = N, o.Request = k, o.Response = tt, o.fetch = d, o;
    })({});
  })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
  var s = r.fetch ? r : n;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Ho, Ho.exports);
var xg = Ho.exports;
function Rg(e) {
  return typeof e == "object" && e !== null;
}
function Sg(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Ng = /\r\n|[\n\r]/g;
function Xo(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(Ng)) {
    if (typeof s.index == "number" || Sg(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function Tg(e) {
  return hh(
    e.source,
    Xo(e.source, e.start)
  );
}
function hh(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? r : 0, u = t.column + a, f = `${e.name}:${o}:${u}
`, g = n.split(/\r\n|[\n\r]/g), I = g[s];
  if (I.length > 120) {
    const C = Math.floor(u / 80), S = u % 80, Q = [];
    for (let N = 0; N < I.length; N += 80)
      Q.push(I.slice(N, N + 80));
    return f + _d([
      [`${o} |`, Q[0]],
      ...Q.slice(1, C + 1).map((N) => ["|", N]),
      ["|", "^".padStart(S)],
      ["|", Q[C + 1]]
    ]);
  }
  return f + _d([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, g[s - 1]],
    [`${o} |`, I],
    ["|", "^".padStart(u)],
    [`${o + 1} |`, g[s + 1]]
  ]);
}
function _d(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function Dg(e) {
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
    const { nodes: o, source: a, positions: u, path: f, originalError: g, extensions: I } = Dg(r);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = g ?? void 0, this.nodes = hd(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = hd(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((Q) => Q.loc).filter((Q) => Q != null)
    );
    this.source = a ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = u ?? (C == null ? void 0 : C.map((Q) => Q.start)), this.locations = u && a ? u.map((Q) => Xo(a, Q)) : C == null ? void 0 : C.map((Q) => Xo(Q.source, Q.start));
    const S = Rg(
      g == null ? void 0 : g.extensions
    ) ? g == null ? void 0 : g.extensions : void 0;
    this.extensions = (i = I ?? S) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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

` + Tg(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + hh(this.source, r);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function hd(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function be(e, t, r) {
  return new Va(`Syntax Error: ${r}`, {
    source: e,
    positions: [t]
  });
}
class Qg {
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
class lh {
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
const fh = {
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
}, Fg = new Set(Object.keys(fh));
function ld(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Fg.has(t);
}
var hn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(hn || (hn = {}));
var Zo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Zo || (Zo = {}));
var lt;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(lt || (lt = {}));
function Wo(e) {
  return e === 9 || e === 32;
}
function Kn(e) {
  return e >= 48 && e <= 57;
}
function ph(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Ah(e) {
  return ph(e) || e === 95;
}
function Og(e) {
  return ph(e) || Kn(e) || e === 95;
}
function Mg(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], u = Lg(a);
    u !== a.length && (n = (i = n) !== null && i !== void 0 ? i : o, s = o, o !== 0 && u < r && (r = u));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Lg(e) {
  let t = 0;
  for (; t < e.length && Wo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function kg(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((S) => S.length === 0 || Wo(S.charCodeAt(0))), o = r.endsWith('\\"""'), a = e.endsWith('"') && !o, u = e.endsWith("\\"), f = a || u, g = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || f || i || o
  );
  let I = "";
  const C = s && Wo(e.charCodeAt(0));
  return (g && !C || i) && (I += `
`), I += r, (g || f) && (I += `
`), '"""' + I + '"""';
}
var X;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(X || (X = {}));
class Pg {
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
    const r = new lh(X.SOF, 0, 0, 0, 0);
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
          const r = Gg(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === X.COMMENT);
    return t;
  }
}
function Ug(e) {
  return e === X.BANG || e === X.DOLLAR || e === X.AMP || e === X.PAREN_L || e === X.PAREN_R || e === X.SPREAD || e === X.COLON || e === X.EQUALS || e === X.AT || e === X.BRACKET_L || e === X.BRACKET_R || e === X.BRACE_L || e === X.PIPE || e === X.BRACE_R;
}
function Tn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ci(e, t) {
  return gh(e.charCodeAt(t)) && wh(e.charCodeAt(t + 1));
}
function gh(e) {
  return e >= 55296 && e <= 56319;
}
function wh(e) {
  return e >= 56320 && e <= 57343;
}
function tn(e, t) {
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
  return new lh(t, r, n, i, o, s);
}
function Gg(e, t) {
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
        return zg(e, s);
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
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? Wg(e, s) : Yg(e, s);
    }
    if (Kn(i) || i === 45)
      return Vg(e, s, i);
    if (Ah(i))
      return jg(e, s);
    throw be(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Tn(i) || Ci(r, s) ? `Unexpected character: ${tn(e, s)}.` : `Invalid character: ${tn(e, s)}.`
    );
  }
  return me(e, X.EOF, n, n);
}
function zg(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Tn(i))
      ++s;
    else if (Ci(r, s))
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
function Vg(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, o = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), Kn(i))
      throw be(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${tn(
          e,
          s
        )}.`
      );
  } else
    s = co(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (o = !0, i = n.charCodeAt(++s), s = co(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = co(e, s, i), i = n.charCodeAt(s)), i === 46 || Ah(i))
    throw be(
      e.source,
      s,
      `Invalid number, expected digit but got: ${tn(
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
function co(e, t, r) {
  if (!Kn(r))
    throw be(
      e.source,
      t,
      `Invalid number, expected digit but got: ${tn(
        e,
        t
      )}.`
    );
  const n = e.source.body;
  let s = t + 1;
  for (; Kn(n.charCodeAt(s)); )
    ++s;
  return s;
}
function Yg(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, o = "";
  for (; s < n; ) {
    const a = r.charCodeAt(s);
    if (a === 34)
      return o += r.slice(i, s), me(e, X.STRING, t, s + 1, o);
    if (a === 92) {
      o += r.slice(i, s);
      const u = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? Hg(e, s) : Xg(e, s) : Zg(e, s);
      o += u.value, s += u.size, i = s;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (Tn(a))
      ++s;
    else if (Ci(r, s))
      s += 2;
    else
      throw be(
        e.source,
        s,
        `Invalid character within String: ${tn(
          e,
          s
        )}.`
      );
  }
  throw be(e.source, s, "Unterminated string.");
}
function Hg(e, t) {
  const r = e.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = r.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Tn(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Yn(i), n < 0)
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
function Xg(e, t) {
  const r = e.source.body, n = fd(r, t + 2);
  if (Tn(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (gh(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = fd(r, t + 8);
    if (wh(s))
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
function fd(e, t) {
  return Yn(e.charCodeAt(t)) << 12 | Yn(e.charCodeAt(t + 1)) << 8 | Yn(e.charCodeAt(t + 2)) << 4 | Yn(e.charCodeAt(t + 3));
}
function Yn(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Zg(e, t) {
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
function Wg(e, t) {
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
        Mg(u).join(`
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
    if (Tn(f))
      ++i;
    else if (Ci(r, i))
      i += 2;
    else
      throw be(
        e.source,
        i,
        `Invalid character within String: ${tn(
          e,
          i
        )}.`
      );
  }
  throw be(e.source, i, "Unterminated string.");
}
function jg(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (Og(i))
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
function Ls(e, t) {
  if (!!!e)
    throw new Error(t);
}
const qg = 10, mh = 2;
function Ya(e) {
  return Bi(e, []);
}
function Bi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Jg(e, t);
    default:
      return String(e);
  }
}
function Jg(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if ($g(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : Bi(n, r);
  } else if (Array.isArray(e))
    return tw(e, r);
  return Kg(e, r);
}
function $g(e) {
  return typeof e.toJSON == "function";
}
function Kg(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > mh ? "[" + ew(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + Bi(i, t)
  ).join(", ") + " }";
}
function tw(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > mh)
    return "[Array]";
  const r = Math.min(qg, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(Bi(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function ew(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const rw = globalThis.process && // eslint-disable-next-line no-undef
!0, nw = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  rw ? function(t, r) {
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
        const o = Ya(t);
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
class yh {
  constructor(t, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ls(!1, `Body must be a string. Received: ${Ya(t)}.`), this.body = t, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || Ls(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Ls(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function sw(e) {
  return nw(e, yh);
}
function bh(e, t) {
  return new hs(e, t).parseDocument();
}
function iw(e, t) {
  const r = new hs(e, t);
  r.expectToken(X.SOF);
  const n = r.parseValueLiteral(!1);
  return r.expectToken(X.EOF), n;
}
function ow(e, t) {
  const r = new hs(e, t);
  r.expectToken(X.SOF);
  const n = r.parseConstValueLiteral();
  return r.expectToken(X.EOF), n;
}
function aw(e, t) {
  const r = new hs(e, t);
  r.expectToken(X.SOF);
  const n = r.parseTypeReference();
  return r.expectToken(X.EOF), n;
}
class hs {
  constructor(t, r = {}) {
    const n = sw(t) ? t : new yh(t);
    this._lexer = new Pg(n), this._options = r, this._tokenCounter = 0;
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
        operation: hn.QUERY,
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
        return hn.QUERY;
      case "mutation":
        return hn.MUTATION;
      case "subscription":
        return hn.SUBSCRIPTION;
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
        `${xs(
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
    if (Object.prototype.hasOwnProperty.call(Zo, r.value))
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
    return this._options.noLocation !== !0 && (r.loc = new Qg(
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
      `Expected ${Ih(t)}, found ${xs(r)}.`
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
        `Expected "${t}", found ${xs(r)}.`
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
      `Unexpected ${xs(r)}.`
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
function xs(e) {
  const t = e.value;
  return Ih(e.kind) + (t != null ? ` "${t}"` : "");
}
function Ih(e) {
  return Ug(e) ? `"${e}"` : e;
}
const cw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: hs,
  parse: bh,
  parseConstValue: ow,
  parseType: aw,
  parseValue: iw
}, Symbol.toStringTag, { value: "Module" })), dw = /* @__PURE__ */ pa(cw);
function uw(e) {
  return `"${e.replace(_w, hw)}"`;
}
const _w = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function hw(e) {
  return lw[e.charCodeAt(0)];
}
const lw = [
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
], fw = Object.freeze({});
function pw(e, t, r = fh) {
  const n = /* @__PURE__ */ new Map();
  for (const F of Object.values(lt))
    n.set(F, Aw(t, F));
  let s, i = Array.isArray(e), o = [e], a = -1, u = [], f = e, g, I;
  const C = [], S = [];
  do {
    a++;
    const F = a === o.length, Y = F && u.length !== 0;
    if (F) {
      if (g = S.length === 0 ? void 0 : C[C.length - 1], f = I, I = S.pop(), Y)
        if (i) {
          f = f.slice();
          let H = 0;
          for (const [M, L] of u) {
            const G = M - H;
            L === null ? (f.splice(G, 1), H++) : f[G] = L;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [H, M] of u)
            f[H] = M;
        }
      a = s.index, o = s.keys, u = s.edits, i = s.inArray, s = s.prev;
    } else if (I) {
      if (g = i ? a : o[a], f = I[g], f == null)
        continue;
      C.push(g);
    }
    let z;
    if (!Array.isArray(f)) {
      var Q, N;
      ld(f) || Ls(!1, `Invalid AST Node: ${Ya(f)}.`);
      const H = F ? (Q = n.get(f.kind)) === null || Q === void 0 ? void 0 : Q.leave : (N = n.get(f.kind)) === null || N === void 0 ? void 0 : N.enter;
      if (z = H == null ? void 0 : H.call(t, f, g, I, C, S), z === fw)
        break;
      if (z === !1) {
        if (!F) {
          C.pop();
          continue;
        }
      } else if (z !== void 0 && (u.push([g, z]), !F))
        if (ld(z))
          f = z;
        else {
          C.pop();
          continue;
        }
    }
    if (z === void 0 && Y && u.push([g, f]), F)
      C.pop();
    else {
      var T;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: u,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (T = r[f.kind]) !== null && T !== void 0 ? T : [], a = -1, u = [], I && S.push(I), I = f;
    }
  } while (s !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function Aw(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Eh(e) {
  return pw(e, ww);
}
const gw = 80, ww = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => at(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = It("(", at(e.variableDefinitions, ", "), ")"), r = at(
        [
          e.operation,
          at([e.name, t]),
          at(e.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: r, directives: n }) => e + ": " + t + It(" = ", r) + It(" ", at(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Ze(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = It("", e, ": ") + t;
      let o = i + It("(", at(r, ", "), ")");
      return o.length > gw && (o = i + It(`(
`, ks(at(r, `
`)), `
)`)), at([o, at(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + It(" ", at(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: r }) => at(
      [
        "...",
        It("on ", e),
        at(t, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: r, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${It("(", at(r, ", "), ")")} on ${t} ${It("", at(n, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? kg(e) : uw(e)
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
    leave: ({ values: e }) => "[" + at(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + at(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + It("(", at(t, ", "), ")")
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
`) + at(["schema", at(t, " "), Ze(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: r }) => It("", e, `
`) + at(["scalar", t, at(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => It("", e, `
`) + at(
      [
        "type",
        t,
        It("implements ", at(r, " & ")),
        at(n, " "),
        Ze(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: r, type: n, directives: s }) => It("", e, `
`) + t + (pd(r) ? It(`(
`, ks(at(r, `
`)), `
)`) : It("(", at(r, ", "), ")")) + ": " + n + It(" ", at(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: r, defaultValue: n, directives: s }) => It("", e, `
`) + at(
      [t + ": " + r, It("= ", n), at(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => It("", e, `
`) + at(
      [
        "interface",
        t,
        It("implements ", at(r, " & ")),
        at(n, " "),
        Ze(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, types: n }) => It("", e, `
`) + at(
      ["union", t, at(r, " "), It("= ", at(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, values: n }) => It("", e, `
`) + at(["enum", t, at(r, " "), Ze(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => It("", e, `
`) + at([t, at(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => It("", e, `
`) + at(["input", t, at(r, " "), Ze(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: r, repeatable: n, locations: s }) => It("", e, `
`) + "directive @" + t + (pd(r) ? It(`(
`, ks(at(r, `
`)), `
)`) : It("(", at(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + at(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => at(
      ["extend schema", at(e, " "), Ze(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => at(["extend scalar", e, at(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => at(
      [
        "extend type",
        e,
        It("implements ", at(t, " & ")),
        at(r, " "),
        Ze(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => at(
      [
        "extend interface",
        e,
        It("implements ", at(t, " & ")),
        at(r, " "),
        Ze(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: r }) => at(
      [
        "extend union",
        e,
        at(t, " "),
        It("= ", at(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: r }) => at(["extend enum", e, at(t, " "), Ze(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => at(["extend input", e, at(t, " "), Ze(r)], " ")
  }
};
function at(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function Ze(e) {
  return It(`{
`, ks(at(e, `
`)), `
}`);
}
function It(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function ks(e) {
  return It("  ", e.replace(/\n/g, `
  `));
}
function pd(e) {
  var t;
  return (t = e == null ? void 0 : e.some((r) => r.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const mw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: Eh
}, Symbol.toStringTag, { value: "Module" })), yw = /* @__PURE__ */ pa(mw);
var Ha = {}, xi = {}, vh = function(t) {
  var r = t.uri, n = t.name, s = t.type;
  this.uri = r, this.name = n, this.type = s;
}, bw = vh, Ch = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof bw;
}, Iw = Ch, Ew = function e(t, r, n) {
  r === void 0 && (r = ""), n === void 0 && (n = Iw);
  var s, i = /* @__PURE__ */ new Map();
  function o(g, I) {
    var C = i.get(I);
    C ? C.push.apply(C, g) : i.set(I, g);
  }
  if (n(t))
    s = null, o([r], t);
  else {
    var a = r ? r + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(g, I) {
        return o(["" + a + I], g), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(g, I) {
        var C = e(g, "" + a + I, n);
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
xi.ReactNativeFile = vh;
xi.extractFiles = Ew;
xi.isExtractableFile = Ch;
var vw = typeof self == "object" ? self.FormData : window.FormData, ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.defaultJsonSerializer = void 0;
ls.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Cw = St && St.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ha, "__esModule", { value: !0 });
var Bh = xi, Bw = Cw(vw), xw = ls, Rw = function(e) {
  return Bh.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Sw(e, t, r, n) {
  n === void 0 && (n = xw.defaultJsonSerializer);
  var s = Bh.extractFiles({ query: e, variables: t, operationName: r }, "", Rw), i = s.clone, o = s.files;
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
  var u = typeof FormData > "u" ? Bw.default : FormData, f = new u();
  f.append("operations", n.stringify(i));
  var g = {}, I = 0;
  return o.forEach(function(C) {
    g[++I] = C;
  }), f.append("map", n.stringify(g)), I = 0, o.forEach(function(C, S) {
    f.append("" + ++I, S);
  }), f;
}
Ha.default = Sw;
var Oe = {};
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.parseBatchRequestsExtendedArgs = Oe.parseRawRequestExtendedArgs = Oe.parseRequestExtendedArgs = Oe.parseBatchRequestArgs = Oe.parseRawRequestArgs = Oe.parseRequestArgs = void 0;
function Nw(e, t, r) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Oe.parseRequestArgs = Nw;
function Tw(e, t, r) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Oe.parseRawRequestArgs = Tw;
function Dw(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Oe.parseBatchRequestArgs = Dw;
function Qw(e, t, r, n) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Oe.parseRequestExtendedArgs = Qw;
function Fw(e, t, r, n) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Oe.parseRawRequestExtendedArgs = Fw;
function Ow(e, t, r) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: r,
    signal: void 0
  };
}
Oe.parseBatchRequestsExtendedArgs = Ow;
var fs = {}, Mw = St && St.__extends || /* @__PURE__ */ function() {
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
Object.defineProperty(fs, "__esModule", { value: !0 });
fs.ClientError = void 0;
var Lw = (
  /** @class */
  function(e) {
    Mw(t, e);
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
fs.ClientError = Lw;
var Pn = {}, Ad;
function kw() {
  if (Ad) return Pn;
  Ad = 1;
  var e = St && St.__assign || function() {
    return e = Object.assign || function(M) {
      for (var L, G = 1, U = arguments.length; G < U; G++) {
        L = arguments[G];
        for (var k in L) Object.prototype.hasOwnProperty.call(L, k) && (M[k] = L[k]);
      }
      return M;
    }, e.apply(this, arguments);
  }, t = St && St.__awaiter || function(M, L, G, U) {
    function k(J) {
      return J instanceof G ? J : new G(function(Z) {
        Z(J);
      });
    }
    return new (G || (G = Promise))(function(J, Z) {
      function tt(_) {
        try {
          d(U.next(_));
        } catch (p) {
          Z(p);
        }
      }
      function B(_) {
        try {
          d(U.throw(_));
        } catch (p) {
          Z(p);
        }
      }
      function d(_) {
        _.done ? J(_.value) : k(_.value).then(tt, B);
      }
      d((U = U.apply(M, L || [])).next());
    });
  }, r = St && St.__generator || function(M, L) {
    var G = { label: 0, sent: function() {
      if (J[0] & 1) throw J[1];
      return J[1];
    }, trys: [], ops: [] }, U, k, J, Z;
    return Z = { next: tt(0), throw: tt(1), return: tt(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
      return this;
    }), Z;
    function tt(d) {
      return function(_) {
        return B([d, _]);
      };
    }
    function B(d) {
      if (U) throw new TypeError("Generator is already executing.");
      for (; G; ) try {
        if (U = 1, k && (J = d[0] & 2 ? k.return : d[0] ? k.throw || ((J = k.return) && J.call(k), 0) : k.next) && !(J = J.call(k, d[1])).done) return J;
        switch (k = 0, J && (d = [d[0] & 2, J.value]), d[0]) {
          case 0:
          case 1:
            J = d;
            break;
          case 4:
            return G.label++, { value: d[1], done: !1 };
          case 5:
            G.label++, k = d[1], d = [0];
            continue;
          case 7:
            d = G.ops.pop(), G.trys.pop();
            continue;
          default:
            if (J = G.trys, !(J = J.length > 0 && J[J.length - 1]) && (d[0] === 6 || d[0] === 2)) {
              G = 0;
              continue;
            }
            if (d[0] === 3 && (!J || d[1] > J[0] && d[1] < J[3])) {
              G.label = d[1];
              break;
            }
            if (d[0] === 6 && G.label < J[1]) {
              G.label = J[1], J = d;
              break;
            }
            if (J && G.label < J[2]) {
              G.label = J[2], G.ops.push(d);
              break;
            }
            J[2] && G.ops.pop(), G.trys.pop();
            continue;
        }
        d = L.call(M, G);
      } catch (_) {
        d = [6, _], k = 0;
      } finally {
        U = J = 0;
      }
      if (d[0] & 5) throw d[1];
      return { value: d[0] ? d[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.GraphQLWebSocketClient = void 0;
  var n = fs, s = xh(), i = "connection_init", o = "connection_ack", a = "ping", u = "pong", f = "subscribe", g = "next", I = "error", C = "complete", S = (
    /** @class */
    function() {
      function M(L, G, U) {
        this._type = L, this._payload = G, this._id = U;
      }
      return Object.defineProperty(M.prototype, "type", {
        get: function() {
          return this._type;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(M.prototype, "id", {
        get: function() {
          return this._id;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(M.prototype, "payload", {
        get: function() {
          return this._payload;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(M.prototype, "text", {
        get: function() {
          var L = { type: this.type };
          return this.id != null && this.id != null && (L.id = this.id), this.payload != null && this.payload != null && (L.payload = this.payload), JSON.stringify(L);
        },
        enumerable: !1,
        configurable: !0
      }), M.parse = function(L, G) {
        var U = JSON.parse(L), k = U.type, J = U.payload, Z = U.id;
        return new M(k, G(J), Z);
      }, M;
    }()
  ), Q = (
    /** @class */
    function() {
      function M(L, G) {
        var U = this, k = G.onInit, J = G.onAcknowledged, Z = G.onPing, tt = G.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = L, L.onopen = function(B) {
          return t(U, void 0, void 0, function() {
            var d, _, p, m;
            return r(this, function(A) {
              switch (A.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, _ = (d = L).send, p = T, k ? [4, k()] : [3, 2];
                case 1:
                  return m = A.sent(), [3, 3];
                case 2:
                  m = null, A.label = 3;
                case 3:
                  return _.apply(d, [p.apply(void 0, [m]).text]), [
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
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, J && J(d.payload));
                return;
              }
              case a: {
                Z ? Z(d.payload).then(function(E) {
                  return L.send(Y(E).text);
                }) : L.send(Y(null).text);
                return;
              }
              case u: {
                tt && tt(d.payload);
                return;
              }
            }
            if (!U.socketState.acknowledged || d.id === void 0 || d.id === null || !U.socketState.subscriptions[d.id])
              return;
            var _ = U.socketState.subscriptions[d.id], p = _.query, m = _.variables, A = _.subscriber;
            switch (d.type) {
              case g: {
                !d.payload.errors && d.payload.data && A.next && A.next(d.payload.data), d.payload.errors && A.error && A.error(new n.ClientError(e(e({}, d.payload), { status: 200 }), { query: p, variables: m }));
                return;
              }
              case I: {
                A.error && A.error(new n.ClientError({ errors: d.payload, status: 200 }, { query: p, variables: m }));
                return;
              }
              case C: {
                A.complete && A.complete(), delete U.socketState.subscriptions[d.id];
                return;
              }
            }
          } catch (E) {
            console.error(E), L.close(1006);
          }
          L.close(4400, "Unknown graphql-ws message.");
        };
      }
      return M.prototype.makeSubscribe = function(L, G, U, k) {
        var J = this, Z = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[Z] = { query: L, variables: U, subscriber: k }, this.socket.send(z(Z, { query: L, operationName: G, variables: U }).text), function() {
          J.socket.send(H(Z).text), delete J.socketState.subscriptions[Z];
        };
      }, M.prototype.rawRequest = function(L, G) {
        var U = this;
        return new Promise(function(k, J) {
          var Z;
          U.rawSubscribe(L, {
            next: function(tt, B) {
              return Z = { data: tt, extensions: B };
            },
            error: J,
            complete: function() {
              return k(Z);
            }
          }, G);
        });
      }, M.prototype.request = function(L, G) {
        var U = this;
        return new Promise(function(k, J) {
          var Z;
          U.subscribe(L, {
            next: function(tt) {
              return Z = tt;
            },
            error: J,
            complete: function() {
              return k(Z);
            }
          }, G);
        });
      }, M.prototype.subscribe = function(L, G, U) {
        var k = s.resolveRequestDocument(L), J = k.query, Z = k.operationName;
        return this.makeSubscribe(J, Z, U, G);
      }, M.prototype.rawSubscribe = function(L, G, U) {
        return this.makeSubscribe(L, void 0, U, G);
      }, M.prototype.ping = function(L) {
        this.socket.send(F(L).text);
      }, M.prototype.close = function() {
        this.socket.close(1e3);
      }, M.PROTOCOL = "graphql-transport-ws", M;
    }()
  );
  Pn.GraphQLWebSocketClient = Q;
  function N(M, L) {
    L === void 0 && (L = function(U) {
      return U;
    });
    var G = S.parse(M, L);
    return G;
  }
  function T(M) {
    return new S(i, M);
  }
  function F(M) {
    return new S(a, M, void 0);
  }
  function Y(M) {
    return new S(u, M, void 0);
  }
  function z(M, L) {
    return new S(f, L, M);
  }
  function H(M) {
    return new S(C, void 0, M);
  }
  return Pn;
}
var gd;
function xh() {
  return gd || (gd = 1, function(e) {
    var t = St && St.__assign || function() {
      return t = Object.assign || function(A) {
        for (var E, v = 1, w = arguments.length; v < w; v++) {
          E = arguments[v];
          for (var h in E) Object.prototype.hasOwnProperty.call(E, h) && (A[h] = E[h]);
        }
        return A;
      }, t.apply(this, arguments);
    }, r = St && St.__createBinding || (Object.create ? function(A, E, v, w) {
      w === void 0 && (w = v), Object.defineProperty(A, w, { enumerable: !0, get: function() {
        return E[v];
      } });
    } : function(A, E, v, w) {
      w === void 0 && (w = v), A[w] = E[v];
    }), n = St && St.__setModuleDefault || (Object.create ? function(A, E) {
      Object.defineProperty(A, "default", { enumerable: !0, value: E });
    } : function(A, E) {
      A.default = E;
    }), s = St && St.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var E = {};
      if (A != null) for (var v in A) v !== "default" && Object.prototype.hasOwnProperty.call(A, v) && r(E, A, v);
      return n(E, A), E;
    }, i = St && St.__awaiter || function(A, E, v, w) {
      function h(b) {
        return b instanceof v ? b : new v(function(q) {
          q(b);
        });
      }
      return new (v || (v = Promise))(function(b, q) {
        function W(st) {
          try {
            nt(w.next(st));
          } catch (ot) {
            q(ot);
          }
        }
        function et(st) {
          try {
            nt(w.throw(st));
          } catch (ot) {
            q(ot);
          }
        }
        function nt(st) {
          st.done ? b(st.value) : h(st.value).then(W, et);
        }
        nt((w = w.apply(A, E || [])).next());
      });
    }, o = St && St.__generator || function(A, E) {
      var v = { label: 0, sent: function() {
        if (b[0] & 1) throw b[1];
        return b[1];
      }, trys: [], ops: [] }, w, h, b, q;
      return q = { next: W(0), throw: W(1), return: W(2) }, typeof Symbol == "function" && (q[Symbol.iterator] = function() {
        return this;
      }), q;
      function W(nt) {
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
          nt = E.call(A, v);
        } catch (st) {
          nt = [6, st], h = 0;
        } finally {
          w = b = 0;
        }
        if (nt[0] & 5) throw nt[1];
        return { value: nt[0] ? nt[1] : void 0, done: !0 };
      }
    }, a = St && St.__rest || function(A, E) {
      var v = {};
      for (var w in A) Object.prototype.hasOwnProperty.call(A, w) && E.indexOf(w) < 0 && (v[w] = A[w]);
      if (A != null && typeof Object.getOwnPropertySymbols == "function")
        for (var h = 0, w = Object.getOwnPropertySymbols(A); h < w.length; h++)
          E.indexOf(w[h]) < 0 && Object.prototype.propertyIsEnumerable.call(A, w[h]) && (v[w[h]] = A[w[h]]);
      return v;
    }, u = St && St.__importDefault || function(A) {
      return A && A.__esModule ? A : { default: A };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(xg), g = f, I = dw, C = yw, S = u(Ha), Q = ls, N = Oe, T = fs;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return T.ClientError;
    } });
    var F = function(A) {
      var E = {};
      return A && (typeof Headers < "u" && A instanceof Headers || g && g.Headers && A instanceof g.Headers ? E = p(A) : Array.isArray(A) ? A.forEach(function(v) {
        var w = v[0], h = v[1];
        E[w] = h;
      }) : E = A), E;
    }, Y = function(A) {
      return A.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, z = function(A) {
      var E = A.query, v = A.variables, w = A.operationName, h = A.jsonSerializer;
      if (!Array.isArray(E)) {
        var b = ["query=" + encodeURIComponent(Y(E))];
        return v && b.push("variables=" + encodeURIComponent(h.stringify(v))), w && b.push("operationName=" + encodeURIComponent(w)), b.join("&");
      }
      if (typeof v < "u" && !Array.isArray(v))
        throw new Error("Cannot create query with given variable type, array expected");
      var q = E.reduce(function(W, et, nt) {
        return W.push({
          query: Y(et),
          variables: v ? h.stringify(v[nt]) : void 0
        }), W;
      }, []);
      return "query=" + encodeURIComponent(h.stringify(q));
    }, H = function(A) {
      var E = A.url, v = A.query, w = A.variables, h = A.operationName, b = A.headers, q = A.fetch, W = A.fetchOptions, et = A.middleware;
      return i(void 0, void 0, void 0, function() {
        var nt, st;
        return o(this, function(ot) {
          switch (ot.label) {
            case 0:
              return nt = S.default(v, w, h, W.jsonSerializer), st = t({ method: "POST", headers: t(t({}, typeof nt == "string" ? { "Content-Type": "application/json" } : {}), b), body: nt }, W), et ? [4, Promise.resolve(et(st))] : [3, 2];
            case 1:
              st = ot.sent(), ot.label = 2;
            case 2:
              return [4, q(E, st)];
            case 3:
              return [2, ot.sent()];
          }
        });
      });
    }, M = function(A) {
      var E = A.url, v = A.query, w = A.variables, h = A.operationName, b = A.headers, q = A.fetch, W = A.fetchOptions, et = A.middleware;
      return i(void 0, void 0, void 0, function() {
        var nt, st;
        return o(this, function(ot) {
          switch (ot.label) {
            case 0:
              return nt = z({
                query: v,
                variables: w,
                operationName: h,
                jsonSerializer: W.jsonSerializer
              }), st = t({ method: "GET", headers: b }, W), et ? [4, Promise.resolve(et(st))] : [3, 2];
            case 1:
              st = ot.sent(), ot.label = 2;
            case 2:
              return [4, q(E + "?" + nt, st)];
            case 3:
              return [2, ot.sent()];
          }
        });
      });
    }, L = (
      /** @class */
      function() {
        function A(E, v) {
          v === void 0 && (v = {}), this.url = E, this.options = v;
        }
        return A.prototype.rawRequest = function(E, v, w) {
          return i(this, void 0, void 0, function() {
            var h, b, q, W, et, nt, st, ot, Ot, ht, dt, Dt;
            return o(this, function(At) {
              return h = N.parseRawRequestArgs(E, v, w), b = this.options, q = b.headers, W = b.fetch, et = W === void 0 ? f.default : W, nt = b.method, st = nt === void 0 ? "POST" : nt, ot = b.requestMiddleware, Ot = b.responseMiddleware, ht = a(b, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), dt = this.url, h.signal !== void 0 && (ht.signal = h.signal), Dt = B(h.query).operationName, [2, G({
                url: dt,
                query: h.query,
                variables: h.variables,
                headers: t(t({}, F(d(q))), F(h.requestHeaders)),
                operationName: Dt,
                fetch: et,
                method: st,
                fetchOptions: ht,
                middleware: ot
              }).then(function(yt) {
                return Ot && Ot(yt), yt;
              }).catch(function(yt) {
                throw Ot && Ot(yt), yt;
              })];
            });
          });
        }, A.prototype.request = function(E) {
          for (var v = [], w = 1; w < arguments.length; w++)
            v[w - 1] = arguments[w];
          var h = v[0], b = v[1], q = N.parseRequestArgs(E, h, b), W = this.options, et = W.headers, nt = W.fetch, st = nt === void 0 ? f.default : nt, ot = W.method, Ot = ot === void 0 ? "POST" : ot, ht = W.requestMiddleware, dt = W.responseMiddleware, Dt = a(W, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), At = this.url;
          q.signal !== void 0 && (Dt.signal = q.signal);
          var yt = B(q.document), Pr = yt.query, Mt = yt.operationName;
          return G({
            url: At,
            query: Pr,
            variables: q.variables,
            headers: t(t({}, F(d(et))), F(q.requestHeaders)),
            operationName: Mt,
            fetch: st,
            method: Ot,
            fetchOptions: Dt,
            middleware: ht
          }).then(function(Rt) {
            return dt && dt(Rt), Rt.data;
          }).catch(function(Rt) {
            throw dt && dt(Rt), Rt;
          });
        }, A.prototype.batchRequests = function(E, v) {
          var w = N.parseBatchRequestArgs(E, v), h = this.options, b = h.headers, q = h.fetch, W = q === void 0 ? f.default : q, et = h.method, nt = et === void 0 ? "POST" : et, st = h.requestMiddleware, ot = h.responseMiddleware, Ot = a(h, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ht = this.url;
          w.signal !== void 0 && (Ot.signal = w.signal);
          var dt = w.documents.map(function(At) {
            var yt = At.document;
            return B(yt).query;
          }), Dt = w.documents.map(function(At) {
            var yt = At.variables;
            return yt;
          });
          return G({
            url: ht,
            query: dt,
            variables: Dt,
            headers: t(t({}, F(d(b))), F(w.requestHeaders)),
            operationName: void 0,
            fetch: W,
            method: nt,
            fetchOptions: Ot,
            middleware: st
          }).then(function(At) {
            return ot && ot(At), At.data;
          }).catch(function(At) {
            throw ot && ot(At), At;
          });
        }, A.prototype.setHeaders = function(E) {
          return this.options.headers = E, this;
        }, A.prototype.setHeader = function(E, v) {
          var w, h = this.options.headers;
          return h ? h[E] = v : this.options.headers = (w = {}, w[E] = v, w), this;
        }, A.prototype.setEndpoint = function(E) {
          return this.url = E, this;
        }, A;
      }()
    );
    e.GraphQLClient = L;
    function G(A) {
      var E = A.url, v = A.query, w = A.variables, h = A.headers, b = A.operationName, q = A.fetch, W = A.method, et = W === void 0 ? "POST" : W, nt = A.fetchOptions, st = A.middleware;
      return i(this, void 0, void 0, function() {
        var ot, Ot, ht, dt, Dt, At, yt, Pr, Mt, Rt, On;
        return o(this, function(Ut) {
          switch (Ut.label) {
            case 0:
              return ot = et.toUpperCase() === "POST" ? H : M, Ot = Array.isArray(v), [4, ot({
                url: E,
                query: v,
                variables: w,
                operationName: b,
                headers: h,
                fetch: q,
                fetchOptions: nt,
                middleware: st
              })];
            case 1:
              return ht = Ut.sent(), [4, Z(ht, nt.jsonSerializer)];
            case 2:
              if (dt = Ut.sent(), Dt = Ot && Array.isArray(dt) ? !dt.some(function(zt) {
                var bs = zt.data;
                return !bs;
              }) : !!dt.data, At = !dt.errors || nt.errorPolicy === "all" || nt.errorPolicy === "ignore", ht.ok && At && Dt)
                return yt = ht.headers, Pr = ht.status, dt.errors, Mt = a(dt, ["errors"]), Rt = nt.errorPolicy === "ignore" ? Mt : dt, [2, t(t({}, Ot ? { data: Rt } : Rt), { headers: yt, status: Pr })];
              throw On = typeof dt == "string" ? { error: dt } : dt, new T.ClientError(t(t({}, On), { status: ht.status, headers: ht.headers }), { query: v, variables: w });
          }
        });
      });
    }
    function U(A, E, v, w) {
      return i(this, void 0, void 0, function() {
        var h, b;
        return o(this, function(q) {
          return h = N.parseRawRequestExtendedArgs(A, E, v, w), b = new L(h.url), [2, b.rawRequest(t({}, h))];
        });
      });
    }
    e.rawRequest = U;
    function k(A, E) {
      for (var v = [], w = 2; w < arguments.length; w++)
        v[w - 2] = arguments[w];
      return i(this, void 0, void 0, function() {
        var h, b, q, W;
        return o(this, function(et) {
          return h = v[0], b = v[1], q = N.parseRequestExtendedArgs(A, E, h, b), W = new L(q.url), [2, W.request(t({}, q))];
        });
      });
    }
    e.request = k;
    function J(A, E, v) {
      return i(this, void 0, void 0, function() {
        var w, h;
        return o(this, function(b) {
          return w = N.parseBatchRequestsExtendedArgs(A, E, v), h = new L(w.url), [2, h.batchRequests(t({}, w))];
        });
      });
    }
    e.batchRequests = J, e.default = k;
    function Z(A, E) {
      return E === void 0 && (E = Q.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var v, w, h;
        return o(this, function(b) {
          switch (b.label) {
            case 0:
              return A.headers.forEach(function(q, W) {
                W.toLowerCase() === "content-type" && (v = q);
              }), v && v.toLowerCase().startsWith("application/json") ? (h = (w = E).parse, [4, A.text()]) : [3, 2];
            case 1:
              return [2, h.apply(w, [b.sent()])];
            case 2:
              return [2, A.text()];
          }
        });
      });
    }
    function tt(A) {
      var E, v = void 0, w = A.definitions.filter(function(h) {
        return h.kind === "OperationDefinition";
      });
      return w.length === 1 && (v = (E = w[0].name) === null || E === void 0 ? void 0 : E.value), v;
    }
    function B(A) {
      if (typeof A == "string") {
        var E = void 0;
        try {
          var v = I.parse(A);
          E = tt(v);
        } catch {
        }
        return { query: A, operationName: E };
      }
      var w = tt(A);
      return { query: C.print(A), operationName: w };
    }
    e.resolveRequestDocument = B;
    function d(A) {
      return typeof A == "function" ? A() : A;
    }
    function _(A) {
      for (var E = [], v = 1; v < arguments.length; v++)
        E[v - 1] = arguments[v];
      return A.reduce(function(w, h, b) {
        return "" + w + h + (b in E ? E[b] : "");
      }, "");
    }
    e.gql = _;
    function p(A) {
      var E = {};
      return A.forEach(function(v, w) {
        E[w] = v;
      }), E;
    }
    var m = kw();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(ao)), ao;
}
var Pw = xh(), ti = function() {
  return ti = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, ti.apply(this, arguments);
};
var Ps = /* @__PURE__ */ new Map(), jo = /* @__PURE__ */ new Map(), Rh = !0, ei = !1;
function Sh(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Uw(e) {
  return Sh(e.source.body.substring(e.start, e.end));
}
function Gw(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = Uw(n.loc), o = jo.get(s);
      o && !o.has(i) ? Rh && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || jo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), ti(ti({}, e), { definitions: r });
}
function zw(e) {
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
function Vw(e) {
  var t = Sh(e);
  if (!Ps.has(t)) {
    var r = bh(e, {
      experimentalFragmentVariables: ei,
      allowLegacyFragmentVariables: ei
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ps.set(t, zw(Gw(r)));
  }
  return Ps.get(t);
}
function it(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), Vw(n);
}
function Yw() {
  Ps.clear(), jo.clear();
}
function Hw() {
  Rh = !1;
}
function Xw() {
  ei = !0;
}
function Zw() {
  ei = !1;
}
var Un = {
  gql: it,
  resetCaches: Yw,
  disableFragmentWarnings: Hw,
  enableExperimentalFragmentVariables: Xw,
  disableExperimentalFragmentVariables: Zw
};
(function(e) {
  e.gql = Un.gql, e.resetCaches = Un.resetCaches, e.disableFragmentWarnings = Un.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Un.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Un.disableExperimentalFragmentVariables;
})(it || (it = {}));
it.default = it;
var Qt = "0x0000000000000000000000000000000000000000000000000000000000000000", GC = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", zC = 16 * 1024, VC = 16, YC = 1024 * 1024 * 1024, HC = 1024 * 1024 * 1024, XC = 255, ZC = 1024 * 1024, WC = 1024 * 1024, Ww = "0xffffffffffff0000", Nh = "0xffffffffffff0001", jw = "0xffffffffffff0003", qw = "0xffffffffffff0004", Jw = "0xffffffffffff0005", jC = "0x0", $w = [
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
], Kw = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const Th = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Th.decode();
let Hn = null;
function Dh() {
  return (Hn === null || Hn.byteLength === 0) && (Hn = new Uint8Array(c.memory.buffer)), Hn;
}
function tm(e, t) {
  return e = e >>> 0, Th.decode(Dh().subarray(e, e + t));
}
function y(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
function em(e, t) {
  const r = c.gm_args(e, t);
  return V.__wrap(r);
}
function rm(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return V.__wrap(n);
}
function nm(e, t, r, n) {
  y(n, Lr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return V.__wrap(i);
}
function sm(e, t, r, n) {
  y(n, Lr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return V.__wrap(i);
}
function im(e, t, r, n) {
  y(n, As);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return V.__wrap(i);
}
function om(e, t, r, n) {
  y(n, As);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return V.__wrap(i);
}
function am(e, t, r, n) {
  y(n, gs);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return V.__wrap(i);
}
function cm(e, t, r, n) {
  y(n, gs);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return V.__wrap(i);
}
function dm(e, t, r, n) {
  y(n, ps);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return V.__wrap(i);
}
function um(e, t, r, n) {
  y(n, ps);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return V.__wrap(i);
}
function _m(e, t, r) {
  const n = c.add(e, t, r);
  return V.__wrap(n);
}
function hm(e, t, r) {
  const n = c.and(e, t, r);
  return V.__wrap(n);
}
function lm(e, t, r) {
  const n = c.div(e, t, r);
  return V.__wrap(n);
}
function fm(e, t, r) {
  const n = c.eq(e, t, r);
  return V.__wrap(n);
}
function pm(e, t, r) {
  const n = c.exp(e, t, r);
  return V.__wrap(n);
}
function Am(e, t, r) {
  const n = c.gt(e, t, r);
  return V.__wrap(n);
}
function gm(e, t, r) {
  const n = c.lt(e, t, r);
  return V.__wrap(n);
}
function wm(e, t, r) {
  const n = c.mlog(e, t, r);
  return V.__wrap(n);
}
function mm(e, t, r) {
  const n = c.mroo(e, t, r);
  return V.__wrap(n);
}
function ym(e, t, r) {
  const n = c.mod_(e, t, r);
  return V.__wrap(n);
}
function Zr(e, t) {
  const r = c.move_(e, t);
  return V.__wrap(r);
}
function bm(e, t, r) {
  const n = c.mul(e, t, r);
  return V.__wrap(n);
}
function Im(e, t) {
  const r = c.not(e, t);
  return V.__wrap(r);
}
function Em(e, t, r) {
  const n = c.or(e, t, r);
  return V.__wrap(n);
}
function vm(e, t, r) {
  const n = c.sll(e, t, r);
  return V.__wrap(n);
}
function Cm(e, t, r) {
  const n = c.srl(e, t, r);
  return V.__wrap(n);
}
function ri(e, t, r) {
  const n = c.sub(e, t, r);
  return V.__wrap(n);
}
function Bm(e, t, r) {
  const n = c.xor(e, t, r);
  return V.__wrap(n);
}
function xm(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return V.__wrap(s);
}
function Xa(e) {
  const t = c.ret(e);
  return V.__wrap(t);
}
function Rm(e, t) {
  const r = c.retd(e, t);
  return V.__wrap(r);
}
function Sm(e) {
  const t = c.aloc(e);
  return V.__wrap(t);
}
function Nm(e, t) {
  const r = c.mcl(e, t);
  return V.__wrap(r);
}
function Tm(e, t, r) {
  const n = c.mcp(e, t, r);
  return V.__wrap(n);
}
function Dm(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return V.__wrap(s);
}
function Qm(e, t) {
  const r = c.bhsh(e, t);
  return V.__wrap(r);
}
function Fm(e) {
  const t = c.bhei(e);
  return V.__wrap(t);
}
function Om(e, t) {
  const r = c.burn(e, t);
  return V.__wrap(r);
}
function qo(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return V.__wrap(s);
}
function Mm(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return V.__wrap(s);
}
function Lm(e, t) {
  const r = c.croo(e, t);
  return V.__wrap(r);
}
function km(e, t) {
  const r = c.csiz(e, t);
  return V.__wrap(r);
}
function Pm(e) {
  const t = c.cb(e);
  return V.__wrap(t);
}
function Wn(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return V.__wrap(s);
}
function Um(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return V.__wrap(s);
}
function Gm(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return V.__wrap(s);
}
function zm(e, t) {
  const r = c.mint(e, t);
  return V.__wrap(r);
}
function Vm(e) {
  const t = c.rvrt(e);
  return V.__wrap(t);
}
function Ym(e, t, r) {
  const n = c.scwq(e, t, r);
  return V.__wrap(n);
}
function Hm(e, t, r) {
  const n = c.srw(e, t, r);
  return V.__wrap(n);
}
function Xm(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return V.__wrap(s);
}
function Zm(e, t, r) {
  const n = c.sww(e, t, r);
  return V.__wrap(n);
}
function Wm(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return V.__wrap(s);
}
function Qh(e, t, r) {
  const n = c.tr(e, t, r);
  return V.__wrap(n);
}
function jm(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return V.__wrap(s);
}
function qm(e, t, r) {
  const n = c.eck1(e, t, r);
  return V.__wrap(n);
}
function Jm(e, t, r) {
  const n = c.ecr1(e, t, r);
  return V.__wrap(n);
}
function $m(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return V.__wrap(s);
}
function Km(e, t, r) {
  const n = c.k256(e, t, r);
  return V.__wrap(n);
}
function ty(e, t, r) {
  const n = c.s256(e, t, r);
  return V.__wrap(n);
}
function ey(e, t) {
  const r = c.time(e, t);
  return V.__wrap(r);
}
function ry() {
  const e = c.noop();
  return V.__wrap(e);
}
function ny(e) {
  const t = c.flag(e);
  return V.__wrap(t);
}
function sy(e, t, r) {
  const n = c.bal(e, t, r);
  return V.__wrap(n);
}
function ni(e) {
  const t = c.jmp(e);
  return V.__wrap(t);
}
function iy(e, t, r) {
  const n = c.jne(e, t, r);
  return V.__wrap(n);
}
function oy(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return V.__wrap(s);
}
function fr(e, t, r) {
  const n = c.addi(e, t, r);
  return V.__wrap(n);
}
function ay(e, t, r) {
  const n = c.andi(e, t, r);
  return V.__wrap(n);
}
function si(e, t, r) {
  const n = c.divi(e, t, r);
  return V.__wrap(n);
}
function cy(e, t, r) {
  const n = c.expi(e, t, r);
  return V.__wrap(n);
}
function dy(e, t, r) {
  const n = c.modi(e, t, r);
  return V.__wrap(n);
}
function uy(e, t, r) {
  const n = c.muli(e, t, r);
  return V.__wrap(n);
}
function _y(e, t, r) {
  const n = c.ori(e, t, r);
  return V.__wrap(n);
}
function hy(e, t, r) {
  const n = c.slli(e, t, r);
  return V.__wrap(n);
}
function ly(e, t, r) {
  const n = c.srli(e, t, r);
  return V.__wrap(n);
}
function Fh(e, t, r) {
  const n = c.subi(e, t, r);
  return V.__wrap(n);
}
function fy(e, t, r) {
  const n = c.xori(e, t, r);
  return V.__wrap(n);
}
function py(e, t, r) {
  const n = c.jnei(e, t, r);
  return V.__wrap(n);
}
function Ay(e, t, r) {
  const n = c.lb(e, t, r);
  return V.__wrap(n);
}
function ts(e, t, r) {
  const n = c.lw(e, t, r);
  return V.__wrap(n);
}
function gy(e, t, r) {
  const n = c.sb(e, t, r);
  return V.__wrap(n);
}
function wy(e, t, r) {
  const n = c.sw(e, t, r);
  return V.__wrap(n);
}
function my(e, t, r) {
  const n = c.mcpi(e, t, r);
  return V.__wrap(n);
}
function Oh(e, t, r) {
  const n = c.gtf(e, t, r);
  return V.__wrap(n);
}
function yy(e, t) {
  const r = c.mcli(e, t);
  return V.__wrap(r);
}
function by(e, t) {
  const r = c.gm(e, t);
  return V.__wrap(r);
}
function ln(e, t) {
  const r = c.movi(e, t);
  return V.__wrap(r);
}
function Iy(e, t) {
  const r = c.jnzi(e, t);
  return V.__wrap(r);
}
function Ey(e, t) {
  const r = c.jmpf(e, t);
  return V.__wrap(r);
}
function vy(e, t) {
  const r = c.jmpb(e, t);
  return V.__wrap(r);
}
function Cy(e, t, r) {
  const n = c.jnzf(e, t, r);
  return V.__wrap(n);
}
function Mh(e, t, r) {
  const n = c.jnzb(e, t, r);
  return V.__wrap(n);
}
function By(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return V.__wrap(s);
}
function xy(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return V.__wrap(s);
}
function Ry(e) {
  const t = c.ji(e);
  return V.__wrap(t);
}
function Sy(e) {
  const t = c.cfei(e);
  return V.__wrap(t);
}
function Ny(e) {
  const t = c.cfsi(e);
  return V.__wrap(t);
}
function Ty(e) {
  const t = c.cfe(e);
  return V.__wrap(t);
}
function Dy(e) {
  const t = c.cfs(e);
  return V.__wrap(t);
}
function Qy(e) {
  const t = c.pshl(e);
  return V.__wrap(t);
}
function Fy(e) {
  const t = c.pshh(e);
  return V.__wrap(t);
}
function Oy(e) {
  const t = c.popl(e);
  return V.__wrap(t);
}
function My(e) {
  const t = c.poph(e);
  return V.__wrap(t);
}
function Ly(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return V.__wrap(s);
}
function ky(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return V.__wrap(s);
}
function Py(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return V.__wrap(s);
}
function Uy(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return V.__wrap(s);
}
function Gy(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return V.__wrap(s);
}
function zy(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return V.__wrap(s);
}
function Vy(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return V.__wrap(s);
}
function Yy(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return V.__wrap(s);
}
function Hy(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return V.__wrap(s);
}
function Xy(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return V.__wrap(s);
}
function Zy(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return V.__wrap(s);
}
function Wy(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return V.__wrap(s);
}
function jy(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return V.__wrap(s);
}
function qy(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return V.__wrap(s);
}
function Jy(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return V.__wrap(s);
}
function ii(e, t) {
  const r = c.bsiz(e, t);
  return V.__wrap(r);
}
function $y(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return V.__wrap(s);
}
let zr = null;
function wd() {
  return (zr === null || zr.buffer.detached === !0 || zr.buffer.detached === void 0 && zr.buffer !== c.memory.buffer) && (zr = new DataView(c.memory.buffer)), zr;
}
function Ky(e, t) {
  return e = e >>> 0, Dh().subarray(e / 1, e / 1 + t);
}
const tb = Object.freeze({
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
}), eb = Object.freeze({
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
}), Lh = Object.freeze({
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
}), rb = Object.freeze({
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
}), nb = Object.freeze({
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
}), md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_add_free(e >>> 0, 1));
class sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, md.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, md.register(this, this.__wbg_ptr, this), this;
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
const yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_addi_free(e >>> 0, 1));
class ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, yd.register(this, this.__wbg_ptr, this), this;
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
const bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_aloc_free(e >>> 0, 1));
class ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bd.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, bd.register(this, this.__wbg_ptr, this), this;
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
const Id = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_and_free(e >>> 0, 1));
class ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Id.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Id.register(this, this.__wbg_ptr, this), this;
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
const Ed = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_andi_free(e >>> 0, 1));
class cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ed.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ed.register(this, this.__wbg_ptr, this), this;
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
const vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bal_free(e >>> 0, 1));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const Cd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhei_free(e >>> 0, 1));
class ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cd.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Cd.register(this, this.__wbg_ptr, this), this;
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
const Bd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhsh_free(e >>> 0, 1));
class _b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bd.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Bd.register(this, this.__wbg_ptr, this), this;
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
const xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bldd_free(e >>> 0, 1));
class hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xd.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, xd.register(this, this.__wbg_ptr, this), this;
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
const Rd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bsiz_free(e >>> 0, 1));
class lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rd.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Rd.register(this, this.__wbg_ptr, this), this;
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
const Sd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_burn_free(e >>> 0, 1));
class fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sd.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Sd.register(this, this.__wbg_ptr, this), this;
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
const Nd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_call_free(e >>> 0, 1));
class pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nd.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, Nd.register(this, this.__wbg_ptr, this), this;
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
const Td = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cb_free(e >>> 0, 1));
class Ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Td.unregister(this), t;
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
    y(t, l);
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
    return l.__wrap(t);
  }
}
const Dd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ccp_free(e >>> 0, 1));
class gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dd.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, Dd.register(this, this.__wbg_ptr, this), this;
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
const Qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfe_free(e >>> 0, 1));
class wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qd.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Qd.register(this, this.__wbg_ptr, this), this;
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
const Fd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfei_free(e >>> 0, 1));
class mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fd.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Fd.register(this, this.__wbg_ptr, this), this;
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
const Od = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfs_free(e >>> 0, 1));
class yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Od.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Od.register(this, this.__wbg_ptr, this), this;
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
const Md = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfsi_free(e >>> 0, 1));
class bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Md.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Md.register(this, this.__wbg_ptr, this), this;
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
const Ld = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_croo_free(e >>> 0, 1));
class Ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ld.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Ld.register(this, this.__wbg_ptr, this), this;
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
const kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_csiz_free(e >>> 0, 1));
class Eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kd.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, kd.register(this, this.__wbg_ptr, this), this;
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
const Pd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_compareargs_free(e >>> 0, 1));
class Lr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Lr.prototype);
    return r.__wbg_ptr = t, Pd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pd.unregister(this), t;
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
    return Ft.__wrap(r);
  }
  /**
  * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
  * @param {Imm06} bits
  * @returns {CompareArgs | undefined}
  */
  static from_imm(t) {
    y(t, Ft);
    var r = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(r);
    return n === 0 ? void 0 : Lr.__wrap(n);
  }
}
const Ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0, 1));
class vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ud.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ud.register(this, this.__wbg_ptr, this), this;
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
const Gd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divi_free(e >>> 0, 1));
class Cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Gd.register(this, this.__wbg_ptr, this), this;
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
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0, 1));
class ps {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bb.unregister(this), t;
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
const zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecal_free(e >>> 0, 1));
class xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zd.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, zd.register(this, this.__wbg_ptr, this), this;
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
const Vd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eck1_free(e >>> 0, 1));
class Rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Vd.register(this, this.__wbg_ptr, this), this;
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
const Yd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecr1_free(e >>> 0, 1));
class Sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const Hd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ed19_free(e >>> 0, 1));
class Nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hd.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, Hd.register(this, this.__wbg_ptr, this), this;
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
const Xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0, 1));
class Tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Xd.register(this, this.__wbg_ptr, this), this;
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
const Zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0, 1));
class Db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const Wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0, 1));
class Qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Wd.register(this, this.__wbg_ptr, this), this;
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
const jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_flag_free(e >>> 0, 1));
class Fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jd.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, jd.register(this, this.__wbg_ptr, this), this;
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
const uo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0, 1));
class oi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(oi.prototype);
    return r.__wbg_ptr = t, uo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uo.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, r);
    return oi.__wrap(s);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} selector
  */
  constructor(t, r) {
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, uo.register(this, this.__wbg_ptr, this), this;
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
    return Te.__wrap(t);
  }
}
const qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0, 1));
class Ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qd.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const _o = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0, 1));
class ai {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ai.prototype);
    return r.__wbg_ptr = t, _o.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _o.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    const o = c.gtf_from_args(s, i, n);
    return ai.__wrap(o);
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
    return this.__wbg_ptr = a >>> 0, _o.register(this, this.__wbg_ptr, this), this;
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
const Jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0, 1));
class Ft {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ft.prototype);
    return r.__wbg_ptr = t, Jd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t, 0);
  }
}
const $d = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm12_free(e >>> 0, 1));
class wt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(wt.prototype);
    return r.__wbg_ptr = t, $d.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $d.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t, 0);
  }
}
const Kd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm18_free(e >>> 0, 1));
class Te {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Te.prototype);
    return r.__wbg_ptr = t, Kd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kd.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t, 0);
  }
}
const tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm24_free(e >>> 0, 1));
class ve {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ve.prototype);
    return r.__wbg_ptr = t, tu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t, 0);
  }
}
const eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_instruction_free(e >>> 0, 1));
class V {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(V.prototype);
    return r.__wbg_ptr = t, eu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eu.unregister(this), t;
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
      var t = wd().getInt32(s + 4 * 0, !0), r = wd().getInt32(s + 4 * 1, !0), n = Ky(t, r).slice();
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
const ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ji_free(e >>> 0, 1));
class Mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ru.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, ru.register(this, this.__wbg_ptr, this), this;
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
const nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmp_free(e >>> 0, 1));
class Lb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nu.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, nu.register(this, this.__wbg_ptr, this), this;
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
const su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpb_free(e >>> 0, 1));
class kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, su.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, su.register(this, this.__wbg_ptr, this), this;
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
    return Te.__wrap(t);
  }
}
const iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpf_free(e >>> 0, 1));
class Pb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Te);
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
    return l.__wrap(t);
  }
  /**
  * Access the 18-bit immediate value.
  * @returns {Imm18}
  */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Te.__wrap(t);
  }
}
const ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jne_free(e >>> 0, 1));
class Ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ou.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, ou.register(this, this.__wbg_ptr, this), this;
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
const au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jneb_free(e >>> 0, 1));
class Gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, au.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, au.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnef_free(e >>> 0, 1));
class zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cu.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, cu.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnei_free(e >>> 0, 1));
class Vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, du.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, du.register(this, this.__wbg_ptr, this), this;
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
const uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzb_free(e >>> 0, 1));
class Yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, uu.register(this, this.__wbg_ptr, this), this;
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
const _u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzf_free(e >>> 0, 1));
class Hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _u.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, _u.register(this, this.__wbg_ptr, this), this;
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
const hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzi_free(e >>> 0, 1));
class Xb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, hu.register(this, this.__wbg_ptr, this), this;
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
    return Te.__wrap(t);
  }
}
const lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_k256_free(e >>> 0, 1));
class Zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, lu.register(this, this.__wbg_ptr, this), this;
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
const fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lb_free(e >>> 0, 1));
class Wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
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
const pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ldc_free(e >>> 0, 1));
class jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pu.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, pu.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const Au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_log_free(e >>> 0, 1));
class qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Au.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, Au.register(this, this.__wbg_ptr, this), this;
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
const gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_logd_free(e >>> 0, 1));
class Jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gu.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, gu.register(this, this.__wbg_ptr, this), this;
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
const wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lt_free(e >>> 0, 1));
class $b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lw_free(e >>> 0, 1));
class Kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
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
const yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcl_free(e >>> 0, 1));
class tI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
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
const bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcli_free(e >>> 0, 1));
class eI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, bu.register(this, this.__wbg_ptr, this), this;
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
    return Te.__wrap(t);
  }
}
const Iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcp_free(e >>> 0, 1));
class rI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Iu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Iu.register(this, this.__wbg_ptr, this), this;
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
const Eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcpi_free(e >>> 0, 1));
class nI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Eu.register(this, this.__wbg_ptr, this), this;
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
const vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_meq_free(e >>> 0, 1));
class sI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vu.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, vu.register(this, this.__wbg_ptr, this), this;
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
const Cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mint_free(e >>> 0, 1));
class iI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
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
const Bu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mldv_free(e >>> 0, 1));
class oI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bu.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, Bu.register(this, this.__wbg_ptr, this), this;
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
const xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mlog_free(e >>> 0, 1));
class aI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const Ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mod_free(e >>> 0, 1));
class cI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ru.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ru.register(this, this.__wbg_ptr, this), this;
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
const Su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_modi_free(e >>> 0, 1));
class dI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Su.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Su.register(this, this.__wbg_ptr, this), this;
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
const Nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_move_free(e >>> 0, 1));
class uI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Nu.register(this, this.__wbg_ptr, this), this;
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
const Tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_movi_free(e >>> 0, 1));
class _I {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, Te);
    var s = r.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Tu.register(this, this.__wbg_ptr, this), this;
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
    return Te.__wrap(t);
  }
}
const Du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mroo_free(e >>> 0, 1));
class hI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Du.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const Qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mul_free(e >>> 0, 1));
class lI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const Fu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_muli_free(e >>> 0, 1));
class fI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
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
const pI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0, 1));
class As {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pI.unregister(this), t;
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
const AI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0, 1));
class gs {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, AI.unregister(this), t;
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
const Ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_noop_free(e >>> 0, 1));
class gI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ou.unregister(this), t;
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
    return this.__wbg_ptr = t >>> 0, Ou.register(this, this.__wbg_ptr, this), this;
  }
}
const Mu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_not_free(e >>> 0, 1));
class wI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Mu.register(this, this.__wbg_ptr, this), this;
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
const Lu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_or_free(e >>> 0, 1));
class mI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
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
const ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ori_free(e >>> 0, 1));
class yI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ku.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
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
const Pu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_poph_free(e >>> 0, 1));
class bI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pu.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Pu.register(this, this.__wbg_ptr, this), this;
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
const Uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_popl_free(e >>> 0, 1));
class II {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uu.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Uu.register(this, this.__wbg_ptr, this), this;
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
const Gu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshh_free(e >>> 0, 1));
class EI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gu.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Gu.register(this, this.__wbg_ptr, this), this;
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
const zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshl_free(e >>> 0, 1));
class vI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zu.unregister(this), t;
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
    y(t, ve);
    var r = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, zu.register(this, this.__wbg_ptr, this), this;
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
const Vu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_panicinstruction_free(e >>> 0, 1));
class CI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vu.unregister(this), t;
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
    return this.__wbg_ptr = n >>> 0, Vu.register(this, this.__wbg_ptr, this), this;
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
const Yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ret_free(e >>> 0, 1));
class BI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yu.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Yu.register(this, this.__wbg_ptr, this), this;
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
const Hu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_retd_free(e >>> 0, 1));
class xI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hu.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Hu.register(this, this.__wbg_ptr, this), this;
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
const Xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0, 1));
class RI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xu.unregister(this), t;
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
    y(t, l);
    var r = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(r);
    return this.__wbg_ptr = n >>> 0, Xu.register(this, this.__wbg_ptr, this), this;
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
const ho = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0, 1));
class l {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(l.prototype);
    return r.__wbg_ptr = t, ho.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ho.unregister(this), t;
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
    return this.__wbg_ptr = r >>> 0, ho.register(this, this.__wbg_ptr, this), this;
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
const Zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0, 1));
class SI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Zu.register(this, this.__wbg_ptr, this), this;
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
const Wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sb_free(e >>> 0, 1));
class NI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Wu.register(this, this.__wbg_ptr, this), this;
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
const ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_scwq_free(e >>> 0, 1));
class TI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ju.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, ju.register(this, this.__wbg_ptr, this), this;
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
const qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0, 1));
class DI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qu.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, qu.register(this, this.__wbg_ptr, this), this;
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
const Ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0, 1));
class QI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ju.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ju.register(this, this.__wbg_ptr, this), this;
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
const $u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_smo_free(e >>> 0, 1));
class FI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $u.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, $u.register(this, this.__wbg_ptr, this), this;
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
const Ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srl_free(e >>> 0, 1));
class OI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ku.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, Ku.register(this, this.__wbg_ptr, this), this;
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
const t0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srli_free(e >>> 0, 1));
class MI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, t0.register(this, this.__wbg_ptr, this), this;
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
const e0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srw_free(e >>> 0, 1));
class LI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, e0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, e0.register(this, this.__wbg_ptr, this), this;
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
const r0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srwq_free(e >>> 0, 1));
class kI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, r0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, r0.register(this, this.__wbg_ptr, this), this;
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
const n0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sub_free(e >>> 0, 1));
class PI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, n0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, n0.register(this, this.__wbg_ptr, this), this;
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
const s0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_subi_free(e >>> 0, 1));
class UI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, s0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, s0.register(this, this.__wbg_ptr, this), this;
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
const i0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sw_free(e >>> 0, 1));
class GI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, i0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, i0.register(this, this.__wbg_ptr, this), this;
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
const o0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sww_free(e >>> 0, 1));
class zI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, o0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, o0.register(this, this.__wbg_ptr, this), this;
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
const a0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_swwq_free(e >>> 0, 1));
class VI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, a0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, a0.register(this, this.__wbg_ptr, this), this;
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
const c0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_time_free(e >>> 0, 1));
class YI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, c0.unregister(this), t;
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
    y(t, l);
    var n = t.__destroy_into_raw();
    y(r, l);
    var s = r.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, c0.register(this, this.__wbg_ptr, this), this;
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
const d0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tr_free(e >>> 0, 1));
class HI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, d0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, d0.register(this, this.__wbg_ptr, this), this;
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
const u0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tro_free(e >>> 0, 1));
class XI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, u0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, u0.register(this, this.__wbg_ptr, this), this;
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
const _0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdam_free(e >>> 0, 1));
class ZI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, _0.register(this, this.__wbg_ptr, this), this;
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
const lo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0, 1));
class ci {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ci.prototype);
    return r.__wbg_ptr = t, lo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lo.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Lr);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_from_args(i, o, a, u);
    return ci.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, lo.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const fo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0, 1));
class di {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(di.prototype);
    return r.__wbg_ptr = t, fo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fo.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, ps);
    var u = s.__destroy_into_raw();
    const f = c.wddv_from_args(i, o, a, u);
    return di.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, fo.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const h0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0, 1));
class WI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, h0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, h0.register(this, this.__wbg_ptr, this), this;
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
const po = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0, 1));
class ui {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ui.prototype);
    return r.__wbg_ptr = t, po.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, po.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, gs);
    var u = s.__destroy_into_raw();
    const f = c.wdml_from_args(i, o, a, u);
    return ui.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, po.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const l0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0, 1));
class jI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, l0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, l0.register(this, this.__wbg_ptr, this), this;
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
const Ao = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0, 1));
class _i {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(_i.prototype);
    return r.__wbg_ptr = t, Ao.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ao.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, As);
    var u = s.__destroy_into_raw();
    const f = c.wdop_from_args(i, o, a, u);
    return _i.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, Ao.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const f0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqam_free(e >>> 0, 1));
class qI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, f0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, f0.register(this, this.__wbg_ptr, this), this;
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
const go = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0, 1));
class hi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(hi.prototype);
    return r.__wbg_ptr = t, go.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, go.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, Lr);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_from_args(i, o, a, u);
    return hi.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, go.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const wo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0, 1));
class li {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(li.prototype);
    return r.__wbg_ptr = t, wo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wo.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, ps);
    var u = s.__destroy_into_raw();
    const f = c.wddv_from_args(i, o, a, u);
    return li.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, wo.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const p0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0, 1));
class JI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, p0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, p0.register(this, this.__wbg_ptr, this), this;
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
const mo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0, 1));
class fi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(fi.prototype);
    return r.__wbg_ptr = t, mo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mo.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, gs);
    var u = s.__destroy_into_raw();
    const f = c.wdml_from_args(i, o, a, u);
    return fi.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, mo.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const A0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0, 1));
class $I {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, A0.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, l);
    var u = s.__destroy_into_raw();
    const f = c.bldd_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, A0.register(this, this.__wbg_ptr, this), this;
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
const yo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0, 1));
class pi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(pi.prototype);
    return r.__wbg_ptr = t, yo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yo.unregister(this), t;
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
    y(t, l);
    var i = t.__destroy_into_raw();
    y(r, l);
    var o = r.__destroy_into_raw();
    y(n, l);
    var a = n.__destroy_into_raw();
    y(s, As);
    var u = s.__destroy_into_raw();
    const f = c.wdop_from_args(i, o, a, u);
    return pi.__wrap(f);
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
    y(s, Ft);
    var u = s.__destroy_into_raw();
    const f = c.wdcm_new_typescript(i, o, a, u);
    return this.__wbg_ptr = f >>> 0, yo.register(this, this.__wbg_ptr, this), this;
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
    return Ft.__wrap(t);
  }
}
const g0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xor_free(e >>> 0, 1));
class KI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, g0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, l);
    var o = n.__destroy_into_raw();
    const a = c.add_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, g0.register(this, this.__wbg_ptr, this), this;
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
const w0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xori_free(e >>> 0, 1));
class t1 {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, w0.unregister(this), t;
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
    y(t, l);
    var s = t.__destroy_into_raw();
    y(r, l);
    var i = r.__destroy_into_raw();
    y(n, wt);
    var o = n.__destroy_into_raw();
    const a = c.addi_new_typescript(s, i, o);
    return this.__wbg_ptr = a >>> 0, w0.register(this, this.__wbg_ptr, this), this;
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
async function e1(e, t) {
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
function kh() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(tm(t, r));
  }, e;
}
function Ph(e, t) {
  return c = e.exports, Uh.__wbindgen_wasm_module = t, zr = null, Hn = null, c;
}
function r1(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module: e } = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
  const t = kh();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return Ph(r, e);
}
async function Uh(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead");
  const t = kh(), { instance: r, module: n } = await e1(await e, t);
  return Ph(r, n);
}
function n1(e, t, r, n) {
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
function s1(e) {
  return n1(1, null, "AGFzbQEAAAABOgpgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAABf2AFf39/f38Bf2ABfwBgA39/fwBgAAACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cAAwP/Af0BAQEDAwMDAwMBAQMDAQEBAwMBAQEEAQMDAwEBAwEBAQQCAQMCAgICAgIDAwMEBAQEBAQEBAEBAQMDAAICBAQEBAQEBAQEBAABAQgDAwQBAQEBAQEBAgcDAQAAAQEDBwcBAwEDAgIBAQEAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQUBAQEBBAAEAQYCAgMDAAIABwEIBAEEAQkDAQEHAQUFBQUFBQUFBQUFBQUFBQUFBQUDBgYCAgQCBgYAAAgABAUDAQARBgkBfwFBgIDAAAsHjUzPBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlABAaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUASBpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQA4Il9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMASSJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAEsSY29tcGFyZWFyZ3NfdG9faW1tAFgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AHxVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AASBVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAORJfX3diZ19tdWxhcmdzX2ZyZWUAER5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMASB5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMATBJfX3diZ19kaXZhcmdzX2ZyZWUAIx5fX3diZ19nZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAuQEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAGMbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlABchcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AE0XcGFuaWNpbnN0cnVjdGlvbl9yZWFzb24AWxxwYW5pY2luc3RydWN0aW9uX2luc3RydWN0aW9uAFwMZ21fZnJvbV9hcmdzANUBDWd0Zl9mcm9tX2FyZ3MAzQEHZ21fYXJncwCIAQhndGZfYXJncwBpDndkY21fZnJvbV9hcmdzADsOd2RvcF9mcm9tX2FyZ3MAOw53ZG1sX2Zyb21fYXJncwA8DndkZHZfZnJvbV9hcmdzAMkBCXdkY21fYXJncwAkCXdxY21fYXJncwAlCXdkb3BfYXJncwAmCXdxb3BfYXJncwAnCXdkbWxfYXJncwAoCXdxbWxfYXJncwApCXdkZHZfYXJncwBkCXdxZHZfYXJncwBlEF9fd2JnX2ltbTA2X2ZyZWUAKhBfX3diZ19pbW0xMl9mcmVlACsQX193YmdfaW1tMThfZnJlZQAsDl9fd2JnX2FkZF9mcmVlABgPX193Ymdfbm9vcF9mcmVlAAcSYWRkX25ld190eXBlc2NyaXB0AFkGYWRkX3JhADUGYWRkX3JiABIGYWRkX3JjABoDYWRkAMUBA2FuZACKAQNkaXYAiwECZXEAjAEDZXhwAI0BAmd0AI4BAmx0AI8BBG1sb2cAkAEEbXJvbwCRAQRtb2RfAJIBBW1vdmVfAD0DbXVsAJMBA25vdAA+Am9yAJQBA3NsbACVAQNzcmwAlgEDc3ViAJcBA3hvcgCYAQRtbGR2AGoDcmV0ALoBBHJldGQAPxNhbG9jX25ld190eXBlc2NyaXB0AGAHYWxvY19yYQAiBGFsb2MAuwEDbWNsAEADbWNwAJkBA21lcQBrE2Joc2hfbmV3X3R5cGVzY3JpcHQAIARiaHNoAC0EYmhlaQC8AQRidXJuAEEEY2FsbABsA2NjcABtBGNyb28AQgRjc2l6AEMCY2IAvQEDbGRjAG4DbG9nAG8EbG9nZABwBG1pbnQARARydnJ0AL4BBHNjd3EAmgEDc3J3AJsBBHNyd3EAcQNzd3cAnAEEc3d3cQByAnRyAJ0BA3RybwBzBGVjazEAngEEZWNyMQCfAQRlZDE5AHQEazI1NgCgAQRzMjU2AKEBBHRpbWUARRNub29wX25ld190eXBlc2NyaXB0AL8BBG5vb3AA3QEEZmxhZwDAAQNiYWwAogEDam1wAMEBA2puZQCjAQNzbW8AdRNhZGRpX25ld190eXBlc2NyaXB0AFoKYWRkaV9pbW0xMgAJBGFkZGkApAEEYW5kaQClAQRkaXZpAKYBBGV4cGkApwEEbW9kaQCoAQRtdWxpAKkBA29yaQCqAQRzbGxpAKsBBHNybGkArAEEc3ViaQCtAQR4b3JpAK4BBGpuZWkArwECbGIAsAECbHcAsQECc2IAsgECc3cAswEEbWNwaQC0ARJndGZfbmV3X3R5cGVzY3JpcHQAzwEDZ3RmALUBBG1jbGkALhFnbV9uZXdfdHlwZXNjcmlwdABGCGdtX2ltbTE4AA0CZ20ALwRtb3ZpADAEam56aQAxBGptcGYAMhNqbXBiX25ld190eXBlc2NyaXB0ABUEam1wYgAzBGpuemYAtgEEam56YgC3AQRqbmVmAHYKam5lYl9pbW0wNgA2BGpuZWIAdwJqaQBOE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0AAoEY2ZlaQBPBGNmc2kAUANjZmUAwgEDY2ZzAMMBBHBzaGwAUQRwc2hoAFIEcG9wbABTBHBvcGgAVBN3ZGNtX25ld190eXBlc2NyaXB0AMoBBHdkY20AeAR3cWNtAHkEd2RvcAB6BHdxb3AAewR3ZG1sAHwEd3FtbAB9BHdkZHYAfgR3cWR2AH8Ed2RtZACAAQR3cW1kAIEBBHdkYW0AggEEd3FhbQCDAQR3ZG1tAIQBBHdxbW0AhQEEZWNhbACGAQRic2l6ADQTYmxkZF9uZXdfdHlwZXNjcmlwdABVB2JsZGRfcmQANgRibGRkAIcBFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADBRpbnN0cnVjdGlvbl90b19ieXRlcwAGEGluc3RydWN0aW9uX3NpemUA7wERcmVnaWRfbmV3X2NoZWNrZWQAuAEJcmVnaWRfYmFsAN4BCnJlZ2lkX2NnYXMA3wEJcmVnaWRfZXJyAOABCnJlZ2lkX2ZsYWcA4QEIcmVnaWRfZnAA4gEKcmVnaWRfZ2dhcwDjAQhyZWdpZF9ocADkAQhyZWdpZF9pcwDlAQhyZWdpZF9vZgDmAQlyZWdpZF9vbmUA5wEIcmVnaWRfcGMA6AEJcmVnaWRfcmV0AOkBCnJlZ2lkX3JldGwA6gEIcmVnaWRfc3AA6wEJcmVnaWRfc3BwAOwBDnJlZ2lkX3dyaXRhYmxlAO0BCnJlZ2lkX3plcm8A7gEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA2QELcmVnaWRfdG9fdTgA2gESYW5kX25ld190eXBlc2NyaXB0AFkSZGl2X25ld190eXBlc2NyaXB0AFkRZXFfbmV3X3R5cGVzY3JpcHQAWRJleHBfbmV3X3R5cGVzY3JpcHQAWRFndF9uZXdfdHlwZXNjcmlwdABZEWx0X25ld190eXBlc2NyaXB0AFkTbWxvZ19uZXdfdHlwZXNjcmlwdABZE21yb29fbmV3X3R5cGVzY3JpcHQAWRJtb2RfbmV3X3R5cGVzY3JpcHQAWRJtdWxfbmV3X3R5cGVzY3JpcHQAWRFvcl9uZXdfdHlwZXNjcmlwdABZEnNsbF9uZXdfdHlwZXNjcmlwdABZEnNybF9uZXdfdHlwZXNjcmlwdABZEnN1Yl9uZXdfdHlwZXNjcmlwdABZEnhvcl9uZXdfdHlwZXNjcmlwdABZEm1jcF9uZXdfdHlwZXNjcmlwdABZE3Njd3FfbmV3X3R5cGVzY3JpcHQAWRJzcndfbmV3X3R5cGVzY3JpcHQAWRJzd3dfbmV3X3R5cGVzY3JpcHQAWRF0cl9uZXdfdHlwZXNjcmlwdABZE2VjazFfbmV3X3R5cGVzY3JpcHQAWRNlY3IxX25ld190eXBlc2NyaXB0AFkTazI1Nl9uZXdfdHlwZXNjcmlwdABZE3MyNTZfbmV3X3R5cGVzY3JpcHQAWRJiYWxfbmV3X3R5cGVzY3JpcHQAWRJqbmVfbmV3X3R5cGVzY3JpcHQAWRNhbmRpX25ld190eXBlc2NyaXB0AFoTZGl2aV9uZXdfdHlwZXNjcmlwdABaE2V4cGlfbmV3X3R5cGVzY3JpcHQAWhNtb2RpX25ld190eXBlc2NyaXB0AFoTbXVsaV9uZXdfdHlwZXNjcmlwdABaEm9yaV9uZXdfdHlwZXNjcmlwdABaE3NsbGlfbmV3X3R5cGVzY3JpcHQAWhNzcmxpX25ld190eXBlc2NyaXB0AFoTc3ViaV9uZXdfdHlwZXNjcmlwdABaE3hvcmlfbmV3X3R5cGVzY3JpcHQAWhNqbmVpX25ld190eXBlc2NyaXB0AFoRbGJfbmV3X3R5cGVzY3JpcHQAWhFsd19uZXdfdHlwZXNjcmlwdABaEXNiX25ld190eXBlc2NyaXB0AFoRc3dfbmV3X3R5cGVzY3JpcHQAWhNtY3BpX25ld190eXBlc2NyaXB0AFoTam56Zl9uZXdfdHlwZXNjcmlwdABaE2puemJfbmV3X3R5cGVzY3JpcHQAWhFqaV9uZXdfdHlwZXNjcmlwdAA3E2Nmc2lfbmV3X3R5cGVzY3JpcHQANxNwc2hsX25ld190eXBlc2NyaXB0ADcTcHNoaF9uZXdfdHlwZXNjcmlwdAA3E3BvcGxfbmV3X3R5cGVzY3JpcHQANxNwb3BoX25ld190eXBlc2NyaXB0ADcTbW92aV9uZXdfdHlwZXNjcmlwdAAVE21jbGlfbmV3X3R5cGVzY3JpcHQAFRNqbnppX25ld190eXBlc2NyaXB0ABUTam1wZl9uZXdfdHlwZXNjcmlwdAAVEm5vdF9uZXdfdHlwZXNjcmlwdAAgE3JldGRfbmV3X3R5cGVzY3JpcHQAIBNtb3ZlX25ld190eXBlc2NyaXB0ACASbWNsX25ld190eXBlc2NyaXB0ACATYnVybl9uZXdfdHlwZXNjcmlwdAAgE2Nyb29fbmV3X3R5cGVzY3JpcHQAIBNjc2l6X25ld190eXBlc2NyaXB0ACATbWludF9uZXdfdHlwZXNjcmlwdAAgE3RpbWVfbmV3X3R5cGVzY3JpcHQAIBNic2l6X25ld190eXBlc2NyaXB0ACAGcmV0X3JhACIHYmhlaV9yYQAiBWNiX3JhACIHcnZydF9yYQAiB2ZsYWdfcmEAIgZqbXBfcmEAIghqaV9pbW0yNAAKCmNmc2lfaW1tMjQACgZjZmVfcmEAIgZjZnNfcmEAIgpwc2hsX2ltbTI0AAoKcHNoaF9pbW0yNAAKCnBvcGxfaW1tMjQACgpwb3BoX2ltbTI0AAoTbWxkdl9uZXdfdHlwZXNjcmlwdABVEm1lcV9uZXdfdHlwZXNjcmlwdABVEmNjcF9uZXdfdHlwZXNjcmlwdABVEmxvZ19uZXdfdHlwZXNjcmlwdABVE2xvZ2RfbmV3X3R5cGVzY3JpcHQAVRNzcndxX25ld190eXBlc2NyaXB0AFUTc3d3cV9uZXdfdHlwZXNjcmlwdABVEnRyb19uZXdfdHlwZXNjcmlwdABVE2VkMTlfbmV3X3R5cGVzY3JpcHQAVRJzbW9fbmV3X3R5cGVzY3JpcHQAVRJsZGNfbmV3X3R5cGVzY3JpcHQAVRNqbmVmX25ld190eXBlc2NyaXB0AFUTd2RtZF9uZXdfdHlwZXNjcmlwdABVE3dxbWRfbmV3X3R5cGVzY3JpcHQAVRN3ZGFtX25ld190eXBlc2NyaXB0AFUTd3FhbV9uZXdfdHlwZXNjcmlwdABVE3dkbW1fbmV3X3R5cGVzY3JpcHQAVRN3cW1tX25ld190eXBlc2NyaXB0AFUTZWNhbF9uZXdfdHlwZXNjcmlwdABVE2NhbGxfbmV3X3R5cGVzY3JpcHQAVRNfX3diZ19tYXRoYXJnc19mcmVlABAfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwBLHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X2xocwBLH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMASR5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9saHMASRJyZXRfbmV3X3R5cGVzY3JpcHQAYBNiaGVpX25ld190eXBlc2NyaXB0AGARY2JfbmV3X3R5cGVzY3JpcHQAYBNydnJ0X25ld190eXBlc2NyaXB0AGATZmxhZ19uZXdfdHlwZXNjcmlwdABgEmptcF9uZXdfdHlwZXNjcmlwdABgEmNmZV9uZXdfdHlwZXNjcmlwdABgEmNmc19uZXdfdHlwZXNjcmlwdABgD19fd2JnX3RpbWVfZnJlZQAYDl9fd2JnX21jbF9mcmVlABgPX193YmdfcG9wbF9mcmVlABgNX193YmdfbHRfZnJlZQAYD19fd2JnX2puemJfZnJlZQAYDl9fd2JnX3Nyd19mcmVlABgPX193Ymdfd3FtbF9mcmVlABgPX193YmdfazI1Nl9mcmVlABgNX193YmdfbGJfZnJlZQAYD19fd2JnX2puZWJfZnJlZQAYD19fd2JnX3JldGRfZnJlZQAYD19fd2JnX2V4cGlfZnJlZQAYD19fd2JnX3N3d3FfZnJlZQAYD19fd2JnX2Nyb29fZnJlZQAYDl9fd2JnX3Ntb19mcmVlABgOX193YmdfbGRjX2ZyZWUAGA9fX3diZ19tbG9nX2ZyZWUAGA9fX3diZ19ic2l6X2ZyZWUAGA1fX3diZ19lcV9mcmVlABgPX193YmdfbWNsaV9mcmVlABgPX193YmdfeG9yaV9mcmVlABgPX193YmdfYW5kaV9mcmVlABgPX193Ymdfd3FvcF9mcmVlABgPX193Ymdfd2RjbV9mcmVlABgPX193YmdfcHNoaF9mcmVlABgPX193Ymdfc3ViaV9mcmVlABgNX193Ymdfb3JfZnJlZQAYD19fd2JnX2puemlfZnJlZQAYD19fd2JnX3dkbWRfZnJlZQAYDV9fd2JnX2dtX2ZyZWUAGA5fX3diZ19zcmxfZnJlZQAYD19fd2JnX3NybGlfZnJlZQAYD19fd2JnX2ZsYWdfZnJlZQAYD19fd2JnX3dkYW1fZnJlZQAYD19fd2JnX21vZGlfZnJlZQAYD19fd2JnX3dxYW1fZnJlZQAYD19fd2JnX2VjazFfZnJlZQAYDl9fd2JnX2Nmc19mcmVlABgPX193Ymdfam5laV9mcmVlABgPX193YmdfczI1Nl9mcmVlABgPX193YmdfYmxkZF9mcmVlABgOX193YmdfbW9kX2ZyZWUAGA9fX3diZ19zY3dxX2ZyZWUAGA5fX3diZ19hbmRfZnJlZQAYDl9fd2JnX3Ryb19mcmVlABgPX193Ymdfc3J3cV9mcmVlABgPX193YmdfcG9waF9mcmVlABgOX193Ymdfc3d3X2ZyZWUAGA9fX3diZ193ZGR2X2ZyZWUAGA5fX3diZ19tY3BfZnJlZQAYDV9fd2JnX3NiX2ZyZWUAGA9fX3diZ19lY2FsX2ZyZWUAGA5fX3diZ19qbmVfZnJlZQAYD19fd2JnX2Fsb2NfZnJlZQAYD19fd2JnX2puemZfZnJlZQAYD19fd2JnX2NhbGxfZnJlZQAYD19fd2JnX3J2cnRfZnJlZQAYD19fd2JnX3dxbW1fZnJlZQAYD19fd2JnX21vdmlfZnJlZQAYD19fd2JnX3dkbWxfZnJlZQAYD19fd2JnX2JoZWlfZnJlZQAYDl9fd2JnX2NmZV9mcmVlABgPX193Ymdfc2xsaV9mcmVlABgPX193YmdfbWludF9mcmVlABgPX193YmdfcHNobF9mcmVlABgOX193YmdfZGl2X2ZyZWUAGA9fX3diZ19tY3BpX2ZyZWUAGA9fX3diZ193cWR2X2ZyZWUAGA9fX3diZ19kaXZpX2ZyZWUAGA5fX3diZ19iYWxfZnJlZQAYDl9fd2JnX2V4cF9mcmVlABgOX193Ymdfc3ViX2ZyZWUAGA9fX3diZ19qbmVmX2ZyZWUAGA9fX3diZ19tb3ZlX2ZyZWUAGA9fX3diZ19jZnNpX2ZyZWUAGA5fX3diZ19jY3BfZnJlZQAYD19fd2JnX2VkMTlfZnJlZQAYDl9fd2JnX2ptcF9mcmVlABgPX193YmdfYWRkaV9mcmVlABgOX193YmdfcmV0X2ZyZWUAGA5fX3diZ19zbGxfZnJlZQAYDl9fd2JnX29yaV9mcmVlABgPX193Ymdfd2RvcF9mcmVlABgPX193YmdfbG9nZF9mcmVlABgPX193Ymdfd3FjbV9mcmVlABgNX193YmdfY2JfZnJlZQAYD19fd2JnX2J1cm5fZnJlZQAYD19fd2JnX3dkbW1fZnJlZQAYDl9fd2JnX2d0Zl9mcmVlABgNX193Ymdfc3dfZnJlZQAYDV9fd2JnX2ppX2ZyZWUAGA9fX3diZ19jc2l6X2ZyZWUAGA1fX3diZ19ndF9mcmVlABgOX193YmdfbXVsX2ZyZWUAGA9fX3diZ19tdWxpX2ZyZWUAGA9fX3diZ19jZmVpX2ZyZWUAGA9fX3diZ19lY3IxX2ZyZWUAGA5fX3diZ19tZXFfZnJlZQAYD19fd2JnX3dxbWRfZnJlZQAYD19fd2JnX21yb29fZnJlZQAYD19fd2JnX21sZHZfZnJlZQAYD19fd2JnX2ptcGJfZnJlZQAYD19fd2JnX2Joc2hfZnJlZQAYDV9fd2JnX3RyX2ZyZWUAGA5fX3diZ194b3JfZnJlZQAYDV9fd2JnX2x3X2ZyZWUAGA5fX3diZ19sb2dfZnJlZQAYD19fd2JnX2ptcGZfZnJlZQAYDl9fd2JnX25vdF9mcmVlABgTd3Fkdl9uZXdfdHlwZXNjcmlwdADKARN3cW1sX25ld190eXBlc2NyaXB0AMoBE3dkbWxfbmV3X3R5cGVzY3JpcHQAygETd3FvcF9uZXdfdHlwZXNjcmlwdADKARN3ZG9wX25ld190eXBlc2NyaXB0AMoBE3dxY21fbmV3X3R5cGVzY3JpcHQAygETd2Rkdl9uZXdfdHlwZXNjcmlwdADKAQ53cWNtX2Zyb21fYXJncwA7CndxZHZfaW1tMDYANgp3cW1sX2ltbTA2ADYKd2RtbF9pbW0wNgA2Cndxb3BfaW1tMDYANgp3ZG9wX2ltbTA2ADYKd3FjbV9pbW0wNgA2CndkZHZfaW1tMDYANgp3ZGNtX2ltbTA2ADYKam5lZl9pbW0wNgA2CWxkY19pbW0wNgA2DndxbWxfZnJvbV9hcmdzADwOd3FvcF9mcm9tX2FyZ3MAOwVnbV9yYQA1BWd0X3JjABoFZ3RfcmIAEgVndF9yYQA1BWxiX3JiABIFbGJfcmEANQVsdF9yYwAaBWx0X3JiABIFbHRfcmEANQhsd19pbW0xMgAJBWx3X3JiABIFbHdfcmEANQVvcl9yYwAaBW9yX3JiABIFb3JfcmEANQhzYl9pbW0xMgAJBXNiX3JiABIFc2JfcmEANQhzd19pbW0xMgAJBXN3X3JiABIFc3dfcmEANQV0cl9yYwAaBXRyX3JiABIFdHJfcmEANQVlcV9yYwAaBWVxX3JiABIFZXFfcmEANQZhbmRfcmMAGgZhbmRfcmIAEgZhbmRfcmEANQZiYWxfcmMAGgZiYWxfcmIAEgZiYWxfcmEANQZjY3BfcmMAGgZjY3BfcmIAEgZjY3BfcmEANQZkaXZfcmMAGgZkaXZfcmIAEgZkaXZfcmEANQZleHBfcmMAGgZleHBfcmIAEgZleHBfcmEANQhsYl9pbW0xMgAJBmd0Zl9yYgASBmd0Zl9yYQA1BmpuZV9yYwAaBmpuZV9yYgASBmpuZV9yYQA1BmxkY19yYwAaBmxkY19yYgASBmxkY19yYQA1BmxvZ19yZAA2BmxvZ19yYwAaBmxvZ19yYgASBmxvZ19yYQA1Bm1jbF9yYgASBm1jbF9yYQA1Bm1jcF9yYwAaBm1jcF9yYgASBm1jcF9yYQA1Bm1lcV9yZAA2Bm1lcV9yYwAaBm1lcV9yYgASBm1lcV9yYQA1Bm1vZF9yYwAaBm1vZF9yYgASBm1vZF9yYQA1Bm11bF9yYwAaBm11bF9yYgASBm11bF9yYQA1Bm5vdF9yYgASBm5vdF9yYQA1CW9yaV9pbW0xMgAJBm9yaV9yYgASBm9yaV9yYQA1BnNsbF9yYwAaBnNsbF9yYgASBnNsbF9yYQA1BnNtb19yZAA2BnNtb19yYwAaBnNtb19yYgASBnNtb19yYQA1BnNybF9yYwAaBnNybF9yYgASBnNybF9yYQA1BnNyd19yYwAaBnNyd19yYgASBnNyd19yYQA1BnN1Yl9yYwAaBnN1Yl9yYgASBnN1Yl9yYQA1BnN3d19yYwAaBnN3d19yYgASBnN3d19yYQA1BnRyb19yZAA2BnRyb19yYwAaBnRyb19yYgASBnRyb19yYQA1Bnhvcl9yYwAaBnhvcl9yYgASBnhvcl9yYQA1CWd0Zl9pbW0xMgAJB2FkZGlfcmIAEgdhZGRpX3JhADUKYW5kaV9pbW0xMgAJB2FuZGlfcmIAEgdhbmRpX3JhADUHYmhzaF9yYgASB2Joc2hfcmEANQZjY3BfcmQANgdibGRkX3JjABoHYmxkZF9yYgASB2JsZGRfcmEANQdic2l6X3JiABIHYnNpel9yYQA1B2J1cm5fcmIAEgdidXJuX3JhADUHY2FsbF9yZAA2B2NhbGxfcmMAGgdjYWxsX3JiABIHY2FsbF9yYQA1B2Nyb29fcmIAEgdjcm9vX3JhADUHY3Npel9yYgASB2NzaXpfcmEANQpkaXZpX2ltbTEyAAkHZGl2aV9yYgASB2RpdmlfcmEANQdlY2FsX3JkADYHZWNhbF9yYwAaB2VjYWxfcmIAEgdlY2FsX3JhADUHZWNrMV9yYwAaB2VjazFfcmIAEgdlY2sxX3JhADUHZWNyMV9yYwAaB2VjcjFfcmIAEgdlY3IxX3JhADUHZWQxOV9yZAA2B2VkMTlfcmMAGgdlZDE5X3JiABIHZWQxOV9yYQA1CmV4cGlfaW1tMTIACQdleHBpX3JiABIHZXhwaV9yYQA1CmptcGJfaW1tMTgADQdqbXBiX3JhADUKam1wZl9pbW0xOAANB2ptcGZfcmEANQdqbmViX3JjABoHam5lYl9yYgASB2puZWJfcmEANQdqbmVmX3JjABoHam5lZl9yYgASB2puZWZfcmEANQpqbmVpX2ltbTEyAAkHam5laV9yYgASB2puZWlfcmEANQpqbnpiX2ltbTEyAAkHam56Yl9yYgASB2puemJfcmEANQpqbnpmX2ltbTEyAAkHam56Zl9yYgASB2puemZfcmEANQpqbnppX2ltbTE4AA0Ham56aV9yYQA1B2syNTZfcmMAGgdrMjU2X3JiABIHazI1Nl9yYQA1B2xvZ2RfcmQANgdsb2dkX3JjABoHbG9nZF9yYgASB2xvZ2RfcmEANQptY2xpX2ltbTE4AA0HbWNsaV9yYQA1Cm1jcGlfaW1tMTIACQdtY3BpX3JiABIHbWNwaV9yYQA1B21pbnRfcmIAEgdtaW50X3JhADUHbWxkdl9yZAA2B21sZHZfcmMAGgdtbGR2X3JiABIHbWxkdl9yYQA1B21sb2dfcmMAGgdtbG9nX3JiABIHbWxvZ19yYQA1Cm1vZGlfaW1tMTIACQdtb2RpX3JiABIHbW9kaV9yYQA1B21vdmVfcmIAEgdtb3ZlX3JhADUKbW92aV9pbW0xOAANB21vdmlfcmEANQdtcm9vX3JjABoHbXJvb19yYgASB21yb29fcmEANQptdWxpX2ltbTEyAAkHbXVsaV9yYgASB211bGlfcmEANQdyZXRkX3JiABIHcmV0ZF9yYQA1B3MyNTZfcmMAGgdzMjU2X3JiABIHczI1Nl9yYQA1B3Njd3FfcmMAGgdzY3dxX3JiABIHc2N3cV9yYQA1CnNsbGlfaW1tMTIACQdzbGxpX3JiABIHc2xsaV9yYQA1CnNybGlfaW1tMTIACQdzcmxpX3JiABIHc3JsaV9yYQA1B3Nyd3FfcmQANgdzcndxX3JjABoHc3J3cV9yYgASB3Nyd3FfcmEANQpzdWJpX2ltbTEyAAkHc3ViaV9yYgASB3N1YmlfcmEANQdzd3dxX3JkADYHc3d3cV9yYwAaB3N3d3FfcmIAEgdzd3dxX3JhADUHdGltZV9yYgASB3RpbWVfcmEANQd3ZGFtX3JkADYHd2RhbV9yYwAaB3dkYW1fcmIAEgd3ZGFtX3JhADUHd2RjbV9yYwAaB3dkY21fcmIAEgd3ZGNtX3JhADUHd2Rkdl9yYwAaB3dkZHZfcmIAEgd3ZGR2X3JhADUHd2RtZF9yZAA2B3dkbWRfcmMAGgd3ZG1kX3JiABIHd2RtZF9yYQA1B3dkbWxfcmMAGgd3ZG1sX3JiABIHd2RtbF9yYQA1B3dkbW1fcmQANgd3ZG1tX3JjABoHd2RtbV9yYgASB3dkbW1fcmEANQd3ZG9wX3JjABoHd2RvcF9yYgASB3dkb3BfcmEANQd3cWFtX3JkADYHd3FhbV9yYwAaB3dxYW1fcmIAEgd3cWFtX3JhADUHd3FjbV9yYwAaB3dxY21fcmIAEgd3cWNtX3JhADUHd3Fkdl9yYwAaB3dxZHZfcmIAEgd3cWR2X3JhADUHd3FtZF9yZAA2B3dxbWRfcmMAGgd3cW1kX3JiABIHd3FtZF9yYQA1B3dxbWxfcmMAGgd3cW1sX3JiABIHd3FtbF9yYQA1B3dxbW1fcmQANgd3cW1tX3JjABoHd3FtbV9yYgASB3dxbW1fcmEANQd3cW9wX3JjABoHd3FvcF9yYgASB3dxb3BfcmEANQp4b3JpX2ltbTEyAAkHeG9yaV9yYgASB3hvcmlfcmEANRNqbmViX25ld190eXBlc2NyaXB0AFUQX193YmdfcmVnaWRfZnJlZQAqDndxZHZfZnJvbV9hcmdzAMkBEF9fd2JnX2ltbTI0X2ZyZWUALB9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyANYBE19fd2JpbmRnZW5fZXhwb3J0XzAA0gEKgXv9Ae0iAgh/AX4CQAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQUgAEELaiIAQXhxIQVB5I7AACgCACIIRQ0EQQAgBWshBAJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRByIvAAGooAgAiAkUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEDA0ACQCACKAIEQXhxIgYgBUkNACAGIAVrIgYgBE8NACACIQEgBiIEDQBBACEEIAEhAAwECyACKAIUIgYgACAGIAIgA0EddkEEcWpBEGooAgAiAkcbIAAgBhshACADQQF0IQMgAg0ACwwBC0HgjsAAKAIAIgJBECAAQQtqQfgDcSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQdiMwABqIgMgAEHgjMAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0HgjsAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB6I7AACgCAE0NAwJAAkAgAUUEQEHkjsAAKAIAIgBFDQYgAGhBAnRByIvAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgASgCFCIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACKAIUIgAbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyACQRRqIAJBEGogABshAwNAIAMhBiABIgBBFGogAEEQaiAAKAIUIgEbIQMgAEEUQRAgARtqKAIAIgENAAsgBkEANgIACyAHRQ0EIAIgAigCHEECdEHIi8AAaiIBKAIARwRAIAdBEEEUIAcoAhAgAkYbaiAANgIAIABFDQUMBAsgASAANgIAIAANA0HkjsAAQeSOwAAoAgBBfiACKAIcd3E2AgAMBAsgACgCBEF4cSAFayIBIAQgASAESSIBGyEEIAAgAiABGyECIAAhAQwACwALAkBBAiAAdCIDQQAgA2tyIAEgAHRxaCIAQQN0IgFB2IzAAGoiAyABQeCMwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeCOwAAgAkF+IAB3cTYCAAsgASAFQQNyNgIEIAEgBWoiBiAAQQN0IgAgBWsiBEEBcjYCBCAAIAFqIAQ2AgBB6I7AACgCACICBEAgAkF4cUHYjMAAaiEAQfCOwAAoAgAhAwJ/QeCOwAAoAgAiBUEBIAJBA3Z0IgJxRQRAQeCOwAAgAiAFcjYCACAADAELIAAoAggLIQIgACADNgIIIAIgAzYCDCADIAA2AgwgAyACNgIIC0HwjsAAIAY2AgBB6I7AACAENgIAIAFBCGoPCyAAIAc2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAigCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkACQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiBSAEQQFyNgIEIAQgBWogBDYCAEHojsAAKAIAIgNFDQEgA0F4cUHYjMAAaiEAQfCOwAAoAgAhAQJ/QeCOwAAoAgAiBkEBIANBA3Z0IgNxRQRAQeCOwAAgAyAGcjYCACAADAELIAAoAggLIQMgACABNgIIIAMgATYCDCABIAA2AgwgASADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIEDAELQfCOwAAgBTYCAEHojsAAIAQ2AgALIAJBCGoPCyAAIAFyRQRAQQAhAUECIAd0IgBBACAAa3IgCHEiAEUNAyAAaEECdEHIi8AAaigCACEACyAARQ0BCwNAIAAgASAAKAIEQXhxIgMgBWsiBiAESSIHGyEIIAAoAhAiAkUEQCAAKAIUIQILIAEgCCADIAVJIgAbIQEgBCAGIAQgBxsgABshBCACIgANAAsLIAFFDQAgBUHojsAAKAIAIgBNIAQgACAFa09xDQAgASgCGCEHAkACQCABIAEoAgwiAEYEQCABQRRBECABKAIUIgAbaigCACICDQFBACEADAILIAEoAggiAiAANgIMIAAgAjYCCAwBCyABQRRqIAFBEGogABshAwNAIAMhBiACIgBBFGogAEEQaiAAKAIUIgIbIQMgAEEUQRAgAhtqKAIAIgINAAsgBkEANgIACyAHRQ0DIAEgASgCHEECdEHIi8AAaiICKAIARwRAIAdBEEEUIAcoAhAgAUYbaiAANgIAIABFDQQMAwsgAiAANgIAIAANAkHkjsAAQeSOwAAoAgBBfiABKAIcd3E2AgAMAwsCQAJAAkACQAJAIAVB6I7AACgCACIBSwRAIAVB7I7AACgCACIATwRAQQAhBCAFQa+ABGoiAEEQdkAAIgFBf0YiAw0HIAFBEHQiAkUNB0H4jsAAQQAgAEGAgHxxIAMbIgRB+I7AACgCAGoiADYCAEH8jsAAQfyOwAAoAgAiASAAIAAgAUkbNgIAAkACQEH0jsAAKAIAIgMEQEHIjMAAIQADQCAAKAIAIgEgACgCBCIGaiACRg0CIAAoAggiAA0ACwwCC0GEj8AAKAIAIgBBACAAIAJNG0UEQEGEj8AAIAI2AgALQYiPwABB/x82AgBBzIzAACAENgIAQciMwAAgAjYCAEHkjMAAQdiMwAA2AgBB7IzAAEHgjMAANgIAQeCMwABB2IzAADYCAEH0jMAAQeiMwAA2AgBB6IzAAEHgjMAANgIAQfyMwABB8IzAADYCAEHwjMAAQeiMwAA2AgBBhI3AAEH4jMAANgIAQfiMwABB8IzAADYCAEGMjcAAQYCNwAA2AgBBgI3AAEH4jMAANgIAQZSNwABBiI3AADYCAEGIjcAAQYCNwAA2AgBBnI3AAEGQjcAANgIAQZCNwABBiI3AADYCAEHUjMAAQQA2AgBBpI3AAEGYjcAANgIAQZiNwABBkI3AADYCAEGgjcAAQZiNwAA2AgBBrI3AAEGgjcAANgIAQaiNwABBoI3AADYCAEG0jcAAQaiNwAA2AgBBsI3AAEGojcAANgIAQbyNwABBsI3AADYCAEG4jcAAQbCNwAA2AgBBxI3AAEG4jcAANgIAQcCNwABBuI3AADYCAEHMjcAAQcCNwAA2AgBByI3AAEHAjcAANgIAQdSNwABByI3AADYCAEHQjcAAQciNwAA2AgBB3I3AAEHQjcAANgIAQdiNwABB0I3AADYCAEHkjcAAQdiNwAA2AgBB7I3AAEHgjcAANgIAQeCNwABB2I3AADYCAEH0jcAAQeiNwAA2AgBB6I3AAEHgjcAANgIAQfyNwABB8I3AADYCAEHwjcAAQeiNwAA2AgBBhI7AAEH4jcAANgIAQfiNwABB8I3AADYCAEGMjsAAQYCOwAA2AgBBgI7AAEH4jcAANgIAQZSOwABBiI7AADYCAEGIjsAAQYCOwAA2AgBBnI7AAEGQjsAANgIAQZCOwABBiI7AADYCAEGkjsAAQZiOwAA2AgBBmI7AAEGQjsAANgIAQayOwABBoI7AADYCAEGgjsAAQZiOwAA2AgBBtI7AAEGojsAANgIAQaiOwABBoI7AADYCAEG8jsAAQbCOwAA2AgBBsI7AAEGojsAANgIAQcSOwABBuI7AADYCAEG4jsAAQbCOwAA2AgBBzI7AAEHAjsAANgIAQcCOwABBuI7AADYCAEHUjsAAQciOwAA2AgBByI7AAEHAjsAANgIAQdyOwABB0I7AADYCAEHQjsAAQciOwAA2AgBB9I7AACACNgIAQdiOwABB0I7AADYCAEHsjsAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQYCPwABBgICAATYCAAwICyACIANNIAEgA0tyDQAgACgCDEUNAwtBhI/AAEGEj8AAKAIAIgAgAiAAIAJJGzYCACACIARqIQFByIzAACEAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgACgCDEUNAQtByIzAACEAA0ACQCADIAAoAgAiAU8EQCABIAAoAgRqIgYgA0sNAQsgACgCCCEADAELC0H0jsAAIAI2AgBB7I7AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGAj8AAQYCAgAE2AgAgAyAGQSBrQXhxQQhrIgAgACADQRBqSRsiAUEbNgIEQciMwAApAgAhCSABQRBqQdCMwAApAgA3AgAgASAJNwIIQcyMwAAgBDYCAEHIjMAAIAI2AgBB0IzAACABQQhqNgIAQdSMwABBADYCACABQRxqIQADQCAAQQc2AgAgAEEEaiIAIAZJDQALIAEgA0YNByABIAEoAgRBfnE2AgQgAyABIANrIgBBAXI2AgQgASAANgIAIABBgAJPBEAgAyAAEAUMCAsgAEF4cUHYjMAAaiEBAn9B4I7AACgCACICQQEgAEEDdnQiAHFFBEBB4I7AACAAIAJyNgIAIAEMAQsgASgCCAshACABIAM2AgggACADNgIMIAMgATYCDCADIAA2AggMBwsgACACNgIAIAAgACgCBCAEajYCBCACIAVBA3I2AgQgASACIAVqIgNrIQUgAUH0jsAAKAIARg0DIAFB8I7AACgCAEYNBCABKAIEIgRBA3FBAUYEQCABIARBeHEiABAEIAAgBWohBSAAIAFqIgEoAgQhBAsgASAEQX5xNgIEIAMgBUEBcjYCBCADIAVqIAU2AgAgBUGAAk8EQCADIAUQBQwGCyAFQXhxQdiMwABqIQACf0HgjsAAKAIAIgFBASAFQQN2dCIEcUUEQEHgjsAAIAEgBHI2AgAgAAwBCyAAKAIICyEFIAAgAzYCCCAFIAM2AgwgAyAANgIMIAMgBTYCCAwFC0HsjsAAIAAgBWsiATYCAEH0jsAAQfSOwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIaiEEDAYLQfCOwAAoAgAhAAJAIAEgBWsiAkEPTQRAQfCOwABBADYCAEHojsAAQQA2AgAgACABQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAELQeiOwAAgAjYCAEHwjsAAIAAgBWoiAzYCACADIAJBAXI2AgQgACABaiACNgIAIAAgBUEDcjYCBAsMCAsgACAEIAZqNgIEQfSOwABB9I7AACgCACIAQQ9qQXhxIgFBCGsiAjYCAEHsjsAAQeyOwAAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRBgI/AAEGAgIABNgIADAMLQfSOwAAgAzYCAEHsjsAAQeyOwAAoAgAgBWoiADYCACADIABBAXI2AgQMAQtB8I7AACADNgIAQeiOwABB6I7AACgCACAFaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgALIAJBCGoPC0EAIQRB7I7AACgCACIAIAVNDQBB7I7AACAAIAVrIgE2AgBB9I7AAEH0jsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEDAMLIAQPCyAAIAc2AhggASgCECICBEAgACACNgIQIAIgADYCGAsgASgCFCICRQ0AIAAgAjYCFCACIAA2AhgLAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgIgBEEBcjYCBCACIARqIAQ2AgAgBEGAAk8EQCACIAQQBQwCCyAEQXhxQdiMwABqIQACf0HgjsAAKAIAIgNBASAEQQN2dCIEcUUEQEHgjsAAIAMgBHI2AgAgAAwBCyAAKAIICyEEIAAgAjYCCCAEIAI2AgwgAiAANgIMIAIgBDYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsgAUEIag8LIABBCGoL+wQBAX8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcILAkKCwwNLCwsLCwsLCwsLCwsLCwsLCwsDg8sLCwQAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5BAQIDBAUGQgcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N0JCODkACwJAIABBgAprDgU8PT4/QAALIABBgAhrDgI5OkELQQIPC0EDDwtBBA8LQQUPC0EGDwtBBw8LQQkPC0EKDwtBCw8LQQwPC0ENDwtBDg8LQYECDwtBggIPC0GDAg8LQYQCDwtBhQIPC0GGAg8LQYcCDwtBiAIPC0GJAg8LQYoCDwtBgAQPC0GBBA8LQYIEDwtBgwQPC0GEBA8LQYUEDwtBhgQPC0GHBA8LQYkEDwtBigQPC0GLBA8LQYwEDwtBjQQPC0GgBA8LQaEEDwtBpQQPC0HABA8LQcEEDwtBwgQPC0HDBA8LQcQEDwtBxQQPC0HGBA8LQccEDwtByAQPC0HJBA8LQcoEDwtBywQPC0GABg8LQYEGDwtBggYPC0GDBg8LQYQGDwtBhwYPC0GIBg8LQYAIDwtBgQgPC0GACg8LQYEKDwtBggoPC0GDCg8LQYQKIQELIAEPC0HggsAAQRkQ2AEAC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAECwJAAkACQCACKAIEIgNBAnFFBEAgAkH0jsAAKAIARg0CIAJB8I7AACgCAEYNAyACIANBeHEiAhAEIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfCOwAAoAgBHDQFB6I7AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAUPCyABQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASABQQN2dCIBcUUEQEHgjsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfSOwAAgADYCAEHsjsAAQeyOwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEHwjsAAKAIARw0BQeiOwABBADYCAEHwjsAAQQA2AgAPC0HwjsAAIAA2AgBB6I7AAEHojsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QciLwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeSOwABB5I7AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB4I7AAEHgjsAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QciLwABqIQRBASACdCIDQeSOwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHkjsAAQeSOwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDQASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ0wEiAg0CCwALENcBAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBWIABBBDYCBCAAIAI2AgALiwEBAn8gABDQASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/ENgBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQGQsLdQIBfwF+IAEQ0AEgAUEIayICKAIAQQFGBEAgATUCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQgGDPAAAIAAgA6dBCHZBAXE6AAEPC0H5gsAAQT8Q2AEAC3cBAn8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCIALwAAIABBAmotAABBEHRyENwBIQIgASgCCCABKAIMEMsBQRBBBBDGASIAIAJBCHZBgB5xIAJBGHZyOwEMIABBADYCCCAAQoGAgIAQNwIAIAFBEGokACAAQQhqC2wBAn8gABDQASAAQQhrIgEgASgCAEEBaiICNgIAAkAgAgRAIAAoAgBBf0YNASAALwAEIABBBmotAABBEHRyENwBIQAgARBeIABBCHZBgP4DcSAAQRh2ciAAQYD+A3FBCHRyEGcPCwALENcBAAtvAQJ/IAEQ0AEgAUEIayICKAIAQQFGBEAgASgCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQQh2OgABIAAgA0EBcToAAA8LQfmCwABBPxDYAQALawEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRw0BIAAoAgQgAkEANgIAAkAgAkF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAJBEBAZCxDbAQ8LIAIQVg8LQfmCwABBPxDYAQALYQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA/gNxIABBGHZyIABBgAZxQQh0chBnIAFBEGokAAtqAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQQI2AhQgAUH0gMAANgIQIAFCATcCHCABQQE2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQVwALIAFBMGokACAAC2sBAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQQI2AhQgAUG4gcAANgIQIAFCATcCHCABQQI2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQVwALIAFBMGokACAAC2MBAn8jAEEQayICJAACQCABRQRAIAJBCGogABALDAELIAAQ0AEgAEEIayIBIAEoAgBBAWsiAzYCACADDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLIAJBEGokAAtjAQJ/IwBBEGsiAiQAAkAgAUUEQCACQQhqIAAQCAwBCyAAENABIABBCGsiASABKAIAQQFrIgM2AgAgAw0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCyACQRBqJAALXgEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA4ANxIABBgAZxQQh0ckEMdhBoIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ9gELFgAgAEHQgsAAQcCCwABBgICACBD2AQtgAQF/IAAQGyECIAEQHiEAQRBBBBDGASIBQoGAgIAQNwIAIAEgAEEQdEGAgPwHcSAAIAJB/wFxQRJ0ciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnKtQiCGNwIIIAFBCGoLXAECfyAAENABIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZC0EBcQ8LQfmCwABBPxDYAQALYAEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEUEBkPC0H5gsAAQT8Q2AEACyACEF8LC2ABAX8gABDQASAAQQhrIQICQCABRQRAIAIoAgBBAUYEQCACQQA2AgAgAkF/Rg0CIABBBGsiACAAKAIAQQFrIgA2AgAgAA0CIAJBEBAZDwtB+YLAAEE/ENgBAAsgAhBeCwvQBgEEfwJAIABBBGsoAgAiBCICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgAEEIayIBIAQiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADAILIAEgAxAECwJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfSOwAAoAgBGDQIgAkHwjsAAKAIARg0EIAIgA0F4cSICEAQgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB8I7AACgCAEcNAUHojsAAIAA2AgAMBQsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQEgASAAEAVBACEBQYiPwABBiI/AACgCAEEBayIANgIAIAANA0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAMAwtB9I7AACABNgIAQeyOwABB7I7AACgCACAAaiIANgIAIAEgAEEBcjYCBEHwjsAAKAIAIAFGBEBB6I7AAEEANgIAQfCOwABBADYCAAsgAEGAj8AAKAIAIgNNDQJB9I7AACgCACICRQ0CQQAhAQJAQeyOwAAoAgAiBEEpSQ0AQciMwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAgAyAETw0CQYCPwABBfzYCAAwCCyAAQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASAAQQN2dCIAcUUEQEHgjsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCAwBC0HwjsAAIAE2AgBB6I7AAEHojsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAsPC0GpicAAQS5B2InAABBKAAtB6InAAEEuQZiKwAAQSgALVQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEOdkE8cSAAQR52chBoIAFBEGokAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAEQ0AEgAUEIayIDIAMoAgBBAWoiAjYCAAJAIAIEQCABKAIAIgJBf0YNASAAIAM2AgggACABNgIEIAAgAUEEajYCACABIAJBAWo2AgAPCwALENcBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC8BBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgACgCBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtRAQJ/AkAgABAbIgBBGHENACAAQQdxIgJBB0YNAEEQQQQQxgEiAUKBgICAEDcCACABIABBBXZBAXGtQiCGIAKtQiiGhDcCCCABQQhqIQELIAELVwEBfyAAEBshAiABEBshAUEQQQQQxgEiAEKBgICAEDcCACAAIAFB/wFxQQx0IAJBEnRyIgFBgOADcUEIdCABQQh2QYD+A3FyQQh2rUIghjcCCCAAQQhqC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENABIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ1AEgARBeEGgPCwALENcBAAtOAQF/IAFFBEAgABAWGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPgBCxAAIAAgASACIANB4wAQ+AELTgEBfyABRQRAIAAQGxoPCyAAENABIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLC04BAX8gAUUEQCAAEB0aDwsgABDQASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCwtOAQF/IAFFBEAgABAeGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLDwAgACABQYCAgMgBEPkBCwwAIAAgAUHLABD6AQsMACAAIAFBzAAQ+gELDAAgACABQc0AEPoBCwwAIAAgAUHOABD6AQsMACAAIAFBzwAQ+gELDAAgACABQdAAEPoBCw8AIAAgAUGAgIDoBhD5AQtFAQF/IwBBEGsiASQAIAFBBGogABAcIAEoAgQiAC8AACAAQQJqLQAAQRB0chDUASABKAIIIAEoAgwQywEQaCABQRBqJAALSwEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AFBGHZBP3EgASgCCCABKAIMEMsBEGggAUEQaiQAC04BAX8gABAeIQBBEEEEEMYBIgFCgYCAgBA3AgAgASAAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2cq1CIIY3AgggAUEIagsLACAAIAFBBxD7AQsLACAAIAFBCBD7AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCyAELQAIIAQtAAkQyAEQYiAEQRBqJAALOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCCAELQAIIAQtAAkQiQEQYiAEQRBqJAALCwAgACABQQoQ/AELCwAgACABQQwQ/AELCwAgACABQRQQ/AELCwAgACABQRYQ/AELCwAgACABQRsQ/AELCwAgACABQR4Q/AELCwAgACABQR8Q/AELCwAgACABQSQQ/AELCwAgACABQTIQ/AELPgAgABAbIQAgARAeIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEGILOAAgAkEQdEGAgPwHcSABQf8BcUEMdCIBIAJyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILPAECfyMAQRBrIgEkACAAENABIAFBCGogABBdIAEoAggtAAEgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzwBAn8jAEEQayIBJAAgABDQASABQQhqIAAQXSABKAIILQAAIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAtBAQF/IwBBIGsiAyQAIANBADYCECADQQE2AgQgA0IENwIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBXAAs5AQF/IwBBEGsiAiQAIAAQ0AEgAkEIaiAAEGEgAigCDCACKAIIIAFBAEc6AABBADYCACACQRBqJAALOQEBfyMAQRBrIgIkACAAENABIAJBCGogABBhIAIoAgwgAigCCCABQQBHOgABQQA2AgAgAkEQaiQAC0MBAX8gAEE5TwRAQeCCwABBGRDYAQALQRRBBBDGASICIAA6ABAgAiABNgIMIAJBADYCCCACQoGAgIAQNwIAIAJBCGoLCgAgAEHVABD9AQsKACAAQdYAEP0BCwoAIABB1wAQ/QELCgAgAEHaABD9AQsKACAAQdsAEP0BCwoAIABB3AAQ/QELCgAgAEHdABD9AQs+ACAAEBsgARAbIAIQGyADEBsQISEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags7AQF/IAAgACgCAEEBayIBNgIAAkAgAQ0AIAAoAgwQ2wEgACAAKAIEQQFrIgE2AgQgAQ0AIABBEBAZCwvIAQEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQaiHwAA2AhAgAkEBNgIMIAJBDGoiACgCCCIBRQRAQfyGwABBK0HEisAAEEoACyABKAIMGiABKAIEGiAALQAQIQEgAC0AERpBxIvAAEHEi8AAKAIAIgBBAWo2AgACQCAAQQBIDQBBkI/AAC0AAEEBcQ0AQYyPwABBjI/AACgCAEEBajYCAEHAi8AAKAIAQQBIDQBBkI/AAEEAOgAAIAFFDQAACwALLwEBfyMAQRBrIgEkACABQQhqIAAQCyABLQAJQSBBACABLQAIG3IQaCABQRBqJAALOgAgABAbIAEQGyACEBsQOiEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags6ACAAEBsgARAbIAIQHRBHIQFBEEEEEMYBIgBCgYCAgBA3AgAgACABrUL///8Hg0IghjcCCCAAQQhqCzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBC0ABCABKAIIIAEoAgwQzAEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCgCACABKAIIIAEoAgwQzAEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDXAQALCQAgAEEQEPABCwkAIABBFBDwAQszAQF/IAAQGyEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAUECdEH8AXGtQiCGNwIIIABBCGoLKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENcBAAssAQF/QRBBBBDGASIBQoGAgIAQNwIAIAEgAK1C////B4NCIIY3AgggAUEIagskACAAENABIAAoAgAEQBDXAQALIABBADYCACAAIAFBAEc6AAQLKAAgAxAWIQMgABDHASABEMcBIAIQxwEgAxDOAUEIdEHkAHIQ0QEQZwsoACADEBYhAyAAEMcBIAEQxwEgAhDHASADEM4BQQh0QeUAchDRARBnCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ2AEACykBAX9BEEEEEMYBIgEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCykBAX9BEEEEEMYBIgEgADoADCABQQA2AgggAUKBgICAEDcCACABQQhqCyIAIAIQAiECIAAQxwEgARDHASACEEdBCHRBygByENEBEGcLDwAgACABIAIgA0ESEPEBCw8AIAAgASACIANBGBDxAQsPACAAIAEgAiADQRwQ8QELDwAgACABIAIgA0EdEPEBCw8AIAAgASACIANBIRDyAQsPACAAIAEgAiADQSIQ8QELDwAgACABIAIgA0EjEPEBCw8AIAAgASACIANBKBDxAQsPACAAIAEgAiADQSoQ8QELDwAgACABIAIgA0EsEPEBCw8AIAAgASACIANBLxDxAQsPACAAIAEgAiADQTgQ8QELEAAgACABIAIgA0HTABDyAQsQACAAIAEgAiADQdQAEPIBCxAAIAAgASACIANB3gAQ8gELEAAgACABIAIgA0HfABDyAQsQACAAIAEgAiADQeAAEPIBCxAAIAAgASACIANB4QAQ8gELEAAgACABIAIgA0HiABDyAQsQACAAIAEgAiADQeMAEPIBCxAAIAAgASACIANB5AAQ8gELEAAgACABIAIgA0HlABDyAQsQACAAIAEgAiADQeYAEPEBCxAAIAAgASACIANB5wAQ8QELEAAgACABIAIgA0HoABDxAQsQACAAIAEgAiADQekAEPEBCxAAIAAgASACIANB6gAQ8QELEAAgACABIAIgA0HrABDxAQsQACAAIAEgAiADQewAEPEBCxAAIAAgASACIANB7gAQ8QELHgAgARBmIQEgABDHASABEMQBQQh0QcwAchDRARBnCxkAIAAgASACQSBBACAEG0EQQQAgAxtyECELDQAgACABIAJBARDzAQsNACAAIAEgAkECEPMBCw0AIAAgASACQQMQ8wELDQAgACABIAJBBBDzAQsNACAAIAEgAkEFEPMBCw0AIAAgASACQQYQ8wELDQAgACABIAJBBxDzAQsNACAAIAEgAkEIEPMBCw0AIAAgASACQQkQ8wELDQAgACABIAJBCxDzAQsNACAAIAEgAkENEPMBCw0AIAAgASACQQ4Q8wELDQAgACABIAJBDxDzAQsNACAAIAEgAkEQEPMBCw0AIAAgASACQREQ8wELDQAgACABIAJBFxDzAQsNACAAIAEgAkEmEPMBCw0AIAAgASACQScQ8wELDQAgACABIAJBKRDzAQsNACAAIAEgAkErEPMBCw0AIAAgASACQS0Q8wELDQAgACABIAJBLhDzAQsNACAAIAEgAkEwEPMBCw0AIAAgASACQTEQ8wELDQAgACABIAJBNRDzAQsNACAAIAEgAkE3EPMBCw0AIAAgASACQTkQ9AELDQAgACABIAJBOhD0AQsNACAAIAEgAkE7EPQBCw0AIAAgASACQTwQ9AELDQAgACABIAJBPRD0AQsNACAAIAEgAkE+EPQBCw0AIAAgASACQT8Q9AELDgAgACABIAJBwAAQ9AELDgAgACABIAJBwQAQ9AELDgAgACABIAJBwgAQ9AELDgAgACABIAJBwwAQ9AELDgAgACABIAJBxAAQ9AELDgAgACABIAJBxQAQ9AELDgAgACABIAJBxgAQ9AELDgAgACABIAJBxwAQ9AELDgAgACABIAJByAAQ9AELDgAgACABIAJByQAQ9AELDgAgACABIAJBygAQ9AELDgAgACABIAJB0QAQ9AELDgAgACABIAJB0gAQ9AELFwEBfyAAQf8BcUE/TQR/IAAQaAVBAAsLGwAgABDQASAAKAIAQX9GBEAQ1wEACyAALQAECwkAIABBExD1AQsJACAAQRUQ9QELCQAgAEEaEPUBCwkAIABBIBD1AQsJACAAQSUQ9QELIgEBf0EQQQQQxgEiAEIANwIIIABCgYCAgBA3AgAgAEEIagsJACAAQTQQ9QELCQAgAEE2EPUBCwoAIABB2AAQ9QELCgAgAEHZABD1AQsXACABQRB0QYCA/ANxIABBAnRB/AFxcgsbACAAEMcBIAEQxwEgAhDHARA6QQh0ENEBEGcLEgAgASAAENMBIgAEQCAADwsAC3UBAX8gAEH/AXFBwABPBEAjAEEQayIBJAAgAUEiNgIMIAFBgIDAADYCCCMAQSBrIgAkACAAQQE2AgQgAEH0hsAANgIAIABCATcCDCAAIAFBCGqtQoCAgIDAAIQ3AxggACAAQRhqNgIIIABBuIDAABBXAAsgAAsUACAAIAEgAkEgQQAgAxsgBHIQIQsXACAAEBsgARAbIAIQGyADEBYQzgEQYgsWACAAEBsgARAbIAIQGyADEBsQIRBiCxMAIAAgACgCAEEBazYCACABEF4LEwAgACAAKAIAQQFrNgIAIAEQXwsSACAAEBsgARAbIAIQAhBHEGILEQAgACABIAJBIEEAIAMbECELEgAgABAbIAEQGyACEB0QRxBiCxMAIAAEQA8LQdSKwABBGxDYAQALFAEBf0EEQQEQxgEiASAANgAAIAELDQAgAQRAIAAgARAZCwuBAwEFf0GRj8AALQAAGgJ/IABBCU8EQAJAQc3/e0EQIAAgAEEQTRsiAGsgAU0NACAAQRAgAUELakF4cSABQQtJGyIEakEMahABIgJFDQAgAkEIayEBAkAgAEEBayIDIAJxRQRAIAEhAAwBCyACQQRrIgUoAgAiBkF4cSACIANqQQAgAGtxQQhrIgIgAEEAIAIgAWtBEE0baiIAIAFrIgJrIQMgBkEDcQRAIAAgAyAAKAIEQQFxckECcjYCBCAAIANqIgMgAygCBEEBcjYCBCAFIAIgBSgCAEEBcXJBAnI2AgAgASACaiIDIAMoAgRBAXI2AgQgASACEAMMAQsgASgCACEBIAAgAzYCBCAAIAEgAmo2AgALAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiAEQRBqTQ0AIAAgBCABQQFxckECcjYCBCAAIARqIgEgAiAEayIEQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgBBADCyAAQQhqIQMLIAMMAQsgARABCwsNACAAENwBQQp2QT9xCw8AIAAQGyABEGYQxAEQYgsLACAAIwBqJAAjAAsOAEHvisAAQc8AENgBAAsJACAAIAEQAAALCQAgAEE/cRBoCwoAIAAQG0H/AXELCAAgAEEEEBkLBwAgAEEIdAsJAEEzENEBEGcLBgBBCxBoCwYAQQoQaAsGAEEIEGgLBgBBDxBoCwYAQQYQaAsGAEEJEGgLBgBBBxBoCwYAQQwQaAsGAEECEGgLBgBBARBoCwYAQQMQaAsGAEENEGgLBgBBDhBoCwYAQQUQaAsGAEEEEGgLBgBBEBBoCwYAQQAQaAsEAEEECzMBAX8gACAAKAIAQQFrIgI2AgACQCACDQAgACAAKAIEQQFrIgI2AgQgAg0AIAAgARAZCwsjACAAEMcBIAEQxwEgAhDHASADEMcBECFBCHQgBHIQ0QEQZwsiACAAEMcBIAEQxwEgAhDHASADEA4QIUEIdCAEchDRARBnCx4AIAAQxwEgARDHASACEMcBEDpBCHQgA3IQ0QEQZwsdACAAEMcBIAEQxwEgAhAPEEdBCHQgA3IQ0QEQZwsaACAAEMcBGiAAQQp0QYD4A3EgAXIQ0QEQZwtfAQF/IwBBMGsiBCQAIAQgADYCDCAAIANPBEAgBEECNgIUIAQgAjYCECAEQgE3AhwgBEEDNgIsIAQgBEEoajYCGCAEIARBDGo2AiggBEEQaiABEFcACyAEQTBqJAAgAAtMAQJ/IwBBEGsiBSQAIAVBCGogAxALIAUtAAkhAyAFLQAIIQYgABDHASABEMcBIAIQxwEgBiADEMgBQQh0IARyENEBEGcgBUEQaiQAC0wBAn8jAEEQayIFJAAgBUEIaiADEAggBS0ACSEDIAUtAAghBiAAEMcBIAEQxwEgAhDHASAGIAMQiQFBCHQgBHIQ0QEQZyAFQRBqJAALSQAgABDHARogARDHARogAEESdEGAgPAXcSIAIAFBDHRBgOA/cXIiAUGA4ANxQQh0IAFBCHZBgP4DcSAAIAJyQRh2cnIQ0QEQZwtJACAAEMcBGiABEBMiAUEQdEGAgPwHcSAAQRJ0QYCA8B9xIAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2ckEIdCACchDRARBnC0kBAX8jAEEQayIDJAAgABDQASABIAJPBEBB4ILAAEEZENgBAAsgA0EIaiAAEGEgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQQAgABDHARogARDHARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyENEBEGcLNQAgABAUIgBBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyQQh0IAFyENEBEGcLC8gLAQBBgIDAAAu+C0NoZWNrUmVnSWQgd2FzIGdpdmVuIGludmFsaWQgUmVnSWRmdWVsLWFzbS9zcmMvbGliLnJzAAAAIgAQABMAAABuAAAAIgAAAFZhbHVlIGBgIG91dCBvZiByYW5nZSBmb3IgNi1iaXQgaW1tZWRpYXRlAAAASAAQAAcAAABPABAAIgAAACIAEAATAAAAsAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMTItYml0IGltbWVkaWF0ZQBIABAABwAAAJQAEAAjAAAAIgAQABMAAAC1AwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxOC1iaXQgaW1tZWRpYXRlAEgAEAAHAAAA2AAQACMAAAAiABAAEwAAALoDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDI0LWJpdCBpbW1lZGlhdGUASAAQAAcAAAAcARAAIwAAACIAEAATAAAAvwMAABwAAABpbnZhbGlkIGVudW0gdmFsdWUgcGFzc2VkYXR0ZW1wdGVkIHRvIHRha2Ugb3duZXJzaGlwIG9mIFJ1c3QgdmFsdWUgd2hpbGUgaXQgd2FzIGJvcnJvd2VkEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAQQAAAEIAAABDAAAARwAAAEgAAABJAAAASgAAAEsAAABMAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAJAAAACRAAAAkgAAAJMAAACUAAAAlQAAAJYAAACXAAAAmAAAAKAAAAChAAAAogAAAKMAAACkAAAApQAAAKYAAACnAAAAqAAAAKkAAACqAAAAqwAAAKwAAACtAAAAsAAAALoAAAC7AAAAAQAAAAAAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACABBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAgAQQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9wYW5pY2tpbmcucnMoBRAAHAAAAIsCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMS4zDHdhc20tYmluZGdlbgYwLjIuOTM=", e);
}
async function Ri() {
  return await Uh(s1());
}
Ri();
const Gh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: sb,
  ADDI: ib,
  ALOC: ob,
  AND: ab,
  ANDI: cb,
  BAL: db,
  BHEI: ub,
  BHSH: _b,
  BLDD: hb,
  BSIZ: lb,
  BURN: fb,
  CALL: pb,
  CB: Ab,
  CCP: gb,
  CFE: wb,
  CFEI: mb,
  CFS: yb,
  CFSI: bb,
  CROO: Ib,
  CSIZ: Eb,
  CompareArgs: Lr,
  CompareMode: tb,
  DIV: vb,
  DIVI: Cb,
  DivArgs: ps,
  ECAL: xb,
  ECK1: Rb,
  ECR1: Sb,
  ED19: Nb,
  EQ: Tb,
  EXP: Db,
  EXPI: Qb,
  FLAG: Fb,
  GM: oi,
  GMArgs: eb,
  GT: Ob,
  GTF: ai,
  GTFArgs: Lh,
  Imm06: Ft,
  Imm12: wt,
  Imm18: Te,
  Imm24: ve,
  Instruction: V,
  JI: Mb,
  JMP: Lb,
  JMPB: kb,
  JMPF: Pb,
  JNE: Ub,
  JNEB: Gb,
  JNEF: zb,
  JNEI: Vb,
  JNZB: Yb,
  JNZF: Hb,
  JNZI: Xb,
  K256: Zb,
  LB: Wb,
  LDC: jb,
  LOG: qb,
  LOGD: Jb,
  LT: $b,
  LW: Kb,
  MCL: tI,
  MCLI: eI,
  MCP: rI,
  MCPI: nI,
  MEQ: sI,
  MINT: iI,
  MLDV: oI,
  MLOG: aI,
  MOD: cI,
  MODI: dI,
  MOVE: uI,
  MOVI: _I,
  MROO: hI,
  MUL: lI,
  MULI: fI,
  MathArgs: As,
  MathOp: rb,
  MulArgs: gs,
  NOOP: gI,
  NOT: wI,
  OR: mI,
  ORI: yI,
  POPH: bI,
  POPL: II,
  PSHH: EI,
  PSHL: vI,
  PanicInstruction: CI,
  PanicReason: nb,
  RET: BI,
  RETD: xI,
  RVRT: RI,
  RegId: l,
  S256: SI,
  SB: NI,
  SCWQ: TI,
  SLL: DI,
  SLLI: QI,
  SMO: FI,
  SRL: OI,
  SRLI: MI,
  SRW: LI,
  SRWQ: kI,
  SUB: PI,
  SUBI: UI,
  SW: GI,
  SWW: zI,
  SWWQ: VI,
  TIME: YI,
  TR: HI,
  TRO: XI,
  WDAM: ZI,
  WDCM: ci,
  WDDV: di,
  WDMD: WI,
  WDML: ui,
  WDMM: jI,
  WDOP: _i,
  WQAM: qI,
  WQCM: hi,
  WQDV: li,
  WQMD: JI,
  WQML: fi,
  WQMM: $I,
  WQOP: pi,
  XOR: KI,
  XORI: t1,
  add: _m,
  addi: fr,
  aloc: Sm,
  and: hm,
  andi: ay,
  bal: sy,
  bhei: Fm,
  bhsh: Qm,
  bldd: $y,
  bsiz: ii,
  burn: Om,
  call: qo,
  cb: Pm,
  ccp: Mm,
  cfe: Ty,
  cfei: Sy,
  cfs: Dy,
  cfsi: Ny,
  croo: Lm,
  csiz: km,
  div: lm,
  divi: si,
  ecal: Jy,
  eck1: qm,
  ecr1: Jm,
  ed19: $m,
  eq: fm,
  exp: pm,
  expi: cy,
  flag: ny,
  gm: by,
  gm_args: em,
  gt: Am,
  gtf: Oh,
  gtf_args: rm,
  initSync: r1,
  initWasm: Ri,
  ji: Ry,
  jmp: ni,
  jmpb: vy,
  jmpf: Ey,
  jne: iy,
  jneb: xy,
  jnef: By,
  jnei: py,
  jnzb: Mh,
  jnzf: Cy,
  jnzi: Iy,
  k256: Km,
  lb: Ay,
  ldc: Wn,
  log: Um,
  logd: Gm,
  lt: gm,
  lw: ts,
  mcl: Nm,
  mcli: yy,
  mcp: Tm,
  mcpi: my,
  meq: Dm,
  mint: zm,
  mldv: xm,
  mlog: wm,
  mod_: ym,
  modi: dy,
  move_: Zr,
  movi: ln,
  mroo: mm,
  mul: bm,
  muli: uy,
  noop: ry,
  not: Im,
  or: Em,
  ori: _y,
  poph: My,
  popl: Oy,
  pshh: Fy,
  pshl: Qy,
  ret: Xa,
  retd: Rm,
  rvrt: Vm,
  s256: ty,
  sb: gy,
  scwq: Ym,
  sll: vm,
  slli: hy,
  smo: oy,
  srl: Cm,
  srli: ly,
  srw: Hm,
  srwq: Xm,
  sub: ri,
  subi: Fh,
  sw: wy,
  sww: Zm,
  swwq: Wm,
  time: ey,
  tr: Qh,
  tro: jm,
  wdam: Zy,
  wdcm: Ly,
  wdcm_args: nm,
  wddv: Vy,
  wddv_args: dm,
  wdmd: Hy,
  wdml: Gy,
  wdml_args: am,
  wdmm: jy,
  wdop: Py,
  wdop_args: im,
  wqam: Wy,
  wqcm: ky,
  wqcm_args: sm,
  wqdv: Yy,
  wqdv_args: um,
  wqmd: Xy,
  wqml: zy,
  wqml_args: cm,
  wqmm: qy,
  wqop: Uy,
  wqop_args: om,
  xor: Bm,
  xori: fy
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ie = BigInt(0), Yt = BigInt(1), Hr = BigInt(2), i1 = BigInt(3), Jo = BigInt(4), m0 = BigInt(5), y0 = BigInt(8);
BigInt(9);
BigInt(16);
function Qe(e, t) {
  const r = e % t;
  return r >= Ie ? r : t + r;
}
function o1(e, t, r) {
  if (r <= Ie || t < Ie)
    throw new Error("Expected power/modulo > 0");
  if (r === Yt)
    return Ie;
  let n = Yt;
  for (; t > Ie; )
    t & Yt && (n = n * e % r), e = e * e % r, t >>= Yt;
  return n;
}
function Pe(e, t, r) {
  let n = e;
  for (; t-- > Ie; )
    n *= n, n %= r;
  return n;
}
function $o(e, t) {
  if (e === Ie || t <= Ie)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = Qe(e, t), n = t, s = Ie, i = Yt;
  for (; r !== Ie; ) {
    const a = n / r, u = n % r, f = s - i * a;
    n = r, r = u, s = i, i = f;
  }
  if (n !== Yt)
    throw new Error("invert: does not exist");
  return Qe(s, t);
}
function a1(e) {
  const t = (e - Yt) / Hr;
  let r, n, s;
  for (r = e - Yt, n = 0; r % Hr === Ie; r /= Hr, n++)
    ;
  for (s = Hr; s < e && o1(s, t, e) !== e - Yt; s++)
    ;
  if (n === 1) {
    const o = (e + Yt) / Jo;
    return function(u, f) {
      const g = u.pow(f, o);
      if (!u.eql(u.sqr(g), f))
        throw new Error("Cannot find square root");
      return g;
    };
  }
  const i = (r + Yt) / Hr;
  return function(a, u) {
    if (a.pow(u, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let f = n, g = a.pow(a.mul(a.ONE, s), r), I = a.pow(u, i), C = a.pow(u, r);
    for (; !a.eql(C, a.ONE); ) {
      if (a.eql(C, a.ZERO))
        return a.ZERO;
      let S = 1;
      for (let N = a.sqr(C); S < f && !a.eql(N, a.ONE); S++)
        N = a.sqr(N);
      const Q = a.pow(g, Yt << BigInt(f - S - 1));
      g = a.sqr(Q), I = a.mul(I, Q), C = a.mul(C, g), f = S;
    }
    return I;
  };
}
function c1(e) {
  if (e % Jo === i1) {
    const t = (e + Yt) / Jo;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % y0 === m0) {
    const t = (e - m0) / y0;
    return function(n, s) {
      const i = n.mul(s, Hr), o = n.pow(i, t), a = n.mul(s, o), u = n.mul(n.mul(a, Hr), o), f = n.mul(a, n.sub(u, n.ONE));
      if (!n.eql(n.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return a1(e);
}
const d1 = [
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
function u1(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = d1.reduce((n, s) => (n[s] = "function", n), t);
  return _s(e, r);
}
function _1(e, t, r) {
  if (r < Ie)
    throw new Error("Expected power > 0");
  if (r === Ie)
    return e.ONE;
  if (r === Yt)
    return t;
  let n = e.ONE, s = t;
  for (; r > Ie; )
    r & Yt && (n = e.mul(n, s)), s = e.sqr(s), r >>= Yt;
  return n;
}
function h1(e, t) {
  const r = new Array(t.length), n = t.reduce((i, o, a) => e.is0(o) ? i : (r[a] = i, e.mul(i, o)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (r[a] = e.mul(i, r[a]), e.mul(i, o)), s), r;
}
function zh(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function Vh(e, t, r = !1, n = {}) {
  if (e <= Ie)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = zh(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = c1(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: za(s),
    ZERO: Ie,
    ONE: Yt,
    create: (u) => Qe(u, e),
    isValid: (u) => {
      if (typeof u != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof u}`);
      return Ie <= u && u < e;
    },
    is0: (u) => u === Ie,
    isOdd: (u) => (u & Yt) === Yt,
    neg: (u) => Qe(-u, e),
    eql: (u, f) => u === f,
    sqr: (u) => Qe(u * u, e),
    add: (u, f) => Qe(u + f, e),
    sub: (u, f) => Qe(u - f, e),
    mul: (u, f) => Qe(u * f, e),
    pow: (u, f) => _1(a, u, f),
    div: (u, f) => Qe(u * $o(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (u) => u * u,
    addN: (u, f) => u + f,
    subN: (u, f) => u - f,
    mulN: (u, f) => u * f,
    inv: (u) => $o(u, e),
    sqrt: n.sqrt || ((u) => o(a, u)),
    invertBatch: (u) => h1(a, u),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (u, f, g) => g ? f : u,
    toBytes: (u) => r ? Ga(u, i) : Rn(u, i),
    fromBytes: (u) => {
      if (u.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${u.length}`);
      return r ? Ua(u) : qr(u);
    }
  });
  return Object.freeze(a);
}
function Yh(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Hh(e) {
  const t = Yh(e);
  return t + Math.ceil(t / 2);
}
function l1(e, t, r = !1) {
  const n = e.length, s = Yh(t), i = Hh(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const o = r ? qr(e) : Ua(e), a = Qe(o, t - Yt) + Yt;
  return r ? Ga(a, s) : Rn(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const f1 = BigInt(0), bo = BigInt(1), Io = /* @__PURE__ */ new WeakMap(), b0 = /* @__PURE__ */ new WeakMap();
function p1(e, t) {
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
      for (; o > f1; )
        o & bo && (a = a.add(u)), u = u.double(), o >>= bo;
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
      let g = i, I = g;
      for (let C = 0; C < a; C++) {
        I = g, f.push(I);
        for (let S = 1; S < u; S++)
          I = I.add(g), f.push(I);
        g = I.double();
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
      let g = e.ZERO, I = e.BASE;
      const C = BigInt(2 ** i - 1), S = 2 ** i, Q = BigInt(i);
      for (let N = 0; N < u; N++) {
        const T = N * f;
        let F = Number(a & C);
        a >>= Q, F > f && (F -= S, a += bo);
        const Y = T, z = T + Math.abs(F) - 1, H = N % 2 !== 0, M = F < 0;
        F === 0 ? I = I.add(r(H, o[Y])) : g = g.add(r(M, o[z]));
      }
      return { p: g, f: I };
    },
    wNAFCached(i, o, a) {
      const u = b0.get(i) || 1;
      let f = Io.get(i);
      return f || (f = this.precomputeWindow(i, u), u !== 1 && Io.set(i, a(f))), this.wNAF(u, f, o);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(i, o) {
      n(o), b0.set(i, o), Io.delete(i);
    }
  };
}
function A1(e, t, r, n) {
  if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  n.forEach((g, I) => {
    if (!t.isValid(g))
      throw new Error(`wrong scalar at index ${I}`);
  }), r.forEach((g, I) => {
    if (!(g instanceof e))
      throw new Error(`wrong point at index ${I}`);
  });
  const s = uh(BigInt(r.length)), i = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, o = (1 << i) - 1, a = new Array(o + 1).fill(e.ZERO), u = Math.floor((t.BITS - 1) / i) * i;
  let f = e.ZERO;
  for (let g = u; g >= 0; g -= i) {
    a.fill(e.ZERO);
    for (let C = 0; C < n.length; C++) {
      const S = n[C], Q = Number(S >> BigInt(g) & BigInt(o));
      a[Q] = a[Q].add(r[C]);
    }
    let I = e.ZERO;
    for (let C = a.length - 1, S = e.ZERO; C > 0; C--)
      S = S.add(a[C]), I = I.add(S);
    if (f = f.add(I), g !== 0)
      for (let C = 0; C < i; C++)
        f = f.double();
  }
  return f;
}
function Xh(e) {
  return u1(e.Fp), _s(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...zh(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function I0(e) {
  e.lowS !== void 0 && Cn("lowS", e.lowS), e.prehash !== void 0 && Cn("prehash", e.prehash);
}
function g1(e) {
  const t = Xh(e);
  _s(t, {
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
const { bytesToNumberBE: w1, hexToBytes: m1 } = Bg, hr = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (e, t) => {
      const { Err: r } = hr;
      if (e < 0 || e > 256)
        throw new r("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new r("tlv.encode: unpadded data");
      const n = t.length / 2, s = _n(n);
      if (s.length / 2 & 128)
        throw new r("tlv.encode: long form length too big");
      const i = n > 127 ? _n(s.length / 2 | 128) : "";
      return `${_n(e)}${i}${s}${t}`;
    },
    // v - value, l - left bytes (unparsed)
    decode(e, t) {
      const { Err: r } = hr;
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
      const { Err: t } = hr;
      if (e < lr)
        throw new t("integer: negative integers are not allowed");
      let r = _n(e);
      if (Number.parseInt(r[0], 16) & 8 && (r = "00" + r), r.length & 1)
        throw new t("unexpected assertion");
      return r;
    },
    decode(e) {
      const { Err: t } = hr;
      if (e[0] & 128)
        throw new t("Invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new t("Invalid signature integer: unnecessary leading zero");
      return w1(e);
    }
  },
  toSig(e) {
    const { Err: t, _int: r, _tlv: n } = hr, s = typeof e == "string" ? m1(e) : e;
    us(s);
    const { v: i, l: o } = n.decode(48, s);
    if (o.length)
      throw new t("Invalid signature: left bytes after parsing");
    const { v: a, l: u } = n.decode(2, i), { v: f, l: g } = n.decode(2, u);
    if (g.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: r.decode(a), s: r.decode(f) };
  },
  hexFromSig(e) {
    const { _tlv: t, _int: r } = hr, n = `${t.encode(2, r.encode(e.r))}${t.encode(2, r.encode(e.s))}`;
    return t.encode(48, n);
  }
}, lr = BigInt(0), ye = BigInt(1);
BigInt(2);
const E0 = BigInt(3);
BigInt(4);
function y1(e) {
  const t = g1(e), { Fp: r } = t, n = Vh(t.n, t.nBitLength), s = t.toBytes || ((N, T, F) => {
    const Y = T.toAffine();
    return $n(Uint8Array.from([4]), r.toBytes(Y.x), r.toBytes(Y.y));
  }), i = t.fromBytes || ((N) => {
    const T = N.subarray(1), F = r.fromBytes(T.subarray(0, r.BYTES)), Y = r.fromBytes(T.subarray(r.BYTES, 2 * r.BYTES));
    return { x: F, y: Y };
  });
  function o(N) {
    const { a: T, b: F } = t, Y = r.sqr(N), z = r.mul(Y, N);
    return r.add(r.add(z, r.mul(N, T)), F);
  }
  if (!r.eql(r.sqr(t.Gy), o(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(N) {
    return vi(N, ye, t.n);
  }
  function u(N) {
    const { allowedPrivateKeyLengths: T, nByteLength: F, wrapPrivateKey: Y, n: z } = t;
    if (T && typeof N != "bigint") {
      if (Kr(N) && (N = Bn(N)), typeof N != "string" || !T.includes(N.length))
        throw new Error("Invalid key");
      N = N.padStart(F * 2, "0");
    }
    let H;
    try {
      H = typeof N == "bigint" ? N : qr(qe("private key", N, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof N}`);
    }
    return Y && (H = Qe(H, z)), Jr("private key", H, ye, z), H;
  }
  function f(N) {
    if (!(N instanceof C))
      throw new Error("ProjectivePoint expected");
  }
  const g = Yo((N, T) => {
    const { px: F, py: Y, pz: z } = N;
    if (r.eql(z, r.ONE))
      return { x: F, y: Y };
    const H = N.is0();
    T == null && (T = H ? r.ONE : r.inv(z));
    const M = r.mul(F, T), L = r.mul(Y, T), G = r.mul(z, T);
    if (H)
      return { x: r.ZERO, y: r.ZERO };
    if (!r.eql(G, r.ONE))
      throw new Error("invZ was invalid");
    return { x: M, y: L };
  }), I = Yo((N) => {
    if (N.is0()) {
      if (t.allowInfinityPoint && !r.is0(N.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: T, y: F } = N.toAffine();
    if (!r.isValid(T) || !r.isValid(F))
      throw new Error("bad point: x or y not FE");
    const Y = r.sqr(F), z = o(T);
    if (!r.eql(Y, z))
      throw new Error("bad point: equation left != right");
    if (!N.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class C {
    constructor(T, F, Y) {
      if (this.px = T, this.py = F, this.pz = Y, T == null || !r.isValid(T))
        throw new Error("x required");
      if (F == null || !r.isValid(F))
        throw new Error("y required");
      if (Y == null || !r.isValid(Y))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(T) {
      const { x: F, y: Y } = T || {};
      if (!T || !r.isValid(F) || !r.isValid(Y))
        throw new Error("invalid affine point");
      if (T instanceof C)
        throw new Error("projective point not allowed");
      const z = (H) => r.eql(H, r.ZERO);
      return z(F) && z(Y) ? C.ZERO : new C(F, Y, r.ONE);
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
      const F = r.invertBatch(T.map((Y) => Y.pz));
      return T.map((Y, z) => Y.toAffine(F[z])).map(C.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(T) {
      const F = C.fromAffine(i(qe("pointHex", T)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(T) {
      return C.BASE.multiply(u(T));
    }
    // Multiscalar Multiplication
    static msm(T, F) {
      return A1(C, n, T, F);
    }
    // "Private method", don't use it directly
    _setWindowSize(T) {
      Q.setWindowSize(this, T);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      I(this);
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
      const { px: F, py: Y, pz: z } = this, { px: H, py: M, pz: L } = T, G = r.eql(r.mul(F, L), r.mul(H, z)), U = r.eql(r.mul(Y, L), r.mul(M, z));
      return G && U;
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
      const { a: T, b: F } = t, Y = r.mul(F, E0), { px: z, py: H, pz: M } = this;
      let L = r.ZERO, G = r.ZERO, U = r.ZERO, k = r.mul(z, z), J = r.mul(H, H), Z = r.mul(M, M), tt = r.mul(z, H);
      return tt = r.add(tt, tt), U = r.mul(z, M), U = r.add(U, U), L = r.mul(T, U), G = r.mul(Y, Z), G = r.add(L, G), L = r.sub(J, G), G = r.add(J, G), G = r.mul(L, G), L = r.mul(tt, L), U = r.mul(Y, U), Z = r.mul(T, Z), tt = r.sub(k, Z), tt = r.mul(T, tt), tt = r.add(tt, U), U = r.add(k, k), k = r.add(U, k), k = r.add(k, Z), k = r.mul(k, tt), G = r.add(G, k), Z = r.mul(H, M), Z = r.add(Z, Z), k = r.mul(Z, tt), L = r.sub(L, k), U = r.mul(Z, J), U = r.add(U, U), U = r.add(U, U), new C(L, G, U);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(T) {
      f(T);
      const { px: F, py: Y, pz: z } = this, { px: H, py: M, pz: L } = T;
      let G = r.ZERO, U = r.ZERO, k = r.ZERO;
      const J = t.a, Z = r.mul(t.b, E0);
      let tt = r.mul(F, H), B = r.mul(Y, M), d = r.mul(z, L), _ = r.add(F, Y), p = r.add(H, M);
      _ = r.mul(_, p), p = r.add(tt, B), _ = r.sub(_, p), p = r.add(F, z);
      let m = r.add(H, L);
      return p = r.mul(p, m), m = r.add(tt, d), p = r.sub(p, m), m = r.add(Y, z), G = r.add(M, L), m = r.mul(m, G), G = r.add(B, d), m = r.sub(m, G), k = r.mul(J, p), G = r.mul(Z, d), k = r.add(G, k), G = r.sub(B, k), k = r.add(B, k), U = r.mul(G, k), B = r.add(tt, tt), B = r.add(B, tt), d = r.mul(J, d), p = r.mul(Z, p), B = r.add(B, d), d = r.sub(tt, d), d = r.mul(J, d), p = r.add(p, d), tt = r.mul(B, p), U = r.add(U, tt), tt = r.mul(m, p), G = r.mul(_, G), G = r.sub(G, tt), tt = r.mul(_, B), k = r.mul(m, k), k = r.add(k, tt), new C(G, U, k);
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
      Jr("scalar", T, lr, t.n);
      const F = C.ZERO;
      if (T === lr)
        return F;
      if (T === ye)
        return this;
      const { endo: Y } = t;
      if (!Y)
        return Q.unsafeLadder(this, T);
      let { k1neg: z, k1: H, k2neg: M, k2: L } = Y.splitScalar(T), G = F, U = F, k = this;
      for (; H > lr || L > lr; )
        H & ye && (G = G.add(k)), L & ye && (U = U.add(k)), k = k.double(), H >>= ye, L >>= ye;
      return z && (G = G.negate()), M && (U = U.negate()), U = new C(r.mul(U.px, Y.beta), U.py, U.pz), G.add(U);
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
      const { endo: F, n: Y } = t;
      Jr("scalar", T, ye, Y);
      let z, H;
      if (F) {
        const { k1neg: M, k1: L, k2neg: G, k2: U } = F.splitScalar(T);
        let { p: k, f: J } = this.wNAF(L), { p: Z, f: tt } = this.wNAF(U);
        k = Q.constTimeNegate(M, k), Z = Q.constTimeNegate(G, Z), Z = new C(r.mul(Z.px, F.beta), Z.py, Z.pz), z = k.add(Z), H = J.add(tt);
      } else {
        const { p: M, f: L } = this.wNAF(T);
        z = M, H = L;
      }
      return C.normalizeZ([z, H])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(T, F, Y) {
      const z = C.BASE, H = (L, G) => G === lr || G === ye || !L.equals(z) ? L.multiplyUnsafe(G) : L.multiply(G), M = H(this, F).add(H(T, Y));
      return M.is0() ? void 0 : M;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(T) {
      return g(this, T);
    }
    isTorsionFree() {
      const { h: T, isTorsionFree: F } = t;
      if (T === ye)
        return !0;
      if (F)
        return F(C, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: T, clearCofactor: F } = t;
      return T === ye ? this : F ? F(C, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(T = !0) {
      return Cn("isCompressed", T), this.assertValidity(), s(C, this, T);
    }
    toHex(T = !0) {
      return Cn("isCompressed", T), Bn(this.toRawBytes(T));
    }
  }
  C.BASE = new C(t.Gx, t.Gy, r.ONE), C.ZERO = new C(r.ZERO, r.ONE, r.ZERO);
  const S = t.nBitLength, Q = p1(C, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: C,
    normPrivateKeyToScalar: u,
    weierstrassEquation: o,
    isWithinCurveOrder: a
  };
}
function b1(e) {
  const t = Xh(e);
  return _s(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function I1(e) {
  const t = b1(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function o(d) {
    return Qe(d, n);
  }
  function a(d) {
    return $o(d, n);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: f, weierstrassEquation: g, isWithinCurveOrder: I } = y1({
    ...t,
    toBytes(d, _, p) {
      const m = _.toAffine(), A = r.toBytes(m.x), E = $n;
      return Cn("isCompressed", p), p ? E(Uint8Array.from([_.hasEvenY() ? 2 : 3]), A) : E(Uint8Array.from([4]), A, r.toBytes(m.y));
    },
    fromBytes(d) {
      const _ = d.length, p = d[0], m = d.subarray(1);
      if (_ === s && (p === 2 || p === 3)) {
        const A = qr(m);
        if (!vi(A, ye, r.ORDER))
          throw new Error("Point is not on curve");
        const E = g(A);
        let v;
        try {
          v = r.sqrt(E);
        } catch (b) {
          const q = b instanceof Error ? ": " + b.message : "";
          throw new Error("Point is not on curve" + q);
        }
        const w = (v & ye) === ye;
        return (p & 1) === 1 !== w && (v = r.neg(v)), { x: A, y: v };
      } else if (_ === i && p === 4) {
        const A = r.fromBytes(m.subarray(0, r.BYTES)), E = r.fromBytes(m.subarray(r.BYTES, 2 * r.BYTES));
        return { x: A, y: E };
      } else
        throw new Error(`Point of length ${_} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), C = (d) => Bn(Rn(d, t.nByteLength));
  function S(d) {
    const _ = n >> ye;
    return d > _;
  }
  function Q(d) {
    return S(d) ? o(-d) : d;
  }
  const N = (d, _, p) => qr(d.slice(_, p));
  class T {
    constructor(_, p, m) {
      this.r = _, this.s = p, this.recovery = m, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(_) {
      const p = t.nByteLength;
      return _ = qe("compactSignature", _, p * 2), new T(N(_, 0, p), N(_, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(_) {
      const { r: p, s: m } = hr.toSig(qe("DER", _));
      return new T(p, m);
    }
    assertValidity() {
      Jr("r", this.r, ye, n), Jr("s", this.s, ye, n);
    }
    addRecoveryBit(_) {
      return new T(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: p, s: m, recovery: A } = this, E = L(qe("msgHash", _));
      if (A == null || ![0, 1, 2, 3].includes(A))
        throw new Error("recovery id invalid");
      const v = A === 2 || A === 3 ? p + t.n : p;
      if (v >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const w = A & 1 ? "03" : "02", h = u.fromHex(w + C(v)), b = a(v), q = o(-E * b), W = o(m * b), et = u.BASE.multiplyAndAddUnsafe(h, q, W);
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
      return xn(this.toDERHex());
    }
    toDERHex() {
      return hr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return xn(this.toCompactHex());
    }
    toCompactHex() {
      return C(this.r) + C(this.s);
    }
  }
  const F = {
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
      const d = Hh(t.n);
      return l1(t.randomBytes(d), t.n);
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
  function z(d) {
    const _ = Kr(d), p = typeof d == "string", m = (_ || p) && d.length;
    return _ ? m === s || m === i : p ? m === 2 * s || m === 2 * i : d instanceof u;
  }
  function H(d, _, p = !0) {
    if (z(d))
      throw new Error("first arg must be private key");
    if (!z(_))
      throw new Error("second arg must be public key");
    return u.fromHex(_).multiply(f(d)).toRawBytes(p);
  }
  const M = t.bits2int || function(d) {
    const _ = qr(d), p = d.length * 8 - t.nBitLength;
    return p > 0 ? _ >> BigInt(p) : _;
  }, L = t.bits2int_modN || function(d) {
    return o(M(d));
  }, G = za(t.nBitLength);
  function U(d) {
    return Jr(`num < 2^${t.nBitLength}`, d, lr, G), Rn(d, t.nByteLength);
  }
  function k(d, _, p = J) {
    if (["recovered", "canonical"].some((st) => st in p))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: A } = t;
    let { lowS: E, prehash: v, extraEntropy: w } = p;
    E == null && (E = !0), d = qe("msgHash", d), I0(p), v && (d = qe("prehashed msgHash", m(d)));
    const h = L(d), b = f(_), q = [U(b), U(h)];
    if (w != null && w !== !1) {
      const st = w === !0 ? A(r.BYTES) : w;
      q.push(qe("extraEntropy", st));
    }
    const W = $n(...q), et = h;
    function nt(st) {
      const ot = M(st);
      if (!I(ot))
        return;
      const Ot = a(ot), ht = u.BASE.multiply(ot).toAffine(), dt = o(ht.x);
      if (dt === lr)
        return;
      const Dt = o(Ot * o(et + dt * b));
      if (Dt === lr)
        return;
      let At = (ht.x === dt ? 0 : 2) | Number(ht.y & ye), yt = Dt;
      return E && S(Dt) && (yt = Q(Dt), At ^= 1), new T(dt, yt, At);
    }
    return { seed: W, k2sig: nt };
  }
  const J = { lowS: t.lowS, prehash: !1 }, Z = { lowS: t.lowS, prehash: !1 };
  function tt(d, _, p = J) {
    const { seed: m, k2sig: A } = k(d, _, p), E = t;
    return _h(E.hash.outputLen, E.nByteLength, E.hmac)(m, A);
  }
  u.BASE._setWindowSize(8);
  function B(d, _, p, m = Z) {
    var ht;
    const A = d;
    if (_ = qe("msgHash", _), p = qe("publicKey", p), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    I0(m);
    const { lowS: E, prehash: v } = m;
    let w, h;
    try {
      if (typeof A == "string" || Kr(A))
        try {
          w = T.fromDER(A);
        } catch (dt) {
          if (!(dt instanceof hr.Err))
            throw dt;
          w = T.fromCompact(A);
        }
      else if (typeof A == "object" && typeof A.r == "bigint" && typeof A.s == "bigint") {
        const { r: dt, s: Dt } = A;
        w = new T(dt, Dt);
      } else
        throw new Error("PARSE");
      h = u.fromHex(p);
    } catch (dt) {
      if (dt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (E && w.hasHighS())
      return !1;
    v && (_ = t.hash(_));
    const { r: b, s: q } = w, W = L(_), et = a(q), nt = o(W * et), st = o(b * et), ot = (ht = u.BASE.multiplyAndAddUnsafe(h, nt, st)) == null ? void 0 : ht.toAffine();
    return ot ? o(ot.x) === b : !1;
  }
  return {
    CURVE: t,
    getPublicKey: Y,
    getSharedSecret: H,
    sign: tt,
    verify: B,
    ProjectivePoint: u,
    Signature: T,
    utils: F
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function E1(e) {
  return {
    hash: e,
    hmac: (t, ...r) => bi(e, t, ep(...r)),
    randomBytes: np
  };
}
function v1(e, t) {
  const r = (n) => I1({ ...e, ...E1(n) });
  return Object.freeze({ ...r(t), create: r });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Zh = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), v0 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), C1 = BigInt(1), Ko = BigInt(2), C0 = (e, t) => (e + t / Ko) / t;
function B1(e) {
  const t = Zh, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), u = BigInt(88), f = e * e * e % t, g = f * f * e % t, I = Pe(g, r, t) * g % t, C = Pe(I, r, t) * g % t, S = Pe(C, Ko, t) * f % t, Q = Pe(S, s, t) * S % t, N = Pe(Q, i, t) * Q % t, T = Pe(N, a, t) * N % t, F = Pe(T, u, t) * T % t, Y = Pe(F, a, t) * N % t, z = Pe(Y, r, t) * g % t, H = Pe(z, o, t) * Q % t, M = Pe(H, n, t) * f % t, L = Pe(M, Ko, t);
  if (!ta.eql(ta.sqr(L), e))
    throw new Error("Cannot find square root");
  return L;
}
const ta = Vh(Zh, void 0, void 0, { sqrt: B1 }), Cr = v1({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: ta,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: v0,
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
      const t = v0, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -C1 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, o = BigInt("0x100000000000000000000000000000000"), a = C0(i * e, t), u = C0(-n * e, t);
      let f = Qe(e - a * r - u * s, t), g = Qe(-a * n - u * i, t);
      const I = f > o, C = g > o;
      if (I && (f = t - f), C && (g = t - g), f > o || g > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: I, k1: f, k2neg: C, k2: g };
    }
  }
}, rn);
BigInt(0);
Cr.ProjectivePoint;
var Za = { exports: {} }, gn = typeof Reflect == "object" ? Reflect : null, B0 = gn && typeof gn.apply == "function" ? gn.apply : function(t, r, n) {
  return Function.prototype.apply.call(t, r, n);
}, Us;
gn && typeof gn.ownKeys == "function" ? Us = gn.ownKeys : Object.getOwnPropertySymbols ? Us = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Us = function(t) {
  return Object.getOwnPropertyNames(t);
};
function x1(e) {
  console && console.warn && console.warn(e);
}
var Wh = Number.isNaN || function(t) {
  return t !== t;
};
function Tt() {
  Tt.init.call(this);
}
Za.exports = Tt;
Za.exports.once = T1;
Tt.EventEmitter = Tt;
Tt.prototype._events = void 0;
Tt.prototype._eventsCount = 0;
Tt.prototype._maxListeners = void 0;
var x0 = 10;
function Si(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Tt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return x0;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Wh(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    x0 = e;
  }
});
Tt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Tt.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Wh(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function jh(e) {
  return e._maxListeners === void 0 ? Tt.defaultMaxListeners : e._maxListeners;
}
Tt.prototype.getMaxListeners = function() {
  return jh(this);
};
Tt.prototype.emit = function(t) {
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
    B0(u, this, r);
  else
    for (var f = u.length, g = tl(u, f), n = 0; n < f; ++n)
      B0(g[n], this, r);
  return !0;
};
function qh(e, t, r, n) {
  var s, i, o;
  if (Si(r), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    r.listener ? r.listener : r
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = r, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), s = jh(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, x1(a);
  }
  return e;
}
Tt.prototype.addListener = function(t, r) {
  return qh(this, t, r, !1);
};
Tt.prototype.on = Tt.prototype.addListener;
Tt.prototype.prependListener = function(t, r) {
  return qh(this, t, r, !0);
};
function R1() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Jh(e, t, r) {
  var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r }, s = R1.bind(n);
  return s.listener = r, n.wrapFn = s, s;
}
Tt.prototype.once = function(t, r) {
  return Si(r), this.on(t, Jh(this, t, r)), this;
};
Tt.prototype.prependOnceListener = function(t, r) {
  return Si(r), this.prependListener(t, Jh(this, t, r)), this;
};
Tt.prototype.removeListener = function(t, r) {
  var n, s, i, o, a;
  if (Si(r), s = this._events, s === void 0)
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
    i === 0 ? n.shift() : S1(n, i), n.length === 1 && (s[t] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || r);
  }
  return this;
};
Tt.prototype.off = Tt.prototype.removeListener;
Tt.prototype.removeAllListeners = function(t) {
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
function $h(e, t, r) {
  var n = e._events;
  if (n === void 0)
    return [];
  var s = n[t];
  return s === void 0 ? [] : typeof s == "function" ? r ? [s.listener || s] : [s] : r ? N1(s) : tl(s, s.length);
}
Tt.prototype.listeners = function(t) {
  return $h(this, t, !0);
};
Tt.prototype.rawListeners = function(t) {
  return $h(this, t, !1);
};
Tt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Kh.call(e, t);
};
Tt.prototype.listenerCount = Kh;
function Kh(e) {
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
Tt.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Us(this._events) : [];
};
function tl(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e[n];
  return r;
}
function S1(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function N1(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
    t[r] = e[r].listener || e[r];
  return t;
}
function T1(e, t) {
  return new Promise(function(r, n) {
    function s(o) {
      e.removeListener(t, i), n(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), r([].slice.call(arguments));
    }
    el(e, t, i, { once: !0 }), t !== "error" && D1(e, s, { once: !0 });
  });
}
function D1(e, t, r) {
  typeof e.on == "function" && el(e, "error", t, r);
}
function el(e, t, r, n) {
  if (typeof e.on == "function")
    n.once ? e.once(t, r) : e.on(t, r);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      n.once && e.removeEventListener(t, s), r(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var rl = Za.exports, Q1 = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", F1 = class {
  constructor(e, t, r, n, s, i = 0) {
    O(this, "left");
    O(this, "right");
    O(this, "parent");
    O(this, "hash");
    O(this, "data");
    O(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, R0 = F1;
function O1(e) {
  return Ye("0x00".concat(e.slice(2)));
}
function M1(e, t) {
  return Ye("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function nl(e) {
  if (!e.length)
    return Q1;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = O1(e[i]);
    t.push(new R0(-1, -1, -1, o, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const o = i << 1, a = M1(r[o].hash, r[o + 1].hash);
      t[i] = new R0(r[o].index, r[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var L1 = "0x00", sl = "0x01";
function k1(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(Ye(t).slice(2));
  return [Ye(r), r];
}
function on(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Ye(r), r];
}
function Eo(e) {
  const t = sl.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function P1(e) {
  const t = sl.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function vo(e) {
  return e.slice(0, 4) === L1;
}
var U1 = class {
  constructor(e, t, r, n, s) {
    O(this, "SideNodes");
    O(this, "NonMembershipLeafData");
    O(this, "BitMask");
    O(this, "NumSideNodes");
    O(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, G1 = U1, z1 = class {
  constructor(e, t, r) {
    O(this, "SideNodes");
    O(this, "NonMembershipLeafData");
    O(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, V1 = z1, Me = "0x0000000000000000000000000000000000000000000000000000000000000000", _r = 256;
function fn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function Y1(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function H1(e, t) {
  let r = 0;
  for (let n = 0; n < _r && fn(e, n) === fn(t, n); n += 1)
    r += 1;
  return r;
}
function X1(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Me ? t.push(0) : (r.push(n), t.push(1));
  return new G1(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var Z1 = class {
  constructor() {
    O(this, "ms");
    O(this, "root");
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
    if (vo(n))
      return [r, t, n, ""];
    let s, i, o = "", a = "";
    for (let f = 0; f < _r; f += 1) {
      if ([s, i] = P1(n), fn(e, f) === 1 ? (a = s, o = i) : (a = i, o = s), r.push(a), o === Me) {
        n = "";
        break;
      }
      if (n = this.get(o), vo(n))
        break;
    }
    const u = this.get(a);
    return [Y1(r), o, n, u];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Me)
      return this.root;
    const [s] = Eo(n);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", u = "", f = !1;
    for (let g = 0; g < t.length; g += 1)
      if (t[g] !== "") {
        if (a = t[g], o === "")
          if (u = this.get(a), vo(u)) {
            i = a, o = a;
            continue;
          } else
            o = Me, f = !0;
        !f && a === Me || (f || (f = !0), fn(e, t.length - 1 - g) === 1 ? [i, o] = on(a, o) : [i, o] = on(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Me), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, o;
    this.set(Ye(t), t), [i, o] = k1(e, t), this.set(i, o), o = i;
    let a;
    if (n === Me)
      a = _r;
    else {
      const [u] = Eo(s);
      a = H1(e, u);
    }
    a !== _r && (fn(e, a) === 1 ? [i, o] = on(n, o) : [i, o] = on(o, n), this.set(i, o), o = i);
    for (let u = 0; u < _r; u += 1) {
      let f;
      const g = _r - r.length;
      if (u - g < 0 || r[u - g] === "")
        if (a !== _r && a > _r - 1 - u)
          f = Me;
        else
          continue;
      else
        f = r[u - g];
      fn(e, _r - 1 - u) === 1 ? [i, o] = on(f, o) : [i, o] = on(o, f), this.set(i, o), o = i;
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
      const [u] = Eo(n);
      u !== e && (o = n);
    }
    return new V1(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return X1(t);
  }
}, W1 = Object.defineProperty, j1 = (e, t, r) => t in e ? W1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Pt = (e, t, r) => (j1(e, typeof t != "symbol" ? t + "" : t, r), r), Wa = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Lt = (e, t, r) => (Wa(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Nr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Je = (e, t, r, n) => (Wa(e, t, "write to private field"), t.set(e, r), r), ea = (e, t, r) => (Wa(e, t, "access private method"), r), ja = (e) => {
  let t, r, n;
  Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0);
  const s = R(r);
  return {
    assetId: K(t),
    amount: s.lt(1) ? R(1) : s,
    max: n ? R(n) : void 0
  };
}, q1 = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, il = it`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, qa = it`
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
    `, ol = it`
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
    ${qa}`, J1 = it`
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
    `, al = it`
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
    ${qa}`, cl = it`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, Ja = it`
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
    ${il}
${ol}
${J1}
${al}
${cl}`, $1 = it`
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
    ${il}
${ol}
${al}
${cl}`, ws = it`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${$1}`, K1 = it`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, tE = it`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${K1}`, eE = it`
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
    `, rE = it`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, nE = it`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${eE}
${rE}`, sE = it`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${nE}
${qa}`, $a = it`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, iE = it`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, dl = it`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, oE = it`
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
    `, ul = it`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Ni = it`
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
    `, aE = it`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, cE = it`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, dE = it`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, uE = it`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, _E = it`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, hE = it`
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
    `, lE = it`
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
    ${hE}`, fE = it`
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
    ${aE}
${cE}
${dE}
${uE}
${_E}
${lE}`, pE = it`
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
    ${Ni}
${fE}`, AE = it`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Dn = it`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, gE = it`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, wE = it`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, mE = it`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, yE = it`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${gE}`, bE = it`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${pE}`, IE = it`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ws}`, EE = it`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ws}`, vE = it`
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
    ${ws}
${Dn}`, CE = it`
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
    ${Dn}
${ws}`, BE = it`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${tE}`, xE = it`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ni}`, RE = it`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Ni}
${ws}`, SE = it`
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
    ${Dn}
${Ni}`, NE = it`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${$a}`, TE = it`
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
    ${Dn}
${$a}`, DE = it`
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
    ${$a}
${iE}`, QE = it`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, FE = it`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${AE}`, OE = it`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${ul}`, ME = it`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, LE = it`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, kE = it`
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
    ${Dn}
${ul}`, PE = it`
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
    ${Dn}
${dl}`, UE = it`
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
    ${oE}`, GE = it`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, zE = it`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${wE}`, VE = it`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${sE}`, YE = it`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, HE = it`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, XE = it`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${dl}`, ZE = it`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ja}`, WE = it`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ja}`, jE = it`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${Ja}`;
function qE(e) {
  return {
    getVersion(t, r) {
      return e(mE, t, r);
    },
    getNodeInfo(t, r) {
      return e(yE, t, r);
    },
    getChain(t, r) {
      return e(bE, t, r);
    },
    getTransaction(t, r) {
      return e(IE, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(EE, t, r);
    },
    getTransactions(t, r) {
      return e(vE, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(CE, t, r);
    },
    estimatePredicates(t, r) {
      return e(BE, t, r);
    },
    getBlock(t, r) {
      return e(xE, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(RE, t, r);
    },
    getBlocks(t, r) {
      return e(SE, t, r);
    },
    getCoin(t, r) {
      return e(NE, t, r);
    },
    getCoins(t, r) {
      return e(TE, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(DE, t, r);
    },
    getContract(t, r) {
      return e(QE, t, r);
    },
    getContractBalance(t, r) {
      return e(FE, t, r);
    },
    getBalance(t, r) {
      return e(OE, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(ME, t, r);
    },
    estimateGasPrice(t, r) {
      return e(LE, t, r);
    },
    getBalances(t, r) {
      return e(kE, t, r);
    },
    getMessages(t, r) {
      return e(PE, t, r);
    },
    getMessageProof(t, r) {
      return e(UE, t, r);
    },
    getMessageStatus(t, r) {
      return e(GE, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(zE, t, r);
    },
    dryRun(t, r) {
      return e(VE, t, r);
    },
    submit(t, r) {
      return e(YE, t, r);
    },
    produceBlocks(t, r) {
      return e(HE, t, r);
    },
    getMessageByNonce(t, r) {
      return e(XE, t, r);
    },
    submitAndAwait(t, r) {
      return e(ZE, t, r);
    },
    submitAndAwaitStatus(t, r) {
      return e(WE, t, r);
    },
    statusChange(t, r) {
      return e(jE, t, r);
    }
  };
}
var Gs = class {
  constructor(e) {
    O(this, "events", []);
    O(this, "parsingLeftover", "");
    this.stream = e;
  }
  static async create(e) {
    const { url: t, query: r, variables: n, fetchFn: s } = e, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: Eh(r),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [o, a] = i.body.tee().map((u) => u.getReader());
    return await new Gs(o).next(), new Gs(a);
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
      const r = Gs.textDecoder.decode(e).replace(`:keep-alive-text

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
}, _l = Gs;
Pt(_l, "textDecoder", new TextDecoder());
var vr = /* @__PURE__ */ new Map(), S0 = class {
  constructor(e) {
    O(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new x(
        D.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(e, t) {
    const r = Date.now(), n = vr.get(e) || {
      utxos: /* @__PURE__ */ new Set(),
      messages: /* @__PURE__ */ new Set(),
      timestamp: r
    };
    t.utxos.forEach((s) => n.utxos.add(K(s))), t.messages.forEach((s) => n.messages.add(K(s))), vr.set(e, n);
  }
  // Remove resources from the cache for a given transaction ID
  unset(e) {
    vr.delete(e);
  }
  // Get all cached resources and remove expired ones
  getActiveData() {
    const e = { utxos: [], messages: [] }, t = Date.now();
    return vr.forEach((r, n) => {
      t - r.timestamp < this.ttl ? (e.utxos.push(...r.utxos), e.messages.push(...r.messages)) : vr.delete(n);
    }), e;
  }
  // Check if a UTXO ID or message nonce is already cached and not expired
  isCached(e) {
    const t = Date.now();
    for (const [r, n] of vr.entries())
      if (t - n.timestamp > this.ttl)
        vr.delete(r);
      else if (n.utxos.has(e) || n.messages.has(e))
        return !0;
    return !1;
  }
  clear() {
    vr.clear();
  }
}, JE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Bt.Coin: {
      const r = $(e.predicate ?? "0x"), n = $(e.predicateData ?? "0x");
      return {
        type: Bt.Coin,
        txID: K($(e.id).slice(0, gr)),
        outputIndex: Rr($(e.id).slice(gr, Zs)),
        owner: K(e.owner),
        amount: R(e.amount),
        assetId: K(e.assetId),
        txPointer: {
          blockHeight: Rr($(e.txPointer).slice(0, 8)),
          txIndex: Rr($(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: R(e.predicateGasUsed),
        predicateLength: R(r.length),
        predicateDataLength: R(n.length),
        predicate: K(r),
        predicateData: K(n)
      };
    }
    case Bt.Contract:
      return {
        type: Bt.Contract,
        txID: Qt,
        outputIndex: 0,
        balanceRoot: Qt,
        stateRoot: Qt,
        txPointer: {
          blockHeight: Rr($(e.txPointer).slice(0, 8)),
          txIndex: Rr($(e.txPointer).slice(8, 16))
        },
        contractID: K(e.contractId)
      };
    case Bt.Message: {
      const r = $(e.predicate ?? "0x"), n = $(e.predicateData ?? "0x"), s = $(e.data ?? "0x");
      return {
        type: Bt.Message,
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
}, $E = (e) => {
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
        balanceRoot: Qt,
        stateRoot: Qt
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
        to: Qt,
        amount: R(0),
        assetId: Qt
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
}, N0 = (e) => !("data" in e), JC = (e) => "utxoId" in e, $C = (e) => "recipient" in e, KE = (e) => "id" in e, KC = (e) => "recipient" in e, tv = (e) => e.type === pt.Revert && e.val.toString("hex") === Nh, ev = (e) => e.type === pt.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", T0 = (e) => e.reduce(
  (t, r) => (tv(r) && t.missingOutputVariables.push(r), ev(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Nt = (e) => e || Qt;
function rv(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: pt.Call,
        from: Nt(e.id || e.contractId),
        to: Nt(e == null ? void 0 : e.to),
        amount: R(e.amount),
        assetId: Nt(e.assetId),
        gas: R(e.gas),
        param1: R(e.param1),
        param2: R(e.param2),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "RETURN":
      return {
        type: pt.Return,
        id: Nt(e.id || e.contractId),
        val: R(e.val),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "RETURN_DATA":
      return {
        type: pt.ReturnData,
        id: Nt(e.id || e.contractId),
        ptr: R(e.ptr),
        len: R(e.len),
        digest: Nt(e.digest),
        pc: R(e.pc),
        data: Nt(e.data),
        is: R(e.is)
      };
    case "PANIC":
      return {
        type: pt.Panic,
        id: Nt(e.id),
        reason: R(e.reason),
        pc: R(e.pc),
        is: R(e.is),
        contractId: Nt(e.contractId)
      };
    case "REVERT":
      return {
        type: pt.Revert,
        id: Nt(e.id || e.contractId),
        val: R(e.ra),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "LOG":
      return {
        type: pt.Log,
        id: Nt(e.id || e.contractId),
        val0: R(e.ra),
        val1: R(e.rb),
        val2: R(e.rc),
        val3: R(e.rd),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "LOG_DATA":
      return {
        type: pt.LogData,
        id: Nt(e.id || e.contractId),
        val0: R(e.ra),
        val1: R(e.rb),
        ptr: R(e.ptr),
        len: R(e.len),
        digest: Nt(e.digest),
        pc: R(e.pc),
        data: Nt(e.data),
        is: R(e.is)
      };
    case "TRANSFER":
      return {
        type: pt.Transfer,
        from: Nt(e.id || e.contractId),
        to: Nt(e.toAddress || (e == null ? void 0 : e.to)),
        amount: R(e.amount),
        assetId: Nt(e.assetId),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: pt.TransferOut,
        from: Nt(e.id || e.contractId),
        to: Nt(e.toAddress || e.to),
        amount: R(e.amount),
        assetId: Nt(e.assetId),
        pc: R(e.pc),
        is: R(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: pt.ScriptResult,
        result: R(e.result),
        gasUsed: R(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const r = Nt(e.sender), n = Nt(e.recipient), s = Nt(e.nonce), i = R(e.amount), o = e.data ? $(e.data) : Uint8Array.from([]), a = Nt(e.digest), u = R(e.len).toNumber(), f = Fr.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: K(o)
      });
      return {
        type: pt.MessageOut,
        sender: r,
        recipient: n,
        amount: i,
        nonce: s,
        len: u,
        data: o,
        digest: a,
        messageId: f
      };
    }
    case "MINT": {
      const r = Nt(e.id || e.contractId), n = Nt(e.subId), s = Jn(r, n);
      return {
        type: pt.Mint,
        subId: n,
        contractId: r,
        assetId: s,
        val: R(e.val),
        pc: R(e.pc),
        is: R(e.is)
      };
    }
    case "BURN": {
      const r = Nt(e.id || e.contractId), n = Nt(e.subId), s = Jn(r, n);
      return {
        type: pt.Burn,
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
var nv = "https://app.fuel.network", sv = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, tB = (e = {}) => {
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
  ], f = u.filter((H) => !!H.value).map(({ key: H, value: M }) => ({
    key: H,
    value: M
  })), g = f.length > 0;
  if (f.length > 1)
    throw new x(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${u.map((H) => H.key).join(", ")}.`
    );
  if (r && f.length > 0) {
    const H = u.map(({ key: M }) => M).join(", ");
    throw new x(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${H}.`
    );
  }
  const I = g ? sv(
    f[0].key,
    f[0].value
  ) : "", C = /^\/|\/$/gm, S = r ? r.replace(C, "") : I, Q = a.replace(C, ""), N = n == null ? void 0 : n.replace(C, ""), T = N ? encodeURIComponent(N) : void 0, F = Q.match(/^https?:\/\//) ? "" : "https://", Y = N != null && N.match(/^https?:\/\//) ? "" : "https://";
  return `${F}${Q}/${S}${T ? `?providerUrl=${Y}${T}` : ""}`;
}, Ti = (e) => e.filter(
  (n) => n.type === pt.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), R(0));
function Se(e, t) {
  const r = R(t.base);
  let n = R(0);
  return "unitsPerGas" in t ? n = R(e).div(R(t.unitsPerGas)) : n = R(e).mul(R(t.gasPerUnit)), r.add(n);
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
  }), i = Se(t, r.vmInitialization);
  return s.reduce((a, u) => "predicate" in u && u.predicate && u.predicate !== "0x" ? a.add(
    i.add(Se($(u.predicate).length, r.contractRoot)).add(R(u.predicateGasUsed))
  ) : a.add(r.ecr1), R(0));
}
function hl(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, o = Se(i, t.vmInitialization), a = R(i).mul(r), u = iv(n, i, t);
  return o.add(a).add(u).add(s).maxU64();
}
function Ka(e) {
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
function ll({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = Se(n, e.contractRoot), i = Se(t, e.stateRoot), o = Se(r, e.s256), a = R(100), u = Se(a, e.s256);
  return s.add(i).add(o).add(u).maxU64();
}
function fl({
  gasCosts: e,
  txBytesSize: t
}) {
  return Se(t, e.s256);
}
function ov({
  gasCosts: e,
  txBytesSize: t,
  witnessBytesSize: r
}) {
  const n = Se(t, e.s256), s = Se(r, e.s256);
  return n.add(s);
}
function D0({
  gasCosts: e,
  txBytesSize: t,
  consensusSize: r
}) {
  const n = Se(t, e.s256);
  if (r) {
    const s = Se(r, e.s256);
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
  const s = Se(t, e.s256), i = Se(r, e.s256);
  s.add(i);
  const o = Se(n, e.stateRoot);
  return s.add(o), s;
}
function cv({
  gasCosts: e,
  baseMinGas: t,
  subsectionSize: r
}) {
  const n = R(e.newStoragePerByte).mul(r);
  return R(t).add(n);
}
var wn = (e) => {
  const { gas: t, gasPrice: r, priceFactor: n, tip: s } = e;
  return t.mul(r).div(n).add(R(s));
};
function ra(e) {
  return Object.keys(e).forEach((t) => {
    var r;
    switch ((r = e[t]) == null ? void 0 : r.constructor.name) {
      case "Uint8Array":
        e[t] = K(e[t]);
        break;
      case "Array":
        e[t] = ra(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = ra(e[t]);
        break;
    }
  }), e;
}
function dv(e) {
  return ra(xe(e));
}
var uv = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return $w.includes(e) && (r = `${r}

You can read more about this error at:

${Kw}#variant.${e}`), new x(D.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, Gn = (e) => JSON.stringify(e, null, 2), _v = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === pt.Revert);
  let i = "";
  if (s) {
    const o = R(s.val).toHex(), a = t[t.length - 1], u = t[t.length - 2];
    switch (o) {
      case Ww: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Gn(a) : "an error."}.`;
        break;
      }
      case jw: {
        const f = t.length >= 2 ? ` comparing ${Gn(a)} and ${Gn(u)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${f}`;
        break;
      }
      case Jw: {
        const f = t.length >= 2 ? ` comparing ${Gn(u)} and ${Gn(a)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${f}`;
        break;
      }
      case qw:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Nh:
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
}, tc = (e) => {
  const { receipts: t, statusReason: r, logs: n } = e, s = t.some(({ type: a }) => a === pt.Panic), i = t.some(({ type: a }) => a === pt.Revert), o = {
    logs: n,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? uv(r, o) : _v(t, n, o);
}, eB = class extends Error {
  constructor() {
    super(...arguments);
    O(this, "name", "ChangeOutputCollisionError");
    O(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, hv = class extends Error {
  constructor(t) {
    super();
    O(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, rB = class extends Error {
  constructor(t) {
    super();
    O(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, nn = (e) => e.type === Bt.Coin, ec = (e) => e.type === Bt.Message, pl = (e) => e.type === Bt.Message && R(e.data).isZero(), Al = (e) => nn(e) || ec(e), en = (e) => nn(e) || pl(e), gl = (e) => nn(e) ? e.owner : e.recipient, na = (e, t) => gl(e) === t.toB256(), lv = (e, t, r) => e.filter(en).reduce((n, s) => nn(s) && s.assetId === t || ec(s) && t === r ? n.add(s.amount) : n, R(0)), nB = (e) => e.filter(en).reduce(
  (t, r) => (nn(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), fv = (e, t) => e.reduce(
  (r, n) => (nn(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : ec(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), pv = (e) => {
  const t = $(e);
  return {
    data: K(t),
    dataLength: t.length
  };
}, Qn = class {
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
    O(this, "tip");
    /** Block until which tx cannot be included */
    O(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    O(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    O(this, "witnessLimit");
    /** List of inputs */
    O(this, "inputs", []);
    /** List of outputs */
    O(this, "outputs", []);
    /** List of witnesses */
    O(this, "witnesses", []);
    this.tip = e ? R(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = Mr(n) ? R(n) : void 0, this.maxFee = R(r), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const r = [], { tip: n, witnessLimit: s, maturity: i } = e;
    return R(n).gt(0) && (t += je.Tip, r.push({ data: R(n), type: je.Tip })), Mr(s) && R(s).gte(0) && (t += je.WitnessLimit, r.push({ data: R(s), type: je.WitnessLimit })), i && i > 0 && (t += je.Maturity, r.push({ data: i, type: je.Maturity })), t += je.MaxFee, r.push({ data: e.maxFee, type: je.MaxFee }), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(JE)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map($E)) ?? [], r = ((a = this.witnesses) == null ? void 0 : a.map(pv)) ?? [], { policyTypes: n, policies: s } = Qn.getPolicyMeta(this);
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
    return this.addWitness(ct([Qt, Qt])), this.witnesses.length - 1;
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
      (e) => e.type === Bt.Coin
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
    const t = Vn(e), r = this.inputs.find((n) => {
      switch (n.type) {
        case Bt.Coin:
          return K(n.owner) === t.toB256();
        case Bt.Message:
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
      type: Bt.Coin,
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
      type: Bt.Message,
      sender: r.toB256(),
      recipient: t.toB256(),
      data: N0(e) ? "0x" : e.data,
      amount: n,
      witnessIndex: a,
      predicate: s,
      predicateData: o
    };
    this.pushInput(u), N0(e) && this.addChangeOutput(t, e.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return KE(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      to: Vn(e).toB256(),
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
    return t.map(ja).forEach((r) => {
      this.pushOutput({
        type: vt.Coin,
        to: Vn(e).toB256(),
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
      to: Vn(e).toB256(),
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
    return hl({
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
    return Ka({
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
      i === t && (u = R("1000000000000000000")), a && "assetId" in a ? (a.id = K(Ve(Zs)), a.amount = u) : this.addResources([
        {
          id: K(Ve(Zs)),
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
    return dv(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(en).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(Al);
    this.inputs.filter(en).forEach((r) => {
      const n = gl(r), s = t.find(
        (i) => na(i, ft.fromString(String(n)))
      );
      s && "predicateGasUsed" in s && R(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
};
function ms(e, t) {
  const r = e.toTransaction();
  r.type === xt.Script && (r.receiptsRoot = Qt), r.inputs = r.inputs.map((i) => {
    const o = xe(i);
    switch (o.type) {
      case Bt.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = R(0), o;
      case Bt.Message:
        return o.predicateGasUsed = R(0), o;
      case Bt.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Qt, o.outputIndex = 0, o.balanceRoot = Qt, o.stateRoot = Qt, o;
      default:
        return o;
    }
  }), r.outputs = r.outputs.map((i) => {
    const o = xe(i);
    switch (o.type) {
      case vt.Contract:
        return o.balanceRoot = Qt, o.stateRoot = Qt, o;
      case vt.Change:
        return o.amount = R(0), o;
      case vt.Variable:
        return o.to = Qt, o.amount = R(0), o.assetId = Qt, o;
      default:
        return o;
    }
  }), r.witnessesCount = 0, r.witnesses = [];
  const n = pA(t), s = ct([n, new Ar().encode(r)]);
  return Be(s);
}
var sa = class extends Qn {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, blobId: r, ...n }) {
    super(n);
    /** Type of the transaction */
    O(this, "type", xt.Blob);
    /** Blob ID */
    O(this, "blobId");
    /** Witness index of contract bytecode to create */
    O(this, "witnessIndex");
    this.blobId = r, this.witnessIndex = t ?? 0;
  }
  static from(t) {
    return new this(xe(t));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { witnessIndex: r, blobId: n } = this;
    return {
      type: xt.Blob,
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
    return ms(this, t);
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
}, Av = (e) => {
  const t = new Uint8Array(32);
  return t.set($(e)), t;
}, gv = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: K(t),
    value: K(Av(r))
  };
}, ia = class extends Qn {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: r, storageSlots: n, ...s }) {
    super(s);
    /** Type of the transaction */
    O(this, "type", xt.Create);
    /** Witness index of contract bytecode to create */
    O(this, "bytecodeWitnessIndex");
    /** Salt */
    O(this, "salt");
    /** List of storage slots to initialize */
    O(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = K(r ?? Qt), this.storageSlots = [...n ?? []];
  }
  static from(t) {
    return new this(xe(t));
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
      type: xt.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: R(n.length),
      salt: this.salt ? K(this.salt) : Qt,
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
    return ms(this, t);
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
    return ll({
      contractBytesSize: R($(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Q0 = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: $("0x24000000"),
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
  bytes: $("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Wr = class extends Qn {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: r, gasLimit: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    O(this, "type", xt.Script);
    /** Gas limit for transaction */
    O(this, "gasLimit");
    /** Script to execute */
    O(this, "script");
    /** Script input data (parameters) */
    O(this, "scriptData");
    O(this, "abis");
    this.gasLimit = R(n), this.script = $(t ?? Q0.bytes), this.scriptData = $(r ?? Q0.encodeScriptData()), this.abis = s.abis;
  }
  static from(t) {
    return new this(xe(t));
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const t = $(this.script ?? "0x"), r = $(this.scriptData ?? "0x");
    return {
      type: xt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: R(t.length),
      scriptDataLength: R(r.length),
      receiptsRoot: Qt,
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
      (t) => t.type === Bt.Contract
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
    return Ka({
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
    const r = Vn(t);
    if (this.getContractInputs().find((s) => s.contractId === r.toB256()))
      return this;
    const n = super.pushInput({
      type: Bt.Contract,
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
    return ms(this, t);
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
    return fl({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, oa = class extends Qn {
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
    O(this, "type", xt.Upgrade);
    /** The upgrade purpose */
    O(this, "upgradePurpose");
    /** Witness index of consensus */
    O(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = r ?? 0, this.upgradePurpose = t ?? {
      type: Ge.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(t) {
    return t instanceof oa ? t : new this(xe(t));
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
      type: Ge.ConsensusParameters,
      checksum: Ye(t)
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
      type: Ge.StateTransition,
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
    return t === Ge.ConsensusParameters && this.addConsensusParametersUpgradePurpose(r), t === Ge.StateTransition && this.addStateTransitionUpgradePurpose(r), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let t;
    if (this.upgradePurpose.type === Ge.ConsensusParameters)
      t = {
        type: Ge.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === Ge.StateTransition)
      t = {
        type: Ge.StateTransition,
        data: {
          bytecodeRoot: K(this.upgradePurpose.data)
        }
      };
    else
      throw new x(x.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: xt.Upgrade,
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
    return ms(this, t);
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
    if (this.upgradePurpose.type === Ge.ConsensusParameters) {
      const n = this.bytecodeWitnessIndex, s = this.witnesses[n].length;
      return D0({
        gasCosts: t,
        txBytesSize: r,
        consensusSize: s
      });
    }
    if (this.upgradePurpose.type === Ge.StateTransition)
      return D0({
        gasCosts: t,
        txBytesSize: r
      });
    throw new x(x.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, aa = class extends Qn {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, subsection: r, ...n } = {}) {
    super(n);
    /** Type of the transaction */
    O(this, "type", xt.Upload);
    /** The witness index of the subsection of the bytecode. */
    O(this, "witnessIndex");
    /** The subsection data. */
    O(this, "subsection");
    this.witnessIndex = t ?? 0, this.subsection = r ?? {
      proofSet: [],
      root: Qt,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(t) {
    return t instanceof aa ? t : new this(xe(t));
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
    return ms(this, t);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { subsectionIndex: r, subsectionsNumber: n, root: s, proofSet: i } = this.subsection;
    return {
      type: xt.Upload,
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
    return av({
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
    const r = super.calculateMinGas(t), { gasCosts: n } = t.consensusParameters, s = this.witnesses[this.witnessIndex] ?? Qt;
    return cv({
      gasCosts: n,
      baseMinGas: r.toNumber(),
      subsectionSize: $(s).length
    });
  }
}, Ne = (e) => {
  if (e instanceof Wr || e instanceof ia || e instanceof sa || e instanceof oa || e instanceof aa)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case xt.Script:
      return Wr.from(e);
    case xt.Create:
      return ia.from(e);
    case xt.Blob:
      return sa.from(e);
    case xt.Upgrade:
      return oa.from(e);
    case xt.Upload:
      return aa.from(e);
    default:
      throw new x(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, Gr = (e) => e.type === xt.Script, mv = (e) => e.type === xt.Create, sB = (e) => e.type === xt.Blob, iB = (e) => e.type === xt.Upgrade, oB = (e) => e.type === xt.Upload, yv = (e) => {
  var G;
  const {
    gasPrice: t,
    rawPayload: r,
    tip: n,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: a }
  } = e;
  if (s)
    return s;
  const u = R(o.gasPerByte), f = R(o.gasPriceFactor), g = $(r), [I] = new Ar().decode(g, 0), { type: C, witnesses: S, inputs: Q, policies: N } = I;
  let T = R(0), F = R(0);
  if (C !== xt.Create && C !== xt.Script)
    return R(0);
  if (C === xt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: k } = I, J = R($(S[U].data).length);
    T = ll({
      contractBytesSize: J,
      gasCosts: i,
      stateRootSize: k.length || 0,
      txBytesSize: g.length
    });
  } else {
    const { scriptGasLimit: U } = I;
    U && (F = U), T = fl({
      gasCosts: i,
      txBytesSize: g.length
    });
  }
  const Y = hl({
    gasCosts: i,
    gasPerByte: R(u),
    inputs: Q,
    metadataGas: T,
    txBytesSize: g.length
  }), z = (G = N.find((U) => U.type === je.WitnessLimit)) == null ? void 0 : G.data, H = S.reduce((U, k) => U + k.dataLength, 0), M = Ka({
    gasPerByte: u,
    minGas: Y,
    witnessesLength: H,
    gasLimit: F,
    witnessLimit: z,
    maxGasPerTx: a
  });
  return wn({
    gasPrice: t,
    gas: M,
    priceFactor: f,
    tip: n
  });
}, bv = ({ abi: e, receipt: t }) => {
  var g;
  const r = new wr(e), n = t.param1.toHex(8), s = r.getFunction(n), i = s.jsonFn.inputs, o = t.param2.toHex();
  let a;
  const u = s.decodeArguments(o);
  return u && (a = i.reduce((I, C, S) => {
    const Q = u[S], N = C.name;
    return N ? {
      ...I,
      // reparse to remove bn
      [N]: JSON.parse(JSON.stringify(Q))
    } : I;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: a,
    ...(g = t.amount) != null && g.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function Iv(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function rc(e, t) {
  return e.filter((r) => r.type === t);
}
function Ev(e) {
  return rc(e, Bt.Coin);
}
function vv(e) {
  return rc(e, Bt.Message);
}
function wl(e) {
  return Iv(e, [Bt.Coin, Bt.Message]);
}
function F0(e) {
  return e.type === Bt.Coin;
}
function Cv(e) {
  return rc(e, Bt.Contract);
}
function Bv(e, t) {
  return Ev(e).find((n) => n.assetId === t);
}
function xv(e, t) {
  const r = /* @__PURE__ */ new Map();
  return wl(e).forEach((n) => {
    const s = F0(n) ? n.assetId : t, i = F0(n) ? n.owner : n.recipient;
    let o = r.get(s);
    o || (o = /* @__PURE__ */ new Map(), r.set(s, o));
    let a = o.get(i);
    a || (a = new Gt(0), o.set(i, a)), o.set(i, a.add(n.amount));
  }), r;
}
function Rv(e) {
  var t;
  return (t = vv(e)) == null ? void 0 : t[0];
}
function ml(e, t, r = !1) {
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
    if (r.type !== Bt.Contract)
      throw new x(
        D.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return r;
  }
}
function nc(e) {
  return e.type === Bt.Coin ? e.owner.toString() : e.type === Bt.Message ? e.recipient.toString() : "";
}
function ys(e, t) {
  return e.filter((r) => r.type === t);
}
function Nv(e) {
  return ys(e, vt.ContractCreated);
}
function yl(e) {
  return ys(e, vt.Coin);
}
function Tv(e) {
  return ys(e, vt.Change);
}
function Dv(e) {
  return ys(e, vt.Contract);
}
function aB(e) {
  return ys(e, vt.Variable);
}
var Qv = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(Qv || {}), ca = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(ca || {}), Fv = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Fv || {}), Ov = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Ov || {}), Mv = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Mv || {});
function es(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function bl(e) {
  switch (e) {
    case xt.Mint:
      return "Mint";
    case xt.Create:
      return "Create";
    case xt.Script:
      return "Script";
    case xt.Blob:
      return "Blob";
    case xt.Upgrade:
      return "Upgrade";
    case xt.Upload:
      return "Upload";
    default:
      throw new x(
        D.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function Fn(e, t) {
  return bl(e) === t;
}
function Lv(e) {
  return Fn(
    e,
    "Mint"
    /* Mint */
  );
}
function Il(e) {
  return Fn(
    e,
    "Create"
    /* Create */
  );
}
function El(e) {
  return Fn(
    e,
    "Script"
    /* Script */
  );
}
function kv(e) {
  return Fn(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function Pv(e) {
  return Fn(
    e,
    "Upload"
    /* Upload */
  );
}
function Uv(e) {
  return Fn(
    e,
    "Blob"
    /* Blob */
  );
}
function cB(e) {
  return (t) => e.assetId === t.assetId;
}
function Gv(e) {
  return es(e, pt.Call);
}
function zv(e) {
  return es(e, pt.MessageOut);
}
function Vv(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const o = s.get(i.assetId);
    o ? o.amount = R(o.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function Yv(e, t) {
  var r, n, s, i, o, a, u, f;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((u = e.to) == null ? void 0 : u.type) === ((f = t.to) == null ? void 0 : f.type);
}
function Hv(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? Vv(e, t) : t.assetsSent : e.assetsSent;
}
function Xv(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function Zv(e, t) {
  return {
    ...e,
    assetsSent: Hv(e, t),
    calls: Xv(e, t)
  };
}
function rs(e, t) {
  const r = e.findIndex((n) => Yv(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? Zv(n, t) : n);
}
function dB(e) {
  return es(e, pt.TransferOut);
}
function Wv({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return zv(t).reduce(
    (i, o) => {
      const a = ml(e, r, !0);
      if (a) {
        const u = nc(a);
        return rs(i, {
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
function qv(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function Jv(e, t, r, n, s, i, o) {
  const a = e.assetId === Qt ? o : e.assetId, u = ml(r, a, a === o);
  if (!u)
    return [];
  const f = nc(u), g = jv(t, n, e, s, i);
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
      assetsSent: qv(e),
      calls: g
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
  const a = Gv(r);
  return Dv(t).flatMap((f) => {
    const g = Sv(e, f.inputIndex);
    return g ? a.filter((I) => I.to === g.contractID).flatMap(
      (I) => Jv(
        I,
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
function Kv(e, t, r) {
  const { to: n, assetId: s, amount: i } = e;
  let { from: o } = e;
  const a = t.some((f) => f.contractID === n) ? 0 : 1;
  if (Qt === o) {
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
function t2({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = yl(t), o = Cv(e), a = Tv(t), u = xv(e, n);
  i.forEach(({ amount: I, assetId: C, to: S }) => {
    const Q = u.get(C) || /* @__PURE__ */ new Map();
    let N, T;
    for (const [F, Y] of Q)
      if (T || (T = F), Y.gte(I)) {
        N = F;
        break;
      }
    N = N || T, N && (s = rs(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: N
      },
      to: {
        type: 1,
        address: S
      },
      assetsSent: [{ assetId: C, amount: I }]
    }));
  });
  const f = es(
    r,
    pt.Transfer
  ), g = es(
    r,
    pt.TransferOut
  );
  return [...f, ...g].forEach((I) => {
    const C = Kv(I, o, a);
    s = rs(s, C);
  }), s;
}
function e2(e) {
  return yl(e).reduce((n, s) => rs(n, {
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
function r2({ inputs: e, outputs: t }) {
  const r = Nv(t), n = wl(e)[0], s = nc(n);
  return r.reduce((o, a) => rs(o, {
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
function n2({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: a
}) {
  return Il(e) ? [...r2({ inputs: t, outputs: r })] : El(e) ? [
    ...t2({ inputs: t, outputs: r, receipts: n, baseAssetId: a }),
    ...$v({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: o,
      baseAssetId: a
    }),
    ...Wv({ inputs: t, receipts: n, baseAssetId: a })
  ] : [...e2(r)];
}
var Tr = (e) => rv(e), s2 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === pt.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, i2 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === pt.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, o2 = (e) => {
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
}, a2 = (e) => {
  let t, r, n, s, i, o = !1, a = !1, u = !1;
  if (e != null && e.type)
    switch (n = o2(e.type), e.type) {
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
function Di(e) {
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
    maxInputs: f,
    gasCosts: g,
    maxGasPerTx: I,
    gasPrice: C,
    baseAssetId: S
  } = e, Q = Ti(r), N = K(o), T = n2({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: N,
    abiMap: u,
    maxInputs: f,
    baseAssetId: S
  }), F = bl(i.type), Y = R((p = (_ = i.policies) == null ? void 0 : _.find((m) => m.type === je.Tip)) == null ? void 0 : p.data), { isStatusFailure: z, isStatusPending: H, isStatusSuccess: M, blockId: L, status: G, time: U, totalFee: k } = a2(a), J = yv({
    totalFee: k,
    gasPrice: C,
    rawPayload: N,
    tip: Y,
    consensusParameters: {
      gasCosts: g,
      maxGasPerTx: I,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), Z = s2(r), tt = i2(r);
  let B;
  return U && (B = ya.fromTai64(U)), {
    id: t,
    tip: Y,
    fee: J,
    gasUsed: Q,
    operations: T,
    type: F,
    blockId: L,
    time: U,
    status: G,
    receipts: r,
    mintedAssets: Z,
    burnedAssets: tt,
    isTypeMint: Lv(i.type),
    isTypeCreate: Il(i.type),
    isTypeScript: El(i.type),
    isTypeUpgrade: kv(i.type),
    isTypeUpload: Pv(i.type),
    isTypeBlob: Uv(i.type),
    isStatusFailure: z,
    isStatusSuccess: M,
    isStatusPending: H,
    date: B,
    transaction: i
  };
}
function sc(e, t, r = {}) {
  return e.reduce((n, s) => {
    if (s.type === pt.LogData || s.type === pt.Log) {
      const i = new wr(r[s.id] || t), o = s.type === pt.Log ? new P("u64").encode(s.val0) : s.data, [a] = i.decodeLog(o, s.val1.toString());
      n.push(a);
    }
    return n;
  }, []);
}
function c2(e) {
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
        return Jf();
    }
  });
}
var da = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(e, t, r, n) {
    /** Transaction ID */
    O(this, "id");
    /** Current provider */
    O(this, "provider");
    /** Gas used on the transaction */
    O(this, "gasUsed", R(0));
    /** The graphql Transaction with receipts object. */
    O(this, "gqlTransaction");
    O(this, "request");
    O(this, "status");
    O(this, "abis");
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
    const n = new da(e, t, r);
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
          txPointer: $r.decodeFromGqlScalar(o.txPointer)
        };
      }
      return n;
    }), r.outputs = c2(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
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
    var I;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: o } = this.provider.getGasConfig(), a = await this.provider.getLatestGasPrice(), u = this.provider.getChain().consensusParameters.txParameters.maxInputs, f = this.provider.getBaseAssetId();
    return Di({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((I = this.gqlTransaction) == null ? void 0 : I.status),
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
    this.abis && (n = sc(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), r.logs = n);
    const { receipts: s } = r, i = this.status ?? ((o = this.gqlTransaction) == null ? void 0 : o.status);
    if ((i == null ? void 0 : i.type) === "FailureStatus") {
      this.unsetResourceCache();
      const { reason: a } = i;
      throw tc({
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
function d2(e, t) {
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
function vl(e, t, r = 0) {
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
      const u = d2(t, a);
      return await Vf(u), vl(e, t, a)(...n);
    }
  };
}
var u2 = (e, t) => {
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
}, O0 = 10, M0 = 512, _2 = 5, h2 = 2e4, l2 = (e) => {
  const { name: t, daHeight: r, consensusParameters: n, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: a,
    scriptParams: u,
    txParams: f,
    gasCosts: g,
    baseAssetId: I,
    chainId: C,
    version: S
  } = n;
  return {
    name: t,
    baseChainHeight: R(r),
    consensusParameters: {
      version: S,
      chainId: R(C),
      baseAssetId: I,
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
}, ua, Cl, ze = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    Nr(this, ua), Pt(this, "operations"), Pt(this, "cache"), Pt(this, "url"), Pt(this, "urlWithoutAuth"), Pt(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0
    });
    const { url: r, urlWithoutAuth: n, headers: s } = ze.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = { ...this.options, ...t }, this.url = e, s && (this.options = { ...this.options, headers: { ...this.options.headers, ...s } }), this.operations = this.createOperations();
    const { resourceCacheTTL: i } = this.options;
    Mr(i) ? i !== -1 ? this.cache = new S0(i) : this.cache = void 0 : this.cache = new S0(h2);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    ze.nodeInfoCache = {}, ze.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r, headers: n } = e;
    return vl(async (...s) => {
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
    const r = new ze(e, t);
    return await r.fetchChainAndNodeInfo(), r;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = ze.chainInfoCache[this.urlWithoutAuth];
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
    const e = ze.nodeInfoCache[this.urlWithoutAuth];
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
    const { url: r, urlWithoutAuth: n, headers: s } = ze.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.options = t ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...s } }, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Return the chain and node information.
   *
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo() {
    const e = await this.fetchNode();
    return ze.ensureClientVersionIsSupported(e), {
      chain: await this.fetchChain(),
      nodeInfo: e
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = nf(e.nodeVersion);
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
    const e = ze.getFetchFn(this.options), t = new Pw.GraphQLClient(this.urlWithoutAuth, {
      fetch: (s, i) => e(s, i, this.options),
      responseMiddleware: (s) => {
        if ("response" in s) {
          const i = s.response;
          if (Array.isArray(i == null ? void 0 : i.errors))
            for (const o of i.errors)
              u2(o.message, o);
        }
      }
    }), r = (s, i) => {
      const o = s.definitions.find((u) => u.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? _l.create({
        url: this.urlWithoutAuth,
        query: s,
        fetchFn: (u, f) => e(u, f, this.options),
        variables: i
      }) : t.request(s, i);
    }, n = (s) => ({
      getBlobs(i) {
        const o = i.blobIds.map((g, I) => `$blobId${I}: BlobId!`).join(", "), a = i.blobIds.map((g, I) => `blob${I}: blob(id: $blobId${I}) { id }`).join(`
`), u = i.blobIds.reduce(
          (g, I, C) => (g[`blobId${C}`] = I, g),
          {}
        ), f = it`
          query getBlobs(${o}) {
            ${a}
          }
        `;
        return s(f, u);
      }
    });
    return { ...qE(r), ...n(r) };
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
    return ze.nodeInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = l2(e);
    return ze.chainInfoCache[this.urlWithoutAuth] = t, t;
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
    const r = Ne(e);
    t && await this.estimateTxDependencies(r);
    const { consensusParameters: n } = this.getChain();
    this.validateTransaction(r, n);
    const s = K(r.toTransactionBytes());
    let i;
    Gr(r) && (i = r.abis);
    const o = await this.operations.submitAndAwaitStatus({ encodedTransaction: s });
    return ea(this, ua, Cl).call(this, r.inputs, r.getTransactionId(this.getChainId())), new da(r, this, i, o);
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
    const n = Ne(e);
    if (r)
      return this.estimateTxDependencies(n);
    const s = K(n.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
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
      (i) => "predicate" in i && i.predicate && !dh($(i.predicate), $("0x")) && new Gt(i.predicateGasUsed).isZero()
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
    if (mv(e))
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const r = [];
    let n = 0, s;
    for (let i = 0; i < O0; i++) {
      const {
        dryRun: [{ receipts: o, status: a }]
      } = await this.operations.dryRun({
        encodedTransactions: [K(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(Tr), s = a;
      const { missingOutputVariables: u, missingOutputContractIds: f } = T0(t);
      if ((u.length !== 0 || f.length !== 0) && Gr(e)) {
        n += u.length, e.addVariableOutputs(u.length), f.forEach(({ contractId: C }) => {
          e.addContractInputAndOutput(ft.fromString(C)), r.push(C);
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
    })), r = xe(e), n = /* @__PURE__ */ new Map();
    r.forEach((o, a) => {
      Gr(o) && n.set(a, K(o.toTransactionBytes()));
    });
    let s = Array.from(n.keys()), i = 0;
    for (; s.length > 0 && i < O0; ) {
      const o = s.map(
        (f) => n.get(f)
      ), a = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), u = [];
      for (let f = 0; f < a.dryRun.length; f++) {
        const g = s[f], { receipts: I, status: C } = a.dryRun[f], S = t[g];
        S.receipts = I.map(Tr), S.dryRunStatus = C;
        const { missingOutputVariables: Q, missingOutputContractIds: N } = T0(
          S.receipts
        ), T = Q.length > 0 || N.length > 0, F = r[g];
        if (T && Gr(F)) {
          S.outputVariables += Q.length, F.addVariableOutputs(Q.length), N.forEach(({ contractId: z }) => {
            F.addContractInputAndOutput(ft.fromString(z)), S.missingContractIds.push(z);
          });
          const { maxFee: Y } = await this.estimateTxGasAndFee({
            transactionRequest: F
          });
          F.maxFee = Y, n.set(g, K(F.toTransactionBytes())), u.push(g);
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
    return s.map(({ receipts: o, status: a }) => ({ receipts: o.map(Tr), dryRunStatus: a }));
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
    const a = wn({
      gasPrice: R(r),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let u = R(0);
    Gr(t) && (u = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(n, o)
    ), u = t.gasLimit));
    const f = t.calculateMaxGas(n, o), g = wn({
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
    const r = Ne(e);
    if (t)
      return this.estimateTxDependencies(r);
    const n = [K(r.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: a, receipts: u, status: f } = o, g = u.map(Tr);
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
    const r = xe(Ne(e)), n = r.maxFee.eq(0), s = Gr(r);
    s && (r.gasLimit = R(0));
    const i = xe(r);
    let o = 0;
    if (t && Gr(i)) {
      const Y = i.witnesses.length;
      await t(i), o = i.witnesses.length - Y;
    }
    await this.estimatePredicates(i), r.updatePredicateGasUsed(i.inputs);
    let { maxFee: a, maxGas: u, minFee: f, minGas: g, gasPrice: I, gasLimit: C } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), S = [], Q, N = [], T = 0, F = R(0);
    if (r.maxFee = a, s) {
      if (r.gasLimit = C, t && await t(r), { receipts: S, missingContractIds: N, outputVariables: T, dryRunStatus: Q } = await this.estimateTxDependencies(r), Q && "reason" in Q)
        throw this.extractDryRunError(r, S, Q);
      F = Ti(S), r.gasLimit = F, { maxFee: a, maxGas: u, minFee: f, minGas: g, gasPrice: I } = await this.estimateTxGasAndFee({
        transactionRequest: r,
        gasPrice: I
      });
    }
    return {
      receipts: S,
      gasUsed: F,
      gasPrice: I,
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
        paginationLimit: M0,
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
      queryPerAsset: t.map(ja).map(({ assetId: g, amount: I, max: C }) => ({
        assetId: K(g),
        amount: I.toString(10),
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
        paginationLimit: _2,
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
          return (s = new Ar().decode($(n.rawPayload), 0)) == null ? void 0 : s[0];
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
    } = await this.operations.getTransactions(e), n = new Ar();
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
        paginationLimit: M0
      }),
      owner: ft.fromAddressOrString(e).toB256()
    });
    return {
      messages: r.map(({ node: i }) => ({
        messageId: Fr.getMessageId({
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
        data: Fr.decodeData(i.data),
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
      recipient: I,
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
      recipient: ft.fromAddressOrString(I),
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
      startTimestamp: t ? ya.fromUnixMilliseconds(t).toTai64() : void 0
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
    return new da(e, this);
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
      messageId: Fr.getMessageId({
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
      data: Fr.decodeData(t.data),
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
    return e.abis && (s = sc(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), tc({
      logs: s,
      receipts: t,
      statusReason: n.reason
    });
  }
}, Ai = ze;
ua = /* @__PURE__ */ new WeakSet();
Cl = function(e, t) {
  if (!this.cache)
    return;
  const r = e.reduce(
    (n, s) => (s.type === Bt.Coin ? n.utxos.push(s.id) : s.type === Bt.Message && n.messages.push(s.nonce), n),
    { utxos: [], messages: [] }
  );
  this.cache.set(t, r);
};
Pt(Ai, "chainInfoCache", {});
Pt(Ai, "nodeInfoCache", {});
async function uB(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new x(
      D.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Ar().decode(
    $(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const a = o.map(Tr), {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: f },
      txParameters: { maxInputs: g, maxGasPerTx: I },
      gasCosts: C
    }
  } = r.getChain(), S = await r.getLatestGasPrice(), Q = r.getBaseAssetId();
  return {
    ...Di({
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
      maxGasPerTx: I,
      gasPrice: S,
      baseAssetId: Q
    })
  };
}
async function _B(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: o, gasCosts: a, maxGasPerTx: u } = t.getGasConfig(), f = t.getChain().consensusParameters.txParameters.maxInputs, g = r.toTransaction(), I = r.toTransactionBytes(), C = await t.getLatestGasPrice(), S = t.getBaseAssetId();
  return Di({
    id: r.getTransactionId(t.getChainId()),
    receipts: s,
    transaction: g,
    transactionBytes: I,
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
async function hB(e) {
  const { filters: t, provider: r, abiMap: n } = e, { transactionsByOwner: s } = await r.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: a, gasPriceFactor: u },
      txParameters: { maxInputs: f, maxGasPerTx: g },
      gasCosts: I
    }
  } = r.getChain(), C = await r.getLatestGasPrice(), S = r.getBaseAssetId();
  return {
    transactions: i.map((N) => {
      const { node: T } = N, { id: F, rawPayload: Y, status: z } = T, [H] = new Ar().decode($(Y), 0);
      let M = [];
      T != null && T.status && "receipts" in T.status && (M = T.status.receipts);
      const L = M.map(Tr);
      return {
        ...Di({
          id: F,
          receipts: L,
          transaction: H,
          transactionBytes: $(Y),
          gqlTransactionStatus: z,
          abiMap: n,
          gasPerByte: a,
          gasPriceFactor: u,
          maxInputs: f,
          gasCosts: I,
          maxGasPerTx: g,
          gasPrice: C,
          baseAssetId: S
        })
      };
    }),
    pageInfo: o
  };
}
var ut = {
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
}, f2 = (e) => {
  if (e === "ethereum")
    return ut.eth.sepolia;
  if (e === "fuel")
    return ut.fuel.testnet;
}, p2 = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), Bl = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? f2(r);
  if (i === void 0)
    return;
  const o = p2({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, lB = (e, t) => Bl({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), fB = (e, t) => Bl({
  asset: e,
  networkType: "fuel",
  chainId: t
}), A2 = "/", g2 = /^\/|\/$/g, w2 = (e = "") => e.replace(g2, "");
function m2(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(w2);
  return n && r && s.unshift(""), s.join(A2);
}
function y2(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: m2(t, r.icon)
  }));
}
var b2 = "https://cdn.fuel.network/assets/", I2 = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: ut.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ut.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ut.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: ut.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
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
        chainId: ut.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ut.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 9
      }
    ]
  }
], pB = y2(I2, b2), L0 = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, E2 = (e) => {
  const { assetId: t, amountToTransfer: r, hexlifiedContractId: n } = e, i = new P("u64").encode(new Gt(r).toNumber());
  return Uint8Array.from([
    ...$(n),
    ...i,
    ...$(t)
  ]);
}, v2 = async (e) => {
  const t = E2(e);
  await Ri();
  const r = Oh(16, 0, Lh.ScriptData), n = fr(17, 16, 32), s = ts(18, 17, 0), i = fr(19, 17, 8), o = Qh(16, 18, 19), a = Xa(1);
  return { script: Uint8Array.from([
    ...r.to_bytes(),
    ...n.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...a.to_bytes()
  ]), scriptData: t };
}, C2 = 5, Qi = class extends nh {
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
    O(this, "address");
    /**
     * The provider used to interact with the network.
     */
    O(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    O(this, "_connector");
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
    var Y;
    const { addedSignatures: n, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o, gasPrice: a } = r, u = t.maxFee, f = this.provider.getBaseAssetId(), g = ((Y = i.find((z) => z.assetId === f)) == null ? void 0 : Y.amount) || R(0), I = q1({
      amount: R(u),
      assetId: f,
      coinQuantities: i
    }), C = {};
    I.forEach(({ amount: z, assetId: H }) => {
      C[H] = {
        required: z,
        owned: R(0)
      };
    }), t.inputs.filter(en).forEach((z) => {
      const M = nn(z) ? String(z.assetId) : f;
      C[M] && (C[M].owned = C[M].owned.add(z.amount));
    });
    let S = [];
    Object.entries(C).forEach(([z, { owned: H, required: M }]) => {
      H.lt(M) && S.push({
        assetId: z,
        amount: M.sub(H)
      });
    });
    let Q = S.length > 0, N = 0;
    for (; Q && N < C2; ) {
      const z = await this.getResourcesToSpend(
        S,
        fv(t.inputs, this.address)
      );
      t.addResources(z), t.updatePredicateGasUsed(s);
      const H = xe(t);
      if (n && Array.from({ length: n }).forEach(
        () => H.addEmptyWitness()
      ), !o) {
        Q = !1;
        break;
      }
      const { maxFee: M } = await this.provider.estimateTxGasAndFee({
        transactionRequest: H,
        gasPrice: a
      }), L = lv(
        t.inputs.filter(en),
        f,
        f
      ), G = g.add(M);
      L.gt(G) ? Q = !1 : S = [
        {
          amount: G.sub(L),
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
    const T = xe(t);
    if (n && Array.from({ length: n }).forEach(() => T.addEmptyWitness()), !o)
      return t;
    const { maxFee: F } = await this.provider.estimateTxGasAndFee({
      transactionRequest: T
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
    const i = ft.fromAddressOrString(t), o = n ?? this.provider.getBaseAssetId(), { script: a, scriptData: u } = await v2({
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
      ...$(wv.bytes),
      ...i,
      ...o
    ]), ...n }, f = this.provider.getBaseAssetId();
    let g = new Wr(u);
    const I = [{ amount: R(r), assetId: f }], C = await this.getTransactionCost(g, { quantities: I });
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
    const s = xe(Ne(t)), i = this.provider.getBaseAssetId(), o = s.getCoinOutputsQuantities(), a = L0(o, n), u = [{ assetId: i, amount: R("100000000000000000") }], f = (C) => s.inputs.find((S) => S.type === Bt.Coin ? S.assetId === C : pl(S) ? i === C : !1), g = (C, S) => {
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
    return L0(a, u).forEach(
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
    const n = Ne(t);
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
    const n = Ne(t);
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
      id: K(Ve(Zs)),
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
    const o = Ne(n);
    if (!Mr(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new x(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!Mr(i))
      o.maxFee = r;
    else if (r.gt(i))
      throw new x(
        D.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${r}'.`
      );
    return o;
  }
}, Sn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    O(this, "address");
    O(this, "publicKey");
    O(this, "compressedPublicKey");
    O(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = pr(e, 32);
    this.privateKey = K(t), this.publicKey = K(Cr.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = K(Cr.getPublicKey(t, !0)), this.address = ft.fromPublicKey(this.publicKey);
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
    const t = Cr.sign($(e), $(this.privateKey)), r = pr(`0x${t.r.toString(16)}`, 32), n = pr(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, K(ct([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = Cr.ProjectivePoint.fromHex($(this.compressedPublicKey)), r = Cr.ProjectivePoint.fromHex($(e));
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
    const a = new Cr.Signature(BigInt(K(n)), BigInt(K(s))).addRecoveryBit(
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
    return ft.fromPublicKey(Sn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Ye(ct([Ve(32), $(e)])) : Ve(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = Cr.ProjectivePoint.fromHex($(e));
    return K(t.toRawBytes(!1).slice(1));
  }
}, k0 = 13, P0 = 8, U0 = 1, Co = 32, B2 = 16, G0 = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function x2(e, t, r) {
  const n = Qr(G0(e), "hex"), s = ft.fromAddressOrString(t), i = Ve(Co), o = L_({
    password: Qr(r),
    salt: i,
    dklen: Co,
    n: 2 ** k0,
    r: P0,
    p: U0
  }), a = Ve(B2), u = await _A(n, o, a), f = Uint8Array.from([...o.subarray(16, 32), ...u]), g = k_(f), I = zn(g, "hex"), C = {
    id: fA(),
    version: 3,
    address: G0(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: I,
      cipherparams: { iv: zn(a, "hex") },
      ciphertext: zn(u, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Co,
        n: 2 ** k0,
        p: U0,
        r: P0,
        salt: zn(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function R2(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: u, p: f, salt: g }
    }
  } = r, I = Qr(s, "hex"), C = Qr(i, "hex"), S = Qr(g, "hex"), Q = Qr(t), N = L_({
    password: Q,
    salt: S,
    n: a,
    p: f,
    r: u,
    dklen: o
  }), T = Uint8Array.from([...N.subarray(16, 32), ...I]), F = k_(T), Y = zn(F, "hex");
  if (n !== Y)
    throw new x(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const z = await uA(I, N, C);
  return K(z);
}
var xl = class extends Qi {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, r) {
    const n = new Sn(t);
    super(n.address, r);
    /**
     * A function that returns the wallet's signer.
     */
    O(this, "signer");
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
    const r = await this.signer().sign(AA(t));
    return K(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Ne(t), n = this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
    return K(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const r = Ne(t), n = await this.signTransaction(r);
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
    const n = Ne(t);
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
    const n = Ne(t);
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
    return x2(this.privateKey, this.address, t);
  }
};
Pt(xl, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Rs = [
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
], S2 = /* @__PURE__ */ ((e) => (e.english = "english", e))(S2 || {});
function N2(e) {
  return (1 << e) - 1;
}
function Rl(e) {
  return (1 << e) - 1 << 8 - e;
}
function Bo(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function T2(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function D2(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & N2(8 - r)), r += 3);
  const n = e.length / 4, s = $(Be(e))[0] & Rl(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function Q2(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = $(new Uint8Array(r));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const g = t.indexOf(e[f].normalize("NFKD"));
    if (g === -1)
      throw new x(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let I = 0; I < 11; I += 1)
      g & 1 << 10 - I && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = Rl(o);
  if (($(Be(n.slice(0, i / 8)))[0] & a) !== (n[n.length - 1] & a))
    throw new x(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var F2 = bn("Bitcoin seed"), O2 = "0x0488ade4", M2 = "0x04358394", z0 = [12, 15, 18, 21, 24];
function V0(e) {
  if (e.length !== 2048)
    throw new x(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function L2(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new x(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function xo(e) {
  if (!z0.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${z0.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new x(D.INVALID_MNEMONIC, t);
  }
}
var Br = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Rs) {
    O(this, "wordlist");
    this.wordlist = e, V0(this.wordlist);
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
  static mnemonicToEntropy(e, t = Rs) {
    const r = Bo(e);
    return xo(r), K(Q2(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Rs) {
    const r = $(e);
    return V0(t), L2(r), D2(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    xo(Bo(e));
    const r = bn(T2(e)), n = bn(`mnemonic${t}`);
    return hA(r, n, 2048, 64, "sha512");
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
    const t = Bo(e);
    let r = 0;
    try {
      xo(t);
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
    const t = Rs;
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
    return $(P_("sha512", F2, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = Br.masterKeysFromSeed(e), n = $(t ? M2 : O2), s = "0x00", i = "0x00000000", o = "0x00000000", a = r.slice(32), u = r.slice(0, 32), f = ct([
      n,
      s,
      i,
      o,
      a,
      ct(["0x00", u])
    ]), g = ba(Be(Be(f)), 0, 4);
    return g_(ct([f, g]));
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
    const r = t ? Be(ct([Ve(e), $(t)])) : Ve(e);
    return Br.entropyToMnemonic(r);
  }
}, ic = Br, Sl = 2147483648, Nl = K("0x0488ade4"), oc = K("0x0488b21e"), Tl = K("0x04358394"), ac = K("0x043587cf");
function Y0(e) {
  return g_(ct([e, ba(Be(Be(e)), 0, 4)]));
}
function k2(e = !1, t = !1) {
  return e ? t ? ac : oc : t ? Tl : Nl;
}
function P2(e) {
  return [oc, ac].includes(K(e.slice(0, 4)));
}
function U2(e) {
  return [Nl, Tl, oc, ac].includes(
    K(e.slice(0, 4))
  );
}
function G2(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new x(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + Sl : parseInt(n, 10)
  );
}
var dn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    O(this, "depth", 0);
    O(this, "index", 0);
    O(this, "fingerprint", K("0x00000000"));
    O(this, "parentFingerprint", K("0x00000000"));
    O(this, "privateKey");
    O(this, "publicKey");
    O(this, "chainCode");
    if (e.privateKey) {
      const t = new Sn(e.privateKey);
      this.publicKey = K(t.compressedPublicKey), this.privateKey = K(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new x(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = K(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ba(lA(Be(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & Sl) {
      if (!t)
        throw new x(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set($(this.publicKey));
    s.set(pr(e, 4), 33);
    const i = $(P_("sha512", n, s)), o = i.slice(0, 32), a = i.slice(32);
    if (t) {
      const I = R(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new dn({
        privateKey: I,
        chainCode: a,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new Sn(K(o)).addPoint(r);
    return new dn({
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
    return G2(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
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
    const r = k2(this.privateKey == null || e, t), n = K(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = ga(this.index, 4), o = this.chainCode, a = this.privateKey != null && !e ? ct(["0x00", this.privateKey]) : this.publicKey, u = $(ct([r, n, s, i, o, a]));
    return Y0(u);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = ic.masterKeysFromSeed(e);
    return new dn({
      chainCode: $(t.slice(32)),
      privateKey: $(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = K(pr(Wf(e))), r = $(t), n = Y0(r.slice(0, 78)) === e;
    if (r.length !== 82 || !U2(r))
      throw new x(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new x(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = K(r.slice(5, 9)), o = parseInt(K(r.slice(9, 13)).substring(2), 16), a = K(r.slice(13, 45)), u = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new x(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (P2(r)) {
      if (u[0] !== 3)
        throw new x(D.HD_WALLET_ERROR, "Invalid public extended key.");
      return new dn({
        publicKey: u,
        chainCode: a,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (u[0] !== 0)
      throw new x(D.HD_WALLET_ERROR, "Invalid private extended key.");
    return new dn({
      privateKey: u.slice(1),
      chainCode: a,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Ro = dn, Dl = class extends Qi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Fe(e, this._provider);
  }
}, Fe = class extends xl {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Sn("0x00"), new Dl(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Sn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Fe(t, e == null ? void 0 : e.provider);
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
    const s = Ro.fromSeed(e).derivePath(t || Fe.defaultPath);
    return new Fe(s.privateKey, r);
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
    const s = ic.mnemonicToSeed(e, r), o = Ro.fromSeed(s).derivePath(t || Fe.defaultPath);
    return new Fe(o.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const r = Ro.fromExtendedKey(e);
    return new Fe(r.privateKey, t);
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
    const n = await R2(e, t);
    return new Fe(n, r);
  }
}, Re = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new Dl(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Fe(e, t);
  }
};
Pt(Re, "generate", Fe.generate);
Pt(Re, "fromSeed", Fe.fromSeed);
Pt(Re, "fromMnemonic", Fe.fromMnemonic);
Pt(Re, "fromExtendedKey", Fe.fromExtendedKey);
Pt(Re, "fromEncryptedJson", Fe.fromEncryptedJson);
var z2 = class {
  constructor() {
    O(this, "storage", /* @__PURE__ */ new Map());
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
}, Vr, Ql = class {
  constructor(e) {
    Nr(this, Vr, void 0), Pt(this, "pathKey", "{}"), Pt(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Pt(this, "numberOfAccounts", 0), Je(this, Vr, e.secret || ic.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Lt(this, Vr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const r = Re.fromMnemonic(Lt(this, Vr), this.getDerivePath(t));
      e.push({
        publicKey: r.publicKey,
        address: r.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Re.fromMnemonic(Lt(this, Vr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const r = ft.fromAddressOrString(e);
    do {
      const n = Re.fromMnemonic(Lt(this, Vr), this.getDerivePath(t));
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
    return Re.fromPrivateKey(t);
  }
};
Vr = /* @__PURE__ */ new WeakMap();
Pt(Ql, "type", "mnemonic");
var xr, Fl = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Nr(this, xr, []), e.secret ? Je(this, xr, [e.secret]) : Je(this, xr, e.accounts || [Re.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Lt(this, xr)
    };
  }
  getPublicAccount(e) {
    const t = Re.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Lt(this, xr).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Re.generate();
    return Lt(this, xr).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ft.fromAddressOrString(e), r = Lt(this, xr).find(
      (n) => Re.fromPrivateKey(n).address.equals(t)
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
    return Re.fromPrivateKey(t);
  }
};
xr = /* @__PURE__ */ new WeakMap();
Pt(Fl, "type", "privateKey");
var dr = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function ur(e, t) {
  if (!e)
    throw new x(D.WALLET_MANAGER_ERROR, t);
}
var De, Yr, tr, _a, Ol, ha, Ml, Ll = class extends rl.EventEmitter {
  constructor(e) {
    super(), Nr(this, _a), Nr(this, ha), Pt(this, "storage", new z2()), Pt(this, "STORAGE_KEY", "WalletManager"), Nr(this, De, []), Nr(this, Yr, ""), Nr(this, tr, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Lt(this, tr);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    ur(!Lt(this, tr), dr.wallet_not_unlocked);
    const t = Lt(this, De).find((r, n) => n === e);
    return ur(t, dr.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Lt(this, De).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Lt(this, De).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = ft.fromAddressOrString(e), r = Lt(this, De).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return ur(r, dr.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ft.fromAddressOrString(e);
    ur(!Lt(this, tr), dr.wallet_not_unlocked);
    const r = Lt(this, De).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return ur(r, dr.address_not_found), r.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Lt(this, De)[(e == null ? void 0 : e.vaultId) || 0];
    await ur(t, dr.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Lt(this, De).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    Je(this, De, Lt(this, De).concat({
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
    Je(this, tr, !0), Je(this, De, []), Je(this, Yr, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Je(this, Yr, e), Je(this, tr, !1);
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
    const r = Lt(this, tr);
    await this.unlock(e), Je(this, Yr, t), await this.saveState(), await this.loadState(), r && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await ur(!Lt(this, tr), dr.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await cA(Lt(this, Yr), JSON.parse(e));
      Je(this, De, ea(this, ha, Ml).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await ur(!Lt(this, tr), dr.wallet_not_unlocked);
    const e = await dA(Lt(this, Yr), {
      vaults: ea(this, _a, Ol).call(this, Lt(this, De))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Ll.Vaults.find((r) => r.type === e);
    return ur(t, dr.invalid_vault_type), t;
  }
}, V2 = Ll;
De = /* @__PURE__ */ new WeakMap();
Yr = /* @__PURE__ */ new WeakMap();
tr = /* @__PURE__ */ new WeakMap();
_a = /* @__PURE__ */ new WeakSet();
Ol = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
ha = /* @__PURE__ */ new WeakSet();
Ml = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Pt(V2, "Vaults", [Ql, Fl]);
var Y2 = class {
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
Pt(Y2, "type");
var AB = class {
}, H2 = (e) => {
  const r = $(e), n = l_(r, 16384), s = nl(n.map((o) => K(o)));
  return Ye(ct(["0x4655454C", s]));
};
function X2(e) {
  const t = e.buffer.slice(e.byteOffset + 8, e.byteOffset + 16), n = new DataView(t).getBigUint64(0, !1);
  return Number(n);
}
var H0 = class extends Qi {
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
    configurableConstants: i,
    /**
     * TODO: Implement a getBytes method within the Predicate class. This method should return the loaderBytecode if it is set.
     * The getBytes method should be used in all places where we use this.bytes.
     * Note: Do not set loaderBytecode to a default string here; it should remain undefined when not provided.
     */
    loaderBytecode: o = ""
  }) {
    const { predicateBytes: a, predicateInterface: u } = H0.processPredicateData(
      t,
      r,
      i
    ), f = ft.fromB256(H2(a));
    super(f, n);
    O(this, "bytes");
    O(this, "predicateData", []);
    O(this, "interface");
    O(this, "loaderBytecode", "");
    this.bytes = a, this.interface = u, this.loaderBytecode = o, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const r = Ne(t), n = this.getIndexFromPlaceholderWitness(r);
    return n !== -1 && r.removeWitness(n), r.inputs.filter(Al).forEach((s) => {
      na(s, this.address) && (s.predicate = K(this.bytes), s.predicateData = K(this.getPredicateData()), s.witnessIndex = 0);
    }), r;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const r = Ne(t);
    return super.sendTransaction(r, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const r = Ne(t);
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
    if (r && (i = new wr(r), i.functions.main === void 0))
      throw new x(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = H0.setConfigurableConstants(
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
  static setConfigurableConstants(t, r, n, s) {
    const i = t;
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
      if (Object.entries(r).forEach(([o, a]) => {
        if (!(n != null && n.configurables[o]))
          throw new x(
            D.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${o}' found in the Predicate`
          );
        const { offset: u } = n.configurables[o], f = n.encodeConfigurable(o, a);
        i.set(f, u);
      }), s) {
        const o = X2(t), a = i.slice(o), u = a.length, f = new Uint8Array(8);
        new DataView(f.buffer).setBigUint64(0, BigInt(u), !1), i.set(ct([s, f, a]));
      }
    } catch (o) {
      throw new x(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${o.message}.`
      );
    }
    return i;
  }
  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  getIndexFromPlaceholderWitness(t) {
    var i;
    const r = t.inputs.filter(en).filter((o) => na(o, this.address));
    let n = -1;
    const s = r.find((o) => !o.predicate);
    return s && (n = s.witnessIndex, r.every((a) => !a.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
  }
}, kl = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(kl || {}), cc = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(cc || {}), Pl = "FuelConnector", Z2 = class {
  constructor(e) {
    O(this, "storage");
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
}, W2 = class extends rl.EventEmitter {
  constructor() {
    super(...arguments);
    O(this, "name", "");
    O(this, "metadata", {});
    O(this, "connected", !1);
    O(this, "installed", !1);
    O(this, "external", !0);
    O(this, "events", cc);
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
function j2(e, { cache: t, cacheTime: r, key: n }) {
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
function gB(e) {
  window.dispatchEvent(
    new CustomEvent(Pl, {
      detail: e
    })
  );
}
function q2() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function Ss(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new x(x.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var J2 = 2e3, $2 = 5e3, { warn: K2 } = console, Xn = class extends W2 {
  constructor(t = Xn.defaultConfig) {
    super();
    O(this, "_storage", null);
    O(this, "_connectors", []);
    O(this, "_targetObject", null);
    O(this, "_unsubscribes", []);
    O(this, "_targetUnsubscribe", () => {
    });
    O(this, "_pingCache", {});
    O(this, "_currentConnector");
    O(this, "_initializationPromise", null);
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    O(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, r = Pl;
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
    O(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    O(this, "triggerConnectorEvents", async () => {
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
    O(this, "getConnector", (t) => this._connectors.find((r) => {
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
      return new Z2(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(Xn.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
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
    Object.values(kl).forEach((t) => {
      this[t] = async (...r) => this.callMethod(t, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const r = Date.now(), [n, s] = await Promise.allSettled([
      Ss(t.isConnected()),
      Ss(this.pingConnector(t))
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
      return await j2(async () => Ss(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: $2
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
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(cc)), await ((o = this._storage) == null ? void 0 : o.setItem(Xn.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = q2();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Ss(t.promise, J2).then(() => !0).catch(() => !1);
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
    return K2(
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
      r = await Ai.create(t.url);
    else {
      if (t)
        throw new x(D.INVALID_PROVIDER, "Provider is not valid.");
      {
        const n = await this.currentNetwork();
        r = await Ai.create(n.url);
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
    return new Qi(t, n, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Xn.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Ul = Xn;
Pt(Ul, "STORAGE_KEY", "fuel-current-connector");
Pt(Ul, "defaultConfig", {});
function X0(e, t) {
  if (!e)
    throw new x(D.TRANSACTION_ERROR, t);
}
function Gl(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var zl = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = Gl(r);
  return sc(e, n, s);
}, er, r_, dc = (r_ = class {
  constructor(...e) {
    He(this, er);
    $e(this, er, e || []);
  }
  entries() {
    return Vt(this, er);
  }
  push(...e) {
    Vt(this, er).push(...e);
  }
  concat(e) {
    return Vt(this, er).concat(e);
  }
  extend(e) {
    Vt(this, er).push(...e);
  }
  toBytes() {
    return ct(
      Vt(this, er).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return K(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Vt(this, er), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, er = new WeakMap(), r_), tC = (e) => X_ + H_({ maxInputs: e });
function eC(e) {
  const t = [...e.receipts];
  let r, n;
  if (t.forEach((i) => {
    i.type === pt.ScriptResult ? r = i : (i.type === pt.Return || i.type === pt.ReturnData || i.type === pt.Revert) && (n = i);
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
function uc(e, t, r = []) {
  var n;
  try {
    const s = eC(e);
    return t(s);
  } catch (s) {
    if (s.code === D.SCRIPT_REVERTED) {
      const i = (n = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : n.reason;
      throw tc({
        logs: r,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function rC(e, t, r) {
  return uc(
    e,
    (n) => {
      if (n.returnReceipt.type === pt.Revert)
        throw new x(
          D.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(r)}`
        );
      if (n.returnReceipt.type !== pt.Return && n.returnReceipt.type !== pt.ReturnData) {
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
      return n.returnReceipt.type === pt.Return && (s = n.returnReceipt.val), n.returnReceipt.type === pt.ReturnData && (s = t.func.decodeOutput(n.returnReceipt.data)[0]), s;
    },
    r
  );
}
var Fi = class {
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
    O(this, "bytes");
    /**
     * A function to encode the script data.
     */
    O(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    O(this, "scriptResultDecoder");
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
    return H_({ maxInputs: t }) + X_ + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Fi.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return uc(e, this.scriptResultDecoder, t);
  }
}, Vl = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, nC = Qt, Yl = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: r,
  assetIdOffset: n
}) => {
  const s = new dc(
    ln(16, e),
    ln(17, r),
    ts(17, 17, 0),
    ln(18, n)
  );
  return t ? s.push(
    ln(19, t),
    ts(19, 19, 0),
    qo(16, 17, 18, 19)
  ) : s.push(qo(16, 17, 18, l.cgas().to_u8())), s;
};
function Z0(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new dc();
  for (let r = 0; r < e.length; r += 1)
    t.extend(Yl(e[r]).entries());
  return t.push(Xa(1)), t.toBytes();
}
var sC = (e) => e === pt.Return || e === pt.ReturnData, iC = (e, t) => e.find(
  ({ type: r, from: n, to: s }) => r === pt.Call && n === nC && s === t
), oC = (e) => (t) => {
  if (Rr(t.code) !== 0)
    throw new x(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = iC(
    t.receipts,
    e.toB256()
  ), n = R(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => sC(i)).flatMap((i) => n.eq(R(i.is)) ? i.type === pt.Return ? [new P("u64").encode(i.val)] : i.type === pt.ReturnData ? [$(i.data)] : [new Uint8Array()] : []);
}, aC = (e, t, r = []) => uc(e, oC(t), r), cC = (e) => e.reduce(
  (t, r) => {
    const n = { ...Vl };
    return r.gas && (n.gasForwardedOffset = 1), t + Yl(n).byteLength();
  },
  V.size()
  // placeholder for single RET instruction which is added later
), dC = (e, t) => new Fi(
  // Script to call the contract, start with stub size matching length of calls
  Z0(new Array(e.length).fill(Vl)),
  (r) => {
    var S;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = cC(r), i = (8 - s % 8) % 8, o = s + i, a = tC(t.toNumber()) + o, u = [];
    let f = a;
    const g = [];
    for (let Q = 0; Q < n; Q += 1) {
      const N = r[Q], T = f, F = T + gt, Y = F + Ws, z = Y + MA + gt + gt, H = z + N.fnSelectorBytes.byteLength, M = $(N.data);
      let L = 0;
      g.push(new P("u64").encode(N.amount || 0)), g.push(new j().encode(((S = N.assetId) == null ? void 0 : S.toString()) || Qt)), g.push(N.contractId.toBytes()), g.push(new P("u64").encode(z)), g.push(new P("u64").encode(H)), g.push(N.fnSelectorBytes), g.push(M), N.gas && (g.push(new P("u64").encode(N.gas)), L = H + M.byteLength);
      const G = {
        amountOffset: T,
        assetIdOffset: F,
        gasForwardedOffset: L,
        callDataOffset: Y
      };
      u.push(G), f = a + ct(g).byteLength;
    }
    const I = Z0(u);
    return { data: ct(g), script: I };
  },
  () => [new Uint8Array()]
), Hl = (e, t, r, n) => {
  var a;
  const s = (a = e[0]) == null ? void 0 : a.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return rC({ receipts: t }, s, n);
  const o = aC(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((u, f) => {
    var I;
    const { func: g } = e[f].getCallConfig();
    return (I = g.decodeOutput(u)) == null ? void 0 : I[0];
  });
  return r ? o : o == null ? void 0 : o[0];
}, uC = async (e) => {
  var S;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, a = Array.isArray(t) ? t : [t], u = (S = a[0]) == null ? void 0 : S.getCallConfig(), f = zl(o, u, a), g = Hl(a, o, r, f), I = Ti(o);
  return {
    isMultiCall: r,
    functionScopes: a,
    value: g,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: f,
    gasUsed: I
  };
}, So = (e) => {
  var I;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], o = (I = i[0]) == null ? void 0 : I.getCallConfig(), a = zl(s, o, i), u = Hl(i, s, n, a), f = Ti(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: f,
    value: u
  };
};
function _C(e) {
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
var Xl = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    O(this, "transactionRequest");
    O(this, "program");
    O(this, "functionInvocationScopes", []);
    O(this, "txParameters");
    O(this, "requiredCoins", []);
    O(this, "isMultiCall", !1);
    O(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    O(this, "externalAbis", {});
    O(this, "addSignersCallback");
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
    return this.functionInvocationScopes.map((r) => _C(r));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), r = dC(this.functionInvocationScopes, t);
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
    await Ri(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === xt.Script && (this.transactionRequest.abis = Gl(this.functionInvocationScopes));
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
    const e = xe(await this.getTransactionRequest());
    return (this.program.account ?? Re.generate({ provider: this.getProvider() })).getTransactionCost(e, {
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
    e = xe(e);
    const t = await this.getTransactionCost(), { gasUsed: r, missingContractIds: n, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, r, i), e.inputs = e.inputs.filter((a) => a.type !== Bt.Coin), n.forEach((a) => {
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
    X0(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => uC({
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
    if (X0(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new x(
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
    const n = Mr((a = this.txParameters) == null ? void 0 : a.gasLimit) || this.hasCallParamsGasLimit, s = Mr((u = this.txParameters) == null ? void 0 : u.maxFee), { gasLimit: i, maxFee: o } = e;
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
}, Zl = class extends Xl {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, r, n) {
    super(t, !1);
    O(this, "func");
    O(this, "callParameters");
    O(this, "forward");
    O(this, "args");
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
      this.forward = ja(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, hC = class extends Xl {
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
}, W0 = class {
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
    O(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    O(this, "provider");
    /**
     * The contract's ABI interface.
     */
    O(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    O(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    O(this, "functions", {});
    this.interface = t instanceof wr ? t : new wr(t), this.id = ft.fromAddressOrString(e), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), Object.keys(this.interface.functions).forEach((n) => {
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
      const t = (...r) => new Zl(this, e, r);
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
    return new hC(this, e);
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
}, lC = class extends Zl {
  constructor() {
    super(...arguments);
    O(this, "scriptRequest");
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
    this.scriptRequest = new Fi(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, wB = class extends ng {
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
    O(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    O(this, "interface");
    /**
     * The account associated with the script.
     */
    O(this, "account");
    /**
     * The script request object.
     */
    O(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    O(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    O(this, "functions");
    this.bytes = $(t), this.interface = new wr(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new lC(this, this.interface.getFunction("main"), s)
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
new Fi(
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
function mB(e) {
  return e;
}
var fC = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(fC || {}), pC = Object.defineProperty, AC = (e, t) => {
  for (var r in t)
    pC(e, r, { get: t[r], enumerable: !0 });
}, gC = (e) => {
  const { RegId: t, Instruction: r } = Gh, n = 12, s = e.length, i = gr, o = ct(e.map((u) => $(u))), a = new dc(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    Zr(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    fr(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    Zr(22, t.sp().to_u8()),
    // loop counter
    ln(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    ii(17, 16),
    // push the blob contents onto the stack
    Wn(16, 0, 17, 1),
    // move on to the next blob
    fr(16, 16, i),
    // decrement the loop counter
    Fh(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    Mh(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    ri(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    si(22, 22, 4),
    // jump to the start of the contract we loaded
    ni(22)
  ).toBytes();
  return ct([a, o]);
}, wC = 32, Ce = 16, Ue = 17, an = 18, mC = 8;
function Wl(e) {
  const n = new DataView(e.buffer, 8, 8).getBigUint64(0, !1);
  return Number(n);
}
function yC(e, t) {
  const { RegId: r, Instruction: n } = Gh, s = r.pc().to_u8(), i = r.sp().to_u8(), o = r.is().to_u8(), a = (N) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Zr(Ce, s),
    // hold the address of the blob ID.
    fr(
      Ce,
      Ce,
      N * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Zr(Ue, i),
    // REG_GENERAL_USE to hold the size of the blob.
    ii(an, Ce),
    // Push the blob contents onto the stack.
    Wn(Ce, 0, an, 1),
    // Move on to the data section length
    fr(Ce, Ce, wC),
    // load the size of the data section into REG_GENERAL_USE
    ts(an, Ce, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    fr(Ce, Ce, mC),
    // load the data section of the executable
    Wn(Ce, 0, an, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    ri(Ue, Ue, o),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    si(Ue, Ue, 4),
    // Jump to the start of the contract we loaded.
    ni(Ue)
  ], u = (N) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Zr(Ce, s),
    // hold the address of the blob ID.
    fr(
      Ce,
      Ce,
      N * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Zr(Ue, i),
    // REG_GENERAL_USE to hold the size of the blob.
    ii(an, Ce),
    // Push the blob contents onto the stack.
    Wn(Ce, 0, an, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    ri(Ue, Ue, o),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    si(Ue, Ue, 4),
    // Jump to the start of the contract we loaded.
    ni(Ue)
  ], f = Wl(e);
  if (e.length < f)
    throw new Error(
      `Data section offset is out of bounds, offset: ${f}, binary length: ${e.length}`
    );
  const g = e.slice(f);
  if (g.length > 0) {
    const N = a(0).length;
    if (N > 65535)
      throw new Error("Too many instructions, exceeding u16::MAX.");
    const T = new Uint8Array(
      a(N).flatMap(
        (M) => Array.from(M.to_bytes())
      )
    ), F = new Uint8Array(t), Y = new Uint8Array(8);
    new DataView(Y.buffer).setBigUint64(0, BigInt(g.length), !1);
    const H = new Uint8Array([
      ...T,
      ...F,
      ...Y
    ]);
    return {
      loaderBytecode: ct([H, g]),
      blobOffset: H.length
    };
  }
  const I = u(0).length;
  if (I > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const C = new Uint8Array(
    u(I).flatMap(
      (N) => Array.from(N.to_bytes())
    )
  ), S = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...C, ...S]) };
}
var bC = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), o = i.length;
    o % gt !== 0 && (i = ct([i, new Uint8Array(t - i.length)]), o = i.length), r.push({ id: s, size: o, bytecode: i });
  }
  return r;
}, IC = {};
AC(IC, {
  getContractId: () => Jl,
  getContractRoot: () => jl,
  getContractStorageRoot: () => ql,
  hexlifyWithPrefix: () => la
});
var jl = (e) => {
  const r = $(e), n = l_(r, 16384);
  return nl(n.map((s) => K(s)));
}, ql = (e) => {
  const t = new Z1();
  return e.forEach(({ key: r, value: n }) => t.update(Be(r), n)), t.root;
}, Jl = (e, t, r) => {
  const n = jl($(e));
  return Be(ct(["0x4655454C", t, n, r]));
}, la = (e) => K(e.startsWith("0x") ? e : `0x${e}`), j0 = 0.95, EC = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, r = null) {
    O(this, "bytecode");
    O(this, "interface");
    O(this, "provider");
    O(this, "account");
    this.bytecode = $(e), t instanceof wr ? this.interface = t : this.interface = new wr(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new EC(this.bytecode, this.interface, e);
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
      key: la(u),
      value: la(f)
    })).sort(({ key: u }, { key: f }) => u.localeCompare(f)), r = {
      salt: Ve(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new x(
        D.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || ql(r.storageSlots), i = Jl(n, r.salt, s), o = new ia({
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
    if (Mr(n)) {
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
        return { contract: new W0(s, this.interface, t), transactionResult: u };
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
    chunkSizeMultiplier: j0
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = this.getMaxChunkSize(e, n), i = bC($(this.bytecode), s).map((M) => {
      const L = this.blobTransactionRequest({
        ...e,
        bytecode: M.bytecode
      });
      return {
        ...M,
        transactionRequest: L,
        blobId: L.blobId
      };
    }), o = i.map(({ blobId: M }) => M), a = gC(o), { contractId: u, transactionRequest: f } = this.createTransactionRequest({
      bytecode: a,
      ...e
    }), g = [...new Set(o)], I = await t.provider.getBlobs(g), C = g.filter((M) => !I.includes(M));
    let S = R(0);
    const Q = t.provider.getChain(), N = await t.provider.estimateGasPrice(10), T = Q.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: M, blobId: L } of i) {
      if (C.includes(L)) {
        const k = M.calculateMinGas(Q), J = wn({
          gasPrice: N,
          gas: k,
          priceFactor: T,
          tip: M.tip
        }).add(1);
        S = S.add(J);
      }
      const G = f.calculateMinGas(Q), U = wn({
        gasPrice: N,
        gas: G,
        priceFactor: T,
        tip: f.tip
      }).add(1);
      S = S.add(U);
    }
    if (S.gt(await t.getBalance()))
      throw new x(D.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let F;
    const Y = new Promise((M) => {
      F = M;
    });
    return { waitForResult: async () => {
      const M = [];
      for (const { blobId: k, transactionRequest: J } of i)
        if (!M.includes(k) && C.includes(k)) {
          const Z = await this.fundTransactionRequest(
            J,
            e
          );
          let tt;
          try {
            tt = await (await t.sendTransaction(Z)).waitForResult();
          } catch (B) {
            if (B.message.indexOf(`BlobId is already taken ${k}`) > -1) {
              M.push(k);
              continue;
            }
            throw new x(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!tt.status || tt.status !== ca.success)
            throw new x(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          M.push(k);
        }
      await this.fundTransactionRequest(f, e), F(f.getTransactionId(t.provider.getChainId()));
      const G = await (await t.sendTransaction(f)).waitForResult();
      return { contract: new W0(u, this.interface, t), transactionResult: G };
    }, contractId: u, waitForTransactionId: () => Y };
  }
  async deployAsBlobTxForScript() {
    const e = this.getAccount(), t = Wl($(this.bytecode)), r = this.bytecode.slice(0, t), n = Ye(r), s = this.blobTransactionRequest({
      bytecode: r
    }), { loaderBytecode: i, blobOffset: o } = yC(
      $(this.bytecode),
      $(n)
    ), a = r.length - (o || 0);
    if ((await e.provider.getBlobs([n])).length > 0)
      return {
        waitForResult: () => Promise.resolve({ loaderBytecode: K(i), configurableOffsetDiff: a }),
        blobId: n
      };
    let f = R(0);
    const g = e.provider.getChain(), I = await e.provider.estimateGasPrice(10), C = g.consensusParameters.feeParameters.gasPriceFactor, S = s.calculateMinGas(g), Q = wn({
      gasPrice: I,
      gas: S,
      priceFactor: C,
      tip: s.tip
    }).add(1);
    if (f = f.add(Q), f.gt(await e.getBalance()))
      throw new x(D.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    return {
      waitForResult: async () => {
        const T = await this.fundTransactionRequest(s);
        let F;
        try {
          F = await (await e.sendTransaction(T)).waitForResult();
        } catch {
          throw new x(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
        }
        if (!F.status || F.status !== ca.success)
          throw new x(D.TRANSACTION_FAILED, "Failed to deploy contract chunk");
        return { loaderBytecode: K(i), configurableOffsetDiff: a };
      },
      blobId: n
    };
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
    return new sa({
      blobId: Ye(t),
      witnessIndex: 0,
      witnesses: [t],
      ...e
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  getMaxChunkSize(e, t = j0) {
    if (t < 0 || t > 1)
      throw new x(
        D.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const r = this.getAccount(), { consensusParameters: n } = r.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber(), i = n.txParameters.maxSize.toNumber(), o = 64e3, a = i < s ? i : s, u = a < o ? a : o, f = this.blobTransactionRequest({
      ...e,
      bytecode: Ve(32)
    }).addResources(
      r.generateFakeResources([{ assetId: r.provider.getBaseAssetId(), amount: R(1) }])
    ), g = (u - f.byteLength() - gt) * t;
    return Math.round(g / gt) * gt;
  }
}, yB = 9, bB = 3, IB = 9, EB = 9, vB = 18, CB = 15, BB = 12, xB = 9, RB = "https://devnet.fuel.network/v1/graphql", SB = "https://testnet.fuel.network/v1/graphql";
export {
  Ws as ASSET_ID_LEN,
  nh as AbstractAccount,
  eg as AbstractAddress,
  rg as AbstractContract,
  sh as AbstractProgram,
  ng as AbstractScript,
  LC as AbstractScriptRequest,
  Qi as Account,
  ft as Address,
  Ov as AddressType,
  bt as ArrayCoder,
  j as B256Coder,
  UA as B512Coder,
  _2 as BLOCKS_PAGE_SIZE_LIMIT,
  Gt as BN,
  gr as BYTES_32,
  Qn as BaseTransactionRequest,
  xl as BaseWalletUnlocked,
  P as BigNumberCoder,
  sa as BlobTransactionRequest,
  zA as BooleanCoder,
  Ct as ByteArrayCoder,
  Z_ as ByteCoder,
  ut as CHAIN_IDS,
  MA as CONTRACT_ID_LEN,
  zC as CONTRACT_MAX_SIZE,
  Mv as ChainName,
  eB as ChangeOutputCollisionError,
  _t as Coder,
  fC as Commands,
  W0 as Contract,
  EC as ContractFactory,
  IC as ContractUtils,
  ia as CreateTransactionRequest,
  EB as DECIMAL_FUEL,
  xB as DECIMAL_GWEI,
  CB as DECIMAL_KWEI,
  BB as DECIMAL_MWEI,
  vB as DECIMAL_WEI,
  IB as DEFAULT_DECIMAL_UNITS,
  bB as DEFAULT_MIN_PRECISION,
  yB as DEFAULT_PRECISION,
  h2 as DEFAULT_RESOURCE_CACHE_TTL,
  RB as DEVNET_NETWORK_URL,
  ya as DateTime,
  Xs as ENCODING_V1,
  GC as EmptyRoot,
  W_ as EnumCoder,
  D as ErrorCode,
  jw as FAILED_ASSERT_EQ_SIGNAL,
  Jw as FAILED_ASSERT_NE_SIGNAL,
  qw as FAILED_ASSERT_SIGNAL,
  Ww as FAILED_REQUIRE_SIGNAL,
  Nh as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  jC as FAILED_UNKNOWN_SIGNAL,
  qs as FUEL_BECH32_HRP_PREFIX,
  Ul as Fuel,
  W2 as FuelConnector,
  Pl as FuelConnectorEventType,
  cc as FuelConnectorEventTypes,
  kl as FuelConnectorMethods,
  x as FuelError,
  Zl as FunctionInvocationScope,
  Ro as HDWallet,
  MC as INPUT_COIN_FIXED_SIZE,
  nr as InputCoder,
  Pc as InputCoinCoder,
  Js as InputContractCoder,
  Fr as InputMessageCoder,
  Bt as InputType,
  dc as InstructionSet,
  wr as Interface,
  S2 as Language,
  Z2 as LocalStorage,
  WC as MAX_PREDICATE_DATA_LENGTH,
  ZC as MAX_PREDICATE_LENGTH,
  HC as MAX_SCRIPT_DATA_LENGTH,
  YC as MAX_SCRIPT_LENGTH,
  XC as MAX_STATIC_CONTRACTS,
  VC as MAX_WITNESSES,
  z0 as MNEMONIC_SIZES,
  z2 as MemoryStorage,
  ic as Mnemonic,
  Ql as MnemonicVault,
  hC as MultiCallInvocationScope,
  hv as NoWitnessAtIndexError,
  rB as NoWitnessByOwnerError,
  rt as NumberCoder,
  Fv as OperationName,
  $_ as OptionCoder,
  Gc as OutputChangeCoder,
  sr as OutputCoder,
  Uc as OutputCoinCoder,
  $s as OutputContractCoder,
  Vc as OutputContractCreatedCoder,
  vt as OutputType,
  zc as OutputVariableCoder,
  Kw as PANIC_DOC_URL,
  $w as PANIC_REASONS,
  ir as PoliciesCoder,
  je as PolicyType,
  H0 as Predicate,
  Fl as PrivateKeyVault,
  Ai as Provider,
  M0 as RESOURCES_PAGE_SIZE_LIMIT,
  YA as RawSliceCoder,
  td as ReceiptBurnCoder,
  Yc as ReceiptCallCoder,
  PC as ReceiptCoder,
  jc as ReceiptLogCoder,
  qc as ReceiptLogDataCoder,
  Vo as ReceiptMessageOutCoder,
  Ks as ReceiptMintCoder,
  Zc as ReceiptPanicCoder,
  Hc as ReceiptReturnCoder,
  Xc as ReceiptReturnDataCoder,
  Wc as ReceiptRevertCoder,
  Kc as ReceiptScriptResultCoder,
  Jc as ReceiptTransferCoder,
  $c as ReceiptTransferOutCoder,
  pt as ReceiptType,
  X_ as SCRIPT_FIXED_SIZE,
  wB as Script,
  Fi as ScriptRequest,
  Wr as ScriptTransactionRequest,
  Sn as Signer,
  Ta as StdStringCoder,
  AB as StorageAbstract,
  ed as StorageSlotCoder,
  K_ as StrSliceCoder,
  HA as StringCoder,
  Ii as StructCoder,
  SB as TESTNET_NETWORK_URL,
  cd as TransactionBlobCoder,
  Ar as TransactionCoder,
  sd as TransactionCreateCoder,
  id as TransactionMintCoder,
  da as TransactionResponse,
  nd as TransactionScriptCoder,
  ca as TransactionStatus,
  xt as TransactionType,
  Qv as TransactionTypeName,
  od as TransactionUpgradeCoder,
  ad as TransactionUploadCoder,
  th as TupleCoder,
  $r as TxPointerCoder,
  Zs as UTXO_ID_LEN,
  rd as UpgradePurposeCoder,
  Ge as UpgradePurposeTypeEnum,
  oa as UpgradeTransactionRequest,
  aa as UploadTransactionRequest,
  UC as UtxoIdCoder,
  Y2 as Vault,
  XA as VecCoder,
  gt as WORD_SIZE,
  Re as Wallet,
  Dl as WalletLocked,
  V2 as WalletManager,
  Fe as WalletUnlocked,
  or as WitnessCoder,
  Qt as ZeroBytes32,
  q1 as addAmountToCoinQuantities,
  rs as addOperation,
  Vn as addressify,
  xv as aggregateInputsAmountsByAssetAndOwner,
  $ as arrayify,
  uv as assemblePanicError,
  rv as assembleReceiptByType,
  _v as assembleRevertError,
  Di as assembleTransactionSummary,
  X0 as assert,
  Jf as assertUnreachable,
  pB as assets,
  R as bn,
  Qr as bufferFromString,
  tB as buildBlockExplorerUrl,
  So as buildDryRunResult,
  uC as buildFunctionResult,
  j2 as cacheFor,
  nB as cacheRequestInputsResources,
  fv as cacheRequestInputsResourcesFromOwner,
  wn as calculateGasFee,
  ov as calculateMetadataGasForTxBlob,
  ll as calculateMetadataGasForTxCreate,
  fl as calculateMetadataGasForTxScript,
  D0 as calculateMetadataGasForTxUpgrade,
  av as calculateMetadataGasForTxUpload,
  cv as calculateMinGasForTxUpload,
  yv as calculateTXFeeForSummary,
  H_ as calculateVmTxMemory,
  SC as capitalizeString,
  l_ as chunkAndPadBytes,
  dg as clearFirst12BytesFromB256,
  ja as coinQuantityfy,
  QC as compressBytecode,
  P_ as computeHmac,
  ct as concat,
  mi as concatBytes,
  kC as createAssetId,
  mB as createConfig,
  ba as dataSlice,
  Wf as decodeBase58,
  FC as decompressBytecode,
  cA as decrypt,
  uA as decryptJsonWalletData,
  DC as defaultConsensusKey,
  TC as defaultSnapshotConfigs,
  q2 as deferPromise,
  gB as dispatchFuelConnectorEvent,
  g_ as encodeBase58,
  dA as encrypt,
  _A as encryptJsonWalletData,
  Rs as english,
  i2 as extractBurnedAssetsFromReceipts,
  Hl as extractInvocationResult,
  s2 as extractMintedAssetsFromReceipts,
  tc as extractTxError,
  BC as format,
  CC as formatUnits,
  Ma as fromBech32,
  b2 as fuelAssetsBaseUrl,
  iv as gasUsedByInputs,
  Gl as getAbisFromAllCalls,
  lv as getAssetAmountInRequestInputs,
  lB as getAssetEth,
  fB as getAssetFuel,
  p2 as getAssetNetwork,
  Bl as getAssetWithNetwork,
  La as getBytesFromBech32,
  $v as getContractCallOperations,
  r2 as getContractCreatedOperations,
  sc as getDecodedLogs,
  f2 as getDefaultChainId,
  Ti as getGasUsedFromReceipts,
  nc as getInputAccountAddress,
  Sv as getInputContractFromIndex,
  ml as getInputFromAssetId,
  rc as getInputsByType,
  Iv as getInputsByTypes,
  Ev as getInputsCoin,
  wl as getInputsCoinAndMessage,
  Cv as getInputsContract,
  vv as getInputsMessage,
  Ka as getMaxGas,
  hl as getMinGas,
  Jn as getMintedAssetId,
  n2 as getOperations,
  ys as getOutputsByType,
  Tv as getOutputsChange,
  yl as getOutputsCoin,
  Dv as getOutputsContract,
  Nv as getOutputsContractCreated,
  aB as getOutputsVariable,
  e2 as getPayProducerOperations,
  H2 as getPredicateRoot,
  cg as getRandomB256,
  es as getReceiptsByType,
  Gv as getReceiptsCall,
  zv as getReceiptsMessageOut,
  dB as getReceiptsTransferOut,
  T0 as getReceiptsWithMissingData,
  gl as getRequestInputResourceOwner,
  zl as getResultLogs,
  o2 as getTransactionStatusName,
  uB as getTransactionSummary,
  _B as getTransactionSummaryFromRequest,
  bl as getTransactionTypeName,
  hB as getTransactionsSummaries,
  t2 as getTransferOperations,
  Wv as getWithdrawFromFuelOperations,
  cB as hasSameAssetId,
  Ye as hash,
  AA as hashMessage,
  K as hexlify,
  JE as inputify,
  Go as isB256,
  Ms as isBech32,
  KE as isCoin,
  Mr as isDefined,
  zo as isEvmAddress,
  F0 as isInputCoin,
  KC as isMessage,
  N0 as isMessageCoin,
  Lc as isPublicKey,
  JC as isRawCoin,
  $C as isRawMessage,
  nn as isRequestInputCoin,
  Al as isRequestInputCoinOrMessage,
  ec as isRequestInputMessage,
  pl as isRequestInputMessageWithoutData,
  en as isRequestInputResource,
  na as isRequestInputResourceFromOwner,
  sB as isTransactionTypeBlob,
  mv as isTransactionTypeCreate,
  Gr as isTransactionTypeScript,
  iB as isTransactionTypeUpgrade,
  oB as isTransactionTypeUpload,
  Fn as isType,
  Uv as isTypeBlob,
  Il as isTypeCreate,
  Lv as isTypeMint,
  El as isTypeScript,
  kv as isTypeUpgrade,
  Pv as isTypeUpload,
  k_ as keccak256,
  OC as keyFromPassword,
  xC as max,
  RC as multiply,
  ag as normalizeBech32,
  dv as normalizeJSON,
  NC as normalizeString,
  $E as outputify,
  ug as padFirst12BytesOfEvmAddress,
  hA as pbkdf2,
  Tr as processGqlReceipt,
  a2 as processGraphqlStatus,
  Ve as randomBytes,
  fA as randomUUID,
  I2 as rawAssets,
  Se as resolveGasDependentCosts,
  y2 as resolveIconPaths,
  Q0 as returnZeroScript,
  lA as ripemd160,
  L_ as scrypt,
  Be as sha256,
  Vf as sleep,
  _g as sortPolicies,
  zn as stringFromBuffer,
  kc as toB256,
  Os as toBech32,
  pr as toBytes,
  ff as toFixed,
  ga as toHex,
  Rr as toNumber,
  bn as toUtf8Bytes,
  Ia as toUtf8String,
  Ne as transactionRequestify,
  pA as uint64ToBytesBE,
  m2 as urlJoin,
  Ss as withTimeout,
  wv as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
