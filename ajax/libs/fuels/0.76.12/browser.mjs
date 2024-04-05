var $0 = Object.defineProperty;
var W0 = (e, t, n) => t in e ? $0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => (W0(e, typeof t != "symbol" ? t + "" : t, n), n), Hi = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Ee = (e, t, n) => (Hi(e, t, "read from private field"), n ? n.call(e) : t.get(e)), ft = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Ct = (e, t, n, r) => (Hi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var sn = (e, t, n) => (Hi(e, t, "access private method"), n);
function vA() {
  return {
    FORC: "0.51.1",
    FUEL_CORE: "0.22.1",
    FUELS: "0.76.12"
  };
}
function Wa(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Po(e, t) {
  const n = Wa(e), r = Wa(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function q0(e, t) {
  const { major: n } = Po(e, t);
  return n === 0;
}
function K0(e, t) {
  const { minor: n } = Po(e, t);
  return n === 0;
}
function z0(e, t) {
  const { patch: n } = Po(e, t);
  return n === 0;
}
function el(e) {
  const { FUEL_CORE: t } = vA();
  return {
    supportedVersion: t,
    isMajorSupported: q0(e, t),
    isMinorSupported: K0(e, t),
    isPatchSupported: z0(e, t)
  };
}
var tl = vA(), nl = Object.defineProperty, rl = (e, t, n) => t in e ? nl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, sl = (e, t, n) => (rl(e, typeof t != "symbol" ? t + "" : t, n), n), R = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e))(R || {}), ws = class extends Error {
  constructor(t, n) {
    super(n);
    D(this, "VERSIONS", tl);
    D(this, "code");
    this.code = t, this.name = "FuelError";
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new ws(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(R);
    if (!r.includes(n.code))
      throw new ws(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new ws(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, VERSIONS: s } = this;
    return { code: t, name: n, message: r, VERSIONS: s };
  }
}, x = ws;
sl(x, "CODES", R);
var il = Object.defineProperty, ol = (e, t, n) => t in e ? il(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, al = (e, t, n) => (ol(e, typeof t != "symbol" ? t + "" : t, n), n), BB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, FA = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(c, c + t)), n.push(d);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, Z = (e) => {
  if (e instanceof Uint8Array)
    return new Uint8Array(e);
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const t = new Uint8Array((e.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < t.length; r++)
      t[r] = parseInt(e.substring(n, n + 2), 16), n += 2;
    return t;
  }
  throw new x(R.PARSE_FAILED, "invalid BytesLike value");
}, jr = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, se = (e) => {
  const t = e.map((n) => Z(n));
  return jr(t);
}, qa = "0123456789abcdef";
function X(e) {
  const t = Z(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += qa[(s & 240) >> 4] + qa[s & 15];
  }
  return n;
}
var CB = (e) => {
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
    throw new x(R.PARSE_FAILED, r);
  }
  return n;
}, cl = 37, DA = BigInt(2 ** 62) + BigInt(cl), Al = (e) => Math.floor(e / 1e3), RA = (e) => e * 1e3, ul = (e) => Number(BigInt(e) - DA), dl = (e) => String(BigInt(e) + DA), ll = (e) => RA(ul(e)), Es = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Es(ll(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Es(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Es(RA(e));
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
    return dl(this.toUnixSeconds());
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
    return Al(this.getTime());
  }
}, Uo = Es;
al(Uo, "TAI64_NULL", "");
var hl = {
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
}, bB = hl, QB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298", be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Go(e) {
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
var Ho = { exports: {} };
const gl = {}, pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gl
}, Symbol.toStringTag, { value: "Module" })), ml = /* @__PURE__ */ Go(pl);
Ho.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = ml.Buffer;
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
      var f, E, y = 0;
      if (l === "be")
        for (m = a.length - 1, f = 0; m >= 0; m -= 3)
          E = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[f] |= E << y & 67108863, this.words[f + 1] = E >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (l === "le")
        for (m = 0, f = 0; m < a.length; m += 3)
          E = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[f] |= E << y & 67108863, this.words[f + 1] = E >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
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
      var f = 0, E = 0, y;
      if (l === "be")
        for (m = a.length - 1; m >= A; m -= 2)
          y = d(a, A, m) << f, this.words[E] |= y & 67108863, f >= 18 ? (f -= 18, E += 1, this.words[E] |= y >>> 26) : f += 8;
      else {
        var p = a.length - A;
        for (m = p % 2 === 0 ? A + 1 : A; m < a.length; m += 2)
          y = d(a, A, m) << f, this.words[E] |= y & 67108863, f >= 18 ? (f -= 18, E += 1, this.words[E] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(B, a, A, l) {
      for (var m = 0, f = 0, E = Math.min(B.length, A), y = a; y < E; y++) {
        var p = B.charCodeAt(y) - 48;
        m *= l, p >= 49 ? f = p - 49 + 10 : p >= 17 ? f = p - 17 + 10 : f = p, r(p >= 0 && f < l, "Invalid character"), m += f;
      }
      return m;
    }
    i.prototype._parseBase = function(a, A, l) {
      this.words = [0], this.length = 1;
      for (var m = 0, f = 1; f <= 67108863; f *= A)
        m++;
      m--, f = f / A | 0;
      for (var E = a.length - l, y = E % m, p = Math.min(E, E - y) + l, u = 0, w = l; w < p; w += m)
        u = h(a, w, w + m, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var Y = 1;
        for (u = h(a, w, a.length, A), w = 0; w < y; w++)
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
    function I(B, a) {
      B.words = a.words, B.length = a.length, B.negative = a.negative, B.red = a.red;
    }
    if (i.prototype._move = function(a) {
      I(a, this);
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
    ], v = [
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
        for (var m = 0, f = 0, E = 0; E < this.length; E++) {
          var y = this.words[E], p = ((y << m | f) & 16777215).toString(16);
          f = y >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, E--), f !== 0 || E !== this.length - 1 ? l = b[6 - p.length] + p + l : l = p + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % A !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = F[a], w = v[a];
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
      var m = this.byteLength(), f = l || Math.max(1, m);
      r(m <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var E = C(a, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](E, m), E;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var l = 0, m = 0, f = 0, E = 0; f < this.length; f++) {
        var y = this.words[f] << E | m;
        a[l++] = y & 255, l < a.length && (a[l++] = y >> 8 & 255), l < a.length && (a[l++] = y >> 16 & 255), E === 6 ? (l < a.length && (a[l++] = y >> 24 & 255), m = 0, E = 0) : (m = y >>> 24, E += 2);
      }
      if (l < a.length)
        for (a[l++] = m; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var l = a.length - 1, m = 0, f = 0, E = 0; f < this.length; f++) {
        var y = this.words[f] << E | m;
        a[l--] = y & 255, l >= 0 && (a[l--] = y >> 8 & 255), l >= 0 && (a[l--] = y >> 16 & 255), E === 6 ? (l >= 0 && (a[l--] = y >> 24 & 255), m = 0, E = 0) : (m = y >>> 24, E += 2);
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
    function N(B) {
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
      for (var f = 0, E = 0; E < m.length; E++)
        A = (l.words[E] | 0) + (m.words[E] | 0) + f, this.words[E] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && E < l.length; E++)
        A = (l.words[E] | 0) + f, this.words[E] = A & 67108863, f = A >>> 26;
      if (this.length = l.length, f !== 0)
        this.words[this.length] = f, this.length++;
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
      var m, f;
      l > 0 ? (m = this, f = a) : (m = a, f = this);
      for (var E = 0, y = 0; y < f.length; y++)
        A = (m.words[y] | 0) - (f.words[y] | 0) + E, E = A >> 26, this.words[y] = A & 67108863;
      for (; E !== 0 && y < m.length; y++)
        A = (m.words[y] | 0) + E, E = A >> 26, this.words[y] = A & 67108863;
      if (E === 0 && y < m.length && m !== this)
        for (; y < m.length; y++)
          this.words[y] = m.words[y];
      return this.length = Math.max(this.length, y), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function S(B, a, A) {
      A.negative = a.negative ^ B.negative;
      var l = B.length + a.length | 0;
      A.length = l, l = l - 1 | 0;
      var m = B.words[0] | 0, f = a.words[0] | 0, E = m * f, y = E & 67108863, p = E / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < l; u++) {
        for (var w = p >>> 26, Y = p & 67108863, V = Math.min(u, a.length - 1), q = Math.max(0, u - B.length + 1); q <= V; q++) {
          var $ = u - q | 0;
          m = B.words[$] | 0, f = a.words[q] | 0, E = m * f + Y, w += E / 67108864 | 0, Y = E & 67108863;
        }
        A.words[u] = Y | 0, p = w | 0;
      }
      return p !== 0 ? A.words[u] = p | 0 : A.length--, A._strip();
    }
    var J = function(a, A, l) {
      var m = a.words, f = A.words, E = l.words, y = 0, p, u, w, Y = m[0] | 0, V = Y & 8191, q = Y >>> 13, $ = m[1] | 0, te = $ & 8191, ne = $ >>> 13, Se = m[2] | 0, fe = Se & 8191, oe = Se >>> 13, Fe = m[3] | 0, de = Fe & 8191, ge = Fe >>> 13, Zt = m[4] | 0, De = Zt & 8191, ye = Zt >>> 13, Cr = m[5] | 0, _e = Cr & 8191, Le = Cr >>> 13, os = m[6] | 0, Ue = os & 8191, Ge = os >>> 13, La = m[7] | 0, He = La & 8191, Je = La >>> 13, Ta = m[8] | 0, Ze = Ta & 8191, Ye = Ta >>> 13, Pa = m[9] | 0, Ve = Pa & 8191, Xe = Pa >>> 13, Ua = f[0] | 0, je = Ua & 8191, $e = Ua >>> 13, Ga = f[1] | 0, We = Ga & 8191, qe = Ga >>> 13, Ha = f[2] | 0, Ke = Ha & 8191, ze = Ha >>> 13, Ja = f[3] | 0, et = Ja & 8191, tt = Ja >>> 13, Za = f[4] | 0, nt = Za & 8191, rt = Za >>> 13, Ya = f[5] | 0, st = Ya & 8191, it = Ya >>> 13, Va = f[6] | 0, ot = Va & 8191, at = Va >>> 13, Xa = f[7] | 0, ct = Xa & 8191, At = Xa >>> 13, ja = f[8] | 0, ut = ja & 8191, dt = ja >>> 13, $a = f[9] | 0, lt = $a & 8191, ht = $a >>> 13;
      l.negative = a.negative ^ A.negative, l.length = 19, p = Math.imul(V, je), u = Math.imul(V, $e), u = u + Math.imul(q, je) | 0, w = Math.imul(q, $e);
      var Ci = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, p = Math.imul(te, je), u = Math.imul(te, $e), u = u + Math.imul(ne, je) | 0, w = Math.imul(ne, $e), p = p + Math.imul(V, We) | 0, u = u + Math.imul(V, qe) | 0, u = u + Math.imul(q, We) | 0, w = w + Math.imul(q, qe) | 0;
      var bi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, p = Math.imul(fe, je), u = Math.imul(fe, $e), u = u + Math.imul(oe, je) | 0, w = Math.imul(oe, $e), p = p + Math.imul(te, We) | 0, u = u + Math.imul(te, qe) | 0, u = u + Math.imul(ne, We) | 0, w = w + Math.imul(ne, qe) | 0, p = p + Math.imul(V, Ke) | 0, u = u + Math.imul(V, ze) | 0, u = u + Math.imul(q, Ke) | 0, w = w + Math.imul(q, ze) | 0;
      var Qi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, p = Math.imul(de, je), u = Math.imul(de, $e), u = u + Math.imul(ge, je) | 0, w = Math.imul(ge, $e), p = p + Math.imul(fe, We) | 0, u = u + Math.imul(fe, qe) | 0, u = u + Math.imul(oe, We) | 0, w = w + Math.imul(oe, qe) | 0, p = p + Math.imul(te, Ke) | 0, u = u + Math.imul(te, ze) | 0, u = u + Math.imul(ne, Ke) | 0, w = w + Math.imul(ne, ze) | 0, p = p + Math.imul(V, et) | 0, u = u + Math.imul(V, tt) | 0, u = u + Math.imul(q, et) | 0, w = w + Math.imul(q, tt) | 0;
      var xi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, p = Math.imul(De, je), u = Math.imul(De, $e), u = u + Math.imul(ye, je) | 0, w = Math.imul(ye, $e), p = p + Math.imul(de, We) | 0, u = u + Math.imul(de, qe) | 0, u = u + Math.imul(ge, We) | 0, w = w + Math.imul(ge, qe) | 0, p = p + Math.imul(fe, Ke) | 0, u = u + Math.imul(fe, ze) | 0, u = u + Math.imul(oe, Ke) | 0, w = w + Math.imul(oe, ze) | 0, p = p + Math.imul(te, et) | 0, u = u + Math.imul(te, tt) | 0, u = u + Math.imul(ne, et) | 0, w = w + Math.imul(ne, tt) | 0, p = p + Math.imul(V, nt) | 0, u = u + Math.imul(V, rt) | 0, u = u + Math.imul(q, nt) | 0, w = w + Math.imul(q, rt) | 0;
      var vi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (vi >>> 26) | 0, vi &= 67108863, p = Math.imul(_e, je), u = Math.imul(_e, $e), u = u + Math.imul(Le, je) | 0, w = Math.imul(Le, $e), p = p + Math.imul(De, We) | 0, u = u + Math.imul(De, qe) | 0, u = u + Math.imul(ye, We) | 0, w = w + Math.imul(ye, qe) | 0, p = p + Math.imul(de, Ke) | 0, u = u + Math.imul(de, ze) | 0, u = u + Math.imul(ge, Ke) | 0, w = w + Math.imul(ge, ze) | 0, p = p + Math.imul(fe, et) | 0, u = u + Math.imul(fe, tt) | 0, u = u + Math.imul(oe, et) | 0, w = w + Math.imul(oe, tt) | 0, p = p + Math.imul(te, nt) | 0, u = u + Math.imul(te, rt) | 0, u = u + Math.imul(ne, nt) | 0, w = w + Math.imul(ne, rt) | 0, p = p + Math.imul(V, st) | 0, u = u + Math.imul(V, it) | 0, u = u + Math.imul(q, st) | 0, w = w + Math.imul(q, it) | 0;
      var Fi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, p = Math.imul(Ue, je), u = Math.imul(Ue, $e), u = u + Math.imul(Ge, je) | 0, w = Math.imul(Ge, $e), p = p + Math.imul(_e, We) | 0, u = u + Math.imul(_e, qe) | 0, u = u + Math.imul(Le, We) | 0, w = w + Math.imul(Le, qe) | 0, p = p + Math.imul(De, Ke) | 0, u = u + Math.imul(De, ze) | 0, u = u + Math.imul(ye, Ke) | 0, w = w + Math.imul(ye, ze) | 0, p = p + Math.imul(de, et) | 0, u = u + Math.imul(de, tt) | 0, u = u + Math.imul(ge, et) | 0, w = w + Math.imul(ge, tt) | 0, p = p + Math.imul(fe, nt) | 0, u = u + Math.imul(fe, rt) | 0, u = u + Math.imul(oe, nt) | 0, w = w + Math.imul(oe, rt) | 0, p = p + Math.imul(te, st) | 0, u = u + Math.imul(te, it) | 0, u = u + Math.imul(ne, st) | 0, w = w + Math.imul(ne, it) | 0, p = p + Math.imul(V, ot) | 0, u = u + Math.imul(V, at) | 0, u = u + Math.imul(q, ot) | 0, w = w + Math.imul(q, at) | 0;
      var Di = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, p = Math.imul(He, je), u = Math.imul(He, $e), u = u + Math.imul(Je, je) | 0, w = Math.imul(Je, $e), p = p + Math.imul(Ue, We) | 0, u = u + Math.imul(Ue, qe) | 0, u = u + Math.imul(Ge, We) | 0, w = w + Math.imul(Ge, qe) | 0, p = p + Math.imul(_e, Ke) | 0, u = u + Math.imul(_e, ze) | 0, u = u + Math.imul(Le, Ke) | 0, w = w + Math.imul(Le, ze) | 0, p = p + Math.imul(De, et) | 0, u = u + Math.imul(De, tt) | 0, u = u + Math.imul(ye, et) | 0, w = w + Math.imul(ye, tt) | 0, p = p + Math.imul(de, nt) | 0, u = u + Math.imul(de, rt) | 0, u = u + Math.imul(ge, nt) | 0, w = w + Math.imul(ge, rt) | 0, p = p + Math.imul(fe, st) | 0, u = u + Math.imul(fe, it) | 0, u = u + Math.imul(oe, st) | 0, w = w + Math.imul(oe, it) | 0, p = p + Math.imul(te, ot) | 0, u = u + Math.imul(te, at) | 0, u = u + Math.imul(ne, ot) | 0, w = w + Math.imul(ne, at) | 0, p = p + Math.imul(V, ct) | 0, u = u + Math.imul(V, At) | 0, u = u + Math.imul(q, ct) | 0, w = w + Math.imul(q, At) | 0;
      var Ri = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, p = Math.imul(Ze, je), u = Math.imul(Ze, $e), u = u + Math.imul(Ye, je) | 0, w = Math.imul(Ye, $e), p = p + Math.imul(He, We) | 0, u = u + Math.imul(He, qe) | 0, u = u + Math.imul(Je, We) | 0, w = w + Math.imul(Je, qe) | 0, p = p + Math.imul(Ue, Ke) | 0, u = u + Math.imul(Ue, ze) | 0, u = u + Math.imul(Ge, Ke) | 0, w = w + Math.imul(Ge, ze) | 0, p = p + Math.imul(_e, et) | 0, u = u + Math.imul(_e, tt) | 0, u = u + Math.imul(Le, et) | 0, w = w + Math.imul(Le, tt) | 0, p = p + Math.imul(De, nt) | 0, u = u + Math.imul(De, rt) | 0, u = u + Math.imul(ye, nt) | 0, w = w + Math.imul(ye, rt) | 0, p = p + Math.imul(de, st) | 0, u = u + Math.imul(de, it) | 0, u = u + Math.imul(ge, st) | 0, w = w + Math.imul(ge, it) | 0, p = p + Math.imul(fe, ot) | 0, u = u + Math.imul(fe, at) | 0, u = u + Math.imul(oe, ot) | 0, w = w + Math.imul(oe, at) | 0, p = p + Math.imul(te, ct) | 0, u = u + Math.imul(te, At) | 0, u = u + Math.imul(ne, ct) | 0, w = w + Math.imul(ne, At) | 0, p = p + Math.imul(V, ut) | 0, u = u + Math.imul(V, dt) | 0, u = u + Math.imul(q, ut) | 0, w = w + Math.imul(q, dt) | 0;
      var Ni = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, p = Math.imul(Ve, je), u = Math.imul(Ve, $e), u = u + Math.imul(Xe, je) | 0, w = Math.imul(Xe, $e), p = p + Math.imul(Ze, We) | 0, u = u + Math.imul(Ze, qe) | 0, u = u + Math.imul(Ye, We) | 0, w = w + Math.imul(Ye, qe) | 0, p = p + Math.imul(He, Ke) | 0, u = u + Math.imul(He, ze) | 0, u = u + Math.imul(Je, Ke) | 0, w = w + Math.imul(Je, ze) | 0, p = p + Math.imul(Ue, et) | 0, u = u + Math.imul(Ue, tt) | 0, u = u + Math.imul(Ge, et) | 0, w = w + Math.imul(Ge, tt) | 0, p = p + Math.imul(_e, nt) | 0, u = u + Math.imul(_e, rt) | 0, u = u + Math.imul(Le, nt) | 0, w = w + Math.imul(Le, rt) | 0, p = p + Math.imul(De, st) | 0, u = u + Math.imul(De, it) | 0, u = u + Math.imul(ye, st) | 0, w = w + Math.imul(ye, it) | 0, p = p + Math.imul(de, ot) | 0, u = u + Math.imul(de, at) | 0, u = u + Math.imul(ge, ot) | 0, w = w + Math.imul(ge, at) | 0, p = p + Math.imul(fe, ct) | 0, u = u + Math.imul(fe, At) | 0, u = u + Math.imul(oe, ct) | 0, w = w + Math.imul(oe, At) | 0, p = p + Math.imul(te, ut) | 0, u = u + Math.imul(te, dt) | 0, u = u + Math.imul(ne, ut) | 0, w = w + Math.imul(ne, dt) | 0, p = p + Math.imul(V, lt) | 0, u = u + Math.imul(V, ht) | 0, u = u + Math.imul(q, lt) | 0, w = w + Math.imul(q, ht) | 0;
      var Si = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, p = Math.imul(Ve, We), u = Math.imul(Ve, qe), u = u + Math.imul(Xe, We) | 0, w = Math.imul(Xe, qe), p = p + Math.imul(Ze, Ke) | 0, u = u + Math.imul(Ze, ze) | 0, u = u + Math.imul(Ye, Ke) | 0, w = w + Math.imul(Ye, ze) | 0, p = p + Math.imul(He, et) | 0, u = u + Math.imul(He, tt) | 0, u = u + Math.imul(Je, et) | 0, w = w + Math.imul(Je, tt) | 0, p = p + Math.imul(Ue, nt) | 0, u = u + Math.imul(Ue, rt) | 0, u = u + Math.imul(Ge, nt) | 0, w = w + Math.imul(Ge, rt) | 0, p = p + Math.imul(_e, st) | 0, u = u + Math.imul(_e, it) | 0, u = u + Math.imul(Le, st) | 0, w = w + Math.imul(Le, it) | 0, p = p + Math.imul(De, ot) | 0, u = u + Math.imul(De, at) | 0, u = u + Math.imul(ye, ot) | 0, w = w + Math.imul(ye, at) | 0, p = p + Math.imul(de, ct) | 0, u = u + Math.imul(de, At) | 0, u = u + Math.imul(ge, ct) | 0, w = w + Math.imul(ge, At) | 0, p = p + Math.imul(fe, ut) | 0, u = u + Math.imul(fe, dt) | 0, u = u + Math.imul(oe, ut) | 0, w = w + Math.imul(oe, dt) | 0, p = p + Math.imul(te, lt) | 0, u = u + Math.imul(te, ht) | 0, u = u + Math.imul(ne, lt) | 0, w = w + Math.imul(ne, ht) | 0;
      var _i = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, p = Math.imul(Ve, Ke), u = Math.imul(Ve, ze), u = u + Math.imul(Xe, Ke) | 0, w = Math.imul(Xe, ze), p = p + Math.imul(Ze, et) | 0, u = u + Math.imul(Ze, tt) | 0, u = u + Math.imul(Ye, et) | 0, w = w + Math.imul(Ye, tt) | 0, p = p + Math.imul(He, nt) | 0, u = u + Math.imul(He, rt) | 0, u = u + Math.imul(Je, nt) | 0, w = w + Math.imul(Je, rt) | 0, p = p + Math.imul(Ue, st) | 0, u = u + Math.imul(Ue, it) | 0, u = u + Math.imul(Ge, st) | 0, w = w + Math.imul(Ge, it) | 0, p = p + Math.imul(_e, ot) | 0, u = u + Math.imul(_e, at) | 0, u = u + Math.imul(Le, ot) | 0, w = w + Math.imul(Le, at) | 0, p = p + Math.imul(De, ct) | 0, u = u + Math.imul(De, At) | 0, u = u + Math.imul(ye, ct) | 0, w = w + Math.imul(ye, At) | 0, p = p + Math.imul(de, ut) | 0, u = u + Math.imul(de, dt) | 0, u = u + Math.imul(ge, ut) | 0, w = w + Math.imul(ge, dt) | 0, p = p + Math.imul(fe, lt) | 0, u = u + Math.imul(fe, ht) | 0, u = u + Math.imul(oe, lt) | 0, w = w + Math.imul(oe, ht) | 0;
      var ki = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, p = Math.imul(Ve, et), u = Math.imul(Ve, tt), u = u + Math.imul(Xe, et) | 0, w = Math.imul(Xe, tt), p = p + Math.imul(Ze, nt) | 0, u = u + Math.imul(Ze, rt) | 0, u = u + Math.imul(Ye, nt) | 0, w = w + Math.imul(Ye, rt) | 0, p = p + Math.imul(He, st) | 0, u = u + Math.imul(He, it) | 0, u = u + Math.imul(Je, st) | 0, w = w + Math.imul(Je, it) | 0, p = p + Math.imul(Ue, ot) | 0, u = u + Math.imul(Ue, at) | 0, u = u + Math.imul(Ge, ot) | 0, w = w + Math.imul(Ge, at) | 0, p = p + Math.imul(_e, ct) | 0, u = u + Math.imul(_e, At) | 0, u = u + Math.imul(Le, ct) | 0, w = w + Math.imul(Le, At) | 0, p = p + Math.imul(De, ut) | 0, u = u + Math.imul(De, dt) | 0, u = u + Math.imul(ye, ut) | 0, w = w + Math.imul(ye, dt) | 0, p = p + Math.imul(de, lt) | 0, u = u + Math.imul(de, ht) | 0, u = u + Math.imul(ge, lt) | 0, w = w + Math.imul(ge, ht) | 0;
      var Mi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, p = Math.imul(Ve, nt), u = Math.imul(Ve, rt), u = u + Math.imul(Xe, nt) | 0, w = Math.imul(Xe, rt), p = p + Math.imul(Ze, st) | 0, u = u + Math.imul(Ze, it) | 0, u = u + Math.imul(Ye, st) | 0, w = w + Math.imul(Ye, it) | 0, p = p + Math.imul(He, ot) | 0, u = u + Math.imul(He, at) | 0, u = u + Math.imul(Je, ot) | 0, w = w + Math.imul(Je, at) | 0, p = p + Math.imul(Ue, ct) | 0, u = u + Math.imul(Ue, At) | 0, u = u + Math.imul(Ge, ct) | 0, w = w + Math.imul(Ge, At) | 0, p = p + Math.imul(_e, ut) | 0, u = u + Math.imul(_e, dt) | 0, u = u + Math.imul(Le, ut) | 0, w = w + Math.imul(Le, dt) | 0, p = p + Math.imul(De, lt) | 0, u = u + Math.imul(De, ht) | 0, u = u + Math.imul(ye, lt) | 0, w = w + Math.imul(ye, ht) | 0;
      var Oi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, p = Math.imul(Ve, st), u = Math.imul(Ve, it), u = u + Math.imul(Xe, st) | 0, w = Math.imul(Xe, it), p = p + Math.imul(Ze, ot) | 0, u = u + Math.imul(Ze, at) | 0, u = u + Math.imul(Ye, ot) | 0, w = w + Math.imul(Ye, at) | 0, p = p + Math.imul(He, ct) | 0, u = u + Math.imul(He, At) | 0, u = u + Math.imul(Je, ct) | 0, w = w + Math.imul(Je, At) | 0, p = p + Math.imul(Ue, ut) | 0, u = u + Math.imul(Ue, dt) | 0, u = u + Math.imul(Ge, ut) | 0, w = w + Math.imul(Ge, dt) | 0, p = p + Math.imul(_e, lt) | 0, u = u + Math.imul(_e, ht) | 0, u = u + Math.imul(Le, lt) | 0, w = w + Math.imul(Le, ht) | 0;
      var Li = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, p = Math.imul(Ve, ot), u = Math.imul(Ve, at), u = u + Math.imul(Xe, ot) | 0, w = Math.imul(Xe, at), p = p + Math.imul(Ze, ct) | 0, u = u + Math.imul(Ze, At) | 0, u = u + Math.imul(Ye, ct) | 0, w = w + Math.imul(Ye, At) | 0, p = p + Math.imul(He, ut) | 0, u = u + Math.imul(He, dt) | 0, u = u + Math.imul(Je, ut) | 0, w = w + Math.imul(Je, dt) | 0, p = p + Math.imul(Ue, lt) | 0, u = u + Math.imul(Ue, ht) | 0, u = u + Math.imul(Ge, lt) | 0, w = w + Math.imul(Ge, ht) | 0;
      var Ti = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, p = Math.imul(Ve, ct), u = Math.imul(Ve, At), u = u + Math.imul(Xe, ct) | 0, w = Math.imul(Xe, At), p = p + Math.imul(Ze, ut) | 0, u = u + Math.imul(Ze, dt) | 0, u = u + Math.imul(Ye, ut) | 0, w = w + Math.imul(Ye, dt) | 0, p = p + Math.imul(He, lt) | 0, u = u + Math.imul(He, ht) | 0, u = u + Math.imul(Je, lt) | 0, w = w + Math.imul(Je, ht) | 0;
      var Pi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, p = Math.imul(Ve, ut), u = Math.imul(Ve, dt), u = u + Math.imul(Xe, ut) | 0, w = Math.imul(Xe, dt), p = p + Math.imul(Ze, lt) | 0, u = u + Math.imul(Ze, ht) | 0, u = u + Math.imul(Ye, lt) | 0, w = w + Math.imul(Ye, ht) | 0;
      var Ui = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, p = Math.imul(Ve, lt), u = Math.imul(Ve, ht), u = u + Math.imul(Xe, lt) | 0, w = Math.imul(Xe, ht);
      var Gi = (y + p | 0) + ((u & 8191) << 13) | 0;
      return y = (w + (u >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, E[0] = Ci, E[1] = bi, E[2] = Qi, E[3] = xi, E[4] = vi, E[5] = Fi, E[6] = Di, E[7] = Ri, E[8] = Ni, E[9] = Si, E[10] = _i, E[11] = ki, E[12] = Mi, E[13] = Oi, E[14] = Li, E[15] = Ti, E[16] = Pi, E[17] = Ui, E[18] = Gi, y !== 0 && (E[19] = y, l.length++), l;
    };
    Math.imul || (J = S);
    function T(B, a, A) {
      A.negative = a.negative ^ B.negative, A.length = B.length + a.length;
      for (var l = 0, m = 0, f = 0; f < A.length - 1; f++) {
        var E = m;
        m = 0;
        for (var y = l & 67108863, p = Math.min(f, a.length - 1), u = Math.max(0, f - B.length + 1); u <= p; u++) {
          var w = f - u, Y = B.words[w] | 0, V = a.words[u] | 0, q = Y * V, $ = q & 67108863;
          E = E + (q / 67108864 | 0) | 0, $ = $ + y | 0, y = $ & 67108863, E = E + ($ >>> 26) | 0, m += E >>> 26, E &= 67108863;
        }
        A.words[f] = y, l = E, E = m;
      }
      return l !== 0 ? A.words[f] = l : A.length--, A._strip();
    }
    function j(B, a, A) {
      return T(B, a, A);
    }
    i.prototype.mulTo = function(a, A) {
      var l, m = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = J(this, a, A) : m < 63 ? l = S(this, a, A) : m < 1024 ? l = T(this, a, A) : l = j(this, a, A), l;
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
        var f = (this.words[m] | 0) * a, E = (f & 67108863) + (l & 67108863);
        l >>= 26, l += f / 67108864 | 0, l += E >>> 26, this.words[m] = E & 67108863;
      }
      return l !== 0 && (this.words[m] = l, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var A = N(a);
      if (A.length === 0)
        return new i(1);
      for (var l = this, m = 0; m < A.length && A[m] === 0; m++, l = l.sqr())
        ;
      if (++m < A.length)
        for (var f = l.sqr(); m < A.length; m++, f = f.sqr())
          A[m] !== 0 && (l = l.mul(f));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, l = (a - A) / 26, m = 67108863 >>> 26 - A << 26 - A, f;
      if (A !== 0) {
        var E = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & m, p = (this.words[f] | 0) - y << A;
          this.words[f] = p | E, E = y >>> 26 - A;
        }
        E && (this.words[f] = E, this.length++);
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
    }, i.prototype.iushrn = function(a, A, l) {
      r(typeof a == "number" && a >= 0);
      var m;
      A ? m = (A - A % 26) / 26 : m = 0;
      var f = a % 26, E = Math.min((a - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, p = l;
      if (m -= E, m = Math.max(0, m), p) {
        for (var u = 0; u < E; u++)
          p.words[u] = this.words[u];
        p.length = E;
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
        this.words[u] = w << 26 - f | Y >>> f, w = Y & y;
      }
      return p && w !== 0 && (p.words[p.length++] = w), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var f = this.words[l];
      return !!(f & m);
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
      var m = a.length + l, f;
      this._expand(m);
      var E, y = 0;
      for (f = 0; f < a.length; f++) {
        E = (this.words[f + l] | 0) + y;
        var p = (a.words[f] | 0) * A;
        E -= p & 67108863, y = (E >> 26) - (p / 67108864 | 0), this.words[f + l] = E & 67108863;
      }
      for (; f < this.length - l; f++)
        E = (this.words[f + l] | 0) + y, y = E >> 26, this.words[f + l] = E & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        E = -(this.words[f] | 0) + y, y = E >> 26, this.words[f] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var l = this.length - a.length, m = this.clone(), f = a, E = f.words[f.length - 1] | 0, y = this._countBits(E);
      l = 26 - y, l !== 0 && (f = f.ushln(l), m.iushln(l), E = f.words[f.length - 1] | 0);
      var p = m.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = p + 1, u.words = new Array(u.length);
        for (var w = 0; w < u.length; w++)
          u.words[w] = 0;
      }
      var Y = m.clone()._ishlnsubmul(f, 1, p);
      Y.negative === 0 && (m = Y, u && (u.words[p] = 1));
      for (var V = p - 1; V >= 0; V--) {
        var q = (m.words[f.length + V] | 0) * 67108864 + (m.words[f.length + V - 1] | 0);
        for (q = Math.min(q / E | 0, 67108863), m._ishlnsubmul(f, q, V); m.negative !== 0; )
          q--, m.negative = 0, m._ishlnsubmul(f, 1, V), m.isZero() || (m.negative ^= 1);
        u && (u.words[V] = q);
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
      var m, f, E;
      return this.negative !== 0 && a.negative === 0 ? (E = this.neg().divmod(a, A), A !== "mod" && (m = E.div.neg()), A !== "div" && (f = E.mod.neg(), l && f.negative !== 0 && f.iadd(a)), {
        div: m,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (E = this.divmod(a.neg(), A), A !== "mod" && (m = E.div.neg()), {
        div: m,
        mod: E.mod
      }) : this.negative & a.negative ? (E = this.neg().divmod(a.neg(), A), A !== "div" && (f = E.mod.neg(), l && f.negative !== 0 && f.isub(a)), {
        div: E.div,
        mod: f
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
      var l = A.div.negative !== 0 ? A.mod.isub(a) : A.mod, m = a.ushrn(1), f = a.andln(1), E = l.cmp(m);
      return E < 0 || f === 1 && E === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, m = 0, f = this.length - 1; f >= 0; f--)
        m = (l * m + (this.words[f] | 0)) % a;
      return A ? -m : m;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var l = 0, m = this.length - 1; m >= 0; m--) {
        var f = (this.words[m] | 0) + l * 67108864;
        this.words[m] = f / a | 0, l = f % a;
      }
      return this._strip(), A ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, l = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), E = new i(0), y = new i(1), p = 0; A.isEven() && l.isEven(); )
        A.iushrn(1), l.iushrn(1), ++p;
      for (var u = l.clone(), w = A.clone(); !A.isZero(); ) {
        for (var Y = 0, V = 1; !(A.words[0] & V) && Y < 26; ++Y, V <<= 1)
          ;
        if (Y > 0)
          for (A.iushrn(Y); Y-- > 0; )
            (m.isOdd() || f.isOdd()) && (m.iadd(u), f.isub(w)), m.iushrn(1), f.iushrn(1);
        for (var q = 0, $ = 1; !(l.words[0] & $) && q < 26; ++q, $ <<= 1)
          ;
        if (q > 0)
          for (l.iushrn(q); q-- > 0; )
            (E.isOdd() || y.isOdd()) && (E.iadd(u), y.isub(w)), E.iushrn(1), y.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), m.isub(E), f.isub(y)) : (l.isub(A), E.isub(m), y.isub(f));
      }
      return {
        a: E,
        b: y,
        gcd: l.iushln(p)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, l = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), E = l.clone(); A.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var y = 0, p = 1; !(A.words[0] & p) && y < 26; ++y, p <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            m.isOdd() && m.iadd(E), m.iushrn(1);
        for (var u = 0, w = 1; !(l.words[0] & w) && u < 26; ++u, w <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(E), f.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), m.isub(f)) : (l.isub(A), f.isub(m));
      }
      var Y;
      return A.cmpn(1) === 0 ? Y = m : Y = f, Y.cmpn(0) < 0 && Y.iadd(a), Y;
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
        var f = A.cmp(l);
        if (f < 0) {
          var E = A;
          A = l, l = E;
        } else if (f === 0 || l.cmpn(1) === 0)
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
      for (var f = m, E = l; f !== 0 && E < this.length; E++) {
        var y = this.words[E] | 0;
        y += f, f = y >>> 26, y &= 67108863, this.words[E] = y;
      }
      return f !== 0 && (this.words[E] = f, this.length++), this;
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
        var m = this.words[l] | 0, f = a.words[l] | 0;
        if (m !== f) {
          m < f ? A = -1 : m > f && (A = 1);
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
      for (var l = 4194303, m = Math.min(a.length, 9), f = 0; f < m; f++)
        A.words[f] = a.words[f];
      if (A.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var E = a.words[9];
      for (A.words[A.length++] = E & l, f = 10; f < a.length; f++) {
        var y = a.words[f] | 0;
        a.words[f - 10] = (y & l) << 4 | E >>> 22, E = y;
      }
      E >>>= 22, a.words[f - 10] = E, E === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
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
        var m = (a.words[l] | 0) * 19 + A, f = m & 67108863;
        m >>>= 26, a.words[l] = f, A = m;
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
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (I(a, a.umod(this.m)._forceRed(this)), a);
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
      for (var m = this.m.subn(1), f = 0; !m.isZero() && m.andln(1) === 0; )
        f++, m.iushrn(1);
      r(!m.isZero());
      var E = new i(1).toRed(this), y = E.redNeg(), p = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, p).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var w = this.pow(u, m), Y = this.pow(a, m.addn(1).iushrn(1)), V = this.pow(a, m), q = f; V.cmp(E) !== 0; ) {
        for (var $ = V, te = 0; $.cmp(E) !== 0; te++)
          $ = $.redSqr();
        r(te < q);
        var ne = this.pow(w, new i(1).iushln(q - te - 1));
        Y = Y.redMul(ne), w = ne.redSqr(), V = V.redMul(w), q = te;
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
      for (var f = 2; f < m.length; f++)
        m[f] = this.mul(m[f - 1], a);
      var E = m[0], y = 0, p = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var w = A.words[f], Y = u - 1; Y >= 0; Y--) {
          var V = w >> Y & 1;
          if (E !== m[0] && (E = this.sqr(E)), V === 0 && y === 0) {
            p = 0;
            continue;
          }
          y <<= 1, y |= V, p++, !(p !== l && (f !== 0 || Y !== 0)) && (E = this.mul(E, m[y]), p = 0, y = 0);
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
      var l = a.imul(A), m = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(m).iushrn(this.shift), E = f;
      return f.cmp(this.m) >= 0 ? E = f.isub(this.m) : f.cmpn(0) < 0 && (E = f.iadd(this.m)), E._forceRed(this);
    }, z.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(A), m = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(m).iushrn(this.shift), E = f;
      return f.cmp(this.m) >= 0 ? E = f.isub(this.m) : f.cmpn(0) < 0 && (E = f.iadd(this.m)), E._forceRed(this);
    }, z.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, be);
})(Ho);
var wl = Ho.exports;
const as = /* @__PURE__ */ fl(wl);
var NA = 9, SA = 3, oo = 9;
function El(e, t) {
  const { precision: n = NA, minPrecision: r = SA } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const I = d.match(/.*[1-9]{1}/), g = (I == null ? void 0 : I[0].length) || 0, b = Math.max(r, g);
    d = d.slice(0, b);
  }
  const h = d ? `.${d}` : "";
  return `${c}${h}`;
}
var Te = class extends as {
  constructor(t, n, r) {
    let s = t, i = n;
    Te.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    D(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new x(R.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new x(
        R.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new x(R.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = oo,
      precision: r = NA,
      minPrecision: s = SA
    } = t || {}, i = this.formatUnits(n), o = El(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = oo) {
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
    return new Te(super.sqr().toArray());
  }
  neg() {
    return new Te(super.neg().toArray());
  }
  abs() {
    return new Te(super.abs().toArray());
  }
  toTwos(t) {
    return new Te(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Te(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new Te(t));
    return Te.isBN(r) ? new Te(r.toArray()) : r;
  }
  clone() {
    return new Te(this.toArray());
  }
  mulTo(t, n) {
    const r = new as(this.toArray()).mulTo(t, n);
    return new Te(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new as(this.toArray()).egcd(t);
    return {
      a: new Te(n.toArray()),
      b: new Te(r.toArray()),
      gcd: new Te(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new as(this.toArray()).divmod(new Te(t), n, r);
    return {
      div: new Te(s == null ? void 0 : s.toArray()),
      mod: new Te(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Te(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Te(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Q = (e, t, n) => new Te(e, t, n);
Q.parseUnits = (e, t = oo) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new x(
      R.CONVERTING_FAILED,
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
function Jo(e, t) {
  return Q(e).toHex(t);
}
function Jt(e, t) {
  return Q(e).toBytes(t);
}
function xB(e, t) {
  return Q(e).formatUnits(t);
}
function vB(e, t) {
  return Q(e).format(t);
}
function Il(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function FB(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
const yl = "6.7.1";
function Bl(e, t, n) {
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
function ri(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && Bl(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Jn(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(Jn).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return Jn(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${Jn(n)}: ${Jn(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Cl(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${Jn(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + Jn(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${yl}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return ri(r, { code: t }), n && Object.assign(r, n), r;
}
function mr(e, t, n, r) {
  if (!e)
    throw Cl(t, n, r);
}
function Ce(e, t, n, r) {
  mr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const bl = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function Ql(e) {
  mr(bl.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function xl(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  Ce(!1, "invalid BytesLike value", t || "value", e);
}
function Lt(e, t) {
  return xl(e, t, !1);
}
function vl(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const Ka = "0123456789abcdef";
function wr(e) {
  const t = Lt(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Ka[(s & 240) >> 4] + Ka[s & 15];
  }
  return n;
}
function Zo(e, t, n) {
  const r = Lt(e);
  return n != null && n > r.length && mr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), wr(r.slice(t ?? 0, n ?? r.length));
}
const Fl = BigInt(0);
BigInt(1);
const Zn = 9007199254740991;
function Nn(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -Zn && e <= Zn, "overflow", t || "value", e), BigInt(e);
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return e[0] === "-" && e[1] !== "-" ? -BigInt(e.substring(1)) : BigInt(e);
      } catch (n) {
        Ce(!1, `invalid BigNumberish string: ${n.message}`, t || "value", e);
      }
  }
  Ce(!1, "invalid BigNumberish value", t || "value", e);
}
function Dl(e, t) {
  const n = Nn(e, t);
  return mr(n >= Fl, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const za = "0123456789abcdef";
function Rl(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += za[n >> 4], t += za[n & 15];
    return BigInt(t);
  }
  return Nn(e);
}
function _A(e, t) {
  switch (typeof e) {
    case "bigint":
      return Ce(e >= -Zn && e <= Zn, "overflow", t || "value", e), Number(e);
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -Zn && e <= Zn, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return _A(BigInt(e), t);
      } catch (n) {
        Ce(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  Ce(!1, "invalid numeric value", t || "value", e);
}
function Nl(e, t) {
  let r = Dl(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = _A(t, "width");
    for (mr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const ao = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let cs = null;
function Sl(e) {
  if (cs == null) {
    cs = {};
    for (let n = 0; n < ao.length; n++)
      cs[ao[n]] = BigInt(n);
  }
  const t = cs[e];
  return Ce(t != null, "invalid base58 value", "letter", e), t;
}
const _l = BigInt(0), co = BigInt(58);
function kA(e) {
  let t = Rl(Lt(e)), n = "";
  for (; t; )
    n = ao[Number(t % co)] + n, t /= co;
  return n;
}
function kl(e) {
  let t = _l;
  for (let n = 0; n < e.length; n++)
    t *= co, t += Sl(e[n]);
  return t;
}
function Ml(e, t, n, r, s) {
  Ce(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function MA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function Ol(e, t, n, r, s) {
  return e === "OVERLONG" ? (Ce(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), MA(e, t, n));
}
const Ll = Object.freeze({
  error: Ml,
  ignore: MA,
  replace: Ol
});
function Tl(e, t) {
  t == null && (t = Ll.error);
  const n = Lt(e, "bytes"), r = [];
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
      if (d <= c) {
        s += t("OVERLONG", s - 1 - o, n, r, d);
        continue;
      }
      r.push(d);
    }
  }
  return r;
}
function si(e, t) {
  t != null && (Ql(t), e = e.normalize(t));
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
      Ce(r < e.length && (i & 64512) === 56320, "invalid surrogate pair", "str", e);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function Pl(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function ii(e, t) {
  return Pl(Tl(e, t));
}
function Ao(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Ul(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function OA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Gl(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ao(e.outputLen), Ao(e.blockLen);
}
function Hl(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Jl(e, t) {
  OA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const yt = {
  number: Ao,
  bool: Ul,
  bytes: OA,
  hash: Gl,
  exists: Hl,
  output: Jl
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Zl = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Is = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Yt = (e, t) => e << 32 - t | e >>> t, Yl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Yl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Vl(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function On(e) {
  if (typeof e == "string" && (e = Vl(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Ss = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Xl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function jl(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Xl(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function Er(e) {
  const t = (r) => e().update(On(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function $l(e) {
  const t = (r, s) => e(s).update(On(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let LA = class extends Ss {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, yt.hash(t);
    const r = On(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Ss))
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
    return yt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    yt.exists(this), yt.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Yo = (e, t, n) => new LA(e, t).update(n).digest();
Yo.create = (e, t) => new LA(e, t);
function Wl(e, t, n, r) {
  yt.hash(e);
  const s = jl({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (yt.number(i), yt.number(o), yt.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = On(t), h = On(n), I = new Uint8Array(o), g = Yo.create(e, d), b = g._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: g, PRFSalt: b };
}
function ql(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Kl(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Wl(e, t, n, r);
  let h;
  const I = new Uint8Array(4), g = Is(I), b = new Uint8Array(c.outputLen);
  for (let F = 1, v = 0; v < i; F++, v += c.outputLen) {
    const C = o.subarray(v, v + c.outputLen);
    g.setInt32(0, F, !1), (h = d._cloneInto(h)).update(I).digestInto(b), C.set(b.subarray(0, C.length));
    for (let N = 1; N < s; N++) {
      c._cloneInto(h).update(b).digestInto(b);
      for (let S = 0; S < C.length; S++)
        C[S] ^= b[S];
    }
  }
  return ql(c, d, o, h, b);
}
function zl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, c, r);
}
let Vo = class extends Ss {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Is(this.buffer);
  }
  update(t) {
    yt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = On(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Is(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    yt.exists(this), yt.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    zl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Is(t);
    this.get().forEach((d, h) => c.setUint32(4 * h, d, i));
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
const eh = (e, t, n) => e & t ^ ~e & n, th = (e, t, n) => e & t ^ e & n ^ t & n, nh = new Uint32Array([
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
]), on = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), an = new Uint32Array(64);
let rh = class extends Vo {
  constructor() {
    super(64, 32, 8, !1), this.A = on[0] | 0, this.B = on[1] | 0, this.C = on[2] | 0, this.D = on[3] | 0, this.E = on[4] | 0, this.F = on[5] | 0, this.G = on[6] | 0, this.H = on[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      an[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const b = an[g - 15], F = an[g - 2], v = Yt(b, 7) ^ Yt(b, 18) ^ b >>> 3, C = Yt(F, 17) ^ Yt(F, 19) ^ F >>> 10;
      an[g] = C + an[g - 7] + v + an[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: h, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const b = Yt(c, 6) ^ Yt(c, 11) ^ Yt(c, 25), F = I + b + eh(c, d, h) + nh[g] + an[g] | 0, C = (Yt(r, 2) ^ Yt(r, 13) ^ Yt(r, 22)) + th(r, s, i) | 0;
      I = h, h = d, d = c, c = o + F | 0, o = i, i = s, s = r, r = F + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, h, I);
  }
  roundClean() {
    an.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Xo = Er(() => new rh()), As = BigInt(2 ** 32 - 1), uo = BigInt(32);
function TA(e, t = !1) {
  return t ? { h: Number(e & As), l: Number(e >> uo & As) } : { h: Number(e >> uo & As) | 0, l: Number(e & As) | 0 };
}
function sh(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = TA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const ih = (e, t) => BigInt(e >>> 0) << uo | BigInt(t >>> 0), oh = (e, t, n) => e >>> n, ah = (e, t, n) => e << 32 - n | t >>> n, ch = (e, t, n) => e >>> n | t << 32 - n, Ah = (e, t, n) => e << 32 - n | t >>> n, uh = (e, t, n) => e << 64 - n | t >>> n - 32, dh = (e, t, n) => e >>> n - 32 | t << 64 - n, lh = (e, t) => t, hh = (e, t) => e, fh = (e, t, n) => e << n | t >>> 32 - n, gh = (e, t, n) => t << n | e >>> 32 - n, ph = (e, t, n) => t << n - 32 | e >>> 64 - n, mh = (e, t, n) => e << n - 32 | t >>> 64 - n;
function wh(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Eh = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Ih = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, yh = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Bh = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Ch = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), bh = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Ae = {
  fromBig: TA,
  split: sh,
  toBig: ih,
  shrSH: oh,
  shrSL: ah,
  rotrSH: ch,
  rotrSL: Ah,
  rotrBH: uh,
  rotrBL: dh,
  rotr32H: lh,
  rotr32L: hh,
  rotlSH: fh,
  rotlSL: gh,
  rotlBH: ph,
  rotlBL: mh,
  add: wh,
  add3L: Eh,
  add3H: Ih,
  add4L: yh,
  add4H: Bh,
  add5H: bh,
  add5L: Ch
}, [Qh, xh] = Ae.split([
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
].map((e) => BigInt(e))), cn = new Uint32Array(80), An = new Uint32Array(80);
class jo extends Vo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: h, El: I, Fh: g, Fl: b, Gh: F, Gl: v, Hh: C, Hl: N } = this;
    return [t, n, r, s, i, o, c, d, h, I, g, b, F, v, C, N];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d, h, I, g, b, F, v, C, N) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = h | 0, this.El = I | 0, this.Fh = g | 0, this.Fl = b | 0, this.Gh = F | 0, this.Gl = v | 0, this.Hh = C | 0, this.Hl = N | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      cn[T] = t.getUint32(n), An[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = cn[T - 15] | 0, M = An[T - 15] | 0, k = Ae.rotrSH(j, M, 1) ^ Ae.rotrSH(j, M, 8) ^ Ae.shrSH(j, M, 7), O = Ae.rotrSL(j, M, 1) ^ Ae.rotrSL(j, M, 8) ^ Ae.shrSL(j, M, 7), P = cn[T - 2] | 0, W = An[T - 2] | 0, U = Ae.rotrSH(P, W, 19) ^ Ae.rotrBH(P, W, 61) ^ Ae.shrSH(P, W, 6), H = Ae.rotrSL(P, W, 19) ^ Ae.rotrBL(P, W, 61) ^ Ae.shrSL(P, W, 6), z = Ae.add4L(O, H, An[T - 7], An[T - 16]), B = Ae.add4H(z, k, U, cn[T - 7], cn[T - 16]);
      cn[T] = B | 0, An[T] = z | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: h, Dl: I, Eh: g, El: b, Fh: F, Fl: v, Gh: C, Gl: N, Hh: S, Hl: J } = this;
    for (let T = 0; T < 80; T++) {
      const j = Ae.rotrSH(g, b, 14) ^ Ae.rotrSH(g, b, 18) ^ Ae.rotrBH(g, b, 41), M = Ae.rotrSL(g, b, 14) ^ Ae.rotrSL(g, b, 18) ^ Ae.rotrBL(g, b, 41), k = g & F ^ ~g & C, O = b & v ^ ~b & N, P = Ae.add5L(J, M, O, xh[T], An[T]), W = Ae.add5H(P, S, j, k, Qh[T], cn[T]), U = P | 0, H = Ae.rotrSH(r, s, 28) ^ Ae.rotrBH(r, s, 34) ^ Ae.rotrBH(r, s, 39), z = Ae.rotrSL(r, s, 28) ^ Ae.rotrBL(r, s, 34) ^ Ae.rotrBL(r, s, 39), B = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      S = C | 0, J = N | 0, C = F | 0, N = v | 0, F = g | 0, v = b | 0, { h: g, l: b } = Ae.add(h | 0, I | 0, W | 0, U | 0), h = c | 0, I = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = Ae.add3L(U, z, a);
      r = Ae.add3H(A, W, H, B), s = A | 0;
    }
    ({ h: r, l: s } = Ae.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = Ae.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = Ae.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h, l: I } = Ae.add(this.Dh | 0, this.Dl | 0, h | 0, I | 0), { h: g, l: b } = Ae.add(this.Eh | 0, this.El | 0, g | 0, b | 0), { h: F, l: v } = Ae.add(this.Fh | 0, this.Fl | 0, F | 0, v | 0), { h: C, l: N } = Ae.add(this.Gh | 0, this.Gl | 0, C | 0, N | 0), { h: S, l: J } = Ae.add(this.Hh | 0, this.Hl | 0, S | 0, J | 0), this.set(r, s, i, o, c, d, h, I, g, b, F, v, C, N, S, J);
  }
  roundClean() {
    cn.fill(0), An.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class vh extends jo {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class Fh extends jo {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const $o = Er(() => new jo());
Er(() => new vh());
Er(() => new Fh());
function Dh() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const ec = Dh();
ec.crypto || ec.msCrypto;
function Rh(e) {
  switch (e) {
    case "sha256":
      return Xo.create();
    case "sha512":
      return $o.create();
  }
  Ce(!1, "invalid hashing algorithm name", "algorithm", e);
}
function Nh(e, t) {
  const n = { sha256: Xo, sha512: $o }[e];
  return Ce(n != null, "invalid hmac algorithm", "algorithm", e), Yo.create(n, t);
}
function Sh(e, t, n, r, s) {
  const i = { sha256: Xo, sha512: $o }[s];
  return Ce(i != null, "invalid pbkdf2 algorithm", "algorithm", s), Kl(i, e, t, { c: n, dkLen: r });
}
let PA = !1;
const UA = function(e, t, n) {
  return Nh(e, t).update(n).digest();
};
let GA = UA;
function Ir(e, t, n) {
  const r = Lt(t, "key"), s = Lt(n, "data");
  return wr(GA(e, r, s));
}
Ir._ = UA;
Ir.lock = function() {
  PA = !0;
};
Ir.register = function(e) {
  if (PA)
    throw new Error("computeHmac is locked");
  GA = e;
};
Object.freeze(Ir);
const [HA, JA, ZA] = [[], [], []], _h = BigInt(0), br = BigInt(1), kh = BigInt(2), Mh = BigInt(7), Oh = BigInt(256), Lh = BigInt(113);
for (let e = 0, t = br, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], HA.push(2 * (5 * r + n)), JA.push((e + 1) * (e + 2) / 2 % 64);
  let s = _h;
  for (let i = 0; i < 7; i++)
    t = (t << br ^ (t >> Mh) * Lh) % Oh, t & kh && (s ^= br << (br << BigInt(i)) - br);
  ZA.push(s);
}
const [Th, Ph] = Ae.split(ZA, !0), tc = (e, t, n) => n > 32 ? Ae.rotlBH(e, t, n) : Ae.rotlSH(e, t, n), nc = (e, t, n) => n > 32 ? Ae.rotlBL(e, t, n) : Ae.rotlSL(e, t, n);
function Uh(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, h = n[d], I = n[d + 1], g = tc(h, I, 1) ^ n[c], b = nc(h, I, 1) ^ n[c + 1];
      for (let F = 0; F < 50; F += 10)
        e[o + F] ^= g, e[o + F + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = JA[o], d = tc(s, i, c), h = nc(s, i, c), I = HA[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= Th[r], e[1] ^= Ph[r];
  }
  n.fill(0);
}
let YA = class VA extends Ss {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, yt.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Zl(this.state);
  }
  keccak() {
    Uh(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    yt.exists(this);
    const { blockLen: n, state: r } = this;
    t = On(t);
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
    yt.exists(this, !1), yt.bytes(t), this.finish();
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
    return yt.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (yt.output(t, this), this.finished)
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
    return t || (t = new VA(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const xn = (e, t, n) => Er(() => new YA(t, e, n));
xn(6, 144, 224 / 8);
xn(6, 136, 256 / 8);
xn(6, 104, 384 / 8);
xn(6, 72, 512 / 8);
xn(1, 144, 224 / 8);
const Gh = xn(1, 136, 256 / 8);
xn(1, 104, 384 / 8);
xn(1, 72, 512 / 8);
const XA = (e, t, n) => $l((r = {}) => new YA(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
XA(31, 168, 128 / 8);
XA(31, 136, 256 / 8);
let jA = !1;
const $A = function(e) {
  return Gh(e);
};
let WA = $A;
function $r(e) {
  const t = Lt(e, "data");
  return wr(WA(t));
}
$r._ = $A;
$r.lock = function() {
  jA = !0;
};
$r.register = function(e) {
  if (jA)
    throw new TypeError("keccak256 is locked");
  WA = e;
};
Object.freeze($r);
const Hh = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), qA = Uint8Array.from({ length: 16 }, (e, t) => t), Jh = qA.map((e) => (9 * e + 5) % 16);
let Wo = [qA], qo = [Jh];
for (let e = 0; e < 4; e++)
  for (let t of [Wo, qo])
    t.push(t[e].map((n) => Hh[n]));
const KA = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Zh = Wo.map((e, t) => e.map((n) => KA[t][n])), Yh = qo.map((e, t) => e.map((n) => KA[t][n])), Vh = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), Xh = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), us = (e, t) => e << t | e >>> 32 - t;
function rc(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const ds = new Uint32Array(16);
class jh extends Vo {
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
      ds[F] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, h = this.h3 | 0, I = h, g = this.h4 | 0, b = g;
    for (let F = 0; F < 5; F++) {
      const v = 4 - F, C = Vh[F], N = Xh[F], S = Wo[F], J = qo[F], T = Zh[F], j = Yh[F];
      for (let M = 0; M < 16; M++) {
        const k = us(r + rc(F, i, c, h) + ds[S[M]] + C, T[M]) + g | 0;
        r = g, g = h, h = us(c, 10) | 0, c = i, i = k;
      }
      for (let M = 0; M < 16; M++) {
        const k = us(s + rc(v, o, d, I) + ds[J[M]] + N, j[M]) + b | 0;
        s = b, b = I, I = us(d, 10) | 0, d = o, o = k;
      }
    }
    this.set(this.h1 + c + I | 0, this.h2 + h + b | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    ds.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const $h = Er(() => new jh());
let zA = !1;
const eu = function(e) {
  return $h(e);
};
let tu = eu;
function Wr(e) {
  const t = Lt(e, "data");
  return wr(tu(t));
}
Wr._ = eu;
Wr.lock = function() {
  zA = !0;
};
Wr.register = function(e) {
  if (zA)
    throw new TypeError("ripemd160 is locked");
  tu = e;
};
Object.freeze(Wr);
let nu = !1;
const ru = function(e, t, n, r, s) {
  return Sh(e, t, n, r, s);
};
let su = ru;
function yr(e, t, n, r, s) {
  const i = Lt(e, "password"), o = Lt(t, "salt");
  return wr(su(i, o, n, r, s));
}
yr._ = ru;
yr.lock = function() {
  nu = !0;
};
yr.register = function(e) {
  if (nu)
    throw new Error("pbkdf2 is locked");
  su = e;
};
Object.freeze(yr);
const iu = function(e) {
  return Rh("sha256").update(e).digest();
};
let ou = iu, au = !1;
function ke(e) {
  const t = Lt(e, "data");
  return wr(ou(t));
}
ke._ = iu;
ke.lock = function() {
  au = !0;
};
ke.register = function(e) {
  if (au)
    throw new Error("sha256 is locked");
  ou = e;
};
Object.freeze(ke);
Object.freeze(ke);
const Wh = BigInt(0), qh = BigInt(36);
function sc(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Lt($r(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const Ko = {};
for (let e = 0; e < 10; e++)
  Ko[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  Ko[String.fromCharCode(65 + e)] = String(10 + e);
const ic = 15;
function Kh(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => Ko[r]).join("");
  for (; t.length >= ic; ) {
    let r = t.substring(0, ic);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const zh = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function ef(e) {
  e = e.toLowerCase();
  let t = Wh;
  for (let n = 0; n < e.length; n++)
    t = t * qh + zh[e[n]];
  return t;
}
function tf(e) {
  if (Ce(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = sc(e);
    return Ce(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Ce(e.substring(2, 4) === Kh(e), "bad icap checksum", "address", e);
    let t = ef(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return sc("0x" + t);
  }
  Ce(!1, "invalid address", "address", e);
}
function Ji(e, t) {
  return {
    address: tf(e),
    storageKeys: t.map((n, r) => (Ce(vl(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function nf(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Ce(n.length === 2, "invalid slot set", `value[${r}]`, n), Ji(n[0], n[1])) : (Ce(n != null && typeof n == "object", "invalid address-slot set", "value", e), Ji(n.address, n.storageKeys)));
  Ce(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return Ji(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const rf = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class qr {
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
    D(this, "name");
    ri(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new qr(this.name);
  }
}
class oi extends qr {
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
    D(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    D(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    D(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    D(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    D(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    D(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    D(this, "txAccessListAddress");
    const s = { effectiveBlock: n };
    function i(o, c) {
      let d = (r || {})[o];
      d == null && (d = c), Ce(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), ri(this, s);
  }
  clone() {
    return new oi(this.effectiveBlock, this);
  }
}
class ai extends qr {
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
    D(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    D(this, "targetNetwork");
    ri(this, {
      address: n || rf,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new ai(this.address, this.targetNetwork);
  }
}
var Vr, Xr;
class cu extends qr {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    ft(this, Vr, void 0);
    ft(this, Xr, void 0);
    Ct(this, Vr, n), Ct(this, Xr, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return Ee(this, Vr);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return Ee(this, Xr);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Vr = new WeakMap(), Xr = new WeakMap();
const Zi = /* @__PURE__ */ new Map();
var nr, rr, wn;
const $n = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    ft(this, nr, void 0);
    ft(this, rr, void 0);
    ft(this, wn, void 0);
    Ct(this, nr, t), Ct(this, rr, Nn(n)), Ct(this, wn, /* @__PURE__ */ new Map());
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
    return Ee(this, nr);
  }
  set name(t) {
    Ct(this, nr, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return Ee(this, rr);
  }
  set chainId(t) {
    Ct(this, rr, Nn(t, "chainId"));
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
        return this.chainId === Nn(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === Nn(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === Nn(t.chainId);
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
    return Array.from(Ee(this, wn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (Ee(this, wn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return Ee(this, wn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return Ee(this, wn).get(t) || null;
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
    const t = new $n(this.name, this.chainId);
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new oi();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = nf(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (of(), t == null)
      return $n.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = Zi.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new $n("unknown", t);
      Ce(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Ce(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new $n(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new ai(t.ensAddress, t.ensNetwork)), n;
    }
    Ce(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = Zi.get(t);
    r && Ce(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), Zi.set(t, n);
  }
};
let _n = $n;
nr = new WeakMap(), rr = new WeakMap(), wn = new WeakMap();
function oc(e, t) {
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
function ac(e) {
  return new cu(e, async (t, n, r) => {
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
        maxFeePerGas: oc(c.maxFee, 9),
        maxPriorityFeePerGas: oc(c.maxPriorityFee, 9)
      };
    } catch (i) {
      mr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function sf(e) {
  return new cu("data:", async (t, n, r) => {
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
let cc = !1;
function of() {
  if (cc)
    return;
  cc = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new _n(t, n);
      return r.ensNetwork != null && i.attachPlugin(new ai(null, r.ensNetwork)), i.attachPlugin(new oi()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    _n.register(t, s), _n.register(n, s), r.altNames && r.altNames.forEach((i) => {
      _n.register(i, s);
    });
  }
  e("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), e("ropsten", 3, { ensNetwork: 3 }), e("rinkeby", 4, { ensNetwork: 4 }), e("goerli", 5, { ensNetwork: 5 }), e("kovan", 42, { ensNetwork: 42 }), e("sepolia", 11155111, {}), e("classic", 61, {}), e("classicKotti", 6, {}), e("arbitrum", 42161, {
    ensNetwork: 1
  }), e("arbitrum-goerli", 421613, {}), e("bnb", 56, { ensNetwork: 1 }), e("bnbt", 97, {}), e("linea", 59144, { ensNetwork: 1 }), e("linea-goerli", 59140, {}), e("matic", 137, {
    ensNetwork: 1,
    plugins: [
      ac("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      ac("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      sf(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
function lo(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function af(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function Au(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function cf(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  lo(e.outputLen), lo(e.blockLen);
}
function Af(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function uf(e, t) {
  Au(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const df = {
  number: lo,
  bool: af,
  bytes: Au,
  hash: cf,
  exists: Af,
  output: uf
}, ve = df;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const lf = (e) => e instanceof Uint8Array, ys = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Bs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Vt = (e, t) => e << 32 - t | e >>> t, hf = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!hf)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ff(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Ln(e) {
  if (typeof e == "string" && (e = ff(e)), !lf(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let zo = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const gf = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function uu(e, t) {
  if (t !== void 0 && (typeof t != "object" || !gf(t)))
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function ea(e) {
  const t = (r) => e().update(Ln(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function pf(e) {
  const t = (r, s) => e(s).update(Ln(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
function mf(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, c, r);
}
let wf = class extends zo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Bs(this.buffer);
  }
  update(t) {
    ve.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Ln(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Bs(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ve.exists(this), ve.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    mf(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Bs(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, I = this.get();
    if (h > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < h; g++)
      c.setUint32(4 * g, I[g], i);
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
const Ef = (e, t, n) => e & t ^ ~e & n, If = (e, t, n) => e & t ^ e & n ^ t & n, yf = new Uint32Array([
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
]), un = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), dn = new Uint32Array(64);
let du = class extends wf {
  constructor() {
    super(64, 32, 8, !1), this.A = un[0] | 0, this.B = un[1] | 0, this.C = un[2] | 0, this.D = un[3] | 0, this.E = un[4] | 0, this.F = un[5] | 0, this.G = un[6] | 0, this.H = un[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      dn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const b = dn[g - 15], F = dn[g - 2], v = Vt(b, 7) ^ Vt(b, 18) ^ b >>> 3, C = Vt(F, 17) ^ Vt(F, 19) ^ F >>> 10;
      dn[g] = C + dn[g - 7] + v + dn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: h, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const b = Vt(c, 6) ^ Vt(c, 11) ^ Vt(c, 25), F = I + b + Ef(c, d, h) + yf[g] + dn[g] | 0, C = (Vt(r, 2) ^ Vt(r, 13) ^ Vt(r, 22)) + If(r, s, i) | 0;
      I = h, h = d, d = c, c = o + F | 0, o = i, i = s, s = r, r = F + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, h, I);
  }
  roundClean() {
    dn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class Bf extends du {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const lu = ea(() => new du());
ea(() => new Bf());
let hu = class extends zo {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, ve.hash(t);
    const r = Ln(n);
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
    return ve.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ve.exists(this), ve.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const fu = (e, t, n) => new hu(e, t).update(n).digest();
fu.create = (e, t) => new hu(e, t);
function Cf(e, t, n, r) {
  ve.hash(e);
  const s = uu({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (ve.number(i), ve.number(o), ve.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Ln(t), h = Ln(n), I = new Uint8Array(o), g = fu.create(e, d), b = g._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: g, PRFSalt: b };
}
function bf(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function gu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Cf(e, t, n, r);
  let h;
  const I = new Uint8Array(4), g = Bs(I), b = new Uint8Array(c.outputLen);
  for (let F = 1, v = 0; v < i; F++, v += c.outputLen) {
    const C = o.subarray(v, v + c.outputLen);
    g.setInt32(0, F, !1), (h = d._cloneInto(h)).update(I).digestInto(b), C.set(b.subarray(0, C.length));
    for (let N = 1; N < s; N++) {
      c._cloneInto(h).update(b).digestInto(b);
      for (let S = 0; S < C.length; S++)
        C[S] ^= b[S];
    }
  }
  return bf(c, d, o, h, b);
}
const me = (e, t) => e << t | e >>> 32 - t;
function Ac(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], d = e[t++] ^ n[r++], h = e[t++] ^ n[r++], I = e[t++] ^ n[r++], g = e[t++] ^ n[r++], b = e[t++] ^ n[r++], F = e[t++] ^ n[r++], v = e[t++] ^ n[r++], C = e[t++] ^ n[r++], N = e[t++] ^ n[r++], S = e[t++] ^ n[r++], J = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], M = e[t++] ^ n[r++], k = o, O = c, P = d, W = h, U = I, H = g, z = b, B = F, a = v, A = C, l = N, m = S, f = J, E = T, y = j, p = M;
  for (let u = 0; u < 8; u += 2)
    U ^= me(k + f | 0, 7), a ^= me(U + k | 0, 9), f ^= me(a + U | 0, 13), k ^= me(f + a | 0, 18), A ^= me(H + O | 0, 7), E ^= me(A + H | 0, 9), O ^= me(E + A | 0, 13), H ^= me(O + E | 0, 18), y ^= me(l + z | 0, 7), P ^= me(y + l | 0, 9), z ^= me(P + y | 0, 13), l ^= me(z + P | 0, 18), W ^= me(p + m | 0, 7), B ^= me(W + p | 0, 9), m ^= me(B + W | 0, 13), p ^= me(m + B | 0, 18), O ^= me(k + W | 0, 7), P ^= me(O + k | 0, 9), W ^= me(P + O | 0, 13), k ^= me(W + P | 0, 18), z ^= me(H + U | 0, 7), B ^= me(z + H | 0, 9), U ^= me(B + z | 0, 13), H ^= me(U + B | 0, 18), m ^= me(l + A | 0, 7), a ^= me(m + l | 0, 9), A ^= me(a + m | 0, 13), l ^= me(A + a | 0, 18), f ^= me(p + y | 0, 7), E ^= me(f + p | 0, 9), y ^= me(E + f | 0, 13), p ^= me(y + E | 0, 18);
  s[i++] = o + k | 0, s[i++] = c + O | 0, s[i++] = d + P | 0, s[i++] = h + W | 0, s[i++] = I + U | 0, s[i++] = g + H | 0, s[i++] = b + z | 0, s[i++] = F + B | 0, s[i++] = v + a | 0, s[i++] = C + A | 0, s[i++] = N + l | 0, s[i++] = S + m | 0, s[i++] = J + f | 0, s[i++] = T + E | 0, s[i++] = j + y | 0, s[i++] = M + p | 0;
}
function Yi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    Ac(n, o, e, t, n, i), c > 0 && (o += 16), Ac(n, i, e, t += 16, n, o);
}
function Qf(e, t, n) {
  const r = uu({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: h, onProgress: I } = r;
  if (ve.number(s), ve.number(i), ve.number(o), ve.number(c), ve.number(d), ve.number(h), I !== void 0 && typeof I != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, b = g / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (g / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const F = g * (s + o);
  if (F > h)
    throw new Error(`Scrypt: parameters too large, ${F} (128 * r * (N + p)) > ${h} (maxmem)`);
  const v = gu(lu, e, t, { c: 1, dkLen: g * o }), C = ys(v), N = ys(new Uint8Array(g * s)), S = ys(new Uint8Array(g));
  let J = () => {
  };
  if (I) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let M = 0;
    J = () => {
      M++, I && (!(M % j) || M === T) && I(M / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: b, V: N, B32: C, B: v, tmp: S, blockMixCb: J, asyncTick: d };
}
function xf(e, t, n, r, s) {
  const i = gu(lu, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function vf(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: h, B: I, tmp: g, blockMixCb: b } = Qf(e, t, n);
  for (let F = 0; F < i; F++) {
    const v = c * F;
    for (let C = 0; C < c; C++)
      d[C] = h[v + C];
    for (let C = 0, N = 0; C < r - 1; C++)
      Yi(d, N, d, N += c, s), b();
    Yi(d, (r - 1) * c, h, v, s), b();
    for (let C = 0; C < r; C++) {
      const N = h[v + c - 16] % r;
      for (let S = 0; S < c; S++)
        g[S] = h[v + S] ^ d[N * c + S];
      Yi(g, 0, h, v, s), b();
    }
  }
  return xf(e, o, I, d, g);
}
ve.bool;
const uc = ve.bytes;
function Ff(e) {
  return (t) => (ve.bytes(t), e(t));
}
(() => {
  const e = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, t = typeof module < "u" && typeof module.require == "function" && module.require.bind(module);
  return {
    node: t && !e ? t("crypto") : void 0,
    web: e
  };
})();
function Df(e, t, n, r, s, i, o) {
  return uc(e), uc(t), vf(e, t, { N: n, r: s, p: r, dkLen: i, onProgress: o });
}
const ls = BigInt(2 ** 32 - 1), ho = BigInt(32);
function pu(e, t = !1) {
  return t ? { h: Number(e & ls), l: Number(e >> ho & ls) } : { h: Number(e >> ho & ls) | 0, l: Number(e & ls) | 0 };
}
function Rf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = pu(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Nf = (e, t) => BigInt(e >>> 0) << ho | BigInt(t >>> 0), Sf = (e, t, n) => e >>> n, _f = (e, t, n) => e << 32 - n | t >>> n, kf = (e, t, n) => e >>> n | t << 32 - n, Mf = (e, t, n) => e << 32 - n | t >>> n, Of = (e, t, n) => e << 64 - n | t >>> n - 32, Lf = (e, t, n) => e >>> n - 32 | t << 64 - n, Tf = (e, t) => t, Pf = (e, t) => e, Uf = (e, t, n) => e << n | t >>> 32 - n, Gf = (e, t, n) => t << n | e >>> 32 - n, Hf = (e, t, n) => t << n - 32 | e >>> 64 - n, Jf = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Zf(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Yf = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Vf = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, Xf = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), jf = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, $f = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Wf = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Mr = {
  fromBig: pu,
  split: Rf,
  toBig: Nf,
  shrSH: Sf,
  shrSL: _f,
  rotrSH: kf,
  rotrSL: Mf,
  rotrBH: Of,
  rotrBL: Lf,
  rotr32H: Tf,
  rotr32L: Pf,
  rotlSH: Uf,
  rotlSL: Gf,
  rotlBH: Hf,
  rotlBL: Jf,
  add: Zf,
  add3L: Yf,
  add3H: Vf,
  add4L: Xf,
  add4H: jf,
  add5H: Wf,
  add5L: $f
}, [mu, wu, Eu] = [[], [], []], qf = BigInt(0), Qr = BigInt(1), Kf = BigInt(2), zf = BigInt(7), eg = BigInt(256), tg = BigInt(113);
for (let e = 0, t = Qr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], mu.push(2 * (5 * r + n)), wu.push((e + 1) * (e + 2) / 2 % 64);
  let s = qf;
  for (let i = 0; i < 7; i++)
    t = (t << Qr ^ (t >> zf) * tg) % eg, t & Kf && (s ^= Qr << (Qr << BigInt(i)) - Qr);
  Eu.push(s);
}
const [ng, rg] = Mr.split(Eu, !0), dc = (e, t, n) => n > 32 ? Mr.rotlBH(e, t, n) : Mr.rotlSH(e, t, n), lc = (e, t, n) => n > 32 ? Mr.rotlBL(e, t, n) : Mr.rotlSL(e, t, n);
function sg(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, h = n[d], I = n[d + 1], g = dc(h, I, 1) ^ n[c], b = lc(h, I, 1) ^ n[c + 1];
      for (let F = 0; F < 50; F += 10)
        e[o + F] ^= g, e[o + F + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = wu[o], d = dc(s, i, c), h = lc(s, i, c), I = mu[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= ng[r], e[1] ^= rg[r];
  }
  n.fill(0);
}
class ci extends zo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, ve.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ys(this.state);
  }
  keccak() {
    sg(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    ve.exists(this);
    const { blockLen: n, state: r } = this;
    t = Ln(t);
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
    ve.exists(this, !1), ve.bytes(t), this.finish();
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
    return ve.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (ve.output(t, this), this.finished)
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
    return t || (t = new ci(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const vn = (e, t, n) => ea(() => new ci(t, e, n));
vn(6, 144, 224 / 8);
vn(6, 136, 256 / 8);
vn(6, 104, 384 / 8);
vn(6, 72, 512 / 8);
vn(1, 144, 224 / 8);
const hc = vn(1, 136, 256 / 8);
vn(1, 104, 384 / 8);
vn(1, 72, 512 / 8);
const Iu = (e, t, n) => pf((r = {}) => new ci(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
Iu(31, 168, 128 / 8);
Iu(31, 136, 256 / 8);
const ig = (() => {
  const e = Ff(hc);
  return e.create = hc.create, e;
})();
var og = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return Df(t, n, r, i, s, o);
}, ag = (e) => ig(e), Wn = (e, t = "base64") => {
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
}, { crypto: Ai, btoa: yu } = globalThis;
if (!Ai)
  throw new x(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!yu)
  throw new x(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var fo = (e) => Ai.getRandomValues(new Uint8Array(e)), Cs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return yu(n);
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
}, Bu = "AES-CTR", ta = (e, t) => {
  const n = Wn(String(e).normalize("NFKC"), "utf-8"), r = yr(n, t, 1e5, 32, "sha256");
  return Z(r);
}, cg = async (e, t) => {
  const n = fo(16), r = fo(32), s = ta(e, r), i = JSON.stringify(t), o = Wn(i, "utf-8"), c = {
    name: Bu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), h = await crypto.subtle.encrypt(c, d, o);
  return {
    data: Cs(h),
    iv: Cs(n),
    salt: Cs(r)
  };
}, Ag = async (e, t) => {
  const n = Wn(t.iv), r = Wn(t.salt), s = ta(e, r), i = Wn(t.data), o = {
    name: Bu,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), h = new TextDecoder().decode(d);
  try {
    return JSON.parse(h);
  } catch {
    throw new x(R.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, ug = async (e, t, n) => {
  const r = Ai.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, dg = async (e, t, n) => {
  const r = Ai.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
}, lg = {
  bufferFromString: Wn,
  stringFromBuffer: Cs,
  decrypt: Ag,
  encrypt: cg,
  keyFromPassword: ta,
  randomBytes: fo,
  scrypt: og,
  keccak256: ag,
  decryptJsonWalletData: dg,
  encryptJsonWalletData: ug
}, hg = lg, {
  bufferFromString: yn,
  decrypt: fg,
  encrypt: gg,
  keyFromPassword: LB,
  randomBytes: Cn,
  stringFromBuffer: Fr,
  scrypt: Cu,
  keccak256: bu,
  decryptJsonWalletData: pg,
  encryptJsonWalletData: mg
} = hg, wg = Object.defineProperty, Eg = (e, t, n) => t in e ? wg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ui = (e, t, n) => (Eg(e, typeof t != "symbol" ? t + "" : t, n), n), Ig = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Qu = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, xu = (e, t, n) => (Ig(e, t, "access private method"), n), ie = class {
  constructor(e, t, n) {
    D(this, "name");
    D(this, "type");
    D(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, vu = "u8", Fu = "u16", Du = "u32", Ru = "u64", Nu = "u256", Su = "raw untyped ptr", _u = "raw untyped slice", ku = "bool", Mu = "b256", Ou = "struct B512", na = "enum Option", ra = "struct Vec", sa = "struct Bytes", ia = "struct String", Lu = "str", oa = /str\[(?<length>[0-9]+)\]/, _s = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, aa = /^struct (?<name>\w+)$/, ca = /^enum (?<name>\w+)$/, Tu = /^\((?<items>.*)\)$/, yg = /^generic (?<name>\w+)$/, ks = "0", Bg = "1", re = 8, Kr = 32, Or = Kr, Cg = Kr, bg = Kr, Qg = re * 4, xg = re * 2, Aa = 2 ** 32 - 1, di = ({ maxInputs: e }) => Kr + // Tx ID
re + // Tx size
// Asset ID/Balance coin input pairs
e * (Or + re), ua = re + // Identifier
re + // Gas limit
re + // Script size
re + // Script data size
re + // Policies
re + // Inputs size
re + // Outputs size
re + // Witnesses size
Kr, vg = re + // Identifier
Qg + // Utxo Length
re + // Output Index
bg + // Owner
re + // Amount
Or + // Asset id
xg + // TxPointer
re + // Witnesses index
re + // Maturity
re + // Predicate size
re + // Predicate data size
re, Fg = {
  u64: re,
  u256: re * 4
}, _ = class extends ie {
  constructor(e) {
    super("bigNumber", e, Fg[e]);
  }
  encode(e) {
    let t;
    try {
      t = Jt(e, this.encodedLength);
    } catch {
      throw new x(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), t + this.encodedLength];
  }
}, Dg = 3, Bt = Dg * re, Rg = 2, fc = Rg * re;
function St(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([h, I]) => {
      t[parseInt(h, 10) + n] = I;
    });
    const d = Z(o);
    return n += d.byteLength / re, d;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function Pu(e, t, n) {
  if (!e.dynamicData)
    return se([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * re, d = new _("u64").encode(
      n + t + r
    );
    s.set(d, c);
    const h = o.dynamicData ? (
      // unpack child dynamic data
      Pu(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = se([s, h]), r += h.byteLength;
  }), s;
}
var Uu = (e, t = re) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Ng = (e) => {
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
}, Sg = (e) => e === ra || e === sa || e === ia;
function Ft(e, t, n = () => {
  throw new x(R.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var Lr = (e) => e % re === 0, Gu = (e) => re - e % re, Hu = (e) => {
  if (Lr(e.length))
    return e;
  const t = new Uint8Array(re - e.length % re);
  return jr([e, t]);
}, pt = class extends ie {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    D(this, "coder");
    D(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Types/values length mismatch.");
    return St(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Aa)
      throw new x(R.DECODE_ERROR, "Invalid array data size.");
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
      t = Z(e);
    } catch {
      throw new x(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new x(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid b256 byte data size.");
    return [Jo(n, 32), t + 32];
  }
}, Ju = class extends ie {
  constructor() {
    super("b512", "struct B512", re * 8);
  }
  encode(e) {
    let t;
    try {
      t = Z(e);
    } catch {
      throw new x(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new x(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid b512 byte data size.");
    return [Jo(n, this.encodedLength), t + this.encodedLength];
  }
}, _g = class extends ie {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    D(this, "paddingLength");
    D(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new x(R.ENCODE_ERROR, "Invalid boolean value.");
    const r = Jt(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new x(R.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = Q(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(Q(1)))
      throw new x(R.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, go, Zu, Ms = class extends ie {
  constructor() {
    super("struct", "struct Bytes", Bt), Qu(this, go);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new _("u64").encode(Bt), r = xu(this, go, Zu).call(this, e);
    return n.dynamicData = {
      0: St([r])
    }, t.push(n), t.push(new _("u64").encode(r.byteLength)), t.push(new _("u64").encode(e.length)), St(t);
  }
  decode(e, t) {
    if (e.length < Bt)
      throw new x(R.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new _("u64").decode(n, 0)[0]).toNumber(), s = e.slice(Bt, Bt + r);
    if (s.length !== r)
      throw new x(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Bt];
  }
};
go = /* @__PURE__ */ new WeakSet();
Zu = function(e) {
  const t = [Uint8Array.from(e)], n = (re - e.length % re) % re;
  return n && t.push(new Uint8Array(n)), se(t);
};
ui(Ms, "memorySize", 1);
var kg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), sr, En, Ws, Vu, qs, Xu, IA, Yu = (IA = class extends ie {
  constructor(t, n) {
    const r = new _("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    ft(this, Ws);
    ft(this, qs);
    D(this, "name");
    D(this, "coders");
    ft(this, sr, void 0);
    ft(this, En, void 0);
    this.name = t, this.coders = n, Ct(this, sr, r), Ct(this, En, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return sn(this, Ws, Vu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new x(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new x(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(Ee(this, En) - s.encodedLength);
    return St([Ee(this, sr).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < Ee(this, En))
      throw new x(R.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new _("u64").decode(t, r);
    const i = Ot(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new x(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = Ee(this, En) - c.encodedLength;
    return r += d, [s, r] = c.decode(t, r), kg(this.coders) ? sn(this, qs, Xu).call(this, o, r) : [{ [o]: s }, r];
  }
}, sr = new WeakMap(), En = new WeakMap(), Ws = new WeakSet(), Vu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ee(this, En) - n.encodedLength);
  return se([Ee(this, sr).encode(s), i, r]);
}, qs = new WeakSet(), Xu = function(t, n) {
  return [t, n];
}, IA), li = class extends Yu {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength - 1)
      throw new x(R.DECODE_ERROR, "Invalid option data size.");
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
    D(this, "length");
    D(this, "paddingLength");
    D(this, "baseType");
    D(this, "options");
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
      n = Jt(t);
    } catch {
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Jt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Ot(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new x(R.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new x(R.DECODE_ERROR, "Invalid number byte data size.");
    return [Ot(r), n + 8];
  }
}, Mg = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", fc);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new K("u8", { isSmallBytes: !0 }), r = new _("u64").encode(
      fc
    );
    return r.dynamicData = {
      0: St(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new _("u64").encode(e.length)), St(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new pt(
      new K("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, po, ju, $u = class extends ie {
  constructor() {
    super("struct", "struct String", 1), Qu(this, po);
  }
  encode(e) {
    const t = [], n = new _("u64").encode(Bt), r = xu(this, po, ju).call(this, e);
    return n.dynamicData = {
      0: St([r])
    }, t.push(n), t.push(new _("u64").encode(r.byteLength)), t.push(new _("u64").encode(e.length)), St(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new _("u64").decode(n, 0)[0]).toNumber(), s = e.slice(Bt, Bt + r);
    if (s.length !== r)
      throw new x(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [ii(s), t + Bt];
  }
};
po = /* @__PURE__ */ new WeakSet();
ju = function(e) {
  const t = [si(e)], n = (re - e.length % re) % re;
  return n && t.push(new Uint8Array(n)), se(t);
};
ui($u, "memorySize", 1);
var ir, yA, Og = (yA = class extends ie {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    D(this, "length");
    ft(this, ir, void 0);
    this.length = t, Ct(this, ir, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = si(t), r = new Uint8Array(Ee(this, ir));
    return se([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new x(R.DECODE_ERROR, "Invalid string byte data size.");
    const s = ii(r), i = Ee(this, ir);
    return [s, n + this.length + i];
  }
}, ir = new WeakMap(), yA), hi = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    D(this, "name");
    D(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof li) && i == null)
        throw new x(
          R.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Lr(o.length) ? o : Hu(o);
    });
    return St([St(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), Lr(r) || (r += Gu(r)), i[o] = d, i;
    }, {}), r];
  }
}, Wu = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Types/values length mismatch.");
    return St(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return Lr(s.length) ? s : Hu(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), Lr(r) || (r += Gu(r)), o;
    }), r];
  }
}, qu = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Bt);
    D(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _("u64").encode(Bt);
    return r.dynamicData = {
      0: St(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new _("u64").encode(t.length)), n.push(new _("u64").encode(t.length)), St(n);
  }
  decode(t, n) {
    if (t.length < Bt || t.length > Aa)
      throw new x(R.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new _("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Bt, Bt + i);
    if (o.length !== i)
      throw new x(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Uu(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + Bt
    ];
  }
}, nn = class {
  constructor(e, t) {
    D(this, "abi");
    D(this, "name");
    D(this, "type");
    D(this, "originalTypeArguments");
    D(this, "components");
    this.abi = e;
    const n = Ft(
      e.types,
      (r) => r.typeId === t.type,
      () => {
        throw new x(
          R.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: t,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = t.name, this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = nn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? nn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new nn(e, o));
    const s = r.reduce(
      (o, c, d) => {
        var I;
        const h = { ...o };
        return h[c] = structuredClone(
          (I = t.typeArguments) == null ? void 0 : I[d]
        ), h;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new nn(e, o));
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
      const s = Ft(e.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Ft(e.types, (o) => o.typeId === s.type);
      if (yg.test(i.type)) {
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
    return aa.test(this.type) ? "s" : _s.test(this.type) ? "a" : ca.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = oa.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = _s.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new nn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function Os(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Un = (e, t) => {
  var d, h, I, g, b, F;
  switch (e.type) {
    case vu:
    case Fu:
    case Du:
      return new K(e.type, t);
    case Ru:
    case Su:
      return new _("u64");
    case Nu:
      return new _("u256");
    case _u:
      return new Mg();
    case ku:
      return new _g(t);
    case Mu:
      return new G();
    case Ou:
      return new Ju();
    case sa:
      return new Ms();
    case ia:
      return new $u();
  }
  const n = (d = oa.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new Og(v);
  }
  const r = e.components, s = (h = _s.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const v = parseInt(s.length, 10), C = r[0];
    if (!C)
      throw new x(
        R.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const N = Un(C, { isSmallBytes: !0 });
    return new pt(N, v);
  }
  if (e.type === ra) {
    const v = (I = Ft(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : I[0];
    if (!v)
      throw new x(
        R.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const C = new nn(e.abi, v), N = Un(C, { isSmallBytes: !0, encoding: ks });
    return new qu(N);
  }
  const i = (g = aa.exec(e.type)) == null ? void 0 : g.groups;
  if (i) {
    const v = Os(r, { isRightPadded: !0, getCoder: Un });
    return new hi(i.name, v);
  }
  const o = (b = ca.exec(e.type)) == null ? void 0 : b.groups;
  if (o) {
    const v = Os(r, { getCoder: Un });
    return e.type === na ? new li(o.name, v) : new Yu(o.name, v);
  }
  if ((F = Tu.exec(e.type)) == null ? void 0 : F.groups) {
    const v = r.map(
      (C) => Un(C, { isRightPadded: !0, encoding: ks })
    );
    return new Wu(v);
  }
  throw e.type === Lu ? new x(
    R.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new x(
    R.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, Lg = class extends ie {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new x(R.ENCODE_ERROR, "Invalid boolean value.");
    return Jt(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid boolean data size.");
    const n = Q(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(Q(1)))
      throw new x(R.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, Ku = class extends ie {
  constructor() {
    super("struct", "struct Bytes", re);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const t = new Uint8Array(e), n = new _("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < re)
      throw new x(R.DECODE_ERROR, "Invalid byte data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
ui(Ku, "memorySize", 1);
var Tg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), or, ar, Ks, zu, zs, ed, BA, Pg = (BA = class extends ie {
  constructor(t, n) {
    const r = new _("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    ft(this, Ks);
    ft(this, zs);
    D(this, "name");
    D(this, "coders");
    ft(this, or, void 0);
    ft(this, ar, void 0);
    this.name = t, this.coders = n, Ct(this, or, r), Ct(this, ar, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return sn(this, Ks, zu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new x(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new x(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...Ee(this, or).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < Ee(this, ar))
      throw new x(R.DECODE_ERROR, "Invalid enum data size.");
    const r = new _("u64").decode(t, n)[0], s = Ot(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new x(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + re, [d, h] = o.decode(t, c);
    return Tg(this.coders) ? sn(this, zs, ed).call(this, i, h) : [{ [i]: d }, h];
  }
}, or = new WeakMap(), ar = new WeakMap(), Ks = new WeakSet(), zu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ee(this, ar) - n.encodedLength);
  return se([Ee(this, or).encode(s), i, r]);
}, zs = new WeakSet(), ed = function(t, n) {
  return [t, n];
}, BA), Ug = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new x(R.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, mo = class extends ie {
  constructor(t) {
    const n = Ug(t);
    super("number", t, n);
    D(this, "length");
    D(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Jt(t);
    } catch {
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Jt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid number byte data size.");
    return [Ot(r), n + this.length];
  }
}, Gg = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", re);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const n = new pt(new mo("u8"), e.length).encode(e), r = new _("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new pt(new mo("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, td = class extends ie {
  constructor() {
    super("struct", "struct String", re);
  }
  encode(e) {
    const t = si(e), n = new _("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid std string data size.");
    const n = t + re, r = e.slice(t, n), s = Q(new _("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [ii(i), n + s];
  }
};
ui(td, "memorySize", 1);
var Hg = class extends ie {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new x(R.ENCODE_ERROR, "Value length mismatch during encode.");
    return si(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string byte data size.");
    return [ii(n), t + this.encodedLength];
  }
}, Jg = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    D(this, "name");
    D(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return jr(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof li) && s == null)
          throw new x(
            R.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, Zg = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Types/values length mismatch.");
    return jr(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, Yg = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + re);
    D(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new _("u64").encode(t.length);
    return new Uint8Array([...r, ...jr(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Aa)
      throw new x(R.DECODE_ERROR, "Invalid vec data size.");
    const r = n + re, s = t.slice(n, r), o = Q(new _("u64").decode(s, 0)[0]).toNumber() * this.coder.encodedLength, c = t.slice(r, r + o);
    if (c.length !== o)
      throw new x(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Uu(c, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, Gn = (e, t) => {
  var d, h, I, g, b, F;
  switch (e.type) {
    case vu:
    case Fu:
    case Du:
      return new mo(e.type);
    case Ru:
    case Su:
      return new _("u64");
    case Nu:
      return new _("u256");
    case _u:
      return new Gg();
    case ku:
      return new Lg();
    case Mu:
      return new G();
    case Ou:
      return new Ju();
    case sa:
      return new Ku();
    case ia:
      return new td();
  }
  const n = (d = oa.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new Hg(v);
  }
  const r = e.components, s = (h = _s.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const v = parseInt(s.length, 10), C = r[0];
    if (!C)
      throw new x(
        R.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const N = Gn(C);
    return new pt(N, v);
  }
  if (e.type === ra) {
    const v = (I = Ft(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : I[0];
    if (!v)
      throw new x(
        R.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const C = new nn(e.abi, v), N = Gn(C);
    return new Yg(N);
  }
  const i = (g = aa.exec(e.type)) == null ? void 0 : g.groups;
  if (i) {
    const v = Os(r, { isRightPadded: !0, getCoder: Gn });
    return new Jg(i.name, v);
  }
  const o = (b = ca.exec(e.type)) == null ? void 0 : b.groups;
  if (o) {
    const v = Os(r, { getCoder: Gn });
    return e.type === na ? new li(o.name, v) : new Pg(o.name, v);
  }
  if ((F = Tu.exec(e.type)) == null ? void 0 : F.groups) {
    const v = r.map(
      (C) => Gn(C)
    );
    return new Zg(v);
  }
  throw e.type === Lu ? new x(
    R.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new x(
    R.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Vg(e = ks) {
  switch (e) {
    case Bg:
      return Gn;
    case ks:
      return Un;
    default:
      throw new x(
        R.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Yn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new nn(e, t);
    return Vg(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, ei, nd, ti, rd, ni, sd, CA, bs = (CA = class {
  constructor(e, t) {
    ft(this, ei);
    ft(this, ti);
    ft(this, ni);
    D(this, "signature");
    D(this, "selector");
    D(this, "name");
    D(this, "jsonFn");
    D(this, "attributes");
    D(this, "isInputDataPointer");
    D(this, "outputMetadata");
    D(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Ft(this.jsonAbi.functions, (n) => n.name === t), this.name = t, this.signature = bs.getSignature(this.jsonAbi, this.jsonFn), this.selector = bs.getFunctionSelector(this.signature), this.isInputDataPointer = sn(this, ei, nd).call(this), this.outputMetadata = {
      isHeapType: sn(this, ti, rd).call(this),
      encodedLength: sn(this, ni, sd).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new nn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = ke(yn(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    bs.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = this.jsonFn.inputs.filter(
      (c) => Ft(this.jsonAbi.types, (d) => d.typeId === c.type).type !== "()"
    );
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (c) => Yn.getCoder(this.jsonAbi, c, {
        isRightPadded: r.length > 1
      })
    ), o = new Wu(s).encode(n);
    return Pu(o, t, o.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Ft(n.types, (c) => c.typeId === o.type)), s = r.filter(
      (o) => o.type === na || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new x(R.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = Z(e), n = this.jsonFn.inputs.filter(
      (s) => Ft(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new x(
        R.DECODE_ERROR,
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
        const o = Yn.getCoder(this.jsonAbi, i), [c, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Ft(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    ).type === "()")
      return [void 0, 0];
    const n = Z(e);
    return Yn.getCoder(this.jsonAbi, this.jsonFn.output).decode(n, 0);
  }
}, ei = new WeakSet(), nd = function() {
  var t;
  const e = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Ng(((t = e[0]) == null ? void 0 : t.type) || "");
}, ti = new WeakSet(), rd = function() {
  const e = Ft(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);
  return Sg((e == null ? void 0 : e.type) || "");
}, ni = new WeakSet(), sd = function() {
  try {
    const e = Yn.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof qu ? e.coder.encodedLength : e instanceof Ms ? Ms.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, CA), bn = class {
  constructor(e) {
    D(this, "functions");
    D(this, "configurables");
    /*
      TODO: Refactor so that there's no need for externalLoggedTypes
    
      This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method.
      This is used to decode logs from contracts other than the main contract
      we're interacting with.
      */
    D(this, "externalLoggedTypes");
    D(this, "jsonAbi");
    this.jsonAbi = e, this.externalLoggedTypes = {}, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new bs(this.jsonAbi, t.name)])
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
    throw new x(
      R.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    const n = typeof e == "string" ? this.getFunction(e) : e;
    if (!n)
      throw new x(R.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    const r = typeof e == "string" ? this.getFunction(e) : e;
    if (!r)
      throw new x(R.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t, n) {
    if (this.externalLoggedTypes[n])
      return this.externalLoggedTypes[n].decodeLog(e, t, n);
    const { loggedType: s } = Ft(this.jsonAbi.loggedTypes, (i) => i.logId === t);
    return Yn.decode(this.jsonAbi, s, Z(e), 0, {
      encoding: this.jsonAbi.encoding
    });
  }
  updateExternalLoggedTypes(e, t) {
    this.externalLoggedTypes[e] = t;
  }
  encodeConfigurable(e, t) {
    const n = Ft(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new x(
          R.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return Yn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return Ft(
      this.jsonAbi.types,
      (t) => t.typeId === e,
      () => {
        throw new x(
          R.TYPE_NOT_FOUND,
          `Type with typeId '${e}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, TB = class {
}, Xg = class {
}, id = class {
}, od = class {
}, jg = class extends od {
}, $g = class extends od {
}, In, bA, Ie = (bA = class extends ie {
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
    D(this, "length");
    ft(this, In, void 0);
    this.length = t, Ct(this, In, n);
  }
  encode(t) {
    const n = [], r = Z(t);
    return n.push(r), Ee(this, In) && n.push(new Uint8Array(Ee(this, In))), se(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [X(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Ee(this, In) && ([r, s] = [null, s + Ee(this, In)]), [i, s];
  }
}, In = new WeakMap(), bA), cr = class extends hi {
  constructor() {
    super("TxPointer", {
      blockHeight: new K("u32"),
      txIndex: new K("u16")
    });
  }
}, we = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(we || {}), gc = class extends ie {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new _("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new cr().encode(e.txPointer)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new K("u32").encode(e.maturity)), t.push(new _("u64").encode(e.predicateGasUsed)), t.push(new K("u32").encode(e.predicateLength)), t.push(new K("u32").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), se(t);
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
    [n, r] = new cr().decode(e, r);
    const h = n;
    [n, r] = new K("u8").decode(e, r);
    const I = Number(n);
    [n, r] = new K("u32").decode(e, r);
    const g = n;
    [n, r] = new _("u64").decode(e, r);
    const b = n;
    [n, r] = new K("u32").decode(e, r);
    const F = n;
    [n, r] = new K("u32").decode(e, r);
    const v = n;
    [n, r] = new Ie(F).decode(e, r);
    const C = n;
    return [n, r] = new Ie(v).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: d,
        txPointer: h,
        witnessIndex: I,
        maturity: g,
        predicateGasUsed: b,
        predicateLength: F,
        predicateDataLength: v,
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
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new cr().encode(e.txPointer)), t.push(new G().encode(e.contractID)), se(t);
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
    [n, r] = new cr().decode(e, r);
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
}, Tr = class extends ie {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _("u64").encode(e.amount)), t.push(Z(e.data || "0x")), ke(se(t));
  }
  static encodeData(e) {
    const t = Z(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = Tr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new _("u64").encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new _("u64").encode(e.predicateGasUsed)), t.push(new K("u32").encode(n.length)), t.push(new K("u32").encode(e.predicateLength)), t.push(new K("u32").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), se(t);
  }
  static decodeData(e) {
    const t = Z(e), n = t.length, [r] = new Ie(n).decode(t, 0);
    return Z(r);
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
    const h = n;
    [n, r] = new K("u32").decode(e, r);
    const I = n;
    [n, r] = new K("u32").decode(e, r);
    const g = n;
    [n, r] = new K("u32").decode(e, r);
    const b = n;
    [n, r] = new Ie(I).decode(e, r);
    const F = n;
    [n, r] = new Ie(g).decode(e, r);
    const v = n;
    return [n, r] = new Ie(b).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: c,
        predicateGasUsed: h,
        dataLength: I,
        predicateLength: g,
        predicateDataLength: b,
        data: F,
        predicate: v,
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
        t.push(new gc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ls().encode(e));
        break;
      }
      case 2: {
        t.push(new Tr().encode(e));
        break;
      }
      default:
        throw new x(
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
        return [n, r] = new gc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ls().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Tr().decode(e, r), [n, r];
      default:
        throw new x(
          R.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Be || {}), pc = class extends ie {
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
}, mc = class extends ie {
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
}, wc = class extends ie {
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
}, Ec = class extends ie {
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
        t.push(new pc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ps().encode(e));
        break;
      }
      case 2: {
        t.push(new mc().encode(e));
        break;
      }
      case 3: {
        t.push(new wc().encode(e));
        break;
      }
      case 4: {
        t.push(new Ec().encode(e));
        break;
      }
      default:
        throw new x(
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
        return [n, r] = new pc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ps().decode(e, r), [n, r];
      case 2:
        return [n, r] = new mc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new wc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Ec().decode(e, r), [n, r];
      default:
        throw new x(
          R.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Ut = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Ut || {}), Wg = (e) => e.sort((t, n) => t.type - n.type);
function qg(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new x(
        R.DUPLICATED_POLICY,
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
    qg(e);
    const t = Wg(e), n = [];
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
          throw new x(R.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
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
}, ue = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ue || {}), Ic = class extends ie {
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
    const h = n;
    [n, r] = new _("u64").decode(e, r);
    const I = n;
    [n, r] = new _("u64").decode(e, r);
    const g = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: d,
        param1: h,
        param2: I,
        pc: g,
        is: n
      },
      r
    ];
  }
}, yc = class extends ie {
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
}, Bc = class extends ie {
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
}, Cc = class extends ie {
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
}, bc = class extends ie {
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
}, Qc = class extends ie {
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
    const h = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: c,
        val3: d,
        pc: h,
        is: n
      },
      r
    ];
  }
}, xc = class extends ie {
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
    const h = n;
    [n, r] = new _("u64").decode(e, r);
    const I = n;
    return [n, r] = new _("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: d,
        digest: h,
        pc: I,
        is: n
      },
      r
    ];
  }
}, vc = class extends ie {
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
}, Fc = class extends ie {
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
}, Dc = class extends ie {
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
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _("u64").encode(e.amount)), t.push(Z(e.data || "0x")), ke(se(t));
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
    const h = n;
    [n, r] = new Ie(d).decode(e, r);
    const I = Z(n), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: h,
      data: I
    };
    return g.messageId = Hs.getMessageId(g), [g, r];
  }
}, ad = (e, t) => {
  const n = Z(e), r = Z(t);
  return ke(se([n, r]));
}, Pr = class extends ie {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return ad(e, t);
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
    const d = n, h = Pr.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: d,
      assetId: h
    }, r];
  }
}, wo = class extends ie {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return ad(e, t);
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
    const d = n, h = Pr.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: d,
      assetId: h
    }, r];
  }
}, PB = class extends ie {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Ic().encode(e));
        break;
      }
      case 1: {
        t.push(new yc().encode(e));
        break;
      }
      case 2: {
        t.push(new Bc().encode(e));
        break;
      }
      case 3: {
        t.push(new Cc().encode(e));
        break;
      }
      case 4: {
        t.push(new bc().encode(e));
        break;
      }
      case 5: {
        t.push(new Qc().encode(e));
        break;
      }
      case 6: {
        t.push(new xc().encode(e));
        break;
      }
      case 7: {
        t.push(new vc().encode(e));
        break;
      }
      case 8: {
        t.push(new Fc().encode(e));
        break;
      }
      case 9: {
        t.push(new Dc().encode(e));
        break;
      }
      case 10: {
        t.push(new Hs().encode(e));
        break;
      }
      case 11: {
        t.push(new Pr().encode(e));
        break;
      }
      case 12: {
        t.push(new wo().encode(e));
        break;
      }
      default:
        throw new x(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ic().decode(e, r), [n, r];
      case 1:
        return [n, r] = new yc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Bc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Cc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new bc().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Qc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new xc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new vc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Fc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new Dc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new Hs().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Pr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new wo().decode(e, r), [n, r];
      default:
        throw new x(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Rc = class extends hi {
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
}, bt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(bt || {}), Nc = class extends ie {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _("u64").encode(e.scriptGasLimit)), t.push(new K("u32").encode(e.scriptLength)), t.push(new K("u32").encode(e.scriptDataLength)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new Ie(e.scriptLength).encode(e.script)), t.push(new Ie(e.scriptDataLength).encode(e.scriptData)), t.push(new Gs().encode(e.policies)), t.push(new pt(new Ts(), e.inputsCount).encode(e.inputs)), t.push(new pt(new Us(), e.outputsCount).encode(e.outputs)), t.push(new pt(new Js(), e.witnessesCount).encode(e.witnesses)), se(t);
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
    const h = n;
    [n, r] = new K("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Ie(i).decode(e, r);
    const b = n;
    [n, r] = new Ie(o).decode(e, r);
    const F = n;
    [n, r] = new Gs().decode(e, r, c);
    const v = n;
    [n, r] = new pt(new Ts(), d).decode(e, r);
    const C = n;
    [n, r] = new pt(new Us(), h).decode(e, r);
    const N = n;
    return [n, r] = new pt(new Js(), I).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: c,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: I,
        receiptsRoot: g,
        script: b,
        scriptData: F,
        policies: v,
        inputs: C,
        outputs: N,
        witnesses: n
      },
      r
    ];
  }
}, Sc = class extends ie {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new K("u32").encode(e.bytecodeLength)), t.push(new K("u8").encode(e.bytecodeWitnessIndex)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u16").encode(e.storageSlotsCount)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new Gs().encode(e.policies)), t.push(
      new pt(new Rc(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new pt(new Ts(), e.inputsCount).encode(e.inputs)), t.push(new pt(new Us(), e.outputsCount).encode(e.outputs)), t.push(new pt(new Js(), e.witnessesCount).encode(e.witnesses)), se(t);
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
    const h = n;
    [n, r] = new K("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Gs().decode(e, r, o);
    const b = n;
    [n, r] = new pt(new Rc(), c).decode(e, r);
    const F = n;
    [n, r] = new pt(new Ts(), d).decode(e, r);
    const v = n;
    [n, r] = new pt(new Us(), h).decode(e, r);
    const C = n;
    return [n, r] = new pt(new Js(), I).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: c,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: I,
        salt: g,
        policies: b,
        storageSlots: F,
        inputs: v,
        outputs: C,
        witnesses: n
      },
      r
    ];
  }
}, _c = class extends ie {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new cr().encode(e.txPointer)), t.push(new Ls().encode(e.inputContract)), t.push(new Ps().encode(e.outputContract)), t.push(new _("u64").encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), se(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new cr().decode(e, r);
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
}, Qn = class extends ie {
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
          new Nc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Sc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new _c().encode(e));
        break;
      }
      default:
        throw new x(
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
        return [n, r] = new Nc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Sc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new _c().decode(e, r), [n, r];
      default:
        throw new x(
          R.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, UB = class extends hi {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new K("u8")
    });
  }
}, GB = 16 * 1024, HB = 16, JB = 1024 * 1024 * 1024, ZB = 1024 * 1024 * 1024, YB = 255, VB = 1024 * 1024, XB = 1024 * 1024, Kg = "0xffffffffffff0000", cd = "0xffffffffffff0001", zg = "0xffffffffffff0002", ep = "0xffffffffffff0003", tp = "0xffffffffffff0004", np = "0x0", Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
var Ar = Ur.bech32m = Ur.bech32 = void 0;
const Zs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Ad = {};
for (let e = 0; e < Zs.length; e++) {
  const t = Zs.charAt(e);
  Ad[t] = e;
}
function qn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function kc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = qn(t) ^ r >> 5;
  }
  t = qn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = qn(t) ^ r & 31;
  }
  return t;
}
function da(e, t, n, r) {
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
function rp(e) {
  return da(e, 8, 5, !0);
}
function sp(e) {
  const t = da(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function ip(e) {
  const t = da(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function ud(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = kc(o);
    if (typeof h == "string")
      throw new Error(h);
    let I = o + "1";
    for (let g = 0; g < c.length; ++g) {
      const b = c[g];
      if (b >> 5)
        throw new Error("Non 5-bit word");
      h = qn(h) ^ b, I += Zs.charAt(b);
    }
    for (let g = 0; g < 6; ++g)
      h = qn(h);
    h ^= t;
    for (let g = 0; g < 6; ++g) {
      const b = h >> (5 - g) * 5 & 31;
      I += Zs.charAt(b);
    }
    return I;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
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
    const g = o.slice(0, I), b = o.slice(I + 1);
    if (b.length < 6)
      return "Data too short";
    let F = kc(g);
    if (typeof F == "string")
      return F;
    const v = [];
    for (let C = 0; C < b.length; ++C) {
      const N = b.charAt(C), S = Ad[N];
      if (S === void 0)
        return "Unknown character " + N;
      F = qn(F) ^ S, !(C + 6 >= b.length) && v.push(S);
    }
    return F !== t ? "Invalid checksum for " + o : { prefix: g, words: v };
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
    toWords: rp,
    fromWordsUnsafe: sp,
    fromWords: ip
  };
}
Ur.bech32 = ud("bech32");
Ar = Ur.bech32m = ud("bech32m");
var Ys = "fuel";
function la(e) {
  return Ar.decode(e);
}
function Qs(e) {
  return Ar.encode(
    Ys,
    Ar.toWords(Z(X(e)))
  );
}
function xs(e) {
  return typeof e == "string" && e.indexOf(Ys + 1) === 0 && la(e).prefix === Ys;
}
function Eo(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Mc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Io(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function ha(e) {
  return new Uint8Array(Ar.fromWords(la(e).words));
}
function Oc(e) {
  if (!xs(e))
    throw new x(
      x.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return X(ha(e));
}
function op(e) {
  const { words: t } = la(e);
  return Ar.encode(Ys, t);
}
var Dr = (e) => e instanceof id ? e.address : e instanceof jg ? e.id : e, ap = () => X(Cn(32)), cp = (e) => {
  let t;
  try {
    if (!Eo(e))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = ha(Qs(e)), t = X(t.fill(0, 0, 12));
  } catch {
    throw new x(
      x.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Ap = (e) => {
  if (!Io(e))
    throw new x(x.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, he = class extends Xg {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    D(this, "bech32Address");
    if (this.bech32Address = op(t), !xs(this.bech32Address))
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
    return Oc(this.bech32Address);
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
    const t = Oc(this.bech32Address);
    return {
      value: cp(t)
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
    if (!Mc(t))
      throw new x(x.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = ke(X(Z(t)));
    return new he(Qs(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Eo(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new he(Qs(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(ap());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return xs(t) ? new he(t) : this.fromB256(t);
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
    if (Mc(t))
      return he.fromPublicKey(t);
    if (xs(t))
      return new he(t);
    if (Eo(t))
      return he.fromB256(t);
    if (Io(t))
      return he.fromEvmAddress(t);
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
    const n = Ap(t);
    return new he(Qs(n));
  }
}, Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", It = Ne, jB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const dd = BigInt(0), fi = BigInt(1), up = BigInt(2);
function qt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const dp = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ur(e) {
  if (!qt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += dp[e[n]];
  return t;
}
function ld(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function fa(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const Kt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Lc(e) {
  if (e >= Kt._0 && e <= Kt._9)
    return e - Kt._0;
  if (e >= Kt._A && e <= Kt._F)
    return e - (Kt._A - 10);
  if (e >= Kt._a && e <= Kt._f)
    return e - (Kt._a - 10);
}
function dr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Lc(e.charCodeAt(i)), c = Lc(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Mn(e) {
  return fa(ur(e));
}
function ga(e) {
  if (!qt(e))
    throw new Error("Uint8Array expected");
  return fa(ur(Uint8Array.from(e).reverse()));
}
function lr(e, t) {
  return dr(e.toString(16).padStart(t * 2, "0"));
}
function pa(e, t) {
  return lr(e, t).reverse();
}
function lp(e) {
  return dr(ld(e));
}
function Gt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = dr(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (qt(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Gr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!qt(i))
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
function hd(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function hp(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function fp(e) {
  let t;
  for (t = 0; e > dd; e >>= fi, t += 1)
    ;
  return t;
}
function gp(e, t) {
  return e >> BigInt(t) & fi;
}
const pp = (e, t, n) => e | (n ? fi : dd) << BigInt(t), ma = (e) => (up << BigInt(e - 1)) - fi, Vi = (e) => new Uint8Array(e), Tc = (e) => Uint8Array.from(e);
function fd(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Vi(e), s = Vi(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...g) => n(s, r, ...g), d = (g = Vi()) => {
    s = c(Tc([0]), g), r = c(), g.length !== 0 && (s = c(Tc([1]), g), r = c());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const b = [];
    for (; g < t; ) {
      r = c();
      const F = r.slice();
      b.push(F), g += r.length;
    }
    return Gr(...b);
  };
  return (g, b) => {
    o(), d(g);
    let F;
    for (; !(F = b(h())); )
      d();
    return o(), F;
  };
}
const mp = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || qt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function zr(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = mp[i];
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
const wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: gp,
  bitLen: fp,
  bitMask: ma,
  bitSet: pp,
  bytesToHex: ur,
  bytesToNumberBE: Mn,
  bytesToNumberLE: ga,
  concatBytes: Gr,
  createHmacDrbg: fd,
  ensureBytes: Gt,
  equalBytes: hd,
  hexToBytes: dr,
  hexToNumber: fa,
  isBytes: qt,
  numberToBytesBE: lr,
  numberToBytesLE: pa,
  numberToHexUnpadded: ld,
  numberToVarBytesBE: lp,
  utf8ToBytes: hp,
  validateObject: zr
}, Symbol.toStringTag, { value: "Module" }));
var Xi = {}, yo = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof be < "u" && be, r = function() {
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
        ], g = ArrayBuffer.isView || function(A) {
          return A && I.indexOf(Object.prototype.toString.call(A)) > -1;
        };
      function b(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function F(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function v(A) {
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
        }), v(A);
      }, C.prototype.values = function() {
        var A = [];
        return this.forEach(function(l) {
          A.push(l);
        }), v(A);
      }, C.prototype.entries = function() {
        var A = [];
        return this.forEach(function(l, m) {
          A.push([m, l]);
        }), v(A);
      }, d.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
      function N(A) {
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
      function J(A) {
        var l = new FileReader(), m = S(l);
        return l.readAsArrayBuffer(A), m;
      }
      function T(A) {
        var l = new FileReader(), m = S(l);
        return l.readAsText(A), m;
      }
      function j(A) {
        for (var l = new Uint8Array(A), m = new Array(l.length), f = 0; f < l.length; f++)
          m[f] = String.fromCharCode(l[f]);
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
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && h(A) ? (this._bodyArrayBuffer = M(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || g(A)) ? this._bodyArrayBuffer = M(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
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
            return this.blob().then(J);
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
          var f = /([?&])_=[^&]*/;
          if (f.test(this.url))
            this.url = this.url.replace(f, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
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
            var f = m.split("="), E = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(E), decodeURIComponent(y));
          }
        }), l;
      }
      function H(A) {
        var l = new C(), m = A.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var E = f.split(":"), y = E.shift().trim();
          if (y) {
            var p = E.join(":").trim();
            l.append(y, p);
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
          var f = Error(l);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(A, l) {
        return new Promise(function(m, f) {
          var E = new W(A, l);
          if (E.signal && E.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var y = new XMLHttpRequest();
          function p() {
            y.abort();
          }
          y.onload = function() {
            var w = {
              status: y.status,
              statusText: y.statusText,
              headers: H(y.getAllResponseHeaders() || "")
            };
            w.url = "responseURL" in y ? y.responseURL : w.headers.get("X-Request-URL");
            var Y = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              m(new z(Y, w));
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
          function u(w) {
            try {
              return w === "" && c.location.href ? c.location.href : w;
            } catch {
              return w;
            }
          }
          y.open(E.method, u(E.url), !0), E.credentials === "include" ? y.withCredentials = !0 : E.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(w) {
            y.setRequestHeader(w, F(l.headers[w]));
          }) : E.headers.forEach(function(w, Y) {
            y.setRequestHeader(Y, w);
          }), E.signal && (E.signal.addEventListener("abort", p), y.onreadystatechange = function() {
            y.readyState === 4 && E.signal.removeEventListener("abort", p);
          }), y.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = C, c.Request = W, c.Response = z), o.Headers = C, o.Request = W, o.Response = z, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(yo, yo.exports);
var Ep = yo.exports;
function Ip(e) {
  return typeof e == "object" && e !== null;
}
function yp(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Bp = /\r\n|[\n\r]/g;
function Bo(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Bp)) {
    if (typeof s.index == "number" || yp(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Cp(e) {
  return gd(
    e.source,
    Bo(e.source, e.start)
  );
}
function gd(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, d = t.column + c, h = `${e.name}:${o}:${d}
`, I = r.split(/\r\n|[\n\r]/g), g = I[s];
  if (g.length > 120) {
    const b = Math.floor(d / 80), F = d % 80, v = [];
    for (let C = 0; C < g.length; C += 80)
      v.push(g.slice(C, C + 80));
    return h + Pc([
      [`${o} |`, v[0]],
      ...v.slice(1, b + 1).map((C) => ["|", C]),
      ["|", "^".padStart(F)],
      ["|", v[b + 1]]
    ]);
  }
  return h + Pc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, I[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, I[s + 1]]
  ]);
}
function Pc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function bp(e) {
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
  constructor(t, ...n) {
    var r, s, i;
    const { nodes: o, source: c, positions: d, path: h, originalError: I, extensions: g } = bp(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = I ?? void 0, this.nodes = Uc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const b = Uc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((v) => v.loc).filter((v) => v != null)
    );
    this.source = c ?? (b == null || (s = b[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (b == null ? void 0 : b.map((v) => v.start)), this.locations = d && c ? d.map((v) => Bo(c, v)) : b == null ? void 0 : b.map((v) => Bo(v.source, v.start));
    const F = Ip(
      I == null ? void 0 : I.extensions
    ) ? I == null ? void 0 : I.extensions : void 0;
    this.extensions = (i = g ?? F) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
      for (const n of this.nodes)
        n.loc && (t += `

` + Cp(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + gd(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Uc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function mt(e, t, n) {
  return new wa(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Qp {
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
class pd {
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
const md = {
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
}, xp = new Set(Object.keys(md));
function Gc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && xp.has(t);
}
var Vn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Vn || (Vn = {}));
var Co;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Co || (Co = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function bo(e) {
  return e === 9 || e === 32;
}
function Hr(e) {
  return e >= 48 && e <= 57;
}
function wd(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Ed(e) {
  return wd(e) || e === 95;
}
function vp(e) {
  return wd(e) || Hr(e) || e === 95;
}
function Fp(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], d = Dp(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Dp(e) {
  let t = 0;
  for (; t < e.length && bo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Rp(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((F) => F.length === 0 || bo(F.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, d = e.endsWith("\\"), h = c || d, I = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let g = "";
  const b = s && bo(e.charCodeAt(0));
  return (I && !b || i) && (g += `
`), g += n, (I || h) && (g += `
`), '"""' + g + '"""';
}
var L;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(L || (L = {}));
class Np {
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
    const n = new pd(L.SOF, 0, 0, 0, 0);
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
          const n = _p(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === L.COMMENT);
    return t;
  }
}
function Sp(e) {
  return e === L.BANG || e === L.DOLLAR || e === L.AMP || e === L.PAREN_L || e === L.PAREN_R || e === L.SPREAD || e === L.COLON || e === L.EQUALS || e === L.AT || e === L.BRACKET_L || e === L.BRACKET_R || e === L.BRACE_L || e === L.PIPE || e === L.BRACE_R;
}
function Br(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function gi(e, t) {
  return Id(e.charCodeAt(t)) && yd(e.charCodeAt(t + 1));
}
function Id(e) {
  return e >= 55296 && e <= 56319;
}
function yd(e) {
  return e >= 56320 && e <= 57343;
}
function Tn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return L.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function gt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new pd(t, n, r, i, o, s);
}
function _p(e, t) {
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
        return kp(e, s);
      case 33:
        return gt(e, L.BANG, s, s + 1);
      case 36:
        return gt(e, L.DOLLAR, s, s + 1);
      case 38:
        return gt(e, L.AMP, s, s + 1);
      case 40:
        return gt(e, L.PAREN_L, s, s + 1);
      case 41:
        return gt(e, L.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return gt(e, L.SPREAD, s, s + 3);
        break;
      case 58:
        return gt(e, L.COLON, s, s + 1);
      case 61:
        return gt(e, L.EQUALS, s, s + 1);
      case 64:
        return gt(e, L.AT, s, s + 1);
      case 91:
        return gt(e, L.BRACKET_L, s, s + 1);
      case 93:
        return gt(e, L.BRACKET_R, s, s + 1);
      case 123:
        return gt(e, L.BRACE_L, s, s + 1);
      case 124:
        return gt(e, L.PIPE, s, s + 1);
      case 125:
        return gt(e, L.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Up(e, s) : Op(e, s);
    }
    if (Hr(i) || i === 45)
      return Mp(e, s, i);
    if (Ed(i))
      return Gp(e, s);
    throw mt(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Br(i) || gi(n, s) ? `Unexpected character: ${Tn(e, s)}.` : `Invalid character: ${Tn(e, s)}.`
    );
  }
  return gt(e, L.EOF, r, r);
}
function kp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Br(i))
      ++s;
    else if (gi(n, s))
      s += 2;
    else
      break;
  }
  return gt(
    e,
    L.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function Mp(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Hr(i))
      throw mt(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Tn(
          e,
          s
        )}.`
      );
  } else
    s = ji(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = ji(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = ji(e, s, i), i = r.charCodeAt(s)), i === 46 || Ed(i))
    throw mt(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Tn(
        e,
        s
      )}.`
    );
  return gt(
    e,
    o ? L.FLOAT : L.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function ji(e, t, n) {
  if (!Hr(n))
    throw mt(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Tn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Hr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function Op(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), gt(e, L.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Lp(e, s) : Tp(e, s) : Pp(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (Br(c))
      ++s;
    else if (gi(n, s))
      s += 2;
    else
      throw mt(
        e.source,
        s,
        `Invalid character within String: ${Tn(
          e,
          s
        )}.`
      );
  }
  throw mt(e.source, s, "Unterminated string.");
}
function Lp(e, t) {
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
  throw mt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function Tp(e, t) {
  const n = e.source.body, r = Hc(n, t + 2);
  if (Br(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Id(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Hc(n, t + 8);
    if (yd(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw mt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function Hc(e, t) {
  return Rr(e.charCodeAt(t)) << 12 | Rr(e.charCodeAt(t + 1)) << 8 | Rr(e.charCodeAt(t + 2)) << 4 | Rr(e.charCodeAt(t + 3));
}
function Rr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Pp(e, t) {
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
  throw mt(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function Up(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const I = gt(
        e,
        L.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Fp(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, I;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      c += n.slice(o, i), d.push(c), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (Br(h))
      ++i;
    else if (gi(n, i))
      i += 2;
    else
      throw mt(
        e.source,
        i,
        `Invalid character within String: ${Tn(
          e,
          i
        )}.`
      );
  }
  throw mt(e.source, i, "Unterminated string.");
}
function Gp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (vp(i))
      ++s;
    else
      break;
  }
  return gt(
    e,
    L.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function vs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Hp = 10, Bd = 2;
function Cd(e) {
  return pi(e, []);
}
function pi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Jp(e, t);
    default:
      return String(e);
  }
}
function Jp(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Zp(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : pi(r, n);
  } else if (Array.isArray(e))
    return Vp(e, n);
  return Yp(e, n);
}
function Zp(e) {
  return typeof e.toJSON == "function";
}
function Yp(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > Bd ? "[" + Xp(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + pi(i, t)
  ).join(", ") + " }";
}
function Vp(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Bd)
    return "[Array]";
  const n = Math.min(Hp, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(pi(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Xp(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const jp = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class bd {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || vs(!1, `Body must be a string. Received: ${Cd(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || vs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || vs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function $p(e) {
  return jp(e, bd);
}
function Qd(e, t) {
  return new es(e, t).parseDocument();
}
function Wp(e, t) {
  const n = new es(e, t);
  n.expectToken(L.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(L.EOF), r;
}
function qp(e, t) {
  const n = new es(e, t);
  n.expectToken(L.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(L.EOF), r;
}
function Kp(e, t) {
  const n = new es(e, t);
  n.expectToken(L.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(L.EOF), r;
}
class es {
  constructor(t, n = {}) {
    const r = $p(t) ? t : new bd(t);
    this._lexer = new Np(r), this._options = n, this._tokenCounter = 0;
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
        throw mt(
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
        operation: Vn.QUERY,
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
        return Vn.QUERY;
      case "mutation":
        return Vn.MUTATION;
      case "subscription":
        return Vn.SUBSCRIPTION;
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
            throw mt(
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
      throw mt(
        this._lexer.source,
        this._lexer.token.start,
        `${hs(
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
    if (Object.prototype.hasOwnProperty.call(Co, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Qp(
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
    throw mt(
      this._lexer.source,
      n.start,
      `Expected ${xd(t)}, found ${hs(n)}.`
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
      throw mt(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${hs(n)}.`
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
    return mt(
      this._lexer.source,
      n.start,
      `Unexpected ${hs(n)}.`
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
      throw mt(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function hs(e) {
  const t = e.value;
  return xd(e.kind) + (t != null ? ` "${t}"` : "");
}
function xd(e) {
  return Sp(e) ? `"${e}"` : e;
}
const zp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: es,
  parse: Qd,
  parseConstValue: qp,
  parseType: Kp,
  parseValue: Wp
}, Symbol.toStringTag, { value: "Module" })), em = /* @__PURE__ */ Go(zp);
function tm(e) {
  return `"${e.replace(nm, rm)}"`;
}
const nm = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function rm(e) {
  return sm[e.charCodeAt(0)];
}
const sm = [
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
], im = Object.freeze({});
function om(e, t, n = md) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ae))
    r.set(S, am(t, S));
  let s, i = Array.isArray(e), o = [e], c = -1, d = [], h = e, I, g;
  const b = [], F = [];
  do {
    c++;
    const S = c === o.length, J = S && d.length !== 0;
    if (S) {
      if (I = F.length === 0 ? void 0 : b[b.length - 1], h = g, g = F.pop(), J)
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
      c = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (I = i ? c : o[c], h = g[I], h == null)
        continue;
      b.push(I);
    }
    let T;
    if (!Array.isArray(h)) {
      var v, C;
      Gc(h) || vs(!1, `Invalid AST Node: ${Cd(h)}.`);
      const j = S ? (v = r.get(h.kind)) === null || v === void 0 ? void 0 : v.leave : (C = r.get(h.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (T = j == null ? void 0 : j.call(t, h, I, g, b, F), T === im)
        break;
      if (T === !1) {
        if (!S) {
          b.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([I, T]), !S))
        if (Gc(T))
          h = T;
        else {
          b.pop();
          continue;
        }
    }
    if (T === void 0 && J && d.push([I, h]), S)
      b.pop();
    else {
      var N;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (N = n[h.kind]) !== null && N !== void 0 ? N : [], c = -1, d = [], g && F.push(g), g = h;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function am(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function vd(e) {
  return om(e, Am);
}
const cm = 80, Am = {
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
    leave: ({ selections: e }) => Pt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", ee(n, ", "), ")");
      return o.length > cm && (o = i + pe(`(
`, Fs(ee(n, `
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
    leave: ({ value: e, block: t }) => t ? Rp(e) : tm(e)
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
`) + ee(["schema", ee(t, " "), Pt(n)], " ")
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
        Pt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Jc(n) ? pe(`(
`, Fs(ee(n, `
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
        Pt(s)
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
`) + ee(["enum", t, ee(n, " "), Pt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + ee([t, ee(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + ee(["input", t, ee(n, " "), Pt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Jc(n) ? pe(`(
`, Fs(ee(n, `
`)), `
)`) : pe("(", ee(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + ee(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => ee(
      ["extend schema", ee(e, " "), Pt(t)],
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
        Pt(r)
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
        Pt(r)
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
    leave: ({ name: e, directives: t, values: n }) => ee(["extend enum", e, ee(t, " "), Pt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => ee(["extend input", e, ee(t, " "), Pt(n)], " ")
  }
};
function ee(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Pt(e) {
  return pe(`{
`, Fs(ee(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Fs(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Jc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const um = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: vd
}, Symbol.toStringTag, { value: "Module" })), dm = /* @__PURE__ */ Go(um);
var Ea = {}, mi = {}, Fd = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, lm = Fd, Dd = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof lm;
}, hm = Dd, fm = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = hm);
  var s, i = /* @__PURE__ */ new Map();
  function o(I, g) {
    var b = i.get(g);
    b ? b.push.apply(b, I) : i.set(g, I);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(I, g) {
        return o(["" + c + g], I), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(I, g) {
        var b = e(I, "" + c + g, r);
        return b.files.forEach(o), b.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var h = e(t[d], "" + c + d, r);
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
mi.ReactNativeFile = Fd;
mi.extractFiles = fm;
mi.isExtractableFile = Dd;
var gm = typeof self == "object" ? self.FormData : window.FormData, ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.defaultJsonSerializer = void 0;
ts.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var pm = be && be.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ea, "__esModule", { value: !0 });
var Rd = mi, mm = pm(gm), wm = ts, Em = function(e) {
  return Rd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Im(e, t, n, r) {
  r === void 0 && (r = wm.defaultJsonSerializer);
  var s = Rd.extractFiles({ query: e, variables: t, operationName: n }, "", Em), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(b, F, v) {
      return b.push({ query: F, variables: t ? t[v] : void 0 }), b;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? mm.default : FormData, h = new d();
  h.append("operations", r.stringify(i));
  var I = {}, g = 0;
  return o.forEach(function(b) {
    I[++g] = b;
  }), h.append("map", r.stringify(I)), g = 0, o.forEach(function(b, F) {
    h.append("" + ++g, F);
  }), h;
}
Ea.default = Im;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.parseBatchRequestsExtendedArgs = Dt.parseRawRequestExtendedArgs = Dt.parseRequestExtendedArgs = Dt.parseBatchRequestArgs = Dt.parseRawRequestArgs = Dt.parseRequestArgs = void 0;
function ym(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Dt.parseRequestArgs = ym;
function Bm(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Dt.parseRawRequestArgs = Bm;
function Cm(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Dt.parseBatchRequestArgs = Cm;
function bm(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Dt.parseRequestExtendedArgs = bm;
function Qm(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Dt.parseRawRequestExtendedArgs = Qm;
function xm(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Dt.parseBatchRequestsExtendedArgs = xm;
var ns = {}, vm = be && be.__extends || function() {
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
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.ClientError = void 0;
var Fm = (
  /** @class */
  function(e) {
    vm(t, e);
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
ns.ClientError = Fm;
var xr = {}, Zc;
function Dm() {
  if (Zc)
    return xr;
  Zc = 1;
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
  }, n = be && be.__generator || function(M, k) {
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
  Object.defineProperty(xr, "__esModule", { value: !0 }), xr.GraphQLWebSocketClient = void 0;
  var r = ns, s = Nd(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", h = "subscribe", I = "next", g = "error", b = "complete", F = (
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
  ), v = (
    /** @class */
    function() {
      function M(k, O) {
        var P = this, W = O.onInit, U = O.onAcknowledged, H = O.onPing, z = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = k, k.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, A, l, m;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = k).send, l = N, W ? [4, W()] : [3, 2];
                case 1:
                  return m = f.sent(), [3, 3];
                case 2:
                  m = null, f.label = 3;
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
                  return k.send(J(E).text);
                }) : k.send(J(null).text);
                return;
              }
              case d: {
                z && z(a.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || a.id === void 0 || a.id === null || !P.socketState.subscriptions[a.id])
              return;
            var A = P.socketState.subscriptions[a.id], l = A.query, m = A.variables, f = A.subscriber;
            switch (a.type) {
              case I: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: m }));
                return;
              }
              case g: {
                f.error && f.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: m }));
                return;
              }
              case b: {
                f.complete && f.complete(), delete P.socketState.subscriptions[a.id];
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
  xr.GraphQLWebSocketClient = v;
  function C(M, k) {
    k === void 0 && (k = function(P) {
      return P;
    });
    var O = F.parse(M, k);
    return O;
  }
  function N(M) {
    return new F(i, M);
  }
  function S(M) {
    return new F(c, M, void 0);
  }
  function J(M) {
    return new F(d, M, void 0);
  }
  function T(M, k) {
    return new F(h, k, M);
  }
  function j(M) {
    return new F(b, void 0, M);
  }
  return xr;
}
var Yc;
function Nd() {
  return Yc || (Yc = 1, function(e) {
    var t = be && be.__assign || function() {
      return t = Object.assign || function(f) {
        for (var E, y = 1, p = arguments.length; y < p; y++) {
          E = arguments[y];
          for (var u in E)
            Object.prototype.hasOwnProperty.call(E, u) && (f[u] = E[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = be && be.__createBinding || (Object.create ? function(f, E, y, p) {
      p === void 0 && (p = y), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return E[y];
      } });
    } : function(f, E, y, p) {
      p === void 0 && (p = y), f[p] = E[y];
    }), r = be && be.__setModuleDefault || (Object.create ? function(f, E) {
      Object.defineProperty(f, "default", { enumerable: !0, value: E });
    } : function(f, E) {
      f.default = E;
    }), s = be && be.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var E = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(E, f, y);
      return r(E, f), E;
    }, i = be && be.__awaiter || function(f, E, y, p) {
      function u(w) {
        return w instanceof y ? w : new y(function(Y) {
          Y(w);
        });
      }
      return new (y || (y = Promise))(function(w, Y) {
        function V(te) {
          try {
            $(p.next(te));
          } catch (ne) {
            Y(ne);
          }
        }
        function q(te) {
          try {
            $(p.throw(te));
          } catch (ne) {
            Y(ne);
          }
        }
        function $(te) {
          te.done ? w(te.value) : u(te.value).then(V, q);
        }
        $((p = p.apply(f, E || [])).next());
      });
    }, o = be && be.__generator || function(f, E) {
      var y = { label: 0, sent: function() {
        if (w[0] & 1)
          throw w[1];
        return w[1];
      }, trys: [], ops: [] }, p, u, w, Y;
      return Y = { next: V(0), throw: V(1), return: V(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function V($) {
        return function(te) {
          return q([$, te]);
        };
      }
      function q($) {
        if (p)
          throw new TypeError("Generator is already executing.");
        for (; y; )
          try {
            if (p = 1, u && (w = $[0] & 2 ? u.return : $[0] ? u.throw || ((w = u.return) && w.call(u), 0) : u.next) && !(w = w.call(u, $[1])).done)
              return w;
            switch (u = 0, w && ($ = [$[0] & 2, w.value]), $[0]) {
              case 0:
              case 1:
                w = $;
                break;
              case 4:
                return y.label++, { value: $[1], done: !1 };
              case 5:
                y.label++, u = $[1], $ = [0];
                continue;
              case 7:
                $ = y.ops.pop(), y.trys.pop();
                continue;
              default:
                if (w = y.trys, !(w = w.length > 0 && w[w.length - 1]) && ($[0] === 6 || $[0] === 2)) {
                  y = 0;
                  continue;
                }
                if ($[0] === 3 && (!w || $[1] > w[0] && $[1] < w[3])) {
                  y.label = $[1];
                  break;
                }
                if ($[0] === 6 && y.label < w[1]) {
                  y.label = w[1], w = $;
                  break;
                }
                if (w && y.label < w[2]) {
                  y.label = w[2], y.ops.push($);
                  break;
                }
                w[2] && y.ops.pop(), y.trys.pop();
                continue;
            }
            $ = E.call(f, y);
          } catch (te) {
            $ = [6, te], u = 0;
          } finally {
            p = w = 0;
          }
        if ($[0] & 5)
          throw $[1];
        return { value: $[0] ? $[1] : void 0, done: !0 };
      }
    }, c = be && be.__rest || function(f, E) {
      var y = {};
      for (var p in f)
        Object.prototype.hasOwnProperty.call(f, p) && E.indexOf(p) < 0 && (y[p] = f[p]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, p = Object.getOwnPropertySymbols(f); u < p.length; u++)
          E.indexOf(p[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, p[u]) && (y[p[u]] = f[p[u]]);
      return y;
    }, d = be && be.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(Ep), I = h, g = em, b = dm, F = d(Ea), v = ts, C = Dt, N = ns;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return N.ClientError;
    } });
    var S = function(f) {
      var E = {};
      return f && (typeof Headers < "u" && f instanceof Headers || I && I.Headers && f instanceof I.Headers ? E = l(f) : Array.isArray(f) ? f.forEach(function(y) {
        var p = y[0], u = y[1];
        E[p] = u;
      }) : E = f), E;
    }, J = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, T = function(f) {
      var E = f.query, y = f.variables, p = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(E)) {
        var w = ["query=" + encodeURIComponent(J(E))];
        return y && w.push("variables=" + encodeURIComponent(u.stringify(y))), p && w.push("operationName=" + encodeURIComponent(p)), w.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = E.reduce(function(V, q, $) {
        return V.push({
          query: J(q),
          variables: y ? u.stringify(y[$]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Y));
    }, j = function(f) {
      var E = f.url, y = f.query, p = f.variables, u = f.operationName, w = f.headers, Y = f.fetch, V = f.fetchOptions, q = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var $, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return $ = F.default(y, p, u, V.jsonSerializer), te = t({ method: "POST", headers: t(t({}, typeof $ == "string" ? { "Content-Type": "application/json" } : {}), w), body: $ }, V), q ? [4, Promise.resolve(q(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, Y(E, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, M = function(f) {
      var E = f.url, y = f.query, p = f.variables, u = f.operationName, w = f.headers, Y = f.fetch, V = f.fetchOptions, q = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var $, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return $ = T({
                query: y,
                variables: p,
                operationName: u,
                jsonSerializer: V.jsonSerializer
              }), te = t({ method: "GET", headers: w }, V), q ? [4, Promise.resolve(q(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, Y(E + "?" + $, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, k = (
      /** @class */
      function() {
        function f(E, y) {
          y === void 0 && (y = {}), this.url = E, this.options = y;
        }
        return f.prototype.rawRequest = function(E, y, p) {
          return i(this, void 0, void 0, function() {
            var u, w, Y, V, q, $, te, ne, Se, fe, oe, Fe;
            return o(this, function(de) {
              return u = C.parseRawRequestArgs(E, y, p), w = this.options, Y = w.headers, V = w.fetch, q = V === void 0 ? h.default : V, $ = w.method, te = $ === void 0 ? "POST" : $, ne = w.requestMiddleware, Se = w.responseMiddleware, fe = c(w, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (fe.signal = u.signal), Fe = B(u.query).operationName, [2, O({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, S(a(Y))), S(u.requestHeaders)),
                operationName: Fe,
                fetch: q,
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
        }, f.prototype.request = function(E) {
          for (var y = [], p = 1; p < arguments.length; p++)
            y[p - 1] = arguments[p];
          var u = y[0], w = y[1], Y = C.parseRequestArgs(E, u, w), V = this.options, q = V.headers, $ = V.fetch, te = $ === void 0 ? h.default : $, ne = V.method, Se = ne === void 0 ? "POST" : ne, fe = V.requestMiddleware, oe = V.responseMiddleware, Fe = c(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), de = this.url;
          Y.signal !== void 0 && (Fe.signal = Y.signal);
          var ge = B(Y.document), Zt = ge.query, De = ge.operationName;
          return O({
            url: de,
            query: Zt,
            variables: Y.variables,
            headers: t(t({}, S(a(q))), S(Y.requestHeaders)),
            operationName: De,
            fetch: te,
            method: Se,
            fetchOptions: Fe,
            middleware: fe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(E, y) {
          var p = C.parseBatchRequestArgs(E, y), u = this.options, w = u.headers, Y = u.fetch, V = Y === void 0 ? h.default : Y, q = u.method, $ = q === void 0 ? "POST" : q, te = u.requestMiddleware, ne = u.responseMiddleware, Se = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          p.signal !== void 0 && (Se.signal = p.signal);
          var oe = p.documents.map(function(de) {
            var ge = de.document;
            return B(ge).query;
          }), Fe = p.documents.map(function(de) {
            var ge = de.variables;
            return ge;
          });
          return O({
            url: fe,
            query: oe,
            variables: Fe,
            headers: t(t({}, S(a(w))), S(p.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: $,
            fetchOptions: Se,
            middleware: te
          }).then(function(de) {
            return ne && ne(de), de.data;
          }).catch(function(de) {
            throw ne && ne(de), de;
          });
        }, f.prototype.setHeaders = function(E) {
          return this.options.headers = E, this;
        }, f.prototype.setHeader = function(E, y) {
          var p, u = this.options.headers;
          return u ? u[E] = y : this.options.headers = (p = {}, p[E] = y, p), this;
        }, f.prototype.setEndpoint = function(E) {
          return this.url = E, this;
        }, f;
      }()
    );
    e.GraphQLClient = k;
    function O(f) {
      var E = f.url, y = f.query, p = f.variables, u = f.headers, w = f.operationName, Y = f.fetch, V = f.method, q = V === void 0 ? "POST" : V, $ = f.fetchOptions, te = f.middleware;
      return i(this, void 0, void 0, function() {
        var ne, Se, fe, oe, Fe, de, ge, Zt, De, ye, Cr;
        return o(this, function(_e) {
          switch (_e.label) {
            case 0:
              return ne = q.toUpperCase() === "POST" ? j : M, Se = Array.isArray(y), [4, ne({
                url: E,
                query: y,
                variables: p,
                operationName: w,
                headers: u,
                fetch: Y,
                fetchOptions: $,
                middleware: te
              })];
            case 1:
              return fe = _e.sent(), [4, H(fe, $.jsonSerializer)];
            case 2:
              if (oe = _e.sent(), Fe = Se && Array.isArray(oe) ? !oe.some(function(Le) {
                var os = Le.data;
                return !os;
              }) : !!oe.data, de = !oe.errors || $.errorPolicy === "all" || $.errorPolicy === "ignore", fe.ok && de && Fe)
                return ge = fe.headers, Zt = fe.status, oe.errors, De = c(oe, ["errors"]), ye = $.errorPolicy === "ignore" ? De : oe, [2, t(t({}, Se ? { data: ye } : ye), { headers: ge, status: Zt })];
              throw Cr = typeof oe == "string" ? { error: oe } : oe, new N.ClientError(t(t({}, Cr), { status: fe.status, headers: fe.headers }), { query: y, variables: p });
          }
        });
      });
    }
    function P(f, E, y, p) {
      return i(this, void 0, void 0, function() {
        var u, w;
        return o(this, function(Y) {
          return u = C.parseRawRequestExtendedArgs(f, E, y, p), w = new k(u.url), [2, w.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function W(f, E) {
      for (var y = [], p = 2; p < arguments.length; p++)
        y[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var u, w, Y, V;
        return o(this, function(q) {
          return u = y[0], w = y[1], Y = C.parseRequestExtendedArgs(f, E, u, w), V = new k(Y.url), [2, V.request(t({}, Y))];
        });
      });
    }
    e.request = W;
    function U(f, E, y) {
      return i(this, void 0, void 0, function() {
        var p, u;
        return o(this, function(w) {
          return p = C.parseBatchRequestsExtendedArgs(f, E, y), u = new k(p.url), [2, u.batchRequests(t({}, p))];
        });
      });
    }
    e.batchRequests = U, e.default = W;
    function H(f, E) {
      return E === void 0 && (E = v.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, p, u;
        return o(this, function(w) {
          switch (w.label) {
            case 0:
              return f.headers.forEach(function(Y, V) {
                V.toLowerCase() === "content-type" && (y = Y);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (p = E).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(p, [w.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function z(f) {
      var E, y = void 0, p = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return p.length === 1 && (y = (E = p[0].name) === null || E === void 0 ? void 0 : E.value), y;
    }
    function B(f) {
      if (typeof f == "string") {
        var E = void 0;
        try {
          var y = g.parse(f);
          E = z(y);
        } catch {
        }
        return { query: f, operationName: E };
      }
      var p = z(f);
      return { query: b.print(f), operationName: p };
    }
    e.resolveRequestDocument = B;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var E = [], y = 1; y < arguments.length; y++)
        E[y - 1] = arguments[y];
      return f.reduce(function(p, u, w) {
        return "" + p + u + (w in E ? E[w] : "");
      }, "");
    }
    e.gql = A;
    function l(f) {
      var E = {};
      return f.forEach(function(y, p) {
        E[p] = y;
      }), E;
    }
    var m = Dm();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(Xi)), Xi;
}
var Rm = Nd();
function Nm(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Sd(e) {
  return function t(n) {
    return arguments.length === 0 || Nm(n) ? t : e.apply(this, arguments);
  };
}
var Sm = /* @__PURE__ */ Sd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function _m(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function _d(e, t, n) {
  if (n || (n = new Mm()), km(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? _d(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Sm(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return _m(e);
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
function km(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Mm = /* @__PURE__ */ function() {
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
}(), Om = /* @__PURE__ */ Sd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : _d(t, !0);
});
const Jr = Om;
var Vs = function() {
  return Vs = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Vs.apply(this, arguments);
};
var Ds = /* @__PURE__ */ new Map(), Qo = /* @__PURE__ */ new Map(), kd = !0, Xs = !1;
function Md(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Lm(e) {
  return Md(e.source.body.substring(e.start, e.end));
}
function Tm(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Lm(r.loc), o = Qo.get(s);
      o && !o.has(i) ? kd && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Qo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Vs(Vs({}, e), { definitions: n });
}
function Pm(e) {
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
function Um(e) {
  var t = Md(e);
  if (!Ds.has(t)) {
    var n = Qd(e, {
      experimentalFragmentVariables: Xs,
      allowLegacyFragmentVariables: Xs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ds.set(t, Pm(Tm(n)));
  }
  return Ds.get(t);
}
function hr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), Um(r);
}
function Gm() {
  Ds.clear(), Qo.clear();
}
function Hm() {
  kd = !1;
}
function Jm() {
  Xs = !0;
}
function Zm() {
  Xs = !1;
}
var vr = {
  gql: hr,
  resetCaches: Gm,
  disableFragmentWarnings: Hm,
  enableExperimentalFragmentVariables: Jm,
  disableExperimentalFragmentVariables: Zm
};
(function(e) {
  e.gql = vr.gql, e.resetCaches = vr.resetCaches, e.disableFragmentWarnings = vr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = vr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = vr.disableExperimentalFragmentVariables;
})(hr || (hr = {}));
hr.default = hr;
const ce = hr;
function Ym(e) {
  return ke(yn(e, "utf-8"));
}
function Vm(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function Od(e) {
  return ke(e);
}
let le;
const Ld = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Ld.decode();
let Nr = null;
function Td() {
  return (Nr === null || Nr.byteLength === 0) && (Nr = new Uint8Array(le.memory.buffer)), Nr;
}
function Xm(e, t) {
  return e = e >>> 0, Ld.decode(Td().subarray(e, e + t));
}
function Pd(e) {
  const t = le.ret(e);
  return Tt.__wrap(t);
}
function jm(e, t) {
  const n = le.retd(e, t);
  return Tt.__wrap(n);
}
function Vc(e, t, n, r) {
  const s = le.call(e, t, n, r);
  return Tt.__wrap(s);
}
function $m(e, t, n) {
  const r = le.tr(e, t, n);
  return Tt.__wrap(r);
}
function Xc(e, t, n) {
  const r = le.addi(e, t, n);
  return Tt.__wrap(r);
}
function Wm(e, t, n) {
  const r = le.muli(e, t, n);
  return Tt.__wrap(r);
}
function Sr(e, t, n) {
  const r = le.lw(e, t, n);
  return Tt.__wrap(r);
}
function qm(e, t, n) {
  const r = le.gtf(e, t, n);
  return Tt.__wrap(r);
}
function fs(e, t) {
  const n = le.movi(e, t);
  return Tt.__wrap(n);
}
let _r = null;
function jc() {
  return (_r === null || _r.byteLength === 0) && (_r = new Int32Array(le.memory.buffer)), _r;
}
function Km(e, t) {
  return e = e >>> 0, Td().subarray(e / 1, e / 1 + t);
}
const zm = Object.freeze({
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
class Tt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Tt.prototype);
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
      var t = jc()[s / 4 + 0], n = jc()[s / 4 + 1], r = Km(t, n).slice();
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
class Me {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Me.prototype);
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
    return n === 0 ? void 0 : Me.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = le.regid_bal();
    return Me.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = le.regid_cgas();
    return Me.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = le.regid_err();
    return Me.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = le.regid_flag();
    return Me.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = le.regid_fp();
    return Me.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = le.regid_ggas();
    return Me.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = le.regid_hp();
    return Me.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = le.regid_is();
    return Me.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = le.regid_of();
    return Me.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = le.regid_one();
    return Me.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = le.regid_pc();
    return Me.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = le.regid_ret();
    return Me.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = le.regid_retl();
    return Me.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = le.regid_sp();
    return Me.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = le.regid_spp();
    return Me.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = le.regid_writable();
    return Me.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = le.regid_zero();
    return Me.__wrap(t);
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
async function ew(e, t) {
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
function tw() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Xm(t, n));
  }, e;
}
function nw(e, t) {
  return le = e.exports, Ud.__wbindgen_wasm_module = t, _r = null, Nr = null, le;
}
async function Ud(e) {
  if (le !== void 0)
    return le;
  const t = tw(), { instance: n, module: r } = await ew(await e, t);
  return nw(n, r);
}
function rw(e, t, n, r) {
  function s(g, b, F) {
    var v = F ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = F ? WebAssembly.compileStreaming : WebAssembly.compile;
    return b ? v(g, b) : C(g);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var c = globalThis.atob(n), d = c.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var h = 0; h < d; h++)
      i[h] = c.charCodeAt(h);
  }
  if (e) {
    var I = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(I, r) : I;
  } else
    return s(i, r, !1);
}
function sw(e) {
  return rw(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function Ia() {
  return await Ud(sw());
}
Ia();
function $c(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function iw(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Gd(e, ...t) {
  if (!iw(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function ow(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  $c(e.outputLen), $c(e.blockLen);
}
function js(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function aw(e, t) {
  Gd(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const $i = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Hd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Wi = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Xt = (e, t) => e << 32 - t | e >>> t, cw = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!cw)
  throw new Error("Non little-endian hardware is not supported");
function Aw(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ya(e) {
  if (typeof e == "string" && (e = Aw(e)), !Hd(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function uw(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!Hd(s))
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
class Jd {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function dw(e) {
  const t = (r) => e().update(ya(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function lw(e = 32) {
  if ($i && typeof $i.getRandomValues == "function")
    return $i.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function hw(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, c, r);
}
class fw extends Jd {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Wi(this.buffer);
  }
  update(t) {
    js(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = ya(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Wi(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    js(this), aw(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    hw(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Wi(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, I = this.get();
    if (h > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < h; g++)
      c.setUint32(4 * g, I[g], i);
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
const gw = (e, t, n) => e & t ^ ~e & n, pw = (e, t, n) => e & t ^ e & n ^ t & n, mw = /* @__PURE__ */ new Uint32Array([
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
class ww extends fw {
  constructor() {
    super(64, 32, 8, !1), this.A = ln[0] | 0, this.B = ln[1] | 0, this.C = ln[2] | 0, this.D = ln[3] | 0, this.E = ln[4] | 0, this.F = ln[5] | 0, this.G = ln[6] | 0, this.H = ln[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      hn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const b = hn[g - 15], F = hn[g - 2], v = Xt(b, 7) ^ Xt(b, 18) ^ b >>> 3, C = Xt(F, 17) ^ Xt(F, 19) ^ F >>> 10;
      hn[g] = C + hn[g - 7] + v + hn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: h, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const b = Xt(c, 6) ^ Xt(c, 11) ^ Xt(c, 25), F = I + b + gw(c, d, h) + mw[g] + hn[g] | 0, C = (Xt(r, 2) ^ Xt(r, 13) ^ Xt(r, 22)) + pw(r, s, i) | 0;
      I = h, h = d, d = c, c = o + F | 0, o = i, i = s, s = r, r = F + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, h, I);
  }
  roundClean() {
    hn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Ew = /* @__PURE__ */ dw(() => new ww());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const wt = BigInt(0), Pe = BigInt(1), Sn = BigInt(2), Iw = BigInt(3), xo = BigInt(4), Wc = BigInt(5), qc = BigInt(8);
BigInt(9);
BigInt(16);
function xt(e, t) {
  const n = e % t;
  return n >= wt ? n : t + n;
}
function yw(e, t, n) {
  if (n <= wt || t < wt)
    throw new Error("Expected power/modulo > 0");
  if (n === Pe)
    return wt;
  let r = Pe;
  for (; t > wt; )
    t & Pe && (r = r * e % n), e = e * e % n, t >>= Pe;
  return r;
}
function _t(e, t, n) {
  let r = e;
  for (; t-- > wt; )
    r *= r, r %= n;
  return r;
}
function vo(e, t) {
  if (e === wt || t <= wt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = xt(e, t), r = t, s = wt, i = Pe;
  for (; n !== wt; ) {
    const c = r / n, d = r % n, h = s - i * c;
    r = n, n = d, s = i, i = h;
  }
  if (r !== Pe)
    throw new Error("invert: does not exist");
  return xt(s, t);
}
function Bw(e) {
  const t = (e - Pe) / Sn;
  let n, r, s;
  for (n = e - Pe, r = 0; n % Sn === wt; n /= Sn, r++)
    ;
  for (s = Sn; s < e && yw(s, t, e) !== e - Pe; s++)
    ;
  if (r === 1) {
    const o = (e + Pe) / xo;
    return function(d, h) {
      const I = d.pow(h, o);
      if (!d.eql(d.sqr(I), h))
        throw new Error("Cannot find square root");
      return I;
    };
  }
  const i = (n + Pe) / Sn;
  return function(c, d) {
    if (c.pow(d, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let h = r, I = c.pow(c.mul(c.ONE, s), n), g = c.pow(d, i), b = c.pow(d, n);
    for (; !c.eql(b, c.ONE); ) {
      if (c.eql(b, c.ZERO))
        return c.ZERO;
      let F = 1;
      for (let C = c.sqr(b); F < h && !c.eql(C, c.ONE); F++)
        C = c.sqr(C);
      const v = c.pow(I, Pe << BigInt(h - F - 1));
      I = c.sqr(v), g = c.mul(g, v), b = c.mul(b, I), h = F;
    }
    return g;
  };
}
function Cw(e) {
  if (e % xo === Iw) {
    const t = (e + Pe) / xo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % qc === Wc) {
    const t = (e - Wc) / qc;
    return function(r, s) {
      const i = r.mul(s, Sn), o = r.pow(i, t), c = r.mul(s, o), d = r.mul(r.mul(c, Sn), o), h = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return Bw(e);
}
const bw = [
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
function Qw(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = bw.reduce((r, s) => (r[s] = "function", r), t);
  return zr(e, n);
}
function xw(e, t, n) {
  if (n < wt)
    throw new Error("Expected power > 0");
  if (n === wt)
    return e.ONE;
  if (n === Pe)
    return t;
  let r = e.ONE, s = t;
  for (; n > wt; )
    n & Pe && (r = e.mul(r, s)), s = e.sqr(s), n >>= Pe;
  return r;
}
function vw(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function Zd(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Fw(e, t, n = !1, r = {}) {
  if (e <= wt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Zd(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Cw(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: ma(s),
    ZERO: wt,
    ONE: Pe,
    create: (d) => xt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return wt <= d && d < e;
    },
    is0: (d) => d === wt,
    isOdd: (d) => (d & Pe) === Pe,
    neg: (d) => xt(-d, e),
    eql: (d, h) => d === h,
    sqr: (d) => xt(d * d, e),
    add: (d, h) => xt(d + h, e),
    sub: (d, h) => xt(d - h, e),
    mul: (d, h) => xt(d * h, e),
    pow: (d, h) => xw(c, d, h),
    div: (d, h) => xt(d * vo(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, h) => d + h,
    subN: (d, h) => d - h,
    mulN: (d, h) => d * h,
    inv: (d) => vo(d, e),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => vw(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, h, I) => I ? h : d,
    toBytes: (d) => n ? pa(d, i) : lr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? ga(d) : Mn(d);
    }
  });
  return Object.freeze(c);
}
function Yd(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Vd(e) {
  const t = Yd(e);
  return t + Math.ceil(t / 2);
}
function Dw(e, t, n = !1) {
  const r = e.length, s = Yd(t), i = Vd(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Mn(e) : ga(e), c = xt(o, t - Pe) + Pe;
  return n ? pa(c, s) : lr(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Rw = BigInt(0), qi = BigInt(1);
function Nw(e, t) {
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
      for (; i > Rw; )
        i & qi && (o = o.add(c)), c = c.double(), i >>= qi;
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
      let h = s, I = h;
      for (let g = 0; g < o; g++) {
        I = h, d.push(I);
        for (let b = 1; b < c; b++)
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
      const { windows: c, windowSize: d } = r(s);
      let h = e.ZERO, I = e.BASE;
      const g = BigInt(2 ** s - 1), b = 2 ** s, F = BigInt(s);
      for (let v = 0; v < c; v++) {
        const C = v * d;
        let N = Number(o & g);
        o >>= F, N > d && (N -= b, o += qi);
        const S = C, J = C + Math.abs(N) - 1, T = v % 2 !== 0, j = N < 0;
        N === 0 ? I = I.add(n(T, i[S])) : h = h.add(n(j, i[J]));
      }
      return { p: h, f: I };
    },
    wNAFCached(s, i, o, c) {
      const d = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, d), d !== 1 && i.set(s, c(h))), this.wNAF(d, h, o);
    }
  };
}
function Xd(e) {
  return Qw(e.Fp), zr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Zd(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Sw(e) {
  const t = Xd(e);
  zr(t, {
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
const { bytesToNumberBE: _w, hexToBytes: kw } = wp, kn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = kn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: _w(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = kn, n = typeof e == "string" ? kw(e) : e;
    if (!qt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = kn._parseInt(n.subarray(2)), { d: o, l: c } = kn._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const I = h.toString(16);
      return I.length & 1 ? `0${I}` : I;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${c}${r}`;
  }
}, rn = BigInt(0), kt = BigInt(1);
BigInt(2);
const Kc = BigInt(3);
BigInt(4);
function Mw(e) {
  const t = Sw(e), { Fp: n } = t, r = t.toBytes || ((v, C, N) => {
    const S = C.toAffine();
    return Gr(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = t.fromBytes || ((v) => {
    const C = v.subarray(1), N = n.fromBytes(C.subarray(0, n.BYTES)), S = n.fromBytes(C.subarray(n.BYTES, 2 * n.BYTES));
    return { x: N, y: S };
  });
  function i(v) {
    const { a: C, b: N } = t, S = n.sqr(v), J = n.mul(S, v);
    return n.add(n.add(J, n.mul(v, C)), N);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(v) {
    return typeof v == "bigint" && rn < v && v < t.n;
  }
  function c(v) {
    if (!o(v))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(v) {
    const { allowedPrivateKeyLengths: C, nByteLength: N, wrapPrivateKey: S, n: J } = t;
    if (C && typeof v != "bigint") {
      if (qt(v) && (v = ur(v)), typeof v != "string" || !C.includes(v.length))
        throw new Error("Invalid key");
      v = v.padStart(N * 2, "0");
    }
    let T;
    try {
      T = typeof v == "bigint" ? v : Mn(Gt("private key", v, N));
    } catch {
      throw new Error(`private key must be ${N} bytes, hex or bigint, not ${typeof v}`);
    }
    return S && (T = xt(T, J)), c(T), T;
  }
  const h = /* @__PURE__ */ new Map();
  function I(v) {
    if (!(v instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(C, N, S) {
      if (this.px = C, this.py = N, this.pz = S, C == null || !n.isValid(C))
        throw new Error("x required");
      if (N == null || !n.isValid(N))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(C) {
      const { x: N, y: S } = C || {};
      if (!C || !n.isValid(N) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (C instanceof g)
        throw new Error("projective point not allowed");
      const J = (T) => n.eql(T, n.ZERO);
      return J(N) && J(S) ? g.ZERO : new g(N, S, n.ONE);
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
      const N = n.invertBatch(C.map((S) => S.pz));
      return C.map((S, J) => S.toAffine(N[J])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const N = g.fromAffine(s(Gt("pointHex", C)));
      return N.assertValidity(), N;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return g.BASE.multiply(d(C));
    }
    // "Private method", don't use it directly
    _setWindowSize(C) {
      this._WINDOW_SIZE = C, h.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: C, y: N } = this.toAffine();
      if (!n.isValid(C) || !n.isValid(N))
        throw new Error("bad point: x or y not FE");
      const S = n.sqr(N), J = i(C);
      if (!n.eql(S, J))
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
      I(C);
      const { px: N, py: S, pz: J } = this, { px: T, py: j, pz: M } = C, k = n.eql(n.mul(N, M), n.mul(T, J)), O = n.eql(n.mul(S, M), n.mul(j, J));
      return k && O;
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
      const { a: C, b: N } = t, S = n.mul(N, Kc), { px: J, py: T, pz: j } = this;
      let M = n.ZERO, k = n.ZERO, O = n.ZERO, P = n.mul(J, J), W = n.mul(T, T), U = n.mul(j, j), H = n.mul(J, T);
      return H = n.add(H, H), O = n.mul(J, j), O = n.add(O, O), M = n.mul(C, O), k = n.mul(S, U), k = n.add(M, k), M = n.sub(W, k), k = n.add(W, k), k = n.mul(M, k), M = n.mul(H, M), O = n.mul(S, O), U = n.mul(C, U), H = n.sub(P, U), H = n.mul(C, H), H = n.add(H, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, U), P = n.mul(P, H), k = n.add(k, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, H), M = n.sub(M, P), O = n.mul(U, W), O = n.add(O, O), O = n.add(O, O), new g(M, k, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      I(C);
      const { px: N, py: S, pz: J } = this, { px: T, py: j, pz: M } = C;
      let k = n.ZERO, O = n.ZERO, P = n.ZERO;
      const W = t.a, U = n.mul(t.b, Kc);
      let H = n.mul(N, T), z = n.mul(S, j), B = n.mul(J, M), a = n.add(N, S), A = n.add(T, j);
      a = n.mul(a, A), A = n.add(H, z), a = n.sub(a, A), A = n.add(N, J);
      let l = n.add(T, M);
      return A = n.mul(A, l), l = n.add(H, B), A = n.sub(A, l), l = n.add(S, J), k = n.add(j, M), l = n.mul(l, k), k = n.add(z, B), l = n.sub(l, k), P = n.mul(W, A), k = n.mul(U, B), P = n.add(k, P), k = n.sub(z, P), P = n.add(z, P), O = n.mul(k, P), z = n.add(H, H), z = n.add(z, H), B = n.mul(W, B), A = n.mul(U, A), z = n.add(z, B), B = n.sub(H, B), B = n.mul(W, B), A = n.add(A, B), H = n.mul(z, A), O = n.add(O, H), H = n.mul(l, A), k = n.mul(a, k), k = n.sub(k, H), H = n.mul(a, z), P = n.mul(l, P), P = n.add(P, H), new g(k, O, P);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(C) {
      return F.wNAFCached(this, h, C, (N) => {
        const S = n.invertBatch(N.map((J) => J.pz));
        return N.map((J, T) => J.toAffine(S[T])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const N = g.ZERO;
      if (C === rn)
        return N;
      if (c(C), C === kt)
        return this;
      const { endo: S } = t;
      if (!S)
        return F.unsafeLadder(this, C);
      let { k1neg: J, k1: T, k2neg: j, k2: M } = S.splitScalar(C), k = N, O = N, P = this;
      for (; T > rn || M > rn; )
        T & kt && (k = k.add(P)), M & kt && (O = O.add(P)), P = P.double(), T >>= kt, M >>= kt;
      return J && (k = k.negate()), j && (O = O.negate()), O = new g(n.mul(O.px, S.beta), O.py, O.pz), k.add(O);
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
      let N = C, S, J;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: M, k2neg: k, k2: O } = T.splitScalar(N);
        let { p: P, f: W } = this.wNAF(M), { p: U, f: H } = this.wNAF(O);
        P = F.constTimeNegate(j, P), U = F.constTimeNegate(k, U), U = new g(n.mul(U.px, T.beta), U.py, U.pz), S = P.add(U), J = W.add(H);
      } else {
        const { p: j, f: M } = this.wNAF(N);
        S = j, J = M;
      }
      return g.normalizeZ([S, J])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, N, S) {
      const J = g.BASE, T = (M, k) => k === rn || k === kt || !M.equals(J) ? M.multiplyUnsafe(k) : M.multiply(k), j = T(this, N).add(T(C, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: N, py: S, pz: J } = this, T = this.is0();
      C == null && (C = T ? n.ONE : n.inv(J));
      const j = n.mul(N, C), M = n.mul(S, C), k = n.mul(J, C);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(k, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: M };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: N } = t;
      if (C === kt)
        return !0;
      if (N)
        return N(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: N } = t;
      return C === kt ? this : N ? N(g, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(g, this, C);
    }
    toHex(C = !0) {
      return ur(this.toRawBytes(C));
    }
  }
  g.BASE = new g(t.Gx, t.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const b = t.nBitLength, F = Nw(g, t.endo ? Math.ceil(b / 2) : b);
  return {
    CURVE: t,
    ProjectivePoint: g,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Ow(e) {
  const t = Xd(e);
  return zr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Lw(e) {
  const t = Ow(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return rn < A && A < n.ORDER;
  }
  function c(A) {
    return xt(A, r);
  }
  function d(A) {
    return vo(A, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: I, weierstrassEquation: g, isWithinCurveOrder: b } = Mw({
    ...t,
    toBytes(A, l, m) {
      const f = l.toAffine(), E = n.toBytes(f.x), y = Gr;
      return m ? y(Uint8Array.from([l.hasEvenY() ? 2 : 3]), E) : y(Uint8Array.from([4]), E, n.toBytes(f.y));
    },
    fromBytes(A) {
      const l = A.length, m = A[0], f = A.subarray(1);
      if (l === s && (m === 2 || m === 3)) {
        const E = Mn(f);
        if (!o(E))
          throw new Error("Point is not on curve");
        const y = g(E);
        let p = n.sqrt(y);
        const u = (p & kt) === kt;
        return (m & 1) === 1 !== u && (p = n.neg(p)), { x: E, y: p };
      } else if (l === i && m === 4) {
        const E = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: E, y };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), F = (A) => ur(lr(A, t.nByteLength));
  function v(A) {
    const l = r >> kt;
    return A > l;
  }
  function C(A) {
    return v(A) ? c(-A) : A;
  }
  const N = (A, l, m) => Mn(A.slice(l, m));
  class S {
    constructor(l, m, f) {
      this.r = l, this.s = m, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const m = t.nByteLength;
      return l = Gt("compactSignature", l, m * 2), new S(N(l, 0, m), N(l, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: m, s: f } = kn.toSig(Gt("DER", l));
      return new S(m, f);
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
      const { r: m, s: f, recovery: E } = this, y = O(Gt("msgHash", l));
      if (E == null || ![0, 1, 2, 3].includes(E))
        throw new Error("recovery id invalid");
      const p = E === 2 || E === 3 ? m + t.n : m;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = E & 1 ? "03" : "02", w = h.fromHex(u + F(p)), Y = d(p), V = c(-y * Y), q = c(f * Y), $ = h.BASE.multiplyAndAddUnsafe(w, V, q);
      if (!$)
        throw new Error("point at infinify");
      return $.assertValidity(), $;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return v(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return dr(this.toDERHex());
    }
    toDERHex() {
      return kn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return dr(this.toCompactHex());
    }
    toCompactHex() {
      return F(this.r) + F(this.s);
    }
  }
  const J = {
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
      const A = Vd(t.n);
      return Dw(t.randomBytes(A), t.n);
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
    const l = qt(A), m = typeof A == "string", f = (l || m) && A.length;
    return l ? f === s || f === i : m ? f === 2 * s || f === 2 * i : A instanceof h;
  }
  function M(A, l, m = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(I(A)).toRawBytes(m);
  }
  const k = t.bits2int || function(A) {
    const l = Mn(A), m = A.length * 8 - t.nBitLength;
    return m > 0 ? l >> BigInt(m) : l;
  }, O = t.bits2int_modN || function(A) {
    return c(k(A));
  }, P = ma(t.nBitLength);
  function W(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(rn <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return lr(A, t.nByteLength);
  }
  function U(A, l, m = H) {
    if (["recovered", "canonical"].some((ne) => ne in m))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: E } = t;
    let { lowS: y, prehash: p, extraEntropy: u } = m;
    y == null && (y = !0), A = Gt("msgHash", A), p && (A = Gt("prehashed msgHash", f(A)));
    const w = O(A), Y = I(l), V = [W(Y), W(w)];
    if (u != null) {
      const ne = u === !0 ? E(n.BYTES) : u;
      V.push(Gt("extraEntropy", ne));
    }
    const q = Gr(...V), $ = w;
    function te(ne) {
      const Se = k(ne);
      if (!b(Se))
        return;
      const fe = d(Se), oe = h.BASE.multiply(Se).toAffine(), Fe = c(oe.x);
      if (Fe === rn)
        return;
      const de = c(fe * c($ + Fe * Y));
      if (de === rn)
        return;
      let ge = (oe.x === Fe ? 0 : 2) | Number(oe.y & kt), Zt = de;
      return y && v(de) && (Zt = C(de), ge ^= 1), new S(Fe, Zt, ge);
    }
    return { seed: q, k2sig: te };
  }
  const H = { lowS: t.lowS, prehash: !1 }, z = { lowS: t.lowS, prehash: !1 };
  function B(A, l, m = H) {
    const { seed: f, k2sig: E } = U(A, l, m), y = t;
    return fd(y.hash.outputLen, y.nByteLength, y.hmac)(f, E);
  }
  h.BASE._setWindowSize(8);
  function a(A, l, m, f = z) {
    var oe;
    const E = A;
    if (l = Gt("msgHash", l), m = Gt("publicKey", m), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: p } = f;
    let u, w;
    try {
      if (typeof E == "string" || qt(E))
        try {
          u = S.fromDER(E);
        } catch (Fe) {
          if (!(Fe instanceof kn.Err))
            throw Fe;
          u = S.fromCompact(E);
        }
      else if (typeof E == "object" && typeof E.r == "bigint" && typeof E.s == "bigint") {
        const { r: Fe, s: de } = E;
        u = new S(Fe, de);
      } else
        throw new Error("PARSE");
      w = h.fromHex(m);
    } catch (Fe) {
      if (Fe.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    p && (l = t.hash(l));
    const { r: Y, s: V } = u, q = O(l), $ = d(V), te = c(q * $), ne = c(Y * $), Se = (oe = h.BASE.multiplyAndAddUnsafe(w, te, ne)) == null ? void 0 : oe.toAffine();
    return Se ? c(Se.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: M,
    sign: B,
    verify: a,
    ProjectivePoint: h,
    Signature: S,
    utils: J
  };
}
class jd extends Jd {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, ow(t);
    const r = ya(n);
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
    return js(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    js(this), Gd(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const $d = (e, t, n) => new jd(e, t).update(n).digest();
$d.create = (e, t) => new jd(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Tw(e) {
  return {
    hash: e,
    hmac: (t, ...n) => $d(e, t, uw(...n)),
    randomBytes: lw
  };
}
function Pw(e, t) {
  const n = (r) => Lw({ ...e, ...Tw(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Wd = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), zc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Uw = BigInt(1), Fo = BigInt(2), eA = (e, t) => (e + t / Fo) / t;
function Gw(e) {
  const t = Wd, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), h = e * e * e % t, I = h * h * e % t, g = _t(I, n, t) * I % t, b = _t(g, n, t) * I % t, F = _t(b, Fo, t) * h % t, v = _t(F, s, t) * F % t, C = _t(v, i, t) * v % t, N = _t(C, c, t) * C % t, S = _t(N, d, t) * N % t, J = _t(S, c, t) * C % t, T = _t(J, n, t) * I % t, j = _t(T, o, t) * v % t, M = _t(j, r, t) * h % t, k = _t(M, Fo, t);
  if (!Do.eql(Do.sqr(k), e))
    throw new Error("Cannot find square root");
  return k;
}
const Do = Fw(Wd, void 0, void 0, { sqrt: Gw }), fn = Pw({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Do,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: zc,
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
      const t = zc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Uw * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = eA(i * e, t), d = eA(-r * e, t);
      let h = xt(e - c * n - d * s, t), I = xt(-c * r - d * i, t);
      const g = h > o, b = I > o;
      if (g && (h = t - h), b && (I = t - I), h > o || I > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: h, k2neg: b, k2: I };
    }
  }
}, Ew);
BigInt(0);
fn.ProjectivePoint;
let gs;
const Hw = new Uint8Array(16);
function Jw() {
  if (!gs && (gs = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !gs))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return gs(Hw);
}
const Et = [];
for (let e = 0; e < 256; ++e)
  Et.push((e + 256).toString(16).slice(1));
function Zw(e, t = 0) {
  return (Et[e[t + 0]] + Et[e[t + 1]] + Et[e[t + 2]] + Et[e[t + 3]] + "-" + Et[e[t + 4]] + Et[e[t + 5]] + "-" + Et[e[t + 6]] + Et[e[t + 7]] + "-" + Et[e[t + 8]] + Et[e[t + 9]] + "-" + Et[e[t + 10]] + Et[e[t + 11]] + Et[e[t + 12]] + Et[e[t + 13]] + Et[e[t + 14]] + Et[e[t + 15]]).toLowerCase();
}
const Yw = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), tA = {
  randomUUID: Yw
};
function Vw(e, t, n) {
  if (tA.randomUUID && !t && !e)
    return tA.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || Jw)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return Zw(r);
}
var Ba = { exports: {} }, Kn = typeof Reflect == "object" ? Reflect : null, nA = Kn && typeof Kn.apply == "function" ? Kn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Rs;
Kn && typeof Kn.ownKeys == "function" ? Rs = Kn.ownKeys : Object.getOwnPropertySymbols ? Rs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Rs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function Xw(e) {
  console && console.warn && console.warn(e);
}
var qd = Number.isNaN || function(t) {
  return t !== t;
};
function Qe() {
  Qe.init.call(this);
}
Ba.exports = Qe;
Ba.exports.once = qw;
Qe.EventEmitter = Qe;
Qe.prototype._events = void 0;
Qe.prototype._eventsCount = 0;
Qe.prototype._maxListeners = void 0;
var rA = 10;
function wi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Qe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return rA;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || qd(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    rA = e;
  }
});
Qe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Qe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || qd(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Kd(e) {
  return e._maxListeners === void 0 ? Qe.defaultMaxListeners : e._maxListeners;
}
Qe.prototype.getMaxListeners = function() {
  return Kd(this);
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
    nA(d, this, n);
  else
    for (var h = d.length, I = r0(d, h), r = 0; r < h; ++r)
      nA(I[r], this, n);
  return !0;
};
function zd(e, t, n, r) {
  var s, i, o;
  if (wi(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Kd(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, Xw(c);
  }
  return e;
}
Qe.prototype.addListener = function(t, n) {
  return zd(this, t, n, !1);
};
Qe.prototype.on = Qe.prototype.addListener;
Qe.prototype.prependListener = function(t, n) {
  return zd(this, t, n, !0);
};
function jw() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function e0(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = jw.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Qe.prototype.once = function(t, n) {
  return wi(n), this.on(t, e0(this, t, n)), this;
};
Qe.prototype.prependOnceListener = function(t, n) {
  return wi(n), this.prependListener(t, e0(this, t, n)), this;
};
Qe.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (wi(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : $w(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
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
function t0(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? Ww(s) : r0(s, s.length);
}
Qe.prototype.listeners = function(t) {
  return t0(this, t, !0);
};
Qe.prototype.rawListeners = function(t) {
  return t0(this, t, !1);
};
Qe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : n0.call(e, t);
};
Qe.prototype.listenerCount = n0;
function n0(e) {
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
  return this._eventsCount > 0 ? Rs(this._events) : [];
};
function r0(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function $w(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function Ww(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function qw(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    s0(e, t, i, { once: !0 }), t !== "error" && Kw(e, s, { once: !0 });
  });
}
function Kw(e, t, n) {
  typeof e.on == "function" && s0(e, "error", t, n);
}
function s0(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var i0 = Ba.exports, zw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
function fr(e) {
  return ke(e);
}
var eE = class {
  constructor(e, t, n, r, s, i = 0) {
    D(this, "left");
    D(this, "right");
    D(this, "parent");
    D(this, "hash");
    D(this, "data");
    D(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, sA = eE;
function tE(e) {
  return fr("0x00".concat(e.slice(2)));
}
function nE(e, t) {
  return fr("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function o0(e) {
  if (!e.length)
    return zw;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = tE(e[i]);
    t.push(new sA(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = nE(n[o].hash, n[o + 1].hash);
      t[i] = new sA(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var rE = "0x00", a0 = "0x01";
function sE(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(fr(t).slice(2));
  return [fr(n), n];
}
function Pn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [fr(n), n];
}
function Ki(e) {
  const t = a0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function iE(e) {
  const t = a0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function zi(e) {
  return e.slice(0, 4) === rE;
}
var oE = class {
  constructor(e, t, n, r, s) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "BitMask");
    D(this, "NumSideNodes");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, aE = oE, cE = class {
  constructor(e, t, n) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, AE = cE, Nt = "0x0000000000000000000000000000000000000000000000000000000000000000", tn = 256;
function Xn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function uE(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function dE(e, t) {
  let n = 0;
  for (let r = 0; r < tn && Xn(e, r) === Xn(t, r); r += 1)
    n += 1;
  return n;
}
function lE(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Nt ? t.push(0) : (n.push(r), t.push(1));
  return new aE(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var hE = class {
  constructor() {
    D(this, "ms");
    D(this, "root");
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
    if (zi(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let h = 0; h < tn; h += 1) {
      if ([s, i] = iE(r), Xn(e, h) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Nt) {
        r = "";
        break;
      }
      if (r = this.get(o), zi(r))
        break;
    }
    const d = this.get(c);
    return [uE(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Nt)
      return this.root;
    const [s] = Ki(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", d = "", h = !1;
    for (let I = 0; I < t.length; I += 1)
      if (t[I] !== "") {
        if (c = t[I], o === "")
          if (d = this.get(c), zi(d)) {
            i = c, o = c;
            continue;
          } else
            o = Nt, h = !0;
        !h && c === Nt || (h || (h = !0), Xn(e, t.length - 1 - I) === 1 ? [i, o] = Pn(c, o) : [i, o] = Pn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Nt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(fr(t), t), [i, o] = sE(e, t), this.set(i, o), o = i;
    let c;
    if (r === Nt)
      c = tn;
    else {
      const [d] = Ki(s);
      c = dE(e, d);
    }
    c !== tn && (Xn(e, c) === 1 ? [i, o] = Pn(r, o) : [i, o] = Pn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < tn; d += 1) {
      let h;
      const I = tn - n.length;
      if (d - I < 0 || n[d - I] === "")
        if (c !== tn && c > tn - 1 - d)
          h = Nt;
        else
          continue;
      else
        h = n[d - I];
      Xn(e, tn - 1 - d) === 1 ? [i, o] = Pn(h, o) : [i, o] = Pn(o, h), this.set(i, o), o = i;
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
      const [d] = Ki(r);
      d !== e && (o = r);
    }
    return new AE(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return lE(t);
  }
}, fE = Object.defineProperty, gE = (e, t, n) => t in e ? fE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Oe = (e, t, n) => (gE(e, typeof t != "symbol" ? t + "" : t, n), n), Ca = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Re = (e, t, n) => (Ca(e, t, "read from private field"), n ? n.call(e) : t.get(e)), mn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Ht = (e, t, n, r) => (Ca(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Ro = (e, t, n) => (Ca(e, t, "access private method"), n), ba = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? It, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? It, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: X(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, pE = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, Qa = ce`
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
    `, xa = ce`
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
}
    `, rs = ce`
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
    ${Qa}
${xa}`, mE = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, wE = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${mE}`, va = ce`
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
    `, EE = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, IE = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, yE = ce`
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
    `, c0 = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Ei = ce`
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
    `, BE = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, CE = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, bE = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, QE = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, xE = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, vE = ce`
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
    `, FE = ce`
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
    ${vE}`, DE = ce`
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
    ${BE}
${CE}
${bE}
${QE}
${xE}
${FE}`, RE = ce`
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
    ${Ei}
${DE}`, NE = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, SE = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, _E = ce`
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
    `, kE = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, ME = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${_E}`, OE = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${RE}`, LE = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${rs}`, TE = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${rs}
${Qa}`, PE = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${rs}`, UE = ce`
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
    ${SE}
${rs}`, GE = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${wE}`, HE = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ei}`, JE = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Ei}
${rs}`, ZE = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Ei}`, YE = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${va}`, VE = ce`
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
    ${va}`, XE = ce`
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
    ${va}
${EE}`, jE = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, $E = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${NE}`, WE = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${c0}`, qE = ce`
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
    ${c0}`, KE = ce`
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
    ${IE}`, zE = ce`
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
    ${yE}`, eI = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, tI = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${Qa}`, nI = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, rI = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, sI = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${xa}`, iI = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${xa}`;
function oI(e) {
  return {
    getVersion(t, n) {
      return e(kE, t, n);
    },
    getNodeInfo(t, n) {
      return e(ME, t, n);
    },
    getChain(t, n) {
      return e(OE, t, n);
    },
    getTransaction(t, n) {
      return e(LE, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(TE, t, n);
    },
    getTransactions(t, n) {
      return e(PE, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(UE, t, n);
    },
    estimatePredicates(t, n) {
      return e(GE, t, n);
    },
    getBlock(t, n) {
      return e(HE, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(JE, t, n);
    },
    getBlocks(t, n) {
      return e(ZE, t, n);
    },
    getCoin(t, n) {
      return e(YE, t, n);
    },
    getCoins(t, n) {
      return e(VE, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(XE, t, n);
    },
    getContract(t, n) {
      return e(jE, t, n);
    },
    getContractBalance(t, n) {
      return e($E, t, n);
    },
    getBalance(t, n) {
      return e(WE, t, n);
    },
    getBalances(t, n) {
      return e(qE, t, n);
    },
    getMessages(t, n) {
      return e(KE, t, n);
    },
    getMessageProof(t, n) {
      return e(zE, t, n);
    },
    getMessageStatus(t, n) {
      return e(eI, t, n);
    },
    dryRun(t, n) {
      return e(tI, t, n);
    },
    submit(t, n) {
      return e(nI, t, n);
    },
    produceBlocks(t, n) {
      return e(rI, t, n);
    },
    submitAndAwait(t, n) {
      return e(sI, t, n);
    },
    statusChange(t, n) {
      return e(iI, t, n);
    }
  };
}
var A0 = class {
  constructor(e) {
    D(this, "stream");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: vd(t),
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
      const n = A0.textDecoder.decode(e);
      if (!n.startsWith("data:"))
        continue;
      const { data: r, errors: s } = JSON.parse(n.split("data:")[1]);
      if (Array.isArray(s))
        throw new x(
          x.CODES.INVALID_REQUEST,
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
}, u0 = A0;
Oe(u0, "textDecoder", new TextDecoder());
var Fn = {}, aI = 30 * 1e3, cI = class {
  constructor(e = aI) {
    D(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new x(
        R.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = X(e);
    if (Fn[n]) {
      if (!t || Fn[n].expires > Date.now())
        return Fn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = X(e);
    return Fn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Fn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Fn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = X(e);
    delete Fn[t];
  }
}, AI = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case we.Coin: {
      const n = Z(e.predicate ?? "0x"), r = Z(e.predicateData ?? "0x");
      return {
        type: we.Coin,
        txID: X(Z(e.id).slice(0, 32)),
        outputIndex: Z(e.id)[32],
        owner: X(e.owner),
        amount: Q(e.amount),
        assetId: X(e.assetId),
        txPointer: {
          blockHeight: Ot(Z(e.txPointer).slice(0, 8)),
          txIndex: Ot(Z(e.txPointer).slice(8, 16))
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
          blockHeight: Ot(Z(e.txPointer).slice(0, 8)),
          txIndex: Ot(Z(e.txPointer).slice(8, 16))
        },
        contractID: X(e.contractId)
      };
    case we.Message: {
      const n = Z(e.predicate ?? "0x"), r = Z(e.predicateData ?? "0x"), s = Z(e.data ?? "0x");
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
      throw new x(
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, uI = (e) => {
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
      throw new x(
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, WB = (e) => "utxoId" in e, qB = (e) => "recipient" in e, iA = (e) => "id" in e, KB = (e) => "recipient" in e, dI = (e) => e.type === ue.Revert && e.val.toString("hex") === cd, lI = (e) => e.type === ue.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", hI = (e) => e.reduce(
  (t, n) => (dI(n) && t.missingOutputVariables.push(n), lI(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || Ne;
function fI(e) {
  var n, r, s, i, o, c, d, h, I, g, b, F, v, C;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: ue.Call,
        from: xe((n = e.contract) == null ? void 0 : n.id),
        to: xe((r = e == null ? void 0 : e.to) == null ? void 0 : r.id),
        amount: Q(e.amount),
        assetId: xe(e.assetId),
        gas: Q(e.gas),
        param1: Q(e.param1),
        param2: Q(e.param2),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN":
      return {
        type: ue.Return,
        id: xe((s = e.contract) == null ? void 0 : s.id),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ue.ReturnData,
        id: xe((i = e.contract) == null ? void 0 : i.id),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: xe(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: ue.Panic,
        id: xe((o = e.contract) == null ? void 0 : o.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: xe(e.contractId)
      };
    case "REVERT":
      return {
        type: ue.Revert,
        id: xe((c = e.contract) == null ? void 0 : c.id),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: ue.Log,
        id: xe((d = e.contract) == null ? void 0 : d.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        val2: Q(e.rc),
        val3: Q(e.rd),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG_DATA":
      return {
        type: ue.LogData,
        id: xe((h = e.contract) == null ? void 0 : h.id),
        val0: Q(e.ra),
        val1: Q(e.rb),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: xe(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER":
      return {
        type: ue.Transfer,
        from: xe((I = e.contract) == null ? void 0 : I.id),
        to: xe(e.toAddress || ((g = e == null ? void 0 : e.to) == null ? void 0 : g.id)),
        amount: Q(e.amount),
        assetId: xe(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: ue.TransferOut,
        from: xe((b = e.contract) == null ? void 0 : b.id),
        to: xe(e.toAddress || ((F = e.to) == null ? void 0 : F.id)),
        amount: Q(e.amount),
        assetId: xe(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: ue.ScriptResult,
        result: Q(e.result),
        gasUsed: Q(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const N = xe(e.sender), S = xe(e.recipient), J = xe(e.nonce), T = Q(e.amount), j = e.data ? Z(e.data) : Uint8Array.from([]), M = xe(e.digest), k = Hs.getMessageId({
        sender: N,
        recipient: S,
        nonce: J,
        amount: T,
        data: j
      });
      return {
        type: ue.MessageOut,
        sender: N,
        recipient: S,
        amount: T,
        nonce: J,
        data: j,
        digest: M,
        messageId: k
      };
    }
    case "MINT": {
      const N = xe((v = e.contract) == null ? void 0 : v.id), S = xe(e.subId), J = Pr.getAssetId(N, S);
      return {
        type: ue.Mint,
        subId: S,
        contractId: N,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const N = xe((C = e.contract) == null ? void 0 : C.id), S = xe(e.subId), J = wo.getAssetId(N, S);
      return {
        type: ue.Burn,
        subId: S,
        contractId: N,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new x(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var gI = "https://fuellabs.github.io/block-explorer-v2", pI = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, zB = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || gI, d = [
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
    throw new x(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const j = d.map(({ key: M }) => M).join(", ");
    throw new x(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const g = I ? pI(
    h[0].key,
    h[0].value
  ) : "", b = /^\/|\/$/gm, F = n ? n.replace(b, "") : g, v = c.replace(b, ""), C = r == null ? void 0 : r.replace(b, ""), N = C ? encodeURIComponent(C) : void 0, S = v.match(/^https?:\/\//) ? "" : "https://", J = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${v}/${F}${N ? `?providerUrl=${J}${N}` : ""}`;
}, zn = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), d0 = (e) => e.filter(
  (r) => r.type === ue.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function Bn(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function mI(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    Bn(t, n.vmInitialization).add(Bn(Z(o.predicate).length, n.contractRoot)).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function l0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = Bn(i, t.vmInitialization), c = Q(i).mul(n), d = mI(r, i, t);
  return o.add(c).add(d).add(s).maxU64();
}
function Fa(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function h0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = Bn(r, e.contractRoot), i = Bn(t, e.stateRoot), o = Bn(n, e.s256), c = Q(4 + 32 + 32 + 32), d = Bn(c, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function f0({
  gasCosts: e,
  txBytesSize: t
}) {
  return Bn(t, e.s256);
}
function No(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = X(e[t]);
        break;
      case "Array":
        e[t] = No(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = No(e[t]);
        break;
    }
  }), e;
}
function wI(e) {
  return No(Jr(e));
}
function EI(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var eC = class extends Error {
  constructor() {
    super(...arguments);
    D(this, "name", "ChangeOutputCollisionError");
    D(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, II = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, tC = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, yI = (e) => {
  const t = Z(e);
  return {
    data: X(t),
    dataLength: t.length
  };
}, Ii = class {
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
    D(this, "gasPrice");
    /** Block until which tx cannot be included */
    D(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    D(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    D(this, "witnessLimit");
    /** List of inputs */
    D(this, "inputs", []);
    /** List of outputs */
    D(this, "outputs", []);
    /** List of witnesses */
    D(this, "witnesses", []);
    this.gasPrice = Q(e), this.maturity = t ?? 0, this.witnessLimit = r ? Q(r) : void 0, this.maxFee = n ? Q(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.gasPrice && (t += Ut.GasPrice, n.push({ data: e.gasPrice, type: Ut.GasPrice })), e.witnessLimit && (t += Ut.WitnessLimit, n.push({ data: e.witnessLimit, type: Ut.WitnessLimit })), e.maturity > 0 && (t += Ut.Maturity, n.push({ data: e.maturity, type: Ut.Maturity })), e.maxFee && (t += Ut.MaxFee, n.push({ data: e.maxFee, type: Ut.MaxFee })), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(AI)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(uI)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(yI)) ?? [], { policyTypes: r, policies: s } = Ii.getPolicyMeta(this);
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
    return new Qn().encode(this.toTransaction());
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
      throw new II(e);
    this.witnesses[e] = t;
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
    const t = Dr(e), n = this.inputs.find((r) => {
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
    t ? i = 0 : (i = this.getCoinInputWitnessIndexByOwner(r), typeof i != "number" && (i = this.createWitness()));
    const o = {
      ...e,
      type: we.Coin,
      owner: r.toB256(),
      amount: s,
      assetId: n,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: i,
      predicate: t == null ? void 0 : t.bytes,
      predicateData: t == null ? void 0 : t.predicateData
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
    const { recipient: n, sender: r, amount: s } = e, i = It;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.createWitness()));
    const c = {
      ...e,
      type: we.Message,
      sender: r.toB256(),
      recipient: n.toB256(),
      amount: s,
      witnessIndex: o,
      predicate: t == null ? void 0 : t.bytes,
      predicateData: t == null ? void 0 : t.predicateData
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
    return iA(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
    return iA(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
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
  addCoinOutput(e, t, n = It) {
    return this.pushOutput({
      type: Be.Coin,
      to: Dr(e).toB256(),
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
    return t.map(ba).forEach((n) => {
      this.pushOutput({
        type: Be.Coin,
        to: Dr(e).toB256(),
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
  addChangeOutput(e, t = It) {
    this.getChangeOutputs().find(
      (r) => X(r.assetId) === t
    ) || this.pushOutput({
      type: Be.Change,
      to: Dr(e).toB256(),
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
    return l0({
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
    return Fa({
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
    i(It, Q(1e11)), e.forEach((o) => i(o.assetId, o.amount));
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
    return wI(this);
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
function g0(e, t) {
  const n = e.toTransaction();
  n.type === bt.Script && (n.receiptsRoot = Ne), n.inputs = n.inputs.map((i) => {
    const o = Jr(i);
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
    const o = Jr(i);
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
  const r = Vm(t), s = se([r, new Qn().encode(n)]);
  return ke(s);
}
var BI = (e) => {
  const t = new Uint8Array(32);
  return t.set(Z(e)), t;
}, CI = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: X(t),
    value: X(BI(n))
  };
}, So = class extends Ii {
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
    D(this, "type", bt.Create);
    /** Witness index of contract bytecode to create */
    D(this, "bytecodeWitnessIndex");
    /** Salt */
    D(this, "salt");
    /** List of storage slots to initialize */
    D(this, "storageSlots");
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(CI)) ?? [];
    return {
      type: bt.Create,
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
    return g0(this, t);
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
    return h0({
      contractBytesSize: Q(Z(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, oA = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Z("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, bI = {
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
}, er = class extends Ii {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    D(this, "type", bt.Script);
    /** Gas limit for transaction */
    D(this, "gasLimit");
    /** Script to execute */
    D(this, "script");
    /** Script input data (parameters) */
    D(this, "scriptData");
    this.gasLimit = Q(r), this.script = Z(t ?? oA.bytes), this.scriptData = Z(n ?? oA.encodeScriptData());
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
    const t = Z(this.script ?? "0x"), n = Z(this.scriptData ?? "0x");
    return {
      type: bt.Script,
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
    return Fa({
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
    return g0(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new bn(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return f0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Mt = (e) => {
  if (e instanceof er || e instanceof So)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case bt.Script:
      return er.from(e);
    case bt.Create:
      return So.from(e);
    default:
      throw new x(R.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, QI = (e) => {
  var P, W;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), c = Z(n), [d] = new Qn().decode(c, 0);
  if (d.type === bt.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: h, witnesses: I, inputs: g, policies: b } = d;
  let F = Q(0), v = Q(0);
  if (h === bt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, z = Q(Z(I[U].data).length);
    F = h0({
      contractBytesSize: z,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: c.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (v = U), F = f0({
      gasCosts: r,
      txBytesSize: c.length
    });
  }
  const C = l0({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: g,
    metadataGas: F,
    txBytesSize: c.length
  }), N = Q((P = b.find((U) => U.type === Ut.GasPrice)) == null ? void 0 : P.data), S = (W = b.find((U) => U.type === Ut.WitnessLimit)) == null ? void 0 : W.data, J = I.reduce((U, H) => U + H.dataLength, 0), T = Fa({
    gasPerByte: i,
    minGas: C,
    witnessesLength: J,
    gasLimit: v,
    witnessLimit: S
  }), j = zn(t, N, o), M = zn(C, N, o), k = zn(T, N, o);
  return {
    fee: M.add(j),
    minFee: M,
    maxFee: k,
    feeFromGasUsed: j
  };
}, xI = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var g;
  const s = new bn(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const b = Q(t.param2).sub(di({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(b * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let h;
  if (d) {
    const b = o.decodeArguments(d);
    b && (h = c.reduce((F, v, C) => {
      const N = b[C], S = v.name;
      return S ? {
        ...F,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(N))
      } : F;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: h,
    ...(g = t.amount) != null && g.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function vI(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function Da(e, t) {
  return e.filter((n) => n.type === t);
}
function FI(e) {
  return Da(e, we.Coin);
}
function DI(e) {
  return Da(e, we.Message);
}
function RI(e) {
  return vI(e, [we.Coin, we.Message]);
}
function NI(e) {
  return Da(e, we.Contract);
}
function p0(e, t) {
  const n = FI(e), r = DI(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function SI(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== we.Contract)
      throw new x(
        R.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Ra(e) {
  return e.type === we.Coin ? e.owner.toString() : e.type === we.Message ? e.recipient.toString() : "";
}
function ss(e, t) {
  return e.filter((n) => n.type === t);
}
function _I(e) {
  return ss(e, Be.ContractCreated);
}
function m0(e) {
  return ss(e, Be.Coin);
}
function kI(e) {
  return ss(e, Be.Change);
}
function MI(e) {
  return ss(e, Be.Contract);
}
function nC(e) {
  return ss(e, Be.Variable);
}
var OI = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(OI || {}), LI = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(LI || {}), TI = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(TI || {}), PI = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(PI || {}), UI = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(UI || {});
function Zr(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function w0(e) {
  switch (e) {
    case bt.Mint:
      return "Mint";
    case bt.Create:
      return "Create";
    case bt.Script:
      return "Script";
    default:
      throw new x(
        R.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Na(e, t) {
  return w0(e) === t;
}
function GI(e) {
  return Na(
    e,
    "Mint"
    /* Mint */
  );
}
function E0(e) {
  return Na(
    e,
    "Create"
    /* Create */
  );
}
function I0(e) {
  return Na(
    e,
    "Script"
    /* Script */
  );
}
function rC(e) {
  return (t) => e.assetId === t.assetId;
}
function HI(e) {
  return Zr(e, ue.Call);
}
function JI(e) {
  return Zr(e, ue.MessageOut);
}
var ZI = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((c) => c.assetId === o.assetId)
  );
  return n.map((o) => {
    const c = r.find((h) => h.assetId === o.assetId);
    if (!c)
      return o;
    const d = Q(o.amount).add(c.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function YI(e, t) {
  var n, r, s, i, o, c, d, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((d = e.to) == null ? void 0 : d.type) === ((h = t.to) == null ? void 0 : h.type);
}
function gr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => YI(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? ZI(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function sC(e) {
  return Zr(e, ue.TransferOut);
}
function VI({
  inputs: e,
  receipts: t
}) {
  return JI(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = p0(e, o);
      if (c) {
        const d = Ra(c);
        return gr(s, {
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
function XI({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = HI(n);
  return MI(t).reduce((h, I) => {
    const g = SI(e, I.inputIndex);
    return g ? o.reduce((F, v) => {
      var C;
      if (v.to === g.contractID) {
        const N = p0(e, v.assetId);
        if (N) {
          const S = Ra(N), J = [], T = r == null ? void 0 : r[g.contractID];
          return T && J.push(
            xI({
              abi: T,
              receipt: v,
              rawPayload: s,
              maxInputs: i
            })
          ), gr(F, {
            name: "Contract call",
            from: {
              type: 1,
              address: S
            },
            to: {
              type: 0,
              address: v.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (C = v.amount) != null && C.isZero() ? void 0 : [
              {
                amount: v.amount,
                assetId: v.assetId
              }
            ],
            calls: J
          });
        }
      }
      return F;
    }, h) : h;
  }, []);
}
function jI(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((h) => h.contractID === r) ? 0 : 1;
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
function aA({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = m0(t), i = NI(e), o = kI(t);
  s.forEach((h) => {
    const { amount: I, assetId: g, to: b } = h, F = o.find((v) => v.assetId === g);
    F && (r = gr(r, {
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
          assetId: g,
          amount: I
        }
      ]
    }));
  });
  const c = Zr(
    n,
    ue.Transfer
  ), d = Zr(
    n,
    ue.TransferOut
  );
  return [...c, ...d].forEach((h) => {
    const I = jI(h, i, o);
    r = gr(r, I);
  }), r;
}
function $I(e) {
  return m0(e).reduce((r, s) => gr(r, {
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
function WI({ inputs: e, outputs: t }) {
  const n = _I(t), r = RI(e)[0], s = Ra(r);
  return n.reduce((o, c) => gr(o, {
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
function qI({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return E0(e) ? [
    ...WI({ inputs: t, outputs: n }),
    ...aA({ inputs: t, outputs: n, receipts: r })
  ] : I0(e) ? [
    ...aA({ inputs: t, outputs: n, receipts: r }),
    ...XI({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...VI({ inputs: t, receipts: r })
  ] : [...$I(n)];
}
var tr = (e) => {
  const t = fI(e);
  switch (t.type) {
    case ue.ReturnData:
      return {
        ...t,
        data: e.data || "0x"
      };
    case ue.LogData:
      return {
        ...t,
        data: e.data || "0x"
      };
    default:
      return t;
  }
}, KI = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, zI = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, ey = (e) => {
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
        R.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, ty = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = ey(e.type), e.type) {
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
function yi(e) {
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: c,
    abiMap: d = {},
    maxInputs: h,
    gasCosts: I
  } = e, g = d0(n), b = X(o), F = qI({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: b,
    abiMap: d,
    maxInputs: h
  }), v = w0(i.type), { fee: C } = QI({
    gasUsed: g,
    rawPayload: b,
    consensusParameters: {
      gasCosts: I,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: N, isStatusPending: S, isStatusSuccess: J, blockId: T, status: j, time: M } = ty(c), k = KI(n), O = zI(n);
  let P;
  return M && (P = Uo.fromTai64(M)), {
    id: t,
    fee: C,
    gasUsed: g,
    operations: F,
    type: v,
    blockId: T,
    time: M,
    status: j,
    receipts: n,
    mintedAssets: k,
    burnedAssets: O,
    isTypeMint: GI(i.type),
    isTypeCreate: E0(i.type),
    isTypeScript: I0(i.type),
    isStatusFailure: N,
    isStatusSuccess: J,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
var Ns = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t) {
    /** Transaction ID */
    D(this, "id");
    /** Current provider */
    D(this, "provider");
    /** Gas used on the transaction */
    D(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    D(this, "gqlTransaction");
    this.id = e, this.provider = t;
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(e, t) {
    const n = new Ns(e, t);
    return await n.fetch(), n;
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
    return (t = new Qn().decode(
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
    var h;
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    ), r = ((h = t.receipts) == null ? void 0 : h.map(tr)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), c = this.provider.getChain().consensusParameters.maxInputs;
    return yi({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: Z(t.rawPayload),
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
    for await (const { statusChange: s } of t)
      if (s.type !== "SubmittedStatus")
        break;
    await this.fetch();
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(e) {
    await this.waitForStatusChange();
    const t = await this.getTransactionSummary(e);
    return {
      gqlTransaction: this.gqlTransaction,
      ...t
    };
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(e) {
    const t = await this.waitForResult(e);
    if (t.isStatusFailure)
      throw new x(
        R.TRANSACTION_FAILED,
        `Transaction failed: ${t.gqlTransaction.status.reason}`
      );
    return t;
  }
};
function ny(e, t) {
  return e.reduce((n, r) => (r.type === ue.LogData && n.push(t.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === ue.Log && n.push(
    t.decodeLog(new _("u64").encode(r.val0), r.val1.toNumber(), r.id)[0]
  ), n), []);
}
function ry(e, t) {
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
function y0(e, t, n = 0) {
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
      const d = ry(t, c);
      return await EI(d), y0(e, t, c)(...r);
    }
  };
}
var sy = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, iy = 10, oy = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: c, scriptParams: d, txParams: h, gasCosts: I } = r;
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
      maxPredicateLength: Q(c.maxPredicateLength),
      maxPredicateDataLength: Q(c.maxPredicateDataLength),
      maxGasPerPredicate: Q(c.maxGasPerPredicate),
      gasPriceFactor: Q(o.gasPriceFactor),
      gasPerByte: Q(o.gasPerByte),
      maxMessageDataLength: Q(c.maxMessageDataLength),
      chainId: Q(r.chainId),
      gasCosts: I
    },
    gasCosts: I,
    latestBlock: {
      id: s.id,
      height: Q(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((g) => ({
        id: g.id
      }))
    }
  };
}, _o, B0, jt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, mn(this, _o), Oe(this, "operations"), Oe(this, "cache"), Oe(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new cI(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    jt.nodeInfoCache = {}, jt.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return y0((...r) => {
      if (e.fetch)
        return e.fetch(...r);
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      return fetch(s, { ...i, signal: o });
    }, t);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(e, t = {}) {
    const n = new jt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = jt.chainInfoCache[this.url];
    if (!e)
      throw new x(
        R.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = jt.nodeInfoCache[this.url];
    if (!e)
      throw new x(
        R.NODE_INFO_CACHE_EMPTY,
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
    return jt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = el(e.nodeVersion);
    if (!t || !n)
      throw new x(
        x.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${e.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const e = jt.getFetchFn(this.options), t = new Rm.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return oI((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new u0({
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
    } = await this.getChain(), n = new _n(e, t.toNumber());
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
    return jt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = oy(e);
    return jt.chainInfoCache[this.url] = t, t;
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
    Ro(this, _o, B0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = X(r.toTransactionBytes());
    if (n) {
      const o = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: h } of o)
        if (h.type !== "SubmittedStatus")
          break;
      const c = r.getTransactionId(this.getChainId()), d = new Ns(c, this);
      return await d.fetch(), d;
    }
    const {
      submit: { id: i }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Ns(i, this);
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
      receipts: i.map(tr)
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
      (i) => "predicate" in i && i.predicate && !hd(Z(i.predicate), Z("0x")) && new Te(i.predicateGasUsed).isZero()
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
    if (e.type === bt.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    await this.estimatePredicates(e);
    let t = [];
    const n = [];
    let r = 0;
    for (let s = 0; s < iy; s++) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: X(e.toTransactionBytes()),
        utxoValidation: !1
      });
      t = i.map(tr);
      const { missingOutputVariables: o, missingOutputContractIds: c } = hI(t);
      if (o.length !== 0 || c.length !== 0)
        r += o.length, e.addVariableOutputs(o.length), c.forEach(({ contractId: h }) => {
          e.addContractInputAndOutput(he.fromString(h)), n.push(h);
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
      receipts: s.map(tr)
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
    resourcesOwner: s
  } = {}) {
    const i = Jr(Mt(e)), o = this.getChain(), { gasPriceFactor: c, minGasPrice: d, maxGasPerTx: h } = this.getGasConfig(), I = Il(i.gasPrice, d), g = i.type === bt.Script, b = i.getCoinOutputsQuantities(), F = sy(b, t);
    i.fundWithFakeUtxos(F, s == null ? void 0 : s.address), r && (g && (i.gasLimit = Q(0)), s && "populateTransactionPredicateData" in s && s.populateTransactionPredicateData(i), await this.estimatePredicates(i));
    const v = i.calculateMinGas(o), C = i.calculateMaxGas(o, v);
    let N = [], S = [], J = 0;
    if (g && n) {
      i.gasPrice = Q(0), i.gasLimit = Q(h.sub(C).toNumber() * 0.9);
      const O = await this.estimateTxDependencies(i);
      N = O.receipts, J = O.outputVariables, S = O.missingContractIds;
    }
    const T = g ? d0(N) : v, j = zn(
      T,
      I,
      c
    ).normalizeZeroToOne(), M = zn(v, I, c).normalizeZeroToOne(), k = zn(C, I, c).normalizeZeroToOne();
    return {
      requiredQuantities: F,
      receipts: N,
      gasUsed: T,
      minGasPrice: d,
      gasPrice: I,
      minGas: v,
      maxGas: C,
      usedFee: j,
      minFee: M,
      maxFee: k,
      estimatedInputs: i.inputs,
      outputVariables: J,
      missingContractIds: S
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = he.fromAddressOrString(e), s = Mt(Jr(t)), i = await this.getTransactionCost(s, n);
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
    var d, h, I;
    const r = he.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((g) => X(g))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((g) => X(g))) || []
    };
    if (this.cache) {
      const g = new Set(
        s.utxos.concat((I = this.cache) == null ? void 0 : I.getActiveData().map((b) => X(b)))
      );
      s.utxos = Array.from(g);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(ba).map(({ assetId: g, amount: b, max: F }) => ({
        assetId: X(g),
        amount: b.toString(10),
        max: F ? F.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((g) => {
      switch (g.__typename) {
        case "MessageCoin":
          return {
            amount: Q(g.amount),
            assetId: g.assetId,
            daHeight: Q(g.daHeight),
            sender: he.fromAddressOrString(g.sender),
            recipient: he.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: Q(g.amount),
            assetId: g.assetId,
            owner: he.fromAddressOrString(g.owner),
            maturity: Q(g.maturity).toNumber(),
            blockCreated: Q(g.blockCreated),
            txCreatedIdx: Q(g.txCreatedIdx)
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
          return (s = new Qn().decode(Z(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new Qn().decode(
      Z(t.rawPayload),
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
      messageId: Tr.getMessageId({
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
      data: Tr.decodeData(s.data),
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
      throw new x(
        R.INVALID_INPUT_PARAMETERS,
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
      blockProof: h,
      sender: I,
      recipient: g,
      amount: b,
      data: F
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
      sender: he.fromAddressOrString(I),
      recipient: he.fromAddressOrString(g),
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
      startTimestamp: t ? Uo.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return Q(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Ns(e, this);
  }
}, $s = jt;
_o = /* @__PURE__ */ new WeakSet();
B0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === we.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Oe($s, "chainInfoCache", {});
Oe($s, "nodeInfoCache", {});
async function iC(e) {
  var b;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new x(
      R.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Qn().decode(
    Z(s.rawPayload),
    0
  ), o = ((b = s.receipts) == null ? void 0 : b.map(tr)) || [], {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: h, gasCosts: I }
  } = n.getChain(), g = yi({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: Z(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(c),
    gasPriceFactor: Q(d),
    abiMap: r,
    maxInputs: h,
    gasCosts: I
  });
  return {
    gqlTransaction: s,
    ...g
  };
}
async function oC(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, h = n.toTransaction(), I = n.toTransactionBytes();
  return yi({
    receipts: s,
    transaction: h,
    transactionBytes: I,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: c
  });
}
async function aC(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: h, gasCosts: I }
  } = n.getChain();
  return {
    transactions: i.map((b) => {
      const { node: F } = b, { id: v, rawPayload: C, receipts: N, status: S } = F, [J] = new Qn().decode(Z(C), 0), T = (N == null ? void 0 : N.map(tr)) || [], j = yi({
        id: v,
        receipts: T,
        transaction: J,
        transactionBytes: Z(C),
        gqlTransactionStatus: S,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: d,
        maxInputs: h,
        gasCosts: I
      });
      return {
        gqlTransaction: F,
        ...j
      };
    }),
    pageInfo: o
  };
}
var jn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, ay = (e) => {
  if (e === "ethereum")
    return jn.eth.sepolia;
  if (e === "fuel")
    return jn.fuel.beta5;
}, cy = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), C0 = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? ay(n);
  if (i === void 0)
    return;
  const o = cy({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, cC = (e, t) => C0({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), AC = (e, t) => C0({
  asset: e,
  networkType: "fuel",
  chainId: t
}), Ay = "/", uy = /^\/|\/$/g, dy = (e = "") => e.replace(uy, "");
function ly(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(dy);
  return r && n && s.unshift(""), s.join(Ay);
}
function uC(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: ly(t, n.icon)
  }));
}
var dC = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: jn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: jn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: jn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: jn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], hy = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new _("u64").encode(new Te(n).toNumber());
  return Uint8Array.from([
    ...Z(r),
    ...i,
    ...Z(t)
  ]);
}, fy = async (e) => {
  const t = hy(e);
  await Ia();
  const n = qm(16, 0, zm.ScriptData), r = Xc(17, 16, 32), s = Sr(18, 17, 0), i = Xc(19, 17, 8), o = $m(16, 18, 19), c = Pd(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Bi = class extends id {
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
    D(this, "address");
    /**
     * The provider used to interact with the network.
     */
    D(this, "_provider");
    D(this, "_connector");
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
      throw new x(R.MISSING_PROVIDER, "Provider not set");
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
      throw new x(
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
      throw new x(
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
  async getBalance(t = It) {
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
      throw new x(
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
    const s = pE({
      amount: Q(r),
      assetId: It,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: g, assetId: b }) => {
      i[b] = {
        required: g,
        owned: Q(0)
      };
    });
    const o = [], c = [], d = this.address.toB256();
    t.inputs.forEach((g) => {
      if ("amount" in g)
        if ("owner" in g) {
          const v = String(g.assetId);
          if (g.owner === d && i[v]) {
            const C = Q(g.amount);
            i[v].owned = i[v].owned.add(C), o.push(g.id);
          }
        } else
          g.recipient === d && g.amount && i[It] && (i[It].owned = i[It].owned.add(g.amount), c.push(g.nonce));
    });
    const h = [];
    if (Object.entries(i).forEach(([g, { owned: b, required: F }]) => {
      b.lt(F) && h.push({
        assetId: g,
        amount: F.sub(b)
      });
    }), h.length) {
      const g = await this.getResourcesToSpend(h, {
        messages: c,
        utxos: o
      });
      t.addResources(g);
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
  async createTransfer(t, n, r = It, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, c = new er(o);
    c.addCoinOutput(he.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: h, gasUsed: I, estimatedInputs: g } = await this.provider.getTransactionCost(c, [], {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return c.gasPrice = Q(s.gasPrice ?? i), c.gasLimit = Q(s.gasLimit ?? I), this.validateGas({
      gasUsed: I,
      gasPrice: c.gasPrice,
      gasLimit: c.gasLimit,
      minGasPrice: i
    }), await this.fund(c, h, d), c.updatePredicateInputs(g), c;
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
  async transfer(t, n, r = It, s = {}) {
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
  async transferToContract(t, n, r = It, s = {}) {
    const i = he.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), c = { gasPrice: o, ...s }, { script: d, scriptData: h } = await fy({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: r
    }), I = new er({
      ...c,
      script: d,
      scriptData: h
    });
    I.addContractInputAndOutput(i);
    const { maxFee: g, requiredQuantities: b, gasUsed: F } = await this.provider.getTransactionCost(
      I,
      [{ amount: Q(n), assetId: String(r) }]
    );
    return I.gasLimit = Q(c.gasLimit ?? F), this.validateGas({
      gasUsed: F,
      gasPrice: I.gasPrice,
      gasLimit: I.gasLimit,
      minGasPrice: o
    }), await this.fund(I, b, g), this.sendTransaction(I);
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
    const { minGasPrice: s } = this.provider.getGasConfig(), i = he.fromAddressOrString(t), o = Z(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), c = Z(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), h = { script: new Uint8Array([
      ...Z(bI.bytes),
      ...o,
      ...c
    ]), gasPrice: s, ...r }, I = new er(h), g = [{ amount: Q(n), assetId: It }], { requiredQuantities: b, maxFee: F, gasUsed: v } = await this.provider.getTransactionCost(
      I,
      g
    );
    return I.gasLimit = Q(h.gasLimit ?? v), this.validateGas({
      gasUsed: v,
      gasPrice: I.gasPrice,
      gasLimit: I.gasLimit,
      minGasPrice: s
    }), await this.fund(I, b, F), this.sendTransaction(I);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new x(R.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
      throw new x(
        R.GAS_PRICE_TOO_LOW,
        `Gas price '${n}' is lower than the required: '${s}'.`
      );
    if (t.gt(r))
      throw new x(
        R.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r}' is lower than the required: '${t}'.`
      );
  }
}, pr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    D(this, "address");
    D(this, "publicKey");
    D(this, "compressedPublicKey");
    D(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Jt(e, 32);
    this.privateKey = X(t), this.publicKey = X(fn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = X(fn.getPublicKey(t, !0)), this.address = he.fromPublicKey(this.publicKey);
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
    const t = fn.sign(Z(e), Z(this.privateKey)), n = Jt(`0x${t.r.toString(16)}`, 32), r = Jt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, X(se([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = fn.ProjectivePoint.fromHex(Z(this.compressedPublicKey)), n = fn.ProjectivePoint.fromHex(Z(e));
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
    const n = Z(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new fn.Signature(BigInt(X(r)), BigInt(X(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Z(e)).toRawBytes(!1).slice(1);
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
    return he.fromPublicKey(pr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Od(se([Cn(32), Z(e)])) : Cn(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = fn.ProjectivePoint.fromHex(Z(e));
    return X(t.toRawBytes(!1).slice(1));
  }
}, cA = 13, AA = 8, uA = 1, eo = 32, gy = 16, dA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function py(e, t, n) {
  const r = yn(dA(e), "hex"), s = he.fromAddressOrString(t), i = Cn(eo), o = Cu({
    password: yn(n),
    salt: i,
    dklen: eo,
    n: 2 ** cA,
    r: AA,
    p: uA
  }), c = Cn(gy), d = await mg(r, o, c), h = Uint8Array.from([...o.subarray(16, 32), ...d]), I = bu(h), g = Fr(I, "hex"), b = {
    id: Vw(),
    version: 3,
    address: dA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Fr(c, "hex") },
      ciphertext: Fr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: eo,
        n: 2 ** cA,
        p: uA,
        r: AA,
        salt: Fr(i, "hex")
      }
    }
  };
  return JSON.stringify(b);
}
async function my(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: h, salt: I }
    }
  } = n, g = yn(s, "hex"), b = yn(i, "hex"), F = yn(I, "hex"), v = yn(t), C = Cu({
    password: v,
    salt: F,
    n: c,
    p: h,
    r: d,
    dklen: o
  }), N = Uint8Array.from([...C.subarray(16, 32), ...g]), S = bu(N), J = Fr(S, "hex");
  if (r !== J)
    throw new x(
      R.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await pg(g, C, b);
  return X(T);
}
var b0 = class extends Bi {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new pr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    D(this, "signer");
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
    const n = await this.signer().sign(Ym(t));
    return X(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Mt(t), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r), i = await this.signer().sign(s);
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
    return py(this.privateKey, this.address, t);
  }
};
Oe(b0, "defaultPath", "m/44'/1179993420'/0'/0/0");
var ps = [
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
], wy = /* @__PURE__ */ ((e) => (e.english = "english", e))(wy || {});
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
        throw new x(
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
function Ey(e) {
  return (1 << e) - 1;
}
function Q0(e) {
  return (1 << e) - 1 << 8 - e;
}
function to(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function Iy(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function yy(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & Ey(8 - n)), n += 3);
  const r = e.length / 4, s = Z(ke(e))[0] & Q0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function By(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = Z(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const I = t.indexOf(e[h].normalize("NFKD"));
    if (I === -1)
      throw new x(
        R.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      I & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = Q0(o);
  if ((Z(ke(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new x(
      R.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Cy = ko("Bitcoin seed"), by = "0x0488ade4", Qy = "0x04358394", lA = [12, 15, 18, 21, 24];
function hA(e) {
  if (e.length !== 2048)
    throw new x(
      R.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function xy(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new x(
      R.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function no(e) {
  if (!lA.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${lA.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new x(R.INVALID_MNEMONIC, t);
  }
}
var gn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = ps) {
    D(this, "wordlist");
    this.wordlist = e, hA(this.wordlist);
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
  static mnemonicToEntropy(e, t = ps) {
    const n = to(e);
    return no(n), X(By(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = ps) {
    const n = Z(e);
    return hA(t), xy(n), yy(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    no(to(e));
    const n = ko(Iy(e)), r = ko(`mnemonic${t}`);
    return yr(n, r, 2048, 64, "sha512");
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
    const t = to(e);
    let n = 0;
    try {
      no(t);
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
    const t = ps;
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
    const t = Z(e);
    if (t.length < 16 || t.length > 64)
      throw new x(
        R.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Z(Ir("sha512", Cy, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = gn.masterKeysFromSeed(e), r = Z(t ? Qy : by), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), h = se([
      r,
      s,
      i,
      o,
      c,
      se(["0x00", d])
    ]), I = Zo(ke(ke(h)), 0, 4);
    return kA(se([h, I]));
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
    const n = t ? ke(se([Cn(e), Z(t)])) : Cn(e);
    return gn.entropyToMnemonic(n);
  }
}, Sa = gn, x0 = 2147483648, v0 = X("0x0488ade4"), _a = X("0x0488b21e"), F0 = X("0x04358394"), ka = X("0x043587cf");
function fA(e) {
  return kA(se([e, Zo(ke(ke(e)), 0, 4)]));
}
function vy(e = !1, t = !1) {
  return e ? t ? ka : _a : t ? F0 : v0;
}
function Fy(e) {
  return [_a, ka].includes(X(e.slice(0, 4)));
}
function Dy(e) {
  return [v0, F0, _a, ka].includes(
    X(e.slice(0, 4))
  );
}
function Ry(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new x(R.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + x0 : parseInt(r, 10)
  );
}
var Hn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    D(this, "depth", 0);
    D(this, "index", 0);
    D(this, "fingerprint", X("0x00000000"));
    D(this, "parentFingerprint", X("0x00000000"));
    D(this, "privateKey");
    D(this, "publicKey");
    D(this, "chainCode");
    if (e.privateKey) {
      const t = new pr(e.privateKey);
      this.publicKey = X(t.compressedPublicKey), this.privateKey = X(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new x(
          R.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Zo(Wr(ke(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && Z(this.privateKey), n = Z(this.publicKey), r = Z(this.chainCode), s = new Uint8Array(37);
    if (e & x0) {
      if (!t)
        throw new x(
          R.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Z(this.publicKey));
    s.set(Jt(e, 4), 33);
    const i = Z(Ir("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const I = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", g = Q(o).add(t).mod(I).toBytes(32);
      return new Hn({
        privateKey: g,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new pr(X(o)).addPoint(n);
    return new Hn({
      publicKey: h,
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
    return Ry(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
        R.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = vy(this.privateKey == null || e, t), r = X(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = Jo(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? se(["0x00", this.privateKey]) : this.publicKey, d = Z(se([n, r, s, i, o, c]));
    return fA(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Sa.masterKeysFromSeed(e);
    return new Hn({
      chainCode: Z(t.slice(32)),
      privateKey: Z(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Nl(kl(e)), n = Z(t), r = fA(n.slice(0, 78)) === e;
    if (n.length !== 82 || !Dy(n))
      throw new x(R.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new x(R.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = X(n.slice(5, 9)), o = parseInt(X(n.slice(9, 13)).substring(2), 16), c = X(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new x(
        R.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (Fy(n)) {
      if (d[0] !== 3)
        throw new x(R.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Hn({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new x(R.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Hn({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, ro = Hn, D0 = class extends Bi {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new vt(e, this._provider);
  }
}, vt = class extends b0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new pr("0x00"), new D0(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = pr.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = ro.fromSeed(e).derivePath(t || vt.defaultPath);
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
    const s = Sa.mnemonicToSeed(e, n), o = ro.fromSeed(s).derivePath(t || vt.defaultPath);
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
    const n = ro.fromExtendedKey(e);
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
    const r = await my(e, t);
    return new vt(r, n);
  }
}, Rt = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new D0(e, t);
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
Oe(Rt, "generate", vt.generate);
Oe(Rt, "fromSeed", vt.fromSeed);
Oe(Rt, "fromMnemonic", vt.fromMnemonic);
Oe(Rt, "fromExtendedKey", vt.fromExtendedKey);
Oe(Rt, "fromEncryptedJson", vt.fromEncryptedJson);
var Ny = class {
  constructor() {
    D(this, "storage", /* @__PURE__ */ new Map());
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
}, Dn, R0 = class {
  constructor(e) {
    mn(this, Dn, void 0), Oe(this, "pathKey", "{}"), Oe(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Oe(this, "numberOfAccounts", 0), Ht(this, Dn, e.secret || Sa.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Re(this, Dn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Rt.fromMnemonic(Re(this, Dn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Rt.fromMnemonic(Re(this, Dn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = he.fromAddressOrString(e);
    do {
      const r = Rt.fromMnemonic(Re(this, Dn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new x(
      R.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Rt.fromPrivateKey(t);
  }
};
Dn = /* @__PURE__ */ new WeakMap();
Oe(R0, "type", "mnemonic");
var pn, N0 = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    mn(this, pn, []), e.secret ? Ht(this, pn, [e.secret]) : Ht(this, pn, e.accounts || [Rt.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Re(this, pn)
    };
  }
  getPublicAccount(e) {
    const t = Rt.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return Re(this, pn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Rt.generate();
    return Re(this, pn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = he.fromAddressOrString(e), n = Re(this, pn).find(
      (r) => Rt.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new x(
        R.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Rt.fromPrivateKey(t);
  }
};
pn = /* @__PURE__ */ new WeakMap();
Oe(N0, "type", "privateKey");
var zt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function en(e, t) {
  if (!e)
    throw new x(R.WALLET_MANAGER_ERROR, t);
}
var Qt, Rn, $t, Mo, S0, Oo, _0, k0 = class extends i0.EventEmitter {
  constructor(e) {
    super(), mn(this, Mo), mn(this, Oo), Oe(this, "storage", new Ny()), Oe(this, "STORAGE_KEY", "WalletManager"), mn(this, Qt, []), mn(this, Rn, ""), mn(this, $t, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Re(this, $t);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    en(!Re(this, $t), zt.wallet_not_unlocked);
    const t = Re(this, Qt).find((n, r) => r === e);
    return en(t, zt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Re(this, Qt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Re(this, Qt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = he.fromAddressOrString(e), n = Re(this, Qt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return en(n, zt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = he.fromAddressOrString(e);
    en(!Re(this, $t), zt.wallet_not_unlocked);
    const n = Re(this, Qt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return en(n, zt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Re(this, Qt)[(e == null ? void 0 : e.vaultId) || 0];
    await en(t, zt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Re(this, Qt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Ht(this, Qt, Re(this, Qt).concat({
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
    Ht(this, $t, !0), Ht(this, Qt, []), Ht(this, Rn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Ht(this, Rn, e), Ht(this, $t, !1);
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
    const n = Re(this, $t);
    await this.unlock(e), Ht(this, Rn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await en(!Re(this, $t), zt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await fg(Re(this, Rn), JSON.parse(e));
      Ht(this, Qt, Ro(this, Oo, _0).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await en(!Re(this, $t), zt.wallet_not_unlocked);
    const e = await gg(Re(this, Rn), {
      vaults: Ro(this, Mo, S0).call(this, Re(this, Qt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = k0.Vaults.find((n) => n.type === e);
    return en(t, zt.invalid_vault_type), t;
  }
}, Sy = k0;
Qt = /* @__PURE__ */ new WeakMap();
Rn = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
Mo = /* @__PURE__ */ new WeakSet();
S0 = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Oo = /* @__PURE__ */ new WeakSet();
_0 = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
Oe(Sy, "Vaults", [R0, N0]);
var _y = class {
  constructor(e) {
    throw new x(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new x(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new x(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new x(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new x(R.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new x(R.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Oe(_y, "type");
var lC = class {
}, ky = (e) => {
  const n = Z(e), r = FA(n, 16384), s = o0(r.map((o) => X(o)));
  return Od(se(["0x4655454C", s]));
}, gA = class extends Bi {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(t, n, r, s) {
    const { predicateBytes: i, predicateInterface: o } = gA.processPredicateData(
      t,
      r,
      s
    ), c = he.fromB256(ky(i));
    super(c, n);
    D(this, "bytes");
    D(this, "predicateData", Uint8Array.from([]));
    D(this, "predicateArgs", []);
    D(this, "interface");
    this.bytes = i, this.interface = o;
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    var s;
    const n = Mt(t), { policies: r } = Ii.getPolicyMeta(n);
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
  async createTransfer(t, n, r = It, s = {}) {
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
  /**
   * Sets data for the predicate.
   *
   * @param args - Arguments for the predicate function.
   * @returns The Predicate instance with updated predicate data.
   */
  setData(...t) {
    return this.predicateArgs = t, this;
  }
  getPredicateData(t) {
    var o;
    if (!this.predicateArgs.length)
      return new Uint8Array();
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Ie(this.bytes.length).encode(this.bytes), i = di({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + ua + vg + re + r.byteLength + t * re;
    return (n == null ? void 0 : n.encodeArguments(this.predicateArgs, i)) || new Uint8Array();
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
    let s = Z(t), i;
    if (n && (i = new bn(n), i.functions.main === void 0))
      throw new x(
        R.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = gA.setConfigurableConstants(
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
      throw new x(
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, M0 = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(M0 || {}), Ma = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Ma || {}), O0 = "FuelConnector", My = class {
  constructor(e) {
    D(this, "storage");
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
}, Oy = class extends i0.EventEmitter {
  constructor() {
    super(...arguments);
    D(this, "name", "");
    D(this, "metadata", {});
    D(this, "connected", !1);
    D(this, "installed", !1);
    D(this, "events", Ma);
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
function Ly(e, { cache: t, cacheTime: n, key: r }) {
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
function hC(e) {
  window.dispatchEvent(
    new CustomEvent(O0, {
      detail: e
    })
  );
}
function Ty() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function ms(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var Py = 2e3, Uy = 5e3, { warn: Gy } = console, kr = class extends Oy {
  constructor(t = kr.defaultConfig) {
    super();
    D(this, "_storage", null);
    D(this, "_connectors", []);
    D(this, "_targetObject", null);
    D(this, "_unsubscribes", []);
    D(this, "_targetUnsubscribe");
    D(this, "_pingCache", {});
    D(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    D(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = O0;
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
    D(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    D(this, "triggerConnectorEvents", async () => {
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
    D(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new My(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(kr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(M0).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      ms(t.isConnected()),
      ms(this.pingConnector(t))
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
      return await Ly(async () => ms(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: Uy
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Ma)), await ((o = this._storage) == null ? void 0 : o.setItem(kr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = Ty();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), ms(t.promise, Py).then(() => !0).catch(() => !1);
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
    return Gy(
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
      n = await $s.create(t.url);
    else {
      if (t)
        throw new x(R.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await $s.create(r.url);
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
    return new Bi(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(kr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, L0 = kr;
Oe(L0, "STORAGE_KEY", "fuel-current-connector");
Oe(L0, "defaultConfig", {});
var Hy = [
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
], so = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", Jy = (e) => Hy.includes(e) ? e : e === "Revert(123)" ? "MismatchedSelector" : "unknown", Zy = (e) => {
  if ((e == null ? void 0 : e.type) === "FailureStatus") {
    const t = Jy(e.reason);
    return {
      doc: t !== "unknown" ? `${so}#variant.${t}` : so,
      reason: t
    };
  }
  return { doc: so, reason: "unknown" };
};
function io(e, t) {
  if (!e)
    throw new x(R.TRANSACTION_ERROR, t);
}
var pA = {
  [Kg]: "RequireFailed",
  [cd]: "TransferToAddressFailed",
  [zg]: "SendMessageFailed",
  [ep]: "AssertEqFailed",
  [tp]: "AssertFailed",
  [np]: "Unknown"
}, Yy = (e) => {
  const t = e.val.toHex();
  return pA[t] ? pA[t] : void 0;
}, is = class extends Error {
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
    D(this, "receipt");
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
}, Vy = class extends is {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "RequireRevertError";
  }
}, Xy = class extends is {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "TransferToAddressRevertError";
  }
}, jy = class extends is {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "SendMessageRevertError";
  }
}, $y = class extends is {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "AssertFailedRevertError";
  }
}, Wy = (e) => {
  const t = Yy(e);
  if (t)
    switch (t) {
      case "RequireFailed":
        return new Vy(e, t);
      case "TransferToAddressFailed":
        return new Xy(e, t);
      case "SendMessageFailed":
        return new jy(e, t);
      case "AssertFailed":
        return new $y(e, t);
      default:
        return new is(e, t);
    }
}, { warn: qy } = console, Ky = (e) => e.filter((t) => t.type === ue.Revert), zy = class {
  constructor(e) {
    D(this, "revertReceipts");
    this.revertReceipts = Ky(e);
  }
  assert(e) {
    const t = this.getError();
    if (t)
      throw t.cause = e, t;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && qy(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), Wy(this.revertReceipts[0]);
  }
}, eB = (e, t) => typeof t == "bigint" ? t.toString() : t, tB = class extends Error {
  constructor(t, n, r) {
    var c;
    let s = "";
    (c = t == null ? void 0 : t.gqlTransaction) != null && c.status && (s = `${JSON.stringify(Zy(t.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      t.receipts.map(({ type: d, ...h }) => ({ type: ue[d], ...h })),
      eB,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    D(this, "logs");
    this.logs = r, new zy(t.receipts).assert(this);
  }
}, Wt, QA, T0 = (QA = class {
  constructor(...e) {
    ft(this, Wt, void 0);
    Ct(this, Wt, e || []);
  }
  entries() {
    return Ee(this, Wt);
  }
  push(...e) {
    Ee(this, Wt).push(...e);
  }
  concat(e) {
    return Ee(this, Wt).concat(e);
  }
  extend(e) {
    Ee(this, Wt).push(...e);
  }
  toBytes() {
    return se(
      Ee(this, Wt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Ee(this, Wt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Wt = new WeakMap(), QA), nB = (e) => ua + di({ maxInputs: e }), P0 = re + Or + Cg + re + re;
function rB(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === ue.ScriptResult ? n = i : (i.type === ue.Return || i.type === ue.ReturnData || i.type === ue.Revert) && (r = i);
  }), !n)
    throw new x(
      R.TRANSACTION_ERROR,
      "The script call result does not contain a 'scriptResultReceipt'."
    );
  if (!r)
    throw new x(
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
function Oa(e, t, n = []) {
  try {
    const r = rB(e);
    return t(r);
  } catch (r) {
    throw new tB(
      e,
      r.message,
      n
    );
  }
}
function sB(e, t, n) {
  return Oa(
    e,
    (r) => {
      if (r.returnReceipt.type === ue.Revert)
        throw new x(
          R.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ue.Return && r.returnReceipt.type !== ue.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new x(
          R.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: n,
            receipt: r.returnReceipt
          })}`
        );
      }
      let s;
      return r.returnReceipt.type === ue.Return && (s = r.returnReceipt.val), r.returnReceipt.type === ue.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var Yr = class {
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
    D(this, "bytes");
    /**
     * A function to encode the script data.
     */
    D(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    D(this, "scriptResultDecoder");
    this.bytes = Z(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return di({ maxInputs: t }) + ua + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return Yr.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return Oa(e, this.scriptResultDecoder, t);
  }
}, U0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, iB = Ne, G0 = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new T0(
    fs(16, e),
    fs(17, n),
    Sr(17, 17, 0),
    fs(18, r)
  );
  return t ? i.push(
    fs(19, t),
    Sr(19, 19, 0),
    Vc(16, 17, 18, 19)
  ) : i.push(Vc(16, 17, 18, Me.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Sr(21, Me.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Sr(22, Me.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    Wm(22, 22, s.encodedLength),
    jm(21, 22)
  ]), i;
};
function mA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new T0();
  for (let r = 0; r < e.length; r += 1)
    n.extend(G0(e[r], t[r]).entries());
  return n.push(Pd(1)), n.toBytes();
}
var wA = (e) => e === ue.Return || e === ue.ReturnData, oB = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === ue.Call && r === iB && s === t
), aB = (e, t) => (n) => {
  if (Ot(n.code) !== 0)
    throw new x(
      R.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${e} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = oB(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => wA(o)).flatMap((o, c, d) => {
    var h;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === ue.Return)
      return [
        new _("u64").encode(o.val)
      ];
    if (o.type === ue.ReturnData) {
      const I = Z(o.data);
      if (t && wA((h = d[c + 1]) == null ? void 0 : h.type)) {
        const g = d[c + 1];
        return se([I, Z(g.data)]);
      }
      return [I];
    }
    return [new Uint8Array()];
  });
}, cB = (e, t, n, r = []) => Oa(e, aB(t, n), r), AB = (e) => e.reduce(
  (t, n) => {
    const r = { ...U0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + G0(r, s).byteLength();
  },
  Tt.size()
  // placeholder for single RET instruction which is added later
), uB = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), EA = (e, t) => new Yr(
  // Script to call the contract, start with stub size matching length of calls
  mA(
    new Array(e.length).fill(U0),
    uB(e)
  ),
  (n) => {
    var v;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = AB(n), i = (8 - s % 8) % 8, o = s + i, c = nB(t.toNumber()) + o, d = [];
    let h = c;
    const I = [], g = [];
    for (let C = 0; C < r; C += 1) {
      const N = n[C];
      I.push({
        isHeap: N.isOutputDataHeap,
        encodedLength: N.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: h,
        assetIdOffset: h + re,
        gasForwardedOffset: N.gas ? h + re + Or : 0,
        callDataOffset: h + re + Or + S
      }), g.push(new _("u64").encode(N.amount || 0)), g.push(new G().encode(((v = N.assetId) == null ? void 0 : v.toString()) || It)), g.push(N.contractId.toBytes()), g.push(new _("u64").encode(N.fnSelector)), N.gas && (g.push(new _("u64").encode(N.gas)), S = re), N.isInputDataPointer) {
        const T = h + P0 + S;
        g.push(new _("u64").encode(T));
      }
      const J = Z(N.data);
      g.push(J), h = c + se(g).byteLength;
    }
    const b = mA(d, I);
    return { data: se(g), script: b };
  },
  () => [new Uint8Array()]
);
function dB(e) {
  const t = e.receipts.find((n) => n.type === ue.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var H0 = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    D(this, "functionScopes");
    D(this, "isMultiCall");
    D(this, "gasUsed");
    D(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = dB(t);
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
      return sB(e, n, t);
    const s = cB(
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
    const t = this.getFirstCallConfig();
    if (!t)
      return [];
    const { program: n } = t;
    return ny(e, n.interface);
  }
}, J0 = class extends H0 {
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
    D(this, "transactionId");
    D(this, "transactionResponse");
    D(this, "transactionResult");
    D(this, "program");
    D(this, "logs");
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
    return new J0(
      t,
      n,
      i,
      s,
      r
    );
  }
}, Lo = class extends H0 {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    D(this, "callResult");
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
    return await new Lo(t, n, r);
  }
};
function lB(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), c = e.getCallConfig().func.isInputDataPointer ? P0 : 0, d = i.encodeArguments(r, t + c);
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
var Z0 = class {
  // flag to check if any of the callParams has gasLimit set
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    D(this, "transactionRequest");
    D(this, "program");
    D(this, "functionInvocationScopes", []);
    D(this, "txParameters");
    D(this, "requiredCoins", []);
    D(this, "isMultiCall", !1);
    D(this, "hasCallParamsGasLimit", !1);
    this.program = e, this.isMultiCall = t, this.transactionRequest = new er();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const t = this.getProvider().getChain().consensusParameters;
    if (!t)
      throw new x(
        x.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = t.maxInputs, r = EA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => lB(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = EA(this.functionInvocationScopes, e);
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
    await Ia(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), Q(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new x(
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
    return n.gasPrice = Q(Ot(n.gasPrice) || Ot((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
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
      requiredQuantities: c
    } = await this.getTransactionCost();
    return this.setDefaultTxParams(e, r, n), this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (h) => h.type !== we.Coin
    ), await ((d = this.program.account) == null ? void 0 : d.fund(this.transactionRequest, c, t)), this.transactionRequest.updatePredicateInputs(s), o.forEach((h) => {
      this.transactionRequest.addContractInputAndOutput(he.fromString(h));
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
      he.fromAddressOrString(e),
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
    io(this.program.account, "Wallet is required!"), await this.fundWithRequiredCoins();
    const e = await this.program.account.sendTransaction(
      await this.getTransactionRequest(),
      {
        awaitExecution: !0,
        estimateTxDependencies: !1
      }
    );
    return J0.build(
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
    if (io(this.program.account, "Wallet is required!"), !this.program.account.populateTransactionWitnessesSignature)
      return this.dryRun();
    await this.fundWithRequiredCoins();
    const t = await this.program.account.simulateTransaction(
      await this.getTransactionRequest(),
      {
        estimateTxDependencies: !1
      }
    );
    return Lo.build(this.functionInvocationScopes, t, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    io(this.program.account, "Wallet is required!");
    const e = this.getProvider();
    await this.fundWithRequiredCoins();
    const t = await e.call(await this.getTransactionRequest(), {
      utxoValidation: !1
    });
    return Lo.build(this.functionInvocationScopes, t, this.isMultiCall);
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
      throw new x(
        R.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${n}'.`
      );
    if (!s)
      e.gasPrice = t;
    else if (o.lt(t))
      throw new x(
        R.GAS_PRICE_TOO_LOW,
        `Gas price '${o}' is lower than the required: '${t}'.`
      );
  }
}, Y0 = class extends Z0 {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    D(this, "func");
    D(this, "callParameters");
    D(this, "forward");
    D(this, "args");
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
        throw new x(
          R.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = ba(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, hB = class extends Z0 {
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
        throw new x(
          R.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new x(
        R.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, fB = class {
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
    D(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    D(this, "provider");
    /**
     * The contract's ABI interface.
     */
    D(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    D(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    D(this, "functions", {});
    this.interface = t instanceof bn ? t : new bn(t), this.id = he.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new Y0(this, e, t);
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
}, gB = class extends Y0 {
  constructor() {
    super(...arguments);
    D(this, "scriptRequest");
  }
  updateScriptRequest() {
    this.scriptRequest || this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  buildScriptRequest() {
    const t = this.program.bytes, n = this.program.provider.getChain();
    if (!n)
      throw new x(
        x.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.maxInputs.toNumber(), s = new Ie(t.length).encodedLength;
    this.scriptRequest = new Yr(
      t,
      (i) => this.func.encodeArguments(
        i,
        Yr.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, fC = class extends $g {
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
    D(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    D(this, "interface");
    /**
     * The account associated with the script.
     */
    D(this, "account");
    /**
     * The script request object.
     */
    D(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    D(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    D(this, "functions");
    this.bytes = Z(t), this.interface = new bn(n), this.provider = r.provider, this.account = r, this.functions = {
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
        throw new Error("The script does not have configurable constants to be set");
      Object.entries(t).forEach(([n, r]) => {
        if (!this.interface.configurables[n])
          throw new Error(`The script does not have a configurable constant named: '${n}'`);
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r);
        this.bytes.set(i, s);
      });
    } catch (n) {
      throw new x(
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Yr(
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
function gC(e) {
  return e;
}
var pB = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(pB || {}), mB = Object.defineProperty, wB = (e, t) => {
  for (var n in t)
    mB(e, n, { get: t[n], enumerable: !0 });
}, EB = {};
wB(EB, {
  getContractId: () => j0,
  getContractRoot: () => V0,
  getContractStorageRoot: () => X0,
  hexlifyWithPrefix: () => To
});
var V0 = (e) => {
  const n = Z(e), r = FA(n, 16384);
  return o0(r.map((s) => X(s)));
}, X0 = (e) => {
  const t = new hE();
  return e.forEach(({ key: n, value: r }) => t.update(ke(n), r)), t.root;
}, j0 = (e, t, n) => {
  const r = V0(Z(e));
  return ke(se(["0x4655454C", t, r, n]));
}, To = (e, t = !1) => {
  if (e.startsWith("0x"))
    return X(e);
  if (t)
    return X(`0x${e}`);
  throw new x(x.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, IB = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    D(this, "bytecode");
    D(this, "interface");
    D(this, "provider");
    D(this, "account");
    this.bytecode = Z(e), t instanceof bn ? this.interface = t : this.interface = new bn(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new IB(this.bytecode, this.interface, e);
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
      key: To(c, !0),
      value: To(d, !0)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: Cn(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new x(
        R.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || X0(n.storageSlots), s = j0(this.bytecode, n.salt, r), i = new So({
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
      throw new x(R.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new fB(n, this.interface, this.account);
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = Z(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new x(
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, pC = 9, mC = 3, wC = 9, EC = [
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
], IC = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", xA, yC = typeof process < "u" && ((xA = process == null ? void 0 : process.env) == null ? void 0 : xA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  Or as ASSET_ID_LEN,
  id as AbstractAccount,
  Xg as AbstractAddress,
  jg as AbstractContract,
  od as AbstractProgram,
  $g as AbstractScript,
  TB as AbstractScriptRequest,
  Bi as Account,
  he as Address,
  PI as AddressType,
  pt as ArrayCoder,
  $y as AssertFailedRevertError,
  G as B256Coder,
  Ju as B512Coder,
  Te as BN,
  It as BaseAssetId,
  Ii as BaseTransactionRequest,
  b0 as BaseWalletUnlocked,
  _ as BigNumberCoder,
  _g as BooleanCoder,
  Ie as ByteArrayCoder,
  Ms as ByteCoder,
  jn as CHAIN_IDS,
  Cg as CONTRACT_ID_LEN,
  GB as CONTRACT_MAX_SIZE,
  UI as ChainName,
  eC as ChangeOutputCollisionError,
  ie as Coder,
  pB as Commands,
  fB as Contract,
  IB as ContractFactory,
  EB as ContractUtils,
  So as CreateTransactionRequest,
  wC as DECIMAL_UNITS,
  mC as DEFAULT_MIN_PRECISION,
  pC as DEFAULT_PRECISION,
  Uo as DateTime,
  jB as EmptyRoot,
  Yu as EnumCoder,
  ep as FAILED_ASSERT_EQ_SIGNAL,
  tp as FAILED_ASSERT_SIGNAL,
  Kg as FAILED_REQUIRE_SIGNAL,
  zg as FAILED_SEND_MESSAGE_SIGNAL,
  cd as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  np as FAILED_UNKNOWN_SIGNAL,
  Ys as FUEL_BECH32_HRP_PREFIX,
  yC as FUEL_NETWORK_URL,
  L0 as Fuel,
  Oy as FuelConnector,
  O0 as FuelConnectorEventType,
  Ma as FuelConnectorEventTypes,
  M0 as FuelConnectorMethods,
  J0 as FunctionInvocationResult,
  Y0 as FunctionInvocationScope,
  ro as HDWallet,
  vg as INPUT_COIN_FIXED_SIZE,
  Ts as InputCoder,
  gc as InputCoinCoder,
  Ls as InputContractCoder,
  Tr as InputMessageCoder,
  we as InputType,
  T0 as InstructionSet,
  bn as Interface,
  Lo as InvocationCallResult,
  H0 as InvocationResult,
  wy as Language,
  My as LocalStorage,
  XB as MAX_PREDICATE_DATA_LENGTH,
  VB as MAX_PREDICATE_LENGTH,
  ZB as MAX_SCRIPT_DATA_LENGTH,
  JB as MAX_SCRIPT_LENGTH,
  YB as MAX_STATIC_CONTRACTS,
  HB as MAX_WITNESSES,
  lA as MNEMONIC_SIZES,
  Ny as MemoryStorage,
  Sa as Mnemonic,
  R0 as MnemonicVault,
  hB as MultiCallInvocationScope,
  II as NoWitnessAtIndexError,
  tC as NoWitnessByOwnerError,
  K as NumberCoder,
  TI as OperationName,
  li as OptionCoder,
  mc as OutputChangeCoder,
  Us as OutputCoder,
  pc as OutputCoinCoder,
  Ps as OutputContractCoder,
  Ec as OutputContractCreatedCoder,
  Be as OutputType,
  wc as OutputVariableCoder,
  IC as PANIC_DOC_URL,
  EC as PANIC_REASONS,
  Gs as PoliciesCoder,
  Ut as PolicyType,
  gA as Predicate,
  N0 as PrivateKeyVault,
  $s as Provider,
  Mg as RawSliceCoder,
  wo as ReceiptBurnCoder,
  Ic as ReceiptCallCoder,
  PB as ReceiptCoder,
  Qc as ReceiptLogCoder,
  xc as ReceiptLogDataCoder,
  Hs as ReceiptMessageOutCoder,
  Pr as ReceiptMintCoder,
  Cc as ReceiptPanicCoder,
  yc as ReceiptReturnCoder,
  Bc as ReceiptReturnDataCoder,
  bc as ReceiptRevertCoder,
  Dc as ReceiptScriptResultCoder,
  vc as ReceiptTransferCoder,
  Fc as ReceiptTransferOutCoder,
  ue as ReceiptType,
  Vy as RequireRevertError,
  is as RevertError,
  ua as SCRIPT_FIXED_SIZE,
  fC as Script,
  Yr as ScriptRequest,
  tB as ScriptResultDecoderError,
  er as ScriptTransactionRequest,
  jy as SendMessageRevertError,
  pr as Signer,
  $u as StdStringCoder,
  lC as StorageAbstract,
  Rc as StorageSlotCoder,
  Og as StringCoder,
  hi as StructCoder,
  Qn as TransactionCoder,
  Sc as TransactionCreateCoder,
  _c as TransactionMintCoder,
  Ns as TransactionResponse,
  Nc as TransactionScriptCoder,
  LI as TransactionStatus,
  bt as TransactionType,
  OI as TransactionTypeName,
  Xy as TransferToAddressRevertError,
  Wu as TupleCoder,
  cr as TxPointerCoder,
  UB as UtxoIdCoder,
  _y as Vault,
  qu as VecCoder,
  re as WORD_SIZE,
  Rt as Wallet,
  D0 as WalletLocked,
  Sy as WalletManager,
  vt as WalletUnlocked,
  Js as WitnessCoder,
  Ne as ZeroBytes32,
  pE as addAmountToAsset,
  gr as addOperation,
  Dr as addressify,
  Z as arrayify,
  fI as assembleReceiptByType,
  yi as assembleTransactionSummary,
  io as assert,
  dC as assets,
  Q as bn,
  yn as bufferFromString,
  zB as buildBlockExplorerUrl,
  Ly as cacheFor,
  h0 as calculateMetadataGasForTxCreate,
  f0 as calculateMetadataGasForTxScript,
  zn as calculatePriceWithFactor,
  QI as calculateTransactionFee,
  di as calculateVmTxMemory,
  BB as capitalizeString,
  FA as chunkAndPadBytes,
  cp as clearFirst12BytesFromB256,
  ba as coinQuantityfy,
  se as concat,
  jr as concatBytes,
  gC as createConfig,
  fg as decrypt,
  pg as decryptJsonWalletData,
  bB as defaultChainConfig,
  QB as defaultConsensusKey,
  Ty as deferPromise,
  hC as dispatchFuelConnectorEvent,
  gg as encrypt,
  mg as encryptJsonWalletData,
  ps as english,
  zI as extractBurnedAssetsFromReceipts,
  KI as extractMintedAssetsFromReceipts,
  vB as format,
  xB as formatUnits,
  la as fromBech32,
  mI as gasUsedByInputs,
  cC as getAssetEth,
  AC as getAssetFuel,
  ad as getAssetId,
  cy as getAssetNetwork,
  C0 as getAssetWithNetwork,
  ha as getBytesFromBech32,
  XI as getContractCallOperations,
  WI as getContractCreatedOperations,
  ny as getDecodedLogs,
  ay as getDefaultChainId,
  Zy as getDocs,
  d0 as getGasUsedFromReceipts,
  Ra as getInputAccountAddress,
  SI as getInputContractFromIndex,
  p0 as getInputFromAssetId,
  Da as getInputsByType,
  vI as getInputsByTypes,
  FI as getInputsCoin,
  RI as getInputsCoinAndMessage,
  NI as getInputsContract,
  DI as getInputsMessage,
  Fa as getMaxGas,
  l0 as getMinGas,
  qI as getOperations,
  ss as getOutputsByType,
  kI as getOutputsChange,
  m0 as getOutputsCoin,
  MI as getOutputsContract,
  _I as getOutputsContractCreated,
  nC as getOutputsVariable,
  $I as getPayProducerOperations,
  ky as getPredicateRoot,
  ap as getRandomB256,
  Zr as getReceiptsByType,
  HI as getReceiptsCall,
  JI as getReceiptsMessageOut,
  sC as getReceiptsTransferOut,
  hI as getReceiptsWithMissingData,
  ey as getTransactionStatusName,
  iC as getTransactionSummary,
  oC as getTransactionSummaryFromRequest,
  w0 as getTransactionTypeName,
  aC as getTransactionsSummaries,
  aA as getTransferOperations,
  VI as getWithdrawFromFuelOperations,
  rC as hasSameAssetId,
  Od as hash,
  Ym as hashMessage,
  X as hexlify,
  AI as inputify,
  Eo as isB256,
  xs as isBech32,
  iA as isCoin,
  Io as isEvmAddress,
  KB as isMessage,
  Mc as isPublicKey,
  WB as isRawCoin,
  qB as isRawMessage,
  Na as isType,
  E0 as isTypeCreate,
  GI as isTypeMint,
  I0 as isTypeScript,
  bu as keccak256,
  LB as keyFromPassword,
  Il as max,
  FB as multiply,
  op as normalizeBech32,
  wI as normalizeJSON,
  CB as normalizeString,
  uI as outputify,
  Ap as padFirst12BytesOfEvmAddress,
  tr as processGqlReceipt,
  ty as processGraphqlStatus,
  Cn as randomBytes,
  Bn as resolveGasDependentCosts,
  uC as resolveIconPaths,
  oA as returnZeroScript,
  Wy as revertErrorFactory,
  Cu as scrypt,
  EI as sleep,
  Wg as sortPolicies,
  Fr as stringFromBuffer,
  Oc as toB256,
  Qs as toBech32,
  Jt as toBytes,
  El as toFixed,
  Jo as toHex,
  Ot as toNumber,
  Mt as transactionRequestify,
  Vm as uint64ToBytesBE,
  ly as urlJoin,
  ms as withTimeout,
  bI as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
