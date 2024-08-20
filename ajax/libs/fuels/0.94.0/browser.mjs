var j_ = Object.defineProperty;
var tc = (e) => {
  throw TypeError(e);
};
var q_ = (e, t, r) => t in e ? j_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var M = (e, t, r) => q_(e, typeof t != "symbol" ? t + "" : t, r), Ui = (e, t, r) => t.has(e) || tc("Cannot " + r);
var zt = (e, t, r) => (Ui(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Le = (e, t, r) => t.has(e) ? tc("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), We = (e, t, r, n) => (Ui(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), hs = (e, t, r) => (Ui(e, t, "access private method"), r);
function Wu() {
  return {
    FORC: "0.63.1",
    FUEL_CORE: "0.33.0",
    FUELS: "0.94.0"
  };
}
function ec(e) {
  const [t, r, n] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: r, patch: n };
}
function zo(e, t) {
  const r = ec(e), n = ec(t), s = r.major - n.major, i = r.minor - n.minor, o = r.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function $_(e, t) {
  const { major: r } = zo(e, t);
  return r === 0;
}
function K_(e, t) {
  const { minor: r } = zo(e, t);
  return r === 0;
}
function th(e, t) {
  const { patch: r } = zo(e, t);
  return r === 0;
}
function eh(e) {
  const { FUEL_CORE: t } = Wu();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: $_(e, t),
    isMinorSupported: K_(e, t),
    isPatchSupported: th(e, t)
  };
}
var rh = Wu(), nh = Object.defineProperty, sh = (e, t, r) => t in e ? nh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ih = (e, t, r) => (sh(e, t + "", r), r), Q = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.TIMEOUT_EXCEEDED = "timeout-exceeded", e.CONFIG_FILE_NOT_FOUND = "config-file-not-found", e.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", e.WORKSPACE_NOT_DETECTED = "workspace-not-detected", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.NOT_ENOUGH_FUNDS = "not-enough-funds", e.INVALID_CREDENTIALS = "invalid-credentials", e.HASHER_LOCKED = "hasher-locked", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", e.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", e.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", e.FUNDS_TOO_LOW = "funds-too-low", e.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e.NODE_LAUNCH_FAILED = "node-launch-failed", e.UNKNOWN = "unknown", e))(Q || {}), bs = class extends Error {
  constructor(t, r, n = {}, s = {}) {
    super(r);
    M(this, "VERSIONS", rh);
    M(this, "metadata");
    M(this, "rawError");
    M(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = n, this.rawError = s;
  }
  static parse(t) {
    const r = t;
    if (r.code === void 0)
      throw new bs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const n = Object.values(Q);
    if (!n.includes(r.code))
      throw new bs(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${n.join(", ")}.`
      );
    return new bs(r.code, r.message);
  }
  toObject() {
    const { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o } = this;
    return { code: t, name: r, message: n, metadata: s, VERSIONS: i, rawError: o };
  }
}, R = bs;
ih(R, "CODES", Q);
var Rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function oh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Go(e) {
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
var Xo = { exports: {} };
const ah = {}, ch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ah
}, Symbol.toStringTag, { value: "Module" })), uh = /* @__PURE__ */ Go(ch);
Xo.exports;
(function(e) {
  (function(t, r) {
    function n(C, u) {
      if (!C) throw new Error(u || "Assertion failed");
    }
    function s(C, u) {
      C.super_ = u;
      var d = function() {
      };
      d.prototype = u.prototype, C.prototype = new d(), C.prototype.constructor = C;
    }
    function i(C, u, d) {
      if (i.isBN(C))
        return C;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, C !== null && ((u === "le" || u === "be") && (d = u, u = 10), this._init(C || 0, u || 10, d || "be"));
    }
    typeof t == "object" ? t.exports = i : r.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = uh.Buffer;
    } catch {
    }
    i.isBN = function(u) {
      return u instanceof i ? !0 : u !== null && typeof u == "object" && u.constructor.wordSize === i.wordSize && Array.isArray(u.words);
    }, i.max = function(u, d) {
      return u.cmp(d) > 0 ? u : d;
    }, i.min = function(u, d) {
      return u.cmp(d) < 0 ? u : d;
    }, i.prototype._init = function(u, d, p) {
      if (typeof u == "number")
        return this._initNumber(u, d, p);
      if (typeof u == "object")
        return this._initArray(u, d, p);
      d === "hex" && (d = 16), n(d === (d | 0) && d >= 2 && d <= 36), u = u.toString().replace(/\s+/g, "");
      var y = 0;
      u[0] === "-" && (y++, this.negative = 1), y < u.length && (d === 16 ? this._parseHex(u, y, p) : (this._parseBase(u, d, y), p === "le" && this._initArray(this.toArray(), d, p)));
    }, i.prototype._initNumber = function(u, d, p) {
      u < 0 && (this.negative = 1, u = -u), u < 67108864 ? (this.words = [u & 67108863], this.length = 1) : u < 4503599627370496 ? (this.words = [
        u & 67108863,
        u / 67108864 & 67108863
      ], this.length = 2) : (n(u < 9007199254740992), this.words = [
        u & 67108863,
        u / 67108864 & 67108863,
        1
      ], this.length = 3), p === "le" && this._initArray(this.toArray(), d, p);
    }, i.prototype._initArray = function(u, d, p) {
      if (n(typeof u.length == "number"), u.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(u.length / 3), this.words = new Array(this.length);
      for (var y = 0; y < this.length; y++)
        this.words[y] = 0;
      var f, E, v = 0;
      if (p === "be")
        for (y = u.length - 1, f = 0; y >= 0; y -= 3)
          E = u[y] | u[y - 1] << 8 | u[y - 2] << 16, this.words[f] |= E << v & 67108863, this.words[f + 1] = E >>> 26 - v & 67108863, v += 24, v >= 26 && (v -= 26, f++);
      else if (p === "le")
        for (y = 0, f = 0; y < u.length; y += 3)
          E = u[y] | u[y + 1] << 8 | u[y + 2] << 16, this.words[f] |= E << v & 67108863, this.words[f + 1] = E >>> 26 - v & 67108863, v += 24, v >= 26 && (v -= 26, f++);
      return this._strip();
    };
    function a(C, u) {
      var d = C.charCodeAt(u);
      if (d >= 48 && d <= 57)
        return d - 48;
      if (d >= 65 && d <= 70)
        return d - 55;
      if (d >= 97 && d <= 102)
        return d - 87;
      n(!1, "Invalid character in " + C);
    }
    function _(C, u, d) {
      var p = a(C, d);
      return d - 1 >= u && (p |= a(C, d - 1) << 4), p;
    }
    i.prototype._parseHex = function(u, d, p) {
      this.length = Math.ceil((u.length - d) / 6), this.words = new Array(this.length);
      for (var y = 0; y < this.length; y++)
        this.words[y] = 0;
      var f = 0, E = 0, v;
      if (p === "be")
        for (y = u.length - 1; y >= d; y -= 2)
          v = _(u, d, y) << f, this.words[E] |= v & 67108863, f >= 18 ? (f -= 18, E += 1, this.words[E] |= v >>> 26) : f += 8;
      else {
        var w = u.length - d;
        for (y = w % 2 === 0 ? d + 1 : d; y < u.length; y += 2)
          v = _(u, d, y) << f, this.words[E] |= v & 67108863, f >= 18 ? (f -= 18, E += 1, this.words[E] |= v >>> 26) : f += 8;
      }
      this._strip();
    };
    function A(C, u, d, p) {
      for (var y = 0, f = 0, E = Math.min(C.length, d), v = u; v < E; v++) {
        var w = C.charCodeAt(v) - 48;
        y *= p, w >= 49 ? f = w - 49 + 10 : w >= 17 ? f = w - 17 + 10 : f = w, n(w >= 0 && f < p, "Invalid character"), y += f;
      }
      return y;
    }
    i.prototype._parseBase = function(u, d, p) {
      this.words = [0], this.length = 1;
      for (var y = 0, f = 1; f <= 67108863; f *= d)
        y++;
      y--, f = f / d | 0;
      for (var E = u.length - p, v = E % y, w = Math.min(E, E - v) + p, h = 0, I = p; I < w; I += y)
        h = A(u, I, I + y, d), this.imuln(f), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
      if (v !== 0) {
        var J = 1;
        for (h = A(u, I, u.length, d), I = 0; I < v; I++)
          J *= d;
        this.imuln(J), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
      }
      this._strip();
    }, i.prototype.copy = function(u) {
      u.words = new Array(this.length);
      for (var d = 0; d < this.length; d++)
        u.words[d] = this.words[d];
      u.length = this.length, u.negative = this.negative, u.red = this.red;
    };
    function g(C, u) {
      C.words = u.words, C.length = u.length, C.negative = u.negative, C.red = u.red;
    }
    if (i.prototype._move = function(u) {
      g(u, this);
    }, i.prototype.clone = function() {
      var u = new i(null);
      return this.copy(u), u;
    }, i.prototype._expand = function(u) {
      for (; this.length < u; )
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
    var B = [
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
    ], N = [
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
    ], T = [
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
    i.prototype.toString = function(u, d) {
      u = u || 10, d = d | 0 || 1;
      var p;
      if (u === 16 || u === "hex") {
        p = "";
        for (var y = 0, f = 0, E = 0; E < this.length; E++) {
          var v = this.words[E], w = ((v << y | f) & 16777215).toString(16);
          f = v >>> 24 - y & 16777215, y += 2, y >= 26 && (y -= 26, E--), f !== 0 || E !== this.length - 1 ? p = B[6 - w.length] + w + p : p = w + p;
        }
        for (f !== 0 && (p = f.toString(16) + p); p.length % d !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      if (u === (u | 0) && u >= 2 && u <= 36) {
        var h = N[u], I = T[u];
        p = "";
        var J = this.clone();
        for (J.negative = 0; !J.isZero(); ) {
          var V = J.modrn(I).toString(u);
          J = J.idivn(I), J.isZero() ? p = V + p : p = B[h - V.length] + V + p;
        }
        for (this.isZero() && (p = "0" + p); p.length % d !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      n(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var u = this.words[0];
      return this.length === 2 ? u += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? u += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -u : u;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(u, d) {
      return this.toArrayLike(o, u, d);
    }), i.prototype.toArray = function(u, d) {
      return this.toArrayLike(Array, u, d);
    };
    var x = function(u, d) {
      return u.allocUnsafe ? u.allocUnsafe(d) : new u(d);
    };
    i.prototype.toArrayLike = function(u, d, p) {
      this._strip();
      var y = this.byteLength(), f = p || Math.max(1, y);
      n(y <= f, "byte array longer than desired length"), n(f > 0, "Requested array length <= 0");
      var E = x(u, f), v = d === "le" ? "LE" : "BE";
      return this["_toArrayLike" + v](E, y), E;
    }, i.prototype._toArrayLikeLE = function(u, d) {
      for (var p = 0, y = 0, f = 0, E = 0; f < this.length; f++) {
        var v = this.words[f] << E | y;
        u[p++] = v & 255, p < u.length && (u[p++] = v >> 8 & 255), p < u.length && (u[p++] = v >> 16 & 255), E === 6 ? (p < u.length && (u[p++] = v >> 24 & 255), y = 0, E = 0) : (y = v >>> 24, E += 2);
      }
      if (p < u.length)
        for (u[p++] = y; p < u.length; )
          u[p++] = 0;
    }, i.prototype._toArrayLikeBE = function(u, d) {
      for (var p = u.length - 1, y = 0, f = 0, E = 0; f < this.length; f++) {
        var v = this.words[f] << E | y;
        u[p--] = v & 255, p >= 0 && (u[p--] = v >> 8 & 255), p >= 0 && (u[p--] = v >> 16 & 255), E === 6 ? (p >= 0 && (u[p--] = v >> 24 & 255), y = 0, E = 0) : (y = v >>> 24, E += 2);
      }
      if (p >= 0)
        for (u[p--] = y; p >= 0; )
          u[p--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(u) {
      return 32 - Math.clz32(u);
    } : i.prototype._countBits = function(u) {
      var d = u, p = 0;
      return d >= 4096 && (p += 13, d >>>= 13), d >= 64 && (p += 7, d >>>= 7), d >= 8 && (p += 4, d >>>= 4), d >= 2 && (p += 2, d >>>= 2), p + d;
    }, i.prototype._zeroBits = function(u) {
      if (u === 0) return 26;
      var d = u, p = 0;
      return d & 8191 || (p += 13, d >>>= 13), d & 127 || (p += 7, d >>>= 7), d & 15 || (p += 4, d >>>= 4), d & 3 || (p += 2, d >>>= 2), d & 1 || p++, p;
    }, i.prototype.bitLength = function() {
      var u = this.words[this.length - 1], d = this._countBits(u);
      return (this.length - 1) * 26 + d;
    };
    function F(C) {
      for (var u = new Array(C.bitLength()), d = 0; d < u.length; d++) {
        var p = d / 26 | 0, y = d % 26;
        u[d] = C.words[p] >>> y & 1;
      }
      return u;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero()) return 0;
      for (var u = 0, d = 0; d < this.length; d++) {
        var p = this._zeroBits(this.words[d]);
        if (u += p, p !== 26) break;
      }
      return u;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(u) {
      return this.negative !== 0 ? this.abs().inotn(u).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(u) {
      return this.testn(u - 1) ? this.notn(u).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(u) {
      for (; this.length < u.length; )
        this.words[this.length++] = 0;
      for (var d = 0; d < u.length; d++)
        this.words[d] = this.words[d] | u.words[d];
      return this._strip();
    }, i.prototype.ior = function(u) {
      return n((this.negative | u.negative) === 0), this.iuor(u);
    }, i.prototype.or = function(u) {
      return this.length > u.length ? this.clone().ior(u) : u.clone().ior(this);
    }, i.prototype.uor = function(u) {
      return this.length > u.length ? this.clone().iuor(u) : u.clone().iuor(this);
    }, i.prototype.iuand = function(u) {
      var d;
      this.length > u.length ? d = u : d = this;
      for (var p = 0; p < d.length; p++)
        this.words[p] = this.words[p] & u.words[p];
      return this.length = d.length, this._strip();
    }, i.prototype.iand = function(u) {
      return n((this.negative | u.negative) === 0), this.iuand(u);
    }, i.prototype.and = function(u) {
      return this.length > u.length ? this.clone().iand(u) : u.clone().iand(this);
    }, i.prototype.uand = function(u) {
      return this.length > u.length ? this.clone().iuand(u) : u.clone().iuand(this);
    }, i.prototype.iuxor = function(u) {
      var d, p;
      this.length > u.length ? (d = this, p = u) : (d = u, p = this);
      for (var y = 0; y < p.length; y++)
        this.words[y] = d.words[y] ^ p.words[y];
      if (this !== d)
        for (; y < d.length; y++)
          this.words[y] = d.words[y];
      return this.length = d.length, this._strip();
    }, i.prototype.ixor = function(u) {
      return n((this.negative | u.negative) === 0), this.iuxor(u);
    }, i.prototype.xor = function(u) {
      return this.length > u.length ? this.clone().ixor(u) : u.clone().ixor(this);
    }, i.prototype.uxor = function(u) {
      return this.length > u.length ? this.clone().iuxor(u) : u.clone().iuxor(this);
    }, i.prototype.inotn = function(u) {
      n(typeof u == "number" && u >= 0);
      var d = Math.ceil(u / 26) | 0, p = u % 26;
      this._expand(d), p > 0 && d--;
      for (var y = 0; y < d; y++)
        this.words[y] = ~this.words[y] & 67108863;
      return p > 0 && (this.words[y] = ~this.words[y] & 67108863 >> 26 - p), this._strip();
    }, i.prototype.notn = function(u) {
      return this.clone().inotn(u);
    }, i.prototype.setn = function(u, d) {
      n(typeof u == "number" && u >= 0);
      var p = u / 26 | 0, y = u % 26;
      return this._expand(p + 1), d ? this.words[p] = this.words[p] | 1 << y : this.words[p] = this.words[p] & ~(1 << y), this._strip();
    }, i.prototype.iadd = function(u) {
      var d;
      if (this.negative !== 0 && u.negative === 0)
        return this.negative = 0, d = this.isub(u), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && u.negative !== 0)
        return u.negative = 0, d = this.isub(u), u.negative = 1, d._normSign();
      var p, y;
      this.length > u.length ? (p = this, y = u) : (p = u, y = this);
      for (var f = 0, E = 0; E < y.length; E++)
        d = (p.words[E] | 0) + (y.words[E] | 0) + f, this.words[E] = d & 67108863, f = d >>> 26;
      for (; f !== 0 && E < p.length; E++)
        d = (p.words[E] | 0) + f, this.words[E] = d & 67108863, f = d >>> 26;
      if (this.length = p.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (p !== this)
        for (; E < p.length; E++)
          this.words[E] = p.words[E];
      return this;
    }, i.prototype.add = function(u) {
      var d;
      return u.negative !== 0 && this.negative === 0 ? (u.negative = 0, d = this.sub(u), u.negative ^= 1, d) : u.negative === 0 && this.negative !== 0 ? (this.negative = 0, d = u.sub(this), this.negative = 1, d) : this.length > u.length ? this.clone().iadd(u) : u.clone().iadd(this);
    }, i.prototype.isub = function(u) {
      if (u.negative !== 0) {
        u.negative = 0;
        var d = this.iadd(u);
        return u.negative = 1, d._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(u), this.negative = 1, this._normSign();
      var p = this.cmp(u);
      if (p === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var y, f;
      p > 0 ? (y = this, f = u) : (y = u, f = this);
      for (var E = 0, v = 0; v < f.length; v++)
        d = (y.words[v] | 0) - (f.words[v] | 0) + E, E = d >> 26, this.words[v] = d & 67108863;
      for (; E !== 0 && v < y.length; v++)
        d = (y.words[v] | 0) + E, E = d >> 26, this.words[v] = d & 67108863;
      if (E === 0 && v < y.length && y !== this)
        for (; v < y.length; v++)
          this.words[v] = y.words[v];
      return this.length = Math.max(this.length, v), y !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(u) {
      return this.clone().isub(u);
    };
    function O(C, u, d) {
      d.negative = u.negative ^ C.negative;
      var p = C.length + u.length | 0;
      d.length = p, p = p - 1 | 0;
      var y = C.words[0] | 0, f = u.words[0] | 0, E = y * f, v = E & 67108863, w = E / 67108864 | 0;
      d.words[0] = v;
      for (var h = 1; h < p; h++) {
        for (var I = w >>> 26, J = w & 67108863, V = Math.min(h, u.length - 1), rt = Math.max(0, h - C.length + 1); rt <= V; rt++) {
          var tt = h - rt | 0;
          y = C.words[tt] | 0, f = u.words[rt] | 0, E = y * f + J, I += E / 67108864 | 0, J = E & 67108863;
        }
        d.words[h] = J | 0, w = I | 0;
      }
      return w !== 0 ? d.words[h] = w | 0 : d.length--, d._strip();
    }
    var j = function(u, d, p) {
      var y = u.words, f = d.words, E = p.words, v = 0, w, h, I, J = y[0] | 0, V = J & 8191, rt = J >>> 13, tt = y[1] | 0, it = tt & 8191, ot = tt >>> 13, xt = y[2] | 0, At = xt & 8191, ut = xt >>> 13, Et = y[3] | 0, ht = Et & 8191, mt = Et >>> 13, Ye = y[4] | 0, Dt = Ye & 8191, Bt = Ye >>> 13, vn = y[5] | 0, Lt = vn & 8191, Ut = vn >>> 13, _s = y[6] | 0, Ht = _s & 8191, Yt = _s >>> 13, za = y[7] | 0, Wt = za & 8191, Vt = za >>> 13, Ga = y[8] | 0, Zt = Ga & 8191, Jt = Ga >>> 13, Xa = y[9] | 0, jt = Xa & 8191, qt = Xa >>> 13, Ha = f[0] | 0, $t = Ha & 8191, Kt = Ha >>> 13, Ya = f[1] | 0, te = Ya & 8191, ee = Ya >>> 13, Wa = f[2] | 0, re = Wa & 8191, ne = Wa >>> 13, Va = f[3] | 0, se = Va & 8191, ie = Va >>> 13, Za = f[4] | 0, oe = Za & 8191, ae = Za >>> 13, Ja = f[5] | 0, ce = Ja & 8191, ue = Ja >>> 13, ja = f[6] | 0, de = ja & 8191, _e = ja >>> 13, qa = f[7] | 0, he = qa & 8191, le = qa >>> 13, $a = f[8] | 0, Ae = $a & 8191, pe = $a >>> 13, Ka = f[9] | 0, fe = Ka & 8191, ge = Ka >>> 13;
      p.negative = u.negative ^ d.negative, p.length = 19, w = Math.imul(V, $t), h = Math.imul(V, Kt), h = h + Math.imul(rt, $t) | 0, I = Math.imul(rt, Kt);
      var bi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, w = Math.imul(it, $t), h = Math.imul(it, Kt), h = h + Math.imul(ot, $t) | 0, I = Math.imul(ot, Kt), w = w + Math.imul(V, te) | 0, h = h + Math.imul(V, ee) | 0, h = h + Math.imul(rt, te) | 0, I = I + Math.imul(rt, ee) | 0;
      var Ii = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, w = Math.imul(At, $t), h = Math.imul(At, Kt), h = h + Math.imul(ut, $t) | 0, I = Math.imul(ut, Kt), w = w + Math.imul(it, te) | 0, h = h + Math.imul(it, ee) | 0, h = h + Math.imul(ot, te) | 0, I = I + Math.imul(ot, ee) | 0, w = w + Math.imul(V, re) | 0, h = h + Math.imul(V, ne) | 0, h = h + Math.imul(rt, re) | 0, I = I + Math.imul(rt, ne) | 0;
      var Ei = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, w = Math.imul(ht, $t), h = Math.imul(ht, Kt), h = h + Math.imul(mt, $t) | 0, I = Math.imul(mt, Kt), w = w + Math.imul(At, te) | 0, h = h + Math.imul(At, ee) | 0, h = h + Math.imul(ut, te) | 0, I = I + Math.imul(ut, ee) | 0, w = w + Math.imul(it, re) | 0, h = h + Math.imul(it, ne) | 0, h = h + Math.imul(ot, re) | 0, I = I + Math.imul(ot, ne) | 0, w = w + Math.imul(V, se) | 0, h = h + Math.imul(V, ie) | 0, h = h + Math.imul(rt, se) | 0, I = I + Math.imul(rt, ie) | 0;
      var vi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (vi >>> 26) | 0, vi &= 67108863, w = Math.imul(Dt, $t), h = Math.imul(Dt, Kt), h = h + Math.imul(Bt, $t) | 0, I = Math.imul(Bt, Kt), w = w + Math.imul(ht, te) | 0, h = h + Math.imul(ht, ee) | 0, h = h + Math.imul(mt, te) | 0, I = I + Math.imul(mt, ee) | 0, w = w + Math.imul(At, re) | 0, h = h + Math.imul(At, ne) | 0, h = h + Math.imul(ut, re) | 0, I = I + Math.imul(ut, ne) | 0, w = w + Math.imul(it, se) | 0, h = h + Math.imul(it, ie) | 0, h = h + Math.imul(ot, se) | 0, I = I + Math.imul(ot, ie) | 0, w = w + Math.imul(V, oe) | 0, h = h + Math.imul(V, ae) | 0, h = h + Math.imul(rt, oe) | 0, I = I + Math.imul(rt, ae) | 0;
      var Ci = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, w = Math.imul(Lt, $t), h = Math.imul(Lt, Kt), h = h + Math.imul(Ut, $t) | 0, I = Math.imul(Ut, Kt), w = w + Math.imul(Dt, te) | 0, h = h + Math.imul(Dt, ee) | 0, h = h + Math.imul(Bt, te) | 0, I = I + Math.imul(Bt, ee) | 0, w = w + Math.imul(ht, re) | 0, h = h + Math.imul(ht, ne) | 0, h = h + Math.imul(mt, re) | 0, I = I + Math.imul(mt, ne) | 0, w = w + Math.imul(At, se) | 0, h = h + Math.imul(At, ie) | 0, h = h + Math.imul(ut, se) | 0, I = I + Math.imul(ut, ie) | 0, w = w + Math.imul(it, oe) | 0, h = h + Math.imul(it, ae) | 0, h = h + Math.imul(ot, oe) | 0, I = I + Math.imul(ot, ae) | 0, w = w + Math.imul(V, ce) | 0, h = h + Math.imul(V, ue) | 0, h = h + Math.imul(rt, ce) | 0, I = I + Math.imul(rt, ue) | 0;
      var Bi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, w = Math.imul(Ht, $t), h = Math.imul(Ht, Kt), h = h + Math.imul(Yt, $t) | 0, I = Math.imul(Yt, Kt), w = w + Math.imul(Lt, te) | 0, h = h + Math.imul(Lt, ee) | 0, h = h + Math.imul(Ut, te) | 0, I = I + Math.imul(Ut, ee) | 0, w = w + Math.imul(Dt, re) | 0, h = h + Math.imul(Dt, ne) | 0, h = h + Math.imul(Bt, re) | 0, I = I + Math.imul(Bt, ne) | 0, w = w + Math.imul(ht, se) | 0, h = h + Math.imul(ht, ie) | 0, h = h + Math.imul(mt, se) | 0, I = I + Math.imul(mt, ie) | 0, w = w + Math.imul(At, oe) | 0, h = h + Math.imul(At, ae) | 0, h = h + Math.imul(ut, oe) | 0, I = I + Math.imul(ut, ae) | 0, w = w + Math.imul(it, ce) | 0, h = h + Math.imul(it, ue) | 0, h = h + Math.imul(ot, ce) | 0, I = I + Math.imul(ot, ue) | 0, w = w + Math.imul(V, de) | 0, h = h + Math.imul(V, _e) | 0, h = h + Math.imul(rt, de) | 0, I = I + Math.imul(rt, _e) | 0;
      var xi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, w = Math.imul(Wt, $t), h = Math.imul(Wt, Kt), h = h + Math.imul(Vt, $t) | 0, I = Math.imul(Vt, Kt), w = w + Math.imul(Ht, te) | 0, h = h + Math.imul(Ht, ee) | 0, h = h + Math.imul(Yt, te) | 0, I = I + Math.imul(Yt, ee) | 0, w = w + Math.imul(Lt, re) | 0, h = h + Math.imul(Lt, ne) | 0, h = h + Math.imul(Ut, re) | 0, I = I + Math.imul(Ut, ne) | 0, w = w + Math.imul(Dt, se) | 0, h = h + Math.imul(Dt, ie) | 0, h = h + Math.imul(Bt, se) | 0, I = I + Math.imul(Bt, ie) | 0, w = w + Math.imul(ht, oe) | 0, h = h + Math.imul(ht, ae) | 0, h = h + Math.imul(mt, oe) | 0, I = I + Math.imul(mt, ae) | 0, w = w + Math.imul(At, ce) | 0, h = h + Math.imul(At, ue) | 0, h = h + Math.imul(ut, ce) | 0, I = I + Math.imul(ut, ue) | 0, w = w + Math.imul(it, de) | 0, h = h + Math.imul(it, _e) | 0, h = h + Math.imul(ot, de) | 0, I = I + Math.imul(ot, _e) | 0, w = w + Math.imul(V, he) | 0, h = h + Math.imul(V, le) | 0, h = h + Math.imul(rt, he) | 0, I = I + Math.imul(rt, le) | 0;
      var Ri = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, w = Math.imul(Zt, $t), h = Math.imul(Zt, Kt), h = h + Math.imul(Jt, $t) | 0, I = Math.imul(Jt, Kt), w = w + Math.imul(Wt, te) | 0, h = h + Math.imul(Wt, ee) | 0, h = h + Math.imul(Vt, te) | 0, I = I + Math.imul(Vt, ee) | 0, w = w + Math.imul(Ht, re) | 0, h = h + Math.imul(Ht, ne) | 0, h = h + Math.imul(Yt, re) | 0, I = I + Math.imul(Yt, ne) | 0, w = w + Math.imul(Lt, se) | 0, h = h + Math.imul(Lt, ie) | 0, h = h + Math.imul(Ut, se) | 0, I = I + Math.imul(Ut, ie) | 0, w = w + Math.imul(Dt, oe) | 0, h = h + Math.imul(Dt, ae) | 0, h = h + Math.imul(Bt, oe) | 0, I = I + Math.imul(Bt, ae) | 0, w = w + Math.imul(ht, ce) | 0, h = h + Math.imul(ht, ue) | 0, h = h + Math.imul(mt, ce) | 0, I = I + Math.imul(mt, ue) | 0, w = w + Math.imul(At, de) | 0, h = h + Math.imul(At, _e) | 0, h = h + Math.imul(ut, de) | 0, I = I + Math.imul(ut, _e) | 0, w = w + Math.imul(it, he) | 0, h = h + Math.imul(it, le) | 0, h = h + Math.imul(ot, he) | 0, I = I + Math.imul(ot, le) | 0, w = w + Math.imul(V, Ae) | 0, h = h + Math.imul(V, pe) | 0, h = h + Math.imul(rt, Ae) | 0, I = I + Math.imul(rt, pe) | 0;
      var Si = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, w = Math.imul(jt, $t), h = Math.imul(jt, Kt), h = h + Math.imul(qt, $t) | 0, I = Math.imul(qt, Kt), w = w + Math.imul(Zt, te) | 0, h = h + Math.imul(Zt, ee) | 0, h = h + Math.imul(Jt, te) | 0, I = I + Math.imul(Jt, ee) | 0, w = w + Math.imul(Wt, re) | 0, h = h + Math.imul(Wt, ne) | 0, h = h + Math.imul(Vt, re) | 0, I = I + Math.imul(Vt, ne) | 0, w = w + Math.imul(Ht, se) | 0, h = h + Math.imul(Ht, ie) | 0, h = h + Math.imul(Yt, se) | 0, I = I + Math.imul(Yt, ie) | 0, w = w + Math.imul(Lt, oe) | 0, h = h + Math.imul(Lt, ae) | 0, h = h + Math.imul(Ut, oe) | 0, I = I + Math.imul(Ut, ae) | 0, w = w + Math.imul(Dt, ce) | 0, h = h + Math.imul(Dt, ue) | 0, h = h + Math.imul(Bt, ce) | 0, I = I + Math.imul(Bt, ue) | 0, w = w + Math.imul(ht, de) | 0, h = h + Math.imul(ht, _e) | 0, h = h + Math.imul(mt, de) | 0, I = I + Math.imul(mt, _e) | 0, w = w + Math.imul(At, he) | 0, h = h + Math.imul(At, le) | 0, h = h + Math.imul(ut, he) | 0, I = I + Math.imul(ut, le) | 0, w = w + Math.imul(it, Ae) | 0, h = h + Math.imul(it, pe) | 0, h = h + Math.imul(ot, Ae) | 0, I = I + Math.imul(ot, pe) | 0, w = w + Math.imul(V, fe) | 0, h = h + Math.imul(V, ge) | 0, h = h + Math.imul(rt, fe) | 0, I = I + Math.imul(rt, ge) | 0;
      var Ni = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, w = Math.imul(jt, te), h = Math.imul(jt, ee), h = h + Math.imul(qt, te) | 0, I = Math.imul(qt, ee), w = w + Math.imul(Zt, re) | 0, h = h + Math.imul(Zt, ne) | 0, h = h + Math.imul(Jt, re) | 0, I = I + Math.imul(Jt, ne) | 0, w = w + Math.imul(Wt, se) | 0, h = h + Math.imul(Wt, ie) | 0, h = h + Math.imul(Vt, se) | 0, I = I + Math.imul(Vt, ie) | 0, w = w + Math.imul(Ht, oe) | 0, h = h + Math.imul(Ht, ae) | 0, h = h + Math.imul(Yt, oe) | 0, I = I + Math.imul(Yt, ae) | 0, w = w + Math.imul(Lt, ce) | 0, h = h + Math.imul(Lt, ue) | 0, h = h + Math.imul(Ut, ce) | 0, I = I + Math.imul(Ut, ue) | 0, w = w + Math.imul(Dt, de) | 0, h = h + Math.imul(Dt, _e) | 0, h = h + Math.imul(Bt, de) | 0, I = I + Math.imul(Bt, _e) | 0, w = w + Math.imul(ht, he) | 0, h = h + Math.imul(ht, le) | 0, h = h + Math.imul(mt, he) | 0, I = I + Math.imul(mt, le) | 0, w = w + Math.imul(At, Ae) | 0, h = h + Math.imul(At, pe) | 0, h = h + Math.imul(ut, Ae) | 0, I = I + Math.imul(ut, pe) | 0, w = w + Math.imul(it, fe) | 0, h = h + Math.imul(it, ge) | 0, h = h + Math.imul(ot, fe) | 0, I = I + Math.imul(ot, ge) | 0;
      var Ti = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, w = Math.imul(jt, re), h = Math.imul(jt, ne), h = h + Math.imul(qt, re) | 0, I = Math.imul(qt, ne), w = w + Math.imul(Zt, se) | 0, h = h + Math.imul(Zt, ie) | 0, h = h + Math.imul(Jt, se) | 0, I = I + Math.imul(Jt, ie) | 0, w = w + Math.imul(Wt, oe) | 0, h = h + Math.imul(Wt, ae) | 0, h = h + Math.imul(Vt, oe) | 0, I = I + Math.imul(Vt, ae) | 0, w = w + Math.imul(Ht, ce) | 0, h = h + Math.imul(Ht, ue) | 0, h = h + Math.imul(Yt, ce) | 0, I = I + Math.imul(Yt, ue) | 0, w = w + Math.imul(Lt, de) | 0, h = h + Math.imul(Lt, _e) | 0, h = h + Math.imul(Ut, de) | 0, I = I + Math.imul(Ut, _e) | 0, w = w + Math.imul(Dt, he) | 0, h = h + Math.imul(Dt, le) | 0, h = h + Math.imul(Bt, he) | 0, I = I + Math.imul(Bt, le) | 0, w = w + Math.imul(ht, Ae) | 0, h = h + Math.imul(ht, pe) | 0, h = h + Math.imul(mt, Ae) | 0, I = I + Math.imul(mt, pe) | 0, w = w + Math.imul(At, fe) | 0, h = h + Math.imul(At, ge) | 0, h = h + Math.imul(ut, fe) | 0, I = I + Math.imul(ut, ge) | 0;
      var Qi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, w = Math.imul(jt, se), h = Math.imul(jt, ie), h = h + Math.imul(qt, se) | 0, I = Math.imul(qt, ie), w = w + Math.imul(Zt, oe) | 0, h = h + Math.imul(Zt, ae) | 0, h = h + Math.imul(Jt, oe) | 0, I = I + Math.imul(Jt, ae) | 0, w = w + Math.imul(Wt, ce) | 0, h = h + Math.imul(Wt, ue) | 0, h = h + Math.imul(Vt, ce) | 0, I = I + Math.imul(Vt, ue) | 0, w = w + Math.imul(Ht, de) | 0, h = h + Math.imul(Ht, _e) | 0, h = h + Math.imul(Yt, de) | 0, I = I + Math.imul(Yt, _e) | 0, w = w + Math.imul(Lt, he) | 0, h = h + Math.imul(Lt, le) | 0, h = h + Math.imul(Ut, he) | 0, I = I + Math.imul(Ut, le) | 0, w = w + Math.imul(Dt, Ae) | 0, h = h + Math.imul(Dt, pe) | 0, h = h + Math.imul(Bt, Ae) | 0, I = I + Math.imul(Bt, pe) | 0, w = w + Math.imul(ht, fe) | 0, h = h + Math.imul(ht, ge) | 0, h = h + Math.imul(mt, fe) | 0, I = I + Math.imul(mt, ge) | 0;
      var Di = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, w = Math.imul(jt, oe), h = Math.imul(jt, ae), h = h + Math.imul(qt, oe) | 0, I = Math.imul(qt, ae), w = w + Math.imul(Zt, ce) | 0, h = h + Math.imul(Zt, ue) | 0, h = h + Math.imul(Jt, ce) | 0, I = I + Math.imul(Jt, ue) | 0, w = w + Math.imul(Wt, de) | 0, h = h + Math.imul(Wt, _e) | 0, h = h + Math.imul(Vt, de) | 0, I = I + Math.imul(Vt, _e) | 0, w = w + Math.imul(Ht, he) | 0, h = h + Math.imul(Ht, le) | 0, h = h + Math.imul(Yt, he) | 0, I = I + Math.imul(Yt, le) | 0, w = w + Math.imul(Lt, Ae) | 0, h = h + Math.imul(Lt, pe) | 0, h = h + Math.imul(Ut, Ae) | 0, I = I + Math.imul(Ut, pe) | 0, w = w + Math.imul(Dt, fe) | 0, h = h + Math.imul(Dt, ge) | 0, h = h + Math.imul(Bt, fe) | 0, I = I + Math.imul(Bt, ge) | 0;
      var Fi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, w = Math.imul(jt, ce), h = Math.imul(jt, ue), h = h + Math.imul(qt, ce) | 0, I = Math.imul(qt, ue), w = w + Math.imul(Zt, de) | 0, h = h + Math.imul(Zt, _e) | 0, h = h + Math.imul(Jt, de) | 0, I = I + Math.imul(Jt, _e) | 0, w = w + Math.imul(Wt, he) | 0, h = h + Math.imul(Wt, le) | 0, h = h + Math.imul(Vt, he) | 0, I = I + Math.imul(Vt, le) | 0, w = w + Math.imul(Ht, Ae) | 0, h = h + Math.imul(Ht, pe) | 0, h = h + Math.imul(Yt, Ae) | 0, I = I + Math.imul(Yt, pe) | 0, w = w + Math.imul(Lt, fe) | 0, h = h + Math.imul(Lt, ge) | 0, h = h + Math.imul(Ut, fe) | 0, I = I + Math.imul(Ut, ge) | 0;
      var Mi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, w = Math.imul(jt, de), h = Math.imul(jt, _e), h = h + Math.imul(qt, de) | 0, I = Math.imul(qt, _e), w = w + Math.imul(Zt, he) | 0, h = h + Math.imul(Zt, le) | 0, h = h + Math.imul(Jt, he) | 0, I = I + Math.imul(Jt, le) | 0, w = w + Math.imul(Wt, Ae) | 0, h = h + Math.imul(Wt, pe) | 0, h = h + Math.imul(Vt, Ae) | 0, I = I + Math.imul(Vt, pe) | 0, w = w + Math.imul(Ht, fe) | 0, h = h + Math.imul(Ht, ge) | 0, h = h + Math.imul(Yt, fe) | 0, I = I + Math.imul(Yt, ge) | 0;
      var Oi = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, w = Math.imul(jt, he), h = Math.imul(jt, le), h = h + Math.imul(qt, he) | 0, I = Math.imul(qt, le), w = w + Math.imul(Zt, Ae) | 0, h = h + Math.imul(Zt, pe) | 0, h = h + Math.imul(Jt, Ae) | 0, I = I + Math.imul(Jt, pe) | 0, w = w + Math.imul(Wt, fe) | 0, h = h + Math.imul(Wt, ge) | 0, h = h + Math.imul(Vt, fe) | 0, I = I + Math.imul(Vt, ge) | 0;
      var Li = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, w = Math.imul(jt, Ae), h = Math.imul(jt, pe), h = h + Math.imul(qt, Ae) | 0, I = Math.imul(qt, pe), w = w + Math.imul(Zt, fe) | 0, h = h + Math.imul(Zt, ge) | 0, h = h + Math.imul(Jt, fe) | 0, I = I + Math.imul(Jt, ge) | 0;
      var ki = (v + w | 0) + ((h & 8191) << 13) | 0;
      v = (I + (h >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, w = Math.imul(jt, fe), h = Math.imul(jt, ge), h = h + Math.imul(qt, fe) | 0, I = Math.imul(qt, ge);
      var Pi = (v + w | 0) + ((h & 8191) << 13) | 0;
      return v = (I + (h >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, E[0] = bi, E[1] = Ii, E[2] = Ei, E[3] = vi, E[4] = Ci, E[5] = Bi, E[6] = xi, E[7] = Ri, E[8] = Si, E[9] = Ni, E[10] = Ti, E[11] = Qi, E[12] = Di, E[13] = Fi, E[14] = Mi, E[15] = Oi, E[16] = Li, E[17] = ki, E[18] = Pi, v !== 0 && (E[19] = v, p.length++), p;
    };
    Math.imul || (j = O);
    function P(C, u, d) {
      d.negative = u.negative ^ C.negative, d.length = C.length + u.length;
      for (var p = 0, y = 0, f = 0; f < d.length - 1; f++) {
        var E = y;
        y = 0;
        for (var v = p & 67108863, w = Math.min(f, u.length - 1), h = Math.max(0, f - C.length + 1); h <= w; h++) {
          var I = f - h, J = C.words[I] | 0, V = u.words[h] | 0, rt = J * V, tt = rt & 67108863;
          E = E + (rt / 67108864 | 0) | 0, tt = tt + v | 0, v = tt & 67108863, E = E + (tt >>> 26) | 0, y += E >>> 26, E &= 67108863;
        }
        d.words[f] = v, p = E, E = y;
      }
      return p !== 0 ? d.words[f] = p : d.length--, d._strip();
    }
    function Z(C, u, d) {
      return P(C, u, d);
    }
    i.prototype.mulTo = function(u, d) {
      var p, y = this.length + u.length;
      return this.length === 10 && u.length === 10 ? p = j(this, u, d) : y < 63 ? p = O(this, u, d) : y < 1024 ? p = P(this, u, d) : p = Z(this, u, d), p;
    }, i.prototype.mul = function(u) {
      var d = new i(null);
      return d.words = new Array(this.length + u.length), this.mulTo(u, d);
    }, i.prototype.mulf = function(u) {
      var d = new i(null);
      return d.words = new Array(this.length + u.length), Z(this, u, d);
    }, i.prototype.imul = function(u) {
      return this.clone().mulTo(u, this);
    }, i.prototype.imuln = function(u) {
      var d = u < 0;
      d && (u = -u), n(typeof u == "number"), n(u < 67108864);
      for (var p = 0, y = 0; y < this.length; y++) {
        var f = (this.words[y] | 0) * u, E = (f & 67108863) + (p & 67108863);
        p >>= 26, p += f / 67108864 | 0, p += E >>> 26, this.words[y] = E & 67108863;
      }
      return p !== 0 && (this.words[y] = p, this.length++), d ? this.ineg() : this;
    }, i.prototype.muln = function(u) {
      return this.clone().imuln(u);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(u) {
      var d = F(u);
      if (d.length === 0) return new i(1);
      for (var p = this, y = 0; y < d.length && d[y] === 0; y++, p = p.sqr())
        ;
      if (++y < d.length)
        for (var f = p.sqr(); y < d.length; y++, f = f.sqr())
          d[y] !== 0 && (p = p.mul(f));
      return p;
    }, i.prototype.iushln = function(u) {
      n(typeof u == "number" && u >= 0);
      var d = u % 26, p = (u - d) / 26, y = 67108863 >>> 26 - d << 26 - d, f;
      if (d !== 0) {
        var E = 0;
        for (f = 0; f < this.length; f++) {
          var v = this.words[f] & y, w = (this.words[f] | 0) - v << d;
          this.words[f] = w | E, E = v >>> 26 - d;
        }
        E && (this.words[f] = E, this.length++);
      }
      if (p !== 0) {
        for (f = this.length - 1; f >= 0; f--)
          this.words[f + p] = this.words[f];
        for (f = 0; f < p; f++)
          this.words[f] = 0;
        this.length += p;
      }
      return this._strip();
    }, i.prototype.ishln = function(u) {
      return n(this.negative === 0), this.iushln(u);
    }, i.prototype.iushrn = function(u, d, p) {
      n(typeof u == "number" && u >= 0);
      var y;
      d ? y = (d - d % 26) / 26 : y = 0;
      var f = u % 26, E = Math.min((u - f) / 26, this.length), v = 67108863 ^ 67108863 >>> f << f, w = p;
      if (y -= E, y = Math.max(0, y), w) {
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
      for (h = this.length - 1; h >= 0 && (I !== 0 || h >= y); h--) {
        var J = this.words[h] | 0;
        this.words[h] = I << 26 - f | J >>> f, I = J & v;
      }
      return w && I !== 0 && (w.words[w.length++] = I), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(u, d, p) {
      return n(this.negative === 0), this.iushrn(u, d, p);
    }, i.prototype.shln = function(u) {
      return this.clone().ishln(u);
    }, i.prototype.ushln = function(u) {
      return this.clone().iushln(u);
    }, i.prototype.shrn = function(u) {
      return this.clone().ishrn(u);
    }, i.prototype.ushrn = function(u) {
      return this.clone().iushrn(u);
    }, i.prototype.testn = function(u) {
      n(typeof u == "number" && u >= 0);
      var d = u % 26, p = (u - d) / 26, y = 1 << d;
      if (this.length <= p) return !1;
      var f = this.words[p];
      return !!(f & y);
    }, i.prototype.imaskn = function(u) {
      n(typeof u == "number" && u >= 0);
      var d = u % 26, p = (u - d) / 26;
      if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
        return this;
      if (d !== 0 && p++, this.length = Math.min(p, this.length), d !== 0) {
        var y = 67108863 ^ 67108863 >>> d << d;
        this.words[this.length - 1] &= y;
      }
      return this._strip();
    }, i.prototype.maskn = function(u) {
      return this.clone().imaskn(u);
    }, i.prototype.iaddn = function(u) {
      return n(typeof u == "number"), n(u < 67108864), u < 0 ? this.isubn(-u) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= u ? (this.words[0] = u - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(u), this.negative = 1, this) : this._iaddn(u);
    }, i.prototype._iaddn = function(u) {
      this.words[0] += u;
      for (var d = 0; d < this.length && this.words[d] >= 67108864; d++)
        this.words[d] -= 67108864, d === this.length - 1 ? this.words[d + 1] = 1 : this.words[d + 1]++;
      return this.length = Math.max(this.length, d + 1), this;
    }, i.prototype.isubn = function(u) {
      if (n(typeof u == "number"), n(u < 67108864), u < 0) return this.iaddn(-u);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(u), this.negative = 1, this;
      if (this.words[0] -= u, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var d = 0; d < this.length && this.words[d] < 0; d++)
          this.words[d] += 67108864, this.words[d + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(u) {
      return this.clone().iaddn(u);
    }, i.prototype.subn = function(u) {
      return this.clone().isubn(u);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(u, d, p) {
      var y = u.length + p, f;
      this._expand(y);
      var E, v = 0;
      for (f = 0; f < u.length; f++) {
        E = (this.words[f + p] | 0) + v;
        var w = (u.words[f] | 0) * d;
        E -= w & 67108863, v = (E >> 26) - (w / 67108864 | 0), this.words[f + p] = E & 67108863;
      }
      for (; f < this.length - p; f++)
        E = (this.words[f + p] | 0) + v, v = E >> 26, this.words[f + p] = E & 67108863;
      if (v === 0) return this._strip();
      for (n(v === -1), v = 0, f = 0; f < this.length; f++)
        E = -(this.words[f] | 0) + v, v = E >> 26, this.words[f] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(u, d) {
      var p = this.length - u.length, y = this.clone(), f = u, E = f.words[f.length - 1] | 0, v = this._countBits(E);
      p = 26 - v, p !== 0 && (f = f.ushln(p), y.iushln(p), E = f.words[f.length - 1] | 0);
      var w = y.length - f.length, h;
      if (d !== "mod") {
        h = new i(null), h.length = w + 1, h.words = new Array(h.length);
        for (var I = 0; I < h.length; I++)
          h.words[I] = 0;
      }
      var J = y.clone()._ishlnsubmul(f, 1, w);
      J.negative === 0 && (y = J, h && (h.words[w] = 1));
      for (var V = w - 1; V >= 0; V--) {
        var rt = (y.words[f.length + V] | 0) * 67108864 + (y.words[f.length + V - 1] | 0);
        for (rt = Math.min(rt / E | 0, 67108863), y._ishlnsubmul(f, rt, V); y.negative !== 0; )
          rt--, y.negative = 0, y._ishlnsubmul(f, 1, V), y.isZero() || (y.negative ^= 1);
        h && (h.words[V] = rt);
      }
      return h && h._strip(), y._strip(), d !== "div" && p !== 0 && y.iushrn(p), {
        div: h || null,
        mod: y
      };
    }, i.prototype.divmod = function(u, d, p) {
      if (n(!u.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var y, f, E;
      return this.negative !== 0 && u.negative === 0 ? (E = this.neg().divmod(u, d), d !== "mod" && (y = E.div.neg()), d !== "div" && (f = E.mod.neg(), p && f.negative !== 0 && f.iadd(u)), {
        div: y,
        mod: f
      }) : this.negative === 0 && u.negative !== 0 ? (E = this.divmod(u.neg(), d), d !== "mod" && (y = E.div.neg()), {
        div: y,
        mod: E.mod
      }) : this.negative & u.negative ? (E = this.neg().divmod(u.neg(), d), d !== "div" && (f = E.mod.neg(), p && f.negative !== 0 && f.isub(u)), {
        div: E.div,
        mod: f
      }) : u.length > this.length || this.cmp(u) < 0 ? {
        div: new i(0),
        mod: this
      } : u.length === 1 ? d === "div" ? {
        div: this.divn(u.words[0]),
        mod: null
      } : d === "mod" ? {
        div: null,
        mod: new i(this.modrn(u.words[0]))
      } : {
        div: this.divn(u.words[0]),
        mod: new i(this.modrn(u.words[0]))
      } : this._wordDiv(u, d);
    }, i.prototype.div = function(u) {
      return this.divmod(u, "div", !1).div;
    }, i.prototype.mod = function(u) {
      return this.divmod(u, "mod", !1).mod;
    }, i.prototype.umod = function(u) {
      return this.divmod(u, "mod", !0).mod;
    }, i.prototype.divRound = function(u) {
      var d = this.divmod(u);
      if (d.mod.isZero()) return d.div;
      var p = d.div.negative !== 0 ? d.mod.isub(u) : d.mod, y = u.ushrn(1), f = u.andln(1), E = p.cmp(y);
      return E < 0 || f === 1 && E === 0 ? d.div : d.div.negative !== 0 ? d.div.isubn(1) : d.div.iaddn(1);
    }, i.prototype.modrn = function(u) {
      var d = u < 0;
      d && (u = -u), n(u <= 67108863);
      for (var p = (1 << 26) % u, y = 0, f = this.length - 1; f >= 0; f--)
        y = (p * y + (this.words[f] | 0)) % u;
      return d ? -y : y;
    }, i.prototype.modn = function(u) {
      return this.modrn(u);
    }, i.prototype.idivn = function(u) {
      var d = u < 0;
      d && (u = -u), n(u <= 67108863);
      for (var p = 0, y = this.length - 1; y >= 0; y--) {
        var f = (this.words[y] | 0) + p * 67108864;
        this.words[y] = f / u | 0, p = f % u;
      }
      return this._strip(), d ? this.ineg() : this;
    }, i.prototype.divn = function(u) {
      return this.clone().idivn(u);
    }, i.prototype.egcd = function(u) {
      n(u.negative === 0), n(!u.isZero());
      var d = this, p = u.clone();
      d.negative !== 0 ? d = d.umod(u) : d = d.clone();
      for (var y = new i(1), f = new i(0), E = new i(0), v = new i(1), w = 0; d.isEven() && p.isEven(); )
        d.iushrn(1), p.iushrn(1), ++w;
      for (var h = p.clone(), I = d.clone(); !d.isZero(); ) {
        for (var J = 0, V = 1; !(d.words[0] & V) && J < 26; ++J, V <<= 1) ;
        if (J > 0)
          for (d.iushrn(J); J-- > 0; )
            (y.isOdd() || f.isOdd()) && (y.iadd(h), f.isub(I)), y.iushrn(1), f.iushrn(1);
        for (var rt = 0, tt = 1; !(p.words[0] & tt) && rt < 26; ++rt, tt <<= 1) ;
        if (rt > 0)
          for (p.iushrn(rt); rt-- > 0; )
            (E.isOdd() || v.isOdd()) && (E.iadd(h), v.isub(I)), E.iushrn(1), v.iushrn(1);
        d.cmp(p) >= 0 ? (d.isub(p), y.isub(E), f.isub(v)) : (p.isub(d), E.isub(y), v.isub(f));
      }
      return {
        a: E,
        b: v,
        gcd: p.iushln(w)
      };
    }, i.prototype._invmp = function(u) {
      n(u.negative === 0), n(!u.isZero());
      var d = this, p = u.clone();
      d.negative !== 0 ? d = d.umod(u) : d = d.clone();
      for (var y = new i(1), f = new i(0), E = p.clone(); d.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
        for (var v = 0, w = 1; !(d.words[0] & w) && v < 26; ++v, w <<= 1) ;
        if (v > 0)
          for (d.iushrn(v); v-- > 0; )
            y.isOdd() && y.iadd(E), y.iushrn(1);
        for (var h = 0, I = 1; !(p.words[0] & I) && h < 26; ++h, I <<= 1) ;
        if (h > 0)
          for (p.iushrn(h); h-- > 0; )
            f.isOdd() && f.iadd(E), f.iushrn(1);
        d.cmp(p) >= 0 ? (d.isub(p), y.isub(f)) : (p.isub(d), f.isub(y));
      }
      var J;
      return d.cmpn(1) === 0 ? J = y : J = f, J.cmpn(0) < 0 && J.iadd(u), J;
    }, i.prototype.gcd = function(u) {
      if (this.isZero()) return u.abs();
      if (u.isZero()) return this.abs();
      var d = this.clone(), p = u.clone();
      d.negative = 0, p.negative = 0;
      for (var y = 0; d.isEven() && p.isEven(); y++)
        d.iushrn(1), p.iushrn(1);
      do {
        for (; d.isEven(); )
          d.iushrn(1);
        for (; p.isEven(); )
          p.iushrn(1);
        var f = d.cmp(p);
        if (f < 0) {
          var E = d;
          d = p, p = E;
        } else if (f === 0 || p.cmpn(1) === 0)
          break;
        d.isub(p);
      } while (!0);
      return p.iushln(y);
    }, i.prototype.invm = function(u) {
      return this.egcd(u).a.umod(u);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(u) {
      return this.words[0] & u;
    }, i.prototype.bincn = function(u) {
      n(typeof u == "number");
      var d = u % 26, p = (u - d) / 26, y = 1 << d;
      if (this.length <= p)
        return this._expand(p + 1), this.words[p] |= y, this;
      for (var f = y, E = p; f !== 0 && E < this.length; E++) {
        var v = this.words[E] | 0;
        v += f, f = v >>> 26, v &= 67108863, this.words[E] = v;
      }
      return f !== 0 && (this.words[E] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(u) {
      var d = u < 0;
      if (this.negative !== 0 && !d) return -1;
      if (this.negative === 0 && d) return 1;
      this._strip();
      var p;
      if (this.length > 1)
        p = 1;
      else {
        d && (u = -u), n(u <= 67108863, "Number is too big");
        var y = this.words[0] | 0;
        p = y === u ? 0 : y < u ? -1 : 1;
      }
      return this.negative !== 0 ? -p | 0 : p;
    }, i.prototype.cmp = function(u) {
      if (this.negative !== 0 && u.negative === 0) return -1;
      if (this.negative === 0 && u.negative !== 0) return 1;
      var d = this.ucmp(u);
      return this.negative !== 0 ? -d | 0 : d;
    }, i.prototype.ucmp = function(u) {
      if (this.length > u.length) return 1;
      if (this.length < u.length) return -1;
      for (var d = 0, p = this.length - 1; p >= 0; p--) {
        var y = this.words[p] | 0, f = u.words[p] | 0;
        if (y !== f) {
          y < f ? d = -1 : y > f && (d = 1);
          break;
        }
      }
      return d;
    }, i.prototype.gtn = function(u) {
      return this.cmpn(u) === 1;
    }, i.prototype.gt = function(u) {
      return this.cmp(u) === 1;
    }, i.prototype.gten = function(u) {
      return this.cmpn(u) >= 0;
    }, i.prototype.gte = function(u) {
      return this.cmp(u) >= 0;
    }, i.prototype.ltn = function(u) {
      return this.cmpn(u) === -1;
    }, i.prototype.lt = function(u) {
      return this.cmp(u) === -1;
    }, i.prototype.lten = function(u) {
      return this.cmpn(u) <= 0;
    }, i.prototype.lte = function(u) {
      return this.cmp(u) <= 0;
    }, i.prototype.eqn = function(u) {
      return this.cmpn(u) === 0;
    }, i.prototype.eq = function(u) {
      return this.cmp(u) === 0;
    }, i.red = function(u) {
      return new Y(u);
    }, i.prototype.toRed = function(u) {
      return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), u.convertTo(this)._forceRed(u);
    }, i.prototype.fromRed = function() {
      return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(u) {
      return this.red = u, this;
    }, i.prototype.forceRed = function(u) {
      return n(!this.red, "Already a number in reduction context"), this._forceRed(u);
    }, i.prototype.redAdd = function(u) {
      return n(this.red, "redAdd works only with red numbers"), this.red.add(this, u);
    }, i.prototype.redIAdd = function(u) {
      return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, u);
    }, i.prototype.redSub = function(u) {
      return n(this.red, "redSub works only with red numbers"), this.red.sub(this, u);
    }, i.prototype.redISub = function(u) {
      return n(this.red, "redISub works only with red numbers"), this.red.isub(this, u);
    }, i.prototype.redShl = function(u) {
      return n(this.red, "redShl works only with red numbers"), this.red.shl(this, u);
    }, i.prototype.redMul = function(u) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.mul(this, u);
    }, i.prototype.redIMul = function(u) {
      return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.imul(this, u);
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
    }, i.prototype.redPow = function(u) {
      return n(this.red && !u.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, u);
    };
    var L = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function D(C, u) {
      this.name = C, this.p = new i(u, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    D.prototype._tmp = function() {
      var u = new i(null);
      return u.words = new Array(Math.ceil(this.n / 13)), u;
    }, D.prototype.ireduce = function(u) {
      var d = u, p;
      do
        this.split(d, this.tmp), d = this.imulK(d), d = d.iadd(this.tmp), p = d.bitLength();
      while (p > this.n);
      var y = p < this.n ? -1 : d.ucmp(this.p);
      return y === 0 ? (d.words[0] = 0, d.length = 1) : y > 0 ? d.isub(this.p) : d.strip !== void 0 ? d.strip() : d._strip(), d;
    }, D.prototype.split = function(u, d) {
      u.iushrn(this.n, 0, d);
    }, D.prototype.imulK = function(u) {
      return u.imul(this.k);
    };
    function z() {
      D.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(z, D), z.prototype.split = function(u, d) {
      for (var p = 4194303, y = Math.min(u.length, 9), f = 0; f < y; f++)
        d.words[f] = u.words[f];
      if (d.length = y, u.length <= 9) {
        u.words[0] = 0, u.length = 1;
        return;
      }
      var E = u.words[9];
      for (d.words[d.length++] = E & p, f = 10; f < u.length; f++) {
        var v = u.words[f] | 0;
        u.words[f - 10] = (v & p) << 4 | E >>> 22, E = v;
      }
      E >>>= 22, u.words[f - 10] = E, E === 0 && u.length > 10 ? u.length -= 10 : u.length -= 9;
    }, z.prototype.imulK = function(u) {
      u.words[u.length] = 0, u.words[u.length + 1] = 0, u.length += 2;
      for (var d = 0, p = 0; p < u.length; p++) {
        var y = u.words[p] | 0;
        d += y * 977, u.words[p] = d & 67108863, d = y * 64 + (d / 67108864 | 0);
      }
      return u.words[u.length - 1] === 0 && (u.length--, u.words[u.length - 1] === 0 && u.length--), u;
    };
    function U() {
      D.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(U, D);
    function G() {
      D.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(G, D);
    function H() {
      D.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(H, D), H.prototype.imulK = function(u) {
      for (var d = 0, p = 0; p < u.length; p++) {
        var y = (u.words[p] | 0) * 19 + d, f = y & 67108863;
        y >>>= 26, u.words[p] = f, d = y;
      }
      return d !== 0 && (u.words[u.length++] = d), u;
    }, i._prime = function(u) {
      if (L[u]) return L[u];
      var d;
      if (u === "k256")
        d = new z();
      else if (u === "p224")
        d = new U();
      else if (u === "p192")
        d = new G();
      else if (u === "p25519")
        d = new H();
      else
        throw new Error("Unknown prime " + u);
      return L[u] = d, d;
    };
    function Y(C) {
      if (typeof C == "string") {
        var u = i._prime(C);
        this.m = u.p, this.prime = u;
      } else
        n(C.gtn(1), "modulus must be greater than 1"), this.m = C, this.prime = null;
    }
    Y.prototype._verify1 = function(u) {
      n(u.negative === 0, "red works only with positives"), n(u.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(u, d) {
      n((u.negative | d.negative) === 0, "red works only with positives"), n(
        u.red && u.red === d.red,
        "red works only with red numbers"
      );
    }, Y.prototype.imod = function(u) {
      return this.prime ? this.prime.ireduce(u)._forceRed(this) : (g(u, u.umod(this.m)._forceRed(this)), u);
    }, Y.prototype.neg = function(u) {
      return u.isZero() ? u.clone() : this.m.sub(u)._forceRed(this);
    }, Y.prototype.add = function(u, d) {
      this._verify2(u, d);
      var p = u.add(d);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
    }, Y.prototype.iadd = function(u, d) {
      this._verify2(u, d);
      var p = u.iadd(d);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p;
    }, Y.prototype.sub = function(u, d) {
      this._verify2(u, d);
      var p = u.sub(d);
      return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
    }, Y.prototype.isub = function(u, d) {
      this._verify2(u, d);
      var p = u.isub(d);
      return p.cmpn(0) < 0 && p.iadd(this.m), p;
    }, Y.prototype.shl = function(u, d) {
      return this._verify1(u), this.imod(u.ushln(d));
    }, Y.prototype.imul = function(u, d) {
      return this._verify2(u, d), this.imod(u.imul(d));
    }, Y.prototype.mul = function(u, d) {
      return this._verify2(u, d), this.imod(u.mul(d));
    }, Y.prototype.isqr = function(u) {
      return this.imul(u, u.clone());
    }, Y.prototype.sqr = function(u) {
      return this.mul(u, u);
    }, Y.prototype.sqrt = function(u) {
      if (u.isZero()) return u.clone();
      var d = this.m.andln(3);
      if (n(d % 2 === 1), d === 3) {
        var p = this.m.add(new i(1)).iushrn(2);
        return this.pow(u, p);
      }
      for (var y = this.m.subn(1), f = 0; !y.isZero() && y.andln(1) === 0; )
        f++, y.iushrn(1);
      n(!y.isZero());
      var E = new i(1).toRed(this), v = E.redNeg(), w = this.m.subn(1).iushrn(1), h = this.m.bitLength();
      for (h = new i(2 * h * h).toRed(this); this.pow(h, w).cmp(v) !== 0; )
        h.redIAdd(v);
      for (var I = this.pow(h, y), J = this.pow(u, y.addn(1).iushrn(1)), V = this.pow(u, y), rt = f; V.cmp(E) !== 0; ) {
        for (var tt = V, it = 0; tt.cmp(E) !== 0; it++)
          tt = tt.redSqr();
        n(it < rt);
        var ot = this.pow(I, new i(1).iushln(rt - it - 1));
        J = J.redMul(ot), I = ot.redSqr(), V = V.redMul(I), rt = it;
      }
      return J;
    }, Y.prototype.invm = function(u) {
      var d = u._invmp(this.m);
      return d.negative !== 0 ? (d.negative = 0, this.imod(d).redNeg()) : this.imod(d);
    }, Y.prototype.pow = function(u, d) {
      if (d.isZero()) return new i(1).toRed(this);
      if (d.cmpn(1) === 0) return u.clone();
      var p = 4, y = new Array(1 << p);
      y[0] = new i(1).toRed(this), y[1] = u;
      for (var f = 2; f < y.length; f++)
        y[f] = this.mul(y[f - 1], u);
      var E = y[0], v = 0, w = 0, h = d.bitLength() % 26;
      for (h === 0 && (h = 26), f = d.length - 1; f >= 0; f--) {
        for (var I = d.words[f], J = h - 1; J >= 0; J--) {
          var V = I >> J & 1;
          if (E !== y[0] && (E = this.sqr(E)), V === 0 && v === 0) {
            w = 0;
            continue;
          }
          v <<= 1, v |= V, w++, !(w !== p && (f !== 0 || J !== 0)) && (E = this.mul(E, y[v]), w = 0, v = 0);
        }
        h = 26;
      }
      return E;
    }, Y.prototype.convertTo = function(u) {
      var d = u.umod(this.m);
      return d === u ? d.clone() : d;
    }, Y.prototype.convertFrom = function(u) {
      var d = u.clone();
      return d.red = null, d;
    }, i.mont = function(u) {
      return new nt(u);
    };
    function nt(C) {
      Y.call(this, C), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(nt, Y), nt.prototype.convertTo = function(u) {
      return this.imod(u.ushln(this.shift));
    }, nt.prototype.convertFrom = function(u) {
      var d = this.imod(u.mul(this.rinv));
      return d.red = null, d;
    }, nt.prototype.imul = function(u, d) {
      if (u.isZero() || d.isZero())
        return u.words[0] = 0, u.length = 1, u;
      var p = u.imul(d), y = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = p.isub(y).iushrn(this.shift), E = f;
      return f.cmp(this.m) >= 0 ? E = f.isub(this.m) : f.cmpn(0) < 0 && (E = f.iadd(this.m)), E._forceRed(this);
    }, nt.prototype.mul = function(u, d) {
      if (u.isZero() || d.isZero()) return new i(0)._forceRed(this);
      var p = u.mul(d), y = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = p.isub(y).iushrn(this.shift), E = f;
      return f.cmp(this.m) >= 0 ? E = f.isub(this.m) : f.cmpn(0) < 0 && (E = f.iadd(this.m)), E._forceRed(this);
    }, nt.prototype.invm = function(u) {
      var d = this.imod(u._invmp(this.m).mul(this.r2));
      return d._forceRed(this);
    };
  })(e, Rt);
})(Xo);
var dh = Xo.exports;
const ls = /* @__PURE__ */ oh(dh);
var Vu = 9, Zu = 3, so = 9;
function _h(e, t) {
  const { precision: r = Vu, minPrecision: n = Zu } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let _ = i.slice(0, r);
  if (n < r) {
    const g = _.match(/.*[1-9]{1}/), m = (g == null ? void 0 : g[0].length) || 0, B = Math.max(n, m);
    _ = _.slice(0, B);
  }
  const A = _ ? `.${_}` : "";
  return `${a}${A}`;
}
var kt = class extends ls {
  constructor(t, r, n) {
    let s = t, i = r;
    kt.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = r || "hex");
    super(s ?? 0, i, n);
    M(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new R(Q.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new R(
        Q.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, n);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new R(Q.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: r = so,
      precision: n = Vu,
      minPrecision: s = Zu
    } = t || {}, i = this.formatUnits(r), o = _h(i, { precision: n, minPrecision: s });
    if (!parseFloat(o)) {
      const [, a = "0"] = i.split("."), _ = a.match(/[1-9]/);
      if (_ && _.index && _.index + 1 > n) {
        const [A = "0"] = o.split(".");
        return `${A}.${a.slice(0, _.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = so) {
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
    return new kt(super.sqr().toArray());
  }
  neg() {
    return new kt(super.neg().toArray());
  }
  abs() {
    return new kt(super.abs().toArray());
  }
  toTwos(t) {
    return new kt(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new kt(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, r) {
    const n = super[r](new kt(t));
    return kt.isBN(n) ? new kt(n.toArray()) : n;
  }
  clone() {
    return new kt(this.toArray());
  }
  mulTo(t, r) {
    const n = new ls(this.toArray()).mulTo(t, r);
    return new kt(n.toArray());
  }
  egcd(t) {
    const { a: r, b: n, gcd: s } = new ls(this.toArray()).egcd(t);
    return {
      a: new kt(r.toArray()),
      b: new kt(n.toArray()),
      gcd: new kt(s.toArray())
    };
  }
  divmod(t, r, n) {
    const { div: s, mod: i } = new ls(this.toArray()).divmod(new kt(t), r, n);
    return {
      div: new kt(s == null ? void 0 : s.toArray()),
      mod: new kt(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new kt(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new kt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, S = (e, t, r) => new kt(e, t, r);
S.parseUnits = (e, t = so) => {
  const r = e === "." ? "0." : e, [n = "0", s = "0"] = r.split("."), i = s.length;
  if (i > t)
    throw new R(
      Q.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const a = `${n.replaceAll(",", "")}${o.join("")}`;
  return S(a);
};
function Br(e) {
  return S(e).toNumber();
}
function Ho(e, t) {
  return S(e).toHex(t);
}
function _r(e, t) {
  return S(e).toBytes(t);
}
function IB(e, t) {
  return S(e).formatUnits(t);
}
function EB(e, t) {
  return S(e).format(t);
}
function vB(...e) {
  return e.reduce((t, r) => S(r).gt(t) ? S(r) : t, S(0));
}
function CB(...e) {
  return S(Math.ceil(e.reduce((t, r) => S(t).mul(r), S(1)).toNumber()));
}
var be = Uint8Array, De = Uint16Array, Yo = Int32Array, ni = new be([
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
]), si = new be([
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
]), io = new be([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Ju = function(e, t) {
  for (var r = new De(31), n = 0; n < 31; ++n)
    r[n] = t += 1 << e[n - 1];
  for (var s = new Yo(r[30]), n = 1; n < 30; ++n)
    for (var i = r[n]; i < r[n + 1]; ++i)
      s[i] = i - r[n] << 5 | n;
  return { b: r, r: s };
}, ju = Ju(ni, 2), qu = ju.b, oo = ju.r;
qu[28] = 258, oo[258] = 28;
var $u = Ju(si, 0), hh = $u.b, rc = $u.r, ao = new De(32768);
for (var Ot = 0; Ot < 32768; ++Ot) {
  var pr = (Ot & 43690) >> 1 | (Ot & 21845) << 1;
  pr = (pr & 52428) >> 2 | (pr & 13107) << 2, pr = (pr & 61680) >> 4 | (pr & 3855) << 4, ao[Ot] = ((pr & 65280) >> 8 | (pr & 255) << 8) >> 1;
}
var Ke = function(e, t, r) {
  for (var n = e.length, s = 0, i = new De(t); s < n; ++s)
    e[s] && ++i[e[s] - 1];
  var o = new De(t);
  for (s = 1; s < t; ++s)
    o[s] = o[s - 1] + i[s - 1] << 1;
  var a;
  if (r) {
    a = new De(1 << t);
    var _ = 15 - t;
    for (s = 0; s < n; ++s)
      if (e[s])
        for (var A = s << 4 | e[s], g = t - e[s], m = o[e[s] - 1]++ << g, B = m | (1 << g) - 1; m <= B; ++m)
          a[ao[m] >> _] = A;
  } else
    for (a = new De(n), s = 0; s < n; ++s)
      e[s] && (a[s] = ao[o[e[s] - 1]++] >> 15 - e[s]);
  return a;
}, Dr = new be(288);
for (var Ot = 0; Ot < 144; ++Ot)
  Dr[Ot] = 8;
for (var Ot = 144; Ot < 256; ++Ot)
  Dr[Ot] = 9;
for (var Ot = 256; Ot < 280; ++Ot)
  Dr[Ot] = 7;
for (var Ot = 280; Ot < 288; ++Ot)
  Dr[Ot] = 8;
var kn = new be(32);
for (var Ot = 0; Ot < 32; ++Ot)
  kn[Ot] = 5;
var lh = /* @__PURE__ */ Ke(Dr, 9, 0), Ah = /* @__PURE__ */ Ke(Dr, 9, 1), ph = /* @__PURE__ */ Ke(kn, 5, 0), fh = /* @__PURE__ */ Ke(kn, 5, 1), zi = function(e) {
  for (var t = e[0], r = 1; r < e.length; ++r)
    e[r] > t && (t = e[r]);
  return t;
}, ke = function(e, t, r) {
  var n = t / 8 | 0;
  return (e[n] | e[n + 1] << 8) >> (t & 7) & r;
}, Gi = function(e, t) {
  var r = t / 8 | 0;
  return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (t & 7);
}, Wo = function(e) {
  return (e + 7) / 8 | 0;
}, Ku = function(e, t, r) {
  return (r == null || r > e.length) && (r = e.length), new be(e.subarray(t, r));
}, gh = [
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
], Ue = function(e, t, r) {
  var n = new Error(t || gh[e]);
  if (n.code = e, Error.captureStackTrace && Error.captureStackTrace(n, Ue), !r)
    throw n;
  return n;
}, wh = function(e, t, r, n) {
  var s = e.length, i = 0;
  if (!s || t.f && !t.l)
    return r || new be(0);
  var o = !r, a = o || t.i != 2, _ = t.i;
  o && (r = new be(s * 3));
  var A = function(At) {
    var ut = r.length;
    if (At > ut) {
      var Et = new be(Math.max(ut * 2, At));
      Et.set(r), r = Et;
    }
  }, g = t.f || 0, m = t.p || 0, B = t.b || 0, N = t.l, T = t.d, x = t.m, F = t.n, O = s * 8;
  do {
    if (!N) {
      g = ke(e, m, 1);
      var j = ke(e, m + 1, 3);
      if (m += 3, j)
        if (j == 1)
          N = Ah, T = fh, x = 9, F = 5;
        else if (j == 2) {
          var D = ke(e, m, 31) + 257, z = ke(e, m + 10, 15) + 4, U = D + ke(e, m + 5, 31) + 1;
          m += 14;
          for (var G = new be(U), H = new be(19), Y = 0; Y < z; ++Y)
            H[io[Y]] = ke(e, m + Y * 3, 7);
          m += z * 3;
          for (var nt = zi(H), C = (1 << nt) - 1, u = Ke(H, nt, 1), Y = 0; Y < U; ) {
            var d = u[ke(e, m, C)];
            m += d & 15;
            var P = d >> 4;
            if (P < 16)
              G[Y++] = P;
            else {
              var p = 0, y = 0;
              for (P == 16 ? (y = 3 + ke(e, m, 3), m += 2, p = G[Y - 1]) : P == 17 ? (y = 3 + ke(e, m, 7), m += 3) : P == 18 && (y = 11 + ke(e, m, 127), m += 7); y--; )
                G[Y++] = p;
            }
          }
          var f = G.subarray(0, D), E = G.subarray(D);
          x = zi(f), F = zi(E), N = Ke(f, x, 1), T = Ke(E, F, 1);
        } else
          Ue(1);
      else {
        var P = Wo(m) + 4, Z = e[P - 4] | e[P - 3] << 8, L = P + Z;
        if (L > s) {
          _ && Ue(0);
          break;
        }
        a && A(B + Z), r.set(e.subarray(P, L), B), t.b = B += Z, t.p = m = L * 8, t.f = g;
        continue;
      }
      if (m > O) {
        _ && Ue(0);
        break;
      }
    }
    a && A(B + 131072);
    for (var v = (1 << x) - 1, w = (1 << F) - 1, h = m; ; h = m) {
      var p = N[Gi(e, m) & v], I = p >> 4;
      if (m += p & 15, m > O) {
        _ && Ue(0);
        break;
      }
      if (p || Ue(2), I < 256)
        r[B++] = I;
      else if (I == 256) {
        h = m, N = null;
        break;
      } else {
        var J = I - 254;
        if (I > 264) {
          var Y = I - 257, V = ni[Y];
          J = ke(e, m, (1 << V) - 1) + qu[Y], m += V;
        }
        var rt = T[Gi(e, m) & w], tt = rt >> 4;
        rt || Ue(3), m += rt & 15;
        var E = hh[tt];
        if (tt > 3) {
          var V = si[tt];
          E += Gi(e, m) & (1 << V) - 1, m += V;
        }
        if (m > O) {
          _ && Ue(0);
          break;
        }
        a && A(B + 131072);
        var it = B + J;
        if (B < E) {
          var ot = i - E, xt = Math.min(E, it);
          for (ot + B < 0 && Ue(3); B < xt; ++B)
            r[B] = n[ot + B];
        }
        for (; B < it; ++B)
          r[B] = r[B - E];
      }
    }
    t.l = N, t.p = h, t.b = B, t.f = g, N && (g = 1, t.m = x, t.d = T, t.n = F);
  } while (!g);
  return B != r.length && o ? Ku(r, 0, B) : r.subarray(0, B);
}, ir = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8;
}, Cn = function(e, t, r) {
  r <<= t & 7;
  var n = t / 8 | 0;
  e[n] |= r, e[n + 1] |= r >> 8, e[n + 2] |= r >> 16;
}, Xi = function(e, t) {
  for (var r = [], n = 0; n < e.length; ++n)
    e[n] && r.push({ s: n, f: e[n] });
  var s = r.length, i = r.slice();
  if (!s)
    return { t: ed, l: 0 };
  if (s == 1) {
    var o = new be(r[0].s + 1);
    return o[r[0].s] = 1, { t: o, l: 1 };
  }
  r.sort(function(L, D) {
    return L.f - D.f;
  }), r.push({ s: -1, f: 25001 });
  var a = r[0], _ = r[1], A = 0, g = 1, m = 2;
  for (r[0] = { s: -1, f: a.f + _.f, l: a, r: _ }; g != s - 1; )
    a = r[r[A].f < r[m].f ? A++ : m++], _ = r[A != g && r[A].f < r[m].f ? A++ : m++], r[g++] = { s: -1, f: a.f + _.f, l: a, r: _ };
  for (var B = i[0].s, n = 1; n < s; ++n)
    i[n].s > B && (B = i[n].s);
  var N = new De(B + 1), T = co(r[g - 1], N, 0);
  if (T > t) {
    var n = 0, x = 0, F = T - t, O = 1 << F;
    for (i.sort(function(D, z) {
      return N[z.s] - N[D.s] || D.f - z.f;
    }); n < s; ++n) {
      var j = i[n].s;
      if (N[j] > t)
        x += O - (1 << T - N[j]), N[j] = t;
      else
        break;
    }
    for (x >>= F; x > 0; ) {
      var P = i[n].s;
      N[P] < t ? x -= 1 << t - N[P]++ - 1 : ++n;
    }
    for (; n >= 0 && x; --n) {
      var Z = i[n].s;
      N[Z] == t && (--N[Z], ++x);
    }
    T = t;
  }
  return { t: new be(N), l: T };
}, co = function(e, t, r) {
  return e.s == -1 ? Math.max(co(e.l, t, r + 1), co(e.r, t, r + 1)) : t[e.s] = r;
}, nc = function(e) {
  for (var t = e.length; t && !e[--t]; )
    ;
  for (var r = new De(++t), n = 0, s = e[0], i = 1, o = function(_) {
    r[n++] = _;
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
}, Bn = function(e, t) {
  for (var r = 0, n = 0; n < t.length; ++n)
    r += e[n] * t[n];
  return r;
}, td = function(e, t, r) {
  var n = r.length, s = Wo(t + 2);
  e[s] = n & 255, e[s + 1] = n >> 8, e[s + 2] = e[s] ^ 255, e[s + 3] = e[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    e[s + i + 4] = r[i];
  return (s + 4 + n) * 8;
}, sc = function(e, t, r, n, s, i, o, a, _, A, g) {
  ir(t, g++, r), ++s[256];
  for (var m = Xi(s, 15), B = m.t, N = m.l, T = Xi(i, 15), x = T.t, F = T.l, O = nc(B), j = O.c, P = O.n, Z = nc(x), L = Z.c, D = Z.n, z = new De(19), U = 0; U < j.length; ++U)
    ++z[j[U] & 31];
  for (var U = 0; U < L.length; ++U)
    ++z[L[U] & 31];
  for (var G = Xi(z, 7), H = G.t, Y = G.l, nt = 19; nt > 4 && !H[io[nt - 1]]; --nt)
    ;
  var C = A + 5 << 3, u = Bn(s, Dr) + Bn(i, kn) + o, d = Bn(s, B) + Bn(i, x) + o + 14 + 3 * nt + Bn(z, H) + 2 * z[16] + 3 * z[17] + 7 * z[18];
  if (_ >= 0 && C <= u && C <= d)
    return td(t, g, e.subarray(_, _ + A));
  var p, y, f, E;
  if (ir(t, g, 1 + (d < u)), g += 2, d < u) {
    p = Ke(B, N, 0), y = B, f = Ke(x, F, 0), E = x;
    var v = Ke(H, Y, 0);
    ir(t, g, P - 257), ir(t, g + 5, D - 1), ir(t, g + 10, nt - 4), g += 14;
    for (var U = 0; U < nt; ++U)
      ir(t, g + 3 * U, H[io[U]]);
    g += 3 * nt;
    for (var w = [j, L], h = 0; h < 2; ++h)
      for (var I = w[h], U = 0; U < I.length; ++U) {
        var J = I[U] & 31;
        ir(t, g, v[J]), g += H[J], J > 15 && (ir(t, g, I[U] >> 5 & 127), g += I[U] >> 12);
      }
  } else
    p = lh, y = Dr, f = ph, E = kn;
  for (var U = 0; U < a; ++U) {
    var V = n[U];
    if (V > 255) {
      var J = V >> 18 & 31;
      Cn(t, g, p[J + 257]), g += y[J + 257], J > 7 && (ir(t, g, V >> 23 & 31), g += ni[J]);
      var rt = V & 31;
      Cn(t, g, f[rt]), g += E[rt], rt > 3 && (Cn(t, g, V >> 5 & 8191), g += si[rt]);
    } else
      Cn(t, g, p[V]), g += y[V];
  }
  return Cn(t, g, p[256]), g + y[256];
}, mh = /* @__PURE__ */ new Yo([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), ed = /* @__PURE__ */ new be(0), yh = function(e, t, r, n, s, i) {
  var o = i.z || e.length, a = new be(n + o + 5 * (1 + Math.ceil(o / 7e3)) + s), _ = a.subarray(n, a.length - s), A = i.l, g = (i.r || 0) & 7;
  if (t) {
    g && (_[0] = i.r >> 3);
    for (var m = mh[t - 1], B = m >> 13, N = m & 8191, T = (1 << r) - 1, x = i.p || new De(32768), F = i.h || new De(T + 1), O = Math.ceil(r / 3), j = 2 * O, P = function(ht) {
      return (e[ht] ^ e[ht + 1] << O ^ e[ht + 2] << j) & T;
    }, Z = new Yo(25e3), L = new De(288), D = new De(32), z = 0, U = 0, G = i.i || 0, H = 0, Y = i.w || 0, nt = 0; G + 2 < o; ++G) {
      var C = P(G), u = G & 32767, d = F[C];
      if (x[u] = d, F[C] = u, Y <= G) {
        var p = o - G;
        if ((z > 7e3 || H > 24576) && (p > 423 || !A)) {
          g = sc(e, _, 0, Z, L, D, U, H, nt, G - nt, g), H = z = U = 0, nt = G;
          for (var y = 0; y < 286; ++y)
            L[y] = 0;
          for (var y = 0; y < 30; ++y)
            D[y] = 0;
        }
        var f = 2, E = 0, v = N, w = u - d & 32767;
        if (p > 2 && C == P(G - w))
          for (var h = Math.min(B, p) - 1, I = Math.min(32767, G), J = Math.min(258, p); w <= I && --v && u != d; ) {
            if (e[G + f] == e[G + f - w]) {
              for (var V = 0; V < J && e[G + V] == e[G + V - w]; ++V)
                ;
              if (V > f) {
                if (f = V, E = w, V > h)
                  break;
                for (var rt = Math.min(w, V - 2), tt = 0, y = 0; y < rt; ++y) {
                  var it = G - w + y & 32767, ot = x[it], xt = it - ot & 32767;
                  xt > tt && (tt = xt, d = it);
                }
              }
            }
            u = d, d = x[u], w += u - d & 32767;
          }
        if (E) {
          Z[H++] = 268435456 | oo[f] << 18 | rc[E];
          var At = oo[f] & 31, ut = rc[E] & 31;
          U += ni[At] + si[ut], ++L[257 + At], ++D[ut], Y = G + f, ++z;
        } else
          Z[H++] = e[G], ++L[e[G]];
      }
    }
    for (G = Math.max(G, Y); G < o; ++G)
      Z[H++] = e[G], ++L[e[G]];
    g = sc(e, _, A, Z, L, D, U, H, nt, G - nt, g), A || (i.r = g & 7 | _[g / 8 | 0] << 3, g -= 7, i.h = F, i.p = x, i.i = G, i.w = Y);
  } else {
    for (var G = i.w || 0; G < o + A; G += 65535) {
      var Et = G + 65535;
      Et >= o && (_[g / 8 | 0] = A, Et = o), g = td(_, g + 1, e.subarray(G, Et));
    }
    i.i = o;
  }
  return Ku(a, 0, n + Wo(g) + s);
}, bh = /* @__PURE__ */ function() {
  for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var r = t, n = 9; --n; )
      r = (r & 1 && -306674912) ^ r >>> 1;
    e[t] = r;
  }
  return e;
}(), Ih = function() {
  var e = -1;
  return {
    p: function(t) {
      for (var r = e, n = 0; n < t.length; ++n)
        r = bh[r & 255 ^ t[n]] ^ r >>> 8;
      e = r;
    },
    d: function() {
      return ~e;
    }
  };
}, Eh = function(e, t, r, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), o = new be(i.length + e.length);
    o.set(i), o.set(e, i.length), e = o, s.w = i.length;
  }
  return yh(e, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(e.length))) * 1.5) : 20 : 12 + t.mem, r, n, s);
}, uo = function(e, t, r) {
  for (; r; ++t)
    e[t] = r, r >>>= 8;
}, vh = function(e, t) {
  var r = t.filename;
  if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, e[9] = 3, t.mtime != 0 && uo(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), r) {
    e[3] = 8;
    for (var n = 0; n <= r.length; ++n)
      e[n + 10] = r.charCodeAt(n);
  }
}, Ch = function(e) {
  (e[0] != 31 || e[1] != 139 || e[2] != 8) && Ue(6, "invalid gzip data");
  var t = e[3], r = 10;
  t & 4 && (r += (e[10] | e[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !e[r++])
    ;
  return r + (t & 2);
}, Bh = function(e) {
  var t = e.length;
  return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}, xh = function(e) {
  return 10 + (e.filename ? e.filename.length + 1 : 0);
};
function Rh(e, t) {
  t || (t = {});
  var r = Ih(), n = e.length;
  r.p(e);
  var s = Eh(e, t, xh(t), 8), i = s.length;
  return vh(s, t), uo(s, i - 8, r.d()), uo(s, i - 4, n), s;
}
function Sh(e, t) {
  var r = Ch(e);
  return r + 8 > e.length && Ue(6, "invalid gzip data"), wh(e.subarray(r, -8), { i: 2 }, new be(Bh(e)), t);
}
var Nh = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Th = 0;
try {
  Nh.decode(ed, { stream: !0 }), Th = 1;
} catch {
}
var Qh = Object.defineProperty, Dh = (e, t, r) => t in e ? Qh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Fh = (e, t, r) => (Dh(e, t + "", r), r), BB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, rd = (e, t) => {
  const r = [];
  for (let a = 0; a < e.length; a += t) {
    const _ = new Uint8Array(t);
    _.set(e.slice(a, a + t)), r.push(_);
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
  throw new R(Q.INVALID_DATA, s);
}, ii = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), r = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(r);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, ct = (e) => {
  const t = e.map((r) => $(r));
  return ii(t);
}, ic = "0123456789abcdef";
function K(e) {
  const t = $(e);
  let r = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    r += ic[(s & 240) >> 4] + ic[s & 15];
  }
  return r;
}
var xB = (e) => {
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
    throw new R(Q.PARSE_FAILED, n);
  }
  return r;
}, Mh = 37, nd = BigInt(2 ** 62) + BigInt(Mh), Oh = (e) => Math.floor(e / 1e3), sd = (e) => e * 1e3, Lh = (e) => Number(BigInt(e) - nd), kh = (e) => String(BigInt(e) + nd), Ph = (e) => sd(Lh(e)), Is = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Is(Ph(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Is(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Is(sd(e));
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
    return kh(this.toUnixSeconds());
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
    return Oh(this.getTime());
  }
}, Vo = Is;
Fh(Vo, "TAI64_NULL", "");
function Uh(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var zh = {
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
          modi: 2,
          mod_op: 2,
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
          move_op: 2,
          ret: 53,
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
          rvrt: 2,
          aloc: {
            HeavyOperation: {
              base: 2,
              gas_per_unit: 0
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
            HeavyOperation: {
              base: 2,
              gas_per_unit: 0
            }
          },
          cfei: {
            HeavyOperation: {
              base: 2,
              gas_per_unit: 0
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
          ed19: {
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
}, Gh = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, Xh = {
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
}, RB = {
  chainConfig: zh,
  metadata: Gh,
  stateConfig: Xh
}, SB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Fr(e) {
  return e !== void 0;
}
var id = S(0), _o = S(58), Qs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", As = null;
function Hh(e) {
  if (As == null) {
    As = {};
    for (let r = 0; r < Qs.length; r++)
      As[Qs[r]] = S(r);
  }
  const t = As[e];
  if (t == null)
    throw new R(Q.INVALID_DATA, `invalid base58 value ${e}`);
  return S(t);
}
function od(e) {
  const t = $(e);
  let r = S(t), n = "";
  for (; r.gt(id); )
    n = Qs[Number(r.mod(_o))] + n, r = r.div(_o);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Qs[0] + n;
  return n;
}
function Yh(e) {
  let t = id;
  for (let r = 0; r < e.length; r++)
    t = t.mul(_o), t = t.add(Hh(e[r].toString()));
  return t;
}
function Zo(e, t, r) {
  const n = $(e);
  if (r != null && r > n.length)
    throw new R(Q.INVALID_DATA, "cannot slice beyond data bounds");
  return K(n.slice(t ?? 0, r ?? n.length));
}
function dn(e, t = !0) {
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
        throw new R(
          Q.INVALID_INPUT_PARAMETERS,
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
function Wh(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
function Vh(e) {
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
    for (let _ = 0; _ < i; _++) {
      const A = t[n];
      if ((A & 192) !== 128) {
        n += Lr("MISSING_CONTINUE", n, t), a = null;
        break;
      }
      a = a << 6 | A & 63, n++;
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
function Jo(e) {
  return Wh(Vh(e));
}
var NB = (e) => {
  if (!e)
    return "";
  const t = $(e), r = Rh(t);
  return Buffer.from(r).toString("base64");
}, TB = (e) => {
  const t = Buffer.from(e, "base64").toString("binary"), r = Buffer.from(t, "binary");
  return Sh(r);
};
function Zh(e) {
  throw new Error("Didn't expect to get here");
}
function Qe(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Jh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function jo(e, ...t) {
  if (!Jh(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function ad(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Qe(e.outputLen), Qe(e.blockLen);
}
function _n(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function cd(e, t) {
  jo(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Es = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function jh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const vs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ve = (e, t) => e << 32 - t | e >>> t, qh = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!qh)
  throw new Error("Non little-endian hardware is not supported");
function $h(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function hn(e) {
  if (typeof e == "string" && (e = $h(e)), !jh(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let qo = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Kh = {}.toString;
function ud(e, t) {
  if (t !== void 0 && Kh.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function oi(e) {
  const t = (n) => e().update(hn(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function tl(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(r >> s & i), a = Number(r & i), _ = n ? 4 : 0, A = n ? 0 : 4;
  e.setUint32(t + _, o, n), e.setUint32(t + A, a, n);
}
class $o extends qo {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = vs(this.buffer);
  }
  update(t) {
    _n(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = hn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const _ = vs(t);
        for (; s <= i - o; o += s)
          this.process(_, o);
        continue;
      }
      n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    _n(this), cd(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(n, 0), o = 0);
    for (let m = o; m < s; m++)
      r[m] = 0;
    tl(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const a = vs(t), _ = this.outputLen;
    if (_ % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const A = _ / 4, g = this.get();
    if (A > g.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < A; m++)
      a.setUint32(4 * m, g[m], i);
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
const el = (e, t, r) => e & t ^ ~e & r, rl = (e, t, r) => e & t ^ e & r ^ t & r, nl = /* @__PURE__ */ new Uint32Array([
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
]), fr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), gr = /* @__PURE__ */ new Uint32Array(64);
let sl = class extends $o {
  constructor() {
    super(64, 32, 8, !1), this.A = fr[0] | 0, this.B = fr[1] | 0, this.C = fr[2] | 0, this.D = fr[3] | 0, this.E = fr[4] | 0, this.F = fr[5] | 0, this.G = fr[6] | 0, this.H = fr[7] | 0;
  }
  get() {
    const { A: t, B: r, C: n, D: s, E: i, F: o, G: a, H: _ } = this;
    return [t, r, n, s, i, o, a, _];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, _) {
    this.A = t | 0, this.B = r | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = _ | 0;
  }
  process(t, r) {
    for (let m = 0; m < 16; m++, r += 4)
      gr[m] = t.getUint32(r, !1);
    for (let m = 16; m < 64; m++) {
      const B = gr[m - 15], N = gr[m - 2], T = Ve(B, 7) ^ Ve(B, 18) ^ B >>> 3, x = Ve(N, 17) ^ Ve(N, 19) ^ N >>> 10;
      gr[m] = x + gr[m - 7] + T + gr[m - 16] | 0;
    }
    let { A: n, B: s, C: i, D: o, E: a, F: _, G: A, H: g } = this;
    for (let m = 0; m < 64; m++) {
      const B = Ve(a, 6) ^ Ve(a, 11) ^ Ve(a, 25), N = g + B + el(a, _, A) + nl[m] + gr[m] | 0, x = (Ve(n, 2) ^ Ve(n, 13) ^ Ve(n, 22)) + rl(n, s, i) | 0;
      g = A, A = _, _ = a, a = o + N | 0, o = i, i = s, s = n, n = N + x | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, _ = _ + this.F | 0, A = A + this.G | 0, g = g + this.H | 0, this.set(n, s, i, o, a, _, A, g);
  }
  roundClean() {
    gr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const wn = /* @__PURE__ */ oi(() => new sl());
let dd = class extends qo {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, ad(t);
    const n = hn(r);
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
    return _n(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    _n(this), jo(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
};
const Ko = (e, t, r) => new dd(e, t).update(r).digest();
Ko.create = (e, t) => new dd(e, t);
function il(e, t, r, n) {
  ad(e);
  const s = ud({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: o, asyncTick: a } = s;
  if (Qe(i), Qe(o), Qe(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const _ = hn(t), A = hn(r), g = new Uint8Array(o), m = Ko.create(e, _), B = m._cloneInto().update(A);
  return { c: i, dkLen: o, asyncTick: a, DK: g, PRF: m, PRFSalt: B };
}
function ol(e, t, r, n, s) {
  return e.destroy(), t.destroy(), n && n.destroy(), s.fill(0), r;
}
function ta(e, t, r, n) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: _ } = il(e, t, r, n);
  let A;
  const g = new Uint8Array(4), m = vs(g), B = new Uint8Array(a.outputLen);
  for (let N = 1, T = 0; T < i; N++, T += a.outputLen) {
    const x = o.subarray(T, T + a.outputLen);
    m.setInt32(0, N, !1), (A = _._cloneInto(A)).update(g).digestInto(B), x.set(B.subarray(0, x.length));
    for (let F = 1; F < s; F++) {
      a._cloneInto(A).update(B).digestInto(B);
      for (let O = 0; O < x.length; O++)
        x[O] ^= B[O];
    }
  }
  return ol(a, _, o, A, B);
}
const vt = (e, t) => e << t | e >>> 32 - t;
function oc(e, t, r, n, s, i) {
  let o = e[t++] ^ r[n++], a = e[t++] ^ r[n++], _ = e[t++] ^ r[n++], A = e[t++] ^ r[n++], g = e[t++] ^ r[n++], m = e[t++] ^ r[n++], B = e[t++] ^ r[n++], N = e[t++] ^ r[n++], T = e[t++] ^ r[n++], x = e[t++] ^ r[n++], F = e[t++] ^ r[n++], O = e[t++] ^ r[n++], j = e[t++] ^ r[n++], P = e[t++] ^ r[n++], Z = e[t++] ^ r[n++], L = e[t++] ^ r[n++], D = o, z = a, U = _, G = A, H = g, Y = m, nt = B, C = N, u = T, d = x, p = F, y = O, f = j, E = P, v = Z, w = L;
  for (let h = 0; h < 8; h += 2)
    H ^= vt(D + f | 0, 7), u ^= vt(H + D | 0, 9), f ^= vt(u + H | 0, 13), D ^= vt(f + u | 0, 18), d ^= vt(Y + z | 0, 7), E ^= vt(d + Y | 0, 9), z ^= vt(E + d | 0, 13), Y ^= vt(z + E | 0, 18), v ^= vt(p + nt | 0, 7), U ^= vt(v + p | 0, 9), nt ^= vt(U + v | 0, 13), p ^= vt(nt + U | 0, 18), G ^= vt(w + y | 0, 7), C ^= vt(G + w | 0, 9), y ^= vt(C + G | 0, 13), w ^= vt(y + C | 0, 18), z ^= vt(D + G | 0, 7), U ^= vt(z + D | 0, 9), G ^= vt(U + z | 0, 13), D ^= vt(G + U | 0, 18), nt ^= vt(Y + H | 0, 7), C ^= vt(nt + Y | 0, 9), H ^= vt(C + nt | 0, 13), Y ^= vt(H + C | 0, 18), y ^= vt(p + d | 0, 7), u ^= vt(y + p | 0, 9), d ^= vt(u + y | 0, 13), p ^= vt(d + u | 0, 18), f ^= vt(w + v | 0, 7), E ^= vt(f + w | 0, 9), v ^= vt(E + f | 0, 13), w ^= vt(v + E | 0, 18);
  s[i++] = o + D | 0, s[i++] = a + z | 0, s[i++] = _ + U | 0, s[i++] = A + G | 0, s[i++] = g + H | 0, s[i++] = m + Y | 0, s[i++] = B + nt | 0, s[i++] = N + C | 0, s[i++] = T + u | 0, s[i++] = x + d | 0, s[i++] = F + p | 0, s[i++] = O + y | 0, s[i++] = j + f | 0, s[i++] = P + E | 0, s[i++] = Z + v | 0, s[i++] = L + w | 0;
}
function Hi(e, t, r, n, s) {
  let i = n + 0, o = n + 16 * s;
  for (let a = 0; a < 16; a++)
    r[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    oc(r, o, e, t, r, i), a > 0 && (o += 16), oc(r, i, e, t += 16, r, o);
}
function al(e, t, r) {
  const n = ud({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, r), { N: s, r: i, p: o, dkLen: a, asyncTick: _, maxmem: A, onProgress: g } = n;
  if (Qe(s), Qe(i), Qe(o), Qe(a), Qe(_), Qe(A), g !== void 0 && typeof g != "function")
    throw new Error("progressCb should be function");
  const m = 128 * i, B = m / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (m / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / m)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const N = m * (s + o);
  if (N > A)
    throw new Error(`Scrypt: parameters too large, ${N} (128 * r * (N + p)) > ${A} (maxmem)`);
  const T = ta(wn, e, t, { c: 1, dkLen: m * o }), x = Es(T), F = Es(new Uint8Array(m * s)), O = Es(new Uint8Array(m));
  let j = () => {
  };
  if (g) {
    const P = 2 * s * o, Z = Math.max(Math.floor(P / 1e4), 1);
    let L = 0;
    j = () => {
      L++, g && (!(L % Z) || L === P) && g(L / P);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: B, V: F, B32: x, B: T, tmp: O, blockMixCb: j, asyncTick: _ };
}
function cl(e, t, r, n, s) {
  const i = ta(wn, e, r, { c: 1, dkLen: t });
  return r.fill(0), n.fill(0), s.fill(0), i;
}
function ul(e, t, r) {
  const { N: n, r: s, p: i, dkLen: o, blockSize32: a, V: _, B32: A, B: g, tmp: m, blockMixCb: B } = al(e, t, r);
  for (let N = 0; N < i; N++) {
    const T = a * N;
    for (let x = 0; x < a; x++)
      _[x] = A[T + x];
    for (let x = 0, F = 0; x < n - 1; x++)
      Hi(_, F, _, F += a, s), B();
    Hi(_, (n - 1) * a, A, T, s), B();
    for (let x = 0; x < n; x++) {
      const F = A[T + a - 16] % n;
      for (let O = 0; O < a; O++)
        m[O] = A[T + O] ^ _[F * a + O];
      Hi(m, 0, A, T, s), B();
    }
  }
  return cl(e, o, g, _, m);
}
const ps = /* @__PURE__ */ BigInt(2 ** 32 - 1), ho = /* @__PURE__ */ BigInt(32);
function _d(e, t = !1) {
  return t ? { h: Number(e & ps), l: Number(e >> ho & ps) } : { h: Number(e >> ho & ps) | 0, l: Number(e & ps) | 0 };
}
function hd(e, t = !1) {
  let r = new Uint32Array(e.length), n = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = _d(e[s], t);
    [r[s], n[s]] = [i, o];
  }
  return [r, n];
}
const dl = (e, t) => BigInt(e >>> 0) << ho | BigInt(t >>> 0), _l = (e, t, r) => e >>> r, hl = (e, t, r) => e << 32 - r | t >>> r, ll = (e, t, r) => e >>> r | t << 32 - r, Al = (e, t, r) => e << 32 - r | t >>> r, pl = (e, t, r) => e << 64 - r | t >>> r - 32, fl = (e, t, r) => e >>> r - 32 | t << 64 - r, gl = (e, t) => t, wl = (e, t) => e, ld = (e, t, r) => e << r | t >>> 32 - r, Ad = (e, t, r) => t << r | e >>> 32 - r, pd = (e, t, r) => t << r - 32 | e >>> 64 - r, fd = (e, t, r) => e << r - 32 | t >>> 64 - r;
function ml(e, t, r, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: e + r + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const yl = (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0), bl = (e, t, r, n) => t + r + n + (e / 2 ** 32 | 0) | 0, Il = (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), El = (e, t, r, n, s) => t + r + n + s + (e / 2 ** 32 | 0) | 0, vl = (e, t, r, n, s) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (s >>> 0), Cl = (e, t, r, n, s, i) => t + r + n + s + i + (e / 2 ** 32 | 0) | 0, wt = {
  fromBig: _d,
  split: hd,
  toBig: dl,
  shrSH: _l,
  shrSL: hl,
  rotrSH: ll,
  rotrSL: Al,
  rotrBH: pl,
  rotrBL: fl,
  rotr32H: gl,
  rotr32L: wl,
  rotlSH: ld,
  rotlSL: Ad,
  rotlBH: pd,
  rotlBL: fd,
  add: ml,
  add3L: yl,
  add3H: bl,
  add4L: Il,
  add4H: El,
  add5H: Cl,
  add5L: vl
}, [gd, wd, md] = [[], [], []], Bl = /* @__PURE__ */ BigInt(0), xn = /* @__PURE__ */ BigInt(1), xl = /* @__PURE__ */ BigInt(2), Rl = /* @__PURE__ */ BigInt(7), Sl = /* @__PURE__ */ BigInt(256), Nl = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = xn, r = 1, n = 0; e < 24; e++) {
  [r, n] = [n, (2 * r + 3 * n) % 5], gd.push(2 * (5 * n + r)), wd.push((e + 1) * (e + 2) / 2 % 64);
  let s = Bl;
  for (let i = 0; i < 7; i++)
    t = (t << xn ^ (t >> Rl) * Nl) % Sl, t & xl && (s ^= xn << (xn << /* @__PURE__ */ BigInt(i)) - xn);
  md.push(s);
}
const [Tl, Ql] = /* @__PURE__ */ hd(md, !0), ac = (e, t, r) => r > 32 ? pd(e, t, r) : ld(e, t, r), cc = (e, t, r) => r > 32 ? fd(e, t, r) : Ad(e, t, r);
function Dl(e, t = 24) {
  const r = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let o = 0; o < 10; o++)
      r[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, _ = (o + 2) % 10, A = r[_], g = r[_ + 1], m = ac(A, g, 1) ^ r[a], B = cc(A, g, 1) ^ r[a + 1];
      for (let N = 0; N < 50; N += 10)
        e[o + N] ^= m, e[o + N + 1] ^= B;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = wd[o], _ = ac(s, i, a), A = cc(s, i, a), g = gd[o];
      s = e[g], i = e[g + 1], e[g] = _, e[g + 1] = A;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        r[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~r[(a + 2) % 10] & r[(a + 4) % 10];
    }
    e[0] ^= Tl[n], e[1] ^= Ql[n];
  }
  r.fill(0);
}
class ea extends qo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, r, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = r, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Qe(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Es(this.state);
  }
  keccak() {
    Dl(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    _n(this);
    const { blockLen: r, state: n } = this;
    t = hn(t);
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
    _n(this, !1), jo(t), this.finish();
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
    return Qe(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (cd(t, this), this.finished)
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
    return t || (t = new ea(r, n, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Fl = (e, t, r) => oi(() => new ea(t, e, r)), Ml = /* @__PURE__ */ Fl(1, 136, 256 / 8), Ol = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), yd = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), Ll = /* @__PURE__ */ yd.map((e) => (9 * e + 5) % 16);
let ra = [yd], na = [Ll];
for (let e = 0; e < 4; e++)
  for (let t of [ra, na])
    t.push(t[e].map((r) => Ol[r]));
const bd = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), kl = /* @__PURE__ */ ra.map((e, t) => e.map((r) => bd[t][r])), Pl = /* @__PURE__ */ na.map((e, t) => e.map((r) => bd[t][r])), Ul = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), zl = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), fs = (e, t) => e << t | e >>> 32 - t;
function uc(e, t, r, n) {
  return e === 0 ? t ^ r ^ n : e === 1 ? t & r | ~t & n : e === 2 ? (t | ~r) ^ n : e === 3 ? t & n | r & ~n : t ^ (r | ~n);
}
const gs = /* @__PURE__ */ new Uint32Array(16);
class Gl extends $o {
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
    for (let N = 0; N < 16; N++, r += 4)
      gs[N] = t.getUint32(r, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, o = i, a = this.h2 | 0, _ = a, A = this.h3 | 0, g = A, m = this.h4 | 0, B = m;
    for (let N = 0; N < 5; N++) {
      const T = 4 - N, x = Ul[N], F = zl[N], O = ra[N], j = na[N], P = kl[N], Z = Pl[N];
      for (let L = 0; L < 16; L++) {
        const D = fs(n + uc(N, i, a, A) + gs[O[L]] + x, P[L]) + m | 0;
        n = m, m = A, A = fs(a, 10) | 0, a = i, i = D;
      }
      for (let L = 0; L < 16; L++) {
        const D = fs(s + uc(T, o, _, g) + gs[j[L]] + F, Z[L]) + B | 0;
        s = B, B = g, g = fs(_, 10) | 0, _ = o, o = D;
      }
    }
    this.set(this.h1 + a + g | 0, this.h2 + A + B | 0, this.h3 + m + s | 0, this.h4 + n + o | 0, this.h0 + i + _ | 0);
  }
  roundClean() {
    gs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Xl = /* @__PURE__ */ oi(() => new Gl()), [Hl, Yl] = wt.split([
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
].map((e) => BigInt(e))), wr = /* @__PURE__ */ new Uint32Array(80), mr = /* @__PURE__ */ new Uint32Array(80);
class Wl extends $o {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: r, Bh: n, Bl: s, Ch: i, Cl: o, Dh: a, Dl: _, Eh: A, El: g, Fh: m, Fl: B, Gh: N, Gl: T, Hh: x, Hl: F } = this;
    return [t, r, n, s, i, o, a, _, A, g, m, B, N, T, x, F];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, _, A, g, m, B, N, T, x, F) {
    this.Ah = t | 0, this.Al = r | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = _ | 0, this.Eh = A | 0, this.El = g | 0, this.Fh = m | 0, this.Fl = B | 0, this.Gh = N | 0, this.Gl = T | 0, this.Hh = x | 0, this.Hl = F | 0;
  }
  process(t, r) {
    for (let P = 0; P < 16; P++, r += 4)
      wr[P] = t.getUint32(r), mr[P] = t.getUint32(r += 4);
    for (let P = 16; P < 80; P++) {
      const Z = wr[P - 15] | 0, L = mr[P - 15] | 0, D = wt.rotrSH(Z, L, 1) ^ wt.rotrSH(Z, L, 8) ^ wt.shrSH(Z, L, 7), z = wt.rotrSL(Z, L, 1) ^ wt.rotrSL(Z, L, 8) ^ wt.shrSL(Z, L, 7), U = wr[P - 2] | 0, G = mr[P - 2] | 0, H = wt.rotrSH(U, G, 19) ^ wt.rotrBH(U, G, 61) ^ wt.shrSH(U, G, 6), Y = wt.rotrSL(U, G, 19) ^ wt.rotrBL(U, G, 61) ^ wt.shrSL(U, G, 6), nt = wt.add4L(z, Y, mr[P - 7], mr[P - 16]), C = wt.add4H(nt, D, H, wr[P - 7], wr[P - 16]);
      wr[P] = C | 0, mr[P] = nt | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: o, Ch: a, Cl: _, Dh: A, Dl: g, Eh: m, El: B, Fh: N, Fl: T, Gh: x, Gl: F, Hh: O, Hl: j } = this;
    for (let P = 0; P < 80; P++) {
      const Z = wt.rotrSH(m, B, 14) ^ wt.rotrSH(m, B, 18) ^ wt.rotrBH(m, B, 41), L = wt.rotrSL(m, B, 14) ^ wt.rotrSL(m, B, 18) ^ wt.rotrBL(m, B, 41), D = m & N ^ ~m & x, z = B & T ^ ~B & F, U = wt.add5L(j, L, z, Yl[P], mr[P]), G = wt.add5H(U, O, Z, D, Hl[P], wr[P]), H = U | 0, Y = wt.rotrSH(n, s, 28) ^ wt.rotrBH(n, s, 34) ^ wt.rotrBH(n, s, 39), nt = wt.rotrSL(n, s, 28) ^ wt.rotrBL(n, s, 34) ^ wt.rotrBL(n, s, 39), C = n & i ^ n & a ^ i & a, u = s & o ^ s & _ ^ o & _;
      O = x | 0, j = F | 0, x = N | 0, F = T | 0, N = m | 0, T = B | 0, { h: m, l: B } = wt.add(A | 0, g | 0, G | 0, H | 0), A = a | 0, g = _ | 0, a = i | 0, _ = o | 0, i = n | 0, o = s | 0;
      const d = wt.add3L(H, nt, u);
      n = wt.add3H(d, G, Y, C), s = d | 0;
    }
    ({ h: n, l: s } = wt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: o } = wt.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: _ } = wt.add(this.Ch | 0, this.Cl | 0, a | 0, _ | 0), { h: A, l: g } = wt.add(this.Dh | 0, this.Dl | 0, A | 0, g | 0), { h: m, l: B } = wt.add(this.Eh | 0, this.El | 0, m | 0, B | 0), { h: N, l: T } = wt.add(this.Fh | 0, this.Fl | 0, N | 0, T | 0), { h: x, l: F } = wt.add(this.Gh | 0, this.Gl | 0, x | 0, F | 0), { h: O, l: j } = wt.add(this.Hh | 0, this.Hl | 0, O | 0, j | 0), this.set(n, s, i, o, a, _, A, g, m, B, N, T, x, F, O, j);
  }
  roundClean() {
    wr.fill(0), mr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Id = /* @__PURE__ */ oi(() => new Wl());
var Vl = (e) => {
  const { password: t, salt: r, n, p: s, r: i, dklen: o } = e;
  return ul(t, r, { N: n, r: i, p: s, dkLen: o });
}, Zl = (e) => Ml(e), Ed = !1, vd = (e) => Xl(e), Cd = vd;
function $n(e) {
  const t = $(e, "data");
  return Cd(t);
}
$n._ = vd;
$n.lock = () => {
  Ed = !0;
};
$n.register = (e) => {
  if (Ed)
    throw new R(Q.HASHER_LOCKED, "ripemd160 is locked");
  Cd = e;
};
Object.freeze($n);
var sn = (e, t = "base64") => {
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
}, Bd = (e, t, r, n, s) => {
  const i = { sha256: wn, sha512: Id }[s];
  return K(ta(i, e, t, { c: r, dkLen: n }));
}, { crypto: Kn, btoa: xd } = globalThis;
if (!Kn)
  throw new R(
    Q.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!xd)
  throw new R(
    Q.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var lo = (e) => Kn.getRandomValues(new Uint8Array(e)), Cs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const r = String.fromCharCode.apply(null, new Uint8Array(e));
      return xd(r);
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
}, Rd = "AES-CTR", sa = (e, t) => {
  const r = sn(String(e).normalize("NFKC"), "utf-8"), n = Bd(r, t, 1e5, 32, "sha256");
  return $(n);
}, Jl = async (e, t) => {
  const r = lo(16), n = lo(32), s = sa(e, n), i = JSON.stringify(t), o = sn(i, "utf-8"), a = {
    name: Rd,
    counter: r,
    length: 64
  }, _ = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), A = await crypto.subtle.encrypt(a, _, o);
  return {
    data: Cs(new Uint8Array(A)),
    iv: Cs(r),
    salt: Cs(n)
  };
}, jl = async (e, t) => {
  const r = sn(t.iv), n = sn(t.salt), s = sa(e, n), i = sn(t.data), o = {
    name: Rd,
    counter: r,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), _ = await crypto.subtle.decrypt(o, a, i), A = new TextDecoder().decode(_);
  try {
    return JSON.parse(A);
  } catch {
    throw new R(Q.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, ql = async (e, t, r) => {
  const n = Kn.subtle, s = new Uint8Array(t.subarray(0, 16)), i = r, o = e, a = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), _ = await n.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    a,
    o
  );
  return new Uint8Array(_);
}, $l = async (e, t, r) => {
  const n = Kn.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(r).buffer, o = new Uint8Array(e).buffer, a = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), _ = await n.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    a,
    o
  );
  return new Uint8Array(_);
}, Kl = (e, t, r) => {
  const n = e === "sha256" ? wn : Id, s = Ko.create(n, t).update(r).digest();
  return K(s);
}, tA = () => Kn.randomUUID(), eA = {
  bufferFromString: sn,
  stringFromBuffer: Cs,
  decrypt: jl,
  encrypt: Jl,
  keyFromPassword: sa,
  randomBytes: lo,
  scrypt: Vl,
  keccak256: Zl,
  decryptJsonWalletData: $l,
  encryptJsonWalletData: ql,
  computeHmac: Kl,
  pbkdf2: Bd,
  ripemd160: $n,
  randomUUID: tA
}, rA = eA, {
  bufferFromString: Tr,
  decrypt: nA,
  encrypt: sA,
  keyFromPassword: MB,
  randomBytes: Oe,
  stringFromBuffer: Tn,
  scrypt: Sd,
  keccak256: Nd,
  decryptJsonWalletData: iA,
  encryptJsonWalletData: oA,
  pbkdf2: aA,
  computeHmac: Td,
  ripemd160: cA,
  randomUUID: uA
} = rA;
function Ee(e) {
  return K(wn($(e)));
}
function tr(e) {
  return Ee(e);
}
function dA(e) {
  const t = BigInt(e), r = new ArrayBuffer(8), n = new DataView(r);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
function _A(e) {
  return tr(Tr(e, "utf-8"));
}
var hA = Object.defineProperty, lA = (e, t, r) => t in e ? hA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ia = (e, t, r) => (lA(e, t + "", r), r), dt = class {
  constructor(e, t, r) {
    M(this, "name");
    M(this, "type");
    M(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = r;
  }
}, AA = "u8", pA = "u16", fA = "u32", gA = "u64", wA = "u256", mA = "raw untyped ptr", yA = "raw untyped slice", bA = "bool", IA = "b256", EA = "struct std::b512::B512", Ds = "enum std::option::Option", vA = "struct std::vec::Vec", CA = "struct std::bytes::Bytes", BA = "struct std::string::String", xA = "str", ts = "()", Qd = /^enum (std::option::)?Option$/m, Dd = /str\[(?<length>[0-9]+)\]/, Ao = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Fd = /struct.+/, Md = /^enum.+$/, RA = /^\((?<items>.*)\)$/, SA = /^generic.+$/, NA = /([^\s]+)$/m, Fs = "1", ft = 8, lr = 32, Ms = lr + 2, Os = lr, TA = lr, QA = lr, DA = ft * 4, FA = ft * 2, Od = 2 ** 32 - 1, Ld = ({ maxInputs: e }) => lr + // Tx ID
Os + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Os + ft) + ft, kd = ft + // Identifier
ft + // Gas limit
ft + // Script size
ft + // Script data size
ft + // Policies
ft + // Inputs size
ft + // Outputs size
ft + // Witnesses size
lr, OB = ft + // Identifier
DA + // Utxo Length
ft + // Output Index
QA + // Owner
ft + // Amount
Os + // Asset id
FA + // TxPointer
ft + // Witnesses index
ft + // Predicate size
ft + // Predicate data size
ft, dc = (e) => e instanceof Uint8Array, mn = (e) => {
  const t = Array.isArray(e) ? e : Object.values(e);
  for (const r of t)
    if (r.type === Ds || "coder" in r && r.coder.type === Ds || "coders" in r && mn(r.coders))
      return !0;
  return !1;
}, Zn, Pu, yt = (Pu = class extends dt {
  constructor(t, r) {
    super("array", `[${t.type}; ${r}]`, r * t.encodedLength);
    M(this, "coder");
    M(this, "length");
    Le(this, Zn);
    this.coder = t, this.length = r, We(this, Zn, mn([t]));
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new R(Q.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new R(Q.ENCODE_ERROR, "Types/values length mismatch.");
    return ct(Array.from(t).map((r) => this.coder.encode(r)));
  }
  decode(t, r) {
    if (!zt(this, Zn) && t.length < this.encodedLength || t.length > Od)
      throw new R(Q.DECODE_ERROR, "Invalid array data size.");
    let n = r;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, n] = this.coder.decode(t, n), i;
    }), n];
  }
}, Zn = new WeakMap(), Pu), q = class extends dt {
  constructor() {
    super("b256", "b256", ft * 4);
  }
  encode(e) {
    let t;
    try {
      t = $(e);
    } catch {
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid b256 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (S(r).isZero() && (r = new Uint8Array(32)), r.length !== this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid b256 byte data size.");
    return [Ho(r, 32), t + 32];
  }
}, MA = class extends dt {
  constructor() {
    super("b512", "struct B512", ft * 8);
  }
  encode(e) {
    let t;
    try {
      t = $(e);
    } catch {
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid b512 data size.");
    let r = e.slice(t, t + this.encodedLength);
    if (S(r).isZero() && (r = new Uint8Array(64)), r.length !== this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid b512 byte data size.");
    return [Ho(r, this.encodedLength), t + this.encodedLength];
  }
}, OA = {
  u64: ft,
  u256: ft * 4
}, k = class extends dt {
  constructor(e) {
    super("bigNumber", e, OA[e]);
  }
  encode(e) {
    let t;
    try {
      t = _r(e, this.encodedLength);
    } catch {
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let r = e.slice(t, t + this.encodedLength);
    if (r = r.slice(0, this.encodedLength), r.length !== this.encodedLength)
      throw new R(Q.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [S(r), t + this.encodedLength];
  }
}, LA = class extends dt {
  constructor(t = {
    padToWordSize: !1
  }) {
    const r = t.padToWordSize ? ft : 1;
    super("boolean", "boolean", r);
    M(this, "options");
    this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new R(Q.ENCODE_ERROR, "Invalid boolean value.");
    return _r(t ? 1 : 0, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid boolean data size.");
    const n = S(t.slice(r, r + this.encodedLength));
    if (n.isZero())
      return [!1, r + this.encodedLength];
    if (!n.eq(S(1)))
      throw new R(Q.DECODE_ERROR, "Invalid boolean value.");
    return [!0, r + this.encodedLength];
  }
}, Pd = class extends dt {
  constructor() {
    super("struct", "struct Bytes", ft);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), r = new k("u64").encode(t.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < ft)
      throw new R(Q.DECODE_ERROR, "Invalid byte data size.");
    const r = t + ft, n = e.slice(t, r), s = S(new k("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new R(Q.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, r + s];
  }
};
ia(Pd, "memorySize", 1);
var Yr, Jn, cn, Or, zd, Gd, Xd, Uu, Ud = (Uu = class extends dt {
  constructor(t, r) {
    const n = new k("u64"), s = Object.values(r).reduce(
      (i, o) => Math.min(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, n.encodedLength + s);
    Le(this, Or);
    M(this, "name");
    M(this, "coders");
    Le(this, Yr);
    Le(this, Jn);
    Le(this, cn);
    this.name = t, this.coders = r, We(this, Yr, n), We(this, Jn, s), We(this, cn, !(Qd.test(this.type) || mn(r)));
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return hs(this, Or, Gd).call(this, t);
    const [r, ...n] = Object.keys(t);
    if (!r)
      throw new R(Q.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (n.length !== 0)
      throw new R(Q.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[r], i = Object.keys(this.coders).indexOf(r);
    if (i === -1) {
      const a = Object.keys(this.coders).map((_) => `'${_}'`).join(", ");
      throw new R(
        Q.INVALID_DECODE_VALUE,
        `Invalid case '${r}'. Valid cases: ${a}.`
      );
    }
    const o = s.encode(t[r]);
    return new Uint8Array([...zt(this, Yr).encode(i), ...o]);
  }
  decode(t, r) {
    if (zt(this, cn) && t.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid enum data size.");
    const n = new k("u64").decode(t, r)[0], s = Br(n), i = Object.keys(this.coders)[s];
    if (!i)
      throw new R(
        Q.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], a = r + zt(this, Yr).encodedLength;
    if (zt(this, cn) && t.length < a + o.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid enum data size.");
    const [_, A] = o.decode(t, a);
    return hs(this, Or, zd).call(this, this.coders[i]) ? hs(this, Or, Xd).call(this, i, A) : [{ [i]: _ }, A];
  }
}, Yr = new WeakMap(), Jn = new WeakMap(), cn = new WeakMap(), Or = new WeakSet(), // Checks that we're handling a native enum that is of type void.
zd = function(t) {
  return this.type !== Ds && t.type === ts;
}, Gd = function(t) {
  const r = this.coders[t], n = r.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(zt(this, Jn) - r.encodedLength);
  return ct([zt(this, Yr).encode(s), i, n]);
}, Xd = function(t, r) {
  return [t, r];
}, Uu), kA = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new R(Q.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, et = class extends dt {
  constructor(t, r = {
    padToWordSize: !1
  }) {
    const n = r.padToWordSize ? ft : kA(t);
    super("number", t, n);
    M(this, "baseType");
    M(this, "options");
    this.baseType = t, this.options = r;
  }
  encode(t) {
    let r;
    try {
      r = _r(t);
    } catch {
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (r.length > this.encodedLength)
      throw new R(Q.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return _r(r, this.encodedLength);
  }
  decode(t, r) {
    if (t.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid number data size.");
    const n = t.slice(r, r + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid number byte data size.");
    return [Br(n), r + this.encodedLength];
  }
}, Hd = class extends Ud {
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
}, PA = class extends dt {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ft);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new R(Q.ENCODE_ERROR, "Expected array value.");
    const r = new yt(new et("u8"), e.length).encode(e), n = new k("u64").encode(r.length);
    return new Uint8Array([...n, ...r]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid raw slice data size.");
    const r = t + ft, n = e.slice(t, r), s = S(new k("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new R(Q.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new yt(new et("u8"), s), [a] = o.decode(i, 0);
    return [a, r + s];
  }
}, oa = class extends dt {
  constructor() {
    super("struct", "struct String", ft);
  }
  encode(e) {
    const t = dn(e), r = new k("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid std string data size.");
    const r = t + ft, n = e.slice(t, r), s = S(new k("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new R(Q.DECODE_ERROR, "Invalid std string byte data size.");
    return [Jo(i), r + s];
  }
};
ia(oa, "memorySize", 1);
var Yd = class extends dt {
  constructor() {
    super("strSlice", "str", ft);
  }
  encode(e) {
    const t = dn(e), r = new k("u64").encode(e.length);
    return new Uint8Array([...r, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid string slice data size.");
    const r = t + ft, n = e.slice(t, r), s = S(new k("u64").decode(n, 0)[0]).toNumber(), i = e.slice(r, r + s);
    if (i.length !== s)
      throw new R(Q.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Jo(i), r + s];
  }
};
ia(Yd, "memorySize", 1);
var UA = class extends dt {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new R(Q.ENCODE_ERROR, "Value length mismatch during encode.");
    return dn(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(t, t + this.encodedLength);
    if (r.length !== this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid string byte data size.");
    return [Jo(r), t + this.encodedLength];
  }
}, jn, zu, ai = (zu = class extends dt {
  constructor(t, r) {
    const n = Object.values(r).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, n);
    M(this, "name");
    M(this, "coders");
    Le(this, jn);
    this.name = t, this.coders = r, We(this, jn, mn(r));
  }
  encode(t) {
    return ii(
      Object.keys(this.coders).map((r) => {
        const n = this.coders[r], s = t[r];
        if (!(n instanceof Hd) && s == null)
          throw new R(
            Q.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${r}" not present.`
          );
        return n.encode(s);
      })
    );
  }
  decode(t, r) {
    if (!zt(this, jn) && t.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid struct data size.");
    let n = r;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let _;
      return [_, n] = a.decode(t, n), i[o] = _, i;
    }, {}), n];
  }
}, jn = new WeakMap(), zu), qn, Gu, Wd = (Gu = class extends dt {
  constructor(t) {
    const r = t.reduce((n, s) => n + s.encodedLength, 0);
    super("tuple", `(${t.map((n) => n.type).join(", ")})`, r);
    M(this, "coders");
    Le(this, qn);
    this.coders = t, We(this, qn, mn(t));
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new R(Q.ENCODE_ERROR, "Types/values length mismatch.");
    return ii(this.coders.map((r, n) => r.encode(t[n])));
  }
  decode(t, r) {
    if (!zt(this, qn) && t.length < this.encodedLength)
      throw new R(Q.DECODE_ERROR, "Invalid tuple data size.");
    let n = r;
    return [this.coders.map((i) => {
      let o;
      return [o, n] = i.decode(t, n), o;
    }), n];
  }
}, qn = new WeakMap(), Gu), un, Xu, zA = (Xu = class extends dt {
  constructor(t) {
    super("struct", "struct Vec", ft);
    M(this, "coder");
    Le(this, un);
    this.coder = t, We(this, un, mn([t]));
  }
  encode(t) {
    if (!Array.isArray(t) && !dc(t))
      throw new R(
        Q.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const r = new k("u64");
    if (dc(t))
      return new Uint8Array([...r.encode(t.length), ...t]);
    const n = t.map((i) => this.coder.encode(i)), s = r.encode(t.length);
    return new Uint8Array([...s, ...ii(n)]);
  }
  decode(t, r) {
    if (!zt(this, un) && t.length < this.encodedLength || t.length > Od)
      throw new R(Q.DECODE_ERROR, "Invalid vec data size.");
    const n = r + ft, s = t.slice(r, n), i = S(new k("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, a = t.slice(n, n + o);
    if (!zt(this, un) && a.length !== o)
      throw new R(Q.DECODE_ERROR, "Invalid vec byte data size.");
    let _ = n;
    const A = [];
    for (let g = 0; g < i; g++) {
      const [m, B] = this.coder.decode(t, _);
      A.push(m), _ = B;
    }
    return [A, _];
  }
}, un = new WeakMap(), Xu), Vd = (e) => {
  switch (e) {
    case void 0:
    case Fs:
      return Fs;
    default:
      throw new R(
        Q.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Ln = (e, t) => {
  const r = e.types.find((n) => n.typeId === t);
  if (!r)
    throw new R(
      Q.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return r;
}, GA = (e, t) => t.filter((r) => Ln(e, r.type).type !== ts), XA = (e) => {
  var n;
  const t = e.find((s) => s.name === "buf"), r = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !r)
    throw new R(
      Q.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return r;
}, xr = class {
  constructor(e, t) {
    M(this, "abi");
    M(this, "name");
    M(this, "type");
    M(this, "originalTypeArguments");
    M(this, "components");
    this.abi = e, this.name = t.name;
    const r = Ln(e, t.type);
    if (r.type.length > 256)
      throw new R(
        Q.INVALID_COMPONENT,
        `The provided ABI type is too long: ${r.type}.`
      );
    this.type = r.type, this.originalTypeArguments = t.typeArguments, this.components = xr.getResolvedGenericComponents(
      e,
      t,
      r.components,
      r.typeParameters ?? xr.getImplicitGenericTypeParameters(e, r.components)
    );
  }
  static getResolvedGenericComponents(e, t, r, n) {
    if (r === null)
      return null;
    if (n === null || n.length === 0)
      return r.map((o) => new xr(e, o));
    const s = n.reduce(
      (o, a, _) => {
        var g;
        const A = { ...o };
        return A[a] = structuredClone(
          (g = t.typeArguments) == null ? void 0 : g[_]
        ), A;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      r,
      s
    ).map((o) => new xr(e, o));
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
      const s = Ln(e, n.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Ln(e, s.type);
      if (SA.test(i.type)) {
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
    return Fd.test(this.type) ? "s" : Ao.test(this.type) ? "a" : Md.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Dd.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Ao.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new xr(this.abi, o).getSignature()).join(",")}>` : "", n = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${r}${n}`;
  }
}, HA = class extends dt {
  constructor() {
    super("void", ts, 0);
  }
  encode(e) {
    return new Uint8Array([]);
  }
  decode(e, t) {
    return [void 0, t];
  }
};
function _c(e, t) {
  const { getCoder: r } = t;
  return e.reduce((n, s) => {
    const i = n;
    return i[s.name] = r(s, t), i;
  }, {});
}
var qr = (e, t) => {
  var A, g, m, B;
  switch (e.type) {
    case AA:
    case pA:
    case fA:
      return new et(e.type);
    case gA:
    case mA:
      return new k("u64");
    case wA:
      return new k("u256");
    case yA:
      return new PA();
    case bA:
      return new LA();
    case IA:
      return new q();
    case EA:
      return new MA();
    case CA:
      return new Pd();
    case BA:
      return new oa();
    case xA:
      return new Yd();
    case ts:
      return new HA();
  }
  const r = (A = Dd.exec(e.type)) == null ? void 0 : A.groups;
  if (r) {
    const N = parseInt(r.length, 10);
    return new UA(N);
  }
  const n = e.components, s = (g = Ao.exec(e.type)) == null ? void 0 : g.groups;
  if (s) {
    const N = parseInt(s.length, 10), T = n[0];
    if (!T)
      throw new R(
        Q.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const x = qr(T);
    return new yt(x, N);
  }
  if (e.type === vA) {
    const N = XA(n), T = new xr(e.abi, N), x = qr(T);
    return new zA(x);
  }
  const i = (m = e.type.match(NA)) == null ? void 0 : m[0];
  if (Fd.test(e.type) && i) {
    const N = _c(n, { getCoder: qr });
    return new ai(i, N);
  }
  if (Md.test(e.type) && i) {
    const N = _c(n, { getCoder: qr });
    return e.type === Ds ? new Hd(i, N) : new Ud(i, N);
  }
  if ((B = RA.exec(e.type)) == null ? void 0 : B.groups) {
    const N = n.map((T) => qr(T));
    return new Wd(N);
  }
  throw new R(
    Q.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function YA(e = Fs) {
  switch (e) {
    case Fs:
      return qr;
    default:
      throw new R(
        Q.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Gr = class {
  static getCoder(e, t, r = {
    padToWordSize: !1
  }) {
    const n = new xr(e, t);
    return YA(r.encoding)(n, r);
  }
  static encode(e, t, r, n) {
    return this.getCoder(e, t, n).encode(r);
  }
  static decode(e, t, r, n, s) {
    return this.getCoder(e, t, s).decode(r, n);
  }
}, WA = (e) => {
  const { jsonAbi: t, inputs: r } = e;
  let n = !1;
  return r.reduceRight((s, i) => {
    const o = Ln(t, i.type);
    return n = n || o.type !== ts && !Qd.test(o.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, VA = (e, t) => {
  if (e.length >= t.length)
    return e;
  const r = e.slice();
  return r.length = t.length, r.fill(void 0, e.length), r;
}, po = class {
  constructor(e, t) {
    M(this, "signature");
    M(this, "selector");
    M(this, "selectorBytes");
    M(this, "encoding");
    M(this, "name");
    M(this, "jsonFn");
    M(this, "attributes");
    M(this, "jsonAbiOld");
    M(this, "jsonFnOld");
    this.jsonFn = t, this.jsonAbiOld = e, this.jsonFnOld = e.functions.find((r) => r.name === t.name), this.name = t.name, this.signature = po.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = po.getFunctionSelector(this.signature), this.selectorBytes = new oa().encode(this.name), this.encoding = Vd(e.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const r = t.inputs.map(
      (n) => new xr(e, n).getSignature()
    );
    return `${t.name}(${r.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Ee(Tr(e, "utf-8"));
    return S(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e) {
    const r = WA({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((i) => !i.isOptional).length;
    if (e.length < r)
      throw new R(
        Q.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${r} arguments, received ${e.length}`
      );
    const n = this.jsonFnOld.inputs.map(
      (i) => Gr.getCoder(this.jsonAbiOld, i, {
        encoding: this.encoding
      })
    ), s = VA(e, this.jsonFn.inputs);
    return new Wd(n).encode(s);
  }
  decodeArguments(e) {
    const t = $(e), r = GA(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (r.length === 0) {
      if (t.length === 0)
        return;
      throw new R(
        Q.DECODE_ERROR,
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
        const o = Gr.getCoder(this.jsonAbiOld, i, { encoding: this.encoding }), [a, _] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, a],
          offset: s.offset + _
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
}, ZA = (e, t) => e.find((r) => r.concreteTypeId === t), aa = (e, t) => e.concreteTypes.find((r) => r.concreteTypeId === t);
function ca(e, t, r) {
  const n = aa(e, r);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = ZA(t, r);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: ua(n.components),
    concreteTypeId: r,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
function Zd(e, t, r) {
  var n;
  return ((n = r.typeArguments) == null ? void 0 : n.map((s) => {
    const i = aa(e, s);
    return {
      name: "",
      type: isNaN(s) ? ca(e, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: Zd(e, t, i)
    };
  })) ?? null;
}
function Kr(e, t, r, n) {
  const s = ca(e, t, r), i = aa(e, r);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: Zd(e, t, i)
  };
}
function ua(e, t, r) {
  return (r == null ? void 0 : r.map((n) => {
    const { typeId: s, name: i, typeArguments: o } = n, a = isNaN(s) ? ca(e, t, s) : s;
    return {
      name: i,
      type: a,
      // originalTypeId: typeId,
      typeArguments: ua(e, t, o)
    };
  })) ?? null;
}
function JA(e) {
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
    o.components = ua(e, t, o.components);
  });
  const r = e.functions.map((o) => {
    const a = o.inputs.map(
      ({ concreteTypeId: A, name: g }) => Kr(e, t, A, g)
    ), _ = Kr(e, t, o.output, "");
    return { ...o, inputs: a, output: _ };
  }), n = e.configurables.map((o) => ({
    name: o.name,
    configurableType: Kr(e, t, o.concreteTypeId),
    offset: o.offset
  })), s = e.loggedTypes.map((o) => ({
    logId: o.logId,
    loggedType: Kr(e, t, o.concreteTypeId)
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
    M(this, "functions");
    M(this, "configurables");
    M(this, "jsonAbi");
    M(this, "encoding");
    M(this, "jsonAbiOld");
    this.jsonAbi = e, this.encoding = Vd(e.encodingVersion), this.jsonAbiOld = JA(e), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new po(this.jsonAbiOld, t)])
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
    throw new R(
      Q.FUNCTION_NOT_FOUND,
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
      throw new R(
        Q.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Gr.decode(this.jsonAbiOld, r.loggedType, $(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const r = this.jsonAbiOld.configurables.find((n) => n.name === e);
    if (!r)
      throw new R(
        Q.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Gr.encode(this.jsonAbiOld, r.configurableType, t, {
      encoding: this.encoding
    });
  }
  encodeType(e, t) {
    const r = Kr(
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
    const r = Kr(
      this.jsonAbi,
      this.jsonAbiOld.types,
      e,
      ""
    );
    return Gr.decode(this.jsonAbiOld, r, t, 0, { encoding: this.encoding });
  }
}, LB = class {
}, jA = class {
}, Jd = class {
}, jd = class {
}, qA = class extends jd {
}, $A = class extends jd {
}, Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
var ln = Pn.bech32m = Pn.bech32 = void 0;
const Ls = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", qd = {};
for (let e = 0; e < Ls.length; e++) {
  const t = Ls.charAt(e);
  qd[t] = e;
}
function on(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function hc(e) {
  let t = 1;
  for (let r = 0; r < e.length; ++r) {
    const n = e.charCodeAt(r);
    if (n < 33 || n > 126)
      return "Invalid prefix (" + e + ")";
    t = on(t) ^ n >> 5;
  }
  t = on(t);
  for (let r = 0; r < e.length; ++r) {
    const n = e.charCodeAt(r);
    t = on(t) ^ n & 31;
  }
  return t;
}
function da(e, t, r, n) {
  let s = 0, i = 0;
  const o = (1 << r) - 1, a = [];
  for (let _ = 0; _ < e.length; ++_)
    for (s = s << t | e[_], i += t; i >= r; )
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
function KA(e) {
  return da(e, 8, 5, !0);
}
function tp(e) {
  const t = da(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function ep(e) {
  const t = da(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function $d(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function r(o, a, _) {
    if (_ = _ || 90, o.length + 7 + a.length > _)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let A = hc(o);
    if (typeof A == "string")
      throw new Error(A);
    let g = o + "1";
    for (let m = 0; m < a.length; ++m) {
      const B = a[m];
      if (B >> 5)
        throw new Error("Non 5-bit word");
      A = on(A) ^ B, g += Ls.charAt(B);
    }
    for (let m = 0; m < 6; ++m)
      A = on(A);
    A ^= t;
    for (let m = 0; m < 6; ++m) {
      const B = A >> (5 - m) * 5 & 31;
      g += Ls.charAt(B);
    }
    return g;
  }
  function n(o, a) {
    if (a = a || 90, o.length < 8)
      return o + " too short";
    if (o.length > a)
      return "Exceeds length limit";
    const _ = o.toLowerCase(), A = o.toUpperCase();
    if (o !== _ && o !== A)
      return "Mixed-case string " + o;
    o = _;
    const g = o.lastIndexOf("1");
    if (g === -1)
      return "No separator character for " + o;
    if (g === 0)
      return "Missing prefix for " + o;
    const m = o.slice(0, g), B = o.slice(g + 1);
    if (B.length < 6)
      return "Data too short";
    let N = hc(m);
    if (typeof N == "string")
      return N;
    const T = [];
    for (let x = 0; x < B.length; ++x) {
      const F = B.charAt(x), O = qd[F];
      if (O === void 0)
        return "Unknown character " + F;
      N = on(N) ^ O, !(x + 6 >= B.length) && T.push(O);
    }
    return N !== t ? "Invalid checksum for " + o : { prefix: m, words: T };
  }
  function s(o, a) {
    const _ = n(o, a);
    if (typeof _ == "object")
      return _;
  }
  function i(o, a) {
    const _ = n(o, a);
    if (typeof _ == "object")
      return _;
    throw new Error(_);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: r,
    toWords: KA,
    fromWordsUnsafe: tp,
    fromWords: ep
  };
}
Pn.bech32 = $d("bech32");
ln = Pn.bech32m = $d("bech32m");
var ks = "fuel";
function _a(e) {
  return ln.decode(e);
}
function Bs(e) {
  return ln.encode(
    ks,
    ln.toWords($(K(e)))
  );
}
function xs(e) {
  return typeof e == "string" && e.indexOf(ks + 1) === 0 && _a(e).prefix === ks;
}
function fo(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function lc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function go(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function ha(e) {
  return new Uint8Array(ln.fromWords(_a(e).words));
}
function Ac(e) {
  if (!xs(e))
    throw new R(
      R.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return K(ha(e));
}
function rp(e) {
  const { words: t } = _a(e);
  return ln.encode(ks, t);
}
var Qn = (e) => e instanceof Jd ? e.address : e instanceof qA ? e.id : e, np = () => K(Oe(32)), sp = (e) => {
  let t;
  try {
    if (!fo(e))
      throw new R(
        R.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = ha(Bs(e)), t = K(t.fill(0, 0, 12));
  } catch {
    throw new R(
      R.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, ip = (e) => {
  if (!go(e))
    throw new R(R.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, pt = class extends jA {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    M(this, "bech32Address");
    if (this.bech32Address = rp(t), !xs(this.bech32Address))
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
    return Ac(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return ha(this.bech32Address);
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
    const t = Ac(this.bech32Address);
    return {
      bits: sp(t)
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
    if (!lc(t))
      throw new R(R.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const r = K(wn($(t)));
    return new pt(Bs(r));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!fo(t))
      throw new R(
        R.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new pt(Bs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(np());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return xs(t) ? new pt(t) : this.fromB256(t);
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
      return pt.fromB256(t.toB256());
    if (lc(t))
      return pt.fromPublicKey(t);
    if (xs(t))
      return new pt(t);
    if (fo(t))
      return pt.fromB256(t);
    if (go(t))
      return pt.fromEvmAddress(t);
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
    if (!go(t))
      throw new R(
        R.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const r = ip(t);
    return new pt(Bs(r));
  }
};
function op(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Kd(e) {
  return function t(r) {
    return arguments.length === 0 || op(r) ? t : e.apply(this, arguments);
  };
}
var ap = /* @__PURE__ */ Kd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function cp(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function t0(e, t, r) {
  if (r || (r = new dp()), up(e))
    return e;
  var n = function(i) {
    var o = r.get(e);
    if (o)
      return o;
    r.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = t0(e[a], !0, r));
    return i;
  };
  switch (ap(e)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return n(Array(e.length));
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return cp(e);
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
function up(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var dp = /* @__PURE__ */ function() {
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
}(), He = /* @__PURE__ */ Kd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : t0(t);
}), Nr, Hu, St = (Hu = class extends dt {
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
    M(this, "length");
    Le(this, Nr);
    this.length = t, We(this, Nr, r);
  }
  encode(t) {
    const r = [], n = $(t);
    return r.push(n), zt(this, Nr) && r.push(new Uint8Array(zt(this, Nr))), ct(r);
  }
  decode(t, r) {
    let n, s = r;
    [n, s] = [K(t.slice(s, s + this.length)), s + this.length];
    const i = n;
    return zt(this, Nr) && ([n, s] = [null, s + zt(this, Nr)]), [i, s];
  }
}, Nr = new WeakMap(), Hu), Vr = class extends ai {
  constructor() {
    super("TxPointer", {
      blockHeight: new et("u32", { padToWordSize: !0 }),
      txIndex: new et("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(e) {
    if (e.length !== 12)
      throw new R(
        Q.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${e.length}. It must have length 12.`
      );
    const [t, r] = [e.substring(0, 8), e.substring(8)];
    return {
      blockHeight: parseInt(t, 16),
      txIndex: parseInt(r, 16)
    };
  }
}, Ct = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ct || {}), pc = class extends dt {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.txID)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new q().encode(e.owner)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), t.push(new Vr().encode(e.txPointer)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new k("u64").encode(e.predicateGasUsed)), t.push(new k("u64").encode(e.predicateLength)), t.push(new k("u64").encode(e.predicateDataLength)), t.push(new St(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new St(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new q().decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new q().decode(e, n);
    const _ = r;
    [r, n] = new Vr().decode(e, n);
    const A = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const g = Number(r);
    [r, n] = new k("u64").decode(e, n);
    const m = r;
    [r, n] = new k("u64").decode(e, n);
    const B = r;
    [r, n] = new k("u64").decode(e, n);
    const N = r;
    [r, n] = new St(B.toNumber()).decode(e, n);
    const T = r;
    return [r, n] = new St(N.toNumber()).decode(e, n), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: a,
        assetId: _,
        txPointer: A,
        witnessIndex: g,
        predicateGasUsed: m,
        predicateLength: B,
        predicateDataLength: N,
        predicate: T,
        predicateData: r
      },
      n
    ];
  }
}, Ps = class extends dt {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.txID)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputIndex)), t.push(new q().encode(e.balanceRoot)), t.push(new q().encode(e.stateRoot)), t.push(new Vr().encode(e.txPointer)), t.push(new q().encode(e.contractID)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new q().decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new Vr().decode(e, n);
    const _ = r;
    return [r, n] = new q().decode(e, n), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: a,
        txPointer: _,
        contractID: r
      },
      n
    ];
  }
}, Un = class extends dt {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new St(32).encode(e.nonce)), t.push(new k("u64").encode(e.amount)), t.push($(e.data || "0x")), Ee(ct(t));
  }
  static encodeData(e) {
    const t = $(e || "0x"), r = t.length;
    return new St(r).encode(t);
  }
  encode(e) {
    const t = [], r = Un.encodeData(e.data);
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new k("u64").encode(e.amount)), t.push(new St(32).encode(e.nonce)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new k("u64").encode(e.predicateGasUsed)), t.push(new k("u64").encode(r.length)), t.push(new k("u64").encode(e.predicateLength)), t.push(new k("u64").encode(e.predicateDataLength)), t.push(new St(r.length).encode(r)), t.push(new St(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new St(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), ct(t);
  }
  static decodeData(e) {
    const t = $(e), r = t.length, [n] = new St(r).decode(t, 0);
    return $(n);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const _ = Number(r);
    [r, n] = new k("u64").decode(e, n);
    const A = r;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new k("u64").decode(e, n);
    const m = r;
    [r, n] = new k("u64").decode(e, n);
    const B = r;
    [r, n] = new St(g).decode(e, n);
    const N = r;
    [r, n] = new St(m.toNumber()).decode(e, n);
    const T = r;
    return [r, n] = new St(B.toNumber()).decode(e, n), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: _,
        nonce: a,
        predicateGasUsed: A,
        dataLength: g,
        predicateLength: m,
        predicateDataLength: B,
        data: N,
        predicate: T,
        predicateData: r
      },
      n
    ];
  }
}, er = class extends dt {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new et("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new pc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ps().encode(e));
        break;
      }
      case 2: {
        t.push(new Un().encode(e));
        break;
      }
      default:
        throw new R(
          Q.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${r}.`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new pc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Ps().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Un().decode(e, n), [r, n];
      default:
        throw new R(
          Q.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, It = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(It || {}), fc = class extends dt {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.to)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    return [r, n] = new q().decode(e, n), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, Us = class extends dt {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new et("u8", { padToWordSize: !0 }).encode(e.inputIndex)), t.push(new q().encode(e.balanceRoot)), t.push(new q().encode(e.stateRoot)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    return [r, n] = new q().decode(e, n), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: r
      },
      n
    ];
  }
}, gc = class extends dt {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.to)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    return [r, n] = new q().decode(e, n), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, wc = class extends dt {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.to)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    return [r, n] = new q().decode(e, n), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: r
      },
      n
    ];
  }
}, mc = class extends dt {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.contractId)), t.push(new q().encode(e.stateRoot)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    return [r, n] = new q().decode(e, n), [
      {
        type: 4,
        contractId: s,
        stateRoot: r
      },
      n
    ];
  }
}, rr = class extends dt {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new et("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (r) {
      case 0: {
        t.push(new fc().encode(e));
        break;
      }
      case 1: {
        t.push(new Us().encode(e));
        break;
      }
      case 2: {
        t.push(new gc().encode(e));
        break;
      }
      case 3: {
        t.push(new wc().encode(e));
        break;
      }
      case 4: {
        t.push(new mc().encode(e));
        break;
      }
      default:
        throw new R(
          Q.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${r}.`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new fc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Us().decode(e, n), [r, n];
      case 2:
        return [r, n] = new gc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new wc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new mc().decode(e, n), [r, n];
      default:
        throw new R(
          Q.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, ze = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(ze || {}), _p = (e) => e.sort((t, r) => t.type - r.type);
function hp(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((r) => {
    if (t.has(r.type))
      throw new R(
        Q.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(r.type);
  });
}
var nr = class extends dt {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    hp(e);
    const t = _p(e), r = [];
    return t.forEach(({ data: n, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          r.push(new k("u64").encode(n));
          break;
        case 4:
          r.push(new et("u32", { padToWordSize: !0 }).encode(n));
          break;
        default:
          throw new R(Q.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), ct(r);
  }
  decode(e, t, r) {
    let n = t;
    const s = [];
    if (r & 1) {
      const [i, o] = new k("u64").decode(e, n);
      n = o, s.push({ type: 1, data: i });
    }
    if (r & 2) {
      const [i, o] = new k("u64").decode(e, n);
      n = o, s.push({ type: 2, data: i });
    }
    if (r & 4) {
      const [i, o] = new et("u32", { padToWordSize: !0 }).decode(
        e,
        n
      );
      n = o, s.push({ type: 4, data: i });
    }
    if (r & 8) {
      const [i, o] = new k("u64").decode(e, n);
      n = o, s.push({ type: 8, data: i });
    }
    return [s, n];
  }
}, lt = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(lt || {}), yc = class extends dt {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.from)), t.push(new q().encode(e.to)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), t.push(new k("u64").encode(e.gas)), t.push(new k("u64").encode(e.param1)), t.push(new k("u64").encode(e.param2)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r;
    [r, n] = new k("u64").decode(e, n);
    const A = r;
    [r, n] = new k("u64").decode(e, n);
    const g = r;
    [r, n] = new k("u64").decode(e, n);
    const m = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        gas: _,
        param1: A,
        param2: g,
        pc: m,
        is: r
      },
      n
    ];
  }
}, bc = class extends dt {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.id)), t.push(new k("u64").encode(e.val)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    return [r, n] = new k("u64").decode(e, n), [
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
}, Ic = class extends dt {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.id)), t.push(new k("u64").encode(e.ptr)), t.push(new k("u64").encode(e.len)), t.push(new q().encode(e.digest)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: a,
        pc: _,
        is: r
      },
      n
    ];
  }
}, Ec = class extends dt {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.id)), t.push(new k("u64").encode(e.reason)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), t.push(new q().encode(e.contractId)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    return [r, n] = new q().decode(e, n), [
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
}, vc = class extends dt {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.id)), t.push(new k("u64").encode(e.val)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    return [r, n] = new k("u64").decode(e, n), [
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
}, Cc = class extends dt {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.id)), t.push(new k("u64").encode(e.val0)), t.push(new k("u64").encode(e.val1)), t.push(new k("u64").encode(e.val2)), t.push(new k("u64").encode(e.val3)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r;
    [r, n] = new k("u64").decode(e, n);
    const A = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: a,
        val3: _,
        pc: A,
        is: r
      },
      n
    ];
  }
}, Bc = class extends dt {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.id)), t.push(new k("u64").encode(e.val0)), t.push(new k("u64").encode(e.val1)), t.push(new k("u64").encode(e.ptr)), t.push(new k("u64").encode(e.len)), t.push(new q().encode(e.digest)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new k("u64").decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r;
    [r, n] = new q().decode(e, n);
    const A = r;
    [r, n] = new k("u64").decode(e, n);
    const g = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: a,
        len: _,
        digest: A,
        pc: g,
        is: r
      },
      n
    ];
  }
}, xc = class extends dt {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.from)), t.push(new q().encode(e.to)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        pc: _,
        is: r
      },
      n
    ];
  }
}, Rc = class extends dt {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.from)), t.push(new q().encode(e.to)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.assetId)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        pc: _,
        is: r
      },
      n
    ];
  }
}, Sc = class extends dt {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new k("u64").encode(e.result)), t.push(new k("u64").encode(e.gasUsed)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new k("u64").decode(e, n);
    const s = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 9,
        result: s,
        gasUsed: r
      },
      n
    ];
  }
}, zs = class extends dt {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new St(32).encode(e.sender)), t.push(new St(32).encode(e.recipient)), t.push(new St(32).encode(e.nonce)), t.push(new k("u64").encode(e.amount)), t.push($(e.data || "0x")), Ee(ct(t));
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.sender)), t.push(new q().encode(e.recipient)), t.push(new k("u64").encode(e.amount)), t.push(new q().encode(e.nonce)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.data.length)), t.push(new q().encode(e.digest)), t.push(new St(e.data.length).encode(e.data)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new q().decode(e, n);
    const a = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const _ = r;
    [r, n] = new q().decode(e, n);
    const A = r;
    [r, n] = new St(_).decode(e, n);
    const g = $(r), m = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: a,
      digest: A,
      data: g
    };
    return m.messageId = zs.getMessageId(m), [m, n];
  }
}, la = (e, t) => {
  const r = $(e), n = $(t);
  return Ee(ct([r, n]));
}, kB = (e, t) => ({
  bits: la(e, t)
}), zn = class extends dt {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return la(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.subId)), t.push(new q().encode(e.contractId)), t.push(new k("u64").encode(e.val)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r, A = zn.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: _,
      assetId: A
    }, n];
  }
}, wo = class extends dt {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return la(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.subId)), t.push(new q().encode(e.contractId)), t.push(new k("u64").encode(e.val)), t.push(new k("u64").encode(e.pc)), t.push(new k("u64").encode(e.is)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new k("u64").decode(e, n);
    const _ = r, A = zn.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: _,
      assetId: A
    }, n];
  }
}, PB = class extends dt {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new et("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(new yc().encode(e));
        break;
      }
      case 1: {
        t.push(new bc().encode(e));
        break;
      }
      case 2: {
        t.push(new Ic().encode(e));
        break;
      }
      case 3: {
        t.push(new Ec().encode(e));
        break;
      }
      case 4: {
        t.push(new vc().encode(e));
        break;
      }
      case 5: {
        t.push(new Cc().encode(e));
        break;
      }
      case 6: {
        t.push(new Bc().encode(e));
        break;
      }
      case 7: {
        t.push(new xc().encode(e));
        break;
      }
      case 8: {
        t.push(new Rc().encode(e));
        break;
      }
      case 9: {
        t.push(new Sc().encode(e));
        break;
      }
      case 10: {
        t.push(new zs().encode(e));
        break;
      }
      case 11: {
        t.push(new zn().encode(e));
        break;
      }
      case 12: {
        t.push(new wo().encode(e));
        break;
      }
      default:
        throw new R(Q.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${r}`);
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new yc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new bc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Ic().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Ec().decode(e, n), [r, n];
      case 4:
        return [r, n] = new vc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new Cc().decode(e, n), [r, n];
      case 6:
        return [r, n] = new Bc().decode(e, n), [r, n];
      case 7:
        return [r, n] = new xc().decode(e, n), [r, n];
      case 8:
        return [r, n] = new Rc().decode(e, n), [r, n];
      case 9:
        return [r, n] = new Sc().decode(e, n), [r, n];
      case 10:
        return [r, n] = new zs().decode(e, n), [r, n];
      case 11:
        return [r, n] = new zn().decode(e, n), [r, n];
      case 12:
        return [r, n] = new wo().decode(e, n), [r, n];
      default:
        throw new R(Q.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Nc = class extends ai {
  constructor() {
    super("StorageSlot", {
      key: new q(),
      value: new q()
    });
  }
}, Tc = class extends dt {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: r } = e;
    switch (t.push(new et("u8", { padToWordSize: !0 }).encode(r)), r) {
      case 0: {
        const n = e.data;
        t.push(new et("u16", { padToWordSize: !0 }).encode(n.witnessIndex)), t.push(new q().encode(n.checksum));
        break;
      }
      case 1: {
        const n = e.data;
        t.push(new q().encode(n.bytecodeRoot));
        break;
      }
      default:
        throw new R(
          Q.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r = t, n;
    [n, r] = new et("u8", { padToWordSize: !0 }).decode(e, r);
    const s = n;
    switch (s) {
      case 0: {
        [n, r] = new et("u16", { padToWordSize: !0 }).decode(e, r);
        const i = n;
        return [n, r] = new q().decode(e, r), [{ type: s, data: { witnessIndex: i, checksum: n } }, r];
      }
      case 1:
        return [n, r] = new q().decode(e, r), [{ type: s, data: { bytecodeRoot: n } }, r];
      default:
        throw new R(
          Q.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, sr = class extends dt {
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
    return t.push(new et("u32", { padToWordSize: !0 }).encode(e.dataLength)), t.push(new St(e.dataLength).encode(e.data)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    return [r, n] = new St(s).decode(e, n), [
      {
        dataLength: s,
        data: r
      },
      n
    ];
  }
}, Gt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e[e.Blob = 5] = "Blob", e))(Gt || {}), Qc = class extends dt {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new k("u64").encode(e.scriptGasLimit)), t.push(new q().encode(e.receiptsRoot)), t.push(new k("u64").encode(e.scriptLength)), t.push(new k("u64").encode(e.scriptDataLength)), t.push(new et("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new St(e.scriptLength.toNumber()).encode(e.script)), t.push(new St(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new nr().encode(e.policies)), t.push(new yt(new er(), e.inputsCount).encode(e.inputs)), t.push(new yt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new yt(new sr(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new k("u64").decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const _ = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const m = r;
    [r, n] = new St(o.toNumber()).decode(e, n);
    const B = r;
    [r, n] = new St(a.toNumber()).decode(e, n);
    const N = r;
    [r, n] = new nr().decode(e, n, _);
    const T = r;
    [r, n] = new yt(new er(), A).decode(e, n);
    const x = r;
    [r, n] = new yt(new rr(), g).decode(e, n);
    const F = r;
    return [r, n] = new yt(new sr(), m).decode(e, n), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: a,
        policyTypes: _,
        inputsCount: A,
        outputsCount: g,
        witnessesCount: m,
        receiptsRoot: i,
        script: B,
        scriptData: N,
        policies: T,
        inputs: x,
        outputs: F,
        witnesses: r
      },
      n
    ];
  }
}, Dc = class extends dt {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new et("u16", { padToWordSize: !0 }).encode(e.bytecodeWitnessIndex)), t.push(new q().encode(e.salt)), t.push(new k("u64").encode(e.storageSlotsCount)), t.push(new et("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(
      new yt(new Nc(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new nr().encode(e.policies)), t.push(new yt(new er(), e.inputsCount).encode(e.inputs)), t.push(new yt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new yt(new sr(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    [r, n] = new q().decode(e, n);
    const i = r;
    [r, n] = new k("u64").decode(e, n);
    const o = r;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const _ = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new yt(new Nc(), o.toNumber()).decode(
      e,
      n
    );
    const m = r;
    [r, n] = new nr().decode(e, n, a);
    const B = r;
    [r, n] = new yt(new er(), _).decode(e, n);
    const N = r;
    [r, n] = new yt(new rr(), A).decode(e, n);
    const T = r;
    return [r, n] = new yt(new sr(), g).decode(e, n), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: a,
        storageSlotsCount: o,
        inputsCount: _,
        outputsCount: A,
        witnessesCount: g,
        salt: i,
        policies: B,
        storageSlots: m,
        inputs: N,
        outputs: T,
        witnesses: r
      },
      n
    ];
  }
}, Fc = class extends dt {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Vr().encode(e.txPointer)), t.push(new Ps().encode(e.inputContract)), t.push(new Us().encode(e.outputContract)), t.push(new k("u64").encode(e.mintAmount)), t.push(new q().encode(e.mintAssetId)), t.push(new k("u64").encode(e.gasPrice)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Vr().decode(e, n);
    const s = r;
    [r, n] = new Ps().decode(e, n);
    const i = r;
    [r, n] = new Us().decode(e, n);
    const o = r;
    [r, n] = new k("u64").decode(e, n);
    const a = r;
    [r, n] = new q().decode(e, n);
    const _ = r;
    return [r, n] = new k("u64").decode(e, n), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: a,
        mintAssetId: _,
        gasPrice: r
      },
      n
    ];
  }
}, Mc = class extends dt {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Tc().encode(e.upgradePurpose)), t.push(new et("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new nr().encode(e.policies)), t.push(new yt(new er(), e.inputsCount).encode(e.inputs)), t.push(new yt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new yt(new sr(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new Tc().decode(e, n);
    const s = r;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const _ = r;
    [r, n] = new nr().decode(e, n, i);
    const A = r;
    [r, n] = new yt(new er(), o).decode(e, n);
    const g = r;
    [r, n] = new yt(new rr(), a).decode(e, n);
    const m = r;
    return [r, n] = new yt(new sr(), _).decode(e, n), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: a,
        witnessesCount: _,
        policies: A,
        inputs: g,
        outputs: m,
        witnesses: r
      },
      n
    ];
  }
}, Oc = class extends dt {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.root)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.subsectionIndex)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.subsectionsNumber)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.proofSetCount)), t.push(new et("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new yt(new q(), e.proofSetCount).encode(e.proofSet)), t.push(new nr().encode(e.policies)), t.push(new yt(new er(), e.inputsCount).encode(e.inputs)), t.push(new yt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new yt(new sr(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const _ = r;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const g = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const m = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const B = r;
    [r, n] = new yt(new q(), _).decode(e, n);
    const N = r;
    [r, n] = new nr().decode(e, n, A);
    const T = r;
    [r, n] = new yt(new er(), g).decode(e, n);
    const x = r;
    [r, n] = new yt(new rr(), m).decode(e, n);
    const F = r;
    return [r, n] = new yt(new sr(), B).decode(e, n), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: a,
        proofSetCount: _,
        policyTypes: A,
        inputsCount: g,
        outputsCount: m,
        witnessesCount: B,
        proofSet: N,
        policies: T,
        inputs: x,
        outputs: F,
        witnesses: r
      },
      n
    ];
  }
}, Lc = class extends dt {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new q().encode(e.blobId)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessIndex)), t.push(new et("u32", { padToWordSize: !0 }).encode(e.policyTypes)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.inputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.outputsCount)), t.push(new et("u16", { padToWordSize: !0 }).encode(e.witnessesCount)), t.push(new nr().encode(e.policies)), t.push(new yt(new er(), e.inputsCount).encode(e.inputs)), t.push(new yt(new rr(), e.outputsCount).encode(e.outputs)), t.push(new yt(new sr(), e.witnessesCount).encode(e.witnesses)), ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new q().decode(e, n);
    const s = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const i = r;
    [r, n] = new et("u32", { padToWordSize: !0 }).decode(e, n);
    const o = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const a = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const _ = r;
    [r, n] = new et("u16", { padToWordSize: !0 }).decode(e, n);
    const A = r;
    [r, n] = new nr().decode(e, n, o);
    const g = r;
    [r, n] = new yt(new er(), a).decode(e, n);
    const m = r;
    [r, n] = new yt(new rr(), _).decode(e, n);
    const B = r;
    return [r, n] = new yt(new sr(), A).decode(e, n), [
      {
        type: 5,
        blobId: s,
        witnessIndex: i,
        policyTypes: o,
        inputsCount: a,
        outputsCount: _,
        witnessesCount: A,
        policies: g,
        inputs: m,
        outputs: B,
        witnesses: r
      },
      n
    ];
  }
}, hr = class extends dt {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new et("u8", { padToWordSize: !0 }).encode(e.type));
    const { type: r } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new Qc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Dc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Fc().encode(e));
        break;
      }
      case 3: {
        t.push(
          new Mc().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new Oc().encode(e)
        );
        break;
      }
      case 5: {
        t.push(new Lc().encode(e));
        break;
      }
      default:
        throw new R(
          Q.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${r}`
        );
    }
    return ct(t);
  }
  decode(e, t) {
    let r, n = t;
    [r, n] = new et("u8", { padToWordSize: !0 }).decode(e, n);
    const s = r;
    switch (s) {
      case 0:
        return [r, n] = new Qc().decode(e, n), [r, n];
      case 1:
        return [r, n] = new Dc().decode(e, n), [r, n];
      case 2:
        return [r, n] = new Fc().decode(e, n), [r, n];
      case 3:
        return [r, n] = new Mc().decode(e, n), [r, n];
      case 4:
        return [r, n] = new Oc().decode(e, n), [r, n];
      case 5:
        return [r, n] = new Lc().decode(e, n), [r, n];
      default:
        throw new R(
          Q.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${s}`
        );
    }
  }
}, UB = class extends ai {
  constructor() {
    super("UtxoId", {
      transactionId: new q(),
      outputIndex: new et("u8", { padToWordSize: !0 })
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const e0 = /* @__PURE__ */ BigInt(0), ci = /* @__PURE__ */ BigInt(1), lp = /* @__PURE__ */ BigInt(2);
function Zr(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function es(e) {
  if (!Zr(e))
    throw new Error("Uint8Array expected");
}
const Ap = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function An(e) {
  es(e);
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += Ap[e[r]];
  return t;
}
function r0(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Aa(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const or = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function kc(e) {
  if (e >= or._0 && e <= or._9)
    return e - or._0;
  if (e >= or._A && e <= or._F)
    return e - (or._A - 10);
  if (e >= or._a && e <= or._f)
    return e - (or._a - 10);
}
function pn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, r = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(r);
  for (let s = 0, i = 0; s < r; s++, i += 2) {
    const o = kc(e.charCodeAt(i)), a = kc(e.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const _ = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + _ + '" at index ' + i);
    }
    n[s] = o * 16 + a;
  }
  return n;
}
function Wr(e) {
  return Aa(An(e));
}
function pa(e) {
  return es(e), Aa(An(Uint8Array.from(e).reverse()));
}
function fn(e, t) {
  return pn(e.toString(16).padStart(t * 2, "0"));
}
function fa(e, t) {
  return fn(e, t).reverse();
}
function pp(e) {
  return pn(r0(e));
}
function Ge(e, t, r) {
  let n;
  if (typeof t == "string")
    try {
      n = pn(t);
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
function Gn(...e) {
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
function n0(e, t) {
  if (e.length !== t.length)
    return !1;
  let r = 0;
  for (let n = 0; n < e.length; n++)
    r |= e[n] ^ t[n];
  return r === 0;
}
function fp(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function gp(e) {
  let t;
  for (t = 0; e > e0; e >>= ci, t += 1)
    ;
  return t;
}
function wp(e, t) {
  return e >> BigInt(t) & ci;
}
function mp(e, t, r) {
  return e | (r ? ci : e0) << BigInt(t);
}
const ga = (e) => (lp << BigInt(e - 1)) - ci, Yi = (e) => new Uint8Array(e), Pc = (e) => Uint8Array.from(e);
function s0(e, t, r) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof r != "function")
    throw new Error("hmacFn must be a function");
  let n = Yi(e), s = Yi(e), i = 0;
  const o = () => {
    n.fill(1), s.fill(0), i = 0;
  }, a = (...m) => r(s, n, ...m), _ = (m = Yi()) => {
    s = a(Pc([0]), m), n = a(), m.length !== 0 && (s = a(Pc([1]), m), n = a());
  }, A = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let m = 0;
    const B = [];
    for (; m < t; ) {
      n = a();
      const N = n.slice();
      B.push(N), m += n.length;
    }
    return Gn(...B);
  };
  return (m, B) => {
    o(), _(m);
    let N;
    for (; !(N = B(A())); )
      _();
    return o(), N;
  };
}
const yp = {
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
function rs(e, t, r = {}) {
  const n = (s, i, o) => {
    const a = yp[i];
    if (typeof a != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const _ = e[s];
    if (!(o && _ === void 0) && !a(_, e))
      throw new Error(`Invalid param ${String(s)}=${_} (${typeof _}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(r))
    n(s, i, !0);
  return e;
}
const bp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: es,
  bitGet: wp,
  bitLen: gp,
  bitMask: ga,
  bitSet: mp,
  bytesToHex: An,
  bytesToNumberBE: Wr,
  bytesToNumberLE: pa,
  concatBytes: Gn,
  createHmacDrbg: s0,
  ensureBytes: Ge,
  equalBytes: n0,
  hexToBytes: pn,
  hexToNumber: Aa,
  isBytes: Zr,
  numberToBytesBE: fn,
  numberToBytesLE: fa,
  numberToHexUnpadded: r0,
  numberToVarBytesBE: pp,
  utf8ToBytes: fp,
  validateObject: rs
}, Symbol.toStringTag, { value: "Module" }));
var Wi = {}, mo = { exports: {} };
(function(e, t) {
  var r = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Rt < "u" && Rt, n = function() {
    function i() {
      this.fetch = !1, this.DOMException = r.DOMException;
    }
    return i.prototype = r, new i();
  }();
  (function(i) {
    (function(o) {
      var a = typeof i < "u" && i || typeof self < "u" && self || typeof a < "u" && a, _ = {
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
      function A(d) {
        return d && DataView.prototype.isPrototypeOf(d);
      }
      if (_.arrayBuffer)
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
        ], m = ArrayBuffer.isView || function(d) {
          return d && g.indexOf(Object.prototype.toString.call(d)) > -1;
        };
      function B(d) {
        if (typeof d != "string" && (d = String(d)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(d) || d === "")
          throw new TypeError('Invalid character in header field name: "' + d + '"');
        return d.toLowerCase();
      }
      function N(d) {
        return typeof d != "string" && (d = String(d)), d;
      }
      function T(d) {
        var p = {
          next: function() {
            var y = d.shift();
            return { done: y === void 0, value: y };
          }
        };
        return _.iterable && (p[Symbol.iterator] = function() {
          return p;
        }), p;
      }
      function x(d) {
        this.map = {}, d instanceof x ? d.forEach(function(p, y) {
          this.append(y, p);
        }, this) : Array.isArray(d) ? d.forEach(function(p) {
          this.append(p[0], p[1]);
        }, this) : d && Object.getOwnPropertyNames(d).forEach(function(p) {
          this.append(p, d[p]);
        }, this);
      }
      x.prototype.append = function(d, p) {
        d = B(d), p = N(p);
        var y = this.map[d];
        this.map[d] = y ? y + ", " + p : p;
      }, x.prototype.delete = function(d) {
        delete this.map[B(d)];
      }, x.prototype.get = function(d) {
        return d = B(d), this.has(d) ? this.map[d] : null;
      }, x.prototype.has = function(d) {
        return this.map.hasOwnProperty(B(d));
      }, x.prototype.set = function(d, p) {
        this.map[B(d)] = N(p);
      }, x.prototype.forEach = function(d, p) {
        for (var y in this.map)
          this.map.hasOwnProperty(y) && d.call(p, this.map[y], y, this);
      }, x.prototype.keys = function() {
        var d = [];
        return this.forEach(function(p, y) {
          d.push(y);
        }), T(d);
      }, x.prototype.values = function() {
        var d = [];
        return this.forEach(function(p) {
          d.push(p);
        }), T(d);
      }, x.prototype.entries = function() {
        var d = [];
        return this.forEach(function(p, y) {
          d.push([y, p]);
        }), T(d);
      }, _.iterable && (x.prototype[Symbol.iterator] = x.prototype.entries);
      function F(d) {
        if (d.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        d.bodyUsed = !0;
      }
      function O(d) {
        return new Promise(function(p, y) {
          d.onload = function() {
            p(d.result);
          }, d.onerror = function() {
            y(d.error);
          };
        });
      }
      function j(d) {
        var p = new FileReader(), y = O(p);
        return p.readAsArrayBuffer(d), y;
      }
      function P(d) {
        var p = new FileReader(), y = O(p);
        return p.readAsText(d), y;
      }
      function Z(d) {
        for (var p = new Uint8Array(d), y = new Array(p.length), f = 0; f < p.length; f++)
          y[f] = String.fromCharCode(p[f]);
        return y.join("");
      }
      function L(d) {
        if (d.slice)
          return d.slice(0);
        var p = new Uint8Array(d.byteLength);
        return p.set(new Uint8Array(d)), p.buffer;
      }
      function D() {
        return this.bodyUsed = !1, this._initBody = function(d) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = d, d ? typeof d == "string" ? this._bodyText = d : _.blob && Blob.prototype.isPrototypeOf(d) ? this._bodyBlob = d : _.formData && FormData.prototype.isPrototypeOf(d) ? this._bodyFormData = d : _.searchParams && URLSearchParams.prototype.isPrototypeOf(d) ? this._bodyText = d.toString() : _.arrayBuffer && _.blob && A(d) ? (this._bodyArrayBuffer = L(d.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : _.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(d) || m(d)) ? this._bodyArrayBuffer = L(d) : this._bodyText = d = Object.prototype.toString.call(d) : this._bodyText = "", this.headers.get("content-type") || (typeof d == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : _.searchParams && URLSearchParams.prototype.isPrototypeOf(d) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, _.blob && (this.blob = function() {
          var d = F(this);
          if (d)
            return d;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var d = F(this);
            return d || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(j);
        }), this.text = function() {
          var d = F(this);
          if (d)
            return d;
          if (this._bodyBlob)
            return P(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(Z(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, _.formData && (this.formData = function() {
          return this.text().then(H);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var z = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function U(d) {
        var p = d.toUpperCase();
        return z.indexOf(p) > -1 ? p : d;
      }
      function G(d, p) {
        if (!(this instanceof G))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        p = p || {};
        var y = p.body;
        if (d instanceof G) {
          if (d.bodyUsed)
            throw new TypeError("Already read");
          this.url = d.url, this.credentials = d.credentials, p.headers || (this.headers = new x(d.headers)), this.method = d.method, this.mode = d.mode, this.signal = d.signal, !y && d._bodyInit != null && (y = d._bodyInit, d.bodyUsed = !0);
        } else
          this.url = String(d);
        if (this.credentials = p.credentials || this.credentials || "same-origin", (p.headers || !this.headers) && (this.headers = new x(p.headers)), this.method = U(p.method || this.method || "GET"), this.mode = p.mode || this.mode || null, this.signal = p.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && y)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(y), (this.method === "GET" || this.method === "HEAD") && (p.cache === "no-store" || p.cache === "no-cache")) {
          var f = /([?&])_=[^&]*/;
          if (f.test(this.url))
            this.url = this.url.replace(f, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var E = /\?/;
            this.url += (E.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      G.prototype.clone = function() {
        return new G(this, { body: this._bodyInit });
      };
      function H(d) {
        var p = new FormData();
        return d.trim().split("&").forEach(function(y) {
          if (y) {
            var f = y.split("="), E = f.shift().replace(/\+/g, " "), v = f.join("=").replace(/\+/g, " ");
            p.append(decodeURIComponent(E), decodeURIComponent(v));
          }
        }), p;
      }
      function Y(d) {
        var p = new x(), y = d.replace(/\r?\n[\t ]+/g, " ");
        return y.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var E = f.split(":"), v = E.shift().trim();
          if (v) {
            var w = E.join(":").trim();
            p.append(v, w);
          }
        }), p;
      }
      D.call(G.prototype);
      function nt(d, p) {
        if (!(this instanceof nt))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        p || (p = {}), this.type = "default", this.status = p.status === void 0 ? 200 : p.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = p.statusText === void 0 ? "" : "" + p.statusText, this.headers = new x(p.headers), this.url = p.url || "", this._initBody(d);
      }
      D.call(nt.prototype), nt.prototype.clone = function() {
        return new nt(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new x(this.headers),
          url: this.url
        });
      }, nt.error = function() {
        var d = new nt(null, { status: 0, statusText: "" });
        return d.type = "error", d;
      };
      var C = [301, 302, 303, 307, 308];
      nt.redirect = function(d, p) {
        if (C.indexOf(p) === -1)
          throw new RangeError("Invalid status code");
        return new nt(null, { status: p, headers: { location: d } });
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(p, y) {
          this.message = p, this.name = y;
          var f = Error(p);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function u(d, p) {
        return new Promise(function(y, f) {
          var E = new G(d, p);
          if (E.signal && E.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var v = new XMLHttpRequest();
          function w() {
            v.abort();
          }
          v.onload = function() {
            var I = {
              status: v.status,
              statusText: v.statusText,
              headers: Y(v.getAllResponseHeaders() || "")
            };
            I.url = "responseURL" in v ? v.responseURL : I.headers.get("X-Request-URL");
            var J = "response" in v ? v.response : v.responseText;
            setTimeout(function() {
              y(new nt(J, I));
            }, 0);
          }, v.onerror = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, v.ontimeout = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, v.onabort = function() {
            setTimeout(function() {
              f(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function h(I) {
            try {
              return I === "" && a.location.href ? a.location.href : I;
            } catch {
              return I;
            }
          }
          v.open(E.method, h(E.url), !0), E.credentials === "include" ? v.withCredentials = !0 : E.credentials === "omit" && (v.withCredentials = !1), "responseType" in v && (_.blob ? v.responseType = "blob" : _.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (v.responseType = "arraybuffer")), p && typeof p.headers == "object" && !(p.headers instanceof x) ? Object.getOwnPropertyNames(p.headers).forEach(function(I) {
            v.setRequestHeader(I, N(p.headers[I]));
          }) : E.headers.forEach(function(I, J) {
            v.setRequestHeader(J, I);
          }), E.signal && (E.signal.addEventListener("abort", w), v.onreadystatechange = function() {
            v.readyState === 4 && E.signal.removeEventListener("abort", w);
          }), v.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return u.polyfill = !0, a.fetch || (a.fetch = u, a.Headers = x, a.Request = G, a.Response = nt), o.Headers = x, o.Request = G, o.Response = nt, o.fetch = u, o;
    })({});
  })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
  var s = r.fetch ? r : n;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(mo, mo.exports);
var Ip = mo.exports;
function Ep(e) {
  return typeof e == "object" && e !== null;
}
function vp(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Cp = /\r\n|[\n\r]/g;
function yo(e, t) {
  let r = 0, n = 1;
  for (const s of e.body.matchAll(Cp)) {
    if (typeof s.index == "number" || vp(!1), s.index >= t)
      break;
    r = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - r
  };
}
function Bp(e) {
  return i0(
    e.source,
    yo(e.source, e.start)
  );
}
function i0(e, t) {
  const r = e.locationOffset.column - 1, n = "".padStart(r) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? r : 0, _ = t.column + a, A = `${e.name}:${o}:${_}
`, g = n.split(/\r\n|[\n\r]/g), m = g[s];
  if (m.length > 120) {
    const B = Math.floor(_ / 80), N = _ % 80, T = [];
    for (let x = 0; x < m.length; x += 80)
      T.push(m.slice(x, x + 80));
    return A + Uc([
      [`${o} |`, T[0]],
      ...T.slice(1, B + 1).map((x) => ["|", x]),
      ["|", "^".padStart(N)],
      ["|", T[B + 1]]
    ]);
  }
  return A + Uc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, g[s - 1]],
    [`${o} |`, m],
    ["|", "^".padStart(_)],
    [`${o + 1} |`, g[s + 1]]
  ]);
}
function Uc(e) {
  const t = e.filter(([n, s]) => s !== void 0), r = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(r) + (s ? " " + s : "")).join(`
`);
}
function xp(e) {
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
class wa extends Error {
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
    const { nodes: o, source: a, positions: _, path: A, originalError: g, extensions: m } = xp(r);
    super(t), this.name = "GraphQLError", this.path = A ?? void 0, this.originalError = g ?? void 0, this.nodes = zc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const B = zc(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((T) => T.loc).filter((T) => T != null)
    );
    this.source = a ?? (B == null || (s = B[0]) === null || s === void 0 ? void 0 : s.source), this.positions = _ ?? (B == null ? void 0 : B.map((T) => T.start)), this.locations = _ && a ? _.map((T) => yo(a, T)) : B == null ? void 0 : B.map((T) => yo(T.source, T.start));
    const N = Ep(
      g == null ? void 0 : g.extensions
    ) ? g == null ? void 0 : g.extensions : void 0;
    this.extensions = (i = m ?? N) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, wa) : Object.defineProperty(this, "stack", {
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

` + Bp(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        t += `

` + i0(this.source, r);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function zc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function me(e, t, r) {
  return new wa(`Syntax Error: ${r}`, {
    source: e,
    positions: [t]
  });
}
class Rp {
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
class o0 {
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
const a0 = {
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
}, Sp = new Set(Object.keys(a0));
function Gc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Sp.has(t);
}
var tn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(tn || (tn = {}));
var bo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(bo || (bo = {}));
var _t;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(_t || (_t = {}));
function Io(e) {
  return e === 9 || e === 32;
}
function Xn(e) {
  return e >= 48 && e <= 57;
}
function c0(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function u0(e) {
  return c0(e) || e === 95;
}
function Np(e) {
  return c0(e) || Xn(e) || e === 95;
}
function Tp(e) {
  var t;
  let r = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], _ = Qp(a);
    _ !== a.length && (n = (i = n) !== null && i !== void 0 ? i : o, s = o, o !== 0 && _ < r && (r = _));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(r)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Qp(e) {
  let t = 0;
  for (; t < e.length && Io(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Dp(e, t) {
  const r = e.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((N) => N.length === 0 || Io(N.charCodeAt(0))), o = r.endsWith('\\"""'), a = e.endsWith('"') && !o, _ = e.endsWith("\\"), A = a || _, g = (
    // add leading and trailing new lines only if it improves readability
    !s || e.length > 70 || A || i || o
  );
  let m = "";
  const B = s && Io(e.charCodeAt(0));
  return (g && !B || i) && (m += `
`), m += r, (g || A) && (m += `
`), '"""' + m + '"""';
}
var W;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(W || (W = {}));
class Fp {
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
    const r = new o0(W.SOF, 0, 0, 0, 0);
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
    if (t.kind !== W.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const r = Op(this, t.end);
          t.next = r, r.prev = t, t = r;
        }
      while (t.kind === W.COMMENT);
    return t;
  }
}
function Mp(e) {
  return e === W.BANG || e === W.DOLLAR || e === W.AMP || e === W.PAREN_L || e === W.PAREN_R || e === W.SPREAD || e === W.COLON || e === W.EQUALS || e === W.AT || e === W.BRACKET_L || e === W.BRACKET_R || e === W.BRACE_L || e === W.PIPE || e === W.BRACE_R;
}
function yn(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function ui(e, t) {
  return d0(e.charCodeAt(t)) && _0(e.charCodeAt(t + 1));
}
function d0(e) {
  return e >= 55296 && e <= 56319;
}
function _0(e) {
  return e >= 56320 && e <= 57343;
}
function Jr(e, t) {
  const r = e.source.body.codePointAt(t);
  if (r === void 0)
    return W.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function we(e, t, r, n, s) {
  const i = e.line, o = 1 + r - e.lineStart;
  return new o0(t, r, n, i, o, s);
}
function Op(e, t) {
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
        return Lp(e, s);
      case 33:
        return we(e, W.BANG, s, s + 1);
      case 36:
        return we(e, W.DOLLAR, s, s + 1);
      case 38:
        return we(e, W.AMP, s, s + 1);
      case 40:
        return we(e, W.PAREN_L, s, s + 1);
      case 41:
        return we(e, W.PAREN_R, s, s + 1);
      case 46:
        if (r.charCodeAt(s + 1) === 46 && r.charCodeAt(s + 2) === 46)
          return we(e, W.SPREAD, s, s + 3);
        break;
      case 58:
        return we(e, W.COLON, s, s + 1);
      case 61:
        return we(e, W.EQUALS, s, s + 1);
      case 64:
        return we(e, W.AT, s, s + 1);
      case 91:
        return we(e, W.BRACKET_L, s, s + 1);
      case 93:
        return we(e, W.BRACKET_R, s, s + 1);
      case 123:
        return we(e, W.BRACE_L, s, s + 1);
      case 124:
        return we(e, W.PIPE, s, s + 1);
      case 125:
        return we(e, W.BRACE_R, s, s + 1);
      case 34:
        return r.charCodeAt(s + 1) === 34 && r.charCodeAt(s + 2) === 34 ? Xp(e, s) : Pp(e, s);
    }
    if (Xn(i) || i === 45)
      return kp(e, s, i);
    if (u0(i))
      return Hp(e, s);
    throw me(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : yn(i) || ui(r, s) ? `Unexpected character: ${Jr(e, s)}.` : `Invalid character: ${Jr(e, s)}.`
    );
  }
  return we(e, W.EOF, n, n);
}
function Lp(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (yn(i))
      ++s;
    else if (ui(r, s))
      s += 2;
    else
      break;
  }
  return we(
    e,
    W.COMMENT,
    t,
    s,
    r.slice(t + 1, s)
  );
}
function kp(e, t, r) {
  const n = e.source.body;
  let s = t, i = r, o = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), Xn(i))
      throw me(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Jr(
          e,
          s
        )}.`
      );
  } else
    s = Vi(e, s, i), i = n.charCodeAt(s);
  if (i === 46 && (o = !0, i = n.charCodeAt(++s), s = Vi(e, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = Vi(e, s, i), i = n.charCodeAt(s)), i === 46 || u0(i))
    throw me(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Jr(
        e,
        s
      )}.`
    );
  return we(
    e,
    o ? W.FLOAT : W.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function Vi(e, t, r) {
  if (!Xn(r))
    throw me(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Jr(
        e,
        t
      )}.`
    );
  const n = e.source.body;
  let s = t + 1;
  for (; Xn(n.charCodeAt(s)); )
    ++s;
  return s;
}
function Pp(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1, i = s, o = "";
  for (; s < n; ) {
    const a = r.charCodeAt(s);
    if (a === 34)
      return o += r.slice(i, s), we(e, W.STRING, t, s + 1, o);
    if (a === 92) {
      o += r.slice(i, s);
      const _ = r.charCodeAt(s + 1) === 117 ? r.charCodeAt(s + 2) === 123 ? Up(e, s) : zp(e, s) : Gp(e, s);
      o += _.value, s += _.size, i = s;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (yn(a))
      ++s;
    else if (ui(r, s))
      s += 2;
    else
      throw me(
        e.source,
        s,
        `Invalid character within String: ${Jr(
          e,
          s
        )}.`
      );
  }
  throw me(e.source, s, "Unterminated string.");
}
function Up(e, t) {
  const r = e.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = r.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !yn(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Dn(i), n < 0)
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
function zp(e, t) {
  const r = e.source.body, n = Xc(r, t + 2);
  if (yn(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (d0(n) && r.charCodeAt(t + 6) === 92 && r.charCodeAt(t + 7) === 117) {
    const s = Xc(r, t + 8);
    if (_0(s))
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
function Xc(e, t) {
  return Dn(e.charCodeAt(t)) << 12 | Dn(e.charCodeAt(t + 1)) << 8 | Dn(e.charCodeAt(t + 2)) << 4 | Dn(e.charCodeAt(t + 3));
}
function Dn(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Gp(e, t) {
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
function Xp(e, t) {
  const r = e.source.body, n = r.length;
  let s = e.lineStart, i = t + 3, o = i, a = "";
  const _ = [];
  for (; i < n; ) {
    const A = r.charCodeAt(i);
    if (A === 34 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34) {
      a += r.slice(o, i), _.push(a);
      const g = we(
        e,
        W.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Tp(_).join(`
`)
      );
      return e.line += _.length - 1, e.lineStart = s, g;
    }
    if (A === 92 && r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 && r.charCodeAt(i + 3) === 34) {
      a += r.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (A === 10 || A === 13) {
      a += r.slice(o, i), _.push(a), A === 13 && r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, a = "", o = i, s = i;
      continue;
    }
    if (yn(A))
      ++i;
    else if (ui(r, i))
      i += 2;
    else
      throw me(
        e.source,
        i,
        `Invalid character within String: ${Jr(
          e,
          i
        )}.`
      );
  }
  throw me(e.source, i, "Unterminated string.");
}
function Hp(e, t) {
  const r = e.source.body, n = r.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = r.charCodeAt(s);
    if (Np(i))
      ++s;
    else
      break;
  }
  return we(
    e,
    W.NAME,
    t,
    s,
    r.slice(t, s)
  );
}
function Rs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Yp = 10, h0 = 2;
function ma(e) {
  return di(e, []);
}
function di(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Wp(e, t);
    default:
      return String(e);
  }
}
function Wp(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const r = [...t, e];
  if (Vp(e)) {
    const n = e.toJSON();
    if (n !== e)
      return typeof n == "string" ? n : di(n, r);
  } else if (Array.isArray(e))
    return Jp(e, r);
  return Zp(e, r);
}
function Vp(e) {
  return typeof e.toJSON == "function";
}
function Zp(e, t) {
  const r = Object.entries(e);
  return r.length === 0 ? "{}" : t.length > h0 ? "[" + jp(e) + "]" : "{ " + r.map(
    ([s, i]) => s + ": " + di(i, t)
  ).join(", ") + " }";
}
function Jp(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > h0)
    return "[Array]";
  const r = Math.min(Yp, e.length), n = e.length - r, s = [];
  for (let i = 0; i < r; ++i)
    s.push(di(e[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function jp(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const r = e.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return t;
}
const qp = globalThis.process && // eslint-disable-next-line no-undef
!0, $p = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  qp ? function(t, r) {
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
        const o = ma(t);
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
class l0 {
  constructor(t, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Rs(!1, `Body must be a string. Received: ${ma(t)}.`), this.body = t, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || Rs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Rs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Kp(e) {
  return $p(e, l0);
}
function A0(e, t) {
  return new ns(e, t).parseDocument();
}
function tf(e, t) {
  const r = new ns(e, t);
  r.expectToken(W.SOF);
  const n = r.parseValueLiteral(!1);
  return r.expectToken(W.EOF), n;
}
function ef(e, t) {
  const r = new ns(e, t);
  r.expectToken(W.SOF);
  const n = r.parseConstValueLiteral();
  return r.expectToken(W.EOF), n;
}
function rf(e, t) {
  const r = new ns(e, t);
  r.expectToken(W.SOF);
  const n = r.parseTypeReference();
  return r.expectToken(W.EOF), n;
}
class ns {
  constructor(t, r = {}) {
    const n = Kp(t) ? t : new l0(t);
    this._lexer = new Fp(n), this._options = r, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(W.NAME);
    return this.node(t, {
      kind: _t.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: _t.DOCUMENT,
      definitions: this.many(
        W.SOF,
        this.parseDefinition,
        W.EOF
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
    if (this.peek(W.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), r = t ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === W.NAME) {
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
    if (this.peek(W.BRACE_L))
      return this.node(t, {
        kind: _t.OPERATION_DEFINITION,
        operation: tn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(W.NAME) && (n = this.parseName()), this.node(t, {
      kind: _t.OPERATION_DEFINITION,
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
    const t = this.expectToken(W.NAME);
    switch (t.value) {
      case "query":
        return tn.QUERY;
      case "mutation":
        return tn.MUTATION;
      case "subscription":
        return tn.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      W.PAREN_L,
      this.parseVariableDefinition,
      W.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: _t.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(W.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(W.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(W.DOLLAR), this.node(t, {
      kind: _t.VARIABLE,
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
      kind: _t.SELECTION_SET,
      selections: this.many(
        W.BRACE_L,
        this.parseSelection,
        W.BRACE_R
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
    return this.peek(W.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, r = this.parseName();
    let n, s;
    return this.expectOptionalToken(W.COLON) ? (n = r, s = this.parseName()) : s = r, this.node(t, {
      kind: _t.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(W.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const r = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(W.PAREN_L, r, W.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(W.COLON), this.node(r, {
      kind: _t.ARGUMENT,
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
    this.expectToken(W.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(W.NAME) ? this.node(t, {
      kind: _t.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: _t.INLINE_FRAGMENT,
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
      kind: _t.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: _t.FRAGMENT_DEFINITION,
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
      case W.BRACKET_L:
        return this.parseList(t);
      case W.BRACE_L:
        return this.parseObject(t);
      case W.INT:
        return this.advanceLexer(), this.node(r, {
          kind: _t.INT,
          value: r.value
        });
      case W.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: _t.FLOAT,
          value: r.value
        });
      case W.STRING:
      case W.BLOCK_STRING:
        return this.parseStringLiteral();
      case W.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: _t.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: _t.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: _t.NULL
            });
          default:
            return this.node(r, {
              kind: _t.ENUM,
              value: r.value
            });
        }
      case W.DOLLAR:
        if (t)
          if (this.expectToken(W.DOLLAR), this._lexer.token.kind === W.NAME) {
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
      kind: _t.STRING,
      value: t.value,
      block: t.kind === W.BLOCK_STRING
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
      kind: _t.LIST,
      values: this.any(W.BRACKET_L, r, W.BRACKET_R)
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
      kind: _t.OBJECT,
      fields: this.any(W.BRACE_L, r, W.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(W.COLON), this.node(r, {
      kind: _t.OBJECT_FIELD,
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
    for (; this.peek(W.AT); )
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
    return this.expectToken(W.AT), this.node(r, {
      kind: _t.DIRECTIVE,
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
    if (this.expectOptionalToken(W.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(W.BRACKET_R), r = this.node(t, {
        kind: _t.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(W.BANG) ? this.node(t, {
      kind: _t.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: _t.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(W.STRING) || this.peek(W.BLOCK_STRING);
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
      W.BRACE_L,
      this.parseOperationTypeDefinition,
      W.BRACE_R
    );
    return this.node(t, {
      kind: _t.SCHEMA_DEFINITION,
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
    this.expectToken(W.COLON);
    const n = this.parseNamedType();
    return this.node(t, {
      kind: _t.OPERATION_TYPE_DEFINITION,
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
      kind: _t.SCALAR_TYPE_DEFINITION,
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
      kind: _t.OBJECT_TYPE_DEFINITION,
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(W.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      W.BRACE_L,
      this.parseFieldDefinition,
      W.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(W.COLON);
    const i = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(t, {
      kind: _t.FIELD_DEFINITION,
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
      W.PAREN_L,
      this.parseInputValueDef,
      W.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(W.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(W.EQUALS) && (i = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(t, {
      kind: _t.INPUT_VALUE_DEFINITION,
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
      kind: _t.INTERFACE_TYPE_DEFINITION,
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
      kind: _t.UNION_TYPE_DEFINITION,
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
    return this.expectOptionalToken(W.EQUALS) ? this.delimitedMany(W.PIPE, this.parseNamedType) : [];
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
      kind: _t.ENUM_TYPE_DEFINITION,
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
      W.BRACE_L,
      this.parseEnumValueDefinition,
      W.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: _t.ENUM_VALUE_DEFINITION,
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
        `${ws(
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
      kind: _t.INPUT_OBJECT_TYPE_DEFINITION,
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
      W.BRACE_L,
      this.parseInputValueDef,
      W.BRACE_R
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
    if (t.kind === W.NAME)
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
      W.BRACE_L,
      this.parseOperationTypeDefinition,
      W.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: _t.SCHEMA_EXTENSION,
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
      kind: _t.SCALAR_TYPE_EXTENSION,
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
      kind: _t.OBJECT_TYPE_EXTENSION,
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
      kind: _t.INTERFACE_TYPE_EXTENSION,
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
      kind: _t.UNION_TYPE_EXTENSION,
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
      kind: _t.ENUM_TYPE_EXTENSION,
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
      kind: _t.INPUT_OBJECT_TYPE_EXTENSION,
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
    this.expectKeyword("directive"), this.expectToken(W.AT);
    const n = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(t, {
      kind: _t.DIRECTIVE_DEFINITION,
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
    return this.delimitedMany(W.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(bo, r.value))
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
    return this._options.noLocation !== !0 && (r.loc = new Rp(
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
      `Expected ${p0(t)}, found ${ws(r)}.`
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
    if (r.kind === W.NAME && r.value === t)
      this.advanceLexer();
    else
      throw me(
        this._lexer.source,
        r.start,
        `Expected "${t}", found ${ws(r)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const r = this._lexer.token;
    return r.kind === W.NAME && r.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const r = t ?? this._lexer.token;
    return me(
      this._lexer.source,
      r.start,
      `Unexpected ${ws(r)}.`
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
    if (t !== void 0 && r.kind !== W.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw me(
        this._lexer.source,
        r.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ws(e) {
  const t = e.value;
  return p0(e.kind) + (t != null ? ` "${t}"` : "");
}
function p0(e) {
  return Mp(e) ? `"${e}"` : e;
}
const nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: ns,
  parse: A0,
  parseConstValue: ef,
  parseType: rf,
  parseValue: tf
}, Symbol.toStringTag, { value: "Module" })), sf = /* @__PURE__ */ Go(nf);
function of(e) {
  return `"${e.replace(af, cf)}"`;
}
const af = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function cf(e) {
  return uf[e.charCodeAt(0)];
}
const uf = [
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
], df = Object.freeze({});
function _f(e, t, r = a0) {
  const n = /* @__PURE__ */ new Map();
  for (const O of Object.values(_t))
    n.set(O, hf(t, O));
  let s, i = Array.isArray(e), o = [e], a = -1, _ = [], A = e, g, m;
  const B = [], N = [];
  do {
    a++;
    const O = a === o.length, j = O && _.length !== 0;
    if (O) {
      if (g = N.length === 0 ? void 0 : B[B.length - 1], A = m, m = N.pop(), j)
        if (i) {
          A = A.slice();
          let Z = 0;
          for (const [L, D] of _) {
            const z = L - Z;
            D === null ? (A.splice(z, 1), Z++) : A[z] = D;
          }
        } else {
          A = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(A)
          );
          for (const [Z, L] of _)
            A[Z] = L;
        }
      a = s.index, o = s.keys, _ = s.edits, i = s.inArray, s = s.prev;
    } else if (m) {
      if (g = i ? a : o[a], A = m[g], A == null)
        continue;
      B.push(g);
    }
    let P;
    if (!Array.isArray(A)) {
      var T, x;
      Gc(A) || Rs(!1, `Invalid AST Node: ${ma(A)}.`);
      const Z = O ? (T = n.get(A.kind)) === null || T === void 0 ? void 0 : T.leave : (x = n.get(A.kind)) === null || x === void 0 ? void 0 : x.enter;
      if (P = Z == null ? void 0 : Z.call(t, A, g, m, B, N), P === df)
        break;
      if (P === !1) {
        if (!O) {
          B.pop();
          continue;
        }
      } else if (P !== void 0 && (_.push([g, P]), !O))
        if (Gc(P))
          A = P;
        else {
          B.pop();
          continue;
        }
    }
    if (P === void 0 && j && _.push([g, A]), O)
      B.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: _,
        prev: s
      }, i = Array.isArray(A), o = i ? A : (F = r[A.kind]) !== null && F !== void 0 ? F : [], a = -1, _ = [], m && N.push(m), m = A;
    }
  } while (s !== void 0);
  return _.length !== 0 ? _[_.length - 1][1] : e;
}
function hf(e, t) {
  const r = e[t];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function f0(e) {
  return _f(e, Af);
}
const lf = 80, Af = {
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
      const t = bt("(", at(e.variableDefinitions, ", "), ")"), r = at(
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
    leave: ({ variable: e, type: t, defaultValue: r, directives: n }) => e + ": " + t + bt(" = ", r) + bt(" ", at(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Pe(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: r, directives: n, selectionSet: s }) {
      const i = bt("", e, ": ") + t;
      let o = i + bt("(", at(r, ", "), ")");
      return o.length > lf && (o = i + bt(`(
`, Ss(at(r, `
`)), `
)`)), at([o, at(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + bt(" ", at(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: r }) => at(
      [
        "...",
        bt("on ", e),
        at(t, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: r, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${bt("(", at(r, ", "), ")")} on ${t} ${bt("", at(n, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? Dp(e) : of(e)
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
    leave: ({ name: e, arguments: t }) => "@" + e + bt("(", at(t, ", "), ")")
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
    leave: ({ description: e, directives: t, operationTypes: r }) => bt("", e, `
`) + at(["schema", at(t, " "), Pe(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: r }) => bt("", e, `
`) + at(["scalar", t, at(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => bt("", e, `
`) + at(
      [
        "type",
        t,
        bt("implements ", at(r, " & ")),
        at(n, " "),
        Pe(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: r, type: n, directives: s }) => bt("", e, `
`) + t + (Hc(r) ? bt(`(
`, Ss(at(r, `
`)), `
)`) : bt("(", at(r, ", "), ")")) + ": " + n + bt(" ", at(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: r, defaultValue: n, directives: s }) => bt("", e, `
`) + at(
      [t + ": " + r, bt("= ", n), at(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: r, directives: n, fields: s }) => bt("", e, `
`) + at(
      [
        "interface",
        t,
        bt("implements ", at(r, " & ")),
        at(n, " "),
        Pe(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, types: n }) => bt("", e, `
`) + at(
      ["union", t, at(r, " "), bt("= ", at(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, values: n }) => bt("", e, `
`) + at(["enum", t, at(r, " "), Pe(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: r }) => bt("", e, `
`) + at([t, at(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: r, fields: n }) => bt("", e, `
`) + at(["input", t, at(r, " "), Pe(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: r, repeatable: n, locations: s }) => bt("", e, `
`) + "directive @" + t + (Hc(r) ? bt(`(
`, Ss(at(r, `
`)), `
)`) : bt("(", at(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + at(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => at(
      ["extend schema", at(e, " "), Pe(t)],
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
        bt("implements ", at(t, " & ")),
        at(r, " "),
        Pe(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: r, fields: n }) => at(
      [
        "extend interface",
        e,
        bt("implements ", at(t, " & ")),
        at(r, " "),
        Pe(n)
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
        bt("= ", at(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: r }) => at(["extend enum", e, at(t, " "), Pe(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: r }) => at(["extend input", e, at(t, " "), Pe(r)], " ")
  }
};
function at(e, t = "") {
  var r;
  return (r = e == null ? void 0 : e.filter((n) => n).join(t)) !== null && r !== void 0 ? r : "";
}
function Pe(e) {
  return bt(`{
`, Ss(at(e, `
`)), `
}`);
}
function bt(e, t, r = "") {
  return t != null && t !== "" ? e + t + r : "";
}
function Ss(e) {
  return bt("  ", e.replace(/\n/g, `
  `));
}
function Hc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((r) => r.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const pf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: f0
}, Symbol.toStringTag, { value: "Module" })), ff = /* @__PURE__ */ Go(pf);
var ya = {}, _i = {}, g0 = function(t) {
  var r = t.uri, n = t.name, s = t.type;
  this.uri = r, this.name = n, this.type = s;
}, gf = g0, w0 = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof gf;
}, wf = w0, mf = function e(t, r, n) {
  r === void 0 && (r = ""), n === void 0 && (n = wf);
  var s, i = /* @__PURE__ */ new Map();
  function o(g, m) {
    var B = i.get(m);
    B ? B.push.apply(B, g) : i.set(m, g);
  }
  if (n(t))
    s = null, o([r], t);
  else {
    var a = r ? r + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(g, m) {
        return o(["" + a + m], g), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(g, m) {
        var B = e(g, "" + a + m, n);
        return B.files.forEach(o), B.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var _ in t) {
        var A = e(t[_], "" + a + _, n);
        A.files.forEach(o), s[_] = A.clone;
      }
    } else s = t;
  }
  return {
    clone: s,
    files: i
  };
};
_i.ReactNativeFile = g0;
_i.extractFiles = mf;
_i.isExtractableFile = w0;
var yf = typeof self == "object" ? self.FormData : window.FormData, ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.defaultJsonSerializer = void 0;
ss.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var bf = Rt && Rt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ya, "__esModule", { value: !0 });
var m0 = _i, If = bf(yf), Ef = ss, vf = function(e) {
  return m0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Cf(e, t, r, n) {
  n === void 0 && (n = Ef.defaultJsonSerializer);
  var s = m0.extractFiles({ query: e, variables: t, operationName: r }, "", vf), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return n.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var a = e.reduce(function(B, N, T) {
      return B.push({ query: N, variables: t ? t[T] : void 0 }), B;
    }, []);
    return n.stringify(a);
  }
  var _ = typeof FormData > "u" ? If.default : FormData, A = new _();
  A.append("operations", n.stringify(i));
  var g = {}, m = 0;
  return o.forEach(function(B) {
    g[++m] = B;
  }), A.append("map", n.stringify(g)), m = 0, o.forEach(function(B, N) {
    A.append("" + ++m, N);
  }), A;
}
ya.default = Cf;
var Ne = {};
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.parseBatchRequestsExtendedArgs = Ne.parseRawRequestExtendedArgs = Ne.parseRequestExtendedArgs = Ne.parseBatchRequestArgs = Ne.parseRawRequestArgs = Ne.parseRequestArgs = void 0;
function Bf(e, t, r) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Ne.parseRequestArgs = Bf;
function xf(e, t, r) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: r,
    signal: void 0
  };
}
Ne.parseRawRequestArgs = xf;
function Rf(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Ne.parseBatchRequestArgs = Rf;
function Sf(e, t, r, n) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Ne.parseRequestExtendedArgs = Sf;
function Nf(e, t, r, n) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: r,
    requestHeaders: n,
    signal: void 0
  };
}
Ne.parseRawRequestExtendedArgs = Nf;
function Tf(e, t, r) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: r,
    signal: void 0
  };
}
Ne.parseBatchRequestsExtendedArgs = Tf;
var is = {}, Qf = Rt && Rt.__extends || /* @__PURE__ */ function() {
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
Object.defineProperty(is, "__esModule", { value: !0 });
is.ClientError = void 0;
var Df = (
  /** @class */
  function(e) {
    Qf(t, e);
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
is.ClientError = Df;
var Rn = {}, Yc;
function Ff() {
  if (Yc) return Rn;
  Yc = 1;
  var e = Rt && Rt.__assign || function() {
    return e = Object.assign || function(L) {
      for (var D, z = 1, U = arguments.length; z < U; z++) {
        D = arguments[z];
        for (var G in D) Object.prototype.hasOwnProperty.call(D, G) && (L[G] = D[G]);
      }
      return L;
    }, e.apply(this, arguments);
  }, t = Rt && Rt.__awaiter || function(L, D, z, U) {
    function G(H) {
      return H instanceof z ? H : new z(function(Y) {
        Y(H);
      });
    }
    return new (z || (z = Promise))(function(H, Y) {
      function nt(d) {
        try {
          u(U.next(d));
        } catch (p) {
          Y(p);
        }
      }
      function C(d) {
        try {
          u(U.throw(d));
        } catch (p) {
          Y(p);
        }
      }
      function u(d) {
        d.done ? H(d.value) : G(d.value).then(nt, C);
      }
      u((U = U.apply(L, D || [])).next());
    });
  }, r = Rt && Rt.__generator || function(L, D) {
    var z = { label: 0, sent: function() {
      if (H[0] & 1) throw H[1];
      return H[1];
    }, trys: [], ops: [] }, U, G, H, Y;
    return Y = { next: nt(0), throw: nt(1), return: nt(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
      return this;
    }), Y;
    function nt(u) {
      return function(d) {
        return C([u, d]);
      };
    }
    function C(u) {
      if (U) throw new TypeError("Generator is already executing.");
      for (; z; ) try {
        if (U = 1, G && (H = u[0] & 2 ? G.return : u[0] ? G.throw || ((H = G.return) && H.call(G), 0) : G.next) && !(H = H.call(G, u[1])).done) return H;
        switch (G = 0, H && (u = [u[0] & 2, H.value]), u[0]) {
          case 0:
          case 1:
            H = u;
            break;
          case 4:
            return z.label++, { value: u[1], done: !1 };
          case 5:
            z.label++, G = u[1], u = [0];
            continue;
          case 7:
            u = z.ops.pop(), z.trys.pop();
            continue;
          default:
            if (H = z.trys, !(H = H.length > 0 && H[H.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              z = 0;
              continue;
            }
            if (u[0] === 3 && (!H || u[1] > H[0] && u[1] < H[3])) {
              z.label = u[1];
              break;
            }
            if (u[0] === 6 && z.label < H[1]) {
              z.label = H[1], H = u;
              break;
            }
            if (H && z.label < H[2]) {
              z.label = H[2], z.ops.push(u);
              break;
            }
            H[2] && z.ops.pop(), z.trys.pop();
            continue;
        }
        u = D.call(L, z);
      } catch (d) {
        u = [6, d], G = 0;
      } finally {
        U = H = 0;
      }
      if (u[0] & 5) throw u[1];
      return { value: u[0] ? u[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.GraphQLWebSocketClient = void 0;
  var n = is, s = y0(), i = "connection_init", o = "connection_ack", a = "ping", _ = "pong", A = "subscribe", g = "next", m = "error", B = "complete", N = (
    /** @class */
    function() {
      function L(D, z, U) {
        this._type = D, this._payload = z, this._id = U;
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
          var D = { type: this.type };
          return this.id != null && this.id != null && (D.id = this.id), this.payload != null && this.payload != null && (D.payload = this.payload), JSON.stringify(D);
        },
        enumerable: !1,
        configurable: !0
      }), L.parse = function(D, z) {
        var U = JSON.parse(D), G = U.type, H = U.payload, Y = U.id;
        return new L(G, z(H), Y);
      }, L;
    }()
  ), T = (
    /** @class */
    function() {
      function L(D, z) {
        var U = this, G = z.onInit, H = z.onAcknowledged, Y = z.onPing, nt = z.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = D, D.onopen = function(C) {
          return t(U, void 0, void 0, function() {
            var u, d, p, y;
            return r(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, d = (u = D).send, p = F, G ? [4, G()] : [3, 2];
                case 1:
                  return y = f.sent(), [3, 3];
                case 2:
                  y = null, f.label = 3;
                case 3:
                  return d.apply(u, [p.apply(void 0, [y]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, D.onclose = function(C) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, D.onerror = function(C) {
          console.error(C);
        }, D.onmessage = function(C) {
          try {
            var u = x(C.data);
            switch (u.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, H && H(u.payload));
                return;
              }
              case a: {
                Y ? Y(u.payload).then(function(E) {
                  return D.send(j(E).text);
                }) : D.send(j(null).text);
                return;
              }
              case _: {
                nt && nt(u.payload);
                return;
              }
            }
            if (!U.socketState.acknowledged || u.id === void 0 || u.id === null || !U.socketState.subscriptions[u.id])
              return;
            var d = U.socketState.subscriptions[u.id], p = d.query, y = d.variables, f = d.subscriber;
            switch (u.type) {
              case g: {
                !u.payload.errors && u.payload.data && f.next && f.next(u.payload.data), u.payload.errors && f.error && f.error(new n.ClientError(e(e({}, u.payload), { status: 200 }), { query: p, variables: y }));
                return;
              }
              case m: {
                f.error && f.error(new n.ClientError({ errors: u.payload, status: 200 }, { query: p, variables: y }));
                return;
              }
              case B: {
                f.complete && f.complete(), delete U.socketState.subscriptions[u.id];
                return;
              }
            }
          } catch (E) {
            console.error(E), D.close(1006);
          }
          D.close(4400, "Unknown graphql-ws message.");
        };
      }
      return L.prototype.makeSubscribe = function(D, z, U, G) {
        var H = this, Y = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[Y] = { query: D, variables: U, subscriber: G }, this.socket.send(P(Y, { query: D, operationName: z, variables: U }).text), function() {
          H.socket.send(Z(Y).text), delete H.socketState.subscriptions[Y];
        };
      }, L.prototype.rawRequest = function(D, z) {
        var U = this;
        return new Promise(function(G, H) {
          var Y;
          U.rawSubscribe(D, {
            next: function(nt, C) {
              return Y = { data: nt, extensions: C };
            },
            error: H,
            complete: function() {
              return G(Y);
            }
          }, z);
        });
      }, L.prototype.request = function(D, z) {
        var U = this;
        return new Promise(function(G, H) {
          var Y;
          U.subscribe(D, {
            next: function(nt) {
              return Y = nt;
            },
            error: H,
            complete: function() {
              return G(Y);
            }
          }, z);
        });
      }, L.prototype.subscribe = function(D, z, U) {
        var G = s.resolveRequestDocument(D), H = G.query, Y = G.operationName;
        return this.makeSubscribe(H, Y, U, z);
      }, L.prototype.rawSubscribe = function(D, z, U) {
        return this.makeSubscribe(D, void 0, U, z);
      }, L.prototype.ping = function(D) {
        this.socket.send(O(D).text);
      }, L.prototype.close = function() {
        this.socket.close(1e3);
      }, L.PROTOCOL = "graphql-transport-ws", L;
    }()
  );
  Rn.GraphQLWebSocketClient = T;
  function x(L, D) {
    D === void 0 && (D = function(U) {
      return U;
    });
    var z = N.parse(L, D);
    return z;
  }
  function F(L) {
    return new N(i, L);
  }
  function O(L) {
    return new N(a, L, void 0);
  }
  function j(L) {
    return new N(_, L, void 0);
  }
  function P(L, D) {
    return new N(A, D, L);
  }
  function Z(L) {
    return new N(B, void 0, L);
  }
  return Rn;
}
var Wc;
function y0() {
  return Wc || (Wc = 1, function(e) {
    var t = Rt && Rt.__assign || function() {
      return t = Object.assign || function(f) {
        for (var E, v = 1, w = arguments.length; v < w; v++) {
          E = arguments[v];
          for (var h in E) Object.prototype.hasOwnProperty.call(E, h) && (f[h] = E[h]);
        }
        return f;
      }, t.apply(this, arguments);
    }, r = Rt && Rt.__createBinding || (Object.create ? function(f, E, v, w) {
      w === void 0 && (w = v), Object.defineProperty(f, w, { enumerable: !0, get: function() {
        return E[v];
      } });
    } : function(f, E, v, w) {
      w === void 0 && (w = v), f[w] = E[v];
    }), n = Rt && Rt.__setModuleDefault || (Object.create ? function(f, E) {
      Object.defineProperty(f, "default", { enumerable: !0, value: E });
    } : function(f, E) {
      f.default = E;
    }), s = Rt && Rt.__importStar || function(f) {
      if (f && f.__esModule) return f;
      var E = {};
      if (f != null) for (var v in f) v !== "default" && Object.prototype.hasOwnProperty.call(f, v) && r(E, f, v);
      return n(E, f), E;
    }, i = Rt && Rt.__awaiter || function(f, E, v, w) {
      function h(I) {
        return I instanceof v ? I : new v(function(J) {
          J(I);
        });
      }
      return new (v || (v = Promise))(function(I, J) {
        function V(it) {
          try {
            tt(w.next(it));
          } catch (ot) {
            J(ot);
          }
        }
        function rt(it) {
          try {
            tt(w.throw(it));
          } catch (ot) {
            J(ot);
          }
        }
        function tt(it) {
          it.done ? I(it.value) : h(it.value).then(V, rt);
        }
        tt((w = w.apply(f, E || [])).next());
      });
    }, o = Rt && Rt.__generator || function(f, E) {
      var v = { label: 0, sent: function() {
        if (I[0] & 1) throw I[1];
        return I[1];
      }, trys: [], ops: [] }, w, h, I, J;
      return J = { next: V(0), throw: V(1), return: V(2) }, typeof Symbol == "function" && (J[Symbol.iterator] = function() {
        return this;
      }), J;
      function V(tt) {
        return function(it) {
          return rt([tt, it]);
        };
      }
      function rt(tt) {
        if (w) throw new TypeError("Generator is already executing.");
        for (; v; ) try {
          if (w = 1, h && (I = tt[0] & 2 ? h.return : tt[0] ? h.throw || ((I = h.return) && I.call(h), 0) : h.next) && !(I = I.call(h, tt[1])).done) return I;
          switch (h = 0, I && (tt = [tt[0] & 2, I.value]), tt[0]) {
            case 0:
            case 1:
              I = tt;
              break;
            case 4:
              return v.label++, { value: tt[1], done: !1 };
            case 5:
              v.label++, h = tt[1], tt = [0];
              continue;
            case 7:
              tt = v.ops.pop(), v.trys.pop();
              continue;
            default:
              if (I = v.trys, !(I = I.length > 0 && I[I.length - 1]) && (tt[0] === 6 || tt[0] === 2)) {
                v = 0;
                continue;
              }
              if (tt[0] === 3 && (!I || tt[1] > I[0] && tt[1] < I[3])) {
                v.label = tt[1];
                break;
              }
              if (tt[0] === 6 && v.label < I[1]) {
                v.label = I[1], I = tt;
                break;
              }
              if (I && v.label < I[2]) {
                v.label = I[2], v.ops.push(tt);
                break;
              }
              I[2] && v.ops.pop(), v.trys.pop();
              continue;
          }
          tt = E.call(f, v);
        } catch (it) {
          tt = [6, it], h = 0;
        } finally {
          w = I = 0;
        }
        if (tt[0] & 5) throw tt[1];
        return { value: tt[0] ? tt[1] : void 0, done: !0 };
      }
    }, a = Rt && Rt.__rest || function(f, E) {
      var v = {};
      for (var w in f) Object.prototype.hasOwnProperty.call(f, w) && E.indexOf(w) < 0 && (v[w] = f[w]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var h = 0, w = Object.getOwnPropertySymbols(f); h < w.length; h++)
          E.indexOf(w[h]) < 0 && Object.prototype.propertyIsEnumerable.call(f, w[h]) && (v[w[h]] = f[w[h]]);
      return v;
    }, _ = Rt && Rt.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var A = s(Ip), g = A, m = sf, B = ff, N = _(ya), T = ss, x = Ne, F = is;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return F.ClientError;
    } });
    var O = function(f) {
      var E = {};
      return f && (typeof Headers < "u" && f instanceof Headers || g && g.Headers && f instanceof g.Headers ? E = p(f) : Array.isArray(f) ? f.forEach(function(v) {
        var w = v[0], h = v[1];
        E[w] = h;
      }) : E = f), E;
    }, j = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, P = function(f) {
      var E = f.query, v = f.variables, w = f.operationName, h = f.jsonSerializer;
      if (!Array.isArray(E)) {
        var I = ["query=" + encodeURIComponent(j(E))];
        return v && I.push("variables=" + encodeURIComponent(h.stringify(v))), w && I.push("operationName=" + encodeURIComponent(w)), I.join("&");
      }
      if (typeof v < "u" && !Array.isArray(v))
        throw new Error("Cannot create query with given variable type, array expected");
      var J = E.reduce(function(V, rt, tt) {
        return V.push({
          query: j(rt),
          variables: v ? h.stringify(v[tt]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(h.stringify(J));
    }, Z = function(f) {
      var E = f.url, v = f.query, w = f.variables, h = f.operationName, I = f.headers, J = f.fetch, V = f.fetchOptions, rt = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var tt, it;
        return o(this, function(ot) {
          switch (ot.label) {
            case 0:
              return tt = N.default(v, w, h, V.jsonSerializer), it = t({ method: "POST", headers: t(t({}, typeof tt == "string" ? { "Content-Type": "application/json" } : {}), I), body: tt }, V), rt ? [4, Promise.resolve(rt(it))] : [3, 2];
            case 1:
              it = ot.sent(), ot.label = 2;
            case 2:
              return [4, J(E, it)];
            case 3:
              return [2, ot.sent()];
          }
        });
      });
    }, L = function(f) {
      var E = f.url, v = f.query, w = f.variables, h = f.operationName, I = f.headers, J = f.fetch, V = f.fetchOptions, rt = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var tt, it;
        return o(this, function(ot) {
          switch (ot.label) {
            case 0:
              return tt = P({
                query: v,
                variables: w,
                operationName: h,
                jsonSerializer: V.jsonSerializer
              }), it = t({ method: "GET", headers: I }, V), rt ? [4, Promise.resolve(rt(it))] : [3, 2];
            case 1:
              it = ot.sent(), ot.label = 2;
            case 2:
              return [4, J(E + "?" + tt, it)];
            case 3:
              return [2, ot.sent()];
          }
        });
      });
    }, D = (
      /** @class */
      function() {
        function f(E, v) {
          v === void 0 && (v = {}), this.url = E, this.options = v;
        }
        return f.prototype.rawRequest = function(E, v, w) {
          return i(this, void 0, void 0, function() {
            var h, I, J, V, rt, tt, it, ot, xt, At, ut, Et;
            return o(this, function(ht) {
              return h = x.parseRawRequestArgs(E, v, w), I = this.options, J = I.headers, V = I.fetch, rt = V === void 0 ? A.default : V, tt = I.method, it = tt === void 0 ? "POST" : tt, ot = I.requestMiddleware, xt = I.responseMiddleware, At = a(I, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ut = this.url, h.signal !== void 0 && (At.signal = h.signal), Et = C(h.query).operationName, [2, z({
                url: ut,
                query: h.query,
                variables: h.variables,
                headers: t(t({}, O(u(J))), O(h.requestHeaders)),
                operationName: Et,
                fetch: rt,
                method: it,
                fetchOptions: At,
                middleware: ot
              }).then(function(mt) {
                return xt && xt(mt), mt;
              }).catch(function(mt) {
                throw xt && xt(mt), mt;
              })];
            });
          });
        }, f.prototype.request = function(E) {
          for (var v = [], w = 1; w < arguments.length; w++)
            v[w - 1] = arguments[w];
          var h = v[0], I = v[1], J = x.parseRequestArgs(E, h, I), V = this.options, rt = V.headers, tt = V.fetch, it = tt === void 0 ? A.default : tt, ot = V.method, xt = ot === void 0 ? "POST" : ot, At = V.requestMiddleware, ut = V.responseMiddleware, Et = a(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ht = this.url;
          J.signal !== void 0 && (Et.signal = J.signal);
          var mt = C(J.document), Ye = mt.query, Dt = mt.operationName;
          return z({
            url: ht,
            query: Ye,
            variables: J.variables,
            headers: t(t({}, O(u(rt))), O(J.requestHeaders)),
            operationName: Dt,
            fetch: it,
            method: xt,
            fetchOptions: Et,
            middleware: At
          }).then(function(Bt) {
            return ut && ut(Bt), Bt.data;
          }).catch(function(Bt) {
            throw ut && ut(Bt), Bt;
          });
        }, f.prototype.batchRequests = function(E, v) {
          var w = x.parseBatchRequestArgs(E, v), h = this.options, I = h.headers, J = h.fetch, V = J === void 0 ? A.default : J, rt = h.method, tt = rt === void 0 ? "POST" : rt, it = h.requestMiddleware, ot = h.responseMiddleware, xt = a(h, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), At = this.url;
          w.signal !== void 0 && (xt.signal = w.signal);
          var ut = w.documents.map(function(ht) {
            var mt = ht.document;
            return C(mt).query;
          }), Et = w.documents.map(function(ht) {
            var mt = ht.variables;
            return mt;
          });
          return z({
            url: At,
            query: ut,
            variables: Et,
            headers: t(t({}, O(u(I))), O(w.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: tt,
            fetchOptions: xt,
            middleware: it
          }).then(function(ht) {
            return ot && ot(ht), ht.data;
          }).catch(function(ht) {
            throw ot && ot(ht), ht;
          });
        }, f.prototype.setHeaders = function(E) {
          return this.options.headers = E, this;
        }, f.prototype.setHeader = function(E, v) {
          var w, h = this.options.headers;
          return h ? h[E] = v : this.options.headers = (w = {}, w[E] = v, w), this;
        }, f.prototype.setEndpoint = function(E) {
          return this.url = E, this;
        }, f;
      }()
    );
    e.GraphQLClient = D;
    function z(f) {
      var E = f.url, v = f.query, w = f.variables, h = f.headers, I = f.operationName, J = f.fetch, V = f.method, rt = V === void 0 ? "POST" : V, tt = f.fetchOptions, it = f.middleware;
      return i(this, void 0, void 0, function() {
        var ot, xt, At, ut, Et, ht, mt, Ye, Dt, Bt, vn;
        return o(this, function(Lt) {
          switch (Lt.label) {
            case 0:
              return ot = rt.toUpperCase() === "POST" ? Z : L, xt = Array.isArray(v), [4, ot({
                url: E,
                query: v,
                variables: w,
                operationName: I,
                headers: h,
                fetch: J,
                fetchOptions: tt,
                middleware: it
              })];
            case 1:
              return At = Lt.sent(), [4, Y(At, tt.jsonSerializer)];
            case 2:
              if (ut = Lt.sent(), Et = xt && Array.isArray(ut) ? !ut.some(function(Ut) {
                var _s = Ut.data;
                return !_s;
              }) : !!ut.data, ht = !ut.errors || tt.errorPolicy === "all" || tt.errorPolicy === "ignore", At.ok && ht && Et)
                return mt = At.headers, Ye = At.status, ut.errors, Dt = a(ut, ["errors"]), Bt = tt.errorPolicy === "ignore" ? Dt : ut, [2, t(t({}, xt ? { data: Bt } : Bt), { headers: mt, status: Ye })];
              throw vn = typeof ut == "string" ? { error: ut } : ut, new F.ClientError(t(t({}, vn), { status: At.status, headers: At.headers }), { query: v, variables: w });
          }
        });
      });
    }
    function U(f, E, v, w) {
      return i(this, void 0, void 0, function() {
        var h, I;
        return o(this, function(J) {
          return h = x.parseRawRequestExtendedArgs(f, E, v, w), I = new D(h.url), [2, I.rawRequest(t({}, h))];
        });
      });
    }
    e.rawRequest = U;
    function G(f, E) {
      for (var v = [], w = 2; w < arguments.length; w++)
        v[w - 2] = arguments[w];
      return i(this, void 0, void 0, function() {
        var h, I, J, V;
        return o(this, function(rt) {
          return h = v[0], I = v[1], J = x.parseRequestExtendedArgs(f, E, h, I), V = new D(J.url), [2, V.request(t({}, J))];
        });
      });
    }
    e.request = G;
    function H(f, E, v) {
      return i(this, void 0, void 0, function() {
        var w, h;
        return o(this, function(I) {
          return w = x.parseBatchRequestsExtendedArgs(f, E, v), h = new D(w.url), [2, h.batchRequests(t({}, w))];
        });
      });
    }
    e.batchRequests = H, e.default = G;
    function Y(f, E) {
      return E === void 0 && (E = T.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var v, w, h;
        return o(this, function(I) {
          switch (I.label) {
            case 0:
              return f.headers.forEach(function(J, V) {
                V.toLowerCase() === "content-type" && (v = J);
              }), v && v.toLowerCase().startsWith("application/json") ? (h = (w = E).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, h.apply(w, [I.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function nt(f) {
      var E, v = void 0, w = f.definitions.filter(function(h) {
        return h.kind === "OperationDefinition";
      });
      return w.length === 1 && (v = (E = w[0].name) === null || E === void 0 ? void 0 : E.value), v;
    }
    function C(f) {
      if (typeof f == "string") {
        var E = void 0;
        try {
          var v = m.parse(f);
          E = nt(v);
        } catch {
        }
        return { query: f, operationName: E };
      }
      var w = nt(f);
      return { query: B.print(f), operationName: w };
    }
    e.resolveRequestDocument = C;
    function u(f) {
      return typeof f == "function" ? f() : f;
    }
    function d(f) {
      for (var E = [], v = 1; v < arguments.length; v++)
        E[v - 1] = arguments[v];
      return f.reduce(function(w, h, I) {
        return "" + w + h + (I in E ? E[I] : "");
      }, "");
    }
    e.gql = d;
    function p(f) {
      var E = {};
      return f.forEach(function(v, w) {
        E[w] = v;
      }), E;
    }
    var y = Ff();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return y.GraphQLWebSocketClient;
    } });
  }(Wi)), Wi;
}
var Mf = y0(), Gs = function() {
  return Gs = Object.assign || function(t) {
    for (var r, n = 1, s = arguments.length; n < s; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, Gs.apply(this, arguments);
};
var Ns = /* @__PURE__ */ new Map(), Eo = /* @__PURE__ */ new Map(), b0 = !0, Xs = !1;
function I0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Of(e) {
  return I0(e.source.body.substring(e.start, e.end));
}
function Lf(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = Of(n.loc), o = Eo.get(s);
      o && !o.has(i) ? b0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Eo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), r.push(n));
    } else
      r.push(n);
  }), Gs(Gs({}, e), { definitions: r });
}
function kf(e) {
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
function Pf(e) {
  var t = I0(e);
  if (!Ns.has(t)) {
    var r = A0(e, {
      experimentalFragmentVariables: Xs,
      allowLegacyFragmentVariables: Xs
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ns.set(t, kf(Lf(r)));
  }
  return Ns.get(t);
}
function st(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  typeof e == "string" && (e = [e]);
  var n = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += e[i + 1];
  }), Pf(n);
}
function Uf() {
  Ns.clear(), Eo.clear();
}
function zf() {
  b0 = !1;
}
function Gf() {
  Xs = !0;
}
function Xf() {
  Xs = !1;
}
var Sn = {
  gql: st,
  resetCaches: Uf,
  disableFragmentWarnings: zf,
  enableExperimentalFragmentVariables: Gf,
  disableExperimentalFragmentVariables: Xf
};
(function(e) {
  e.gql = Sn.gql, e.resetCaches = Sn.resetCaches, e.disableFragmentWarnings = Sn.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Sn.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Sn.disableExperimentalFragmentVariables;
})(st || (st = {}));
st.default = st;
var Mt = "0x0000000000000000000000000000000000000000000000000000000000000000", zB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", GB = 16 * 1024, XB = 16, HB = 1024 * 1024 * 1024, YB = 1024 * 1024 * 1024, WB = 255, VB = 1024 * 1024, ZB = 1024 * 1024, Hf = "0xffffffffffff0000", E0 = "0xffffffffffff0001", Yf = "0xffffffffffff0003", Wf = "0xffffffffffff0004", Vf = "0xffffffffffff0005", JB = "0x0", Zf = [
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
], Jf = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let c;
const v0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && v0.decode();
let Fn = null;
function C0() {
  return (Fn === null || Fn.byteLength === 0) && (Fn = new Uint8Array(c.memory.buffer)), Fn;
}
function jf(e, t) {
  return e = e >>> 0, v0.decode(C0().subarray(e, e + t));
}
function b(e, t) {
  if (!(e instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return e.ptr;
}
function qf(e, t) {
  const r = c.gm_args(e, t);
  return X.__wrap(r);
}
function $f(e, t, r) {
  const n = c.gtf_args(e, t, r);
  return X.__wrap(n);
}
function Kf(e, t, r, n) {
  b(n, Mr);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(e, t, r, s);
  return X.__wrap(i);
}
function tg(e, t, r, n) {
  b(n, Mr);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(e, t, r, s);
  return X.__wrap(i);
}
function eg(e, t, r, n) {
  b(n, as);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(e, t, r, s);
  return X.__wrap(i);
}
function rg(e, t, r, n) {
  b(n, as);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(e, t, r, s);
  return X.__wrap(i);
}
function ng(e, t, r, n) {
  b(n, cs);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(e, t, r, s);
  return X.__wrap(i);
}
function sg(e, t, r, n) {
  b(n, cs);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(e, t, r, s);
  return X.__wrap(i);
}
function ig(e, t, r, n) {
  b(n, os);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(e, t, r, s);
  return X.__wrap(i);
}
function og(e, t, r, n) {
  b(n, os);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(e, t, r, s);
  return X.__wrap(i);
}
function ag(e, t, r) {
  const n = c.add(e, t, r);
  return X.__wrap(n);
}
function cg(e, t, r) {
  const n = c.and(e, t, r);
  return X.__wrap(n);
}
function ug(e, t, r) {
  const n = c.div(e, t, r);
  return X.__wrap(n);
}
function dg(e, t, r) {
  const n = c.eq(e, t, r);
  return X.__wrap(n);
}
function _g(e, t, r) {
  const n = c.exp(e, t, r);
  return X.__wrap(n);
}
function hg(e, t, r) {
  const n = c.gt(e, t, r);
  return X.__wrap(n);
}
function lg(e, t, r) {
  const n = c.lt(e, t, r);
  return X.__wrap(n);
}
function Ag(e, t, r) {
  const n = c.mlog(e, t, r);
  return X.__wrap(n);
}
function pg(e, t, r) {
  const n = c.mroo(e, t, r);
  return X.__wrap(n);
}
function fg(e, t, r) {
  const n = c.mod_(e, t, r);
  return X.__wrap(n);
}
function vo(e, t) {
  const r = c.move_(e, t);
  return X.__wrap(r);
}
function gg(e, t, r) {
  const n = c.mul(e, t, r);
  return X.__wrap(n);
}
function wg(e, t) {
  const r = c.not(e, t);
  return X.__wrap(r);
}
function mg(e, t, r) {
  const n = c.or(e, t, r);
  return X.__wrap(n);
}
function yg(e, t, r) {
  const n = c.sll(e, t, r);
  return X.__wrap(n);
}
function bg(e, t, r) {
  const n = c.srl(e, t, r);
  return X.__wrap(n);
}
function B0(e, t, r) {
  const n = c.sub(e, t, r);
  return X.__wrap(n);
}
function Ig(e, t, r) {
  const n = c.xor(e, t, r);
  return X.__wrap(n);
}
function Eg(e, t, r, n) {
  const s = c.mldv(e, t, r, n);
  return X.__wrap(s);
}
function ba(e) {
  const t = c.ret(e);
  return X.__wrap(t);
}
function vg(e, t) {
  const r = c.retd(e, t);
  return X.__wrap(r);
}
function Cg(e) {
  const t = c.aloc(e);
  return X.__wrap(t);
}
function Bg(e, t) {
  const r = c.mcl(e, t);
  return X.__wrap(r);
}
function xg(e, t, r) {
  const n = c.mcp(e, t, r);
  return X.__wrap(n);
}
function Rg(e, t, r, n) {
  const s = c.meq(e, t, r, n);
  return X.__wrap(s);
}
function Sg(e, t) {
  const r = c.bhsh(e, t);
  return X.__wrap(r);
}
function Ng(e) {
  const t = c.bhei(e);
  return X.__wrap(t);
}
function Tg(e, t) {
  const r = c.burn(e, t);
  return X.__wrap(r);
}
function Co(e, t, r, n) {
  const s = c.call(e, t, r, n);
  return X.__wrap(s);
}
function Qg(e, t, r, n) {
  const s = c.ccp(e, t, r, n);
  return X.__wrap(s);
}
function Dg(e, t) {
  const r = c.croo(e, t);
  return X.__wrap(r);
}
function Fg(e, t) {
  const r = c.csiz(e, t);
  return X.__wrap(r);
}
function Mg(e) {
  const t = c.cb(e);
  return X.__wrap(t);
}
function x0(e, t, r, n) {
  const s = c.ldc(e, t, r, n);
  return X.__wrap(s);
}
function Og(e, t, r, n) {
  const s = c.log(e, t, r, n);
  return X.__wrap(s);
}
function Lg(e, t, r, n) {
  const s = c.logd(e, t, r, n);
  return X.__wrap(s);
}
function kg(e, t) {
  const r = c.mint(e, t);
  return X.__wrap(r);
}
function Pg(e) {
  const t = c.rvrt(e);
  return X.__wrap(t);
}
function Ug(e, t, r) {
  const n = c.scwq(e, t, r);
  return X.__wrap(n);
}
function zg(e, t, r) {
  const n = c.srw(e, t, r);
  return X.__wrap(n);
}
function Gg(e, t, r, n) {
  const s = c.srwq(e, t, r, n);
  return X.__wrap(s);
}
function Xg(e, t, r) {
  const n = c.sww(e, t, r);
  return X.__wrap(n);
}
function Hg(e, t, r, n) {
  const s = c.swwq(e, t, r, n);
  return X.__wrap(s);
}
function R0(e, t, r) {
  const n = c.tr(e, t, r);
  return X.__wrap(n);
}
function Yg(e, t, r, n) {
  const s = c.tro(e, t, r, n);
  return X.__wrap(s);
}
function Wg(e, t, r) {
  const n = c.eck1(e, t, r);
  return X.__wrap(n);
}
function Vg(e, t, r) {
  const n = c.ecr1(e, t, r);
  return X.__wrap(n);
}
function Zg(e, t, r, n) {
  const s = c.ed19(e, t, r, n);
  return X.__wrap(s);
}
function Jg(e, t, r) {
  const n = c.k256(e, t, r);
  return X.__wrap(n);
}
function jg(e, t, r) {
  const n = c.s256(e, t, r);
  return X.__wrap(n);
}
function qg(e, t) {
  const r = c.time(e, t);
  return X.__wrap(r);
}
function $g() {
  const e = c.noop();
  return X.__wrap(e);
}
function Kg(e) {
  const t = c.flag(e);
  return X.__wrap(t);
}
function tw(e, t, r) {
  const n = c.bal(e, t, r);
  return X.__wrap(n);
}
function S0(e) {
  const t = c.jmp(e);
  return X.__wrap(t);
}
function ew(e, t, r) {
  const n = c.jne(e, t, r);
  return X.__wrap(n);
}
function rw(e, t, r, n) {
  const s = c.smo(e, t, r, n);
  return X.__wrap(s);
}
function Hn(e, t, r) {
  const n = c.addi(e, t, r);
  return X.__wrap(n);
}
function nw(e, t, r) {
  const n = c.andi(e, t, r);
  return X.__wrap(n);
}
function N0(e, t, r) {
  const n = c.divi(e, t, r);
  return X.__wrap(n);
}
function sw(e, t, r) {
  const n = c.expi(e, t, r);
  return X.__wrap(n);
}
function iw(e, t, r) {
  const n = c.modi(e, t, r);
  return X.__wrap(n);
}
function ow(e, t, r) {
  const n = c.muli(e, t, r);
  return X.__wrap(n);
}
function aw(e, t, r) {
  const n = c.ori(e, t, r);
  return X.__wrap(n);
}
function cw(e, t, r) {
  const n = c.slli(e, t, r);
  return X.__wrap(n);
}
function uw(e, t, r) {
  const n = c.srli(e, t, r);
  return X.__wrap(n);
}
function T0(e, t, r) {
  const n = c.subi(e, t, r);
  return X.__wrap(n);
}
function dw(e, t, r) {
  const n = c.xori(e, t, r);
  return X.__wrap(n);
}
function _w(e, t, r) {
  const n = c.jnei(e, t, r);
  return X.__wrap(n);
}
function hw(e, t, r) {
  const n = c.lb(e, t, r);
  return X.__wrap(n);
}
function Hs(e, t, r) {
  const n = c.lw(e, t, r);
  return X.__wrap(n);
}
function lw(e, t, r) {
  const n = c.sb(e, t, r);
  return X.__wrap(n);
}
function Aw(e, t, r) {
  const n = c.sw(e, t, r);
  return X.__wrap(n);
}
function pw(e, t, r) {
  const n = c.mcpi(e, t, r);
  return X.__wrap(n);
}
function Q0(e, t, r) {
  const n = c.gtf(e, t, r);
  return X.__wrap(n);
}
function fw(e, t) {
  const r = c.mcli(e, t);
  return X.__wrap(r);
}
function gw(e, t) {
  const r = c.gm(e, t);
  return X.__wrap(r);
}
function en(e, t) {
  const r = c.movi(e, t);
  return X.__wrap(r);
}
function ww(e, t) {
  const r = c.jnzi(e, t);
  return X.__wrap(r);
}
function mw(e, t) {
  const r = c.jmpf(e, t);
  return X.__wrap(r);
}
function yw(e, t) {
  const r = c.jmpb(e, t);
  return X.__wrap(r);
}
function bw(e, t, r) {
  const n = c.jnzf(e, t, r);
  return X.__wrap(n);
}
function D0(e, t, r) {
  const n = c.jnzb(e, t, r);
  return X.__wrap(n);
}
function Iw(e, t, r, n) {
  const s = c.jnef(e, t, r, n);
  return X.__wrap(s);
}
function Ew(e, t, r, n) {
  const s = c.jneb(e, t, r, n);
  return X.__wrap(s);
}
function vw(e) {
  const t = c.ji(e);
  return X.__wrap(t);
}
function Cw(e) {
  const t = c.cfei(e);
  return X.__wrap(t);
}
function Bw(e) {
  const t = c.cfsi(e);
  return X.__wrap(t);
}
function xw(e) {
  const t = c.cfe(e);
  return X.__wrap(t);
}
function Rw(e) {
  const t = c.cfs(e);
  return X.__wrap(t);
}
function Sw(e) {
  const t = c.pshl(e);
  return X.__wrap(t);
}
function Nw(e) {
  const t = c.pshh(e);
  return X.__wrap(t);
}
function Tw(e) {
  const t = c.popl(e);
  return X.__wrap(t);
}
function Qw(e) {
  const t = c.poph(e);
  return X.__wrap(t);
}
function Dw(e, t, r, n) {
  const s = c.wdcm(e, t, r, n);
  return X.__wrap(s);
}
function Fw(e, t, r, n) {
  const s = c.wqcm(e, t, r, n);
  return X.__wrap(s);
}
function Mw(e, t, r, n) {
  const s = c.wdop(e, t, r, n);
  return X.__wrap(s);
}
function Ow(e, t, r, n) {
  const s = c.wqop(e, t, r, n);
  return X.__wrap(s);
}
function Lw(e, t, r, n) {
  const s = c.wdml(e, t, r, n);
  return X.__wrap(s);
}
function kw(e, t, r, n) {
  const s = c.wqml(e, t, r, n);
  return X.__wrap(s);
}
function Pw(e, t, r, n) {
  const s = c.wddv(e, t, r, n);
  return X.__wrap(s);
}
function Uw(e, t, r, n) {
  const s = c.wqdv(e, t, r, n);
  return X.__wrap(s);
}
function zw(e, t, r, n) {
  const s = c.wdmd(e, t, r, n);
  return X.__wrap(s);
}
function Gw(e, t, r, n) {
  const s = c.wqmd(e, t, r, n);
  return X.__wrap(s);
}
function Xw(e, t, r, n) {
  const s = c.wdam(e, t, r, n);
  return X.__wrap(s);
}
function Hw(e, t, r, n) {
  const s = c.wqam(e, t, r, n);
  return X.__wrap(s);
}
function Yw(e, t, r, n) {
  const s = c.wdmm(e, t, r, n);
  return X.__wrap(s);
}
function Ww(e, t, r, n) {
  const s = c.wqmm(e, t, r, n);
  return X.__wrap(s);
}
function Vw(e, t, r, n) {
  const s = c.ecal(e, t, r, n);
  return X.__wrap(s);
}
function F0(e, t) {
  const r = c.bsiz(e, t);
  return X.__wrap(r);
}
function Zw(e, t, r, n) {
  const s = c.bldd(e, t, r, n);
  return X.__wrap(s);
}
let Mn = null;
function Vc() {
  return (Mn === null || Mn.byteLength === 0) && (Mn = new Int32Array(c.memory.buffer)), Mn;
}
function Jw(e, t) {
  return e = e >>> 0, C0().subarray(e / 1, e / 1 + t);
}
const jw = Object.freeze({
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
}), qw = Object.freeze({
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
}), $w = Object.freeze({
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
}), M0 = Object.freeze({
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
}), Kw = Object.freeze({
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
}), tm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_add_free(e >>> 0));
class em {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const rm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_addi_free(e >>> 0));
class nm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const sm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_aloc_free(e >>> 0));
class im {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sm.unregister(this), t;
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
    b(t, l);
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
const om = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_and_free(e >>> 0));
class am {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, om.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const cm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_andi_free(e >>> 0));
class um {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const dm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bal_free(e >>> 0));
class _m {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const hm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhei_free(e >>> 0));
class lm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hm.unregister(this), t;
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
    b(t, l);
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
const Am = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bhsh_free(e >>> 0));
class pm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Am.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const fm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bldd_free(e >>> 0));
class gm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fm.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const wm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_bsiz_free(e >>> 0));
class mm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wm.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const ym = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_burn_free(e >>> 0));
class bm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ym.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const Im = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_call_free(e >>> 0));
class Em {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Im.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const vm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cb_free(e >>> 0));
class Cm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vm.unregister(this), t;
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
    b(t, l);
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
const Bm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ccp_free(e >>> 0));
class xm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bm.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const Rm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfe_free(e >>> 0));
class Sm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rm.unregister(this), t;
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
    b(t, l);
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
const Nm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfei_free(e >>> 0));
class Tm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nm.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Qm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfs_free(e >>> 0));
class Dm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qm.unregister(this), t;
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
    b(t, l);
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
const Fm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_cfsi_free(e >>> 0));
class Mm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fm.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Om = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_croo_free(e >>> 0));
class Lm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Om.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const km = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_csiz_free(e >>> 0));
class Pm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, km.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const Zc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_compareargs_free(e >>> 0));
class Mr {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Mr.prototype);
    return r.__wbg_ptr = t, Zc.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zc.unregister(this), t;
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
    return Tt.__wrap(r);
  }
  /**
  * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
  * @param {Imm06} bits
  * @returns {CompareArgs | undefined}
  */
  static from_imm(t) {
    b(t, Tt);
    var r = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(r);
    return n === 0 ? void 0 : Mr.__wrap(n);
  }
}
const Um = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_div_free(e >>> 0));
class zm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Um.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Gm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divi_free(e >>> 0));
class Xm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const Hm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_divargs_free(e >>> 0));
class os {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hm.unregister(this), t;
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
const Ym = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecal_free(e >>> 0));
class Wm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ym.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const Vm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eck1_free(e >>> 0));
class Zm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Jm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ecr1_free(e >>> 0));
class jm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jm.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const qm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ed19_free(e >>> 0));
class $m {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qm.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const Km = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_eq_free(e >>> 0));
class ty {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Km.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const ey = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_exp_free(e >>> 0));
class ry {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ey.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const ny = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_expi_free(e >>> 0));
class sy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ny.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const iy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_flag_free(e >>> 0));
class oy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iy.unregister(this), t;
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
    b(t, l);
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
const Jc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gm_free(e >>> 0));
class Ys {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ys.prototype);
    return r.__wbg_ptr = t, Jc.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jc.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, r);
    return Ys.__wrap(s);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {Imm18} selector
  */
  constructor(t, r) {
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, Be);
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
    return Be.__wrap(t);
  }
}
const ay = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gt_free(e >>> 0));
class cy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ay.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const jc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_gtf_free(e >>> 0));
class Ws {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ws.prototype);
    return r.__wbg_ptr = t, jc.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jc.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    const o = c.gtf_from_args(s, i, n);
    return Ws.__wrap(o);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} arg
  * @param {Imm12} selector
  */
  constructor(t, r, n) {
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const qc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm06_free(e >>> 0));
class Tt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Tt.prototype);
    return r.__wbg_ptr = t, qc.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t);
  }
}
const $c = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm12_free(e >>> 0));
class gt {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(gt.prototype);
    return r.__wbg_ptr = t, $c.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $c.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t);
  }
}
const Kc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm18_free(e >>> 0));
class Be {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Be.prototype);
    return r.__wbg_ptr = t, Kc.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t);
  }
}
const tu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_imm24_free(e >>> 0));
class Ie {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ie.prototype);
    return r.__wbg_ptr = t, tu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t);
  }
}
const eu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_instruction_free(e >>> 0));
class X {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(X.prototype);
    return r.__wbg_ptr = t, eu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eu.unregister(this), t;
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
      var t = Vc()[s / 4 + 0], r = Vc()[s / 4 + 1], n = Jw(t, r).slice();
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
const uy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ji_free(e >>> 0));
class dy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uy.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const _y = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmp_free(e >>> 0));
class hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _y.unregister(this), t;
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
    b(t, l);
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
const ly = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpb_free(e >>> 0));
class Ay {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ly.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, Be);
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
    return Be.__wrap(t);
  }
}
const py = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jmpf_free(e >>> 0));
class fy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, py.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, Be);
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
    return Be.__wrap(t);
  }
}
const gy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jne_free(e >>> 0));
class wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const my = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jneb_free(e >>> 0));
class yy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, my.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const by = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnef_free(e >>> 0));
class Iy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, by.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const Ey = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnei_free(e >>> 0));
class vy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ey.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const Cy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzb_free(e >>> 0));
class By {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const xy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzf_free(e >>> 0));
class Ry {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const Sy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_jnzi_free(e >>> 0));
class Ny {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sy.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, Be);
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
    return Be.__wrap(t);
  }
}
const Ty = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_k256_free(e >>> 0));
class Qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ty.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Dy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lb_free(e >>> 0));
class Fy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const My = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ldc_free(e >>> 0));
class Oy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, My.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const Ly = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_log_free(e >>> 0));
class ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ly.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const Py = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_logd_free(e >>> 0));
class Uy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Py.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const zy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lt_free(e >>> 0));
class Gy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Xy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_lw_free(e >>> 0));
class Hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const Yy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcl_free(e >>> 0));
class Wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yy.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const Vy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcli_free(e >>> 0));
class Zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vy.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, Be);
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
    return Be.__wrap(t);
  }
}
const Jy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcp_free(e >>> 0));
class jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const qy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mcpi_free(e >>> 0));
class $y {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qy.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const Ky = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_meq_free(e >>> 0));
class tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ky.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const eb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mint_free(e >>> 0));
class rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eb.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const nb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mldv_free(e >>> 0));
class sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nb.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const ib = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mlog_free(e >>> 0));
class ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ib.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const ab = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mod_free(e >>> 0));
class cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ab.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const ub = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_modi_free(e >>> 0));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ub.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const _b = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_move_free(e >>> 0));
class hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _b.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const lb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_movi_free(e >>> 0));
class Ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lb.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, Be);
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
    return Be.__wrap(t);
  }
}
const pb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mroo_free(e >>> 0));
class fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const gb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mul_free(e >>> 0));
class wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const mb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_muli_free(e >>> 0));
class yb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const bb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mathargs_free(e >>> 0));
class as {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bb.unregister(this), t;
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
const Ib = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_mulargs_free(e >>> 0));
class cs {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ib.unregister(this), t;
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
const Eb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_noop_free(e >>> 0));
class vb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eb.unregister(this), t;
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
const Cb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_not_free(e >>> 0));
class Bb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cb.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const xb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_or_free(e >>> 0));
class Rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Sb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ori_free(e >>> 0));
class Nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const Tb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_poph_free(e >>> 0));
class Qb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tb.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Db = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_popl_free(e >>> 0));
class Fb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Db.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Mb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshh_free(e >>> 0));
class Ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mb.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Lb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_pshl_free(e >>> 0));
class kb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lb.unregister(this), t;
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
    b(t, Ie);
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
    return Ie.__wrap(t);
  }
}
const Pb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_panicinstruction_free(e >>> 0));
class Ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pb.unregister(this), t;
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
const zb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_ret_free(e >>> 0));
class Gb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zb.unregister(this), t;
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
    b(t, l);
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
const Xb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_retd_free(e >>> 0));
class Hb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xb.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const Yb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_rvrt_free(e >>> 0));
class Wb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yb.unregister(this), t;
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
    b(t, l);
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
const ru = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_regid_free(e >>> 0));
class l {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(l.prototype);
    return r.__wbg_ptr = t, ru.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ru.unregister(this), t;
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
const Vb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_s256_free(e >>> 0));
class Zb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Jb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sb_free(e >>> 0));
class jb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const qb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_scwq_free(e >>> 0));
class $b {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const Kb = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sll_free(e >>> 0));
class tI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kb.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const eI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_slli_free(e >>> 0));
class rI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const nI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_smo_free(e >>> 0));
class sI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const iI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srl_free(e >>> 0));
class oI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const aI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srli_free(e >>> 0));
class cI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, aI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const uI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srw_free(e >>> 0));
class dI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const _I = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_srwq_free(e >>> 0));
class hI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _I.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const lI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sub_free(e >>> 0));
class AI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
} } : new FinalizationRegistry((e) => c.__wbg_subi_free(e >>> 0));
class fI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const gI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sw_free(e >>> 0));
class wI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
const mI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_sww_free(e >>> 0));
class yI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const bI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_swwq_free(e >>> 0));
class II {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const EI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_time_free(e >>> 0));
class vI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, EI.unregister(this), t;
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
    b(t, l);
    var n = t.__destroy_into_raw();
    b(r, l);
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
const CI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tr_free(e >>> 0));
class BI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, CI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const xI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_tro_free(e >>> 0));
class RI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const SI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdam_free(e >>> 0));
class NI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, SI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const nu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdcm_free(e >>> 0));
class Vs {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Vs.prototype);
    return r.__wbg_ptr = t, nu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nu.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Mr);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_from_args(i, o, a, _);
    return Vs.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const su = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wddv_free(e >>> 0));
class Zs {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Zs.prototype);
    return r.__wbg_ptr = t, su.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, su.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, os);
    var _ = s.__destroy_into_raw();
    const A = c.wddv_from_args(i, o, a, _);
    return Zs.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const TI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmd_free(e >>> 0));
class QI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, TI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const iu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdml_free(e >>> 0));
class Js {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Js.prototype);
    return r.__wbg_ptr = t, iu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iu.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, cs);
    var _ = s.__destroy_into_raw();
    const A = c.wdml_from_args(i, o, a, _);
    return Js.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const DI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdmm_free(e >>> 0));
class FI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, DI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const ou = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wdop_free(e >>> 0));
class js {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(js.prototype);
    return r.__wbg_ptr = t, ou.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ou.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, as);
    var _ = s.__destroy_into_raw();
    const A = c.wdop_from_args(i, o, a, _);
    return js.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const MI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqam_free(e >>> 0));
class OI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, MI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const au = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqcm_free(e >>> 0));
class qs {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(qs.prototype);
    return r.__wbg_ptr = t, au.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, au.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Mr);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_from_args(i, o, a, _);
    return qs.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const cu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqdv_free(e >>> 0));
class $s {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create($s.prototype);
    return r.__wbg_ptr = t, cu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cu.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, os);
    var _ = s.__destroy_into_raw();
    const A = c.wddv_from_args(i, o, a, _);
    return $s.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const LI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmd_free(e >>> 0));
class kI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, LI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const uu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqml_free(e >>> 0));
class Ks {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(Ks.prototype);
    return r.__wbg_ptr = t, uu.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uu.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, cs);
    var _ = s.__destroy_into_raw();
    const A = c.wdml_from_args(i, o, a, _);
    return Ks.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const PI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqmm_free(e >>> 0));
class UI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, PI.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, l);
    var _ = s.__destroy_into_raw();
    const A = c.bldd_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
const du = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_wqop_free(e >>> 0));
class ti {
  static __wrap(t) {
    t = t >>> 0;
    const r = Object.create(ti.prototype);
    return r.__wbg_ptr = t, du.register(r, r.__wbg_ptr, r), r;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, du.unregister(this), t;
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
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, as);
    var _ = s.__destroy_into_raw();
    const A = c.wdop_from_args(i, o, a, _);
    return ti.__wrap(A);
  }
  /**
  * Construct the instruction from its parts.
  * @param {RegId} dst
  * @param {RegId} lhs
  * @param {RegId} rhs
  * @param {Imm06} flags
  */
  constructor(t, r, n, s) {
    b(t, l);
    var i = t.__destroy_into_raw();
    b(r, l);
    var o = r.__destroy_into_raw();
    b(n, l);
    var a = n.__destroy_into_raw();
    b(s, Tt);
    var _ = s.__destroy_into_raw();
    const A = c.wdcm_new_typescript(i, o, a, _);
    return this.__wbg_ptr = A >>> 0, this;
  }
  /**
  * Access the ID for register A.
  * @returns {RegId}
  */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
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
    return Tt.__wrap(t);
  }
}
const zI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xor_free(e >>> 0));
class GI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, l);
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
const XI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => c.__wbg_xori_free(e >>> 0));
class HI {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, XI.unregister(this), t;
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
    b(t, l);
    var s = t.__destroy_into_raw();
    b(r, l);
    var i = r.__destroy_into_raw();
    b(n, gt);
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
    return gt.__wrap(t);
  }
}
async function YI(e, t) {
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
function O0() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, r) {
    throw new Error(jf(t, r));
  }, e;
}
function L0(e, t) {
  return c = e.exports, k0.__wbindgen_wasm_module = t, Mn = null, Fn = null, c;
}
function WI(e) {
  if (c !== void 0) return c;
  const t = O0();
  e instanceof WebAssembly.Module || (e = new WebAssembly.Module(e));
  const r = new WebAssembly.Instance(e, t);
  return L0(r, e);
}
async function k0(e) {
  if (c !== void 0) return c;
  const t = O0(), { instance: r, module: n } = await YI(await e, t);
  return L0(r, n);
}
function VI(e, t, r, n) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(r, "base64");
  else {
    var o = globalThis.atob(r), a = o.length;
    s = new Uint8Array(new ArrayBuffer(a));
    for (var _ = 0; _ < a; _++)
      s[_] = o.charCodeAt(_);
  }
  {
    var A = new WebAssembly.Module(s);
    return n ? new WebAssembly.Instance(A, n) : A;
  }
}
function ZI(e) {
  return VI(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP9AfsBAQMKBgEFBQUBBQEBAQEBAQECBQICAQMBAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAwEAAQEFBQEBAQEBAQEBAQECAQUFBQMCAQAAAQEBBQICAQEGAAYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBgMHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQMGAAMBAQEHAgIAAgAGAQQDAQMFCAEJCQMDAwUBAQEGBgYGBAQEBAQEBAQEBAQEBAQEBAQEBAYHBwICAgMHBwAIAAMEBQFwAQcHBQMBABEGCQF/AUGAgMAACwf4TM8FBm1lbW9yeQIAFl9fd2JnX2NvbXBhcmVhcmdzX2ZyZWUAexpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQA6Gl9fd2JnX3NldF9jb21wYXJlYXJnc19tb2RlACgiX193YmdfZ2V0X2NvbXBhcmVhcmdzX2luZGlyZWN0X3JocwA7Il9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAPBJjb21wYXJlYXJnc190b19pbW0ASRRjb21wYXJlYXJnc19mcm9tX2ltbQApFV9fd2JnX2dldF9tYXRoYXJnc19vcAA6FV9fd2JnX3NldF9tYXRoYXJnc19vcAAqEl9fd2JnX211bGFyZ3NfZnJlZQB8Hl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X3JocwA6Hl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwA9El9fd2JnX2RpdmFyZ3NfZnJlZQDYAR5fX3diZ19nZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMArwEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AE0XcGFuaWNpbnN0cnVjdGlvbl9yZWFzb24APxxwYW5pY2luc3RydWN0aW9uX2luc3RydWN0aW9uAEAMZ21fZnJvbV9hcmdzAMsBDWd0Zl9mcm9tX2FyZ3MAwwEHZ21fYXJncwB9CGd0Zl9hcmdzAFsOd2RjbV9mcm9tX2FyZ3MAJg53ZG9wX2Zyb21fYXJncwAmDndkbWxfZnJvbV9hcmdzAB4Od2Rkdl9mcm9tX2FyZ3MAwQEJd2RjbV9hcmdzABkJd3FjbV9hcmdzABoJd2RvcF9hcmdzABsJd3FvcF9hcmdzABwJd2RtbF9hcmdzABQJd3FtbF9hcmdzABUJd2Rkdl9hcmdzAFYJd3Fkdl9hcmdzAFcQX193YmdfaW1tMDZfZnJlZQDZARBfX3diZ19pbW0xMl9mcmVlANoBEF9fd2JnX2ltbTE4X2ZyZWUA2wEOX193YmdfYWRkX2ZyZWUAugEPX193Ymdfbm9vcF9mcmVlAFwSYWRkX25ld190eXBlc2NyaXB0AFAGYWRkX3JhABYGYWRkX3JiAAsGYWRkX3JjAA8DYWRkALsBA2FuZAB/A2RpdgCAAQJlcQCBAQNleHAAggECZ3QAgwECbHQAhAEEbWxvZwCFAQRtcm9vAIYBBG1vZF8AhwEFbW92ZV8ALANtdWwAiAEDbm90AC0Cb3IAiQEDc2xsAIoBA3NybACLAQNzdWIAjAEDeG9yAI0BBG1sZHYAXQNyZXQAsAEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAWAdhbG9jX3JhAE8EYWxvYwCxAQNtY2wALwNtY3AAjgEDbWVxAF4TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALIBBGJ1cm4AMQRjYWxsAF8DY2NwAGAEY3JvbwAyBGNzaXoAMwJjYgCzAQNsZGMAYQNsb2cAYgRsb2dkAGMEbWludAA0BHJ2cnQAtAEEc2N3cQCPAQNzcncAkAEEc3J3cQBkA3N3dwCRAQRzd3dxAGUCdHIAkgEDdHJvAGYEZWNrMQCTAQRlY3IxAJQBBGVkMTkAZwRrMjU2AJUBBHMyNTYAlgEEdGltZQA1E25vb3BfbmV3X3R5cGVzY3JpcHQAyAEEbm9vcADcAQRmbGFnALUBA2JhbACXAQNqbXAAtgEDam5lAJgBA3NtbwBoE2FkZGlfbmV3X3R5cGVzY3JpcHQAUQphZGRpX2ltbTEyAAwEYWRkaQCZAQRhbmRpAJoBBGRpdmkAmwEEZXhwaQCcAQRtb2RpAJ0BBG11bGkAngEDb3JpAJ8BBHNsbGkAoAEEc3JsaQChAQRzdWJpAKIBBHhvcmkAowEEam5laQCkAQJsYgClAQJsdwCmAQJzYgCnAQJzdwCoAQRtY3BpAKkBEmd0Zl9uZXdfdHlwZXNjcmlwdADFAQNndGYAqgEEbWNsaQAgEWdtX25ld190eXBlc2NyaXB0ADYIZ21faW1tMTgACQJnbQAhBG1vdmkAIgRqbnppACMEam1wZgAkE2ptcGJfbmV3X3R5cGVzY3JpcHQAFwRqbXBiACUEam56ZgCrAQRqbnpiAKwBBGpuZWYAaQpqbmViX2ltbTA2ABgEam5lYgBqAmppAEETY2ZlaV9uZXdfdHlwZXNjcmlwdAA4CmNmZWlfaW1tMjQAJwRjZmVpAEIEY2ZzaQBDA2NmZQC3AQNjZnMAuAEEcHNobABEBHBzaGgARQRwb3BsAEYEcG9waABHE3dkY21fbmV3X3R5cGVzY3JpcHQAwgEEd2RjbQBrBHdxY20AbAR3ZG9wAG0Ed3FvcABuBHdkbWwAbwR3cW1sAHAEd2RkdgBxBHdxZHYAcgR3ZG1kAHMEd3FtZAB0BHdkYW0AdQR3cWFtAHYEd2RtbQB3BHdxbW0AeARlY2FsAHkEYnNpegA3E2JsZGRfbmV3X3R5cGVzY3JpcHQATgdibGRkX3JkABgEYmxkZAB6Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWhRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7gERcmVnaWRfbmV3X2NoZWNrZWQArQEJcmVnaWRfYmFsAN0BCnJlZ2lkX2NnYXMA3gEJcmVnaWRfZXJyAN8BCnJlZ2lkX2ZsYWcA4AEIcmVnaWRfZnAA4QEKcmVnaWRfZ2dhcwDiAQhyZWdpZF9ocADjAQhyZWdpZF9pcwDkAQhyZWdpZF9vZgDlAQlyZWdpZF9vbmUA5gEIcmVnaWRfcGMA5wEJcmVnaWRfcmV0AOgBCnJlZ2lkX3JldGwA6QEIcmVnaWRfc3AA6gEJcmVnaWRfc3BwAOsBDnJlZ2lkX3dyaXRhYmxlAOwBCnJlZ2lkX3plcm8A7QEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA1QELcmVnaWRfdG9fdTgA1gETbW92aV9uZXdfdHlwZXNjcmlwdAAXE21jbGlfbmV3X3R5cGVzY3JpcHQAFxNqbnppX25ld190eXBlc2NyaXB0ABcTam1wZl9uZXdfdHlwZXNjcmlwdAAXEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxNic2l6X25ld190eXBlc2NyaXB0AB8ScmV0X25ld190eXBlc2NyaXB0AFgTYmhlaV9uZXdfdHlwZXNjcmlwdABYEWNiX25ld190eXBlc2NyaXB0AFgTcnZydF9uZXdfdHlwZXNjcmlwdABYE2ZsYWdfbmV3X3R5cGVzY3JpcHQAWBJqbXBfbmV3X3R5cGVzY3JpcHQAWBJjZmVfbmV3X3R5cGVzY3JpcHQAWBJjZnNfbmV3X3R5cGVzY3JpcHQAWBNtbGR2X25ld190eXBlc2NyaXB0AE4SbWVxX25ld190eXBlc2NyaXB0AE4SY2NwX25ld190eXBlc2NyaXB0AE4SbG9nX25ld190eXBlc2NyaXB0AE4TbG9nZF9uZXdfdHlwZXNjcmlwdABOE3Nyd3FfbmV3X3R5cGVzY3JpcHQAThNzd3dxX25ld190eXBlc2NyaXB0AE4SdHJvX25ld190eXBlc2NyaXB0AE4TZWQxOV9uZXdfdHlwZXNjcmlwdABOEnNtb19uZXdfdHlwZXNjcmlwdABOEmxkY19uZXdfdHlwZXNjcmlwdABOE2puZWZfbmV3X3R5cGVzY3JpcHQAThN3ZG1kX25ld190eXBlc2NyaXB0AE4Td3FtZF9uZXdfdHlwZXNjcmlwdABOE3dkYW1fbmV3X3R5cGVzY3JpcHQAThN3cWFtX25ld190eXBlc2NyaXB0AE4Td2RtbV9uZXdfdHlwZXNjcmlwdABOE3dxbW1fbmV3X3R5cGVzY3JpcHQAThNlY2FsX25ld190eXBlc2NyaXB0AE4TY2FsbF9uZXdfdHlwZXNjcmlwdABOEmFuZF9uZXdfdHlwZXNjcmlwdABQEmRpdl9uZXdfdHlwZXNjcmlwdABQEWVxX25ld190eXBlc2NyaXB0AFASZXhwX25ld190eXBlc2NyaXB0AFARZ3RfbmV3X3R5cGVzY3JpcHQAUBFsdF9uZXdfdHlwZXNjcmlwdABQE21sb2dfbmV3X3R5cGVzY3JpcHQAUBNtcm9vX25ld190eXBlc2NyaXB0AFASbW9kX25ld190eXBlc2NyaXB0AFASbXVsX25ld190eXBlc2NyaXB0AFARb3JfbmV3X3R5cGVzY3JpcHQAUBJzbGxfbmV3X3R5cGVzY3JpcHQAUBJzcmxfbmV3X3R5cGVzY3JpcHQAUBJzdWJfbmV3X3R5cGVzY3JpcHQAUBJ4b3JfbmV3X3R5cGVzY3JpcHQAUBJtY3BfbmV3X3R5cGVzY3JpcHQAUBNzY3dxX25ld190eXBlc2NyaXB0AFASc3J3X25ld190eXBlc2NyaXB0AFASc3d3X25ld190eXBlc2NyaXB0AFARdHJfbmV3X3R5cGVzY3JpcHQAUBNlY2sxX25ld190eXBlc2NyaXB0AFATZWNyMV9uZXdfdHlwZXNjcmlwdABQE2syNTZfbmV3X3R5cGVzY3JpcHQAUBNzMjU2X25ld190eXBlc2NyaXB0AFASYmFsX25ld190eXBlc2NyaXB0AFASam5lX25ld190eXBlc2NyaXB0AFATYW5kaV9uZXdfdHlwZXNjcmlwdABRE2RpdmlfbmV3X3R5cGVzY3JpcHQAURNleHBpX25ld190eXBlc2NyaXB0AFETbW9kaV9uZXdfdHlwZXNjcmlwdABRE211bGlfbmV3X3R5cGVzY3JpcHQAURJvcmlfbmV3X3R5cGVzY3JpcHQAURNzbGxpX25ld190eXBlc2NyaXB0AFETc3JsaV9uZXdfdHlwZXNjcmlwdABRE3N1YmlfbmV3X3R5cGVzY3JpcHQAURN4b3JpX25ld190eXBlc2NyaXB0AFETam5laV9uZXdfdHlwZXNjcmlwdABREWxiX25ld190eXBlc2NyaXB0AFERbHdfbmV3X3R5cGVzY3JpcHQAURFzYl9uZXdfdHlwZXNjcmlwdABREXN3X25ld190eXBlc2NyaXB0AFETbWNwaV9uZXdfdHlwZXNjcmlwdABRE2puemZfbmV3X3R5cGVzY3JpcHQAURNqbnpiX25ld190eXBlc2NyaXB0AFEOd3FjbV9mcm9tX2FyZ3MAJg53cW9wX2Zyb21fYXJncwAmH19fd2JnX3NldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAPB5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMAPB5fX3diZ19zZXRfZGl2YXJnc19pbmRpcmVjdF9yaHMAPBFqaV9uZXdfdHlwZXNjcmlwdAA4E2Nmc2lfbmV3X3R5cGVzY3JpcHQAOBNwc2hsX25ld190eXBlc2NyaXB0ADgTcHNoaF9uZXdfdHlwZXNjcmlwdAA4E3BvcGxfbmV3X3R5cGVzY3JpcHQAOBNwb3BoX25ld190eXBlc2NyaXB0ADgTd3FvcF9uZXdfdHlwZXNjcmlwdADCARN3ZG1sX25ld190eXBlc2NyaXB0AMIBE3dkZHZfbmV3X3R5cGVzY3JpcHQAwgETd2RvcF9uZXdfdHlwZXNjcmlwdADCARN3cW1sX25ld190eXBlc2NyaXB0AMIBDndxbWxfZnJvbV9hcmdzAB4Td3Fkdl9uZXdfdHlwZXNjcmlwdADCAQ53cWR2X2Zyb21fYXJncwDBARN3cWNtX25ld190eXBlc2NyaXB0AMIBEF9fd2JnX3JlZ2lkX2ZyZWUA2QEQX193YmdfaW1tMjRfZnJlZQDbAQ5fX3diZ19tdWxfZnJlZQC6AQZqbXBfcmEATw5fX3diZ19qbXBfZnJlZQC6AQZjZmVfcmEATw5fX3diZ19jZmVfZnJlZQC6AQ1fX3diZ19nbV9mcmVlALoBD19fd2JnX2puemlfZnJlZQC6AQ9fX3diZ193ZGNtX2ZyZWUAugEOX193Ymdfc3J3X2ZyZWUAugEPX193YmdfbG9nZF9mcmVlALoBDl9fd2JnX3NybF9mcmVlALoBD19fd2JnX2Nyb29fZnJlZQC6AQ9fX3diZ19yZXRkX2ZyZWUAugEPX193Ymdfd3FtbV9mcmVlALoBDV9fd2JnX3NiX2ZyZWUAugEPX193YmdfdGltZV9mcmVlALoBD19fd2JnX3dxbWxfZnJlZQC6AQ9fX3diZ19zdWJpX2ZyZWUAugEOX193Ymdfc3ViX2ZyZWUAugEOX193Ymdfbm90X2ZyZWUAugENX193YmdfbGJfZnJlZQC6AQ9fX3diZ193cWFtX2ZyZWUAugEPX193YmdfczI1Nl9mcmVlALoBBWNiX3JhAE8NX193YmdfY2JfZnJlZQC6AQ9fX3diZ19wb3BoX2ZyZWUAugEPX193YmdfZGl2aV9mcmVlALoBD19fd2JnX21vZGlfZnJlZQC6AQ5fX3diZ19zd3dfZnJlZQC6AQ5fX3diZ19ndGZfZnJlZQC6AQpwb3BoX2ltbTI0ACcNX193YmdfamlfZnJlZQC6AQ9fX3diZ19zcndxX2ZyZWUAugEPX193Ymdfam1wZl9mcmVlALoBD19fd2JnX2syNTZfZnJlZQC6AQ9fX3diZ193ZG9wX2ZyZWUAugEPX193YmdfYW5kaV9mcmVlALoBD19fd2JnX3NsbGlfZnJlZQC6AQ5fX3diZ19tb2RfZnJlZQC6AQpwb3BsX2ltbTI0ACcPX193YmdfcG9wbF9mcmVlALoBD19fd2JnX2Fsb2NfZnJlZQC6AQ9fX3diZ193ZG1kX2ZyZWUAugEPX193YmdfbWxkdl9mcmVlALoBDV9fd2JnX3N3X2ZyZWUAugEPX193Ymdfam5lYl9mcmVlALoBDl9fd2JnX3Ryb19mcmVlALoBDl9fd2JnX29yaV9mcmVlALoBDl9fd2JnX3NsbF9mcmVlALoBD19fd2JnX3dxZHZfZnJlZQC6AQ9fX3diZ193cW1kX2ZyZWUAugEOX193Ymdfam5lX2ZyZWUAugEPX193YmdfbWxvZ19mcmVlALoBD19fd2JnX21pbnRfZnJlZQC6AQ9fX3diZ193cWNtX2ZyZWUAugEPX193YmdfbXVsaV9mcmVlALoBHl9fd2JnX2dldF9tdWxhcmdzX2luZGlyZWN0X2xocwA7D19fd2JnX21jbGlfZnJlZQC6AQ9fX3diZ19qbmVpX2ZyZWUAugEPX193YmdfY3Npel9mcmVlALoBDV9fd2JnX3RyX2ZyZWUAugEPX193YmdfYmxkZF9mcmVlALoBD19fd2JnX2V4cGlfZnJlZQC6AQ9fX3diZ194b3JpX2ZyZWUAugENX193Ymdfb3JfZnJlZQC6AQ9fX3diZ19lY2sxX2ZyZWUAugEHYmhlaV9yYQBPD19fd2JnX2JoZWlfZnJlZQC6AQhqaV9pbW0yNAAnD19fd2JnX2Nmc2lfZnJlZQC6AQ5fX3diZ19tY2xfZnJlZQC6AQ9fX3diZ19qbnpmX2ZyZWUAugEPX193Ymdfc3d3cV9mcmVlALoBDV9fd2JnX2d0X2ZyZWUAugEPX193Ymdfam1wYl9mcmVlALoBDl9fd2JnX2Rpdl9mcmVlALoBD19fd2JnX2J1cm5fZnJlZQC6AR9fX3diZ19nZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADsOX193YmdfeG9yX2ZyZWUAugEHcnZydF9yYQBPD19fd2JnX3J2cnRfZnJlZQC6AQZyZXRfcmEATw5fX3diZ19yZXRfZnJlZQC6AQ9fX3diZ193ZG1sX2ZyZWUAugEPX193YmdfY2FsbF9mcmVlALoBD19fd2JnX3dkbW1fZnJlZQC6AQ9fX3diZ19tY3BpX2ZyZWUAugEPX193YmdfYWRkaV9mcmVlALoBD19fd2JnX2puemJfZnJlZQC6AQ9fX3diZ19tcm9vX2ZyZWUAugEOX193YmdfZXhwX2ZyZWUAugEOX193YmdfYmFsX2ZyZWUAugEGY2ZzX3JhAE8OX193YmdfY2ZzX2ZyZWUAugEPX193YmdfZWQxOV9mcmVlALoBD19fd2JnX3NybGlfZnJlZQC6AQpwc2hsX2ltbTI0ACcPX193YmdfcHNobF9mcmVlALoBDl9fd2JnX21lcV9mcmVlALoBD19fd2JnX2Joc2hfZnJlZQC6AQ5fX3diZ19sZGNfZnJlZQC6AQ9fX3diZ19qbmVmX2ZyZWUAugEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC6AQ9fX3diZ193ZGFtX2ZyZWUAugEOX193YmdfbWNwX2ZyZWUAugENX193YmdfbHRfZnJlZQC6AQ9fX3diZ193cW9wX2ZyZWUAugEOX193YmdfYW5kX2ZyZWUAugEPX193YmdfYnNpel9mcmVlALoBD19fd2JnX3dkZHZfZnJlZQC6AQ9fX3diZ19lY2FsX2ZyZWUAugEKY2ZzaV9pbW0yNAAnD19fd2JnX2NmZWlfZnJlZQC6AQ9fX3diZ19lY3IxX2ZyZWUAugEPX193YmdfbW92aV9mcmVlALoBB2ZsYWdfcmEATw9fX3diZ19mbGFnX2ZyZWUAugEPX193YmdfbW92ZV9mcmVlALoBD19fd2JnX3Njd3FfZnJlZQC6AQ1fX3diZ19lcV9mcmVlALoBDl9fd2JnX3Ntb19mcmVlALoBDl9fd2JnX2xvZ19mcmVlALoBDl9fd2JnX2NjcF9mcmVlALoBDV9fd2JnX2x3X2ZyZWUAugETam5lYl9uZXdfdHlwZXNjcmlwdABOCndxZHZfaW1tMDYAGAp3cW1sX2ltbTA2ABgKd2RtbF9pbW0wNgAYCndxb3BfaW1tMDYAGAp3ZG9wX2ltbTA2ABgKd3FjbV9pbW0wNgAYCndkZHZfaW1tMDYAGAp3ZGNtX2ltbTA2ABgKam5lZl9pbW0wNgAYCWxkY19pbW0wNgAYBm11bF9yYQAWB3dkY21fcmMADwd3ZGNtX3JiAAsHd2RjbV9yYQAWBnNyd19yYwAPBnNyd19yYgALBnNyd19yYQAWBm11bF9yYwAPBm11bF9yYgALB2xvZ2RfcmEAFgZzcmxfcmMADwZzcmxfcmIACwZzcmxfcmEAFgdsb2dkX3JiAAsHam56aV9yYQAWB3JldGRfcmIACwdyZXRkX3JhABYHd3FtbV9yZAAYB3dxbW1fcmMADwd3cW1tX3JiAAsHd3FtbV9yYQAWBXNiX3JiAAsFc2JfcmEAFgd0aW1lX3JiAAsHdGltZV9yYQAWB3dxbWxfcmMADwd3cW1sX3JiAAsHd3FtbF9yYQAWCnN1YmlfaW1tMTIADAdzdWJpX3JiAAsHc3ViaV9yYQAWBnN1Yl9yYwAPBnN1Yl9yYgALBnN1Yl9yYQAWBm5vdF9yYgALBm5vdF9yYQAWCHNiX2ltbTEyAAwFbGJfcmIACwVsYl9yYQAWB3dxYW1fcmQAGAd3cWFtX3JjAA8Hd3FhbV9yYgALB3dxYW1fcmEAFgdzMjU2X3JjAA8HczI1Nl9yYgALB3MyNTZfcmEAFghsYl9pbW0xMgAMB2RpdmlfcmIACwdkaXZpX3JhABYKbW9kaV9pbW0xMgAMB21vZGlfcmIACwdtb2RpX3JhABYGc3d3X3JjAA8Gc3d3X3JiAAsGc3d3X3JhABYJZ3RmX2ltbTEyAAwGZ3RmX3JiAAsGZ3RmX3JhABYHc3J3cV9yZAAYB3Nyd3FfcmMADwdzcndxX3JiAAsHc3J3cV9yYQAWCmpuemlfaW1tMTgACQdqbXBmX3JhABYHbG9nZF9yYwAPB2syNTZfcmIACwdrMjU2X3JhABYHd2RvcF9yYwAPB3dkb3BfcmIACwd3ZG9wX3JhABYKZGl2aV9pbW0xMgAMB2Nyb29fcmIACwdjcm9vX3JhABYKc2xsaV9pbW0xMgAMB3NsbGlfcmIACwdzbGxpX3JhABYGbW9kX3JjAA8GbW9kX3JiAAsGbW9kX3JhABYKYW5kaV9pbW0xMgAMB2FuZGlfcmIACwdhbmRpX3JhABYHd2RtZF9yZAAYB3dkbWRfcmMADwd3ZG1kX3JiAAsHd2RtZF9yYQAWB21sZHZfcmQAGAdtbGR2X3JjAA8HbWxkdl9yYgALB21sZHZfcmEAFghzd19pbW0xMgAMBXN3X3JiAAsFc3dfcmEAFgdrMjU2X3JjAA8Ham5lYl9yYgALB2puZWJfcmEAFgZ0cm9fcmQAGAZ0cm9fcmMADwZ0cm9fcmIACwZ0cm9fcmEAFglvcmlfaW1tMTIADAZvcmlfcmIACwZvcmlfcmEAFgZzbGxfcmMADwZzbGxfcmIACwZzbGxfcmEAFgd3cWR2X3JjAA8Hd3Fkdl9yYgALB3dxZHZfcmEAFgd3cW1kX3JkABgHd3FtZF9yYwAPB3dxbWRfcmIACwd3cW1kX3JhABYHam5lYl9yYwAPBmpuZV9yYgALBmpuZV9yYQAWB21sb2dfcmMADwdtbG9nX3JiAAsHbWxvZ19yYQAWB21pbnRfcmIACwdtaW50X3JhABYHd3FjbV9yYwAPB3dxY21fcmIACwd3cWNtX3JhABYKbXVsaV9pbW0xMgAMB211bGlfcmIACwdtdWxpX3JhABYKbWNsaV9pbW0xOAAJB21jbGlfcmEAFgpqbmVpX2ltbTEyAAwHam5laV9yYgALB2puZWlfcmEAFgdjc2l6X3JiAAsHY3Npel9yYQAWBXRyX3JjAA8FdHJfcmIACwV0cl9yYQAWB2xvZ2RfcmQAGAZqbmVfcmMADwdibGRkX3JiAAsHYmxkZF9yYQAWCmV4cGlfaW1tMTIADAdleHBpX3JiAAsHZXhwaV9yYQAWCnhvcmlfaW1tMTIADAd4b3JpX3JiAAsHeG9yaV9yYQAWBW9yX3JjAA8Fb3JfcmIACwVvcl9yYQAWB2VjazFfcmMADwdlY2sxX3JiAAsHZWNrMV9yYQAWBm1jbF9yYgALBm1jbF9yYQAWCmpuemZfaW1tMTIADAdqbnpmX3JiAAsHam56Zl9yYQAWB3N3d3FfcmQAGAdzd3dxX3JjAA8Hc3d3cV9yYgALB3N3d3FfcmEAFgVndF9yYwAPBWd0X3JiAAsFZ3RfcmEAFgpqbXBmX2ltbTE4AAkHam1wYl9yYQAWBmRpdl9yYwAPBmRpdl9yYgALBmRpdl9yYQAWB2J1cm5fcmIACwdidXJuX3JhABYTX193YmdfbWF0aGFyZ3NfZnJlZQB7Bnhvcl9yYwAPBnhvcl9yYgALBnhvcl9yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWB2NhbGxfcmQAGAdjYWxsX3JjAA8HY2FsbF9yYgALB2NhbGxfcmEAFgd3ZG1tX3JkABgHd2RtbV9yYwAPB3dkbW1fcmIACwd3ZG1tX3JhABYKbWNwaV9pbW0xMgAMB21jcGlfcmIACwdtY3BpX3JhABYHYmxkZF9yYwAPB2FkZGlfcmIACwdhZGRpX3JhABYKam56Yl9pbW0xMgAMB2puemJfcmIACwdqbnpiX3JhABYHbXJvb19yYwAPB21yb29fcmIACwdtcm9vX3JhABYGZXhwX3JjAA8GZXhwX3JiAAsGZXhwX3JhABYGYmFsX3JjAA8GYmFsX3JiAAsGYmFsX3JhABYHZWQxOV9yZAAYB2VkMTlfcmMADwdlZDE5X3JiAAsHZWQxOV9yYQAWCnNybGlfaW1tMTIADAdzcmxpX3JiAAsHc3JsaV9yYQAWBm1lcV9yZAAYBm1lcV9yYwAPBm1lcV9yYgALBm1lcV9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYGbGRjX3JjAA8GbGRjX3JiAAsGbGRjX3JhABYHam5lZl9yYwAPB2puZWZfcmIACwdqbmVmX3JhABYHd2RhbV9yZAAYB3dkYW1fcmMADwd3ZGFtX3JiAAsHd2RhbV9yYQAWBm1jcF9yYwAPBm1jcF9yYgALBm1jcF9yYQAWBWx0X3JjAA8FbHRfcmIACwVsdF9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWBmFuZF9yYwAPBmFuZF9yYgALBmFuZF9yYQAWB2JzaXpfcmIACwdic2l6X3JhABYHd2Rkdl9yYwAPB3dkZHZfcmIACwd3ZGR2X3JhABYHZWNhbF9yZAAYB2VjYWxfcmMADwdlY2FsX3JiAAsHZWNhbF9yYQAWB2VjcjFfcmMADwdlY3IxX3JiAAsHZWNyMV9yYQAWCm1vdmlfaW1tMTgACQdtb3ZpX3JhABYKam1wYl9pbW0xOAAJBWdtX3JhABYHbW92ZV9yYgALB21vdmVfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgVlcV9yYwAPBWVxX3JiAAsFZXFfcmEAFgZzbW9fcmQAGAZzbW9fcmMADwZzbW9fcmIACwZzbW9fcmEAFgZsb2dfcmQAGAZsb2dfcmMADwZsb2dfcmIACwZsb2dfcmEAFgZjY3BfcmQAGAZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFghsd19pbW0xMgAMBWx3X3JiAAsFbHdfcmEAFhtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAugEfX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcgDOARNfX3diaW5kZ2VuX2V4cG9ydF8wAM0BCREBAEEBCwYC0QHSAdMB7wHMAQrygQH7AYkjAgh/AX4CQAJAAkACQAJAAkACQAJAIABB9QFPBEAgAEHN/3tPDQUgAEELaiIAQXhxIQVBgI3AACgCACIIRQ0EQQAgBWshBAJ/QQAgBUGAAkkNABpBHyAFQf///wdLDQAaIAVBBiAAQQh2ZyIAa3ZBAXEgAEEBdGtBPmoLIgdBAnRB5InAAGooAgAiAUUEQEEAIQAMAgtBACEAIAVBGSAHQQF2a0EAIAdBH0cbdCEDA0ACQCABKAIEQXhxIgYgBUkNACAGIAVrIgYgBE8NACABIQIgBiIEDQBBACEEIAEhAAwECyABQRRqKAIAIgYgACAGIAEgA0EddkEEcWpBEGooAgAiAUcbIAAgBhshACADQQF0IQMgAQ0ACwwBC0H8jMAAKAIAIgJBECAAQQtqQXhxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIBQQN0IgBB9IrAAGoiAyAAQfyKwABqKAIAIgAoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQfyMwAAgAkF+IAF3cTYCAAsgACABQQN0IgFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMCAsgBUGEjcAAKAIATQ0DAkACQCABRQRAQYCNwAAoAgAiAEUNBiAAaEECdEHkicAAaigCACIBKAIEQXhxIAVrIQQgASECA0ACQCABKAIQIgANACABQRRqKAIAIgANACACKAIYIQcCQAJAIAIgAigCDCIARgRAIAJBFEEQIAJBFGoiACgCACIDG2ooAgAiAQ0BQQAhAAwCCyACKAIIIgEgADYCDCAAIAE2AggMAQsgACACQRBqIAMbIQMDQCADIQYgASIAQRRqIgEgAEEQaiABKAIAIgEbIQMgAEEUQRAgARtqKAIAIgENAAsgBkEANgIACyAHRQ0EIAIgAigCHEECdEHkicAAaiIBKAIARwRAIAdBEEEUIAcoAhAgAkYbaiAANgIAIABFDQUMBAsgASAANgIAIAANA0GAjcAAQYCNwAAoAgBBfiACKAIcd3E2AgAMBAsgACgCBEF4cSAFayIBIAQgASAESSIBGyEEIAAgAiABGyECIAAhAQwACwALAkBBAiAAdCIDQQAgA2tyIAEgAHRxaCIAQQN0IgFB9IrAAGoiAyABQfyKwABqKAIAIgEoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQfyMwAAgAkF+IAB3cTYCAAsgASAFQQNyNgIEIAEgBWoiBiAAQQN0IgAgBWsiBEEBcjYCBCAAIAFqIAQ2AgBBhI3AACgCACICBEAgAkF4cUH0isAAaiEAQYyNwAAoAgAhAwJ/QfyMwAAoAgAiBUEBIAJBA3Z0IgJxRQRAQfyMwAAgAiAFcjYCACAADAELIAAoAggLIQIgACADNgIIIAIgAzYCDCADIAA2AgwgAyACNgIIC0GMjcAAIAY2AgBBhI3AACAENgIAIAFBCGoPCyAAIAc2AhggAigCECIBBEAgACABNgIQIAEgADYCGAsgAkEUaigCACIBRQ0AIABBFGogATYCACABIAA2AhgLAkACQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiBSAEQQFyNgIEIAQgBWogBDYCAEGEjcAAKAIAIgNFDQEgA0F4cUH0isAAaiEAQYyNwAAoAgAhAQJ/QfyMwAAoAgAiBkEBIANBA3Z0IgNxRQRAQfyMwAAgAyAGcjYCACAADAELIAAoAggLIQMgACABNgIIIAMgATYCDCABIAA2AgwgASADNgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIEDAELQYyNwAAgBTYCAEGEjcAAIAQ2AgALIAJBCGoPCyAAIAJyRQRAQQAhAkECIAd0IgBBACAAa3IgCHEiAEUNAyAAaEECdEHkicAAaigCACEACyAARQ0BCwNAIAAgAiAAKAIEQXhxIgMgBWsiBiAESSIHGyEIIAAoAhAiAUUEQCAAQRRqKAIAIQELIAIgCCADIAVJIgAbIQIgBCAGIAQgBxsgABshBCABIgANAAsLIAJFDQAgBUGEjcAAKAIAIgBNIAQgACAFa09xDQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNAyACIAIoAhxBAnRB5InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0EDAMLIAEgADYCACAADQJBgI3AAEGAjcAAKAIAQX4gAigCHHdxNgIADAMLAkACQAJAAkACQCAFQYSNwAAoAgAiAUsEQCAFQYiNwAAoAgAiAE8EQEEAIQQgBUGvgARqIgBBEHZAACIBQX9GIgMNByABQRB0IgJFDQdBlI3AAEEAIABBgIB8cSADGyIEQZSNwAAoAgBqIgA2AgBBmI3AAEGYjcAAKAIAIgEgACAAIAFJGzYCAAJAAkBBkI3AACgCACIDBEBB5IrAACEAA0AgACgCACIBIAAoAgQiBmogAkYNAiAAKAIIIgANAAsMAgtBoI3AACgCACIAQQAgACACTRtFBEBBoI3AACACNgIAC0GkjcAAQf8fNgIAQeiKwAAgBDYCAEHkisAAIAI2AgBBgIvAAEH0isAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQbiLwABBrIvAADYCAEGsi8AAQaSLwAA2AgBB8IrAAEEANgIAQcCLwABBtIvAADYCAEG0i8AAQayLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEH0i8AAQeyLwAA2AgBBgIzAAEH0i8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEH4jMAAQeyMwAA2AgBB7IzAAEHkjMAANgIAQZCNwAAgAjYCAEH0jMAAQeyMwAA2AgBBiI3AACAEQShrIgA2AgAgAiAAQQFyNgIEIAAgAmpBKDYCBEGcjcAAQYCAgAE2AgAMCAsgAiADTSABIANLcg0AIAAoAgxFDQMLQaCNwABBoI3AACgCACIAIAIgACACSRs2AgAgAiAEaiEBQeSKwAAhAAJAAkADQCABIAAoAgBHBEAgACgCCCIADQEMAgsLIAAoAgxFDQELQeSKwAAhAANAAkAgAyAAKAIAIgFPBEAgASAAKAIEaiIGIANLDQELIAAoAgghAAwBCwtBkI3AACACNgIAQYiNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBnI3AAEGAgIABNgIAIAMgBkEga0F4cUEIayIAIAAgA0EQakkbIgFBGzYCBEHkisAAKQIAIQkgAUEQakHsisAAKQIANwIAIAEgCTcCCEHoisAAIAQ2AgBB5IrAACACNgIAQeyKwAAgAUEIajYCAEHwisAAQQA2AgAgAUEcaiEAA0AgAEEHNgIAIABBBGoiACAGSQ0ACyABIANGDQcgASABKAIEQX5xNgIEIAMgASADayIAQQFyNgIEIAEgADYCACAAQYACTwRAIAMgABAIDAgLIABBeHFB9IrAAGohAQJ/QfyMwAAoAgAiAkEBIABBA3Z0IgBxRQRAQfyMwAAgACACcjYCACABDAELIAEoAggLIQAgASADNgIIIAAgAzYCDCADIAE2AgwgAyAANgIIDAcLIAAgAjYCACAAIAAoAgQgBGo2AgQgAiAFQQNyNgIEIAEgAiAFaiIDayEFIAFBkI3AACgCAEYNAyABQYyNwAAoAgBGDQQgASgCBCIEQQNxQQFGBEAgASAEQXhxIgAQByAAIAVqIQUgACABaiIBKAIEIQQLIAEgBEF+cTYCBCADIAVBAXI2AgQgAyAFaiAFNgIAIAVBgAJPBEAgAyAFEAgMBgsgBUF4cUH0isAAaiEAAn9B/IzAACgCACIBQQEgBUEDdnQiBHFFBEBB/IzAACABIARyNgIAIAAMAQsgACgCCAshBSAAIAM2AgggBSADNgIMIAMgADYCDCADIAU2AggMBQtBiI3AACAAIAVrIgE2AgBBkI3AAEGQjcAAKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGohBAwGC0GMjcAAKAIAIQACQCABIAVrIgJBD00EQEGMjcAAQQA2AgBBhI3AAEEANgIAIAAgAUEDcjYCBCAAIAFqIgEgASgCBEEBcjYCBAwBC0GEjcAAIAI2AgBBjI3AACAAIAVqIgM2AgAgAyACQQFyNgIEIAAgAWogAjYCACAAIAVBA3I2AgQLDAgLIAAgBCAGajYCBEGQjcAAQZCNwAAoAgAiAEEPakF4cSIBQQhrIgI2AgBBiI3AAEGIjcAAKAIAIARqIgMgACABa2pBCGoiATYCACACIAFBAXI2AgQgACADakEoNgIEQZyNwABBgICAATYCAAwDC0GQjcAAIAM2AgBBiI3AAEGIjcAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEDAELQYyNwAAgAzYCAEGEjcAAQYSNwAAoAgAgBWoiADYCACADIABBAXI2AgQgACADaiAANgIACyACQQhqDwtBACEEQYiNwAAoAgAiACAFTQ0AQYiNwAAgACAFayIBNgIAQZCNwABBkI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBAwDCyAEDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAIARBEE8EQCACIAVBA3I2AgQgAiAFaiIBIARBAXI2AgQgASAEaiAENgIAIARBgAJPBEAgASAEEAgMAgsgBEF4cUH0isAAaiEAAn9B/IzAACgCACIDQQEgBEEDdnQiBHFFBEBB/IzAACADIARyNgIAIAAMAQsgACgCCAshBCAAIAE2AgggBCABNgIMIAEgADYCDCABIAQ2AggMAQsgAiAEIAVqIgBBA3I2AgQgACACaiIAIAAoAgRBAXI2AgQLIAJBCGoPCyAAQQhqC+0LAQt/IAAoAgQhByAAKAIAIQUCQAJAAkAgASgCACIKIAEoAggiAHIEQAJAIABFDQAgBSAHaiEJIAFBDGooAgBBAWohBiAFIQIDQAJAIAIhACAGQQFrIgZFDQAgACAJRg0CAn8gACwAACIEQQBOBEAgBEH/AXEhBCAAQQFqDAELIAAtAAFBP3EhCCAEQR9xIQIgBEFfTQRAIAJBBnQgCHIhBCAAQQJqDAELIAAtAAJBP3EgCEEGdHIhCCAEQXBJBEAgCCACQQx0ciEEIABBA2oMAQsgAkESdEGAgPAAcSAALQADQT9xIAhBBnRyciIEQYCAxABGDQMgAEEEagsiAiADIABraiEDIARBgIDEAEcNAQwCCwsgACAJRg0AIAAsAAAiAkEATiACQWBJciACQXBJckUEQCACQf8BcUESdEGAgPAAcSAALQADQT9xIAAtAAJBP3FBBnQgAC0AAUE/cUEMdHJyckGAgMQARg0BCwJAAkAgA0UNACADIAdPBEBBACEAIAMgB0YNAQwCC0EAIQAgAyAFaiwAAEFASA0BCyAFIQALIAMgByAAGyEHIAAgBSAAGyEFCyAKRQ0DIAEoAgQhCyAHQRBPBEAgByAFIAVBA2pBfHEiBGsiBmoiCkEDcSEIQQAhCUEAIQAgBCAFRwRAIAQgBUF/c2pBA08EQEEAIQMDQCAAIAMgBWoiAiwAAEG/f0pqIAJBAWosAABBv39KaiACQQJqLAAAQb9/SmogAkEDaiwAAEG/f0pqIQAgA0EEaiIDDQALCyAFIQIDQCAAIAIsAABBv39KaiEAIAJBAWohAiAGQQFqIgYNAAsLAkAgCEUNACAEIApBfHFqIgIsAABBv39KIQkgCEEBRg0AIAkgAiwAAUG/f0pqIQkgCEECRg0AIAkgAiwAAkG/f0pqIQkLIApBAnYhCCAAIAlqIQMDQCAEIQYgCEUNBEHAASAIIAhBwAFPGyIJQQNxIQogCUECdCEEQQAhAiAJQQRPBEAgBiAEQfAHcWohDCAGIQADQCACIAAoAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEEaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQhqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBDGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWohAiAAQRBqIgAgDEcNAAsLIAggCWshCCAEIAZqIQQgAkEIdkH/gfwHcSACQf+B/AdxakGBgARsQRB2IANqIQMgCkUNAAsgBiAJQfwBcUECdGoiAigCACIAQX9zQQd2IABBBnZyQYGChAhxIQAgCkEBRg0CIAAgAigCBCIAQX9zQQd2IABBBnZyQYGChAhxaiEAIApBAkYNAiAAIAIoAggiAEF/c0EHdiAAQQZ2ckGBgoQIcWohAAwCCyAHRQRAQQAhAwwDCyAHQQNxIQICQCAHQQRJBEBBACEDQQAhBgwBC0EAIQMgBSEAIAdBfHEiBiEEA0AgAyAALAAAQb9/SmogAEEBaiwAAEG/f0pqIABBAmosAABBv39KaiAAQQNqLAAAQb9/SmohAyAAQQRqIQAgBEEEayIEDQALCyACRQ0CIAUgBmohAANAIAMgACwAAEG/f0pqIQMgAEEBaiEAIAJBAWsiAg0ACwwCCwwCCyAAQQh2Qf+BHHEgAEH/gfwHcWpBgYAEbEEQdiADaiEDCwJAIAMgC0kEQCALIANrIQNBACEAAkACQAJAIAEtACBBAWsOAgABAgsgAyEAQQAhAwwBCyADQQF2IQAgA0EBakEBdiEDCyAAQQFqIQAgAUEYaigCACECIAEoAhAhBiABKAIUIQEDQCAAQQFrIgBFDQIgASAGIAIoAhARAwBFDQALQQEPCwwBC0EBIQAgASAFIAcgAigCDBEAAAR/QQEFQQAhAAJ/A0AgAyAAIANGDQEaIABBAWohACABIAYgAigCEBEDAEUNAAsgAEEBawsgA0kLDwsgASgCFCAFIAcgAUEYaigCACgCDBEAAAumBgINfwF+IwBBMGsiByQAQSchAgJAIABCkM4AVARAIAAhDwwBCwNAIAdBCWogAmoiBkEEayAAQpDOAIAiD0LwsQN+IAB8pyIEQf//A3FB5ABuIgNBAXRB0IbAAGovAAA7AAAgBkECayADQZx/bCAEakH//wNxQQF0QdCGwABqLwAAOwAAIAJBBGshAiAAQv/B1y9WIA8hAA0ACwsgD6ciBEHjAEsEQCACQQJrIgIgB0EJamogD6ciA0H//wNxQeQAbiIEQZx/bCADakH//wNxQQF0QdCGwABqLwAAOwAACwJAIARBCk8EQCACQQJrIgIgB0EJamogBEEBdEHQhsAAai8AADsAAAwBCyACQQFrIgIgB0EJamogBEEwajoAAAtBJyACayEIQQEhBUErQYCAxAAgASgCHCIEQQFxIgwbIQkgBEEddEEfdUHwiMAAcSEKIAdBCWogAmohCwJAIAEoAgBFBEAgASgCFCIDIAEoAhgiASAJIAoQSA0BIAMgCyAIIAEoAgwRAAAhBQwBCyABKAIEIg0gCCAMaiIDTQRAIAEoAhQiAyABKAIYIgEgCSAKEEgNASADIAsgCCABKAIMEQAAIQUMAQsgBEEIcQRAIAEoAhAhBCABQTA2AhAgAS0AICEDIAFBAToAICABKAIUIg4gASgCGCIGIAkgChBIDQEgAiANaiAMa0EmayECA0AgAkEBayICBEAgDkEwIAYoAhARAwBFDQEMAwsLIA4gCyAIIAYoAgwRAAANASABIAM6ACAgASAENgIQQQAhBQwBCyANIANrIQMCQAJAAkAgAS0AICICQQFrDgMAAQACCyADIQJBACEDDAELIANBAXYhAiADQQFqQQF2IQMLIAJBAWohAiABQRhqKAIAIQYgASgCECEEIAEoAhQhAQJAA0AgAkEBayICRQ0BIAEgBCAGKAIQEQMARQ0ACwwBCyABIAYgCSAKEEgNACABIAsgCCAGKAIMEQAADQBBACECA0AgAiADRgRAQQAhBQwCCyACQQFqIQIgASAEIAYoAhARAwBFDQALIAJBAWsgA0khBQsgB0EwaiQAIAUL/AUBBX8gAEEIayIBIABBBGsoAgAiA0F4cSIAaiECAkACQAJAAkAgA0EBcQ0AIANBA3FFDQEgASgCACIDIABqIQAgASADayIBQYyNwAAoAgBGBEAgAigCBEEDcUEDRw0BQYSNwAAgADYCACACIAIoAgRBfnE2AgQgASAAQQFyNgIEIAIgADYCAA8LIAEgAxAHCwJAAkAgAigCBCIDQQJxRQRAIAJBkI3AACgCAEYNAiACQYyNwAAoAgBGDQUgAiADQXhxIgIQByABIAAgAmoiAEEBcjYCBCAAIAFqIAA2AgAgAUGMjcAAKAIARw0BQYSNwAAgADYCAA8LIAIgA0F+cTYCBCABIABBAXI2AgQgACABaiAANgIACyAAQYACSQ0CIAEgABAIQQAhAUGkjcAAQaSNwAAoAgBBAWsiADYCACAADQFB7IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GkjcAAQf8fIAEgAUH/H00bNgIADwtBkI3AACABNgIAQYiNwABBiI3AACgCACAAaiIANgIAIAEgAEEBcjYCBEGMjcAAKAIAIAFGBEBBhI3AAEEANgIAQYyNwABBADYCAAsgAEGcjcAAKAIAIgNNDQBBkI3AACgCACICRQ0AQQAhAQJAQYiNwAAoAgAiBEEpSQ0AQeSKwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0HsisAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQaSNwABB/x8gASABQf8fTRs2AgAgAyAETw0AQZyNwABBfzYCAAsPCyAAQXhxQfSKwABqIQICf0H8jMAAKAIAIgNBASAAQQN2dCIAcUUEQEH8jMAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCA8LQYyNwAAgATYCAEGEjcAAQYSNwAAoAgAgAGoiADYCACABIABBAXI2AgQgACABaiAANgIAC/sEAQF/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBgARrDiYBAgMEBQYHCCwJCgsMDSwsLCwsLCwsLCwsLCwsLCwsLA4PLCwsEAALQQEhAQJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEBaw4OQQECAwQFBkIHCAkKCwwACwJAIABBwARrDgwnKCkqKywtLi8wMTIACwJAIABBgQJrDgoNDg8QERITFBUWAAsCQCAAQYAGaw4JMzQ1NjdCQjg5AAsCQCAAQYAKaw4FPD0+P0AACyAAQYAIaw4COTpBC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EJDwtBCg8LQQsPC0EMDwtBDQ8LQQ4PC0GBAg8LQYICDwtBgwIPC0GEAg8LQYUCDwtBhgIPC0GHAg8LQYgCDwtBiQIPC0GKAg8LQYAEDwtBgQQPC0GCBA8LQYMEDwtBhAQPC0GFBA8LQYYEDwtBhwQPC0GJBA8LQYoEDwtBiwQPC0GMBA8LQY0EDwtBoAQPC0GhBA8LQaUEDwtBwAQPC0HBBA8LQcIEDwtBwwQPC0HEBA8LQcUEDwtBxgQPC0HHBA8LQcgEDwtByQQPC0HKBA8LQcsEDwtBgAYPC0GBBg8LQYIGDwtBgwYPC0GEBg8LQYcGDwtBiAYPC0GACA8LQYEIDwtBgAoPC0GBCg8LQYIKDwtBgwoPC0GECiEBCyABDwtB4ILAAEEZENQBAAv4AwECfyAAIAFqIQICQAJAIAAoAgQiA0EBcQ0AIANBA3FFDQEgACgCACIDIAFqIQEgACADayIAQYyNwAAoAgBGBEAgAigCBEEDcUEDRw0BQYSNwAAgATYCACACIAIoAgRBfnE2AgQgACABQQFyNgIEIAIgATYCAA8LIAAgAxAHCwJAAkACQCACKAIEIgNBAnFFBEAgAkGQjcAAKAIARg0CIAJBjI3AACgCAEYNAyACIANBeHEiAhAHIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQYyNwAAoAgBHDQFBhI3AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAgMAwsgAUF4cUH0isAAaiECAn9B/IzAACgCACIDQQEgAUEDdnQiAXFFBEBB/IzAACABIANyNgIAIAIMAQsgAigCCAshASACIAA2AgggASAANgIMIAAgAjYCDCAAIAE2AggPC0GQjcAAIAA2AgBBiI3AAEGIjcAAKAIAIAFqIgE2AgAgACABQQFyNgIEIABBjI3AACgCAEcNAUGEjcAAQQA2AgBBjI3AAEEANgIADwtBjI3AACAANgIAQYSNwABBhI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAIAFqIAE2AgALC/sCAQR/IAAoAgwhAgJAAkAgAUGAAk8EQCAAKAIYIQMCQAJAIAAgAkYEQCAAQRRBECAAQRRqIgIoAgAiBBtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIAIgAEEQaiAEGyEEA0AgBCEFIAEiAkEUaiIBIAJBEGogASgCACIBGyEEIAJBFEEQIAEbaigCACIBDQALIAVBADYCAAsgA0UNAiAAIAAoAhxBAnRB5InAAGoiASgCAEcEQCADQRBBFCADKAIQIABGG2ogAjYCACACRQ0DDAILIAEgAjYCACACDQFBgI3AAEGAjcAAKAIAQX4gACgCHHdxNgIADAILIAAoAggiACACRwRAIAAgAjYCDCACIAA2AggPC0H8jMAAQfyMwAAoAgBBfiABQQN2d3E2AgAPCyACIAM2AhggACgCECIBBEAgAiABNgIQIAEgAjYCGAsgAEEUaigCACIARQ0AIAJBFGogADYCACAAIAI2AhgLC6wCAQR/QR8hAiAAQgA3AhAgAUH///8HTQRAIAFBBiABQQh2ZyIDa3ZBAXEgA0EBdGtBPmohAgsgACACNgIcIAJBAnRB5InAAGohBAJAQYCNwAAoAgAiBUEBIAJ0IgNxRQRAQYCNwAAgAyAFcjYCACAEIAA2AgAgACAENgIYDAELAkACQCABIAQoAgAiAygCBEF4cUYEQCADIQIMAQsgAUEZIAJBAXZrQQAgAkEfRxt0IQQDQCADIARBHXZBBHFqQRBqIgUoAgAiAkUNAiAEQQF0IQQgAiEDIAIoAgRBeHEgAUcNAAsLIAIoAggiASAANgIMIAIgADYCCCAAQQA2AhggACACNgIMIAAgATYCCA8LIAUgADYCACAAIAM2AhgLIAAgADYCDCAAIAA2AggLaQEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENcBIgBBgAZxQQh0IABBCHZBgP4DcSAAQRh2cnIQvgEgAUEQaiQAC3kBA38gARDGAQJAIAEoAgAiAkF/RwRAIAEgAkEBajYCACABKAIEKAAAIgNBGHRBFnVB/ILAAGooAgAhBEEBQQQQyQEiAkUNASACIAQgA0GAfnFyNgAAIAEgASgCAEEBazYCACAAQQQ2AgQgACACNgIADwsQ0AEACwALZgEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENcBIgBBgAZxQQh0IABBCHZBgOADcXJBDHYQvQEgAUEQaiQAC24BAn8jAEEQayIBJAAgAUEIaiAAEEsgASgCCCIALwAAIABBAmotAABBEHRyENcBIQAgASgCDCICIAIoAgBBAWs2AgBBCEEEELwBIgIgAEEIdkGAHnEgAEEYdnI7AQQgAkEANgIAIAFBEGokACACC20BAX8jAEEwayIBJAAgASAAOgAPIABB/wFxQcAATwRAIAFBHGpCATcCACABQQI2AhQgAUH0gMAANgIQIAFBAjYCLCABIAFBKGo2AhggASABQQ9qNgIoIAFBEGpBhIHAABBKAAsgAUEwaiQAIAALbgEBfyMAQTBrIgEkACABIAA7AQ4gAEH//wNxQYAgTwRAIAFBHGpCATcCACABQQI2AhQgAUG4gcAANgIQIAFBAzYCLCABIAFBKGo2AhggASABQQ5qNgIoIAFBEGpByIHAABBKAAsgAUEwaiQAIAALXQEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENcBIgBBHnYgAEEOdkE8cXIQvQEgAUEQaiQACxUAIABBjILAAEH8gcAAQYCAEBDzAQsWACAAQdCCwABBwILAAEGAgIAIEPMBC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILVQIBfwF+IwBBEGsiAiQAIAEQxgEgAkEIaiABEFUgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIp0EBcToAASAAIANCIIinQQFxOgAAIAJBEGokAAsQACAAIAEgAiADQeIAEPYBCxAAIAAgASACIANB4wAQ9gELTwEDfyMAQRBrIgEkACABQQhqIAAQSyABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyEMoBEL0BIAFBEGokAAtSAQF/IAAQUiECIAEQVCEAQQhBBBC8ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABC1UBA38jAEEQayIBJAAgAUEIaiAAEEsgASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDXAUEYdkE/cRC9ASABQRBqJAALEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQtRAgF/AX4jAEEQayICJAAgARDGASACQQhqIAEQVSACKAIMQQA2AgAgASkCACEDIAEQBCAAIANCKIg8AAEgACADQiCIp0EBcToAACACQRBqJAALPgEBfyMAQRBrIgQkACAAEFIgARBSIAIQUiAEQQhqIAMQEyAELQAIQQFxIAQtAAlBAXEQfhCuASAEQRBqJAALSQEBfyAAEFIhACABEFIhAUEIQQQQvAEiAiABQf8BcUEMdCAAQRJ0ciIAQYDgA3FBCHQgAEEIdkGA/gNxckEIdq1CIIY3AgAgAgsMACAAIAFBywAQ+AELDAAgACABQcwAEPgBCwwAIAAgAUHNABD4AQsMACAAIAFBzgAQ+AELDAAgACABQc8AEPgBCwwAIAAgAUHQABD4AQs8AQF/IwBBEGsiBCQAIAAQUiABEFIgAhBSIARBCGogAxAdIAQtAAhBAXEgBC0ACRDAARCuASAEQRBqJAALSAAgABDGASAAKAIAQX9GBEAQ0AEACyAALwAEIABBBmotAABBEHRyENcBIgBBgP4DcUEIdCAAQQh2QYD+A3EgAEEYdnJyEL4BCwsAIAAgAUEHEPkBCz8BAn8CQCAAEFIiAEEYcQ0AIABBB3EiAkEHRg0AQQhBBBC8ASIBIABBBXZBAXGtQiCGIAKtQiiGhDcCAAsgAQsLACAAIAFBCBD5AQs/ACACQRZ0QYCAgAZxIAFB/wFxQQx0IgEgAkH8AXFBBnRyQYD+A3FBCHQgASAAQRJ0ckEIdkGA/gNxckEIdnILCwAgACABQQoQ+gELCwAgACABQQwQ+gELCwAgACABQRQQ+gELCwAgACABQRYQ+gELCwAgACABQRkQ+gELCwAgACABQRsQ+gELCwAgACABQR4Q+gELCwAgACABQR8Q+gELCwAgACABQSQQ+gELCwAgACABQTIQ+gELPwAgABBSIQAgARBUIgFBEHRBgID8B3EgAEH/AXFBEnQgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyEK4BCwwAIAAgAUHtABD6AQtAAQF/IAAQVCEAQQhBBBC8ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDGASABQQhqIAAQTCABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxgEgAUEIaiAAEEwgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMYBIAJBCGogABBVIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDGASACQQhqIAAQVSACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxgEgAUEIaiAAEFUgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBLIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEsgASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD7AQsKACAAQdYAEPsBCwoAIABB1wAQ+wELCgAgAEHaABD7AQsKACAAQdsAEPsBCwoAIABB3AAQ+wELCgAgAEHdABD7AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyEL0BIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQcCGwAA2AhAgAkHwiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHwiMAANgIIIABBKzYCHCAAQZiIwAA2AhggACAAQRhqNgIAIABB4IjAABBKAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQeCJwABB4InAACgCACIAQQFqNgIAAkAgAEEASA0AQayNwAAtAABBAXENAEGsjcAAQQE6AABBqI3AAEGojcAAKAIAQQFqNgIAQdyJwAAoAgBBAEgNAEGsjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxgEgASgCACICQX9GBEAQ0AEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQ0AEACzUBAX8gAEE5TwRAQeCCwABBGRDUAQALQQxBBBC8ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUiABEFIgAhBSIAMQUhASIQBBCEEEELwBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMYBIAAoAgBBf0YEQBDQAQALIAAvAAQgAEEGai0AAEEQdHIQygEQvQELLAAgABBSIAEQUiACEFIQKyEAQQhBBBC8ASIBIACtQv///weDQiCGNwIAIAELLAAgABBSIAEQUiACEFMQOSEAQQhBBBC8ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDPAQALENABAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM8BAAsQ0AEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzwEACxDQAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LENABAAspACADED4hAyAAEL8BIAEQvwEgAhC/ASADEMQBQQh0QeQAchDHARC+AQspACADED4hAyAAEL8BIAEQvwEgAhC/ASADEMQBQQh0QeUAchDHARC+AQslAQF/IAAQUiEAQQhBBBC8ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ1AEACyABAX8gABDGASAAKAIABEAQ0AEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvwEgARC/ASACEDlBCHRBygByEMcBEL4BCx4AAkAgAARAIAAoAgANASAAEAQPCxDPAQALENABAAsPACAAIAEgAiADQRIQ8AELDwAgACABIAIgA0EYEPABCw8AIAAgASACIANBHBDwAQsPACAAIAEgAiADQR0Q8AELDwAgACABIAIgA0EhEPEBCw8AIAAgASACIANBIhDwAQsPACAAIAEgAiADQSMQ8AELDwAgACABIAIgA0EoEPABCw8AIAAgASACIANBKhDwAQsPACAAIAEgAiADQSwQ8AELDwAgACABIAIgA0EvEPABCw8AIAAgASACIANBOBDwAQsQACAAIAEgAiADQdMAEPEBCxAAIAAgASACIANB1AAQ8QELEAAgACABIAIgA0HeABDxAQsQACAAIAEgAiADQd8AEPEBCxAAIAAgASACIANB4AAQ8QELEAAgACABIAIgA0HhABDxAQsQACAAIAEgAiADQeIAEPEBCxAAIAAgASACIANB4wAQ8QELEAAgACABIAIgA0HkABDxAQsQACAAIAEgAiADQeUAEPEBCxAAIAAgASACIANB5gAQ8AELEAAgACABIAIgA0HnABDwAQsQACAAIAEgAiADQegAEPABCxAAIAAgASACIANB6QAQ8AELEAAgACABIAIgA0HqABDwAQsQACAAIAEgAiADQesAEPABCxAAIAAgASACIANB7AAQ8AELEAAgACABIAIgA0HuABDwAQsdAQF/IwBBEGsiASQAIAFBCGogABAdIAFBEGokAAsdAQF/IwBBEGsiASQAIAFBCGogABATIAFBEGokAAsfACABEFkhASAAEL8BIAEQuQFBCHRBzAByEMcBEL4BCxkAIAAgASACQSBBACAEG0EQQQAgAxtyEBILDQAgACABIAJBARDyAQsNACAAIAEgAkECEPIBCw0AIAAgASACQQMQ8gELDQAgACABIAJBBBDyAQsNACAAIAEgAkEFEPIBCw0AIAAgASACQQYQ8gELDQAgACABIAJBBxDyAQsNACAAIAEgAkEIEPIBCw0AIAAgASACQQkQ8gELDQAgACABIAJBCxDyAQsNACAAIAEgAkENEPIBCw0AIAAgASACQQ4Q8gELDQAgACABIAJBDxDyAQsNACAAIAEgAkEQEPIBCw0AIAAgASACQREQ8gELDQAgACABIAJBFxDyAQsNACAAIAEgAkEmEPIBCw0AIAAgASACQScQ8gELDQAgACABIAJBKRDyAQsNACAAIAEgAkErEPIBCw0AIAAgASACQS0Q8gELDQAgACABIAJBLhDyAQsNACAAIAEgAkEwEPIBCw0AIAAgASACQTEQ8gELDQAgACABIAJBNRDyAQsNACAAIAEgAkE3EPIBCw0AIAAgASACQTkQ9AELDQAgACABIAJBOhD0AQsNACAAIAEgAkE7EPQBCw0AIAAgASACQTwQ9AELDQAgACABIAJBPRD0AQsNACAAIAEgAkE+EPQBCw0AIAAgASACQT8Q9AELDgAgACABIAJBwAAQ9AELDgAgACABIAJBwQAQ9AELDgAgACABIAJBwgAQ9AELDgAgACABIAJBwwAQ9AELDgAgACABIAJBxAAQ9AELDgAgACABIAJBxQAQ9AELDgAgACABIAJBxgAQ9AELDgAgACABIAJBxwAQ9AELDgAgACABIAJByAAQ9AELDgAgACABIAJByQAQ9AELDgAgACABIAJBygAQ9AELDgAgACABIAJB0QAQ9AELDgAgACABIAJB0gAQ9AELGAEBfyAAQf8BcUE/TQR/IAAQvQEFQQALCx4BAX9BCEEEELwBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMYBIAAoAgBBf0YEQBDQAQALIAAtAAQLCQAgAEETEPUBCwkAIABBFRD1AQsJACAAQRoQ9QELCQAgAEEgEPUBCwkAIABBJRD1AQsJACAAQTQQ9QELCQAgAEE2EPUBCwoAIABB2AAQ9QELCgAgAEHZABD1AQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMYBIAAoAgAEQBDQAQALIAAQBAscACAAEL8BIAEQvwEgAhC/ARArQQh0EMcBEL4BCxIAIAEgABDJASIABEAgAA8LAAsbAQF/QQhBBBC8ASIBIAA6AAQgAUEANgIAIAELGwEBf0EIQQQQvAEiASAANgIEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbiGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEoACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUiABEFIgAhBSIAMQPhDEARCuAQsXACAAEFIgARBSIAIQUiADEFIQEhCuAQsTACAAEFIgARBSIAIQBRA5EK4BCxEAIAAgASACQSBBACADGxASCxMAIAAQUiABEFIgAhBTEDkQrgELDAAgAARADwsQzwEACxQBAX9BBEEBELwBIgEgADYAACABCxQBAX9BCEEEELwBIgBCADcCACAAC4EDAQV/Qa2NwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1wFBCnZBP3ELEAAgABBSIAEQWRC5ARCuAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHwiMAAQRsQ1AEACw4AQYuJwABBzwAQ1AEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xEL0BCwoAIAAQUkH/AXELBwAgAEEIdAsHACAAED4aCwcAIAAQUhoLBwAgABBTGgsHACAAEFQaCwoAQTMQxwEQvgELBwBBCxC9AQsHAEEKEL0BCwcAQQgQvQELBwBBDxC9AQsHAEEGEL0BCwcAQQkQvQELBwBBBxC9AQsHAEEMEL0BCwcAQQIQvQELBwBBARC9AQsHAEEDEL0BCwcAQQ0QvQELBwBBDhC9AQsHAEEFEL0BCwcAQQQQvQELBwBBEBC9AQsHAEEAEL0BCwQAQQQLAgALJAAgABC/ASABEL8BIAIQvwEgAxC/ARASQQh0IARyEMcBEL4BCyMAIAAQvwEgARC/ASACEL8BIAMQDRASQQh0IARyEMcBEL4BCx8AIAAQvwEgARC/ASACEL8BECtBCHQgA3IQxwEQvgELYgEBfyMAQTBrIgQkACAEIAA2AgwgACADTwRAIARBHGpCATcCACAEQQI2AhQgBCACNgIQIARBBDYCLCAEIARBKGo2AhggBCAEQQxqNgIoIARBEGogARBKAAsgBEEwaiQAIAALHgAgABC/ASABEL8BIAIQDhA5QQh0IANyEMcBEL4BCxsAIAAQvwEaIABBCnRBgPgDcSABchDHARC+AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC/ASABEL8BIAIQvwEgBkEBcSADQQFxEH5BCHQgBHIQxwEQvgEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL8BIAEQvwEgAhC/ASADQQFxIAYQwAFBCHQgBHIQxwEQvgEgBUEQaiQAC0oAIAAQvwEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMcBEL4BC0kBAX8jAEEQayIDJAAgABDGASABIAJPBEBB4ILAAEEZENQBAAsgA0EIaiAAEFUgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC/ARogARC/ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMcBEL4BCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDHARC+AQsL5AkBAEGAgMAAC9oJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG4AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACuAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAALMDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAuAMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAAC9AwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAugAAALsAAABwBBAAAAAAAAUAAAAAAAAAAQAAAAYAAAAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OWNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWVsaWJyYXJ5L3N0ZC9zcmMvcGFuaWNraW5nLnJzAEMEEAAcAAAAhAIAAB4AAABudWxsIHBvaW50ZXIgcGFzc2VkIHRvIHJ1c3RyZWN1cnNpdmUgdXNlIG9mIGFuIG9iamVjdCBkZXRlY3RlZCB3aGljaCB3b3VsZCBsZWFkIHRvIHVuc2FmZSBhbGlhc2luZyBpbiBydXN0ADsJcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkCBndhbHJ1cwYwLjIwLjMMd2FzbS1iaW5kZ2VuBjAuMi45Mg==", e);
}
async function hi() {
  return await k0(ZI());
}
hi();
const JI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: em,
  ADDI: nm,
  ALOC: im,
  AND: am,
  ANDI: um,
  BAL: _m,
  BHEI: lm,
  BHSH: pm,
  BLDD: gm,
  BSIZ: mm,
  BURN: bm,
  CALL: Em,
  CB: Cm,
  CCP: xm,
  CFE: Sm,
  CFEI: Tm,
  CFS: Dm,
  CFSI: Mm,
  CROO: Lm,
  CSIZ: Pm,
  CompareArgs: Mr,
  CompareMode: qw,
  DIV: zm,
  DIVI: Xm,
  DivArgs: os,
  ECAL: Wm,
  ECK1: Zm,
  ECR1: jm,
  ED19: $m,
  EQ: ty,
  EXP: ry,
  EXPI: sy,
  FLAG: oy,
  GM: Ys,
  GMArgs: jw,
  GT: cy,
  GTF: Ws,
  GTFArgs: M0,
  Imm06: Tt,
  Imm12: gt,
  Imm18: Be,
  Imm24: Ie,
  Instruction: X,
  JI: dy,
  JMP: hy,
  JMPB: Ay,
  JMPF: fy,
  JNE: wy,
  JNEB: yy,
  JNEF: Iy,
  JNEI: vy,
  JNZB: By,
  JNZF: Ry,
  JNZI: Ny,
  K256: Qy,
  LB: Fy,
  LDC: Oy,
  LOG: ky,
  LOGD: Uy,
  LT: Gy,
  LW: Hy,
  MCL: Wy,
  MCLI: Zy,
  MCP: jy,
  MCPI: $y,
  MEQ: tb,
  MINT: rb,
  MLDV: sb,
  MLOG: ob,
  MOD: cb,
  MODI: db,
  MOVE: hb,
  MOVI: Ab,
  MROO: fb,
  MUL: wb,
  MULI: yb,
  MathArgs: as,
  MathOp: Kw,
  MulArgs: cs,
  NOOP: vb,
  NOT: Bb,
  OR: Rb,
  ORI: Nb,
  POPH: Qb,
  POPL: Fb,
  PSHH: Ob,
  PSHL: kb,
  PanicInstruction: Ub,
  PanicReason: $w,
  RET: Gb,
  RETD: Hb,
  RVRT: Wb,
  RegId: l,
  S256: Zb,
  SB: jb,
  SCWQ: $b,
  SLL: tI,
  SLLI: rI,
  SMO: sI,
  SRL: oI,
  SRLI: cI,
  SRW: dI,
  SRWQ: hI,
  SUB: AI,
  SUBI: fI,
  SW: wI,
  SWW: yI,
  SWWQ: II,
  TIME: vI,
  TR: BI,
  TRO: RI,
  WDAM: NI,
  WDCM: Vs,
  WDDV: Zs,
  WDMD: QI,
  WDML: Js,
  WDMM: FI,
  WDOP: js,
  WQAM: OI,
  WQCM: qs,
  WQDV: $s,
  WQMD: kI,
  WQML: Ks,
  WQMM: UI,
  WQOP: ti,
  XOR: GI,
  XORI: HI,
  add: ag,
  addi: Hn,
  aloc: Cg,
  and: cg,
  andi: nw,
  bal: tw,
  bhei: Ng,
  bhsh: Sg,
  bldd: Zw,
  bsiz: F0,
  burn: Tg,
  call: Co,
  cb: Mg,
  ccp: Qg,
  cfe: xw,
  cfei: Cw,
  cfs: Rw,
  cfsi: Bw,
  croo: Dg,
  csiz: Fg,
  div: ug,
  divi: N0,
  ecal: Vw,
  eck1: Wg,
  ecr1: Vg,
  ed19: Zg,
  eq: dg,
  exp: _g,
  expi: sw,
  flag: Kg,
  gm: gw,
  gm_args: qf,
  gt: hg,
  gtf: Q0,
  gtf_args: $f,
  initSync: WI,
  initWasm: hi,
  ji: vw,
  jmp: S0,
  jmpb: yw,
  jmpf: mw,
  jne: ew,
  jneb: Ew,
  jnef: Iw,
  jnei: _w,
  jnzb: D0,
  jnzf: bw,
  jnzi: ww,
  k256: Jg,
  lb: hw,
  ldc: x0,
  log: Og,
  logd: Lg,
  lt: lg,
  lw: Hs,
  mcl: Bg,
  mcli: fw,
  mcp: xg,
  mcpi: pw,
  meq: Rg,
  mint: kg,
  mldv: Eg,
  mlog: Ag,
  mod_: fg,
  modi: iw,
  move_: vo,
  movi: en,
  mroo: pg,
  mul: gg,
  muli: ow,
  noop: $g,
  not: wg,
  or: mg,
  ori: aw,
  poph: Qw,
  popl: Tw,
  pshh: Nw,
  pshl: Sw,
  ret: ba,
  retd: vg,
  rvrt: Pg,
  s256: jg,
  sb: lw,
  scwq: Ug,
  sll: yg,
  slli: cw,
  smo: rw,
  srl: bg,
  srli: uw,
  srw: zg,
  srwq: Gg,
  sub: B0,
  subi: T0,
  sw: Aw,
  sww: Xg,
  swwq: Hg,
  time: qg,
  tr: R0,
  tro: Yg,
  wdam: Xw,
  wdcm: Dw,
  wdcm_args: Kf,
  wddv: Pw,
  wddv_args: ig,
  wdmd: zw,
  wdml: Lw,
  wdml_args: ng,
  wdmm: Yw,
  wdop: Mw,
  wdop_args: eg,
  wqam: Hw,
  wqcm: Fw,
  wqcm_args: tg,
  wqdv: Uw,
  wqdv_args: og,
  wqmd: Gw,
  wqml: kw,
  wqml_args: sg,
  wqmm: Ww,
  wqop: Ow,
  wqop_args: rg,
  xor: Ig,
  xori: dw
}, Symbol.toStringTag, { value: "Module" }));
function _u(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function jI(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function li(e, ...t) {
  if (!jI(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function qI(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  _u(e.outputLen), _u(e.blockLen);
}
function ei(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function $I(e, t) {
  li(e);
  const r = t.outputLen;
  if (e.length < r)
    throw new Error(`digestInto() expects output buffer of length at least ${r}`);
}
const Zi = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ji = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ze = (e, t) => e << 32 - t | e >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function KI(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Ia(e) {
  return typeof e == "string" && (e = KI(e)), li(e), e;
}
function t1(...e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    li(s), t += s.length;
  }
  const r = new Uint8Array(t);
  for (let n = 0, s = 0; n < e.length; n++) {
    const i = e[n];
    r.set(i, s), s += i.length;
  }
  return r;
}
class P0 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function e1(e) {
  const t = (n) => e().update(Ia(n)).digest(), r = e();
  return t.outputLen = r.outputLen, t.blockLen = r.blockLen, t.create = () => e(), t;
}
function r1(e = 32) {
  if (Zi && typeof Zi.getRandomValues == "function")
    return Zi.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function n1(e, t, r, n) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, r, n);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(r >> s & i), a = Number(r & i), _ = n ? 4 : 0, A = n ? 0 : 4;
  e.setUint32(t + _, o, n), e.setUint32(t + A, a, n);
}
const s1 = (e, t, r) => e & t ^ ~e & r, i1 = (e, t, r) => e & t ^ e & r ^ t & r;
class o1 extends P0 {
  constructor(t, r, n, s) {
    super(), this.blockLen = t, this.outputLen = r, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ji(this.buffer);
  }
  update(t) {
    ei(this);
    const { view: r, buffer: n, blockLen: s } = this;
    t = Ia(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const _ = Ji(t);
        for (; s <= i - o; o += s)
          this.process(_, o);
        continue;
      }
      n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(r, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ei(this), $I(t, this), this.finished = !0;
    const { buffer: r, view: n, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    r[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(n, 0), o = 0);
    for (let m = o; m < s; m++)
      r[m] = 0;
    n1(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const a = Ji(t), _ = this.outputLen;
    if (_ % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const A = _ / 4, g = this.get();
    if (A > g.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < A; m++)
      a.setUint32(4 * m, g[m], i);
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
const a1 = /* @__PURE__ */ new Uint32Array([
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
class c1 extends o1 {
  constructor() {
    super(64, 32, 8, !1), this.A = yr[0] | 0, this.B = yr[1] | 0, this.C = yr[2] | 0, this.D = yr[3] | 0, this.E = yr[4] | 0, this.F = yr[5] | 0, this.G = yr[6] | 0, this.H = yr[7] | 0;
  }
  get() {
    const { A: t, B: r, C: n, D: s, E: i, F: o, G: a, H: _ } = this;
    return [t, r, n, s, i, o, a, _];
  }
  // prettier-ignore
  set(t, r, n, s, i, o, a, _) {
    this.A = t | 0, this.B = r | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = _ | 0;
  }
  process(t, r) {
    for (let m = 0; m < 16; m++, r += 4)
      br[m] = t.getUint32(r, !1);
    for (let m = 16; m < 64; m++) {
      const B = br[m - 15], N = br[m - 2], T = Ze(B, 7) ^ Ze(B, 18) ^ B >>> 3, x = Ze(N, 17) ^ Ze(N, 19) ^ N >>> 10;
      br[m] = x + br[m - 7] + T + br[m - 16] | 0;
    }
    let { A: n, B: s, C: i, D: o, E: a, F: _, G: A, H: g } = this;
    for (let m = 0; m < 64; m++) {
      const B = Ze(a, 6) ^ Ze(a, 11) ^ Ze(a, 25), N = g + B + s1(a, _, A) + a1[m] + br[m] | 0, x = (Ze(n, 2) ^ Ze(n, 13) ^ Ze(n, 22)) + i1(n, s, i) | 0;
      g = A, A = _, _ = a, a = o + N | 0, o = i, i = s, s = n, n = N + x | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, _ = _ + this.F | 0, A = A + this.G | 0, g = g + this.H | 0, this.set(n, s, i, o, a, _, A, g);
  }
  roundClean() {
    br.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const u1 = /* @__PURE__ */ e1(() => new c1());
class U0 extends P0 {
  constructor(t, r) {
    super(), this.finished = !1, this.destroyed = !1, qI(t);
    const n = Ia(r);
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
    return ei(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ei(this), li(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const z0 = (e, t, r) => new U0(e, t).update(r).digest();
z0.create = (e, t) => new U0(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ye = BigInt(0), Xt = BigInt(1), zr = BigInt(2), d1 = BigInt(3), Bo = BigInt(4), hu = BigInt(5), lu = BigInt(8);
BigInt(9);
BigInt(16);
function Re(e, t) {
  const r = e % t;
  return r >= ye ? r : t + r;
}
function _1(e, t, r) {
  if (r <= ye || t < ye)
    throw new Error("Expected power/modulo > 0");
  if (r === Xt)
    return ye;
  let n = Xt;
  for (; t > ye; )
    t & Xt && (n = n * e % r), e = e * e % r, t >>= Xt;
  return n;
}
function Fe(e, t, r) {
  let n = e;
  for (; t-- > ye; )
    n *= n, n %= r;
  return n;
}
function xo(e, t) {
  if (e === ye || t <= ye)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let r = Re(e, t), n = t, s = ye, i = Xt;
  for (; r !== ye; ) {
    const a = n / r, _ = n % r, A = s - i * a;
    n = r, r = _, s = i, i = A;
  }
  if (n !== Xt)
    throw new Error("invert: does not exist");
  return Re(s, t);
}
function h1(e) {
  const t = (e - Xt) / zr;
  let r, n, s;
  for (r = e - Xt, n = 0; r % zr === ye; r /= zr, n++)
    ;
  for (s = zr; s < e && _1(s, t, e) !== e - Xt; s++)
    ;
  if (n === 1) {
    const o = (e + Xt) / Bo;
    return function(_, A) {
      const g = _.pow(A, o);
      if (!_.eql(_.sqr(g), A))
        throw new Error("Cannot find square root");
      return g;
    };
  }
  const i = (r + Xt) / zr;
  return function(a, _) {
    if (a.pow(_, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let A = n, g = a.pow(a.mul(a.ONE, s), r), m = a.pow(_, i), B = a.pow(_, r);
    for (; !a.eql(B, a.ONE); ) {
      if (a.eql(B, a.ZERO))
        return a.ZERO;
      let N = 1;
      for (let x = a.sqr(B); N < A && !a.eql(x, a.ONE); N++)
        x = a.sqr(x);
      const T = a.pow(g, Xt << BigInt(A - N - 1));
      g = a.sqr(T), m = a.mul(m, T), B = a.mul(B, g), A = N;
    }
    return m;
  };
}
function l1(e) {
  if (e % Bo === d1) {
    const t = (e + Xt) / Bo;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % lu === hu) {
    const t = (e - hu) / lu;
    return function(n, s) {
      const i = n.mul(s, zr), o = n.pow(i, t), a = n.mul(s, o), _ = n.mul(n.mul(a, zr), o), A = n.mul(a, n.sub(_, n.ONE));
      if (!n.eql(n.sqr(A), s))
        throw new Error("Cannot find square root");
      return A;
    };
  }
  return h1(e);
}
const A1 = [
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
function p1(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, r = A1.reduce((n, s) => (n[s] = "function", n), t);
  return rs(e, r);
}
function f1(e, t, r) {
  if (r < ye)
    throw new Error("Expected power > 0");
  if (r === ye)
    return e.ONE;
  if (r === Xt)
    return t;
  let n = e.ONE, s = t;
  for (; r > ye; )
    r & Xt && (n = e.mul(n, s)), s = e.sqr(s), r >>= Xt;
  return n;
}
function g1(e, t) {
  const r = new Array(t.length), n = t.reduce((i, o, a) => e.is0(o) ? i : (r[a] = i, e.mul(i, o)), e.ONE), s = e.inv(n);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (r[a] = e.mul(i, r[a]), e.mul(i, o)), s), r;
}
function G0(e, t) {
  const r = t !== void 0 ? t : e.toString(2).length, n = Math.ceil(r / 8);
  return { nBitLength: r, nByteLength: n };
}
function w1(e, t, r = !1, n = {}) {
  if (e <= ye)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = G0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = l1(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: ga(s),
    ZERO: ye,
    ONE: Xt,
    create: (_) => Re(_, e),
    isValid: (_) => {
      if (typeof _ != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof _}`);
      return ye <= _ && _ < e;
    },
    is0: (_) => _ === ye,
    isOdd: (_) => (_ & Xt) === Xt,
    neg: (_) => Re(-_, e),
    eql: (_, A) => _ === A,
    sqr: (_) => Re(_ * _, e),
    add: (_, A) => Re(_ + A, e),
    sub: (_, A) => Re(_ - A, e),
    mul: (_, A) => Re(_ * A, e),
    pow: (_, A) => f1(a, _, A),
    div: (_, A) => Re(_ * xo(A, e), e),
    // Same as above, but doesn't normalize
    sqrN: (_) => _ * _,
    addN: (_, A) => _ + A,
    subN: (_, A) => _ - A,
    mulN: (_, A) => _ * A,
    inv: (_) => xo(_, e),
    sqrt: n.sqrt || ((_) => o(a, _)),
    invertBatch: (_) => g1(a, _),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (_, A, g) => g ? A : _,
    toBytes: (_) => r ? fa(_, i) : fn(_, i),
    fromBytes: (_) => {
      if (_.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${_.length}`);
      return r ? pa(_) : Wr(_);
    }
  });
  return Object.freeze(a);
}
function X0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function H0(e) {
  const t = X0(e);
  return t + Math.ceil(t / 2);
}
function m1(e, t, r = !1) {
  const n = e.length, s = X0(t), i = H0(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const o = r ? Wr(e) : pa(e), a = Re(o, t - Xt) + Xt;
  return r ? fa(a, s) : fn(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const y1 = BigInt(0), ji = BigInt(1);
function b1(e, t) {
  const r = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, n = (s) => {
    const i = Math.ceil(t / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: r,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = e.ZERO, a = s;
      for (; i > y1; )
        i & ji && (o = o.add(a)), a = a.double(), i >>= ji;
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
      const { windows: o, windowSize: a } = n(i), _ = [];
      let A = s, g = A;
      for (let m = 0; m < o; m++) {
        g = A, _.push(g);
        for (let B = 1; B < a; B++)
          g = g.add(A), _.push(g);
        A = g.double();
      }
      return _;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: a, windowSize: _ } = n(s);
      let A = e.ZERO, g = e.BASE;
      const m = BigInt(2 ** s - 1), B = 2 ** s, N = BigInt(s);
      for (let T = 0; T < a; T++) {
        const x = T * _;
        let F = Number(o & m);
        o >>= N, F > _ && (F -= B, o += ji);
        const O = x, j = x + Math.abs(F) - 1, P = T % 2 !== 0, Z = F < 0;
        F === 0 ? g = g.add(r(P, i[O])) : A = A.add(r(Z, i[j]));
      }
      return { p: A, f: g };
    },
    wNAFCached(s, i, o, a) {
      const _ = s._WINDOW_SIZE || 1;
      let A = i.get(s);
      return A || (A = this.precomputeWindow(s, _), _ !== 1 && i.set(s, a(A))), this.wNAF(_, A, o);
    }
  };
}
function Y0(e) {
  return p1(e.Fp), rs(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...G0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function I1(e) {
  const t = Y0(e);
  rs(t, {
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
const { bytesToNumberBE: E1, hexToBytes: v1 } = bp, Xr = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Xr;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const r = e[1], n = e.subarray(2, r + 2);
    if (!r || n.length !== r)
      throw new t("Invalid signature integer: wrong length");
    if (n[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (n[0] === 0 && !(n[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: E1(n), l: e.subarray(r + 2) };
  },
  toSig(e) {
    const { Err: t } = Xr, r = typeof e == "string" ? v1(e) : e;
    es(r);
    let n = r.length;
    if (n < 2 || r[0] != 48)
      throw new t("Invalid signature tag");
    if (r[1] !== n - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Xr._parseInt(r.subarray(2)), { d: o, l: a } = Xr._parseInt(i);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (A) => Number.parseInt(A[0], 16) & 8 ? "00" + A : A, r = (A) => {
      const g = A.toString(16);
      return g.length & 1 ? `0${g}` : g;
    }, n = t(r(e.s)), s = t(r(e.r)), i = n.length / 2, o = s.length / 2, a = r(i), _ = r(o);
    return `30${r(o + i + 4)}02${_}${s}02${a}${n}`;
  }
}, dr = BigInt(0), Me = BigInt(1);
BigInt(2);
const Au = BigInt(3);
BigInt(4);
function C1(e) {
  const t = I1(e), { Fp: r } = t, n = t.toBytes || ((T, x, F) => {
    const O = x.toAffine();
    return Gn(Uint8Array.from([4]), r.toBytes(O.x), r.toBytes(O.y));
  }), s = t.fromBytes || ((T) => {
    const x = T.subarray(1), F = r.fromBytes(x.subarray(0, r.BYTES)), O = r.fromBytes(x.subarray(r.BYTES, 2 * r.BYTES));
    return { x: F, y: O };
  });
  function i(T) {
    const { a: x, b: F } = t, O = r.sqr(T), j = r.mul(O, T);
    return r.add(r.add(j, r.mul(T, x)), F);
  }
  if (!r.eql(r.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(T) {
    return typeof T == "bigint" && dr < T && T < t.n;
  }
  function a(T) {
    if (!o(T))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function _(T) {
    const { allowedPrivateKeyLengths: x, nByteLength: F, wrapPrivateKey: O, n: j } = t;
    if (x && typeof T != "bigint") {
      if (Zr(T) && (T = An(T)), typeof T != "string" || !x.includes(T.length))
        throw new Error("Invalid key");
      T = T.padStart(F * 2, "0");
    }
    let P;
    try {
      P = typeof T == "bigint" ? T : Wr(Ge("private key", T, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof T}`);
    }
    return O && (P = Re(P, j)), a(P), P;
  }
  const A = /* @__PURE__ */ new Map();
  function g(T) {
    if (!(T instanceof m))
      throw new Error("ProjectivePoint expected");
  }
  class m {
    constructor(x, F, O) {
      if (this.px = x, this.py = F, this.pz = O, x == null || !r.isValid(x))
        throw new Error("x required");
      if (F == null || !r.isValid(F))
        throw new Error("y required");
      if (O == null || !r.isValid(O))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(x) {
      const { x: F, y: O } = x || {};
      if (!x || !r.isValid(F) || !r.isValid(O))
        throw new Error("invalid affine point");
      if (x instanceof m)
        throw new Error("projective point not allowed");
      const j = (P) => r.eql(P, r.ZERO);
      return j(F) && j(O) ? m.ZERO : new m(F, O, r.ONE);
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
    static normalizeZ(x) {
      const F = r.invertBatch(x.map((O) => O.pz));
      return x.map((O, j) => O.toAffine(F[j])).map(m.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(x) {
      const F = m.fromAffine(s(Ge("pointHex", x)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(x) {
      return m.BASE.multiply(_(x));
    }
    // "Private method", don't use it directly
    _setWindowSize(x) {
      this._WINDOW_SIZE = x, A.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !r.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y: F } = this.toAffine();
      if (!r.isValid(x) || !r.isValid(F))
        throw new Error("bad point: x or y not FE");
      const O = r.sqr(F), j = i(x);
      if (!r.eql(O, j))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: x } = this.toAffine();
      if (r.isOdd)
        return !r.isOdd(x);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(x) {
      g(x);
      const { px: F, py: O, pz: j } = this, { px: P, py: Z, pz: L } = x, D = r.eql(r.mul(F, L), r.mul(P, j)), z = r.eql(r.mul(O, L), r.mul(Z, j));
      return D && z;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new m(this.px, r.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: x, b: F } = t, O = r.mul(F, Au), { px: j, py: P, pz: Z } = this;
      let L = r.ZERO, D = r.ZERO, z = r.ZERO, U = r.mul(j, j), G = r.mul(P, P), H = r.mul(Z, Z), Y = r.mul(j, P);
      return Y = r.add(Y, Y), z = r.mul(j, Z), z = r.add(z, z), L = r.mul(x, z), D = r.mul(O, H), D = r.add(L, D), L = r.sub(G, D), D = r.add(G, D), D = r.mul(L, D), L = r.mul(Y, L), z = r.mul(O, z), H = r.mul(x, H), Y = r.sub(U, H), Y = r.mul(x, Y), Y = r.add(Y, z), z = r.add(U, U), U = r.add(z, U), U = r.add(U, H), U = r.mul(U, Y), D = r.add(D, U), H = r.mul(P, Z), H = r.add(H, H), U = r.mul(H, Y), L = r.sub(L, U), z = r.mul(H, G), z = r.add(z, z), z = r.add(z, z), new m(L, D, z);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(x) {
      g(x);
      const { px: F, py: O, pz: j } = this, { px: P, py: Z, pz: L } = x;
      let D = r.ZERO, z = r.ZERO, U = r.ZERO;
      const G = t.a, H = r.mul(t.b, Au);
      let Y = r.mul(F, P), nt = r.mul(O, Z), C = r.mul(j, L), u = r.add(F, O), d = r.add(P, Z);
      u = r.mul(u, d), d = r.add(Y, nt), u = r.sub(u, d), d = r.add(F, j);
      let p = r.add(P, L);
      return d = r.mul(d, p), p = r.add(Y, C), d = r.sub(d, p), p = r.add(O, j), D = r.add(Z, L), p = r.mul(p, D), D = r.add(nt, C), p = r.sub(p, D), U = r.mul(G, d), D = r.mul(H, C), U = r.add(D, U), D = r.sub(nt, U), U = r.add(nt, U), z = r.mul(D, U), nt = r.add(Y, Y), nt = r.add(nt, Y), C = r.mul(G, C), d = r.mul(H, d), nt = r.add(nt, C), C = r.sub(Y, C), C = r.mul(G, C), d = r.add(d, C), Y = r.mul(nt, d), z = r.add(z, Y), Y = r.mul(p, d), D = r.mul(u, D), D = r.sub(D, Y), Y = r.mul(u, nt), U = r.mul(p, U), U = r.add(U, Y), new m(D, z, U);
    }
    subtract(x) {
      return this.add(x.negate());
    }
    is0() {
      return this.equals(m.ZERO);
    }
    wNAF(x) {
      return N.wNAFCached(this, A, x, (F) => {
        const O = r.invertBatch(F.map((j) => j.pz));
        return F.map((j, P) => j.toAffine(O[P])).map(m.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(x) {
      const F = m.ZERO;
      if (x === dr)
        return F;
      if (a(x), x === Me)
        return this;
      const { endo: O } = t;
      if (!O)
        return N.unsafeLadder(this, x);
      let { k1neg: j, k1: P, k2neg: Z, k2: L } = O.splitScalar(x), D = F, z = F, U = this;
      for (; P > dr || L > dr; )
        P & Me && (D = D.add(U)), L & Me && (z = z.add(U)), U = U.double(), P >>= Me, L >>= Me;
      return j && (D = D.negate()), Z && (z = z.negate()), z = new m(r.mul(z.px, O.beta), z.py, z.pz), D.add(z);
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
    multiply(x) {
      a(x);
      let F = x, O, j;
      const { endo: P } = t;
      if (P) {
        const { k1neg: Z, k1: L, k2neg: D, k2: z } = P.splitScalar(F);
        let { p: U, f: G } = this.wNAF(L), { p: H, f: Y } = this.wNAF(z);
        U = N.constTimeNegate(Z, U), H = N.constTimeNegate(D, H), H = new m(r.mul(H.px, P.beta), H.py, H.pz), O = U.add(H), j = G.add(Y);
      } else {
        const { p: Z, f: L } = this.wNAF(F);
        O = Z, j = L;
      }
      return m.normalizeZ([O, j])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(x, F, O) {
      const j = m.BASE, P = (L, D) => D === dr || D === Me || !L.equals(j) ? L.multiplyUnsafe(D) : L.multiply(D), Z = P(this, F).add(P(x, O));
      return Z.is0() ? void 0 : Z;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(x) {
      const { px: F, py: O, pz: j } = this, P = this.is0();
      x == null && (x = P ? r.ONE : r.inv(j));
      const Z = r.mul(F, x), L = r.mul(O, x), D = r.mul(j, x);
      if (P)
        return { x: r.ZERO, y: r.ZERO };
      if (!r.eql(D, r.ONE))
        throw new Error("invZ was invalid");
      return { x: Z, y: L };
    }
    isTorsionFree() {
      const { h: x, isTorsionFree: F } = t;
      if (x === Me)
        return !0;
      if (F)
        return F(m, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: x, clearCofactor: F } = t;
      return x === Me ? this : F ? F(m, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(x = !0) {
      return this.assertValidity(), n(m, this, x);
    }
    toHex(x = !0) {
      return An(this.toRawBytes(x));
    }
  }
  m.BASE = new m(t.Gx, t.Gy, r.ONE), m.ZERO = new m(r.ZERO, r.ONE, r.ZERO);
  const B = t.nBitLength, N = b1(m, t.endo ? Math.ceil(B / 2) : B);
  return {
    CURVE: t,
    ProjectivePoint: m,
    normPrivateKeyToScalar: _,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function B1(e) {
  const t = Y0(e);
  return rs(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function x1(e) {
  const t = B1(e), { Fp: r, n } = t, s = r.BYTES + 1, i = 2 * r.BYTES + 1;
  function o(d) {
    return dr < d && d < r.ORDER;
  }
  function a(d) {
    return Re(d, n);
  }
  function _(d) {
    return xo(d, n);
  }
  const { ProjectivePoint: A, normPrivateKeyToScalar: g, weierstrassEquation: m, isWithinCurveOrder: B } = C1({
    ...t,
    toBytes(d, p, y) {
      const f = p.toAffine(), E = r.toBytes(f.x), v = Gn;
      return y ? v(Uint8Array.from([p.hasEvenY() ? 2 : 3]), E) : v(Uint8Array.from([4]), E, r.toBytes(f.y));
    },
    fromBytes(d) {
      const p = d.length, y = d[0], f = d.subarray(1);
      if (p === s && (y === 2 || y === 3)) {
        const E = Wr(f);
        if (!o(E))
          throw new Error("Point is not on curve");
        const v = m(E);
        let w;
        try {
          w = r.sqrt(v);
        } catch (J) {
          const V = J instanceof Error ? ": " + J.message : "";
          throw new Error("Point is not on curve" + V);
        }
        const h = (w & Me) === Me;
        return (y & 1) === 1 !== h && (w = r.neg(w)), { x: E, y: w };
      } else if (p === i && y === 4) {
        const E = r.fromBytes(f.subarray(0, r.BYTES)), v = r.fromBytes(f.subarray(r.BYTES, 2 * r.BYTES));
        return { x: E, y: v };
      } else
        throw new Error(`Point of length ${p} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), N = (d) => An(fn(d, t.nByteLength));
  function T(d) {
    const p = n >> Me;
    return d > p;
  }
  function x(d) {
    return T(d) ? a(-d) : d;
  }
  const F = (d, p, y) => Wr(d.slice(p, y));
  class O {
    constructor(p, y, f) {
      this.r = p, this.s = y, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(p) {
      const y = t.nByteLength;
      return p = Ge("compactSignature", p, y * 2), new O(F(p, 0, y), F(p, y, 2 * y));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(p) {
      const { r: y, s: f } = Xr.toSig(Ge("DER", p));
      return new O(y, f);
    }
    assertValidity() {
      if (!B(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!B(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(p) {
      return new O(this.r, this.s, p);
    }
    recoverPublicKey(p) {
      const { r: y, s: f, recovery: E } = this, v = z(Ge("msgHash", p));
      if (E == null || ![0, 1, 2, 3].includes(E))
        throw new Error("recovery id invalid");
      const w = E === 2 || E === 3 ? y + t.n : y;
      if (w >= r.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const h = E & 1 ? "03" : "02", I = A.fromHex(h + N(w)), J = _(w), V = a(-v * J), rt = a(f * J), tt = A.BASE.multiplyAndAddUnsafe(I, V, rt);
      if (!tt)
        throw new Error("point at infinify");
      return tt.assertValidity(), tt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return T(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new O(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return pn(this.toDERHex());
    }
    toDERHex() {
      return Xr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return pn(this.toCompactHex());
    }
    toCompactHex() {
      return N(this.r) + N(this.s);
    }
  }
  const j = {
    isValidPrivateKey(d) {
      try {
        return g(d), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: g,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const d = H0(t.n);
      return m1(t.randomBytes(d), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(d = 8, p = A.BASE) {
      return p._setWindowSize(d), p.multiply(BigInt(3)), p;
    }
  };
  function P(d, p = !0) {
    return A.fromPrivateKey(d).toRawBytes(p);
  }
  function Z(d) {
    const p = Zr(d), y = typeof d == "string", f = (p || y) && d.length;
    return p ? f === s || f === i : y ? f === 2 * s || f === 2 * i : d instanceof A;
  }
  function L(d, p, y = !0) {
    if (Z(d))
      throw new Error("first arg must be private key");
    if (!Z(p))
      throw new Error("second arg must be public key");
    return A.fromHex(p).multiply(g(d)).toRawBytes(y);
  }
  const D = t.bits2int || function(d) {
    const p = Wr(d), y = d.length * 8 - t.nBitLength;
    return y > 0 ? p >> BigInt(y) : p;
  }, z = t.bits2int_modN || function(d) {
    return a(D(d));
  }, U = ga(t.nBitLength);
  function G(d) {
    if (typeof d != "bigint")
      throw new Error("bigint expected");
    if (!(dr <= d && d < U))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return fn(d, t.nByteLength);
  }
  function H(d, p, y = Y) {
    if (["recovered", "canonical"].some((ot) => ot in y))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: E } = t;
    let { lowS: v, prehash: w, extraEntropy: h } = y;
    v == null && (v = !0), d = Ge("msgHash", d), w && (d = Ge("prehashed msgHash", f(d)));
    const I = z(d), J = g(p), V = [G(J), G(I)];
    if (h != null && h !== !1) {
      const ot = h === !0 ? E(r.BYTES) : h;
      V.push(Ge("extraEntropy", ot));
    }
    const rt = Gn(...V), tt = I;
    function it(ot) {
      const xt = D(ot);
      if (!B(xt))
        return;
      const At = _(xt), ut = A.BASE.multiply(xt).toAffine(), Et = a(ut.x);
      if (Et === dr)
        return;
      const ht = a(At * a(tt + Et * J));
      if (ht === dr)
        return;
      let mt = (ut.x === Et ? 0 : 2) | Number(ut.y & Me), Ye = ht;
      return v && T(ht) && (Ye = x(ht), mt ^= 1), new O(Et, Ye, mt);
    }
    return { seed: rt, k2sig: it };
  }
  const Y = { lowS: t.lowS, prehash: !1 }, nt = { lowS: t.lowS, prehash: !1 };
  function C(d, p, y = Y) {
    const { seed: f, k2sig: E } = H(d, p, y), v = t;
    return s0(v.hash.outputLen, v.nByteLength, v.hmac)(f, E);
  }
  A.BASE._setWindowSize(8);
  function u(d, p, y, f = nt) {
    var ut;
    const E = d;
    if (p = Ge("msgHash", p), y = Ge("publicKey", y), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: v, prehash: w } = f;
    let h, I;
    try {
      if (typeof E == "string" || Zr(E))
        try {
          h = O.fromDER(E);
        } catch (Et) {
          if (!(Et instanceof Xr.Err))
            throw Et;
          h = O.fromCompact(E);
        }
      else if (typeof E == "object" && typeof E.r == "bigint" && typeof E.s == "bigint") {
        const { r: Et, s: ht } = E;
        h = new O(Et, ht);
      } else
        throw new Error("PARSE");
      I = A.fromHex(y);
    } catch (Et) {
      if (Et.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (v && h.hasHighS())
      return !1;
    w && (p = t.hash(p));
    const { r: J, s: V } = h, rt = z(p), tt = _(V), it = a(rt * tt), ot = a(J * tt), xt = (ut = A.BASE.multiplyAndAddUnsafe(I, it, ot)) == null ? void 0 : ut.toAffine();
    return xt ? a(xt.x) === J : !1;
  }
  return {
    CURVE: t,
    getPublicKey: P,
    getSharedSecret: L,
    sign: C,
    verify: u,
    ProjectivePoint: A,
    Signature: O,
    utils: j
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function R1(e) {
  return {
    hash: e,
    hmac: (t, ...r) => z0(e, t, t1(...r)),
    randomBytes: r1
  };
}
function S1(e, t) {
  const r = (n) => x1({ ...e, ...R1(n) });
  return Object.freeze({ ...r(t), create: r });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const W0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), pu = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), N1 = BigInt(1), Ro = BigInt(2), fu = (e, t) => (e + t / Ro) / t;
function T1(e) {
  const t = W0, r = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), _ = BigInt(88), A = e * e * e % t, g = A * A * e % t, m = Fe(g, r, t) * g % t, B = Fe(m, r, t) * g % t, N = Fe(B, Ro, t) * A % t, T = Fe(N, s, t) * N % t, x = Fe(T, i, t) * T % t, F = Fe(x, a, t) * x % t, O = Fe(F, _, t) * F % t, j = Fe(O, a, t) * x % t, P = Fe(j, r, t) * g % t, Z = Fe(P, o, t) * T % t, L = Fe(Z, n, t) * A % t, D = Fe(L, Ro, t);
  if (!So.eql(So.sqr(D), e))
    throw new Error("Cannot find square root");
  return D;
}
const So = w1(W0, void 0, void 0, { sqrt: T1 }), Er = S1({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: So,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: pu,
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
      const t = pu, r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -N1 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = r, o = BigInt("0x100000000000000000000000000000000"), a = fu(i * e, t), _ = fu(-n * e, t);
      let A = Re(e - a * r - _ * s, t), g = Re(-a * n - _ * i, t);
      const m = A > o, B = g > o;
      if (m && (A = t - A), B && (g = t - g), A > o || g > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: m, k1: A, k2neg: B, k2: g };
    }
  }
}, u1);
BigInt(0);
Er.ProjectivePoint;
var Ea = { exports: {} }, an = typeof Reflect == "object" ? Reflect : null, gu = an && typeof an.apply == "function" ? an.apply : function(t, r, n) {
  return Function.prototype.apply.call(t, r, n);
}, Ts;
an && typeof an.ownKeys == "function" ? Ts = an.ownKeys : Object.getOwnPropertySymbols ? Ts = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Ts = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Q1(e) {
  console && console.warn && console.warn(e);
}
var V0 = Number.isNaN || function(t) {
  return t !== t;
};
function Nt() {
  Nt.init.call(this);
}
Ea.exports = Nt;
Ea.exports.once = O1;
Nt.EventEmitter = Nt;
Nt.prototype._events = void 0;
Nt.prototype._eventsCount = 0;
Nt.prototype._maxListeners = void 0;
var wu = 10;
function Ai(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Nt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return wu;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || V0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    wu = e;
  }
});
Nt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Nt.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || V0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Z0(e) {
  return e._maxListeners === void 0 ? Nt.defaultMaxListeners : e._maxListeners;
}
Nt.prototype.getMaxListeners = function() {
  return Z0(this);
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
  var _ = i[t];
  if (_ === void 0)
    return !1;
  if (typeof _ == "function")
    gu(_, this, r);
  else
    for (var A = _.length, g = K0(_, A), n = 0; n < A; ++n)
      gu(g[n], this, r);
  return !0;
};
function J0(e, t, r, n) {
  var s, i, o;
  if (Ai(r), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    r.listener ? r.listener : r
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = r, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), s = Z0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, Q1(a);
  }
  return e;
}
Nt.prototype.addListener = function(t, r) {
  return J0(this, t, r, !1);
};
Nt.prototype.on = Nt.prototype.addListener;
Nt.prototype.prependListener = function(t, r) {
  return J0(this, t, r, !0);
};
function D1() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function j0(e, t, r) {
  var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r }, s = D1.bind(n);
  return s.listener = r, n.wrapFn = s, s;
}
Nt.prototype.once = function(t, r) {
  return Ai(r), this.on(t, j0(this, t, r)), this;
};
Nt.prototype.prependOnceListener = function(t, r) {
  return Ai(r), this.prependListener(t, j0(this, t, r)), this;
};
Nt.prototype.removeListener = function(t, r) {
  var n, s, i, o, a;
  if (Ai(r), s = this._events, s === void 0)
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
    i === 0 ? n.shift() : F1(n, i), n.length === 1 && (s[t] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || r);
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
function q0(e, t, r) {
  var n = e._events;
  if (n === void 0)
    return [];
  var s = n[t];
  return s === void 0 ? [] : typeof s == "function" ? r ? [s.listener || s] : [s] : r ? M1(s) : K0(s, s.length);
}
Nt.prototype.listeners = function(t) {
  return q0(this, t, !0);
};
Nt.prototype.rawListeners = function(t) {
  return q0(this, t, !1);
};
Nt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : $0.call(e, t);
};
Nt.prototype.listenerCount = $0;
function $0(e) {
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
  return this._eventsCount > 0 ? Ts(this._events) : [];
};
function K0(e, t) {
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e[n];
  return r;
}
function F1(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function M1(e) {
  for (var t = new Array(e.length), r = 0; r < t.length; ++r)
    t[r] = e[r].listener || e[r];
  return t;
}
function O1(e, t) {
  return new Promise(function(r, n) {
    function s(o) {
      e.removeListener(t, i), n(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), r([].slice.call(arguments));
    }
    t_(e, t, i, { once: !0 }), t !== "error" && L1(e, s, { once: !0 });
  });
}
function L1(e, t, r) {
  typeof e.on == "function" && t_(e, "error", t, r);
}
function t_(e, t, r, n) {
  if (typeof e.on == "function")
    n.once ? e.once(t, r) : e.on(t, r);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      n.once && e.removeEventListener(t, s), r(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var e_ = Ea.exports, k1 = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", P1 = class {
  constructor(e, t, r, n, s, i = 0) {
    M(this, "left");
    M(this, "right");
    M(this, "parent");
    M(this, "hash");
    M(this, "data");
    M(this, "index");
    this.left = e, this.right = t, this.parent = r, this.hash = n, this.data = s, this.index = i;
  }
}, mu = P1;
function U1(e) {
  return tr("0x00".concat(e.slice(2)));
}
function z1(e, t) {
  return tr("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function r_(e) {
  if (!e.length)
    return k1;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = U1(e[i]);
    t.push(new mu(-1, -1, -1, o, e[i]));
  }
  let r = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const o = i << 1, a = z1(r[o].hash, r[o + 1].hash);
      t[i] = new mu(r[o].index, r[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = r[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, r = t;
  }
  return t[0].hash;
}
var G1 = "0x00", n_ = "0x01";
function X1(e, t) {
  const r = "0x00".concat(e.slice(2)).concat(tr(t).slice(2));
  return [tr(r), r];
}
function jr(e, t) {
  const r = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [tr(r), r];
}
function qi(e) {
  const t = n_.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function H1(e) {
  const t = n_.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function $i(e) {
  return e.slice(0, 4) === G1;
}
var Y1 = class {
  constructor(e, t, r, n, s) {
    M(this, "SideNodes");
    M(this, "NonMembershipLeafData");
    M(this, "BitMask");
    M(this, "NumSideNodes");
    M(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = r, this.NumSideNodes = n, this.SiblingData = s;
  }
}, W1 = Y1, V1 = class {
  constructor(e, t, r) {
    M(this, "SideNodes");
    M(this, "NonMembershipLeafData");
    M(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = r;
  }
}, Z1 = V1, Te = "0x0000000000000000000000000000000000000000000000000000000000000000", ur = 256;
function rn(e, t) {
  const r = e.slice(2), n = "0x".concat(
    r.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function J1(e) {
  let t = 0, r = e.length - 1;
  const n = e;
  for (; t < r; )
    [n[t], n[r]] = [
      n[r],
      n[t]
    ], t += 1, r -= 1;
  return n;
}
function j1(e, t) {
  let r = 0;
  for (let n = 0; n < ur && rn(e, n) === rn(t, n); n += 1)
    r += 1;
  return r;
}
function q1(e) {
  const t = [], r = [];
  let n;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    n = e.SideNodes[i], n === Te ? t.push(0) : (r.push(n), t.push(1));
  return new W1(
    r,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var $1 = class {
  constructor() {
    M(this, "ms");
    M(this, "root");
    const e = {};
    this.ms = e, this.root = Te, this.ms[this.root] = Te;
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
    if (t === Te)
      return [r, Te, "", ""];
    let n = this.get(t);
    if ($i(n))
      return [r, t, n, ""];
    let s, i, o = "", a = "";
    for (let A = 0; A < ur; A += 1) {
      if ([s, i] = H1(n), rn(e, A) === 1 ? (a = s, o = i) : (a = i, o = s), r.push(a), o === Te) {
        n = "";
        break;
      }
      if (n = this.get(o), $i(n))
        break;
    }
    const _ = this.get(a);
    return [J1(r), o, n, _];
  }
  deleteWithSideNodes(e, t, r, n) {
    if (r === Te)
      return this.root;
    const [s] = qi(n);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", _ = "", A = !1;
    for (let g = 0; g < t.length; g += 1)
      if (t[g] !== "") {
        if (a = t[g], o === "")
          if (_ = this.get(a), $i(_)) {
            i = a, o = a;
            continue;
          } else
            o = Te, A = !0;
        !A && a === Te || (A || (A = !0), rn(e, t.length - 1 - g) === 1 ? [i, o] = jr(a, o) : [i, o] = jr(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Te), i;
  }
  updateWithSideNodes(e, t, r, n, s) {
    let i, o;
    this.set(tr(t), t), [i, o] = X1(e, t), this.set(i, o), o = i;
    let a;
    if (n === Te)
      a = ur;
    else {
      const [_] = qi(s);
      a = j1(e, _);
    }
    a !== ur && (rn(e, a) === 1 ? [i, o] = jr(n, o) : [i, o] = jr(o, n), this.set(i, o), o = i);
    for (let _ = 0; _ < ur; _ += 1) {
      let A;
      const g = ur - r.length;
      if (_ - g < 0 || r[_ - g] === "")
        if (a !== ur && a > ur - 1 - _)
          A = Te;
        else
          continue;
      else
        A = r[_ - g];
      rn(e, ur - 1 - _) === 1 ? [i, o] = jr(A, o) : [i, o] = jr(o, A), this.set(i, o), o = i;
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
    for (let _ = 0; _ < t.length; _ += 1)
      t[_] !== "" && i.push(t[_]);
    let o = "";
    if (r !== Te) {
      const [_] = qi(n);
      _ !== e && (o = n);
    }
    return new Z1(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return q1(t);
  }
}, K1 = Object.defineProperty, tE = (e, t, r) => t in e ? K1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Pt = (e, t, r) => (tE(e, typeof t != "symbol" ? t + "" : t, r), r), va = (e, t, r) => {
  if (!t.has(e))
    throw TypeError("Cannot " + r);
}, Ft = (e, t, r) => (va(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Rr = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Xe = (e, t, r, n) => (va(e, t, "write to private field"), t.set(e, r), r), No = (e, t, r) => (va(e, t, "access private method"), r), Ca = (e) => {
  let t, r, n;
  Array.isArray(e) ? (r = e[0], t = e[1], n = e[2] ?? void 0) : (r = e.amount, t = e.assetId, n = e.max ?? void 0);
  const s = S(r);
  return {
    assetId: K(t),
    amount: s.lt(1) ? S(1) : s,
    max: n ? S(n) : void 0
  };
}, eE = (e) => {
  const { amount: t, assetId: r } = e, n = [...e.coinQuantities], s = n.findIndex((i) => i.assetId === r);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: r, amount: t }), n;
}, s_ = st`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Ba = st`
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
    `, i_ = st`
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
    ${Ba}`, rE = st`
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
    `, o_ = st`
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
    ${Ba}`, a_ = st`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, c_ = st`
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
    ${s_}
${i_}
${rE}
${o_}
${a_}`, nE = st`
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
    ${s_}
${i_}
${o_}
${a_}`, us = st`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${nE}`, sE = st`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, iE = st`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${sE}`, oE = st`
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
    `, aE = st`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, cE = st`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${oE}
${aE}`, uE = st`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${cE}
${Ba}`, xa = st`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, dE = st`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, u_ = st`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, _E = st`
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
    `, d_ = st`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, pi = st`
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
    `, hE = st`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, lE = st`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, AE = st`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, pE = st`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, fE = st`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, gE = st`
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
    `, wE = st`
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
    ${gE}`, mE = st`
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
    ${hE}
${lE}
${AE}
${pE}
${fE}
${wE}`, yE = st`
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
    ${pi}
${mE}`, bE = st`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, bn = st`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, IE = st`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, EE = st`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, vE = st`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, CE = st`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${IE}`, BE = st`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${yE}`, xE = st`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${us}`, RE = st`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${us}`, SE = st`
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
    ${us}
${bn}`, NE = st`
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
    ${bn}
${us}`, TE = st`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${iE}`, QE = st`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${pi}`, DE = st`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${pi}
${us}`, FE = st`
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
    ${bn}
${pi}`, ME = st`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${xa}`, OE = st`
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
    ${bn}
${xa}`, LE = st`
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
    ${xa}
${dE}`, kE = st`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, PE = st`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${bE}`, UE = st`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${d_}`, zE = st`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, GE = st`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, XE = st`
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
    ${bn}
${d_}`, HE = st`
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
    ${bn}
${u_}`, YE = st`
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
    ${_E}`, WE = st`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, VE = st`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${EE}`, ZE = st`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${uE}`, JE = st`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, jE = st`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, qE = st`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${u_}`, $E = st`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${c_}`, KE = st`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${c_}`;
function tv(e) {
  return {
    getVersion(t, r) {
      return e(vE, t, r);
    },
    getNodeInfo(t, r) {
      return e(CE, t, r);
    },
    getChain(t, r) {
      return e(BE, t, r);
    },
    getTransaction(t, r) {
      return e(xE, t, r);
    },
    getTransactionWithReceipts(t, r) {
      return e(RE, t, r);
    },
    getTransactions(t, r) {
      return e(SE, t, r);
    },
    getTransactionsByOwner(t, r) {
      return e(NE, t, r);
    },
    estimatePredicates(t, r) {
      return e(TE, t, r);
    },
    getBlock(t, r) {
      return e(QE, t, r);
    },
    getBlockWithTransactions(t, r) {
      return e(DE, t, r);
    },
    getBlocks(t, r) {
      return e(FE, t, r);
    },
    getCoin(t, r) {
      return e(ME, t, r);
    },
    getCoins(t, r) {
      return e(OE, t, r);
    },
    getCoinsToSpend(t, r) {
      return e(LE, t, r);
    },
    getContract(t, r) {
      return e(kE, t, r);
    },
    getContractBalance(t, r) {
      return e(PE, t, r);
    },
    getBalance(t, r) {
      return e(UE, t, r);
    },
    getLatestGasPrice(t, r) {
      return e(zE, t, r);
    },
    estimateGasPrice(t, r) {
      return e(GE, t, r);
    },
    getBalances(t, r) {
      return e(XE, t, r);
    },
    getMessages(t, r) {
      return e(HE, t, r);
    },
    getMessageProof(t, r) {
      return e(YE, t, r);
    },
    getMessageStatus(t, r) {
      return e(WE, t, r);
    },
    getRelayedTransactionStatus(t, r) {
      return e(VE, t, r);
    },
    dryRun(t, r) {
      return e(ZE, t, r);
    },
    submit(t, r) {
      return e(JE, t, r);
    },
    produceBlocks(t, r) {
      return e(jE, t, r);
    },
    getMessageByNonce(t, r) {
      return e(qE, t, r);
    },
    submitAndAwait(t, r) {
      return e($E, t, r);
    },
    statusChange(t, r) {
      return e(KE, t, r);
    }
  };
}
var To = class {
  constructor(e) {
    M(this, "events", []);
    M(this, "parsingLeftover", "");
    this.stream = e;
  }
  static async create(e) {
    const { url: t, query: r, variables: n, fetchFn: s } = e, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: f0(r),
        variables: n
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    });
    return new To(i.body.getReader());
  }
  async next() {
    for (; ; ) {
      if (this.events.length > 0) {
        const { data: o, errors: a } = this.events.shift();
        if (Array.isArray(a))
          throw new R(
            R.CODES.INVALID_REQUEST,
            a.map((_) => _.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const r = To.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (r === "")
        continue;
      const n = `${this.parsingLeftover}${r}`, s = /data:.*\n\n/g, i = [...n.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new R(
            Q.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${n}`
          );
        }
      }), this.parsingLeftover = n.replace(i.join(), "");
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
}, __ = To;
Pt(__, "textDecoder", new TextDecoder());
var Ir = /* @__PURE__ */ new Map(), yu = class {
  constructor(e) {
    M(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new R(
        Q.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(e, t) {
    const r = Date.now(), n = Ir.get(e) || {
      utxos: /* @__PURE__ */ new Set(),
      messages: /* @__PURE__ */ new Set(),
      timestamp: r
    };
    t.utxos.forEach((s) => n.utxos.add(K(s))), t.messages.forEach((s) => n.messages.add(K(s))), Ir.set(e, n);
  }
  // Remove resources from the cache for a given transaction ID
  unset(e) {
    Ir.delete(e);
  }
  // Get all cached resources and remove expired ones
  getActiveData() {
    const e = { utxos: [], messages: [] }, t = Date.now();
    return Ir.forEach((r, n) => {
      t - r.timestamp < this.ttl ? (e.utxos.push(...r.utxos), e.messages.push(...r.messages)) : Ir.delete(n);
    }), e;
  }
  // Check if a UTXO ID or message nonce is already cached and not expired
  isCached(e) {
    const t = Date.now();
    for (const [r, n] of Ir.entries())
      if (t - n.timestamp > this.ttl)
        Ir.delete(r);
      else if (n.utxos.has(e) || n.messages.has(e))
        return !0;
    return !1;
  }
  clear() {
    Ir.clear();
  }
}, ev = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ct.Coin: {
      const r = $(e.predicate ?? "0x"), n = $(e.predicateData ?? "0x");
      return {
        type: Ct.Coin,
        txID: K($(e.id).slice(0, lr)),
        outputIndex: Br($(e.id).slice(lr, Ms)),
        owner: K(e.owner),
        amount: S(e.amount),
        assetId: K(e.assetId),
        txPointer: {
          blockHeight: Br($(e.txPointer).slice(0, 8)),
          txIndex: Br($(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: S(e.predicateGasUsed),
        predicateLength: S(r.length),
        predicateDataLength: S(n.length),
        predicate: K(r),
        predicateData: K(n)
      };
    }
    case Ct.Contract:
      return {
        type: Ct.Contract,
        txID: Mt,
        outputIndex: 0,
        balanceRoot: Mt,
        stateRoot: Mt,
        txPointer: {
          blockHeight: Br($(e.txPointer).slice(0, 8)),
          txIndex: Br($(e.txPointer).slice(8, 16))
        },
        contractID: K(e.contractId)
      };
    case Ct.Message: {
      const r = $(e.predicate ?? "0x"), n = $(e.predicateData ?? "0x"), s = $(e.data ?? "0x");
      return {
        type: Ct.Message,
        sender: K(e.sender),
        recipient: K(e.recipient),
        amount: S(e.amount),
        nonce: K(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: S(e.predicateGasUsed),
        predicateLength: S(r.length),
        predicateDataLength: S(n.length),
        predicate: K(r),
        predicateData: K(n),
        data: K(s),
        dataLength: s.length
      };
    }
    default:
      throw new R(
        Q.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, rv = (e) => {
  const { type: t } = e;
  switch (t) {
    case It.Coin:
      return {
        type: It.Coin,
        to: K(e.to),
        amount: S(e.amount),
        assetId: K(e.assetId)
      };
    case It.Contract:
      return {
        type: It.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Mt,
        stateRoot: Mt
      };
    case It.Change:
      return {
        type: It.Change,
        to: K(e.to),
        amount: S(0),
        assetId: K(e.assetId)
      };
    case It.Variable:
      return {
        type: It.Variable,
        to: Mt,
        amount: S(0),
        assetId: Mt
      };
    case It.ContractCreated:
      return {
        type: It.ContractCreated,
        contractId: K(e.contractId),
        stateRoot: K(e.stateRoot)
      };
    default:
      throw new R(
        Q.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, qB = (e) => "utxoId" in e, $B = (e) => "recipient" in e, nv = (e) => "id" in e, KB = (e) => "recipient" in e, sv = (e) => e.type === lt.Revert && e.val.toString("hex") === E0, iv = (e) => e.type === lt.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", bu = (e) => e.reduce(
  (t, r) => (sv(r) && t.missingOutputVariables.push(r), iv(r) && t.missingOutputContractIds.push(r), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Qt = (e) => e || Mt;
function ov(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: lt.Call,
        from: Qt(e.id || e.contractId),
        to: Qt(e == null ? void 0 : e.to),
        amount: S(e.amount),
        assetId: Qt(e.assetId),
        gas: S(e.gas),
        param1: S(e.param1),
        param2: S(e.param2),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "RETURN":
      return {
        type: lt.Return,
        id: Qt(e.id || e.contractId),
        val: S(e.val),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "RETURN_DATA":
      return {
        type: lt.ReturnData,
        id: Qt(e.id || e.contractId),
        ptr: S(e.ptr),
        len: S(e.len),
        digest: Qt(e.digest),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "PANIC":
      return {
        type: lt.Panic,
        id: Qt(e.id),
        reason: S(e.reason),
        pc: S(e.pc),
        is: S(e.is),
        contractId: Qt(e.contractId)
      };
    case "REVERT":
      return {
        type: lt.Revert,
        id: Qt(e.id || e.contractId),
        val: S(e.ra),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "LOG":
      return {
        type: lt.Log,
        id: Qt(e.id || e.contractId),
        val0: S(e.ra),
        val1: S(e.rb),
        val2: S(e.rc),
        val3: S(e.rd),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "LOG_DATA":
      return {
        type: lt.LogData,
        id: Qt(e.id || e.contractId),
        val0: S(e.ra),
        val1: S(e.rb),
        ptr: S(e.ptr),
        len: S(e.len),
        digest: Qt(e.digest),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "TRANSFER":
      return {
        type: lt.Transfer,
        from: Qt(e.id || e.contractId),
        to: Qt(e.toAddress || (e == null ? void 0 : e.to)),
        amount: S(e.amount),
        assetId: Qt(e.assetId),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: lt.TransferOut,
        from: Qt(e.id || e.contractId),
        to: Qt(e.toAddress || e.to),
        amount: S(e.amount),
        assetId: Qt(e.assetId),
        pc: S(e.pc),
        is: S(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: lt.ScriptResult,
        result: S(e.result),
        gasUsed: S(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const r = Qt(e.sender), n = Qt(e.recipient), s = Qt(e.nonce), i = S(e.amount), o = e.data ? $(e.data) : Uint8Array.from([]), a = Qt(e.digest), _ = zs.getMessageId({
        sender: r,
        recipient: n,
        nonce: s,
        amount: i,
        data: o
      });
      return {
        type: lt.MessageOut,
        sender: r,
        recipient: n,
        amount: i,
        nonce: s,
        data: o,
        digest: a,
        messageId: _
      };
    }
    case "MINT": {
      const r = Qt(e.id || e.contractId), n = Qt(e.subId), s = zn.getAssetId(r, n);
      return {
        type: lt.Mint,
        subId: n,
        contractId: r,
        assetId: s,
        val: S(e.val),
        pc: S(e.pc),
        is: S(e.is)
      };
    }
    case "BURN": {
      const r = Qt(e.id || e.contractId), n = Qt(e.subId), s = wo.getAssetId(r, n);
      return {
        type: lt.Burn,
        subId: n,
        contractId: r,
        assetId: s,
        val: S(e.val),
        pc: S(e.pc),
        is: S(e.is)
      };
    }
    default:
      throw new R(Q.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var av = "https://fuellabs.github.io/block-explorer-v2", cv = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, t2 = (e = {}) => {
  const { blockExplorerUrl: t, path: r, providerUrl: n, address: s, txId: i, blockNumber: o } = e, a = t || av, _ = [
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
  ], A = _.filter((Z) => !!Z.value).map(({ key: Z, value: L }) => ({
    key: Z,
    value: L
  })), g = A.length > 0;
  if (A.length > 1)
    throw new R(
      Q.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${_.map((Z) => Z.key).join(", ")}.`
    );
  if (r && A.length > 0) {
    const Z = _.map(({ key: L }) => L).join(", ");
    throw new R(
      Q.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${Z}.`
    );
  }
  const m = g ? cv(
    A[0].key,
    A[0].value
  ) : "", B = /^\/|\/$/gm, N = r ? r.replace(B, "") : m, T = a.replace(B, ""), x = n == null ? void 0 : n.replace(B, ""), F = x ? encodeURIComponent(x) : void 0, O = T.match(/^https?:\/\//) ? "" : "https://", j = x != null && x.match(/^https?:\/\//) ? "" : "https://";
  return `${O}${T}/${N}${F ? `?providerUrl=${j}${F}` : ""}`;
}, fi = (e) => e.filter(
  (n) => n.type === lt.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), S(0));
function $e(e, t) {
  const r = S(t.base);
  let n = S(0);
  return "unitsPerGas" in t ? n = S(e).div(S(t.unitsPerGas)) : n = S(e).mul(S(t.gasPerUnit)), r.add(n);
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
  }), i = $e(t, r.vmInitialization);
  return s.reduce((a, _) => "predicate" in _ && _.predicate && _.predicate !== "0x" ? a.add(
    i.add($e($(_.predicate).length, r.contractRoot)).add(S(_.predicateGasUsed))
  ) : a.add(r.ecr1), S(0));
}
function h_(e) {
  const { gasCosts: t, gasPerByte: r, inputs: n, metadataGas: s, txBytesSize: i } = e, o = $e(i, t.vmInitialization), a = S(i).mul(r), _ = uv(n, i, t);
  return o.add(a).add(_).add(s).maxU64();
}
function Ra(e) {
  const {
    gasPerByte: t,
    witnessesLength: r,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = S(0),
    maxGasPerTx: o
  } = e;
  let a = S(0);
  n != null && n.gt(0) && n.gte(r) && (a = S(n).sub(r).mul(t));
  const _ = a.add(s).add(i);
  return _.gte(o) ? o : _;
}
function l_({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: r,
  contractBytesSize: n
}) {
  const s = $e(n, e.contractRoot), i = $e(t, e.stateRoot), o = $e(r, e.s256), a = S(100), _ = $e(a, e.s256);
  return s.add(i).add(o).add(_).maxU64();
}
function A_({
  gasCosts: e,
  txBytesSize: t
}) {
  return $e(t, e.s256);
}
function dv({
  gasCosts: e,
  txBytesSize: t,
  witnessBytesSize: r
}) {
  const n = $e(t, e.s256), s = $e(r, e.s256);
  return n.add(s);
}
var Yn = (e) => {
  const { gas: t, gasPrice: r, priceFactor: n, tip: s } = e;
  return t.mul(r).div(n).add(S(s));
};
function Qo(e) {
  return Object.keys(e).forEach((t) => {
    var r;
    switch ((r = e[t]) == null ? void 0 : r.constructor.name) {
      case "Uint8Array":
        e[t] = K(e[t]);
        break;
      case "Array":
        e[t] = Qo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Qo(e[t]);
        break;
    }
  }), e;
}
function _v(e) {
  return Qo(He(e));
}
var hv = (e, t) => {
  let r = `The transaction reverted with reason: "${e}".`;
  return Zf.includes(e) && (r = `${r}

You can read more about this error at:

${Jf}#variant.${e}`), new R(Q.SCRIPT_REVERTED, r, {
    ...t,
    reason: e
  });
}, Nn = (e) => JSON.stringify(e, null, 2), lv = (e, t, r) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = e.find(({ type: o }) => o === lt.Revert);
  let i = "";
  if (s)
    switch (S(s.val).toHex()) {
      case Hf: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Nn(t[0]) : "an error."}.`;
        break;
      }
      case Yf: {
        const a = t.length >= 2 ? ` comparing ${Nn(t[1])} and ${Nn(t[0])}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${a}`;
        break;
      }
      case Vf: {
        const a = t.length >= 2 ? ` comparing ${Nn(t[1])} and ${Nn(t[0])}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${a}`;
        break;
      }
      case Wf:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case E0:
        i = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        throw new R(
          Q.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...r,
            reason: "unknown"
          }
        );
    }
  return new R(Q.SCRIPT_REVERTED, n, {
    ...r,
    reason: i
  });
}, Sa = (e) => {
  const { receipts: t, statusReason: r, logs: n } = e, s = t.some(({ type: a }) => a === lt.Panic), i = t.some(({ type: a }) => a === lt.Revert), o = {
    logs: n,
    receipts: t,
    panic: s,
    revert: i,
    reason: ""
  };
  return s ? hv(r, o) : lv(t, n, o);
}, e2 = class extends Error {
  constructor() {
    super(...arguments);
    M(this, "name", "ChangeOutputCollisionError");
    M(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, Av = class extends Error {
  constructor(t) {
    super();
    M(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, r2 = class extends Error {
  constructor(t) {
    super();
    M(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, In = (e) => e.type === Ct.Coin, Na = (e) => e.type === Ct.Message, Qr = (e) => In(e) || Na(e), p_ = (e) => In(e) ? e.owner : e.recipient, Do = (e, t) => p_(e) === t.toB256(), pv = (e, t, r) => e.filter(Qr).reduce((n, s) => In(s) && s.assetId === t || Na(s) && t === r ? n.add(s.amount) : n, S(0)), n2 = (e) => e.filter(Qr).reduce(
  (t, r) => (In(r) ? t.utxos.push(r.id) : t.messages.push(r.nonce), t),
  {
    utxos: [],
    messages: []
  }
), fv = (e, t) => e.reduce(
  (r, n) => (In(n) && n.owner === t.toB256() ? r.utxos.push(n.id) : Na(n) && n.recipient === t.toB256() && r.messages.push(n.nonce), r),
  {
    utxos: [],
    messages: []
  }
), gv = (e) => {
  const t = $(e);
  return {
    data: K(t),
    dataLength: t.length
  };
}, gi = class {
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
    this.tip = e ? S(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = Fr(n) ? S(n) : void 0, this.maxFee = S(r), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const r = [], { tip: n, witnessLimit: s, maturity: i } = e;
    return S(n).gt(0) && (t += ze.Tip, r.push({ data: S(n), type: ze.Tip })), Fr(s) && S(s).gte(0) && (t += ze.WitnessLimit, r.push({ data: S(s), type: ze.WitnessLimit })), i && i > 0 && (t += ze.Maturity, r.push({ data: i, type: ze.Maturity })), t += ze.MaxFee, r.push({ data: e.maxFee, type: ze.MaxFee }), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(ev)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(rv)) ?? [], r = ((a = this.witnesses) == null ? void 0 : a.map(gv)) ?? [], { policyTypes: n, policies: s } = gi.getPolicyMeta(this);
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
    return new hr().encode(this.toTransaction());
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
    return this.addWitness(ct([Mt, Mt])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const r = pt.fromAddressOrString(e), n = this.getCoinInputWitnessIndexByOwner(r);
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
      throw new Av(e);
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
      (e) => e.type === It.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === It.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = Qn(e), r = this.inputs.find((n) => {
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
    const _ = {
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
    this.pushInput(_), this.addChangeOutput(r, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: r, amount: n, predicate: s, nonce: i, assetId: o, predicateData: a } = e;
    let _;
    e.predicate ? _ = 0 : (_ = this.getCoinInputWitnessIndexByOwner(t), typeof _ != "number" && (_ = this.addEmptyWitness()));
    const A = {
      nonce: i,
      type: Ct.Message,
      sender: r.toB256(),
      recipient: t.toB256(),
      amount: n,
      witnessIndex: _,
      predicate: s,
      predicateData: a
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
    return nv(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      type: It.Coin,
      to: Qn(e).toB256(),
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
    return t.map(Ca).forEach((r) => {
      this.pushOutput({
        type: It.Coin,
        to: Qn(e).toB256(),
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
      type: It.Change,
      to: Qn(e).toB256(),
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(e) {
    const { consensusParameters: t } = e, {
      gasCosts: r,
      feeParameters: { gasPerByte: n }
    } = t;
    return h_({
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
    return Ra({
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
   */
  fundWithFakeUtxos(e, t, r) {
    const n = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const a = n(i);
      let _ = o;
      i === t && (_ = S("1000000000000000000")), a && "assetId" in a ? (a.id = K(Oe(Ms)), a.amount = _) : this.addResources([
        {
          id: K(Oe(Ms)),
          amount: _,
          assetId: i,
          owner: r || pt.fromRandom(),
          blockCreated: S(1),
          txCreatedIdx: S(1)
        }
      ]);
    };
    return s(t, S(1e11)), e.forEach((i) => s(i.assetId, i.amount)), this;
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: r }) => ({
      amount: S(t),
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
    return _v(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(Qr).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(e) {
    const t = e.filter(Qr);
    this.inputs.filter(Qr).forEach((r) => {
      const n = p_(r), s = t.find(
        (i) => Do(i, pt.fromString(String(n)))
      );
      s && "predicateGasUsed" in s && S(s.predicateGasUsed).gt(0) && (r.predicateGasUsed = s.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
};
function Ta(e, t) {
  const r = e.toTransaction();
  r.type === Gt.Script && (r.receiptsRoot = Mt), r.inputs = r.inputs.map((i) => {
    const o = He(i);
    switch (o.type) {
      case Ct.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = S(0), o;
      case Ct.Message:
        return o.predicateGasUsed = S(0), o;
      case Ct.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Mt, o.outputIndex = 0, o.balanceRoot = Mt, o.stateRoot = Mt, o;
      default:
        return o;
    }
  }), r.outputs = r.outputs.map((i) => {
    const o = He(i);
    switch (o.type) {
      case It.Contract:
        return o.balanceRoot = Mt, o.stateRoot = Mt, o;
      case It.Change:
        return o.amount = S(0), o;
      case It.Variable:
        return o.to = Mt, o.amount = S(0), o.assetId = Mt, o;
      default:
        return o;
    }
  }), r.witnessesCount = 0, r.witnesses = [];
  const n = dA(t), s = ct([n, new hr().encode(r)]);
  return Ee(s);
}
var Fo = class extends gi {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: t, blobId: r, ...n }) {
    super(n);
    /** Type of the transaction */
    M(this, "type", Gt.Blob);
    /** Blob ID */
    M(this, "blobId");
    /** Witness index of contract bytecode to create */
    M(this, "witnessIndex");
    this.blobId = r, this.witnessIndex = t ?? 0;
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const t = this.getBaseTransaction(), { witnessIndex: r, blobId: n } = this;
    return {
      type: Gt.Blob,
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
    return Ta(this, t);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(t) {
    return dv({
      gasCosts: t,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, wv = (e) => {
  const t = new Uint8Array(32);
  return t.set($(e)), t;
}, mv = (e) => {
  let t, r;
  return Array.isArray(e) ? (t = e[0], r = e[1]) : (t = e.key, r = e.value), {
    key: K(t),
    value: K(wv(r))
  };
}, Mo = class extends gi {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: r, storageSlots: n, ...s }) {
    super(s);
    /** Type of the transaction */
    M(this, "type", Gt.Create);
    /** Witness index of contract bytecode to create */
    M(this, "bytecodeWitnessIndex");
    /** Salt */
    M(this, "salt");
    /** List of storage slots to initialize */
    M(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = K(r ?? Mt), this.storageSlots = [...n ?? []];
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
    const t = this.getBaseTransaction(), r = this.bytecodeWitnessIndex, n = ((s = this.storageSlots) == null ? void 0 : s.map(mv)) ?? [];
    return {
      type: Gt.Create,
      ...t,
      bytecodeWitnessIndex: r,
      storageSlotsCount: S(n.length),
      salt: this.salt ? K(this.salt) : Mt,
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
      (t) => t.type === It.ContractCreated
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
    return Ta(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, r) {
    this.pushOutput({
      type: It.ContractCreated,
      contractId: t,
      stateRoot: r
    });
  }
  metadataGas(t) {
    return l_({
      contractBytesSize: S($(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Iu = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: $("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, yv = {
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
}, Hr = class extends gi {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: r, gasLimit: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    M(this, "type", Gt.Script);
    /** Gas limit for transaction */
    M(this, "gasLimit");
    /** Script to execute */
    M(this, "script");
    /** Script input data (parameters) */
    M(this, "scriptData");
    M(this, "abis");
    this.gasLimit = S(n), this.script = $(t ?? Iu.bytes), this.scriptData = $(r ?? Iu.encodeScriptData()), this.abis = s.abis;
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
    const t = $(this.script ?? "0x"), r = $(this.scriptData ?? "0x");
    return {
      type: Gt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: S(t.length),
      scriptDataLength: S(r.length),
      receiptsRoot: Mt,
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
      (t) => t.type === It.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === It.Variable
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
        type: It.Variable
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
      (a, _) => a + _.dataLength,
      0
    );
    return Ra({
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
    const r = Qn(t);
    if (this.getContractInputs().find((s) => s.contractId === r.toB256()))
      return this;
    const n = super.pushInput({
      type: Ct.Contract,
      contractId: r.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: It.Contract,
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
    return Ta(this, t);
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
}, Ce = (e) => {
  if (e instanceof Hr || e instanceof Mo || e instanceof Fo)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Gt.Script:
      return Hr.from(e);
    case Gt.Create:
      return Mo.from(e);
    case Gt.Blob:
      return Fo.from(e);
    default:
      throw new R(
        Q.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, kr = (e) => e.type === Gt.Script, bv = (e) => e.type === Gt.Create, s2 = (e) => e.type === Gt.Blob, Iv = (e) => {
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
  const _ = S(o.gasPerByte), A = S(o.gasPriceFactor), g = $(r), [m] = new hr().decode(g, 0), { type: B, witnesses: N, inputs: T, policies: x } = m;
  let F = S(0), O = S(0);
  if (B !== Gt.Create && B !== Gt.Script)
    return S(0);
  if (B === Gt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: G } = m, H = S($(N[U].data).length);
    F = l_({
      contractBytesSize: H,
      gasCosts: i,
      stateRootSize: G.length || 0,
      txBytesSize: g.length
    });
  } else {
    const { scriptGasLimit: U } = m;
    U && (O = U), F = A_({
      gasCosts: i,
      txBytesSize: g.length
    });
  }
  const j = h_({
    gasCosts: i,
    gasPerByte: S(_),
    inputs: T,
    metadataGas: F,
    txBytesSize: g.length
  }), P = (z = x.find((U) => U.type === ze.WitnessLimit)) == null ? void 0 : z.data, Z = N.reduce((U, G) => U + G.dataLength, 0), L = Ra({
    gasPerByte: _,
    minGas: j,
    witnessesLength: Z,
    gasLimit: O,
    witnessLimit: P,
    maxGasPerTx: a
  });
  return Yn({
    gasPrice: t,
    gas: L,
    priceFactor: A,
    tip: n
  });
}, Ev = ({ abi: e, receipt: t }) => {
  var g;
  const r = new Ar(e), n = t.param1.toHex(8), s = r.getFunction(n), i = s.jsonFn.inputs, o = t.param2.toHex();
  let a;
  const _ = s.decodeArguments(o);
  return _ && (a = i.reduce((m, B, N) => {
    const T = _[N], x = B.name;
    return x ? {
      ...m,
      // reparse to remove bn
      [x]: JSON.parse(JSON.stringify(T))
    } : m;
  }, {})), {
    functionSignature: s.signature,
    functionName: s.name,
    argumentsProvided: a,
    ...(g = t.amount) != null && g.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function vv(e, t) {
  return e.filter((r) => t.includes(r.type));
}
function Qa(e, t) {
  return e.filter((r) => r.type === t);
}
function Cv(e) {
  return Qa(e, Ct.Coin);
}
function Bv(e) {
  return Qa(e, Ct.Message);
}
function f_(e) {
  return vv(e, [Ct.Coin, Ct.Message]);
}
function Eu(e) {
  return e.type === Ct.Coin;
}
function xv(e) {
  return Qa(e, Ct.Contract);
}
function Rv(e, t) {
  return Cv(e).find((n) => n.assetId === t);
}
function Sv(e, t) {
  const r = /* @__PURE__ */ new Map();
  return f_(e).forEach((n) => {
    const s = Eu(n) ? n.assetId : t, i = Eu(n) ? n.owner : n.recipient;
    let o = r.get(s);
    o || (o = /* @__PURE__ */ new Map(), r.set(s, o));
    let a = o.get(i);
    a || (a = new kt(0), o.set(i, a)), o.set(i, a.add(n.amount));
  }), r;
}
function Nv(e) {
  var t;
  return (t = Bv(e)) == null ? void 0 : t[0];
}
function g_(e, t, r = !1) {
  const n = Rv(e, t);
  if (n)
    return n;
  if (r)
    return Nv(e);
}
function Tv(e, t) {
  if (t == null)
    return;
  const r = e == null ? void 0 : e[t];
  if (r) {
    if (r.type !== Ct.Contract)
      throw new R(
        Q.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return r;
  }
}
function Da(e) {
  return e.type === Ct.Coin ? e.owner.toString() : e.type === Ct.Message ? e.recipient.toString() : "";
}
function ds(e, t) {
  return e.filter((r) => r.type === t);
}
function Qv(e) {
  return ds(e, It.ContractCreated);
}
function w_(e) {
  return ds(e, It.Coin);
}
function Dv(e) {
  return ds(e, It.Change);
}
function Fv(e) {
  return ds(e, It.Contract);
}
function i2(e) {
  return ds(e, It.Variable);
}
var Mv = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e.Blob = "Blob", e))(Mv || {}), m_ = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(m_ || {}), Ov = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(Ov || {}), Lv = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(Lv || {}), kv = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(kv || {});
function Wn(e, t) {
  return (e ?? []).filter((r) => r.type === t);
}
function y_(e) {
  switch (e) {
    case Gt.Mint:
      return "Mint";
    case Gt.Create:
      return "Create";
    case Gt.Script:
      return "Script";
    case Gt.Blob:
      return "Blob";
    default:
      throw new R(
        Q.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${e}.`
      );
  }
}
function En(e, t) {
  return y_(e) === t;
}
function Pv(e) {
  return En(
    e,
    "Mint"
    /* Mint */
  );
}
function b_(e) {
  return En(
    e,
    "Create"
    /* Create */
  );
}
function I_(e) {
  return En(
    e,
    "Script"
    /* Script */
  );
}
function Uv(e) {
  return En(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function zv(e) {
  return En(
    e,
    "Upload"
    /* Upload */
  );
}
function Gv(e) {
  return En(
    e,
    "Blob"
    /* Blob */
  );
}
function o2(e) {
  return (t) => e.assetId === t.assetId;
}
function Xv(e) {
  return Wn(e, lt.Call);
}
function Hv(e) {
  return Wn(e, lt.MessageOut);
}
function Yv(e, t) {
  const r = e.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return r.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const o = s.get(i.assetId);
    o ? o.amount = S(o.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
function Wv(e, t) {
  var r, n, s, i, o, a, _, A;
  return e.name === t.name && ((r = e.from) == null ? void 0 : r.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((_ = e.to) == null ? void 0 : _.type) === ((A = t.to) == null ? void 0 : A.type);
}
function Vv(e, t) {
  var r, n;
  return (r = t.assetsSent) != null && r.length ? (n = e.assetsSent) != null && n.length ? Yv(e, t) : t.assetsSent : e.assetsSent;
}
function Zv(e, t) {
  var r;
  return (r = t.calls) != null && r.length ? [...e.calls || [], ...t.calls] : e.calls;
}
function Jv(e, t) {
  return {
    ...e,
    assetsSent: Vv(e, t),
    calls: Zv(e, t)
  };
}
function Vn(e, t) {
  const r = e.findIndex((n) => Wv(n, t));
  return r === -1 ? [...e, t] : e.map((n, s) => s === r ? Jv(n, t) : n);
}
function a2(e) {
  return Wn(e, lt.TransferOut);
}
function jv({
  inputs: e,
  receipts: t,
  baseAssetId: r
}) {
  return Hv(t).reduce(
    (i, o) => {
      const a = g_(e, r, !0);
      if (a) {
        const _ = Da(a);
        return Vn(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: _
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
function qv(e, t, r, n, s) {
  const i = t == null ? void 0 : t[e.contractID];
  return i ? [
    Ev({
      abi: i,
      receipt: r,
      rawPayload: n,
      maxInputs: s
    })
  ] : [];
}
function $v(e) {
  var t;
  return (t = e.amount) != null && t.isZero() ? void 0 : [
    {
      amount: e.amount,
      assetId: e.assetId
    }
  ];
}
function Kv(e, t, r, n, s, i, o) {
  const a = e.assetId === Mt ? o : e.assetId, _ = g_(r, a, a === o);
  if (!_)
    return [];
  const A = Da(_), g = qv(t, n, e, s, i);
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
      assetsSent: $v(e),
      calls: g
    }
  ];
}
function tC({
  inputs: e,
  outputs: t,
  receipts: r,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: o
}) {
  const a = Xv(r);
  return Fv(t).flatMap((A) => {
    const g = Tv(e, A.inputIndex);
    return g ? a.filter((m) => m.to === g.contractID).flatMap(
      (m) => Kv(
        m,
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
function eC(e, t, r) {
  const { to: n, assetId: s, amount: i } = e;
  let { from: o } = e;
  const a = t.some((A) => A.contractID === n) ? 0 : 1;
  if (Mt === o) {
    const A = r.find((g) => g.assetId === s);
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
function rC({
  inputs: e,
  outputs: t,
  receipts: r,
  baseAssetId: n
}) {
  let s = [];
  const i = w_(t), o = xv(e), a = Dv(t), _ = Sv(e, n);
  i.forEach(({ amount: m, assetId: B, to: N }) => {
    const T = _.get(B) || /* @__PURE__ */ new Map();
    let x, F;
    for (const [O, j] of T)
      if (F || (F = O), j.gte(m)) {
        x = O;
        break;
      }
    x = x || F, x && (s = Vn(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: x
      },
      to: {
        type: 1,
        address: N
      },
      assetsSent: [{ assetId: B, amount: m }]
    }));
  });
  const A = Wn(
    r,
    lt.Transfer
  ), g = Wn(
    r,
    lt.TransferOut
  );
  return [...A, ...g].forEach((m) => {
    const B = eC(m, o, a);
    s = Vn(s, B);
  }), s;
}
function nC(e) {
  return w_(e).reduce((n, s) => Vn(n, {
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
function sC({ inputs: e, outputs: t }) {
  const r = Qv(t), n = f_(e)[0], s = Da(n);
  return r.reduce((o, a) => Vn(o, {
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
function iC({
  transactionType: e,
  inputs: t,
  outputs: r,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: o,
  baseAssetId: a
}) {
  return b_(e) ? [...sC({ inputs: t, outputs: r })] : I_(e) ? [
    ...rC({ inputs: t, outputs: r, receipts: n, baseAssetId: a }),
    ...tC({
      inputs: t,
      outputs: r,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: o,
      baseAssetId: a
    }),
    ...jv({ inputs: t, receipts: n, baseAssetId: a })
  ] : [...nC(r)];
}
var Sr = (e) => {
  const t = ov(e);
  switch (t.type) {
    case lt.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case lt.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, oC = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === lt.Mint && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, aC = (e) => {
  const t = [];
  return e.forEach((r) => {
    r.type === lt.Burn && t.push({
      subId: r.subId,
      contractId: r.contractId,
      assetId: r.assetId,
      amount: r.val
    });
  }), t;
}, cC = (e) => {
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
        Q.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, uC = (e) => {
  let t, r, n, s, i, o = !1, a = !1, _ = !1;
  if (e != null && e.type)
    switch (n = cC(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, r = e.block.id, a = !0, s = S(e.totalFee), i = S(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, r = e.block.id, o = !0, s = S(e.totalFee), i = S(e.totalGas);
        break;
      case "SubmittedStatus":
        t = e.time, _ = !0;
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
    isStatusPending: _
  };
};
function wi(e) {
  var d, p;
  const {
    id: t,
    receipts: r,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: a,
    abiMap: _ = {},
    maxInputs: A,
    gasCosts: g,
    maxGasPerTx: m,
    gasPrice: B,
    baseAssetId: N
  } = e, T = fi(r), x = K(o), F = iC({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: r,
    rawPayload: x,
    abiMap: _,
    maxInputs: A,
    baseAssetId: N
  }), O = y_(i.type), j = S((p = (d = i.policies) == null ? void 0 : d.find((y) => y.type === ze.Tip)) == null ? void 0 : p.data), { isStatusFailure: P, isStatusPending: Z, isStatusSuccess: L, blockId: D, status: z, time: U, totalFee: G } = uC(a), H = Iv({
    totalFee: G,
    gasPrice: B,
    rawPayload: x,
    tip: j,
    consensusParameters: {
      gasCosts: g,
      maxGasPerTx: m,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), Y = oC(r), nt = aC(r);
  let C;
  return U && (C = Vo.fromTai64(U)), {
    id: t,
    tip: j,
    fee: H,
    gasUsed: T,
    operations: F,
    type: O,
    blockId: D,
    time: U,
    status: z,
    receipts: r,
    mintedAssets: Y,
    burnedAssets: nt,
    isTypeMint: Pv(i.type),
    isTypeCreate: b_(i.type),
    isTypeScript: I_(i.type),
    isTypeUpgrade: Uv(i.type),
    isTypeUpload: zv(i.type),
    isTypeBlob: Gv(i.type),
    isStatusFailure: P,
    isStatusSuccess: L,
    isStatusPending: Z,
    date: C,
    transaction: i
  };
}
function Fa(e, t, r = {}) {
  return e.reduce((n, s) => {
    if (s.type === lt.LogData || s.type === lt.Log) {
      const i = new Ar(r[s.id] || t), o = s.type === lt.Log ? new k("u64").encode(s.val0) : s.data, [a] = i.decodeLog(o, s.val1.toString());
      n.push(a);
    }
    return n;
  }, []);
}
function dC(e) {
  return e.map((t) => {
    const r = "amount" in t ? { ...t, amount: S(t.amount) } : t;
    switch (r.type) {
      case "CoinOutput":
        return { ...r, type: It.Coin };
      case "ContractOutput":
        return {
          ...r,
          type: It.Contract,
          inputIndex: parseInt(r.inputIndex, 10)
        };
      case "ChangeOutput":
        return {
          ...r,
          type: It.Change
        };
      case "VariableOutput":
        return { ...r, type: It.Variable };
      case "ContractCreated":
        return {
          ...r,
          type: It.ContractCreated,
          contractId: r.contract
        };
      default:
        return Zh();
    }
  });
}
var Oo = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(e, t, r) {
    /** Transaction ID */
    M(this, "id");
    /** Current provider */
    M(this, "provider");
    /** Gas used on the transaction */
    M(this, "gasUsed", S(0));
    /** The graphql Transaction with receipts object. */
    M(this, "gqlTransaction");
    M(this, "request");
    M(this, "status");
    M(this, "abis");
    this.id = typeof e == "string" ? e : e.getTransactionId(t.getChainId()), this.provider = t, this.abis = r, this.request = typeof e == "string" ? void 0 : e;
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
    const n = new Oo(e, t, r);
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
    }), r.outputs = dC(t.transaction.outputs), "receiptsRoot" in t.transaction && (r.receiptsRoot = t.transaction.receiptsRoot));
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
        return e.receipts.map(Sr);
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
    return (t = new hr().decode(
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
    var m;
    const { tx: t, bytes: r } = await this.getTransaction(), { gasPerByte: n, gasPriceFactor: s, gasCosts: i, maxGasPerTx: o } = this.provider.getGasConfig(), a = await this.provider.getLatestGasPrice(), _ = this.provider.getChain().consensusParameters.txParameters.maxInputs, A = this.provider.getBaseAssetId();
    return wi({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: t,
      transactionBytes: r,
      gqlTransactionStatus: this.status ?? ((m = this.gqlTransaction) == null ? void 0 : m.status),
      gasPerByte: n,
      gasPriceFactor: s,
      abiMap: e,
      maxInputs: _,
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
    const t = await this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const { statusChange: s } of t) {
      if (this.status = s, s.type === "SqueezedOutStatus")
        throw this.unsetResourceCache(), new R(
          Q.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${s.reason}`
        );
      if (s.type !== "SubmittedStatus")
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
    this.abis && (n = Fa(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), r.logs = n);
    const { receipts: s } = r, i = this.status ?? ((o = this.gqlTransaction) == null ? void 0 : o.status);
    if ((i == null ? void 0 : i.type) === "FailureStatus") {
      this.unsetResourceCache();
      const { reason: a } = i;
      throw Sa({
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
function _C(e, t) {
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
function E_(e, t, r = 0) {
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
      const _ = _C(t, a);
      return await Uh(_), E_(e, t, a)(...n);
    }
  };
}
var vu = 10, Cu = 512, hC = 5, lC = 2e4, AC = (e) => {
  const { name: t, daHeight: r, consensusParameters: n, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: a,
    scriptParams: _,
    txParams: A,
    gasCosts: g,
    baseAssetId: m,
    chainId: B,
    version: N
  } = n;
  return {
    name: t,
    baseChainHeight: S(r),
    consensusParameters: {
      version: N,
      chainId: S(B),
      baseAssetId: m,
      feeParameters: {
        version: o.version,
        gasPerByte: S(o.gasPerByte),
        gasPriceFactor: S(o.gasPriceFactor)
      },
      contractParameters: {
        version: i.version,
        contractMaxSize: S(i.contractMaxSize),
        maxStorageSlots: S(i.maxStorageSlots)
      },
      txParameters: {
        version: A.version,
        maxInputs: S(A.maxInputs),
        maxOutputs: S(A.maxOutputs),
        maxWitnesses: S(A.maxWitnesses),
        maxGasPerTx: S(A.maxGasPerTx),
        maxSize: S(A.maxSize),
        maxBytecodeSubsections: S(A.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: a.version,
        maxPredicateLength: S(a.maxPredicateLength),
        maxPredicateDataLength: S(a.maxPredicateDataLength),
        maxGasPerPredicate: S(a.maxGasPerPredicate),
        maxMessageDataLength: S(a.maxMessageDataLength)
      },
      scriptParameters: {
        version: _.version,
        maxScriptLength: S(_.maxScriptLength),
        maxScriptDataLength: S(_.maxScriptDataLength)
      },
      gasCosts: g
    },
    latestBlock: {
      id: s.id,
      height: S(s.height),
      time: s.header.time,
      transactions: s.transactions.map((T) => ({
        id: T.id
      }))
    }
  };
}, Lo, v_, Je = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, Rr(this, Lo), Pt(this, "operations"), Pt(this, "cache"), Pt(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations();
    const { resourceCacheTTL: r } = this.options;
    Fr(r) ? r !== -1 ? this.cache = new yu(r) : this.cache = void 0 : this.cache = new yu(lC);
  }
  /** @hidden */
  static clearChainAndNodeCaches() {
    Je.nodeInfoCache = {}, Je.chainInfoCache = {};
  }
  /**
   * @hidden
   */
  static getFetchFn(e) {
    const { retryOptions: t, timeout: r } = e;
    return E_(async (...n) => {
      const s = n[0], i = n[1], o = r ? AbortSignal.timeout(r) : void 0;
      let a = { ...i, signal: o };
      return e.requestMiddleware && (a = await e.requestMiddleware(a)), e.fetch ? e.fetch(s, a, e) : fetch(s, a);
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
    const r = new Je(e, t);
    return await r.fetchChainAndNodeInfo(), r;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain() {
    const e = Je.chainInfoCache[this.url];
    if (!e)
      throw new R(
        Q.CHAIN_INFO_CACHE_EMPTY,
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
    const e = Je.nodeInfoCache[this.url];
    if (!e)
      throw new R(
        Q.NODE_INFO_CACHE_EMPTY,
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
    this.url = e, this.options = t ?? this.options, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Return the chain and node information.
   *
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo() {
    const e = await this.fetchNode();
    return Je.ensureClientVersionIsSupported(e), {
      chain: await this.fetchChain(),
      nodeInfo: e
    };
  }
  /**
   * @hidden
   */
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: r, supportedVersion: n } = eh(e.nodeVersion);
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
    const e = Je.getFetchFn(this.options), t = new Mf.GraphQLClient(this.url, {
      fetch: (n, s) => e(n, s, this.options),
      responseMiddleware: (n) => {
        if ("response" in n) {
          const s = n.response;
          if (Array.isArray(s == null ? void 0 : s.errors))
            throw new R(
              R.CODES.INVALID_REQUEST,
              s.errors.map((i) => i.message).join(`

`)
            );
        }
      }
    });
    return tv((n, s) => {
      const i = n.definitions.find((a) => a.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? __.create({
        url: this.url,
        query: n,
        fetchFn: (a, _) => e(a, _, this.options),
        variables: s
      }) : t.request(n, s);
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
    return S(e.latestBlock.height, 10);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: S(e.maxDepth),
      maxTx: S(e.maxTx),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Je.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = AC(e);
    return Je.chainInfoCache[this.url] = t, t;
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
    if (S(e.inputs.length).gt(n))
      throw new R(
        Q.MAX_INPUTS_EXCEEDED,
        "The transaction exceeds the maximum allowed number of inputs."
      );
    if (S(e.outputs.length).gt(r))
      throw new R(
        Q.MAX_OUTPUTS_EXCEEDED,
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
  // #region Provider-sendTransaction
  async sendTransaction(e, { estimateTxDependencies: t = !0 } = {}) {
    const r = Ce(e);
    t && await this.estimateTxDependencies(r);
    const { consensusParameters: n } = this.getChain();
    this.validateTransaction(r, n);
    const s = K(r.toTransactionBytes());
    let i;
    kr(r) && (i = r.abis);
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return No(this, Lo, v_).call(this, r.inputs, o), new Oo(r, this, i);
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
    const n = Ce(e);
    if (r)
      return this.estimateTxDependencies(n);
    const s = K(n.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: a }] = i;
    return { receipts: o.map(Sr), dryRunStatus: a };
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
      (i) => "predicate" in i && i.predicate && !n0($(i.predicate), $("0x")) && new kt(i.predicateGasUsed).isZero()
    ))
      return e;
    const r = K(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: r
    }), {
      estimatePredicates: { inputs: s }
    } = n;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && S(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
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
    if (bv(e))
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const r = [];
    let n = 0, s;
    for (let i = 0; i < vu; i++) {
      const {
        dryRun: [{ receipts: o, status: a }]
      } = await this.operations.dryRun({
        encodedTransactions: [K(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(Sr), s = a;
      const { missingOutputVariables: _, missingOutputContractIds: A } = bu(t);
      if ((_.length !== 0 || A.length !== 0) && kr(e)) {
        n += _.length, e.addVariableOutputs(_.length), A.forEach(({ contractId: B }) => {
          e.addContractInputAndOutput(pt.fromString(B)), r.push(B);
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
    })), r = He(e), n = /* @__PURE__ */ new Map();
    r.forEach((o, a) => {
      kr(o) && n.set(a, K(o.toTransactionBytes()));
    });
    let s = Array.from(n.keys()), i = 0;
    for (; s.length > 0 && i < vu; ) {
      const o = s.map(
        (A) => n.get(A)
      ), a = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), _ = [];
      for (let A = 0; A < a.dryRun.length; A++) {
        const g = s[A], { receipts: m, status: B } = a.dryRun[A], N = t[g];
        N.receipts = m.map(Sr), N.dryRunStatus = B;
        const { missingOutputVariables: T, missingOutputContractIds: x } = bu(
          N.receipts
        ), F = T.length > 0 || x.length > 0, O = r[g];
        if (F && kr(O)) {
          N.outputVariables += T.length, O.addVariableOutputs(T.length), x.forEach(({ contractId: P }) => {
            O.addContractInputAndOutput(pt.fromString(P)), N.missingContractIds.push(P);
          });
          const { maxFee: j } = await this.estimateTxGasAndFee({
            transactionRequest: O
          });
          O.maxFee = j, n.set(g, K(O.toTransactionBytes())), _.push(g);
        }
      }
      s = _, i += 1;
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
    return s.map(({ receipts: o, status: a }) => ({ receipts: o.map(Sr), dryRunStatus: a }));
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
    const a = Yn({
      gasPrice: S(r),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let _ = S(0);
    kr(t) && (_ = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(n, o)
    ), _ = t.gasLimit));
    const A = t.calculateMaxGas(n, o), g = Yn({
      gasPrice: S(r),
      gas: A,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: a,
      maxGas: A,
      maxFee: g,
      gasPrice: r,
      gasLimit: _
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
    const r = Ce(e);
    if (t)
      return this.estimateTxDependencies(r);
    const n = [K(r.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: n,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: a, receipts: _, status: A } = o, g = _.map(Sr);
      return { id: a, receipts: g, status: A };
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
    const r = He(Ce(e)), n = r.maxFee.eq(0), s = kr(r);
    s && (r.gasLimit = S(0));
    const i = He(r);
    let o = 0;
    if (t && kr(i)) {
      const j = i.witnesses.length;
      await t(i), o = i.witnesses.length - j;
    }
    await this.estimatePredicates(i), r.updatePredicateGasUsed(i.inputs);
    let { maxFee: a, maxGas: _, minFee: A, minGas: g, gasPrice: m, gasLimit: B } = await this.estimateTxGasAndFee({
      transactionRequest: i
    }), N = [], T, x = [], F = 0, O = S(0);
    if (r.maxFee = a, s) {
      if (r.gasLimit = B, t && await t(r), { receipts: N, missingContractIds: x, outputVariables: F, dryRunStatus: T } = await this.estimateTxDependencies(r), T && "reason" in T)
        throw this.extractDryRunError(r, N, T);
      O = fi(N), r.gasLimit = O, { maxFee: a, maxGas: _, minFee: A, minGas: g, gasPrice: m } = await this.estimateTxGasAndFee({
        transactionRequest: r,
        gasPrice: m
      });
    }
    return {
      receipts: N,
      gasUsed: O,
      gasPrice: m,
      minGas: g,
      maxGas: _,
      minFee: A,
      maxFee: a,
      outputVariables: F,
      missingContractIds: x,
      addedSignatures: o,
      estimatedPredicates: r.inputs,
      dryRunStatus: T,
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
    const n = pt.fromAddressOrString(e), {
      coins: { edges: s, pageInfo: i }
    } = await this.operations.getCoins({
      ...this.validatePaginationArgs({
        paginationLimit: Cu,
        inputArgs: r
      }),
      filter: { owner: n.toB256(), assetId: t && K(t) }
    });
    return {
      coins: s.map(({ node: a }) => ({
        id: a.utxoId,
        assetId: a.assetId,
        amount: S(a.amount),
        owner: pt.fromAddressOrString(a.owner),
        blockCreated: S(a.blockCreated),
        txCreatedIdx: S(a.txCreatedIdx)
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
    var _, A;
    const n = pt.fromAddressOrString(e), s = {
      messages: ((_ = r == null ? void 0 : r.messages) == null ? void 0 : _.map((g) => K(g))) || [],
      utxos: ((A = r == null ? void 0 : r.utxos) == null ? void 0 : A.map((g) => K(g))) || []
    };
    if (this.cache) {
      const g = this.cache.getActiveData();
      s.messages.push(...g.messages), s.utxos.push(...g.utxos);
    }
    const i = {
      owner: n.toB256(),
      queryPerAsset: t.map(Ca).map(({ assetId: g, amount: m, max: B }) => ({
        assetId: K(g),
        amount: m.toString(10),
        max: B ? B.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((g) => {
      switch (g.type) {
        case "MessageCoin":
          return {
            amount: S(g.amount),
            assetId: g.assetId,
            daHeight: S(g.daHeight),
            sender: pt.fromAddressOrString(g.sender),
            recipient: pt.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: S(g.amount),
            assetId: g.assetId,
            owner: pt.fromAddressOrString(g.owner),
            blockCreated: S(g.blockCreated),
            txCreatedIdx: S(g.txCreatedIdx)
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
    typeof e == "number" ? t = { height: S(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: S(e).toString(10) };
    const { block: r } = await this.operations.getBlock(t);
    return r ? {
      id: r.id,
      height: S(r.height),
      time: r.header.time,
      transactionIds: r.transactions.map((n) => n.id)
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
      blocks: { edges: t, pageInfo: r }
    } = await this.operations.getBlocks({
      ...this.validatePaginationArgs({
        paginationLimit: hC,
        inputArgs: e
      })
    });
    return { blocks: t.map(({ node: s }) => ({
      id: s.id,
      height: S(s.height),
      time: s.header.time,
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
    typeof e == "number" ? t = { blockHeight: S(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: r } = await this.operations.getBlockWithTransactions(t);
    return r ? {
      id: r.id,
      height: S(r.height, 10),
      time: r.header.time,
      transactionIds: r.transactions.map((n) => n.id),
      transactions: r.transactions.map(
        (n) => {
          var s;
          return (s = new hr().decode($(n.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (r = new hr().decode(
      $(t.rawPayload),
      0
    )) == null ? void 0 : r[0] : null;
  }
  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(e) {
    const {
      transactions: { edges: t, pageInfo: r }
    } = await this.operations.getTransactions(e), n = new hr();
    return { transactions: t.map(
      ({ node: { rawPayload: i } }) => n.decode($(i), 0)[0]
    ), pageInfo: r };
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
      contract: pt.fromAddressOrString(e).toB256(),
      asset: K(t)
    });
    return S(r.amount, 10);
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
      owner: pt.fromAddressOrString(e).toB256(),
      assetId: K(t)
    });
    return S(r.amount, 10);
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
      filter: { owner: pt.fromAddressOrString(e).toB256() }
    });
    return { balances: t.map(({ node: n }) => ({
      assetId: n.assetId,
      amount: S(n.amount)
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
        paginationLimit: Cu
      }),
      owner: pt.fromAddressOrString(e).toB256()
    });
    return {
      messages: r.map(({ node: i }) => ({
        messageId: Un.getMessageId({
          sender: i.sender,
          recipient: i.recipient,
          nonce: i.nonce,
          amount: S(i.amount),
          data: i.data
        }),
        sender: pt.fromAddressOrString(i.sender),
        recipient: pt.fromAddressOrString(i.recipient),
        nonce: i.nonce,
        amount: S(i.amount),
        data: Un.decodeData(i.data),
        daHeight: S(i.daHeight)
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
      throw new R(
        Q.INVALID_INPUT_PARAMETERS,
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
      commitBlockHeader: _,
      blockProof: A,
      sender: g,
      recipient: m,
      amount: B,
      data: N
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: S(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: S(A.proofIndex),
        proofSet: A.proofSet
      },
      messageBlockHeader: {
        id: a.id,
        daHeight: S(a.daHeight),
        transactionsCount: Number(a.transactionsCount),
        transactionsRoot: a.transactionsRoot,
        height: S(a.height),
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
        id: _.id,
        daHeight: S(_.daHeight),
        transactionsCount: Number(_.transactionsCount),
        transactionsRoot: _.transactionsRoot,
        height: S(_.height),
        prevRoot: _.prevRoot,
        time: _.time,
        applicationHash: _.applicationHash,
        messageReceiptCount: Number(_.messageReceiptCount),
        messageOutboxRoot: _.messageOutboxRoot,
        consensusParametersVersion: Number(_.consensusParametersVersion),
        eventInboxRoot: _.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(_.stateTransitionBytecodeVersion)
      },
      sender: pt.fromAddressOrString(g),
      recipient: pt.fromAddressOrString(m),
      nonce: t,
      amount: S(B),
      data: N
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return S(e.gasPrice);
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
    return S(t.gasPrice);
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
      blocksToProduce: S(e).toString(10),
      startTimestamp: t ? Vo.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return S(r);
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Oo(e, this);
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
    const { paginationLimit: t, inputArgs: r = {} } = e, { first: n, last: s, after: i, before: o } = r;
    if (i && o)
      throw new R(
        Q.INVALID_INPUT_PARAMETERS,
        'Pagination arguments "after" and "before" cannot be used together'
      );
    if ((n || 0) > t || (s || 0) > t)
      throw new R(
        Q.INVALID_INPUT_PARAMETERS,
        `Pagination limit for this query cannot exceed ${t} items`
      );
    if (n && o)
      throw new R(
        Q.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "first" with "before" is not supported'
      );
    if (s && i)
      throw new R(
        Q.INVALID_INPUT_PARAMETERS,
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
    return e.abis && (s = Fa(
      t,
      e.abis.main,
      e.abis.otherContractsAbis
    )), Sa({
      logs: s,
      receipts: t,
      statusReason: n.reason
    });
  }
}, ri = Je;
Lo = /* @__PURE__ */ new WeakSet();
v_ = function(e, t) {
  if (!this.cache)
    return;
  const r = e.reduce(
    (n, s) => (s.type === Ct.Coin ? n.utxos.push(s.id) : s.type === Ct.Message && n.messages.push(s.nonce), n),
    { utxos: [], messages: [] }
  );
  this.cache.set(t, r);
};
Pt(ri, "chainInfoCache", {});
Pt(ri, "nodeInfoCache", {});
async function c2(e) {
  const { id: t, provider: r, abiMap: n } = e, { transaction: s } = await r.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new R(
      Q.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new hr().decode(
    $(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const a = o.map(Sr), {
    consensusParameters: {
      feeParameters: { gasPerByte: _, gasPriceFactor: A },
      txParameters: { maxInputs: g, maxGasPerTx: m },
      gasCosts: B
    }
  } = r.getChain(), N = await r.getLatestGasPrice(), T = r.getBaseAssetId();
  return {
    ...wi({
      id: s.id,
      receipts: a,
      transaction: i,
      transactionBytes: $(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: S(_),
      gasPriceFactor: S(A),
      abiMap: n,
      maxInputs: g,
      gasCosts: B,
      maxGasPerTx: m,
      gasPrice: N,
      baseAssetId: T
    })
  };
}
async function u2(e) {
  const { provider: t, transactionRequest: r, abiMap: n } = e, { receipts: s } = await t.dryRun(r), { gasPerByte: i, gasPriceFactor: o, gasCosts: a, maxGasPerTx: _ } = t.getGasConfig(), A = t.getChain().consensusParameters.txParameters.maxInputs, g = r.toTransaction(), m = r.toTransactionBytes(), B = await t.getLatestGasPrice(), N = t.getBaseAssetId();
  return wi({
    id: r.getTransactionId(t.getChainId()),
    receipts: s,
    transaction: g,
    transactionBytes: m,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: A,
    gasCosts: a,
    maxGasPerTx: _,
    gasPrice: B,
    baseAssetId: N
  });
}
async function d2(e) {
  const { filters: t, provider: r, abiMap: n } = e, { transactionsByOwner: s } = await r.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: a, gasPriceFactor: _ },
      txParameters: { maxInputs: A, maxGasPerTx: g },
      gasCosts: m
    }
  } = r.getChain(), B = await r.getLatestGasPrice(), N = r.getBaseAssetId();
  return {
    transactions: i.map((x) => {
      const { node: F } = x, { id: O, rawPayload: j, status: P } = F, [Z] = new hr().decode($(j), 0);
      let L = [];
      F != null && F.status && "receipts" in F.status && (L = F.status.receipts);
      const D = L.map(Sr);
      return {
        ...wi({
          id: O,
          receipts: D,
          transaction: Z,
          transactionBytes: $(j),
          gqlTransactionStatus: P,
          abiMap: n,
          gasPerByte: a,
          gasPriceFactor: _,
          maxInputs: A,
          gasCosts: m,
          maxGasPerTx: g,
          gasPrice: B,
          baseAssetId: N
        })
      };
    }),
    pageInfo: o
  };
}
var nn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0
  }
}, pC = (e) => {
  if (e === "ethereum")
    return nn.eth.sepolia;
  if (e === "fuel")
    return nn.fuel.testnet;
}, fC = ({
  asset: e,
  chainId: t,
  networkType: r
}) => e.networks.find(
  (s) => s.chainId === t && s.type === r
), C_ = ({
  asset: e,
  chainId: t,
  networkType: r
}) => {
  const { networks: n, ...s } = e, i = t ?? pC(r);
  if (i === void 0)
    return;
  const o = fC({
    asset: e,
    chainId: i,
    networkType: r
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, _2 = (e, t) => C_({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), h2 = (e, t) => C_({
  asset: e,
  networkType: "fuel",
  chainId: t
}), gC = "/", wC = /^\/|\/$/g, mC = (e = "") => e.replace(wC, "");
function yC(e, ...t) {
  const r = e != null, n = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(mC);
  return n && r && s.unshift(""), s.join(gC);
}
function bC(e, t = "./") {
  return e.map((r) => ({
    ...r,
    icon: yC(t, r.icon)
  }));
}
var IC = "https://cdn.fuel.network/assets/", EC = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: nn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: nn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: nn.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: nn.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  }
], l2 = bC(EC, IC), Bu = (...e) => {
  const t = {};
  function r({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return e.forEach((n) => n.forEach(r)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, vC = (e) => {
  const { assetId: t, amountToTransfer: r, hexlifiedContractId: n } = e, i = new k("u64").encode(new kt(r).toNumber());
  return Uint8Array.from([
    ...$(n),
    ...i,
    ...$(t)
  ]);
}, CC = async (e) => {
  const t = vC(e);
  await hi();
  const r = Q0(16, 0, M0.ScriptData), n = Hn(17, 16, 32), s = Hs(18, 17, 0), i = Hn(19, 17, 8), o = R0(16, 18, 19), a = ba(1);
  return { script: Uint8Array.from([
    ...r.to_bytes(),
    ...n.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...a.to_bytes()
  ]), scriptData: t };
}, BC = 5, mi = class extends Jd {
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
    M(this, "address");
    /**
     * The provider used to interact with the network.
     */
    M(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    M(this, "_connector");
    this._provider = r, this._connector = n, this.address = pt.fromDynamicInput(t);
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
      throw new R(Q.MISSING_PROVIDER, "Provider not set");
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
    var j;
    const { addedSignatures: n, estimatedPredicates: s, requiredQuantities: i, updateMaxFee: o, gasPrice: a } = r, _ = t.maxFee, A = this.provider.getBaseAssetId(), g = ((j = i.find((P) => P.assetId === A)) == null ? void 0 : j.amount) || S(0), m = eE({
      amount: S(_),
      assetId: A,
      coinQuantities: i
    }), B = {};
    m.forEach(({ amount: P, assetId: Z }) => {
      B[Z] = {
        required: P,
        owned: S(0)
      };
    }), t.inputs.filter(Qr).forEach((P) => {
      const L = In(P) ? String(P.assetId) : A;
      B[L] && (B[L].owned = B[L].owned.add(P.amount));
    });
    let N = [];
    Object.entries(B).forEach(([P, { owned: Z, required: L }]) => {
      Z.lt(L) && N.push({
        assetId: P,
        amount: L.sub(Z)
      });
    });
    let T = N.length > 0, x = 0;
    for (; T && x < BC; ) {
      const P = await this.getResourcesToSpend(
        N,
        fv(t.inputs, this.address)
      );
      t.addResources(P), t.updatePredicateGasUsed(s);
      const Z = He(t);
      if (n && Array.from({ length: n }).forEach(
        () => Z.addEmptyWitness()
      ), !o) {
        T = !1;
        break;
      }
      const { maxFee: L } = await this.provider.estimateTxGasAndFee({
        transactionRequest: Z,
        gasPrice: a
      }), D = pv(
        t.inputs,
        A,
        A
      ), z = g.add(L);
      D.gt(z) ? T = !1 : N = [
        {
          amount: z.sub(D),
          assetId: A
        }
      ], x += 1;
    }
    if (T)
      throw new R(
        Q.NOT_ENOUGH_FUNDS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    t.updatePredicateGasUsed(s);
    const F = He(t);
    if (n && Array.from({ length: n }).forEach(() => F.addEmptyWitness()), !o)
      return t;
    const { maxFee: O } = await this.provider.estimateTxGasAndFee({
      transactionRequest: F
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
    let i = new Hr(s);
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
    let n = new Hr(r);
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
      pt.fromAddressOrString(n),
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
    if (S(r).lte(0))
      throw new R(
        Q.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = pt.fromAddressOrString(t), o = n ?? this.provider.getBaseAssetId(), { script: a, scriptData: _ } = await CC({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: S(r),
      assetId: o
    });
    let A = new Hr({
      ...s,
      script: a,
      scriptData: _
    });
    A.addContractInputAndOutput(i);
    const g = await this.getTransactionCost(A, {
      quantities: [{ amount: S(r), assetId: String(o) }]
    });
    return A = this.validateGasLimitAndMaxFee({
      transactionRequest: A,
      gasUsed: g.gasUsed,
      maxFee: g.maxFee,
      txParams: s
    }), await this.fund(A, g), this.sendTransaction(A);
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
    const s = pt.fromAddressOrString(t), i = $(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = $(
      "0x".concat(S(r).toHex().substring(2).padStart(16, "0"))
    ), _ = { script: new Uint8Array([
      ...$(yv.bytes),
      ...i,
      ...o
    ]), ...n }, A = this.provider.getBaseAssetId();
    let g = new Hr(_);
    const m = [{ amount: S(r), assetId: A }], B = await this.getTransactionCost(g, { quantities: m });
    return g = this.validateGasLimitAndMaxFee({
      transactionRequest: g,
      gasUsed: B.gasUsed,
      maxFee: B.maxFee,
      txParams: n
    }), await this.fund(g, B), this.sendTransaction(g);
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
    const s = He(Ce(t)), i = this.provider.getBaseAssetId(), o = s.getCoinOutputsQuantities(), a = Bu(o, n), _ = [{ assetId: i, amount: S("100000000000000000") }], A = (B) => s.inputs.find((N) => "assetId" in N ? N.assetId === B : "recipient" in N ? i === B : !1), g = (B, N) => {
      const T = A(B), x = N;
      T && "amount" in T ? T.amount = x : s.addResources(
        this.generateFakeResources([
          {
            amount: N,
            assetId: B
          }
        ])
      );
    };
    return Bu(a, _).forEach(
      ({ amount: B, assetId: N }) => g(N, B)
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
      throw new R(Q.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
        Q.MISSING_CONNECTOR,
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
    const n = Ce(t);
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
    const n = Ce(t);
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
      id: K(Oe(Ms)),
      owner: this.address,
      blockCreated: S(1),
      txCreatedIdx: S(1),
      ...r
    }));
  }
  /** @hidden * */
  validateTransferAmount(t) {
    if (S(t).lte(0))
      throw new R(
        Q.INVALID_TRANSFER_AMOUNT,
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
    const o = Ce(n);
    if (!Fr(s))
      o.gasLimit = t;
    else if (t.gt(s))
      throw new R(
        Q.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (!Fr(i))
      o.maxFee = r;
    else if (r.gt(i))
      throw new R(
        Q.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${r}'.`
      );
    return o;
  }
}, gn = class {
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
    const t = _r(e, 32);
    this.privateKey = K(t), this.publicKey = K(Er.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = K(Er.getPublicKey(t, !0)), this.address = pt.fromPublicKey(this.publicKey);
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
    const t = Er.sign($(e), $(this.privateKey)), r = _r(`0x${t.r.toString(16)}`, 32), n = _r(`0x${t.s.toString(16)}`, 32);
    return n[0] |= (t.recovery || 0) << 7, K(ct([r, n]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = Er.ProjectivePoint.fromHex($(this.compressedPublicKey)), r = Er.ProjectivePoint.fromHex($(e));
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
    const a = new Er.Signature(BigInt(K(n)), BigInt(K(s))).addRecoveryBit(
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
    return pt.fromPublicKey(gn.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? tr(ct([Oe(32), $(e)])) : Oe(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = Er.ProjectivePoint.fromHex($(e));
    return K(t.toRawBytes(!1).slice(1));
  }
}, xu = 13, Ru = 8, Su = 1, Ki = 32, xC = 16, Nu = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function RC(e, t, r) {
  const n = Tr(Nu(e), "hex"), s = pt.fromAddressOrString(t), i = Oe(Ki), o = Sd({
    password: Tr(r),
    salt: i,
    dklen: Ki,
    n: 2 ** xu,
    r: Ru,
    p: Su
  }), a = Oe(xC), _ = await oA(n, o, a), A = Uint8Array.from([...o.subarray(16, 32), ..._]), g = Nd(A), m = Tn(g, "hex"), B = {
    id: uA(),
    version: 3,
    address: Nu(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: m,
      cipherparams: { iv: Tn(a, "hex") },
      ciphertext: Tn(_, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Ki,
        n: 2 ** xu,
        p: Su,
        r: Ru,
        salt: Tn(i, "hex")
      }
    }
  };
  return JSON.stringify(B);
}
async function SC(e, t) {
  const r = JSON.parse(e), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: _, p: A, salt: g }
    }
  } = r, m = Tr(s, "hex"), B = Tr(i, "hex"), N = Tr(g, "hex"), T = Tr(t), x = Sd({
    password: T,
    salt: N,
    n: a,
    p: A,
    r: _,
    dklen: o
  }), F = Uint8Array.from([...x.subarray(16, 32), ...m]), O = Nd(F), j = Tn(O, "hex");
  if (n !== j)
    throw new R(
      Q.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const P = await iA(m, x, B);
  return K(P);
}
var B_ = class extends mi {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, r) {
    const n = new gn(t);
    super(n.address, r);
    /**
     * A function that returns the wallet's signer.
     */
    M(this, "signer");
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
    const r = await this.signer().sign(_A(t));
    return K(r);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const r = Ce(t), n = this.provider.getChainId(), s = r.getTransactionId(n), i = await this.signer().sign(s);
    return K(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const r = Ce(t), n = await this.signTransaction(r);
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
    const n = Ce(t);
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
    const n = Ce(t);
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
    return RC(this.privateKey, this.address, t);
  }
};
Pt(B_, "defaultPath", "m/44'/1179993420'/0'/0/0");
var ms = [
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
], NC = /* @__PURE__ */ ((e) => (e.english = "english", e))(NC || {});
function TC(e) {
  return (1 << e) - 1;
}
function x_(e) {
  return (1 << e) - 1 << 8 - e;
}
function to(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function QC(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function DC(e) {
  const t = [0];
  let r = 11;
  for (let i = 0; i < e.length; i += 1)
    r > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], r -= 8) : (t[t.length - 1] <<= r, t[t.length - 1] |= e[i] >> 8 - r, t.push(e[i] & TC(8 - r)), r += 3);
  const n = e.length / 4, s = $(Ee(e))[0] & x_(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
function FC(e, t) {
  const r = Math.ceil(11 * e.length / 8), n = $(new Uint8Array(r));
  let s = 0;
  for (let A = 0; A < e.length; A += 1) {
    const g = t.indexOf(e[A].normalize("NFKD"));
    if (g === -1)
      throw new R(
        Q.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[A]}' is not found in the provided wordlist.`
      );
    for (let m = 0; m < 11; m += 1)
      g & 1 << 10 - m && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = x_(o);
  if (($(Ee(n.slice(0, i / 8)))[0] & a) !== (n[n.length - 1] & a))
    throw new R(
      Q.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
var MC = dn("Bitcoin seed"), OC = "0x0488ade4", LC = "0x04358394", Tu = [12, 15, 18, 21, 24];
function Qu(e) {
  if (e.length !== 2048)
    throw new R(
      Q.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function kC(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new R(
      Q.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function eo(e) {
  if (!Tu.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Tu.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new R(Q.INVALID_MNEMONIC, t);
  }
}
var vr = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = ms) {
    M(this, "wordlist");
    this.wordlist = e, Qu(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return vr.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return vr.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = ms) {
    const r = to(e);
    return eo(r), K(FC(r, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = ms) {
    const r = $(e);
    return Qu(t), kC(r), DC(r).map((n) => t[n]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    eo(to(e));
    const r = dn(QC(e)), n = dn(`mnemonic${t}`);
    return aA(r, n, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const r = vr.mnemonicToSeed(e, t);
    return vr.masterKeysFromSeed(r);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = to(e);
    let r = 0;
    try {
      eo(t);
    } catch {
      return !1;
    }
    for (; r < t.length; ) {
      if (vr.binarySearch(t[r]) === !1)
        return !1;
      r += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = ms;
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
      throw new R(
        Q.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return $(Td("sha512", MC, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const r = vr.masterKeysFromSeed(e), n = $(t ? LC : OC), s = "0x00", i = "0x00000000", o = "0x00000000", a = r.slice(32), _ = r.slice(0, 32), A = ct([
      n,
      s,
      i,
      o,
      a,
      ct(["0x00", _])
    ]), g = Zo(Ee(Ee(A)), 0, 4);
    return od(ct([A, g]));
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
    const r = t ? Ee(ct([Oe(e), $(t)])) : Oe(e);
    return vr.entropyToMnemonic(r);
  }
}, Ma = vr, R_ = 2147483648, S_ = K("0x0488ade4"), Oa = K("0x0488b21e"), N_ = K("0x04358394"), La = K("0x043587cf");
function Du(e) {
  return od(ct([e, Zo(Ee(Ee(e)), 0, 4)]));
}
function PC(e = !1, t = !1) {
  return e ? t ? La : Oa : t ? N_ : S_;
}
function UC(e) {
  return [Oa, La].includes(K(e.slice(0, 4)));
}
function zC(e) {
  return [S_, N_, Oa, La].includes(
    K(e.slice(0, 4))
  );
}
function GC(e, t = 0) {
  const r = e.split("/");
  if (r.length === 0 || r[0] === "m" && t !== 0)
    throw new R(Q.HD_WALLET_ERROR, `invalid path - ${e}`);
  return r[0] === "m" && r.shift(), r.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + R_ : parseInt(n, 10)
  );
}
var $r = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    M(this, "depth", 0);
    M(this, "index", 0);
    M(this, "fingerprint", K("0x00000000"));
    M(this, "parentFingerprint", K("0x00000000"));
    M(this, "privateKey");
    M(this, "publicKey");
    M(this, "chainCode");
    if (e.privateKey) {
      const t = new gn(e.privateKey);
      this.publicKey = K(t.compressedPublicKey), this.privateKey = K(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new R(
          Q.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = K(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Zo(cA(Ee(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & R_) {
      if (!t)
        throw new R(
          Q.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set($(this.publicKey));
    s.set(_r(e, 4), 33);
    const i = $(Td("sha512", n, s)), o = i.slice(0, 32), a = i.slice(32);
    if (t) {
      const m = S(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new $r({
        privateKey: m,
        chainCode: a,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const A = new gn(K(o)).addPoint(r);
    return new $r({
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
    return GC(e, this.depth).reduce((r, n) => r.deriveIndex(n), this);
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
        Q.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const r = PC(this.privateKey == null || e, t), n = K(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = Ho(this.index, 4), o = this.chainCode, a = this.privateKey != null && !e ? ct(["0x00", this.privateKey]) : this.publicKey, _ = $(ct([r, n, s, i, o, a]));
    return Du(_);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Ma.masterKeysFromSeed(e);
    return new $r({
      chainCode: $(t.slice(32)),
      privateKey: $(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = K(_r(Yh(e))), r = $(t), n = Du(r.slice(0, 78)) === e;
    if (r.length !== 82 || !zC(r))
      throw new R(Q.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!n)
      throw new R(Q.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = r[4], i = K(r.slice(5, 9)), o = parseInt(K(r.slice(9, 13)).substring(2), 16), a = K(r.slice(13, 45)), _ = r.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new R(
        Q.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (UC(r)) {
      if (_[0] !== 3)
        throw new R(Q.HD_WALLET_ERROR, "Invalid public extended key.");
      return new $r({
        publicKey: _,
        chainCode: a,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (_[0] !== 0)
      throw new R(Q.HD_WALLET_ERROR, "Invalid private extended key.");
    return new $r({
      privateKey: _.slice(1),
      chainCode: a,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, ro = $r, T_ = class extends mi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Se(e, this._provider);
  }
}, Se = class extends B_ {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new gn("0x00"), new T_(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = gn.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Se(t, e == null ? void 0 : e.provider);
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
    const s = ro.fromSeed(e).derivePath(t || Se.defaultPath);
    return new Se(s.privateKey, r);
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
    const s = Ma.mnemonicToSeed(e, r), o = ro.fromSeed(s).derivePath(t || Se.defaultPath);
    return new Se(o.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const r = ro.fromExtendedKey(e);
    return new Se(r.privateKey, t);
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
    const n = await SC(e, t);
    return new Se(n, r);
  }
}, ve = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new T_(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Se(e, t);
  }
};
Pt(ve, "generate", Se.generate);
Pt(ve, "fromSeed", Se.fromSeed);
Pt(ve, "fromMnemonic", Se.fromMnemonic);
Pt(ve, "fromExtendedKey", Se.fromExtendedKey);
Pt(ve, "fromEncryptedJson", Se.fromEncryptedJson);
var XC = class {
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
}, Pr, Q_ = class {
  constructor(e) {
    Rr(this, Pr, void 0), Pt(this, "pathKey", "{}"), Pt(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Pt(this, "numberOfAccounts", 0), Xe(this, Pr, e.secret || Ma.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Ft(this, Pr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const r = ve.fromMnemonic(Ft(this, Pr), this.getDerivePath(t));
      e.push({
        publicKey: r.publicKey,
        address: r.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = ve.fromMnemonic(Ft(this, Pr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const r = pt.fromAddressOrString(e);
    do {
      const n = ve.fromMnemonic(Ft(this, Pr), this.getDerivePath(t));
      if (n.address.equals(r))
        return n.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new R(
      Q.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return ve.fromPrivateKey(t);
  }
};
Pr = /* @__PURE__ */ new WeakMap();
Pt(Q_, "type", "mnemonic");
var Cr, D_ = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Rr(this, Cr, []), e.secret ? Xe(this, Cr, [e.secret]) : Xe(this, Cr, e.accounts || [ve.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Ft(this, Cr)
    };
  }
  getPublicAccount(e) {
    const t = ve.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Ft(this, Cr).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = ve.generate();
    return Ft(this, Cr).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = pt.fromAddressOrString(e), r = Ft(this, Cr).find(
      (n) => ve.fromPrivateKey(n).address.equals(t)
    );
    if (!r)
      throw new R(
        Q.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return r;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return ve.fromPrivateKey(t);
  }
};
Cr = /* @__PURE__ */ new WeakMap();
Pt(D_, "type", "privateKey");
var ar = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function cr(e, t) {
  if (!e)
    throw new R(Q.WALLET_MANAGER_ERROR, t);
}
var xe, Ur, je, ko, F_, Po, M_, O_ = class extends e_.EventEmitter {
  constructor(e) {
    super(), Rr(this, ko), Rr(this, Po), Pt(this, "storage", new XC()), Pt(this, "STORAGE_KEY", "WalletManager"), Rr(this, xe, []), Rr(this, Ur, ""), Rr(this, je, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Ft(this, je);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    cr(!Ft(this, je), ar.wallet_not_unlocked);
    const t = Ft(this, xe).find((r, n) => n === e);
    return cr(t, ar.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Ft(this, xe).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Ft(this, xe).flatMap(
      (e, t) => e.vault.getAccounts().map((r) => ({ ...r, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = pt.fromAddressOrString(e), r = Ft(this, xe).find(
      (n) => n.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return cr(r, ar.address_not_found), r.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = pt.fromAddressOrString(e);
    cr(!Ft(this, je), ar.wallet_not_unlocked);
    const r = Ft(this, xe).find(
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
    const t = Ft(this, xe)[(e == null ? void 0 : e.vaultId) || 0];
    await cr(t, ar.vault_not_found);
    const r = t.vault.addAccount();
    return await this.saveState(), r;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Ft(this, xe).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), r = new t(e);
    Xe(this, xe, Ft(this, xe).concat({
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
    Xe(this, je, !0), Xe(this, xe, []), Xe(this, Ur, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Xe(this, Ur, e), Xe(this, je, !1);
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
    const r = Ft(this, je);
    await this.unlock(e), Xe(this, Ur, t), await this.saveState(), await this.loadState(), r && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await cr(!Ft(this, je), ar.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await nA(Ft(this, Ur), JSON.parse(e));
      Xe(this, xe, No(this, Po, M_).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await cr(!Ft(this, je), ar.wallet_not_unlocked);
    const e = await sA(Ft(this, Ur), {
      vaults: No(this, ko, F_).call(this, Ft(this, xe))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = O_.Vaults.find((r) => r.type === e);
    return cr(t, ar.invalid_vault_type), t;
  }
}, HC = O_;
xe = /* @__PURE__ */ new WeakMap();
Ur = /* @__PURE__ */ new WeakMap();
je = /* @__PURE__ */ new WeakMap();
ko = /* @__PURE__ */ new WeakSet();
F_ = function(e) {
  return e.map(({ title: t, type: r, vault: n }) => ({
    title: t,
    type: r,
    data: n.serialize()
  }));
};
Po = /* @__PURE__ */ new WeakSet();
M_ = function(e) {
  return e.map(({ title: t, type: r, data: n }) => {
    const s = this.getVaultClass(r);
    return {
      title: t,
      type: r,
      vault: new s(n)
    };
  });
};
Pt(HC, "Vaults", [Q_, D_]);
var YC = class {
  constructor(e) {
    throw new R(Q.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new R(Q.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new R(Q.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new R(Q.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new R(Q.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new R(Q.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Pt(YC, "type");
var A2 = class {
}, WC = (e) => {
  const r = $(e), n = rd(r, 16384), s = r_(n.map((o) => K(o)));
  return tr(ct(["0x4655454C", s]));
}, Fu = class extends mi {
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
    const { predicateBytes: o, predicateInterface: a } = Fu.processPredicateData(
      t,
      r,
      i
    ), _ = pt.fromB256(WC(o));
    super(_, n);
    M(this, "bytes");
    M(this, "predicateData", []);
    M(this, "interface");
    this.bytes = o, this.interface = a, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const r = Ce(t), n = this.getIndexFromPlaceholderWitness(r);
    return n !== -1 && r.removeWitness(n), r.inputs.filter(Qr).forEach((s) => {
      Do(s, this.address) && (s.predicate = K(this.bytes), s.predicateData = K(this.getPredicateData()), s.witnessIndex = 0);
    }), r;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const r = Ce(t);
    return super.sendTransaction(r, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const r = Ce(t);
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
      throw new R(
        Q.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return n && Object.keys(n).length && (s = Fu.setConfigurableConstants(
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
        throw new R(
          Q.INVALID_CONFIGURABLE_CONSTANTS,
          "Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI"
        );
      if (Object.keys(n.configurables).length === 0)
        throw new R(
          Q.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(r).forEach(([i, o]) => {
        if (!(n != null && n.configurables[i]))
          throw new R(
            Q.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${i}' found in the Predicate`
          );
        const { offset: a } = n.configurables[i], _ = n.encodeConfigurable(i, o);
        s.set(_, a);
      });
    } catch (i) {
      throw new R(
        Q.INVALID_CONFIGURABLE_CONSTANTS,
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
    const r = t.inputs.filter(Qr).filter((o) => Do(o, this.address));
    let n = -1;
    const s = r.find((o) => !o.predicate);
    return s && (n = s.witnessIndex, r.every((a) => !a.predicate) || (i = r[0]) != null && i.predicate && (n = -1)), n;
  }
}, L_ = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(L_ || {}), ka = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(ka || {}), k_ = "FuelConnector", VC = class {
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
}, ZC = class extends e_.EventEmitter {
  constructor() {
    super(...arguments);
    M(this, "name", "");
    M(this, "metadata", {});
    M(this, "connected", !1);
    M(this, "installed", !1);
    M(this, "events", ka);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(t, r) {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(t) {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(t) {
    throw new R(R.CODES.NOT_IMPLEMENTED, "Method not implemented.");
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
function JC(e, { cache: t, cacheTime: r, key: n }) {
  return async (...s) => {
    var o, a, _;
    if (t[n] && ((o = t[n]) != null && o.value))
      return (a = t[n]) == null ? void 0 : a.value;
    clearTimeout((_ = t[n]) == null ? void 0 : _.timeout);
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
function p2(e) {
  window.dispatchEvent(
    new CustomEvent(k_, {
      detail: e
    })
  );
}
function jC() {
  const e = {};
  return e.promise = new Promise((t, r) => {
    e.reject = r, e.resolve = t;
  }), e;
}
async function ys(e, t = 1050) {
  const r = new Promise((n, s) => {
    setTimeout(() => {
      s(new R(R.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([r, e]);
}
var qC = 2e3, $C = 5e3, { warn: KC } = console, On = class extends ZC {
  constructor(t = On.defaultConfig) {
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
      const { _targetObject: t } = this, r = k_;
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
    M(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    M(this, "triggerConnectorEvents", async () => {
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
    M(this, "getConnector", (t) => this._connectors.find((r) => {
      const n = typeof t == "string" ? t : t.name;
      return r.name === n || r === t;
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
      return new VC(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, n;
    const t = await ((r = this._storage) == null ? void 0 : r.getItem(On.STORAGE_KEY)) || ((n = this._connectors[0]) == null ? void 0 : n.name);
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
      throw new R(
        Q.MISSING_CONNECTOR,
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
    Object.values(L_).forEach((t) => {
      this[t] = async (...r) => this.callMethod(t, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const r = Date.now(), [n, s] = await Promise.allSettled([
      ys(t.isConnected()),
      ys(this.pingConnector(t))
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
      return await JC(async () => ys(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: $C
      })();
    } catch {
      throw new R(Q.INVALID_PROVIDER, "Current connector is not available.");
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
    return s ? (this._currentConnector = n, this.emit(this.events.currentConnector, n), this.setupConnectorEvents(Object.values(ka)), await ((o = this._storage) == null ? void 0 : o.setItem(On.STORAGE_KEY, n.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = jC();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), ys(t.promise, qC).then(() => !0).catch(() => !1);
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
    return KC(
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
      r = await ri.create(t.url);
    else {
      if (t)
        throw new R(Q.INVALID_PROVIDER, "Provider is not valid.");
      {
        const n = await this.currentNetwork();
        r = await ri.create(n.url);
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
    return new mi(t, n, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(On.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, P_ = On;
Pt(P_, "STORAGE_KEY", "fuel-current-connector");
Pt(P_, "defaultConfig", {});
function Mu(e, t) {
  if (!e)
    throw new R(Q.TRANSACTION_ERROR, t);
}
function U_(e) {
  return e.reduce((t, r, n) => {
    const { program: s, externalAbis: i } = r.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var z_ = (e, t, r) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = U_(r);
  return Fa(e, n, s);
}, qe, Yu, Pa = (Yu = class {
  constructor(...e) {
    Le(this, qe);
    We(this, qe, e || []);
  }
  entries() {
    return zt(this, qe);
  }
  push(...e) {
    zt(this, qe).push(...e);
  }
  concat(e) {
    return zt(this, qe).concat(e);
  }
  extend(e) {
    zt(this, qe).push(...e);
  }
  toBytes() {
    return ct(
      zt(this, qe).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return K(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(zt(this, qe), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, qe = new WeakMap(), Yu), tB = (e) => kd + Ld({ maxInputs: e });
function eB(e) {
  const t = [...e.receipts];
  let r, n;
  if (t.forEach((i) => {
    i.type === lt.ScriptResult ? r = i : (i.type === lt.Return || i.type === lt.ReturnData || i.type === lt.Revert) && (n = i);
  }), !r || !n)
    throw new R(Q.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: r.result,
    gasUsed: r.gasUsed,
    receipts: t,
    scriptResultReceipt: r,
    returnReceipt: n,
    callResult: e
  };
}
function Ua(e, t, r = []) {
  var n;
  try {
    const s = eB(e);
    return t(s);
  } catch (s) {
    if (s.code === Q.SCRIPT_REVERTED) {
      const i = (n = e == null ? void 0 : e.dryRunStatus) == null ? void 0 : n.reason;
      throw Sa({
        logs: r,
        receipts: e.receipts,
        statusReason: i
      });
    }
    throw s;
  }
}
function rB(e, t, r) {
  return Ua(
    e,
    (n) => {
      if (n.returnReceipt.type === lt.Revert)
        throw new R(
          Q.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(r)}`
        );
      if (n.returnReceipt.type !== lt.Return && n.returnReceipt.type !== lt.ReturnData) {
        const { type: i } = n.returnReceipt;
        throw new R(
          Q.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: r,
            receipt: n.returnReceipt
          })}`
        );
      }
      let s;
      return n.returnReceipt.type === lt.Return && (s = n.returnReceipt.val), n.returnReceipt.type === lt.ReturnData && (s = t.func.decodeOutput(n.returnReceipt.data)[0]), s;
    },
    r
  );
}
var yi = class {
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
    M(this, "bytes");
    /**
     * A function to encode the script data.
     */
    M(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    M(this, "scriptResultDecoder");
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
    return Ld({ maxInputs: t }) + kd + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return yi.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return Ua(e, this.scriptResultDecoder, t);
  }
}, G_ = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, nB = Mt, X_ = ({
  callDataOffset: e,
  gasForwardedOffset: t,
  amountOffset: r,
  assetIdOffset: n
}) => {
  const s = new Pa(
    en(16, e),
    en(17, r),
    Hs(17, 17, 0),
    en(18, n)
  );
  return t ? s.push(
    en(19, t),
    Hs(19, 19, 0),
    Co(16, 17, 18, 19)
  ) : s.push(Co(16, 17, 18, l.cgas().to_u8())), s;
};
function Ou(e) {
  if (!e.length)
    return new Uint8Array();
  const t = new Pa();
  for (let r = 0; r < e.length; r += 1)
    t.extend(X_(e[r]).entries());
  return t.push(ba(1)), t.toBytes();
}
var sB = (e) => e === lt.Return || e === lt.ReturnData, iB = (e, t) => e.find(
  ({ type: r, from: n, to: s }) => r === lt.Call && n === nB && s === t
), oB = (e) => (t) => {
  if (Br(t.code) !== 0)
    throw new R(Q.SCRIPT_REVERTED, "Transaction reverted.");
  const r = iB(
    t.receipts,
    e.toB256()
  ), n = S(r == null ? void 0 : r.is);
  return t.receipts.filter(({ type: i }) => sB(i)).flatMap((i) => n.eq(S(i.is)) ? i.type === lt.Return ? [new k("u64").encode(i.val)] : i.type === lt.ReturnData ? [$(i.data)] : [new Uint8Array()] : []);
}, aB = (e, t, r = []) => Ua(e, oB(t), r), cB = (e) => e.reduce(
  (t, r) => {
    const n = { ...G_ };
    return r.gas && (n.gasForwardedOffset = 1), t + X_(n).byteLength();
  },
  X.size()
  // placeholder for single RET instruction which is added later
), uB = (e, t) => new yi(
  // Script to call the contract, start with stub size matching length of calls
  Ou(new Array(e.length).fill(G_)),
  (r) => {
    var N;
    const n = r.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = cB(r), i = (8 - s % 8) % 8, o = s + i, a = tB(t.toNumber()) + o, _ = [];
    let A = a;
    const g = [];
    for (let T = 0; T < n; T += 1) {
      const x = r[T], F = A, O = F + ft, j = O + Os, P = j + TA + ft + ft, Z = P + x.fnSelectorBytes.byteLength, L = $(x.data);
      let D = 0;
      g.push(new k("u64").encode(x.amount || 0)), g.push(new q().encode(((N = x.assetId) == null ? void 0 : N.toString()) || Mt)), g.push(x.contractId.toBytes()), g.push(new k("u64").encode(P)), g.push(new k("u64").encode(Z)), g.push(x.fnSelectorBytes), g.push(L), x.gas && (g.push(new k("u64").encode(x.gas)), D = Z + L.byteLength);
      const z = {
        amountOffset: F,
        assetIdOffset: O,
        gasForwardedOffset: D,
        callDataOffset: j
      };
      _.push(z), A = a + ct(g).byteLength;
    }
    const m = Ou(_);
    return { data: ct(g), script: m };
  },
  () => [new Uint8Array()]
), H_ = (e, t, r, n) => {
  var a;
  const s = (a = e[0]) == null ? void 0 : a.getCallConfig();
  if (e.length === 1 && s && "bytes" in s.program)
    return rB({ receipts: t }, s, n);
  const o = aB(
    { receipts: t },
    (s == null ? void 0 : s.program).id,
    n
  ).map((_, A) => {
    var m;
    const { func: g } = e[A].getCallConfig();
    return (m = g.decodeOutput(_)) == null ? void 0 : m[0];
  });
  return r ? o : o == null ? void 0 : o[0];
}, dB = async (e) => {
  var N;
  const { funcScope: t, isMultiCall: r, program: n, transactionResponse: s } = e, i = await s.waitForResult(), { receipts: o } = i, a = Array.isArray(t) ? t : [t], _ = (N = a[0]) == null ? void 0 : N.getCallConfig(), A = z_(o, _, a), g = H_(a, o, r, A), m = fi(o);
  return {
    isMultiCall: r,
    functionScopes: a,
    value: g,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: A,
    gasUsed: m
  };
}, no = (e) => {
  var m;
  const { funcScopes: t, callResult: r, isMultiCall: n } = e, { receipts: s } = r, i = Array.isArray(t) ? t : [t], o = (m = i[0]) == null ? void 0 : m.getCallConfig(), a = z_(s, o, i), _ = H_(i, s, n, a), A = fi(s);
  return {
    functionScopes: i,
    callResult: r,
    isMultiCall: n,
    gasUsed: A,
    value: _
  };
};
function _B(e) {
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
var Y_ = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Hr();
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
    return this.functionInvocationScopes.map((r) => _B(r));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), r = uB(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(r, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (r) => this.transactionRequest.addContractInputAndOutput(pt.fromB256(r))
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
      amount: S(t.amount || 0)
    })).filter(({ assetId: t, amount: r }) => t && !S(r).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (r, { assetId: n, amount: s }) => {
      var o;
      const i = ((o = r.get(n)) == null ? void 0 : o.amount) || S(0);
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
    await hi(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Gt.Script && (this.transactionRequest.abis = U_(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, r) => t.add(r.gas || 0), S(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new R(
        Q.TRANSACTION_ERROR,
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
    const e = He(await this.getTransactionRequest());
    return (this.program.account ?? ve.generate({ provider: this.getProvider() })).getTransactionCost(e, {
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
    e = He(e);
    const t = await this.getTransactionCost(), { gasUsed: r, missingContractIds: n, outputVariables: s, maxFee: i } = t;
    return this.setDefaultTxParams(e, r, i), e.inputs = e.inputs.filter((a) => a.type !== Ct.Coin), n.forEach((a) => {
      e.addContractInputAndOutput(pt.fromString(a));
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
    return t.tip = S(e.tip || t.tip), t.gasLimit = S(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? S(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? S(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
      pt.fromAddressOrString(r),
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
        pt.fromAddressOrString(r),
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
    Mu(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: t.id,
      waitForResult: async () => dB({
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
    if (Mu(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new R(
        Q.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return no({
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
    return no({
      funcScopes: this.functionInvocationScopes,
      callResult: t,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return no({
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
    var a, _;
    const n = Fr((a = this.txParameters) == null ? void 0 : a.gasLimit) || this.hasCallParamsGasLimit, s = Fr((_ = this.txParameters) == null ? void 0 : _.maxFee), { gasLimit: i, maxFee: o } = e;
    if (!n)
      e.gasLimit = t;
    else if (i.lt(t))
      throw new R(
        Q.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (!s)
      e.maxFee = r;
    else if (r.gt(o))
      throw new R(
        Q.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${r}'.`
      );
  }
}, W_ = class extends Y_ {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, r, n) {
    super(t, !1);
    M(this, "func");
    M(this, "callParameters");
    M(this, "forward");
    M(this, "args");
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
        throw new R(
          Q.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Ca(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, hB = class extends Y_ {
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
}, Lu = class {
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
    this.interface = t instanceof Ar ? t : new Ar(t), this.id = pt.fromAddressOrString(e), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null), Object.keys(this.interface.functions).forEach((n) => {
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
      const t = (...r) => new W_(this, e, r);
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
    return new hB(this, e);
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
}, lB = class extends W_ {
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
    this.scriptRequest = new yi(
      t,
      (n) => this.func.encodeArguments(n),
      () => []
    );
  }
}, f2 = class extends $A {
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
    this.bytes = $(t), this.interface = new Ar(r), this.provider = n.provider, this.account = n, this.functions = {
      main: (...s) => new lB(this, this.interface.getFunction("main"), s)
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
        throw new R(
          R.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(t).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new R(
            R.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n);
        this.bytes.set(i, s);
      });
    } catch (r) {
      throw new R(
        R.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${r.message}.`
      );
    }
    return this;
  }
};
new yi(
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
function g2(e) {
  return e;
}
var AB = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e.versions = "versions", e.node = "node", e))(AB || {}), pB = Object.defineProperty, fB = (e, t) => {
  for (var r in t)
    pB(e, r, { get: t[r], enumerable: !0 });
}, gB = (e) => {
  const { RegId: t, Instruction: r } = JI, n = 12, s = e.length, i = lr, o = ct(e.map((_) => $(_))), a = new Pa(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    vo(16, t.is().to_u8()),
    // 0x10 to hold the address of the current blob id
    Hn(16, 16, n * r.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    vo(22, t.sp().to_u8()),
    // loop counter
    en(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    F0(17, 16),
    // push the blob contents onto the stack
    x0(16, 0, 17, 1),
    // move on to the next blob
    Hn(16, 16, i),
    // decrement the loop counter
    T0(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    D0(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    B0(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    N0(22, 22, 4),
    // jump to the start of the contract we loaded
    S0(22)
  ).toBytes();
  return ct([a, o]);
}, wB = (e, t) => {
  const r = [];
  for (let n = 0, s = 0; n < e.length; n += t, s++) {
    let i = e.slice(n, n + t), o = i.length;
    o % ft !== 0 && (i = ct([i, new Uint8Array(t - i.length)]), o = i.length), r.push({ id: s, size: o, bytecode: i });
  }
  return r;
}, mB = {};
fB(mB, {
  getContractId: () => J_,
  getContractRoot: () => V_,
  getContractStorageRoot: () => Z_,
  hexlifyWithPrefix: () => Uo
});
var V_ = (e) => {
  const r = $(e), n = rd(r, 16384);
  return r_(n.map((s) => K(s)));
}, Z_ = (e) => {
  const t = new $1();
  return e.forEach(({ key: r, value: n }) => t.update(Ee(r), n)), t.root;
}, J_ = (e, t, r) => {
  const n = V_($(e));
  return Ee(ct(["0x4655454C", t, n, r]));
}, Uo = (e) => K(e.startsWith("0x") ? e : `0x${e}`), ku = 0.95, yB = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, r = null) {
    M(this, "bytecode");
    M(this, "interface");
    M(this, "provider");
    M(this, "account");
    this.bytecode = $(e), t instanceof Ar ? this.interface = t : this.interface = new Ar(t), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new yB(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var a;
    const t = (a = e == null ? void 0 : e.storageSlots) == null ? void 0 : a.map(({ key: _, value: A }) => ({
      key: Uo(_),
      value: Uo(A)
    })).sort(({ key: _ }, { key: A }) => _.localeCompare(A)), r = {
      salt: Oe(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new R(
        Q.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const n = (e == null ? void 0 : e.bytecode) || this.bytecode, s = r.stateRoot || Z_(r.storageSlots), i = J_(n, r.salt, s), o = new Mo({
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
    if (Fr(n)) {
      if (s.maxFee.gt(n))
        throw new R(
          Q.MAX_FEE_TOO_LOW,
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
      throw new R(
        Q.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: s, transactionRequest: i } = await this.prepareDeploy(e), o = await t.sendTransaction(i);
    return {
      contractId: s,
      waitForTransactionId: () => Promise.resolve(o.id),
      waitForResult: async () => {
        const _ = await o.waitForResult();
        return { contract: new Lu(s, this.interface, t), transactionResult: _ };
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
    chunkSizeMultiplier: ku
  }) {
    const t = this.getAccount(), { configurableConstants: r, chunkSizeMultiplier: n } = e;
    r && this.setConfigurableConstants(r);
    const s = this.getMaxChunkSize(e, n), i = wB($(this.bytecode), s).map((P) => {
      const Z = this.blobTransactionRequest({
        ...e,
        bytecode: P.bytecode
      });
      return {
        ...P,
        transactionRequest: Z,
        blobId: Z.blobId
      };
    }), o = i.map(({ blobId: P }) => P), a = gB(o), { contractId: _, transactionRequest: A } = this.createTransactionRequest({
      bytecode: a,
      ...e
    });
    let g = S(0);
    const m = t.provider.getChain(), B = await t.provider.estimateGasPrice(10), N = m.consensusParameters.feeParameters.gasPriceFactor, T = [];
    for (const { transactionRequest: P, blobId: Z } of i) {
      if (!T.includes(Z)) {
        const z = P.calculateMinGas(m), U = Yn({
          gasPrice: B,
          gas: z,
          priceFactor: N,
          tip: P.tip
        }).add(1);
        g = g.add(U), T.push(Z);
      }
      const L = A.calculateMinGas(m), D = Yn({
        gasPrice: B,
        gas: L,
        priceFactor: N,
        tip: A.tip
      }).add(1);
      g = g.add(D);
    }
    if (g.gt(await t.getBalance()))
      throw new R(Q.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let x;
    const F = new Promise((P) => {
      x = P;
    });
    return { waitForResult: async () => {
      const P = [];
      for (const { blobId: z, transactionRequest: U } of i)
        if (!P.includes(z)) {
          const G = await this.fundTransactionRequest(
            U,
            e
          );
          let H;
          try {
            H = await (await t.sendTransaction(G)).waitForResult();
          } catch (Y) {
            if (Y.message.indexOf(`BlobId is already taken ${z}`) > -1)
              continue;
            throw new R(Q.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!H.status || H.status !== m_.success)
            throw new R(Q.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          P.push(z);
        }
      await this.fundTransactionRequest(A, e), x(A.getTransactionId(t.provider.getChainId()));
      const L = await (await t.sendTransaction(A)).waitForResult();
      return { contract: new Lu(_, this.interface, t), transactionResult: L };
    }, contractId: _, waitForTransactionId: () => F };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new R(
          Q.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(e).forEach(([r, n]) => {
        if (!this.interface.configurables[r])
          throw new R(
            Q.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${r}'`
          );
        const { offset: s } = this.interface.configurables[r], i = this.interface.encodeConfigurable(r, n), o = $(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new R(
        Q.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new R(Q.ACCOUNT_REQUIRED, "Account not assigned to contract.");
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
    return new Fo({
      blobId: tr(t),
      witnessIndex: 0,
      witnesses: [t],
      ...e
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  getMaxChunkSize(e, t = ku) {
    if (t < 0 || t > 1)
      throw new R(
        Q.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const { provider: r } = this.getAccount(), { consensusParameters: n } = r.getChain(), s = n.contractParameters.contractMaxSize.toNumber(), i = n.txParameters.maxSize.toNumber(), o = 64e3, a = i < s ? i : s, _ = a < o ? a : o, A = this.blobTransactionRequest({
      ...e,
      bytecode: Oe(32)
    }).fundWithFakeUtxos([], r.getBaseAssetId()), g = (_ - A.byteLength() - ft) * t;
    return Math.round(g / ft) * ft;
  }
}, w2 = 9, m2 = 3, y2 = 9, b2 = 9, I2 = 18, E2 = 15, v2 = 12, C2 = 9, B2 = "https://devnet.fuel.network/v1/graphql", x2 = "https://testnet.fuel.network/v1/graphql";
export {
  Os as ASSET_ID_LEN,
  Jd as AbstractAccount,
  jA as AbstractAddress,
  qA as AbstractContract,
  jd as AbstractProgram,
  $A as AbstractScript,
  LB as AbstractScriptRequest,
  mi as Account,
  pt as Address,
  Lv as AddressType,
  yt as ArrayCoder,
  q as B256Coder,
  MA as B512Coder,
  hC as BLOCKS_PAGE_SIZE_LIMIT,
  kt as BN,
  lr as BYTES_32,
  gi as BaseTransactionRequest,
  B_ as BaseWalletUnlocked,
  k as BigNumberCoder,
  Fo as BlobTransactionRequest,
  LA as BooleanCoder,
  St as ByteArrayCoder,
  Pd as ByteCoder,
  nn as CHAIN_IDS,
  TA as CONTRACT_ID_LEN,
  GB as CONTRACT_MAX_SIZE,
  kv as ChainName,
  e2 as ChangeOutputCollisionError,
  dt as Coder,
  AB as Commands,
  Lu as Contract,
  yB as ContractFactory,
  mB as ContractUtils,
  Mo as CreateTransactionRequest,
  b2 as DECIMAL_FUEL,
  C2 as DECIMAL_GWEI,
  E2 as DECIMAL_KWEI,
  v2 as DECIMAL_MWEI,
  I2 as DECIMAL_WEI,
  y2 as DEFAULT_DECIMAL_UNITS,
  m2 as DEFAULT_MIN_PRECISION,
  w2 as DEFAULT_PRECISION,
  lC as DEFAULT_RESOURCE_CACHE_TTL,
  B2 as DEVNET_NETWORK_URL,
  Vo as DateTime,
  Fs as ENCODING_V1,
  zB as EmptyRoot,
  Ud as EnumCoder,
  Q as ErrorCode,
  Yf as FAILED_ASSERT_EQ_SIGNAL,
  Vf as FAILED_ASSERT_NE_SIGNAL,
  Wf as FAILED_ASSERT_SIGNAL,
  Hf as FAILED_REQUIRE_SIGNAL,
  E0 as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  JB as FAILED_UNKNOWN_SIGNAL,
  ks as FUEL_BECH32_HRP_PREFIX,
  P_ as Fuel,
  ZC as FuelConnector,
  k_ as FuelConnectorEventType,
  ka as FuelConnectorEventTypes,
  L_ as FuelConnectorMethods,
  R as FuelError,
  W_ as FunctionInvocationScope,
  ro as HDWallet,
  OB as INPUT_COIN_FIXED_SIZE,
  er as InputCoder,
  pc as InputCoinCoder,
  Ps as InputContractCoder,
  Un as InputMessageCoder,
  Ct as InputType,
  Pa as InstructionSet,
  Ar as Interface,
  NC as Language,
  VC as LocalStorage,
  ZB as MAX_PREDICATE_DATA_LENGTH,
  VB as MAX_PREDICATE_LENGTH,
  YB as MAX_SCRIPT_DATA_LENGTH,
  HB as MAX_SCRIPT_LENGTH,
  WB as MAX_STATIC_CONTRACTS,
  XB as MAX_WITNESSES,
  Tu as MNEMONIC_SIZES,
  XC as MemoryStorage,
  Ma as Mnemonic,
  Q_ as MnemonicVault,
  hB as MultiCallInvocationScope,
  Av as NoWitnessAtIndexError,
  r2 as NoWitnessByOwnerError,
  et as NumberCoder,
  Ov as OperationName,
  Hd as OptionCoder,
  gc as OutputChangeCoder,
  rr as OutputCoder,
  fc as OutputCoinCoder,
  Us as OutputContractCoder,
  mc as OutputContractCreatedCoder,
  It as OutputType,
  wc as OutputVariableCoder,
  Jf as PANIC_DOC_URL,
  Zf as PANIC_REASONS,
  nr as PoliciesCoder,
  ze as PolicyType,
  Fu as Predicate,
  D_ as PrivateKeyVault,
  ri as Provider,
  Cu as RESOURCES_PAGE_SIZE_LIMIT,
  PA as RawSliceCoder,
  wo as ReceiptBurnCoder,
  yc as ReceiptCallCoder,
  PB as ReceiptCoder,
  Cc as ReceiptLogCoder,
  Bc as ReceiptLogDataCoder,
  zs as ReceiptMessageOutCoder,
  zn as ReceiptMintCoder,
  Ec as ReceiptPanicCoder,
  bc as ReceiptReturnCoder,
  Ic as ReceiptReturnDataCoder,
  vc as ReceiptRevertCoder,
  Sc as ReceiptScriptResultCoder,
  xc as ReceiptTransferCoder,
  Rc as ReceiptTransferOutCoder,
  lt as ReceiptType,
  kd as SCRIPT_FIXED_SIZE,
  f2 as Script,
  yi as ScriptRequest,
  Hr as ScriptTransactionRequest,
  gn as Signer,
  oa as StdStringCoder,
  A2 as StorageAbstract,
  Nc as StorageSlotCoder,
  Yd as StrSliceCoder,
  UA as StringCoder,
  ai as StructCoder,
  x2 as TESTNET_NETWORK_URL,
  Lc as TransactionBlobCoder,
  hr as TransactionCoder,
  Dc as TransactionCreateCoder,
  Fc as TransactionMintCoder,
  Oo as TransactionResponse,
  Qc as TransactionScriptCoder,
  m_ as TransactionStatus,
  Gt as TransactionType,
  Mv as TransactionTypeName,
  Mc as TransactionUpgradeCoder,
  Oc as TransactionUploadCoder,
  Wd as TupleCoder,
  Vr as TxPointerCoder,
  Ms as UTXO_ID_LEN,
  UB as UtxoIdCoder,
  YC as Vault,
  zA as VecCoder,
  ft as WORD_SIZE,
  ve as Wallet,
  T_ as WalletLocked,
  HC as WalletManager,
  Se as WalletUnlocked,
  sr as WitnessCoder,
  Mt as ZeroBytes32,
  eE as addAmountToCoinQuantities,
  Vn as addOperation,
  Qn as addressify,
  Sv as aggregateInputsAmountsByAssetAndOwner,
  $ as arrayify,
  hv as assemblePanicError,
  ov as assembleReceiptByType,
  lv as assembleRevertError,
  wi as assembleTransactionSummary,
  Mu as assert,
  Zh as assertUnreachable,
  l2 as assets,
  S as bn,
  Tr as bufferFromString,
  t2 as buildBlockExplorerUrl,
  no as buildDryRunResult,
  dB as buildFunctionResult,
  JC as cacheFor,
  n2 as cacheRequestInputsResources,
  fv as cacheRequestInputsResourcesFromOwner,
  Yn as calculateGasFee,
  dv as calculateMetadataGasForTxBlob,
  l_ as calculateMetadataGasForTxCreate,
  A_ as calculateMetadataGasForTxScript,
  Iv as calculateTXFeeForSummary,
  Ld as calculateVmTxMemory,
  BB as capitalizeString,
  rd as chunkAndPadBytes,
  sp as clearFirst12BytesFromB256,
  Ca as coinQuantityfy,
  NB as compressBytecode,
  Td as computeHmac,
  ct as concat,
  ii as concatBytes,
  kB as createAssetId,
  g2 as createConfig,
  Zo as dataSlice,
  Yh as decodeBase58,
  TB as decompressBytecode,
  nA as decrypt,
  iA as decryptJsonWalletData,
  SB as defaultConsensusKey,
  RB as defaultSnapshotConfigs,
  jC as deferPromise,
  p2 as dispatchFuelConnectorEvent,
  od as encodeBase58,
  sA as encrypt,
  oA as encryptJsonWalletData,
  ms as english,
  aC as extractBurnedAssetsFromReceipts,
  H_ as extractInvocationResult,
  oC as extractMintedAssetsFromReceipts,
  Sa as extractTxError,
  EB as format,
  IB as formatUnits,
  _a as fromBech32,
  IC as fuelAssetsBaseUrl,
  uv as gasUsedByInputs,
  U_ as getAbisFromAllCalls,
  pv as getAssetAmountInRequestInputs,
  _2 as getAssetEth,
  h2 as getAssetFuel,
  fC as getAssetNetwork,
  C_ as getAssetWithNetwork,
  ha as getBytesFromBech32,
  tC as getContractCallOperations,
  sC as getContractCreatedOperations,
  Fa as getDecodedLogs,
  pC as getDefaultChainId,
  fi as getGasUsedFromReceipts,
  Da as getInputAccountAddress,
  Tv as getInputContractFromIndex,
  g_ as getInputFromAssetId,
  Qa as getInputsByType,
  vv as getInputsByTypes,
  Cv as getInputsCoin,
  f_ as getInputsCoinAndMessage,
  xv as getInputsContract,
  Bv as getInputsMessage,
  Ra as getMaxGas,
  h_ as getMinGas,
  la as getMintedAssetId,
  iC as getOperations,
  ds as getOutputsByType,
  Dv as getOutputsChange,
  w_ as getOutputsCoin,
  Fv as getOutputsContract,
  Qv as getOutputsContractCreated,
  i2 as getOutputsVariable,
  nC as getPayProducerOperations,
  WC as getPredicateRoot,
  np as getRandomB256,
  Wn as getReceiptsByType,
  Xv as getReceiptsCall,
  Hv as getReceiptsMessageOut,
  a2 as getReceiptsTransferOut,
  bu as getReceiptsWithMissingData,
  p_ as getRequestInputResourceOwner,
  z_ as getResultLogs,
  cC as getTransactionStatusName,
  c2 as getTransactionSummary,
  u2 as getTransactionSummaryFromRequest,
  y_ as getTransactionTypeName,
  d2 as getTransactionsSummaries,
  rC as getTransferOperations,
  jv as getWithdrawFromFuelOperations,
  o2 as hasSameAssetId,
  tr as hash,
  _A as hashMessage,
  K as hexlify,
  ev as inputify,
  fo as isB256,
  xs as isBech32,
  nv as isCoin,
  Fr as isDefined,
  go as isEvmAddress,
  Eu as isInputCoin,
  KB as isMessage,
  lc as isPublicKey,
  qB as isRawCoin,
  $B as isRawMessage,
  In as isRequestInputCoin,
  Na as isRequestInputMessage,
  Qr as isRequestInputResource,
  Do as isRequestInputResourceFromOwner,
  s2 as isTransactionTypeBlob,
  bv as isTransactionTypeCreate,
  kr as isTransactionTypeScript,
  En as isType,
  Gv as isTypeBlob,
  b_ as isTypeCreate,
  Pv as isTypeMint,
  I_ as isTypeScript,
  Uv as isTypeUpgrade,
  zv as isTypeUpload,
  Nd as keccak256,
  MB as keyFromPassword,
  vB as max,
  CB as multiply,
  rp as normalizeBech32,
  _v as normalizeJSON,
  xB as normalizeString,
  rv as outputify,
  ip as padFirst12BytesOfEvmAddress,
  aA as pbkdf2,
  Sr as processGqlReceipt,
  uC as processGraphqlStatus,
  Oe as randomBytes,
  uA as randomUUID,
  EC as rawAssets,
  $e as resolveGasDependentCosts,
  bC as resolveIconPaths,
  Iu as returnZeroScript,
  cA as ripemd160,
  Sd as scrypt,
  Ee as sha256,
  Uh as sleep,
  _p as sortPolicies,
  Tn as stringFromBuffer,
  Ac as toB256,
  Bs as toBech32,
  _r as toBytes,
  _h as toFixed,
  Ho as toHex,
  Br as toNumber,
  dn as toUtf8Bytes,
  Jo as toUtf8String,
  Ce as transactionRequestify,
  dA as uint64ToBytesBE,
  yC as urlJoin,
  ys as withTimeout,
  yv as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
