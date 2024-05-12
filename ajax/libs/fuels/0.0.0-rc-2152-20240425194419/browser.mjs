var o0 = Object.defineProperty;
var a0 = (e, t, n) => t in e ? o0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var R = (e, t, n) => (a0(e, typeof t != "symbol" ? t + "" : t, n), n), Bi = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var xe = (e, t, n) => (Bi(e, t, "read from private field"), n ? n.call(e) : t.get(e)), mt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, qt = (e, t, n, r) => (Bi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var an = (e, t, n) => (Bi(e, t, "access private method"), n);
function jc() {
  return {
    FORC: "0.55.0",
    FUEL_CORE: "0.22.1",
    FUELS: "0.82.0"
  };
}
function ba(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function ho(e, t) {
  const n = ba(e), r = ba(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function c0(e, t) {
  const { major: n } = ho(e, t);
  return n === 0;
}
function A0(e, t) {
  const { minor: n } = ho(e, t);
  return n === 0;
}
function u0(e, t) {
  const { patch: n } = ho(e, t);
  return n === 0;
}
function d0(e) {
  const { FUEL_CORE: t } = jc();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: c0(e, t),
    isMinorSupported: A0(e, t),
    isPatchSupported: u0(e, t)
  };
}
var l0 = jc(), h0 = Object.defineProperty, f0 = (e, t, n) => t in e ? h0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, g0 = (e, t, n) => (f0(e, typeof t != "symbol" ? t + "" : t, n), n), D = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(D || {}), as = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    R(this, "VERSIONS", l0);
    R(this, "metadata");
    R(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new as(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(D);
    if (!r.includes(n.code))
      throw new as(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new as(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, v = as;
g0(v, "CODES", D);
var p0 = Object.defineProperty, m0 = (e, t, n) => t in e ? p0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, E0 = (e, t, n) => (m0(e, typeof t != "symbol" ? t + "" : t, n), n), II = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, qc = (e, t) => {
  const n = [];
  for (let A = 0; A < e.length; A += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(A, A + t)), n.push(d);
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
}, kr = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, se = (e) => {
  const t = e.map((n) => J(n));
  return kr(t);
}, Qa = "0123456789abcdef";
function j(e) {
  const t = J(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Qa[(s & 240) >> 4] + Qa[s & 15];
  }
  return n;
}
var yI = (e) => {
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
}, w0 = 37, Wc = BigInt(2 ** 62) + BigInt(w0), I0 = (e) => Math.floor(e / 1e3), $c = (e) => e * 1e3, y0 = (e) => Number(BigInt(e) - Wc), B0 = (e) => String(BigInt(e) + Wc), C0 = (e) => $c(y0(e)), cs = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new cs(C0(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new cs(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new cs($c(e));
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
    return B0(this.toUnixSeconds());
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
    return I0(this.getTime());
  }
}, fo = cs;
E0(fo, "TAI64_NULL", "");
var b0 = {
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
    },
    base_asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
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
}, BI = b0, CI = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298", Be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Q0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function go(e) {
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
var po = { exports: {} };
const v0 = {}, x0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: v0
}, Symbol.toStringTag, { value: "Module" })), F0 = /* @__PURE__ */ go(x0);
po.exports;
(function(e) {
  (function(t, n) {
    function r(B, a) {
      if (!B)
        throw new Error(a || "Assertion failed");
    }
    function s(B, a) {
      B.super_ = a;
      var c = function() {
      };
      c.prototype = a.prototype, B.prototype = new c(), B.prototype.constructor = B;
    }
    function i(B, a, c) {
      if (i.isBN(B))
        return B;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, B !== null && ((a === "le" || a === "be") && (c = a, a = 10), this._init(B || 0, a || 10, c || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = F0.Buffer;
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
      var f, w, I = 0;
      if (l === "be")
        for (p = a.length - 1, f = 0; p >= 0; p -= 3)
          w = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[f] |= w << I & 67108863, this.words[f + 1] = w >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, f++);
      else if (l === "le")
        for (p = 0, f = 0; p < a.length; p += 3)
          w = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[f] |= w << I & 67108863, this.words[f + 1] = w >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, f++);
      return this._strip();
    };
    function A(B, a) {
      var c = B.charCodeAt(a);
      if (c >= 48 && c <= 57)
        return c - 48;
      if (c >= 65 && c <= 70)
        return c - 55;
      if (c >= 97 && c <= 102)
        return c - 87;
      r(!1, "Invalid character in " + B);
    }
    function d(B, a, c) {
      var l = A(B, c);
      return c - 1 >= a && (l |= A(B, c - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, c, l) {
      this.length = Math.ceil((a.length - c) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f = 0, w = 0, I;
      if (l === "be")
        for (p = a.length - 1; p >= c; p -= 2)
          I = d(a, c, p) << f, this.words[w] |= I & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= I >>> 26) : f += 8;
      else {
        var g = a.length - c;
        for (p = g % 2 === 0 ? c + 1 : c; p < a.length; p += 2)
          I = d(a, c, p) << f, this.words[w] |= I & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= I >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(B, a, c, l) {
      for (var p = 0, f = 0, w = Math.min(B.length, c), I = a; I < w; I++) {
        var g = B.charCodeAt(I) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(a, c, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= c)
        p++;
      p--, f = f / c | 0;
      for (var w = a.length - l, I = w % p, g = Math.min(w, w - I) + l, u = 0, m = l; m < g; m += p)
        u = h(a, m, m + p, c), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (I !== 0) {
        var Y = 1;
        for (u = h(a, m, a.length, c), m = 0; m < I; m++)
          Y *= c;
        this.imuln(Y), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        a.words[c] = this.words[c];
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
    i.prototype.toString = function(a, c) {
      a = a || 10, c = c | 0 || 1;
      var l;
      if (a === 16 || a === "hex") {
        l = "";
        for (var p = 0, f = 0, w = 0; w < this.length; w++) {
          var I = this.words[w], g = ((I << p | f) & 16777215).toString(16);
          f = I >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, w--), f !== 0 || w !== this.length - 1 ? l = C[6 - g.length] + g + l : l = g + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % c !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = x[a], m = F[a];
        l = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var V = Y.modrn(m).toString(a);
          Y = Y.idivn(m), Y.isZero() ? l = V + l : l = C[u - V.length] + V + l;
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
    var b = function(a, c) {
      return a.allocUnsafe ? a.allocUnsafe(c) : new a(c);
    };
    i.prototype.toArrayLike = function(a, c, l) {
      this._strip();
      var p = this.byteLength(), f = l || Math.max(1, p);
      r(p <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var w = b(a, f), I = c === "le" ? "LE" : "BE";
      return this["_toArrayLike" + I](w, p), w;
    }, i.prototype._toArrayLikeLE = function(a, c) {
      for (var l = 0, p = 0, f = 0, w = 0; f < this.length; f++) {
        var I = this.words[f] << w | p;
        a[l++] = I & 255, l < a.length && (a[l++] = I >> 8 & 255), l < a.length && (a[l++] = I >> 16 & 255), w === 6 ? (l < a.length && (a[l++] = I >> 24 & 255), p = 0, w = 0) : (p = I >>> 24, w += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, c) {
      for (var l = a.length - 1, p = 0, f = 0, w = 0; f < this.length; f++) {
        var I = this.words[f] << w | p;
        a[l--] = I & 255, l >= 0 && (a[l--] = I >> 8 & 255), l >= 0 && (a[l--] = I >> 16 & 255), w === 6 ? (l >= 0 && (a[l--] = I >> 24 & 255), p = 0, w = 0) : (p = I >>> 24, w += 2);
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
    function N(B) {
      for (var a = new Array(B.bitLength()), c = 0; c < a.length; c++) {
        var l = c / 26 | 0, p = c % 26;
        a[c] = B.words[l] >>> p & 1;
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
      for (var w = 0, I = 0; I < f.length; I++)
        c = (p.words[I] | 0) - (f.words[I] | 0) + w, w = c >> 26, this.words[I] = c & 67108863;
      for (; w !== 0 && I < p.length; I++)
        c = (p.words[I] | 0) + w, w = c >> 26, this.words[I] = c & 67108863;
      if (w === 0 && I < p.length && p !== this)
        for (; I < p.length; I++)
          this.words[I] = p.words[I];
      return this.length = Math.max(this.length, I), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function _(B, a, c) {
      c.negative = a.negative ^ B.negative;
      var l = B.length + a.length | 0;
      c.length = l, l = l - 1 | 0;
      var p = B.words[0] | 0, f = a.words[0] | 0, w = p * f, I = w & 67108863, g = w / 67108864 | 0;
      c.words[0] = I;
      for (var u = 1; u < l; u++) {
        for (var m = g >>> 26, Y = g & 67108863, V = Math.min(u, a.length - 1), $ = Math.max(0, u - B.length + 1); $ <= V; $++) {
          var q = u - $ | 0;
          p = B.words[q] | 0, f = a.words[$] | 0, w = p * f + Y, m += w / 67108864 | 0, Y = w & 67108863;
        }
        c.words[u] = Y | 0, g = m | 0;
      }
      return g !== 0 ? c.words[u] = g | 0 : c.length--, c._strip();
    }
    var Z = function(a, c, l) {
      var p = a.words, f = c.words, w = l.words, I = 0, g, u, m, Y = p[0] | 0, V = Y & 8191, $ = Y >>> 13, q = p[1] | 0, ne = q & 8191, re = q >>> 13, Re = p[2] | 0, fe = Re & 8191, oe = Re >>> 13, Qe = p[3] | 0, ue = Qe & 8191, ge = Qe >>> 13, Gt = p[4] | 0, ve = Gt & 8191, Ie = Gt >>> 13, lr = p[5] | 0, Ne = lr & 8191, Me = lr >>> 13, qr = p[6] | 0, Te = qr & 8191, Le = qr >>> 13, da = p[7] | 0, Pe = da & 8191, Ue = da >>> 13, la = p[8] | 0, Ge = la & 8191, He = la >>> 13, ha = p[9] | 0, Je = ha & 8191, Ye = ha >>> 13, fa = f[0] | 0, Ze = fa & 8191, Ve = fa >>> 13, ga = f[1] | 0, Xe = ga & 8191, je = ga >>> 13, pa = f[2] | 0, qe = pa & 8191, We = pa >>> 13, ma = f[3] | 0, $e = ma & 8191, ze = ma >>> 13, Ea = f[4] | 0, Ke = Ea & 8191, et = Ea >>> 13, wa = f[5] | 0, tt = wa & 8191, nt = wa >>> 13, Ia = f[6] | 0, rt = Ia & 8191, st = Ia >>> 13, ya = f[7] | 0, it = ya & 8191, ot = ya >>> 13, Ba = f[8] | 0, at = Ba & 8191, ct = Ba >>> 13, Ca = f[9] | 0, At = Ca & 8191, ut = Ca >>> 13;
      l.negative = a.negative ^ c.negative, l.length = 19, g = Math.imul(V, Ze), u = Math.imul(V, Ve), u = u + Math.imul($, Ze) | 0, m = Math.imul($, Ve);
      var ri = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ri >>> 26) | 0, ri &= 67108863, g = Math.imul(ne, Ze), u = Math.imul(ne, Ve), u = u + Math.imul(re, Ze) | 0, m = Math.imul(re, Ve), g = g + Math.imul(V, Xe) | 0, u = u + Math.imul(V, je) | 0, u = u + Math.imul($, Xe) | 0, m = m + Math.imul($, je) | 0;
      var si = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (si >>> 26) | 0, si &= 67108863, g = Math.imul(fe, Ze), u = Math.imul(fe, Ve), u = u + Math.imul(oe, Ze) | 0, m = Math.imul(oe, Ve), g = g + Math.imul(ne, Xe) | 0, u = u + Math.imul(ne, je) | 0, u = u + Math.imul(re, Xe) | 0, m = m + Math.imul(re, je) | 0, g = g + Math.imul(V, qe) | 0, u = u + Math.imul(V, We) | 0, u = u + Math.imul($, qe) | 0, m = m + Math.imul($, We) | 0;
      var ii = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ii >>> 26) | 0, ii &= 67108863, g = Math.imul(ue, Ze), u = Math.imul(ue, Ve), u = u + Math.imul(ge, Ze) | 0, m = Math.imul(ge, Ve), g = g + Math.imul(fe, Xe) | 0, u = u + Math.imul(fe, je) | 0, u = u + Math.imul(oe, Xe) | 0, m = m + Math.imul(oe, je) | 0, g = g + Math.imul(ne, qe) | 0, u = u + Math.imul(ne, We) | 0, u = u + Math.imul(re, qe) | 0, m = m + Math.imul(re, We) | 0, g = g + Math.imul(V, $e) | 0, u = u + Math.imul(V, ze) | 0, u = u + Math.imul($, $e) | 0, m = m + Math.imul($, ze) | 0;
      var oi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (oi >>> 26) | 0, oi &= 67108863, g = Math.imul(ve, Ze), u = Math.imul(ve, Ve), u = u + Math.imul(Ie, Ze) | 0, m = Math.imul(Ie, Ve), g = g + Math.imul(ue, Xe) | 0, u = u + Math.imul(ue, je) | 0, u = u + Math.imul(ge, Xe) | 0, m = m + Math.imul(ge, je) | 0, g = g + Math.imul(fe, qe) | 0, u = u + Math.imul(fe, We) | 0, u = u + Math.imul(oe, qe) | 0, m = m + Math.imul(oe, We) | 0, g = g + Math.imul(ne, $e) | 0, u = u + Math.imul(ne, ze) | 0, u = u + Math.imul(re, $e) | 0, m = m + Math.imul(re, ze) | 0, g = g + Math.imul(V, Ke) | 0, u = u + Math.imul(V, et) | 0, u = u + Math.imul($, Ke) | 0, m = m + Math.imul($, et) | 0;
      var ai = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, g = Math.imul(Ne, Ze), u = Math.imul(Ne, Ve), u = u + Math.imul(Me, Ze) | 0, m = Math.imul(Me, Ve), g = g + Math.imul(ve, Xe) | 0, u = u + Math.imul(ve, je) | 0, u = u + Math.imul(Ie, Xe) | 0, m = m + Math.imul(Ie, je) | 0, g = g + Math.imul(ue, qe) | 0, u = u + Math.imul(ue, We) | 0, u = u + Math.imul(ge, qe) | 0, m = m + Math.imul(ge, We) | 0, g = g + Math.imul(fe, $e) | 0, u = u + Math.imul(fe, ze) | 0, u = u + Math.imul(oe, $e) | 0, m = m + Math.imul(oe, ze) | 0, g = g + Math.imul(ne, Ke) | 0, u = u + Math.imul(ne, et) | 0, u = u + Math.imul(re, Ke) | 0, m = m + Math.imul(re, et) | 0, g = g + Math.imul(V, tt) | 0, u = u + Math.imul(V, nt) | 0, u = u + Math.imul($, tt) | 0, m = m + Math.imul($, nt) | 0;
      var ci = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ci >>> 26) | 0, ci &= 67108863, g = Math.imul(Te, Ze), u = Math.imul(Te, Ve), u = u + Math.imul(Le, Ze) | 0, m = Math.imul(Le, Ve), g = g + Math.imul(Ne, Xe) | 0, u = u + Math.imul(Ne, je) | 0, u = u + Math.imul(Me, Xe) | 0, m = m + Math.imul(Me, je) | 0, g = g + Math.imul(ve, qe) | 0, u = u + Math.imul(ve, We) | 0, u = u + Math.imul(Ie, qe) | 0, m = m + Math.imul(Ie, We) | 0, g = g + Math.imul(ue, $e) | 0, u = u + Math.imul(ue, ze) | 0, u = u + Math.imul(ge, $e) | 0, m = m + Math.imul(ge, ze) | 0, g = g + Math.imul(fe, Ke) | 0, u = u + Math.imul(fe, et) | 0, u = u + Math.imul(oe, Ke) | 0, m = m + Math.imul(oe, et) | 0, g = g + Math.imul(ne, tt) | 0, u = u + Math.imul(ne, nt) | 0, u = u + Math.imul(re, tt) | 0, m = m + Math.imul(re, nt) | 0, g = g + Math.imul(V, rt) | 0, u = u + Math.imul(V, st) | 0, u = u + Math.imul($, rt) | 0, m = m + Math.imul($, st) | 0;
      var Ai = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ai >>> 26) | 0, Ai &= 67108863, g = Math.imul(Pe, Ze), u = Math.imul(Pe, Ve), u = u + Math.imul(Ue, Ze) | 0, m = Math.imul(Ue, Ve), g = g + Math.imul(Te, Xe) | 0, u = u + Math.imul(Te, je) | 0, u = u + Math.imul(Le, Xe) | 0, m = m + Math.imul(Le, je) | 0, g = g + Math.imul(Ne, qe) | 0, u = u + Math.imul(Ne, We) | 0, u = u + Math.imul(Me, qe) | 0, m = m + Math.imul(Me, We) | 0, g = g + Math.imul(ve, $e) | 0, u = u + Math.imul(ve, ze) | 0, u = u + Math.imul(Ie, $e) | 0, m = m + Math.imul(Ie, ze) | 0, g = g + Math.imul(ue, Ke) | 0, u = u + Math.imul(ue, et) | 0, u = u + Math.imul(ge, Ke) | 0, m = m + Math.imul(ge, et) | 0, g = g + Math.imul(fe, tt) | 0, u = u + Math.imul(fe, nt) | 0, u = u + Math.imul(oe, tt) | 0, m = m + Math.imul(oe, nt) | 0, g = g + Math.imul(ne, rt) | 0, u = u + Math.imul(ne, st) | 0, u = u + Math.imul(re, rt) | 0, m = m + Math.imul(re, st) | 0, g = g + Math.imul(V, it) | 0, u = u + Math.imul(V, ot) | 0, u = u + Math.imul($, it) | 0, m = m + Math.imul($, ot) | 0;
      var ui = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ui >>> 26) | 0, ui &= 67108863, g = Math.imul(Ge, Ze), u = Math.imul(Ge, Ve), u = u + Math.imul(He, Ze) | 0, m = Math.imul(He, Ve), g = g + Math.imul(Pe, Xe) | 0, u = u + Math.imul(Pe, je) | 0, u = u + Math.imul(Ue, Xe) | 0, m = m + Math.imul(Ue, je) | 0, g = g + Math.imul(Te, qe) | 0, u = u + Math.imul(Te, We) | 0, u = u + Math.imul(Le, qe) | 0, m = m + Math.imul(Le, We) | 0, g = g + Math.imul(Ne, $e) | 0, u = u + Math.imul(Ne, ze) | 0, u = u + Math.imul(Me, $e) | 0, m = m + Math.imul(Me, ze) | 0, g = g + Math.imul(ve, Ke) | 0, u = u + Math.imul(ve, et) | 0, u = u + Math.imul(Ie, Ke) | 0, m = m + Math.imul(Ie, et) | 0, g = g + Math.imul(ue, tt) | 0, u = u + Math.imul(ue, nt) | 0, u = u + Math.imul(ge, tt) | 0, m = m + Math.imul(ge, nt) | 0, g = g + Math.imul(fe, rt) | 0, u = u + Math.imul(fe, st) | 0, u = u + Math.imul(oe, rt) | 0, m = m + Math.imul(oe, st) | 0, g = g + Math.imul(ne, it) | 0, u = u + Math.imul(ne, ot) | 0, u = u + Math.imul(re, it) | 0, m = m + Math.imul(re, ot) | 0, g = g + Math.imul(V, at) | 0, u = u + Math.imul(V, ct) | 0, u = u + Math.imul($, at) | 0, m = m + Math.imul($, ct) | 0;
      var di = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (di >>> 26) | 0, di &= 67108863, g = Math.imul(Je, Ze), u = Math.imul(Je, Ve), u = u + Math.imul(Ye, Ze) | 0, m = Math.imul(Ye, Ve), g = g + Math.imul(Ge, Xe) | 0, u = u + Math.imul(Ge, je) | 0, u = u + Math.imul(He, Xe) | 0, m = m + Math.imul(He, je) | 0, g = g + Math.imul(Pe, qe) | 0, u = u + Math.imul(Pe, We) | 0, u = u + Math.imul(Ue, qe) | 0, m = m + Math.imul(Ue, We) | 0, g = g + Math.imul(Te, $e) | 0, u = u + Math.imul(Te, ze) | 0, u = u + Math.imul(Le, $e) | 0, m = m + Math.imul(Le, ze) | 0, g = g + Math.imul(Ne, Ke) | 0, u = u + Math.imul(Ne, et) | 0, u = u + Math.imul(Me, Ke) | 0, m = m + Math.imul(Me, et) | 0, g = g + Math.imul(ve, tt) | 0, u = u + Math.imul(ve, nt) | 0, u = u + Math.imul(Ie, tt) | 0, m = m + Math.imul(Ie, nt) | 0, g = g + Math.imul(ue, rt) | 0, u = u + Math.imul(ue, st) | 0, u = u + Math.imul(ge, rt) | 0, m = m + Math.imul(ge, st) | 0, g = g + Math.imul(fe, it) | 0, u = u + Math.imul(fe, ot) | 0, u = u + Math.imul(oe, it) | 0, m = m + Math.imul(oe, ot) | 0, g = g + Math.imul(ne, at) | 0, u = u + Math.imul(ne, ct) | 0, u = u + Math.imul(re, at) | 0, m = m + Math.imul(re, ct) | 0, g = g + Math.imul(V, At) | 0, u = u + Math.imul(V, ut) | 0, u = u + Math.imul($, At) | 0, m = m + Math.imul($, ut) | 0;
      var li = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (li >>> 26) | 0, li &= 67108863, g = Math.imul(Je, Xe), u = Math.imul(Je, je), u = u + Math.imul(Ye, Xe) | 0, m = Math.imul(Ye, je), g = g + Math.imul(Ge, qe) | 0, u = u + Math.imul(Ge, We) | 0, u = u + Math.imul(He, qe) | 0, m = m + Math.imul(He, We) | 0, g = g + Math.imul(Pe, $e) | 0, u = u + Math.imul(Pe, ze) | 0, u = u + Math.imul(Ue, $e) | 0, m = m + Math.imul(Ue, ze) | 0, g = g + Math.imul(Te, Ke) | 0, u = u + Math.imul(Te, et) | 0, u = u + Math.imul(Le, Ke) | 0, m = m + Math.imul(Le, et) | 0, g = g + Math.imul(Ne, tt) | 0, u = u + Math.imul(Ne, nt) | 0, u = u + Math.imul(Me, tt) | 0, m = m + Math.imul(Me, nt) | 0, g = g + Math.imul(ve, rt) | 0, u = u + Math.imul(ve, st) | 0, u = u + Math.imul(Ie, rt) | 0, m = m + Math.imul(Ie, st) | 0, g = g + Math.imul(ue, it) | 0, u = u + Math.imul(ue, ot) | 0, u = u + Math.imul(ge, it) | 0, m = m + Math.imul(ge, ot) | 0, g = g + Math.imul(fe, at) | 0, u = u + Math.imul(fe, ct) | 0, u = u + Math.imul(oe, at) | 0, m = m + Math.imul(oe, ct) | 0, g = g + Math.imul(ne, At) | 0, u = u + Math.imul(ne, ut) | 0, u = u + Math.imul(re, At) | 0, m = m + Math.imul(re, ut) | 0;
      var hi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (hi >>> 26) | 0, hi &= 67108863, g = Math.imul(Je, qe), u = Math.imul(Je, We), u = u + Math.imul(Ye, qe) | 0, m = Math.imul(Ye, We), g = g + Math.imul(Ge, $e) | 0, u = u + Math.imul(Ge, ze) | 0, u = u + Math.imul(He, $e) | 0, m = m + Math.imul(He, ze) | 0, g = g + Math.imul(Pe, Ke) | 0, u = u + Math.imul(Pe, et) | 0, u = u + Math.imul(Ue, Ke) | 0, m = m + Math.imul(Ue, et) | 0, g = g + Math.imul(Te, tt) | 0, u = u + Math.imul(Te, nt) | 0, u = u + Math.imul(Le, tt) | 0, m = m + Math.imul(Le, nt) | 0, g = g + Math.imul(Ne, rt) | 0, u = u + Math.imul(Ne, st) | 0, u = u + Math.imul(Me, rt) | 0, m = m + Math.imul(Me, st) | 0, g = g + Math.imul(ve, it) | 0, u = u + Math.imul(ve, ot) | 0, u = u + Math.imul(Ie, it) | 0, m = m + Math.imul(Ie, ot) | 0, g = g + Math.imul(ue, at) | 0, u = u + Math.imul(ue, ct) | 0, u = u + Math.imul(ge, at) | 0, m = m + Math.imul(ge, ct) | 0, g = g + Math.imul(fe, At) | 0, u = u + Math.imul(fe, ut) | 0, u = u + Math.imul(oe, At) | 0, m = m + Math.imul(oe, ut) | 0;
      var fi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (fi >>> 26) | 0, fi &= 67108863, g = Math.imul(Je, $e), u = Math.imul(Je, ze), u = u + Math.imul(Ye, $e) | 0, m = Math.imul(Ye, ze), g = g + Math.imul(Ge, Ke) | 0, u = u + Math.imul(Ge, et) | 0, u = u + Math.imul(He, Ke) | 0, m = m + Math.imul(He, et) | 0, g = g + Math.imul(Pe, tt) | 0, u = u + Math.imul(Pe, nt) | 0, u = u + Math.imul(Ue, tt) | 0, m = m + Math.imul(Ue, nt) | 0, g = g + Math.imul(Te, rt) | 0, u = u + Math.imul(Te, st) | 0, u = u + Math.imul(Le, rt) | 0, m = m + Math.imul(Le, st) | 0, g = g + Math.imul(Ne, it) | 0, u = u + Math.imul(Ne, ot) | 0, u = u + Math.imul(Me, it) | 0, m = m + Math.imul(Me, ot) | 0, g = g + Math.imul(ve, at) | 0, u = u + Math.imul(ve, ct) | 0, u = u + Math.imul(Ie, at) | 0, m = m + Math.imul(Ie, ct) | 0, g = g + Math.imul(ue, At) | 0, u = u + Math.imul(ue, ut) | 0, u = u + Math.imul(ge, At) | 0, m = m + Math.imul(ge, ut) | 0;
      var gi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (gi >>> 26) | 0, gi &= 67108863, g = Math.imul(Je, Ke), u = Math.imul(Je, et), u = u + Math.imul(Ye, Ke) | 0, m = Math.imul(Ye, et), g = g + Math.imul(Ge, tt) | 0, u = u + Math.imul(Ge, nt) | 0, u = u + Math.imul(He, tt) | 0, m = m + Math.imul(He, nt) | 0, g = g + Math.imul(Pe, rt) | 0, u = u + Math.imul(Pe, st) | 0, u = u + Math.imul(Ue, rt) | 0, m = m + Math.imul(Ue, st) | 0, g = g + Math.imul(Te, it) | 0, u = u + Math.imul(Te, ot) | 0, u = u + Math.imul(Le, it) | 0, m = m + Math.imul(Le, ot) | 0, g = g + Math.imul(Ne, at) | 0, u = u + Math.imul(Ne, ct) | 0, u = u + Math.imul(Me, at) | 0, m = m + Math.imul(Me, ct) | 0, g = g + Math.imul(ve, At) | 0, u = u + Math.imul(ve, ut) | 0, u = u + Math.imul(Ie, At) | 0, m = m + Math.imul(Ie, ut) | 0;
      var pi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (pi >>> 26) | 0, pi &= 67108863, g = Math.imul(Je, tt), u = Math.imul(Je, nt), u = u + Math.imul(Ye, tt) | 0, m = Math.imul(Ye, nt), g = g + Math.imul(Ge, rt) | 0, u = u + Math.imul(Ge, st) | 0, u = u + Math.imul(He, rt) | 0, m = m + Math.imul(He, st) | 0, g = g + Math.imul(Pe, it) | 0, u = u + Math.imul(Pe, ot) | 0, u = u + Math.imul(Ue, it) | 0, m = m + Math.imul(Ue, ot) | 0, g = g + Math.imul(Te, at) | 0, u = u + Math.imul(Te, ct) | 0, u = u + Math.imul(Le, at) | 0, m = m + Math.imul(Le, ct) | 0, g = g + Math.imul(Ne, At) | 0, u = u + Math.imul(Ne, ut) | 0, u = u + Math.imul(Me, At) | 0, m = m + Math.imul(Me, ut) | 0;
      var mi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (mi >>> 26) | 0, mi &= 67108863, g = Math.imul(Je, rt), u = Math.imul(Je, st), u = u + Math.imul(Ye, rt) | 0, m = Math.imul(Ye, st), g = g + Math.imul(Ge, it) | 0, u = u + Math.imul(Ge, ot) | 0, u = u + Math.imul(He, it) | 0, m = m + Math.imul(He, ot) | 0, g = g + Math.imul(Pe, at) | 0, u = u + Math.imul(Pe, ct) | 0, u = u + Math.imul(Ue, at) | 0, m = m + Math.imul(Ue, ct) | 0, g = g + Math.imul(Te, At) | 0, u = u + Math.imul(Te, ut) | 0, u = u + Math.imul(Le, At) | 0, m = m + Math.imul(Le, ut) | 0;
      var Ei = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, g = Math.imul(Je, it), u = Math.imul(Je, ot), u = u + Math.imul(Ye, it) | 0, m = Math.imul(Ye, ot), g = g + Math.imul(Ge, at) | 0, u = u + Math.imul(Ge, ct) | 0, u = u + Math.imul(He, at) | 0, m = m + Math.imul(He, ct) | 0, g = g + Math.imul(Pe, At) | 0, u = u + Math.imul(Pe, ut) | 0, u = u + Math.imul(Ue, At) | 0, m = m + Math.imul(Ue, ut) | 0;
      var wi = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (wi >>> 26) | 0, wi &= 67108863, g = Math.imul(Je, at), u = Math.imul(Je, ct), u = u + Math.imul(Ye, at) | 0, m = Math.imul(Ye, ct), g = g + Math.imul(Ge, At) | 0, u = u + Math.imul(Ge, ut) | 0, u = u + Math.imul(He, At) | 0, m = m + Math.imul(He, ut) | 0;
      var Ii = (I + g | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, g = Math.imul(Je, At), u = Math.imul(Je, ut), u = u + Math.imul(Ye, At) | 0, m = Math.imul(Ye, ut);
      var yi = (I + g | 0) + ((u & 8191) << 13) | 0;
      return I = (m + (u >>> 13) | 0) + (yi >>> 26) | 0, yi &= 67108863, w[0] = ri, w[1] = si, w[2] = ii, w[3] = oi, w[4] = ai, w[5] = ci, w[6] = Ai, w[7] = ui, w[8] = di, w[9] = li, w[10] = hi, w[11] = fi, w[12] = gi, w[13] = pi, w[14] = mi, w[15] = Ei, w[16] = wi, w[17] = Ii, w[18] = yi, I !== 0 && (w[19] = I, l.length++), l;
    };
    Math.imul || (Z = _);
    function L(B, a, c) {
      c.negative = a.negative ^ B.negative, c.length = B.length + a.length;
      for (var l = 0, p = 0, f = 0; f < c.length - 1; f++) {
        var w = p;
        p = 0;
        for (var I = l & 67108863, g = Math.min(f, a.length - 1), u = Math.max(0, f - B.length + 1); u <= g; u++) {
          var m = f - u, Y = B.words[m] | 0, V = a.words[u] | 0, $ = Y * V, q = $ & 67108863;
          w = w + ($ / 67108864 | 0) | 0, q = q + I | 0, I = q & 67108863, w = w + (q >>> 26) | 0, p += w >>> 26, w &= 67108863;
        }
        c.words[f] = I, l = w, w = p;
      }
      return l !== 0 ? c.words[f] = l : c.length--, c._strip();
    }
    function X(B, a, c) {
      return L(B, a, c);
    }
    i.prototype.mulTo = function(a, c) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = Z(this, a, c) : p < 63 ? l = _(this, a, c) : p < 1024 ? l = L(this, a, c) : l = X(this, a, c), l;
    }, i.prototype.mul = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), this.mulTo(a, c);
    }, i.prototype.mulf = function(a) {
      var c = new i(null);
      return c.words = new Array(this.length + a.length), X(this, a, c);
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
      var c = N(a);
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
          var I = this.words[f] & p, g = (this.words[f] | 0) - I << c;
          this.words[f] = g | w, w = I >>> 26 - c;
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
      var f = a % 26, w = Math.min((a - f) / 26, this.length), I = 67108863 ^ 67108863 >>> f << f, g = l;
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
        var Y = this.words[u] | 0;
        this.words[u] = m << 26 - f | Y >>> f, m = Y & I;
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
      var w, I = 0;
      for (f = 0; f < a.length; f++) {
        w = (this.words[f + l] | 0) + I;
        var g = (a.words[f] | 0) * c;
        w -= g & 67108863, I = (w >> 26) - (g / 67108864 | 0), this.words[f + l] = w & 67108863;
      }
      for (; f < this.length - l; f++)
        w = (this.words[f + l] | 0) + I, I = w >> 26, this.words[f + l] = w & 67108863;
      if (I === 0)
        return this._strip();
      for (r(I === -1), I = 0, f = 0; f < this.length; f++)
        w = -(this.words[f] | 0) + I, I = w >> 26, this.words[f] = w & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, c) {
      var l = this.length - a.length, p = this.clone(), f = a, w = f.words[f.length - 1] | 0, I = this._countBits(w);
      l = 26 - I, l !== 0 && (f = f.ushln(l), p.iushln(l), w = f.words[f.length - 1] | 0);
      var g = p.length - f.length, u;
      if (c !== "mod") {
        u = new i(null), u.length = g + 1, u.words = new Array(u.length);
        for (var m = 0; m < u.length; m++)
          u.words[m] = 0;
      }
      var Y = p.clone()._ishlnsubmul(f, 1, g);
      Y.negative === 0 && (p = Y, u && (u.words[g] = 1));
      for (var V = g - 1; V >= 0; V--) {
        var $ = (p.words[f.length + V] | 0) * 67108864 + (p.words[f.length + V - 1] | 0);
        for ($ = Math.min($ / w | 0, 67108863), p._ishlnsubmul(f, $, V); p.negative !== 0; )
          $--, p.negative = 0, p._ishlnsubmul(f, 1, V), p.isZero() || (p.negative ^= 1);
        u && (u.words[V] = $);
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
      for (var p = new i(1), f = new i(0), w = new i(0), I = new i(1), g = 0; c.isEven() && l.isEven(); )
        c.iushrn(1), l.iushrn(1), ++g;
      for (var u = l.clone(), m = c.clone(); !c.isZero(); ) {
        for (var Y = 0, V = 1; !(c.words[0] & V) && Y < 26; ++Y, V <<= 1)
          ;
        if (Y > 0)
          for (c.iushrn(Y); Y-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(u), f.isub(m)), p.iushrn(1), f.iushrn(1);
        for (var $ = 0, q = 1; !(l.words[0] & q) && $ < 26; ++$, q <<= 1)
          ;
        if ($ > 0)
          for (l.iushrn($); $-- > 0; )
            (w.isOdd() || I.isOdd()) && (w.iadd(u), I.isub(m)), w.iushrn(1), I.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(w), f.isub(I)) : (l.isub(c), w.isub(p), I.isub(f));
      }
      return {
        a: w,
        b: I,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var c = this, l = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var p = new i(1), f = new i(0), w = l.clone(); c.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var I = 0, g = 1; !(c.words[0] & g) && I < 26; ++I, g <<= 1)
          ;
        if (I > 0)
          for (c.iushrn(I); I-- > 0; )
            p.isOdd() && p.iadd(w), p.iushrn(1);
        for (var u = 0, m = 1; !(l.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(w), f.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), p.isub(f)) : (l.isub(c), f.isub(p));
      }
      var Y;
      return c.cmpn(1) === 0 ? Y = p : Y = f, Y.cmpn(0) < 0 && Y.iadd(a), Y;
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
        var I = this.words[w] | 0;
        I += f, f = I >>> 26, I &= 67108863, this.words[w] = I;
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
    var k = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function M(B, a) {
      this.name = B, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    M.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, M.prototype.ireduce = function(a) {
      var c = a, l;
      do
        this.split(c, this.tmp), c = this.imulK(c), c = c.iadd(this.tmp), l = c.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : c.ucmp(this.p);
      return p === 0 ? (c.words[0] = 0, c.length = 1) : p > 0 ? c.isub(this.p) : c.strip !== void 0 ? c.strip() : c._strip(), c;
    }, M.prototype.split = function(a, c) {
      a.iushrn(this.n, 0, c);
    }, M.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function O() {
      M.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(O, M), O.prototype.split = function(a, c) {
      for (var l = 4194303, p = Math.min(a.length, 9), f = 0; f < p; f++)
        c.words[f] = a.words[f];
      if (c.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var w = a.words[9];
      for (c.words[c.length++] = w & l, f = 10; f < a.length; f++) {
        var I = a.words[f] | 0;
        a.words[f - 10] = (I & l) << 4 | w >>> 22, w = I;
      }
      w >>>= 22, a.words[f - 10] = w, w === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, O.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var c = 0, l = 0; l < a.length; l++) {
        var p = a.words[l] | 0;
        c += p * 977, a.words[l] = c & 67108863, c = p * 64 + (c / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function P() {
      M.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(P, M);
    function W() {
      M.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(W, M);
    function U() {
      M.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(U, M), U.prototype.imulK = function(a) {
      for (var c = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + c, f = p & 67108863;
        p >>>= 26, a.words[l] = f, c = p;
      }
      return c !== 0 && (a.words[a.length++] = c), a;
    }, i._prime = function(a) {
      if (k[a])
        return k[a];
      var c;
      if (a === "k256")
        c = new O();
      else if (a === "p224")
        c = new P();
      else if (a === "p192")
        c = new W();
      else if (a === "p25519")
        c = new U();
      else
        throw new Error("Unknown prime " + a);
      return k[a] = c, c;
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
    }, H.prototype._verify2 = function(a, c) {
      r((a.negative | c.negative) === 0, "red works only with positives"), r(
        a.red && a.red === c.red,
        "red works only with red numbers"
      );
    }, H.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (y(a, a.umod(this.m)._forceRed(this)), a);
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
      var w = new i(1).toRed(this), I = w.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(I) !== 0; )
        u.redIAdd(I);
      for (var m = this.pow(u, p), Y = this.pow(a, p.addn(1).iushrn(1)), V = this.pow(a, p), $ = f; V.cmp(w) !== 0; ) {
        for (var q = V, ne = 0; q.cmp(w) !== 0; ne++)
          q = q.redSqr();
        r(ne < $);
        var re = this.pow(m, new i(1).iushln($ - ne - 1));
        Y = Y.redMul(re), m = re.redSqr(), V = V.redMul(m), $ = ne;
      }
      return Y;
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
      var w = p[0], I = 0, g = 0, u = c.bitLength() % 26;
      for (u === 0 && (u = 26), f = c.length - 1; f >= 0; f--) {
        for (var m = c.words[f], Y = u - 1; Y >= 0; Y--) {
          var V = m >> Y & 1;
          if (w !== p[0] && (w = this.sqr(w)), V === 0 && I === 0) {
            g = 0;
            continue;
          }
          I <<= 1, I |= V, g++, !(g !== l && (f !== 0 || Y !== 0)) && (w = this.mul(w, p[I]), g = 0, I = 0);
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
      return new K(a);
    };
    function K(B) {
      H.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(K, H), K.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, K.prototype.convertFrom = function(a) {
      var c = this.imod(a.mul(this.rinv));
      return c.red = null, c;
    }, K.prototype.imul = function(a, c) {
      if (a.isZero() || c.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(c), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, K.prototype.mul = function(a, c) {
      if (a.isZero() || c.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(c), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, K.prototype.invm = function(a) {
      var c = this.imod(a._invmp(this.m).mul(this.r2));
      return c._forceRed(this);
    };
  })(e, Be);
})(po);
var D0 = po.exports;
const Wr = /* @__PURE__ */ Q0(D0);
var zc = 9, Kc = 3, ki = 9;
function R0(e, t) {
  const { precision: n = zc, minPrecision: r = Kc } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, A = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const y = d.match(/.*[1-9]{1}/), E = (y == null ? void 0 : y[0].length) || 0, C = Math.max(r, E);
    d = d.slice(0, C);
  }
  const h = d ? `.${d}` : "";
  return `${A}${h}`;
}
var ke = class extends Wr {
  constructor(t, n, r) {
    let s = t, i = n;
    ke.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    R(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      units: n = ki,
      precision: r = zc,
      minPrecision: s = Kc
    } = t || {}, i = this.formatUnits(n), o = R0(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, A = "0"] = i.split("."), d = A.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${A.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = ki) {
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
    return new ke(super.sqr().toArray());
  }
  neg() {
    return new ke(super.neg().toArray());
  }
  abs() {
    return new ke(super.abs().toArray());
  }
  toTwos(t) {
    return new ke(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new ke(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new ke(t));
    return ke.isBN(r) ? new ke(r.toArray()) : r;
  }
  clone() {
    return new ke(this.toArray());
  }
  mulTo(t, n) {
    const r = new Wr(this.toArray()).mulTo(t, n);
    return new ke(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Wr(this.toArray()).egcd(t);
    return {
      a: new ke(n.toArray()),
      b: new ke(r.toArray()),
      gcd: new ke(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Wr(this.toArray()).divmod(new ke(t), n, r);
    return {
      div: new ke(s == null ? void 0 : s.toArray()),
      mod: new ke(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new ke(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new ke(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Q = (e, t, n) => new ke(e, t, n);
Q.parseUnits = (e, t = ki) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      D.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const A = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(A);
};
function Ft(e) {
  return Q(e).toNumber();
}
function mo(e, t) {
  return Q(e).toHex(t);
}
function Pt(e, t) {
  return Q(e).toBytes(t);
}
function bI(e, t) {
  return Q(e).formatUnits(t);
}
function QI(e, t) {
  return Q(e).format(t);
}
function N0(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function vI(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
const S0 = "6.7.1";
function _0(e, t, n) {
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
function M0(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && _0(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function kn(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(kn).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return kn(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${kn(n)}: ${kn(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function k0(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${kn(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + kn(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${S0}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return M0(r, { code: t }), n && Object.assign(r, n), r;
}
function Or(e, t, n, r) {
  if (!e)
    throw k0(t, n, r);
}
function wt(e, t, n, r) {
  Or(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const O0 = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function T0(e) {
  Or(O0.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function L0(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  wt(!1, "invalid BytesLike value", t || "value", e);
}
function rn(e, t) {
  return L0(e, t, !1);
}
const va = "0123456789abcdef";
function Ys(e) {
  const t = rn(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += va[(s & 240) >> 4] + va[s & 15];
  }
  return n;
}
function Eo(e, t, n) {
  const r = rn(e);
  return n != null && n > r.length && Or(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), Ys(r.slice(t ?? 0, n ?? r.length));
}
const P0 = BigInt(0);
BigInt(1);
const On = 9007199254740991;
function eA(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return wt(Number.isInteger(e), "underflow", t || "value", e), wt(e >= -On && e <= On, "overflow", t || "value", e), BigInt(e);
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return e[0] === "-" && e[1] !== "-" ? -BigInt(e.substring(1)) : BigInt(e);
      } catch (n) {
        wt(!1, `invalid BigNumberish string: ${n.message}`, t || "value", e);
      }
  }
  wt(!1, "invalid BigNumberish value", t || "value", e);
}
function U0(e, t) {
  const n = eA(e, t);
  return Or(n >= P0, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const xa = "0123456789abcdef";
function G0(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += xa[n >> 4], t += xa[n & 15];
    return BigInt(t);
  }
  return eA(e);
}
function tA(e, t) {
  switch (typeof e) {
    case "bigint":
      return wt(e >= -On && e <= On, "overflow", t || "value", e), Number(e);
    case "number":
      return wt(Number.isInteger(e), "underflow", t || "value", e), wt(e >= -On && e <= On, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return tA(BigInt(e), t);
      } catch (n) {
        wt(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  wt(!1, "invalid numeric value", t || "value", e);
}
function H0(e, t) {
  let r = U0(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = tA(t, "width");
    for (Or(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const Oi = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let $r = null;
function J0(e) {
  if ($r == null) {
    $r = {};
    for (let n = 0; n < Oi.length; n++)
      $r[Oi[n]] = BigInt(n);
  }
  const t = $r[e];
  return wt(t != null, "invalid base58 value", "letter", e), t;
}
const Y0 = BigInt(0), Ti = BigInt(58);
function nA(e) {
  let t = G0(rn(e)), n = "";
  for (; t; )
    n = Oi[Number(t % Ti)] + n, t /= Ti;
  return n;
}
function Z0(e) {
  let t = Y0;
  for (let n = 0; n < e.length; n++)
    t *= Ti, t += J0(e[n]);
  return t;
}
function V0(e, t, n, r, s) {
  wt(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function rA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function X0(e, t, n, r, s) {
  return e === "OVERLONG" ? (wt(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), rA(e, t, n));
}
const j0 = Object.freeze({
  error: V0,
  ignore: rA,
  replace: X0
});
function q0(e, t) {
  t == null && (t = j0.error);
  const n = rn(e, "bytes"), r = [];
  let s = 0;
  for (; s < n.length; ) {
    const i = n[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let o = null, A = null;
    if ((i & 224) === 192)
      o = 1, A = 127;
    else if ((i & 240) === 224)
      o = 2, A = 2047;
    else if ((i & 248) === 240)
      o = 3, A = 65535;
    else {
      (i & 192) === 128 ? s += t("UNEXPECTED_CONTINUE", s - 1, n, r) : s += t("BAD_PREFIX", s - 1, n, r);
      continue;
    }
    if (s - 1 + o >= n.length) {
      s += t("OVERRUN", s - 1, n, r);
      continue;
    }
    let d = i & (1 << 8 - o - 1) - 1;
    for (let h = 0; h < o; h++) {
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
      if (d <= A) {
        s += t("OVERLONG", s - 1 - o, n, r, d);
        continue;
      }
      r.push(d);
    }
  }
  return r;
}
function Tr(e, t) {
  t != null && (T0(t), e = e.normalize(t));
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
      wt(r < e.length && (i & 64512) === 56320, "invalid surrogate pair", "str", e);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function W0(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Lr(e, t) {
  return W0(q0(e, t));
}
function Li(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function $0(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function sA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function z0(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Li(e.outputLen), Li(e.blockLen);
}
function K0(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function el(e, t) {
  sA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Lt = {
  number: Li,
  bool: $0,
  bytes: sA,
  hash: z0,
  exists: K0,
  output: el
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const As = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ht = (e, t) => e << 32 - t | e >>> t, tl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!tl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function nl(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function Qr(e) {
  if (typeof e == "string" && (e = nl(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Pi = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const rl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function sl(e, t) {
  if (t !== void 0 && (typeof t != "object" || !rl(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function Pr(e) {
  const t = (r) => e().update(Qr(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
let iA = class extends Pi {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Lt.hash(t);
    const r = Qr(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Pi))
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
    return Lt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Lt.exists(this), Lt.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: A } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = A, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const wo = (e, t, n) => new iA(e, t).update(n).digest();
wo.create = (e, t) => new iA(e, t);
function il(e, t, n, r) {
  Lt.hash(e);
  const s = sl({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: A } = s;
  if (Lt.number(i), Lt.number(o), Lt.number(A), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Qr(t), h = Qr(n), y = new Uint8Array(o), E = wo.create(e, d), C = E._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: A, DK: y, PRF: E, PRFSalt: C };
}
function ol(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function al(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: A, PRFSalt: d } = il(e, t, n, r);
  let h;
  const y = new Uint8Array(4), E = As(y), C = new Uint8Array(A.outputLen);
  for (let x = 1, F = 0; F < i; x++, F += A.outputLen) {
    const b = o.subarray(F, F + A.outputLen);
    E.setInt32(0, x, !1), (h = d._cloneInto(h)).update(y).digestInto(C), b.set(C.subarray(0, b.length));
    for (let N = 1; N < s; N++) {
      A._cloneInto(h).update(C).digestInto(C);
      for (let _ = 0; _ < b.length; _++)
        b[_] ^= C[_];
    }
  }
  return ol(A, d, o, h, C);
}
function cl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), A = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, A, r);
}
let Io = class extends Pi {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = As(this.buffer);
  }
  update(t) {
    Lt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Qr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const A = Math.min(s - this.pos, i - o);
      if (A === s) {
        const d = As(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + A), this.pos), this.pos += A, o += A, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Lt.exists(this), Lt.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    cl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const A = As(t);
    this.get().forEach((d, h) => A.setUint32(4 * h, d, i));
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: A } = this;
    return t.length = s, t.pos = A, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
};
const Al = (e, t, n) => e & t ^ ~e & n, ul = (e, t, n) => e & t ^ e & n ^ t & n, dl = new Uint32Array([
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
]), cn = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), An = new Uint32Array(64);
let ll = class extends Io {
  constructor() {
    super(64, 32, 8, !1), this.A = cn[0] | 0, this.B = cn[1] | 0, this.C = cn[2] | 0, this.D = cn[3] | 0, this.E = cn[4] | 0, this.F = cn[5] | 0, this.G = cn[6] | 0, this.H = cn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: A, H: d } = this;
    return [t, n, r, s, i, o, A, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, A, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = A | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let E = 0; E < 16; E++, n += 4)
      An[E] = t.getUint32(n, !1);
    for (let E = 16; E < 64; E++) {
      const C = An[E - 15], x = An[E - 2], F = Ht(C, 7) ^ Ht(C, 18) ^ C >>> 3, b = Ht(x, 17) ^ Ht(x, 19) ^ x >>> 10;
      An[E] = b + An[E - 7] + F + An[E - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: A, F: d, G: h, H: y } = this;
    for (let E = 0; E < 64; E++) {
      const C = Ht(A, 6) ^ Ht(A, 11) ^ Ht(A, 25), x = y + C + Al(A, d, h) + dl[E] + An[E] | 0, b = (Ht(r, 2) ^ Ht(r, 13) ^ Ht(r, 22)) + ul(r, s, i) | 0;
      y = h, h = d, d = A, A = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, A = A + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, y = y + this.H | 0, this.set(r, s, i, o, A, d, h, y);
  }
  roundClean() {
    An.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const oA = Pr(() => new ll()), zr = BigInt(2 ** 32 - 1), Ui = BigInt(32);
function aA(e, t = !1) {
  return t ? { h: Number(e & zr), l: Number(e >> Ui & zr) } : { h: Number(e >> Ui & zr) | 0, l: Number(e & zr) | 0 };
}
function hl(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = aA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const fl = (e, t) => BigInt(e >>> 0) << Ui | BigInt(t >>> 0), gl = (e, t, n) => e >>> n, pl = (e, t, n) => e << 32 - n | t >>> n, ml = (e, t, n) => e >>> n | t << 32 - n, El = (e, t, n) => e << 32 - n | t >>> n, wl = (e, t, n) => e << 64 - n | t >>> n - 32, Il = (e, t, n) => e >>> n - 32 | t << 64 - n, yl = (e, t) => t, Bl = (e, t) => e, Cl = (e, t, n) => e << n | t >>> 32 - n, bl = (e, t, n) => t << n | e >>> 32 - n, Ql = (e, t, n) => t << n - 32 | e >>> 64 - n, vl = (e, t, n) => e << n - 32 | t >>> 64 - n;
function xl(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Fl = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Dl = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, Rl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Nl = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Sl = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), _l = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, he = {
  fromBig: aA,
  split: hl,
  toBig: fl,
  shrSH: gl,
  shrSL: pl,
  rotrSH: ml,
  rotrSL: El,
  rotrBH: wl,
  rotrBL: Il,
  rotr32H: yl,
  rotr32L: Bl,
  rotlSH: Cl,
  rotlSL: bl,
  rotlBH: Ql,
  rotlBL: vl,
  add: xl,
  add3L: Fl,
  add3H: Dl,
  add4L: Rl,
  add4H: Nl,
  add5H: _l,
  add5L: Sl
}, [Ml, kl] = he.split([
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
].map((e) => BigInt(e))), un = new Uint32Array(80), dn = new Uint32Array(80);
class yo extends Io {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: A, Dl: d, Eh: h, El: y, Fh: E, Fl: C, Gh: x, Gl: F, Hh: b, Hl: N } = this;
    return [t, n, r, s, i, o, A, d, h, y, E, C, x, F, b, N];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, A, d, h, y, E, C, x, F, b, N) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = A | 0, this.Dl = d | 0, this.Eh = h | 0, this.El = y | 0, this.Fh = E | 0, this.Fl = C | 0, this.Gh = x | 0, this.Gl = F | 0, this.Hh = b | 0, this.Hl = N | 0;
  }
  process(t, n) {
    for (let L = 0; L < 16; L++, n += 4)
      un[L] = t.getUint32(n), dn[L] = t.getUint32(n += 4);
    for (let L = 16; L < 80; L++) {
      const X = un[L - 15] | 0, k = dn[L - 15] | 0, M = he.rotrSH(X, k, 1) ^ he.rotrSH(X, k, 8) ^ he.shrSH(X, k, 7), O = he.rotrSL(X, k, 1) ^ he.rotrSL(X, k, 8) ^ he.shrSL(X, k, 7), P = un[L - 2] | 0, W = dn[L - 2] | 0, U = he.rotrSH(P, W, 19) ^ he.rotrBH(P, W, 61) ^ he.shrSH(P, W, 6), H = he.rotrSL(P, W, 19) ^ he.rotrBL(P, W, 61) ^ he.shrSL(P, W, 6), K = he.add4L(O, H, dn[L - 7], dn[L - 16]), B = he.add4H(K, M, U, un[L - 7], un[L - 16]);
      un[L] = B | 0, dn[L] = K | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: A, Cl: d, Dh: h, Dl: y, Eh: E, El: C, Fh: x, Fl: F, Gh: b, Gl: N, Hh: _, Hl: Z } = this;
    for (let L = 0; L < 80; L++) {
      const X = he.rotrSH(E, C, 14) ^ he.rotrSH(E, C, 18) ^ he.rotrBH(E, C, 41), k = he.rotrSL(E, C, 14) ^ he.rotrSL(E, C, 18) ^ he.rotrBL(E, C, 41), M = E & x ^ ~E & b, O = C & F ^ ~C & N, P = he.add5L(Z, k, O, kl[L], dn[L]), W = he.add5H(P, _, X, M, Ml[L], un[L]), U = P | 0, H = he.rotrSH(r, s, 28) ^ he.rotrBH(r, s, 34) ^ he.rotrBH(r, s, 39), K = he.rotrSL(r, s, 28) ^ he.rotrBL(r, s, 34) ^ he.rotrBL(r, s, 39), B = r & i ^ r & A ^ i & A, a = s & o ^ s & d ^ o & d;
      _ = b | 0, Z = N | 0, b = x | 0, N = F | 0, x = E | 0, F = C | 0, { h: E, l: C } = he.add(h | 0, y | 0, W | 0, U | 0), h = A | 0, y = d | 0, A = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const c = he.add3L(U, K, a);
      r = he.add3H(c, W, H, B), s = c | 0;
    }
    ({ h: r, l: s } = he.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = he.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: A, l: d } = he.add(this.Ch | 0, this.Cl | 0, A | 0, d | 0), { h, l: y } = he.add(this.Dh | 0, this.Dl | 0, h | 0, y | 0), { h: E, l: C } = he.add(this.Eh | 0, this.El | 0, E | 0, C | 0), { h: x, l: F } = he.add(this.Fh | 0, this.Fl | 0, x | 0, F | 0), { h: b, l: N } = he.add(this.Gh | 0, this.Gl | 0, b | 0, N | 0), { h: _, l: Z } = he.add(this.Hh | 0, this.Hl | 0, _ | 0, Z | 0), this.set(r, s, i, o, A, d, h, y, E, C, x, F, b, N, _, Z);
  }
  roundClean() {
    un.fill(0), dn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class Ol extends yo {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class Tl extends yo {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const cA = Pr(() => new yo());
Pr(() => new Ol());
Pr(() => new Tl());
function Ll() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const Fa = Ll();
Fa.crypto || Fa.msCrypto;
function Pl(e, t) {
  const n = { sha256: oA, sha512: cA }[e];
  return wt(n != null, "invalid hmac algorithm", "algorithm", e), wo.create(n, t);
}
function Ul(e, t, n, r, s) {
  const i = { sha256: oA, sha512: cA }[s];
  return wt(i != null, "invalid pbkdf2 algorithm", "algorithm", s), al(i, e, t, { c: n, dkLen: r });
}
let AA = !1;
const uA = function(e, t, n) {
  return Pl(e, t).update(n).digest();
};
let dA = uA;
function Ar(e, t, n) {
  const r = rn(t, "key"), s = rn(n, "data");
  return Ys(dA(e, r, s));
}
Ar._ = uA;
Ar.lock = function() {
  AA = !0;
};
Ar.register = function(e) {
  if (AA)
    throw new Error("computeHmac is locked");
  dA = e;
};
Object.freeze(Ar);
const Gl = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), lA = Uint8Array.from({ length: 16 }, (e, t) => t), Hl = lA.map((e) => (9 * e + 5) % 16);
let Bo = [lA], Co = [Hl];
for (let e = 0; e < 4; e++)
  for (let t of [Bo, Co])
    t.push(t[e].map((n) => Gl[n]));
const hA = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Jl = Bo.map((e, t) => e.map((n) => hA[t][n])), Yl = Co.map((e, t) => e.map((n) => hA[t][n])), Zl = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), Vl = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), Kr = (e, t) => e << t | e >>> 32 - t;
function Da(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const es = new Uint32Array(16);
class Xl extends Io {
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
      es[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, A = this.h2 | 0, d = A, h = this.h3 | 0, y = h, E = this.h4 | 0, C = E;
    for (let x = 0; x < 5; x++) {
      const F = 4 - x, b = Zl[x], N = Vl[x], _ = Bo[x], Z = Co[x], L = Jl[x], X = Yl[x];
      for (let k = 0; k < 16; k++) {
        const M = Kr(r + Da(x, i, A, h) + es[_[k]] + b, L[k]) + E | 0;
        r = E, E = h, h = Kr(A, 10) | 0, A = i, i = M;
      }
      for (let k = 0; k < 16; k++) {
        const M = Kr(s + Da(F, o, d, y) + es[Z[k]] + N, X[k]) + C | 0;
        s = C, C = y, y = Kr(d, 10) | 0, d = o, o = M;
      }
    }
    this.set(this.h1 + A + y | 0, this.h2 + h + C | 0, this.h3 + E + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    es.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const jl = Pr(() => new Xl());
let fA = !1;
const gA = function(e) {
  return jl(e);
};
let pA = gA;
function Ur(e) {
  const t = rn(e, "data");
  return Ys(pA(t));
}
Ur._ = gA;
Ur.lock = function() {
  fA = !0;
};
Ur.register = function(e) {
  if (fA)
    throw new TypeError("ripemd160 is locked");
  pA = e;
};
Object.freeze(Ur);
let mA = !1;
const EA = function(e, t, n, r, s) {
  return Ul(e, t, n, r, s);
};
let wA = EA;
function ur(e, t, n, r, s) {
  const i = rn(e, "password"), o = rn(t, "salt");
  return Ys(wA(i, o, n, r, s));
}
ur._ = EA;
ur.lock = function() {
  mA = !0;
};
ur.register = function(e) {
  if (mA)
    throw new Error("pbkdf2 is locked");
  wA = e;
};
Object.freeze(ur);
function xt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function ql(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function bo(e, ...t) {
  if (!ql(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function IA(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  xt(e.outputLen), xt(e.blockLen);
}
function $n(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function yA(e, t) {
  bo(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Ci = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const us = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function BA(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ds = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Jt = (e, t) => e << 32 - t | e >>> t, Wl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Wl)
  throw new Error("Non little-endian hardware is not supported");
function $l(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function zn(e) {
  if (typeof e == "string" && (e = $l(e)), !BA(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function zl(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!BA(s))
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
class Qo {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const Kl = {}.toString;
function CA(e, t) {
  if (t !== void 0 && Kl.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function bA(e) {
  const t = (r) => e().update(zn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function eh(e = 32) {
  if (Ci && typeof Ci.getRandomValues == "function")
    return Ci.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function th(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), A = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, A, r);
}
class nh extends Qo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ds(this.buffer);
  }
  update(t) {
    $n(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = zn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const A = Math.min(s - this.pos, i - o);
      if (A === s) {
        const d = ds(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + A), this.pos), this.pos += A, o += A, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    $n(this), yA(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let E = o; E < s; E++)
      n[E] = 0;
    th(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const A = ds(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, y = this.get();
    if (h > y.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let E = 0; E < h; E++)
      A.setUint32(4 * E, y[E], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: A } = this;
    return t.length = s, t.pos = A, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const rh = (e, t, n) => e & t ^ ~e & n, sh = (e, t, n) => e & t ^ e & n ^ t & n, ih = /* @__PURE__ */ new Uint32Array([
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
]), ln = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), hn = /* @__PURE__ */ new Uint32Array(64);
class oh extends nh {
  constructor() {
    super(64, 32, 8, !1), this.A = ln[0] | 0, this.B = ln[1] | 0, this.C = ln[2] | 0, this.D = ln[3] | 0, this.E = ln[4] | 0, this.F = ln[5] | 0, this.G = ln[6] | 0, this.H = ln[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: A, H: d } = this;
    return [t, n, r, s, i, o, A, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, A, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = A | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let E = 0; E < 16; E++, n += 4)
      hn[E] = t.getUint32(n, !1);
    for (let E = 16; E < 64; E++) {
      const C = hn[E - 15], x = hn[E - 2], F = Jt(C, 7) ^ Jt(C, 18) ^ C >>> 3, b = Jt(x, 17) ^ Jt(x, 19) ^ x >>> 10;
      hn[E] = b + hn[E - 7] + F + hn[E - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: A, F: d, G: h, H: y } = this;
    for (let E = 0; E < 64; E++) {
      const C = Jt(A, 6) ^ Jt(A, 11) ^ Jt(A, 25), x = y + C + rh(A, d, h) + ih[E] + hn[E] | 0, b = (Jt(r, 2) ^ Jt(r, 13) ^ Jt(r, 22)) + sh(r, s, i) | 0;
      y = h, h = d, d = A, A = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, A = A + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, y = y + this.H | 0, this.set(r, s, i, o, A, d, h, y);
  }
  roundClean() {
    hn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Gr = /* @__PURE__ */ bA(() => new oh());
class QA extends Qo {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, IA(t);
    const r = zn(n);
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
    return $n(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    $n(this), bo(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: A } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = A, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const vo = (e, t, n) => new QA(e, t).update(n).digest();
vo.create = (e, t) => new QA(e, t);
function ah(e, t, n, r) {
  IA(e);
  const s = CA({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: A } = s;
  if (xt(i), xt(o), xt(A), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = zn(t), h = zn(n), y = new Uint8Array(o), E = vo.create(e, d), C = E._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: A, DK: y, PRF: E, PRFSalt: C };
}
function ch(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function vA(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: A, PRFSalt: d } = ah(e, t, n, r);
  let h;
  const y = new Uint8Array(4), E = ds(y), C = new Uint8Array(A.outputLen);
  for (let x = 1, F = 0; F < i; x++, F += A.outputLen) {
    const b = o.subarray(F, F + A.outputLen);
    E.setInt32(0, x, !1), (h = d._cloneInto(h)).update(y).digestInto(C), b.set(C.subarray(0, b.length));
    for (let N = 1; N < s; N++) {
      A._cloneInto(h).update(C).digestInto(C);
      for (let _ = 0; _ < b.length; _++)
        b[_] ^= C[_];
    }
  }
  return ch(A, d, o, h, C);
}
const me = (e, t) => e << t | e >>> 32 - t;
function Ra(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], A = e[t++] ^ n[r++], d = e[t++] ^ n[r++], h = e[t++] ^ n[r++], y = e[t++] ^ n[r++], E = e[t++] ^ n[r++], C = e[t++] ^ n[r++], x = e[t++] ^ n[r++], F = e[t++] ^ n[r++], b = e[t++] ^ n[r++], N = e[t++] ^ n[r++], _ = e[t++] ^ n[r++], Z = e[t++] ^ n[r++], L = e[t++] ^ n[r++], X = e[t++] ^ n[r++], k = e[t++] ^ n[r++], M = o, O = A, P = d, W = h, U = y, H = E, K = C, B = x, a = F, c = b, l = N, p = _, f = Z, w = L, I = X, g = k;
  for (let u = 0; u < 8; u += 2)
    U ^= me(M + f | 0, 7), a ^= me(U + M | 0, 9), f ^= me(a + U | 0, 13), M ^= me(f + a | 0, 18), c ^= me(H + O | 0, 7), w ^= me(c + H | 0, 9), O ^= me(w + c | 0, 13), H ^= me(O + w | 0, 18), I ^= me(l + K | 0, 7), P ^= me(I + l | 0, 9), K ^= me(P + I | 0, 13), l ^= me(K + P | 0, 18), W ^= me(g + p | 0, 7), B ^= me(W + g | 0, 9), p ^= me(B + W | 0, 13), g ^= me(p + B | 0, 18), O ^= me(M + W | 0, 7), P ^= me(O + M | 0, 9), W ^= me(P + O | 0, 13), M ^= me(W + P | 0, 18), K ^= me(H + U | 0, 7), B ^= me(K + H | 0, 9), U ^= me(B + K | 0, 13), H ^= me(U + B | 0, 18), p ^= me(l + c | 0, 7), a ^= me(p + l | 0, 9), c ^= me(a + p | 0, 13), l ^= me(c + a | 0, 18), f ^= me(g + I | 0, 7), w ^= me(f + g | 0, 9), I ^= me(w + f | 0, 13), g ^= me(I + w | 0, 18);
  s[i++] = o + M | 0, s[i++] = A + O | 0, s[i++] = d + P | 0, s[i++] = h + W | 0, s[i++] = y + U | 0, s[i++] = E + H | 0, s[i++] = C + K | 0, s[i++] = x + B | 0, s[i++] = F + a | 0, s[i++] = b + c | 0, s[i++] = N + l | 0, s[i++] = _ + p | 0, s[i++] = Z + f | 0, s[i++] = L + w | 0, s[i++] = X + I | 0, s[i++] = k + g | 0;
}
function bi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let A = 0; A < 16; A++)
    n[o + A] = e[t + (2 * s - 1) * 16 + A];
  for (let A = 0; A < s; A++, i += 16, t += 16)
    Ra(n, o, e, t, n, i), A > 0 && (o += 16), Ra(n, i, e, t += 16, n, o);
}
function Ah(e, t, n) {
  const r = CA({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: A, asyncTick: d, maxmem: h, onProgress: y } = r;
  if (xt(s), xt(i), xt(o), xt(A), xt(d), xt(h), y !== void 0 && typeof y != "function")
    throw new Error("progressCb should be function");
  const E = 128 * i, C = E / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (E / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / E)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (A < 0 || A > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const x = E * (s + o);
  if (x > h)
    throw new Error(`Scrypt: parameters too large, ${x} (128 * r * (N + p)) > ${h} (maxmem)`);
  const F = vA(Gr, e, t, { c: 1, dkLen: E * o }), b = us(F), N = us(new Uint8Array(E * s)), _ = us(new Uint8Array(E));
  let Z = () => {
  };
  if (y) {
    const L = 2 * s * o, X = Math.max(Math.floor(L / 1e4), 1);
    let k = 0;
    Z = () => {
      k++, y && (!(k % X) || k === L) && y(k / L);
    };
  }
  return { N: s, r: i, p: o, dkLen: A, blockSize32: C, V: N, B32: b, B: F, tmp: _, blockMixCb: Z, asyncTick: d };
}
function uh(e, t, n, r, s) {
  const i = vA(Gr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function dh(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: A, V: d, B32: h, B: y, tmp: E, blockMixCb: C } = Ah(e, t, n);
  for (let x = 0; x < i; x++) {
    const F = A * x;
    for (let b = 0; b < A; b++)
      d[b] = h[F + b];
    for (let b = 0, N = 0; b < r - 1; b++)
      bi(d, N, d, N += A, s), C();
    bi(d, (r - 1) * A, h, F, s), C();
    for (let b = 0; b < r; b++) {
      const N = h[F + A - 16] % r;
      for (let _ = 0; _ < A; _++)
        E[_] = h[F + _] ^ d[N * A + _];
      bi(E, 0, h, F, s), C();
    }
  }
  return uh(e, o, y, d, E);
}
const ts = /* @__PURE__ */ BigInt(2 ** 32 - 1), Na = /* @__PURE__ */ BigInt(32);
function lh(e, t = !1) {
  return t ? { h: Number(e & ts), l: Number(e >> Na & ts) } : { h: Number(e >> Na & ts) | 0, l: Number(e & ts) | 0 };
}
function hh(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = lh(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const fh = (e, t, n) => e << n | t >>> 32 - n, gh = (e, t, n) => t << n | e >>> 32 - n, ph = (e, t, n) => t << n - 32 | e >>> 64 - n, mh = (e, t, n) => e << n - 32 | t >>> 64 - n, [xA, FA, DA] = [[], [], []], Eh = /* @__PURE__ */ BigInt(0), hr = /* @__PURE__ */ BigInt(1), wh = /* @__PURE__ */ BigInt(2), Ih = /* @__PURE__ */ BigInt(7), yh = /* @__PURE__ */ BigInt(256), Bh = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = hr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], xA.push(2 * (5 * r + n)), FA.push((e + 1) * (e + 2) / 2 % 64);
  let s = Eh;
  for (let i = 0; i < 7; i++)
    t = (t << hr ^ (t >> Ih) * Bh) % yh, t & wh && (s ^= hr << (hr << /* @__PURE__ */ BigInt(i)) - hr);
  DA.push(s);
}
const [Ch, bh] = /* @__PURE__ */ hh(DA, !0), Sa = (e, t, n) => n > 32 ? ph(e, t, n) : fh(e, t, n), _a = (e, t, n) => n > 32 ? mh(e, t, n) : gh(e, t, n);
function Qh(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const A = (o + 8) % 10, d = (o + 2) % 10, h = n[d], y = n[d + 1], E = Sa(h, y, 1) ^ n[A], C = _a(h, y, 1) ^ n[A + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= E, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const A = FA[o], d = Sa(s, i, A), h = _a(s, i, A), y = xA[o];
      s = e[y], i = e[y + 1], e[y] = d, e[y + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let A = 0; A < 10; A++)
        n[A] = e[o + A];
      for (let A = 0; A < 10; A++)
        e[o + A] ^= ~n[(A + 2) % 10] & n[(A + 4) % 10];
    }
    e[0] ^= Ch[r], e[1] ^= bh[r];
  }
  n.fill(0);
}
class xo extends Qo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, xt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = us(this.state);
  }
  keccak() {
    Qh(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    $n(this);
    const { blockLen: n, state: r } = this;
    t = zn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let A = 0; A < o; A++)
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
    $n(this, !1), bo(t), this.finish();
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
    if (yA(t, this), this.finished)
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
    return t || (t = new xo(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const vh = (e, t, n) => bA(() => new xo(t, e, n)), xh = /* @__PURE__ */ vh(1, 136, 256 / 8);
var Fh = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return dh(t, n, { N: r, r: i, p: s, dkLen: o });
}, Dh = (e) => xh(e), Gn = (e, t = "base64") => {
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
}, { crypto: Zs, btoa: RA } = globalThis;
if (!Zs)
  throw new v(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!RA)
  throw new v(
    D.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Gi = (e) => Zs.getRandomValues(new Uint8Array(e)), ls = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return RA(n);
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
}, NA = "AES-CTR", Fo = (e, t) => {
  const n = Gn(String(e).normalize("NFKC"), "utf-8"), r = ur(n, t, 1e5, 32, "sha256");
  return J(r);
}, Rh = async (e, t) => {
  const n = Gi(16), r = Gi(32), s = Fo(e, r), i = JSON.stringify(t), o = Gn(i, "utf-8"), A = {
    name: NA,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, A, !1, ["encrypt"]), h = await crypto.subtle.encrypt(A, d, o);
  return {
    data: ls(h),
    iv: ls(n),
    salt: ls(r)
  };
}, Nh = async (e, t) => {
  const n = Gn(t.iv), r = Gn(t.salt), s = Fo(e, r), i = Gn(t.data), o = {
    name: NA,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, A, i), h = new TextDecoder().decode(d);
  try {
    return JSON.parse(h);
  } catch {
    throw new v(D.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Sh = async (e, t, n) => {
  const r = Zs.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, A = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    A,
    o
  );
  return new Uint8Array(d);
}, _h = async (e, t, n) => {
  const r = Zs.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, A = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    A,
    o
  );
  return new Uint8Array(d);
}, Mh = {
  bufferFromString: Gn,
  stringFromBuffer: ls,
  decrypt: Nh,
  encrypt: Rh,
  keyFromPassword: Fo,
  randomBytes: Gi,
  scrypt: Fh,
  keccak256: Dh,
  decryptJsonWalletData: _h,
  encryptJsonWalletData: Sh
}, kh = Mh, {
  bufferFromString: In,
  decrypt: Oh,
  encrypt: Th,
  keyFromPassword: NI,
  randomBytes: Xt,
  stringFromBuffer: mr,
  scrypt: SA,
  keccak256: _A,
  decryptJsonWalletData: Lh,
  encryptJsonWalletData: Ph
} = kh;
function It(e) {
  return j(Gr(J(e)));
}
function sn(e) {
  return It(e);
}
function Uh(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function Gh(e) {
  return sn(In(e, "utf-8"));
}
var Hh = Object.defineProperty, Jh = (e, t, n) => t in e ? Hh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Hr = (e, t, n) => (Jh(e, typeof t != "symbol" ? t + "" : t, n), n), Yh = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, MA = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, kA = (e, t, n) => (Yh(e, t, "access private method"), n), ie = class {
  constructor(e, t, n) {
    R(this, "name");
    R(this, "type");
    R(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, OA = "u8", TA = "u16", LA = "u32", PA = "u64", UA = "u256", GA = "raw untyped ptr", HA = "raw untyped slice", JA = "bool", YA = "b256", ZA = "struct B512", Do = "enum Option", Ro = "struct Vec", No = "struct Bytes", So = "struct String", VA = "str", _o = /str\[(?<length>[0-9]+)\]/, Bs = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Mo = /^struct (?<name>\w+)$/, ko = /^enum (?<name>\w+)$/, XA = /^\((?<items>.*)\)$/, Zh = /^generic (?<name>\w+)$/, Ut = "0", Kn = "1", ee = 8, Bn = 32, Hi = Bn + 1, er = Bn, jA = Bn, Vh = Bn, Xh = ee * 4, jh = ee * 2, Oo = 2 ** 32 - 1, Vs = ({ maxInputs: e }) => Bn + // Tx ID
ee + // Tx size
// Asset ID/Balance coin input pairs
e * (er + ee), To = ee + // Identifier
ee + // Gas limit
ee + // Script size
ee + // Script data size
ee + // Policies
ee + // Inputs size
ee + // Outputs size
ee + // Witnesses size
Bn, qh = ee + // Identifier
Xh + // Utxo Length
ee + // Output Index
Vh + // Owner
ee + // Amount
er + // Asset id
jh + // TxPointer
ee + // Witnesses index
ee + // Maturity
ee + // Predicate size
ee + // Predicate data size
ee, Wh = {
  u64: ee,
  u256: ee * 4
}, S = class extends ie {
  constructor(e) {
    super("bigNumber", e, Wh[e]);
  }
  encode(e) {
    let t;
    try {
      t = Pt(e, this.encodedLength);
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
}, $h = 3, Et = $h * ee, zh = 2, Ma = zh * ee;
function Dt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const A = o.dynamicData;
    A && Object.entries(A).forEach(([h, y]) => {
      t[parseInt(h, 10) + n] = y;
    });
    const d = J(o);
    return n += d.byteLength / ee, d;
  }), s = r.reduce((o, A) => o + A.length, 0), i = new Uint8Array(s);
  return r.reduce((o, A) => (i.set(A, o), o + A.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function qA(e, t, n) {
  if (!e.dynamicData)
    return se([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const A = parseInt(i, 10) * ee, d = new S("u64").encode(
      n + t + r
    );
    s.set(d, A);
    const h = o.dynamicData ? (
      // unpack child dynamic data
      qA(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = se([s, h]), r += h.byteLength;
  }), s;
}
var Kh = (e, t = ee) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, ef = (e) => {
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
}, tf = (e) => e === Ro || e === No || e === So, vr = (e) => e % ee === 0, WA = (e) => ee - e % ee, $A = (e) => {
  if (vr(e.length))
    return e;
  const t = new Uint8Array(ee - e.length % ee);
  return kr([e, t]);
}, nf = (e) => e instanceof Uint8Array, lt = class extends ie {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    R(this, "coder");
    R(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return Dt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Oo)
      throw new v(D.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, G = class extends ie {
  constructor() {
    super("b256", "b256", ee * 4);
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
    return [mo(n, 32), t + 32];
  }
}, zA = class extends ie {
  constructor() {
    super("b512", "struct B512", ee * 8);
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
    return [mo(n, this.encodedLength), t + this.encodedLength];
  }
}, rf = class extends ie {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    R(this, "paddingLength");
    R(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(D.ENCODE_ERROR, "Invalid boolean value.");
    const r = Pt(t ? 1 : 0, this.paddingLength);
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
}, Ji, KA, Cs = class extends ie {
  constructor() {
    super("struct", "struct Bytes", Et), MA(this, Ji);
  }
  encode(e) {
    const t = [], n = new S("u64").encode(Et), r = kA(this, Ji, KA).call(this, e);
    return n.dynamicData = {
      0: Dt([r])
    }, t.push(n), t.push(new S("u64").encode(r.byteLength)), t.push(new S("u64").encode(e.length)), Dt(t);
  }
  decode(e, t) {
    if (e.length < Et)
      throw new v(D.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new S("u64").decode(n, 0)[0]).toNumber(), s = e.slice(Et, Et + r);
    if (s.length !== r)
      throw new v(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Et];
  }
};
Ji = /* @__PURE__ */ new WeakSet();
KA = function(e) {
  const t = e instanceof Uint8Array ? [e] : [new Uint8Array(e)], n = (ee - e.length % ee) % ee;
  return n && t.push(new Uint8Array(n)), se(t);
};
Hr(Cs, "memorySize", 1);
var sf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Vn, En, Ts, tu, Ls, nu, Uc, eu = (Uc = class extends ie {
  constructor(t, n) {
    const r = new S("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    mt(this, Ts);
    mt(this, Ls);
    R(this, "name");
    R(this, "coders");
    mt(this, Vn, void 0);
    mt(this, En, void 0);
    this.name = t, this.coders = n, qt(this, Vn, r), qt(this, En, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return an(this, Ts, tu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), A = new Uint8Array(xe(this, En) - s.encodedLength);
    return Dt([xe(this, Vn).encode(i), A, o]);
  }
  decode(t, n) {
    if (t.length < xe(this, En))
      throw new v(D.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new S("u64").decode(t, r);
    const i = Ft(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new v(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const A = this.coders[o], d = xe(this, En) - A.encodedLength;
    return r += d, [s, r] = A.decode(t, r), sf(this.coders) ? an(this, Ls, nu).call(this, o, r) : [{ [o]: s }, r];
  }
}, Vn = new WeakMap(), En = new WeakMap(), Ts = new WeakSet(), tu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(xe(this, En) - n.encodedLength);
  return se([xe(this, Vn).encode(s), i, r]);
}, Ls = new WeakSet(), nu = function(t, n) {
  return [t, n];
}, Uc), ru = class extends eu {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, z = class extends ie {
  constructor(t, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && t === "u8" ? 1 : 8;
    super("number", t, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    R(this, "length");
    R(this, "paddingLength");
    R(this, "baseType");
    R(this, "options");
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
      n = Pt(t);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Pt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Ft(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(D.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new v(D.DECODE_ERROR, "Invalid number byte data size.");
    return [Ft(r), n + 8];
  }
}, of = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", Ma);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new z("u8", { isSmallBytes: !0 }), r = new S("u64").encode(
      Ma
    );
    return r.dynamicData = {
      0: Dt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new S("u64").encode(e.length)), Dt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new lt(
      new z("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, Yi, su, iu = class extends ie {
  constructor() {
    super("struct", "struct String", 1), MA(this, Yi);
  }
  encode(e) {
    const t = [], n = new S("u64").encode(Et), r = kA(this, Yi, su).call(this, e);
    return n.dynamicData = {
      0: Dt([r])
    }, t.push(n), t.push(new S("u64").encode(r.byteLength)), t.push(new S("u64").encode(e.length)), Dt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new S("u64").decode(n, 0)[0]).toNumber(), s = e.slice(Et, Et + r);
    if (s.length !== r)
      throw new v(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [Lr(s), t + Et];
  }
};
Yi = /* @__PURE__ */ new WeakSet();
su = function(e) {
  const t = [Tr(e)], n = (ee - e.length % ee) % ee;
  return n && t.push(new Uint8Array(n)), se(t);
};
Hr(iu, "memorySize", 1);
var Xn, Gc, af = (Gc = class extends ie {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    R(this, "length");
    mt(this, Xn, void 0);
    this.length = t, qt(this, Xn, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = Tr(t), r = new Uint8Array(xe(this, Xn));
    return se([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new v(D.DECODE_ERROR, "Invalid string byte data size.");
    const s = Lr(r), i = xe(this, Xn);
    return [s, n + this.length + i];
  }
}, Xn = new WeakMap(), Gc), Xs = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    R(this, "name");
    R(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof ru) && i == null)
        throw new v(
          D.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return vr(o.length) ? o : $A(o);
    });
    return Dt([Dt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const A = this.coders[o];
      let d;
      return [d, r] = A.decode(t, r), vr(r) || (r += WA(r)), i[o] = d, i;
    }, {}), r];
  }
}, ou = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    R(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return Dt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return vr(s.length) ? s : $A(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), vr(r) || (r += WA(r)), o;
    }), r];
  }
}, au = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Et);
    R(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t) && !nf(t))
      throw new v(
        D.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = [], r = new S("u64").encode(Et);
    return r.dynamicData = {
      0: Dt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new S("u64").encode(t.length)), n.push(new S("u64").encode(t.length)), Dt(n);
  }
  decode(t, n) {
    if (t.length < Et || t.length > Oo)
      throw new v(D.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new S("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Et, Et + i);
    if (o.length !== i)
      throw new v(D.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Kh(o, this.coder.encodedLength).map(
        (A) => this.coder.decode(A, 0)[0]
      ),
      n + Et
    ];
  }
}, cu = (e) => {
  switch (e) {
    case void 0:
    case Ut:
      return Ut;
    case Kn:
      return Kn;
    default:
      throw new v(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, cf = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new v(
      D.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, nn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new v(
      D.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, ka = (e, t) => t.filter((n) => nn(e, n.type).type !== "()"), Au = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new v(
      D.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, en = class {
  constructor(e, t) {
    R(this, "abi");
    R(this, "name");
    R(this, "type");
    R(this, "originalTypeArguments");
    R(this, "components");
    this.abi = e, this.name = t.name;
    const n = nn(e, t.type);
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = en.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? en.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new en(e, o));
    const s = r.reduce(
      (o, A, d) => {
        var y;
        const h = { ...o };
        return h[A] = structuredClone(
          (y = t.typeArguments) == null ? void 0 : y[d]
        ), h;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new en(e, o));
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
      const s = nn(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = nn(e, s.type);
      if (Zh.test(i.type)) {
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
    return Mo.test(this.type) ? "s" : Bs.test(this.type) ? "a" : ko.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = _o.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Bs.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new en(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function bs(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Sn = (e, t) => {
  var d, h, y, E, C;
  switch (e.type) {
    case OA:
    case TA:
    case LA:
      return new z(e.type, t);
    case PA:
    case GA:
      return new S("u64");
    case UA:
      return new S("u256");
    case HA:
      return new of();
    case JA:
      return new rf(t);
    case YA:
      return new G();
    case ZA:
      return new zA();
    case No:
      return new Cs();
    case So:
      return new iu();
  }
  const n = (d = _o.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new af(x);
  }
  const r = e.components, s = (h = Bs.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const x = parseInt(s.length, 10), F = r[0];
    if (!F)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const b = Sn(F, { isSmallBytes: !0 });
    return new lt(b, x);
  }
  if (e.type === Ro) {
    const x = Au(r), F = new en(e.abi, x), b = Sn(F, { isSmallBytes: !0, encoding: Ut });
    return new au(b);
  }
  const i = (y = Mo.exec(e.type)) == null ? void 0 : y.groups;
  if (i) {
    const x = bs(r, { isRightPadded: !0, getCoder: Sn });
    return new Xs(i.name, x);
  }
  const o = (E = ko.exec(e.type)) == null ? void 0 : E.groups;
  if (o) {
    const x = bs(r, { getCoder: Sn });
    return e.type === Do ? new ru(o.name, x) : new eu(o.name, x);
  }
  if ((C = XA.exec(e.type)) == null ? void 0 : C.groups) {
    const x = r.map(
      (F) => Sn(F, { isRightPadded: !0, encoding: Ut })
    );
    return new ou(x);
  }
  throw e.type === VA ? new v(
    D.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new v(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, Af = class extends ie {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(D.ENCODE_ERROR, "Invalid boolean value.");
    return Pt(e ? 1 : 0, this.encodedLength);
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
}, uu = class extends ie {
  constructor() {
    super("struct", "struct Bytes", ee);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new S("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ee)
      throw new v(D.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
Hr(uu, "memorySize", 1);
var uf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), jn, qn, Ps, lu, Us, hu, Hc, du = (Hc = class extends ie {
  constructor(t, n) {
    const r = new S("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    mt(this, Ps);
    mt(this, Us);
    R(this, "name");
    R(this, "coders");
    mt(this, jn, void 0);
    mt(this, qn, void 0);
    this.name = t, this.coders = n, qt(this, jn, r), qt(this, qn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return an(this, Ps, lu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(D.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(D.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...xe(this, jn).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < xe(this, qn))
      throw new v(D.DECODE_ERROR, "Invalid enum data size.");
    const r = new S("u64").decode(t, n)[0], s = Ft(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        D.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], A = n + ee, [d, h] = o.decode(t, A);
    return uf(this.coders) ? an(this, Us, hu).call(this, i, h) : [{ [i]: d }, h];
  }
}, jn = new WeakMap(), qn = new WeakMap(), Ps = new WeakSet(), lu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(xe(this, qn) - n.encodedLength);
  return se([xe(this, jn).encode(s), i, r]);
}, Us = new WeakSet(), hu = function(t, n) {
  return [t, n];
}, Hc), df = (e) => {
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
}, Zi = class extends ie {
  constructor(t) {
    const n = df(t);
    super("number", t, n);
    R(this, "length");
    R(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Pt(t);
    } catch {
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(D.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Pt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid number byte data size.");
    return [Ft(r), n + this.length];
  }
}, Lo = class extends du {
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
}, lf = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ee);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const n = new lt(new Zi("u8"), e.length).encode(e), r = new S("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new lt(new Zi("u8"), s), [A] = o.decode(i, 0);
    return [A, n + s];
  }
}, Po = class extends ie {
  constructor() {
    super("struct", "struct String", ee);
  }
  encode(e) {
    const t = Tr(e), n = new S("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid std string byte data size.");
    return [Lr(i), n + s];
  }
};
Hr(Po, "memorySize", 1);
var fu = class extends ie {
  constructor() {
    super("strSlice", "str", ee);
  }
  encode(e) {
    const t = Tr(e), n = new S("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(D.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Lr(i), n + s];
  }
};
Hr(fu, "memorySize", 1);
var hf = class extends ie {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(D.ENCODE_ERROR, "Value length mismatch during encode.");
    return Tr(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(D.DECODE_ERROR, "Invalid string byte data size.");
    return [Lr(n), t + this.encodedLength];
  }
}, ff = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    R(this, "name");
    R(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return kr(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof Lo) && s == null)
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
      const A = this.coders[o];
      let d;
      return [d, r] = A.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, gu = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    R(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(D.ENCODE_ERROR, "Types/values length mismatch.");
    return kr(this.coders.map((n, r) => n.encode(t[r])));
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
}, Wn, Jc, gf = (Jc = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ee);
    R(this, "coder");
    mt(this, Wn, void 0);
    this.coder = t, qt(this, Wn, this.coder instanceof Lo);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(D.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new S("u64").encode(t.length);
    return new Uint8Array([...r, ...kr(n)]);
  }
  decode(t, n) {
    if (!xe(this, Wn) && (t.length < this.encodedLength || t.length > Oo))
      throw new v(D.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ee, s = t.slice(n, r), i = Q(new S("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, A = t.slice(r, r + o);
    if (!xe(this, Wn) && A.length !== o)
      throw new v(D.DECODE_ERROR, "Invalid vec byte data size.");
    let d = r;
    const h = [];
    for (let y = 0; y < i; y++) {
      const [E, C] = this.coder.decode(t, d);
      h.push(E), d = C;
    }
    return [h, d];
  }
}, Wn = new WeakMap(), Jc), _n = (e, t) => {
  var d, h, y, E, C;
  switch (e.type) {
    case OA:
    case TA:
    case LA:
      return new Zi(e.type);
    case PA:
    case GA:
      return new S("u64");
    case UA:
      return new S("u256");
    case HA:
      return new lf();
    case JA:
      return new Af();
    case YA:
      return new G();
    case ZA:
      return new zA();
    case No:
      return new uu();
    case So:
      return new Po();
    case VA:
      return new fu();
  }
  const n = (d = _o.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const x = parseInt(n.length, 10);
    return new hf(x);
  }
  const r = e.components, s = (h = Bs.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const x = parseInt(s.length, 10), F = r[0];
    if (!F)
      throw new v(
        D.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const b = _n(F);
    return new lt(b, x);
  }
  if (e.type === Ro) {
    const x = Au(r), F = new en(e.abi, x), b = _n(F);
    return new gf(b);
  }
  const i = (y = Mo.exec(e.type)) == null ? void 0 : y.groups;
  if (i) {
    const x = bs(r, { isRightPadded: !0, getCoder: _n });
    return new ff(i.name, x);
  }
  const o = (E = ko.exec(e.type)) == null ? void 0 : E.groups;
  if (o) {
    const x = bs(r, { getCoder: _n });
    return e.type === Do ? new Lo(o.name, x) : new du(o.name, x);
  }
  if ((C = XA.exec(e.type)) == null ? void 0 : C.groups) {
    const x = r.map(
      (F) => _n(F)
    );
    return new gu(x);
  }
  throw new v(
    D.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function pf(e = Ut) {
  switch (e) {
    case Kn:
      return _n;
    case Ut:
      return Sn;
    default:
      throw new v(
        D.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Tn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new en(e, t);
    return pf(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, Gs, pu, Hs, mu, Js, Eu, Yc, hs = (Yc = class {
  constructor(e, t) {
    mt(this, Gs);
    mt(this, Hs);
    mt(this, Js);
    R(this, "signature");
    R(this, "selector");
    R(this, "selectorBytes");
    R(this, "encoding");
    R(this, "name");
    R(this, "jsonFn");
    R(this, "attributes");
    R(this, "isInputDataPointer");
    R(this, "outputMetadata");
    R(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = cf(this.jsonAbi, t), this.name = t, this.signature = hs.getSignature(this.jsonAbi, this.jsonFn), this.selector = hs.getFunctionSelector(this.signature), this.selectorBytes = new Po().encode(t), this.encoding = cu(e.encoding), this.isInputDataPointer = an(this, Gs, pu).call(this), this.outputMetadata = {
      isHeapType: an(this, Hs, mu).call(this),
      encodedLength: an(this, Js, Eu).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new en(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = It(In(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    hs.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = ka(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (o) => Tn.getCoder(this.jsonAbi, o, {
        isRightPadded: r.length > 1,
        encoding: this.encoding
      })
    );
    if (this.encoding === Kn)
      return new gu(s).encode(n);
    const i = new ou(s).encode(n);
    return qA(i, t, i.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => nn(n, o.type)), s = r.filter(
      (o) => o.type === Do || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(D.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = J(e), n = ka(this.jsonAbi, this.jsonFn.inputs);
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
        const o = Tn.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [A, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, A],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (nn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = J(e);
    return Tn.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, Gs = new WeakSet(), pu = function() {
  var t;
  const e = this.jsonFn.inputs.map((n) => nn(this.jsonAbi, n.type));
  return this.jsonFn.inputs.length > 1 || ef(((t = e[0]) == null ? void 0 : t.type) || "");
}, Hs = new WeakSet(), mu = function() {
  const e = nn(this.jsonAbi, this.jsonFn.output.type);
  return tf((e == null ? void 0 : e.type) || "");
}, Js = new WeakSet(), Eu = function() {
  try {
    const e = Tn.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof au ? e.coder.encodedLength : e instanceof Cs ? Cs.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, Yc), on = class {
  constructor(e) {
    R(this, "functions");
    R(this, "configurables");
    R(this, "jsonAbi");
    R(this, "encoding");
    this.jsonAbi = e, this.encoding = cu(e.encoding), this.functions = Object.fromEntries(
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
    throw new v(
      D.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    return (typeof e == "string" ? this.getFunction(e) : e).encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t) {
    const n = this.jsonAbi.loggedTypes.find((r) => r.logId === t);
    if (!n)
      throw new v(
        D.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Tn.decode(this.jsonAbi, n.loggedType, J(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new v(
        D.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Tn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0,
      // TODO: Review support for configurables in v1 encoding when it becomes available
      encoding: Ut
    });
  }
  getTypeById(e) {
    return nn(this.jsonAbi, e);
  }
}, SI = class {
}, mf = class {
}, wu = class {
}, Iu = class {
}, Ef = class extends Iu {
}, wf = class extends Iu {
}, xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
var tr = xr.bech32m = xr.bech32 = void 0;
const Qs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", yu = {};
for (let e = 0; e < Qs.length; e++) {
  const t = Qs.charAt(e);
  yu[t] = e;
}
function Hn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Oa(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Hn(t) ^ r >> 5;
  }
  t = Hn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Hn(t) ^ r & 31;
  }
  return t;
}
function Uo(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, A = [];
  for (let d = 0; d < e.length; ++d)
    for (s = s << t | e[d], i += t; i >= n; )
      i -= n, A.push(s >> i & o);
  if (r)
    i > 0 && A.push(s << n - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return A;
}
function If(e) {
  return Uo(e, 8, 5, !0);
}
function yf(e) {
  const t = Uo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Bf(e) {
  const t = Uo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function Bu(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, A, d) {
    if (d = d || 90, o.length + 7 + A.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = Oa(o);
    if (typeof h == "string")
      throw new Error(h);
    let y = o + "1";
    for (let E = 0; E < A.length; ++E) {
      const C = A[E];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      h = Hn(h) ^ C, y += Qs.charAt(C);
    }
    for (let E = 0; E < 6; ++E)
      h = Hn(h);
    h ^= t;
    for (let E = 0; E < 6; ++E) {
      const C = h >> (5 - E) * 5 & 31;
      y += Qs.charAt(C);
    }
    return y;
  }
  function r(o, A) {
    if (A = A || 90, o.length < 8)
      return o + " too short";
    if (o.length > A)
      return "Exceeds length limit";
    const d = o.toLowerCase(), h = o.toUpperCase();
    if (o !== d && o !== h)
      return "Mixed-case string " + o;
    o = d;
    const y = o.lastIndexOf("1");
    if (y === -1)
      return "No separator character for " + o;
    if (y === 0)
      return "Missing prefix for " + o;
    const E = o.slice(0, y), C = o.slice(y + 1);
    if (C.length < 6)
      return "Data too short";
    let x = Oa(E);
    if (typeof x == "string")
      return x;
    const F = [];
    for (let b = 0; b < C.length; ++b) {
      const N = C.charAt(b), _ = yu[N];
      if (_ === void 0)
        return "Unknown character " + N;
      x = Hn(x) ^ _, !(b + 6 >= C.length) && F.push(_);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: E, words: F };
  }
  function s(o, A) {
    const d = r(o, A);
    if (typeof d == "object")
      return d;
  }
  function i(o, A) {
    const d = r(o, A);
    if (typeof d == "object")
      return d;
    throw new Error(d);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: If,
    fromWordsUnsafe: yf,
    fromWords: Bf
  };
}
xr.bech32 = Bu("bech32");
tr = xr.bech32m = Bu("bech32m");
var vs = "fuel";
function Go(e) {
  return tr.decode(e);
}
function fs(e) {
  return tr.encode(
    vs,
    tr.toWords(J(j(e)))
  );
}
function gs(e) {
  return typeof e == "string" && e.indexOf(vs + 1) === 0 && Go(e).prefix === vs;
}
function Vi(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Ta(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Xi(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Ho(e) {
  return new Uint8Array(tr.fromWords(Go(e).words));
}
function La(e) {
  if (!gs(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return j(Ho(e));
}
function Cf(e) {
  const { words: t } = Go(e);
  return tr.encode(vs, t);
}
var Er = (e) => e instanceof wu ? e.address : e instanceof Ef ? e.id : e, bf = () => j(Xt(32)), Qf = (e) => {
  let t;
  try {
    if (!Vi(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = Ho(fs(e)), t = j(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, vf = (e) => {
  if (!Xi(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, le = class extends mf {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    R(this, "bech32Address");
    if (this.bech32Address = Cf(t), !gs(this.bech32Address))
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
    return La(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return Ho(this.bech32Address);
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
    const t = La(this.bech32Address);
    return {
      bits: Qf(t)
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
    if (!Ta(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = j(Gr(J(t)));
    return new le(fs(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Vi(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new le(fs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(bf());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return gs(t) ? new le(t) : this.fromB256(t);
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
    if (Ta(t))
      return le.fromPublicKey(t);
    if (gs(t))
      return new le(t);
    if (Vi(t))
      return le.fromB256(t);
    if (Xi(t))
      return le.fromEvmAddress(t);
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
    if (!Xi(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = vf(t);
    return new le(fs(n));
  }
}, wn, Zc, we = (Zc = class extends ie {
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
    R(this, "length");
    mt(this, wn, void 0);
    this.length = t, qt(this, wn, n);
  }
  encode(t) {
    const n = [], r = J(t);
    return n.push(r), xe(this, wn) && n.push(new Uint8Array(xe(this, wn))), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [j(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return xe(this, wn) && ([r, s] = [null, s + xe(this, wn)]), [i, s];
  }
}, wn = new WeakMap(), Zc), nr = class extends Xs {
  constructor() {
    super("TxPointer", {
      blockHeight: new z("u32"),
      txIndex: new z("u16")
    });
  }
}, Ee = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ee || {}), Pa = class extends ie {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new nr().encode(e.txPointer)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new z("u32").encode(e.maturity)), t.push(new S("u64").encode(e.predicateGasUsed)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new we(e.predicateLength).encode(e.predicate)), t.push(new we(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new nr().decode(e, r);
    const h = n;
    [n, r] = new z("u8").decode(e, r);
    const y = Number(n);
    [n, r] = new z("u32").decode(e, r);
    const E = n;
    [n, r] = new S("u64").decode(e, r);
    const C = n;
    [n, r] = new z("u32").decode(e, r);
    const x = n;
    [n, r] = new z("u32").decode(e, r);
    const F = n;
    [n, r] = new we(x).decode(e, r);
    const b = n;
    return [n, r] = new we(F).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: A,
        assetId: d,
        txPointer: h,
        witnessIndex: y,
        maturity: E,
        predicateGasUsed: C,
        predicateLength: x,
        predicateDataLength: F,
        predicate: b,
        predicateData: n
      },
      r
    ];
  }
}, xs = class extends ie {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new nr().encode(e.txPointer)), t.push(new G().encode(e.contractID)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new nr().decode(e, r);
    const d = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: A,
        txPointer: d,
        contractID: n
      },
      r
    ];
  }
}, Fr = class extends ie {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new we(32).encode(e.sender)), t.push(new we(32).encode(e.recipient)), t.push(new we(32).encode(e.nonce)), t.push(new S("u64").encode(e.amount)), t.push(J(e.data || "0x")), It(se(t));
  }
  static encodeData(e) {
    const t = J(e || "0x"), n = t.length;
    return new we(n).encode(t);
  }
  encode(e) {
    const t = [], n = Fr.encodeData(e.data);
    return t.push(new we(32).encode(e.sender)), t.push(new we(32).encode(e.recipient)), t.push(new S("u64").encode(e.amount)), t.push(new we(32).encode(e.nonce)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new S("u64").encode(e.predicateGasUsed)), t.push(new z("u32").encode(n.length)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new we(n.length).encode(n)), t.push(new we(e.predicateLength).encode(e.predicate)), t.push(new we(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  static decodeData(e) {
    const t = J(e), n = t.length, [r] = new we(n).decode(t, 0);
    return J(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new z("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new S("u64").decode(e, r);
    const h = n;
    [n, r] = new z("u32").decode(e, r);
    const y = n;
    [n, r] = new z("u32").decode(e, r);
    const E = n;
    [n, r] = new z("u32").decode(e, r);
    const C = n;
    [n, r] = new we(y).decode(e, r);
    const x = n;
    [n, r] = new we(E).decode(e, r);
    const F = n;
    return [n, r] = new we(C).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: A,
        predicateGasUsed: h,
        dataLength: y,
        predicateLength: E,
        predicateDataLength: C,
        data: x,
        predicate: F,
        predicateData: n
      },
      r
    ];
  }
}, Fs = class extends ie {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Pa().encode(e));
        break;
      }
      case 1: {
        t.push(new xs().encode(e));
        break;
      }
      case 2: {
        t.push(new Fr().encode(e));
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
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Pa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new xs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Fr().decode(e, r), [n, r];
      default:
        throw new v(
          D.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, ye = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(ye || {}), Ua = class extends ie {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
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
}, Ds = class extends ie {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u8").encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
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
}, Ga = class extends ie {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
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
}, Ha = class extends ie {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
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
}, Ja = class extends ie {
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
}, Rs = class extends ie {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Ua().encode(e));
        break;
      }
      case 1: {
        t.push(new Ds().encode(e));
        break;
      }
      case 2: {
        t.push(new Ga().encode(e));
        break;
      }
      case 3: {
        t.push(new Ha().encode(e));
        break;
      }
      case 4: {
        t.push(new Ja().encode(e));
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
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ua().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ds().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ga().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ha().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ja().decode(e, r), [n, r];
      default:
        throw new v(
          D.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, kt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(kt || {}), xf = (e) => e.sort((t, n) => t.type - n.type);
function Ff(e) {
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
var Ns = class extends ie {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Ff(e);
    const t = xf(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new S("u64").encode(r));
          break;
        case 4:
          n.push(new z("u32").encode(r));
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
      const [i, o] = new S("u64").decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new S("u64").decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new z("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new S("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, Ae = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(Ae || {}), Ya = class extends ie {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new S("u64").encode(e.gas)), t.push(new S("u64").encode(e.param1)), t.push(new S("u64").encode(e.param2)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    [n, r] = new S("u64").decode(e, r);
    const h = n;
    [n, r] = new S("u64").decode(e, r);
    const y = n;
    [n, r] = new S("u64").decode(e, r);
    const E = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: A,
        gas: d,
        param1: h,
        param2: y,
        pc: E,
        is: n
      },
      r
    ];
  }
}, Za = class extends ie {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    return [n, r] = new S("u64").decode(e, r), [
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
}, Va = class extends ie {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.ptr)), t.push(new S("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: A,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Xa = class extends ie {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.reason)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), t.push(new G().encode(e.contractId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: A,
        contractId: n
      },
      r
    ];
  }
}, ja = class extends ie {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    return [n, r] = new S("u64").decode(e, r), [
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
}, qa = class extends ie {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val0)), t.push(new S("u64").encode(e.val1)), t.push(new S("u64").encode(e.val2)), t.push(new S("u64").encode(e.val3)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    [n, r] = new S("u64").decode(e, r);
    const h = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: A,
        val3: d,
        pc: h,
        is: n
      },
      r
    ];
  }
}, Wa = class extends ie {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val0)), t.push(new S("u64").encode(e.val1)), t.push(new S("u64").encode(e.ptr)), t.push(new S("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const h = n;
    [n, r] = new S("u64").decode(e, r);
    const y = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: A,
        len: d,
        digest: h,
        pc: y,
        is: n
      },
      r
    ];
  }
}, $a = class extends ie {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: A,
        pc: d,
        is: n
      },
      r
    ];
  }
}, za = class extends ie {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: A,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Ka = class extends ie {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S("u64").encode(e.result)), t.push(new S("u64").encode(e.gasUsed)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new S("u64").decode(e, r);
    const s = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, Ss = class extends ie {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new we(32).encode(e.sender)), t.push(new we(32).encode(e.recipient)), t.push(new we(32).encode(e.nonce)), t.push(new S("u64").encode(e.amount)), t.push(J(e.data || "0x")), It(se(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new z("u16").encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new we(e.data.length).encode(e.data)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new z("u16").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const h = n;
    [n, r] = new we(d).decode(e, r);
    const y = J(n), E = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: A,
      digest: h,
      data: y
    };
    return E.messageId = Ss.getMessageId(E), [E, r];
  }
}, Cu = (e, t) => {
  const n = J(e), r = J(t);
  return It(se([n, r]));
}, Dr = class extends ie {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return Cu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n, h = Dr.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: A,
      is: d,
      assetId: h
    }, r];
  }
}, ji = class extends ie {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return Cu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n, h = Dr.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: A,
      is: d,
      assetId: h
    }, r];
  }
}, _I = class extends ie {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Ya().encode(e));
        break;
      }
      case 1: {
        t.push(new Za().encode(e));
        break;
      }
      case 2: {
        t.push(new Va().encode(e));
        break;
      }
      case 3: {
        t.push(new Xa().encode(e));
        break;
      }
      case 4: {
        t.push(new ja().encode(e));
        break;
      }
      case 5: {
        t.push(new qa().encode(e));
        break;
      }
      case 6: {
        t.push(new Wa().encode(e));
        break;
      }
      case 7: {
        t.push(new $a().encode(e));
        break;
      }
      case 8: {
        t.push(new za().encode(e));
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
        t.push(new Dr().encode(e));
        break;
      }
      case 12: {
        t.push(new ji().encode(e));
        break;
      }
      default:
        throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ya().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Za().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Va().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Xa().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ja().decode(e, r), [n, r];
      case 5:
        return [n, r] = new qa().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Wa().decode(e, r), [n, r];
      case 7:
        return [n, r] = new $a().decode(e, r), [n, r];
      case 8:
        return [n, r] = new za().decode(e, r), [n, r];
      case 9:
        return [n, r] = new Ka().decode(e, r), [n, r];
      case 10:
        return [n, r] = new Ss().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Dr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new ji().decode(e, r), [n, r];
      default:
        throw new v(D.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, ec = class extends Xs {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, _s = class extends ie {
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
    return t.push(new z("u32").encode(e.dataLength)), t.push(new we(e.dataLength).encode(e.data)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u32").decode(e, r);
    const s = n;
    return [n, r] = new we(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, ft = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(ft || {}), tc = class extends ie {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S("u64").encode(e.scriptGasLimit)), t.push(new z("u32").encode(e.scriptLength)), t.push(new z("u32").encode(e.scriptDataLength)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new we(e.scriptLength).encode(e.script)), t.push(new we(e.scriptDataLength).encode(e.scriptData)), t.push(new Ns().encode(e.policies)), t.push(new lt(new Fs(), e.inputsCount).encode(e.inputs)), t.push(new lt(new Rs(), e.outputsCount).encode(e.outputs)), t.push(new lt(new _s(), e.witnessesCount).encode(e.witnesses)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new S("u64").decode(e, r);
    const s = n;
    [n, r] = new z("u32").decode(e, r);
    const i = n;
    [n, r] = new z("u32").decode(e, r);
    const o = n;
    [n, r] = new z("u32").decode(e, r);
    const A = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const h = n;
    [n, r] = new z("u8").decode(e, r);
    const y = n;
    [n, r] = new G().decode(e, r);
    const E = n;
    [n, r] = new we(i).decode(e, r);
    const C = n;
    [n, r] = new we(o).decode(e, r);
    const x = n;
    [n, r] = new Ns().decode(e, r, A);
    const F = n;
    [n, r] = new lt(new Fs(), d).decode(e, r);
    const b = n;
    [n, r] = new lt(new Rs(), h).decode(e, r);
    const N = n;
    return [n, r] = new lt(new _s(), y).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: A,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: y,
        receiptsRoot: E,
        script: C,
        scriptData: x,
        policies: F,
        inputs: b,
        outputs: N,
        witnesses: n
      },
      r
    ];
  }
}, nc = class extends ie {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u32").encode(e.bytecodeLength)), t.push(new z("u8").encode(e.bytecodeWitnessIndex)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u16").encode(e.storageSlotsCount)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new Ns().encode(e.policies)), t.push(
      new lt(new ec(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new lt(new Fs(), e.inputsCount).encode(e.inputs)), t.push(new lt(new Rs(), e.outputsCount).encode(e.outputs)), t.push(new lt(new _s(), e.witnessesCount).encode(e.witnesses)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u32").decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new z("u32").decode(e, r);
    const o = n;
    [n, r] = new z("u16").decode(e, r);
    const A = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const h = n;
    [n, r] = new z("u8").decode(e, r);
    const y = n;
    [n, r] = new G().decode(e, r);
    const E = n;
    [n, r] = new Ns().decode(e, r, o);
    const C = n;
    [n, r] = new lt(new ec(), A).decode(e, r);
    const x = n;
    [n, r] = new lt(new Fs(), d).decode(e, r);
    const F = n;
    [n, r] = new lt(new Rs(), h).decode(e, r);
    const b = n;
    return [n, r] = new lt(new _s(), y).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: A,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: y,
        salt: E,
        policies: C,
        storageSlots: x,
        inputs: F,
        outputs: b,
        witnesses: n
      },
      r
    ];
  }
}, rc = class extends ie {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new nr().encode(e.txPointer)), t.push(new xs().encode(e.inputContract)), t.push(new Ds().encode(e.outputContract)), t.push(new S("u64").encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new nr().decode(e, r);
    const s = n;
    [n, r] = new xs().decode(e, r);
    const i = n;
    [n, r] = new Ds().decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: A,
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
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new tc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new nc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new rc().encode(e));
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
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new tc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new nc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new rc().decode(e, r), [n, r];
      default:
        throw new v(
          D.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, MI = class extends Xs {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new z("u8")
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const bu = BigInt(0), js = BigInt(1), Df = BigInt(2);
function jt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Rf = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function rr(e) {
  if (!jt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Rf[e[n]];
  return t;
}
function Qu(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Jo(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const Wt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function sc(e) {
  if (e >= Wt._0 && e <= Wt._9)
    return e - Wt._0;
  if (e >= Wt._A && e <= Wt._F)
    return e - (Wt._A - 10);
  if (e >= Wt._a && e <= Wt._f)
    return e - (Wt._a - 10);
}
function sr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = sc(e.charCodeAt(i)), A = sc(e.charCodeAt(i + 1));
    if (o === void 0 || A === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + A;
  }
  return r;
}
function Dn(e) {
  return Jo(rr(e));
}
function Yo(e) {
  if (!jt(e))
    throw new Error("Uint8Array expected");
  return Jo(rr(Uint8Array.from(e).reverse()));
}
function ir(e, t) {
  return sr(e.toString(16).padStart(t * 2, "0"));
}
function Zo(e, t) {
  return ir(e, t).reverse();
}
function Nf(e) {
  return sr(Qu(e));
}
function Ot(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = sr(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (jt(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Rr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!jt(i))
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
function vu(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function Sf(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function _f(e) {
  let t;
  for (t = 0; e > bu; e >>= js, t += 1)
    ;
  return t;
}
function Mf(e, t) {
  return e >> BigInt(t) & js;
}
const kf = (e, t, n) => e | (n ? js : bu) << BigInt(t), Vo = (e) => (Df << BigInt(e - 1)) - js, Qi = (e) => new Uint8Array(e), ic = (e) => Uint8Array.from(e);
function xu(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Qi(e), s = Qi(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, A = (...E) => n(s, r, ...E), d = (E = Qi()) => {
    s = A(ic([0]), E), r = A(), E.length !== 0 && (s = A(ic([1]), E), r = A());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let E = 0;
    const C = [];
    for (; E < t; ) {
      r = A();
      const x = r.slice();
      C.push(x), E += r.length;
    }
    return Rr(...C);
  };
  return (E, C) => {
    o(), d(E);
    let x;
    for (; !(x = C(h())); )
      d();
    return o(), x;
  };
}
const Of = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || jt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function Jr(e, t, n = {}) {
  const r = (s, i, o) => {
    const A = Of[i];
    if (typeof A != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const d = e[s];
    if (!(o && d === void 0) && !A(d, e))
      throw new Error(`Invalid param ${String(s)}=${d} (${typeof d}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const Tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Mf,
  bitLen: _f,
  bitMask: Vo,
  bitSet: kf,
  bytesToHex: rr,
  bytesToNumberBE: Dn,
  bytesToNumberLE: Yo,
  concatBytes: Rr,
  createHmacDrbg: xu,
  ensureBytes: Ot,
  equalBytes: vu,
  hexToBytes: sr,
  hexToNumber: Jo,
  isBytes: jt,
  numberToBytesBE: ir,
  numberToBytesLE: Zo,
  numberToHexUnpadded: Qu,
  numberToVarBytesBE: Nf,
  utf8ToBytes: Sf,
  validateObject: Jr
}, Symbol.toStringTag, { value: "Module" }));
var vi = {}, qi = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Be < "u" && Be, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var A = typeof i < "u" && i || typeof self < "u" && self || typeof A < "u" && A, d = {
        searchParams: "URLSearchParams" in A,
        iterable: "Symbol" in A && "iterator" in Symbol,
        blob: "FileReader" in A && "Blob" in A && function() {
          try {
            return new Blob(), !0;
          } catch {
            return !1;
          }
        }(),
        formData: "FormData" in A,
        arrayBuffer: "ArrayBuffer" in A
      };
      function h(c) {
        return c && DataView.prototype.isPrototypeOf(c);
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
        ], E = ArrayBuffer.isView || function(c) {
          return c && y.indexOf(Object.prototype.toString.call(c)) > -1;
        };
      function C(c) {
        if (typeof c != "string" && (c = String(c)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(c) || c === "")
          throw new TypeError('Invalid character in header field name: "' + c + '"');
        return c.toLowerCase();
      }
      function x(c) {
        return typeof c != "string" && (c = String(c)), c;
      }
      function F(c) {
        var l = {
          next: function() {
            var p = c.shift();
            return { done: p === void 0, value: p };
          }
        };
        return d.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function b(c) {
        this.map = {}, c instanceof b ? c.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(c) ? c.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : c && Object.getOwnPropertyNames(c).forEach(function(l) {
          this.append(l, c[l]);
        }, this);
      }
      b.prototype.append = function(c, l) {
        c = C(c), l = x(l);
        var p = this.map[c];
        this.map[c] = p ? p + ", " + l : l;
      }, b.prototype.delete = function(c) {
        delete this.map[C(c)];
      }, b.prototype.get = function(c) {
        return c = C(c), this.has(c) ? this.map[c] : null;
      }, b.prototype.has = function(c) {
        return this.map.hasOwnProperty(C(c));
      }, b.prototype.set = function(c, l) {
        this.map[C(c)] = x(l);
      }, b.prototype.forEach = function(c, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && c.call(l, this.map[p], p, this);
      }, b.prototype.keys = function() {
        var c = [];
        return this.forEach(function(l, p) {
          c.push(p);
        }), F(c);
      }, b.prototype.values = function() {
        var c = [];
        return this.forEach(function(l) {
          c.push(l);
        }), F(c);
      }, b.prototype.entries = function() {
        var c = [];
        return this.forEach(function(l, p) {
          c.push([p, l]);
        }), F(c);
      }, d.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
      function N(c) {
        if (c.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        c.bodyUsed = !0;
      }
      function _(c) {
        return new Promise(function(l, p) {
          c.onload = function() {
            l(c.result);
          }, c.onerror = function() {
            p(c.error);
          };
        });
      }
      function Z(c) {
        var l = new FileReader(), p = _(l);
        return l.readAsArrayBuffer(c), p;
      }
      function L(c) {
        var l = new FileReader(), p = _(l);
        return l.readAsText(c), p;
      }
      function X(c) {
        for (var l = new Uint8Array(c), p = new Array(l.length), f = 0; f < l.length; f++)
          p[f] = String.fromCharCode(l[f]);
        return p.join("");
      }
      function k(c) {
        if (c.slice)
          return c.slice(0);
        var l = new Uint8Array(c.byteLength);
        return l.set(new Uint8Array(c)), l.buffer;
      }
      function M() {
        return this.bodyUsed = !1, this._initBody = function(c) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = c, c ? typeof c == "string" ? this._bodyText = c : d.blob && Blob.prototype.isPrototypeOf(c) ? this._bodyBlob = c : d.formData && FormData.prototype.isPrototypeOf(c) ? this._bodyFormData = c : d.searchParams && URLSearchParams.prototype.isPrototypeOf(c) ? this._bodyText = c.toString() : d.arrayBuffer && d.blob && h(c) ? (this._bodyArrayBuffer = k(c.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(c) || E(c)) ? this._bodyArrayBuffer = k(c) : this._bodyText = c = Object.prototype.toString.call(c) : this._bodyText = "", this.headers.get("content-type") || (typeof c == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(c) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var c = N(this);
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
            var c = N(this);
            return c || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(Z);
        }), this.text = function() {
          var c = N(this);
          if (c)
            return c;
          if (this._bodyBlob)
            return L(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(X(this._bodyArrayBuffer));
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
      function P(c) {
        var l = c.toUpperCase();
        return O.indexOf(l) > -1 ? l : c;
      }
      function W(c, l) {
        if (!(this instanceof W))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var p = l.body;
        if (c instanceof W) {
          if (c.bodyUsed)
            throw new TypeError("Already read");
          this.url = c.url, this.credentials = c.credentials, l.headers || (this.headers = new b(c.headers)), this.method = c.method, this.mode = c.mode, this.signal = c.signal, !p && c._bodyInit != null && (p = c._bodyInit, c.bodyUsed = !0);
        } else
          this.url = String(c);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new b(l.headers)), this.method = P(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && p)
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
      W.prototype.clone = function() {
        return new W(this, { body: this._bodyInit });
      };
      function U(c) {
        var l = new FormData();
        return c.trim().split("&").forEach(function(p) {
          if (p) {
            var f = p.split("="), w = f.shift().replace(/\+/g, " "), I = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(w), decodeURIComponent(I));
          }
        }), l;
      }
      function H(c) {
        var l = new b(), p = c.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var w = f.split(":"), I = w.shift().trim();
          if (I) {
            var g = w.join(":").trim();
            l.append(I, g);
          }
        }), l;
      }
      M.call(W.prototype);
      function K(c, l) {
        if (!(this instanceof K))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new b(l.headers), this.url = l.url || "", this._initBody(c);
      }
      M.call(K.prototype), K.prototype.clone = function() {
        return new K(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new b(this.headers),
          url: this.url
        });
      }, K.error = function() {
        var c = new K(null, { status: 0, statusText: "" });
        return c.type = "error", c;
      };
      var B = [301, 302, 303, 307, 308];
      K.redirect = function(c, l) {
        if (B.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new K(null, { status: l, headers: { location: c } });
      }, o.DOMException = A.DOMException;
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
          var w = new W(c, l);
          if (w.signal && w.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var I = new XMLHttpRequest();
          function g() {
            I.abort();
          }
          I.onload = function() {
            var m = {
              status: I.status,
              statusText: I.statusText,
              headers: H(I.getAllResponseHeaders() || "")
            };
            m.url = "responseURL" in I ? I.responseURL : m.headers.get("X-Request-URL");
            var Y = "response" in I ? I.response : I.responseText;
            setTimeout(function() {
              p(new K(Y, m));
            }, 0);
          }, I.onerror = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, I.ontimeout = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, I.onabort = function() {
            setTimeout(function() {
              f(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function u(m) {
            try {
              return m === "" && A.location.href ? A.location.href : m;
            } catch {
              return m;
            }
          }
          I.open(w.method, u(w.url), !0), w.credentials === "include" ? I.withCredentials = !0 : w.credentials === "omit" && (I.withCredentials = !1), "responseType" in I && (d.blob ? I.responseType = "blob" : d.arrayBuffer && w.headers.get("Content-Type") && w.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (I.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof b) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            I.setRequestHeader(m, x(l.headers[m]));
          }) : w.headers.forEach(function(m, Y) {
            I.setRequestHeader(Y, m);
          }), w.signal && (w.signal.addEventListener("abort", g), I.onreadystatechange = function() {
            I.readyState === 4 && w.signal.removeEventListener("abort", g);
          }), I.send(typeof w._bodyInit > "u" ? null : w._bodyInit);
        });
      }
      return a.polyfill = !0, A.fetch || (A.fetch = a, A.Headers = b, A.Request = W, A.Response = K), o.Headers = b, o.Request = W, o.Response = K, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(qi, qi.exports);
var Lf = qi.exports;
function Pf(e) {
  return typeof e == "object" && e !== null;
}
function Uf(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Gf = /\r\n|[\n\r]/g;
function Wi(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Gf)) {
    if (typeof s.index == "number" || Uf(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Hf(e) {
  return Fu(
    e.source,
    Wi(e.source, e.start)
  );
}
function Fu(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, A = t.line === 1 ? n : 0, d = t.column + A, h = `${e.name}:${o}:${d}
`, y = r.split(/\r\n|[\n\r]/g), E = y[s];
  if (E.length > 120) {
    const C = Math.floor(d / 80), x = d % 80, F = [];
    for (let b = 0; b < E.length; b += 80)
      F.push(E.slice(b, b + 80));
    return h + oc([
      [`${o} |`, F[0]],
      ...F.slice(1, C + 1).map((b) => ["|", b]),
      ["|", "^".padStart(x)],
      ["|", F[C + 1]]
    ]);
  }
  return h + oc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, y[s - 1]],
    [`${o} |`, E],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, y[s + 1]]
  ]);
}
function oc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function Jf(e) {
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
class Xo extends Error {
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
    const { nodes: o, source: A, positions: d, path: h, originalError: y, extensions: E } = Jf(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = y ?? void 0, this.nodes = ac(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = ac(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((F) => F.loc).filter((F) => F != null)
    );
    this.source = A ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (C == null ? void 0 : C.map((F) => F.start)), this.locations = d && A ? d.map((F) => Wi(A, F)) : C == null ? void 0 : C.map((F) => Wi(F.source, F.start));
    const x = Pf(
      y == null ? void 0 : y.extensions
    ) ? y == null ? void 0 : y.extensions : void 0;
    this.extensions = (i = E ?? x) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Xo) : Object.defineProperty(this, "stack", {
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

` + Hf(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Fu(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function ac(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ht(e, t, n) {
  return new Xo(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Yf {
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
class Du {
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
const Ru = {
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
}, Zf = new Set(Object.keys(Ru));
function cc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Zf.has(t);
}
var Ln;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Ln || (Ln = {}));
var $i;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})($i || ($i = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function zi(e) {
  return e === 9 || e === 32;
}
function Nr(e) {
  return e >= 48 && e <= 57;
}
function Nu(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Su(e) {
  return Nu(e) || e === 95;
}
function Vf(e) {
  return Nu(e) || Nr(e) || e === 95;
}
function Xf(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const A = e[o], d = jf(A);
    d !== A.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, A) => A === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function jf(e) {
  let t = 0;
  for (; t < e.length && zi(e.charCodeAt(t)); )
    ++t;
  return t;
}
function qf(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || zi(x.charCodeAt(0))), o = n.endsWith('\\"""'), A = e.endsWith('"') && !o, d = e.endsWith("\\"), h = A || d, y = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let E = "";
  const C = s && zi(e.charCodeAt(0));
  return (y && !C || i) && (E += `
`), E += n, (y || h) && (E += `
`), '"""' + E + '"""';
}
var T;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(T || (T = {}));
class Wf {
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
    const n = new Du(T.SOF, 0, 0, 0, 0);
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
    if (t.kind !== T.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = zf(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === T.COMMENT);
    return t;
  }
}
function $f(e) {
  return e === T.BANG || e === T.DOLLAR || e === T.AMP || e === T.PAREN_L || e === T.PAREN_R || e === T.SPREAD || e === T.COLON || e === T.EQUALS || e === T.AT || e === T.BRACKET_L || e === T.BRACKET_R || e === T.BRACE_L || e === T.PIPE || e === T.BRACE_R;
}
function dr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function qs(e, t) {
  return _u(e.charCodeAt(t)) && Mu(e.charCodeAt(t + 1));
}
function _u(e) {
  return e >= 55296 && e <= 56319;
}
function Mu(e) {
  return e >= 56320 && e <= 57343;
}
function Rn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return T.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function dt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new Du(t, n, r, i, o, s);
}
function zf(e, t) {
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
        return Kf(e, s);
      case 33:
        return dt(e, T.BANG, s, s + 1);
      case 36:
        return dt(e, T.DOLLAR, s, s + 1);
      case 38:
        return dt(e, T.AMP, s, s + 1);
      case 40:
        return dt(e, T.PAREN_L, s, s + 1);
      case 41:
        return dt(e, T.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return dt(e, T.SPREAD, s, s + 3);
        break;
      case 58:
        return dt(e, T.COLON, s, s + 1);
      case 61:
        return dt(e, T.EQUALS, s, s + 1);
      case 64:
        return dt(e, T.AT, s, s + 1);
      case 91:
        return dt(e, T.BRACKET_L, s, s + 1);
      case 93:
        return dt(e, T.BRACKET_R, s, s + 1);
      case 123:
        return dt(e, T.BRACE_L, s, s + 1);
      case 124:
        return dt(e, T.PIPE, s, s + 1);
      case 125:
        return dt(e, T.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? ig(e, s) : tg(e, s);
    }
    if (Nr(i) || i === 45)
      return eg(e, s, i);
    if (Su(i))
      return og(e, s);
    throw ht(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : dr(i) || qs(n, s) ? `Unexpected character: ${Rn(e, s)}.` : `Invalid character: ${Rn(e, s)}.`
    );
  }
  return dt(e, T.EOF, r, r);
}
function Kf(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (dr(i))
      ++s;
    else if (qs(n, s))
      s += 2;
    else
      break;
  }
  return dt(
    e,
    T.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function eg(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Nr(i))
      throw ht(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Rn(
          e,
          s
        )}.`
      );
  } else
    s = xi(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = xi(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = xi(e, s, i), i = r.charCodeAt(s)), i === 46 || Su(i))
    throw ht(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Rn(
        e,
        s
      )}.`
    );
  return dt(
    e,
    o ? T.FLOAT : T.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function xi(e, t, n) {
  if (!Nr(n))
    throw ht(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Rn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Nr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function tg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const A = n.charCodeAt(s);
    if (A === 34)
      return o += n.slice(i, s), dt(e, T.STRING, t, s + 1, o);
    if (A === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? ng(e, s) : rg(e, s) : sg(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (A === 10 || A === 13)
      break;
    if (dr(A))
      ++s;
    else if (qs(n, s))
      s += 2;
    else
      throw ht(
        e.source,
        s,
        `Invalid character within String: ${Rn(
          e,
          s
        )}.`
      );
  }
  throw ht(e.source, s, "Unterminated string.");
}
function ng(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !dr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | wr(i), r < 0)
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
function rg(e, t) {
  const n = e.source.body, r = Ac(n, t + 2);
  if (dr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (_u(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Ac(n, t + 8);
    if (Mu(s))
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
function Ac(e, t) {
  return wr(e.charCodeAt(t)) << 12 | wr(e.charCodeAt(t + 1)) << 8 | wr(e.charCodeAt(t + 2)) << 4 | wr(e.charCodeAt(t + 3));
}
function wr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function sg(e, t) {
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
function ig(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, A = "";
  const d = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      A += n.slice(o, i), d.push(A);
      const y = dt(
        e,
        T.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Xf(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, y;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      A += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      A += n.slice(o, i), d.push(A), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, A = "", o = i, s = i;
      continue;
    }
    if (dr(h))
      ++i;
    else if (qs(n, i))
      i += 2;
    else
      throw ht(
        e.source,
        i,
        `Invalid character within String: ${Rn(
          e,
          i
        )}.`
      );
  }
  throw ht(e.source, i, "Unterminated string.");
}
function og(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Vf(i))
      ++s;
    else
      break;
  }
  return dt(
    e,
    T.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function ps(e, t) {
  if (!!!e)
    throw new Error(t);
}
const ag = 10, ku = 2;
function Ou(e) {
  return Ws(e, []);
}
function Ws(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return cg(e, t);
    default:
      return String(e);
  }
}
function cg(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Ag(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : Ws(r, n);
  } else if (Array.isArray(e))
    return dg(e, n);
  return ug(e, n);
}
function Ag(e) {
  return typeof e.toJSON == "function";
}
function ug(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > ku ? "[" + lg(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + Ws(i, t)
  ).join(", ") + " }";
}
function dg(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > ku)
    return "[Array]";
  const n = Math.min(ag, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(Ws(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function lg(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const hg = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class Tu {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || ps(!1, `Body must be a string. Received: ${Ou(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || ps(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || ps(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function fg(e) {
  return hg(e, Tu);
}
function Lu(e, t) {
  return new Yr(e, t).parseDocument();
}
function gg(e, t) {
  const n = new Yr(e, t);
  n.expectToken(T.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(T.EOF), r;
}
function pg(e, t) {
  const n = new Yr(e, t);
  n.expectToken(T.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(T.EOF), r;
}
function mg(e, t) {
  const n = new Yr(e, t);
  n.expectToken(T.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(T.EOF), r;
}
class Yr {
  constructor(t, n = {}) {
    const r = fg(t) ? t : new Tu(t);
    this._lexer = new Wf(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(T.NAME);
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
        T.SOF,
        this.parseDefinition,
        T.EOF
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
    if (this.peek(T.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === T.NAME) {
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
    if (this.peek(T.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: Ln.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(T.NAME) && (r = this.parseName()), this.node(t, {
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
    const t = this.expectToken(T.NAME);
    switch (t.value) {
      case "query":
        return Ln.QUERY;
      case "mutation":
        return Ln.MUTATION;
      case "subscription":
        return Ln.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      T.PAREN_L,
      this.parseVariableDefinition,
      T.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ae.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(T.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(T.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(T.DOLLAR), this.node(t, {
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
        T.BRACE_L,
        this.parseSelection,
        T.BRACE_R
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
    return this.peek(T.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(T.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ae.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(T.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(T.PAREN_L, n, T.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(T.COLON), this.node(n, {
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
    this.expectToken(T.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(T.NAME) ? this.node(t, {
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
      case T.BRACKET_L:
        return this.parseList(t);
      case T.BRACE_L:
        return this.parseObject(t);
      case T.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.INT,
          value: n.value
        });
      case T.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.FLOAT,
          value: n.value
        });
      case T.STRING:
      case T.BLOCK_STRING:
        return this.parseStringLiteral();
      case T.NAME:
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
      case T.DOLLAR:
        if (t)
          if (this.expectToken(T.DOLLAR), this._lexer.token.kind === T.NAME) {
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
      block: t.kind === T.BLOCK_STRING
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
      values: this.any(T.BRACKET_L, n, T.BRACKET_R)
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
      fields: this.any(T.BRACE_L, n, T.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(T.COLON), this.node(n, {
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
    for (; this.peek(T.AT); )
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
    return this.expectToken(T.AT), this.node(n, {
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
    if (this.expectOptionalToken(T.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(T.BRACKET_R), n = this.node(t, {
        kind: ae.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(T.BANG) ? this.node(t, {
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
    return this.peek(T.STRING) || this.peek(T.BLOCK_STRING);
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
      T.BRACE_L,
      this.parseOperationTypeDefinition,
      T.BRACE_R
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
    this.expectToken(T.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(T.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      T.BRACE_L,
      this.parseFieldDefinition,
      T.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(T.COLON);
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
      T.PAREN_L,
      this.parseInputValueDef,
      T.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(T.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(T.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(T.EQUALS) ? this.delimitedMany(T.PIPE, this.parseNamedType) : [];
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
      T.BRACE_L,
      this.parseEnumValueDefinition,
      T.BRACE_R
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
        `${ns(
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
      T.BRACE_L,
      this.parseInputValueDef,
      T.BRACE_R
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
    if (t.kind === T.NAME)
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
      T.BRACE_L,
      this.parseOperationTypeDefinition,
      T.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(T.AT);
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
    return this.delimitedMany(T.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call($i, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Yf(
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
      `Expected ${Pu(t)}, found ${ns(n)}.`
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
    if (n.kind === T.NAME && n.value === t)
      this.advanceLexer();
    else
      throw ht(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${ns(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === T.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return ht(
      this._lexer.source,
      n.start,
      `Unexpected ${ns(n)}.`
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
    if (t !== void 0 && n.kind !== T.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw ht(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ns(e) {
  const t = e.value;
  return Pu(e.kind) + (t != null ? ` "${t}"` : "");
}
function Pu(e) {
  return $f(e) ? `"${e}"` : e;
}
const Eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Yr,
  parse: Lu,
  parseConstValue: pg,
  parseType: mg,
  parseValue: gg
}, Symbol.toStringTag, { value: "Module" })), wg = /* @__PURE__ */ go(Eg);
function Ig(e) {
  return `"${e.replace(yg, Bg)}"`;
}
const yg = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Bg(e) {
  return Cg[e.charCodeAt(0)];
}
const Cg = [
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
], bg = Object.freeze({});
function Qg(e, t, n = Ru) {
  const r = /* @__PURE__ */ new Map();
  for (const _ of Object.values(ae))
    r.set(_, vg(t, _));
  let s, i = Array.isArray(e), o = [e], A = -1, d = [], h = e, y, E;
  const C = [], x = [];
  do {
    A++;
    const _ = A === o.length, Z = _ && d.length !== 0;
    if (_) {
      if (y = x.length === 0 ? void 0 : C[C.length - 1], h = E, E = x.pop(), Z)
        if (i) {
          h = h.slice();
          let X = 0;
          for (const [k, M] of d) {
            const O = k - X;
            M === null ? (h.splice(O, 1), X++) : h[O] = M;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [X, k] of d)
            h[X] = k;
        }
      A = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (E) {
      if (y = i ? A : o[A], h = E[y], h == null)
        continue;
      C.push(y);
    }
    let L;
    if (!Array.isArray(h)) {
      var F, b;
      cc(h) || ps(!1, `Invalid AST Node: ${Ou(h)}.`);
      const X = _ ? (F = r.get(h.kind)) === null || F === void 0 ? void 0 : F.leave : (b = r.get(h.kind)) === null || b === void 0 ? void 0 : b.enter;
      if (L = X == null ? void 0 : X.call(t, h, y, E, C, x), L === bg)
        break;
      if (L === !1) {
        if (!_) {
          C.pop();
          continue;
        }
      } else if (L !== void 0 && (d.push([y, L]), !_))
        if (cc(L))
          h = L;
        else {
          C.pop();
          continue;
        }
    }
    if (L === void 0 && Z && d.push([y, h]), _)
      C.pop();
    else {
      var N;
      s = {
        inArray: i,
        index: A,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (N = n[h.kind]) !== null && N !== void 0 ? N : [], A = -1, d = [], E && x.push(E), E = h;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function vg(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Uu(e) {
  return Qg(e, Fg);
}
const xg = 80, Fg = {
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
    leave: ({ selections: e }) => Mt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", te(n, ", "), ")");
      return o.length > xg && (o = i + pe(`(
`, ms(te(n, `
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
    leave: ({ value: e, block: t }) => t ? qf(e) : Ig(e)
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
`) + te(["schema", te(t, " "), Mt(n)], " ")
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
        Mt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (uc(n) ? pe(`(
`, ms(te(n, `
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
        Mt(s)
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
`) + te(["enum", t, te(n, " "), Mt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + te(["input", t, te(n, " "), Mt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (uc(n) ? pe(`(
`, ms(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), Mt(t)],
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
        Mt(r)
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
        Mt(r)
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
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), Mt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), Mt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Mt(e) {
  return pe(`{
`, ms(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function ms(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function uc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Dg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: Uu
}, Symbol.toStringTag, { value: "Module" })), Rg = /* @__PURE__ */ go(Dg);
var jo = {}, $s = {}, Gu = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Ng = Gu, Hu = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Ng;
}, Sg = Hu, _g = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = Sg);
  var s, i = /* @__PURE__ */ new Map();
  function o(y, E) {
    var C = i.get(E);
    C ? C.push.apply(C, y) : i.set(E, y);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var A = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(y, E) {
        return o(["" + A + E], y), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(y, E) {
        var C = e(y, "" + A + E, r);
        return C.files.forEach(o), C.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var h = e(t[d], "" + A + d, r);
        h.files.forEach(o), s[d] = h.clone;
      }
    } else
      s = t;
  }
  return {
    clone: s,
    files: i
  };
};
$s.ReactNativeFile = Gu;
$s.extractFiles = _g;
$s.isExtractableFile = Hu;
var Mg = typeof self == "object" ? self.FormData : window.FormData, Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.defaultJsonSerializer = void 0;
Zr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var kg = Be && Be.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(jo, "__esModule", { value: !0 });
var Ju = $s, Og = kg(Mg), Tg = Zr, Lg = function(e) {
  return Ju.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Pg(e, t, n, r) {
  r === void 0 && (r = Tg.defaultJsonSerializer);
  var s = Ju.extractFiles({ query: e, variables: t, operationName: n }, "", Lg), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var A = e.reduce(function(C, x, F) {
      return C.push({ query: x, variables: t ? t[F] : void 0 }), C;
    }, []);
    return r.stringify(A);
  }
  var d = typeof FormData > "u" ? Og.default : FormData, h = new d();
  h.append("operations", r.stringify(i));
  var y = {}, E = 0;
  return o.forEach(function(C) {
    y[++E] = C;
  }), h.append("map", r.stringify(y)), E = 0, o.forEach(function(C, x) {
    h.append("" + ++E, x);
  }), h;
}
jo.default = Pg;
var bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.parseBatchRequestsExtendedArgs = bt.parseRawRequestExtendedArgs = bt.parseRequestExtendedArgs = bt.parseBatchRequestArgs = bt.parseRawRequestArgs = bt.parseRequestArgs = void 0;
function Ug(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseRequestArgs = Ug;
function Gg(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseRawRequestArgs = Gg;
function Hg(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
bt.parseBatchRequestArgs = Hg;
function Jg(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
bt.parseRequestExtendedArgs = Jg;
function Yg(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
bt.parseRawRequestExtendedArgs = Yg;
function Zg(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
bt.parseBatchRequestsExtendedArgs = Zg;
var Vr = {}, Vg = Be && Be.__extends || function() {
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
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.ClientError = void 0;
var Xg = (
  /** @class */
  function(e) {
    Vg(t, e);
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
Vr.ClientError = Xg;
var fr = {}, dc;
function jg() {
  if (dc)
    return fr;
  dc = 1;
  var e = Be && Be.__assign || function() {
    return e = Object.assign || function(k) {
      for (var M, O = 1, P = arguments.length; O < P; O++) {
        M = arguments[O];
        for (var W in M)
          Object.prototype.hasOwnProperty.call(M, W) && (k[W] = M[W]);
      }
      return k;
    }, e.apply(this, arguments);
  }, t = Be && Be.__awaiter || function(k, M, O, P) {
    function W(U) {
      return U instanceof O ? U : new O(function(H) {
        H(U);
      });
    }
    return new (O || (O = Promise))(function(U, H) {
      function K(c) {
        try {
          a(P.next(c));
        } catch (l) {
          H(l);
        }
      }
      function B(c) {
        try {
          a(P.throw(c));
        } catch (l) {
          H(l);
        }
      }
      function a(c) {
        c.done ? U(c.value) : W(c.value).then(K, B);
      }
      a((P = P.apply(k, M || [])).next());
    });
  }, n = Be && Be.__generator || function(k, M) {
    var O = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, W, U, H;
    return H = { next: K(0), throw: K(1), return: K(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function K(a) {
      return function(c) {
        return B([a, c]);
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
          a = M.call(k, O);
        } catch (c) {
          a = [6, c], W = 0;
        } finally {
          P = U = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(fr, "__esModule", { value: !0 }), fr.GraphQLWebSocketClient = void 0;
  var r = Vr, s = Yu(), i = "connection_init", o = "connection_ack", A = "ping", d = "pong", h = "subscribe", y = "next", E = "error", C = "complete", x = (
    /** @class */
    function() {
      function k(M, O, P) {
        this._type = M, this._payload = O, this._id = P;
      }
      return Object.defineProperty(k.prototype, "type", {
        get: function() {
          return this._type;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(k.prototype, "id", {
        get: function() {
          return this._id;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(k.prototype, "payload", {
        get: function() {
          return this._payload;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(k.prototype, "text", {
        get: function() {
          var M = { type: this.type };
          return this.id != null && this.id != null && (M.id = this.id), this.payload != null && this.payload != null && (M.payload = this.payload), JSON.stringify(M);
        },
        enumerable: !1,
        configurable: !0
      }), k.parse = function(M, O) {
        var P = JSON.parse(M), W = P.type, U = P.payload, H = P.id;
        return new k(W, O(U), H);
      }, k;
    }()
  ), F = (
    /** @class */
    function() {
      function k(M, O) {
        var P = this, W = O.onInit, U = O.onAcknowledged, H = O.onPing, K = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = M, M.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, c, l, p;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, c = (a = M).send, l = N, W ? [4, W()] : [3, 2];
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
        }, M.onclose = function(B) {
          P.socketState.acknowledged = !1, P.socketState.subscriptions = {};
        }, M.onerror = function(B) {
          console.error(B);
        }, M.onmessage = function(B) {
          try {
            var a = b(B.data);
            switch (a.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, U && U(a.payload));
                return;
              }
              case A: {
                H ? H(a.payload).then(function(w) {
                  return M.send(Z(w).text);
                }) : M.send(Z(null).text);
                return;
              }
              case d: {
                K && K(a.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || a.id === void 0 || a.id === null || !P.socketState.subscriptions[a.id])
              return;
            var c = P.socketState.subscriptions[a.id], l = c.query, p = c.variables, f = c.subscriber;
            switch (a.type) {
              case y: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case E: {
                f.error && f.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case C: {
                f.complete && f.complete(), delete P.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (w) {
            console.error(w), M.close(1006);
          }
          M.close(4400, "Unknown graphql-ws message.");
        };
      }
      return k.prototype.makeSubscribe = function(M, O, P, W) {
        var U = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: M, variables: P, subscriber: W }, this.socket.send(L(H, { query: M, operationName: O, variables: P }).text), function() {
          U.socket.send(X(H).text), delete U.socketState.subscriptions[H];
        };
      }, k.prototype.rawRequest = function(M, O) {
        var P = this;
        return new Promise(function(W, U) {
          var H;
          P.rawSubscribe(M, {
            next: function(K, B) {
              return H = { data: K, extensions: B };
            },
            error: U,
            complete: function() {
              return W(H);
            }
          }, O);
        });
      }, k.prototype.request = function(M, O) {
        var P = this;
        return new Promise(function(W, U) {
          var H;
          P.subscribe(M, {
            next: function(K) {
              return H = K;
            },
            error: U,
            complete: function() {
              return W(H);
            }
          }, O);
        });
      }, k.prototype.subscribe = function(M, O, P) {
        var W = s.resolveRequestDocument(M), U = W.query, H = W.operationName;
        return this.makeSubscribe(U, H, P, O);
      }, k.prototype.rawSubscribe = function(M, O, P) {
        return this.makeSubscribe(M, void 0, P, O);
      }, k.prototype.ping = function(M) {
        this.socket.send(_(M).text);
      }, k.prototype.close = function() {
        this.socket.close(1e3);
      }, k.PROTOCOL = "graphql-transport-ws", k;
    }()
  );
  fr.GraphQLWebSocketClient = F;
  function b(k, M) {
    M === void 0 && (M = function(P) {
      return P;
    });
    var O = x.parse(k, M);
    return O;
  }
  function N(k) {
    return new x(i, k);
  }
  function _(k) {
    return new x(A, k, void 0);
  }
  function Z(k) {
    return new x(d, k, void 0);
  }
  function L(k, M) {
    return new x(h, M, k);
  }
  function X(k) {
    return new x(C, void 0, k);
  }
  return fr;
}
var lc;
function Yu() {
  return lc || (lc = 1, function(e) {
    var t = Be && Be.__assign || function() {
      return t = Object.assign || function(f) {
        for (var w, I = 1, g = arguments.length; I < g; I++) {
          w = arguments[I];
          for (var u in w)
            Object.prototype.hasOwnProperty.call(w, u) && (f[u] = w[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = Be && Be.__createBinding || (Object.create ? function(f, w, I, g) {
      g === void 0 && (g = I), Object.defineProperty(f, g, { enumerable: !0, get: function() {
        return w[I];
      } });
    } : function(f, w, I, g) {
      g === void 0 && (g = I), f[g] = w[I];
    }), r = Be && Be.__setModuleDefault || (Object.create ? function(f, w) {
      Object.defineProperty(f, "default", { enumerable: !0, value: w });
    } : function(f, w) {
      f.default = w;
    }), s = Be && Be.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var w = {};
      if (f != null)
        for (var I in f)
          I !== "default" && Object.prototype.hasOwnProperty.call(f, I) && n(w, f, I);
      return r(w, f), w;
    }, i = Be && Be.__awaiter || function(f, w, I, g) {
      function u(m) {
        return m instanceof I ? m : new I(function(Y) {
          Y(m);
        });
      }
      return new (I || (I = Promise))(function(m, Y) {
        function V(ne) {
          try {
            q(g.next(ne));
          } catch (re) {
            Y(re);
          }
        }
        function $(ne) {
          try {
            q(g.throw(ne));
          } catch (re) {
            Y(re);
          }
        }
        function q(ne) {
          ne.done ? m(ne.value) : u(ne.value).then(V, $);
        }
        q((g = g.apply(f, w || [])).next());
      });
    }, o = Be && Be.__generator || function(f, w) {
      var I = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, u, m, Y;
      return Y = { next: V(0), throw: V(1), return: V(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function V(q) {
        return function(ne) {
          return $([q, ne]);
        };
      }
      function $(q) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; I; )
          try {
            if (g = 1, u && (m = q[0] & 2 ? u.return : q[0] ? u.throw || ((m = u.return) && m.call(u), 0) : u.next) && !(m = m.call(u, q[1])).done)
              return m;
            switch (u = 0, m && (q = [q[0] & 2, m.value]), q[0]) {
              case 0:
              case 1:
                m = q;
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
                if (m = I.trys, !(m = m.length > 0 && m[m.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  I = 0;
                  continue;
                }
                if (q[0] === 3 && (!m || q[1] > m[0] && q[1] < m[3])) {
                  I.label = q[1];
                  break;
                }
                if (q[0] === 6 && I.label < m[1]) {
                  I.label = m[1], m = q;
                  break;
                }
                if (m && I.label < m[2]) {
                  I.label = m[2], I.ops.push(q);
                  break;
                }
                m[2] && I.ops.pop(), I.trys.pop();
                continue;
            }
            q = w.call(f, I);
          } catch (ne) {
            q = [6, ne], u = 0;
          } finally {
            g = m = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, A = Be && Be.__rest || function(f, w) {
      var I = {};
      for (var g in f)
        Object.prototype.hasOwnProperty.call(f, g) && w.indexOf(g) < 0 && (I[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(f); u < g.length; u++)
          w.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[u]) && (I[g[u]] = f[g[u]]);
      return I;
    }, d = Be && Be.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(Lf), y = h, E = wg, C = Rg, x = d(jo), F = Zr, b = bt, N = Vr;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return N.ClientError;
    } });
    var _ = function(f) {
      var w = {};
      return f && (typeof Headers < "u" && f instanceof Headers || y && y.Headers && f instanceof y.Headers ? w = l(f) : Array.isArray(f) ? f.forEach(function(I) {
        var g = I[0], u = I[1];
        w[g] = u;
      }) : w = f), w;
    }, Z = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, L = function(f) {
      var w = f.query, I = f.variables, g = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(w)) {
        var m = ["query=" + encodeURIComponent(Z(w))];
        return I && m.push("variables=" + encodeURIComponent(u.stringify(I))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof I < "u" && !Array.isArray(I))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = w.reduce(function(V, $, q) {
        return V.push({
          query: Z($),
          variables: I ? u.stringify(I[q]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Y));
    }, X = function(f) {
      var w = f.url, I = f.query, g = f.variables, u = f.operationName, m = f.headers, Y = f.fetch, V = f.fetchOptions, $ = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return q = x.default(I, g, u, V.jsonSerializer), ne = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), m), body: q }, V), $ ? [4, Promise.resolve($(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Y(w, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, k = function(f) {
      var w = f.url, I = f.query, g = f.variables, u = f.operationName, m = f.headers, Y = f.fetch, V = f.fetchOptions, $ = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return q = L({
                query: I,
                variables: g,
                operationName: u,
                jsonSerializer: V.jsonSerializer
              }), ne = t({ method: "GET", headers: m }, V), $ ? [4, Promise.resolve($(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Y(w + "?" + q, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, M = (
      /** @class */
      function() {
        function f(w, I) {
          I === void 0 && (I = {}), this.url = w, this.options = I;
        }
        return f.prototype.rawRequest = function(w, I, g) {
          return i(this, void 0, void 0, function() {
            var u, m, Y, V, $, q, ne, re, Re, fe, oe, Qe;
            return o(this, function(ue) {
              return u = b.parseRawRequestArgs(w, I, g), m = this.options, Y = m.headers, V = m.fetch, $ = V === void 0 ? h.default : V, q = m.method, ne = q === void 0 ? "POST" : q, re = m.requestMiddleware, Re = m.responseMiddleware, fe = A(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (fe.signal = u.signal), Qe = B(u.query).operationName, [2, O({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, _(a(Y))), _(u.requestHeaders)),
                operationName: Qe,
                fetch: $,
                method: ne,
                fetchOptions: fe,
                middleware: re
              }).then(function(ge) {
                return Re && Re(ge), ge;
              }).catch(function(ge) {
                throw Re && Re(ge), ge;
              })];
            });
          });
        }, f.prototype.request = function(w) {
          for (var I = [], g = 1; g < arguments.length; g++)
            I[g - 1] = arguments[g];
          var u = I[0], m = I[1], Y = b.parseRequestArgs(w, u, m), V = this.options, $ = V.headers, q = V.fetch, ne = q === void 0 ? h.default : q, re = V.method, Re = re === void 0 ? "POST" : re, fe = V.requestMiddleware, oe = V.responseMiddleware, Qe = A(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ue = this.url;
          Y.signal !== void 0 && (Qe.signal = Y.signal);
          var ge = B(Y.document), Gt = ge.query, ve = ge.operationName;
          return O({
            url: ue,
            query: Gt,
            variables: Y.variables,
            headers: t(t({}, _(a($))), _(Y.requestHeaders)),
            operationName: ve,
            fetch: ne,
            method: Re,
            fetchOptions: Qe,
            middleware: fe
          }).then(function(Ie) {
            return oe && oe(Ie), Ie.data;
          }).catch(function(Ie) {
            throw oe && oe(Ie), Ie;
          });
        }, f.prototype.batchRequests = function(w, I) {
          var g = b.parseBatchRequestArgs(w, I), u = this.options, m = u.headers, Y = u.fetch, V = Y === void 0 ? h.default : Y, $ = u.method, q = $ === void 0 ? "POST" : $, ne = u.requestMiddleware, re = u.responseMiddleware, Re = A(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Re.signal = g.signal);
          var oe = g.documents.map(function(ue) {
            var ge = ue.document;
            return B(ge).query;
          }), Qe = g.documents.map(function(ue) {
            var ge = ue.variables;
            return ge;
          });
          return O({
            url: fe,
            query: oe,
            variables: Qe,
            headers: t(t({}, _(a(m))), _(g.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: q,
            fetchOptions: Re,
            middleware: ne
          }).then(function(ue) {
            return re && re(ue), ue.data;
          }).catch(function(ue) {
            throw re && re(ue), ue;
          });
        }, f.prototype.setHeaders = function(w) {
          return this.options.headers = w, this;
        }, f.prototype.setHeader = function(w, I) {
          var g, u = this.options.headers;
          return u ? u[w] = I : this.options.headers = (g = {}, g[w] = I, g), this;
        }, f.prototype.setEndpoint = function(w) {
          return this.url = w, this;
        }, f;
      }()
    );
    e.GraphQLClient = M;
    function O(f) {
      var w = f.url, I = f.query, g = f.variables, u = f.headers, m = f.operationName, Y = f.fetch, V = f.method, $ = V === void 0 ? "POST" : V, q = f.fetchOptions, ne = f.middleware;
      return i(this, void 0, void 0, function() {
        var re, Re, fe, oe, Qe, ue, ge, Gt, ve, Ie, lr;
        return o(this, function(Ne) {
          switch (Ne.label) {
            case 0:
              return re = $.toUpperCase() === "POST" ? X : k, Re = Array.isArray(I), [4, re({
                url: w,
                query: I,
                variables: g,
                operationName: m,
                headers: u,
                fetch: Y,
                fetchOptions: q,
                middleware: ne
              })];
            case 1:
              return fe = Ne.sent(), [4, H(fe, q.jsonSerializer)];
            case 2:
              if (oe = Ne.sent(), Qe = Re && Array.isArray(oe) ? !oe.some(function(Me) {
                var qr = Me.data;
                return !qr;
              }) : !!oe.data, ue = !oe.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", fe.ok && ue && Qe)
                return ge = fe.headers, Gt = fe.status, oe.errors, ve = A(oe, ["errors"]), Ie = q.errorPolicy === "ignore" ? ve : oe, [2, t(t({}, Re ? { data: Ie } : Ie), { headers: ge, status: Gt })];
              throw lr = typeof oe == "string" ? { error: oe } : oe, new N.ClientError(t(t({}, lr), { status: fe.status, headers: fe.headers }), { query: I, variables: g });
          }
        });
      });
    }
    function P(f, w, I, g) {
      return i(this, void 0, void 0, function() {
        var u, m;
        return o(this, function(Y) {
          return u = b.parseRawRequestExtendedArgs(f, w, I, g), m = new M(u.url), [2, m.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function W(f, w) {
      for (var I = [], g = 2; g < arguments.length; g++)
        I[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, m, Y, V;
        return o(this, function($) {
          return u = I[0], m = I[1], Y = b.parseRequestExtendedArgs(f, w, u, m), V = new M(Y.url), [2, V.request(t({}, Y))];
        });
      });
    }
    e.request = W;
    function U(f, w, I) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(m) {
          return g = b.parseBatchRequestsExtendedArgs(f, w, I), u = new M(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = U, e.default = W;
    function H(f, w) {
      return w === void 0 && (w = F.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var I, g, u;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return f.headers.forEach(function(Y, V) {
                V.toLowerCase() === "content-type" && (I = Y);
              }), I && I.toLowerCase().startsWith("application/json") ? (u = (g = w).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [m.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function K(f) {
      var w, I = void 0, g = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (I = (w = g[0].name) === null || w === void 0 ? void 0 : w.value), I;
    }
    function B(f) {
      if (typeof f == "string") {
        var w = void 0;
        try {
          var I = E.parse(f);
          w = K(I);
        } catch {
        }
        return { query: f, operationName: w };
      }
      var g = K(f);
      return { query: C.print(f), operationName: g };
    }
    e.resolveRequestDocument = B;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function c(f) {
      for (var w = [], I = 1; I < arguments.length; I++)
        w[I - 1] = arguments[I];
      return f.reduce(function(g, u, m) {
        return "" + g + u + (m in w ? w[m] : "");
      }, "");
    }
    e.gql = c;
    function l(f) {
      var w = {};
      return f.forEach(function(I, g) {
        w[g] = I;
      }), w;
    }
    var p = jg();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(vi)), vi;
}
var qg = Yu();
function Wg(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Zu(e) {
  return function t(n) {
    return arguments.length === 0 || Wg(n) ? t : e.apply(this, arguments);
  };
}
var $g = /* @__PURE__ */ Zu(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function zg(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Vu(e, t, n) {
  if (n || (n = new ep()), Kg(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var A in e)
      Object.prototype.hasOwnProperty.call(e, A) && (i[A] = t ? Vu(e[A], !0, n) : e[A]);
    return i;
  };
  switch ($g(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return zg(e);
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
function Kg(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var ep = /* @__PURE__ */ function() {
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
          const A = i[o];
          if (A[0] === t)
            return A[1];
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
}(), tp = /* @__PURE__ */ Zu(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Vu(t, !0);
});
const Sr = tp;
var Ms = function() {
  return Ms = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Ms.apply(this, arguments);
};
var Es = /* @__PURE__ */ new Map(), Ki = /* @__PURE__ */ new Map(), Xu = !0, ks = !1;
function ju(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function np(e) {
  return ju(e.source.body.substring(e.start, e.end));
}
function rp(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = np(r.loc), o = Ki.get(s);
      o && !o.has(i) ? Xu && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Ki.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Ms(Ms({}, e), { definitions: n });
}
function sp(e) {
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
function ip(e) {
  var t = ju(e);
  if (!Es.has(t)) {
    var n = Lu(e, {
      experimentalFragmentVariables: ks,
      allowLegacyFragmentVariables: ks
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Es.set(t, sp(rp(n)));
  }
  return Es.get(t);
}
function or(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), ip(r);
}
function op() {
  Es.clear(), Ki.clear();
}
function ap() {
  Xu = !1;
}
function cp() {
  ks = !0;
}
function Ap() {
  ks = !1;
}
var gr = {
  gql: or,
  resetCaches: op,
  disableFragmentWarnings: ap,
  enableExperimentalFragmentVariables: cp,
  disableExperimentalFragmentVariables: Ap
};
(function(e) {
  e.gql = gr.gql, e.resetCaches = gr.resetCaches, e.disableFragmentWarnings = gr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = gr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = gr.disableExperimentalFragmentVariables;
})(or || (or = {}));
or.default = or;
const ce = or;
var De = "0x0000000000000000000000000000000000000000000000000000000000000000", kI = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", OI = 16 * 1024, TI = 16, LI = 1024 * 1024 * 1024, PI = 1024 * 1024 * 1024, UI = 255, GI = 1024 * 1024, HI = 1024 * 1024, up = "0xffffffffffff0000", qu = "0xffffffffffff0001", dp = "0xffffffffffff0003", lp = "0xffffffffffff0004", hp = "0xffffffffffff0005", JI = "0x0", fp = [
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
], gp = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let de;
const Wu = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Wu.decode();
let Ir = null;
function $u() {
  return (Ir === null || Ir.byteLength === 0) && (Ir = new Uint8Array(de.memory.buffer)), Ir;
}
function pp(e, t) {
  return e = e >>> 0, Wu.decode($u().subarray(e, e + t));
}
function zu(e) {
  const t = de.ret(e);
  return _t.__wrap(t);
}
function mp(e, t) {
  const n = de.retd(e, t);
  return _t.__wrap(n);
}
function hc(e, t, n, r) {
  const s = de.call(e, t, n, r);
  return _t.__wrap(s);
}
function Ep(e, t, n) {
  const r = de.tr(e, t, n);
  return _t.__wrap(r);
}
function fc(e, t, n) {
  const r = de.addi(e, t, n);
  return _t.__wrap(r);
}
function wp(e, t, n) {
  const r = de.muli(e, t, n);
  return _t.__wrap(r);
}
function yr(e, t, n) {
  const r = de.lw(e, t, n);
  return _t.__wrap(r);
}
function Ip(e, t, n) {
  const r = de.gtf(e, t, n);
  return _t.__wrap(r);
}
function rs(e, t) {
  const n = de.movi(e, t);
  return _t.__wrap(n);
}
let Br = null;
function gc() {
  return (Br === null || Br.byteLength === 0) && (Br = new Int32Array(de.memory.buffer)), Br;
}
function yp(e, t) {
  return e = e >>> 0, $u().subarray(e / 1, e / 1 + t);
}
const Bp = Object.freeze({
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
class _t {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(_t.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    de.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = de.__wbindgen_add_to_stack_pointer(-16);
      de.instruction_to_bytes(s, this.__wbg_ptr);
      var t = gc()[s / 4 + 0], n = gc()[s / 4 + 1], r = yp(t, n).slice();
      return de.__wbindgen_free(t, n * 1, 1), r;
    } finally {
      de.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return de.instruction_size() >>> 0;
  }
}
class Se {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Se.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    de.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = de.regid_new_checked(t);
    return n === 0 ? void 0 : Se.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = de.regid_bal();
    return Se.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = de.regid_cgas();
    return Se.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = de.regid_err();
    return Se.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = de.regid_flag();
    return Se.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = de.regid_fp();
    return Se.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = de.regid_ggas();
    return Se.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = de.regid_hp();
    return Se.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = de.regid_is();
    return Se.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = de.regid_of();
    return Se.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = de.regid_one();
    return Se.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = de.regid_pc();
    return Se.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = de.regid_ret();
    return Se.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = de.regid_retl();
    return Se.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = de.regid_sp();
    return Se.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = de.regid_spp();
    return Se.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = de.regid_writable();
    return Se.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = de.regid_zero();
    return Se.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = de.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return de.regid_to_u8(t);
  }
}
async function Cp(e, t) {
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
function bp() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(pp(t, n));
  }, e;
}
function Qp(e, t) {
  return de = e.exports, Ku.__wbindgen_wasm_module = t, Br = null, Ir = null, de;
}
async function Ku(e) {
  if (de !== void 0)
    return de;
  const t = bp(), { instance: n, module: r } = await Cp(await e, t);
  return Qp(n, r);
}
function vp(e, t, n, r) {
  function s(E, C, x) {
    var F = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, b = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? F(E, C) : b(E);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var A = globalThis.atob(n), d = A.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var h = 0; h < d; h++)
      i[h] = A.charCodeAt(h);
  }
  if (e) {
    var y = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(y, r) : y;
  } else
    return s(i, r, !1);
}
function xp(e) {
  return vp(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function qo() {
  return await Ku(xp());
}
qo();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gt = BigInt(0), Oe = BigInt(1), xn = BigInt(2), Fp = BigInt(3), eo = BigInt(4), pc = BigInt(5), mc = BigInt(8);
BigInt(9);
BigInt(16);
function Bt(e, t) {
  const n = e % t;
  return n >= gt ? n : t + n;
}
function Dp(e, t, n) {
  if (n <= gt || t < gt)
    throw new Error("Expected power/modulo > 0");
  if (n === Oe)
    return gt;
  let r = Oe;
  for (; t > gt; )
    t & Oe && (r = r * e % n), e = e * e % n, t >>= Oe;
  return r;
}
function Rt(e, t, n) {
  let r = e;
  for (; t-- > gt; )
    r *= r, r %= n;
  return r;
}
function to(e, t) {
  if (e === gt || t <= gt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Bt(e, t), r = t, s = gt, i = Oe;
  for (; n !== gt; ) {
    const A = r / n, d = r % n, h = s - i * A;
    r = n, n = d, s = i, i = h;
  }
  if (r !== Oe)
    throw new Error("invert: does not exist");
  return Bt(s, t);
}
function Rp(e) {
  const t = (e - Oe) / xn;
  let n, r, s;
  for (n = e - Oe, r = 0; n % xn === gt; n /= xn, r++)
    ;
  for (s = xn; s < e && Dp(s, t, e) !== e - Oe; s++)
    ;
  if (r === 1) {
    const o = (e + Oe) / eo;
    return function(d, h) {
      const y = d.pow(h, o);
      if (!d.eql(d.sqr(y), h))
        throw new Error("Cannot find square root");
      return y;
    };
  }
  const i = (n + Oe) / xn;
  return function(A, d) {
    if (A.pow(d, t) === A.neg(A.ONE))
      throw new Error("Cannot find square root");
    let h = r, y = A.pow(A.mul(A.ONE, s), n), E = A.pow(d, i), C = A.pow(d, n);
    for (; !A.eql(C, A.ONE); ) {
      if (A.eql(C, A.ZERO))
        return A.ZERO;
      let x = 1;
      for (let b = A.sqr(C); x < h && !A.eql(b, A.ONE); x++)
        b = A.sqr(b);
      const F = A.pow(y, Oe << BigInt(h - x - 1));
      y = A.sqr(F), E = A.mul(E, F), C = A.mul(C, y), h = x;
    }
    return E;
  };
}
function Np(e) {
  if (e % eo === Fp) {
    const t = (e + Oe) / eo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % mc === pc) {
    const t = (e - pc) / mc;
    return function(r, s) {
      const i = r.mul(s, xn), o = r.pow(i, t), A = r.mul(s, o), d = r.mul(r.mul(A, xn), o), h = r.mul(A, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return Rp(e);
}
const Sp = [
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
function _p(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Sp.reduce((r, s) => (r[s] = "function", r), t);
  return Jr(e, n);
}
function Mp(e, t, n) {
  if (n < gt)
    throw new Error("Expected power > 0");
  if (n === gt)
    return e.ONE;
  if (n === Oe)
    return t;
  let r = e.ONE, s = t;
  for (; n > gt; )
    n & Oe && (r = e.mul(r, s)), s = e.sqr(s), n >>= Oe;
  return r;
}
function kp(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, A) => e.is0(o) ? i : (n[A] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, A) => e.is0(o) ? i : (n[A] = e.mul(i, n[A]), e.mul(i, o)), s), n;
}
function ed(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Op(e, t, n = !1, r = {}) {
  if (e <= gt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = ed(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Np(e), A = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: Vo(s),
    ZERO: gt,
    ONE: Oe,
    create: (d) => Bt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return gt <= d && d < e;
    },
    is0: (d) => d === gt,
    isOdd: (d) => (d & Oe) === Oe,
    neg: (d) => Bt(-d, e),
    eql: (d, h) => d === h,
    sqr: (d) => Bt(d * d, e),
    add: (d, h) => Bt(d + h, e),
    sub: (d, h) => Bt(d - h, e),
    mul: (d, h) => Bt(d * h, e),
    pow: (d, h) => Mp(A, d, h),
    div: (d, h) => Bt(d * to(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, h) => d + h,
    subN: (d, h) => d - h,
    mulN: (d, h) => d * h,
    inv: (d) => to(d, e),
    sqrt: r.sqrt || ((d) => o(A, d)),
    invertBatch: (d) => kp(A, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, h, y) => y ? h : d,
    toBytes: (d) => n ? Zo(d, i) : ir(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? Yo(d) : Dn(d);
    }
  });
  return Object.freeze(A);
}
function td(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function nd(e) {
  const t = td(e);
  return t + Math.ceil(t / 2);
}
function Tp(e, t, n = !1) {
  const r = e.length, s = td(t), i = nd(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Dn(e) : Yo(e), A = Bt(o, t - Oe) + Oe;
  return n ? Zo(A, s) : ir(A, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Lp = BigInt(0), Fi = BigInt(1);
function Pp(e, t) {
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
      let o = e.ZERO, A = s;
      for (; i > Lp; )
        i & Fi && (o = o.add(A)), A = A.double(), i >>= Fi;
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
      const { windows: o, windowSize: A } = r(i), d = [];
      let h = s, y = h;
      for (let E = 0; E < o; E++) {
        y = h, d.push(y);
        for (let C = 1; C < A; C++)
          y = y.add(h), d.push(y);
        h = y.double();
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
      const { windows: A, windowSize: d } = r(s);
      let h = e.ZERO, y = e.BASE;
      const E = BigInt(2 ** s - 1), C = 2 ** s, x = BigInt(s);
      for (let F = 0; F < A; F++) {
        const b = F * d;
        let N = Number(o & E);
        o >>= x, N > d && (N -= C, o += Fi);
        const _ = b, Z = b + Math.abs(N) - 1, L = F % 2 !== 0, X = N < 0;
        N === 0 ? y = y.add(n(L, i[_])) : h = h.add(n(X, i[Z]));
      }
      return { p: h, f: y };
    },
    wNAFCached(s, i, o, A) {
      const d = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, d), d !== 1 && i.set(s, A(h))), this.wNAF(d, h, o);
    }
  };
}
function rd(e) {
  return _p(e.Fp), Jr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...ed(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Up(e) {
  const t = rd(e);
  Jr(t, {
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
const { bytesToNumberBE: Gp, hexToBytes: Hp } = Tf, Fn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Fn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Gp(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Fn, n = typeof e == "string" ? Hp(e) : e;
    if (!jt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Fn._parseInt(n.subarray(2)), { d: o, l: A } = Fn._parseInt(i);
    if (A.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const y = h.toString(16);
      return y.length & 1 ? `0${y}` : y;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, A = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${A}${r}`;
  }
}, tn = BigInt(0), Nt = BigInt(1);
BigInt(2);
const Ec = BigInt(3);
BigInt(4);
function Jp(e) {
  const t = Up(e), { Fp: n } = t, r = t.toBytes || ((F, b, N) => {
    const _ = b.toAffine();
    return Rr(Uint8Array.from([4]), n.toBytes(_.x), n.toBytes(_.y));
  }), s = t.fromBytes || ((F) => {
    const b = F.subarray(1), N = n.fromBytes(b.subarray(0, n.BYTES)), _ = n.fromBytes(b.subarray(n.BYTES, 2 * n.BYTES));
    return { x: N, y: _ };
  });
  function i(F) {
    const { a: b, b: N } = t, _ = n.sqr(F), Z = n.mul(_, F);
    return n.add(n.add(Z, n.mul(F, b)), N);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(F) {
    return typeof F == "bigint" && tn < F && F < t.n;
  }
  function A(F) {
    if (!o(F))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(F) {
    const { allowedPrivateKeyLengths: b, nByteLength: N, wrapPrivateKey: _, n: Z } = t;
    if (b && typeof F != "bigint") {
      if (jt(F) && (F = rr(F)), typeof F != "string" || !b.includes(F.length))
        throw new Error("Invalid key");
      F = F.padStart(N * 2, "0");
    }
    let L;
    try {
      L = typeof F == "bigint" ? F : Dn(Ot("private key", F, N));
    } catch {
      throw new Error(`private key must be ${N} bytes, hex or bigint, not ${typeof F}`);
    }
    return _ && (L = Bt(L, Z)), A(L), L;
  }
  const h = /* @__PURE__ */ new Map();
  function y(F) {
    if (!(F instanceof E))
      throw new Error("ProjectivePoint expected");
  }
  class E {
    constructor(b, N, _) {
      if (this.px = b, this.py = N, this.pz = _, b == null || !n.isValid(b))
        throw new Error("x required");
      if (N == null || !n.isValid(N))
        throw new Error("y required");
      if (_ == null || !n.isValid(_))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: N, y: _ } = b || {};
      if (!b || !n.isValid(N) || !n.isValid(_))
        throw new Error("invalid affine point");
      if (b instanceof E)
        throw new Error("projective point not allowed");
      const Z = (L) => n.eql(L, n.ZERO);
      return Z(N) && Z(_) ? E.ZERO : new E(N, _, n.ONE);
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
    static normalizeZ(b) {
      const N = n.invertBatch(b.map((_) => _.pz));
      return b.map((_, Z) => _.toAffine(N[Z])).map(E.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const N = E.fromAffine(s(Ot("pointHex", b)));
      return N.assertValidity(), N;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(b) {
      return E.BASE.multiply(d(b));
    }
    // "Private method", don't use it directly
    _setWindowSize(b) {
      this._WINDOW_SIZE = b, h.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: b, y: N } = this.toAffine();
      if (!n.isValid(b) || !n.isValid(N))
        throw new Error("bad point: x or y not FE");
      const _ = n.sqr(N), Z = i(b);
      if (!n.eql(_, Z))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: b } = this.toAffine();
      if (n.isOdd)
        return !n.isOdd(b);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(b) {
      y(b);
      const { px: N, py: _, pz: Z } = this, { px: L, py: X, pz: k } = b, M = n.eql(n.mul(N, k), n.mul(L, Z)), O = n.eql(n.mul(_, k), n.mul(X, Z));
      return M && O;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new E(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: b, b: N } = t, _ = n.mul(N, Ec), { px: Z, py: L, pz: X } = this;
      let k = n.ZERO, M = n.ZERO, O = n.ZERO, P = n.mul(Z, Z), W = n.mul(L, L), U = n.mul(X, X), H = n.mul(Z, L);
      return H = n.add(H, H), O = n.mul(Z, X), O = n.add(O, O), k = n.mul(b, O), M = n.mul(_, U), M = n.add(k, M), k = n.sub(W, M), M = n.add(W, M), M = n.mul(k, M), k = n.mul(H, k), O = n.mul(_, O), U = n.mul(b, U), H = n.sub(P, U), H = n.mul(b, H), H = n.add(H, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, U), P = n.mul(P, H), M = n.add(M, P), U = n.mul(L, X), U = n.add(U, U), P = n.mul(U, H), k = n.sub(k, P), O = n.mul(U, W), O = n.add(O, O), O = n.add(O, O), new E(k, M, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      y(b);
      const { px: N, py: _, pz: Z } = this, { px: L, py: X, pz: k } = b;
      let M = n.ZERO, O = n.ZERO, P = n.ZERO;
      const W = t.a, U = n.mul(t.b, Ec);
      let H = n.mul(N, L), K = n.mul(_, X), B = n.mul(Z, k), a = n.add(N, _), c = n.add(L, X);
      a = n.mul(a, c), c = n.add(H, K), a = n.sub(a, c), c = n.add(N, Z);
      let l = n.add(L, k);
      return c = n.mul(c, l), l = n.add(H, B), c = n.sub(c, l), l = n.add(_, Z), M = n.add(X, k), l = n.mul(l, M), M = n.add(K, B), l = n.sub(l, M), P = n.mul(W, c), M = n.mul(U, B), P = n.add(M, P), M = n.sub(K, P), P = n.add(K, P), O = n.mul(M, P), K = n.add(H, H), K = n.add(K, H), B = n.mul(W, B), c = n.mul(U, c), K = n.add(K, B), B = n.sub(H, B), B = n.mul(W, B), c = n.add(c, B), H = n.mul(K, c), O = n.add(O, H), H = n.mul(l, c), M = n.mul(a, M), M = n.sub(M, H), H = n.mul(a, K), P = n.mul(l, P), P = n.add(P, H), new E(M, O, P);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(E.ZERO);
    }
    wNAF(b) {
      return x.wNAFCached(this, h, b, (N) => {
        const _ = n.invertBatch(N.map((Z) => Z.pz));
        return N.map((Z, L) => Z.toAffine(_[L])).map(E.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const N = E.ZERO;
      if (b === tn)
        return N;
      if (A(b), b === Nt)
        return this;
      const { endo: _ } = t;
      if (!_)
        return x.unsafeLadder(this, b);
      let { k1neg: Z, k1: L, k2neg: X, k2: k } = _.splitScalar(b), M = N, O = N, P = this;
      for (; L > tn || k > tn; )
        L & Nt && (M = M.add(P)), k & Nt && (O = O.add(P)), P = P.double(), L >>= Nt, k >>= Nt;
      return Z && (M = M.negate()), X && (O = O.negate()), O = new E(n.mul(O.px, _.beta), O.py, O.pz), M.add(O);
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
    multiply(b) {
      A(b);
      let N = b, _, Z;
      const { endo: L } = t;
      if (L) {
        const { k1neg: X, k1: k, k2neg: M, k2: O } = L.splitScalar(N);
        let { p: P, f: W } = this.wNAF(k), { p: U, f: H } = this.wNAF(O);
        P = x.constTimeNegate(X, P), U = x.constTimeNegate(M, U), U = new E(n.mul(U.px, L.beta), U.py, U.pz), _ = P.add(U), Z = W.add(H);
      } else {
        const { p: X, f: k } = this.wNAF(N);
        _ = X, Z = k;
      }
      return E.normalizeZ([_, Z])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(b, N, _) {
      const Z = E.BASE, L = (k, M) => M === tn || M === Nt || !k.equals(Z) ? k.multiplyUnsafe(M) : k.multiply(M), X = L(this, N).add(L(b, _));
      return X.is0() ? void 0 : X;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      const { px: N, py: _, pz: Z } = this, L = this.is0();
      b == null && (b = L ? n.ONE : n.inv(Z));
      const X = n.mul(N, b), k = n.mul(_, b), M = n.mul(Z, b);
      if (L)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(M, n.ONE))
        throw new Error("invZ was invalid");
      return { x: X, y: k };
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: N } = t;
      if (b === Nt)
        return !0;
      if (N)
        return N(E, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: N } = t;
      return b === Nt ? this : N ? N(E, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(b = !0) {
      return this.assertValidity(), r(E, this, b);
    }
    toHex(b = !0) {
      return rr(this.toRawBytes(b));
    }
  }
  E.BASE = new E(t.Gx, t.Gy, n.ONE), E.ZERO = new E(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, x = Pp(E, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: E,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Yp(e) {
  const t = rd(e);
  return Jr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Zp(e) {
  const t = Yp(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(c) {
    return tn < c && c < n.ORDER;
  }
  function A(c) {
    return Bt(c, r);
  }
  function d(c) {
    return to(c, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: y, weierstrassEquation: E, isWithinCurveOrder: C } = Jp({
    ...t,
    toBytes(c, l, p) {
      const f = l.toAffine(), w = n.toBytes(f.x), I = Rr;
      return p ? I(Uint8Array.from([l.hasEvenY() ? 2 : 3]), w) : I(Uint8Array.from([4]), w, n.toBytes(f.y));
    },
    fromBytes(c) {
      const l = c.length, p = c[0], f = c.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const w = Dn(f);
        if (!o(w))
          throw new Error("Point is not on curve");
        const I = E(w);
        let g = n.sqrt(I);
        const u = (g & Nt) === Nt;
        return (p & 1) === 1 !== u && (g = n.neg(g)), { x: w, y: g };
      } else if (l === i && p === 4) {
        const w = n.fromBytes(f.subarray(0, n.BYTES)), I = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: w, y: I };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (c) => rr(ir(c, t.nByteLength));
  function F(c) {
    const l = r >> Nt;
    return c > l;
  }
  function b(c) {
    return F(c) ? A(-c) : c;
  }
  const N = (c, l, p) => Dn(c.slice(l, p));
  class _ {
    constructor(l, p, f) {
      this.r = l, this.s = p, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Ot("compactSignature", l, p * 2), new _(N(l, 0, p), N(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: f } = Fn.toSig(Ot("DER", l));
      return new _(p, f);
    }
    assertValidity() {
      if (!C(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!C(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new _(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: f, recovery: w } = this, I = O(Ot("msgHash", l));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const g = w === 2 || w === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = w & 1 ? "03" : "02", m = h.fromHex(u + x(g)), Y = d(g), V = A(-I * Y), $ = A(f * Y), q = h.BASE.multiplyAndAddUnsafe(m, V, $);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return F(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new _(this.r, A(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return sr(this.toDERHex());
    }
    toDERHex() {
      return Fn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return sr(this.toCompactHex());
    }
    toCompactHex() {
      return x(this.r) + x(this.s);
    }
  }
  const Z = {
    isValidPrivateKey(c) {
      try {
        return y(c), !0;
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
      const c = nd(t.n);
      return Tp(t.randomBytes(c), t.n);
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
  function L(c, l = !0) {
    return h.fromPrivateKey(c).toRawBytes(l);
  }
  function X(c) {
    const l = jt(c), p = typeof c == "string", f = (l || p) && c.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : c instanceof h;
  }
  function k(c, l, p = !0) {
    if (X(c))
      throw new Error("first arg must be private key");
    if (!X(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(y(c)).toRawBytes(p);
  }
  const M = t.bits2int || function(c) {
    const l = Dn(c), p = c.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, O = t.bits2int_modN || function(c) {
    return A(M(c));
  }, P = Vo(t.nBitLength);
  function W(c) {
    if (typeof c != "bigint")
      throw new Error("bigint expected");
    if (!(tn <= c && c < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ir(c, t.nByteLength);
  }
  function U(c, l, p = H) {
    if (["recovered", "canonical"].some((re) => re in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: w } = t;
    let { lowS: I, prehash: g, extraEntropy: u } = p;
    I == null && (I = !0), c = Ot("msgHash", c), g && (c = Ot("prehashed msgHash", f(c)));
    const m = O(c), Y = y(l), V = [W(Y), W(m)];
    if (u != null) {
      const re = u === !0 ? w(n.BYTES) : u;
      V.push(Ot("extraEntropy", re));
    }
    const $ = Rr(...V), q = m;
    function ne(re) {
      const Re = M(re);
      if (!C(Re))
        return;
      const fe = d(Re), oe = h.BASE.multiply(Re).toAffine(), Qe = A(oe.x);
      if (Qe === tn)
        return;
      const ue = A(fe * A(q + Qe * Y));
      if (ue === tn)
        return;
      let ge = (oe.x === Qe ? 0 : 2) | Number(oe.y & Nt), Gt = ue;
      return I && F(ue) && (Gt = b(ue), ge ^= 1), new _(Qe, Gt, ge);
    }
    return { seed: $, k2sig: ne };
  }
  const H = { lowS: t.lowS, prehash: !1 }, K = { lowS: t.lowS, prehash: !1 };
  function B(c, l, p = H) {
    const { seed: f, k2sig: w } = U(c, l, p), I = t;
    return xu(I.hash.outputLen, I.nByteLength, I.hmac)(f, w);
  }
  h.BASE._setWindowSize(8);
  function a(c, l, p, f = K) {
    var oe;
    const w = c;
    if (l = Ot("msgHash", l), p = Ot("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: I, prehash: g } = f;
    let u, m;
    try {
      if (typeof w == "string" || jt(w))
        try {
          u = _.fromDER(w);
        } catch (Qe) {
          if (!(Qe instanceof Fn.Err))
            throw Qe;
          u = _.fromCompact(w);
        }
      else if (typeof w == "object" && typeof w.r == "bigint" && typeof w.s == "bigint") {
        const { r: Qe, s: ue } = w;
        u = new _(Qe, ue);
      } else
        throw new Error("PARSE");
      m = h.fromHex(p);
    } catch (Qe) {
      if (Qe.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (I && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: Y, s: V } = u, $ = O(l), q = d(V), ne = A($ * q), re = A(Y * q), Re = (oe = h.BASE.multiplyAndAddUnsafe(m, ne, re)) == null ? void 0 : oe.toAffine();
    return Re ? A(Re.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: L,
    getSharedSecret: k,
    sign: B,
    verify: a,
    ProjectivePoint: h,
    Signature: _,
    utils: Z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Vp(e) {
  return {
    hash: e,
    hmac: (t, ...n) => vo(e, t, zl(...n)),
    randomBytes: eh
  };
}
function Xp(e, t) {
  const n = (r) => Zp({ ...e, ...Vp(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const sd = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), wc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), jp = BigInt(1), no = BigInt(2), Ic = (e, t) => (e + t / no) / t;
function qp(e) {
  const t = sd, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), A = BigInt(44), d = BigInt(88), h = e * e * e % t, y = h * h * e % t, E = Rt(y, n, t) * y % t, C = Rt(E, n, t) * y % t, x = Rt(C, no, t) * h % t, F = Rt(x, s, t) * x % t, b = Rt(F, i, t) * F % t, N = Rt(b, A, t) * b % t, _ = Rt(N, d, t) * N % t, Z = Rt(_, A, t) * b % t, L = Rt(Z, n, t) * y % t, X = Rt(L, o, t) * F % t, k = Rt(X, r, t) * h % t, M = Rt(k, no, t);
  if (!ro.eql(ro.sqr(M), e))
    throw new Error("Cannot find square root");
  return M;
}
const ro = Op(sd, void 0, void 0, { sqrt: qp }), fn = Xp({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: ro,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: wc,
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
      const t = wc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -jp * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), A = Ic(i * e, t), d = Ic(-r * e, t);
      let h = Bt(e - A * n - d * s, t), y = Bt(-A * r - d * i, t);
      const E = h > o, C = y > o;
      if (E && (h = t - h), C && (y = t - y), h > o || y > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: E, k1: h, k2neg: C, k2: y };
    }
  }
}, Gr);
BigInt(0);
fn.ProjectivePoint;
let ss;
const Wp = new Uint8Array(16);
function $p() {
  if (!ss && (ss = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ss))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ss(Wp);
}
const pt = [];
for (let e = 0; e < 256; ++e)
  pt.push((e + 256).toString(16).slice(1));
function zp(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
const Kp = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), yc = {
  randomUUID: Kp
};
function em(e, t, n) {
  if (yc.randomUUID && !t && !e)
    return yc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || $p)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return zp(r);
}
var Wo = { exports: {} }, Jn = typeof Reflect == "object" ? Reflect : null, Bc = Jn && typeof Jn.apply == "function" ? Jn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, ws;
Jn && typeof Jn.ownKeys == "function" ? ws = Jn.ownKeys : Object.getOwnPropertySymbols ? ws = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : ws = function(t) {
  return Object.getOwnPropertyNames(t);
};
function tm(e) {
  console && console.warn && console.warn(e);
}
var id = Number.isNaN || function(t) {
  return t !== t;
};
function Ce() {
  Ce.init.call(this);
}
Wo.exports = Ce;
Wo.exports.once = im;
Ce.EventEmitter = Ce;
Ce.prototype._events = void 0;
Ce.prototype._eventsCount = 0;
Ce.prototype._maxListeners = void 0;
var Cc = 10;
function zs(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Ce, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Cc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || id(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Cc = e;
  }
});
Ce.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Ce.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || id(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function od(e) {
  return e._maxListeners === void 0 ? Ce.defaultMaxListeners : e._maxListeners;
}
Ce.prototype.getMaxListeners = function() {
  return od(this);
};
Ce.prototype.emit = function(t) {
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
    var A = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw A.context = o, A;
  }
  var d = i[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    Bc(d, this, n);
  else
    for (var h = d.length, y = dd(d, h), r = 0; r < h; ++r)
      Bc(y[r], this, n);
  return !0;
};
function ad(e, t, n, r) {
  var s, i, o;
  if (zs(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = od(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var A = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    A.name = "MaxListenersExceededWarning", A.emitter = e, A.type = t, A.count = o.length, tm(A);
  }
  return e;
}
Ce.prototype.addListener = function(t, n) {
  return ad(this, t, n, !1);
};
Ce.prototype.on = Ce.prototype.addListener;
Ce.prototype.prependListener = function(t, n) {
  return ad(this, t, n, !0);
};
function nm() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function cd(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = nm.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Ce.prototype.once = function(t, n) {
  return zs(n), this.on(t, cd(this, t, n)), this;
};
Ce.prototype.prependOnceListener = function(t, n) {
  return zs(n), this.prependListener(t, cd(this, t, n)), this;
};
Ce.prototype.removeListener = function(t, n) {
  var r, s, i, o, A;
  if (zs(n), s = this._events, s === void 0)
    return this;
  if (r = s[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        A = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : rm(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, A || n);
  }
  return this;
};
Ce.prototype.off = Ce.prototype.removeListener;
Ce.prototype.removeAllListeners = function(t) {
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
function Ad(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? sm(s) : dd(s, s.length);
}
Ce.prototype.listeners = function(t) {
  return Ad(this, t, !0);
};
Ce.prototype.rawListeners = function(t) {
  return Ad(this, t, !1);
};
Ce.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : ud.call(e, t);
};
Ce.prototype.listenerCount = ud;
function ud(e) {
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
Ce.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ws(this._events) : [];
};
function dd(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function rm(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function sm(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function im(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    ld(e, t, i, { once: !0 }), t !== "error" && om(e, s, { once: !0 });
  });
}
function om(e, t, n) {
  typeof e.on == "function" && ld(e, "error", t, n);
}
function ld(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var hd = Wo.exports, am = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", cm = class {
  constructor(e, t, n, r, s, i = 0) {
    R(this, "left");
    R(this, "right");
    R(this, "parent");
    R(this, "hash");
    R(this, "data");
    R(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, bc = cm;
function Am(e) {
  return sn("0x00".concat(e.slice(2)));
}
function um(e, t) {
  return sn("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function fd(e) {
  if (!e.length)
    return am;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = Am(e[i]);
    t.push(new bc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, A = um(n[o].hash, n[o + 1].hash);
      t[i] = new bc(n[o].index, n[o + 1].index, -1, A, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var dm = "0x00", gd = "0x01";
function lm(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(sn(t).slice(2));
  return [sn(n), n];
}
function Nn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [sn(n), n];
}
function Di(e) {
  const t = gd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function hm(e) {
  const t = gd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Ri(e) {
  return e.slice(0, 4) === dm;
}
var fm = class {
  constructor(e, t, n, r, s) {
    R(this, "SideNodes");
    R(this, "NonMembershipLeafData");
    R(this, "BitMask");
    R(this, "NumSideNodes");
    R(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, gm = fm, pm = class {
  constructor(e, t, n) {
    R(this, "SideNodes");
    R(this, "NonMembershipLeafData");
    R(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, mm = pm, vt = "0x0000000000000000000000000000000000000000000000000000000000000000", Kt = 256;
function Pn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function Em(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function wm(e, t) {
  let n = 0;
  for (let r = 0; r < Kt && Pn(e, r) === Pn(t, r); r += 1)
    n += 1;
  return n;
}
function Im(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === vt ? t.push(0) : (n.push(r), t.push(1));
  return new gm(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var ym = class {
  constructor() {
    R(this, "ms");
    R(this, "root");
    const e = {};
    this.ms = e, this.root = vt, this.ms[this.root] = vt;
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
    if (t === vt)
      return [n, vt, "", ""];
    let r = this.get(t);
    if (Ri(r))
      return [n, t, r, ""];
    let s, i, o = "", A = "";
    for (let h = 0; h < Kt; h += 1) {
      if ([s, i] = hm(r), Pn(e, h) === 1 ? (A = s, o = i) : (A = i, o = s), n.push(A), o === vt) {
        r = "";
        break;
      }
      if (r = this.get(o), Ri(r))
        break;
    }
    const d = this.get(A);
    return [Em(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === vt)
      return this.root;
    const [s] = Di(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", A = "", d = "", h = !1;
    for (let y = 0; y < t.length; y += 1)
      if (t[y] !== "") {
        if (A = t[y], o === "")
          if (d = this.get(A), Ri(d)) {
            i = A, o = A;
            continue;
          } else
            o = vt, h = !0;
        !h && A === vt || (h || (h = !0), Pn(e, t.length - 1 - y) === 1 ? [i, o] = Nn(A, o) : [i, o] = Nn(o, A), this.set(i, o), o = i);
      }
    return i === "" && (i = vt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(sn(t), t), [i, o] = lm(e, t), this.set(i, o), o = i;
    let A;
    if (r === vt)
      A = Kt;
    else {
      const [d] = Di(s);
      A = wm(e, d);
    }
    A !== Kt && (Pn(e, A) === 1 ? [i, o] = Nn(r, o) : [i, o] = Nn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < Kt; d += 1) {
      let h;
      const y = Kt - n.length;
      if (d - y < 0 || n[d - y] === "")
        if (A !== Kt && A > Kt - 1 - d)
          h = vt;
        else
          continue;
      else
        h = n[d - y];
      Pn(e, Kt - 1 - d) === 1 ? [i, o] = Nn(h, o) : [i, o] = Nn(o, h), this.set(i, o), o = i;
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
    if (n !== vt) {
      const [d] = Di(r);
      d !== e && (o = r);
    }
    return new mm(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return Im(t);
  }
}, Bm = Object.defineProperty, Cm = (e, t, n) => t in e ? Bm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _e = (e, t, n) => (Cm(e, typeof t != "symbol" ? t + "" : t, n), n), $o = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Fe = (e, t, n) => ($o(e, t, "read from private field"), n ? n.call(e) : t.get(e)), mn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Tt = (e, t, n, r) => ($o(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), so = (e, t, n) => ($o(e, t, "access private method"), n), zo = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: j(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, bm = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, Ko = ce`
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
    `, ea = ce`
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
    `, Xr = ce`
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
    ${Ko}
${ea}`, Qm = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, vm = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${Qm}`, ta = ce`
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
    `, xm = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Fm = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, Dm = ce`
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
    `, pd = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Ks = ce`
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
    `, Rm = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, Nm = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Sm = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, _m = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, Mm = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, km = ce`
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
    `, Om = ce`
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
    ${km}`, Tm = ce`
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
    ${Rm}
${Nm}
${Sm}
${_m}
${Mm}
${Om}`, Lm = ce`
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
    ${Ks}
${Tm}`, Pm = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Um = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Gm = ce`
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
    `, Hm = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Jm = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Gm}`, Ym = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Lm}`, Zm = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Xr}`, Vm = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${Xr}
${Ko}`, Xm = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${Xr}`, jm = ce`
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
    ${Um}
${Xr}`, qm = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${vm}`, Wm = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ks}`, $m = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Ks}
${Xr}`, zm = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Ks}`, Km = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${ta}`, eE = ce`
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
    ${ta}`, tE = ce`
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
    ${ta}
${xm}`, nE = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, rE = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Pm}`, sE = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${pd}`, iE = ce`
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
    ${pd}`, oE = ce`
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
    ${Fm}`, aE = ce`
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
    ${Dm}`, cE = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, AE = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${Ko}`, uE = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, dE = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, lE = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${ea}`, hE = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${ea}`;
function fE(e) {
  return {
    getVersion(t, n) {
      return e(Hm, t, n);
    },
    getNodeInfo(t, n) {
      return e(Jm, t, n);
    },
    getChain(t, n) {
      return e(Ym, t, n);
    },
    getTransaction(t, n) {
      return e(Zm, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Vm, t, n);
    },
    getTransactions(t, n) {
      return e(Xm, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(jm, t, n);
    },
    estimatePredicates(t, n) {
      return e(qm, t, n);
    },
    getBlock(t, n) {
      return e(Wm, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e($m, t, n);
    },
    getBlocks(t, n) {
      return e(zm, t, n);
    },
    getCoin(t, n) {
      return e(Km, t, n);
    },
    getCoins(t, n) {
      return e(eE, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(tE, t, n);
    },
    getContract(t, n) {
      return e(nE, t, n);
    },
    getContractBalance(t, n) {
      return e(rE, t, n);
    },
    getBalance(t, n) {
      return e(sE, t, n);
    },
    getBalances(t, n) {
      return e(iE, t, n);
    },
    getMessages(t, n) {
      return e(oE, t, n);
    },
    getMessageProof(t, n) {
      return e(aE, t, n);
    },
    getMessageStatus(t, n) {
      return e(cE, t, n);
    },
    dryRun(t, n) {
      return e(AE, t, n);
    },
    submit(t, n) {
      return e(uE, t, n);
    },
    produceBlocks(t, n) {
      return e(dE, t, n);
    },
    submitAndAwait(t, n) {
      return e(lE, t, n);
    },
    statusChange(t, n) {
      return e(hE, t, n);
    }
  };
}
var md = class {
  constructor(e) {
    R(this, "stream");
    R(this, "events", []);
    R(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: Uu(t),
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
        const { data: o, errors: A } = this.events.shift();
        if (Array.isArray(A))
          throw new v(
            v.CODES.INVALID_REQUEST,
            A.map((d) => d.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = md.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new v(
            D.STREAM_PARSING_ERROR,
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
}, Ed = md;
_e(Ed, "textDecoder", new TextDecoder());
var bn = {}, gE = 30 * 1e3, pE = class {
  constructor(e = gE) {
    R(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        D.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = j(e);
    if (bn[n]) {
      if (!t || bn[n].expires > Date.now())
        return bn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = j(e);
    return bn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(bn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(bn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = j(e);
    delete bn[t];
  }
}, mE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ee.Coin: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x");
      return {
        type: Ee.Coin,
        txID: j(J(e.id).slice(0, Bn)),
        outputIndex: Ft(J(e.id).slice(Bn, Hi)),
        owner: j(e.owner),
        amount: Q(e.amount),
        assetId: j(e.assetId),
        txPointer: {
          blockHeight: Ft(J(e.txPointer).slice(0, 8)),
          txIndex: Ft(J(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        maturity: e.maturity ?? 0,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: j(n),
        predicateData: j(r)
      };
    }
    case Ee.Contract:
      return {
        type: Ee.Contract,
        txID: De,
        outputIndex: 0,
        balanceRoot: De,
        stateRoot: De,
        txPointer: {
          blockHeight: Ft(J(e.txPointer).slice(0, 8)),
          txIndex: Ft(J(e.txPointer).slice(8, 16))
        },
        contractID: j(e.contractId)
      };
    case Ee.Message: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x"), s = J(e.data ?? "0x");
      return {
        type: Ee.Message,
        sender: j(e.sender),
        recipient: j(e.recipient),
        amount: Q(e.amount),
        nonce: j(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: j(n),
        predicateData: j(r),
        data: j(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, EE = (e) => {
  const { type: t } = e;
  switch (t) {
    case ye.Coin:
      return {
        type: ye.Coin,
        to: j(e.to),
        amount: Q(e.amount),
        assetId: j(e.assetId)
      };
    case ye.Contract:
      return {
        type: ye.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: De,
        stateRoot: De
      };
    case ye.Change:
      return {
        type: ye.Change,
        to: j(e.to),
        amount: Q(0),
        assetId: j(e.assetId)
      };
    case ye.Variable:
      return {
        type: ye.Variable,
        to: De,
        amount: Q(0),
        assetId: De
      };
    case ye.ContractCreated:
      return {
        type: ye.ContractCreated,
        contractId: j(e.contractId),
        stateRoot: j(e.stateRoot)
      };
    default:
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, ZI = (e) => "utxoId" in e, VI = (e) => "recipient" in e, Qc = (e) => "id" in e, XI = (e) => "recipient" in e, wE = (e) => e.type === Ae.Revert && e.val.toString("hex") === qu, IE = (e) => e.type === Ae.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", yE = (e) => e.reduce(
  (t, n) => (wE(n) && t.missingOutputVariables.push(n), IE(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), be = (e) => e || De;
function BE(e) {
  var n, r, s, i, o, A, d, h, y, E, C, x, F, b;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: Ae.Call,
        from: be((n = e.contract) == null ? void 0 : n.id),
        to: be((r = e == null ? void 0 : e.to) == null ? void 0 : r.id),
        amount: Q(e.amount),
        assetId: be(e.assetId),
        gas: Q(e.gas),
        param1: Q(e.param1),
        param2: Q(e.param2),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN":
      return {
        type: Ae.Return,
        id: be((s = e.contract) == null ? void 0 : s.id),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: Ae.ReturnData,
        id: be((i = e.contract) == null ? void 0 : i.id),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: be(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: Ae.Panic,
        id: be((o = e.contract) == null ? void 0 : o.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: be(e.contractId)
      };
    case "REVERT":
      return {
        type: Ae.Revert,
        id: be((A = e.contract) == null ? void 0 : A.id),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: Ae.Log,
        id: be((d = e.contract) == null ? void 0 : d.id),
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
        id: be((h = e.contract) == null ? void 0 : h.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: be(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER":
      return {
        type: Ae.Transfer,
        from: be((y = e.contract) == null ? void 0 : y.id),
        to: be(e.toAddress || ((E = e == null ? void 0 : e.to) == null ? void 0 : E.id)),
        amount: Q(e.amount),
        assetId: be(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: Ae.TransferOut,
        from: be((C = e.contract) == null ? void 0 : C.id),
        to: be(e.toAddress || ((x = e.to) == null ? void 0 : x.id)),
        amount: Q(e.amount),
        assetId: be(e.assetId),
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
      const N = be(e.sender), _ = be(e.recipient), Z = be(e.nonce), L = Q(e.amount), X = e.data ? J(e.data) : Uint8Array.from([]), k = be(e.digest), M = Ss.getMessageId({
        sender: N,
        recipient: _,
        nonce: Z,
        amount: L,
        data: X
      });
      return {
        type: Ae.MessageOut,
        sender: N,
        recipient: _,
        amount: L,
        nonce: Z,
        data: X,
        digest: k,
        messageId: M
      };
    }
    case "MINT": {
      const N = be((F = e.contract) == null ? void 0 : F.id), _ = be(e.subId), Z = Dr.getAssetId(N, _);
      return {
        type: Ae.Mint,
        subId: _,
        contractId: N,
        assetId: Z,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const N = be((b = e.contract) == null ? void 0 : b.id), _ = be(e.subId), Z = ji.getAssetId(N, _);
      return {
        type: Ae.Burn,
        subId: _,
        contractId: N,
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
var CE = "https://fuellabs.github.io/block-explorer-v2", bE = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, jI = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, A = t || CE, d = [
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
  ], h = d.filter((X) => !!X.value).map(({ key: X, value: k }) => ({
    key: X,
    value: k
  })), y = h.length > 0;
  if (h.length > 1)
    throw new v(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((X) => X.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const X = d.map(({ key: k }) => k).join(", ");
    throw new v(
      D.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${X}.`
    );
  }
  const E = y ? bE(
    h[0].key,
    h[0].value
  ) : "", C = /^\/|\/$/gm, x = n ? n.replace(C, "") : E, F = A.replace(C, ""), b = r == null ? void 0 : r.replace(C, ""), N = b ? encodeURIComponent(b) : void 0, _ = F.match(/^https?:\/\//) ? "" : "https://", Z = b != null && b.match(/^https?:\/\//) ? "" : "https://";
  return `${_}${F}/${x}${N ? `?providerUrl=${Z}${N}` : ""}`;
}, br = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), wd = (e) => e.filter(
  (r) => r.type === Ae.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function yn(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function QE(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    yn(t, n.vmInitialization).add(yn(J(o.predicate).length, n.contractRoot)).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function Id(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = yn(i, t.vmInitialization), A = Q(i).mul(n), d = QE(r, i, t);
  return o.add(A).add(d).add(s).maxU64();
}
function na(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function yd({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = yn(r, e.contractRoot), i = yn(t, e.stateRoot), o = yn(n, e.s256), A = Q(4 + 32 + 32 + 32), d = yn(A, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function Bd({
  gasCosts: e,
  txBytesSize: t
}) {
  return yn(t, e.s256);
}
function io(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = j(e[t]);
        break;
      case "Array":
        e[t] = io(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = io(e[t]);
        break;
    }
  }), e;
}
function vE(e) {
  return io(Sr(e));
}
function xE(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var FE = (e) => {
  let t = `The transaction reverted with reason: "${e.reason}".`;
  const n = e.reason;
  return fp.includes(e.reason) && (t = `${t}

You can read more about this error at:

${gp}#variant.${e.reason}`), { errorMessage: t, reason: n };
}, pr = (e) => JSON.stringify(e, null, 2), DE = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === Ae.Revert);
  let s = "";
  if (r)
    switch (Q(r.val).toHex()) {
      case up: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? pr(t[0]) : "an error."}.`;
        break;
      }
      case dp: {
        const o = t.length >= 2 ? ` comparing ${pr(t[1])} and ${pr(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case hp: {
        const o = t.length >= 2 ? ` comparing ${pr(t[1])} and ${pr(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case lp:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case qu:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, Cd = (e) => {
  const { receipts: t, status: n, logs: r } = e, s = t.some(({ type: h }) => h === Ae.Panic), i = t.some(({ type: h }) => h === Ae.Revert), { errorMessage: o, reason: A } = (n == null ? void 0 : n.type) === "FailureStatus" && s ? FE(n) : DE(t, r), d = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: A
  };
  return new v(D.SCRIPT_REVERTED, o, d);
}, qI = class extends Error {
  constructor() {
    super(...arguments);
    R(this, "name", "ChangeOutputCollisionError");
    R(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, RE = class extends Error {
  constructor(t) {
    super();
    R(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, WI = class extends Error {
  constructor(t) {
    super();
    R(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, NE = (e) => {
  const t = J(e);
  return {
    data: j(t),
    dataLength: t.length
  };
}, ei = class {
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
    R(this, "gasPrice");
    /** Block until which tx cannot be included */
    R(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    R(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    R(this, "witnessLimit");
    /** List of inputs */
    R(this, "inputs", []);
    /** List of outputs */
    R(this, "outputs", []);
    /** List of witnesses */
    R(this, "witnesses", []);
    this.gasPrice = Q(e), this.maturity = t ?? 0, this.witnessLimit = r ? Q(r) : void 0, this.maxFee = n ? Q(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.gasPrice && (t += kt.GasPrice, n.push({ data: e.gasPrice, type: kt.GasPrice })), e.witnessLimit && (t += kt.WitnessLimit, n.push({ data: e.witnessLimit, type: kt.WitnessLimit })), e.maturity > 0 && (t += kt.Maturity, n.push({ data: e.maturity, type: kt.Maturity })), e.maxFee && (t += kt.MaxFee, n.push({ data: e.maxFee, type: kt.MaxFee })), {
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
    var i, o, A;
    const e = ((i = this.inputs) == null ? void 0 : i.map(mE)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(EE)) ?? [], n = ((A = this.witnesses) == null ? void 0 : A.map(NE)) ?? [], { policyTypes: r, policies: s } = ei.getPolicyMeta(this);
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
    return this.addWitness(se([De, De])), this.witnesses.length - 1;
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
      throw new RE(e);
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
      (e) => e.type === Ee.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (e) => e.type === ye.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === ye.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = Er(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Ee.Coin:
          return j(r.owner) === t.toB256();
        case Ee.Message:
          return j(r.recipient) === t.toB256();
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
      type: Ee.Coin,
      owner: r.toB256(),
      amount: s,
      assetId: n,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: i,
      predicate: t == null ? void 0 : t.bytes
    };
    this.pushInput(o), this.addChangeOutput(r, n);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   * @param predicate - Predicate bytes.
   */
  addMessageInput(e, t) {
    const { recipient: n, sender: r, amount: s, assetId: i } = e;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.addEmptyWitness()));
    const A = {
      ...e,
      type: Ee.Message,
      sender: r.toB256(),
      recipient: n.toB256(),
      amount: s,
      witnessIndex: o,
      predicate: t == null ? void 0 : t.bytes
    };
    this.pushInput(A), this.addChangeOutput(n, i);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return Qc(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
    return Qc(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
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
  addCoinOutput(e, t, n) {
    return this.pushOutput({
      type: ye.Coin,
      to: Er(e).toB256(),
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
    return t.map(zo).forEach((n) => {
      this.pushOutput({
        type: ye.Coin,
        to: Er(e).toB256(),
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
      (r) => j(r.assetId) === t
    ) || this.pushOutput({
      type: ye.Change,
      to: Er(e).toB256(),
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
    return Id({
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
    return na({
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
   * @param baseAssetId - The base asset to fund the transaction.
   */
  fundWithFakeUtxos(e, t, n) {
    const r = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const A = r(i);
      A && "assetId" in A ? (A.id = j(Xt(Hi)), A.amount = o) : this.addResources([
        {
          id: j(Xt(Hi)),
          amount: o,
          assetId: i,
          owner: n || le.fromRandom(),
          maturity: 0,
          blockCreated: Q(1),
          txCreatedIdx: Q(1)
        }
      ]);
    };
    s(t, Q(1e11)), e.forEach((i) => s(i.assetId, i.amount));
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
    return vE(this);
  }
  updatePredicateInputs(e) {
    this.inputs.forEach((t) => {
      let n;
      switch (t.type) {
        case Ee.Coin:
          n = e.find((r) => r.type === Ee.Coin && r.owner === t.owner);
          break;
        case Ee.Message:
          n = e.find(
            (r) => r.type === Ee.Message && r.sender === t.sender
          );
          break;
        default:
          return;
      }
      n && "predicateGasUsed" in n && Q(n.predicateGasUsed).gt(0) && (t.predicate = n.predicate, t.predicateData = n.predicateData, t.predicateGasUsed = n.predicateGasUsed);
    });
  }
};
function bd(e, t) {
  const n = e.toTransaction();
  n.type === ft.Script && (n.receiptsRoot = De), n.inputs = n.inputs.map((i) => {
    const o = Sr(i);
    switch (o.type) {
      case Ee.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = Q(0), o;
      case Ee.Message:
        return o.predicateGasUsed = Q(0), o;
      case Ee.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = De, o.outputIndex = 0, o.balanceRoot = De, o.stateRoot = De, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Sr(i);
    switch (o.type) {
      case ye.Contract:
        return o.balanceRoot = De, o.stateRoot = De, o;
      case ye.Change:
        return o.amount = Q(0), o;
      case ye.Variable:
        return o.to = De, o.amount = Q(0), o.assetId = De, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Uh(t), s = se([r, new Cn().encode(n)]);
  return It(s);
}
var SE = (e) => {
  const t = new Uint8Array(32);
  return t.set(J(e)), t;
}, _E = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: j(t),
    value: j(SE(n))
  };
}, oo = class extends ei {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    R(this, "type", ft.Create);
    /** Witness index of contract bytecode to create */
    R(this, "bytecodeWitnessIndex");
    /** Salt */
    R(this, "salt");
    /** List of storage slots to initialize */
    R(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = j(n ?? De), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(_E)) ?? [];
    return {
      type: ft.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? j(this.salt) : De,
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
      (t) => t.type === ye.ContractCreated
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
    return bd(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: ye.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return yd({
      contractBytesSize: Q(J(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, vc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: J("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, ME = {
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
}, Yn = class extends ei {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    R(this, "type", ft.Script);
    /** Gas limit for transaction */
    R(this, "gasLimit");
    /** Script to execute */
    R(this, "script");
    /** Script input data (parameters) */
    R(this, "scriptData");
    R(this, "abis");
    this.gasLimit = Q(r), this.script = J(t ?? vc.bytes), this.scriptData = J(n ?? vc.encodeScriptData()), this.abis = s.abis;
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
      type: ft.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: t.length,
      scriptDataLength: n.length,
      receiptsRoot: De,
      script: j(t),
      scriptData: j(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === Ee.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (t) => t.type === ye.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === ye.Variable
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
        type: ye.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, A) => o + A.dataLength,
      0
    );
    return na({
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
    const n = Er(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: Ee.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: ye.Contract,
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
    return bd(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new on(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return Bd({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, St = (e) => {
  if (e instanceof Yn || e instanceof oo)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case ft.Script:
      return Yn.from(e);
    case ft.Create:
      return oo.from(e);
    default:
      throw new v(D.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, kE = (e) => {
  var P, W;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), A = J(n), [d] = new Cn().decode(A, 0);
  if (d.type === ft.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: h, witnesses: y, inputs: E, policies: C } = d;
  let x = Q(0), F = Q(0);
  if (h === ft.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, K = Q(J(y[U].data).length);
    x = yd({
      contractBytesSize: K,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: A.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (F = U), x = Bd({
      gasCosts: r,
      txBytesSize: A.length
    });
  }
  const b = Id({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: E,
    metadataGas: x,
    txBytesSize: A.length
  }), N = Q((P = C.find((U) => U.type === kt.GasPrice)) == null ? void 0 : P.data), _ = (W = C.find((U) => U.type === kt.WitnessLimit)) == null ? void 0 : W.data, Z = y.reduce((U, H) => U + H.dataLength, 0), L = na({
    gasPerByte: i,
    minGas: b,
    witnessesLength: Z,
    gasLimit: F,
    witnessLimit: _
  }), X = br(t, N, o), k = br(b, N, o), M = br(L, N, o);
  return {
    fee: k.add(X),
    minFee: k,
    maxFee: M,
    feeFromGasUsed: X
  };
}, OE = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var E;
  const s = new on(e), i = t.param1.toHex(8), o = s.getFunction(i), A = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const C = Q(t.param2).sub(Vs({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let h;
  if (d) {
    const C = o.decodeArguments(d);
    C && (h = A.reduce((x, F, b) => {
      const N = C[b], _ = F.name;
      return _ ? {
        ...x,
        // reparse to remove bn
        [_]: JSON.parse(JSON.stringify(N))
      } : x;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: h,
    ...(E = t.amount) != null && E.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function TE(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function ra(e, t) {
  return e.filter((n) => n.type === t);
}
function LE(e) {
  return ra(e, Ee.Coin);
}
function PE(e) {
  return ra(e, Ee.Message);
}
function UE(e) {
  return TE(e, [Ee.Coin, Ee.Message]);
}
function GE(e) {
  return ra(e, Ee.Contract);
}
function Qd(e, t) {
  const n = LE(e), r = PE(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function HE(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ee.Contract)
      throw new v(
        D.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function sa(e) {
  return e.type === Ee.Coin ? e.owner.toString() : e.type === Ee.Message ? e.recipient.toString() : "";
}
function jr(e, t) {
  return e.filter((n) => n.type === t);
}
function JE(e) {
  return jr(e, ye.ContractCreated);
}
function vd(e) {
  return jr(e, ye.Coin);
}
function YE(e) {
  return jr(e, ye.Change);
}
function ZE(e) {
  return jr(e, ye.Contract);
}
function $I(e) {
  return jr(e, ye.Variable);
}
var VE = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(VE || {}), XE = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(XE || {}), jE = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(jE || {}), qE = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(qE || {}), WE = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(WE || {});
function _r(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function xd(e) {
  switch (e) {
    case ft.Mint:
      return "Mint";
    case ft.Create:
      return "Create";
    case ft.Script:
      return "Script";
    default:
      throw new v(
        D.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function ia(e, t) {
  return xd(e) === t;
}
function $E(e) {
  return ia(
    e,
    "Mint"
    /* Mint */
  );
}
function Fd(e) {
  return ia(
    e,
    "Create"
    /* Create */
  );
}
function Dd(e) {
  return ia(
    e,
    "Script"
    /* Script */
  );
}
function zI(e) {
  return (t) => e.assetId === t.assetId;
}
function zE(e) {
  return _r(e, Ae.Call);
}
function KE(e) {
  return _r(e, Ae.MessageOut);
}
var ew = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((A) => A.assetId === o.assetId)
  );
  return n.map((o) => {
    const A = r.find((h) => h.assetId === o.assetId);
    if (!A)
      return o;
    const d = Q(o.amount).add(A.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function tw(e, t) {
  var n, r, s, i, o, A, d, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((A = t.from) == null ? void 0 : A.type) && ((d = e.to) == null ? void 0 : d.type) === ((h = t.to) == null ? void 0 : h.type);
}
function ar(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((A) => tw(A, t));
  if (n[r]) {
    const A = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (A.assetsSent = (i = A.assetsSent) != null && i.length ? ew(A, t) : t.assetsSent), (o = t.calls) != null && o.length && (A.calls = [...A.calls || [], ...t.calls]), n[r] = A;
  } else
    n.push(t);
  return n;
}
function KI(e) {
  return _r(e, Ae.TransferOut);
}
function nw({
  inputs: e,
  receipts: t
}) {
  return KE(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", A = Qd(e, o);
      if (A) {
        const d = sa(A);
        return ar(s, {
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
function rw({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = zE(n);
  return ZE(t).reduce((h, y) => {
    const E = HE(e, y.inputIndex);
    return E ? o.reduce((x, F) => {
      var b;
      if (F.to === E.contractID) {
        const N = Qd(e, F.assetId);
        if (N) {
          const _ = sa(N), Z = [], L = r == null ? void 0 : r[E.contractID];
          return L && Z.push(
            OE({
              abi: L,
              receipt: F,
              rawPayload: s,
              maxInputs: i
            })
          ), ar(x, {
            name: "Contract call",
            from: {
              type: 1,
              address: _
            },
            to: {
              type: 0,
              address: F.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (b = F.amount) != null && b.isZero() ? void 0 : [
              {
                amount: F.amount,
                assetId: F.assetId
              }
            ],
            calls: Z
          });
        }
      }
      return x;
    }, h) : h;
  }, []);
}
function sw(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const A = t.some((h) => h.contractID === r) ? 0 : 1;
  if (De === o) {
    const h = n.find((y) => y.assetId === s);
    o = (h == null ? void 0 : h.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((h) => h.contractID === o) ? 0 : 1,
      address: o
    },
    to: {
      type: A,
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
function xc({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = vd(t), i = GE(e), o = YE(t);
  s.forEach((h) => {
    const { amount: y, assetId: E, to: C } = h, x = o.find((F) => F.assetId === E);
    x && (r = ar(r, {
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
          assetId: E,
          amount: y
        }
      ]
    }));
  });
  const A = _r(
    n,
    Ae.Transfer
  ), d = _r(
    n,
    Ae.TransferOut
  );
  return [...A, ...d].forEach((h) => {
    const y = sw(h, i, o);
    r = ar(r, y);
  }), r;
}
function iw(e) {
  return vd(e).reduce((r, s) => ar(r, {
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
function ow({ inputs: e, outputs: t }) {
  const n = JE(t), r = UE(e)[0], s = sa(r);
  return n.reduce((o, A) => ar(o, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (A == null ? void 0 : A.contractId) || ""
    }
  }), []);
}
function aw({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return Fd(e) ? [
    ...ow({ inputs: t, outputs: n }),
    ...xc({ inputs: t, outputs: n, receipts: r })
  ] : Dd(e) ? [
    ...xc({ inputs: t, outputs: n, receipts: r }),
    ...rw({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...nw({ inputs: t, receipts: r })
  ] : [...iw(n)];
}
var Zn = (e) => {
  const t = BE(e);
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
}, cw = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Aw = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, uw = (e) => {
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
}, dw = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = uw(e.type), e.type) {
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
function ti(e) {
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: A,
    abiMap: d = {},
    maxInputs: h,
    gasCosts: y
  } = e, E = wd(n), C = j(o), x = aw({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: d,
    maxInputs: h
  }), F = xd(i.type), { fee: b } = kE({
    gasUsed: E,
    rawPayload: C,
    consensusParameters: {
      gasCosts: y,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: N, isStatusPending: _, isStatusSuccess: Z, blockId: L, status: X, time: k } = dw(A), M = cw(n), O = Aw(n);
  let P;
  return k && (P = fo.fromTai64(k)), {
    id: t,
    fee: b,
    gasUsed: E,
    operations: x,
    type: F,
    blockId: L,
    time: k,
    status: X,
    receipts: n,
    mintedAssets: M,
    burnedAssets: O,
    isTypeMint: $E(i.type),
    isTypeCreate: Fd(i.type),
    isTypeScript: Dd(i.type),
    isStatusFailure: N,
    isStatusSuccess: Z,
    isStatusPending: _,
    date: P,
    transaction: i
  };
}
function Rd(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === Ae.LogData || s.type === Ae.Log) {
      const i = new on(n[s.id] || t), o = s.type === Ae.Log ? new S("u64").encode(s.val0) : s.data, [A] = i.decodeLog(o, s.val1.toNumber());
      r.push(A);
    }
    return r;
  }, []);
}
var Is = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    R(this, "id");
    /** Current provider */
    R(this, "provider");
    /** Gas used on the transaction */
    R(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    R(this, "gqlTransaction");
    R(this, "abis");
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
    const r = new Is(e, t, n);
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
    var h;
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    ), r = ((h = t.receipts) == null ? void 0 : h.map(Zn)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), A = this.provider.getChain().consensusParameters.maxInputs;
    return ti({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: J(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: e,
      maxInputs: A,
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
    if (this.abis && (r = Rd(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r), n.isStatusFailure) {
      const {
        receipts: s,
        gqlTransaction: { status: i }
      } = n;
      throw Cd({
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
function lw(e, t) {
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
function Nd(e, t, n = 0) {
  return t === void 0 ? e : async (...r) => {
    var s;
    try {
      return await e(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const A = n + 1;
      if (A > t.maxRetries)
        throw o;
      const d = lw(t, A);
      return await xE(d), Nd(e, t, A)(...r);
    }
  };
}
var hw = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, fw = 10, gw = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: A, scriptParams: d, txParams: h, gasCosts: y } = r;
  return {
    name: t,
    baseChainHeight: Q(n),
    consensusParameters: {
      contractMaxSize: Q(i.contractMaxSize),
      maxInputs: Q(h.maxInputs),
      maxOutputs: Q(h.maxOutputs),
      maxWitnesses: Q(h.maxWitnesses),
      maxGasPerTx: Q(h.maxGasPerTx),
      maxScriptLength: Q(d.maxScriptLength),
      maxScriptDataLength: Q(d.maxScriptDataLength),
      maxStorageSlots: Q(i.maxStorageSlots),
      maxPredicateLength: Q(A.maxPredicateLength),
      maxPredicateDataLength: Q(A.maxPredicateDataLength),
      maxGasPerPredicate: Q(A.maxGasPerPredicate),
      gasPriceFactor: Q(o.gasPriceFactor),
      gasPerByte: Q(o.gasPerByte),
      maxMessageDataLength: Q(A.maxMessageDataLength),
      chainId: Q(r.chainId),
      baseAssetId: r.baseAssetId,
      gasCosts: y
    },
    gasCosts: y,
    latestBlock: {
      id: s.id,
      height: Q(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((E) => ({
        id: E.id
      }))
    }
  };
}, ao, Sd, Yt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, mn(this, ao), _e(this, "operations"), _e(this, "cache"), _e(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new pE(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Yt.nodeInfoCache = {}, Yt.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return Nd(async (...r) => {
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      let A = { ...i, signal: o };
      return e.requestMiddleware && (A = await e.requestMiddleware(A)), e.fetch ? e.fetch(s, A, e) : fetch(s, A);
    }, t);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(e, t = {}) {
    const n = new Yt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = Yt.chainInfoCache[this.url];
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
    const e = Yt.nodeInfoCache[this.url];
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
    return Yt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = d0(e.nodeVersion);
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
    const e = Yt.getFetchFn(this.options), t = new qg.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return fE((r, s) => {
      const i = r.definitions.find((A) => A.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new Ed({
        url: this.url,
        query: r,
        fetchFn: (A, d) => e(A, d, this.options),
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
    return Yt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = gw(e);
    return Yt.chainInfoCache[this.url] = t, t;
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
    const r = St(e);
    so(this, ao, Sd).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = j(r.toTransactionBytes());
    let i;
    if (r.type === ft.Script && (i = r.abis), n) {
      const A = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: y } of A) {
        if (y.type === "SqueezedOutStatus")
          throw new v(
            D.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${y.reason}`
          );
        if (y.type !== "SubmittedStatus")
          break;
      }
      const d = r.getTransactionId(this.getChainId()), h = new Is(d, this, i);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Is(o, this, i);
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
    const r = St(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = j(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map(Zn)
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
      (i) => "predicate" in i && i.predicate && !vu(J(i.predicate), J("0x")) && new ke(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = j(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
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
    if (e.type === ft.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    await this.estimatePredicates(e);
    let t = [];
    const n = [];
    let r = 0;
    for (let s = 0; s < fw; s++) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: j(e.toTransactionBytes()),
        utxoValidation: !1
      });
      t = i.map(Zn);
      const { missingOutputVariables: o, missingOutputContractIds: A } = yE(t);
      if (o.length !== 0 || A.length !== 0)
        r += o.length, e.addVariableOutputs(o.length), A.forEach(({ contractId: h }) => {
          e.addContractInputAndOutput(le.fromString(h)), n.push(h);
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
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e, { gasPriceFactor: n, minGasPrice: r, maxGasPerTx: s } = this.getGasConfig(), i = this.getChain(), o = t.gasPrice.eq(0) ? r : t.gasPrice;
    t.gasPrice = o;
    const A = t.calculateMinGas(i), d = br(A, o, n).normalizeZeroToOne();
    t.type === ft.Script && t.gasLimit.eq(0) && (t.gasLimit = A, t.gasLimit = s.sub(
      t.calculateMaxGas(i, A)
    ));
    const h = t.calculateMaxGas(i, A), y = br(h, o, n).normalizeZeroToOne();
    return {
      minGas: A,
      minFee: d,
      maxGas: h,
      maxFee: y
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
    const n = St(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = j(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map(Zn)
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
    const o = Sr(St(e)), { minGasPrice: A } = this.getGasConfig(), d = N0(o.gasPrice, A), h = o.type === ft.Script, y = this.getBaseAssetId(), E = o.getCoinOutputsQuantities(), C = hw(E, t);
    o.fundWithFakeUtxos(C, y, s == null ? void 0 : s.address), h && (o.gasLimit = Q(0)), r && (s && "populateTransactionPredicateData" in s && s.populateTransactionPredicateData(o), await this.estimatePredicates(o)), i && h && await i(o);
    let { maxFee: x, maxGas: F, minFee: b, minGas: N } = this.estimateTxGasAndFee({
      transactionRequest: o
    }), _ = [], Z = [], L = 0, X = Q(0);
    if (h && n) {
      o.gasPrice = Q(0);
      const k = await this.estimateTxDependencies(o);
      _ = k.receipts, L = k.outputVariables, Z = k.missingContractIds, X = h ? wd(_) : X, o.gasLimit = X, o.gasPrice = d, { maxFee: x, maxGas: F, minFee: b, minGas: N } = this.estimateTxGasAndFee({
        transactionRequest: o
      });
    }
    return {
      requiredQuantities: C,
      receipts: _,
      gasUsed: X,
      minGasPrice: A,
      gasPrice: d,
      minGas: N,
      maxGas: F,
      minFee: b,
      maxFee: x,
      estimatedInputs: o.inputs,
      outputVariables: L,
      missingContractIds: Z
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = le.fromAddressOrString(e), s = St(Sr(t)), i = await this.getTransactionCost(s, n);
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...A } = await this.getTransactionCost(
      s,
      n
    );
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...A
    };
  }
  /**
   * Returns coins for the given owner.
   */
  async getCoins(e, t, n) {
    const r = le.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && j(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: Q(o.amount),
      owner: le.fromAddressOrString(o.owner),
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
    var d, h, y;
    const r = le.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((E) => j(E))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((E) => j(E))) || []
    };
    if (this.cache) {
      const E = new Set(
        s.utxos.concat((y = this.cache) == null ? void 0 : y.getActiveData().map((C) => j(C)))
      );
      s.utxos = Array.from(E);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(zo).map(({ assetId: E, amount: C, max: x }) => ({
        assetId: j(E),
        amount: C.toString(10),
        max: x ? x.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((E) => {
      switch (E.__typename) {
        case "MessageCoin":
          return {
            amount: Q(E.amount),
            assetId: E.assetId,
            daHeight: Q(E.daHeight),
            sender: le.fromAddressOrString(E.sender),
            recipient: le.fromAddressOrString(E.recipient),
            nonce: E.nonce
          };
        case "Coin":
          return {
            id: E.utxoId,
            amount: Q(E.amount),
            assetId: E.assetId,
            owner: le.fromAddressOrString(E.owner),
            maturity: Q(E.maturity).toNumber(),
            blockCreated: Q(E.blockCreated),
            txCreatedIdx: Q(E.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((E) => !!E);
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
      contract: le.fromAddressOrString(e).toB256(),
      asset: j(t)
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
      owner: le.fromAddressOrString(e).toB256(),
      assetId: j(t)
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
      filter: { owner: le.fromAddressOrString(e).toB256() }
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
      owner: le.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Fr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: Q(s.amount),
        data: s.data
      }),
      sender: le.fromAddressOrString(s.sender),
      recipient: le.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: Q(s.amount),
      data: Fr.decodeData(s.data),
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
      messageBlockHeader: A,
      commitBlockHeader: d,
      blockProof: h,
      sender: y,
      recipient: E,
      amount: C,
      data: x
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: Q(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: Q(h.proofIndex),
        proofSet: h.proofSet
      },
      messageBlockHeader: {
        id: A.id,
        daHeight: Q(A.daHeight),
        transactionsCount: Q(A.transactionsCount),
        transactionsRoot: A.transactionsRoot,
        height: Q(A.height),
        prevRoot: A.prevRoot,
        time: A.time,
        applicationHash: A.applicationHash,
        messageReceiptRoot: A.messageReceiptRoot,
        messageReceiptCount: Q(A.messageReceiptCount)
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
      sender: le.fromAddressOrString(y),
      recipient: le.fromAddressOrString(E),
      nonce: t,
      amount: Q(C),
      data: x
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
      startTimestamp: t ? fo.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return Q(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Is(e, this);
  }
}, Os = Yt;
ao = /* @__PURE__ */ new WeakSet();
Sd = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Ee.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
_e(Os, "chainInfoCache", {});
_e(Os, "nodeInfoCache", {});
async function ey(e) {
  var C;
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
  ), o = ((C = s.receipts) == null ? void 0 : C.map(Zn)) || [], {
    consensusParameters: { gasPerByte: A, gasPriceFactor: d, maxInputs: h, gasCosts: y }
  } = n.getChain(), E = ti({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: J(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(A),
    gasPriceFactor: Q(d),
    abiMap: r,
    maxInputs: h,
    gasCosts: y
  });
  return {
    gqlTransaction: s,
    ...E
  };
}
async function ty(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: A } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, h = n.toTransaction(), y = n.toTransactionBytes();
  return ti({
    receipts: s,
    transaction: h,
    transactionBytes: y,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: A
  });
}
async function ny(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: A, gasPriceFactor: d, maxInputs: h, gasCosts: y }
  } = n.getChain();
  return {
    transactions: i.map((C) => {
      const { node: x } = C, { id: F, rawPayload: b, receipts: N, status: _ } = x, [Z] = new Cn().decode(J(b), 0), L = (N == null ? void 0 : N.map(Zn)) || [], X = ti({
        id: F,
        receipts: L,
        transaction: Z,
        transactionBytes: J(b),
        gqlTransactionStatus: _,
        abiMap: r,
        gasPerByte: A,
        gasPriceFactor: d,
        maxInputs: h,
        gasCosts: y
      });
      return {
        gqlTransaction: x,
        ...X
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
    beta5: 0,
    devnet: 10
  }
}, pw = (e) => {
  if (e === "ethereum")
    return Un.eth.sepolia;
  if (e === "fuel")
    return Un.fuel.beta5;
}, mw = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), _d = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? pw(n);
  if (i === void 0)
    return;
  const o = mw({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, ry = (e, t) => _d({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), sy = (e, t) => _d({
  asset: e,
  networkType: "fuel",
  chainId: t
}), Ew = "/", ww = /^\/|\/$/g, Iw = (e = "") => e.replace(ww, "");
function yw(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(Iw);
  return r && n && s.unshift(""), s.join(Ew);
}
function iy(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: yw(t, n.icon)
  }));
}
var oy = [
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
        chainId: Un.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Un.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], Bw = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new S("u64").encode(new ke(n).toNumber());
  return Uint8Array.from([
    ...J(r),
    ...i,
    ...J(t)
  ]);
}, Cw = async (e) => {
  const t = Bw(e);
  await qo();
  const n = Ip(16, 0, Bp.ScriptData), r = fc(17, 16, 32), s = yr(18, 17, 0), i = fc(19, 17, 8), o = Ep(16, 18, 19), A = zu(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...A.to_bytes()
  ]), scriptData: t };
}, ni = class extends wu {
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
    R(this, "address");
    /**
     * The provider used to interact with the network.
     */
    R(this, "_provider");
    R(this, "_connector");
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
    const s = this.provider.getBaseAssetId(), i = bm({
      amount: Q(r),
      assetId: s,
      coinQuantities: n
    }), o = {};
    i.forEach(({ amount: C, assetId: x }) => {
      o[x] = {
        required: C,
        owned: Q(0)
      };
    });
    const A = [], d = [], h = this.address.toB256();
    t.inputs.forEach((C) => {
      if ("amount" in C)
        if ("owner" in C) {
          const b = String(C.assetId);
          if (C.owner === h && o[b]) {
            const N = Q(C.amount);
            o[b].owned = o[b].owned.add(N), A.push(C.id);
          }
        } else
          C.recipient === h && C.amount && o[s] && (o[s].owned = o[s].owned.add(C.amount), d.push(C.nonce));
    });
    const y = [];
    if (Object.entries(o).forEach(([C, { owned: x, required: F }]) => {
      x.lt(F) && y.push({
        assetId: C,
        amount: F.sub(x)
      });
    }), y.length) {
      const C = await this.getResourcesToSpend(y, {
        messages: d,
        utxos: A
      });
      t.addResources(C);
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
  async createTransfer(t, n, r, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = r ?? this.provider.getBaseAssetId(), A = { gasPrice: i, ...s }, d = new Yn(A);
    d.addCoinOutput(le.fromAddressOrString(t), n, o);
    const { maxFee: h, requiredQuantities: y, gasUsed: E, estimatedInputs: C } = await this.provider.getTransactionCost(d, [], {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return d.gasPrice = Q(s.gasPrice ?? i), d.gasLimit = Q(s.gasLimit ?? E), this.validateGas({
      gasUsed: E,
      gasPrice: d.gasPrice,
      gasLimit: d.gasLimit,
      minGasPrice: i
    }), await this.fund(d, y, h), d.updatePredicateInputs(C), d;
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
  async transfer(t, n, r, s = {}) {
    if (Q(n).lte(0))
      throw new v(
        D.INVALID_TRANSFER_AMOUNT,
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
    if (Q(n).lte(0))
      throw new v(
        D.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = le.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), A = r ?? this.provider.getBaseAssetId(), d = { gasPrice: o, ...s }, { script: h, scriptData: y } = await Cw({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: A
    }), E = new Yn({
      ...d,
      script: h,
      scriptData: y
    });
    E.addContractInputAndOutput(i);
    const { maxFee: C, requiredQuantities: x, gasUsed: F } = await this.provider.getTransactionCost(
      E,
      [{ amount: Q(n), assetId: String(A) }]
    );
    return E.gasLimit = Q(d.gasLimit ?? F), this.validateGas({
      gasUsed: F,
      gasPrice: E.gasPrice,
      gasLimit: E.gasLimit,
      minGasPrice: o
    }), await this.fund(E, x, C), this.sendTransaction(E);
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
    const { minGasPrice: s } = this.provider.getGasConfig(), i = this.provider.getBaseAssetId(), o = le.fromAddressOrString(t), A = J(
      "0x".concat(o.toHexString().substring(2).padStart(64, "0"))
    ), d = J(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), y = {
      script: new Uint8Array([
        ...J(ME.bytes),
        ...A,
        ...d
      ]),
      gasPrice: s,
      ...r
    }, E = new Yn(y), C = [{ amount: Q(n), assetId: i }], { requiredQuantities: x, maxFee: F, gasUsed: b } = await this.provider.getTransactionCost(
      E,
      C
    );
    return E.gasLimit = Q(y.gasLimit ?? b), this.validateGas({
      gasUsed: b,
      gasPrice: E.gasPrice,
      gasLimit: E.gasLimit,
      minGasPrice: s
    }), await this.fund(E, x, F), this.sendTransaction(E);
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
    const s = St(t);
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
    const r = St(t);
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
}, cr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    R(this, "address");
    R(this, "publicKey");
    R(this, "compressedPublicKey");
    R(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Pt(e, 32);
    this.privateKey = j(t), this.publicKey = j(fn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = j(fn.getPublicKey(t, !0)), this.address = le.fromPublicKey(this.publicKey);
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
    const t = fn.sign(J(e), J(this.privateKey)), n = Pt(`0x${t.r.toString(16)}`, 32), r = Pt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, j(se([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = fn.ProjectivePoint.fromHex(J(this.compressedPublicKey)), n = fn.ProjectivePoint.fromHex(J(e));
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
    const A = new fn.Signature(BigInt(j(r)), BigInt(j(s))).addRecoveryBit(
      i
    ).recoverPublicKey(J(e)).toRawBytes(!1).slice(1);
    return j(A);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return le.fromPublicKey(cr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? sn(se([Xt(32), J(e)])) : Xt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = fn.ProjectivePoint.fromHex(J(e));
    return j(t.toRawBytes(!1).slice(1));
  }
}, Fc = 13, Dc = 8, Rc = 1, Ni = 32, bw = 16, Nc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Qw(e, t, n) {
  const r = In(Nc(e), "hex"), s = le.fromAddressOrString(t), i = Xt(Ni), o = SA({
    password: In(n),
    salt: i,
    dklen: Ni,
    n: 2 ** Fc,
    r: Dc,
    p: Rc
  }), A = Xt(bw), d = await Ph(r, o, A), h = Uint8Array.from([...o.subarray(16, 32), ...d]), y = _A(h), E = mr(y, "hex"), C = {
    id: em(),
    version: 3,
    address: Nc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: E,
      cipherparams: { iv: mr(A, "hex") },
      ciphertext: mr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Ni,
        n: 2 ** Fc,
        p: Rc,
        r: Dc,
        salt: mr(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function vw(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: A, r: d, p: h, salt: y }
    }
  } = n, E = In(s, "hex"), C = In(i, "hex"), x = In(y, "hex"), F = In(t), b = SA({
    password: F,
    salt: x,
    n: A,
    p: h,
    r: d,
    dklen: o
  }), N = Uint8Array.from([...b.subarray(16, 32), ...E]), _ = _A(N), Z = mr(_, "hex");
  if (r !== Z)
    throw new v(
      D.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const L = await Lh(E, b, C);
  return j(L);
}
var Md = class extends ni {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new cr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    R(this, "signer");
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
    const n = await this.signer().sign(Gh(t));
    return j(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = St(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return j(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = St(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    const s = St(t);
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
    const r = St(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return Qw(this.privateKey, this.address, t);
  }
};
_e(Md, "defaultPath", "m/44'/1179993420'/0'/0/0");
var is = [
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
function co(e) {
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
function Fw(e) {
  return (1 << e) - 1;
}
function kd(e) {
  return (1 << e) - 1 << 8 - e;
}
function Si(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function Dw(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function Rw(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & Fw(8 - n)), n += 3);
  const r = e.length / 4, s = J(It(e))[0] & kd(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function Nw(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = J(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const y = t.indexOf(e[h].normalize("NFKD"));
    if (y === -1)
      throw new v(
        D.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let E = 0; E < 11; E += 1)
      y & 1 << 10 - E && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, A = kd(o);
  if ((J(It(r.slice(0, i / 8)))[0] & A) !== (r[r.length - 1] & A))
    throw new v(
      D.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Sw = co("Bitcoin seed"), _w = "0x0488ade4", Mw = "0x04358394", Sc = [12, 15, 18, 21, 24];
function _c(e) {
  if (e.length !== 2048)
    throw new v(
      D.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function kw(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      D.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function _i(e) {
  if (!Sc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Sc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(D.INVALID_MNEMONIC, t);
  }
}
var gn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = is) {
    R(this, "wordlist");
    this.wordlist = e, _c(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return gn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return gn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = is) {
    const n = Si(e);
    return _i(n), j(Nw(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = is) {
    const n = J(e);
    return _c(t), kw(n), Rw(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    _i(Si(e));
    const n = co(Dw(e)), r = co(`mnemonic${t}`);
    return ur(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = gn.mnemonicToSeed(e, t);
    return gn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = Si(e);
    let n = 0;
    try {
      _i(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (gn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = is;
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
    return J(Ar("sha512", Sw, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = gn.masterKeysFromSeed(e), r = J(t ? Mw : _w), s = "0x00", i = "0x00000000", o = "0x00000000", A = n.slice(32), d = n.slice(0, 32), h = se([
      r,
      s,
      i,
      o,
      A,
      se(["0x00", d])
    ]), y = Eo(It(It(h)), 0, 4);
    return nA(se([h, y]));
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
    const n = t ? It(se([Xt(e), J(t)])) : Xt(e);
    return gn.entropyToMnemonic(n);
  }
}, oa = gn, Od = 2147483648, Td = j("0x0488ade4"), aa = j("0x0488b21e"), Ld = j("0x04358394"), ca = j("0x043587cf");
function Mc(e) {
  return nA(se([e, Eo(It(It(e)), 0, 4)]));
}
function Ow(e = !1, t = !1) {
  return e ? t ? ca : aa : t ? Ld : Td;
}
function Tw(e) {
  return [aa, ca].includes(j(e.slice(0, 4)));
}
function Lw(e) {
  return [Td, Ld, aa, ca].includes(
    j(e.slice(0, 4))
  );
}
function Pw(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(D.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + Od : parseInt(r, 10)
  );
}
var Mn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    R(this, "depth", 0);
    R(this, "index", 0);
    R(this, "fingerprint", j("0x00000000"));
    R(this, "parentFingerprint", j("0x00000000"));
    R(this, "privateKey");
    R(this, "publicKey");
    R(this, "chainCode");
    if (e.privateKey) {
      const t = new cr(e.privateKey);
      this.publicKey = j(t.compressedPublicKey), this.privateKey = j(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          D.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = j(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Eo(Ur(It(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & Od) {
      if (!t)
        throw new v(
          D.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(J(this.publicKey));
    s.set(Pt(e, 4), 33);
    const i = J(Ar("sha512", r, s)), o = i.slice(0, 32), A = i.slice(32);
    if (t) {
      const y = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", E = Q(o).add(t).mod(y).toBytes(32);
      return new Mn({
        privateKey: E,
        chainCode: A,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new cr(j(o)).addPoint(n);
    return new Mn({
      publicKey: h,
      chainCode: A,
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
    return Pw(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
    const n = Ow(this.privateKey == null || e, t), r = j(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = mo(this.index, 4), o = this.chainCode, A = this.privateKey != null && !e ? se(["0x00", this.privateKey]) : this.publicKey, d = J(se([n, r, s, i, o, A]));
    return Mc(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = oa.masterKeysFromSeed(e);
    return new Mn({
      chainCode: J(t.slice(32)),
      privateKey: J(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = H0(Z0(e)), n = J(t), r = Mc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !Lw(n))
      throw new v(D.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(D.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = j(n.slice(5, 9)), o = parseInt(j(n.slice(9, 13)).substring(2), 16), A = j(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        D.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (Tw(n)) {
      if (d[0] !== 3)
        throw new v(D.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Mn({
        publicKey: d,
        chainCode: A,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new v(D.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Mn({
      privateKey: d.slice(1),
      chainCode: A,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Mi = Mn, Pd = class extends ni {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Ct(e, this._provider);
  }
}, Ct = class extends Md {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new cr("0x00"), new Pd(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = cr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Ct(t, e == null ? void 0 : e.provider);
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
    const s = Mi.fromSeed(e).derivePath(t || Ct.defaultPath);
    return new Ct(s.privateKey, n);
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
    const s = oa.mnemonicToSeed(e, n), o = Mi.fromSeed(s).derivePath(t || Ct.defaultPath);
    return new Ct(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = Mi.fromExtendedKey(e);
    return new Ct(n.privateKey, t);
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
    const r = await vw(e, t);
    return new Ct(r, n);
  }
}, Qt = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new Pd(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Ct(e, t);
  }
};
_e(Qt, "generate", Ct.generate);
_e(Qt, "fromSeed", Ct.fromSeed);
_e(Qt, "fromMnemonic", Ct.fromMnemonic);
_e(Qt, "fromExtendedKey", Ct.fromExtendedKey);
_e(Qt, "fromEncryptedJson", Ct.fromEncryptedJson);
var Uw = class {
  constructor() {
    R(this, "storage", /* @__PURE__ */ new Map());
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
}, Qn, Ud = class {
  constructor(e) {
    mn(this, Qn, void 0), _e(this, "pathKey", "{}"), _e(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), _e(this, "numberOfAccounts", 0), Tt(this, Qn, e.secret || oa.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Fe(this, Qn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Qt.fromMnemonic(Fe(this, Qn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Qt.fromMnemonic(Fe(this, Qn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = le.fromAddressOrString(e);
    do {
      const r = Qt.fromMnemonic(Fe(this, Qn), this.getDerivePath(t));
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
    return Qt.fromPrivateKey(t);
  }
};
Qn = /* @__PURE__ */ new WeakMap();
_e(Ud, "type", "mnemonic");
var pn, Gd = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    mn(this, pn, []), e.secret ? Tt(this, pn, [e.secret]) : Tt(this, pn, e.accounts || [Qt.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Fe(this, pn)
    };
  }
  getPublicAccount(e) {
    const t = Qt.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Fe(this, pn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Qt.generate();
    return Fe(this, pn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = le.fromAddressOrString(e), n = Fe(this, pn).find(
      (r) => Qt.fromPrivateKey(r).address.equals(t)
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
    return Qt.fromPrivateKey(t);
  }
};
pn = /* @__PURE__ */ new WeakMap();
_e(Gd, "type", "privateKey");
var $t = {
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
var yt, vn, Zt, Ao, Hd, uo, Jd, Yd = class extends hd.EventEmitter {
  constructor(e) {
    super(), mn(this, Ao), mn(this, uo), _e(this, "storage", new Uw()), _e(this, "STORAGE_KEY", "WalletManager"), mn(this, yt, []), mn(this, vn, ""), mn(this, Zt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Fe(this, Zt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    zt(!Fe(this, Zt), $t.wallet_not_unlocked);
    const t = Fe(this, yt).find((n, r) => r === e);
    return zt(t, $t.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Fe(this, yt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Fe(this, yt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = le.fromAddressOrString(e), n = Fe(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return zt(n, $t.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = le.fromAddressOrString(e);
    zt(!Fe(this, Zt), $t.wallet_not_unlocked);
    const n = Fe(this, yt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return zt(n, $t.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Fe(this, yt)[(e == null ? void 0 : e.vaultId) || 0];
    await zt(t, $t.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Fe(this, yt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Tt(this, yt, Fe(this, yt).concat({
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
    Tt(this, Zt, !0), Tt(this, yt, []), Tt(this, vn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Tt(this, vn, e), Tt(this, Zt, !1);
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
    const n = Fe(this, Zt);
    await this.unlock(e), Tt(this, vn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await zt(!Fe(this, Zt), $t.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Oh(Fe(this, vn), JSON.parse(e));
      Tt(this, yt, so(this, uo, Jd).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await zt(!Fe(this, Zt), $t.wallet_not_unlocked);
    const e = await Th(Fe(this, vn), {
      vaults: so(this, Ao, Hd).call(this, Fe(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Yd.Vaults.find((n) => n.type === e);
    return zt(t, $t.invalid_vault_type), t;
  }
}, Gw = Yd;
yt = /* @__PURE__ */ new WeakMap();
vn = /* @__PURE__ */ new WeakMap();
Zt = /* @__PURE__ */ new WeakMap();
Ao = /* @__PURE__ */ new WeakSet();
Hd = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
uo = /* @__PURE__ */ new WeakSet();
Jd = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
_e(Gw, "Vaults", [Ud, Gd]);
var Hw = class {
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
_e(Hw, "type");
var ay = class {
}, Jw = (e) => {
  const n = J(e), r = qc(n, 16384), s = fd(r.map((o) => j(o)));
  return sn(se(["0x4655454C", s]));
}, kc = class extends ni {
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
    const { predicateBytes: o, predicateInterface: A } = kc.processPredicateData(
      t,
      n,
      i
    ), d = le.fromB256(Jw(o));
    super(d, r);
    R(this, "bytes");
    R(this, "predicateData", []);
    R(this, "interface");
    this.bytes = o, this.interface = A, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    var s;
    const n = St(t), { policies: r } = ei.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === Ee.Coin && j(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
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
  async createTransfer(t, n, r, s = {}) {
    const i = r ?? this.provider.getBaseAssetId(), o = await super.createTransfer(t, n, i, s);
    return this.populateTransactionPredicateData(o);
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
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new we(this.bytes.length).encode(this.bytes), i = Vs({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + To + qh + ee + r.byteLength + t * ee;
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
    if (n && (i = new on(n), i.functions.main === void 0))
      throw new v(
        D.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = kc.setConfigurableConstants(
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
        const { offset: A } = r.configurables[i], d = r.encodeConfigurable(i, o);
        s.set(d, A);
      });
    } catch (i) {
      throw new v(
        D.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, Zd = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(Zd || {}), Aa = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Aa || {}), Vd = "FuelConnector", Yw = class {
  constructor(e) {
    R(this, "storage");
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
}, Zw = class extends hd.EventEmitter {
  constructor() {
    super(...arguments);
    R(this, "name", "");
    R(this, "metadata", {});
    R(this, "connected", !1);
    R(this, "installed", !1);
    R(this, "events", Aa);
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
function Vw(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, A, d;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (A = t[r]) == null ? void 0 : A.value;
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
function cy(e) {
  window.dispatchEvent(
    new CustomEvent(Vd, {
      detail: e
    })
  );
}
function Xw() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function os(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var jw = 2e3, qw = 5e3, { warn: Ww } = console, Cr = class extends Zw {
  constructor(t = Cr.defaultConfig) {
    super();
    R(this, "_storage", null);
    R(this, "_connectors", []);
    R(this, "_targetObject", null);
    R(this, "_unsubscribes", []);
    R(this, "_targetUnsubscribe");
    R(this, "_pingCache", {});
    R(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    R(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = Vd;
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
    R(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    R(this, "triggerConnectorEvents", async () => {
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
    R(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new Yw(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(Cr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(Zd).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      os(t.isConnected()),
      os(this.pingConnector(t))
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
      return await Vw(async () => os(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: qw
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Aa)), await ((o = this._storage) == null ? void 0 : o.setItem(Cr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = Xw();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), os(t.promise, jw).then(() => !0).catch(() => !1);
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
      n = await Os.create(t.url);
    else {
      if (t)
        throw new v(D.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await Os.create(r.url);
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
    return new ni(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Cr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, Xd = Cr;
_e(Xd, "STORAGE_KEY", "fuel-current-connector");
_e(Xd, "defaultConfig", {});
function Oc(e, t) {
  if (!e)
    throw new v(D.TRANSACTION_ERROR, t);
}
function jd(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Vt, Vc, qd = (Vc = class {
  constructor(...e) {
    mt(this, Vt, void 0);
    qt(this, Vt, e || []);
  }
  entries() {
    return xe(this, Vt);
  }
  push(...e) {
    xe(this, Vt).push(...e);
  }
  concat(e) {
    return xe(this, Vt).concat(e);
  }
  extend(e) {
    xe(this, Vt).push(...e);
  }
  toBytes() {
    return se(
      xe(this, Vt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return j(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(xe(this, Vt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Vt = new WeakMap(), Vc), $w = (e) => To + Vs({ maxInputs: e }), Wd = ee + er + jA + ee + ee;
function zw(e) {
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
function ua(e, t, n = []) {
  var r;
  try {
    const s = zw(e);
    return t(s);
  } catch (s) {
    throw s.code === D.SCRIPT_REVERTED ? Cd({
      logs: n,
      receipts: e.receipts,
      status: (r = e.gqlTransaction) == null ? void 0 : r.status
    }) : s;
  }
}
function Kw(e, t, n) {
  return ua(
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
var Mr = class {
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
    R(this, "bytes");
    /**
     * A function to encode the script data.
     */
    R(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    R(this, "scriptResultDecoder");
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
    return Vs({ maxInputs: t }) + To + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Mr.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return ua(e, this.scriptResultDecoder, t);
  }
}, $d = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, eI = De, zd = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new qd(
    rs(16, e),
    rs(17, n),
    yr(17, 17, 0),
    rs(18, r)
  );
  return t ? i.push(
    rs(19, t),
    yr(19, 19, 0),
    hc(16, 17, 18, 19)
  ) : i.push(hc(16, 17, 18, Se.cgas().to_u8())), s.encoding === Ut && s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    yr(21, Se.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    yr(22, Se.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    wp(22, 22, s.encodedLength),
    mp(21, 22)
  ]), i;
};
function Tc(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new qd();
  for (let r = 0; r < e.length; r += 1)
    n.extend(zd(e[r], t[r]).entries());
  return n.push(zu(1)), n.toBytes();
}
var Lc = (e) => e === Ae.Return || e === Ae.ReturnData, tI = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === Ae.Call && r === eI && s === t
), nI = (e, t) => (n) => {
  if (Ft(n.code) !== 0)
    throw new v(D.SCRIPT_REVERTED, "Transaction reverted.");
  const r = tI(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => Lc(o)).flatMap((o, A, d) => {
    var h;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === Ae.Return)
      return [
        new S("u64").encode(o.val)
      ];
    if (o.type === Ae.ReturnData) {
      const y = J(o.data);
      if (t && Lc((h = d[A + 1]) == null ? void 0 : h.type)) {
        const E = d[A + 1];
        return se([y, J(E.data)]);
      }
      return [y];
    }
    return [new Uint8Array()];
  });
}, rI = (e, t, n, r = []) => ua(e, nI(t, n), r), sI = (e) => e.reduce(
  (t, n) => {
    const r = { ...$d };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength,
      encoding: n.encoding ?? Ut
    };
    return t + zd(r, s).byteLength();
  },
  _t.size()
  // placeholder for single RET instruction which is added later
), iI = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength,
    encoding: n.encoding
  };
}), oI = (e, t) => {
  var o;
  const n = [];
  let r = 0;
  const s = {
    amountOffset: t,
    assetIdOffset: t + ee,
    gasForwardedOffset: e.gas ? t + ee + er : 0,
    callDataOffset: t + ee + er + r
  };
  if (n.push(new S("u64").encode(e.amount || 0)), n.push(new G().encode(((o = e.assetId) == null ? void 0 : o.toString()) || De)), n.push(e.contractId.toBytes()), n.push(new S("u64").encode(e.fnSelector)), e.gas && (n.push(new S("u64").encode(e.gas)), r = ee), e.isInputDataPointer) {
    const A = t + Wd + r;
    n.push(new S("u64").encode(A));
  }
  const i = J(e.data);
  return n.push(i), {
    scriptData: n,
    callParamOffsets: s
  };
}, aI = (e, t) => {
  var E;
  const n = [], r = t, s = r + ee, i = s + er, o = i + jA + ee + ee, A = o + e.fnSelectorBytes.byteLength, d = J(e.data);
  let h = 0;
  return n.push(new S("u64").encode(e.amount || 0)), n.push(new G().encode(((E = e.assetId) == null ? void 0 : E.toString()) || De)), n.push(e.contractId.toBytes()), n.push(new S("u64").encode(o)), n.push(new S("u64").encode(A)), n.push(e.fnSelectorBytes), n.push(d), e.gas && (n.push(new S("u64").encode(e.gas)), h = A + d.byteLength), {
    scriptData: n,
    callParamOffsets: {
      amountOffset: r,
      assetIdOffset: s,
      gasForwardedOffset: h,
      callDataOffset: i
    }
  };
}, cI = (e) => e === Kn ? aI : oI, Pc = (e, t) => new Mr(
  // Script to call the contract, start with stub size matching length of calls
  Tc(
    new Array(e.length).fill($d),
    iI(e)
  ),
  (n) => {
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = sI(n), i = (8 - s % 8) % 8, o = s + i, A = $w(t.toNumber()) + o, d = [], h = [];
    let y = A;
    const E = [];
    for (let F = 0; F < r; F += 1) {
      const b = n[F], { scriptData: N, callParamOffsets: _ } = cI(
        b.encoding
      )(b, y);
      h.push({
        isHeap: b.isOutputDataHeap,
        encodedLength: b.outputEncodedLength,
        encoding: b.encoding ?? Ut
      }), E.push(se(N)), d.push(_), y = A + se(E).byteLength;
    }
    const C = Tc(d, h);
    return { data: se(E), script: C };
  },
  () => [new Uint8Array()]
);
function AI(e) {
  const t = e.receipts.find((n) => n.type === Ae.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var Kd = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    R(this, "functionScopes");
    R(this, "isMultiCall");
    R(this, "gasUsed");
    R(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = AI(t);
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
    return jd(this.functionScopes);
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
      return Kw(e, n, t);
    const r = (n == null ? void 0 : n.func.encoding) === Ut && (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1, i = rI(
      e,
      (n == null ? void 0 : n.program).id,
      r,
      t
    ).map((o, A) => {
      var h;
      const { func: d } = this.functionScopes[A].getCallConfig();
      return (h = d.decodeOutput(o)) == null ? void 0 : h[0];
    });
    return this.isMultiCall ? i : i == null ? void 0 : i[0];
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
    return Rd(e, n, r);
  }
}, e0 = class extends Kd {
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
    R(this, "transactionId");
    R(this, "transactionResponse");
    R(this, "transactionResult");
    R(this, "program");
    R(this, "logs");
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
    return new e0(
      t,
      n,
      i,
      s,
      r
    );
  }
}, ys = class extends Kd {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    R(this, "callResult");
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
    return await new ys(t, n, r);
  }
};
function uI(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), A = e.getCallConfig().func.isInputDataPointer ? Wd : 0, d = i.encodeArguments(r, t + A);
  return {
    contractId: n.id,
    fnSelector: i.selector,
    fnSelectorBytes: i.selectorBytes,
    encoding: i.encoding,
    data: d,
    isInputDataPointer: i.isInputDataPointer,
    isOutputDataHeap: i.outputMetadata.isHeapType,
    outputEncodedLength: i.outputMetadata.encodedLength,
    assetId: s == null ? void 0 : s.assetId,
    amount: s == null ? void 0 : s.amount,
    gas: o == null ? void 0 : o.gasLimit
  };
}
var t0 = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    R(this, "transactionRequest");
    R(this, "program");
    R(this, "functionInvocationScopes", []);
    R(this, "txParameters");
    R(this, "requiredCoins", []);
    R(this, "isMultiCall", !1);
    R(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    R(this, "externalAbis", {});
    R(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Yn();
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
    const n = t.maxInputs, r = Pc(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => uI(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = Pc(this.functionInvocationScopes, e);
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
    await qo(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === ft.Script && (this.transactionRequest.abis = jd(this.functionInvocationScopes));
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
    return n.gasPrice = Q(Ft(n.gasPrice) || Ft((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
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
      requiredQuantities: A
    } = await this.getTransactionCost();
    return this.setDefaultTxParams(e, r, n), this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (h) => h.type !== Ee.Coin
    ), await ((d = this.program.account) == null ? void 0 : d.fund(this.transactionRequest, A, t)), this.transactionRequest.updatePredicateInputs(s), o.forEach((h) => {
      this.transactionRequest.addContractInputAndOutput(le.fromString(h));
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
      le.fromAddressOrString(e),
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
    Oc(this.program.account, "Wallet is required!"), await this.fundWithRequiredCoins();
    const e = await this.program.account.sendTransaction(
      await this.getTransactionRequest(),
      {
        awaitExecution: !0,
        estimateTxDependencies: !1
      }
    );
    return e0.build(
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
    if (Oc(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
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
    return ys.build(this.functionInvocationScopes, e, this.isMultiCall);
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
    return ys.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return ys.build(
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
    var A, d;
    const r = !!((A = this.txParameters) != null && A.gasLimit) || this.hasCallParamsGasLimit, s = !!((d = this.txParameters) != null && d.gasPrice), { gasLimit: i, gasPrice: o } = e;
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
}, n0 = class extends t0 {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    R(this, "func");
    R(this, "callParameters");
    R(this, "forward");
    R(this, "args");
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
      this.forward = zo(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, dI = class extends t0 {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t), this.program.interface.jsonAbi.encoding !== Kn && this.validateHeapTypeReturnCalls();
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
}, lI = class {
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
    R(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    R(this, "provider");
    /**
     * The contract's ABI interface.
     */
    R(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    R(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    R(this, "functions", {});
    this.interface = t instanceof on ? t : new on(t), this.id = le.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new n0(this, e, n);
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
    return new dI(this, e);
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
}, hI = class extends n0 {
  constructor() {
    super(...arguments);
    R(this, "scriptRequest");
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
    const r = n.consensusParameters.maxInputs.toNumber(), s = new we(t.length).encodedLength;
    this.scriptRequest = new Mr(
      t,
      (i) => this.func.encodeArguments(
        i,
        Mr.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, Ay = class extends wf {
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
    R(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    R(this, "interface");
    /**
     * The account associated with the script.
     */
    R(this, "account");
    /**
     * The script request object.
     */
    R(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    R(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    R(this, "functions");
    this.bytes = J(t), this.interface = new on(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new hI(this, this.interface.getFunction("main"), s)
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
new Mr(
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
function uy(e) {
  return e;
}
var fI = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(fI || {}), gI = Object.defineProperty, pI = (e, t) => {
  for (var n in t)
    gI(e, n, { get: t[n], enumerable: !0 });
}, mI = {};
pI(mI, {
  getContractId: () => i0,
  getContractRoot: () => r0,
  getContractStorageRoot: () => s0,
  hexlifyWithPrefix: () => lo
});
var r0 = (e) => {
  const n = J(e), r = qc(n, 16384);
  return fd(r.map((s) => j(s)));
}, s0 = (e) => {
  const t = new ym();
  return e.forEach(({ key: n, value: r }) => t.update(It(n), r)), t.root;
}, i0 = (e, t, n) => {
  const r = r0(J(e));
  return It(se(["0x4655454C", t, r, n]));
}, lo = (e) => j(e.startsWith("0x") ? e : `0x${e}`), EI = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    R(this, "bytecode");
    R(this, "interface");
    R(this, "provider");
    R(this, "account");
    this.bytecode = J(e), t instanceof on ? this.interface = t : this.interface = new on(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new EI(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: A, value: d }) => ({
      key: lo(A),
      value: lo(d)
    })).sort(({ key: A }, { key: d }) => A.localeCompare(d)), n = {
      salt: Xt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        D.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || s0(n.storageSlots), s = i0(this.bytecode, n.salt, r), i = new oo({
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
    }), new lI(n, this.interface, this.account);
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
}, dy = 9, ly = 3, hy = 9, fy = 9, gy = 18, py = 15, my = 12, Ey = 9, Xc, wy = typeof process < "u" && ((Xc = process == null ? void 0 : process.env) == null ? void 0 : Xc.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql", Iy = "https://beta-5.fuel.network/graphql";
export {
  er as ASSET_ID_LEN,
  wu as AbstractAccount,
  mf as AbstractAddress,
  Ef as AbstractContract,
  Iu as AbstractProgram,
  wf as AbstractScript,
  SI as AbstractScriptRequest,
  ni as Account,
  le as Address,
  qE as AddressType,
  lt as ArrayCoder,
  G as B256Coder,
  zA as B512Coder,
  ke as BN,
  Bn as BYTES_32,
  ei as BaseTransactionRequest,
  Md as BaseWalletUnlocked,
  S as BigNumberCoder,
  rf as BooleanCoder,
  we as ByteArrayCoder,
  Cs as ByteCoder,
  Un as CHAIN_IDS,
  jA as CONTRACT_ID_LEN,
  OI as CONTRACT_MAX_SIZE,
  WE as ChainName,
  qI as ChangeOutputCollisionError,
  ie as Coder,
  fI as Commands,
  lI as Contract,
  EI as ContractFactory,
  mI as ContractUtils,
  oo as CreateTransactionRequest,
  fy as DECIMAL_FUEL,
  Ey as DECIMAL_GWEI,
  py as DECIMAL_KWEI,
  my as DECIMAL_MWEI,
  gy as DECIMAL_WEI,
  hy as DEFAULT_DECIMAL_UNITS,
  ly as DEFAULT_MIN_PRECISION,
  dy as DEFAULT_PRECISION,
  fo as DateTime,
  Ut as ENCODING_V0,
  Kn as ENCODING_V1,
  kI as EmptyRoot,
  eu as EnumCoder,
  dp as FAILED_ASSERT_EQ_SIGNAL,
  hp as FAILED_ASSERT_NE_SIGNAL,
  lp as FAILED_ASSERT_SIGNAL,
  up as FAILED_REQUIRE_SIGNAL,
  qu as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  JI as FAILED_UNKNOWN_SIGNAL,
  vs as FUEL_BECH32_HRP_PREFIX,
  Iy as FUEL_BETA_5_NETWORK_URL,
  wy as FUEL_NETWORK_URL,
  Xd as Fuel,
  Zw as FuelConnector,
  Vd as FuelConnectorEventType,
  Aa as FuelConnectorEventTypes,
  Zd as FuelConnectorMethods,
  e0 as FunctionInvocationResult,
  n0 as FunctionInvocationScope,
  Mi as HDWallet,
  qh as INPUT_COIN_FIXED_SIZE,
  Fs as InputCoder,
  Pa as InputCoinCoder,
  xs as InputContractCoder,
  Fr as InputMessageCoder,
  Ee as InputType,
  qd as InstructionSet,
  on as Interface,
  ys as InvocationCallResult,
  Kd as InvocationResult,
  xw as Language,
  Yw as LocalStorage,
  HI as MAX_PREDICATE_DATA_LENGTH,
  GI as MAX_PREDICATE_LENGTH,
  PI as MAX_SCRIPT_DATA_LENGTH,
  LI as MAX_SCRIPT_LENGTH,
  UI as MAX_STATIC_CONTRACTS,
  TI as MAX_WITNESSES,
  Sc as MNEMONIC_SIZES,
  Uw as MemoryStorage,
  oa as Mnemonic,
  Ud as MnemonicVault,
  dI as MultiCallInvocationScope,
  RE as NoWitnessAtIndexError,
  WI as NoWitnessByOwnerError,
  z as NumberCoder,
  jE as OperationName,
  ru as OptionCoder,
  Ga as OutputChangeCoder,
  Rs as OutputCoder,
  Ua as OutputCoinCoder,
  Ds as OutputContractCoder,
  Ja as OutputContractCreatedCoder,
  ye as OutputType,
  Ha as OutputVariableCoder,
  gp as PANIC_DOC_URL,
  fp as PANIC_REASONS,
  Ns as PoliciesCoder,
  kt as PolicyType,
  kc as Predicate,
  Gd as PrivateKeyVault,
  Os as Provider,
  of as RawSliceCoder,
  ji as ReceiptBurnCoder,
  Ya as ReceiptCallCoder,
  _I as ReceiptCoder,
  qa as ReceiptLogCoder,
  Wa as ReceiptLogDataCoder,
  Ss as ReceiptMessageOutCoder,
  Dr as ReceiptMintCoder,
  Xa as ReceiptPanicCoder,
  Za as ReceiptReturnCoder,
  Va as ReceiptReturnDataCoder,
  ja as ReceiptRevertCoder,
  Ka as ReceiptScriptResultCoder,
  $a as ReceiptTransferCoder,
  za as ReceiptTransferOutCoder,
  Ae as ReceiptType,
  To as SCRIPT_FIXED_SIZE,
  Ay as Script,
  Mr as ScriptRequest,
  Yn as ScriptTransactionRequest,
  cr as Signer,
  iu as StdStringCoder,
  ay as StorageAbstract,
  ec as StorageSlotCoder,
  af as StringCoder,
  Xs as StructCoder,
  Cn as TransactionCoder,
  nc as TransactionCreateCoder,
  rc as TransactionMintCoder,
  Is as TransactionResponse,
  tc as TransactionScriptCoder,
  XE as TransactionStatus,
  ft as TransactionType,
  VE as TransactionTypeName,
  ou as TupleCoder,
  nr as TxPointerCoder,
  Hi as UTXO_ID_LEN,
  MI as UtxoIdCoder,
  Hw as Vault,
  au as VecCoder,
  ee as WORD_SIZE,
  Qt as Wallet,
  Pd as WalletLocked,
  Gw as WalletManager,
  Ct as WalletUnlocked,
  _s as WitnessCoder,
  De as ZeroBytes32,
  bm as addAmountToAsset,
  ar as addOperation,
  Er as addressify,
  J as arrayify,
  FE as assemblePanicError,
  BE as assembleReceiptByType,
  DE as assembleRevertError,
  ti as assembleTransactionSummary,
  Oc as assert,
  oy as assets,
  Q as bn,
  In as bufferFromString,
  jI as buildBlockExplorerUrl,
  Vw as cacheFor,
  yd as calculateMetadataGasForTxCreate,
  Bd as calculateMetadataGasForTxScript,
  br as calculatePriceWithFactor,
  kE as calculateTransactionFee,
  Vs as calculateVmTxMemory,
  II as capitalizeString,
  qc as chunkAndPadBytes,
  Qf as clearFirst12BytesFromB256,
  zo as coinQuantityfy,
  se as concat,
  kr as concatBytes,
  uy as createConfig,
  Oh as decrypt,
  Lh as decryptJsonWalletData,
  BI as defaultChainConfig,
  CI as defaultConsensusKey,
  Xw as deferPromise,
  cy as dispatchFuelConnectorEvent,
  Th as encrypt,
  Ph as encryptJsonWalletData,
  is as english,
  Aw as extractBurnedAssetsFromReceipts,
  cw as extractMintedAssetsFromReceipts,
  Cd as extractTxError,
  QI as format,
  bI as formatUnits,
  Go as fromBech32,
  QE as gasUsedByInputs,
  jd as getAbisFromAllCalls,
  ry as getAssetEth,
  sy as getAssetFuel,
  mw as getAssetNetwork,
  _d as getAssetWithNetwork,
  Ho as getBytesFromBech32,
  rw as getContractCallOperations,
  ow as getContractCreatedOperations,
  Rd as getDecodedLogs,
  pw as getDefaultChainId,
  wd as getGasUsedFromReceipts,
  sa as getInputAccountAddress,
  HE as getInputContractFromIndex,
  Qd as getInputFromAssetId,
  ra as getInputsByType,
  TE as getInputsByTypes,
  LE as getInputsCoin,
  UE as getInputsCoinAndMessage,
  GE as getInputsContract,
  PE as getInputsMessage,
  na as getMaxGas,
  Id as getMinGas,
  Cu as getMintedAssetId,
  aw as getOperations,
  jr as getOutputsByType,
  YE as getOutputsChange,
  vd as getOutputsCoin,
  ZE as getOutputsContract,
  JE as getOutputsContractCreated,
  $I as getOutputsVariable,
  iw as getPayProducerOperations,
  Jw as getPredicateRoot,
  bf as getRandomB256,
  _r as getReceiptsByType,
  zE as getReceiptsCall,
  KE as getReceiptsMessageOut,
  KI as getReceiptsTransferOut,
  yE as getReceiptsWithMissingData,
  uw as getTransactionStatusName,
  ey as getTransactionSummary,
  ty as getTransactionSummaryFromRequest,
  xd as getTransactionTypeName,
  ny as getTransactionsSummaries,
  xc as getTransferOperations,
  nw as getWithdrawFromFuelOperations,
  zI as hasSameAssetId,
  sn as hash,
  Gh as hashMessage,
  j as hexlify,
  mE as inputify,
  Vi as isB256,
  gs as isBech32,
  Qc as isCoin,
  Xi as isEvmAddress,
  XI as isMessage,
  Ta as isPublicKey,
  ZI as isRawCoin,
  VI as isRawMessage,
  ia as isType,
  Fd as isTypeCreate,
  $E as isTypeMint,
  Dd as isTypeScript,
  _A as keccak256,
  NI as keyFromPassword,
  N0 as max,
  vI as multiply,
  Cf as normalizeBech32,
  vE as normalizeJSON,
  yI as normalizeString,
  EE as outputify,
  vf as padFirst12BytesOfEvmAddress,
  Zn as processGqlReceipt,
  dw as processGraphqlStatus,
  Xt as randomBytes,
  yn as resolveGasDependentCosts,
  iy as resolveIconPaths,
  vc as returnZeroScript,
  SA as scrypt,
  It as sha256,
  xE as sleep,
  xf as sortPolicies,
  mr as stringFromBuffer,
  La as toB256,
  fs as toBech32,
  Pt as toBytes,
  R0 as toFixed,
  mo as toHex,
  Ft as toNumber,
  St as transactionRequestify,
  Uh as uint64ToBytesBE,
  yw as urlJoin,
  os as withTimeout,
  ME as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
