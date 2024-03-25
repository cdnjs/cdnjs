var _0 = Object.defineProperty;
var k0 = (e, t, n) => t in e ? _0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var x = (e, t, n) => (k0(e, typeof t != "symbol" ? t + "" : t, n), n), Ti = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var ie = (e, t, n) => (Ti(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Be = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, ve = (e, t, n, r) => (Ti(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var vt = (e, t, n) => (Ti(e, t, "access private method"), n);
function BA() {
  return {
    FORC: "0.51.1",
    FUEL_CORE: "0.22.1",
    FUELS: "0.77.0"
  };
}
function Xa(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Lo(e, t) {
  const n = Xa(e), r = Xa(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function M0(e, t) {
  const { major: n } = Lo(e, t);
  return n === 0;
}
function O0(e, t) {
  const { minor: n } = Lo(e, t);
  return n === 0;
}
function L0(e, t) {
  const { patch: n } = Lo(e, t);
  return n === 0;
}
function T0(e) {
  const { FUEL_CORE: t } = BA();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: M0(e, t),
    isMinorSupported: O0(e, t),
    isPatchSupported: L0(e, t)
  };
}
var P0 = BA(), R = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(R || {}), In, v = (In = class extends Error {
  constructor(n, r) {
    super(r);
    x(this, "VERSIONS", P0);
    x(this, "code");
    this.code = n, this.name = "FuelError";
  }
  static parse(n) {
    const r = n;
    if (r.code === void 0)
      throw new In(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const s = Object.values(R);
    if (!s.includes(r.code))
      throw new In(
        "parse-failed",
        `Unknown error code: ${r.code}. Accepted codes: ${s.join(", ")}.`
      );
    return new In(r.code, r.message);
  }
  toObject() {
    const { code: n, name: r, message: s, VERSIONS: i } = this;
    return { code: n, name: r, message: s, VERSIONS: i };
  }
}, x(In, "CODES", R), In), yy = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, CA = (e, t) => {
  const n = [];
  for (let a = 0; a < e.length; a += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(a, a + t)), n.push(d);
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
  throw new v(R.PARSE_FAILED, "invalid BytesLike value");
}, Zr = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, se = (e) => {
  const t = e.map((n) => J(n));
  return Zr(t);
}, ja = "0123456789abcdef";
function X(e) {
  const t = J(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += ja[(s & 240) >> 4] + ja[s & 15];
  }
  return n;
}
var By = (e) => {
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
    throw new v(R.PARSE_FAILED, r);
  }
  return n;
}, U0 = 37, bA = BigInt(2 ** 62) + BigInt(U0), G0 = (e) => Math.floor(e / 1e3), QA = (e) => e * 1e3, H0 = (e) => Number(BigInt(e) - bA), J0 = (e) => String(BigInt(e) + bA), Z0 = (e) => QA(H0(e)), yn, xA = (yn = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(t) {
    return new yn(Z0(t));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(t) {
    return new yn(t);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(t) {
    return new yn(QA(t));
  }
  /**
   * Hide the constructor to prevent direct instantiation.
   */
  constructor(t) {
    super(t);
  }
  /**
   * Returns the Tai64 timestamp.
   *
   * @returns the Tai64 timestamp
   */
  toTai64() {
    return J0(this.toUnixSeconds());
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
    return G0(this.getTime());
  }
}, x(yn, "TAI64_NULL", ""), yn), Y0 = {
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
}, Cy = Y0, by = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298", be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function V0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function To(e) {
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
var Po = { exports: {} };
const X0 = {}, j0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: X0
}, Symbol.toStringTag, { value: "Module" })), q0 = /* @__PURE__ */ To(j0);
Po.exports;
(function(e) {
  (function(t, n) {
    function r(B, c) {
      if (!B)
        throw new Error(c || "Assertion failed");
    }
    function s(B, c) {
      B.super_ = c;
      var A = function() {
      };
      A.prototype = c.prototype, B.prototype = new A(), B.prototype.constructor = B;
    }
    function i(B, c, A) {
      if (i.isBN(B))
        return B;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, B !== null && ((c === "le" || c === "be") && (A = c, c = 10), this._init(B || 0, c || 10, A || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = q0.Buffer;
    } catch {
    }
    i.isBN = function(c) {
      return c instanceof i ? !0 : c !== null && typeof c == "object" && c.constructor.wordSize === i.wordSize && Array.isArray(c.words);
    }, i.max = function(c, A) {
      return c.cmp(A) > 0 ? c : A;
    }, i.min = function(c, A) {
      return c.cmp(A) < 0 ? c : A;
    }, i.prototype._init = function(c, A, l) {
      if (typeof c == "number")
        return this._initNumber(c, A, l);
      if (typeof c == "object")
        return this._initArray(c, A, l);
      A === "hex" && (A = 16), r(A === (A | 0) && A >= 2 && A <= 36), c = c.toString().replace(/\s+/g, "");
      var p = 0;
      c[0] === "-" && (p++, this.negative = 1), p < c.length && (A === 16 ? this._parseHex(c, p, l) : (this._parseBase(c, A, p), l === "le" && this._initArray(this.toArray(), A, l)));
    }, i.prototype._initNumber = function(c, A, l) {
      c < 0 && (this.negative = 1, c = -c), c < 67108864 ? (this.words = [c & 67108863], this.length = 1) : c < 4503599627370496 ? (this.words = [
        c & 67108863,
        c / 67108864 & 67108863
      ], this.length = 2) : (r(c < 9007199254740992), this.words = [
        c & 67108863,
        c / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), A, l);
    }, i.prototype._initArray = function(c, A, l) {
      if (r(typeof c.length == "number"), c.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(c.length / 3), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f, w, y = 0;
      if (l === "be")
        for (p = c.length - 1, f = 0; p >= 0; p -= 3)
          w = c[p] | c[p - 1] << 8 | c[p - 2] << 16, this.words[f] |= w << y & 67108863, this.words[f + 1] = w >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (l === "le")
        for (p = 0, f = 0; p < c.length; p += 3)
          w = c[p] | c[p + 1] << 8 | c[p + 2] << 16, this.words[f] |= w << y & 67108863, this.words[f + 1] = w >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      return this._strip();
    };
    function a(B, c) {
      var A = B.charCodeAt(c);
      if (A >= 48 && A <= 57)
        return A - 48;
      if (A >= 65 && A <= 70)
        return A - 55;
      if (A >= 97 && A <= 102)
        return A - 87;
      r(!1, "Invalid character in " + B);
    }
    function d(B, c, A) {
      var l = a(B, A);
      return A - 1 >= c && (l |= a(B, A - 1) << 4), l;
    }
    i.prototype._parseHex = function(c, A, l) {
      this.length = Math.ceil((c.length - A) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f = 0, w = 0, y;
      if (l === "be")
        for (p = c.length - 1; p >= A; p -= 2)
          y = d(c, A, p) << f, this.words[w] |= y & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= y >>> 26) : f += 8;
      else {
        var g = c.length - A;
        for (p = g % 2 === 0 ? A + 1 : A; p < c.length; p += 2)
          y = d(c, A, p) << f, this.words[w] |= y & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(B, c, A, l) {
      for (var p = 0, f = 0, w = Math.min(B.length, A), y = c; y < w; y++) {
        var g = B.charCodeAt(y) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(c, A, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= A)
        p++;
      p--, f = f / A | 0;
      for (var w = c.length - l, y = w % p, g = Math.min(w, w - y) + l, u = 0, m = l; m < g; m += p)
        u = h(c, m, m + p, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var Y = 1;
        for (u = h(c, m, c.length, A), m = 0; m < y; m++)
          Y *= A;
        this.imuln(Y), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(c) {
      c.words = new Array(this.length);
      for (var A = 0; A < this.length; A++)
        c.words[A] = this.words[A];
      c.length = this.length, c.negative = this.negative, c.red = this.red;
    };
    function I(B, c) {
      B.words = c.words, B.length = c.length, B.negative = c.negative, B.red = c.red;
    }
    if (i.prototype._move = function(c) {
      I(c, this);
    }, i.prototype.clone = function() {
      var c = new i(null);
      return this.copy(c), c;
    }, i.prototype._expand = function(c) {
      for (; this.length < c; )
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
    ], D = [
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
    i.prototype.toString = function(c, A) {
      c = c || 10, A = A | 0 || 1;
      var l;
      if (c === 16 || c === "hex") {
        l = "";
        for (var p = 0, f = 0, w = 0; w < this.length; w++) {
          var y = this.words[w], g = ((y << p | f) & 16777215).toString(16);
          f = y >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, w--), f !== 0 || w !== this.length - 1 ? l = C[6 - g.length] + g + l : l = g + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % A !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (c === (c | 0) && c >= 2 && c <= 36) {
        var u = D[c], m = F[c];
        l = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var V = Y.modrn(m).toString(c);
          Y = Y.idivn(m), Y.isZero() ? l = V + l : l = C[u - V.length] + V + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % A !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var c = this.words[0];
      return this.length === 2 ? c += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? c += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -c : c;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(c, A) {
      return this.toArrayLike(o, c, A);
    }), i.prototype.toArray = function(c, A) {
      return this.toArrayLike(Array, c, A);
    };
    var b = function(c, A) {
      return c.allocUnsafe ? c.allocUnsafe(A) : new c(A);
    };
    i.prototype.toArrayLike = function(c, A, l) {
      this._strip();
      var p = this.byteLength(), f = l || Math.max(1, p);
      r(p <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var w = b(c, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](w, p), w;
    }, i.prototype._toArrayLikeLE = function(c, A) {
      for (var l = 0, p = 0, f = 0, w = 0; f < this.length; f++) {
        var y = this.words[f] << w | p;
        c[l++] = y & 255, l < c.length && (c[l++] = y >> 8 & 255), l < c.length && (c[l++] = y >> 16 & 255), w === 6 ? (l < c.length && (c[l++] = y >> 24 & 255), p = 0, w = 0) : (p = y >>> 24, w += 2);
      }
      if (l < c.length)
        for (c[l++] = p; l < c.length; )
          c[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(c, A) {
      for (var l = c.length - 1, p = 0, f = 0, w = 0; f < this.length; f++) {
        var y = this.words[f] << w | p;
        c[l--] = y & 255, l >= 0 && (c[l--] = y >> 8 & 255), l >= 0 && (c[l--] = y >> 16 & 255), w === 6 ? (l >= 0 && (c[l--] = y >> 24 & 255), p = 0, w = 0) : (p = y >>> 24, w += 2);
      }
      if (l >= 0)
        for (c[l--] = p; l >= 0; )
          c[l--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(c) {
      return 32 - Math.clz32(c);
    } : i.prototype._countBits = function(c) {
      var A = c, l = 0;
      return A >= 4096 && (l += 13, A >>>= 13), A >= 64 && (l += 7, A >>>= 7), A >= 8 && (l += 4, A >>>= 4), A >= 2 && (l += 2, A >>>= 2), l + A;
    }, i.prototype._zeroBits = function(c) {
      if (c === 0)
        return 26;
      var A = c, l = 0;
      return A & 8191 || (l += 13, A >>>= 13), A & 127 || (l += 7, A >>>= 7), A & 15 || (l += 4, A >>>= 4), A & 3 || (l += 2, A >>>= 2), A & 1 || l++, l;
    }, i.prototype.bitLength = function() {
      var c = this.words[this.length - 1], A = this._countBits(c);
      return (this.length - 1) * 26 + A;
    };
    function N(B) {
      for (var c = new Array(B.bitLength()), A = 0; A < c.length; A++) {
        var l = A / 26 | 0, p = A % 26;
        c[A] = B.words[l] >>> p & 1;
      }
      return c;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var c = 0, A = 0; A < this.length; A++) {
        var l = this._zeroBits(this.words[A]);
        if (c += l, l !== 26)
          break;
      }
      return c;
    }, i.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, i.prototype.toTwos = function(c) {
      return this.negative !== 0 ? this.abs().inotn(c).iaddn(1) : this.clone();
    }, i.prototype.fromTwos = function(c) {
      return this.testn(c - 1) ? this.notn(c).iaddn(1).ineg() : this.clone();
    }, i.prototype.isNeg = function() {
      return this.negative !== 0;
    }, i.prototype.neg = function() {
      return this.clone().ineg();
    }, i.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, i.prototype.iuor = function(c) {
      for (; this.length < c.length; )
        this.words[this.length++] = 0;
      for (var A = 0; A < c.length; A++)
        this.words[A] = this.words[A] | c.words[A];
      return this._strip();
    }, i.prototype.ior = function(c) {
      return r((this.negative | c.negative) === 0), this.iuor(c);
    }, i.prototype.or = function(c) {
      return this.length > c.length ? this.clone().ior(c) : c.clone().ior(this);
    }, i.prototype.uor = function(c) {
      return this.length > c.length ? this.clone().iuor(c) : c.clone().iuor(this);
    }, i.prototype.iuand = function(c) {
      var A;
      this.length > c.length ? A = c : A = this;
      for (var l = 0; l < A.length; l++)
        this.words[l] = this.words[l] & c.words[l];
      return this.length = A.length, this._strip();
    }, i.prototype.iand = function(c) {
      return r((this.negative | c.negative) === 0), this.iuand(c);
    }, i.prototype.and = function(c) {
      return this.length > c.length ? this.clone().iand(c) : c.clone().iand(this);
    }, i.prototype.uand = function(c) {
      return this.length > c.length ? this.clone().iuand(c) : c.clone().iuand(this);
    }, i.prototype.iuxor = function(c) {
      var A, l;
      this.length > c.length ? (A = this, l = c) : (A = c, l = this);
      for (var p = 0; p < l.length; p++)
        this.words[p] = A.words[p] ^ l.words[p];
      if (this !== A)
        for (; p < A.length; p++)
          this.words[p] = A.words[p];
      return this.length = A.length, this._strip();
    }, i.prototype.ixor = function(c) {
      return r((this.negative | c.negative) === 0), this.iuxor(c);
    }, i.prototype.xor = function(c) {
      return this.length > c.length ? this.clone().ixor(c) : c.clone().ixor(this);
    }, i.prototype.uxor = function(c) {
      return this.length > c.length ? this.clone().iuxor(c) : c.clone().iuxor(this);
    }, i.prototype.inotn = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = Math.ceil(c / 26) | 0, l = c % 26;
      this._expand(A), l > 0 && A--;
      for (var p = 0; p < A; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return l > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(c) {
      return this.clone().inotn(c);
    }, i.prototype.setn = function(c, A) {
      r(typeof c == "number" && c >= 0);
      var l = c / 26 | 0, p = c % 26;
      return this._expand(l + 1), A ? this.words[l] = this.words[l] | 1 << p : this.words[l] = this.words[l] & ~(1 << p), this._strip();
    }, i.prototype.iadd = function(c) {
      var A;
      if (this.negative !== 0 && c.negative === 0)
        return this.negative = 0, A = this.isub(c), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && c.negative !== 0)
        return c.negative = 0, A = this.isub(c), c.negative = 1, A._normSign();
      var l, p;
      this.length > c.length ? (l = this, p = c) : (l = c, p = this);
      for (var f = 0, w = 0; w < p.length; w++)
        A = (l.words[w] | 0) + (p.words[w] | 0) + f, this.words[w] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && w < l.length; w++)
        A = (l.words[w] | 0) + f, this.words[w] = A & 67108863, f = A >>> 26;
      if (this.length = l.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (l !== this)
        for (; w < l.length; w++)
          this.words[w] = l.words[w];
      return this;
    }, i.prototype.add = function(c) {
      var A;
      return c.negative !== 0 && this.negative === 0 ? (c.negative = 0, A = this.sub(c), c.negative ^= 1, A) : c.negative === 0 && this.negative !== 0 ? (this.negative = 0, A = c.sub(this), this.negative = 1, A) : this.length > c.length ? this.clone().iadd(c) : c.clone().iadd(this);
    }, i.prototype.isub = function(c) {
      if (c.negative !== 0) {
        c.negative = 0;
        var A = this.iadd(c);
        return c.negative = 1, A._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(c), this.negative = 1, this._normSign();
      var l = this.cmp(c);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var p, f;
      l > 0 ? (p = this, f = c) : (p = c, f = this);
      for (var w = 0, y = 0; y < f.length; y++)
        A = (p.words[y] | 0) - (f.words[y] | 0) + w, w = A >> 26, this.words[y] = A & 67108863;
      for (; w !== 0 && y < p.length; y++)
        A = (p.words[y] | 0) + w, w = A >> 26, this.words[y] = A & 67108863;
      if (w === 0 && y < p.length && p !== this)
        for (; y < p.length; y++)
          this.words[y] = p.words[y];
      return this.length = Math.max(this.length, y), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(c) {
      return this.clone().isub(c);
    };
    function S(B, c, A) {
      A.negative = c.negative ^ B.negative;
      var l = B.length + c.length | 0;
      A.length = l, l = l - 1 | 0;
      var p = B.words[0] | 0, f = c.words[0] | 0, w = p * f, y = w & 67108863, g = w / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < l; u++) {
        for (var m = g >>> 26, Y = g & 67108863, V = Math.min(u, c.length - 1), $ = Math.max(0, u - B.length + 1); $ <= V; $++) {
          var q = u - $ | 0;
          p = B.words[q] | 0, f = c.words[$] | 0, w = p * f + Y, m += w / 67108864 | 0, Y = w & 67108863;
        }
        A.words[u] = Y | 0, g = m | 0;
      }
      return g !== 0 ? A.words[u] = g | 0 : A.length--, A._strip();
    }
    var Z = function(c, A, l) {
      var p = c.words, f = A.words, w = l.words, y = 0, g, u, m, Y = p[0] | 0, V = Y & 8191, $ = Y >>> 13, q = p[1] | 0, te = q & 8191, ne = q >>> 13, Se = p[2] | 0, fe = Se & 8191, ae = Se >>> 13, De = p[3] | 0, le = De & 8191, ge = De >>> 13, Ht = p[4] | 0, Re = Ht & 8191, ye = Ht >>> 13, Cr = p[5] | 0, _e = Cr & 8191, Me = Cr >>> 13, ss = p[6] | 0, Le = ss & 8191, Te = ss >>> 13, ka = p[7] | 0, Pe = ka & 8191, Ue = ka >>> 13, Ma = p[8] | 0, Ge = Ma & 8191, He = Ma >>> 13, Oa = p[9] | 0, Je = Oa & 8191, Ze = Oa >>> 13, La = f[0] | 0, Ye = La & 8191, Ve = La >>> 13, Ta = f[1] | 0, Xe = Ta & 8191, je = Ta >>> 13, Pa = f[2] | 0, qe = Pa & 8191, We = Pa >>> 13, Ua = f[3] | 0, $e = Ua & 8191, Ke = Ua >>> 13, Ga = f[4] | 0, ze = Ga & 8191, et = Ga >>> 13, Ha = f[5] | 0, tt = Ha & 8191, nt = Ha >>> 13, Ja = f[6] | 0, rt = Ja & 8191, st = Ja >>> 13, Za = f[7] | 0, it = Za & 8191, ot = Za >>> 13, Ya = f[8] | 0, at = Ya & 8191, ct = Ya >>> 13, Va = f[9] | 0, At = Va & 8191, ut = Va >>> 13;
      l.negative = c.negative ^ A.negative, l.length = 19, g = Math.imul(V, Ye), u = Math.imul(V, Ve), u = u + Math.imul($, Ye) | 0, m = Math.imul($, Ve);
      var Ei = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, g = Math.imul(te, Ye), u = Math.imul(te, Ve), u = u + Math.imul(ne, Ye) | 0, m = Math.imul(ne, Ve), g = g + Math.imul(V, Xe) | 0, u = u + Math.imul(V, je) | 0, u = u + Math.imul($, Xe) | 0, m = m + Math.imul($, je) | 0;
      var Ii = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, g = Math.imul(fe, Ye), u = Math.imul(fe, Ve), u = u + Math.imul(ae, Ye) | 0, m = Math.imul(ae, Ve), g = g + Math.imul(te, Xe) | 0, u = u + Math.imul(te, je) | 0, u = u + Math.imul(ne, Xe) | 0, m = m + Math.imul(ne, je) | 0, g = g + Math.imul(V, qe) | 0, u = u + Math.imul(V, We) | 0, u = u + Math.imul($, qe) | 0, m = m + Math.imul($, We) | 0;
      var yi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (yi >>> 26) | 0, yi &= 67108863, g = Math.imul(le, Ye), u = Math.imul(le, Ve), u = u + Math.imul(ge, Ye) | 0, m = Math.imul(ge, Ve), g = g + Math.imul(fe, Xe) | 0, u = u + Math.imul(fe, je) | 0, u = u + Math.imul(ae, Xe) | 0, m = m + Math.imul(ae, je) | 0, g = g + Math.imul(te, qe) | 0, u = u + Math.imul(te, We) | 0, u = u + Math.imul(ne, qe) | 0, m = m + Math.imul(ne, We) | 0, g = g + Math.imul(V, $e) | 0, u = u + Math.imul(V, Ke) | 0, u = u + Math.imul($, $e) | 0, m = m + Math.imul($, Ke) | 0;
      var Bi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, g = Math.imul(Re, Ye), u = Math.imul(Re, Ve), u = u + Math.imul(ye, Ye) | 0, m = Math.imul(ye, Ve), g = g + Math.imul(le, Xe) | 0, u = u + Math.imul(le, je) | 0, u = u + Math.imul(ge, Xe) | 0, m = m + Math.imul(ge, je) | 0, g = g + Math.imul(fe, qe) | 0, u = u + Math.imul(fe, We) | 0, u = u + Math.imul(ae, qe) | 0, m = m + Math.imul(ae, We) | 0, g = g + Math.imul(te, $e) | 0, u = u + Math.imul(te, Ke) | 0, u = u + Math.imul(ne, $e) | 0, m = m + Math.imul(ne, Ke) | 0, g = g + Math.imul(V, ze) | 0, u = u + Math.imul(V, et) | 0, u = u + Math.imul($, ze) | 0, m = m + Math.imul($, et) | 0;
      var Ci = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, g = Math.imul(_e, Ye), u = Math.imul(_e, Ve), u = u + Math.imul(Me, Ye) | 0, m = Math.imul(Me, Ve), g = g + Math.imul(Re, Xe) | 0, u = u + Math.imul(Re, je) | 0, u = u + Math.imul(ye, Xe) | 0, m = m + Math.imul(ye, je) | 0, g = g + Math.imul(le, qe) | 0, u = u + Math.imul(le, We) | 0, u = u + Math.imul(ge, qe) | 0, m = m + Math.imul(ge, We) | 0, g = g + Math.imul(fe, $e) | 0, u = u + Math.imul(fe, Ke) | 0, u = u + Math.imul(ae, $e) | 0, m = m + Math.imul(ae, Ke) | 0, g = g + Math.imul(te, ze) | 0, u = u + Math.imul(te, et) | 0, u = u + Math.imul(ne, ze) | 0, m = m + Math.imul(ne, et) | 0, g = g + Math.imul(V, tt) | 0, u = u + Math.imul(V, nt) | 0, u = u + Math.imul($, tt) | 0, m = m + Math.imul($, nt) | 0;
      var bi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, g = Math.imul(Le, Ye), u = Math.imul(Le, Ve), u = u + Math.imul(Te, Ye) | 0, m = Math.imul(Te, Ve), g = g + Math.imul(_e, Xe) | 0, u = u + Math.imul(_e, je) | 0, u = u + Math.imul(Me, Xe) | 0, m = m + Math.imul(Me, je) | 0, g = g + Math.imul(Re, qe) | 0, u = u + Math.imul(Re, We) | 0, u = u + Math.imul(ye, qe) | 0, m = m + Math.imul(ye, We) | 0, g = g + Math.imul(le, $e) | 0, u = u + Math.imul(le, Ke) | 0, u = u + Math.imul(ge, $e) | 0, m = m + Math.imul(ge, Ke) | 0, g = g + Math.imul(fe, ze) | 0, u = u + Math.imul(fe, et) | 0, u = u + Math.imul(ae, ze) | 0, m = m + Math.imul(ae, et) | 0, g = g + Math.imul(te, tt) | 0, u = u + Math.imul(te, nt) | 0, u = u + Math.imul(ne, tt) | 0, m = m + Math.imul(ne, nt) | 0, g = g + Math.imul(V, rt) | 0, u = u + Math.imul(V, st) | 0, u = u + Math.imul($, rt) | 0, m = m + Math.imul($, st) | 0;
      var Qi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, g = Math.imul(Pe, Ye), u = Math.imul(Pe, Ve), u = u + Math.imul(Ue, Ye) | 0, m = Math.imul(Ue, Ve), g = g + Math.imul(Le, Xe) | 0, u = u + Math.imul(Le, je) | 0, u = u + Math.imul(Te, Xe) | 0, m = m + Math.imul(Te, je) | 0, g = g + Math.imul(_e, qe) | 0, u = u + Math.imul(_e, We) | 0, u = u + Math.imul(Me, qe) | 0, m = m + Math.imul(Me, We) | 0, g = g + Math.imul(Re, $e) | 0, u = u + Math.imul(Re, Ke) | 0, u = u + Math.imul(ye, $e) | 0, m = m + Math.imul(ye, Ke) | 0, g = g + Math.imul(le, ze) | 0, u = u + Math.imul(le, et) | 0, u = u + Math.imul(ge, ze) | 0, m = m + Math.imul(ge, et) | 0, g = g + Math.imul(fe, tt) | 0, u = u + Math.imul(fe, nt) | 0, u = u + Math.imul(ae, tt) | 0, m = m + Math.imul(ae, nt) | 0, g = g + Math.imul(te, rt) | 0, u = u + Math.imul(te, st) | 0, u = u + Math.imul(ne, rt) | 0, m = m + Math.imul(ne, st) | 0, g = g + Math.imul(V, it) | 0, u = u + Math.imul(V, ot) | 0, u = u + Math.imul($, it) | 0, m = m + Math.imul($, ot) | 0;
      var xi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, g = Math.imul(Ge, Ye), u = Math.imul(Ge, Ve), u = u + Math.imul(He, Ye) | 0, m = Math.imul(He, Ve), g = g + Math.imul(Pe, Xe) | 0, u = u + Math.imul(Pe, je) | 0, u = u + Math.imul(Ue, Xe) | 0, m = m + Math.imul(Ue, je) | 0, g = g + Math.imul(Le, qe) | 0, u = u + Math.imul(Le, We) | 0, u = u + Math.imul(Te, qe) | 0, m = m + Math.imul(Te, We) | 0, g = g + Math.imul(_e, $e) | 0, u = u + Math.imul(_e, Ke) | 0, u = u + Math.imul(Me, $e) | 0, m = m + Math.imul(Me, Ke) | 0, g = g + Math.imul(Re, ze) | 0, u = u + Math.imul(Re, et) | 0, u = u + Math.imul(ye, ze) | 0, m = m + Math.imul(ye, et) | 0, g = g + Math.imul(le, tt) | 0, u = u + Math.imul(le, nt) | 0, u = u + Math.imul(ge, tt) | 0, m = m + Math.imul(ge, nt) | 0, g = g + Math.imul(fe, rt) | 0, u = u + Math.imul(fe, st) | 0, u = u + Math.imul(ae, rt) | 0, m = m + Math.imul(ae, st) | 0, g = g + Math.imul(te, it) | 0, u = u + Math.imul(te, ot) | 0, u = u + Math.imul(ne, it) | 0, m = m + Math.imul(ne, ot) | 0, g = g + Math.imul(V, at) | 0, u = u + Math.imul(V, ct) | 0, u = u + Math.imul($, at) | 0, m = m + Math.imul($, ct) | 0;
      var vi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (vi >>> 26) | 0, vi &= 67108863, g = Math.imul(Je, Ye), u = Math.imul(Je, Ve), u = u + Math.imul(Ze, Ye) | 0, m = Math.imul(Ze, Ve), g = g + Math.imul(Ge, Xe) | 0, u = u + Math.imul(Ge, je) | 0, u = u + Math.imul(He, Xe) | 0, m = m + Math.imul(He, je) | 0, g = g + Math.imul(Pe, qe) | 0, u = u + Math.imul(Pe, We) | 0, u = u + Math.imul(Ue, qe) | 0, m = m + Math.imul(Ue, We) | 0, g = g + Math.imul(Le, $e) | 0, u = u + Math.imul(Le, Ke) | 0, u = u + Math.imul(Te, $e) | 0, m = m + Math.imul(Te, Ke) | 0, g = g + Math.imul(_e, ze) | 0, u = u + Math.imul(_e, et) | 0, u = u + Math.imul(Me, ze) | 0, m = m + Math.imul(Me, et) | 0, g = g + Math.imul(Re, tt) | 0, u = u + Math.imul(Re, nt) | 0, u = u + Math.imul(ye, tt) | 0, m = m + Math.imul(ye, nt) | 0, g = g + Math.imul(le, rt) | 0, u = u + Math.imul(le, st) | 0, u = u + Math.imul(ge, rt) | 0, m = m + Math.imul(ge, st) | 0, g = g + Math.imul(fe, it) | 0, u = u + Math.imul(fe, ot) | 0, u = u + Math.imul(ae, it) | 0, m = m + Math.imul(ae, ot) | 0, g = g + Math.imul(te, at) | 0, u = u + Math.imul(te, ct) | 0, u = u + Math.imul(ne, at) | 0, m = m + Math.imul(ne, ct) | 0, g = g + Math.imul(V, At) | 0, u = u + Math.imul(V, ut) | 0, u = u + Math.imul($, At) | 0, m = m + Math.imul($, ut) | 0;
      var Fi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, g = Math.imul(Je, Xe), u = Math.imul(Je, je), u = u + Math.imul(Ze, Xe) | 0, m = Math.imul(Ze, je), g = g + Math.imul(Ge, qe) | 0, u = u + Math.imul(Ge, We) | 0, u = u + Math.imul(He, qe) | 0, m = m + Math.imul(He, We) | 0, g = g + Math.imul(Pe, $e) | 0, u = u + Math.imul(Pe, Ke) | 0, u = u + Math.imul(Ue, $e) | 0, m = m + Math.imul(Ue, Ke) | 0, g = g + Math.imul(Le, ze) | 0, u = u + Math.imul(Le, et) | 0, u = u + Math.imul(Te, ze) | 0, m = m + Math.imul(Te, et) | 0, g = g + Math.imul(_e, tt) | 0, u = u + Math.imul(_e, nt) | 0, u = u + Math.imul(Me, tt) | 0, m = m + Math.imul(Me, nt) | 0, g = g + Math.imul(Re, rt) | 0, u = u + Math.imul(Re, st) | 0, u = u + Math.imul(ye, rt) | 0, m = m + Math.imul(ye, st) | 0, g = g + Math.imul(le, it) | 0, u = u + Math.imul(le, ot) | 0, u = u + Math.imul(ge, it) | 0, m = m + Math.imul(ge, ot) | 0, g = g + Math.imul(fe, at) | 0, u = u + Math.imul(fe, ct) | 0, u = u + Math.imul(ae, at) | 0, m = m + Math.imul(ae, ct) | 0, g = g + Math.imul(te, At) | 0, u = u + Math.imul(te, ut) | 0, u = u + Math.imul(ne, At) | 0, m = m + Math.imul(ne, ut) | 0;
      var Di = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, g = Math.imul(Je, qe), u = Math.imul(Je, We), u = u + Math.imul(Ze, qe) | 0, m = Math.imul(Ze, We), g = g + Math.imul(Ge, $e) | 0, u = u + Math.imul(Ge, Ke) | 0, u = u + Math.imul(He, $e) | 0, m = m + Math.imul(He, Ke) | 0, g = g + Math.imul(Pe, ze) | 0, u = u + Math.imul(Pe, et) | 0, u = u + Math.imul(Ue, ze) | 0, m = m + Math.imul(Ue, et) | 0, g = g + Math.imul(Le, tt) | 0, u = u + Math.imul(Le, nt) | 0, u = u + Math.imul(Te, tt) | 0, m = m + Math.imul(Te, nt) | 0, g = g + Math.imul(_e, rt) | 0, u = u + Math.imul(_e, st) | 0, u = u + Math.imul(Me, rt) | 0, m = m + Math.imul(Me, st) | 0, g = g + Math.imul(Re, it) | 0, u = u + Math.imul(Re, ot) | 0, u = u + Math.imul(ye, it) | 0, m = m + Math.imul(ye, ot) | 0, g = g + Math.imul(le, at) | 0, u = u + Math.imul(le, ct) | 0, u = u + Math.imul(ge, at) | 0, m = m + Math.imul(ge, ct) | 0, g = g + Math.imul(fe, At) | 0, u = u + Math.imul(fe, ut) | 0, u = u + Math.imul(ae, At) | 0, m = m + Math.imul(ae, ut) | 0;
      var Ri = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, g = Math.imul(Je, $e), u = Math.imul(Je, Ke), u = u + Math.imul(Ze, $e) | 0, m = Math.imul(Ze, Ke), g = g + Math.imul(Ge, ze) | 0, u = u + Math.imul(Ge, et) | 0, u = u + Math.imul(He, ze) | 0, m = m + Math.imul(He, et) | 0, g = g + Math.imul(Pe, tt) | 0, u = u + Math.imul(Pe, nt) | 0, u = u + Math.imul(Ue, tt) | 0, m = m + Math.imul(Ue, nt) | 0, g = g + Math.imul(Le, rt) | 0, u = u + Math.imul(Le, st) | 0, u = u + Math.imul(Te, rt) | 0, m = m + Math.imul(Te, st) | 0, g = g + Math.imul(_e, it) | 0, u = u + Math.imul(_e, ot) | 0, u = u + Math.imul(Me, it) | 0, m = m + Math.imul(Me, ot) | 0, g = g + Math.imul(Re, at) | 0, u = u + Math.imul(Re, ct) | 0, u = u + Math.imul(ye, at) | 0, m = m + Math.imul(ye, ct) | 0, g = g + Math.imul(le, At) | 0, u = u + Math.imul(le, ut) | 0, u = u + Math.imul(ge, At) | 0, m = m + Math.imul(ge, ut) | 0;
      var Ni = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, g = Math.imul(Je, ze), u = Math.imul(Je, et), u = u + Math.imul(Ze, ze) | 0, m = Math.imul(Ze, et), g = g + Math.imul(Ge, tt) | 0, u = u + Math.imul(Ge, nt) | 0, u = u + Math.imul(He, tt) | 0, m = m + Math.imul(He, nt) | 0, g = g + Math.imul(Pe, rt) | 0, u = u + Math.imul(Pe, st) | 0, u = u + Math.imul(Ue, rt) | 0, m = m + Math.imul(Ue, st) | 0, g = g + Math.imul(Le, it) | 0, u = u + Math.imul(Le, ot) | 0, u = u + Math.imul(Te, it) | 0, m = m + Math.imul(Te, ot) | 0, g = g + Math.imul(_e, at) | 0, u = u + Math.imul(_e, ct) | 0, u = u + Math.imul(Me, at) | 0, m = m + Math.imul(Me, ct) | 0, g = g + Math.imul(Re, At) | 0, u = u + Math.imul(Re, ut) | 0, u = u + Math.imul(ye, At) | 0, m = m + Math.imul(ye, ut) | 0;
      var Si = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, g = Math.imul(Je, tt), u = Math.imul(Je, nt), u = u + Math.imul(Ze, tt) | 0, m = Math.imul(Ze, nt), g = g + Math.imul(Ge, rt) | 0, u = u + Math.imul(Ge, st) | 0, u = u + Math.imul(He, rt) | 0, m = m + Math.imul(He, st) | 0, g = g + Math.imul(Pe, it) | 0, u = u + Math.imul(Pe, ot) | 0, u = u + Math.imul(Ue, it) | 0, m = m + Math.imul(Ue, ot) | 0, g = g + Math.imul(Le, at) | 0, u = u + Math.imul(Le, ct) | 0, u = u + Math.imul(Te, at) | 0, m = m + Math.imul(Te, ct) | 0, g = g + Math.imul(_e, At) | 0, u = u + Math.imul(_e, ut) | 0, u = u + Math.imul(Me, At) | 0, m = m + Math.imul(Me, ut) | 0;
      var _i = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, g = Math.imul(Je, rt), u = Math.imul(Je, st), u = u + Math.imul(Ze, rt) | 0, m = Math.imul(Ze, st), g = g + Math.imul(Ge, it) | 0, u = u + Math.imul(Ge, ot) | 0, u = u + Math.imul(He, it) | 0, m = m + Math.imul(He, ot) | 0, g = g + Math.imul(Pe, at) | 0, u = u + Math.imul(Pe, ct) | 0, u = u + Math.imul(Ue, at) | 0, m = m + Math.imul(Ue, ct) | 0, g = g + Math.imul(Le, At) | 0, u = u + Math.imul(Le, ut) | 0, u = u + Math.imul(Te, At) | 0, m = m + Math.imul(Te, ut) | 0;
      var ki = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, g = Math.imul(Je, it), u = Math.imul(Je, ot), u = u + Math.imul(Ze, it) | 0, m = Math.imul(Ze, ot), g = g + Math.imul(Ge, at) | 0, u = u + Math.imul(Ge, ct) | 0, u = u + Math.imul(He, at) | 0, m = m + Math.imul(He, ct) | 0, g = g + Math.imul(Pe, At) | 0, u = u + Math.imul(Pe, ut) | 0, u = u + Math.imul(Ue, At) | 0, m = m + Math.imul(Ue, ut) | 0;
      var Mi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, g = Math.imul(Je, at), u = Math.imul(Je, ct), u = u + Math.imul(Ze, at) | 0, m = Math.imul(Ze, ct), g = g + Math.imul(Ge, At) | 0, u = u + Math.imul(Ge, ut) | 0, u = u + Math.imul(He, At) | 0, m = m + Math.imul(He, ut) | 0;
      var Oi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (m + (u >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, g = Math.imul(Je, At), u = Math.imul(Je, ut), u = u + Math.imul(Ze, At) | 0, m = Math.imul(Ze, ut);
      var Li = (y + g | 0) + ((u & 8191) << 13) | 0;
      return y = (m + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, w[0] = Ei, w[1] = Ii, w[2] = yi, w[3] = Bi, w[4] = Ci, w[5] = bi, w[6] = Qi, w[7] = xi, w[8] = vi, w[9] = Fi, w[10] = Di, w[11] = Ri, w[12] = Ni, w[13] = Si, w[14] = _i, w[15] = ki, w[16] = Mi, w[17] = Oi, w[18] = Li, y !== 0 && (w[19] = y, l.length++), l;
    };
    Math.imul || (Z = S);
    function T(B, c, A) {
      A.negative = c.negative ^ B.negative, A.length = B.length + c.length;
      for (var l = 0, p = 0, f = 0; f < A.length - 1; f++) {
        var w = p;
        p = 0;
        for (var y = l & 67108863, g = Math.min(f, c.length - 1), u = Math.max(0, f - B.length + 1); u <= g; u++) {
          var m = f - u, Y = B.words[m] | 0, V = c.words[u] | 0, $ = Y * V, q = $ & 67108863;
          w = w + ($ / 67108864 | 0) | 0, q = q + y | 0, y = q & 67108863, w = w + (q >>> 26) | 0, p += w >>> 26, w &= 67108863;
        }
        A.words[f] = y, l = w, w = p;
      }
      return l !== 0 ? A.words[f] = l : A.length--, A._strip();
    }
    function j(B, c, A) {
      return T(B, c, A);
    }
    i.prototype.mulTo = function(c, A) {
      var l, p = this.length + c.length;
      return this.length === 10 && c.length === 10 ? l = Z(this, c, A) : p < 63 ? l = S(this, c, A) : p < 1024 ? l = T(this, c, A) : l = j(this, c, A), l;
    }, i.prototype.mul = function(c) {
      var A = new i(null);
      return A.words = new Array(this.length + c.length), this.mulTo(c, A);
    }, i.prototype.mulf = function(c) {
      var A = new i(null);
      return A.words = new Array(this.length + c.length), j(this, c, A);
    }, i.prototype.imul = function(c) {
      return this.clone().mulTo(c, this);
    }, i.prototype.imuln = function(c) {
      var A = c < 0;
      A && (c = -c), r(typeof c == "number"), r(c < 67108864);
      for (var l = 0, p = 0; p < this.length; p++) {
        var f = (this.words[p] | 0) * c, w = (f & 67108863) + (l & 67108863);
        l >>= 26, l += f / 67108864 | 0, l += w >>> 26, this.words[p] = w & 67108863;
      }
      return l !== 0 && (this.words[p] = l, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(c) {
      return this.clone().imuln(c);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(c) {
      var A = N(c);
      if (A.length === 0)
        return new i(1);
      for (var l = this, p = 0; p < A.length && A[p] === 0; p++, l = l.sqr())
        ;
      if (++p < A.length)
        for (var f = l.sqr(); p < A.length; p++, f = f.sqr())
          A[p] !== 0 && (l = l.mul(f));
      return l;
    }, i.prototype.iushln = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = c % 26, l = (c - A) / 26, p = 67108863 >>> 26 - A << 26 - A, f;
      if (A !== 0) {
        var w = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & p, g = (this.words[f] | 0) - y << A;
          this.words[f] = g | w, w = y >>> 26 - A;
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
    }, i.prototype.ishln = function(c) {
      return r(this.negative === 0), this.iushln(c);
    }, i.prototype.iushrn = function(c, A, l) {
      r(typeof c == "number" && c >= 0);
      var p;
      A ? p = (A - A % 26) / 26 : p = 0;
      var f = c % 26, w = Math.min((c - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, g = l;
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
        this.words[u] = m << 26 - f | Y >>> f, m = Y & y;
      }
      return g && m !== 0 && (g.words[g.length++] = m), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(c, A, l) {
      return r(this.negative === 0), this.iushrn(c, A, l);
    }, i.prototype.shln = function(c) {
      return this.clone().ishln(c);
    }, i.prototype.ushln = function(c) {
      return this.clone().iushln(c);
    }, i.prototype.shrn = function(c) {
      return this.clone().ishrn(c);
    }, i.prototype.ushrn = function(c) {
      return this.clone().iushrn(c);
    }, i.prototype.testn = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = c % 26, l = (c - A) / 26, p = 1 << A;
      if (this.length <= l)
        return !1;
      var f = this.words[l];
      return !!(f & p);
    }, i.prototype.imaskn = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = c % 26, l = (c - A) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (A !== 0 && l++, this.length = Math.min(l, this.length), A !== 0) {
        var p = 67108863 ^ 67108863 >>> A << A;
        this.words[this.length - 1] &= p;
      }
      return this._strip();
    }, i.prototype.maskn = function(c) {
      return this.clone().imaskn(c);
    }, i.prototype.iaddn = function(c) {
      return r(typeof c == "number"), r(c < 67108864), c < 0 ? this.isubn(-c) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= c ? (this.words[0] = c - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(c), this.negative = 1, this) : this._iaddn(c);
    }, i.prototype._iaddn = function(c) {
      this.words[0] += c;
      for (var A = 0; A < this.length && this.words[A] >= 67108864; A++)
        this.words[A] -= 67108864, A === this.length - 1 ? this.words[A + 1] = 1 : this.words[A + 1]++;
      return this.length = Math.max(this.length, A + 1), this;
    }, i.prototype.isubn = function(c) {
      if (r(typeof c == "number"), r(c < 67108864), c < 0)
        return this.iaddn(-c);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(c), this.negative = 1, this;
      if (this.words[0] -= c, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var A = 0; A < this.length && this.words[A] < 0; A++)
          this.words[A] += 67108864, this.words[A + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(c) {
      return this.clone().iaddn(c);
    }, i.prototype.subn = function(c) {
      return this.clone().isubn(c);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(c, A, l) {
      var p = c.length + l, f;
      this._expand(p);
      var w, y = 0;
      for (f = 0; f < c.length; f++) {
        w = (this.words[f + l] | 0) + y;
        var g = (c.words[f] | 0) * A;
        w -= g & 67108863, y = (w >> 26) - (g / 67108864 | 0), this.words[f + l] = w & 67108863;
      }
      for (; f < this.length - l; f++)
        w = (this.words[f + l] | 0) + y, y = w >> 26, this.words[f + l] = w & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        w = -(this.words[f] | 0) + y, y = w >> 26, this.words[f] = w & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(c, A) {
      var l = this.length - c.length, p = this.clone(), f = c, w = f.words[f.length - 1] | 0, y = this._countBits(w);
      l = 26 - y, l !== 0 && (f = f.ushln(l), p.iushln(l), w = f.words[f.length - 1] | 0);
      var g = p.length - f.length, u;
      if (A !== "mod") {
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
      return u && u._strip(), p._strip(), A !== "div" && l !== 0 && p.iushrn(l), {
        div: u || null,
        mod: p
      };
    }, i.prototype.divmod = function(c, A, l) {
      if (r(!c.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var p, f, w;
      return this.negative !== 0 && c.negative === 0 ? (w = this.neg().divmod(c, A), A !== "mod" && (p = w.div.neg()), A !== "div" && (f = w.mod.neg(), l && f.negative !== 0 && f.iadd(c)), {
        div: p,
        mod: f
      }) : this.negative === 0 && c.negative !== 0 ? (w = this.divmod(c.neg(), A), A !== "mod" && (p = w.div.neg()), {
        div: p,
        mod: w.mod
      }) : this.negative & c.negative ? (w = this.neg().divmod(c.neg(), A), A !== "div" && (f = w.mod.neg(), l && f.negative !== 0 && f.isub(c)), {
        div: w.div,
        mod: f
      }) : c.length > this.length || this.cmp(c) < 0 ? {
        div: new i(0),
        mod: this
      } : c.length === 1 ? A === "div" ? {
        div: this.divn(c.words[0]),
        mod: null
      } : A === "mod" ? {
        div: null,
        mod: new i(this.modrn(c.words[0]))
      } : {
        div: this.divn(c.words[0]),
        mod: new i(this.modrn(c.words[0]))
      } : this._wordDiv(c, A);
    }, i.prototype.div = function(c) {
      return this.divmod(c, "div", !1).div;
    }, i.prototype.mod = function(c) {
      return this.divmod(c, "mod", !1).mod;
    }, i.prototype.umod = function(c) {
      return this.divmod(c, "mod", !0).mod;
    }, i.prototype.divRound = function(c) {
      var A = this.divmod(c);
      if (A.mod.isZero())
        return A.div;
      var l = A.div.negative !== 0 ? A.mod.isub(c) : A.mod, p = c.ushrn(1), f = c.andln(1), w = l.cmp(p);
      return w < 0 || f === 1 && w === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
    }, i.prototype.modrn = function(c) {
      var A = c < 0;
      A && (c = -c), r(c <= 67108863);
      for (var l = (1 << 26) % c, p = 0, f = this.length - 1; f >= 0; f--)
        p = (l * p + (this.words[f] | 0)) % c;
      return A ? -p : p;
    }, i.prototype.modn = function(c) {
      return this.modrn(c);
    }, i.prototype.idivn = function(c) {
      var A = c < 0;
      A && (c = -c), r(c <= 67108863);
      for (var l = 0, p = this.length - 1; p >= 0; p--) {
        var f = (this.words[p] | 0) + l * 67108864;
        this.words[p] = f / c | 0, l = f % c;
      }
      return this._strip(), A ? this.ineg() : this;
    }, i.prototype.divn = function(c) {
      return this.clone().idivn(c);
    }, i.prototype.egcd = function(c) {
      r(c.negative === 0), r(!c.isZero());
      var A = this, l = c.clone();
      A.negative !== 0 ? A = A.umod(c) : A = A.clone();
      for (var p = new i(1), f = new i(0), w = new i(0), y = new i(1), g = 0; A.isEven() && l.isEven(); )
        A.iushrn(1), l.iushrn(1), ++g;
      for (var u = l.clone(), m = A.clone(); !A.isZero(); ) {
        for (var Y = 0, V = 1; !(A.words[0] & V) && Y < 26; ++Y, V <<= 1)
          ;
        if (Y > 0)
          for (A.iushrn(Y); Y-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(u), f.isub(m)), p.iushrn(1), f.iushrn(1);
        for (var $ = 0, q = 1; !(l.words[0] & q) && $ < 26; ++$, q <<= 1)
          ;
        if ($ > 0)
          for (l.iushrn($); $-- > 0; )
            (w.isOdd() || y.isOdd()) && (w.iadd(u), y.isub(m)), w.iushrn(1), y.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), p.isub(w), f.isub(y)) : (l.isub(A), w.isub(p), y.isub(f));
      }
      return {
        a: w,
        b: y,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(c) {
      r(c.negative === 0), r(!c.isZero());
      var A = this, l = c.clone();
      A.negative !== 0 ? A = A.umod(c) : A = A.clone();
      for (var p = new i(1), f = new i(0), w = l.clone(); A.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var y = 0, g = 1; !(A.words[0] & g) && y < 26; ++y, g <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            p.isOdd() && p.iadd(w), p.iushrn(1);
        for (var u = 0, m = 1; !(l.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(w), f.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), p.isub(f)) : (l.isub(A), f.isub(p));
      }
      var Y;
      return A.cmpn(1) === 0 ? Y = p : Y = f, Y.cmpn(0) < 0 && Y.iadd(c), Y;
    }, i.prototype.gcd = function(c) {
      if (this.isZero())
        return c.abs();
      if (c.isZero())
        return this.abs();
      var A = this.clone(), l = c.clone();
      A.negative = 0, l.negative = 0;
      for (var p = 0; A.isEven() && l.isEven(); p++)
        A.iushrn(1), l.iushrn(1);
      do {
        for (; A.isEven(); )
          A.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var f = A.cmp(l);
        if (f < 0) {
          var w = A;
          A = l, l = w;
        } else if (f === 0 || l.cmpn(1) === 0)
          break;
        A.isub(l);
      } while (!0);
      return l.iushln(p);
    }, i.prototype.invm = function(c) {
      return this.egcd(c).a.umod(c);
    }, i.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, i.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, i.prototype.andln = function(c) {
      return this.words[0] & c;
    }, i.prototype.bincn = function(c) {
      r(typeof c == "number");
      var A = c % 26, l = (c - A) / 26, p = 1 << A;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= p, this;
      for (var f = p, w = l; f !== 0 && w < this.length; w++) {
        var y = this.words[w] | 0;
        y += f, f = y >>> 26, y &= 67108863, this.words[w] = y;
      }
      return f !== 0 && (this.words[w] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(c) {
      var A = c < 0;
      if (this.negative !== 0 && !A)
        return -1;
      if (this.negative === 0 && A)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        A && (c = -c), r(c <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        l = p === c ? 0 : p < c ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, i.prototype.cmp = function(c) {
      if (this.negative !== 0 && c.negative === 0)
        return -1;
      if (this.negative === 0 && c.negative !== 0)
        return 1;
      var A = this.ucmp(c);
      return this.negative !== 0 ? -A | 0 : A;
    }, i.prototype.ucmp = function(c) {
      if (this.length > c.length)
        return 1;
      if (this.length < c.length)
        return -1;
      for (var A = 0, l = this.length - 1; l >= 0; l--) {
        var p = this.words[l] | 0, f = c.words[l] | 0;
        if (p !== f) {
          p < f ? A = -1 : p > f && (A = 1);
          break;
        }
      }
      return A;
    }, i.prototype.gtn = function(c) {
      return this.cmpn(c) === 1;
    }, i.prototype.gt = function(c) {
      return this.cmp(c) === 1;
    }, i.prototype.gten = function(c) {
      return this.cmpn(c) >= 0;
    }, i.prototype.gte = function(c) {
      return this.cmp(c) >= 0;
    }, i.prototype.ltn = function(c) {
      return this.cmpn(c) === -1;
    }, i.prototype.lt = function(c) {
      return this.cmp(c) === -1;
    }, i.prototype.lten = function(c) {
      return this.cmpn(c) <= 0;
    }, i.prototype.lte = function(c) {
      return this.cmp(c) <= 0;
    }, i.prototype.eqn = function(c) {
      return this.cmpn(c) === 0;
    }, i.prototype.eq = function(c) {
      return this.cmp(c) === 0;
    }, i.red = function(c) {
      return new H(c);
    }, i.prototype.toRed = function(c) {
      return r(!this.red, "Already a number in reduction context"), r(this.negative === 0, "red works only with positives"), c.convertTo(this)._forceRed(c);
    }, i.prototype.fromRed = function() {
      return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, i.prototype._forceRed = function(c) {
      return this.red = c, this;
    }, i.prototype.forceRed = function(c) {
      return r(!this.red, "Already a number in reduction context"), this._forceRed(c);
    }, i.prototype.redAdd = function(c) {
      return r(this.red, "redAdd works only with red numbers"), this.red.add(this, c);
    }, i.prototype.redIAdd = function(c) {
      return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, c);
    }, i.prototype.redSub = function(c) {
      return r(this.red, "redSub works only with red numbers"), this.red.sub(this, c);
    }, i.prototype.redISub = function(c) {
      return r(this.red, "redISub works only with red numbers"), this.red.isub(this, c);
    }, i.prototype.redShl = function(c) {
      return r(this.red, "redShl works only with red numbers"), this.red.shl(this, c);
    }, i.prototype.redMul = function(c) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, c), this.red.mul(this, c);
    }, i.prototype.redIMul = function(c) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, c), this.red.imul(this, c);
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
    }, i.prototype.redPow = function(c) {
      return r(this.red && !c.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, c);
    };
    var M = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function k(B, c) {
      this.name = B, this.p = new i(c, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    k.prototype._tmp = function() {
      var c = new i(null);
      return c.words = new Array(Math.ceil(this.n / 13)), c;
    }, k.prototype.ireduce = function(c) {
      var A = c, l;
      do
        this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), l = A.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : A.ucmp(this.p);
      return p === 0 ? (A.words[0] = 0, A.length = 1) : p > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
    }, k.prototype.split = function(c, A) {
      c.iushrn(this.n, 0, A);
    }, k.prototype.imulK = function(c) {
      return c.imul(this.k);
    };
    function O() {
      k.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(O, k), O.prototype.split = function(c, A) {
      for (var l = 4194303, p = Math.min(c.length, 9), f = 0; f < p; f++)
        A.words[f] = c.words[f];
      if (A.length = p, c.length <= 9) {
        c.words[0] = 0, c.length = 1;
        return;
      }
      var w = c.words[9];
      for (A.words[A.length++] = w & l, f = 10; f < c.length; f++) {
        var y = c.words[f] | 0;
        c.words[f - 10] = (y & l) << 4 | w >>> 22, w = y;
      }
      w >>>= 22, c.words[f - 10] = w, w === 0 && c.length > 10 ? c.length -= 10 : c.length -= 9;
    }, O.prototype.imulK = function(c) {
      c.words[c.length] = 0, c.words[c.length + 1] = 0, c.length += 2;
      for (var A = 0, l = 0; l < c.length; l++) {
        var p = c.words[l] | 0;
        A += p * 977, c.words[l] = A & 67108863, A = p * 64 + (A / 67108864 | 0);
      }
      return c.words[c.length - 1] === 0 && (c.length--, c.words[c.length - 1] === 0 && c.length--), c;
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
    s(U, k), U.prototype.imulK = function(c) {
      for (var A = 0, l = 0; l < c.length; l++) {
        var p = (c.words[l] | 0) * 19 + A, f = p & 67108863;
        p >>>= 26, c.words[l] = f, A = p;
      }
      return A !== 0 && (c.words[c.length++] = A), c;
    }, i._prime = function(c) {
      if (M[c])
        return M[c];
      var A;
      if (c === "k256")
        A = new O();
      else if (c === "p224")
        A = new P();
      else if (c === "p192")
        A = new W();
      else if (c === "p25519")
        A = new U();
      else
        throw new Error("Unknown prime " + c);
      return M[c] = A, A;
    };
    function H(B) {
      if (typeof B == "string") {
        var c = i._prime(B);
        this.m = c.p, this.prime = c;
      } else
        r(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    H.prototype._verify1 = function(c) {
      r(c.negative === 0, "red works only with positives"), r(c.red, "red works only with red numbers");
    }, H.prototype._verify2 = function(c, A) {
      r((c.negative | A.negative) === 0, "red works only with positives"), r(
        c.red && c.red === A.red,
        "red works only with red numbers"
      );
    }, H.prototype.imod = function(c) {
      return this.prime ? this.prime.ireduce(c)._forceRed(this) : (I(c, c.umod(this.m)._forceRed(this)), c);
    }, H.prototype.neg = function(c) {
      return c.isZero() ? c.clone() : this.m.sub(c)._forceRed(this);
    }, H.prototype.add = function(c, A) {
      this._verify2(c, A);
      var l = c.add(A);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, H.prototype.iadd = function(c, A) {
      this._verify2(c, A);
      var l = c.iadd(A);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, H.prototype.sub = function(c, A) {
      this._verify2(c, A);
      var l = c.sub(A);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, H.prototype.isub = function(c, A) {
      this._verify2(c, A);
      var l = c.isub(A);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, H.prototype.shl = function(c, A) {
      return this._verify1(c), this.imod(c.ushln(A));
    }, H.prototype.imul = function(c, A) {
      return this._verify2(c, A), this.imod(c.imul(A));
    }, H.prototype.mul = function(c, A) {
      return this._verify2(c, A), this.imod(c.mul(A));
    }, H.prototype.isqr = function(c) {
      return this.imul(c, c.clone());
    }, H.prototype.sqr = function(c) {
      return this.mul(c, c);
    }, H.prototype.sqrt = function(c) {
      if (c.isZero())
        return c.clone();
      var A = this.m.andln(3);
      if (r(A % 2 === 1), A === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(c, l);
      }
      for (var p = this.m.subn(1), f = 0; !p.isZero() && p.andln(1) === 0; )
        f++, p.iushrn(1);
      r(!p.isZero());
      var w = new i(1).toRed(this), y = w.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var m = this.pow(u, p), Y = this.pow(c, p.addn(1).iushrn(1)), V = this.pow(c, p), $ = f; V.cmp(w) !== 0; ) {
        for (var q = V, te = 0; q.cmp(w) !== 0; te++)
          q = q.redSqr();
        r(te < $);
        var ne = this.pow(m, new i(1).iushln($ - te - 1));
        Y = Y.redMul(ne), m = ne.redSqr(), V = V.redMul(m), $ = te;
      }
      return Y;
    }, H.prototype.invm = function(c) {
      var A = c._invmp(this.m);
      return A.negative !== 0 ? (A.negative = 0, this.imod(A).redNeg()) : this.imod(A);
    }, H.prototype.pow = function(c, A) {
      if (A.isZero())
        return new i(1).toRed(this);
      if (A.cmpn(1) === 0)
        return c.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = c;
      for (var f = 2; f < p.length; f++)
        p[f] = this.mul(p[f - 1], c);
      var w = p[0], y = 0, g = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var m = A.words[f], Y = u - 1; Y >= 0; Y--) {
          var V = m >> Y & 1;
          if (w !== p[0] && (w = this.sqr(w)), V === 0 && y === 0) {
            g = 0;
            continue;
          }
          y <<= 1, y |= V, g++, !(g !== l && (f !== 0 || Y !== 0)) && (w = this.mul(w, p[y]), g = 0, y = 0);
        }
        u = 26;
      }
      return w;
    }, H.prototype.convertTo = function(c) {
      var A = c.umod(this.m);
      return A === c ? A.clone() : A;
    }, H.prototype.convertFrom = function(c) {
      var A = c.clone();
      return A.red = null, A;
    }, i.mont = function(c) {
      return new z(c);
    };
    function z(B) {
      H.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(z, H), z.prototype.convertTo = function(c) {
      return this.imod(c.ushln(this.shift));
    }, z.prototype.convertFrom = function(c) {
      var A = this.imod(c.mul(this.rinv));
      return A.red = null, A;
    }, z.prototype.imul = function(c, A) {
      if (c.isZero() || A.isZero())
        return c.words[0] = 0, c.length = 1, c;
      var l = c.imul(A), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, z.prototype.mul = function(c, A) {
      if (c.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var l = c.mul(A), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, z.prototype.invm = function(c) {
      var A = this.imod(c._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, be);
})(Po);
var W0 = Po.exports;
const is = /* @__PURE__ */ V0(W0);
var vA = 9, FA = 3, uo = 9;
function $0(e, t) {
  const { precision: n = vA, minPrecision: r = FA } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const I = d.match(/.*[1-9]{1}/), E = (I == null ? void 0 : I[0].length) || 0, C = Math.max(r, E);
    d = d.slice(0, C);
  }
  const h = d ? `.${d}` : "";
  return `${a}${h}`;
}
var Uo = class dt extends is {
  constructor(n, r, s) {
    let i = n, o = r;
    dt.isBN(n) ? i = n.toArray() : typeof n == "string" && n.slice(0, 2) === "0x" && (i = n.substring(2), o = r || "hex");
    super(i ?? 0, o, s);
    x(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(n, r) {
    const s = super.toString(n, r);
    return n === 16 || n === "hex" ? `0x${s}` : s;
  }
  toHex(n) {
    const s = (n || 0) * 2;
    if (this.isNeg())
      throw new v(R.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (n && this.byteLength() > n)
      throw new v(
        R.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${n} bytes.`
      );
    return this.toString(16, s);
  }
  toBytes(n) {
    if (this.isNeg())
      throw new v(R.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
    return Uint8Array.from(this.toArray(void 0, n));
  }
  toJSON() {
    return this.toString(16);
  }
  valueOf() {
    return this.toString();
  }
  format(n) {
    const {
      units: r = uo,
      precision: s = vA,
      minPrecision: i = FA
    } = n || {}, o = this.formatUnits(r), a = $0(o, { precision: s, minPrecision: i });
    if (!parseFloat(a)) {
      const [, d = "0"] = o.split("."), h = d.match(/[1-9]/);
      if (h && h.index && h.index + 1 > s) {
        const [I = "0"] = a.split(".");
        return `${I}.${d.slice(0, h.index + 1)}`;
      }
    }
    return a;
  }
  formatUnits(n = uo) {
    const r = this.toString().slice(0, n * -1), s = this.toString().slice(n * -1), i = s.length, o = Array.from({ length: n - i }).fill("0").join("");
    return `${r ? `${r}.` : "0."}${o}${s}`;
  }
  // END ANCHOR: HELPERS
  // ANCHOR: OVERRIDES to accept better inputs
  add(n) {
    return this.caller(n, "add");
  }
  pow(n) {
    return this.caller(n, "pow");
  }
  sub(n) {
    return this.caller(n, "sub");
  }
  div(n) {
    return this.caller(n, "div");
  }
  mul(n) {
    return this.caller(n, "mul");
  }
  mod(n) {
    return this.caller(n, "mod");
  }
  divRound(n) {
    return this.caller(n, "divRound");
  }
  lt(n) {
    return this.caller(n, "lt");
  }
  lte(n) {
    return this.caller(n, "lte");
  }
  gt(n) {
    return this.caller(n, "gt");
  }
  gte(n) {
    return this.caller(n, "gte");
  }
  eq(n) {
    return this.caller(n, "eq");
  }
  cmp(n) {
    return this.caller(n, "cmp");
  }
  // END ANCHOR: OVERRIDES to accept better inputs
  // ANCHOR: OVERRIDES to output our BN type
  sqr() {
    return new dt(super.sqr().toArray());
  }
  neg() {
    return new dt(super.neg().toArray());
  }
  abs() {
    return new dt(super.abs().toArray());
  }
  toTwos(n) {
    return new dt(super.toTwos(n).toArray());
  }
  fromTwos(n) {
    return new dt(super.fromTwos(n).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(n, r) {
    const s = super[r](new dt(n));
    return dt.isBN(s) ? new dt(s.toArray()) : s;
  }
  clone() {
    return new dt(this.toArray());
  }
  mulTo(n, r) {
    const s = new is(this.toArray()).mulTo(n, r);
    return new dt(s.toArray());
  }
  egcd(n) {
    const { a: r, b: s, gcd: i } = new is(this.toArray()).egcd(n);
    return {
      a: new dt(r.toArray()),
      b: new dt(s.toArray()),
      gcd: new dt(i.toArray())
    };
  }
  divmod(n, r, s) {
    const { div: i, mod: o } = new is(this.toArray()).divmod(new dt(n), r, s);
    return {
      div: new dt(i == null ? void 0 : i.toArray()),
      mod: new dt(o == null ? void 0 : o.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new dt(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new dt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Q = (e, t, n) => new Uo(e, t, n);
Q.parseUnits = (e, t = uo) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      R.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const a = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(a);
};
function kt(e) {
  return Q(e).toNumber();
}
function Go(e, t) {
  return Q(e).toHex(t);
}
function Ut(e, t) {
  return Q(e).toBytes(t);
}
function Qy(e, t) {
  return Q(e).formatUnits(t);
}
function xy(e, t) {
  return Q(e).format(t);
}
function K0(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function vy(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
const z0 = "6.7.1";
function el(e, t, n) {
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
function ti(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && el(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Hn(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(Hn).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return Hn(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${Hn(n)}: ${Hn(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function tl(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${Hn(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + Hn(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${z0}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return ti(r, { code: t }), n && Object.assign(r, n), r;
}
function wr(e, t, n, r) {
  if (!e)
    throw tl(t, n, r);
}
function Qe(e, t, n, r) {
  wr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const nl = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function rl(e) {
  wr(nl.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function sl(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  Qe(!1, "invalid BytesLike value", t || "value", e);
}
function Gt(e, t) {
  return sl(e, t, !1);
}
function il(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const qa = "0123456789abcdef";
function Yr(e) {
  const t = Gt(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += qa[(s & 240) >> 4] + qa[s & 15];
  }
  return n;
}
function Ho(e, t, n) {
  const r = Gt(e);
  return n != null && n > r.length && wr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), Yr(r.slice(t ?? 0, n ?? r.length));
}
const ol = BigInt(0);
BigInt(1);
const Jn = 9007199254740991;
function Dn(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return Qe(Number.isInteger(e), "underflow", t || "value", e), Qe(e >= -Jn && e <= Jn, "overflow", t || "value", e), BigInt(e);
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return e[0] === "-" && e[1] !== "-" ? -BigInt(e.substring(1)) : BigInt(e);
      } catch (n) {
        Qe(!1, `invalid BigNumberish string: ${n.message}`, t || "value", e);
      }
  }
  Qe(!1, "invalid BigNumberish value", t || "value", e);
}
function al(e, t) {
  const n = Dn(e, t);
  return wr(n >= ol, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const Wa = "0123456789abcdef";
function cl(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += Wa[n >> 4], t += Wa[n & 15];
    return BigInt(t);
  }
  return Dn(e);
}
function DA(e, t) {
  switch (typeof e) {
    case "bigint":
      return Qe(e >= -Jn && e <= Jn, "overflow", t || "value", e), Number(e);
    case "number":
      return Qe(Number.isInteger(e), "underflow", t || "value", e), Qe(e >= -Jn && e <= Jn, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return DA(BigInt(e), t);
      } catch (n) {
        Qe(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  Qe(!1, "invalid numeric value", t || "value", e);
}
function Al(e, t) {
  let r = al(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = DA(t, "width");
    for (wr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const lo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let os = null;
function ul(e) {
  if (os == null) {
    os = {};
    for (let n = 0; n < lo.length; n++)
      os[lo[n]] = BigInt(n);
  }
  const t = os[e];
  return Qe(t != null, "invalid base58 value", "letter", e), t;
}
const dl = BigInt(0), ho = BigInt(58);
function RA(e) {
  let t = cl(Gt(e)), n = "";
  for (; t; )
    n = lo[Number(t % ho)] + n, t /= ho;
  return n;
}
function ll(e) {
  let t = dl;
  for (let n = 0; n < e.length; n++)
    t *= ho, t += ul(e[n]);
  return t;
}
function hl(e, t, n, r, s) {
  Qe(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function NA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function fl(e, t, n, r, s) {
  return e === "OVERLONG" ? (Qe(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), NA(e, t, n));
}
const gl = Object.freeze({
  error: hl,
  ignore: NA,
  replace: fl
});
function pl(e, t) {
  t == null && (t = gl.error);
  const n = Gt(e, "bytes"), r = [];
  let s = 0;
  for (; s < n.length; ) {
    const i = n[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let o = null, a = null;
    if ((i & 224) === 192)
      o = 1, a = 127;
    else if ((i & 240) === 224)
      o = 2, a = 2047;
    else if ((i & 248) === 240)
      o = 3, a = 65535;
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
      let I = n[s];
      if ((I & 192) != 128) {
        s += t("MISSING_CONTINUE", s, n, r), d = null;
        break;
      }
      d = d << 6 | I & 63, s++;
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
      if (d <= a) {
        s += t("OVERLONG", s - 1 - o, n, r, d);
        continue;
      }
      r.push(d);
    }
  }
  return r;
}
function ni(e, t) {
  t != null && (rl(t), e = e.normalize(t));
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
      Qe(r < e.length && (i & 64512) === 56320, "invalid surrogate pair", "str", e);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function ml(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function ri(e, t) {
  return ml(pl(e, t));
}
function fo(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function wl(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function SA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function El(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  fo(e.outputLen), fo(e.blockLen);
}
function Il(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function yl(e, t) {
  SA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const wt = {
  number: fo,
  bool: wl,
  bytes: SA,
  hash: El,
  exists: Il,
  output: yl
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Bl = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), ps = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Jt = (e, t) => e << 32 - t | e >>> t, Cl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Cl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function bl(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function Mn(e) {
  if (typeof e == "string" && (e = bl(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let xs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Ql = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function xl(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Ql(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function Er(e) {
  const t = (r) => e().update(Mn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function vl(e) {
  const t = (r, s) => e(s).update(Mn(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let _A = class extends xs {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, wt.hash(t);
    const r = Mn(n);
    if (this.iHash = t.create(), !(this.iHash instanceof xs))
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
    return wt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    wt.exists(this), wt.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: a } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const Jo = (e, t, n) => new _A(e, t).update(n).digest();
Jo.create = (e, t) => new _A(e, t);
function Fl(e, t, n, r) {
  wt.hash(e);
  const s = xl({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: a } = s;
  if (wt.number(i), wt.number(o), wt.number(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Mn(t), h = Mn(n), I = new Uint8Array(o), E = Jo.create(e, d), C = E._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: a, DK: I, PRF: E, PRFSalt: C };
}
function Dl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Rl(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: d } = Fl(e, t, n, r);
  let h;
  const I = new Uint8Array(4), E = ps(I), C = new Uint8Array(a.outputLen);
  for (let D = 1, F = 0; F < i; D++, F += a.outputLen) {
    const b = o.subarray(F, F + a.outputLen);
    E.setInt32(0, D, !1), (h = d._cloneInto(h)).update(I).digestInto(C), b.set(C.subarray(0, b.length));
    for (let N = 1; N < s; N++) {
      a._cloneInto(h).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Dl(a, d, o, h, C);
}
function Nl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, a, r);
}
let Zo = class extends xs {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ps(this.buffer);
  }
  update(t) {
    wt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Mn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const d = ps(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    wt.exists(this), wt.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    Nl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = ps(t);
    this.get().forEach((d, h) => a.setUint32(4 * h, d, i));
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: a } = this;
    return t.length = s, t.pos = a, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
};
const Sl = (e, t, n) => e & t ^ ~e & n, _l = (e, t, n) => e & t ^ e & n ^ t & n, kl = new Uint32Array([
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
]), rn = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), sn = new Uint32Array(64);
let Ml = class extends Zo {
  constructor() {
    super(64, 32, 8, !1), this.A = rn[0] | 0, this.B = rn[1] | 0, this.C = rn[2] | 0, this.D = rn[3] | 0, this.E = rn[4] | 0, this.F = rn[5] | 0, this.G = rn[6] | 0, this.H = rn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: a, H: d } = this;
    return [t, n, r, s, i, o, a, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, a, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let E = 0; E < 16; E++, n += 4)
      sn[E] = t.getUint32(n, !1);
    for (let E = 16; E < 64; E++) {
      const C = sn[E - 15], D = sn[E - 2], F = Jt(C, 7) ^ Jt(C, 18) ^ C >>> 3, b = Jt(D, 17) ^ Jt(D, 19) ^ D >>> 10;
      sn[E] = b + sn[E - 7] + F + sn[E - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: d, G: h, H: I } = this;
    for (let E = 0; E < 64; E++) {
      const C = Jt(a, 6) ^ Jt(a, 11) ^ Jt(a, 25), D = I + C + Sl(a, d, h) + kl[E] + sn[E] | 0, b = (Jt(r, 2) ^ Jt(r, 13) ^ Jt(r, 22)) + _l(r, s, i) | 0;
      I = h, h = d, d = a, a = o + D | 0, o = i, i = s, s = r, r = D + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, a, d, h, I);
  }
  roundClean() {
    sn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const kA = Er(() => new Ml()), as = BigInt(2 ** 32 - 1), go = BigInt(32);
function MA(e, t = !1) {
  return t ? { h: Number(e & as), l: Number(e >> go & as) } : { h: Number(e >> go & as) | 0, l: Number(e & as) | 0 };
}
function Ol(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = MA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Ll = (e, t) => BigInt(e >>> 0) << go | BigInt(t >>> 0), Tl = (e, t, n) => e >>> n, Pl = (e, t, n) => e << 32 - n | t >>> n, Ul = (e, t, n) => e >>> n | t << 32 - n, Gl = (e, t, n) => e << 32 - n | t >>> n, Hl = (e, t, n) => e << 64 - n | t >>> n - 32, Jl = (e, t, n) => e >>> n - 32 | t << 64 - n, Zl = (e, t) => t, Yl = (e, t) => e, Vl = (e, t, n) => e << n | t >>> 32 - n, Xl = (e, t, n) => t << n | e >>> 32 - n, jl = (e, t, n) => t << n - 32 | e >>> 64 - n, ql = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Wl(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const $l = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Kl = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, zl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), eh = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, th = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), nh = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, ue = {
  fromBig: MA,
  split: Ol,
  toBig: Ll,
  shrSH: Tl,
  shrSL: Pl,
  rotrSH: Ul,
  rotrSL: Gl,
  rotrBH: Hl,
  rotrBL: Jl,
  rotr32H: Zl,
  rotr32L: Yl,
  rotlSH: Vl,
  rotlSL: Xl,
  rotlBH: jl,
  rotlBL: ql,
  add: Wl,
  add3L: $l,
  add3H: Kl,
  add4L: zl,
  add4H: eh,
  add5H: nh,
  add5L: th
}, [rh, sh] = ue.split([
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
].map((e) => BigInt(e))), on = new Uint32Array(80), an = new Uint32Array(80);
class Yo extends Zo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: a, Dl: d, Eh: h, El: I, Fh: E, Fl: C, Gh: D, Gl: F, Hh: b, Hl: N } = this;
    return [t, n, r, s, i, o, a, d, h, I, E, C, D, F, b, N];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, a, d, h, I, E, C, D, F, b, N) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = d | 0, this.Eh = h | 0, this.El = I | 0, this.Fh = E | 0, this.Fl = C | 0, this.Gh = D | 0, this.Gl = F | 0, this.Hh = b | 0, this.Hl = N | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      on[T] = t.getUint32(n), an[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = on[T - 15] | 0, M = an[T - 15] | 0, k = ue.rotrSH(j, M, 1) ^ ue.rotrSH(j, M, 8) ^ ue.shrSH(j, M, 7), O = ue.rotrSL(j, M, 1) ^ ue.rotrSL(j, M, 8) ^ ue.shrSL(j, M, 7), P = on[T - 2] | 0, W = an[T - 2] | 0, U = ue.rotrSH(P, W, 19) ^ ue.rotrBH(P, W, 61) ^ ue.shrSH(P, W, 6), H = ue.rotrSL(P, W, 19) ^ ue.rotrBL(P, W, 61) ^ ue.shrSL(P, W, 6), z = ue.add4L(O, H, an[T - 7], an[T - 16]), B = ue.add4H(z, k, U, on[T - 7], on[T - 16]);
      on[T] = B | 0, an[T] = z | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: a, Cl: d, Dh: h, Dl: I, Eh: E, El: C, Fh: D, Fl: F, Gh: b, Gl: N, Hh: S, Hl: Z } = this;
    for (let T = 0; T < 80; T++) {
      const j = ue.rotrSH(E, C, 14) ^ ue.rotrSH(E, C, 18) ^ ue.rotrBH(E, C, 41), M = ue.rotrSL(E, C, 14) ^ ue.rotrSL(E, C, 18) ^ ue.rotrBL(E, C, 41), k = E & D ^ ~E & b, O = C & F ^ ~C & N, P = ue.add5L(Z, M, O, sh[T], an[T]), W = ue.add5H(P, S, j, k, rh[T], on[T]), U = P | 0, H = ue.rotrSH(r, s, 28) ^ ue.rotrBH(r, s, 34) ^ ue.rotrBH(r, s, 39), z = ue.rotrSL(r, s, 28) ^ ue.rotrBL(r, s, 34) ^ ue.rotrBL(r, s, 39), B = r & i ^ r & a ^ i & a, c = s & o ^ s & d ^ o & d;
      S = b | 0, Z = N | 0, b = D | 0, N = F | 0, D = E | 0, F = C | 0, { h: E, l: C } = ue.add(h | 0, I | 0, W | 0, U | 0), h = a | 0, I = d | 0, a = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = ue.add3L(U, z, c);
      r = ue.add3H(A, W, H, B), s = A | 0;
    }
    ({ h: r, l: s } = ue.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = ue.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: d } = ue.add(this.Ch | 0, this.Cl | 0, a | 0, d | 0), { h, l: I } = ue.add(this.Dh | 0, this.Dl | 0, h | 0, I | 0), { h: E, l: C } = ue.add(this.Eh | 0, this.El | 0, E | 0, C | 0), { h: D, l: F } = ue.add(this.Fh | 0, this.Fl | 0, D | 0, F | 0), { h: b, l: N } = ue.add(this.Gh | 0, this.Gl | 0, b | 0, N | 0), { h: S, l: Z } = ue.add(this.Hh | 0, this.Hl | 0, S | 0, Z | 0), this.set(r, s, i, o, a, d, h, I, E, C, D, F, b, N, S, Z);
  }
  roundClean() {
    on.fill(0), an.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class ih extends Yo {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class oh extends Yo {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const OA = Er(() => new Yo());
Er(() => new ih());
Er(() => new oh());
function ah() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const $a = ah();
$a.crypto || $a.msCrypto;
function ch(e, t) {
  const n = { sha256: kA, sha512: OA }[e];
  return Qe(n != null, "invalid hmac algorithm", "algorithm", e), Jo.create(n, t);
}
function Ah(e, t, n, r, s) {
  const i = { sha256: kA, sha512: OA }[s];
  return Qe(i != null, "invalid pbkdf2 algorithm", "algorithm", s), Rl(i, e, t, { c: n, dkLen: r });
}
let LA = !1;
const TA = function(e, t, n) {
  return ch(e, t).update(n).digest();
};
let PA = TA;
function Ir(e, t, n) {
  const r = Gt(t, "key"), s = Gt(n, "data");
  return Yr(PA(e, r, s));
}
Ir._ = TA;
Ir.lock = function() {
  LA = !0;
};
Ir.register = function(e) {
  if (LA)
    throw new Error("computeHmac is locked");
  PA = e;
};
Object.freeze(Ir);
const [UA, GA, HA] = [[], [], []], uh = BigInt(0), br = BigInt(1), dh = BigInt(2), lh = BigInt(7), hh = BigInt(256), fh = BigInt(113);
for (let e = 0, t = br, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], UA.push(2 * (5 * r + n)), GA.push((e + 1) * (e + 2) / 2 % 64);
  let s = uh;
  for (let i = 0; i < 7; i++)
    t = (t << br ^ (t >> lh) * fh) % hh, t & dh && (s ^= br << (br << BigInt(i)) - br);
  HA.push(s);
}
const [gh, ph] = ue.split(HA, !0), Ka = (e, t, n) => n > 32 ? ue.rotlBH(e, t, n) : ue.rotlSH(e, t, n), za = (e, t, n) => n > 32 ? ue.rotlBL(e, t, n) : ue.rotlSL(e, t, n);
function mh(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, d = (o + 2) % 10, h = n[d], I = n[d + 1], E = Ka(h, I, 1) ^ n[a], C = za(h, I, 1) ^ n[a + 1];
      for (let D = 0; D < 50; D += 10)
        e[o + D] ^= E, e[o + D + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = GA[o], d = Ka(s, i, a), h = za(s, i, a), I = UA[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        n[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    e[0] ^= gh[r], e[1] ^= ph[r];
  }
  n.fill(0);
}
let JA = class ZA extends xs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, wt.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Bl(this.state);
  }
  keccak() {
    mh(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    wt.exists(this);
    const { blockLen: n, state: r } = this;
    t = Mn(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let a = 0; a < o; a++)
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
    wt.exists(this, !1), wt.bytes(t), this.finish();
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
    return wt.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (wt.output(t, this), this.finished)
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
    return t || (t = new ZA(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const Qn = (e, t, n) => Er(() => new JA(t, e, n));
Qn(6, 144, 224 / 8);
Qn(6, 136, 256 / 8);
Qn(6, 104, 384 / 8);
Qn(6, 72, 512 / 8);
Qn(1, 144, 224 / 8);
const wh = Qn(1, 136, 256 / 8);
Qn(1, 104, 384 / 8);
Qn(1, 72, 512 / 8);
const YA = (e, t, n) => vl((r = {}) => new JA(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
YA(31, 168, 128 / 8);
YA(31, 136, 256 / 8);
let VA = !1;
const XA = function(e) {
  return wh(e);
};
let jA = XA;
function Vr(e) {
  const t = Gt(e, "data");
  return Yr(jA(t));
}
Vr._ = XA;
Vr.lock = function() {
  VA = !0;
};
Vr.register = function(e) {
  if (VA)
    throw new TypeError("keccak256 is locked");
  jA = e;
};
Object.freeze(Vr);
const Eh = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), qA = Uint8Array.from({ length: 16 }, (e, t) => t), Ih = qA.map((e) => (9 * e + 5) % 16);
let Vo = [qA], Xo = [Ih];
for (let e = 0; e < 4; e++)
  for (let t of [Vo, Xo])
    t.push(t[e].map((n) => Eh[n]));
const WA = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), yh = Vo.map((e, t) => e.map((n) => WA[t][n])), Bh = Xo.map((e, t) => e.map((n) => WA[t][n])), Ch = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), bh = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), cs = (e, t) => e << t | e >>> 32 - t;
function ec(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const As = new Uint32Array(16);
class Qh extends Zo {
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
    for (let D = 0; D < 16; D++, n += 4)
      As[D] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, a = this.h2 | 0, d = a, h = this.h3 | 0, I = h, E = this.h4 | 0, C = E;
    for (let D = 0; D < 5; D++) {
      const F = 4 - D, b = Ch[D], N = bh[D], S = Vo[D], Z = Xo[D], T = yh[D], j = Bh[D];
      for (let M = 0; M < 16; M++) {
        const k = cs(r + ec(D, i, a, h) + As[S[M]] + b, T[M]) + E | 0;
        r = E, E = h, h = cs(a, 10) | 0, a = i, i = k;
      }
      for (let M = 0; M < 16; M++) {
        const k = cs(s + ec(F, o, d, I) + As[Z[M]] + N, j[M]) + C | 0;
        s = C, C = I, I = cs(d, 10) | 0, d = o, o = k;
      }
    }
    this.set(this.h1 + a + I | 0, this.h2 + h + C | 0, this.h3 + E + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    As.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const xh = Er(() => new Qh());
let $A = !1;
const KA = function(e) {
  return xh(e);
};
let zA = KA;
function Xr(e) {
  const t = Gt(e, "data");
  return Yr(zA(t));
}
Xr._ = KA;
Xr.lock = function() {
  $A = !0;
};
Xr.register = function(e) {
  if ($A)
    throw new TypeError("ripemd160 is locked");
  zA = e;
};
Object.freeze(Xr);
let eu = !1;
const tu = function(e, t, n, r, s) {
  return Ah(e, t, n, r, s);
};
let nu = tu;
function yr(e, t, n, r, s) {
  const i = Gt(e, "password"), o = Gt(t, "salt");
  return Yr(nu(i, o, n, r, s));
}
yr._ = tu;
yr.lock = function() {
  eu = !0;
};
yr.register = function(e) {
  if (eu)
    throw new Error("pbkdf2 is locked");
  nu = e;
};
Object.freeze(yr);
const vh = BigInt(0), Fh = BigInt(36);
function tc(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Gt(Vr(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const jo = {};
for (let e = 0; e < 10; e++)
  jo[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  jo[String.fromCharCode(65 + e)] = String(10 + e);
const nc = 15;
function Dh(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => jo[r]).join("");
  for (; t.length >= nc; ) {
    let r = t.substring(0, nc);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const Rh = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function Nh(e) {
  e = e.toLowerCase();
  let t = vh;
  for (let n = 0; n < e.length; n++)
    t = t * Fh + Rh[e[n]];
  return t;
}
function Sh(e) {
  if (Qe(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = tc(e);
    return Qe(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Qe(e.substring(2, 4) === Dh(e), "bad icap checksum", "address", e);
    let t = Nh(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return tc("0x" + t);
  }
  Qe(!1, "invalid address", "address", e);
}
function Pi(e, t) {
  return {
    address: Sh(e),
    storageKeys: t.map((n, r) => (Qe(il(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function _h(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Qe(n.length === 2, "invalid slot set", `value[${r}]`, n), Pi(n[0], n[1])) : (Qe(n != null && typeof n == "object", "invalid address-slot set", "value", e), Pi(n.address, n.storageKeys)));
  Qe(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return Pi(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const kh = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
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
    x(this, "name");
    ti(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new jr(this.name);
  }
}
class si extends jr {
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
    x(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    x(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    x(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    x(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    x(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    x(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    x(this, "txAccessListAddress");
    const s = { effectiveBlock: n };
    function i(o, a) {
      let d = (r || {})[o];
      d == null && (d = a), Qe(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), ti(this, s);
  }
  clone() {
    return new si(this.effectiveBlock, this);
  }
}
class ii extends jr {
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
    x(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    x(this, "targetNetwork");
    ti(this, {
      address: n || kh,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new ii(this.address, this.targetNetwork);
  }
}
var Hr, Jr;
class ru extends jr {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    Be(this, Hr, void 0);
    Be(this, Jr, void 0);
    ve(this, Hr, n), ve(this, Jr, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return ie(this, Hr);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return ie(this, Jr);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Hr = new WeakMap(), Jr = new WeakMap();
const Ui = /* @__PURE__ */ new Map();
var tr, nr, hn;
const jn = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    Be(this, tr, void 0);
    Be(this, nr, void 0);
    Be(this, hn, void 0);
    ve(this, tr, t), ve(this, nr, Dn(n)), ve(this, hn, /* @__PURE__ */ new Map());
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
    return ie(this, tr);
  }
  set name(t) {
    ve(this, tr, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return ie(this, nr);
  }
  set chainId(t) {
    ve(this, nr, Dn(t, "chainId"));
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
        return this.chainId === Dn(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === Dn(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === Dn(t.chainId);
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
    return Array.from(ie(this, hn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (ie(this, hn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return ie(this, hn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return ie(this, hn).get(t) || null;
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
    const t = new jn(this.name, this.chainId);
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new si();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = _h(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (Oh(), t == null)
      return jn.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = Ui.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new jn("unknown", t);
      Qe(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Qe(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new jn(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new ii(t.ensAddress, t.ensNetwork)), n;
    }
    Qe(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = Ui.get(t);
    r && Qe(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), Ui.set(t, n);
  }
};
let Nn = jn;
tr = new WeakMap(), nr = new WeakMap(), hn = new WeakMap();
function rc(e, t) {
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
function sc(e) {
  return new ru(e, async (t, n, r) => {
    r.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, o] = await Promise.all([
        r.send(),
        t()
      ]);
      s = i;
      const a = s.bodyJson.standard;
      return {
        gasPrice: o.gasPrice,
        maxFeePerGas: rc(a.maxFee, 9),
        maxPriorityFeePerGas: rc(a.maxPriorityFee, 9)
      };
    } catch (i) {
      wr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function Mh(e) {
  return new ru("data:", async (t, n, r) => {
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
let ic = !1;
function Oh() {
  if (ic)
    return;
  ic = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Nn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new ii(null, r.ensNetwork)), i.attachPlugin(new si()), (r.plugins || []).forEach((o) => {
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
      sc("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      sc("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      Mh(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
function Dt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Lh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function qo(e, ...t) {
  if (!Lh(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function su(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Dt(e.outputLen), Dt(e.blockLen);
}
function Ar(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function iu(e, t) {
  qo(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Gi = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ms = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function ou(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ws = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Zt = (e, t) => e << 32 - t | e >>> t, Th = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Th)
  throw new Error("Non little-endian hardware is not supported");
function Ph(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ur(e) {
  if (typeof e == "string" && (e = Ph(e)), !ou(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function Uh(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!ou(s))
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
class Wo {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const Gh = {}.toString;
function au(e, t) {
  if (t !== void 0 && Gh.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function cu(e) {
  const t = (r) => e().update(ur(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Hh(e = 32) {
  if (Gi && typeof Gi.getRandomValues == "function")
    return Gi.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function Jh(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, a, r);
}
class Zh extends Wo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ws(this.buffer);
  }
  update(t) {
    Ar(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = ur(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const d = ws(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Ar(this), iu(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let E = o; E < s; E++)
      n[E] = 0;
    Jh(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = ws(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, I = this.get();
    if (h > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let E = 0; E < h; E++)
      a.setUint32(4 * E, I[E], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: a } = this;
    return t.length = s, t.pos = a, t.finished = i, t.destroyed = o, s % n && t.buffer.set(r), t;
  }
}
const Yh = (e, t, n) => e & t ^ ~e & n, Vh = (e, t, n) => e & t ^ e & n ^ t & n, Xh = /* @__PURE__ */ new Uint32Array([
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
]), cn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), An = /* @__PURE__ */ new Uint32Array(64);
class jh extends Zh {
  constructor() {
    super(64, 32, 8, !1), this.A = cn[0] | 0, this.B = cn[1] | 0, this.C = cn[2] | 0, this.D = cn[3] | 0, this.E = cn[4] | 0, this.F = cn[5] | 0, this.G = cn[6] | 0, this.H = cn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: a, H: d } = this;
    return [t, n, r, s, i, o, a, d];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, a, d) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = d | 0;
  }
  process(t, n) {
    for (let E = 0; E < 16; E++, n += 4)
      An[E] = t.getUint32(n, !1);
    for (let E = 16; E < 64; E++) {
      const C = An[E - 15], D = An[E - 2], F = Zt(C, 7) ^ Zt(C, 18) ^ C >>> 3, b = Zt(D, 17) ^ Zt(D, 19) ^ D >>> 10;
      An[E] = b + An[E - 7] + F + An[E - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: d, G: h, H: I } = this;
    for (let E = 0; E < 64; E++) {
      const C = Zt(a, 6) ^ Zt(a, 11) ^ Zt(a, 25), D = I + C + Yh(a, d, h) + Xh[E] + An[E] | 0, b = (Zt(r, 2) ^ Zt(r, 13) ^ Zt(r, 22)) + Vh(r, s, i) | 0;
      I = h, h = d, d = a, a = o + D | 0, o = i, i = s, s = r, r = D + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, a, d, h, I);
  }
  roundClean() {
    An.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const qr = /* @__PURE__ */ cu(() => new jh());
class Au extends Wo {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, su(t);
    const r = ur(n);
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
    return Ar(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Ar(this), qo(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: a } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const $o = (e, t, n) => new Au(e, t).update(n).digest();
$o.create = (e, t) => new Au(e, t);
function qh(e, t, n, r) {
  su(e);
  const s = au({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: a } = s;
  if (Dt(i), Dt(o), Dt(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = ur(t), h = ur(n), I = new Uint8Array(o), E = $o.create(e, d), C = E._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: a, DK: I, PRF: E, PRFSalt: C };
}
function Wh(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function uu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: d } = qh(e, t, n, r);
  let h;
  const I = new Uint8Array(4), E = ws(I), C = new Uint8Array(a.outputLen);
  for (let D = 1, F = 0; F < i; D++, F += a.outputLen) {
    const b = o.subarray(F, F + a.outputLen);
    E.setInt32(0, D, !1), (h = d._cloneInto(h)).update(I).digestInto(C), b.set(C.subarray(0, b.length));
    for (let N = 1; N < s; N++) {
      a._cloneInto(h).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Wh(a, d, o, h, C);
}
const we = (e, t) => e << t | e >>> 32 - t;
function oc(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], a = e[t++] ^ n[r++], d = e[t++] ^ n[r++], h = e[t++] ^ n[r++], I = e[t++] ^ n[r++], E = e[t++] ^ n[r++], C = e[t++] ^ n[r++], D = e[t++] ^ n[r++], F = e[t++] ^ n[r++], b = e[t++] ^ n[r++], N = e[t++] ^ n[r++], S = e[t++] ^ n[r++], Z = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], M = e[t++] ^ n[r++], k = o, O = a, P = d, W = h, U = I, H = E, z = C, B = D, c = F, A = b, l = N, p = S, f = Z, w = T, y = j, g = M;
  for (let u = 0; u < 8; u += 2)
    U ^= we(k + f | 0, 7), c ^= we(U + k | 0, 9), f ^= we(c + U | 0, 13), k ^= we(f + c | 0, 18), A ^= we(H + O | 0, 7), w ^= we(A + H | 0, 9), O ^= we(w + A | 0, 13), H ^= we(O + w | 0, 18), y ^= we(l + z | 0, 7), P ^= we(y + l | 0, 9), z ^= we(P + y | 0, 13), l ^= we(z + P | 0, 18), W ^= we(g + p | 0, 7), B ^= we(W + g | 0, 9), p ^= we(B + W | 0, 13), g ^= we(p + B | 0, 18), O ^= we(k + W | 0, 7), P ^= we(O + k | 0, 9), W ^= we(P + O | 0, 13), k ^= we(W + P | 0, 18), z ^= we(H + U | 0, 7), B ^= we(z + H | 0, 9), U ^= we(B + z | 0, 13), H ^= we(U + B | 0, 18), p ^= we(l + A | 0, 7), c ^= we(p + l | 0, 9), A ^= we(c + p | 0, 13), l ^= we(A + c | 0, 18), f ^= we(g + y | 0, 7), w ^= we(f + g | 0, 9), y ^= we(w + f | 0, 13), g ^= we(y + w | 0, 18);
  s[i++] = o + k | 0, s[i++] = a + O | 0, s[i++] = d + P | 0, s[i++] = h + W | 0, s[i++] = I + U | 0, s[i++] = E + H | 0, s[i++] = C + z | 0, s[i++] = D + B | 0, s[i++] = F + c | 0, s[i++] = b + A | 0, s[i++] = N + l | 0, s[i++] = S + p | 0, s[i++] = Z + f | 0, s[i++] = T + w | 0, s[i++] = j + y | 0, s[i++] = M + g | 0;
}
function Hi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let a = 0; a < 16; a++)
    n[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    oc(n, o, e, t, n, i), a > 0 && (o += 16), oc(n, i, e, t += 16, n, o);
}
function $h(e, t, n) {
  const r = au({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: a, asyncTick: d, maxmem: h, onProgress: I } = r;
  if (Dt(s), Dt(i), Dt(o), Dt(a), Dt(d), Dt(h), I !== void 0 && typeof I != "function")
    throw new Error("progressCb should be function");
  const E = 128 * i, C = E / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (E / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / E)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const D = E * (s + o);
  if (D > h)
    throw new Error(`Scrypt: parameters too large, ${D} (128 * r * (N + p)) > ${h} (maxmem)`);
  const F = uu(qr, e, t, { c: 1, dkLen: E * o }), b = ms(F), N = ms(new Uint8Array(E * s)), S = ms(new Uint8Array(E));
  let Z = () => {
  };
  if (I) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let M = 0;
    Z = () => {
      M++, I && (!(M % j) || M === T) && I(M / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: C, V: N, B32: b, B: F, tmp: S, blockMixCb: Z, asyncTick: d };
}
function Kh(e, t, n, r, s) {
  const i = uu(qr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function zh(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: a, V: d, B32: h, B: I, tmp: E, blockMixCb: C } = $h(e, t, n);
  for (let D = 0; D < i; D++) {
    const F = a * D;
    for (let b = 0; b < a; b++)
      d[b] = h[F + b];
    for (let b = 0, N = 0; b < r - 1; b++)
      Hi(d, N, d, N += a, s), C();
    Hi(d, (r - 1) * a, h, F, s), C();
    for (let b = 0; b < r; b++) {
      const N = h[F + a - 16] % r;
      for (let S = 0; S < a; S++)
        E[S] = h[F + S] ^ d[N * a + S];
      Hi(E, 0, h, F, s), C();
    }
  }
  return Kh(e, o, I, d, E);
}
const us = /* @__PURE__ */ BigInt(2 ** 32 - 1), ac = /* @__PURE__ */ BigInt(32);
function ef(e, t = !1) {
  return t ? { h: Number(e & us), l: Number(e >> ac & us) } : { h: Number(e >> ac & us) | 0, l: Number(e & us) | 0 };
}
function tf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = ef(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const nf = (e, t, n) => e << n | t >>> 32 - n, rf = (e, t, n) => t << n | e >>> 32 - n, sf = (e, t, n) => t << n - 32 | e >>> 64 - n, of = (e, t, n) => e << n - 32 | t >>> 64 - n, [du, lu, hu] = [[], [], []], af = /* @__PURE__ */ BigInt(0), Qr = /* @__PURE__ */ BigInt(1), cf = /* @__PURE__ */ BigInt(2), Af = /* @__PURE__ */ BigInt(7), uf = /* @__PURE__ */ BigInt(256), df = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = Qr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], du.push(2 * (5 * r + n)), lu.push((e + 1) * (e + 2) / 2 % 64);
  let s = af;
  for (let i = 0; i < 7; i++)
    t = (t << Qr ^ (t >> Af) * df) % uf, t & cf && (s ^= Qr << (Qr << /* @__PURE__ */ BigInt(i)) - Qr);
  hu.push(s);
}
const [lf, hf] = /* @__PURE__ */ tf(hu, !0), cc = (e, t, n) => n > 32 ? sf(e, t, n) : nf(e, t, n), Ac = (e, t, n) => n > 32 ? of(e, t, n) : rf(e, t, n);
function ff(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, d = (o + 2) % 10, h = n[d], I = n[d + 1], E = cc(h, I, 1) ^ n[a], C = Ac(h, I, 1) ^ n[a + 1];
      for (let D = 0; D < 50; D += 10)
        e[o + D] ^= E, e[o + D + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = lu[o], d = cc(s, i, a), h = Ac(s, i, a), I = du[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        n[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    e[0] ^= lf[r], e[1] ^= hf[r];
  }
  n.fill(0);
}
class Ko extends Wo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Dt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ms(this.state);
  }
  keccak() {
    ff(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Ar(this);
    const { blockLen: n, state: r } = this;
    t = ur(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let a = 0; a < o; a++)
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
    Ar(this, !1), qo(t), this.finish();
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
    return Dt(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (iu(t, this), this.finished)
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
    return t || (t = new Ko(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const gf = (e, t, n) => cu(() => new Ko(t, e, n)), pf = /* @__PURE__ */ gf(1, 136, 256 / 8);
var mf = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return zh(t, n, { N: r, r: i, p: s, dkLen: o });
}, wf = (e) => pf(e), qn = (e, t = "base64") => {
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
}, { crypto: oi, btoa: fu } = globalThis;
if (!oi)
  throw new v(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!fu)
  throw new v(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var po = (e) => oi.getRandomValues(new Uint8Array(e)), Es = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return fu(n);
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
}, gu = "AES-CTR", zo = (e, t) => {
  const n = qn(String(e).normalize("NFKC"), "utf-8"), r = yr(n, t, 1e5, 32, "sha256");
  return J(r);
}, Ef = async (e, t) => {
  const n = po(16), r = po(32), s = zo(e, r), i = JSON.stringify(t), o = qn(i, "utf-8"), a = {
    name: gu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), h = await crypto.subtle.encrypt(a, d, o);
  return {
    data: Es(h),
    iv: Es(n),
    salt: Es(r)
  };
}, If = async (e, t) => {
  const n = qn(t.iv), r = qn(t.salt), s = zo(e, r), i = qn(t.data), o = {
    name: gu,
    counter: n,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, a, i), h = new TextDecoder().decode(d);
  try {
    return JSON.parse(h);
  } catch {
    throw new v(R.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, yf = async (e, t, n) => {
  const r = oi.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, a = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    a,
    o
  );
  return new Uint8Array(d);
}, Bf = async (e, t, n) => {
  const r = oi.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, a = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    a,
    o
  );
  return new Uint8Array(d);
}, Cf = {
  bufferFromString: qn,
  stringFromBuffer: Es,
  decrypt: If,
  encrypt: Ef,
  keyFromPassword: zo,
  randomBytes: po,
  scrypt: mf,
  keccak256: wf,
  decryptJsonWalletData: Bf,
  encryptJsonWalletData: yf
}, bf = Cf, {
  bufferFromString: wn,
  decrypt: Qf,
  encrypt: xf,
  keyFromPassword: Sy,
  randomBytes: Bn,
  stringFromBuffer: Fr,
  scrypt: pu,
  keccak256: mu,
  decryptJsonWalletData: vf,
  encryptJsonWalletData: Ff
} = bf;
function It(e) {
  return X(qr(J(e)));
}
function nn(e) {
  return It(e);
}
function Df(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function Rf(e) {
  return nn(wn(e, "utf-8"));
}
var oe = class {
  constructor(e, t, n) {
    x(this, "name");
    x(this, "type");
    x(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, wu = "u8", Eu = "u16", Iu = "u32", yu = "u64", Bu = "u256", Cu = "raw untyped ptr", bu = "raw untyped slice", Qu = "bool", xu = "b256", vu = "struct B512", ea = "enum Option", ta = "struct Vec", na = "struct Bytes", ra = "struct String", Fu = "str", sa = /str\[(?<length>[0-9]+)\]/, vs = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, ia = /^struct (?<name>\w+)$/, oa = /^enum (?<name>\w+)$/, Du = /^\((?<items>.*)\)$/, Nf = /^generic (?<name>\w+)$/, Fs = "0", Sf = "1", re = 8, Wr = 32, kr = Wr, _f = Wr, kf = Wr, Mf = re * 4, Of = re * 2, aa = 2 ** 32 - 1, ai = ({ maxInputs: e }) => Wr + // Tx ID
re + // Tx size
// Asset ID/Balance coin input pairs
e * (kr + re), ca = re + // Identifier
re + // Gas limit
re + // Script size
re + // Script data size
re + // Policies
re + // Inputs size
re + // Outputs size
re + // Witnesses size
Wr, Lf = re + // Identifier
Mf + // Utxo Length
re + // Output Index
kf + // Owner
re + // Amount
kr + // Asset id
Of + // TxPointer
re + // Witnesses index
re + // Maturity
re + // Predicate size
re + // Predicate data size
re, Tf = {
  u64: re,
  u256: re * 4
}, _ = class extends oe {
  constructor(e) {
    super("bigNumber", e, Tf[e]);
  }
  encode(e) {
    let t;
    try {
      t = Ut(e, this.encodedLength);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), t + this.encodedLength];
  }
}, Pf = 3, Et = Pf * re, Uf = 2, uc = Uf * re;
function Rt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const a = o.dynamicData;
    a && Object.entries(a).forEach(([h, I]) => {
      t[parseInt(h, 10) + n] = I;
    });
    const d = J(o);
    return n += d.byteLength / re, d;
  }), s = r.reduce((o, a) => o + a.length, 0), i = new Uint8Array(s);
  return r.reduce((o, a) => (i.set(a, o), o + a.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function Ru(e, t, n) {
  if (!e.dynamicData)
    return se([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const a = parseInt(i, 10) * re, d = new _("u64").encode(
      n + t + r
    );
    s.set(d, a);
    const h = o.dynamicData ? (
      // unpack child dynamic data
      Ru(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = se([s, h]), r += h.byteLength;
  }), s;
}
var Nu = (e, t = re) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Gf = (e) => {
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
}, Hf = (e) => e === ta || e === na || e === ra;
function Qt(e, t, n = () => {
  throw new v(R.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var Mr = (e) => e % re === 0, Su = (e) => re - e % re, _u = (e) => {
  if (Mr(e.length))
    return e;
  const t = new Uint8Array(re - e.length % re);
  return Zr([e, t]);
}, ht = class extends oe {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    x(this, "coder");
    x(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Rt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > aa)
      throw new v(R.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, G = class extends oe {
  constructor() {
    super("b256", "b256", re * 4);
  }
  encode(e) {
    let t;
    try {
      t = J(e);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid b256 byte data size.");
    return [Go(n, 32), t + 32];
  }
}, ku = class extends oe {
  constructor() {
    super("b512", "struct B512", re * 8);
  }
  encode(e) {
    let t;
    try {
      t = J(e);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid b512 byte data size.");
    return [Go(n, this.encodedLength), t + this.encodedLength];
  }
}, Jf = class extends oe {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    x(this, "paddingLength");
    x(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(R.ENCODE_ERROR, "Invalid boolean value.");
    const r = Ut(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(R.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = Q(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(Q(1)))
      throw new v(R.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, no, Js, Mu, mo = (no = class extends oe {
  constructor() {
    super("struct", "struct Bytes", Et);
    Be(this, Js);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _("u64").encode(Et), s = vt(this, Js, Mu).call(this, t);
    return r.dynamicData = {
      0: Rt([s])
    }, n.push(r), n.push(new _("u64").encode(s.byteLength)), n.push(new _("u64").encode(t.length)), Rt(n);
  }
  decode(t, n) {
    if (t.length < Et)
      throw new v(R.DECODE_ERROR, "Invalid byte data size.");
    const r = t.slice(16, 24), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = t.slice(Et, Et + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + Et];
  }
}, Js = new WeakSet(), Mu = function(t) {
  const n = [Uint8Array.from(t)], r = (re - t.length % re) % re;
  return r && n.push(new Uint8Array(r)), se(n);
}, x(no, "memorySize", 1), no), Zf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), rr, fn, Zs, Lu, Ys, Tu, pA, Ou = (pA = class extends oe {
  constructor(t, n) {
    const r = new _("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    Be(this, Zs);
    Be(this, Ys);
    x(this, "name");
    x(this, "coders");
    Be(this, rr, void 0);
    Be(this, fn, void 0);
    this.name = t, this.coders = n, ve(this, rr, r), ve(this, fn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return vt(this, Zs, Lu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), a = new Uint8Array(ie(this, fn) - s.encodedLength);
    return Rt([ie(this, rr).encode(i), a, o]);
  }
  decode(t, n) {
    if (t.length < ie(this, fn))
      throw new v(R.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new _("u64").decode(t, r);
    const i = kt(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new v(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const a = this.coders[o], d = ie(this, fn) - a.encodedLength;
    return r += d, [s, r] = a.decode(t, r), Zf(this.coders) ? vt(this, Ys, Tu).call(this, o, r) : [{ [o]: s }, r];
  }
}, rr = new WeakMap(), fn = new WeakMap(), Zs = new WeakSet(), Lu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(ie(this, fn) - n.encodedLength);
  return se([ie(this, rr).encode(s), i, r]);
}, Ys = new WeakSet(), Tu = function(t, n) {
  return [t, n];
}, pA), ci = class extends Ou {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength - 1)
      throw new v(R.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, K = class extends oe {
  constructor(t, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && t === "u8" ? 1 : 8;
    super("number", t, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    x(this, "length");
    x(this, "paddingLength");
    x(this, "baseType");
    x(this, "options");
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
      n = Ut(t);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Ut(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [kt(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(R.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new v(R.DECODE_ERROR, "Invalid number byte data size.");
    return [kt(r), n + 8];
  }
}, Yf = class extends oe {
  constructor() {
    super("raw untyped slice", "raw untyped slice", uc);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new K("u8", { isSmallBytes: !0 }), r = new _("u64").encode(
      uc
    );
    return r.dynamicData = {
      0: Rt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new _("u64").encode(e.length)), Rt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new ht(
      new K("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, ro, Vs, Pu, Vf = (ro = class extends oe {
  constructor() {
    super("struct", "struct String", 1);
    Be(this, Vs);
  }
  encode(t) {
    const n = [], r = new _("u64").encode(Et), s = vt(this, Vs, Pu).call(this, t);
    return r.dynamicData = {
      0: Rt([s])
    }, n.push(r), n.push(new _("u64").encode(s.byteLength)), n.push(new _("u64").encode(t.length)), Rt(n);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid std string data size.");
    const r = t.slice(16, 24), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = t.slice(Et, Et + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [ri(i), n + Et];
  }
}, Vs = new WeakSet(), Pu = function(t) {
  const n = [ni(t)], r = (re - t.length % re) % re;
  return r && n.push(new Uint8Array(r)), se(n);
}, x(ro, "memorySize", 1), ro), sr, mA, Xf = (mA = class extends oe {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    x(this, "length");
    Be(this, sr, void 0);
    this.length = t, ve(this, sr, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = ni(t), r = new Uint8Array(ie(this, sr));
    return se([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new v(R.DECODE_ERROR, "Invalid string byte data size.");
    const s = ri(r), i = ie(this, sr);
    return [s, n + this.length + i];
  }
}, sr = new WeakMap(), mA), Ai = class extends oe {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    x(this, "name");
    x(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof ci) && i == null)
        throw new v(
          R.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Mr(o.length) ? o : _u(o);
    });
    return Rt([Rt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let d;
      return [d, r] = a.decode(t, r), Mr(r) || (r += Su(r)), i[o] = d, i;
    }, {}), r];
  }
}, Uu = class extends oe {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    x(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Rt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return Mr(s.length) ? s : _u(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), Mr(r) || (r += Su(r)), o;
    }), r];
  }
}, Gu = class extends oe {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Et);
    x(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _("u64").encode(Et);
    return r.dynamicData = {
      0: Rt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new _("u64").encode(t.length)), n.push(new _("u64").encode(t.length)), Rt(n);
  }
  decode(t, n) {
    if (t.length < Et || t.length > aa)
      throw new v(R.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new _("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Et, Et + i);
    if (o.length !== i)
      throw new v(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Nu(o, this.coder.encodedLength).map(
        (a) => this.coder.decode(a, 0)[0]
      ),
      n + Et
    ];
  }
}, ui = class Tn {
  constructor(t, n) {
    x(this, "abi");
    x(this, "name");
    x(this, "type");
    x(this, "originalTypeArguments");
    x(this, "components");
    this.abi = t;
    const r = Qt(
      t.types,
      (s) => s.typeId === n.type,
      () => {
        throw new v(
          R.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: n,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = n.name, this.type = r.type, this.originalTypeArguments = n.typeArguments, this.components = Tn.getResolvedGenericComponents(
      t,
      n,
      r.components,
      r.typeParameters ?? Tn.getImplicitGenericTypeParameters(t, r.components)
    );
  }
  static getResolvedGenericComponents(t, n, r, s) {
    if (r === null)
      return null;
    if (s === null || s.length === 0)
      return r.map((a) => new Tn(t, a));
    const i = s.reduce(
      (a, d, h) => {
        var E;
        const I = { ...a };
        return I[d] = structuredClone(
          (E = n.typeArguments) == null ? void 0 : E[h]
        ), I;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      t,
      r,
      i
    ).map((a) => new Tn(t, a));
  }
  static resolveGenericArgTypes(t, n, r) {
    return n.map((s) => {
      if (r[s.type] !== void 0)
        return {
          ...r[s.type],
          name: s.name
        };
      if (s.typeArguments)
        return {
          ...structuredClone(s),
          typeArguments: this.resolveGenericArgTypes(
            t,
            s.typeArguments,
            r
          )
        };
      const i = Qt(t.types, (a) => a.typeId === s.type), o = this.getImplicitGenericTypeParameters(t, i.components);
      return o && o.length > 0 ? {
        ...structuredClone(s),
        typeArguments: o.map((a) => r[a])
      } : s;
    });
  }
  static getImplicitGenericTypeParameters(t, n, r) {
    if (!Array.isArray(n))
      return null;
    const s = r ?? [];
    return n.forEach((i) => {
      const o = Qt(t.types, (a) => a.typeId === i.type);
      if (Nf.test(o.type)) {
        s.push(o.typeId);
        return;
      }
      Array.isArray(i.typeArguments) && this.getImplicitGenericTypeParameters(t, i.typeArguments, s);
    }), s.length > 0 ? s : null;
  }
  getSignature() {
    const t = this.getArgSignaturePrefix(), n = this.getArgSignatureContent();
    return `${t}${n}`;
  }
  getArgSignaturePrefix() {
    return ia.test(this.type) ? "s" : vs.test(this.type) ? "a" : oa.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var i, o;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const t = (i = sa.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `str[${t.length}]`;
    if (this.components === null)
      return this.type;
    const n = (o = vs.exec(this.type)) == null ? void 0 : o.groups;
    if (n)
      return `[${this.components[0].getSignature()};${n.length}]`;
    const r = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((a) => new Tn(this.abi, a).getSignature()).join(",")}>` : "", s = `(${this.components.map((a) => a.getSignature()).join(",")})`;
    return `${r}${s}`;
  }
};
function Ds(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Pn = (e, t) => {
  var d, h, I, E, C, D;
  switch (e.type) {
    case wu:
    case Eu:
    case Iu:
      return new K(e.type, t);
    case yu:
    case Cu:
      return new _("u64");
    case Bu:
      return new _("u256");
    case bu:
      return new Yf();
    case Qu:
      return new Jf(t);
    case xu:
      return new G();
    case vu:
      return new ku();
    case na:
      return new mo();
    case ra:
      return new Vf();
  }
  const n = (d = sa.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const F = parseInt(n.length, 10);
    return new Xf(F);
  }
  const r = e.components, s = (h = vs.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const F = parseInt(s.length, 10), b = r[0];
    if (!b)
      throw new v(
        R.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const N = Pn(b, { isSmallBytes: !0 });
    return new ht(N, F);
  }
  if (e.type === ta) {
    const F = (I = Qt(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : I[0];
    if (!F)
      throw new v(
        R.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const b = new ui(e.abi, F), N = Pn(b, { isSmallBytes: !0, encoding: Fs });
    return new Gu(N);
  }
  const i = (E = ia.exec(e.type)) == null ? void 0 : E.groups;
  if (i) {
    const F = Ds(r, { isRightPadded: !0, getCoder: Pn });
    return new Ai(i.name, F);
  }
  const o = (C = oa.exec(e.type)) == null ? void 0 : C.groups;
  if (o) {
    const F = Ds(r, { getCoder: Pn });
    return e.type === ea ? new ci(o.name, F) : new Ou(o.name, F);
  }
  if ((D = Du.exec(e.type)) == null ? void 0 : D.groups) {
    const F = r.map(
      (b) => Pn(b, { isRightPadded: !0, encoding: Fs })
    );
    return new Uu(F);
  }
  throw e.type === Fu ? new v(
    R.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new v(
    R.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, jf = class extends oe {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(R.ENCODE_ERROR, "Invalid boolean value.");
    return Ut(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid boolean data size.");
    const n = Q(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(Q(1)))
      throw new v(R.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, so, qf = (so = class extends oe {
  constructor() {
    super("struct", "struct Bytes", re);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const t = new Uint8Array(e), n = new _("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < re)
      throw new v(R.DECODE_ERROR, "Invalid byte data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
}, x(so, "memorySize", 1), so), Wf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), ir, or, Xs, Hu, js, Ju, wA, $f = (wA = class extends oe {
  constructor(t, n) {
    const r = new _("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    Be(this, Xs);
    Be(this, js);
    x(this, "name");
    x(this, "coders");
    Be(this, ir, void 0);
    Be(this, or, void 0);
    this.name = t, this.coders = n, ve(this, ir, r), ve(this, or, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return vt(this, Xs, Hu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...ie(this, ir).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < ie(this, or))
      throw new v(R.DECODE_ERROR, "Invalid enum data size.");
    const r = new _("u64").decode(t, n)[0], s = kt(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], a = n + re, [d, h] = o.decode(t, a);
    return Wf(this.coders) ? vt(this, js, Ju).call(this, i, h) : [{ [i]: d }, h];
  }
}, ir = new WeakMap(), or = new WeakMap(), Xs = new WeakSet(), Hu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(ie(this, or) - n.encodedLength);
  return se([ie(this, ir).encode(s), i, r]);
}, js = new WeakSet(), Ju = function(t, n) {
  return [t, n];
}, wA), Kf = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(R.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, wo = class extends oe {
  constructor(t) {
    const n = Kf(t);
    super("number", t, n);
    x(this, "length");
    x(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Ut(t);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Ut(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid number byte data size.");
    return [kt(r), n + this.length];
  }
}, zf = class extends oe {
  constructor() {
    super("raw untyped slice", "raw untyped slice", re);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const n = new ht(new wo("u8"), e.length).encode(e), r = new _("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new ht(new wo("u8"), s), [a] = o.decode(i, 0);
    return [a, n + s];
  }
}, io, eg = (io = class extends oe {
  constructor() {
    super("struct", "struct String", re);
  }
  encode(e) {
    const t = ni(e), n = new _("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid std string data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [ri(i), n + s];
  }
}, x(io, "memorySize", 1), io), tg = class extends oe {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(R.ENCODE_ERROR, "Value length mismatch during encode.");
    return ni(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid string byte data size.");
    return [ri(n), t + this.encodedLength];
  }
}, ng = class extends oe {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    x(this, "name");
    x(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return Zr(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof ci) && s == null)
          throw new v(
            R.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let d;
      return [d, r] = a.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, rg = class extends oe {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    x(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Zr(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, sg = class extends oe {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + re);
    x(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new _("u64").encode(t.length);
    return new Uint8Array([...r, ...Zr(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > aa)
      throw new v(R.DECODE_ERROR, "Invalid vec data size.");
    const r = n + re, s = t.slice(n, r), o = Q(new _("u64").decode(s, 0)[0]).toNumber() * this.coder.encodedLength, a = t.slice(r, r + o);
    if (a.length !== o)
      throw new v(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Nu(a, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, Un = (e, t) => {
  var d, h, I, E, C, D;
  switch (e.type) {
    case wu:
    case Eu:
    case Iu:
      return new wo(e.type);
    case yu:
    case Cu:
      return new _("u64");
    case Bu:
      return new _("u256");
    case bu:
      return new zf();
    case Qu:
      return new jf();
    case xu:
      return new G();
    case vu:
      return new ku();
    case na:
      return new qf();
    case ra:
      return new eg();
  }
  const n = (d = sa.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const F = parseInt(n.length, 10);
    return new tg(F);
  }
  const r = e.components, s = (h = vs.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const F = parseInt(s.length, 10), b = r[0];
    if (!b)
      throw new v(
        R.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const N = Un(b);
    return new ht(N, F);
  }
  if (e.type === ta) {
    const F = (I = Qt(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : I[0];
    if (!F)
      throw new v(
        R.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const b = new ui(e.abi, F), N = Un(b);
    return new sg(N);
  }
  const i = (E = ia.exec(e.type)) == null ? void 0 : E.groups;
  if (i) {
    const F = Ds(r, { isRightPadded: !0, getCoder: Un });
    return new ng(i.name, F);
  }
  const o = (C = oa.exec(e.type)) == null ? void 0 : C.groups;
  if (o) {
    const F = Ds(r, { getCoder: Un });
    return e.type === ea ? new ci(o.name, F) : new $f(o.name, F);
  }
  if ((D = Du.exec(e.type)) == null ? void 0 : D.groups) {
    const F = r.map(
      (b) => Un(b)
    );
    return new rg(F);
  }
  throw e.type === Fu ? new v(
    R.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new v(
    R.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function ig(e = Fs) {
  switch (e) {
    case Sf:
      return Un;
    case Fs:
      return Pn;
    default:
      throw new v(
        R.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Zn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new ui(e, t);
    return ig(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, qs, Zu, Ws, Yu, $s, Vu, kn, og = (kn = class {
  constructor(t, n) {
    Be(this, qs);
    Be(this, Ws);
    Be(this, $s);
    x(this, "signature");
    x(this, "selector");
    x(this, "name");
    x(this, "jsonFn");
    x(this, "attributes");
    x(this, "isInputDataPointer");
    x(this, "outputMetadata");
    x(this, "jsonAbi");
    this.jsonAbi = t, this.jsonFn = Qt(this.jsonAbi.functions, (r) => r.name === n), this.name = n, this.signature = kn.getSignature(this.jsonAbi, this.jsonFn), this.selector = kn.getFunctionSelector(this.signature), this.isInputDataPointer = vt(this, qs, Zu).call(this), this.outputMetadata = {
      isHeapType: vt(this, Ws, Yu).call(this),
      encodedLength: vt(this, $s, Vu).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(t, n) {
    const r = n.inputs.map(
      (s) => new ui(t, s).getSignature()
    );
    return `${n.name}(${r.join(",")})`;
  }
  static getFunctionSelector(t) {
    const n = It(wn(t, "utf-8"));
    return Q(n.slice(0, 10)).toHex(8);
  }
  encodeArguments(t, n = 0) {
    kn.verifyArgsAndInputsAlign(t, this.jsonFn.inputs, this.jsonAbi);
    const r = t.slice(), s = this.jsonFn.inputs.filter(
      (d) => Qt(this.jsonAbi.types, (h) => h.typeId === d.type).type !== "()"
    );
    Array.isArray(t) && s.length !== t.length && (r.length = this.jsonFn.inputs.length, r.fill(void 0, t.length));
    const i = s.map(
      (d) => Zn.getCoder(this.jsonAbi, d, {
        isRightPadded: s.length > 1
      })
    ), a = new Uu(i).encode(r);
    return Ru(a, n, a.byteLength);
  }
  static verifyArgsAndInputsAlign(t, n, r) {
    if (t.length === n.length)
      return;
    const s = n.map((a) => Qt(r.types, (d) => d.typeId === a.type)), i = s.filter(
      (a) => a.type === ea || a.type === "()"
    );
    if (i.length === s.length || s.length - i.length === t.length)
      return;
    const o = `Mismatch between provided arguments and expected ABI inputs. Provided ${t.length} arguments, but expected ${n.length - i.length} (excluding ${i.length} optional inputs).`;
    throw new v(R.ABI_TYPES_AND_VALUES_MISMATCH, o);
  }
  decodeArguments(t) {
    const n = J(t), r = this.jsonFn.inputs.filter(
      (i) => Qt(this.jsonAbi.types, (o) => o.typeId === i.type).type !== "()"
    );
    if (r.length === 0) {
      if (n.length === 0)
        return;
      throw new v(
        R.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonEmptyInputs: r.length,
            values: n.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonEmptyInputs: r,
            values: n
          }
        })}`
      );
    }
    return r.reduce(
      (i, o) => {
        const a = Zn.getCoder(this.jsonAbi, o), [d, h] = a.decode(n, i.offset);
        return {
          decoded: [...i.decoded, d],
          offset: i.offset + h
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(t) {
    if (Qt(
      this.jsonAbi.types,
      (i) => i.typeId === this.jsonFn.output.type
    ).type === "()")
      return [void 0, 0];
    const r = J(t);
    return Zn.getCoder(this.jsonAbi, this.jsonFn.output).decode(r, 0);
  }
}, qs = new WeakSet(), Zu = function() {
  var n;
  const t = this.jsonFn.inputs.map(
    (r) => this.jsonAbi.types.find((s) => s.typeId === r.type)
  );
  return this.jsonFn.inputs.length > 1 || Gf(((n = t[0]) == null ? void 0 : n.type) || "");
}, Ws = new WeakSet(), Yu = function() {
  const t = Qt(this.jsonAbi.types, (n) => n.typeId === this.jsonFn.output.type);
  return Hf((t == null ? void 0 : t.type) || "");
}, $s = new WeakSet(), Vu = function() {
  try {
    const t = Zn.getCoder(this.jsonAbi, this.jsonFn.output);
    return t instanceof Gu ? t.coder.encodedLength : t instanceof mo ? mo.memorySize : t.encodedLength;
  } catch {
    return 0;
  }
}, kn), Cn = class {
  constructor(e) {
    x(this, "functions");
    x(this, "configurables");
    /*
      TODO: Refactor so that there's no need for externalLoggedTypes
    
      This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method.
      This is used to decode logs from contracts other than the main contract
      we're interacting with.
      */
    x(this, "externalLoggedTypes");
    x(this, "jsonAbi");
    this.jsonAbi = e, this.externalLoggedTypes = {}, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new og(this.jsonAbi, t.name)])
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
      R.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    const n = typeof e == "string" ? this.getFunction(e) : e;
    if (!n)
      throw new v(R.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    const r = typeof e == "string" ? this.getFunction(e) : e;
    if (!r)
      throw new v(R.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t, n) {
    if (this.externalLoggedTypes[n])
      return this.externalLoggedTypes[n].decodeLog(e, t, n);
    const { loggedType: s } = Qt(this.jsonAbi.loggedTypes, (i) => i.logId === t);
    return Zn.decode(this.jsonAbi, s, J(e), 0, {
      encoding: this.jsonAbi.encoding
    });
  }
  updateExternalLoggedTypes(e, t) {
    this.externalLoggedTypes[e] = t;
  }
  encodeConfigurable(e, t) {
    const n = Qt(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new v(
          R.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return Zn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return Qt(
      this.jsonAbi.types,
      (t) => t.typeId === e,
      () => {
        throw new v(
          R.TYPE_NOT_FOUND,
          `Type with typeId '${e}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, _y = class {
}, ag = class {
}, Xu = class {
}, ju = class {
}, cg = class extends ju {
}, Ag = class extends ju {
}, gn, EA, Ie = (EA = class extends oe {
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
    x(this, "length");
    Be(this, gn, void 0);
    this.length = t, ve(this, gn, n);
  }
  encode(t) {
    const n = [], r = J(t);
    return n.push(r), ie(this, gn) && n.push(new Uint8Array(ie(this, gn))), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [X(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return ie(this, gn) && ([r, s] = [null, s + ie(this, gn)]), [i, s];
  }
}, gn = new WeakMap(), EA), dr = class extends Ai {
  constructor() {
    super("TxPointer", {
      blockHeight: new K("u32"),
      txIndex: new K("u16")
    });
  }
}, Ee = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ee || {}), dc = class extends oe {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new dr().encode(e.txPointer)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new K("u32").encode(e.maturity)), t.push(new _("u64").encode(e.predicateGasUsed)), t.push(new K("u32").encode(e.predicateLength)), t.push(new K("u32").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), se(t);
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
    const a = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new dr().decode(e, r);
    const h = n;
    [n, r] = new K("u8").decode(e, r);
    const I = Number(n);
    [n, r] = new K("u32").decode(e, r);
    const E = n;
    [n, r] = new _("u64").decode(e, r);
    const C = n;
    [n, r] = new K("u32").decode(e, r);
    const D = n;
    [n, r] = new K("u32").decode(e, r);
    const F = n;
    [n, r] = new Ie(D).decode(e, r);
    const b = n;
    return [n, r] = new Ie(F).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: a,
        assetId: d,
        txPointer: h,
        witnessIndex: I,
        maturity: E,
        predicateGasUsed: C,
        predicateLength: D,
        predicateDataLength: F,
        predicate: b,
        predicateData: n
      },
      r
    ];
  }
}, Rs = class extends oe {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new dr().encode(e.txPointer)), t.push(new G().encode(e.contractID)), se(t);
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
    const a = n;
    [n, r] = new dr().decode(e, r);
    const d = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: a,
        txPointer: d,
        contractID: n
      },
      r
    ];
  }
}, Ns = class qu extends oe {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(t) {
    const n = [];
    return n.push(new Ie(32).encode(t.sender)), n.push(new Ie(32).encode(t.recipient)), n.push(new Ie(32).encode(t.nonce)), n.push(new _("u64").encode(t.amount)), n.push(J(t.data || "0x")), It(se(n));
  }
  static encodeData(t) {
    const n = J(t || "0x"), r = n.length;
    return new Ie(r).encode(n);
  }
  encode(t) {
    const n = [], r = qu.encodeData(t.data);
    return n.push(new Ie(32).encode(t.sender)), n.push(new Ie(32).encode(t.recipient)), n.push(new _("u64").encode(t.amount)), n.push(new Ie(32).encode(t.nonce)), n.push(new K("u8").encode(t.witnessIndex)), n.push(new _("u64").encode(t.predicateGasUsed)), n.push(new K("u32").encode(r.length)), n.push(new K("u32").encode(t.predicateLength)), n.push(new K("u32").encode(t.predicateDataLength)), n.push(new Ie(r.length).encode(r)), n.push(new Ie(t.predicateLength).encode(t.predicate)), n.push(new Ie(t.predicateDataLength).encode(t.predicateData)), se(n);
  }
  static decodeData(t) {
    const n = J(t), r = n.length, [s] = new Ie(r).decode(n, 0);
    return J(s);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = new G().decode(t, s);
    const i = r;
    [r, s] = new G().decode(t, s);
    const o = r;
    [r, s] = new _("u64").decode(t, s);
    const a = r;
    [r, s] = new G().decode(t, s);
    const d = r;
    [r, s] = new K("u8").decode(t, s);
    const h = Number(r);
    [r, s] = new _("u64").decode(t, s);
    const I = r;
    [r, s] = new K("u32").decode(t, s);
    const E = r;
    [r, s] = new K("u32").decode(t, s);
    const C = r;
    [r, s] = new K("u32").decode(t, s);
    const D = r;
    [r, s] = new Ie(E).decode(t, s);
    const F = r;
    [r, s] = new Ie(C).decode(t, s);
    const b = r;
    return [r, s] = new Ie(D).decode(t, s), [
      {
        type: 2,
        sender: i,
        recipient: o,
        amount: a,
        witnessIndex: h,
        nonce: d,
        predicateGasUsed: I,
        dataLength: E,
        predicateLength: C,
        predicateDataLength: D,
        data: F,
        predicate: b,
        predicateData: r
      },
      s
    ];
  }
}, Ss = class extends oe {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new dc().encode(e));
        break;
      }
      case 1: {
        t.push(new Rs().encode(e));
        break;
      }
      case 2: {
        t.push(new Ns().encode(e));
        break;
      }
      default:
        throw new v(
          R.INVALID_TRANSACTION_INPUT,
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
        return [n, r] = new dc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Rs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ns().decode(e, r), [n, r];
      default:
        throw new v(
          R.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Ce = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Ce || {}), lc = class extends oe {
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
}, _s = class extends oe {
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
}, hc = class extends oe {
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
}, fc = class extends oe {
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
}, gc = class extends oe {
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
}, ks = class extends oe {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new lc().encode(e));
        break;
      }
      case 1: {
        t.push(new _s().encode(e));
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
      default:
        throw new v(
          R.INVALID_TRANSACTION_OUTPUT,
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
        return [n, r] = new lc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new _s().decode(e, r), [n, r];
      case 2:
        return [n, r] = new hc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new fc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new gc().decode(e, r), [n, r];
      default:
        throw new v(
          R.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Lt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Lt || {}), ug = (e) => e.sort((t, n) => t.type - n.type);
function dg(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new v(
        R.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var Ms = class extends oe {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    dg(e);
    const t = ug(e), n = [];
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
          throw new v(R.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
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
}, de = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(de || {}), pc = class extends oe {
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    [n, r] = new _("u64").decode(e, r);
    const h = n;
    [n, r] = new _("u64").decode(e, r);
    const I = n;
    [n, r] = new _("u64").decode(e, r);
    const E = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        gas: d,
        param1: h,
        param2: I,
        pc: E,
        is: n
      },
      r
    ];
  }
}, mc = class extends oe {
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
}, wc = class extends oe {
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: a,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Ec = class extends oe {
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
    const a = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 3,
        id: s,
        reason: i,
        pc: o,
        is: a,
        contractId: n
      },
      r
    ];
  }
}, Ic = class extends oe {
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
}, yc = class extends oe {
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    [n, r] = new _("u64").decode(e, r);
    const h = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: a,
        val3: d,
        pc: h,
        is: n
      },
      r
    ];
  }
}, Bc = class extends oe {
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const h = n;
    [n, r] = new _("u64").decode(e, r);
    const I = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: a,
        len: d,
        digest: h,
        pc: I,
        is: n
      },
      r
    ];
  }
}, Cc = class extends oe {
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        pc: d,
        is: n
      },
      r
    ];
  }
}, bc = class extends oe {
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        pc: d,
        is: n
      },
      r
    ];
  }
}, Qc = class extends oe {
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
}, Eo = class Wu extends oe {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(t) {
    const n = [];
    return n.push(new Ie(32).encode(t.sender)), n.push(new Ie(32).encode(t.recipient)), n.push(new Ie(32).encode(t.nonce)), n.push(new _("u64").encode(t.amount)), n.push(J(t.data || "0x")), It(se(n));
  }
  encode(t) {
    const n = [];
    return n.push(new G().encode(t.sender)), n.push(new G().encode(t.recipient)), n.push(new _("u64").encode(t.amount)), n.push(new G().encode(t.nonce)), n.push(new K("u16").encode(t.data.length)), n.push(new G().encode(t.digest)), n.push(new Ie(t.data.length).encode(t.data)), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = new G().decode(t, s);
    const i = r;
    [r, s] = new G().decode(t, s);
    const o = r;
    [r, s] = new _("u64").decode(t, s);
    const a = r;
    [r, s] = new G().decode(t, s);
    const d = r;
    [r, s] = new K("u16").decode(t, s);
    const h = r;
    [r, s] = new G().decode(t, s);
    const I = r;
    [r, s] = new Ie(h).decode(t, s);
    const E = J(r), C = {
      type: 10,
      messageId: "",
      sender: i,
      recipient: o,
      amount: a,
      nonce: d,
      digest: I,
      data: E
    };
    return C.messageId = Wu.getMessageId(C), [C, s];
  }
}, $u = (e, t) => {
  const n = J(e), r = J(t);
  return It(se([n, r]));
}, Os = class Ku extends oe {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(t, n) {
    return $u(t, n);
  }
  encode(t) {
    const n = [];
    return n.push(new G().encode(t.subId)), n.push(new G().encode(t.contractId)), n.push(new _("u64").encode(t.val)), n.push(new _("u64").encode(t.pc)), n.push(new _("u64").encode(t.is)), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = new G().decode(t, s);
    const i = r;
    [r, s] = new G().decode(t, s);
    const o = r;
    [r, s] = new _("u64").decode(t, s);
    const a = r;
    [r, s] = new _("u64").decode(t, s);
    const d = r;
    [r, s] = new _("u64").decode(t, s);
    const h = r, I = Ku.getAssetId(o, i);
    return [{
      type: 11,
      subId: i,
      contractId: o,
      val: a,
      pc: d,
      is: h,
      assetId: I
    }, s];
  }
}, Io = class extends oe {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return $u(e, t);
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
    const a = n;
    [n, r] = new _("u64").decode(e, r);
    const d = n, h = Os.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: d,
      assetId: h
    }, r];
  }
}, ky = class extends oe {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new pc().encode(e));
        break;
      }
      case 1: {
        t.push(new mc().encode(e));
        break;
      }
      case 2: {
        t.push(new wc().encode(e));
        break;
      }
      case 3: {
        t.push(new Ec().encode(e));
        break;
      }
      case 4: {
        t.push(new Ic().encode(e));
        break;
      }
      case 5: {
        t.push(new yc().encode(e));
        break;
      }
      case 6: {
        t.push(new Bc().encode(e));
        break;
      }
      case 7: {
        t.push(new Cc().encode(e));
        break;
      }
      case 8: {
        t.push(new bc().encode(e));
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
        t.push(new Os().encode(e));
        break;
      }
      case 12: {
        t.push(new Io().encode(e));
        break;
      }
      default:
        throw new v(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new pc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new mc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new wc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ec().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ic().decode(e, r), [n, r];
      case 5:
        return [n, r] = new yc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Bc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new Cc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new bc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new Qc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new Eo().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Os().decode(e, r), [n, r];
      case 12:
        return [n, r] = new Io().decode(e, r), [n, r];
      default:
        throw new v(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, xc = class extends Ai {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, Ls = class extends oe {
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
}, Ct = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(Ct || {}), vc = class extends oe {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _("u64").encode(e.scriptGasLimit)), t.push(new K("u32").encode(e.scriptLength)), t.push(new K("u32").encode(e.scriptDataLength)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new Ie(e.scriptLength).encode(e.script)), t.push(new Ie(e.scriptDataLength).encode(e.scriptData)), t.push(new Ms().encode(e.policies)), t.push(new ht(new Ss(), e.inputsCount).encode(e.inputs)), t.push(new ht(new ks(), e.outputsCount).encode(e.outputs)), t.push(new ht(new Ls(), e.witnessesCount).encode(e.witnesses)), se(t);
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
    const a = n;
    [n, r] = new K("u8").decode(e, r);
    const d = n;
    [n, r] = new K("u8").decode(e, r);
    const h = n;
    [n, r] = new K("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const E = n;
    [n, r] = new Ie(i).decode(e, r);
    const C = n;
    [n, r] = new Ie(o).decode(e, r);
    const D = n;
    [n, r] = new Ms().decode(e, r, a);
    const F = n;
    [n, r] = new ht(new Ss(), d).decode(e, r);
    const b = n;
    [n, r] = new ht(new ks(), h).decode(e, r);
    const N = n;
    return [n, r] = new ht(new Ls(), I).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: a,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: I,
        receiptsRoot: E,
        script: C,
        scriptData: D,
        policies: F,
        inputs: b,
        outputs: N,
        witnesses: n
      },
      r
    ];
  }
}, Fc = class extends oe {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new K("u32").encode(e.bytecodeLength)), t.push(new K("u8").encode(e.bytecodeWitnessIndex)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u16").encode(e.storageSlotsCount)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new Ms().encode(e.policies)), t.push(
      new ht(new xc(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new ht(new Ss(), e.inputsCount).encode(e.inputs)), t.push(new ht(new ks(), e.outputsCount).encode(e.outputs)), t.push(new ht(new Ls(), e.witnessesCount).encode(e.witnesses)), se(t);
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
    const a = n;
    [n, r] = new K("u8").decode(e, r);
    const d = n;
    [n, r] = new K("u8").decode(e, r);
    const h = n;
    [n, r] = new K("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const E = n;
    [n, r] = new Ms().decode(e, r, o);
    const C = n;
    [n, r] = new ht(new xc(), a).decode(e, r);
    const D = n;
    [n, r] = new ht(new Ss(), d).decode(e, r);
    const F = n;
    [n, r] = new ht(new ks(), h).decode(e, r);
    const b = n;
    return [n, r] = new ht(new Ls(), I).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: a,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: I,
        salt: E,
        policies: C,
        storageSlots: D,
        inputs: F,
        outputs: b,
        witnesses: n
      },
      r
    ];
  }
}, Dc = class extends oe {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new dr().encode(e.txPointer)), t.push(new Rs().encode(e.inputContract)), t.push(new _s().encode(e.outputContract)), t.push(new _("u64").encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new dr().decode(e, r);
    const s = n;
    [n, r] = new Rs().decode(e, r);
    const i = n;
    [n, r] = new _s().decode(e, r);
    const o = n;
    [n, r] = new _("u64").decode(e, r);
    const a = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: a,
        mintAssetId: n
      },
      r
    ];
  }
}, bn = class extends oe {
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
          new vc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Fc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Dc().encode(e));
        break;
      }
      default:
        throw new v(
          R.INVALID_TRANSACTION_TYPE,
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
        return [n, r] = new vc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Fc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Dc().decode(e, r), [n, r];
      default:
        throw new v(
          R.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, My = class extends Ai {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new K("u8")
    });
  }
}, Oy = 16 * 1024, Ly = 16, Ty = 1024 * 1024 * 1024, Py = 1024 * 1024 * 1024, Uy = 255, Gy = 1024 * 1024, Hy = 1024 * 1024, lg = "0xffffffffffff0000", zu = "0xffffffffffff0001", hg = "0xffffffffffff0002", fg = "0xffffffffffff0003", gg = "0xffffffffffff0004", pg = "0x0", Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
var lr = Or.bech32m = Or.bech32 = void 0;
const Ts = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", ed = {};
for (let e = 0; e < Ts.length; e++) {
  const t = Ts.charAt(e);
  ed[t] = e;
}
function Wn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Rc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Wn(t) ^ r >> 5;
  }
  t = Wn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Wn(t) ^ r & 31;
  }
  return t;
}
function Aa(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, a = [];
  for (let d = 0; d < e.length; ++d)
    for (s = s << t | e[d], i += t; i >= n; )
      i -= n, a.push(s >> i & o);
  if (r)
    i > 0 && a.push(s << n - i & o);
  else {
    if (i >= t)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return a;
}
function mg(e) {
  return Aa(e, 8, 5, !0);
}
function wg(e) {
  const t = Aa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Eg(e) {
  const t = Aa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function td(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, a, d) {
    if (d = d || 90, o.length + 7 + a.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = Rc(o);
    if (typeof h == "string")
      throw new Error(h);
    let I = o + "1";
    for (let E = 0; E < a.length; ++E) {
      const C = a[E];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      h = Wn(h) ^ C, I += Ts.charAt(C);
    }
    for (let E = 0; E < 6; ++E)
      h = Wn(h);
    h ^= t;
    for (let E = 0; E < 6; ++E) {
      const C = h >> (5 - E) * 5 & 31;
      I += Ts.charAt(C);
    }
    return I;
  }
  function r(o, a) {
    if (a = a || 90, o.length < 8)
      return o + " too short";
    if (o.length > a)
      return "Exceeds length limit";
    const d = o.toLowerCase(), h = o.toUpperCase();
    if (o !== d && o !== h)
      return "Mixed-case string " + o;
    o = d;
    const I = o.lastIndexOf("1");
    if (I === -1)
      return "No separator character for " + o;
    if (I === 0)
      return "Missing prefix for " + o;
    const E = o.slice(0, I), C = o.slice(I + 1);
    if (C.length < 6)
      return "Data too short";
    let D = Rc(E);
    if (typeof D == "string")
      return D;
    const F = [];
    for (let b = 0; b < C.length; ++b) {
      const N = C.charAt(b), S = ed[N];
      if (S === void 0)
        return "Unknown character " + N;
      D = Wn(D) ^ S, !(b + 6 >= C.length) && F.push(S);
    }
    return D !== t ? "Invalid checksum for " + o : { prefix: E, words: F };
  }
  function s(o, a) {
    const d = r(o, a);
    if (typeof d == "object")
      return d;
  }
  function i(o, a) {
    const d = r(o, a);
    if (typeof d == "object")
      return d;
    throw new Error(d);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: mg,
    fromWordsUnsafe: wg,
    fromWords: Eg
  };
}
Or.bech32 = td("bech32");
lr = Or.bech32m = td("bech32m");
var Ps = "fuel";
function ua(e) {
  return lr.decode(e);
}
function Is(e) {
  return lr.encode(
    Ps,
    lr.toWords(J(X(e)))
  );
}
function ys(e) {
  return typeof e == "string" && e.indexOf(Ps + 1) === 0 && ua(e).prefix === Ps;
}
function yo(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Nc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Bo(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function da(e) {
  return new Uint8Array(lr.fromWords(ua(e).words));
}
function Sc(e) {
  if (!ys(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return X(da(e));
}
function Ig(e) {
  const { words: t } = ua(e);
  return lr.encode(Ps, t);
}
var Dr = (e) => e instanceof Xu ? e.address : e instanceof cg ? e.id : e, yg = () => X(Bn(32)), Bg = (e) => {
  let t;
  try {
    if (!yo(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = da(Is(e)), t = X(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Cg = (e) => {
  if (!Bo(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, me = class Yt extends ag {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(n) {
    super();
    // #region address-2
    x(this, "bech32Address");
    if (this.bech32Address = Ig(n), !ys(this.bech32Address))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${n}.`
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
    return Sc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return da(this.bech32Address);
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
    const n = Sc(this.bech32Address);
    return {
      value: Bg(n)
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
  equals(n) {
    return this.bech32Address === n.bech32Address;
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   */
  static fromPublicKey(n) {
    if (!Nc(n))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${n}.`);
    const r = X(qr(J(n)));
    return new Yt(Is(r));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(n) {
    if (!yo(n))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${n}.`
      );
    return new Yt(Is(n));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(yg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(n) {
    return ys(n) ? new Yt(n) : this.fromB256(n);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   */
  static fromAddressOrString(n) {
    return typeof n == "string" ? this.fromString(n) : n;
  }
  /**
   * Takes a dynamic string or `AbstractAddress` and creates an `Address`
   *
   * @param addressId - A string containing Bech32, B256, or Public Key
   * @throws Error - Unknown address if the format is not recognised
   * @returns A new `Address` instance
   */
  static fromDynamicInput(n) {
    if (typeof n != "string" && "toB256" in n)
      return Yt.fromB256(n.toB256());
    if (Nc(n))
      return Yt.fromPublicKey(n);
    if (ys(n))
      return new Yt(n);
    if (yo(n))
      return Yt.fromB256(n);
    if (Bo(n))
      return Yt.fromEvmAddress(n);
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
  static fromEvmAddress(n) {
    if (!Bo(n))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${n}.`
      );
    const r = Cg(n);
    return new Yt(Is(r));
  }
}, Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", mt = Ne, Jy = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const nd = BigInt(0), di = BigInt(1), bg = BigInt(2);
function jt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Qg = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function hr(e) {
  if (!jt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Qg[e[n]];
  return t;
}
function rd(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function la(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const qt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function _c(e) {
  if (e >= qt._0 && e <= qt._9)
    return e - qt._0;
  if (e >= qt._A && e <= qt._F)
    return e - (qt._A - 10);
  if (e >= qt._a && e <= qt._f)
    return e - (qt._a - 10);
}
function fr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = _c(e.charCodeAt(i)), a = _c(e.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + a;
  }
  return r;
}
function _n(e) {
  return la(hr(e));
}
function ha(e) {
  if (!jt(e))
    throw new Error("Uint8Array expected");
  return la(hr(Uint8Array.from(e).reverse()));
}
function gr(e, t) {
  return fr(e.toString(16).padStart(t * 2, "0"));
}
function fa(e, t) {
  return gr(e, t).reverse();
}
function xg(e) {
  return fr(rd(e));
}
function Tt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = fr(t);
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
function Lr(...e) {
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
function sd(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function vg(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Fg(e) {
  let t;
  for (t = 0; e > nd; e >>= di, t += 1)
    ;
  return t;
}
function Dg(e, t) {
  return e >> BigInt(t) & di;
}
const Rg = (e, t, n) => e | (n ? di : nd) << BigInt(t), ga = (e) => (bg << BigInt(e - 1)) - di, Ji = (e) => new Uint8Array(e), kc = (e) => Uint8Array.from(e);
function id(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Ji(e), s = Ji(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, a = (...E) => n(s, r, ...E), d = (E = Ji()) => {
    s = a(kc([0]), E), r = a(), E.length !== 0 && (s = a(kc([1]), E), r = a());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let E = 0;
    const C = [];
    for (; E < t; ) {
      r = a();
      const D = r.slice();
      C.push(D), E += r.length;
    }
    return Lr(...C);
  };
  return (E, C) => {
    o(), d(E);
    let D;
    for (; !(D = C(h())); )
      d();
    return o(), D;
  };
}
const Ng = {
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
function $r(e, t, n = {}) {
  const r = (s, i, o) => {
    const a = Ng[i];
    if (typeof a != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const d = e[s];
    if (!(o && d === void 0) && !a(d, e))
      throw new Error(`Invalid param ${String(s)}=${d} (${typeof d}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const Sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Dg,
  bitLen: Fg,
  bitMask: ga,
  bitSet: Rg,
  bytesToHex: hr,
  bytesToNumberBE: _n,
  bytesToNumberLE: ha,
  concatBytes: Lr,
  createHmacDrbg: id,
  ensureBytes: Tt,
  equalBytes: sd,
  hexToBytes: fr,
  hexToNumber: la,
  isBytes: jt,
  numberToBytesBE: gr,
  numberToBytesLE: fa,
  numberToHexUnpadded: rd,
  numberToVarBytesBE: xg,
  utf8ToBytes: vg,
  validateObject: $r
}, Symbol.toStringTag, { value: "Module" }));
var Zi = {}, Co = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof be < "u" && be, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var a = typeof i < "u" && i || typeof self < "u" && self || typeof a < "u" && a, d = {
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
      function h(A) {
        return A && DataView.prototype.isPrototypeOf(A);
      }
      if (d.arrayBuffer)
        var I = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ], E = ArrayBuffer.isView || function(A) {
          return A && I.indexOf(Object.prototype.toString.call(A)) > -1;
        };
      function C(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function D(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function F(A) {
        var l = {
          next: function() {
            var p = A.shift();
            return { done: p === void 0, value: p };
          }
        };
        return d.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function b(A) {
        this.map = {}, A instanceof b ? A.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(A) ? A.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : A && Object.getOwnPropertyNames(A).forEach(function(l) {
          this.append(l, A[l]);
        }, this);
      }
      b.prototype.append = function(A, l) {
        A = C(A), l = D(l);
        var p = this.map[A];
        this.map[A] = p ? p + ", " + l : l;
      }, b.prototype.delete = function(A) {
        delete this.map[C(A)];
      }, b.prototype.get = function(A) {
        return A = C(A), this.has(A) ? this.map[A] : null;
      }, b.prototype.has = function(A) {
        return this.map.hasOwnProperty(C(A));
      }, b.prototype.set = function(A, l) {
        this.map[C(A)] = D(l);
      }, b.prototype.forEach = function(A, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && A.call(l, this.map[p], p, this);
      }, b.prototype.keys = function() {
        var A = [];
        return this.forEach(function(l, p) {
          A.push(p);
        }), F(A);
      }, b.prototype.values = function() {
        var A = [];
        return this.forEach(function(l) {
          A.push(l);
        }), F(A);
      }, b.prototype.entries = function() {
        var A = [];
        return this.forEach(function(l, p) {
          A.push([p, l]);
        }), F(A);
      }, d.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
      function N(A) {
        if (A.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        A.bodyUsed = !0;
      }
      function S(A) {
        return new Promise(function(l, p) {
          A.onload = function() {
            l(A.result);
          }, A.onerror = function() {
            p(A.error);
          };
        });
      }
      function Z(A) {
        var l = new FileReader(), p = S(l);
        return l.readAsArrayBuffer(A), p;
      }
      function T(A) {
        var l = new FileReader(), p = S(l);
        return l.readAsText(A), p;
      }
      function j(A) {
        for (var l = new Uint8Array(A), p = new Array(l.length), f = 0; f < l.length; f++)
          p[f] = String.fromCharCode(l[f]);
        return p.join("");
      }
      function M(A) {
        if (A.slice)
          return A.slice(0);
        var l = new Uint8Array(A.byteLength);
        return l.set(new Uint8Array(A)), l.buffer;
      }
      function k() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && h(A) ? (this._bodyArrayBuffer = M(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || E(A)) ? this._bodyArrayBuffer = M(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var A = N(this);
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
            var A = N(this);
            return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(Z);
        }), this.text = function() {
          var A = N(this);
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
        var p = l.body;
        if (A instanceof W) {
          if (A.bodyUsed)
            throw new TypeError("Already read");
          this.url = A.url, this.credentials = A.credentials, l.headers || (this.headers = new b(A.headers)), this.method = A.method, this.mode = A.mode, this.signal = A.signal, !p && A._bodyInit != null && (p = A._bodyInit, A.bodyUsed = !0);
        } else
          this.url = String(A);
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
      function U(A) {
        var l = new FormData();
        return A.trim().split("&").forEach(function(p) {
          if (p) {
            var f = p.split("="), w = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(w), decodeURIComponent(y));
          }
        }), l;
      }
      function H(A) {
        var l = new b(), p = A.replace(/\r?\n[\t ]+/g, " ");
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
      k.call(W.prototype);
      function z(A, l) {
        if (!(this instanceof z))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new b(l.headers), this.url = l.url || "", this._initBody(A);
      }
      k.call(z.prototype), z.prototype.clone = function() {
        return new z(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new b(this.headers),
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
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(l, p) {
          this.message = l, this.name = p;
          var f = Error(l);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function c(A, l) {
        return new Promise(function(p, f) {
          var w = new W(A, l);
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
            var Y = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              p(new z(Y, m));
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
              return m === "" && a.location.href ? a.location.href : m;
            } catch {
              return m;
            }
          }
          y.open(w.method, u(w.url), !0), w.credentials === "include" ? y.withCredentials = !0 : w.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && w.headers.get("Content-Type") && w.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof b) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            y.setRequestHeader(m, D(l.headers[m]));
          }) : w.headers.forEach(function(m, Y) {
            y.setRequestHeader(Y, m);
          }), w.signal && (w.signal.addEventListener("abort", g), y.onreadystatechange = function() {
            y.readyState === 4 && w.signal.removeEventListener("abort", g);
          }), y.send(typeof w._bodyInit > "u" ? null : w._bodyInit);
        });
      }
      return c.polyfill = !0, a.fetch || (a.fetch = c, a.Headers = b, a.Request = W, a.Response = z), o.Headers = b, o.Request = W, o.Response = z, o.fetch = c, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Co, Co.exports);
var _g = Co.exports;
function kg(e) {
  return typeof e == "object" && e !== null;
}
function Mg(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Og = /\r\n|[\n\r]/g;
function bo(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Og)) {
    if (typeof s.index == "number" || Mg(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Lg(e) {
  return od(
    e.source,
    bo(e.source, e.start)
  );
}
function od(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? n : 0, d = t.column + a, h = `${e.name}:${o}:${d}
`, I = r.split(/\r\n|[\n\r]/g), E = I[s];
  if (E.length > 120) {
    const C = Math.floor(d / 80), D = d % 80, F = [];
    for (let b = 0; b < E.length; b += 80)
      F.push(E.slice(b, b + 80));
    return h + Mc([
      [`${o} |`, F[0]],
      ...F.slice(1, C + 1).map((b) => ["|", b]),
      ["|", "^".padStart(D)],
      ["|", F[C + 1]]
    ]);
  }
  return h + Mc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, I[s - 1]],
    [`${o} |`, E],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, I[s + 1]]
  ]);
}
function Mc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function Tg(e) {
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
class pa extends Error {
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
    const { nodes: o, source: a, positions: d, path: h, originalError: I, extensions: E } = Tg(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = I ?? void 0, this.nodes = Oc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = Oc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((F) => F.loc).filter((F) => F != null)
    );
    this.source = a ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (C == null ? void 0 : C.map((F) => F.start)), this.locations = d && a ? d.map((F) => bo(a, F)) : C == null ? void 0 : C.map((F) => bo(F.source, F.start));
    const D = kg(
      I == null ? void 0 : I.extensions
    ) ? I == null ? void 0 : I.extensions : void 0;
    this.extensions = (i = E ?? D) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), I != null && I.stack ? Object.defineProperty(this, "stack", {
      value: I.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, pa) : Object.defineProperty(this, "stack", {
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

` + Lg(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + od(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Oc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ft(e, t, n) {
  return new pa(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Pg {
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
class ad {
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
const cd = {
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
}, Ug = new Set(Object.keys(cd));
function Lc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Ug.has(t);
}
var Yn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Yn || (Yn = {}));
var Qo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Qo || (Qo = {}));
var ce;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ce || (ce = {}));
function xo(e) {
  return e === 9 || e === 32;
}
function Tr(e) {
  return e >= 48 && e <= 57;
}
function Ad(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function ud(e) {
  return Ad(e) || e === 95;
}
function Gg(e) {
  return Ad(e) || Tr(e) || e === 95;
}
function Hg(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], d = Jg(a);
    d !== a.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Jg(e) {
  let t = 0;
  for (; t < e.length && xo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Zg(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((D) => D.length === 0 || xo(D.charCodeAt(0))), o = n.endsWith('\\"""'), a = e.endsWith('"') && !o, d = e.endsWith("\\"), h = a || d, I = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let E = "";
  const C = s && xo(e.charCodeAt(0));
  return (I && !C || i) && (E += `
`), E += n, (I || h) && (E += `
`), '"""' + E + '"""';
}
var L;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(L || (L = {}));
class Yg {
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
    const n = new ad(L.SOF, 0, 0, 0, 0);
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
          const n = Xg(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === L.COMMENT);
    return t;
  }
}
function Vg(e) {
  return e === L.BANG || e === L.DOLLAR || e === L.AMP || e === L.PAREN_L || e === L.PAREN_R || e === L.SPREAD || e === L.COLON || e === L.EQUALS || e === L.AT || e === L.BRACKET_L || e === L.BRACKET_R || e === L.BRACE_L || e === L.PIPE || e === L.BRACE_R;
}
function Br(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function li(e, t) {
  return dd(e.charCodeAt(t)) && ld(e.charCodeAt(t + 1));
}
function dd(e) {
  return e >= 55296 && e <= 56319;
}
function ld(e) {
  return e >= 56320 && e <= 57343;
}
function On(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return L.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function lt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new ad(t, n, r, i, o, s);
}
function Xg(e, t) {
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
        return jg(e, s);
      case 33:
        return lt(e, L.BANG, s, s + 1);
      case 36:
        return lt(e, L.DOLLAR, s, s + 1);
      case 38:
        return lt(e, L.AMP, s, s + 1);
      case 40:
        return lt(e, L.PAREN_L, s, s + 1);
      case 41:
        return lt(e, L.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return lt(e, L.SPREAD, s, s + 3);
        break;
      case 58:
        return lt(e, L.COLON, s, s + 1);
      case 61:
        return lt(e, L.EQUALS, s, s + 1);
      case 64:
        return lt(e, L.AT, s, s + 1);
      case 91:
        return lt(e, L.BRACKET_L, s, s + 1);
      case 93:
        return lt(e, L.BRACKET_R, s, s + 1);
      case 123:
        return lt(e, L.BRACE_L, s, s + 1);
      case 124:
        return lt(e, L.PIPE, s, s + 1);
      case 125:
        return lt(e, L.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? ep(e, s) : Wg(e, s);
    }
    if (Tr(i) || i === 45)
      return qg(e, s, i);
    if (ud(i))
      return tp(e, s);
    throw ft(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Br(i) || li(n, s) ? `Unexpected character: ${On(e, s)}.` : `Invalid character: ${On(e, s)}.`
    );
  }
  return lt(e, L.EOF, r, r);
}
function jg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Br(i))
      ++s;
    else if (li(n, s))
      s += 2;
    else
      break;
  }
  return lt(
    e,
    L.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function qg(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Tr(i))
      throw ft(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${On(
          e,
          s
        )}.`
      );
  } else
    s = Yi(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = Yi(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = Yi(e, s, i), i = r.charCodeAt(s)), i === 46 || ud(i))
    throw ft(
      e.source,
      s,
      `Invalid number, expected digit but got: ${On(
        e,
        s
      )}.`
    );
  return lt(
    e,
    o ? L.FLOAT : L.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function Yi(e, t, n) {
  if (!Tr(n))
    throw ft(
      e.source,
      t,
      `Invalid number, expected digit but got: ${On(
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
function Wg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const a = n.charCodeAt(s);
    if (a === 34)
      return o += n.slice(i, s), lt(e, L.STRING, t, s + 1, o);
    if (a === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? $g(e, s) : Kg(e, s) : zg(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (Br(a))
      ++s;
    else if (li(n, s))
      s += 2;
    else
      throw ft(
        e.source,
        s,
        `Invalid character within String: ${On(
          e,
          s
        )}.`
      );
  }
  throw ft(e.source, s, "Unterminated string.");
}
function $g(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Br(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | Rr(i), r < 0)
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
function Kg(e, t) {
  const n = e.source.body, r = Tc(n, t + 2);
  if (Br(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (dd(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Tc(n, t + 8);
    if (ld(s))
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
function Tc(e, t) {
  return Rr(e.charCodeAt(t)) << 12 | Rr(e.charCodeAt(t + 1)) << 8 | Rr(e.charCodeAt(t + 2)) << 4 | Rr(e.charCodeAt(t + 3));
}
function Rr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function zg(e, t) {
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
function ep(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, a = "";
  const d = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      a += n.slice(o, i), d.push(a);
      const I = lt(
        e,
        L.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Hg(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, I;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      a += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      a += n.slice(o, i), d.push(a), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, a = "", o = i, s = i;
      continue;
    }
    if (Br(h))
      ++i;
    else if (li(n, i))
      i += 2;
    else
      throw ft(
        e.source,
        i,
        `Invalid character within String: ${On(
          e,
          i
        )}.`
      );
  }
  throw ft(e.source, i, "Unterminated string.");
}
function tp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Gg(i))
      ++s;
    else
      break;
  }
  return lt(
    e,
    L.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Bs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const np = 10, hd = 2;
function fd(e) {
  return hi(e, []);
}
function hi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return rp(e, t);
    default:
      return String(e);
  }
}
function rp(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (sp(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : hi(r, n);
  } else if (Array.isArray(e))
    return op(e, n);
  return ip(e, n);
}
function sp(e) {
  return typeof e.toJSON == "function";
}
function ip(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > hd ? "[" + ap(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + hi(i, t)
  ).join(", ") + " }";
}
function op(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > hd)
    return "[Array]";
  const n = Math.min(np, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(hi(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function ap(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const cp = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class gd {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Bs(!1, `Body must be a string. Received: ${fd(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Bs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Bs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Ap(e) {
  return cp(e, gd);
}
function pd(e, t) {
  return new Kr(e, t).parseDocument();
}
function up(e, t) {
  const n = new Kr(e, t);
  n.expectToken(L.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(L.EOF), r;
}
function dp(e, t) {
  const n = new Kr(e, t);
  n.expectToken(L.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(L.EOF), r;
}
function lp(e, t) {
  const n = new Kr(e, t);
  n.expectToken(L.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(L.EOF), r;
}
class Kr {
  constructor(t, n = {}) {
    const r = Ap(t) ? t : new gd(t);
    this._lexer = new Yg(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(L.NAME);
    return this.node(t, {
      kind: ce.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ce.DOCUMENT,
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
    if (this.peek(L.BRACE_L))
      return this.node(t, {
        kind: ce.OPERATION_DEFINITION,
        operation: Yn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(L.NAME) && (r = this.parseName()), this.node(t, {
      kind: ce.OPERATION_DEFINITION,
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
        return Yn.QUERY;
      case "mutation":
        return Yn.MUTATION;
      case "subscription":
        return Yn.SUBSCRIPTION;
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
      kind: ce.VARIABLE_DEFINITION,
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
      kind: ce.VARIABLE,
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
      kind: ce.SELECTION_SET,
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
      kind: ce.FIELD,
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
      kind: ce.ARGUMENT,
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
      kind: ce.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: ce.INLINE_FRAGMENT,
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
      kind: ce.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: ce.FRAGMENT_DEFINITION,
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
          kind: ce.INT,
          value: n.value
        });
      case L.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ce.FLOAT,
          value: n.value
        });
      case L.STRING:
      case L.BLOCK_STRING:
        return this.parseStringLiteral();
      case L.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: ce.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: ce.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: ce.NULL
            });
          default:
            return this.node(n, {
              kind: ce.ENUM,
              value: n.value
            });
        }
      case L.DOLLAR:
        if (t)
          if (this.expectToken(L.DOLLAR), this._lexer.token.kind === L.NAME) {
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
      kind: ce.STRING,
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
      kind: ce.LIST,
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
      kind: ce.OBJECT,
      fields: this.any(L.BRACE_L, n, L.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(L.COLON), this.node(n, {
      kind: ce.OBJECT_FIELD,
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
      kind: ce.DIRECTIVE,
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
        kind: ce.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(L.BANG) ? this.node(t, {
      kind: ce.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ce.NAMED_TYPE,
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
      kind: ce.SCHEMA_DEFINITION,
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
      kind: ce.OPERATION_TYPE_DEFINITION,
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
      kind: ce.SCALAR_TYPE_DEFINITION,
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
      kind: ce.OBJECT_TYPE_DEFINITION,
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
      kind: ce.FIELD_DEFINITION,
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
      kind: ce.INPUT_VALUE_DEFINITION,
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
      kind: ce.INTERFACE_TYPE_DEFINITION,
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
      kind: ce.UNION_TYPE_DEFINITION,
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
      kind: ce.ENUM_TYPE_DEFINITION,
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
      kind: ce.ENUM_VALUE_DEFINITION,
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
        `${ds(
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
      kind: ce.INPUT_OBJECT_TYPE_DEFINITION,
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
      kind: ce.SCHEMA_EXTENSION,
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
      kind: ce.SCALAR_TYPE_EXTENSION,
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
      kind: ce.OBJECT_TYPE_EXTENSION,
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
      kind: ce.INTERFACE_TYPE_EXTENSION,
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
      kind: ce.UNION_TYPE_EXTENSION,
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
      kind: ce.ENUM_TYPE_EXTENSION,
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
      kind: ce.INPUT_OBJECT_TYPE_EXTENSION,
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
      kind: ce.DIRECTIVE_DEFINITION,
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
    if (Object.prototype.hasOwnProperty.call(Qo, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Pg(
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
      `Expected ${md(t)}, found ${ds(n)}.`
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
      throw ft(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${ds(n)}.`
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
    return ft(
      this._lexer.source,
      n.start,
      `Unexpected ${ds(n)}.`
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
      throw ft(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ds(e) {
  const t = e.value;
  return md(e.kind) + (t != null ? ` "${t}"` : "");
}
function md(e) {
  return Vg(e) ? `"${e}"` : e;
}
const hp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: Kr,
  parse: pd,
  parseConstValue: dp,
  parseType: lp,
  parseValue: up
}, Symbol.toStringTag, { value: "Module" })), fp = /* @__PURE__ */ To(hp);
function gp(e) {
  return `"${e.replace(pp, mp)}"`;
}
const pp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function mp(e) {
  return wp[e.charCodeAt(0)];
}
const wp = [
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
], Ep = Object.freeze({});
function Ip(e, t, n = cd) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ce))
    r.set(S, yp(t, S));
  let s, i = Array.isArray(e), o = [e], a = -1, d = [], h = e, I, E;
  const C = [], D = [];
  do {
    a++;
    const S = a === o.length, Z = S && d.length !== 0;
    if (S) {
      if (I = D.length === 0 ? void 0 : C[C.length - 1], h = E, E = D.pop(), Z)
        if (i) {
          h = h.slice();
          let j = 0;
          for (const [M, k] of d) {
            const O = M - j;
            k === null ? (h.splice(O, 1), j++) : h[O] = k;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [j, M] of d)
            h[j] = M;
        }
      a = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (E) {
      if (I = i ? a : o[a], h = E[I], h == null)
        continue;
      C.push(I);
    }
    let T;
    if (!Array.isArray(h)) {
      var F, b;
      Lc(h) || Bs(!1, `Invalid AST Node: ${fd(h)}.`);
      const j = S ? (F = r.get(h.kind)) === null || F === void 0 ? void 0 : F.leave : (b = r.get(h.kind)) === null || b === void 0 ? void 0 : b.enter;
      if (T = j == null ? void 0 : j.call(t, h, I, E, C, D), T === Ep)
        break;
      if (T === !1) {
        if (!S) {
          C.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([I, T]), !S))
        if (Lc(T))
          h = T;
        else {
          C.pop();
          continue;
        }
    }
    if (T === void 0 && Z && d.push([I, h]), S)
      C.pop();
    else {
      var N;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (N = n[h.kind]) !== null && N !== void 0 ? N : [], a = -1, d = [], E && D.push(E), E = h;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function yp(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function wd(e) {
  return Ip(e, Cp);
}
const Bp = 80, Cp = {
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
    leave: ({ selections: e }) => Ot(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", ee(n, ", "), ")");
      return o.length > Bp && (o = i + pe(`(
`, Cs(ee(n, `
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
    leave: ({ value: e, block: t }) => t ? Zg(e) : gp(e)
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
`) + ee(["schema", ee(t, " "), Ot(n)], " ")
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
        Ot(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Pc(n) ? pe(`(
`, Cs(ee(n, `
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
        Ot(s)
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
`) + ee(["enum", t, ee(n, " "), Ot(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + ee([t, ee(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + ee(["input", t, ee(n, " "), Ot(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Pc(n) ? pe(`(
`, Cs(ee(n, `
`)), `
)`) : pe("(", ee(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + ee(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => ee(
      ["extend schema", ee(e, " "), Ot(t)],
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
        Ot(r)
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
        Ot(r)
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
    leave: ({ name: e, directives: t, values: n }) => ee(["extend enum", e, ee(t, " "), Ot(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => ee(["extend input", e, ee(t, " "), Ot(n)], " ")
  }
};
function ee(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Ot(e) {
  return pe(`{
`, Cs(ee(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Cs(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Pc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const bp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: wd
}, Symbol.toStringTag, { value: "Module" })), Qp = /* @__PURE__ */ To(bp);
var ma = {}, fi = {}, Ed = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, xp = Ed, Id = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof xp;
}, vp = Id, Fp = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = vp);
  var s, i = /* @__PURE__ */ new Map();
  function o(I, E) {
    var C = i.get(E);
    C ? C.push.apply(C, I) : i.set(E, I);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var a = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(I, E) {
        return o(["" + a + E], I), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(I, E) {
        var C = e(I, "" + a + E, r);
        return C.files.forEach(o), C.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var h = e(t[d], "" + a + d, r);
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
fi.ReactNativeFile = Ed;
fi.extractFiles = Fp;
fi.isExtractableFile = Id;
var Dp = typeof self == "object" ? self.FormData : window.FormData, zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.defaultJsonSerializer = void 0;
zr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Rp = be && be.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ma, "__esModule", { value: !0 });
var yd = fi, Np = Rp(Dp), Sp = zr, _p = function(e) {
  return yd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function kp(e, t, n, r) {
  r === void 0 && (r = Sp.defaultJsonSerializer);
  var s = yd.extractFiles({ query: e, variables: t, operationName: n }, "", _p), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var a = e.reduce(function(C, D, F) {
      return C.push({ query: D, variables: t ? t[F] : void 0 }), C;
    }, []);
    return r.stringify(a);
  }
  var d = typeof FormData > "u" ? Np.default : FormData, h = new d();
  h.append("operations", r.stringify(i));
  var I = {}, E = 0;
  return o.forEach(function(C) {
    I[++E] = C;
  }), h.append("map", r.stringify(I)), E = 0, o.forEach(function(C, D) {
    h.append("" + ++E, D);
  }), h;
}
ma.default = kp;
var xt = {};
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.parseBatchRequestsExtendedArgs = xt.parseRawRequestExtendedArgs = xt.parseRequestExtendedArgs = xt.parseBatchRequestArgs = xt.parseRawRequestArgs = xt.parseRequestArgs = void 0;
function Mp(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
xt.parseRequestArgs = Mp;
function Op(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
xt.parseRawRequestArgs = Op;
function Lp(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
xt.parseBatchRequestArgs = Lp;
function Tp(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
xt.parseRequestExtendedArgs = Tp;
function Pp(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
xt.parseRawRequestExtendedArgs = Pp;
function Up(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
xt.parseBatchRequestsExtendedArgs = Up;
var es = {}, Gp = be && be.__extends || function() {
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
var Hp = (
  /** @class */
  function(e) {
    Gp(t, e);
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
es.ClientError = Hp;
var xr = {}, Uc;
function Jp() {
  if (Uc)
    return xr;
  Uc = 1;
  var e = be && be.__assign || function() {
    return e = Object.assign || function(M) {
      for (var k, O = 1, P = arguments.length; O < P; O++) {
        k = arguments[O];
        for (var W in k)
          Object.prototype.hasOwnProperty.call(k, W) && (M[W] = k[W]);
      }
      return M;
    }, e.apply(this, arguments);
  }, t = be && be.__awaiter || function(M, k, O, P) {
    function W(U) {
      return U instanceof O ? U : new O(function(H) {
        H(U);
      });
    }
    return new (O || (O = Promise))(function(U, H) {
      function z(A) {
        try {
          c(P.next(A));
        } catch (l) {
          H(l);
        }
      }
      function B(A) {
        try {
          c(P.throw(A));
        } catch (l) {
          H(l);
        }
      }
      function c(A) {
        A.done ? U(A.value) : W(A.value).then(z, B);
      }
      c((P = P.apply(M, k || [])).next());
    });
  }, n = be && be.__generator || function(M, k) {
    var O = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, W, U, H;
    return H = { next: z(0), throw: z(1), return: z(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function z(c) {
      return function(A) {
        return B([c, A]);
      };
    }
    function B(c) {
      if (P)
        throw new TypeError("Generator is already executing.");
      for (; O; )
        try {
          if (P = 1, W && (U = c[0] & 2 ? W.return : c[0] ? W.throw || ((U = W.return) && U.call(W), 0) : W.next) && !(U = U.call(W, c[1])).done)
            return U;
          switch (W = 0, U && (c = [c[0] & 2, U.value]), c[0]) {
            case 0:
            case 1:
              U = c;
              break;
            case 4:
              return O.label++, { value: c[1], done: !1 };
            case 5:
              O.label++, W = c[1], c = [0];
              continue;
            case 7:
              c = O.ops.pop(), O.trys.pop();
              continue;
            default:
              if (U = O.trys, !(U = U.length > 0 && U[U.length - 1]) && (c[0] === 6 || c[0] === 2)) {
                O = 0;
                continue;
              }
              if (c[0] === 3 && (!U || c[1] > U[0] && c[1] < U[3])) {
                O.label = c[1];
                break;
              }
              if (c[0] === 6 && O.label < U[1]) {
                O.label = U[1], U = c;
                break;
              }
              if (U && O.label < U[2]) {
                O.label = U[2], O.ops.push(c);
                break;
              }
              U[2] && O.ops.pop(), O.trys.pop();
              continue;
          }
          c = k.call(M, O);
        } catch (A) {
          c = [6, A], W = 0;
        } finally {
          P = U = 0;
        }
      if (c[0] & 5)
        throw c[1];
      return { value: c[0] ? c[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(xr, "__esModule", { value: !0 }), xr.GraphQLWebSocketClient = void 0;
  var r = es, s = Bd(), i = "connection_init", o = "connection_ack", a = "ping", d = "pong", h = "subscribe", I = "next", E = "error", C = "complete", D = (
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
  ), F = (
    /** @class */
    function() {
      function M(k, O) {
        var P = this, W = O.onInit, U = O.onAcknowledged, H = O.onPing, z = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = k, k.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var c, A, l, p;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (c = k).send, l = N, W ? [4, W()] : [3, 2];
                case 1:
                  return p = f.sent(), [3, 3];
                case 2:
                  p = null, f.label = 3;
                case 3:
                  return A.apply(c, [l.apply(void 0, [p]).text]), [
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
            var c = b(B.data);
            switch (c.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, U && U(c.payload));
                return;
              }
              case a: {
                H ? H(c.payload).then(function(w) {
                  return k.send(Z(w).text);
                }) : k.send(Z(null).text);
                return;
              }
              case d: {
                z && z(c.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || c.id === void 0 || c.id === null || !P.socketState.subscriptions[c.id])
              return;
            var A = P.socketState.subscriptions[c.id], l = A.query, p = A.variables, f = A.subscriber;
            switch (c.type) {
              case I: {
                !c.payload.errors && c.payload.data && f.next && f.next(c.payload.data), c.payload.errors && f.error && f.error(new r.ClientError(e(e({}, c.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case E: {
                f.error && f.error(new r.ClientError({ errors: c.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case C: {
                f.complete && f.complete(), delete P.socketState.subscriptions[c.id];
                return;
              }
            }
          } catch (w) {
            console.error(w), k.close(1006);
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
  xr.GraphQLWebSocketClient = F;
  function b(M, k) {
    k === void 0 && (k = function(P) {
      return P;
    });
    var O = D.parse(M, k);
    return O;
  }
  function N(M) {
    return new D(i, M);
  }
  function S(M) {
    return new D(a, M, void 0);
  }
  function Z(M) {
    return new D(d, M, void 0);
  }
  function T(M, k) {
    return new D(h, k, M);
  }
  function j(M) {
    return new D(C, void 0, M);
  }
  return xr;
}
var Gc;
function Bd() {
  return Gc || (Gc = 1, function(e) {
    var t = be && be.__assign || function() {
      return t = Object.assign || function(f) {
        for (var w, y = 1, g = arguments.length; y < g; y++) {
          w = arguments[y];
          for (var u in w)
            Object.prototype.hasOwnProperty.call(w, u) && (f[u] = w[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = be && be.__createBinding || (Object.create ? function(f, w, y, g) {
      g === void 0 && (g = y), Object.defineProperty(f, g, { enumerable: !0, get: function() {
        return w[y];
      } });
    } : function(f, w, y, g) {
      g === void 0 && (g = y), f[g] = w[y];
    }), r = be && be.__setModuleDefault || (Object.create ? function(f, w) {
      Object.defineProperty(f, "default", { enumerable: !0, value: w });
    } : function(f, w) {
      f.default = w;
    }), s = be && be.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var w = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(w, f, y);
      return r(w, f), w;
    }, i = be && be.__awaiter || function(f, w, y, g) {
      function u(m) {
        return m instanceof y ? m : new y(function(Y) {
          Y(m);
        });
      }
      return new (y || (y = Promise))(function(m, Y) {
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
          te.done ? m(te.value) : u(te.value).then(V, $);
        }
        q((g = g.apply(f, w || [])).next());
      });
    }, o = be && be.__generator || function(f, w) {
      var y = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, u, m, Y;
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
        for (; y; )
          try {
            if (g = 1, u && (m = q[0] & 2 ? u.return : q[0] ? u.throw || ((m = u.return) && m.call(u), 0) : u.next) && !(m = m.call(u, q[1])).done)
              return m;
            switch (u = 0, m && (q = [q[0] & 2, m.value]), q[0]) {
              case 0:
              case 1:
                m = q;
                break;
              case 4:
                return y.label++, { value: q[1], done: !1 };
              case 5:
                y.label++, u = q[1], q = [0];
                continue;
              case 7:
                q = y.ops.pop(), y.trys.pop();
                continue;
              default:
                if (m = y.trys, !(m = m.length > 0 && m[m.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  y = 0;
                  continue;
                }
                if (q[0] === 3 && (!m || q[1] > m[0] && q[1] < m[3])) {
                  y.label = q[1];
                  break;
                }
                if (q[0] === 6 && y.label < m[1]) {
                  y.label = m[1], m = q;
                  break;
                }
                if (m && y.label < m[2]) {
                  y.label = m[2], y.ops.push(q);
                  break;
                }
                m[2] && y.ops.pop(), y.trys.pop();
                continue;
            }
            q = w.call(f, y);
          } catch (te) {
            q = [6, te], u = 0;
          } finally {
            g = m = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, a = be && be.__rest || function(f, w) {
      var y = {};
      for (var g in f)
        Object.prototype.hasOwnProperty.call(f, g) && w.indexOf(g) < 0 && (y[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(f); u < g.length; u++)
          w.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[u]) && (y[g[u]] = f[g[u]]);
      return y;
    }, d = be && be.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(_g), I = h, E = fp, C = Qp, D = d(ma), F = zr, b = xt, N = es;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return N.ClientError;
    } });
    var S = function(f) {
      var w = {};
      return f && (typeof Headers < "u" && f instanceof Headers || I && I.Headers && f instanceof I.Headers ? w = l(f) : Array.isArray(f) ? f.forEach(function(y) {
        var g = y[0], u = y[1];
        w[g] = u;
      }) : w = f), w;
    }, Z = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, T = function(f) {
      var w = f.query, y = f.variables, g = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(w)) {
        var m = ["query=" + encodeURIComponent(Z(w))];
        return y && m.push("variables=" + encodeURIComponent(u.stringify(y))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = w.reduce(function(V, $, q) {
        return V.push({
          query: Z($),
          variables: y ? u.stringify(y[q]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Y));
    }, j = function(f) {
      var w = f.url, y = f.query, g = f.variables, u = f.operationName, m = f.headers, Y = f.fetch, V = f.fetchOptions, $ = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return q = D.default(y, g, u, V.jsonSerializer), te = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), m), body: q }, V), $ ? [4, Promise.resolve($(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, Y(w, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, M = function(f) {
      var w = f.url, y = f.query, g = f.variables, u = f.operationName, m = f.headers, Y = f.fetch, V = f.fetchOptions, $ = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return q = T({
                query: y,
                variables: g,
                operationName: u,
                jsonSerializer: V.jsonSerializer
              }), te = t({ method: "GET", headers: m }, V), $ ? [4, Promise.resolve($(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, Y(w + "?" + q, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, k = (
      /** @class */
      function() {
        function f(w, y) {
          y === void 0 && (y = {}), this.url = w, this.options = y;
        }
        return f.prototype.rawRequest = function(w, y, g) {
          return i(this, void 0, void 0, function() {
            var u, m, Y, V, $, q, te, ne, Se, fe, ae, De;
            return o(this, function(le) {
              return u = b.parseRawRequestArgs(w, y, g), m = this.options, Y = m.headers, V = m.fetch, $ = V === void 0 ? h.default : V, q = m.method, te = q === void 0 ? "POST" : q, ne = m.requestMiddleware, Se = m.responseMiddleware, fe = a(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ae = this.url, u.signal !== void 0 && (fe.signal = u.signal), De = B(u.query).operationName, [2, O({
                url: ae,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, S(c(Y))), S(u.requestHeaders)),
                operationName: De,
                fetch: $,
                method: te,
                fetchOptions: fe,
                middleware: ne
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
          var u = y[0], m = y[1], Y = b.parseRequestArgs(w, u, m), V = this.options, $ = V.headers, q = V.fetch, te = q === void 0 ? h.default : q, ne = V.method, Se = ne === void 0 ? "POST" : ne, fe = V.requestMiddleware, ae = V.responseMiddleware, De = a(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), le = this.url;
          Y.signal !== void 0 && (De.signal = Y.signal);
          var ge = B(Y.document), Ht = ge.query, Re = ge.operationName;
          return O({
            url: le,
            query: Ht,
            variables: Y.variables,
            headers: t(t({}, S(c($))), S(Y.requestHeaders)),
            operationName: Re,
            fetch: te,
            method: Se,
            fetchOptions: De,
            middleware: fe
          }).then(function(ye) {
            return ae && ae(ye), ye.data;
          }).catch(function(ye) {
            throw ae && ae(ye), ye;
          });
        }, f.prototype.batchRequests = function(w, y) {
          var g = b.parseBatchRequestArgs(w, y), u = this.options, m = u.headers, Y = u.fetch, V = Y === void 0 ? h.default : Y, $ = u.method, q = $ === void 0 ? "POST" : $, te = u.requestMiddleware, ne = u.responseMiddleware, Se = a(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Se.signal = g.signal);
          var ae = g.documents.map(function(le) {
            var ge = le.document;
            return B(ge).query;
          }), De = g.documents.map(function(le) {
            var ge = le.variables;
            return ge;
          });
          return O({
            url: fe,
            query: ae,
            variables: De,
            headers: t(t({}, S(c(m))), S(g.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: q,
            fetchOptions: Se,
            middleware: te
          }).then(function(le) {
            return ne && ne(le), le.data;
          }).catch(function(le) {
            throw ne && ne(le), le;
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
    e.GraphQLClient = k;
    function O(f) {
      var w = f.url, y = f.query, g = f.variables, u = f.headers, m = f.operationName, Y = f.fetch, V = f.method, $ = V === void 0 ? "POST" : V, q = f.fetchOptions, te = f.middleware;
      return i(this, void 0, void 0, function() {
        var ne, Se, fe, ae, De, le, ge, Ht, Re, ye, Cr;
        return o(this, function(_e) {
          switch (_e.label) {
            case 0:
              return ne = $.toUpperCase() === "POST" ? j : M, Se = Array.isArray(y), [4, ne({
                url: w,
                query: y,
                variables: g,
                operationName: m,
                headers: u,
                fetch: Y,
                fetchOptions: q,
                middleware: te
              })];
            case 1:
              return fe = _e.sent(), [4, H(fe, q.jsonSerializer)];
            case 2:
              if (ae = _e.sent(), De = Se && Array.isArray(ae) ? !ae.some(function(Me) {
                var ss = Me.data;
                return !ss;
              }) : !!ae.data, le = !ae.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", fe.ok && le && De)
                return ge = fe.headers, Ht = fe.status, ae.errors, Re = a(ae, ["errors"]), ye = q.errorPolicy === "ignore" ? Re : ae, [2, t(t({}, Se ? { data: ye } : ye), { headers: ge, status: Ht })];
              throw Cr = typeof ae == "string" ? { error: ae } : ae, new N.ClientError(t(t({}, Cr), { status: fe.status, headers: fe.headers }), { query: y, variables: g });
          }
        });
      });
    }
    function P(f, w, y, g) {
      return i(this, void 0, void 0, function() {
        var u, m;
        return o(this, function(Y) {
          return u = b.parseRawRequestExtendedArgs(f, w, y, g), m = new k(u.url), [2, m.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function W(f, w) {
      for (var y = [], g = 2; g < arguments.length; g++)
        y[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, m, Y, V;
        return o(this, function($) {
          return u = y[0], m = y[1], Y = b.parseRequestExtendedArgs(f, w, u, m), V = new k(Y.url), [2, V.request(t({}, Y))];
        });
      });
    }
    e.request = W;
    function U(f, w, y) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(m) {
          return g = b.parseBatchRequestsExtendedArgs(f, w, y), u = new k(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = U, e.default = W;
    function H(f, w) {
      return w === void 0 && (w = F.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, g, u;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return f.headers.forEach(function(Y, V) {
                V.toLowerCase() === "content-type" && (y = Y);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (g = w).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [m.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function z(f) {
      var w, y = void 0, g = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (y = (w = g[0].name) === null || w === void 0 ? void 0 : w.value), y;
    }
    function B(f) {
      if (typeof f == "string") {
        var w = void 0;
        try {
          var y = E.parse(f);
          w = z(y);
        } catch {
        }
        return { query: f, operationName: w };
      }
      var g = z(f);
      return { query: C.print(f), operationName: g };
    }
    e.resolveRequestDocument = B;
    function c(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var w = [], y = 1; y < arguments.length; y++)
        w[y - 1] = arguments[y];
      return f.reduce(function(g, u, m) {
        return "" + g + u + (m in w ? w[m] : "");
      }, "");
    }
    e.gql = A;
    function l(f) {
      var w = {};
      return f.forEach(function(y, g) {
        w[g] = y;
      }), w;
    }
    var p = Jp();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(Zi)), Zi;
}
var Zp = Bd();
function Yp(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Cd(e) {
  return function t(n) {
    return arguments.length === 0 || Yp(n) ? t : e.apply(this, arguments);
  };
}
var Vp = /* @__PURE__ */ Cd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Xp(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function bd(e, t, n) {
  if (n || (n = new qp()), jp(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = t ? bd(e[a], !0, n) : e[a]);
    return i;
  };
  switch (Vp(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Xp(e);
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
function jp(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var qp = /* @__PURE__ */ function() {
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
          const a = i[o];
          if (a[0] === t)
            return a[1];
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
}(), Wp = /* @__PURE__ */ Cd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : bd(t, !0);
});
const Pr = Wp;
var Us = function() {
  return Us = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Us.apply(this, arguments);
};
var bs = /* @__PURE__ */ new Map(), vo = /* @__PURE__ */ new Map(), Qd = !0, Gs = !1;
function xd(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function $p(e) {
  return xd(e.source.body.substring(e.start, e.end));
}
function Kp(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = $p(r.loc), o = vo.get(s);
      o && !o.has(i) ? Qd && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || vo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Us(Us({}, e), { definitions: n });
}
function zp(e) {
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
function em(e) {
  var t = xd(e);
  if (!bs.has(t)) {
    var n = pd(e, {
      experimentalFragmentVariables: Gs,
      allowLegacyFragmentVariables: Gs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    bs.set(t, zp(Kp(n)));
  }
  return bs.get(t);
}
function pr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), em(r);
}
function tm() {
  bs.clear(), vo.clear();
}
function nm() {
  Qd = !1;
}
function rm() {
  Gs = !0;
}
function sm() {
  Gs = !1;
}
var vr = {
  gql: pr,
  resetCaches: tm,
  disableFragmentWarnings: nm,
  enableExperimentalFragmentVariables: rm,
  disableExperimentalFragmentVariables: sm
};
(function(e) {
  e.gql = vr.gql, e.resetCaches = vr.resetCaches, e.disableFragmentWarnings = vr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = vr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = vr.disableExperimentalFragmentVariables;
})(pr || (pr = {}));
pr.default = pr;
const Ae = pr;
let he;
const vd = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && vd.decode();
let Nr = null;
function Fd() {
  return (Nr === null || Nr.byteLength === 0) && (Nr = new Uint8Array(he.memory.buffer)), Nr;
}
function im(e, t) {
  return e = e >>> 0, vd.decode(Fd().subarray(e, e + t));
}
function Dd(e) {
  const t = he.ret(e);
  return Mt.__wrap(t);
}
function om(e, t) {
  const n = he.retd(e, t);
  return Mt.__wrap(n);
}
function Hc(e, t, n, r) {
  const s = he.call(e, t, n, r);
  return Mt.__wrap(s);
}
function am(e, t, n) {
  const r = he.tr(e, t, n);
  return Mt.__wrap(r);
}
function Jc(e, t, n) {
  const r = he.addi(e, t, n);
  return Mt.__wrap(r);
}
function cm(e, t, n) {
  const r = he.muli(e, t, n);
  return Mt.__wrap(r);
}
function Sr(e, t, n) {
  const r = he.lw(e, t, n);
  return Mt.__wrap(r);
}
function Am(e, t, n) {
  const r = he.gtf(e, t, n);
  return Mt.__wrap(r);
}
function ls(e, t) {
  const n = he.movi(e, t);
  return Mt.__wrap(n);
}
let _r = null;
function Zc() {
  return (_r === null || _r.byteLength === 0) && (_r = new Int32Array(he.memory.buffer)), _r;
}
function um(e, t) {
  return e = e >>> 0, Fd().subarray(e / 1, e / 1 + t);
}
const dm = Object.freeze({
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
class Mt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Mt.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    he.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = he.__wbindgen_add_to_stack_pointer(-16);
      he.instruction_to_bytes(s, this.__wbg_ptr);
      var t = Zc()[s / 4 + 0], n = Zc()[s / 4 + 1], r = um(t, n).slice();
      return he.__wbindgen_free(t, n * 1, 1), r;
    } finally {
      he.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return he.instruction_size() >>> 0;
  }
}
class ke {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(ke.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    he.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = he.regid_new_checked(t);
    return n === 0 ? void 0 : ke.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = he.regid_bal();
    return ke.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = he.regid_cgas();
    return ke.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = he.regid_err();
    return ke.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = he.regid_flag();
    return ke.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = he.regid_fp();
    return ke.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = he.regid_ggas();
    return ke.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = he.regid_hp();
    return ke.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = he.regid_is();
    return ke.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = he.regid_of();
    return ke.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = he.regid_one();
    return ke.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = he.regid_pc();
    return ke.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = he.regid_ret();
    return ke.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = he.regid_retl();
    return ke.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = he.regid_sp();
    return ke.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = he.regid_spp();
    return ke.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = he.regid_writable();
    return ke.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = he.regid_zero();
    return ke.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = he.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return he.regid_to_u8(t);
  }
}
async function lm(e, t) {
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
function hm() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(im(t, n));
  }, e;
}
function fm(e, t) {
  return he = e.exports, Rd.__wbindgen_wasm_module = t, _r = null, Nr = null, he;
}
async function Rd(e) {
  if (he !== void 0)
    return he;
  const t = hm(), { instance: n, module: r } = await lm(await e, t);
  return fm(n, r);
}
function gm(e, t, n, r) {
  function s(E, C, D) {
    var F = D ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, b = D ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? F(E, C) : b(E);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var a = globalThis.atob(n), d = a.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var h = 0; h < d; h++)
      i[h] = a.charCodeAt(h);
  }
  if (e) {
    var I = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(I, r) : I;
  } else
    return s(i, r, !1);
}
function pm(e) {
  return gm(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function wa() {
  return await Rd(pm());
}
wa();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gt = BigInt(0), Oe = BigInt(1), Rn = BigInt(2), mm = BigInt(3), Fo = BigInt(4), Yc = BigInt(5), Vc = BigInt(8);
BigInt(9);
BigInt(16);
function bt(e, t) {
  const n = e % t;
  return n >= gt ? n : t + n;
}
function wm(e, t, n) {
  if (n <= gt || t < gt)
    throw new Error("Expected power/modulo > 0");
  if (n === Oe)
    return gt;
  let r = Oe;
  for (; t > gt; )
    t & Oe && (r = r * e % n), e = e * e % n, t >>= Oe;
  return r;
}
function Nt(e, t, n) {
  let r = e;
  for (; t-- > gt; )
    r *= r, r %= n;
  return r;
}
function Do(e, t) {
  if (e === gt || t <= gt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = bt(e, t), r = t, s = gt, i = Oe;
  for (; n !== gt; ) {
    const a = r / n, d = r % n, h = s - i * a;
    r = n, n = d, s = i, i = h;
  }
  if (r !== Oe)
    throw new Error("invert: does not exist");
  return bt(s, t);
}
function Em(e) {
  const t = (e - Oe) / Rn;
  let n, r, s;
  for (n = e - Oe, r = 0; n % Rn === gt; n /= Rn, r++)
    ;
  for (s = Rn; s < e && wm(s, t, e) !== e - Oe; s++)
    ;
  if (r === 1) {
    const o = (e + Oe) / Fo;
    return function(d, h) {
      const I = d.pow(h, o);
      if (!d.eql(d.sqr(I), h))
        throw new Error("Cannot find square root");
      return I;
    };
  }
  const i = (n + Oe) / Rn;
  return function(a, d) {
    if (a.pow(d, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let h = r, I = a.pow(a.mul(a.ONE, s), n), E = a.pow(d, i), C = a.pow(d, n);
    for (; !a.eql(C, a.ONE); ) {
      if (a.eql(C, a.ZERO))
        return a.ZERO;
      let D = 1;
      for (let b = a.sqr(C); D < h && !a.eql(b, a.ONE); D++)
        b = a.sqr(b);
      const F = a.pow(I, Oe << BigInt(h - D - 1));
      I = a.sqr(F), E = a.mul(E, F), C = a.mul(C, I), h = D;
    }
    return E;
  };
}
function Im(e) {
  if (e % Fo === mm) {
    const t = (e + Oe) / Fo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % Vc === Yc) {
    const t = (e - Yc) / Vc;
    return function(r, s) {
      const i = r.mul(s, Rn), o = r.pow(i, t), a = r.mul(s, o), d = r.mul(r.mul(a, Rn), o), h = r.mul(a, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return Em(e);
}
const ym = [
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
function Bm(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = ym.reduce((r, s) => (r[s] = "function", r), t);
  return $r(e, n);
}
function Cm(e, t, n) {
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
function bm(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, a) => e.is0(o) ? i : (n[a] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (n[a] = e.mul(i, n[a]), e.mul(i, o)), s), n;
}
function Nd(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Qm(e, t, n = !1, r = {}) {
  if (e <= gt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Nd(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Im(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: ga(s),
    ZERO: gt,
    ONE: Oe,
    create: (d) => bt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return gt <= d && d < e;
    },
    is0: (d) => d === gt,
    isOdd: (d) => (d & Oe) === Oe,
    neg: (d) => bt(-d, e),
    eql: (d, h) => d === h,
    sqr: (d) => bt(d * d, e),
    add: (d, h) => bt(d + h, e),
    sub: (d, h) => bt(d - h, e),
    mul: (d, h) => bt(d * h, e),
    pow: (d, h) => Cm(a, d, h),
    div: (d, h) => bt(d * Do(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, h) => d + h,
    subN: (d, h) => d - h,
    mulN: (d, h) => d * h,
    inv: (d) => Do(d, e),
    sqrt: r.sqrt || ((d) => o(a, d)),
    invertBatch: (d) => bm(a, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, h, I) => I ? h : d,
    toBytes: (d) => n ? fa(d, i) : gr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? ha(d) : _n(d);
    }
  });
  return Object.freeze(a);
}
function Sd(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function _d(e) {
  const t = Sd(e);
  return t + Math.ceil(t / 2);
}
function xm(e, t, n = !1) {
  const r = e.length, s = Sd(t), i = _d(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? _n(e) : ha(e), a = bt(o, t - Oe) + Oe;
  return n ? fa(a, s) : gr(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const vm = BigInt(0), Vi = BigInt(1);
function Fm(e, t) {
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
      let o = e.ZERO, a = s;
      for (; i > vm; )
        i & Vi && (o = o.add(a)), a = a.double(), i >>= Vi;
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
      const { windows: o, windowSize: a } = r(i), d = [];
      let h = s, I = h;
      for (let E = 0; E < o; E++) {
        I = h, d.push(I);
        for (let C = 1; C < a; C++)
          I = I.add(h), d.push(I);
        h = I.double();
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
      const { windows: a, windowSize: d } = r(s);
      let h = e.ZERO, I = e.BASE;
      const E = BigInt(2 ** s - 1), C = 2 ** s, D = BigInt(s);
      for (let F = 0; F < a; F++) {
        const b = F * d;
        let N = Number(o & E);
        o >>= D, N > d && (N -= C, o += Vi);
        const S = b, Z = b + Math.abs(N) - 1, T = F % 2 !== 0, j = N < 0;
        N === 0 ? I = I.add(n(T, i[S])) : h = h.add(n(j, i[Z]));
      }
      return { p: h, f: I };
    },
    wNAFCached(s, i, o, a) {
      const d = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, d), d !== 1 && i.set(s, a(h))), this.wNAF(d, h, o);
    }
  };
}
function kd(e) {
  return Bm(e.Fp), $r(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Nd(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Dm(e) {
  const t = kd(e);
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
const { bytesToNumberBE: Rm, hexToBytes: Nm } = Sg, Sn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Sn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Rm(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Sn, n = typeof e == "string" ? Nm(e) : e;
    if (!jt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Sn._parseInt(n.subarray(2)), { d: o, l: a } = Sn._parseInt(i);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const I = h.toString(16);
      return I.length & 1 ? `0${I}` : I;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, a = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${a}${r}`;
  }
}, en = BigInt(0), St = BigInt(1);
BigInt(2);
const Xc = BigInt(3);
BigInt(4);
function Sm(e) {
  const t = Dm(e), { Fp: n } = t, r = t.toBytes || ((F, b, N) => {
    const S = b.toAffine();
    return Lr(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = t.fromBytes || ((F) => {
    const b = F.subarray(1), N = n.fromBytes(b.subarray(0, n.BYTES)), S = n.fromBytes(b.subarray(n.BYTES, 2 * n.BYTES));
    return { x: N, y: S };
  });
  function i(F) {
    const { a: b, b: N } = t, S = n.sqr(F), Z = n.mul(S, F);
    return n.add(n.add(Z, n.mul(F, b)), N);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(F) {
    return typeof F == "bigint" && en < F && F < t.n;
  }
  function a(F) {
    if (!o(F))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(F) {
    const { allowedPrivateKeyLengths: b, nByteLength: N, wrapPrivateKey: S, n: Z } = t;
    if (b && typeof F != "bigint") {
      if (jt(F) && (F = hr(F)), typeof F != "string" || !b.includes(F.length))
        throw new Error("Invalid key");
      F = F.padStart(N * 2, "0");
    }
    let T;
    try {
      T = typeof F == "bigint" ? F : _n(Tt("private key", F, N));
    } catch {
      throw new Error(`private key must be ${N} bytes, hex or bigint, not ${typeof F}`);
    }
    return S && (T = bt(T, Z)), a(T), T;
  }
  const h = /* @__PURE__ */ new Map();
  function I(F) {
    if (!(F instanceof E))
      throw new Error("ProjectivePoint expected");
  }
  class E {
    constructor(b, N, S) {
      if (this.px = b, this.py = N, this.pz = S, b == null || !n.isValid(b))
        throw new Error("x required");
      if (N == null || !n.isValid(N))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: N, y: S } = b || {};
      if (!b || !n.isValid(N) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (b instanceof E)
        throw new Error("projective point not allowed");
      const Z = (T) => n.eql(T, n.ZERO);
      return Z(N) && Z(S) ? E.ZERO : new E(N, S, n.ONE);
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
      const N = n.invertBatch(b.map((S) => S.pz));
      return b.map((S, Z) => S.toAffine(N[Z])).map(E.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const N = E.fromAffine(s(Tt("pointHex", b)));
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
      const S = n.sqr(N), Z = i(b);
      if (!n.eql(S, Z))
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
      I(b);
      const { px: N, py: S, pz: Z } = this, { px: T, py: j, pz: M } = b, k = n.eql(n.mul(N, M), n.mul(T, Z)), O = n.eql(n.mul(S, M), n.mul(j, Z));
      return k && O;
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
      const { a: b, b: N } = t, S = n.mul(N, Xc), { px: Z, py: T, pz: j } = this;
      let M = n.ZERO, k = n.ZERO, O = n.ZERO, P = n.mul(Z, Z), W = n.mul(T, T), U = n.mul(j, j), H = n.mul(Z, T);
      return H = n.add(H, H), O = n.mul(Z, j), O = n.add(O, O), M = n.mul(b, O), k = n.mul(S, U), k = n.add(M, k), M = n.sub(W, k), k = n.add(W, k), k = n.mul(M, k), M = n.mul(H, M), O = n.mul(S, O), U = n.mul(b, U), H = n.sub(P, U), H = n.mul(b, H), H = n.add(H, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, U), P = n.mul(P, H), k = n.add(k, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, H), M = n.sub(M, P), O = n.mul(U, W), O = n.add(O, O), O = n.add(O, O), new E(M, k, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      I(b);
      const { px: N, py: S, pz: Z } = this, { px: T, py: j, pz: M } = b;
      let k = n.ZERO, O = n.ZERO, P = n.ZERO;
      const W = t.a, U = n.mul(t.b, Xc);
      let H = n.mul(N, T), z = n.mul(S, j), B = n.mul(Z, M), c = n.add(N, S), A = n.add(T, j);
      c = n.mul(c, A), A = n.add(H, z), c = n.sub(c, A), A = n.add(N, Z);
      let l = n.add(T, M);
      return A = n.mul(A, l), l = n.add(H, B), A = n.sub(A, l), l = n.add(S, Z), k = n.add(j, M), l = n.mul(l, k), k = n.add(z, B), l = n.sub(l, k), P = n.mul(W, A), k = n.mul(U, B), P = n.add(k, P), k = n.sub(z, P), P = n.add(z, P), O = n.mul(k, P), z = n.add(H, H), z = n.add(z, H), B = n.mul(W, B), A = n.mul(U, A), z = n.add(z, B), B = n.sub(H, B), B = n.mul(W, B), A = n.add(A, B), H = n.mul(z, A), O = n.add(O, H), H = n.mul(l, A), k = n.mul(c, k), k = n.sub(k, H), H = n.mul(c, z), P = n.mul(l, P), P = n.add(P, H), new E(k, O, P);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(E.ZERO);
    }
    wNAF(b) {
      return D.wNAFCached(this, h, b, (N) => {
        const S = n.invertBatch(N.map((Z) => Z.pz));
        return N.map((Z, T) => Z.toAffine(S[T])).map(E.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const N = E.ZERO;
      if (b === en)
        return N;
      if (a(b), b === St)
        return this;
      const { endo: S } = t;
      if (!S)
        return D.unsafeLadder(this, b);
      let { k1neg: Z, k1: T, k2neg: j, k2: M } = S.splitScalar(b), k = N, O = N, P = this;
      for (; T > en || M > en; )
        T & St && (k = k.add(P)), M & St && (O = O.add(P)), P = P.double(), T >>= St, M >>= St;
      return Z && (k = k.negate()), j && (O = O.negate()), O = new E(n.mul(O.px, S.beta), O.py, O.pz), k.add(O);
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
      a(b);
      let N = b, S, Z;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: M, k2neg: k, k2: O } = T.splitScalar(N);
        let { p: P, f: W } = this.wNAF(M), { p: U, f: H } = this.wNAF(O);
        P = D.constTimeNegate(j, P), U = D.constTimeNegate(k, U), U = new E(n.mul(U.px, T.beta), U.py, U.pz), S = P.add(U), Z = W.add(H);
      } else {
        const { p: j, f: M } = this.wNAF(N);
        S = j, Z = M;
      }
      return E.normalizeZ([S, Z])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(b, N, S) {
      const Z = E.BASE, T = (M, k) => k === en || k === St || !M.equals(Z) ? M.multiplyUnsafe(k) : M.multiply(k), j = T(this, N).add(T(b, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      const { px: N, py: S, pz: Z } = this, T = this.is0();
      b == null && (b = T ? n.ONE : n.inv(Z));
      const j = n.mul(N, b), M = n.mul(S, b), k = n.mul(Z, b);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(k, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: M };
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: N } = t;
      if (b === St)
        return !0;
      if (N)
        return N(E, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: N } = t;
      return b === St ? this : N ? N(E, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(b = !0) {
      return this.assertValidity(), r(E, this, b);
    }
    toHex(b = !0) {
      return hr(this.toRawBytes(b));
    }
  }
  E.BASE = new E(t.Gx, t.Gy, n.ONE), E.ZERO = new E(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, D = Fm(E, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: E,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function _m(e) {
  const t = kd(e);
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
function km(e) {
  const t = _m(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return en < A && A < n.ORDER;
  }
  function a(A) {
    return bt(A, r);
  }
  function d(A) {
    return Do(A, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: I, weierstrassEquation: E, isWithinCurveOrder: C } = Sm({
    ...t,
    toBytes(A, l, p) {
      const f = l.toAffine(), w = n.toBytes(f.x), y = Lr;
      return p ? y(Uint8Array.from([l.hasEvenY() ? 2 : 3]), w) : y(Uint8Array.from([4]), w, n.toBytes(f.y));
    },
    fromBytes(A) {
      const l = A.length, p = A[0], f = A.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const w = _n(f);
        if (!o(w))
          throw new Error("Point is not on curve");
        const y = E(w);
        let g = n.sqrt(y);
        const u = (g & St) === St;
        return (p & 1) === 1 !== u && (g = n.neg(g)), { x: w, y: g };
      } else if (l === i && p === 4) {
        const w = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: w, y };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), D = (A) => hr(gr(A, t.nByteLength));
  function F(A) {
    const l = r >> St;
    return A > l;
  }
  function b(A) {
    return F(A) ? a(-A) : A;
  }
  const N = (A, l, p) => _n(A.slice(l, p));
  class S {
    constructor(l, p, f) {
      this.r = l, this.s = p, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Tt("compactSignature", l, p * 2), new S(N(l, 0, p), N(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: f } = Sn.toSig(Tt("DER", l));
      return new S(p, f);
    }
    assertValidity() {
      if (!C(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!C(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new S(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: f, recovery: w } = this, y = O(Tt("msgHash", l));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const g = w === 2 || w === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = w & 1 ? "03" : "02", m = h.fromHex(u + D(g)), Y = d(g), V = a(-y * Y), $ = a(f * Y), q = h.BASE.multiplyAndAddUnsafe(m, V, $);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return F(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return fr(this.toDERHex());
    }
    toDERHex() {
      return Sn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return fr(this.toCompactHex());
    }
    toCompactHex() {
      return D(this.r) + D(this.s);
    }
  }
  const Z = {
    isValidPrivateKey(A) {
      try {
        return I(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: I,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = _d(t.n);
      return xm(t.randomBytes(A), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(A = 8, l = h.BASE) {
      return l._setWindowSize(A), l.multiply(BigInt(3)), l;
    }
  };
  function T(A, l = !0) {
    return h.fromPrivateKey(A).toRawBytes(l);
  }
  function j(A) {
    const l = jt(A), p = typeof A == "string", f = (l || p) && A.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : A instanceof h;
  }
  function M(A, l, p = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(I(A)).toRawBytes(p);
  }
  const k = t.bits2int || function(A) {
    const l = _n(A), p = A.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, O = t.bits2int_modN || function(A) {
    return a(k(A));
  }, P = ga(t.nBitLength);
  function W(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(en <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return gr(A, t.nByteLength);
  }
  function U(A, l, p = H) {
    if (["recovered", "canonical"].some((ne) => ne in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: w } = t;
    let { lowS: y, prehash: g, extraEntropy: u } = p;
    y == null && (y = !0), A = Tt("msgHash", A), g && (A = Tt("prehashed msgHash", f(A)));
    const m = O(A), Y = I(l), V = [W(Y), W(m)];
    if (u != null) {
      const ne = u === !0 ? w(n.BYTES) : u;
      V.push(Tt("extraEntropy", ne));
    }
    const $ = Lr(...V), q = m;
    function te(ne) {
      const Se = k(ne);
      if (!C(Se))
        return;
      const fe = d(Se), ae = h.BASE.multiply(Se).toAffine(), De = a(ae.x);
      if (De === en)
        return;
      const le = a(fe * a(q + De * Y));
      if (le === en)
        return;
      let ge = (ae.x === De ? 0 : 2) | Number(ae.y & St), Ht = le;
      return y && F(le) && (Ht = b(le), ge ^= 1), new S(De, Ht, ge);
    }
    return { seed: $, k2sig: te };
  }
  const H = { lowS: t.lowS, prehash: !1 }, z = { lowS: t.lowS, prehash: !1 };
  function B(A, l, p = H) {
    const { seed: f, k2sig: w } = U(A, l, p), y = t;
    return id(y.hash.outputLen, y.nByteLength, y.hmac)(f, w);
  }
  h.BASE._setWindowSize(8);
  function c(A, l, p, f = z) {
    var ae;
    const w = A;
    if (l = Tt("msgHash", l), p = Tt("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: g } = f;
    let u, m;
    try {
      if (typeof w == "string" || jt(w))
        try {
          u = S.fromDER(w);
        } catch (De) {
          if (!(De instanceof Sn.Err))
            throw De;
          u = S.fromCompact(w);
        }
      else if (typeof w == "object" && typeof w.r == "bigint" && typeof w.s == "bigint") {
        const { r: De, s: le } = w;
        u = new S(De, le);
      } else
        throw new Error("PARSE");
      m = h.fromHex(p);
    } catch (De) {
      if (De.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: Y, s: V } = u, $ = O(l), q = d(V), te = a($ * q), ne = a(Y * q), Se = (ae = h.BASE.multiplyAndAddUnsafe(m, te, ne)) == null ? void 0 : ae.toAffine();
    return Se ? a(Se.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: M,
    sign: B,
    verify: c,
    ProjectivePoint: h,
    Signature: S,
    utils: Z
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Mm(e) {
  return {
    hash: e,
    hmac: (t, ...n) => $o(e, t, Uh(...n)),
    randomBytes: Hh
  };
}
function Om(e, t) {
  const n = (r) => km({ ...e, ...Mm(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Md = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), jc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Lm = BigInt(1), Ro = BigInt(2), qc = (e, t) => (e + t / Ro) / t;
function Tm(e) {
  const t = Md, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), d = BigInt(88), h = e * e * e % t, I = h * h * e % t, E = Nt(I, n, t) * I % t, C = Nt(E, n, t) * I % t, D = Nt(C, Ro, t) * h % t, F = Nt(D, s, t) * D % t, b = Nt(F, i, t) * F % t, N = Nt(b, a, t) * b % t, S = Nt(N, d, t) * N % t, Z = Nt(S, a, t) * b % t, T = Nt(Z, n, t) * I % t, j = Nt(T, o, t) * F % t, M = Nt(j, r, t) * h % t, k = Nt(M, Ro, t);
  if (!No.eql(No.sqr(k), e))
    throw new Error("Cannot find square root");
  return k;
}
const No = Qm(Md, void 0, void 0, { sqrt: Tm }), un = Om({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: No,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: jc,
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
      const t = jc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Lm * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), a = qc(i * e, t), d = qc(-r * e, t);
      let h = bt(e - a * n - d * s, t), I = bt(-a * r - d * i, t);
      const E = h > o, C = I > o;
      if (E && (h = t - h), C && (I = t - I), h > o || I > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: E, k1: h, k2neg: C, k2: I };
    }
  }
}, qr);
BigInt(0);
un.ProjectivePoint;
let hs;
const Pm = new Uint8Array(16);
function Um() {
  if (!hs && (hs = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !hs))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return hs(Pm);
}
const pt = [];
for (let e = 0; e < 256; ++e)
  pt.push((e + 256).toString(16).slice(1));
function Gm(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
const Hm = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Wc = {
  randomUUID: Hm
};
function Jm(e, t, n) {
  if (Wc.randomUUID && !t && !e)
    return Wc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || Um)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return Gm(r);
}
var Ea = { exports: {} }, $n = typeof Reflect == "object" ? Reflect : null, $c = $n && typeof $n.apply == "function" ? $n.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Qs;
$n && typeof $n.ownKeys == "function" ? Qs = $n.ownKeys : Object.getOwnPropertySymbols ? Qs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Qs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Zm(e) {
  console && console.warn && console.warn(e);
}
var Od = Number.isNaN || function(t) {
  return t !== t;
};
function xe() {
  xe.init.call(this);
}
Ea.exports = xe;
Ea.exports.once = jm;
xe.EventEmitter = xe;
xe.prototype._events = void 0;
xe.prototype._eventsCount = 0;
xe.prototype._maxListeners = void 0;
var Kc = 10;
function gi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(xe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Kc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Od(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Kc = e;
  }
});
xe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
xe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Od(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Ld(e) {
  return e._maxListeners === void 0 ? xe.defaultMaxListeners : e._maxListeners;
}
xe.prototype.getMaxListeners = function() {
  return Ld(this);
};
xe.prototype.emit = function(t) {
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
    var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw a.context = o, a;
  }
  var d = i[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    $c(d, this, n);
  else
    for (var h = d.length, I = Hd(d, h), r = 0; r < h; ++r)
      $c(I[r], this, n);
  return !0;
};
function Td(e, t, n, r) {
  var s, i, o;
  if (gi(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Ld(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, Zm(a);
  }
  return e;
}
xe.prototype.addListener = function(t, n) {
  return Td(this, t, n, !1);
};
xe.prototype.on = xe.prototype.addListener;
xe.prototype.prependListener = function(t, n) {
  return Td(this, t, n, !0);
};
function Ym() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Pd(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = Ym.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
xe.prototype.once = function(t, n) {
  return gi(n), this.on(t, Pd(this, t, n)), this;
};
xe.prototype.prependOnceListener = function(t, n) {
  return gi(n), this.prependListener(t, Pd(this, t, n)), this;
};
xe.prototype.removeListener = function(t, n) {
  var r, s, i, o, a;
  if (gi(n), s = this._events, s === void 0)
    return this;
  if (r = s[t], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[t], s.removeListener && this.emit("removeListener", t, r.listener || n));
  else if (typeof r != "function") {
    for (i = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        a = r[o].listener, i = o;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? r.shift() : Vm(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || n);
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
function Ud(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? Xm(s) : Hd(s, s.length);
}
xe.prototype.listeners = function(t) {
  return Ud(this, t, !0);
};
xe.prototype.rawListeners = function(t) {
  return Ud(this, t, !1);
};
xe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Gd.call(e, t);
};
xe.prototype.listenerCount = Gd;
function Gd(e) {
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
  return this._eventsCount > 0 ? Qs(this._events) : [];
};
function Hd(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function Vm(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Xm(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function jm(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    Jd(e, t, i, { once: !0 }), t !== "error" && qm(e, s, { once: !0 });
  });
}
function qm(e, t, n) {
  typeof e.on == "function" && Jd(e, "error", t, n);
}
function Jd(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var Zd = Ea.exports, Wm = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", $m = class {
  constructor(e, t, n, r, s, i = 0) {
    x(this, "left");
    x(this, "right");
    x(this, "parent");
    x(this, "hash");
    x(this, "data");
    x(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, zc = $m;
function Km(e) {
  return nn("0x00".concat(e.slice(2)));
}
function zm(e, t) {
  return nn("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function Yd(e) {
  if (!e.length)
    return Wm;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = Km(e[i]);
    t.push(new zc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, a = zm(n[o].hash, n[o + 1].hash);
      t[i] = new zc(n[o].index, n[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var ew = "0x00", Vd = "0x01";
function tw(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(nn(t).slice(2));
  return [nn(n), n];
}
function Ln(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [nn(n), n];
}
function Xi(e) {
  const t = Vd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function nw(e) {
  const t = Vd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function ji(e) {
  return e.slice(0, 4) === ew;
}
var rw = class {
  constructor(e, t, n, r, s) {
    x(this, "SideNodes");
    x(this, "NonMembershipLeafData");
    x(this, "BitMask");
    x(this, "NumSideNodes");
    x(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, sw = rw, iw = class {
  constructor(e, t, n) {
    x(this, "SideNodes");
    x(this, "NonMembershipLeafData");
    x(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, ow = iw, Ft = "0x0000000000000000000000000000000000000000000000000000000000000000", Kt = 256;
function Vn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function aw(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function cw(e, t) {
  let n = 0;
  for (let r = 0; r < Kt && Vn(e, r) === Vn(t, r); r += 1)
    n += 1;
  return n;
}
function Aw(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Ft ? t.push(0) : (n.push(r), t.push(1));
  return new sw(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var uw = class {
  constructor() {
    x(this, "ms");
    x(this, "root");
    const e = {};
    this.ms = e, this.root = Ft, this.ms[this.root] = Ft;
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
    if (t === Ft)
      return [n, Ft, "", ""];
    let r = this.get(t);
    if (ji(r))
      return [n, t, r, ""];
    let s, i, o = "", a = "";
    for (let h = 0; h < Kt; h += 1) {
      if ([s, i] = nw(r), Vn(e, h) === 1 ? (a = s, o = i) : (a = i, o = s), n.push(a), o === Ft) {
        r = "";
        break;
      }
      if (r = this.get(o), ji(r))
        break;
    }
    const d = this.get(a);
    return [aw(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Ft)
      return this.root;
    const [s] = Xi(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", d = "", h = !1;
    for (let I = 0; I < t.length; I += 1)
      if (t[I] !== "") {
        if (a = t[I], o === "")
          if (d = this.get(a), ji(d)) {
            i = a, o = a;
            continue;
          } else
            o = Ft, h = !0;
        !h && a === Ft || (h || (h = !0), Vn(e, t.length - 1 - I) === 1 ? [i, o] = Ln(a, o) : [i, o] = Ln(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Ft), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(nn(t), t), [i, o] = tw(e, t), this.set(i, o), o = i;
    let a;
    if (r === Ft)
      a = Kt;
    else {
      const [d] = Xi(s);
      a = cw(e, d);
    }
    a !== Kt && (Vn(e, a) === 1 ? [i, o] = Ln(r, o) : [i, o] = Ln(o, r), this.set(i, o), o = i);
    for (let d = 0; d < Kt; d += 1) {
      let h;
      const I = Kt - n.length;
      if (d - I < 0 || n[d - I] === "")
        if (a !== Kt && a > Kt - 1 - d)
          h = Ft;
        else
          continue;
      else
        h = n[d - I];
      Vn(e, Kt - 1 - d) === 1 ? [i, o] = Ln(h, o) : [i, o] = Ln(o, h), this.set(i, o), o = i;
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
    if (n !== Ft) {
      const [d] = Xi(r);
      d !== e && (o = r);
    }
    return new ow(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return Aw(t);
  }
}, Ia = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? mt, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? mt, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: X(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, dw = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, ya = Ae`
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
    `, Ba = Ae`
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
    `, ts = Ae`
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
    ${ya}
${Ba}`, lw = Ae`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, hw = Ae`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${lw}`, Ca = Ae`
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
    `, fw = Ae`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, gw = Ae`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, pw = Ae`
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
    `, Xd = Ae`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, pi = Ae`
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
    `, mw = Ae`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, ww = Ae`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Ew = Ae`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, Iw = Ae`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, yw = Ae`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, Bw = Ae`
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
    `, Cw = Ae`
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
    ${Bw}`, bw = Ae`
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
    ${mw}
${ww}
${Ew}
${Iw}
${yw}
${Cw}`, Qw = Ae`
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
${bw}`, xw = Ae`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, vw = Ae`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, Fw = Ae`
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
    `, Dw = Ae`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Rw = Ae`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${Fw}`, Nw = Ae`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Qw}`, Sw = Ae`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ts}`, _w = Ae`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${ts}
${ya}`, kw = Ae`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${ts}`, Mw = Ae`
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
    ${vw}
${ts}`, Ow = Ae`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${hw}`, Lw = Ae`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${pi}`, Tw = Ae`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${pi}
${ts}`, Pw = Ae`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${pi}`, Uw = Ae`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${Ca}`, Gw = Ae`
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
    ${Ca}`, Hw = Ae`
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
    ${Ca}
${fw}`, Jw = Ae`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Zw = Ae`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${xw}`, Yw = Ae`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${Xd}`, Vw = Ae`
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
    ${Xd}`, Xw = Ae`
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
    ${gw}`, jw = Ae`
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
    ${pw}`, qw = Ae`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Ww = Ae`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${ya}`, $w = Ae`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, Kw = Ae`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, zw = Ae`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${Ba}`, eE = Ae`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${Ba}`;
function tE(e) {
  return {
    getVersion(t, n) {
      return e(Dw, t, n);
    },
    getNodeInfo(t, n) {
      return e(Rw, t, n);
    },
    getChain(t, n) {
      return e(Nw, t, n);
    },
    getTransaction(t, n) {
      return e(Sw, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(_w, t, n);
    },
    getTransactions(t, n) {
      return e(kw, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Mw, t, n);
    },
    estimatePredicates(t, n) {
      return e(Ow, t, n);
    },
    getBlock(t, n) {
      return e(Lw, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(Tw, t, n);
    },
    getBlocks(t, n) {
      return e(Pw, t, n);
    },
    getCoin(t, n) {
      return e(Uw, t, n);
    },
    getCoins(t, n) {
      return e(Gw, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(Hw, t, n);
    },
    getContract(t, n) {
      return e(Jw, t, n);
    },
    getContractBalance(t, n) {
      return e(Zw, t, n);
    },
    getBalance(t, n) {
      return e(Yw, t, n);
    },
    getBalances(t, n) {
      return e(Vw, t, n);
    },
    getMessages(t, n) {
      return e(Xw, t, n);
    },
    getMessageProof(t, n) {
      return e(jw, t, n);
    },
    getMessageStatus(t, n) {
      return e(qw, t, n);
    },
    dryRun(t, n) {
      return e(Ww, t, n);
    },
    submit(t, n) {
      return e($w, t, n);
    },
    produceBlocks(t, n) {
      return e(Kw, t, n);
    },
    submitAndAwait(t, n) {
      return e(zw, t, n);
    },
    statusChange(t, n) {
      return e(eE, t, n);
    }
  };
}
var ar, nE = (ar = class {
  constructor(t) {
    x(this, "stream");
    this.options = t;
  }
  async setStream() {
    const { url: t, query: n, variables: r, fetchFn: s } = this.options, i = await s(`${t}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: wd(n),
        variables: r
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    });
    this.stream = i.body.getReader();
  }
  async next() {
    for (this.stream || await this.setStream(); ; ) {
      const { value: t, done: n } = await this.stream.read();
      if (n)
        return { value: t, done: n };
      const r = ar.textDecoder.decode(t);
      if (!r.startsWith("data:"))
        continue;
      let s, i;
      try {
        ({ data: s, errors: i } = JSON.parse(r.replace(/^data:/, "")));
      } catch {
        throw new v(
          R.STREAM_PARSING_ERROR,
          `Error while parsing stream data response: ${r}`
        );
      }
      if (Array.isArray(i))
        throw new v(
          v.CODES.INVALID_REQUEST,
          i.map((o) => o.message).join(`

`)
        );
      return { value: s, done: !1 };
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
}, x(ar, "textDecoder", new TextDecoder()), ar), xn = {}, rE = 30 * 1e3, sE = class {
  constructor(e = rE) {
    x(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        R.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = X(e);
    if (xn[n]) {
      if (!t || xn[n].expires > Date.now())
        return xn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = X(e);
    return xn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(xn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(xn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = X(e);
    delete xn[t];
  }
}, iE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ee.Coin: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x");
      return {
        type: Ee.Coin,
        txID: X(J(e.id).slice(0, 32)),
        outputIndex: J(e.id)[32],
        owner: X(e.owner),
        amount: Q(e.amount),
        assetId: X(e.assetId),
        txPointer: {
          blockHeight: kt(J(e.txPointer).slice(0, 8)),
          txIndex: kt(J(e.txPointer).slice(8, 16))
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
    case Ee.Contract:
      return {
        type: Ee.Contract,
        txID: Ne,
        outputIndex: 0,
        balanceRoot: Ne,
        stateRoot: Ne,
        txPointer: {
          blockHeight: kt(J(e.txPointer).slice(0, 8)),
          txIndex: kt(J(e.txPointer).slice(8, 16))
        },
        contractID: X(e.contractId)
      };
    case Ee.Message: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x"), s = J(e.data ?? "0x");
      return {
        type: Ee.Message,
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
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, oE = (e) => {
  const { type: t } = e;
  switch (t) {
    case Ce.Coin:
      return {
        type: Ce.Coin,
        to: X(e.to),
        amount: Q(e.amount),
        assetId: X(e.assetId)
      };
    case Ce.Contract:
      return {
        type: Ce.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Ne,
        stateRoot: Ne
      };
    case Ce.Change:
      return {
        type: Ce.Change,
        to: X(e.to),
        amount: Q(0),
        assetId: X(e.assetId)
      };
    case Ce.Variable:
      return {
        type: Ce.Variable,
        to: Ne,
        amount: Q(0),
        assetId: Ne
      };
    case Ce.ContractCreated:
      return {
        type: Ce.ContractCreated,
        contractId: X(e.contractId),
        stateRoot: X(e.stateRoot)
      };
    default:
      throw new v(
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, Yy = (e) => "utxoId" in e, Vy = (e) => "recipient" in e, eA = (e) => "id" in e, Xy = (e) => "recipient" in e, aE = (e) => e.type === de.Revert && e.val.toString("hex") === zu, cE = (e) => e.type === de.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", AE = (e) => e.reduce(
  (t, n) => (aE(n) && t.missingOutputVariables.push(n), cE(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), Fe = (e) => e || Ne;
function uE(e) {
  var n, r, s, i, o, a, d, h, I, E, C, D, F, b;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: de.Call,
        from: Fe((n = e.contract) == null ? void 0 : n.id),
        to: Fe((r = e == null ? void 0 : e.to) == null ? void 0 : r.id),
        amount: Q(e.amount),
        assetId: Fe(e.assetId),
        gas: Q(e.gas),
        param1: Q(e.param1),
        param2: Q(e.param2),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN":
      return {
        type: de.Return,
        id: Fe((s = e.contract) == null ? void 0 : s.id),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: de.ReturnData,
        id: Fe((i = e.contract) == null ? void 0 : i.id),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: Fe(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: de.Panic,
        id: Fe((o = e.contract) == null ? void 0 : o.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: Fe(e.contractId)
      };
    case "REVERT":
      return {
        type: de.Revert,
        id: Fe((a = e.contract) == null ? void 0 : a.id),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: de.Log,
        id: Fe((d = e.contract) == null ? void 0 : d.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        val2: Q(e.rc),
        val3: Q(e.rd),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG_DATA":
      return {
        type: de.LogData,
        id: Fe((h = e.contract) == null ? void 0 : h.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: Fe(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER":
      return {
        type: de.Transfer,
        from: Fe((I = e.contract) == null ? void 0 : I.id),
        to: Fe(e.toAddress || ((E = e == null ? void 0 : e.to) == null ? void 0 : E.id)),
        amount: Q(e.amount),
        assetId: Fe(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: de.TransferOut,
        from: Fe((C = e.contract) == null ? void 0 : C.id),
        to: Fe(e.toAddress || ((D = e.to) == null ? void 0 : D.id)),
        amount: Q(e.amount),
        assetId: Fe(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: de.ScriptResult,
        result: Q(e.result),
        gasUsed: Q(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const N = Fe(e.sender), S = Fe(e.recipient), Z = Fe(e.nonce), T = Q(e.amount), j = e.data ? J(e.data) : Uint8Array.from([]), M = Fe(e.digest), k = Eo.getMessageId({
        sender: N,
        recipient: S,
        nonce: Z,
        amount: T,
        data: j
      });
      return {
        type: de.MessageOut,
        sender: N,
        recipient: S,
        amount: T,
        nonce: Z,
        data: j,
        digest: M,
        messageId: k
      };
    }
    case "MINT": {
      const N = Fe((F = e.contract) == null ? void 0 : F.id), S = Fe(e.subId), Z = Os.getAssetId(N, S);
      return {
        type: de.Mint,
        subId: S,
        contractId: N,
        assetId: Z,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const N = Fe((b = e.contract) == null ? void 0 : b.id), S = Fe(e.subId), Z = Io.getAssetId(N, S);
      return {
        type: de.Burn,
        subId: S,
        contractId: N,
        assetId: Z,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new v(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var dE = "https://fuellabs.github.io/block-explorer-v2", lE = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, jy = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, a = t || dE, d = [
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
  ], h = d.filter((j) => !!j.value).map(({ key: j, value: M }) => ({
    key: j,
    value: M
  })), I = h.length > 0;
  if (h.length > 1)
    throw new v(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const j = d.map(({ key: M }) => M).join(", ");
    throw new v(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const E = I ? lE(
    h[0].key,
    h[0].value
  ) : "", C = /^\/|\/$/gm, D = n ? n.replace(C, "") : E, F = a.replace(C, ""), b = r == null ? void 0 : r.replace(C, ""), N = b ? encodeURIComponent(b) : void 0, S = F.match(/^https?:\/\//) ? "" : "https://", Z = b != null && b.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${F}/${D}${N ? `?providerUrl=${Z}${N}` : ""}`;
}, Kn = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), jd = (e) => e.filter(
  (r) => r.type === de.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function En(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function hE(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    En(t, n.vmInitialization).add(En(J(o.predicate).length, n.contractRoot)).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function qd(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = En(i, t.vmInitialization), a = Q(i).mul(n), d = hE(r, i, t);
  return o.add(a).add(d).add(s).maxU64();
}
function ba(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function Wd({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = En(r, e.contractRoot), i = En(t, e.stateRoot), o = En(n, e.s256), a = Q(4 + 32 + 32 + 32), d = En(a, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function $d({
  gasCosts: e,
  txBytesSize: t
}) {
  return En(t, e.s256);
}
function So(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = X(e[t]);
        break;
      case "Array":
        e[t] = So(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = So(e[t]);
        break;
    }
  }), e;
}
function fE(e) {
  return So(Pr(e));
}
function gE(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var qy = class extends Error {
  constructor() {
    super(...arguments);
    x(this, "name", "ChangeOutputCollisionError");
    x(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, pE = class extends Error {
  constructor(t) {
    super();
    x(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, Wy = class extends Error {
  constructor(t) {
    super();
    x(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, mE = (e) => {
  const t = J(e);
  return {
    data: X(t),
    dataLength: t.length
  };
}, Qa = class Kd {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    gasPrice: t,
    maturity: n,
    maxFee: r,
    witnessLimit: s,
    inputs: i,
    outputs: o,
    witnesses: a
  } = {}) {
    /** Gas price for transaction */
    x(this, "gasPrice");
    /** Block until which tx cannot be included */
    x(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    x(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    x(this, "witnessLimit");
    /** List of inputs */
    x(this, "inputs", []);
    /** List of outputs */
    x(this, "outputs", []);
    /** List of witnesses */
    x(this, "witnesses", []);
    this.gasPrice = Q(t), this.maturity = n ?? 0, this.witnessLimit = s ? Q(s) : void 0, this.maxFee = r ? Q(r) : void 0, this.inputs = i ?? [], this.outputs = o ?? [], this.witnesses = a ?? [];
  }
  static getPolicyMeta(t) {
    let n = 0;
    const r = [];
    return t.gasPrice && (n += Lt.GasPrice, r.push({ data: t.gasPrice, type: Lt.GasPrice })), t.witnessLimit && (n += Lt.WitnessLimit, r.push({ data: t.witnessLimit, type: Lt.WitnessLimit })), t.maturity > 0 && (n += Lt.Maturity, r.push({ data: t.maturity, type: Lt.Maturity })), t.maxFee && (n += Lt.MaxFee, r.push({ data: t.maxFee, type: Lt.MaxFee })), {
      policyTypes: n,
      policies: r
    };
  }
  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
  getBaseTransaction() {
    var o, a, d;
    const t = ((o = this.inputs) == null ? void 0 : o.map(iE)) ?? [], n = ((a = this.outputs) == null ? void 0 : a.map(oE)) ?? [], r = ((d = this.witnesses) == null ? void 0 : d.map(mE)) ?? [], { policyTypes: s, policies: i } = Kd.getPolicyMeta(this);
    return {
      policyTypes: s,
      inputs: t,
      outputs: n,
      policies: i,
      witnesses: r,
      inputsCount: t.length,
      outputsCount: n.length,
      witnessesCount: r.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new bn().encode(this.toTransaction());
  }
  /**
   * @hidden
   *
   * Pushes an input to the list without any side effects and returns the index
   */
  pushInput(t) {
    return this.inputs.push(t), this.inputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes an output to the list without any side effects and returns the index
   */
  pushOutput(t) {
    return this.outputs.push(t), this.outputs.length - 1;
  }
  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   */
  createWitness() {
    return this.witnesses.push(se([Ne, Ne])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(t, n) {
    const r = me.fromAddressOrString(t), s = this.getCoinInputWitnessIndexByOwner(r);
    typeof s == "number" && this.updateWitness(s, n);
  }
  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(t, n) {
    if (!this.witnesses[t])
      throw new pE(t);
    this.witnesses[t] = n;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (t) => t.type === Ee.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ce.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ce.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(t) {
    const n = Dr(t), r = this.inputs.find((s) => {
      switch (s.type) {
        case Ee.Coin:
          return X(s.owner) === n.toB256();
        case Ee.Message:
          return X(s.recipient) === n.toB256();
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
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addCoinInput(t, n) {
    const { assetId: r, owner: s, amount: i } = t;
    let o;
    n ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(s), typeof o != "number" && (o = this.createWitness()));
    const a = {
      ...t,
      type: Ee.Coin,
      owner: s.toB256(),
      amount: i,
      assetId: r,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: o,
      predicate: n == null ? void 0 : n.bytes,
      predicateData: n == null ? void 0 : n.predicateDataBytes
    };
    this.pushInput(a), this.addChangeOutput(s, r);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * baseAssetId, if one it was not added yet.
   *
   * @param message - Message resource.
   * @param predicate - Predicate bytes.
   * @param predicateData - Predicate data bytes.
   */
  addMessageInput(t, n) {
    const { recipient: r, sender: s, amount: i } = t, o = mt;
    let a;
    n ? a = 0 : (a = this.getCoinInputWitnessIndexByOwner(r), typeof a != "number" && (a = this.createWitness()));
    const d = {
      ...t,
      type: Ee.Message,
      sender: s.toB256(),
      recipient: r.toB256(),
      amount: i,
      witnessIndex: a,
      predicate: n == null ? void 0 : n.bytes,
      predicateData: n == null ? void 0 : n.predicateDataBytes
    };
    this.pushInput(d), this.addChangeOutput(r, o);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(t) {
    return eA(t) ? this.addCoinInput(t) : this.addMessageInput(t), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(t) {
    return t.forEach((n) => this.addResource(n)), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResource(t, n) {
    return eA(t) ? this.addCoinInput(t, n) : this.addMessageInput(t, n), this;
  }
  /**
   * Adds multiple predicate coin/message inputs to the transaction and change outputs
   * from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResources(t, n) {
    return t.forEach((r) => this.addPredicateResource(r, n)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(t, n, r = mt) {
    return this.pushOutput({
      type: Ce.Coin,
      to: Dr(t).toB256(),
      amount: n,
      assetId: r
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(t, n) {
    return n.map(Ia).forEach((r) => {
      this.pushOutput({
        type: Ce.Coin,
        to: Dr(t).toB256(),
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
  addChangeOutput(t, n = mt) {
    this.getChangeOutputs().find(
      (s) => X(s.assetId) === n
    ) || this.pushOutput({
      type: Ce.Change,
      to: Dr(t).toB256(),
      assetId: n
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
  metadataGas(t) {
    throw new Error("Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(t) {
    const { gasCosts: n, consensusParameters: r } = t, { gasPerByte: s } = r;
    return qd({
      gasPerByte: s,
      gasCosts: n,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(n)
    });
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, a) => o + a.dataLength,
      0
    );
    return ba({
      gasPerByte: s,
      minGas: n,
      witnessesLength: i,
      witnessLimit: this.witnessLimit
    });
  }
  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   */
  fundWithFakeUtxos(t, n) {
    let r = 0;
    const s = () => {
      const a = String(r++);
      return Ne.slice(0, -a.length).concat(a);
    }, i = (a) => this.inputs.find((d) => "assetId" in d ? d.assetId === a : !1), o = (a, d) => {
      const h = i(a);
      h && "assetId" in h ? (h.id = s(), h.amount = d) : this.addResources([
        {
          id: s(),
          amount: d,
          assetId: a,
          owner: n || me.fromRandom(),
          maturity: 0,
          blockCreated: Q(1),
          txCreatedIdx: Q(1)
        }
      ]);
    };
    o(mt, Q(1e11)), t.forEach((a) => o(a.assetId, a.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: n, assetId: r }) => ({
      amount: Q(n),
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
    return fE(this);
  }
  updatePredicateInputs(t) {
    this.inputs.forEach((n) => {
      let r;
      switch (n.type) {
        case Ee.Coin:
          r = t.find((s) => s.type === Ee.Coin && s.owner === n.owner);
          break;
        case Ee.Message:
          r = t.find(
            (s) => s.type === Ee.Message && s.sender === n.sender
          );
          break;
        default:
          return;
      }
      r && "predicateGasUsed" in r && Q(r.predicateGasUsed).gt(0) && (n.predicate = r.predicate, n.predicateData = r.predicateData, n.predicateGasUsed = r.predicateGasUsed);
    });
  }
};
function zd(e, t) {
  const n = e.toTransaction();
  n.type === Ct.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
    const o = Pr(i);
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
        }, o.txID = Ne, o.outputIndex = 0, o.balanceRoot = Ne, o.stateRoot = Ne, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Pr(i);
    switch (o.type) {
      case Ce.Contract:
        return o.balanceRoot = Ne, o.stateRoot = Ne, o;
      case Ce.Change:
        return o.amount = Q(0), o;
      case Ce.Variable:
        return o.to = Ne, o.amount = Q(0), o.assetId = Ne, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Df(t), s = se([r, new bn().encode(n)]);
  return It(s);
}
var wE = (e) => {
  const t = new Uint8Array(32);
  return t.set(J(e)), t;
}, EE = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: X(t),
    value: X(wE(n))
  };
}, _o = class extends Qa {
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
    x(this, "type", Ct.Create);
    /** Witness index of contract bytecode to create */
    x(this, "bytecodeWitnessIndex");
    /** Salt */
    x(this, "salt");
    /** List of storage slots to initialize */
    x(this, "storageSlots");
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(EE)) ?? [];
    return {
      type: Ct.Create,
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
      (t) => t.type === Ce.ContractCreated
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
    return zd(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: Ce.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return Wd({
      contractBytesSize: Q(J(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, tA = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: J("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, IE = {
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
}, zn = class extends Qa {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    x(this, "type", Ct.Script);
    /** Gas limit for transaction */
    x(this, "gasLimit");
    /** Script to execute */
    x(this, "script");
    /** Script input data (parameters) */
    x(this, "scriptData");
    this.gasLimit = Q(r), this.script = J(t ?? tA.bytes), this.scriptData = J(n ?? tA.encodeScriptData());
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
      type: Ct.Script,
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
      (t) => t.type === Ce.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ce.Variable
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
        type: Ce.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, a) => o + a.dataLength,
      0
    );
    return ba({
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
    const n = Dr(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: Ee.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: Ce.Contract,
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
    return zd(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new Cn(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return $d({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, _t = (e) => {
  if (e instanceof zn || e instanceof _o)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Ct.Script:
      return zn.from(e);
    case Ct.Create:
      return _o.from(e);
    default:
      throw new v(R.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, yE = (e) => {
  var P, W;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), a = J(n), [d] = new bn().decode(a, 0);
  if (d.type === Ct.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: h, witnesses: I, inputs: E, policies: C } = d;
  let D = Q(0), F = Q(0);
  if (h === Ct.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, z = Q(J(I[U].data).length);
    D = Wd({
      contractBytesSize: z,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: a.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (F = U), D = $d({
      gasCosts: r,
      txBytesSize: a.length
    });
  }
  const b = qd({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: E,
    metadataGas: D,
    txBytesSize: a.length
  }), N = Q((P = C.find((U) => U.type === Lt.GasPrice)) == null ? void 0 : P.data), S = (W = C.find((U) => U.type === Lt.WitnessLimit)) == null ? void 0 : W.data, Z = I.reduce((U, H) => U + H.dataLength, 0), T = ba({
    gasPerByte: i,
    minGas: b,
    witnessesLength: Z,
    gasLimit: F,
    witnessLimit: S
  }), j = Kn(t, N, o), M = Kn(b, N, o), k = Kn(T, N, o);
  return {
    fee: M.add(j),
    minFee: M,
    maxFee: k,
    feeFromGasUsed: j
  };
}, BE = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var E;
  const s = new Cn(e), i = t.param1.toHex(8), o = s.getFunction(i), a = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const C = Q(t.param2).sub(ai({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let h;
  if (d) {
    const C = o.decodeArguments(d);
    C && (h = a.reduce((D, F, b) => {
      const N = C[b], S = F.name;
      return S ? {
        ...D,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(N))
      } : D;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: h,
    ...(E = t.amount) != null && E.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function CE(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function xa(e, t) {
  return e.filter((n) => n.type === t);
}
function bE(e) {
  return xa(e, Ee.Coin);
}
function QE(e) {
  return xa(e, Ee.Message);
}
function xE(e) {
  return CE(e, [Ee.Coin, Ee.Message]);
}
function vE(e) {
  return xa(e, Ee.Contract);
}
function e0(e, t) {
  const n = bE(e), r = QE(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function FE(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ee.Contract)
      throw new v(
        R.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function va(e) {
  return e.type === Ee.Coin ? e.owner.toString() : e.type === Ee.Message ? e.recipient.toString() : "";
}
function ns(e, t) {
  return e.filter((n) => n.type === t);
}
function DE(e) {
  return ns(e, Ce.ContractCreated);
}
function t0(e) {
  return ns(e, Ce.Coin);
}
function RE(e) {
  return ns(e, Ce.Change);
}
function NE(e) {
  return ns(e, Ce.Contract);
}
function $y(e) {
  return ns(e, Ce.Variable);
}
var SE = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(SE || {}), _E = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(_E || {}), kE = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(kE || {}), ME = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(ME || {}), OE = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(OE || {});
function Ur(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function n0(e) {
  switch (e) {
    case Ct.Mint:
      return "Mint";
    case Ct.Create:
      return "Create";
    case Ct.Script:
      return "Script";
    default:
      throw new v(
        R.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Fa(e, t) {
  return n0(e) === t;
}
function LE(e) {
  return Fa(
    e,
    "Mint"
    /* Mint */
  );
}
function r0(e) {
  return Fa(
    e,
    "Create"
    /* Create */
  );
}
function s0(e) {
  return Fa(
    e,
    "Script"
    /* Script */
  );
}
function Ky(e) {
  return (t) => e.assetId === t.assetId;
}
function TE(e) {
  return Ur(e, de.Call);
}
function PE(e) {
  return Ur(e, de.MessageOut);
}
var UE = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((a) => a.assetId === o.assetId)
  );
  return n.map((o) => {
    const a = r.find((h) => h.assetId === o.assetId);
    if (!a)
      return o;
    const d = Q(o.amount).add(a.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function GE(e, t) {
  var n, r, s, i, o, a, d, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((d = e.to) == null ? void 0 : d.type) === ((h = t.to) == null ? void 0 : h.type);
}
function mr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((a) => GE(a, t));
  if (n[r]) {
    const a = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (a.assetsSent = (i = a.assetsSent) != null && i.length ? UE(a, t) : t.assetsSent), (o = t.calls) != null && o.length && (a.calls = [...a.calls || [], ...t.calls]), n[r] = a;
  } else
    n.push(t);
  return n;
}
function zy(e) {
  return Ur(e, de.TransferOut);
}
function HE({
  inputs: e,
  receipts: t
}) {
  return PE(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", a = e0(e, o);
      if (a) {
        const d = va(a);
        return mr(s, {
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
function JE({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = TE(n);
  return NE(t).reduce((h, I) => {
    const E = FE(e, I.inputIndex);
    return E ? o.reduce((D, F) => {
      var b;
      if (F.to === E.contractID) {
        const N = e0(e, F.assetId);
        if (N) {
          const S = va(N), Z = [], T = r == null ? void 0 : r[E.contractID];
          return T && Z.push(
            BE({
              abi: T,
              receipt: F,
              rawPayload: s,
              maxInputs: i
            })
          ), mr(D, {
            name: "Contract call",
            from: {
              type: 1,
              address: S
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
      return D;
    }, h) : h;
  }, []);
}
function ZE(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const a = t.some((h) => h.contractID === r) ? 0 : 1;
  if (Ne === o) {
    const h = n.find((I) => I.assetId === s);
    o = (h == null ? void 0 : h.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((h) => h.contractID === o) ? 0 : 1,
      address: o
    },
    to: {
      type: a,
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
function nA({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = t0(t), i = vE(e), o = RE(t);
  s.forEach((h) => {
    const { amount: I, assetId: E, to: C } = h, D = o.find((F) => F.assetId === E);
    D && (r = mr(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: D.to
      },
      to: {
        type: 1,
        address: C
      },
      assetsSent: [
        {
          assetId: E,
          amount: I
        }
      ]
    }));
  });
  const a = Ur(
    n,
    de.Transfer
  ), d = Ur(
    n,
    de.TransferOut
  );
  return [...a, ...d].forEach((h) => {
    const I = ZE(h, i, o);
    r = mr(r, I);
  }), r;
}
function YE(e) {
  return t0(e).reduce((r, s) => mr(r, {
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
function VE({ inputs: e, outputs: t }) {
  const n = DE(t), r = xE(e)[0], s = va(r);
  return n.reduce((o, a) => mr(o, {
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
function XE({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return r0(e) ? [
    ...VE({ inputs: t, outputs: n }),
    ...nA({ inputs: t, outputs: n, receipts: r })
  ] : s0(e) ? [
    ...nA({ inputs: t, outputs: n, receipts: r }),
    ...JE({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...HE({ inputs: t, receipts: r })
  ] : [...YE(n)];
}
var er = (e) => {
  const t = uE(e);
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
}, jE = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, qE = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, WE = (e) => {
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
        R.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, $E = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = WE(e.type), e.type) {
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
    gqlTransactionStatus: a,
    abiMap: d = {},
    maxInputs: h,
    gasCosts: I
  } = e, E = jd(n), C = X(o), D = XE({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: d,
    maxInputs: h
  }), F = n0(i.type), { fee: b } = yE({
    gasUsed: E,
    rawPayload: C,
    consensusParameters: {
      gasCosts: I,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: N, isStatusPending: S, isStatusSuccess: Z, blockId: T, status: j, time: M } = $E(a), k = jE(n), O = qE(n);
  let P;
  return M && (P = xA.fromTai64(M)), {
    id: t,
    fee: b,
    gasUsed: E,
    operations: D,
    type: F,
    blockId: T,
    time: M,
    status: j,
    receipts: n,
    mintedAssets: k,
    burnedAssets: O,
    isTypeMint: LE(i.type),
    isTypeCreate: r0(i.type),
    isTypeScript: s0(i.type),
    isStatusFailure: N,
    isStatusSuccess: Z,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
var qi = class i0 {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(t, n) {
    /** Transaction ID */
    x(this, "id");
    /** Current provider */
    x(this, "provider");
    /** Gas used on the transaction */
    x(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    x(this, "gqlTransaction");
    this.id = t, this.provider = n;
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(t, n) {
    const r = new i0(t, n);
    return await r.fetch(), r;
  }
  /**
   * Fetch the transaction with receipts from the provider.
   *
   * @returns Transaction with receipts query result.
   */
  async fetch() {
    const t = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id
    });
    if (!t.transaction) {
      const n = this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: r } of n)
        if (r)
          break;
      return this.fetch();
    }
    return this.gqlTransaction = t.transaction, t.transaction;
  }
  /**
   * Decode the raw payload of the transaction.
   *
   * @param transactionWithReceipts - The transaction with receipts object.
   * @returns The decoded transaction.
   */
  decodeTransaction(t) {
    var n;
    return (n = new bn().decode(
      J(t.rawPayload),
      0
    )) == null ? void 0 : n[0];
  }
  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary(t) {
    var I;
    let n = this.gqlTransaction;
    n || (n = await this.fetch());
    const r = this.decodeTransaction(
      n
    ), s = ((I = n.receipts) == null ? void 0 : I.map(er)) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: a } = this.provider.getGasConfig(), d = this.provider.getChain().consensusParameters.maxInputs;
    return mi({
      id: this.id,
      receipts: s,
      transaction: r,
      transactionBytes: J(n.rawPayload),
      gqlTransactionStatus: n.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: t,
      maxInputs: d,
      gasCosts: a
    });
  }
  async waitForStatusChange() {
    var r, s;
    const t = (s = (r = this.gqlTransaction) == null ? void 0 : r.status) == null ? void 0 : s.type;
    if (t && t !== "SubmittedStatus")
      return;
    const n = this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const { statusChange: i } of n) {
      if (i.type === "SqueezedOutStatus")
        throw new v(
          R.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${i.reason}`
        );
      if (i.type !== "SubmittedStatus")
        break;
    }
    await this.fetch();
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(t) {
    await this.waitForStatusChange();
    const n = await this.getTransactionSummary(t);
    return {
      gqlTransaction: this.gqlTransaction,
      ...n
    };
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(t) {
    const n = await this.waitForResult(t);
    if (n.isStatusFailure)
      throw new v(
        R.TRANSACTION_FAILED,
        `Transaction failed: ${n.gqlTransaction.status.reason}`
      );
    return n;
  }
};
function KE(e, t) {
  return e.reduce((n, r) => (r.type === de.LogData && n.push(t.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === de.Log && n.push(
    t.decodeLog(new _("u64").encode(r.val0), r.val1.toNumber(), r.id)[0]
  ), n), []);
}
function zE(e, t) {
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
function o0(e, t, n = 0) {
  return t === void 0 ? e : async (...r) => {
    var s;
    try {
      return await e(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const a = n + 1;
      if (a > t.maxRetries)
        throw o;
      const d = zE(t, a);
      return await gE(d), o0(e, t, a)(...r);
    }
  };
}
var eI = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, tI = 10, nI = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: a, scriptParams: d, txParams: h, gasCosts: I } = r;
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
      maxPredicateLength: Q(a.maxPredicateLength),
      maxPredicateDataLength: Q(a.maxPredicateDataLength),
      maxGasPerPredicate: Q(a.maxGasPerPredicate),
      gasPriceFactor: Q(o.gasPriceFactor),
      gasPerByte: Q(o.gasPerByte),
      maxMessageDataLength: Q(a.maxMessageDataLength),
      chainId: Q(r.chainId),
      gasCosts: I
    },
    gasCosts: I,
    latestBlock: {
      id: s.id,
      height: Q(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((E) => ({
        id: E.id
      }))
    }
  };
}, Bt, Ks, a0, rA = (Bt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(t, n = {}) {
    /**
     * @hidden
     */
    Be(this, Ks);
    x(this, "operations");
    x(this, "cache");
    x(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    });
    this.url = t, this.options = { ...this.options, ...n }, this.url = t, this.operations = this.createOperations(), this.cache = n.cacheUtxo ? new sE(n.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Bt.nodeInfoCache = {}, Bt.chainInfoCache = {};
  }
  static getFetchFn(t) {
    const { retryOptions: n, timeout: r } = t;
    return o0(async (...s) => {
      const i = s[0], o = s[1], a = r ? AbortSignal.timeout(r) : void 0;
      let d = { ...o, signal: a };
      return t.requestMiddleware && (d = await t.requestMiddleware(d)), t.fetch ? t.fetch(i, d, t) : fetch(i, d);
    }, n);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(t, n = {}) {
    const r = new Bt(t, n);
    return await r.fetchChainAndNodeInfo(), r;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const t = Bt.chainInfoCache[this.url];
    if (!t)
      throw new v(
        R.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return t;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const t = Bt.nodeInfoCache[this.url];
    if (!t)
      throw new v(
        R.NODE_INFO_CACHE_EMPTY,
        "Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return t;
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  getGasConfig() {
    const { minGasPrice: t } = this.getNode(), { maxGasPerTx: n, maxGasPerPredicate: r, gasPriceFactor: s, gasPerByte: i, gasCosts: o } = this.getChain().consensusParameters;
    return {
      minGasPrice: t,
      maxGasPerTx: n,
      maxGasPerPredicate: r,
      gasPriceFactor: s,
      gasPerByte: i,
      gasCosts: o
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   */
  async connect(t, n) {
    this.url = t, this.options = n ?? this.options, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Fetches both the chain and node information, saves it to the cache, and return it.
   *
   * @returns NodeInfo and Chain
   */
  async fetchChainAndNodeInfo() {
    const t = await this.fetchChain(), n = await this.fetchNode();
    return Bt.ensureClientVersionIsSupported(n), {
      chain: t,
      nodeInfo: n
    };
  }
  static ensureClientVersionIsSupported(t) {
    const { isMajorSupported: n, isMinorSupported: r, supportedVersion: s } = T0(t.nodeVersion);
    if (!n || !r)
      throw new v(
        v.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${t.nodeVersion}, Supported version: ${s}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const t = Bt.getFetchFn(this.options), n = new Zp.GraphQLClient(this.url, {
      fetch: (s, i) => t(s, i, this.options)
    });
    return tE((s, i) => {
      const o = s.definitions.find((d) => d.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? new nE({
        url: this.url,
        query: s,
        fetchFn: (d, h) => t(d, h, this.options),
        variables: i
      }) : n.request(s, i);
    });
  }
  /**
   * Returns the version of the connected node.
   *
   * @returns A promise that resolves to the version string.
   */
  async getVersion() {
    const {
      nodeInfo: { nodeVersion: t }
    } = await this.operations.getVersion();
    return t;
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
      name: t,
      consensusParameters: { chainId: n }
    } = await this.getChain(), r = new Nn(t, n.toNumber());
    return Promise.resolve(r);
  }
  /**
   * Returns the block number.
   *
   * @returns A promise that resolves to the block number
   */
  async getBlockNumber() {
    const { chain: t } = await this.operations.getChain();
    return Q(t.latestBlock.header.height, 10);
  }
  /**
   * Returns the chain information.
   * @param url - The URL of the Fuel node
   * @returns NodeInfo object
   */
  async fetchNode() {
    const { nodeInfo: t } = await this.operations.getNodeInfo(), n = {
      maxDepth: Q(t.maxDepth),
      maxTx: Q(t.maxTx),
      minGasPrice: Q(t.minGasPrice),
      nodeVersion: t.nodeVersion,
      utxoValidation: t.utxoValidation,
      vmBacktrace: t.vmBacktrace,
      peers: t.peers
    };
    return Bt.nodeInfoCache[this.url] = n, n;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: t } = await this.operations.getChain(), n = nI(t);
    return Bt.chainInfoCache[this.url] = n, n;
  }
  /**
   * Returns the chain ID
   * @returns A promise that resolves to the chain ID number
   */
  getChainId() {
    const {
      consensusParameters: { chainId: t }
    } = this.getChain();
    return t.toNumber();
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
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r = !1 } = {}) {
    const s = _t(t);
    vt(this, Ks, a0).call(this, s.inputs), n && await this.estimateTxDependencies(s);
    const i = X(s.toTransactionBytes());
    if (r) {
      const a = this.operations.submitAndAwait({ encodedTransaction: i });
      for await (const { submitAndAwait: I } of a) {
        if (I.type === "SqueezedOutStatus")
          throw new v(
            R.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${I.reason}`
          );
        if (I.type !== "SubmittedStatus")
          break;
      }
      const d = s.getTransactionId(this.getChainId()), h = new qi(d, this);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: i });
    return new qi(o, this);
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
  async call(t, { utxoValidation: n, estimateTxDependencies: r = !0 } = {}) {
    const s = _t(t);
    if (r)
      return this.estimateTxDependencies(s);
    const i = X(s.toTransactionBytes()), { dryRun: o } = await this.operations.dryRun({
      encodedTransaction: i,
      utxoValidation: n || !1
    });
    return {
      receipts: o.map(er)
    };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(t) {
    if (!!!t.inputs.find(
      (o) => "predicate" in o && o.predicate && !sd(J(o.predicate), J("0x")) && new Uo(o.predicateGasUsed).isZero()
    ))
      return t;
    const r = X(t.toTransactionBytes()), s = await this.operations.estimatePredicates({
      encodedTransaction: r
    }), {
      estimatePredicates: { inputs: i }
    } = s;
    return i && i.forEach((o, a) => {
      "predicateGasUsed" in o && Q(o.predicateGasUsed).gt(0) && (t.inputs[a].predicateGasUsed = o.predicateGasUsed);
    }), t;
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
  async estimateTxDependencies(t) {
    if (t.type === Ct.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    await this.estimatePredicates(t);
    let n = [];
    const r = [];
    let s = 0;
    for (let i = 0; i < tI; i++) {
      const { dryRun: o } = await this.operations.dryRun({
        encodedTransaction: X(t.toTransactionBytes()),
        utxoValidation: !1
      });
      n = o.map(er);
      const { missingOutputVariables: a, missingOutputContractIds: d } = AE(n);
      if (a.length !== 0 || d.length !== 0)
        s += a.length, t.addVariableOutputs(a.length), d.forEach(({ contractId: I }) => {
          t.addContractInputAndOutput(me.fromString(I)), r.push(I);
        });
      else
        break;
    }
    return {
      receipts: n,
      outputVariables: s,
      missingContractIds: r
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
  async simulate(t, { estimateTxDependencies: n = !0 } = {}) {
    const r = _t(t);
    if (n)
      return this.estimateTxDependencies(r);
    const s = X(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: !0
    });
    return {
      receipts: i.map(er)
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
  async getTransactionCost(t, n = [], {
    estimateTxDependencies: r = !0,
    estimatePredicates: s = !0,
    resourcesOwner: i
  } = {}) {
    const o = Pr(_t(t)), a = this.getChain(), { gasPriceFactor: d, minGasPrice: h, maxGasPerTx: I } = this.getGasConfig(), E = K0(o.gasPrice, h), C = o.type === Ct.Script, D = o.getCoinOutputsQuantities(), F = eI(D, n);
    o.fundWithFakeUtxos(F, i == null ? void 0 : i.address), s && (C && (o.gasLimit = Q(0)), i && "populateTransactionPredicateData" in i && i.populateTransactionPredicateData(o), await this.estimatePredicates(o));
    const b = o.calculateMinGas(a), N = o.calculateMaxGas(a, b);
    let S = [], Z = [], T = 0;
    if (C && r) {
      o.gasPrice = Q(0), o.gasLimit = Q(I.sub(N).toNumber() * 0.9);
      const P = await this.estimateTxDependencies(o);
      S = P.receipts, T = P.outputVariables, Z = P.missingContractIds;
    }
    const j = C ? jd(S) : b, M = Kn(
      j,
      E,
      d
    ).normalizeZeroToOne(), k = Kn(b, E, d).normalizeZeroToOne(), O = Kn(N, E, d).normalizeZeroToOne();
    return {
      requiredQuantities: F,
      receipts: S,
      gasUsed: j,
      minGasPrice: h,
      gasPrice: E,
      minGas: b,
      maxGas: N,
      usedFee: M,
      minFee: k,
      maxFee: O,
      estimatedInputs: o.inputs,
      outputVariables: T,
      missingContractIds: Z
    };
  }
  async getResourcesForTransaction(t, n, r = []) {
    const s = me.fromAddressOrString(t), i = _t(Pr(n)), o = await this.getTransactionCost(i, r);
    i.addResources(
      await this.getResourcesToSpend(s, o.requiredQuantities)
    );
    const { requiredQuantities: a, ...d } = await this.getTransactionCost(
      i,
      r
    );
    return {
      resources: await this.getResourcesToSpend(s, a),
      requiredQuantities: a,
      ...d
    };
  }
  /**
   * Returns coins for the given owner.
   */
  async getCoins(t, n, r) {
    const s = me.fromAddressOrString(t);
    return (await this.operations.getCoins({
      first: 10,
      ...r,
      filter: { owner: s.toB256(), assetId: n && X(n) }
    })).coins.edges.map((a) => a.node).map((a) => ({
      id: a.utxoId,
      assetId: a.assetId,
      amount: Q(a.amount),
      owner: me.fromAddressOrString(a.owner),
      maturity: Q(a.maturity).toNumber(),
      blockCreated: Q(a.blockCreated),
      txCreatedIdx: Q(a.txCreatedIdx)
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
  async getResourcesToSpend(t, n, r) {
    var h, I, E;
    const s = me.fromAddressOrString(t), i = {
      messages: ((h = r == null ? void 0 : r.messages) == null ? void 0 : h.map((C) => X(C))) || [],
      utxos: ((I = r == null ? void 0 : r.utxos) == null ? void 0 : I.map((C) => X(C))) || []
    };
    if (this.cache) {
      const C = new Set(
        i.utxos.concat((E = this.cache) == null ? void 0 : E.getActiveData().map((D) => X(D)))
      );
      i.utxos = Array.from(C);
    }
    const o = {
      owner: s.toB256(),
      queryPerAsset: n.map(Ia).map(({ assetId: C, amount: D, max: F }) => ({
        assetId: X(C),
        amount: D.toString(10),
        max: F ? F.toString(10) : void 0
      })),
      excludedIds: i
    };
    return (await this.operations.getCoinsToSpend(o)).coinsToSpend.flat().map((C) => {
      switch (C.__typename) {
        case "MessageCoin":
          return {
            amount: Q(C.amount),
            assetId: C.assetId,
            daHeight: Q(C.daHeight),
            sender: me.fromAddressOrString(C.sender),
            recipient: me.fromAddressOrString(C.recipient),
            nonce: C.nonce
          };
        case "Coin":
          return {
            id: C.utxoId,
            amount: Q(C.amount),
            assetId: C.assetId,
            owner: me.fromAddressOrString(C.owner),
            maturity: Q(C.maturity).toNumber(),
            blockCreated: Q(C.blockCreated),
            txCreatedIdx: Q(C.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((C) => !!C);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlock(t) {
    let n;
    typeof t == "number" ? n = { height: Q(t).toString(10) } : t === "latest" ? n = { height: (await this.getBlockNumber()).toString(10) } : t.length === 66 ? n = { blockId: t } : n = { blockId: Q(t).toString(10) };
    const { block: r } = await this.operations.getBlock(n);
    return r ? {
      id: r.id,
      height: Q(r.header.height),
      time: r.header.time,
      transactionIds: r.transactions.map((s) => s.id)
    } : null;
  }
  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(t) {
    const { blocks: n } = await this.operations.getBlocks(t);
    return n.edges.map(({ node: s }) => ({
      id: s.id,
      height: Q(s.header.height),
      time: s.header.time,
      transactionIds: s.transactions.map((i) => i.id)
    }));
  }
  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(t) {
    let n;
    typeof t == "number" ? n = { blockHeight: Q(t).toString(10) } : t === "latest" ? n = { blockHeight: (await this.getBlockNumber()).toString() } : n = { blockId: t };
    const { block: r } = await this.operations.getBlockWithTransactions(n);
    return r ? {
      id: r.id,
      height: Q(r.header.height, 10),
      time: r.header.time,
      transactionIds: r.transactions.map((s) => s.id),
      transactions: r.transactions.map(
        (s) => {
          var i;
          return (i = new bn().decode(J(s.rawPayload), 0)) == null ? void 0 : i[0];
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
  async getTransaction(t) {
    var r;
    const { transaction: n } = await this.operations.getTransaction({ transactionId: t });
    return n ? (r = new bn().decode(
      J(n.rawPayload),
      0
    )) == null ? void 0 : r[0] : null;
  }
  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(t) {
    const { contract: n } = await this.operations.getContract({ contractId: t });
    return n || null;
  }
  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(t, n) {
    const { contractBalance: r } = await this.operations.getContractBalance({
      contract: me.fromAddressOrString(t).toB256(),
      asset: X(n)
    });
    return Q(r.amount, 10);
  }
  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(t, n) {
    const { balance: r } = await this.operations.getBalance({
      owner: me.fromAddressOrString(t).toB256(),
      assetId: X(n)
    });
    return Q(r.amount, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments.
   * @returns A promise that resolves to the balances.
   */
  async getBalances(t, n) {
    return (await this.operations.getBalances({
      first: 10,
      ...n,
      filter: { owner: me.fromAddressOrString(t).toB256() }
    })).balances.edges.map((i) => i.node).map((i) => ({
      assetId: i.assetId,
      amount: Q(i.amount)
    }));
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments.
   * @returns A promise that resolves to the messages.
   */
  async getMessages(t, n) {
    return (await this.operations.getMessages({
      first: 10,
      ...n,
      owner: me.fromAddressOrString(t).toB256()
    })).messages.edges.map((i) => i.node).map((i) => ({
      messageId: Ns.getMessageId({
        sender: i.sender,
        recipient: i.recipient,
        nonce: i.nonce,
        amount: Q(i.amount),
        data: i.data
      }),
      sender: me.fromAddressOrString(i.sender),
      recipient: me.fromAddressOrString(i.recipient),
      nonce: i.nonce,
      amount: Q(i.amount),
      data: Ns.decodeData(i.data),
      daHeight: Q(i.daHeight)
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
  async getMessageProof(t, n, r, s) {
    let i = {
      transactionId: t,
      nonce: n
    };
    if (r && s)
      throw new v(
        R.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    r && (i = {
      ...i,
      commitBlockId: r
    }), s && (i = {
      ...i,
      // Conver BN into a number string required on the query
      // This should problably be fixed on the fuel client side
      commitBlockHeight: s.toNumber().toString()
    });
    const o = await this.operations.getMessageProof(i);
    if (!o.messageProof)
      return null;
    const {
      messageProof: a,
      messageBlockHeader: d,
      commitBlockHeader: h,
      blockProof: I,
      sender: E,
      recipient: C,
      amount: D,
      data: F
    } = o.messageProof;
    return {
      messageProof: {
        proofIndex: Q(a.proofIndex),
        proofSet: a.proofSet
      },
      blockProof: {
        proofIndex: Q(I.proofIndex),
        proofSet: I.proofSet
      },
      messageBlockHeader: {
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
      commitBlockHeader: {
        id: h.id,
        daHeight: Q(h.daHeight),
        transactionsCount: Q(h.transactionsCount),
        transactionsRoot: h.transactionsRoot,
        height: Q(h.height),
        prevRoot: h.prevRoot,
        time: h.time,
        applicationHash: h.applicationHash,
        messageReceiptRoot: h.messageReceiptRoot,
        messageReceiptCount: Q(h.messageReceiptCount)
      },
      sender: me.fromAddressOrString(E),
      recipient: me.fromAddressOrString(C),
      nonce: n,
      amount: Q(D),
      data: F
    };
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param nonce - The nonce of the message to get status from.
   * @returns A promise that resolves to the message status
   */
  async getMessageStatus(t) {
    return (await this.operations.getMessageStatus({ nonce: t })).messageStatus;
  }
  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(t, n) {
    const { produceBlocks: r } = await this.operations.produceBlocks({
      blocksToProduce: Q(t).toString(10),
      startTimestamp: n ? xA.fromUnixMilliseconds(n).toTai64() : void 0
    });
    return Q(r);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(t) {
    return new qi(t, this);
  }
}, Ks = new WeakSet(), a0 = function(t) {
  this.cache && t.forEach((n) => {
    var r;
    n.type === Ee.Coin && ((r = this.cache) == null || r.set(n.id));
  });
}, x(Bt, "chainInfoCache", {}), x(Bt, "nodeInfoCache", {}), Bt);
async function eB(e) {
  var C;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      R.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new bn().decode(
    J(s.rawPayload),
    0
  ), o = ((C = s.receipts) == null ? void 0 : C.map(er)) || [], {
    consensusParameters: { gasPerByte: a, gasPriceFactor: d, maxInputs: h, gasCosts: I }
  } = n.getChain(), E = mi({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: J(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(a),
    gasPriceFactor: Q(d),
    abiMap: r,
    maxInputs: h,
    gasCosts: I
  });
  return {
    gqlTransaction: s,
    ...E
  };
}
async function tB(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: a } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, h = n.toTransaction(), I = n.toTransactionBytes();
  return mi({
    receipts: s,
    transaction: h,
    transactionBytes: I,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: a
  });
}
async function nB(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: a, gasPriceFactor: d, maxInputs: h, gasCosts: I }
  } = n.getChain();
  return {
    transactions: i.map((C) => {
      const { node: D } = C, { id: F, rawPayload: b, receipts: N, status: S } = D, [Z] = new bn().decode(J(b), 0), T = (N == null ? void 0 : N.map(er)) || [], j = mi({
        id: F,
        receipts: T,
        transaction: Z,
        transactionBytes: J(b),
        gqlTransactionStatus: S,
        abiMap: r,
        gasPerByte: a,
        gasPriceFactor: d,
        maxInputs: h,
        gasCosts: I
      });
      return {
        gqlTransaction: D,
        ...j
      };
    }),
    pageInfo: o
  };
}
var Xn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, rI = (e) => {
  if (e === "ethereum")
    return Xn.eth.sepolia;
  if (e === "fuel")
    return Xn.fuel.beta5;
}, sI = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), c0 = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? rI(n);
  if (i === void 0)
    return;
  const o = sI({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, rB = (e, t) => c0({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), sB = (e, t) => c0({
  asset: e,
  networkType: "fuel",
  chainId: t
}), iI = "/", oI = /^\/|\/$/g, aI = (e = "") => e.replace(oI, "");
function cI(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(aI);
  return r && n && s.unshift(""), s.join(iI);
}
function iB(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: cI(t, n.icon)
  }));
}
var oB = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Xn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Xn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Xn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Xn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], AI = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new _("u64").encode(new Uo(n).toNumber());
  return Uint8Array.from([
    ...J(r),
    ...i,
    ...J(t)
  ]);
}, uI = async (e) => {
  const t = AI(e);
  await wa();
  const n = Am(16, 0, dm.ScriptData), r = Jc(17, 16, 32), s = Sr(18, 17, 0), i = Jc(19, 17, 8), o = am(16, 18, 19), a = Dd(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...a.to_bytes()
  ]), scriptData: t };
}, wi = class extends Xu {
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
    x(this, "address");
    /**
     * The provider used to interact with the network.
     */
    x(this, "_provider");
    x(this, "_connector");
    this._provider = n, this._connector = r, this.address = me.fromDynamicInput(t);
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
      throw new v(R.MISSING_PROVIDER, "Provider not set");
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
        R.NOT_SUPPORTED,
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
        R.NOT_SUPPORTED,
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
  async getBalance(t = mt) {
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
        R.NOT_SUPPORTED,
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
    const s = dw({
      amount: Q(r),
      assetId: mt,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: E, assetId: C }) => {
      i[C] = {
        required: E,
        owned: Q(0)
      };
    });
    const o = [], a = [], d = this.address.toB256();
    t.inputs.forEach((E) => {
      if ("amount" in E)
        if ("owner" in E) {
          const F = String(E.assetId);
          if (E.owner === d && i[F]) {
            const b = Q(E.amount);
            i[F].owned = i[F].owned.add(b), o.push(E.id);
          }
        } else
          E.recipient === d && E.amount && i[mt] && (i[mt].owned = i[mt].owned.add(E.amount), a.push(E.nonce));
    });
    const h = [];
    if (Object.entries(i).forEach(([E, { owned: C, required: D }]) => {
      C.lt(D) && h.push({
        assetId: E,
        amount: D.sub(C)
      });
    }), h.length) {
      const E = await this.getResourcesToSpend(h, {
        messages: a,
        utxos: o
      });
      t.addResources(E);
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
  async createTransfer(t, n, r = mt, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, a = new zn(o);
    a.addCoinOutput(me.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: h, gasUsed: I, estimatedInputs: E } = await this.provider.getTransactionCost(a, [], {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return a.gasPrice = Q(s.gasPrice ?? i), a.gasLimit = Q(s.gasLimit ?? I), this.validateGas({
      gasUsed: I,
      gasPrice: a.gasPrice,
      gasLimit: a.gasLimit,
      minGasPrice: i
    }), await this.fund(a, h, d), a.updatePredicateInputs(E), a;
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
  async transfer(t, n, r = mt, s = {}) {
    if (Q(n).lte(0))
      throw new v(
        R.INVALID_TRANSFER_AMOUNT,
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
  async transferToContract(t, n, r = mt, s = {}) {
    if (Q(n).lte(0))
      throw new v(
        R.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = me.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), a = { gasPrice: o, ...s }, { script: d, scriptData: h } = await uI({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: r
    }), I = new zn({
      ...a,
      script: d,
      scriptData: h
    });
    I.addContractInputAndOutput(i);
    const { maxFee: E, requiredQuantities: C, gasUsed: D } = await this.provider.getTransactionCost(
      I,
      [{ amount: Q(n), assetId: String(r) }]
    );
    return I.gasLimit = Q(a.gasLimit ?? D), this.validateGas({
      gasUsed: D,
      gasPrice: I.gasPrice,
      gasLimit: I.gasLimit,
      minGasPrice: o
    }), await this.fund(I, C, E), this.sendTransaction(I);
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
    const { minGasPrice: s } = this.provider.getGasConfig(), i = me.fromAddressOrString(t), o = J(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), a = J(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), h = { script: new Uint8Array([
      ...J(IE.bytes),
      ...o,
      ...a
    ]), gasPrice: s, ...r }, I = new zn(h), E = [{ amount: Q(n), assetId: mt }], { requiredQuantities: C, maxFee: D, gasUsed: F } = await this.provider.getTransactionCost(
      I,
      E
    );
    return I.gasLimit = Q(h.gasLimit ?? F), this.validateGas({
      gasUsed: F,
      gasPrice: I.gasPrice,
      gasLimit: I.gasLimit,
      minGasPrice: s
    }), await this.fund(I, C, D), this.sendTransaction(I);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new v(R.MISSING_CONNECTOR, "A connector is required to sign messages.");
    return this._connector.signMessage(this.address.toString(), t);
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
    const s = _t(t);
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
    const r = _t(t);
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
        R.GAS_PRICE_TOO_LOW,
        `Gas price '${n}' is lower than the required: '${s}'.`
      );
    if (t.gt(r))
      throw new v(
        R.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r}' is lower than the required: '${t}'.`
      );
  }
}, Gr = class A0 {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(t) {
    x(this, "address");
    x(this, "publicKey");
    x(this, "compressedPublicKey");
    x(this, "privateKey");
    typeof t == "string" && t.match(/^[0-9a-f]*$/i) && t.length === 64 && (t = `0x${t}`);
    const n = Ut(t, 32);
    this.privateKey = X(n), this.publicKey = X(un.getPublicKey(n, !1).slice(1)), this.compressedPublicKey = X(un.getPublicKey(n, !0)), this.address = me.fromPublicKey(this.publicKey);
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
  sign(t) {
    const n = un.sign(J(t), J(this.privateKey)), r = Ut(`0x${n.r.toString(16)}`, 32), s = Ut(`0x${n.s.toString(16)}`, 32);
    return s[0] |= (n.recovery || 0) << 7, X(se([r, s]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(t) {
    const n = un.ProjectivePoint.fromHex(J(this.compressedPublicKey)), r = un.ProjectivePoint.fromHex(J(t));
    return `0x${n.add(r).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(t, n) {
    const r = J(n), s = r.slice(0, 32), i = r.slice(32, 64), o = (i[0] & 128) >> 7;
    i[0] &= 127;
    const d = new un.Signature(BigInt(X(s)), BigInt(X(i))).addRecoveryBit(
      o
    ).recoverPublicKey(J(t)).toRawBytes(!1).slice(1);
    return X(d);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(t, n) {
    return me.fromPublicKey(A0.recoverPublicKey(t, n));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(t) {
    return t ? nn(se([Bn(32), J(t)])) : Bn(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(t) {
    const n = un.ProjectivePoint.fromHex(J(t));
    return X(n.toRawBytes(!1).slice(1));
  }
}, sA = 13, iA = 8, oA = 1, Wi = 32, dI = 16, aA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function lI(e, t, n) {
  const r = wn(aA(e), "hex"), s = me.fromAddressOrString(t), i = Bn(Wi), o = pu({
    password: wn(n),
    salt: i,
    dklen: Wi,
    n: 2 ** sA,
    r: iA,
    p: oA
  }), a = Bn(dI), d = await Ff(r, o, a), h = Uint8Array.from([...o.subarray(16, 32), ...d]), I = mu(h), E = Fr(I, "hex"), C = {
    id: Jm(),
    version: 3,
    address: aA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: E,
      cipherparams: { iv: Fr(a, "hex") },
      ciphertext: Fr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Wi,
        n: 2 ** sA,
        p: oA,
        r: iA,
        salt: Fr(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function hI(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: d, p: h, salt: I }
    }
  } = n, E = wn(s, "hex"), C = wn(i, "hex"), D = wn(I, "hex"), F = wn(t), b = pu({
    password: F,
    salt: D,
    n: a,
    p: h,
    r: d,
    dklen: o
  }), N = Uint8Array.from([...b.subarray(16, 32), ...E]), S = mu(N), Z = Fr(S, "hex");
  if (r !== Z)
    throw new v(
      R.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await vf(E, b, C);
  return X(T);
}
var oo, fI = (oo = class extends wi {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new Gr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    x(this, "signer");
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
    const n = await this.signer().sign(Rf(t));
    return X(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = _t(t), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return X(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = _t(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    const s = _t(t);
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
    const r = _t(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return lI(this.privateKey, this.address, t);
  }
}, /**
 * Default HDWallet path.
 */
x(oo, "defaultPath", "m/44'/1179993420'/0'/0/0"), oo), fs = [
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
], gI = /* @__PURE__ */ ((e) => (e.english = "english", e))(gI || {});
function ko(e) {
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
          R.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return Uint8Array.from(n);
}
function pI(e) {
  return (1 << e) - 1;
}
function u0(e) {
  return (1 << e) - 1 << 8 - e;
}
function $i(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function mI(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function wI(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & pI(8 - n)), n += 3);
  const r = e.length / 4, s = J(It(e))[0] & u0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function EI(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = J(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const I = t.indexOf(e[h].normalize("NFKD"));
    if (I === -1)
      throw new v(
        R.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let E = 0; E < 11; E += 1)
      I & 1 << 10 - E && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = u0(o);
  if ((J(It(r.slice(0, i / 8)))[0] & a) !== (r[r.length - 1] & a))
    throw new v(
      R.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var II = ko("Bitcoin seed"), yI = "0x0488ade4", BI = "0x04358394", cA = [12, 15, 18, 21, 24];
function AA(e) {
  if (e.length !== 2048)
    throw new v(
      R.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function CI(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      R.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Ki(e) {
  if (!cA.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${cA.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(R.INVALID_MNEMONIC, t);
  }
}
var bI = class dn {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(t = fs) {
    x(this, "wordlist");
    this.wordlist = t, AA(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(t) {
    return dn.mnemonicToEntropy(t, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(t) {
    return dn.entropyToMnemonic(t, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(t, n = fs) {
    const r = $i(t);
    return Ki(r), X(EI(r, n));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(t, n = fs) {
    const r = J(t);
    return AA(n), CI(r), wI(r).map((s) => n[s]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(t, n = "") {
    Ki($i(t));
    const r = ko(mI(t)), s = ko(`mnemonic${n}`);
    return yr(r, s, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(t, n = "") {
    const r = dn.mnemonicToSeed(t, n);
    return dn.masterKeysFromSeed(r);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(t) {
    const n = $i(t);
    let r = 0;
    try {
      Ki(n);
    } catch {
      return !1;
    }
    for (; r < n.length; ) {
      if (dn.binarySearch(n[r]) === !1)
        return !1;
      r += 1;
    }
    return !0;
  }
  static binarySearch(t) {
    const n = fs;
    let r = 0, s = n.length - 1;
    for (; r <= s; ) {
      const i = Math.floor((r + s) / 2);
      if (n[i] === t)
        return !0;
      t < n[i] ? s = i - 1 : r = i + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(t) {
    const n = J(t);
    if (n.length < 16 || n.length > 64)
      throw new v(
        R.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${n.length} bytes.`
      );
    return J(Ir("sha512", II, n));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(t, n = !1) {
    const r = dn.masterKeysFromSeed(t), s = J(n ? BI : yI), i = "0x00", o = "0x00000000", a = "0x00000000", d = r.slice(32), h = r.slice(0, 32), I = se([
      s,
      i,
      o,
      a,
      d,
      se(["0x00", h])
    ]), E = Ho(It(It(I)), 0, 4);
    return RA(se([I, E]));
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
  static generate(t = 32, n = "") {
    const r = n ? It(se([Bn(t), J(n)])) : Bn(t);
    return dn.entropyToMnemonic(r);
  }
}, Da = bI, d0 = 2147483648, l0 = X("0x0488ade4"), Ra = X("0x0488b21e"), h0 = X("0x04358394"), Na = X("0x043587cf");
function uA(e) {
  return RA(se([e, Ho(It(It(e)), 0, 4)]));
}
function QI(e = !1, t = !1) {
  return e ? t ? Na : Ra : t ? h0 : l0;
}
function xI(e) {
  return [Ra, Na].includes(X(e.slice(0, 4)));
}
function vI(e) {
  return [l0, h0, Ra, Na].includes(
    X(e.slice(0, 4))
  );
}
function FI(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(R.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + d0 : parseInt(r, 10)
  );
}
var DI = class Gn {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(t) {
    x(this, "depth", 0);
    x(this, "index", 0);
    x(this, "fingerprint", X("0x00000000"));
    x(this, "parentFingerprint", X("0x00000000"));
    x(this, "privateKey");
    x(this, "publicKey");
    x(this, "chainCode");
    if (t.privateKey) {
      const n = new Gr(t.privateKey);
      this.publicKey = X(n.compressedPublicKey), this.privateKey = X(t.privateKey);
    } else {
      if (!t.publicKey)
        throw new v(
          R.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(t.publicKey);
    }
    this.parentFingerprint = t.parentFingerprint || this.parentFingerprint, this.fingerprint = Ho(Xr(It(this.publicKey)), 0, 4), this.depth = t.depth || this.depth, this.index = t.index || this.index, this.chainCode = t.chainCode;
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
  deriveIndex(t) {
    const n = this.privateKey && J(this.privateKey), r = J(this.publicKey), s = J(this.chainCode), i = new Uint8Array(37);
    if (t & d0) {
      if (!n)
        throw new v(
          R.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      i.set(n, 1);
    } else
      i.set(J(this.publicKey));
    i.set(Ut(t, 4), 33);
    const o = J(Ir("sha512", s, i)), a = o.slice(0, 32), d = o.slice(32);
    if (n) {
      const E = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", C = Q(a).add(n).mod(E).toBytes(32);
      return new Gn({
        privateKey: C,
        chainCode: d,
        index: t,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const I = new Gr(X(a)).addPoint(r);
    return new Gn({
      publicKey: I,
      chainCode: d,
      index: t,
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
  derivePath(t) {
    return FI(t, this.depth).reduce((r, s) => r.deriveIndex(s), this);
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(t = !1, n = !1) {
    if (this.depth >= 256)
      throw new v(
        R.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const r = QI(this.privateKey == null || t, n), s = X(Uint8Array.from([this.depth])), i = this.parentFingerprint, o = Go(this.index, 4), a = this.chainCode, d = this.privateKey != null && !t ? se(["0x00", this.privateKey]) : this.publicKey, h = J(se([r, s, i, o, a, d]));
    return uA(h);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(t) {
    const n = Da.masterKeysFromSeed(t);
    return new Gn({
      chainCode: J(n.slice(32)),
      privateKey: J(n.slice(0, 32))
    });
  }
  static fromExtendedKey(t) {
    const n = Al(ll(t)), r = J(n), s = uA(r.slice(0, 78)) === t;
    if (r.length !== 82 || !vI(r))
      throw new v(R.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!s)
      throw new v(R.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const i = r[4], o = X(r.slice(5, 9)), a = parseInt(X(r.slice(9, 13)).substring(2), 16), d = X(r.slice(13, 45)), h = r.slice(45, 78);
    if (i === 0 && o !== "0x00000000" || i === 0 && a !== 0)
      throw new v(
        R.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (xI(r)) {
      if (h[0] !== 3)
        throw new v(R.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Gn({
        publicKey: h,
        chainCode: d,
        index: a,
        depth: i,
        parentFingerprint: o
      });
    }
    if (h[0] !== 0)
      throw new v(R.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Gn({
      privateKey: h.slice(1),
      chainCode: d,
      index: a,
      depth: i,
      parentFingerprint: o
    });
  }
}, zi = DI, f0 = class extends wi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Fn(e, this._provider);
  }
}, Fn = class ln extends fI {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Gr("0x00"), new f0(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(t) {
    const n = Gr.generatePrivateKey(t == null ? void 0 : t.entropy);
    return new ln(n, t == null ? void 0 : t.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(t, n, r) {
    const i = zi.fromSeed(t).derivePath(n || ln.defaultPath);
    return new ln(i.privateKey, r);
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
  static fromMnemonic(t, n, r, s) {
    const i = Da.mnemonicToSeed(t, r), a = zi.fromSeed(i).derivePath(n || ln.defaultPath);
    return new ln(a.privateKey, s);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(t, n) {
    const r = zi.fromExtendedKey(t);
    return new ln(r.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(t, n, r) {
    const s = await hI(t, n);
    return new ln(s, r);
  }
}, vn, tn = (vn = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new f0(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Fn(e, t);
  }
}, /**
 * Generate a new Wallet Unlocked with a random key pair.
 *
 * @param generateOptions - Options to customize the generation process (optional).
 * @returns An unlocked wallet instance.
 */
x(vn, "generate", Fn.generate), /**
 * Create a Wallet Unlocked from a seed.
 *
 * @param seed - The seed phrase.
 * @param provider - A Provider instance (optional).
 * @param path - The derivation path (optional).
 * @returns An unlocked wallet instance.
 */
x(vn, "fromSeed", Fn.fromSeed), /**
 * Create a Wallet Unlocked from a mnemonic phrase.
 *
 * @param mnemonic - The mnemonic phrase.
 * @param provider - A Provider instance (optional).
 * @param path - The derivation path (optional).
 * @param passphrase - The passphrase for the mnemonic (optional).
 * @returns An unlocked wallet instance.
 */
x(vn, "fromMnemonic", Fn.fromMnemonic), /**
 * Create a Wallet Unlocked from an extended key.
 *
 * @param extendedKey - The extended key.
 * @param provider - A Provider instance (optional).
 * @returns An unlocked wallet instance.
 */
x(vn, "fromExtendedKey", Fn.fromExtendedKey), /**
 * Create a Wallet Unlocked from an encrypted JSON.
 *
 * @param jsonWallet - The encrypted JSON keystore.
 * @param password - The password to decrypt the JSON.
 * @param provider - A Provider instance (optional).
 * @returns An unlocked wallet instance.
 */
x(vn, "fromEncryptedJson", Fn.fromEncryptedJson), vn), RI = class {
  constructor() {
    x(this, "storage", /* @__PURE__ */ new Map());
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
}, ao, pn, NI = (ao = class {
  constructor(e) {
    Be(this, pn, void 0);
    x(this, "pathKey", "{}");
    x(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`);
    x(this, "numberOfAccounts", 0);
    ve(this, pn, e.secret || Da.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: ie(this, pn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = tn.fromMnemonic(ie(this, pn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = tn.fromMnemonic(ie(this, pn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = me.fromAddressOrString(e);
    do {
      const r = tn.fromMnemonic(ie(this, pn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new v(
      R.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return tn.fromPrivateKey(t);
  }
}, pn = new WeakMap(), x(ao, "type", "mnemonic"), ao), co, zt, SI = (co = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Be(this, zt, []);
    e.secret ? ve(this, zt, [e.secret]) : ve(this, zt, e.accounts || [tn.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: ie(this, zt)
    };
  }
  getPublicAccount(e) {
    const t = tn.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return ie(this, zt).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = tn.generate();
    return ie(this, zt).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = me.fromAddressOrString(e), n = ie(this, zt).find(
      (r) => tn.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new v(
        R.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return tn.fromPrivateKey(t);
  }
}, zt = new WeakMap(), x(co, "type", "privateKey"), co), Wt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function $t(e, t) {
  if (!e)
    throw new v(R.WALLET_MANAGER_ERROR, t);
}
var cr, yt, mn, Pt, zs, g0, ei, p0, aB = (cr = class extends Zd.EventEmitter {
  constructor(n) {
    super();
    /**
     * Serialize all vaults to store
     *
     * `This is only accessible from inside the class`
     */
    Be(this, zs);
    /**
     * Deserialize all vaults to state
     *
     * `This is only accessible from inside the class`
     */
    Be(this, ei);
    /**
     * Storage
     *
     * Persistent encrypted data. `The default storage works only on memory`.
     */
    x(this, "storage", new RI());
    /* Key name passed to the storage */
    x(this, "STORAGE_KEY", "WalletManager");
    // `This variables are only accessible from inside the class`
    Be(this, yt, []);
    Be(this, mn, "");
    Be(this, Pt, !0);
    this.storage = (n == null ? void 0 : n.storage) || this.storage;
  }
  get isLocked() {
    return ie(this, Pt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(n) {
    $t(!ie(this, Pt), Wt.wallet_not_unlocked);
    const r = ie(this, yt).find((s, i) => i === n);
    return $t(r, Wt.vault_not_found), r.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return ie(this, yt).map((n, r) => ({
      title: n.title,
      type: n.type,
      vaultId: r
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return ie(this, yt).flatMap(
      (n, r) => n.vault.getAccounts().map((s) => ({ ...s, vaultId: r }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(n) {
    const r = me.fromAddressOrString(n), s = ie(this, yt).find(
      (i) => i.vault.getAccounts().find((o) => o.address.equals(r))
    );
    return $t(s, Wt.address_not_found), s.vault.getWallet(r);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(n) {
    const r = me.fromAddressOrString(n);
    $t(!ie(this, Pt), Wt.wallet_not_unlocked);
    const s = ie(this, yt).find(
      (i) => i.vault.getAccounts().find((o) => o.address.equals(r))
    );
    return $t(s, Wt.address_not_found), s.vault.exportAccount(r);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(n) {
    await this.loadState();
    const r = ie(this, yt)[(n == null ? void 0 : n.vaultId) || 0];
    await $t(r, Wt.vault_not_found);
    const s = r.vault.addAccount();
    return await this.saveState(), s;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(n) {
    ie(this, yt).splice(n, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(n) {
    await this.loadState();
    const r = this.getVaultClass(n.type), s = new r(n);
    ve(this, yt, ie(this, yt).concat({
      title: n.title,
      type: n.type,
      vault: s
    })), await this.saveState();
  }
  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  lock() {
    ve(this, Pt, !0), ve(this, yt, []), ve(this, mn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(n) {
    ve(this, mn, n), ve(this, Pt, !1);
    try {
      await this.loadState(), this.emit("unlock");
    } catch (r) {
      throw await this.lock(), r;
    }
  }
  /**
   * Update WalletManager encryption passphrase
   */
  async updatePassphrase(n, r) {
    const s = ie(this, Pt);
    await this.unlock(n), ve(this, mn, r), await this.saveState(), await this.loadState(), s && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await $t(!ie(this, Pt), Wt.wallet_not_unlocked);
    const n = await this.storage.getItem(this.STORAGE_KEY);
    if (n) {
      const r = await Qf(ie(this, mn), JSON.parse(n));
      ve(this, yt, vt(this, ei, p0).call(this, r.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await $t(!ie(this, Pt), Wt.wallet_not_unlocked);
    const n = await xf(ie(this, mn), {
      vaults: vt(this, zs, g0).call(this, ie(this, yt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(n)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(n) {
    const r = cr.Vaults.find((s) => s.type === n);
    return $t(r, Wt.invalid_vault_type), r;
  }
}, yt = new WeakMap(), mn = new WeakMap(), Pt = new WeakMap(), zs = new WeakSet(), g0 = function(n) {
  return n.map(({ title: r, type: s, vault: i }) => ({
    title: r,
    type: s,
    data: i.serialize()
  }));
}, ei = new WeakSet(), p0 = function(n) {
  return n.map(({ title: r, type: s, data: i }) => {
    const o = this.getVaultClass(s);
    return {
      title: r,
      type: s,
      vault: new o(i)
    };
  });
}, /**
 * Vaults
 *
 * Vaults are responsible to store secret keys and return an `Wallet` instance,
 * to interact with the network.
 *
 * Each vault has access to its own state
 *
 */
x(cr, "Vaults", [NI, SI]), cr), Ao, cB = (Ao = class {
  constructor(e) {
    throw new v(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new v(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new v(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new v(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new v(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new v(R.NOT_IMPLEMENTED, "Not implemented.");
  }
}, x(Ao, "type"), Ao), AB = class {
}, _I = (e) => {
  const n = J(e), r = CA(n, 16384), s = Yd(r.map((o) => X(o)));
  return nn(se(["0x4655454C", s]));
}, uB = class Mo extends wi {
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
    bytecode: n,
    abi: r,
    provider: s,
    inputData: i,
    configurableConstants: o
  }) {
    const { predicateBytes: a, predicateInterface: d } = Mo.processPredicateData(
      n,
      r,
      o
    ), h = me.fromB256(_I(a));
    super(h, s);
    x(this, "bytes");
    x(this, "predicateDataBytes", Uint8Array.from([]));
    x(this, "predicateData", []);
    x(this, "interface");
    this.bytes = a, this.interface = d, i !== void 0 && i.length > 0 && (this.predicateData = i);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(n) {
    var i;
    const r = _t(n), { policies: s } = Qa.getPolicyMeta(r);
    return (i = r.inputs) == null || i.forEach((o) => {
      o.type === Ee.Coin && X(o.owner) === this.address.toB256() && (o.predicate = this.bytes, o.predicateData = this.getPredicateData(s.length));
    }), r;
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
  async createTransfer(n, r, s = mt, i = {}) {
    const o = await super.createTransfer(n, r, s, i);
    return this.populateTransactionPredicateData(o);
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(n, r) {
    const s = this.populateTransactionPredicateData(n);
    return super.sendTransaction(s, r);
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(n) {
    const r = this.populateTransactionPredicateData(n);
    return super.simulateTransaction(r);
  }
  getPredicateData(n) {
    var a;
    if (!this.predicateData.length)
      return new Uint8Array();
    const r = (a = this.interface) == null ? void 0 : a.functions.main, s = new Ie(this.bytes.length).encode(this.bytes), o = ai({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + ca + Lf + re + s.byteLength + n * re;
    return (r == null ? void 0 : r.encodeArguments(this.predicateData, o)) || new Uint8Array();
  }
  /**
   * Processes the predicate data and returns the altered bytecode and interface.
   *
   * @param bytes - The bytes of the predicate.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   * @returns An object containing the new predicate bytes and interface.
   */
  static processPredicateData(n, r, s) {
    let i = J(n), o;
    if (r && (o = new Cn(r), o.functions.main === void 0))
      throw new v(
        R.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return s && Object.keys(s).length && (i = Mo.setConfigurableConstants(
      i,
      s,
      o
    )), {
      predicateBytes: i,
      predicateInterface: o
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
  static setConfigurableConstants(n, r, s) {
    const i = n;
    try {
      if (!s)
        throw new Error(
          "Cannot validate configurable constants because the Predicate was instantiated without a JSON ABI"
        );
      if (Object.keys(s.configurables).length === 0)
        throw new Error("Predicate has no configurable constants to be set");
      Object.entries(r).forEach(([o, a]) => {
        if (!(s != null && s.configurables[o]))
          throw new Error(`No configurable constant named '${o}' found in the Predicate`);
        const { offset: d } = s.configurables[o], h = s.encodeConfigurable(o, a);
        i.set(h, d);
      });
    } catch (o) {
      throw new v(
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${o.message}.`
      );
    }
    return i;
  }
}, m0 = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(m0 || {}), Sa = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Sa || {}), w0 = "FuelConnector", kI = class {
  constructor(e) {
    x(this, "storage");
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
}, MI = class extends Zd.EventEmitter {
  constructor() {
    super(...arguments);
    x(this, "name", "");
    x(this, "metadata", {});
    x(this, "connected", !1);
    x(this, "installed", !1);
    x(this, "events", Sa);
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
function OI(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, a, d;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (a = t[r]) == null ? void 0 : a.value;
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
function dB(e) {
  window.dispatchEvent(
    new CustomEvent(w0, {
      detail: e
    })
  );
}
function LI() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function gs(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var TI = 2e3, PI = 5e3, { warn: UI } = console, Xt, lB = (Xt = class extends MI {
  constructor(n = Xt.defaultConfig) {
    super();
    x(this, "_storage", null);
    x(this, "_connectors", []);
    x(this, "_targetObject", null);
    x(this, "_unsubscribes", []);
    x(this, "_targetUnsubscribe");
    x(this, "_pingCache", {});
    x(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    x(this, "setupConnectorListener", () => {
      const { _targetObject: n } = this, r = w0;
      if (n != null && n.on)
        return n.on(r, this.addConnector), () => {
          var s;
          (s = n.off) == null || s.call(n, r, this.addConnector);
        };
      if (n != null && n.addEventListener) {
        const s = (i) => {
          this.addConnector(i.detail);
        };
        return n.addEventListener(r, s), () => {
          var i;
          (i = n.removeEventListener) == null || i.call(n, r, s);
        };
      }
      return () => {
      };
    });
    /**
     * Add a new connector to the list of connectors.
     */
    x(this, "addConnector", async (n) => {
      this.getConnector(n) || this._connectors.push(n), await this.fetchConnectorStatus(n), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(n.name, {
        emitEvents: !1
      });
    });
    x(this, "triggerConnectorEvents", async () => {
      const [n, r, s] = await Promise.all([
        this.isConnected(),
        this.networks(),
        this.currentNetwork()
      ]);
      if (this.emit(this.events.connection, n), this.emit(this.events.networks, r), this.emit(this.events.currentNetwork, s), n) {
        const [i, o] = await Promise.all([
          this.accounts(),
          this.currentAccount()
        ]);
        this.emit(this.events.accounts, i), this.emit(this.events.currentAccount, o);
      }
    });
    /**
     * Get a connector from the list of connectors.
     */
    x(this, "getConnector", (n) => this._connectors.find((r) => {
      const s = typeof n == "string" ? n : n.name;
      return r.name === s || r === n;
    }) || null);
    this.setMaxListeners(1e3), this._connectors = n.connectors ?? [], this._targetObject = this.getTargetObject(n.targetObject), this._storage = n.storage === void 0 ? this.getStorage() : n.storage, this.setupMethods(), this.setDefaultConnector(), this._targetUnsubscribe = this.setupConnectorListener();
  }
  /**
   * Return the target object to listen for global events.
   */
  getTargetObject(n) {
    return n || (typeof window < "u" ? window : typeof document < "u" ? document : null);
  }
  /**
   * Return the storage used.
   */
  getStorage() {
    if (typeof window < "u")
      return new kI(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var r, s;
    const n = await ((r = this._storage) == null ? void 0 : r.getItem(Xt.STORAGE_KEY)) || ((s = this._connectors[0]) == null ? void 0 : s.name);
    if (n)
      return this.selectConnector(n, {
        emitEvents: !1
      });
  }
  /**
   * Start listener for all the events of the current
   * connector and emit them to the Fuel instance
   */
  setupConnectorEvents(n) {
    if (!this._currentConnector)
      return;
    const r = this._currentConnector;
    this._unsubscribes.map((s) => s()), this._unsubscribes = n.map((s) => {
      const i = (...o) => this.emit(s, ...o);
      return r.on(s, i), () => r.off(s, i);
    });
  }
  /**
   * Call method from the current connector.
   */
  async callMethod(n, ...r) {
    const s = await this.hasConnector();
    if (await this.pingConnector(), !this._currentConnector || !s)
      throw new Error(
        `No connector selected for calling ${n}. Use hasConnector before executing other methods.`
      );
    if (typeof this._currentConnector[n] == "function")
      return this._currentConnector[n](...r);
  }
  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  setupMethods() {
    Object.values(m0).forEach((n) => {
      this[n] = async (...r) => this.callMethod(n, ...r);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(n) {
    const r = Date.now(), [s, i] = await Promise.allSettled([
      gs(n.isConnected()),
      gs(this.pingConnector(n))
    ]);
    return r < (n._latestUpdate || 0) || (n._latestUpdate = Date.now(), n.installed = i.status === "fulfilled" && i.value, n.connected = s.status === "fulfilled" && s.value), {
      installed: n.installed,
      connected: n.connected
    };
  }
  /**
   * Fetch the status of all connectors and set the installed and connected
   * status.
   */
  async fetchConnectorsStatus() {
    return Promise.all(
      this._connectors.map(async (n) => this.fetchConnectorStatus(n))
    );
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status. If no connector is provided it will ping the current connector.
   */
  async pingConnector(n) {
    const r = n || this._currentConnector;
    if (!r)
      return !1;
    try {
      return await OI(async () => gs(r.ping()), {
        key: r.name,
        cache: this._pingCache,
        cacheTime: PI
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
  async selectConnector(n, r = {
    emitEvents: !0
  }) {
    var o, a;
    const s = this.getConnector(n);
    if (!s)
      return !1;
    if (((o = this._currentConnector) == null ? void 0 : o.name) === n)
      return !0;
    const { installed: i } = await this.fetchConnectorStatus(s);
    return i ? (this._currentConnector = s, this.emit(this.events.currentConnector, s), this.setupConnectorEvents(Object.values(Sa)), await ((a = this._storage) == null ? void 0 : a.setItem(Xt.STORAGE_KEY, s.name)), r.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const n = LI();
    return this.once(this.events.currentConnector, () => {
      n.resolve(!0);
    }), gs(n.promise, TI).then(() => !0).catch(() => !1);
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
  async getProvider(n) {
    return UI(
      "getProvider is deprecated and is going to be removed in the future, use getWallet instead."
    ), this._getProvider(n);
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  async _getProvider(n) {
    let r;
    if (n && "getTransactionResponse" in n)
      r = n;
    else if (n && "chainId" in n && "url" in n)
      r = await rA.create(n.url);
    else {
      if (n)
        throw new v(R.INVALID_PROVIDER, "Provider is not valid.");
      {
        const s = await this.currentNetwork();
        r = await rA.create(s.url);
      }
    }
    return r;
  }
  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(n, r) {
    const s = await this._getProvider(r);
    return new wi(n, s, this);
  }
  /**
   * Remove all open listeners this is useful when you want to
   * remove the Fuel instance and avoid memory leaks.
   */
  unsubscribe() {
    this._unsubscribes.map((n) => n()), this._targetUnsubscribe(), this.removeAllListeners();
  }
  /**
   * Clean all the data from the storage.
   */
  async clean() {
    var n;
    await ((n = this._storage) == null ? void 0 : n.removeItem(Xt.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, x(Xt, "STORAGE_KEY", "fuel-current-connector"), x(Xt, "defaultConfig", {}), Xt), GI = [
  "Success",
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
  "ErrorFlag",
  "InvalidImmediateValue",
  "ExpectedCoinInput",
  "MaxMemoryAccess",
  "MemoryWriteOverlap",
  "ContractNotInInputs",
  "InternalBalanceOverflow",
  "ContractMaxSize",
  "ExpectedUnallocatedStack",
  "MaxStaticContractsReached",
  "TransferAmountCannotBeZero",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "IllegalJump",
  "NonZeroMessageOutputRecipient",
  "ZeroedMessageOutputRecipient"
], eo = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", HI = (e) => GI.includes(e) ? e : e === "Revert(123)" ? "MismatchedSelector" : "unknown", JI = (e) => {
  if ((e == null ? void 0 : e.type) === "FailureStatus") {
    const t = HI(e.reason);
    return {
      doc: t !== "unknown" ? `${eo}#variant.${t}` : eo,
      reason: t
    };
  }
  return { doc: eo, reason: "unknown" };
};
function dA(e, t) {
  if (!e)
    throw new v(R.TRANSACTION_ERROR, t);
}
var lA = {
  [lg]: "RequireFailed",
  [zu]: "TransferToAddressFailed",
  [hg]: "SendMessageFailed",
  [fg]: "AssertEqFailed",
  [gg]: "AssertFailed",
  [pg]: "Unknown"
}, ZI = (e) => {
  const t = e.val.toHex();
  return lA[t] ? lA[t] : void 0;
}, rs = class extends Error {
  /**
   * Creates a new instance of RevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(t, n) {
    super(`The script reverted with reason ${n}`);
    /**
     * The receipt associated with the revert error.
     */
    x(this, "receipt");
    this.name = "RevertError", this.receipt = t;
  }
  /**
   * Returns a string representation of the RevertError.
   *
   * @returns The string representation of the error.
   */
  toString() {
    const { id: t, ...n } = this.receipt;
    return `${this.name}: ${this.message}
    ${t}: ${JSON.stringify(n)}`;
  }
}, YI = class extends rs {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "RequireRevertError";
  }
}, VI = class extends rs {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "TransferToAddressRevertError";
  }
}, XI = class extends rs {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "SendMessageRevertError";
  }
}, jI = class extends rs {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "AssertFailedRevertError";
  }
}, qI = (e) => {
  const t = ZI(e);
  if (t)
    switch (t) {
      case "RequireFailed":
        return new YI(e, t);
      case "TransferToAddressFailed":
        return new VI(e, t);
      case "SendMessageFailed":
        return new XI(e, t);
      case "AssertFailed":
        return new jI(e, t);
      default:
        return new rs(e, t);
    }
}, { warn: WI } = console, $I = (e) => e.filter((t) => t.type === de.Revert), KI = class {
  constructor(e) {
    x(this, "revertReceipts");
    this.revertReceipts = $I(e);
  }
  assert(e) {
    const t = this.getError();
    if (t)
      throw t.cause = e, t;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && WI(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), qI(this.revertReceipts[0]);
  }
}, zI = (e, t) => typeof t == "bigint" ? t.toString() : t, ey = class extends Error {
  constructor(t, n, r) {
    var a;
    let s = "";
    (a = t == null ? void 0 : t.gqlTransaction) != null && a.status && (s = `${JSON.stringify(JI(t.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      t.receipts.map(({ type: d, ...h }) => ({ type: de[d], ...h })),
      zI,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    x(this, "logs");
    this.logs = r, new KI(t.receipts).assert(this);
  }
}, Vt, IA, E0 = (IA = class {
  constructor(...e) {
    Be(this, Vt, void 0);
    ve(this, Vt, e || []);
  }
  entries() {
    return ie(this, Vt);
  }
  push(...e) {
    ie(this, Vt).push(...e);
  }
  concat(e) {
    return ie(this, Vt).concat(e);
  }
  extend(e) {
    ie(this, Vt).push(...e);
  }
  toBytes() {
    return se(
      ie(this, Vt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(ie(this, Vt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Vt = new WeakMap(), IA), ty = (e) => ca + ai({ maxInputs: e }), I0 = re + kr + _f + re + re;
function ny(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === de.ScriptResult ? n = i : (i.type === de.Return || i.type === de.ReturnData || i.type === de.Revert) && (r = i);
  }), !n)
    throw new v(
      R.TRANSACTION_ERROR,
      "The script call result does not contain a 'scriptResultReceipt'."
    );
  if (!r)
    throw new v(
      R.TRANSACTION_ERROR,
      "The script call result does not contain a 'returnReceipt'."
    );
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function _a(e, t, n = []) {
  try {
    const r = ny(e);
    return t(r);
  } catch (r) {
    throw new ey(
      e,
      r.message,
      n
    );
  }
}
function ry(e, t, n) {
  return _a(
    e,
    (r) => {
      if (r.returnReceipt.type === de.Revert)
        throw new v(
          R.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== de.Return && r.returnReceipt.type !== de.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new v(
          R.SCRIPT_REVERTED,
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
var Hs = class y0 {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(t, n, r) {
    /**
     * The bytes of the script.
     */
    x(this, "bytes");
    /**
     * A function to encode the script data.
     */
    x(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    x(this, "scriptResultDecoder");
    this.bytes = J(t), this.scriptDataEncoder = n, this.scriptResultDecoder = r;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(t, n) {
    return ai({ maxInputs: n }) + ca + t;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(t) {
    return y0.getScriptDataOffsetWithScriptBytes(this.bytes.length, t);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(t) {
    const n = this.scriptDataEncoder(t);
    return ArrayBuffer.isView(n) ? n : (this.bytes = J(n.script), n.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(t, n = []) {
    return _a(t, this.scriptResultDecoder, n);
  }
}, B0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, sy = Ne, C0 = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new E0(
    ls(16, e),
    ls(17, n),
    Sr(17, 17, 0),
    ls(18, r)
  );
  return t ? i.push(
    ls(19, t),
    Sr(19, 19, 0),
    Hc(16, 17, 18, 19)
  ) : i.push(Hc(16, 17, 18, ke.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Sr(21, ke.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Sr(22, ke.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    cm(22, 22, s.encodedLength),
    om(21, 22)
  ]), i;
};
function hA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new E0();
  for (let r = 0; r < e.length; r += 1)
    n.extend(C0(e[r], t[r]).entries());
  return n.push(Dd(1)), n.toBytes();
}
var fA = (e) => e === de.Return || e === de.ReturnData, iy = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === de.Call && r === sy && s === t
), oy = (e, t) => (n) => {
  if (kt(n.code) !== 0)
    throw new v(
      R.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${e} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = iy(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => fA(o)).flatMap((o, a, d) => {
    var h;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === de.Return)
      return [
        new _("u64").encode(o.val)
      ];
    if (o.type === de.ReturnData) {
      const I = J(o.data);
      if (t && fA((h = d[a + 1]) == null ? void 0 : h.type)) {
        const E = d[a + 1];
        return se([I, J(E.data)]);
      }
      return [I];
    }
    return [new Uint8Array()];
  });
}, ay = (e, t, n, r = []) => _a(e, oy(t, n), r), cy = (e) => e.reduce(
  (t, n) => {
    const r = { ...B0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + C0(r, s).byteLength();
  },
  Mt.size()
  // placeholder for single RET instruction which is added later
), Ay = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), gA = (e, t) => new Hs(
  // Script to call the contract, start with stub size matching length of calls
  hA(
    new Array(e.length).fill(B0),
    Ay(e)
  ),
  (n) => {
    var F;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = cy(n), i = (8 - s % 8) % 8, o = s + i, a = ty(t.toNumber()) + o, d = [];
    let h = a;
    const I = [], E = [];
    for (let b = 0; b < r; b += 1) {
      const N = n[b];
      I.push({
        isHeap: N.isOutputDataHeap,
        encodedLength: N.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: h,
        assetIdOffset: h + re,
        gasForwardedOffset: N.gas ? h + re + kr : 0,
        callDataOffset: h + re + kr + S
      }), E.push(new _("u64").encode(N.amount || 0)), E.push(new G().encode(((F = N.assetId) == null ? void 0 : F.toString()) || mt)), E.push(N.contractId.toBytes()), E.push(new _("u64").encode(N.fnSelector)), N.gas && (E.push(new _("u64").encode(N.gas)), S = re), N.isInputDataPointer) {
        const T = h + I0 + S;
        E.push(new _("u64").encode(T));
      }
      const Z = J(N.data);
      E.push(Z), h = a + se(E).byteLength;
    }
    const C = hA(d, I);
    return { data: se(E), script: C };
  },
  () => [new Uint8Array()]
);
function uy(e) {
  const t = e.receipts.find((n) => n.type === de.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var b0 = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    x(this, "functionScopes");
    x(this, "isMultiCall");
    x(this, "gasUsed");
    x(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = uy(t);
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
   * Decodes the value from the call result.
   *
   * @param callResult - The call result.
   * @returns The decoded value.
   */
  getDecodedValue(e) {
    const t = this.getDecodedLogs(e.receipts), n = this.getFirstCallConfig();
    if (this.functionScopes.length === 1 && n && "bytes" in n.program)
      return ry(e, n, t);
    const s = ay(
      e,
      (n == null ? void 0 : n.program).id,
      (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1,
      t
    ).map((i, o) => {
      var d;
      const { func: a } = this.functionScopes[o].getCallConfig();
      return (d = a.decodeOutput(i)) == null ? void 0 : d[0];
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
    const t = this.getFirstCallConfig();
    if (!t)
      return [];
    const { program: n } = t;
    return KE(e, n.interface);
  }
}, dy = class Q0 extends b0 {
  /**
   * Constructs an instance of FunctionInvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param transactionResponse - The transaction response.
   * @param transactionResult - The transaction result.
   * @param program - The program.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(n, r, s, i, o) {
    super(n, s, o);
    x(this, "transactionId");
    x(this, "transactionResponse");
    x(this, "transactionResult");
    x(this, "program");
    x(this, "logs");
    this.transactionResponse = r, this.transactionResult = s, this.transactionId = this.transactionResponse.id, this.program = i, this.logs = this.getDecodedLogs(s.receipts);
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
  static async build(n, r, s, i) {
    const o = await r.waitForResult();
    return new Q0(
      n,
      r,
      o,
      i,
      s
    );
  }
}, to = class x0 extends b0 {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(n, r, s) {
    super(n, r, s);
    x(this, "callResult");
    this.callResult = r;
  }
  /**
   * Builds an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   * @returns The invocation call result.
   */
  static async build(n, r, s) {
    return await new x0(n, r, s);
  }
};
function ly(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), a = e.getCallConfig().func.isInputDataPointer ? I0 : 0, d = i.encodeArguments(r, t + a);
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
var v0 = class {
  // flag to check if any of the callParams has gasLimit set
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    x(this, "transactionRequest");
    x(this, "program");
    x(this, "functionInvocationScopes", []);
    x(this, "txParameters");
    x(this, "requiredCoins", []);
    x(this, "isMultiCall", !1);
    x(this, "hasCallParamsGasLimit", !1);
    this.program = e, this.isMultiCall = t, this.transactionRequest = new zn();
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
    const n = t.maxInputs, r = gA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => ly(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = gA(this.functionInvocationScopes, e);
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
    await wa(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
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
        R.TRANSACTION_ERROR,
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
    return n.gasPrice = Q(kt(n.gasPrice) || kt((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
      resourcesOwner: this.program.account
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
      requiredQuantities: a
    } = await this.getTransactionCost();
    return this.setDefaultTxParams(e, r, n), this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (h) => h.type !== Ee.Coin
    ), await ((d = this.program.account) == null ? void 0 : d.fund(this.transactionRequest, a, t)), this.transactionRequest.updatePredicateInputs(s), o.forEach((h) => {
      this.transactionRequest.addContractInputAndOutput(me.fromString(h));
    }), this.transactionRequest.addVariableOutputs(i), this;
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
      this.transactionRequest.addContractInputAndOutput(t.id), this.program.interface.updateExternalLoggedTypes(t.id.toB256(), t.interface);
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
      me.fromAddressOrString(e),
      t,
      n
    ), this;
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
    dA(this.program.account, "Wallet is required!"), await this.fundWithRequiredCoins();
    const e = await this.program.account.sendTransaction(
      await this.getTransactionRequest(),
      {
        awaitExecution: !0,
        estimateTxDependencies: !1
      }
    );
    return dy.build(
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
    if (dA(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new v(
        R.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    await this.fundWithRequiredCoins();
    const e = await this.program.account.simulateTransaction(
      await this.getTransactionRequest(),
      {
        estimateTxDependencies: !1
      }
    );
    return to.build(this.functionInvocationScopes, e, this.isMultiCall);
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
    return to.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return to.build(
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
    var a, d;
    const r = !!((a = this.txParameters) != null && a.gasLimit) || this.hasCallParamsGasLimit, s = !!((d = this.txParameters) != null && d.gasPrice), { gasLimit: i, gasPrice: o } = e;
    if (!r)
      e.gasLimit = n;
    else if (i.lt(n))
      throw new v(
        R.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${n}'.`
      );
    if (!s)
      e.gasPrice = t;
    else if (o.lt(t))
      throw new v(
        R.GAS_PRICE_TOO_LOW,
        `Gas price '${o}' is lower than the required: '${t}'.`
      );
  }
}, F0 = class extends v0 {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    x(this, "func");
    x(this, "callParameters");
    x(this, "forward");
    x(this, "args");
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
      args: this.args
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
          R.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Ia(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, hy = class extends v0 {
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
          R.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new v(
        R.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, fy = class {
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
    x(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    x(this, "provider");
    /**
     * The contract's ABI interface.
     */
    x(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    x(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    x(this, "functions", {});
    this.interface = t instanceof Cn ? t : new Cn(t), this.id = me.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new F0(this, e, t);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new hy(this, e);
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
}, gy = class extends F0 {
  constructor() {
    super(...arguments);
    x(this, "scriptRequest");
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
    this.scriptRequest = new Hs(
      t,
      (i) => this.func.encodeArguments(
        i,
        Hs.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, hB = class extends Ag {
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
    x(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    x(this, "interface");
    /**
     * The account associated with the script.
     */
    x(this, "account");
    /**
     * The script request object.
     */
    x(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    x(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    x(this, "functions");
    this.bytes = J(t), this.interface = new Cn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new gy(this, this.interface.getFunction("main"), s)
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
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Hs(
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
function fB(e) {
  return e;
}
var py = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(py || {}), my = Object.defineProperty, wy = (e, t) => {
  for (var n in t)
    my(e, n, { get: t[n], enumerable: !0 });
}, Ey = {};
wy(Ey, {
  getContractId: () => N0,
  getContractRoot: () => D0,
  getContractStorageRoot: () => R0,
  hexlifyWithPrefix: () => Oo
});
var D0 = (e) => {
  const n = J(e), r = CA(n, 16384);
  return Yd(r.map((s) => X(s)));
}, R0 = (e) => {
  const t = new uw();
  return e.forEach(({ key: n, value: r }) => t.update(It(n), r)), t.root;
}, N0 = (e, t, n) => {
  const r = D0(J(e));
  return It(se(["0x4655454C", t, r, n]));
}, Oo = (e, t = !1) => {
  if (e.startsWith("0x"))
    return X(e);
  if (t)
    return X(`0x${e}`);
  throw new v(v.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, gB = class S0 {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(t, n, r = null) {
    x(this, "bytecode");
    x(this, "interface");
    x(this, "provider");
    x(this, "account");
    this.bytecode = J(t), n instanceof Cn ? this.interface = n : this.interface = new Cn(n), r && "provider" in r ? (this.provider = r.provider, this.account = r) : (this.provider = r, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(t) {
    return new S0(this.bytecode, this.interface, t);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(t) {
    var a;
    const n = (a = t == null ? void 0 : t.storageSlots) == null ? void 0 : a.map(({ key: d, value: h }) => ({
      key: Oo(d, !0),
      value: Oo(h, !0)
    })).sort(({ key: d }, { key: h }) => d.localeCompare(h)), r = {
      salt: Bn(32),
      ...t,
      storageSlots: n || []
    };
    if (!this.provider)
      throw new v(
        R.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const s = r.stateRoot || R0(r.storageSlots), i = N0(this.bytecode, r.salt, s), o = new _o({
      gasPrice: 0,
      bytecodeWitnessIndex: 0,
      witnesses: [this.bytecode],
      ...r
    });
    return o.addContractCreatedOutput(i, s), {
      contractId: i,
      transactionRequest: o
    };
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployContract(t = {}) {
    if (!this.account)
      throw new v(R.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: n } = t;
    n && this.setConfigurableConstants(n);
    const { contractId: r, transactionRequest: s } = this.createTransactionRequest(t), { requiredQuantities: i, maxFee: o } = await this.account.provider.getTransactionCost(s);
    return s.gasPrice = this.account.provider.getGasConfig().minGasPrice, s.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(s, i, o), await this.account.sendTransaction(s, {
      awaitExecution: !0
    }), new fy(r, this.interface, this.account);
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(t) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new Error("Contract does not have configurables to be set");
      Object.entries(t).forEach(([r, s]) => {
        if (!this.interface.configurables[r])
          throw new Error(`Contract does not have a configurable named: '${r}'`);
        const { offset: i } = this.interface.configurables[r], o = this.interface.encodeConfigurable(r, s), a = J(this.bytecode);
        a.set(o, i), this.bytecode = a;
      });
    } catch (n) {
      throw new v(
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${n.message}.`
      );
    }
  }
}, pB = 9, mB = 3, wB = 9, EB = [
  "Success",
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
  "ErrorFlag",
  "InvalidImmediateValue",
  "ExpectedCoinInput",
  "MaxMemoryAccess",
  "MemoryWriteOverlap",
  "ContractNotInInputs",
  "InternalBalanceOverflow",
  "ContractMaxSize",
  "ExpectedUnallocatedStack",
  "MaxStaticContractsReached",
  "TransferAmountCannotBeZero",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "IllegalJump",
  "NonZeroMessageOutputRecipient",
  "ZeroedMessageOutputRecipient"
], IB = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", yA, yB = typeof process < "u" && ((yA = process == null ? void 0 : process.env) == null ? void 0 : yA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  kr as ASSET_ID_LEN,
  Xu as AbstractAccount,
  ag as AbstractAddress,
  cg as AbstractContract,
  ju as AbstractProgram,
  Ag as AbstractScript,
  _y as AbstractScriptRequest,
  wi as Account,
  me as Address,
  ME as AddressType,
  ht as ArrayCoder,
  jI as AssertFailedRevertError,
  G as B256Coder,
  ku as B512Coder,
  Uo as BN,
  mt as BaseAssetId,
  Qa as BaseTransactionRequest,
  fI as BaseWalletUnlocked,
  _ as BigNumberCoder,
  Jf as BooleanCoder,
  Ie as ByteArrayCoder,
  mo as ByteCoder,
  Xn as CHAIN_IDS,
  _f as CONTRACT_ID_LEN,
  Oy as CONTRACT_MAX_SIZE,
  OE as ChainName,
  qy as ChangeOutputCollisionError,
  oe as Coder,
  py as Commands,
  fy as Contract,
  gB as ContractFactory,
  Ey as ContractUtils,
  _o as CreateTransactionRequest,
  wB as DECIMAL_UNITS,
  mB as DEFAULT_MIN_PRECISION,
  pB as DEFAULT_PRECISION,
  xA as DateTime,
  Jy as EmptyRoot,
  Ou as EnumCoder,
  fg as FAILED_ASSERT_EQ_SIGNAL,
  gg as FAILED_ASSERT_SIGNAL,
  lg as FAILED_REQUIRE_SIGNAL,
  hg as FAILED_SEND_MESSAGE_SIGNAL,
  zu as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  pg as FAILED_UNKNOWN_SIGNAL,
  Ps as FUEL_BECH32_HRP_PREFIX,
  yB as FUEL_NETWORK_URL,
  lB as Fuel,
  MI as FuelConnector,
  w0 as FuelConnectorEventType,
  Sa as FuelConnectorEventTypes,
  m0 as FuelConnectorMethods,
  dy as FunctionInvocationResult,
  F0 as FunctionInvocationScope,
  zi as HDWallet,
  Lf as INPUT_COIN_FIXED_SIZE,
  Ss as InputCoder,
  dc as InputCoinCoder,
  Rs as InputContractCoder,
  Ns as InputMessageCoder,
  Ee as InputType,
  E0 as InstructionSet,
  Cn as Interface,
  to as InvocationCallResult,
  b0 as InvocationResult,
  gI as Language,
  kI as LocalStorage,
  Hy as MAX_PREDICATE_DATA_LENGTH,
  Gy as MAX_PREDICATE_LENGTH,
  Py as MAX_SCRIPT_DATA_LENGTH,
  Ty as MAX_SCRIPT_LENGTH,
  Uy as MAX_STATIC_CONTRACTS,
  Ly as MAX_WITNESSES,
  cA as MNEMONIC_SIZES,
  RI as MemoryStorage,
  Da as Mnemonic,
  NI as MnemonicVault,
  hy as MultiCallInvocationScope,
  pE as NoWitnessAtIndexError,
  Wy as NoWitnessByOwnerError,
  K as NumberCoder,
  kE as OperationName,
  ci as OptionCoder,
  hc as OutputChangeCoder,
  ks as OutputCoder,
  lc as OutputCoinCoder,
  _s as OutputContractCoder,
  gc as OutputContractCreatedCoder,
  Ce as OutputType,
  fc as OutputVariableCoder,
  IB as PANIC_DOC_URL,
  EB as PANIC_REASONS,
  Ms as PoliciesCoder,
  Lt as PolicyType,
  uB as Predicate,
  SI as PrivateKeyVault,
  rA as Provider,
  Yf as RawSliceCoder,
  Io as ReceiptBurnCoder,
  pc as ReceiptCallCoder,
  ky as ReceiptCoder,
  yc as ReceiptLogCoder,
  Bc as ReceiptLogDataCoder,
  Eo as ReceiptMessageOutCoder,
  Os as ReceiptMintCoder,
  Ec as ReceiptPanicCoder,
  mc as ReceiptReturnCoder,
  wc as ReceiptReturnDataCoder,
  Ic as ReceiptRevertCoder,
  Qc as ReceiptScriptResultCoder,
  Cc as ReceiptTransferCoder,
  bc as ReceiptTransferOutCoder,
  de as ReceiptType,
  YI as RequireRevertError,
  rs as RevertError,
  ca as SCRIPT_FIXED_SIZE,
  hB as Script,
  Hs as ScriptRequest,
  ey as ScriptResultDecoderError,
  zn as ScriptTransactionRequest,
  XI as SendMessageRevertError,
  Gr as Signer,
  Vf as StdStringCoder,
  AB as StorageAbstract,
  xc as StorageSlotCoder,
  Xf as StringCoder,
  Ai as StructCoder,
  bn as TransactionCoder,
  Fc as TransactionCreateCoder,
  Dc as TransactionMintCoder,
  qi as TransactionResponse,
  vc as TransactionScriptCoder,
  _E as TransactionStatus,
  Ct as TransactionType,
  SE as TransactionTypeName,
  VI as TransferToAddressRevertError,
  Uu as TupleCoder,
  dr as TxPointerCoder,
  My as UtxoIdCoder,
  cB as Vault,
  Gu as VecCoder,
  re as WORD_SIZE,
  tn as Wallet,
  f0 as WalletLocked,
  aB as WalletManager,
  Fn as WalletUnlocked,
  Ls as WitnessCoder,
  Ne as ZeroBytes32,
  dw as addAmountToAsset,
  mr as addOperation,
  Dr as addressify,
  J as arrayify,
  uE as assembleReceiptByType,
  mi as assembleTransactionSummary,
  dA as assert,
  oB as assets,
  Q as bn,
  wn as bufferFromString,
  jy as buildBlockExplorerUrl,
  OI as cacheFor,
  Wd as calculateMetadataGasForTxCreate,
  $d as calculateMetadataGasForTxScript,
  Kn as calculatePriceWithFactor,
  yE as calculateTransactionFee,
  ai as calculateVmTxMemory,
  yy as capitalizeString,
  CA as chunkAndPadBytes,
  Bg as clearFirst12BytesFromB256,
  Ia as coinQuantityfy,
  se as concat,
  Zr as concatBytes,
  fB as createConfig,
  Qf as decrypt,
  vf as decryptJsonWalletData,
  Cy as defaultChainConfig,
  by as defaultConsensusKey,
  LI as deferPromise,
  dB as dispatchFuelConnectorEvent,
  xf as encrypt,
  Ff as encryptJsonWalletData,
  fs as english,
  qE as extractBurnedAssetsFromReceipts,
  jE as extractMintedAssetsFromReceipts,
  xy as format,
  Qy as formatUnits,
  ua as fromBech32,
  hE as gasUsedByInputs,
  rB as getAssetEth,
  sB as getAssetFuel,
  $u as getAssetId,
  sI as getAssetNetwork,
  c0 as getAssetWithNetwork,
  da as getBytesFromBech32,
  JE as getContractCallOperations,
  VE as getContractCreatedOperations,
  KE as getDecodedLogs,
  rI as getDefaultChainId,
  JI as getDocs,
  jd as getGasUsedFromReceipts,
  va as getInputAccountAddress,
  FE as getInputContractFromIndex,
  e0 as getInputFromAssetId,
  xa as getInputsByType,
  CE as getInputsByTypes,
  bE as getInputsCoin,
  xE as getInputsCoinAndMessage,
  vE as getInputsContract,
  QE as getInputsMessage,
  ba as getMaxGas,
  qd as getMinGas,
  XE as getOperations,
  ns as getOutputsByType,
  RE as getOutputsChange,
  t0 as getOutputsCoin,
  NE as getOutputsContract,
  DE as getOutputsContractCreated,
  $y as getOutputsVariable,
  YE as getPayProducerOperations,
  _I as getPredicateRoot,
  yg as getRandomB256,
  Ur as getReceiptsByType,
  TE as getReceiptsCall,
  PE as getReceiptsMessageOut,
  zy as getReceiptsTransferOut,
  AE as getReceiptsWithMissingData,
  WE as getTransactionStatusName,
  eB as getTransactionSummary,
  tB as getTransactionSummaryFromRequest,
  n0 as getTransactionTypeName,
  nB as getTransactionsSummaries,
  nA as getTransferOperations,
  HE as getWithdrawFromFuelOperations,
  Ky as hasSameAssetId,
  nn as hash,
  Rf as hashMessage,
  X as hexlify,
  iE as inputify,
  yo as isB256,
  ys as isBech32,
  eA as isCoin,
  Bo as isEvmAddress,
  Xy as isMessage,
  Nc as isPublicKey,
  Yy as isRawCoin,
  Vy as isRawMessage,
  Fa as isType,
  r0 as isTypeCreate,
  LE as isTypeMint,
  s0 as isTypeScript,
  mu as keccak256,
  Sy as keyFromPassword,
  K0 as max,
  vy as multiply,
  Ig as normalizeBech32,
  fE as normalizeJSON,
  By as normalizeString,
  oE as outputify,
  Cg as padFirst12BytesOfEvmAddress,
  er as processGqlReceipt,
  $E as processGraphqlStatus,
  Bn as randomBytes,
  En as resolveGasDependentCosts,
  iB as resolveIconPaths,
  tA as returnZeroScript,
  qI as revertErrorFactory,
  pu as scrypt,
  It as sha256,
  gE as sleep,
  ug as sortPolicies,
  Fr as stringFromBuffer,
  Sc as toB256,
  Is as toBech32,
  Ut as toBytes,
  $0 as toFixed,
  Go as toHex,
  kt as toNumber,
  _t as transactionRequestify,
  Df as uint64ToBytesBE,
  cI as urlJoin,
  gs as withTimeout,
  IE as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
