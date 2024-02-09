var wd = Object.defineProperty;
var Id = (e, t, n) => t in e ? wd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var R = (e, t, n) => (Id(e, typeof t != "symbol" ? t + "" : t, n), n), Si = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var be = (e, t, n) => (Si(e, t, "read from private field"), n ? n.call(e) : t.get(e)), gt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, bt = (e, t, n, r) => (Si(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Fn = (e, t, n) => (Si(e, t, "access private method"), n);
function hA() {
  return {
    FORC: "0.49.2",
    FUEL_CORE: "0.22.0",
    FUELS: "0.73.0"
  };
}
function Na(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function Do(e, t) {
  const n = Na(e), r = Na(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function yd(e, t) {
  const { major: n } = Do(e, t);
  return n === 0;
}
function Bd(e, t) {
  const { minor: n } = Do(e, t);
  return n === 0;
}
function Cd(e, t) {
  const { patch: n } = Do(e, t);
  return n === 0;
}
function bd(e) {
  const { FUEL_CORE: t } = hA();
  return {
    supportedVersion: t,
    isMajorSupported: yd(e, t),
    isMinorSupported: Bd(e, t),
    isPatchSupported: Cd(e, t)
  };
}
var Qd = hA(), xd = Object.defineProperty, vd = (e, t, n) => t in e ? xd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Fd = (e, t, n) => (vd(e, typeof t != "symbol" ? t + "" : t, n), n), N = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e))(N || {}), gs = class extends Error {
  constructor(t, n) {
    super(n);
    R(this, "VERSIONS", Qd);
    R(this, "code");
    this.code = t, this.name = "FuelError";
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new gs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(N);
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
Fd(v, "CODES", N);
var vy = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, lA = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(c, c + t)), n.push(d);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, fA = (e) => {
  if (e instanceof Uint8Array)
    return new Uint8Array(e);
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const t = new Uint8Array((e.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < t.length; r++)
      t[r] = parseInt(e.substring(n, n + 2), 16), n += 2;
    return t;
  }
  throw new v(N.PARSE_FAILED, "invalid BytesLike value");
}, gA = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, de = (e) => {
  const t = e.map((n) => fA(n));
  return gA(t);
}, Sa = "0123456789abcdef";
function Fy(e) {
  const t = fA(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Sa[(s & 240) >> 4] + Sa[s & 15];
  }
  return n;
}
var Dy = (e) => {
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
    throw new v(N.PARSE_FAILED, r);
  }
  return n;
}, Dd = {
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
}, Ry = Dd, Ny = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const Rd = "6.7.1";
function Nd(e, t, n) {
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
function qs(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && Nd(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
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
function Sd(e, t, n) {
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
    s.push(`code=${t}`), s.push(`version=${Rd}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return qs(r, { code: t }), n && Object.assign(r, n), r;
}
function fr(e, t, n, r) {
  if (!e)
    throw Sd(t, n, r);
}
function Ce(e, t, n, r) {
  fr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const _d = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function kd(e) {
  fr(_d.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function pA(e, t, n) {
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
function Ht(e, t) {
  return pA(e, t, !1);
}
function Y(e, t) {
  return pA(e, t, !0);
}
function Md(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const _a = "0123456789abcdef";
function V(e) {
  const t = Ht(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += _a[(s & 240) >> 4] + _a[s & 15];
  }
  return n;
}
function _t(e) {
  return "0x" + e.map((t) => V(t).substring(2)).join("");
}
function Ro(e, t, n) {
  const r = Ht(e);
  return n != null && n > r.length && fr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), V(r.slice(t ?? 0, n ?? r.length));
}
const Od = BigInt(0);
BigInt(1);
const Zn = 9007199254740991;
function Rn(e, t) {
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
function Ld(e, t) {
  const n = Rn(e, t);
  return fr(n >= Od, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const ka = "0123456789abcdef";
function Td(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += ka[n >> 4], t += ka[n & 15];
    return BigInt(t);
  }
  return Rn(e);
}
function mA(e, t) {
  switch (typeof e) {
    case "bigint":
      return Ce(e >= -Zn && e <= Zn, "overflow", t || "value", e), Number(e);
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -Zn && e <= Zn, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return mA(BigInt(e), t);
      } catch (n) {
        Ce(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  Ce(!1, "invalid numeric value", t || "value", e);
}
function Pd(e, t) {
  let r = Ld(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = mA(t, "width");
    for (fr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const $i = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let is = null;
function Ud(e) {
  if (is == null) {
    is = {};
    for (let n = 0; n < $i.length; n++)
      is[$i[n]] = BigInt(n);
  }
  const t = is[e];
  return Ce(t != null, "invalid base58 value", "letter", e), t;
}
const Gd = BigInt(0), Wi = BigInt(58);
function EA(e) {
  let t = Td(Ht(e)), n = "";
  for (; t; )
    n = $i[Number(t % Wi)] + n, t /= Wi;
  return n;
}
function Hd(e) {
  let t = Gd;
  for (let n = 0; n < e.length; n++)
    t *= Wi, t += Ud(e[n]);
  return t;
}
function Jd(e, t, n, r, s) {
  Ce(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function wA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function Zd(e, t, n, r, s) {
  return e === "OVERLONG" ? (Ce(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), wA(e, t, n));
}
const Yd = Object.freeze({
  error: Jd,
  ignore: wA,
  replace: Zd
});
function Xd(e, t) {
  t == null && (t = Yd.error);
  const n = Ht(e, "bytes"), r = [];
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
function No(e, t) {
  t != null && (kd(t), e = e.normalize(t));
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
function Vd(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function $s(e, t) {
  return Vd(Xd(e, t));
}
function zi(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function jd(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function IA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function qd(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  zi(e.outputLen), zi(e.blockLen);
}
function $d(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Wd(e, t) {
  IA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const yt = {
  number: zi,
  bool: jd,
  bytes: IA,
  hash: qd,
  exists: $d,
  output: Wd
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const zd = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), ps = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), $t = (e, t) => e << 32 - t | e >>> t, Kd = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Kd)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function eh(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function On(e) {
  if (typeof e == "string" && (e = eh(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let xs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const th = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function nh(e, t) {
  if (t !== void 0 && (typeof t != "object" || !th(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function gr(e) {
  const t = (r) => e().update(On(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function rh(e) {
  const t = (r, s) => e(s).update(On(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let yA = class extends xs {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, yt.hash(t);
    const r = On(n);
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
const So = (e, t, n) => new yA(e, t).update(n).digest();
So.create = (e, t) => new yA(e, t);
function sh(e, t, n, r) {
  yt.hash(e);
  const s = nh({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (yt.number(i), yt.number(o), yt.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = On(t), l = On(n), I = new Uint8Array(o), g = So.create(e, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: g, PRFSalt: C };
}
function ih(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function oh(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = sh(e, t, n, r);
  let l;
  const I = new Uint8Array(4), g = ps(I), C = new Uint8Array(c.outputLen);
  for (let x = 1, D = 0; D < i; x++, D += c.outputLen) {
    const b = o.subarray(D, D + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(I).digestInto(C), b.set(C.subarray(0, b.length));
    for (let F = 1; F < s; F++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return ih(c, d, o, l, C);
}
function ah(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
let _o = class extends xs {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ps(this.buffer);
  }
  update(t) {
    yt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = On(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = ps(t);
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
    ah(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ps(t);
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
const ch = (e, t, n) => e & t ^ ~e & n, Ah = (e, t, n) => e & t ^ e & n ^ t & n, uh = new Uint32Array([
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
let dh = class extends _o {
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
      const C = an[g - 15], x = an[g - 2], D = $t(C, 7) ^ $t(C, 18) ^ C >>> 3, b = $t(x, 17) ^ $t(x, 19) ^ x >>> 10;
      an[g] = b + an[g - 7] + D + an[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const C = $t(c, 6) ^ $t(c, 11) ^ $t(c, 25), x = I + C + ch(c, d, l) + uh[g] + an[g] | 0, b = ($t(r, 2) ^ $t(r, 13) ^ $t(r, 22)) + Ah(r, s, i) | 0;
      I = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, l, I);
  }
  roundClean() {
    an.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const ko = gr(() => new dh()), os = BigInt(2 ** 32 - 1), Ki = BigInt(32);
function BA(e, t = !1) {
  return t ? { h: Number(e & os), l: Number(e >> Ki & os) } : { h: Number(e >> Ki & os) | 0, l: Number(e & os) | 0 };
}
function hh(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = BA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const lh = (e, t) => BigInt(e >>> 0) << Ki | BigInt(t >>> 0), fh = (e, t, n) => e >>> n, gh = (e, t, n) => e << 32 - n | t >>> n, ph = (e, t, n) => e >>> n | t << 32 - n, mh = (e, t, n) => e << 32 - n | t >>> n, Eh = (e, t, n) => e << 64 - n | t >>> n - 32, wh = (e, t, n) => e >>> n - 32 | t << 64 - n, Ih = (e, t) => t, yh = (e, t) => e, Bh = (e, t, n) => e << n | t >>> 32 - n, Ch = (e, t, n) => t << n | e >>> 32 - n, bh = (e, t, n) => t << n - 32 | e >>> 64 - n, Qh = (e, t, n) => e << n - 32 | t >>> 64 - n;
function xh(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const vh = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Fh = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, Dh = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Rh = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Nh = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Sh = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Ae = {
  fromBig: BA,
  split: hh,
  toBig: lh,
  shrSH: fh,
  shrSL: gh,
  rotrSH: ph,
  rotrSL: mh,
  rotrBH: Eh,
  rotrBL: wh,
  rotr32H: Ih,
  rotr32L: yh,
  rotlSH: Bh,
  rotlSL: Ch,
  rotlBH: bh,
  rotlBL: Qh,
  add: xh,
  add3L: vh,
  add3H: Fh,
  add4L: Dh,
  add4H: Rh,
  add5H: Sh,
  add5L: Nh
}, [_h, kh] = Ae.split([
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
class Mo extends _o {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: l, El: I, Fh: g, Fl: C, Gh: x, Gl: D, Hh: b, Hl: F } = this;
    return [t, n, r, s, i, o, c, d, l, I, g, C, x, D, b, F];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d, l, I, g, C, x, D, b, F) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = l | 0, this.El = I | 0, this.Fh = g | 0, this.Fl = C | 0, this.Gh = x | 0, this.Gl = D | 0, this.Hh = b | 0, this.Hl = F | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      cn[T] = t.getUint32(n), An[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = cn[T - 15] | 0, M = An[T - 15] | 0, k = Ae.rotrSH(j, M, 1) ^ Ae.rotrSH(j, M, 8) ^ Ae.shrSH(j, M, 7), O = Ae.rotrSL(j, M, 1) ^ Ae.rotrSL(j, M, 8) ^ Ae.shrSL(j, M, 7), P = cn[T - 2] | 0, $ = An[T - 2] | 0, U = Ae.rotrSH(P, $, 19) ^ Ae.rotrBH(P, $, 61) ^ Ae.shrSH(P, $, 6), H = Ae.rotrSL(P, $, 19) ^ Ae.rotrBL(P, $, 61) ^ Ae.shrSL(P, $, 6), ee = Ae.add4L(O, H, An[T - 7], An[T - 16]), B = Ae.add4H(ee, k, U, cn[T - 7], cn[T - 16]);
      cn[T] = B | 0, An[T] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: l, Dl: I, Eh: g, El: C, Fh: x, Fl: D, Gh: b, Gl: F, Hh: S, Hl: J } = this;
    for (let T = 0; T < 80; T++) {
      const j = Ae.rotrSH(g, C, 14) ^ Ae.rotrSH(g, C, 18) ^ Ae.rotrBH(g, C, 41), M = Ae.rotrSL(g, C, 14) ^ Ae.rotrSL(g, C, 18) ^ Ae.rotrBL(g, C, 41), k = g & x ^ ~g & b, O = C & D ^ ~C & F, P = Ae.add5L(J, M, O, kh[T], An[T]), $ = Ae.add5H(P, S, j, k, _h[T], cn[T]), U = P | 0, H = Ae.rotrSH(r, s, 28) ^ Ae.rotrBH(r, s, 34) ^ Ae.rotrBH(r, s, 39), ee = Ae.rotrSL(r, s, 28) ^ Ae.rotrBL(r, s, 34) ^ Ae.rotrBL(r, s, 39), B = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      S = b | 0, J = F | 0, b = x | 0, F = D | 0, x = g | 0, D = C | 0, { h: g, l: C } = Ae.add(l | 0, I | 0, $ | 0, U | 0), l = c | 0, I = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = Ae.add3L(U, ee, a);
      r = Ae.add3H(A, $, H, B), s = A | 0;
    }
    ({ h: r, l: s } = Ae.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = Ae.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = Ae.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h: l, l: I } = Ae.add(this.Dh | 0, this.Dl | 0, l | 0, I | 0), { h: g, l: C } = Ae.add(this.Eh | 0, this.El | 0, g | 0, C | 0), { h: x, l: D } = Ae.add(this.Fh | 0, this.Fl | 0, x | 0, D | 0), { h: b, l: F } = Ae.add(this.Gh | 0, this.Gl | 0, b | 0, F | 0), { h: S, l: J } = Ae.add(this.Hh | 0, this.Hl | 0, S | 0, J | 0), this.set(r, s, i, o, c, d, l, I, g, C, x, D, b, F, S, J);
  }
  roundClean() {
    cn.fill(0), An.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class Mh extends Mo {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class Oh extends Mo {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const Oo = gr(() => new Mo());
gr(() => new Mh());
gr(() => new Oh());
function Lh() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const Ma = Lh();
Ma.crypto || Ma.msCrypto;
function Th(e) {
  switch (e) {
    case "sha256":
      return ko.create();
    case "sha512":
      return Oo.create();
  }
  Ce(!1, "invalid hashing algorithm name", "algorithm", e);
}
function Ph(e, t) {
  const n = { sha256: ko, sha512: Oo }[e];
  return Ce(n != null, "invalid hmac algorithm", "algorithm", e), So.create(n, t);
}
function Uh(e, t, n, r, s) {
  const i = { sha256: ko, sha512: Oo }[s];
  return Ce(i != null, "invalid pbkdf2 algorithm", "algorithm", s), oh(i, e, t, { c: n, dkLen: r });
}
let CA = !1;
const bA = function(e, t, n) {
  return Ph(e, t).update(n).digest();
};
let QA = bA;
function pr(e, t, n) {
  const r = Ht(t, "key"), s = Ht(n, "data");
  return V(QA(e, r, s));
}
pr._ = bA;
pr.lock = function() {
  CA = !0;
};
pr.register = function(e) {
  if (CA)
    throw new Error("computeHmac is locked");
  QA = e;
};
Object.freeze(pr);
const [xA, vA, FA] = [[], [], []], Gh = BigInt(0), yr = BigInt(1), Hh = BigInt(2), Jh = BigInt(7), Zh = BigInt(256), Yh = BigInt(113);
for (let e = 0, t = yr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], xA.push(2 * (5 * r + n)), vA.push((e + 1) * (e + 2) / 2 % 64);
  let s = Gh;
  for (let i = 0; i < 7; i++)
    t = (t << yr ^ (t >> Jh) * Yh) % Zh, t & Hh && (s ^= yr << (yr << BigInt(i)) - yr);
  FA.push(s);
}
const [Xh, Vh] = Ae.split(FA, !0), Oa = (e, t, n) => n > 32 ? Ae.rotlBH(e, t, n) : Ae.rotlSH(e, t, n), La = (e, t, n) => n > 32 ? Ae.rotlBL(e, t, n) : Ae.rotlSL(e, t, n);
function jh(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], I = n[d + 1], g = Oa(l, I, 1) ^ n[c], C = La(l, I, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = vA[o], d = Oa(s, i, c), l = La(s, i, c), I = xA[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= Xh[r], e[1] ^= Vh[r];
  }
  n.fill(0);
}
let DA = class RA extends xs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, yt.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = zd(this.state);
  }
  keccak() {
    jh(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
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
    return t || (t = new RA(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const xn = (e, t, n) => gr(() => new DA(t, e, n));
xn(6, 144, 224 / 8);
xn(6, 136, 256 / 8);
xn(6, 104, 384 / 8);
xn(6, 72, 512 / 8);
xn(1, 144, 224 / 8);
const qh = xn(1, 136, 256 / 8);
xn(1, 104, 384 / 8);
xn(1, 72, 512 / 8);
const NA = (e, t, n) => rh((r = {}) => new DA(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
NA(31, 168, 128 / 8);
NA(31, 136, 256 / 8);
let SA = !1;
const _A = function(e) {
  return qh(e);
};
let kA = _A;
function Xr(e) {
  const t = Ht(e, "data");
  return V(kA(t));
}
Xr._ = _A;
Xr.lock = function() {
  SA = !0;
};
Xr.register = function(e) {
  if (SA)
    throw new TypeError("keccak256 is locked");
  kA = e;
};
Object.freeze(Xr);
const $h = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), MA = Uint8Array.from({ length: 16 }, (e, t) => t), Wh = MA.map((e) => (9 * e + 5) % 16);
let Lo = [MA], To = [Wh];
for (let e = 0; e < 4; e++)
  for (let t of [Lo, To])
    t.push(t[e].map((n) => $h[n]));
const OA = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), zh = Lo.map((e, t) => e.map((n) => OA[t][n])), Kh = To.map((e, t) => e.map((n) => OA[t][n])), el = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), tl = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), as = (e, t) => e << t | e >>> 32 - t;
function Ta(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const cs = new Uint32Array(16);
class nl extends _o {
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
      cs[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, l = this.h3 | 0, I = l, g = this.h4 | 0, C = g;
    for (let x = 0; x < 5; x++) {
      const D = 4 - x, b = el[x], F = tl[x], S = Lo[x], J = To[x], T = zh[x], j = Kh[x];
      for (let M = 0; M < 16; M++) {
        const k = as(r + Ta(x, i, c, l) + cs[S[M]] + b, T[M]) + g | 0;
        r = g, g = l, l = as(c, 10) | 0, c = i, i = k;
      }
      for (let M = 0; M < 16; M++) {
        const k = as(s + Ta(D, o, d, I) + cs[J[M]] + F, j[M]) + C | 0;
        s = C, C = I, I = as(d, 10) | 0, d = o, o = k;
      }
    }
    this.set(this.h1 + c + I | 0, this.h2 + l + C | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    cs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const rl = gr(() => new nl());
let LA = !1;
const TA = function(e) {
  return rl(e);
};
let PA = TA;
function Vr(e) {
  const t = Ht(e, "data");
  return V(PA(t));
}
Vr._ = TA;
Vr.lock = function() {
  LA = !0;
};
Vr.register = function(e) {
  if (LA)
    throw new TypeError("ripemd160 is locked");
  PA = e;
};
Object.freeze(Vr);
let UA = !1;
const GA = function(e, t, n, r, s) {
  return Uh(e, t, n, r, s);
};
let HA = GA;
function mr(e, t, n, r, s) {
  const i = Ht(e, "password"), o = Ht(t, "salt");
  return V(HA(i, o, n, r, s));
}
mr._ = GA;
mr.lock = function() {
  UA = !0;
};
mr.register = function(e) {
  if (UA)
    throw new Error("pbkdf2 is locked");
  HA = e;
};
Object.freeze(mr);
const JA = function(e) {
  return Th("sha256").update(e).digest();
};
let ZA = JA, YA = !1;
function Me(e) {
  const t = Ht(e, "data");
  return V(ZA(t));
}
Me._ = JA;
Me.lock = function() {
  YA = !0;
};
Me.register = function(e) {
  if (YA)
    throw new Error("sha256 is locked");
  ZA = e;
};
Object.freeze(Me);
Object.freeze(Me);
const sl = {}, il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sl
}, Symbol.toStringTag, { value: "Module" })), ol = BigInt(0), al = BigInt(36);
function Pa(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Ht(Xr(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const Po = {};
for (let e = 0; e < 10; e++)
  Po[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  Po[String.fromCharCode(65 + e)] = String(10 + e);
const Ua = 15;
function cl(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => Po[r]).join("");
  for (; t.length >= Ua; ) {
    let r = t.substring(0, Ua);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const Al = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function ul(e) {
  e = e.toLowerCase();
  let t = ol;
  for (let n = 0; n < e.length; n++)
    t = t * al + Al[e[n]];
  return t;
}
function dl(e) {
  if (Ce(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = Pa(e);
    return Ce(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Ce(e.substring(2, 4) === cl(e), "bad icap checksum", "address", e);
    let t = ul(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return Pa("0x" + t);
  }
  Ce(!1, "invalid address", "address", e);
}
function _i(e, t) {
  return {
    address: dl(e),
    storageKeys: t.map((n, r) => (Ce(Md(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function hl(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Ce(n.length === 2, "invalid slot set", `value[${r}]`, n), _i(n[0], n[1])) : (Ce(n != null && typeof n == "object", "invalid address-slot set", "value", e), _i(n.address, n.storageKeys)));
  Ce(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return _i(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const ll = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
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
    R(this, "name");
    qs(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new jr(this.name);
  }
}
class Ws extends jr {
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
    R(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    R(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    R(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    R(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    R(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    R(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    R(this, "txAccessListAddress");
    const s = { effectiveBlock: n };
    function i(o, c) {
      let d = (r || {})[o];
      d == null && (d = c), Ce(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), qs(this, s);
  }
  clone() {
    return new Ws(this.effectiveBlock, this);
  }
}
class zs extends jr {
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
    R(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    R(this, "targetNetwork");
    qs(this, {
      address: n || ll,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new zs(this.address, this.targetNetwork);
  }
}
var Jr, Zr;
class XA extends jr {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    gt(this, Jr, void 0);
    gt(this, Zr, void 0);
    bt(this, Jr, n), bt(this, Zr, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return be(this, Jr);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return be(this, Zr);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Jr = new WeakMap(), Zr = new WeakMap();
const ki = /* @__PURE__ */ new Map();
var tr, nr, En;
const jn = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    gt(this, tr, void 0);
    gt(this, nr, void 0);
    gt(this, En, void 0);
    bt(this, tr, t), bt(this, nr, Rn(n)), bt(this, En, /* @__PURE__ */ new Map());
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
    return be(this, tr);
  }
  set name(t) {
    bt(this, tr, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return be(this, nr);
  }
  set chainId(t) {
    bt(this, nr, Rn(t, "chainId"));
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
        return this.chainId === Rn(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === Rn(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === Rn(t.chainId);
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
    return Array.from(be(this, En).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (be(this, En).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return be(this, En).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return be(this, En).get(t) || null;
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new Ws();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = hl(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (gl(), t == null)
      return jn.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = ki.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new jn("unknown", t);
      Ce(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Ce(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new jn(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new zs(t.ensAddress, t.ensNetwork)), n;
    }
    Ce(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = ki.get(t);
    r && Ce(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), ki.set(t, n);
  }
};
let Sn = jn;
tr = new WeakMap(), nr = new WeakMap(), En = new WeakMap();
function Ga(e, t) {
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
function Ha(e) {
  return new XA(e, async (t, n, r) => {
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
        maxFeePerGas: Ga(c.maxFee, 9),
        maxPriorityFeePerGas: Ga(c.maxPriorityFee, 9)
      };
    } catch (i) {
      fr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function fl(e) {
  return new XA("data:", async (t, n, r) => {
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
let Ja = !1;
function gl() {
  if (Ja)
    return;
  Ja = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Sn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new zs(null, r.ensNetwork)), i.attachPlugin(new Ws()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Sn.register(t, s), Sn.register(n, s), r.altNames && r.altNames.forEach((i) => {
      Sn.register(i, s);
    });
  }
  e("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), e("ropsten", 3, { ensNetwork: 3 }), e("rinkeby", 4, { ensNetwork: 4 }), e("goerli", 5, { ensNetwork: 5 }), e("kovan", 42, { ensNetwork: 42 }), e("sepolia", 11155111, {}), e("classic", 61, {}), e("classicKotti", 6, {}), e("arbitrum", 42161, {
    ensNetwork: 1
  }), e("arbitrum-goerli", 421613, {}), e("bnb", 56, { ensNetwork: 1 }), e("bnbt", 97, {}), e("linea", 59144, { ensNetwork: 1 }), e("linea-goerli", 59140, {}), e("matic", 137, {
    ensNetwork: 1,
    plugins: [
      Ha("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      Ha("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      fl(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
var we = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Uo(e) {
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
var Go = { exports: {} };
const ml = /* @__PURE__ */ Uo(il);
Go.exports;
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
      var f, w, y = 0;
      if (h === "be")
        for (m = a.length - 1, f = 0; m >= 0; m -= 3)
          w = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[f] |= w << y & 67108863, this.words[f + 1] = w >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (h === "le")
        for (m = 0, f = 0; m < a.length; m += 3)
          w = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[f] |= w << y & 67108863, this.words[f + 1] = w >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
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
      var f = 0, w = 0, y;
      if (h === "be")
        for (m = a.length - 1; m >= A; m -= 2)
          y = d(a, A, m) << f, this.words[w] |= y & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= y >>> 26) : f += 8;
      else {
        var p = a.length - A;
        for (m = p % 2 === 0 ? A + 1 : A; m < a.length; m += 2)
          y = d(a, A, m) << f, this.words[w] |= y & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function l(B, a, A, h) {
      for (var m = 0, f = 0, w = Math.min(B.length, A), y = a; y < w; y++) {
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
      for (var w = a.length - h, y = w % m, p = Math.min(w, w - y) + h, u = 0, E = h; E < p; E += m)
        u = l(a, E, E + m, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var Z = 1;
        for (u = l(a, E, a.length, A), E = 0; E < y; E++)
          Z *= A;
        this.imuln(Z), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
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
    ], D = [
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
        for (var m = 0, f = 0, w = 0; w < this.length; w++) {
          var y = this.words[w], p = ((y << m | f) & 16777215).toString(16);
          f = y >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, w--), f !== 0 || w !== this.length - 1 ? h = C[6 - p.length] + p + h : h = p + h;
        }
        for (f !== 0 && (h = f.toString(16) + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = x[a], E = D[a];
        h = "";
        var Z = this.clone();
        for (Z.negative = 0; !Z.isZero(); ) {
          var X = Z.modrn(E).toString(a);
          Z = Z.idivn(E), Z.isZero() ? h = X + h : h = C[u - X.length] + X + h;
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
      var w = b(a, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](w, m), w;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var h = 0, m = 0, f = 0, w = 0; f < this.length; f++) {
        var y = this.words[f] << w | m;
        a[h++] = y & 255, h < a.length && (a[h++] = y >> 8 & 255), h < a.length && (a[h++] = y >> 16 & 255), w === 6 ? (h < a.length && (a[h++] = y >> 24 & 255), m = 0, w = 0) : (m = y >>> 24, w += 2);
      }
      if (h < a.length)
        for (a[h++] = m; h < a.length; )
          a[h++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var h = a.length - 1, m = 0, f = 0, w = 0; f < this.length; f++) {
        var y = this.words[f] << w | m;
        a[h--] = y & 255, h >= 0 && (a[h--] = y >> 8 & 255), h >= 0 && (a[h--] = y >> 16 & 255), w === 6 ? (h >= 0 && (a[h--] = y >> 24 & 255), m = 0, w = 0) : (m = y >>> 24, w += 2);
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
    function F(B) {
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
      for (var f = 0, w = 0; w < m.length; w++)
        A = (h.words[w] | 0) + (m.words[w] | 0) + f, this.words[w] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && w < h.length; w++)
        A = (h.words[w] | 0) + f, this.words[w] = A & 67108863, f = A >>> 26;
      if (this.length = h.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (h !== this)
        for (; w < h.length; w++)
          this.words[w] = h.words[w];
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
      for (var w = 0, y = 0; y < f.length; y++)
        A = (m.words[y] | 0) - (f.words[y] | 0) + w, w = A >> 26, this.words[y] = A & 67108863;
      for (; w !== 0 && y < m.length; y++)
        A = (m.words[y] | 0) + w, w = A >> 26, this.words[y] = A & 67108863;
      if (w === 0 && y < m.length && m !== this)
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
      var m = B.words[0] | 0, f = a.words[0] | 0, w = m * f, y = w & 67108863, p = w / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < h; u++) {
        for (var E = p >>> 26, Z = p & 67108863, X = Math.min(u, a.length - 1), z = Math.max(0, u - B.length + 1); z <= X; z++) {
          var q = u - z | 0;
          m = B.words[q] | 0, f = a.words[z] | 0, w = m * f + Z, E += w / 67108864 | 0, Z = w & 67108863;
        }
        A.words[u] = Z | 0, p = E | 0;
      }
      return p !== 0 ? A.words[u] = p | 0 : A.length--, A._strip();
    }
    var J = function(a, A, h) {
      var m = a.words, f = A.words, w = h.words, y = 0, p, u, E, Z = m[0] | 0, X = Z & 8191, z = Z >>> 13, q = m[1] | 0, re = q & 8191, se = q >>> 13, Se = m[2] | 0, fe = Se & 8191, oe = Se >>> 13, Re = m[3] | 0, he = Re & 8191, ge = Re >>> 13, qt = m[4] | 0, Ne = qt & 8191, ye = qt >>> 13, Ir = m[5] | 0, _e = Ir & 8191, Le = Ir >>> 13, ss = m[6] | 0, Ue = ss & 8191, Ge = ss >>> 13, Ea = m[7] | 0, He = Ea & 8191, Je = Ea >>> 13, wa = m[8] | 0, Ze = wa & 8191, Ye = wa >>> 13, Ia = m[9] | 0, Xe = Ia & 8191, Ve = Ia >>> 13, ya = f[0] | 0, je = ya & 8191, qe = ya >>> 13, Ba = f[1] | 0, $e = Ba & 8191, We = Ba >>> 13, Ca = f[2] | 0, ze = Ca & 8191, Ke = Ca >>> 13, ba = f[3] | 0, et = ba & 8191, tt = ba >>> 13, Qa = f[4] | 0, nt = Qa & 8191, rt = Qa >>> 13, xa = f[5] | 0, st = xa & 8191, it = xa >>> 13, va = f[6] | 0, ot = va & 8191, at = va >>> 13, Fa = f[7] | 0, ct = Fa & 8191, At = Fa >>> 13, Da = f[8] | 0, ut = Da & 8191, dt = Da >>> 13, Ra = f[9] | 0, ht = Ra & 8191, lt = Ra >>> 13;
      h.negative = a.negative ^ A.negative, h.length = 19, p = Math.imul(X, je), u = Math.imul(X, qe), u = u + Math.imul(z, je) | 0, E = Math.imul(z, qe);
      var li = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (li >>> 26) | 0, li &= 67108863, p = Math.imul(re, je), u = Math.imul(re, qe), u = u + Math.imul(se, je) | 0, E = Math.imul(se, qe), p = p + Math.imul(X, $e) | 0, u = u + Math.imul(X, We) | 0, u = u + Math.imul(z, $e) | 0, E = E + Math.imul(z, We) | 0;
      var fi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (fi >>> 26) | 0, fi &= 67108863, p = Math.imul(fe, je), u = Math.imul(fe, qe), u = u + Math.imul(oe, je) | 0, E = Math.imul(oe, qe), p = p + Math.imul(re, $e) | 0, u = u + Math.imul(re, We) | 0, u = u + Math.imul(se, $e) | 0, E = E + Math.imul(se, We) | 0, p = p + Math.imul(X, ze) | 0, u = u + Math.imul(X, Ke) | 0, u = u + Math.imul(z, ze) | 0, E = E + Math.imul(z, Ke) | 0;
      var gi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (gi >>> 26) | 0, gi &= 67108863, p = Math.imul(he, je), u = Math.imul(he, qe), u = u + Math.imul(ge, je) | 0, E = Math.imul(ge, qe), p = p + Math.imul(fe, $e) | 0, u = u + Math.imul(fe, We) | 0, u = u + Math.imul(oe, $e) | 0, E = E + Math.imul(oe, We) | 0, p = p + Math.imul(re, ze) | 0, u = u + Math.imul(re, Ke) | 0, u = u + Math.imul(se, ze) | 0, E = E + Math.imul(se, Ke) | 0, p = p + Math.imul(X, et) | 0, u = u + Math.imul(X, tt) | 0, u = u + Math.imul(z, et) | 0, E = E + Math.imul(z, tt) | 0;
      var pi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (pi >>> 26) | 0, pi &= 67108863, p = Math.imul(Ne, je), u = Math.imul(Ne, qe), u = u + Math.imul(ye, je) | 0, E = Math.imul(ye, qe), p = p + Math.imul(he, $e) | 0, u = u + Math.imul(he, We) | 0, u = u + Math.imul(ge, $e) | 0, E = E + Math.imul(ge, We) | 0, p = p + Math.imul(fe, ze) | 0, u = u + Math.imul(fe, Ke) | 0, u = u + Math.imul(oe, ze) | 0, E = E + Math.imul(oe, Ke) | 0, p = p + Math.imul(re, et) | 0, u = u + Math.imul(re, tt) | 0, u = u + Math.imul(se, et) | 0, E = E + Math.imul(se, tt) | 0, p = p + Math.imul(X, nt) | 0, u = u + Math.imul(X, rt) | 0, u = u + Math.imul(z, nt) | 0, E = E + Math.imul(z, rt) | 0;
      var mi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (mi >>> 26) | 0, mi &= 67108863, p = Math.imul(_e, je), u = Math.imul(_e, qe), u = u + Math.imul(Le, je) | 0, E = Math.imul(Le, qe), p = p + Math.imul(Ne, $e) | 0, u = u + Math.imul(Ne, We) | 0, u = u + Math.imul(ye, $e) | 0, E = E + Math.imul(ye, We) | 0, p = p + Math.imul(he, ze) | 0, u = u + Math.imul(he, Ke) | 0, u = u + Math.imul(ge, ze) | 0, E = E + Math.imul(ge, Ke) | 0, p = p + Math.imul(fe, et) | 0, u = u + Math.imul(fe, tt) | 0, u = u + Math.imul(oe, et) | 0, E = E + Math.imul(oe, tt) | 0, p = p + Math.imul(re, nt) | 0, u = u + Math.imul(re, rt) | 0, u = u + Math.imul(se, nt) | 0, E = E + Math.imul(se, rt) | 0, p = p + Math.imul(X, st) | 0, u = u + Math.imul(X, it) | 0, u = u + Math.imul(z, st) | 0, E = E + Math.imul(z, it) | 0;
      var Ei = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, p = Math.imul(Ue, je), u = Math.imul(Ue, qe), u = u + Math.imul(Ge, je) | 0, E = Math.imul(Ge, qe), p = p + Math.imul(_e, $e) | 0, u = u + Math.imul(_e, We) | 0, u = u + Math.imul(Le, $e) | 0, E = E + Math.imul(Le, We) | 0, p = p + Math.imul(Ne, ze) | 0, u = u + Math.imul(Ne, Ke) | 0, u = u + Math.imul(ye, ze) | 0, E = E + Math.imul(ye, Ke) | 0, p = p + Math.imul(he, et) | 0, u = u + Math.imul(he, tt) | 0, u = u + Math.imul(ge, et) | 0, E = E + Math.imul(ge, tt) | 0, p = p + Math.imul(fe, nt) | 0, u = u + Math.imul(fe, rt) | 0, u = u + Math.imul(oe, nt) | 0, E = E + Math.imul(oe, rt) | 0, p = p + Math.imul(re, st) | 0, u = u + Math.imul(re, it) | 0, u = u + Math.imul(se, st) | 0, E = E + Math.imul(se, it) | 0, p = p + Math.imul(X, ot) | 0, u = u + Math.imul(X, at) | 0, u = u + Math.imul(z, ot) | 0, E = E + Math.imul(z, at) | 0;
      var wi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (wi >>> 26) | 0, wi &= 67108863, p = Math.imul(He, je), u = Math.imul(He, qe), u = u + Math.imul(Je, je) | 0, E = Math.imul(Je, qe), p = p + Math.imul(Ue, $e) | 0, u = u + Math.imul(Ue, We) | 0, u = u + Math.imul(Ge, $e) | 0, E = E + Math.imul(Ge, We) | 0, p = p + Math.imul(_e, ze) | 0, u = u + Math.imul(_e, Ke) | 0, u = u + Math.imul(Le, ze) | 0, E = E + Math.imul(Le, Ke) | 0, p = p + Math.imul(Ne, et) | 0, u = u + Math.imul(Ne, tt) | 0, u = u + Math.imul(ye, et) | 0, E = E + Math.imul(ye, tt) | 0, p = p + Math.imul(he, nt) | 0, u = u + Math.imul(he, rt) | 0, u = u + Math.imul(ge, nt) | 0, E = E + Math.imul(ge, rt) | 0, p = p + Math.imul(fe, st) | 0, u = u + Math.imul(fe, it) | 0, u = u + Math.imul(oe, st) | 0, E = E + Math.imul(oe, it) | 0, p = p + Math.imul(re, ot) | 0, u = u + Math.imul(re, at) | 0, u = u + Math.imul(se, ot) | 0, E = E + Math.imul(se, at) | 0, p = p + Math.imul(X, ct) | 0, u = u + Math.imul(X, At) | 0, u = u + Math.imul(z, ct) | 0, E = E + Math.imul(z, At) | 0;
      var Ii = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, p = Math.imul(Ze, je), u = Math.imul(Ze, qe), u = u + Math.imul(Ye, je) | 0, E = Math.imul(Ye, qe), p = p + Math.imul(He, $e) | 0, u = u + Math.imul(He, We) | 0, u = u + Math.imul(Je, $e) | 0, E = E + Math.imul(Je, We) | 0, p = p + Math.imul(Ue, ze) | 0, u = u + Math.imul(Ue, Ke) | 0, u = u + Math.imul(Ge, ze) | 0, E = E + Math.imul(Ge, Ke) | 0, p = p + Math.imul(_e, et) | 0, u = u + Math.imul(_e, tt) | 0, u = u + Math.imul(Le, et) | 0, E = E + Math.imul(Le, tt) | 0, p = p + Math.imul(Ne, nt) | 0, u = u + Math.imul(Ne, rt) | 0, u = u + Math.imul(ye, nt) | 0, E = E + Math.imul(ye, rt) | 0, p = p + Math.imul(he, st) | 0, u = u + Math.imul(he, it) | 0, u = u + Math.imul(ge, st) | 0, E = E + Math.imul(ge, it) | 0, p = p + Math.imul(fe, ot) | 0, u = u + Math.imul(fe, at) | 0, u = u + Math.imul(oe, ot) | 0, E = E + Math.imul(oe, at) | 0, p = p + Math.imul(re, ct) | 0, u = u + Math.imul(re, At) | 0, u = u + Math.imul(se, ct) | 0, E = E + Math.imul(se, At) | 0, p = p + Math.imul(X, ut) | 0, u = u + Math.imul(X, dt) | 0, u = u + Math.imul(z, ut) | 0, E = E + Math.imul(z, dt) | 0;
      var yi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (yi >>> 26) | 0, yi &= 67108863, p = Math.imul(Xe, je), u = Math.imul(Xe, qe), u = u + Math.imul(Ve, je) | 0, E = Math.imul(Ve, qe), p = p + Math.imul(Ze, $e) | 0, u = u + Math.imul(Ze, We) | 0, u = u + Math.imul(Ye, $e) | 0, E = E + Math.imul(Ye, We) | 0, p = p + Math.imul(He, ze) | 0, u = u + Math.imul(He, Ke) | 0, u = u + Math.imul(Je, ze) | 0, E = E + Math.imul(Je, Ke) | 0, p = p + Math.imul(Ue, et) | 0, u = u + Math.imul(Ue, tt) | 0, u = u + Math.imul(Ge, et) | 0, E = E + Math.imul(Ge, tt) | 0, p = p + Math.imul(_e, nt) | 0, u = u + Math.imul(_e, rt) | 0, u = u + Math.imul(Le, nt) | 0, E = E + Math.imul(Le, rt) | 0, p = p + Math.imul(Ne, st) | 0, u = u + Math.imul(Ne, it) | 0, u = u + Math.imul(ye, st) | 0, E = E + Math.imul(ye, it) | 0, p = p + Math.imul(he, ot) | 0, u = u + Math.imul(he, at) | 0, u = u + Math.imul(ge, ot) | 0, E = E + Math.imul(ge, at) | 0, p = p + Math.imul(fe, ct) | 0, u = u + Math.imul(fe, At) | 0, u = u + Math.imul(oe, ct) | 0, E = E + Math.imul(oe, At) | 0, p = p + Math.imul(re, ut) | 0, u = u + Math.imul(re, dt) | 0, u = u + Math.imul(se, ut) | 0, E = E + Math.imul(se, dt) | 0, p = p + Math.imul(X, ht) | 0, u = u + Math.imul(X, lt) | 0, u = u + Math.imul(z, ht) | 0, E = E + Math.imul(z, lt) | 0;
      var Bi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, p = Math.imul(Xe, $e), u = Math.imul(Xe, We), u = u + Math.imul(Ve, $e) | 0, E = Math.imul(Ve, We), p = p + Math.imul(Ze, ze) | 0, u = u + Math.imul(Ze, Ke) | 0, u = u + Math.imul(Ye, ze) | 0, E = E + Math.imul(Ye, Ke) | 0, p = p + Math.imul(He, et) | 0, u = u + Math.imul(He, tt) | 0, u = u + Math.imul(Je, et) | 0, E = E + Math.imul(Je, tt) | 0, p = p + Math.imul(Ue, nt) | 0, u = u + Math.imul(Ue, rt) | 0, u = u + Math.imul(Ge, nt) | 0, E = E + Math.imul(Ge, rt) | 0, p = p + Math.imul(_e, st) | 0, u = u + Math.imul(_e, it) | 0, u = u + Math.imul(Le, st) | 0, E = E + Math.imul(Le, it) | 0, p = p + Math.imul(Ne, ot) | 0, u = u + Math.imul(Ne, at) | 0, u = u + Math.imul(ye, ot) | 0, E = E + Math.imul(ye, at) | 0, p = p + Math.imul(he, ct) | 0, u = u + Math.imul(he, At) | 0, u = u + Math.imul(ge, ct) | 0, E = E + Math.imul(ge, At) | 0, p = p + Math.imul(fe, ut) | 0, u = u + Math.imul(fe, dt) | 0, u = u + Math.imul(oe, ut) | 0, E = E + Math.imul(oe, dt) | 0, p = p + Math.imul(re, ht) | 0, u = u + Math.imul(re, lt) | 0, u = u + Math.imul(se, ht) | 0, E = E + Math.imul(se, lt) | 0;
      var Ci = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, p = Math.imul(Xe, ze), u = Math.imul(Xe, Ke), u = u + Math.imul(Ve, ze) | 0, E = Math.imul(Ve, Ke), p = p + Math.imul(Ze, et) | 0, u = u + Math.imul(Ze, tt) | 0, u = u + Math.imul(Ye, et) | 0, E = E + Math.imul(Ye, tt) | 0, p = p + Math.imul(He, nt) | 0, u = u + Math.imul(He, rt) | 0, u = u + Math.imul(Je, nt) | 0, E = E + Math.imul(Je, rt) | 0, p = p + Math.imul(Ue, st) | 0, u = u + Math.imul(Ue, it) | 0, u = u + Math.imul(Ge, st) | 0, E = E + Math.imul(Ge, it) | 0, p = p + Math.imul(_e, ot) | 0, u = u + Math.imul(_e, at) | 0, u = u + Math.imul(Le, ot) | 0, E = E + Math.imul(Le, at) | 0, p = p + Math.imul(Ne, ct) | 0, u = u + Math.imul(Ne, At) | 0, u = u + Math.imul(ye, ct) | 0, E = E + Math.imul(ye, At) | 0, p = p + Math.imul(he, ut) | 0, u = u + Math.imul(he, dt) | 0, u = u + Math.imul(ge, ut) | 0, E = E + Math.imul(ge, dt) | 0, p = p + Math.imul(fe, ht) | 0, u = u + Math.imul(fe, lt) | 0, u = u + Math.imul(oe, ht) | 0, E = E + Math.imul(oe, lt) | 0;
      var bi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, p = Math.imul(Xe, et), u = Math.imul(Xe, tt), u = u + Math.imul(Ve, et) | 0, E = Math.imul(Ve, tt), p = p + Math.imul(Ze, nt) | 0, u = u + Math.imul(Ze, rt) | 0, u = u + Math.imul(Ye, nt) | 0, E = E + Math.imul(Ye, rt) | 0, p = p + Math.imul(He, st) | 0, u = u + Math.imul(He, it) | 0, u = u + Math.imul(Je, st) | 0, E = E + Math.imul(Je, it) | 0, p = p + Math.imul(Ue, ot) | 0, u = u + Math.imul(Ue, at) | 0, u = u + Math.imul(Ge, ot) | 0, E = E + Math.imul(Ge, at) | 0, p = p + Math.imul(_e, ct) | 0, u = u + Math.imul(_e, At) | 0, u = u + Math.imul(Le, ct) | 0, E = E + Math.imul(Le, At) | 0, p = p + Math.imul(Ne, ut) | 0, u = u + Math.imul(Ne, dt) | 0, u = u + Math.imul(ye, ut) | 0, E = E + Math.imul(ye, dt) | 0, p = p + Math.imul(he, ht) | 0, u = u + Math.imul(he, lt) | 0, u = u + Math.imul(ge, ht) | 0, E = E + Math.imul(ge, lt) | 0;
      var Qi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, p = Math.imul(Xe, nt), u = Math.imul(Xe, rt), u = u + Math.imul(Ve, nt) | 0, E = Math.imul(Ve, rt), p = p + Math.imul(Ze, st) | 0, u = u + Math.imul(Ze, it) | 0, u = u + Math.imul(Ye, st) | 0, E = E + Math.imul(Ye, it) | 0, p = p + Math.imul(He, ot) | 0, u = u + Math.imul(He, at) | 0, u = u + Math.imul(Je, ot) | 0, E = E + Math.imul(Je, at) | 0, p = p + Math.imul(Ue, ct) | 0, u = u + Math.imul(Ue, At) | 0, u = u + Math.imul(Ge, ct) | 0, E = E + Math.imul(Ge, At) | 0, p = p + Math.imul(_e, ut) | 0, u = u + Math.imul(_e, dt) | 0, u = u + Math.imul(Le, ut) | 0, E = E + Math.imul(Le, dt) | 0, p = p + Math.imul(Ne, ht) | 0, u = u + Math.imul(Ne, lt) | 0, u = u + Math.imul(ye, ht) | 0, E = E + Math.imul(ye, lt) | 0;
      var xi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, p = Math.imul(Xe, st), u = Math.imul(Xe, it), u = u + Math.imul(Ve, st) | 0, E = Math.imul(Ve, it), p = p + Math.imul(Ze, ot) | 0, u = u + Math.imul(Ze, at) | 0, u = u + Math.imul(Ye, ot) | 0, E = E + Math.imul(Ye, at) | 0, p = p + Math.imul(He, ct) | 0, u = u + Math.imul(He, At) | 0, u = u + Math.imul(Je, ct) | 0, E = E + Math.imul(Je, At) | 0, p = p + Math.imul(Ue, ut) | 0, u = u + Math.imul(Ue, dt) | 0, u = u + Math.imul(Ge, ut) | 0, E = E + Math.imul(Ge, dt) | 0, p = p + Math.imul(_e, ht) | 0, u = u + Math.imul(_e, lt) | 0, u = u + Math.imul(Le, ht) | 0, E = E + Math.imul(Le, lt) | 0;
      var vi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (vi >>> 26) | 0, vi &= 67108863, p = Math.imul(Xe, ot), u = Math.imul(Xe, at), u = u + Math.imul(Ve, ot) | 0, E = Math.imul(Ve, at), p = p + Math.imul(Ze, ct) | 0, u = u + Math.imul(Ze, At) | 0, u = u + Math.imul(Ye, ct) | 0, E = E + Math.imul(Ye, At) | 0, p = p + Math.imul(He, ut) | 0, u = u + Math.imul(He, dt) | 0, u = u + Math.imul(Je, ut) | 0, E = E + Math.imul(Je, dt) | 0, p = p + Math.imul(Ue, ht) | 0, u = u + Math.imul(Ue, lt) | 0, u = u + Math.imul(Ge, ht) | 0, E = E + Math.imul(Ge, lt) | 0;
      var Fi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, p = Math.imul(Xe, ct), u = Math.imul(Xe, At), u = u + Math.imul(Ve, ct) | 0, E = Math.imul(Ve, At), p = p + Math.imul(Ze, ut) | 0, u = u + Math.imul(Ze, dt) | 0, u = u + Math.imul(Ye, ut) | 0, E = E + Math.imul(Ye, dt) | 0, p = p + Math.imul(He, ht) | 0, u = u + Math.imul(He, lt) | 0, u = u + Math.imul(Je, ht) | 0, E = E + Math.imul(Je, lt) | 0;
      var Di = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, p = Math.imul(Xe, ut), u = Math.imul(Xe, dt), u = u + Math.imul(Ve, ut) | 0, E = Math.imul(Ve, dt), p = p + Math.imul(Ze, ht) | 0, u = u + Math.imul(Ze, lt) | 0, u = u + Math.imul(Ye, ht) | 0, E = E + Math.imul(Ye, lt) | 0;
      var Ri = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, p = Math.imul(Xe, ht), u = Math.imul(Xe, lt), u = u + Math.imul(Ve, ht) | 0, E = Math.imul(Ve, lt);
      var Ni = (y + p | 0) + ((u & 8191) << 13) | 0;
      return y = (E + (u >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, w[0] = li, w[1] = fi, w[2] = gi, w[3] = pi, w[4] = mi, w[5] = Ei, w[6] = wi, w[7] = Ii, w[8] = yi, w[9] = Bi, w[10] = Ci, w[11] = bi, w[12] = Qi, w[13] = xi, w[14] = vi, w[15] = Fi, w[16] = Di, w[17] = Ri, w[18] = Ni, y !== 0 && (w[19] = y, h.length++), h;
    };
    Math.imul || (J = S);
    function T(B, a, A) {
      A.negative = a.negative ^ B.negative, A.length = B.length + a.length;
      for (var h = 0, m = 0, f = 0; f < A.length - 1; f++) {
        var w = m;
        m = 0;
        for (var y = h & 67108863, p = Math.min(f, a.length - 1), u = Math.max(0, f - B.length + 1); u <= p; u++) {
          var E = f - u, Z = B.words[E] | 0, X = a.words[u] | 0, z = Z * X, q = z & 67108863;
          w = w + (z / 67108864 | 0) | 0, q = q + y | 0, y = q & 67108863, w = w + (q >>> 26) | 0, m += w >>> 26, w &= 67108863;
        }
        A.words[f] = y, h = w, w = m;
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
        var f = (this.words[m] | 0) * a, w = (f & 67108863) + (h & 67108863);
        h >>= 26, h += f / 67108864 | 0, h += w >>> 26, this.words[m] = w & 67108863;
      }
      return h !== 0 && (this.words[m] = h, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var A = F(a);
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
        var w = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & m, p = (this.words[f] | 0) - y << A;
          this.words[f] = p | w, w = y >>> 26 - A;
        }
        w && (this.words[f] = w, this.length++);
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
      var f = a % 26, w = Math.min((a - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, p = h;
      if (m -= w, m = Math.max(0, m), p) {
        for (var u = 0; u < w; u++)
          p.words[u] = this.words[u];
        p.length = w;
      }
      if (w !== 0)
        if (this.length > w)
          for (this.length -= w, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + w];
        else
          this.words[0] = 0, this.length = 1;
      var E = 0;
      for (u = this.length - 1; u >= 0 && (E !== 0 || u >= m); u--) {
        var Z = this.words[u] | 0;
        this.words[u] = E << 26 - f | Z >>> f, E = Z & y;
      }
      return p && E !== 0 && (p.words[p.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var w, y = 0;
      for (f = 0; f < a.length; f++) {
        w = (this.words[f + h] | 0) + y;
        var p = (a.words[f] | 0) * A;
        w -= p & 67108863, y = (w >> 26) - (p / 67108864 | 0), this.words[f + h] = w & 67108863;
      }
      for (; f < this.length - h; f++)
        w = (this.words[f + h] | 0) + y, y = w >> 26, this.words[f + h] = w & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        w = -(this.words[f] | 0) + y, y = w >> 26, this.words[f] = w & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var h = this.length - a.length, m = this.clone(), f = a, w = f.words[f.length - 1] | 0, y = this._countBits(w);
      h = 26 - y, h !== 0 && (f = f.ushln(h), m.iushln(h), w = f.words[f.length - 1] | 0);
      var p = m.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = p + 1, u.words = new Array(u.length);
        for (var E = 0; E < u.length; E++)
          u.words[E] = 0;
      }
      var Z = m.clone()._ishlnsubmul(f, 1, p);
      Z.negative === 0 && (m = Z, u && (u.words[p] = 1));
      for (var X = p - 1; X >= 0; X--) {
        var z = (m.words[f.length + X] | 0) * 67108864 + (m.words[f.length + X - 1] | 0);
        for (z = Math.min(z / w | 0, 67108863), m._ishlnsubmul(f, z, X); m.negative !== 0; )
          z--, m.negative = 0, m._ishlnsubmul(f, 1, X), m.isZero() || (m.negative ^= 1);
        u && (u.words[X] = z);
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
      var m, f, w;
      return this.negative !== 0 && a.negative === 0 ? (w = this.neg().divmod(a, A), A !== "mod" && (m = w.div.neg()), A !== "div" && (f = w.mod.neg(), h && f.negative !== 0 && f.iadd(a)), {
        div: m,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (w = this.divmod(a.neg(), A), A !== "mod" && (m = w.div.neg()), {
        div: m,
        mod: w.mod
      }) : this.negative & a.negative ? (w = this.neg().divmod(a.neg(), A), A !== "div" && (f = w.mod.neg(), h && f.negative !== 0 && f.isub(a)), {
        div: w.div,
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
      var h = A.div.negative !== 0 ? A.mod.isub(a) : A.mod, m = a.ushrn(1), f = a.andln(1), w = h.cmp(m);
      return w < 0 || f === 1 && w === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
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
      for (var m = new i(1), f = new i(0), w = new i(0), y = new i(1), p = 0; A.isEven() && h.isEven(); )
        A.iushrn(1), h.iushrn(1), ++p;
      for (var u = h.clone(), E = A.clone(); !A.isZero(); ) {
        for (var Z = 0, X = 1; !(A.words[0] & X) && Z < 26; ++Z, X <<= 1)
          ;
        if (Z > 0)
          for (A.iushrn(Z); Z-- > 0; )
            (m.isOdd() || f.isOdd()) && (m.iadd(u), f.isub(E)), m.iushrn(1), f.iushrn(1);
        for (var z = 0, q = 1; !(h.words[0] & q) && z < 26; ++z, q <<= 1)
          ;
        if (z > 0)
          for (h.iushrn(z); z-- > 0; )
            (w.isOdd() || y.isOdd()) && (w.iadd(u), y.isub(E)), w.iushrn(1), y.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), m.isub(w), f.isub(y)) : (h.isub(A), w.isub(m), y.isub(f));
      }
      return {
        a: w,
        b: y,
        gcd: h.iushln(p)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, h = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), w = h.clone(); A.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var y = 0, p = 1; !(A.words[0] & p) && y < 26; ++y, p <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            m.isOdd() && m.iadd(w), m.iushrn(1);
        for (var u = 0, E = 1; !(h.words[0] & E) && u < 26; ++u, E <<= 1)
          ;
        if (u > 0)
          for (h.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(w), f.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), m.isub(f)) : (h.isub(A), f.isub(m));
      }
      var Z;
      return A.cmpn(1) === 0 ? Z = m : Z = f, Z.cmpn(0) < 0 && Z.iadd(a), Z;
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
          var w = A;
          A = h, h = w;
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
      for (var f = m, w = h; f !== 0 && w < this.length; w++) {
        var y = this.words[w] | 0;
        y += f, f = y >>> 26, y &= 67108863, this.words[w] = y;
      }
      return f !== 0 && (this.words[w] = f, this.length++), this;
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
    function O() {
      k.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(O, k), O.prototype.split = function(a, A) {
      for (var h = 4194303, m = Math.min(a.length, 9), f = 0; f < m; f++)
        A.words[f] = a.words[f];
      if (A.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var w = a.words[9];
      for (A.words[A.length++] = w & h, f = 10; f < a.length; f++) {
        var y = a.words[f] | 0;
        a.words[f - 10] = (y & h) << 4 | w >>> 22, w = y;
      }
      w >>>= 22, a.words[f - 10] = w, w === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, O.prototype.imulK = function(a) {
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
    function $() {
      k.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s($, k);
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
      if (M[a])
        return M[a];
      var A;
      if (a === "k256")
        A = new O();
      else if (a === "p224")
        A = new P();
      else if (a === "p192")
        A = new $();
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
      var w = new i(1).toRed(this), y = w.redNeg(), p = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, p).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var E = this.pow(u, m), Z = this.pow(a, m.addn(1).iushrn(1)), X = this.pow(a, m), z = f; X.cmp(w) !== 0; ) {
        for (var q = X, re = 0; q.cmp(w) !== 0; re++)
          q = q.redSqr();
        r(re < z);
        var se = this.pow(E, new i(1).iushln(z - re - 1));
        Z = Z.redMul(se), E = se.redSqr(), X = X.redMul(E), z = re;
      }
      return Z;
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
      var w = m[0], y = 0, p = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var E = A.words[f], Z = u - 1; Z >= 0; Z--) {
          var X = E >> Z & 1;
          if (w !== m[0] && (w = this.sqr(w)), X === 0 && y === 0) {
            p = 0;
            continue;
          }
          y <<= 1, y |= X, p++, !(p !== h && (f !== 0 || Z !== 0)) && (w = this.mul(w, m[y]), p = 0, y = 0);
        }
        u = 26;
      }
      return w;
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
      var h = a.imul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, ee.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var h = a.mul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, we);
})(Go);
var El = Go.exports;
const As = /* @__PURE__ */ pl(El);
var VA = 9, jA = 3, eo = 9;
function wl(e, t) {
  const { precision: n = VA, minPrecision: r = jA } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const I = d.match(/.*[1-9]{1}/), g = (I == null ? void 0 : I[0].length) || 0, C = Math.max(r, g);
    d = d.slice(0, C);
  }
  const l = d ? `.${d}` : "";
  return `${c}${l}`;
}
var Te = class extends As {
  constructor(t, n, r) {
    let s = t, i = n;
    Te.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
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
      throw new v(N.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        N.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new v(N.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = eo,
      precision: r = VA,
      minPrecision: s = jA
    } = t || {}, i = this.formatUnits(n), o = wl(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [l = "0"] = o.split(".");
        return `${l}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = eo) {
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
    const r = new As(this.toArray()).mulTo(t, n);
    return new Te(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new As(this.toArray()).egcd(t);
    return {
      a: new Te(n.toArray()),
      b: new Te(r.toArray()),
      gcd: new Te(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new As(this.toArray()).divmod(new Te(t), n, r);
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
Q.parseUnits = (e, t = eo) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      N.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(c);
};
function Tt(e) {
  return Q(e).toNumber();
}
function Ho(e, t) {
  return Q(e).toHex(t);
}
function Vt(e, t) {
  return Q(e).toBytes(t);
}
function Oy(e, t) {
  return Q(e).formatUnits(t);
}
function Ly(e, t) {
  return Q(e).format(t);
}
function Il(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function Ty(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
function to(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function yl(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function qA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Bl(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  to(e.outputLen), to(e.blockLen);
}
function Cl(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function bl(e, t) {
  qA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Ql = {
  number: to,
  bool: yl,
  bytes: qA,
  hash: Bl,
  exists: Cl,
  output: bl
}, ve = Ql;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xl = (e) => e instanceof Uint8Array, ms = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Es = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Wt = (e, t) => e << 32 - t | e >>> t, vl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!vl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Fl(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Ln(e) {
  if (typeof e == "string" && (e = Fl(e)), !xl(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let Jo = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Dl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function $A(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Dl(t)))
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function Zo(e) {
  const t = (r) => e().update(Ln(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Rl(e) {
  const t = (r, s) => e(s).update(Ln(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
function Nl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
let Sl = class extends Jo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Es(this.buffer);
  }
  update(t) {
    ve.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Ln(t);
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
    ve.exists(this), ve.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    Nl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Es(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, I = this.get();
    if (l > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
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
const _l = (e, t, n) => e & t ^ ~e & n, kl = (e, t, n) => e & t ^ e & n ^ t & n, Ml = new Uint32Array([
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
let WA = class extends Sl {
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
      const C = dn[g - 15], x = dn[g - 2], D = Wt(C, 7) ^ Wt(C, 18) ^ C >>> 3, b = Wt(x, 17) ^ Wt(x, 19) ^ x >>> 10;
      dn[g] = b + dn[g - 7] + D + dn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const C = Wt(c, 6) ^ Wt(c, 11) ^ Wt(c, 25), x = I + C + _l(c, d, l) + Ml[g] + dn[g] | 0, b = (Wt(r, 2) ^ Wt(r, 13) ^ Wt(r, 22)) + kl(r, s, i) | 0;
      I = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, l, I);
  }
  roundClean() {
    dn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class Ol extends WA {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const zA = Zo(() => new WA());
Zo(() => new Ol());
let KA = class extends Jo {
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
const eu = (e, t, n) => new KA(e, t).update(n).digest();
eu.create = (e, t) => new KA(e, t);
function Ll(e, t, n, r) {
  ve.hash(e);
  const s = $A({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (ve.number(i), ve.number(o), ve.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Ln(t), l = Ln(n), I = new Uint8Array(o), g = eu.create(e, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: g, PRFSalt: C };
}
function Tl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function tu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Ll(e, t, n, r);
  let l;
  const I = new Uint8Array(4), g = Es(I), C = new Uint8Array(c.outputLen);
  for (let x = 1, D = 0; D < i; x++, D += c.outputLen) {
    const b = o.subarray(D, D + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(I).digestInto(C), b.set(C.subarray(0, b.length));
    for (let F = 1; F < s; F++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Tl(c, d, o, l, C);
}
const Ee = (e, t) => e << t | e >>> 32 - t;
function Za(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], d = e[t++] ^ n[r++], l = e[t++] ^ n[r++], I = e[t++] ^ n[r++], g = e[t++] ^ n[r++], C = e[t++] ^ n[r++], x = e[t++] ^ n[r++], D = e[t++] ^ n[r++], b = e[t++] ^ n[r++], F = e[t++] ^ n[r++], S = e[t++] ^ n[r++], J = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], M = e[t++] ^ n[r++], k = o, O = c, P = d, $ = l, U = I, H = g, ee = C, B = x, a = D, A = b, h = F, m = S, f = J, w = T, y = j, p = M;
  for (let u = 0; u < 8; u += 2)
    U ^= Ee(k + f | 0, 7), a ^= Ee(U + k | 0, 9), f ^= Ee(a + U | 0, 13), k ^= Ee(f + a | 0, 18), A ^= Ee(H + O | 0, 7), w ^= Ee(A + H | 0, 9), O ^= Ee(w + A | 0, 13), H ^= Ee(O + w | 0, 18), y ^= Ee(h + ee | 0, 7), P ^= Ee(y + h | 0, 9), ee ^= Ee(P + y | 0, 13), h ^= Ee(ee + P | 0, 18), $ ^= Ee(p + m | 0, 7), B ^= Ee($ + p | 0, 9), m ^= Ee(B + $ | 0, 13), p ^= Ee(m + B | 0, 18), O ^= Ee(k + $ | 0, 7), P ^= Ee(O + k | 0, 9), $ ^= Ee(P + O | 0, 13), k ^= Ee($ + P | 0, 18), ee ^= Ee(H + U | 0, 7), B ^= Ee(ee + H | 0, 9), U ^= Ee(B + ee | 0, 13), H ^= Ee(U + B | 0, 18), m ^= Ee(h + A | 0, 7), a ^= Ee(m + h | 0, 9), A ^= Ee(a + m | 0, 13), h ^= Ee(A + a | 0, 18), f ^= Ee(p + y | 0, 7), w ^= Ee(f + p | 0, 9), y ^= Ee(w + f | 0, 13), p ^= Ee(y + w | 0, 18);
  s[i++] = o + k | 0, s[i++] = c + O | 0, s[i++] = d + P | 0, s[i++] = l + $ | 0, s[i++] = I + U | 0, s[i++] = g + H | 0, s[i++] = C + ee | 0, s[i++] = x + B | 0, s[i++] = D + a | 0, s[i++] = b + A | 0, s[i++] = F + h | 0, s[i++] = S + m | 0, s[i++] = J + f | 0, s[i++] = T + w | 0, s[i++] = j + y | 0, s[i++] = M + p | 0;
}
function Mi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    Za(n, o, e, t, n, i), c > 0 && (o += 16), Za(n, i, e, t += 16, n, o);
}
function Pl(e, t, n) {
  const r = $A({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: l, onProgress: I } = r;
  if (ve.number(s), ve.number(i), ve.number(o), ve.number(c), ve.number(d), ve.number(l), I !== void 0 && typeof I != "function")
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
  const D = tu(zA, e, t, { c: 1, dkLen: g * o }), b = ms(D), F = ms(new Uint8Array(g * s)), S = ms(new Uint8Array(g));
  let J = () => {
  };
  if (I) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let M = 0;
    J = () => {
      M++, I && (!(M % j) || M === T) && I(M / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: C, V: F, B32: b, B: D, tmp: S, blockMixCb: J, asyncTick: d };
}
function Ul(e, t, n, r, s) {
  const i = tu(zA, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function Gl(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: l, B: I, tmp: g, blockMixCb: C } = Pl(e, t, n);
  for (let x = 0; x < i; x++) {
    const D = c * x;
    for (let b = 0; b < c; b++)
      d[b] = l[D + b];
    for (let b = 0, F = 0; b < r - 1; b++)
      Mi(d, F, d, F += c, s), C();
    Mi(d, (r - 1) * c, l, D, s), C();
    for (let b = 0; b < r; b++) {
      const F = l[D + c - 16] % r;
      for (let S = 0; S < c; S++)
        g[S] = l[D + S] ^ d[F * c + S];
      Mi(g, 0, l, D, s), C();
    }
  }
  return Ul(e, o, I, d, g);
}
ve.bool;
const Ya = ve.bytes;
function Hl(e) {
  return (t) => (ve.bytes(t), e(t));
}
(() => {
  const e = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, t = typeof module < "u" && typeof module.require == "function" && module.require.bind(module);
  return {
    node: t && !e ? t("crypto") : void 0,
    web: e
  };
})();
function Jl(e, t, n, r, s, i, o) {
  return Ya(e), Ya(t), Gl(e, t, { N: n, r: s, p: r, dkLen: i, onProgress: o });
}
const us = BigInt(2 ** 32 - 1), no = BigInt(32);
function nu(e, t = !1) {
  return t ? { h: Number(e & us), l: Number(e >> no & us) } : { h: Number(e >> no & us) | 0, l: Number(e & us) | 0 };
}
function Zl(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = nu(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Yl = (e, t) => BigInt(e >>> 0) << no | BigInt(t >>> 0), Xl = (e, t, n) => e >>> n, Vl = (e, t, n) => e << 32 - n | t >>> n, jl = (e, t, n) => e >>> n | t << 32 - n, ql = (e, t, n) => e << 32 - n | t >>> n, $l = (e, t, n) => e << 64 - n | t >>> n - 32, Wl = (e, t, n) => e >>> n - 32 | t << 64 - n, zl = (e, t) => t, Kl = (e, t) => e, ef = (e, t, n) => e << n | t >>> 32 - n, tf = (e, t, n) => t << n | e >>> 32 - n, nf = (e, t, n) => t << n - 32 | e >>> 64 - n, rf = (e, t, n) => e << n - 32 | t >>> 64 - n;
function sf(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const of = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), af = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, cf = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Af = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, uf = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), df = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Sr = {
  fromBig: nu,
  split: Zl,
  toBig: Yl,
  shrSH: Xl,
  shrSL: Vl,
  rotrSH: jl,
  rotrSL: ql,
  rotrBH: $l,
  rotrBL: Wl,
  rotr32H: zl,
  rotr32L: Kl,
  rotlSH: ef,
  rotlSL: tf,
  rotlBH: nf,
  rotlBL: rf,
  add: sf,
  add3L: of,
  add3H: af,
  add4L: cf,
  add4H: Af,
  add5H: df,
  add5L: uf
}, [ru, su, iu] = [[], [], []], hf = BigInt(0), Br = BigInt(1), lf = BigInt(2), ff = BigInt(7), gf = BigInt(256), pf = BigInt(113);
for (let e = 0, t = Br, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], ru.push(2 * (5 * r + n)), su.push((e + 1) * (e + 2) / 2 % 64);
  let s = hf;
  for (let i = 0; i < 7; i++)
    t = (t << Br ^ (t >> ff) * pf) % gf, t & lf && (s ^= Br << (Br << BigInt(i)) - Br);
  iu.push(s);
}
const [mf, Ef] = Sr.split(iu, !0), Xa = (e, t, n) => n > 32 ? Sr.rotlBH(e, t, n) : Sr.rotlSH(e, t, n), Va = (e, t, n) => n > 32 ? Sr.rotlBL(e, t, n) : Sr.rotlSL(e, t, n);
function wf(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], I = n[d + 1], g = Xa(l, I, 1) ^ n[c], C = Va(l, I, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = su[o], d = Xa(s, i, c), l = Va(s, i, c), I = ru[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= mf[r], e[1] ^= Ef[r];
  }
  n.fill(0);
}
class Ks extends Jo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, ve.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ms(this.state);
  }
  keccak() {
    wf(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
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
    return t || (t = new Ks(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const vn = (e, t, n) => Zo(() => new Ks(t, e, n));
vn(6, 144, 224 / 8);
vn(6, 136, 256 / 8);
vn(6, 104, 384 / 8);
vn(6, 72, 512 / 8);
vn(1, 144, 224 / 8);
const ja = vn(1, 136, 256 / 8);
vn(1, 104, 384 / 8);
vn(1, 72, 512 / 8);
const ou = (e, t, n) => Rl((r = {}) => new Ks(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
ou(31, 168, 128 / 8);
ou(31, 136, 256 / 8);
const If = (() => {
  const e = Hl(ja);
  return e.create = ja.create, e;
})();
var yf = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return Jl(t, n, r, i, s, o);
}, Bf = (e) => If(e), qn = (e, t = "base64") => {
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
}, { crypto: ei, btoa: au } = globalThis;
if (!ei)
  throw new v(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!au)
  throw new v(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var ro = (e) => ei.getRandomValues(new Uint8Array(e)), ws = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return au(n);
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
}, cu = "AES-CTR", Yo = (e, t) => {
  const n = qn(String(e).normalize("NFKC"), "utf-8"), r = mr(n, t, 1e5, 32, "sha256");
  return Y(r);
}, Cf = async (e, t) => {
  const n = ro(16), r = ro(32), s = Yo(e, r), i = JSON.stringify(t), o = qn(i, "utf-8"), c = {
    name: cu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), l = await crypto.subtle.encrypt(c, d, o);
  return {
    data: ws(l),
    iv: ws(n),
    salt: ws(r)
  };
}, bf = async (e, t) => {
  const n = qn(t.iv), r = qn(t.salt), s = Yo(e, r), i = qn(t.data), o = {
    name: cu,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), l = new TextDecoder().decode(d);
  try {
    return JSON.parse(l);
  } catch {
    throw new v(N.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Qf = async (e, t, n) => {
  const r = ei.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, xf = async (e, t, n) => {
  const r = ei.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
  bufferFromString: qn,
  stringFromBuffer: ws,
  decrypt: bf,
  encrypt: Cf,
  keyFromPassword: Yo,
  randomBytes: ro,
  scrypt: yf,
  keccak256: Bf,
  decryptJsonWalletData: xf,
  encryptJsonWalletData: Qf
}, Ff = vf, {
  bufferFromString: yn,
  decrypt: Jy,
  encrypt: Zy,
  keyFromPassword: Yy,
  randomBytes: Cn,
  stringFromBuffer: Qr,
  scrypt: Au,
  keccak256: uu,
  decryptJsonWalletData: Df,
  encryptJsonWalletData: Rf
} = Ff, Nf = Object.defineProperty, Sf = (e, t, n) => t in e ? Nf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ti = (e, t, n) => (Sf(e, typeof t != "symbol" ? t + "" : t, n), n), _f = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, du = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, hu = (e, t, n) => (_f(e, t, "access private method"), n), ie = class {
  constructor(e, t, n) {
    R(this, "name");
    R(this, "type");
    R(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, lu = "enum Option", fu = "struct Vec", gu = "struct Bytes", pu = "struct String", mu = /str\[(?<length>[0-9]+)\]/, so = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Eu = /^struct (?<name>\w+)$/, wu = /^enum (?<name>\w+)$/, kf = /^\((?<items>.*)\)$/, Mf = /^generic (?<name>\w+)$/, ne = 8, qr = 32, _r = qr, Of = qr, Lf = qr, Tf = ne * 4, Pf = ne * 2, Xo = 2 ** 32 - 1, ni = ({ maxInputs: e }) => qr + // Tx ID
ne + // Tx size
// Asset ID/Balance coin input pairs
e * (_r + ne), Vo = ne + // Identifier
ne + // Gas limit
ne + // Script size
ne + // Script data size
ne + // Policies
ne + // Inputs size
ne + // Outputs size
ne + // Witnesses size
qr, Uf = ne + // Identifier
Tf + // Utxo Length
ne + // Output Index
Lf + // Owner
ne + // Amount
_r + // Asset id
Pf + // TxPointer
ne + // Witnesses index
ne + // Maturity
ne + // Predicate size
ne + // Predicate data size
ne, _ = class extends ie {
  constructor() {
    super("u64", "u64", ne);
  }
  encode(e) {
    let t;
    try {
      t = Vt(e, ne);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + ne);
    if (n = n.slice(0, ne), n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), t + ne];
  }
}, Gf = 3, Bt = Gf * ne, Hf = 2, qa = Hf * ne;
function kt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([l, I]) => {
      t[parseInt(l, 10) + n] = I;
    });
    const d = Y(o);
    return n += d.byteLength / ne, d;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function Iu(e, t, n) {
  if (!e.dynamicData)
    return de([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * ne, d = new _().encode(
      n + t + r
    );
    s.set(d, c);
    const l = o.dynamicData ? (
      // unpack child dynamic data
      Iu(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = de([s, l]), r += l.byteLength;
  }), s;
}
var yu = (e, t = ne) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Jf = (e) => {
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
}, Zf = (e) => e === fu || e === gu || e === pu;
function St(e, t, n = () => {
  throw new v(N.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var kr = (e) => e % ne === 0, Bu = (e) => ne - e % ne, Cu = (e) => {
  if (kr(e.length))
    return e;
  const t = new Uint8Array(ne - e.length % ne);
  return gA([e, t]);
}, It = class extends ie {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    R(this, "coder");
    R(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Types/values length mismatch.");
    return kt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Xo)
      throw new v(N.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, G = class extends ie {
  constructor() {
    super("b256", "b256", ne * 4);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b256 byte data size.");
    return [Ho(n, 32), t + 32];
  }
}, Yf = class extends ie {
  constructor() {
    super("b512", "struct B512", ne * 8);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid b512 byte data size.");
    return [Ho(n, this.encodedLength), t + this.encodedLength];
  }
}, Xf = class extends ie {
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
      throw new v(N.ENCODE_ERROR, "Invalid boolean value.");
    const r = Vt(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(N.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = Q(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(Q(1)))
      throw new v(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, Vf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), rr, wn, Hs, Qu, Js, xu, iA, bu = (iA = class extends ie {
  constructor(t, n) {
    const r = new _(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    gt(this, Hs);
    gt(this, Js);
    R(this, "name");
    R(this, "coders");
    gt(this, rr, void 0);
    gt(this, wn, void 0);
    this.name = t, this.coders = n, bt(this, rr, r), bt(this, wn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return Fn(this, Hs, Qu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(be(this, wn) - s.encodedLength);
    return kt([be(this, rr).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < be(this, wn))
      throw new v(N.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new _().decode(t, r);
    const i = Tt(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new v(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = be(this, wn) - c.encodedLength;
    return r += d, [s, r] = c.decode(t, r), Vf(this.coders) ? Fn(this, Js, xu).call(this, o, r) : [{ [o]: s }, r];
  }
}, rr = new WeakMap(), wn = new WeakMap(), Hs = new WeakSet(), Qu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(be(this, wn) - n.encodedLength);
  return de([be(this, rr).encode(s), i, r]);
}, Js = new WeakSet(), xu = function(t, n) {
  return [t, n];
}, iA), K = class extends ie {
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
      n = Vt(t);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Vt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Tt(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(N.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new v(N.DECODE_ERROR, "Invalid number byte data size.");
    return [Tt(r), n + 8];
  }
}, sr, oA, jf = (oA = class extends ie {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    R(this, "length");
    gt(this, sr, void 0);
    this.length = t, bt(this, sr, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = No(t), r = new Uint8Array(be(this, sr));
    return de([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new v(N.DECODE_ERROR, "Invalid string byte data size.");
    const s = $s(r), i = be(this, sr);
    return [s, n + this.length + i];
  }
}, sr = new WeakMap(), oA), vu = class extends bu {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength - 1)
      throw new v(N.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, ri = class extends ie {
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
      if (!(s instanceof vu) && i == null)
        throw new v(
          N.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return kr(o.length) ? o : Cu(o);
    });
    return kt([kt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), kr(r) || (r += Bu(r)), i[o] = d, i;
    }, {}), r];
  }
}, Fu = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    R(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(N.ENCODE_ERROR, "Types/values length mismatch.");
    return kt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return kr(s.length) ? s : Cu(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), kr(r) || (r += Bu(r)), o;
    }), r];
  }
}, Du = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Bt);
    R(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _().encode(Bt);
    return r.dynamicData = {
      0: kt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new _().encode(t.length)), n.push(new _().encode(t.length)), kt(n);
  }
  decode(t, n) {
    if (t.length < Bt || t.length > Xo)
      throw new v(N.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new _().decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Bt, Bt + i);
    if (o.length !== i)
      throw new v(N.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      yu(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + Bt
    ];
  }
}, io, Ru, vs = class extends ie {
  constructor() {
    super("struct", "struct Bytes", Bt), du(this, io);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new _().encode(Bt), r = hu(this, io, Ru).call(this, e);
    return n.dynamicData = {
      0: kt([r])
    }, t.push(n), t.push(new _().encode(r.byteLength)), t.push(new _().encode(e.length)), kt(t);
  }
  decode(e, t) {
    if (e.length < Bt)
      throw new v(N.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new _().decode(n, 0)[0]).toNumber(), s = e.slice(Bt, Bt + r);
    if (s.length !== r)
      throw new v(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Bt];
  }
};
io = /* @__PURE__ */ new WeakSet();
Ru = function(e) {
  const t = [Uint8Array.from(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), de(t);
};
ti(vs, "memorySize", 1);
var qf = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", qa);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(N.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new K("u8", { isSmallBytes: !0 }), r = new _().encode(qa);
    return r.dynamicData = {
      0: kt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new _().encode(e.length)), kt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new It(
      new K("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, oo, Nu, Su = class extends ie {
  constructor() {
    super("struct", "struct String", 1), du(this, oo);
  }
  encode(e) {
    const t = [], n = new _().encode(Bt), r = hu(this, oo, Nu).call(this, e);
    return n.dynamicData = {
      0: kt([r])
    }, t.push(n), t.push(new _().encode(r.byteLength)), t.push(new _().encode(e.length)), kt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new _().decode(n, 0)[0]).toNumber(), s = e.slice(Bt, Bt + r);
    if (s.length !== r)
      throw new v(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [$s(s), t + Bt];
  }
};
oo = /* @__PURE__ */ new WeakSet();
Nu = function(e) {
  const t = [No(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), de(t);
};
ti(Su, "memorySize", 1);
var $f = class extends ie {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(N.ENCODE_ERROR, "Invalid boolean value.");
    return Vt(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid boolean data size.");
    const n = Q(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(Q(1)))
      throw new v(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, _u = class extends ie {
  constructor() {
    super("struct", "struct Bytes", 1);
  }
  encode(e) {
    throw new v(N.ENCODE_ERROR, "Bytes encode unsupported in v1");
  }
  decode(e, t) {
    if (e.length < ne)
      throw new v(N.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = s * this.encodedLength, o = e.slice(n, n + i);
    if (o.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [o, t + i];
  }
};
ti(_u, "memorySize", 1);
var Wf = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Zs, Yr, Ys, ku, aA, zf = (aA = class extends ie {
  constructor(t, n) {
    const r = new _(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    gt(this, Ys);
    R(this, "name");
    R(this, "coders");
    gt(this, Zs, void 0);
    gt(this, Yr, void 0);
    this.name = t, this.coders = n, bt(this, Zs, r), bt(this, Yr, s);
  }
  encode(t) {
    throw new v(N.ENCODE_ERROR, "Enum encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < be(this, Yr))
      throw new v(N.DECODE_ERROR, "Invalid enum data size.");
    const r = new _().decode(t, n)[0], s = Tt(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + ne, [d, l] = o.decode(t, c);
    return Wf(this.coders) ? Fn(this, Ys, ku).call(this, i, l) : [{ [i]: d }, l];
  }
}, Zs = new WeakMap(), Yr = new WeakMap(), Ys = new WeakSet(), ku = function(t, n) {
  return [t, n];
}, aA), Kf = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new v(N.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, Mu = class extends ie {
  constructor(t) {
    const n = Kf(t);
    super("number", t, n);
    R(this, "length");
    R(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Vt(t);
    } catch {
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Vt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid number byte data size.");
    return [Tt(r), n + this.length];
  }
}, eg = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ne);
  }
  encode(e) {
    throw new v(N.ENCODE_ERROR, "Raw slice encode unsupported in v1");
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new It(new Mu("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, Ou = class extends ie {
  constructor() {
    super("struct", "struct String", ne);
  }
  encode(e) {
    throw new v(N.ENCODE_ERROR, "StdString encode unsupported in v1");
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [$s(i), n + s];
  }
};
ti(Ou, "memorySize", 1);
var tg = class extends ie {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(N.ENCODE_ERROR, "Value length mismatch during encode.");
    return No(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid string byte data size.");
    return [$s(n), t + this.encodedLength];
  }
}, ng = class extends ie {
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
    throw new v(N.ENCODE_ERROR, "Struct encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, rg = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    R(this, "coders");
    this.coders = t;
  }
  encode(t) {
    throw this.coders.length !== t.length ? new v(N.ENCODE_ERROR, "Types/values length mismatch.") : new v(N.ENCODE_ERROR, "Tuple encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, sg = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ne);
    R(this, "coder");
    this.coder = t;
  }
  encode(t) {
    throw new v(N.ENCODE_ERROR, "Vec encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Xo)
      throw new v(N.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ne, s = t.slice(n, r), o = Q(new _().decode(s, 0)[0]).toNumber() * this.coder.encodedLength, c = t.slice(r, r + o);
    if (c.length !== o)
      throw new v(N.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      yu(c, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, mn = class {
  constructor(e, t) {
    R(this, "abi");
    R(this, "name");
    R(this, "type");
    R(this, "originalTypeArguments");
    R(this, "components");
    this.abi = e;
    const n = St(
      e.types,
      (r) => r.typeId === t.type,
      () => {
        throw new v(
          N.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: t,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = t.name, this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = mn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? mn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new mn(e, o));
    const s = r.reduce(
      (o, c, d) => {
        var I;
        const l = { ...o };
        return l[c] = structuredClone(
          (I = t.typeArguments) == null ? void 0 : I[d]
        ), l;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new mn(e, o));
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
      const s = St(e.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = St(e.types, (o) => o.typeId === s.type);
      if (Mf.test(i.type)) {
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
    return Eu.test(this.type) ? "s" : so.test(this.type) ? "a" : wu.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = mu.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = so.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new mn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
}, Nt = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new mn(e, t);
    return Nt.getCoderImpl(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
  static getCoderImpl(e, t = {
    isSmallBytes: !1
  }) {
    var l, I, g, C, x, D;
    const { version: n } = t;
    switch (e.type) {
      case "u8":
      case "u16":
      case "u32":
        return n ? new Mu(e.type) : new K(e.type, t);
      case "u64":
      case "raw untyped ptr":
        return new _();
      case "raw untyped slice":
        return n ? new eg() : new qf();
      case "bool":
        return n ? new $f() : new Xf(t);
      case "b256":
        return new G();
      case "struct B512":
        return new Yf();
      case gu:
        return n ? new _u() : new vs();
      case pu:
        return n ? new Ou() : new Su();
    }
    const r = (l = mu.exec(e.type)) == null ? void 0 : l.groups;
    if (r) {
      const b = parseInt(r.length, 10);
      return n ? new tg(b) : new jf(b);
    }
    const s = e.components, i = (I = so.exec(e.type)) == null ? void 0 : I.groups;
    if (i) {
      const b = parseInt(i.length, 10), F = s[0];
      if (!F)
        throw new v(
          N.INVALID_COMPONENT,
          "The provided Array type is missing an item of 'component'."
        );
      const S = Nt.getCoderImpl(F, { version: n, isSmallBytes: !0 });
      return new It(S, b);
    }
    if (e.type === fu) {
      const b = (g = St(s, (J) => J.name === "buf").originalTypeArguments) == null ? void 0 : g[0];
      if (!b)
        throw new v(
          N.INVALID_COMPONENT,
          "The provided Vec type is missing the 'type argument'."
        );
      const F = new mn(e.abi, b), S = Nt.getCoderImpl(F, { version: n, isSmallBytes: !0 });
      return n ? new sg(S) : new Du(S);
    }
    const o = (C = Eu.exec(e.type)) == null ? void 0 : C.groups;
    if (o) {
      const b = Nt.getCoders(s, { version: n, isRightPadded: !0 });
      return n ? new ng(o.name, b) : new ri(o.name, b);
    }
    const c = (x = wu.exec(e.type)) == null ? void 0 : x.groups;
    if (c) {
      const b = Nt.getCoders(s, { version: n });
      return e.type === lu ? new vu(c.name, b) : n ? new zf(c.name, b) : new bu(c.name, b);
    }
    if ((D = kf.exec(e.type)) == null ? void 0 : D.groups) {
      const b = s.map(
        (F) => Nt.getCoderImpl(F, { version: n, isRightPadded: !0 })
      );
      return n ? new rg(b) : new Fu(b);
    }
    throw e.type === "str" ? new v(
      N.INVALID_DATA,
      "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
    ) : new v(
      N.CODER_NOT_FOUND,
      `Coder not found: ${JSON.stringify(e)}.`
    );
  }
  static getCoders(e, t) {
    return e.reduce((n, r) => {
      const s = n;
      return s[r.name] = Nt.getCoderImpl(r, t), s;
    }, {});
  }
}, Xs, Lu, Vs, Tu, js, Pu, cA, Is = (cA = class {
  constructor(e, t) {
    gt(this, Xs);
    gt(this, Vs);
    gt(this, js);
    R(this, "signature");
    R(this, "selector");
    R(this, "name");
    R(this, "jsonFn");
    R(this, "attributes");
    R(this, "isInputDataPointer");
    R(this, "outputMetadata");
    R(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = St(this.jsonAbi.functions, (n) => n.name === t), this.name = t, this.signature = Is.getSignature(this.jsonAbi, this.jsonFn), this.selector = Is.getFunctionSelector(this.signature), this.isInputDataPointer = Fn(this, Xs, Lu).call(this), this.outputMetadata = {
      isHeapType: Fn(this, Vs, Tu).call(this),
      encodedLength: Fn(this, js, Pu).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new mn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Me(yn(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    Is.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = this.jsonFn.inputs.filter(
      (c) => St(this.jsonAbi.types, (d) => d.typeId === c.type).type !== "()"
    );
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (c) => Nt.getCoder(this.jsonAbi, c, {
        isRightPadded: r.length > 1
      })
    ), o = new Fu(s).encode(n);
    return Iu(o, t, o.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => St(n.types, (c) => c.typeId === o.type)), s = r.filter(
      (o) => o.type === lu || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(N.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = Y(e), n = this.jsonFn.inputs.filter(
      (s) => St(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
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
        const o = Nt.getCoder(this.jsonAbi, i), [c, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (St(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    ).type === "()")
      return [void 0, 0];
    const n = Y(e);
    return Nt.getCoder(this.jsonAbi, this.jsonFn.output).decode(n, 0);
  }
}, Xs = new WeakSet(), Lu = function() {
  var t;
  const e = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Jf(((t = e[0]) == null ? void 0 : t.type) || "");
}, Vs = new WeakSet(), Tu = function() {
  const e = St(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);
  return Zf((e == null ? void 0 : e.type) || "");
}, js = new WeakSet(), Pu = function() {
  try {
    const e = Nt.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof Du ? e.coder.encodedLength : e instanceof vs ? vs.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, cA), bn = class {
  constructor(e) {
    R(this, "functions");
    R(this, "configurables");
    /*
      TODO: Refactor so that there's no need for externalLoggedTypes
    
      This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method.
      This is used to decode logs from contracts other than the main contract
      we're interacting with.
      */
    R(this, "externalLoggedTypes");
    R(this, "jsonAbi");
    this.jsonAbi = e, this.externalLoggedTypes = {}, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new Is(this.jsonAbi, t.name)])
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
      N.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    const n = typeof e == "string" ? this.getFunction(e) : e;
    if (!n)
      throw new v(N.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    const r = typeof e == "string" ? this.getFunction(e) : e;
    if (!r)
      throw new v(N.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t, n) {
    if (this.externalLoggedTypes[n])
      return this.externalLoggedTypes[n].decodeLog(e, t, n);
    const { loggedType: s } = St(this.jsonAbi.loggedTypes, (i) => i.logId === t);
    return Nt.decode(this.jsonAbi, s, Y(e), 0, {
      version: this.jsonAbi.encoding
    });
  }
  updateExternalLoggedTypes(e, t) {
    this.externalLoggedTypes[e] = t;
  }
  encodeConfigurable(e, t) {
    const n = St(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new v(
          N.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return Nt.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return St(
      this.jsonAbi.types,
      (t) => t.typeId === e,
      () => {
        throw new v(
          N.TYPE_NOT_FOUND,
          `Type with typeId '${e}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, Xy = class {
}, ig = class {
}, Uu = class {
}, Gu = class {
}, og = class extends Gu {
}, ag = class extends Gu {
}, Vy = class {
}, In, AA, Ie = (AA = class extends ie {
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
    gt(this, In, void 0);
    this.length = t, bt(this, In, n);
  }
  encode(t) {
    const n = [], r = Y(t);
    return n.push(r), be(this, In) && n.push(new Uint8Array(be(this, In))), de(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [V(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return be(this, In) && ([r, s] = [null, s + be(this, In)]), [i, s];
  }
}, In = new WeakMap(), AA), ir = class extends ri {
  constructor() {
    super("TxPointer", {
      blockHeight: new K("u32"),
      txIndex: new K("u16")
    });
  }
}, Qe = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Qe || {}), $a = class extends ie {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new ir().encode(e.txPointer)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new K("u32").encode(e.maturity)), t.push(new _().encode(e.predicateGasUsed)), t.push(new K("u32").encode(e.predicateLength)), t.push(new K("u32").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new K("u8").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new _().decode(e, r);
    const c = n;
    [n, r] = new G().decode(e, r);
    const d = n;
    [n, r] = new ir().decode(e, r);
    const l = n;
    [n, r] = new K("u8").decode(e, r);
    const I = Number(n);
    [n, r] = new K("u32").decode(e, r);
    const g = n;
    [n, r] = new _().decode(e, r);
    const C = n;
    [n, r] = new K("u32").decode(e, r);
    const x = n;
    [n, r] = new K("u32").decode(e, r);
    const D = n;
    [n, r] = new Ie(x).decode(e, r);
    const b = n;
    return [n, r] = new Ie(D).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: d,
        txPointer: l,
        witnessIndex: I,
        maturity: g,
        predicateGasUsed: C,
        predicateLength: x,
        predicateDataLength: D,
        predicate: b,
        predicateData: n
      },
      r
    ];
  }
}, Fs = class extends ie {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new K("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new ir().encode(e.txPointer)), t.push(new G().encode(e.contractID)), de(t);
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
    [n, r] = new ir().decode(e, r);
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
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _().encode(e.amount)), t.push(Y(e.data || "0x")), Me(de(t));
  }
  static encodeData(e) {
    const t = Y(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = Mr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new _().encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new K("u8").encode(e.witnessIndex)), t.push(new _().encode(e.predicateGasUsed)), t.push(new K("u16").encode(n.length)), t.push(new K("u16").encode(e.predicateLength)), t.push(new K("u16").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), de(t);
  }
  static decodeData(e) {
    const t = Y(e), n = t.length, [r] = new Ie(n).decode(t, 0);
    return Y(r);
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
    [n, r] = new K("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new _().decode(e, r);
    const l = n;
    [n, r] = new K("u16").decode(e, r);
    const I = n;
    [n, r] = new K("u16").decode(e, r);
    const g = n;
    [n, r] = new K("u16").decode(e, r);
    const C = n;
    [n, r] = new Ie(g).decode(e, r);
    const x = n;
    [n, r] = new Ie(I).decode(e, r);
    const D = n;
    return [n, r] = new Ie(C).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: c,
        predicateGasUsed: l,
        dataLength: g,
        predicateLength: I,
        predicateDataLength: C,
        data: x,
        predicate: D,
        predicateData: n
      },
      r
    ];
  }
}, Ds = class extends ie {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new $a().encode(e));
        break;
      }
      case 1: {
        t.push(new Fs().encode(e));
        break;
      }
      case 2: {
        t.push(new Mr().encode(e));
        break;
      }
      default:
        throw new v(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new $a().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Fs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Mr().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Be || {}), Wa = class extends ie {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), de(t);
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
}, Rs = class extends ie {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new K("u8").encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), de(t);
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
}, za = class extends ie {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), de(t);
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
}, Ka = class extends ie {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), de(t);
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
}, ec = class extends ie {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.contractId)), t.push(new G().encode(e.stateRoot)), de(t);
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
}, Ns = class extends ie {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Wa().encode(e));
        break;
      }
      case 1: {
        t.push(new Rs().encode(e));
        break;
      }
      case 2: {
        t.push(new za().encode(e));
        break;
      }
      case 3: {
        t.push(new Ka().encode(e));
        break;
      }
      case 4: {
        t.push(new ec().encode(e));
        break;
      }
      default:
        throw new v(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Wa().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Rs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new za().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ka().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ec().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Yt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Yt || {}), cg = (e) => e.sort((t, n) => t.type - n.type);
function Ag(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new v(
        N.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var Ss = class extends ie {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Ag(e);
    const t = cg(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new _().encode(r));
          break;
        case 4:
          n.push(new K("u32").encode(r));
          break;
        default:
          throw new v(N.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), de(n);
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
      const [i, o] = new K("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new _().decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, ue = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ue || {}), tc = class extends ie {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _().encode(e.gas)), t.push(new _().encode(e.param1)), t.push(new _().encode(e.param2)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
    const I = n;
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
        param2: I,
        pc: g,
        is: n
      },
      r
    ];
  }
}, nc = class extends ie {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
}, rc = class extends ie {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.ptr)), t.push(new _().encode(e.len)), t.push(new G().encode(e.digest)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
}, sc = class extends ie {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.reason)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), t.push(new G().encode(e.contractId)), de(t);
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
}, ic = class extends ie {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
}, oc = class extends ie {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val0)), t.push(new _().encode(e.val1)), t.push(new _().encode(e.val2)), t.push(new _().encode(e.val3)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
}, ac = class extends ie {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new _().encode(e.val0)), t.push(new _().encode(e.val1)), t.push(new _().encode(e.ptr)), t.push(new _().encode(e.len)), t.push(new G().encode(e.digest)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
    const I = n;
    return [n, r] = new _().decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: d,
        digest: l,
        pc: I,
        is: n
      },
      r
    ];
  }
}, cc = class extends ie {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
}, Ac = class extends ie {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
}, uc = class extends ie {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _().encode(e.result)), t.push(new _().encode(e.gasUsed)), de(t);
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
}, _s = class extends ie {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _().encode(e.amount)), t.push(Y(e.data || "0x")), Me(de(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new K("u16").encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new Ie(e.data.length).encode(e.data)), de(t);
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
    [n, r] = new K("u16").decode(e, r);
    const d = n;
    [n, r] = new G().decode(e, r);
    const l = n;
    [n, r] = new Ie(d).decode(e, r);
    const I = Y(n), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: l,
      data: I
    };
    return g.messageId = _s.getMessageId(g), [g, r];
  }
}, Hu = (e, t) => {
  const n = Y(e), r = Y(t);
  return Me(de([n, r]));
}, Or = class extends ie {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return Hu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
    const d = n, l = Or.getAssetId(i, s);
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
}, ao = class extends ie {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return Hu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new _().encode(e.val)), t.push(new _().encode(e.pc)), t.push(new _().encode(e.is)), de(t);
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
    const d = n, l = Or.getAssetId(i, s);
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
}, jy = class extends ie {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new K("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new tc().encode(e));
        break;
      }
      case 1: {
        t.push(new nc().encode(e));
        break;
      }
      case 2: {
        t.push(new rc().encode(e));
        break;
      }
      case 3: {
        t.push(new sc().encode(e));
        break;
      }
      case 4: {
        t.push(new ic().encode(e));
        break;
      }
      case 5: {
        t.push(new oc().encode(e));
        break;
      }
      case 6: {
        t.push(new ac().encode(e));
        break;
      }
      case 7: {
        t.push(new cc().encode(e));
        break;
      }
      case 8: {
        t.push(new Ac().encode(e));
        break;
      }
      case 9: {
        t.push(new uc().encode(e));
        break;
      }
      case 10: {
        t.push(new _s().encode(e));
        break;
      }
      case 11: {
        t.push(new Or().encode(e));
        break;
      }
      case 12: {
        t.push(new ao().encode(e));
        break;
      }
      default:
        throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new tc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new nc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new rc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new sc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new ic().decode(e, r), [n, r];
      case 5:
        return [n, r] = new oc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new ac().decode(e, r), [n, r];
      case 7:
        return [n, r] = new cc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Ac().decode(e, r), [n, r];
      case 9:
        return [n, r] = new uc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new _s().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Or().decode(e, r), [n, r];
      case 12:
        return [n, r] = new ao().decode(e, r), [n, r];
      default:
        throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, dc = class extends ri {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, ks = class extends ie {
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
    return t.push(new K("u16").encode(e.dataLength)), t.push(new Ie(e.dataLength).encode(e.data)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u16").decode(e, r);
    const s = n;
    return [n, r] = new Ie(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, Ct = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(Ct || {}), hc = class extends ie {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _().encode(e.scriptGasLimit)), t.push(new K("u16").encode(e.scriptLength)), t.push(new K("u16").encode(e.scriptDataLength)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new Ie(e.scriptLength).encode(e.script)), t.push(new Ie(e.scriptDataLength).encode(e.scriptData)), t.push(new Ss().encode(e.policies)), t.push(new It(new Ds(), e.inputsCount).encode(e.inputs)), t.push(new It(new Ns(), e.outputsCount).encode(e.outputs)), t.push(new It(new ks(), e.witnessesCount).encode(e.witnesses)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new _().decode(e, r);
    const s = n;
    [n, r] = new K("u16").decode(e, r);
    const i = n;
    [n, r] = new K("u16").decode(e, r);
    const o = n;
    [n, r] = new K("u32").decode(e, r);
    const c = n;
    [n, r] = new K("u8").decode(e, r);
    const d = n;
    [n, r] = new K("u8").decode(e, r);
    const l = n;
    [n, r] = new K("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Ie(i).decode(e, r);
    const C = n;
    [n, r] = new Ie(o).decode(e, r);
    const x = n;
    [n, r] = new Ss().decode(e, r, c);
    const D = n;
    [n, r] = new It(new Ds(), d).decode(e, r);
    const b = n;
    [n, r] = new It(new Ns(), l).decode(e, r);
    const F = n;
    return [n, r] = new It(new ks(), I).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: c,
        inputsCount: d,
        outputsCount: l,
        witnessesCount: I,
        receiptsRoot: g,
        script: C,
        scriptData: x,
        policies: D,
        inputs: b,
        outputs: F,
        witnesses: n
      },
      r
    ];
  }
}, lc = class extends ie {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new K("u16").encode(e.bytecodeLength)), t.push(new K("u8").encode(e.bytecodeWitnessIndex)), t.push(new K("u32").encode(e.policyTypes)), t.push(new K("u16").encode(e.storageSlotsCount)), t.push(new K("u8").encode(e.inputsCount)), t.push(new K("u8").encode(e.outputsCount)), t.push(new K("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new Ss().encode(e.policies)), t.push(
      new It(new dc(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new It(new Ds(), e.inputsCount).encode(e.inputs)), t.push(new It(new Ns(), e.outputsCount).encode(e.outputs)), t.push(new It(new ks(), e.witnessesCount).encode(e.witnesses)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u16").decode(e, r);
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
    const l = n;
    [n, r] = new K("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Ss().decode(e, r, o);
    const C = n;
    [n, r] = new It(new dc(), c).decode(e, r);
    const x = n;
    [n, r] = new It(new Ds(), d).decode(e, r);
    const D = n;
    [n, r] = new It(new Ns(), l).decode(e, r);
    const b = n;
    return [n, r] = new It(new ks(), I).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: c,
        inputsCount: d,
        outputsCount: l,
        witnessesCount: I,
        salt: g,
        policies: C,
        storageSlots: x,
        inputs: D,
        outputs: b,
        witnesses: n
      },
      r
    ];
  }
}, fc = class extends ie {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ir().encode(e.txPointer)), t.push(new Fs().encode(e.inputContract)), t.push(new Rs().encode(e.outputContract)), t.push(new _().encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ir().decode(e, r);
    const s = n;
    [n, r] = new Fs().decode(e, r);
    const i = n;
    [n, r] = new Rs().decode(e, r);
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
          new hc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new lc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new fc().encode(e));
        break;
      }
      default:
        throw new v(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new K("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new hc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new lc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new fc().decode(e, r), [n, r];
      default:
        throw new v(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, qy = class extends ri {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new K("u8")
    });
  }
}, $y = 16 * 1024, Wy = 16, zy = 1024 * 1024 * 1024, Ky = 1024 * 1024 * 1024, eB = 255, tB = 1024 * 1024, nB = 1024 * 1024, ug = "0xffffffffffff0000", Ju = "0xffffffffffff0001", dg = "0xffffffffffff0002", hg = "0xffffffffffff0003", lg = "0xffffffffffff0004", fg = "0x0", ke = "0x0000000000000000000000000000000000000000000000000000000000000000", wt = ke, rB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
var or = Lr.bech32m = Lr.bech32 = void 0;
const Ms = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Zu = {};
for (let e = 0; e < Ms.length; e++) {
  const t = Ms.charAt(e);
  Zu[t] = e;
}
function $n(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function gc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = $n(t) ^ r >> 5;
  }
  t = $n(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = $n(t) ^ r & 31;
  }
  return t;
}
function jo(e, t, n, r) {
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
function gg(e) {
  return jo(e, 8, 5, !0);
}
function pg(e) {
  const t = jo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function mg(e) {
  const t = jo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function Yu(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let l = gc(o);
    if (typeof l == "string")
      throw new Error(l);
    let I = o + "1";
    for (let g = 0; g < c.length; ++g) {
      const C = c[g];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      l = $n(l) ^ C, I += Ms.charAt(C);
    }
    for (let g = 0; g < 6; ++g)
      l = $n(l);
    l ^= t;
    for (let g = 0; g < 6; ++g) {
      const C = l >> (5 - g) * 5 & 31;
      I += Ms.charAt(C);
    }
    return I;
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
    const I = o.lastIndexOf("1");
    if (I === -1)
      return "No separator character for " + o;
    if (I === 0)
      return "Missing prefix for " + o;
    const g = o.slice(0, I), C = o.slice(I + 1);
    if (C.length < 6)
      return "Data too short";
    let x = gc(g);
    if (typeof x == "string")
      return x;
    const D = [];
    for (let b = 0; b < C.length; ++b) {
      const F = C.charAt(b), S = Zu[F];
      if (S === void 0)
        return "Unknown character " + F;
      x = $n(x) ^ S, !(b + 6 >= C.length) && D.push(S);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: g, words: D };
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
    toWords: gg,
    fromWordsUnsafe: pg,
    fromWords: mg
  };
}
Lr.bech32 = Yu("bech32");
or = Lr.bech32m = Yu("bech32m");
var Os = "fuel";
function qo(e) {
  return or.decode(e);
}
function ys(e) {
  return or.encode(
    Os,
    or.toWords(Y(V(e)))
  );
}
function Bs(e) {
  return typeof e == "string" && e.indexOf(Os + 1) === 0 && qo(e).prefix === Os;
}
function co(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function pc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Ao(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function $o(e) {
  return new Uint8Array(or.fromWords(qo(e).words));
}
function mc(e) {
  if (!Bs(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return V($o(e));
}
function Eg(e) {
  const { words: t } = qo(e);
  return or.encode(Os, t);
}
var xr = (e) => e instanceof Uu ? e.address : e instanceof og ? e.id : e, wg = () => V(Cn(32)), Ig = (e) => {
  let t;
  try {
    if (!co(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = $o(ys(e)), t = V(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, yg = (e) => {
  if (!Ao(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, me = class extends ig {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    R(this, "bech32Address");
    if (this.bech32Address = Eg(t), !Bs(this.bech32Address))
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
    return mc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return $o(this.bech32Address);
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
    const t = mc(this.bech32Address);
    return {
      value: Ig(t)
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
    if (!pc(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = Me(V(Y(t)));
    return new me(ys(n));
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
    return new me(ys(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(wg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Bs(t) ? new me(t) : this.fromB256(t);
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
      return me.fromB256(t.toB256());
    if (pc(t))
      return me.fromPublicKey(t);
    if (Bs(t))
      return new me(t);
    if (co(t))
      return me.fromB256(t);
    if (Ao(t))
      return me.fromEvmAddress(t);
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
    const n = yg(t);
    return new me(ys(n));
  }
}, Oi = {}, uo = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof we < "u" && we, r = function() {
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
      function C(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function x(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function D(A) {
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
        }), D(A);
      }, b.prototype.values = function() {
        var A = [];
        return this.forEach(function(h) {
          A.push(h);
        }), D(A);
      }, b.prototype.entries = function() {
        var A = [];
        return this.forEach(function(h, m) {
          A.push([m, h]);
        }), D(A);
      }, d.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
      function F(A) {
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
      function M(A) {
        if (A.slice)
          return A.slice(0);
        var h = new Uint8Array(A.byteLength);
        return h.set(new Uint8Array(A)), h.buffer;
      }
      function k() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && l(A) ? (this._bodyArrayBuffer = M(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || g(A)) ? this._bodyArrayBuffer = M(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var A = F(this);
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
            var A = F(this);
            return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(J);
        }), this.text = function() {
          var A = F(this);
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
        var h = A.toUpperCase();
        return O.indexOf(h) > -1 ? h : A;
      }
      function $(A, h) {
        if (!(this instanceof $))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        h = h || {};
        var m = h.body;
        if (A instanceof $) {
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
            var w = /\?/;
            this.url += (w.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      $.prototype.clone = function() {
        return new $(this, { body: this._bodyInit });
      };
      function U(A) {
        var h = new FormData();
        return A.trim().split("&").forEach(function(m) {
          if (m) {
            var f = m.split("="), w = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            h.append(decodeURIComponent(w), decodeURIComponent(y));
          }
        }), h;
      }
      function H(A) {
        var h = new b(), m = A.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var w = f.split(":"), y = w.shift().trim();
          if (y) {
            var p = w.join(":").trim();
            h.append(y, p);
          }
        }), h;
      }
      k.call($.prototype);
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
          var w = new $(A, h);
          if (w.signal && w.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var y = new XMLHttpRequest();
          function p() {
            y.abort();
          }
          y.onload = function() {
            var E = {
              status: y.status,
              statusText: y.statusText,
              headers: H(y.getAllResponseHeaders() || "")
            };
            E.url = "responseURL" in y ? y.responseURL : E.headers.get("X-Request-URL");
            var Z = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              m(new ee(Z, E));
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
          function u(E) {
            try {
              return E === "" && c.location.href ? c.location.href : E;
            } catch {
              return E;
            }
          }
          y.open(w.method, u(w.url), !0), w.credentials === "include" ? y.withCredentials = !0 : w.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && w.headers.get("Content-Type") && w.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), h && typeof h.headers == "object" && !(h.headers instanceof b) ? Object.getOwnPropertyNames(h.headers).forEach(function(E) {
            y.setRequestHeader(E, x(h.headers[E]));
          }) : w.headers.forEach(function(E, Z) {
            y.setRequestHeader(Z, E);
          }), w.signal && (w.signal.addEventListener("abort", p), y.onreadystatechange = function() {
            y.readyState === 4 && w.signal.removeEventListener("abort", p);
          }), y.send(typeof w._bodyInit > "u" ? null : w._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = b, c.Request = $, c.Response = ee), o.Headers = b, o.Request = $, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(uo, uo.exports);
var Bg = uo.exports;
function Cg(e) {
  return typeof e == "object" && e !== null;
}
function bg(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Qg = /\r\n|[\n\r]/g;
function ho(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Qg)) {
    if (typeof s.index == "number" || bg(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function xg(e) {
  return Xu(
    e.source,
    ho(e.source, e.start)
  );
}
function Xu(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, d = t.column + c, l = `${e.name}:${o}:${d}
`, I = r.split(/\r\n|[\n\r]/g), g = I[s];
  if (g.length > 120) {
    const C = Math.floor(d / 80), x = d % 80, D = [];
    for (let b = 0; b < g.length; b += 80)
      D.push(g.slice(b, b + 80));
    return l + Ec([
      [`${o} |`, D[0]],
      ...D.slice(1, C + 1).map((b) => ["|", b]),
      ["|", "^".padStart(x)],
      ["|", D[C + 1]]
    ]);
  }
  return l + Ec([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, I[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, I[s + 1]]
  ]);
}
function Ec(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function vg(e) {
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
class Wo extends Error {
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
    const { nodes: o, source: c, positions: d, path: l, originalError: I, extensions: g } = vg(n);
    super(t), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = I ?? void 0, this.nodes = wc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = wc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((D) => D.loc).filter((D) => D != null)
    );
    this.source = c ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (C == null ? void 0 : C.map((D) => D.start)), this.locations = d && c ? d.map((D) => ho(c, D)) : C == null ? void 0 : C.map((D) => ho(D.source, D.start));
    const x = Cg(
      I == null ? void 0 : I.extensions
    ) ? I == null ? void 0 : I.extensions : void 0;
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
    }), I != null && I.stack ? Object.defineProperty(this, "stack", {
      value: I.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Wo) : Object.defineProperty(this, "stack", {
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

` + xg(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Xu(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function wc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function pt(e, t, n) {
  return new Wo(`Syntax Error: ${n}`, {
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
class Vu {
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
const ju = {
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
}, Dg = new Set(Object.keys(ju));
function Ic(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Dg.has(t);
}
var Yn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Yn || (Yn = {}));
var lo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(lo || (lo = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function fo(e) {
  return e === 9 || e === 32;
}
function Tr(e) {
  return e >= 48 && e <= 57;
}
function qu(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function $u(e) {
  return qu(e) || e === 95;
}
function Rg(e) {
  return qu(e) || Tr(e) || e === 95;
}
function Ng(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], d = Sg(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Sg(e) {
  let t = 0;
  for (; t < e.length && fo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function _g(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || fo(x.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, d = e.endsWith("\\"), l = c || d, I = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || l || i || o);
  let g = "";
  const C = s && fo(e.charCodeAt(0));
  return (I && !C || i) && (g += `
`), g += n, (I || l) && (g += `
`), '"""' + g + '"""';
}
var L;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(L || (L = {}));
class kg {
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
    const n = new Vu(L.SOF, 0, 0, 0, 0);
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
          const n = Og(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === L.COMMENT);
    return t;
  }
}
function Mg(e) {
  return e === L.BANG || e === L.DOLLAR || e === L.AMP || e === L.PAREN_L || e === L.PAREN_R || e === L.SPREAD || e === L.COLON || e === L.EQUALS || e === L.AT || e === L.BRACKET_L || e === L.BRACKET_R || e === L.BRACE_L || e === L.PIPE || e === L.BRACE_R;
}
function Er(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function si(e, t) {
  return Wu(e.charCodeAt(t)) && zu(e.charCodeAt(t + 1));
}
function Wu(e) {
  return e >= 55296 && e <= 56319;
}
function zu(e) {
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
function ft(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new Vu(t, n, r, i, o, s);
}
function Og(e, t) {
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
        return Lg(e, s);
      case 33:
        return ft(e, L.BANG, s, s + 1);
      case 36:
        return ft(e, L.DOLLAR, s, s + 1);
      case 38:
        return ft(e, L.AMP, s, s + 1);
      case 40:
        return ft(e, L.PAREN_L, s, s + 1);
      case 41:
        return ft(e, L.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return ft(e, L.SPREAD, s, s + 3);
        break;
      case 58:
        return ft(e, L.COLON, s, s + 1);
      case 61:
        return ft(e, L.EQUALS, s, s + 1);
      case 64:
        return ft(e, L.AT, s, s + 1);
      case 91:
        return ft(e, L.BRACKET_L, s, s + 1);
      case 93:
        return ft(e, L.BRACKET_R, s, s + 1);
      case 123:
        return ft(e, L.BRACE_L, s, s + 1);
      case 124:
        return ft(e, L.PIPE, s, s + 1);
      case 125:
        return ft(e, L.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Jg(e, s) : Pg(e, s);
    }
    if (Tr(i) || i === 45)
      return Tg(e, s, i);
    if ($u(i))
      return Zg(e, s);
    throw pt(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Er(i) || si(n, s) ? `Unexpected character: ${Tn(e, s)}.` : `Invalid character: ${Tn(e, s)}.`
    );
  }
  return ft(e, L.EOF, r, r);
}
function Lg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Er(i))
      ++s;
    else if (si(n, s))
      s += 2;
    else
      break;
  }
  return ft(
    e,
    L.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function Tg(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Tr(i))
      throw pt(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Tn(
          e,
          s
        )}.`
      );
  } else
    s = Li(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = Li(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = Li(e, s, i), i = r.charCodeAt(s)), i === 46 || $u(i))
    throw pt(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Tn(
        e,
        s
      )}.`
    );
  return ft(
    e,
    o ? L.FLOAT : L.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function Li(e, t, n) {
  if (!Tr(n))
    throw pt(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Tn(
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
function Pg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ft(e, L.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Ug(e, s) : Gg(e, s) : Hg(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (Er(c))
      ++s;
    else if (si(n, s))
      s += 2;
    else
      throw pt(
        e.source,
        s,
        `Invalid character within String: ${Tn(
          e,
          s
        )}.`
      );
  }
  throw pt(e.source, s, "Unterminated string.");
}
function Ug(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Er(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | vr(i), r < 0)
      break;
  }
  throw pt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function Gg(e, t) {
  const n = e.source.body, r = yc(n, t + 2);
  if (Er(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Wu(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = yc(n, t + 8);
    if (zu(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw pt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function yc(e, t) {
  return vr(e.charCodeAt(t)) << 12 | vr(e.charCodeAt(t + 1)) << 8 | vr(e.charCodeAt(t + 2)) << 4 | vr(e.charCodeAt(t + 3));
}
function vr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Hg(e, t) {
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
  throw pt(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function Jg(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const l = n.charCodeAt(i);
    if (l === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const I = ft(
        e,
        L.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Ng(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, I;
    }
    if (l === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (l === 10 || l === 13) {
      c += n.slice(o, i), d.push(c), l === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (Er(l))
      ++i;
    else if (si(n, i))
      i += 2;
    else
      throw pt(
        e.source,
        i,
        `Invalid character within String: ${Tn(
          e,
          i
        )}.`
      );
  }
  throw pt(e.source, i, "Unterminated string.");
}
function Zg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (Rg(i))
      ++s;
    else
      break;
  }
  return ft(
    e,
    L.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Cs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Yg = 10, Ku = 2;
function e0(e) {
  return ii(e, []);
}
function ii(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Xg(e, t);
    default:
      return String(e);
  }
}
function Xg(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Vg(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : ii(r, n);
  } else if (Array.isArray(e))
    return qg(e, n);
  return jg(e, n);
}
function Vg(e) {
  return typeof e.toJSON == "function";
}
function jg(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > Ku ? "[" + $g(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + ii(i, t)
  ).join(", ") + " }";
}
function qg(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Ku)
    return "[Array]";
  const n = Math.min(Yg, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(ii(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function $g(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Wg = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class t0 {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Cs(!1, `Body must be a string. Received: ${e0(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Cs(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Cs(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function zg(e) {
  return Wg(e, t0);
}
function n0(e, t) {
  return new $r(e, t).parseDocument();
}
function Kg(e, t) {
  const n = new $r(e, t);
  n.expectToken(L.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(L.EOF), r;
}
function ep(e, t) {
  const n = new $r(e, t);
  n.expectToken(L.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(L.EOF), r;
}
function tp(e, t) {
  const n = new $r(e, t);
  n.expectToken(L.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(L.EOF), r;
}
class $r {
  constructor(t, n = {}) {
    const r = zg(t) ? t : new t0(t);
    this._lexer = new kg(r), this._options = n, this._tokenCounter = 0;
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
        throw pt(
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
        operation: Yn.QUERY,
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
            throw pt(
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
      throw pt(
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
    if (Object.prototype.hasOwnProperty.call(lo, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Fg(
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
    throw pt(
      this._lexer.source,
      n.start,
      `Expected ${r0(t)}, found ${ds(n)}.`
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
      throw pt(
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
    return pt(
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
      throw pt(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ds(e) {
  const t = e.value;
  return r0(e.kind) + (t != null ? ` "${t}"` : "");
}
function r0(e) {
  return Mg(e) ? `"${e}"` : e;
}
const np = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: $r,
  parse: n0,
  parseConstValue: ep,
  parseType: tp,
  parseValue: Kg
}, Symbol.toStringTag, { value: "Module" })), rp = /* @__PURE__ */ Uo(np);
function sp(e) {
  return `"${e.replace(ip, op)}"`;
}
const ip = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function op(e) {
  return ap[e.charCodeAt(0)];
}
const ap = [
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
], cp = Object.freeze({});
function Ap(e, t, n = ju) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ae))
    r.set(S, up(t, S));
  let s, i = Array.isArray(e), o = [e], c = -1, d = [], l = e, I, g;
  const C = [], x = [];
  do {
    c++;
    const S = c === o.length, J = S && d.length !== 0;
    if (S) {
      if (I = x.length === 0 ? void 0 : C[C.length - 1], l = g, g = x.pop(), J)
        if (i) {
          l = l.slice();
          let j = 0;
          for (const [M, k] of d) {
            const O = M - j;
            k === null ? (l.splice(O, 1), j++) : l[O] = k;
          }
        } else {
          l = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(l)
          );
          for (const [j, M] of d)
            l[j] = M;
        }
      c = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (I = i ? c : o[c], l = g[I], l == null)
        continue;
      C.push(I);
    }
    let T;
    if (!Array.isArray(l)) {
      var D, b;
      Ic(l) || Cs(!1, `Invalid AST Node: ${e0(l)}.`);
      const j = S ? (D = r.get(l.kind)) === null || D === void 0 ? void 0 : D.leave : (b = r.get(l.kind)) === null || b === void 0 ? void 0 : b.enter;
      if (T = j == null ? void 0 : j.call(t, l, I, g, C, x), T === cp)
        break;
      if (T === !1) {
        if (!S) {
          C.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([I, T]), !S))
        if (Ic(T))
          l = T;
        else {
          C.pop();
          continue;
        }
    }
    if (T === void 0 && J && d.push([I, l]), S)
      C.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(l), o = i ? l : (F = n[l.kind]) !== null && F !== void 0 ? F : [], c = -1, d = [], g && x.push(g), g = l;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function up(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function s0(e) {
  return Ap(e, hp);
}
const dp = 80, hp = {
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
    leave: ({ selections: e }) => Zt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", te(n, ", "), ")");
      return o.length > dp && (o = i + pe(`(
`, bs(te(n, `
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
    leave: ({ value: e, block: t }) => t ? _g(e) : sp(e)
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
`) + te(["schema", te(t, " "), Zt(n)], " ")
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
        Zt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Bc(n) ? pe(`(
`, bs(te(n, `
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
        Zt(s)
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
`) + te(["enum", t, te(n, " "), Zt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + te(["input", t, te(n, " "), Zt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Bc(n) ? pe(`(
`, bs(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), Zt(t)],
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
        Zt(r)
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
        Zt(r)
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
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), Zt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), Zt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Zt(e) {
  return pe(`{
`, bs(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function bs(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Bc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const lp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: s0
}, Symbol.toStringTag, { value: "Module" })), fp = /* @__PURE__ */ Uo(lp);
var zo = {}, oi = {}, i0 = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, gp = i0, o0 = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof gp;
}, pp = o0, mp = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = pp);
  var s, i = /* @__PURE__ */ new Map();
  function o(I, g) {
    var C = i.get(g);
    C ? C.push.apply(C, I) : i.set(g, I);
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
        var C = e(I, "" + c + g, r);
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
oi.ReactNativeFile = i0;
oi.extractFiles = mp;
oi.isExtractableFile = o0;
var Ep = typeof self == "object" ? self.FormData : window.FormData, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.defaultJsonSerializer = void 0;
Wr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var wp = we && we.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(zo, "__esModule", { value: !0 });
var a0 = oi, Ip = wp(Ep), yp = Wr, Bp = function(e) {
  return a0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Cp(e, t, n, r) {
  r === void 0 && (r = yp.defaultJsonSerializer);
  var s = a0.extractFiles({ query: e, variables: t, operationName: n }, "", Bp), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(C, x, D) {
      return C.push({ query: x, variables: t ? t[D] : void 0 }), C;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? Ip.default : FormData, l = new d();
  l.append("operations", r.stringify(i));
  var I = {}, g = 0;
  return o.forEach(function(C) {
    I[++g] = C;
  }), l.append("map", r.stringify(I)), g = 0, o.forEach(function(C, x) {
    l.append("" + ++g, x);
  }), l;
}
zo.default = Cp;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.parseBatchRequestsExtendedArgs = vt.parseRawRequestExtendedArgs = vt.parseRequestExtendedArgs = vt.parseBatchRequestArgs = vt.parseRawRequestArgs = vt.parseRequestArgs = void 0;
function bp(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
vt.parseRequestArgs = bp;
function Qp(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
vt.parseRawRequestArgs = Qp;
function xp(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
vt.parseBatchRequestArgs = xp;
function vp(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
vt.parseRequestExtendedArgs = vp;
function Fp(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
vt.parseRawRequestExtendedArgs = Fp;
function Dp(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
vt.parseBatchRequestsExtendedArgs = Dp;
var zr = {}, Rp = we && we.__extends || function() {
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
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.ClientError = void 0;
var Np = (
  /** @class */
  function(e) {
    Rp(t, e);
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
zr.ClientError = Np;
var Cr = {}, Cc;
function Sp() {
  if (Cc)
    return Cr;
  Cc = 1;
  var e = we && we.__assign || function() {
    return e = Object.assign || function(M) {
      for (var k, O = 1, P = arguments.length; O < P; O++) {
        k = arguments[O];
        for (var $ in k)
          Object.prototype.hasOwnProperty.call(k, $) && (M[$] = k[$]);
      }
      return M;
    }, e.apply(this, arguments);
  }, t = we && we.__awaiter || function(M, k, O, P) {
    function $(U) {
      return U instanceof O ? U : new O(function(H) {
        H(U);
      });
    }
    return new (O || (O = Promise))(function(U, H) {
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
        A.done ? U(A.value) : $(A.value).then(ee, B);
      }
      a((P = P.apply(M, k || [])).next());
    });
  }, n = we && we.__generator || function(M, k) {
    var O = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, $, U, H;
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
      for (; O; )
        try {
          if (P = 1, $ && (U = a[0] & 2 ? $.return : a[0] ? $.throw || ((U = $.return) && U.call($), 0) : $.next) && !(U = U.call($, a[1])).done)
            return U;
          switch ($ = 0, U && (a = [a[0] & 2, U.value]), a[0]) {
            case 0:
            case 1:
              U = a;
              break;
            case 4:
              return O.label++, { value: a[1], done: !1 };
            case 5:
              O.label++, $ = a[1], a = [0];
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
          a = [6, A], $ = 0;
        } finally {
          P = U = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Cr, "__esModule", { value: !0 }), Cr.GraphQLWebSocketClient = void 0;
  var r = zr, s = c0(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", l = "subscribe", I = "next", g = "error", C = "complete", x = (
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
        var P = JSON.parse(k), $ = P.type, U = P.payload, H = P.id;
        return new M($, O(U), H);
      }, M;
    }()
  ), D = (
    /** @class */
    function() {
      function M(k, O) {
        var P = this, $ = O.onInit, U = O.onAcknowledged, H = O.onPing, ee = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = k, k.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, A, h, m;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = k).send, h = F, $ ? [4, $()] : [3, 2];
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
                H ? H(a.payload).then(function(w) {
                  return k.send(J(w).text);
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
              case I: {
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
          } catch (w) {
            console.error(w), k.close(1006);
          }
          k.close(4400, "Unknown graphql-ws message.");
        };
      }
      return M.prototype.makeSubscribe = function(k, O, P, $) {
        var U = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: k, variables: P, subscriber: $ }, this.socket.send(T(H, { query: k, operationName: O, variables: P }).text), function() {
          U.socket.send(j(H).text), delete U.socketState.subscriptions[H];
        };
      }, M.prototype.rawRequest = function(k, O) {
        var P = this;
        return new Promise(function($, U) {
          var H;
          P.rawSubscribe(k, {
            next: function(ee, B) {
              return H = { data: ee, extensions: B };
            },
            error: U,
            complete: function() {
              return $(H);
            }
          }, O);
        });
      }, M.prototype.request = function(k, O) {
        var P = this;
        return new Promise(function($, U) {
          var H;
          P.subscribe(k, {
            next: function(ee) {
              return H = ee;
            },
            error: U,
            complete: function() {
              return $(H);
            }
          }, O);
        });
      }, M.prototype.subscribe = function(k, O, P) {
        var $ = s.resolveRequestDocument(k), U = $.query, H = $.operationName;
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
  Cr.GraphQLWebSocketClient = D;
  function b(M, k) {
    k === void 0 && (k = function(P) {
      return P;
    });
    var O = x.parse(M, k);
    return O;
  }
  function F(M) {
    return new x(i, M);
  }
  function S(M) {
    return new x(c, M, void 0);
  }
  function J(M) {
    return new x(d, M, void 0);
  }
  function T(M, k) {
    return new x(l, k, M);
  }
  function j(M) {
    return new x(C, void 0, M);
  }
  return Cr;
}
var bc;
function c0() {
  return bc || (bc = 1, function(e) {
    var t = we && we.__assign || function() {
      return t = Object.assign || function(f) {
        for (var w, y = 1, p = arguments.length; y < p; y++) {
          w = arguments[y];
          for (var u in w)
            Object.prototype.hasOwnProperty.call(w, u) && (f[u] = w[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = we && we.__createBinding || (Object.create ? function(f, w, y, p) {
      p === void 0 && (p = y), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return w[y];
      } });
    } : function(f, w, y, p) {
      p === void 0 && (p = y), f[p] = w[y];
    }), r = we && we.__setModuleDefault || (Object.create ? function(f, w) {
      Object.defineProperty(f, "default", { enumerable: !0, value: w });
    } : function(f, w) {
      f.default = w;
    }), s = we && we.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var w = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(w, f, y);
      return r(w, f), w;
    }, i = we && we.__awaiter || function(f, w, y, p) {
      function u(E) {
        return E instanceof y ? E : new y(function(Z) {
          Z(E);
        });
      }
      return new (y || (y = Promise))(function(E, Z) {
        function X(re) {
          try {
            q(p.next(re));
          } catch (se) {
            Z(se);
          }
        }
        function z(re) {
          try {
            q(p.throw(re));
          } catch (se) {
            Z(se);
          }
        }
        function q(re) {
          re.done ? E(re.value) : u(re.value).then(X, z);
        }
        q((p = p.apply(f, w || [])).next());
      });
    }, o = we && we.__generator || function(f, w) {
      var y = { label: 0, sent: function() {
        if (E[0] & 1)
          throw E[1];
        return E[1];
      }, trys: [], ops: [] }, p, u, E, Z;
      return Z = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
        return this;
      }), Z;
      function X(q) {
        return function(re) {
          return z([q, re]);
        };
      }
      function z(q) {
        if (p)
          throw new TypeError("Generator is already executing.");
        for (; y; )
          try {
            if (p = 1, u && (E = q[0] & 2 ? u.return : q[0] ? u.throw || ((E = u.return) && E.call(u), 0) : u.next) && !(E = E.call(u, q[1])).done)
              return E;
            switch (u = 0, E && (q = [q[0] & 2, E.value]), q[0]) {
              case 0:
              case 1:
                E = q;
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
                if (E = y.trys, !(E = E.length > 0 && E[E.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  y = 0;
                  continue;
                }
                if (q[0] === 3 && (!E || q[1] > E[0] && q[1] < E[3])) {
                  y.label = q[1];
                  break;
                }
                if (q[0] === 6 && y.label < E[1]) {
                  y.label = E[1], E = q;
                  break;
                }
                if (E && y.label < E[2]) {
                  y.label = E[2], y.ops.push(q);
                  break;
                }
                E[2] && y.ops.pop(), y.trys.pop();
                continue;
            }
            q = w.call(f, y);
          } catch (re) {
            q = [6, re], u = 0;
          } finally {
            p = E = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, c = we && we.__rest || function(f, w) {
      var y = {};
      for (var p in f)
        Object.prototype.hasOwnProperty.call(f, p) && w.indexOf(p) < 0 && (y[p] = f[p]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, p = Object.getOwnPropertySymbols(f); u < p.length; u++)
          w.indexOf(p[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, p[u]) && (y[p[u]] = f[p[u]]);
      return y;
    }, d = we && we.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var l = s(Bg), I = l, g = rp, C = fp, x = d(zo), D = Wr, b = vt, F = zr;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return F.ClientError;
    } });
    var S = function(f) {
      var w = {};
      return f && (typeof Headers < "u" && f instanceof Headers || I && I.Headers && f instanceof I.Headers ? w = h(f) : Array.isArray(f) ? f.forEach(function(y) {
        var p = y[0], u = y[1];
        w[p] = u;
      }) : w = f), w;
    }, J = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, T = function(f) {
      var w = f.query, y = f.variables, p = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(w)) {
        var E = ["query=" + encodeURIComponent(J(w))];
        return y && E.push("variables=" + encodeURIComponent(u.stringify(y))), p && E.push("operationName=" + encodeURIComponent(p)), E.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var Z = w.reduce(function(X, z, q) {
        return X.push({
          query: J(z),
          variables: y ? u.stringify(y[q]) : void 0
        }), X;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Z));
    }, j = function(f) {
      var w = f.url, y = f.query, p = f.variables, u = f.operationName, E = f.headers, Z = f.fetch, X = f.fetchOptions, z = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return q = x.default(y, p, u, X.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), E), body: q }, X), z ? [4, Promise.resolve(z(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Z(w, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, M = function(f) {
      var w = f.url, y = f.query, p = f.variables, u = f.operationName, E = f.headers, Z = f.fetch, X = f.fetchOptions, z = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return q = T({
                query: y,
                variables: p,
                operationName: u,
                jsonSerializer: X.jsonSerializer
              }), re = t({ method: "GET", headers: E }, X), z ? [4, Promise.resolve(z(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Z(w + "?" + q, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, k = (
      /** @class */
      function() {
        function f(w, y) {
          y === void 0 && (y = {}), this.url = w, this.options = y;
        }
        return f.prototype.rawRequest = function(w, y, p) {
          return i(this, void 0, void 0, function() {
            var u, E, Z, X, z, q, re, se, Se, fe, oe, Re;
            return o(this, function(he) {
              return u = b.parseRawRequestArgs(w, y, p), E = this.options, Z = E.headers, X = E.fetch, z = X === void 0 ? l.default : X, q = E.method, re = q === void 0 ? "POST" : q, se = E.requestMiddleware, Se = E.responseMiddleware, fe = c(E, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (fe.signal = u.signal), Re = B(u.query).operationName, [2, O({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, S(a(Z))), S(u.requestHeaders)),
                operationName: Re,
                fetch: z,
                method: re,
                fetchOptions: fe,
                middleware: se
              }).then(function(ge) {
                return Se && Se(ge), ge;
              }).catch(function(ge) {
                throw Se && Se(ge), ge;
              })];
            });
          });
        }, f.prototype.request = function(w) {
          for (var y = [], p = 1; p < arguments.length; p++)
            y[p - 1] = arguments[p];
          var u = y[0], E = y[1], Z = b.parseRequestArgs(w, u, E), X = this.options, z = X.headers, q = X.fetch, re = q === void 0 ? l.default : q, se = X.method, Se = se === void 0 ? "POST" : se, fe = X.requestMiddleware, oe = X.responseMiddleware, Re = c(X, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), he = this.url;
          Z.signal !== void 0 && (Re.signal = Z.signal);
          var ge = B(Z.document), qt = ge.query, Ne = ge.operationName;
          return O({
            url: he,
            query: qt,
            variables: Z.variables,
            headers: t(t({}, S(a(z))), S(Z.requestHeaders)),
            operationName: Ne,
            fetch: re,
            method: Se,
            fetchOptions: Re,
            middleware: fe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(w, y) {
          var p = b.parseBatchRequestArgs(w, y), u = this.options, E = u.headers, Z = u.fetch, X = Z === void 0 ? l.default : Z, z = u.method, q = z === void 0 ? "POST" : z, re = u.requestMiddleware, se = u.responseMiddleware, Se = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          p.signal !== void 0 && (Se.signal = p.signal);
          var oe = p.documents.map(function(he) {
            var ge = he.document;
            return B(ge).query;
          }), Re = p.documents.map(function(he) {
            var ge = he.variables;
            return ge;
          });
          return O({
            url: fe,
            query: oe,
            variables: Re,
            headers: t(t({}, S(a(E))), S(p.requestHeaders)),
            operationName: void 0,
            fetch: X,
            method: q,
            fetchOptions: Se,
            middleware: re
          }).then(function(he) {
            return se && se(he), he.data;
          }).catch(function(he) {
            throw se && se(he), he;
          });
        }, f.prototype.setHeaders = function(w) {
          return this.options.headers = w, this;
        }, f.prototype.setHeader = function(w, y) {
          var p, u = this.options.headers;
          return u ? u[w] = y : this.options.headers = (p = {}, p[w] = y, p), this;
        }, f.prototype.setEndpoint = function(w) {
          return this.url = w, this;
        }, f;
      }()
    );
    e.GraphQLClient = k;
    function O(f) {
      var w = f.url, y = f.query, p = f.variables, u = f.headers, E = f.operationName, Z = f.fetch, X = f.method, z = X === void 0 ? "POST" : X, q = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, Se, fe, oe, Re, he, ge, qt, Ne, ye, Ir;
        return o(this, function(_e) {
          switch (_e.label) {
            case 0:
              return se = z.toUpperCase() === "POST" ? j : M, Se = Array.isArray(y), [4, se({
                url: w,
                query: y,
                variables: p,
                operationName: E,
                headers: u,
                fetch: Z,
                fetchOptions: q,
                middleware: re
              })];
            case 1:
              return fe = _e.sent(), [4, H(fe, q.jsonSerializer)];
            case 2:
              if (oe = _e.sent(), Re = Se && Array.isArray(oe) ? !oe.some(function(Le) {
                var ss = Le.data;
                return !ss;
              }) : !!oe.data, he = !oe.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", fe.ok && he && Re)
                return ge = fe.headers, qt = fe.status, oe.errors, Ne = c(oe, ["errors"]), ye = q.errorPolicy === "ignore" ? Ne : oe, [2, t(t({}, Se ? { data: ye } : ye), { headers: ge, status: qt })];
              throw Ir = typeof oe == "string" ? { error: oe } : oe, new F.ClientError(t(t({}, Ir), { status: fe.status, headers: fe.headers }), { query: y, variables: p });
          }
        });
      });
    }
    function P(f, w, y, p) {
      return i(this, void 0, void 0, function() {
        var u, E;
        return o(this, function(Z) {
          return u = b.parseRawRequestExtendedArgs(f, w, y, p), E = new k(u.url), [2, E.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function $(f, w) {
      for (var y = [], p = 2; p < arguments.length; p++)
        y[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var u, E, Z, X;
        return o(this, function(z) {
          return u = y[0], E = y[1], Z = b.parseRequestExtendedArgs(f, w, u, E), X = new k(Z.url), [2, X.request(t({}, Z))];
        });
      });
    }
    e.request = $;
    function U(f, w, y) {
      return i(this, void 0, void 0, function() {
        var p, u;
        return o(this, function(E) {
          return p = b.parseBatchRequestsExtendedArgs(f, w, y), u = new k(p.url), [2, u.batchRequests(t({}, p))];
        });
      });
    }
    e.batchRequests = U, e.default = $;
    function H(f, w) {
      return w === void 0 && (w = D.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, p, u;
        return o(this, function(E) {
          switch (E.label) {
            case 0:
              return f.headers.forEach(function(Z, X) {
                X.toLowerCase() === "content-type" && (y = Z);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (p = w).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(p, [E.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
      var w, y = void 0, p = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return p.length === 1 && (y = (w = p[0].name) === null || w === void 0 ? void 0 : w.value), y;
    }
    function B(f) {
      if (typeof f == "string") {
        var w = void 0;
        try {
          var y = g.parse(f);
          w = ee(y);
        } catch {
        }
        return { query: f, operationName: w };
      }
      var p = ee(f);
      return { query: C.print(f), operationName: p };
    }
    e.resolveRequestDocument = B;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var w = [], y = 1; y < arguments.length; y++)
        w[y - 1] = arguments[y];
      return f.reduce(function(p, u, E) {
        return "" + p + u + (E in w ? w[E] : "");
      }, "");
    }
    e.gql = A;
    function h(f) {
      var w = {};
      return f.forEach(function(y, p) {
        w[p] = y;
      }), w;
    }
    var m = Sp();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(Oi)), Oi;
}
var _p = c0();
function kp(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function A0(e) {
  return function t(n) {
    return arguments.length === 0 || kp(n) ? t : e.apply(this, arguments);
  };
}
var Mp = /* @__PURE__ */ A0(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Op(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function u0(e, t, n) {
  if (n || (n = new Tp()), Lp(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? u0(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Mp(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Op(e);
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
function Lp(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Tp = /* @__PURE__ */ function() {
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
}(), Pp = /* @__PURE__ */ A0(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : u0(t, !0);
});
const Pr = Pp;
var Ls = function() {
  return Ls = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Ls.apply(this, arguments);
};
var Qs = /* @__PURE__ */ new Map(), go = /* @__PURE__ */ new Map(), d0 = !0, Ts = !1;
function h0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Up(e) {
  return h0(e.source.body.substring(e.start, e.end));
}
function Gp(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Up(r.loc), o = go.get(s);
      o && !o.has(i) ? d0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || go.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Ls(Ls({}, e), { definitions: n });
}
function Hp(e) {
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
function Jp(e) {
  var t = h0(e);
  if (!Qs.has(t)) {
    var n = n0(e, {
      experimentalFragmentVariables: Ts,
      allowLegacyFragmentVariables: Ts
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Qs.set(t, Hp(Gp(n)));
  }
  return Qs.get(t);
}
function ar(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), Jp(r);
}
function Zp() {
  Qs.clear(), go.clear();
}
function Yp() {
  d0 = !1;
}
function Xp() {
  Ts = !0;
}
function Vp() {
  Ts = !1;
}
var br = {
  gql: ar,
  resetCaches: Zp,
  disableFragmentWarnings: Yp,
  enableExperimentalFragmentVariables: Xp,
  disableExperimentalFragmentVariables: Vp
};
(function(e) {
  e.gql = br.gql, e.resetCaches = br.resetCaches, e.disableFragmentWarnings = br.disableFragmentWarnings, e.enableExperimentalFragmentVariables = br.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = br.disableExperimentalFragmentVariables;
})(ar || (ar = {}));
ar.default = ar;
const ce = ar;
function jp(e) {
  return Me(yn(e, "utf-8"));
}
function qp(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function l0(e) {
  return Me(e);
}
var f0 = {}, Ko = {}, $p = Fe, Pt = null;
try {
  Pt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
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
function Fe(e, t, n) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!n;
}
Fe.prototype.__isLong__;
Object.defineProperty(Fe.prototype, "__isLong__", { value: !0 });
function Dt(e) {
  return (e && e.__isLong__) === !0;
}
Fe.isLong = Dt;
var Qc = {}, xc = {};
function Un(e, t) {
  var n, r, s;
  return t ? (e >>>= 0, (s = 0 <= e && e < 256) && (r = xc[e], r) ? r : (n = De(e, (e | 0) < 0 ? -1 : 0, !0), s && (xc[e] = n), n)) : (e |= 0, (s = -128 <= e && e < 128) && (r = Qc[e], r) ? r : (n = De(e, e < 0 ? -1 : 0, !1), s && (Qc[e] = n), n));
}
Fe.fromInt = Un;
function Ut(e, t) {
  if (isNaN(e))
    return t ? _n : Gt;
  if (t) {
    if (e < 0)
      return _n;
    if (e >= g0)
      return E0;
  } else {
    if (e <= -Fc)
      return Ft;
    if (e + 1 >= Fc)
      return m0;
  }
  return e < 0 ? Ut(-e, t).neg() : De(e % cr | 0, e / cr | 0, t);
}
Fe.fromNumber = Ut;
function De(e, t, n) {
  return new Fe(e, t, n);
}
Fe.fromBits = De;
var Ps = Math.pow;
function ea(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return Gt;
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var r;
  if ((r = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (r === 0)
    return ea(e.substring(1), t, n).neg();
  for (var s = Ut(Ps(n, 8)), i = Gt, o = 0; o < e.length; o += 8) {
    var c = Math.min(8, e.length - o), d = parseInt(e.substring(o, o + c), n);
    if (c < 8) {
      var l = Ut(Ps(n, c));
      i = i.mul(l).add(Ut(d));
    } else
      i = i.mul(s), i = i.add(Ut(d));
  }
  return i.unsigned = t, i;
}
Fe.fromString = ea;
function jt(e, t) {
  return typeof e == "number" ? Ut(e, t) : typeof e == "string" ? ea(e, t) : De(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
Fe.fromValue = jt;
var vc = 65536, Wp = 1 << 24, cr = vc * vc, g0 = cr * cr, Fc = g0 / 2, Dc = Un(Wp), Gt = Un(0);
Fe.ZERO = Gt;
var _n = Un(0, !0);
Fe.UZERO = _n;
var Xn = Un(1);
Fe.ONE = Xn;
var p0 = Un(1, !0);
Fe.UONE = p0;
var po = Un(-1);
Fe.NEG_ONE = po;
var m0 = De(-1, 2147483647, !1);
Fe.MAX_VALUE = m0;
var E0 = De(-1, -1, !0);
Fe.MAX_UNSIGNED_VALUE = E0;
var Ft = De(0, -2147483648, !1);
Fe.MIN_VALUE = Ft;
var W = Fe.prototype;
W.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
W.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * cr + (this.low >>> 0) : this.high * cr + (this.low >>> 0);
};
W.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(Ft)) {
      var n = Ut(t), r = this.div(n), s = r.mul(n).sub(this);
      return r.toString(t) + s.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Ut(Ps(t, 6), this.unsigned), o = this, c = ""; ; ) {
    var d = o.div(i), l = o.sub(d.mul(i)).toInt() >>> 0, I = l.toString(t);
    if (o = d, o.isZero())
      return I + c;
    for (; I.length < 6; )
      I = "0" + I;
    c = "" + I + c;
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
    return this.eq(Ft) ? 64 : this.neg().getNumBitsAbs();
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
  return Dt(t) || (t = jt(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
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
  if (Dt(t) || (t = jt(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), r = t.isNegative();
  return n && !r ? -1 : !n && r ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
W.comp = W.compare;
W.negate = function() {
  return !this.unsigned && this.eq(Ft) ? Ft : this.not().add(Xn);
};
W.neg = W.negate;
W.add = function(t) {
  Dt(t) || (t = jt(t));
  var n = this.high >>> 16, r = this.high & 65535, s = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, c = t.high & 65535, d = t.low >>> 16, l = t.low & 65535, I = 0, g = 0, C = 0, x = 0;
  return x += i + l, C += x >>> 16, x &= 65535, C += s + d, g += C >>> 16, C &= 65535, g += r + c, I += g >>> 16, g &= 65535, I += n + o, I &= 65535, De(C << 16 | x, I << 16 | g, this.unsigned);
};
W.subtract = function(t) {
  return Dt(t) || (t = jt(t)), this.add(t.neg());
};
W.sub = W.subtract;
W.multiply = function(t) {
  if (this.isZero())
    return Gt;
  if (Dt(t) || (t = jt(t)), Pt) {
    var n = Pt.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return De(n, Pt.get_high(), this.unsigned);
  }
  if (t.isZero())
    return Gt;
  if (this.eq(Ft))
    return t.isOdd() ? Ft : Gt;
  if (t.eq(Ft))
    return this.isOdd() ? Ft : Gt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(Dc) && t.lt(Dc))
    return Ut(this.toNumber() * t.toNumber(), this.unsigned);
  var r = this.high >>> 16, s = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, c = t.high >>> 16, d = t.high & 65535, l = t.low >>> 16, I = t.low & 65535, g = 0, C = 0, x = 0, D = 0;
  return D += o * I, x += D >>> 16, D &= 65535, x += i * I, C += x >>> 16, x &= 65535, x += o * l, C += x >>> 16, x &= 65535, C += s * I, g += C >>> 16, C &= 65535, C += i * l, g += C >>> 16, C &= 65535, C += o * d, g += C >>> 16, C &= 65535, g += r * I + s * l + i * d + o * c, g &= 65535, De(x << 16 | D, g << 16 | C, this.unsigned);
};
W.mul = W.multiply;
W.divide = function(t) {
  if (Dt(t) || (t = jt(t)), t.isZero())
    throw Error("division by zero");
  if (Pt) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? Pt.div_u : Pt.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return De(n, Pt.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? _n : Gt;
  var r, s, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return _n;
    if (t.gt(this.shru(1)))
      return p0;
    i = _n;
  } else {
    if (this.eq(Ft)) {
      if (t.eq(Xn) || t.eq(po))
        return Ft;
      if (t.eq(Ft))
        return Xn;
      var o = this.shr(1);
      return r = o.div(t).shl(1), r.eq(Gt) ? t.isNegative() ? Xn : po : (s = this.sub(t.mul(r)), i = r.add(s.div(t)), i);
    } else if (t.eq(Ft))
      return this.unsigned ? _n : Gt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = Gt;
  }
  for (s = this; s.gte(t); ) {
    r = Math.max(1, Math.floor(s.toNumber() / t.toNumber()));
    for (var c = Math.ceil(Math.log(r) / Math.LN2), d = c <= 48 ? 1 : Ps(2, c - 48), l = Ut(r), I = l.mul(t); I.isNegative() || I.gt(s); )
      r -= d, l = Ut(r, this.unsigned), I = l.mul(t);
    l.isZero() && (l = Xn), i = i.add(l), s = s.sub(I);
  }
  return i;
};
W.div = W.divide;
W.modulo = function(t) {
  if (Dt(t) || (t = jt(t)), Pt) {
    var n = (this.unsigned ? Pt.rem_u : Pt.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return De(n, Pt.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
W.mod = W.modulo;
W.rem = W.modulo;
W.not = function() {
  return De(~this.low, ~this.high, this.unsigned);
};
W.and = function(t) {
  return Dt(t) || (t = jt(t)), De(this.low & t.low, this.high & t.high, this.unsigned);
};
W.or = function(t) {
  return Dt(t) || (t = jt(t)), De(this.low | t.low, this.high | t.high, this.unsigned);
};
W.xor = function(t) {
  return Dt(t) || (t = jt(t)), De(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
W.shiftLeft = function(t) {
  return Dt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? De(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : De(0, this.low << t - 32, this.unsigned);
};
W.shl = W.shiftLeft;
W.shiftRight = function(t) {
  return Dt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? De(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : De(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
W.shr = W.shiftRight;
W.shiftRightUnsigned = function(t) {
  if (Dt(t) && (t = t.toInt()), t &= 63, t === 0)
    return this;
  var n = this.high;
  if (t < 32) {
    var r = this.low;
    return De(r >>> t | n << 32 - t, n >>> t, this.unsigned);
  } else
    return t === 32 ? De(n, 0, this.unsigned) : De(n >>> t - 32, 0, this.unsigned);
};
W.shru = W.shiftRightUnsigned;
W.shr_u = W.shiftRightUnsigned;
W.toSigned = function() {
  return this.unsigned ? De(this.low, this.high, !1) : this;
};
W.toUnsigned = function() {
  return this.unsigned ? this : De(this.low, this.high, !0);
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
Fe.fromBytes = function(t, n, r) {
  return r ? Fe.fromBytesLE(t, n) : Fe.fromBytesBE(t, n);
};
Fe.fromBytesLE = function(t, n) {
  return new Fe(
    t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,
    t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,
    n
  );
};
Fe.fromBytesBE = function(t, n) {
  return new Fe(
    t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],
    t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],
    n
  );
};
var ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
const w0 = [
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
], zp = (e) => {
  const t = w0.find(([n]) => e >= n);
  return e + (t ? t[1] : 0);
};
ai.addLeapSeconds = zp;
const Kp = (e) => {
  const t = w0.find(([n, r]) => e - r >= n);
  return e - (t ? t[1] : 0);
};
ai.removeLeapSeconds = Kp;
var em = we && we.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ko, "__esModule", { value: !0 });
const Fr = em($p), Rc = ai;
let mo = class fn {
  /**
   * Construct an instance of TAI64.
   *
   * @param label - The TAI64 label between 0 and 2^63-1, inclusive
   * @returns An instance of TAI64
   * @throws RangeError if the given label is not between 0 and 2^63-1, inclusive
   */
  constructor(t) {
    if (this.label = t, t.lt(Fr.default.ZERO) || t.gte(Fr.default.MAX_VALUE))
      throw new RangeError("Label must be an integer between 0 and 2^63-1, inclusive");
  }
  /**
   * Return a TAI64 the current number of seconds elapsed since 1970 TAI.
   *
   * @returns An instance of TAI64
   */
  static now() {
    const t = Math.floor(Date.now() / 1e3);
    return fn.fromUnix(t);
  }
  /**
   * Return a TAI64 corresponding to the given UNIX timestamp.
   *
   * @param timestamp - The UNIX timestamp in seconds
   * @returns An instance of TAI64
   */
  static fromUnix(t) {
    const n = Rc.addLeapSeconds(t), r = fn.EPOCH.label.add(n);
    return new fn(r);
  }
  /**
   * Return a TAI64 corresponding to the given hexadecimal string representing a TAI64. This method
   * is an alias for `TAI64#fromString()` method.
   *
   * @param hexString - The hexadecimal string
   * @returns An instance of TAI64
   */
  static fromHexString(t) {
    return fn.fromString(t);
  }
  /**
   * Return a TAI64 corresponding to the given string representing a TAI64 in the given radix.
   *
   * @param str - The string
   * @param radix - An integer that represents the radix (the base in mathematical numeral systems), defaults to `16`
   * @returns An instance of TAI64
   */
  static fromString(t, n = 16) {
    const r = Fr.default.fromString(t, !1, n);
    return new fn(r);
  }
  /**
   * Return a TAI64 corresponding to the given byte array representing a TAI64.
   *
   * @param bytes - The byte array
   * @returns An instance of TAI64
   */
  static fromByteArray(t) {
    const n = Fr.default.fromBytes(t, !1);
    return new fn(n);
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
    const t = this.label.sub(fn.EPOCH.label);
    return Rc.removeLeapSeconds(t.toNumber());
  }
};
mo.EPOCH = new mo(Fr.default.MAX_VALUE.shiftRight(1).add(1));
Ko.TAI64 = mo;
Object.defineProperty(f0, "__esModule", { value: !0 });
var tm = Ko, I0 = f0.TAI64 = tm.TAI64, nm = Object.defineProperty, rm = (e, t, n) => t in e ? nm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Wn = (e, t, n) => (rm(e, typeof t != "symbol" ? t + "" : t, n), n), sm = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, im = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, om = (e, t, n) => (sm(e, t, "access private method"), n), ta = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? wt, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? wt, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: V(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, am = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, na = ce`
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
    `, ra = ce`
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
    `, Kr = ce`
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
    ${na}
${ra}`, cm = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Am = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${cm}`, sa = ce`
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
    `, um = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, dm = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, hm = ce`
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
    `, y0 = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, ci = ce`
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
    `, lm = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, fm = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, gm = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, pm = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, mm = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, Em = ce`
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
    `, wm = ce`
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
    ${Em}`, Im = ce`
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
    ${lm}
${fm}
${gm}
${pm}
${mm}
${wm}`, ym = ce`
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
    ${ci}
${Im}`, Bm = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Cm = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, bm = ce`
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
    `, Qm = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, xm = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${bm}`, vm = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${ym}`, Fm = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Kr}`, Dm = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${Kr}
${na}`, Rm = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${Kr}`, Nm = ce`
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
    ${Cm}
${Kr}`, Sm = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Am}`, _m = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${ci}`, km = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${ci}
${Kr}`, Mm = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${ci}`, Om = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${sa}`, Lm = ce`
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
    ${sa}`, Tm = ce`
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
    ${sa}
${um}`, Pm = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Um = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Bm}`, Gm = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${y0}`, Hm = ce`
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
    ${y0}`, Jm = ce`
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
    ${dm}`, Zm = ce`
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
    ${hm}`, Ym = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Xm = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${na}`, Vm = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, jm = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, qm = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${ra}`, $m = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${ra}`;
function Wm(e) {
  return {
    getVersion(t, n) {
      return e(Qm, t, n);
    },
    getNodeInfo(t, n) {
      return e(xm, t, n);
    },
    getChain(t, n) {
      return e(vm, t, n);
    },
    getTransaction(t, n) {
      return e(Fm, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Dm, t, n);
    },
    getTransactions(t, n) {
      return e(Rm, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Nm, t, n);
    },
    estimatePredicates(t, n) {
      return e(Sm, t, n);
    },
    getBlock(t, n) {
      return e(_m, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(km, t, n);
    },
    getBlocks(t, n) {
      return e(Mm, t, n);
    },
    getCoin(t, n) {
      return e(Om, t, n);
    },
    getCoins(t, n) {
      return e(Lm, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(Tm, t, n);
    },
    getContract(t, n) {
      return e(Pm, t, n);
    },
    getContractBalance(t, n) {
      return e(Um, t, n);
    },
    getBalance(t, n) {
      return e(Gm, t, n);
    },
    getBalances(t, n) {
      return e(Hm, t, n);
    },
    getMessages(t, n) {
      return e(Jm, t, n);
    },
    getMessageProof(t, n) {
      return e(Zm, t, n);
    },
    getMessageStatus(t, n) {
      return e(Ym, t, n);
    },
    dryRun(t, n) {
      return e(Xm, t, n);
    },
    submit(t, n) {
      return e(Vm, t, n);
    },
    produceBlocks(t, n) {
      return e(jm, t, n);
    },
    submitAndAwait(t, n) {
      return e(qm, t, n);
    },
    statusChange(t, n) {
      return e($m, t, n);
    }
  };
}
var B0 = class {
  constructor() {
    R(this, "readable");
    R(this, "writable");
    R(this, "readableStreamController");
    this.readable = new ReadableStream({
      start: (e) => {
        this.readableStreamController = e;
      }
    }), this.writable = new WritableStream({
      write: (e) => {
        const t = B0.textDecoder.decode(e);
        if (t.startsWith("data:")) {
          const { data: n, errors: r } = JSON.parse(t.split("data:")[1]);
          Array.isArray(r) ? this.readableStreamController.enqueue(
            new v(
              v.CODES.INVALID_REQUEST,
              r.map((s) => s.message).join(`

`)
            )
          ) : this.readableStreamController.enqueue(n);
        }
      }
    });
  }
}, C0 = B0;
Wn(C0, "textDecoder", new TextDecoder());
async function* zm({
  url: e,
  variables: t,
  query: n,
  fetchFn: r
}) {
  const i = (await r(`${e}-sub`, {
    method: "POST",
    body: JSON.stringify({
      query: s0(n),
      variables: t
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    }
  })).body.pipeThrough(new C0()).getReader();
  for (; ; ) {
    const { value: o, done: c } = await i.read();
    if (o instanceof v)
      throw o;
    if (yield o, c)
      break;
  }
}
var Dn = {}, Km = 30 * 1e3, eE = class {
  constructor(e = Km) {
    R(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        N.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = V(e);
    if (Dn[n]) {
      if (!t || Dn[n].expires > Date.now())
        return Dn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = V(e);
    return Dn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Dn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Dn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = V(e);
    delete Dn[t];
  }
}, tE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case Qe.Coin: {
      const n = Y(e.predicate ?? "0x"), r = Y(e.predicateData ?? "0x");
      return {
        type: Qe.Coin,
        txID: V(Y(e.id).slice(0, 32)),
        outputIndex: Y(e.id)[32],
        owner: V(e.owner),
        amount: Q(e.amount),
        assetId: V(e.assetId),
        txPointer: {
          blockHeight: Tt(Y(e.txPointer).slice(0, 8)),
          txIndex: Tt(Y(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        maturity: e.maturity ?? 0,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r)
      };
    }
    case Qe.Contract:
      return {
        type: Qe.Contract,
        txID: ke,
        outputIndex: 0,
        balanceRoot: ke,
        stateRoot: ke,
        txPointer: {
          blockHeight: Tt(Y(e.txPointer).slice(0, 8)),
          txIndex: Tt(Y(e.txPointer).slice(8, 16))
        },
        contractID: V(e.contractId)
      };
    case Qe.Message: {
      const n = Y(e.predicate ?? "0x"), r = Y(e.predicateData ?? "0x"), s = Y(e.data ?? "0x");
      return {
        type: Qe.Message,
        sender: V(e.sender),
        recipient: V(e.recipient),
        amount: Q(e.amount),
        nonce: V(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r),
        data: V(s),
        dataLength: s.length
      };
    }
    default:
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, nE = (e) => {
  const { type: t } = e;
  switch (t) {
    case Be.Coin:
      return {
        type: Be.Coin,
        to: V(e.to),
        amount: Q(e.amount),
        assetId: V(e.assetId)
      };
    case Be.Contract:
      return {
        type: Be.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: ke,
        stateRoot: ke
      };
    case Be.Change:
      return {
        type: Be.Change,
        to: V(e.to),
        amount: Q(0),
        assetId: V(e.assetId)
      };
    case Be.Variable:
      return {
        type: Be.Variable,
        to: ke,
        amount: Q(0),
        assetId: ke
      };
    case Be.ContractCreated:
      return {
        type: Be.ContractCreated,
        contractId: V(e.contractId),
        stateRoot: V(e.stateRoot)
      };
    default:
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, sB = (e) => "utxoId" in e, iB = (e) => "recipient" in e, Nc = (e) => "id" in e, oB = (e) => "recipient" in e, rE = (e) => e.type === ue.Revert && e.val.toString("hex") === Ju, sE = (e) => e.type === ue.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", iE = (e) => e.reduce(
  (t, n) => (rE(n) && t.missingOutputVariables.push(n), sE(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || ke;
function oE(e) {
  var n, r, s, i, o, c, d, l, I, g, C, x, D, b;
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
        id: xe((l = e.contract) == null ? void 0 : l.id),
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
        from: xe((C = e.contract) == null ? void 0 : C.id),
        to: xe(e.toAddress || ((x = e.to) == null ? void 0 : x.id)),
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
      const F = xe(e.sender), S = xe(e.recipient), J = xe(e.nonce), T = Q(e.amount), j = e.data ? Y(e.data) : Uint8Array.from([]), M = xe(e.digest), k = _s.getMessageId({
        sender: F,
        recipient: S,
        nonce: J,
        amount: T,
        data: j
      });
      return {
        type: ue.MessageOut,
        sender: F,
        recipient: S,
        amount: T,
        nonce: J,
        data: j,
        digest: M,
        messageId: k
      };
    }
    case "MINT": {
      const F = xe((D = e.contract) == null ? void 0 : D.id), S = xe(e.subId), J = Or.getAssetId(F, S);
      return {
        type: ue.Mint,
        subId: S,
        contractId: F,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const F = xe((b = e.contract) == null ? void 0 : b.id), S = xe(e.subId), J = ao.getAssetId(F, S);
      return {
        type: ue.Burn,
        subId: S,
        contractId: F,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new v(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var aE = "https://fuellabs.github.io/block-explorer-v2", cE = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, aB = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || aE, d = [
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
  ], l = d.filter((j) => !!j.value).map(({ key: j, value: M }) => ({
    key: j,
    value: M
  })), I = l.length > 0;
  if (l.length > 1)
    throw new v(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && l.length > 0) {
    const j = d.map(({ key: M }) => M).join(", ");
    throw new v(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const g = I ? cE(
    l[0].key,
    l[0].value
  ) : "", C = /^\/|\/$/gm, x = n ? n.replace(C, "") : g, D = c.replace(C, ""), b = r == null ? void 0 : r.replace(C, ""), F = b ? encodeURIComponent(b) : void 0, S = D.match(/^https?:\/\//) ? "" : "https://", J = b != null && b.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${D}/${x}${F ? `?providerUrl=${J}${F}` : ""}`;
}, zn = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), b0 = (e) => e.filter(
  (r) => r.type === ue.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function Bn(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function AE(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    Bn(t, n.vmInitialization).add(
      Bn(Y(o.predicate).length, n.contractRoot)
    ).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function Q0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = Bn(i, t.vmInitialization), c = Q(i).mul(n), d = AE(r, i, t);
  return o.add(c).add(d).add(s).maxU64();
}
function ia(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function x0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = Bn(r, e.contractRoot), i = Bn(t, e.stateRoot), o = Bn(n, e.s256), c = Q(4 + 32 + 32 + 32), d = Bn(c, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function v0({
  gasCosts: e,
  txBytesSize: t
}) {
  return Bn(t, e.s256);
}
function Eo(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = V(e[t]);
        break;
      case "Array":
        e[t] = Eo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Eo(e[t]);
        break;
    }
  }), e;
}
function uE(e) {
  return Eo(Pr(e));
}
function dE(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var cB = (e) => Number(BigInt(e) - BigInt(2 ** 62) - BigInt(10)), hE = (e) => (BigInt(e) + BigInt(2 ** 62) + BigInt(10)).toString(), AB = class extends Error {
  constructor() {
    super(...arguments);
    R(this, "name", "ChangeOutputCollisionError");
    R(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, lE = class extends Error {
  constructor(t) {
    super();
    R(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, uB = class extends Error {
  constructor(t) {
    super();
    R(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, fE = (e) => {
  const t = Y(e);
  return {
    data: V(t),
    dataLength: t.length
  };
}, Ai = class {
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
    return e.gasPrice && (t += Yt.GasPrice, n.push({ data: e.gasPrice, type: Yt.GasPrice })), e.witnessLimit && (t += Yt.WitnessLimit, n.push({ data: e.witnessLimit, type: Yt.WitnessLimit })), e.maturity > 0 && (t += Yt.Maturity, n.push({ data: e.maturity, type: Yt.Maturity })), e.maxFee && (t += Yt.MaxFee, n.push({ data: e.maxFee, type: Yt.MaxFee })), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(tE)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(nE)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(fE)) ?? [], { policyTypes: r, policies: s } = Ai.getPolicyMeta(this);
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
    return this.witnesses.push(_t([ke, ke])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = me.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new lE(e);
    this.witnesses[e] = t;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (e) => e.type === Qe.Coin
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
    const t = xr(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case Qe.Coin:
          return V(r.owner) === t.toB256();
        case Qe.Message:
          return V(r.recipient) === t.toB256();
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
      type: Qe.Coin,
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
    const { recipient: n, sender: r, amount: s } = e, i = wt;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.createWitness()));
    const c = {
      ...e,
      type: Qe.Message,
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
    return Nc(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
    return Nc(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
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
      to: xr(e).toB256(),
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
    return t.map(ta).forEach((n) => {
      this.pushOutput({
        type: Be.Coin,
        to: xr(e).toB256(),
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
      (r) => V(r.assetId) === t
    ) || this.pushOutput({
      type: Be.Change,
      to: xr(e).toB256(),
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
    return Q0({
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
    return ia({
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
  fundWithFakeUtxos(e) {
    let t = 0;
    const n = () => {
      const i = String(t++);
      return ke.slice(0, -i.length).concat(i);
    }, r = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const c = r(i);
      c && "assetId" in c ? (c.id = n(), c.amount = o) : this.addResources([
        {
          id: n(),
          amount: o,
          assetId: i,
          owner: me.fromRandom(),
          maturity: 0,
          blockCreated: Q(1),
          txCreatedIdx: Q(1)
        }
      ]);
    };
    s(wt, Q(1e11)), e.forEach((i) => s(i.assetId, i.amount));
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
    return uE(this);
  }
  /**
   * @hidden
   *
   * Determines whether the transaction has a predicate input.
   *
   * @returns Whether the transaction has a predicate input.
   */
  hasPredicateInput() {
    return !!this.inputs.find(
      (e) => "predicate" in e && e.predicate && e.predicate !== Y("0x")
    );
  }
};
function F0(e, t) {
  const n = e.toTransaction();
  n.type === Ct.Script && (n.receiptsRoot = ke), n.inputs = n.inputs.map((i) => {
    const o = Pr(i);
    switch (o.type) {
      case Qe.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = Q(0), o;
      case Qe.Message:
        return o.predicateGasUsed = Q(0), o;
      case Qe.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = ke, o.outputIndex = 0, o.balanceRoot = ke, o.stateRoot = ke, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Pr(i);
    switch (o.type) {
      case Be.Contract:
        return o.balanceRoot = ke, o.stateRoot = ke, o;
      case Be.Change:
        return o.amount = Q(0), o;
      case Be.Variable:
        return o.to = ke, o.amount = Q(0), o.assetId = ke, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = qp(t), s = _t([r, new Qn().encode(n)]);
  return Me(s);
}
var gE = (e) => {
  const t = new Uint8Array(32);
  return t.set(Y(e)), t;
}, pE = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: V(t),
    value: V(gE(n))
  };
}, wo = class extends Ai {
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
    R(this, "type", Ct.Create);
    /** Witness index of contract bytecode to create */
    R(this, "bytecodeWitnessIndex");
    /** Salt */
    R(this, "salt");
    /** List of storage slots to initialize */
    R(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = V(n ?? ke), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(pE)) ?? [];
    return {
      type: Ct.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? V(this.salt) : ke,
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
    return F0(this, t);
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
    return x0({
      contractBytesSize: Q(Y(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Sc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Y("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, mE = {
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
  bytes: Y("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, Kn = class extends Ai {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    R(this, "type", Ct.Script);
    /** Gas limit for transaction */
    R(this, "gasLimit");
    /** Script to execute */
    R(this, "script");
    /** Script input data (parameters) */
    R(this, "scriptData");
    this.gasLimit = Q(r), this.script = Y(t ?? Sc.bytes), this.scriptData = Y(n ?? Sc.encodeScriptData());
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
    const t = Y(this.script ?? "0x"), n = Y(this.scriptData ?? "0x");
    return {
      type: Ct.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: t.length,
      scriptDataLength: n.length,
      receiptsRoot: ke,
      script: V(t),
      scriptData: V(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === Qe.Contract
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
    return ia({
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
    const n = xr(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: Qe.Contract,
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
    return F0(this, t);
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
    return v0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Lt = (e) => {
  if (e instanceof Kn || e instanceof wo)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Ct.Script:
      return Kn.from(e);
    case Ct.Create:
      return wo.from(e);
    default:
      throw new v(N.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, EE = (e) => {
  var P, $;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), c = Y(n), [d] = new Qn().decode(c, 0);
  if (d.type === Ct.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: l, witnesses: I, inputs: g, policies: C } = d;
  let x = Q(0), D = Q(0);
  if (l === Ct.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, ee = Q(Y(I[U].data).length);
    x = x0({
      contractBytesSize: ee,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: c.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (D = U), x = v0({
      gasCosts: r,
      txBytesSize: c.length
    });
  }
  const b = Q0({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: g,
    metadataGas: x,
    txBytesSize: c.length
  }), F = Q((P = C.find((U) => U.type === Yt.GasPrice)) == null ? void 0 : P.data), S = ($ = C.find((U) => U.type === Yt.WitnessLimit)) == null ? void 0 : $.data, J = I.reduce((U, H) => U + H.dataLength, 0), T = ia({
    gasPerByte: i,
    minGas: b,
    witnessesLength: J,
    gasLimit: D,
    witnessLimit: S
  }), j = zn(t, F, o), M = zn(b, F, o), k = zn(T, F, o);
  return {
    fee: M.add(j),
    minFee: M,
    maxFee: k,
    feeFromGasUsed: j
  };
}, wE = (e) => {
  const t = I0.fromString(e, 10).toUnix();
  return new Date(t * 1e3);
}, dB = (e) => I0.fromUnix(Math.floor(e.getTime() / 1e3)).toString(10), IE = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var g;
  const s = new bn(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const C = Q(t.param2).sub(ni({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let l;
  if (d) {
    const C = o.decodeArguments(d);
    C && (l = c.reduce((x, D, b) => {
      const F = C[b], S = D.name;
      return S ? {
        ...x,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(F))
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
function yE(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function oa(e, t) {
  return e.filter((n) => n.type === t);
}
function BE(e) {
  return oa(e, Qe.Coin);
}
function CE(e) {
  return oa(e, Qe.Message);
}
function bE(e) {
  return yE(e, [Qe.Coin, Qe.Message]);
}
function QE(e) {
  return oa(e, Qe.Contract);
}
function Us(e, t) {
  const n = BE(e), r = CE(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function xE(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Qe.Contract)
      throw new v(
        N.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Ur(e) {
  return e.type === Qe.Coin ? e.owner.toString() : e.type === Qe.Message ? e.recipient.toString() : "";
}
function es(e, t) {
  return e.filter((n) => n.type === t);
}
function vE(e) {
  return es(e, Be.ContractCreated);
}
function D0(e) {
  return es(e, Be.Coin);
}
function FE(e) {
  return es(e, Be.Change);
}
function DE(e) {
  return es(e, Be.Contract);
}
function hB(e) {
  return es(e, Be.Variable);
}
var RE = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(RE || {}), NE = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(NE || {}), SE = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.contractTransfer = "Contract transfer", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(SE || {}), _E = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(_E || {}), kE = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(kE || {});
function ui(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function R0(e) {
  switch (e) {
    case Ct.Mint:
      return "Mint";
    case Ct.Create:
      return "Create";
    case Ct.Script:
      return "Script";
    default:
      throw new v(
        N.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function aa(e, t) {
  return R0(e) === t;
}
function ME(e) {
  return aa(
    e,
    "Mint"
    /* Mint */
  );
}
function N0(e) {
  return aa(
    e,
    "Create"
    /* Create */
  );
}
function S0(e) {
  return aa(
    e,
    "Script"
    /* Script */
  );
}
function lB(e) {
  return (t) => e.assetId === t.assetId;
}
function OE(e) {
  return ui(e, ue.Call);
}
function LE(e) {
  return ui(e, ue.MessageOut);
}
var TE = (e, t) => {
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
function PE(e, t) {
  var n, r, s, i, o, c, d, l;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((d = e.to) == null ? void 0 : d.type) === ((l = t.to) == null ? void 0 : l.type);
}
function Pn(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => PE(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? TE(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function UE(e) {
  return ui(e, ue.TransferOut);
}
function GE({ receipts: e }) {
  return UE(e).reduce(
    (r, s) => Pn(r, {
      name: "Contract transfer",
      from: {
        type: 0,
        address: s.from
      },
      to: {
        type: 1,
        address: s.to
      },
      assetsSent: [
        {
          amount: s.amount,
          assetId: s.assetId
        }
      ]
    }),
    []
  );
}
function HE({
  inputs: e,
  receipts: t
}) {
  return LE(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = Us(e, o);
      if (c) {
        const d = Ur(c);
        return Pn(s, {
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
  const o = OE(n);
  return DE(t).reduce((l, I) => {
    const g = xE(e, I.inputIndex);
    return g ? o.reduce((x, D) => {
      var b;
      if (D.to === g.contractID) {
        const F = Us(e, D.assetId);
        if (F) {
          const S = Ur(F), J = [], T = r == null ? void 0 : r[g.contractID];
          return T && J.push(
            IE({
              abi: T,
              receipt: D,
              rawPayload: s,
              maxInputs: i
            })
          ), Pn(x, {
            name: "Contract call",
            from: {
              type: 1,
              address: S
            },
            to: {
              type: 0,
              address: D.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (b = D.amount) != null && b.isZero() ? void 0 : [
              {
                amount: D.amount,
                assetId: D.assetId
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
function _c({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  const r = D0(t), [s] = ui(
    n,
    ue.Transfer
  );
  let i = [];
  return s ? FE(t).forEach((c) => {
    const { assetId: d } = c, [l] = QE(e), I = Us(e, d);
    if (I && l) {
      const g = Ur(I);
      i = Pn(i, {
        name: "Transfer asset",
        from: {
          type: 1,
          address: g
        },
        to: {
          type: 0,
          address: l.contractID
        },
        assetsSent: [
          {
            assetId: d.toString(),
            amount: s.amount
          }
        ]
      });
    }
  }) : r.forEach((o) => {
    const c = Us(e, o.assetId);
    if (c) {
      const l = {
        name: "Transfer asset",
        from: {
          type: 1,
          address: Ur(c)
        },
        to: {
          type: 1,
          address: o.to.toString()
        },
        assetsSent: [
          {
            assetId: o.assetId.toString(),
            amount: o.amount
          }
        ]
      };
      i = Pn(i, l);
    }
  }), i;
}
function ZE(e) {
  return D0(e).reduce((r, s) => Pn(r, {
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
function YE({ inputs: e, outputs: t }) {
  const n = vE(t), r = bE(e)[0], s = Ur(r);
  return n.reduce((o, c) => Pn(o, {
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
function XE({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return N0(e) ? [
    ...YE({ inputs: t, outputs: n }),
    ..._c({ inputs: t, outputs: n, receipts: r })
  ] : S0(e) ? [
    ..._c({ inputs: t, outputs: n, receipts: r }),
    ...JE({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...GE({ receipts: r }),
    ...HE({ inputs: t, receipts: r })
  ] : [...ZE(n)];
}
var er = (e) => {
  const t = oE(e);
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
}, VE = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, jE = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, qE = (e) => {
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
        N.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, $E = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = qE(e.type), e.type) {
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
function di(e) {
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
    gasCosts: I
  } = e, g = b0(n), C = V(o), x = XE({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: d,
    maxInputs: l
  }), D = R0(i.type), { fee: b } = EE({
    gasUsed: g,
    rawPayload: C,
    consensusParameters: {
      gasCosts: I,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: F, isStatusPending: S, isStatusSuccess: J, blockId: T, status: j, time: M } = $E(c), k = VE(n), O = jE(n);
  let P;
  return M && (P = wE(M)), {
    id: t,
    fee: b,
    gasUsed: g,
    operations: x,
    type: D,
    blockId: T,
    time: M,
    status: j,
    receipts: n,
    mintedAssets: k,
    burnedAssets: O,
    isTypeMint: ME(i.type),
    isTypeCreate: N0(i.type),
    isTypeScript: S0(i.type),
    isStatusFailure: F,
    isStatusSuccess: J,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
var Io = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t) {
    /** Transaction ID */
    R(this, "id");
    /** Current provider */
    R(this, "provider");
    /** Gas used on the transaction */
    R(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    R(this, "gqlTransaction");
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
    const n = new Io(e, t);
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
      Y(e.rawPayload),
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
    ), r = ((l = t.receipts) == null ? void 0 : l.map(er)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), c = this.provider.getChain().consensusParameters.maxInputs;
    return di({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: Y(t.rawPayload),
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
      throw new v(
        N.TRANSACTION_FAILED,
        `Transaction failed: ${t.gqlTransaction.status.reason}`
      );
    return t;
  }
};
function WE(e, t) {
  return e.reduce((n, r) => (r.type === ue.LogData && n.push(t.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === ue.Log && n.push(t.decodeLog(new _().encode(r.val0), r.val1.toNumber(), r.id)[0]), n), []);
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
function _0(e, t, n = 0) {
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
      const d = zE(t, c);
      return await dE(d), _0(e, t, c)(...r);
    }
  };
}
var KE = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, ew = 10, tw = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: c, scriptParams: d, txParams: l, gasCosts: I } = r;
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
}, yo, k0, Kt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, im(this, yo), Wn(this, "operations"), Wn(this, "cache"), Wn(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new eE(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Kt.nodeInfoCache = {}, Kt.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return _0((...r) => {
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
    const n = new Kt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = Kt.chainInfoCache[this.url];
    if (!e)
      throw new v(
        N.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = Kt.nodeInfoCache[this.url];
    if (!e)
      throw new v(
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
    return Kt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = bd(e.nodeVersion);
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
    const e = Kt.getFetchFn(this.options), t = new _p.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return Wm((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? zm({
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
    } = await this.getChain(), n = new Sn(e, t.toNumber());
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
    return Kt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = tw(e);
    return Kt.chainInfoCache[this.url] = t, t;
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
    const r = Lt(e);
    om(this, yo, k0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const { gasUsed: s, minGasPrice: i } = await this.getTransactionCost(r, [], {
      estimateTxDependencies: !1,
      estimatePredicates: !1
    });
    if (Q(i).gt(Q(r.gasPrice)))
      throw new v(
        N.GAS_PRICE_TOO_LOW,
        `Gas price '${r.gasPrice}' is lower than the required: '${i}'.`
      );
    if (r.type === Ct.Script && Q(s).gt(Q(r.gasLimit)))
      throw new v(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r.gasLimit}' is lower than the required: '${s}'.`
      );
    const c = V(r.toTransactionBytes());
    if (n) {
      const l = this.operations.submitAndAwait({ encodedTransaction: c });
      for await (const { submitAndAwait: C } of l)
        if (C.type !== "SubmittedStatus")
          break;
      const I = r.getTransactionId(this.getChainId()), g = new Io(I, this);
      return await g.fetch(), g;
    }
    const {
      submit: { id: d }
    } = await this.operations.submit({ encodedTransaction: c });
    return new Io(d, this);
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
    const r = Lt(e);
    n && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map(er)
    };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    const t = V(e.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: t
    }), {
      estimatePredicates: { inputs: r }
    } = n;
    return r && r.forEach((s, i) => {
      "predicateGasUsed" in s && Q(s.predicateGasUsed).gt(0) && (e.inputs[i].predicateGasUsed = s.predicateGasUsed);
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
    let t = 0, n = 0, r = 0;
    if (e.type === Ct.Create)
      return;
    let s = e;
    s.hasPredicateInput() && (s = await this.estimatePredicates(s));
    do {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: V(s.toTransactionBytes()),
        utxoValidation: !1
      }), o = i.map(er), { missingOutputVariables: c, missingOutputContractIds: d } = iE(o);
      if (t = c.length, n = d.length, t === 0 && n === 0)
        return;
      s.addVariableOutputs(t), d.forEach(
        ({ contractId: l }) => s.addContractInputAndOutput(me.fromString(l))
      ), r += 1;
    } while (r < ew);
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
    const n = Lt(e);
    t && await this.estimateTxDependencies(n);
    const r = V(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map(er)
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
  async getTransactionCost(e, t = [], { estimateTxDependencies: n = !0, estimatePredicates: r = !0 } = {}) {
    const s = Lt(Pr(e)), i = this.getChain(), { gasPriceFactor: o, minGasPrice: c, maxGasPerTx: d } = this.getGasConfig(), l = Il(s.gasPrice, c), I = s.type === Ct.Script;
    s.hasPredicateInput() && r && (I && (s.gasLimit = Q(0)), await this.estimatePredicates(s));
    const g = s.calculateMinGas(i), C = s.calculateMaxGas(i, g), x = s.getCoinOutputsQuantities(), D = KE(x, t);
    s.fundWithFakeUtxos(D);
    let b = g, F = [];
    I ? (s.gasPrice = Q(0), s.gasLimit = Q(d.sub(C).toNumber() * 0.9), F = (await this.call(s, {
      estimateTxDependencies: n
    })).receipts, b = b0(F)) : b = g;
    const S = zn(
      b,
      l,
      o
    ).normalizeZeroToOne(), J = zn(g, l, o).normalizeZeroToOne(), T = zn(C, l, o).normalizeZeroToOne();
    return {
      requiredQuantities: D,
      receipts: F,
      gasUsed: b,
      minGasPrice: c,
      gasPrice: l,
      minGas: g,
      maxGas: C,
      usedFee: S,
      minFee: J,
      maxFee: T
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = me.fromAddressOrString(e), s = Lt(Pr(t)), i = await this.getTransactionCost(s, n);
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
    const r = me.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && V(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: Q(o.amount),
      owner: me.fromAddressOrString(o.owner),
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
    var d, l, I;
    const r = me.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((g) => V(g))) || [],
      utxos: ((l = n == null ? void 0 : n.utxos) == null ? void 0 : l.map((g) => V(g))) || []
    };
    if (this.cache) {
      const g = new Set(
        s.utxos.concat((I = this.cache) == null ? void 0 : I.getActiveData().map((C) => V(C)))
      );
      s.utxos = Array.from(g);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(ta).map(({ assetId: g, amount: C, max: x }) => ({
        assetId: V(g),
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
            sender: me.fromAddressOrString(g.sender),
            recipient: me.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: Q(g.amount),
            assetId: g.assetId,
            owner: me.fromAddressOrString(g.owner),
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
          return (s = new Qn().decode(Y(r.rawPayload), 0)) == null ? void 0 : s[0];
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
      Y(t.rawPayload),
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
      contract: me.fromAddressOrString(e).toB256(),
      asset: V(t)
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
      owner: me.fromAddressOrString(e).toB256(),
      assetId: V(t)
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
      filter: { owner: me.fromAddressOrString(e).toB256() }
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
      owner: me.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Mr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: Q(s.amount),
        data: s.data
      }),
      sender: me.fromAddressOrString(s.sender),
      recipient: me.fromAddressOrString(s.recipient),
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
      sender: I,
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
      sender: me.fromAddressOrString(I),
      recipient: me.fromAddressOrString(g),
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
      startTimestamp: t ? hE(t) : void 0
    });
    return Q(n);
  }
}, M0 = Kt;
yo = /* @__PURE__ */ new WeakSet();
k0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Qe.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Wn(M0, "chainInfoCache", {});
Wn(M0, "nodeInfoCache", {});
async function fB(e) {
  var C;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      N.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Qn().decode(
    Y(s.rawPayload),
    0
  ), o = ((C = s.receipts) == null ? void 0 : C.map(er)) || [], {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: I }
  } = n.getChain(), g = di({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: Y(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(c),
    gasPriceFactor: Q(d),
    abiMap: r,
    maxInputs: l,
    gasCosts: I
  });
  return {
    gqlTransaction: s,
    ...g
  };
}
async function gB(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, l = n.toTransaction(), I = n.toTransactionBytes();
  return di({
    receipts: s,
    transaction: l,
    transactionBytes: I,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: c
  });
}
async function pB(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: I }
  } = n.getChain();
  return {
    transactions: i.map((C) => {
      const { node: x } = C, { id: D, rawPayload: b, receipts: F, status: S } = x, [J] = new Qn().decode(Y(b), 0), T = (F == null ? void 0 : F.map(er)) || [], j = di({
        id: D,
        receipts: T,
        transaction: J,
        transactionBytes: Y(b),
        gqlTransactionStatus: S,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: d,
        maxInputs: l,
        gasCosts: I
      });
      return {
        gqlTransaction: x,
        ...j
      };
    }),
    pageInfo: o
  };
}
let le;
const O0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && O0.decode();
let Dr = null;
function L0() {
  return (Dr === null || Dr.byteLength === 0) && (Dr = new Uint8Array(le.memory.buffer)), Dr;
}
function nw(e, t) {
  return e = e >>> 0, O0.decode(L0().subarray(e, e + t));
}
function T0(e) {
  const t = le.ret(e);
  return Jt.__wrap(t);
}
function rw(e, t) {
  const n = le.retd(e, t);
  return Jt.__wrap(n);
}
function kc(e, t, n, r) {
  const s = le.call(e, t, n, r);
  return Jt.__wrap(s);
}
function sw(e, t, n) {
  const r = le.tr(e, t, n);
  return Jt.__wrap(r);
}
function Mc(e, t, n) {
  const r = le.addi(e, t, n);
  return Jt.__wrap(r);
}
function iw(e, t, n) {
  const r = le.muli(e, t, n);
  return Jt.__wrap(r);
}
function Rr(e, t, n) {
  const r = le.lw(e, t, n);
  return Jt.__wrap(r);
}
function ow(e, t, n) {
  const r = le.gtf(e, t, n);
  return Jt.__wrap(r);
}
function hs(e, t) {
  const n = le.movi(e, t);
  return Jt.__wrap(n);
}
let Nr = null;
function Oc() {
  return (Nr === null || Nr.byteLength === 0) && (Nr = new Int32Array(le.memory.buffer)), Nr;
}
function aw(e, t) {
  return e = e >>> 0, L0().subarray(e / 1, e / 1 + t);
}
const cw = Object.freeze({
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
class Jt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Jt.prototype);
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
      var t = Oc()[s / 4 + 0], n = Oc()[s / 4 + 1], r = aw(t, n).slice();
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
class Oe {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Oe.prototype);
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
    return n === 0 ? void 0 : Oe.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = le.regid_bal();
    return Oe.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = le.regid_cgas();
    return Oe.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = le.regid_err();
    return Oe.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = le.regid_flag();
    return Oe.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = le.regid_fp();
    return Oe.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = le.regid_ggas();
    return Oe.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = le.regid_hp();
    return Oe.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = le.regid_is();
    return Oe.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = le.regid_of();
    return Oe.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = le.regid_one();
    return Oe.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = le.regid_pc();
    return Oe.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = le.regid_ret();
    return Oe.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = le.regid_retl();
    return Oe.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = le.regid_sp();
    return Oe.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = le.regid_spp();
    return Oe.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = le.regid_writable();
    return Oe.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = le.regid_zero();
    return Oe.__wrap(t);
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
async function Aw(e, t) {
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
function uw() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(nw(t, n));
  }, e;
}
function dw(e, t) {
  return le = e.exports, P0.__wbindgen_wasm_module = t, Nr = null, Dr = null, le;
}
async function P0(e) {
  if (le !== void 0)
    return le;
  const t = uw(), { instance: n, module: r } = await Aw(await e, t);
  return dw(n, r);
}
function hw(e, t, n, r) {
  function s(g, C, x) {
    var D = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, b = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? D(g, C) : b(g);
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
    var I = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(I, r) : I;
  } else
    return s(i, r, !1);
}
function lw(e) {
  return hw(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function ca() {
  return await P0(lw());
}
ca();
var fw = [
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
], Ti = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", gw = (e) => fw.includes(e) ? e : e === "Revert(123)" ? "MismatchedSelector" : "unknown", pw = (e) => {
  if ((e == null ? void 0 : e.type) === "FailureStatus") {
    const t = gw(e.reason);
    return {
      doc: t !== "unknown" ? `${Ti}#variant.${t}` : Ti,
      reason: t
    };
  }
  return { doc: Ti, reason: "unknown" };
};
function Pi(e, t) {
  if (!e)
    throw new v(N.TRANSACTION_ERROR, t);
}
var Lc = {
  [ug]: "RequireFailed",
  [Ju]: "TransferToAddressFailed",
  [dg]: "SendMessageFailed",
  [hg]: "AssertEqFailed",
  [lg]: "AssertFailed",
  [fg]: "Unknown"
}, mw = (e) => {
  const t = e.val.toHex();
  return Lc[t] ? Lc[t] : void 0;
}, ts = class extends Error {
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
    R(this, "receipt");
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
}, Ew = class extends ts {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "RequireRevertError";
  }
}, ww = class extends ts {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "TransferToAddressRevertError";
  }
}, Iw = class extends ts {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "SendMessageRevertError";
  }
}, yw = class extends ts {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "AssertFailedRevertError";
  }
}, Bw = (e) => {
  const t = mw(e);
  if (t)
    switch (t) {
      case "RequireFailed":
        return new Ew(e, t);
      case "TransferToAddressFailed":
        return new ww(e, t);
      case "SendMessageFailed":
        return new Iw(e, t);
      case "AssertFailed":
        return new yw(e, t);
      default:
        return new ts(e, t);
    }
}, { warn: Cw } = console, bw = (e) => e.filter((t) => t.type === ue.Revert), Qw = class {
  constructor(e) {
    R(this, "revertReceipts");
    this.revertReceipts = bw(e);
  }
  assert(e) {
    const t = this.getError();
    if (t)
      throw t.cause = e, t;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && Cw(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), Bw(this.revertReceipts[0]);
  }
}, xw = (e, t) => typeof t == "bigint" ? t.toString() : t, vw = class extends Error {
  constructor(t, n, r) {
    var c;
    let s = "";
    (c = t == null ? void 0 : t.gqlTransaction) != null && c.status && (s = `${JSON.stringify(pw(t.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      t.receipts.map(({ type: d, ...l }) => ({ type: ue[d], ...l })),
      xw,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    R(this, "logs");
    this.logs = r, new Qw(t.receipts).assert(this);
  }
}, en, uA, U0 = (uA = class {
  constructor(...e) {
    gt(this, en, void 0);
    bt(this, en, e || []);
  }
  entries() {
    return be(this, en);
  }
  push(...e) {
    be(this, en).push(...e);
  }
  concat(e) {
    return be(this, en).concat(e);
  }
  extend(e) {
    be(this, en).push(...e);
  }
  toBytes() {
    return de(
      be(this, en).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return V(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(be(this, en), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, en = new WeakMap(), uA), Fw = (e) => Vo + ni({ maxInputs: e }), G0 = ne + _r + Of + ne + ne;
function Dw(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === ue.ScriptResult ? n = i : (i.type === ue.Return || i.type === ue.ReturnData || i.type === ue.Revert) && (r = i);
  }), !n)
    throw new v(
      N.TRANSACTION_ERROR,
      "The script call result does not contain a 'scriptResultReceipt'."
    );
  if (!r)
    throw new v(
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
function Aa(e, t, n = []) {
  try {
    const r = Dw(e);
    return t(r);
  } catch (r) {
    throw new vw(
      e,
      r.message,
      n
    );
  }
}
function Rw(e, t, n) {
  return Aa(
    e,
    (r) => {
      if (r.returnReceipt.type === ue.Revert)
        throw new v(
          N.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ue.Return && r.returnReceipt.type !== ue.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new v(
          N.SCRIPT_REVERTED,
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
    R(this, "bytes");
    /**
     * A function to encode the script data.
     */
    R(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    R(this, "scriptResultDecoder");
    this.bytes = Y(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return ni({ maxInputs: t }) + Vo + e;
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
    return ArrayBuffer.isView(t) ? t : (this.bytes = Y(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return Aa(e, this.scriptResultDecoder, t);
  }
}, H0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, Nw = ke, J0 = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new U0(
    hs(16, e),
    hs(17, n),
    Rr(17, 17, 0),
    hs(18, r)
  );
  return t ? i.push(
    hs(19, t),
    Rr(19, 19, 0),
    kc(16, 17, 18, 19)
  ) : i.push(kc(16, 17, 18, Oe.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Rr(21, Oe.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Rr(22, Oe.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    iw(22, 22, s.encodedLength),
    rw(21, 22)
  ]), i;
};
function Tc(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new U0();
  for (let r = 0; r < e.length; r += 1)
    n.extend(J0(e[r], t[r]).entries());
  return n.push(T0(1)), n.toBytes();
}
var Pc = (e) => e === ue.Return || e === ue.ReturnData, Sw = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === ue.Call && r === Nw && s === t
), _w = (e, t) => (n) => {
  if (Tt(n.code) !== 0)
    throw new v(
      N.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${e} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = Sw(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => Pc(o)).flatMap((o, c, d) => {
    var l;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === ue.Return)
      return [new _().encode(o.val)];
    if (o.type === ue.ReturnData) {
      const I = Y(o.data);
      if (t && Pc((l = d[c + 1]) == null ? void 0 : l.type)) {
        const g = d[c + 1];
        return de([I, Y(g.data)]);
      }
      return [I];
    }
    return [new Uint8Array()];
  });
}, kw = (e, t, n, r = []) => Aa(e, _w(t, n), r), Mw = (e) => e.reduce(
  (t, n) => {
    const r = { ...H0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + J0(r, s).byteLength();
  },
  Jt.size()
  // placeholder for single RET instruction which is added later
), Ow = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), Uc = (e, t) => new Gr(
  // Script to call the contract, start with stub size matching length of calls
  Tc(
    new Array(e.length).fill(H0),
    Ow(e)
  ),
  (n) => {
    var D;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = Mw(n), i = (8 - s % 8) % 8, o = s + i, c = Fw(t.toNumber()) + o, d = [];
    let l = c;
    const I = [], g = [];
    for (let b = 0; b < r; b += 1) {
      const F = n[b];
      I.push({
        isHeap: F.isOutputDataHeap,
        encodedLength: F.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: l,
        assetIdOffset: l + ne,
        gasForwardedOffset: F.gas ? l + ne + _r : 0,
        callDataOffset: l + ne + _r + S
      }), g.push(new _().encode(F.amount || 0)), g.push(new G().encode(((D = F.assetId) == null ? void 0 : D.toString()) || wt)), g.push(F.contractId.toBytes()), g.push(new _().encode(F.fnSelector)), F.gas && (g.push(new _().encode(F.gas)), S = ne), F.isInputDataPointer) {
        const T = l + G0 + S;
        g.push(new _().encode(T));
      }
      const J = Y(F.data);
      g.push(J), l = c + de(g).byteLength;
    }
    const C = Tc(d, I);
    return { data: de(g), script: C };
  },
  () => [new Uint8Array()]
);
function Lw(e) {
  const t = e.receipts.find((n) => n.type === ue.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var Z0 = class {
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
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = Lw(t);
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
      return Rw(e, n, t);
    const s = kw(
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
    return WE(e, n.interface);
  }
}, Y0 = class extends Z0 {
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
    return new Y0(
      t,
      n,
      i,
      s,
      r
    );
  }
}, Bo = class extends Z0 {
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
    return await new Bo(t, n, r);
  }
};
function Tw(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), c = e.getCallConfig().func.isInputDataPointer ? G0 : 0, d = i.encodeArguments(r, t + c);
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
var X0 = class {
  // flag to check if any of the callParams has gasLimit set
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new Kn();
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
    const n = t.maxInputs, r = Uc(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => Tw(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = Uc(this.functionInvocationScopes, e);
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
    await ca(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
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
    return n.gasPrice = Q(Tt(n.gasPrice) || Tt((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins());
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins(e) {
    var t;
    return this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (n) => n.type !== Qe.Coin
    ), await ((t = this.program.account) == null ? void 0 : t.fund(this.transactionRequest, this.requiredCoins, e)), this;
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
    Pi(this.program.account, "Wallet is required!");
    const e = this.getProvider(), t = await this.getTransactionRequest(), { maxFee: n, gasUsed: r } = await this.getTransactionCost(), { minGasPrice: s } = e.getGasConfig();
    this.setDefaultTxParams(t, s, r), await this.fundWithRequiredCoins(n);
    const i = await this.program.account.sendTransaction(t, {
      awaitExecution: !0
    });
    return Y0.build(
      this.functionInvocationScopes,
      i,
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
    if (Pi(this.program.account, "Wallet is required!"), !this.program.account.populateTransactionWitnessesSignature)
      return this.dryRun();
    const t = this.getProvider(), n = await this.getTransactionRequest(), { maxFee: r, gasUsed: s } = await this.getTransactionCost(), { minGasPrice: i } = t.getGasConfig();
    this.setDefaultTxParams(n, i, s), await this.fundWithRequiredCoins(r);
    const o = await this.program.account.simulateTransaction(n);
    return Bo.build(this.functionInvocationScopes, o, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    Pi(this.program.account, "Wallet is required!");
    const e = this.getProvider(), t = await this.getTransactionRequest(), { maxFee: n, gasUsed: r } = await this.getTransactionCost(), { minGasPrice: s } = e.getGasConfig();
    this.setDefaultTxParams(t, s, r), await this.fundWithRequiredCoins(n);
    const i = await e.call(t, {
      utxoValidation: !1
    });
    return await Bo.build(
      this.functionInvocationScopes,
      i,
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
    var i, o;
    const r = !!((i = this.txParameters) != null && i.gasLimit) || this.hasCallParamsGasLimit, s = !!((o = this.txParameters) != null && o.gasPrice);
    r || (e.gasLimit = n), s || (e.gasPrice = t);
  }
}, V0 = class extends X0 {
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
          N.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = ta(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, Pw = class extends X0 {
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
          N.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new v(
        N.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, Uw = class {
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
    this.interface = t instanceof bn ? t : new bn(t), this.id = me.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new V0(this, e, t);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new Pw(this, e);
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
}, Gw = class extends V0 {
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
}, mB = class extends ag {
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
    this.bytes = Y(t), this.interface = new bn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new Gw(this, this.interface.getFunction("main"), s)
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
        N.INVALID_CONFIGURABLE_CONSTANTS,
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
function EB(e) {
  return e;
}
var Hw = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(Hw || {}), Jw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
function Ar(e) {
  return Me(e);
}
var Zw = class {
  constructor(e, t, n, r, s, i = 0) {
    R(this, "left");
    R(this, "right");
    R(this, "parent");
    R(this, "hash");
    R(this, "data");
    R(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, Gc = Zw;
function Yw(e) {
  return Ar("0x00".concat(e.slice(2)));
}
function Xw(e, t) {
  return Ar("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function j0(e) {
  if (!e.length)
    return Jw;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = Yw(e[i]);
    t.push(new Gc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = Xw(n[o].hash, n[o + 1].hash);
      t[i] = new Gc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var Vw = "0x00", q0 = "0x01";
function jw(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(Ar(t).slice(2));
  return [Ar(n), n];
}
function Gn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Ar(n), n];
}
function Ui(e) {
  const t = q0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function qw(e) {
  const t = q0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Gi(e) {
  return e.slice(0, 4) === Vw;
}
var $w = class {
  constructor(e, t, n, r, s) {
    R(this, "SideNodes");
    R(this, "NonMembershipLeafData");
    R(this, "BitMask");
    R(this, "NumSideNodes");
    R(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, Ww = $w, zw = class {
  constructor(e, t, n) {
    R(this, "SideNodes");
    R(this, "NonMembershipLeafData");
    R(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, Kw = zw, Rt = "0x0000000000000000000000000000000000000000000000000000000000000000", rn = 256;
function Vn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function eI(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function tI(e, t) {
  let n = 0;
  for (let r = 0; r < rn && Vn(e, r) === Vn(t, r); r += 1)
    n += 1;
  return n;
}
function nI(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Rt ? t.push(0) : (n.push(r), t.push(1));
  return new Ww(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var rI = class {
  constructor() {
    R(this, "ms");
    R(this, "root");
    const e = {};
    this.ms = e, this.root = Rt, this.ms[this.root] = Rt;
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
    if (t === Rt)
      return [n, Rt, "", ""];
    let r = this.get(t);
    if (Gi(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let l = 0; l < rn; l += 1) {
      if ([s, i] = qw(r), Vn(e, l) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Rt) {
        r = "";
        break;
      }
      if (r = this.get(o), Gi(r))
        break;
    }
    const d = this.get(c);
    return [eI(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Rt)
      return this.root;
    const [s] = Ui(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", d = "", l = !1;
    for (let I = 0; I < t.length; I += 1)
      if (t[I] !== "") {
        if (c = t[I], o === "")
          if (d = this.get(c), Gi(d)) {
            i = c, o = c;
            continue;
          } else
            o = Rt, l = !0;
        !l && c === Rt || (l || (l = !0), Vn(e, t.length - 1 - I) === 1 ? [i, o] = Gn(c, o) : [i, o] = Gn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Rt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(Ar(t), t), [i, o] = jw(e, t), this.set(i, o), o = i;
    let c;
    if (r === Rt)
      c = rn;
    else {
      const [d] = Ui(s);
      c = tI(e, d);
    }
    c !== rn && (Vn(e, c) === 1 ? [i, o] = Gn(r, o) : [i, o] = Gn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < rn; d += 1) {
      let l;
      const I = rn - n.length;
      if (d - I < 0 || n[d - I] === "")
        if (c !== rn && c > rn - 1 - d)
          l = Rt;
        else
          continue;
      else
        l = n[d - I];
      Vn(e, rn - 1 - d) === 1 ? [i, o] = Gn(l, o) : [i, o] = Gn(o, l), this.set(i, o), o = i;
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
    if (n !== Rt) {
      const [d] = Ui(r);
      d !== e && (o = r);
    }
    return new Kw(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return nI(t);
  }
}, sI = Object.defineProperty, iI = (e, t) => {
  for (var n in t)
    sI(e, n, { get: t[n], enumerable: !0 });
}, oI = {};
iI(oI, {
  getContractId: () => z0,
  getContractRoot: () => $0,
  getContractStorageRoot: () => W0,
  hexlifyWithPrefix: () => Co
});
var $0 = (e) => {
  const n = Y(e), r = lA(n, 16384);
  return j0(r.map((s) => V(s)));
}, W0 = (e) => {
  const t = new rI();
  return e.forEach(({ key: n, value: r }) => t.update(Me(n), r)), t.root;
}, z0 = (e, t, n) => {
  const r = $0(Y(e));
  return Me(_t(["0x4655454C", t, r, n]));
}, Co = (e, t = !1) => {
  if (e.startsWith("0x"))
    return V(e);
  if (t)
    return V(`0x${e}`);
  throw new v(v.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, aI = class {
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
    this.bytecode = Y(e), t instanceof bn ? this.interface = t : this.interface = new bn(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new aI(this.bytecode, this.interface, e);
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
      key: Co(c, !0),
      value: Co(d, !0)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: Cn(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        N.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || W0(n.storageSlots), s = z0(this.bytecode, n.salt, r), i = new wo({
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
      throw new v(N.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new Uw(n, this.interface, this.account);
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = Y(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new v(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, wB = 9, IB = 3, yB = 9, ls = [
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
];
function bo(e) {
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
function cI(e) {
  return (1 << e) - 1;
}
function K0(e) {
  return (1 << e) - 1 << 8 - e;
}
function Hi(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function AI(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function uI(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & cI(8 - n)), n += 3);
  const r = e.length / 4, s = Y(Me(e))[0] & K0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function dI(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = Y(new Uint8Array(n));
  let s = 0;
  for (let l = 0; l < e.length; l += 1) {
    const I = t.indexOf(e[l].normalize("NFKD"));
    if (I === -1)
      throw new v(
        N.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[l]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      I & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = K0(o);
  if ((Y(Me(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new v(
      N.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var hI = bo("Bitcoin seed"), lI = "0x0488ade4", fI = "0x04358394", Hc = [12, 15, 18, 21, 24];
function Jc(e) {
  if (e.length !== 2048)
    throw new v(
      N.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function gI(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      N.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Ji(e) {
  if (!Hc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Hc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(N.INVALID_MNEMONIC, t);
  }
}
var gn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = ls) {
    R(this, "wordlist");
    this.wordlist = e, Jc(this.wordlist);
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
  static mnemonicToEntropy(e, t = ls) {
    const n = Hi(e);
    return Ji(n), V(dI(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = ls) {
    const n = Y(e);
    return Jc(t), gI(n), uI(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Ji(Hi(e));
    const n = bo(AI(e)), r = bo(`mnemonic${t}`);
    return mr(n, r, 2048, 64, "sha512");
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
    const t = Hi(e);
    let n = 0;
    try {
      Ji(t);
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
    const t = ls;
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
    const t = Y(e);
    if (t.length < 16 || t.length > 64)
      throw new v(
        N.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Y(pr("sha512", hI, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = gn.masterKeysFromSeed(e), r = Y(t ? fI : lI), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), l = _t([
      r,
      s,
      i,
      o,
      c,
      _t(["0x00", d])
    ]), I = Ro(Me(Me(l)), 0, 4);
    return EA(_t([l, I]));
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
    const n = t ? Me(_t([Cn(e), Y(t)])) : Cn(e);
    return gn.entropyToMnemonic(n);
  }
}, ed = gn;
function Zc(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function pI(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function td(e, ...t) {
  if (!pI(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function mI(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Zc(e.outputLen), Zc(e.blockLen);
}
function Gs(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function EI(e, t) {
  td(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Zi = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function nd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Yi = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), zt = (e, t) => e << 32 - t | e >>> t, wI = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!wI)
  throw new Error("Non little-endian hardware is not supported");
function II(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ua(e) {
  if (typeof e == "string" && (e = II(e)), !nd(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function yI(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!nd(s))
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
class rd {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function BI(e) {
  const t = (r) => e().update(ua(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function CI(e = 32) {
  if (Zi && typeof Zi.getRandomValues == "function")
    return Zi.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function bI(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
class QI extends rd {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Yi(this.buffer);
  }
  update(t) {
    Gs(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = ua(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Yi(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Gs(this), EI(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    bI(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Yi(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, I = this.get();
    if (l > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
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
const xI = (e, t, n) => e & t ^ ~e & n, vI = (e, t, n) => e & t ^ e & n ^ t & n, FI = /* @__PURE__ */ new Uint32Array([
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
]), hn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), ln = /* @__PURE__ */ new Uint32Array(64);
class DI extends QI {
  constructor() {
    super(64, 32, 8, !1), this.A = hn[0] | 0, this.B = hn[1] | 0, this.C = hn[2] | 0, this.D = hn[3] | 0, this.E = hn[4] | 0, this.F = hn[5] | 0, this.G = hn[6] | 0, this.H = hn[7] | 0;
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
      ln[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = ln[g - 15], x = ln[g - 2], D = zt(C, 7) ^ zt(C, 18) ^ C >>> 3, b = zt(x, 17) ^ zt(x, 19) ^ x >>> 10;
      ln[g] = b + ln[g - 7] + D + ln[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const C = zt(c, 6) ^ zt(c, 11) ^ zt(c, 25), x = I + C + xI(c, d, l) + FI[g] + ln[g] | 0, b = (zt(r, 2) ^ zt(r, 13) ^ zt(r, 22)) + vI(r, s, i) | 0;
      I = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, l, I);
  }
  roundClean() {
    ln.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const RI = /* @__PURE__ */ BI(() => new DI());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const sd = BigInt(0), hi = BigInt(1), NI = BigInt(2);
function tn(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const SI = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ur(e) {
  if (!tn(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += SI[e[n]];
  return t;
}
function id(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function da(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const nn = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Yc(e) {
  if (e >= nn._0 && e <= nn._9)
    return e - nn._0;
  if (e >= nn._A && e <= nn._F)
    return e - (nn._A - 10);
  if (e >= nn._a && e <= nn._f)
    return e - (nn._a - 10);
}
function dr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Yc(e.charCodeAt(i)), c = Yc(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Mn(e) {
  return da(ur(e));
}
function ha(e) {
  if (!tn(e))
    throw new Error("Uint8Array expected");
  return da(ur(Uint8Array.from(e).reverse()));
}
function hr(e, t) {
  return dr(e.toString(16).padStart(t * 2, "0"));
}
function la(e, t) {
  return hr(e, t).reverse();
}
function _I(e) {
  return dr(id(e));
}
function Xt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = dr(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (tn(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Hr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!tn(i))
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
function kI(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function MI(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function OI(e) {
  let t;
  for (t = 0; e > sd; e >>= hi, t += 1)
    ;
  return t;
}
function LI(e, t) {
  return e >> BigInt(t) & hi;
}
const TI = (e, t, n) => e | (n ? hi : sd) << BigInt(t), fa = (e) => (NI << BigInt(e - 1)) - hi, Xi = (e) => new Uint8Array(e), Xc = (e) => Uint8Array.from(e);
function od(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Xi(e), s = Xi(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...g) => n(s, r, ...g), d = (g = Xi()) => {
    s = c(Xc([0]), g), r = c(), g.length !== 0 && (s = c(Xc([1]), g), r = c());
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
    return Hr(...C);
  };
  return (g, C) => {
    o(), d(g);
    let x;
    for (; !(x = C(l())); )
      d();
    return o(), x;
  };
}
const PI = {
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
function ns(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = PI[i];
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
const UI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: LI,
  bitLen: OI,
  bitMask: fa,
  bitSet: TI,
  bytesToHex: ur,
  bytesToNumberBE: Mn,
  bytesToNumberLE: ha,
  concatBytes: Hr,
  createHmacDrbg: od,
  ensureBytes: Xt,
  equalBytes: kI,
  hexToBytes: dr,
  hexToNumber: da,
  isBytes: tn,
  numberToBytesBE: hr,
  numberToBytesLE: la,
  numberToHexUnpadded: id,
  numberToVarBytesBE: _I,
  utf8ToBytes: MI,
  validateObject: ns
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const mt = BigInt(0), Pe = BigInt(1), Nn = BigInt(2), GI = BigInt(3), Qo = BigInt(4), Vc = BigInt(5), jc = BigInt(8);
BigInt(9);
BigInt(16);
function Qt(e, t) {
  const n = e % t;
  return n >= mt ? n : t + n;
}
function HI(e, t, n) {
  if (n <= mt || t < mt)
    throw new Error("Expected power/modulo > 0");
  if (n === Pe)
    return mt;
  let r = Pe;
  for (; t > mt; )
    t & Pe && (r = r * e % n), e = e * e % n, t >>= Pe;
  return r;
}
function Mt(e, t, n) {
  let r = e;
  for (; t-- > mt; )
    r *= r, r %= n;
  return r;
}
function xo(e, t) {
  if (e === mt || t <= mt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Qt(e, t), r = t, s = mt, i = Pe;
  for (; n !== mt; ) {
    const c = r / n, d = r % n, l = s - i * c;
    r = n, n = d, s = i, i = l;
  }
  if (r !== Pe)
    throw new Error("invert: does not exist");
  return Qt(s, t);
}
function JI(e) {
  const t = (e - Pe) / Nn;
  let n, r, s;
  for (n = e - Pe, r = 0; n % Nn === mt; n /= Nn, r++)
    ;
  for (s = Nn; s < e && HI(s, t, e) !== e - Pe; s++)
    ;
  if (r === 1) {
    const o = (e + Pe) / Qo;
    return function(d, l) {
      const I = d.pow(l, o);
      if (!d.eql(d.sqr(I), l))
        throw new Error("Cannot find square root");
      return I;
    };
  }
  const i = (n + Pe) / Nn;
  return function(c, d) {
    if (c.pow(d, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let l = r, I = c.pow(c.mul(c.ONE, s), n), g = c.pow(d, i), C = c.pow(d, n);
    for (; !c.eql(C, c.ONE); ) {
      if (c.eql(C, c.ZERO))
        return c.ZERO;
      let x = 1;
      for (let b = c.sqr(C); x < l && !c.eql(b, c.ONE); x++)
        b = c.sqr(b);
      const D = c.pow(I, Pe << BigInt(l - x - 1));
      I = c.sqr(D), g = c.mul(g, D), C = c.mul(C, I), l = x;
    }
    return g;
  };
}
function ZI(e) {
  if (e % Qo === GI) {
    const t = (e + Pe) / Qo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % jc === Vc) {
    const t = (e - Vc) / jc;
    return function(r, s) {
      const i = r.mul(s, Nn), o = r.pow(i, t), c = r.mul(s, o), d = r.mul(r.mul(c, Nn), o), l = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return JI(e);
}
const YI = [
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
function XI(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = YI.reduce((r, s) => (r[s] = "function", r), t);
  return ns(e, n);
}
function VI(e, t, n) {
  if (n < mt)
    throw new Error("Expected power > 0");
  if (n === mt)
    return e.ONE;
  if (n === Pe)
    return t;
  let r = e.ONE, s = t;
  for (; n > mt; )
    n & Pe && (r = e.mul(r, s)), s = e.sqr(s), n >>= Pe;
  return r;
}
function jI(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function ad(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function qI(e, t, n = !1, r = {}) {
  if (e <= mt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = ad(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = ZI(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: fa(s),
    ZERO: mt,
    ONE: Pe,
    create: (d) => Qt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return mt <= d && d < e;
    },
    is0: (d) => d === mt,
    isOdd: (d) => (d & Pe) === Pe,
    neg: (d) => Qt(-d, e),
    eql: (d, l) => d === l,
    sqr: (d) => Qt(d * d, e),
    add: (d, l) => Qt(d + l, e),
    sub: (d, l) => Qt(d - l, e),
    mul: (d, l) => Qt(d * l, e),
    pow: (d, l) => VI(c, d, l),
    div: (d, l) => Qt(d * xo(l, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, l) => d + l,
    subN: (d, l) => d - l,
    mulN: (d, l) => d * l,
    inv: (d) => xo(d, e),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => jI(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, l, I) => I ? l : d,
    toBytes: (d) => n ? la(d, i) : hr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? ha(d) : Mn(d);
    }
  });
  return Object.freeze(c);
}
function cd(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Ad(e) {
  const t = cd(e);
  return t + Math.ceil(t / 2);
}
function $I(e, t, n = !1) {
  const r = e.length, s = cd(t), i = Ad(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Mn(e) : ha(e), c = Qt(o, t - Pe) + Pe;
  return n ? la(c, s) : hr(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const WI = BigInt(0), Vi = BigInt(1);
function zI(e, t) {
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
      for (; i > WI; )
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
      let l = s, I = l;
      for (let g = 0; g < o; g++) {
        I = l, d.push(I);
        for (let C = 1; C < c; C++)
          I = I.add(l), d.push(I);
        l = I.double();
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
      let l = e.ZERO, I = e.BASE;
      const g = BigInt(2 ** s - 1), C = 2 ** s, x = BigInt(s);
      for (let D = 0; D < c; D++) {
        const b = D * d;
        let F = Number(o & g);
        o >>= x, F > d && (F -= C, o += Vi);
        const S = b, J = b + Math.abs(F) - 1, T = D % 2 !== 0, j = F < 0;
        F === 0 ? I = I.add(n(T, i[S])) : l = l.add(n(j, i[J]));
      }
      return { p: l, f: I };
    },
    wNAFCached(s, i, o, c) {
      const d = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, d), d !== 1 && i.set(s, c(l))), this.wNAF(d, l, o);
    }
  };
}
function ud(e) {
  return XI(e.Fp), ns(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...ad(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function KI(e) {
  const t = ud(e);
  ns(t, {
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
const { bytesToNumberBE: ey, hexToBytes: ty } = UI, kn = {
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
    return { d: ey(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = kn, n = typeof e == "string" ? ty(e) : e;
    if (!tn(n))
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
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, n = (l) => {
      const I = l.toString(16);
      return I.length & 1 ? `0${I}` : I;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${c}${r}`;
  }
}, sn = BigInt(0), Ot = BigInt(1);
BigInt(2);
const qc = BigInt(3);
BigInt(4);
function ny(e) {
  const t = KI(e), { Fp: n } = t, r = t.toBytes || ((D, b, F) => {
    const S = b.toAffine();
    return Hr(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = t.fromBytes || ((D) => {
    const b = D.subarray(1), F = n.fromBytes(b.subarray(0, n.BYTES)), S = n.fromBytes(b.subarray(n.BYTES, 2 * n.BYTES));
    return { x: F, y: S };
  });
  function i(D) {
    const { a: b, b: F } = t, S = n.sqr(D), J = n.mul(S, D);
    return n.add(n.add(J, n.mul(D, b)), F);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(D) {
    return typeof D == "bigint" && sn < D && D < t.n;
  }
  function c(D) {
    if (!o(D))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(D) {
    const { allowedPrivateKeyLengths: b, nByteLength: F, wrapPrivateKey: S, n: J } = t;
    if (b && typeof D != "bigint") {
      if (tn(D) && (D = ur(D)), typeof D != "string" || !b.includes(D.length))
        throw new Error("Invalid key");
      D = D.padStart(F * 2, "0");
    }
    let T;
    try {
      T = typeof D == "bigint" ? D : Mn(Xt("private key", D, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof D}`);
    }
    return S && (T = Qt(T, J)), c(T), T;
  }
  const l = /* @__PURE__ */ new Map();
  function I(D) {
    if (!(D instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(b, F, S) {
      if (this.px = b, this.py = F, this.pz = S, b == null || !n.isValid(b))
        throw new Error("x required");
      if (F == null || !n.isValid(F))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: F, y: S } = b || {};
      if (!b || !n.isValid(F) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (b instanceof g)
        throw new Error("projective point not allowed");
      const J = (T) => n.eql(T, n.ZERO);
      return J(F) && J(S) ? g.ZERO : new g(F, S, n.ONE);
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
      const F = n.invertBatch(b.map((S) => S.pz));
      return b.map((S, J) => S.toAffine(F[J])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const F = g.fromAffine(s(Xt("pointHex", b)));
      return F.assertValidity(), F;
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
      const { x: b, y: F } = this.toAffine();
      if (!n.isValid(b) || !n.isValid(F))
        throw new Error("bad point: x or y not FE");
      const S = n.sqr(F), J = i(b);
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
      I(b);
      const { px: F, py: S, pz: J } = this, { px: T, py: j, pz: M } = b, k = n.eql(n.mul(F, M), n.mul(T, J)), O = n.eql(n.mul(S, M), n.mul(j, J));
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
      const { a: b, b: F } = t, S = n.mul(F, qc), { px: J, py: T, pz: j } = this;
      let M = n.ZERO, k = n.ZERO, O = n.ZERO, P = n.mul(J, J), $ = n.mul(T, T), U = n.mul(j, j), H = n.mul(J, T);
      return H = n.add(H, H), O = n.mul(J, j), O = n.add(O, O), M = n.mul(b, O), k = n.mul(S, U), k = n.add(M, k), M = n.sub($, k), k = n.add($, k), k = n.mul(M, k), M = n.mul(H, M), O = n.mul(S, O), U = n.mul(b, U), H = n.sub(P, U), H = n.mul(b, H), H = n.add(H, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, U), P = n.mul(P, H), k = n.add(k, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, H), M = n.sub(M, P), O = n.mul(U, $), O = n.add(O, O), O = n.add(O, O), new g(M, k, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      I(b);
      const { px: F, py: S, pz: J } = this, { px: T, py: j, pz: M } = b;
      let k = n.ZERO, O = n.ZERO, P = n.ZERO;
      const $ = t.a, U = n.mul(t.b, qc);
      let H = n.mul(F, T), ee = n.mul(S, j), B = n.mul(J, M), a = n.add(F, S), A = n.add(T, j);
      a = n.mul(a, A), A = n.add(H, ee), a = n.sub(a, A), A = n.add(F, J);
      let h = n.add(T, M);
      return A = n.mul(A, h), h = n.add(H, B), A = n.sub(A, h), h = n.add(S, J), k = n.add(j, M), h = n.mul(h, k), k = n.add(ee, B), h = n.sub(h, k), P = n.mul($, A), k = n.mul(U, B), P = n.add(k, P), k = n.sub(ee, P), P = n.add(ee, P), O = n.mul(k, P), ee = n.add(H, H), ee = n.add(ee, H), B = n.mul($, B), A = n.mul(U, A), ee = n.add(ee, B), B = n.sub(H, B), B = n.mul($, B), A = n.add(A, B), H = n.mul(ee, A), O = n.add(O, H), H = n.mul(h, A), k = n.mul(a, k), k = n.sub(k, H), H = n.mul(a, ee), P = n.mul(h, P), P = n.add(P, H), new g(k, O, P);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(b) {
      return x.wNAFCached(this, l, b, (F) => {
        const S = n.invertBatch(F.map((J) => J.pz));
        return F.map((J, T) => J.toAffine(S[T])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const F = g.ZERO;
      if (b === sn)
        return F;
      if (c(b), b === Ot)
        return this;
      const { endo: S } = t;
      if (!S)
        return x.unsafeLadder(this, b);
      let { k1neg: J, k1: T, k2neg: j, k2: M } = S.splitScalar(b), k = F, O = F, P = this;
      for (; T > sn || M > sn; )
        T & Ot && (k = k.add(P)), M & Ot && (O = O.add(P)), P = P.double(), T >>= Ot, M >>= Ot;
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
    multiply(b) {
      c(b);
      let F = b, S, J;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: M, k2neg: k, k2: O } = T.splitScalar(F);
        let { p: P, f: $ } = this.wNAF(M), { p: U, f: H } = this.wNAF(O);
        P = x.constTimeNegate(j, P), U = x.constTimeNegate(k, U), U = new g(n.mul(U.px, T.beta), U.py, U.pz), S = P.add(U), J = $.add(H);
      } else {
        const { p: j, f: M } = this.wNAF(F);
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
    multiplyAndAddUnsafe(b, F, S) {
      const J = g.BASE, T = (M, k) => k === sn || k === Ot || !M.equals(J) ? M.multiplyUnsafe(k) : M.multiply(k), j = T(this, F).add(T(b, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      const { px: F, py: S, pz: J } = this, T = this.is0();
      b == null && (b = T ? n.ONE : n.inv(J));
      const j = n.mul(F, b), M = n.mul(S, b), k = n.mul(J, b);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(k, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: M };
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: F } = t;
      if (b === Ot)
        return !0;
      if (F)
        return F(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: F } = t;
      return b === Ot ? this : F ? F(g, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(b = !0) {
      return this.assertValidity(), r(g, this, b);
    }
    toHex(b = !0) {
      return ur(this.toRawBytes(b));
    }
  }
  g.BASE = new g(t.Gx, t.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, x = zI(g, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: g,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function ry(e) {
  const t = ud(e);
  return ns(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function sy(e) {
  const t = ry(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return sn < A && A < n.ORDER;
  }
  function c(A) {
    return Qt(A, r);
  }
  function d(A) {
    return xo(A, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: I, weierstrassEquation: g, isWithinCurveOrder: C } = ny({
    ...t,
    toBytes(A, h, m) {
      const f = h.toAffine(), w = n.toBytes(f.x), y = Hr;
      return m ? y(Uint8Array.from([h.hasEvenY() ? 2 : 3]), w) : y(Uint8Array.from([4]), w, n.toBytes(f.y));
    },
    fromBytes(A) {
      const h = A.length, m = A[0], f = A.subarray(1);
      if (h === s && (m === 2 || m === 3)) {
        const w = Mn(f);
        if (!o(w))
          throw new Error("Point is not on curve");
        const y = g(w);
        let p = n.sqrt(y);
        const u = (p & Ot) === Ot;
        return (m & 1) === 1 !== u && (p = n.neg(p)), { x: w, y: p };
      } else if (h === i && m === 4) {
        const w = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: w, y };
      } else
        throw new Error(`Point of length ${h} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (A) => ur(hr(A, t.nByteLength));
  function D(A) {
    const h = r >> Ot;
    return A > h;
  }
  function b(A) {
    return D(A) ? c(-A) : A;
  }
  const F = (A, h, m) => Mn(A.slice(h, m));
  class S {
    constructor(h, m, f) {
      this.r = h, this.s = m, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(h) {
      const m = t.nByteLength;
      return h = Xt("compactSignature", h, m * 2), new S(F(h, 0, m), F(h, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(h) {
      const { r: m, s: f } = kn.toSig(Xt("DER", h));
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
      const { r: m, s: f, recovery: w } = this, y = O(Xt("msgHash", h));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const p = w === 2 || w === 3 ? m + t.n : m;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = w & 1 ? "03" : "02", E = l.fromHex(u + x(p)), Z = d(p), X = c(-y * Z), z = c(f * Z), q = l.BASE.multiplyAndAddUnsafe(E, X, z);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return D(this.s);
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
      return x(this.r) + x(this.s);
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
      const A = Ad(t.n);
      return $I(t.randomBytes(A), t.n);
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
    const h = tn(A), m = typeof A == "string", f = (h || m) && A.length;
    return h ? f === s || f === i : m ? f === 2 * s || f === 2 * i : A instanceof l;
  }
  function M(A, h, m = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(h))
      throw new Error("second arg must be public key");
    return l.fromHex(h).multiply(I(A)).toRawBytes(m);
  }
  const k = t.bits2int || function(A) {
    const h = Mn(A), m = A.length * 8 - t.nBitLength;
    return m > 0 ? h >> BigInt(m) : h;
  }, O = t.bits2int_modN || function(A) {
    return c(k(A));
  }, P = fa(t.nBitLength);
  function $(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(sn <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return hr(A, t.nByteLength);
  }
  function U(A, h, m = H) {
    if (["recovered", "canonical"].some((se) => se in m))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: w } = t;
    let { lowS: y, prehash: p, extraEntropy: u } = m;
    y == null && (y = !0), A = Xt("msgHash", A), p && (A = Xt("prehashed msgHash", f(A)));
    const E = O(A), Z = I(h), X = [$(Z), $(E)];
    if (u != null) {
      const se = u === !0 ? w(n.BYTES) : u;
      X.push(Xt("extraEntropy", se));
    }
    const z = Hr(...X), q = E;
    function re(se) {
      const Se = k(se);
      if (!C(Se))
        return;
      const fe = d(Se), oe = l.BASE.multiply(Se).toAffine(), Re = c(oe.x);
      if (Re === sn)
        return;
      const he = c(fe * c(q + Re * Z));
      if (he === sn)
        return;
      let ge = (oe.x === Re ? 0 : 2) | Number(oe.y & Ot), qt = he;
      return y && D(he) && (qt = b(he), ge ^= 1), new S(Re, qt, ge);
    }
    return { seed: z, k2sig: re };
  }
  const H = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function B(A, h, m = H) {
    const { seed: f, k2sig: w } = U(A, h, m), y = t;
    return od(y.hash.outputLen, y.nByteLength, y.hmac)(f, w);
  }
  l.BASE._setWindowSize(8);
  function a(A, h, m, f = ee) {
    var oe;
    const w = A;
    if (h = Xt("msgHash", h), m = Xt("publicKey", m), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: p } = f;
    let u, E;
    try {
      if (typeof w == "string" || tn(w))
        try {
          u = S.fromDER(w);
        } catch (Re) {
          if (!(Re instanceof kn.Err))
            throw Re;
          u = S.fromCompact(w);
        }
      else if (typeof w == "object" && typeof w.r == "bigint" && typeof w.s == "bigint") {
        const { r: Re, s: he } = w;
        u = new S(Re, he);
      } else
        throw new Error("PARSE");
      E = l.fromHex(m);
    } catch (Re) {
      if (Re.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    p && (h = t.hash(h));
    const { r: Z, s: X } = u, z = O(h), q = d(X), re = c(z * q), se = c(Z * q), Se = (oe = l.BASE.multiplyAndAddUnsafe(E, re, se)) == null ? void 0 : oe.toAffine();
    return Se ? c(Se.x) === Z : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: M,
    sign: B,
    verify: a,
    ProjectivePoint: l,
    Signature: S,
    utils: J
  };
}
class dd extends rd {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, mI(t);
    const r = ua(n);
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
    return Gs(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Gs(this), td(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const hd = (e, t, n) => new dd(e, t).update(n).digest();
hd.create = (e, t) => new dd(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function iy(e) {
  return {
    hash: e,
    hmac: (t, ...n) => hd(e, t, yI(...n)),
    randomBytes: CI
  };
}
function oy(e, t) {
  const n = (r) => sy({ ...e, ...iy(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ld = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), $c = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), ay = BigInt(1), vo = BigInt(2), Wc = (e, t) => (e + t / vo) / t;
function cy(e) {
  const t = ld, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), l = e * e * e % t, I = l * l * e % t, g = Mt(I, n, t) * I % t, C = Mt(g, n, t) * I % t, x = Mt(C, vo, t) * l % t, D = Mt(x, s, t) * x % t, b = Mt(D, i, t) * D % t, F = Mt(b, c, t) * b % t, S = Mt(F, d, t) * F % t, J = Mt(S, c, t) * b % t, T = Mt(J, n, t) * I % t, j = Mt(T, o, t) * D % t, M = Mt(j, r, t) * l % t, k = Mt(M, vo, t);
  if (!Fo.eql(Fo.sqr(k), e))
    throw new Error("Cannot find square root");
  return k;
}
const Fo = qI(ld, void 0, void 0, { sqrt: cy }), pn = oy({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Fo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: $c,
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
      const t = $c, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -ay * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = Wc(i * e, t), d = Wc(-r * e, t);
      let l = Qt(e - c * n - d * s, t), I = Qt(-c * r - d * i, t);
      const g = l > o, C = I > o;
      if (g && (l = t - l), C && (I = t - I), l > o || I > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: l, k2neg: C, k2: I };
    }
  }
}, RI);
BigInt(0);
pn.ProjectivePoint;
var lr = class {
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
    const t = Vt(e, 32);
    this.privateKey = V(t), this.publicKey = V(pn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = V(pn.getPublicKey(t, !0)), this.address = me.fromPublicKey(this.publicKey);
  }
  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte. [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(e) {
    const t = pn.sign(Y(e), Y(this.privateKey)), n = Vt(`0x${t.r.toString(16)}`, 32), r = Vt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, _t([n, r]);
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = pn.ProjectivePoint.fromHex(Y(this.compressedPublicKey)), n = pn.ProjectivePoint.fromHex(Y(e));
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
    const n = Y(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new pn.Signature(BigInt(V(r)), BigInt(V(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Y(e)).toRawBytes(!1).slice(1);
    return V(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return me.fromPublicKey(lr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? l0(_t([Cn(32), Y(e)])) : Cn(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = pn.ProjectivePoint.fromHex(Y(e));
    return V(t.toRawBytes(!1).slice(1));
  }
};
let fs;
const Ay = new Uint8Array(16);
function uy() {
  if (!fs && (fs = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !fs))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return fs(Ay);
}
const Et = [];
for (let e = 0; e < 256; ++e)
  Et.push((e + 256).toString(16).slice(1));
function dy(e, t = 0) {
  return (Et[e[t + 0]] + Et[e[t + 1]] + Et[e[t + 2]] + Et[e[t + 3]] + "-" + Et[e[t + 4]] + Et[e[t + 5]] + "-" + Et[e[t + 6]] + Et[e[t + 7]] + "-" + Et[e[t + 8]] + Et[e[t + 9]] + "-" + Et[e[t + 10]] + Et[e[t + 11]] + Et[e[t + 12]] + Et[e[t + 13]] + Et[e[t + 14]] + Et[e[t + 15]]).toLowerCase();
}
const hy = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), zc = {
  randomUUID: hy
};
function ly(e, t, n) {
  if (zc.randomUUID && !t && !e)
    return zc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || uy)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return dy(r);
}
var fd = 2147483648, gd = V("0x0488ade4"), ga = V("0x0488b21e"), pd = V("0x04358394"), pa = V("0x043587cf");
function Kc(e) {
  return EA(_t([e, Ro(Me(Me(e)), 0, 4)]));
}
function fy(e = !1, t = !1) {
  return e ? t ? pa : ga : t ? pd : gd;
}
function gy(e) {
  return [ga, pa].includes(V(e.slice(0, 4)));
}
function py(e) {
  return [gd, pd, ga, pa].includes(
    V(e.slice(0, 4))
  );
}
function my(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(N.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + fd : parseInt(r, 10)
  );
}
var Hn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    R(this, "depth", 0);
    R(this, "index", 0);
    R(this, "fingerprint", V("0x00000000"));
    R(this, "parentFingerprint", V("0x00000000"));
    R(this, "privateKey");
    R(this, "publicKey");
    R(this, "chainCode");
    if (e.privateKey) {
      const t = new lr(e.privateKey);
      this.publicKey = V(t.compressedPublicKey), this.privateKey = V(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          N.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = V(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Ro(Vr(Me(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && Y(this.privateKey), n = Y(this.publicKey), r = Y(this.chainCode), s = new Uint8Array(37);
    if (e & fd) {
      if (!t)
        throw new v(
          N.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Y(this.publicKey));
    s.set(Vt(e, 4), 33);
    const i = Y(pr("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
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
    const l = new lr(V(o)).addPoint(n);
    return new Hn({
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
    return my(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
        N.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = fy(this.privateKey == null || e, t), r = V(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = Ho(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? _t(["0x00", this.privateKey]) : this.publicKey, d = Y(
      _t([n, r, s, i, o, c])
    );
    return Kc(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = ed.masterKeysFromSeed(e);
    return new Hn({
      chainCode: Y(t.slice(32)),
      privateKey: Y(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Pd(Hd(e)), n = Y(t), r = Kc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !py(n))
      throw new v(N.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(N.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = V(n.slice(5, 9)), o = parseInt(V(n.slice(9, 13)).substring(2), 16), c = V(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        N.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (gy(n)) {
      if (d[0] !== 3)
        throw new v(N.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Hn({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new v(N.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Hn({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, ji = Hn, Ey = Object.defineProperty, wy = (e, t, n) => t in e ? Ey(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, wr = (e, t, n) => (wy(e, typeof t != "symbol" ? t + "" : t, n), n), Iy = async () => {
  await ca();
  const e = ow(16, 0, cw.ScriptData), t = Mc(17, 16, 32), n = Rr(18, 17, 0), r = Mc(19, 17, 8), s = sw(16, 18, 19), i = T0(1);
  return Uint8Array.from([
    ...e.to_bytes(),
    ...t.to_bytes(),
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes()
  ]);
}, yy = (e, t, n) => {
  const s = new _().encode(new Te(t).toNumber());
  return Uint8Array.from([
    ...Y(e),
    ...s,
    ...Y(n)
  ]);
}, ma = class extends Uu {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   */
  constructor(t, n) {
    super();
    /**
     * The address associated with the account.
     */
    R(this, "address");
    /**
     * The provider used to interact with the network.
     */
    R(this, "_provider");
    this._provider = n, this.address = me.fromDynamicInput(t);
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
      throw new v(N.MISSING_PROVIDER, "Provider not set");
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
      throw new v(
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
    const s = am({
      amount: Q(r),
      assetId: wt,
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
          const D = String(g.assetId);
          if (g.owner === d && i[D]) {
            const b = Q(g.amount);
            i[D].owned = i[D].owned.add(b), o.push(g.id);
          }
        } else
          g.recipient === d && g.amount && i[wt] && (i[wt].owned = i[wt].owned.add(g.amount), c.push(g.nonce));
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
  async createTransfer(t, n, r = wt, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, c = new Kn(o);
    c.addCoinOutput(me.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: l, gasUsed: I } = await this.provider.getTransactionCost(c), g = Q(s.gasPrice ?? i), C = Q(s.gasLimit ?? I);
    return c.gasPrice = g, c.gasLimit = C, await this.fund(c, l, d), c;
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
    const i = await this.createTransfer(t, n, r, s);
    return this.sendTransaction(i);
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
    const i = me.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), c = { gasPrice: o, ...s }, d = await Iy(), l = yy(
      i.toB256(),
      n,
      r
    ), I = new Kn({
      ...c,
      script: d,
      scriptData: l
    });
    I.addContractInputAndOutput(i);
    const { maxFee: g, requiredQuantities: C, gasUsed: x } = await this.provider.getTransactionCost(
      I,
      [{ amount: Q(n), assetId: String(r) }]
    );
    return I.gasLimit = Q(c.gasLimit || x), await this.fund(I, C, g), this.sendTransaction(I);
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
    const s = me.fromAddressOrString(t), i = Y(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = Y(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), d = { script: new Uint8Array([
      ...Y(mE.bytes),
      ...i,
      ...o
    ]), ...r }, l = new Kn(d), I = [{ amount: Q(n), assetId: wt }], { requiredQuantities: g, maxFee: C, gasUsed: x } = await this.provider.getTransactionCost(
      l,
      I
    );
    return l.gasLimit = d.gasLimit ? Q(d.gasLimit) : x, await this.fund(l, g, C), this.sendTransaction(l);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(t, n) {
    const r = Lt(t);
    return await this.provider.estimateTxDependencies(r), this.provider.sendTransaction(r, {
      ...n,
      estimateTxDependencies: !1
    });
  }
  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(t) {
    const n = Lt(t);
    return await this.provider.estimateTxDependencies(n), this.provider.simulate(n, { estimateTxDependencies: !1 });
  }
}, eA = 13, tA = 8, nA = 1, qi = 32, By = 16, rA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Cy(e, t, n) {
  const r = yn(rA(e), "hex"), s = me.fromAddressOrString(t), i = Cn(qi), o = Au({
    password: yn(n),
    salt: i,
    dklen: qi,
    n: 2 ** eA,
    r: tA,
    p: nA
  }), c = Cn(By), d = await Rf(r, o, c), l = Uint8Array.from([...o.subarray(16, 32), ...d]), I = uu(l), g = Qr(I, "hex"), C = {
    id: ly(),
    version: 3,
    address: rA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Qr(c, "hex") },
      ciphertext: Qr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: qi,
        n: 2 ** eA,
        p: nA,
        r: tA,
        salt: Qr(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function by(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: l, salt: I }
    }
  } = n, g = yn(s, "hex"), C = yn(i, "hex"), x = yn(I, "hex"), D = yn(t), b = Au({
    password: D,
    salt: x,
    n: c,
    p: l,
    r: d,
    dklen: o
  }), F = Uint8Array.from([...b.subarray(16, 32), ...g]), S = uu(F), J = Qr(S, "hex");
  if (r !== J)
    throw new v(
      N.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await Df(g, b, C);
  return V(T);
}
var md = class extends ma {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new lr(t);
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
    return await this.signer().sign(jp(t));
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Lt(t), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r);
    return await this.signer().sign(s);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = Lt(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, n) {
    const r = Lt(t);
    return await this.provider.estimateTxDependencies(r), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(r),
      { ...n, estimateTxDependencies: !1 }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.call`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(t) {
    const n = Lt(t);
    return await this.provider.estimateTxDependencies(n), this.provider.call(
      await this.populateTransactionWitnessesSignature(n),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return Cy(this.privateKey, this.address, t);
  }
};
wr(md, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Ed = class extends ma {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new xt(e, this._provider);
  }
}, xt = class extends md {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new lr("0x00"), new Ed(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = lr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new xt(t, e == null ? void 0 : e.provider);
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
    const s = ji.fromSeed(e).derivePath(t || xt.defaultPath);
    return new xt(s.privateKey, n);
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
    const s = ed.mnemonicToSeed(e, n), o = ji.fromSeed(s).derivePath(t || xt.defaultPath);
    return new xt(o.privateKey, r);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = ji.fromExtendedKey(e);
    return new xt(n.privateKey, t);
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
    const r = await by(e, t);
    return new xt(r, n);
  }
}, rs = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new Ed(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new xt(e, t);
  }
};
wr(rs, "generate", xt.generate);
wr(rs, "fromSeed", xt.fromSeed);
wr(rs, "fromMnemonic", xt.fromMnemonic);
wr(rs, "fromExtendedKey", xt.fromExtendedKey);
wr(rs, "fromEncryptedJson", xt.fromEncryptedJson);
var Qy = (e) => {
  const n = Y(e), r = lA(n, 16384), s = j0(r.map((o) => V(o)));
  return l0(_t(["0x4655454C", s]));
}, sA = class extends ma {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(t, n, r, s) {
    const { predicateBytes: i, predicateInterface: o } = sA.processPredicateData(
      t,
      r,
      s
    ), c = me.fromB256(Qy(i));
    super(c, n);
    R(this, "bytes");
    R(this, "predicateData", Uint8Array.from([]));
    R(this, "predicateArgs", []);
    R(this, "interface");
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
    const n = Lt(t), { policies: r } = Ai.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === Qe.Coin && V(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
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
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Ie(this.bytes.length).encode(this.bytes), i = ni({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + Vo + Uf + ne + r.byteLength + t * ne;
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
    let s = Y(t), i;
    if (n && (i = new bn(n), i.functions.main === void 0))
      throw new v(
        N.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = sA.setConfigurableConstants(
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
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, CB = [
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
], bB = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", dA, QB = typeof process < "u" && ((dA = process == null ? void 0 : process.env) == null ? void 0 : dA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  _r as ASSET_ID_LEN,
  Uu as AbstractAccount,
  ig as AbstractAddress,
  og as AbstractContract,
  Vy as AbstractPredicate,
  Gu as AbstractProgram,
  ag as AbstractScript,
  Xy as AbstractScriptRequest,
  ma as Account,
  me as Address,
  _E as AddressType,
  It as ArrayCoder,
  yw as AssertFailedRevertError,
  G as B256Coder,
  Yf as B512Coder,
  Te as BN,
  wt as BaseAssetId,
  Ai as BaseTransactionRequest,
  md as BaseWalletUnlocked,
  Xf as BooleanCoder,
  Ie as ByteArrayCoder,
  Of as CONTRACT_ID_LEN,
  $y as CONTRACT_MAX_SIZE,
  kE as ChainName,
  AB as ChangeOutputCollisionError,
  ie as Coder,
  Hw as Commands,
  Uw as Contract,
  aI as ContractFactory,
  oI as ContractUtils,
  wo as CreateTransactionRequest,
  yB as DECIMAL_UNITS,
  IB as DEFAULT_MIN_PRECISION,
  wB as DEFAULT_PRECISION,
  rB as EmptyRoot,
  bu as EnumCoder,
  hg as FAILED_ASSERT_EQ_SIGNAL,
  lg as FAILED_ASSERT_SIGNAL,
  ug as FAILED_REQUIRE_SIGNAL,
  dg as FAILED_SEND_MESSAGE_SIGNAL,
  Ju as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  fg as FAILED_UNKNOWN_SIGNAL,
  Os as FUEL_BECH32_HRP_PREFIX,
  QB as FUEL_NETWORK_URL,
  Y0 as FunctionInvocationResult,
  V0 as FunctionInvocationScope,
  Uf as INPUT_COIN_FIXED_SIZE,
  Ds as InputCoder,
  $a as InputCoinCoder,
  Fs as InputContractCoder,
  Mr as InputMessageCoder,
  Qe as InputType,
  U0 as InstructionSet,
  bn as Interface,
  Z0 as InvocationResult,
  nB as MAX_PREDICATE_DATA_LENGTH,
  tB as MAX_PREDICATE_LENGTH,
  Ky as MAX_SCRIPT_DATA_LENGTH,
  zy as MAX_SCRIPT_LENGTH,
  eB as MAX_STATIC_CONTRACTS,
  Wy as MAX_WITNESSES,
  Hc as MNEMONIC_SIZES,
  ed as Mnemonic,
  Pw as MultiCallInvocationScope,
  lE as NoWitnessAtIndexError,
  uB as NoWitnessByOwnerError,
  K as NumberCoder,
  SE as OperationName,
  za as OutputChangeCoder,
  Ns as OutputCoder,
  Wa as OutputCoinCoder,
  Rs as OutputContractCoder,
  ec as OutputContractCreatedCoder,
  Be as OutputType,
  Ka as OutputVariableCoder,
  bB as PANIC_DOC_URL,
  CB as PANIC_REASONS,
  Ss as PoliciesCoder,
  Yt as PolicyType,
  sA as Predicate,
  M0 as Provider,
  ao as ReceiptBurnCoder,
  tc as ReceiptCallCoder,
  jy as ReceiptCoder,
  oc as ReceiptLogCoder,
  ac as ReceiptLogDataCoder,
  _s as ReceiptMessageOutCoder,
  Or as ReceiptMintCoder,
  sc as ReceiptPanicCoder,
  nc as ReceiptReturnCoder,
  rc as ReceiptReturnDataCoder,
  ic as ReceiptRevertCoder,
  uc as ReceiptScriptResultCoder,
  cc as ReceiptTransferCoder,
  Ac as ReceiptTransferOutCoder,
  ue as ReceiptType,
  Ew as RequireRevertError,
  ts as RevertError,
  Vo as SCRIPT_FIXED_SIZE,
  mB as Script,
  Gr as ScriptRequest,
  vw as ScriptResultDecoderError,
  Kn as ScriptTransactionRequest,
  Iw as SendMessageRevertError,
  lr as Signer,
  dc as StorageSlotCoder,
  jf as StringCoder,
  ri as StructCoder,
  Qn as TransactionCoder,
  lc as TransactionCreateCoder,
  fc as TransactionMintCoder,
  Io as TransactionResponse,
  hc as TransactionScriptCoder,
  NE as TransactionStatus,
  Ct as TransactionType,
  RE as TransactionTypeName,
  ww as TransferToAddressRevertError,
  Fu as TupleCoder,
  ir as TxPointerCoder,
  _ as U64Coder,
  qy as UtxoIdCoder,
  Du as VecCoder,
  ne as WORD_SIZE,
  rs as Wallet,
  Ed as WalletLocked,
  xt as WalletUnlocked,
  ks as WitnessCoder,
  ke as ZeroBytes32,
  am as addAmountToAsset,
  Pn as addOperation,
  xr as addressify,
  fA as arrayify,
  oE as assembleReceiptByType,
  di as assembleTransactionSummary,
  Pi as assert,
  Q as bn,
  yn as bufferFromString,
  aB as buildBlockExplorerUrl,
  x0 as calculateMetadataGasForTxCreate,
  v0 as calculateMetadataGasForTxScript,
  zn as calculatePriceWithFactor,
  EE as calculateTransactionFee,
  ni as calculateVmTxMemory,
  vy as capitalizeString,
  lA as chunkAndPadBytes,
  Ig as clearFirst12BytesFromB256,
  ta as coinQuantityfy,
  de as concat,
  gA as concatBytes,
  EB as createConfig,
  Jy as decrypt,
  Df as decryptJsonWalletData,
  Ry as defaultChainConfig,
  Ny as defaultConsensusKey,
  Zy as encrypt,
  Rf as encryptJsonWalletData,
  jE as extractBurnedAssetsFromReceipts,
  VE as extractMintedAssetsFromReceipts,
  Ly as format,
  Oy as formatUnits,
  qo as fromBech32,
  dB as fromDateToTai64,
  wE as fromTai64ToDate,
  cB as fromTai64ToUnix,
  hE as fromUnixToTai64,
  AE as gasUsedByInputs,
  Hu as getAssetId,
  $o as getBytesFromBech32,
  JE as getContractCallOperations,
  YE as getContractCreatedOperations,
  GE as getContractTransferOperations,
  WE as getDecodedLogs,
  pw as getDocs,
  b0 as getGasUsedFromReceipts,
  Ur as getInputAccountAddress,
  xE as getInputContractFromIndex,
  Us as getInputFromAssetId,
  oa as getInputsByType,
  yE as getInputsByTypes,
  BE as getInputsCoin,
  bE as getInputsCoinAndMessage,
  QE as getInputsContract,
  CE as getInputsMessage,
  ia as getMaxGas,
  Q0 as getMinGas,
  XE as getOperations,
  es as getOutputsByType,
  FE as getOutputsChange,
  D0 as getOutputsCoin,
  DE as getOutputsContract,
  vE as getOutputsContractCreated,
  hB as getOutputsVariable,
  ZE as getPayProducerOperations,
  Qy as getPredicateRoot,
  wg as getRandomB256,
  ui as getReceiptsByType,
  OE as getReceiptsCall,
  LE as getReceiptsMessageOut,
  UE as getReceiptsTransferOut,
  iE as getReceiptsWithMissingData,
  qE as getTransactionStatusName,
  fB as getTransactionSummary,
  gB as getTransactionSummaryFromRequest,
  R0 as getTransactionTypeName,
  pB as getTransactionsSummaries,
  _c as getTransferOperations,
  HE as getWithdrawFromFuelOperations,
  lB as hasSameAssetId,
  l0 as hash,
  jp as hashMessage,
  Fy as hexlify,
  tE as inputify,
  co as isB256,
  Bs as isBech32,
  Nc as isCoin,
  Ao as isEvmAddress,
  oB as isMessage,
  pc as isPublicKey,
  sB as isRawCoin,
  iB as isRawMessage,
  aa as isType,
  N0 as isTypeCreate,
  ME as isTypeMint,
  S0 as isTypeScript,
  uu as keccak256,
  Yy as keyFromPassword,
  Il as max,
  Ty as multiply,
  Eg as normalizeBech32,
  uE as normalizeJSON,
  Dy as normalizeString,
  nE as outputify,
  yg as padFirst12BytesOfEvmAddress,
  er as processGqlReceipt,
  $E as processGraphqlStatus,
  Cn as randomBytes,
  Bn as resolveGasDependentCosts,
  Sc as returnZeroScript,
  Bw as revertErrorFactory,
  Au as scrypt,
  dE as sleep,
  cg as sortPolicies,
  Qr as stringFromBuffer,
  mc as toB256,
  ys as toBech32,
  Vt as toBytes,
  wl as toFixed,
  Ho as toHex,
  Tt as toNumber,
  Lt as transactionRequestify,
  qp as uint64ToBytesBE,
  mE as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
