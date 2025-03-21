var ef = Object.defineProperty;
var vc = (e) => {
  throw TypeError(e);
};
var rf = (e, t, r) => t in e ? ef(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var O = (e, t, r) => rf(e, typeof t != "symbol" ? t + "" : t, r), eo = (e, t, r) => t.has(e) || vc("Cannot " + r);
var Vt = (e, t, r) => (eo(e, t, "read from private field"), r ? r.call(e) : t.get(e)), He = (e, t, r) => t.has(e) ? vc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), $e = (e, t, r, n) => (eo(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), bs = (e, t, r) => (eo(e, t, "access private method"), r);
function s_() {
  return {
    FORC: "0.65.2",
    FUEL_CORE: "0.39.0",
    FUELS: "0.96.1"
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
function nf(e, t) {
  const { major: r } = fa(e, t);
  return r === 0;
}
function sf(e, t) {
  const { minor: r } = fa(e, t);
  return r === 0;
}
function of(e, t) {
  const { patch: r } = fa(e, t);
  return r === 0;
}
function af(e) {
  const { FUEL_CORE: t } = s_();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: nf(e, t),
    isMinorSupported: sf(e, t),
    isPatchSupported: of(e, t)
  };
}
var i_ = s_(), cf = Object.defineProperty, df = (e, t, r) => t in e ? cf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, uf = (e, t, r) => (df(e, t + "", r), r), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_URL = "invalid-url", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.NOT_ENOUGH_FUNDS = "not-enough-funds", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(D || {}), Ss = class extends Error {
  constructor(t, r, n = {}, s = null) {
    super(r);
    O(this, "VERSIONS", i_);
    O(this, "metadata");
    O(this, "rawError");
    O(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new Ss(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(D);
    if (!n.includes(r.code))
      throw new Ss(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new Ss(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o };
  }
}, x = Ss;
uf(x, "CODES", D);
var St = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _f(e) {
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
const hf = {}, lf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hf
}, Symbol.toStringTag, { value: "Module" })), ff = /* @__PURE__ */ pa(lf);
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = ff.Buffer;
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
      var A, E, C = 0;
      if (p === "be")
        for (m = d.length - 1, A = 0; m >= 0; m -= 3)
          E = d[m] | d[m - 1] << 8 | d[m - 2] << 16, this.words[A] |= E << C & 67108863, this.words[A + 1] = E >>> 26 - C & 67108863, C += 24, C >= 26 && (C -= 26, A++);
      else if (p === "le")
        for (m = 0, A = 0; m < d.length; m += 3)
          E = d[m] | d[m + 1] << 8 | d[m + 2] << 16, this.words[A] |= E << C & 67108863, this.words[A + 1] = E >>> 26 - C & 67108863, C += 24, C >= 26 && (C -= 26, A++);
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
      var A = 0, E = 0, C;
      if (p === "be")
        for (m = d.length - 1; m >= _; m -= 2)
          C = u(d, _, m) << A, this.words[E] |= C & 67108863, A >= 18 ? (A -= 18, E += 1, this.words[E] |= C >>> 26) : A += 8;
      else {
        var w = d.length - _;
        for (m = w % 2 === 0 ? _ + 1 : _; m < d.length; m += 2)
          C = u(d, _, m) << A, this.words[E] |= C & 67108863, A >= 18 ? (A -= 18, E += 1, this.words[E] |= C >>> 26) : A += 8;
      }
      this._strip();
    };
    function f(B, d, _, p) {
      for (var m = 0, A = 0, E = Math.min(B.length, _), C = d; C < E; C++) {
        var w = B.charCodeAt(C) - 48;
        m *= p, w >= 49 ? A = w - 49 + 10 : w >= 17 ? A = w - 17 + 10 : A = w, n(w >= 0 && A < p, "Invalid character"), m += A;
      }
      return m;
    }
    i.prototype._parseBase = function(d, _, p) {
      this.words = [0], this.length = 1;
      for (var m = 0, A = 1; A <= 67108863; A *= _)
        m++;
      m--, A = A / _ | 0;
      for (var E = d.length - p, C = E % m, w = Math.min(E, E - C) + p, h = 0, I = p; I < w; I += m)
        h = f(d, I, I + m, _), this.imuln(A), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
      if (C !== 0) {
        var J = 1;
        for (h = f(d, I, d.length, _), I = 0; I < C; I++)
          J *= _;
        this.imuln(J), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = b;
      } catch {
        i.prototype.inspect = b;
      }
    else
      i.prototype.inspect = b;
    function b() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var v = [
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
          var C = this.words[E], w = ((C << m | A) & 16777215).toString(16);
          A = C >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, E--), A !== 0 || E !== this.length - 1 ? p = v[6 - w.length] + w + p : p = w + p;
        }
        for (A !== 0 && (p = A.toString(16) + p); p.length % _ !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      if (d === (d | 0) && d >= 2 && d <= 36) {
        var h = S[d], I = Q[d];
        p = "";
        var J = this.clone();
        for (J.negative = 0; !J.isZero(); ) {
          var W = J.modrn(I).toString(d);
          J = J.idivn(I), J.isZero() ? p = W + p : p = v[h - W.length] + W + p;
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
      var E = N(d, A), C = _ === "le" ? "LE" : "BE";
      return this["_toArrayLike" + C](E, m), E;
    }, i.prototype._toArrayLikeLE = function(d, _) {
      for (var p = 0, m = 0, A = 0, E = 0; A < this.length; A++) {
        var C = this.words[A] << E | m;
        d[p++] = C & 255, p < d.length && (d[p++] = C >> 8 & 255), p < d.length && (d[p++] = C >> 16 & 255), E === 6 ? (p < d.length && (d[p++] = C >> 24 & 255), m = 0, E = 0) : (m = C >>> 24, E += 2);
      }
      if (p < d.length)
        for (d[p++] = m; p < d.length; )
          d[p++] = 0;
    }, i.prototype._toArrayLikeBE = function(d, _) {
      for (var p = d.length - 1, m = 0, A = 0, E = 0; A < this.length; A++) {
        var C = this.words[A] << E | m;
        d[p--] = C & 255, p >= 0 && (d[p--] = C >> 8 & 255), p >= 0 && (d[p--] = C >> 16 & 255), E === 6 ? (p >= 0 && (d[p--] = C >> 24 & 255), m = 0, E = 0) : (m = C >>> 24, E += 2);
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
      for (var E = 0, C = 0; C < A.length; C++)
        _ = (m.words[C] | 0) - (A.words[C] | 0) + E, E = _ >> 26, this.words[C] = _ & 67108863;
      for (; E !== 0 && C < m.length; C++)
        _ = (m.words[C] | 0) + E, E = _ >> 26, this.words[C] = _ & 67108863;
      if (E === 0 && C < m.length && m !== this)
        for (; C < m.length; C++)
          this.words[C] = m.words[C];
      return this.length = Math.max(this.length, C), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(d) {
      return this.clone().isub(d);
    };
    function F(B, d, _) {
      _.negative = d.negative ^ B.negative;
      var p = B.length + d.length | 0;
      _.length = p, p = p - 1 | 0;
      var m = B.words[0] | 0, A = d.words[0] | 0, E = m * A, C = E & 67108863, w = E / 67108864 | 0;
      _.words[0] = C;
      for (var h = 1; h < p; h++) {
        for (var I = w >>> 26, J = w & 67108863, W = Math.min(h, d.length - 1), et = Math.max(0, h - B.length + 1); et <= W; et++) {
          var nt = h - et | 0;
          m = B.words[nt] | 0, A = d.words[et] | 0, E = m * A + J, I += E / 67108864 | 0, J = E & 67108863;
        }
        _.words[h] = J | 0, w = I | 0;
      }
      return w !== 0 ? _.words[h] = w | 0 : _.length--, _._strip();
    }
    var Y = function(d, _, p) {
      var m = d.words, A = _.words, E = p.words, C = 0, w, h, I, J = m[0] | 0, W = J & 8191, et = J >>> 13, nt = m[1] | 0, it = nt & 8191, ot = nt >>> 13, Mt = m[2] | 0, ht = Mt & 8191, dt = Mt >>> 13, Dt = m[3] | 0, At = Dt & 8191, yt = Dt >>> 13, Ur = m[4] | 0, Lt = Ur & 8191, Rt = Ur >>> 13, On = m[5] | 0, Ut = On & 8191, zt = On >>> 13, ys = m[6] | 0, Ht = ys & 8191, Zt = ys >>> 13, _c = m[7] | 0, Xt = _c & 8191, Wt = _c >>> 13, hc = m[8] | 0, jt = hc & 8191, Jt = hc >>> 13, lc = m[9] | 0, qt = lc & 8191, $t = lc >>> 13, fc = A[0] | 0, Kt = fc & 8191, te = fc >>> 13, pc = A[1] | 0, ee = pc & 8191, re = pc >>> 13, Ac = A[2] | 0, ne = Ac & 8191, se = Ac >>> 13, gc = A[3] | 0, ie = gc & 8191, oe = gc >>> 13, wc = A[4] | 0, ae = wc & 8191, ce = wc >>> 13, mc = A[5] | 0, de = mc & 8191, ue = mc >>> 13, yc = A[6] | 0, _e = yc & 8191, he = yc >>> 13, bc = A[7] | 0, le = bc & 8191, fe = bc >>> 13, Ic = A[8] | 0, pe = Ic & 8191, Ae = Ic >>> 13, Ec = A[9] | 0, ge = Ec & 8191, we = Ec >>> 13;
      p.negative = d.negative ^ _.negative, p.length = 19, w = Math.imul(W, Kt), h = Math.imul(W, te), h = h + Math.imul(et, Kt) | 0, I = Math.imul(et, te);
      var Mi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, w = Math.imul(it, Kt), h = Math.imul(it, te), h = h + Math.imul(ot, Kt) | 0, I = Math.imul(ot, te), w = w + Math.imul(W, ee) | 0, h = h + Math.imul(W, re) | 0, h = h + Math.imul(et, ee) | 0, I = I + Math.imul(et, re) | 0;
      var Li = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, w = Math.imul(ht, Kt), h = Math.imul(ht, te), h = h + Math.imul(dt, Kt) | 0, I = Math.imul(dt, te), w = w + Math.imul(it, ee) | 0, h = h + Math.imul(it, re) | 0, h = h + Math.imul(ot, ee) | 0, I = I + Math.imul(ot, re) | 0, w = w + Math.imul(W, ne) | 0, h = h + Math.imul(W, se) | 0, h = h + Math.imul(et, ne) | 0, I = I + Math.imul(et, se) | 0;
      var ki = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, w = Math.imul(At, Kt), h = Math.imul(At, te), h = h + Math.imul(yt, Kt) | 0, I = Math.imul(yt, te), w = w + Math.imul(ht, ee) | 0, h = h + Math.imul(ht, re) | 0, h = h + Math.imul(dt, ee) | 0, I = I + Math.imul(dt, re) | 0, w = w + Math.imul(it, ne) | 0, h = h + Math.imul(it, se) | 0, h = h + Math.imul(ot, ne) | 0, I = I + Math.imul(ot, se) | 0, w = w + Math.imul(W, ie) | 0, h = h + Math.imul(W, oe) | 0, h = h + Math.imul(et, ie) | 0, I = I + Math.imul(et, oe) | 0;
      var Pi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, w = Math.imul(Lt, Kt), h = Math.imul(Lt, te), h = h + Math.imul(Rt, Kt) | 0, I = Math.imul(Rt, te), w = w + Math.imul(At, ee) | 0, h = h + Math.imul(At, re) | 0, h = h + Math.imul(yt, ee) | 0, I = I + Math.imul(yt, re) | 0, w = w + Math.imul(ht, ne) | 0, h = h + Math.imul(ht, se) | 0, h = h + Math.imul(dt, ne) | 0, I = I + Math.imul(dt, se) | 0, w = w + Math.imul(it, ie) | 0, h = h + Math.imul(it, oe) | 0, h = h + Math.imul(ot, ie) | 0, I = I + Math.imul(ot, oe) | 0, w = w + Math.imul(W, ae) | 0, h = h + Math.imul(W, ce) | 0, h = h + Math.imul(et, ae) | 0, I = I + Math.imul(et, ce) | 0;
      var Ui = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, w = Math.imul(Ut, Kt), h = Math.imul(Ut, te), h = h + Math.imul(zt, Kt) | 0, I = Math.imul(zt, te), w = w + Math.imul(Lt, ee) | 0, h = h + Math.imul(Lt, re) | 0, h = h + Math.imul(Rt, ee) | 0, I = I + Math.imul(Rt, re) | 0, w = w + Math.imul(At, ne) | 0, h = h + Math.imul(At, se) | 0, h = h + Math.imul(yt, ne) | 0, I = I + Math.imul(yt, se) | 0, w = w + Math.imul(ht, ie) | 0, h = h + Math.imul(ht, oe) | 0, h = h + Math.imul(dt, ie) | 0, I = I + Math.imul(dt, oe) | 0, w = w + Math.imul(it, ae) | 0, h = h + Math.imul(it, ce) | 0, h = h + Math.imul(ot, ae) | 0, I = I + Math.imul(ot, ce) | 0, w = w + Math.imul(W, de) | 0, h = h + Math.imul(W, ue) | 0, h = h + Math.imul(et, de) | 0, I = I + Math.imul(et, ue) | 0;
      var Gi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, w = Math.imul(Ht, Kt), h = Math.imul(Ht, te), h = h + Math.imul(Zt, Kt) | 0, I = Math.imul(Zt, te), w = w + Math.imul(Ut, ee) | 0, h = h + Math.imul(Ut, re) | 0, h = h + Math.imul(zt, ee) | 0, I = I + Math.imul(zt, re) | 0, w = w + Math.imul(Lt, ne) | 0, h = h + Math.imul(Lt, se) | 0, h = h + Math.imul(Rt, ne) | 0, I = I + Math.imul(Rt, se) | 0, w = w + Math.imul(At, ie) | 0, h = h + Math.imul(At, oe) | 0, h = h + Math.imul(yt, ie) | 0, I = I + Math.imul(yt, oe) | 0, w = w + Math.imul(ht, ae) | 0, h = h + Math.imul(ht, ce) | 0, h = h + Math.imul(dt, ae) | 0, I = I + Math.imul(dt, ce) | 0, w = w + Math.imul(it, de) | 0, h = h + Math.imul(it, ue) | 0, h = h + Math.imul(ot, de) | 0, I = I + Math.imul(ot, ue) | 0, w = w + Math.imul(W, _e) | 0, h = h + Math.imul(W, he) | 0, h = h + Math.imul(et, _e) | 0, I = I + Math.imul(et, he) | 0;
      var zi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, w = Math.imul(Xt, Kt), h = Math.imul(Xt, te), h = h + Math.imul(Wt, Kt) | 0, I = Math.imul(Wt, te), w = w + Math.imul(Ht, ee) | 0, h = h + Math.imul(Ht, re) | 0, h = h + Math.imul(Zt, ee) | 0, I = I + Math.imul(Zt, re) | 0, w = w + Math.imul(Ut, ne) | 0, h = h + Math.imul(Ut, se) | 0, h = h + Math.imul(zt, ne) | 0, I = I + Math.imul(zt, se) | 0, w = w + Math.imul(Lt, ie) | 0, h = h + Math.imul(Lt, oe) | 0, h = h + Math.imul(Rt, ie) | 0, I = I + Math.imul(Rt, oe) | 0, w = w + Math.imul(At, ae) | 0, h = h + Math.imul(At, ce) | 0, h = h + Math.imul(yt, ae) | 0, I = I + Math.imul(yt, ce) | 0, w = w + Math.imul(ht, de) | 0, h = h + Math.imul(ht, ue) | 0, h = h + Math.imul(dt, de) | 0, I = I + Math.imul(dt, ue) | 0, w = w + Math.imul(it, _e) | 0, h = h + Math.imul(it, he) | 0, h = h + Math.imul(ot, _e) | 0, I = I + Math.imul(ot, he) | 0, w = w + Math.imul(W, le) | 0, h = h + Math.imul(W, fe) | 0, h = h + Math.imul(et, le) | 0, I = I + Math.imul(et, fe) | 0;
      var Vi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, w = Math.imul(jt, Kt), h = Math.imul(jt, te), h = h + Math.imul(Jt, Kt) | 0, I = Math.imul(Jt, te), w = w + Math.imul(Xt, ee) | 0, h = h + Math.imul(Xt, re) | 0, h = h + Math.imul(Wt, ee) | 0, I = I + Math.imul(Wt, re) | 0, w = w + Math.imul(Ht, ne) | 0, h = h + Math.imul(Ht, se) | 0, h = h + Math.imul(Zt, ne) | 0, I = I + Math.imul(Zt, se) | 0, w = w + Math.imul(Ut, ie) | 0, h = h + Math.imul(Ut, oe) | 0, h = h + Math.imul(zt, ie) | 0, I = I + Math.imul(zt, oe) | 0, w = w + Math.imul(Lt, ae) | 0, h = h + Math.imul(Lt, ce) | 0, h = h + Math.imul(Rt, ae) | 0, I = I + Math.imul(Rt, ce) | 0, w = w + Math.imul(At, de) | 0, h = h + Math.imul(At, ue) | 0, h = h + Math.imul(yt, de) | 0, I = I + Math.imul(yt, ue) | 0, w = w + Math.imul(ht, _e) | 0, h = h + Math.imul(ht, he) | 0, h = h + Math.imul(dt, _e) | 0, I = I + Math.imul(dt, he) | 0, w = w + Math.imul(it, le) | 0, h = h + Math.imul(it, fe) | 0, h = h + Math.imul(ot, le) | 0, I = I + Math.imul(ot, fe) | 0, w = w + Math.imul(W, pe) | 0, h = h + Math.imul(W, Ae) | 0, h = h + Math.imul(et, pe) | 0, I = I + Math.imul(et, Ae) | 0;
      var Yi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, w = Math.imul(qt, Kt), h = Math.imul(qt, te), h = h + Math.imul($t, Kt) | 0, I = Math.imul($t, te), w = w + Math.imul(jt, ee) | 0, h = h + Math.imul(jt, re) | 0, h = h + Math.imul(Jt, ee) | 0, I = I + Math.imul(Jt, re) | 0, w = w + Math.imul(Xt, ne) | 0, h = h + Math.imul(Xt, se) | 0, h = h + Math.imul(Wt, ne) | 0, I = I + Math.imul(Wt, se) | 0, w = w + Math.imul(Ht, ie) | 0, h = h + Math.imul(Ht, oe) | 0, h = h + Math.imul(Zt, ie) | 0, I = I + Math.imul(Zt, oe) | 0, w = w + Math.imul(Ut, ae) | 0, h = h + Math.imul(Ut, ce) | 0, h = h + Math.imul(zt, ae) | 0, I = I + Math.imul(zt, ce) | 0, w = w + Math.imul(Lt, de) | 0, h = h + Math.imul(Lt, ue) | 0, h = h + Math.imul(Rt, de) | 0, I = I + Math.imul(Rt, ue) | 0, w = w + Math.imul(At, _e) | 0, h = h + Math.imul(At, he) | 0, h = h + Math.imul(yt, _e) | 0, I = I + Math.imul(yt, he) | 0, w = w + Math.imul(ht, le) | 0, h = h + Math.imul(ht, fe) | 0, h = h + Math.imul(dt, le) | 0, I = I + Math.imul(dt, fe) | 0, w = w + Math.imul(it, pe) | 0, h = h + Math.imul(it, Ae) | 0, h = h + Math.imul(ot, pe) | 0, I = I + Math.imul(ot, Ae) | 0, w = w + Math.imul(W, ge) | 0, h = h + Math.imul(W, we) | 0, h = h + Math.imul(et, ge) | 0, I = I + Math.imul(et, we) | 0;
      var Hi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, w = Math.imul(qt, ee), h = Math.imul(qt, re), h = h + Math.imul($t, ee) | 0, I = Math.imul($t, re), w = w + Math.imul(jt, ne) | 0, h = h + Math.imul(jt, se) | 0, h = h + Math.imul(Jt, ne) | 0, I = I + Math.imul(Jt, se) | 0, w = w + Math.imul(Xt, ie) | 0, h = h + Math.imul(Xt, oe) | 0, h = h + Math.imul(Wt, ie) | 0, I = I + Math.imul(Wt, oe) | 0, w = w + Math.imul(Ht, ae) | 0, h = h + Math.imul(Ht, ce) | 0, h = h + Math.imul(Zt, ae) | 0, I = I + Math.imul(Zt, ce) | 0, w = w + Math.imul(Ut, de) | 0, h = h + Math.imul(Ut, ue) | 0, h = h + Math.imul(zt, de) | 0, I = I + Math.imul(zt, ue) | 0, w = w + Math.imul(Lt, _e) | 0, h = h + Math.imul(Lt, he) | 0, h = h + Math.imul(Rt, _e) | 0, I = I + Math.imul(Rt, he) | 0, w = w + Math.imul(At, le) | 0, h = h + Math.imul(At, fe) | 0, h = h + Math.imul(yt, le) | 0, I = I + Math.imul(yt, fe) | 0, w = w + Math.imul(ht, pe) | 0, h = h + Math.imul(ht, Ae) | 0, h = h + Math.imul(dt, pe) | 0, I = I + Math.imul(dt, Ae) | 0, w = w + Math.imul(it, ge) | 0, h = h + Math.imul(it, we) | 0, h = h + Math.imul(ot, ge) | 0, I = I + Math.imul(ot, we) | 0;
      var Zi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, w = Math.imul(qt, ne), h = Math.imul(qt, se), h = h + Math.imul($t, ne) | 0, I = Math.imul($t, se), w = w + Math.imul(jt, ie) | 0, h = h + Math.imul(jt, oe) | 0, h = h + Math.imul(Jt, ie) | 0, I = I + Math.imul(Jt, oe) | 0, w = w + Math.imul(Xt, ae) | 0, h = h + Math.imul(Xt, ce) | 0, h = h + Math.imul(Wt, ae) | 0, I = I + Math.imul(Wt, ce) | 0, w = w + Math.imul(Ht, de) | 0, h = h + Math.imul(Ht, ue) | 0, h = h + Math.imul(Zt, de) | 0, I = I + Math.imul(Zt, ue) | 0, w = w + Math.imul(Ut, _e) | 0, h = h + Math.imul(Ut, he) | 0, h = h + Math.imul(zt, _e) | 0, I = I + Math.imul(zt, he) | 0, w = w + Math.imul(Lt, le) | 0, h = h + Math.imul(Lt, fe) | 0, h = h + Math.imul(Rt, le) | 0, I = I + Math.imul(Rt, fe) | 0, w = w + Math.imul(At, pe) | 0, h = h + Math.imul(At, Ae) | 0, h = h + Math.imul(yt, pe) | 0, I = I + Math.imul(yt, Ae) | 0, w = w + Math.imul(ht, ge) | 0, h = h + Math.imul(ht, we) | 0, h = h + Math.imul(dt, ge) | 0, I = I + Math.imul(dt, we) | 0;
      var Xi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, w = Math.imul(qt, ie), h = Math.imul(qt, oe), h = h + Math.imul($t, ie) | 0, I = Math.imul($t, oe), w = w + Math.imul(jt, ae) | 0, h = h + Math.imul(jt, ce) | 0, h = h + Math.imul(Jt, ae) | 0, I = I + Math.imul(Jt, ce) | 0, w = w + Math.imul(Xt, de) | 0, h = h + Math.imul(Xt, ue) | 0, h = h + Math.imul(Wt, de) | 0, I = I + Math.imul(Wt, ue) | 0, w = w + Math.imul(Ht, _e) | 0, h = h + Math.imul(Ht, he) | 0, h = h + Math.imul(Zt, _e) | 0, I = I + Math.imul(Zt, he) | 0, w = w + Math.imul(Ut, le) | 0, h = h + Math.imul(Ut, fe) | 0, h = h + Math.imul(zt, le) | 0, I = I + Math.imul(zt, fe) | 0, w = w + Math.imul(Lt, pe) | 0, h = h + Math.imul(Lt, Ae) | 0, h = h + Math.imul(Rt, pe) | 0, I = I + Math.imul(Rt, Ae) | 0, w = w + Math.imul(At, ge) | 0, h = h + Math.imul(At, we) | 0, h = h + Math.imul(yt, ge) | 0, I = I + Math.imul(yt, we) | 0;
      var Wi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, w = Math.imul(qt, ae), h = Math.imul(qt, ce), h = h + Math.imul($t, ae) | 0, I = Math.imul($t, ce), w = w + Math.imul(jt, de) | 0, h = h + Math.imul(jt, ue) | 0, h = h + Math.imul(Jt, de) | 0, I = I + Math.imul(Jt, ue) | 0, w = w + Math.imul(Xt, _e) | 0, h = h + Math.imul(Xt, he) | 0, h = h + Math.imul(Wt, _e) | 0, I = I + Math.imul(Wt, he) | 0, w = w + Math.imul(Ht, le) | 0, h = h + Math.imul(Ht, fe) | 0, h = h + Math.imul(Zt, le) | 0, I = I + Math.imul(Zt, fe) | 0, w = w + Math.imul(Ut, pe) | 0, h = h + Math.imul(Ut, Ae) | 0, h = h + Math.imul(zt, pe) | 0, I = I + Math.imul(zt, Ae) | 0, w = w + Math.imul(Lt, ge) | 0, h = h + Math.imul(Lt, we) | 0, h = h + Math.imul(Rt, ge) | 0, I = I + Math.imul(Rt, we) | 0;
      var ji = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, w = Math.imul(qt, de), h = Math.imul(qt, ue), h = h + Math.imul($t, de) | 0, I = Math.imul($t, ue), w = w + Math.imul(jt, _e) | 0, h = h + Math.imul(jt, he) | 0, h = h + Math.imul(Jt, _e) | 0, I = I + Math.imul(Jt, he) | 0, w = w + Math.imul(Xt, le) | 0, h = h + Math.imul(Xt, fe) | 0, h = h + Math.imul(Wt, le) | 0, I = I + Math.imul(Wt, fe) | 0, w = w + Math.imul(Ht, pe) | 0, h = h + Math.imul(Ht, Ae) | 0, h = h + Math.imul(Zt, pe) | 0, I = I + Math.imul(Zt, Ae) | 0, w = w + Math.imul(Ut, ge) | 0, h = h + Math.imul(Ut, we) | 0, h = h + Math.imul(zt, ge) | 0, I = I + Math.imul(zt, we) | 0;
      var Ji = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, w = Math.imul(qt, _e), h = Math.imul(qt, he), h = h + Math.imul($t, _e) | 0, I = Math.imul($t, he), w = w + Math.imul(jt, le) | 0, h = h + Math.imul(jt, fe) | 0, h = h + Math.imul(Jt, le) | 0, I = I + Math.imul(Jt, fe) | 0, w = w + Math.imul(Xt, pe) | 0, h = h + Math.imul(Xt, Ae) | 0, h = h + Math.imul(Wt, pe) | 0, I = I + Math.imul(Wt, Ae) | 0, w = w + Math.imul(Ht, ge) | 0, h = h + Math.imul(Ht, we) | 0, h = h + Math.imul(Zt, ge) | 0, I = I + Math.imul(Zt, we) | 0;
      var qi = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, w = Math.imul(qt, le), h = Math.imul(qt, fe), h = h + Math.imul($t, le) | 0, I = Math.imul($t, fe), w = w + Math.imul(jt, pe) | 0, h = h + Math.imul(jt, Ae) | 0, h = h + Math.imul(Jt, pe) | 0, I = I + Math.imul(Jt, Ae) | 0, w = w + Math.imul(Xt, ge) | 0, h = h + Math.imul(Xt, we) | 0, h = h + Math.imul(Wt, ge) | 0, I = I + Math.imul(Wt, we) | 0;
      var $i = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + ($i >>> 26) | 0, $i &= 67108863, w = Math.imul(qt, pe), h = Math.imul(qt, Ae), h = h + Math.imul($t, pe) | 0, I = Math.imul($t, Ae), w = w + Math.imul(jt, ge) | 0, h = h + Math.imul(jt, we) | 0, h = h + Math.imul(Jt, ge) | 0, I = I + Math.imul(Jt, we) | 0;
      var Ki = (C + w | 0) + ((h & 8191) << 13) | 0;
      C = (I + (h >>> 13) | 0) + (Ki >>> 26) | 0, Ki &= 67108863, w = Math.imul(qt, ge), h = Math.imul(qt, we), h = h + Math.imul($t, ge) | 0, I = Math.imul($t, we);
      var to = (C + w | 0) + ((h & 8191) << 13) | 0;
      return C = (I + (h >>> 13) | 0) + (to >>> 26) | 0, to &= 67108863, E[0] = Mi, E[1] = Li, E[2] = ki, E[3] = Pi, E[4] = Ui, E[5] = Gi, E[6] = zi, E[7] = Vi, E[8] = Yi, E[9] = Hi, E[10] = Zi, E[11] = Xi, E[12] = Wi, E[13] = ji, E[14] = Ji, E[15] = qi, E[16] = $i, E[17] = Ki, E[18] = to, C !== 0 && (E[19] = C, p.length++), p;
    };
    Math.imul || (Y = F);
    function z(B, d, _) {
      _.negative = d.negative ^ B.negative, _.length = B.length + d.length;
      for (var p = 0, m = 0, A = 0; A < _.length - 1; A++) {
        var E = m;
        m = 0;
        for (var C = p & 67108863, w = Math.min(A, d.length - 1), h = Math.max(0, A - B.length + 1); h <= w; h++) {
          var I = A - h, J = B.words[I] | 0, W = d.words[h] | 0, et = J * W, nt = et & 67108863;
          E = E + (et / 67108864 | 0) | 0, nt = nt + C | 0, C = nt & 67108863, E = E + (nt >>> 26) | 0, m += E >>> 26, E &= 67108863;
        }
        _.words[A] = C, p = E, E = m;
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
          var C = this.words[A] & m, w = (this.words[A] | 0) - C << _;
          this.words[A] = w | E, E = C >>> 26 - _;
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
      var A = d % 26, E = Math.min((d - A) / 26, this.length), C = 67108863 ^ 67108863 >>> A << A, w = p;
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
      var I = 0;
      for (h = this.length - 1; h >= 0 && (I !== 0 || h >= m); h--) {
        var J = this.words[h] | 0;
        this.words[h] = I << 26 - A | J >>> A, I = J & C;
      }
      return w && I !== 0 && (w.words[w.length++] = I), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var E, C = 0;
      for (A = 0; A < d.length; A++) {
        E = (this.words[A + p] | 0) + C;
        var w = (d.words[A] | 0) * _;
        E -= w & 67108863, C = (E >> 26) - (w / 67108864 | 0), this.words[A + p] = E & 67108863;
      }
      for (; A < this.length - p; A++)
        E = (this.words[A + p] | 0) + C, C = E >> 26, this.words[A + p] = E & 67108863;
      if (C === 0) return this._strip();
      for (n(C === -1), C = 0, A = 0; A < this.length; A++)
        E = -(this.words[A] | 0) + C, C = E >> 26, this.words[A] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(d, _) {
      var p = this.length - d.length, m = this.clone(), A = d, E = A.words[A.length - 1] | 0, C = this._countBits(E);
      p = 26 - C, p !== 0 && (A = A.ushln(p), m.iushln(p), E = A.words[A.length - 1] | 0);
      var w = m.length - A.length, h;
      if (_ !== "mod") {
        h = new i(null), h.length = w + 1, h.words = new Array(h.length);
        for (var I = 0; I < h.length; I++)
          h.words[I] = 0;
      }
      var J = m.clone()._ishlnsubmul(A, 1, w);
      J.negative === 0 && (m = J, h && (h.words[w] = 1));
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
      for (var m = new i(1), A = new i(0), E = new i(0), C = new i(1), w = 0; _.isEven() && p.isEven(); )
        _.iushrn(1), p.iushrn(1), ++w;
      for (var h = p.clone(), I = _.clone(); !_.isZero(); ) {
        for (var J = 0, W = 1; !(_.words[0] & W) && J < 26; ++J, W <<= 1) ;
        if (J > 0)
          for (_.iushrn(J); J-- > 0; )
            (m.isOdd() || A.isOdd()) && (m.iadd(h), A.isub(I)), m.iushrn(1), A.iushrn(1);
        for (var et = 0, nt = 1; !(p.words[0] & nt) && et < 26; ++et, nt <<= 1) ;
        if (et > 0)
          for (p.iushrn(et); et-- > 0; )
            (E.isOdd() || C.isOdd()) && (E.iadd(h), C.isub(I)), E.iushrn(1), C.iushrn(1);
        _.cmp(p) >= 0 ? (_.isub(p), m.isub(E), A.isub(C)) : (p.isub(_), E.isub(m), C.isub(A));
      }
      return {
        a: E,
        b: C,
        gcd: p.iushln(w)
      };
    }, i.prototype._invmp = function(d) {
      n(d.negative === 0), n(!d.isZero());
      var _ = this, p = d.clone();
      _.negative !== 0 ? _ = _.umod(d) : _ = _.clone();
      for (var m = new i(1), A = new i(0), E = p.clone(); _.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
        for (var C = 0, w = 1; !(_.words[0] & w) && C < 26; ++C, w <<= 1) ;
        if (C > 0)
          for (_.iushrn(C); C-- > 0; )
            m.isOdd() && m.iadd(E), m.iushrn(1);
        for (var h = 0, I = 1; !(p.words[0] & I) && h < 26; ++h, I <<= 1) ;
        if (h > 0)
          for (p.iushrn(h); h-- > 0; )
            A.isOdd() && A.iadd(E), A.iushrn(1);
        _.cmp(p) >= 0 ? (_.isub(p), m.isub(A)) : (p.isub(_), A.isub(m));
      }
      var J;
      return _.cmpn(1) === 0 ? J = m : J = A, J.cmpn(0) < 0 && J.iadd(d), J;
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
        var C = this.words[E] | 0;
        C += A, A = C >>> 26, C &= 67108863, this.words[E] = C;
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
      return new X(d);
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
        var C = d.words[A] | 0;
        d.words[A - 10] = (C & p) << 4 | E >>> 22, E = C;
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
    function q() {
      L.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(q, L), q.prototype.imulK = function(d) {
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
        _ = new q();
      else
        throw new Error("Unknown prime " + d);
      return M[d] = _, _;
    };
    function X(B) {
      if (typeof B == "string") {
        var d = i._prime(B);
        this.m = d.p, this.prime = d;
      } else
        n(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    X.prototype._verify1 = function(d) {
      n(d.negative === 0, "red works only with positives"), n(d.red, "red works only with red numbers");
    }, X.prototype._verify2 = function(d, _) {
      n((d.negative | _.negative) === 0, "red works only with positives"), n(
        d.red && d.red === _.red,
        "red works only with red numbers"
      );
    }, X.prototype.imod = function(d) {
      return this.prime ? this.prime.ireduce(d)._forceRed(this) : (g(d, d.umod(this.m)._forceRed(this)), d);
    }, X.prototype.neg = function(d) {
      return d.isZero() ? d.clone() : this.m.sub(d)._forceRed(this);
    }, X.prototype.add = function(d, _) {
      this._verify2(d, _);
      var p = d.add(_);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
    }, X.prototype.iadd = function(d, _) {
      this._verify2(d, _);
      var p = d.iadd(_);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p;
    }, X.prototype.sub = function(d, _) {
      this._verify2(d, _);
      var p = d.sub(_);
      return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
    }, X.prototype.isub = function(d, _) {
      this._verify2(d, _);
      var p = d.isub(_);
      return p.cmpn(0) < 0 && p.iadd(this.m), p;
    }, X.prototype.shl = function(d, _) {
      return this._verify1(d), this.imod(d.ushln(_));
    }, X.prototype.imul = function(d, _) {
      return this._verify2(d, _), this.imod(d.imul(_));
    }, X.prototype.mul = function(d, _) {
      return this._verify2(d, _), this.imod(d.mul(_));
    }, X.prototype.isqr = function(d) {
      return this.imul(d, d.clone());
    }, X.prototype.sqr = function(d) {
      return this.mul(d, d);
    }, X.prototype.sqrt = function(d) {
      if (d.isZero()) return d.clone();
      var _ = this.m.andln(3);
      if (n(_ % 2 === 1), _ === 3) {
        var p = this.m.add(new i(1)).iushrn(2);
        return this.pow(d, p);
      }
      for (var m = this.m.subn(1), A = 0; !m.isZero() && m.andln(1) === 0; )
        A++, m.iushrn(1);
      n(!m.isZero());
      var E = new i(1).toRed(this), C = E.redNeg(), w = this.m.subn(1).iushrn(1), h = this.m.bitLength();
      for (h = new i(2 * h * h).toRed(this); this.pow(h, w).cmp(C) !== 0; )
        h.redIAdd(C);
      for (var I = this.pow(h, m), J = this.pow(d, m.addn(1).iushrn(1)), W = this.pow(d, m), et = A; W.cmp(E) !== 0; ) {
        for (var nt = W, it = 0; nt.cmp(E) !== 0; it++)
          nt = nt.redSqr();
        n(it < et);
        var ot = this.pow(I, new i(1).iushln(et - it - 1));
        J = J.redMul(ot), I = ot.redSqr(), W = W.redMul(I), et = it;
      }
      return J;
    }, X.prototype.invm = function(d) {
      var _ = d._invmp(this.m);
      return _.negative !== 0 ? (_.negative = 0, this.imod(_).redNeg()) : this.imod(_);
    }, X.prototype.pow = function(d, _) {
      if (_.isZero()) return new i(1).toRed(this);
      if (_.cmpn(1) === 0) return d.clone();
      var p = 4, m = new Array(1 << p);
      m[0] = new i(1).toRed(this), m[1] = d;
      for (var A = 2; A < m.length; A++)
        m[A] = this.mul(m[A - 1], d);
      var E = m[0], C = 0, w = 0, h = _.bitLength() % 26;
      for (h === 0 && (h = 26), A = _.length - 1; A >= 0; A--) {
        for (var I = _.words[A], J = h - 1; J >= 0; J--) {
          var W = I >> J & 1;
          if (E !== m[0] && (E = this.sqr(E)), W === 0 && C === 0) {
            w = 0;
            continue;
          }
          C <<= 1, C |= W, w++, !(w !== p && (A !== 0 || J !== 0)) && (E = this.mul(E, m[C]), w = 0, C = 0);
        }
        h = 26;
      }
      return E;
    }, X.prototype.convertTo = function(d) {
      var _ = d.umod(this.m);
      return _ === d ? _.clone() : _;
    }, X.prototype.convertFrom = function(d) {
      var _ = d.clone();
      return _.red = null, _;
    }, i.mont = function(d) {
      return new tt(d);
    };
    function tt(B) {
      X.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(tt, X), tt.prototype.convertTo = function(d) {
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
var pf = Aa.exports;
const Is = /* @__PURE__ */ _f(pf);
var o_ = 9, a_ = 3, To = 9, Gt = class extends Is {
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
      units: r = To,
      precision: n = o_,
      minPrecision: s = a_
    } = t || {};
    if (r === 0)
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const i = s > n ? n : s, o = n > s ? n : s, a = this.formatUnits(r), [u, f = ""] = a.split("."), g = u.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (o === 0)
      return g;
    let b = f.replace(/0+$/, "");
    if (b.length > o)
      if (u === "0") {
        const v = b.search(/[1-9]/);
        v >= 0 && v < o ? b = b.slice(0, o) : b = b.slice(0, v + 1);
      } else
        b = b.slice(0, o);
    else
      b = b.slice(0, o);
    return b.length < i && (b = b.padEnd(i, "0")), b === "" && i === 0 ? g : b ? `${g}.${b}` : g;
  }
  formatUnits(t = To) {
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
    const n = new Is(this.toArray()).mulTo(t, r);
    return new Gt(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new Is(this.toArray()).egcd(t);
    return {
      a: new Gt(r.toArray()),
      b: new Gt(n.toArray()),
      gcd: new Gt(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new Is(this.toArray()).divmod(new Gt(t), r, n);
    return {
      div: new Gt(s == null ? void 0 : s.toArray()),
      mod: new Gt(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Gt(this.MAX_U64) : this;
  }
  max(t) {
    return this.gte(t) ? new Gt(t) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Gt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, R = (e, t, r) => new Gt(e, t, r);
R.parseUnits = (e, t = To) => {
  const r = e === "." ? "0." : e, [n = "0", s = "0"] = r.split("."), i = s.length;
  if (t === 0) {
    const u = r.replace(",", "").split(".")[0];
    return R(u);
  }
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
function TC(e, t) {
  const { precision: r = o_, minPrecision: n = a_ } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let u = i.slice(0, r);
  if (n < r) {
    const g = u.match(/.*[1-9]{1}/), b = (g == null ? void 0 : g[0].length) || 0, v = Math.max(n, b);
    u = u.slice(0, v);
  }
  const f = u ? `.${u}` : "";
  return `${a}${f}`;
}
function Rr(e) {
  return R(e).toNumber();
}
function ga(e, t) {
  return R(e).toHex(t);
}
function pr(e, t) {
  return R(e).toBytes(t);
}
function DC(e, t) {
  return R(e).formatUnits(t);
}
function QC(e, t) {
  return R(e).format(t);
}
function FC(...e) {
  return e.reduce((t, r) => R(r).gt(t) ? R(r) : t, R(0));
}
function OC(...e) {
  return R(Math.ceil(e.reduce((t, r) => R(t).mul(r), R(1)).toNumber()));
}
var Ee = Uint8Array, Pe = Uint16Array, wa = Int32Array, gi = new Ee([
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
]), Do = new Ee([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), c_ = function(e, t) {
  for (var r = new Pe(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new wa(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, d_ = c_(gi, 2), u_ = d_.b, Qo = d_.r;
u_[28] = 258, Qo[258] = 28;
var __ = c_(wi, 0), Af = __.b, Bc = __.r, Fo = new Pe(32768);
for (var Pt = 0; Pt < 32768; ++Pt) {
  var mr = (Pt & 43690) >> 1 | (Pt & 21845) << 1;
  mr = (mr & 52428) >> 2 | (mr & 13107) << 2, mr = (mr & 61680) >> 4 | (mr & 3855) << 4, Fo[Pt] = ((mr & 65280) >> 8 | (mr & 255) << 8) >> 1;
}
var rr = function(e, t, r) {
  for (var n = e.length, s = 0, i = new Pe(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var o = new Pe(t);
  for (s = 1; s < t; ++s)
    o[s] = o[s - 1] + i[s - 1] << 1;
  var a;
  if (r) {
    a = new Pe(1 << t);
    var u = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var f = s << 4 | e[s], g = t - e[s], b = o[e[s] - 1]++ << g, v = b | (1 << g) - 1; b <= v; ++b)
          a[Fo[b] >> u] = f;
  } else
    for (a = new Pe(n), s = 0; s < n; ++s)
      e[s] && (a[s] = Fo[o[e[s] - 1]++] >> 15 - e[s]);
  return a;
}, Or = new Ee(288);
for (var Pt = 0; Pt < 144; ++Pt)
  Or[Pt] = 8;
for (var Pt = 144; Pt < 256; ++Pt)
  Or[Pt] = 9;
for (var Pt = 256; Pt < 280; ++Pt)
  Or[Pt] = 7;
for (var Pt = 280; Pt < 288; ++Pt)
  Or[Pt] = 8;
var jn = new Ee(32);
for (var Pt = 0; Pt < 32; ++Pt)
  jn[Pt] = 5;
var gf = /* @__PURE__ */ rr(Or, 9, 0), wf = /* @__PURE__ */ rr(Or, 9, 1), mf = /* @__PURE__ */ rr(jn, 5, 0), yf = /* @__PURE__ */ rr(jn, 5, 1), ro = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, Ze = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, no = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, ma = function(e) {
  return (e + 7) / 8 | 0;
}, h_ = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new Ee(e.subarray(t, r));
}, bf = [
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
  var n = new Error(t || bf[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, We), !r)
    throw n;
  return n;
}, If = function(e, t, r, n) {
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
  }, g = t.f || 0, b = t.p || 0, v = t.b || 0, S = t.l, Q = t.d, N = t.m, T = t.n, F = s * 8;
  do {
    if (!S) {
      g = Ze(e, b, 1);
      var Y = Ze(e, b + 1, 3);
      if (b += 3, Y)
        if (Y == 1)
          S = wf, Q = yf, N = 9, T = 5;
        else if (Y == 2) {
          var L = Ze(e, b, 31) + 257, G = Ze(e, b + 10, 15) + 4, U = L + Ze(e, b + 5, 31) + 1;
          b += 14;
          for (var k = new Ee(U), q = new Ee(19), X = 0; X < G; ++X)
            q[Do[X]] = Ze(e, b + X * 3, 7);
          b += G * 3;
          for (var tt = ro(q), B = (1 << tt) - 1, d = rr(q, tt, 1), X = 0; X < U; ) {
            var _ = d[Ze(e, b, B)];
            b += _ & 15;
            var z = _ >> 4;
            if (z < 16)
              k[X++] = z;
            else {
              var p = 0, m = 0;
              for (z == 16 ? (m = 3 + Ze(e, b, 3), b += 2, p = k[X - 1]) : z == 17 ? (m = 3 + Ze(e, b, 7), b += 3) : z == 18 && (m = 11 + Ze(e, b, 127), b += 7); m--; )
                k[X++] = p;
            }
          }
          var A = k.subarray(0, L), E = k.subarray(L);
          N = ro(A), T = ro(E), S = rr(A, N, 1), Q = rr(E, T, 1);
        } else
          We(1);
      else {
        var z = ma(b) + 4, H = e[z - 4] | e[z - 3] << 8, M = z + H;
        if (M > s) {
          u && We(0);
          break;
        }
        a && f(v + H), r.set(e.subarray(z, M), v), t.b = v += H, t.p = b = M * 8, t.f = g;
        continue;
      }
      if (b > F) {
        u && We(0);
        break;
      }
    }
    a && f(v + 131072);
    for (var C = (1 << N) - 1, w = (1 << T) - 1, h = b; ; h = b) {
      var p = S[no(e, b) & C], I = p >> 4;
      if (b += p & 15, b > F) {
        u && We(0);
        break;
      }
      if (p || We(2), I < 256)
        r[v++] = I;
      else if (I == 256) {
        h = b, S = null;
        break;
      } else {
        var J = I - 254;
        if (I > 264) {
          var X = I - 257, W = gi[X];
          J = Ze(e, b, (1 << W) - 1) + u_[X], b += W;
        }
        var et = Q[no(e, b) & w], nt = et >> 4;
        et || We(3), b += et & 15;
        var E = Af[nt];
        if (nt > 3) {
          var W = wi[nt];
          E += no(e, b) & (1 << W) - 1, b += W;
        }
        if (b > F) {
          u && We(0);
          break;
        }
        a && f(v + 131072);
        var it = v + J;
        if (v < E) {
          var ot = i - E, Mt = Math.min(E, it);
          for (ot + v < 0 && We(3); v < Mt; ++v)
            r[v] = n[ot + v];
        }
        for (; v < it; ++v)
          r[v] = r[v - E];
      }
    }
    t.l = S, t.p = h, t.b = v, t.f = g, S && (g = 1, t.m = N, t.d = Q, t.n = T);
  } while (!g);
  return v != r.length && o ? h_(r, 0, v) : r.subarray(0, v);
}, ar = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Mn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, so = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: f_, l: 0 };
  if (s == 1) {
    var o = new Ee(r[0].s + 1);
    return o[r[0].s] = 1, { t: o, l: 1 };
  }
  r.sort(function(M, L) {
    return M.f - L.f;
  }), r.push({ s: -1, f: 25001 });
  var a = r[0], u = r[1], f = 0, g = 1, b = 2;
  for (r[0] = { s: -1, f: a.f + u.f, l: a, r: u }; g != s - 1; )
    a = r[r[f].f < r[b].f ? f++ : b++], u = r[f != g && r[f].f < r[b].f ? f++ : b++], r[g++] = { s: -1, f: a.f + u.f, l: a, r: u };
  for (var v = i[0].s, n = 1; n < s; ++n)
    i[n].s > v && (v = i[n].s);
  var S = new Pe(v + 1), Q = Oo(r[g - 1], S, 0);
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
}, Oo = function(e, t, r) {
  return e.s == -1 ? Math.max(Oo(e.l, t, r + 1), Oo(e.r, t, r + 1)) : t[e.s] = r;
}, xc = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new Pe(++t), n = 0, s = e[0], i = 1, o = function(u) {
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
}, l_ = function(e, t, r) {
  var n = r.length, s = ma(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, Rc = function(e, t, r, n, s, i, o, a, u, f, g) {
  ar(t, g++, r), ++s[256];
  for (var b = so(s, 15), v = b.t, S = b.l, Q = so(i, 15), N = Q.t, T = Q.l, F = xc(v), Y = F.c, z = F.n, H = xc(N), M = H.c, L = H.n, G = new Pe(19), U = 0; U < Y.length; ++U)
    ++G[Y[U] & 31];
  for (var U = 0; U < M.length; ++U)
    ++G[M[U] & 31];
  for (var k = so(G, 7), q = k.t, X = k.l, tt = 19; tt > 4 && !q[Do[tt - 1]]; --tt)
    ;
  var B = f + 5 << 3, d = Ln(s, Or) + Ln(i, jn) + o, _ = Ln(s, v) + Ln(i, N) + o + 14 + 3 * tt + Ln(G, q) + 2 * G[16] + 3 * G[17] + 7 * G[18];
  if (u >= 0 && B <= d && B <= _)
    return l_(t, g, e.subarray(u, u + f));
  var p, m, A, E;
  if (ar(t, g, 1 + (_ < d)), g += 2, _ < d) {
    p = rr(v, S, 0), m = v, A = rr(N, T, 0), E = N;
    var C = rr(q, X, 0);
    ar(t, g, z - 257), ar(t, g + 5, L - 1), ar(t, g + 10, tt - 4), g += 14;
    for (var U = 0; U < tt; ++U)
      ar(t, g + 3 * U, q[Do[U]]);
    g += 3 * tt;
    for (var w = [Y, M], h = 0; h < 2; ++h)
      for (var I = w[h], U = 0; U < I.length; ++U) {
        var J = I[U] & 31;
        ar(t, g, C[J]), g += q[J], J > 15 && (ar(t, g, I[U] >> 5 & 127), g += I[U] >> 12);
      }
  } else
    p = gf, m = Or, A = mf, E = jn;
  for (var U = 0; U < a; ++U) {
    var W = n[U];
    if (W > 255) {
      var J = W >> 18 & 31;
      Mn(t, g, p[J + 257]), g += m[J + 257], J > 7 && (ar(t, g, W >> 23 & 31), g += gi[J]);
      var et = W & 31;
      Mn(t, g, A[et]), g += E[et], et > 3 && (Mn(t, g, W >> 5 & 8191), g += wi[et]);
    } else
      Mn(t, g, p[W]), g += m[W];
  }
  return Mn(t, g, p[256]), g + m[256];
}, Ef = /* @__PURE__ */ new wa([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), f_ = /* @__PURE__ */ new Ee(0), vf = function(e, t, r, n, s, i) {
  var o = i.z || e.length, a = new Ee(n + o + 5 * (1 + Math.ceil(o / 7e3)) + s), u = a.subarray(n, a.length - s), f = i.l, g = (i.r || 0) & 7;
  if (t) {
    g && (u[0] = i.r >> 3);
    for (var b = Ef[t - 1], v = b >> 13, S = b & 8191, Q = (1 << r) - 1, N = i.p || new Pe(32768), T = i.h || new Pe(Q + 1), F = Math.ceil(r / 3), Y = 2 * F, z = function(At) {
      return (e[At] ^ e[At + 1] << F ^ e[At + 2] << Y) & Q;
    }, H = new wa(25e3), M = new Pe(288), L = new Pe(32), G = 0, U = 0, k = i.i || 0, q = 0, X = i.w || 0, tt = 0; k + 2 < o; ++k) {
      var B = z(k), d = k & 32767, _ = T[B];
      if (N[d] = _, T[B] = d, X <= k) {
        var p = o - k;
        if ((G > 7e3 || q > 24576) && (p > 423 || !f)) {
          g = Rc(e, u, 0, H, M, L, U, q, tt, k - tt, g), q = G = U = 0, tt = k;
          for (var m = 0; m < 286; ++m)
            M[m] = 0;
          for (var m = 0; m < 30; ++m)
            L[m] = 0;
        }
        var A = 2, E = 0, C = S, w = d - _ & 32767;
        if (p > 2 && B == z(k - w))
          for (var h = Math.min(v, p) - 1, I = Math.min(32767, k), J = Math.min(258, p); w <= I && --C && d != _; ) {
            if (e[k + A] == e[k + A - w]) {
              for (var W = 0; W < J && e[k + W] == e[k + W - w]; ++W)
                ;
              if (W > A) {
                if (A = W, E = w, W > h)
                  break;
                for (var et = Math.min(w, W - 2), nt = 0, m = 0; m < et; ++m) {
                  var it = k - w + m & 32767, ot = N[it], Mt = it - ot & 32767;
                  Mt > nt && (nt = Mt, _ = it);
                }
              }
            }
            d = _, _ = N[d], w += d - _ & 32767;
          }
        if (E) {
          H[q++] = 268435456 | Qo[A] << 18 | Bc[E];
          var ht = Qo[A] & 31, dt = Bc[E] & 31;
          U += gi[ht] + wi[dt], ++M[257 + ht], ++L[dt], X = k + A, ++G;
        } else
          H[q++] = e[k], ++M[e[k]];
      }
    }
    for (k = Math.max(k, X); k < o; ++k)
      H[q++] = e[k], ++M[e[k]];
    g = Rc(e, u, f, H, M, L, U, q, tt, k - tt, g), f || (i.r = g & 7 | u[g / 8 | 0] << 3, g -= 7, i.h = T, i.p = N, i.i = k, i.w = X);
  } else {
    for (var k = i.w || 0; k < o + f; k += 65535) {
      var Dt = k + 65535;
      Dt >= o && (u[g / 8 | 0] = f, Dt = o), g = l_(u, g + 1, e.subarray(k, Dt));
    }
    i.i = o;
  }
  return h_(a, 0, n + ma(g) + s);
}, Cf = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), Bf = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = Cf[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, xf = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), o = new Ee(i.length + e.length);
    o.set(i), o.set(e, i.length), e = o, s.w = i.length;
  }
  return vf(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, Mo = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, Rf = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && Mo(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, Sf = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && We(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, Nf = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, Tf = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function Df(e, t) {
  t || (t = {});
  var r = Bf(), n = e.length;
  r.p(e);
  var s = xf(e, t, Tf(t), 8), i = s.length;
  return Rf(s, t), Mo(s, i - 8, r.d()), Mo(s, i - 4, n), s;
}
function Qf(e, t) {
  var r = Sf(e);
  return r + 8 > e.length && We(6, "invalid gzip data"), If(e.subarray(r, -8), { i: 2 }, new Ee(Nf(e)), t);
}
var Ff = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Of = 0;
try {
  Ff.decode(f_, { stream: !0 }), Of = 1;
} catch {
}
var Mf = Object.defineProperty, Lf = (e, t, r) => t in e ? Mf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, kf = (e, t, r) => (Lf(e, t + "", r), r), MC = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, p_ = (e, t) => {
  const r = [];
  for (let a = 0; a < e.length; a += t) {
    const u = new Uint8Array(t);
    u.set(e.slice(a, a + t)), r.push(u);
  }
  const n = r[r.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = n.slice(0, i);
  return r[r.length - 1] = o, r;
}, K = (e, t, r = !0) => {
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
  const t = e.map((r) => K(r));
  return mi(t);
}, Sc = "0123456789abcdef";
function $(e) {
  const t = K(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += Sc[(s & 240) >> 4] + Sc[s & 15];
  }
  return r;
}
var LC = (e) => {
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
}, Pf = 37, A_ = BigInt(2 ** 62) + BigInt(Pf), Uf = (e) => Math.floor(e / 1e3), g_ = (e) => e * 1e3, Gf = (e) => Number(BigInt(e) - A_), zf = (e) => String(BigInt(e) + A_), Vf = (e) => g_(Gf(e)), Ns = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Ns(Vf(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Ns(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Ns(g_(e));
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
    return zf(this.toUnixSeconds());
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
    return Uf(this.getTime());
  }
}, ya = Ns;
kf(ya, "TAI64_NULL", "");
function Yf(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Hf = {
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
}, Zf = {
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
}, kC = {
  chainConfig: Hf,
  metadata: Zf,
  stateConfig: Xf
}, PC = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Mr(e) {
  return e !== void 0;
}
var w_ = R(0), Lo = R(58), zs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", Es = null;
function Wf(e) {
  if (Es == null) {
    Es = {};
    for (let r = 0; r < zs.length; r++)
      Es[zs[r]] = R(r);
  }
  const t = Es[e];
  if (t == null)
    throw new x(D.INVALID_DATA, `invalid base58 value ${e}`);
  return R(t);
}
function m_(e) {
  const t = K(e);
  let r = R(t), n = "";
  for (; r.gt(w_); )
    n = zs[Number(r.mod(Lo))] + n, r = r.div(Lo);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = zs[0] + n;
  return n;
}
function jf(e) {
  let t = w_;
  for (let r = 0; r < e.length; r++)
    t = t.mul(Lo), t = t.add(Wf(e[r].toString()));
  return t;
}
function ba(e, t, r) {
  const n = K(e);
  if (r != null && r > n.length)
    throw new x(D.INVALID_DATA, "cannot slice beyond data bounds");
  return $(n.slice(t ?? 0, r ?? n.length));
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
function Gr(e, t, r, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${e}, bytes: ${r}`), t;
}
function Jf(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function qf(e) {
  const t = K(e, "bytes"), r = [];
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
      (s & 192) === 128 ? n += Gr("UNEXPECTED_CONTINUE", n - 1, t) : n += Gr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Gr("OVERRUN", n - 1, t);
      continue;
    }
    let a = s & (1 << 8 - i - 1) - 1;
    for (let u = 0; u < i; u++) {
      const f = t[n];
      if ((f & 192) !== 128) {
        n += Gr("MISSING_CONTINUE", n, t), a = null;
        break;
      }
      a = a << 6 | f & 63, n++;
    }
    if (a !== null) {
      if (a > 1114111) {
        n += Gr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (a >= 55296 && a <= 57343) {
        n += Gr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (a <= o) {
        n += Gr("OVERLONG", n - 1 - i, t);
        continue;
      }
      r.push(a);
    }
  }
  return r;
}
function Ia(e) {
  return Jf(qf(e));
}
var UC = (e) => {
  if (!e)
    return "";
  const t = K(e), r = Df(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(r)
  );
  return btoa(n);
}, GC = (e) => {
  const t = atob(e), r = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return Qf(r);
};
function $f(e) {
  throw new Error("Didn't expect to get here");
}
function ke(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Kf(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function as(e, ...t) {
  if (!Kf(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function y_(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  ke(e.outputLen), ke(e.blockLen);
}
function In(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function b_(e, t) {
  as(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
const sn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ts = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Ds = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ke = (e, t) => e << 32 - t | e >>> t, Et = (e, t) => e << t | e >>> 32 - t >>> 0, Vs = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, tp = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
function Ys(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = tp(e[t]);
}
function ep(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function En(e) {
  return typeof e == "string" && (e = ep(e)), as(e), e;
}
function rp(...e) {
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
const np = {}.toString;
function I_(e, t) {
  if (t !== void 0 && np.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function yi(e) {
  const t = (n) => e().update(En(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function sp(e = 32) {
  if (sn && typeof sn.getRandomValues == "function")
    return sn.getRandomValues(new Uint8Array(e));
  if (sn && typeof sn.randomBytes == "function")
    return sn.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
function ip(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(r >> s & i), a = Number(r & i), u = n ? 4 : 0, f = n ? 0 : 4;
  e.setUint32(t + u, o, n), e.setUint32(t + f, a, n);
}
const op = (e, t, r) => e & t ^ ~e & r, ap = (e, t, r) => e & t ^ e & r ^ t & r;
class va extends Ea {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ds(this.buffer);
  }
  update(t) {
    In(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = En(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const u = Ds(t);
        for (; s <= i - o; o += s)
          this.process(u, o);
        continue;
      }
      n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    In(this), b_(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(n, 0), o = 0);
    for (let b = o; b < s; b++)
      r[b] = 0;
    ip(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const a = Ds(t), u = this.outputLen;
    if (u % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = u / 4, g = this.get();
    if (f > g.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let b = 0; b < f; b++)
      a.setUint32(4 * b, g[b], i);
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
const cp = /* @__PURE__ */ new Uint32Array([
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
class dp extends va {
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
    for (let b = 0; b < 16; b++, r += 4)
      br[b] = t.getUint32(r, !1);
    for (let b = 16; b < 64; b++) {
      const v = br[b - 15], S = br[b - 2], Q = Ke(v, 7) ^ Ke(v, 18) ^ v >>> 3, N = Ke(S, 17) ^ Ke(S, 19) ^ S >>> 10;
      br[b] = N + br[b - 7] + Q + br[b - 16] | 0;
    }
    let { A: n, B: s, C: i, D: o, E: a, F: u, G: f, H: g } = this;
    for (let b = 0; b < 64; b++) {
      const v = Ke(a, 6) ^ Ke(a, 11) ^ Ke(a, 25), S = g + v + op(a, u, f) + cp[b] + br[b] | 0, N = (Ke(n, 2) ^ Ke(n, 13) ^ Ke(n, 22)) + ap(n, s, i) | 0;
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
const Lr = /* @__PURE__ */ yi(() => new dp());
class E_ extends Ea {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, y_(t);
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
const bi = (e, t, r) => new E_(e, t).update(r).digest();
bi.create = (e, t) => new E_(e, t);
function up(e, t, r, n) {
  y_(e);
  const s = I_({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: o, asyncTick: a } = s;
  if (ke(i), ke(o), ke(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const u = En(t), f = En(r), g = new Uint8Array(o), b = bi.create(e, u), v = b._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: a, DK: g, PRF: b, PRFSalt: v };
}
function _p(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function Ca(e, t, r, n) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: u } = up(e, t, r, n);
  let f;
  const g = new Uint8Array(4), b = Ds(g), v = new Uint8Array(a.outputLen);
  for (let S = 1, Q = 0; Q < i; S++, Q += a.outputLen) {
    const N = o.subarray(Q, Q + a.outputLen);
    b.setInt32(0, S, !1), (f = u._cloneInto(f)).update(g).digestInto(v), N.set(v.subarray(0, N.length));
    for (let T = 1; T < s; T++) {
      a._cloneInto(f).update(v).digestInto(v);
      for (let F = 0; F < N.length; F++)
        N[F] ^= v[F];
    }
  }
  return _p(a, u, o, f, v);
}
function Nc(e, t, r, n, s, i) {
  let o = e[t++] ^ r[n++], a = e[t++] ^ r[n++], u = e[t++] ^ r[n++], f = e[t++] ^ r[n++], g = e[t++] ^ r[n++], b = e[t++] ^ r[n++], v = e[t++] ^ r[n++], S = e[t++] ^ r[n++], Q = e[t++] ^ r[n++], N = e[t++] ^ r[n++], T = e[t++] ^ r[n++], F = e[t++] ^ r[n++], Y = e[t++] ^ r[n++], z = e[t++] ^ r[n++], H = e[t++] ^ r[n++], M = e[t++] ^ r[n++], L = o, G = a, U = u, k = f, q = g, X = b, tt = v, B = S, d = Q, _ = N, p = T, m = F, A = Y, E = z, C = H, w = M;
  for (let h = 0; h < 8; h += 2)
    q ^= Et(L + A | 0, 7), d ^= Et(q + L | 0, 9), A ^= Et(d + q | 0, 13), L ^= Et(A + d | 0, 18), _ ^= Et(X + G | 0, 7), E ^= Et(_ + X | 0, 9), G ^= Et(E + _ | 0, 13), X ^= Et(G + E | 0, 18), C ^= Et(p + tt | 0, 7), U ^= Et(C + p | 0, 9), tt ^= Et(U + C | 0, 13), p ^= Et(tt + U | 0, 18), k ^= Et(w + m | 0, 7), B ^= Et(k + w | 0, 9), m ^= Et(B + k | 0, 13), w ^= Et(m + B | 0, 18), G ^= Et(L + k | 0, 7), U ^= Et(G + L | 0, 9), k ^= Et(U + G | 0, 13), L ^= Et(k + U | 0, 18), tt ^= Et(X + q | 0, 7), B ^= Et(tt + X | 0, 9), q ^= Et(B + tt | 0, 13), X ^= Et(q + B | 0, 18), m ^= Et(p + _ | 0, 7), d ^= Et(m + p | 0, 9), _ ^= Et(d + m | 0, 13), p ^= Et(_ + d | 0, 18), A ^= Et(w + C | 0, 7), E ^= Et(A + w | 0, 9), C ^= Et(E + A | 0, 13), w ^= Et(C + E | 0, 18);
  s[i++] = o + L | 0, s[i++] = a + G | 0, s[i++] = u + U | 0, s[i++] = f + k | 0, s[i++] = g + q | 0, s[i++] = b + X | 0, s[i++] = v + tt | 0, s[i++] = S + B | 0, s[i++] = Q + d | 0, s[i++] = N + _ | 0, s[i++] = T + p | 0, s[i++] = F + m | 0, s[i++] = Y + A | 0, s[i++] = z + E | 0, s[i++] = H + C | 0, s[i++] = M + w | 0;
}
function io(e, t, r, n, s) {
  let i = n + 0, o = n + 16 * s;
  for (let a = 0; a < 16; a++)
    r[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    Nc(r, o, e, t, r, i), a > 0 && (o += 16), Nc(r, i, e, t += 16, r, o);
}
function hp(e, t, r) {
  const n = I_({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: o, dkLen: a, asyncTick: u, maxmem: f, onProgress: g } = n;
  if (ke(s), ke(i), ke(o), ke(a), ke(u), ke(f), g !== void 0 && typeof g != "function")
    throw new Error("progressCb should be function");
  const b = 128 * i, v = b / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / b)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const S = b * (s + o);
  if (S > f)
    throw new Error(`Scrypt: parameters too large, ${S} (128 * r * (N + p)) > ${f} (maxmem)`);
  const Q = Ca(Lr, e, t, { c: 1, dkLen: b * o }), N = Ts(Q), T = Ts(new Uint8Array(b * s)), F = Ts(new Uint8Array(b));
  let Y = () => {
  };
  if (g) {
    const z = 2 * s * o, H = Math.max(Math.floor(z / 1e4), 1);
    let M = 0;
    Y = () => {
      M++, g && (!(M % H) || M === z) && g(M / z);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: v, V: T, B32: N, B: Q, tmp: F, blockMixCb: Y, asyncTick: u };
}
function lp(e, t, r, n, s) {
  const i = Ca(Lr, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function fp(e, t, r) {
  const { N: n, r: s, p: i, dkLen: o, blockSize32: a, V: u, B32: f, B: g, tmp: b, blockMixCb: v } = hp(e, t, r);
  Vs || Ys(f);
  for (let S = 0; S < i; S++) {
    const Q = a * S;
    for (let N = 0; N < a; N++)
      u[N] = f[Q + N];
    for (let N = 0, T = 0; N < n - 1; N++)
      io(u, T, u, T += a, s), v();
    io(u, (n - 1) * a, f, Q, s), v();
    for (let N = 0; N < n; N++) {
      const T = f[Q + a - 16] % n;
      for (let F = 0; F < a; F++)
        b[F] = f[Q + F] ^ u[T * a + F];
      io(b, 0, f, Q, s), v();
    }
  }
  return Vs || Ys(f), lp(e, o, g, u, b);
}
const vs = /* @__PURE__ */ BigInt(2 ** 32 - 1), ko = /* @__PURE__ */ BigInt(32);
function v_(e, t = !1) {
  return t ? { h: Number(e & vs), l: Number(e >> ko & vs) } : { h: Number(e >> ko & vs) | 0, l: Number(e & vs) | 0 };
}
function C_(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = v_(e[s], t);
    [r[s], n[s]] = [i, o];
  }
  return [r, n];
}
const pp = (e, t) => BigInt(e >>> 0) << ko | BigInt(t >>> 0), Ap = (e, t, r) => e >>> r, gp = (e, t, r) => e << 32 - r | t >>> r, wp = (e, t, r) => e >>> r | t << 32 - r, mp = (e, t, r) => e << 32 - r | t >>> r, yp = (e, t, r) => e << 64 - r | t >>> r - 32, bp = (e, t, r) => e >>> r - 32 | t << 64 - r, Ip = (e, t) => t, Ep = (e, t) => e, B_ = (e, t, r) => e << r | t >>> 32 - r, x_ = (e, t, r) => t << r | e >>> 32 - r, R_ = (e, t, r) => t << r - 32 | e >>> 64 - r, S_ = (e, t, r) => e << r - 32 | t >>> 64 - r;
function vp(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Cp = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), Bp = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, xp = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), Rp = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, Sp = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), Np = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, mt = {
  fromBig: v_,
  split: C_,
  toBig: pp,
  shrSH: Ap,
  shrSL: gp,
  rotrSH: wp,
  rotrSL: mp,
  rotrBH: yp,
  rotrBL: bp,
  rotr32H: Ip,
  rotr32L: Ep,
  rotlSH: B_,
  rotlSL: x_,
  rotlBH: R_,
  rotlBL: S_,
  add: vp,
  add3L: Cp,
  add3H: Bp,
  add4L: xp,
  add4H: Rp,
  add5H: Np,
  add5L: Sp
}, N_ = [], T_ = [], D_ = [], Tp = /* @__PURE__ */ BigInt(0), kn = /* @__PURE__ */ BigInt(1), Dp = /* @__PURE__ */ BigInt(2), Qp = /* @__PURE__ */ BigInt(7), Fp = /* @__PURE__ */ BigInt(256), Op = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = kn, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], N_.push(2 * (5 * n + r)), T_.push((e + 1) * (e + 2) / 2 % 64);
  let s = Tp;
  for (let i = 0; i < 7; i++)
    t = (t << kn ^ (t >> Qp) * Op) % Fp, t & Dp && (s ^= kn << (kn << /* @__PURE__ */ BigInt(i)) - kn);
  D_.push(s);
}
const [Mp, Lp] = /* @__PURE__ */ C_(D_, !0), Tc = (e, t, r) => r > 32 ? R_(e, t, r) : B_(e, t, r), Dc = (e, t, r) => r > 32 ? S_(e, t, r) : x_(e, t, r);
function kp(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let o = 0; o < 10; o++)
      r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, u = (o + 2) % 10, f = r[u], g = r[u + 1], b = Tc(f, g, 1) ^ r[a], v = Dc(f, g, 1) ^ r[a + 1];
      for (let S = 0; S < 50; S += 10)
        e[o + S] ^= b, e[o + S + 1] ^= v;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = T_[o], u = Tc(s, i, a), f = Dc(s, i, a), g = N_[o];
      s = e[g], i = e[g + 1], e[g] = u, e[g + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        r[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    e[0] ^= Mp[n], e[1] ^= Lp[n];
  }
  r.fill(0);
}
class Ba extends Ea {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, ke(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ts(this.state);
  }
  keccak() {
    Vs || Ys(this.state32), kp(this.state32, this.rounds), Vs || Ys(this.state32), this.posOut = 0, this.pos = 0;
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
    return ke(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (b_(t, this), this.finished)
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
const Pp = (e, t, r) => yi(() => new Ba(t, e, r)), Up = /* @__PURE__ */ Pp(1, 136, 256 / 8), Gp = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Q_ = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((e, t) => t)), zp = /* @__PURE__ */ Q_.map((e) => (9 * e + 5) % 16);
let xa = [Q_], Ra = [zp];
for (let e = 0; e < 4; e++)
  for (let t of [xa, Ra])
    t.push(t[e].map((r) => Gp[r]));
const F_ = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Vp = /* @__PURE__ */ xa.map((e, t) => e.map((r) => F_[t][r])), Yp = /* @__PURE__ */ Ra.map((e, t) => e.map((r) => F_[t][r])), Hp = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Zp = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function Qc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const Cs = /* @__PURE__ */ new Uint32Array(16);
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
      Cs[S] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, o = i, a = this.h2 | 0, u = a, f = this.h3 | 0, g = f, b = this.h4 | 0, v = b;
    for (let S = 0; S < 5; S++) {
      const Q = 4 - S, N = Hp[S], T = Zp[S], F = xa[S], Y = Ra[S], z = Vp[S], H = Yp[S];
      for (let M = 0; M < 16; M++) {
        const L = Et(n + Qc(S, i, a, f) + Cs[F[M]] + N, z[M]) + b | 0;
        n = b, b = f, f = Et(a, 10) | 0, a = i, i = L;
      }
      for (let M = 0; M < 16; M++) {
        const L = Et(s + Qc(Q, o, u, g) + Cs[Y[M]] + T, H[M]) + v | 0;
        s = v, v = g, g = Et(u, 10) | 0, u = o, o = L;
      }
    }
    this.set(this.h1 + a + g | 0, this.h2 + f + v | 0, this.h3 + b + s | 0, this.h4 + n + o | 0, this.h0 + i + u | 0);
  }
  roundClean() {
    Cs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Wp = /* @__PURE__ */ yi(() => new Xp()), [jp, Jp] = mt.split([
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
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: o, Dh: a, Dl: u, Eh: f, El: g, Fh: b, Fl: v, Gh: S, Gl: Q, Hh: N, Hl: T } = this;
    return [t, r, n, s, i, o, a, u, f, g, b, v, S, Q, N, T];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, u, f, g, b, v, S, Q, N, T) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = u | 0, this.Eh = f | 0, this.El = g | 0, this.Fh = b | 0, this.Fl = v | 0, this.Gh = S | 0, this.Gl = Q | 0, this.Hh = N | 0, this.Hl = T | 0;
  }
  process(t, r) {
    for (let z = 0; z < 16; z++, r += 4)
      Ir[z] = t.getUint32(r), Er[z] = t.getUint32(r += 4);
    for (let z = 16; z < 80; z++) {
      const H = Ir[z - 15] | 0, M = Er[z - 15] | 0, L = mt.rotrSH(H, M, 1) ^ mt.rotrSH(H, M, 8) ^ mt.shrSH(H, M, 7), G = mt.rotrSL(H, M, 1) ^ mt.rotrSL(H, M, 8) ^ mt.shrSL(H, M, 7), U = Ir[z - 2] | 0, k = Er[z - 2] | 0, q = mt.rotrSH(U, k, 19) ^ mt.rotrBH(U, k, 61) ^ mt.shrSH(U, k, 6), X = mt.rotrSL(U, k, 19) ^ mt.rotrBL(U, k, 61) ^ mt.shrSL(U, k, 6), tt = mt.add4L(G, X, Er[z - 7], Er[z - 16]), B = mt.add4H(tt, L, q, Ir[z - 7], Ir[z - 16]);
      Ir[z] = B | 0, Er[z] = tt | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: o, Ch: a, Cl: u, Dh: f, Dl: g, Eh: b, El: v, Fh: S, Fl: Q, Gh: N, Gl: T, Hh: F, Hl: Y } = this;
    for (let z = 0; z < 80; z++) {
      const H = mt.rotrSH(b, v, 14) ^ mt.rotrSH(b, v, 18) ^ mt.rotrBH(b, v, 41), M = mt.rotrSL(b, v, 14) ^ mt.rotrSL(b, v, 18) ^ mt.rotrBL(b, v, 41), L = b & S ^ ~b & N, G = v & Q ^ ~v & T, U = mt.add5L(Y, M, G, Jp[z], Er[z]), k = mt.add5H(U, F, H, L, jp[z], Ir[z]), q = U | 0, X = mt.rotrSH(n, s, 28) ^ mt.rotrBH(n, s, 34) ^ mt.rotrBH(n, s, 39), tt = mt.rotrSL(n, s, 28) ^ mt.rotrBL(n, s, 34) ^ mt.rotrBL(n, s, 39), B = n & i ^ n & a ^ i & a, d = s & o ^ s & u ^ o & u;
      F = N | 0, Y = T | 0, N = S | 0, T = Q | 0, S = b | 0, Q = v | 0, { h: b, l: v } = mt.add(f | 0, g | 0, k | 0, q | 0), f = a | 0, g = u | 0, a = i | 0, u = o | 0, i = n | 0, o = s | 0;
      const _ = mt.add3L(q, tt, d);
      n = mt.add3H(_, k, X, B), s = _ | 0;
    }
    ({ h: n, l: s } = mt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: o } = mt.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: u } = mt.add(this.Ch | 0, this.Cl | 0, a | 0, u | 0), { h: f, l: g } = mt.add(this.Dh | 0, this.Dl | 0, f | 0, g | 0), { h: b, l: v } = mt.add(this.Eh | 0, this.El | 0, b | 0, v | 0), { h: S, l: Q } = mt.add(this.Fh | 0, this.Fl | 0, S | 0, Q | 0), { h: N, l: T } = mt.add(this.Gh | 0, this.Gl | 0, N | 0, T | 0), { h: F, l: Y } = mt.add(this.Hh | 0, this.Hl | 0, F | 0, Y | 0), this.set(n, s, i, o, a, u, f, g, b, v, S, Q, N, T, F, Y);
  }
  roundClean() {
    Ir.fill(0), Er.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const O_ = /* @__PURE__ */ yi(() => new qp());
var $p = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: o } = e;
  return fp(t, r, { N: n, r: i, p: s, dkLen: o });
}, Kp = (e) => Up(e);
function tA(e) {
  const t = K(e, "data");
  return Wp(t);
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
}, M_ = (e, t, r, n, s) => {
  const i = { sha256: Lr, sha512: O_ }[s];
  return $(Ca(i, e, t, { c: r, dkLen: n }));
}, { crypto: cs, btoa: L_ } = globalThis;
if (!cs)
  throw new x(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!L_)
  throw new x(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Po = (e) => cs.getRandomValues(new Uint8Array(e)), Qs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return L_(r);
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
}, k_ = "AES-CTR", Sa = (e, t) => {
  const r = pn(String(e).normalize("NFKC"), "utf-8"), n = M_(r, t, 1e5, 32, "sha256");
  return K(n);
}, eA = async (e, t) => {
  const r = Po(16), n = Po(32), s = Sa(e, n), i = JSON.stringify(t), o = pn(i, "utf-8"), a = {
    name: k_,
    counter: r,
    length: 64
  }, u = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), f = await crypto.subtle.encrypt(a, u, o);
  return {
    data: Qs(new Uint8Array(f)),
    iv: Qs(r),
    salt: Qs(n)
  };
}, rA = async (e, t) => {
  const r = pn(t.iv), n = pn(t.salt), s = Sa(e, n), i = pn(t.data), o = {
    name: k_,
    counter: r,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), u = await crypto.subtle.decrypt(o, a, i), f = new TextDecoder().decode(u);
  try {
    return JSON.parse(f);
  } catch {
    throw new x(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, nA = async (e, t, r) => {
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
}, sA = async (e, t, r) => {
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
}, iA = (e, t, r) => {
  const n = e === "sha256" ? Lr : O_, s = bi.create(n, t).update(r).digest();
  return $(s);
}, oA = () => cs.randomUUID(), aA = {
  bufferFromString: pn,
  stringFromBuffer: Qs,
  decrypt: rA,
  encrypt: eA,
  keyFromPassword: Sa,
  randomBytes: Po,
  scrypt: $p,
  keccak256: Kp,
  decryptJsonWalletData: sA,
  encryptJsonWalletData: nA,
  computeHmac: iA,
  pbkdf2: M_,
  ripemd160: tA,
  randomUUID: oA
}, cA = aA, {
  bufferFromString: Qr,
  decrypt: dA,
  encrypt: uA,
  keyFromPassword: zC,
  randomBytes: Ve,
  stringFromBuffer: zn,
  scrypt: P_,
  keccak256: U_,
  decryptJsonWalletData: _A,
  encryptJsonWalletData: hA,
  pbkdf2: lA,
  computeHmac: G_,
  ripemd160: fA,
  randomUUID: pA
} = cA;
function Be(e) {
  return $(Lr(K(e)));
}
function Ye(e) {
  return Be(e);
}
function AA(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function gA(e) {
  return Ye(Qr(e, "utf-8"));
}
var wA = Object.defineProperty, mA = (e, t, r) => t in e ? wA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Na = (e, t, r) => (mA(e, t + "", r), r), _t = class {
  constructor(e, t, r) {
    O(this, "name");
    O(this, "type");
    O(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, yA = "u8", bA = "u16", IA = "u32", EA = "u64", vA = "u256", CA = "raw untyped ptr", BA = "raw untyped slice", xA = "bool", RA = "b256", SA = "struct std::b512::B512", Hs = "enum std::option::Option", NA = "struct std::vec::Vec", TA = "struct std::bytes::Bytes", DA = "struct std::string::String", QA = "str", ds = "()", z_ = /^enum (std::option::)?Option$/m, V_ = /^str\[(?<length>[0-9]+)\]/, Uo = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Y_ = /^struct.+/, H_ = /^enum.+$/, FA = /^\((?<items>.*)\)$/, OA = /^generic.+$/, MA = /([^\s]+)$/m, Zs = "1", gt = 8, gr = 32, Xs = gr + 2, Ws = gr, LA = gr, kA = gr, PA = gt * 4, UA = gt * 2, Z_ = 2 ** 32 - 1, X_ = ({ maxInputs: e }) => gr + // Tx ID
Ws + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Ws + gt) + gt, W_ = gt + // Identifier
gt + // Gas limit
gt + // Script size
gt + // Script data size
gt + // Policies
gt + // Inputs size
gt + // Outputs size
gt + // Witnesses size
gr, VC = gt + // Identifier
PA + // Utxo Length
gt + // Output Index
kA + // Owner
gt + // Amount
Ws + // Asset id
UA + // TxPointer
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
    if (!Vt(this, ns) && t.length < this.encodedLength || t.length > Z_)
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
      t = K(e);
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
}, GA = class extends _t {
  constructor() {
    super("b512", "struct B512", gt * 8);
  }
  encode(e) {
    let t;
    try {
      t = K(e);
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
}, zA = {
  u64: gt,
  u256: gt * 4
}, P = class extends _t {
  constructor(e) {
    super("bigNumber", e, zA[e]);
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
}, VA = class extends _t {
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
}, j_ = class extends _t {
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
Na(j_, "memorySize", 1);
var Jr, ss, mn, Pr, q_, $_, K_, $0, J_ = ($0 = class extends _t {
  constructor(t, r) {
    const n = new P("u64"), s = Object.values(r).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    He(this, Pr);
    O(this, "name");
    O(this, "coders");
    He(this, Jr);
    He(this, ss);
    He(this, mn);
    this.name = t, this.coders = r, $e(this, Jr, n), $e(this, ss, s), $e(this, mn, !(z_.test(this.type) || Nn(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return bs(this, Pr, $_).call(this, t);
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
    return new Uint8Array([...Vt(this, Jr).encode(i), ...o]);
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
    const o = this.coders[i], a = r + Vt(this, Jr).encodedLength;
    if (Vt(this, mn) && t.length < a + o.encodedLength)
      throw new x(D.DECODE_ERROR, "Invalid enum data size.");
    const [u, f] = o.decode(t, a);
    return bs(this, Pr, q_).call(this, this.coders[i]) ? bs(this, Pr, K_).call(this, i, f) : [{ [i]: u }, f];
  }
}, Jr = new WeakMap(), ss = new WeakMap(), mn = new WeakMap(), Pr = new WeakSet(), // Checks that we're handling a native enum that is of type void.
q_ = function(t) {
  return this.type !== Hs && t.type === ds;
}, $_ = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Vt(this, ss) - r.encodedLength);
  return ct([Vt(this, Jr).encode(s), i, n]);
}, K_ = function(t, r) {
  return [t, r];
}, $0), YA = (e) => {
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
    const n = r.padToWordSize ? gt : YA(t);
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
}, th = class extends J_ {
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
}, HA = class extends _t {
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
var eh = class extends _t {
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
Na(eh, "memorySize", 1);
var ZA = class extends _t {
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
}, is, K0, Ii = (K0 = class extends _t {
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
        if (!(n instanceof th) && s == null)
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
}, is = new WeakMap(), K0), os, t_, rh = (t_ = class extends _t {
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
}, os = new WeakMap(), t_), yn, e_, XA = (e_ = class extends _t {
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
    if (!Vt(this, yn) && t.length < this.encodedLength || t.length > Z_)
      throw new x(D.DECODE_ERROR, "Invalid vec data size.");
    const n = r + gt, s = t.slice(r, n), i = R(new P("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, a = t.slice(n, n + o);
    if (!Vt(this, yn) && a.length !== o)
      throw new x(D.DECODE_ERROR, "Invalid vec byte data size.");
    let u = n;
    const f = [];
    for (let g = 0; g < i; g++) {
      const [b, v] = this.coder.decode(t, u);
      f.push(b), u = v;
    }
    return [f, u];
  }
}, yn = new WeakMap(), e_), nh = (e) => {
  switch (e) {
    case void 0:
    case Zs:
      return Zs;
    default:
      throw new x(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Xn = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new x(
      D.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, WA = (e, t) => t.filter((r) => Xn(e, r.type).type !== ds), jA = (e) => {
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
    const r = Xn(e, t.type);
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
      if (OA.test(i.type)) {
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
    return Y_.test(this.type) ? "s" : Uo.test(this.type) ? "a" : H_.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = V_.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Uo.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new Sr(this.abi, o).getSignature()).join(",")}>` : "", n = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, JA = class extends _t {
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
  var f, g, b, v;
  switch (e.type) {
    case yA:
    case bA:
    case IA:
      return new rt(e.type);
    case EA:
    case CA:
      return new P("u64");
    case vA:
      return new P("u256");
    case BA:
      return new HA();
    case xA:
      return new VA();
    case RA:
      return new j();
    case SA:
      return new GA();
    case TA:
      return new j_();
    case DA:
      return new Ta();
    case QA:
      return new eh();
    case ds:
      return new JA();
  }
  const r = (f = V_.exec(e.type)) == null ? void 0 : f.groups;
  if (r) {
    const S = parseInt(r.length, 10);
    return new ZA(S);
  }
  const n = e.components, s = (g = Uo.exec(e.type)) == null ? void 0 : g.groups;
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
  if (e.type === NA) {
    const S = jA(n), Q = new Sr(e.abi, S), N = cn(Q);
    return new XA(N);
  }
  const i = (b = e.type.match(MA)) == null ? void 0 : b[0];
  if (Y_.test(e.type) && i) {
    const S = Oc(n, { getCoder: cn });
    return new Ii(i, S);
  }
  if (H_.test(e.type) && i) {
    const S = Oc(n, { getCoder: cn });
    return e.type === Hs ? new th(i, S) : new J_(i, S);
  }
  if ((v = FA.exec(e.type)) == null ? void 0 : v.groups) {
    const S = n.map((Q) => cn(Q));
    return new rh(S);
  }
  throw new x(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function qA(e = Zs) {
  switch (e) {
    case Zs:
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
}, $A = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const o = Xn(t, i.type);
    return n = n || o.type !== ds && !z_.test(o.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, KA = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, Go = class {
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
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = Go.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = Go.getFunctionSelector(this.signature), this.selectorBytes = new Ta().encode(this.name), this.encoding = nh(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
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
    const r = $A({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new x(
        D.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Xr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = KA(e, this.jsonFn.inputs);
    return new rh(n).encode(s);
  }
  decodeArguments(e) {
    const t = K(e), r = WA(this.jsonAbiOld, this.jsonFnOld.inputs);
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
    const t = K(e);
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
}, tg = (e, t) => e.find((r) => r.concreteTypeId === t), Da = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function Qa(e, t, r) {
  const n = Da(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = tg(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: Fa(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function sh(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = Da(e, s);
    return {
      name: "",
      type: isNaN(s) ? Qa(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: sh(e, t, i)
    };
  })) ?? null;
}
function un(e, t, r, n) {
  const s = Qa(e, t, r), i = Da(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: sh(e, t, i)
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
function eg(e) {
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
    this.jsonAbi = e, this.encoding = nh(e.encodingVersion), this.jsonAbiOld = eg(e), this.functions = Object.fromEntries(
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
    return Xr.decode(this.jsonAbiOld, r.loggedType, K(e), 0, {
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
}, YC = class {
}, rg = class {
}, ih = class {
}, oh = class {
}, ng = class extends oh {
}, sg = class extends oh {
}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
var vn = Jn.bech32m = Jn.bech32 = void 0;
const js = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", ah = {};
for (let e = 0; e < js.length; e++) {
  const t = js.charAt(e);
  ah[t] = e;
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
function ig(e) {
  return Oa(e, 8, 5, !0);
}
function og(e) {
  const t = Oa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function ag(e) {
  const t = Oa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function ch(e) {
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
    for (let b = 0; b < a.length; ++b) {
      const v = a[b];
      if (v >> 5)
        throw new Error("Non 5-bit word");
      f = An(f) ^ v, g += js.charAt(v);
    }
    for (let b = 0; b < 6; ++b)
      f = An(f);
    f ^= t;
    for (let b = 0; b < 6; ++b) {
      const v = f >> (5 - b) * 5 & 31;
      g += js.charAt(v);
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
    const b = o.slice(0, g), v = o.slice(g + 1);
    if (v.length < 6)
      return "Data too short";
    let S = Mc(b);
    if (typeof S == "string")
      return S;
    const Q = [];
    for (let N = 0; N < v.length; ++N) {
      const T = v.charAt(N), F = ah[T];
      if (F === void 0)
        return "Unknown character " + T;
      S = An(S) ^ F, !(N + 6 >= v.length) && Q.push(F);
    }
    return S !== t ? "Invalid checksum for " + o : { prefix: b, words: Q };
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
    toWords: ig,
    fromWordsUnsafe: og,
    fromWords: ag
  };
}
Jn.bech32 = ch("bech32");
vn = Jn.bech32m = ch("bech32m");
var Js = "fuel";
function Ma(e) {
  return vn.decode(e);
}
function Fs(e) {
  return vn.encode(
    Js,
    vn.toWords(K($(e)))
  );
}
function Os(e) {
  return typeof e == "string" && e.indexOf(Js + 1) === 0 && Ma(e).prefix === Js;
}
function Ms(e) {
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
  if (!Os(e))
    throw new x(
      x.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return $(La(e));
}
function cg(e) {
  const { words: t } = Ma(e);
  return vn.encode(Js, t);
}
var Vn = (e) => e instanceof ih ? e.address : e instanceof ng ? e.id : e, dg = () => $(Ve(32)), ug = (e) => {
  let t;
  try {
    if (!Ms(e))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = La(Fs(e)), t = $(t.fill(0, 0, 12));
  } catch {
    throw new x(
      x.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, _g = (e) => {
  if (!zo(e))
    throw new x(x.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ft = class extends rg {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    O(this, "bech32Address");
    if (this.bech32Address = cg(t), !Os(this.bech32Address))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${t}.`
      );
  }
  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum() {
    return ft.toChecksum(this.toB256());
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
   * returns the address `checksum` as a string
   *
   * @returns The `bech32Address` property as a string
   */
  toString() {
    return this.toChecksum();
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
      bits: ug(t)
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
   * returns the address `checksum` as a string
   *
   * @returns The value of `bech32Address` property
   */
  valueOf() {
    return this.toChecksum();
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
    const r = $(Lr(K(t)));
    return new ft(Fs(r));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Ms(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ft(Fs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(dg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Os(t) ? new ft(t) : this.fromB256(t);
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
    if (Os(t))
      return new ft(t);
    if (Ms(t))
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
    const r = _g(t);
    return new ft(Fs(r));
  }
  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(t) {
    let r = t;
    return t.startsWith("0x") || (r = `0x${t}`), r.trim().length !== 66 ? !1 : ft.toChecksum($(r)) === r;
  }
  /** @hidden */
  static toChecksum(t) {
    if (!Ms(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    const r = $(t).toLowerCase().slice(2), n = Lr(r);
    let s = "0x";
    for (let i = 0; i < 32; ++i) {
      const o = n[i], a = r.charAt(i * 2), u = r.charAt(i * 2 + 1);
      s += (o & 240) >= 128 ? a.toUpperCase() : a, s += (o & 15) >= 8 ? u.toUpperCase() : u;
    }
    return s;
  }
}, Dr, r_, Ct = (r_ = class extends _t {
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
    const r = [], n = K(t);
    return r.push(n), Vt(this, Dr) && r.push(new Uint8Array(Vt(this, Dr))), ct(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [$(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return Vt(this, Dr) && ([n, s] = [null, s + Vt(this, Dr)]), [i, s];
  }
}, Dr = new WeakMap(), r_), Kr = class extends Ii {
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
    return t.push(new j().encode(e.txID)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new j().encode(e.owner)), t.push(new P("u64").encode(e.amount)), t.push(new j().encode(e.assetId)), t.push(new Kr().encode(e.txPointer)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new P("u64").encode(e.predicateGasUsed)), t.push(new P("u64").encode(e.predicateLength)), t.push(new P("u64").encode(e.predicateDataLength)), t.push(new Ct(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
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
    [r, n] = new Kr().decode(e, n);
    const f = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const g = Number(r);
    [r, n] = new P("u64").decode(e, n);
    const b = r;
    [r, n] = new P("u64").decode(e, n);
    const v = r;
    [r, n] = new P("u64").decode(e, n);
    const S = r;
    [r, n] = new Ct(v.toNumber()).decode(e, n);
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
        predicateGasUsed: b,
        predicateLength: v,
        predicateDataLength: S,
        predicate: Q,
        predicateData: r
      },
      n
    ];
  }
}, qs = class extends _t {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new j().encode(e.txID)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new j().encode(e.balanceRoot)), t.push(new j().encode(e.stateRoot)), t.push(new Kr().encode(e.txPointer)), t.push(new j().encode(e.contractID)), ct(t);
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
    [r, n] = new Kr().decode(e, n);
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
    return t.push(new Ct(32).encode(e.sender)), t.push(new Ct(32).encode(e.recipient)), t.push(new Ct(32).encode(e.nonce)), t.push(new P("u64").encode(e.amount)), t.push(K(e.data || "0x")), Be(ct(t));
  }
  static encodeData(e) {
    const t = K(e || "0x"), r = t.length;
    return new Ct(r).encode(t);
  }
  encode(e) {
    const t = [], r = Fr.encodeData(e.data);
    return t.push(new Ct(32).encode(e.sender)), t.push(new Ct(32).encode(e.recipient)), t.push(new P("u64").encode(e.amount)), t.push(new Ct(32).encode(e.nonce)), t.push(new rt("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new P("u64").encode(e.predicateGasUsed)), t.push(new P("u64").encode(r.length)), t.push(new P("u64").encode(e.predicateLength)), t.push(new P("u64").encode(e.predicateDataLength)), t.push(new Ct(r.length).encode(r)), t.push(new Ct(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ct(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ct(t);
  }
  static decodeData(e) {
    const t = K(e), r = t.length, [n] = new Ct(r).decode(t, 0);
    return K(n);
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
    const b = r;
    [r, n] = new P("u64").decode(e, n);
    const v = r;
    [r, n] = new Ct(g).decode(e, n);
    const S = r;
    [r, n] = new Ct(b.toNumber()).decode(e, n);
    const Q = r;
    return [r, n] = new Ct(v.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: u,
        nonce: a,
        predicateGasUsed: f,
        dataLength: g,
        predicateLength: b,
        predicateDataLength: v,
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
        t.push(new qs().encode(e));
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
        return [r, n] = new qs().decode(e, n), [r, n];
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
}, je = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(je || {}), hg = (e) => e.sort((t, r) => t.type - r.type);
function lg(e) {
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
    lg(e);
    const t = hg(e), r = [];
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
    const b = r;
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
        pc: b,
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
}, Zc = class extends _t {
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
}, Xc = class extends _t {
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
}, Jc = class extends _t {
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
    const b = r;
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
        is: b,
        data: r
      },
      n
    ];
  }
}, qc = class extends _t {
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
    return t.push(new Ct(32).encode(e.sender)), t.push(new Ct(32).encode(e.recipient)), t.push(new Ct(32).encode(e.nonce)), t.push(new P("u64").encode(e.amount)), t.push(K(e.data || "0x")), Be(ct(t));
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
    const g = K(r), b = {
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
    return b.messageId = Vo.getMessageId(b), [b, n];
  }
}, qn = (e, t) => {
  const r = K(e), n = K(t);
  return Be(ct([r, n]));
}, HC = (e, t) => ({
  bits: qn(e, t)
}), Ks = class extends _t {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  /**
   * @deprecated `ReceiptMintCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(e, t) {
    return qn(e, t);
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
    return qn(e, t);
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
}, ZC = class extends _t {
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
        t.push(new Zc().encode(e));
        break;
      }
      case 3: {
        t.push(new Xc().encode(e));
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
        t.push(new Jc().encode(e));
        break;
      }
      case 7: {
        t.push(new qc().encode(e));
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
        return [r, n] = new Zc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Xc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Wc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new jc().decode(e, n), [r, n];
      case 6:
        return [r, n] = new Jc().decode(e, n), [r, n];
      case 7:
        return [r, n] = new qc().decode(e, n), [r, n];
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
}, ze = /* @__PURE__ */ ((e) => (e[e.ConsensusParameters = 0] = "ConsensusParameters", e[e.StateTransition = 1] = "StateTransition", e))(ze || {}), rd = class extends _t {
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
    const b = r;
    [r, n] = new Ct(o.toNumber()).decode(e, n);
    const v = r;
    [r, n] = new Ct(a.toNumber()).decode(e, n);
    const S = r;
    [r, n] = new ir().decode(e, n, u);
    const Q = r;
    [r, n] = new bt(new nr(), f).decode(e, n);
    const N = r;
    [r, n] = new bt(new sr(), g).decode(e, n);
    const T = r;
    return [r, n] = new bt(new or(), b).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: a,
        policyTypes: u,
        inputsCount: f,
        outputsCount: g,
        witnessesCount: b,
        receiptsRoot: i,
        script: v,
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
    const b = r;
    [r, n] = new ir().decode(e, n, a);
    const v = r;
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
        policies: v,
        storageSlots: b,
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
    return t.push(new Kr().encode(e.txPointer)), t.push(new qs().encode(e.inputContract)), t.push(new $s().encode(e.outputContract)), t.push(new P("u64").encode(e.mintAmount)), t.push(new j().encode(e.mintAssetId)), t.push(new P("u64").encode(e.gasPrice)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Kr().decode(e, n);
    const s = r;
    [r, n] = new qs().decode(e, n);
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
    const b = r;
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
        outputs: b,
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
    const b = r;
    [r, n] = new rt("u16", { padToWordSize: !0 }).decode(e, n);
    const v = r;
    [r, n] = new bt(new j(), u).decode(e, n);
    const S = r;
    [r, n] = new ir().decode(e, n, f);
    const Q = r;
    [r, n] = new bt(new nr(), g).decode(e, n);
    const N = r;
    [r, n] = new bt(new sr(), b).decode(e, n);
    const T = r;
    return [r, n] = new bt(new or(), v).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: a,
        proofSetCount: u,
        policyTypes: f,
        inputsCount: g,
        outputsCount: b,
        witnessesCount: v,
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
    const b = r;
    [r, n] = new bt(new sr(), u).decode(e, n);
    const v = r;
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
        inputs: b,
        outputs: v,
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
}, XC = class extends Ii {
  constructor() {
    super("UtxoId", {
      transactionId: new j(),
      outputIndex: new rt("u16", { padToWordSize: !0 })
    });
  }
};
function fg(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function dh(e) {
  return function t(r) {
    return arguments.length === 0 || fg(r) ? t : e.apply(this, arguments);
  };
}
var pg = /* @__PURE__ */ dh(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Ag(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function uh(e, t, r) {
  if (r || (r = new wg()), gg(e))
    return e;
  var n = function(i) {
    var o = r.get(e);
    if (o)
      return o;
    r.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = uh(e[a], !0, r));
    return i;
  };
  switch (pg(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Ag(e);
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
function gg(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var wg = /* @__PURE__ */ function() {
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
}(), xe = /* @__PURE__ */ dh(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : uh(t);
});
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ka = /* @__PURE__ */ BigInt(0), Ei = /* @__PURE__ */ BigInt(1), mg = /* @__PURE__ */ BigInt(2);
function tn(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function us(e) {
  if (!tn(e))
    throw new Error("Uint8Array expected");
}
function Cn(e, t) {
  if (typeof t != "boolean")
    throw new Error(`${e} must be valid boolean, got "${t}".`);
}
const yg = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Bn(e) {
  us(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += yg[e[r]];
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
function bg(e) {
  return xn(_n(e));
}
function Je(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = xn(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (tn(t))
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
function _h(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function Ig(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const oo = (e) => typeof e == "bigint" && ka <= e;
function vi(e, t, r) {
  return oo(e) && oo(t) && oo(r) && t <= e && e < r;
}
function $r(e, t, r, n) {
  if (!vi(t, r, n))
    throw new Error(`expected valid ${e}: ${r} <= n < ${n}, got ${typeof t} ${t}`);
}
function hh(e) {
  let t;
  for (t = 0; e > ka; e >>= Ei, t += 1)
    ;
  return t;
}
function Eg(e, t) {
  return e >> BigInt(t) & Ei;
}
function vg(e, t, r) {
  return e | (r ? Ei : ka) << BigInt(t);
}
const za = (e) => (mg << BigInt(e - 1)) - Ei, ao = (e) => new Uint8Array(e), ud = (e) => Uint8Array.from(e);
function lh(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = ao(e), s = ao(e), i = 0;
  const o = () => {
    n.fill(1), s.fill(0), i = 0;
  }, a = (...b) => r(s, n, ...b), u = (b = ao()) => {
    s = a(ud([0]), b), n = a(), b.length !== 0 && (s = a(ud([1]), b), n = a());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let b = 0;
    const v = [];
    for (; b < t; ) {
      n = a();
      const S = n.slice();
      v.push(S), b += n.length;
    }
    return $n(...v);
  };
  return (b, v) => {
    o(), u(b);
    let S;
    for (; !(S = v(f())); )
      u();
    return o(), S;
  };
}
const Cg = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || tn(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function _s(e, t, r = {}) {
  const n = (s, i, o) => {
    const a = Cg[i];
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
const Bg = () => {
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
const xg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: $r,
  abool: Cn,
  abytes: us,
  bitGet: Eg,
  bitLen: hh,
  bitMask: za,
  bitSet: vg,
  bytesToHex: Bn,
  bytesToNumberBE: qr,
  bytesToNumberLE: Ua,
  concatBytes: $n,
  createHmacDrbg: lh,
  ensureBytes: Je,
  equalBytes: _h,
  hexToBytes: xn,
  hexToNumber: Pa,
  inRange: vi,
  isBytes: tn,
  memoized: Yo,
  notImplemented: Bg,
  numberToBytesBE: Rn,
  numberToBytesLE: Ga,
  numberToHexUnpadded: _n,
  numberToVarBytesBE: bg,
  utf8ToBytes: Ig,
  validateObject: _s
}, Symbol.toStringTag, { value: "Module" }));
var co = {}, Ho = { exports: {} };
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
        ], b = ArrayBuffer.isView || function(_) {
          return _ && g.indexOf(Object.prototype.toString.call(_)) > -1;
        };
      function v(_) {
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
        _ = v(_), p = S(p);
        var m = this.map[_];
        this.map[_] = m ? m + ", " + p : p;
      }, N.prototype.delete = function(_) {
        delete this.map[v(_)];
      }, N.prototype.get = function(_) {
        return _ = v(_), this.has(_) ? this.map[_] : null;
      }, N.prototype.has = function(_) {
        return this.map.hasOwnProperty(v(_));
      }, N.prototype.set = function(_, p) {
        this.map[v(_)] = S(p);
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
          this.bodyUsed = this.bodyUsed, this._bodyInit = _, _ ? typeof _ == "string" ? this._bodyText = _ : u.blob && Blob.prototype.isPrototypeOf(_) ? this._bodyBlob = _ : u.formData && FormData.prototype.isPrototypeOf(_) ? this._bodyFormData = _ : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) ? this._bodyText = _.toString() : u.arrayBuffer && u.blob && f(_) ? (this._bodyArrayBuffer = M(_.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : u.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(_) || b(_)) ? this._bodyArrayBuffer = M(_) : this._bodyText = _ = Object.prototype.toString.call(_) : this._bodyText = "", this.headers.get("content-type") || (typeof _ == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : u.searchParams && URLSearchParams.prototype.isPrototypeOf(_) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
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
          return this.text().then(q);
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
      function q(_) {
        var p = new FormData();
        return _.trim().split("&").forEach(function(m) {
          if (m) {
            var A = m.split("="), E = A.shift().replace(/\+/g, " "), C = A.join("=").replace(/\+/g, " ");
            p.append(decodeURIComponent(E), decodeURIComponent(C));
          }
        }), p;
      }
      function X(_) {
        var p = new N(), m = _.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(A) {
          return A.indexOf(`
`) === 0 ? A.substr(1, A.length) : A;
        }).forEach(function(A) {
          var E = A.split(":"), C = E.shift().trim();
          if (C) {
            var w = E.join(":").trim();
            p.append(C, w);
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
          var C = new XMLHttpRequest();
          function w() {
            C.abort();
          }
          C.onload = function() {
            var I = {
              status: C.status,
              statusText: C.statusText,
              headers: X(C.getAllResponseHeaders() || "")
            };
            I.url = "responseURL" in C ? C.responseURL : I.headers.get("X-Request-URL");
            var J = "response" in C ? C.response : C.responseText;
            setTimeout(function() {
              m(new tt(J, I));
            }, 0);
          }, C.onerror = function() {
            setTimeout(function() {
              A(new TypeError("Network request failed"));
            }, 0);
          }, C.ontimeout = function() {
            setTimeout(function() {
              A(new TypeError("Network request failed"));
            }, 0);
          }, C.onabort = function() {
            setTimeout(function() {
              A(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function h(I) {
            try {
              return I === "" && a.location.href ? a.location.href : I;
            } catch {
              return I;
            }
          }
          C.open(E.method, h(E.url), !0), E.credentials === "include" ? C.withCredentials = !0 : E.credentials === "omit" && (C.withCredentials = !1), "responseType" in C && (u.blob ? C.responseType = "blob" : u.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (C.responseType = "arraybuffer")), p && typeof p.headers == "object" && !(p.headers instanceof N) ? Object.getOwnPropertyNames(p.headers).forEach(function(I) {
            C.setRequestHeader(I, S(p.headers[I]));
          }) : E.headers.forEach(function(I, J) {
            C.setRequestHeader(J, I);
          }), E.signal && (E.signal.addEventListener("abort", w), C.onreadystatechange = function() {
            C.readyState === 4 && E.signal.removeEventListener("abort", w);
          }), C.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return d.polyfill = !0, a.fetch || (a.fetch = d, a.Headers = N, a.Request = k, a.Response = tt), o.Headers = N, o.Request = k, o.Response = tt, o.fetch = d, o;
    })({});
  })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
  var s = r.fetch ? r : n;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Ho, Ho.exports);
var Rg = Ho.exports;
function Sg(e) {
  return typeof e == "object" && e !== null;
}
function Ng(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Tg = /\r\n|[\n\r]/g;
function Zo(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(Tg)) {
    if (typeof s.index == "number" || Ng(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function Dg(e) {
  return fh(
    e.source,
    Zo(e.source, e.start)
  );
}
function fh(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? r : 0, u = t.column + a, f = `${e.name}:${o}:${u}
`, g = n.split(/\r\n|[\n\r]/g), b = g[s];
  if (b.length > 120) {
    const v = Math.floor(u / 80), S = u % 80, Q = [];
    for (let N = 0; N < b.length; N += 80)
      Q.push(b.slice(N, N + 80));
    return f + _d([
      [`${o} |`, Q[0]],
      ...Q.slice(1, v + 1).map((N) => ["|", N]),
      ["|", "^".padStart(S)],
      ["|", Q[v + 1]]
    ]);
  }
  return f + _d([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, g[s - 1]],
    [`${o} |`, b],
    ["|", "^".padStart(u)],
    [`${o + 1} |`, g[s + 1]]
  ]);
}
function _d(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function Qg(e) {
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
    const { nodes: o, source: a, positions: u, path: f, originalError: g, extensions: b } = Qg(r);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = g ?? void 0, this.nodes = hd(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const v = hd(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((Q) => Q.loc).filter((Q) => Q != null)
    );
    this.source = a ?? (v == null || (s = v[0]) === null || s === void 0 ? void 0 : s.source), this.positions = u ?? (v == null ? void 0 : v.map((Q) => Q.start)), this.locations = u && a ? u.map((Q) => Zo(a, Q)) : v == null ? void 0 : v.map((Q) => Zo(Q.source, Q.start));
    const S = Sg(
      g == null ? void 0 : g.extensions
    ) ? g == null ? void 0 : g.extensions : void 0;
    this.extensions = (i = b ?? S) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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

` + Dg(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + fh(this.source, r);
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
class Fg {
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
class ph {
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
const Ah = {
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
}, Og = new Set(Object.keys(Ah));
function ld(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Og.has(t);
}
var hn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(hn || (hn = {}));
var Xo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Xo || (Xo = {}));
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
function gh(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function wh(e) {
  return gh(e) || e === 95;
}
function Mg(e) {
  return gh(e) || Kn(e) || e === 95;
}
function Lg(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], u = kg(a);
    u !== a.length && (n = (i = n) !== null && i !== void 0 ? i : o, s = o, o !== 0 && u < r && (r = u));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function kg(e) {
  let t = 0;
  for (; t < e.length && Wo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Pg(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((S) => S.length === 0 || Wo(S.charCodeAt(0))), o = r.endsWith('\\"""'), a = e.endsWith('"') && !o, u = e.endsWith("\\"), f = a || u, g = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || f || i || o
  );
  let b = "";
  const v = s && Wo(e.charCodeAt(0));
  return (g && !v || i) && (b += `
`), b += r, (g || f) && (b += `
`), '"""' + b + '"""';
}
var Z;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(Z || (Z = {}));
class Ug {
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
    const r = new ph(Z.SOF, 0, 0, 0, 0);
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
    if (t.kind !== Z.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const r = zg(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === Z.COMMENT);
    return t;
  }
}
function Gg(e) {
  return e === Z.BANG || e === Z.DOLLAR || e === Z.AMP || e === Z.PAREN_L || e === Z.PAREN_R || e === Z.SPREAD || e === Z.COLON || e === Z.EQUALS || e === Z.AT || e === Z.BRACKET_L || e === Z.BRACKET_R || e === Z.BRACE_L || e === Z.PIPE || e === Z.BRACE_R;
}
function Tn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ci(e, t) {
  return mh(e.charCodeAt(t)) && yh(e.charCodeAt(t + 1));
}
function mh(e) {
  return e >= 55296 && e <= 56319;
}
function yh(e) {
  return e >= 56320 && e <= 57343;
}
function en(e, t) {
  const r = e.source.body.codePointAt(t);
  if (r === void 0)
    return Z.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function me(e, t, r, n, s) {
  const i = e.line, o = 1 + r - e.lineStart;
  return new ph(t, r, n, i, o, s);
}
function zg(e, t) {
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
        return Vg(e, s);
      case 33:
        return me(e, Z.BANG, s, s + 1);
      case 36:
        return me(e, Z.DOLLAR, s, s + 1);
      case 38:
        return me(e, Z.AMP, s, s + 1);
      case 40:
        return me(e, Z.PAREN_L, s, s + 1);
      case 41:
        return me(e, Z.PAREN_R, s, s + 1);
      case 46:
        if (r.charCodeAt(s + 1) === 46 && r.charCodeAt(s + 2) === 46)
          return me(e, Z.SPREAD, s, s + 3);
        break;
      case 58:
        return me(e, Z.COLON, s, s + 1);
      case 61:
        return me(e, Z.EQUALS, s, s + 1);
      case 64:
        return me(e, Z.AT, s, s + 1);
      case 91:
        return me(e, Z.BRACKET_L, s, s + 1);
      case 93:
        return me(e, Z.BRACKET_R, s, s + 1);
      case 123:
        return me(e, Z.BRACE_L, s, s + 1);
      case 124:
        return me(e, Z.PIPE, s, s + 1);
      case 125:
        return me(e, Z.BRACE_R, s, s + 1);
      case 34:
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? jg(e, s) : Hg(e, s);
    }
    if (Kn(i) || i === 45)
      return Yg(e, s, i);
    if (wh(i))
      return Jg(e, s);
    throw be(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Tn(i) || Ci(r, s) ? `Unexpected character: ${en(e, s)}.` : `Invalid character: ${en(e, s)}.`
    );
  }
  return me(e, Z.EOF, n, n);
}
function Vg(e, t) {
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
    Z.COMMENT,
    t,
    s,
    r.slice(t + 1, s)
  );
}
function Yg(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, o = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), Kn(i))
      throw be(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${en(
          e,
          s
        )}.`
      );
  } else
    s = uo(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (o = !0, i = n.charCodeAt(++s), s = uo(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = uo(e, s, i), i = n.charCodeAt(s)), i === 46 || wh(i))
    throw be(
      e.source,
      s,
      `Invalid number, expected digit but got: ${en(
        e,
        s
      )}.`
    );
  return me(
    e,
    o ? Z.FLOAT : Z.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function uo(e, t, r) {
  if (!Kn(r))
    throw be(
      e.source,
      t,
      `Invalid number, expected digit but got: ${en(
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
function Hg(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, o = "";
  for (; s < n; ) {
    const a = r.charCodeAt(s);
    if (a === 34)
      return o += r.slice(i, s), me(e, Z.STRING, t, s + 1, o);
    if (a === 92) {
      o += r.slice(i, s);
      const u = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? Zg(e, s) : Xg(e, s) : Wg(e, s);
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
        `Invalid character within String: ${en(
          e,
          s
        )}.`
      );
  }
  throw be(e.source, s, "Unterminated string.");
}
function Zg(e, t) {
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
  if (mh(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = fd(r, t + 8);
    if (yh(s))
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
function Wg(e, t) {
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
function jg(e, t) {
  const r = e.source.body, n = r.length;
  let s = e.lineStart, i = t + 3, o = i, a = "";
  const u = [];
  for (; i < n; ) {
    const f = r.charCodeAt(i);
    if (f === 34 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34) {
      a += r.slice(o, i), u.push(a);
      const g = me(
        e,
        Z.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Lg(u).join(`
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
        `Invalid character within String: ${en(
          e,
          i
        )}.`
      );
  }
  throw be(e.source, i, "Unterminated string.");
}
function Jg(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (Mg(i))
      ++s;
    else
      break;
  }
  return me(
    e,
    Z.NAME,
    t,
    s,
    r.slice(t, s)
  );
}
function Ls(e, t) {
  if (!!!e)
    throw new Error(t);
}
const qg = 10, bh = 2;
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
      return $g(e, t);
    default:
      return String(e);
  }
}
function $g(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if (Kg(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : Bi(n, r);
  } else if (Array.isArray(e))
    return ew(e, r);
  return tw(e, r);
}
function Kg(e) {
  return typeof e.toJSON == "function";
}
function tw(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > bh ? "[" + rw(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + Bi(i, t)
  ).join(", ") + " }";
}
function ew(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > bh)
    return "[Array]";
  const r = Math.min(qg, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(Bi(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function rw(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const nw = globalThis.process && // eslint-disable-next-line no-undef
!0, sw = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  nw ? function(t, r) {
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
class Ih {
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
function iw(e) {
  return sw(e, Ih);
}
function Eh(e, t) {
  return new hs(e, t).parseDocument();
}
function ow(e, t) {
  const r = new hs(e, t);
  r.expectToken(Z.SOF);
  const n = r.parseValueLiteral(!1);
  return r.expectToken(Z.EOF), n;
}
function aw(e, t) {
  const r = new hs(e, t);
  r.expectToken(Z.SOF);
  const n = r.parseConstValueLiteral();
  return r.expectToken(Z.EOF), n;
}
function cw(e, t) {
  const r = new hs(e, t);
  r.expectToken(Z.SOF);
  const n = r.parseTypeReference();
  return r.expectToken(Z.EOF), n;
}
class hs {
  constructor(t, r = {}) {
    const n = iw(t) ? t : new Ih(t);
    this._lexer = new Ug(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(Z.NAME);
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
        Z.SOF,
        this.parseDefinition,
        Z.EOF
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
    if (this.peek(Z.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), r = t ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === Z.NAME) {
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
    if (this.peek(Z.BRACE_L))
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
    return this.peek(Z.NAME) && (n = this.parseName()), this.node(t, {
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
    const t = this.expectToken(Z.NAME);
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
      Z.PAREN_L,
      this.parseVariableDefinition,
      Z.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: lt.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(Z.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(Z.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(Z.DOLLAR), this.node(t, {
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
        Z.BRACE_L,
        this.parseSelection,
        Z.BRACE_R
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
    return this.peek(Z.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, r = this.parseName();
    let n, s;
    return this.expectOptionalToken(Z.COLON) ? (n = r, s = this.parseName()) : s = r, this.node(t, {
      kind: lt.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(Z.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const r = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(Z.PAREN_L, r, Z.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(Z.COLON), this.node(r, {
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
    this.expectToken(Z.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(Z.NAME) ? this.node(t, {
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
      case Z.BRACKET_L:
        return this.parseList(t);
      case Z.BRACE_L:
        return this.parseObject(t);
      case Z.INT:
        return this.advanceLexer(), this.node(r, {
          kind: lt.INT,
          value: r.value
        });
      case Z.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: lt.FLOAT,
          value: r.value
        });
      case Z.STRING:
      case Z.BLOCK_STRING:
        return this.parseStringLiteral();
      case Z.NAME:
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
      case Z.DOLLAR:
        if (t)
          if (this.expectToken(Z.DOLLAR), this._lexer.token.kind === Z.NAME) {
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
      block: t.kind === Z.BLOCK_STRING
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
      values: this.any(Z.BRACKET_L, r, Z.BRACKET_R)
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
      fields: this.any(Z.BRACE_L, r, Z.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(Z.COLON), this.node(r, {
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
    for (; this.peek(Z.AT); )
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
    return this.expectToken(Z.AT), this.node(r, {
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
    if (this.expectOptionalToken(Z.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(Z.BRACKET_R), r = this.node(t, {
        kind: lt.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(Z.BANG) ? this.node(t, {
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
    return this.peek(Z.STRING) || this.peek(Z.BLOCK_STRING);
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
      Z.BRACE_L,
      this.parseOperationTypeDefinition,
      Z.BRACE_R
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
    this.expectToken(Z.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(Z.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      Z.BRACE_L,
      this.parseFieldDefinition,
      Z.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(Z.COLON);
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
      Z.PAREN_L,
      this.parseInputValueDef,
      Z.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(Z.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(Z.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(Z.EQUALS) ? this.delimitedMany(Z.PIPE, this.parseNamedType) : [];
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
      Z.BRACE_L,
      this.parseEnumValueDefinition,
      Z.BRACE_R
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
        `${Bs(
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
      Z.BRACE_L,
      this.parseInputValueDef,
      Z.BRACE_R
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
    if (t.kind === Z.NAME)
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
      Z.BRACE_L,
      this.parseOperationTypeDefinition,
      Z.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(Z.AT);
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
    return this.delimitedMany(Z.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(Xo, r.value))
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
    return this._options.noLocation !== !0 && (r.loc = new Fg(
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
      `Expected ${vh(t)}, found ${Bs(r)}.`
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
    if (r.kind === Z.NAME && r.value === t)
      this.advanceLexer();
    else
      throw be(
        this._lexer.source,
        r.start,
        `Expected "${t}", found ${Bs(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const r = this._lexer.token;
    return r.kind === Z.NAME && r.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const r = t ?? this._lexer.token;
    return be(
      this._lexer.source,
      r.start,
      `Unexpected ${Bs(r)}.`
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
    if (t !== void 0 && r.kind !== Z.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw be(
        this._lexer.source,
        r.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Bs(e) {
  const t = e.value;
  return vh(e.kind) + (t != null ? ` "${t}"` : "");
}
function vh(e) {
  return Gg(e) ? `"${e}"` : e;
}
const dw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: hs,
  parse: Eh,
  parseConstValue: aw,
  parseType: cw,
  parseValue: ow
}, Symbol.toStringTag, { value: "Module" })), uw = /* @__PURE__ */ pa(dw);
function _w(e) {
  return `"${e.replace(hw, lw)}"`;
}
const hw = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function lw(e) {
  return fw[e.charCodeAt(0)];
}
const fw = [
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
], pw = Object.freeze({});
function Aw(e, t, r = Ah) {
  const n = /* @__PURE__ */ new Map();
  for (const F of Object.values(lt))
    n.set(F, gw(t, F));
  let s, i = Array.isArray(e), o = [e], a = -1, u = [], f = e, g, b;
  const v = [], S = [];
  do {
    a++;
    const F = a === o.length, Y = F && u.length !== 0;
    if (F) {
      if (g = S.length === 0 ? void 0 : v[v.length - 1], f = b, b = S.pop(), Y)
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
    } else if (b) {
      if (g = i ? a : o[a], f = b[g], f == null)
        continue;
      v.push(g);
    }
    let z;
    if (!Array.isArray(f)) {
      var Q, N;
      ld(f) || Ls(!1, `Invalid AST Node: ${Ya(f)}.`);
      const H = F ? (Q = n.get(f.kind)) === null || Q === void 0 ? void 0 : Q.leave : (N = n.get(f.kind)) === null || N === void 0 ? void 0 : N.enter;
      if (z = H == null ? void 0 : H.call(t, f, g, b, v, S), z === pw)
        break;
      if (z === !1) {
        if (!F) {
          v.pop();
          continue;
        }
      } else if (z !== void 0 && (u.push([g, z]), !F))
        if (ld(z))
          f = z;
        else {
          v.pop();
          continue;
        }
    }
    if (z === void 0 && Y && u.push([g, f]), F)
      v.pop();
    else {
      var T;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: u,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (T = r[f.kind]) !== null && T !== void 0 ? T : [], a = -1, u = [], b && S.push(b), b = f;
    }
  } while (s !== void 0);
  return u.length !== 0 ? u[u.length - 1][1] : e;
}
function gw(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Ch(e) {
  return Aw(e, mw);
}
const ww = 80, mw = {
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
    leave: ({ selections: e }) => Xe(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = It("", e, ": ") + t;
      let o = i + It("(", at(r, ", "), ")");
      return o.length > ww && (o = i + It(`(
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
    leave: ({ value: e, block: t }) => t ? Pg(e) : _w(e)
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
`) + at(["schema", at(t, " "), Xe(r)], " ")
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
        Xe(s)
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
        Xe(s)
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
`) + at(["enum", t, at(r, " "), Xe(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => It("", e, `
`) + at([t, at(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => It("", e, `
`) + at(["input", t, at(r, " "), Xe(n)], " ")
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
      ["extend schema", at(e, " "), Xe(t)],
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
        Xe(n)
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
        Xe(n)
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
    leave: ({ name: e, directives: t, values: r }) => at(["extend enum", e, at(t, " "), Xe(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => at(["extend input", e, at(t, " "), Xe(r)], " ")
  }
};
function at(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function Xe(e) {
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
const yw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: Ch
}, Symbol.toStringTag, { value: "Module" })), bw = /* @__PURE__ */ pa(yw);
var Ha = {}, xi = {}, Bh = function(t) {
  var r = t.uri, n = t.name, s = t.type;
  this.uri = r, this.name = n, this.type = s;
}, Iw = Bh, xh = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Iw;
}, Ew = xh, vw = function e(t, r, n) {
  r === void 0 && (r = ""), n === void 0 && (n = Ew);
  var s, i = /* @__PURE__ */ new Map();
  function o(g, b) {
    var v = i.get(b);
    v ? v.push.apply(v, g) : i.set(b, g);
  }
  if (n(t))
    s = null, o([r], t);
  else {
    var a = r ? r + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(g, b) {
        return o(["" + a + b], g), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(g, b) {
        var v = e(g, "" + a + b, n);
        return v.files.forEach(o), v.clone;
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
xi.ReactNativeFile = Bh;
xi.extractFiles = vw;
xi.isExtractableFile = xh;
var Cw = typeof self == "object" ? self.FormData : window.FormData, ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.defaultJsonSerializer = void 0;
ls.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Bw = St && St.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ha, "__esModule", { value: !0 });
var Rh = xi, xw = Bw(Cw), Rw = ls, Sw = function(e) {
  return Rh.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Nw(e, t, r, n) {
  n === void 0 && (n = Rw.defaultJsonSerializer);
  var s = Rh.extractFiles({ query: e, variables: t, operationName: r }, "", Sw), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return n.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var a = e.reduce(function(v, S, Q) {
      return v.push({ query: S, variables: t ? t[Q] : void 0 }), v;
    }, []);
    return n.stringify(a);
  }
  var u = typeof FormData > "u" ? xw.default : FormData, f = new u();
  f.append("operations", n.stringify(i));
  var g = {}, b = 0;
  return o.forEach(function(v) {
    g[++b] = v;
  }), f.append("map", n.stringify(g)), b = 0, o.forEach(function(v, S) {
    f.append("" + ++b, S);
  }), f;
}
Ha.default = Nw;
var Me = {};
Object.defineProperty(Me, "__esModule", { value: !0 });
Me.parseBatchRequestsExtendedArgs = Me.parseRawRequestExtendedArgs = Me.parseRequestExtendedArgs = Me.parseBatchRequestArgs = Me.parseRawRequestArgs = Me.parseRequestArgs = void 0;
function Tw(e, t, r) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Me.parseRequestArgs = Tw;
function Dw(e, t, r) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Me.parseRawRequestArgs = Dw;
function Qw(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Me.parseBatchRequestArgs = Qw;
function Fw(e, t, r, n) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Me.parseRequestExtendedArgs = Fw;
function Ow(e, t, r, n) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Me.parseRawRequestExtendedArgs = Ow;
function Mw(e, t, r) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: r,
    signal: void 0
  };
}
Me.parseBatchRequestsExtendedArgs = Mw;
var fs = {}, Lw = St && St.__extends || /* @__PURE__ */ function() {
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
var kw = (
  /** @class */
  function(e) {
    Lw(t, e);
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
fs.ClientError = kw;
var Pn = {}, Ad;
function Pw() {
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
    function k(q) {
      return q instanceof G ? q : new G(function(X) {
        X(q);
      });
    }
    return new (G || (G = Promise))(function(q, X) {
      function tt(_) {
        try {
          d(U.next(_));
        } catch (p) {
          X(p);
        }
      }
      function B(_) {
        try {
          d(U.throw(_));
        } catch (p) {
          X(p);
        }
      }
      function d(_) {
        _.done ? q(_.value) : k(_.value).then(tt, B);
      }
      d((U = U.apply(M, L || [])).next());
    });
  }, r = St && St.__generator || function(M, L) {
    var G = { label: 0, sent: function() {
      if (q[0] & 1) throw q[1];
      return q[1];
    }, trys: [], ops: [] }, U, k, q, X;
    return X = { next: tt(0), throw: tt(1), return: tt(2) }, typeof Symbol == "function" && (X[Symbol.iterator] = function() {
      return this;
    }), X;
    function tt(d) {
      return function(_) {
        return B([d, _]);
      };
    }
    function B(d) {
      if (U) throw new TypeError("Generator is already executing.");
      for (; G; ) try {
        if (U = 1, k && (q = d[0] & 2 ? k.return : d[0] ? k.throw || ((q = k.return) && q.call(k), 0) : k.next) && !(q = q.call(k, d[1])).done) return q;
        switch (k = 0, q && (d = [d[0] & 2, q.value]), d[0]) {
          case 0:
          case 1:
            q = d;
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
            if (q = G.trys, !(q = q.length > 0 && q[q.length - 1]) && (d[0] === 6 || d[0] === 2)) {
              G = 0;
              continue;
            }
            if (d[0] === 3 && (!q || d[1] > q[0] && d[1] < q[3])) {
              G.label = d[1];
              break;
            }
            if (d[0] === 6 && G.label < q[1]) {
              G.label = q[1], q = d;
              break;
            }
            if (q && G.label < q[2]) {
              G.label = q[2], G.ops.push(d);
              break;
            }
            q[2] && G.ops.pop(), G.trys.pop();
            continue;
        }
        d = L.call(M, G);
      } catch (_) {
        d = [6, _], k = 0;
      } finally {
        U = q = 0;
      }
      if (d[0] & 5) throw d[1];
      return { value: d[0] ? d[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Pn, "__esModule", { value: !0 }), Pn.GraphQLWebSocketClient = void 0;
  var n = fs, s = Sh(), i = "connection_init", o = "connection_ack", a = "ping", u = "pong", f = "subscribe", g = "next", b = "error", v = "complete", S = (
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
        var U = JSON.parse(L), k = U.type, q = U.payload, X = U.id;
        return new M(k, G(q), X);
      }, M;
    }()
  ), Q = (
    /** @class */
    function() {
      function M(L, G) {
        var U = this, k = G.onInit, q = G.onAcknowledged, X = G.onPing, tt = G.onPong;
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
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, q && q(d.payload));
                return;
              }
              case a: {
                X ? X(d.payload).then(function(E) {
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
              case b: {
                A.error && A.error(new n.ClientError({ errors: d.payload, status: 200 }, { query: p, variables: m }));
                return;
              }
              case v: {
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
        var q = this, X = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[X] = { query: L, variables: U, subscriber: k }, this.socket.send(z(X, { query: L, operationName: G, variables: U }).text), function() {
          q.socket.send(H(X).text), delete q.socketState.subscriptions[X];
        };
      }, M.prototype.rawRequest = function(L, G) {
        var U = this;
        return new Promise(function(k, q) {
          var X;
          U.rawSubscribe(L, {
            next: function(tt, B) {
              return X = { data: tt, extensions: B };
            },
            error: q,
            complete: function() {
              return k(X);
            }
          }, G);
        });
      }, M.prototype.request = function(L, G) {
        var U = this;
        return new Promise(function(k, q) {
          var X;
          U.subscribe(L, {
            next: function(tt) {
              return X = tt;
            },
            error: q,
            complete: function() {
              return k(X);
            }
          }, G);
        });
      }, M.prototype.subscribe = function(L, G, U) {
        var k = s.resolveRequestDocument(L), q = k.query, X = k.operationName;
        return this.makeSubscribe(q, X, U, G);
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
    return new S(v, void 0, M);
  }
  return Pn;
}
var gd;
function Sh() {
  return gd || (gd = 1, function(e) {
    var t = St && St.__assign || function() {
      return t = Object.assign || function(A) {
        for (var E, C = 1, w = arguments.length; C < w; C++) {
          E = arguments[C];
          for (var h in E) Object.prototype.hasOwnProperty.call(E, h) && (A[h] = E[h]);
        }
        return A;
      }, t.apply(this, arguments);
    }, r = St && St.__createBinding || (Object.create ? function(A, E, C, w) {
      w === void 0 && (w = C), Object.defineProperty(A, w, { enumerable: !0, get: function() {
        return E[C];
      } });
    } : function(A, E, C, w) {
      w === void 0 && (w = C), A[w] = E[C];
    }), n = St && St.__setModuleDefault || (Object.create ? function(A, E) {
      Object.defineProperty(A, "default", { enumerable: !0, value: E });
    } : function(A, E) {
      A.default = E;
    }), s = St && St.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var E = {};
      if (A != null) for (var C in A) C !== "default" && Object.prototype.hasOwnProperty.call(A, C) && r(E, A, C);
      return n(E, A), E;
    }, i = St && St.__awaiter || function(A, E, C, w) {
      function h(I) {
        return I instanceof C ? I : new C(function(J) {
          J(I);
        });
      }
      return new (C || (C = Promise))(function(I, J) {
        function W(it) {
          try {
            nt(w.next(it));
          } catch (ot) {
            J(ot);
          }
        }
        function et(it) {
          try {
            nt(w.throw(it));
          } catch (ot) {
            J(ot);
          }
        }
        function nt(it) {
          it.done ? I(it.value) : h(it.value).then(W, et);
        }
        nt((w = w.apply(A, E || [])).next());
      });
    }, o = St && St.__generator || function(A, E) {
      var C = { label: 0, sent: function() {
        if (I[0] & 1) throw I[1];
        return I[1];
      }, trys: [], ops: [] }, w, h, I, J;
      return J = { next: W(0), throw: W(1), return: W(2) }, typeof Symbol == "function" && (J[Symbol.iterator] = function() {
        return this;
      }), J;
      function W(nt) {
        return function(it) {
          return et([nt, it]);
        };
      }
      function et(nt) {
        if (w) throw new TypeError("Generator is already executing.");
        for (; C; ) try {
          if (w = 1, h && (I = nt[0] & 2 ? h.return : nt[0] ? h.throw || ((I = h.return) && I.call(h), 0) : h.next) && !(I = I.call(h, nt[1])).done) return I;
          switch (h = 0, I && (nt = [nt[0] & 2, I.value]), nt[0]) {
            case 0:
            case 1:
              I = nt;
              break;
            case 4:
              return C.label++, { value: nt[1], done: !1 };
            case 5:
              C.label++, h = nt[1], nt = [0];
              continue;
            case 7:
              nt = C.ops.pop(), C.trys.pop();
              continue;
            default:
              if (I = C.trys, !(I = I.length > 0 && I[I.length - 1]) && (nt[0] === 6 || nt[0] === 2)) {
                C = 0;
                continue;
              }
              if (nt[0] === 3 && (!I || nt[1] > I[0] && nt[1] < I[3])) {
                C.label = nt[1];
                break;
              }
              if (nt[0] === 6 && C.label < I[1]) {
                C.label = I[1], I = nt;
                break;
              }
              if (I && C.label < I[2]) {
                C.label = I[2], C.ops.push(nt);
                break;
              }
              I[2] && C.ops.pop(), C.trys.pop();
              continue;
          }
          nt = E.call(A, C);
        } catch (it) {
          nt = [6, it], h = 0;
        } finally {
          w = I = 0;
        }
        if (nt[0] & 5) throw nt[1];
        return { value: nt[0] ? nt[1] : void 0, done: !0 };
      }
    }, a = St && St.__rest || function(A, E) {
      var C = {};
      for (var w in A) Object.prototype.hasOwnProperty.call(A, w) && E.indexOf(w) < 0 && (C[w] = A[w]);
      if (A != null && typeof Object.getOwnPropertySymbols == "function")
        for (var h = 0, w = Object.getOwnPropertySymbols(A); h < w.length; h++)
          E.indexOf(w[h]) < 0 && Object.prototype.propertyIsEnumerable.call(A, w[h]) && (C[w[h]] = A[w[h]]);
      return C;
    }, u = St && St.__importDefault || function(A) {
      return A && A.__esModule ? A : { default: A };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(Rg), g = f, b = uw, v = bw, S = u(Ha), Q = ls, N = Me, T = fs;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return T.ClientError;
    } });
    var F = function(A) {
      var E = {};
      return A && (typeof Headers < "u" && A instanceof Headers || g && g.Headers && A instanceof g.Headers ? E = p(A) : Array.isArray(A) ? A.forEach(function(C) {
        var w = C[0], h = C[1];
        E[w] = h;
      }) : E = A), E;
    }, Y = function(A) {
      return A.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, z = function(A) {
      var E = A.query, C = A.variables, w = A.operationName, h = A.jsonSerializer;
      if (!Array.isArray(E)) {
        var I = ["query=" + encodeURIComponent(Y(E))];
        return C && I.push("variables=" + encodeURIComponent(h.stringify(C))), w && I.push("operationName=" + encodeURIComponent(w)), I.join("&");
      }
      if (typeof C < "u" && !Array.isArray(C))
        throw new Error("Cannot create query with given variable type, array expected");
      var J = E.reduce(function(W, et, nt) {
        return W.push({
          query: Y(et),
          variables: C ? h.stringify(C[nt]) : void 0
        }), W;
      }, []);
      return "query=" + encodeURIComponent(h.stringify(J));
    }, H = function(A) {
      var E = A.url, C = A.query, w = A.variables, h = A.operationName, I = A.headers, J = A.fetch, W = A.fetchOptions, et = A.middleware;
      return i(void 0, void 0, void 0, function() {
        var nt, it;
        return o(this, function(ot) {
          switch (ot.label) {
            case 0:
              return nt = S.default(C, w, h, W.jsonSerializer), it = t({ method: "POST", headers: t(t({}, typeof nt == "string" ? { "Content-Type": "application/json" } : {}), I), body: nt }, W), et ? [4, Promise.resolve(et(it))] : [3, 2];
            case 1:
              it = ot.sent(), ot.label = 2;
            case 2:
              return [4, J(E, it)];
            case 3:
              return [2, ot.sent()];
          }
        });
      });
    }, M = function(A) {
      var E = A.url, C = A.query, w = A.variables, h = A.operationName, I = A.headers, J = A.fetch, W = A.fetchOptions, et = A.middleware;
      return i(void 0, void 0, void 0, function() {
        var nt, it;
        return o(this, function(ot) {
          switch (ot.label) {
            case 0:
              return nt = z({
                query: C,
                variables: w,
                operationName: h,
                jsonSerializer: W.jsonSerializer
              }), it = t({ method: "GET", headers: I }, W), et ? [4, Promise.resolve(et(it))] : [3, 2];
            case 1:
              it = ot.sent(), ot.label = 2;
            case 2:
              return [4, J(E + "?" + nt, it)];
            case 3:
              return [2, ot.sent()];
          }
        });
      });
    }, L = (
      /** @class */
      function() {
        function A(E, C) {
          C === void 0 && (C = {}), this.url = E, this.options = C;
        }
        return A.prototype.rawRequest = function(E, C, w) {
          return i(this, void 0, void 0, function() {
            var h, I, J, W, et, nt, it, ot, Mt, ht, dt, Dt;
            return o(this, function(At) {
              return h = N.parseRawRequestArgs(E, C, w), I = this.options, J = I.headers, W = I.fetch, et = W === void 0 ? f.default : W, nt = I.method, it = nt === void 0 ? "POST" : nt, ot = I.requestMiddleware, Mt = I.responseMiddleware, ht = a(I, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), dt = this.url, h.signal !== void 0 && (ht.signal = h.signal), Dt = B(h.query).operationName, [2, G({
                url: dt,
                query: h.query,
                variables: h.variables,
                headers: t(t({}, F(d(J))), F(h.requestHeaders)),
                operationName: Dt,
                fetch: et,
                method: it,
                fetchOptions: ht,
                middleware: ot
              }).then(function(yt) {
                return Mt && Mt(yt), yt;
              }).catch(function(yt) {
                throw Mt && Mt(yt), yt;
              })];
            });
          });
        }, A.prototype.request = function(E) {
          for (var C = [], w = 1; w < arguments.length; w++)
            C[w - 1] = arguments[w];
          var h = C[0], I = C[1], J = N.parseRequestArgs(E, h, I), W = this.options, et = W.headers, nt = W.fetch, it = nt === void 0 ? f.default : nt, ot = W.method, Mt = ot === void 0 ? "POST" : ot, ht = W.requestMiddleware, dt = W.responseMiddleware, Dt = a(W, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), At = this.url;
          J.signal !== void 0 && (Dt.signal = J.signal);
          var yt = B(J.document), Ur = yt.query, Lt = yt.operationName;
          return G({
            url: At,
            query: Ur,
            variables: J.variables,
            headers: t(t({}, F(d(et))), F(J.requestHeaders)),
            operationName: Lt,
            fetch: it,
            method: Mt,
            fetchOptions: Dt,
            middleware: ht
          }).then(function(Rt) {
            return dt && dt(Rt), Rt.data;
          }).catch(function(Rt) {
            throw dt && dt(Rt), Rt;
          });
        }, A.prototype.batchRequests = function(E, C) {
          var w = N.parseBatchRequestArgs(E, C), h = this.options, I = h.headers, J = h.fetch, W = J === void 0 ? f.default : J, et = h.method, nt = et === void 0 ? "POST" : et, it = h.requestMiddleware, ot = h.responseMiddleware, Mt = a(h, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ht = this.url;
          w.signal !== void 0 && (Mt.signal = w.signal);
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
            headers: t(t({}, F(d(I))), F(w.requestHeaders)),
            operationName: void 0,
            fetch: W,
            method: nt,
            fetchOptions: Mt,
            middleware: it
          }).then(function(At) {
            return ot && ot(At), At.data;
          }).catch(function(At) {
            throw ot && ot(At), At;
          });
        }, A.prototype.setHeaders = function(E) {
          return this.options.headers = E, this;
        }, A.prototype.setHeader = function(E, C) {
          var w, h = this.options.headers;
          return h ? h[E] = C : this.options.headers = (w = {}, w[E] = C, w), this;
        }, A.prototype.setEndpoint = function(E) {
          return this.url = E, this;
        }, A;
      }()
    );
    e.GraphQLClient = L;
    function G(A) {
      var E = A.url, C = A.query, w = A.variables, h = A.headers, I = A.operationName, J = A.fetch, W = A.method, et = W === void 0 ? "POST" : W, nt = A.fetchOptions, it = A.middleware;
      return i(this, void 0, void 0, function() {
        var ot, Mt, ht, dt, Dt, At, yt, Ur, Lt, Rt, On;
        return o(this, function(Ut) {
          switch (Ut.label) {
            case 0:
              return ot = et.toUpperCase() === "POST" ? H : M, Mt = Array.isArray(C), [4, ot({
                url: E,
                query: C,
                variables: w,
                operationName: I,
                headers: h,
                fetch: J,
                fetchOptions: nt,
                middleware: it
              })];
            case 1:
              return ht = Ut.sent(), [4, X(ht, nt.jsonSerializer)];
            case 2:
              if (dt = Ut.sent(), Dt = Mt && Array.isArray(dt) ? !dt.some(function(zt) {
                var ys = zt.data;
                return !ys;
              }) : !!dt.data, At = !dt.errors || nt.errorPolicy === "all" || nt.errorPolicy === "ignore", ht.ok && At && Dt)
                return yt = ht.headers, Ur = ht.status, dt.errors, Lt = a(dt, ["errors"]), Rt = nt.errorPolicy === "ignore" ? Lt : dt, [2, t(t({}, Mt ? { data: Rt } : Rt), { headers: yt, status: Ur })];
              throw On = typeof dt == "string" ? { error: dt } : dt, new T.ClientError(t(t({}, On), { status: ht.status, headers: ht.headers }), { query: C, variables: w });
          }
        });
      });
    }
    function U(A, E, C, w) {
      return i(this, void 0, void 0, function() {
        var h, I;
        return o(this, function(J) {
          return h = N.parseRawRequestExtendedArgs(A, E, C, w), I = new L(h.url), [2, I.rawRequest(t({}, h))];
        });
      });
    }
    e.rawRequest = U;
    function k(A, E) {
      for (var C = [], w = 2; w < arguments.length; w++)
        C[w - 2] = arguments[w];
      return i(this, void 0, void 0, function() {
        var h, I, J, W;
        return o(this, function(et) {
          return h = C[0], I = C[1], J = N.parseRequestExtendedArgs(A, E, h, I), W = new L(J.url), [2, W.request(t({}, J))];
        });
      });
    }
    e.request = k;
    function q(A, E, C) {
      return i(this, void 0, void 0, function() {
        var w, h;
        return o(this, function(I) {
          return w = N.parseBatchRequestsExtendedArgs(A, E, C), h = new L(w.url), [2, h.batchRequests(t({}, w))];
        });
      });
    }
    e.batchRequests = q, e.default = k;
    function X(A, E) {
      return E === void 0 && (E = Q.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var C, w, h;
        return o(this, function(I) {
          switch (I.label) {
            case 0:
              return A.headers.forEach(function(J, W) {
                W.toLowerCase() === "content-type" && (C = J);
              }), C && C.toLowerCase().startsWith("application/json") ? (h = (w = E).parse, [4, A.text()]) : [3, 2];
            case 1:
              return [2, h.apply(w, [I.sent()])];
            case 2:
              return [2, A.text()];
          }
        });
      });
    }
    function tt(A) {
      var E, C = void 0, w = A.definitions.filter(function(h) {
        return h.kind === "OperationDefinition";
      });
      return w.length === 1 && (C = (E = w[0].name) === null || E === void 0 ? void 0 : E.value), C;
    }
    function B(A) {
      if (typeof A == "string") {
        var E = void 0;
        try {
          var C = b.parse(A);
          E = tt(C);
        } catch {
        }
        return { query: A, operationName: E };
      }
      var w = tt(A);
      return { query: v.print(A), operationName: w };
    }
    e.resolveRequestDocument = B;
    function d(A) {
      return typeof A == "function" ? A() : A;
    }
    function _(A) {
      for (var E = [], C = 1; C < arguments.length; C++)
        E[C - 1] = arguments[C];
      return A.reduce(function(w, h, I) {
        return "" + w + h + (I in E ? E[I] : "");
      }, "");
    }
    e.gql = _;
    function p(A) {
      var E = {};
      return A.forEach(function(C, w) {
        E[w] = C;
      }), E;
    }
    var m = Pw();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(co)), co;
}
var Uw = Sh(), ti = function() {
  return ti = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, ti.apply(this, arguments);
};
var Ps = /* @__PURE__ */ new Map(), jo = /* @__PURE__ */ new Map(), Nh = !0, ei = !1;
function Th(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Gw(e) {
  return Th(e.source.body.substring(e.start, e.end));
}
function zw(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = Gw(n.loc), o = jo.get(s);
      o && !o.has(i) ? Nh && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || jo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), ti(ti({}, e), { definitions: r });
}
function Vw(e) {
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
function Yw(e) {
  var t = Th(e);
  if (!Ps.has(t)) {
    var r = Eh(e, {
      experimentalFragmentVariables: ei,
      allowLegacyFragmentVariables: ei
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ps.set(t, Vw(zw(r)));
  }
  return Ps.get(t);
}
function st(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), Yw(n);
}
function Hw() {
  Ps.clear(), jo.clear();
}
function Zw() {
  Nh = !1;
}
function Xw() {
  ei = !0;
}
function Ww() {
  ei = !1;
}
var Un = {
  gql: st,
  resetCaches: Hw,
  disableFragmentWarnings: Zw,
  enableExperimentalFragmentVariables: Xw,
  disableExperimentalFragmentVariables: Ww
};
(function(e) {
  e.gql = Un.gql, e.resetCaches = Un.resetCaches, e.disableFragmentWarnings = Un.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Un.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Un.disableExperimentalFragmentVariables;
})(st || (st = {}));
st.default = st;
var Qt = "0x0000000000000000000000000000000000000000000000000000000000000000", WC = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", jC = 16 * 1024, JC = 16, qC = 1024 * 1024 * 1024, $C = 1024 * 1024 * 1024, KC = 255, tB = 1024 * 1024, eB = 1024 * 1024, jw = "0xffffffffffff0000", Dh = "0xffffffffffff0001", Jw = "0xffffffffffff0003", qw = "0xffffffffffff0004", $w = "0xffffffffffff0005", rB = "0x0", Kw = [
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
], tm = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const Qh = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Qh.decode();
let Hn = null;
function Fh() {
  return (Hn === null || Hn.byteLength === 0) && (Hn = new Uint8Array(c.memory.buffer)), Hn;
}
function em(e, t) {
  return e = e >>> 0, Qh.decode(Fh().subarray(e, e + t));
}
function y(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
function rm(e, t) {
  const r = c.gm_args(e, t);
  return V.__wrap(r);
}
function nm(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return V.__wrap(n);
}
function sm(e, t, r, n) {
  y(n, kr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return V.__wrap(i);
}
function im(e, t, r, n) {
  y(n, kr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return V.__wrap(i);
}
function om(e, t, r, n) {
  y(n, As);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return V.__wrap(i);
}
function am(e, t, r, n) {
  y(n, As);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return V.__wrap(i);
}
function cm(e, t, r, n) {
  y(n, gs);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return V.__wrap(i);
}
function dm(e, t, r, n) {
  y(n, gs);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return V.__wrap(i);
}
function um(e, t, r, n) {
  y(n, ps);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return V.__wrap(i);
}
function _m(e, t, r, n) {
  y(n, ps);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return V.__wrap(i);
}
function hm(e, t, r) {
  const n = c.add(e, t, r);
  return V.__wrap(n);
}
function lm(e, t, r) {
  const n = c.and(e, t, r);
  return V.__wrap(n);
}
function fm(e, t, r) {
  const n = c.div(e, t, r);
  return V.__wrap(n);
}
function pm(e, t, r) {
  const n = c.eq(e, t, r);
  return V.__wrap(n);
}
function Am(e, t, r) {
  const n = c.exp(e, t, r);
  return V.__wrap(n);
}
function gm(e, t, r) {
  const n = c.gt(e, t, r);
  return V.__wrap(n);
}
function wm(e, t, r) {
  const n = c.lt(e, t, r);
  return V.__wrap(n);
}
function mm(e, t, r) {
  const n = c.mlog(e, t, r);
  return V.__wrap(n);
}
function ym(e, t, r) {
  const n = c.mroo(e, t, r);
  return V.__wrap(n);
}
function bm(e, t, r) {
  const n = c.mod_(e, t, r);
  return V.__wrap(n);
}
function Wr(e, t) {
  const r = c.move_(e, t);
  return V.__wrap(r);
}
function Im(e, t, r) {
  const n = c.mul(e, t, r);
  return V.__wrap(n);
}
function Em(e, t) {
  const r = c.not(e, t);
  return V.__wrap(r);
}
function vm(e, t, r) {
  const n = c.or(e, t, r);
  return V.__wrap(n);
}
function Cm(e, t, r) {
  const n = c.sll(e, t, r);
  return V.__wrap(n);
}
function Bm(e, t, r) {
  const n = c.srl(e, t, r);
  return V.__wrap(n);
}
function ri(e, t, r) {
  const n = c.sub(e, t, r);
  return V.__wrap(n);
}
function xm(e, t, r) {
  const n = c.xor(e, t, r);
  return V.__wrap(n);
}
function Rm(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return V.__wrap(s);
}
function Za(e) {
  const t = c.ret(e);
  return V.__wrap(t);
}
function Sm(e, t) {
  const r = c.retd(e, t);
  return V.__wrap(r);
}
function Nm(e) {
  const t = c.aloc(e);
  return V.__wrap(t);
}
function Tm(e, t) {
  const r = c.mcl(e, t);
  return V.__wrap(r);
}
function Dm(e, t, r) {
  const n = c.mcp(e, t, r);
  return V.__wrap(n);
}
function Qm(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return V.__wrap(s);
}
function Fm(e, t) {
  const r = c.bhsh(e, t);
  return V.__wrap(r);
}
function Om(e) {
  const t = c.bhei(e);
  return V.__wrap(t);
}
function Mm(e, t) {
  const r = c.burn(e, t);
  return V.__wrap(r);
}
function Jo(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return V.__wrap(s);
}
function Lm(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return V.__wrap(s);
}
function km(e, t) {
  const r = c.croo(e, t);
  return V.__wrap(r);
}
function Pm(e, t) {
  const r = c.csiz(e, t);
  return V.__wrap(r);
}
function Um(e) {
  const t = c.cb(e);
  return V.__wrap(t);
}
function Wn(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return V.__wrap(s);
}
function Gm(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return V.__wrap(s);
}
function zm(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return V.__wrap(s);
}
function Vm(e, t) {
  const r = c.mint(e, t);
  return V.__wrap(r);
}
function Ym(e) {
  const t = c.rvrt(e);
  return V.__wrap(t);
}
function Hm(e, t, r) {
  const n = c.scwq(e, t, r);
  return V.__wrap(n);
}
function Zm(e, t, r) {
  const n = c.srw(e, t, r);
  return V.__wrap(n);
}
function Xm(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return V.__wrap(s);
}
function Wm(e, t, r) {
  const n = c.sww(e, t, r);
  return V.__wrap(n);
}
function jm(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return V.__wrap(s);
}
function Oh(e, t, r) {
  const n = c.tr(e, t, r);
  return V.__wrap(n);
}
function Jm(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return V.__wrap(s);
}
function qm(e, t, r) {
  const n = c.eck1(e, t, r);
  return V.__wrap(n);
}
function $m(e, t, r) {
  const n = c.ecr1(e, t, r);
  return V.__wrap(n);
}
function Km(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return V.__wrap(s);
}
function ty(e, t, r) {
  const n = c.k256(e, t, r);
  return V.__wrap(n);
}
function ey(e, t, r) {
  const n = c.s256(e, t, r);
  return V.__wrap(n);
}
function ry(e, t) {
  const r = c.time(e, t);
  return V.__wrap(r);
}
function ny() {
  const e = c.noop();
  return V.__wrap(e);
}
function sy(e) {
  const t = c.flag(e);
  return V.__wrap(t);
}
function iy(e, t, r) {
  const n = c.bal(e, t, r);
  return V.__wrap(n);
}
function ni(e) {
  const t = c.jmp(e);
  return V.__wrap(t);
}
function oy(e, t, r) {
  const n = c.jne(e, t, r);
  return V.__wrap(n);
}
function ay(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return V.__wrap(s);
}
function fr(e, t, r) {
  const n = c.addi(e, t, r);
  return V.__wrap(n);
}
function cy(e, t, r) {
  const n = c.andi(e, t, r);
  return V.__wrap(n);
}
function si(e, t, r) {
  const n = c.divi(e, t, r);
  return V.__wrap(n);
}
function dy(e, t, r) {
  const n = c.expi(e, t, r);
  return V.__wrap(n);
}
function uy(e, t, r) {
  const n = c.modi(e, t, r);
  return V.__wrap(n);
}
function _y(e, t, r) {
  const n = c.muli(e, t, r);
  return V.__wrap(n);
}
function hy(e, t, r) {
  const n = c.ori(e, t, r);
  return V.__wrap(n);
}
function ly(e, t, r) {
  const n = c.slli(e, t, r);
  return V.__wrap(n);
}
function fy(e, t, r) {
  const n = c.srli(e, t, r);
  return V.__wrap(n);
}
function Mh(e, t, r) {
  const n = c.subi(e, t, r);
  return V.__wrap(n);
}
function py(e, t, r) {
  const n = c.xori(e, t, r);
  return V.__wrap(n);
}
function Ay(e, t, r) {
  const n = c.jnei(e, t, r);
  return V.__wrap(n);
}
function gy(e, t, r) {
  const n = c.lb(e, t, r);
  return V.__wrap(n);
}
function ts(e, t, r) {
  const n = c.lw(e, t, r);
  return V.__wrap(n);
}
function wy(e, t, r) {
  const n = c.sb(e, t, r);
  return V.__wrap(n);
}
function my(e, t, r) {
  const n = c.sw(e, t, r);
  return V.__wrap(n);
}
function yy(e, t, r) {
  const n = c.mcpi(e, t, r);
  return V.__wrap(n);
}
function Lh(e, t, r) {
  const n = c.gtf(e, t, r);
  return V.__wrap(n);
}
function by(e, t) {
  const r = c.mcli(e, t);
  return V.__wrap(r);
}
function Iy(e, t) {
  const r = c.gm(e, t);
  return V.__wrap(r);
}
function ln(e, t) {
  const r = c.movi(e, t);
  return V.__wrap(r);
}
function Ey(e, t) {
  const r = c.jnzi(e, t);
  return V.__wrap(r);
}
function vy(e, t) {
  const r = c.jmpf(e, t);
  return V.__wrap(r);
}
function Cy(e, t) {
  const r = c.jmpb(e, t);
  return V.__wrap(r);
}
function By(e, t, r) {
  const n = c.jnzf(e, t, r);
  return V.__wrap(n);
}
function kh(e, t, r) {
  const n = c.jnzb(e, t, r);
  return V.__wrap(n);
}
function xy(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return V.__wrap(s);
}
function Ry(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return V.__wrap(s);
}
function Sy(e) {
  const t = c.ji(e);
  return V.__wrap(t);
}
function Ny(e) {
  const t = c.cfei(e);
  return V.__wrap(t);
}
function Ty(e) {
  const t = c.cfsi(e);
  return V.__wrap(t);
}
function Dy(e) {
  const t = c.cfe(e);
  return V.__wrap(t);
}
function Qy(e) {
  const t = c.cfs(e);
  return V.__wrap(t);
}
function Fy(e) {
  const t = c.pshl(e);
  return V.__wrap(t);
}
function Oy(e) {
  const t = c.pshh(e);
  return V.__wrap(t);
}
function My(e) {
  const t = c.popl(e);
  return V.__wrap(t);
}
function Ly(e) {
  const t = c.poph(e);
  return V.__wrap(t);
}
function ky(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return V.__wrap(s);
}
function Py(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return V.__wrap(s);
}
function Uy(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return V.__wrap(s);
}
function Gy(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return V.__wrap(s);
}
function zy(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return V.__wrap(s);
}
function Vy(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return V.__wrap(s);
}
function Yy(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return V.__wrap(s);
}
function Hy(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return V.__wrap(s);
}
function Zy(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return V.__wrap(s);
}
function Xy(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return V.__wrap(s);
}
function Wy(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return V.__wrap(s);
}
function jy(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return V.__wrap(s);
}
function Jy(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return V.__wrap(s);
}
function qy(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return V.__wrap(s);
}
function $y(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return V.__wrap(s);
}
function ii(e, t) {
  const r = c.bsiz(e, t);
  return V.__wrap(r);
}
function Ky(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return V.__wrap(s);
}
let Vr = null;
function wd() {
  return (Vr === null || Vr.buffer.detached === !0 || Vr.buffer.detached === void 0 && Vr.buffer !== c.memory.buffer) && (Vr = new DataView(c.memory.buffer)), Vr;
}
function tb(e, t) {
  return e = e >>> 0, Fh().subarray(e / 1, e / 1 + t);
}
const eb = Object.freeze({
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
}), rb = Object.freeze({
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
}), Ph = Object.freeze({
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
}), nb = Object.freeze({
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
}), sb = Object.freeze({
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
class ib {
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
class ob {
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
class ab {
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
class cb {
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
class db {
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
class ub {
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
class _b {
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
class hb {
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
class lb {
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
class fb {
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
class pb {
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
class Ab {
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
class gb {
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
class wb {
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
class mb {
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
class yb {
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
class bb {
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
class Ib {
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
class Eb {
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
class vb {
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
class kr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(kr.prototype);
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
    return n === 0 ? void 0 : kr.__wrap(n);
  }
}
const Ud = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0, 1));
class Cb {
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
class Bb {
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
const xb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0, 1));
class ps {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xb.unregister(this), t;
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
class Rb {
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
class Sb {
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
class Nb {
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
class Tb {
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
const Zd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0, 1));
class Db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zd.unregister(this), t;
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
const Xd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0, 1));
class Qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xd.unregister(this), t;
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
const Wd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0, 1));
class Fb {
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
class Ob {
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
const _o = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0, 1));
class oi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(oi.prototype);
    return r.__wbg_ptr = t, _o.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _o.unregister(this), t;
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
    return this.__wbg_ptr = i >>> 0, _o.register(this, this.__wbg_ptr, this), this;
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
const Jd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0, 1));
class Mb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jd.unregister(this), t;
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
    return this.__wbg_ptr = a >>> 0, Jd.register(this, this.__wbg_ptr, this), this;
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
const ho = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0, 1));
class ai {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ai.prototype);
    return r.__wbg_ptr = t, ho.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ho.unregister(this), t;
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
    return this.__wbg_ptr = a >>> 0, ho.register(this, this.__wbg_ptr, this), this;
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
const qd = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0, 1));
class Ft {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ft.prototype);
    return r.__wbg_ptr = t, qd.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qd.unregister(this), t;
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
      var t = wd().getInt32(s + 4 * 0, !0), r = wd().getInt32(s + 4 * 1, !0), n = tb(t, r).slice();
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
class Lb {
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
class kb {
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
class Pb {
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
class Ub {
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
class Gb {
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
class zb {
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
class Vb {
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
class Yb {
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
class Hb {
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
class Zb {
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
class Wb {
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
class jb {
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
class Jb {
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
class $b {
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
class Kb {
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
class tI {
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
class eI {
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
class rI {
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
class nI {
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
class sI {
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
class iI {
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
class oI {
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
class aI {
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
class cI {
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
class dI {
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
class uI {
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
class _I {
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
class hI {
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
class lI {
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
class fI {
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
class pI {
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
const AI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0, 1));
class As {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, AI.unregister(this), t;
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
const gI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0, 1));
class gs {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gI.unregister(this), t;
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
class wI {
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
class mI {
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
class yI {
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
class bI {
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
class II {
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
class EI {
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
class vI {
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
class CI {
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
class BI {
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
class xI {
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
class RI {
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
const Zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0, 1));
class SI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zu.unregister(this), t;
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
    return this.__wbg_ptr = n >>> 0, Zu.register(this, this.__wbg_ptr, this), this;
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
const lo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0, 1));
class l {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(l.prototype);
    return r.__wbg_ptr = t, lo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lo.unregister(this), t;
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
    return this.__wbg_ptr = r >>> 0, lo.register(this, this.__wbg_ptr, this), this;
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
const Xu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0, 1));
class NI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xu.unregister(this), t;
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
    return this.__wbg_ptr = a >>> 0, Xu.register(this, this.__wbg_ptr, this), this;
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
class TI {
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
class DI {
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
const Ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0, 1));
class QI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ju.unregister(this), t;
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
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0, 1));
class FI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qu.unregister(this), t;
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
class OI {
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
class MI {
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
class LI {
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
class kI {
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
class PI {
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
class UI {
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
class GI {
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
class zI {
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
class VI {
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
class YI {
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
class HI {
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
class ZI {
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
class WI {
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
const fo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0, 1));
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
    y(s, kr);
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
const po = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0, 1));
class di {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(di.prototype);
    return r.__wbg_ptr = t, po.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, po.unregister(this), t;
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
const h0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0, 1));
class jI {
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
const Ao = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0, 1));
class ui {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ui.prototype);
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
const l0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0, 1));
class JI {
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
const go = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0, 1));
class _i {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(_i.prototype);
    return r.__wbg_ptr = t, go.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, go.unregister(this), t;
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
const wo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0, 1));
class hi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(hi.prototype);
    return r.__wbg_ptr = t, wo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wo.unregister(this), t;
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
    y(s, kr);
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
const mo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0, 1));
class li {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(li.prototype);
    return r.__wbg_ptr = t, mo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mo.unregister(this), t;
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
const p0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0, 1));
class $I {
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
const yo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0, 1));
class fi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(fi.prototype);
    return r.__wbg_ptr = t, yo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yo.unregister(this), t;
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
const A0 = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0, 1));
class KI {
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
const bo = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0, 1));
class pi {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(pi.prototype);
    return r.__wbg_ptr = t, bo.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bo.unregister(this), t;
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
    return this.__wbg_ptr = f >>> 0, bo.register(this, this.__wbg_ptr, this), this;
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
class t1 {
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
class e1 {
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
async function r1(e, t) {
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
function Uh() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(em(t, r));
  }, e;
}
function Gh(e, t) {
  return c = e.exports, zh.__wbindgen_wasm_module = t, Vr = null, Hn = null, c;
}
function n1(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module: e } = e : console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
  const t = Uh();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return Gh(r, e);
}
async function zh(e) {
  if (c !== void 0) return c;
  typeof e < "u" && Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead");
  const t = Uh(), { instance: r, module: n } = await r1(await e, t);
  return Gh(r, n);
}
function s1(e, t, r, n) {
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
function i1(e) {
  return s1(1, null, "AGFzbQEAAAABOgpgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAABf2AFf39/f38Bf2ABfwBgA39/fwBgAAACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cAAwP/Af0BAQEDAwMDAwMBAQMDAQEBAwMBAQEEAQMDAwEBAwEBAQQCAQMCAgICAgIDAwMEBAQEBAQEBAEBAQMDAAICBAQEBAQEBAQEBAABAQgDAwQBAQEBAQEBAgcDAQAAAQEDBwcBAwEDAgIBAQEAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQUBAQEBBAAEAQYCAgMDAAIABwEIBAEEAQkDAQEHAQUFBQUFBQUFBQUFBQUFBQUFBQUDBgYCAgQCBgYAAAgABAUDAQARBgkBfwFBgIDAAAsHjUzPBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlABAaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUASBpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQA4Il9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMASSJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAEsSY29tcGFyZWFyZ3NfdG9faW1tAFgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AHxVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AASBVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAORJfX3diZ19tdWxhcmdzX2ZyZWUAER5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMASB5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMATBJfX3diZ19kaXZhcmdzX2ZyZWUAIx5fX3diZ19nZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAuQEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAGMbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlABchcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AE0XcGFuaWNpbnN0cnVjdGlvbl9yZWFzb24AWxxwYW5pY2luc3RydWN0aW9uX2luc3RydWN0aW9uAFwMZ21fZnJvbV9hcmdzANUBDWd0Zl9mcm9tX2FyZ3MAzQEHZ21fYXJncwCIAQhndGZfYXJncwBpDndkY21fZnJvbV9hcmdzADsOd2RvcF9mcm9tX2FyZ3MAOw53ZG1sX2Zyb21fYXJncwA8DndkZHZfZnJvbV9hcmdzAMkBCXdkY21fYXJncwAkCXdxY21fYXJncwAlCXdkb3BfYXJncwAmCXdxb3BfYXJncwAnCXdkbWxfYXJncwAoCXdxbWxfYXJncwApCXdkZHZfYXJncwBkCXdxZHZfYXJncwBlEF9fd2JnX2ltbTA2X2ZyZWUAKhBfX3diZ19pbW0xMl9mcmVlACsQX193YmdfaW1tMThfZnJlZQAsDl9fd2JnX2FkZF9mcmVlABgPX193Ymdfbm9vcF9mcmVlAAcSYWRkX25ld190eXBlc2NyaXB0AFkGYWRkX3JhADUGYWRkX3JiABIGYWRkX3JjABoDYWRkAMUBA2FuZACKAQNkaXYAiwECZXEAjAEDZXhwAI0BAmd0AI4BAmx0AI8BBG1sb2cAkAEEbXJvbwCRAQRtb2RfAJIBBW1vdmVfAD0DbXVsAJMBA25vdAA+Am9yAJQBA3NsbACVAQNzcmwAlgEDc3ViAJcBA3hvcgCYAQRtbGR2AGoDcmV0ALoBBHJldGQAPxNhbG9jX25ld190eXBlc2NyaXB0AGAHYWxvY19yYQAiBGFsb2MAuwEDbWNsAEADbWNwAJkBA21lcQBrE2Joc2hfbmV3X3R5cGVzY3JpcHQAIARiaHNoAC0EYmhlaQC8AQRidXJuAEEEY2FsbABsA2NjcABtBGNyb28AQgRjc2l6AEMCY2IAvQEDbGRjAG4DbG9nAG8EbG9nZABwBG1pbnQARARydnJ0AL4BBHNjd3EAmgEDc3J3AJsBBHNyd3EAcQNzd3cAnAEEc3d3cQByAnRyAJ0BA3RybwBzBGVjazEAngEEZWNyMQCfAQRlZDE5AHQEazI1NgCgAQRzMjU2AKEBBHRpbWUARRNub29wX25ld190eXBlc2NyaXB0AL8BBG5vb3AA3QEEZmxhZwDAAQNiYWwAogEDam1wAMEBA2puZQCjAQNzbW8AdRNhZGRpX25ld190eXBlc2NyaXB0AFoKYWRkaV9pbW0xMgAJBGFkZGkApAEEYW5kaQClAQRkaXZpAKYBBGV4cGkApwEEbW9kaQCoAQRtdWxpAKkBA29yaQCqAQRzbGxpAKsBBHNybGkArAEEc3ViaQCtAQR4b3JpAK4BBGpuZWkArwECbGIAsAECbHcAsQECc2IAsgECc3cAswEEbWNwaQC0ARJndGZfbmV3X3R5cGVzY3JpcHQAzwEDZ3RmALUBBG1jbGkALhFnbV9uZXdfdHlwZXNjcmlwdABGCGdtX2ltbTE4AA0CZ20ALwRtb3ZpADAEam56aQAxBGptcGYAMhNqbXBiX25ld190eXBlc2NyaXB0ABUEam1wYgAzBGpuemYAtgEEam56YgC3AQRqbmVmAHYKam5lYl9pbW0wNgA2BGpuZWIAdwJqaQBOE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0AAoEY2ZlaQBPBGNmc2kAUANjZmUAwgEDY2ZzAMMBBHBzaGwAUQRwc2hoAFIEcG9wbABTBHBvcGgAVBN3ZGNtX25ld190eXBlc2NyaXB0AMoBBHdkY20AeAR3cWNtAHkEd2RvcAB6BHdxb3AAewR3ZG1sAHwEd3FtbAB9BHdkZHYAfgR3cWR2AH8Ed2RtZACAAQR3cW1kAIEBBHdkYW0AggEEd3FhbQCDAQR3ZG1tAIQBBHdxbW0AhQEEZWNhbACGAQRic2l6ADQTYmxkZF9uZXdfdHlwZXNjcmlwdABVB2JsZGRfcmQANgRibGRkAIcBFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADBRpbnN0cnVjdGlvbl90b19ieXRlcwAGEGluc3RydWN0aW9uX3NpemUA7wERcmVnaWRfbmV3X2NoZWNrZWQAuAEJcmVnaWRfYmFsAN4BCnJlZ2lkX2NnYXMA3wEJcmVnaWRfZXJyAOABCnJlZ2lkX2ZsYWcA4QEIcmVnaWRfZnAA4gEKcmVnaWRfZ2dhcwDjAQhyZWdpZF9ocADkAQhyZWdpZF9pcwDlAQhyZWdpZF9vZgDmAQlyZWdpZF9vbmUA5wEIcmVnaWRfcGMA6AEJcmVnaWRfcmV0AOkBCnJlZ2lkX3JldGwA6gEIcmVnaWRfc3AA6wEJcmVnaWRfc3BwAOwBDnJlZ2lkX3dyaXRhYmxlAO0BCnJlZ2lkX3plcm8A7gEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA2QELcmVnaWRfdG9fdTgA2gESYW5kX25ld190eXBlc2NyaXB0AFkSZGl2X25ld190eXBlc2NyaXB0AFkRZXFfbmV3X3R5cGVzY3JpcHQAWRJleHBfbmV3X3R5cGVzY3JpcHQAWRFndF9uZXdfdHlwZXNjcmlwdABZEWx0X25ld190eXBlc2NyaXB0AFkTbWxvZ19uZXdfdHlwZXNjcmlwdABZE21yb29fbmV3X3R5cGVzY3JpcHQAWRJtb2RfbmV3X3R5cGVzY3JpcHQAWRJtdWxfbmV3X3R5cGVzY3JpcHQAWRFvcl9uZXdfdHlwZXNjcmlwdABZEnNsbF9uZXdfdHlwZXNjcmlwdABZEnNybF9uZXdfdHlwZXNjcmlwdABZEnN1Yl9uZXdfdHlwZXNjcmlwdABZEnhvcl9uZXdfdHlwZXNjcmlwdABZEm1jcF9uZXdfdHlwZXNjcmlwdABZE3Njd3FfbmV3X3R5cGVzY3JpcHQAWRJzcndfbmV3X3R5cGVzY3JpcHQAWRJzd3dfbmV3X3R5cGVzY3JpcHQAWRF0cl9uZXdfdHlwZXNjcmlwdABZE2VjazFfbmV3X3R5cGVzY3JpcHQAWRNlY3IxX25ld190eXBlc2NyaXB0AFkTazI1Nl9uZXdfdHlwZXNjcmlwdABZE3MyNTZfbmV3X3R5cGVzY3JpcHQAWRJiYWxfbmV3X3R5cGVzY3JpcHQAWRJqbmVfbmV3X3R5cGVzY3JpcHQAWRNhbmRpX25ld190eXBlc2NyaXB0AFoTZGl2aV9uZXdfdHlwZXNjcmlwdABaE2V4cGlfbmV3X3R5cGVzY3JpcHQAWhNtb2RpX25ld190eXBlc2NyaXB0AFoTbXVsaV9uZXdfdHlwZXNjcmlwdABaEm9yaV9uZXdfdHlwZXNjcmlwdABaE3NsbGlfbmV3X3R5cGVzY3JpcHQAWhNzcmxpX25ld190eXBlc2NyaXB0AFoTc3ViaV9uZXdfdHlwZXNjcmlwdABaE3hvcmlfbmV3X3R5cGVzY3JpcHQAWhNqbmVpX25ld190eXBlc2NyaXB0AFoRbGJfbmV3X3R5cGVzY3JpcHQAWhFsd19uZXdfdHlwZXNjcmlwdABaEXNiX25ld190eXBlc2NyaXB0AFoRc3dfbmV3X3R5cGVzY3JpcHQAWhNtY3BpX25ld190eXBlc2NyaXB0AFoTam56Zl9uZXdfdHlwZXNjcmlwdABaE2puemJfbmV3X3R5cGVzY3JpcHQAWhFqaV9uZXdfdHlwZXNjcmlwdAA3E2Nmc2lfbmV3X3R5cGVzY3JpcHQANxNwc2hsX25ld190eXBlc2NyaXB0ADcTcHNoaF9uZXdfdHlwZXNjcmlwdAA3E3BvcGxfbmV3X3R5cGVzY3JpcHQANxNwb3BoX25ld190eXBlc2NyaXB0ADcTbW92aV9uZXdfdHlwZXNjcmlwdAAVE21jbGlfbmV3X3R5cGVzY3JpcHQAFRNqbnppX25ld190eXBlc2NyaXB0ABUTam1wZl9uZXdfdHlwZXNjcmlwdAAVEm5vdF9uZXdfdHlwZXNjcmlwdAAgE3JldGRfbmV3X3R5cGVzY3JpcHQAIBNtb3ZlX25ld190eXBlc2NyaXB0ACASbWNsX25ld190eXBlc2NyaXB0ACATYnVybl9uZXdfdHlwZXNjcmlwdAAgE2Nyb29fbmV3X3R5cGVzY3JpcHQAIBNjc2l6X25ld190eXBlc2NyaXB0ACATbWludF9uZXdfdHlwZXNjcmlwdAAgE3RpbWVfbmV3X3R5cGVzY3JpcHQAIBNic2l6X25ld190eXBlc2NyaXB0ACAGcmV0X3JhACIHYmhlaV9yYQAiBWNiX3JhACIHcnZydF9yYQAiB2ZsYWdfcmEAIgZqbXBfcmEAIghqaV9pbW0yNAAKCmNmc2lfaW1tMjQACgZjZmVfcmEAIgZjZnNfcmEAIgpwc2hsX2ltbTI0AAoKcHNoaF9pbW0yNAAKCnBvcGxfaW1tMjQACgpwb3BoX2ltbTI0AAoTbWxkdl9uZXdfdHlwZXNjcmlwdABVEm1lcV9uZXdfdHlwZXNjcmlwdABVEmNjcF9uZXdfdHlwZXNjcmlwdABVEmxvZ19uZXdfdHlwZXNjcmlwdABVE2xvZ2RfbmV3X3R5cGVzY3JpcHQAVRNzcndxX25ld190eXBlc2NyaXB0AFUTc3d3cV9uZXdfdHlwZXNjcmlwdABVEnRyb19uZXdfdHlwZXNjcmlwdABVE2VkMTlfbmV3X3R5cGVzY3JpcHQAVRJzbW9fbmV3X3R5cGVzY3JpcHQAVRJsZGNfbmV3X3R5cGVzY3JpcHQAVRNqbmVmX25ld190eXBlc2NyaXB0AFUTd2RtZF9uZXdfdHlwZXNjcmlwdABVE3dxbWRfbmV3X3R5cGVzY3JpcHQAVRN3ZGFtX25ld190eXBlc2NyaXB0AFUTd3FhbV9uZXdfdHlwZXNjcmlwdABVE3dkbW1fbmV3X3R5cGVzY3JpcHQAVRN3cW1tX25ld190eXBlc2NyaXB0AFUTZWNhbF9uZXdfdHlwZXNjcmlwdABVE2NhbGxfbmV3X3R5cGVzY3JpcHQAVRNfX3diZ19tYXRoYXJnc19mcmVlABAfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwBLHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X2xocwBLH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMASR5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9saHMASRJyZXRfbmV3X3R5cGVzY3JpcHQAYBNiaGVpX25ld190eXBlc2NyaXB0AGARY2JfbmV3X3R5cGVzY3JpcHQAYBNydnJ0X25ld190eXBlc2NyaXB0AGATZmxhZ19uZXdfdHlwZXNjcmlwdABgEmptcF9uZXdfdHlwZXNjcmlwdABgEmNmZV9uZXdfdHlwZXNjcmlwdABgEmNmc19uZXdfdHlwZXNjcmlwdABgD19fd2JnX3RpbWVfZnJlZQAYDl9fd2JnX21jbF9mcmVlABgPX193YmdfcG9wbF9mcmVlABgNX193YmdfbHRfZnJlZQAYD19fd2JnX2puemJfZnJlZQAYDl9fd2JnX3Nyd19mcmVlABgPX193Ymdfd3FtbF9mcmVlABgPX193YmdfazI1Nl9mcmVlABgNX193YmdfbGJfZnJlZQAYD19fd2JnX2puZWJfZnJlZQAYD19fd2JnX3JldGRfZnJlZQAYD19fd2JnX2V4cGlfZnJlZQAYD19fd2JnX3N3d3FfZnJlZQAYD19fd2JnX2Nyb29fZnJlZQAYDl9fd2JnX3Ntb19mcmVlABgOX193YmdfbGRjX2ZyZWUAGA9fX3diZ19tbG9nX2ZyZWUAGA9fX3diZ19ic2l6X2ZyZWUAGA1fX3diZ19lcV9mcmVlABgPX193YmdfbWNsaV9mcmVlABgPX193YmdfeG9yaV9mcmVlABgPX193YmdfYW5kaV9mcmVlABgPX193Ymdfd3FvcF9mcmVlABgPX193Ymdfd2RjbV9mcmVlABgPX193YmdfcHNoaF9mcmVlABgPX193Ymdfc3ViaV9mcmVlABgNX193Ymdfb3JfZnJlZQAYD19fd2JnX2puemlfZnJlZQAYD19fd2JnX3dkbWRfZnJlZQAYDV9fd2JnX2dtX2ZyZWUAGA5fX3diZ19zcmxfZnJlZQAYD19fd2JnX3NybGlfZnJlZQAYD19fd2JnX2ZsYWdfZnJlZQAYD19fd2JnX3dkYW1fZnJlZQAYD19fd2JnX21vZGlfZnJlZQAYD19fd2JnX3dxYW1fZnJlZQAYD19fd2JnX2VjazFfZnJlZQAYDl9fd2JnX2Nmc19mcmVlABgPX193Ymdfam5laV9mcmVlABgPX193YmdfczI1Nl9mcmVlABgPX193YmdfYmxkZF9mcmVlABgOX193YmdfbW9kX2ZyZWUAGA9fX3diZ19zY3dxX2ZyZWUAGA5fX3diZ19hbmRfZnJlZQAYDl9fd2JnX3Ryb19mcmVlABgPX193Ymdfc3J3cV9mcmVlABgPX193YmdfcG9waF9mcmVlABgOX193Ymdfc3d3X2ZyZWUAGA9fX3diZ193ZGR2X2ZyZWUAGA5fX3diZ19tY3BfZnJlZQAYDV9fd2JnX3NiX2ZyZWUAGA9fX3diZ19lY2FsX2ZyZWUAGA5fX3diZ19qbmVfZnJlZQAYD19fd2JnX2Fsb2NfZnJlZQAYD19fd2JnX2puemZfZnJlZQAYD19fd2JnX2NhbGxfZnJlZQAYD19fd2JnX3J2cnRfZnJlZQAYD19fd2JnX3dxbW1fZnJlZQAYD19fd2JnX21vdmlfZnJlZQAYD19fd2JnX3dkbWxfZnJlZQAYD19fd2JnX2JoZWlfZnJlZQAYDl9fd2JnX2NmZV9mcmVlABgPX193Ymdfc2xsaV9mcmVlABgPX193YmdfbWludF9mcmVlABgPX193YmdfcHNobF9mcmVlABgOX193YmdfZGl2X2ZyZWUAGA9fX3diZ19tY3BpX2ZyZWUAGA9fX3diZ193cWR2X2ZyZWUAGA9fX3diZ19kaXZpX2ZyZWUAGA5fX3diZ19iYWxfZnJlZQAYDl9fd2JnX2V4cF9mcmVlABgOX193Ymdfc3ViX2ZyZWUAGA9fX3diZ19qbmVmX2ZyZWUAGA9fX3diZ19tb3ZlX2ZyZWUAGA9fX3diZ19jZnNpX2ZyZWUAGA5fX3diZ19jY3BfZnJlZQAYD19fd2JnX2VkMTlfZnJlZQAYDl9fd2JnX2ptcF9mcmVlABgPX193YmdfYWRkaV9mcmVlABgOX193YmdfcmV0X2ZyZWUAGA5fX3diZ19zbGxfZnJlZQAYDl9fd2JnX29yaV9mcmVlABgPX193Ymdfd2RvcF9mcmVlABgPX193YmdfbG9nZF9mcmVlABgPX193Ymdfd3FjbV9mcmVlABgNX193YmdfY2JfZnJlZQAYD19fd2JnX2J1cm5fZnJlZQAYD19fd2JnX3dkbW1fZnJlZQAYDl9fd2JnX2d0Zl9mcmVlABgNX193Ymdfc3dfZnJlZQAYDV9fd2JnX2ppX2ZyZWUAGA9fX3diZ19jc2l6X2ZyZWUAGA1fX3diZ19ndF9mcmVlABgOX193YmdfbXVsX2ZyZWUAGA9fX3diZ19tdWxpX2ZyZWUAGA9fX3diZ19jZmVpX2ZyZWUAGA9fX3diZ19lY3IxX2ZyZWUAGA5fX3diZ19tZXFfZnJlZQAYD19fd2JnX3dxbWRfZnJlZQAYD19fd2JnX21yb29fZnJlZQAYD19fd2JnX21sZHZfZnJlZQAYD19fd2JnX2ptcGJfZnJlZQAYD19fd2JnX2Joc2hfZnJlZQAYDV9fd2JnX3RyX2ZyZWUAGA5fX3diZ194b3JfZnJlZQAYDV9fd2JnX2x3X2ZyZWUAGA5fX3diZ19sb2dfZnJlZQAYD19fd2JnX2ptcGZfZnJlZQAYDl9fd2JnX25vdF9mcmVlABgTd3Fkdl9uZXdfdHlwZXNjcmlwdADKARN3cW1sX25ld190eXBlc2NyaXB0AMoBE3dkbWxfbmV3X3R5cGVzY3JpcHQAygETd3FvcF9uZXdfdHlwZXNjcmlwdADKARN3ZG9wX25ld190eXBlc2NyaXB0AMoBE3dxY21fbmV3X3R5cGVzY3JpcHQAygETd2Rkdl9uZXdfdHlwZXNjcmlwdADKAQ53cWNtX2Zyb21fYXJncwA7CndxZHZfaW1tMDYANgp3cW1sX2ltbTA2ADYKd2RtbF9pbW0wNgA2Cndxb3BfaW1tMDYANgp3ZG9wX2ltbTA2ADYKd3FjbV9pbW0wNgA2CndkZHZfaW1tMDYANgp3ZGNtX2ltbTA2ADYKam5lZl9pbW0wNgA2CWxkY19pbW0wNgA2DndxbWxfZnJvbV9hcmdzADwOd3FvcF9mcm9tX2FyZ3MAOwVnbV9yYQA1BWd0X3JjABoFZ3RfcmIAEgVndF9yYQA1BWxiX3JiABIFbGJfcmEANQVsdF9yYwAaBWx0X3JiABIFbHRfcmEANQhsd19pbW0xMgAJBWx3X3JiABIFbHdfcmEANQVvcl9yYwAaBW9yX3JiABIFb3JfcmEANQhzYl9pbW0xMgAJBXNiX3JiABIFc2JfcmEANQhzd19pbW0xMgAJBXN3X3JiABIFc3dfcmEANQV0cl9yYwAaBXRyX3JiABIFdHJfcmEANQVlcV9yYwAaBWVxX3JiABIFZXFfcmEANQZhbmRfcmMAGgZhbmRfcmIAEgZhbmRfcmEANQZiYWxfcmMAGgZiYWxfcmIAEgZiYWxfcmEANQZjY3BfcmMAGgZjY3BfcmIAEgZjY3BfcmEANQZkaXZfcmMAGgZkaXZfcmIAEgZkaXZfcmEANQZleHBfcmMAGgZleHBfcmIAEgZleHBfcmEANQhsYl9pbW0xMgAJBmd0Zl9yYgASBmd0Zl9yYQA1BmpuZV9yYwAaBmpuZV9yYgASBmpuZV9yYQA1BmxkY19yYwAaBmxkY19yYgASBmxkY19yYQA1BmxvZ19yZAA2BmxvZ19yYwAaBmxvZ19yYgASBmxvZ19yYQA1Bm1jbF9yYgASBm1jbF9yYQA1Bm1jcF9yYwAaBm1jcF9yYgASBm1jcF9yYQA1Bm1lcV9yZAA2Bm1lcV9yYwAaBm1lcV9yYgASBm1lcV9yYQA1Bm1vZF9yYwAaBm1vZF9yYgASBm1vZF9yYQA1Bm11bF9yYwAaBm11bF9yYgASBm11bF9yYQA1Bm5vdF9yYgASBm5vdF9yYQA1CW9yaV9pbW0xMgAJBm9yaV9yYgASBm9yaV9yYQA1BnNsbF9yYwAaBnNsbF9yYgASBnNsbF9yYQA1BnNtb19yZAA2BnNtb19yYwAaBnNtb19yYgASBnNtb19yYQA1BnNybF9yYwAaBnNybF9yYgASBnNybF9yYQA1BnNyd19yYwAaBnNyd19yYgASBnNyd19yYQA1BnN1Yl9yYwAaBnN1Yl9yYgASBnN1Yl9yYQA1BnN3d19yYwAaBnN3d19yYgASBnN3d19yYQA1BnRyb19yZAA2BnRyb19yYwAaBnRyb19yYgASBnRyb19yYQA1Bnhvcl9yYwAaBnhvcl9yYgASBnhvcl9yYQA1CWd0Zl9pbW0xMgAJB2FkZGlfcmIAEgdhZGRpX3JhADUKYW5kaV9pbW0xMgAJB2FuZGlfcmIAEgdhbmRpX3JhADUHYmhzaF9yYgASB2Joc2hfcmEANQZjY3BfcmQANgdibGRkX3JjABoHYmxkZF9yYgASB2JsZGRfcmEANQdic2l6X3JiABIHYnNpel9yYQA1B2J1cm5fcmIAEgdidXJuX3JhADUHY2FsbF9yZAA2B2NhbGxfcmMAGgdjYWxsX3JiABIHY2FsbF9yYQA1B2Nyb29fcmIAEgdjcm9vX3JhADUHY3Npel9yYgASB2NzaXpfcmEANQpkaXZpX2ltbTEyAAkHZGl2aV9yYgASB2RpdmlfcmEANQdlY2FsX3JkADYHZWNhbF9yYwAaB2VjYWxfcmIAEgdlY2FsX3JhADUHZWNrMV9yYwAaB2VjazFfcmIAEgdlY2sxX3JhADUHZWNyMV9yYwAaB2VjcjFfcmIAEgdlY3IxX3JhADUHZWQxOV9yZAA2B2VkMTlfcmMAGgdlZDE5X3JiABIHZWQxOV9yYQA1CmV4cGlfaW1tMTIACQdleHBpX3JiABIHZXhwaV9yYQA1CmptcGJfaW1tMTgADQdqbXBiX3JhADUKam1wZl9pbW0xOAANB2ptcGZfcmEANQdqbmViX3JjABoHam5lYl9yYgASB2puZWJfcmEANQdqbmVmX3JjABoHam5lZl9yYgASB2puZWZfcmEANQpqbmVpX2ltbTEyAAkHam5laV9yYgASB2puZWlfcmEANQpqbnpiX2ltbTEyAAkHam56Yl9yYgASB2puemJfcmEANQpqbnpmX2ltbTEyAAkHam56Zl9yYgASB2puemZfcmEANQpqbnppX2ltbTE4AA0Ham56aV9yYQA1B2syNTZfcmMAGgdrMjU2X3JiABIHazI1Nl9yYQA1B2xvZ2RfcmQANgdsb2dkX3JjABoHbG9nZF9yYgASB2xvZ2RfcmEANQptY2xpX2ltbTE4AA0HbWNsaV9yYQA1Cm1jcGlfaW1tMTIACQdtY3BpX3JiABIHbWNwaV9yYQA1B21pbnRfcmIAEgdtaW50X3JhADUHbWxkdl9yZAA2B21sZHZfcmMAGgdtbGR2X3JiABIHbWxkdl9yYQA1B21sb2dfcmMAGgdtbG9nX3JiABIHbWxvZ19yYQA1Cm1vZGlfaW1tMTIACQdtb2RpX3JiABIHbW9kaV9yYQA1B21vdmVfcmIAEgdtb3ZlX3JhADUKbW92aV9pbW0xOAANB21vdmlfcmEANQdtcm9vX3JjABoHbXJvb19yYgASB21yb29fcmEANQptdWxpX2ltbTEyAAkHbXVsaV9yYgASB211bGlfcmEANQdyZXRkX3JiABIHcmV0ZF9yYQA1B3MyNTZfcmMAGgdzMjU2X3JiABIHczI1Nl9yYQA1B3Njd3FfcmMAGgdzY3dxX3JiABIHc2N3cV9yYQA1CnNsbGlfaW1tMTIACQdzbGxpX3JiABIHc2xsaV9yYQA1CnNybGlfaW1tMTIACQdzcmxpX3JiABIHc3JsaV9yYQA1B3Nyd3FfcmQANgdzcndxX3JjABoHc3J3cV9yYgASB3Nyd3FfcmEANQpzdWJpX2ltbTEyAAkHc3ViaV9yYgASB3N1YmlfcmEANQdzd3dxX3JkADYHc3d3cV9yYwAaB3N3d3FfcmIAEgdzd3dxX3JhADUHdGltZV9yYgASB3RpbWVfcmEANQd3ZGFtX3JkADYHd2RhbV9yYwAaB3dkYW1fcmIAEgd3ZGFtX3JhADUHd2RjbV9yYwAaB3dkY21fcmIAEgd3ZGNtX3JhADUHd2Rkdl9yYwAaB3dkZHZfcmIAEgd3ZGR2X3JhADUHd2RtZF9yZAA2B3dkbWRfcmMAGgd3ZG1kX3JiABIHd2RtZF9yYQA1B3dkbWxfcmMAGgd3ZG1sX3JiABIHd2RtbF9yYQA1B3dkbW1fcmQANgd3ZG1tX3JjABoHd2RtbV9yYgASB3dkbW1fcmEANQd3ZG9wX3JjABoHd2RvcF9yYgASB3dkb3BfcmEANQd3cWFtX3JkADYHd3FhbV9yYwAaB3dxYW1fcmIAEgd3cWFtX3JhADUHd3FjbV9yYwAaB3dxY21fcmIAEgd3cWNtX3JhADUHd3Fkdl9yYwAaB3dxZHZfcmIAEgd3cWR2X3JhADUHd3FtZF9yZAA2B3dxbWRfcmMAGgd3cW1kX3JiABIHd3FtZF9yYQA1B3dxbWxfcmMAGgd3cW1sX3JiABIHd3FtbF9yYQA1B3dxbW1fcmQANgd3cW1tX3JjABoHd3FtbV9yYgASB3dxbW1fcmEANQd3cW9wX3JjABoHd3FvcF9yYgASB3dxb3BfcmEANQp4b3JpX2ltbTEyAAkHeG9yaV9yYgASB3hvcmlfcmEANRNqbmViX25ld190eXBlc2NyaXB0AFUQX193YmdfcmVnaWRfZnJlZQAqDndxZHZfZnJvbV9hcmdzAMkBEF9fd2JnX2ltbTI0X2ZyZWUALB9fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyANYBE19fd2JpbmRnZW5fZXhwb3J0XzAA0gEKgXv9Ae0iAgh/AX4CQAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQUgAEELaiIAQXhxIQVB5I7AACgCACIIRQ0EQQAgBWshBAJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRByIvAAGooAgAiAkUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEDA0ACQCACKAIEQXhxIgYgBUkNACAGIAVrIgYgBE8NACACIQEgBiIEDQBBACEEIAEhAAwECyACKAIUIgYgACAGIAIgA0EddkEEcWpBEGooAgAiAkcbIAAgBhshACADQQF0IQMgAg0ACwwBC0HgjsAAKAIAIgJBECAAQQtqQfgDcSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQdiMwABqIgMgAEHgjMAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0HgjsAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB6I7AACgCAE0NAwJAAkAgAUUEQEHkjsAAKAIAIgBFDQYgAGhBAnRByIvAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgASgCFCIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACKAIUIgAbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyACQRRqIAJBEGogABshAwNAIAMhBiABIgBBFGogAEEQaiAAKAIUIgEbIQMgAEEUQRAgARtqKAIAIgENAAsgBkEANgIACyAHRQ0EIAIgAigCHEECdEHIi8AAaiIBKAIARwRAIAdBEEEUIAcoAhAgAkYbaiAANgIAIABFDQUMBAsgASAANgIAIAANA0HkjsAAQeSOwAAoAgBBfiACKAIcd3E2AgAMBAsgACgCBEF4cSAFayIBIAQgASAESSIBGyEEIAAgAiABGyECIAAhAQwACwALAkBBAiAAdCIDQQAgA2tyIAEgAHRxaCIAQQN0IgFB2IzAAGoiAyABQeCMwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeCOwAAgAkF+IAB3cTYCAAsgASAFQQNyNgIEIAEgBWoiBiAAQQN0IgAgBWsiBEEBcjYCBCAAIAFqIAQ2AgBB6I7AACgCACICBEAgAkF4cUHYjMAAaiEAQfCOwAAoAgAhAwJ/QeCOwAAoAgAiBUEBIAJBA3Z0IgJxRQRAQeCOwAAgAiAFcjYCACAADAELIAAoAggLIQIgACADNgIIIAIgAzYCDCADIAA2AgwgAyACNgIIC0HwjsAAIAY2AgBB6I7AACAENgIAIAFBCGoPCyAAIAc2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAigCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkACQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiBSAEQQFyNgIEIAQgBWogBDYCAEHojsAAKAIAIgNFDQEgA0F4cUHYjMAAaiEAQfCOwAAoAgAhAQJ/QeCOwAAoAgAiBkEBIANBA3Z0IgNxRQRAQeCOwAAgAyAGcjYCACAADAELIAAoAggLIQMgACABNgIIIAMgATYCDCABIAA2AgwgASADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIEDAELQfCOwAAgBTYCAEHojsAAIAQ2AgALIAJBCGoPCyAAIAFyRQRAQQAhAUECIAd0IgBBACAAa3IgCHEiAEUNAyAAaEECdEHIi8AAaigCACEACyAARQ0BCwNAIAAgASAAKAIEQXhxIgMgBWsiBiAESSIHGyEIIAAoAhAiAkUEQCAAKAIUIQILIAEgCCADIAVJIgAbIQEgBCAGIAQgBxsgABshBCACIgANAAsLIAFFDQAgBUHojsAAKAIAIgBNIAQgACAFa09xDQAgASgCGCEHAkACQCABIAEoAgwiAEYEQCABQRRBECABKAIUIgAbaigCACICDQFBACEADAILIAEoAggiAiAANgIMIAAgAjYCCAwBCyABQRRqIAFBEGogABshAwNAIAMhBiACIgBBFGogAEEQaiAAKAIUIgIbIQMgAEEUQRAgAhtqKAIAIgINAAsgBkEANgIACyAHRQ0DIAEgASgCHEECdEHIi8AAaiICKAIARwRAIAdBEEEUIAcoAhAgAUYbaiAANgIAIABFDQQMAwsgAiAANgIAIAANAkHkjsAAQeSOwAAoAgBBfiABKAIcd3E2AgAMAwsCQAJAAkACQAJAIAVB6I7AACgCACIBSwRAIAVB7I7AACgCACIATwRAQQAhBCAFQa+ABGoiAEEQdkAAIgFBf0YiAw0HIAFBEHQiAkUNB0H4jsAAQQAgAEGAgHxxIAMbIgRB+I7AACgCAGoiADYCAEH8jsAAQfyOwAAoAgAiASAAIAAgAUkbNgIAAkACQEH0jsAAKAIAIgMEQEHIjMAAIQADQCAAKAIAIgEgACgCBCIGaiACRg0CIAAoAggiAA0ACwwCC0GEj8AAKAIAIgBBACAAIAJNG0UEQEGEj8AAIAI2AgALQYiPwABB/x82AgBBzIzAACAENgIAQciMwAAgAjYCAEHkjMAAQdiMwAA2AgBB7IzAAEHgjMAANgIAQeCMwABB2IzAADYCAEH0jMAAQeiMwAA2AgBB6IzAAEHgjMAANgIAQfyMwABB8IzAADYCAEHwjMAAQeiMwAA2AgBBhI3AAEH4jMAANgIAQfiMwABB8IzAADYCAEGMjcAAQYCNwAA2AgBBgI3AAEH4jMAANgIAQZSNwABBiI3AADYCAEGIjcAAQYCNwAA2AgBBnI3AAEGQjcAANgIAQZCNwABBiI3AADYCAEHUjMAAQQA2AgBBpI3AAEGYjcAANgIAQZiNwABBkI3AADYCAEGgjcAAQZiNwAA2AgBBrI3AAEGgjcAANgIAQaiNwABBoI3AADYCAEG0jcAAQaiNwAA2AgBBsI3AAEGojcAANgIAQbyNwABBsI3AADYCAEG4jcAAQbCNwAA2AgBBxI3AAEG4jcAANgIAQcCNwABBuI3AADYCAEHMjcAAQcCNwAA2AgBByI3AAEHAjcAANgIAQdSNwABByI3AADYCAEHQjcAAQciNwAA2AgBB3I3AAEHQjcAANgIAQdiNwABB0I3AADYCAEHkjcAAQdiNwAA2AgBB7I3AAEHgjcAANgIAQeCNwABB2I3AADYCAEH0jcAAQeiNwAA2AgBB6I3AAEHgjcAANgIAQfyNwABB8I3AADYCAEHwjcAAQeiNwAA2AgBBhI7AAEH4jcAANgIAQfiNwABB8I3AADYCAEGMjsAAQYCOwAA2AgBBgI7AAEH4jcAANgIAQZSOwABBiI7AADYCAEGIjsAAQYCOwAA2AgBBnI7AAEGQjsAANgIAQZCOwABBiI7AADYCAEGkjsAAQZiOwAA2AgBBmI7AAEGQjsAANgIAQayOwABBoI7AADYCAEGgjsAAQZiOwAA2AgBBtI7AAEGojsAANgIAQaiOwABBoI7AADYCAEG8jsAAQbCOwAA2AgBBsI7AAEGojsAANgIAQcSOwABBuI7AADYCAEG4jsAAQbCOwAA2AgBBzI7AAEHAjsAANgIAQcCOwABBuI7AADYCAEHUjsAAQciOwAA2AgBByI7AAEHAjsAANgIAQdyOwABB0I7AADYCAEHQjsAAQciOwAA2AgBB9I7AACACNgIAQdiOwABB0I7AADYCAEHsjsAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQYCPwABBgICAATYCAAwICyACIANNIAEgA0tyDQAgACgCDEUNAwtBhI/AAEGEj8AAKAIAIgAgAiAAIAJJGzYCACACIARqIQFByIzAACEAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgACgCDEUNAQtByIzAACEAA0ACQCADIAAoAgAiAU8EQCABIAAoAgRqIgYgA0sNAQsgACgCCCEADAELC0H0jsAAIAI2AgBB7I7AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGAj8AAQYCAgAE2AgAgAyAGQSBrQXhxQQhrIgAgACADQRBqSRsiAUEbNgIEQciMwAApAgAhCSABQRBqQdCMwAApAgA3AgAgASAJNwIIQcyMwAAgBDYCAEHIjMAAIAI2AgBB0IzAACABQQhqNgIAQdSMwABBADYCACABQRxqIQADQCAAQQc2AgAgAEEEaiIAIAZJDQALIAEgA0YNByABIAEoAgRBfnE2AgQgAyABIANrIgBBAXI2AgQgASAANgIAIABBgAJPBEAgAyAAEAUMCAsgAEF4cUHYjMAAaiEBAn9B4I7AACgCACICQQEgAEEDdnQiAHFFBEBB4I7AACAAIAJyNgIAIAEMAQsgASgCCAshACABIAM2AgggACADNgIMIAMgATYCDCADIAA2AggMBwsgACACNgIAIAAgACgCBCAEajYCBCACIAVBA3I2AgQgASACIAVqIgNrIQUgAUH0jsAAKAIARg0DIAFB8I7AACgCAEYNBCABKAIEIgRBA3FBAUYEQCABIARBeHEiABAEIAAgBWohBSAAIAFqIgEoAgQhBAsgASAEQX5xNgIEIAMgBUEBcjYCBCADIAVqIAU2AgAgBUGAAk8EQCADIAUQBQwGCyAFQXhxQdiMwABqIQACf0HgjsAAKAIAIgFBASAFQQN2dCIEcUUEQEHgjsAAIAEgBHI2AgAgAAwBCyAAKAIICyEFIAAgAzYCCCAFIAM2AgwgAyAANgIMIAMgBTYCCAwFC0HsjsAAIAAgBWsiATYCAEH0jsAAQfSOwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQgAEEIaiEEDAYLQfCOwAAoAgAhAAJAIAEgBWsiAkEPTQRAQfCOwABBADYCAEHojsAAQQA2AgAgACABQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAELQeiOwAAgAjYCAEHwjsAAIAAgBWoiAzYCACADIAJBAXI2AgQgACABaiACNgIAIAAgBUEDcjYCBAsMCAsgACAEIAZqNgIEQfSOwABB9I7AACgCACIAQQ9qQXhxIgFBCGsiAjYCAEHsjsAAQeyOwAAoAgAgBGoiAyAAIAFrakEIaiIBNgIAIAIgAUEBcjYCBCAAIANqQSg2AgRBgI/AAEGAgIABNgIADAMLQfSOwAAgAzYCAEHsjsAAQeyOwAAoAgAgBWoiADYCACADIABBAXI2AgQMAQtB8I7AACADNgIAQeiOwABB6I7AACgCACAFaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgALIAJBCGoPC0EAIQRB7I7AACgCACIAIAVNDQBB7I7AACAAIAVrIgE2AgBB9I7AAEH0jsAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEDAMLIAQPCyAAIAc2AhggASgCECICBEAgACACNgIQIAIgADYCGAsgASgCFCICRQ0AIAAgAjYCFCACIAA2AhgLAkAgBEEQTwRAIAEgBUEDcjYCBCABIAVqIgIgBEEBcjYCBCACIARqIAQ2AgAgBEGAAk8EQCACIAQQBQwCCyAEQXhxQdiMwABqIQACf0HgjsAAKAIAIgNBASAEQQN2dCIEcUUEQEHgjsAAIAMgBHI2AgAgAAwBCyAAKAIICyEEIAAgAjYCCCAEIAI2AgwgAiAANgIMIAIgBDYCCAwBCyABIAQgBWoiAEEDcjYCBCAAIAFqIgAgACgCBEEBcjYCBAsgAUEIag8LIABBCGoL+wQBAX8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcILAkKCwwNLCwsLCwsLCwsLCwsLCwsLCwsDg8sLCwQAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5BAQIDBAUGQgcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N0JCODkACwJAIABBgAprDgU8PT4/QAALIABBgAhrDgI5OkELQQIPC0EDDwtBBA8LQQUPC0EGDwtBBw8LQQkPC0EKDwtBCw8LQQwPC0ENDwtBDg8LQYECDwtBggIPC0GDAg8LQYQCDwtBhQIPC0GGAg8LQYcCDwtBiAIPC0GJAg8LQYoCDwtBgAQPC0GBBA8LQYIEDwtBgwQPC0GEBA8LQYUEDwtBhgQPC0GHBA8LQYkEDwtBigQPC0GLBA8LQYwEDwtBjQQPC0GgBA8LQaEEDwtBpQQPC0HABA8LQcEEDwtBwgQPC0HDBA8LQcQEDwtBxQQPC0HGBA8LQccEDwtByAQPC0HJBA8LQcoEDwtBywQPC0GABg8LQYEGDwtBggYPC0GDBg8LQYQGDwtBhwYPC0GIBg8LQYAIDwtBgQgPC0GACg8LQYEKDwtBggoPC0GDCg8LQYQKIQELIAEPC0HggsAAQRkQ2AEAC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAECwJAAkACQCACKAIEIgNBAnFFBEAgAkH0jsAAKAIARg0CIAJB8I7AACgCAEYNAyACIANBeHEiAhAEIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfCOwAAoAgBHDQFB6I7AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAUPCyABQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASABQQN2dCIBcUUEQEHgjsAAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfSOwAAgADYCAEHsjsAAQeyOwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEHwjsAAKAIARw0BQeiOwABBADYCAEHwjsAAQQA2AgAPC0HwjsAAIAA2AgBB6I7AAEHojsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QciLwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeSOwABB5I7AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB4I7AAEHgjsAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QciLwABqIQRBASACdCIDQeSOwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHkjsAAQeSOwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDQASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ0wEiAg0CCwALENcBAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBWIABBBDYCBCAAIAI2AgALiwEBAn8gABDQASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/ENgBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQGQsLdQIBfwF+IAEQ0AEgAUEIayICKAIAQQFGBEAgATUCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQgGDPAAAIAAgA6dBCHZBAXE6AAEPC0H5gsAAQT8Q2AEAC3cBAn8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCIALwAAIABBAmotAABBEHRyENwBIQIgASgCCCABKAIMEMsBQRBBBBDGASIAIAJBCHZBgB5xIAJBGHZyOwEMIABBADYCCCAAQoGAgIAQNwIAIAFBEGokACAAQQhqC2wBAn8gABDQASAAQQhrIgEgASgCAEEBaiICNgIAAkAgAgRAIAAoAgBBf0YNASAALwAEIABBBmotAABBEHRyENwBIQAgARBeIABBCHZBgP4DcSAAQRh2ciAAQYD+A3FBCHRyEGcPCwALENcBAAtvAQJ/IAEQ0AEgAUEIayICKAIAQQFGBEAgASgCBCEDIAJBADYCAAJAIAJBf0YNACABQQRrIgEgASgCAEEBayIBNgIAIAENACACQRAQGQsgACADQQh2OgABIAAgA0EBcToAAA8LQfmCwABBPxDYAQALawEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRw0BIAAoAgQgAkEANgIAAkAgAkF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAJBEBAZCxDbAQ8LIAIQVg8LQfmCwABBPxDYAQALYQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA/gNxIABBGHZyIABBgAZxQQh0chBnIAFBEGokAAtqAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQQI2AhQgAUH0gMAANgIQIAFCATcCHCABQQE2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQVwALIAFBMGokACAAC2sBAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQQI2AhQgAUG4gcAANgIQIAFCATcCHCABQQI2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQVwALIAFBMGokACAAC2MBAn8jAEEQayICJAACQCABRQRAIAJBCGogABALDAELIAAQ0AEgAEEIayIBIAEoAgBBAWsiAzYCACADDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLIAJBEGokAAtjAQJ/IwBBEGsiAiQAAkAgAUUEQCACQQhqIAAQCAwBCyAAENABIABBCGsiASABKAIAQQFrIgM2AgAgAw0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCyACQRBqJAALXgEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEIdkGA4ANxIABBgAZxQQh0ckEMdhBoIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ9gELFgAgAEHQgsAAQcCCwABBgICACBD2AQtgAQF/IAAQGyECIAEQHiEAQRBBBBDGASIBQoGAgIAQNwIAIAEgAEEQdEGAgPwHcSAAIAJB/wFxQRJ0ciIAQYD+A3FBCHQgAEEIdkGA/gNxckEIdnKtQiCGNwIIIAFBCGoLXAECfyAAENABIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZC0EBcQ8LQfmCwABBPxDYAQALYAEBfyAAENABIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEUEBkPC0H5gsAAQT8Q2AEACyACEF8LC2ABAX8gABDQASAAQQhrIQICQCABRQRAIAIoAgBBAUYEQCACQQA2AgAgAkF/Rg0CIABBBGsiACAAKAIAQQFrIgA2AgAgAA0CIAJBEBAZDwtB+YLAAEE/ENgBAAsgAhBeCwvQBgEEfwJAIABBBGsoAgAiBCICQXhxIgNBBEEIIAJBA3EiAhsgAWpPBEAgAkEAIAMgAUEnaksbDQEgAEEIayIBIAQiA0F4cSIAaiECAkACQCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB8I7AACgCAEYEQCACKAIEQQNxQQNHDQFB6I7AACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADAILIAEgAxAECwJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfSOwAAoAgBGDQIgAkHwjsAAKAIARg0EIAIgA0F4cSICEAQgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB8I7AACgCAEcNAUHojsAAIAA2AgAMBQsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQEgASAAEAVBACEBQYiPwABBiI/AACgCAEEBayIANgIAIAANA0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAMAwtB9I7AACABNgIAQeyOwABB7I7AACgCACAAaiIANgIAIAEgAEEBcjYCBEHwjsAAKAIAIAFGBEBB6I7AAEEANgIAQfCOwABBADYCAAsgAEGAj8AAKAIAIgNNDQJB9I7AACgCACICRQ0CQQAhAQJAQeyOwAAoAgAiBEEpSQ0AQciMwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HQjMAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQYiPwABB/x8gASABQf8fTRs2AgAgAyAETw0CQYCPwABBfzYCAAwCCyAAQXhxQdiMwABqIQICf0HgjsAAKAIAIgNBASAAQQN2dCIAcUUEQEHgjsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCAwBC0HwjsAAIAE2AgBB6I7AAEHojsAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAsPC0GpicAAQS5B2InAABBKAAtB6InAAEEuQZiKwAAQSgALVQEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AEhACABKAIIIAEoAgwQywEgAEEOdkE8cSAAQR52chBoIAFBEGokAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAEQ0AEgAUEIayIDIAMoAgBBAWoiAjYCAAJAIAIEQCABKAIAIgJBf0YNASAAIAM2AgggACABNgIEIAAgAUEEajYCACABIAJBAWo2AgAPCwALENcBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgAC8BBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtZAQJ/IAAQ0AEgAEEIayIBKAIAQQFGBEAgACgCBCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLDwtB+YLAAEE/ENgBAAtRAQJ/AkAgABAbIgBBGHENACAAQQdxIgJBB0YNAEEQQQQQxgEiAUKBgICAEDcCACABIABBBXZBAXGtQiCGIAKtQiiGhDcCCCABQQhqIQELIAELVwEBfyAAEBshAiABEBshAUEQQQQQxgEiAEKBgICAEDcCACAAIAFB/wFxQQx0IAJBEnRyIgFBgOADcUEIdCABQQh2QYD+A3FyQQh2rUIghjcCCCAAQQhqC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENABIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ1AEgARBeEGgPCwALENcBAAtOAQF/IAFFBEAgABAWGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPgBCxAAIAAgASACIANB4wAQ+AELTgEBfyABRQRAIAAQGxoPCyAAENABIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQEBkLC04BAX8gAUUEQCAAEB0aDwsgABDQASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAZCwtOAQF/IAFFBEAgABAeGg8LIAAQ0AEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQGQsLDwAgACABQYCAgMgBEPkBCwwAIAAgAUHLABD6AQsMACAAIAFBzAAQ+gELDAAgACABQc0AEPoBCwwAIAAgAUHOABD6AQsMACAAIAFBzwAQ+gELDAAgACABQdAAEPoBCw8AIAAgAUGAgIDoBhD5AQtFAQF/IwBBEGsiASQAIAFBBGogABAcIAEoAgQiAC8AACAAQQJqLQAAQRB0chDUASABKAIIIAEoAgwQywEQaCABQRBqJAALSwEBfyMAQRBrIgEkACABQQRqIAAQHCABKAIEIgAvAAAgAEECai0AAEEQdHIQ3AFBGHZBP3EgASgCCCABKAIMEMsBEGggAUEQaiQAC04BAX8gABAeIQBBEEEEEMYBIgFCgYCAgBA3AgAgASAAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2cq1CIIY3AgggAUEIagsLACAAIAFBBxD7AQsLACAAIAFBCBD7AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCyAELQAIIAQtAAkQyAEQYiAEQRBqJAALOAEBfyMAQRBrIgQkACAAEBsgARAbIAIQGyAEQQhqIAMQCCAELQAIIAQtAAkQiQEQYiAEQRBqJAALCwAgACABQQoQ/AELCwAgACABQQwQ/AELCwAgACABQRQQ/AELCwAgACABQRYQ/AELCwAgACABQRsQ/AELCwAgACABQR4Q/AELCwAgACABQR8Q/AELCwAgACABQSQQ/AELCwAgACABQTIQ/AELPgAgABAbIQAgARAeIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEGILOAAgAkEQdEGAgPwHcSABQf8BcUEMdCIBIAJyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILPAECfyMAQRBrIgEkACAAENABIAFBCGogABBdIAEoAggtAAEgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzwBAn8jAEEQayIBJAAgABDQASABQQhqIAAQXSABKAIILQAAIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAtBAQF/IwBBIGsiAyQAIANBADYCECADQQE2AgQgA0IENwIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhBXAAs5AQF/IwBBEGsiAiQAIAAQ0AEgAkEIaiAAEGEgAigCDCACKAIIIAFBAEc6AABBADYCACACQRBqJAALOQEBfyMAQRBrIgIkACAAENABIAJBCGogABBhIAIoAgwgAigCCCABQQBHOgABQQA2AgAgAkEQaiQAC0MBAX8gAEE5TwRAQeCCwABBGRDYAQALQRRBBBDGASICIAA6ABAgAiABNgIMIAJBADYCCCACQoGAgIAQNwIAIAJBCGoLCgAgAEHVABD9AQsKACAAQdYAEP0BCwoAIABB1wAQ/QELCgAgAEHaABD9AQsKACAAQdsAEP0BCwoAIABB3AAQ/QELCgAgAEHdABD9AQs+ACAAEBsgARAbIAIQGyADEBsQISEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags7AQF/IAAgACgCAEEBayIBNgIAAkAgAQ0AIAAoAgwQ2wEgACAAKAIEQQFrIgE2AgQgAQ0AIABBEBAZCwvIAQEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQaiHwAA2AhAgAkEBNgIMIAJBDGoiACgCCCIBRQRAQfyGwABBK0HEisAAEEoACyABKAIMGiABKAIEGiAALQAQIQEgAC0AERpBxIvAAEHEi8AAKAIAIgBBAWo2AgACQCAAQQBIDQBBkI/AAC0AAEEBcQ0AQYyPwABBjI/AACgCAEEBajYCAEHAi8AAKAIAQQBIDQBBkI/AAEEAOgAAIAFFDQAACwALLwEBfyMAQRBrIgEkACABQQhqIAAQCyABLQAJQSBBACABLQAIG3IQaCABQRBqJAALOgAgABAbIAEQGyACEBsQOiEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAa1C////B4NCIIY3AgggAEEIags6ACAAEBsgARAbIAIQHRBHIQFBEEEEEMYBIgBCgYCAgBA3AgAgACABrUL///8Hg0IghjcCCCAAQQhqCzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBC0ABCABKAIIIAEoAgwQzAEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAEBwgASgCBCgCACABKAIIIAEoAgwQzAEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDXAQALCQAgAEEQEPABCwkAIABBFBDwAQszAQF/IAAQGyEBQRBBBBDGASIAQoGAgIAQNwIAIAAgAUECdEH8AXGtQiCGNwIIIABBCGoLKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENcBAAssAQF/QRBBBBDGASIBQoGAgIAQNwIAIAEgAK1C////B4NCIIY3AgggAUEIagskACAAENABIAAoAgAEQBDXAQALIABBADYCACAAIAFBAEc6AAQLKAAgAxAWIQMgABDHASABEMcBIAIQxwEgAxDOAUEIdEHkAHIQ0QEQZwsoACADEBYhAyAAEMcBIAEQxwEgAhDHASADEM4BQQh0QeUAchDRARBnCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ2AEACykBAX9BEEEEEMYBIgEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCykBAX9BEEEEEMYBIgEgADoADCABQQA2AgggAUKBgICAEDcCACABQQhqCyIAIAIQAiECIAAQxwEgARDHASACEEdBCHRBygByENEBEGcLDwAgACABIAIgA0ESEPEBCw8AIAAgASACIANBGBDxAQsPACAAIAEgAiADQRwQ8QELDwAgACABIAIgA0EdEPEBCw8AIAAgASACIANBIRDyAQsPACAAIAEgAiADQSIQ8QELDwAgACABIAIgA0EjEPEBCw8AIAAgASACIANBKBDxAQsPACAAIAEgAiADQSoQ8QELDwAgACABIAIgA0EsEPEBCw8AIAAgASACIANBLxDxAQsPACAAIAEgAiADQTgQ8QELEAAgACABIAIgA0HTABDyAQsQACAAIAEgAiADQdQAEPIBCxAAIAAgASACIANB3gAQ8gELEAAgACABIAIgA0HfABDyAQsQACAAIAEgAiADQeAAEPIBCxAAIAAgASACIANB4QAQ8gELEAAgACABIAIgA0HiABDyAQsQACAAIAEgAiADQeMAEPIBCxAAIAAgASACIANB5AAQ8gELEAAgACABIAIgA0HlABDyAQsQACAAIAEgAiADQeYAEPEBCxAAIAAgASACIANB5wAQ8QELEAAgACABIAIgA0HoABDxAQsQACAAIAEgAiADQekAEPEBCxAAIAAgASACIANB6gAQ8QELEAAgACABIAIgA0HrABDxAQsQACAAIAEgAiADQewAEPEBCxAAIAAgASACIANB7gAQ8QELHgAgARBmIQEgABDHASABEMQBQQh0QcwAchDRARBnCxkAIAAgASACQSBBACAEG0EQQQAgAxtyECELDQAgACABIAJBARDzAQsNACAAIAEgAkECEPMBCw0AIAAgASACQQMQ8wELDQAgACABIAJBBBDzAQsNACAAIAEgAkEFEPMBCw0AIAAgASACQQYQ8wELDQAgACABIAJBBxDzAQsNACAAIAEgAkEIEPMBCw0AIAAgASACQQkQ8wELDQAgACABIAJBCxDzAQsNACAAIAEgAkENEPMBCw0AIAAgASACQQ4Q8wELDQAgACABIAJBDxDzAQsNACAAIAEgAkEQEPMBCw0AIAAgASACQREQ8wELDQAgACABIAJBFxDzAQsNACAAIAEgAkEmEPMBCw0AIAAgASACQScQ8wELDQAgACABIAJBKRDzAQsNACAAIAEgAkErEPMBCw0AIAAgASACQS0Q8wELDQAgACABIAJBLhDzAQsNACAAIAEgAkEwEPMBCw0AIAAgASACQTEQ8wELDQAgACABIAJBNRDzAQsNACAAIAEgAkE3EPMBCw0AIAAgASACQTkQ9AELDQAgACABIAJBOhD0AQsNACAAIAEgAkE7EPQBCw0AIAAgASACQTwQ9AELDQAgACABIAJBPRD0AQsNACAAIAEgAkE+EPQBCw0AIAAgASACQT8Q9AELDgAgACABIAJBwAAQ9AELDgAgACABIAJBwQAQ9AELDgAgACABIAJBwgAQ9AELDgAgACABIAJBwwAQ9AELDgAgACABIAJBxAAQ9AELDgAgACABIAJBxQAQ9AELDgAgACABIAJBxgAQ9AELDgAgACABIAJBxwAQ9AELDgAgACABIAJByAAQ9AELDgAgACABIAJByQAQ9AELDgAgACABIAJBygAQ9AELDgAgACABIAJB0QAQ9AELDgAgACABIAJB0gAQ9AELFwEBfyAAQf8BcUE/TQR/IAAQaAVBAAsLGwAgABDQASAAKAIAQX9GBEAQ1wEACyAALQAECwkAIABBExD1AQsJACAAQRUQ9QELCQAgAEEaEPUBCwkAIABBIBD1AQsJACAAQSUQ9QELIgEBf0EQQQQQxgEiAEIANwIIIABCgYCAgBA3AgAgAEEIagsJACAAQTQQ9QELCQAgAEE2EPUBCwoAIABB2AAQ9QELCgAgAEHZABD1AQsXACABQRB0QYCA/ANxIABBAnRB/AFxcgsbACAAEMcBIAEQxwEgAhDHARA6QQh0ENEBEGcLEgAgASAAENMBIgAEQCAADwsAC3UBAX8gAEH/AXFBwABPBEAjAEEQayIBJAAgAUEiNgIMIAFBgIDAADYCCCMAQSBrIgAkACAAQQE2AgQgAEH0hsAANgIAIABCATcCDCAAIAFBCGqtQoCAgIDAAIQ3AxggACAAQRhqNgIIIABBuIDAABBXAAsgAAsUACAAIAEgAkEgQQAgAxsgBHIQIQsXACAAEBsgARAbIAIQGyADEBYQzgEQYgsWACAAEBsgARAbIAIQGyADEBsQIRBiCxMAIAAgACgCAEEBazYCACABEF4LEwAgACAAKAIAQQFrNgIAIAEQXwsSACAAEBsgARAbIAIQAhBHEGILEQAgACABIAJBIEEAIAMbECELEgAgABAbIAEQGyACEB0QRxBiCxMAIAAEQA8LQdSKwABBGxDYAQALFAEBf0EEQQEQxgEiASAANgAAIAELDQAgAQRAIAAgARAZCwuBAwEFf0GRj8AALQAAGgJ/IABBCU8EQAJAQc3/e0EQIAAgAEEQTRsiAGsgAU0NACAAQRAgAUELakF4cSABQQtJGyIEakEMahABIgJFDQAgAkEIayEBAkAgAEEBayIDIAJxRQRAIAEhAAwBCyACQQRrIgUoAgAiBkF4cSACIANqQQAgAGtxQQhrIgIgAEEAIAIgAWtBEE0baiIAIAFrIgJrIQMgBkEDcQRAIAAgAyAAKAIEQQFxckECcjYCBCAAIANqIgMgAygCBEEBcjYCBCAFIAIgBSgCAEEBcXJBAnI2AgAgASACaiIDIAMoAgRBAXI2AgQgASACEAMMAQsgASgCACEBIAAgAzYCBCAAIAEgAmo2AgALAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiAEQRBqTQ0AIAAgBCABQQFxckECcjYCBCAAIARqIgEgAiAEayIEQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgBBADCyAAQQhqIQMLIAMMAQsgARABCwsNACAAENwBQQp2QT9xCw8AIAAQGyABEGYQxAEQYgsLACAAIwBqJAAjAAsOAEHvisAAQc8AENgBAAsJACAAIAEQAAALCQAgAEE/cRBoCwoAIAAQG0H/AXELCAAgAEEEEBkLBwAgAEEIdAsJAEEzENEBEGcLBgBBCxBoCwYAQQoQaAsGAEEIEGgLBgBBDxBoCwYAQQYQaAsGAEEJEGgLBgBBBxBoCwYAQQwQaAsGAEECEGgLBgBBARBoCwYAQQMQaAsGAEENEGgLBgBBDhBoCwYAQQUQaAsGAEEEEGgLBgBBEBBoCwYAQQAQaAsEAEEECzMBAX8gACAAKAIAQQFrIgI2AgACQCACDQAgACAAKAIEQQFrIgI2AgQgAg0AIAAgARAZCwsjACAAEMcBIAEQxwEgAhDHASADEMcBECFBCHQgBHIQ0QEQZwsiACAAEMcBIAEQxwEgAhDHASADEA4QIUEIdCAEchDRARBnCx4AIAAQxwEgARDHASACEMcBEDpBCHQgA3IQ0QEQZwsdACAAEMcBIAEQxwEgAhAPEEdBCHQgA3IQ0QEQZwsaACAAEMcBGiAAQQp0QYD4A3EgAXIQ0QEQZwtfAQF/IwBBMGsiBCQAIAQgADYCDCAAIANPBEAgBEECNgIUIAQgAjYCECAEQgE3AhwgBEEDNgIsIAQgBEEoajYCGCAEIARBDGo2AiggBEEQaiABEFcACyAEQTBqJAAgAAtMAQJ/IwBBEGsiBSQAIAVBCGogAxALIAUtAAkhAyAFLQAIIQYgABDHASABEMcBIAIQxwEgBiADEMgBQQh0IARyENEBEGcgBUEQaiQAC0wBAn8jAEEQayIFJAAgBUEIaiADEAggBS0ACSEDIAUtAAghBiAAEMcBIAEQxwEgAhDHASAGIAMQiQFBCHQgBHIQ0QEQZyAFQRBqJAALSQAgABDHARogARDHARogAEESdEGAgPAXcSIAIAFBDHRBgOA/cXIiAUGA4ANxQQh0IAFBCHZBgP4DcSAAIAJyQRh2cnIQ0QEQZwtJACAAEMcBGiABEBMiAUEQdEGAgPwHcSAAQRJ0QYCA8B9xIAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2ckEIdCACchDRARBnC0kBAX8jAEEQayIDJAAgABDQASABIAJPBEBB4ILAAEEZENgBAAsgA0EIaiAAEGEgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQQAgABDHARogARDHARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyENEBEGcLNQAgABAUIgBBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyQQh0IAFyENEBEGcLC8gLAQBBgIDAAAu+C0NoZWNrUmVnSWQgd2FzIGdpdmVuIGludmFsaWQgUmVnSWRmdWVsLWFzbS9zcmMvbGliLnJzAAAAIgAQABMAAABuAAAAIgAAAFZhbHVlIGBgIG91dCBvZiByYW5nZSBmb3IgNi1iaXQgaW1tZWRpYXRlAAAASAAQAAcAAABPABAAIgAAACIAEAATAAAAsAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMTItYml0IGltbWVkaWF0ZQBIABAABwAAAJQAEAAjAAAAIgAQABMAAAC1AwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxOC1iaXQgaW1tZWRpYXRlAEgAEAAHAAAA2AAQACMAAAAiABAAEwAAALoDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDI0LWJpdCBpbW1lZGlhdGUASAAQAAcAAAAcARAAIwAAACIAEAATAAAAvwMAABwAAABpbnZhbGlkIGVudW0gdmFsdWUgcGFzc2VkYXR0ZW1wdGVkIHRvIHRha2Ugb3duZXJzaGlwIG9mIFJ1c3QgdmFsdWUgd2hpbGUgaXQgd2FzIGJvcnJvd2VkEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAQQAAAEIAAABDAAAARwAAAEgAAABJAAAASgAAAEsAAABMAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAJAAAACRAAAAkgAAAJMAAACUAAAAlQAAAJYAAACXAAAAmAAAAKAAAAChAAAAogAAAKMAAACkAAAApQAAAKYAAACnAAAAqAAAAKkAAACqAAAAqwAAAKwAAACtAAAAsAAAALoAAAC7AAAAAQAAAAAAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OS9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjYvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACABBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAgAQQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9wYW5pY2tpbmcucnMoBRAAHAAAAIsCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMS4zDHdhc20tYmluZGdlbgYwLjIuOTM=", e);
}
async function Ri() {
  return await zh(i1());
}
Ri();
const Vh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: ib,
  ADDI: ob,
  ALOC: ab,
  AND: cb,
  ANDI: db,
  BAL: ub,
  BHEI: _b,
  BHSH: hb,
  BLDD: lb,
  BSIZ: fb,
  BURN: pb,
  CALL: Ab,
  CB: gb,
  CCP: wb,
  CFE: mb,
  CFEI: yb,
  CFS: bb,
  CFSI: Ib,
  CROO: Eb,
  CSIZ: vb,
  CompareArgs: kr,
  CompareMode: eb,
  DIV: Cb,
  DIVI: Bb,
  DivArgs: ps,
  ECAL: Rb,
  ECK1: Sb,
  ECR1: Nb,
  ED19: Tb,
  EQ: Db,
  EXP: Qb,
  EXPI: Fb,
  FLAG: Ob,
  GM: oi,
  GMArgs: rb,
  GT: Mb,
  GTF: ai,
  GTFArgs: Ph,
  Imm06: Ft,
  Imm12: wt,
  Imm18: Te,
  Imm24: ve,
  Instruction: V,
  JI: Lb,
  JMP: kb,
  JMPB: Pb,
  JMPF: Ub,
  JNE: Gb,
  JNEB: zb,
  JNEF: Vb,
  JNEI: Yb,
  JNZB: Hb,
  JNZF: Zb,
  JNZI: Xb,
  K256: Wb,
  LB: jb,
  LDC: Jb,
  LOG: qb,
  LOGD: $b,
  LT: Kb,
  LW: tI,
  MCL: eI,
  MCLI: rI,
  MCP: nI,
  MCPI: sI,
  MEQ: iI,
  MINT: oI,
  MLDV: aI,
  MLOG: cI,
  MOD: dI,
  MODI: uI,
  MOVE: _I,
  MOVI: hI,
  MROO: lI,
  MUL: fI,
  MULI: pI,
  MathArgs: As,
  MathOp: nb,
  MulArgs: gs,
  NOOP: wI,
  NOT: mI,
  OR: yI,
  ORI: bI,
  POPH: II,
  POPL: EI,
  PSHH: vI,
  PSHL: CI,
  PanicInstruction: BI,
  PanicReason: sb,
  RET: xI,
  RETD: RI,
  RVRT: SI,
  RegId: l,
  S256: NI,
  SB: TI,
  SCWQ: DI,
  SLL: QI,
  SLLI: FI,
  SMO: OI,
  SRL: MI,
  SRLI: LI,
  SRW: kI,
  SRWQ: PI,
  SUB: UI,
  SUBI: GI,
  SW: zI,
  SWW: VI,
  SWWQ: YI,
  TIME: HI,
  TR: ZI,
  TRO: XI,
  WDAM: WI,
  WDCM: ci,
  WDDV: di,
  WDMD: jI,
  WDML: ui,
  WDMM: JI,
  WDOP: _i,
  WQAM: qI,
  WQCM: hi,
  WQDV: li,
  WQMD: $I,
  WQML: fi,
  WQMM: KI,
  WQOP: pi,
  XOR: t1,
  XORI: e1,
  add: hm,
  addi: fr,
  aloc: Nm,
  and: lm,
  andi: cy,
  bal: iy,
  bhei: Om,
  bhsh: Fm,
  bldd: Ky,
  bsiz: ii,
  burn: Mm,
  call: Jo,
  cb: Um,
  ccp: Lm,
  cfe: Dy,
  cfei: Ny,
  cfs: Qy,
  cfsi: Ty,
  croo: km,
  csiz: Pm,
  div: fm,
  divi: si,
  ecal: $y,
  eck1: qm,
  ecr1: $m,
  ed19: Km,
  eq: pm,
  exp: Am,
  expi: dy,
  flag: sy,
  gm: Iy,
  gm_args: rm,
  gt: gm,
  gtf: Lh,
  gtf_args: nm,
  initSync: n1,
  initWasm: Ri,
  ji: Sy,
  jmp: ni,
  jmpb: Cy,
  jmpf: vy,
  jne: oy,
  jneb: Ry,
  jnef: xy,
  jnei: Ay,
  jnzb: kh,
  jnzf: By,
  jnzi: Ey,
  k256: ty,
  lb: gy,
  ldc: Wn,
  log: Gm,
  logd: zm,
  lt: wm,
  lw: ts,
  mcl: Tm,
  mcli: by,
  mcp: Dm,
  mcpi: yy,
  meq: Qm,
  mint: Vm,
  mldv: Rm,
  mlog: mm,
  mod_: bm,
  modi: uy,
  move_: Wr,
  movi: ln,
  mroo: ym,
  mul: Im,
  muli: _y,
  noop: ny,
  not: Em,
  or: vm,
  ori: hy,
  poph: Ly,
  popl: My,
  pshh: Oy,
  pshl: Fy,
  ret: Za,
  retd: Sm,
  rvrt: Ym,
  s256: ey,
  sb: wy,
  scwq: Hm,
  sll: Cm,
  slli: ly,
  smo: ay,
  srl: Bm,
  srli: fy,
  srw: Zm,
  srwq: Xm,
  sub: ri,
  subi: Mh,
  sw: my,
  sww: Wm,
  swwq: jm,
  time: ry,
  tr: Oh,
  tro: Jm,
  wdam: Wy,
  wdcm: ky,
  wdcm_args: sm,
  wddv: Yy,
  wddv_args: um,
  wdmd: Zy,
  wdml: zy,
  wdml_args: cm,
  wdmm: Jy,
  wdop: Uy,
  wdop_args: om,
  wqam: jy,
  wqcm: Py,
  wqcm_args: im,
  wqdv: Hy,
  wqdv_args: _m,
  wqmd: Xy,
  wqml: Vy,
  wqml_args: dm,
  wqmm: qy,
  wqop: Gy,
  wqop_args: am,
  xor: xm,
  xori: py
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ie = BigInt(0), Yt = BigInt(1), Zr = BigInt(2), o1 = BigInt(3), qo = BigInt(4), m0 = BigInt(5), y0 = BigInt(8);
BigInt(9);
BigInt(16);
function Fe(e, t) {
  const r = e % t;
  return r >= Ie ? r : t + r;
}
function a1(e, t, r) {
  if (r <= Ie || t < Ie)
    throw new Error("Expected power/modulo > 0");
  if (r === Yt)
    return Ie;
  let n = Yt;
  for (; t > Ie; )
    t & Yt && (n = n * e % r), e = e * e % r, t >>= Yt;
  return n;
}
function Ue(e, t, r) {
  let n = e;
  for (; t-- > Ie; )
    n *= n, n %= r;
  return n;
}
function $o(e, t) {
  if (e === Ie || t <= Ie)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = Fe(e, t), n = t, s = Ie, i = Yt;
  for (; r !== Ie; ) {
    const a = n / r, u = n % r, f = s - i * a;
    n = r, r = u, s = i, i = f;
  }
  if (n !== Yt)
    throw new Error("invert: does not exist");
  return Fe(s, t);
}
function c1(e) {
  const t = (e - Yt) / Zr;
  let r, n, s;
  for (r = e - Yt, n = 0; r % Zr === Ie; r /= Zr, n++)
    ;
  for (s = Zr; s < e && a1(s, t, e) !== e - Yt; s++)
    ;
  if (n === 1) {
    const o = (e + Yt) / qo;
    return function(u, f) {
      const g = u.pow(f, o);
      if (!u.eql(u.sqr(g), f))
        throw new Error("Cannot find square root");
      return g;
    };
  }
  const i = (r + Yt) / Zr;
  return function(a, u) {
    if (a.pow(u, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let f = n, g = a.pow(a.mul(a.ONE, s), r), b = a.pow(u, i), v = a.pow(u, r);
    for (; !a.eql(v, a.ONE); ) {
      if (a.eql(v, a.ZERO))
        return a.ZERO;
      let S = 1;
      for (let N = a.sqr(v); S < f && !a.eql(N, a.ONE); S++)
        N = a.sqr(N);
      const Q = a.pow(g, Yt << BigInt(f - S - 1));
      g = a.sqr(Q), b = a.mul(b, Q), v = a.mul(v, g), f = S;
    }
    return b;
  };
}
function d1(e) {
  if (e % qo === o1) {
    const t = (e + Yt) / qo;
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
      const i = n.mul(s, Zr), o = n.pow(i, t), a = n.mul(s, o), u = n.mul(n.mul(a, Zr), o), f = n.mul(a, n.sub(u, n.ONE));
      if (!n.eql(n.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return c1(e);
}
const u1 = [
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
function _1(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = u1.reduce((n, s) => (n[s] = "function", n), t);
  return _s(e, r);
}
function h1(e, t, r) {
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
function l1(e, t) {
  const r = new Array(t.length), n = t.reduce((i, o, a) => e.is0(o) ? i : (r[a] = i, e.mul(i, o)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (r[a] = e.mul(i, r[a]), e.mul(i, o)), s), r;
}
function Yh(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function Hh(e, t, r = !1, n = {}) {
  if (e <= Ie)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Yh(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = d1(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: za(s),
    ZERO: Ie,
    ONE: Yt,
    create: (u) => Fe(u, e),
    isValid: (u) => {
      if (typeof u != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof u}`);
      return Ie <= u && u < e;
    },
    is0: (u) => u === Ie,
    isOdd: (u) => (u & Yt) === Yt,
    neg: (u) => Fe(-u, e),
    eql: (u, f) => u === f,
    sqr: (u) => Fe(u * u, e),
    add: (u, f) => Fe(u + f, e),
    sub: (u, f) => Fe(u - f, e),
    mul: (u, f) => Fe(u * f, e),
    pow: (u, f) => h1(a, u, f),
    div: (u, f) => Fe(u * $o(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (u) => u * u,
    addN: (u, f) => u + f,
    subN: (u, f) => u - f,
    mulN: (u, f) => u * f,
    inv: (u) => $o(u, e),
    sqrt: n.sqrt || ((u) => o(a, u)),
    invertBatch: (u) => l1(a, u),
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
function Zh(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Xh(e) {
  const t = Zh(e);
  return t + Math.ceil(t / 2);
}
function f1(e, t, r = !1) {
  const n = e.length, s = Zh(t), i = Xh(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const o = r ? qr(e) : Ua(e), a = Fe(o, t - Yt) + Yt;
  return r ? Ga(a, s) : Rn(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const p1 = BigInt(0), Io = BigInt(1), Eo = /* @__PURE__ */ new WeakMap(), b0 = /* @__PURE__ */ new WeakMap();
function A1(e, t) {
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
      for (; o > p1; )
        o & Io && (a = a.add(u)), u = u.double(), o >>= Io;
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
      let g = i, b = g;
      for (let v = 0; v < a; v++) {
        b = g, f.push(b);
        for (let S = 1; S < u; S++)
          b = b.add(g), f.push(b);
        g = b.double();
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
      let g = e.ZERO, b = e.BASE;
      const v = BigInt(2 ** i - 1), S = 2 ** i, Q = BigInt(i);
      for (let N = 0; N < u; N++) {
        const T = N * f;
        let F = Number(a & v);
        a >>= Q, F > f && (F -= S, a += Io);
        const Y = T, z = T + Math.abs(F) - 1, H = N % 2 !== 0, M = F < 0;
        F === 0 ? b = b.add(r(H, o[Y])) : g = g.add(r(M, o[z]));
      }
      return { p: g, f: b };
    },
    wNAFCached(i, o, a) {
      const u = b0.get(i) || 1;
      let f = Eo.get(i);
      return f || (f = this.precomputeWindow(i, u), u !== 1 && Eo.set(i, a(f))), this.wNAF(u, f, o);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(i, o) {
      n(o), b0.set(i, o), Eo.delete(i);
    }
  };
}
function g1(e, t, r, n) {
  if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  n.forEach((g, b) => {
    if (!t.isValid(g))
      throw new Error(`wrong scalar at index ${b}`);
  }), r.forEach((g, b) => {
    if (!(g instanceof e))
      throw new Error(`wrong point at index ${b}`);
  });
  const s = hh(BigInt(r.length)), i = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, o = (1 << i) - 1, a = new Array(o + 1).fill(e.ZERO), u = Math.floor((t.BITS - 1) / i) * i;
  let f = e.ZERO;
  for (let g = u; g >= 0; g -= i) {
    a.fill(e.ZERO);
    for (let v = 0; v < n.length; v++) {
      const S = n[v], Q = Number(S >> BigInt(g) & BigInt(o));
      a[Q] = a[Q].add(r[v]);
    }
    let b = e.ZERO;
    for (let v = a.length - 1, S = e.ZERO; v > 0; v--)
      S = S.add(a[v]), b = b.add(S);
    if (f = f.add(b), g !== 0)
      for (let v = 0; v < i; v++)
        f = f.double();
  }
  return f;
}
function Wh(e) {
  return _1(e.Fp), _s(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Yh(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function I0(e) {
  e.lowS !== void 0 && Cn("lowS", e.lowS), e.prehash !== void 0 && Cn("prehash", e.prehash);
}
function w1(e) {
  const t = Wh(e);
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
const { bytesToNumberBE: m1, hexToBytes: y1 } = xg, hr = {
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
      return m1(e);
    }
  },
  toSig(e) {
    const { Err: t, _int: r, _tlv: n } = hr, s = typeof e == "string" ? y1(e) : e;
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
function b1(e) {
  const t = w1(e), { Fp: r } = t, n = Hh(t.n, t.nBitLength), s = t.toBytes || ((N, T, F) => {
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
      if (tn(N) && (N = Bn(N)), typeof N != "string" || !T.includes(N.length))
        throw new Error("Invalid key");
      N = N.padStart(F * 2, "0");
    }
    let H;
    try {
      H = typeof N == "bigint" ? N : qr(Je("private key", N, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof N}`);
    }
    return Y && (H = Fe(H, z)), $r("private key", H, ye, z), H;
  }
  function f(N) {
    if (!(N instanceof v))
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
  }), b = Yo((N) => {
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
  class v {
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
      if (T instanceof v)
        throw new Error("projective point not allowed");
      const z = (H) => r.eql(H, r.ZERO);
      return z(F) && z(Y) ? v.ZERO : new v(F, Y, r.ONE);
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
      return T.map((Y, z) => Y.toAffine(F[z])).map(v.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(T) {
      const F = v.fromAffine(i(Je("pointHex", T)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(T) {
      return v.BASE.multiply(u(T));
    }
    // Multiscalar Multiplication
    static msm(T, F) {
      return g1(v, n, T, F);
    }
    // "Private method", don't use it directly
    _setWindowSize(T) {
      Q.setWindowSize(this, T);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      b(this);
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
      return new v(this.px, r.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: T, b: F } = t, Y = r.mul(F, E0), { px: z, py: H, pz: M } = this;
      let L = r.ZERO, G = r.ZERO, U = r.ZERO, k = r.mul(z, z), q = r.mul(H, H), X = r.mul(M, M), tt = r.mul(z, H);
      return tt = r.add(tt, tt), U = r.mul(z, M), U = r.add(U, U), L = r.mul(T, U), G = r.mul(Y, X), G = r.add(L, G), L = r.sub(q, G), G = r.add(q, G), G = r.mul(L, G), L = r.mul(tt, L), U = r.mul(Y, U), X = r.mul(T, X), tt = r.sub(k, X), tt = r.mul(T, tt), tt = r.add(tt, U), U = r.add(k, k), k = r.add(U, k), k = r.add(k, X), k = r.mul(k, tt), G = r.add(G, k), X = r.mul(H, M), X = r.add(X, X), k = r.mul(X, tt), L = r.sub(L, k), U = r.mul(X, q), U = r.add(U, U), U = r.add(U, U), new v(L, G, U);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(T) {
      f(T);
      const { px: F, py: Y, pz: z } = this, { px: H, py: M, pz: L } = T;
      let G = r.ZERO, U = r.ZERO, k = r.ZERO;
      const q = t.a, X = r.mul(t.b, E0);
      let tt = r.mul(F, H), B = r.mul(Y, M), d = r.mul(z, L), _ = r.add(F, Y), p = r.add(H, M);
      _ = r.mul(_, p), p = r.add(tt, B), _ = r.sub(_, p), p = r.add(F, z);
      let m = r.add(H, L);
      return p = r.mul(p, m), m = r.add(tt, d), p = r.sub(p, m), m = r.add(Y, z), G = r.add(M, L), m = r.mul(m, G), G = r.add(B, d), m = r.sub(m, G), k = r.mul(q, p), G = r.mul(X, d), k = r.add(G, k), G = r.sub(B, k), k = r.add(B, k), U = r.mul(G, k), B = r.add(tt, tt), B = r.add(B, tt), d = r.mul(q, d), p = r.mul(X, p), B = r.add(B, d), d = r.sub(tt, d), d = r.mul(q, d), p = r.add(p, d), tt = r.mul(B, p), U = r.add(U, tt), tt = r.mul(m, p), G = r.mul(_, G), G = r.sub(G, tt), tt = r.mul(_, B), k = r.mul(m, k), k = r.add(k, tt), new v(G, U, k);
    }
    subtract(T) {
      return this.add(T.negate());
    }
    is0() {
      return this.equals(v.ZERO);
    }
    wNAF(T) {
      return Q.wNAFCached(this, T, v.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(T) {
      $r("scalar", T, lr, t.n);
      const F = v.ZERO;
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
      return z && (G = G.negate()), M && (U = U.negate()), U = new v(r.mul(U.px, Y.beta), U.py, U.pz), G.add(U);
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
      $r("scalar", T, ye, Y);
      let z, H;
      if (F) {
        const { k1neg: M, k1: L, k2neg: G, k2: U } = F.splitScalar(T);
        let { p: k, f: q } = this.wNAF(L), { p: X, f: tt } = this.wNAF(U);
        k = Q.constTimeNegate(M, k), X = Q.constTimeNegate(G, X), X = new v(r.mul(X.px, F.beta), X.py, X.pz), z = k.add(X), H = q.add(tt);
      } else {
        const { p: M, f: L } = this.wNAF(T);
        z = M, H = L;
      }
      return v.normalizeZ([z, H])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(T, F, Y) {
      const z = v.BASE, H = (L, G) => G === lr || G === ye || !L.equals(z) ? L.multiplyUnsafe(G) : L.multiply(G), M = H(this, F).add(H(T, Y));
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
        return F(v, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: T, clearCofactor: F } = t;
      return T === ye ? this : F ? F(v, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(T = !0) {
      return Cn("isCompressed", T), this.assertValidity(), s(v, this, T);
    }
    toHex(T = !0) {
      return Cn("isCompressed", T), Bn(this.toRawBytes(T));
    }
  }
  v.BASE = new v(t.Gx, t.Gy, r.ONE), v.ZERO = new v(r.ZERO, r.ONE, r.ZERO);
  const S = t.nBitLength, Q = A1(v, t.endo ? Math.ceil(S / 2) : S);
  return {
    CURVE: t,
    ProjectivePoint: v,
    normPrivateKeyToScalar: u,
    weierstrassEquation: o,
    isWithinCurveOrder: a
  };
}
function I1(e) {
  const t = Wh(e);
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
function E1(e) {
  const t = I1(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function o(d) {
    return Fe(d, n);
  }
  function a(d) {
    return $o(d, n);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: f, weierstrassEquation: g, isWithinCurveOrder: b } = b1({
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
        let C;
        try {
          C = r.sqrt(E);
        } catch (I) {
          const J = I instanceof Error ? ": " + I.message : "";
          throw new Error("Point is not on curve" + J);
        }
        const w = (C & ye) === ye;
        return (p & 1) === 1 !== w && (C = r.neg(C)), { x: A, y: C };
      } else if (_ === i && p === 4) {
        const A = r.fromBytes(m.subarray(0, r.BYTES)), E = r.fromBytes(m.subarray(r.BYTES, 2 * r.BYTES));
        return { x: A, y: E };
      } else
        throw new Error(`Point of length ${_} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), v = (d) => Bn(Rn(d, t.nByteLength));
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
      return _ = Je("compactSignature", _, p * 2), new T(N(_, 0, p), N(_, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(_) {
      const { r: p, s: m } = hr.toSig(Je("DER", _));
      return new T(p, m);
    }
    assertValidity() {
      $r("r", this.r, ye, n), $r("s", this.s, ye, n);
    }
    addRecoveryBit(_) {
      return new T(this.r, this.s, _);
    }
    recoverPublicKey(_) {
      const { r: p, s: m, recovery: A } = this, E = L(Je("msgHash", _));
      if (A == null || ![0, 1, 2, 3].includes(A))
        throw new Error("recovery id invalid");
      const C = A === 2 || A === 3 ? p + t.n : p;
      if (C >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const w = A & 1 ? "03" : "02", h = u.fromHex(w + v(C)), I = a(C), J = o(-E * I), W = o(m * I), et = u.BASE.multiplyAndAddUnsafe(h, J, W);
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
      return v(this.r) + v(this.s);
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
      const d = Xh(t.n);
      return f1(t.randomBytes(d), t.n);
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
    const _ = tn(d), p = typeof d == "string", m = (_ || p) && d.length;
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
    return $r(`num < 2^${t.nBitLength}`, d, lr, G), Rn(d, t.nByteLength);
  }
  function k(d, _, p = q) {
    if (["recovered", "canonical"].some((it) => it in p))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: A } = t;
    let { lowS: E, prehash: C, extraEntropy: w } = p;
    E == null && (E = !0), d = Je("msgHash", d), I0(p), C && (d = Je("prehashed msgHash", m(d)));
    const h = L(d), I = f(_), J = [U(I), U(h)];
    if (w != null && w !== !1) {
      const it = w === !0 ? A(r.BYTES) : w;
      J.push(Je("extraEntropy", it));
    }
    const W = $n(...J), et = h;
    function nt(it) {
      const ot = M(it);
      if (!b(ot))
        return;
      const Mt = a(ot), ht = u.BASE.multiply(ot).toAffine(), dt = o(ht.x);
      if (dt === lr)
        return;
      const Dt = o(Mt * o(et + dt * I));
      if (Dt === lr)
        return;
      let At = (ht.x === dt ? 0 : 2) | Number(ht.y & ye), yt = Dt;
      return E && S(Dt) && (yt = Q(Dt), At ^= 1), new T(dt, yt, At);
    }
    return { seed: W, k2sig: nt };
  }
  const q = { lowS: t.lowS, prehash: !1 }, X = { lowS: t.lowS, prehash: !1 };
  function tt(d, _, p = q) {
    const { seed: m, k2sig: A } = k(d, _, p), E = t;
    return lh(E.hash.outputLen, E.nByteLength, E.hmac)(m, A);
  }
  u.BASE._setWindowSize(8);
  function B(d, _, p, m = X) {
    var ht;
    const A = d;
    if (_ = Je("msgHash", _), p = Je("publicKey", p), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    I0(m);
    const { lowS: E, prehash: C } = m;
    let w, h;
    try {
      if (typeof A == "string" || tn(A))
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
    C && (_ = t.hash(_));
    const { r: I, s: J } = w, W = L(_), et = a(J), nt = o(W * et), it = o(I * et), ot = (ht = u.BASE.multiplyAndAddUnsafe(h, nt, it)) == null ? void 0 : ht.toAffine();
    return ot ? o(ot.x) === I : !1;
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
function v1(e) {
  return {
    hash: e,
    hmac: (t, ...r) => bi(e, t, rp(...r)),
    randomBytes: sp
  };
}
function C1(e, t) {
  const r = (n) => E1({ ...e, ...v1(n) });
  return Object.freeze({ ...r(t), create: r });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const jh = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), v0 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), B1 = BigInt(1), Ko = BigInt(2), C0 = (e, t) => (e + t / Ko) / t;
function x1(e) {
  const t = jh, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), u = BigInt(88), f = e * e * e % t, g = f * f * e % t, b = Ue(g, r, t) * g % t, v = Ue(b, r, t) * g % t, S = Ue(v, Ko, t) * f % t, Q = Ue(S, s, t) * S % t, N = Ue(Q, i, t) * Q % t, T = Ue(N, a, t) * N % t, F = Ue(T, u, t) * T % t, Y = Ue(F, a, t) * N % t, z = Ue(Y, r, t) * g % t, H = Ue(z, o, t) * Q % t, M = Ue(H, n, t) * f % t, L = Ue(M, Ko, t);
  if (!ta.eql(ta.sqr(L), e))
    throw new Error("Cannot find square root");
  return L;
}
const ta = Hh(jh, void 0, void 0, { sqrt: x1 }), Cr = C1({
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
      const t = v0, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -B1 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, o = BigInt("0x100000000000000000000000000000000"), a = C0(i * e, t), u = C0(-n * e, t);
      let f = Fe(e - a * r - u * s, t), g = Fe(-a * n - u * i, t);
      const b = f > o, v = g > o;
      if (b && (f = t - f), v && (g = t - g), f > o || g > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: b, k1: f, k2neg: v, k2: g };
    }
  }
}, Lr);
BigInt(0);
Cr.ProjectivePoint;
var Xa = { exports: {} }, gn = typeof Reflect == "object" ? Reflect : null, B0 = gn && typeof gn.apply == "function" ? gn.apply : function(t, r, n) {
  return Function.prototype.apply.call(t, r, n);
}, Us;
gn && typeof gn.ownKeys == "function" ? Us = gn.ownKeys : Object.getOwnPropertySymbols ? Us = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Us = function(t) {
  return Object.getOwnPropertyNames(t);
};
function R1(e) {
  console && console.warn && console.warn(e);
}
var Jh = Number.isNaN || function(t) {
  return t !== t;
};
function Tt() {
  Tt.init.call(this);
}
Xa.exports = Tt;
Xa.exports.once = D1;
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
    if (typeof e != "number" || e < 0 || Jh(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    x0 = e;
  }
});
Tt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Tt.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Jh(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function qh(e) {
  return e._maxListeners === void 0 ? Tt.defaultMaxListeners : e._maxListeners;
}
Tt.prototype.getMaxListeners = function() {
  return qh(this);
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
    for (var f = u.length, g = rl(u, f), n = 0; n < f; ++n)
      B0(g[n], this, r);
  return !0;
};
function $h(e, t, r, n) {
  var s, i, o;
  if (Si(r), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    r.listener ? r.listener : r
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = r, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), s = qh(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, R1(a);
  }
  return e;
}
Tt.prototype.addListener = function(t, r) {
  return $h(this, t, r, !1);
};
Tt.prototype.on = Tt.prototype.addListener;
Tt.prototype.prependListener = function(t, r) {
  return $h(this, t, r, !0);
};
function S1() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Kh(e, t, r) {
  var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r }, s = S1.bind(n);
  return s.listener = r, n.wrapFn = s, s;
}
Tt.prototype.once = function(t, r) {
  return Si(r), this.on(t, Kh(this, t, r)), this;
};
Tt.prototype.prependOnceListener = function(t, r) {
  return Si(r), this.prependListener(t, Kh(this, t, r)), this;
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
    i === 0 ? n.shift() : N1(n, i), n.length === 1 && (s[t] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || r);
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
function tl(e, t, r) {
  var n = e._events;
  if (n === void 0)
    return [];
  var s = n[t];
  return s === void 0 ? [] : typeof s == "function" ? r ? [s.listener || s] : [s] : r ? T1(s) : rl(s, s.length);
}
Tt.prototype.listeners = function(t) {
  return tl(this, t, !0);
};
Tt.prototype.rawListeners = function(t) {
  return tl(this, t, !1);
};
Tt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : el.call(e, t);
};
Tt.prototype.listenerCount = el;
function el(e) {
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
function rl(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e[n];
  return r;
}
function N1(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function T1(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
    t[r] = e[r].listener || e[r];
  return t;
}
function D1(e, t) {
  return new Promise(function(r, n) {
    function s(o) {
      e.removeListener(t, i), n(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), r([].slice.call(arguments));
    }
    nl(e, t, i, { once: !0 }), t !== "error" && Q1(e, s, { once: !0 });
  });
}
function Q1(e, t, r) {
  typeof e.on == "function" && nl(e, "error", t, r);
}
function nl(e, t, r, n) {
  if (typeof e.on == "function")
    n.once ? e.once(t, r) : e.on(t, r);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      n.once && e.removeEventListener(t, s), r(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var sl = Xa.exports, F1 = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", O1 = class {
  constructor(e, t, r, n, s, i = 0) {
    O(this, "left");
    O(this, "right");
    O(this, "parent");
    O(this, "hash");
    O(this, "data");
    O(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, R0 = O1;
function M1(e) {
  return Ye("0x00".concat(e.slice(2)));
}
function L1(e, t) {
  return Ye("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function il(e) {
  if (!e.length)
    return F1;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = M1(e[i]);
    t.push(new R0(-1, -1, -1, o, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const o = i << 1, a = L1(r[o].hash, r[o + 1].hash);
      t[i] = new R0(r[o].index, r[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var k1 = "0x00", ol = "0x01";
function P1(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(Ye(t).slice(2));
  return [Ye(r), r];
}
function on(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Ye(r), r];
}
function vo(e) {
  const t = ol.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function U1(e) {
  const t = ol.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Co(e) {
  return e.slice(0, 4) === k1;
}
var G1 = class {
  constructor(e, t, r, n, s) {
    O(this, "SideNodes");
    O(this, "NonMembershipLeafData");
    O(this, "BitMask");
    O(this, "NumSideNodes");
    O(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, z1 = G1, V1 = class {
  constructor(e, t, r) {
    O(this, "SideNodes");
    O(this, "NonMembershipLeafData");
    O(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, Y1 = V1, Le = "0x0000000000000000000000000000000000000000000000000000000000000000", _r = 256;
function fn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function H1(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function Z1(e, t) {
  let r = 0;
  for (let n = 0; n < _r && fn(e, n) === fn(t, n); n += 1)
    r += 1;
  return r;
}
function X1(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Le ? t.push(0) : (r.push(n), t.push(1));
  return new z1(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var W1 = class {
  constructor() {
    O(this, "ms");
    O(this, "root");
    const e = {};
    this.ms = e, this.root = Le, this.ms[this.root] = Le;
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
    if (t === Le)
      return [r, Le, "", ""];
    let n = this.get(t);
    if (Co(n))
      return [r, t, n, ""];
    let s, i, o = "", a = "";
    for (let f = 0; f < _r; f += 1) {
      if ([s, i] = U1(n), fn(e, f) === 1 ? (a = s, o = i) : (a = i, o = s), r.push(a), o === Le) {
        n = "";
        break;
      }
      if (n = this.get(o), Co(n))
        break;
    }
    const u = this.get(a);
    return [H1(r), o, n, u];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Le)
      return this.root;
    const [s] = vo(n);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", u = "", f = !1;
    for (let g = 0; g < t.length; g += 1)
      if (t[g] !== "") {
        if (a = t[g], o === "")
          if (u = this.get(a), Co(u)) {
            i = a, o = a;
            continue;
          } else
            o = Le, f = !0;
        !f && a === Le || (f || (f = !0), fn(e, t.length - 1 - g) === 1 ? [i, o] = on(a, o) : [i, o] = on(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Le), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, o;
    this.set(Ye(t), t), [i, o] = P1(e, t), this.set(i, o), o = i;
    let a;
    if (n === Le)
      a = _r;
    else {
      const [u] = vo(s);
      a = Z1(e, u);
    }
    a !== _r && (fn(e, a) === 1 ? [i, o] = on(n, o) : [i, o] = on(o, n), this.set(i, o), o = i);
    for (let u = 0; u < _r; u += 1) {
      let f;
      const g = _r - r.length;
      if (u - g < 0 || r[u - g] === "")
        if (a !== _r && a > _r - 1 - u)
          f = Le;
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
    if (r !== Le) {
      const [u] = vo(n);
      u !== e && (o = n);
    }
    return new Y1(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return X1(t);
  }
}, j1 = Object.defineProperty, J1 = (e, t, r) => t in e ? j1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ot = (e, t, r) => (J1(e, typeof t != "symbol" ? t + "" : t, r), r), Wa = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, kt = (e, t, r) => (Wa(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Nr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, qe = (e, t, r, n) => (Wa(e, t, "write to private field"), t.set(e, r), r), ea = (e, t, r) => (Wa(e, t, "access private method"), r), ja = (e) => {
  let t, r, n;
  Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0);
  const s = R(r);
  return {
    assetId: $(t),
    amount: s.lt(1) ? R(1) : s,
    max: n ? R(n) : void 0
  };
}, q1 = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, al = st`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Ja = st`
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
    `, cl = st`
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
    ${Ja}`, $1 = st`
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
    `, dl = st`
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
    ${Ja}`, ul = st`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, qa = st`
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
    ${al}
${cl}
${$1}
${dl}
${ul}`, K1 = st`
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
    ${al}
${cl}
${dl}
${ul}`, Ni = st`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${K1}`, tE = st`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, eE = st`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${tE}`, rE = st`
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
    `, nE = st`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, sE = st`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${rE}
${nE}`, iE = st`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${sE}
${Ja}`, Ti = st`
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
    `, $a = st`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, oE = st`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, _l = st`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, aE = st`
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
    `, cE = st`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, dE = st`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, uE = st`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, _E = st`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, hE = st`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, lE = st`
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
    `, fE = st`
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
    ${lE}`, pE = st`
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
    ${cE}
${dE}
${uE}
${_E}
${hE}
${fE}`, hl = st`
    fragment chainInfoFragment on ChainInfo {
  name
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
}
    ${pE}`, AE = st`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Dn = st`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, ll = st`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, gE = st`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, wE = st`
    fragment transactionRawPayload on Transaction {
  id
  rawPayload
}
    `, mE = st`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, yE = st`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${ll}`, bE = st`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${hl}`, IE = st`
    query getChainAndNodeInfo {
  chain {
    ...chainInfoFragment
  }
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${hl}
${ll}`, EE = st`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Ni}`, vE = st`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Ni}`, CE = st`
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
    ${Ni}
${Dn}`, BE = st`
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
${Ni}`, xE = st`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${eE}`, RE = st`
    query getLatestBlock {
  chain {
    latestBlock {
      ...blockFragment
    }
  }
}
    ${Ti}`, SE = st`
    query getLatestBlockHeight {
  chain {
    latestBlock {
      height
    }
  }
}
    `, NE = st`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ti}`, TE = st`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionRawPayload
    }
  }
}
    ${Ti}
${wE}`, DE = st`
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
${Ti}`, QE = st`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${$a}`, FE = st`
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
${$a}`, OE = st`
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
${oE}`, ME = st`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, LE = st`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${AE}`, kE = st`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amount
  }
}
    `, PE = st`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, UE = st`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, GE = st`
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
    ${Dn}`, zE = st`
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
${_l}`, VE = st`
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
    ${aE}`, YE = st`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, HE = st`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${gE}`, ZE = st`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${iE}`, XE = st`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, WE = st`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, jE = st`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${_l}`, JE = st`
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
    `, qE = st`
    query getConsensusParametersVersion {
  chain {
    latestBlock {
      header {
        consensusParametersVersion
      }
    }
  }
}
    `, $E = st`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${qa}`, KE = st`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!) {
  submitAndAwaitStatus(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${qa}`, tv = st`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${qa}`;
function ev(e) {
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
    getChainAndNodeInfo(t, r) {
      return e(IE, t, r);
    },
    getTransaction(t, r) {
      return e(EE, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(vE, t, r);
    },
    getTransactions(t, r) {
      return e(CE, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(BE, t, r);
    },
    estimatePredicates(t, r) {
      return e(xE, t, r);
    },
    getLatestBlock(t, r) {
      return e(RE, t, r);
    },
    getLatestBlockHeight(t, r) {
      return e(SE, t, r);
    },
    getBlock(t, r) {
      return e(NE, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(TE, t, r);
    },
    getBlocks(t, r) {
      return e(DE, t, r);
    },
    getCoin(t, r) {
      return e(QE, t, r);
    },
    getCoins(t, r) {
      return e(FE, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(OE, t, r);
    },
    getContract(t, r) {
      return e(ME, t, r);
    },
    getContractBalance(t, r) {
      return e(LE, t, r);
    },
    getBalance(t, r) {
      return e(kE, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(PE, t, r);
    },
    estimateGasPrice(t, r) {
      return e(UE, t, r);
    },
    getBalances(t, r) {
      return e(GE, t, r);
    },
    getMessages(t, r) {
      return e(zE, t, r);
    },
    getMessageProof(t, r) {
      return e(VE, t, r);
    },
    getMessageStatus(t, r) {
      return e(YE, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(HE, t, r);
    },
    dryRun(t, r) {
      return e(ZE, t, r);
    },
    submit(t, r) {
      return e(XE, t, r);
    },
    produceBlocks(t, r) {
      return e(WE, t, r);
    },
    getMessageByNonce(t, r) {
      return e(jE, t, r);
    },
    isUserAccount(t, r) {
      return e(JE, t, r);
    },
    getConsensusParametersVersion(t, r) {
      return e(qE, t, r);
    },
    submitAndAwait(t, r) {
      return e($E, t, r);
    },
    submitAndAwaitStatus(t, r) {
      return e(KE, t, r);
    },
    statusChange(t, r) {
      return e(tv, t, r);
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
        query: Ch(r),
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
}, fl = Gs;
Ot(fl, "textDecoder", new TextDecoder());
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
    t.utxos.forEach((s) => n.utxos.add($(s))), t.messages.forEach((s) => n.messages.add($(s))), vr.set(e, n);
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
}, rv = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Bt.Coin: {
      const r = K(e.predicate ?? "0x"), n = K(e.predicateData ?? "0x");
      return {
        type: Bt.Coin,
        txID: $(K(e.id).slice(0, gr)),
        outputIndex: Rr(K(e.id).slice(gr, Xs)),
        owner: $(e.owner),
        amount: R(e.amount),
        assetId: $(e.assetId),
        txPointer: {
          blockHeight: Rr(K(e.txPointer).slice(0, 8)),
          txIndex: Rr(K(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: R(e.predicateGasUsed),
        predicateLength: R(r.length),
        predicateDataLength: R(n.length),
        predicate: $(r),
        predicateData: $(n)
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
          blockHeight: Rr(K(e.txPointer).slice(0, 8)),
          txIndex: Rr(K(e.txPointer).slice(8, 16))
        },
        contractID: $(e.contractId)
      };
    case Bt.Message: {
      const r = K(e.predicate ?? "0x"), n = K(e.predicateData ?? "0x"), s = K(e.data ?? "0x");
      return {
        type: Bt.Message,
        sender: $(e.sender),
        recipient: $(e.recipient),
        amount: R(e.amount),
        nonce: $(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: R(e.predicateGasUsed),
        predicateLength: R(r.length),
        predicateDataLength: R(n.length),
        predicate: $(r),
        predicateData: $(n),
        data: $(s),
        dataLength: s.length
      };
    }
    default:
      throw new x(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, nv = (e) => {
  const { type: t } = e;
  switch (t) {
    case vt.Coin:
      return {
        type: vt.Coin,
        to: $(e.to),
        amount: R(e.amount),
        assetId: $(e.assetId)
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
        to: $(e.to),
        amount: R(0),
        assetId: $(e.assetId)
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
        contractId: $(e.contractId),
        stateRoot: $(e.stateRoot)
      };
    default:
      throw new x(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, N0 = (e) => !("data" in e), sB = (e) => "utxoId" in e, iB = (e) => "recipient" in e, sv = (e) => "id" in e, oB = (e) => "recipient" in e, iv = (e) => e.type === pt.Revert && e.val.toString("hex") === Dh, ov = (e) => e.type === pt.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", T0 = (e) => e.reduce(
  (t, r) => (iv(r) && t.missingOutputVariables.push(r), ov(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Nt = (e) => e || Qt;
function av(e) {
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
      const r = Nt(e.sender), n = Nt(e.recipient), s = Nt(e.nonce), i = R(e.amount), o = e.data ? K(e.data) : Uint8Array.from([]), a = Nt(e.digest), u = R(e.len).toNumber(), f = Fr.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: $(o)
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
      const r = Nt(e.id || e.contractId), n = Nt(e.subId), s = qn(r, n);
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
      const r = Nt(e.id || e.contractId), n = Nt(e.subId), s = qn(r, n);
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
var cv = "https://app.fuel.network", dv = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, aB = (e = {}) => {
  const { blockExplorerUrl: t, path: r, providerUrl: n, address: s, txId: i, blockNumber: o } = e, a = t || cv, u = [
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
  const b = g ? dv(
    f[0].key,
    f[0].value
  ) : "", v = /^\/|\/$/gm, S = r ? r.replace(v, "") : b, Q = a.replace(v, ""), N = n == null ? void 0 : n.replace(v, ""), T = N ? encodeURIComponent(N) : void 0, F = Q.match(/^https?:\/\//) ? "" : "https://", Y = N != null && N.match(/^https?:\/\//) ? "" : "https://";
  return `${F}${Q}/${S}${T ? `?providerUrl=${Y}${T}` : ""}`;
}, Di = (e) => e.filter(
  (n) => n.type === pt.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), R(0));
function Se(e, t) {
  const r = R(t.base);
  let n = R(0);
  return "unitsPerGas" in t ? n = R(e).div(R(t.unitsPerGas)) : n = R(e).mul(R(t.gasPerUnit)), r.add(n);
}
function uv(e, t, r) {
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
    i.add(Se(K(u.predicate).length, r.contractRoot)).add(R(u.predicateGasUsed))
  ) : a.add(r.ecr1), R(0));
}
function pl(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, o = Se(i, t.vmInitialization), a = R(i).mul(r), u = uv(n, i, t);
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
function Al({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = Se(n, e.contractRoot), i = Se(t, e.stateRoot), o = Se(r, e.s256), a = R(100), u = Se(a, e.s256);
  return s.add(i).add(o).add(u).maxU64();
}
function gl({
  gasCosts: e,
  txBytesSize: t
}) {
  return Se(t, e.s256);
}
function _v({
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
function hv({
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
function lv({
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
        e[t] = $(e[t]);
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
function fv(e) {
  return ra(xe(e));
}
var pv = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return Kw.includes(e) && (r = `${r}

You can read more about this error at:

${tm}#variant.${e}`), new x(D.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, Gn = (e) => JSON.stringify(e, null, 2), Av = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === pt.Revert);
  let i = "";
  if (s) {
    const o = R(s.val).toHex(), a = t[t.length - 1], u = t[t.length - 2];
    switch (o) {
      case jw: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Gn(a) : "an error."}.`;
        break;
      }
      case Jw: {
        const f = t.length >= 2 ? ` comparing ${Gn(a)} and ${Gn(u)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${f}`;
        break;
      }
      case $w: {
        const f = t.length >= 2 ? ` comparing ${Gn(u)} and ${Gn(a)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${f}`;
        break;
      }
      case qw:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Dh:
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
  return s ? pv(r, o) : Av(t, n, o);
}, cB = class extends Error {
  constructor() {
    super(...arguments);
    O(this, "name", "ChangeOutputCollisionError");
    O(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, gv = class extends Error {
  constructor(t) {
    super();
    O(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, dB = class extends Error {
  constructor(t) {
    super();
    O(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, nn = (e) => e.type === Bt.Coin, ec = (e) => e.type === Bt.Message, wl = (e) => e.type === Bt.Message && R(e.data).isZero(), ml = (e) => nn(e) || ec(e), rn = (e) => nn(e) || wl(e), yl = (e) => nn(e) ? e.owner : e.recipient, na = (e, t) => yl(e) === t.toB256(), wv = (e, t, r) => e.filter(rn).reduce((n, s) => nn(s) && s.assetId === t || ec(s) && t === r ? n.add(s.amount) : n, R(0)), uB = (e) => e.filter(rn).reduce(
  (t, r) => (nn(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), mv = (e, t) => e.reduce(
  (r, n) => (nn(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : ec(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), yv = (e) => {
  const t = K(e);
  return {
    data: $(t),
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(rv)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(nv)) ?? [], r = ((a = this.witnesses) == null ? void 0 : a.map(yv)) ?? [], { policyTypes: n, policies: s } = Qn.getPolicyMeta(this);
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
      throw new gv(e);
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
          return $(n.owner) === t.toB256();
        case Bt.Message:
          return $(n.recipient) === t.toB256();
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
    return sv(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      (n) => $(n.assetId) === t
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
    return pl({
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
      i === t && (u = R("1000000000000000000")), a && "assetId" in a ? (a.id = $(Ve(Xs)), a.amount = u) : this.addResources([
        {
          id: $(Ve(Xs)),
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
    return fv(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(rn).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(ml);
    this.inputs.filter(rn).forEach((r) => {
      const n = yl(r), s = t.find(
        (i) => na(i, ft.fromString(String(n)))
      );
      s && "predicateGasUsed" in s && R(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
};
function ws(e, t) {
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
  const n = AA(t), s = ct([n, new Ar().encode(r)]);
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
    return ws(this, t);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(t) {
    return _v({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, bv = (e) => {
  const t = new Uint8Array(32);
  return t.set(K(e)), t;
}, Iv = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: $(t),
    value: $(bv(r))
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
    this.bytecodeWitnessIndex = t ?? 0, this.salt = $(r ?? Qt), this.storageSlots = [...n ?? []];
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
    const t = this.getBaseTransaction(), r = this.bytecodeWitnessIndex, n = ((s = this.storageSlots) == null ? void 0 : s.map(Iv)) ?? [];
    return {
      type: xt.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: R(n.length),
      salt: this.salt ? $(this.salt) : Qt,
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
    return ws(this, t);
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
    return Al({
      contractBytesSize: R(K(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
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
  bytes: K("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Ev = {
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
  bytes: K("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, jr = class extends Qn {
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
    this.gasLimit = R(n), this.script = K(t ?? Q0.bytes), this.scriptData = K(r ?? Q0.encodeScriptData()), this.abis = s.abis;
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
    const t = K(this.script ?? "0x"), r = K(this.scriptData ?? "0x");
    return {
      type: xt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: R(t.length),
      scriptDataLength: R(r.length),
      receiptsRoot: Qt,
      script: $(t),
      scriptData: $(r)
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
    return ws(this, t);
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
    return gl({
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
      type: ze.ConsensusParameters,
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
      type: ze.ConsensusParameters,
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
      type: ze.StateTransition,
      data: $(t)
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
    return t === ze.ConsensusParameters && this.addConsensusParametersUpgradePurpose(r), t === ze.StateTransition && this.addStateTransitionUpgradePurpose(r), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let t;
    if (this.upgradePurpose.type === ze.ConsensusParameters)
      t = {
        type: ze.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === ze.StateTransition)
      t = {
        type: ze.StateTransition,
        data: {
          bytecodeRoot: $(this.upgradePurpose.data)
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
    return ws(this, t);
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
    if (this.upgradePurpose.type === ze.ConsensusParameters) {
      const n = this.bytecodeWitnessIndex, s = this.witnesses[n].length;
      return D0({
        gasCosts: t,
        txBytesSize: r,
        consensusSize: s
      });
    }
    if (this.upgradePurpose.type === ze.StateTransition)
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
    return ws(this, t);
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
      root: $(s),
      proofSet: i.map($),
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
    return hv({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      subsectionSize: K(this.witnesses[this.witnessIndex]).length,
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
    return lv({
      gasCosts: n,
      baseMinGas: r.toNumber(),
      subsectionSize: K(s).length
    });
  }
}, Ne = (e) => {
  if (e instanceof jr || e instanceof ia || e instanceof sa || e instanceof oa || e instanceof aa)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case xt.Script:
      return jr.from(e);
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
}, zr = (e) => e.type === xt.Script, vv = (e) => e.type === xt.Create, _B = (e) => e.type === xt.Blob, hB = (e) => e.type === xt.Upgrade, lB = (e) => e.type === xt.Upload, Cv = (e) => {
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
  const u = R(o.gasPerByte), f = R(o.gasPriceFactor), g = K(r), [b] = new Ar().decode(g, 0), { type: v, witnesses: S, inputs: Q, policies: N } = b;
  let T = R(0), F = R(0);
  if (v !== xt.Create && v !== xt.Script)
    return R(0);
  if (v === xt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: k } = b, q = R(K(S[U].data).length);
    T = Al({
      contractBytesSize: q,
      gasCosts: i,
      stateRootSize: k.length || 0,
      txBytesSize: g.length
    });
  } else {
    const { scriptGasLimit: U } = b;
    U && (F = U), T = gl({
      gasCosts: i,
      txBytesSize: g.length
    });
  }
  const Y = pl({
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
}, Bv = ({ abi: e, receipt: t }) => {
  var g;
  const r = new wr(e), n = t.param1.toHex(8), s = r.getFunction(n), i = s.jsonFn.inputs, o = t.param2.toHex();
  let a;
  const u = s.decodeArguments(o);
  return u && (a = i.reduce((b, v, S) => {
    const Q = u[S], N = v.name;
    return N ? {
      ...b,
      // reparse to remove bn
      [N]: JSON.parse(JSON.stringify(Q))
    } : b;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: a,
    ...(g = t.amount) != null && g.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function xv(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function rc(e, t) {
  return e.filter((r) => r.type === t);
}
function Rv(e) {
  return rc(e, Bt.Coin);
}
function Sv(e) {
  return rc(e, Bt.Message);
}
function bl(e) {
  return xv(e, [Bt.Coin, Bt.Message]);
}
function F0(e) {
  return e.type === Bt.Coin;
}
function Nv(e) {
  return rc(e, Bt.Contract);
}
function Tv(e, t) {
  return Rv(e).find((n) => n.assetId === t);
}
function Dv(e, t) {
  const r = /* @__PURE__ */ new Map();
  return bl(e).forEach((n) => {
    const s = F0(n) ? n.assetId : t, i = F0(n) ? n.owner : n.recipient;
    let o = r.get(s);
    o || (o = /* @__PURE__ */ new Map(), r.set(s, o));
    let a = o.get(i);
    a || (a = new Gt(0), o.set(i, a)), o.set(i, a.add(n.amount));
  }), r;
}
function Qv(e) {
  var t;
  return (t = Sv(e)) == null ? void 0 : t[0];
}
function Il(e, t, r = !1) {
  const n = Tv(e, t);
  if (n)
    return n;
  if (r)
    return Qv(e);
}
function Fv(e, t) {
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
function ms(e, t) {
  return e.filter((r) => r.type === t);
}
function Ov(e) {
  return ms(e, vt.ContractCreated);
}
function El(e) {
  return ms(e, vt.Coin);
}
function Mv(e) {
  return ms(e, vt.Change);
}
function Lv(e) {
  return ms(e, vt.Contract);
}
function fB(e) {
  return ms(e, vt.Variable);
}
var kv = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(kv || {}), ca = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(ca || {}), Pv = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Pv || {}), Uv = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Uv || {}), Gv = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Gv || {});
function es(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function vl(e) {
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
  return vl(e) === t;
}
function zv(e) {
  return Fn(
    e,
    "Mint"
    /* Mint */
  );
}
function Cl(e) {
  return Fn(
    e,
    "Create"
    /* Create */
  );
}
function Bl(e) {
  return Fn(
    e,
    "Script"
    /* Script */
  );
}
function Vv(e) {
  return Fn(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function Yv(e) {
  return Fn(
    e,
    "Upload"
    /* Upload */
  );
}
function Hv(e) {
  return Fn(
    e,
    "Blob"
    /* Blob */
  );
}
function pB(e) {
  return (t) => e.assetId === t.assetId;
}
function Zv(e) {
  return es(e, pt.Call);
}
function Xv(e) {
  return es(e, pt.MessageOut);
}
function Wv(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const o = s.get(i.assetId);
    o ? o.amount = R(o.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function jv(e, t) {
  var r, n, s, i, o, a, u, f;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((u = e.to) == null ? void 0 : u.type) === ((f = t.to) == null ? void 0 : f.type);
}
function Jv(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? Wv(e, t) : t.assetsSent : e.assetsSent;
}
function qv(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function $v(e, t) {
  return {
    ...e,
    assetsSent: Jv(e, t),
    calls: qv(e, t)
  };
}
function rs(e, t) {
  const r = e.findIndex((n) => jv(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? $v(n, t) : n);
}
function AB(e) {
  return es(e, pt.TransferOut);
}
function Kv({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return Xv(t).reduce(
    (i, o) => {
      const a = Il(e, r, !0);
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
function t2(e, t, r, n, s) {
  const i = t == null ? void 0 : t[e.contractID];
  return i ? [
    Bv({
      abi: i,
      receipt: r,
      rawPayload: n,
      maxInputs: s
    })
  ] : [];
}
function e2(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function r2(e, t, r, n, s, i, o) {
  const a = e.assetId === Qt ? o : e.assetId, u = Il(r, a, a === o);
  if (!u)
    return [];
  const f = nc(u), g = t2(t, n, e, s, i);
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
      assetsSent: e2(e),
      calls: g
    }
  ];
}
function n2({
  inputs: e,
  outputs: t,
  receipts: r,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: o
}) {
  const a = Zv(r);
  return Lv(t).flatMap((f) => {
    const g = Fv(e, f.inputIndex);
    return g ? a.filter((b) => b.to === g.contractID).flatMap(
      (b) => r2(
        b,
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
function s2(e, t, r) {
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
function i2({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = El(t), o = Nv(e), a = Mv(t), u = Dv(e, n);
  i.forEach(({ amount: b, assetId: v, to: S }) => {
    const Q = u.get(v) || /* @__PURE__ */ new Map();
    let N, T;
    for (const [F, Y] of Q)
      if (T || (T = F), Y.gte(b)) {
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
      assetsSent: [{ assetId: v, amount: b }]
    }));
  });
  const f = es(
    r,
    pt.Transfer
  ), g = es(
    r,
    pt.TransferOut
  );
  return [...f, ...g].forEach((b) => {
    const v = s2(b, o, a);
    s = rs(s, v);
  }), s;
}
function o2(e) {
  return El(e).reduce((n, s) => rs(n, {
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
function a2({ inputs: e, outputs: t }) {
  const r = Ov(t), n = bl(e)[0], s = nc(n);
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
function c2({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: a
}) {
  return Cl(e) ? [...a2({ inputs: t, outputs: r })] : Bl(e) ? [
    ...i2({ inputs: t, outputs: r, receipts: n, baseAssetId: a }),
    ...n2({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: o,
      baseAssetId: a
    }),
    ...Kv({ inputs: t, receipts: n, baseAssetId: a })
  ] : [...o2(r)];
}
var Tr = (e) => av(e), d2 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === pt.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, u2 = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === pt.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, _2 = (e) => {
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
}, h2 = (e) => {
  let t, r, n, s, i, o = !1, a = !1, u = !1;
  if (e != null && e.type)
    switch (n = _2(e.type), e.type) {
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
function Qi(e) {
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
    maxGasPerTx: b,
    gasPrice: v,
    baseAssetId: S
  } = e, Q = Di(r), N = $(o), T = c2({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: N,
    abiMap: u,
    maxInputs: f,
    baseAssetId: S
  }), F = vl(i.type), Y = R((p = (_ = i.policies) == null ? void 0 : _.find((m) => m.type === je.Tip)) == null ? void 0 : p.data), { isStatusFailure: z, isStatusPending: H, isStatusSuccess: M, blockId: L, status: G, time: U, totalFee: k } = h2(a), q = Cv({
    totalFee: k,
    gasPrice: v,
    rawPayload: N,
    tip: Y,
    consensusParameters: {
      gasCosts: g,
      maxGasPerTx: b,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), X = d2(r), tt = u2(r);
  let B;
  return U && (B = ya.fromTai64(U)), {
    id: t,
    tip: Y,
    fee: q,
    gasUsed: Q,
    operations: T,
    type: F,
    blockId: L,
    time: U,
    status: G,
    receipts: r,
    mintedAssets: X,
    burnedAssets: tt,
    isTypeMint: zv(i.type),
    isTypeCreate: Cl(i.type),
    isTypeScript: Bl(i.type),
    isTypeUpgrade: Vv(i.type),
    isTypeUpload: Yv(i.type),
    isTypeBlob: Hv(i.type),
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
function l2(e) {
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
        return $f();
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
          txPointer: Kr.decodeFromGqlScalar(o.txPointer)
        };
      }
      return n;
    }), r.outputs = l2(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
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
      bytes: K(e.rawPayload)
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
      K(e.rawPayload),
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
    var b;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: o } = this.provider.getGasConfig(), a = await this.provider.getLatestGasPrice(), u = this.provider.getChain().consensusParameters.txParameters.maxInputs, f = this.provider.getBaseAssetId();
    return Qi({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((b = this.gqlTransaction) == null ? void 0 : b.status),
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
function f2(e, t) {
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
function xl(e, t, r = 0) {
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
      const u = f2(t, a);
      return await Yf(u), xl(e, t, a)(...n);
    }
  };
}
var p2 = (e, t) => {
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
}, O0 = 10, M0 = 512, A2 = 60, g2 = 5, w2 = 2e4, m2 = 1.2, L0 = (e) => {
  const { name: t, daHeight: r, consensusParameters: n } = e, {
    contractParams: s,
    feeParams: i,
    predicateParams: o,
    scriptParams: a,
    txParams: u,
    gasCosts: f,
    baseAssetId: g,
    chainId: b,
    version: v
  } = n;
  return {
    name: t,
    baseChainHeight: R(r),
    consensusParameters: {
      version: v,
      chainId: R(b),
      baseAssetId: g,
      feeParameters: {
        version: i.version,
        gasPerByte: R(i.gasPerByte),
        gasPriceFactor: R(i.gasPriceFactor)
      },
      contractParameters: {
        version: s.version,
        contractMaxSize: R(s.contractMaxSize),
        maxStorageSlots: R(s.maxStorageSlots)
      },
      txParameters: {
        version: u.version,
        maxInputs: R(u.maxInputs),
        maxOutputs: R(u.maxOutputs),
        maxWitnesses: R(u.maxWitnesses),
        maxGasPerTx: R(u.maxGasPerTx),
        maxSize: R(u.maxSize),
        maxBytecodeSubsections: R(u.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: o.version,
        maxPredicateLength: R(o.maxPredicateLength),
        maxPredicateDataLength: R(o.maxPredicateDataLength),
        maxGasPerPredicate: R(o.maxGasPerPredicate),
        maxMessageDataLength: R(o.maxMessageDataLength)
      },
      scriptParameters: {
        version: a.version,
        maxScriptLength: R(a.maxScriptLength),
        maxScriptDataLength: R(a.maxScriptDataLength)
      },
      gasCosts: f
    }
  };
}, ua, Rl, De = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    Nr(this, ua), Ot(this, "operations"), Ot(this, "cache"), Ot(this, "url"), Ot(this, "urlWithoutAuth"), Ot(this, "consensusParametersTimestamp"), Ot(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0
    });
    const { url: r, urlWithoutAuth: n, headers: s } = De.extractBasicAuth(e);
    this.url = r, this.urlWithoutAuth = n, this.url = e;
    const { FUELS: i } = i_, o = { ...s, ...t.headers, Source: `ts-sdk-${i}` };
    this.options = {
      ...this.options,
      ...t,
      headers: o
    }, this.operations = this.createOperations();
    const { resourceCacheTTL: a } = this.options;
    Mr(a) ? a !== -1 ? this.cache = new S0(a) : this.cache = void 0 : this.cache = new S0(w2);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    De.nodeInfoCache = {}, De.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r, headers: n } = e;
    return xl(async (...s) => {
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
    const r = new De(e, t);
    return await r.fetchChainAndNodeInfo(), r;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = De.chainInfoCache[this.urlWithoutAuth];
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
    const e = De.nodeInfoCache[this.urlWithoutAuth];
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
    const { url: r, urlWithoutAuth: n, headers: s } = De.extractBasicAuth(e);
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
        maxDepth: R(s.nodeInfo.maxDepth),
        maxTx: R(s.nodeInfo.maxTx),
        nodeVersion: s.nodeInfo.nodeVersion,
        utxoValidation: s.nodeInfo.utxoValidation,
        vmBacktrace: s.nodeInfo.vmBacktrace
      }, De.ensureClientVersionIsSupported(t), r = L0(s.chain), De.chainInfoCache[this.urlWithoutAuth] = r, De.nodeInfoCache[this.urlWithoutAuth] = t, this.consensusParametersTimestamp = Date.now();
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
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = af(e.nodeVersion);
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
    const e = De.getFetchFn(this.options), t = new Uw.GraphQLClient(this.urlWithoutAuth, {
      fetch: (s, i) => e(s, i, this.options),
      responseMiddleware: (s) => {
        if ("response" in s) {
          const i = s.response;
          if (Array.isArray(i == null ? void 0 : i.errors))
            for (const o of i.errors)
              p2(o.message, o);
        }
      }
    }), r = (s, i) => {
      const o = s.definitions.find((u) => u.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? fl.create({
        url: this.urlWithoutAuth,
        query: s,
        fetchFn: (u, f) => e(u, f, this.options),
        variables: i
      }) : t.request(s, i);
    }, n = (s) => ({
      getBlobs(i) {
        const o = i.blobIds.map((g, b) => `$blobId${b}: BlobId!`).join(", "), a = i.blobIds.map((g, b) => `blob${b}: blob(id: $blobId${b}) { id }`).join(`
`), u = i.blobIds.reduce(
          (g, b, v) => (g[`blobId${v}`] = b, g),
          {}
        ), f = st`
          query getBlobs(${o}) {
            ${a}
          }
        `;
        return s(f, u);
      }
    });
    return { ...ev(r), ...n(r) };
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
    return R(e);
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
    return De.nodeInfoCache[this.urlWithoutAuth] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = L0(e);
    return De.chainInfoCache[this.urlWithoutAuth] = t, t;
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
    if (R(e.inputs.length).gt(t))
      throw new x(
        D.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${e.inputs.length}, max inputs: ${t}`
      );
    if (R(e.outputs.length).gt(r))
      throw new x(
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
    const r = Ne(e);
    t && await this.estimateTxDependencies(r), this.validateTransaction(r);
    const n = $(r.toTransactionBytes());
    let s;
    zr(r) && (s = r.abis);
    const i = await this.operations.submitAndAwaitStatus({ encodedTransaction: n });
    return ea(this, ua, Rl).call(this, r.inputs, r.getTransactionId(this.getChainId())), new da(r, this, s, i);
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
    const s = $(n.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
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
      (i) => "predicate" in i && i.predicate && !_h(K(i.predicate), K("0x")) && new Gt(i.predicateGasUsed).isZero()
    ))
      return e;
    const r = $(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
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
    if (vv(e))
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const r = [];
    let n = 0, s;
    this.validateTransaction(e);
    for (let i = 0; i < O0; i++) {
      const {
        dryRun: [{ receipts: o, status: a }]
      } = await this.operations.dryRun({
        encodedTransactions: [$(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(Tr), s = a;
      const { missingOutputVariables: u, missingOutputContractIds: f } = T0(t);
      if ((u.length !== 0 || f.length !== 0) && zr(e)) {
        n += u.length, e.addVariableOutputs(u.length), f.forEach(({ contractId: v }) => {
          e.addContractInputAndOutput(ft.fromString(v)), r.push(v);
        });
        const { maxFee: b } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = b;
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
      zr(o) && n.set(a, $(o.toTransactionBytes()));
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
        const g = s[f], { receipts: b, status: v } = a.dryRun[f], S = t[g];
        S.receipts = b.map(Tr), S.dryRunStatus = v;
        const { missingOutputVariables: Q, missingOutputContractIds: N } = T0(
          S.receipts
        ), T = Q.length > 0 || N.length > 0, F = r[g];
        if (T && zr(F)) {
          S.outputVariables += Q.length, F.addVariableOutputs(Q.length), N.forEach(({ contractId: z }) => {
            F.addContractInputAndOutput(ft.fromString(z)), S.missingContractIds.push(z);
          });
          const { maxFee: Y } = await this.estimateTxGasAndFee({
            transactionRequest: F
          });
          F.maxFee = Y, n.set(g, $(F.toTransactionBytes())), u.push(g);
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
    const n = e.map((o) => $(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
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
    r || (r = await this.estimateGasPrice(10));
    const a = wn({
      gasPrice: R(r),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let u = R(0);
    zr(t) && (u = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
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
    const n = [$(r.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
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
    const r = xe(Ne(e)), n = r.maxFee.eq(0), s = zr(r);
    s && (r.gasLimit = R(0));
    const i = xe(r);
    let o = 0;
    if (t && zr(i)) {
      const Y = i.witnesses.length;
      await t(i), o = i.witnesses.length - Y;
    }
    await this.estimatePredicates(i), r.updatePredicateGasUsed(i.inputs);
    let { maxFee: a, maxGas: u, minFee: f, minGas: g, gasPrice: b, gasLimit: v } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), S = [], Q, N = [], T = 0, F = R(0);
    if (r.maxFee = a, s) {
      if (r.gasLimit = v, t && await t(r), { receipts: S, missingContractIds: N, outputVariables: T, dryRunStatus: Q } = await this.estimateTxDependencies(r), Q && "reason" in Q)
        throw this.extractDryRunError(r, S, Q);
      const { maxGasPerTx: Y } = this.getGasConfig(), z = Di(S);
      F = R(z.muln(m2)).max(Y.sub(g)), r.gasLimit = F, { maxFee: a, maxGas: u, minFee: f, minGas: g, gasPrice: b } = await this.estimateTxGasAndFee({
        transactionRequest: r,
        gasPrice: b
      });
    }
    return {
      receipts: S,
      gasUsed: F,
      gasPrice: b,
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
      filter: { owner: n.toB256(), assetId: t && $(t) }
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
      messages: ((u = r == null ? void 0 : r.messages) == null ? void 0 : u.map((g) => $(g))) || [],
      utxos: ((f = r == null ? void 0 : r.utxos) == null ? void 0 : f.map((g) => $(g))) || []
    };
    if (this.cache) {
      const g = this.cache.getActiveData();
      s.messages.push(...g.messages), s.utxos.push(...g.utxos);
    }
    const i = {
      owner: n.toB256(),
      queryPerAsset: t.map(ja).map(({ assetId: g, amount: b, max: v }) => ({
        assetId: $(g),
        amount: b.toString(10),
        max: v ? v.toString(10) : void 0
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
    if (e === "latest") {
      const {
        chain: { latestBlock: o }
      } = await this.operations.getLatestBlock();
      t = o;
    } else {
      const a = typeof e == "string" && e.length === 66 ? { blockId: e } : { height: R(e).toString(10) };
      t = (await this.operations.getBlock(a)).block;
    }
    if (!t)
      return null;
    const { header: r, height: n, id: s, transactions: i } = t;
    return {
      id: s,
      height: R(n),
      time: r.time,
      header: {
        applicationHash: r.applicationHash,
        daHeight: R(r.daHeight),
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
      ...this.validatePaginationArgs({
        paginationLimit: g2,
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
          return (s = new Ar().decode(K(n.rawPayload), 0)) == null ? void 0 : s[0];
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
        K(t.rawPayload),
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
    } = await this.operations.getTransactions({
      ...this.validatePaginationArgs({
        inputArgs: e,
        paginationLimit: A2
      })
    }), n = new Ar();
    return { transactions: t.map(({ node: { rawPayload: i } }) => {
      try {
        return n.decode(K(i), 0)[0];
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
      asset: $(t)
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
      assetId: $(t)
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
      recipient: b,
      amount: v,
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
      recipient: ft.fromAddressOrString(b),
      nonce: t,
      amount: R(v),
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
}, Ai = De;
ua = /* @__PURE__ */ new WeakSet();
Rl = function(e, t) {
  if (!this.cache)
    return;
  const r = e.reduce(
    (n, s) => (s.type === Bt.Coin ? n.utxos.push(s.id) : s.type === Bt.Message && n.messages.push(s.nonce), n),
    { utxos: [], messages: [] }
  );
  this.cache.set(t, r);
};
Ot(Ai, "chainInfoCache", {});
Ot(Ai, "nodeInfoCache", {});
async function gB(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new x(
      D.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Ar().decode(
    K(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const a = o.map(Tr), {
    consensusParameters: {
      feeParameters: { gasPerByte: u, gasPriceFactor: f },
      txParameters: { maxInputs: g, maxGasPerTx: b },
      gasCosts: v
    }
  } = r.getChain(), S = await r.getLatestGasPrice(), Q = r.getBaseAssetId();
  return {
    ...Qi({
      id: s.id,
      receipts: a,
      transaction: i,
      transactionBytes: K(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: R(u),
      gasPriceFactor: R(f),
      abiMap: n,
      maxInputs: g,
      gasCosts: v,
      maxGasPerTx: b,
      gasPrice: S,
      baseAssetId: Q
    })
  };
}
async function wB(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: o, gasCosts: a, maxGasPerTx: u } = t.getGasConfig(), f = t.getChain().consensusParameters.txParameters.maxInputs, g = r.toTransaction(), b = r.toTransactionBytes(), v = await t.getLatestGasPrice(), S = t.getBaseAssetId();
  return Qi({
    id: r.getTransactionId(t.getChainId()),
    receipts: s,
    transaction: g,
    transactionBytes: b,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: f,
    gasCosts: a,
    maxGasPerTx: u,
    gasPrice: v,
    baseAssetId: S
  });
}
async function mB(e) {
  const { filters: t, provider: r, abiMap: n } = e, { transactionsByOwner: s } = await r.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: a, gasPriceFactor: u },
      txParameters: { maxInputs: f, maxGasPerTx: g },
      gasCosts: b
    }
  } = r.getChain(), v = await r.getLatestGasPrice(), S = r.getBaseAssetId();
  return {
    transactions: i.map((N) => {
      const { node: T } = N, { id: F, rawPayload: Y, status: z } = T, [H] = new Ar().decode(K(Y), 0);
      let M = [];
      T != null && T.status && "receipts" in T.status && (M = T.status.receipts);
      const L = M.map(Tr);
      return {
        ...Qi({
          id: F,
          receipts: L,
          transaction: H,
          transactionBytes: K(Y),
          gqlTransactionStatus: z,
          abiMap: n,
          gasPerByte: a,
          gasPriceFactor: u,
          maxInputs: f,
          gasCosts: b,
          maxGasPerTx: g,
          gasPrice: v,
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
}, y2 = (e) => {
  if (e === "ethereum")
    return ut.eth.sepolia;
  if (e === "fuel")
    return ut.fuel.testnet;
}, b2 = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), Sl = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? y2(r);
  if (i === void 0)
    return;
  const o = b2({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, yB = (e, t) => Sl({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), bB = (e, t) => Sl({
  asset: e,
  networkType: "fuel",
  chainId: t
}), I2 = "/", E2 = /^\/|\/$/g, v2 = (e = "") => e.replace(E2, "");
function C2(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(v2);
  return n && r && s.unshift(""), s.join(I2);
}
function B2(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: C2(t, r.icon)
  }));
}
var x2 = "https://cdn.fuel.network/assets/", R2 = [
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
], IB = B2(R2, x2), k0 = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, S2 = (e) => {
  const { assetId: t, amountToTransfer: r, hexlifiedContractId: n } = e, i = new P("u64").encode(new Gt(r).toNumber());
  return Uint8Array.from([
    ...K(n),
    ...i,
    ...K(t)
  ]);
}, N2 = async (e) => {
  const t = S2(e);
  await Ri();
  const r = Lh(16, 0, Ph.ScriptData), n = fr(17, 16, 32), s = ts(18, 17, 0), i = fr(19, 17, 8), o = Oh(16, 18, 19), a = Za(1);
  return { script: Uint8Array.from([
    ...r.to_bytes(),
    ...n.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...a.to_bytes()
  ]), scriptData: t };
}, T2 = 5, Fi = class extends ih {
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
    const { addedSignatures: n, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o, gasPrice: a } = r, u = t.maxFee, f = this.provider.getBaseAssetId(), g = ((Y = i.find((z) => z.assetId === f)) == null ? void 0 : Y.amount) || R(0), b = q1({
      amount: R(u),
      assetId: f,
      coinQuantities: i
    }), v = {};
    b.forEach(({ amount: z, assetId: H }) => {
      v[H] = {
        required: z,
        owned: R(0)
      };
    }), t.inputs.filter(rn).forEach((z) => {
      const M = nn(z) ? String(z.assetId) : f;
      v[M] && (v[M].owned = v[M].owned.add(z.amount));
    });
    let S = [];
    Object.entries(v).forEach(([z, { owned: H, required: M }]) => {
      H.lt(M) && S.push({
        assetId: z,
        amount: M.sub(H)
      });
    });
    let Q = S.length > 0, N = 0;
    for (; Q && N < T2; ) {
      const z = await this.getResourcesToSpend(
        S,
        mv(t.inputs, this.address)
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
      }), L = wv(
        t.inputs.filter(rn),
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
    this.provider.validateTransaction(t), t.updatePredicateGasUsed(s);
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
    let i = new jr(s);
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
    let n = new jr(r);
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
    const i = ft.fromAddressOrString(t), o = n ?? this.provider.getBaseAssetId(), { script: a, scriptData: u } = await N2({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: R(r),
      assetId: o
    });
    let f = new jr({
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
    const s = ft.fromAddressOrString(t), i = K(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = K(
      "0x".concat(R(r).toHex().substring(2).padStart(16, "0"))
    ), u = { script: new Uint8Array([
      ...K(Ev.bytes),
      ...i,
      ...o
    ]), ...n }, f = this.provider.getBaseAssetId();
    let g = new jr(u);
    const b = [{ amount: R(r), assetId: f }], v = await this.getTransactionCost(g, { quantities: b });
    return g = this.validateGasLimitAndMaxFee({
      transactionRequest: g,
      gasUsed: v.gasUsed,
      maxFee: v.maxFee,
      txParams: n
    }), await this.fund(g, v), this.sendTransaction(g);
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
    const s = xe(Ne(t)), i = this.provider.getBaseAssetId(), o = s.getCoinOutputsQuantities(), a = k0(o, n), u = [{ assetId: i, amount: R("100000000000000000") }], f = (v) => s.inputs.find((S) => S.type === Bt.Coin ? S.assetId === v : wl(S) ? i === v : !1), g = (v, S) => {
      const Q = f(v), N = S;
      Q && "amount" in Q ? Q.amount = N : s.addResources(
        this.generateFakeResources([
          {
            amount: S,
            assetId: v
          }
        ])
      );
    };
    return k0(a, u).forEach(
      ({ amount: v, assetId: S }) => g(S, v)
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
      id: $(Ve(Xs)),
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
    this.privateKey = $(t), this.publicKey = $(Cr.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = $(Cr.getPublicKey(t, !0)), this.address = ft.fromPublicKey(this.publicKey);
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
    const t = Cr.sign(K(e), K(this.privateKey)), r = pr(`0x${t.r.toString(16)}`, 32), n = pr(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, $(ct([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = Cr.ProjectivePoint.fromHex(K(this.compressedPublicKey)), r = Cr.ProjectivePoint.fromHex(K(e));
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
    const r = K(t), n = r.slice(0, 32), s = r.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const a = new Cr.Signature(BigInt($(n)), BigInt($(s))).addRecoveryBit(
      i
    ).recoverPublicKey(K(e)).toRawBytes(!1).slice(1);
    return $(a);
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
    return e ? Ye(ct([Ve(32), K(e)])) : Ve(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = Cr.ProjectivePoint.fromHex(K(e));
    return $(t.toRawBytes(!1).slice(1));
  }
}, P0 = 13, U0 = 8, G0 = 1, Bo = 32, D2 = 16, z0 = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Q2(e, t, r) {
  const n = Qr(z0(e), "hex"), s = ft.fromAddressOrString(t), i = Ve(Bo), o = P_({
    password: Qr(r),
    salt: i,
    dklen: Bo,
    n: 2 ** P0,
    r: U0,
    p: G0
  }), a = Ve(D2), u = await hA(n, o, a), f = Uint8Array.from([...o.subarray(16, 32), ...u]), g = U_(f), b = zn(g, "hex"), v = {
    id: pA(),
    version: 3,
    address: z0(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: b,
      cipherparams: { iv: zn(a, "hex") },
      ciphertext: zn(u, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Bo,
        n: 2 ** P0,
        p: G0,
        r: U0,
        salt: zn(i, "hex")
      }
    }
  };
  return JSON.stringify(v);
}
async function F2(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: u, p: f, salt: g }
    }
  } = r, b = Qr(s, "hex"), v = Qr(i, "hex"), S = Qr(g, "hex"), Q = Qr(t), N = P_({
    password: Q,
    salt: S,
    n: a,
    p: f,
    r: u,
    dklen: o
  }), T = Uint8Array.from([...N.subarray(16, 32), ...b]), F = U_(T), Y = zn(F, "hex");
  if (n !== Y)
    throw new x(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const z = await _A(b, N, v);
  return $(z);
}
var Nl = class extends Fi {
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
    const r = await this.signer().sign(gA(t));
    return $(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Ne(t), n = this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
    return $(i);
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
    return Q2(this.privateKey, this.address, t);
  }
};
Ot(Nl, "defaultPath", "m/44'/1179993420'/0'/0/0");
var xs = [
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
], O2 = /* @__PURE__ */ ((e) => (e.english = "english", e))(O2 || {});
function M2(e) {
  return (1 << e) - 1;
}
function Tl(e) {
  return (1 << e) - 1 << 8 - e;
}
function xo(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function L2(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function k2(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & M2(8 - r)), r += 3);
  const n = e.length / 4, s = K(Be(e))[0] & Tl(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function P2(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = K(new Uint8Array(r));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const g = t.indexOf(e[f].normalize("NFKD"));
    if (g === -1)
      throw new x(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let b = 0; b < 11; b += 1)
      g & 1 << 10 - b && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = Tl(o);
  if ((K(Be(n.slice(0, i / 8)))[0] & a) !== (n[n.length - 1] & a))
    throw new x(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var U2 = bn("Bitcoin seed"), G2 = "0x0488ade4", z2 = "0x04358394", V0 = [12, 15, 18, 21, 24];
function Y0(e) {
  if (e.length !== 2048)
    throw new x(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function V2(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new x(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Ro(e) {
  if (!V0.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${V0.join(
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
  constructor(e = xs) {
    O(this, "wordlist");
    this.wordlist = e, Y0(this.wordlist);
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
  static mnemonicToEntropy(e, t = xs) {
    const r = xo(e);
    return Ro(r), $(P2(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = xs) {
    const r = K(e);
    return Y0(t), V2(r), k2(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Ro(xo(e));
    const r = bn(L2(e)), n = bn(`mnemonic${t}`);
    return lA(r, n, 2048, 64, "sha512");
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
    const t = xo(e);
    let r = 0;
    try {
      Ro(t);
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
    const t = xs;
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
    const t = K(e);
    if (t.length < 16 || t.length > 64)
      throw new x(
        D.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return K(G_("sha512", U2, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = Br.masterKeysFromSeed(e), n = K(t ? z2 : G2), s = "0x00", i = "0x00000000", o = "0x00000000", a = r.slice(32), u = r.slice(0, 32), f = ct([
      n,
      s,
      i,
      o,
      a,
      ct(["0x00", u])
    ]), g = ba(Be(Be(f)), 0, 4);
    return m_(ct([f, g]));
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
    const r = t ? Be(ct([Ve(e), K(t)])) : Ve(e);
    return Br.entropyToMnemonic(r);
  }
}, ic = Br, Dl = 2147483648, Ql = $("0x0488ade4"), oc = $("0x0488b21e"), Fl = $("0x04358394"), ac = $("0x043587cf");
function H0(e) {
  return m_(ct([e, ba(Be(Be(e)), 0, 4)]));
}
function Y2(e = !1, t = !1) {
  return e ? t ? ac : oc : t ? Fl : Ql;
}
function H2(e) {
  return [oc, ac].includes($(e.slice(0, 4)));
}
function Z2(e) {
  return [Ql, Fl, oc, ac].includes(
    $(e.slice(0, 4))
  );
}
function X2(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new x(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + Dl : parseInt(n, 10)
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
    O(this, "fingerprint", $("0x00000000"));
    O(this, "parentFingerprint", $("0x00000000"));
    O(this, "privateKey");
    O(this, "publicKey");
    O(this, "chainCode");
    if (e.privateKey) {
      const t = new Sn(e.privateKey);
      this.publicKey = $(t.compressedPublicKey), this.privateKey = $(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new x(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = $(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ba(fA(Be(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && K(this.privateKey), r = K(this.publicKey), n = K(this.chainCode), s = new Uint8Array(37);
    if (e & Dl) {
      if (!t)
        throw new x(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(K(this.publicKey));
    s.set(pr(e, 4), 33);
    const i = K(G_("sha512", n, s)), o = i.slice(0, 32), a = i.slice(32);
    if (t) {
      const b = R(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new dn({
        privateKey: b,
        chainCode: a,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new Sn($(o)).addPoint(r);
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
    return X2(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
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
    const r = Y2(this.privateKey == null || e, t), n = $(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = ga(this.index, 4), o = this.chainCode, a = this.privateKey != null && !e ? ct(["0x00", this.privateKey]) : this.publicKey, u = K(ct([r, n, s, i, o, a]));
    return H0(u);
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
      chainCode: K(t.slice(32)),
      privateKey: K(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = $(pr(jf(e))), r = K(t), n = H0(r.slice(0, 78)) === e;
    if (r.length !== 82 || !Z2(r))
      throw new x(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new x(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = $(r.slice(5, 9)), o = parseInt($(r.slice(9, 13)).substring(2), 16), a = $(r.slice(13, 45)), u = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new x(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (H2(r)) {
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
}, So = dn, Ol = class extends Fi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Oe(e, this._provider);
  }
}, Oe = class extends Nl {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Sn("0x00"), new Ol(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Sn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Oe(t, e == null ? void 0 : e.provider);
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
    const s = So.fromSeed(e).derivePath(t || Oe.defaultPath);
    return new Oe(s.privateKey, r);
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
    const s = ic.mnemonicToSeed(e, r), o = So.fromSeed(s).derivePath(t || Oe.defaultPath);
    return new Oe(o.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const r = So.fromExtendedKey(e);
    return new Oe(r.privateKey, t);
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
    const n = await F2(e, t);
    return new Oe(n, r);
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
    return new Ol(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Oe(e, t);
  }
};
Ot(Re, "generate", Oe.generate);
Ot(Re, "fromSeed", Oe.fromSeed);
Ot(Re, "fromMnemonic", Oe.fromMnemonic);
Ot(Re, "fromExtendedKey", Oe.fromExtendedKey);
Ot(Re, "fromEncryptedJson", Oe.fromEncryptedJson);
var W2 = class {
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
}, Yr, Ml = class {
  constructor(e) {
    Nr(this, Yr, void 0), Ot(this, "pathKey", "{}"), Ot(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Ot(this, "numberOfAccounts", 0), qe(this, Yr, e.secret || ic.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: kt(this, Yr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const r = Re.fromMnemonic(kt(this, Yr), this.getDerivePath(t));
      e.push({
        publicKey: r.publicKey,
        address: r.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Re.fromMnemonic(kt(this, Yr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const r = ft.fromAddressOrString(e);
    do {
      const n = Re.fromMnemonic(kt(this, Yr), this.getDerivePath(t));
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
Yr = /* @__PURE__ */ new WeakMap();
Ot(Ml, "type", "mnemonic");
var xr, Ll = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Nr(this, xr, []), e.secret ? qe(this, xr, [e.secret]) : qe(this, xr, e.accounts || [Re.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: kt(this, xr)
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
    return kt(this, xr).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Re.generate();
    return kt(this, xr).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ft.fromAddressOrString(e), r = kt(this, xr).find(
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
Ot(Ll, "type", "privateKey");
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
var Qe, Hr, tr, _a, kl, ha, Pl, Ul = class extends sl.EventEmitter {
  constructor(e) {
    super(), Nr(this, _a), Nr(this, ha), Ot(this, "storage", new W2()), Ot(this, "STORAGE_KEY", "WalletManager"), Nr(this, Qe, []), Nr(this, Hr, ""), Nr(this, tr, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return kt(this, tr);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    ur(!kt(this, tr), dr.wallet_not_unlocked);
    const t = kt(this, Qe).find((r, n) => n === e);
    return ur(t, dr.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return kt(this, Qe).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return kt(this, Qe).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = ft.fromAddressOrString(e), r = kt(this, Qe).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return ur(r, dr.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ft.fromAddressOrString(e);
    ur(!kt(this, tr), dr.wallet_not_unlocked);
    const r = kt(this, Qe).find(
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
    const t = kt(this, Qe)[(e == null ? void 0 : e.vaultId) || 0];
    await ur(t, dr.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    kt(this, Qe).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    qe(this, Qe, kt(this, Qe).concat({
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
    qe(this, tr, !0), qe(this, Qe, []), qe(this, Hr, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    qe(this, Hr, e), qe(this, tr, !1);
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
    const r = kt(this, tr);
    await this.unlock(e), qe(this, Hr, t), await this.saveState(), await this.loadState(), r && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await ur(!kt(this, tr), dr.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await dA(kt(this, Hr), JSON.parse(e));
      qe(this, Qe, ea(this, ha, Pl).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await ur(!kt(this, tr), dr.wallet_not_unlocked);
    const e = await uA(kt(this, Hr), {
      vaults: ea(this, _a, kl).call(this, kt(this, Qe))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Ul.Vaults.find((r) => r.type === e);
    return ur(t, dr.invalid_vault_type), t;
  }
}, j2 = Ul;
Qe = /* @__PURE__ */ new WeakMap();
Hr = /* @__PURE__ */ new WeakMap();
tr = /* @__PURE__ */ new WeakMap();
_a = /* @__PURE__ */ new WeakSet();
kl = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
ha = /* @__PURE__ */ new WeakSet();
Pl = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Ot(j2, "Vaults", [Ml, Ll]);
var J2 = class {
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
Ot(J2, "type");
var EB = class {
}, q2 = (e) => {
  const r = K(e), n = p_(r, 16384), s = il(n.map((o) => $(o)));
  return Ye(ct(["0x4655454C", s]));
};
function $2(e) {
  const t = e.buffer.slice(e.byteOffset + 8, e.byteOffset + 16), n = new DataView(t).getBigUint64(0, !1);
  return Number(n);
}
var Z0 = class extends Fi {
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
    const { predicateBytes: a, predicateInterface: u } = Z0.processPredicateData(
      t,
      r,
      i
    ), f = ft.fromB256(q2(a));
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
    return n !== -1 && r.removeWitness(n), r.inputs.filter(ml).forEach((s) => {
      na(s, this.address) && (s.predicate = $(this.bytes), s.predicateData = $(this.getPredicateData()), s.witnessIndex = 0);
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
    let s = K(t), i;
    if (r && (i = new wr(r), i.functions.main === void 0))
      throw new x(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = Z0.setConfigurableConstants(
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
      predicate: $(this.bytes),
      predicateData: $(this.getPredicateData())
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
      predicate: $(this.bytes),
      predicateData: $(this.getPredicateData())
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
        const o = $2(t), a = i.slice(o), u = a.length, f = new Uint8Array(8);
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
    const r = t.inputs.filter(rn).filter((o) => na(o, this.address));
    let n = -1;
    const s = r.find((o) => !o.predicate);
    return s && (n = s.witnessIndex, r.every((a) => !a.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
  }
}, Gl = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(Gl || {}), cc = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(cc || {}), zl = "FuelConnector", K2 = class {
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
}, tC = class extends sl.EventEmitter {
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
function eC(e, { cache: t, cacheTime: r, key: n }) {
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
function vB(e) {
  window.dispatchEvent(
    new CustomEvent(zl, {
      detail: e
    })
  );
}
function rC() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function Rs(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new x(x.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var nC = 2e3, sC = 5e3, { warn: iC } = console, Zn = class extends tC {
  constructor(t = Zn.defaultConfig) {
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
      const { _targetObject: t } = this, r = zl;
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
      const t = this.setDefaultConnector();
      this._targetUnsubscribe = this.setupConnectorListener(), await t;
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
      return new K2(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(Zn.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
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
    Object.values(Gl).forEach((t) => {
      this[t] = async (...r) => this.callMethod(t, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const r = Date.now(), [n, s] = await Promise.allSettled([
      Rs(t.isConnected()),
      Rs(this.pingConnector(t))
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
      return await eC(async () => Rs(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: sC
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
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(cc)), await ((o = this._storage) == null ? void 0 : o.setItem(Zn.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = rC();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Rs(t.promise, nC).then(() => !0).catch(() => !1);
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
    return iC(
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
    return new Fi(t, n, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Zn.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Vl = Zn;
Ot(Vl, "STORAGE_KEY", "fuel-current-connector");
Ot(Vl, "defaultConfig", {});
function X0(e, t) {
  if (!e)
    throw new x(D.TRANSACTION_ERROR, t);
}
function Yl(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Hl = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = Yl(r);
  return sc(e, n, s);
}, er, n_, dc = (n_ = class {
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
    return $(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Vt(this, er), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, er = new WeakMap(), n_), oC = (e) => W_ + X_({ maxInputs: e });
function aC(e) {
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
    const s = aC(e);
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
function cC(e, t, r) {
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
var Oi = class {
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
    this.bytes = K(e), this.scriptDataEncoder = t, this.scriptResultDecoder = r;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return X_({ maxInputs: t }) + W_ + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Oi.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = K(t.script), t.data);
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
}, Zl = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, dC = Qt, Xl = ({
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
    Jo(16, 17, 18, 19)
  ) : s.push(Jo(16, 17, 18, l.cgas().to_u8())), s;
};
function W0(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new dc();
  for (let r = 0; r < e.length; r += 1)
    t.extend(Xl(e[r]).entries());
  return t.push(Za(1)), t.toBytes();
}
var uC = (e) => e === pt.Return || e === pt.ReturnData, _C = (e, t) => e.find(
  ({ type: r, from: n, to: s }) => r === pt.Call && n === dC && s === t
), hC = (e) => (t) => {
  if (Rr(t.code) !== 0)
    throw new x(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = _C(
    t.receipts,
    e.toB256()
  ), n = R(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => uC(i)).flatMap((i) => n.eq(R(i.is)) ? i.type === pt.Return ? [new P("u64").encode(i.val)] : i.type === pt.ReturnData ? [K(i.data)] : [new Uint8Array()] : []);
}, lC = (e, t, r = []) => uc(e, hC(t), r), fC = (e) => e.reduce(
  (t, r) => {
    const n = { ...Zl };
    return r.gas && (n.gasForwardedOffset = 1), t + Xl(n).byteLength();
  },
  V.size()
  // placeholder for single RET instruction which is added later
), pC = (e, t) => new Oi(
  // Script to call the contract, start with stub size matching length of calls
  W0(new Array(e.length).fill(Zl)),
  (r) => {
    var S;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = fC(r), i = (8 - s % 8) % 8, o = s + i, a = oC(t.toNumber()) + o, u = [];
    let f = a;
    const g = [];
    for (let Q = 0; Q < n; Q += 1) {
      const N = r[Q], T = f, F = T + gt, Y = F + Ws, z = Y + LA + gt + gt, H = z + N.fnSelectorBytes.byteLength, M = K(N.data);
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
    const b = W0(u);
    return { data: ct(g), script: b };
  },
  () => [new Uint8Array()]
), Wl = (e, t, r, n) => {
  var a;
  const s = (a = e[0]) == null ? void 0 : a.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return cC({ receipts: t }, s, n);
  const o = lC(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((u, f) => {
    var b;
    const { func: g } = e[f].getCallConfig();
    return (b = g.decodeOutput(u)) == null ? void 0 : b[0];
  });
  return r ? o : o == null ? void 0 : o[0];
}, AC = async (e) => {
  var S;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, a = Array.isArray(t) ? t : [t], u = (S = a[0]) == null ? void 0 : S.getCallConfig(), f = Hl(o, u, a), g = Wl(a, o, r, f), b = Di(o);
  return {
    isMultiCall: r,
    functionScopes: a,
    value: g,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: f,
    gasUsed: b
  };
}, No = (e) => {
  var b;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], o = (b = i[0]) == null ? void 0 : b.getCallConfig(), a = Hl(s, o, i), u = Wl(i, s, n, a), f = Di(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: f,
    value: u
  };
};
function gC(e) {
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
var jl = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new jr();
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
    return this.functionInvocationScopes.map((r) => gC(r));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), r = pC(this.functionInvocationScopes, t);
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
    await Ri(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === xt.Script && (this.transactionRequest.abis = Yl(this.functionInvocationScopes));
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
      waitForResult: async () => AC({
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
    return No({
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
    return No({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return No({
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
}, Jl = class extends jl {
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
}, wC = class extends jl {
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
}, j0 = class {
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
      const t = (...r) => new Jl(this, e, r);
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
    return new wC(this, e);
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
}, mC = class extends Jl {
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
    this.scriptRequest = new Oi(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, CB = class extends sg {
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
    this.bytes = K(t), this.interface = new wr(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new mC(this, this.interface.getFunction("main"), s)
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
new Oi(
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
function BB(e) {
  return e;
}
var yC = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(yC || {}), bC = Object.defineProperty, IC = (e, t) => {
  for (var r in t)
    bC(e, r, { get: t[r], enumerable: !0 });
}, EC = (e) => {
  const { RegId: t, Instruction: r } = Vh, n = 12, s = e.length, i = gr, o = ct(e.map((u) => K(u))), a = new dc(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    Wr(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    fr(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    Wr(22, t.sp().to_u8()),
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
    Mh(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    kh(19, t.zero().to_u8(), 3),
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
}, vC = 32, Ce = 16, Ge = 17, an = 18, CC = 8;
function ql(e) {
  const n = new DataView(e.buffer, 8, 8).getBigUint64(0, !1);
  return Number(n);
}
function BC(e, t) {
  const { RegId: r, Instruction: n } = Vh, s = r.pc().to_u8(), i = r.sp().to_u8(), o = r.is().to_u8(), a = (N) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Wr(Ce, s),
    // hold the address of the blob ID.
    fr(
      Ce,
      Ce,
      N * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Wr(Ge, i),
    // REG_GENERAL_USE to hold the size of the blob.
    ii(an, Ce),
    // Push the blob contents onto the stack.
    Wn(Ce, 0, an, 1),
    // Move on to the data section length
    fr(Ce, Ce, vC),
    // load the size of the data section into REG_GENERAL_USE
    ts(an, Ce, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    fr(Ce, Ce, CC),
    // load the data section of the executable
    Wn(Ce, 0, an, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    ri(Ge, Ge, o),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    si(Ge, Ge, 4),
    // Jump to the start of the contract we loaded.
    ni(Ge)
  ], u = (N) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    Wr(Ce, s),
    // hold the address of the blob ID.
    fr(
      Ce,
      Ce,
      N * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    Wr(Ge, i),
    // REG_GENERAL_USE to hold the size of the blob.
    ii(an, Ce),
    // Push the blob contents onto the stack.
    Wn(Ce, 0, an, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    ri(Ge, Ge, o),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    si(Ge, Ge, 4),
    // Jump to the start of the contract we loaded.
    ni(Ge)
  ], f = ql(e);
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
  const b = u(0).length;
  if (b > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const v = new Uint8Array(
    u(b).flatMap(
      (N) => Array.from(N.to_bytes())
    )
  ), S = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...v, ...S]) };
}
var xC = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), o = i.length;
    o % gt !== 0 && (i = ct([i, new Uint8Array(t - i.length)]), o = i.length), r.push({ id: s, size: o, bytecode: i });
  }
  return r;
}, RC = {};
IC(RC, {
  getContractId: () => tf,
  getContractRoot: () => $l,
  getContractStorageRoot: () => Kl,
  hexlifyWithPrefix: () => la
});
var $l = (e) => {
  const r = K(e), n = p_(r, 16384);
  return il(n.map((s) => $(s)));
}, Kl = (e) => {
  const t = new W1();
  return e.forEach(({ key: r, value: n }) => t.update(Be(r), n)), t.root;
}, tf = (e, t, r) => {
  const n = $l(K(e));
  return Be(ct(["0x4655454C", t, n, r]));
}, la = (e) => $(e.startsWith("0x") ? e : `0x${e}`), J0 = 0.95, SC = class {
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
    this.bytecode = K(e), t instanceof wr ? this.interface = t : this.interface = new wr(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new SC(this.bytecode, this.interface, e);
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
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || Kl(r.storageSlots), i = tf(n, r.salt, s), o = new ia({
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
        return { contract: new j0(s, this.interface, t), transactionResult: u };
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
    chunkSizeMultiplier: J0
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = this.getMaxChunkSize(e, n), i = xC(K(this.bytecode), s).map((M) => {
      const L = this.blobTransactionRequest({
        ...e,
        bytecode: M.bytecode
      });
      return {
        ...M,
        transactionRequest: L,
        blobId: L.blobId
      };
    }), o = i.map(({ blobId: M }) => M), a = EC(o), { contractId: u, transactionRequest: f } = this.createTransactionRequest({
      bytecode: a,
      ...e
    }), g = [...new Set(o)], b = await t.provider.getBlobs(g), v = g.filter((M) => !b.includes(M));
    let S = R(0);
    const Q = t.provider.getChain(), N = await t.provider.estimateGasPrice(10), T = Q.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: M, blobId: L } of i) {
      if (v.includes(L)) {
        const k = M.calculateMinGas(Q), q = wn({
          gasPrice: N,
          gas: k,
          priceFactor: T,
          tip: M.tip
        }).add(1);
        S = S.add(q);
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
      for (const { blobId: k, transactionRequest: q } of i)
        if (!M.includes(k) && v.includes(k)) {
          const X = await this.fundTransactionRequest(
            q,
            e
          );
          let tt;
          try {
            tt = await (await t.sendTransaction(X)).waitForResult();
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
      return { contract: new j0(u, this.interface, t), transactionResult: G };
    }, contractId: u, waitForTransactionId: () => Y };
  }
  async deployAsBlobTxForScript() {
    const e = this.getAccount(), t = ql(K(this.bytecode)), r = this.bytecode.slice(0, t), n = Ye(r), s = this.blobTransactionRequest({
      bytecode: r
    }), { loaderBytecode: i, blobOffset: o } = BC(
      K(this.bytecode),
      K(n)
    ), a = r.length - (o || 0);
    if ((await e.provider.getBlobs([n])).length > 0)
      return {
        waitForResult: () => Promise.resolve({ loaderBytecode: $(i), configurableOffsetDiff: a }),
        blobId: n
      };
    let f = R(0);
    const g = e.provider.getChain(), b = await e.provider.estimateGasPrice(10), v = g.consensusParameters.feeParameters.gasPriceFactor, S = s.calculateMinGas(g), Q = wn({
      gasPrice: b,
      gas: S,
      priceFactor: v,
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
        return { loaderBytecode: $(i), configurableOffsetDiff: a };
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
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n), o = K(this.bytecode);
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
  getMaxChunkSize(e, t = J0) {
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
}, xB = 9, RB = 3, SB = 9, NB = 9, TB = 18, DB = 15, QB = 12, FB = 9, OB = "https://devnet.fuel.network/v1/graphql", MB = "https://testnet.fuel.network/v1/graphql";
export {
  Ws as ASSET_ID_LEN,
  ih as AbstractAccount,
  rg as AbstractAddress,
  ng as AbstractContract,
  oh as AbstractProgram,
  sg as AbstractScript,
  YC as AbstractScriptRequest,
  Fi as Account,
  ft as Address,
  Uv as AddressType,
  bt as ArrayCoder,
  j as B256Coder,
  GA as B512Coder,
  g2 as BLOCKS_PAGE_SIZE_LIMIT,
  Gt as BN,
  gr as BYTES_32,
  Qn as BaseTransactionRequest,
  Nl as BaseWalletUnlocked,
  P as BigNumberCoder,
  sa as BlobTransactionRequest,
  VA as BooleanCoder,
  Ct as ByteArrayCoder,
  j_ as ByteCoder,
  ut as CHAIN_IDS,
  LA as CONTRACT_ID_LEN,
  jC as CONTRACT_MAX_SIZE,
  Gv as ChainName,
  cB as ChangeOutputCollisionError,
  _t as Coder,
  yC as Commands,
  j0 as Contract,
  SC as ContractFactory,
  RC as ContractUtils,
  ia as CreateTransactionRequest,
  NB as DECIMAL_FUEL,
  FB as DECIMAL_GWEI,
  DB as DECIMAL_KWEI,
  QB as DECIMAL_MWEI,
  TB as DECIMAL_WEI,
  SB as DEFAULT_DECIMAL_UNITS,
  RB as DEFAULT_MIN_PRECISION,
  xB as DEFAULT_PRECISION,
  w2 as DEFAULT_RESOURCE_CACHE_TTL,
  OB as DEVNET_NETWORK_URL,
  ya as DateTime,
  Zs as ENCODING_V1,
  WC as EmptyRoot,
  J_ as EnumCoder,
  D as ErrorCode,
  Jw as FAILED_ASSERT_EQ_SIGNAL,
  $w as FAILED_ASSERT_NE_SIGNAL,
  qw as FAILED_ASSERT_SIGNAL,
  jw as FAILED_REQUIRE_SIGNAL,
  Dh as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  rB as FAILED_UNKNOWN_SIGNAL,
  Js as FUEL_BECH32_HRP_PREFIX,
  Vl as Fuel,
  tC as FuelConnector,
  zl as FuelConnectorEventType,
  cc as FuelConnectorEventTypes,
  Gl as FuelConnectorMethods,
  x as FuelError,
  Jl as FunctionInvocationScope,
  m2 as GAS_USED_MODIFIER,
  So as HDWallet,
  VC as INPUT_COIN_FIXED_SIZE,
  nr as InputCoder,
  Pc as InputCoinCoder,
  qs as InputContractCoder,
  Fr as InputMessageCoder,
  Bt as InputType,
  dc as InstructionSet,
  wr as Interface,
  O2 as Language,
  K2 as LocalStorage,
  eB as MAX_PREDICATE_DATA_LENGTH,
  tB as MAX_PREDICATE_LENGTH,
  $C as MAX_SCRIPT_DATA_LENGTH,
  qC as MAX_SCRIPT_LENGTH,
  KC as MAX_STATIC_CONTRACTS,
  JC as MAX_WITNESSES,
  V0 as MNEMONIC_SIZES,
  W2 as MemoryStorage,
  ic as Mnemonic,
  Ml as MnemonicVault,
  wC as MultiCallInvocationScope,
  gv as NoWitnessAtIndexError,
  dB as NoWitnessByOwnerError,
  rt as NumberCoder,
  Pv as OperationName,
  th as OptionCoder,
  Gc as OutputChangeCoder,
  sr as OutputCoder,
  Uc as OutputCoinCoder,
  $s as OutputContractCoder,
  Vc as OutputContractCreatedCoder,
  vt as OutputType,
  zc as OutputVariableCoder,
  tm as PANIC_DOC_URL,
  Kw as PANIC_REASONS,
  ir as PoliciesCoder,
  je as PolicyType,
  Z0 as Predicate,
  Ll as PrivateKeyVault,
  Ai as Provider,
  M0 as RESOURCES_PAGE_SIZE_LIMIT,
  HA as RawSliceCoder,
  td as ReceiptBurnCoder,
  Yc as ReceiptCallCoder,
  ZC as ReceiptCoder,
  jc as ReceiptLogCoder,
  Jc as ReceiptLogDataCoder,
  Vo as ReceiptMessageOutCoder,
  Ks as ReceiptMintCoder,
  Xc as ReceiptPanicCoder,
  Hc as ReceiptReturnCoder,
  Zc as ReceiptReturnDataCoder,
  Wc as ReceiptRevertCoder,
  Kc as ReceiptScriptResultCoder,
  qc as ReceiptTransferCoder,
  $c as ReceiptTransferOutCoder,
  pt as ReceiptType,
  W_ as SCRIPT_FIXED_SIZE,
  CB as Script,
  Oi as ScriptRequest,
  jr as ScriptTransactionRequest,
  Sn as Signer,
  Ta as StdStringCoder,
  EB as StorageAbstract,
  ed as StorageSlotCoder,
  eh as StrSliceCoder,
  ZA as StringCoder,
  Ii as StructCoder,
  MB as TESTNET_NETWORK_URL,
  A2 as TRANSACTIONS_PAGE_SIZE_LIMIT,
  cd as TransactionBlobCoder,
  Ar as TransactionCoder,
  sd as TransactionCreateCoder,
  id as TransactionMintCoder,
  da as TransactionResponse,
  nd as TransactionScriptCoder,
  ca as TransactionStatus,
  xt as TransactionType,
  kv as TransactionTypeName,
  od as TransactionUpgradeCoder,
  ad as TransactionUploadCoder,
  rh as TupleCoder,
  Kr as TxPointerCoder,
  Xs as UTXO_ID_LEN,
  rd as UpgradePurposeCoder,
  ze as UpgradePurposeTypeEnum,
  oa as UpgradeTransactionRequest,
  aa as UploadTransactionRequest,
  XC as UtxoIdCoder,
  J2 as Vault,
  XA as VecCoder,
  gt as WORD_SIZE,
  Re as Wallet,
  Ol as WalletLocked,
  j2 as WalletManager,
  Oe as WalletUnlocked,
  or as WitnessCoder,
  Qt as ZeroBytes32,
  q1 as addAmountToCoinQuantities,
  rs as addOperation,
  Vn as addressify,
  Dv as aggregateInputsAmountsByAssetAndOwner,
  K as arrayify,
  pv as assemblePanicError,
  av as assembleReceiptByType,
  Av as assembleRevertError,
  Qi as assembleTransactionSummary,
  X0 as assert,
  $f as assertUnreachable,
  IB as assets,
  R as bn,
  Qr as bufferFromString,
  aB as buildBlockExplorerUrl,
  No as buildDryRunResult,
  AC as buildFunctionResult,
  eC as cacheFor,
  uB as cacheRequestInputsResources,
  mv as cacheRequestInputsResourcesFromOwner,
  wn as calculateGasFee,
  _v as calculateMetadataGasForTxBlob,
  Al as calculateMetadataGasForTxCreate,
  gl as calculateMetadataGasForTxScript,
  D0 as calculateMetadataGasForTxUpgrade,
  hv as calculateMetadataGasForTxUpload,
  lv as calculateMinGasForTxUpload,
  Cv as calculateTXFeeForSummary,
  X_ as calculateVmTxMemory,
  MC as capitalizeString,
  p_ as chunkAndPadBytes,
  ug as clearFirst12BytesFromB256,
  ja as coinQuantityfy,
  UC as compressBytecode,
  G_ as computeHmac,
  ct as concat,
  mi as concatBytes,
  HC as createAssetId,
  BB as createConfig,
  ba as dataSlice,
  jf as decodeBase58,
  GC as decompressBytecode,
  dA as decrypt,
  _A as decryptJsonWalletData,
  PC as defaultConsensusKey,
  kC as defaultSnapshotConfigs,
  rC as deferPromise,
  vB as dispatchFuelConnectorEvent,
  m_ as encodeBase58,
  uA as encrypt,
  hA as encryptJsonWalletData,
  xs as english,
  u2 as extractBurnedAssetsFromReceipts,
  Wl as extractInvocationResult,
  d2 as extractMintedAssetsFromReceipts,
  tc as extractTxError,
  QC as format,
  DC as formatUnits,
  Ma as fromBech32,
  x2 as fuelAssetsBaseUrl,
  uv as gasUsedByInputs,
  Yl as getAbisFromAllCalls,
  wv as getAssetAmountInRequestInputs,
  yB as getAssetEth,
  bB as getAssetFuel,
  b2 as getAssetNetwork,
  Sl as getAssetWithNetwork,
  La as getBytesFromBech32,
  n2 as getContractCallOperations,
  a2 as getContractCreatedOperations,
  sc as getDecodedLogs,
  y2 as getDefaultChainId,
  Di as getGasUsedFromReceipts,
  nc as getInputAccountAddress,
  Fv as getInputContractFromIndex,
  Il as getInputFromAssetId,
  rc as getInputsByType,
  xv as getInputsByTypes,
  Rv as getInputsCoin,
  bl as getInputsCoinAndMessage,
  Nv as getInputsContract,
  Sv as getInputsMessage,
  Ka as getMaxGas,
  pl as getMinGas,
  qn as getMintedAssetId,
  c2 as getOperations,
  ms as getOutputsByType,
  Mv as getOutputsChange,
  El as getOutputsCoin,
  Lv as getOutputsContract,
  Ov as getOutputsContractCreated,
  fB as getOutputsVariable,
  o2 as getPayProducerOperations,
  q2 as getPredicateRoot,
  dg as getRandomB256,
  es as getReceiptsByType,
  Zv as getReceiptsCall,
  Xv as getReceiptsMessageOut,
  AB as getReceiptsTransferOut,
  T0 as getReceiptsWithMissingData,
  yl as getRequestInputResourceOwner,
  Hl as getResultLogs,
  _2 as getTransactionStatusName,
  gB as getTransactionSummary,
  wB as getTransactionSummaryFromRequest,
  vl as getTransactionTypeName,
  mB as getTransactionsSummaries,
  i2 as getTransferOperations,
  Kv as getWithdrawFromFuelOperations,
  pB as hasSameAssetId,
  Ye as hash,
  gA as hashMessage,
  $ as hexlify,
  rv as inputify,
  Ms as isB256,
  Os as isBech32,
  sv as isCoin,
  Mr as isDefined,
  zo as isEvmAddress,
  F0 as isInputCoin,
  oB as isMessage,
  N0 as isMessageCoin,
  Lc as isPublicKey,
  sB as isRawCoin,
  iB as isRawMessage,
  nn as isRequestInputCoin,
  ml as isRequestInputCoinOrMessage,
  ec as isRequestInputMessage,
  wl as isRequestInputMessageWithoutData,
  rn as isRequestInputResource,
  na as isRequestInputResourceFromOwner,
  _B as isTransactionTypeBlob,
  vv as isTransactionTypeCreate,
  zr as isTransactionTypeScript,
  hB as isTransactionTypeUpgrade,
  lB as isTransactionTypeUpload,
  Fn as isType,
  Hv as isTypeBlob,
  Cl as isTypeCreate,
  zv as isTypeMint,
  Bl as isTypeScript,
  Vv as isTypeUpgrade,
  Yv as isTypeUpload,
  U_ as keccak256,
  zC as keyFromPassword,
  FC as max,
  OC as multiply,
  cg as normalizeBech32,
  fv as normalizeJSON,
  LC as normalizeString,
  nv as outputify,
  _g as padFirst12BytesOfEvmAddress,
  lA as pbkdf2,
  Tr as processGqlReceipt,
  h2 as processGraphqlStatus,
  Ve as randomBytes,
  pA as randomUUID,
  R2 as rawAssets,
  Se as resolveGasDependentCosts,
  B2 as resolveIconPaths,
  Q0 as returnZeroScript,
  fA as ripemd160,
  P_ as scrypt,
  Be as sha256,
  Yf as sleep,
  hg as sortPolicies,
  zn as stringFromBuffer,
  kc as toB256,
  Fs as toBech32,
  pr as toBytes,
  TC as toFixed,
  ga as toHex,
  Rr as toNumber,
  bn as toUtf8Bytes,
  Ia as toUtf8String,
  Ne as transactionRequestify,
  AA as uint64ToBytesBE,
  C2 as urlJoin,
  Rs as withTimeout,
  Ev as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
