var N0 = Object.defineProperty;
var R0 = (e, t, n) => t in e ? N0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var N = (e, t, n) => (R0(e, typeof t != "symbol" ? t + "" : t, n), n), Ti = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Ee = (e, t, n) => (Ti(e, t, "read from private field"), n ? n.call(e) : t.get(e)), lt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Ct = (e, t, n, r) => (Ti(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var on = (e, t, n) => (Ti(e, t, "access private method"), n);
function fA() {
  return {
    FORC: "0.51.1",
    FUEL_CORE: "0.22.1",
    FUELS: "0.78.0"
  };
}
function Pa(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Do(e, t) {
  const n = Pa(e), r = Pa(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function S0(e, t) {
  const { major: n } = Do(e, t);
  return n === 0;
}
function _0(e, t) {
  const { minor: n } = Do(e, t);
  return n === 0;
}
function k0(e, t) {
  const { patch: n } = Do(e, t);
  return n === 0;
}
function M0(e) {
  const { FUEL_CORE: t } = fA();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: S0(e, t),
    isMinorSupported: _0(e, t),
    isPatchSupported: k0(e, t)
  };
}
var O0 = fA(), L0 = Object.defineProperty, T0 = (e, t, n) => t in e ? L0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, P0 = (e, t, n) => (T0(e, typeof t != "symbol" ? t + "" : t, n), n), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(D || {}), gs = class extends Error {
  constructor(t, n) {
    super(n);
    N(this, "VERSIONS", O0);
    N(this, "code");
    this.code = t, this.name = "FuelError";
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new gs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(D);
    if (!r.includes(n.code))
      throw new gs(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new gs(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, VERSIONS: s } = this;
    return { code: t, name: n, message: r, VERSIONS: s };
  }
}, v = gs;
P0(v, "CODES", D);
var U0 = Object.defineProperty, G0 = (e, t, n) => t in e ? U0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, H0 = (e, t, n) => (G0(e, typeof t != "symbol" ? t + "" : t, n), n), Ay = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, gA = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(c, c + t)), n.push(d);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, J = (e) => {
  if (e instanceof Uint8Array)
    return new Uint8Array(e);
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const t = new Uint8Array((e.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < t.length; r++)
      t[r] = parseInt(e.substring(n, n + 2), 16), n += 2;
    return t;
  }
  throw new v(D.PARSE_FAILED, "invalid BytesLike value");
}, Zr = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, se = (e) => {
  const t = e.map((n) => J(n));
  return Zr(t);
}, Ua = "0123456789abcdef";
function X(e) {
  const t = J(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Ua[(s & 240) >> 4] + Ua[s & 15];
  }
  return n;
}
var uy = (e) => {
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
    throw new v(D.PARSE_FAILED, r);
  }
  return n;
}, J0 = 37, pA = BigInt(2 ** 62) + BigInt(J0), Z0 = (e) => Math.floor(e / 1e3), mA = (e) => e * 1e3, Y0 = (e) => Number(BigInt(e) - pA), V0 = (e) => String(BigInt(e) + pA), X0 = (e) => mA(Y0(e)), ps = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new ps(X0(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new ps(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new ps(mA(e));
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
    return V0(this.toUnixSeconds());
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
    return Z0(this.getTime());
  }
}, No = ps;
H0(No, "TAI64_NULL", "");
var j0 = {
  chain_name: "local_testnet",
  block_gas_limit: 5e9,
  initial_state: {
    coins: [
      {
        owner: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      },
      {
        owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
      },
      {
        owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
      }
    ],
    messages: [
      {
        sender: "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f",
        recipient: "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba",
        nonce: "0101010101010101010101010101010101010101010101010101010101010101",
        amount: "0x000000000000FFFF",
        data: "",
        da_height: "0x00"
      },
      {
        sender: "0x69a2b736b60159b43bb8a4f98c0589f6da5fa3a3d101e8e269c499eb942753ba",
        recipient: "0xc43454aa38dd91f88109a4b7aef5efb96ce34e3f24992fe0f81d233ca686f80f",
        nonce: "0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b",
        amount: "0xb04f3c08f59b309e",
        data: "",
        da_height: "0x00"
      }
    ]
  },
  consensus_parameters: {
    tx_params: {
      max_inputs: 255,
      max_outputs: 255,
      max_witnesses: 255,
      max_gas_per_tx: 1e7,
      max_size: 17825792
    },
    predicate_params: {
      max_predicate_length: 1048576,
      max_predicate_data_length: 1048576,
      max_gas_per_predicate: 1e7,
      max_message_data_length: 1048576
    },
    script_params: {
      max_script_length: 1048576,
      max_script_data_length: 1048576
    },
    contract_params: {
      contract_max_size: 16777216,
      max_storage_slots: 255
    },
    fee_params: {
      gas_price_factor: 92,
      gas_per_byte: 4
    }
  },
  gas_costs: {
    add: 1,
    addi: 1,
    aloc: 1,
    and: 1,
    andi: 1,
    bal: 13,
    bhei: 1,
    bhsh: 1,
    burn: 132,
    cb: 1,
    cfei: 1,
    cfsi: 1,
    croo: 16,
    div: 1,
    divi: 1,
    ecr1: 3e3,
    eck1: 951,
    ed19: 3e3,
    eq: 1,
    exp: 1,
    expi: 1,
    flag: 1,
    gm: 1,
    gt: 1,
    gtf: 1,
    ji: 1,
    jmp: 1,
    jne: 1,
    jnei: 1,
    jnzi: 1,
    jmpf: 1,
    jmpb: 1,
    jnzf: 1,
    jnzb: 1,
    jnef: 1,
    jneb: 1,
    lb: 1,
    log: 9,
    lt: 1,
    lw: 1,
    mint: 135,
    mlog: 1,
    modOp: 1,
    modi: 1,
    moveOp: 1,
    movi: 1,
    mroo: 2,
    mul: 1,
    muli: 1,
    mldv: 1,
    noop: 1,
    not: 1,
    or: 1,
    ori: 1,
    poph: 2,
    popl: 2,
    pshh: 2,
    pshl: 2,
    ret: 13,
    rvrt: 13,
    sb: 1,
    sll: 1,
    slli: 1,
    srl: 1,
    srli: 1,
    srw: 12,
    sub: 1,
    subi: 1,
    sw: 1,
    sww: 67,
    time: 1,
    tr: 105,
    tro: 60,
    wdcm: 1,
    wqcm: 1,
    wdop: 1,
    wqop: 1,
    wdml: 1,
    wqml: 1,
    wddv: 1,
    wqdv: 2,
    wdmd: 3,
    wqmd: 4,
    wdam: 2,
    wqam: 3,
    wdmm: 3,
    wqmm: 3,
    xor: 1,
    xori: 1,
    call: {
      LightOperation: {
        base: 144,
        units_per_gas: 214
      }
    },
    ccp: {
      LightOperation: {
        base: 15,
        units_per_gas: 103
      }
    },
    csiz: {
      LightOperation: {
        base: 17,
        units_per_gas: 790
      }
    },
    k256: {
      LightOperation: {
        base: 11,
        units_per_gas: 214
      }
    },
    ldc: {
      LightOperation: {
        base: 15,
        units_per_gas: 272
      }
    },
    logd: {
      LightOperation: {
        base: 26,
        units_per_gas: 64
      }
    },
    mcl: {
      LightOperation: {
        base: 1,
        units_per_gas: 3333
      }
    },
    mcli: {
      LightOperation: {
        base: 1,
        units_per_gas: 3333
      }
    },
    mcp: {
      LightOperation: {
        base: 1,
        units_per_gas: 2e3
      }
    },
    mcpi: {
      LightOperation: {
        base: 3,
        units_per_gas: 2e3
      }
    },
    meq: {
      LightOperation: {
        base: 1,
        units_per_gas: 2500
      }
    },
    retd: {
      LightOperation: {
        base: 29,
        units_per_gas: 62
      }
    },
    s256: {
      LightOperation: {
        base: 2,
        units_per_gas: 214
      }
    },
    scwq: {
      LightOperation: {
        base: 13,
        units_per_gas: 5
      }
    },
    smo: {
      LightOperation: {
        base: 209,
        units_per_gas: 55
      }
    },
    srwq: {
      LightOperation: {
        base: 47,
        units_per_gas: 5
      }
    },
    swwq: {
      LightOperation: {
        base: 44,
        units_per_gas: 5
      }
    },
    contract_root: {
      LightOperation: {
        base: 75,
        units_per_gas: 1
      }
    },
    state_root: {
      LightOperation: {
        base: 412,
        units_per_gas: 1
      }
    },
    vm_initialization: {
      HeavyOperation: {
        base: 2e3,
        gas_per_unit: 0
      }
    },
    new_storage_per_byte: 1
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, dy = j0, ly = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298", Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function q0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ro(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      if (this instanceof r) {
        var s = [null];
        s.push.apply(s, arguments);
        var i = Function.bind.apply(t, s);
        return new i();
      }
      return t.apply(this, arguments);
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
var So = { exports: {} };
const W0 = {}, $0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: W0
}, Symbol.toStringTag, { value: "Module" })), K0 = /* @__PURE__ */ Ro($0);
So.exports;
(function(e) {
  (function(t, n) {
    function r(B, a) {
      if (!B)
        throw new Error(a || "Assertion failed");
    }
    function s(B, a) {
      B.super_ = a;
      var A = function() {
      };
      A.prototype = a.prototype, B.prototype = new A(), B.prototype.constructor = B;
    }
    function i(B, a, A) {
      if (i.isBN(B))
        return B;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, B !== null && ((a === "le" || a === "be") && (A = a, a = 10), this._init(B || 0, a || 10, A || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = K0.Buffer;
    } catch {
    }
    i.isBN = function(a) {
      return a instanceof i ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === i.wordSize && Array.isArray(a.words);
    }, i.max = function(a, A) {
      return a.cmp(A) > 0 ? a : A;
    }, i.min = function(a, A) {
      return a.cmp(A) < 0 ? a : A;
    }, i.prototype._init = function(a, A, l) {
      if (typeof a == "number")
        return this._initNumber(a, A, l);
      if (typeof a == "object")
        return this._initArray(a, A, l);
      A === "hex" && (A = 16), r(A === (A | 0) && A >= 2 && A <= 36), a = a.toString().replace(/\s+/g, "");
      var m = 0;
      a[0] === "-" && (m++, this.negative = 1), m < a.length && (A === 16 ? this._parseHex(a, m, l) : (this._parseBase(a, A, m), l === "le" && this._initArray(this.toArray(), A, l)));
    }, i.prototype._initNumber = function(a, A, l) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (r(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), A, l);
    }, i.prototype._initArray = function(a, A, l) {
      if (r(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var h, E, I = 0;
      if (l === "be")
        for (m = a.length - 1, h = 0; m >= 0; m -= 3)
          E = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[h] |= E << I & 67108863, this.words[h + 1] = E >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, h++);
      else if (l === "le")
        for (m = 0, h = 0; m < a.length; m += 3)
          E = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[h] |= E << I & 67108863, this.words[h + 1] = E >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, h++);
      return this._strip();
    };
    function c(B, a) {
      var A = B.charCodeAt(a);
      if (A >= 48 && A <= 57)
        return A - 48;
      if (A >= 65 && A <= 70)
        return A - 55;
      if (A >= 97 && A <= 102)
        return A - 87;
      r(!1, "Invalid character in " + B);
    }
    function d(B, a, A) {
      var l = c(B, A);
      return A - 1 >= a && (l |= c(B, A - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, A, l) {
      this.length = Math.ceil((a.length - A) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var h = 0, E = 0, I;
      if (l === "be")
        for (m = a.length - 1; m >= A; m -= 2)
          I = d(a, A, m) << h, this.words[E] |= I & 67108863, h >= 18 ? (h -= 18, E += 1, this.words[E] |= I >>> 26) : h += 8;
      else {
        var g = a.length - A;
        for (m = g % 2 === 0 ? A + 1 : A; m < a.length; m += 2)
          I = d(a, A, m) << h, this.words[E] |= I & 67108863, h >= 18 ? (h -= 18, E += 1, this.words[E] |= I >>> 26) : h += 8;
      }
      this._strip();
    };
    function f(B, a, A, l) {
      for (var m = 0, h = 0, E = Math.min(B.length, A), I = a; I < E; I++) {
        var g = B.charCodeAt(I) - 48;
        m *= l, g >= 49 ? h = g - 49 + 10 : g >= 17 ? h = g - 17 + 10 : h = g, r(g >= 0 && h < l, "Invalid character"), m += h;
      }
      return m;
    }
    i.prototype._parseBase = function(a, A, l) {
      this.words = [0], this.length = 1;
      for (var m = 0, h = 1; h <= 67108863; h *= A)
        m++;
      m--, h = h / A | 0;
      for (var E = a.length - l, I = E % m, g = Math.min(E, E - I) + l, u = 0, w = l; w < g; w += m)
        u = f(a, w, w + m, A), this.imuln(h), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (I !== 0) {
        var Y = 1;
        for (u = f(a, w, a.length, A), w = 0; w < I; w++)
          Y *= A;
        this.imuln(Y), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var A = 0; A < this.length; A++)
        a.words[A] = this.words[A];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function y(B, a) {
      B.words = a.words, B.length = a.length, B.negative = a.negative, B.red = a.red;
    }
    if (i.prototype._move = function(a) {
      y(a, this);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = p;
      } catch {
        i.prototype.inspect = p;
      }
    else
      i.prototype.inspect = p;
    function p() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var b = [
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
    ], F = [
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
    ], x = [
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
    i.prototype.toString = function(a, A) {
      a = a || 10, A = A | 0 || 1;
      var l;
      if (a === 16 || a === "hex") {
        l = "";
        for (var m = 0, h = 0, E = 0; E < this.length; E++) {
          var I = this.words[E], g = ((I << m | h) & 16777215).toString(16);
          h = I >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, E--), h !== 0 || E !== this.length - 1 ? l = b[6 - g.length] + g + l : l = g + l;
        }
        for (h !== 0 && (l = h.toString(16) + l); l.length % A !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = F[a], w = x[a];
        l = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var V = Y.modrn(w).toString(a);
          Y = Y.idivn(w), Y.isZero() ? l = V + l : l = b[u - V.length] + V + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % A !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(a, A) {
      return this.toArrayLike(o, a, A);
    }), i.prototype.toArray = function(a, A) {
      return this.toArrayLike(Array, a, A);
    };
    var C = function(a, A) {
      return a.allocUnsafe ? a.allocUnsafe(A) : new a(A);
    };
    i.prototype.toArrayLike = function(a, A, l) {
      this._strip();
      var m = this.byteLength(), h = l || Math.max(1, m);
      r(m <= h, "byte array longer than desired length"), r(h > 0, "Requested array length <= 0");
      var E = C(a, h), I = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + I](E, m), E;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var l = 0, m = 0, h = 0, E = 0; h < this.length; h++) {
        var I = this.words[h] << E | m;
        a[l++] = I & 255, l < a.length && (a[l++] = I >> 8 & 255), l < a.length && (a[l++] = I >> 16 & 255), E === 6 ? (l < a.length && (a[l++] = I >> 24 & 255), m = 0, E = 0) : (m = I >>> 24, E += 2);
      }
      if (l < a.length)
        for (a[l++] = m; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var l = a.length - 1, m = 0, h = 0, E = 0; h < this.length; h++) {
        var I = this.words[h] << E | m;
        a[l--] = I & 255, l >= 0 && (a[l--] = I >> 8 & 255), l >= 0 && (a[l--] = I >> 16 & 255), E === 6 ? (l >= 0 && (a[l--] = I >> 24 & 255), m = 0, E = 0) : (m = I >>> 24, E += 2);
      }
      if (l >= 0)
        for (a[l--] = m; l >= 0; )
          a[l--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : i.prototype._countBits = function(a) {
      var A = a, l = 0;
      return A >= 4096 && (l += 13, A >>>= 13), A >= 64 && (l += 7, A >>>= 7), A >= 8 && (l += 4, A >>>= 4), A >= 2 && (l += 2, A >>>= 2), l + A;
    }, i.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var A = a, l = 0;
      return A & 8191 || (l += 13, A >>>= 13), A & 127 || (l += 7, A >>>= 7), A & 15 || (l += 4, A >>>= 4), A & 3 || (l += 2, A >>>= 2), A & 1 || l++, l;
    }, i.prototype.bitLength = function() {
      var a = this.words[this.length - 1], A = this._countBits(a);
      return (this.length - 1) * 26 + A;
    };
    function R(B) {
      for (var a = new Array(B.bitLength()), A = 0; A < a.length; A++) {
        var l = A / 26 | 0, m = A % 26;
        a[A] = B.words[l] >>> m & 1;
      }
      return a;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, A = 0; A < this.length; A++) {
        var l = this._zeroBits(this.words[A]);
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
      for (var A = 0; A < a.length; A++)
        this.words[A] = this.words[A] | a.words[A];
      return this._strip();
    }, i.prototype.ior = function(a) {
      return r((this.negative | a.negative) === 0), this.iuor(a);
    }, i.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, i.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, i.prototype.iuand = function(a) {
      var A;
      this.length > a.length ? A = a : A = this;
      for (var l = 0; l < A.length; l++)
        this.words[l] = this.words[l] & a.words[l];
      return this.length = A.length, this._strip();
    }, i.prototype.iand = function(a) {
      return r((this.negative | a.negative) === 0), this.iuand(a);
    }, i.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, i.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, i.prototype.iuxor = function(a) {
      var A, l;
      this.length > a.length ? (A = this, l = a) : (A = a, l = this);
      for (var m = 0; m < l.length; m++)
        this.words[m] = A.words[m] ^ l.words[m];
      if (this !== A)
        for (; m < A.length; m++)
          this.words[m] = A.words[m];
      return this.length = A.length, this._strip();
    }, i.prototype.ixor = function(a) {
      return r((this.negative | a.negative) === 0), this.iuxor(a);
    }, i.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, i.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, i.prototype.inotn = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = Math.ceil(a / 26) | 0, l = a % 26;
      this._expand(A), l > 0 && A--;
      for (var m = 0; m < A; m++)
        this.words[m] = ~this.words[m] & 67108863;
      return l > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, A) {
      r(typeof a == "number" && a >= 0);
      var l = a / 26 | 0, m = a % 26;
      return this._expand(l + 1), A ? this.words[l] = this.words[l] | 1 << m : this.words[l] = this.words[l] & ~(1 << m), this._strip();
    }, i.prototype.iadd = function(a) {
      var A;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, A = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, A = this.isub(a), a.negative = 1, A._normSign();
      var l, m;
      this.length > a.length ? (l = this, m = a) : (l = a, m = this);
      for (var h = 0, E = 0; E < m.length; E++)
        A = (l.words[E] | 0) + (m.words[E] | 0) + h, this.words[E] = A & 67108863, h = A >>> 26;
      for (; h !== 0 && E < l.length; E++)
        A = (l.words[E] | 0) + h, this.words[E] = A & 67108863, h = A >>> 26;
      if (this.length = l.length, h !== 0)
        this.words[this.length] = h, this.length++;
      else if (l !== this)
        for (; E < l.length; E++)
          this.words[E] = l.words[E];
      return this;
    }, i.prototype.add = function(a) {
      var A;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, A = this.sub(a), a.negative ^= 1, A) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, A = a.sub(this), this.negative = 1, A) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, i.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var A = this.iadd(a);
        return a.negative = 1, A._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var l = this.cmp(a);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var m, h;
      l > 0 ? (m = this, h = a) : (m = a, h = this);
      for (var E = 0, I = 0; I < h.length; I++)
        A = (m.words[I] | 0) - (h.words[I] | 0) + E, E = A >> 26, this.words[I] = A & 67108863;
      for (; E !== 0 && I < m.length; I++)
        A = (m.words[I] | 0) + E, E = A >> 26, this.words[I] = A & 67108863;
      if (E === 0 && I < m.length && m !== this)
        for (; I < m.length; I++)
          this.words[I] = m.words[I];
      return this.length = Math.max(this.length, I), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function S(B, a, A) {
      A.negative = a.negative ^ B.negative;
      var l = B.length + a.length | 0;
      A.length = l, l = l - 1 | 0;
      var m = B.words[0] | 0, h = a.words[0] | 0, E = m * h, I = E & 67108863, g = E / 67108864 | 0;
      A.words[0] = I;
      for (var u = 1; u < l; u++) {
        for (var w = g >>> 26, Y = g & 67108863, V = Math.min(u, a.length - 1), $ = Math.max(0, u - B.length + 1); $ <= V; $++) {
          var q = u - $ | 0;
          m = B.words[q] | 0, h = a.words[$] | 0, E = m * h + Y, w += E / 67108864 | 0, Y = E & 67108863;
        }
        A.words[u] = Y | 0, g = w | 0;
      }
      return g !== 0 ? A.words[u] = g | 0 : A.length--, A._strip();
    }
    var Z = function(a, A, l) {
      var m = a.words, h = A.words, E = l.words, I = 0, g, u, w, Y = m[0] | 0, V = Y & 8191, $ = Y >>> 13, q = m[1] | 0, te = q & 8191, ne = q >>> 13, Re = m[2] | 0, fe = Re & 8191, oe = Re >>> 13, xe = m[3] | 0, de = xe & 8191, ge = xe >>> 13, Zt = m[4] | 0, Fe = Zt & 8191, ye = Zt >>> 13, Er = m[5] | 0, Se = Er & 8191, Me = Er >>> 13, rs = m[6] | 0, Te = rs & 8191, Pe = rs >>> 13, va = m[7] | 0, Ue = va & 8191, Ge = va >>> 13, xa = m[8] | 0, He = xa & 8191, Je = xa >>> 13, Fa = m[9] | 0, Ze = Fa & 8191, Ye = Fa >>> 13, Da = h[0] | 0, Ve = Da & 8191, Xe = Da >>> 13, Na = h[1] | 0, je = Na & 8191, qe = Na >>> 13, Ra = h[2] | 0, We = Ra & 8191, $e = Ra >>> 13, Sa = h[3] | 0, Ke = Sa & 8191, ze = Sa >>> 13, _a = h[4] | 0, et = _a & 8191, tt = _a >>> 13, ka = h[5] | 0, nt = ka & 8191, rt = ka >>> 13, Ma = h[6] | 0, st = Ma & 8191, it = Ma >>> 13, Oa = h[7] | 0, ot = Oa & 8191, at = Oa >>> 13, La = h[8] | 0, ct = La & 8191, At = La >>> 13, Ta = h[9] | 0, ut = Ta & 8191, dt = Ta >>> 13;
      l.negative = a.negative ^ A.negative, l.length = 19, g = Math.imul(V, Ve), u = Math.imul(V, Xe), u = u + Math.imul($, Ve) | 0, w = Math.imul($, Xe);
      var Ei = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, g = Math.imul(te, Ve), u = Math.imul(te, Xe), u = u + Math.imul(ne, Ve) | 0, w = Math.imul(ne, Xe), g = g + Math.imul(V, je) | 0, u = u + Math.imul(V, qe) | 0, u = u + Math.imul($, je) | 0, w = w + Math.imul($, qe) | 0;
      var Ii = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, g = Math.imul(fe, Ve), u = Math.imul(fe, Xe), u = u + Math.imul(oe, Ve) | 0, w = Math.imul(oe, Xe), g = g + Math.imul(te, je) | 0, u = u + Math.imul(te, qe) | 0, u = u + Math.imul(ne, je) | 0, w = w + Math.imul(ne, qe) | 0, g = g + Math.imul(V, We) | 0, u = u + Math.imul(V, $e) | 0, u = u + Math.imul($, We) | 0, w = w + Math.imul($, $e) | 0;
      var yi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (yi >>> 26) | 0, yi &= 67108863, g = Math.imul(de, Ve), u = Math.imul(de, Xe), u = u + Math.imul(ge, Ve) | 0, w = Math.imul(ge, Xe), g = g + Math.imul(fe, je) | 0, u = u + Math.imul(fe, qe) | 0, u = u + Math.imul(oe, je) | 0, w = w + Math.imul(oe, qe) | 0, g = g + Math.imul(te, We) | 0, u = u + Math.imul(te, $e) | 0, u = u + Math.imul(ne, We) | 0, w = w + Math.imul(ne, $e) | 0, g = g + Math.imul(V, Ke) | 0, u = u + Math.imul(V, ze) | 0, u = u + Math.imul($, Ke) | 0, w = w + Math.imul($, ze) | 0;
      var Bi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, g = Math.imul(Fe, Ve), u = Math.imul(Fe, Xe), u = u + Math.imul(ye, Ve) | 0, w = Math.imul(ye, Xe), g = g + Math.imul(de, je) | 0, u = u + Math.imul(de, qe) | 0, u = u + Math.imul(ge, je) | 0, w = w + Math.imul(ge, qe) | 0, g = g + Math.imul(fe, We) | 0, u = u + Math.imul(fe, $e) | 0, u = u + Math.imul(oe, We) | 0, w = w + Math.imul(oe, $e) | 0, g = g + Math.imul(te, Ke) | 0, u = u + Math.imul(te, ze) | 0, u = u + Math.imul(ne, Ke) | 0, w = w + Math.imul(ne, ze) | 0, g = g + Math.imul(V, et) | 0, u = u + Math.imul(V, tt) | 0, u = u + Math.imul($, et) | 0, w = w + Math.imul($, tt) | 0;
      var Ci = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, g = Math.imul(Se, Ve), u = Math.imul(Se, Xe), u = u + Math.imul(Me, Ve) | 0, w = Math.imul(Me, Xe), g = g + Math.imul(Fe, je) | 0, u = u + Math.imul(Fe, qe) | 0, u = u + Math.imul(ye, je) | 0, w = w + Math.imul(ye, qe) | 0, g = g + Math.imul(de, We) | 0, u = u + Math.imul(de, $e) | 0, u = u + Math.imul(ge, We) | 0, w = w + Math.imul(ge, $e) | 0, g = g + Math.imul(fe, Ke) | 0, u = u + Math.imul(fe, ze) | 0, u = u + Math.imul(oe, Ke) | 0, w = w + Math.imul(oe, ze) | 0, g = g + Math.imul(te, et) | 0, u = u + Math.imul(te, tt) | 0, u = u + Math.imul(ne, et) | 0, w = w + Math.imul(ne, tt) | 0, g = g + Math.imul(V, nt) | 0, u = u + Math.imul(V, rt) | 0, u = u + Math.imul($, nt) | 0, w = w + Math.imul($, rt) | 0;
      var bi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, g = Math.imul(Te, Ve), u = Math.imul(Te, Xe), u = u + Math.imul(Pe, Ve) | 0, w = Math.imul(Pe, Xe), g = g + Math.imul(Se, je) | 0, u = u + Math.imul(Se, qe) | 0, u = u + Math.imul(Me, je) | 0, w = w + Math.imul(Me, qe) | 0, g = g + Math.imul(Fe, We) | 0, u = u + Math.imul(Fe, $e) | 0, u = u + Math.imul(ye, We) | 0, w = w + Math.imul(ye, $e) | 0, g = g + Math.imul(de, Ke) | 0, u = u + Math.imul(de, ze) | 0, u = u + Math.imul(ge, Ke) | 0, w = w + Math.imul(ge, ze) | 0, g = g + Math.imul(fe, et) | 0, u = u + Math.imul(fe, tt) | 0, u = u + Math.imul(oe, et) | 0, w = w + Math.imul(oe, tt) | 0, g = g + Math.imul(te, nt) | 0, u = u + Math.imul(te, rt) | 0, u = u + Math.imul(ne, nt) | 0, w = w + Math.imul(ne, rt) | 0, g = g + Math.imul(V, st) | 0, u = u + Math.imul(V, it) | 0, u = u + Math.imul($, st) | 0, w = w + Math.imul($, it) | 0;
      var Qi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, g = Math.imul(Ue, Ve), u = Math.imul(Ue, Xe), u = u + Math.imul(Ge, Ve) | 0, w = Math.imul(Ge, Xe), g = g + Math.imul(Te, je) | 0, u = u + Math.imul(Te, qe) | 0, u = u + Math.imul(Pe, je) | 0, w = w + Math.imul(Pe, qe) | 0, g = g + Math.imul(Se, We) | 0, u = u + Math.imul(Se, $e) | 0, u = u + Math.imul(Me, We) | 0, w = w + Math.imul(Me, $e) | 0, g = g + Math.imul(Fe, Ke) | 0, u = u + Math.imul(Fe, ze) | 0, u = u + Math.imul(ye, Ke) | 0, w = w + Math.imul(ye, ze) | 0, g = g + Math.imul(de, et) | 0, u = u + Math.imul(de, tt) | 0, u = u + Math.imul(ge, et) | 0, w = w + Math.imul(ge, tt) | 0, g = g + Math.imul(fe, nt) | 0, u = u + Math.imul(fe, rt) | 0, u = u + Math.imul(oe, nt) | 0, w = w + Math.imul(oe, rt) | 0, g = g + Math.imul(te, st) | 0, u = u + Math.imul(te, it) | 0, u = u + Math.imul(ne, st) | 0, w = w + Math.imul(ne, it) | 0, g = g + Math.imul(V, ot) | 0, u = u + Math.imul(V, at) | 0, u = u + Math.imul($, ot) | 0, w = w + Math.imul($, at) | 0;
      var vi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (vi >>> 26) | 0, vi &= 67108863, g = Math.imul(He, Ve), u = Math.imul(He, Xe), u = u + Math.imul(Je, Ve) | 0, w = Math.imul(Je, Xe), g = g + Math.imul(Ue, je) | 0, u = u + Math.imul(Ue, qe) | 0, u = u + Math.imul(Ge, je) | 0, w = w + Math.imul(Ge, qe) | 0, g = g + Math.imul(Te, We) | 0, u = u + Math.imul(Te, $e) | 0, u = u + Math.imul(Pe, We) | 0, w = w + Math.imul(Pe, $e) | 0, g = g + Math.imul(Se, Ke) | 0, u = u + Math.imul(Se, ze) | 0, u = u + Math.imul(Me, Ke) | 0, w = w + Math.imul(Me, ze) | 0, g = g + Math.imul(Fe, et) | 0, u = u + Math.imul(Fe, tt) | 0, u = u + Math.imul(ye, et) | 0, w = w + Math.imul(ye, tt) | 0, g = g + Math.imul(de, nt) | 0, u = u + Math.imul(de, rt) | 0, u = u + Math.imul(ge, nt) | 0, w = w + Math.imul(ge, rt) | 0, g = g + Math.imul(fe, st) | 0, u = u + Math.imul(fe, it) | 0, u = u + Math.imul(oe, st) | 0, w = w + Math.imul(oe, it) | 0, g = g + Math.imul(te, ot) | 0, u = u + Math.imul(te, at) | 0, u = u + Math.imul(ne, ot) | 0, w = w + Math.imul(ne, at) | 0, g = g + Math.imul(V, ct) | 0, u = u + Math.imul(V, At) | 0, u = u + Math.imul($, ct) | 0, w = w + Math.imul($, At) | 0;
      var xi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, g = Math.imul(Ze, Ve), u = Math.imul(Ze, Xe), u = u + Math.imul(Ye, Ve) | 0, w = Math.imul(Ye, Xe), g = g + Math.imul(He, je) | 0, u = u + Math.imul(He, qe) | 0, u = u + Math.imul(Je, je) | 0, w = w + Math.imul(Je, qe) | 0, g = g + Math.imul(Ue, We) | 0, u = u + Math.imul(Ue, $e) | 0, u = u + Math.imul(Ge, We) | 0, w = w + Math.imul(Ge, $e) | 0, g = g + Math.imul(Te, Ke) | 0, u = u + Math.imul(Te, ze) | 0, u = u + Math.imul(Pe, Ke) | 0, w = w + Math.imul(Pe, ze) | 0, g = g + Math.imul(Se, et) | 0, u = u + Math.imul(Se, tt) | 0, u = u + Math.imul(Me, et) | 0, w = w + Math.imul(Me, tt) | 0, g = g + Math.imul(Fe, nt) | 0, u = u + Math.imul(Fe, rt) | 0, u = u + Math.imul(ye, nt) | 0, w = w + Math.imul(ye, rt) | 0, g = g + Math.imul(de, st) | 0, u = u + Math.imul(de, it) | 0, u = u + Math.imul(ge, st) | 0, w = w + Math.imul(ge, it) | 0, g = g + Math.imul(fe, ot) | 0, u = u + Math.imul(fe, at) | 0, u = u + Math.imul(oe, ot) | 0, w = w + Math.imul(oe, at) | 0, g = g + Math.imul(te, ct) | 0, u = u + Math.imul(te, At) | 0, u = u + Math.imul(ne, ct) | 0, w = w + Math.imul(ne, At) | 0, g = g + Math.imul(V, ut) | 0, u = u + Math.imul(V, dt) | 0, u = u + Math.imul($, ut) | 0, w = w + Math.imul($, dt) | 0;
      var Fi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, g = Math.imul(Ze, je), u = Math.imul(Ze, qe), u = u + Math.imul(Ye, je) | 0, w = Math.imul(Ye, qe), g = g + Math.imul(He, We) | 0, u = u + Math.imul(He, $e) | 0, u = u + Math.imul(Je, We) | 0, w = w + Math.imul(Je, $e) | 0, g = g + Math.imul(Ue, Ke) | 0, u = u + Math.imul(Ue, ze) | 0, u = u + Math.imul(Ge, Ke) | 0, w = w + Math.imul(Ge, ze) | 0, g = g + Math.imul(Te, et) | 0, u = u + Math.imul(Te, tt) | 0, u = u + Math.imul(Pe, et) | 0, w = w + Math.imul(Pe, tt) | 0, g = g + Math.imul(Se, nt) | 0, u = u + Math.imul(Se, rt) | 0, u = u + Math.imul(Me, nt) | 0, w = w + Math.imul(Me, rt) | 0, g = g + Math.imul(Fe, st) | 0, u = u + Math.imul(Fe, it) | 0, u = u + Math.imul(ye, st) | 0, w = w + Math.imul(ye, it) | 0, g = g + Math.imul(de, ot) | 0, u = u + Math.imul(de, at) | 0, u = u + Math.imul(ge, ot) | 0, w = w + Math.imul(ge, at) | 0, g = g + Math.imul(fe, ct) | 0, u = u + Math.imul(fe, At) | 0, u = u + Math.imul(oe, ct) | 0, w = w + Math.imul(oe, At) | 0, g = g + Math.imul(te, ut) | 0, u = u + Math.imul(te, dt) | 0, u = u + Math.imul(ne, ut) | 0, w = w + Math.imul(ne, dt) | 0;
      var Di = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, g = Math.imul(Ze, We), u = Math.imul(Ze, $e), u = u + Math.imul(Ye, We) | 0, w = Math.imul(Ye, $e), g = g + Math.imul(He, Ke) | 0, u = u + Math.imul(He, ze) | 0, u = u + Math.imul(Je, Ke) | 0, w = w + Math.imul(Je, ze) | 0, g = g + Math.imul(Ue, et) | 0, u = u + Math.imul(Ue, tt) | 0, u = u + Math.imul(Ge, et) | 0, w = w + Math.imul(Ge, tt) | 0, g = g + Math.imul(Te, nt) | 0, u = u + Math.imul(Te, rt) | 0, u = u + Math.imul(Pe, nt) | 0, w = w + Math.imul(Pe, rt) | 0, g = g + Math.imul(Se, st) | 0, u = u + Math.imul(Se, it) | 0, u = u + Math.imul(Me, st) | 0, w = w + Math.imul(Me, it) | 0, g = g + Math.imul(Fe, ot) | 0, u = u + Math.imul(Fe, at) | 0, u = u + Math.imul(ye, ot) | 0, w = w + Math.imul(ye, at) | 0, g = g + Math.imul(de, ct) | 0, u = u + Math.imul(de, At) | 0, u = u + Math.imul(ge, ct) | 0, w = w + Math.imul(ge, At) | 0, g = g + Math.imul(fe, ut) | 0, u = u + Math.imul(fe, dt) | 0, u = u + Math.imul(oe, ut) | 0, w = w + Math.imul(oe, dt) | 0;
      var Ni = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, g = Math.imul(Ze, Ke), u = Math.imul(Ze, ze), u = u + Math.imul(Ye, Ke) | 0, w = Math.imul(Ye, ze), g = g + Math.imul(He, et) | 0, u = u + Math.imul(He, tt) | 0, u = u + Math.imul(Je, et) | 0, w = w + Math.imul(Je, tt) | 0, g = g + Math.imul(Ue, nt) | 0, u = u + Math.imul(Ue, rt) | 0, u = u + Math.imul(Ge, nt) | 0, w = w + Math.imul(Ge, rt) | 0, g = g + Math.imul(Te, st) | 0, u = u + Math.imul(Te, it) | 0, u = u + Math.imul(Pe, st) | 0, w = w + Math.imul(Pe, it) | 0, g = g + Math.imul(Se, ot) | 0, u = u + Math.imul(Se, at) | 0, u = u + Math.imul(Me, ot) | 0, w = w + Math.imul(Me, at) | 0, g = g + Math.imul(Fe, ct) | 0, u = u + Math.imul(Fe, At) | 0, u = u + Math.imul(ye, ct) | 0, w = w + Math.imul(ye, At) | 0, g = g + Math.imul(de, ut) | 0, u = u + Math.imul(de, dt) | 0, u = u + Math.imul(ge, ut) | 0, w = w + Math.imul(ge, dt) | 0;
      var Ri = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, g = Math.imul(Ze, et), u = Math.imul(Ze, tt), u = u + Math.imul(Ye, et) | 0, w = Math.imul(Ye, tt), g = g + Math.imul(He, nt) | 0, u = u + Math.imul(He, rt) | 0, u = u + Math.imul(Je, nt) | 0, w = w + Math.imul(Je, rt) | 0, g = g + Math.imul(Ue, st) | 0, u = u + Math.imul(Ue, it) | 0, u = u + Math.imul(Ge, st) | 0, w = w + Math.imul(Ge, it) | 0, g = g + Math.imul(Te, ot) | 0, u = u + Math.imul(Te, at) | 0, u = u + Math.imul(Pe, ot) | 0, w = w + Math.imul(Pe, at) | 0, g = g + Math.imul(Se, ct) | 0, u = u + Math.imul(Se, At) | 0, u = u + Math.imul(Me, ct) | 0, w = w + Math.imul(Me, At) | 0, g = g + Math.imul(Fe, ut) | 0, u = u + Math.imul(Fe, dt) | 0, u = u + Math.imul(ye, ut) | 0, w = w + Math.imul(ye, dt) | 0;
      var Si = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, g = Math.imul(Ze, nt), u = Math.imul(Ze, rt), u = u + Math.imul(Ye, nt) | 0, w = Math.imul(Ye, rt), g = g + Math.imul(He, st) | 0, u = u + Math.imul(He, it) | 0, u = u + Math.imul(Je, st) | 0, w = w + Math.imul(Je, it) | 0, g = g + Math.imul(Ue, ot) | 0, u = u + Math.imul(Ue, at) | 0, u = u + Math.imul(Ge, ot) | 0, w = w + Math.imul(Ge, at) | 0, g = g + Math.imul(Te, ct) | 0, u = u + Math.imul(Te, At) | 0, u = u + Math.imul(Pe, ct) | 0, w = w + Math.imul(Pe, At) | 0, g = g + Math.imul(Se, ut) | 0, u = u + Math.imul(Se, dt) | 0, u = u + Math.imul(Me, ut) | 0, w = w + Math.imul(Me, dt) | 0;
      var _i = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, g = Math.imul(Ze, st), u = Math.imul(Ze, it), u = u + Math.imul(Ye, st) | 0, w = Math.imul(Ye, it), g = g + Math.imul(He, ot) | 0, u = u + Math.imul(He, at) | 0, u = u + Math.imul(Je, ot) | 0, w = w + Math.imul(Je, at) | 0, g = g + Math.imul(Ue, ct) | 0, u = u + Math.imul(Ue, At) | 0, u = u + Math.imul(Ge, ct) | 0, w = w + Math.imul(Ge, At) | 0, g = g + Math.imul(Te, ut) | 0, u = u + Math.imul(Te, dt) | 0, u = u + Math.imul(Pe, ut) | 0, w = w + Math.imul(Pe, dt) | 0;
      var ki = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, g = Math.imul(Ze, ot), u = Math.imul(Ze, at), u = u + Math.imul(Ye, ot) | 0, w = Math.imul(Ye, at), g = g + Math.imul(He, ct) | 0, u = u + Math.imul(He, At) | 0, u = u + Math.imul(Je, ct) | 0, w = w + Math.imul(Je, At) | 0, g = g + Math.imul(Ue, ut) | 0, u = u + Math.imul(Ue, dt) | 0, u = u + Math.imul(Ge, ut) | 0, w = w + Math.imul(Ge, dt) | 0;
      var Mi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, g = Math.imul(Ze, ct), u = Math.imul(Ze, At), u = u + Math.imul(Ye, ct) | 0, w = Math.imul(Ye, At), g = g + Math.imul(He, ut) | 0, u = u + Math.imul(He, dt) | 0, u = u + Math.imul(Je, ut) | 0, w = w + Math.imul(Je, dt) | 0;
      var Oi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (w + (u >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, g = Math.imul(Ze, ut), u = Math.imul(Ze, dt), u = u + Math.imul(Ye, ut) | 0, w = Math.imul(Ye, dt);
      var Li = (I + g | 0) + ((u & 8191) << 13) | 0;
      return I = (w + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, E[0] = Ei, E[1] = Ii, E[2] = yi, E[3] = Bi, E[4] = Ci, E[5] = bi, E[6] = Qi, E[7] = vi, E[8] = xi, E[9] = Fi, E[10] = Di, E[11] = Ni, E[12] = Ri, E[13] = Si, E[14] = _i, E[15] = ki, E[16] = Mi, E[17] = Oi, E[18] = Li, I !== 0 && (E[19] = I, l.length++), l;
    };
    Math.imul || (Z = S);
    function T(B, a, A) {
      A.negative = a.negative ^ B.negative, A.length = B.length + a.length;
      for (var l = 0, m = 0, h = 0; h < A.length - 1; h++) {
        var E = m;
        m = 0;
        for (var I = l & 67108863, g = Math.min(h, a.length - 1), u = Math.max(0, h - B.length + 1); u <= g; u++) {
          var w = h - u, Y = B.words[w] | 0, V = a.words[u] | 0, $ = Y * V, q = $ & 67108863;
          E = E + ($ / 67108864 | 0) | 0, q = q + I | 0, I = q & 67108863, E = E + (q >>> 26) | 0, m += E >>> 26, E &= 67108863;
        }
        A.words[h] = I, l = E, E = m;
      }
      return l !== 0 ? A.words[h] = l : A.length--, A._strip();
    }
    function j(B, a, A) {
      return T(B, a, A);
    }
    i.prototype.mulTo = function(a, A) {
      var l, m = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = Z(this, a, A) : m < 63 ? l = S(this, a, A) : m < 1024 ? l = T(this, a, A) : l = j(this, a, A), l;
    }, i.prototype.mul = function(a) {
      var A = new i(null);
      return A.words = new Array(this.length + a.length), this.mulTo(a, A);
    }, i.prototype.mulf = function(a) {
      var A = new i(null);
      return A.words = new Array(this.length + a.length), j(this, a, A);
    }, i.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, i.prototype.imuln = function(a) {
      var A = a < 0;
      A && (a = -a), r(typeof a == "number"), r(a < 67108864);
      for (var l = 0, m = 0; m < this.length; m++) {
        var h = (this.words[m] | 0) * a, E = (h & 67108863) + (l & 67108863);
        l >>= 26, l += h / 67108864 | 0, l += E >>> 26, this.words[m] = E & 67108863;
      }
      return l !== 0 && (this.words[m] = l, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var A = R(a);
      if (A.length === 0)
        return new i(1);
      for (var l = this, m = 0; m < A.length && A[m] === 0; m++, l = l.sqr())
        ;
      if (++m < A.length)
        for (var h = l.sqr(); m < A.length; m++, h = h.sqr())
          A[m] !== 0 && (l = l.mul(h));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, l = (a - A) / 26, m = 67108863 >>> 26 - A << 26 - A, h;
      if (A !== 0) {
        var E = 0;
        for (h = 0; h < this.length; h++) {
          var I = this.words[h] & m, g = (this.words[h] | 0) - I << A;
          this.words[h] = g | E, E = I >>> 26 - A;
        }
        E && (this.words[h] = E, this.length++);
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
    }, i.prototype.iushrn = function(a, A, l) {
      r(typeof a == "number" && a >= 0);
      var m;
      A ? m = (A - A % 26) / 26 : m = 0;
      var h = a % 26, E = Math.min((a - h) / 26, this.length), I = 67108863 ^ 67108863 >>> h << h, g = l;
      if (m -= E, m = Math.max(0, m), g) {
        for (var u = 0; u < E; u++)
          g.words[u] = this.words[u];
        g.length = E;
      }
      if (E !== 0)
        if (this.length > E)
          for (this.length -= E, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + E];
        else
          this.words[0] = 0, this.length = 1;
      var w = 0;
      for (u = this.length - 1; u >= 0 && (w !== 0 || u >= m); u--) {
        var Y = this.words[u] | 0;
        this.words[u] = w << 26 - h | Y >>> h, w = Y & I;
      }
      return g && w !== 0 && (g.words[g.length++] = w), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(a, A, l) {
      return r(this.negative === 0), this.iushrn(a, A, l);
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
      var A = a % 26, l = (a - A) / 26, m = 1 << A;
      if (this.length <= l)
        return !1;
      var h = this.words[l];
      return !!(h & m);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, l = (a - A) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (A !== 0 && l++, this.length = Math.min(l, this.length), A !== 0) {
        var m = 67108863 ^ 67108863 >>> A << A;
        this.words[this.length - 1] &= m;
      }
      return this._strip();
    }, i.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, i.prototype.iaddn = function(a) {
      return r(typeof a == "number"), r(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, i.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var A = 0; A < this.length && this.words[A] >= 67108864; A++)
        this.words[A] -= 67108864, A === this.length - 1 ? this.words[A + 1] = 1 : this.words[A + 1]++;
      return this.length = Math.max(this.length, A + 1), this;
    }, i.prototype.isubn = function(a) {
      if (r(typeof a == "number"), r(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var A = 0; A < this.length && this.words[A] < 0; A++)
          this.words[A] += 67108864, this.words[A + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, i.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(a, A, l) {
      var m = a.length + l, h;
      this._expand(m);
      var E, I = 0;
      for (h = 0; h < a.length; h++) {
        E = (this.words[h + l] | 0) + I;
        var g = (a.words[h] | 0) * A;
        E -= g & 67108863, I = (E >> 26) - (g / 67108864 | 0), this.words[h + l] = E & 67108863;
      }
      for (; h < this.length - l; h++)
        E = (this.words[h + l] | 0) + I, I = E >> 26, this.words[h + l] = E & 67108863;
      if (I === 0)
        return this._strip();
      for (r(I === -1), I = 0, h = 0; h < this.length; h++)
        E = -(this.words[h] | 0) + I, I = E >> 26, this.words[h] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var l = this.length - a.length, m = this.clone(), h = a, E = h.words[h.length - 1] | 0, I = this._countBits(E);
      l = 26 - I, l !== 0 && (h = h.ushln(l), m.iushln(l), E = h.words[h.length - 1] | 0);
      var g = m.length - h.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = g + 1, u.words = new Array(u.length);
        for (var w = 0; w < u.length; w++)
          u.words[w] = 0;
      }
      var Y = m.clone()._ishlnsubmul(h, 1, g);
      Y.negative === 0 && (m = Y, u && (u.words[g] = 1));
      for (var V = g - 1; V >= 0; V--) {
        var $ = (m.words[h.length + V] | 0) * 67108864 + (m.words[h.length + V - 1] | 0);
        for ($ = Math.min($ / E | 0, 67108863), m._ishlnsubmul(h, $, V); m.negative !== 0; )
          $--, m.negative = 0, m._ishlnsubmul(h, 1, V), m.isZero() || (m.negative ^= 1);
        u && (u.words[V] = $);
      }
      return u && u._strip(), m._strip(), A !== "div" && l !== 0 && m.iushrn(l), {
        div: u || null,
        mod: m
      };
    }, i.prototype.divmod = function(a, A, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var m, h, E;
      return this.negative !== 0 && a.negative === 0 ? (E = this.neg().divmod(a, A), A !== "mod" && (m = E.div.neg()), A !== "div" && (h = E.mod.neg(), l && h.negative !== 0 && h.iadd(a)), {
        div: m,
        mod: h
      }) : this.negative === 0 && a.negative !== 0 ? (E = this.divmod(a.neg(), A), A !== "mod" && (m = E.div.neg()), {
        div: m,
        mod: E.mod
      }) : this.negative & a.negative ? (E = this.neg().divmod(a.neg(), A), A !== "div" && (h = E.mod.neg(), l && h.negative !== 0 && h.isub(a)), {
        div: E.div,
        mod: h
      }) : a.length > this.length || this.cmp(a) < 0 ? {
        div: new i(0),
        mod: this
      } : a.length === 1 ? A === "div" ? {
        div: this.divn(a.words[0]),
        mod: null
      } : A === "mod" ? {
        div: null,
        mod: new i(this.modrn(a.words[0]))
      } : {
        div: this.divn(a.words[0]),
        mod: new i(this.modrn(a.words[0]))
      } : this._wordDiv(a, A);
    }, i.prototype.div = function(a) {
      return this.divmod(a, "div", !1).div;
    }, i.prototype.mod = function(a) {
      return this.divmod(a, "mod", !1).mod;
    }, i.prototype.umod = function(a) {
      return this.divmod(a, "mod", !0).mod;
    }, i.prototype.divRound = function(a) {
      var A = this.divmod(a);
      if (A.mod.isZero())
        return A.div;
      var l = A.div.negative !== 0 ? A.mod.isub(a) : A.mod, m = a.ushrn(1), h = a.andln(1), E = l.cmp(m);
      return E < 0 || h === 1 && E === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, m = 0, h = this.length - 1; h >= 0; h--)
        m = (l * m + (this.words[h] | 0)) % a;
      return A ? -m : m;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var l = 0, m = this.length - 1; m >= 0; m--) {
        var h = (this.words[m] | 0) + l * 67108864;
        this.words[m] = h / a | 0, l = h % a;
      }
      return this._strip(), A ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, l = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), h = new i(0), E = new i(0), I = new i(1), g = 0; A.isEven() && l.isEven(); )
        A.iushrn(1), l.iushrn(1), ++g;
      for (var u = l.clone(), w = A.clone(); !A.isZero(); ) {
        for (var Y = 0, V = 1; !(A.words[0] & V) && Y < 26; ++Y, V <<= 1)
          ;
        if (Y > 0)
          for (A.iushrn(Y); Y-- > 0; )
            (m.isOdd() || h.isOdd()) && (m.iadd(u), h.isub(w)), m.iushrn(1), h.iushrn(1);
        for (var $ = 0, q = 1; !(l.words[0] & q) && $ < 26; ++$, q <<= 1)
          ;
        if ($ > 0)
          for (l.iushrn($); $-- > 0; )
            (E.isOdd() || I.isOdd()) && (E.iadd(u), I.isub(w)), E.iushrn(1), I.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), m.isub(E), h.isub(I)) : (l.isub(A), E.isub(m), I.isub(h));
      }
      return {
        a: E,
        b: I,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, l = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), h = new i(0), E = l.clone(); A.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var I = 0, g = 1; !(A.words[0] & g) && I < 26; ++I, g <<= 1)
          ;
        if (I > 0)
          for (A.iushrn(I); I-- > 0; )
            m.isOdd() && m.iadd(E), m.iushrn(1);
        for (var u = 0, w = 1; !(l.words[0] & w) && u < 26; ++u, w <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            h.isOdd() && h.iadd(E), h.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), m.isub(h)) : (l.isub(A), h.isub(m));
      }
      var Y;
      return A.cmpn(1) === 0 ? Y = m : Y = h, Y.cmpn(0) < 0 && Y.iadd(a), Y;
    }, i.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var A = this.clone(), l = a.clone();
      A.negative = 0, l.negative = 0;
      for (var m = 0; A.isEven() && l.isEven(); m++)
        A.iushrn(1), l.iushrn(1);
      do {
        for (; A.isEven(); )
          A.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var h = A.cmp(l);
        if (h < 0) {
          var E = A;
          A = l, l = E;
        } else if (h === 0 || l.cmpn(1) === 0)
          break;
        A.isub(l);
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
      var A = a % 26, l = (a - A) / 26, m = 1 << A;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= m, this;
      for (var h = m, E = l; h !== 0 && E < this.length; E++) {
        var I = this.words[E] | 0;
        I += h, h = I >>> 26, I &= 67108863, this.words[E] = I;
      }
      return h !== 0 && (this.words[E] = h, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(a) {
      var A = a < 0;
      if (this.negative !== 0 && !A)
        return -1;
      if (this.negative === 0 && A)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        A && (a = -a), r(a <= 67108863, "Number is too big");
        var m = this.words[0] | 0;
        l = m === a ? 0 : m < a ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, i.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var A = this.ucmp(a);
      return this.negative !== 0 ? -A | 0 : A;
    }, i.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var A = 0, l = this.length - 1; l >= 0; l--) {
        var m = this.words[l] | 0, h = a.words[l] | 0;
        if (m !== h) {
          m < h ? A = -1 : m > h && (A = 1);
          break;
        }
      }
      return A;
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
    var M = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function k(B, a) {
      this.name = B, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    k.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, k.prototype.ireduce = function(a) {
      var A = a, l;
      do
        this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), l = A.bitLength();
      while (l > this.n);
      var m = l < this.n ? -1 : A.ucmp(this.p);
      return m === 0 ? (A.words[0] = 0, A.length = 1) : m > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
    }, k.prototype.split = function(a, A) {
      a.iushrn(this.n, 0, A);
    }, k.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function O() {
      k.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(O, k), O.prototype.split = function(a, A) {
      for (var l = 4194303, m = Math.min(a.length, 9), h = 0; h < m; h++)
        A.words[h] = a.words[h];
      if (A.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var E = a.words[9];
      for (A.words[A.length++] = E & l, h = 10; h < a.length; h++) {
        var I = a.words[h] | 0;
        a.words[h - 10] = (I & l) << 4 | E >>> 22, E = I;
      }
      E >>>= 22, a.words[h - 10] = E, E === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, O.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var A = 0, l = 0; l < a.length; l++) {
        var m = a.words[l] | 0;
        A += m * 977, a.words[l] = A & 67108863, A = m * 64 + (A / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function P() {
      k.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(P, k);
    function W() {
      k.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(W, k);
    function U() {
      k.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(U, k), U.prototype.imulK = function(a) {
      for (var A = 0, l = 0; l < a.length; l++) {
        var m = (a.words[l] | 0) * 19 + A, h = m & 67108863;
        m >>>= 26, a.words[l] = h, A = m;
      }
      return A !== 0 && (a.words[a.length++] = A), a;
    }, i._prime = function(a) {
      if (M[a])
        return M[a];
      var A;
      if (a === "k256")
        A = new O();
      else if (a === "p224")
        A = new P();
      else if (a === "p192")
        A = new W();
      else if (a === "p25519")
        A = new U();
      else
        throw new Error("Unknown prime " + a);
      return M[a] = A, A;
    };
    function H(B) {
      if (typeof B == "string") {
        var a = i._prime(B);
        this.m = a.p, this.prime = a;
      } else
        r(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    H.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, H.prototype._verify2 = function(a, A) {
      r((a.negative | A.negative) === 0, "red works only with positives"), r(
        a.red && a.red === A.red,
        "red works only with red numbers"
      );
    }, H.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (y(a, a.umod(this.m)._forceRed(this)), a);
    }, H.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, H.prototype.add = function(a, A) {
      this._verify2(a, A);
      var l = a.add(A);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, H.prototype.iadd = function(a, A) {
      this._verify2(a, A);
      var l = a.iadd(A);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, H.prototype.sub = function(a, A) {
      this._verify2(a, A);
      var l = a.sub(A);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, H.prototype.isub = function(a, A) {
      this._verify2(a, A);
      var l = a.isub(A);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, H.prototype.shl = function(a, A) {
      return this._verify1(a), this.imod(a.ushln(A));
    }, H.prototype.imul = function(a, A) {
      return this._verify2(a, A), this.imod(a.imul(A));
    }, H.prototype.mul = function(a, A) {
      return this._verify2(a, A), this.imod(a.mul(A));
    }, H.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, H.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, H.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var A = this.m.andln(3);
      if (r(A % 2 === 1), A === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var m = this.m.subn(1), h = 0; !m.isZero() && m.andln(1) === 0; )
        h++, m.iushrn(1);
      r(!m.isZero());
      var E = new i(1).toRed(this), I = E.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(I) !== 0; )
        u.redIAdd(I);
      for (var w = this.pow(u, m), Y = this.pow(a, m.addn(1).iushrn(1)), V = this.pow(a, m), $ = h; V.cmp(E) !== 0; ) {
        for (var q = V, te = 0; q.cmp(E) !== 0; te++)
          q = q.redSqr();
        r(te < $);
        var ne = this.pow(w, new i(1).iushln($ - te - 1));
        Y = Y.redMul(ne), w = ne.redSqr(), V = V.redMul(w), $ = te;
      }
      return Y;
    }, H.prototype.invm = function(a) {
      var A = a._invmp(this.m);
      return A.negative !== 0 ? (A.negative = 0, this.imod(A).redNeg()) : this.imod(A);
    }, H.prototype.pow = function(a, A) {
      if (A.isZero())
        return new i(1).toRed(this);
      if (A.cmpn(1) === 0)
        return a.clone();
      var l = 4, m = new Array(1 << l);
      m[0] = new i(1).toRed(this), m[1] = a;
      for (var h = 2; h < m.length; h++)
        m[h] = this.mul(m[h - 1], a);
      var E = m[0], I = 0, g = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), h = A.length - 1; h >= 0; h--) {
        for (var w = A.words[h], Y = u - 1; Y >= 0; Y--) {
          var V = w >> Y & 1;
          if (E !== m[0] && (E = this.sqr(E)), V === 0 && I === 0) {
            g = 0;
            continue;
          }
          I <<= 1, I |= V, g++, !(g !== l && (h !== 0 || Y !== 0)) && (E = this.mul(E, m[I]), g = 0, I = 0);
        }
        u = 26;
      }
      return E;
    }, H.prototype.convertTo = function(a) {
      var A = a.umod(this.m);
      return A === a ? A.clone() : A;
    }, H.prototype.convertFrom = function(a) {
      var A = a.clone();
      return A.red = null, A;
    }, i.mont = function(a) {
      return new z(a);
    };
    function z(B) {
      H.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(z, H), z.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, z.prototype.convertFrom = function(a) {
      var A = this.imod(a.mul(this.rinv));
      return A.red = null, A;
    }, z.prototype.imul = function(a, A) {
      if (a.isZero() || A.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(A), m = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(m).iushrn(this.shift), E = h;
      return h.cmp(this.m) >= 0 ? E = h.isub(this.m) : h.cmpn(0) < 0 && (E = h.iadd(this.m)), E._forceRed(this);
    }, z.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(A), m = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(m).iushrn(this.shift), E = h;
      return h.cmp(this.m) >= 0 ? E = h.isub(this.m) : h.cmpn(0) < 0 && (E = h.iadd(this.m)), E._forceRed(this);
    }, z.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, Ce);
})(So);
var z0 = So.exports;
const ss = /* @__PURE__ */ q0(z0);
var wA = 9, EA = 3, zi = 9;
function el(e, t) {
  const { precision: n = wA, minPrecision: r = EA } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const y = d.match(/.*[1-9]{1}/), p = (y == null ? void 0 : y[0].length) || 0, b = Math.max(r, p);
    d = d.slice(0, b);
  }
  const f = d ? `.${d}` : "";
  return `${c}${f}`;
}
var Oe = class extends ss {
  constructor(t, n, r) {
    let s = t, i = n;
    Oe.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    N(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new v(D.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        D.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
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
      units: n = zi,
      precision: r = wA,
      minPrecision: s = EA
    } = t || {}, i = this.formatUnits(n), o = el(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [f = "0"] = o.split(".");
        return `${f}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = zi) {
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
    const r = new ss(this.toArray()).mulTo(t, n);
    return new Oe(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new ss(this.toArray()).egcd(t);
    return {
      a: new Oe(n.toArray()),
      b: new Oe(r.toArray()),
      gcd: new Oe(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new ss(this.toArray()).divmod(new Oe(t), n, r);
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
}, Q = (e, t, n) => new Oe(e, t, n);
Q.parseUnits = (e, t = zi) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      D.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(c);
};
function Ot(e) {
  return Q(e).toNumber();
}
function _o(e, t) {
  return Q(e).toHex(t);
}
function Ht(e, t) {
  return Q(e).toBytes(t);
}
function hy(e, t) {
  return Q(e).formatUnits(t);
}
function fy(e, t) {
  return Q(e).format(t);
}
function tl(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function gy(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
const nl = "6.7.1";
function rl(e, t, n) {
  const r = t.split("|").map((i) => i.trim());
  for (let i = 0; i < r.length; i++)
    switch (t) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof e === t)
          return;
    }
  const s = new Error(`invalid value for type ${t}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${n}`, s.value = e, s;
}
function ei(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && rl(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Pn(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(Pn).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return Pn(e.toJSON());
  switch (typeof e) {
    case "boolean":
    case "symbol":
      return e.toString();
    case "bigint":
      return BigInt(e).toString();
    case "number":
      return e.toString();
    case "string":
      return JSON.stringify(e);
    case "object": {
      const t = Object.keys(e);
      return t.sort(), "{ " + t.map((n) => `${Pn(n)}: ${Pn(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function sl(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${Pn(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + Pn(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${nl}`), s.length && (e += " (" + s.join(", ") + ")");
  }
  let r;
  switch (t) {
    case "INVALID_ARGUMENT":
      r = new TypeError(e);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      r = new RangeError(e);
      break;
    default:
      r = new Error(e);
  }
  return ei(r, { code: t }), n && Object.assign(r, n), r;
}
function fr(e, t, n, r) {
  if (!e)
    throw sl(t, n, r);
}
function be(e, t, n, r) {
  fr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const il = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD") {
      const n = String.fromCharCode(233).normalize("NFD"), r = String.fromCharCode(101, 769);
      if (n !== r)
        throw new Error("broken");
    }
    e.push(t);
  } catch {
  }
  return e;
}, []);
function ol(e) {
  fr(il.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function al(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  be(!1, "invalid BytesLike value", t || "value", e);
}
function Jt(e, t) {
  return al(e, t, !1);
}
function cl(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const Ga = "0123456789abcdef";
function Yr(e) {
  const t = Jt(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Ga[(s & 240) >> 4] + Ga[s & 15];
  }
  return n;
}
function ko(e, t, n) {
  const r = Jt(e);
  return n != null && n > r.length && fr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), Yr(r.slice(t ?? 0, n ?? r.length));
}
const Al = BigInt(0);
BigInt(1);
const Un = 9007199254740991;
function Fn(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return be(Number.isInteger(e), "underflow", t || "value", e), be(e >= -Un && e <= Un, "overflow", t || "value", e), BigInt(e);
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return e[0] === "-" && e[1] !== "-" ? -BigInt(e.substring(1)) : BigInt(e);
      } catch (n) {
        be(!1, `invalid BigNumberish string: ${n.message}`, t || "value", e);
      }
  }
  be(!1, "invalid BigNumberish value", t || "value", e);
}
function ul(e, t) {
  const n = Fn(e, t);
  return fr(n >= Al, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const Ha = "0123456789abcdef";
function dl(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += Ha[n >> 4], t += Ha[n & 15];
    return BigInt(t);
  }
  return Fn(e);
}
function IA(e, t) {
  switch (typeof e) {
    case "bigint":
      return be(e >= -Un && e <= Un, "overflow", t || "value", e), Number(e);
    case "number":
      return be(Number.isInteger(e), "underflow", t || "value", e), be(e >= -Un && e <= Un, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return IA(BigInt(e), t);
      } catch (n) {
        be(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  be(!1, "invalid numeric value", t || "value", e);
}
function ll(e, t) {
  let r = ul(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = IA(t, "width");
    for (fr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const eo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let is = null;
function hl(e) {
  if (is == null) {
    is = {};
    for (let n = 0; n < eo.length; n++)
      is[eo[n]] = BigInt(n);
  }
  const t = is[e];
  return be(t != null, "invalid base58 value", "letter", e), t;
}
const fl = BigInt(0), to = BigInt(58);
function yA(e) {
  let t = dl(Jt(e)), n = "";
  for (; t; )
    n = eo[Number(t % to)] + n, t /= to;
  return n;
}
function gl(e) {
  let t = fl;
  for (let n = 0; n < e.length; n++)
    t *= to, t += hl(e[n]);
  return t;
}
function pl(e, t, n, r, s) {
  be(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function BA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function ml(e, t, n, r, s) {
  return e === "OVERLONG" ? (be(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), BA(e, t, n));
}
const wl = Object.freeze({
  error: pl,
  ignore: BA,
  replace: ml
});
function El(e, t) {
  t == null && (t = wl.error);
  const n = Jt(e, "bytes"), r = [];
  let s = 0;
  for (; s < n.length; ) {
    const i = n[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let o = null, c = null;
    if ((i & 224) === 192)
      o = 1, c = 127;
    else if ((i & 240) === 224)
      o = 2, c = 2047;
    else if ((i & 248) === 240)
      o = 3, c = 65535;
    else {
      (i & 192) === 128 ? s += t("UNEXPECTED_CONTINUE", s - 1, n, r) : s += t("BAD_PREFIX", s - 1, n, r);
      continue;
    }
    if (s - 1 + o >= n.length) {
      s += t("OVERRUN", s - 1, n, r);
      continue;
    }
    let d = i & (1 << 8 - o - 1) - 1;
    for (let f = 0; f < o; f++) {
      let y = n[s];
      if ((y & 192) != 128) {
        s += t("MISSING_CONTINUE", s, n, r), d = null;
        break;
      }
      d = d << 6 | y & 63, s++;
    }
    if (d !== null) {
      if (d > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - o, n, r, d);
        continue;
      }
      if (d >= 55296 && d <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - o, n, r, d);
        continue;
      }
      if (d <= c) {
        s += t("OVERLONG", s - 1 - o, n, r, d);
        continue;
      }
      r.push(d);
    }
  }
  return r;
}
function ti(e, t) {
  t != null && (ol(t), e = e.normalize(t));
  let n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      r++;
      const i = e.charCodeAt(r);
      be(r < e.length && (i & 64512) === 56320, "invalid surrogate pair", "str", e);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function Il(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function ni(e, t) {
  return Il(El(e, t));
}
function no(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function yl(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function CA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Bl(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  no(e.outputLen), no(e.blockLen);
}
function Cl(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function bl(e, t) {
  CA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Et = {
  number: no,
  bool: yl,
  bytes: CA,
  hash: Bl,
  exists: Cl,
  output: bl
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ql = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), ms = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Yt = (e, t) => e << 32 - t | e >>> t, vl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!vl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function xl(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function _n(e) {
  if (typeof e == "string" && (e = xl(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Ns = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Fl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function Dl(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Fl(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function gr(e) {
  const t = (r) => e().update(_n(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Nl(e) {
  const t = (r, s) => e(s).update(_n(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let bA = class extends Ns {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Et.hash(t);
    const r = _n(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Ns))
      throw new TypeError("Expected instance of class which extends utils.Hash");
    const s = this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const i = new Uint8Array(s);
    i.set(r.length > this.iHash.blockLen ? t.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return Et.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Et.exists(this), Et.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Mo = (e, t, n) => new bA(e, t).update(n).digest();
Mo.create = (e, t) => new bA(e, t);
function Rl(e, t, n, r) {
  Et.hash(e);
  const s = Dl({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Et.number(i), Et.number(o), Et.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = _n(t), f = _n(n), y = new Uint8Array(o), p = Mo.create(e, d), b = p._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: c, DK: y, PRF: p, PRFSalt: b };
}
function Sl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function _l(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Rl(e, t, n, r);
  let f;
  const y = new Uint8Array(4), p = ms(y), b = new Uint8Array(c.outputLen);
  for (let F = 1, x = 0; x < i; F++, x += c.outputLen) {
    const C = o.subarray(x, x + c.outputLen);
    p.setInt32(0, F, !1), (f = d._cloneInto(f)).update(y).digestInto(b), C.set(b.subarray(0, C.length));
    for (let R = 1; R < s; R++) {
      c._cloneInto(f).update(b).digestInto(b);
      for (let S = 0; S < C.length; S++)
        C[S] ^= b[S];
    }
  }
  return Sl(c, d, o, f, b);
}
function kl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + f, c, r);
}
let Oo = class extends Ns {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ms(this.buffer);
  }
  update(t) {
    Et.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = _n(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = ms(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Et.exists(this), Et.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    kl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ms(t);
    this.get().forEach((d, f) => c.setUint32(4 * f, d, i));
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
};
const Ml = (e, t, n) => e & t ^ ~e & n, Ol = (e, t, n) => e & t ^ e & n ^ t & n, Ll = new Uint32Array([
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
]), an = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), cn = new Uint32Array(64);
let Tl = class extends Oo {
  constructor() {
    super(64, 32, 8, !1), this.A = an[0] | 0, this.B = an[1] | 0, this.C = an[2] | 0, this.D = an[3] | 0, this.E = an[4] | 0, this.F = an[5] | 0, this.G = an[6] | 0, this.H = an[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: c, H: d } = this;
    return [t, n, r, s, i, o, c, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let p = 0; p < 16; p++, n += 4)
      cn[p] = t.getUint32(n, !1);
    for (let p = 16; p < 64; p++) {
      const b = cn[p - 15], F = cn[p - 2], x = Yt(b, 7) ^ Yt(b, 18) ^ b >>> 3, C = Yt(F, 17) ^ Yt(F, 19) ^ F >>> 10;
      cn[p] = C + cn[p - 7] + x + cn[p - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: f, H: y } = this;
    for (let p = 0; p < 64; p++) {
      const b = Yt(c, 6) ^ Yt(c, 11) ^ Yt(c, 25), F = y + b + Ml(c, d, f) + Ll[p] + cn[p] | 0, C = (Yt(r, 2) ^ Yt(r, 13) ^ Yt(r, 22)) + Ol(r, s, i) | 0;
      y = f, f = d, d = c, c = o + F | 0, o = i, i = s, s = r, r = F + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, f = f + this.G | 0, y = y + this.H | 0, this.set(r, s, i, o, c, d, f, y);
  }
  roundClean() {
    cn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const QA = gr(() => new Tl()), os = BigInt(2 ** 32 - 1), ro = BigInt(32);
function vA(e, t = !1) {
  return t ? { h: Number(e & os), l: Number(e >> ro & os) } : { h: Number(e >> ro & os) | 0, l: Number(e & os) | 0 };
}
function Pl(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = vA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Ul = (e, t) => BigInt(e >>> 0) << ro | BigInt(t >>> 0), Gl = (e, t, n) => e >>> n, Hl = (e, t, n) => e << 32 - n | t >>> n, Jl = (e, t, n) => e >>> n | t << 32 - n, Zl = (e, t, n) => e << 32 - n | t >>> n, Yl = (e, t, n) => e << 64 - n | t >>> n - 32, Vl = (e, t, n) => e >>> n - 32 | t << 64 - n, Xl = (e, t) => t, jl = (e, t) => e, ql = (e, t, n) => e << n | t >>> 32 - n, Wl = (e, t, n) => t << n | e >>> 32 - n, $l = (e, t, n) => t << n - 32 | e >>> 64 - n, Kl = (e, t, n) => e << n - 32 | t >>> 64 - n;
function zl(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const eh = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), th = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, nh = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), rh = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, sh = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), ih = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, ue = {
  fromBig: vA,
  split: Pl,
  toBig: Ul,
  shrSH: Gl,
  shrSL: Hl,
  rotrSH: Jl,
  rotrSL: Zl,
  rotrBH: Yl,
  rotrBL: Vl,
  rotr32H: Xl,
  rotr32L: jl,
  rotlSH: ql,
  rotlSL: Wl,
  rotlBH: $l,
  rotlBL: Kl,
  add: zl,
  add3L: eh,
  add3H: th,
  add4L: nh,
  add4H: rh,
  add5H: ih,
  add5L: sh
}, [oh, ah] = ue.split([
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
].map((e) => BigInt(e))), An = new Uint32Array(80), un = new Uint32Array(80);
class Lo extends Oo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: f, El: y, Fh: p, Fl: b, Gh: F, Gl: x, Hh: C, Hl: R } = this;
    return [t, n, r, s, i, o, c, d, f, y, p, b, F, x, C, R];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d, f, y, p, b, F, x, C, R) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = f | 0, this.El = y | 0, this.Fh = p | 0, this.Fl = b | 0, this.Gh = F | 0, this.Gl = x | 0, this.Hh = C | 0, this.Hl = R | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      An[T] = t.getUint32(n), un[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = An[T - 15] | 0, M = un[T - 15] | 0, k = ue.rotrSH(j, M, 1) ^ ue.rotrSH(j, M, 8) ^ ue.shrSH(j, M, 7), O = ue.rotrSL(j, M, 1) ^ ue.rotrSL(j, M, 8) ^ ue.shrSL(j, M, 7), P = An[T - 2] | 0, W = un[T - 2] | 0, U = ue.rotrSH(P, W, 19) ^ ue.rotrBH(P, W, 61) ^ ue.shrSH(P, W, 6), H = ue.rotrSL(P, W, 19) ^ ue.rotrBL(P, W, 61) ^ ue.shrSL(P, W, 6), z = ue.add4L(O, H, un[T - 7], un[T - 16]), B = ue.add4H(z, k, U, An[T - 7], An[T - 16]);
      An[T] = B | 0, un[T] = z | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: f, Dl: y, Eh: p, El: b, Fh: F, Fl: x, Gh: C, Gl: R, Hh: S, Hl: Z } = this;
    for (let T = 0; T < 80; T++) {
      const j = ue.rotrSH(p, b, 14) ^ ue.rotrSH(p, b, 18) ^ ue.rotrBH(p, b, 41), M = ue.rotrSL(p, b, 14) ^ ue.rotrSL(p, b, 18) ^ ue.rotrBL(p, b, 41), k = p & F ^ ~p & C, O = b & x ^ ~b & R, P = ue.add5L(Z, M, O, ah[T], un[T]), W = ue.add5H(P, S, j, k, oh[T], An[T]), U = P | 0, H = ue.rotrSH(r, s, 28) ^ ue.rotrBH(r, s, 34) ^ ue.rotrBH(r, s, 39), z = ue.rotrSL(r, s, 28) ^ ue.rotrBL(r, s, 34) ^ ue.rotrBL(r, s, 39), B = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      S = C | 0, Z = R | 0, C = F | 0, R = x | 0, F = p | 0, x = b | 0, { h: p, l: b } = ue.add(f | 0, y | 0, W | 0, U | 0), f = c | 0, y = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = ue.add3L(U, z, a);
      r = ue.add3H(A, W, H, B), s = A | 0;
    }
    ({ h: r, l: s } = ue.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = ue.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = ue.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h: f, l: y } = ue.add(this.Dh | 0, this.Dl | 0, f | 0, y | 0), { h: p, l: b } = ue.add(this.Eh | 0, this.El | 0, p | 0, b | 0), { h: F, l: x } = ue.add(this.Fh | 0, this.Fl | 0, F | 0, x | 0), { h: C, l: R } = ue.add(this.Gh | 0, this.Gl | 0, C | 0, R | 0), { h: S, l: Z } = ue.add(this.Hh | 0, this.Hl | 0, S | 0, Z | 0), this.set(r, s, i, o, c, d, f, y, p, b, F, x, C, R, S, Z);
  }
  roundClean() {
    An.fill(0), un.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class ch extends Lo {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class Ah extends Lo {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const xA = gr(() => new Lo());
gr(() => new ch());
gr(() => new Ah());
function uh() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const Ja = uh();
Ja.crypto || Ja.msCrypto;
function dh(e, t) {
  const n = { sha256: QA, sha512: xA }[e];
  return be(n != null, "invalid hmac algorithm", "algorithm", e), Mo.create(n, t);
}
function lh(e, t, n, r, s) {
  const i = { sha256: QA, sha512: xA }[s];
  return be(i != null, "invalid pbkdf2 algorithm", "algorithm", s), _l(i, e, t, { c: n, dkLen: r });
}
let FA = !1;
const DA = function(e, t, n) {
  return dh(e, t).update(n).digest();
};
let NA = DA;
function pr(e, t, n) {
  const r = Jt(t, "key"), s = Jt(n, "data");
  return Yr(NA(e, r, s));
}
pr._ = DA;
pr.lock = function() {
  FA = !0;
};
pr.register = function(e) {
  if (FA)
    throw new Error("computeHmac is locked");
  NA = e;
};
Object.freeze(pr);
const [RA, SA, _A] = [[], [], []], hh = BigInt(0), Ir = BigInt(1), fh = BigInt(2), gh = BigInt(7), ph = BigInt(256), mh = BigInt(113);
for (let e = 0, t = Ir, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], RA.push(2 * (5 * r + n)), SA.push((e + 1) * (e + 2) / 2 % 64);
  let s = hh;
  for (let i = 0; i < 7; i++)
    t = (t << Ir ^ (t >> gh) * mh) % ph, t & fh && (s ^= Ir << (Ir << BigInt(i)) - Ir);
  _A.push(s);
}
const [wh, Eh] = ue.split(_A, !0), Za = (e, t, n) => n > 32 ? ue.rotlBH(e, t, n) : ue.rotlSH(e, t, n), Ya = (e, t, n) => n > 32 ? ue.rotlBL(e, t, n) : ue.rotlSL(e, t, n);
function Ih(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, f = n[d], y = n[d + 1], p = Za(f, y, 1) ^ n[c], b = Ya(f, y, 1) ^ n[c + 1];
      for (let F = 0; F < 50; F += 10)
        e[o + F] ^= p, e[o + F + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = SA[o], d = Za(s, i, c), f = Ya(s, i, c), y = RA[o];
      s = e[y], i = e[y + 1], e[y] = d, e[y + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= wh[r], e[1] ^= Eh[r];
  }
  n.fill(0);
}
let kA = class MA extends Ns {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Et.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ql(this.state);
  }
  keccak() {
    Ih(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Et.exists(this);
    const { blockLen: n, state: r } = this;
    t = _n(t);
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
    Et.exists(this, !1), Et.bytes(t), this.finish();
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
    return Et.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Et.output(t, this), this.finished)
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
    return t || (t = new MA(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const bn = (e, t, n) => gr(() => new kA(t, e, n));
bn(6, 144, 224 / 8);
bn(6, 136, 256 / 8);
bn(6, 104, 384 / 8);
bn(6, 72, 512 / 8);
bn(1, 144, 224 / 8);
const yh = bn(1, 136, 256 / 8);
bn(1, 104, 384 / 8);
bn(1, 72, 512 / 8);
const OA = (e, t, n) => Nl((r = {}) => new kA(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
OA(31, 168, 128 / 8);
OA(31, 136, 256 / 8);
let LA = !1;
const TA = function(e) {
  return yh(e);
};
let PA = TA;
function Vr(e) {
  const t = Jt(e, "data");
  return Yr(PA(t));
}
Vr._ = TA;
Vr.lock = function() {
  LA = !0;
};
Vr.register = function(e) {
  if (LA)
    throw new TypeError("keccak256 is locked");
  PA = e;
};
Object.freeze(Vr);
const Bh = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), UA = Uint8Array.from({ length: 16 }, (e, t) => t), Ch = UA.map((e) => (9 * e + 5) % 16);
let To = [UA], Po = [Ch];
for (let e = 0; e < 4; e++)
  for (let t of [To, Po])
    t.push(t[e].map((n) => Bh[n]));
const GA = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), bh = To.map((e, t) => e.map((n) => GA[t][n])), Qh = Po.map((e, t) => e.map((n) => GA[t][n])), vh = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), xh = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), as = (e, t) => e << t | e >>> 32 - t;
function Va(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const cs = new Uint32Array(16);
class Fh extends Oo {
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
    for (let F = 0; F < 16; F++, n += 4)
      cs[F] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, f = this.h3 | 0, y = f, p = this.h4 | 0, b = p;
    for (let F = 0; F < 5; F++) {
      const x = 4 - F, C = vh[F], R = xh[F], S = To[F], Z = Po[F], T = bh[F], j = Qh[F];
      for (let M = 0; M < 16; M++) {
        const k = as(r + Va(F, i, c, f) + cs[S[M]] + C, T[M]) + p | 0;
        r = p, p = f, f = as(c, 10) | 0, c = i, i = k;
      }
      for (let M = 0; M < 16; M++) {
        const k = as(s + Va(x, o, d, y) + cs[Z[M]] + R, j[M]) + b | 0;
        s = b, b = y, y = as(d, 10) | 0, d = o, o = k;
      }
    }
    this.set(this.h1 + c + y | 0, this.h2 + f + b | 0, this.h3 + p + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    cs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Dh = gr(() => new Fh());
let HA = !1;
const JA = function(e) {
  return Dh(e);
};
let ZA = JA;
function Xr(e) {
  const t = Jt(e, "data");
  return Yr(ZA(t));
}
Xr._ = JA;
Xr.lock = function() {
  HA = !0;
};
Xr.register = function(e) {
  if (HA)
    throw new TypeError("ripemd160 is locked");
  ZA = e;
};
Object.freeze(Xr);
let YA = !1;
const VA = function(e, t, n, r, s) {
  return lh(e, t, n, r, s);
};
let XA = VA;
function mr(e, t, n, r, s) {
  const i = Jt(e, "password"), o = Jt(t, "salt");
  return Yr(XA(i, o, n, r, s));
}
mr._ = VA;
mr.lock = function() {
  YA = !0;
};
mr.register = function(e) {
  if (YA)
    throw new Error("pbkdf2 is locked");
  XA = e;
};
Object.freeze(mr);
const Nh = BigInt(0), Rh = BigInt(36);
function Xa(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Jt(Vr(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const Uo = {};
for (let e = 0; e < 10; e++)
  Uo[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  Uo[String.fromCharCode(65 + e)] = String(10 + e);
const ja = 15;
function Sh(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => Uo[r]).join("");
  for (; t.length >= ja; ) {
    let r = t.substring(0, ja);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const _h = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function kh(e) {
  e = e.toLowerCase();
  let t = Nh;
  for (let n = 0; n < e.length; n++)
    t = t * Rh + _h[e[n]];
  return t;
}
function Mh(e) {
  if (be(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = Xa(e);
    return be(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    be(e.substring(2, 4) === Sh(e), "bad icap checksum", "address", e);
    let t = kh(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return Xa("0x" + t);
  }
  be(!1, "invalid address", "address", e);
}
function Pi(e, t) {
  return {
    address: Mh(e),
    storageKeys: t.map((n, r) => (be(cl(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function Oh(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (be(n.length === 2, "invalid slot set", `value[${r}]`, n), Pi(n[0], n[1])) : (be(n != null && typeof n == "object", "invalid address-slot set", "value", e), Pi(n.address, n.storageKeys)));
  be(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return Pi(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const Lh = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class jr {
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(t) {
    /**
     *  The name of the plugin.
     *
     *  It is recommended to use reverse-domain-notation, which permits
     *  unique names with a known authority as well as hierarchal entries.
     */
    N(this, "name");
    ei(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new jr(this.name);
  }
}
class ri extends jr {
  /**
   *  Creates a new GasCostPlugin from %%effectiveBlock%% until the
   *  latest block or another GasCostPlugin supercedes that block number,
   *  with the associated %%costs%%.
   */
  constructor(n, r) {
    n == null && (n = 0);
    super(`org.ethers.network.plugins.GasCost#${n || 0}`);
    /**
     *  The block number to treat these values as valid from.
     *
     *  This allows a hardfork to have updated values included as well as
     *  mulutiple hardforks to be supported.
     */
    N(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    N(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    N(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    N(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    N(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    N(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    N(this, "txAccessListAddress");
    const s = { effectiveBlock: n };
    function i(o, c) {
      let d = (r || {})[o];
      d == null && (d = c), be(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), ei(this, s);
  }
  clone() {
    return new ri(this.effectiveBlock, this);
  }
}
class si extends jr {
  /**
   *  Creates a new **EnsPlugin** connected to %%address%% on the
   *  %%targetNetwork%%. The default ENS address and mainnet is used
   *  if unspecified.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.Ens");
    /**
     *  The ENS Registrty Contract address.
     */
    N(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    N(this, "targetNetwork");
    ei(this, {
      address: n || Lh,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new si(this.address, this.targetNetwork);
  }
}
var Hr, Jr;
class jA extends jr {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    lt(this, Hr, void 0);
    lt(this, Jr, void 0);
    Ct(this, Hr, n), Ct(this, Jr, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return Ee(this, Hr);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return Ee(this, Jr);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Hr = new WeakMap(), Jr = new WeakMap();
const Ui = /* @__PURE__ */ new Map();
var Kn, zn, mn;
const Yn = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    lt(this, Kn, void 0);
    lt(this, zn, void 0);
    lt(this, mn, void 0);
    Ct(this, Kn, t), Ct(this, zn, Fn(n)), Ct(this, mn, /* @__PURE__ */ new Map());
  }
  /**
   *  Returns a JSON-compatible representation of a Network.
   */
  toJSON() {
    return { name: this.name, chainId: String(this.chainId) };
  }
  /**
   *  The network common name.
   *
   *  This is the canonical name, as networks migh have multiple
   *  names.
   */
  get name() {
    return Ee(this, Kn);
  }
  set name(t) {
    Ct(this, Kn, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return Ee(this, zn);
  }
  set chainId(t) {
    Ct(this, zn, Fn(t, "chainId"));
  }
  /**
   *  Returns true if %%other%% matches this network. Any chain ID
   *  must match, and if no chain ID is present, the name must match.
   *
   *  This method does not currently check for additional properties,
   *  such as ENS address or plug-in compatibility.
   */
  matches(t) {
    if (t == null)
      return !1;
    if (typeof t == "string") {
      try {
        return this.chainId === Fn(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === Fn(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === Fn(t.chainId);
        } catch {
        }
        return !1;
      }
      return t.name != null ? this.name === t.name : !1;
    }
    return !1;
  }
  /**
   *  Returns the list of plugins currently attached to this Network.
   */
  get plugins() {
    return Array.from(Ee(this, mn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (Ee(this, mn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return Ee(this, mn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return Ee(this, mn).get(t) || null;
  }
  /**
   *  Gets a list of all plugins that match %%name%%, with otr without
   *  a fragment.
   */
  getPlugins(t) {
    return this.plugins.filter((n) => n.name.split("#")[0] === t);
  }
  /**
   *  Create a copy of this Network.
   */
  clone() {
    const t = new Yn(this.name, this.chainId);
    return this.plugins.forEach((n) => {
      t.attachPlugin(n.clone());
    }), t;
  }
  /**
   *  Compute the intrinsic gas required for a transaction.
   *
   *  A GasCostPlugin can be attached to override the default
   *  values.
   */
  computeIntrinsicGas(t) {
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new ri();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = Oh(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (Ph(), t == null)
      return Yn.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = Ui.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new Yn("unknown", t);
      be(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      be(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new Yn(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new si(t.ensAddress, t.ensNetwork)), n;
    }
    be(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = Ui.get(t);
    r && be(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), Ui.set(t, n);
  }
};
let Nn = Yn;
Kn = new WeakMap(), zn = new WeakMap(), mn = new WeakMap();
function qa(e, t) {
  const n = String(e);
  if (!n.match(/^[0-9.]+$/))
    throw new Error(`invalid gwei value: ${e}`);
  const r = n.split(".");
  if (r.length === 1 && r.push(""), r.length !== 2)
    throw new Error(`invalid gwei value: ${e}`);
  for (; r[1].length < t; )
    r[1] += "0";
  if (r[1].length > 9) {
    let s = BigInt(r[1].substring(0, 9));
    r[1].substring(9).match(/^0+$/) || s++, r[1] = s.toString();
  }
  return BigInt(r[0] + r[1]);
}
function Wa(e) {
  return new jA(e, async (t, n, r) => {
    r.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, o] = await Promise.all([
        r.send(),
        t()
      ]);
      s = i;
      const c = s.bodyJson.standard;
      return {
        gasPrice: o.gasPrice,
        maxFeePerGas: qa(c.maxFee, 9),
        maxPriorityFeePerGas: qa(c.maxPriorityFee, 9)
      };
    } catch (i) {
      fr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function Th(e) {
  return new jA("data:", async (t, n, r) => {
    const s = await t();
    if (s.maxFeePerGas == null || s.maxPriorityFeePerGas == null)
      return s;
    const i = s.maxFeePerGas - s.maxPriorityFeePerGas;
    return {
      gasPrice: s.gasPrice,
      maxFeePerGas: i + e,
      maxPriorityFeePerGas: e
    };
  });
}
let $a = !1;
function Ph() {
  if ($a)
    return;
  $a = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Nn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new si(null, r.ensNetwork)), i.attachPlugin(new ri()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Nn.register(t, s), Nn.register(n, s), r.altNames && r.altNames.forEach((i) => {
      Nn.register(i, s);
    });
  }
  e("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), e("ropsten", 3, { ensNetwork: 3 }), e("rinkeby", 4, { ensNetwork: 4 }), e("goerli", 5, { ensNetwork: 5 }), e("kovan", 42, { ensNetwork: 42 }), e("sepolia", 11155111, {}), e("classic", 61, {}), e("classicKotti", 6, {}), e("arbitrum", 42161, {
    ensNetwork: 1
  }), e("arbitrum-goerli", 421613, {}), e("bnb", 56, { ensNetwork: 1 }), e("bnbt", 97, {}), e("linea", 59144, { ensNetwork: 1 }), e("linea-goerli", 59140, {}), e("matic", 137, {
    ensNetwork: 1,
    plugins: [
      Wa("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      Wa("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      Th(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
function Rt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Uh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Go(e, ...t) {
  if (!Uh(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function qA(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Rt(e.outputLen), Rt(e.blockLen);
}
function sr(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function WA(e, t) {
  Go(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Gi = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ws = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function $A(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Es = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Vt = (e, t) => e << 32 - t | e >>> t, Gh = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Gh)
  throw new Error("Non little-endian hardware is not supported");
function Hh(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ir(e) {
  if (typeof e == "string" && (e = Hh(e)), !$A(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function Jh(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!$A(s))
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
class Ho {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const Zh = {}.toString;
function KA(e, t) {
  if (t !== void 0 && Zh.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function zA(e) {
  const t = (r) => e().update(ir(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Yh(e = 32) {
  if (Gi && typeof Gi.getRandomValues == "function")
    return Gi.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function Vh(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + f, c, r);
}
class Xh extends Ho {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Es(this.buffer);
  }
  update(t) {
    sr(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = ir(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Es(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    sr(this), WA(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let p = o; p < s; p++)
      n[p] = 0;
    Vh(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Es(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = d / 4, y = this.get();
    if (f > y.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let p = 0; p < f; p++)
      c.setUint32(4 * p, y[p], i);
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
const jh = (e, t, n) => e & t ^ ~e & n, qh = (e, t, n) => e & t ^ e & n ^ t & n, Wh = /* @__PURE__ */ new Uint32Array([
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
]), dn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), ln = /* @__PURE__ */ new Uint32Array(64);
class $h extends Xh {
  constructor() {
    super(64, 32, 8, !1), this.A = dn[0] | 0, this.B = dn[1] | 0, this.C = dn[2] | 0, this.D = dn[3] | 0, this.E = dn[4] | 0, this.F = dn[5] | 0, this.G = dn[6] | 0, this.H = dn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: c, H: d } = this;
    return [t, n, r, s, i, o, c, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let p = 0; p < 16; p++, n += 4)
      ln[p] = t.getUint32(n, !1);
    for (let p = 16; p < 64; p++) {
      const b = ln[p - 15], F = ln[p - 2], x = Vt(b, 7) ^ Vt(b, 18) ^ b >>> 3, C = Vt(F, 17) ^ Vt(F, 19) ^ F >>> 10;
      ln[p] = C + ln[p - 7] + x + ln[p - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: f, H: y } = this;
    for (let p = 0; p < 64; p++) {
      const b = Vt(c, 6) ^ Vt(c, 11) ^ Vt(c, 25), F = y + b + jh(c, d, f) + Wh[p] + ln[p] | 0, C = (Vt(r, 2) ^ Vt(r, 13) ^ Vt(r, 22)) + qh(r, s, i) | 0;
      y = f, f = d, d = c, c = o + F | 0, o = i, i = s, s = r, r = F + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, f = f + this.G | 0, y = y + this.H | 0, this.set(r, s, i, o, c, d, f, y);
  }
  roundClean() {
    ln.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const qr = /* @__PURE__ */ zA(() => new $h());
class eu extends Ho {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, qA(t);
    const r = ir(n);
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
    return sr(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    sr(this), Go(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Jo = (e, t, n) => new eu(e, t).update(n).digest();
Jo.create = (e, t) => new eu(e, t);
function Kh(e, t, n, r) {
  qA(e);
  const s = KA({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Rt(i), Rt(o), Rt(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = ir(t), f = ir(n), y = new Uint8Array(o), p = Jo.create(e, d), b = p._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: c, DK: y, PRF: p, PRFSalt: b };
}
function zh(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function tu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Kh(e, t, n, r);
  let f;
  const y = new Uint8Array(4), p = Es(y), b = new Uint8Array(c.outputLen);
  for (let F = 1, x = 0; x < i; F++, x += c.outputLen) {
    const C = o.subarray(x, x + c.outputLen);
    p.setInt32(0, F, !1), (f = d._cloneInto(f)).update(y).digestInto(b), C.set(b.subarray(0, C.length));
    for (let R = 1; R < s; R++) {
      c._cloneInto(f).update(b).digestInto(b);
      for (let S = 0; S < C.length; S++)
        C[S] ^= b[S];
    }
  }
  return zh(c, d, o, f, b);
}
const me = (e, t) => e << t | e >>> 32 - t;
function Ka(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], d = e[t++] ^ n[r++], f = e[t++] ^ n[r++], y = e[t++] ^ n[r++], p = e[t++] ^ n[r++], b = e[t++] ^ n[r++], F = e[t++] ^ n[r++], x = e[t++] ^ n[r++], C = e[t++] ^ n[r++], R = e[t++] ^ n[r++], S = e[t++] ^ n[r++], Z = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], M = e[t++] ^ n[r++], k = o, O = c, P = d, W = f, U = y, H = p, z = b, B = F, a = x, A = C, l = R, m = S, h = Z, E = T, I = j, g = M;
  for (let u = 0; u < 8; u += 2)
    U ^= me(k + h | 0, 7), a ^= me(U + k | 0, 9), h ^= me(a + U | 0, 13), k ^= me(h + a | 0, 18), A ^= me(H + O | 0, 7), E ^= me(A + H | 0, 9), O ^= me(E + A | 0, 13), H ^= me(O + E | 0, 18), I ^= me(l + z | 0, 7), P ^= me(I + l | 0, 9), z ^= me(P + I | 0, 13), l ^= me(z + P | 0, 18), W ^= me(g + m | 0, 7), B ^= me(W + g | 0, 9), m ^= me(B + W | 0, 13), g ^= me(m + B | 0, 18), O ^= me(k + W | 0, 7), P ^= me(O + k | 0, 9), W ^= me(P + O | 0, 13), k ^= me(W + P | 0, 18), z ^= me(H + U | 0, 7), B ^= me(z + H | 0, 9), U ^= me(B + z | 0, 13), H ^= me(U + B | 0, 18), m ^= me(l + A | 0, 7), a ^= me(m + l | 0, 9), A ^= me(a + m | 0, 13), l ^= me(A + a | 0, 18), h ^= me(g + I | 0, 7), E ^= me(h + g | 0, 9), I ^= me(E + h | 0, 13), g ^= me(I + E | 0, 18);
  s[i++] = o + k | 0, s[i++] = c + O | 0, s[i++] = d + P | 0, s[i++] = f + W | 0, s[i++] = y + U | 0, s[i++] = p + H | 0, s[i++] = b + z | 0, s[i++] = F + B | 0, s[i++] = x + a | 0, s[i++] = C + A | 0, s[i++] = R + l | 0, s[i++] = S + m | 0, s[i++] = Z + h | 0, s[i++] = T + E | 0, s[i++] = j + I | 0, s[i++] = M + g | 0;
}
function Hi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    Ka(n, o, e, t, n, i), c > 0 && (o += 16), Ka(n, i, e, t += 16, n, o);
}
function ef(e, t, n) {
  const r = KA({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: f, onProgress: y } = r;
  if (Rt(s), Rt(i), Rt(o), Rt(c), Rt(d), Rt(f), y !== void 0 && typeof y != "function")
    throw new Error("progressCb should be function");
  const p = 128 * i, b = p / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (p / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / p)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const F = p * (s + o);
  if (F > f)
    throw new Error(`Scrypt: parameters too large, ${F} (128 * r * (N + p)) > ${f} (maxmem)`);
  const x = tu(qr, e, t, { c: 1, dkLen: p * o }), C = ws(x), R = ws(new Uint8Array(p * s)), S = ws(new Uint8Array(p));
  let Z = () => {
  };
  if (y) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let M = 0;
    Z = () => {
      M++, y && (!(M % j) || M === T) && y(M / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: b, V: R, B32: C, B: x, tmp: S, blockMixCb: Z, asyncTick: d };
}
function tf(e, t, n, r, s) {
  const i = tu(qr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function nf(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: f, B: y, tmp: p, blockMixCb: b } = ef(e, t, n);
  for (let F = 0; F < i; F++) {
    const x = c * F;
    for (let C = 0; C < c; C++)
      d[C] = f[x + C];
    for (let C = 0, R = 0; C < r - 1; C++)
      Hi(d, R, d, R += c, s), b();
    Hi(d, (r - 1) * c, f, x, s), b();
    for (let C = 0; C < r; C++) {
      const R = f[x + c - 16] % r;
      for (let S = 0; S < c; S++)
        p[S] = f[x + S] ^ d[R * c + S];
      Hi(p, 0, f, x, s), b();
    }
  }
  return tf(e, o, y, d, p);
}
const As = /* @__PURE__ */ BigInt(2 ** 32 - 1), za = /* @__PURE__ */ BigInt(32);
function rf(e, t = !1) {
  return t ? { h: Number(e & As), l: Number(e >> za & As) } : { h: Number(e >> za & As) | 0, l: Number(e & As) | 0 };
}
function sf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = rf(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const of = (e, t, n) => e << n | t >>> 32 - n, af = (e, t, n) => t << n | e >>> 32 - n, cf = (e, t, n) => t << n - 32 | e >>> 64 - n, Af = (e, t, n) => e << n - 32 | t >>> 64 - n, [nu, ru, su] = [[], [], []], uf = /* @__PURE__ */ BigInt(0), yr = /* @__PURE__ */ BigInt(1), df = /* @__PURE__ */ BigInt(2), lf = /* @__PURE__ */ BigInt(7), hf = /* @__PURE__ */ BigInt(256), ff = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = yr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], nu.push(2 * (5 * r + n)), ru.push((e + 1) * (e + 2) / 2 % 64);
  let s = uf;
  for (let i = 0; i < 7; i++)
    t = (t << yr ^ (t >> lf) * ff) % hf, t & df && (s ^= yr << (yr << /* @__PURE__ */ BigInt(i)) - yr);
  su.push(s);
}
const [gf, pf] = /* @__PURE__ */ sf(su, !0), ec = (e, t, n) => n > 32 ? cf(e, t, n) : of(e, t, n), tc = (e, t, n) => n > 32 ? Af(e, t, n) : af(e, t, n);
function mf(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, f = n[d], y = n[d + 1], p = ec(f, y, 1) ^ n[c], b = tc(f, y, 1) ^ n[c + 1];
      for (let F = 0; F < 50; F += 10)
        e[o + F] ^= p, e[o + F + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = ru[o], d = ec(s, i, c), f = tc(s, i, c), y = nu[o];
      s = e[y], i = e[y + 1], e[y] = d, e[y + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= gf[r], e[1] ^= pf[r];
  }
  n.fill(0);
}
class Zo extends Ho {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Rt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ws(this.state);
  }
  keccak() {
    mf(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    sr(this);
    const { blockLen: n, state: r } = this;
    t = ir(t);
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
    sr(this, !1), Go(t), this.finish();
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
    return Rt(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (WA(t, this), this.finished)
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
    return t || (t = new Zo(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const wf = (e, t, n) => zA(() => new Zo(t, e, n)), Ef = /* @__PURE__ */ wf(1, 136, 256 / 8);
var If = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return nf(t, n, { N: r, r: i, p: s, dkLen: o });
}, yf = (e) => Ef(e), Vn = (e, t = "base64") => {
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
}, { crypto: ii, btoa: iu } = globalThis;
if (!ii)
  throw new v(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!iu)
  throw new v(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var so = (e) => ii.getRandomValues(new Uint8Array(e)), Is = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return iu(n);
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
}, ou = "AES-CTR", Yo = (e, t) => {
  const n = Vn(String(e).normalize("NFKC"), "utf-8"), r = mr(n, t, 1e5, 32, "sha256");
  return J(r);
}, Bf = async (e, t) => {
  const n = so(16), r = so(32), s = Yo(e, r), i = JSON.stringify(t), o = Vn(i, "utf-8"), c = {
    name: ou,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), f = await crypto.subtle.encrypt(c, d, o);
  return {
    data: Is(f),
    iv: Is(n),
    salt: Is(r)
  };
}, Cf = async (e, t) => {
  const n = Vn(t.iv), r = Vn(t.salt), s = Yo(e, r), i = Vn(t.data), o = {
    name: ou,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), f = new TextDecoder().decode(d);
  try {
    return JSON.parse(f);
  } catch {
    throw new v(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, bf = async (e, t, n) => {
  const r = ii.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    c,
    o
  );
  return new Uint8Array(d);
}, Qf = async (e, t, n) => {
  const r = ii.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    c,
    o
  );
  return new Uint8Array(d);
}, vf = {
  bufferFromString: Vn,
  stringFromBuffer: Is,
  decrypt: Cf,
  encrypt: Bf,
  keyFromPassword: Yo,
  randomBytes: so,
  scrypt: If,
  keccak256: yf,
  decryptJsonWalletData: Qf,
  encryptJsonWalletData: bf
}, xf = vf, {
  bufferFromString: In,
  decrypt: Ff,
  encrypt: Df,
  keyFromPassword: Iy,
  randomBytes: Bn,
  stringFromBuffer: Qr,
  scrypt: au,
  keccak256: cu,
  decryptJsonWalletData: Nf,
  encryptJsonWalletData: Rf
} = xf;
function Bt(e) {
  return X(qr(J(e)));
}
function rn(e) {
  return Bt(e);
}
function Sf(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function _f(e) {
  return rn(In(e, "utf-8"));
}
var kf = Object.defineProperty, Mf = (e, t, n) => t in e ? kf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oi = (e, t, n) => (Mf(e, typeof t != "symbol" ? t + "" : t, n), n), Of = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Au = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, uu = (e, t, n) => (Of(e, t, "access private method"), n), ie = class {
  constructor(e, t, n) {
    N(this, "name");
    N(this, "type");
    N(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, du = "u8", lu = "u16", hu = "u32", fu = "u64", gu = "u256", pu = "raw untyped ptr", mu = "raw untyped slice", wu = "bool", Eu = "b256", Iu = "struct B512", Vo = "enum Option", Xo = "struct Vec", jo = "struct Bytes", qo = "struct String", yu = "str", Wo = /str\[(?<length>[0-9]+)\]/, Rs = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, $o = /^struct (?<name>\w+)$/, Ko = /^enum (?<name>\w+)$/, Bu = /^\((?<items>.*)\)$/, Lf = /^generic (?<name>\w+)$/, Ss = "0", Tf = "1", re = 8, Wr = 32, Sr = Wr, Pf = Wr, Uf = Wr, Gf = re * 4, Hf = re * 2, zo = 2 ** 32 - 1, ai = ({ maxInputs: e }) => Wr + // Tx ID
re + // Tx size
// Asset ID/Balance coin input pairs
e * (Sr + re), ea = re + // Identifier
re + // Gas limit
re + // Script size
re + // Script data size
re + // Policies
re + // Inputs size
re + // Outputs size
re + // Witnesses size
Wr, Jf = re + // Identifier
Gf + // Utxo Length
re + // Output Index
Uf + // Owner
re + // Amount
Sr + // Asset id
Hf + // TxPointer
re + // Witnesses index
re + // Maturity
re + // Predicate size
re + // Predicate data size
re, Zf = {
  u64: re,
  u256: re * 4
}, _ = class extends ie {
  constructor(e) {
    super("bigNumber", e, Zf[e]);
  }
  encode(e) {
    let t;
    try {
      t = Ht(e, this.encodedLength);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), t + this.encodedLength];
  }
}, Yf = 3, yt = Yf * re, Vf = 2, nc = Vf * re;
function St(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([f, y]) => {
      t[parseInt(f, 10) + n] = y;
    });
    const d = J(o);
    return n += d.byteLength / re, d;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function Cu(e, t, n) {
  if (!e.dynamicData)
    return se([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * re, d = new _("u64").encode(
      n + t + r
    );
    s.set(d, c);
    const f = o.dynamicData ? (
      // unpack child dynamic data
      Cu(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = se([s, f]), r += f.byteLength;
  }), s;
}
var bu = (e, t = re) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Xf = (e) => {
  switch (e) {
    case "u8":
    case "u16":
    case "u32":
    case "u64":
    case "bool":
      return !1;
    default:
      return !0;
  }
}, jf = (e) => e === Xo || e === jo || e === qo;
function xt(e, t, n = () => {
  throw new v(D.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var _r = (e) => e % re === 0, Qu = (e) => re - e % re, vu = (e) => {
  if (_r(e.length))
    return e;
  const t = new Uint8Array(re - e.length % re);
  return Zr([e, t]);
}, ft = class extends ie {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    N(this, "coder");
    N(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return St(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > zo)
      throw new v(D.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, G = class extends ie {
  constructor() {
    super("b256", "b256", re * 4);
  }
  encode(e) {
    let t;
    try {
      t = J(e);
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
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid b256 byte data size.");
    return [_o(n, 32), t + 32];
  }
}, xu = class extends ie {
  constructor() {
    super("b512", "struct B512", re * 8);
  }
  encode(e) {
    let t;
    try {
      t = J(e);
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
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid b512 byte data size.");
    return [_o(n, this.encodedLength), t + this.encodedLength];
  }
}, qf = class extends ie {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    N(this, "paddingLength");
    N(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(D.ENCODE_ERROR, "Invalid boolean value.");
    const r = Ht(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(D.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = Q(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(Q(1)))
      throw new v(D.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, io, Fu, _s = class extends ie {
  constructor() {
    super("struct", "struct Bytes", yt), Au(this, io);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new _("u64").encode(yt), r = uu(this, io, Fu).call(this, e);
    return n.dynamicData = {
      0: St([r])
    }, t.push(n), t.push(new _("u64").encode(r.byteLength)), t.push(new _("u64").encode(e.length)), St(t);
  }
  decode(e, t) {
    if (e.length < yt)
      throw new v(D.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new _("u64").decode(n, 0)[0]).toNumber(), s = e.slice(yt, yt + r);
    if (s.length !== r)
      throw new v(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + yt];
  }
};
io = /* @__PURE__ */ new WeakSet();
Fu = function(e) {
  const t = [Uint8Array.from(e)], n = (re - e.length % re) % re;
  return n && t.push(new Uint8Array(n)), se(t);
};
oi(_s, "memorySize", 1);
var Wf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), er, wn, Xs, Nu, js, Ru, aA, Du = (aA = class extends ie {
  constructor(t, n) {
    const r = new _("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    lt(this, Xs);
    lt(this, js);
    N(this, "name");
    N(this, "coders");
    lt(this, er, void 0);
    lt(this, wn, void 0);
    this.name = t, this.coders = n, Ct(this, er, r), Ct(this, wn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return on(this, Xs, Nu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(Ee(this, wn) - s.encodedLength);
    return St([Ee(this, er).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < Ee(this, wn))
      throw new v(D.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new _("u64").decode(t, r);
    const i = Ot(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new v(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = Ee(this, wn) - c.encodedLength;
    return r += d, [s, r] = c.decode(t, r), Wf(this.coders) ? on(this, js, Ru).call(this, o, r) : [{ [o]: s }, r];
  }
}, er = new WeakMap(), wn = new WeakMap(), Xs = new WeakSet(), Nu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ee(this, wn) - n.encodedLength);
  return se([Ee(this, er).encode(s), i, r]);
}, js = new WeakSet(), Ru = function(t, n) {
  return [t, n];
}, aA), ci = class extends Du {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength - 1)
      throw new v(D.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, K = class extends ie {
  constructor(t, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && t === "u8" ? 1 : 8;
    super("number", t, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    N(this, "length");
    N(this, "paddingLength");
    N(this, "baseType");
    N(this, "options");
    switch (this.baseType = t, t) {
      case "u8":
        this.length = 1;
        break;
      case "u16":
        this.length = 2;
        break;
      case "u32":
      default:
        this.length = 4;
        break;
    }
    this.paddingLength = r, this.options = n;
  }
  encode(t) {
    let n;
    try {
      n = Ht(t);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Ht(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Ot(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(D.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new v(D.DECODE_ERROR, "Invalid number byte data size.");
    return [Ot(r), n + 8];
  }
}, $f = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", nc);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new K("u8", { isSmallBytes: !0 }), r = new _("u64").encode(
      nc
    );
    return r.dynamicData = {
      0: St(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new _("u64").encode(e.length)), St(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new ft(
      new K("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, oo, Su, _u = class extends ie {
  constructor() {
    super("struct", "struct String", 1), Au(this, oo);
  }
  encode(e) {
    const t = [], n = new _("u64").encode(yt), r = uu(this, oo, Su).call(this, e);
    return n.dynamicData = {
      0: St([r])
    }, t.push(n), t.push(new _("u64").encode(r.byteLength)), t.push(new _("u64").encode(e.length)), St(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new _("u64").decode(n, 0)[0]).toNumber(), s = e.slice(yt, yt + r);
    if (s.length !== r)
      throw new v(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [ni(s), t + yt];
  }
};
oo = /* @__PURE__ */ new WeakSet();
Su = function(e) {
  const t = [ti(e)], n = (re - e.length % re) % re;
  return n && t.push(new Uint8Array(n)), se(t);
};
oi(_u, "memorySize", 1);
var tr, cA, Kf = (cA = class extends ie {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    N(this, "length");
    lt(this, tr, void 0);
    this.length = t, Ct(this, tr, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = ti(t), r = new Uint8Array(Ee(this, tr));
    return se([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new v(D.DECODE_ERROR, "Invalid string byte data size.");
    const s = ni(r), i = Ee(this, tr);
    return [s, n + this.length + i];
  }
}, tr = new WeakMap(), cA), Ai = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    N(this, "name");
    N(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof ci) && i == null)
        throw new v(
          D.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return _r(o.length) ? o : vu(o);
    });
    return St([St(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), _r(r) || (r += Qu(r)), i[o] = d, i;
    }, {}), r];
  }
}, ku = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    N(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return St(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return _r(s.length) ? s : vu(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), _r(r) || (r += Qu(r)), o;
    }), r];
  }
}, Mu = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + yt);
    N(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _("u64").encode(yt);
    return r.dynamicData = {
      0: St(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new _("u64").encode(t.length)), n.push(new _("u64").encode(t.length)), St(n);
  }
  decode(t, n) {
    if (t.length < yt || t.length > zo)
      throw new v(D.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new _("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(yt, yt + i);
    if (o.length !== i)
      throw new v(D.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      bu(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + yt
    ];
  }
}, tn = class {
  constructor(e, t) {
    N(this, "abi");
    N(this, "name");
    N(this, "type");
    N(this, "originalTypeArguments");
    N(this, "components");
    this.abi = e;
    const n = xt(
      e.types,
      (r) => r.typeId === t.type,
      () => {
        throw new v(
          D.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: t,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = t.name, this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = tn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? tn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new tn(e, o));
    const s = r.reduce(
      (o, c, d) => {
        var y;
        const f = { ...o };
        return f[c] = structuredClone(
          (y = t.typeArguments) == null ? void 0 : y[d]
        ), f;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new tn(e, o));
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
      const s = xt(e.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = xt(e.types, (o) => o.typeId === s.type);
      if (Lf.test(i.type)) {
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
    return $o.test(this.type) ? "s" : Rs.test(this.type) ? "a" : Ko.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Wo.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Rs.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new tn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function ks(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var On = (e, t) => {
  var d, f, y, p, b, F;
  switch (e.type) {
    case du:
    case lu:
    case hu:
      return new K(e.type, t);
    case fu:
    case pu:
      return new _("u64");
    case gu:
      return new _("u256");
    case mu:
      return new $f();
    case wu:
      return new qf(t);
    case Eu:
      return new G();
    case Iu:
      return new xu();
    case jo:
      return new _s();
    case qo:
      return new _u();
  }
  const n = (d = Wo.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new Kf(x);
  }
  const r = e.components, s = (f = Rs.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const x = parseInt(s.length, 10), C = r[0];
    if (!C)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = On(C, { isSmallBytes: !0 });
    return new ft(R, x);
  }
  if (e.type === Xo) {
    const x = (y = xt(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : y[0];
    if (!x)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const C = new tn(e.abi, x), R = On(C, { isSmallBytes: !0, encoding: Ss });
    return new Mu(R);
  }
  const i = (p = $o.exec(e.type)) == null ? void 0 : p.groups;
  if (i) {
    const x = ks(r, { isRightPadded: !0, getCoder: On });
    return new Ai(i.name, x);
  }
  const o = (b = Ko.exec(e.type)) == null ? void 0 : b.groups;
  if (o) {
    const x = ks(r, { getCoder: On });
    return e.type === Vo ? new ci(o.name, x) : new Du(o.name, x);
  }
  if ((F = Bu.exec(e.type)) == null ? void 0 : F.groups) {
    const x = r.map(
      (C) => On(C, { isRightPadded: !0, encoding: Ss })
    );
    return new ku(x);
  }
  throw e.type === yu ? new v(
    D.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new v(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, zf = class extends ie {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(D.ENCODE_ERROR, "Invalid boolean value.");
    return Ht(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid boolean data size.");
    const n = Q(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(Q(1)))
      throw new v(D.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, Ou = class extends ie {
  constructor() {
    super("struct", "struct Bytes", re);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const t = new Uint8Array(e), n = new _("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < re)
      throw new v(D.DECODE_ERROR, "Invalid byte data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
oi(Ou, "memorySize", 1);
var eg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), nr, rr, qs, Lu, Ws, Tu, AA, tg = (AA = class extends ie {
  constructor(t, n) {
    const r = new _("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    lt(this, qs);
    lt(this, Ws);
    N(this, "name");
    N(this, "coders");
    lt(this, nr, void 0);
    lt(this, rr, void 0);
    this.name = t, this.coders = n, Ct(this, nr, r), Ct(this, rr, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return on(this, qs, Lu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...Ee(this, nr).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < Ee(this, rr))
      throw new v(D.DECODE_ERROR, "Invalid enum data size.");
    const r = new _("u64").decode(t, n)[0], s = Ot(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + re, [d, f] = o.decode(t, c);
    return eg(this.coders) ? on(this, Ws, Tu).call(this, i, f) : [{ [i]: d }, f];
  }
}, nr = new WeakMap(), rr = new WeakMap(), qs = new WeakSet(), Lu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ee(this, rr) - n.encodedLength);
  return se([Ee(this, nr).encode(s), i, r]);
}, Ws = new WeakSet(), Tu = function(t, n) {
  return [t, n];
}, AA), ng = (e) => {
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
}, ao = class extends ie {
  constructor(t) {
    const n = ng(t);
    super("number", t, n);
    N(this, "length");
    N(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Ht(t);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Ht(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid number byte data size.");
    return [Ot(r), n + this.length];
  }
}, rg = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", re);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const n = new ft(new ao("u8"), e.length).encode(e), r = new _("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new ft(new ao("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, Pu = class extends ie {
  constructor() {
    super("struct", "struct String", re);
  }
  encode(e) {
    const t = ti(e), n = new _("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid std string data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [ni(i), n + s];
  }
};
oi(Pu, "memorySize", 1);
var sg = class extends ie {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(D.ENCODE_ERROR, "Value length mismatch during encode.");
    return ti(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string byte data size.");
    return [ni(n), t + this.encodedLength];
  }
}, ig = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    N(this, "name");
    N(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return Zr(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof ci) && s == null)
          throw new v(
            D.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, og = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    N(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return Zr(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, ag = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + re);
    N(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new _("u64").encode(t.length);
    return new Uint8Array([...r, ...Zr(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > zo)
      throw new v(D.DECODE_ERROR, "Invalid vec data size.");
    const r = n + re, s = t.slice(n, r), o = Q(new _("u64").decode(s, 0)[0]).toNumber() * this.coder.encodedLength, c = t.slice(r, r + o);
    if (c.length !== o)
      throw new v(D.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      bu(c, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, Ln = (e, t) => {
  var d, f, y, p, b, F;
  switch (e.type) {
    case du:
    case lu:
    case hu:
      return new ao(e.type);
    case fu:
    case pu:
      return new _("u64");
    case gu:
      return new _("u256");
    case mu:
      return new rg();
    case wu:
      return new zf();
    case Eu:
      return new G();
    case Iu:
      return new xu();
    case jo:
      return new Ou();
    case qo:
      return new Pu();
  }
  const n = (d = Wo.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new sg(x);
  }
  const r = e.components, s = (f = Rs.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const x = parseInt(s.length, 10), C = r[0];
    if (!C)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = Ln(C);
    return new ft(R, x);
  }
  if (e.type === Xo) {
    const x = (y = xt(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : y[0];
    if (!x)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const C = new tn(e.abi, x), R = Ln(C);
    return new ag(R);
  }
  const i = (p = $o.exec(e.type)) == null ? void 0 : p.groups;
  if (i) {
    const x = ks(r, { isRightPadded: !0, getCoder: Ln });
    return new ig(i.name, x);
  }
  const o = (b = Ko.exec(e.type)) == null ? void 0 : b.groups;
  if (o) {
    const x = ks(r, { getCoder: Ln });
    return e.type === Vo ? new ci(o.name, x) : new tg(o.name, x);
  }
  if ((F = Bu.exec(e.type)) == null ? void 0 : F.groups) {
    const x = r.map(
      (C) => Ln(C)
    );
    return new og(x);
  }
  throw e.type === yu ? new v(
    D.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new v(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function cg(e = Ss) {
  switch (e) {
    case Tf:
      return Ln;
    case Ss:
      return On;
    default:
      throw new v(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Gn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new tn(e, t);
    return cg(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, $s, Uu, Ks, Gu, zs, Hu, uA, ys = (uA = class {
  constructor(e, t) {
    lt(this, $s);
    lt(this, Ks);
    lt(this, zs);
    N(this, "signature");
    N(this, "selector");
    N(this, "name");
    N(this, "jsonFn");
    N(this, "attributes");
    N(this, "isInputDataPointer");
    N(this, "outputMetadata");
    N(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = xt(this.jsonAbi.functions, (n) => n.name === t), this.name = t, this.signature = ys.getSignature(this.jsonAbi, this.jsonFn), this.selector = ys.getFunctionSelector(this.signature), this.isInputDataPointer = on(this, $s, Uu).call(this), this.outputMetadata = {
      isHeapType: on(this, Ks, Gu).call(this),
      encodedLength: on(this, zs, Hu).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new tn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Bt(In(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    ys.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = this.jsonFn.inputs.filter(
      (c) => xt(this.jsonAbi.types, (d) => d.typeId === c.type).type !== "()"
    );
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (c) => Gn.getCoder(this.jsonAbi, c, {
        isRightPadded: r.length > 1
      })
    ), o = new ku(s).encode(n);
    return Cu(o, t, o.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => xt(n.types, (c) => c.typeId === o.type)), s = r.filter(
      (o) => o.type === Vo || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(D.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = J(e), n = this.jsonFn.inputs.filter(
      (s) => xt(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
        D.DECODE_ERROR,
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
        const o = Gn.getCoder(this.jsonAbi, i), [c, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (xt(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    ).type === "()")
      return [void 0, 0];
    const n = J(e);
    return Gn.getCoder(this.jsonAbi, this.jsonFn.output).decode(n, 0);
  }
}, $s = new WeakSet(), Uu = function() {
  var t;
  const e = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Xf(((t = e[0]) == null ? void 0 : t.type) || "");
}, Ks = new WeakSet(), Gu = function() {
  const e = xt(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);
  return jf((e == null ? void 0 : e.type) || "");
}, zs = new WeakSet(), Hu = function() {
  try {
    const e = Gn.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof Mu ? e.coder.encodedLength : e instanceof _s ? _s.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, uA), sn = class {
  constructor(e) {
    N(this, "functions");
    N(this, "configurables");
    N(this, "jsonAbi");
    this.jsonAbi = e, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new ys(this.jsonAbi, t.name)])
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
      D.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    const n = typeof e == "string" ? this.getFunction(e) : e;
    if (!n)
      throw new v(D.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    const r = typeof e == "string" ? this.getFunction(e) : e;
    if (!r)
      throw new v(D.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const { loggedType: n } = xt(this.jsonAbi.loggedTypes, (r) => r.logId === t);
    return Gn.decode(this.jsonAbi, n, J(e), 0, {
      encoding: this.jsonAbi.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = xt(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new v(
          D.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return Gn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return xt(
      this.jsonAbi.types,
      (t) => t.typeId === e,
      () => {
        throw new v(
          D.TYPE_NOT_FOUND,
          `Type with typeId '${e}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, yy = class {
}, Ag = class {
}, Ju = class {
}, Zu = class {
}, ug = class extends Zu {
}, dg = class extends Zu {
}, kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
var or = kr.bech32m = kr.bech32 = void 0;
const Ms = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Yu = {};
for (let e = 0; e < Ms.length; e++) {
  const t = Ms.charAt(e);
  Yu[t] = e;
}
function Xn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function rc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Xn(t) ^ r >> 5;
  }
  t = Xn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Xn(t) ^ r & 31;
  }
  return t;
}
function ta(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, c = [];
  for (let d = 0; d < e.length; ++d)
    for (s = s << t | e[d], i += t; i >= n; )
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
function lg(e) {
  return ta(e, 8, 5, !0);
}
function hg(e) {
  const t = ta(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function fg(e) {
  const t = ta(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function Vu(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let f = rc(o);
    if (typeof f == "string")
      throw new Error(f);
    let y = o + "1";
    for (let p = 0; p < c.length; ++p) {
      const b = c[p];
      if (b >> 5)
        throw new Error("Non 5-bit word");
      f = Xn(f) ^ b, y += Ms.charAt(b);
    }
    for (let p = 0; p < 6; ++p)
      f = Xn(f);
    f ^= t;
    for (let p = 0; p < 6; ++p) {
      const b = f >> (5 - p) * 5 & 31;
      y += Ms.charAt(b);
    }
    return y;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
      return "Exceeds length limit";
    const d = o.toLowerCase(), f = o.toUpperCase();
    if (o !== d && o !== f)
      return "Mixed-case string " + o;
    o = d;
    const y = o.lastIndexOf("1");
    if (y === -1)
      return "No separator character for " + o;
    if (y === 0)
      return "Missing prefix for " + o;
    const p = o.slice(0, y), b = o.slice(y + 1);
    if (b.length < 6)
      return "Data too short";
    let F = rc(p);
    if (typeof F == "string")
      return F;
    const x = [];
    for (let C = 0; C < b.length; ++C) {
      const R = b.charAt(C), S = Yu[R];
      if (S === void 0)
        return "Unknown character " + R;
      F = Xn(F) ^ S, !(C + 6 >= b.length) && x.push(S);
    }
    return F !== t ? "Invalid checksum for " + o : { prefix: p, words: x };
  }
  function s(o, c) {
    const d = r(o, c);
    if (typeof d == "object")
      return d;
  }
  function i(o, c) {
    const d = r(o, c);
    if (typeof d == "object")
      return d;
    throw new Error(d);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: lg,
    fromWordsUnsafe: hg,
    fromWords: fg
  };
}
kr.bech32 = Vu("bech32");
or = kr.bech32m = Vu("bech32m");
var Os = "fuel";
function na(e) {
  return or.decode(e);
}
function Bs(e) {
  return or.encode(
    Os,
    or.toWords(J(X(e)))
  );
}
function Cs(e) {
  return typeof e == "string" && e.indexOf(Os + 1) === 0 && na(e).prefix === Os;
}
function co(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function sc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Ao(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function ra(e) {
  return new Uint8Array(or.fromWords(na(e).words));
}
function ic(e) {
  if (!Cs(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return X(ra(e));
}
function gg(e) {
  const { words: t } = na(e);
  return or.encode(Os, t);
}
var vr = (e) => e instanceof Ju ? e.address : e instanceof ug ? e.id : e, pg = () => X(Bn(32)), mg = (e) => {
  let t;
  try {
    if (!co(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = ra(Bs(e)), t = X(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, wg = (e) => {
  if (!Ao(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, he = class extends Ag {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    N(this, "bech32Address");
    if (this.bech32Address = gg(t), !Cs(this.bech32Address))
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
    return ic(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return ra(this.bech32Address);
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
    const t = ic(this.bech32Address);
    return {
      value: mg(t)
    };
  }
  /**
   * Wraps the `bech32Address` property and returns as an `AssetId`.
   *
   * @returns The `bech32Address` property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      value: this.toB256()
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
    if (!sc(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = X(qr(J(t)));
    return new he(Bs(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!co(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new he(Bs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(pg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Cs(t) ? new he(t) : this.fromB256(t);
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
      return he.fromB256(t.toB256());
    if (sc(t))
      return he.fromPublicKey(t);
    if (Cs(t))
      return new he(t);
    if (co(t))
      return he.fromB256(t);
    if (Ao(t))
      return he.fromEvmAddress(t);
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
    if (!Ao(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = wg(t);
    return new he(Bs(n));
  }
}, Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", wt = Ne, By = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", En, dA, Ie = (dA = class extends ie {
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
    N(this, "length");
    lt(this, En, void 0);
    this.length = t, Ct(this, En, n);
  }
  encode(t) {
    const n = [], r = J(t);
    return n.push(r), Ee(this, En) && n.push(new Uint8Array(Ee(this, En))), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [X(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Ee(this, En) && ([r, s] = [null, s + Ee(this, En)]), [i, s];
  }
}, En = new WeakMap(), dA), ar = class extends Ai {
  constructor() {
    super("TxPointer", {
      blockHeight: new K("u32"),
      txIndex: new K("u16")
    });
  }
}, we = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(we || {}), oc = class extends ie {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new ar().encode(e.txPointer)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new K("u32").encode(e.maturity)), t.push(new _("u64").encode(e.predicateGasUsed)), t.push(new K("u32").encode(e.predicateLength)), t.push(new K("u32").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new K("u8").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new ar().decode(e, r);
    const f = n;
    [n, r] = new K("u8").decode(e, r);
    const y = Number(n);
    [n, r] = new K("u32").decode(e, r);
    const p = n;
    [n, r] = new _("u64").decode(e, r);
    const b = n;
    [n, r] = new K("u32").decode(e, r);
    const F = n;
    [n, r] = new K("u32").decode(e, r);
    const x = n;
    [n, r] = new Ie(F).decode(e, r);
    const C = n;
    return [n, r] = new Ie(x).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: d,
        txPointer: f,
        witnessIndex: y,
        maturity: p,
        predicateGasUsed: b,
        predicateLength: F,
        predicateDataLength: x,
        predicate: C,
        predicateData: n
      },
      r
    ];
  }
}, Ls = class extends ie {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new ar().encode(e.txPointer)), t.push(new G().encode(e.contractID)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new K("u8").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new ar().decode(e, r);
    const d = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: c,
        txPointer: d,
        contractID: n
      },
      r
    ];
  }
}, Mr = class extends ie {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _("u64").encode(e.amount)), t.push(J(e.data || "0x")), Bt(se(t));
  }
  static encodeData(e) {
    const t = J(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = Mr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new _("u64").encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new _("u64").encode(e.predicateGasUsed)), t.push(new K("u32").encode(n.length)), t.push(new K("u32").encode(e.predicateLength)), t.push(new K("u32").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  static decodeData(e) {
    const t = J(e), n = t.length, [r] = new Ie(n).decode(t, 0);
    return J(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new K("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new _("u64").decode(e, r);
    const f = n;
    [n, r] = new K("u32").decode(e, r);
    const y = n;
    [n, r] = new K("u32").decode(e, r);
    const p = n;
    [n, r] = new K("u32").decode(e, r);
    const b = n;
    [n, r] = new Ie(y).decode(e, r);
    const F = n;
    [n, r] = new Ie(p).decode(e, r);
    const x = n;
    return [n, r] = new Ie(b).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: c,
        predicateGasUsed: f,
        dataLength: y,
        predicateLength: p,
        predicateDataLength: b,
        data: F,
        predicate: x,
        predicateData: n
      },
      r
    ];
  }
}, Ts = class extends ie {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new oc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ls().encode(e));
        break;
      }
      case 2: {
        t.push(new Mr().encode(e));
        break;
      }
      default:
        throw new v(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new oc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ls().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Mr().decode(e, r), [n, r];
      default:
        throw new v(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Be || {}), ac = class extends ie {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
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
}, Ps = class extends ie {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new K("u8").encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
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
}, cc = class extends ie {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
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
}, Ac = class extends ie {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
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
}, uc = class extends ie {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.contractId)), t.push(new G().encode(e.stateRoot)), se(t);
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
}, Us = class extends ie {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new ac().encode(e));
        break;
      }
      case 1: {
        t.push(new Ps().encode(e));
        break;
      }
      case 2: {
        t.push(new cc().encode(e));
        break;
      }
      case 3: {
        t.push(new Ac().encode(e));
        break;
      }
      case 4: {
        t.push(new uc().encode(e));
        break;
      }
      default:
        throw new v(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ac().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ps().decode(e, r), [n, r];
      case 2:
        return [n, r] = new cc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ac().decode(e, r), [n, r];
      case 4:
        return [n, r] = new uc().decode(e, r), [n, r];
      default:
        throw new v(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Pt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Pt || {}), Eg = (e) => e.sort((t, n) => t.type - n.type);
function Ig(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new v(
        D.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var Gs = class extends ie {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Ig(e);
    const t = Eg(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new _("u64").encode(r));
          break;
        case 4:
          n.push(new K("u32").encode(r));
          break;
        default:
          throw new v(D.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), se(n);
  }
  decode(e, t, n) {
    let r = t;
    const s = [];
    if (n & 1) {
      const [i, o] = new _("u64").decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new _("u64").decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new K("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new _("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, Ae = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(Ae || {}), dc = class extends ie {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _("u64").encode(e.gas)), t.push(new _("u64").encode(e.param1)), t.push(new _("u64").encode(e.param2)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    [n, r] = new _("u64").decode(e, r);
    const f = n;
    [n, r] = new _("u64").decode(e, r);
    const y = n;
    [n, r] = new _("u64").decode(e, r);
    const p = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: d,
        param1: f,
        param2: y,
        pc: p,
        is: n
      },
      r
    ];
  }
}, lc = class extends ie {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _("u64").encode(e.val)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    return [n, r] = new _("u64").decode(e, r), [
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
}, hc = class extends ie {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _("u64").encode(e.ptr)), t.push(new _("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: c,
        pc: d,
        is: n
      },
      r
    ];
  }
}, fc = class extends ie {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _("u64").encode(e.reason)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), t.push(new G().encode(e.contractId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    return [n, r] = new G().decode(e, r), [
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
}, gc = class extends ie {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _("u64").encode(e.val)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    return [n, r] = new _("u64").decode(e, r), [
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
}, pc = class extends ie {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _("u64").encode(e.val0)), t.push(new _("u64").encode(e.val1)), t.push(new _("u64").encode(e.val2)), t.push(new _("u64").encode(e.val3)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    [n, r] = new _("u64").decode(e, r);
    const f = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: c,
        val3: d,
        pc: f,
        is: n
      },
      r
    ];
  }
}, mc = class extends ie {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _("u64").encode(e.val0)), t.push(new _("u64").encode(e.val1)), t.push(new _("u64").encode(e.ptr)), t.push(new _("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _("u64").decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const f = n;
    [n, r] = new _("u64").decode(e, r);
    const y = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: d,
        digest: f,
        pc: y,
        is: n
      },
      r
    ];
  }
}, wc = class extends ie {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Ec = class extends ie {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Ic = class extends ie {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _("u64").encode(e.result)), t.push(new _("u64").encode(e.gasUsed)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new _("u64").decode(e, r);
    const s = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, Hs = class extends ie {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _("u64").encode(e.amount)), t.push(J(e.data || "0x")), Bt(se(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new K("u16").encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new Ie(e.data.length).encode(e.data)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new K("u16").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const f = n;
    [n, r] = new Ie(d).decode(e, r);
    const y = J(n), p = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: f,
      data: y
    };
    return p.messageId = Hs.getMessageId(p), [p, r];
  }
}, Xu = (e, t) => {
  const n = J(e), r = J(t);
  return Bt(se([n, r]));
}, Or = class extends ie {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return Xu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new _("u64").encode(e.val)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n, f = Or.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: d,
      assetId: f
    }, r];
  }
}, uo = class extends ie {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return Xu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new _("u64").encode(e.val)), t.push(new _("u64").encode(e.pc)), t.push(new _("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _("u64").decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n, f = Or.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: d,
      assetId: f
    }, r];
  }
}, Cy = class extends ie {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new dc().encode(e));
        break;
      }
      case 1: {
        t.push(new lc().encode(e));
        break;
      }
      case 2: {
        t.push(new hc().encode(e));
        break;
      }
      case 3: {
        t.push(new fc().encode(e));
        break;
      }
      case 4: {
        t.push(new gc().encode(e));
        break;
      }
      case 5: {
        t.push(new pc().encode(e));
        break;
      }
      case 6: {
        t.push(new mc().encode(e));
        break;
      }
      case 7: {
        t.push(new wc().encode(e));
        break;
      }
      case 8: {
        t.push(new Ec().encode(e));
        break;
      }
      case 9: {
        t.push(new Ic().encode(e));
        break;
      }
      case 10: {
        t.push(new Hs().encode(e));
        break;
      }
      case 11: {
        t.push(new Or().encode(e));
        break;
      }
      case 12: {
        t.push(new uo().encode(e));
        break;
      }
      default:
        throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new dc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new lc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new hc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new fc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new gc().decode(e, r), [n, r];
      case 5:
        return [n, r] = new pc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new mc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new wc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Ec().decode(e, r), [n, r];
      case 9:
        return [n, r] = new Ic().decode(e, r), [n, r];
      case 10:
        return [n, r] = new Hs().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Or().decode(e, r), [n, r];
      case 12:
        return [n, r] = new uo().decode(e, r), [n, r];
      default:
        throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, yc = class extends Ai {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, Js = class extends ie {
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
    return t.push(new K("u32").encode(e.dataLength)), t.push(new Ie(e.dataLength).encode(e.data)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u32").decode(e, r);
    const s = n;
    return [n, r] = new Ie(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, It = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(It || {}), Bc = class extends ie {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _("u64").encode(e.scriptGasLimit)), t.push(new K("u32").encode(e.scriptLength)), t.push(new K("u32").encode(e.scriptDataLength)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new Ie(e.scriptLength).encode(e.script)), t.push(new Ie(e.scriptDataLength).encode(e.scriptData)), t.push(new Gs().encode(e.policies)), t.push(new ft(new Ts(), e.inputsCount).encode(e.inputs)), t.push(new ft(new Us(), e.outputsCount).encode(e.outputs)), t.push(new ft(new Js(), e.witnessesCount).encode(e.witnesses)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new _("u64").decode(e, r);
    const s = n;
    [n, r] = new K("u32").decode(e, r);
    const i = n;
    [n, r] = new K("u32").decode(e, r);
    const o = n;
    [n, r] = new K("u32").decode(e, r);
    const c = n;
    [n, r] = new K("u8").decode(e, r);
    const d = n;
    [n, r] = new K("u8").decode(e, r);
    const f = n;
    [n, r] = new K("u8").decode(e, r);
    const y = n;
    [n, r] = new G().decode(e, r);
    const p = n;
    [n, r] = new Ie(i).decode(e, r);
    const b = n;
    [n, r] = new Ie(o).decode(e, r);
    const F = n;
    [n, r] = new Gs().decode(e, r, c);
    const x = n;
    [n, r] = new ft(new Ts(), d).decode(e, r);
    const C = n;
    [n, r] = new ft(new Us(), f).decode(e, r);
    const R = n;
    return [n, r] = new ft(new Js(), y).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: c,
        inputsCount: d,
        outputsCount: f,
        witnessesCount: y,
        receiptsRoot: p,
        script: b,
        scriptData: F,
        policies: x,
        inputs: C,
        outputs: R,
        witnesses: n
      },
      r
    ];
  }
}, Cc = class extends ie {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new K("u32").encode(e.bytecodeLength)), t.push(new K("u8").encode(e.bytecodeWitnessIndex)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u16").encode(e.storageSlotsCount)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new Gs().encode(e.policies)), t.push(
      new ft(new yc(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new ft(new Ts(), e.inputsCount).encode(e.inputs)), t.push(new ft(new Us(), e.outputsCount).encode(e.outputs)), t.push(new ft(new Js(), e.witnessesCount).encode(e.witnesses)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u32").decode(e, r);
    const s = n;
    [n, r] = new K("u8").decode(e, r);
    const i = n;
    [n, r] = new K("u32").decode(e, r);
    const o = n;
    [n, r] = new K("u16").decode(e, r);
    const c = n;
    [n, r] = new K("u8").decode(e, r);
    const d = n;
    [n, r] = new K("u8").decode(e, r);
    const f = n;
    [n, r] = new K("u8").decode(e, r);
    const y = n;
    [n, r] = new G().decode(e, r);
    const p = n;
    [n, r] = new Gs().decode(e, r, o);
    const b = n;
    [n, r] = new ft(new yc(), c).decode(e, r);
    const F = n;
    [n, r] = new ft(new Ts(), d).decode(e, r);
    const x = n;
    [n, r] = new ft(new Us(), f).decode(e, r);
    const C = n;
    return [n, r] = new ft(new Js(), y).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: c,
        inputsCount: d,
        outputsCount: f,
        witnessesCount: y,
        salt: p,
        policies: b,
        storageSlots: F,
        inputs: x,
        outputs: C,
        witnesses: n
      },
      r
    ];
  }
}, bc = class extends ie {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ar().encode(e.txPointer)), t.push(new Ls().encode(e.inputContract)), t.push(new Ps().encode(e.outputContract)), t.push(new _("u64").encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ar().decode(e, r);
    const s = n;
    [n, r] = new Ls().decode(e, r);
    const i = n;
    [n, r] = new Ps().decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const c = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: c,
        mintAssetId: n
      },
      r
    ];
  }
}, Cn = class extends ie {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new Bc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Cc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new bc().encode(e));
        break;
      }
      default:
        throw new v(
          D.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Bc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Cc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new bc().decode(e, r), [n, r];
      default:
        throw new v(
          D.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, by = class extends Ai {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new K("u8")
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ju = BigInt(0), ui = BigInt(1), yg = BigInt(2);
function Wt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Bg = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function cr(e) {
  if (!Wt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Bg[e[n]];
  return t;
}
function qu(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function sa(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const $t = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Qc(e) {
  if (e >= $t._0 && e <= $t._9)
    return e - $t._0;
  if (e >= $t._A && e <= $t._F)
    return e - ($t._A - 10);
  if (e >= $t._a && e <= $t._f)
    return e - ($t._a - 10);
}
function Ar(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Qc(e.charCodeAt(i)), c = Qc(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Sn(e) {
  return sa(cr(e));
}
function ia(e) {
  if (!Wt(e))
    throw new Error("Uint8Array expected");
  return sa(cr(Uint8Array.from(e).reverse()));
}
function ur(e, t) {
  return Ar(e.toString(16).padStart(t * 2, "0"));
}
function oa(e, t) {
  return ur(e, t).reverse();
}
function Cg(e) {
  return Ar(qu(e));
}
function Ut(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Ar(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Wt(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Lr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!Wt(i))
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
function Wu(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function bg(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Qg(e) {
  let t;
  for (t = 0; e > ju; e >>= ui, t += 1)
    ;
  return t;
}
function vg(e, t) {
  return e >> BigInt(t) & ui;
}
const xg = (e, t, n) => e | (n ? ui : ju) << BigInt(t), aa = (e) => (yg << BigInt(e - 1)) - ui, Ji = (e) => new Uint8Array(e), vc = (e) => Uint8Array.from(e);
function $u(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Ji(e), s = Ji(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...p) => n(s, r, ...p), d = (p = Ji()) => {
    s = c(vc([0]), p), r = c(), p.length !== 0 && (s = c(vc([1]), p), r = c());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let p = 0;
    const b = [];
    for (; p < t; ) {
      r = c();
      const F = r.slice();
      b.push(F), p += r.length;
    }
    return Lr(...b);
  };
  return (p, b) => {
    o(), d(p);
    let F;
    for (; !(F = b(f())); )
      d();
    return o(), F;
  };
}
const Fg = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Wt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function $r(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = Fg[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const d = e[s];
    if (!(o && d === void 0) && !c(d, e))
      throw new Error(`Invalid param ${String(s)}=${d} (${typeof d}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const Dg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: vg,
  bitLen: Qg,
  bitMask: aa,
  bitSet: xg,
  bytesToHex: cr,
  bytesToNumberBE: Sn,
  bytesToNumberLE: ia,
  concatBytes: Lr,
  createHmacDrbg: $u,
  ensureBytes: Ut,
  equalBytes: Wu,
  hexToBytes: Ar,
  hexToNumber: sa,
  isBytes: Wt,
  numberToBytesBE: ur,
  numberToBytesLE: oa,
  numberToHexUnpadded: qu,
  numberToVarBytesBE: Cg,
  utf8ToBytes: bg,
  validateObject: $r
}, Symbol.toStringTag, { value: "Module" }));
var Zi = {}, lo = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ce < "u" && Ce, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var c = typeof i < "u" && i || typeof self < "u" && self || typeof c < "u" && c, d = {
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
      function f(A) {
        return A && DataView.prototype.isPrototypeOf(A);
      }
      if (d.arrayBuffer)
        var y = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], p = ArrayBuffer.isView || function(A) {
          return A && y.indexOf(Object.prototype.toString.call(A)) > -1;
        };
      function b(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function F(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function x(A) {
        var l = {
          next: function() {
            var m = A.shift();
            return { done: m === void 0, value: m };
          }
        };
        return d.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function C(A) {
        this.map = {}, A instanceof C ? A.forEach(function(l, m) {
          this.append(m, l);
        }, this) : Array.isArray(A) ? A.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : A && Object.getOwnPropertyNames(A).forEach(function(l) {
          this.append(l, A[l]);
        }, this);
      }
      C.prototype.append = function(A, l) {
        A = b(A), l = F(l);
        var m = this.map[A];
        this.map[A] = m ? m + ", " + l : l;
      }, C.prototype.delete = function(A) {
        delete this.map[b(A)];
      }, C.prototype.get = function(A) {
        return A = b(A), this.has(A) ? this.map[A] : null;
      }, C.prototype.has = function(A) {
        return this.map.hasOwnProperty(b(A));
      }, C.prototype.set = function(A, l) {
        this.map[b(A)] = F(l);
      }, C.prototype.forEach = function(A, l) {
        for (var m in this.map)
          this.map.hasOwnProperty(m) && A.call(l, this.map[m], m, this);
      }, C.prototype.keys = function() {
        var A = [];
        return this.forEach(function(l, m) {
          A.push(m);
        }), x(A);
      }, C.prototype.values = function() {
        var A = [];
        return this.forEach(function(l) {
          A.push(l);
        }), x(A);
      }, C.prototype.entries = function() {
        var A = [];
        return this.forEach(function(l, m) {
          A.push([m, l]);
        }), x(A);
      }, d.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
      function R(A) {
        if (A.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        A.bodyUsed = !0;
      }
      function S(A) {
        return new Promise(function(l, m) {
          A.onload = function() {
            l(A.result);
          }, A.onerror = function() {
            m(A.error);
          };
        });
      }
      function Z(A) {
        var l = new FileReader(), m = S(l);
        return l.readAsArrayBuffer(A), m;
      }
      function T(A) {
        var l = new FileReader(), m = S(l);
        return l.readAsText(A), m;
      }
      function j(A) {
        for (var l = new Uint8Array(A), m = new Array(l.length), h = 0; h < l.length; h++)
          m[h] = String.fromCharCode(l[h]);
        return m.join("");
      }
      function M(A) {
        if (A.slice)
          return A.slice(0);
        var l = new Uint8Array(A.byteLength);
        return l.set(new Uint8Array(A)), l.buffer;
      }
      function k() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && f(A) ? (this._bodyArrayBuffer = M(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || p(A)) ? this._bodyArrayBuffer = M(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var A = R(this);
          if (A)
            return A;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var A = R(this);
            return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(Z);
        }), this.text = function() {
          var A = R(this);
          if (A)
            return A;
          if (this._bodyBlob)
            return T(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(j(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, d.formData && (this.formData = function() {
          return this.text().then(U);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var O = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function P(A) {
        var l = A.toUpperCase();
        return O.indexOf(l) > -1 ? l : A;
      }
      function W(A, l) {
        if (!(this instanceof W))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var m = l.body;
        if (A instanceof W) {
          if (A.bodyUsed)
            throw new TypeError("Already read");
          this.url = A.url, this.credentials = A.credentials, l.headers || (this.headers = new C(A.headers)), this.method = A.method, this.mode = A.mode, this.signal = A.signal, !m && A._bodyInit != null && (m = A._bodyInit, A.bodyUsed = !0);
        } else
          this.url = String(A);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new C(l.headers)), this.method = P(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
          var h = /([?&])_=[^&]*/;
          if (h.test(this.url))
            this.url = this.url.replace(h, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var E = /\?/;
            this.url += (E.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      W.prototype.clone = function() {
        return new W(this, { body: this._bodyInit });
      };
      function U(A) {
        var l = new FormData();
        return A.trim().split("&").forEach(function(m) {
          if (m) {
            var h = m.split("="), E = h.shift().replace(/\+/g, " "), I = h.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(E), decodeURIComponent(I));
          }
        }), l;
      }
      function H(A) {
        var l = new C(), m = A.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(h) {
          return h.indexOf(`
`) === 0 ? h.substr(1, h.length) : h;
        }).forEach(function(h) {
          var E = h.split(":"), I = E.shift().trim();
          if (I) {
            var g = E.join(":").trim();
            l.append(I, g);
          }
        }), l;
      }
      k.call(W.prototype);
      function z(A, l) {
        if (!(this instanceof z))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new C(l.headers), this.url = l.url || "", this._initBody(A);
      }
      k.call(z.prototype), z.prototype.clone = function() {
        return new z(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new C(this.headers),
          url: this.url
        });
      }, z.error = function() {
        var A = new z(null, { status: 0, statusText: "" });
        return A.type = "error", A;
      };
      var B = [301, 302, 303, 307, 308];
      z.redirect = function(A, l) {
        if (B.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new z(null, { status: l, headers: { location: A } });
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
      function a(A, l) {
        return new Promise(function(m, h) {
          var E = new W(A, l);
          if (E.signal && E.signal.aborted)
            return h(new o.DOMException("Aborted", "AbortError"));
          var I = new XMLHttpRequest();
          function g() {
            I.abort();
          }
          I.onload = function() {
            var w = {
              status: I.status,
              statusText: I.statusText,
              headers: H(I.getAllResponseHeaders() || "")
            };
            w.url = "responseURL" in I ? I.responseURL : w.headers.get("X-Request-URL");
            var Y = "response" in I ? I.response : I.responseText;
            setTimeout(function() {
              m(new z(Y, w));
            }, 0);
          }, I.onerror = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, I.ontimeout = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, I.onabort = function() {
            setTimeout(function() {
              h(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function u(w) {
            try {
              return w === "" && c.location.href ? c.location.href : w;
            } catch {
              return w;
            }
          }
          I.open(E.method, u(E.url), !0), E.credentials === "include" ? I.withCredentials = !0 : E.credentials === "omit" && (I.withCredentials = !1), "responseType" in I && (d.blob ? I.responseType = "blob" : d.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (I.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(w) {
            I.setRequestHeader(w, F(l.headers[w]));
          }) : E.headers.forEach(function(w, Y) {
            I.setRequestHeader(Y, w);
          }), E.signal && (E.signal.addEventListener("abort", g), I.onreadystatechange = function() {
            I.readyState === 4 && E.signal.removeEventListener("abort", g);
          }), I.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = C, c.Request = W, c.Response = z), o.Headers = C, o.Request = W, o.Response = z, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(lo, lo.exports);
var Ng = lo.exports;
function Rg(e) {
  return typeof e == "object" && e !== null;
}
function Sg(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const _g = /\r\n|[\n\r]/g;
function ho(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(_g)) {
    if (typeof s.index == "number" || Sg(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function kg(e) {
  return Ku(
    e.source,
    ho(e.source, e.start)
  );
}
function Ku(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, d = t.column + c, f = `${e.name}:${o}:${d}
`, y = r.split(/\r\n|[\n\r]/g), p = y[s];
  if (p.length > 120) {
    const b = Math.floor(d / 80), F = d % 80, x = [];
    for (let C = 0; C < p.length; C += 80)
      x.push(p.slice(C, C + 80));
    return f + xc([
      [`${o} |`, x[0]],
      ...x.slice(1, b + 1).map((C) => ["|", C]),
      ["|", "^".padStart(F)],
      ["|", x[b + 1]]
    ]);
  }
  return f + xc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, y[s - 1]],
    [`${o} |`, p],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, y[s + 1]]
  ]);
}
function xc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function Mg(e) {
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
class ca extends Error {
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
    const { nodes: o, source: c, positions: d, path: f, originalError: y, extensions: p } = Mg(n);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = y ?? void 0, this.nodes = Fc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const b = Fc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((x) => x.loc).filter((x) => x != null)
    );
    this.source = c ?? (b == null || (s = b[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (b == null ? void 0 : b.map((x) => x.start)), this.locations = d && c ? d.map((x) => ho(c, x)) : b == null ? void 0 : b.map((x) => ho(x.source, x.start));
    const F = Rg(
      y == null ? void 0 : y.extensions
    ) ? y == null ? void 0 : y.extensions : void 0;
    this.extensions = (i = p ?? F) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), y != null && y.stack ? Object.defineProperty(this, "stack", {
      value: y.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, ca) : Object.defineProperty(this, "stack", {
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

` + kg(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Ku(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Fc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function gt(e, t, n) {
  return new ca(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Og {
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
class zu {
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
const ed = {
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
}, Lg = new Set(Object.keys(ed));
function Dc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Lg.has(t);
}
var Hn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Hn || (Hn = {}));
var fo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(fo || (fo = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function go(e) {
  return e === 9 || e === 32;
}
function Tr(e) {
  return e >= 48 && e <= 57;
}
function td(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function nd(e) {
  return td(e) || e === 95;
}
function Tg(e) {
  return td(e) || Tr(e) || e === 95;
}
function Pg(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], d = Ug(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Ug(e) {
  let t = 0;
  for (; t < e.length && go(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Gg(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((F) => F.length === 0 || go(F.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, d = e.endsWith("\\"), f = c || d, y = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || f || i || o);
  let p = "";
  const b = s && go(e.charCodeAt(0));
  return (y && !b || i) && (p += `
`), p += n, (y || f) && (p += `
`), '"""' + p + '"""';
}
var L;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(L || (L = {}));
class Hg {
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
    const n = new zu(L.SOF, 0, 0, 0, 0);
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
    if (t.kind !== L.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = Zg(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === L.COMMENT);
    return t;
  }
}
function Jg(e) {
  return e === L.BANG || e === L.DOLLAR || e === L.AMP || e === L.PAREN_L || e === L.PAREN_R || e === L.SPREAD || e === L.COLON || e === L.EQUALS || e === L.AT || e === L.BRACKET_L || e === L.BRACKET_R || e === L.BRACE_L || e === L.PIPE || e === L.BRACE_R;
}
function wr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function di(e, t) {
  return rd(e.charCodeAt(t)) && sd(e.charCodeAt(t + 1));
}
function rd(e) {
  return e >= 55296 && e <= 56319;
}
function sd(e) {
  return e >= 56320 && e <= 57343;
}
function kn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return L.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function ht(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new zu(t, n, r, i, o, s);
}
function Zg(e, t) {
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
        return Yg(e, s);
      case 33:
        return ht(e, L.BANG, s, s + 1);
      case 36:
        return ht(e, L.DOLLAR, s, s + 1);
      case 38:
        return ht(e, L.AMP, s, s + 1);
      case 40:
        return ht(e, L.PAREN_L, s, s + 1);
      case 41:
        return ht(e, L.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return ht(e, L.SPREAD, s, s + 3);
        break;
      case 58:
        return ht(e, L.COLON, s, s + 1);
      case 61:
        return ht(e, L.EQUALS, s, s + 1);
      case 64:
        return ht(e, L.AT, s, s + 1);
      case 91:
        return ht(e, L.BRACKET_L, s, s + 1);
      case 93:
        return ht(e, L.BRACKET_R, s, s + 1);
      case 123:
        return ht(e, L.BRACE_L, s, s + 1);
      case 124:
        return ht(e, L.PIPE, s, s + 1);
      case 125:
        return ht(e, L.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? $g(e, s) : Xg(e, s);
    }
    if (Tr(i) || i === 45)
      return Vg(e, s, i);
    if (nd(i))
      return Kg(e, s);
    throw gt(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : wr(i) || di(n, s) ? `Unexpected character: ${kn(e, s)}.` : `Invalid character: ${kn(e, s)}.`
    );
  }
  return ht(e, L.EOF, r, r);
}
function Yg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (wr(i))
      ++s;
    else if (di(n, s))
      s += 2;
    else
      break;
  }
  return ht(
    e,
    L.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function Vg(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Tr(i))
      throw gt(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${kn(
          e,
          s
        )}.`
      );
  } else
    s = Yi(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = Yi(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = Yi(e, s, i), i = r.charCodeAt(s)), i === 46 || nd(i))
    throw gt(
      e.source,
      s,
      `Invalid number, expected digit but got: ${kn(
        e,
        s
      )}.`
    );
  return ht(
    e,
    o ? L.FLOAT : L.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function Yi(e, t, n) {
  if (!Tr(n))
    throw gt(
      e.source,
      t,
      `Invalid number, expected digit but got: ${kn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Tr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function Xg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ht(e, L.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? jg(e, s) : qg(e, s) : Wg(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (wr(c))
      ++s;
    else if (di(n, s))
      s += 2;
    else
      throw gt(
        e.source,
        s,
        `Invalid character within String: ${kn(
          e,
          s
        )}.`
      );
  }
  throw gt(e.source, s, "Unterminated string.");
}
function jg(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !wr(r))
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
function qg(e, t) {
  const n = e.source.body, r = Nc(n, t + 2);
  if (wr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (rd(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Nc(n, t + 8);
    if (sd(s))
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
function Nc(e, t) {
  return xr(e.charCodeAt(t)) << 12 | xr(e.charCodeAt(t + 1)) << 8 | xr(e.charCodeAt(t + 2)) << 4 | xr(e.charCodeAt(t + 3));
}
function xr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Wg(e, t) {
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
function $g(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const f = n.charCodeAt(i);
    if (f === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const y = ht(
        e,
        L.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Pg(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, y;
    }
    if (f === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (f === 10 || f === 13) {
      c += n.slice(o, i), d.push(c), f === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (wr(f))
      ++i;
    else if (di(n, i))
      i += 2;
    else
      throw gt(
        e.source,
        i,
        `Invalid character within String: ${kn(
          e,
          i
        )}.`
      );
  }
  throw gt(e.source, i, "Unterminated string.");
}
function Kg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Tg(i))
      ++s;
    else
      break;
  }
  return ht(
    e,
    L.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function bs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const zg = 10, id = 2;
function od(e) {
  return li(e, []);
}
function li(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return ep(e, t);
    default:
      return String(e);
  }
}
function ep(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (tp(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : li(r, n);
  } else if (Array.isArray(e))
    return rp(e, n);
  return np(e, n);
}
function tp(e) {
  return typeof e.toJSON == "function";
}
function np(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > id ? "[" + sp(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + li(i, t)
  ).join(", ") + " }";
}
function rp(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > id)
    return "[Array]";
  const n = Math.min(zg, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(li(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function sp(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const ip = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class ad {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || bs(!1, `Body must be a string. Received: ${od(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || bs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || bs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function op(e) {
  return ip(e, ad);
}
function cd(e, t) {
  return new Kr(e, t).parseDocument();
}
function ap(e, t) {
  const n = new Kr(e, t);
  n.expectToken(L.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(L.EOF), r;
}
function cp(e, t) {
  const n = new Kr(e, t);
  n.expectToken(L.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(L.EOF), r;
}
function Ap(e, t) {
  const n = new Kr(e, t);
  n.expectToken(L.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(L.EOF), r;
}
class Kr {
  constructor(t, n = {}) {
    const r = op(t) ? t : new ad(t);
    this._lexer = new Hg(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(L.NAME);
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
        L.SOF,
        this.parseDefinition,
        L.EOF
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
    if (this.peek(L.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === L.NAME) {
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
    if (this.peek(L.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: Hn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(L.NAME) && (r = this.parseName()), this.node(t, {
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
    const t = this.expectToken(L.NAME);
    switch (t.value) {
      case "query":
        return Hn.QUERY;
      case "mutation":
        return Hn.MUTATION;
      case "subscription":
        return Hn.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      L.PAREN_L,
      this.parseVariableDefinition,
      L.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ae.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(L.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(L.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(L.DOLLAR), this.node(t, {
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
        L.BRACE_L,
        this.parseSelection,
        L.BRACE_R
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
    return this.peek(L.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(L.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ae.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(L.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(L.PAREN_L, n, L.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(L.COLON), this.node(n, {
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
    this.expectToken(L.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(L.NAME) ? this.node(t, {
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
      case L.BRACKET_L:
        return this.parseList(t);
      case L.BRACE_L:
        return this.parseObject(t);
      case L.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.INT,
          value: n.value
        });
      case L.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.FLOAT,
          value: n.value
        });
      case L.STRING:
      case L.BLOCK_STRING:
        return this.parseStringLiteral();
      case L.NAME:
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
      case L.DOLLAR:
        if (t)
          if (this.expectToken(L.DOLLAR), this._lexer.token.kind === L.NAME) {
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
      block: t.kind === L.BLOCK_STRING
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
      values: this.any(L.BRACKET_L, n, L.BRACKET_R)
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
      fields: this.any(L.BRACE_L, n, L.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(L.COLON), this.node(n, {
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
    for (; this.peek(L.AT); )
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
    return this.expectToken(L.AT), this.node(n, {
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
    if (this.expectOptionalToken(L.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(L.BRACKET_R), n = this.node(t, {
        kind: ae.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(L.BANG) ? this.node(t, {
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
    return this.peek(L.STRING) || this.peek(L.BLOCK_STRING);
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
      L.BRACE_L,
      this.parseOperationTypeDefinition,
      L.BRACE_R
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
    this.expectToken(L.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(L.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      L.BRACE_L,
      this.parseFieldDefinition,
      L.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(L.COLON);
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
      L.PAREN_L,
      this.parseInputValueDef,
      L.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(L.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(L.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(L.EQUALS) ? this.delimitedMany(L.PIPE, this.parseNamedType) : [];
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
      L.BRACE_L,
      this.parseEnumValueDefinition,
      L.BRACE_R
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
        `${us(
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
      L.BRACE_L,
      this.parseInputValueDef,
      L.BRACE_R
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
    if (t.kind === L.NAME)
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
      L.BRACE_L,
      this.parseOperationTypeDefinition,
      L.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(L.AT);
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
    return this.delimitedMany(L.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(fo, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Og(
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
      `Expected ${Ad(t)}, found ${us(n)}.`
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
    if (n.kind === L.NAME && n.value === t)
      this.advanceLexer();
    else
      throw gt(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${us(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === L.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return gt(
      this._lexer.source,
      n.start,
      `Unexpected ${us(n)}.`
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
    if (t !== void 0 && n.kind !== L.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw gt(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function us(e) {
  const t = e.value;
  return Ad(e.kind) + (t != null ? ` "${t}"` : "");
}
function Ad(e) {
  return Jg(e) ? `"${e}"` : e;
}
const up = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Kr,
  parse: cd,
  parseConstValue: cp,
  parseType: Ap,
  parseValue: ap
}, Symbol.toStringTag, { value: "Module" })), dp = /* @__PURE__ */ Ro(up);
function lp(e) {
  return `"${e.replace(hp, fp)}"`;
}
const hp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function fp(e) {
  return gp[e.charCodeAt(0)];
}
const gp = [
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
], pp = Object.freeze({});
function mp(e, t, n = ed) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ae))
    r.set(S, wp(t, S));
  let s, i = Array.isArray(e), o = [e], c = -1, d = [], f = e, y, p;
  const b = [], F = [];
  do {
    c++;
    const S = c === o.length, Z = S && d.length !== 0;
    if (S) {
      if (y = F.length === 0 ? void 0 : b[b.length - 1], f = p, p = F.pop(), Z)
        if (i) {
          f = f.slice();
          let j = 0;
          for (const [M, k] of d) {
            const O = M - j;
            k === null ? (f.splice(O, 1), j++) : f[O] = k;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [j, M] of d)
            f[j] = M;
        }
      c = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (p) {
      if (y = i ? c : o[c], f = p[y], f == null)
        continue;
      b.push(y);
    }
    let T;
    if (!Array.isArray(f)) {
      var x, C;
      Dc(f) || bs(!1, `Invalid AST Node: ${od(f)}.`);
      const j = S ? (x = r.get(f.kind)) === null || x === void 0 ? void 0 : x.leave : (C = r.get(f.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (T = j == null ? void 0 : j.call(t, f, y, p, b, F), T === pp)
        break;
      if (T === !1) {
        if (!S) {
          b.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([y, T]), !S))
        if (Dc(T))
          f = T;
        else {
          b.pop();
          continue;
        }
    }
    if (T === void 0 && Z && d.push([y, f]), S)
      b.pop();
    else {
      var R;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (R = n[f.kind]) !== null && R !== void 0 ? R : [], c = -1, d = [], p && F.push(p), p = f;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function wp(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function ud(e) {
  return mp(e, Ip);
}
const Ep = 80, Ip = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => ee(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = pe("(", ee(e.variableDefinitions, ", "), ")"), n = ee(
        [
          e.operation,
          ee([e.name, t]),
          ee(e.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + pe(" = ", n) + pe(" ", ee(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Tt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", ee(n, ", "), ")");
      return o.length > Ep && (o = i + pe(`(
`, Qs(ee(n, `
`)), `
)`)), ee([o, ee(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + pe(" ", ee(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => ee(
      [
        "...",
        pe("on ", e),
        ee(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${pe("(", ee(n, ", "), ")")} on ${t} ${pe("", ee(r, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? Gg(e) : lp(e)
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
    leave: ({ values: e }) => "[" + ee(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + ee(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + pe("(", ee(t, ", "), ")")
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
`) + ee(["schema", ee(t, " "), Tt(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + ee(["scalar", t, ee(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + ee(
      [
        "type",
        t,
        pe("implements ", ee(n, " & ")),
        ee(r, " "),
        Tt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Rc(n) ? pe(`(
`, Qs(ee(n, `
`)), `
)`) : pe("(", ee(n, ", "), ")")) + ": " + r + pe(" ", ee(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: s }) => pe("", e, `
`) + ee(
      [t + ": " + n, pe("= ", r), ee(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + ee(
      [
        "interface",
        t,
        pe("implements ", ee(n, " & ")),
        ee(r, " "),
        Tt(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => pe("", e, `
`) + ee(
      ["union", t, ee(n, " "), pe("= ", ee(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => pe("", e, `
`) + ee(["enum", t, ee(n, " "), Tt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + ee([t, ee(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + ee(["input", t, ee(n, " "), Tt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Rc(n) ? pe(`(
`, Qs(ee(n, `
`)), `
)`) : pe("(", ee(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + ee(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => ee(
      ["extend schema", ee(e, " "), Tt(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => ee(["extend scalar", e, ee(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => ee(
      [
        "extend type",
        e,
        pe("implements ", ee(t, " & ")),
        ee(n, " "),
        Tt(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => ee(
      [
        "extend interface",
        e,
        pe("implements ", ee(t, " & ")),
        ee(n, " "),
        Tt(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) => ee(
      [
        "extend union",
        e,
        ee(t, " "),
        pe("= ", ee(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => ee(["extend enum", e, ee(t, " "), Tt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => ee(["extend input", e, ee(t, " "), Tt(n)], " ")
  }
};
function ee(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Tt(e) {
  return pe(`{
`, Qs(ee(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Qs(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Rc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const yp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: ud
}, Symbol.toStringTag, { value: "Module" })), Bp = /* @__PURE__ */ Ro(yp);
var Aa = {}, hi = {}, dd = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Cp = dd, ld = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Cp;
}, bp = ld, Qp = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = bp);
  var s, i = /* @__PURE__ */ new Map();
  function o(y, p) {
    var b = i.get(p);
    b ? b.push.apply(b, y) : i.set(p, y);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(y, p) {
        return o(["" + c + p], y), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(y, p) {
        var b = e(y, "" + c + p, r);
        return b.files.forEach(o), b.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var f = e(t[d], "" + c + d, r);
        f.files.forEach(o), s[d] = f.clone;
      }
    } else
      s = t;
  }
  return {
    clone: s,
    files: i
  };
};
hi.ReactNativeFile = dd;
hi.extractFiles = Qp;
hi.isExtractableFile = ld;
var vp = typeof self == "object" ? self.FormData : window.FormData, zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.defaultJsonSerializer = void 0;
zr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var xp = Ce && Ce.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Aa, "__esModule", { value: !0 });
var hd = hi, Fp = xp(vp), Dp = zr, Np = function(e) {
  return hd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Rp(e, t, n, r) {
  r === void 0 && (r = Dp.defaultJsonSerializer);
  var s = hd.extractFiles({ query: e, variables: t, operationName: n }, "", Np), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(b, F, x) {
      return b.push({ query: F, variables: t ? t[x] : void 0 }), b;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? Fp.default : FormData, f = new d();
  f.append("operations", r.stringify(i));
  var y = {}, p = 0;
  return o.forEach(function(b) {
    y[++p] = b;
  }), f.append("map", r.stringify(y)), p = 0, o.forEach(function(b, F) {
    f.append("" + ++p, F);
  }), f;
}
Aa.default = Rp;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.parseBatchRequestsExtendedArgs = Ft.parseRawRequestExtendedArgs = Ft.parseRequestExtendedArgs = Ft.parseBatchRequestArgs = Ft.parseRawRequestArgs = Ft.parseRequestArgs = void 0;
function Sp(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Ft.parseRequestArgs = Sp;
function _p(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Ft.parseRawRequestArgs = _p;
function kp(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Ft.parseBatchRequestArgs = kp;
function Mp(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Ft.parseRequestExtendedArgs = Mp;
function Op(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Ft.parseRawRequestExtendedArgs = Op;
function Lp(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Ft.parseBatchRequestsExtendedArgs = Lp;
var es = {}, Tp = Ce && Ce.__extends || function() {
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
Object.defineProperty(es, "__esModule", { value: !0 });
es.ClientError = void 0;
var Pp = (
  /** @class */
  function(e) {
    Tp(t, e);
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
es.ClientError = Pp;
var Br = {}, Sc;
function Up() {
  if (Sc)
    return Br;
  Sc = 1;
  var e = Ce && Ce.__assign || function() {
    return e = Object.assign || function(M) {
      for (var k, O = 1, P = arguments.length; O < P; O++) {
        k = arguments[O];
        for (var W in k)
          Object.prototype.hasOwnProperty.call(k, W) && (M[W] = k[W]);
      }
      return M;
    }, e.apply(this, arguments);
  }, t = Ce && Ce.__awaiter || function(M, k, O, P) {
    function W(U) {
      return U instanceof O ? U : new O(function(H) {
        H(U);
      });
    }
    return new (O || (O = Promise))(function(U, H) {
      function z(A) {
        try {
          a(P.next(A));
        } catch (l) {
          H(l);
        }
      }
      function B(A) {
        try {
          a(P.throw(A));
        } catch (l) {
          H(l);
        }
      }
      function a(A) {
        A.done ? U(A.value) : W(A.value).then(z, B);
      }
      a((P = P.apply(M, k || [])).next());
    });
  }, n = Ce && Ce.__generator || function(M, k) {
    var O = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, W, U, H;
    return H = { next: z(0), throw: z(1), return: z(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function z(a) {
      return function(A) {
        return B([a, A]);
      };
    }
    function B(a) {
      if (P)
        throw new TypeError("Generator is already executing.");
      for (; O; )
        try {
          if (P = 1, W && (U = a[0] & 2 ? W.return : a[0] ? W.throw || ((U = W.return) && U.call(W), 0) : W.next) && !(U = U.call(W, a[1])).done)
            return U;
          switch (W = 0, U && (a = [a[0] & 2, U.value]), a[0]) {
            case 0:
            case 1:
              U = a;
              break;
            case 4:
              return O.label++, { value: a[1], done: !1 };
            case 5:
              O.label++, W = a[1], a = [0];
              continue;
            case 7:
              a = O.ops.pop(), O.trys.pop();
              continue;
            default:
              if (U = O.trys, !(U = U.length > 0 && U[U.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                O = 0;
                continue;
              }
              if (a[0] === 3 && (!U || a[1] > U[0] && a[1] < U[3])) {
                O.label = a[1];
                break;
              }
              if (a[0] === 6 && O.label < U[1]) {
                O.label = U[1], U = a;
                break;
              }
              if (U && O.label < U[2]) {
                O.label = U[2], O.ops.push(a);
                break;
              }
              U[2] && O.ops.pop(), O.trys.pop();
              continue;
          }
          a = k.call(M, O);
        } catch (A) {
          a = [6, A], W = 0;
        } finally {
          P = U = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Br, "__esModule", { value: !0 }), Br.GraphQLWebSocketClient = void 0;
  var r = es, s = fd(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", f = "subscribe", y = "next", p = "error", b = "complete", F = (
    /** @class */
    function() {
      function M(k, O, P) {
        this._type = k, this._payload = O, this._id = P;
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
          var k = { type: this.type };
          return this.id != null && this.id != null && (k.id = this.id), this.payload != null && this.payload != null && (k.payload = this.payload), JSON.stringify(k);
        },
        enumerable: !1,
        configurable: !0
      }), M.parse = function(k, O) {
        var P = JSON.parse(k), W = P.type, U = P.payload, H = P.id;
        return new M(W, O(U), H);
      }, M;
    }()
  ), x = (
    /** @class */
    function() {
      function M(k, O) {
        var P = this, W = O.onInit, U = O.onAcknowledged, H = O.onPing, z = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = k, k.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, A, l, m;
            return n(this, function(h) {
              switch (h.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = k).send, l = R, W ? [4, W()] : [3, 2];
                case 1:
                  return m = h.sent(), [3, 3];
                case 2:
                  m = null, h.label = 3;
                case 3:
                  return A.apply(a, [l.apply(void 0, [m]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, k.onclose = function(B) {
          P.socketState.acknowledged = !1, P.socketState.subscriptions = {};
        }, k.onerror = function(B) {
          console.error(B);
        }, k.onmessage = function(B) {
          try {
            var a = C(B.data);
            switch (a.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, U && U(a.payload));
                return;
              }
              case c: {
                H ? H(a.payload).then(function(E) {
                  return k.send(Z(E).text);
                }) : k.send(Z(null).text);
                return;
              }
              case d: {
                z && z(a.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || a.id === void 0 || a.id === null || !P.socketState.subscriptions[a.id])
              return;
            var A = P.socketState.subscriptions[a.id], l = A.query, m = A.variables, h = A.subscriber;
            switch (a.type) {
              case y: {
                !a.payload.errors && a.payload.data && h.next && h.next(a.payload.data), a.payload.errors && h.error && h.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: m }));
                return;
              }
              case p: {
                h.error && h.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: m }));
                return;
              }
              case b: {
                h.complete && h.complete(), delete P.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (E) {
            console.error(E), k.close(1006);
          }
          k.close(4400, "Unknown graphql-ws message.");
        };
      }
      return M.prototype.makeSubscribe = function(k, O, P, W) {
        var U = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: k, variables: P, subscriber: W }, this.socket.send(T(H, { query: k, operationName: O, variables: P }).text), function() {
          U.socket.send(j(H).text), delete U.socketState.subscriptions[H];
        };
      }, M.prototype.rawRequest = function(k, O) {
        var P = this;
        return new Promise(function(W, U) {
          var H;
          P.rawSubscribe(k, {
            next: function(z, B) {
              return H = { data: z, extensions: B };
            },
            error: U,
            complete: function() {
              return W(H);
            }
          }, O);
        });
      }, M.prototype.request = function(k, O) {
        var P = this;
        return new Promise(function(W, U) {
          var H;
          P.subscribe(k, {
            next: function(z) {
              return H = z;
            },
            error: U,
            complete: function() {
              return W(H);
            }
          }, O);
        });
      }, M.prototype.subscribe = function(k, O, P) {
        var W = s.resolveRequestDocument(k), U = W.query, H = W.operationName;
        return this.makeSubscribe(U, H, P, O);
      }, M.prototype.rawSubscribe = function(k, O, P) {
        return this.makeSubscribe(k, void 0, P, O);
      }, M.prototype.ping = function(k) {
        this.socket.send(S(k).text);
      }, M.prototype.close = function() {
        this.socket.close(1e3);
      }, M.PROTOCOL = "graphql-transport-ws", M;
    }()
  );
  Br.GraphQLWebSocketClient = x;
  function C(M, k) {
    k === void 0 && (k = function(P) {
      return P;
    });
    var O = F.parse(M, k);
    return O;
  }
  function R(M) {
    return new F(i, M);
  }
  function S(M) {
    return new F(c, M, void 0);
  }
  function Z(M) {
    return new F(d, M, void 0);
  }
  function T(M, k) {
    return new F(f, k, M);
  }
  function j(M) {
    return new F(b, void 0, M);
  }
  return Br;
}
var _c;
function fd() {
  return _c || (_c = 1, function(e) {
    var t = Ce && Ce.__assign || function() {
      return t = Object.assign || function(h) {
        for (var E, I = 1, g = arguments.length; I < g; I++) {
          E = arguments[I];
          for (var u in E)
            Object.prototype.hasOwnProperty.call(E, u) && (h[u] = E[u]);
        }
        return h;
      }, t.apply(this, arguments);
    }, n = Ce && Ce.__createBinding || (Object.create ? function(h, E, I, g) {
      g === void 0 && (g = I), Object.defineProperty(h, g, { enumerable: !0, get: function() {
        return E[I];
      } });
    } : function(h, E, I, g) {
      g === void 0 && (g = I), h[g] = E[I];
    }), r = Ce && Ce.__setModuleDefault || (Object.create ? function(h, E) {
      Object.defineProperty(h, "default", { enumerable: !0, value: E });
    } : function(h, E) {
      h.default = E;
    }), s = Ce && Ce.__importStar || function(h) {
      if (h && h.__esModule)
        return h;
      var E = {};
      if (h != null)
        for (var I in h)
          I !== "default" && Object.prototype.hasOwnProperty.call(h, I) && n(E, h, I);
      return r(E, h), E;
    }, i = Ce && Ce.__awaiter || function(h, E, I, g) {
      function u(w) {
        return w instanceof I ? w : new I(function(Y) {
          Y(w);
        });
      }
      return new (I || (I = Promise))(function(w, Y) {
        function V(te) {
          try {
            q(g.next(te));
          } catch (ne) {
            Y(ne);
          }
        }
        function $(te) {
          try {
            q(g.throw(te));
          } catch (ne) {
            Y(ne);
          }
        }
        function q(te) {
          te.done ? w(te.value) : u(te.value).then(V, $);
        }
        q((g = g.apply(h, E || [])).next());
      });
    }, o = Ce && Ce.__generator || function(h, E) {
      var I = { label: 0, sent: function() {
        if (w[0] & 1)
          throw w[1];
        return w[1];
      }, trys: [], ops: [] }, g, u, w, Y;
      return Y = { next: V(0), throw: V(1), return: V(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function V(q) {
        return function(te) {
          return $([q, te]);
        };
      }
      function $(q) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; I; )
          try {
            if (g = 1, u && (w = q[0] & 2 ? u.return : q[0] ? u.throw || ((w = u.return) && w.call(u), 0) : u.next) && !(w = w.call(u, q[1])).done)
              return w;
            switch (u = 0, w && (q = [q[0] & 2, w.value]), q[0]) {
              case 0:
              case 1:
                w = q;
                break;
              case 4:
                return I.label++, { value: q[1], done: !1 };
              case 5:
                I.label++, u = q[1], q = [0];
                continue;
              case 7:
                q = I.ops.pop(), I.trys.pop();
                continue;
              default:
                if (w = I.trys, !(w = w.length > 0 && w[w.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  I = 0;
                  continue;
                }
                if (q[0] === 3 && (!w || q[1] > w[0] && q[1] < w[3])) {
                  I.label = q[1];
                  break;
                }
                if (q[0] === 6 && I.label < w[1]) {
                  I.label = w[1], w = q;
                  break;
                }
                if (w && I.label < w[2]) {
                  I.label = w[2], I.ops.push(q);
                  break;
                }
                w[2] && I.ops.pop(), I.trys.pop();
                continue;
            }
            q = E.call(h, I);
          } catch (te) {
            q = [6, te], u = 0;
          } finally {
            g = w = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, c = Ce && Ce.__rest || function(h, E) {
      var I = {};
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && E.indexOf(g) < 0 && (I[g] = h[g]);
      if (h != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(h); u < g.length; u++)
          E.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(h, g[u]) && (I[g[u]] = h[g[u]]);
      return I;
    }, d = Ce && Ce.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(Ng), y = f, p = dp, b = Bp, F = d(Aa), x = zr, C = Ft, R = es;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return R.ClientError;
    } });
    var S = function(h) {
      var E = {};
      return h && (typeof Headers < "u" && h instanceof Headers || y && y.Headers && h instanceof y.Headers ? E = l(h) : Array.isArray(h) ? h.forEach(function(I) {
        var g = I[0], u = I[1];
        E[g] = u;
      }) : E = h), E;
    }, Z = function(h) {
      return h.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, T = function(h) {
      var E = h.query, I = h.variables, g = h.operationName, u = h.jsonSerializer;
      if (!Array.isArray(E)) {
        var w = ["query=" + encodeURIComponent(Z(E))];
        return I && w.push("variables=" + encodeURIComponent(u.stringify(I))), g && w.push("operationName=" + encodeURIComponent(g)), w.join("&");
      }
      if (typeof I < "u" && !Array.isArray(I))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = E.reduce(function(V, $, q) {
        return V.push({
          query: Z($),
          variables: I ? u.stringify(I[q]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Y));
    }, j = function(h) {
      var E = h.url, I = h.query, g = h.variables, u = h.operationName, w = h.headers, Y = h.fetch, V = h.fetchOptions, $ = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return q = F.default(I, g, u, V.jsonSerializer), te = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), w), body: q }, V), $ ? [4, Promise.resolve($(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, Y(E, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, M = function(h) {
      var E = h.url, I = h.query, g = h.variables, u = h.operationName, w = h.headers, Y = h.fetch, V = h.fetchOptions, $ = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return q = T({
                query: I,
                variables: g,
                operationName: u,
                jsonSerializer: V.jsonSerializer
              }), te = t({ method: "GET", headers: w }, V), $ ? [4, Promise.resolve($(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, Y(E + "?" + q, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, k = (
      /** @class */
      function() {
        function h(E, I) {
          I === void 0 && (I = {}), this.url = E, this.options = I;
        }
        return h.prototype.rawRequest = function(E, I, g) {
          return i(this, void 0, void 0, function() {
            var u, w, Y, V, $, q, te, ne, Re, fe, oe, xe;
            return o(this, function(de) {
              return u = C.parseRawRequestArgs(E, I, g), w = this.options, Y = w.headers, V = w.fetch, $ = V === void 0 ? f.default : V, q = w.method, te = q === void 0 ? "POST" : q, ne = w.requestMiddleware, Re = w.responseMiddleware, fe = c(w, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (fe.signal = u.signal), xe = B(u.query).operationName, [2, O({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, S(a(Y))), S(u.requestHeaders)),
                operationName: xe,
                fetch: $,
                method: te,
                fetchOptions: fe,
                middleware: ne
              }).then(function(ge) {
                return Re && Re(ge), ge;
              }).catch(function(ge) {
                throw Re && Re(ge), ge;
              })];
            });
          });
        }, h.prototype.request = function(E) {
          for (var I = [], g = 1; g < arguments.length; g++)
            I[g - 1] = arguments[g];
          var u = I[0], w = I[1], Y = C.parseRequestArgs(E, u, w), V = this.options, $ = V.headers, q = V.fetch, te = q === void 0 ? f.default : q, ne = V.method, Re = ne === void 0 ? "POST" : ne, fe = V.requestMiddleware, oe = V.responseMiddleware, xe = c(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), de = this.url;
          Y.signal !== void 0 && (xe.signal = Y.signal);
          var ge = B(Y.document), Zt = ge.query, Fe = ge.operationName;
          return O({
            url: de,
            query: Zt,
            variables: Y.variables,
            headers: t(t({}, S(a($))), S(Y.requestHeaders)),
            operationName: Fe,
            fetch: te,
            method: Re,
            fetchOptions: xe,
            middleware: fe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, h.prototype.batchRequests = function(E, I) {
          var g = C.parseBatchRequestArgs(E, I), u = this.options, w = u.headers, Y = u.fetch, V = Y === void 0 ? f.default : Y, $ = u.method, q = $ === void 0 ? "POST" : $, te = u.requestMiddleware, ne = u.responseMiddleware, Re = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Re.signal = g.signal);
          var oe = g.documents.map(function(de) {
            var ge = de.document;
            return B(ge).query;
          }), xe = g.documents.map(function(de) {
            var ge = de.variables;
            return ge;
          });
          return O({
            url: fe,
            query: oe,
            variables: xe,
            headers: t(t({}, S(a(w))), S(g.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: q,
            fetchOptions: Re,
            middleware: te
          }).then(function(de) {
            return ne && ne(de), de.data;
          }).catch(function(de) {
            throw ne && ne(de), de;
          });
        }, h.prototype.setHeaders = function(E) {
          return this.options.headers = E, this;
        }, h.prototype.setHeader = function(E, I) {
          var g, u = this.options.headers;
          return u ? u[E] = I : this.options.headers = (g = {}, g[E] = I, g), this;
        }, h.prototype.setEndpoint = function(E) {
          return this.url = E, this;
        }, h;
      }()
    );
    e.GraphQLClient = k;
    function O(h) {
      var E = h.url, I = h.query, g = h.variables, u = h.headers, w = h.operationName, Y = h.fetch, V = h.method, $ = V === void 0 ? "POST" : V, q = h.fetchOptions, te = h.middleware;
      return i(this, void 0, void 0, function() {
        var ne, Re, fe, oe, xe, de, ge, Zt, Fe, ye, Er;
        return o(this, function(Se) {
          switch (Se.label) {
            case 0:
              return ne = $.toUpperCase() === "POST" ? j : M, Re = Array.isArray(I), [4, ne({
                url: E,
                query: I,
                variables: g,
                operationName: w,
                headers: u,
                fetch: Y,
                fetchOptions: q,
                middleware: te
              })];
            case 1:
              return fe = Se.sent(), [4, H(fe, q.jsonSerializer)];
            case 2:
              if (oe = Se.sent(), xe = Re && Array.isArray(oe) ? !oe.some(function(Me) {
                var rs = Me.data;
                return !rs;
              }) : !!oe.data, de = !oe.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", fe.ok && de && xe)
                return ge = fe.headers, Zt = fe.status, oe.errors, Fe = c(oe, ["errors"]), ye = q.errorPolicy === "ignore" ? Fe : oe, [2, t(t({}, Re ? { data: ye } : ye), { headers: ge, status: Zt })];
              throw Er = typeof oe == "string" ? { error: oe } : oe, new R.ClientError(t(t({}, Er), { status: fe.status, headers: fe.headers }), { query: I, variables: g });
          }
        });
      });
    }
    function P(h, E, I, g) {
      return i(this, void 0, void 0, function() {
        var u, w;
        return o(this, function(Y) {
          return u = C.parseRawRequestExtendedArgs(h, E, I, g), w = new k(u.url), [2, w.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function W(h, E) {
      for (var I = [], g = 2; g < arguments.length; g++)
        I[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, w, Y, V;
        return o(this, function($) {
          return u = I[0], w = I[1], Y = C.parseRequestExtendedArgs(h, E, u, w), V = new k(Y.url), [2, V.request(t({}, Y))];
        });
      });
    }
    e.request = W;
    function U(h, E, I) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(w) {
          return g = C.parseBatchRequestsExtendedArgs(h, E, I), u = new k(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = U, e.default = W;
    function H(h, E) {
      return E === void 0 && (E = x.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var I, g, u;
        return o(this, function(w) {
          switch (w.label) {
            case 0:
              return h.headers.forEach(function(Y, V) {
                V.toLowerCase() === "content-type" && (I = Y);
              }), I && I.toLowerCase().startsWith("application/json") ? (u = (g = E).parse, [4, h.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [w.sent()])];
            case 2:
              return [2, h.text()];
          }
        });
      });
    }
    function z(h) {
      var E, I = void 0, g = h.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (I = (E = g[0].name) === null || E === void 0 ? void 0 : E.value), I;
    }
    function B(h) {
      if (typeof h == "string") {
        var E = void 0;
        try {
          var I = p.parse(h);
          E = z(I);
        } catch {
        }
        return { query: h, operationName: E };
      }
      var g = z(h);
      return { query: b.print(h), operationName: g };
    }
    e.resolveRequestDocument = B;
    function a(h) {
      return typeof h == "function" ? h() : h;
    }
    function A(h) {
      for (var E = [], I = 1; I < arguments.length; I++)
        E[I - 1] = arguments[I];
      return h.reduce(function(g, u, w) {
        return "" + g + u + (w in E ? E[w] : "");
      }, "");
    }
    e.gql = A;
    function l(h) {
      var E = {};
      return h.forEach(function(I, g) {
        E[g] = I;
      }), E;
    }
    var m = Up();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(Zi)), Zi;
}
var Gp = fd();
function Hp(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function gd(e) {
  return function t(n) {
    return arguments.length === 0 || Hp(n) ? t : e.apply(this, arguments);
  };
}
var Jp = /* @__PURE__ */ gd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Zp(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function pd(e, t, n) {
  if (n || (n = new Vp()), Yp(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? pd(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Jp(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Zp(e);
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
function Yp(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Vp = /* @__PURE__ */ function() {
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
}(), Xp = /* @__PURE__ */ gd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : pd(t, !0);
});
const Pr = Xp;
var Zs = function() {
  return Zs = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Zs.apply(this, arguments);
};
var vs = /* @__PURE__ */ new Map(), po = /* @__PURE__ */ new Map(), md = !0, Ys = !1;
function wd(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function jp(e) {
  return wd(e.source.body.substring(e.start, e.end));
}
function qp(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = jp(r.loc), o = po.get(s);
      o && !o.has(i) ? md && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || po.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Zs(Zs({}, e), { definitions: n });
}
function Wp(e) {
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
function $p(e) {
  var t = wd(e);
  if (!vs.has(t)) {
    var n = cd(e, {
      experimentalFragmentVariables: Ys,
      allowLegacyFragmentVariables: Ys
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    vs.set(t, Wp(qp(n)));
  }
  return vs.get(t);
}
function dr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), $p(r);
}
function Kp() {
  vs.clear(), po.clear();
}
function zp() {
  md = !1;
}
function em() {
  Ys = !0;
}
function tm() {
  Ys = !1;
}
var Cr = {
  gql: dr,
  resetCaches: Kp,
  disableFragmentWarnings: zp,
  enableExperimentalFragmentVariables: em,
  disableExperimentalFragmentVariables: tm
};
(function(e) {
  e.gql = Cr.gql, e.resetCaches = Cr.resetCaches, e.disableFragmentWarnings = Cr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Cr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Cr.disableExperimentalFragmentVariables;
})(dr || (dr = {}));
dr.default = dr;
const ce = dr;
var Qy = 16 * 1024, vy = 16, xy = 1024 * 1024 * 1024, Fy = 1024 * 1024 * 1024, Dy = 255, Ny = 1024 * 1024, Ry = 1024 * 1024, nm = "0xffffffffffff0000", Ed = "0xffffffffffff0001", rm = "0xffffffffffff0003", sm = "0xffffffffffff0004", im = "0xffffffffffff0005", Sy = "0x0", om = [
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
], am = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let le;
const Id = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Id.decode();
let Fr = null;
function yd() {
  return (Fr === null || Fr.byteLength === 0) && (Fr = new Uint8Array(le.memory.buffer)), Fr;
}
function cm(e, t) {
  return e = e >>> 0, Id.decode(yd().subarray(e, e + t));
}
function Bd(e) {
  const t = le.ret(e);
  return Lt.__wrap(t);
}
function Am(e, t) {
  const n = le.retd(e, t);
  return Lt.__wrap(n);
}
function kc(e, t, n, r) {
  const s = le.call(e, t, n, r);
  return Lt.__wrap(s);
}
function um(e, t, n) {
  const r = le.tr(e, t, n);
  return Lt.__wrap(r);
}
function Mc(e, t, n) {
  const r = le.addi(e, t, n);
  return Lt.__wrap(r);
}
function dm(e, t, n) {
  const r = le.muli(e, t, n);
  return Lt.__wrap(r);
}
function Dr(e, t, n) {
  const r = le.lw(e, t, n);
  return Lt.__wrap(r);
}
function lm(e, t, n) {
  const r = le.gtf(e, t, n);
  return Lt.__wrap(r);
}
function ds(e, t) {
  const n = le.movi(e, t);
  return Lt.__wrap(n);
}
let Nr = null;
function Oc() {
  return (Nr === null || Nr.byteLength === 0) && (Nr = new Int32Array(le.memory.buffer)), Nr;
}
function hm(e, t) {
  return e = e >>> 0, yd().subarray(e / 1, e / 1 + t);
}
const fm = Object.freeze({
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
  *r" Set `$rA` to `tx.bytecodeLength`
  */
  CreateBytecodeLength: 256,
  256: "CreateBytecodeLength",
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
  *r" Set `$rA` to `tx.inputs[$rB].maturity`
  */
  InputCoinMaturity: 520,
  520: "InputCoinMaturity",
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
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].balanceRoot`
  */
  InputContractBalanceRoot: 546,
  546: "InputContractBalanceRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].stateRoot`
  */
  InputContractStateRoot: 547,
  547: "InputContractStateRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
  */
  InputContractTxPointer: 548,
  548: "InputContractTxPointer",
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
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].balanceRoot`
  */
  OutputContractBalanceRoot: 773,
  773: "OutputContractBalanceRoot",
  /**
  *r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
  */
  OutputContractStateRoot: 774,
  774: "OutputContractStateRoot",
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
  PolicyGasPrice: 1281,
  1281: "PolicyGasPrice",
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
class Lt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Lt.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    le.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = le.__wbindgen_add_to_stack_pointer(-16);
      le.instruction_to_bytes(s, this.__wbg_ptr);
      var t = Oc()[s / 4 + 0], n = Oc()[s / 4 + 1], r = hm(t, n).slice();
      return le.__wbindgen_free(t, n * 1, 1), r;
    } finally {
      le.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return le.instruction_size() >>> 0;
  }
}
class _e {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(_e.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    le.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = le.regid_new_checked(t);
    return n === 0 ? void 0 : _e.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = le.regid_bal();
    return _e.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = le.regid_cgas();
    return _e.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = le.regid_err();
    return _e.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = le.regid_flag();
    return _e.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = le.regid_fp();
    return _e.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = le.regid_ggas();
    return _e.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = le.regid_hp();
    return _e.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = le.regid_is();
    return _e.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = le.regid_of();
    return _e.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = le.regid_one();
    return _e.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = le.regid_pc();
    return _e.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = le.regid_ret();
    return _e.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = le.regid_retl();
    return _e.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = le.regid_sp();
    return _e.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = le.regid_spp();
    return _e.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = le.regid_writable();
    return _e.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = le.regid_zero();
    return _e.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = le.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return le.regid_to_u8(t);
  }
}
async function gm(e, t) {
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
function pm() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(cm(t, n));
  }, e;
}
function mm(e, t) {
  return le = e.exports, Cd.__wbindgen_wasm_module = t, Nr = null, Fr = null, le;
}
async function Cd(e) {
  if (le !== void 0)
    return le;
  const t = pm(), { instance: n, module: r } = await gm(await e, t);
  return mm(n, r);
}
function wm(e, t, n, r) {
  function s(p, b, F) {
    var x = F ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = F ? WebAssembly.compileStreaming : WebAssembly.compile;
    return b ? x(p, b) : C(p);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var c = globalThis.atob(n), d = c.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var f = 0; f < d; f++)
      i[f] = c.charCodeAt(f);
  }
  if (e) {
    var y = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(y, r) : y;
  } else
    return s(i, r, !1);
}
function Em(e) {
  return wm(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function ua() {
  return await Cd(Em());
}
ua();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pt = BigInt(0), Le = BigInt(1), Dn = BigInt(2), Im = BigInt(3), mo = BigInt(4), Lc = BigInt(5), Tc = BigInt(8);
BigInt(9);
BigInt(16);
function Qt(e, t) {
  const n = e % t;
  return n >= pt ? n : t + n;
}
function ym(e, t, n) {
  if (n <= pt || t < pt)
    throw new Error("Expected power/modulo > 0");
  if (n === Le)
    return pt;
  let r = Le;
  for (; t > pt; )
    t & Le && (r = r * e % n), e = e * e % n, t >>= Le;
  return r;
}
function _t(e, t, n) {
  let r = e;
  for (; t-- > pt; )
    r *= r, r %= n;
  return r;
}
function wo(e, t) {
  if (e === pt || t <= pt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Qt(e, t), r = t, s = pt, i = Le;
  for (; n !== pt; ) {
    const c = r / n, d = r % n, f = s - i * c;
    r = n, n = d, s = i, i = f;
  }
  if (r !== Le)
    throw new Error("invert: does not exist");
  return Qt(s, t);
}
function Bm(e) {
  const t = (e - Le) / Dn;
  let n, r, s;
  for (n = e - Le, r = 0; n % Dn === pt; n /= Dn, r++)
    ;
  for (s = Dn; s < e && ym(s, t, e) !== e - Le; s++)
    ;
  if (r === 1) {
    const o = (e + Le) / mo;
    return function(d, f) {
      const y = d.pow(f, o);
      if (!d.eql(d.sqr(y), f))
        throw new Error("Cannot find square root");
      return y;
    };
  }
  const i = (n + Le) / Dn;
  return function(c, d) {
    if (c.pow(d, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let f = r, y = c.pow(c.mul(c.ONE, s), n), p = c.pow(d, i), b = c.pow(d, n);
    for (; !c.eql(b, c.ONE); ) {
      if (c.eql(b, c.ZERO))
        return c.ZERO;
      let F = 1;
      for (let C = c.sqr(b); F < f && !c.eql(C, c.ONE); F++)
        C = c.sqr(C);
      const x = c.pow(y, Le << BigInt(f - F - 1));
      y = c.sqr(x), p = c.mul(p, x), b = c.mul(b, y), f = F;
    }
    return p;
  };
}
function Cm(e) {
  if (e % mo === Im) {
    const t = (e + Le) / mo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % Tc === Lc) {
    const t = (e - Lc) / Tc;
    return function(r, s) {
      const i = r.mul(s, Dn), o = r.pow(i, t), c = r.mul(s, o), d = r.mul(r.mul(c, Dn), o), f = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return Bm(e);
}
const bm = [
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
function Qm(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = bm.reduce((r, s) => (r[s] = "function", r), t);
  return $r(e, n);
}
function vm(e, t, n) {
  if (n < pt)
    throw new Error("Expected power > 0");
  if (n === pt)
    return e.ONE;
  if (n === Le)
    return t;
  let r = e.ONE, s = t;
  for (; n > pt; )
    n & Le && (r = e.mul(r, s)), s = e.sqr(s), n >>= Le;
  return r;
}
function xm(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function bd(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Fm(e, t, n = !1, r = {}) {
  if (e <= pt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = bd(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Cm(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: aa(s),
    ZERO: pt,
    ONE: Le,
    create: (d) => Qt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return pt <= d && d < e;
    },
    is0: (d) => d === pt,
    isOdd: (d) => (d & Le) === Le,
    neg: (d) => Qt(-d, e),
    eql: (d, f) => d === f,
    sqr: (d) => Qt(d * d, e),
    add: (d, f) => Qt(d + f, e),
    sub: (d, f) => Qt(d - f, e),
    mul: (d, f) => Qt(d * f, e),
    pow: (d, f) => vm(c, d, f),
    div: (d, f) => Qt(d * wo(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, f) => d + f,
    subN: (d, f) => d - f,
    mulN: (d, f) => d * f,
    inv: (d) => wo(d, e),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => xm(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, f, y) => y ? f : d,
    toBytes: (d) => n ? oa(d, i) : ur(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? ia(d) : Sn(d);
    }
  });
  return Object.freeze(c);
}
function Qd(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function vd(e) {
  const t = Qd(e);
  return t + Math.ceil(t / 2);
}
function Dm(e, t, n = !1) {
  const r = e.length, s = Qd(t), i = vd(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Sn(e) : ia(e), c = Qt(o, t - Le) + Le;
  return n ? oa(c, s) : ur(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Nm = BigInt(0), Vi = BigInt(1);
function Rm(e, t) {
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
      for (; i > Nm; )
        i & Vi && (o = o.add(c)), c = c.double(), i >>= Vi;
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
      const { windows: o, windowSize: c } = r(i), d = [];
      let f = s, y = f;
      for (let p = 0; p < o; p++) {
        y = f, d.push(y);
        for (let b = 1; b < c; b++)
          y = y.add(f), d.push(y);
        f = y.double();
      }
      return d;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: c, windowSize: d } = r(s);
      let f = e.ZERO, y = e.BASE;
      const p = BigInt(2 ** s - 1), b = 2 ** s, F = BigInt(s);
      for (let x = 0; x < c; x++) {
        const C = x * d;
        let R = Number(o & p);
        o >>= F, R > d && (R -= b, o += Vi);
        const S = C, Z = C + Math.abs(R) - 1, T = x % 2 !== 0, j = R < 0;
        R === 0 ? y = y.add(n(T, i[S])) : f = f.add(n(j, i[Z]));
      }
      return { p: f, f: y };
    },
    wNAFCached(s, i, o, c) {
      const d = s._WINDOW_SIZE || 1;
      let f = i.get(s);
      return f || (f = this.precomputeWindow(s, d), d !== 1 && i.set(s, c(f))), this.wNAF(d, f, o);
    }
  };
}
function xd(e) {
  return Qm(e.Fp), $r(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...bd(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Sm(e) {
  const t = xd(e);
  $r(t, {
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
const { bytesToNumberBE: _m, hexToBytes: km } = Dg, Rn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Rn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: _m(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Rn, n = typeof e == "string" ? km(e) : e;
    if (!Wt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Rn._parseInt(n.subarray(2)), { d: o, l: c } = Rn._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (f) => Number.parseInt(f[0], 16) & 8 ? "00" + f : f, n = (f) => {
      const y = f.toString(16);
      return y.length & 1 ? `0${y}` : y;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${c}${r}`;
  }
}, nn = BigInt(0), kt = BigInt(1);
BigInt(2);
const Pc = BigInt(3);
BigInt(4);
function Mm(e) {
  const t = Sm(e), { Fp: n } = t, r = t.toBytes || ((x, C, R) => {
    const S = C.toAffine();
    return Lr(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = t.fromBytes || ((x) => {
    const C = x.subarray(1), R = n.fromBytes(C.subarray(0, n.BYTES)), S = n.fromBytes(C.subarray(n.BYTES, 2 * n.BYTES));
    return { x: R, y: S };
  });
  function i(x) {
    const { a: C, b: R } = t, S = n.sqr(x), Z = n.mul(S, x);
    return n.add(n.add(Z, n.mul(x, C)), R);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(x) {
    return typeof x == "bigint" && nn < x && x < t.n;
  }
  function c(x) {
    if (!o(x))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(x) {
    const { allowedPrivateKeyLengths: C, nByteLength: R, wrapPrivateKey: S, n: Z } = t;
    if (C && typeof x != "bigint") {
      if (Wt(x) && (x = cr(x)), typeof x != "string" || !C.includes(x.length))
        throw new Error("Invalid key");
      x = x.padStart(R * 2, "0");
    }
    let T;
    try {
      T = typeof x == "bigint" ? x : Sn(Ut("private key", x, R));
    } catch {
      throw new Error(`private key must be ${R} bytes, hex or bigint, not ${typeof x}`);
    }
    return S && (T = Qt(T, Z)), c(T), T;
  }
  const f = /* @__PURE__ */ new Map();
  function y(x) {
    if (!(x instanceof p))
      throw new Error("ProjectivePoint expected");
  }
  class p {
    constructor(C, R, S) {
      if (this.px = C, this.py = R, this.pz = S, C == null || !n.isValid(C))
        throw new Error("x required");
      if (R == null || !n.isValid(R))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(C) {
      const { x: R, y: S } = C || {};
      if (!C || !n.isValid(R) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (C instanceof p)
        throw new Error("projective point not allowed");
      const Z = (T) => n.eql(T, n.ZERO);
      return Z(R) && Z(S) ? p.ZERO : new p(R, S, n.ONE);
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
      const R = n.invertBatch(C.map((S) => S.pz));
      return C.map((S, Z) => S.toAffine(R[Z])).map(p.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const R = p.fromAffine(s(Ut("pointHex", C)));
      return R.assertValidity(), R;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return p.BASE.multiply(d(C));
    }
    // "Private method", don't use it directly
    _setWindowSize(C) {
      this._WINDOW_SIZE = C, f.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: C, y: R } = this.toAffine();
      if (!n.isValid(C) || !n.isValid(R))
        throw new Error("bad point: x or y not FE");
      const S = n.sqr(R), Z = i(C);
      if (!n.eql(S, Z))
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
      y(C);
      const { px: R, py: S, pz: Z } = this, { px: T, py: j, pz: M } = C, k = n.eql(n.mul(R, M), n.mul(T, Z)), O = n.eql(n.mul(S, M), n.mul(j, Z));
      return k && O;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new p(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: C, b: R } = t, S = n.mul(R, Pc), { px: Z, py: T, pz: j } = this;
      let M = n.ZERO, k = n.ZERO, O = n.ZERO, P = n.mul(Z, Z), W = n.mul(T, T), U = n.mul(j, j), H = n.mul(Z, T);
      return H = n.add(H, H), O = n.mul(Z, j), O = n.add(O, O), M = n.mul(C, O), k = n.mul(S, U), k = n.add(M, k), M = n.sub(W, k), k = n.add(W, k), k = n.mul(M, k), M = n.mul(H, M), O = n.mul(S, O), U = n.mul(C, U), H = n.sub(P, U), H = n.mul(C, H), H = n.add(H, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, U), P = n.mul(P, H), k = n.add(k, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, H), M = n.sub(M, P), O = n.mul(U, W), O = n.add(O, O), O = n.add(O, O), new p(M, k, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      y(C);
      const { px: R, py: S, pz: Z } = this, { px: T, py: j, pz: M } = C;
      let k = n.ZERO, O = n.ZERO, P = n.ZERO;
      const W = t.a, U = n.mul(t.b, Pc);
      let H = n.mul(R, T), z = n.mul(S, j), B = n.mul(Z, M), a = n.add(R, S), A = n.add(T, j);
      a = n.mul(a, A), A = n.add(H, z), a = n.sub(a, A), A = n.add(R, Z);
      let l = n.add(T, M);
      return A = n.mul(A, l), l = n.add(H, B), A = n.sub(A, l), l = n.add(S, Z), k = n.add(j, M), l = n.mul(l, k), k = n.add(z, B), l = n.sub(l, k), P = n.mul(W, A), k = n.mul(U, B), P = n.add(k, P), k = n.sub(z, P), P = n.add(z, P), O = n.mul(k, P), z = n.add(H, H), z = n.add(z, H), B = n.mul(W, B), A = n.mul(U, A), z = n.add(z, B), B = n.sub(H, B), B = n.mul(W, B), A = n.add(A, B), H = n.mul(z, A), O = n.add(O, H), H = n.mul(l, A), k = n.mul(a, k), k = n.sub(k, H), H = n.mul(a, z), P = n.mul(l, P), P = n.add(P, H), new p(k, O, P);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(p.ZERO);
    }
    wNAF(C) {
      return F.wNAFCached(this, f, C, (R) => {
        const S = n.invertBatch(R.map((Z) => Z.pz));
        return R.map((Z, T) => Z.toAffine(S[T])).map(p.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const R = p.ZERO;
      if (C === nn)
        return R;
      if (c(C), C === kt)
        return this;
      const { endo: S } = t;
      if (!S)
        return F.unsafeLadder(this, C);
      let { k1neg: Z, k1: T, k2neg: j, k2: M } = S.splitScalar(C), k = R, O = R, P = this;
      for (; T > nn || M > nn; )
        T & kt && (k = k.add(P)), M & kt && (O = O.add(P)), P = P.double(), T >>= kt, M >>= kt;
      return Z && (k = k.negate()), j && (O = O.negate()), O = new p(n.mul(O.px, S.beta), O.py, O.pz), k.add(O);
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
      let R = C, S, Z;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: M, k2neg: k, k2: O } = T.splitScalar(R);
        let { p: P, f: W } = this.wNAF(M), { p: U, f: H } = this.wNAF(O);
        P = F.constTimeNegate(j, P), U = F.constTimeNegate(k, U), U = new p(n.mul(U.px, T.beta), U.py, U.pz), S = P.add(U), Z = W.add(H);
      } else {
        const { p: j, f: M } = this.wNAF(R);
        S = j, Z = M;
      }
      return p.normalizeZ([S, Z])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, R, S) {
      const Z = p.BASE, T = (M, k) => k === nn || k === kt || !M.equals(Z) ? M.multiplyUnsafe(k) : M.multiply(k), j = T(this, R).add(T(C, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: R, py: S, pz: Z } = this, T = this.is0();
      C == null && (C = T ? n.ONE : n.inv(Z));
      const j = n.mul(R, C), M = n.mul(S, C), k = n.mul(Z, C);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(k, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: M };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: R } = t;
      if (C === kt)
        return !0;
      if (R)
        return R(p, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: R } = t;
      return C === kt ? this : R ? R(p, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(p, this, C);
    }
    toHex(C = !0) {
      return cr(this.toRawBytes(C));
    }
  }
  p.BASE = new p(t.Gx, t.Gy, n.ONE), p.ZERO = new p(n.ZERO, n.ONE, n.ZERO);
  const b = t.nBitLength, F = Rm(p, t.endo ? Math.ceil(b / 2) : b);
  return {
    CURVE: t,
    ProjectivePoint: p,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Om(e) {
  const t = xd(e);
  return $r(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Lm(e) {
  const t = Om(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return nn < A && A < n.ORDER;
  }
  function c(A) {
    return Qt(A, r);
  }
  function d(A) {
    return wo(A, r);
  }
  const { ProjectivePoint: f, normPrivateKeyToScalar: y, weierstrassEquation: p, isWithinCurveOrder: b } = Mm({
    ...t,
    toBytes(A, l, m) {
      const h = l.toAffine(), E = n.toBytes(h.x), I = Lr;
      return m ? I(Uint8Array.from([l.hasEvenY() ? 2 : 3]), E) : I(Uint8Array.from([4]), E, n.toBytes(h.y));
    },
    fromBytes(A) {
      const l = A.length, m = A[0], h = A.subarray(1);
      if (l === s && (m === 2 || m === 3)) {
        const E = Sn(h);
        if (!o(E))
          throw new Error("Point is not on curve");
        const I = p(E);
        let g = n.sqrt(I);
        const u = (g & kt) === kt;
        return (m & 1) === 1 !== u && (g = n.neg(g)), { x: E, y: g };
      } else if (l === i && m === 4) {
        const E = n.fromBytes(h.subarray(0, n.BYTES)), I = n.fromBytes(h.subarray(n.BYTES, 2 * n.BYTES));
        return { x: E, y: I };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), F = (A) => cr(ur(A, t.nByteLength));
  function x(A) {
    const l = r >> kt;
    return A > l;
  }
  function C(A) {
    return x(A) ? c(-A) : A;
  }
  const R = (A, l, m) => Sn(A.slice(l, m));
  class S {
    constructor(l, m, h) {
      this.r = l, this.s = m, this.recovery = h, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const m = t.nByteLength;
      return l = Ut("compactSignature", l, m * 2), new S(R(l, 0, m), R(l, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: m, s: h } = Rn.toSig(Ut("DER", l));
      return new S(m, h);
    }
    assertValidity() {
      if (!b(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!b(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new S(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: m, s: h, recovery: E } = this, I = O(Ut("msgHash", l));
      if (E == null || ![0, 1, 2, 3].includes(E))
        throw new Error("recovery id invalid");
      const g = E === 2 || E === 3 ? m + t.n : m;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = E & 1 ? "03" : "02", w = f.fromHex(u + F(g)), Y = d(g), V = c(-I * Y), $ = c(h * Y), q = f.BASE.multiplyAndAddUnsafe(w, V, $);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return x(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Ar(this.toDERHex());
    }
    toDERHex() {
      return Rn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Ar(this.toCompactHex());
    }
    toCompactHex() {
      return F(this.r) + F(this.s);
    }
  }
  const Z = {
    isValidPrivateKey(A) {
      try {
        return y(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: y,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = vd(t.n);
      return Dm(t.randomBytes(A), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(A = 8, l = f.BASE) {
      return l._setWindowSize(A), l.multiply(BigInt(3)), l;
    }
  };
  function T(A, l = !0) {
    return f.fromPrivateKey(A).toRawBytes(l);
  }
  function j(A) {
    const l = Wt(A), m = typeof A == "string", h = (l || m) && A.length;
    return l ? h === s || h === i : m ? h === 2 * s || h === 2 * i : A instanceof f;
  }
  function M(A, l, m = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(l))
      throw new Error("second arg must be public key");
    return f.fromHex(l).multiply(y(A)).toRawBytes(m);
  }
  const k = t.bits2int || function(A) {
    const l = Sn(A), m = A.length * 8 - t.nBitLength;
    return m > 0 ? l >> BigInt(m) : l;
  }, O = t.bits2int_modN || function(A) {
    return c(k(A));
  }, P = aa(t.nBitLength);
  function W(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(nn <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ur(A, t.nByteLength);
  }
  function U(A, l, m = H) {
    if (["recovered", "canonical"].some((ne) => ne in m))
      throw new Error("sign() legacy options not supported");
    const { hash: h, randomBytes: E } = t;
    let { lowS: I, prehash: g, extraEntropy: u } = m;
    I == null && (I = !0), A = Ut("msgHash", A), g && (A = Ut("prehashed msgHash", h(A)));
    const w = O(A), Y = y(l), V = [W(Y), W(w)];
    if (u != null) {
      const ne = u === !0 ? E(n.BYTES) : u;
      V.push(Ut("extraEntropy", ne));
    }
    const $ = Lr(...V), q = w;
    function te(ne) {
      const Re = k(ne);
      if (!b(Re))
        return;
      const fe = d(Re), oe = f.BASE.multiply(Re).toAffine(), xe = c(oe.x);
      if (xe === nn)
        return;
      const de = c(fe * c(q + xe * Y));
      if (de === nn)
        return;
      let ge = (oe.x === xe ? 0 : 2) | Number(oe.y & kt), Zt = de;
      return I && x(de) && (Zt = C(de), ge ^= 1), new S(xe, Zt, ge);
    }
    return { seed: $, k2sig: te };
  }
  const H = { lowS: t.lowS, prehash: !1 }, z = { lowS: t.lowS, prehash: !1 };
  function B(A, l, m = H) {
    const { seed: h, k2sig: E } = U(A, l, m), I = t;
    return $u(I.hash.outputLen, I.nByteLength, I.hmac)(h, E);
  }
  f.BASE._setWindowSize(8);
  function a(A, l, m, h = z) {
    var oe;
    const E = A;
    if (l = Ut("msgHash", l), m = Ut("publicKey", m), "strict" in h)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: I, prehash: g } = h;
    let u, w;
    try {
      if (typeof E == "string" || Wt(E))
        try {
          u = S.fromDER(E);
        } catch (xe) {
          if (!(xe instanceof Rn.Err))
            throw xe;
          u = S.fromCompact(E);
        }
      else if (typeof E == "object" && typeof E.r == "bigint" && typeof E.s == "bigint") {
        const { r: xe, s: de } = E;
        u = new S(xe, de);
      } else
        throw new Error("PARSE");
      w = f.fromHex(m);
    } catch (xe) {
      if (xe.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (I && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: Y, s: V } = u, $ = O(l), q = d(V), te = c($ * q), ne = c(Y * q), Re = (oe = f.BASE.multiplyAndAddUnsafe(w, te, ne)) == null ? void 0 : oe.toAffine();
    return Re ? c(Re.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: M,
    sign: B,
    verify: a,
    ProjectivePoint: f,
    Signature: S,
    utils: Z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Tm(e) {
  return {
    hash: e,
    hmac: (t, ...n) => Jo(e, t, Jh(...n)),
    randomBytes: Yh
  };
}
function Pm(e, t) {
  const n = (r) => Lm({ ...e, ...Tm(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Fd = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Uc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Um = BigInt(1), Eo = BigInt(2), Gc = (e, t) => (e + t / Eo) / t;
function Gm(e) {
  const t = Fd, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), f = e * e * e % t, y = f * f * e % t, p = _t(y, n, t) * y % t, b = _t(p, n, t) * y % t, F = _t(b, Eo, t) * f % t, x = _t(F, s, t) * F % t, C = _t(x, i, t) * x % t, R = _t(C, c, t) * C % t, S = _t(R, d, t) * R % t, Z = _t(S, c, t) * C % t, T = _t(Z, n, t) * y % t, j = _t(T, o, t) * x % t, M = _t(j, r, t) * f % t, k = _t(M, Eo, t);
  if (!Io.eql(Io.sqr(k), e))
    throw new Error("Cannot find square root");
  return k;
}
const Io = Fm(Fd, void 0, void 0, { sqrt: Gm }), hn = Pm({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Io,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Uc,
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
      const t = Uc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Um * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = Gc(i * e, t), d = Gc(-r * e, t);
      let f = Qt(e - c * n - d * s, t), y = Qt(-c * r - d * i, t);
      const p = f > o, b = y > o;
      if (p && (f = t - f), b && (y = t - y), f > o || y > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: p, k1: f, k2neg: b, k2: y };
    }
  }
}, qr);
BigInt(0);
hn.ProjectivePoint;
let ls;
const Hm = new Uint8Array(16);
function Jm() {
  if (!ls && (ls = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ls))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ls(Hm);
}
const mt = [];
for (let e = 0; e < 256; ++e)
  mt.push((e + 256).toString(16).slice(1));
function Zm(e, t = 0) {
  return (mt[e[t + 0]] + mt[e[t + 1]] + mt[e[t + 2]] + mt[e[t + 3]] + "-" + mt[e[t + 4]] + mt[e[t + 5]] + "-" + mt[e[t + 6]] + mt[e[t + 7]] + "-" + mt[e[t + 8]] + mt[e[t + 9]] + "-" + mt[e[t + 10]] + mt[e[t + 11]] + mt[e[t + 12]] + mt[e[t + 13]] + mt[e[t + 14]] + mt[e[t + 15]]).toLowerCase();
}
const Ym = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Hc = {
  randomUUID: Ym
};
function Vm(e, t, n) {
  if (Hc.randomUUID && !t && !e)
    return Hc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || Jm)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return Zm(r);
}
var da = { exports: {} }, jn = typeof Reflect == "object" ? Reflect : null, Jc = jn && typeof jn.apply == "function" ? jn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, xs;
jn && typeof jn.ownKeys == "function" ? xs = jn.ownKeys : Object.getOwnPropertySymbols ? xs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : xs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Xm(e) {
  console && console.warn && console.warn(e);
}
var Dd = Number.isNaN || function(t) {
  return t !== t;
};
function Qe() {
  Qe.init.call(this);
}
da.exports = Qe;
da.exports.once = $m;
Qe.EventEmitter = Qe;
Qe.prototype._events = void 0;
Qe.prototype._eventsCount = 0;
Qe.prototype._maxListeners = void 0;
var Zc = 10;
function fi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Qe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Zc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Dd(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Zc = e;
  }
});
Qe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Qe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Dd(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Nd(e) {
  return e._maxListeners === void 0 ? Qe.defaultMaxListeners : e._maxListeners;
}
Qe.prototype.getMaxListeners = function() {
  return Nd(this);
};
Qe.prototype.emit = function(t) {
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
  var d = i[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    Jc(d, this, n);
  else
    for (var f = d.length, y = Md(d, f), r = 0; r < f; ++r)
      Jc(y[r], this, n);
  return !0;
};
function Rd(e, t, n, r) {
  var s, i, o;
  if (fi(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Nd(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, Xm(c);
  }
  return e;
}
Qe.prototype.addListener = function(t, n) {
  return Rd(this, t, n, !1);
};
Qe.prototype.on = Qe.prototype.addListener;
Qe.prototype.prependListener = function(t, n) {
  return Rd(this, t, n, !0);
};
function jm() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Sd(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = jm.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Qe.prototype.once = function(t, n) {
  return fi(n), this.on(t, Sd(this, t, n)), this;
};
Qe.prototype.prependOnceListener = function(t, n) {
  return fi(n), this.prependListener(t, Sd(this, t, n)), this;
};
Qe.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (fi(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : qm(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
  }
  return this;
};
Qe.prototype.off = Qe.prototype.removeListener;
Qe.prototype.removeAllListeners = function(t) {
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
function _d(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? Wm(s) : Md(s, s.length);
}
Qe.prototype.listeners = function(t) {
  return _d(this, t, !0);
};
Qe.prototype.rawListeners = function(t) {
  return _d(this, t, !1);
};
Qe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : kd.call(e, t);
};
Qe.prototype.listenerCount = kd;
function kd(e) {
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
Qe.prototype.eventNames = function() {
  return this._eventsCount > 0 ? xs(this._events) : [];
};
function Md(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function qm(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Wm(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function $m(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    Od(e, t, i, { once: !0 }), t !== "error" && Km(e, s, { once: !0 });
  });
}
function Km(e, t, n) {
  typeof e.on == "function" && Od(e, "error", t, n);
}
function Od(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var Ld = da.exports, zm = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", ew = class {
  constructor(e, t, n, r, s, i = 0) {
    N(this, "left");
    N(this, "right");
    N(this, "parent");
    N(this, "hash");
    N(this, "data");
    N(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, Yc = ew;
function tw(e) {
  return rn("0x00".concat(e.slice(2)));
}
function nw(e, t) {
  return rn("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Td(e) {
  if (!e.length)
    return zm;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = tw(e[i]);
    t.push(new Yc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = nw(n[o].hash, n[o + 1].hash);
      t[i] = new Yc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var rw = "0x00", Pd = "0x01";
function sw(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(rn(t).slice(2));
  return [rn(n), n];
}
function Mn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [rn(n), n];
}
function Xi(e) {
  const t = Pd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function iw(e) {
  const t = Pd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function ji(e) {
  return e.slice(0, 4) === rw;
}
var ow = class {
  constructor(e, t, n, r, s) {
    N(this, "SideNodes");
    N(this, "NonMembershipLeafData");
    N(this, "BitMask");
    N(this, "NumSideNodes");
    N(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, aw = ow, cw = class {
  constructor(e, t, n) {
    N(this, "SideNodes");
    N(this, "NonMembershipLeafData");
    N(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, Aw = cw, Nt = "0x0000000000000000000000000000000000000000000000000000000000000000", en = 256;
function Jn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function uw(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function dw(e, t) {
  let n = 0;
  for (let r = 0; r < en && Jn(e, r) === Jn(t, r); r += 1)
    n += 1;
  return n;
}
function lw(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Nt ? t.push(0) : (n.push(r), t.push(1));
  return new aw(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var hw = class {
  constructor() {
    N(this, "ms");
    N(this, "root");
    const e = {};
    this.ms = e, this.root = Nt, this.ms[this.root] = Nt;
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
    if (t === Nt)
      return [n, Nt, "", ""];
    let r = this.get(t);
    if (ji(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let f = 0; f < en; f += 1) {
      if ([s, i] = iw(r), Jn(e, f) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Nt) {
        r = "";
        break;
      }
      if (r = this.get(o), ji(r))
        break;
    }
    const d = this.get(c);
    return [uw(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Nt)
      return this.root;
    const [s] = Xi(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", d = "", f = !1;
    for (let y = 0; y < t.length; y += 1)
      if (t[y] !== "") {
        if (c = t[y], o === "")
          if (d = this.get(c), ji(d)) {
            i = c, o = c;
            continue;
          } else
            o = Nt, f = !0;
        !f && c === Nt || (f || (f = !0), Jn(e, t.length - 1 - y) === 1 ? [i, o] = Mn(c, o) : [i, o] = Mn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Nt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(rn(t), t), [i, o] = sw(e, t), this.set(i, o), o = i;
    let c;
    if (r === Nt)
      c = en;
    else {
      const [d] = Xi(s);
      c = dw(e, d);
    }
    c !== en && (Jn(e, c) === 1 ? [i, o] = Mn(r, o) : [i, o] = Mn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < en; d += 1) {
      let f;
      const y = en - n.length;
      if (d - y < 0 || n[d - y] === "")
        if (c !== en && c > en - 1 - d)
          f = Nt;
        else
          continue;
      else
        f = n[d - y];
      Jn(e, en - 1 - d) === 1 ? [i, o] = Mn(f, o) : [i, o] = Mn(o, f), this.set(i, o), o = i;
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
    for (let d = 0; d < t.length; d += 1)
      t[d] !== "" && i.push(t[d]);
    let o = "";
    if (n !== Nt) {
      const [d] = Xi(r);
      d !== e && (o = r);
    }
    return new Aw(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return lw(t);
  }
}, fw = Object.defineProperty, gw = (e, t, n) => t in e ? fw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ke = (e, t, n) => (gw(e, typeof t != "symbol" ? t + "" : t, n), n), la = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, De = (e, t, n) => (la(e, t, "read from private field"), n ? n.call(e) : t.get(e)), pn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Gt = (e, t, n, r) => (la(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), yo = (e, t, n) => (la(e, t, "access private method"), n), ha = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? wt, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? wt, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: X(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, pw = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, fa = ce`
    fragment receiptFragment on Receipt {
  contract {
    id
  }
  pc
  is
  to {
    id
  }
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
    `, ga = ce`
    fragment transactionStatusFragment on TransactionStatus {
  type: __typename
  ... on SubmittedStatus {
    time
  }
  ... on SuccessStatus {
    block {
      id
    }
    time
    programState {
      returnType
      data
    }
  }
  ... on FailureStatus {
    block {
      id
    }
    time
    reason
  }
  ... on SqueezedOutStatus {
    reason
  }
}
    `, ts = ce`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  gasPrice
  receipts {
    ...receiptFragment
  }
  status {
    ...transactionStatusFragment
  }
}
    ${fa}
${ga}`, mw = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, ww = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${mw}`, pa = ce`
    fragment coinFragment on Coin {
  __typename
  utxoId
  owner
  amount
  assetId
  maturity
  blockCreated
  txCreatedIdx
}
    `, Ew = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Iw = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, yw = ce`
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
    transactionsCount
    transactionsRoot
    height
    prevRoot
    time
    applicationHash
    messageReceiptRoot
    messageReceiptCount
  }
  commitBlockHeader {
    id
    daHeight
    transactionsCount
    transactionsRoot
    height
    prevRoot
    time
    applicationHash
    messageReceiptRoot
    messageReceiptCount
  }
  sender
  recipient
  nonce
  amount
  data
}
    `, Ud = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, gi = ce`
    fragment blockFragment on Block {
  id
  header {
    height
    time
  }
  transactions {
    id
  }
}
    `, Bw = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, Cw = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, bw = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, Qw = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, vw = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, xw = ce`
    fragment DependentCostFragment on DependentCost {
  __typename
  ... on LightOperation {
    base
    unitsPerGas
  }
  ... on HeavyOperation {
    base
    gasPerUnit
  }
}
    `, Fw = ce`
    fragment GasCostsFragment on GasCosts {
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
  croo
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
    ${xw}`, Dw = ce`
    fragment consensusParametersFragment on ConsensusParameters {
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
    ${Bw}
${Cw}
${bw}
${Qw}
${vw}
${Fw}`, Nw = ce`
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
    ${gi}
${Dw}`, Rw = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Sw = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, _w = ce`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  minGasPrice
  maxTx
  maxDepth
  nodeVersion
  peers {
    id
    addresses
    clientVersion
    blockHeight
    lastHeartbeatMs
    appScore
  }
}
    `, kw = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Mw = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${_w}`, Ow = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Nw}`, Lw = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ts}`, Tw = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${ts}
${fa}`, Pw = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${ts}`, Uw = ce`
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
    ${Sw}
${ts}`, Gw = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${ww}`, Hw = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${gi}`, Jw = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${gi}
${ts}`, Zw = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${gi}`, Yw = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${pa}`, Vw = ce`
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
    ${pa}`, Xw = ce`
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
    ${pa}
${Ew}`, jw = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, qw = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Rw}`, Ww = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${Ud}`, $w = ce`
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
    ${Ud}`, Kw = ce`
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
    ${Iw}`, zw = ce`
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
    ${yw}`, eE = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, tE = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${fa}`, nE = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, rE = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, sE = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${ga}`, iE = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${ga}`;
function oE(e) {
  return {
    getVersion(t, n) {
      return e(kw, t, n);
    },
    getNodeInfo(t, n) {
      return e(Mw, t, n);
    },
    getChain(t, n) {
      return e(Ow, t, n);
    },
    getTransaction(t, n) {
      return e(Lw, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Tw, t, n);
    },
    getTransactions(t, n) {
      return e(Pw, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Uw, t, n);
    },
    estimatePredicates(t, n) {
      return e(Gw, t, n);
    },
    getBlock(t, n) {
      return e(Hw, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(Jw, t, n);
    },
    getBlocks(t, n) {
      return e(Zw, t, n);
    },
    getCoin(t, n) {
      return e(Yw, t, n);
    },
    getCoins(t, n) {
      return e(Vw, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(Xw, t, n);
    },
    getContract(t, n) {
      return e(jw, t, n);
    },
    getContractBalance(t, n) {
      return e(qw, t, n);
    },
    getBalance(t, n) {
      return e(Ww, t, n);
    },
    getBalances(t, n) {
      return e($w, t, n);
    },
    getMessages(t, n) {
      return e(Kw, t, n);
    },
    getMessageProof(t, n) {
      return e(zw, t, n);
    },
    getMessageStatus(t, n) {
      return e(eE, t, n);
    },
    dryRun(t, n) {
      return e(tE, t, n);
    },
    submit(t, n) {
      return e(nE, t, n);
    },
    produceBlocks(t, n) {
      return e(rE, t, n);
    },
    submitAndAwait(t, n) {
      return e(sE, t, n);
    },
    statusChange(t, n) {
      return e(iE, t, n);
    }
  };
}
var Gd = class {
  constructor(e) {
    N(this, "stream");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: ud(t),
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
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = Gd.textDecoder.decode(e);
      if (!n.startsWith("data:"))
        continue;
      let r, s;
      try {
        ({ data: r, errors: s } = JSON.parse(n.replace(/^data:/, "")));
      } catch {
        throw new v(
          D.STREAM_PARSING_ERROR,
          `Error while parsing stream data response: ${n}`
        );
      }
      if (Array.isArray(s))
        throw new v(
          v.CODES.INVALID_REQUEST,
          s.map((i) => i.message).join(`

`)
        );
      return { value: r, done: !1 };
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
}, Hd = Gd;
ke(Hd, "textDecoder", new TextDecoder());
var Qn = {}, aE = 30 * 1e3, cE = class {
  constructor(e = aE) {
    N(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        D.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = X(e);
    if (Qn[n]) {
      if (!t || Qn[n].expires > Date.now())
        return Qn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = X(e);
    return Qn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Qn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Qn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = X(e);
    delete Qn[t];
  }
}, AE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case we.Coin: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x");
      return {
        type: we.Coin,
        txID: X(J(e.id).slice(0, 32)),
        outputIndex: J(e.id)[32],
        owner: X(e.owner),
        amount: Q(e.amount),
        assetId: X(e.assetId),
        txPointer: {
          blockHeight: Ot(J(e.txPointer).slice(0, 8)),
          txIndex: Ot(J(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        maturity: e.maturity ?? 0,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: X(n),
        predicateData: X(r)
      };
    }
    case we.Contract:
      return {
        type: we.Contract,
        txID: Ne,
        outputIndex: 0,
        balanceRoot: Ne,
        stateRoot: Ne,
        txPointer: {
          blockHeight: Ot(J(e.txPointer).slice(0, 8)),
          txIndex: Ot(J(e.txPointer).slice(8, 16))
        },
        contractID: X(e.contractId)
      };
    case we.Message: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x"), s = J(e.data ?? "0x");
      return {
        type: we.Message,
        sender: X(e.sender),
        recipient: X(e.recipient),
        amount: Q(e.amount),
        nonce: X(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: X(n),
        predicateData: X(r),
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
}, uE = (e) => {
  const { type: t } = e;
  switch (t) {
    case Be.Coin:
      return {
        type: Be.Coin,
        to: X(e.to),
        amount: Q(e.amount),
        assetId: X(e.assetId)
      };
    case Be.Contract:
      return {
        type: Be.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Ne,
        stateRoot: Ne
      };
    case Be.Change:
      return {
        type: Be.Change,
        to: X(e.to),
        amount: Q(0),
        assetId: X(e.assetId)
      };
    case Be.Variable:
      return {
        type: Be.Variable,
        to: Ne,
        amount: Q(0),
        assetId: Ne
      };
    case Be.ContractCreated:
      return {
        type: Be.ContractCreated,
        contractId: X(e.contractId),
        stateRoot: X(e.stateRoot)
      };
    default:
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, ky = (e) => "utxoId" in e, My = (e) => "recipient" in e, Vc = (e) => "id" in e, Oy = (e) => "recipient" in e, dE = (e) => e.type === Ae.Revert && e.val.toString("hex") === Ed, lE = (e) => e.type === Ae.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", hE = (e) => e.reduce(
  (t, n) => (dE(n) && t.missingOutputVariables.push(n), lE(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), ve = (e) => e || Ne;
function fE(e) {
  var n, r, s, i, o, c, d, f, y, p, b, F, x, C;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: Ae.Call,
        from: ve((n = e.contract) == null ? void 0 : n.id),
        to: ve((r = e == null ? void 0 : e.to) == null ? void 0 : r.id),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
        gas: Q(e.gas),
        param1: Q(e.param1),
        param2: Q(e.param2),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN":
      return {
        type: Ae.Return,
        id: ve((s = e.contract) == null ? void 0 : s.id),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: Ae.ReturnData,
        id: ve((i = e.contract) == null ? void 0 : i.id),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: ve(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: Ae.Panic,
        id: ve((o = e.contract) == null ? void 0 : o.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: ve(e.contractId)
      };
    case "REVERT":
      return {
        type: Ae.Revert,
        id: ve((c = e.contract) == null ? void 0 : c.id),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: Ae.Log,
        id: ve((d = e.contract) == null ? void 0 : d.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        val2: Q(e.rc),
        val3: Q(e.rd),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG_DATA":
      return {
        type: Ae.LogData,
        id: ve((f = e.contract) == null ? void 0 : f.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: ve(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER":
      return {
        type: Ae.Transfer,
        from: ve((y = e.contract) == null ? void 0 : y.id),
        to: ve(e.toAddress || ((p = e == null ? void 0 : e.to) == null ? void 0 : p.id)),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: Ae.TransferOut,
        from: ve((b = e.contract) == null ? void 0 : b.id),
        to: ve(e.toAddress || ((F = e.to) == null ? void 0 : F.id)),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: Ae.ScriptResult,
        result: Q(e.result),
        gasUsed: Q(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const R = ve(e.sender), S = ve(e.recipient), Z = ve(e.nonce), T = Q(e.amount), j = e.data ? J(e.data) : Uint8Array.from([]), M = ve(e.digest), k = Hs.getMessageId({
        sender: R,
        recipient: S,
        nonce: Z,
        amount: T,
        data: j
      });
      return {
        type: Ae.MessageOut,
        sender: R,
        recipient: S,
        amount: T,
        nonce: Z,
        data: j,
        digest: M,
        messageId: k
      };
    }
    case "MINT": {
      const R = ve((x = e.contract) == null ? void 0 : x.id), S = ve(e.subId), Z = Or.getAssetId(R, S);
      return {
        type: Ae.Mint,
        subId: S,
        contractId: R,
        assetId: Z,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const R = ve((C = e.contract) == null ? void 0 : C.id), S = ve(e.subId), Z = uo.getAssetId(R, S);
      return {
        type: Ae.Burn,
        subId: S,
        contractId: R,
        assetId: Z,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var gE = "https://fuellabs.github.io/block-explorer-v2", pE = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, Ly = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || gE, d = [
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
  ], f = d.filter((j) => !!j.value).map(({ key: j, value: M }) => ({
    key: j,
    value: M
  })), y = f.length > 0;
  if (f.length > 1)
    throw new v(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && f.length > 0) {
    const j = d.map(({ key: M }) => M).join(", ");
    throw new v(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const p = y ? pE(
    f[0].key,
    f[0].value
  ) : "", b = /^\/|\/$/gm, F = n ? n.replace(b, "") : p, x = c.replace(b, ""), C = r == null ? void 0 : r.replace(b, ""), R = C ? encodeURIComponent(C) : void 0, S = x.match(/^https?:\/\//) ? "" : "https://", Z = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${x}/${F}${R ? `?providerUrl=${Z}${R}` : ""}`;
}, qn = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), Jd = (e) => e.filter(
  (r) => r.type === Ae.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function yn(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function mE(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    yn(t, n.vmInitialization).add(yn(J(o.predicate).length, n.contractRoot)).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function Zd(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = yn(i, t.vmInitialization), c = Q(i).mul(n), d = mE(r, i, t);
  return o.add(c).add(d).add(s).maxU64();
}
function ma(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function Yd({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = yn(r, e.contractRoot), i = yn(t, e.stateRoot), o = yn(n, e.s256), c = Q(4 + 32 + 32 + 32), d = yn(c, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function Vd({
  gasCosts: e,
  txBytesSize: t
}) {
  return yn(t, e.s256);
}
function Bo(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = X(e[t]);
        break;
      case "Array":
        e[t] = Bo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Bo(e[t]);
        break;
    }
  }), e;
}
function wE(e) {
  return Bo(Pr(e));
}
function EE(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var IE = (e) => {
  let t = `The transaction reverted with reason: "${e.reason}".`;
  return om.includes(e.reason) && (t = `${t}

You can read more about this error at:

${am}#variant.${e.reason}`), t;
}, br = (e) => JSON.stringify(e, null, 2), yE = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: s }) => s === Ae.Revert);
  if (r)
    switch (Q(r.val).toHex()) {
      case nm: {
        n = `The transaction reverted because of a "require" statement has thrown ${t.length ? br(t[0]) : "an error."}.`;
        break;
      }
      case rm: {
        n = `The transaction reverted because of an "assert_eq" statement${t.length >= 2 ? ` comparing ${br(t[1])} and ${br(t[0])}.` : "."}`;
        break;
      }
      case im: {
        n = `The transaction reverted because of an "assert_ne" statement${t.length >= 2 ? ` comparing ${br(t[1])} and ${br(t[0])}.` : "."}`;
        break;
      }
      case sm:
        n = 'The transaction reverted because of an "assert" statement failed to evaluate to true.';
        break;
      case Ed:
        n = 'The transaction reverted because missing "OutputChange"(s).';
        break;
      default:
        n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return n;
}, Xd = (e) => {
  const { receipts: t, status: n, logs: r } = e, s = t.some(({ type: o }) => o === Ae.Panic);
  let i = (n == null ? void 0 : n.type) === "FailureStatus" && s ? IE(n) : yE(t, r);
  return i += `

logs: ${JSON.stringify(r, null, 2)}`, i += `

receipts: ${JSON.stringify(t, null, 2)}`, new v(D.SCRIPT_REVERTED, i);
}, Ty = class extends Error {
  constructor() {
    super(...arguments);
    N(this, "name", "ChangeOutputCollisionError");
    N(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, BE = class extends Error {
  constructor(t) {
    super();
    N(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, Py = class extends Error {
  constructor(t) {
    super();
    N(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, CE = (e) => {
  const t = J(e);
  return {
    data: X(t),
    dataLength: t.length
  };
}, pi = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    gasPrice: e,
    maturity: t,
    maxFee: n,
    witnessLimit: r,
    inputs: s,
    outputs: i,
    witnesses: o
  } = {}) {
    /** Gas price for transaction */
    N(this, "gasPrice");
    /** Block until which tx cannot be included */
    N(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    N(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    N(this, "witnessLimit");
    /** List of inputs */
    N(this, "inputs", []);
    /** List of outputs */
    N(this, "outputs", []);
    /** List of witnesses */
    N(this, "witnesses", []);
    this.gasPrice = Q(e), this.maturity = t ?? 0, this.witnessLimit = r ? Q(r) : void 0, this.maxFee = n ? Q(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.gasPrice && (t += Pt.GasPrice, n.push({ data: e.gasPrice, type: Pt.GasPrice })), e.witnessLimit && (t += Pt.WitnessLimit, n.push({ data: e.witnessLimit, type: Pt.WitnessLimit })), e.maturity > 0 && (t += Pt.Maturity, n.push({ data: e.maturity, type: Pt.Maturity })), e.maxFee && (t += Pt.MaxFee, n.push({ data: e.maxFee, type: Pt.MaxFee })), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(AE)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(uE)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(CE)) ?? [], { policyTypes: r, policies: s } = pi.getPolicyMeta(this);
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
    return new Cn().encode(this.toTransaction());
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
    return this.addWitness(se([Ne, Ne])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = he.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new BE(e);
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
      (e) => e.type === we.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === Be.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === Be.Change
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
        case we.Coin:
          return X(r.owner) === t.toB256();
        case we.Message:
          return X(r.recipient) === t.toB256();
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
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addCoinInput(e, t) {
    const { assetId: n, owner: r, amount: s } = e;
    let i;
    t ? i = 0 : (i = this.getCoinInputWitnessIndexByOwner(r), typeof i != "number" && (i = this.addEmptyWitness()));
    const o = {
      ...e,
      type: we.Coin,
      owner: r.toB256(),
      amount: s,
      assetId: n,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: i,
      predicate: t == null ? void 0 : t.bytes,
      predicateData: t == null ? void 0 : t.predicateDataBytes
    };
    this.pushInput(o), this.addChangeOutput(r, n);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * baseAssetId, if one it was not added yet.
   *
   * @param message - Message resource.
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addMessageInput(e, t) {
    const { recipient: n, sender: r, amount: s } = e, i = wt;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.addEmptyWitness()));
    const c = {
      ...e,
      type: we.Message,
      sender: r.toB256(),
      recipient: n.toB256(),
      amount: s,
      witnessIndex: o,
      predicate: t == null ? void 0 : t.bytes,
      predicateData: t == null ? void 0 : t.predicateDataBytes
    };
    this.pushInput(c), this.addChangeOutput(n, i);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return Vc(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResource(e, t) {
    return Vc(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
  }
  /**
   * Adds multiple predicate coin/message inputs to the transaction and change outputs
   * from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResources(e, t) {
    return e.forEach((n) => this.addPredicateResource(n, t)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(e, t, n = wt) {
    return this.pushOutput({
      type: Be.Coin,
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
    return t.map(ha).forEach((n) => {
      this.pushOutput({
        type: Be.Coin,
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
  addChangeOutput(e, t = wt) {
    this.getChangeOutputs().find(
      (r) => X(r.assetId) === t
    ) || this.pushOutput({
      type: Be.Change,
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
    const { gasCosts: t, consensusParameters: n } = e, { gasPerByte: r } = n;
    return Zd({
      gasPerByte: r,
      gasCosts: t,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(t)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: n } = e, { gasPerByte: r } = n, s = this.toTransaction().witnesses.reduce(
      (i, o) => i + o.dataLength,
      0
    );
    return ma({
      gasPerByte: r,
      minGas: t,
      witnessesLength: s,
      witnessLimit: this.witnessLimit
    });
  }
  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   */
  fundWithFakeUtxos(e, t) {
    let n = 0;
    const r = () => {
      const o = String(n++);
      return Ne.slice(0, -o.length).concat(o);
    }, s = (o) => this.inputs.find((c) => "assetId" in c ? c.assetId === o : !1), i = (o, c) => {
      const d = s(o);
      d && "assetId" in d ? (d.id = r(), d.amount = c) : this.addResources([
        {
          id: r(),
          amount: c,
          assetId: o,
          owner: t || he.fromRandom(),
          maturity: 0,
          blockCreated: Q(1),
          txCreatedIdx: Q(1)
        }
      ]);
    };
    i(wt, Q(1e11)), e.forEach((o) => i(o.assetId, o.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: n }) => ({
      amount: Q(t),
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
    return wE(this);
  }
  updatePredicateInputs(e) {
    this.inputs.forEach((t) => {
      let n;
      switch (t.type) {
        case we.Coin:
          n = e.find((r) => r.type === we.Coin && r.owner === t.owner);
          break;
        case we.Message:
          n = e.find(
            (r) => r.type === we.Message && r.sender === t.sender
          );
          break;
        default:
          return;
      }
      n && "predicateGasUsed" in n && Q(n.predicateGasUsed).gt(0) && (t.predicate = n.predicate, t.predicateData = n.predicateData, t.predicateGasUsed = n.predicateGasUsed);
    });
  }
};
function jd(e, t) {
  const n = e.toTransaction();
  n.type === It.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
    const o = Pr(i);
    switch (o.type) {
      case we.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = Q(0), o;
      case we.Message:
        return o.predicateGasUsed = Q(0), o;
      case we.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Ne, o.outputIndex = 0, o.balanceRoot = Ne, o.stateRoot = Ne, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Pr(i);
    switch (o.type) {
      case Be.Contract:
        return o.balanceRoot = Ne, o.stateRoot = Ne, o;
      case Be.Change:
        return o.amount = Q(0), o;
      case Be.Variable:
        return o.to = Ne, o.amount = Q(0), o.assetId = Ne, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Sf(t), s = se([r, new Cn().encode(n)]);
  return Bt(s);
}
var bE = (e) => {
  const t = new Uint8Array(32);
  return t.set(J(e)), t;
}, QE = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: X(t),
    value: X(bE(n))
  };
}, Co = class extends pi {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({
    bytecodeWitnessIndex: t,
    salt: n,
    storageSlots: r,
    ...s
  } = {}) {
    super(s);
    /** Type of the transaction */
    N(this, "type", It.Create);
    /** Witness index of contract bytecode to create */
    N(this, "bytecodeWitnessIndex");
    /** Salt */
    N(this, "salt");
    /** List of storage slots to initialize */
    N(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = X(n ?? Ne), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(QE)) ?? [];
    return {
      type: It.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? X(this.salt) : Ne,
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
      (t) => t.type === Be.ContractCreated
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
    return jd(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: Be.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return Yd({
      contractBytesSize: Q(J(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Xc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: J("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, vE = {
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
  bytes: J("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Wn = class extends pi {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    N(this, "type", It.Script);
    /** Gas limit for transaction */
    N(this, "gasLimit");
    /** Script to execute */
    N(this, "script");
    /** Script input data (parameters) */
    N(this, "scriptData");
    N(this, "abis");
    this.gasLimit = Q(r), this.script = J(t ?? Xc.bytes), this.scriptData = J(n ?? Xc.encodeScriptData()), this.abis = s.abis;
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
    const t = J(this.script ?? "0x"), n = J(this.scriptData ?? "0x");
    return {
      type: It.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: t.length,
      scriptDataLength: n.length,
      receiptsRoot: Ne,
      script: X(t),
      scriptData: X(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === we.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === Be.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === Be.Variable
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
        type: Be.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, c) => o + c.dataLength,
      0
    );
    return ma({
      gasPerByte: s,
      minGas: n,
      witnessesLength: i,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit
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
      type: we.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: Be.Contract,
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
    return jd(this, t);
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
    return Vd({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Mt = (e) => {
  if (e instanceof Wn || e instanceof Co)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case It.Script:
      return Wn.from(e);
    case It.Create:
      return Co.from(e);
    default:
      throw new v(D.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, xE = (e) => {
  var P, W;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), c = J(n), [d] = new Cn().decode(c, 0);
  if (d.type === It.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: f, witnesses: y, inputs: p, policies: b } = d;
  let F = Q(0), x = Q(0);
  if (f === It.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, z = Q(J(y[U].data).length);
    F = Yd({
      contractBytesSize: z,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: c.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (x = U), F = Vd({
      gasCosts: r,
      txBytesSize: c.length
    });
  }
  const C = Zd({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: p,
    metadataGas: F,
    txBytesSize: c.length
  }), R = Q((P = b.find((U) => U.type === Pt.GasPrice)) == null ? void 0 : P.data), S = (W = b.find((U) => U.type === Pt.WitnessLimit)) == null ? void 0 : W.data, Z = y.reduce((U, H) => U + H.dataLength, 0), T = ma({
    gasPerByte: i,
    minGas: C,
    witnessesLength: Z,
    gasLimit: x,
    witnessLimit: S
  }), j = qn(t, R, o), M = qn(C, R, o), k = qn(T, R, o);
  return {
    fee: M.add(j),
    minFee: M,
    maxFee: k,
    feeFromGasUsed: j
  };
}, FE = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var p;
  const s = new sn(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const b = Q(t.param2).sub(ai({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(b * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let f;
  if (d) {
    const b = o.decodeArguments(d);
    b && (f = c.reduce((F, x, C) => {
      const R = b[C], S = x.name;
      return S ? {
        ...F,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(R))
      } : F;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: f,
    ...(p = t.amount) != null && p.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function DE(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function wa(e, t) {
  return e.filter((n) => n.type === t);
}
function NE(e) {
  return wa(e, we.Coin);
}
function RE(e) {
  return wa(e, we.Message);
}
function SE(e) {
  return DE(e, [we.Coin, we.Message]);
}
function _E(e) {
  return wa(e, we.Contract);
}
function qd(e, t) {
  const n = NE(e), r = RE(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function kE(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== we.Contract)
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Ea(e) {
  return e.type === we.Coin ? e.owner.toString() : e.type === we.Message ? e.recipient.toString() : "";
}
function ns(e, t) {
  return e.filter((n) => n.type === t);
}
function ME(e) {
  return ns(e, Be.ContractCreated);
}
function Wd(e) {
  return ns(e, Be.Coin);
}
function OE(e) {
  return ns(e, Be.Change);
}
function LE(e) {
  return ns(e, Be.Contract);
}
function Uy(e) {
  return ns(e, Be.Variable);
}
var TE = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(TE || {}), PE = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(PE || {}), UE = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(UE || {}), GE = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(GE || {}), HE = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(HE || {});
function Ur(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function $d(e) {
  switch (e) {
    case It.Mint:
      return "Mint";
    case It.Create:
      return "Create";
    case It.Script:
      return "Script";
    default:
      throw new v(
        D.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Ia(e, t) {
  return $d(e) === t;
}
function JE(e) {
  return Ia(
    e,
    "Mint"
    /* Mint */
  );
}
function Kd(e) {
  return Ia(
    e,
    "Create"
    /* Create */
  );
}
function zd(e) {
  return Ia(
    e,
    "Script"
    /* Script */
  );
}
function Gy(e) {
  return (t) => e.assetId === t.assetId;
}
function ZE(e) {
  return Ur(e, Ae.Call);
}
function YE(e) {
  return Ur(e, Ae.MessageOut);
}
var VE = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((c) => c.assetId === o.assetId)
  );
  return n.map((o) => {
    const c = r.find((f) => f.assetId === o.assetId);
    if (!c)
      return o;
    const d = Q(o.amount).add(c.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function XE(e, t) {
  var n, r, s, i, o, c, d, f;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((d = e.to) == null ? void 0 : d.type) === ((f = t.to) == null ? void 0 : f.type);
}
function lr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => XE(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? VE(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function Hy(e) {
  return Ur(e, Ae.TransferOut);
}
function jE({
  inputs: e,
  receipts: t
}) {
  return YE(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = qd(e, o);
      if (c) {
        const d = Ea(c);
        return lr(s, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: d
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
function qE({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = ZE(n);
  return LE(t).reduce((f, y) => {
    const p = kE(e, y.inputIndex);
    return p ? o.reduce((F, x) => {
      var C;
      if (x.to === p.contractID) {
        const R = qd(e, x.assetId);
        if (R) {
          const S = Ea(R), Z = [], T = r == null ? void 0 : r[p.contractID];
          return T && Z.push(
            FE({
              abi: T,
              receipt: x,
              rawPayload: s,
              maxInputs: i
            })
          ), lr(F, {
            name: "Contract call",
            from: {
              type: 1,
              address: S
            },
            to: {
              type: 0,
              address: x.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (C = x.amount) != null && C.isZero() ? void 0 : [
              {
                amount: x.amount,
                assetId: x.assetId
              }
            ],
            calls: Z
          });
        }
      }
      return F;
    }, f) : f;
  }, []);
}
function WE(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((f) => f.contractID === r) ? 0 : 1;
  if (Ne === o) {
    const f = n.find((y) => y.assetId === s);
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
function jc({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = Wd(t), i = _E(e), o = OE(t);
  s.forEach((f) => {
    const { amount: y, assetId: p, to: b } = f, F = o.find((x) => x.assetId === p);
    F && (r = lr(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: F.to
      },
      to: {
        type: 1,
        address: b
      },
      assetsSent: [
        {
          assetId: p,
          amount: y
        }
      ]
    }));
  });
  const c = Ur(
    n,
    Ae.Transfer
  ), d = Ur(
    n,
    Ae.TransferOut
  );
  return [...c, ...d].forEach((f) => {
    const y = WE(f, i, o);
    r = lr(r, y);
  }), r;
}
function $E(e) {
  return Wd(e).reduce((r, s) => lr(r, {
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
function KE({ inputs: e, outputs: t }) {
  const n = ME(t), r = SE(e)[0], s = Ea(r);
  return n.reduce((o, c) => lr(o, {
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
function zE({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return Kd(e) ? [
    ...KE({ inputs: t, outputs: n }),
    ...jc({ inputs: t, outputs: n, receipts: r })
  ] : zd(e) ? [
    ...jc({ inputs: t, outputs: n, receipts: r }),
    ...qE({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...jE({ inputs: t, receipts: r })
  ] : [...$E(n)];
}
var $n = (e) => {
  const t = fE(e);
  switch (t.type) {
    case Ae.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case Ae.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, eI = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, tI = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, nI = (e) => {
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
}, rI = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = nI(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, i = !0;
        break;
      case "FailureStatus":
        t = e.time, n = e.block.id, s = !0;
        break;
      case "SubmittedStatus":
        t = e.time, o = !0;
        break;
    }
  return {
    time: t,
    blockId: n,
    status: r,
    isStatusFailure: s,
    isStatusSuccess: i,
    isStatusPending: o
  };
};
function mi(e) {
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: c,
    abiMap: d = {},
    maxInputs: f,
    gasCosts: y
  } = e, p = Jd(n), b = X(o), F = zE({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: b,
    abiMap: d,
    maxInputs: f
  }), x = $d(i.type), { fee: C } = xE({
    gasUsed: p,
    rawPayload: b,
    consensusParameters: {
      gasCosts: y,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: R, isStatusPending: S, isStatusSuccess: Z, blockId: T, status: j, time: M } = rI(c), k = eI(n), O = tI(n);
  let P;
  return M && (P = No.fromTai64(M)), {
    id: t,
    fee: C,
    gasUsed: p,
    operations: F,
    type: x,
    blockId: T,
    time: M,
    status: j,
    receipts: n,
    mintedAssets: k,
    burnedAssets: O,
    isTypeMint: JE(i.type),
    isTypeCreate: Kd(i.type),
    isTypeScript: zd(i.type),
    isStatusFailure: R,
    isStatusSuccess: Z,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
function e0(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === Ae.LogData || s.type === Ae.Log) {
      const i = new sn(n[s.id] || t), o = s.type === Ae.Log ? new _("u64").encode(s.val0) : s.data, [c] = i.decodeLog(o, s.val1.toNumber());
      r.push(c);
    }
    return r;
  }, []);
}
var Fs = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    N(this, "id");
    /** Current provider */
    N(this, "provider");
    /** Gas used on the transaction */
    N(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    N(this, "gqlTransaction");
    N(this, "abis");
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
    const r = new Fs(e, t, n);
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
    return (t = new Cn().decode(
      J(e.rawPayload),
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
    var f;
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    ), r = ((f = t.receipts) == null ? void 0 : f.map($n)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), c = this.provider.getChain().consensusParameters.maxInputs;
    return mi({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: J(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: e,
      maxInputs: c,
      gasCosts: o
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
          D.TRANSACTION_SQUEEZED_OUT,
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
    if (this.abis && (r = e0(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r), n.isStatusFailure) {
      const {
        receipts: s,
        gqlTransaction: { status: i }
      } = n;
      throw Xd({
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
function sI(e, t) {
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
function t0(e, t, n = 0) {
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
      const d = sI(t, c);
      return await EE(d), t0(e, t, c)(...r);
    }
  };
}
var iI = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, oI = 10, aI = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: c, scriptParams: d, txParams: f, gasCosts: y } = r;
  return {
    name: t,
    baseChainHeight: Q(n),
    consensusParameters: {
      contractMaxSize: Q(i.contractMaxSize),
      maxInputs: Q(f.maxInputs),
      maxOutputs: Q(f.maxOutputs),
      maxWitnesses: Q(f.maxWitnesses),
      maxGasPerTx: Q(f.maxGasPerTx),
      maxScriptLength: Q(d.maxScriptLength),
      maxScriptDataLength: Q(d.maxScriptDataLength),
      maxStorageSlots: Q(i.maxStorageSlots),
      maxPredicateLength: Q(c.maxPredicateLength),
      maxPredicateDataLength: Q(c.maxPredicateDataLength),
      maxGasPerPredicate: Q(c.maxGasPerPredicate),
      gasPriceFactor: Q(o.gasPriceFactor),
      gasPerByte: Q(o.gasPerByte),
      maxMessageDataLength: Q(c.maxMessageDataLength),
      chainId: Q(r.chainId),
      gasCosts: y
    },
    gasCosts: y,
    latestBlock: {
      id: s.id,
      height: Q(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((p) => ({
        id: p.id
      }))
    }
  };
}, bo, n0, Xt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, pn(this, bo), ke(this, "operations"), ke(this, "cache"), ke(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new cE(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Xt.nodeInfoCache = {}, Xt.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return t0(async (...r) => {
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      let c = { ...i, signal: o };
      return e.requestMiddleware && (c = await e.requestMiddleware(c)), e.fetch ? e.fetch(s, c, e) : fetch(s, c);
    }, t);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(e, t = {}) {
    const n = new Xt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = Xt.chainInfoCache[this.url];
    if (!e)
      throw new v(
        D.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = Xt.nodeInfoCache[this.url];
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
    const { minGasPrice: e } = this.getNode(), { maxGasPerTx: t, maxGasPerPredicate: n, gasPriceFactor: r, gasPerByte: s, gasCosts: i } = this.getChain().consensusParameters;
    return {
      minGasPrice: e,
      maxGasPerTx: t,
      maxGasPerPredicate: n,
      gasPriceFactor: r,
      gasPerByte: s,
      gasCosts: i
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
    return Xt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = M0(e.nodeVersion);
    if (!t || !n)
      throw new v(
        v.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${e.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const e = Xt.getFetchFn(this.options), t = new Gp.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return oE((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new Hd({
        url: this.url,
        query: r,
        fetchFn: (c, d) => e(c, d, this.options),
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
   * @hidden
   *
   * Returns the network configuration of the connected Fuel node.
   *
   * @returns A promise that resolves to the network configuration object
   */
  async getNetwork() {
    const {
      name: e,
      consensusParameters: { chainId: t }
    } = await this.getChain(), n = new Nn(e, t.toNumber());
    return Promise.resolve(n);
  }
  /**
   * Returns the block number.
   *
   * @returns A promise that resolves to the block number
   */
  async getBlockNumber() {
    const { chain: e } = await this.operations.getChain();
    return Q(e.latestBlock.header.height, 10);
  }
  /**
   * Returns the chain information.
   * @param url - The URL of the Fuel node
   * @returns NodeInfo object
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: Q(e.maxDepth),
      maxTx: Q(e.maxTx),
      minGasPrice: Q(e.minGasPrice),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace,
      peers: e.peers
    };
    return Xt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = aI(e);
    return Xt.chainInfoCache[this.url] = t, t;
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
    const r = Mt(e);
    yo(this, bo, n0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = X(r.toTransactionBytes());
    let i;
    if (r.type === It.Script && (i = r.abis), n) {
      const c = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: y } of c) {
        if (y.type === "SqueezedOutStatus")
          throw new v(
            D.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${y.reason}`
          );
        if (y.type !== "SubmittedStatus")
          break;
      }
      const d = r.getTransactionId(this.getChainId()), f = new Fs(d, this, i);
      return await f.fetch(), f;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Fs(o, this, i);
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
    const r = Mt(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = X(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map($n)
    };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !Wu(J(i.predicate), J("0x")) && new Oe(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = X(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), {
      estimatePredicates: { inputs: s }
    } = r;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && Q(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
    }), e;
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @privateRemarks
   * TODO: Investigate support for missing contract IDs
   * TODO: Add support for missing output messages
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise.
   */
  async estimateTxDependencies(e) {
    if (e.type === It.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    await this.estimatePredicates(e);
    let t = [];
    const n = [];
    let r = 0;
    for (let s = 0; s < oI; s++) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: X(e.toTransactionBytes()),
        utxoValidation: !1
      });
      t = i.map($n);
      const { missingOutputVariables: o, missingOutputContractIds: c } = hE(t);
      if (o.length !== 0 || c.length !== 0)
        r += o.length, e.addVariableOutputs(o.length), c.forEach(({ contractId: f }) => {
          e.addContractInputAndOutput(he.fromString(f)), n.push(f);
        });
      else
        break;
    }
    return {
      receipts: t,
      outputVariables: r,
      missingContractIds: n
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
    const n = Mt(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = X(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map($n)
    };
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
  async getTransactionCost(e, t = [], {
    estimateTxDependencies: n = !0,
    estimatePredicates: r = !0,
    resourcesOwner: s,
    signatureCallback: i
  } = {}) {
    const o = Pr(Mt(e)), c = this.getChain(), { gasPriceFactor: d, minGasPrice: f, maxGasPerTx: y } = this.getGasConfig(), p = tl(o.gasPrice, f), b = o.type === It.Script, F = o.getCoinOutputsQuantities(), x = iI(F, t);
    o.fundWithFakeUtxos(x, s == null ? void 0 : s.address), r && (b && (o.gasLimit = Q(0)), s && "populateTransactionPredicateData" in s && s.populateTransactionPredicateData(o), await this.estimatePredicates(o)), i && b && await i(o);
    const C = o.calculateMinGas(c), R = o.calculateMaxGas(c, C);
    let S = [], Z = [], T = 0;
    if (b && n) {
      o.gasPrice = Q(0), o.gasLimit = Q(y.sub(R).toNumber() * 0.9);
      const P = await this.estimateTxDependencies(o);
      S = P.receipts, T = P.outputVariables, Z = P.missingContractIds;
    }
    const j = b ? Jd(S) : C, M = qn(
      j,
      p,
      d
    ).normalizeZeroToOne(), k = qn(C, p, d).normalizeZeroToOne(), O = qn(R, p, d).normalizeZeroToOne();
    return {
      requiredQuantities: x,
      receipts: S,
      gasUsed: j,
      minGasPrice: f,
      gasPrice: p,
      minGas: C,
      maxGas: R,
      usedFee: M,
      minFee: k,
      maxFee: O,
      estimatedInputs: o.inputs,
      outputVariables: T,
      missingContractIds: Z
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = he.fromAddressOrString(e), s = Mt(Pr(t)), i = await this.getTransactionCost(s, n);
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...c } = await this.getTransactionCost(
      s,
      n
    );
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...c
    };
  }
  /**
   * Returns coins for the given owner.
   */
  async getCoins(e, t, n) {
    const r = he.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && X(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: Q(o.amount),
      owner: he.fromAddressOrString(o.owner),
      maturity: Q(o.maturity).toNumber(),
      blockCreated: Q(o.blockCreated),
      txCreatedIdx: Q(o.txCreatedIdx)
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
    var d, f, y;
    const r = he.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((p) => X(p))) || [],
      utxos: ((f = n == null ? void 0 : n.utxos) == null ? void 0 : f.map((p) => X(p))) || []
    };
    if (this.cache) {
      const p = new Set(
        s.utxos.concat((y = this.cache) == null ? void 0 : y.getActiveData().map((b) => X(b)))
      );
      s.utxos = Array.from(p);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(ha).map(({ assetId: p, amount: b, max: F }) => ({
        assetId: X(p),
        amount: b.toString(10),
        max: F ? F.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((p) => {
      switch (p.__typename) {
        case "MessageCoin":
          return {
            amount: Q(p.amount),
            assetId: p.assetId,
            daHeight: Q(p.daHeight),
            sender: he.fromAddressOrString(p.sender),
            recipient: he.fromAddressOrString(p.recipient),
            nonce: p.nonce
          };
        case "Coin":
          return {
            id: p.utxoId,
            amount: Q(p.amount),
            assetId: p.assetId,
            owner: he.fromAddressOrString(p.owner),
            maturity: Q(p.maturity).toNumber(),
            blockCreated: Q(p.blockCreated),
            txCreatedIdx: Q(p.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((p) => !!p);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlock(e) {
    let t;
    typeof e == "number" ? t = { height: Q(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: Q(e).toString(10) };
    const { block: n } = await this.operations.getBlock(t);
    return n ? {
      id: n.id,
      height: Q(n.header.height),
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
      height: Q(r.header.height),
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
    typeof e == "number" ? t = { blockHeight: Q(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: n } = await this.operations.getBlockWithTransactions(t);
    return n ? {
      id: n.id,
      height: Q(n.header.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new Cn().decode(J(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new Cn().decode(
      J(t.rawPayload),
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
      contract: he.fromAddressOrString(e).toB256(),
      asset: X(t)
    });
    return Q(n.amount, 10);
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
      owner: he.fromAddressOrString(e).toB256(),
      assetId: X(t)
    });
    return Q(n.amount, 10);
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
      filter: { owner: he.fromAddressOrString(e).toB256() }
    })).balances.edges.map((s) => s.node).map((s) => ({
      assetId: s.assetId,
      amount: Q(s.amount)
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
      owner: he.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Mr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: Q(s.amount),
        data: s.data
      }),
      sender: he.fromAddressOrString(s.sender),
      recipient: he.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: Q(s.amount),
      data: Mr.decodeData(s.data),
      daHeight: Q(s.daHeight)
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
        D.INVALID_INPUT_PARAMETERS,
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
      commitBlockHeader: d,
      blockProof: f,
      sender: y,
      recipient: p,
      amount: b,
      data: F
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: Q(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: Q(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: c.id,
        daHeight: Q(c.daHeight),
        transactionsCount: Q(c.transactionsCount),
        transactionsRoot: c.transactionsRoot,
        height: Q(c.height),
        prevRoot: c.prevRoot,
        time: c.time,
        applicationHash: c.applicationHash,
        messageReceiptRoot: c.messageReceiptRoot,
        messageReceiptCount: Q(c.messageReceiptCount)
      },
      commitBlockHeader: {
        id: d.id,
        daHeight: Q(d.daHeight),
        transactionsCount: Q(d.transactionsCount),
        transactionsRoot: d.transactionsRoot,
        height: Q(d.height),
        prevRoot: d.prevRoot,
        time: d.time,
        applicationHash: d.applicationHash,
        messageReceiptRoot: d.messageReceiptRoot,
        messageReceiptCount: Q(d.messageReceiptCount)
      },
      sender: he.fromAddressOrString(y),
      recipient: he.fromAddressOrString(p),
      nonce: t,
      amount: Q(b),
      data: F
    };
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
      blocksToProduce: Q(e).toString(10),
      startTimestamp: t ? No.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return Q(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Fs(e, this);
  }
}, Vs = Xt;
bo = /* @__PURE__ */ new WeakSet();
n0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === we.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
ke(Vs, "chainInfoCache", {});
ke(Vs, "nodeInfoCache", {});
async function Jy(e) {
  var b;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      D.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Cn().decode(
    J(s.rawPayload),
    0
  ), o = ((b = s.receipts) == null ? void 0 : b.map($n)) || [], {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: f, gasCosts: y }
  } = n.getChain(), p = mi({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: J(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(c),
    gasPriceFactor: Q(d),
    abiMap: r,
    maxInputs: f,
    gasCosts: y
  });
  return {
    gqlTransaction: s,
    ...p
  };
}
async function Zy(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, f = n.toTransaction(), y = n.toTransactionBytes();
  return mi({
    receipts: s,
    transaction: f,
    transactionBytes: y,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: c
  });
}
async function Yy(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: f, gasCosts: y }
  } = n.getChain();
  return {
    transactions: i.map((b) => {
      const { node: F } = b, { id: x, rawPayload: C, receipts: R, status: S } = F, [Z] = new Cn().decode(J(C), 0), T = (R == null ? void 0 : R.map($n)) || [], j = mi({
        id: x,
        receipts: T,
        transaction: Z,
        transactionBytes: J(C),
        gqlTransactionStatus: S,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: d,
        maxInputs: f,
        gasCosts: y
      });
      return {
        gqlTransaction: F,
        ...j
      };
    }),
    pageInfo: o
  };
}
var Zn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, cI = (e) => {
  if (e === "ethereum")
    return Zn.eth.sepolia;
  if (e === "fuel")
    return Zn.fuel.beta5;
}, AI = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), r0 = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? cI(n);
  if (i === void 0)
    return;
  const o = AI({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, Vy = (e, t) => r0({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), Xy = (e, t) => r0({
  asset: e,
  networkType: "fuel",
  chainId: t
}), uI = "/", dI = /^\/|\/$/g, lI = (e = "") => e.replace(dI, "");
function hI(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(lI);
  return r && n && s.unshift(""), s.join(uI);
}
function jy(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: hI(t, n.icon)
  }));
}
var qy = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Zn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Zn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Zn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Zn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], fI = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new _("u64").encode(new Oe(n).toNumber());
  return Uint8Array.from([
    ...J(r),
    ...i,
    ...J(t)
  ]);
}, gI = async (e) => {
  const t = fI(e);
  await ua();
  const n = lm(16, 0, fm.ScriptData), r = Mc(17, 16, 32), s = Dr(18, 17, 0), i = Mc(19, 17, 8), o = um(16, 18, 19), c = Bd(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, wi = class extends Ju {
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
    N(this, "address");
    /**
     * The provider used to interact with the network.
     */
    N(this, "_provider");
    N(this, "_connector");
    this._provider = n, this._connector = r, this.address = he.fromDynamicInput(t);
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
        D.NOT_SUPPORTED,
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
        D.NOT_SUPPORTED,
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
  async getBalance(t = wt) {
    return await this.provider.getBalance(this.address, t);
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
        D.NOT_SUPPORTED,
        "Wallets containing more than 9999 balances exceed the current supported limit."
      );
    }
    return t;
  }
  /**
   * Adds resources to the transaction enough to fund it.
   *
   * @param request - The transaction request.
   * @param coinQuantities - The coin quantities required to execute the transaction.
   * @param fee - The estimated transaction fee.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund(t, n, r) {
    const s = pw({
      amount: Q(r),
      assetId: wt,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: p, assetId: b }) => {
      i[b] = {
        required: p,
        owned: Q(0)
      };
    });
    const o = [], c = [], d = this.address.toB256();
    t.inputs.forEach((p) => {
      if ("amount" in p)
        if ("owner" in p) {
          const x = String(p.assetId);
          if (p.owner === d && i[x]) {
            const C = Q(p.amount);
            i[x].owned = i[x].owned.add(C), o.push(p.id);
          }
        } else
          p.recipient === d && p.amount && i[wt] && (i[wt].owned = i[wt].owned.add(p.amount), c.push(p.nonce));
    });
    const f = [];
    if (Object.entries(i).forEach(([p, { owned: b, required: F }]) => {
      b.lt(F) && f.push({
        assetId: p,
        amount: F.sub(b)
      });
    }), f.length) {
      const p = await this.getResourcesToSpend(f, {
        messages: c,
        utxos: o
      });
      t.addResources(p);
    }
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r = wt, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, c = new Wn(o);
    c.addCoinOutput(he.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: f, gasUsed: y, estimatedInputs: p } = await this.provider.getTransactionCost(c, [], {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return c.gasPrice = Q(s.gasPrice ?? i), c.gasLimit = Q(s.gasLimit ?? y), this.validateGas({
      gasUsed: y,
      gasPrice: c.gasPrice,
      gasLimit: c.gasLimit,
      minGasPrice: i
    }), await this.fund(c, f, d), c.updatePredicateInputs(p), c;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(t, n, r = wt, s = {}) {
    if (Q(n).lte(0))
      throw new v(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = await this.createTransfer(t, n, r, s);
    return this.sendTransaction(i, { estimateTxDependencies: !1 });
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
  async transferToContract(t, n, r = wt, s = {}) {
    if (Q(n).lte(0))
      throw new v(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = he.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), c = { gasPrice: o, ...s }, { script: d, scriptData: f } = await gI({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: r
    }), y = new Wn({
      ...c,
      script: d,
      scriptData: f
    });
    y.addContractInputAndOutput(i);
    const { maxFee: p, requiredQuantities: b, gasUsed: F } = await this.provider.getTransactionCost(
      y,
      [{ amount: Q(n), assetId: String(r) }]
    );
    return y.gasLimit = Q(c.gasLimit ?? F), this.validateGas({
      gasUsed: F,
      gasPrice: y.gasPrice,
      gasLimit: y.gasLimit,
      minGasPrice: o
    }), await this.fund(y, b, p), this.sendTransaction(y);
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
    const { minGasPrice: s } = this.provider.getGasConfig(), i = he.fromAddressOrString(t), o = J(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), c = J(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), f = { script: new Uint8Array([
      ...J(vE.bytes),
      ...o,
      ...c
    ]), gasPrice: s, ...r }, y = new Wn(f), p = [{ amount: Q(n), assetId: wt }], { requiredQuantities: b, maxFee: F, gasUsed: x } = await this.provider.getTransactionCost(
      y,
      p
    );
    return y.gasLimit = Q(f.gasLimit ?? x), this.validateGas({
      gasUsed: x,
      gasPrice: y.gasPrice,
      gasLimit: y.gasLimit,
      minGasPrice: s
    }), await this.fund(y, b, F), this.sendTransaction(y);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new v(D.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
        D.MISSING_CONNECTOR,
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
    const s = Mt(t);
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
    const r = Mt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.simulate(r, { estimateTxDependencies: !1 });
  }
  validateGas({
    gasUsed: t,
    gasPrice: n,
    gasLimit: r,
    minGasPrice: s
  }) {
    if (s.gt(n))
      throw new v(
        D.GAS_PRICE_TOO_LOW,
        `Gas price '${n}' is lower than the required: '${s}'.`
      );
    if (t.gt(r))
      throw new v(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r}' is lower than the required: '${t}'.`
      );
  }
}, hr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    N(this, "address");
    N(this, "publicKey");
    N(this, "compressedPublicKey");
    N(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Ht(e, 32);
    this.privateKey = X(t), this.publicKey = X(hn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = X(hn.getPublicKey(t, !0)), this.address = he.fromPublicKey(this.publicKey);
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
    const t = hn.sign(J(e), J(this.privateKey)), n = Ht(`0x${t.r.toString(16)}`, 32), r = Ht(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, X(se([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = hn.ProjectivePoint.fromHex(J(this.compressedPublicKey)), n = hn.ProjectivePoint.fromHex(J(e));
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
    const n = J(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new hn.Signature(BigInt(X(r)), BigInt(X(s))).addRecoveryBit(
      i
    ).recoverPublicKey(J(e)).toRawBytes(!1).slice(1);
    return X(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return he.fromPublicKey(hr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? rn(se([Bn(32), J(e)])) : Bn(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = hn.ProjectivePoint.fromHex(J(e));
    return X(t.toRawBytes(!1).slice(1));
  }
}, qc = 13, Wc = 8, $c = 1, qi = 32, pI = 16, Kc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function mI(e, t, n) {
  const r = In(Kc(e), "hex"), s = he.fromAddressOrString(t), i = Bn(qi), o = au({
    password: In(n),
    salt: i,
    dklen: qi,
    n: 2 ** qc,
    r: Wc,
    p: $c
  }), c = Bn(pI), d = await Rf(r, o, c), f = Uint8Array.from([...o.subarray(16, 32), ...d]), y = cu(f), p = Qr(y, "hex"), b = {
    id: Vm(),
    version: 3,
    address: Kc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: p,
      cipherparams: { iv: Qr(c, "hex") },
      ciphertext: Qr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: qi,
        n: 2 ** qc,
        p: $c,
        r: Wc,
        salt: Qr(i, "hex")
      }
    }
  };
  return JSON.stringify(b);
}
async function wI(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: f, salt: y }
    }
  } = n, p = In(s, "hex"), b = In(i, "hex"), F = In(y, "hex"), x = In(t), C = au({
    password: x,
    salt: F,
    n: c,
    p: f,
    r: d,
    dklen: o
  }), R = Uint8Array.from([...C.subarray(16, 32), ...p]), S = cu(R), Z = Qr(S, "hex");
  if (r !== Z)
    throw new v(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await Nf(p, C, b);
  return X(T);
}
var s0 = class extends wi {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new hr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    N(this, "signer");
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
    const n = await this.signer().sign(_f(t));
    return X(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Mt(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return X(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = Mt(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    const s = Mt(t);
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
    const r = Mt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return mI(this.privateKey, this.address, t);
  }
};
ke(s0, "defaultPath", "m/44'/1179993420'/0'/0/0");
var hs = [
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
], EI = /* @__PURE__ */ ((e) => (e.english = "english", e))(EI || {});
function Qo(e) {
  const t = e.normalize("NFKD"), n = [];
  for (let r = 0; r < t.length; r += 1) {
    const s = t.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) === 55296) {
      r += 1;
      const i = t.charCodeAt(r);
      if (r >= t.length || (i & 64512) !== 56320)
        throw new v(
          D.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return Uint8Array.from(n);
}
function II(e) {
  return (1 << e) - 1;
}
function i0(e) {
  return (1 << e) - 1 << 8 - e;
}
function Wi(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function yI(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function BI(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & II(8 - n)), n += 3);
  const r = e.length / 4, s = J(Bt(e))[0] & i0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function CI(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = J(new Uint8Array(n));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const y = t.indexOf(e[f].normalize("NFKD"));
    if (y === -1)
      throw new v(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let p = 0; p < 11; p += 1)
      y & 1 << 10 - p && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = i0(o);
  if ((J(Bt(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new v(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var bI = Qo("Bitcoin seed"), QI = "0x0488ade4", vI = "0x04358394", zc = [12, 15, 18, 21, 24];
function eA(e) {
  if (e.length !== 2048)
    throw new v(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function xI(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function $i(e) {
  if (!zc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${zc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(D.INVALID_MNEMONIC, t);
  }
}
var fn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = hs) {
    N(this, "wordlist");
    this.wordlist = e, eA(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return fn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return fn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = hs) {
    const n = Wi(e);
    return $i(n), X(CI(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = hs) {
    const n = J(e);
    return eA(t), xI(n), BI(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    $i(Wi(e));
    const n = Qo(yI(e)), r = Qo(`mnemonic${t}`);
    return mr(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = fn.mnemonicToSeed(e, t);
    return fn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = Wi(e);
    let n = 0;
    try {
      $i(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (fn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = hs;
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
    const t = J(e);
    if (t.length < 16 || t.length > 64)
      throw new v(
        D.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return J(pr("sha512", bI, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = fn.masterKeysFromSeed(e), r = J(t ? vI : QI), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), f = se([
      r,
      s,
      i,
      o,
      c,
      se(["0x00", d])
    ]), y = ko(Bt(Bt(f)), 0, 4);
    return yA(se([f, y]));
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
    const n = t ? Bt(se([Bn(e), J(t)])) : Bn(e);
    return fn.entropyToMnemonic(n);
  }
}, ya = fn, o0 = 2147483648, a0 = X("0x0488ade4"), Ba = X("0x0488b21e"), c0 = X("0x04358394"), Ca = X("0x043587cf");
function tA(e) {
  return yA(se([e, ko(Bt(Bt(e)), 0, 4)]));
}
function FI(e = !1, t = !1) {
  return e ? t ? Ca : Ba : t ? c0 : a0;
}
function DI(e) {
  return [Ba, Ca].includes(X(e.slice(0, 4)));
}
function NI(e) {
  return [a0, c0, Ba, Ca].includes(
    X(e.slice(0, 4))
  );
}
function RI(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + o0 : parseInt(r, 10)
  );
}
var Tn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    N(this, "depth", 0);
    N(this, "index", 0);
    N(this, "fingerprint", X("0x00000000"));
    N(this, "parentFingerprint", X("0x00000000"));
    N(this, "privateKey");
    N(this, "publicKey");
    N(this, "chainCode");
    if (e.privateKey) {
      const t = new hr(e.privateKey);
      this.publicKey = X(t.compressedPublicKey), this.privateKey = X(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ko(Xr(Bt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && J(this.privateKey), n = J(this.publicKey), r = J(this.chainCode), s = new Uint8Array(37);
    if (e & o0) {
      if (!t)
        throw new v(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(J(this.publicKey));
    s.set(Ht(e, 4), 33);
    const i = J(pr("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const y = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", p = Q(o).add(t).mod(y).toBytes(32);
      return new Tn({
        privateKey: p,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new hr(X(o)).addPoint(n);
    return new Tn({
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
    return RI(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
    const n = FI(this.privateKey == null || e, t), r = X(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = _o(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? se(["0x00", this.privateKey]) : this.publicKey, d = J(se([n, r, s, i, o, c]));
    return tA(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = ya.masterKeysFromSeed(e);
    return new Tn({
      chainCode: J(t.slice(32)),
      privateKey: J(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = ll(gl(e)), n = J(t), r = tA(n.slice(0, 78)) === e;
    if (n.length !== 82 || !NI(n))
      throw new v(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = X(n.slice(5, 9)), o = parseInt(X(n.slice(9, 13)).substring(2), 16), c = X(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (DI(n)) {
      if (d[0] !== 3)
        throw new v(D.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Tn({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new v(D.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Tn({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Ki = Tn, A0 = class extends wi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new vt(e, this._provider);
  }
}, vt = class extends s0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new hr("0x00"), new A0(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = hr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new vt(t, e == null ? void 0 : e.provider);
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
    const s = Ki.fromSeed(e).derivePath(t || vt.defaultPath);
    return new vt(s.privateKey, n);
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
    const s = ya.mnemonicToSeed(e, n), o = Ki.fromSeed(s).derivePath(t || vt.defaultPath);
    return new vt(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = Ki.fromExtendedKey(e);
    return new vt(n.privateKey, t);
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
    const r = await wI(e, t);
    return new vt(r, n);
  }
}, Dt = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new A0(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new vt(e, t);
  }
};
ke(Dt, "generate", vt.generate);
ke(Dt, "fromSeed", vt.fromSeed);
ke(Dt, "fromMnemonic", vt.fromMnemonic);
ke(Dt, "fromExtendedKey", vt.fromExtendedKey);
ke(Dt, "fromEncryptedJson", vt.fromEncryptedJson);
var SI = class {
  constructor() {
    N(this, "storage", /* @__PURE__ */ new Map());
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
}, vn, u0 = class {
  constructor(e) {
    pn(this, vn, void 0), ke(this, "pathKey", "{}"), ke(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), ke(this, "numberOfAccounts", 0), Gt(this, vn, e.secret || ya.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: De(this, vn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Dt.fromMnemonic(De(this, vn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Dt.fromMnemonic(De(this, vn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = he.fromAddressOrString(e);
    do {
      const r = Dt.fromMnemonic(De(this, vn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new v(
      D.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Dt.fromPrivateKey(t);
  }
};
vn = /* @__PURE__ */ new WeakMap();
ke(u0, "type", "mnemonic");
var gn, d0 = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    pn(this, gn, []), e.secret ? Gt(this, gn, [e.secret]) : Gt(this, gn, e.accounts || [Dt.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: De(this, gn)
    };
  }
  getPublicAccount(e) {
    const t = Dt.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return De(this, gn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Dt.generate();
    return De(this, gn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = he.fromAddressOrString(e), n = De(this, gn).find(
      (r) => Dt.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new v(
        D.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Dt.fromPrivateKey(t);
  }
};
gn = /* @__PURE__ */ new WeakMap();
ke(d0, "type", "privateKey");
var Kt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function zt(e, t) {
  if (!e)
    throw new v(D.WALLET_MANAGER_ERROR, t);
}
var bt, xn, jt, vo, l0, xo, h0, f0 = class extends Ld.EventEmitter {
  constructor(e) {
    super(), pn(this, vo), pn(this, xo), ke(this, "storage", new SI()), ke(this, "STORAGE_KEY", "WalletManager"), pn(this, bt, []), pn(this, xn, ""), pn(this, jt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return De(this, jt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    zt(!De(this, jt), Kt.wallet_not_unlocked);
    const t = De(this, bt).find((n, r) => r === e);
    return zt(t, Kt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return De(this, bt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return De(this, bt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = he.fromAddressOrString(e), n = De(this, bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return zt(n, Kt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = he.fromAddressOrString(e);
    zt(!De(this, jt), Kt.wallet_not_unlocked);
    const n = De(this, bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return zt(n, Kt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = De(this, bt)[(e == null ? void 0 : e.vaultId) || 0];
    await zt(t, Kt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    De(this, bt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Gt(this, bt, De(this, bt).concat({
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
    Gt(this, jt, !0), Gt(this, bt, []), Gt(this, xn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Gt(this, xn, e), Gt(this, jt, !1);
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
    const n = De(this, jt);
    await this.unlock(e), Gt(this, xn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await zt(!De(this, jt), Kt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Ff(De(this, xn), JSON.parse(e));
      Gt(this, bt, yo(this, xo, h0).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await zt(!De(this, jt), Kt.wallet_not_unlocked);
    const e = await Df(De(this, xn), {
      vaults: yo(this, vo, l0).call(this, De(this, bt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = f0.Vaults.find((n) => n.type === e);
    return zt(t, Kt.invalid_vault_type), t;
  }
}, _I = f0;
bt = /* @__PURE__ */ new WeakMap();
xn = /* @__PURE__ */ new WeakMap();
jt = /* @__PURE__ */ new WeakMap();
vo = /* @__PURE__ */ new WeakSet();
l0 = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
xo = /* @__PURE__ */ new WeakSet();
h0 = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
ke(_I, "Vaults", [u0, d0]);
var kI = class {
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
ke(kI, "type");
var Wy = class {
}, MI = (e) => {
  const n = J(e), r = gA(n, 16384), s = Td(r.map((o) => X(o)));
  return rn(se(["0x4655454C", s]));
}, nA = class extends wi {
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
    const { predicateBytes: o, predicateInterface: c } = nA.processPredicateData(
      t,
      n,
      i
    ), d = he.fromB256(MI(o));
    super(d, r);
    N(this, "bytes");
    N(this, "predicateDataBytes", Uint8Array.from([]));
    N(this, "predicateData", []);
    N(this, "interface");
    this.bytes = o, this.interface = c, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    var s;
    const n = Mt(t), { policies: r } = pi.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === we.Coin && X(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
    }), n;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r = wt, s = {}) {
    const i = await super.createTransfer(t, n, r, s);
    return this.populateTransactionPredicateData(i);
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t, n) {
    const r = this.populateTransactionPredicateData(t);
    return super.sendTransaction(r, n);
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const n = this.populateTransactionPredicateData(t);
    return super.simulateTransaction(n);
  }
  getPredicateData(t) {
    var o;
    if (!this.predicateData.length)
      return new Uint8Array();
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Ie(this.bytes.length).encode(this.bytes), i = ai({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + ea + Jf + re + r.byteLength + t * re;
    return (n == null ? void 0 : n.encodeArguments(this.predicateData, i)) || new Uint8Array();
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
    let s = J(t), i;
    if (n && (i = new sn(n), i.functions.main === void 0))
      throw new v(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = nA.setConfigurableConstants(
      s,
      r,
      i
    )), {
      predicateBytes: s,
      predicateInterface: i
    };
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
        const { offset: c } = r.configurables[i], d = r.encodeConfigurable(i, o);
        s.set(d, c);
      });
    } catch (i) {
      throw new v(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, g0 = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(g0 || {}), ba = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(ba || {}), p0 = "FuelConnector", OI = class {
  constructor(e) {
    N(this, "storage");
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
}, LI = class extends Ld.EventEmitter {
  constructor() {
    super(...arguments);
    N(this, "name", "");
    N(this, "metadata", {});
    N(this, "connected", !1);
    N(this, "installed", !1);
    N(this, "events", ba);
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
function TI(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, c, d;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (c = t[r]) == null ? void 0 : c.value;
    clearTimeout((d = t[r]) == null ? void 0 : d.timeout);
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
function $y(e) {
  window.dispatchEvent(
    new CustomEvent(p0, {
      detail: e
    })
  );
}
function PI() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function fs(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var UI = 2e3, GI = 5e3, { warn: HI } = console, Rr = class extends LI {
  constructor(t = Rr.defaultConfig) {
    super();
    N(this, "_storage", null);
    N(this, "_connectors", []);
    N(this, "_targetObject", null);
    N(this, "_unsubscribes", []);
    N(this, "_targetUnsubscribe");
    N(this, "_pingCache", {});
    N(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    N(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = p0;
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
    N(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    N(this, "triggerConnectorEvents", async () => {
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
    N(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new OI(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(Rr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(g0).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      fs(t.isConnected()),
      fs(this.pingConnector(t))
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
      return await TI(async () => fs(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: GI
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(ba)), await ((o = this._storage) == null ? void 0 : o.setItem(Rr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = PI();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), fs(t.promise, UI).then(() => !0).catch(() => !1);
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
    return HI(
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
      n = await Vs.create(t.url);
    else {
      if (t)
        throw new v(D.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await Vs.create(r.url);
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
    return new wi(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Rr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, m0 = Rr;
ke(m0, "STORAGE_KEY", "fuel-current-connector");
ke(m0, "defaultConfig", {});
function rA(e, t) {
  if (!e)
    throw new v(D.TRANSACTION_ERROR, t);
}
function w0(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var qt, lA, E0 = (lA = class {
  constructor(...e) {
    lt(this, qt, void 0);
    Ct(this, qt, e || []);
  }
  entries() {
    return Ee(this, qt);
  }
  push(...e) {
    Ee(this, qt).push(...e);
  }
  concat(e) {
    return Ee(this, qt).concat(e);
  }
  extend(e) {
    Ee(this, qt).push(...e);
  }
  toBytes() {
    return se(
      Ee(this, qt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Ee(this, qt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, qt = new WeakMap(), lA), JI = (e) => ea + ai({ maxInputs: e }), I0 = re + Sr + Pf + re + re;
function ZI(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === Ae.ScriptResult ? n = i : (i.type === Ae.Return || i.type === Ae.ReturnData || i.type === Ae.Revert) && (r = i);
  }), !n || !r)
    throw new v(D.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function Qa(e, t, n = []) {
  var r;
  try {
    const s = ZI(e);
    return t(s);
  } catch (s) {
    throw s.code === D.SCRIPT_REVERTED ? Xd({
      logs: n,
      receipts: e.receipts,
      status: (r = e.gqlTransaction) == null ? void 0 : r.status
    }) : s;
  }
}
function YI(e, t, n) {
  return Qa(
    e,
    (r) => {
      if (r.returnReceipt.type === Ae.Revert)
        throw new v(
          D.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== Ae.Return && r.returnReceipt.type !== Ae.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new v(
          D.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: n,
            receipt: r.returnReceipt
          })}`
        );
      }
      let s;
      return r.returnReceipt.type === Ae.Return && (s = r.returnReceipt.val), r.returnReceipt.type === Ae.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var Gr = class {
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
    N(this, "bytes");
    /**
     * A function to encode the script data.
     */
    N(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    N(this, "scriptResultDecoder");
    this.bytes = J(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return ai({ maxInputs: t }) + ea + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Gr.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(e) {
    const t = this.scriptDataEncoder(e);
    return ArrayBuffer.isView(t) ? t : (this.bytes = J(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Qa(e, this.scriptResultDecoder, t);
  }
}, y0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, VI = Ne, B0 = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new E0(
    ds(16, e),
    ds(17, n),
    Dr(17, 17, 0),
    ds(18, r)
  );
  return t ? i.push(
    ds(19, t),
    Dr(19, 19, 0),
    kc(16, 17, 18, 19)
  ) : i.push(kc(16, 17, 18, _e.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Dr(21, _e.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Dr(22, _e.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    dm(22, 22, s.encodedLength),
    Am(21, 22)
  ]), i;
};
function sA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new E0();
  for (let r = 0; r < e.length; r += 1)
    n.extend(B0(e[r], t[r]).entries());
  return n.push(Bd(1)), n.toBytes();
}
var iA = (e) => e === Ae.Return || e === Ae.ReturnData, XI = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === Ae.Call && r === VI && s === t
), jI = (e, t) => (n) => {
  if (Ot(n.code) !== 0)
    throw new v(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = XI(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => iA(o)).flatMap((o, c, d) => {
    var f;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === Ae.Return)
      return [
        new _("u64").encode(o.val)
      ];
    if (o.type === Ae.ReturnData) {
      const y = J(o.data);
      if (t && iA((f = d[c + 1]) == null ? void 0 : f.type)) {
        const p = d[c + 1];
        return se([y, J(p.data)]);
      }
      return [y];
    }
    return [new Uint8Array()];
  });
}, qI = (e, t, n, r = []) => Qa(e, jI(t, n), r), WI = (e) => e.reduce(
  (t, n) => {
    const r = { ...y0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + B0(r, s).byteLength();
  },
  Lt.size()
  // placeholder for single RET instruction which is added later
), $I = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), oA = (e, t) => new Gr(
  // Script to call the contract, start with stub size matching length of calls
  sA(
    new Array(e.length).fill(y0),
    $I(e)
  ),
  (n) => {
    var x;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = WI(n), i = (8 - s % 8) % 8, o = s + i, c = JI(t.toNumber()) + o, d = [];
    let f = c;
    const y = [], p = [];
    for (let C = 0; C < r; C += 1) {
      const R = n[C];
      y.push({
        isHeap: R.isOutputDataHeap,
        encodedLength: R.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: f,
        assetIdOffset: f + re,
        gasForwardedOffset: R.gas ? f + re + Sr : 0,
        callDataOffset: f + re + Sr + S
      }), p.push(new _("u64").encode(R.amount || 0)), p.push(new G().encode(((x = R.assetId) == null ? void 0 : x.toString()) || wt)), p.push(R.contractId.toBytes()), p.push(new _("u64").encode(R.fnSelector)), R.gas && (p.push(new _("u64").encode(R.gas)), S = re), R.isInputDataPointer) {
        const T = f + I0 + S;
        p.push(new _("u64").encode(T));
      }
      const Z = J(R.data);
      p.push(Z), f = c + se(p).byteLength;
    }
    const b = sA(d, y);
    return { data: se(p), script: b };
  },
  () => [new Uint8Array()]
);
function KI(e) {
  const t = e.receipts.find((n) => n.type === Ae.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var C0 = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    N(this, "functionScopes");
    N(this, "isMultiCall");
    N(this, "gasUsed");
    N(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = KI(t);
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
    return w0(this.functionScopes);
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
      return YI(e, n, t);
    const s = qI(
      e,
      (n == null ? void 0 : n.program).id,
      (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1,
      t
    ).map((i, o) => {
      var d;
      const { func: c } = this.functionScopes[o].getCallConfig();
      return (d = c.decodeOutput(i)) == null ? void 0 : d[0];
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
    return e0(e, n, r);
  }
}, b0 = class extends C0 {
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
    N(this, "transactionId");
    N(this, "transactionResponse");
    N(this, "transactionResult");
    N(this, "program");
    N(this, "logs");
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
    return new b0(
      t,
      n,
      i,
      s,
      r
    );
  }
}, Ds = class extends C0 {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    N(this, "callResult");
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
    return await new Ds(t, n, r);
  }
};
function zI(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), c = e.getCallConfig().func.isInputDataPointer ? I0 : 0, d = i.encodeArguments(r, t + c);
  return {
    contractId: n.id,
    fnSelector: i.selector,
    data: d,
    isInputDataPointer: i.isInputDataPointer,
    isOutputDataHeap: i.outputMetadata.isHeapType,
    outputEncodedLength: i.outputMetadata.encodedLength,
    assetId: s == null ? void 0 : s.assetId,
    amount: s == null ? void 0 : s.amount,
    gas: o == null ? void 0 : o.gasLimit
  };
}
var Q0 = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    N(this, "transactionRequest");
    N(this, "program");
    N(this, "functionInvocationScopes", []);
    N(this, "txParameters");
    N(this, "requiredCoins", []);
    N(this, "isMultiCall", !1);
    N(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    N(this, "externalAbis", {});
    N(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Wn();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const t = this.getProvider().getChain().consensusParameters;
    if (!t)
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = t.maxInputs, r = oA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => zI(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = oA(this.functionInvocationScopes, e);
    this.transactionRequest.setScript(t, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId);
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
      amount: Q(t.amount || 0)
    })).filter(({ assetId: t, amount: n }) => t && !Q(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (n, { assetId: r, amount: s }) => {
      var o;
      const i = ((o = n.get(r)) == null ? void 0 : o.amount) || Q(0);
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
    await ua(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === It.Script && (this.transactionRequest.abis = w0(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), Q(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new v(
        D.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost ny dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
   */
  async getTransactionCost(e) {
    const t = this.getProvider(), n = await this.getTransactionRequest();
    return n.gasPrice = Q(Ot(n.gasPrice) || Ot((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
      resourcesOwner: this.program.account,
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins() {
    var d;
    const e = await this.getTransactionRequest(), {
      maxFee: t,
      gasUsed: n,
      minGasPrice: r,
      estimatedInputs: s,
      outputVariables: i,
      missingContractIds: o,
      requiredQuantities: c
    } = await this.getTransactionCost();
    return this.setDefaultTxParams(e, r, n), this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (f) => f.type !== we.Coin
    ), await ((d = this.program.account) == null ? void 0 : d.fund(this.transactionRequest, c, t)), this.transactionRequest.updatePredicateInputs(s), o.forEach((f) => {
      this.transactionRequest.addContractInputAndOutput(he.fromString(f));
    }), this.transactionRequest.addVariableOutputs(i), this.addSignersCallback && await this.addSignersCallback(this.transactionRequest), this;
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
    const t = this.transactionRequest, { minGasPrice: n } = this.getProvider().getGasConfig();
    return t.gasPrice = Q(e.gasPrice || t.gasPrice || n), t.gasLimit = Q(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? Q(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? Q(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
      he.fromAddressOrString(e),
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
    rA(this.program.account, "Wallet is required!"), await this.fundWithRequiredCoins();
    const e = await this.program.account.sendTransaction(
      await this.getTransactionRequest(),
      {
        awaitExecution: !0,
        estimateTxDependencies: !1
      }
    );
    return b0.build(
      this.functionInvocationScopes,
      e,
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
    if (rA(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        D.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    await this.fundWithRequiredCoins();
    const e = await this.program.account.simulateTransaction(
      await this.getTransactionRequest(),
      {
        estimateTxDependencies: !1
      }
    );
    return Ds.build(this.functionInvocationScopes, e, this.isMultiCall);
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
    return Ds.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return Ds.build(
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
   * In case the gasLimit and gasPrice are *not* set by the user, this method sets some default values.
   */
  setDefaultTxParams(e, t, n) {
    var c, d;
    const r = !!((c = this.txParameters) != null && c.gasLimit) || this.hasCallParamsGasLimit, s = !!((d = this.txParameters) != null && d.gasPrice), { gasLimit: i, gasPrice: o } = e;
    if (!r)
      e.gasLimit = n;
    else if (i.lt(n))
      throw new v(
        D.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${n}'.`
      );
    if (!s)
      e.gasPrice = t;
    else if (o.lt(t))
      throw new v(
        D.GAS_PRICE_TOO_LOW,
        `Gas price '${o}' is lower than the required: '${t}'.`
      );
  }
}, v0 = class extends Q0 {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    N(this, "func");
    N(this, "callParameters");
    N(this, "forward");
    N(this, "args");
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
          D.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = ha(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, ey = class extends Q0 {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t), this.validateHeapTypeReturnCalls();
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
  validateHeapTypeReturnCalls() {
    let e = -1, t = 0;
    this.calls.forEach((s, i) => {
      const { isOutputDataHeap: o } = s;
      if (o && (e = i, ++t > 1))
        throw new v(
          D.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new v(
        D.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, ty = class {
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
    N(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    N(this, "provider");
    /**
     * The contract's ABI interface.
     */
    N(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    N(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    N(this, "functions", {});
    this.interface = t instanceof sn ? t : new sn(t), this.id = he.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new v0(this, e, t);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new ey(this, e);
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
}, ny = class extends v0 {
  constructor() {
    super(...arguments);
    N(this, "scriptRequest");
  }
  updateScriptRequest() {
    this.scriptRequest || this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  buildScriptRequest() {
    const t = this.program.bytes, n = this.program.provider.getChain();
    if (!n)
      throw new v(
        v.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.maxInputs.toNumber(), s = new Ie(t.length).encodedLength;
    this.scriptRequest = new Gr(
      t,
      (i) => this.func.encodeArguments(
        i,
        Gr.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, Ky = class extends dg {
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
    N(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    N(this, "interface");
    /**
     * The account associated with the script.
     */
    N(this, "account");
    /**
     * The script request object.
     */
    N(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    N(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    N(this, "functions");
    this.bytes = J(t), this.interface = new sn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new ny(this, this.interface.getFunction("main"), s)
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
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Gr(
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
function zy(e) {
  return e;
}
var ry = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(ry || {}), sy = Object.defineProperty, iy = (e, t) => {
  for (var n in t)
    sy(e, n, { get: t[n], enumerable: !0 });
}, oy = {};
iy(oy, {
  getContractId: () => D0,
  getContractRoot: () => x0,
  getContractStorageRoot: () => F0,
  hexlifyWithPrefix: () => Fo
});
var x0 = (e) => {
  const n = J(e), r = gA(n, 16384);
  return Td(r.map((s) => X(s)));
}, F0 = (e) => {
  const t = new hw();
  return e.forEach(({ key: n, value: r }) => t.update(Bt(n), r)), t.root;
}, D0 = (e, t, n) => {
  const r = x0(J(e));
  return Bt(se(["0x4655454C", t, r, n]));
}, Fo = (e, t = !1) => {
  if (e.startsWith("0x"))
    return X(e);
  if (t)
    return X(`0x${e}`);
  throw new v(v.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, ay = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    N(this, "bytecode");
    N(this, "interface");
    N(this, "provider");
    N(this, "account");
    this.bytecode = J(e), t instanceof sn ? this.interface = t : this.interface = new sn(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new ay(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: c, value: d }) => ({
      key: Fo(c, !0),
      value: Fo(d, !0)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: Bn(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        D.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || F0(n.storageSlots), s = D0(this.bytecode, n.salt, r), i = new Co({
      gasPrice: 0,
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
      throw new v(D.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new ty(n, this.interface, this.account);
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = J(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new v(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, eB = 9, tB = 3, nB = 9, hA, rB = typeof process < "u" && ((hA = process == null ? void 0 : process.env) == null ? void 0 : hA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  Sr as ASSET_ID_LEN,
  Ju as AbstractAccount,
  Ag as AbstractAddress,
  ug as AbstractContract,
  Zu as AbstractProgram,
  dg as AbstractScript,
  yy as AbstractScriptRequest,
  wi as Account,
  he as Address,
  GE as AddressType,
  ft as ArrayCoder,
  G as B256Coder,
  xu as B512Coder,
  Oe as BN,
  wt as BaseAssetId,
  pi as BaseTransactionRequest,
  s0 as BaseWalletUnlocked,
  _ as BigNumberCoder,
  qf as BooleanCoder,
  Ie as ByteArrayCoder,
  _s as ByteCoder,
  Zn as CHAIN_IDS,
  Pf as CONTRACT_ID_LEN,
  Qy as CONTRACT_MAX_SIZE,
  HE as ChainName,
  Ty as ChangeOutputCollisionError,
  ie as Coder,
  ry as Commands,
  ty as Contract,
  ay as ContractFactory,
  oy as ContractUtils,
  Co as CreateTransactionRequest,
  nB as DECIMAL_UNITS,
  tB as DEFAULT_MIN_PRECISION,
  eB as DEFAULT_PRECISION,
  No as DateTime,
  By as EmptyRoot,
  Du as EnumCoder,
  rm as FAILED_ASSERT_EQ_SIGNAL,
  im as FAILED_ASSERT_NE_SIGNAL,
  sm as FAILED_ASSERT_SIGNAL,
  nm as FAILED_REQUIRE_SIGNAL,
  Ed as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Sy as FAILED_UNKNOWN_SIGNAL,
  Os as FUEL_BECH32_HRP_PREFIX,
  rB as FUEL_NETWORK_URL,
  m0 as Fuel,
  LI as FuelConnector,
  p0 as FuelConnectorEventType,
  ba as FuelConnectorEventTypes,
  g0 as FuelConnectorMethods,
  b0 as FunctionInvocationResult,
  v0 as FunctionInvocationScope,
  Ki as HDWallet,
  Jf as INPUT_COIN_FIXED_SIZE,
  Ts as InputCoder,
  oc as InputCoinCoder,
  Ls as InputContractCoder,
  Mr as InputMessageCoder,
  we as InputType,
  E0 as InstructionSet,
  sn as Interface,
  Ds as InvocationCallResult,
  C0 as InvocationResult,
  EI as Language,
  OI as LocalStorage,
  Ry as MAX_PREDICATE_DATA_LENGTH,
  Ny as MAX_PREDICATE_LENGTH,
  Fy as MAX_SCRIPT_DATA_LENGTH,
  xy as MAX_SCRIPT_LENGTH,
  Dy as MAX_STATIC_CONTRACTS,
  vy as MAX_WITNESSES,
  zc as MNEMONIC_SIZES,
  SI as MemoryStorage,
  ya as Mnemonic,
  u0 as MnemonicVault,
  ey as MultiCallInvocationScope,
  BE as NoWitnessAtIndexError,
  Py as NoWitnessByOwnerError,
  K as NumberCoder,
  UE as OperationName,
  ci as OptionCoder,
  cc as OutputChangeCoder,
  Us as OutputCoder,
  ac as OutputCoinCoder,
  Ps as OutputContractCoder,
  uc as OutputContractCreatedCoder,
  Be as OutputType,
  Ac as OutputVariableCoder,
  am as PANIC_DOC_URL,
  om as PANIC_REASONS,
  Gs as PoliciesCoder,
  Pt as PolicyType,
  nA as Predicate,
  d0 as PrivateKeyVault,
  Vs as Provider,
  $f as RawSliceCoder,
  uo as ReceiptBurnCoder,
  dc as ReceiptCallCoder,
  Cy as ReceiptCoder,
  pc as ReceiptLogCoder,
  mc as ReceiptLogDataCoder,
  Hs as ReceiptMessageOutCoder,
  Or as ReceiptMintCoder,
  fc as ReceiptPanicCoder,
  lc as ReceiptReturnCoder,
  hc as ReceiptReturnDataCoder,
  gc as ReceiptRevertCoder,
  Ic as ReceiptScriptResultCoder,
  wc as ReceiptTransferCoder,
  Ec as ReceiptTransferOutCoder,
  Ae as ReceiptType,
  ea as SCRIPT_FIXED_SIZE,
  Ky as Script,
  Gr as ScriptRequest,
  Wn as ScriptTransactionRequest,
  hr as Signer,
  _u as StdStringCoder,
  Wy as StorageAbstract,
  yc as StorageSlotCoder,
  Kf as StringCoder,
  Ai as StructCoder,
  Cn as TransactionCoder,
  Cc as TransactionCreateCoder,
  bc as TransactionMintCoder,
  Fs as TransactionResponse,
  Bc as TransactionScriptCoder,
  PE as TransactionStatus,
  It as TransactionType,
  TE as TransactionTypeName,
  ku as TupleCoder,
  ar as TxPointerCoder,
  by as UtxoIdCoder,
  kI as Vault,
  Mu as VecCoder,
  re as WORD_SIZE,
  Dt as Wallet,
  A0 as WalletLocked,
  _I as WalletManager,
  vt as WalletUnlocked,
  Js as WitnessCoder,
  Ne as ZeroBytes32,
  pw as addAmountToAsset,
  lr as addOperation,
  vr as addressify,
  J as arrayify,
  IE as assemblePanicError,
  fE as assembleReceiptByType,
  yE as assembleRevertError,
  mi as assembleTransactionSummary,
  rA as assert,
  qy as assets,
  Q as bn,
  In as bufferFromString,
  Ly as buildBlockExplorerUrl,
  TI as cacheFor,
  Yd as calculateMetadataGasForTxCreate,
  Vd as calculateMetadataGasForTxScript,
  qn as calculatePriceWithFactor,
  xE as calculateTransactionFee,
  ai as calculateVmTxMemory,
  Ay as capitalizeString,
  gA as chunkAndPadBytes,
  mg as clearFirst12BytesFromB256,
  ha as coinQuantityfy,
  se as concat,
  Zr as concatBytes,
  zy as createConfig,
  Ff as decrypt,
  Nf as decryptJsonWalletData,
  dy as defaultChainConfig,
  ly as defaultConsensusKey,
  PI as deferPromise,
  $y as dispatchFuelConnectorEvent,
  Df as encrypt,
  Rf as encryptJsonWalletData,
  hs as english,
  tI as extractBurnedAssetsFromReceipts,
  eI as extractMintedAssetsFromReceipts,
  Xd as extractTxError,
  fy as format,
  hy as formatUnits,
  na as fromBech32,
  mE as gasUsedByInputs,
  w0 as getAbisFromAllCalls,
  Vy as getAssetEth,
  Xy as getAssetFuel,
  Xu as getAssetId,
  AI as getAssetNetwork,
  r0 as getAssetWithNetwork,
  ra as getBytesFromBech32,
  qE as getContractCallOperations,
  KE as getContractCreatedOperations,
  e0 as getDecodedLogs,
  cI as getDefaultChainId,
  Jd as getGasUsedFromReceipts,
  Ea as getInputAccountAddress,
  kE as getInputContractFromIndex,
  qd as getInputFromAssetId,
  wa as getInputsByType,
  DE as getInputsByTypes,
  NE as getInputsCoin,
  SE as getInputsCoinAndMessage,
  _E as getInputsContract,
  RE as getInputsMessage,
  ma as getMaxGas,
  Zd as getMinGas,
  zE as getOperations,
  ns as getOutputsByType,
  OE as getOutputsChange,
  Wd as getOutputsCoin,
  LE as getOutputsContract,
  ME as getOutputsContractCreated,
  Uy as getOutputsVariable,
  $E as getPayProducerOperations,
  MI as getPredicateRoot,
  pg as getRandomB256,
  Ur as getReceiptsByType,
  ZE as getReceiptsCall,
  YE as getReceiptsMessageOut,
  Hy as getReceiptsTransferOut,
  hE as getReceiptsWithMissingData,
  nI as getTransactionStatusName,
  Jy as getTransactionSummary,
  Zy as getTransactionSummaryFromRequest,
  $d as getTransactionTypeName,
  Yy as getTransactionsSummaries,
  jc as getTransferOperations,
  jE as getWithdrawFromFuelOperations,
  Gy as hasSameAssetId,
  rn as hash,
  _f as hashMessage,
  X as hexlify,
  AE as inputify,
  co as isB256,
  Cs as isBech32,
  Vc as isCoin,
  Ao as isEvmAddress,
  Oy as isMessage,
  sc as isPublicKey,
  ky as isRawCoin,
  My as isRawMessage,
  Ia as isType,
  Kd as isTypeCreate,
  JE as isTypeMint,
  zd as isTypeScript,
  cu as keccak256,
  Iy as keyFromPassword,
  tl as max,
  gy as multiply,
  gg as normalizeBech32,
  wE as normalizeJSON,
  uy as normalizeString,
  uE as outputify,
  wg as padFirst12BytesOfEvmAddress,
  $n as processGqlReceipt,
  rI as processGraphqlStatus,
  Bn as randomBytes,
  yn as resolveGasDependentCosts,
  jy as resolveIconPaths,
  Xc as returnZeroScript,
  au as scrypt,
  Bt as sha256,
  EE as sleep,
  Eg as sortPolicies,
  Qr as stringFromBuffer,
  ic as toB256,
  Bs as toBech32,
  Ht as toBytes,
  el as toFixed,
  _o as toHex,
  Ot as toNumber,
  Mt as transactionRequestify,
  Sf as uint64ToBytesBE,
  hI as urlJoin,
  fs as withTimeout,
  vE as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
