var bh = Object.defineProperty;
var Qh = (e, t, n) => t in e ? bh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => (Qh(e, typeof t != "symbol" ? t + "" : t, n), n), so = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Ie = (e, t, n) => (so(e, t, "read from private field"), n ? n.call(e) : t.get(e)), mt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, xt = (e, t, n, r) => (so(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var fn = (e, t, n) => (so(e, t, "access private method"), n);
function KA() {
  return {
    FORC: "0.50.0",
    FUEL_CORE: "0.22.1",
    FUELS: "0.75.0"
  };
}
function gc(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function ra(e, t) {
  const n = gc(e), r = gc(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function xh(e, t) {
  const { major: n } = ra(e, t);
  return n === 0;
}
function vh(e, t) {
  const { minor: n } = ra(e, t);
  return n === 0;
}
function Fh(e, t) {
  const { patch: n } = ra(e, t);
  return n === 0;
}
function Dh(e) {
  const { FUEL_CORE: t } = KA();
  return {
    supportedVersion: t,
    isMajorSupported: xh(e, t),
    isMinorSupported: vh(e, t),
    isPatchSupported: Fh(e, t)
  };
}
var Nh = KA(), Rh = Object.defineProperty, Sh = (e, t, n) => t in e ? Rh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _h = (e, t, n) => (Sh(e, typeof t != "symbol" ? t + "" : t, n), n), N = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e))(N || {}), _s = class extends Error {
  constructor(t, n) {
    super(n);
    D(this, "VERSIONS", Nh);
    D(this, "code");
    this.code = t, this.name = "FuelError";
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new _s(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(N);
    if (!r.includes(n.code))
      throw new _s(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new _s(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, VERSIONS: s } = this;
    return { code: t, name: n, message: r, VERSIONS: s };
  }
}, F = _s;
_h(F, "CODES", N);
var qB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, zA = (e, t) => {
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
  throw new F(N.PARSE_FAILED, "invalid BytesLike value");
}, As = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, ie = (e) => {
  const t = e.map((n) => Z(n));
  return As(t);
}, pc = "0123456789abcdef";
function X(e) {
  const t = Z(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += pc[(s & 240) >> 4] + pc[s & 15];
  }
  return n;
}
var WB = (e) => {
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
    throw new F(N.PARSE_FAILED, r);
  }
  return n;
}, kh = {
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
}, KB = kh, zB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298", ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Oh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function sa(e) {
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
var ia = { exports: {} };
const Lh = {}, Mh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lh
}, Symbol.toStringTag, { value: "Module" })), Th = /* @__PURE__ */ sa(Mh);
ia.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Th.Buffer;
    } catch {
    }
    i.isBN = function(a) {
      return a instanceof i ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === i.wordSize && Array.isArray(a.words);
    }, i.max = function(a, A) {
      return a.cmp(A) > 0 ? a : A;
    }, i.min = function(a, A) {
      return a.cmp(A) < 0 ? a : A;
    }, i.prototype._init = function(a, A, h) {
      if (typeof a == "number")
        return this._initNumber(a, A, h);
      if (typeof a == "object")
        return this._initArray(a, A, h);
      A === "hex" && (A = 16), r(A === (A | 0) && A >= 2 && A <= 36), a = a.toString().replace(/\s+/g, "");
      var m = 0;
      a[0] === "-" && (m++, this.negative = 1), m < a.length && (A === 16 ? this._parseHex(a, m, h) : (this._parseBase(a, A, m), h === "le" && this._initArray(this.toArray(), A, h)));
    }, i.prototype._initNumber = function(a, A, h) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (r(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), h === "le" && this._initArray(this.toArray(), A, h);
    }, i.prototype._initArray = function(a, A, h) {
      if (r(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var f, I, y = 0;
      if (h === "be")
        for (m = a.length - 1, f = 0; m >= 0; m -= 3)
          I = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[f] |= I << y & 67108863, this.words[f + 1] = I >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (h === "le")
        for (m = 0, f = 0; m < a.length; m += 3)
          I = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[f] |= I << y & 67108863, this.words[f + 1] = I >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
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
      var h = c(B, A);
      return A - 1 >= a && (h |= c(B, A - 1) << 4), h;
    }
    i.prototype._parseHex = function(a, A, h) {
      this.length = Math.ceil((a.length - A) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var f = 0, I = 0, y;
      if (h === "be")
        for (m = a.length - 1; m >= A; m -= 2)
          y = d(a, A, m) << f, this.words[I] |= y & 67108863, f >= 18 ? (f -= 18, I += 1, this.words[I] |= y >>> 26) : f += 8;
      else {
        var p = a.length - A;
        for (m = p % 2 === 0 ? A + 1 : A; m < a.length; m += 2)
          y = d(a, A, m) << f, this.words[I] |= y & 67108863, f >= 18 ? (f -= 18, I += 1, this.words[I] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function l(B, a, A, h) {
      for (var m = 0, f = 0, I = Math.min(B.length, A), y = a; y < I; y++) {
        var p = B.charCodeAt(y) - 48;
        m *= h, p >= 49 ? f = p - 49 + 10 : p >= 17 ? f = p - 17 + 10 : f = p, r(p >= 0 && f < h, "Invalid character"), m += f;
      }
      return m;
    }
    i.prototype._parseBase = function(a, A, h) {
      this.words = [0], this.length = 1;
      for (var m = 0, f = 1; f <= 67108863; f *= A)
        m++;
      m--, f = f / A | 0;
      for (var I = a.length - h, y = I % m, p = Math.min(I, I - y) + h, u = 0, w = h; w < p; w += m)
        u = l(a, w, w + m, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var Y = 1;
        for (u = l(a, w, a.length, A), w = 0; w < y; w++)
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
    function E(B, a) {
      B.words = a.words, B.length = a.length, B.negative = a.negative, B.red = a.red;
    }
    if (i.prototype._move = function(a) {
      E(a, this);
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
      var h;
      if (a === 16 || a === "hex") {
        h = "";
        for (var m = 0, f = 0, I = 0; I < this.length; I++) {
          var y = this.words[I], p = ((y << m | f) & 16777215).toString(16);
          f = y >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, I--), f !== 0 || I !== this.length - 1 ? h = C[6 - p.length] + p + h : h = p + h;
        }
        for (f !== 0 && (h = f.toString(16) + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = x[a], w = v[a];
        h = "";
        var Y = this.clone();
        for (Y.negative = 0; !Y.isZero(); ) {
          var V = Y.modrn(w).toString(a);
          Y = Y.idivn(w), Y.isZero() ? h = V + h : h = C[u - V.length] + V + h;
        }
        for (this.isZero() && (h = "0" + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
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
    var b = function(a, A) {
      return a.allocUnsafe ? a.allocUnsafe(A) : new a(A);
    };
    i.prototype.toArrayLike = function(a, A, h) {
      this._strip();
      var m = this.byteLength(), f = h || Math.max(1, m);
      r(m <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var I = b(a, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](I, m), I;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var h = 0, m = 0, f = 0, I = 0; f < this.length; f++) {
        var y = this.words[f] << I | m;
        a[h++] = y & 255, h < a.length && (a[h++] = y >> 8 & 255), h < a.length && (a[h++] = y >> 16 & 255), I === 6 ? (h < a.length && (a[h++] = y >> 24 & 255), m = 0, I = 0) : (m = y >>> 24, I += 2);
      }
      if (h < a.length)
        for (a[h++] = m; h < a.length; )
          a[h++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var h = a.length - 1, m = 0, f = 0, I = 0; f < this.length; f++) {
        var y = this.words[f] << I | m;
        a[h--] = y & 255, h >= 0 && (a[h--] = y >> 8 & 255), h >= 0 && (a[h--] = y >> 16 & 255), I === 6 ? (h >= 0 && (a[h--] = y >> 24 & 255), m = 0, I = 0) : (m = y >>> 24, I += 2);
      }
      if (h >= 0)
        for (a[h--] = m; h >= 0; )
          a[h--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : i.prototype._countBits = function(a) {
      var A = a, h = 0;
      return A >= 4096 && (h += 13, A >>>= 13), A >= 64 && (h += 7, A >>>= 7), A >= 8 && (h += 4, A >>>= 4), A >= 2 && (h += 2, A >>>= 2), h + A;
    }, i.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var A = a, h = 0;
      return A & 8191 || (h += 13, A >>>= 13), A & 127 || (h += 7, A >>>= 7), A & 15 || (h += 4, A >>>= 4), A & 3 || (h += 2, A >>>= 2), A & 1 || h++, h;
    }, i.prototype.bitLength = function() {
      var a = this.words[this.length - 1], A = this._countBits(a);
      return (this.length - 1) * 26 + A;
    };
    function R(B) {
      for (var a = new Array(B.bitLength()), A = 0; A < a.length; A++) {
        var h = A / 26 | 0, m = A % 26;
        a[A] = B.words[h] >>> m & 1;
      }
      return a;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, A = 0; A < this.length; A++) {
        var h = this._zeroBits(this.words[A]);
        if (a += h, h !== 26)
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
      for (var h = 0; h < A.length; h++)
        this.words[h] = this.words[h] & a.words[h];
      return this.length = A.length, this._strip();
    }, i.prototype.iand = function(a) {
      return r((this.negative | a.negative) === 0), this.iuand(a);
    }, i.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, i.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, i.prototype.iuxor = function(a) {
      var A, h;
      this.length > a.length ? (A = this, h = a) : (A = a, h = this);
      for (var m = 0; m < h.length; m++)
        this.words[m] = A.words[m] ^ h.words[m];
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
      var A = Math.ceil(a / 26) | 0, h = a % 26;
      this._expand(A), h > 0 && A--;
      for (var m = 0; m < A; m++)
        this.words[m] = ~this.words[m] & 67108863;
      return h > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - h), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, A) {
      r(typeof a == "number" && a >= 0);
      var h = a / 26 | 0, m = a % 26;
      return this._expand(h + 1), A ? this.words[h] = this.words[h] | 1 << m : this.words[h] = this.words[h] & ~(1 << m), this._strip();
    }, i.prototype.iadd = function(a) {
      var A;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, A = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, A = this.isub(a), a.negative = 1, A._normSign();
      var h, m;
      this.length > a.length ? (h = this, m = a) : (h = a, m = this);
      for (var f = 0, I = 0; I < m.length; I++)
        A = (h.words[I] | 0) + (m.words[I] | 0) + f, this.words[I] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && I < h.length; I++)
        A = (h.words[I] | 0) + f, this.words[I] = A & 67108863, f = A >>> 26;
      if (this.length = h.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (h !== this)
        for (; I < h.length; I++)
          this.words[I] = h.words[I];
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
      var h = this.cmp(a);
      if (h === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var m, f;
      h > 0 ? (m = this, f = a) : (m = a, f = this);
      for (var I = 0, y = 0; y < f.length; y++)
        A = (m.words[y] | 0) - (f.words[y] | 0) + I, I = A >> 26, this.words[y] = A & 67108863;
      for (; I !== 0 && y < m.length; y++)
        A = (m.words[y] | 0) + I, I = A >> 26, this.words[y] = A & 67108863;
      if (I === 0 && y < m.length && m !== this)
        for (; y < m.length; y++)
          this.words[y] = m.words[y];
      return this.length = Math.max(this.length, y), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function S(B, a, A) {
      A.negative = a.negative ^ B.negative;
      var h = B.length + a.length | 0;
      A.length = h, h = h - 1 | 0;
      var m = B.words[0] | 0, f = a.words[0] | 0, I = m * f, y = I & 67108863, p = I / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < h; u++) {
        for (var w = p >>> 26, Y = p & 67108863, V = Math.min(u, a.length - 1), K = Math.max(0, u - B.length + 1); K <= V; K++) {
          var $ = u - K | 0;
          m = B.words[$] | 0, f = a.words[K] | 0, I = m * f + Y, w += I / 67108864 | 0, Y = I & 67108863;
        }
        A.words[u] = Y | 0, p = w | 0;
      }
      return p !== 0 ? A.words[u] = p | 0 : A.length--, A._strip();
    }
    var J = function(a, A, h) {
      var m = a.words, f = A.words, I = h.words, y = 0, p, u, w, Y = m[0] | 0, V = Y & 8191, K = Y >>> 13, $ = m[1] | 0, re = $ & 8191, se = $ >>> 13, Oe = m[2] | 0, ge = Oe & 8191, ae = Oe >>> 13, Re = m[3] | 0, he = Re & 8191, pe = Re >>> 13, zt = m[4] | 0, Se = zt & 8191, Ce = zt >>> 13, Mr = m[5] | 0, Le = Mr & 8191, Ue = Mr >>> 13, ys = m[6] | 0, Je = ys & 8191, Ze = ys >>> 13, nc = m[7] | 0, Ye = nc & 8191, Ve = nc >>> 13, rc = m[8] | 0, Xe = rc & 8191, je = rc >>> 13, sc = m[9] | 0, $e = sc & 8191, qe = sc >>> 13, ic = f[0] | 0, We = ic & 8191, Ke = ic >>> 13, oc = f[1] | 0, ze = oc & 8191, et = oc >>> 13, ac = f[2] | 0, tt = ac & 8191, nt = ac >>> 13, cc = f[3] | 0, rt = cc & 8191, st = cc >>> 13, Ac = f[4] | 0, it = Ac & 8191, ot = Ac >>> 13, uc = f[5] | 0, at = uc & 8191, ct = uc >>> 13, dc = f[6] | 0, At = dc & 8191, ut = dc >>> 13, hc = f[7] | 0, dt = hc & 8191, ht = hc >>> 13, lc = f[8] | 0, lt = lc & 8191, ft = lc >>> 13, fc = f[9] | 0, gt = fc & 8191, pt = fc >>> 13;
      h.negative = a.negative ^ A.negative, h.length = 19, p = Math.imul(V, We), u = Math.imul(V, Ke), u = u + Math.imul(K, We) | 0, w = Math.imul(K, Ke);
      var Pi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, p = Math.imul(re, We), u = Math.imul(re, Ke), u = u + Math.imul(se, We) | 0, w = Math.imul(se, Ke), p = p + Math.imul(V, ze) | 0, u = u + Math.imul(V, et) | 0, u = u + Math.imul(K, ze) | 0, w = w + Math.imul(K, et) | 0;
      var Ui = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, p = Math.imul(ge, We), u = Math.imul(ge, Ke), u = u + Math.imul(ae, We) | 0, w = Math.imul(ae, Ke), p = p + Math.imul(re, ze) | 0, u = u + Math.imul(re, et) | 0, u = u + Math.imul(se, ze) | 0, w = w + Math.imul(se, et) | 0, p = p + Math.imul(V, tt) | 0, u = u + Math.imul(V, nt) | 0, u = u + Math.imul(K, tt) | 0, w = w + Math.imul(K, nt) | 0;
      var Gi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, p = Math.imul(he, We), u = Math.imul(he, Ke), u = u + Math.imul(pe, We) | 0, w = Math.imul(pe, Ke), p = p + Math.imul(ge, ze) | 0, u = u + Math.imul(ge, et) | 0, u = u + Math.imul(ae, ze) | 0, w = w + Math.imul(ae, et) | 0, p = p + Math.imul(re, tt) | 0, u = u + Math.imul(re, nt) | 0, u = u + Math.imul(se, tt) | 0, w = w + Math.imul(se, nt) | 0, p = p + Math.imul(V, rt) | 0, u = u + Math.imul(V, st) | 0, u = u + Math.imul(K, rt) | 0, w = w + Math.imul(K, st) | 0;
      var Hi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, p = Math.imul(Se, We), u = Math.imul(Se, Ke), u = u + Math.imul(Ce, We) | 0, w = Math.imul(Ce, Ke), p = p + Math.imul(he, ze) | 0, u = u + Math.imul(he, et) | 0, u = u + Math.imul(pe, ze) | 0, w = w + Math.imul(pe, et) | 0, p = p + Math.imul(ge, tt) | 0, u = u + Math.imul(ge, nt) | 0, u = u + Math.imul(ae, tt) | 0, w = w + Math.imul(ae, nt) | 0, p = p + Math.imul(re, rt) | 0, u = u + Math.imul(re, st) | 0, u = u + Math.imul(se, rt) | 0, w = w + Math.imul(se, st) | 0, p = p + Math.imul(V, it) | 0, u = u + Math.imul(V, ot) | 0, u = u + Math.imul(K, it) | 0, w = w + Math.imul(K, ot) | 0;
      var Ji = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, p = Math.imul(Le, We), u = Math.imul(Le, Ke), u = u + Math.imul(Ue, We) | 0, w = Math.imul(Ue, Ke), p = p + Math.imul(Se, ze) | 0, u = u + Math.imul(Se, et) | 0, u = u + Math.imul(Ce, ze) | 0, w = w + Math.imul(Ce, et) | 0, p = p + Math.imul(he, tt) | 0, u = u + Math.imul(he, nt) | 0, u = u + Math.imul(pe, tt) | 0, w = w + Math.imul(pe, nt) | 0, p = p + Math.imul(ge, rt) | 0, u = u + Math.imul(ge, st) | 0, u = u + Math.imul(ae, rt) | 0, w = w + Math.imul(ae, st) | 0, p = p + Math.imul(re, it) | 0, u = u + Math.imul(re, ot) | 0, u = u + Math.imul(se, it) | 0, w = w + Math.imul(se, ot) | 0, p = p + Math.imul(V, at) | 0, u = u + Math.imul(V, ct) | 0, u = u + Math.imul(K, at) | 0, w = w + Math.imul(K, ct) | 0;
      var Zi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, p = Math.imul(Je, We), u = Math.imul(Je, Ke), u = u + Math.imul(Ze, We) | 0, w = Math.imul(Ze, Ke), p = p + Math.imul(Le, ze) | 0, u = u + Math.imul(Le, et) | 0, u = u + Math.imul(Ue, ze) | 0, w = w + Math.imul(Ue, et) | 0, p = p + Math.imul(Se, tt) | 0, u = u + Math.imul(Se, nt) | 0, u = u + Math.imul(Ce, tt) | 0, w = w + Math.imul(Ce, nt) | 0, p = p + Math.imul(he, rt) | 0, u = u + Math.imul(he, st) | 0, u = u + Math.imul(pe, rt) | 0, w = w + Math.imul(pe, st) | 0, p = p + Math.imul(ge, it) | 0, u = u + Math.imul(ge, ot) | 0, u = u + Math.imul(ae, it) | 0, w = w + Math.imul(ae, ot) | 0, p = p + Math.imul(re, at) | 0, u = u + Math.imul(re, ct) | 0, u = u + Math.imul(se, at) | 0, w = w + Math.imul(se, ct) | 0, p = p + Math.imul(V, At) | 0, u = u + Math.imul(V, ut) | 0, u = u + Math.imul(K, At) | 0, w = w + Math.imul(K, ut) | 0;
      var Yi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, p = Math.imul(Ye, We), u = Math.imul(Ye, Ke), u = u + Math.imul(Ve, We) | 0, w = Math.imul(Ve, Ke), p = p + Math.imul(Je, ze) | 0, u = u + Math.imul(Je, et) | 0, u = u + Math.imul(Ze, ze) | 0, w = w + Math.imul(Ze, et) | 0, p = p + Math.imul(Le, tt) | 0, u = u + Math.imul(Le, nt) | 0, u = u + Math.imul(Ue, tt) | 0, w = w + Math.imul(Ue, nt) | 0, p = p + Math.imul(Se, rt) | 0, u = u + Math.imul(Se, st) | 0, u = u + Math.imul(Ce, rt) | 0, w = w + Math.imul(Ce, st) | 0, p = p + Math.imul(he, it) | 0, u = u + Math.imul(he, ot) | 0, u = u + Math.imul(pe, it) | 0, w = w + Math.imul(pe, ot) | 0, p = p + Math.imul(ge, at) | 0, u = u + Math.imul(ge, ct) | 0, u = u + Math.imul(ae, at) | 0, w = w + Math.imul(ae, ct) | 0, p = p + Math.imul(re, At) | 0, u = u + Math.imul(re, ut) | 0, u = u + Math.imul(se, At) | 0, w = w + Math.imul(se, ut) | 0, p = p + Math.imul(V, dt) | 0, u = u + Math.imul(V, ht) | 0, u = u + Math.imul(K, dt) | 0, w = w + Math.imul(K, ht) | 0;
      var Vi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, p = Math.imul(Xe, We), u = Math.imul(Xe, Ke), u = u + Math.imul(je, We) | 0, w = Math.imul(je, Ke), p = p + Math.imul(Ye, ze) | 0, u = u + Math.imul(Ye, et) | 0, u = u + Math.imul(Ve, ze) | 0, w = w + Math.imul(Ve, et) | 0, p = p + Math.imul(Je, tt) | 0, u = u + Math.imul(Je, nt) | 0, u = u + Math.imul(Ze, tt) | 0, w = w + Math.imul(Ze, nt) | 0, p = p + Math.imul(Le, rt) | 0, u = u + Math.imul(Le, st) | 0, u = u + Math.imul(Ue, rt) | 0, w = w + Math.imul(Ue, st) | 0, p = p + Math.imul(Se, it) | 0, u = u + Math.imul(Se, ot) | 0, u = u + Math.imul(Ce, it) | 0, w = w + Math.imul(Ce, ot) | 0, p = p + Math.imul(he, at) | 0, u = u + Math.imul(he, ct) | 0, u = u + Math.imul(pe, at) | 0, w = w + Math.imul(pe, ct) | 0, p = p + Math.imul(ge, At) | 0, u = u + Math.imul(ge, ut) | 0, u = u + Math.imul(ae, At) | 0, w = w + Math.imul(ae, ut) | 0, p = p + Math.imul(re, dt) | 0, u = u + Math.imul(re, ht) | 0, u = u + Math.imul(se, dt) | 0, w = w + Math.imul(se, ht) | 0, p = p + Math.imul(V, lt) | 0, u = u + Math.imul(V, ft) | 0, u = u + Math.imul(K, lt) | 0, w = w + Math.imul(K, ft) | 0;
      var Xi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, p = Math.imul($e, We), u = Math.imul($e, Ke), u = u + Math.imul(qe, We) | 0, w = Math.imul(qe, Ke), p = p + Math.imul(Xe, ze) | 0, u = u + Math.imul(Xe, et) | 0, u = u + Math.imul(je, ze) | 0, w = w + Math.imul(je, et) | 0, p = p + Math.imul(Ye, tt) | 0, u = u + Math.imul(Ye, nt) | 0, u = u + Math.imul(Ve, tt) | 0, w = w + Math.imul(Ve, nt) | 0, p = p + Math.imul(Je, rt) | 0, u = u + Math.imul(Je, st) | 0, u = u + Math.imul(Ze, rt) | 0, w = w + Math.imul(Ze, st) | 0, p = p + Math.imul(Le, it) | 0, u = u + Math.imul(Le, ot) | 0, u = u + Math.imul(Ue, it) | 0, w = w + Math.imul(Ue, ot) | 0, p = p + Math.imul(Se, at) | 0, u = u + Math.imul(Se, ct) | 0, u = u + Math.imul(Ce, at) | 0, w = w + Math.imul(Ce, ct) | 0, p = p + Math.imul(he, At) | 0, u = u + Math.imul(he, ut) | 0, u = u + Math.imul(pe, At) | 0, w = w + Math.imul(pe, ut) | 0, p = p + Math.imul(ge, dt) | 0, u = u + Math.imul(ge, ht) | 0, u = u + Math.imul(ae, dt) | 0, w = w + Math.imul(ae, ht) | 0, p = p + Math.imul(re, lt) | 0, u = u + Math.imul(re, ft) | 0, u = u + Math.imul(se, lt) | 0, w = w + Math.imul(se, ft) | 0, p = p + Math.imul(V, gt) | 0, u = u + Math.imul(V, pt) | 0, u = u + Math.imul(K, gt) | 0, w = w + Math.imul(K, pt) | 0;
      var ji = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, p = Math.imul($e, ze), u = Math.imul($e, et), u = u + Math.imul(qe, ze) | 0, w = Math.imul(qe, et), p = p + Math.imul(Xe, tt) | 0, u = u + Math.imul(Xe, nt) | 0, u = u + Math.imul(je, tt) | 0, w = w + Math.imul(je, nt) | 0, p = p + Math.imul(Ye, rt) | 0, u = u + Math.imul(Ye, st) | 0, u = u + Math.imul(Ve, rt) | 0, w = w + Math.imul(Ve, st) | 0, p = p + Math.imul(Je, it) | 0, u = u + Math.imul(Je, ot) | 0, u = u + Math.imul(Ze, it) | 0, w = w + Math.imul(Ze, ot) | 0, p = p + Math.imul(Le, at) | 0, u = u + Math.imul(Le, ct) | 0, u = u + Math.imul(Ue, at) | 0, w = w + Math.imul(Ue, ct) | 0, p = p + Math.imul(Se, At) | 0, u = u + Math.imul(Se, ut) | 0, u = u + Math.imul(Ce, At) | 0, w = w + Math.imul(Ce, ut) | 0, p = p + Math.imul(he, dt) | 0, u = u + Math.imul(he, ht) | 0, u = u + Math.imul(pe, dt) | 0, w = w + Math.imul(pe, ht) | 0, p = p + Math.imul(ge, lt) | 0, u = u + Math.imul(ge, ft) | 0, u = u + Math.imul(ae, lt) | 0, w = w + Math.imul(ae, ft) | 0, p = p + Math.imul(re, gt) | 0, u = u + Math.imul(re, pt) | 0, u = u + Math.imul(se, gt) | 0, w = w + Math.imul(se, pt) | 0;
      var $i = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + ($i >>> 26) | 0, $i &= 67108863, p = Math.imul($e, tt), u = Math.imul($e, nt), u = u + Math.imul(qe, tt) | 0, w = Math.imul(qe, nt), p = p + Math.imul(Xe, rt) | 0, u = u + Math.imul(Xe, st) | 0, u = u + Math.imul(je, rt) | 0, w = w + Math.imul(je, st) | 0, p = p + Math.imul(Ye, it) | 0, u = u + Math.imul(Ye, ot) | 0, u = u + Math.imul(Ve, it) | 0, w = w + Math.imul(Ve, ot) | 0, p = p + Math.imul(Je, at) | 0, u = u + Math.imul(Je, ct) | 0, u = u + Math.imul(Ze, at) | 0, w = w + Math.imul(Ze, ct) | 0, p = p + Math.imul(Le, At) | 0, u = u + Math.imul(Le, ut) | 0, u = u + Math.imul(Ue, At) | 0, w = w + Math.imul(Ue, ut) | 0, p = p + Math.imul(Se, dt) | 0, u = u + Math.imul(Se, ht) | 0, u = u + Math.imul(Ce, dt) | 0, w = w + Math.imul(Ce, ht) | 0, p = p + Math.imul(he, lt) | 0, u = u + Math.imul(he, ft) | 0, u = u + Math.imul(pe, lt) | 0, w = w + Math.imul(pe, ft) | 0, p = p + Math.imul(ge, gt) | 0, u = u + Math.imul(ge, pt) | 0, u = u + Math.imul(ae, gt) | 0, w = w + Math.imul(ae, pt) | 0;
      var qi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, p = Math.imul($e, rt), u = Math.imul($e, st), u = u + Math.imul(qe, rt) | 0, w = Math.imul(qe, st), p = p + Math.imul(Xe, it) | 0, u = u + Math.imul(Xe, ot) | 0, u = u + Math.imul(je, it) | 0, w = w + Math.imul(je, ot) | 0, p = p + Math.imul(Ye, at) | 0, u = u + Math.imul(Ye, ct) | 0, u = u + Math.imul(Ve, at) | 0, w = w + Math.imul(Ve, ct) | 0, p = p + Math.imul(Je, At) | 0, u = u + Math.imul(Je, ut) | 0, u = u + Math.imul(Ze, At) | 0, w = w + Math.imul(Ze, ut) | 0, p = p + Math.imul(Le, dt) | 0, u = u + Math.imul(Le, ht) | 0, u = u + Math.imul(Ue, dt) | 0, w = w + Math.imul(Ue, ht) | 0, p = p + Math.imul(Se, lt) | 0, u = u + Math.imul(Se, ft) | 0, u = u + Math.imul(Ce, lt) | 0, w = w + Math.imul(Ce, ft) | 0, p = p + Math.imul(he, gt) | 0, u = u + Math.imul(he, pt) | 0, u = u + Math.imul(pe, gt) | 0, w = w + Math.imul(pe, pt) | 0;
      var Wi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, p = Math.imul($e, it), u = Math.imul($e, ot), u = u + Math.imul(qe, it) | 0, w = Math.imul(qe, ot), p = p + Math.imul(Xe, at) | 0, u = u + Math.imul(Xe, ct) | 0, u = u + Math.imul(je, at) | 0, w = w + Math.imul(je, ct) | 0, p = p + Math.imul(Ye, At) | 0, u = u + Math.imul(Ye, ut) | 0, u = u + Math.imul(Ve, At) | 0, w = w + Math.imul(Ve, ut) | 0, p = p + Math.imul(Je, dt) | 0, u = u + Math.imul(Je, ht) | 0, u = u + Math.imul(Ze, dt) | 0, w = w + Math.imul(Ze, ht) | 0, p = p + Math.imul(Le, lt) | 0, u = u + Math.imul(Le, ft) | 0, u = u + Math.imul(Ue, lt) | 0, w = w + Math.imul(Ue, ft) | 0, p = p + Math.imul(Se, gt) | 0, u = u + Math.imul(Se, pt) | 0, u = u + Math.imul(Ce, gt) | 0, w = w + Math.imul(Ce, pt) | 0;
      var Ki = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ki >>> 26) | 0, Ki &= 67108863, p = Math.imul($e, at), u = Math.imul($e, ct), u = u + Math.imul(qe, at) | 0, w = Math.imul(qe, ct), p = p + Math.imul(Xe, At) | 0, u = u + Math.imul(Xe, ut) | 0, u = u + Math.imul(je, At) | 0, w = w + Math.imul(je, ut) | 0, p = p + Math.imul(Ye, dt) | 0, u = u + Math.imul(Ye, ht) | 0, u = u + Math.imul(Ve, dt) | 0, w = w + Math.imul(Ve, ht) | 0, p = p + Math.imul(Je, lt) | 0, u = u + Math.imul(Je, ft) | 0, u = u + Math.imul(Ze, lt) | 0, w = w + Math.imul(Ze, ft) | 0, p = p + Math.imul(Le, gt) | 0, u = u + Math.imul(Le, pt) | 0, u = u + Math.imul(Ue, gt) | 0, w = w + Math.imul(Ue, pt) | 0;
      var zi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, p = Math.imul($e, At), u = Math.imul($e, ut), u = u + Math.imul(qe, At) | 0, w = Math.imul(qe, ut), p = p + Math.imul(Xe, dt) | 0, u = u + Math.imul(Xe, ht) | 0, u = u + Math.imul(je, dt) | 0, w = w + Math.imul(je, ht) | 0, p = p + Math.imul(Ye, lt) | 0, u = u + Math.imul(Ye, ft) | 0, u = u + Math.imul(Ve, lt) | 0, w = w + Math.imul(Ve, ft) | 0, p = p + Math.imul(Je, gt) | 0, u = u + Math.imul(Je, pt) | 0, u = u + Math.imul(Ze, gt) | 0, w = w + Math.imul(Ze, pt) | 0;
      var eo = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (eo >>> 26) | 0, eo &= 67108863, p = Math.imul($e, dt), u = Math.imul($e, ht), u = u + Math.imul(qe, dt) | 0, w = Math.imul(qe, ht), p = p + Math.imul(Xe, lt) | 0, u = u + Math.imul(Xe, ft) | 0, u = u + Math.imul(je, lt) | 0, w = w + Math.imul(je, ft) | 0, p = p + Math.imul(Ye, gt) | 0, u = u + Math.imul(Ye, pt) | 0, u = u + Math.imul(Ve, gt) | 0, w = w + Math.imul(Ve, pt) | 0;
      var to = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (to >>> 26) | 0, to &= 67108863, p = Math.imul($e, lt), u = Math.imul($e, ft), u = u + Math.imul(qe, lt) | 0, w = Math.imul(qe, ft), p = p + Math.imul(Xe, gt) | 0, u = u + Math.imul(Xe, pt) | 0, u = u + Math.imul(je, gt) | 0, w = w + Math.imul(je, pt) | 0;
      var no = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (no >>> 26) | 0, no &= 67108863, p = Math.imul($e, gt), u = Math.imul($e, pt), u = u + Math.imul(qe, gt) | 0, w = Math.imul(qe, pt);
      var ro = (y + p | 0) + ((u & 8191) << 13) | 0;
      return y = (w + (u >>> 13) | 0) + (ro >>> 26) | 0, ro &= 67108863, I[0] = Pi, I[1] = Ui, I[2] = Gi, I[3] = Hi, I[4] = Ji, I[5] = Zi, I[6] = Yi, I[7] = Vi, I[8] = Xi, I[9] = ji, I[10] = $i, I[11] = qi, I[12] = Wi, I[13] = Ki, I[14] = zi, I[15] = eo, I[16] = to, I[17] = no, I[18] = ro, y !== 0 && (I[19] = y, h.length++), h;
    };
    Math.imul || (J = S);
    function T(B, a, A) {
      A.negative = a.negative ^ B.negative, A.length = B.length + a.length;
      for (var h = 0, m = 0, f = 0; f < A.length - 1; f++) {
        var I = m;
        m = 0;
        for (var y = h & 67108863, p = Math.min(f, a.length - 1), u = Math.max(0, f - B.length + 1); u <= p; u++) {
          var w = f - u, Y = B.words[w] | 0, V = a.words[u] | 0, K = Y * V, $ = K & 67108863;
          I = I + (K / 67108864 | 0) | 0, $ = $ + y | 0, y = $ & 67108863, I = I + ($ >>> 26) | 0, m += I >>> 26, I &= 67108863;
        }
        A.words[f] = y, h = I, I = m;
      }
      return h !== 0 ? A.words[f] = h : A.length--, A._strip();
    }
    function j(B, a, A) {
      return T(B, a, A);
    }
    i.prototype.mulTo = function(a, A) {
      var h, m = this.length + a.length;
      return this.length === 10 && a.length === 10 ? h = J(this, a, A) : m < 63 ? h = S(this, a, A) : m < 1024 ? h = T(this, a, A) : h = j(this, a, A), h;
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
      for (var h = 0, m = 0; m < this.length; m++) {
        var f = (this.words[m] | 0) * a, I = (f & 67108863) + (h & 67108863);
        h >>= 26, h += f / 67108864 | 0, h += I >>> 26, this.words[m] = I & 67108863;
      }
      return h !== 0 && (this.words[m] = h, this.length++), A ? this.ineg() : this;
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
      for (var h = this, m = 0; m < A.length && A[m] === 0; m++, h = h.sqr())
        ;
      if (++m < A.length)
        for (var f = h.sqr(); m < A.length; m++, f = f.sqr())
          A[m] !== 0 && (h = h.mul(f));
      return h;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, h = (a - A) / 26, m = 67108863 >>> 26 - A << 26 - A, f;
      if (A !== 0) {
        var I = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & m, p = (this.words[f] | 0) - y << A;
          this.words[f] = p | I, I = y >>> 26 - A;
        }
        I && (this.words[f] = I, this.length++);
      }
      if (h !== 0) {
        for (f = this.length - 1; f >= 0; f--)
          this.words[f + h] = this.words[f];
        for (f = 0; f < h; f++)
          this.words[f] = 0;
        this.length += h;
      }
      return this._strip();
    }, i.prototype.ishln = function(a) {
      return r(this.negative === 0), this.iushln(a);
    }, i.prototype.iushrn = function(a, A, h) {
      r(typeof a == "number" && a >= 0);
      var m;
      A ? m = (A - A % 26) / 26 : m = 0;
      var f = a % 26, I = Math.min((a - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, p = h;
      if (m -= I, m = Math.max(0, m), p) {
        for (var u = 0; u < I; u++)
          p.words[u] = this.words[u];
        p.length = I;
      }
      if (I !== 0)
        if (this.length > I)
          for (this.length -= I, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + I];
        else
          this.words[0] = 0, this.length = 1;
      var w = 0;
      for (u = this.length - 1; u >= 0 && (w !== 0 || u >= m); u--) {
        var Y = this.words[u] | 0;
        this.words[u] = w << 26 - f | Y >>> f, w = Y & y;
      }
      return p && w !== 0 && (p.words[p.length++] = w), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(a, A, h) {
      return r(this.negative === 0), this.iushrn(a, A, h);
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
      var A = a % 26, h = (a - A) / 26, m = 1 << A;
      if (this.length <= h)
        return !1;
      var f = this.words[h];
      return !!(f & m);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, h = (a - A) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= h)
        return this;
      if (A !== 0 && h++, this.length = Math.min(h, this.length), A !== 0) {
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
    }, i.prototype._ishlnsubmul = function(a, A, h) {
      var m = a.length + h, f;
      this._expand(m);
      var I, y = 0;
      for (f = 0; f < a.length; f++) {
        I = (this.words[f + h] | 0) + y;
        var p = (a.words[f] | 0) * A;
        I -= p & 67108863, y = (I >> 26) - (p / 67108864 | 0), this.words[f + h] = I & 67108863;
      }
      for (; f < this.length - h; f++)
        I = (this.words[f + h] | 0) + y, y = I >> 26, this.words[f + h] = I & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        I = -(this.words[f] | 0) + y, y = I >> 26, this.words[f] = I & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var h = this.length - a.length, m = this.clone(), f = a, I = f.words[f.length - 1] | 0, y = this._countBits(I);
      h = 26 - y, h !== 0 && (f = f.ushln(h), m.iushln(h), I = f.words[f.length - 1] | 0);
      var p = m.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = p + 1, u.words = new Array(u.length);
        for (var w = 0; w < u.length; w++)
          u.words[w] = 0;
      }
      var Y = m.clone()._ishlnsubmul(f, 1, p);
      Y.negative === 0 && (m = Y, u && (u.words[p] = 1));
      for (var V = p - 1; V >= 0; V--) {
        var K = (m.words[f.length + V] | 0) * 67108864 + (m.words[f.length + V - 1] | 0);
        for (K = Math.min(K / I | 0, 67108863), m._ishlnsubmul(f, K, V); m.negative !== 0; )
          K--, m.negative = 0, m._ishlnsubmul(f, 1, V), m.isZero() || (m.negative ^= 1);
        u && (u.words[V] = K);
      }
      return u && u._strip(), m._strip(), A !== "div" && h !== 0 && m.iushrn(h), {
        div: u || null,
        mod: m
      };
    }, i.prototype.divmod = function(a, A, h) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var m, f, I;
      return this.negative !== 0 && a.negative === 0 ? (I = this.neg().divmod(a, A), A !== "mod" && (m = I.div.neg()), A !== "div" && (f = I.mod.neg(), h && f.negative !== 0 && f.iadd(a)), {
        div: m,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (I = this.divmod(a.neg(), A), A !== "mod" && (m = I.div.neg()), {
        div: m,
        mod: I.mod
      }) : this.negative & a.negative ? (I = this.neg().divmod(a.neg(), A), A !== "div" && (f = I.mod.neg(), h && f.negative !== 0 && f.isub(a)), {
        div: I.div,
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
      var h = A.div.negative !== 0 ? A.mod.isub(a) : A.mod, m = a.ushrn(1), f = a.andln(1), I = h.cmp(m);
      return I < 0 || f === 1 && I === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var h = (1 << 26) % a, m = 0, f = this.length - 1; f >= 0; f--)
        m = (h * m + (this.words[f] | 0)) % a;
      return A ? -m : m;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var h = 0, m = this.length - 1; m >= 0; m--) {
        var f = (this.words[m] | 0) + h * 67108864;
        this.words[m] = f / a | 0, h = f % a;
      }
      return this._strip(), A ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, h = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), I = new i(0), y = new i(1), p = 0; A.isEven() && h.isEven(); )
        A.iushrn(1), h.iushrn(1), ++p;
      for (var u = h.clone(), w = A.clone(); !A.isZero(); ) {
        for (var Y = 0, V = 1; !(A.words[0] & V) && Y < 26; ++Y, V <<= 1)
          ;
        if (Y > 0)
          for (A.iushrn(Y); Y-- > 0; )
            (m.isOdd() || f.isOdd()) && (m.iadd(u), f.isub(w)), m.iushrn(1), f.iushrn(1);
        for (var K = 0, $ = 1; !(h.words[0] & $) && K < 26; ++K, $ <<= 1)
          ;
        if (K > 0)
          for (h.iushrn(K); K-- > 0; )
            (I.isOdd() || y.isOdd()) && (I.iadd(u), y.isub(w)), I.iushrn(1), y.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), m.isub(I), f.isub(y)) : (h.isub(A), I.isub(m), y.isub(f));
      }
      return {
        a: I,
        b: y,
        gcd: h.iushln(p)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, h = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), I = h.clone(); A.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var y = 0, p = 1; !(A.words[0] & p) && y < 26; ++y, p <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            m.isOdd() && m.iadd(I), m.iushrn(1);
        for (var u = 0, w = 1; !(h.words[0] & w) && u < 26; ++u, w <<= 1)
          ;
        if (u > 0)
          for (h.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(I), f.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), m.isub(f)) : (h.isub(A), f.isub(m));
      }
      var Y;
      return A.cmpn(1) === 0 ? Y = m : Y = f, Y.cmpn(0) < 0 && Y.iadd(a), Y;
    }, i.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var A = this.clone(), h = a.clone();
      A.negative = 0, h.negative = 0;
      for (var m = 0; A.isEven() && h.isEven(); m++)
        A.iushrn(1), h.iushrn(1);
      do {
        for (; A.isEven(); )
          A.iushrn(1);
        for (; h.isEven(); )
          h.iushrn(1);
        var f = A.cmp(h);
        if (f < 0) {
          var I = A;
          A = h, h = I;
        } else if (f === 0 || h.cmpn(1) === 0)
          break;
        A.isub(h);
      } while (!0);
      return h.iushln(m);
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
      var A = a % 26, h = (a - A) / 26, m = 1 << A;
      if (this.length <= h)
        return this._expand(h + 1), this.words[h] |= m, this;
      for (var f = m, I = h; f !== 0 && I < this.length; I++) {
        var y = this.words[I] | 0;
        y += f, f = y >>> 26, y &= 67108863, this.words[I] = y;
      }
      return f !== 0 && (this.words[I] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(a) {
      var A = a < 0;
      if (this.negative !== 0 && !A)
        return -1;
      if (this.negative === 0 && A)
        return 1;
      this._strip();
      var h;
      if (this.length > 1)
        h = 1;
      else {
        A && (a = -a), r(a <= 67108863, "Number is too big");
        var m = this.words[0] | 0;
        h = m === a ? 0 : m < a ? -1 : 1;
      }
      return this.negative !== 0 ? -h | 0 : h;
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
      for (var A = 0, h = this.length - 1; h >= 0; h--) {
        var m = this.words[h] | 0, f = a.words[h] | 0;
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
    var O = {
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
      var A = a, h;
      do
        this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), h = A.bitLength();
      while (h > this.n);
      var m = h < this.n ? -1 : A.ucmp(this.p);
      return m === 0 ? (A.words[0] = 0, A.length = 1) : m > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
    }, k.prototype.split = function(a, A) {
      a.iushrn(this.n, 0, A);
    }, k.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function L() {
      k.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(L, k), L.prototype.split = function(a, A) {
      for (var h = 4194303, m = Math.min(a.length, 9), f = 0; f < m; f++)
        A.words[f] = a.words[f];
      if (A.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var I = a.words[9];
      for (A.words[A.length++] = I & h, f = 10; f < a.length; f++) {
        var y = a.words[f] | 0;
        a.words[f - 10] = (y & h) << 4 | I >>> 22, I = y;
      }
      I >>>= 22, a.words[f - 10] = I, I === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, L.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var A = 0, h = 0; h < a.length; h++) {
        var m = a.words[h] | 0;
        A += m * 977, a.words[h] = A & 67108863, A = m * 64 + (A / 67108864 | 0);
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
    function q() {
      k.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(q, k);
    function U() {
      k.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(U, k), U.prototype.imulK = function(a) {
      for (var A = 0, h = 0; h < a.length; h++) {
        var m = (a.words[h] | 0) * 19 + A, f = m & 67108863;
        m >>>= 26, a.words[h] = f, A = m;
      }
      return A !== 0 && (a.words[a.length++] = A), a;
    }, i._prime = function(a) {
      if (O[a])
        return O[a];
      var A;
      if (a === "k256")
        A = new L();
      else if (a === "p224")
        A = new P();
      else if (a === "p192")
        A = new q();
      else if (a === "p25519")
        A = new U();
      else
        throw new Error("Unknown prime " + a);
      return O[a] = A, A;
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
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (E(a, a.umod(this.m)._forceRed(this)), a);
    }, H.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, H.prototype.add = function(a, A) {
      this._verify2(a, A);
      var h = a.add(A);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h._forceRed(this);
    }, H.prototype.iadd = function(a, A) {
      this._verify2(a, A);
      var h = a.iadd(A);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h;
    }, H.prototype.sub = function(a, A) {
      this._verify2(a, A);
      var h = a.sub(A);
      return h.cmpn(0) < 0 && h.iadd(this.m), h._forceRed(this);
    }, H.prototype.isub = function(a, A) {
      this._verify2(a, A);
      var h = a.isub(A);
      return h.cmpn(0) < 0 && h.iadd(this.m), h;
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
        var h = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, h);
      }
      for (var m = this.m.subn(1), f = 0; !m.isZero() && m.andln(1) === 0; )
        f++, m.iushrn(1);
      r(!m.isZero());
      var I = new i(1).toRed(this), y = I.redNeg(), p = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, p).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var w = this.pow(u, m), Y = this.pow(a, m.addn(1).iushrn(1)), V = this.pow(a, m), K = f; V.cmp(I) !== 0; ) {
        for (var $ = V, re = 0; $.cmp(I) !== 0; re++)
          $ = $.redSqr();
        r(re < K);
        var se = this.pow(w, new i(1).iushln(K - re - 1));
        Y = Y.redMul(se), w = se.redSqr(), V = V.redMul(w), K = re;
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
      var h = 4, m = new Array(1 << h);
      m[0] = new i(1).toRed(this), m[1] = a;
      for (var f = 2; f < m.length; f++)
        m[f] = this.mul(m[f - 1], a);
      var I = m[0], y = 0, p = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var w = A.words[f], Y = u - 1; Y >= 0; Y--) {
          var V = w >> Y & 1;
          if (I !== m[0] && (I = this.sqr(I)), V === 0 && y === 0) {
            p = 0;
            continue;
          }
          y <<= 1, y |= V, p++, !(p !== h && (f !== 0 || Y !== 0)) && (I = this.mul(I, m[y]), p = 0, y = 0);
        }
        u = 26;
      }
      return I;
    }, H.prototype.convertTo = function(a) {
      var A = a.umod(this.m);
      return A === a ? A.clone() : A;
    }, H.prototype.convertFrom = function(a) {
      var A = a.clone();
      return A.red = null, A;
    }, i.mont = function(a) {
      return new ee(a);
    };
    function ee(B) {
      H.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, H), ee.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, ee.prototype.convertFrom = function(a) {
      var A = this.imod(a.mul(this.rinv));
      return A.red = null, A;
    }, ee.prototype.imul = function(a, A) {
      if (a.isZero() || A.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var h = a.imul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), I = f;
      return f.cmp(this.m) >= 0 ? I = f.isub(this.m) : f.cmpn(0) < 0 && (I = f.iadd(this.m)), I._forceRed(this);
    }, ee.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var h = a.mul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), I = f;
      return f.cmp(this.m) >= 0 ? I = f.isub(this.m) : f.cmpn(0) < 0 && (I = f.iadd(this.m)), I._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, ye);
})(ia);
var Ph = ia.exports;
const Bs = /* @__PURE__ */ Oh(Ph);
var eu = 9, tu = 3, Co = 9;
function Uh(e, t) {
  const { precision: n = eu, minPrecision: r = tu } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const E = d.match(/.*[1-9]{1}/), g = (E == null ? void 0 : E[0].length) || 0, C = Math.max(r, g);
    d = d.slice(0, C);
  }
  const l = d ? `.${d}` : "";
  return `${c}${l}`;
}
var Ge = class extends Bs {
  constructor(t, n, r) {
    let s = t, i = n;
    Ge.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
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
      throw new F(N.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new F(
        N.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new F(N.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = Co,
      precision: r = eu,
      minPrecision: s = tu
    } = t || {}, i = this.formatUnits(n), o = Uh(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [l = "0"] = o.split(".");
        return `${l}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Co) {
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
    return new Ge(super.sqr().toArray());
  }
  neg() {
    return new Ge(super.neg().toArray());
  }
  abs() {
    return new Ge(super.abs().toArray());
  }
  toTwos(t) {
    return new Ge(super.toTwos(t).toArray());
  }
  fromTwos(t) {
    return new Ge(super.fromTwos(t).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(t, n) {
    const r = super[n](new Ge(t));
    return Ge.isBN(r) ? new Ge(r.toArray()) : r;
  }
  clone() {
    return new Ge(this.toArray());
  }
  mulTo(t, n) {
    const r = new Bs(this.toArray()).mulTo(t, n);
    return new Ge(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new Bs(this.toArray()).egcd(t);
    return {
      a: new Ge(n.toArray()),
      b: new Ge(r.toArray()),
      gcd: new Ge(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new Bs(this.toArray()).divmod(new Ge(t), n, r);
    return {
      div: new Ge(s == null ? void 0 : s.toArray()),
      mod: new Ge(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Ge(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Ge(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Q = (e, t, n) => new Ge(e, t, n);
Q.parseUnits = (e, t = Co) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new F(
      N.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(c);
};
function Gt(e) {
  return Q(e).toNumber();
}
function oa(e, t) {
  return Q(e).toHex(t);
}
function Wt(e, t) {
  return Q(e).toBytes(t);
}
function eC(e, t) {
  return Q(e).formatUnits(t);
}
function tC(e, t) {
  return Q(e).format(t);
}
function Gh(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function nC(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
const Hh = "6.7.1";
function Jh(e, t, n) {
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
function wi(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && Jh(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function tr(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(tr).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return tr(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${tr(n)}: ${tr(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Zh(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${tr(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + tr(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${Hh}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return wi(r, { code: t }), n && Object.assign(r, n), r;
}
function Rr(e, t, n, r) {
  if (!e)
    throw Zh(t, n, r);
}
function Qe(e, t, n, r) {
  Rr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const Yh = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function Vh(e) {
  Rr(Yh.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function Xh(e, t, n) {
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
function Yt(e, t) {
  return Xh(e, t, !1);
}
function jh(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const mc = "0123456789abcdef";
function Sr(e) {
  const t = Yt(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += mc[(s & 240) >> 4] + mc[s & 15];
  }
  return n;
}
function aa(e, t, n) {
  const r = Yt(e);
  return n != null && n > r.length && Rr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), Sr(r.slice(t ?? 0, n ?? r.length));
}
const $h = BigInt(0);
BigInt(1);
const nr = 9007199254740991;
function Gn(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return Qe(Number.isInteger(e), "underflow", t || "value", e), Qe(e >= -nr && e <= nr, "overflow", t || "value", e), BigInt(e);
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
function qh(e, t) {
  const n = Gn(e, t);
  return Rr(n >= $h, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const wc = "0123456789abcdef";
function Wh(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += wc[n >> 4], t += wc[n & 15];
    return BigInt(t);
  }
  return Gn(e);
}
function nu(e, t) {
  switch (typeof e) {
    case "bigint":
      return Qe(e >= -nr && e <= nr, "overflow", t || "value", e), Number(e);
    case "number":
      return Qe(Number.isInteger(e), "underflow", t || "value", e), Qe(e >= -nr && e <= nr, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return nu(BigInt(e), t);
      } catch (n) {
        Qe(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  Qe(!1, "invalid numeric value", t || "value", e);
}
function Kh(e, t) {
  let r = qh(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = nu(t, "width");
    for (Rr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const bo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let Cs = null;
function zh(e) {
  if (Cs == null) {
    Cs = {};
    for (let n = 0; n < bo.length; n++)
      Cs[bo[n]] = BigInt(n);
  }
  const t = Cs[e];
  return Qe(t != null, "invalid base58 value", "letter", e), t;
}
const el = BigInt(0), Qo = BigInt(58);
function ru(e) {
  let t = Wh(Yt(e)), n = "";
  for (; t; )
    n = bo[Number(t % Qo)] + n, t /= Qo;
  return n;
}
function tl(e) {
  let t = el;
  for (let n = 0; n < e.length; n++)
    t *= Qo, t += zh(e[n]);
  return t;
}
function nl(e, t, n, r, s) {
  Qe(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function su(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function rl(e, t, n, r, s) {
  return e === "OVERLONG" ? (Qe(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), su(e, t, n));
}
const sl = Object.freeze({
  error: nl,
  ignore: su,
  replace: rl
});
function il(e, t) {
  t == null && (t = sl.error);
  const n = Yt(e, "bytes"), r = [];
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
    for (let l = 0; l < o; l++) {
      let E = n[s];
      if ((E & 192) != 128) {
        s += t("MISSING_CONTINUE", s, n, r), d = null;
        break;
      }
      d = d << 6 | E & 63, s++;
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
function Ei(e, t) {
  t != null && (Vh(t), e = e.normalize(t));
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
function ol(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Ii(e, t) {
  return ol(il(e, t));
}
function xo(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function al(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function iu(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function cl(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  xo(e.outputLen), xo(e.blockLen);
}
function Al(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function ul(e, t) {
  iu(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const bt = {
  number: xo,
  bool: al,
  bytes: iu,
  hash: cl,
  exists: Al,
  output: ul
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const dl = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), ks = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), en = (e, t) => e << 32 - t | e >>> t, hl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!hl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ll(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function Xn(e) {
  if (typeof e == "string" && (e = ll(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Vs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const fl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function gl(e, t) {
  if (t !== void 0 && (typeof t != "object" || !fl(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function _r(e) {
  const t = (r) => e().update(Xn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function pl(e) {
  const t = (r, s) => e(s).update(Xn(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let ou = class extends Vs {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, bt.hash(t);
    const r = Xn(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Vs))
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
    return bt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    bt.exists(this), bt.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const ca = (e, t, n) => new ou(e, t).update(n).digest();
ca.create = (e, t) => new ou(e, t);
function ml(e, t, n, r) {
  bt.hash(e);
  const s = gl({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (bt.number(i), bt.number(o), bt.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Xn(t), l = Xn(n), E = new Uint8Array(o), g = ca.create(e, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: E, PRF: g, PRFSalt: C };
}
function wl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function El(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = ml(e, t, n, r);
  let l;
  const E = new Uint8Array(4), g = ks(E), C = new Uint8Array(c.outputLen);
  for (let x = 1, v = 0; v < i; x++, v += c.outputLen) {
    const b = o.subarray(v, v + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(E).digestInto(C), b.set(C.subarray(0, b.length));
    for (let R = 1; R < s; R++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return wl(c, d, o, l, C);
}
function Il(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
let Aa = class extends Vs {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ks(this.buffer);
  }
  update(t) {
    bt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Xn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = ks(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    bt.exists(this), bt.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    Il(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ks(t);
    this.get().forEach((d, l) => c.setUint32(4 * l, d, i));
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
const yl = (e, t, n) => e & t ^ ~e & n, Bl = (e, t, n) => e & t ^ e & n ^ t & n, Cl = new Uint32Array([
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
]), gn = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), pn = new Uint32Array(64);
let bl = class extends Aa {
  constructor() {
    super(64, 32, 8, !1), this.A = gn[0] | 0, this.B = gn[1] | 0, this.C = gn[2] | 0, this.D = gn[3] | 0, this.E = gn[4] | 0, this.F = gn[5] | 0, this.G = gn[6] | 0, this.H = gn[7] | 0;
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
      pn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = pn[g - 15], x = pn[g - 2], v = en(C, 7) ^ en(C, 18) ^ C >>> 3, b = en(x, 17) ^ en(x, 19) ^ x >>> 10;
      pn[g] = b + pn[g - 7] + v + pn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: E } = this;
    for (let g = 0; g < 64; g++) {
      const C = en(c, 6) ^ en(c, 11) ^ en(c, 25), x = E + C + yl(c, d, l) + Cl[g] + pn[g] | 0, b = (en(r, 2) ^ en(r, 13) ^ en(r, 22)) + Bl(r, s, i) | 0;
      E = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, l, E);
  }
  roundClean() {
    pn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const ua = _r(() => new bl()), bs = BigInt(2 ** 32 - 1), vo = BigInt(32);
function au(e, t = !1) {
  return t ? { h: Number(e & bs), l: Number(e >> vo & bs) } : { h: Number(e >> vo & bs) | 0, l: Number(e & bs) | 0 };
}
function Ql(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = au(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const xl = (e, t) => BigInt(e >>> 0) << vo | BigInt(t >>> 0), vl = (e, t, n) => e >>> n, Fl = (e, t, n) => e << 32 - n | t >>> n, Dl = (e, t, n) => e >>> n | t << 32 - n, Nl = (e, t, n) => e << 32 - n | t >>> n, Rl = (e, t, n) => e << 64 - n | t >>> n - 32, Sl = (e, t, n) => e >>> n - 32 | t << 64 - n, _l = (e, t) => t, kl = (e, t) => e, Ol = (e, t, n) => e << n | t >>> 32 - n, Ll = (e, t, n) => t << n | e >>> 32 - n, Ml = (e, t, n) => t << n - 32 | e >>> 64 - n, Tl = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Pl(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Ul = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Gl = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, Hl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Jl = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Zl = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Yl = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, ue = {
  fromBig: au,
  split: Ql,
  toBig: xl,
  shrSH: vl,
  shrSL: Fl,
  rotrSH: Dl,
  rotrSL: Nl,
  rotrBH: Rl,
  rotrBL: Sl,
  rotr32H: _l,
  rotr32L: kl,
  rotlSH: Ol,
  rotlSL: Ll,
  rotlBH: Ml,
  rotlBL: Tl,
  add: Pl,
  add3L: Ul,
  add3H: Gl,
  add4L: Hl,
  add4H: Jl,
  add5H: Yl,
  add5L: Zl
}, [Vl, Xl] = ue.split([
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
].map((e) => BigInt(e))), mn = new Uint32Array(80), wn = new Uint32Array(80);
class da extends Aa {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: l, El: E, Fh: g, Fl: C, Gh: x, Gl: v, Hh: b, Hl: R } = this;
    return [t, n, r, s, i, o, c, d, l, E, g, C, x, v, b, R];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d, l, E, g, C, x, v, b, R) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = l | 0, this.El = E | 0, this.Fh = g | 0, this.Fl = C | 0, this.Gh = x | 0, this.Gl = v | 0, this.Hh = b | 0, this.Hl = R | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      mn[T] = t.getUint32(n), wn[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = mn[T - 15] | 0, O = wn[T - 15] | 0, k = ue.rotrSH(j, O, 1) ^ ue.rotrSH(j, O, 8) ^ ue.shrSH(j, O, 7), L = ue.rotrSL(j, O, 1) ^ ue.rotrSL(j, O, 8) ^ ue.shrSL(j, O, 7), P = mn[T - 2] | 0, q = wn[T - 2] | 0, U = ue.rotrSH(P, q, 19) ^ ue.rotrBH(P, q, 61) ^ ue.shrSH(P, q, 6), H = ue.rotrSL(P, q, 19) ^ ue.rotrBL(P, q, 61) ^ ue.shrSL(P, q, 6), ee = ue.add4L(L, H, wn[T - 7], wn[T - 16]), B = ue.add4H(ee, k, U, mn[T - 7], mn[T - 16]);
      mn[T] = B | 0, wn[T] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: l, Dl: E, Eh: g, El: C, Fh: x, Fl: v, Gh: b, Gl: R, Hh: S, Hl: J } = this;
    for (let T = 0; T < 80; T++) {
      const j = ue.rotrSH(g, C, 14) ^ ue.rotrSH(g, C, 18) ^ ue.rotrBH(g, C, 41), O = ue.rotrSL(g, C, 14) ^ ue.rotrSL(g, C, 18) ^ ue.rotrBL(g, C, 41), k = g & x ^ ~g & b, L = C & v ^ ~C & R, P = ue.add5L(J, O, L, Xl[T], wn[T]), q = ue.add5H(P, S, j, k, Vl[T], mn[T]), U = P | 0, H = ue.rotrSH(r, s, 28) ^ ue.rotrBH(r, s, 34) ^ ue.rotrBH(r, s, 39), ee = ue.rotrSL(r, s, 28) ^ ue.rotrBL(r, s, 34) ^ ue.rotrBL(r, s, 39), B = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      S = b | 0, J = R | 0, b = x | 0, R = v | 0, x = g | 0, v = C | 0, { h: g, l: C } = ue.add(l | 0, E | 0, q | 0, U | 0), l = c | 0, E = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = ue.add3L(U, ee, a);
      r = ue.add3H(A, q, H, B), s = A | 0;
    }
    ({ h: r, l: s } = ue.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = ue.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = ue.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h: l, l: E } = ue.add(this.Dh | 0, this.Dl | 0, l | 0, E | 0), { h: g, l: C } = ue.add(this.Eh | 0, this.El | 0, g | 0, C | 0), { h: x, l: v } = ue.add(this.Fh | 0, this.Fl | 0, x | 0, v | 0), { h: b, l: R } = ue.add(this.Gh | 0, this.Gl | 0, b | 0, R | 0), { h: S, l: J } = ue.add(this.Hh | 0, this.Hl | 0, S | 0, J | 0), this.set(r, s, i, o, c, d, l, E, g, C, x, v, b, R, S, J);
  }
  roundClean() {
    mn.fill(0), wn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class jl extends da {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class $l extends da {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const ha = _r(() => new da());
_r(() => new jl());
_r(() => new $l());
function ql() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const Ec = ql();
Ec.crypto || Ec.msCrypto;
function Wl(e) {
  switch (e) {
    case "sha256":
      return ua.create();
    case "sha512":
      return ha.create();
  }
  Qe(!1, "invalid hashing algorithm name", "algorithm", e);
}
function Kl(e, t) {
  const n = { sha256: ua, sha512: ha }[e];
  return Qe(n != null, "invalid hmac algorithm", "algorithm", e), ca.create(n, t);
}
function zl(e, t, n, r, s) {
  const i = { sha256: ua, sha512: ha }[s];
  return Qe(i != null, "invalid pbkdf2 algorithm", "algorithm", s), El(i, e, t, { c: n, dkLen: r });
}
let cu = !1;
const Au = function(e, t, n) {
  return Kl(e, t).update(n).digest();
};
let uu = Au;
function kr(e, t, n) {
  const r = Yt(t, "key"), s = Yt(n, "data");
  return Sr(uu(e, r, s));
}
kr._ = Au;
kr.lock = function() {
  cu = !0;
};
kr.register = function(e) {
  if (cu)
    throw new Error("computeHmac is locked");
  uu = e;
};
Object.freeze(kr);
const [du, hu, lu] = [[], [], []], ef = BigInt(0), Tr = BigInt(1), tf = BigInt(2), nf = BigInt(7), rf = BigInt(256), sf = BigInt(113);
for (let e = 0, t = Tr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], du.push(2 * (5 * r + n)), hu.push((e + 1) * (e + 2) / 2 % 64);
  let s = ef;
  for (let i = 0; i < 7; i++)
    t = (t << Tr ^ (t >> nf) * sf) % rf, t & tf && (s ^= Tr << (Tr << BigInt(i)) - Tr);
  lu.push(s);
}
const [of, af] = ue.split(lu, !0), Ic = (e, t, n) => n > 32 ? ue.rotlBH(e, t, n) : ue.rotlSH(e, t, n), yc = (e, t, n) => n > 32 ? ue.rotlBL(e, t, n) : ue.rotlSL(e, t, n);
function cf(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], E = n[d + 1], g = Ic(l, E, 1) ^ n[c], C = yc(l, E, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = hu[o], d = Ic(s, i, c), l = yc(s, i, c), E = du[o];
      s = e[E], i = e[E + 1], e[E] = d, e[E + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= of[r], e[1] ^= af[r];
  }
  n.fill(0);
}
let fu = class gu extends Vs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, bt.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = dl(this.state);
  }
  keccak() {
    cf(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    bt.exists(this);
    const { blockLen: n, state: r } = this;
    t = Xn(t);
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
    bt.exists(this, !1), bt.bytes(t), this.finish();
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
    return bt.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (bt.output(t, this), this.finished)
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
    return t || (t = new gu(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const Ln = (e, t, n) => _r(() => new fu(t, e, n));
Ln(6, 144, 224 / 8);
Ln(6, 136, 256 / 8);
Ln(6, 104, 384 / 8);
Ln(6, 72, 512 / 8);
Ln(1, 144, 224 / 8);
const Af = Ln(1, 136, 256 / 8);
Ln(1, 104, 384 / 8);
Ln(1, 72, 512 / 8);
const pu = (e, t, n) => pl((r = {}) => new fu(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
pu(31, 168, 128 / 8);
pu(31, 136, 256 / 8);
let mu = !1;
const wu = function(e) {
  return Af(e);
};
let Eu = wu;
function us(e) {
  const t = Yt(e, "data");
  return Sr(Eu(t));
}
us._ = wu;
us.lock = function() {
  mu = !0;
};
us.register = function(e) {
  if (mu)
    throw new TypeError("keccak256 is locked");
  Eu = e;
};
Object.freeze(us);
const uf = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Iu = Uint8Array.from({ length: 16 }, (e, t) => t), df = Iu.map((e) => (9 * e + 5) % 16);
let la = [Iu], fa = [df];
for (let e = 0; e < 4; e++)
  for (let t of [la, fa])
    t.push(t[e].map((n) => uf[n]));
const yu = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), hf = la.map((e, t) => e.map((n) => yu[t][n])), lf = fa.map((e, t) => e.map((n) => yu[t][n])), ff = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), gf = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), Qs = (e, t) => e << t | e >>> 32 - t;
function Bc(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const xs = new Uint32Array(16);
class pf extends Aa {
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
      xs[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, l = this.h3 | 0, E = l, g = this.h4 | 0, C = g;
    for (let x = 0; x < 5; x++) {
      const v = 4 - x, b = ff[x], R = gf[x], S = la[x], J = fa[x], T = hf[x], j = lf[x];
      for (let O = 0; O < 16; O++) {
        const k = Qs(r + Bc(x, i, c, l) + xs[S[O]] + b, T[O]) + g | 0;
        r = g, g = l, l = Qs(c, 10) | 0, c = i, i = k;
      }
      for (let O = 0; O < 16; O++) {
        const k = Qs(s + Bc(v, o, d, E) + xs[J[O]] + R, j[O]) + C | 0;
        s = C, C = E, E = Qs(d, 10) | 0, d = o, o = k;
      }
    }
    this.set(this.h1 + c + E | 0, this.h2 + l + C | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    xs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const mf = _r(() => new pf());
let Bu = !1;
const Cu = function(e) {
  return mf(e);
};
let bu = Cu;
function ds(e) {
  const t = Yt(e, "data");
  return Sr(bu(t));
}
ds._ = Cu;
ds.lock = function() {
  Bu = !0;
};
ds.register = function(e) {
  if (Bu)
    throw new TypeError("ripemd160 is locked");
  bu = e;
};
Object.freeze(ds);
let Qu = !1;
const xu = function(e, t, n, r, s) {
  return zl(e, t, n, r, s);
};
let vu = xu;
function Or(e, t, n, r, s) {
  const i = Yt(e, "password"), o = Yt(t, "salt");
  return Sr(vu(i, o, n, r, s));
}
Or._ = xu;
Or.lock = function() {
  Qu = !0;
};
Or.register = function(e) {
  if (Qu)
    throw new Error("pbkdf2 is locked");
  vu = e;
};
Object.freeze(Or);
const Fu = function(e) {
  return Wl("sha256").update(e).digest();
};
let Du = Fu, Nu = !1;
function Me(e) {
  const t = Yt(e, "data");
  return Sr(Du(t));
}
Me._ = Fu;
Me.lock = function() {
  Nu = !0;
};
Me.register = function(e) {
  if (Nu)
    throw new Error("sha256 is locked");
  Du = e;
};
Object.freeze(Me);
Object.freeze(Me);
const wf = BigInt(0), Ef = BigInt(36);
function Cc(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Yt(us(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const ga = {};
for (let e = 0; e < 10; e++)
  ga[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  ga[String.fromCharCode(65 + e)] = String(10 + e);
const bc = 15;
function If(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => ga[r]).join("");
  for (; t.length >= bc; ) {
    let r = t.substring(0, bc);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const yf = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function Bf(e) {
  e = e.toLowerCase();
  let t = wf;
  for (let n = 0; n < e.length; n++)
    t = t * Ef + yf[e[n]];
  return t;
}
function Cf(e) {
  if (Qe(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = Cc(e);
    return Qe(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Qe(e.substring(2, 4) === If(e), "bad icap checksum", "address", e);
    let t = Bf(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return Cc("0x" + t);
  }
  Qe(!1, "invalid address", "address", e);
}
function io(e, t) {
  return {
    address: Cf(e),
    storageKeys: t.map((n, r) => (Qe(jh(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function bf(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Qe(n.length === 2, "invalid slot set", `value[${r}]`, n), io(n[0], n[1])) : (Qe(n != null && typeof n == "object", "invalid address-slot set", "value", e), io(n.address, n.storageKeys)));
  Qe(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return io(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const Qf = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class hs {
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
    wi(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new hs(this.name);
  }
}
class yi extends hs {
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
      d == null && (d = c), Qe(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), wi(this, s);
  }
  clone() {
    return new yi(this.effectiveBlock, this);
  }
}
class Bi extends hs {
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
    wi(this, {
      address: n || Qf,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new Bi(this.address, this.targetNetwork);
  }
}
var as, cs;
class Ru extends hs {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    mt(this, as, void 0);
    mt(this, cs, void 0);
    xt(this, as, n), xt(this, cs, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return Ie(this, as);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return Ie(this, cs);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
as = new WeakMap(), cs = new WeakMap();
const oo = /* @__PURE__ */ new Map();
var gr, pr, Fn;
const cr = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    mt(this, gr, void 0);
    mt(this, pr, void 0);
    mt(this, Fn, void 0);
    xt(this, gr, t), xt(this, pr, Gn(n)), xt(this, Fn, /* @__PURE__ */ new Map());
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
    return Ie(this, gr);
  }
  set name(t) {
    xt(this, gr, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return Ie(this, pr);
  }
  set chainId(t) {
    xt(this, pr, Gn(t, "chainId"));
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
        return this.chainId === Gn(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === Gn(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === Gn(t.chainId);
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
    return Array.from(Ie(this, Fn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (Ie(this, Fn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return Ie(this, Fn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return Ie(this, Fn).get(t) || null;
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
    const t = new cr(this.name, this.chainId);
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new yi();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = bf(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (vf(), t == null)
      return cr.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = oo.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new cr("unknown", t);
      Qe(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Qe(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new cr(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new Bi(t.ensAddress, t.ensNetwork)), n;
    }
    Qe(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = oo.get(t);
    r && Qe(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), oo.set(t, n);
  }
};
let Jn = cr;
gr = new WeakMap(), pr = new WeakMap(), Fn = new WeakMap();
function Qc(e, t) {
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
function xc(e) {
  return new Ru(e, async (t, n, r) => {
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
        maxFeePerGas: Qc(c.maxFee, 9),
        maxPriorityFeePerGas: Qc(c.maxPriorityFee, 9)
      };
    } catch (i) {
      Rr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function xf(e) {
  return new Ru("data:", async (t, n, r) => {
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
let vc = !1;
function vf() {
  if (vc)
    return;
  vc = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Jn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new Bi(null, r.ensNetwork)), i.attachPlugin(new yi()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Jn.register(t, s), Jn.register(n, s), r.altNames && r.altNames.forEach((i) => {
      Jn.register(i, s);
    });
  }
  e("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), e("ropsten", 3, { ensNetwork: 3 }), e("rinkeby", 4, { ensNetwork: 4 }), e("goerli", 5, { ensNetwork: 5 }), e("kovan", 42, { ensNetwork: 42 }), e("sepolia", 11155111, {}), e("classic", 61, {}), e("classicKotti", 6, {}), e("arbitrum", 42161, {
    ensNetwork: 1
  }), e("arbitrum-goerli", 421613, {}), e("bnb", 56, { ensNetwork: 1 }), e("bnbt", 97, {}), e("linea", 59144, { ensNetwork: 1 }), e("linea-goerli", 59140, {}), e("matic", 137, {
    ensNetwork: 1,
    plugins: [
      xc("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      xc("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      xf(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
function Fo(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Ff(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function Su(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Df(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Fo(e.outputLen), Fo(e.blockLen);
}
function Nf(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Rf(e, t) {
  Su(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Sf = {
  number: Fo,
  bool: Ff,
  bytes: Su,
  hash: Df,
  exists: Nf,
  output: Rf
}, Fe = Sf;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _f = (e) => e instanceof Uint8Array, Os = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Ls = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), tn = (e, t) => e << 32 - t | e >>> t, kf = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!kf)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Of(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function jn(e) {
  if (typeof e == "string" && (e = Of(e)), !_f(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let pa = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Lf = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function _u(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Lf(t)))
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function ma(e) {
  const t = (r) => e().update(jn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Mf(e) {
  const t = (r, s) => e(s).update(jn(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
function Tf(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
let Pf = class extends pa {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ls(this.buffer);
  }
  update(t) {
    Fe.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = jn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Ls(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Fe.exists(this), Fe.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    Tf(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Ls(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, E = this.get();
    if (l > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
      c.setUint32(4 * g, E[g], i);
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
const Uf = (e, t, n) => e & t ^ ~e & n, Gf = (e, t, n) => e & t ^ e & n ^ t & n, Hf = new Uint32Array([
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
]), En = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), In = new Uint32Array(64);
let ku = class extends Pf {
  constructor() {
    super(64, 32, 8, !1), this.A = En[0] | 0, this.B = En[1] | 0, this.C = En[2] | 0, this.D = En[3] | 0, this.E = En[4] | 0, this.F = En[5] | 0, this.G = En[6] | 0, this.H = En[7] | 0;
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
      In[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = In[g - 15], x = In[g - 2], v = tn(C, 7) ^ tn(C, 18) ^ C >>> 3, b = tn(x, 17) ^ tn(x, 19) ^ x >>> 10;
      In[g] = b + In[g - 7] + v + In[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: E } = this;
    for (let g = 0; g < 64; g++) {
      const C = tn(c, 6) ^ tn(c, 11) ^ tn(c, 25), x = E + C + Uf(c, d, l) + Hf[g] + In[g] | 0, b = (tn(r, 2) ^ tn(r, 13) ^ tn(r, 22)) + Gf(r, s, i) | 0;
      E = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, l, E);
  }
  roundClean() {
    In.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class Jf extends ku {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const Ou = ma(() => new ku());
ma(() => new Jf());
let Lu = class extends pa {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Fe.hash(t);
    const r = jn(n);
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
    return Fe.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Fe.exists(this), Fe.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Mu = (e, t, n) => new Lu(e, t).update(n).digest();
Mu.create = (e, t) => new Lu(e, t);
function Zf(e, t, n, r) {
  Fe.hash(e);
  const s = _u({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Fe.number(i), Fe.number(o), Fe.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = jn(t), l = jn(n), E = new Uint8Array(o), g = Mu.create(e, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: E, PRF: g, PRFSalt: C };
}
function Yf(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Tu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Zf(e, t, n, r);
  let l;
  const E = new Uint8Array(4), g = Ls(E), C = new Uint8Array(c.outputLen);
  for (let x = 1, v = 0; v < i; x++, v += c.outputLen) {
    const b = o.subarray(v, v + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(E).digestInto(C), b.set(C.subarray(0, b.length));
    for (let R = 1; R < s; R++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Yf(c, d, o, l, C);
}
const we = (e, t) => e << t | e >>> 32 - t;
function Fc(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], d = e[t++] ^ n[r++], l = e[t++] ^ n[r++], E = e[t++] ^ n[r++], g = e[t++] ^ n[r++], C = e[t++] ^ n[r++], x = e[t++] ^ n[r++], v = e[t++] ^ n[r++], b = e[t++] ^ n[r++], R = e[t++] ^ n[r++], S = e[t++] ^ n[r++], J = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], O = e[t++] ^ n[r++], k = o, L = c, P = d, q = l, U = E, H = g, ee = C, B = x, a = v, A = b, h = R, m = S, f = J, I = T, y = j, p = O;
  for (let u = 0; u < 8; u += 2)
    U ^= we(k + f | 0, 7), a ^= we(U + k | 0, 9), f ^= we(a + U | 0, 13), k ^= we(f + a | 0, 18), A ^= we(H + L | 0, 7), I ^= we(A + H | 0, 9), L ^= we(I + A | 0, 13), H ^= we(L + I | 0, 18), y ^= we(h + ee | 0, 7), P ^= we(y + h | 0, 9), ee ^= we(P + y | 0, 13), h ^= we(ee + P | 0, 18), q ^= we(p + m | 0, 7), B ^= we(q + p | 0, 9), m ^= we(B + q | 0, 13), p ^= we(m + B | 0, 18), L ^= we(k + q | 0, 7), P ^= we(L + k | 0, 9), q ^= we(P + L | 0, 13), k ^= we(q + P | 0, 18), ee ^= we(H + U | 0, 7), B ^= we(ee + H | 0, 9), U ^= we(B + ee | 0, 13), H ^= we(U + B | 0, 18), m ^= we(h + A | 0, 7), a ^= we(m + h | 0, 9), A ^= we(a + m | 0, 13), h ^= we(A + a | 0, 18), f ^= we(p + y | 0, 7), I ^= we(f + p | 0, 9), y ^= we(I + f | 0, 13), p ^= we(y + I | 0, 18);
  s[i++] = o + k | 0, s[i++] = c + L | 0, s[i++] = d + P | 0, s[i++] = l + q | 0, s[i++] = E + U | 0, s[i++] = g + H | 0, s[i++] = C + ee | 0, s[i++] = x + B | 0, s[i++] = v + a | 0, s[i++] = b + A | 0, s[i++] = R + h | 0, s[i++] = S + m | 0, s[i++] = J + f | 0, s[i++] = T + I | 0, s[i++] = j + y | 0, s[i++] = O + p | 0;
}
function ao(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    Fc(n, o, e, t, n, i), c > 0 && (o += 16), Fc(n, i, e, t += 16, n, o);
}
function Vf(e, t, n) {
  const r = _u({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: l, onProgress: E } = r;
  if (Fe.number(s), Fe.number(i), Fe.number(o), Fe.number(c), Fe.number(d), Fe.number(l), E !== void 0 && typeof E != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, C = g / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (g / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const x = g * (s + o);
  if (x > l)
    throw new Error(`Scrypt: parameters too large, ${x} (128 * r * (N + p)) > ${l} (maxmem)`);
  const v = Tu(Ou, e, t, { c: 1, dkLen: g * o }), b = Os(v), R = Os(new Uint8Array(g * s)), S = Os(new Uint8Array(g));
  let J = () => {
  };
  if (E) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let O = 0;
    J = () => {
      O++, E && (!(O % j) || O === T) && E(O / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: C, V: R, B32: b, B: v, tmp: S, blockMixCb: J, asyncTick: d };
}
function Xf(e, t, n, r, s) {
  const i = Tu(Ou, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function jf(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: l, B: E, tmp: g, blockMixCb: C } = Vf(e, t, n);
  for (let x = 0; x < i; x++) {
    const v = c * x;
    for (let b = 0; b < c; b++)
      d[b] = l[v + b];
    for (let b = 0, R = 0; b < r - 1; b++)
      ao(d, R, d, R += c, s), C();
    ao(d, (r - 1) * c, l, v, s), C();
    for (let b = 0; b < r; b++) {
      const R = l[v + c - 16] % r;
      for (let S = 0; S < c; S++)
        g[S] = l[v + S] ^ d[R * c + S];
      ao(g, 0, l, v, s), C();
    }
  }
  return Xf(e, o, E, d, g);
}
Fe.bool;
const Dc = Fe.bytes;
function $f(e) {
  return (t) => (Fe.bytes(t), e(t));
}
(() => {
  const e = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, t = typeof module < "u" && typeof module.require == "function" && module.require.bind(module);
  return {
    node: t && !e ? t("crypto") : void 0,
    web: e
  };
})();
function qf(e, t, n, r, s, i, o) {
  return Dc(e), Dc(t), jf(e, t, { N: n, r: s, p: r, dkLen: i, onProgress: o });
}
const vs = BigInt(2 ** 32 - 1), Do = BigInt(32);
function Pu(e, t = !1) {
  return t ? { h: Number(e & vs), l: Number(e >> Do & vs) } : { h: Number(e >> Do & vs) | 0, l: Number(e & vs) | 0 };
}
function Wf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Pu(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Kf = (e, t) => BigInt(e >>> 0) << Do | BigInt(t >>> 0), zf = (e, t, n) => e >>> n, eg = (e, t, n) => e << 32 - n | t >>> n, tg = (e, t, n) => e >>> n | t << 32 - n, ng = (e, t, n) => e << 32 - n | t >>> n, rg = (e, t, n) => e << 64 - n | t >>> n - 32, sg = (e, t, n) => e >>> n - 32 | t << 64 - n, ig = (e, t) => t, og = (e, t) => e, ag = (e, t, n) => e << n | t >>> 32 - n, cg = (e, t, n) => t << n | e >>> 32 - n, Ag = (e, t, n) => t << n - 32 | e >>> 64 - n, ug = (e, t, n) => e << n - 32 | t >>> 64 - n;
function dg(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const hg = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), lg = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, fg = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), gg = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, pg = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), mg = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, qr = {
  fromBig: Pu,
  split: Wf,
  toBig: Kf,
  shrSH: zf,
  shrSL: eg,
  rotrSH: tg,
  rotrSL: ng,
  rotrBH: rg,
  rotrBL: sg,
  rotr32H: ig,
  rotr32L: og,
  rotlSH: ag,
  rotlSL: cg,
  rotlBH: Ag,
  rotlBL: ug,
  add: dg,
  add3L: hg,
  add3H: lg,
  add4L: fg,
  add4H: gg,
  add5H: mg,
  add5L: pg
}, [Uu, Gu, Hu] = [[], [], []], wg = BigInt(0), Pr = BigInt(1), Eg = BigInt(2), Ig = BigInt(7), yg = BigInt(256), Bg = BigInt(113);
for (let e = 0, t = Pr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Uu.push(2 * (5 * r + n)), Gu.push((e + 1) * (e + 2) / 2 % 64);
  let s = wg;
  for (let i = 0; i < 7; i++)
    t = (t << Pr ^ (t >> Ig) * Bg) % yg, t & Eg && (s ^= Pr << (Pr << BigInt(i)) - Pr);
  Hu.push(s);
}
const [Cg, bg] = qr.split(Hu, !0), Nc = (e, t, n) => n > 32 ? qr.rotlBH(e, t, n) : qr.rotlSH(e, t, n), Rc = (e, t, n) => n > 32 ? qr.rotlBL(e, t, n) : qr.rotlSL(e, t, n);
function Qg(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], E = n[d + 1], g = Nc(l, E, 1) ^ n[c], C = Rc(l, E, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = Gu[o], d = Nc(s, i, c), l = Rc(s, i, c), E = Uu[o];
      s = e[E], i = e[E + 1], e[E] = d, e[E + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= Cg[r], e[1] ^= bg[r];
  }
  n.fill(0);
}
class Ci extends pa {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Fe.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Os(this.state);
  }
  keccak() {
    Qg(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Fe.exists(this);
    const { blockLen: n, state: r } = this;
    t = jn(t);
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
    Fe.exists(this, !1), Fe.bytes(t), this.finish();
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
    return Fe.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Fe.output(t, this), this.finished)
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
    return t || (t = new Ci(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Mn = (e, t, n) => ma(() => new Ci(t, e, n));
Mn(6, 144, 224 / 8);
Mn(6, 136, 256 / 8);
Mn(6, 104, 384 / 8);
Mn(6, 72, 512 / 8);
Mn(1, 144, 224 / 8);
const Sc = Mn(1, 136, 256 / 8);
Mn(1, 104, 384 / 8);
Mn(1, 72, 512 / 8);
const Ju = (e, t, n) => Mf((r = {}) => new Ci(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
Ju(31, 168, 128 / 8);
Ju(31, 136, 256 / 8);
const xg = (() => {
  const e = $f(Sc);
  return e.create = Sc.create, e;
})();
var vg = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return qf(t, n, r, i, s, o);
}, Fg = (e) => xg(e), Ar = (e, t = "base64") => {
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
}, { crypto: bi, btoa: Zu } = globalThis;
if (!bi)
  throw new F(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Zu)
  throw new F(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var No = (e) => bi.getRandomValues(new Uint8Array(e)), Ms = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return Zu(n);
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
}, Yu = "AES-CTR", wa = (e, t) => {
  const n = Ar(String(e).normalize("NFKC"), "utf-8"), r = Or(n, t, 1e5, 32, "sha256");
  return Z(r);
}, Dg = async (e, t) => {
  const n = No(16), r = No(32), s = wa(e, r), i = JSON.stringify(t), o = Ar(i, "utf-8"), c = {
    name: Yu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), l = await crypto.subtle.encrypt(c, d, o);
  return {
    data: Ms(l),
    iv: Ms(n),
    salt: Ms(r)
  };
}, Ng = async (e, t) => {
  const n = Ar(t.iv), r = Ar(t.salt), s = wa(e, r), i = Ar(t.data), o = {
    name: Yu,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), l = new TextDecoder().decode(d);
  try {
    return JSON.parse(l);
  } catch {
    throw new F(N.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Rg = async (e, t, n) => {
  const r = bi.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, Sg = async (e, t, n) => {
  const r = bi.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
}, _g = {
  bufferFromString: Ar,
  stringFromBuffer: Ms,
  decrypt: Ng,
  encrypt: Dg,
  keyFromPassword: wa,
  randomBytes: No,
  scrypt: vg,
  keccak256: Fg,
  decryptJsonWalletData: Sg,
  encryptJsonWalletData: Rg
}, kg = _g, {
  bufferFromString: Rn,
  decrypt: Og,
  encrypt: Lg,
  keyFromPassword: dC,
  randomBytes: _n,
  stringFromBuffer: Hr,
  scrypt: Vu,
  keccak256: Xu,
  decryptJsonWalletData: Mg,
  encryptJsonWalletData: Tg
} = kg, Pg = Object.defineProperty, Ug = (e, t, n) => t in e ? Pg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Qi = (e, t, n) => (Ug(e, typeof t != "symbol" ? t + "" : t, n), n), Gg = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, ju = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, $u = (e, t, n) => (Gg(e, t, "access private method"), n), oe = class {
  constructor(e, t, n) {
    D(this, "name");
    D(this, "type");
    D(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, qu = "u8", Wu = "u16", Ku = "u32", zu = "u64", ed = "raw untyped ptr", td = "raw untyped slice", nd = "bool", rd = "b256", sd = "struct B512", Ea = "enum Option", Ia = "struct Vec", ya = "struct Bytes", Ba = "struct String", id = "str", Ca = /str\[(?<length>[0-9]+)\]/, Xs = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, ba = /^struct (?<name>\w+)$/, Qa = /^enum (?<name>\w+)$/, od = /^\((?<items>.*)\)$/, Hg = /^generic (?<name>\w+)$/, js = "0", Jg = "1", ne = 8, ls = 32, Wr = ls, Zg = ls, Yg = ls, Vg = ne * 4, Xg = ne * 2, xa = 2 ** 32 - 1, xi = ({ maxInputs: e }) => ls + // Tx ID
ne + // Tx size
// Asset ID/Balance coin input pairs
e * (Wr + ne), va = ne + // Identifier
ne + // Gas limit
ne + // Script size
ne + // Script data size
ne + // Policies
ne + // Inputs size
ne + // Outputs size
ne + // Witnesses size
ls, jg = ne + // Identifier
Vg + // Utxo Length
ne + // Output Index
Yg + // Owner
ne + // Amount
Wr + // Asset id
Xg + // TxPointer
ne + // Witnesses index
ne + // Maturity
ne + // Predicate size
ne + // Predicate data size
ne, _ = class extends oe {
  constructor() {
    super("u64", "u64", ne);
  }
  encode(e) {
    let t;
    try {
      t = Wt(e, ne);
    } catch {
      throw new F(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + ne);
    if (n = n.slice(0, ne), n.length !== this.encodedLength)
      throw new F(N.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), t + ne];
  }
}, $g = 3, Qt = $g * ne, qg = 2, _c = qg * ne;
function Mt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([l, E]) => {
      t[parseInt(l, 10) + n] = E;
    });
    const d = Z(o);
    return n += d.byteLength / ne, d;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function ad(e, t, n) {
  if (!e.dynamicData)
    return ie([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * ne, d = new _().encode(
      n + t + r
    );
    s.set(d, c);
    const l = o.dynamicData ? (
      // unpack child dynamic data
      ad(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = ie([s, l]), r += l.byteLength;
  }), s;
}
var cd = (e, t = ne) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Wg = (e) => {
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
}, Kg = (e) => e === Ia || e === ya || e === Ba;
function Rt(e, t, n = () => {
  throw new F(N.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var Kr = (e) => e % ne === 0, Ad = (e) => ne - e % ne, ud = (e) => {
  if (Kr(e.length))
    return e;
  const t = new Uint8Array(ne - e.length % ne);
  return As([e, t]);
}, Et = class extends oe {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    D(this, "coder");
    D(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new F(N.ENCODE_ERROR, "Types/values length mismatch.");
    return Mt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > xa)
      throw new F(N.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, G = class extends oe {
  constructor() {
    super("b256", "b256", ne * 4);
  }
  encode(e) {
    let t;
    try {
      t = Z(e);
    } catch {
      throw new F(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new F(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid b256 byte data size.");
    return [oa(n, 32), t + 32];
  }
}, dd = class extends oe {
  constructor() {
    super("b512", "struct B512", ne * 8);
  }
  encode(e) {
    let t;
    try {
      t = Z(e);
    } catch {
      throw new F(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new F(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid b512 byte data size.");
    return [oa(n, this.encodedLength), t + this.encodedLength];
  }
}, zg = class extends oe {
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
      throw new F(N.ENCODE_ERROR, "Invalid boolean value.");
    const r = Wt(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new F(N.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = Q(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(Q(1)))
      throw new F(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, Ro, hd, $s = class extends oe {
  constructor() {
    super("struct", "struct Bytes", Qt), ju(this, Ro);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new _().encode(Qt), r = $u(this, Ro, hd).call(this, e);
    return n.dynamicData = {
      0: Mt([r])
    }, t.push(n), t.push(new _().encode(r.byteLength)), t.push(new _().encode(e.length)), Mt(t);
  }
  decode(e, t) {
    if (e.length < Qt)
      throw new F(N.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new _().decode(n, 0)[0]).toNumber(), s = e.slice(Qt, Qt + r);
    if (s.length !== r)
      throw new F(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Qt];
  }
};
Ro = /* @__PURE__ */ new WeakSet();
hd = function(e) {
  const t = [Uint8Array.from(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), ie(t);
};
Qi($s, "memorySize", 1);
var ep = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), mr, Dn, di, fd, hi, gd, YA, ld = (YA = class extends oe {
  constructor(t, n) {
    const r = new _(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    mt(this, di);
    mt(this, hi);
    D(this, "name");
    D(this, "coders");
    mt(this, mr, void 0);
    mt(this, Dn, void 0);
    this.name = t, this.coders = n, xt(this, mr, r), xt(this, Dn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return fn(this, di, fd).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new F(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new F(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(Ie(this, Dn) - s.encodedLength);
    return Mt([Ie(this, mr).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < Ie(this, Dn))
      throw new F(N.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new _().decode(t, r);
    const i = Gt(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new F(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = Ie(this, Dn) - c.encodedLength;
    return r += d, [s, r] = c.decode(t, r), ep(this.coders) ? fn(this, hi, gd).call(this, o, r) : [{ [o]: s }, r];
  }
}, mr = new WeakMap(), Dn = new WeakMap(), di = new WeakSet(), fd = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ie(this, Dn) - n.encodedLength);
  return ie([Ie(this, mr).encode(s), i, r]);
}, hi = new WeakSet(), gd = function(t, n) {
  return [t, n];
}, YA), vi = class extends ld {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength - 1)
      throw new F(N.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, z = class extends oe {
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
      n = Wt(t);
    } catch {
      throw new F(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new F(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Wt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Gt(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new F(N.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new F(N.DECODE_ERROR, "Invalid number byte data size.");
    return [Gt(r), n + 8];
  }
}, tp = class extends oe {
  constructor() {
    super("raw untyped slice", "raw untyped slice", _c);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new z("u8", { isSmallBytes: !0 }), r = new _().encode(_c);
    return r.dynamicData = {
      0: Mt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new _().encode(e.length)), Mt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new Et(
      new z("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, So, pd, md = class extends oe {
  constructor() {
    super("struct", "struct String", 1), ju(this, So);
  }
  encode(e) {
    const t = [], n = new _().encode(Qt), r = $u(this, So, pd).call(this, e);
    return n.dynamicData = {
      0: Mt([r])
    }, t.push(n), t.push(new _().encode(r.byteLength)), t.push(new _().encode(e.length)), Mt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new _().decode(n, 0)[0]).toNumber(), s = e.slice(Qt, Qt + r);
    if (s.length !== r)
      throw new F(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [Ii(s), t + Qt];
  }
};
So = /* @__PURE__ */ new WeakSet();
pd = function(e) {
  const t = [Ei(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), ie(t);
};
Qi(md, "memorySize", 1);
var wr, VA, np = (VA = class extends oe {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    D(this, "length");
    mt(this, wr, void 0);
    this.length = t, xt(this, wr, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new F(N.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = Ei(t), r = new Uint8Array(Ie(this, wr));
    return ie([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new F(N.DECODE_ERROR, "Invalid string byte data size.");
    const s = Ii(r), i = Ie(this, wr);
    return [s, n + this.length + i];
  }
}, wr = new WeakMap(), VA), Fi = class extends oe {
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
      if (!(s instanceof vi) && i == null)
        throw new F(
          N.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Kr(o.length) ? o : ud(o);
    });
    return Mt([Mt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), Kr(r) || (r += Ad(r)), i[o] = d, i;
    }, {}), r];
  }
}, wd = class extends oe {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new F(N.ENCODE_ERROR, "Types/values length mismatch.");
    return Mt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return Kr(s.length) ? s : ud(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), Kr(r) || (r += Ad(r)), o;
    }), r];
  }
}, Ed = class extends oe {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Qt);
    D(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _().encode(Qt);
    return r.dynamicData = {
      0: Mt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new _().encode(t.length)), n.push(new _().encode(t.length)), Mt(n);
  }
  decode(t, n) {
    if (t.length < Qt || t.length > xa)
      throw new F(N.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new _().decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Qt, Qt + i);
    if (o.length !== i)
      throw new F(N.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      cd(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + Qt
    ];
  }
}, hn = class {
  constructor(e, t) {
    D(this, "abi");
    D(this, "name");
    D(this, "type");
    D(this, "originalTypeArguments");
    D(this, "components");
    this.abi = e;
    const n = Rt(
      e.types,
      (r) => r.typeId === t.type,
      () => {
        throw new F(
          N.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: t,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = t.name, this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = hn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? hn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new hn(e, o));
    const s = r.reduce(
      (o, c, d) => {
        var E;
        const l = { ...o };
        return l[c] = structuredClone(
          (E = t.typeArguments) == null ? void 0 : E[d]
        ), l;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new hn(e, o));
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
      const s = Rt(e.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Rt(e.types, (o) => o.typeId === s.type);
      if (Hg.test(i.type)) {
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
    return ba.test(this.type) ? "s" : Xs.test(this.type) ? "a" : Qa.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Ca.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Xs.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new hn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function qs(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Kn = (e, t) => {
  var d, l, E, g, C, x;
  switch (e.type) {
    case qu:
    case Wu:
    case Ku:
      return new z(e.type, t);
    case zu:
    case ed:
      return new _();
    case td:
      return new tp();
    case nd:
      return new zg(t);
    case rd:
      return new G();
    case sd:
      return new dd();
    case ya:
      return new $s();
    case Ba:
      return new md();
  }
  const n = (d = Ca.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new np(v);
  }
  const r = e.components, s = (l = Xs.exec(e.type)) == null ? void 0 : l.groups;
  if (s) {
    const v = parseInt(s.length, 10), b = r[0];
    if (!b)
      throw new F(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = Kn(b, { isSmallBytes: !0 });
    return new Et(R, v);
  }
  if (e.type === Ia) {
    const v = (E = Rt(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : E[0];
    if (!v)
      throw new F(
        N.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const b = new hn(e.abi, v), R = Kn(b, { isSmallBytes: !0, encoding: js });
    return new Ed(R);
  }
  const i = (g = ba.exec(e.type)) == null ? void 0 : g.groups;
  if (i) {
    const v = qs(r, { isRightPadded: !0, getCoder: Kn });
    return new Fi(i.name, v);
  }
  const o = (C = Qa.exec(e.type)) == null ? void 0 : C.groups;
  if (o) {
    const v = qs(r, { getCoder: Kn });
    return e.type === Ea ? new vi(o.name, v) : new ld(o.name, v);
  }
  if ((x = od.exec(e.type)) == null ? void 0 : x.groups) {
    const v = r.map(
      (b) => Kn(b, { isRightPadded: !0, encoding: js })
    );
    return new wd(v);
  }
  throw e.type === id ? new F(
    N.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new F(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, rp = class extends oe {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new F(N.ENCODE_ERROR, "Invalid boolean value.");
    return Wt(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid boolean data size.");
    const n = Q(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(Q(1)))
      throw new F(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, Id = class extends oe {
  constructor() {
    super("struct", "struct Bytes", ne);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    const t = new Uint8Array(e), n = new _().encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ne)
      throw new F(N.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new F(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
Qi(Id, "memorySize", 1);
var sp = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Er, Ir, li, yd, fi, Bd, XA, ip = (XA = class extends oe {
  constructor(t, n) {
    const r = new _(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    mt(this, li);
    mt(this, fi);
    D(this, "name");
    D(this, "coders");
    mt(this, Er, void 0);
    mt(this, Ir, void 0);
    this.name = t, this.coders = n, xt(this, Er, r), xt(this, Ir, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return fn(this, li, yd).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new F(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new F(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...Ie(this, Er).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < Ie(this, Ir))
      throw new F(N.DECODE_ERROR, "Invalid enum data size.");
    const r = new _().decode(t, n)[0], s = Gt(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new F(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + ne, [d, l] = o.decode(t, c);
    return sp(this.coders) ? fn(this, fi, Bd).call(this, i, l) : [{ [i]: d }, l];
  }
}, Er = new WeakMap(), Ir = new WeakMap(), li = new WeakSet(), yd = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Ie(this, Ir) - n.encodedLength);
  return ie([Ie(this, Er).encode(s), i, r]);
}, fi = new WeakSet(), Bd = function(t, n) {
  return [t, n];
}, XA), op = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new F(N.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, _o = class extends oe {
  constructor(t) {
    const n = op(t);
    super("number", t, n);
    D(this, "length");
    D(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Wt(t);
    } catch {
      throw new F(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new F(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Wt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid number byte data size.");
    return [Gt(r), n + this.length];
  }
}, ap = class extends oe {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ne);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    const n = new Et(new _o("u8"), e.length).encode(e), r = new _().encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new F(N.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new Et(new _o("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, Cd = class extends oe {
  constructor() {
    super("struct", "struct String", ne);
  }
  encode(e) {
    const t = Ei(e), n = new _().encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new F(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [Ii(i), n + s];
  }
};
Qi(Cd, "memorySize", 1);
var cp = class extends oe {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new F(N.ENCODE_ERROR, "Value length mismatch during encode.");
    return Ei(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid string byte data size.");
    return [Ii(n), t + this.encodedLength];
  }
}, Ap = class extends oe {
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
    return As(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof vi) && s == null)
          throw new F(
            N.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, up = class extends oe {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new F(N.ENCODE_ERROR, "Types/values length mismatch.");
    return As(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new F(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, dp = class extends oe {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ne);
    D(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new F(N.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new _().encode(t.length);
    return new Uint8Array([...r, ...As(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > xa)
      throw new F(N.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ne, s = t.slice(n, r), o = Q(new _().decode(s, 0)[0]).toNumber() * this.coder.encodedLength, c = t.slice(r, r + o);
    if (c.length !== o)
      throw new F(N.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      cd(c, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, zn = (e, t) => {
  var d, l, E, g, C, x;
  switch (e.type) {
    case qu:
    case Wu:
    case Ku:
      return new _o(e.type);
    case zu:
    case ed:
      return new _();
    case td:
      return new ap();
    case nd:
      return new rp();
    case rd:
      return new G();
    case sd:
      return new dd();
    case ya:
      return new Id();
    case Ba:
      return new Cd();
  }
  const n = (d = Ca.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new cp(v);
  }
  const r = e.components, s = (l = Xs.exec(e.type)) == null ? void 0 : l.groups;
  if (s) {
    const v = parseInt(s.length, 10), b = r[0];
    if (!b)
      throw new F(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const R = zn(b);
    return new Et(R, v);
  }
  if (e.type === Ia) {
    const v = (E = Rt(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : E[0];
    if (!v)
      throw new F(
        N.INVALID_COMPONENT,
        "The provided Vec type is missing the 'type argument'."
      );
    const b = new hn(e.abi, v), R = zn(b);
    return new dp(R);
  }
  const i = (g = ba.exec(e.type)) == null ? void 0 : g.groups;
  if (i) {
    const v = qs(r, { isRightPadded: !0, getCoder: zn });
    return new Ap(i.name, v);
  }
  const o = (C = Qa.exec(e.type)) == null ? void 0 : C.groups;
  if (o) {
    const v = qs(r, { getCoder: zn });
    return e.type === Ea ? new vi(o.name, v) : new ip(o.name, v);
  }
  if ((x = od.exec(e.type)) == null ? void 0 : x.groups) {
    const v = r.map(
      (b) => zn(b)
    );
    return new up(v);
  }
  throw e.type === id ? new F(
    N.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new F(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function hp(e = js) {
  switch (e) {
    case Jg:
      return zn;
    case js:
      return Kn;
    default:
      throw new F(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var rr = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new hn(e, t);
    return hp(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, gi, bd, pi, Qd, mi, xd, jA, Ts = (jA = class {
  constructor(e, t) {
    mt(this, gi);
    mt(this, pi);
    mt(this, mi);
    D(this, "signature");
    D(this, "selector");
    D(this, "name");
    D(this, "jsonFn");
    D(this, "attributes");
    D(this, "isInputDataPointer");
    D(this, "outputMetadata");
    D(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Rt(this.jsonAbi.functions, (n) => n.name === t), this.name = t, this.signature = Ts.getSignature(this.jsonAbi, this.jsonFn), this.selector = Ts.getFunctionSelector(this.signature), this.isInputDataPointer = fn(this, gi, bd).call(this), this.outputMetadata = {
      isHeapType: fn(this, pi, Qd).call(this),
      encodedLength: fn(this, mi, xd).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new hn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Me(Rn(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    Ts.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = this.jsonFn.inputs.filter(
      (c) => Rt(this.jsonAbi.types, (d) => d.typeId === c.type).type !== "()"
    );
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (c) => rr.getCoder(this.jsonAbi, c, {
        isRightPadded: r.length > 1
      })
    ), o = new wd(s).encode(n);
    return ad(o, t, o.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Rt(n.types, (c) => c.typeId === o.type)), s = r.filter(
      (o) => o.type === Ea || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new F(N.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = Z(e), n = this.jsonFn.inputs.filter(
      (s) => Rt(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new F(
        N.DECODE_ERROR,
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
        const o = rr.getCoder(this.jsonAbi, i), [c, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Rt(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    ).type === "()")
      return [void 0, 0];
    const n = Z(e);
    return rr.getCoder(this.jsonAbi, this.jsonFn.output).decode(n, 0);
  }
}, gi = new WeakSet(), bd = function() {
  var t;
  const e = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Wg(((t = e[0]) == null ? void 0 : t.type) || "");
}, pi = new WeakSet(), Qd = function() {
  const e = Rt(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);
  return Kg((e == null ? void 0 : e.type) || "");
}, mi = new WeakSet(), xd = function() {
  try {
    const e = rr.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof Ed ? e.coder.encodedLength : e instanceof $s ? $s.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, jA), kn = class {
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
      this.jsonAbi.functions.map((t) => [t.name, new Ts(this.jsonAbi, t.name)])
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
    throw new F(
      N.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    const n = typeof e == "string" ? this.getFunction(e) : e;
    if (!n)
      throw new F(N.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    const r = typeof e == "string" ? this.getFunction(e) : e;
    if (!r)
      throw new F(N.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t, n) {
    if (this.externalLoggedTypes[n])
      return this.externalLoggedTypes[n].decodeLog(e, t, n);
    const { loggedType: s } = Rt(this.jsonAbi.loggedTypes, (i) => i.logId === t);
    return rr.decode(this.jsonAbi, s, Z(e), 0, {
      encoding: this.jsonAbi.encoding
    });
  }
  updateExternalLoggedTypes(e, t) {
    this.externalLoggedTypes[e] = t;
  }
  encodeConfigurable(e, t) {
    const n = Rt(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new F(
          N.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return rr.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return Rt(
      this.jsonAbi.types,
      (t) => t.typeId === e,
      () => {
        throw new F(
          N.TYPE_NOT_FOUND,
          `Type with typeId '${e}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, hC = class {
}, lp = class {
}, vd = class {
}, Fd = class {
}, fp = class extends Fd {
}, gp = class extends Fd {
}, Nn, $A, Be = ($A = class extends oe {
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
    mt(this, Nn, void 0);
    this.length = t, xt(this, Nn, n);
  }
  encode(t) {
    const n = [], r = Z(t);
    return n.push(r), Ie(this, Nn) && n.push(new Uint8Array(Ie(this, Nn))), ie(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [X(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Ie(this, Nn) && ([r, s] = [null, s + Ie(this, Nn)]), [i, s];
  }
}, Nn = new WeakMap(), $A), yr = class extends Fi {
  constructor() {
    super("TxPointer", {
      blockHeight: new z("u32"),
      txIndex: new z("u16")
    });
  }
}, Ee = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Ee || {}), kc = class extends oe {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new yr().encode(e.txPointer)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new z("u32").encode(e.maturity)), t.push(new _().encode(e.predicateGasUsed)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new Be(e.predicateLength).encode(e.predicate)), t.push(new Be(e.predicateDataLength).encode(e.predicateData)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
    const c = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new yr().decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const E = Number(n);
    [n, r] = new z("u32").decode(e, r);
    const g = n;
    [n, r] = new _().decode(e, r);
    const C = n;
    [n, r] = new z("u32").decode(e, r);
    const x = n;
    [n, r] = new z("u32").decode(e, r);
    const v = n;
    [n, r] = new Be(x).decode(e, r);
    const b = n;
    return [n, r] = new Be(v).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: d,
        txPointer: l,
        witnessIndex: E,
        maturity: g,
        predicateGasUsed: C,
        predicateLength: x,
        predicateDataLength: v,
        predicate: b,
        predicateData: n
      },
      r
    ];
  }
}, Ws = class extends oe {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new yr().encode(e.txPointer)), t.push(new G().encode(e.contractID)), ie(t);
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
    const c = n;
    [n, r] = new yr().decode(e, r);
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
}, zr = class extends oe {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Be(32).encode(e.sender)), t.push(new Be(32).encode(e.recipient)), t.push(new Be(32).encode(e.nonce)), t.push(new _().encode(e.amount)), t.push(Z(e.data || "0x")), Me(ie(t));
  }
  static encodeData(e) {
    const t = Z(e || "0x"), n = t.length;
    return new Be(n).encode(t);
  }
  encode(e) {
    const t = [], n = zr.encodeData(e.data);
    return t.push(new Be(32).encode(e.sender)), t.push(new Be(32).encode(e.recipient)), t.push(new _().encode(e.amount)), t.push(new Be(32).encode(e.nonce)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new _().encode(e.predicateGasUsed)), t.push(new z("u32").encode(n.length)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new Be(n.length).encode(n)), t.push(new Be(e.predicateLength).encode(e.predicate)), t.push(new Be(e.predicateDataLength).encode(e.predicateData)), ie(t);
  }
  static decodeData(e) {
    const t = Z(e), n = t.length, [r] = new Be(n).decode(t, 0);
    return Z(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new z("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new _().decode(e, r);
    const l = n;
    [n, r] = new z("u32").decode(e, r);
    const E = n;
    [n, r] = new z("u32").decode(e, r);
    const g = n;
    [n, r] = new z("u32").decode(e, r);
    const C = n;
    [n, r] = new Be(E).decode(e, r);
    const x = n;
    [n, r] = new Be(g).decode(e, r);
    const v = n;
    return [n, r] = new Be(C).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: c,
        predicateGasUsed: l,
        dataLength: E,
        predicateLength: g,
        predicateDataLength: C,
        data: x,
        predicate: v,
        predicateData: n
      },
      r
    ];
  }
}, Ks = class extends oe {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new kc().encode(e));
        break;
      }
      case 1: {
        t.push(new Ws().encode(e));
        break;
      }
      case 2: {
        t.push(new zr().encode(e));
        break;
      }
      default:
        throw new F(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new kc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ws().decode(e, r), [n, r];
      case 2:
        return [n, r] = new zr().decode(e, r), [n, r];
      default:
        throw new F(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(be || {}), Oc = class extends oe {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
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
}, zs = class extends oe {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u8").encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), ie(t);
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
}, Lc = class extends oe {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
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
}, Mc = class extends oe {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
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
}, Tc = class extends oe {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.contractId)), t.push(new G().encode(e.stateRoot)), ie(t);
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
}, ei = class extends oe {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Oc().encode(e));
        break;
      }
      case 1: {
        t.push(new zs().encode(e));
        break;
      }
      case 2: {
        t.push(new Lc().encode(e));
        break;
      }
      case 3: {
        t.push(new Mc().encode(e));
        break;
      }
      case 4: {
        t.push(new Tc().encode(e));
        break;
      }
      default:
        throw new F(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Oc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new zs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Lc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Mc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Tc().decode(e, r), [n, r];
      default:
        throw new F(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, jt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(jt || {}), pp = (e) => e.sort((t, n) => t.type - n.type);
function mp(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new F(
        N.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var ti = class extends oe {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    mp(e);
    const t = pp(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new _().encode(r));
          break;
        case 4:
          n.push(new z("u32").encode(r));
          break;
        default:
          throw new F(N.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), ie(n);
  }
  decode(e, t, n) {
    let r = t;
    const s = [];
    if (n & 1) {
      const [i, o] = new _().decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new _().decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new z("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new _().decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, de = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(de || {}), Pc = class extends oe {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _().encode(e.gas)), t.push(new _().encode(e.param1)), t.push(new _().encode(e.param2)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n;
    [n, r] = new _().decode(e, r);
    const l = n;
    [n, r] = new _().decode(e, r);
    const E = n;
    [n, r] = new _().decode(e, r);
    const g = n;
    return [n, r] = new _().decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: d,
        param1: l,
        param2: E,
        pc: g,
        is: n
      },
      r
    ];
  }
}, Uc = class extends oe {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    return [n, r] = new _().decode(e, r), [
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
}, Gc = class extends oe {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.ptr)), t.push(new _().encode(e.len)), t.push(new G().encode(e.digest)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n;
    return [n, r] = new _().decode(e, r), [
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
}, Hc = class extends oe {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.reason)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), t.push(new G().encode(e.contractId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
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
}, Jc = class extends oe {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    return [n, r] = new _().decode(e, r), [
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
}, Zc = class extends oe {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val0)), t.push(new _().encode(e.val1)), t.push(new _().encode(e.val2)), t.push(new _().encode(e.val3)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n;
    [n, r] = new _().decode(e, r);
    const l = n;
    return [n, r] = new _().decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: c,
        val3: d,
        pc: l,
        is: n
      },
      r
    ];
  }
}, Yc = class extends oe {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val0)), t.push(new _().encode(e.val1)), t.push(new _().encode(e.ptr)), t.push(new _().encode(e.len)), t.push(new G().encode(e.digest)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new _().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const l = n;
    [n, r] = new _().decode(e, r);
    const E = n;
    return [n, r] = new _().decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: d,
        digest: l,
        pc: E,
        is: n
      },
      r
    ];
  }
}, Vc = class extends oe {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n;
    return [n, r] = new _().decode(e, r), [
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
}, Xc = class extends oe {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n;
    return [n, r] = new _().decode(e, r), [
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
}, jc = class extends oe {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _().encode(e.result)), t.push(new _().encode(e.gasUsed)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new _().decode(e, r);
    const s = n;
    return [n, r] = new _().decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, ni = class extends oe {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Be(32).encode(e.sender)), t.push(new Be(32).encode(e.recipient)), t.push(new Be(32).encode(e.nonce)), t.push(new _().encode(e.amount)), t.push(Z(e.data || "0x")), Me(ie(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new z("u16").encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new Be(e.data.length).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new z("u16").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const l = n;
    [n, r] = new Be(d).decode(e, r);
    const E = Z(n), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: l,
      data: E
    };
    return g.messageId = ni.getMessageId(g), [g, r];
  }
}, Dd = (e, t) => {
  const n = Z(e), r = Z(t);
  return Me(ie([n, r]));
}, es = class extends oe {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return Dd(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n, l = es.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: d,
      assetId: l
    }, r];
  }
}, ko = class extends oe {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return Dd(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new _().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
    const c = n;
    [n, r] = new _().decode(e, r);
    const d = n, l = es.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: d,
      assetId: l
    }, r];
  }
}, lC = class extends oe {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Pc().encode(e));
        break;
      }
      case 1: {
        t.push(new Uc().encode(e));
        break;
      }
      case 2: {
        t.push(new Gc().encode(e));
        break;
      }
      case 3: {
        t.push(new Hc().encode(e));
        break;
      }
      case 4: {
        t.push(new Jc().encode(e));
        break;
      }
      case 5: {
        t.push(new Zc().encode(e));
        break;
      }
      case 6: {
        t.push(new Yc().encode(e));
        break;
      }
      case 7: {
        t.push(new Vc().encode(e));
        break;
      }
      case 8: {
        t.push(new Xc().encode(e));
        break;
      }
      case 9: {
        t.push(new jc().encode(e));
        break;
      }
      case 10: {
        t.push(new ni().encode(e));
        break;
      }
      case 11: {
        t.push(new es().encode(e));
        break;
      }
      case 12: {
        t.push(new ko().encode(e));
        break;
      }
      default:
        throw new F(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Pc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Uc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Gc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Hc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Jc().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Zc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Yc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new Vc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Xc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new jc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new ni().decode(e, r), [n, r];
      case 11:
        return [n, r] = new es().decode(e, r), [n, r];
      case 12:
        return [n, r] = new ko().decode(e, r), [n, r];
      default:
        throw new F(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, $c = class extends Fi {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, ri = class extends oe {
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
    return t.push(new z("u32").encode(e.dataLength)), t.push(new Be(e.dataLength).encode(e.data)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u32").decode(e, r);
    const s = n;
    return [n, r] = new Be(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, vt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(vt || {}), qc = class extends oe {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _().encode(e.scriptGasLimit)), t.push(new z("u32").encode(e.scriptLength)), t.push(new z("u32").encode(e.scriptDataLength)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new Be(e.scriptLength).encode(e.script)), t.push(new Be(e.scriptDataLength).encode(e.scriptData)), t.push(new ti().encode(e.policies)), t.push(new Et(new Ks(), e.inputsCount).encode(e.inputs)), t.push(new Et(new ei(), e.outputsCount).encode(e.outputs)), t.push(new Et(new ri(), e.witnessesCount).encode(e.witnesses)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new _().decode(e, r);
    const s = n;
    [n, r] = new z("u32").decode(e, r);
    const i = n;
    [n, r] = new z("u32").decode(e, r);
    const o = n;
    [n, r] = new z("u32").decode(e, r);
    const c = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const E = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Be(i).decode(e, r);
    const C = n;
    [n, r] = new Be(o).decode(e, r);
    const x = n;
    [n, r] = new ti().decode(e, r, c);
    const v = n;
    [n, r] = new Et(new Ks(), d).decode(e, r);
    const b = n;
    [n, r] = new Et(new ei(), l).decode(e, r);
    const R = n;
    return [n, r] = new Et(new ri(), E).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: c,
        inputsCount: d,
        outputsCount: l,
        witnessesCount: E,
        receiptsRoot: g,
        script: C,
        scriptData: x,
        policies: v,
        inputs: b,
        outputs: R,
        witnesses: n
      },
      r
    ];
  }
}, Wc = class extends oe {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u32").encode(e.bytecodeLength)), t.push(new z("u8").encode(e.bytecodeWitnessIndex)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u16").encode(e.storageSlotsCount)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new ti().encode(e.policies)), t.push(
      new Et(new $c(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new Et(new Ks(), e.inputsCount).encode(e.inputs)), t.push(new Et(new ei(), e.outputsCount).encode(e.outputs)), t.push(new Et(new ri(), e.witnessesCount).encode(e.witnesses)), ie(t);
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
    const c = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const E = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new ti().decode(e, r, o);
    const C = n;
    [n, r] = new Et(new $c(), c).decode(e, r);
    const x = n;
    [n, r] = new Et(new Ks(), d).decode(e, r);
    const v = n;
    [n, r] = new Et(new ei(), l).decode(e, r);
    const b = n;
    return [n, r] = new Et(new ri(), E).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: c,
        inputsCount: d,
        outputsCount: l,
        witnessesCount: E,
        salt: g,
        policies: C,
        storageSlots: x,
        inputs: v,
        outputs: b,
        witnesses: n
      },
      r
    ];
  }
}, Kc = class extends oe {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new yr().encode(e.txPointer)), t.push(new Ws().encode(e.inputContract)), t.push(new zs().encode(e.outputContract)), t.push(new _().encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new yr().decode(e, r);
    const s = n;
    [n, r] = new Ws().decode(e, r);
    const i = n;
    [n, r] = new zs().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
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
}, On = class extends oe {
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
          new qc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Wc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Kc().encode(e));
        break;
      }
      default:
        throw new F(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return ie(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new qc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Wc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Kc().decode(e, r), [n, r];
      default:
        throw new F(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, fC = class extends Fi {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new z("u8")
    });
  }
}, gC = 16 * 1024, pC = 16, mC = 1024 * 1024 * 1024, wC = 1024 * 1024 * 1024, EC = 255, IC = 1024 * 1024, yC = 1024 * 1024, wp = "0xffffffffffff0000", Nd = "0xffffffffffff0001", Ep = "0xffffffffffff0002", Ip = "0xffffffffffff0003", yp = "0xffffffffffff0004", Bp = "0x0", ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
var Br = ts.bech32m = ts.bech32 = void 0;
const si = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Rd = {};
for (let e = 0; e < si.length; e++) {
  const t = si.charAt(e);
  Rd[t] = e;
}
function ur(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function zc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = ur(t) ^ r >> 5;
  }
  t = ur(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = ur(t) ^ r & 31;
  }
  return t;
}
function Fa(e, t, n, r) {
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
function Cp(e) {
  return Fa(e, 8, 5, !0);
}
function bp(e) {
  const t = Fa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Qp(e) {
  const t = Fa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function Sd(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let l = zc(o);
    if (typeof l == "string")
      throw new Error(l);
    let E = o + "1";
    for (let g = 0; g < c.length; ++g) {
      const C = c[g];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      l = ur(l) ^ C, E += si.charAt(C);
    }
    for (let g = 0; g < 6; ++g)
      l = ur(l);
    l ^= t;
    for (let g = 0; g < 6; ++g) {
      const C = l >> (5 - g) * 5 & 31;
      E += si.charAt(C);
    }
    return E;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
      return "Exceeds length limit";
    const d = o.toLowerCase(), l = o.toUpperCase();
    if (o !== d && o !== l)
      return "Mixed-case string " + o;
    o = d;
    const E = o.lastIndexOf("1");
    if (E === -1)
      return "No separator character for " + o;
    if (E === 0)
      return "Missing prefix for " + o;
    const g = o.slice(0, E), C = o.slice(E + 1);
    if (C.length < 6)
      return "Data too short";
    let x = zc(g);
    if (typeof x == "string")
      return x;
    const v = [];
    for (let b = 0; b < C.length; ++b) {
      const R = C.charAt(b), S = Rd[R];
      if (S === void 0)
        return "Unknown character " + R;
      x = ur(x) ^ S, !(b + 6 >= C.length) && v.push(S);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: g, words: v };
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
    toWords: Cp,
    fromWordsUnsafe: bp,
    fromWords: Qp
  };
}
ts.bech32 = Sd("bech32");
Br = ts.bech32m = Sd("bech32m");
var ii = "fuel";
function Da(e) {
  return Br.decode(e);
}
function Ps(e) {
  return Br.encode(
    ii,
    Br.toWords(Z(X(e)))
  );
}
function Us(e) {
  return typeof e == "string" && e.indexOf(ii + 1) === 0 && Da(e).prefix === ii;
}
function Oo(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function eA(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Lo(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Na(e) {
  return new Uint8Array(Br.fromWords(Da(e).words));
}
function tA(e) {
  if (!Us(e))
    throw new F(
      F.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return X(Na(e));
}
function xp(e) {
  const { words: t } = Da(e);
  return Br.encode(ii, t);
}
var Jr = (e) => e instanceof vd ? e.address : e instanceof fp ? e.id : e, vp = () => X(_n(32)), Fp = (e) => {
  let t;
  try {
    if (!Oo(e))
      throw new F(
        F.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = Na(Ps(e)), t = X(t.fill(0, 0, 12));
  } catch {
    throw new F(
      F.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Dp = (e) => {
  if (!Lo(e))
    throw new F(F.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, fe = class extends lp {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    D(this, "bech32Address");
    if (this.bech32Address = xp(t), !Us(this.bech32Address))
      throw new F(
        F.CODES.INVALID_BECH32_ADDRESS,
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
    return tA(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return Na(this.bech32Address);
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
    const t = tA(this.bech32Address);
    return {
      value: Fp(t)
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
    if (!eA(t))
      throw new F(F.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = Me(X(Z(t)));
    return new fe(Ps(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Oo(t))
      throw new F(
        F.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new fe(Ps(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(vp());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Us(t) ? new fe(t) : this.fromB256(t);
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
      return fe.fromB256(t.toB256());
    if (eA(t))
      return fe.fromPublicKey(t);
    if (Us(t))
      return new fe(t);
    if (Oo(t))
      return fe.fromB256(t);
    if (Lo(t))
      return fe.fromEvmAddress(t);
    throw new F(
      F.CODES.PARSE_FAILED,
      "Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(t) {
    if (!Lo(t))
      throw new F(
        F.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Dp(t);
    return new fe(Ps(n));
  }
}, ke = "0x0000000000000000000000000000000000000000000000000000000000000000", Ct = ke, BC = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _d = BigInt(0), Di = BigInt(1), Np = BigInt(2);
function an(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Rp = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Cr(e) {
  if (!an(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Rp[e[n]];
  return t;
}
function kd(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Ra(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const cn = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function nA(e) {
  if (e >= cn._0 && e <= cn._9)
    return e - cn._0;
  if (e >= cn._A && e <= cn._F)
    return e - (cn._A - 10);
  if (e >= cn._a && e <= cn._f)
    return e - (cn._a - 10);
}
function br(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = nA(e.charCodeAt(i)), c = nA(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Vn(e) {
  return Ra(Cr(e));
}
function Sa(e) {
  if (!an(e))
    throw new Error("Uint8Array expected");
  return Ra(Cr(Uint8Array.from(e).reverse()));
}
function Qr(e, t) {
  return br(e.toString(16).padStart(t * 2, "0"));
}
function _a(e, t) {
  return Qr(e, t).reverse();
}
function Sp(e) {
  return br(kd(e));
}
function $t(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = br(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (an(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function ns(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!an(i))
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
function Od(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function _p(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function kp(e) {
  let t;
  for (t = 0; e > _d; e >>= Di, t += 1)
    ;
  return t;
}
function Op(e, t) {
  return e >> BigInt(t) & Di;
}
const Lp = (e, t, n) => e | (n ? Di : _d) << BigInt(t), ka = (e) => (Np << BigInt(e - 1)) - Di, co = (e) => new Uint8Array(e), rA = (e) => Uint8Array.from(e);
function Ld(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = co(e), s = co(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...g) => n(s, r, ...g), d = (g = co()) => {
    s = c(rA([0]), g), r = c(), g.length !== 0 && (s = c(rA([1]), g), r = c());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const C = [];
    for (; g < t; ) {
      r = c();
      const x = r.slice();
      C.push(x), g += r.length;
    }
    return ns(...C);
  };
  return (g, C) => {
    o(), d(g);
    let x;
    for (; !(x = C(l())); )
      d();
    return o(), x;
  };
}
const Mp = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || an(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function fs(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = Mp[i];
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
const Tp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Op,
  bitLen: kp,
  bitMask: ka,
  bitSet: Lp,
  bytesToHex: Cr,
  bytesToNumberBE: Vn,
  bytesToNumberLE: Sa,
  concatBytes: ns,
  createHmacDrbg: Ld,
  ensureBytes: $t,
  equalBytes: Od,
  hexToBytes: br,
  hexToNumber: Ra,
  isBytes: an,
  numberToBytesBE: Qr,
  numberToBytesLE: _a,
  numberToHexUnpadded: kd,
  numberToVarBytesBE: Sp,
  utf8ToBytes: _p,
  validateObject: fs
}, Symbol.toStringTag, { value: "Module" }));
var Ao = {}, Mo = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof ye < "u" && ye, r = function() {
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
      function l(A) {
        return A && DataView.prototype.isPrototypeOf(A);
      }
      if (d.arrayBuffer)
        var E = [
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
          return A && E.indexOf(Object.prototype.toString.call(A)) > -1;
        };
      function C(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function x(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function v(A) {
        var h = {
          next: function() {
            var m = A.shift();
            return { done: m === void 0, value: m };
          }
        };
        return d.iterable && (h[Symbol.iterator] = function() {
          return h;
        }), h;
      }
      function b(A) {
        this.map = {}, A instanceof b ? A.forEach(function(h, m) {
          this.append(m, h);
        }, this) : Array.isArray(A) ? A.forEach(function(h) {
          this.append(h[0], h[1]);
        }, this) : A && Object.getOwnPropertyNames(A).forEach(function(h) {
          this.append(h, A[h]);
        }, this);
      }
      b.prototype.append = function(A, h) {
        A = C(A), h = x(h);
        var m = this.map[A];
        this.map[A] = m ? m + ", " + h : h;
      }, b.prototype.delete = function(A) {
        delete this.map[C(A)];
      }, b.prototype.get = function(A) {
        return A = C(A), this.has(A) ? this.map[A] : null;
      }, b.prototype.has = function(A) {
        return this.map.hasOwnProperty(C(A));
      }, b.prototype.set = function(A, h) {
        this.map[C(A)] = x(h);
      }, b.prototype.forEach = function(A, h) {
        for (var m in this.map)
          this.map.hasOwnProperty(m) && A.call(h, this.map[m], m, this);
      }, b.prototype.keys = function() {
        var A = [];
        return this.forEach(function(h, m) {
          A.push(m);
        }), v(A);
      }, b.prototype.values = function() {
        var A = [];
        return this.forEach(function(h) {
          A.push(h);
        }), v(A);
      }, b.prototype.entries = function() {
        var A = [];
        return this.forEach(function(h, m) {
          A.push([m, h]);
        }), v(A);
      }, d.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
      function R(A) {
        if (A.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        A.bodyUsed = !0;
      }
      function S(A) {
        return new Promise(function(h, m) {
          A.onload = function() {
            h(A.result);
          }, A.onerror = function() {
            m(A.error);
          };
        });
      }
      function J(A) {
        var h = new FileReader(), m = S(h);
        return h.readAsArrayBuffer(A), m;
      }
      function T(A) {
        var h = new FileReader(), m = S(h);
        return h.readAsText(A), m;
      }
      function j(A) {
        for (var h = new Uint8Array(A), m = new Array(h.length), f = 0; f < h.length; f++)
          m[f] = String.fromCharCode(h[f]);
        return m.join("");
      }
      function O(A) {
        if (A.slice)
          return A.slice(0);
        var h = new Uint8Array(A.byteLength);
        return h.set(new Uint8Array(A)), h.buffer;
      }
      function k() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && l(A) ? (this._bodyArrayBuffer = O(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || g(A)) ? this._bodyArrayBuffer = O(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
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
            return this.blob().then(J);
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
      var L = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function P(A) {
        var h = A.toUpperCase();
        return L.indexOf(h) > -1 ? h : A;
      }
      function q(A, h) {
        if (!(this instanceof q))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        h = h || {};
        var m = h.body;
        if (A instanceof q) {
          if (A.bodyUsed)
            throw new TypeError("Already read");
          this.url = A.url, this.credentials = A.credentials, h.headers || (this.headers = new b(A.headers)), this.method = A.method, this.mode = A.mode, this.signal = A.signal, !m && A._bodyInit != null && (m = A._bodyInit, A.bodyUsed = !0);
        } else
          this.url = String(A);
        if (this.credentials = h.credentials || this.credentials || "same-origin", (h.headers || !this.headers) && (this.headers = new b(h.headers)), this.method = P(h.method || this.method || "GET"), this.mode = h.mode || this.mode || null, this.signal = h.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (h.cache === "no-store" || h.cache === "no-cache")) {
          var f = /([?&])_=[^&]*/;
          if (f.test(this.url))
            this.url = this.url.replace(f, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var I = /\?/;
            this.url += (I.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      q.prototype.clone = function() {
        return new q(this, { body: this._bodyInit });
      };
      function U(A) {
        var h = new FormData();
        return A.trim().split("&").forEach(function(m) {
          if (m) {
            var f = m.split("="), I = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            h.append(decodeURIComponent(I), decodeURIComponent(y));
          }
        }), h;
      }
      function H(A) {
        var h = new b(), m = A.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var I = f.split(":"), y = I.shift().trim();
          if (y) {
            var p = I.join(":").trim();
            h.append(y, p);
          }
        }), h;
      }
      k.call(q.prototype);
      function ee(A, h) {
        if (!(this instanceof ee))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        h || (h = {}), this.type = "default", this.status = h.status === void 0 ? 200 : h.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = h.statusText === void 0 ? "" : "" + h.statusText, this.headers = new b(h.headers), this.url = h.url || "", this._initBody(A);
      }
      k.call(ee.prototype), ee.prototype.clone = function() {
        return new ee(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new b(this.headers),
          url: this.url
        });
      }, ee.error = function() {
        var A = new ee(null, { status: 0, statusText: "" });
        return A.type = "error", A;
      };
      var B = [301, 302, 303, 307, 308];
      ee.redirect = function(A, h) {
        if (B.indexOf(h) === -1)
          throw new RangeError("Invalid status code");
        return new ee(null, { status: h, headers: { location: A } });
      }, o.DOMException = c.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(h, m) {
          this.message = h, this.name = m;
          var f = Error(h);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(A, h) {
        return new Promise(function(m, f) {
          var I = new q(A, h);
          if (I.signal && I.signal.aborted)
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
              m(new ee(Y, w));
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
          y.open(I.method, u(I.url), !0), I.credentials === "include" ? y.withCredentials = !0 : I.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && I.headers.get("Content-Type") && I.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), h && typeof h.headers == "object" && !(h.headers instanceof b) ? Object.getOwnPropertyNames(h.headers).forEach(function(w) {
            y.setRequestHeader(w, x(h.headers[w]));
          }) : I.headers.forEach(function(w, Y) {
            y.setRequestHeader(Y, w);
          }), I.signal && (I.signal.addEventListener("abort", p), y.onreadystatechange = function() {
            y.readyState === 4 && I.signal.removeEventListener("abort", p);
          }), y.send(typeof I._bodyInit > "u" ? null : I._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = b, c.Request = q, c.Response = ee), o.Headers = b, o.Request = q, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Mo, Mo.exports);
var Pp = Mo.exports;
function Up(e) {
  return typeof e == "object" && e !== null;
}
function Gp(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Hp = /\r\n|[\n\r]/g;
function To(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Hp)) {
    if (typeof s.index == "number" || Gp(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Jp(e) {
  return Md(
    e.source,
    To(e.source, e.start)
  );
}
function Md(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, d = t.column + c, l = `${e.name}:${o}:${d}
`, E = r.split(/\r\n|[\n\r]/g), g = E[s];
  if (g.length > 120) {
    const C = Math.floor(d / 80), x = d % 80, v = [];
    for (let b = 0; b < g.length; b += 80)
      v.push(g.slice(b, b + 80));
    return l + sA([
      [`${o} |`, v[0]],
      ...v.slice(1, C + 1).map((b) => ["|", b]),
      ["|", "^".padStart(x)],
      ["|", v[C + 1]]
    ]);
  }
  return l + sA([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, E[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, E[s + 1]]
  ]);
}
function sA(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function Zp(e) {
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
class Oa extends Error {
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
    const { nodes: o, source: c, positions: d, path: l, originalError: E, extensions: g } = Zp(n);
    super(t), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = E ?? void 0, this.nodes = iA(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = iA(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((v) => v.loc).filter((v) => v != null)
    );
    this.source = c ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (C == null ? void 0 : C.map((v) => v.start)), this.locations = d && c ? d.map((v) => To(c, v)) : C == null ? void 0 : C.map((v) => To(v.source, v.start));
    const x = Up(
      E == null ? void 0 : E.extensions
    ) ? E == null ? void 0 : E.extensions : void 0;
    this.extensions = (i = g ?? x) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), E != null && E.stack ? Object.defineProperty(this, "stack", {
      value: E.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Oa) : Object.defineProperty(this, "stack", {
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

` + Jp(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Md(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function iA(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function It(e, t, n) {
  return new Oa(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Yp {
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
class Td {
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
const Pd = {
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
}, Vp = new Set(Object.keys(Pd));
function oA(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Vp.has(t);
}
var sr;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(sr || (sr = {}));
var Po;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Po || (Po = {}));
var ce;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ce || (ce = {}));
function Uo(e) {
  return e === 9 || e === 32;
}
function rs(e) {
  return e >= 48 && e <= 57;
}
function Ud(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Gd(e) {
  return Ud(e) || e === 95;
}
function Xp(e) {
  return Ud(e) || rs(e) || e === 95;
}
function jp(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], d = $p(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function $p(e) {
  let t = 0;
  for (; t < e.length && Uo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function qp(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || Uo(x.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, d = e.endsWith("\\"), l = c || d, E = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || l || i || o);
  let g = "";
  const C = s && Uo(e.charCodeAt(0));
  return (E && !C || i) && (g += `
`), g += n, (E || l) && (g += `
`), '"""' + g + '"""';
}
var M;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(M || (M = {}));
class Wp {
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
    const n = new Td(M.SOF, 0, 0, 0, 0);
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
    if (t.kind !== M.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = zp(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === M.COMMENT);
    return t;
  }
}
function Kp(e) {
  return e === M.BANG || e === M.DOLLAR || e === M.AMP || e === M.PAREN_L || e === M.PAREN_R || e === M.SPREAD || e === M.COLON || e === M.EQUALS || e === M.AT || e === M.BRACKET_L || e === M.BRACKET_R || e === M.BRACE_L || e === M.PIPE || e === M.BRACE_R;
}
function Lr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ni(e, t) {
  return Hd(e.charCodeAt(t)) && Jd(e.charCodeAt(t + 1));
}
function Hd(e) {
  return e >= 55296 && e <= 56319;
}
function Jd(e) {
  return e >= 56320 && e <= 57343;
}
function $n(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return M.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function wt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new Td(t, n, r, i, o, s);
}
function zp(e, t) {
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
        return em(e, s);
      case 33:
        return wt(e, M.BANG, s, s + 1);
      case 36:
        return wt(e, M.DOLLAR, s, s + 1);
      case 38:
        return wt(e, M.AMP, s, s + 1);
      case 40:
        return wt(e, M.PAREN_L, s, s + 1);
      case 41:
        return wt(e, M.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return wt(e, M.SPREAD, s, s + 3);
        break;
      case 58:
        return wt(e, M.COLON, s, s + 1);
      case 61:
        return wt(e, M.EQUALS, s, s + 1);
      case 64:
        return wt(e, M.AT, s, s + 1);
      case 91:
        return wt(e, M.BRACKET_L, s, s + 1);
      case 93:
        return wt(e, M.BRACKET_R, s, s + 1);
      case 123:
        return wt(e, M.BRACE_L, s, s + 1);
      case 124:
        return wt(e, M.PIPE, s, s + 1);
      case 125:
        return wt(e, M.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? om(e, s) : nm(e, s);
    }
    if (rs(i) || i === 45)
      return tm(e, s, i);
    if (Gd(i))
      return am(e, s);
    throw It(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Lr(i) || Ni(n, s) ? `Unexpected character: ${$n(e, s)}.` : `Invalid character: ${$n(e, s)}.`
    );
  }
  return wt(e, M.EOF, r, r);
}
function em(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Lr(i))
      ++s;
    else if (Ni(n, s))
      s += 2;
    else
      break;
  }
  return wt(
    e,
    M.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function tm(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), rs(i))
      throw It(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${$n(
          e,
          s
        )}.`
      );
  } else
    s = uo(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = uo(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = uo(e, s, i), i = r.charCodeAt(s)), i === 46 || Gd(i))
    throw It(
      e.source,
      s,
      `Invalid number, expected digit but got: ${$n(
        e,
        s
      )}.`
    );
  return wt(
    e,
    o ? M.FLOAT : M.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function uo(e, t, n) {
  if (!rs(n))
    throw It(
      e.source,
      t,
      `Invalid number, expected digit but got: ${$n(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; rs(r.charCodeAt(s)); )
    ++s;
  return s;
}
function nm(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), wt(e, M.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? rm(e, s) : sm(e, s) : im(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (Lr(c))
      ++s;
    else if (Ni(n, s))
      s += 2;
    else
      throw It(
        e.source,
        s,
        `Invalid character within String: ${$n(
          e,
          s
        )}.`
      );
  }
  throw It(e.source, s, "Unterminated string.");
}
function rm(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Lr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | Zr(i), r < 0)
      break;
  }
  throw It(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function sm(e, t) {
  const n = e.source.body, r = aA(n, t + 2);
  if (Lr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Hd(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = aA(n, t + 8);
    if (Jd(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw It(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function aA(e, t) {
  return Zr(e.charCodeAt(t)) << 12 | Zr(e.charCodeAt(t + 1)) << 8 | Zr(e.charCodeAt(t + 2)) << 4 | Zr(e.charCodeAt(t + 3));
}
function Zr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function im(e, t) {
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
  throw It(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function om(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const l = n.charCodeAt(i);
    if (l === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const E = wt(
        e,
        M.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        jp(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, E;
    }
    if (l === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (l === 10 || l === 13) {
      c += n.slice(o, i), d.push(c), l === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (Lr(l))
      ++i;
    else if (Ni(n, i))
      i += 2;
    else
      throw It(
        e.source,
        i,
        `Invalid character within String: ${$n(
          e,
          i
        )}.`
      );
  }
  throw It(e.source, i, "Unterminated string.");
}
function am(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Xp(i))
      ++s;
    else
      break;
  }
  return wt(
    e,
    M.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Gs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const cm = 10, Zd = 2;
function Yd(e) {
  return Ri(e, []);
}
function Ri(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Am(e, t);
    default:
      return String(e);
  }
}
function Am(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (um(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : Ri(r, n);
  } else if (Array.isArray(e))
    return hm(e, n);
  return dm(e, n);
}
function um(e) {
  return typeof e.toJSON == "function";
}
function dm(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > Zd ? "[" + lm(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + Ri(i, t)
  ).join(", ") + " }";
}
function hm(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Zd)
    return "[Array]";
  const n = Math.min(cm, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(Ri(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function lm(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const fm = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class Vd {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Gs(!1, `Body must be a string. Received: ${Yd(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Gs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Gs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function gm(e) {
  return fm(e, Vd);
}
function Xd(e, t) {
  return new gs(e, t).parseDocument();
}
function pm(e, t) {
  const n = new gs(e, t);
  n.expectToken(M.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(M.EOF), r;
}
function mm(e, t) {
  const n = new gs(e, t);
  n.expectToken(M.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(M.EOF), r;
}
function wm(e, t) {
  const n = new gs(e, t);
  n.expectToken(M.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(M.EOF), r;
}
class gs {
  constructor(t, n = {}) {
    const r = gm(t) ? t : new Vd(t);
    this._lexer = new Wp(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(M.NAME);
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
        M.SOF,
        this.parseDefinition,
        M.EOF
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
    if (this.peek(M.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === M.NAME) {
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
        throw It(
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
    if (this.peek(M.BRACE_L))
      return this.node(t, {
        kind: ce.OPERATION_DEFINITION,
        operation: sr.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(M.NAME) && (r = this.parseName()), this.node(t, {
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
    const t = this.expectToken(M.NAME);
    switch (t.value) {
      case "query":
        return sr.QUERY;
      case "mutation":
        return sr.MUTATION;
      case "subscription":
        return sr.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      M.PAREN_L,
      this.parseVariableDefinition,
      M.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ce.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(M.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(M.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(M.DOLLAR), this.node(t, {
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
        M.BRACE_L,
        this.parseSelection,
        M.BRACE_R
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
    return this.peek(M.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(M.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ce.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(M.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(M.PAREN_L, n, M.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(M.COLON), this.node(n, {
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
    this.expectToken(M.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(M.NAME) ? this.node(t, {
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
      case M.BRACKET_L:
        return this.parseList(t);
      case M.BRACE_L:
        return this.parseObject(t);
      case M.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ce.INT,
          value: n.value
        });
      case M.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ce.FLOAT,
          value: n.value
        });
      case M.STRING:
      case M.BLOCK_STRING:
        return this.parseStringLiteral();
      case M.NAME:
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
      case M.DOLLAR:
        if (t)
          if (this.expectToken(M.DOLLAR), this._lexer.token.kind === M.NAME) {
            const r = this._lexer.token.value;
            throw It(
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
      block: t.kind === M.BLOCK_STRING
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
      values: this.any(M.BRACKET_L, n, M.BRACKET_R)
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
      fields: this.any(M.BRACE_L, n, M.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(M.COLON), this.node(n, {
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
    for (; this.peek(M.AT); )
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
    return this.expectToken(M.AT), this.node(n, {
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
    if (this.expectOptionalToken(M.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(M.BRACKET_R), n = this.node(t, {
        kind: ce.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(M.BANG) ? this.node(t, {
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
    return this.peek(M.STRING) || this.peek(M.BLOCK_STRING);
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
      M.BRACE_L,
      this.parseOperationTypeDefinition,
      M.BRACE_R
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
    this.expectToken(M.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(M.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      M.BRACE_L,
      this.parseFieldDefinition,
      M.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(M.COLON);
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
      M.PAREN_L,
      this.parseInputValueDef,
      M.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(M.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(M.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(M.EQUALS) ? this.delimitedMany(M.PIPE, this.parseNamedType) : [];
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
      M.BRACE_L,
      this.parseEnumValueDefinition,
      M.BRACE_R
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
      throw It(
        this._lexer.source,
        this._lexer.token.start,
        `${Fs(
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
      M.BRACE_L,
      this.parseInputValueDef,
      M.BRACE_R
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
    if (t.kind === M.NAME)
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
      M.BRACE_L,
      this.parseOperationTypeDefinition,
      M.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(M.AT);
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
    return this.delimitedMany(M.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(Po, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Yp(
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
    throw It(
      this._lexer.source,
      n.start,
      `Expected ${jd(t)}, found ${Fs(n)}.`
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
    if (n.kind === M.NAME && n.value === t)
      this.advanceLexer();
    else
      throw It(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${Fs(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === M.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return It(
      this._lexer.source,
      n.start,
      `Unexpected ${Fs(n)}.`
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
    if (t !== void 0 && n.kind !== M.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw It(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Fs(e) {
  const t = e.value;
  return jd(e.kind) + (t != null ? ` "${t}"` : "");
}
function jd(e) {
  return Kp(e) ? `"${e}"` : e;
}
const Em = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: gs,
  parse: Xd,
  parseConstValue: mm,
  parseType: wm,
  parseValue: pm
}, Symbol.toStringTag, { value: "Module" })), Im = /* @__PURE__ */ sa(Em);
function ym(e) {
  return `"${e.replace(Bm, Cm)}"`;
}
const Bm = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Cm(e) {
  return bm[e.charCodeAt(0)];
}
const bm = [
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
], Qm = Object.freeze({});
function xm(e, t, n = Pd) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ce))
    r.set(S, vm(t, S));
  let s, i = Array.isArray(e), o = [e], c = -1, d = [], l = e, E, g;
  const C = [], x = [];
  do {
    c++;
    const S = c === o.length, J = S && d.length !== 0;
    if (S) {
      if (E = x.length === 0 ? void 0 : C[C.length - 1], l = g, g = x.pop(), J)
        if (i) {
          l = l.slice();
          let j = 0;
          for (const [O, k] of d) {
            const L = O - j;
            k === null ? (l.splice(L, 1), j++) : l[L] = k;
          }
        } else {
          l = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(l)
          );
          for (const [j, O] of d)
            l[j] = O;
        }
      c = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (E = i ? c : o[c], l = g[E], l == null)
        continue;
      C.push(E);
    }
    let T;
    if (!Array.isArray(l)) {
      var v, b;
      oA(l) || Gs(!1, `Invalid AST Node: ${Yd(l)}.`);
      const j = S ? (v = r.get(l.kind)) === null || v === void 0 ? void 0 : v.leave : (b = r.get(l.kind)) === null || b === void 0 ? void 0 : b.enter;
      if (T = j == null ? void 0 : j.call(t, l, E, g, C, x), T === Qm)
        break;
      if (T === !1) {
        if (!S) {
          C.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([E, T]), !S))
        if (oA(T))
          l = T;
        else {
          C.pop();
          continue;
        }
    }
    if (T === void 0 && J && d.push([E, l]), S)
      C.pop();
    else {
      var R;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(l), o = i ? l : (R = n[l.kind]) !== null && R !== void 0 ? R : [], c = -1, d = [], g && x.push(g), g = l;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function vm(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function $d(e) {
  return xm(e, Dm);
}
const Fm = 80, Dm = {
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
      const t = me("(", te(e.variableDefinitions, ", "), ")"), n = te(
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
    leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + me(" = ", n) + me(" ", te(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Xt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = me("", e, ": ") + t;
      let o = i + me("(", te(n, ", "), ")");
      return o.length > Fm && (o = i + me(`(
`, Hs(te(n, `
`)), `
)`)), te([o, te(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + me(" ", te(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => te(
      [
        "...",
        me("on ", e),
        te(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${me("(", te(n, ", "), ")")} on ${t} ${me("", te(r, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? qp(e) : ym(e)
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
    leave: ({ name: e, arguments: t }) => "@" + e + me("(", te(t, ", "), ")")
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
    leave: ({ description: e, directives: t, operationTypes: n }) => me("", e, `
`) + te(["schema", te(t, " "), Xt(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => me("", e, `
`) + te(["scalar", t, te(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => me("", e, `
`) + te(
      [
        "type",
        t,
        me("implements ", te(n, " & ")),
        te(r, " "),
        Xt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => me("", e, `
`) + t + (cA(n) ? me(`(
`, Hs(te(n, `
`)), `
)`) : me("(", te(n, ", "), ")")) + ": " + r + me(" ", te(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: s }) => me("", e, `
`) + te(
      [t + ": " + n, me("= ", r), te(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => me("", e, `
`) + te(
      [
        "interface",
        t,
        me("implements ", te(n, " & ")),
        te(r, " "),
        Xt(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => me("", e, `
`) + te(
      ["union", t, te(n, " "), me("= ", te(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => me("", e, `
`) + te(["enum", t, te(n, " "), Xt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => me("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => me("", e, `
`) + te(["input", t, te(n, " "), Xt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => me("", e, `
`) + "directive @" + t + (cA(n) ? me(`(
`, Hs(te(n, `
`)), `
)`) : me("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), Xt(t)],
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
        me("implements ", te(t, " & ")),
        te(n, " "),
        Xt(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => te(
      [
        "extend interface",
        e,
        me("implements ", te(t, " & ")),
        te(n, " "),
        Xt(r)
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
        me("= ", te(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), Xt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), Xt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Xt(e) {
  return me(`{
`, Hs(te(e, `
`)), `
}`);
}
function me(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Hs(e) {
  return me("  ", e.replace(/\n/g, `
  `));
}
function cA(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Nm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: $d
}, Symbol.toStringTag, { value: "Module" })), Rm = /* @__PURE__ */ sa(Nm);
var La = {}, Si = {}, qd = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Sm = qd, Wd = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Sm;
}, _m = Wd, km = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = _m);
  var s, i = /* @__PURE__ */ new Map();
  function o(E, g) {
    var C = i.get(g);
    C ? C.push.apply(C, E) : i.set(g, E);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(E, g) {
        return o(["" + c + g], E), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(E, g) {
        var C = e(E, "" + c + g, r);
        return C.files.forEach(o), C.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var l = e(t[d], "" + c + d, r);
        l.files.forEach(o), s[d] = l.clone;
      }
    } else
      s = t;
  }
  return {
    clone: s,
    files: i
  };
};
Si.ReactNativeFile = qd;
Si.extractFiles = km;
Si.isExtractableFile = Wd;
var Om = typeof self == "object" ? self.FormData : window.FormData, ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.defaultJsonSerializer = void 0;
ps.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Lm = ye && ye.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(La, "__esModule", { value: !0 });
var Kd = Si, Mm = Lm(Om), Tm = ps, Pm = function(e) {
  return Kd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Um(e, t, n, r) {
  r === void 0 && (r = Tm.defaultJsonSerializer);
  var s = Kd.extractFiles({ query: e, variables: t, operationName: n }, "", Pm), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(C, x, v) {
      return C.push({ query: x, variables: t ? t[v] : void 0 }), C;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? Mm.default : FormData, l = new d();
  l.append("operations", r.stringify(i));
  var E = {}, g = 0;
  return o.forEach(function(C) {
    E[++g] = C;
  }), l.append("map", r.stringify(E)), g = 0, o.forEach(function(C, x) {
    l.append("" + ++g, x);
  }), l;
}
La.default = Um;
var St = {};
Object.defineProperty(St, "__esModule", { value: !0 });
St.parseBatchRequestsExtendedArgs = St.parseRawRequestExtendedArgs = St.parseRequestExtendedArgs = St.parseBatchRequestArgs = St.parseRawRequestArgs = St.parseRequestArgs = void 0;
function Gm(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
St.parseRequestArgs = Gm;
function Hm(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
St.parseRawRequestArgs = Hm;
function Jm(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
St.parseBatchRequestArgs = Jm;
function Zm(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
St.parseRequestExtendedArgs = Zm;
function Ym(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
St.parseRawRequestExtendedArgs = Ym;
function Vm(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
St.parseBatchRequestsExtendedArgs = Vm;
var ms = {}, Xm = ye && ye.__extends || function() {
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
Object.defineProperty(ms, "__esModule", { value: !0 });
ms.ClientError = void 0;
var jm = (
  /** @class */
  function(e) {
    Xm(t, e);
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
ms.ClientError = jm;
var Ur = {}, AA;
function $m() {
  if (AA)
    return Ur;
  AA = 1;
  var e = ye && ye.__assign || function() {
    return e = Object.assign || function(O) {
      for (var k, L = 1, P = arguments.length; L < P; L++) {
        k = arguments[L];
        for (var q in k)
          Object.prototype.hasOwnProperty.call(k, q) && (O[q] = k[q]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = ye && ye.__awaiter || function(O, k, L, P) {
    function q(U) {
      return U instanceof L ? U : new L(function(H) {
        H(U);
      });
    }
    return new (L || (L = Promise))(function(U, H) {
      function ee(A) {
        try {
          a(P.next(A));
        } catch (h) {
          H(h);
        }
      }
      function B(A) {
        try {
          a(P.throw(A));
        } catch (h) {
          H(h);
        }
      }
      function a(A) {
        A.done ? U(A.value) : q(A.value).then(ee, B);
      }
      a((P = P.apply(O, k || [])).next());
    });
  }, n = ye && ye.__generator || function(O, k) {
    var L = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, q, U, H;
    return H = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function ee(a) {
      return function(A) {
        return B([a, A]);
      };
    }
    function B(a) {
      if (P)
        throw new TypeError("Generator is already executing.");
      for (; L; )
        try {
          if (P = 1, q && (U = a[0] & 2 ? q.return : a[0] ? q.throw || ((U = q.return) && U.call(q), 0) : q.next) && !(U = U.call(q, a[1])).done)
            return U;
          switch (q = 0, U && (a = [a[0] & 2, U.value]), a[0]) {
            case 0:
            case 1:
              U = a;
              break;
            case 4:
              return L.label++, { value: a[1], done: !1 };
            case 5:
              L.label++, q = a[1], a = [0];
              continue;
            case 7:
              a = L.ops.pop(), L.trys.pop();
              continue;
            default:
              if (U = L.trys, !(U = U.length > 0 && U[U.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                L = 0;
                continue;
              }
              if (a[0] === 3 && (!U || a[1] > U[0] && a[1] < U[3])) {
                L.label = a[1];
                break;
              }
              if (a[0] === 6 && L.label < U[1]) {
                L.label = U[1], U = a;
                break;
              }
              if (U && L.label < U[2]) {
                L.label = U[2], L.ops.push(a);
                break;
              }
              U[2] && L.ops.pop(), L.trys.pop();
              continue;
          }
          a = k.call(O, L);
        } catch (A) {
          a = [6, A], q = 0;
        } finally {
          P = U = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Ur, "__esModule", { value: !0 }), Ur.GraphQLWebSocketClient = void 0;
  var r = ms, s = zd(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", l = "subscribe", E = "next", g = "error", C = "complete", x = (
    /** @class */
    function() {
      function O(k, L, P) {
        this._type = k, this._payload = L, this._id = P;
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
          var k = { type: this.type };
          return this.id != null && this.id != null && (k.id = this.id), this.payload != null && this.payload != null && (k.payload = this.payload), JSON.stringify(k);
        },
        enumerable: !1,
        configurable: !0
      }), O.parse = function(k, L) {
        var P = JSON.parse(k), q = P.type, U = P.payload, H = P.id;
        return new O(q, L(U), H);
      }, O;
    }()
  ), v = (
    /** @class */
    function() {
      function O(k, L) {
        var P = this, q = L.onInit, U = L.onAcknowledged, H = L.onPing, ee = L.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = k, k.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, A, h, m;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = k).send, h = R, q ? [4, q()] : [3, 2];
                case 1:
                  return m = f.sent(), [3, 3];
                case 2:
                  m = null, f.label = 3;
                case 3:
                  return A.apply(a, [h.apply(void 0, [m]).text]), [
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
            var a = b(B.data);
            switch (a.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, U && U(a.payload));
                return;
              }
              case c: {
                H ? H(a.payload).then(function(I) {
                  return k.send(J(I).text);
                }) : k.send(J(null).text);
                return;
              }
              case d: {
                ee && ee(a.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || a.id === void 0 || a.id === null || !P.socketState.subscriptions[a.id])
              return;
            var A = P.socketState.subscriptions[a.id], h = A.query, m = A.variables, f = A.subscriber;
            switch (a.type) {
              case E: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: h, variables: m }));
                return;
              }
              case g: {
                f.error && f.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: h, variables: m }));
                return;
              }
              case C: {
                f.complete && f.complete(), delete P.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (I) {
            console.error(I), k.close(1006);
          }
          k.close(4400, "Unknown graphql-ws message.");
        };
      }
      return O.prototype.makeSubscribe = function(k, L, P, q) {
        var U = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: k, variables: P, subscriber: q }, this.socket.send(T(H, { query: k, operationName: L, variables: P }).text), function() {
          U.socket.send(j(H).text), delete U.socketState.subscriptions[H];
        };
      }, O.prototype.rawRequest = function(k, L) {
        var P = this;
        return new Promise(function(q, U) {
          var H;
          P.rawSubscribe(k, {
            next: function(ee, B) {
              return H = { data: ee, extensions: B };
            },
            error: U,
            complete: function() {
              return q(H);
            }
          }, L);
        });
      }, O.prototype.request = function(k, L) {
        var P = this;
        return new Promise(function(q, U) {
          var H;
          P.subscribe(k, {
            next: function(ee) {
              return H = ee;
            },
            error: U,
            complete: function() {
              return q(H);
            }
          }, L);
        });
      }, O.prototype.subscribe = function(k, L, P) {
        var q = s.resolveRequestDocument(k), U = q.query, H = q.operationName;
        return this.makeSubscribe(U, H, P, L);
      }, O.prototype.rawSubscribe = function(k, L, P) {
        return this.makeSubscribe(k, void 0, P, L);
      }, O.prototype.ping = function(k) {
        this.socket.send(S(k).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  Ur.GraphQLWebSocketClient = v;
  function b(O, k) {
    k === void 0 && (k = function(P) {
      return P;
    });
    var L = x.parse(O, k);
    return L;
  }
  function R(O) {
    return new x(i, O);
  }
  function S(O) {
    return new x(c, O, void 0);
  }
  function J(O) {
    return new x(d, O, void 0);
  }
  function T(O, k) {
    return new x(l, k, O);
  }
  function j(O) {
    return new x(C, void 0, O);
  }
  return Ur;
}
var uA;
function zd() {
  return uA || (uA = 1, function(e) {
    var t = ye && ye.__assign || function() {
      return t = Object.assign || function(f) {
        for (var I, y = 1, p = arguments.length; y < p; y++) {
          I = arguments[y];
          for (var u in I)
            Object.prototype.hasOwnProperty.call(I, u) && (f[u] = I[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = ye && ye.__createBinding || (Object.create ? function(f, I, y, p) {
      p === void 0 && (p = y), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return I[y];
      } });
    } : function(f, I, y, p) {
      p === void 0 && (p = y), f[p] = I[y];
    }), r = ye && ye.__setModuleDefault || (Object.create ? function(f, I) {
      Object.defineProperty(f, "default", { enumerable: !0, value: I });
    } : function(f, I) {
      f.default = I;
    }), s = ye && ye.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var I = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(I, f, y);
      return r(I, f), I;
    }, i = ye && ye.__awaiter || function(f, I, y, p) {
      function u(w) {
        return w instanceof y ? w : new y(function(Y) {
          Y(w);
        });
      }
      return new (y || (y = Promise))(function(w, Y) {
        function V(re) {
          try {
            $(p.next(re));
          } catch (se) {
            Y(se);
          }
        }
        function K(re) {
          try {
            $(p.throw(re));
          } catch (se) {
            Y(se);
          }
        }
        function $(re) {
          re.done ? w(re.value) : u(re.value).then(V, K);
        }
        $((p = p.apply(f, I || [])).next());
      });
    }, o = ye && ye.__generator || function(f, I) {
      var y = { label: 0, sent: function() {
        if (w[0] & 1)
          throw w[1];
        return w[1];
      }, trys: [], ops: [] }, p, u, w, Y;
      return Y = { next: V(0), throw: V(1), return: V(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
        return this;
      }), Y;
      function V($) {
        return function(re) {
          return K([$, re]);
        };
      }
      function K($) {
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
            $ = I.call(f, y);
          } catch (re) {
            $ = [6, re], u = 0;
          } finally {
            p = w = 0;
          }
        if ($[0] & 5)
          throw $[1];
        return { value: $[0] ? $[1] : void 0, done: !0 };
      }
    }, c = ye && ye.__rest || function(f, I) {
      var y = {};
      for (var p in f)
        Object.prototype.hasOwnProperty.call(f, p) && I.indexOf(p) < 0 && (y[p] = f[p]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, p = Object.getOwnPropertySymbols(f); u < p.length; u++)
          I.indexOf(p[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, p[u]) && (y[p[u]] = f[p[u]]);
      return y;
    }, d = ye && ye.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var l = s(Pp), E = l, g = Im, C = Rm, x = d(La), v = ps, b = St, R = ms;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return R.ClientError;
    } });
    var S = function(f) {
      var I = {};
      return f && (typeof Headers < "u" && f instanceof Headers || E && E.Headers && f instanceof E.Headers ? I = h(f) : Array.isArray(f) ? f.forEach(function(y) {
        var p = y[0], u = y[1];
        I[p] = u;
      }) : I = f), I;
    }, J = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, T = function(f) {
      var I = f.query, y = f.variables, p = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(I)) {
        var w = ["query=" + encodeURIComponent(J(I))];
        return y && w.push("variables=" + encodeURIComponent(u.stringify(y))), p && w.push("operationName=" + encodeURIComponent(p)), w.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var Y = I.reduce(function(V, K, $) {
        return V.push({
          query: J(K),
          variables: y ? u.stringify(y[$]) : void 0
        }), V;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Y));
    }, j = function(f) {
      var I = f.url, y = f.query, p = f.variables, u = f.operationName, w = f.headers, Y = f.fetch, V = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var $, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return $ = x.default(y, p, u, V.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof $ == "string" ? { "Content-Type": "application/json" } : {}), w), body: $ }, V), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Y(I, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, O = function(f) {
      var I = f.url, y = f.query, p = f.variables, u = f.operationName, w = f.headers, Y = f.fetch, V = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var $, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return $ = T({
                query: y,
                variables: p,
                operationName: u,
                jsonSerializer: V.jsonSerializer
              }), re = t({ method: "GET", headers: w }, V), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Y(I + "?" + $, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, k = (
      /** @class */
      function() {
        function f(I, y) {
          y === void 0 && (y = {}), this.url = I, this.options = y;
        }
        return f.prototype.rawRequest = function(I, y, p) {
          return i(this, void 0, void 0, function() {
            var u, w, Y, V, K, $, re, se, Oe, ge, ae, Re;
            return o(this, function(he) {
              return u = b.parseRawRequestArgs(I, y, p), w = this.options, Y = w.headers, V = w.fetch, K = V === void 0 ? l.default : V, $ = w.method, re = $ === void 0 ? "POST" : $, se = w.requestMiddleware, Oe = w.responseMiddleware, ge = c(w, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ae = this.url, u.signal !== void 0 && (ge.signal = u.signal), Re = B(u.query).operationName, [2, L({
                url: ae,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, S(a(Y))), S(u.requestHeaders)),
                operationName: Re,
                fetch: K,
                method: re,
                fetchOptions: ge,
                middleware: se
              }).then(function(pe) {
                return Oe && Oe(pe), pe;
              }).catch(function(pe) {
                throw Oe && Oe(pe), pe;
              })];
            });
          });
        }, f.prototype.request = function(I) {
          for (var y = [], p = 1; p < arguments.length; p++)
            y[p - 1] = arguments[p];
          var u = y[0], w = y[1], Y = b.parseRequestArgs(I, u, w), V = this.options, K = V.headers, $ = V.fetch, re = $ === void 0 ? l.default : $, se = V.method, Oe = se === void 0 ? "POST" : se, ge = V.requestMiddleware, ae = V.responseMiddleware, Re = c(V, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), he = this.url;
          Y.signal !== void 0 && (Re.signal = Y.signal);
          var pe = B(Y.document), zt = pe.query, Se = pe.operationName;
          return L({
            url: he,
            query: zt,
            variables: Y.variables,
            headers: t(t({}, S(a(K))), S(Y.requestHeaders)),
            operationName: Se,
            fetch: re,
            method: Oe,
            fetchOptions: Re,
            middleware: ge
          }).then(function(Ce) {
            return ae && ae(Ce), Ce.data;
          }).catch(function(Ce) {
            throw ae && ae(Ce), Ce;
          });
        }, f.prototype.batchRequests = function(I, y) {
          var p = b.parseBatchRequestArgs(I, y), u = this.options, w = u.headers, Y = u.fetch, V = Y === void 0 ? l.default : Y, K = u.method, $ = K === void 0 ? "POST" : K, re = u.requestMiddleware, se = u.responseMiddleware, Oe = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ge = this.url;
          p.signal !== void 0 && (Oe.signal = p.signal);
          var ae = p.documents.map(function(he) {
            var pe = he.document;
            return B(pe).query;
          }), Re = p.documents.map(function(he) {
            var pe = he.variables;
            return pe;
          });
          return L({
            url: ge,
            query: ae,
            variables: Re,
            headers: t(t({}, S(a(w))), S(p.requestHeaders)),
            operationName: void 0,
            fetch: V,
            method: $,
            fetchOptions: Oe,
            middleware: re
          }).then(function(he) {
            return se && se(he), he.data;
          }).catch(function(he) {
            throw se && se(he), he;
          });
        }, f.prototype.setHeaders = function(I) {
          return this.options.headers = I, this;
        }, f.prototype.setHeader = function(I, y) {
          var p, u = this.options.headers;
          return u ? u[I] = y : this.options.headers = (p = {}, p[I] = y, p), this;
        }, f.prototype.setEndpoint = function(I) {
          return this.url = I, this;
        }, f;
      }()
    );
    e.GraphQLClient = k;
    function L(f) {
      var I = f.url, y = f.query, p = f.variables, u = f.headers, w = f.operationName, Y = f.fetch, V = f.method, K = V === void 0 ? "POST" : V, $ = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, Oe, ge, ae, Re, he, pe, zt, Se, Ce, Mr;
        return o(this, function(Le) {
          switch (Le.label) {
            case 0:
              return se = K.toUpperCase() === "POST" ? j : O, Oe = Array.isArray(y), [4, se({
                url: I,
                query: y,
                variables: p,
                operationName: w,
                headers: u,
                fetch: Y,
                fetchOptions: $,
                middleware: re
              })];
            case 1:
              return ge = Le.sent(), [4, H(ge, $.jsonSerializer)];
            case 2:
              if (ae = Le.sent(), Re = Oe && Array.isArray(ae) ? !ae.some(function(Ue) {
                var ys = Ue.data;
                return !ys;
              }) : !!ae.data, he = !ae.errors || $.errorPolicy === "all" || $.errorPolicy === "ignore", ge.ok && he && Re)
                return pe = ge.headers, zt = ge.status, ae.errors, Se = c(ae, ["errors"]), Ce = $.errorPolicy === "ignore" ? Se : ae, [2, t(t({}, Oe ? { data: Ce } : Ce), { headers: pe, status: zt })];
              throw Mr = typeof ae == "string" ? { error: ae } : ae, new R.ClientError(t(t({}, Mr), { status: ge.status, headers: ge.headers }), { query: y, variables: p });
          }
        });
      });
    }
    function P(f, I, y, p) {
      return i(this, void 0, void 0, function() {
        var u, w;
        return o(this, function(Y) {
          return u = b.parseRawRequestExtendedArgs(f, I, y, p), w = new k(u.url), [2, w.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function q(f, I) {
      for (var y = [], p = 2; p < arguments.length; p++)
        y[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var u, w, Y, V;
        return o(this, function(K) {
          return u = y[0], w = y[1], Y = b.parseRequestExtendedArgs(f, I, u, w), V = new k(Y.url), [2, V.request(t({}, Y))];
        });
      });
    }
    e.request = q;
    function U(f, I, y) {
      return i(this, void 0, void 0, function() {
        var p, u;
        return o(this, function(w) {
          return p = b.parseBatchRequestsExtendedArgs(f, I, y), u = new k(p.url), [2, u.batchRequests(t({}, p))];
        });
      });
    }
    e.batchRequests = U, e.default = q;
    function H(f, I) {
      return I === void 0 && (I = v.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, p, u;
        return o(this, function(w) {
          switch (w.label) {
            case 0:
              return f.headers.forEach(function(Y, V) {
                V.toLowerCase() === "content-type" && (y = Y);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (p = I).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(p, [w.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
      var I, y = void 0, p = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return p.length === 1 && (y = (I = p[0].name) === null || I === void 0 ? void 0 : I.value), y;
    }
    function B(f) {
      if (typeof f == "string") {
        var I = void 0;
        try {
          var y = g.parse(f);
          I = ee(y);
        } catch {
        }
        return { query: f, operationName: I };
      }
      var p = ee(f);
      return { query: C.print(f), operationName: p };
    }
    e.resolveRequestDocument = B;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var I = [], y = 1; y < arguments.length; y++)
        I[y - 1] = arguments[y];
      return f.reduce(function(p, u, w) {
        return "" + p + u + (w in I ? I[w] : "");
      }, "");
    }
    e.gql = A;
    function h(f) {
      var I = {};
      return f.forEach(function(y, p) {
        I[p] = y;
      }), I;
    }
    var m = $m();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(Ao)), Ao;
}
var qm = zd();
function Wm(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function e0(e) {
  return function t(n) {
    return arguments.length === 0 || Wm(n) ? t : e.apply(this, arguments);
  };
}
var Km = /* @__PURE__ */ e0(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function zm(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function t0(e, t, n) {
  if (n || (n = new tw()), ew(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? t0(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Km(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return zm(e);
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
function ew(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var tw = /* @__PURE__ */ function() {
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
}(), nw = /* @__PURE__ */ e0(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : t0(t, !0);
});
const ss = nw;
var oi = function() {
  return oi = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, oi.apply(this, arguments);
};
var Js = /* @__PURE__ */ new Map(), Go = /* @__PURE__ */ new Map(), n0 = !0, ai = !1;
function r0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function rw(e) {
  return r0(e.source.body.substring(e.start, e.end));
}
function sw(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = rw(r.loc), o = Go.get(s);
      o && !o.has(i) ? n0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Go.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), oi(oi({}, e), { definitions: n });
}
function iw(e) {
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
function ow(e) {
  var t = r0(e);
  if (!Js.has(t)) {
    var n = Xd(e, {
      experimentalFragmentVariables: ai,
      allowLegacyFragmentVariables: ai
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Js.set(t, iw(sw(n)));
  }
  return Js.get(t);
}
function xr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), ow(r);
}
function aw() {
  Js.clear(), Go.clear();
}
function cw() {
  n0 = !1;
}
function Aw() {
  ai = !0;
}
function uw() {
  ai = !1;
}
var Gr = {
  gql: xr,
  resetCaches: aw,
  disableFragmentWarnings: cw,
  enableExperimentalFragmentVariables: Aw,
  disableExperimentalFragmentVariables: uw
};
(function(e) {
  e.gql = Gr.gql, e.resetCaches = Gr.resetCaches, e.disableFragmentWarnings = Gr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Gr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Gr.disableExperimentalFragmentVariables;
})(xr || (xr = {}));
xr.default = xr;
const Ae = xr;
function dw(e) {
  return Me(Rn(e, "utf-8"));
}
function hw(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function s0(e) {
  return Me(e);
}
var i0 = {}, Ma = {}, lw = De, Ht = null;
try {
  Ht = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch {
}
function De(e, t, n) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!n;
}
De.prototype.__isLong__;
Object.defineProperty(De.prototype, "__isLong__", { value: !0 });
function Ot(e) {
  return (e && e.__isLong__) === !0;
}
De.isLong = Ot;
var dA = {}, hA = {};
function qn(e, t) {
  var n, r, s;
  return t ? (e >>>= 0, (s = 0 <= e && e < 256) && (r = hA[e], r) ? r : (n = Ne(e, (e | 0) < 0 ? -1 : 0, !0), s && (hA[e] = n), n)) : (e |= 0, (s = -128 <= e && e < 128) && (r = dA[e], r) ? r : (n = Ne(e, e < 0 ? -1 : 0, !1), s && (dA[e] = n), n));
}
De.fromInt = qn;
function Jt(e, t) {
  if (isNaN(e))
    return t ? Zn : Zt;
  if (t) {
    if (e < 0)
      return Zn;
    if (e >= o0)
      return A0;
  } else {
    if (e <= -fA)
      return kt;
    if (e + 1 >= fA)
      return c0;
  }
  return e < 0 ? Jt(-e, t).neg() : Ne(e % vr | 0, e / vr | 0, t);
}
De.fromNumber = Jt;
function Ne(e, t, n) {
  return new De(e, t, n);
}
De.fromBits = Ne;
var ci = Math.pow;
function Ta(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return Zt;
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var r;
  if ((r = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (r === 0)
    return Ta(e.substring(1), t, n).neg();
  for (var s = Jt(ci(n, 8)), i = Zt, o = 0; o < e.length; o += 8) {
    var c = Math.min(8, e.length - o), d = parseInt(e.substring(o, o + c), n);
    if (c < 8) {
      var l = Jt(ci(n, c));
      i = i.mul(l).add(Jt(d));
    } else
      i = i.mul(s), i = i.add(Jt(d));
  }
  return i.unsigned = t, i;
}
De.fromString = Ta;
function Kt(e, t) {
  return typeof e == "number" ? Jt(e, t) : typeof e == "string" ? Ta(e, t) : Ne(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
De.fromValue = Kt;
var lA = 65536, fw = 1 << 24, vr = lA * lA, o0 = vr * vr, fA = o0 / 2, gA = qn(fw), Zt = qn(0);
De.ZERO = Zt;
var Zn = qn(0, !0);
De.UZERO = Zn;
var ir = qn(1);
De.ONE = ir;
var a0 = qn(1, !0);
De.UONE = a0;
var Ho = qn(-1);
De.NEG_ONE = Ho;
var c0 = Ne(-1, 2147483647, !1);
De.MAX_VALUE = c0;
var A0 = Ne(-1, -1, !0);
De.MAX_UNSIGNED_VALUE = A0;
var kt = Ne(0, -2147483648, !1);
De.MIN_VALUE = kt;
var W = De.prototype;
W.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
W.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * vr + (this.low >>> 0) : this.high * vr + (this.low >>> 0);
};
W.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(kt)) {
      var n = Jt(t), r = this.div(n), s = r.mul(n).sub(this);
      return r.toString(t) + s.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Jt(ci(t, 6), this.unsigned), o = this, c = ""; ; ) {
    var d = o.div(i), l = o.sub(d.mul(i)).toInt() >>> 0, E = l.toString(t);
    if (o = d, o.isZero())
      return E + c;
    for (; E.length < 6; )
      E = "0" + E;
    c = "" + E + c;
  }
};
W.getHighBits = function() {
  return this.high;
};
W.getHighBitsUnsigned = function() {
  return this.high >>> 0;
};
W.getLowBits = function() {
  return this.low;
};
W.getLowBitsUnsigned = function() {
  return this.low >>> 0;
};
W.getNumBitsAbs = function() {
  if (this.isNegative())
    return this.eq(kt) ? 64 : this.neg().getNumBitsAbs();
  for (var t = this.high != 0 ? this.high : this.low, n = 31; n > 0 && !(t & 1 << n); n--)
    ;
  return this.high != 0 ? n + 33 : n + 1;
};
W.isZero = function() {
  return this.high === 0 && this.low === 0;
};
W.eqz = W.isZero;
W.isNegative = function() {
  return !this.unsigned && this.high < 0;
};
W.isPositive = function() {
  return this.unsigned || this.high >= 0;
};
W.isOdd = function() {
  return (this.low & 1) === 1;
};
W.isEven = function() {
  return (this.low & 1) === 0;
};
W.equals = function(t) {
  return Ot(t) || (t = Kt(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
};
W.eq = W.equals;
W.notEquals = function(t) {
  return !this.eq(
    /* validates */
    t
  );
};
W.neq = W.notEquals;
W.ne = W.notEquals;
W.lessThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) < 0;
};
W.lt = W.lessThan;
W.lessThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) <= 0;
};
W.lte = W.lessThanOrEqual;
W.le = W.lessThanOrEqual;
W.greaterThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) > 0;
};
W.gt = W.greaterThan;
W.greaterThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) >= 0;
};
W.gte = W.greaterThanOrEqual;
W.ge = W.greaterThanOrEqual;
W.compare = function(t) {
  if (Ot(t) || (t = Kt(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), r = t.isNegative();
  return n && !r ? -1 : !n && r ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
W.comp = W.compare;
W.negate = function() {
  return !this.unsigned && this.eq(kt) ? kt : this.not().add(ir);
};
W.neg = W.negate;
W.add = function(t) {
  Ot(t) || (t = Kt(t));
  var n = this.high >>> 16, r = this.high & 65535, s = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, c = t.high & 65535, d = t.low >>> 16, l = t.low & 65535, E = 0, g = 0, C = 0, x = 0;
  return x += i + l, C += x >>> 16, x &= 65535, C += s + d, g += C >>> 16, C &= 65535, g += r + c, E += g >>> 16, g &= 65535, E += n + o, E &= 65535, Ne(C << 16 | x, E << 16 | g, this.unsigned);
};
W.subtract = function(t) {
  return Ot(t) || (t = Kt(t)), this.add(t.neg());
};
W.sub = W.subtract;
W.multiply = function(t) {
  if (this.isZero())
    return Zt;
  if (Ot(t) || (t = Kt(t)), Ht) {
    var n = Ht.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return Ne(n, Ht.get_high(), this.unsigned);
  }
  if (t.isZero())
    return Zt;
  if (this.eq(kt))
    return t.isOdd() ? kt : Zt;
  if (t.eq(kt))
    return this.isOdd() ? kt : Zt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(gA) && t.lt(gA))
    return Jt(this.toNumber() * t.toNumber(), this.unsigned);
  var r = this.high >>> 16, s = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, c = t.high >>> 16, d = t.high & 65535, l = t.low >>> 16, E = t.low & 65535, g = 0, C = 0, x = 0, v = 0;
  return v += o * E, x += v >>> 16, v &= 65535, x += i * E, C += x >>> 16, x &= 65535, x += o * l, C += x >>> 16, x &= 65535, C += s * E, g += C >>> 16, C &= 65535, C += i * l, g += C >>> 16, C &= 65535, C += o * d, g += C >>> 16, C &= 65535, g += r * E + s * l + i * d + o * c, g &= 65535, Ne(x << 16 | v, g << 16 | C, this.unsigned);
};
W.mul = W.multiply;
W.divide = function(t) {
  if (Ot(t) || (t = Kt(t)), t.isZero())
    throw Error("division by zero");
  if (Ht) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? Ht.div_u : Ht.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return Ne(n, Ht.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? Zn : Zt;
  var r, s, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return Zn;
    if (t.gt(this.shru(1)))
      return a0;
    i = Zn;
  } else {
    if (this.eq(kt)) {
      if (t.eq(ir) || t.eq(Ho))
        return kt;
      if (t.eq(kt))
        return ir;
      var o = this.shr(1);
      return r = o.div(t).shl(1), r.eq(Zt) ? t.isNegative() ? ir : Ho : (s = this.sub(t.mul(r)), i = r.add(s.div(t)), i);
    } else if (t.eq(kt))
      return this.unsigned ? Zn : Zt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = Zt;
  }
  for (s = this; s.gte(t); ) {
    r = Math.max(1, Math.floor(s.toNumber() / t.toNumber()));
    for (var c = Math.ceil(Math.log(r) / Math.LN2), d = c <= 48 ? 1 : ci(2, c - 48), l = Jt(r), E = l.mul(t); E.isNegative() || E.gt(s); )
      r -= d, l = Jt(r, this.unsigned), E = l.mul(t);
    l.isZero() && (l = ir), i = i.add(l), s = s.sub(E);
  }
  return i;
};
W.div = W.divide;
W.modulo = function(t) {
  if (Ot(t) || (t = Kt(t)), Ht) {
    var n = (this.unsigned ? Ht.rem_u : Ht.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return Ne(n, Ht.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
W.mod = W.modulo;
W.rem = W.modulo;
W.not = function() {
  return Ne(~this.low, ~this.high, this.unsigned);
};
W.and = function(t) {
  return Ot(t) || (t = Kt(t)), Ne(this.low & t.low, this.high & t.high, this.unsigned);
};
W.or = function(t) {
  return Ot(t) || (t = Kt(t)), Ne(this.low | t.low, this.high | t.high, this.unsigned);
};
W.xor = function(t) {
  return Ot(t) || (t = Kt(t)), Ne(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
W.shiftLeft = function(t) {
  return Ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? Ne(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : Ne(0, this.low << t - 32, this.unsigned);
};
W.shl = W.shiftLeft;
W.shiftRight = function(t) {
  return Ot(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? Ne(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : Ne(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
W.shr = W.shiftRight;
W.shiftRightUnsigned = function(t) {
  if (Ot(t) && (t = t.toInt()), t &= 63, t === 0)
    return this;
  var n = this.high;
  if (t < 32) {
    var r = this.low;
    return Ne(r >>> t | n << 32 - t, n >>> t, this.unsigned);
  } else
    return t === 32 ? Ne(n, 0, this.unsigned) : Ne(n >>> t - 32, 0, this.unsigned);
};
W.shru = W.shiftRightUnsigned;
W.shr_u = W.shiftRightUnsigned;
W.toSigned = function() {
  return this.unsigned ? Ne(this.low, this.high, !1) : this;
};
W.toUnsigned = function() {
  return this.unsigned ? this : Ne(this.low, this.high, !0);
};
W.toBytes = function(t) {
  return t ? this.toBytesLE() : this.toBytesBE();
};
W.toBytesLE = function() {
  var t = this.high, n = this.low;
  return [
    n & 255,
    n >>> 8 & 255,
    n >>> 16 & 255,
    n >>> 24,
    t & 255,
    t >>> 8 & 255,
    t >>> 16 & 255,
    t >>> 24
  ];
};
W.toBytesBE = function() {
  var t = this.high, n = this.low;
  return [
    t >>> 24,
    t >>> 16 & 255,
    t >>> 8 & 255,
    t & 255,
    n >>> 24,
    n >>> 16 & 255,
    n >>> 8 & 255,
    n & 255
  ];
};
De.fromBytes = function(t, n, r) {
  return r ? De.fromBytesLE(t, n) : De.fromBytesBE(t, n);
};
De.fromBytesLE = function(t, n) {
  return new De(
    t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,
    t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,
    n
  );
};
De.fromBytesBE = function(t, n) {
  return new De(
    t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],
    t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],
    n
  );
};
var _i = {};
Object.defineProperty(_i, "__esModule", { value: !0 });
const u0 = [
  [1483228800, 37],
  [1435708800, 36],
  [1341100800, 35],
  [1230768e3, 34],
  [1136073600, 33],
  [915148800, 32],
  [867715200, 31],
  [820454400, 30],
  [773020800, 29],
  [741484800, 28],
  [709948800, 27],
  [662688e3, 26],
  [631152e3, 25],
  [567993600, 24],
  [489024e3, 23],
  [425865600, 22],
  [394329600, 21],
  [362793600, 20],
  [315532800, 19],
  [283996800, 18],
  [252460800, 17],
  [220924800, 16],
  [189302400, 15],
  [157766400, 14],
  [126230400, 13],
  [94694400, 12],
  [78796800, 11],
  [63072e3, 10]
], gw = (e) => {
  const t = u0.find(([n]) => e >= n);
  return e + (t ? t[1] : 0);
};
_i.addLeapSeconds = gw;
const pw = (e) => {
  const t = u0.find(([n, r]) => e - r >= n);
  return e - (t ? t[1] : 0);
};
_i.removeLeapSeconds = pw;
var mw = ye && ye.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ma, "__esModule", { value: !0 });
const Yr = mw(lw), pA = _i;
let Jo = class Cn {
  /**
   * Construct an instance of TAI64.
   *
   * @param label - The TAI64 label between 0 and 2^63-1, inclusive
   * @returns An instance of TAI64
   * @throws RangeError if the given label is not between 0 and 2^63-1, inclusive
   */
  constructor(t) {
    if (this.label = t, t.lt(Yr.default.ZERO) || t.gte(Yr.default.MAX_VALUE))
      throw new RangeError("Label must be an integer between 0 and 2^63-1, inclusive");
  }
  /**
   * Return a TAI64 the current number of seconds elapsed since 1970 TAI.
   *
   * @returns An instance of TAI64
   */
  static now() {
    const t = Math.floor(Date.now() / 1e3);
    return Cn.fromUnix(t);
  }
  /**
   * Return a TAI64 corresponding to the given UNIX timestamp.
   *
   * @param timestamp - The UNIX timestamp in seconds
   * @returns An instance of TAI64
   */
  static fromUnix(t) {
    const n = pA.addLeapSeconds(t), r = Cn.EPOCH.label.add(n);
    return new Cn(r);
  }
  /**
   * Return a TAI64 corresponding to the given hexadecimal string representing a TAI64. This method
   * is an alias for `TAI64#fromString()` method.
   *
   * @param hexString - The hexadecimal string
   * @returns An instance of TAI64
   */
  static fromHexString(t) {
    return Cn.fromString(t);
  }
  /**
   * Return a TAI64 corresponding to the given string representing a TAI64 in the given radix.
   *
   * @param str - The string
   * @param radix - An integer that represents the radix (the base in mathematical numeral systems), defaults to `16`
   * @returns An instance of TAI64
   */
  static fromString(t, n = 16) {
    const r = Yr.default.fromString(t, !1, n);
    return new Cn(r);
  }
  /**
   * Return a TAI64 corresponding to the given byte array representing a TAI64.
   *
   * @param bytes - The byte array
   * @returns An instance of TAI64
   */
  static fromByteArray(t) {
    const n = Yr.default.fromBytes(t, !1);
    return new Cn(n);
  }
  /**
   * Return if this TAI64 is after the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns `true` if this TAI64 is after the given TAI64, `false` otherwise
   */
  isAfter(t) {
    return this.compareTo(t) > 0;
  }
  /**
   * Return if this TAI64 is before the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns `true` if this TAI64 is before the given TAI64, `false` otherwise
   */
  isBefore(t) {
    return this.compareTo(t) < 0;
  }
  /**
   * Return if this TAI64 is equal to the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns `true` if this TAI64 is equal to the given TAI64, `false` otherwise
   */
  isEqual(t) {
    return this.compareTo(t) === 0;
  }
  /**
   * Compare this TAI64 to the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns
   * - `1` if this TAI64 is before the given TAI64
   * - `-1` if this TAI64 is before the given TAI64
   * - `0` if this TAI64 is equal to the given TAI64
   */
  compareTo(t) {
    return this.label.compare(t.label);
  }
  /**
   * Return a byte array representation of this TAI64.
   */
  toByteArray() {
    return this.label.toBytes();
  }
  /**
   * Return an hexadecimal string representation of this TAI64. This method
   * is an alias for `TAI64#toString()` method.
   */
  toHexString() {
    return this.toString();
  }
  /**
   * Return a string representation of this TAI64.
   *
   * @param radix - An integer that represents the radix (the base in mathematical numeral systems), defaults to `16`
   */
  toString(t = 16) {
    return this.label.toString(t);
  }
  /**
   * Return a UNIX timestamp corresponding to this TAI64.
   */
  toUnix() {
    const t = this.label.sub(Cn.EPOCH.label);
    return pA.removeLeapSeconds(t.toNumber());
  }
};
Jo.EPOCH = new Jo(Yr.default.MAX_VALUE.shiftRight(1).add(1));
Ma.TAI64 = Jo;
Object.defineProperty(i0, "__esModule", { value: !0 });
var ww = Ma, d0 = i0.TAI64 = ww.TAI64;
let le;
const h0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && h0.decode();
let Vr = null;
function l0() {
  return (Vr === null || Vr.byteLength === 0) && (Vr = new Uint8Array(le.memory.buffer)), Vr;
}
function Ew(e, t) {
  return e = e >>> 0, h0.decode(l0().subarray(e, e + t));
}
function f0(e) {
  const t = le.ret(e);
  return Vt.__wrap(t);
}
function Iw(e, t) {
  const n = le.retd(e, t);
  return Vt.__wrap(n);
}
function mA(e, t, n, r) {
  const s = le.call(e, t, n, r);
  return Vt.__wrap(s);
}
function yw(e, t, n) {
  const r = le.tr(e, t, n);
  return Vt.__wrap(r);
}
function wA(e, t, n) {
  const r = le.addi(e, t, n);
  return Vt.__wrap(r);
}
function Bw(e, t, n) {
  const r = le.muli(e, t, n);
  return Vt.__wrap(r);
}
function Xr(e, t, n) {
  const r = le.lw(e, t, n);
  return Vt.__wrap(r);
}
function Cw(e, t, n) {
  const r = le.gtf(e, t, n);
  return Vt.__wrap(r);
}
function Ds(e, t) {
  const n = le.movi(e, t);
  return Vt.__wrap(n);
}
let jr = null;
function EA() {
  return (jr === null || jr.byteLength === 0) && (jr = new Int32Array(le.memory.buffer)), jr;
}
function bw(e, t) {
  return e = e >>> 0, l0().subarray(e / 1, e / 1 + t);
}
const Qw = Object.freeze({
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
class Vt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Vt.prototype);
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
      var t = EA()[s / 4 + 0], n = EA()[s / 4 + 1], r = bw(t, n).slice();
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
class Te {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Te.prototype);
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
    return n === 0 ? void 0 : Te.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = le.regid_bal();
    return Te.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = le.regid_cgas();
    return Te.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = le.regid_err();
    return Te.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = le.regid_flag();
    return Te.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = le.regid_fp();
    return Te.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = le.regid_ggas();
    return Te.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = le.regid_hp();
    return Te.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = le.regid_is();
    return Te.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = le.regid_of();
    return Te.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = le.regid_one();
    return Te.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = le.regid_pc();
    return Te.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = le.regid_ret();
    return Te.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = le.regid_retl();
    return Te.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = le.regid_sp();
    return Te.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = le.regid_spp();
    return Te.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = le.regid_writable();
    return Te.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = le.regid_zero();
    return Te.__wrap(t);
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
async function xw(e, t) {
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
function vw() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Ew(t, n));
  }, e;
}
function Fw(e, t) {
  return le = e.exports, g0.__wbindgen_wasm_module = t, jr = null, Vr = null, le;
}
async function g0(e) {
  if (le !== void 0)
    return le;
  const t = vw(), { instance: n, module: r } = await xw(await e, t);
  return Fw(n, r);
}
function Dw(e, t, n, r) {
  function s(g, C, x) {
    var v = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, b = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? v(g, C) : b(g);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var c = globalThis.atob(n), d = c.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var l = 0; l < d; l++)
      i[l] = c.charCodeAt(l);
  }
  if (e) {
    var E = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(E, r) : E;
  } else
    return s(i, r, !1);
}
function Nw(e) {
  return Dw(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function Pa() {
  return await g0(Nw());
}
Pa();
function IA(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Rw(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function p0(e, ...t) {
  if (!Rw(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Sw(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  IA(e.outputLen), IA(e.blockLen);
}
function Ai(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function _w(e, t) {
  p0(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const ho = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function m0(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const lo = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), nn = (e, t) => e << 32 - t | e >>> t, kw = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!kw)
  throw new Error("Non little-endian hardware is not supported");
function Ow(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Ua(e) {
  if (typeof e == "string" && (e = Ow(e)), !m0(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function Lw(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!m0(s))
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
class w0 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Mw(e) {
  const t = (r) => e().update(Ua(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Tw(e = 32) {
  if (ho && typeof ho.getRandomValues == "function")
    return ho.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function Pw(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
class Uw extends w0 {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = lo(this.buffer);
  }
  update(t) {
    Ai(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Ua(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = lo(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Ai(this), _w(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    Pw(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = lo(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, E = this.get();
    if (l > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
      c.setUint32(4 * g, E[g], i);
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
const Gw = (e, t, n) => e & t ^ ~e & n, Hw = (e, t, n) => e & t ^ e & n ^ t & n, Jw = /* @__PURE__ */ new Uint32Array([
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
]), yn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Bn = /* @__PURE__ */ new Uint32Array(64);
class Zw extends Uw {
  constructor() {
    super(64, 32, 8, !1), this.A = yn[0] | 0, this.B = yn[1] | 0, this.C = yn[2] | 0, this.D = yn[3] | 0, this.E = yn[4] | 0, this.F = yn[5] | 0, this.G = yn[6] | 0, this.H = yn[7] | 0;
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
      Bn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = Bn[g - 15], x = Bn[g - 2], v = nn(C, 7) ^ nn(C, 18) ^ C >>> 3, b = nn(x, 17) ^ nn(x, 19) ^ x >>> 10;
      Bn[g] = b + Bn[g - 7] + v + Bn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: E } = this;
    for (let g = 0; g < 64; g++) {
      const C = nn(c, 6) ^ nn(c, 11) ^ nn(c, 25), x = E + C + Gw(c, d, l) + Jw[g] + Bn[g] | 0, b = (nn(r, 2) ^ nn(r, 13) ^ nn(r, 22)) + Hw(r, s, i) | 0;
      E = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, l, E);
  }
  roundClean() {
    Bn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Yw = /* @__PURE__ */ Mw(() => new Zw());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const yt = BigInt(0), He = BigInt(1), Hn = BigInt(2), Vw = BigInt(3), Zo = BigInt(4), yA = BigInt(5), BA = BigInt(8);
BigInt(9);
BigInt(16);
function Dt(e, t) {
  const n = e % t;
  return n >= yt ? n : t + n;
}
function Xw(e, t, n) {
  if (n <= yt || t < yt)
    throw new Error("Expected power/modulo > 0");
  if (n === He)
    return yt;
  let r = He;
  for (; t > yt; )
    t & He && (r = r * e % n), e = e * e % n, t >>= He;
  return r;
}
function Tt(e, t, n) {
  let r = e;
  for (; t-- > yt; )
    r *= r, r %= n;
  return r;
}
function Yo(e, t) {
  if (e === yt || t <= yt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Dt(e, t), r = t, s = yt, i = He;
  for (; n !== yt; ) {
    const c = r / n, d = r % n, l = s - i * c;
    r = n, n = d, s = i, i = l;
  }
  if (r !== He)
    throw new Error("invert: does not exist");
  return Dt(s, t);
}
function jw(e) {
  const t = (e - He) / Hn;
  let n, r, s;
  for (n = e - He, r = 0; n % Hn === yt; n /= Hn, r++)
    ;
  for (s = Hn; s < e && Xw(s, t, e) !== e - He; s++)
    ;
  if (r === 1) {
    const o = (e + He) / Zo;
    return function(d, l) {
      const E = d.pow(l, o);
      if (!d.eql(d.sqr(E), l))
        throw new Error("Cannot find square root");
      return E;
    };
  }
  const i = (n + He) / Hn;
  return function(c, d) {
    if (c.pow(d, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let l = r, E = c.pow(c.mul(c.ONE, s), n), g = c.pow(d, i), C = c.pow(d, n);
    for (; !c.eql(C, c.ONE); ) {
      if (c.eql(C, c.ZERO))
        return c.ZERO;
      let x = 1;
      for (let b = c.sqr(C); x < l && !c.eql(b, c.ONE); x++)
        b = c.sqr(b);
      const v = c.pow(E, He << BigInt(l - x - 1));
      E = c.sqr(v), g = c.mul(g, v), C = c.mul(C, E), l = x;
    }
    return g;
  };
}
function $w(e) {
  if (e % Zo === Vw) {
    const t = (e + He) / Zo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % BA === yA) {
    const t = (e - yA) / BA;
    return function(r, s) {
      const i = r.mul(s, Hn), o = r.pow(i, t), c = r.mul(s, o), d = r.mul(r.mul(c, Hn), o), l = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return jw(e);
}
const qw = [
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
function Ww(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = qw.reduce((r, s) => (r[s] = "function", r), t);
  return fs(e, n);
}
function Kw(e, t, n) {
  if (n < yt)
    throw new Error("Expected power > 0");
  if (n === yt)
    return e.ONE;
  if (n === He)
    return t;
  let r = e.ONE, s = t;
  for (; n > yt; )
    n & He && (r = e.mul(r, s)), s = e.sqr(s), n >>= He;
  return r;
}
function zw(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function E0(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function eE(e, t, n = !1, r = {}) {
  if (e <= yt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = E0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = $w(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: ka(s),
    ZERO: yt,
    ONE: He,
    create: (d) => Dt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return yt <= d && d < e;
    },
    is0: (d) => d === yt,
    isOdd: (d) => (d & He) === He,
    neg: (d) => Dt(-d, e),
    eql: (d, l) => d === l,
    sqr: (d) => Dt(d * d, e),
    add: (d, l) => Dt(d + l, e),
    sub: (d, l) => Dt(d - l, e),
    mul: (d, l) => Dt(d * l, e),
    pow: (d, l) => Kw(c, d, l),
    div: (d, l) => Dt(d * Yo(l, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, l) => d + l,
    subN: (d, l) => d - l,
    mulN: (d, l) => d * l,
    inv: (d) => Yo(d, e),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => zw(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, l, E) => E ? l : d,
    toBytes: (d) => n ? _a(d, i) : Qr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? Sa(d) : Vn(d);
    }
  });
  return Object.freeze(c);
}
function I0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function y0(e) {
  const t = I0(e);
  return t + Math.ceil(t / 2);
}
function tE(e, t, n = !1) {
  const r = e.length, s = I0(t), i = y0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Vn(e) : Sa(e), c = Dt(o, t - He) + He;
  return n ? _a(c, s) : Qr(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const nE = BigInt(0), fo = BigInt(1);
function rE(e, t) {
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
      for (; i > nE; )
        i & fo && (o = o.add(c)), c = c.double(), i >>= fo;
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
      let l = s, E = l;
      for (let g = 0; g < o; g++) {
        E = l, d.push(E);
        for (let C = 1; C < c; C++)
          E = E.add(l), d.push(E);
        l = E.double();
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
      let l = e.ZERO, E = e.BASE;
      const g = BigInt(2 ** s - 1), C = 2 ** s, x = BigInt(s);
      for (let v = 0; v < c; v++) {
        const b = v * d;
        let R = Number(o & g);
        o >>= x, R > d && (R -= C, o += fo);
        const S = b, J = b + Math.abs(R) - 1, T = v % 2 !== 0, j = R < 0;
        R === 0 ? E = E.add(n(T, i[S])) : l = l.add(n(j, i[J]));
      }
      return { p: l, f: E };
    },
    wNAFCached(s, i, o, c) {
      const d = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, d), d !== 1 && i.set(s, c(l))), this.wNAF(d, l, o);
    }
  };
}
function B0(e) {
  return Ww(e.Fp), fs(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...E0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function sE(e) {
  const t = B0(e);
  fs(t, {
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
const { bytesToNumberBE: iE, hexToBytes: oE } = Tp, Yn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Yn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: iE(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Yn, n = typeof e == "string" ? oE(e) : e;
    if (!an(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Yn._parseInt(n.subarray(2)), { d: o, l: c } = Yn._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, n = (l) => {
      const E = l.toString(16);
      return E.length & 1 ? `0${E}` : E;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${c}${r}`;
  }
}, ln = BigInt(0), Pt = BigInt(1);
BigInt(2);
const CA = BigInt(3);
BigInt(4);
function aE(e) {
  const t = sE(e), { Fp: n } = t, r = t.toBytes || ((v, b, R) => {
    const S = b.toAffine();
    return ns(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = t.fromBytes || ((v) => {
    const b = v.subarray(1), R = n.fromBytes(b.subarray(0, n.BYTES)), S = n.fromBytes(b.subarray(n.BYTES, 2 * n.BYTES));
    return { x: R, y: S };
  });
  function i(v) {
    const { a: b, b: R } = t, S = n.sqr(v), J = n.mul(S, v);
    return n.add(n.add(J, n.mul(v, b)), R);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(v) {
    return typeof v == "bigint" && ln < v && v < t.n;
  }
  function c(v) {
    if (!o(v))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(v) {
    const { allowedPrivateKeyLengths: b, nByteLength: R, wrapPrivateKey: S, n: J } = t;
    if (b && typeof v != "bigint") {
      if (an(v) && (v = Cr(v)), typeof v != "string" || !b.includes(v.length))
        throw new Error("Invalid key");
      v = v.padStart(R * 2, "0");
    }
    let T;
    try {
      T = typeof v == "bigint" ? v : Vn($t("private key", v, R));
    } catch {
      throw new Error(`private key must be ${R} bytes, hex or bigint, not ${typeof v}`);
    }
    return S && (T = Dt(T, J)), c(T), T;
  }
  const l = /* @__PURE__ */ new Map();
  function E(v) {
    if (!(v instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(b, R, S) {
      if (this.px = b, this.py = R, this.pz = S, b == null || !n.isValid(b))
        throw new Error("x required");
      if (R == null || !n.isValid(R))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: R, y: S } = b || {};
      if (!b || !n.isValid(R) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (b instanceof g)
        throw new Error("projective point not allowed");
      const J = (T) => n.eql(T, n.ZERO);
      return J(R) && J(S) ? g.ZERO : new g(R, S, n.ONE);
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
      const R = n.invertBatch(b.map((S) => S.pz));
      return b.map((S, J) => S.toAffine(R[J])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const R = g.fromAffine(s($t("pointHex", b)));
      return R.assertValidity(), R;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(b) {
      return g.BASE.multiply(d(b));
    }
    // "Private method", don't use it directly
    _setWindowSize(b) {
      this._WINDOW_SIZE = b, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: b, y: R } = this.toAffine();
      if (!n.isValid(b) || !n.isValid(R))
        throw new Error("bad point: x or y not FE");
      const S = n.sqr(R), J = i(b);
      if (!n.eql(S, J))
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
      E(b);
      const { px: R, py: S, pz: J } = this, { px: T, py: j, pz: O } = b, k = n.eql(n.mul(R, O), n.mul(T, J)), L = n.eql(n.mul(S, O), n.mul(j, J));
      return k && L;
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
      const { a: b, b: R } = t, S = n.mul(R, CA), { px: J, py: T, pz: j } = this;
      let O = n.ZERO, k = n.ZERO, L = n.ZERO, P = n.mul(J, J), q = n.mul(T, T), U = n.mul(j, j), H = n.mul(J, T);
      return H = n.add(H, H), L = n.mul(J, j), L = n.add(L, L), O = n.mul(b, L), k = n.mul(S, U), k = n.add(O, k), O = n.sub(q, k), k = n.add(q, k), k = n.mul(O, k), O = n.mul(H, O), L = n.mul(S, L), U = n.mul(b, U), H = n.sub(P, U), H = n.mul(b, H), H = n.add(H, L), L = n.add(P, P), P = n.add(L, P), P = n.add(P, U), P = n.mul(P, H), k = n.add(k, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, H), O = n.sub(O, P), L = n.mul(U, q), L = n.add(L, L), L = n.add(L, L), new g(O, k, L);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      E(b);
      const { px: R, py: S, pz: J } = this, { px: T, py: j, pz: O } = b;
      let k = n.ZERO, L = n.ZERO, P = n.ZERO;
      const q = t.a, U = n.mul(t.b, CA);
      let H = n.mul(R, T), ee = n.mul(S, j), B = n.mul(J, O), a = n.add(R, S), A = n.add(T, j);
      a = n.mul(a, A), A = n.add(H, ee), a = n.sub(a, A), A = n.add(R, J);
      let h = n.add(T, O);
      return A = n.mul(A, h), h = n.add(H, B), A = n.sub(A, h), h = n.add(S, J), k = n.add(j, O), h = n.mul(h, k), k = n.add(ee, B), h = n.sub(h, k), P = n.mul(q, A), k = n.mul(U, B), P = n.add(k, P), k = n.sub(ee, P), P = n.add(ee, P), L = n.mul(k, P), ee = n.add(H, H), ee = n.add(ee, H), B = n.mul(q, B), A = n.mul(U, A), ee = n.add(ee, B), B = n.sub(H, B), B = n.mul(q, B), A = n.add(A, B), H = n.mul(ee, A), L = n.add(L, H), H = n.mul(h, A), k = n.mul(a, k), k = n.sub(k, H), H = n.mul(a, ee), P = n.mul(h, P), P = n.add(P, H), new g(k, L, P);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(b) {
      return x.wNAFCached(this, l, b, (R) => {
        const S = n.invertBatch(R.map((J) => J.pz));
        return R.map((J, T) => J.toAffine(S[T])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const R = g.ZERO;
      if (b === ln)
        return R;
      if (c(b), b === Pt)
        return this;
      const { endo: S } = t;
      if (!S)
        return x.unsafeLadder(this, b);
      let { k1neg: J, k1: T, k2neg: j, k2: O } = S.splitScalar(b), k = R, L = R, P = this;
      for (; T > ln || O > ln; )
        T & Pt && (k = k.add(P)), O & Pt && (L = L.add(P)), P = P.double(), T >>= Pt, O >>= Pt;
      return J && (k = k.negate()), j && (L = L.negate()), L = new g(n.mul(L.px, S.beta), L.py, L.pz), k.add(L);
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
      c(b);
      let R = b, S, J;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: O, k2neg: k, k2: L } = T.splitScalar(R);
        let { p: P, f: q } = this.wNAF(O), { p: U, f: H } = this.wNAF(L);
        P = x.constTimeNegate(j, P), U = x.constTimeNegate(k, U), U = new g(n.mul(U.px, T.beta), U.py, U.pz), S = P.add(U), J = q.add(H);
      } else {
        const { p: j, f: O } = this.wNAF(R);
        S = j, J = O;
      }
      return g.normalizeZ([S, J])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(b, R, S) {
      const J = g.BASE, T = (O, k) => k === ln || k === Pt || !O.equals(J) ? O.multiplyUnsafe(k) : O.multiply(k), j = T(this, R).add(T(b, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      const { px: R, py: S, pz: J } = this, T = this.is0();
      b == null && (b = T ? n.ONE : n.inv(J));
      const j = n.mul(R, b), O = n.mul(S, b), k = n.mul(J, b);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(k, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: O };
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: R } = t;
      if (b === Pt)
        return !0;
      if (R)
        return R(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: R } = t;
      return b === Pt ? this : R ? R(g, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(b = !0) {
      return this.assertValidity(), r(g, this, b);
    }
    toHex(b = !0) {
      return Cr(this.toRawBytes(b));
    }
  }
  g.BASE = new g(t.Gx, t.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, x = rE(g, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: g,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function cE(e) {
  const t = B0(e);
  return fs(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function AE(e) {
  const t = cE(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return ln < A && A < n.ORDER;
  }
  function c(A) {
    return Dt(A, r);
  }
  function d(A) {
    return Yo(A, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: E, weierstrassEquation: g, isWithinCurveOrder: C } = aE({
    ...t,
    toBytes(A, h, m) {
      const f = h.toAffine(), I = n.toBytes(f.x), y = ns;
      return m ? y(Uint8Array.from([h.hasEvenY() ? 2 : 3]), I) : y(Uint8Array.from([4]), I, n.toBytes(f.y));
    },
    fromBytes(A) {
      const h = A.length, m = A[0], f = A.subarray(1);
      if (h === s && (m === 2 || m === 3)) {
        const I = Vn(f);
        if (!o(I))
          throw new Error("Point is not on curve");
        const y = g(I);
        let p = n.sqrt(y);
        const u = (p & Pt) === Pt;
        return (m & 1) === 1 !== u && (p = n.neg(p)), { x: I, y: p };
      } else if (h === i && m === 4) {
        const I = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: I, y };
      } else
        throw new Error(`Point of length ${h} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (A) => Cr(Qr(A, t.nByteLength));
  function v(A) {
    const h = r >> Pt;
    return A > h;
  }
  function b(A) {
    return v(A) ? c(-A) : A;
  }
  const R = (A, h, m) => Vn(A.slice(h, m));
  class S {
    constructor(h, m, f) {
      this.r = h, this.s = m, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(h) {
      const m = t.nByteLength;
      return h = $t("compactSignature", h, m * 2), new S(R(h, 0, m), R(h, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(h) {
      const { r: m, s: f } = Yn.toSig($t("DER", h));
      return new S(m, f);
    }
    assertValidity() {
      if (!C(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!C(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(h) {
      return new S(this.r, this.s, h);
    }
    recoverPublicKey(h) {
      const { r: m, s: f, recovery: I } = this, y = L($t("msgHash", h));
      if (I == null || ![0, 1, 2, 3].includes(I))
        throw new Error("recovery id invalid");
      const p = I === 2 || I === 3 ? m + t.n : m;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = I & 1 ? "03" : "02", w = l.fromHex(u + x(p)), Y = d(p), V = c(-y * Y), K = c(f * Y), $ = l.BASE.multiplyAndAddUnsafe(w, V, K);
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
      return br(this.toDERHex());
    }
    toDERHex() {
      return Yn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return br(this.toCompactHex());
    }
    toCompactHex() {
      return x(this.r) + x(this.s);
    }
  }
  const J = {
    isValidPrivateKey(A) {
      try {
        return E(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: E,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = y0(t.n);
      return tE(t.randomBytes(A), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(A = 8, h = l.BASE) {
      return h._setWindowSize(A), h.multiply(BigInt(3)), h;
    }
  };
  function T(A, h = !0) {
    return l.fromPrivateKey(A).toRawBytes(h);
  }
  function j(A) {
    const h = an(A), m = typeof A == "string", f = (h || m) && A.length;
    return h ? f === s || f === i : m ? f === 2 * s || f === 2 * i : A instanceof l;
  }
  function O(A, h, m = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(h))
      throw new Error("second arg must be public key");
    return l.fromHex(h).multiply(E(A)).toRawBytes(m);
  }
  const k = t.bits2int || function(A) {
    const h = Vn(A), m = A.length * 8 - t.nBitLength;
    return m > 0 ? h >> BigInt(m) : h;
  }, L = t.bits2int_modN || function(A) {
    return c(k(A));
  }, P = ka(t.nBitLength);
  function q(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(ln <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return Qr(A, t.nByteLength);
  }
  function U(A, h, m = H) {
    if (["recovered", "canonical"].some((se) => se in m))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: I } = t;
    let { lowS: y, prehash: p, extraEntropy: u } = m;
    y == null && (y = !0), A = $t("msgHash", A), p && (A = $t("prehashed msgHash", f(A)));
    const w = L(A), Y = E(h), V = [q(Y), q(w)];
    if (u != null) {
      const se = u === !0 ? I(n.BYTES) : u;
      V.push($t("extraEntropy", se));
    }
    const K = ns(...V), $ = w;
    function re(se) {
      const Oe = k(se);
      if (!C(Oe))
        return;
      const ge = d(Oe), ae = l.BASE.multiply(Oe).toAffine(), Re = c(ae.x);
      if (Re === ln)
        return;
      const he = c(ge * c($ + Re * Y));
      if (he === ln)
        return;
      let pe = (ae.x === Re ? 0 : 2) | Number(ae.y & Pt), zt = he;
      return y && v(he) && (zt = b(he), pe ^= 1), new S(Re, zt, pe);
    }
    return { seed: K, k2sig: re };
  }
  const H = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function B(A, h, m = H) {
    const { seed: f, k2sig: I } = U(A, h, m), y = t;
    return Ld(y.hash.outputLen, y.nByteLength, y.hmac)(f, I);
  }
  l.BASE._setWindowSize(8);
  function a(A, h, m, f = ee) {
    var ae;
    const I = A;
    if (h = $t("msgHash", h), m = $t("publicKey", m), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: p } = f;
    let u, w;
    try {
      if (typeof I == "string" || an(I))
        try {
          u = S.fromDER(I);
        } catch (Re) {
          if (!(Re instanceof Yn.Err))
            throw Re;
          u = S.fromCompact(I);
        }
      else if (typeof I == "object" && typeof I.r == "bigint" && typeof I.s == "bigint") {
        const { r: Re, s: he } = I;
        u = new S(Re, he);
      } else
        throw new Error("PARSE");
      w = l.fromHex(m);
    } catch (Re) {
      if (Re.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    p && (h = t.hash(h));
    const { r: Y, s: V } = u, K = L(h), $ = d(V), re = c(K * $), se = c(Y * $), Oe = (ae = l.BASE.multiplyAndAddUnsafe(w, re, se)) == null ? void 0 : ae.toAffine();
    return Oe ? c(Oe.x) === Y : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: O,
    sign: B,
    verify: a,
    ProjectivePoint: l,
    Signature: S,
    utils: J
  };
}
class C0 extends w0 {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Sw(t);
    const r = Ua(n);
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
    return Ai(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Ai(this), p0(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const b0 = (e, t, n) => new C0(e, t).update(n).digest();
b0.create = (e, t) => new C0(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function uE(e) {
  return {
    hash: e,
    hmac: (t, ...n) => b0(e, t, Lw(...n)),
    randomBytes: Tw
  };
}
function dE(e, t) {
  const n = (r) => AE({ ...e, ...uE(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Q0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), bA = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), hE = BigInt(1), Vo = BigInt(2), QA = (e, t) => (e + t / Vo) / t;
function lE(e) {
  const t = Q0, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), l = e * e * e % t, E = l * l * e % t, g = Tt(E, n, t) * E % t, C = Tt(g, n, t) * E % t, x = Tt(C, Vo, t) * l % t, v = Tt(x, s, t) * x % t, b = Tt(v, i, t) * v % t, R = Tt(b, c, t) * b % t, S = Tt(R, d, t) * R % t, J = Tt(S, c, t) * b % t, T = Tt(J, n, t) * E % t, j = Tt(T, o, t) * v % t, O = Tt(j, r, t) * l % t, k = Tt(O, Vo, t);
  if (!Xo.eql(Xo.sqr(k), e))
    throw new Error("Cannot find square root");
  return k;
}
const Xo = eE(Q0, void 0, void 0, { sqrt: lE }), bn = dE({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Xo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: bA,
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
      const t = bA, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -hE * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = QA(i * e, t), d = QA(-r * e, t);
      let l = Dt(e - c * n - d * s, t), E = Dt(-c * r - d * i, t);
      const g = l > o, C = E > o;
      if (g && (l = t - l), C && (E = t - E), l > o || E > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: l, k2neg: C, k2: E };
    }
  }
}, Yw);
BigInt(0);
bn.ProjectivePoint;
let Ns;
const fE = new Uint8Array(16);
function gE() {
  if (!Ns && (Ns = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Ns))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ns(fE);
}
const Bt = [];
for (let e = 0; e < 256; ++e)
  Bt.push((e + 256).toString(16).slice(1));
function pE(e, t = 0) {
  return (Bt[e[t + 0]] + Bt[e[t + 1]] + Bt[e[t + 2]] + Bt[e[t + 3]] + "-" + Bt[e[t + 4]] + Bt[e[t + 5]] + "-" + Bt[e[t + 6]] + Bt[e[t + 7]] + "-" + Bt[e[t + 8]] + Bt[e[t + 9]] + "-" + Bt[e[t + 10]] + Bt[e[t + 11]] + Bt[e[t + 12]] + Bt[e[t + 13]] + Bt[e[t + 14]] + Bt[e[t + 15]]).toLowerCase();
}
const mE = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), xA = {
  randomUUID: mE
};
function wE(e, t, n) {
  if (xA.randomUUID && !t && !e)
    return xA.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || gE)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return pE(r);
}
var Ga = { exports: {} }, dr = typeof Reflect == "object" ? Reflect : null, vA = dr && typeof dr.apply == "function" ? dr.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Zs;
dr && typeof dr.ownKeys == "function" ? Zs = dr.ownKeys : Object.getOwnPropertySymbols ? Zs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Zs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function EE(e) {
  console && console.warn && console.warn(e);
}
var x0 = Number.isNaN || function(t) {
  return t !== t;
};
function xe() {
  xe.init.call(this);
}
Ga.exports = xe;
Ga.exports.once = CE;
xe.EventEmitter = xe;
xe.prototype._events = void 0;
xe.prototype._eventsCount = 0;
xe.prototype._maxListeners = void 0;
var FA = 10;
function ki(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(xe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return FA;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || x0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    FA = e;
  }
});
xe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
xe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || x0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function v0(e) {
  return e._maxListeners === void 0 ? xe.defaultMaxListeners : e._maxListeners;
}
xe.prototype.getMaxListeners = function() {
  return v0(this);
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
    var c = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw c.context = o, c;
  }
  var d = i[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    vA(d, this, n);
  else
    for (var l = d.length, E = S0(d, l), r = 0; r < l; ++r)
      vA(E[r], this, n);
  return !0;
};
function F0(e, t, n, r) {
  var s, i, o;
  if (ki(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = v0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, EE(c);
  }
  return e;
}
xe.prototype.addListener = function(t, n) {
  return F0(this, t, n, !1);
};
xe.prototype.on = xe.prototype.addListener;
xe.prototype.prependListener = function(t, n) {
  return F0(this, t, n, !0);
};
function IE() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function D0(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = IE.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
xe.prototype.once = function(t, n) {
  return ki(n), this.on(t, D0(this, t, n)), this;
};
xe.prototype.prependOnceListener = function(t, n) {
  return ki(n), this.prependListener(t, D0(this, t, n)), this;
};
xe.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (ki(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : yE(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
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
function N0(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? BE(s) : S0(s, s.length);
}
xe.prototype.listeners = function(t) {
  return N0(this, t, !0);
};
xe.prototype.rawListeners = function(t) {
  return N0(this, t, !1);
};
xe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : R0.call(e, t);
};
xe.prototype.listenerCount = R0;
function R0(e) {
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
  return this._eventsCount > 0 ? Zs(this._events) : [];
};
function S0(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function yE(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function BE(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function CE(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    _0(e, t, i, { once: !0 }), t !== "error" && bE(e, s, { once: !0 });
  });
}
function bE(e, t, n) {
  typeof e.on == "function" && _0(e, "error", t, n);
}
function _0(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var k0 = Ga.exports, QE = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
function Fr(e) {
  return Me(e);
}
var xE = class {
  constructor(e, t, n, r, s, i = 0) {
    D(this, "left");
    D(this, "right");
    D(this, "parent");
    D(this, "hash");
    D(this, "data");
    D(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, DA = xE;
function vE(e) {
  return Fr("0x00".concat(e.slice(2)));
}
function FE(e, t) {
  return Fr("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function O0(e) {
  if (!e.length)
    return QE;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = vE(e[i]);
    t.push(new DA(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = FE(n[o].hash, n[o + 1].hash);
      t[i] = new DA(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var DE = "0x00", L0 = "0x01";
function NE(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(Fr(t).slice(2));
  return [Fr(n), n];
}
function Wn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Fr(n), n];
}
function go(e) {
  const t = L0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function RE(e) {
  const t = L0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function po(e) {
  return e.slice(0, 4) === DE;
}
var SE = class {
  constructor(e, t, n, r, s) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "BitMask");
    D(this, "NumSideNodes");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, _E = SE, kE = class {
  constructor(e, t, n) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, OE = kE, Lt = "0x0000000000000000000000000000000000000000000000000000000000000000", dn = 256;
function or(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function LE(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function ME(e, t) {
  let n = 0;
  for (let r = 0; r < dn && or(e, r) === or(t, r); r += 1)
    n += 1;
  return n;
}
function TE(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Lt ? t.push(0) : (n.push(r), t.push(1));
  return new _E(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var PE = class {
  constructor() {
    D(this, "ms");
    D(this, "root");
    const e = {};
    this.ms = e, this.root = Lt, this.ms[this.root] = Lt;
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
    if (t === Lt)
      return [n, Lt, "", ""];
    let r = this.get(t);
    if (po(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let l = 0; l < dn; l += 1) {
      if ([s, i] = RE(r), or(e, l) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Lt) {
        r = "";
        break;
      }
      if (r = this.get(o), po(r))
        break;
    }
    const d = this.get(c);
    return [LE(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Lt)
      return this.root;
    const [s] = go(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", d = "", l = !1;
    for (let E = 0; E < t.length; E += 1)
      if (t[E] !== "") {
        if (c = t[E], o === "")
          if (d = this.get(c), po(d)) {
            i = c, o = c;
            continue;
          } else
            o = Lt, l = !0;
        !l && c === Lt || (l || (l = !0), or(e, t.length - 1 - E) === 1 ? [i, o] = Wn(c, o) : [i, o] = Wn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Lt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(Fr(t), t), [i, o] = NE(e, t), this.set(i, o), o = i;
    let c;
    if (r === Lt)
      c = dn;
    else {
      const [d] = go(s);
      c = ME(e, d);
    }
    c !== dn && (or(e, c) === 1 ? [i, o] = Wn(r, o) : [i, o] = Wn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < dn; d += 1) {
      let l;
      const E = dn - n.length;
      if (d - E < 0 || n[d - E] === "")
        if (c !== dn && c > dn - 1 - d)
          l = Lt;
        else
          continue;
      else
        l = n[d - E];
      or(e, dn - 1 - d) === 1 ? [i, o] = Wn(l, o) : [i, o] = Wn(o, l), this.set(i, o), o = i;
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
    if (n !== Lt) {
      const [d] = go(r);
      d !== e && (o = r);
    }
    return new OE(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return TE(t);
  }
}, UE = Object.defineProperty, GE = (e, t, n) => t in e ? UE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Pe = (e, t, n) => (GE(e, typeof t != "symbol" ? t + "" : t, n), n), Ha = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, _e = (e, t, n) => (Ha(e, t, "read from private field"), n ? n.call(e) : t.get(e)), vn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, qt = (e, t, n, r) => (Ha(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), jo = (e, t, n) => (Ha(e, t, "access private method"), n), Ja = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? Ct, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? Ct, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: X(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, HE = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, Za = Ae`
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
    `, Ya = Ae`
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
    `, ws = Ae`
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
    ${Za}
${Ya}`, JE = Ae`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, ZE = Ae`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${JE}`, Va = Ae`
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
    `, YE = Ae`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, VE = Ae`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, XE = Ae`
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
    `, M0 = Ae`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Oi = Ae`
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
    `, jE = Ae`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, $E = Ae`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, qE = Ae`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, WE = Ae`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, KE = Ae`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, zE = Ae`
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
    `, eI = Ae`
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
    ${zE}`, tI = Ae`
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
    ${jE}
${$E}
${qE}
${WE}
${KE}
${eI}`, nI = Ae`
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
    ${Oi}
${tI}`, rI = Ae`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, sI = Ae`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, iI = Ae`
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
    `, oI = Ae`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, aI = Ae`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${iI}`, cI = Ae`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${nI}`, AI = Ae`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ws}`, uI = Ae`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${ws}
${Za}`, dI = Ae`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${ws}`, hI = Ae`
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
    ${sI}
${ws}`, lI = Ae`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${ZE}`, fI = Ae`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Oi}`, gI = Ae`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Oi}
${ws}`, pI = Ae`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Oi}`, mI = Ae`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${Va}`, wI = Ae`
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
    ${Va}`, EI = Ae`
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
    ${Va}
${YE}`, II = Ae`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, yI = Ae`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${rI}`, BI = Ae`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${M0}`, CI = Ae`
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
    ${M0}`, bI = Ae`
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
    ${VE}`, QI = Ae`
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
    ${XE}`, xI = Ae`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, vI = Ae`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${Za}`, FI = Ae`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, DI = Ae`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, NI = Ae`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${Ya}`, RI = Ae`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${Ya}`;
function SI(e) {
  return {
    getVersion(t, n) {
      return e(oI, t, n);
    },
    getNodeInfo(t, n) {
      return e(aI, t, n);
    },
    getChain(t, n) {
      return e(cI, t, n);
    },
    getTransaction(t, n) {
      return e(AI, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(uI, t, n);
    },
    getTransactions(t, n) {
      return e(dI, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(hI, t, n);
    },
    estimatePredicates(t, n) {
      return e(lI, t, n);
    },
    getBlock(t, n) {
      return e(fI, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(gI, t, n);
    },
    getBlocks(t, n) {
      return e(pI, t, n);
    },
    getCoin(t, n) {
      return e(mI, t, n);
    },
    getCoins(t, n) {
      return e(wI, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(EI, t, n);
    },
    getContract(t, n) {
      return e(II, t, n);
    },
    getContractBalance(t, n) {
      return e(yI, t, n);
    },
    getBalance(t, n) {
      return e(BI, t, n);
    },
    getBalances(t, n) {
      return e(CI, t, n);
    },
    getMessages(t, n) {
      return e(bI, t, n);
    },
    getMessageProof(t, n) {
      return e(QI, t, n);
    },
    getMessageStatus(t, n) {
      return e(xI, t, n);
    },
    dryRun(t, n) {
      return e(vI, t, n);
    },
    submit(t, n) {
      return e(FI, t, n);
    },
    produceBlocks(t, n) {
      return e(DI, t, n);
    },
    submitAndAwait(t, n) {
      return e(NI, t, n);
    },
    statusChange(t, n) {
      return e(RI, t, n);
    }
  };
}
var T0 = class {
  constructor(e) {
    D(this, "stream");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: $d(t),
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
      const n = T0.textDecoder.decode(e);
      if (!n.startsWith("data:"))
        continue;
      const { data: r, errors: s } = JSON.parse(n.split("data:")[1]);
      if (Array.isArray(s))
        throw new F(
          F.CODES.INVALID_REQUEST,
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
}, P0 = T0;
Pe(P0, "textDecoder", new TextDecoder());
var Tn = {}, _I = 30 * 1e3, kI = class {
  constructor(e = _I) {
    D(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new F(
        N.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = X(e);
    if (Tn[n]) {
      if (!t || Tn[n].expires > Date.now())
        return Tn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = X(e);
    return Tn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Tn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Tn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = X(e);
    delete Tn[t];
  }
}, OI = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Ee.Coin: {
      const n = Z(e.predicate ?? "0x"), r = Z(e.predicateData ?? "0x");
      return {
        type: Ee.Coin,
        txID: X(Z(e.id).slice(0, 32)),
        outputIndex: Z(e.id)[32],
        owner: X(e.owner),
        amount: Q(e.amount),
        assetId: X(e.assetId),
        txPointer: {
          blockHeight: Gt(Z(e.txPointer).slice(0, 8)),
          txIndex: Gt(Z(e.txPointer).slice(8, 16))
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
        txID: ke,
        outputIndex: 0,
        balanceRoot: ke,
        stateRoot: ke,
        txPointer: {
          blockHeight: Gt(Z(e.txPointer).slice(0, 8)),
          txIndex: Gt(Z(e.txPointer).slice(8, 16))
        },
        contractID: X(e.contractId)
      };
    case Ee.Message: {
      const n = Z(e.predicate ?? "0x"), r = Z(e.predicateData ?? "0x"), s = Z(e.data ?? "0x");
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
      throw new F(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, LI = (e) => {
  const { type: t } = e;
  switch (t) {
    case be.Coin:
      return {
        type: be.Coin,
        to: X(e.to),
        amount: Q(e.amount),
        assetId: X(e.assetId)
      };
    case be.Contract:
      return {
        type: be.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: ke,
        stateRoot: ke
      };
    case be.Change:
      return {
        type: be.Change,
        to: X(e.to),
        amount: Q(0),
        assetId: X(e.assetId)
      };
    case be.Variable:
      return {
        type: be.Variable,
        to: ke,
        amount: Q(0),
        assetId: ke
      };
    case be.ContractCreated:
      return {
        type: be.ContractCreated,
        contractId: X(e.contractId),
        stateRoot: X(e.stateRoot)
      };
    default:
      throw new F(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, bC = (e) => "utxoId" in e, QC = (e) => "recipient" in e, NA = (e) => "id" in e, xC = (e) => "recipient" in e, MI = (e) => e.type === de.Revert && e.val.toString("hex") === Nd, TI = (e) => e.type === de.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", PI = (e) => e.reduce(
  (t, n) => (MI(n) && t.missingOutputVariables.push(n), TI(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), ve = (e) => e || ke;
function UI(e) {
  var n, r, s, i, o, c, d, l, E, g, C, x, v, b;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: de.Call,
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
        type: de.Return,
        id: ve((s = e.contract) == null ? void 0 : s.id),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: de.ReturnData,
        id: ve((i = e.contract) == null ? void 0 : i.id),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: ve(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: de.Panic,
        id: ve((o = e.contract) == null ? void 0 : o.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: ve(e.contractId)
      };
    case "REVERT":
      return {
        type: de.Revert,
        id: ve((c = e.contract) == null ? void 0 : c.id),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: de.Log,
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
        type: de.LogData,
        id: ve((l = e.contract) == null ? void 0 : l.id),
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
        type: de.Transfer,
        from: ve((E = e.contract) == null ? void 0 : E.id),
        to: ve(e.toAddress || ((g = e == null ? void 0 : e.to) == null ? void 0 : g.id)),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: de.TransferOut,
        from: ve((C = e.contract) == null ? void 0 : C.id),
        to: ve(e.toAddress || ((x = e.to) == null ? void 0 : x.id)),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
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
      const R = ve(e.sender), S = ve(e.recipient), J = ve(e.nonce), T = Q(e.amount), j = e.data ? Z(e.data) : Uint8Array.from([]), O = ve(e.digest), k = ni.getMessageId({
        sender: R,
        recipient: S,
        nonce: J,
        amount: T,
        data: j
      });
      return {
        type: de.MessageOut,
        sender: R,
        recipient: S,
        amount: T,
        nonce: J,
        data: j,
        digest: O,
        messageId: k
      };
    }
    case "MINT": {
      const R = ve((v = e.contract) == null ? void 0 : v.id), S = ve(e.subId), J = es.getAssetId(R, S);
      return {
        type: de.Mint,
        subId: S,
        contractId: R,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const R = ve((b = e.contract) == null ? void 0 : b.id), S = ve(e.subId), J = ko.getAssetId(R, S);
      return {
        type: de.Burn,
        subId: S,
        contractId: R,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new F(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var GI = "https://fuellabs.github.io/block-explorer-v2", HI = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, vC = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || GI, d = [
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
  ], l = d.filter((j) => !!j.value).map(({ key: j, value: O }) => ({
    key: j,
    value: O
  })), E = l.length > 0;
  if (l.length > 1)
    throw new F(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && l.length > 0) {
    const j = d.map(({ key: O }) => O).join(", ");
    throw new F(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const g = E ? HI(
    l[0].key,
    l[0].value
  ) : "", C = /^\/|\/$/gm, x = n ? n.replace(C, "") : g, v = c.replace(C, ""), b = r == null ? void 0 : r.replace(C, ""), R = b ? encodeURIComponent(b) : void 0, S = v.match(/^https?:\/\//) ? "" : "https://", J = b != null && b.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${v}/${x}${R ? `?providerUrl=${J}${R}` : ""}`;
}, hr = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), U0 = (e) => e.filter(
  (r) => r.type === de.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function Sn(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function JI(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    Sn(t, n.vmInitialization).add(Sn(Z(o.predicate).length, n.contractRoot)).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function G0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = Sn(i, t.vmInitialization), c = Q(i).mul(n), d = JI(r, i, t);
  return o.add(c).add(d).add(s).maxU64();
}
function Xa(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function H0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = Sn(r, e.contractRoot), i = Sn(t, e.stateRoot), o = Sn(n, e.s256), c = Q(4 + 32 + 32 + 32), d = Sn(c, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function J0({
  gasCosts: e,
  txBytesSize: t
}) {
  return Sn(t, e.s256);
}
function $o(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = X(e[t]);
        break;
      case "Array":
        e[t] = $o(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = $o(e[t]);
        break;
    }
  }), e;
}
function ZI(e) {
  return $o(ss(e));
}
function YI(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var FC = (e) => Number(BigInt(e) - BigInt(2 ** 62) - BigInt(10)), VI = (e) => (BigInt(e) + BigInt(2 ** 62) + BigInt(10)).toString(), DC = class extends Error {
  constructor() {
    super(...arguments);
    D(this, "name", "ChangeOutputCollisionError");
    D(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, XI = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, NC = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, jI = (e) => {
  const t = Z(e);
  return {
    data: X(t),
    dataLength: t.length
  };
}, Li = class {
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
    return e.gasPrice && (t += jt.GasPrice, n.push({ data: e.gasPrice, type: jt.GasPrice })), e.witnessLimit && (t += jt.WitnessLimit, n.push({ data: e.witnessLimit, type: jt.WitnessLimit })), e.maturity > 0 && (t += jt.Maturity, n.push({ data: e.maturity, type: jt.Maturity })), e.maxFee && (t += jt.MaxFee, n.push({ data: e.maxFee, type: jt.MaxFee })), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(OI)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(LI)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(jI)) ?? [], { policyTypes: r, policies: s } = Li.getPolicyMeta(this);
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
    return new On().encode(this.toTransaction());
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
    return this.witnesses.push(ie([ke, ke])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = fe.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new XI(e);
    this.witnesses[e] = t;
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
      (e) => e.type === be.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === be.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = Jr(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Ee.Coin:
          return X(r.owner) === t.toB256();
        case Ee.Message:
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
      type: Ee.Coin,
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
    const { recipient: n, sender: r, amount: s } = e, i = Ct;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.createWitness()));
    const c = {
      ...e,
      type: Ee.Message,
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
    return NA(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
    return NA(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
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
  addCoinOutput(e, t, n = Ct) {
    return this.pushOutput({
      type: be.Coin,
      to: Jr(e).toB256(),
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
    return t.map(Ja).forEach((n) => {
      this.pushOutput({
        type: be.Coin,
        to: Jr(e).toB256(),
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
  addChangeOutput(e, t = Ct) {
    this.getChangeOutputs().find(
      (r) => X(r.assetId) === t
    ) || this.pushOutput({
      type: be.Change,
      to: Jr(e).toB256(),
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
    return G0({
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
    return Xa({
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
      return ke.slice(0, -o.length).concat(o);
    }, s = (o) => this.inputs.find((c) => "assetId" in c ? c.assetId === o : !1), i = (o, c) => {
      const d = s(o);
      d && "assetId" in d ? (d.id = r(), d.amount = c) : this.addResources([
        {
          id: r(),
          amount: c,
          assetId: o,
          owner: t || fe.fromRandom(),
          maturity: 0,
          blockCreated: Q(1),
          txCreatedIdx: Q(1)
        }
      ]);
    };
    i(Ct, Q(1e11)), e.forEach((o) => i(o.assetId, o.amount));
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
    return ZI(this);
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
function Z0(e, t) {
  const n = e.toTransaction();
  n.type === vt.Script && (n.receiptsRoot = ke), n.inputs = n.inputs.map((i) => {
    const o = ss(i);
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
        }, o.txID = ke, o.outputIndex = 0, o.balanceRoot = ke, o.stateRoot = ke, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = ss(i);
    switch (o.type) {
      case be.Contract:
        return o.balanceRoot = ke, o.stateRoot = ke, o;
      case be.Change:
        return o.amount = Q(0), o;
      case be.Variable:
        return o.to = ke, o.amount = Q(0), o.assetId = ke, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = hw(t), s = ie([r, new On().encode(n)]);
  return Me(s);
}
var $I = (e) => {
  const t = new Uint8Array(32);
  return t.set(Z(e)), t;
}, qI = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: X(t),
    value: X($I(n))
  };
}, qo = class extends Li {
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
    D(this, "type", vt.Create);
    /** Witness index of contract bytecode to create */
    D(this, "bytecodeWitnessIndex");
    /** Salt */
    D(this, "salt");
    /** List of storage slots to initialize */
    D(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = X(n ?? ke), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(qI)) ?? [];
    return {
      type: vt.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? X(this.salt) : ke,
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
      (t) => t.type === be.ContractCreated
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
    return Z0(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: be.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return H0({
      contractBytesSize: Q(Z(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, RA = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Z("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, WI = {
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
}, lr = class extends Li {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    D(this, "type", vt.Script);
    /** Gas limit for transaction */
    D(this, "gasLimit");
    /** Script to execute */
    D(this, "script");
    /** Script input data (parameters) */
    D(this, "scriptData");
    this.gasLimit = Q(r), this.script = Z(t ?? RA.bytes), this.scriptData = Z(n ?? RA.encodeScriptData());
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
      type: vt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: t.length,
      scriptDataLength: n.length,
      receiptsRoot: ke,
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
      (t) => t.type === be.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === be.Variable
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
        type: be.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, c) => o + c.dataLength,
      0
    );
    return Xa({
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
    const n = Jr(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: Ee.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: be.Contract,
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
    return Z0(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new kn(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return J0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Ut = (e) => {
  if (e instanceof lr || e instanceof qo)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case vt.Script:
      return lr.from(e);
    case vt.Create:
      return qo.from(e);
    default:
      throw new F(N.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, KI = (e) => {
  var P, q;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), c = Z(n), [d] = new On().decode(c, 0);
  if (d.type === vt.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: l, witnesses: E, inputs: g, policies: C } = d;
  let x = Q(0), v = Q(0);
  if (l === vt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, ee = Q(Z(E[U].data).length);
    x = H0({
      contractBytesSize: ee,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: c.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (v = U), x = J0({
      gasCosts: r,
      txBytesSize: c.length
    });
  }
  const b = G0({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: g,
    metadataGas: x,
    txBytesSize: c.length
  }), R = Q((P = C.find((U) => U.type === jt.GasPrice)) == null ? void 0 : P.data), S = (q = C.find((U) => U.type === jt.WitnessLimit)) == null ? void 0 : q.data, J = E.reduce((U, H) => U + H.dataLength, 0), T = Xa({
    gasPerByte: i,
    minGas: b,
    witnessesLength: J,
    gasLimit: v,
    witnessLimit: S
  }), j = hr(t, R, o), O = hr(b, R, o), k = hr(T, R, o);
  return {
    fee: O.add(j),
    minFee: O,
    maxFee: k,
    feeFromGasUsed: j
  };
}, zI = (e) => {
  const t = d0.fromString(e, 10).toUnix();
  return new Date(t * 1e3);
}, RC = (e) => d0.fromUnix(Math.floor(e.getTime() / 1e3)).toString(10), ey = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var g;
  const s = new kn(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const C = Q(t.param2).sub(xi({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let l;
  if (d) {
    const C = o.decodeArguments(d);
    C && (l = c.reduce((x, v, b) => {
      const R = C[b], S = v.name;
      return S ? {
        ...x,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(R))
      } : x;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: l,
    ...(g = t.amount) != null && g.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function ty(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function ja(e, t) {
  return e.filter((n) => n.type === t);
}
function ny(e) {
  return ja(e, Ee.Coin);
}
function ry(e) {
  return ja(e, Ee.Message);
}
function sy(e) {
  return ty(e, [Ee.Coin, Ee.Message]);
}
function iy(e) {
  return ja(e, Ee.Contract);
}
function Y0(e, t) {
  const n = ny(e), r = ry(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function oy(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Ee.Contract)
      throw new F(
        N.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function $a(e) {
  return e.type === Ee.Coin ? e.owner.toString() : e.type === Ee.Message ? e.recipient.toString() : "";
}
function Es(e, t) {
  return e.filter((n) => n.type === t);
}
function ay(e) {
  return Es(e, be.ContractCreated);
}
function V0(e) {
  return Es(e, be.Coin);
}
function cy(e) {
  return Es(e, be.Change);
}
function Ay(e) {
  return Es(e, be.Contract);
}
function SC(e) {
  return Es(e, be.Variable);
}
var uy = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(uy || {}), dy = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(dy || {}), hy = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(hy || {}), ly = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(ly || {}), fy = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(fy || {});
function is(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function X0(e) {
  switch (e) {
    case vt.Mint:
      return "Mint";
    case vt.Create:
      return "Create";
    case vt.Script:
      return "Script";
    default:
      throw new F(
        N.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function qa(e, t) {
  return X0(e) === t;
}
function gy(e) {
  return qa(
    e,
    "Mint"
    /* Mint */
  );
}
function j0(e) {
  return qa(
    e,
    "Create"
    /* Create */
  );
}
function $0(e) {
  return qa(
    e,
    "Script"
    /* Script */
  );
}
function _C(e) {
  return (t) => e.assetId === t.assetId;
}
function py(e) {
  return is(e, de.Call);
}
function my(e) {
  return is(e, de.MessageOut);
}
var wy = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((c) => c.assetId === o.assetId)
  );
  return n.map((o) => {
    const c = r.find((l) => l.assetId === o.assetId);
    if (!c)
      return o;
    const d = Q(o.amount).add(c.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function Ey(e, t) {
  var n, r, s, i, o, c, d, l;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((d = e.to) == null ? void 0 : d.type) === ((l = t.to) == null ? void 0 : l.type);
}
function Dr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => Ey(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? wy(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function kC(e) {
  return is(e, de.TransferOut);
}
function Iy({
  inputs: e,
  receipts: t
}) {
  return my(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = Y0(e, o);
      if (c) {
        const d = $a(c);
        return Dr(s, {
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
function yy({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = py(n);
  return Ay(t).reduce((l, E) => {
    const g = oy(e, E.inputIndex);
    return g ? o.reduce((x, v) => {
      var b;
      if (v.to === g.contractID) {
        const R = Y0(e, v.assetId);
        if (R) {
          const S = $a(R), J = [], T = r == null ? void 0 : r[g.contractID];
          return T && J.push(
            ey({
              abi: T,
              receipt: v,
              rawPayload: s,
              maxInputs: i
            })
          ), Dr(x, {
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
            assetsSent: (b = v.amount) != null && b.isZero() ? void 0 : [
              {
                amount: v.amount,
                assetId: v.assetId
              }
            ],
            calls: J
          });
        }
      }
      return x;
    }, l) : l;
  }, []);
}
function By(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((l) => l.contractID === r) ? 0 : 1;
  if (ke === o) {
    const l = n.find((E) => E.assetId === s);
    o = (l == null ? void 0 : l.to) || o;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((l) => l.contractID === o) ? 0 : 1,
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
function SA({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = V0(t), i = iy(e), o = cy(t);
  s.forEach((l) => {
    const { amount: E, assetId: g, to: C } = l, x = o.find((v) => v.assetId === g);
    x && (r = Dr(r, {
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
          assetId: g,
          amount: E
        }
      ]
    }));
  });
  const c = is(
    n,
    de.Transfer
  ), d = is(
    n,
    de.TransferOut
  );
  return [...c, ...d].forEach((l) => {
    const E = By(l, i, o);
    r = Dr(r, E);
  }), r;
}
function Cy(e) {
  return V0(e).reduce((r, s) => Dr(r, {
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
function by({ inputs: e, outputs: t }) {
  const n = ay(t), r = sy(e)[0], s = $a(r);
  return n.reduce((o, c) => Dr(o, {
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
function Qy({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return j0(e) ? [
    ...by({ inputs: t, outputs: n }),
    ...SA({ inputs: t, outputs: n, receipts: r })
  ] : $0(e) ? [
    ...SA({ inputs: t, outputs: n, receipts: r }),
    ...yy({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...Iy({ inputs: t, receipts: r })
  ] : [...Cy(n)];
}
var fr = (e) => {
  const t = UI(e);
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
}, xy = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, vy = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Fy = (e) => {
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
      throw new F(
        N.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, Dy = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = Fy(e.type), e.type) {
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
function Mi(e) {
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: c,
    abiMap: d = {},
    maxInputs: l,
    gasCosts: E
  } = e, g = U0(n), C = X(o), x = Qy({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: d,
    maxInputs: l
  }), v = X0(i.type), { fee: b } = KI({
    gasUsed: g,
    rawPayload: C,
    consensusParameters: {
      gasCosts: E,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: R, isStatusPending: S, isStatusSuccess: J, blockId: T, status: j, time: O } = Dy(c), k = xy(n), L = vy(n);
  let P;
  return O && (P = zI(O)), {
    id: t,
    fee: b,
    gasUsed: g,
    operations: x,
    type: v,
    blockId: T,
    time: O,
    status: j,
    receipts: n,
    mintedAssets: k,
    burnedAssets: L,
    isTypeMint: gy(i.type),
    isTypeCreate: j0(i.type),
    isTypeScript: $0(i.type),
    isStatusFailure: R,
    isStatusSuccess: J,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
var Ys = class {
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
    const n = new Ys(e, t);
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
    return (t = new On().decode(
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
    var l;
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    ), r = ((l = t.receipts) == null ? void 0 : l.map(fr)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), c = this.provider.getChain().consensusParameters.maxInputs;
    return Mi({
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
      throw new F(
        N.TRANSACTION_FAILED,
        `Transaction failed: ${t.gqlTransaction.status.reason}`
      );
    return t;
  }
};
function Ny(e, t) {
  return e.reduce((n, r) => (r.type === de.LogData && n.push(t.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === de.Log && n.push(t.decodeLog(new _().encode(r.val0), r.val1.toNumber(), r.id)[0]), n), []);
}
function Ry(e, t) {
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
function q0(e, t, n = 0) {
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
      const d = Ry(t, c);
      return await YI(d), q0(e, t, c)(...r);
    }
  };
}
var Sy = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, _y = 10, ky = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: c, scriptParams: d, txParams: l, gasCosts: E } = r;
  return {
    name: t,
    baseChainHeight: Q(n),
    consensusParameters: {
      contractMaxSize: Q(i.contractMaxSize),
      maxInputs: Q(l.maxInputs),
      maxOutputs: Q(l.maxOutputs),
      maxWitnesses: Q(l.maxWitnesses),
      maxGasPerTx: Q(l.maxGasPerTx),
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
      gasCosts: E
    },
    gasCosts: E,
    latestBlock: {
      id: s.id,
      height: Q(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((g) => ({
        id: g.id
      }))
    }
  };
}, Wo, W0, rn = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, vn(this, Wo), Pe(this, "operations"), Pe(this, "cache"), Pe(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new kI(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    rn.nodeInfoCache = {}, rn.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return q0((...r) => {
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
    const n = new rn(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = rn.chainInfoCache[this.url];
    if (!e)
      throw new F(
        N.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = rn.nodeInfoCache[this.url];
    if (!e)
      throw new F(
        N.NODE_INFO_CACHE_EMPTY,
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
    return rn.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = Dh(e.nodeVersion);
    if (!t || !n)
      throw new F(
        F.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${e.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const e = rn.getFetchFn(this.options), t = new qm.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return SI((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new P0({
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
    } = await this.getChain(), n = new Jn(e, t.toNumber());
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
    return rn.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = ky(e);
    return rn.chainInfoCache[this.url] = t, t;
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
    const r = Ut(e);
    jo(this, Wo, W0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = X(r.toTransactionBytes());
    if (n) {
      const o = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: l } of o)
        if (l.type !== "SubmittedStatus")
          break;
      const c = r.getTransactionId(this.getChainId()), d = new Ys(c, this);
      return await d.fetch(), d;
    }
    const {
      submit: { id: i }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Ys(i, this);
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
    const r = Ut(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = X(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map(fr)
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
      (i) => "predicate" in i && i.predicate && !Od(Z(i.predicate), Z("0x")) && new Ge(i.predicateGasUsed).isZero()
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
    if (e.type === vt.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    await this.estimatePredicates(e);
    let t = [];
    const n = [];
    let r = 0;
    for (let s = 0; s < _y; s++) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: X(e.toTransactionBytes()),
        utxoValidation: !1
      });
      t = i.map(fr);
      const { missingOutputVariables: o, missingOutputContractIds: c } = PI(t);
      if (o.length !== 0 || c.length !== 0)
        r += o.length, e.addVariableOutputs(o.length), c.forEach(({ contractId: l }) => {
          e.addContractInputAndOutput(fe.fromString(l)), n.push(l);
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
    const n = Ut(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = X(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map(fr)
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
    const i = ss(Ut(e)), o = this.getChain(), { gasPriceFactor: c, minGasPrice: d, maxGasPerTx: l } = this.getGasConfig(), E = Gh(i.gasPrice, d), g = i.type === vt.Script, C = i.getCoinOutputsQuantities(), x = Sy(C, t);
    i.fundWithFakeUtxos(x, s == null ? void 0 : s.address), r && (g && (i.gasLimit = Q(0)), s && "populateTransactionPredicateData" in s && s.populateTransactionPredicateData(i), await this.estimatePredicates(i));
    const v = i.calculateMinGas(o), b = i.calculateMaxGas(o, v);
    let R = [], S = [], J = 0;
    if (g && n) {
      i.gasPrice = Q(0), i.gasLimit = Q(l.sub(b).toNumber() * 0.9);
      const L = await this.estimateTxDependencies(i);
      R = L.receipts, J = L.outputVariables, S = L.missingContractIds;
    }
    const T = g ? U0(R) : v, j = hr(
      T,
      E,
      c
    ).normalizeZeroToOne(), O = hr(v, E, c).normalizeZeroToOne(), k = hr(b, E, c).normalizeZeroToOne();
    return {
      requiredQuantities: x,
      receipts: R,
      gasUsed: T,
      minGasPrice: d,
      gasPrice: E,
      minGas: v,
      maxGas: b,
      usedFee: j,
      minFee: O,
      maxFee: k,
      estimatedInputs: i.inputs,
      outputVariables: J,
      missingContractIds: S
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = fe.fromAddressOrString(e), s = Ut(ss(t)), i = await this.getTransactionCost(s, n);
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
    const r = fe.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && X(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: Q(o.amount),
      owner: fe.fromAddressOrString(o.owner),
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
    var d, l, E;
    const r = fe.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((g) => X(g))) || [],
      utxos: ((l = n == null ? void 0 : n.utxos) == null ? void 0 : l.map((g) => X(g))) || []
    };
    if (this.cache) {
      const g = new Set(
        s.utxos.concat((E = this.cache) == null ? void 0 : E.getActiveData().map((C) => X(C)))
      );
      s.utxos = Array.from(g);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(Ja).map(({ assetId: g, amount: C, max: x }) => ({
        assetId: X(g),
        amount: C.toString(10),
        max: x ? x.toString(10) : void 0
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
            sender: fe.fromAddressOrString(g.sender),
            recipient: fe.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: Q(g.amount),
            assetId: g.assetId,
            owner: fe.fromAddressOrString(g.owner),
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
          return (s = new On().decode(Z(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new On().decode(
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
      contract: fe.fromAddressOrString(e).toB256(),
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
      owner: fe.fromAddressOrString(e).toB256(),
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
      filter: { owner: fe.fromAddressOrString(e).toB256() }
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
      owner: fe.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: zr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: Q(s.amount),
        data: s.data
      }),
      sender: fe.fromAddressOrString(s.sender),
      recipient: fe.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: Q(s.amount),
      data: zr.decodeData(s.data),
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
      throw new F(
        N.INVALID_INPUT_PARAMETERS,
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
      blockProof: l,
      sender: E,
      recipient: g,
      amount: C,
      data: x
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: Q(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: Q(l.proofIndex),
        proofSet: l.proofSet
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
      sender: fe.fromAddressOrString(E),
      recipient: fe.fromAddressOrString(g),
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
   * @param startTime - The UNIX timestamp to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(e, t) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: Q(e).toString(10),
      startTimestamp: t ? VI(t) : void 0
    });
    return Q(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Ys(e, this);
  }
}, ui = rn;
Wo = /* @__PURE__ */ new WeakSet();
W0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Ee.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Pe(ui, "chainInfoCache", {});
Pe(ui, "nodeInfoCache", {});
async function OC(e) {
  var C;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new F(
      N.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new On().decode(
    Z(s.rawPayload),
    0
  ), o = ((C = s.receipts) == null ? void 0 : C.map(fr)) || [], {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: E }
  } = n.getChain(), g = Mi({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: Z(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(c),
    gasPriceFactor: Q(d),
    abiMap: r,
    maxInputs: l,
    gasCosts: E
  });
  return {
    gqlTransaction: s,
    ...g
  };
}
async function LC(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, l = n.toTransaction(), E = n.toTransactionBytes();
  return Mi({
    receipts: s,
    transaction: l,
    transactionBytes: E,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: c
  });
}
async function MC(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: E }
  } = n.getChain();
  return {
    transactions: i.map((C) => {
      const { node: x } = C, { id: v, rawPayload: b, receipts: R, status: S } = x, [J] = new On().decode(Z(b), 0), T = (R == null ? void 0 : R.map(fr)) || [], j = Mi({
        id: v,
        receipts: T,
        transaction: J,
        transactionBytes: Z(b),
        gqlTransactionStatus: S,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: d,
        maxInputs: l,
        gasCosts: E
      });
      return {
        gqlTransaction: x,
        ...j
      };
    }),
    pageInfo: o
  };
}
var ar = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, Oy = (e) => {
  if (e === "ethereum")
    return ar.eth.sepolia;
  if (e === "fuel")
    return ar.fuel.beta5;
}, Ly = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), K0 = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? Oy(n);
  if (i === void 0)
    return;
  const o = Ly({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, TC = (e, t) => K0({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), PC = (e, t) => K0({
  asset: e,
  networkType: "fuel",
  chainId: t
}), My = "/", Ty = /^\/|\/$/g, Py = (e = "") => e.replace(Ty, "");
function Uy(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(Py);
  return r && n && s.unshift(""), s.join(My);
}
function UC(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: Uy(t, n.icon)
  }));
}
var GC = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: ar.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: ar.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: ar.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: ar.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], Gy = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new _().encode(new Ge(n).toNumber());
  return Uint8Array.from([
    ...Z(r),
    ...i,
    ...Z(t)
  ]);
}, Hy = async (e) => {
  const t = Gy(e);
  await Pa();
  const n = Cw(16, 0, Qw.ScriptData), r = wA(17, 16, 32), s = Xr(18, 17, 0), i = wA(19, 17, 8), o = yw(16, 18, 19), c = f0(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Ti = class extends vd {
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
    this._provider = n, this._connector = r, this.address = fe.fromDynamicInput(t);
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
      throw new F(N.MISSING_PROVIDER, "Provider not set");
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
      throw new F(
        N.NOT_SUPPORTED,
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
      throw new F(
        N.NOT_SUPPORTED,
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
  async getBalance(t = Ct) {
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
      throw new F(
        N.NOT_SUPPORTED,
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
    const s = HE({
      amount: Q(r),
      assetId: Ct,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: g, assetId: C }) => {
      i[C] = {
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
            const b = Q(g.amount);
            i[v].owned = i[v].owned.add(b), o.push(g.id);
          }
        } else
          g.recipient === d && g.amount && i[Ct] && (i[Ct].owned = i[Ct].owned.add(g.amount), c.push(g.nonce));
    });
    const l = [];
    if (Object.entries(i).forEach(([g, { owned: C, required: x }]) => {
      C.lt(x) && l.push({
        assetId: g,
        amount: x.sub(C)
      });
    }), l.length) {
      const g = await this.getResourcesToSpend(l, {
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
  async createTransfer(t, n, r = Ct, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, c = new lr(o);
    c.addCoinOutput(fe.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: l, gasUsed: E, estimatedInputs: g } = await this.provider.getTransactionCost(c, [], {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return c.gasPrice = Q(s.gasPrice ?? i), c.gasLimit = Q(s.gasLimit ?? E), this.validateGas({
      gasUsed: E,
      gasPrice: c.gasPrice,
      gasLimit: c.gasLimit,
      minGasPrice: i
    }), await this.fund(c, l, d), c.updatePredicateInputs(g), c;
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
  async transfer(t, n, r = Ct, s = {}) {
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
  async transferToContract(t, n, r = Ct, s = {}) {
    const i = fe.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), c = { gasPrice: o, ...s }, { script: d, scriptData: l } = await Hy({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: r
    }), E = new lr({
      ...c,
      script: d,
      scriptData: l
    });
    E.addContractInputAndOutput(i);
    const { maxFee: g, requiredQuantities: C, gasUsed: x } = await this.provider.getTransactionCost(
      E,
      [{ amount: Q(n), assetId: String(r) }]
    );
    return E.gasLimit = Q(c.gasLimit ?? x), this.validateGas({
      gasUsed: x,
      gasPrice: E.gasPrice,
      gasLimit: E.gasLimit,
      minGasPrice: o
    }), await this.fund(E, C, g), this.sendTransaction(E);
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
    const { minGasPrice: s } = this.provider.getGasConfig(), i = fe.fromAddressOrString(t), o = Z(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), c = Z(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), l = { script: new Uint8Array([
      ...Z(WI.bytes),
      ...o,
      ...c
    ]), gasPrice: s, ...r }, E = new lr(l), g = [{ amount: Q(n), assetId: Ct }], { requiredQuantities: C, maxFee: x, gasUsed: v } = await this.provider.getTransactionCost(
      E,
      g
    );
    return E.gasLimit = Q(l.gasLimit ?? v), this.validateGas({
      gasUsed: v,
      gasPrice: E.gasPrice,
      gasLimit: E.gasLimit,
      minGasPrice: s
    }), await this.fund(E, C, x), this.sendTransaction(E);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new F(N.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
    const s = Ut(t);
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
    const r = Ut(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.simulate(r, { estimateTxDependencies: !1 });
  }
  validateGas({
    gasUsed: t,
    gasPrice: n,
    gasLimit: r,
    minGasPrice: s
  }) {
    if (s.gt(n))
      throw new F(
        N.GAS_PRICE_TOO_LOW,
        `Gas price '${n}' is lower than the required: '${s}'.`
      );
    if (t.gt(r))
      throw new F(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r}' is lower than the required: '${t}'.`
      );
  }
}, Nr = class {
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
    const t = Wt(e, 32);
    this.privateKey = X(t), this.publicKey = X(bn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = X(bn.getPublicKey(t, !0)), this.address = fe.fromPublicKey(this.publicKey);
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
    const t = bn.sign(Z(e), Z(this.privateKey)), n = Wt(`0x${t.r.toString(16)}`, 32), r = Wt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, X(ie([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = bn.ProjectivePoint.fromHex(Z(this.compressedPublicKey)), n = bn.ProjectivePoint.fromHex(Z(e));
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
    const c = new bn.Signature(BigInt(X(r)), BigInt(X(s))).addRecoveryBit(
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
    return fe.fromPublicKey(Nr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? s0(ie([_n(32), Z(e)])) : _n(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = bn.ProjectivePoint.fromHex(Z(e));
    return X(t.toRawBytes(!1).slice(1));
  }
}, _A = 13, kA = 8, OA = 1, mo = 32, Jy = 16, LA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Zy(e, t, n) {
  const r = Rn(LA(e), "hex"), s = fe.fromAddressOrString(t), i = _n(mo), o = Vu({
    password: Rn(n),
    salt: i,
    dklen: mo,
    n: 2 ** _A,
    r: kA,
    p: OA
  }), c = _n(Jy), d = await Tg(r, o, c), l = Uint8Array.from([...o.subarray(16, 32), ...d]), E = Xu(l), g = Hr(E, "hex"), C = {
    id: wE(),
    version: 3,
    address: LA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Hr(c, "hex") },
      ciphertext: Hr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: mo,
        n: 2 ** _A,
        p: OA,
        r: kA,
        salt: Hr(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function Yy(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: l, salt: E }
    }
  } = n, g = Rn(s, "hex"), C = Rn(i, "hex"), x = Rn(E, "hex"), v = Rn(t), b = Vu({
    password: v,
    salt: x,
    n: c,
    p: l,
    r: d,
    dklen: o
  }), R = Uint8Array.from([...b.subarray(16, 32), ...g]), S = Xu(R), J = Hr(S, "hex");
  if (r !== J)
    throw new F(
      N.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await Mg(g, b, C);
  return X(T);
}
var z0 = class extends Ti {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new Nr(t);
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
    const n = await this.signer().sign(dw(t));
    return X(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Ut(t), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return X(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = Ut(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !0, awaitExecution: r } = {}) {
    const s = Ut(t);
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
    const r = Ut(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return Zy(this.privateKey, this.address, t);
  }
};
Pe(z0, "defaultPath", "m/44'/1179993420'/0'/0/0");
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
], Vy = /* @__PURE__ */ ((e) => (e.english = "english", e))(Vy || {});
function Ko(e) {
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
        throw new F(
          N.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return Uint8Array.from(n);
}
function Xy(e) {
  return (1 << e) - 1;
}
function eh(e) {
  return (1 << e) - 1 << 8 - e;
}
function wo(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function jy(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function $y(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & Xy(8 - n)), n += 3);
  const r = e.length / 4, s = Z(Me(e))[0] & eh(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function qy(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = Z(new Uint8Array(n));
  let s = 0;
  for (let l = 0; l < e.length; l += 1) {
    const E = t.indexOf(e[l].normalize("NFKD"));
    if (E === -1)
      throw new F(
        N.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[l]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      E & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = eh(o);
  if ((Z(Me(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new F(
      N.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Wy = Ko("Bitcoin seed"), Ky = "0x0488ade4", zy = "0x04358394", MA = [12, 15, 18, 21, 24];
function TA(e) {
  if (e.length !== 2048)
    throw new F(
      N.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function eB(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new F(
      N.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Eo(e) {
  if (!MA.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${MA.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new F(N.INVALID_MNEMONIC, t);
  }
}
var Qn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Rs) {
    D(this, "wordlist");
    this.wordlist = e, TA(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return Qn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return Qn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Rs) {
    const n = wo(e);
    return Eo(n), X(qy(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Rs) {
    const n = Z(e);
    return TA(t), eB(n), $y(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Eo(wo(e));
    const n = Ko(jy(e)), r = Ko(`mnemonic${t}`);
    return Or(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = Qn.mnemonicToSeed(e, t);
    return Qn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = wo(e);
    let n = 0;
    try {
      Eo(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (Qn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Rs;
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
      throw new F(
        N.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Z(kr("sha512", Wy, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = Qn.masterKeysFromSeed(e), r = Z(t ? zy : Ky), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), l = ie([
      r,
      s,
      i,
      o,
      c,
      ie(["0x00", d])
    ]), E = aa(Me(Me(l)), 0, 4);
    return ru(ie([l, E]));
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
    const n = t ? Me(ie([_n(e), Z(t)])) : _n(e);
    return Qn.entropyToMnemonic(n);
  }
}, Wa = Qn, th = 2147483648, nh = X("0x0488ade4"), Ka = X("0x0488b21e"), rh = X("0x04358394"), za = X("0x043587cf");
function PA(e) {
  return ru(ie([e, aa(Me(Me(e)), 0, 4)]));
}
function tB(e = !1, t = !1) {
  return e ? t ? za : Ka : t ? rh : nh;
}
function nB(e) {
  return [Ka, za].includes(X(e.slice(0, 4)));
}
function rB(e) {
  return [nh, rh, Ka, za].includes(
    X(e.slice(0, 4))
  );
}
function sB(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new F(N.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + th : parseInt(r, 10)
  );
}
var er = class {
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
      const t = new Nr(e.privateKey);
      this.publicKey = X(t.compressedPublicKey), this.privateKey = X(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new F(
          N.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = X(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = aa(ds(Me(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & th) {
      if (!t)
        throw new F(
          N.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Z(this.publicKey));
    s.set(Wt(e, 4), 33);
    const i = Z(kr("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const E = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", g = Q(o).add(t).mod(E).toBytes(32);
      return new er({
        privateKey: g,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const l = new Nr(X(o)).addPoint(n);
    return new er({
      publicKey: l,
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
    return sB(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
      throw new F(
        N.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = tB(this.privateKey == null || e, t), r = X(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = oa(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? ie(["0x00", this.privateKey]) : this.publicKey, d = Z(ie([n, r, s, i, o, c]));
    return PA(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Wa.masterKeysFromSeed(e);
    return new er({
      chainCode: Z(t.slice(32)),
      privateKey: Z(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Kh(tl(e)), n = Z(t), r = PA(n.slice(0, 78)) === e;
    if (n.length !== 82 || !rB(n))
      throw new F(N.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new F(N.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = X(n.slice(5, 9)), o = parseInt(X(n.slice(9, 13)).substring(2), 16), c = X(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new F(
        N.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (nB(n)) {
      if (d[0] !== 3)
        throw new F(N.HD_WALLET_ERROR, "Invalid public extended key.");
      return new er({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new F(N.HD_WALLET_ERROR, "Invalid private extended key.");
    return new er({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Io = er, sh = class extends Ti {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Nt(e, this._provider);
  }
}, Nt = class extends z0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Nr("0x00"), new sh(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Nr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new Nt(t, e == null ? void 0 : e.provider);
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
    const s = Io.fromSeed(e).derivePath(t || Nt.defaultPath);
    return new Nt(s.privateKey, n);
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
    const s = Wa.mnemonicToSeed(e, n), o = Io.fromSeed(s).derivePath(t || Nt.defaultPath);
    return new Nt(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = Io.fromExtendedKey(e);
    return new Nt(n.privateKey, t);
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
    const r = await Yy(e, t);
    return new Nt(r, n);
  }
}, _t = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new sh(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new Nt(e, t);
  }
};
Pe(_t, "generate", Nt.generate);
Pe(_t, "fromSeed", Nt.fromSeed);
Pe(_t, "fromMnemonic", Nt.fromMnemonic);
Pe(_t, "fromExtendedKey", Nt.fromExtendedKey);
Pe(_t, "fromEncryptedJson", Nt.fromEncryptedJson);
var iB = class {
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
}, Pn, ih = class {
  constructor(e) {
    vn(this, Pn, void 0), Pe(this, "pathKey", "{}"), Pe(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Pe(this, "numberOfAccounts", 0), qt(this, Pn, e.secret || Wa.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: _e(this, Pn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = _t.fromMnemonic(_e(this, Pn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = _t.fromMnemonic(_e(this, Pn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = fe.fromAddressOrString(e);
    do {
      const r = _t.fromMnemonic(_e(this, Pn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new F(
      N.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return _t.fromPrivateKey(t);
  }
};
Pn = /* @__PURE__ */ new WeakMap();
Pe(ih, "type", "mnemonic");
var xn, oh = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    vn(this, xn, []), e.secret ? qt(this, xn, [e.secret]) : qt(this, xn, e.accounts || [_t.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: _e(this, xn)
    };
  }
  getPublicAccount(e) {
    const t = _t.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return _e(this, xn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = _t.generate();
    return _e(this, xn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = fe.fromAddressOrString(e), n = _e(this, xn).find(
      (r) => _t.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new F(
        N.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return _t.fromPrivateKey(t);
  }
};
xn = /* @__PURE__ */ new WeakMap();
Pe(oh, "type", "privateKey");
var An = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function un(e, t) {
  if (!e)
    throw new F(N.WALLET_MANAGER_ERROR, t);
}
var Ft, Un, sn, zo, ah, ea, ch, Ah = class extends k0.EventEmitter {
  constructor(e) {
    super(), vn(this, zo), vn(this, ea), Pe(this, "storage", new iB()), Pe(this, "STORAGE_KEY", "WalletManager"), vn(this, Ft, []), vn(this, Un, ""), vn(this, sn, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return _e(this, sn);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    un(!_e(this, sn), An.wallet_not_unlocked);
    const t = _e(this, Ft).find((n, r) => r === e);
    return un(t, An.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return _e(this, Ft).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return _e(this, Ft).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = fe.fromAddressOrString(e), n = _e(this, Ft).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return un(n, An.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = fe.fromAddressOrString(e);
    un(!_e(this, sn), An.wallet_not_unlocked);
    const n = _e(this, Ft).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return un(n, An.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = _e(this, Ft)[(e == null ? void 0 : e.vaultId) || 0];
    await un(t, An.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    _e(this, Ft).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    qt(this, Ft, _e(this, Ft).concat({
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
    qt(this, sn, !0), qt(this, Ft, []), qt(this, Un, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    qt(this, Un, e), qt(this, sn, !1);
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
    const n = _e(this, sn);
    await this.unlock(e), qt(this, Un, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await un(!_e(this, sn), An.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Og(_e(this, Un), JSON.parse(e));
      qt(this, Ft, jo(this, ea, ch).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await un(!_e(this, sn), An.wallet_not_unlocked);
    const e = await Lg(_e(this, Un), {
      vaults: jo(this, zo, ah).call(this, _e(this, Ft))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Ah.Vaults.find((n) => n.type === e);
    return un(t, An.invalid_vault_type), t;
  }
}, oB = Ah;
Ft = /* @__PURE__ */ new WeakMap();
Un = /* @__PURE__ */ new WeakMap();
sn = /* @__PURE__ */ new WeakMap();
zo = /* @__PURE__ */ new WeakSet();
ah = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
ea = /* @__PURE__ */ new WeakSet();
ch = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
Pe(oB, "Vaults", [ih, oh]);
var aB = class {
  constructor(e) {
    throw new F(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new F(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new F(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new F(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new F(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new F(N.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Pe(aB, "type");
var HC = class {
}, cB = (e) => {
  const n = Z(e), r = zA(n, 16384), s = O0(r.map((o) => X(o)));
  return s0(ie(["0x4655454C", s]));
}, UA = class extends Ti {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(t, n, r, s) {
    const { predicateBytes: i, predicateInterface: o } = UA.processPredicateData(
      t,
      r,
      s
    ), c = fe.fromB256(cB(i));
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
    const n = Ut(t), { policies: r } = Li.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === Ee.Coin && X(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
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
  async createTransfer(t, n, r = Ct, s = {}) {
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
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Be(this.bytes.length).encode(this.bytes), i = xi({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + va + jg + ne + r.byteLength + t * ne;
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
    if (n && (i = new kn(n), i.functions.main === void 0))
      throw new F(
        N.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = UA.setConfigurableConstants(
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
      throw new F(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, uh = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(uh || {}), ec = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(ec || {}), dh = "FuelConnector", AB = class {
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
}, uB = class extends k0.EventEmitter {
  constructor() {
    super(...arguments);
    D(this, "name", "");
    D(this, "metadata", {});
    D(this, "connected", !1);
    D(this, "installed", !1);
    D(this, "events", ec);
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
function dB(e, { cache: t, cacheTime: n, key: r }) {
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
function JC(e) {
  window.dispatchEvent(
    new CustomEvent(dh, {
      detail: e
    })
  );
}
function hB() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function Ss(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var lB = 2e3, fB = 5e3, { warn: gB } = console, $r = class extends uB {
  constructor(t = $r.defaultConfig) {
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
      const { _targetObject: t } = this, n = dh;
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
      return new AB(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem($r.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(uh).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      Ss(t.isConnected()),
      Ss(this.pingConnector(t))
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
      return await dB(async () => Ss(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: fB
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(ec)), await ((o = this._storage) == null ? void 0 : o.setItem($r.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = hB();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Ss(t.promise, lB).then(() => !0).catch(() => !1);
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
    return gB(
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
      n = await ui.create(t.url);
    else {
      if (t)
        throw new F(N.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await ui.create(r.url);
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
    return new Ti(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem($r.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, hh = $r;
Pe(hh, "STORAGE_KEY", "fuel-current-connector");
Pe(hh, "defaultConfig", {});
var pB = [
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
], yo = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", mB = (e) => pB.includes(e) ? e : e === "Revert(123)" ? "MismatchedSelector" : "unknown", wB = (e) => {
  if ((e == null ? void 0 : e.type) === "FailureStatus") {
    const t = mB(e.reason);
    return {
      doc: t !== "unknown" ? `${yo}#variant.${t}` : yo,
      reason: t
    };
  }
  return { doc: yo, reason: "unknown" };
};
function Bo(e, t) {
  if (!e)
    throw new F(N.TRANSACTION_ERROR, t);
}
var GA = {
  [wp]: "RequireFailed",
  [Nd]: "TransferToAddressFailed",
  [Ep]: "SendMessageFailed",
  [Ip]: "AssertEqFailed",
  [yp]: "AssertFailed",
  [Bp]: "Unknown"
}, EB = (e) => {
  const t = e.val.toHex();
  return GA[t] ? GA[t] : void 0;
}, Is = class extends Error {
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
}, IB = class extends Is {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "RequireRevertError";
  }
}, yB = class extends Is {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "TransferToAddressRevertError";
  }
}, BB = class extends Is {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "SendMessageRevertError";
  }
}, CB = class extends Is {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "AssertFailedRevertError";
  }
}, bB = (e) => {
  const t = EB(e);
  if (t)
    switch (t) {
      case "RequireFailed":
        return new IB(e, t);
      case "TransferToAddressFailed":
        return new yB(e, t);
      case "SendMessageFailed":
        return new BB(e, t);
      case "AssertFailed":
        return new CB(e, t);
      default:
        return new Is(e, t);
    }
}, { warn: QB } = console, xB = (e) => e.filter((t) => t.type === de.Revert), vB = class {
  constructor(e) {
    D(this, "revertReceipts");
    this.revertReceipts = xB(e);
  }
  assert(e) {
    const t = this.getError();
    if (t)
      throw t.cause = e, t;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && QB(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), bB(this.revertReceipts[0]);
  }
}, FB = (e, t) => typeof t == "bigint" ? t.toString() : t, DB = class extends Error {
  constructor(t, n, r) {
    var c;
    let s = "";
    (c = t == null ? void 0 : t.gqlTransaction) != null && c.status && (s = `${JSON.stringify(wB(t.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      t.receipts.map(({ type: d, ...l }) => ({ type: de[d], ...l })),
      FB,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    D(this, "logs");
    this.logs = r, new vB(t.receipts).assert(this);
  }
}, on, qA, lh = (qA = class {
  constructor(...e) {
    mt(this, on, void 0);
    xt(this, on, e || []);
  }
  entries() {
    return Ie(this, on);
  }
  push(...e) {
    Ie(this, on).push(...e);
  }
  concat(e) {
    return Ie(this, on).concat(e);
  }
  extend(e) {
    Ie(this, on).push(...e);
  }
  toBytes() {
    return ie(
      Ie(this, on).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return X(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Ie(this, on), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, on = new WeakMap(), qA), NB = (e) => va + xi({ maxInputs: e }), fh = ne + Wr + Zg + ne + ne;
function RB(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === de.ScriptResult ? n = i : (i.type === de.Return || i.type === de.ReturnData || i.type === de.Revert) && (r = i);
  }), !n)
    throw new F(
      N.TRANSACTION_ERROR,
      "The script call result does not contain a 'scriptResultReceipt'."
    );
  if (!r)
    throw new F(
      N.TRANSACTION_ERROR,
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
function tc(e, t, n = []) {
  try {
    const r = RB(e);
    return t(r);
  } catch (r) {
    throw new DB(
      e,
      r.message,
      n
    );
  }
}
function SB(e, t, n) {
  return tc(
    e,
    (r) => {
      if (r.returnReceipt.type === de.Revert)
        throw new F(
          N.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== de.Return && r.returnReceipt.type !== de.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new F(
          N.SCRIPT_REVERTED,
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
var os = class {
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
    return xi({ maxInputs: t }) + va + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return os.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return tc(e, this.scriptResultDecoder, t);
  }
}, gh = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, _B = ke, ph = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new lh(
    Ds(16, e),
    Ds(17, n),
    Xr(17, 17, 0),
    Ds(18, r)
  );
  return t ? i.push(
    Ds(19, t),
    Xr(19, 19, 0),
    mA(16, 17, 18, 19)
  ) : i.push(mA(16, 17, 18, Te.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Xr(21, Te.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Xr(22, Te.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    Bw(22, 22, s.encodedLength),
    Iw(21, 22)
  ]), i;
};
function HA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new lh();
  for (let r = 0; r < e.length; r += 1)
    n.extend(ph(e[r], t[r]).entries());
  return n.push(f0(1)), n.toBytes();
}
var JA = (e) => e === de.Return || e === de.ReturnData, kB = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === de.Call && r === _B && s === t
), OB = (e, t) => (n) => {
  if (Gt(n.code) !== 0)
    throw new F(
      N.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${e} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = kB(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => JA(o)).flatMap((o, c, d) => {
    var l;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === de.Return)
      return [new _().encode(o.val)];
    if (o.type === de.ReturnData) {
      const E = Z(o.data);
      if (t && JA((l = d[c + 1]) == null ? void 0 : l.type)) {
        const g = d[c + 1];
        return ie([E, Z(g.data)]);
      }
      return [E];
    }
    return [new Uint8Array()];
  });
}, LB = (e, t, n, r = []) => tc(e, OB(t, n), r), MB = (e) => e.reduce(
  (t, n) => {
    const r = { ...gh };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + ph(r, s).byteLength();
  },
  Vt.size()
  // placeholder for single RET instruction which is added later
), TB = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), ZA = (e, t) => new os(
  // Script to call the contract, start with stub size matching length of calls
  HA(
    new Array(e.length).fill(gh),
    TB(e)
  ),
  (n) => {
    var v;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = MB(n), i = (8 - s % 8) % 8, o = s + i, c = NB(t.toNumber()) + o, d = [];
    let l = c;
    const E = [], g = [];
    for (let b = 0; b < r; b += 1) {
      const R = n[b];
      E.push({
        isHeap: R.isOutputDataHeap,
        encodedLength: R.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: l,
        assetIdOffset: l + ne,
        gasForwardedOffset: R.gas ? l + ne + Wr : 0,
        callDataOffset: l + ne + Wr + S
      }), g.push(new _().encode(R.amount || 0)), g.push(new G().encode(((v = R.assetId) == null ? void 0 : v.toString()) || Ct)), g.push(R.contractId.toBytes()), g.push(new _().encode(R.fnSelector)), R.gas && (g.push(new _().encode(R.gas)), S = ne), R.isInputDataPointer) {
        const T = l + fh + S;
        g.push(new _().encode(T));
      }
      const J = Z(R.data);
      g.push(J), l = c + ie(g).byteLength;
    }
    const C = HA(d, E);
    return { data: ie(g), script: C };
  },
  () => [new Uint8Array()]
);
function PB(e) {
  const t = e.receipts.find((n) => n.type === de.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var mh = class {
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
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = PB(t);
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
      return SB(e, n, t);
    const s = LB(
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
    return Ny(e, n.interface);
  }
}, wh = class extends mh {
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
    return new wh(
      t,
      n,
      i,
      s,
      r
    );
  }
}, ta = class extends mh {
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
    return await new ta(t, n, r);
  }
};
function UB(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), c = e.getCallConfig().func.isInputDataPointer ? fh : 0, d = i.encodeArguments(r, t + c);
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
var Eh = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new lr();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const t = this.getProvider().getChain().consensusParameters;
    if (!t)
      throw new F(
        F.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = t.maxInputs, r = ZA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => UB(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = ZA(this.functionInvocationScopes, e);
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
    await Pa(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), Q(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new F(
        N.TRANSACTION_ERROR,
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
    return n.gasPrice = Q(Gt(n.gasPrice) || Gt((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
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
      (l) => l.type !== Ee.Coin
    ), await ((d = this.program.account) == null ? void 0 : d.fund(this.transactionRequest, c, t)), this.transactionRequest.updatePredicateInputs(s), o.forEach((l) => {
      this.transactionRequest.addContractInputAndOutput(fe.fromString(l));
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
    Bo(this.program.account, "Wallet is required!"), await this.fundWithRequiredCoins();
    const e = await this.program.account.sendTransaction(
      await this.getTransactionRequest(),
      {
        awaitExecution: !0,
        estimateTxDependencies: !1
      }
    );
    return wh.build(
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
    if (Bo(this.program.account, "Wallet is required!"), !this.program.account.populateTransactionWitnessesSignature)
      return this.dryRun();
    await this.fundWithRequiredCoins();
    const t = await this.program.account.simulateTransaction(
      await this.getTransactionRequest(),
      {
        estimateTxDependencies: !1
      }
    );
    return ta.build(this.functionInvocationScopes, t, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    Bo(this.program.account, "Wallet is required!");
    const e = this.getProvider();
    await this.fundWithRequiredCoins();
    const t = await e.call(await this.getTransactionRequest(), {
      utxoValidation: !1
    });
    return ta.build(this.functionInvocationScopes, t, this.isMultiCall);
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
      throw new F(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${n}'.`
      );
    if (!s)
      e.gasPrice = t;
    else if (o.lt(t))
      throw new F(
        N.GAS_PRICE_TOO_LOW,
        `Gas price '${o}' is lower than the required: '${t}'.`
      );
  }
}, Ih = class extends Eh {
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
        throw new F(
          N.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Ja(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, GB = class extends Eh {
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
        throw new F(
          N.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new F(
        N.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, HB = class {
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
    this.interface = t instanceof kn ? t : new kn(t), this.id = fe.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new Ih(this, e, t);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new GB(this, e);
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
}, JB = class extends Ih {
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
      throw new F(
        F.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.maxInputs.toNumber(), s = new Be(t.length).encodedLength;
    this.scriptRequest = new os(
      t,
      (i) => this.func.encodeArguments(
        i,
        os.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, ZC = class extends gp {
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
    this.bytes = Z(t), this.interface = new kn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new JB(this, this.interface.getFunction("main"), s)
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
      throw new F(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new os(
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
function YC(e) {
  return e;
}
var ZB = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(ZB || {}), YB = Object.defineProperty, VB = (e, t) => {
  for (var n in t)
    YB(e, n, { get: t[n], enumerable: !0 });
}, XB = {};
VB(XB, {
  getContractId: () => Ch,
  getContractRoot: () => yh,
  getContractStorageRoot: () => Bh,
  hexlifyWithPrefix: () => na
});
var yh = (e) => {
  const n = Z(e), r = zA(n, 16384);
  return O0(r.map((s) => X(s)));
}, Bh = (e) => {
  const t = new PE();
  return e.forEach(({ key: n, value: r }) => t.update(Me(n), r)), t.root;
}, Ch = (e, t, n) => {
  const r = yh(Z(e));
  return Me(ie(["0x4655454C", t, r, n]));
}, na = (e, t = !1) => {
  if (e.startsWith("0x"))
    return X(e);
  if (t)
    return X(`0x${e}`);
  throw new F(F.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, jB = class {
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
    this.bytecode = Z(e), t instanceof kn ? this.interface = t : this.interface = new kn(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new jB(this.bytecode, this.interface, e);
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
      key: na(c, !0),
      value: na(d, !0)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: _n(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new F(
        N.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || Bh(n.storageSlots), s = Ch(this.bytecode, n.salt, r), i = new qo({
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
      throw new F(N.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new HB(n, this.interface, this.account);
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
      throw new F(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, VC = 9, XC = 3, jC = 9, $C = [
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
], qC = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", WA, WC = typeof process < "u" && ((WA = process == null ? void 0 : process.env) == null ? void 0 : WA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  Wr as ASSET_ID_LEN,
  vd as AbstractAccount,
  lp as AbstractAddress,
  fp as AbstractContract,
  Fd as AbstractProgram,
  gp as AbstractScript,
  hC as AbstractScriptRequest,
  Ti as Account,
  fe as Address,
  ly as AddressType,
  Et as ArrayCoder,
  CB as AssertFailedRevertError,
  G as B256Coder,
  dd as B512Coder,
  Ge as BN,
  Ct as BaseAssetId,
  Li as BaseTransactionRequest,
  z0 as BaseWalletUnlocked,
  zg as BooleanCoder,
  Be as ByteArrayCoder,
  $s as ByteCoder,
  ar as CHAIN_IDS,
  Zg as CONTRACT_ID_LEN,
  gC as CONTRACT_MAX_SIZE,
  fy as ChainName,
  DC as ChangeOutputCollisionError,
  oe as Coder,
  ZB as Commands,
  HB as Contract,
  jB as ContractFactory,
  XB as ContractUtils,
  qo as CreateTransactionRequest,
  jC as DECIMAL_UNITS,
  XC as DEFAULT_MIN_PRECISION,
  VC as DEFAULT_PRECISION,
  BC as EmptyRoot,
  ld as EnumCoder,
  Ip as FAILED_ASSERT_EQ_SIGNAL,
  yp as FAILED_ASSERT_SIGNAL,
  wp as FAILED_REQUIRE_SIGNAL,
  Ep as FAILED_SEND_MESSAGE_SIGNAL,
  Nd as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Bp as FAILED_UNKNOWN_SIGNAL,
  ii as FUEL_BECH32_HRP_PREFIX,
  WC as FUEL_NETWORK_URL,
  hh as Fuel,
  uB as FuelConnector,
  dh as FuelConnectorEventType,
  ec as FuelConnectorEventTypes,
  uh as FuelConnectorMethods,
  wh as FunctionInvocationResult,
  Ih as FunctionInvocationScope,
  Io as HDWallet,
  jg as INPUT_COIN_FIXED_SIZE,
  Ks as InputCoder,
  kc as InputCoinCoder,
  Ws as InputContractCoder,
  zr as InputMessageCoder,
  Ee as InputType,
  lh as InstructionSet,
  kn as Interface,
  ta as InvocationCallResult,
  mh as InvocationResult,
  Vy as Language,
  AB as LocalStorage,
  yC as MAX_PREDICATE_DATA_LENGTH,
  IC as MAX_PREDICATE_LENGTH,
  wC as MAX_SCRIPT_DATA_LENGTH,
  mC as MAX_SCRIPT_LENGTH,
  EC as MAX_STATIC_CONTRACTS,
  pC as MAX_WITNESSES,
  MA as MNEMONIC_SIZES,
  iB as MemoryStorage,
  Wa as Mnemonic,
  ih as MnemonicVault,
  GB as MultiCallInvocationScope,
  XI as NoWitnessAtIndexError,
  NC as NoWitnessByOwnerError,
  z as NumberCoder,
  hy as OperationName,
  vi as OptionCoder,
  Lc as OutputChangeCoder,
  ei as OutputCoder,
  Oc as OutputCoinCoder,
  zs as OutputContractCoder,
  Tc as OutputContractCreatedCoder,
  be as OutputType,
  Mc as OutputVariableCoder,
  qC as PANIC_DOC_URL,
  $C as PANIC_REASONS,
  ti as PoliciesCoder,
  jt as PolicyType,
  UA as Predicate,
  oh as PrivateKeyVault,
  ui as Provider,
  tp as RawSliceCoder,
  ko as ReceiptBurnCoder,
  Pc as ReceiptCallCoder,
  lC as ReceiptCoder,
  Zc as ReceiptLogCoder,
  Yc as ReceiptLogDataCoder,
  ni as ReceiptMessageOutCoder,
  es as ReceiptMintCoder,
  Hc as ReceiptPanicCoder,
  Uc as ReceiptReturnCoder,
  Gc as ReceiptReturnDataCoder,
  Jc as ReceiptRevertCoder,
  jc as ReceiptScriptResultCoder,
  Vc as ReceiptTransferCoder,
  Xc as ReceiptTransferOutCoder,
  de as ReceiptType,
  IB as RequireRevertError,
  Is as RevertError,
  va as SCRIPT_FIXED_SIZE,
  ZC as Script,
  os as ScriptRequest,
  DB as ScriptResultDecoderError,
  lr as ScriptTransactionRequest,
  BB as SendMessageRevertError,
  Nr as Signer,
  md as StdStringCoder,
  HC as StorageAbstract,
  $c as StorageSlotCoder,
  np as StringCoder,
  Fi as StructCoder,
  On as TransactionCoder,
  Wc as TransactionCreateCoder,
  Kc as TransactionMintCoder,
  Ys as TransactionResponse,
  qc as TransactionScriptCoder,
  dy as TransactionStatus,
  vt as TransactionType,
  uy as TransactionTypeName,
  yB as TransferToAddressRevertError,
  wd as TupleCoder,
  yr as TxPointerCoder,
  _ as U64Coder,
  fC as UtxoIdCoder,
  aB as Vault,
  Ed as VecCoder,
  ne as WORD_SIZE,
  _t as Wallet,
  sh as WalletLocked,
  oB as WalletManager,
  Nt as WalletUnlocked,
  ri as WitnessCoder,
  ke as ZeroBytes32,
  HE as addAmountToAsset,
  Dr as addOperation,
  Jr as addressify,
  Z as arrayify,
  UI as assembleReceiptByType,
  Mi as assembleTransactionSummary,
  Bo as assert,
  GC as assets,
  Q as bn,
  Rn as bufferFromString,
  vC as buildBlockExplorerUrl,
  dB as cacheFor,
  H0 as calculateMetadataGasForTxCreate,
  J0 as calculateMetadataGasForTxScript,
  hr as calculatePriceWithFactor,
  KI as calculateTransactionFee,
  xi as calculateVmTxMemory,
  qB as capitalizeString,
  zA as chunkAndPadBytes,
  Fp as clearFirst12BytesFromB256,
  Ja as coinQuantityfy,
  ie as concat,
  As as concatBytes,
  YC as createConfig,
  Og as decrypt,
  Mg as decryptJsonWalletData,
  KB as defaultChainConfig,
  zB as defaultConsensusKey,
  hB as deferPromise,
  JC as dispatchFuelConnectorEvent,
  Lg as encrypt,
  Tg as encryptJsonWalletData,
  Rs as english,
  vy as extractBurnedAssetsFromReceipts,
  xy as extractMintedAssetsFromReceipts,
  tC as format,
  eC as formatUnits,
  Da as fromBech32,
  RC as fromDateToTai64,
  zI as fromTai64ToDate,
  FC as fromTai64ToUnix,
  VI as fromUnixToTai64,
  JI as gasUsedByInputs,
  TC as getAssetEth,
  PC as getAssetFuel,
  Dd as getAssetId,
  Ly as getAssetNetwork,
  K0 as getAssetWithNetwork,
  Na as getBytesFromBech32,
  yy as getContractCallOperations,
  by as getContractCreatedOperations,
  Ny as getDecodedLogs,
  Oy as getDefaultChainId,
  wB as getDocs,
  U0 as getGasUsedFromReceipts,
  $a as getInputAccountAddress,
  oy as getInputContractFromIndex,
  Y0 as getInputFromAssetId,
  ja as getInputsByType,
  ty as getInputsByTypes,
  ny as getInputsCoin,
  sy as getInputsCoinAndMessage,
  iy as getInputsContract,
  ry as getInputsMessage,
  Xa as getMaxGas,
  G0 as getMinGas,
  Qy as getOperations,
  Es as getOutputsByType,
  cy as getOutputsChange,
  V0 as getOutputsCoin,
  Ay as getOutputsContract,
  ay as getOutputsContractCreated,
  SC as getOutputsVariable,
  Cy as getPayProducerOperations,
  cB as getPredicateRoot,
  vp as getRandomB256,
  is as getReceiptsByType,
  py as getReceiptsCall,
  my as getReceiptsMessageOut,
  kC as getReceiptsTransferOut,
  PI as getReceiptsWithMissingData,
  Fy as getTransactionStatusName,
  OC as getTransactionSummary,
  LC as getTransactionSummaryFromRequest,
  X0 as getTransactionTypeName,
  MC as getTransactionsSummaries,
  SA as getTransferOperations,
  Iy as getWithdrawFromFuelOperations,
  _C as hasSameAssetId,
  s0 as hash,
  dw as hashMessage,
  X as hexlify,
  OI as inputify,
  Oo as isB256,
  Us as isBech32,
  NA as isCoin,
  Lo as isEvmAddress,
  xC as isMessage,
  eA as isPublicKey,
  bC as isRawCoin,
  QC as isRawMessage,
  qa as isType,
  j0 as isTypeCreate,
  gy as isTypeMint,
  $0 as isTypeScript,
  Xu as keccak256,
  dC as keyFromPassword,
  Gh as max,
  nC as multiply,
  xp as normalizeBech32,
  ZI as normalizeJSON,
  WB as normalizeString,
  LI as outputify,
  Dp as padFirst12BytesOfEvmAddress,
  fr as processGqlReceipt,
  Dy as processGraphqlStatus,
  _n as randomBytes,
  Sn as resolveGasDependentCosts,
  UC as resolveIconPaths,
  RA as returnZeroScript,
  bB as revertErrorFactory,
  Vu as scrypt,
  YI as sleep,
  pp as sortPolicies,
  Hr as stringFromBuffer,
  tA as toB256,
  Ps as toBech32,
  Wt as toBytes,
  Uh as toFixed,
  oa as toHex,
  Gt as toNumber,
  Ut as transactionRequestify,
  hw as uint64ToBytesBE,
  Uy as urlJoin,
  Ss as withTimeout,
  WI as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
