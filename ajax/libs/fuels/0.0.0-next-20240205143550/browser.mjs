var ud = Object.defineProperty;
var dd = (t, e, n) => e in t ? ud(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var N = (t, e, n) => (dd(t, typeof e != "symbol" ? e + "" : e, n), n), Fi = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
};
var Qt = (t, e, n) => (Fi(t, e, "read from private field"), n ? n.call(t) : e.get(t)), Ee = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, De = (t, e, n, r) => (Fi(t, e, "write to private field"), r ? r.call(t, n) : e.set(t, n), n);
var Un = (t, e, n) => (Fi(t, e, "access private method"), n);
function sA() {
  return {
    FORC: "0.49.2",
    FUEL_CORE: "0.22.0",
    FUELS: "0.73.0"
  };
}
function Qa(t) {
  const [e, n, r] = t.split(".").map((s) => parseInt(s, 10));
  return { major: e, minor: n, patch: r };
}
function Qo(t, e) {
  const n = Qa(t), r = Qa(e), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function hd(t, e) {
  const { major: n } = Qo(t, e);
  return n === 0;
}
function ld(t, e) {
  const { minor: n } = Qo(t, e);
  return n === 0;
}
function fd(t, e) {
  const { patch: n } = Qo(t, e);
  return n === 0;
}
function gd(t) {
  const { FUEL_CORE: e } = sA();
  return {
    supportedVersion: e,
    isMajorSupported: hd(t, e),
    isMinorSupported: ld(t, e),
    isPatchSupported: fd(t, e)
  };
}
var pd = sA(), md = Object.defineProperty, Id = (t, e, n) => e in t ? md(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, wd = (t, e, n) => (Id(t, typeof e != "symbol" ? e + "" : e, n), n), k = /* @__PURE__ */ ((t) => (t.NO_ABIS_FOUND = "no-abis-found", t.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", t.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", t.INVALID_COMPONENT = "invalid-component", t.FRAGMENT_NOT_FOUND = "fragment-not-found", t.CONFIGURABLE_NOT_FOUND = "configurable-not-found", t.TYPE_NOT_FOUND = "type-not-found", t.TYPE_NOT_SUPPORTED = "type-not-supported", t.INVALID_DECODE_VALUE = "invalid-decode-value", t.JSON_ABI_ERROR = "json-abi-error", t.TYPE_ID_NOT_FOUND = "type-id-not-found", t.BIN_FILE_NOT_FOUND = "bin-file-not-found", t.CODER_NOT_FOUND = "coder-not-found", t.INVALID_DATA = "invalid-data", t.FUNCTION_NOT_FOUND = "function-not-found", t.INVALID_BECH32_ADDRESS = "invalid-bech32-address", t.INVALID_EVM_ADDRESS = "invalid-evm-address", t.INVALID_B256_ADDRESS = "invalid-b256-address", t.INVALID_URL = "invalid-url", t.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", t.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", t.MISSING_PROVIDER = "missing-provider", t.INVALID_PUBLIC_KEY = "invalid-public-key", t.INSUFFICIENT_BALANCE = "insufficient-balance", t.WALLET_MANAGER_ERROR = "wallet-manager-error", t.HD_WALLET_ERROR = "hd-wallet-error", t.PARSE_FAILED = "parse-failed", t.ENCODE_ERROR = "encode-error", t.DECODE_ERROR = "decode-error", t.INVALID_CREDENTIALS = "invalid-credentials", t.ENV_DEPENDENCY_MISSING = "env-dependency-missing", t.INVALID_TTL = "invalid-ttl", t.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", t.NOT_IMPLEMENTED = "not-implemented", t.NOT_SUPPORTED = "not-supported", t.CONVERTING_FAILED = "converting-error", t.ELEMENT_NOT_FOUND = "element-not-found", t.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", t.INVALID_REQUEST = "invalid-request", t.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", t.GAS_PRICE_TOO_LOW = "gas-price-too-low", t.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", t.TRANSACTION_NOT_FOUND = "transaction-not-found", t.TRANSACTION_FAILED = "transaction-failed", t.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", t.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", t.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", t.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", t.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", t.TRANSACTION_ERROR = "transaction-error", t.INVALID_POLICY_TYPE = "invalid-policy-type", t.DUPLICATED_POLICY = "duplicated-policy", t.INVALID_RECEIPT_TYPE = "invalid-receipt-type", t.INVALID_WORD_LIST = "invalid-word-list", t.INVALID_MNEMONIC = "invalid-mnemonic", t.INVALID_ENTROPY = "invalid-entropy", t.INVALID_SEED = "invalid-seed", t.INVALID_CHECKSUM = "invalid-checksum", t.INVALID_PASSWORD = "invalid-password", t.ACCOUNT_REQUIRED = "account-required", t.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", t.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", t.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", t.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", t.INVALID_MULTICALL = "invalid-multicall", t.SCRIPT_REVERTED = "script-reverted", t.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", t))(k || {}), fs = class extends Error {
  constructor(e, n) {
    super(n);
    N(this, "VERSIONS", pd);
    N(this, "code");
    this.code = e, this.name = "FuelError";
  }
  static parse(e) {
    const n = e;
    if (n.code === void 0)
      throw new fs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(k);
    if (!r.includes(n.code))
      throw new fs(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new fs(n.code, n.message);
  }
  toObject() {
    const { code: e, name: n, message: r, VERSIONS: s } = this;
    return { code: e, name: n, message: r, VERSIONS: s };
  }
}, D = fs;
wd(D, "CODES", k);
var cB = (t) => t.length ? t[0].toUpperCase() + t.slice(1) : t, iA = (t, e) => {
  const n = [];
  for (let c = 0; c < t.length; c += e) {
    const d = new Uint8Array(e);
    d.set(t.slice(c, c + e)), n.push(d);
  }
  const r = n[n.length - 1], s = t.length % e, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, oA = (t) => {
  if (t instanceof Uint8Array)
    return new Uint8Array(t);
  if (typeof t == "string" && t.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const e = new Uint8Array((t.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < e.length; r++)
      e[r] = parseInt(t.substring(n, n + 2), 16), n += 2;
    return e;
  }
  throw new D(k.PARSE_FAILED, "invalid BytesLike value");
}, aA = (t) => {
  const e = t.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = e.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return e.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, dt = (t) => {
  const e = t.map((n) => oA(n));
  return aA(e);
}, xa = "0123456789abcdef";
function AB(t) {
  const e = oA(t);
  let n = "0x";
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    n += xa[(s & 240) >> 4] + xa[s & 15];
  }
  return n;
}
var uB = (t) => {
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
  ].reduce((r, s) => s(r), t);
  if (n === "") {
    const r = `The provided string '${t}' results in an empty output after`.concat(
      " normalization, therefore, it can't normalize string."
    );
    throw new D(k.PARSE_FAILED, r);
  }
  return n;
}, Ed = {
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
}, dB = Ed, hB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const Bd = "6.7.1";
function yd(t, e, n) {
  const r = e.split("|").map((i) => i.trim());
  for (let i = 0; i < r.length; i++)
    switch (e) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof t === e)
          return;
    }
  const s = new Error(`invalid value for type ${e}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${n}`, s.value = t, s;
}
function Xs(t, e, n) {
  for (let r in e) {
    let s = e[r];
    const i = n ? n[r] : null;
    i && yd(s, i, r), Object.defineProperty(t, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Jn(t) {
  if (t == null)
    return "null";
  if (Array.isArray(t))
    return "[ " + t.map(Jn).join(", ") + " ]";
  if (t instanceof Uint8Array) {
    const e = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < t.length; r++)
      n += e[t[r] >> 4], n += e[t[r] & 15];
    return n;
  }
  if (typeof t == "object" && typeof t.toJSON == "function")
    return Jn(t.toJSON());
  switch (typeof t) {
    case "boolean":
    case "symbol":
      return t.toString();
    case "bigint":
      return BigInt(t).toString();
    case "number":
      return t.toString();
    case "string":
      return JSON.stringify(t);
    case "object": {
      const e = Object.keys(t);
      return e.sort(), "{ " + e.map((n) => `${Jn(n)}: ${Jn(t[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Cd(t, e, n) {
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
    s.push(`code=${e}`), s.push(`version=${Bd}`), s.length && (t += " (" + s.join(", ") + ")");
  }
  let r;
  switch (e) {
    case "INVALID_ARGUMENT":
      r = new TypeError(t);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      r = new RangeError(t);
      break;
    default:
      r = new Error(t);
  }
  return Xs(r, { code: e }), n && Object.assign(r, n), r;
}
function fr(t, e, n, r) {
  if (!t)
    throw Cd(e, n, r);
}
function Ct(t, e, n, r) {
  fr(t, e, "INVALID_ARGUMENT", { argument: n, value: r });
}
const bd = ["NFD", "NFC", "NFKD", "NFKC"].reduce((t, e) => {
  try {
    if ("test".normalize(e) !== "test")
      throw new Error("bad");
    if (e === "NFD") {
      const n = String.fromCharCode(233).normalize("NFD"), r = String.fromCharCode(101, 769);
      if (n !== r)
        throw new Error("broken");
    }
    t.push(e);
  } catch {
  }
  return t;
}, []);
function Qd(t) {
  fr(bd.indexOf(t) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: t }
  });
}
function cA(t, e, n) {
  if (t instanceof Uint8Array)
    return n ? new Uint8Array(t) : t;
  if (typeof t == "string" && t.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((t.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(t.substring(s, s + 2), 16), s += 2;
    return r;
  }
  Ct(!1, "invalid BytesLike value", e || "value", t);
}
function Ge(t, e) {
  return cA(t, e, !1);
}
function Y(t, e) {
  return cA(t, e, !0);
}
function xd(t, e) {
  return !(typeof t != "string" || !t.match(/^0x[0-9A-Fa-f]*$/) || typeof e == "number" && t.length !== 2 + 2 * e || e === !0 && t.length % 2 !== 0);
}
const Fa = "0123456789abcdef";
function V(t) {
  const e = Ge(t);
  let n = "0x";
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    n += Fa[(s & 240) >> 4] + Fa[s & 15];
  }
  return n;
}
function _e(t) {
  return "0x" + t.map((e) => V(e).substring(2)).join("");
}
function xo(t, e, n) {
  const r = Ge(t);
  return n != null && n > r.length && fr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), V(r.slice(e ?? 0, n ?? r.length));
}
const Fd = BigInt(0);
BigInt(1);
const Zn = 9007199254740991;
function Dn(t, e) {
  switch (typeof t) {
    case "bigint":
      return t;
    case "number":
      return Ct(Number.isInteger(t), "underflow", e || "value", t), Ct(t >= -Zn && t <= Zn, "overflow", e || "value", t), BigInt(t);
    case "string":
      try {
        if (t === "")
          throw new Error("empty string");
        return t[0] === "-" && t[1] !== "-" ? -BigInt(t.substring(1)) : BigInt(t);
      } catch (n) {
        Ct(!1, `invalid BigNumberish string: ${n.message}`, e || "value", t);
      }
  }
  Ct(!1, "invalid BigNumberish value", e || "value", t);
}
function vd(t, e) {
  const n = Dn(t, e);
  return fr(n >= Fd, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: t
  }), n;
}
const va = "0123456789abcdef";
function Dd(t) {
  if (t instanceof Uint8Array) {
    let e = "0x0";
    for (const n of t)
      e += va[n >> 4], e += va[n & 15];
    return BigInt(e);
  }
  return Dn(t);
}
function AA(t, e) {
  switch (typeof t) {
    case "bigint":
      return Ct(t >= -Zn && t <= Zn, "overflow", e || "value", t), Number(t);
    case "number":
      return Ct(Number.isInteger(t), "underflow", e || "value", t), Ct(t >= -Zn && t <= Zn, "overflow", e || "value", t), t;
    case "string":
      try {
        if (t === "")
          throw new Error("empty string");
        return AA(BigInt(t), e);
      } catch (n) {
        Ct(!1, `invalid numeric string: ${n.message}`, e || "value", t);
      }
  }
  Ct(!1, "invalid numeric value", e || "value", t);
}
function Nd(t, e) {
  let r = vd(t, "value").toString(16);
  if (e == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = AA(e, "width");
    for (fr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: t
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const Xi = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let ss = null;
function Sd(t) {
  if (ss == null) {
    ss = {};
    for (let n = 0; n < Xi.length; n++)
      ss[Xi[n]] = BigInt(n);
  }
  const e = ss[t];
  return Ct(e != null, "invalid base58 value", "letter", t), e;
}
const Rd = BigInt(0), Vi = BigInt(58);
function uA(t) {
  let e = Dd(Ge(t)), n = "";
  for (; e; )
    n = Xi[Number(e % Vi)] + n, e /= Vi;
  return n;
}
function _d(t) {
  let e = Rd;
  for (let n = 0; n < t.length; n++)
    e *= Vi, e += Sd(t[n]);
  return e;
}
function kd(t, e, n, r, s) {
  Ct(!1, `invalid codepoint at offset ${e}; ${t}`, "bytes", n);
}
function dA(t, e, n, r, s) {
  if (t === "BAD_PREFIX" || t === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = e + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return t === "OVERRUN" ? n.length - e - 1 : 0;
}
function Md(t, e, n, r, s) {
  return t === "OVERLONG" ? (Ct(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), dA(t, e, n));
}
const Ld = Object.freeze({
  error: kd,
  ignore: dA,
  replace: Md
});
function Td(t, e) {
  e == null && (e = Ld.error);
  const n = Ge(t, "bytes"), r = [];
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
      (i & 192) === 128 ? s += e("UNEXPECTED_CONTINUE", s - 1, n, r) : s += e("BAD_PREFIX", s - 1, n, r);
      continue;
    }
    if (s - 1 + o >= n.length) {
      s += e("OVERRUN", s - 1, n, r);
      continue;
    }
    let d = i & (1 << 8 - o - 1) - 1;
    for (let l = 0; l < o; l++) {
      let E = n[s];
      if ((E & 192) != 128) {
        s += e("MISSING_CONTINUE", s, n, r), d = null;
        break;
      }
      d = d << 6 | E & 63, s++;
    }
    if (d !== null) {
      if (d > 1114111) {
        s += e("OUT_OF_RANGE", s - 1 - o, n, r, d);
        continue;
      }
      if (d >= 55296 && d <= 57343) {
        s += e("UTF16_SURROGATE", s - 1 - o, n, r, d);
        continue;
      }
      if (d <= c) {
        s += e("OVERLONG", s - 1 - o, n, r, d);
        continue;
      }
      r.push(d);
    }
  }
  return r;
}
function hA(t, e) {
  e != null && (Qd(e), t = t.normalize(e));
  let n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      r++;
      const i = t.charCodeAt(r);
      Ct(r < t.length && (i & 64512) === 56320, "invalid surrogate pair", "str", t);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function Od(t) {
  return t.map((e) => e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10 & 1023) + 55296, (e & 1023) + 56320))).join("");
}
function lA(t, e) {
  return Od(Td(t, e));
}
function ji(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error(`Wrong positive integer: ${t}`);
}
function Pd(t) {
  if (typeof t != "boolean")
    throw new Error(`Expected boolean, not ${t}`);
}
function fA(t, ...e) {
  if (!(t instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (e.length > 0 && !e.includes(t.length))
    throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
}
function Ud(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  ji(t.outputLen), ji(t.blockLen);
}
function Gd(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function Hd(t, e) {
  fA(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const we = {
  number: ji,
  bool: Pd,
  bytes: fA,
  hash: Ud,
  exists: Gd,
  output: Hd
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Jd = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), gs = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), je = (t, e) => t << 32 - e | t >>> e, Zd = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Zd)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Yd(t) {
  if (typeof t != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof t}`);
  return new TextEncoder().encode(t);
}
function Mn(t) {
  if (typeof t == "string" && (t = Yd(t)), !(t instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof t})`);
  return t;
}
let Qs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Xd = (t) => Object.prototype.toString.call(t) === "[object Object]" && t.constructor === Object;
function Vd(t, e) {
  if (e !== void 0 && (typeof e != "object" || !Xd(e)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(t, e);
}
function gr(t) {
  const e = (r) => t().update(Mn(r)).digest(), n = t();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e;
}
function jd(t) {
  const e = (r, s) => t(s).update(Mn(r)).digest(), n = t({});
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r) => t(r), e;
}
let gA = class extends Qs {
  constructor(e, n) {
    super(), this.finished = !1, this.destroyed = !1, we.hash(e);
    const r = Mn(n);
    if (this.iHash = e.create(), !(this.iHash instanceof Qs))
      throw new TypeError("Expected instance of class which extends utils.Hash");
    const s = this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const i = new Uint8Array(s);
    i.set(r.length > this.iHash.blockLen ? e.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(e) {
    return we.exists(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    we.exists(this), we.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return e = e, e.finished = s, e.destroyed = i, e.blockLen = o, e.outputLen = c, e.oHash = n._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const Fo = (t, e, n) => new gA(t, e).update(n).digest();
Fo.create = (t, e) => new gA(t, e);
function qd(t, e, n, r) {
  we.hash(t);
  const s = Vd({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (we.number(i), we.number(o), we.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Mn(e), l = Mn(n), E = new Uint8Array(o), g = Fo.create(t, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: E, PRF: g, PRFSalt: C };
}
function $d(t, e, n, r, s) {
  return t.destroy(), e.destroy(), r && r.destroy(), s.fill(0), n;
}
function Wd(t, e, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = qd(t, e, n, r);
  let l;
  const E = new Uint8Array(4), g = gs(E), C = new Uint8Array(c.outputLen);
  for (let x = 1, F = 0; F < i; x++, F += c.outputLen) {
    const b = o.subarray(F, F + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(E).digestInto(C), b.set(C.subarray(0, b.length));
    for (let v = 1; v < s; v++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return $d(c, d, o, l, C);
}
function zd(t, e, n, r) {
  if (typeof t.setBigUint64 == "function")
    return t.setBigUint64(e, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  t.setUint32(e + d, o, r), t.setUint32(e + l, c, r);
}
let vo = class extends Qs {
  constructor(e, n, r, s) {
    super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = gs(this.buffer);
  }
  update(e) {
    we.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    e = Mn(e);
    const i = e.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = gs(e);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(e.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    we.exists(this), we.output(e, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    zd(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = gs(e);
    this.get().forEach((d, l) => c.setUint32(4 * l, d, i));
  }
  digest() {
    const { buffer: e, outputLen: n } = this;
    this.digestInto(e);
    const r = e.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return e.length = s, e.pos = c, e.finished = i, e.destroyed = o, s % n && e.buffer.set(r), e;
  }
};
const Kd = (t, e, n) => t & e ^ ~t & n, th = (t, e, n) => t & e ^ t & n ^ e & n, eh = new Uint32Array([
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
let nh = class extends vo {
  constructor() {
    super(64, 32, 8, !1), this.A = on[0] | 0, this.B = on[1] | 0, this.C = on[2] | 0, this.D = on[3] | 0, this.E = on[4] | 0, this.F = on[5] | 0, this.G = on[6] | 0, this.H = on[7] | 0;
  }
  get() {
    const { A: e, B: n, C: r, D: s, E: i, F: o, G: c, H: d } = this;
    return [e, n, r, s, i, o, c, d];
  }
  // prettier-ignore
  set(e, n, r, s, i, o, c, d) {
    this.A = e | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = d | 0;
  }
  process(e, n) {
    for (let g = 0; g < 16; g++, n += 4)
      an[g] = e.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = an[g - 15], x = an[g - 2], F = je(C, 7) ^ je(C, 18) ^ C >>> 3, b = je(x, 17) ^ je(x, 19) ^ x >>> 10;
      an[g] = b + an[g - 7] + F + an[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: E } = this;
    for (let g = 0; g < 64; g++) {
      const C = je(c, 6) ^ je(c, 11) ^ je(c, 25), x = E + C + Kd(c, d, l) + eh[g] + an[g] | 0, b = (je(r, 2) ^ je(r, 13) ^ je(r, 22)) + th(r, s, i) | 0;
      E = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, l, E);
  }
  roundClean() {
    an.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Do = gr(() => new nh()), is = BigInt(2 ** 32 - 1), qi = BigInt(32);
function pA(t, e = !1) {
  return e ? { h: Number(t & is), l: Number(t >> qi & is) } : { h: Number(t >> qi & is) | 0, l: Number(t & is) | 0 };
}
function rh(t, e = !1) {
  let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
  for (let s = 0; s < t.length; s++) {
    const { h: i, l: o } = pA(t[s], e);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const sh = (t, e) => BigInt(t >>> 0) << qi | BigInt(e >>> 0), ih = (t, e, n) => t >>> n, oh = (t, e, n) => t << 32 - n | e >>> n, ah = (t, e, n) => t >>> n | e << 32 - n, ch = (t, e, n) => t << 32 - n | e >>> n, Ah = (t, e, n) => t << 64 - n | e >>> n - 32, uh = (t, e, n) => t >>> n - 32 | e << 64 - n, dh = (t, e) => e, hh = (t, e) => t, lh = (t, e, n) => t << n | e >>> 32 - n, fh = (t, e, n) => e << n | t >>> 32 - n, gh = (t, e, n) => e << n - 32 | t >>> 64 - n, ph = (t, e, n) => t << n - 32 | e >>> 64 - n;
function mh(t, e, n, r) {
  const s = (e >>> 0) + (r >>> 0);
  return { h: t + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Ih = (t, e, n) => (t >>> 0) + (e >>> 0) + (n >>> 0), wh = (t, e, n, r) => e + n + r + (t / 2 ** 32 | 0) | 0, Eh = (t, e, n, r) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0), Bh = (t, e, n, r, s) => e + n + r + s + (t / 2 ** 32 | 0) | 0, yh = (t, e, n, r, s) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Ch = (t, e, n, r, s, i) => e + n + r + s + i + (t / 2 ** 32 | 0) | 0, ct = {
  fromBig: pA,
  split: rh,
  toBig: sh,
  shrSH: ih,
  shrSL: oh,
  rotrSH: ah,
  rotrSL: ch,
  rotrBH: Ah,
  rotrBL: uh,
  rotr32H: dh,
  rotr32L: hh,
  rotlSH: lh,
  rotlSL: fh,
  rotlBH: gh,
  rotlBL: ph,
  add: mh,
  add3L: Ih,
  add3H: wh,
  add4L: Eh,
  add4H: Bh,
  add5H: Ch,
  add5L: yh
}, [bh, Qh] = ct.split([
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
].map((t) => BigInt(t))), cn = new Uint32Array(80), An = new Uint32Array(80);
class No extends vo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: e, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: l, El: E, Fh: g, Fl: C, Gh: x, Gl: F, Hh: b, Hl: v } = this;
    return [e, n, r, s, i, o, c, d, l, E, g, C, x, F, b, v];
  }
  // prettier-ignore
  set(e, n, r, s, i, o, c, d, l, E, g, C, x, F, b, v) {
    this.Ah = e | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = l | 0, this.El = E | 0, this.Fh = g | 0, this.Fl = C | 0, this.Gh = x | 0, this.Gl = F | 0, this.Hh = b | 0, this.Hl = v | 0;
  }
  process(e, n) {
    for (let O = 0; O < 16; O++, n += 4)
      cn[O] = e.getUint32(n), An[O] = e.getUint32(n += 4);
    for (let O = 16; O < 80; O++) {
      const j = cn[O - 15] | 0, M = An[O - 15] | 0, _ = ct.rotrSH(j, M, 1) ^ ct.rotrSH(j, M, 8) ^ ct.shrSH(j, M, 7), L = ct.rotrSL(j, M, 1) ^ ct.rotrSL(j, M, 8) ^ ct.shrSL(j, M, 7), P = cn[O - 2] | 0, $ = An[O - 2] | 0, U = ct.rotrSH(P, $, 19) ^ ct.rotrBH(P, $, 61) ^ ct.shrSH(P, $, 6), H = ct.rotrSL(P, $, 19) ^ ct.rotrBL(P, $, 61) ^ ct.shrSL(P, $, 6), tt = ct.add4L(L, H, An[O - 7], An[O - 16]), y = ct.add4H(tt, _, U, cn[O - 7], cn[O - 16]);
      cn[O] = y | 0, An[O] = tt | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: l, Dl: E, Eh: g, El: C, Fh: x, Fl: F, Gh: b, Gl: v, Hh: S, Hl: J } = this;
    for (let O = 0; O < 80; O++) {
      const j = ct.rotrSH(g, C, 14) ^ ct.rotrSH(g, C, 18) ^ ct.rotrBH(g, C, 41), M = ct.rotrSL(g, C, 14) ^ ct.rotrSL(g, C, 18) ^ ct.rotrBL(g, C, 41), _ = g & x ^ ~g & b, L = C & F ^ ~C & v, P = ct.add5L(J, M, L, Qh[O], An[O]), $ = ct.add5H(P, S, j, _, bh[O], cn[O]), U = P | 0, H = ct.rotrSH(r, s, 28) ^ ct.rotrBH(r, s, 34) ^ ct.rotrBH(r, s, 39), tt = ct.rotrSL(r, s, 28) ^ ct.rotrBL(r, s, 34) ^ ct.rotrBL(r, s, 39), y = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      S = b | 0, J = v | 0, b = x | 0, v = F | 0, x = g | 0, F = C | 0, { h: g, l: C } = ct.add(l | 0, E | 0, $ | 0, U | 0), l = c | 0, E = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = ct.add3L(U, tt, a);
      r = ct.add3H(A, $, H, y), s = A | 0;
    }
    ({ h: r, l: s } = ct.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = ct.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = ct.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h: l, l: E } = ct.add(this.Dh | 0, this.Dl | 0, l | 0, E | 0), { h: g, l: C } = ct.add(this.Eh | 0, this.El | 0, g | 0, C | 0), { h: x, l: F } = ct.add(this.Fh | 0, this.Fl | 0, x | 0, F | 0), { h: b, l: v } = ct.add(this.Gh | 0, this.Gl | 0, b | 0, v | 0), { h: S, l: J } = ct.add(this.Hh | 0, this.Hl | 0, S | 0, J | 0), this.set(r, s, i, o, c, d, l, E, g, C, x, F, b, v, S, J);
  }
  roundClean() {
    cn.fill(0), An.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class xh extends No {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class Fh extends No {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const So = gr(() => new No());
gr(() => new xh());
gr(() => new Fh());
function vh() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const Da = vh();
Da.crypto || Da.msCrypto;
function Dh(t) {
  switch (t) {
    case "sha256":
      return Do.create();
    case "sha512":
      return So.create();
  }
  Ct(!1, "invalid hashing algorithm name", "algorithm", t);
}
function Nh(t, e) {
  const n = { sha256: Do, sha512: So }[t];
  return Ct(n != null, "invalid hmac algorithm", "algorithm", t), Fo.create(n, e);
}
function Sh(t, e, n, r, s) {
  const i = { sha256: Do, sha512: So }[s];
  return Ct(i != null, "invalid pbkdf2 algorithm", "algorithm", s), Wd(i, t, e, { c: n, dkLen: r });
}
let mA = !1;
const IA = function(t, e, n) {
  return Nh(t, e).update(n).digest();
};
let wA = IA;
function pr(t, e, n) {
  const r = Ge(e, "key"), s = Ge(n, "data");
  return V(wA(t, r, s));
}
pr._ = IA;
pr.lock = function() {
  mA = !0;
};
pr.register = function(t) {
  if (mA)
    throw new Error("computeHmac is locked");
  wA = t;
};
Object.freeze(pr);
const [EA, BA, yA] = [[], [], []], Rh = BigInt(0), yr = BigInt(1), _h = BigInt(2), kh = BigInt(7), Mh = BigInt(256), Lh = BigInt(113);
for (let t = 0, e = yr, n = 1, r = 0; t < 24; t++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], EA.push(2 * (5 * r + n)), BA.push((t + 1) * (t + 2) / 2 % 64);
  let s = Rh;
  for (let i = 0; i < 7; i++)
    e = (e << yr ^ (e >> kh) * Lh) % Mh, e & _h && (s ^= yr << (yr << BigInt(i)) - yr);
  yA.push(s);
}
const [Th, Oh] = ct.split(yA, !0), Na = (t, e, n) => n > 32 ? ct.rotlBH(t, e, n) : ct.rotlSH(t, e, n), Sa = (t, e, n) => n > 32 ? ct.rotlBL(t, e, n) : ct.rotlSL(t, e, n);
function Ph(t, e = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], E = n[d + 1], g = Na(l, E, 1) ^ n[c], C = Sa(l, E, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        t[o + x] ^= g, t[o + x + 1] ^= C;
    }
    let s = t[2], i = t[3];
    for (let o = 0; o < 24; o++) {
      const c = BA[o], d = Na(s, i, c), l = Sa(s, i, c), E = EA[o];
      s = t[E], i = t[E + 1], t[E] = d, t[E + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = t[o + c];
      for (let c = 0; c < 10; c++)
        t[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    t[0] ^= Th[r], t[1] ^= Oh[r];
  }
  n.fill(0);
}
let CA = class bA extends Qs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, we.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Jd(this.state);
  }
  keccak() {
    Ph(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    we.exists(this);
    const { blockLen: n, state: r } = this;
    e = Mn(e);
    const s = e.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let c = 0; c < o; c++)
        r[this.pos++] ^= e[i++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: n, pos: r, blockLen: s } = this;
    e[r] ^= n, n & 128 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    we.exists(this, !1), we.bytes(e), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let s = 0, i = e.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - s);
      e.set(n.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return we.number(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (we.output(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: n, suffix: r, outputLen: s, rounds: i, enableXOF: o } = this;
    return e || (e = new bA(n, r, s, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = s, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
const xn = (t, e, n) => gr(() => new CA(e, t, n));
xn(6, 144, 224 / 8);
xn(6, 136, 256 / 8);
xn(6, 104, 384 / 8);
xn(6, 72, 512 / 8);
xn(1, 144, 224 / 8);
const Uh = xn(1, 136, 256 / 8);
xn(1, 104, 384 / 8);
xn(1, 72, 512 / 8);
const QA = (t, e, n) => jd((r = {}) => new CA(e, t, r.dkLen === void 0 ? n : r.dkLen, !0));
QA(31, 168, 128 / 8);
QA(31, 136, 256 / 8);
let xA = !1;
const FA = function(t) {
  return Uh(t);
};
let vA = FA;
function Xr(t) {
  const e = Ge(t, "data");
  return V(vA(e));
}
Xr._ = FA;
Xr.lock = function() {
  xA = !0;
};
Xr.register = function(t) {
  if (xA)
    throw new TypeError("keccak256 is locked");
  vA = t;
};
Object.freeze(Xr);
const Gh = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), DA = Uint8Array.from({ length: 16 }, (t, e) => e), Hh = DA.map((t) => (9 * t + 5) % 16);
let Ro = [DA], _o = [Hh];
for (let t = 0; t < 4; t++)
  for (let e of [Ro, _o])
    e.push(e[t].map((n) => Gh[n]));
const NA = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((t) => new Uint8Array(t)), Jh = Ro.map((t, e) => t.map((n) => NA[e][n])), Zh = _o.map((t, e) => t.map((n) => NA[e][n])), Yh = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), Xh = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), os = (t, e) => t << e | t >>> 32 - e;
function Ra(t, e, n, r) {
  return t === 0 ? e ^ n ^ r : t === 1 ? e & n | ~e & r : t === 2 ? (e | ~n) ^ r : t === 3 ? e & r | n & ~r : e ^ (n | ~r);
}
const as = new Uint32Array(16);
class Vh extends vo {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: e, h1: n, h2: r, h3: s, h4: i } = this;
    return [e, n, r, s, i];
  }
  set(e, n, r, s, i) {
    this.h0 = e | 0, this.h1 = n | 0, this.h2 = r | 0, this.h3 = s | 0, this.h4 = i | 0;
  }
  process(e, n) {
    for (let x = 0; x < 16; x++, n += 4)
      as[x] = e.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, l = this.h3 | 0, E = l, g = this.h4 | 0, C = g;
    for (let x = 0; x < 5; x++) {
      const F = 4 - x, b = Yh[x], v = Xh[x], S = Ro[x], J = _o[x], O = Jh[x], j = Zh[x];
      for (let M = 0; M < 16; M++) {
        const _ = os(r + Ra(x, i, c, l) + as[S[M]] + b, O[M]) + g | 0;
        r = g, g = l, l = os(c, 10) | 0, c = i, i = _;
      }
      for (let M = 0; M < 16; M++) {
        const _ = os(s + Ra(F, o, d, E) + as[J[M]] + v, j[M]) + C | 0;
        s = C, C = E, E = os(d, 10) | 0, d = o, o = _;
      }
    }
    this.set(this.h1 + c + E | 0, this.h2 + l + C | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    as.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const jh = gr(() => new Vh());
let SA = !1;
const RA = function(t) {
  return jh(t);
};
let _A = RA;
function Vr(t) {
  const e = Ge(t, "data");
  return V(_A(e));
}
Vr._ = RA;
Vr.lock = function() {
  SA = !0;
};
Vr.register = function(t) {
  if (SA)
    throw new TypeError("ripemd160 is locked");
  _A = t;
};
Object.freeze(Vr);
let kA = !1;
const MA = function(t, e, n, r, s) {
  return Sh(t, e, n, r, s);
};
let LA = MA;
function mr(t, e, n, r, s) {
  const i = Ge(t, "password"), o = Ge(e, "salt");
  return V(LA(i, o, n, r, s));
}
mr._ = MA;
mr.lock = function() {
  kA = !0;
};
mr.register = function(t) {
  if (kA)
    throw new Error("pbkdf2 is locked");
  LA = t;
};
Object.freeze(mr);
const TA = function(t) {
  return Dh("sha256").update(t).digest();
};
let OA = TA, PA = !1;
function Mt(t) {
  const e = Ge(t, "data");
  return V(OA(e));
}
Mt._ = TA;
Mt.lock = function() {
  PA = !0;
};
Mt.register = function(t) {
  if (PA)
    throw new Error("sha256 is locked");
  OA = t;
};
Object.freeze(Mt);
Object.freeze(Mt);
const qh = {}, $h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qh
}, Symbol.toStringTag, { value: "Module" })), Wh = BigInt(0), zh = BigInt(36);
function _a(t) {
  t = t.toLowerCase();
  const e = t.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = e[s].charCodeAt(0);
  const r = Ge(Xr(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (e[s] = e[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (e[s + 1] = e[s + 1].toUpperCase());
  return "0x" + e.join("");
}
const ko = {};
for (let t = 0; t < 10; t++)
  ko[String(t)] = String(t);
for (let t = 0; t < 26; t++)
  ko[String.fromCharCode(65 + t)] = String(10 + t);
const ka = 15;
function Kh(t) {
  t = t.toUpperCase(), t = t.substring(4) + t.substring(0, 2) + "00";
  let e = t.split("").map((r) => ko[r]).join("");
  for (; e.length >= ka; ) {
    let r = e.substring(0, ka);
    e = parseInt(r, 10) % 97 + e.substring(r.length);
  }
  let n = String(98 - parseInt(e, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const tl = function() {
  const t = {};
  for (let e = 0; e < 36; e++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[e];
    t[n] = BigInt(e);
  }
  return t;
}();
function el(t) {
  t = t.toLowerCase();
  let e = Wh;
  for (let n = 0; n < t.length; n++)
    e = e * zh + tl[t[n]];
  return e;
}
function nl(t) {
  if (Ct(typeof t == "string", "invalid address", "address", t), t.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    t.startsWith("0x") || (t = "0x" + t);
    const e = _a(t);
    return Ct(!t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || e === t, "bad address checksum", "address", t), e;
  }
  if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Ct(t.substring(2, 4) === Kh(t), "bad icap checksum", "address", t);
    let e = el(t.substring(4)).toString(16);
    for (; e.length < 40; )
      e = "0" + e;
    return _a("0x" + e);
  }
  Ct(!1, "invalid address", "address", t);
}
function vi(t, e) {
  return {
    address: nl(t),
    storageKeys: e.map((n, r) => (Ct(xd(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function rl(t) {
  if (Array.isArray(t))
    return t.map((n, r) => Array.isArray(n) ? (Ct(n.length === 2, "invalid slot set", `value[${r}]`, n), vi(n[0], n[1])) : (Ct(n != null && typeof n == "object", "invalid address-slot set", "value", t), vi(n.address, n.storageKeys)));
  Ct(t != null && typeof t == "object", "invalid access list", "value", t);
  const e = Object.keys(t).map((n) => {
    const r = t[n].reduce((s, i) => (s[i] = !0, s), {});
    return vi(n, Object.keys(r).sort());
  });
  return e.sort((n, r) => n.address.localeCompare(r.address)), e;
}
const sl = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class jr {
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(e) {
    /**
     *  The name of the plugin.
     *
     *  It is recommended to use reverse-domain-notation, which permits
     *  unique names with a known authority as well as hierarchal entries.
     */
    N(this, "name");
    Xs(this, { name: e });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new jr(this.name);
  }
}
class Vs extends jr {
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
      d == null && (d = c), Ct(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), Xs(this, s);
  }
  clone() {
    return new Vs(this.effectiveBlock, this);
  }
}
class js extends jr {
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
    Xs(this, {
      address: n || sl,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new js(this.address, this.targetNetwork);
  }
}
var Zr, Yr;
class UA extends jr {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    Ee(this, Zr, void 0);
    Ee(this, Yr, void 0);
    De(this, Zr, n), De(this, Yr, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return Qt(this, Zr);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return Qt(this, Yr);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Zr = new WeakMap(), Yr = new WeakMap();
const Di = /* @__PURE__ */ new Map();
var er, nr, In;
const jn = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(e, n) {
    Ee(this, er, void 0);
    Ee(this, nr, void 0);
    Ee(this, In, void 0);
    De(this, er, e), De(this, nr, Dn(n)), De(this, In, /* @__PURE__ */ new Map());
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
    return Qt(this, er);
  }
  set name(e) {
    De(this, er, e);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return Qt(this, nr);
  }
  set chainId(e) {
    De(this, nr, Dn(e, "chainId"));
  }
  /**
   *  Returns true if %%other%% matches this network. Any chain ID
   *  must match, and if no chain ID is present, the name must match.
   *
   *  This method does not currently check for additional properties,
   *  such as ENS address or plug-in compatibility.
   */
  matches(e) {
    if (e == null)
      return !1;
    if (typeof e == "string") {
      try {
        return this.chainId === Dn(e);
      } catch {
      }
      return this.name === e;
    }
    if (typeof e == "number" || typeof e == "bigint") {
      try {
        return this.chainId === Dn(e);
      } catch {
      }
      return !1;
    }
    if (typeof e == "object") {
      if (e.chainId != null) {
        try {
          return this.chainId === Dn(e.chainId);
        } catch {
        }
        return !1;
      }
      return e.name != null ? this.name === e.name : !1;
    }
    return !1;
  }
  /**
   *  Returns the list of plugins currently attached to this Network.
   */
  get plugins() {
    return Array.from(Qt(this, In).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(e) {
    if (Qt(this, In).get(e.name))
      throw new Error(`cannot replace existing plugin: ${e.name} `);
    return Qt(this, In).set(e.name, e.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(e) {
    return Qt(this, In).get(e) || null;
  }
  /**
   *  Gets a list of all plugins that match %%name%%, with otr without
   *  a fragment.
   */
  getPlugins(e) {
    return this.plugins.filter((n) => n.name.split("#")[0] === e);
  }
  /**
   *  Create a copy of this Network.
   */
  clone() {
    const e = new jn(this.name, this.chainId);
    return this.plugins.forEach((n) => {
      e.attachPlugin(n.clone());
    }), e;
  }
  /**
   *  Compute the intrinsic gas required for a transaction.
   *
   *  A GasCostPlugin can be attached to override the default
   *  values.
   */
  computeIntrinsicGas(e) {
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new Vs();
    let r = n.txBase;
    if (e.to == null && (r += n.txCreate), e.data)
      for (let s = 2; s < e.data.length; s += 2)
        e.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (e.accessList) {
      const s = rl(e.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(e) {
    if (ol(), e == null)
      return jn.from("mainnet");
    if (typeof e == "number" && (e = BigInt(e)), typeof e == "string" || typeof e == "bigint") {
      const n = Di.get(e);
      if (n)
        return n();
      if (typeof e == "bigint")
        return new jn("unknown", e);
      Ct(!1, "unknown network", "network", e);
    }
    if (typeof e.clone == "function")
      return e.clone();
    if (typeof e == "object") {
      Ct(typeof e.name == "string" && typeof e.chainId == "number", "invalid network object name or chainId", "network", e);
      const n = new jn(e.name, e.chainId);
      return (e.ensAddress || e.ensNetwork != null) && n.attachPlugin(new js(e.ensAddress, e.ensNetwork)), n;
    }
    Ct(!1, "invalid network", "network", e);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(e, n) {
    typeof e == "number" && (e = BigInt(e));
    const r = Di.get(e);
    r && Ct(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", e), Di.set(e, n);
  }
};
let Sn = jn;
er = new WeakMap(), nr = new WeakMap(), In = new WeakMap();
function Ma(t, e) {
  const n = String(t);
  if (!n.match(/^[0-9.]+$/))
    throw new Error(`invalid gwei value: ${t}`);
  const r = n.split(".");
  if (r.length === 1 && r.push(""), r.length !== 2)
    throw new Error(`invalid gwei value: ${t}`);
  for (; r[1].length < e; )
    r[1] += "0";
  if (r[1].length > 9) {
    let s = BigInt(r[1].substring(0, 9));
    r[1].substring(9).match(/^0+$/) || s++, r[1] = s.toString();
  }
  return BigInt(r[0] + r[1]);
}
function La(t) {
  return new UA(t, async (e, n, r) => {
    r.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, o] = await Promise.all([
        r.send(),
        e()
      ]);
      s = i;
      const c = s.bodyJson.standard;
      return {
        gasPrice: o.gasPrice,
        maxFeePerGas: Ma(c.maxFee, 9),
        maxPriorityFeePerGas: Ma(c.maxPriorityFee, 9)
      };
    } catch (i) {
      fr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function il(t) {
  return new UA("data:", async (e, n, r) => {
    const s = await e();
    if (s.maxFeePerGas == null || s.maxPriorityFeePerGas == null)
      return s;
    const i = s.maxFeePerGas - s.maxPriorityFeePerGas;
    return {
      gasPrice: s.gasPrice,
      maxFeePerGas: i + t,
      maxPriorityFeePerGas: t
    };
  });
}
let Ta = !1;
function ol() {
  if (Ta)
    return;
  Ta = !0;
  function t(e, n, r) {
    const s = function() {
      const i = new Sn(e, n);
      return r.ensNetwork != null && i.attachPlugin(new js(null, r.ensNetwork)), i.attachPlugin(new Vs()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Sn.register(e, s), Sn.register(n, s), r.altNames && r.altNames.forEach((i) => {
      Sn.register(i, s);
    });
  }
  t("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), t("ropsten", 3, { ensNetwork: 3 }), t("rinkeby", 4, { ensNetwork: 4 }), t("goerli", 5, { ensNetwork: 5 }), t("kovan", 42, { ensNetwork: 42 }), t("sepolia", 11155111, {}), t("classic", 61, {}), t("classicKotti", 6, {}), t("arbitrum", 42161, {
    ensNetwork: 1
  }), t("arbitrum-goerli", 421613, {}), t("bnb", 56, { ensNetwork: 1 }), t("bnbt", 97, {}), t("linea", 59144, { ensNetwork: 1 }), t("linea-goerli", 59140, {}), t("matic", 137, {
    ensNetwork: 1,
    plugins: [
      La("https://gasstation.polygon.technology/v2")
    ]
  }), t("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      La("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), t("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      il(BigInt("1000000"))
    ]
  }), t("optimism-goerli", 420, {}), t("xdai", 100, { ensNetwork: 1 });
}
var wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function al(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Mo(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      if (this instanceof r) {
        var s = [null];
        s.push.apply(s, arguments);
        var i = Function.bind.apply(e, s);
        return new i();
      }
      return e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var Lo = { exports: {} };
const cl = /* @__PURE__ */ Mo($h);
Lo.exports;
(function(t) {
  (function(e, n) {
    function r(y, a) {
      if (!y)
        throw new Error(a || "Assertion failed");
    }
    function s(y, a) {
      y.super_ = a;
      var A = function() {
      };
      A.prototype = a.prototype, y.prototype = new A(), y.prototype.constructor = y;
    }
    function i(y, a, A) {
      if (i.isBN(y))
        return y;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, y !== null && ((a === "le" || a === "be") && (A = a, a = 10), this._init(y || 0, a || 10, A || "be"));
    }
    typeof e == "object" ? e.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = cl.Buffer;
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
      var f, w, B = 0;
      if (h === "be")
        for (m = a.length - 1, f = 0; m >= 0; m -= 3)
          w = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[f] |= w << B & 67108863, this.words[f + 1] = w >>> 26 - B & 67108863, B += 24, B >= 26 && (B -= 26, f++);
      else if (h === "le")
        for (m = 0, f = 0; m < a.length; m += 3)
          w = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[f] |= w << B & 67108863, this.words[f + 1] = w >>> 26 - B & 67108863, B += 24, B >= 26 && (B -= 26, f++);
      return this._strip();
    };
    function c(y, a) {
      var A = y.charCodeAt(a);
      if (A >= 48 && A <= 57)
        return A - 48;
      if (A >= 65 && A <= 70)
        return A - 55;
      if (A >= 97 && A <= 102)
        return A - 87;
      r(!1, "Invalid character in " + y);
    }
    function d(y, a, A) {
      var h = c(y, A);
      return A - 1 >= a && (h |= c(y, A - 1) << 4), h;
    }
    i.prototype._parseHex = function(a, A, h) {
      this.length = Math.ceil((a.length - A) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var f = 0, w = 0, B;
      if (h === "be")
        for (m = a.length - 1; m >= A; m -= 2)
          B = d(a, A, m) << f, this.words[w] |= B & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= B >>> 26) : f += 8;
      else {
        var p = a.length - A;
        for (m = p % 2 === 0 ? A + 1 : A; m < a.length; m += 2)
          B = d(a, A, m) << f, this.words[w] |= B & 67108863, f >= 18 ? (f -= 18, w += 1, this.words[w] |= B >>> 26) : f += 8;
      }
      this._strip();
    };
    function l(y, a, A, h) {
      for (var m = 0, f = 0, w = Math.min(y.length, A), B = a; B < w; B++) {
        var p = y.charCodeAt(B) - 48;
        m *= h, p >= 49 ? f = p - 49 + 10 : p >= 17 ? f = p - 17 + 10 : f = p, r(p >= 0 && f < h, "Invalid character"), m += f;
      }
      return m;
    }
    i.prototype._parseBase = function(a, A, h) {
      this.words = [0], this.length = 1;
      for (var m = 0, f = 1; f <= 67108863; f *= A)
        m++;
      m--, f = f / A | 0;
      for (var w = a.length - h, B = w % m, p = Math.min(w, w - B) + h, u = 0, I = h; I < p; I += m)
        u = l(a, I, I + m, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (B !== 0) {
        var Z = 1;
        for (u = l(a, I, a.length, A), I = 0; I < B; I++)
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
    function E(y, a) {
      y.words = a.words, y.length = a.length, y.negative = a.negative, y.red = a.red;
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
    i.prototype.toString = function(a, A) {
      a = a || 10, A = A | 0 || 1;
      var h;
      if (a === 16 || a === "hex") {
        h = "";
        for (var m = 0, f = 0, w = 0; w < this.length; w++) {
          var B = this.words[w], p = ((B << m | f) & 16777215).toString(16);
          f = B >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, w--), f !== 0 || w !== this.length - 1 ? h = C[6 - p.length] + p + h : h = p + h;
        }
        for (f !== 0 && (h = f.toString(16) + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = x[a], I = F[a];
        h = "";
        var Z = this.clone();
        for (Z.negative = 0; !Z.isZero(); ) {
          var X = Z.modrn(I).toString(a);
          Z = Z.idivn(I), Z.isZero() ? h = X + h : h = C[u - X.length] + X + h;
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
      var w = b(a, f), B = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + B](w, m), w;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var h = 0, m = 0, f = 0, w = 0; f < this.length; f++) {
        var B = this.words[f] << w | m;
        a[h++] = B & 255, h < a.length && (a[h++] = B >> 8 & 255), h < a.length && (a[h++] = B >> 16 & 255), w === 6 ? (h < a.length && (a[h++] = B >> 24 & 255), m = 0, w = 0) : (m = B >>> 24, w += 2);
      }
      if (h < a.length)
        for (a[h++] = m; h < a.length; )
          a[h++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var h = a.length - 1, m = 0, f = 0, w = 0; f < this.length; f++) {
        var B = this.words[f] << w | m;
        a[h--] = B & 255, h >= 0 && (a[h--] = B >> 8 & 255), h >= 0 && (a[h--] = B >> 16 & 255), w === 6 ? (h >= 0 && (a[h--] = B >> 24 & 255), m = 0, w = 0) : (m = B >>> 24, w += 2);
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
    function v(y) {
      for (var a = new Array(y.bitLength()), A = 0; A < a.length; A++) {
        var h = A / 26 | 0, m = A % 26;
        a[A] = y.words[h] >>> m & 1;
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
      for (var w = 0, B = 0; B < f.length; B++)
        A = (m.words[B] | 0) - (f.words[B] | 0) + w, w = A >> 26, this.words[B] = A & 67108863;
      for (; w !== 0 && B < m.length; B++)
        A = (m.words[B] | 0) + w, w = A >> 26, this.words[B] = A & 67108863;
      if (w === 0 && B < m.length && m !== this)
        for (; B < m.length; B++)
          this.words[B] = m.words[B];
      return this.length = Math.max(this.length, B), m !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function S(y, a, A) {
      A.negative = a.negative ^ y.negative;
      var h = y.length + a.length | 0;
      A.length = h, h = h - 1 | 0;
      var m = y.words[0] | 0, f = a.words[0] | 0, w = m * f, B = w & 67108863, p = w / 67108864 | 0;
      A.words[0] = B;
      for (var u = 1; u < h; u++) {
        for (var I = p >>> 26, Z = p & 67108863, X = Math.min(u, a.length - 1), z = Math.max(0, u - y.length + 1); z <= X; z++) {
          var q = u - z | 0;
          m = y.words[q] | 0, f = a.words[z] | 0, w = m * f + Z, I += w / 67108864 | 0, Z = w & 67108863;
        }
        A.words[u] = Z | 0, p = I | 0;
      }
      return p !== 0 ? A.words[u] = p | 0 : A.length--, A._strip();
    }
    var J = function(a, A, h) {
      var m = a.words, f = A.words, w = h.words, B = 0, p, u, I, Z = m[0] | 0, X = Z & 8191, z = Z >>> 13, q = m[1] | 0, nt = q & 8191, rt = q >>> 13, Rt = m[2] | 0, ft = Rt & 8191, it = Rt >>> 13, Nt = m[3] | 0, ht = Nt & 8191, gt = Nt >>> 13, Ve = m[4] | 0, St = Ve & 8191, Bt = Ve >>> 13, Br = m[5] | 0, _t = Br & 8191, Tt = Br >>> 13, rs = m[6] | 0, Ut = rs & 8191, Gt = rs >>> 13, ha = m[7] | 0, Ht = ha & 8191, Jt = ha >>> 13, la = m[8] | 0, Zt = la & 8191, Yt = la >>> 13, fa = m[9] | 0, Xt = fa & 8191, Vt = fa >>> 13, ga = f[0] | 0, jt = ga & 8191, qt = ga >>> 13, pa = f[1] | 0, $t = pa & 8191, Wt = pa >>> 13, ma = f[2] | 0, zt = ma & 8191, Kt = ma >>> 13, Ia = f[3] | 0, te = Ia & 8191, ee = Ia >>> 13, wa = f[4] | 0, ne = wa & 8191, re = wa >>> 13, Ea = f[5] | 0, se = Ea & 8191, ie = Ea >>> 13, Ba = f[6] | 0, oe = Ba & 8191, ae = Ba >>> 13, ya = f[7] | 0, ce = ya & 8191, Ae = ya >>> 13, Ca = f[8] | 0, ue = Ca & 8191, de = Ca >>> 13, ba = f[9] | 0, he = ba & 8191, le = ba >>> 13;
      h.negative = a.negative ^ A.negative, h.length = 19, p = Math.imul(X, jt), u = Math.imul(X, qt), u = u + Math.imul(z, jt) | 0, I = Math.imul(z, qt);
      var ci = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (ci >>> 26) | 0, ci &= 67108863, p = Math.imul(nt, jt), u = Math.imul(nt, qt), u = u + Math.imul(rt, jt) | 0, I = Math.imul(rt, qt), p = p + Math.imul(X, $t) | 0, u = u + Math.imul(X, Wt) | 0, u = u + Math.imul(z, $t) | 0, I = I + Math.imul(z, Wt) | 0;
      var Ai = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (Ai >>> 26) | 0, Ai &= 67108863, p = Math.imul(ft, jt), u = Math.imul(ft, qt), u = u + Math.imul(it, jt) | 0, I = Math.imul(it, qt), p = p + Math.imul(nt, $t) | 0, u = u + Math.imul(nt, Wt) | 0, u = u + Math.imul(rt, $t) | 0, I = I + Math.imul(rt, Wt) | 0, p = p + Math.imul(X, zt) | 0, u = u + Math.imul(X, Kt) | 0, u = u + Math.imul(z, zt) | 0, I = I + Math.imul(z, Kt) | 0;
      var ui = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (ui >>> 26) | 0, ui &= 67108863, p = Math.imul(ht, jt), u = Math.imul(ht, qt), u = u + Math.imul(gt, jt) | 0, I = Math.imul(gt, qt), p = p + Math.imul(ft, $t) | 0, u = u + Math.imul(ft, Wt) | 0, u = u + Math.imul(it, $t) | 0, I = I + Math.imul(it, Wt) | 0, p = p + Math.imul(nt, zt) | 0, u = u + Math.imul(nt, Kt) | 0, u = u + Math.imul(rt, zt) | 0, I = I + Math.imul(rt, Kt) | 0, p = p + Math.imul(X, te) | 0, u = u + Math.imul(X, ee) | 0, u = u + Math.imul(z, te) | 0, I = I + Math.imul(z, ee) | 0;
      var di = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (di >>> 26) | 0, di &= 67108863, p = Math.imul(St, jt), u = Math.imul(St, qt), u = u + Math.imul(Bt, jt) | 0, I = Math.imul(Bt, qt), p = p + Math.imul(ht, $t) | 0, u = u + Math.imul(ht, Wt) | 0, u = u + Math.imul(gt, $t) | 0, I = I + Math.imul(gt, Wt) | 0, p = p + Math.imul(ft, zt) | 0, u = u + Math.imul(ft, Kt) | 0, u = u + Math.imul(it, zt) | 0, I = I + Math.imul(it, Kt) | 0, p = p + Math.imul(nt, te) | 0, u = u + Math.imul(nt, ee) | 0, u = u + Math.imul(rt, te) | 0, I = I + Math.imul(rt, ee) | 0, p = p + Math.imul(X, ne) | 0, u = u + Math.imul(X, re) | 0, u = u + Math.imul(z, ne) | 0, I = I + Math.imul(z, re) | 0;
      var hi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (hi >>> 26) | 0, hi &= 67108863, p = Math.imul(_t, jt), u = Math.imul(_t, qt), u = u + Math.imul(Tt, jt) | 0, I = Math.imul(Tt, qt), p = p + Math.imul(St, $t) | 0, u = u + Math.imul(St, Wt) | 0, u = u + Math.imul(Bt, $t) | 0, I = I + Math.imul(Bt, Wt) | 0, p = p + Math.imul(ht, zt) | 0, u = u + Math.imul(ht, Kt) | 0, u = u + Math.imul(gt, zt) | 0, I = I + Math.imul(gt, Kt) | 0, p = p + Math.imul(ft, te) | 0, u = u + Math.imul(ft, ee) | 0, u = u + Math.imul(it, te) | 0, I = I + Math.imul(it, ee) | 0, p = p + Math.imul(nt, ne) | 0, u = u + Math.imul(nt, re) | 0, u = u + Math.imul(rt, ne) | 0, I = I + Math.imul(rt, re) | 0, p = p + Math.imul(X, se) | 0, u = u + Math.imul(X, ie) | 0, u = u + Math.imul(z, se) | 0, I = I + Math.imul(z, ie) | 0;
      var li = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (li >>> 26) | 0, li &= 67108863, p = Math.imul(Ut, jt), u = Math.imul(Ut, qt), u = u + Math.imul(Gt, jt) | 0, I = Math.imul(Gt, qt), p = p + Math.imul(_t, $t) | 0, u = u + Math.imul(_t, Wt) | 0, u = u + Math.imul(Tt, $t) | 0, I = I + Math.imul(Tt, Wt) | 0, p = p + Math.imul(St, zt) | 0, u = u + Math.imul(St, Kt) | 0, u = u + Math.imul(Bt, zt) | 0, I = I + Math.imul(Bt, Kt) | 0, p = p + Math.imul(ht, te) | 0, u = u + Math.imul(ht, ee) | 0, u = u + Math.imul(gt, te) | 0, I = I + Math.imul(gt, ee) | 0, p = p + Math.imul(ft, ne) | 0, u = u + Math.imul(ft, re) | 0, u = u + Math.imul(it, ne) | 0, I = I + Math.imul(it, re) | 0, p = p + Math.imul(nt, se) | 0, u = u + Math.imul(nt, ie) | 0, u = u + Math.imul(rt, se) | 0, I = I + Math.imul(rt, ie) | 0, p = p + Math.imul(X, oe) | 0, u = u + Math.imul(X, ae) | 0, u = u + Math.imul(z, oe) | 0, I = I + Math.imul(z, ae) | 0;
      var fi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (fi >>> 26) | 0, fi &= 67108863, p = Math.imul(Ht, jt), u = Math.imul(Ht, qt), u = u + Math.imul(Jt, jt) | 0, I = Math.imul(Jt, qt), p = p + Math.imul(Ut, $t) | 0, u = u + Math.imul(Ut, Wt) | 0, u = u + Math.imul(Gt, $t) | 0, I = I + Math.imul(Gt, Wt) | 0, p = p + Math.imul(_t, zt) | 0, u = u + Math.imul(_t, Kt) | 0, u = u + Math.imul(Tt, zt) | 0, I = I + Math.imul(Tt, Kt) | 0, p = p + Math.imul(St, te) | 0, u = u + Math.imul(St, ee) | 0, u = u + Math.imul(Bt, te) | 0, I = I + Math.imul(Bt, ee) | 0, p = p + Math.imul(ht, ne) | 0, u = u + Math.imul(ht, re) | 0, u = u + Math.imul(gt, ne) | 0, I = I + Math.imul(gt, re) | 0, p = p + Math.imul(ft, se) | 0, u = u + Math.imul(ft, ie) | 0, u = u + Math.imul(it, se) | 0, I = I + Math.imul(it, ie) | 0, p = p + Math.imul(nt, oe) | 0, u = u + Math.imul(nt, ae) | 0, u = u + Math.imul(rt, oe) | 0, I = I + Math.imul(rt, ae) | 0, p = p + Math.imul(X, ce) | 0, u = u + Math.imul(X, Ae) | 0, u = u + Math.imul(z, ce) | 0, I = I + Math.imul(z, Ae) | 0;
      var gi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (gi >>> 26) | 0, gi &= 67108863, p = Math.imul(Zt, jt), u = Math.imul(Zt, qt), u = u + Math.imul(Yt, jt) | 0, I = Math.imul(Yt, qt), p = p + Math.imul(Ht, $t) | 0, u = u + Math.imul(Ht, Wt) | 0, u = u + Math.imul(Jt, $t) | 0, I = I + Math.imul(Jt, Wt) | 0, p = p + Math.imul(Ut, zt) | 0, u = u + Math.imul(Ut, Kt) | 0, u = u + Math.imul(Gt, zt) | 0, I = I + Math.imul(Gt, Kt) | 0, p = p + Math.imul(_t, te) | 0, u = u + Math.imul(_t, ee) | 0, u = u + Math.imul(Tt, te) | 0, I = I + Math.imul(Tt, ee) | 0, p = p + Math.imul(St, ne) | 0, u = u + Math.imul(St, re) | 0, u = u + Math.imul(Bt, ne) | 0, I = I + Math.imul(Bt, re) | 0, p = p + Math.imul(ht, se) | 0, u = u + Math.imul(ht, ie) | 0, u = u + Math.imul(gt, se) | 0, I = I + Math.imul(gt, ie) | 0, p = p + Math.imul(ft, oe) | 0, u = u + Math.imul(ft, ae) | 0, u = u + Math.imul(it, oe) | 0, I = I + Math.imul(it, ae) | 0, p = p + Math.imul(nt, ce) | 0, u = u + Math.imul(nt, Ae) | 0, u = u + Math.imul(rt, ce) | 0, I = I + Math.imul(rt, Ae) | 0, p = p + Math.imul(X, ue) | 0, u = u + Math.imul(X, de) | 0, u = u + Math.imul(z, ue) | 0, I = I + Math.imul(z, de) | 0;
      var pi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (pi >>> 26) | 0, pi &= 67108863, p = Math.imul(Xt, jt), u = Math.imul(Xt, qt), u = u + Math.imul(Vt, jt) | 0, I = Math.imul(Vt, qt), p = p + Math.imul(Zt, $t) | 0, u = u + Math.imul(Zt, Wt) | 0, u = u + Math.imul(Yt, $t) | 0, I = I + Math.imul(Yt, Wt) | 0, p = p + Math.imul(Ht, zt) | 0, u = u + Math.imul(Ht, Kt) | 0, u = u + Math.imul(Jt, zt) | 0, I = I + Math.imul(Jt, Kt) | 0, p = p + Math.imul(Ut, te) | 0, u = u + Math.imul(Ut, ee) | 0, u = u + Math.imul(Gt, te) | 0, I = I + Math.imul(Gt, ee) | 0, p = p + Math.imul(_t, ne) | 0, u = u + Math.imul(_t, re) | 0, u = u + Math.imul(Tt, ne) | 0, I = I + Math.imul(Tt, re) | 0, p = p + Math.imul(St, se) | 0, u = u + Math.imul(St, ie) | 0, u = u + Math.imul(Bt, se) | 0, I = I + Math.imul(Bt, ie) | 0, p = p + Math.imul(ht, oe) | 0, u = u + Math.imul(ht, ae) | 0, u = u + Math.imul(gt, oe) | 0, I = I + Math.imul(gt, ae) | 0, p = p + Math.imul(ft, ce) | 0, u = u + Math.imul(ft, Ae) | 0, u = u + Math.imul(it, ce) | 0, I = I + Math.imul(it, Ae) | 0, p = p + Math.imul(nt, ue) | 0, u = u + Math.imul(nt, de) | 0, u = u + Math.imul(rt, ue) | 0, I = I + Math.imul(rt, de) | 0, p = p + Math.imul(X, he) | 0, u = u + Math.imul(X, le) | 0, u = u + Math.imul(z, he) | 0, I = I + Math.imul(z, le) | 0;
      var mi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (mi >>> 26) | 0, mi &= 67108863, p = Math.imul(Xt, $t), u = Math.imul(Xt, Wt), u = u + Math.imul(Vt, $t) | 0, I = Math.imul(Vt, Wt), p = p + Math.imul(Zt, zt) | 0, u = u + Math.imul(Zt, Kt) | 0, u = u + Math.imul(Yt, zt) | 0, I = I + Math.imul(Yt, Kt) | 0, p = p + Math.imul(Ht, te) | 0, u = u + Math.imul(Ht, ee) | 0, u = u + Math.imul(Jt, te) | 0, I = I + Math.imul(Jt, ee) | 0, p = p + Math.imul(Ut, ne) | 0, u = u + Math.imul(Ut, re) | 0, u = u + Math.imul(Gt, ne) | 0, I = I + Math.imul(Gt, re) | 0, p = p + Math.imul(_t, se) | 0, u = u + Math.imul(_t, ie) | 0, u = u + Math.imul(Tt, se) | 0, I = I + Math.imul(Tt, ie) | 0, p = p + Math.imul(St, oe) | 0, u = u + Math.imul(St, ae) | 0, u = u + Math.imul(Bt, oe) | 0, I = I + Math.imul(Bt, ae) | 0, p = p + Math.imul(ht, ce) | 0, u = u + Math.imul(ht, Ae) | 0, u = u + Math.imul(gt, ce) | 0, I = I + Math.imul(gt, Ae) | 0, p = p + Math.imul(ft, ue) | 0, u = u + Math.imul(ft, de) | 0, u = u + Math.imul(it, ue) | 0, I = I + Math.imul(it, de) | 0, p = p + Math.imul(nt, he) | 0, u = u + Math.imul(nt, le) | 0, u = u + Math.imul(rt, he) | 0, I = I + Math.imul(rt, le) | 0;
      var Ii = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, p = Math.imul(Xt, zt), u = Math.imul(Xt, Kt), u = u + Math.imul(Vt, zt) | 0, I = Math.imul(Vt, Kt), p = p + Math.imul(Zt, te) | 0, u = u + Math.imul(Zt, ee) | 0, u = u + Math.imul(Yt, te) | 0, I = I + Math.imul(Yt, ee) | 0, p = p + Math.imul(Ht, ne) | 0, u = u + Math.imul(Ht, re) | 0, u = u + Math.imul(Jt, ne) | 0, I = I + Math.imul(Jt, re) | 0, p = p + Math.imul(Ut, se) | 0, u = u + Math.imul(Ut, ie) | 0, u = u + Math.imul(Gt, se) | 0, I = I + Math.imul(Gt, ie) | 0, p = p + Math.imul(_t, oe) | 0, u = u + Math.imul(_t, ae) | 0, u = u + Math.imul(Tt, oe) | 0, I = I + Math.imul(Tt, ae) | 0, p = p + Math.imul(St, ce) | 0, u = u + Math.imul(St, Ae) | 0, u = u + Math.imul(Bt, ce) | 0, I = I + Math.imul(Bt, Ae) | 0, p = p + Math.imul(ht, ue) | 0, u = u + Math.imul(ht, de) | 0, u = u + Math.imul(gt, ue) | 0, I = I + Math.imul(gt, de) | 0, p = p + Math.imul(ft, he) | 0, u = u + Math.imul(ft, le) | 0, u = u + Math.imul(it, he) | 0, I = I + Math.imul(it, le) | 0;
      var wi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (wi >>> 26) | 0, wi &= 67108863, p = Math.imul(Xt, te), u = Math.imul(Xt, ee), u = u + Math.imul(Vt, te) | 0, I = Math.imul(Vt, ee), p = p + Math.imul(Zt, ne) | 0, u = u + Math.imul(Zt, re) | 0, u = u + Math.imul(Yt, ne) | 0, I = I + Math.imul(Yt, re) | 0, p = p + Math.imul(Ht, se) | 0, u = u + Math.imul(Ht, ie) | 0, u = u + Math.imul(Jt, se) | 0, I = I + Math.imul(Jt, ie) | 0, p = p + Math.imul(Ut, oe) | 0, u = u + Math.imul(Ut, ae) | 0, u = u + Math.imul(Gt, oe) | 0, I = I + Math.imul(Gt, ae) | 0, p = p + Math.imul(_t, ce) | 0, u = u + Math.imul(_t, Ae) | 0, u = u + Math.imul(Tt, ce) | 0, I = I + Math.imul(Tt, Ae) | 0, p = p + Math.imul(St, ue) | 0, u = u + Math.imul(St, de) | 0, u = u + Math.imul(Bt, ue) | 0, I = I + Math.imul(Bt, de) | 0, p = p + Math.imul(ht, he) | 0, u = u + Math.imul(ht, le) | 0, u = u + Math.imul(gt, he) | 0, I = I + Math.imul(gt, le) | 0;
      var Ei = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, p = Math.imul(Xt, ne), u = Math.imul(Xt, re), u = u + Math.imul(Vt, ne) | 0, I = Math.imul(Vt, re), p = p + Math.imul(Zt, se) | 0, u = u + Math.imul(Zt, ie) | 0, u = u + Math.imul(Yt, se) | 0, I = I + Math.imul(Yt, ie) | 0, p = p + Math.imul(Ht, oe) | 0, u = u + Math.imul(Ht, ae) | 0, u = u + Math.imul(Jt, oe) | 0, I = I + Math.imul(Jt, ae) | 0, p = p + Math.imul(Ut, ce) | 0, u = u + Math.imul(Ut, Ae) | 0, u = u + Math.imul(Gt, ce) | 0, I = I + Math.imul(Gt, Ae) | 0, p = p + Math.imul(_t, ue) | 0, u = u + Math.imul(_t, de) | 0, u = u + Math.imul(Tt, ue) | 0, I = I + Math.imul(Tt, de) | 0, p = p + Math.imul(St, he) | 0, u = u + Math.imul(St, le) | 0, u = u + Math.imul(Bt, he) | 0, I = I + Math.imul(Bt, le) | 0;
      var Bi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, p = Math.imul(Xt, se), u = Math.imul(Xt, ie), u = u + Math.imul(Vt, se) | 0, I = Math.imul(Vt, ie), p = p + Math.imul(Zt, oe) | 0, u = u + Math.imul(Zt, ae) | 0, u = u + Math.imul(Yt, oe) | 0, I = I + Math.imul(Yt, ae) | 0, p = p + Math.imul(Ht, ce) | 0, u = u + Math.imul(Ht, Ae) | 0, u = u + Math.imul(Jt, ce) | 0, I = I + Math.imul(Jt, Ae) | 0, p = p + Math.imul(Ut, ue) | 0, u = u + Math.imul(Ut, de) | 0, u = u + Math.imul(Gt, ue) | 0, I = I + Math.imul(Gt, de) | 0, p = p + Math.imul(_t, he) | 0, u = u + Math.imul(_t, le) | 0, u = u + Math.imul(Tt, he) | 0, I = I + Math.imul(Tt, le) | 0;
      var yi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (yi >>> 26) | 0, yi &= 67108863, p = Math.imul(Xt, oe), u = Math.imul(Xt, ae), u = u + Math.imul(Vt, oe) | 0, I = Math.imul(Vt, ae), p = p + Math.imul(Zt, ce) | 0, u = u + Math.imul(Zt, Ae) | 0, u = u + Math.imul(Yt, ce) | 0, I = I + Math.imul(Yt, Ae) | 0, p = p + Math.imul(Ht, ue) | 0, u = u + Math.imul(Ht, de) | 0, u = u + Math.imul(Jt, ue) | 0, I = I + Math.imul(Jt, de) | 0, p = p + Math.imul(Ut, he) | 0, u = u + Math.imul(Ut, le) | 0, u = u + Math.imul(Gt, he) | 0, I = I + Math.imul(Gt, le) | 0;
      var Ci = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, p = Math.imul(Xt, ce), u = Math.imul(Xt, Ae), u = u + Math.imul(Vt, ce) | 0, I = Math.imul(Vt, Ae), p = p + Math.imul(Zt, ue) | 0, u = u + Math.imul(Zt, de) | 0, u = u + Math.imul(Yt, ue) | 0, I = I + Math.imul(Yt, de) | 0, p = p + Math.imul(Ht, he) | 0, u = u + Math.imul(Ht, le) | 0, u = u + Math.imul(Jt, he) | 0, I = I + Math.imul(Jt, le) | 0;
      var bi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, p = Math.imul(Xt, ue), u = Math.imul(Xt, de), u = u + Math.imul(Vt, ue) | 0, I = Math.imul(Vt, de), p = p + Math.imul(Zt, he) | 0, u = u + Math.imul(Zt, le) | 0, u = u + Math.imul(Yt, he) | 0, I = I + Math.imul(Yt, le) | 0;
      var Qi = (B + p | 0) + ((u & 8191) << 13) | 0;
      B = (I + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, p = Math.imul(Xt, he), u = Math.imul(Xt, le), u = u + Math.imul(Vt, he) | 0, I = Math.imul(Vt, le);
      var xi = (B + p | 0) + ((u & 8191) << 13) | 0;
      return B = (I + (u >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, w[0] = ci, w[1] = Ai, w[2] = ui, w[3] = di, w[4] = hi, w[5] = li, w[6] = fi, w[7] = gi, w[8] = pi, w[9] = mi, w[10] = Ii, w[11] = wi, w[12] = Ei, w[13] = Bi, w[14] = yi, w[15] = Ci, w[16] = bi, w[17] = Qi, w[18] = xi, B !== 0 && (w[19] = B, h.length++), h;
    };
    Math.imul || (J = S);
    function O(y, a, A) {
      A.negative = a.negative ^ y.negative, A.length = y.length + a.length;
      for (var h = 0, m = 0, f = 0; f < A.length - 1; f++) {
        var w = m;
        m = 0;
        for (var B = h & 67108863, p = Math.min(f, a.length - 1), u = Math.max(0, f - y.length + 1); u <= p; u++) {
          var I = f - u, Z = y.words[I] | 0, X = a.words[u] | 0, z = Z * X, q = z & 67108863;
          w = w + (z / 67108864 | 0) | 0, q = q + B | 0, B = q & 67108863, w = w + (q >>> 26) | 0, m += w >>> 26, w &= 67108863;
        }
        A.words[f] = B, h = w, w = m;
      }
      return h !== 0 ? A.words[f] = h : A.length--, A._strip();
    }
    function j(y, a, A) {
      return O(y, a, A);
    }
    i.prototype.mulTo = function(a, A) {
      var h, m = this.length + a.length;
      return this.length === 10 && a.length === 10 ? h = J(this, a, A) : m < 63 ? h = S(this, a, A) : m < 1024 ? h = O(this, a, A) : h = j(this, a, A), h;
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
      var A = v(a);
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
          var B = this.words[f] & m, p = (this.words[f] | 0) - B << A;
          this.words[f] = p | w, w = B >>> 26 - A;
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
      var f = a % 26, w = Math.min((a - f) / 26, this.length), B = 67108863 ^ 67108863 >>> f << f, p = h;
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
      var I = 0;
      for (u = this.length - 1; u >= 0 && (I !== 0 || u >= m); u--) {
        var Z = this.words[u] | 0;
        this.words[u] = I << 26 - f | Z >>> f, I = Z & B;
      }
      return p && I !== 0 && (p.words[p.length++] = I), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
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
      var w, B = 0;
      for (f = 0; f < a.length; f++) {
        w = (this.words[f + h] | 0) + B;
        var p = (a.words[f] | 0) * A;
        w -= p & 67108863, B = (w >> 26) - (p / 67108864 | 0), this.words[f + h] = w & 67108863;
      }
      for (; f < this.length - h; f++)
        w = (this.words[f + h] | 0) + B, B = w >> 26, this.words[f + h] = w & 67108863;
      if (B === 0)
        return this._strip();
      for (r(B === -1), B = 0, f = 0; f < this.length; f++)
        w = -(this.words[f] | 0) + B, B = w >> 26, this.words[f] = w & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var h = this.length - a.length, m = this.clone(), f = a, w = f.words[f.length - 1] | 0, B = this._countBits(w);
      h = 26 - B, h !== 0 && (f = f.ushln(h), m.iushln(h), w = f.words[f.length - 1] | 0);
      var p = m.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = p + 1, u.words = new Array(u.length);
        for (var I = 0; I < u.length; I++)
          u.words[I] = 0;
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
      for (var m = new i(1), f = new i(0), w = new i(0), B = new i(1), p = 0; A.isEven() && h.isEven(); )
        A.iushrn(1), h.iushrn(1), ++p;
      for (var u = h.clone(), I = A.clone(); !A.isZero(); ) {
        for (var Z = 0, X = 1; !(A.words[0] & X) && Z < 26; ++Z, X <<= 1)
          ;
        if (Z > 0)
          for (A.iushrn(Z); Z-- > 0; )
            (m.isOdd() || f.isOdd()) && (m.iadd(u), f.isub(I)), m.iushrn(1), f.iushrn(1);
        for (var z = 0, q = 1; !(h.words[0] & q) && z < 26; ++z, q <<= 1)
          ;
        if (z > 0)
          for (h.iushrn(z); z-- > 0; )
            (w.isOdd() || B.isOdd()) && (w.iadd(u), B.isub(I)), w.iushrn(1), B.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), m.isub(w), f.isub(B)) : (h.isub(A), w.isub(m), B.isub(f));
      }
      return {
        a: w,
        b: B,
        gcd: h.iushln(p)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, h = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), w = h.clone(); A.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var B = 0, p = 1; !(A.words[0] & p) && B < 26; ++B, p <<= 1)
          ;
        if (B > 0)
          for (A.iushrn(B); B-- > 0; )
            m.isOdd() && m.iadd(w), m.iushrn(1);
        for (var u = 0, I = 1; !(h.words[0] & I) && u < 26; ++u, I <<= 1)
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
        var B = this.words[w] | 0;
        B += f, f = B >>> 26, B &= 67108863, this.words[w] = B;
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
    function _(y, a) {
      this.name = y, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    _.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, _.prototype.ireduce = function(a) {
      var A = a, h;
      do
        this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), h = A.bitLength();
      while (h > this.n);
      var m = h < this.n ? -1 : A.ucmp(this.p);
      return m === 0 ? (A.words[0] = 0, A.length = 1) : m > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
    }, _.prototype.split = function(a, A) {
      a.iushrn(this.n, 0, A);
    }, _.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function L() {
      _.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(L, _), L.prototype.split = function(a, A) {
      for (var h = 4194303, m = Math.min(a.length, 9), f = 0; f < m; f++)
        A.words[f] = a.words[f];
      if (A.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var w = a.words[9];
      for (A.words[A.length++] = w & h, f = 10; f < a.length; f++) {
        var B = a.words[f] | 0;
        a.words[f - 10] = (B & h) << 4 | w >>> 22, w = B;
      }
      w >>>= 22, a.words[f - 10] = w, w === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, L.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var A = 0, h = 0; h < a.length; h++) {
        var m = a.words[h] | 0;
        A += m * 977, a.words[h] = A & 67108863, A = m * 64 + (A / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function P() {
      _.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(P, _);
    function $() {
      _.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s($, _);
    function U() {
      _.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(U, _), U.prototype.imulK = function(a) {
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
        A = new L();
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
    function H(y) {
      if (typeof y == "string") {
        var a = i._prime(y);
        this.m = a.p, this.prime = a;
      } else
        r(y.gtn(1), "modulus must be greater than 1"), this.m = y, this.prime = null;
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
      var w = new i(1).toRed(this), B = w.redNeg(), p = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, p).cmp(B) !== 0; )
        u.redIAdd(B);
      for (var I = this.pow(u, m), Z = this.pow(a, m.addn(1).iushrn(1)), X = this.pow(a, m), z = f; X.cmp(w) !== 0; ) {
        for (var q = X, nt = 0; q.cmp(w) !== 0; nt++)
          q = q.redSqr();
        r(nt < z);
        var rt = this.pow(I, new i(1).iushln(z - nt - 1));
        Z = Z.redMul(rt), I = rt.redSqr(), X = X.redMul(I), z = nt;
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
      var w = m[0], B = 0, p = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var I = A.words[f], Z = u - 1; Z >= 0; Z--) {
          var X = I >> Z & 1;
          if (w !== m[0] && (w = this.sqr(w)), X === 0 && B === 0) {
            p = 0;
            continue;
          }
          B <<= 1, B |= X, p++, !(p !== h && (f !== 0 || Z !== 0)) && (w = this.mul(w, m[B]), p = 0, B = 0);
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
      return new tt(a);
    };
    function tt(y) {
      H.call(this, y), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(tt, H), tt.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, tt.prototype.convertFrom = function(a) {
      var A = this.imod(a.mul(this.rinv));
      return A.red = null, A;
    }, tt.prototype.imul = function(a, A) {
      if (a.isZero() || A.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var h = a.imul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, tt.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var h = a.mul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), w = f;
      return f.cmp(this.m) >= 0 ? w = f.isub(this.m) : f.cmpn(0) < 0 && (w = f.iadd(this.m)), w._forceRed(this);
    }, tt.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(t, wt);
})(Lo);
var Al = Lo.exports;
const cs = /* @__PURE__ */ al(Al);
var GA = 9, HA = 3, $i = 9;
function ul(t, e) {
  const { precision: n = GA, minPrecision: r = HA } = e || {}, [s = "0", i = "0"] = String(t || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const E = d.match(/.*[1-9]{1}/), g = (E == null ? void 0 : E[0].length) || 0, C = Math.max(r, g);
    d = d.slice(0, C);
  }
  const l = d ? `.${d}` : "";
  return `${c}${l}`;
}
var Ot = class extends cs {
  constructor(e, n, r) {
    var t = (...args) => {
      super(...args);
      N(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
    };
    if (Ot.isBN(e)) {
      t(e.toArray(), n, r);
      return;
    }
    if (typeof e == "string" && e.slice(0, 2) === "0x") {
      t(e.substring(2), n || "hex", r);
      return;
    }
    t(e ?? 0, n, r);
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(e, n) {
    const r = super.toString(e, n);
    return e === 16 || e === "hex" ? `0x${r}` : r;
  }
  toHex(e) {
    const r = (e || 0) * 2;
    if (this.isNeg())
      throw new D(k.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (e && this.byteLength() > e)
      throw new D(
        k.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${e} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(e) {
    if (this.isNeg())
      throw new D(k.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
    return Uint8Array.from(this.toArray(void 0, e));
  }
  toJSON() {
    return this.toString(16);
  }
  valueOf() {
    return this.toString();
  }
  format(e) {
    const {
      units: n = $i,
      precision: r = GA,
      minPrecision: s = HA
    } = e || {}, i = this.formatUnits(n), o = ul(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [l = "0"] = o.split(".");
        return `${l}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(e = $i) {
    const n = this.toString().slice(0, e * -1), r = this.toString().slice(e * -1), s = r.length, i = Array.from({ length: e - s }).fill("0").join("");
    return `${n ? `${n}.` : "0."}${i}${r}`;
  }
  // END ANCHOR: HELPERS
  // ANCHOR: OVERRIDES to accept better inputs
  add(e) {
    return this.caller(e, "add");
  }
  pow(e) {
    return this.caller(e, "pow");
  }
  sub(e) {
    return this.caller(e, "sub");
  }
  div(e) {
    return this.caller(e, "div");
  }
  mul(e) {
    return this.caller(e, "mul");
  }
  mod(e) {
    return this.caller(e, "mod");
  }
  divRound(e) {
    return this.caller(e, "divRound");
  }
  lt(e) {
    return this.caller(e, "lt");
  }
  lte(e) {
    return this.caller(e, "lte");
  }
  gt(e) {
    return this.caller(e, "gt");
  }
  gte(e) {
    return this.caller(e, "gte");
  }
  eq(e) {
    return this.caller(e, "eq");
  }
  cmp(e) {
    return this.caller(e, "cmp");
  }
  // END ANCHOR: OVERRIDES to accept better inputs
  // ANCHOR: OVERRIDES to output our BN type
  sqr() {
    return new Ot(super.sqr().toArray());
  }
  neg() {
    return new Ot(super.neg().toArray());
  }
  abs() {
    return new Ot(super.abs().toArray());
  }
  toTwos(e) {
    return new Ot(super.toTwos(e).toArray());
  }
  fromTwos(e) {
    return new Ot(super.fromTwos(e).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(e, n) {
    const r = super[n](new Ot(e));
    return Ot.isBN(r) ? new Ot(r.toArray()) : r;
  }
  clone() {
    return new Ot(this.toArray());
  }
  mulTo(e, n) {
    const r = new cs(this.toArray()).mulTo(e, n);
    return new Ot(r.toArray());
  }
  egcd(e) {
    const { a: n, b: r, gcd: s } = new cs(this.toArray()).egcd(e);
    return {
      a: new Ot(n.toArray()),
      b: new Ot(r.toArray()),
      gcd: new Ot(s.toArray())
    };
  }
  divmod(e, n, r) {
    const { div: s, mod: i } = new cs(this.toArray()).divmod(new Ot(e), n, r);
    return {
      div: new Ot(s == null ? void 0 : s.toArray()),
      mod: new Ot(i == null ? void 0 : i.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Ot(this.MAX_U64) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Ot(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Q = (t, e, n) => new Ot(t, e, n);
Q.parseUnits = (t, e = $i) => {
  const n = t === "." ? "0." : t, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > e)
    throw new D(
      k.CONVERTING_FAILED,
      `Decimal can't have more than ${e} digits.`
    );
  const o = Array.from({ length: e }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(c);
};
function Ke(t) {
  return Q(t).toNumber();
}
function To(t, e) {
  return Q(t).toHex(e);
}
function Cn(t, e) {
  return Q(t).toBytes(e);
}
function mB(t, e) {
  return Q(t).formatUnits(e);
}
function IB(t, e) {
  return Q(t).format(e);
}
function dl(...t) {
  return t.reduce((e, n) => Q(n).gt(e) ? Q(n) : e, Q(0));
}
function wB(...t) {
  return Q(Math.ceil(t.reduce((e, n) => Q(e).mul(n), Q(1)).toNumber()));
}
function Wi(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error(`Wrong positive integer: ${t}`);
}
function hl(t) {
  if (typeof t != "boolean")
    throw new Error(`Expected boolean, not ${t}`);
}
function JA(t, ...e) {
  if (!(t instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
}
function ll(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Wi(t.outputLen), Wi(t.blockLen);
}
function fl(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function gl(t, e) {
  JA(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const pl = {
  number: Wi,
  bool: hl,
  bytes: JA,
  hash: ll,
  exists: fl,
  output: gl
}, Ft = pl;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ml = (t) => t instanceof Uint8Array, ps = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), ms = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), qe = (t, e) => t << 32 - e | t >>> e, Il = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Il)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function wl(t) {
  if (typeof t != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof t}`);
  return new Uint8Array(new TextEncoder().encode(t));
}
function Ln(t) {
  if (typeof t == "string" && (t = wl(t)), !ml(t))
    throw new Error(`expected Uint8Array, got ${typeof t}`);
  return t;
}
let Oo = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const El = (t) => Object.prototype.toString.call(t) === "[object Object]" && t.constructor === Object;
function ZA(t, e) {
  if (e !== void 0 && (typeof e != "object" || !El(e)))
    throw new Error("Options should be object or undefined");
  return Object.assign(t, e);
}
function Po(t) {
  const e = (r) => t().update(Ln(r)).digest(), n = t();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e;
}
function Bl(t) {
  const e = (r, s) => t(s).update(Ln(r)).digest(), n = t({});
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r) => t(r), e;
}
function yl(t, e, n, r) {
  if (typeof t.setBigUint64 == "function")
    return t.setBigUint64(e, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  t.setUint32(e + d, o, r), t.setUint32(e + l, c, r);
}
let Cl = class extends Oo {
  constructor(e, n, r, s) {
    super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = ms(this.buffer);
  }
  update(e) {
    Ft.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    e = Ln(e);
    const i = e.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = ms(e);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(e.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Ft.exists(this), Ft.output(e, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    yl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ms(e), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, E = this.get();
    if (l > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
      c.setUint32(4 * g, E[g], i);
  }
  digest() {
    const { buffer: e, outputLen: n } = this;
    this.digestInto(e);
    const r = e.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return e.length = s, e.pos = c, e.finished = i, e.destroyed = o, s % n && e.buffer.set(r), e;
  }
};
const bl = (t, e, n) => t & e ^ ~t & n, Ql = (t, e, n) => t & e ^ t & n ^ e & n, xl = new Uint32Array([
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
let YA = class extends Cl {
  constructor() {
    super(64, 32, 8, !1), this.A = un[0] | 0, this.B = un[1] | 0, this.C = un[2] | 0, this.D = un[3] | 0, this.E = un[4] | 0, this.F = un[5] | 0, this.G = un[6] | 0, this.H = un[7] | 0;
  }
  get() {
    const { A: e, B: n, C: r, D: s, E: i, F: o, G: c, H: d } = this;
    return [e, n, r, s, i, o, c, d];
  }
  // prettier-ignore
  set(e, n, r, s, i, o, c, d) {
    this.A = e | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = d | 0;
  }
  process(e, n) {
    for (let g = 0; g < 16; g++, n += 4)
      dn[g] = e.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = dn[g - 15], x = dn[g - 2], F = qe(C, 7) ^ qe(C, 18) ^ C >>> 3, b = qe(x, 17) ^ qe(x, 19) ^ x >>> 10;
      dn[g] = b + dn[g - 7] + F + dn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: E } = this;
    for (let g = 0; g < 64; g++) {
      const C = qe(c, 6) ^ qe(c, 11) ^ qe(c, 25), x = E + C + bl(c, d, l) + xl[g] + dn[g] | 0, b = (qe(r, 2) ^ qe(r, 13) ^ qe(r, 22)) + Ql(r, s, i) | 0;
      E = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, l, E);
  }
  roundClean() {
    dn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class Fl extends YA {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const XA = Po(() => new YA());
Po(() => new Fl());
let VA = class extends Oo {
  constructor(e, n) {
    super(), this.finished = !1, this.destroyed = !1, Ft.hash(e);
    const r = Ln(n);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(r.length > s ? e.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(e) {
    return Ft.exists(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    Ft.exists(this), Ft.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return e = e, e.finished = s, e.destroyed = i, e.blockLen = o, e.outputLen = c, e.oHash = n._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const jA = (t, e, n) => new VA(t, e).update(n).digest();
jA.create = (t, e) => new VA(t, e);
function vl(t, e, n, r) {
  Ft.hash(t);
  const s = ZA({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Ft.number(i), Ft.number(o), Ft.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Ln(e), l = Ln(n), E = new Uint8Array(o), g = jA.create(t, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: E, PRF: g, PRFSalt: C };
}
function Dl(t, e, n, r, s) {
  return t.destroy(), e.destroy(), r && r.destroy(), s.fill(0), n;
}
function qA(t, e, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = vl(t, e, n, r);
  let l;
  const E = new Uint8Array(4), g = ms(E), C = new Uint8Array(c.outputLen);
  for (let x = 1, F = 0; F < i; x++, F += c.outputLen) {
    const b = o.subarray(F, F + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(E).digestInto(C), b.set(C.subarray(0, b.length));
    for (let v = 1; v < s; v++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Dl(c, d, o, l, C);
}
const It = (t, e) => t << e | t >>> 32 - e;
function Oa(t, e, n, r, s, i) {
  let o = t[e++] ^ n[r++], c = t[e++] ^ n[r++], d = t[e++] ^ n[r++], l = t[e++] ^ n[r++], E = t[e++] ^ n[r++], g = t[e++] ^ n[r++], C = t[e++] ^ n[r++], x = t[e++] ^ n[r++], F = t[e++] ^ n[r++], b = t[e++] ^ n[r++], v = t[e++] ^ n[r++], S = t[e++] ^ n[r++], J = t[e++] ^ n[r++], O = t[e++] ^ n[r++], j = t[e++] ^ n[r++], M = t[e++] ^ n[r++], _ = o, L = c, P = d, $ = l, U = E, H = g, tt = C, y = x, a = F, A = b, h = v, m = S, f = J, w = O, B = j, p = M;
  for (let u = 0; u < 8; u += 2)
    U ^= It(_ + f | 0, 7), a ^= It(U + _ | 0, 9), f ^= It(a + U | 0, 13), _ ^= It(f + a | 0, 18), A ^= It(H + L | 0, 7), w ^= It(A + H | 0, 9), L ^= It(w + A | 0, 13), H ^= It(L + w | 0, 18), B ^= It(h + tt | 0, 7), P ^= It(B + h | 0, 9), tt ^= It(P + B | 0, 13), h ^= It(tt + P | 0, 18), $ ^= It(p + m | 0, 7), y ^= It($ + p | 0, 9), m ^= It(y + $ | 0, 13), p ^= It(m + y | 0, 18), L ^= It(_ + $ | 0, 7), P ^= It(L + _ | 0, 9), $ ^= It(P + L | 0, 13), _ ^= It($ + P | 0, 18), tt ^= It(H + U | 0, 7), y ^= It(tt + H | 0, 9), U ^= It(y + tt | 0, 13), H ^= It(U + y | 0, 18), m ^= It(h + A | 0, 7), a ^= It(m + h | 0, 9), A ^= It(a + m | 0, 13), h ^= It(A + a | 0, 18), f ^= It(p + B | 0, 7), w ^= It(f + p | 0, 9), B ^= It(w + f | 0, 13), p ^= It(B + w | 0, 18);
  s[i++] = o + _ | 0, s[i++] = c + L | 0, s[i++] = d + P | 0, s[i++] = l + $ | 0, s[i++] = E + U | 0, s[i++] = g + H | 0, s[i++] = C + tt | 0, s[i++] = x + y | 0, s[i++] = F + a | 0, s[i++] = b + A | 0, s[i++] = v + h | 0, s[i++] = S + m | 0, s[i++] = J + f | 0, s[i++] = O + w | 0, s[i++] = j + B | 0, s[i++] = M + p | 0;
}
function Ni(t, e, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = t[e + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, e += 16)
    Oa(n, o, t, e, n, i), c > 0 && (o += 16), Oa(n, i, t, e += 16, n, o);
}
function Nl(t, e, n) {
  const r = ZA({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: l, onProgress: E } = r;
  if (Ft.number(s), Ft.number(i), Ft.number(o), Ft.number(c), Ft.number(d), Ft.number(l), E !== void 0 && typeof E != "function")
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
  const F = qA(XA, t, e, { c: 1, dkLen: g * o }), b = ps(F), v = ps(new Uint8Array(g * s)), S = ps(new Uint8Array(g));
  let J = () => {
  };
  if (E) {
    const O = 2 * s * o, j = Math.max(Math.floor(O / 1e4), 1);
    let M = 0;
    J = () => {
      M++, E && (!(M % j) || M === O) && E(M / O);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: C, V: v, B32: b, B: F, tmp: S, blockMixCb: J, asyncTick: d };
}
function Sl(t, e, n, r, s) {
  const i = qA(XA, t, n, { c: 1, dkLen: e });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function Rl(t, e, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: l, B: E, tmp: g, blockMixCb: C } = Nl(t, e, n);
  for (let x = 0; x < i; x++) {
    const F = c * x;
    for (let b = 0; b < c; b++)
      d[b] = l[F + b];
    for (let b = 0, v = 0; b < r - 1; b++)
      Ni(d, v, d, v += c, s), C();
    Ni(d, (r - 1) * c, l, F, s), C();
    for (let b = 0; b < r; b++) {
      const v = l[F + c - 16] % r;
      for (let S = 0; S < c; S++)
        g[S] = l[F + S] ^ d[v * c + S];
      Ni(g, 0, l, F, s), C();
    }
  }
  return Sl(t, o, E, d, g);
}
Ft.bool;
const Pa = Ft.bytes;
function _l(t) {
  return (e) => (Ft.bytes(e), t(e));
}
(() => {
  const t = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, e = typeof module < "u" && typeof module.require == "function" && module.require.bind(module);
  return {
    node: e && !t ? e("crypto") : void 0,
    web: t
  };
})();
function kl(t, e, n, r, s, i, o) {
  return Pa(t), Pa(e), Rl(t, e, { N: n, r: s, p: r, dkLen: i, onProgress: o });
}
const As = BigInt(2 ** 32 - 1), zi = BigInt(32);
function $A(t, e = !1) {
  return e ? { h: Number(t & As), l: Number(t >> zi & As) } : { h: Number(t >> zi & As) | 0, l: Number(t & As) | 0 };
}
function Ml(t, e = !1) {
  let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
  for (let s = 0; s < t.length; s++) {
    const { h: i, l: o } = $A(t[s], e);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Ll = (t, e) => BigInt(t >>> 0) << zi | BigInt(e >>> 0), Tl = (t, e, n) => t >>> n, Ol = (t, e, n) => t << 32 - n | e >>> n, Pl = (t, e, n) => t >>> n | e << 32 - n, Ul = (t, e, n) => t << 32 - n | e >>> n, Gl = (t, e, n) => t << 64 - n | e >>> n - 32, Hl = (t, e, n) => t >>> n - 32 | e << 64 - n, Jl = (t, e) => e, Zl = (t, e) => t, Yl = (t, e, n) => t << n | e >>> 32 - n, Xl = (t, e, n) => e << n | t >>> 32 - n, Vl = (t, e, n) => e << n - 32 | t >>> 64 - n, jl = (t, e, n) => t << n - 32 | e >>> 64 - n;
function ql(t, e, n, r) {
  const s = (e >>> 0) + (r >>> 0);
  return { h: t + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const $l = (t, e, n) => (t >>> 0) + (e >>> 0) + (n >>> 0), Wl = (t, e, n, r) => e + n + r + (t / 2 ** 32 | 0) | 0, zl = (t, e, n, r) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0), Kl = (t, e, n, r, s) => e + n + r + s + (t / 2 ** 32 | 0) | 0, tf = (t, e, n, r, s) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), ef = (t, e, n, r, s, i) => e + n + r + s + i + (t / 2 ** 32 | 0) | 0, _r = {
  fromBig: $A,
  split: Ml,
  toBig: Ll,
  shrSH: Tl,
  shrSL: Ol,
  rotrSH: Pl,
  rotrSL: Ul,
  rotrBH: Gl,
  rotrBL: Hl,
  rotr32H: Jl,
  rotr32L: Zl,
  rotlSH: Yl,
  rotlSL: Xl,
  rotlBH: Vl,
  rotlBL: jl,
  add: ql,
  add3L: $l,
  add3H: Wl,
  add4L: zl,
  add4H: Kl,
  add5H: ef,
  add5L: tf
}, [WA, zA, KA] = [[], [], []], nf = BigInt(0), Cr = BigInt(1), rf = BigInt(2), sf = BigInt(7), of = BigInt(256), af = BigInt(113);
for (let t = 0, e = Cr, n = 1, r = 0; t < 24; t++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], WA.push(2 * (5 * r + n)), zA.push((t + 1) * (t + 2) / 2 % 64);
  let s = nf;
  for (let i = 0; i < 7; i++)
    e = (e << Cr ^ (e >> sf) * af) % of, e & rf && (s ^= Cr << (Cr << BigInt(i)) - Cr);
  KA.push(s);
}
const [cf, Af] = _r.split(KA, !0), Ua = (t, e, n) => n > 32 ? _r.rotlBH(t, e, n) : _r.rotlSH(t, e, n), Ga = (t, e, n) => n > 32 ? _r.rotlBL(t, e, n) : _r.rotlSL(t, e, n);
function uf(t, e = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], E = n[d + 1], g = Ua(l, E, 1) ^ n[c], C = Ga(l, E, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        t[o + x] ^= g, t[o + x + 1] ^= C;
    }
    let s = t[2], i = t[3];
    for (let o = 0; o < 24; o++) {
      const c = zA[o], d = Ua(s, i, c), l = Ga(s, i, c), E = WA[o];
      s = t[E], i = t[E + 1], t[E] = d, t[E + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = t[o + c];
      for (let c = 0; c < 10; c++)
        t[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    t[0] ^= cf[r], t[1] ^= Af[r];
  }
  n.fill(0);
}
class qs extends Oo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Ft.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ps(this.state);
  }
  keccak() {
    uf(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    Ft.exists(this);
    const { blockLen: n, state: r } = this;
    e = Ln(e);
    const s = e.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(n - this.pos, s - i);
      for (let c = 0; c < o; c++)
        r[this.pos++] ^= e[i++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: n, pos: r, blockLen: s } = this;
    e[r] ^= n, n & 128 && r === s - 1 && this.keccak(), e[s - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    Ft.exists(this, !1), Ft.bytes(e), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let s = 0, i = e.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - s);
      e.set(n.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return Ft.number(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (Ft.output(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: n, suffix: r, outputLen: s, rounds: i, enableXOF: o } = this;
    return e || (e = new qs(n, r, s, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = s, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
}
const Fn = (t, e, n) => Po(() => new qs(e, t, n));
Fn(6, 144, 224 / 8);
Fn(6, 136, 256 / 8);
Fn(6, 104, 384 / 8);
Fn(6, 72, 512 / 8);
Fn(1, 144, 224 / 8);
const Ha = Fn(1, 136, 256 / 8);
Fn(1, 104, 384 / 8);
Fn(1, 72, 512 / 8);
const tu = (t, e, n) => Bl((r = {}) => new qs(e, t, r.dkLen === void 0 ? n : r.dkLen, !0));
tu(31, 168, 128 / 8);
tu(31, 136, 256 / 8);
const df = (() => {
  const t = _l(Ha);
  return t.create = Ha.create, t;
})();
var hf = (t) => {
  const { password: e, salt: n, n: r, p: s, r: i, dklen: o } = t;
  return kl(e, n, r, i, s, o);
}, lf = (t) => df(t), qn = (t, e = "base64") => {
  switch (e) {
    case "utf-8":
      return new TextEncoder().encode(t);
    case "base64": {
      const n = atob(t), r = n.length;
      return new Uint8Array(r).map((i, o) => n.charCodeAt(o));
    }
    case "hex":
    default: {
      const n = t.length / 2;
      return new Uint8Array(n).map((s, i) => {
        const o = i * 2;
        return parseInt(t.substring(o, o + 2), 16);
      });
    }
  }
}, { crypto: $s, btoa: eu } = globalThis;
if (!$s)
  throw new D(
    k.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!eu)
  throw new D(
    k.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Ki = (t) => $s.getRandomValues(new Uint8Array(t)), Is = (t, e = "base64") => {
  switch (e) {
    case "utf-8":
      return new TextDecoder().decode(t);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(t));
      return eu(n);
    }
    case "hex":
    default: {
      let n = "";
      for (let r = 0; r < t.length; r += 1) {
        const s = t[r].toString(16);
        n += s.length === 1 ? `0${s}` : s;
      }
      return n;
    }
  }
}, nu = "AES-CTR", Uo = (t, e) => {
  const n = qn(String(t).normalize("NFKC"), "utf-8"), r = mr(n, e, 1e5, 32, "sha256");
  return Y(r);
}, ff = async (t, e) => {
  const n = Ki(16), r = Ki(32), s = Uo(t, r), i = JSON.stringify(e), o = qn(i, "utf-8"), c = {
    name: nu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), l = await crypto.subtle.encrypt(c, d, o);
  return {
    data: Is(l),
    iv: Is(n),
    salt: Is(r)
  };
}, gf = async (t, e) => {
  const n = qn(e.iv), r = qn(e.salt), s = Uo(t, r), i = qn(e.data), o = {
    name: nu,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), l = new TextDecoder().decode(d);
  try {
    return JSON.parse(l);
  } catch {
    throw new D(k.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, pf = async (t, e, n) => {
  const r = $s.subtle, s = new Uint8Array(e.subarray(0, 16)), i = n, o = t, c = await r.importKey(
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
}, mf = async (t, e, n) => {
  const r = $s.subtle, s = new Uint8Array(e.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(t).buffer, c = await r.importKey(
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
}, If = {
  bufferFromString: qn,
  stringFromBuffer: Is,
  decrypt: gf,
  encrypt: ff,
  keyFromPassword: Uo,
  randomBytes: Ki,
  scrypt: hf,
  keccak256: lf,
  decryptJsonWalletData: mf,
  encryptJsonWalletData: pf
}, wf = If, {
  bufferFromString: Bn,
  decrypt: bB,
  encrypt: QB,
  keyFromPassword: xB,
  randomBytes: bn,
  stringFromBuffer: xr,
  scrypt: ru,
  keccak256: su,
  decryptJsonWalletData: Ef,
  encryptJsonWalletData: Bf
} = wf, yf = Object.defineProperty, Cf = (t, e, n) => e in t ? yf(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, iu = (t, e, n) => (Cf(t, typeof e != "symbol" ? e + "" : e, n), n), bf = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
}, ou = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, au = (t, e, n) => (bf(t, e, "access private method"), n), At = class {
  constructor(t, e, n) {
    N(this, "name");
    N(this, "type");
    N(this, "encodedLength");
    this.name = t, this.type = e, this.encodedLength = n;
  }
}, cu = "enum Option", Au = "struct Vec", uu = "struct Bytes", du = "struct String", hu = /str\[(?<length>[0-9]+)\]/, to = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, lu = /^struct (?<name>\w+)$/, fu = /^enum (?<name>\w+)$/, Qf = /^\((?<items>.*)\)$/, xf = /^generic (?<name>\w+)$/, st = 8, qr = 32, kr = qr, Ff = qr, vf = qr, Df = st * 4, Nf = st * 2, gu = 2 ** 32 - 1, Ws = ({ maxInputs: t }) => qr + // Tx ID
st + // Tx size
// Asset ID/Balance coin input pairs
t * (kr + st), Go = st + // Identifier
st + // Gas limit
st + // Script size
st + // Script data size
st + // Policies
st + // Inputs size
st + // Outputs size
st + // Witnesses size
qr, Sf = st + // Identifier
Df + // Utxo Length
st + // Output Index
vf + // Owner
st + // Amount
kr + // Asset id
Nf + // TxPointer
st + // Witnesses index
st + // Maturity
st + // Predicate size
st + // Predicate data size
st, R = class extends At {
  constructor() {
    super("u64", "u64", st);
  }
  encode(t) {
    let e;
    try {
      e = Cn(t, st);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, `Invalid ${this.type} data size.`);
    const n = t.slice(e, e + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new D(k.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), e + st];
  }
}, Rf = 3, ye = Rf * st, _f = 2, Si = _f * st;
function ke(t) {
  const e = {};
  let n = 0;
  const r = t.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([l, E]) => {
      e[parseInt(l, 10) + n] = E;
    });
    const d = Y(o);
    return n += d.byteLength / st, d;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(e).length && (i.dynamicData = e), i;
}
function pu(t, e, n) {
  if (!t.dynamicData)
    return dt([t]);
  let r = 0, s = t;
  return Object.entries(t.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * st, d = new R().encode(
      n + e + r
    );
    s.set(d, c);
    const l = o.dynamicData ? (
      // unpack child dynamic data
      pu(
        o,
        e,
        n + o.byteLength + r
      )
    ) : o;
    s = dt([s, l]), r += l.byteLength;
  }), s;
}
var kf = (t, e = st) => {
  const n = [];
  let r = 0, s = t.slice(r, r + e);
  for (; s.length; )
    n.push(s), r += e, s = t.slice(r, r + e);
  return n;
}, Mf = (t) => {
  switch (t) {
    case "u8":
    case "u16":
    case "u32":
    case "u64":
    case "bool":
      return !1;
    default:
      return !0;
  }
}, Lf = (t) => t === Au || t === uu || t === du;
function Re(t, e, n = () => {
  throw new D(k.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = t.find(e);
  return r === void 0 && n(), r;
}
var Mr = (t) => t % st === 0, mu = (t) => st - t % st, Iu = (t) => {
  if (Mr(t.length))
    return t;
  const e = new Uint8Array(st - t.length % st);
  return aA([t, e]);
}, Be = class extends At {
  constructor(e, n) {
    super("array", `[${e.type}; ${n}]`, n * e.encodedLength);
    N(this, "coder");
    N(this, "length");
    this.coder = e, this.length = n;
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    if (this.length !== e.length)
      throw new D(k.ENCODE_ERROR, "Types/values length mismatch.");
    return ke(Array.from(e).map((n) => this.coder.encode(n)));
  }
  decode(e, n) {
    if (e.length < this.encodedLength || e.length > gu)
      throw new D(k.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(e, r), i;
    }), r];
  }
}, G = class extends At {
  constructor() {
    super("b256", "b256", st * 4);
  }
  encode(t) {
    let e;
    try {
      e = Y(t);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (e.length !== this.encodedLength)
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b256 data size.");
    let n = t.slice(e, e + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b256 byte data size.");
    return [To(n, 32), e + 32];
  }
}, Tf = class extends At {
  constructor() {
    super("b512", "struct B512", st * 8);
  }
  encode(t) {
    let e;
    try {
      e = Y(t);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (e.length !== this.encodedLength)
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b512 data size.");
    let n = t.slice(e, e + this.encodedLength);
    if (Q(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b512 byte data size.");
    return [To(n, this.encodedLength), e + this.encodedLength];
  }
}, Of = class extends At {
  constructor(e = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = e.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    N(this, "paddingLength");
    N(this, "options");
    this.paddingLength = n, this.options = e;
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new D(k.ENCODE_ERROR, "Invalid boolean value.");
    const r = Cn(e ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(e, n) {
    if (e.length < this.paddingLength)
      throw new D(k.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = e.slice(n, n + 1) : r = e.slice(n, n + this.paddingLength);
    const s = Q(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(Q(1)))
      throw new D(k.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, Pf = (t) => Object.values(t).every(
  // @ts-expect-error complicated types
  ({ type: e, coders: n }) => e === "()" && JSON.stringify(n) === JSON.stringify([])
), rr, wn, Gs, Eu, Hs, Bu, zc, wu = (zc = class extends At {
  constructor(e, n) {
    const r = new R(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${e}`, r.encodedLength + s);
    Ee(this, Gs);
    Ee(this, Hs);
    N(this, "name");
    N(this, "coders");
    Ee(this, rr, void 0);
    Ee(this, wn, void 0);
    this.name = e, this.coders = n, De(this, rr, r), De(this, wn, s);
  }
  encode(e) {
    if (typeof e == "string" && this.coders[e])
      return Un(this, Gs, Eu).call(this, e);
    const [n, ...r] = Object.keys(e);
    if (!n)
      throw new D(k.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new D(k.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(e[n]), c = new Uint8Array(Qt(this, wn) - s.encodedLength);
    return ke([Qt(this, rr).encode(i), c, o]);
  }
  decode(e, n) {
    if (e.length < Qt(this, wn))
      throw new D(k.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new R().decode(e, r);
    const i = Ke(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new D(
        k.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = Qt(this, wn) - c.encodedLength;
    return r += d, [s, r] = c.decode(e, r), Pf(this.coders) ? Un(this, Hs, Bu).call(this, o, r) : [{ [o]: s }, r];
  }
}, rr = new WeakMap(), wn = new WeakMap(), Gs = new WeakSet(), Eu = function(e) {
  const n = this.coders[e], r = n.encode([]), s = Object.keys(this.coders).indexOf(e), i = new Uint8Array(Qt(this, wn) - n.encodedLength);
  return dt([Qt(this, rr).encode(s), i, r]);
}, Hs = new WeakSet(), Bu = function(e, n) {
  return [e, n];
}, zc), K = class extends At {
  constructor(e, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && e === "u8" ? 1 : 8;
    super("number", e, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    N(this, "length");
    N(this, "paddingLength");
    N(this, "baseType");
    N(this, "options");
    switch (this.baseType = e, e) {
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
  encode(e) {
    let n;
    try {
      n = Cn(e);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new D(k.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Cn(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(e, n) {
    let r;
    return this.options.isRightPadded ? r = e.slice(n, n + 1) : (r = e.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Ke(r), n + this.paddingLength];
  }
  decode(e, n) {
    if (e.length < this.paddingLength)
      throw new D(k.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(e, n);
    let r = e.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new D(k.DECODE_ERROR, "Invalid number byte data size.");
    return [Ke(r), n + 8];
  }
}, sr, Kc, Uf = (Kc = class extends At {
  constructor(e) {
    let n = (8 - e) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${e}]`, e + n);
    N(this, "length");
    Ee(this, sr, void 0);
    this.length = e, De(this, sr, n);
  }
  encode(e) {
    if (this.length !== e.length)
      throw new D(k.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = hA(e), r = new Uint8Array(Qt(this, sr));
    return dt([n, r]);
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid string data size.");
    const r = e.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new D(k.DECODE_ERROR, "Invalid string byte data size.");
    const s = lA(r), i = Qt(this, sr);
    return [s, n + this.length + i];
  }
}, sr = new WeakMap(), Kc), yu = class extends wu {
  encode(t) {
    return super.encode(this.toSwayOption(t));
  }
  toSwayOption(t) {
    return t !== void 0 ? { Some: t } : { None: [] };
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(t, e);
    return [this.toOption(n), r];
  }
  toOption(t) {
    if (t && "Some" in t)
      return t.Some;
  }
}, zs = class extends At {
  constructor(e, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${e}`, r);
    N(this, "name");
    N(this, "coders");
    this.name = e, this.coders = n;
  }
  encode(e) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = e[r];
      if (!(s instanceof yu) && i == null)
        throw new D(
          k.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Mr(o.length) ? o : Iu(o);
    });
    return ke([ke(n)]);
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(e, r), Mr(r) || (r += mu(r)), i[o] = d, i;
    }, {}), r];
  }
}, Cu = class extends At {
  constructor(e) {
    const n = e.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${e.map((r) => r.type).join(", ")})`, n);
    N(this, "coders");
    this.coders = e;
  }
  encode(e) {
    if (this.coders.length !== e.length)
      throw new D(k.ENCODE_ERROR, "Types/values length mismatch.");
    return ke(
      this.coders.map((n, r) => {
        const s = n.encode(e[r]);
        return Mr(s.length) ? s : Iu(s);
      })
    );
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(e, r), Mr(r) || (r += mu(r)), o;
    }), r];
  }
}, bu = class extends At {
  constructor(e) {
    super("struct", "struct Vec", e.encodedLength + ye);
    N(this, "coder");
    this.coder = e;
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new R().encode(ye);
    return r.dynamicData = {
      0: ke(Array.from(e).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new R().encode(e.length)), n.push(new R().encode(e.length)), ke(n);
  }
  decode(e, n) {
    if (e.length < ye || e.length > gu)
      throw new D(k.DECODE_ERROR, "Invalid vec data size.");
    const r = e.slice(16, 24), i = Q(new R().decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = e.slice(ye, ye + i);
    if (o.length !== i)
      throw new D(k.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      kf(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + ye
    ];
  }
}, eo, Qu, xs = class extends At {
  constructor() {
    super("struct", "struct Bytes", ye), ou(this, eo);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    const e = [], n = new R().encode(ye), r = au(this, eo, Qu).call(this, t);
    return n.dynamicData = {
      0: ke([r])
    }, e.push(n), e.push(new R().encode(r.byteLength)), e.push(new R().encode(t.length)), ke(e);
  }
  decode(t, e) {
    if (t.length < ye)
      throw new D(k.DECODE_ERROR, "Invalid byte data size.");
    const n = t.slice(16, 24), r = Q(new R().decode(n, 0)[0]).toNumber(), s = t.slice(ye, ye + r);
    if (s.length !== r)
      throw new D(k.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, e + ye];
  }
};
eo = /* @__PURE__ */ new WeakSet();
Qu = function(t) {
  const e = [Uint8Array.from(t)], n = (st - t.length % st) % st;
  return n && e.push(new Uint8Array(n)), dt(e);
};
iu(xs, "memorySize", 1);
var Gf = class extends At {
  constructor() {
    super("raw untyped slice", "raw untyped slice", Si);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    const e = [], n = new R(), r = new R().encode(Si);
    return r.dynamicData = {
      0: ke(t.map((s) => n.encode(s)))
    }, e.push(r), e.push(new R().encode(t.length * st)), ke(e);
  }
  decode(t, e) {
    if (t.length < Si || t.length % st !== 0)
      throw new D(k.DECODE_ERROR, "Invalid raw slice data size.");
    return new Be(new R(), t.length / st).decode(t, e);
  }
}, no, xu, Fu = class extends At {
  constructor() {
    super("struct", "struct String", 1), ou(this, no);
  }
  encode(t) {
    const e = [], n = new R().encode(ye), r = au(this, no, xu).call(this, t);
    return n.dynamicData = {
      0: ke([r])
    }, e.push(n), e.push(new R().encode(r.byteLength)), e.push(new R().encode(t.length)), ke(e);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid std string data size.");
    const n = t.slice(16, 24), r = Q(new R().decode(n, 0)[0]).toNumber(), s = t.slice(ye, ye + r);
    if (s.length !== r)
      throw new D(k.DECODE_ERROR, "Invalid std string byte data size.");
    return [lA(s), e + ye];
  }
};
no = /* @__PURE__ */ new WeakSet();
xu = function(t) {
  const e = [hA(t)], n = (st - t.length % st) % st;
  return n && e.push(new Uint8Array(n)), dt(e);
};
iu(Fu, "memorySize", 1);
var mn = class {
  constructor(t, e) {
    N(this, "abi");
    N(this, "name");
    N(this, "type");
    N(this, "originalTypeArguments");
    N(this, "components");
    this.abi = t;
    const n = Re(
      t.types,
      (r) => r.typeId === e.type,
      () => {
        throw new D(
          k.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: e,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = e.name, this.type = n.type, this.originalTypeArguments = e.typeArguments, this.components = mn.getResolvedGenericComponents(
      t,
      e,
      n.components,
      n.typeParameters ?? mn.getImplicitGenericTypeParameters(t, n.components)
    );
  }
  static getResolvedGenericComponents(t, e, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new mn(t, o));
    const s = r.reduce(
      (o, c, d) => {
        var E;
        const l = { ...o };
        return l[c] = structuredClone(
          (E = e.typeArguments) == null ? void 0 : E[d]
        ), l;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      t,
      n,
      s
    ).map((o) => new mn(t, o));
  }
  static resolveGenericArgTypes(t, e, n) {
    return e.map((r) => {
      if (n[r.type] !== void 0)
        return {
          ...n[r.type],
          name: r.name
        };
      if (r.typeArguments)
        return {
          ...structuredClone(r),
          typeArguments: this.resolveGenericArgTypes(
            t,
            r.typeArguments,
            n
          )
        };
      const s = Re(t.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(t, s.components);
      return i && i.length > 0 ? {
        ...structuredClone(r),
        typeArguments: i.map((o) => n[o])
      } : r;
    });
  }
  static getImplicitGenericTypeParameters(t, e, n) {
    if (!Array.isArray(e))
      return null;
    const r = n ?? [];
    return e.forEach((s) => {
      const i = Re(t.types, (o) => o.typeId === s.type);
      if (xf.test(i.type)) {
        r.push(i.typeId);
        return;
      }
      Array.isArray(s.typeArguments) && this.getImplicitGenericTypeParameters(t, s.typeArguments, r);
    }), r.length > 0 ? r : null;
  }
  getSignature() {
    const t = this.getArgSignaturePrefix(), e = this.getArgSignatureContent();
    return `${t}${e}`;
  }
  getArgSignaturePrefix() {
    return lu.test(this.type) ? "s" : to.test(this.type) ? "a" : fu.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const t = (s = hu.exec(this.type)) == null ? void 0 : s.groups;
    if (t)
      return `str[${t.length}]`;
    if (this.components === null)
      return this.type;
    const e = (i = to.exec(this.type)) == null ? void 0 : i.groups;
    if (e)
      return `[${this.components[0].getSignature()};${e.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new mn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
}, Se = class {
  static getCoder(t, e, n = {
    isSmallBytes: !1
  }) {
    const r = new mn(t, e);
    return Se.getCoderImpl(r, n);
  }
  static encode(t, e, n, r) {
    return this.getCoder(t, e, r).encode(n);
  }
  static decode(t, e, n, r) {
    return this.getCoder(t, e).decode(n, r);
  }
  static getCoderImpl(t, e = {
    isSmallBytes: !1
  }) {
    var d, l, E, g, C, x;
    switch (t.type) {
      case "u8":
      case "u16":
      case "u32":
        return new K(t.type, e);
      case "u64":
      case "raw untyped ptr":
        return new R();
      case "raw untyped slice":
        return new Gf();
      case "bool":
        return new Of(e);
      case "b256":
        return new G();
      case "struct B512":
        return new Tf();
      case uu:
        return new xs();
      case du:
        return new Fu();
    }
    const n = (d = hu.exec(t.type)) == null ? void 0 : d.groups;
    if (n) {
      const F = parseInt(n.length, 10);
      return new Uf(F);
    }
    const r = t.components, s = (l = to.exec(t.type)) == null ? void 0 : l.groups;
    if (s) {
      const F = parseInt(s.length, 10), b = r[0];
      if (!b)
        throw new D(
          k.INVALID_COMPONENT,
          "The provided Array type is missing an item of 'component'."
        );
      const v = Se.getCoderImpl(b, { isSmallBytes: !0 });
      return new Be(v, F);
    }
    if (t.type === Au) {
      const F = (E = Re(r, (S) => S.name === "buf").originalTypeArguments) == null ? void 0 : E[0];
      if (!F)
        throw new D(
          k.INVALID_COMPONENT,
          "The provided Vec type is missing the 'type argument'."
        );
      const b = new mn(t.abi, F), v = Se.getCoderImpl(b, { isSmallBytes: !0 });
      return new bu(v);
    }
    const i = (g = lu.exec(t.type)) == null ? void 0 : g.groups;
    if (i) {
      const F = Se.getCoders(r, { isRightPadded: !0 });
      return new zs(i.name, F);
    }
    const o = (C = fu.exec(t.type)) == null ? void 0 : C.groups;
    if (o) {
      const F = Se.getCoders(r, {});
      return t.type === cu ? new yu(o.name, F) : new wu(o.name, F);
    }
    if ((x = Qf.exec(t.type)) == null ? void 0 : x.groups) {
      const F = r.map(
        (b) => Se.getCoderImpl(b, { isRightPadded: !0 })
      );
      return new Cu(F);
    }
    throw t.type === "str" ? new D(
      k.INVALID_DATA,
      "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
    ) : new D(
      k.CODER_NOT_FOUND,
      `Coder not found: ${JSON.stringify(t)}.`
    );
  }
  static getCoders(t, e) {
    return t.reduce((n, r) => {
      const s = n;
      return s[r.name] = Se.getCoderImpl(r, e), s;
    }, {});
  }
}, Js, vu, Zs, Du, Ys, Nu, tA, ws = (tA = class {
  constructor(t, e) {
    Ee(this, Js);
    Ee(this, Zs);
    Ee(this, Ys);
    N(this, "signature");
    N(this, "selector");
    N(this, "name");
    N(this, "jsonFn");
    N(this, "attributes");
    N(this, "isInputDataPointer");
    N(this, "outputMetadata");
    N(this, "jsonAbi");
    this.jsonAbi = t, this.jsonFn = Re(this.jsonAbi.functions, (n) => n.name === e), this.name = e, this.signature = ws.getSignature(this.jsonAbi, this.jsonFn), this.selector = ws.getFunctionSelector(this.signature), this.isInputDataPointer = Un(this, Js, vu).call(this), this.outputMetadata = {
      isHeapType: Un(this, Zs, Du).call(this),
      encodedLength: Un(this, Ys, Nu).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(t, e) {
    const n = e.inputs.map(
      (r) => new mn(t, r).getSignature()
    );
    return `${e.name}(${n.join(",")})`;
  }
  static getFunctionSelector(t) {
    const e = Mt(Bn(t, "utf-8"));
    return Q(e.slice(0, 10)).toHex(8);
  }
  encodeArguments(t, e = 0) {
    ws.verifyArgsAndInputsAlign(t, this.jsonFn.inputs, this.jsonAbi);
    const n = t.slice(), r = this.jsonFn.inputs.filter(
      (c) => Re(this.jsonAbi.types, (d) => d.typeId === c.type).type !== "()"
    );
    Array.isArray(t) && r.length !== t.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, t.length));
    const s = r.map(
      (c) => Se.getCoder(this.jsonAbi, c, {
        isRightPadded: r.length > 1
      })
    ), o = new Cu(s).encode(n);
    return pu(o, e, o.byteLength);
  }
  static verifyArgsAndInputsAlign(t, e, n) {
    if (t.length === e.length)
      return;
    const r = e.map((o) => Re(n.types, (c) => c.typeId === o.type)), s = r.filter(
      (o) => o.type === cu || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === t.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${t.length} arguments, but expected ${e.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new D(k.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(t) {
    const e = Y(t), n = this.jsonFn.inputs.filter(
      (s) => Re(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (e.length === 0)
        return;
      throw new D(
        k.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonEmptyInputs: n.length,
            values: e.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonEmptyInputs: n,
            values: e
          }
        })}`
      );
    }
    return n.reduce(
      (s, i) => {
        const o = Se.getCoder(this.jsonAbi, i), [c, d] = o.decode(e, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(t) {
    const e = Re(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    );
    if (e.type === "()")
      return [void 0, 0];
    const n = Y(t), r = Se.getCoder(this.jsonAbi, this.jsonFn.output);
    return e.type === "raw untyped slice" && (r.length = n.length / 8), r.decode(n, 0);
  }
}, Js = new WeakSet(), vu = function() {
  var e;
  const t = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Mf(((e = t[0]) == null ? void 0 : e.type) || "");
}, Zs = new WeakSet(), Du = function() {
  const t = Re(this.jsonAbi.types, (e) => e.typeId === this.jsonFn.output.type);
  return Lf((t == null ? void 0 : t.type) || "");
}, Ys = new WeakSet(), Nu = function() {
  try {
    const t = Se.getCoder(this.jsonAbi, this.jsonFn.output);
    return t instanceof bu ? t.coder.encodedLength : t instanceof xs ? xs.memorySize : t.encodedLength;
  } catch {
    return 0;
  }
}, tA), Qn = class {
  constructor(t) {
    N(this, "functions");
    N(this, "configurables");
    /*
      TODO: Refactor so that there's no need for externalLoggedTypes
    
      This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method.
      This is used to decode logs from contracts other than the main contract
      we're interacting with.
      */
    N(this, "externalLoggedTypes");
    N(this, "jsonAbi");
    this.jsonAbi = t, this.externalLoggedTypes = {}, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((e) => [e.name, new ws(this.jsonAbi, e.name)])
    ), this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((e) => [e.name, e]));
  }
  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(t) {
    const e = Object.values(this.functions).find(
      (n) => n.name === t || n.signature === t || n.selector === t
    );
    if (e !== void 0)
      return e;
    throw new D(
      k.FUNCTION_NOT_FOUND,
      `function ${t} not found: ${JSON.stringify(e)}.`
    );
  }
  decodeFunctionData(t, e) {
    const n = typeof t == "string" ? this.getFunction(t) : t;
    if (!n)
      throw new D(k.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(e);
  }
  encodeFunctionData(t, e, n = 0) {
    const r = typeof t == "string" ? this.getFunction(t) : t;
    if (!r)
      throw new D(k.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(e, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(t, e) {
    return (typeof t == "string" ? this.getFunction(t) : t).decodeOutput(e);
  }
  decodeLog(t, e, n) {
    if (this.externalLoggedTypes[n])
      return this.externalLoggedTypes[n].decodeLog(t, e, n);
    const { loggedType: s } = Re(this.jsonAbi.loggedTypes, (i) => i.logId === e);
    return Se.decode(this.jsonAbi, s, Y(t), 0);
  }
  updateExternalLoggedTypes(t, e) {
    this.externalLoggedTypes[t] = e;
  }
  encodeConfigurable(t, e) {
    const n = Re(
      this.jsonAbi.configurables,
      (r) => r.name === t,
      () => {
        throw new D(
          k.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${t}' was not found in the ABI.`
        );
      }
    );
    return Se.encode(this.jsonAbi, n.configurableType, e, {
      isRightPadded: !0
    });
  }
  getTypeById(t) {
    return Re(
      this.jsonAbi.types,
      (e) => e.typeId === t,
      () => {
        throw new D(
          k.TYPE_NOT_FOUND,
          `Type with typeId '${t}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, FB = class {
}, Hf = class {
}, Su = class {
}, Ru = class {
}, Jf = class extends Ru {
}, Zf = class extends Ru {
}, vB = class {
}, En, eA, Et = (eA = class extends At {
  constructor(e) {
    const n = (8 - e % 8) % 8, r = e + n;
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
    Ee(this, En, void 0);
    this.length = e, De(this, En, n);
  }
  encode(e) {
    const n = [], r = Y(e);
    return n.push(r), Qt(this, En) && n.push(new Uint8Array(Qt(this, En))), dt(n);
  }
  decode(e, n) {
    let r, s = n;
    [r, s] = [V(e.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Qt(this, En) && ([r, s] = [null, s + Qt(this, En)]), [i, s];
  }
}, En = new WeakMap(), eA), ir = class extends zs {
  constructor() {
    super("TxPointer", {
      blockHeight: new K("u32"),
      txIndex: new K("u16")
    });
  }
}, bt = /* @__PURE__ */ ((t) => (t[t.Coin = 0] = "Coin", t[t.Contract = 1] = "Contract", t[t.Message = 2] = "Message", t))(bt || {}), Ja = class extends At {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.txID)), e.push(new K("u8").encode(t.outputIndex)), e.push(new G().encode(t.owner)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), e.push(new ir().encode(t.txPointer)), e.push(new K("u8").encode(t.witnessIndex)), e.push(new K("u32").encode(t.maturity)), e.push(new R().encode(t.predicateGasUsed)), e.push(new K("u32").encode(t.predicateLength)), e.push(new K("u32").encode(t.predicateDataLength)), e.push(new Et(t.predicateLength).encode(t.predicate)), e.push(new Et(t.predicateDataLength).encode(t.predicateData)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new K("u8").decode(t, r);
    const i = n;
    [n, r] = new G().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    [n, r] = new G().decode(t, r);
    const d = n;
    [n, r] = new ir().decode(t, r);
    const l = n;
    [n, r] = new K("u8").decode(t, r);
    const E = Number(n);
    [n, r] = new K("u32").decode(t, r);
    const g = n;
    [n, r] = new R().decode(t, r);
    const C = n;
    [n, r] = new K("u32").decode(t, r);
    const x = n;
    [n, r] = new K("u32").decode(t, r);
    const F = n;
    [n, r] = new Et(x).decode(t, r);
    const b = n;
    return [n, r] = new Et(F).decode(t, r), [
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
        predicateDataLength: F,
        predicate: b,
        predicateData: n
      },
      r
    ];
  }
}, Fs = class extends At {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.txID)), e.push(new K("u8").encode(t.outputIndex)), e.push(new G().encode(t.balanceRoot)), e.push(new G().encode(t.stateRoot)), e.push(new ir().encode(t.txPointer)), e.push(new G().encode(t.contractID)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new K("u8").decode(t, r);
    const i = n;
    [n, r] = new G().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new ir().decode(t, r);
    const d = n;
    return [n, r] = new G().decode(t, r), [
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
}, Lr = class extends At {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(t) {
    const e = [];
    return e.push(new Et(32).encode(t.sender)), e.push(new Et(32).encode(t.recipient)), e.push(new Et(32).encode(t.nonce)), e.push(new R().encode(t.amount)), e.push(Y(t.data || "0x")), Mt(dt(e));
  }
  static encodeData(t) {
    const e = Y(t || "0x"), n = e.length;
    return new Et(n).encode(e);
  }
  encode(t) {
    const e = [], n = Lr.encodeData(t.data);
    return e.push(new Et(32).encode(t.sender)), e.push(new Et(32).encode(t.recipient)), e.push(new R().encode(t.amount)), e.push(new Et(32).encode(t.nonce)), e.push(new K("u8").encode(t.witnessIndex)), e.push(new R().encode(t.predicateGasUsed)), e.push(new K("u16").encode(n.length)), e.push(new K("u16").encode(t.predicateLength)), e.push(new K("u16").encode(t.predicateDataLength)), e.push(new Et(n.length).encode(n)), e.push(new Et(t.predicateLength).encode(t.predicate)), e.push(new Et(t.predicateDataLength).encode(t.predicateData)), dt(e);
  }
  static decodeData(t) {
    const e = Y(t), n = e.length, [r] = new Et(n).decode(e, 0);
    return Y(r);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new K("u8").decode(t, r);
    const d = Number(n);
    [n, r] = new R().decode(t, r);
    const l = n;
    [n, r] = new K("u16").decode(t, r);
    const E = n;
    [n, r] = new K("u16").decode(t, r);
    const g = n;
    [n, r] = new K("u16").decode(t, r);
    const C = n;
    [n, r] = new Et(g).decode(t, r);
    const x = n;
    [n, r] = new Et(E).decode(t, r);
    const F = n;
    return [n, r] = new Et(C).decode(t, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: c,
        predicateGasUsed: l,
        dataLength: g,
        predicateLength: E,
        predicateDataLength: C,
        data: x,
        predicate: F,
        predicateData: n
      },
      r
    ];
  }
}, vs = class extends At {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8").encode(t.type));
    const { type: n } = t;
    switch (n) {
      case 0: {
        e.push(new Ja().encode(t));
        break;
      }
      case 1: {
        e.push(new Fs().encode(t));
        break;
      }
      case 2: {
        e.push(new Lr().encode(t));
        break;
      }
      default:
        throw new D(
          k.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u8").decode(t, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ja().decode(t, r), [n, r];
      case 1:
        return [n, r] = new Fs().decode(t, r), [n, r];
      case 2:
        return [n, r] = new Lr().decode(t, r), [n, r];
      default:
        throw new D(
          k.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, yt = /* @__PURE__ */ ((t) => (t[t.Coin = 0] = "Coin", t[t.Contract = 1] = "Contract", t[t.Change = 2] = "Change", t[t.Variable = 3] = "Variable", t[t.ContractCreated = 4] = "ContractCreated", t))(yt || {}), Za = class extends At {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.to)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    return [n, r] = new G().decode(t, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Ds = class extends At {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new K("u8").encode(t.inputIndex)), e.push(new G().encode(t.balanceRoot)), e.push(new G().encode(t.stateRoot)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u8").decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    return [n, r] = new G().decode(t, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, Ya = class extends At {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.to)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    return [n, r] = new G().decode(t, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Xa = class extends At {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.to)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    return [n, r] = new G().decode(t, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Va = class extends At {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.contractId)), e.push(new G().encode(t.stateRoot)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    return [n, r] = new G().decode(t, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, Ns = class extends At {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8").encode(t.type));
    const { type: n } = t;
    switch (n) {
      case 0: {
        e.push(new Za().encode(t));
        break;
      }
      case 1: {
        e.push(new Ds().encode(t));
        break;
      }
      case 2: {
        e.push(new Ya().encode(t));
        break;
      }
      case 3: {
        e.push(new Xa().encode(t));
        break;
      }
      case 4: {
        e.push(new Va().encode(t));
        break;
      }
      default:
        throw new D(
          k.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u8").decode(t, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Za().decode(t, r), [n, r];
      case 1:
        return [n, r] = new Ds().decode(t, r), [n, r];
      case 2:
        return [n, r] = new Ya().decode(t, r), [n, r];
      case 3:
        return [n, r] = new Xa().decode(t, r), [n, r];
      case 4:
        return [n, r] = new Va().decode(t, r), [n, r];
      default:
        throw new D(
          k.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Ze = /* @__PURE__ */ ((t) => (t[t.GasPrice = 1] = "GasPrice", t[t.WitnessLimit = 2] = "WitnessLimit", t[t.Maturity = 4] = "Maturity", t[t.MaxFee = 8] = "MaxFee", t))(Ze || {}), Yf = (t) => t.sort((e, n) => e.type - n.type);
function Xf(t) {
  const e = /* @__PURE__ */ new Set();
  t.forEach((n) => {
    if (e.has(n.type))
      throw new D(
        k.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    e.add(n.type);
  });
}
var Ss = class extends At {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(t) {
    Xf(t);
    const e = Yf(t), n = [];
    return e.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new R().encode(r));
          break;
        case 4:
          n.push(new K("u32").encode(r));
          break;
        default:
          throw new D(k.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), dt(n);
  }
  decode(t, e, n) {
    let r = e;
    const s = [];
    if (n & 1) {
      const [i, o] = new R().decode(t, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new R().decode(t, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new K("u32").decode(t, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new R().decode(t, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, ut = /* @__PURE__ */ ((t) => (t[t.Call = 0] = "Call", t[t.Return = 1] = "Return", t[t.ReturnData = 2] = "ReturnData", t[t.Panic = 3] = "Panic", t[t.Revert = 4] = "Revert", t[t.Log = 5] = "Log", t[t.LogData = 6] = "LogData", t[t.Transfer = 7] = "Transfer", t[t.TransferOut = 8] = "TransferOut", t[t.ScriptResult = 9] = "ScriptResult", t[t.MessageOut = 10] = "MessageOut", t[t.Mint = 11] = "Mint", t[t.Burn = 12] = "Burn", t))(ut || {}), ja = class extends At {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.from)), e.push(new G().encode(t.to)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), e.push(new R().encode(t.gas)), e.push(new R().encode(t.param1)), e.push(new R().encode(t.param2)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n;
    [n, r] = new R().decode(t, r);
    const l = n;
    [n, r] = new R().decode(t, r);
    const E = n;
    [n, r] = new R().decode(t, r);
    const g = n;
    return [n, r] = new R().decode(t, r), [
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
}, qa = class extends At {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.id)), e.push(new R().encode(t.val)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    return [n, r] = new R().decode(t, r), [
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
}, $a = class extends At {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.id)), e.push(new R().encode(t.ptr)), e.push(new R().encode(t.len)), e.push(new G().encode(t.digest)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n;
    return [n, r] = new R().decode(t, r), [
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
}, Wa = class extends At {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.id)), e.push(new R().encode(t.reason)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), e.push(new G().encode(t.contractId)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    return [n, r] = new G().decode(t, r), [
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
}, za = class extends At {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.id)), e.push(new R().encode(t.val)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    return [n, r] = new R().decode(t, r), [
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
}, Ka = class extends At {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.id)), e.push(new R().encode(t.val0)), e.push(new R().encode(t.val1)), e.push(new R().encode(t.val2)), e.push(new R().encode(t.val3)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n;
    [n, r] = new R().decode(t, r);
    const l = n;
    return [n, r] = new R().decode(t, r), [
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
}, tc = class extends At {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.id)), e.push(new R().encode(t.val0)), e.push(new R().encode(t.val1)), e.push(new R().encode(t.ptr)), e.push(new R().encode(t.len)), e.push(new G().encode(t.digest)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new R().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n;
    [n, r] = new G().decode(t, r);
    const l = n;
    [n, r] = new R().decode(t, r);
    const E = n;
    return [n, r] = new R().decode(t, r), [
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
}, ec = class extends At {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.from)), e.push(new G().encode(t.to)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n;
    return [n, r] = new R().decode(t, r), [
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
}, nc = class extends At {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.from)), e.push(new G().encode(t.to)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.assetId)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n;
    return [n, r] = new R().decode(t, r), [
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
}, rc = class extends At {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new R().encode(t.result)), e.push(new R().encode(t.gasUsed)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new R().decode(t, r);
    const s = n;
    return [n, r] = new R().decode(t, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, Rs = class extends At {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(t) {
    const e = [];
    return e.push(new Et(32).encode(t.sender)), e.push(new Et(32).encode(t.recipient)), e.push(new Et(32).encode(t.nonce)), e.push(new R().encode(t.amount)), e.push(Y(t.data || "0x")), Mt(dt(e));
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.sender)), e.push(new G().encode(t.recipient)), e.push(new R().encode(t.amount)), e.push(new G().encode(t.nonce)), e.push(new K("u16").encode(t.data.length)), e.push(new G().encode(t.digest)), e.push(new Et(t.data.length).encode(t.data)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new G().decode(t, r);
    const c = n;
    [n, r] = new K("u16").decode(t, r);
    const d = n;
    [n, r] = new G().decode(t, r);
    const l = n;
    [n, r] = new Et(d).decode(t, r);
    const E = Y(n), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: l,
      data: E
    };
    return g.messageId = Rs.getMessageId(g), [g, r];
  }
}, _u = (t, e) => {
  const n = Y(t), r = Y(e);
  return Mt(dt([n, r]));
}, Tr = class extends At {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(t, e) {
    return _u(t, e);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.subId)), e.push(new G().encode(t.contractId)), e.push(new R().encode(t.val)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n, l = Tr.getAssetId(i, s);
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
}, ro = class extends At {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(t, e) {
    return _u(t, e);
  }
  encode(t) {
    const e = [];
    return e.push(new G().encode(t.subId)), e.push(new G().encode(t.contractId)), e.push(new R().encode(t.val)), e.push(new R().encode(t.pc)), e.push(new R().encode(t.is)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new G().decode(t, r);
    const s = n;
    [n, r] = new G().decode(t, r);
    const i = n;
    [n, r] = new R().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    [n, r] = new R().decode(t, r);
    const d = n, l = Tr.getAssetId(i, s);
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
}, DB = class extends At {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8").encode(t.type));
    const { type: n } = t;
    switch (t.type) {
      case 0: {
        e.push(new ja().encode(t));
        break;
      }
      case 1: {
        e.push(new qa().encode(t));
        break;
      }
      case 2: {
        e.push(new $a().encode(t));
        break;
      }
      case 3: {
        e.push(new Wa().encode(t));
        break;
      }
      case 4: {
        e.push(new za().encode(t));
        break;
      }
      case 5: {
        e.push(new Ka().encode(t));
        break;
      }
      case 6: {
        e.push(new tc().encode(t));
        break;
      }
      case 7: {
        e.push(new ec().encode(t));
        break;
      }
      case 8: {
        e.push(new nc().encode(t));
        break;
      }
      case 9: {
        e.push(new rc().encode(t));
        break;
      }
      case 10: {
        e.push(new Rs().encode(t));
        break;
      }
      case 11: {
        e.push(new Tr().encode(t));
        break;
      }
      case 12: {
        e.push(new ro().encode(t));
        break;
      }
      default:
        throw new D(k.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u8").decode(t, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ja().decode(t, r), [n, r];
      case 1:
        return [n, r] = new qa().decode(t, r), [n, r];
      case 2:
        return [n, r] = new $a().decode(t, r), [n, r];
      case 3:
        return [n, r] = new Wa().decode(t, r), [n, r];
      case 4:
        return [n, r] = new za().decode(t, r), [n, r];
      case 5:
        return [n, r] = new Ka().decode(t, r), [n, r];
      case 6:
        return [n, r] = new tc().decode(t, r), [n, r];
      case 7:
        return [n, r] = new ec().decode(t, r), [n, r];
      case 8:
        return [n, r] = new nc().decode(t, r), [n, r];
      case 9:
        return [n, r] = new rc().decode(t, r), [n, r];
      case 10:
        return [n, r] = new Rs().decode(t, r), [n, r];
      case 11:
        return [n, r] = new Tr().decode(t, r), [n, r];
      case 12:
        return [n, r] = new ro().decode(t, r), [n, r];
      default:
        throw new D(k.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, sc = class extends zs {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, _s = class extends At {
  constructor() {
    super(
      "Witness",
      // Types of dynamic length are not supported in the ABI
      "unknown",
      0
    );
  }
  encode(t) {
    const e = [];
    return e.push(new K("u16").encode(t.dataLength)), e.push(new Et(t.dataLength).encode(t.data)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u16").decode(t, r);
    const s = n;
    return [n, r] = new Et(s).decode(t, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, Ce = /* @__PURE__ */ ((t) => (t[t.Script = 0] = "Script", t[t.Create = 1] = "Create", t[t.Mint = 2] = "Mint", t))(Ce || {}), ic = class extends At {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new R().encode(t.scriptGasLimit)), e.push(new K("u16").encode(t.scriptLength)), e.push(new K("u16").encode(t.scriptDataLength)), e.push(new K("u32").encode(t.policyTypes)), e.push(new K("u8").encode(t.inputsCount)), e.push(new K("u8").encode(t.outputsCount)), e.push(new K("u8").encode(t.witnessesCount)), e.push(new G().encode(t.receiptsRoot)), e.push(new Et(t.scriptLength).encode(t.script)), e.push(new Et(t.scriptDataLength).encode(t.scriptData)), e.push(new Ss().encode(t.policies)), e.push(new Be(new vs(), t.inputsCount).encode(t.inputs)), e.push(new Be(new Ns(), t.outputsCount).encode(t.outputs)), e.push(new Be(new _s(), t.witnessesCount).encode(t.witnesses)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new R().decode(t, r);
    const s = n;
    [n, r] = new K("u16").decode(t, r);
    const i = n;
    [n, r] = new K("u16").decode(t, r);
    const o = n;
    [n, r] = new K("u32").decode(t, r);
    const c = n;
    [n, r] = new K("u8").decode(t, r);
    const d = n;
    [n, r] = new K("u8").decode(t, r);
    const l = n;
    [n, r] = new K("u8").decode(t, r);
    const E = n;
    [n, r] = new G().decode(t, r);
    const g = n;
    [n, r] = new Et(i).decode(t, r);
    const C = n;
    [n, r] = new Et(o).decode(t, r);
    const x = n;
    [n, r] = new Ss().decode(t, r, c);
    const F = n;
    [n, r] = new Be(new vs(), d).decode(t, r);
    const b = n;
    [n, r] = new Be(new Ns(), l).decode(t, r);
    const v = n;
    return [n, r] = new Be(new _s(), E).decode(t, r), [
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
        policies: F,
        inputs: b,
        outputs: v,
        witnesses: n
      },
      r
    ];
  }
}, oc = class extends At {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new K("u16").encode(t.bytecodeLength)), e.push(new K("u8").encode(t.bytecodeWitnessIndex)), e.push(new K("u32").encode(t.policyTypes)), e.push(new K("u16").encode(t.storageSlotsCount)), e.push(new K("u8").encode(t.inputsCount)), e.push(new K("u8").encode(t.outputsCount)), e.push(new K("u8").encode(t.witnessesCount)), e.push(new G().encode(t.salt)), e.push(new Ss().encode(t.policies)), e.push(
      new Be(new sc(), t.storageSlotsCount).encode(t.storageSlots)
    ), e.push(new Be(new vs(), t.inputsCount).encode(t.inputs)), e.push(new Be(new Ns(), t.outputsCount).encode(t.outputs)), e.push(new Be(new _s(), t.witnessesCount).encode(t.witnesses)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u16").decode(t, r);
    const s = n;
    [n, r] = new K("u8").decode(t, r);
    const i = n;
    [n, r] = new K("u32").decode(t, r);
    const o = n;
    [n, r] = new K("u16").decode(t, r);
    const c = n;
    [n, r] = new K("u8").decode(t, r);
    const d = n;
    [n, r] = new K("u8").decode(t, r);
    const l = n;
    [n, r] = new K("u8").decode(t, r);
    const E = n;
    [n, r] = new G().decode(t, r);
    const g = n;
    [n, r] = new Ss().decode(t, r, o);
    const C = n;
    [n, r] = new Be(new sc(), c).decode(t, r);
    const x = n;
    [n, r] = new Be(new vs(), d).decode(t, r);
    const F = n;
    [n, r] = new Be(new Ns(), l).decode(t, r);
    const b = n;
    return [n, r] = new Be(new _s(), E).decode(t, r), [
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
        inputs: F,
        outputs: b,
        witnesses: n
      },
      r
    ];
  }
}, ac = class extends At {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ir().encode(t.txPointer)), e.push(new Fs().encode(t.inputContract)), e.push(new Ds().encode(t.outputContract)), e.push(new R().encode(t.mintAmount)), e.push(new G().encode(t.mintAssetId)), dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new ir().decode(t, r);
    const s = n;
    [n, r] = new Fs().decode(t, r);
    const i = n;
    [n, r] = new Ds().decode(t, r);
    const o = n;
    [n, r] = new R().decode(t, r);
    const c = n;
    return [n, r] = new G().decode(t, r), [
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
}, sn = class extends At {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8").encode(t.type));
    const { type: n } = t;
    switch (t.type) {
      case 0: {
        e.push(
          new ic().encode(t)
        );
        break;
      }
      case 1: {
        e.push(
          new oc().encode(t)
        );
        break;
      }
      case 2: {
        e.push(new ac().encode(t));
        break;
      }
      default:
        throw new D(
          k.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return dt(e);
  }
  decode(t, e) {
    let n, r = e;
    [n, r] = new K("u8").decode(t, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ic().decode(t, r), [n, r];
      case 1:
        return [n, r] = new oc().decode(t, r), [n, r];
      case 2:
        return [n, r] = new ac().decode(t, r), [n, r];
      default:
        throw new D(
          k.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, NB = class extends zs {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new K("u8")
    });
  }
}, SB = 16 * 1024, RB = 16, _B = 1024 * 1024 * 1024, kB = 1024 * 1024 * 1024, MB = 255, LB = 1024 * 1024, TB = 1024 * 1024, Vf = "0xffffffffffff0000", ku = "0xffffffffffff0001", jf = "0xffffffffffff0002", qf = "0xffffffffffff0003", $f = "0xffffffffffff0004", Wf = "0x0", kt = "0x0000000000000000000000000000000000000000000000000000000000000000", Ie = kt, OB = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
var or = Or.bech32m = Or.bech32 = void 0;
const ks = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Mu = {};
for (let t = 0; t < ks.length; t++) {
  const e = ks.charAt(t);
  Mu[e] = t;
}
function $n(t) {
  const e = t >> 25;
  return (t & 33554431) << 5 ^ -(e >> 0 & 1) & 996825010 ^ -(e >> 1 & 1) & 642813549 ^ -(e >> 2 & 1) & 513874426 ^ -(e >> 3 & 1) & 1027748829 ^ -(e >> 4 & 1) & 705979059;
}
function cc(t) {
  let e = 1;
  for (let n = 0; n < t.length; ++n) {
    const r = t.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + t + ")";
    e = $n(e) ^ r >> 5;
  }
  e = $n(e);
  for (let n = 0; n < t.length; ++n) {
    const r = t.charCodeAt(n);
    e = $n(e) ^ r & 31;
  }
  return e;
}
function Ho(t, e, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, c = [];
  for (let d = 0; d < t.length; ++d)
    for (s = s << e | t[d], i += e; i >= n; )
      i -= n, c.push(s >> i & o);
  if (r)
    i > 0 && c.push(s << n - i & o);
  else {
    if (i >= e)
      return "Excess padding";
    if (s << n - i & o)
      return "Non-zero padding";
  }
  return c;
}
function zf(t) {
  return Ho(t, 8, 5, !0);
}
function Kf(t) {
  const e = Ho(t, 5, 8, !1);
  if (Array.isArray(e))
    return e;
}
function tg(t) {
  const e = Ho(t, 5, 8, !1);
  if (Array.isArray(e))
    return e;
  throw new Error(e);
}
function Lu(t) {
  let e;
  t === "bech32" ? e = 1 : e = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let l = cc(o);
    if (typeof l == "string")
      throw new Error(l);
    let E = o + "1";
    for (let g = 0; g < c.length; ++g) {
      const C = c[g];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      l = $n(l) ^ C, E += ks.charAt(C);
    }
    for (let g = 0; g < 6; ++g)
      l = $n(l);
    l ^= e;
    for (let g = 0; g < 6; ++g) {
      const C = l >> (5 - g) * 5 & 31;
      E += ks.charAt(C);
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
    let x = cc(g);
    if (typeof x == "string")
      return x;
    const F = [];
    for (let b = 0; b < C.length; ++b) {
      const v = C.charAt(b), S = Mu[v];
      if (S === void 0)
        return "Unknown character " + v;
      x = $n(x) ^ S, !(b + 6 >= C.length) && F.push(S);
    }
    return x !== e ? "Invalid checksum for " + o : { prefix: g, words: F };
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
    toWords: zf,
    fromWordsUnsafe: Kf,
    fromWords: tg
  };
}
Or.bech32 = Lu("bech32");
or = Or.bech32m = Lu("bech32m");
var Ms = "fuel";
function Jo(t) {
  return or.decode(t);
}
function Es(t) {
  return or.encode(
    Ms,
    or.toWords(Y(V(t)))
  );
}
function Bs(t) {
  return typeof t == "string" && t.indexOf(Ms + 1) === 0 && Jo(t).prefix === Ms;
}
function so(t) {
  return t.length === 66 && /(0x)[0-9a-f]{64}$/i.test(t);
}
function Ac(t) {
  return t.length === 130 && /(0x)[0-9a-f]{128}$/i.test(t);
}
function io(t) {
  return t.length === 42 && /(0x)[0-9a-f]{40}$/i.test(t);
}
function Zo(t) {
  return new Uint8Array(or.fromWords(Jo(t).words));
}
function uc(t) {
  if (!Bs(t))
    throw new D(
      D.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${t}.`
    );
  return V(Zo(t));
}
function eg(t) {
  const { words: e } = Jo(t);
  return or.encode(Ms, e);
}
var Fr = (t) => t instanceof Su ? t.address : t instanceof Jf ? t.id : t, ng = () => V(bn(32)), rg = (t) => {
  let e;
  try {
    if (!so(t))
      throw new D(
        D.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${t}.`
      );
    e = Zo(Es(t)), e = V(e.fill(0, 0, 12));
  } catch {
    throw new D(
      D.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${t}.`
    );
  }
  return e;
}, sg = (t) => {
  if (!io(t))
    throw new D(D.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return t.replace("0x", "0x000000000000000000000000");
}, mt = class extends Hf {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(e) {
    super();
    // #region address-2
    N(this, "bech32Address");
    if (this.bech32Address = eg(e), !Bs(this.bech32Address))
      throw new D(
        D.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
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
    return uc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return Zo(this.bech32Address);
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
    const e = uc(this.bech32Address);
    return {
      value: rg(e)
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
  equals(e) {
    return this.bech32Address === e.bech32Address;
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   */
  static fromPublicKey(e) {
    if (!Ac(e))
      throw new D(D.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${e}.`);
    const n = Mt(V(Y(e)));
    return new mt(Es(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(e) {
    if (!so(e))
      throw new D(
        D.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${e}.`
      );
    return new mt(Es(e));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(ng());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(e) {
    return Bs(e) ? new mt(e) : this.fromB256(e);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   */
  static fromAddressOrString(e) {
    return typeof e == "string" ? this.fromString(e) : e;
  }
  /**
   * Takes a dynamic string or `AbstractAddress` and creates an `Address`
   *
   * @param addressId - A string containing Bech32, B256, or Public Key
   * @throws Error - Unknown address if the format is not recognised
   * @returns A new `Address` instance
   */
  static fromDynamicInput(e) {
    if (typeof e != "string" && "toB256" in e)
      return mt.fromB256(e.toB256());
    if (Ac(e))
      return mt.fromPublicKey(e);
    if (Bs(e))
      return new mt(e);
    if (so(e))
      return mt.fromB256(e);
    if (io(e))
      return mt.fromEvmAddress(e);
    throw new D(
      D.CODES.PARSE_FAILED,
      "Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(e) {
    if (!io(e))
      throw new D(
        D.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${e}.`
      );
    const n = sg(e);
    return new mt(Es(n));
  }
}, Ri = {}, oo = { exports: {} };
(function(t, e) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof wt < "u" && wt, r = function() {
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
      function F(A) {
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
        }), F(A);
      }, b.prototype.values = function() {
        var A = [];
        return this.forEach(function(h) {
          A.push(h);
        }), F(A);
      }, b.prototype.entries = function() {
        var A = [];
        return this.forEach(function(h, m) {
          A.push([m, h]);
        }), F(A);
      }, d.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
      function v(A) {
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
      function O(A) {
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
      function _() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && l(A) ? (this._bodyArrayBuffer = M(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || g(A)) ? this._bodyArrayBuffer = M(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var A = v(this);
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
            var A = v(this);
            return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(J);
        }), this.text = function() {
          var A = v(this);
          if (A)
            return A;
          if (this._bodyBlob)
            return O(this._bodyBlob);
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
            var f = m.split("="), w = f.shift().replace(/\+/g, " "), B = f.join("=").replace(/\+/g, " ");
            h.append(decodeURIComponent(w), decodeURIComponent(B));
          }
        }), h;
      }
      function H(A) {
        var h = new b(), m = A.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var w = f.split(":"), B = w.shift().trim();
          if (B) {
            var p = w.join(":").trim();
            h.append(B, p);
          }
        }), h;
      }
      _.call($.prototype);
      function tt(A, h) {
        if (!(this instanceof tt))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        h || (h = {}), this.type = "default", this.status = h.status === void 0 ? 200 : h.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = h.statusText === void 0 ? "" : "" + h.statusText, this.headers = new b(h.headers), this.url = h.url || "", this._initBody(A);
      }
      _.call(tt.prototype), tt.prototype.clone = function() {
        return new tt(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new b(this.headers),
          url: this.url
        });
      }, tt.error = function() {
        var A = new tt(null, { status: 0, statusText: "" });
        return A.type = "error", A;
      };
      var y = [301, 302, 303, 307, 308];
      tt.redirect = function(A, h) {
        if (y.indexOf(h) === -1)
          throw new RangeError("Invalid status code");
        return new tt(null, { status: h, headers: { location: A } });
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
          var B = new XMLHttpRequest();
          function p() {
            B.abort();
          }
          B.onload = function() {
            var I = {
              status: B.status,
              statusText: B.statusText,
              headers: H(B.getAllResponseHeaders() || "")
            };
            I.url = "responseURL" in B ? B.responseURL : I.headers.get("X-Request-URL");
            var Z = "response" in B ? B.response : B.responseText;
            setTimeout(function() {
              m(new tt(Z, I));
            }, 0);
          }, B.onerror = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, B.ontimeout = function() {
            setTimeout(function() {
              f(new TypeError("Network request failed"));
            }, 0);
          }, B.onabort = function() {
            setTimeout(function() {
              f(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function u(I) {
            try {
              return I === "" && c.location.href ? c.location.href : I;
            } catch {
              return I;
            }
          }
          B.open(w.method, u(w.url), !0), w.credentials === "include" ? B.withCredentials = !0 : w.credentials === "omit" && (B.withCredentials = !1), "responseType" in B && (d.blob ? B.responseType = "blob" : d.arrayBuffer && w.headers.get("Content-Type") && w.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (B.responseType = "arraybuffer")), h && typeof h.headers == "object" && !(h.headers instanceof b) ? Object.getOwnPropertyNames(h.headers).forEach(function(I) {
            B.setRequestHeader(I, x(h.headers[I]));
          }) : w.headers.forEach(function(I, Z) {
            B.setRequestHeader(Z, I);
          }), w.signal && (w.signal.addEventListener("abort", p), B.onreadystatechange = function() {
            B.readyState === 4 && w.signal.removeEventListener("abort", p);
          }), B.send(typeof w._bodyInit > "u" ? null : w._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = b, c.Request = $, c.Response = tt), o.Headers = b, o.Request = $, o.Response = tt, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  e = s.fetch, e.default = s.fetch, e.fetch = s.fetch, e.Headers = s.Headers, e.Request = s.Request, e.Response = s.Response, t.exports = e;
})(oo, oo.exports);
var ig = oo.exports;
function og(t) {
  return typeof t == "object" && t !== null;
}
function ag(t, e) {
  if (!!!t)
    throw new Error(
      e ?? "Unexpected invariant triggered."
    );
}
const cg = /\r\n|[\n\r]/g;
function ao(t, e) {
  let n = 0, r = 1;
  for (const s of t.body.matchAll(cg)) {
    if (typeof s.index == "number" || ag(!1), s.index >= e)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: e + 1 - n
  };
}
function Ag(t) {
  return Tu(
    t.source,
    ao(t.source, t.start)
  );
}
function Tu(t, e) {
  const n = t.locationOffset.column - 1, r = "".padStart(n) + t.body, s = e.line - 1, i = t.locationOffset.line - 1, o = e.line + i, c = e.line === 1 ? n : 0, d = e.column + c, l = `${t.name}:${o}:${d}
`, E = r.split(/\r\n|[\n\r]/g), g = E[s];
  if (g.length > 120) {
    const C = Math.floor(d / 80), x = d % 80, F = [];
    for (let b = 0; b < g.length; b += 80)
      F.push(g.slice(b, b + 80));
    return l + dc([
      [`${o} |`, F[0]],
      ...F.slice(1, C + 1).map((b) => ["|", b]),
      ["|", "^".padStart(x)],
      ["|", F[C + 1]]
    ]);
  }
  return l + dc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, E[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, E[s + 1]]
  ]);
}
function dc(t) {
  const e = t.filter(([r, s]) => s !== void 0), n = Math.max(...e.map(([r]) => r.length));
  return e.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function ug(t) {
  const e = t[0];
  return e == null || "kind" in e || "length" in e ? {
    nodes: e,
    source: t[1],
    positions: t[2],
    path: t[3],
    originalError: t[4],
    extensions: t[5]
  } : e;
}
class Yo extends Error {
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
  constructor(e, ...n) {
    var r, s, i;
    const { nodes: o, source: c, positions: d, path: l, originalError: E, extensions: g } = ug(n);
    super(e), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = E ?? void 0, this.nodes = hc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = hc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((F) => F.loc).filter((F) => F != null)
    );
    this.source = c ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (C == null ? void 0 : C.map((F) => F.start)), this.locations = d && c ? d.map((F) => ao(c, F)) : C == null ? void 0 : C.map((F) => ao(F.source, F.start));
    const x = og(
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Yo) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (const n of this.nodes)
        n.loc && (e += `

` + Ag(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        e += `

` + Tu(this.source, n);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function hc(t) {
  return t === void 0 || t.length === 0 ? void 0 : t;
}
function ge(t, e, n) {
  return new Yo(`Syntax Error: ${n}`, {
    source: t,
    positions: [e]
  });
}
class dg {
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
  constructor(e, n, r) {
    this.start = e.start, this.end = n.end, this.startToken = e, this.endToken = n, this.source = r;
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
class Ou {
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
  constructor(e, n, r, s, i, o) {
    this.kind = e, this.start = n, this.end = r, this.line = s, this.column = i, this.value = o, this.prev = null, this.next = null;
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
const Pu = {
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
}, hg = new Set(Object.keys(Pu));
function lc(t) {
  const e = t == null ? void 0 : t.kind;
  return typeof e == "string" && hg.has(e);
}
var Yn;
(function(t) {
  t.QUERY = "query", t.MUTATION = "mutation", t.SUBSCRIPTION = "subscription";
})(Yn || (Yn = {}));
var co;
(function(t) {
  t.QUERY = "QUERY", t.MUTATION = "MUTATION", t.SUBSCRIPTION = "SUBSCRIPTION", t.FIELD = "FIELD", t.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", t.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", t.INLINE_FRAGMENT = "INLINE_FRAGMENT", t.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", t.SCHEMA = "SCHEMA", t.SCALAR = "SCALAR", t.OBJECT = "OBJECT", t.FIELD_DEFINITION = "FIELD_DEFINITION", t.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", t.INTERFACE = "INTERFACE", t.UNION = "UNION", t.ENUM = "ENUM", t.ENUM_VALUE = "ENUM_VALUE", t.INPUT_OBJECT = "INPUT_OBJECT", t.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(co || (co = {}));
var ot;
(function(t) {
  t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.VARIABLE = "Variable", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.NULL = "NullValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.DIRECTIVE_DEFINITION = "DirectiveDefinition", t.SCHEMA_EXTENSION = "SchemaExtension", t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", t.UNION_TYPE_EXTENSION = "UnionTypeExtension", t.ENUM_TYPE_EXTENSION = "EnumTypeExtension", t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ot || (ot = {}));
function Ao(t) {
  return t === 9 || t === 32;
}
function Pr(t) {
  return t >= 48 && t <= 57;
}
function Uu(t) {
  return t >= 97 && t <= 122 || // A-Z
  t >= 65 && t <= 90;
}
function Gu(t) {
  return Uu(t) || t === 95;
}
function lg(t) {
  return Uu(t) || Pr(t) || t === 95;
}
function fg(t) {
  var e;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < t.length; ++o) {
    var i;
    const c = t[o], d = gg(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return t.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (e = r) !== null && e !== void 0 ? e : 0,
    s + 1
  );
}
function gg(t) {
  let e = 0;
  for (; e < t.length && Ao(t.charCodeAt(e)); )
    ++e;
  return e;
}
function pg(t, e) {
  const n = t.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || Ao(x.charCodeAt(0))), o = n.endsWith('\\"""'), c = t.endsWith('"') && !o, d = t.endsWith("\\"), l = c || d, E = !(e != null && e.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || t.length > 70 || l || i || o);
  let g = "";
  const C = s && Ao(t.charCodeAt(0));
  return (E && !C || i) && (g += `
`), g += n, (E || l) && (g += `
`), '"""' + g + '"""';
}
var T;
(function(t) {
  t.SOF = "<SOF>", t.EOF = "<EOF>", t.BANG = "!", t.DOLLAR = "$", t.AMP = "&", t.PAREN_L = "(", t.PAREN_R = ")", t.SPREAD = "...", t.COLON = ":", t.EQUALS = "=", t.AT = "@", t.BRACKET_L = "[", t.BRACKET_R = "]", t.BRACE_L = "{", t.PIPE = "|", t.BRACE_R = "}", t.NAME = "Name", t.INT = "Int", t.FLOAT = "Float", t.STRING = "String", t.BLOCK_STRING = "BlockString", t.COMMENT = "Comment";
})(T || (T = {}));
class mg {
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
  constructor(e) {
    const n = new Ou(T.SOF, 0, 0, 0, 0);
    this.source = e, this.lastToken = n, this.token = n, this.line = 1, this.lineStart = 0;
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
    let e = this.token;
    if (e.kind !== T.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const n = wg(this, e.end);
          e.next = n, n.prev = e, e = n;
        }
      while (e.kind === T.COMMENT);
    return e;
  }
}
function Ig(t) {
  return t === T.BANG || t === T.DOLLAR || t === T.AMP || t === T.PAREN_L || t === T.PAREN_R || t === T.SPREAD || t === T.COLON || t === T.EQUALS || t === T.AT || t === T.BRACKET_L || t === T.BRACKET_R || t === T.BRACE_L || t === T.PIPE || t === T.BRACE_R;
}
function Ir(t) {
  return t >= 0 && t <= 55295 || t >= 57344 && t <= 1114111;
}
function Ks(t, e) {
  return Hu(t.charCodeAt(e)) && Ju(t.charCodeAt(e + 1));
}
function Hu(t) {
  return t >= 55296 && t <= 56319;
}
function Ju(t) {
  return t >= 56320 && t <= 57343;
}
function Tn(t, e) {
  const n = t.source.body.codePointAt(e);
  if (n === void 0)
    return T.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function fe(t, e, n, r, s) {
  const i = t.line, o = 1 + n - t.lineStart;
  return new Ou(e, n, r, i, o, s);
}
function wg(t, e) {
  const n = t.source.body, r = n.length;
  let s = e;
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
        ++s, ++t.line, t.lineStart = s;
        continue;
      case 13:
        n.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++t.line, t.lineStart = s;
        continue;
      case 35:
        return Eg(t, s);
      case 33:
        return fe(t, T.BANG, s, s + 1);
      case 36:
        return fe(t, T.DOLLAR, s, s + 1);
      case 38:
        return fe(t, T.AMP, s, s + 1);
      case 40:
        return fe(t, T.PAREN_L, s, s + 1);
      case 41:
        return fe(t, T.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return fe(t, T.SPREAD, s, s + 3);
        break;
      case 58:
        return fe(t, T.COLON, s, s + 1);
      case 61:
        return fe(t, T.EQUALS, s, s + 1);
      case 64:
        return fe(t, T.AT, s, s + 1);
      case 91:
        return fe(t, T.BRACKET_L, s, s + 1);
      case 93:
        return fe(t, T.BRACKET_R, s, s + 1);
      case 123:
        return fe(t, T.BRACE_L, s, s + 1);
      case 124:
        return fe(t, T.PIPE, s, s + 1);
      case 125:
        return fe(t, T.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? xg(t, s) : yg(t, s);
    }
    if (Pr(i) || i === 45)
      return Bg(t, s, i);
    if (Gu(i))
      return Fg(t, s);
    throw ge(
      t.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Ir(i) || Ks(n, s) ? `Unexpected character: ${Tn(t, s)}.` : `Invalid character: ${Tn(t, s)}.`
    );
  }
  return fe(t, T.EOF, r, r);
}
function Eg(t, e) {
  const n = t.source.body, r = n.length;
  let s = e + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Ir(i))
      ++s;
    else if (Ks(n, s))
      s += 2;
    else
      break;
  }
  return fe(
    t,
    T.COMMENT,
    e,
    s,
    n.slice(e + 1, s)
  );
}
function Bg(t, e, n) {
  const r = t.source.body;
  let s = e, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Pr(i))
      throw ge(
        t.source,
        s,
        `Invalid number, unexpected digit after 0: ${Tn(
          t,
          s
        )}.`
      );
  } else
    s = _i(t, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = _i(t, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = _i(t, s, i), i = r.charCodeAt(s)), i === 46 || Gu(i))
    throw ge(
      t.source,
      s,
      `Invalid number, expected digit but got: ${Tn(
        t,
        s
      )}.`
    );
  return fe(
    t,
    o ? T.FLOAT : T.INT,
    e,
    s,
    r.slice(e, s)
  );
}
function _i(t, e, n) {
  if (!Pr(n))
    throw ge(
      t.source,
      e,
      `Invalid number, expected digit but got: ${Tn(
        t,
        e
      )}.`
    );
  const r = t.source.body;
  let s = e + 1;
  for (; Pr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function yg(t, e) {
  const n = t.source.body, r = n.length;
  let s = e + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), fe(t, T.STRING, e, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Cg(t, s) : bg(t, s) : Qg(t, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (Ir(c))
      ++s;
    else if (Ks(n, s))
      s += 2;
    else
      throw ge(
        t.source,
        s,
        `Invalid character within String: ${Tn(
          t,
          s
        )}.`
      );
  }
  throw ge(t.source, s, "Unterminated string.");
}
function Cg(t, e) {
  const n = t.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(e + s++);
    if (i === 125) {
      if (s < 5 || !Ir(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | vr(i), r < 0)
      break;
  }
  throw ge(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${n.slice(
      e,
      e + s
    )}".`
  );
}
function bg(t, e) {
  const n = t.source.body, r = fc(n, e + 2);
  if (Ir(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Hu(r) && n.charCodeAt(e + 6) === 92 && n.charCodeAt(e + 7) === 117) {
    const s = fc(n, e + 8);
    if (Ju(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw ge(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${n.slice(e, e + 6)}".`
  );
}
function fc(t, e) {
  return vr(t.charCodeAt(e)) << 12 | vr(t.charCodeAt(e + 1)) << 8 | vr(t.charCodeAt(e + 2)) << 4 | vr(t.charCodeAt(e + 3));
}
function vr(t) {
  return t >= 48 && t <= 57 ? t - 48 : t >= 65 && t <= 70 ? t - 55 : t >= 97 && t <= 102 ? t - 87 : -1;
}
function Qg(t, e) {
  const n = t.source.body;
  switch (n.charCodeAt(e + 1)) {
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
  throw ge(
    t.source,
    e,
    `Invalid character escape sequence: "${n.slice(
      e,
      e + 2
    )}".`
  );
}
function xg(t, e) {
  const n = t.source.body, r = n.length;
  let s = t.lineStart, i = e + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const l = n.charCodeAt(i);
    if (l === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const E = fe(
        t,
        T.BLOCK_STRING,
        e,
        i + 3,
        // Return a string of the lines joined with U+000A.
        fg(d).join(`
`)
      );
      return t.line += d.length - 1, t.lineStart = s, E;
    }
    if (l === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (l === 10 || l === 13) {
      c += n.slice(o, i), d.push(c), l === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (Ir(l))
      ++i;
    else if (Ks(n, i))
      i += 2;
    else
      throw ge(
        t.source,
        i,
        `Invalid character within String: ${Tn(
          t,
          i
        )}.`
      );
  }
  throw ge(t.source, i, "Unterminated string.");
}
function Fg(t, e) {
  const n = t.source.body, r = n.length;
  let s = e + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (lg(i))
      ++s;
    else
      break;
  }
  return fe(
    t,
    T.NAME,
    e,
    s,
    n.slice(e, s)
  );
}
function ys(t, e) {
  if (!!!t)
    throw new Error(e);
}
const vg = 10, Zu = 2;
function Yu(t) {
  return ti(t, []);
}
function ti(t, e) {
  switch (typeof t) {
    case "string":
      return JSON.stringify(t);
    case "function":
      return t.name ? `[function ${t.name}]` : "[function]";
    case "object":
      return Dg(t, e);
    default:
      return String(t);
  }
}
function Dg(t, e) {
  if (t === null)
    return "null";
  if (e.includes(t))
    return "[Circular]";
  const n = [...e, t];
  if (Ng(t)) {
    const r = t.toJSON();
    if (r !== t)
      return typeof r == "string" ? r : ti(r, n);
  } else if (Array.isArray(t))
    return Rg(t, n);
  return Sg(t, n);
}
function Ng(t) {
  return typeof t.toJSON == "function";
}
function Sg(t, e) {
  const n = Object.entries(t);
  return n.length === 0 ? "{}" : e.length > Zu ? "[" + _g(t) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + ti(i, e)
  ).join(", ") + " }";
}
function Rg(t, e) {
  if (t.length === 0)
    return "[]";
  if (e.length > Zu)
    return "[Array]";
  const n = Math.min(vg, t.length), r = t.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(ti(t[i], e));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function _g(t) {
  const e = Object.prototype.toString.call(t).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof t.constructor == "function") {
    const n = t.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return e;
}
const kg = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(e, n) {
    return e instanceof n;
  }
);
class Xu {
  constructor(e, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || ys(!1, `Body must be a string. Received: ${Yu(e)}.`), this.body = e, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || ys(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || ys(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Mg(t) {
  return kg(t, Xu);
}
function Vu(t, e) {
  return new $r(t, e).parseDocument();
}
function Lg(t, e) {
  const n = new $r(t, e);
  n.expectToken(T.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(T.EOF), r;
}
function Tg(t, e) {
  const n = new $r(t, e);
  n.expectToken(T.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(T.EOF), r;
}
function Og(t, e) {
  const n = new $r(t, e);
  n.expectToken(T.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(T.EOF), r;
}
class $r {
  constructor(e, n = {}) {
    const r = Mg(e) ? e : new Xu(e);
    this._lexer = new mg(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const e = this.expectToken(T.NAME);
    return this.node(e, {
      kind: ot.NAME,
      value: e.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ot.DOCUMENT,
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
    const e = this.peekDescription(), n = e ? this._lexer.lookahead() : this._lexer.token;
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
      if (e)
        throw ge(
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
    const e = this._lexer.token;
    if (this.peek(T.BRACE_L))
      return this.node(e, {
        kind: ot.OPERATION_DEFINITION,
        operation: Yn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(T.NAME) && (r = this.parseName()), this.node(e, {
      kind: ot.OPERATION_DEFINITION,
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
    const e = this.expectToken(T.NAME);
    switch (e.value) {
      case "query":
        return Yn.QUERY;
      case "mutation":
        return Yn.MUTATION;
      case "subscription":
        return Yn.SUBSCRIPTION;
    }
    throw this.unexpected(e);
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
      kind: ot.VARIABLE_DEFINITION,
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
    const e = this._lexer.token;
    return this.expectToken(T.DOLLAR), this.node(e, {
      kind: ot.VARIABLE,
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
      kind: ot.SELECTION_SET,
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
    const e = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(T.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(e, {
      kind: ot.FIELD,
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
  parseArguments(e) {
    const n = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(T.PAREN_L, n, T.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(e = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(T.COLON), this.node(n, {
      kind: ot.ARGUMENT,
      name: r,
      value: this.parseValueLiteral(e)
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
    const e = this._lexer.token;
    this.expectToken(T.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(T.NAME) ? this.node(e, {
      kind: ot.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(e, {
      kind: ot.INLINE_FRAGMENT,
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
    const e = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
      kind: ot.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(e, {
      kind: ot.FRAGMENT_DEFINITION,
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
  parseValueLiteral(e) {
    const n = this._lexer.token;
    switch (n.kind) {
      case T.BRACKET_L:
        return this.parseList(e);
      case T.BRACE_L:
        return this.parseObject(e);
      case T.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ot.INT,
          value: n.value
        });
      case T.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ot.FLOAT,
          value: n.value
        });
      case T.STRING:
      case T.BLOCK_STRING:
        return this.parseStringLiteral();
      case T.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: ot.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: ot.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: ot.NULL
            });
          default:
            return this.node(n, {
              kind: ot.ENUM,
              value: n.value
            });
        }
      case T.DOLLAR:
        if (e)
          if (this.expectToken(T.DOLLAR), this._lexer.token.kind === T.NAME) {
            const r = this._lexer.token.value;
            throw ge(
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
    const e = this._lexer.token;
    return this.advanceLexer(), this.node(e, {
      kind: ot.STRING,
      value: e.value,
      block: e.kind === T.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(e) {
    const n = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: ot.LIST,
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
  parseObject(e) {
    const n = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: ot.OBJECT,
      fields: this.any(T.BRACE_L, n, T.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(e) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(T.COLON), this.node(n, {
      kind: ot.OBJECT_FIELD,
      name: r,
      value: this.parseValueLiteral(e)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(e) {
    const n = [];
    for (; this.peek(T.AT); )
      n.push(this.parseDirective(e));
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
  parseDirective(e) {
    const n = this._lexer.token;
    return this.expectToken(T.AT), this.node(n, {
      kind: ot.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(e)
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
    const e = this._lexer.token;
    let n;
    if (this.expectOptionalToken(T.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(T.BRACKET_R), n = this.node(e, {
        kind: ot.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(T.BANG) ? this.node(e, {
      kind: ot.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ot.NAMED_TYPE,
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("schema");
    const r = this.parseConstDirectives(), s = this.many(
      T.BRACE_L,
      this.parseOperationTypeDefinition,
      T.BRACE_R
    );
    return this.node(e, {
      kind: ot.SCHEMA_DEFINITION,
      description: n,
      directives: r,
      operationTypes: s
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const e = this._lexer.token, n = this.parseOperationType();
    this.expectToken(T.COLON);
    const r = this.parseNamedType();
    return this.node(e, {
      kind: ot.OPERATION_TYPE_DEFINITION,
      operation: n,
      type: r
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("scalar");
    const r = this.parseName(), s = this.parseConstDirectives();
    return this.node(e, {
      kind: ot.SCALAR_TYPE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("type");
    const r = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(e, {
      kind: ot.OBJECT_TYPE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(T.COLON);
    const i = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(e, {
      kind: ot.FIELD_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(T.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(T.EQUALS) && (i = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(e, {
      kind: ot.INPUT_VALUE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("interface");
    const r = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(e, {
      kind: ot.INTERFACE_TYPE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("union");
    const r = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: ot.UNION_TYPE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("enum");
    const r = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: ot.ENUM_TYPE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseDescription(), r = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(e, {
      kind: ot.ENUM_VALUE_DEFINITION,
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
      throw ge(
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("input");
    const r = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: ot.INPUT_OBJECT_TYPE_DEFINITION,
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
    const e = this._lexer.lookahead();
    if (e.kind === T.NAME)
      switch (e.value) {
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
    throw this.unexpected(e);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const n = this.parseConstDirectives(), r = this.optionalMany(
      T.BRACE_L,
      this.parseOperationTypeDefinition,
      T.BRACE_R
    );
    if (n.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.SCHEMA_EXTENSION,
      directives: n,
      operationTypes: r
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const n = this.parseName(), r = this.parseConstDirectives();
    if (r.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.SCALAR_TYPE_EXTENSION,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (r.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.OBJECT_TYPE_EXTENSION,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (r.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.INTERFACE_TYPE_EXTENSION,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const n = this.parseName(), r = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    if (r.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.UNION_TYPE_EXTENSION,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const n = this.parseName(), r = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    if (r.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.ENUM_TYPE_EXTENSION,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const n = this.parseName(), r = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    if (r.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: ot.INPUT_OBJECT_TYPE_EXTENSION,
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
    const e = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(T.AT);
    const r = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(e, {
      kind: ot.DIRECTIVE_DEFINITION,
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
    const e = this._lexer.token, n = this.parseName();
    if (Object.prototype.hasOwnProperty.call(co, n.value))
      return n;
    throw this.unexpected(e);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(e, n) {
    return this._options.noLocation !== !0 && (n.loc = new dg(
      e,
      this._lexer.lastToken,
      this._lexer.source
    )), n;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(e) {
    return this._lexer.token.kind === e;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(e) {
    const n = this._lexer.token;
    if (n.kind === e)
      return this.advanceLexer(), n;
    throw ge(
      this._lexer.source,
      n.start,
      `Expected ${ju(e)}, found ${us(n)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(e) {
    const n = this._lexer.token;
    if (n.kind === T.NAME && n.value === e)
      this.advanceLexer();
    else
      throw ge(
        this._lexer.source,
        n.start,
        `Expected "${e}", found ${us(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(e) {
    const n = this._lexer.token;
    return n.kind === T.NAME && n.value === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(e) {
    const n = e ?? this._lexer.token;
    return ge(
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
  any(e, n, r) {
    this.expectToken(e);
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
  optionalMany(e, n, r) {
    if (this.expectOptionalToken(e)) {
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
  many(e, n, r) {
    this.expectToken(e);
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
  delimitedMany(e, n) {
    this.expectOptionalToken(e);
    const r = [];
    do
      r.push(n.call(this));
    while (this.expectOptionalToken(e));
    return r;
  }
  advanceLexer() {
    const { maxTokens: e } = this._options, n = this._lexer.advance();
    if (e !== void 0 && n.kind !== T.EOF && (++this._tokenCounter, this._tokenCounter > e))
      throw ge(
        this._lexer.source,
        n.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function us(t) {
  const e = t.value;
  return ju(t.kind) + (e != null ? ` "${e}"` : "");
}
function ju(t) {
  return Ig(t) ? `"${t}"` : t;
}
const Pg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: $r,
  parse: Vu,
  parseConstValue: Tg,
  parseType: Og,
  parseValue: Lg
}, Symbol.toStringTag, { value: "Module" })), Ug = /* @__PURE__ */ Mo(Pg);
function Gg(t) {
  return `"${t.replace(Hg, Jg)}"`;
}
const Hg = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Jg(t) {
  return Zg[t.charCodeAt(0)];
}
const Zg = [
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
], Yg = Object.freeze({});
function Xg(t, e, n = Pu) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ot))
    r.set(S, Vg(e, S));
  let s, i = Array.isArray(t), o = [t], c = -1, d = [], l = t, E, g;
  const C = [], x = [];
  do {
    c++;
    const S = c === o.length, J = S && d.length !== 0;
    if (S) {
      if (E = x.length === 0 ? void 0 : C[C.length - 1], l = g, g = x.pop(), J)
        if (i) {
          l = l.slice();
          let j = 0;
          for (const [M, _] of d) {
            const L = M - j;
            _ === null ? (l.splice(L, 1), j++) : l[L] = _;
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
      if (E = i ? c : o[c], l = g[E], l == null)
        continue;
      C.push(E);
    }
    let O;
    if (!Array.isArray(l)) {
      var F, b;
      lc(l) || ys(!1, `Invalid AST Node: ${Yu(l)}.`);
      const j = S ? (F = r.get(l.kind)) === null || F === void 0 ? void 0 : F.leave : (b = r.get(l.kind)) === null || b === void 0 ? void 0 : b.enter;
      if (O = j == null ? void 0 : j.call(e, l, E, g, C, x), O === Yg)
        break;
      if (O === !1) {
        if (!S) {
          C.pop();
          continue;
        }
      } else if (O !== void 0 && (d.push([E, O]), !S))
        if (lc(O))
          l = O;
        else {
          C.pop();
          continue;
        }
    }
    if (O === void 0 && J && d.push([E, l]), S)
      C.pop();
    else {
      var v;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(l), o = i ? l : (v = n[l.kind]) !== null && v !== void 0 ? v : [], c = -1, d = [], g && x.push(g), g = l;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : t;
}
function Vg(t, e) {
  const n = t[e];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: t.enter,
    leave: t.leave
  };
}
function qu(t) {
  return Xg(t, qg);
}
const jg = 80, qg = {
  Name: {
    leave: (t) => t.value
  },
  Variable: {
    leave: (t) => "$" + t.name
  },
  // Document
  Document: {
    leave: (t) => et(t.definitions, `

`)
  },
  OperationDefinition: {
    leave(t) {
      const e = pt("(", et(t.variableDefinitions, ", "), ")"), n = et(
        [
          t.operation,
          et([t.name, e]),
          et(t.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + t.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: t, type: e, defaultValue: n, directives: r }) => t + ": " + e + pt(" = ", n) + pt(" ", et(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: t }) => Je(t)
  },
  Field: {
    leave({ alias: t, name: e, arguments: n, directives: r, selectionSet: s }) {
      const i = pt("", t, ": ") + e;
      let o = i + pt("(", et(n, ", "), ")");
      return o.length > jg && (o = i + pt(`(
`, Cs(et(n, `
`)), `
)`)), et([o, et(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: t, directives: e }) => "..." + t + pt(" ", et(e, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: t, directives: e, selectionSet: n }) => et(
      [
        "...",
        pt("on ", t),
        et(e, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: t, typeCondition: e, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${t}${pt("(", et(n, ", "), ")")} on ${e} ${pt("", et(r, " "), " ")}` + s
    )
  },
  // Value
  IntValue: {
    leave: ({ value: t }) => t
  },
  FloatValue: {
    leave: ({ value: t }) => t
  },
  StringValue: {
    leave: ({ value: t, block: e }) => e ? pg(t) : Gg(t)
  },
  BooleanValue: {
    leave: ({ value: t }) => t ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: t }) => t
  },
  ListValue: {
    leave: ({ values: t }) => "[" + et(t, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: t }) => "{" + et(t, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  // Directive
  Directive: {
    leave: ({ name: t, arguments: e }) => "@" + t + pt("(", et(e, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: t }) => t
  },
  ListType: {
    leave: ({ type: t }) => "[" + t + "]"
  },
  NonNullType: {
    leave: ({ type: t }) => t + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: t, directives: e, operationTypes: n }) => pt("", t, `
`) + et(["schema", et(e, " "), Je(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: t, type: e }) => t + ": " + e
  },
  ScalarTypeDefinition: {
    leave: ({ description: t, name: e, directives: n }) => pt("", t, `
`) + et(["scalar", e, et(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: n, directives: r, fields: s }) => pt("", t, `
`) + et(
      [
        "type",
        e,
        pt("implements ", et(n, " & ")),
        et(r, " "),
        Je(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: t, name: e, arguments: n, type: r, directives: s }) => pt("", t, `
`) + e + (gc(n) ? pt(`(
`, Cs(et(n, `
`)), `
)`) : pt("(", et(n, ", "), ")")) + ": " + r + pt(" ", et(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: t, name: e, type: n, defaultValue: r, directives: s }) => pt("", t, `
`) + et(
      [e + ": " + n, pt("= ", r), et(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: n, directives: r, fields: s }) => pt("", t, `
`) + et(
      [
        "interface",
        e,
        pt("implements ", et(n, " & ")),
        et(r, " "),
        Je(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: t, name: e, directives: n, types: r }) => pt("", t, `
`) + et(
      ["union", e, et(n, " "), pt("= ", et(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: t, name: e, directives: n, values: r }) => pt("", t, `
`) + et(["enum", e, et(n, " "), Je(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: t, name: e, directives: n }) => pt("", t, `
`) + et([e, et(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: t, name: e, directives: n, fields: r }) => pt("", t, `
`) + et(["input", e, et(n, " "), Je(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: t, name: e, arguments: n, repeatable: r, locations: s }) => pt("", t, `
`) + "directive @" + e + (gc(n) ? pt(`(
`, Cs(et(n, `
`)), `
)`) : pt("(", et(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + et(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: t, operationTypes: e }) => et(
      ["extend schema", et(t, " "), Je(e)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: t, directives: e }) => et(["extend scalar", t, et(e, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: n, fields: r }) => et(
      [
        "extend type",
        t,
        pt("implements ", et(e, " & ")),
        et(n, " "),
        Je(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: n, fields: r }) => et(
      [
        "extend interface",
        t,
        pt("implements ", et(e, " & ")),
        et(n, " "),
        Je(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: t, directives: e, types: n }) => et(
      [
        "extend union",
        t,
        et(e, " "),
        pt("= ", et(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: t, directives: e, values: n }) => et(["extend enum", t, et(e, " "), Je(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: t, directives: e, fields: n }) => et(["extend input", t, et(e, " "), Je(n)], " ")
  }
};
function et(t, e = "") {
  var n;
  return (n = t == null ? void 0 : t.filter((r) => r).join(e)) !== null && n !== void 0 ? n : "";
}
function Je(t) {
  return pt(`{
`, Cs(et(t, `
`)), `
}`);
}
function pt(t, e, n = "") {
  return e != null && e !== "" ? t + e + n : "";
}
function Cs(t) {
  return pt("  ", t.replace(/\n/g, `
  `));
}
function gc(t) {
  var e;
  return (e = t == null ? void 0 : t.some((n) => n.includes(`
`))) !== null && e !== void 0 ? e : !1;
}
const $g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: qu
}, Symbol.toStringTag, { value: "Module" })), Wg = /* @__PURE__ */ Mo($g);
var Xo = {}, ei = {}, $u = function(e) {
  var n = e.uri, r = e.name, s = e.type;
  this.uri = n, this.name = r, this.type = s;
}, zg = $u, Wu = function(e) {
  return typeof File < "u" && e instanceof File || typeof Blob < "u" && e instanceof Blob || e instanceof zg;
}, Kg = Wu, tp = function t(e, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = Kg);
  var s, i = /* @__PURE__ */ new Map();
  function o(E, g) {
    var C = i.get(g);
    C ? C.push.apply(C, E) : i.set(g, E);
  }
  if (r(e))
    s = null, o([n], e);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && e instanceof FileList)
      s = Array.prototype.map.call(e, function(E, g) {
        return o(["" + c + g], E), null;
      });
    else if (Array.isArray(e))
      s = e.map(function(E, g) {
        var C = t(E, "" + c + g, r);
        return C.files.forEach(o), C.clone;
      });
    else if (e && e.constructor === Object) {
      s = {};
      for (var d in e) {
        var l = t(e[d], "" + c + d, r);
        l.files.forEach(o), s[d] = l.clone;
      }
    } else
      s = e;
  }
  return {
    clone: s,
    files: i
  };
};
ei.ReactNativeFile = $u;
ei.extractFiles = tp;
ei.isExtractableFile = Wu;
var ep = typeof self == "object" ? self.FormData : window.FormData, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.defaultJsonSerializer = void 0;
Wr.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var np = wt && wt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Xo, "__esModule", { value: !0 });
var zu = ei, rp = np(ep), sp = Wr, ip = function(t) {
  return zu.isExtractableFile(t) || t !== null && typeof t == "object" && typeof t.pipe == "function";
};
function op(t, e, n, r) {
  r === void 0 && (r = sp.defaultJsonSerializer);
  var s = zu.extractFiles({ query: t, variables: e, operationName: n }, "", ip), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(t))
      return r.stringify(i);
    if (typeof e < "u" && !Array.isArray(e))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = t.reduce(function(C, x, F) {
      return C.push({ query: x, variables: e ? e[F] : void 0 }), C;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? rp.default : FormData, l = new d();
  l.append("operations", r.stringify(i));
  var E = {}, g = 0;
  return o.forEach(function(C) {
    E[++g] = C;
  }), l.append("map", r.stringify(E)), g = 0, o.forEach(function(C, x) {
    l.append("" + ++g, x);
  }), l;
}
Xo.default = op;
var xe = {};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.parseBatchRequestsExtendedArgs = xe.parseRawRequestExtendedArgs = xe.parseRequestExtendedArgs = xe.parseBatchRequestArgs = xe.parseRawRequestArgs = xe.parseRequestArgs = void 0;
function ap(t, e, n) {
  return t.document ? t : {
    document: t,
    variables: e,
    requestHeaders: n,
    signal: void 0
  };
}
xe.parseRequestArgs = ap;
function cp(t, e, n) {
  return t.query ? t : {
    query: t,
    variables: e,
    requestHeaders: n,
    signal: void 0
  };
}
xe.parseRawRequestArgs = cp;
function Ap(t, e) {
  return t.documents ? t : {
    documents: t,
    requestHeaders: e,
    signal: void 0
  };
}
xe.parseBatchRequestArgs = Ap;
function up(t, e, n, r) {
  return t.document ? t : {
    url: t,
    document: e,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
xe.parseRequestExtendedArgs = up;
function dp(t, e, n, r) {
  return t.query ? t : {
    url: t,
    query: e,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
xe.parseRawRequestExtendedArgs = dp;
function hp(t, e, n) {
  return t.documents ? t : {
    url: t,
    documents: e,
    requestHeaders: n,
    signal: void 0
  };
}
xe.parseBatchRequestsExtendedArgs = hp;
var zr = {}, lp = wt && wt.__extends || function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, s) {
      r.__proto__ = s;
    } || function(r, s) {
      for (var i in s)
        Object.prototype.hasOwnProperty.call(s, i) && (r[i] = s[i]);
    }, t(e, n);
  };
  return function(e, n) {
    if (typeof n != "function" && n !== null)
      throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    t(e, n);
    function r() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.ClientError = void 0;
var fp = (
  /** @class */
  function(t) {
    lp(e, t);
    function e(n, r) {
      var s = this, i = e.extractMessage(n) + ": " + JSON.stringify({
        response: n,
        request: r
      });
      return s = t.call(this, i) || this, Object.setPrototypeOf(s, e.prototype), s.response = n, s.request = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(s, e), s;
    }
    return e.extractMessage = function(n) {
      try {
        return n.errors[0].message;
      } catch {
        return "GraphQL Error (Code: " + n.status + ")";
      }
    }, e;
  }(Error)
);
zr.ClientError = fp;
var br = {}, pc;
function gp() {
  if (pc)
    return br;
  pc = 1;
  var t = wt && wt.__assign || function() {
    return t = Object.assign || function(M) {
      for (var _, L = 1, P = arguments.length; L < P; L++) {
        _ = arguments[L];
        for (var $ in _)
          Object.prototype.hasOwnProperty.call(_, $) && (M[$] = _[$]);
      }
      return M;
    }, t.apply(this, arguments);
  }, e = wt && wt.__awaiter || function(M, _, L, P) {
    function $(U) {
      return U instanceof L ? U : new L(function(H) {
        H(U);
      });
    }
    return new (L || (L = Promise))(function(U, H) {
      function tt(A) {
        try {
          a(P.next(A));
        } catch (h) {
          H(h);
        }
      }
      function y(A) {
        try {
          a(P.throw(A));
        } catch (h) {
          H(h);
        }
      }
      function a(A) {
        A.done ? U(A.value) : $(A.value).then(tt, y);
      }
      a((P = P.apply(M, _ || [])).next());
    });
  }, n = wt && wt.__generator || function(M, _) {
    var L = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, $, U, H;
    return H = { next: tt(0), throw: tt(1), return: tt(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
      return this;
    }), H;
    function tt(a) {
      return function(A) {
        return y([a, A]);
      };
    }
    function y(a) {
      if (P)
        throw new TypeError("Generator is already executing.");
      for (; L; )
        try {
          if (P = 1, $ && (U = a[0] & 2 ? $.return : a[0] ? $.throw || ((U = $.return) && U.call($), 0) : $.next) && !(U = U.call($, a[1])).done)
            return U;
          switch ($ = 0, U && (a = [a[0] & 2, U.value]), a[0]) {
            case 0:
            case 1:
              U = a;
              break;
            case 4:
              return L.label++, { value: a[1], done: !1 };
            case 5:
              L.label++, $ = a[1], a = [0];
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
          a = _.call(M, L);
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
  Object.defineProperty(br, "__esModule", { value: !0 }), br.GraphQLWebSocketClient = void 0;
  var r = zr, s = Ku(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", l = "subscribe", E = "next", g = "error", C = "complete", x = (
    /** @class */
    function() {
      function M(_, L, P) {
        this._type = _, this._payload = L, this._id = P;
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
          var _ = { type: this.type };
          return this.id != null && this.id != null && (_.id = this.id), this.payload != null && this.payload != null && (_.payload = this.payload), JSON.stringify(_);
        },
        enumerable: !1,
        configurable: !0
      }), M.parse = function(_, L) {
        var P = JSON.parse(_), $ = P.type, U = P.payload, H = P.id;
        return new M($, L(U), H);
      }, M;
    }()
  ), F = (
    /** @class */
    function() {
      function M(_, L) {
        var P = this, $ = L.onInit, U = L.onAcknowledged, H = L.onPing, tt = L.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = _, _.onopen = function(y) {
          return e(P, void 0, void 0, function() {
            var a, A, h, m;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = _).send, h = v, $ ? [4, $()] : [3, 2];
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
        }, _.onclose = function(y) {
          P.socketState.acknowledged = !1, P.socketState.subscriptions = {};
        }, _.onerror = function(y) {
          console.error(y);
        }, _.onmessage = function(y) {
          try {
            var a = b(y.data);
            switch (a.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, U && U(a.payload));
                return;
              }
              case c: {
                H ? H(a.payload).then(function(w) {
                  return _.send(J(w).text);
                }) : _.send(J(null).text);
                return;
              }
              case d: {
                tt && tt(a.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || a.id === void 0 || a.id === null || !P.socketState.subscriptions[a.id])
              return;
            var A = P.socketState.subscriptions[a.id], h = A.query, m = A.variables, f = A.subscriber;
            switch (a.type) {
              case E: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(t(t({}, a.payload), { status: 200 }), { query: h, variables: m }));
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
            console.error(w), _.close(1006);
          }
          _.close(4400, "Unknown graphql-ws message.");
        };
      }
      return M.prototype.makeSubscribe = function(_, L, P, $) {
        var U = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: _, variables: P, subscriber: $ }, this.socket.send(O(H, { query: _, operationName: L, variables: P }).text), function() {
          U.socket.send(j(H).text), delete U.socketState.subscriptions[H];
        };
      }, M.prototype.rawRequest = function(_, L) {
        var P = this;
        return new Promise(function($, U) {
          var H;
          P.rawSubscribe(_, {
            next: function(tt, y) {
              return H = { data: tt, extensions: y };
            },
            error: U,
            complete: function() {
              return $(H);
            }
          }, L);
        });
      }, M.prototype.request = function(_, L) {
        var P = this;
        return new Promise(function($, U) {
          var H;
          P.subscribe(_, {
            next: function(tt) {
              return H = tt;
            },
            error: U,
            complete: function() {
              return $(H);
            }
          }, L);
        });
      }, M.prototype.subscribe = function(_, L, P) {
        var $ = s.resolveRequestDocument(_), U = $.query, H = $.operationName;
        return this.makeSubscribe(U, H, P, L);
      }, M.prototype.rawSubscribe = function(_, L, P) {
        return this.makeSubscribe(_, void 0, P, L);
      }, M.prototype.ping = function(_) {
        this.socket.send(S(_).text);
      }, M.prototype.close = function() {
        this.socket.close(1e3);
      }, M.PROTOCOL = "graphql-transport-ws", M;
    }()
  );
  br.GraphQLWebSocketClient = F;
  function b(M, _) {
    _ === void 0 && (_ = function(P) {
      return P;
    });
    var L = x.parse(M, _);
    return L;
  }
  function v(M) {
    return new x(i, M);
  }
  function S(M) {
    return new x(c, M, void 0);
  }
  function J(M) {
    return new x(d, M, void 0);
  }
  function O(M, _) {
    return new x(l, _, M);
  }
  function j(M) {
    return new x(C, void 0, M);
  }
  return br;
}
var mc;
function Ku() {
  return mc || (mc = 1, function(t) {
    var e = wt && wt.__assign || function() {
      return e = Object.assign || function(f) {
        for (var w, B = 1, p = arguments.length; B < p; B++) {
          w = arguments[B];
          for (var u in w)
            Object.prototype.hasOwnProperty.call(w, u) && (f[u] = w[u]);
        }
        return f;
      }, e.apply(this, arguments);
    }, n = wt && wt.__createBinding || (Object.create ? function(f, w, B, p) {
      p === void 0 && (p = B), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return w[B];
      } });
    } : function(f, w, B, p) {
      p === void 0 && (p = B), f[p] = w[B];
    }), r = wt && wt.__setModuleDefault || (Object.create ? function(f, w) {
      Object.defineProperty(f, "default", { enumerable: !0, value: w });
    } : function(f, w) {
      f.default = w;
    }), s = wt && wt.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var w = {};
      if (f != null)
        for (var B in f)
          B !== "default" && Object.prototype.hasOwnProperty.call(f, B) && n(w, f, B);
      return r(w, f), w;
    }, i = wt && wt.__awaiter || function(f, w, B, p) {
      function u(I) {
        return I instanceof B ? I : new B(function(Z) {
          Z(I);
        });
      }
      return new (B || (B = Promise))(function(I, Z) {
        function X(nt) {
          try {
            q(p.next(nt));
          } catch (rt) {
            Z(rt);
          }
        }
        function z(nt) {
          try {
            q(p.throw(nt));
          } catch (rt) {
            Z(rt);
          }
        }
        function q(nt) {
          nt.done ? I(nt.value) : u(nt.value).then(X, z);
        }
        q((p = p.apply(f, w || [])).next());
      });
    }, o = wt && wt.__generator || function(f, w) {
      var B = { label: 0, sent: function() {
        if (I[0] & 1)
          throw I[1];
        return I[1];
      }, trys: [], ops: [] }, p, u, I, Z;
      return Z = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
        return this;
      }), Z;
      function X(q) {
        return function(nt) {
          return z([q, nt]);
        };
      }
      function z(q) {
        if (p)
          throw new TypeError("Generator is already executing.");
        for (; B; )
          try {
            if (p = 1, u && (I = q[0] & 2 ? u.return : q[0] ? u.throw || ((I = u.return) && I.call(u), 0) : u.next) && !(I = I.call(u, q[1])).done)
              return I;
            switch (u = 0, I && (q = [q[0] & 2, I.value]), q[0]) {
              case 0:
              case 1:
                I = q;
                break;
              case 4:
                return B.label++, { value: q[1], done: !1 };
              case 5:
                B.label++, u = q[1], q = [0];
                continue;
              case 7:
                q = B.ops.pop(), B.trys.pop();
                continue;
              default:
                if (I = B.trys, !(I = I.length > 0 && I[I.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  B = 0;
                  continue;
                }
                if (q[0] === 3 && (!I || q[1] > I[0] && q[1] < I[3])) {
                  B.label = q[1];
                  break;
                }
                if (q[0] === 6 && B.label < I[1]) {
                  B.label = I[1], I = q;
                  break;
                }
                if (I && B.label < I[2]) {
                  B.label = I[2], B.ops.push(q);
                  break;
                }
                I[2] && B.ops.pop(), B.trys.pop();
                continue;
            }
            q = w.call(f, B);
          } catch (nt) {
            q = [6, nt], u = 0;
          } finally {
            p = I = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, c = wt && wt.__rest || function(f, w) {
      var B = {};
      for (var p in f)
        Object.prototype.hasOwnProperty.call(f, p) && w.indexOf(p) < 0 && (B[p] = f[p]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, p = Object.getOwnPropertySymbols(f); u < p.length; u++)
          w.indexOf(p[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, p[u]) && (B[p[u]] = f[p[u]]);
      return B;
    }, d = wt && wt.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.GraphQLWebSocketClient = t.gql = t.resolveRequestDocument = t.batchRequests = t.request = t.rawRequest = t.GraphQLClient = t.ClientError = void 0;
    var l = s(ig), E = l, g = Ug, C = Wg, x = d(Xo), F = Wr, b = xe, v = zr;
    Object.defineProperty(t, "ClientError", { enumerable: !0, get: function() {
      return v.ClientError;
    } });
    var S = function(f) {
      var w = {};
      return f && (typeof Headers < "u" && f instanceof Headers || E && E.Headers && f instanceof E.Headers ? w = h(f) : Array.isArray(f) ? f.forEach(function(B) {
        var p = B[0], u = B[1];
        w[p] = u;
      }) : w = f), w;
    }, J = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, O = function(f) {
      var w = f.query, B = f.variables, p = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(w)) {
        var I = ["query=" + encodeURIComponent(J(w))];
        return B && I.push("variables=" + encodeURIComponent(u.stringify(B))), p && I.push("operationName=" + encodeURIComponent(p)), I.join("&");
      }
      if (typeof B < "u" && !Array.isArray(B))
        throw new Error("Cannot create query with given variable type, array expected");
      var Z = w.reduce(function(X, z, q) {
        return X.push({
          query: J(z),
          variables: B ? u.stringify(B[q]) : void 0
        }), X;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Z));
    }, j = function(f) {
      var w = f.url, B = f.query, p = f.variables, u = f.operationName, I = f.headers, Z = f.fetch, X = f.fetchOptions, z = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, nt;
        return o(this, function(rt) {
          switch (rt.label) {
            case 0:
              return q = x.default(B, p, u, X.jsonSerializer), nt = e({ method: "POST", headers: e(e({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), I), body: q }, X), z ? [4, Promise.resolve(z(nt))] : [3, 2];
            case 1:
              nt = rt.sent(), rt.label = 2;
            case 2:
              return [4, Z(w, nt)];
            case 3:
              return [2, rt.sent()];
          }
        });
      });
    }, M = function(f) {
      var w = f.url, B = f.query, p = f.variables, u = f.operationName, I = f.headers, Z = f.fetch, X = f.fetchOptions, z = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, nt;
        return o(this, function(rt) {
          switch (rt.label) {
            case 0:
              return q = O({
                query: B,
                variables: p,
                operationName: u,
                jsonSerializer: X.jsonSerializer
              }), nt = e({ method: "GET", headers: I }, X), z ? [4, Promise.resolve(z(nt))] : [3, 2];
            case 1:
              nt = rt.sent(), rt.label = 2;
            case 2:
              return [4, Z(w + "?" + q, nt)];
            case 3:
              return [2, rt.sent()];
          }
        });
      });
    }, _ = (
      /** @class */
      function() {
        function f(w, B) {
          B === void 0 && (B = {}), this.url = w, this.options = B;
        }
        return f.prototype.rawRequest = function(w, B, p) {
          return i(this, void 0, void 0, function() {
            var u, I, Z, X, z, q, nt, rt, Rt, ft, it, Nt;
            return o(this, function(ht) {
              return u = b.parseRawRequestArgs(w, B, p), I = this.options, Z = I.headers, X = I.fetch, z = X === void 0 ? l.default : X, q = I.method, nt = q === void 0 ? "POST" : q, rt = I.requestMiddleware, Rt = I.responseMiddleware, ft = c(I, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), it = this.url, u.signal !== void 0 && (ft.signal = u.signal), Nt = y(u.query).operationName, [2, L({
                url: it,
                query: u.query,
                variables: u.variables,
                headers: e(e({}, S(a(Z))), S(u.requestHeaders)),
                operationName: Nt,
                fetch: z,
                method: nt,
                fetchOptions: ft,
                middleware: rt
              }).then(function(gt) {
                return Rt && Rt(gt), gt;
              }).catch(function(gt) {
                throw Rt && Rt(gt), gt;
              })];
            });
          });
        }, f.prototype.request = function(w) {
          for (var B = [], p = 1; p < arguments.length; p++)
            B[p - 1] = arguments[p];
          var u = B[0], I = B[1], Z = b.parseRequestArgs(w, u, I), X = this.options, z = X.headers, q = X.fetch, nt = q === void 0 ? l.default : q, rt = X.method, Rt = rt === void 0 ? "POST" : rt, ft = X.requestMiddleware, it = X.responseMiddleware, Nt = c(X, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ht = this.url;
          Z.signal !== void 0 && (Nt.signal = Z.signal);
          var gt = y(Z.document), Ve = gt.query, St = gt.operationName;
          return L({
            url: ht,
            query: Ve,
            variables: Z.variables,
            headers: e(e({}, S(a(z))), S(Z.requestHeaders)),
            operationName: St,
            fetch: nt,
            method: Rt,
            fetchOptions: Nt,
            middleware: ft
          }).then(function(Bt) {
            return it && it(Bt), Bt.data;
          }).catch(function(Bt) {
            throw it && it(Bt), Bt;
          });
        }, f.prototype.batchRequests = function(w, B) {
          var p = b.parseBatchRequestArgs(w, B), u = this.options, I = u.headers, Z = u.fetch, X = Z === void 0 ? l.default : Z, z = u.method, q = z === void 0 ? "POST" : z, nt = u.requestMiddleware, rt = u.responseMiddleware, Rt = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ft = this.url;
          p.signal !== void 0 && (Rt.signal = p.signal);
          var it = p.documents.map(function(ht) {
            var gt = ht.document;
            return y(gt).query;
          }), Nt = p.documents.map(function(ht) {
            var gt = ht.variables;
            return gt;
          });
          return L({
            url: ft,
            query: it,
            variables: Nt,
            headers: e(e({}, S(a(I))), S(p.requestHeaders)),
            operationName: void 0,
            fetch: X,
            method: q,
            fetchOptions: Rt,
            middleware: nt
          }).then(function(ht) {
            return rt && rt(ht), ht.data;
          }).catch(function(ht) {
            throw rt && rt(ht), ht;
          });
        }, f.prototype.setHeaders = function(w) {
          return this.options.headers = w, this;
        }, f.prototype.setHeader = function(w, B) {
          var p, u = this.options.headers;
          return u ? u[w] = B : this.options.headers = (p = {}, p[w] = B, p), this;
        }, f.prototype.setEndpoint = function(w) {
          return this.url = w, this;
        }, f;
      }()
    );
    t.GraphQLClient = _;
    function L(f) {
      var w = f.url, B = f.query, p = f.variables, u = f.headers, I = f.operationName, Z = f.fetch, X = f.method, z = X === void 0 ? "POST" : X, q = f.fetchOptions, nt = f.middleware;
      return i(this, void 0, void 0, function() {
        var rt, Rt, ft, it, Nt, ht, gt, Ve, St, Bt, Br;
        return o(this, function(_t) {
          switch (_t.label) {
            case 0:
              return rt = z.toUpperCase() === "POST" ? j : M, Rt = Array.isArray(B), [4, rt({
                url: w,
                query: B,
                variables: p,
                operationName: I,
                headers: u,
                fetch: Z,
                fetchOptions: q,
                middleware: nt
              })];
            case 1:
              return ft = _t.sent(), [4, H(ft, q.jsonSerializer)];
            case 2:
              if (it = _t.sent(), Nt = Rt && Array.isArray(it) ? !it.some(function(Tt) {
                var rs = Tt.data;
                return !rs;
              }) : !!it.data, ht = !it.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", ft.ok && ht && Nt)
                return gt = ft.headers, Ve = ft.status, it.errors, St = c(it, ["errors"]), Bt = q.errorPolicy === "ignore" ? St : it, [2, e(e({}, Rt ? { data: Bt } : Bt), { headers: gt, status: Ve })];
              throw Br = typeof it == "string" ? { error: it } : it, new v.ClientError(e(e({}, Br), { status: ft.status, headers: ft.headers }), { query: B, variables: p });
          }
        });
      });
    }
    function P(f, w, B, p) {
      return i(this, void 0, void 0, function() {
        var u, I;
        return o(this, function(Z) {
          return u = b.parseRawRequestExtendedArgs(f, w, B, p), I = new _(u.url), [2, I.rawRequest(e({}, u))];
        });
      });
    }
    t.rawRequest = P;
    function $(f, w) {
      for (var B = [], p = 2; p < arguments.length; p++)
        B[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var u, I, Z, X;
        return o(this, function(z) {
          return u = B[0], I = B[1], Z = b.parseRequestExtendedArgs(f, w, u, I), X = new _(Z.url), [2, X.request(e({}, Z))];
        });
      });
    }
    t.request = $;
    function U(f, w, B) {
      return i(this, void 0, void 0, function() {
        var p, u;
        return o(this, function(I) {
          return p = b.parseBatchRequestsExtendedArgs(f, w, B), u = new _(p.url), [2, u.batchRequests(e({}, p))];
        });
      });
    }
    t.batchRequests = U, t.default = $;
    function H(f, w) {
      return w === void 0 && (w = F.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var B, p, u;
        return o(this, function(I) {
          switch (I.label) {
            case 0:
              return f.headers.forEach(function(Z, X) {
                X.toLowerCase() === "content-type" && (B = Z);
              }), B && B.toLowerCase().startsWith("application/json") ? (u = (p = w).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(p, [I.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function tt(f) {
      var w, B = void 0, p = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return p.length === 1 && (B = (w = p[0].name) === null || w === void 0 ? void 0 : w.value), B;
    }
    function y(f) {
      if (typeof f == "string") {
        var w = void 0;
        try {
          var B = g.parse(f);
          w = tt(B);
        } catch {
        }
        return { query: f, operationName: w };
      }
      var p = tt(f);
      return { query: C.print(f), operationName: p };
    }
    t.resolveRequestDocument = y;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var w = [], B = 1; B < arguments.length; B++)
        w[B - 1] = arguments[B];
      return f.reduce(function(p, u, I) {
        return "" + p + u + (I in w ? w[I] : "");
      }, "");
    }
    t.gql = A;
    function h(f) {
      var w = {};
      return f.forEach(function(B, p) {
        w[p] = B;
      }), w;
    }
    var m = gp();
    Object.defineProperty(t, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(Ri)), Ri;
}
var pp = Ku();
function mp(t) {
  return t != null && typeof t == "object" && t["@@functional/placeholder"] === !0;
}
function t0(t) {
  return function e(n) {
    return arguments.length === 0 || mp(n) ? e : t.apply(this, arguments);
  };
}
var Ip = /* @__PURE__ */ t0(function(e) {
  return e === null ? "Null" : e === void 0 ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1);
});
function wp(t) {
  return new RegExp(t.source, t.flags ? t.flags : (t.global ? "g" : "") + (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.sticky ? "y" : "") + (t.unicode ? "u" : "") + (t.dotAll ? "s" : ""));
}
function e0(t, e, n) {
  if (n || (n = new Bp()), Ep(t))
    return t;
  var r = function(i) {
    var o = n.get(t);
    if (o)
      return o;
    n.set(t, i);
    for (var c in t)
      Object.prototype.hasOwnProperty.call(t, c) && (i[c] = e ? e0(t[c], !0, n) : t[c]);
    return i;
  };
  switch (Ip(t)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(t)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(t.valueOf());
    case "RegExp":
      return wp(t);
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
      return t.slice();
    default:
      return t;
  }
}
function Ep(t) {
  var e = typeof t;
  return t == null || e != "object" && e != "function";
}
var Bp = /* @__PURE__ */ function() {
  function t() {
    this.map = {}, this.length = 0;
  }
  return t.prototype.set = function(e, n) {
    const r = this.hash(e);
    let s = this.map[r];
    s || (this.map[r] = s = []), s.push([e, n]), this.length += 1;
  }, t.prototype.hash = function(e) {
    let n = [];
    for (var r in e)
      n.push(Object.prototype.toString.call(e[r]));
    return n.join();
  }, t.prototype.get = function(e) {
    if (this.length <= 180) {
      for (const s in this.map) {
        const i = this.map[s];
        for (let o = 0; o < i.length; o += 1) {
          const c = i[o];
          if (c[0] === e)
            return c[1];
        }
      }
      return;
    }
    const n = this.hash(e), r = this.map[n];
    if (r)
      for (let s = 0; s < r.length; s += 1) {
        const i = r[s];
        if (i[0] === e)
          return i[1];
      }
  }, t;
}(), yp = /* @__PURE__ */ t0(function(e) {
  return e != null && typeof e.clone == "function" ? e.clone() : e0(e, !0);
});
const Ur = yp;
var Ls = function() {
  return Ls = Object.assign || function(e) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, Ls.apply(this, arguments);
};
var bs = /* @__PURE__ */ new Map(), uo = /* @__PURE__ */ new Map(), n0 = !0, Ts = !1;
function r0(t) {
  return t.replace(/[\s,]+/g, " ").trim();
}
function Cp(t) {
  return r0(t.source.body.substring(t.start, t.end));
}
function bp(t) {
  var e = /* @__PURE__ */ new Set(), n = [];
  return t.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Cp(r.loc), o = uo.get(s);
      o && !o.has(i) ? n0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || uo.set(s, o = /* @__PURE__ */ new Set()), o.add(i), e.has(i) || (e.add(i), n.push(r));
    } else
      n.push(r);
  }), Ls(Ls({}, t), { definitions: n });
}
function Qp(t) {
  var e = new Set(t.definitions);
  e.forEach(function(r) {
    r.loc && delete r.loc, Object.keys(r).forEach(function(s) {
      var i = r[s];
      i && typeof i == "object" && e.add(i);
    });
  });
  var n = t.loc;
  return n && (delete n.startToken, delete n.endToken), t;
}
function xp(t) {
  var e = r0(t);
  if (!bs.has(e)) {
    var n = Vu(t, {
      experimentalFragmentVariables: Ts,
      allowLegacyFragmentVariables: Ts
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    bs.set(e, Qp(bp(n)));
  }
  return bs.get(e);
}
function ar(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  typeof t == "string" && (t = [t]);
  var r = t[0];
  return e.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += t[i + 1];
  }), xp(r);
}
function Fp() {
  bs.clear(), uo.clear();
}
function vp() {
  n0 = !1;
}
function Dp() {
  Ts = !0;
}
function Np() {
  Ts = !1;
}
var Qr = {
  gql: ar,
  resetCaches: Fp,
  disableFragmentWarnings: vp,
  enableExperimentalFragmentVariables: Dp,
  disableExperimentalFragmentVariables: Np
};
(function(t) {
  t.gql = Qr.gql, t.resetCaches = Qr.resetCaches, t.disableFragmentWarnings = Qr.disableFragmentWarnings, t.enableExperimentalFragmentVariables = Qr.enableExperimentalFragmentVariables, t.disableExperimentalFragmentVariables = Qr.disableExperimentalFragmentVariables;
})(ar || (ar = {}));
ar.default = ar;
const at = ar;
function Sp(t) {
  return Mt(Bn(t, "utf-8"));
}
function Rp(t) {
  const e = BigInt(t), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, e, !1), new Uint8Array(r.buffer);
}
function s0(t) {
  return Mt(t);
}
var i0 = {}, Vo = {}, _p = vt, Oe = null;
try {
  Oe = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
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
function vt(t, e, n) {
  this.low = t | 0, this.high = e | 0, this.unsigned = !!n;
}
vt.prototype.__isLong__;
Object.defineProperty(vt.prototype, "__isLong__", { value: !0 });
function ve(t) {
  return (t && t.__isLong__) === !0;
}
vt.isLong = ve;
var Ic = {}, wc = {};
function Pn(t, e) {
  var n, r, s;
  return e ? (t >>>= 0, (s = 0 <= t && t < 256) && (r = wc[t], r) ? r : (n = Dt(t, (t | 0) < 0 ? -1 : 0, !0), s && (wc[t] = n), n)) : (t |= 0, (s = -128 <= t && t < 128) && (r = Ic[t], r) ? r : (n = Dt(t, t < 0 ? -1 : 0, !1), s && (Ic[t] = n), n));
}
vt.fromInt = Pn;
function Pe(t, e) {
  if (isNaN(t))
    return e ? Rn : Ue;
  if (e) {
    if (t < 0)
      return Rn;
    if (t >= o0)
      return A0;
  } else {
    if (t <= -Bc)
      return Fe;
    if (t + 1 >= Bc)
      return c0;
  }
  return t < 0 ? Pe(-t, e).neg() : Dt(t % cr | 0, t / cr | 0, e);
}
vt.fromNumber = Pe;
function Dt(t, e, n) {
  return new vt(t, e, n);
}
vt.fromBits = Dt;
var Os = Math.pow;
function jo(t, e, n) {
  if (t.length === 0)
    throw Error("empty string");
  if (t === "NaN" || t === "Infinity" || t === "+Infinity" || t === "-Infinity")
    return Ue;
  if (typeof e == "number" ? (n = e, e = !1) : e = !!e, n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var r;
  if ((r = t.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (r === 0)
    return jo(t.substring(1), e, n).neg();
  for (var s = Pe(Os(n, 8)), i = Ue, o = 0; o < t.length; o += 8) {
    var c = Math.min(8, t.length - o), d = parseInt(t.substring(o, o + c), n);
    if (c < 8) {
      var l = Pe(Os(n, c));
      i = i.mul(l).add(Pe(d));
    } else
      i = i.mul(s), i = i.add(Pe(d));
  }
  return i.unsigned = e, i;
}
vt.fromString = jo;
function Xe(t, e) {
  return typeof t == "number" ? Pe(t, e) : typeof t == "string" ? jo(t, e) : Dt(t.low, t.high, typeof e == "boolean" ? e : t.unsigned);
}
vt.fromValue = Xe;
var Ec = 65536, kp = 1 << 24, cr = Ec * Ec, o0 = cr * cr, Bc = o0 / 2, yc = Pn(kp), Ue = Pn(0);
vt.ZERO = Ue;
var Rn = Pn(0, !0);
vt.UZERO = Rn;
var Xn = Pn(1);
vt.ONE = Xn;
var a0 = Pn(1, !0);
vt.UONE = a0;
var ho = Pn(-1);
vt.NEG_ONE = ho;
var c0 = Dt(-1, 2147483647, !1);
vt.MAX_VALUE = c0;
var A0 = Dt(-1, -1, !0);
vt.MAX_UNSIGNED_VALUE = A0;
var Fe = Dt(0, -2147483648, !1);
vt.MIN_VALUE = Fe;
var W = vt.prototype;
W.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
W.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * cr + (this.low >>> 0) : this.high * cr + (this.low >>> 0);
};
W.toString = function(e) {
  if (e = e || 10, e < 2 || 36 < e)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(Fe)) {
      var n = Pe(e), r = this.div(n), s = r.mul(n).sub(this);
      return r.toString(e) + s.toInt().toString(e);
    } else
      return "-" + this.neg().toString(e);
  for (var i = Pe(Os(e, 6), this.unsigned), o = this, c = ""; ; ) {
    var d = o.div(i), l = o.sub(d.mul(i)).toInt() >>> 0, E = l.toString(e);
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
    return this.eq(Fe) ? 64 : this.neg().getNumBitsAbs();
  for (var e = this.high != 0 ? this.high : this.low, n = 31; n > 0 && !(e & 1 << n); n--)
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
W.equals = function(e) {
  return ve(e) || (e = Xe(e)), this.unsigned !== e.unsigned && this.high >>> 31 === 1 && e.high >>> 31 === 1 ? !1 : this.high === e.high && this.low === e.low;
};
W.eq = W.equals;
W.notEquals = function(e) {
  return !this.eq(
    /* validates */
    e
  );
};
W.neq = W.notEquals;
W.ne = W.notEquals;
W.lessThan = function(e) {
  return this.comp(
    /* validates */
    e
  ) < 0;
};
W.lt = W.lessThan;
W.lessThanOrEqual = function(e) {
  return this.comp(
    /* validates */
    e
  ) <= 0;
};
W.lte = W.lessThanOrEqual;
W.le = W.lessThanOrEqual;
W.greaterThan = function(e) {
  return this.comp(
    /* validates */
    e
  ) > 0;
};
W.gt = W.greaterThan;
W.greaterThanOrEqual = function(e) {
  return this.comp(
    /* validates */
    e
  ) >= 0;
};
W.gte = W.greaterThanOrEqual;
W.ge = W.greaterThanOrEqual;
W.compare = function(e) {
  if (ve(e) || (e = Xe(e)), this.eq(e))
    return 0;
  var n = this.isNegative(), r = e.isNegative();
  return n && !r ? -1 : !n && r ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1;
};
W.comp = W.compare;
W.negate = function() {
  return !this.unsigned && this.eq(Fe) ? Fe : this.not().add(Xn);
};
W.neg = W.negate;
W.add = function(e) {
  ve(e) || (e = Xe(e));
  var n = this.high >>> 16, r = this.high & 65535, s = this.low >>> 16, i = this.low & 65535, o = e.high >>> 16, c = e.high & 65535, d = e.low >>> 16, l = e.low & 65535, E = 0, g = 0, C = 0, x = 0;
  return x += i + l, C += x >>> 16, x &= 65535, C += s + d, g += C >>> 16, C &= 65535, g += r + c, E += g >>> 16, g &= 65535, E += n + o, E &= 65535, Dt(C << 16 | x, E << 16 | g, this.unsigned);
};
W.subtract = function(e) {
  return ve(e) || (e = Xe(e)), this.add(e.neg());
};
W.sub = W.subtract;
W.multiply = function(e) {
  if (this.isZero())
    return Ue;
  if (ve(e) || (e = Xe(e)), Oe) {
    var n = Oe.mul(
      this.low,
      this.high,
      e.low,
      e.high
    );
    return Dt(n, Oe.get_high(), this.unsigned);
  }
  if (e.isZero())
    return Ue;
  if (this.eq(Fe))
    return e.isOdd() ? Fe : Ue;
  if (e.eq(Fe))
    return this.isOdd() ? Fe : Ue;
  if (this.isNegative())
    return e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg();
  if (e.isNegative())
    return this.mul(e.neg()).neg();
  if (this.lt(yc) && e.lt(yc))
    return Pe(this.toNumber() * e.toNumber(), this.unsigned);
  var r = this.high >>> 16, s = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, c = e.high >>> 16, d = e.high & 65535, l = e.low >>> 16, E = e.low & 65535, g = 0, C = 0, x = 0, F = 0;
  return F += o * E, x += F >>> 16, F &= 65535, x += i * E, C += x >>> 16, x &= 65535, x += o * l, C += x >>> 16, x &= 65535, C += s * E, g += C >>> 16, C &= 65535, C += i * l, g += C >>> 16, C &= 65535, C += o * d, g += C >>> 16, C &= 65535, g += r * E + s * l + i * d + o * c, g &= 65535, Dt(x << 16 | F, g << 16 | C, this.unsigned);
};
W.mul = W.multiply;
W.divide = function(e) {
  if (ve(e) || (e = Xe(e)), e.isZero())
    throw Error("division by zero");
  if (Oe) {
    if (!this.unsigned && this.high === -2147483648 && e.low === -1 && e.high === -1)
      return this;
    var n = (this.unsigned ? Oe.div_u : Oe.div_s)(
      this.low,
      this.high,
      e.low,
      e.high
    );
    return Dt(n, Oe.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? Rn : Ue;
  var r, s, i;
  if (this.unsigned) {
    if (e.unsigned || (e = e.toUnsigned()), e.gt(this))
      return Rn;
    if (e.gt(this.shru(1)))
      return a0;
    i = Rn;
  } else {
    if (this.eq(Fe)) {
      if (e.eq(Xn) || e.eq(ho))
        return Fe;
      if (e.eq(Fe))
        return Xn;
      var o = this.shr(1);
      return r = o.div(e).shl(1), r.eq(Ue) ? e.isNegative() ? Xn : ho : (s = this.sub(e.mul(r)), i = r.add(s.div(e)), i);
    } else if (e.eq(Fe))
      return this.unsigned ? Rn : Ue;
    if (this.isNegative())
      return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();
    if (e.isNegative())
      return this.div(e.neg()).neg();
    i = Ue;
  }
  for (s = this; s.gte(e); ) {
    r = Math.max(1, Math.floor(s.toNumber() / e.toNumber()));
    for (var c = Math.ceil(Math.log(r) / Math.LN2), d = c <= 48 ? 1 : Os(2, c - 48), l = Pe(r), E = l.mul(e); E.isNegative() || E.gt(s); )
      r -= d, l = Pe(r, this.unsigned), E = l.mul(e);
    l.isZero() && (l = Xn), i = i.add(l), s = s.sub(E);
  }
  return i;
};
W.div = W.divide;
W.modulo = function(e) {
  if (ve(e) || (e = Xe(e)), Oe) {
    var n = (this.unsigned ? Oe.rem_u : Oe.rem_s)(
      this.low,
      this.high,
      e.low,
      e.high
    );
    return Dt(n, Oe.get_high(), this.unsigned);
  }
  return this.sub(this.div(e).mul(e));
};
W.mod = W.modulo;
W.rem = W.modulo;
W.not = function() {
  return Dt(~this.low, ~this.high, this.unsigned);
};
W.and = function(e) {
  return ve(e) || (e = Xe(e)), Dt(this.low & e.low, this.high & e.high, this.unsigned);
};
W.or = function(e) {
  return ve(e) || (e = Xe(e)), Dt(this.low | e.low, this.high | e.high, this.unsigned);
};
W.xor = function(e) {
  return ve(e) || (e = Xe(e)), Dt(this.low ^ e.low, this.high ^ e.high, this.unsigned);
};
W.shiftLeft = function(e) {
  return ve(e) && (e = e.toInt()), (e &= 63) === 0 ? this : e < 32 ? Dt(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : Dt(0, this.low << e - 32, this.unsigned);
};
W.shl = W.shiftLeft;
W.shiftRight = function(e) {
  return ve(e) && (e = e.toInt()), (e &= 63) === 0 ? this : e < 32 ? Dt(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : Dt(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
W.shr = W.shiftRight;
W.shiftRightUnsigned = function(e) {
  if (ve(e) && (e = e.toInt()), e &= 63, e === 0)
    return this;
  var n = this.high;
  if (e < 32) {
    var r = this.low;
    return Dt(r >>> e | n << 32 - e, n >>> e, this.unsigned);
  } else
    return e === 32 ? Dt(n, 0, this.unsigned) : Dt(n >>> e - 32, 0, this.unsigned);
};
W.shru = W.shiftRightUnsigned;
W.shr_u = W.shiftRightUnsigned;
W.toSigned = function() {
  return this.unsigned ? Dt(this.low, this.high, !1) : this;
};
W.toUnsigned = function() {
  return this.unsigned ? this : Dt(this.low, this.high, !0);
};
W.toBytes = function(e) {
  return e ? this.toBytesLE() : this.toBytesBE();
};
W.toBytesLE = function() {
  var e = this.high, n = this.low;
  return [
    n & 255,
    n >>> 8 & 255,
    n >>> 16 & 255,
    n >>> 24,
    e & 255,
    e >>> 8 & 255,
    e >>> 16 & 255,
    e >>> 24
  ];
};
W.toBytesBE = function() {
  var e = this.high, n = this.low;
  return [
    e >>> 24,
    e >>> 16 & 255,
    e >>> 8 & 255,
    e & 255,
    n >>> 24,
    n >>> 16 & 255,
    n >>> 8 & 255,
    n & 255
  ];
};
vt.fromBytes = function(e, n, r) {
  return r ? vt.fromBytesLE(e, n) : vt.fromBytesBE(e, n);
};
vt.fromBytesLE = function(e, n) {
  return new vt(
    e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24,
    e[4] | e[5] << 8 | e[6] << 16 | e[7] << 24,
    n
  );
};
vt.fromBytesBE = function(e, n) {
  return new vt(
    e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7],
    e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3],
    n
  );
};
var ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
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
], Mp = (t) => {
  const e = u0.find(([n]) => t >= n);
  return t + (e ? e[1] : 0);
};
ni.addLeapSeconds = Mp;
const Lp = (t) => {
  const e = u0.find(([n, r]) => t - r >= n);
  return t - (e ? e[1] : 0);
};
ni.removeLeapSeconds = Lp;
var Tp = wt && wt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Vo, "__esModule", { value: !0 });
const Dr = Tp(_p), Cc = ni;
let lo = class fn {
  /**
   * Construct an instance of TAI64.
   *
   * @param label - The TAI64 label between 0 and 2^63-1, inclusive
   * @returns An instance of TAI64
   * @throws RangeError if the given label is not between 0 and 2^63-1, inclusive
   */
  constructor(e) {
    if (this.label = e, e.lt(Dr.default.ZERO) || e.gte(Dr.default.MAX_VALUE))
      throw new RangeError("Label must be an integer between 0 and 2^63-1, inclusive");
  }
  /**
   * Return a TAI64 the current number of seconds elapsed since 1970 TAI.
   *
   * @returns An instance of TAI64
   */
  static now() {
    const e = Math.floor(Date.now() / 1e3);
    return fn.fromUnix(e);
  }
  /**
   * Return a TAI64 corresponding to the given UNIX timestamp.
   *
   * @param timestamp - The UNIX timestamp in seconds
   * @returns An instance of TAI64
   */
  static fromUnix(e) {
    const n = Cc.addLeapSeconds(e), r = fn.EPOCH.label.add(n);
    return new fn(r);
  }
  /**
   * Return a TAI64 corresponding to the given hexadecimal string representing a TAI64. This method
   * is an alias for `TAI64#fromString()` method.
   *
   * @param hexString - The hexadecimal string
   * @returns An instance of TAI64
   */
  static fromHexString(e) {
    return fn.fromString(e);
  }
  /**
   * Return a TAI64 corresponding to the given string representing a TAI64 in the given radix.
   *
   * @param str - The string
   * @param radix - An integer that represents the radix (the base in mathematical numeral systems), defaults to `16`
   * @returns An instance of TAI64
   */
  static fromString(e, n = 16) {
    const r = Dr.default.fromString(e, !1, n);
    return new fn(r);
  }
  /**
   * Return a TAI64 corresponding to the given byte array representing a TAI64.
   *
   * @param bytes - The byte array
   * @returns An instance of TAI64
   */
  static fromByteArray(e) {
    const n = Dr.default.fromBytes(e, !1);
    return new fn(n);
  }
  /**
   * Return if this TAI64 is after the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns `true` if this TAI64 is after the given TAI64, `false` otherwise
   */
  isAfter(e) {
    return this.compareTo(e) > 0;
  }
  /**
   * Return if this TAI64 is before the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns `true` if this TAI64 is before the given TAI64, `false` otherwise
   */
  isBefore(e) {
    return this.compareTo(e) < 0;
  }
  /**
   * Return if this TAI64 is equal to the given TAI64.
   *
   * @param other - The other TAI64 to compare
   * @returns `true` if this TAI64 is equal to the given TAI64, `false` otherwise
   */
  isEqual(e) {
    return this.compareTo(e) === 0;
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
  compareTo(e) {
    return this.label.compare(e.label);
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
  toString(e = 16) {
    return this.label.toString(e);
  }
  /**
   * Return a UNIX timestamp corresponding to this TAI64.
   */
  toUnix() {
    const e = this.label.sub(fn.EPOCH.label);
    return Cc.removeLeapSeconds(e.toNumber());
  }
};
lo.EPOCH = new lo(Dr.default.MAX_VALUE.shiftRight(1).add(1));
Vo.TAI64 = lo;
Object.defineProperty(i0, "__esModule", { value: !0 });
var Op = Vo, d0 = i0.TAI64 = Op.TAI64, Pp = Object.defineProperty, Up = (t, e, n) => e in t ? Pp(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Wn = (t, e, n) => (Up(t, typeof e != "symbol" ? e + "" : e, n), n), Gp = (t, e, n) => {
  if (!e.has(t))
    throw TypeError("Cannot " + n);
}, Hp = (t, e, n) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, n);
}, Jp = (t, e, n) => (Gp(t, e, "access private method"), n), qo = (t) => {
  let e, n, r;
  Array.isArray(t) ? (n = t[0], e = t[1] ?? Ie, r = t[2] ?? void 0) : (n = t.amount, e = t.assetId ?? Ie, r = t.max ?? void 0);
  const s = Q(n);
  return {
    assetId: V(e),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, Zp = (t) => {
  const { amount: e, assetId: n } = t, r = [...t.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(e) : r.push({ assetId: n, amount: e }), r;
}, $o = at`
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
    `, Wo = at`
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
    `, wr = at`
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
    ${$o}
${Wo}`, zo = at`
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
    `, Yp = at`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Xp = at`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, Vp = at`
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
    `, h0 = at`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, ri = at`
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
    `, jp = at`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, qp = at`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, $p = at`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, Wp = at`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, zp = at`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, Kp = at`
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
    `, tm = at`
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
    ${Kp}`, em = at`
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
    ${jp}
${qp}
${$p}
${Wp}
${zp}
${tm}`, nm = at`
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
    ${ri}
${em}`, rm = at`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, sm = at`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, im = at`
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
    `, om = at`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, am = at`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${im}`, cm = at`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${nm}`, Am = at`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${wr}`, um = at`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${wr}
${$o}`, dm = at`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${wr}`, hm = at`
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
    ${sm}
${wr}`, lm = at`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionFragment
  }
}
    ${wr}`, fm = at`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${ri}`, gm = at`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${ri}
${wr}`, pm = at`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${ri}`, mm = at`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${zo}`, Im = at`
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
    ${zo}`, wm = at`
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
    ${zo}
${Yp}`, Em = at`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Bm = at`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${rm}`, ym = at`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${h0}`, Cm = at`
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
    ${h0}`, bm = at`
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
    ${Xp}`, Qm = at`
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
    ${Vp}`, xm = at`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Fm = at`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${$o}`, vm = at`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, Dm = at`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, Nm = at`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${Wo}`, Sm = at`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${Wo}`;
function Rm(t) {
  return {
    getVersion(e, n) {
      return t(om, e, n);
    },
    getNodeInfo(e, n) {
      return t(am, e, n);
    },
    getChain(e, n) {
      return t(cm, e, n);
    },
    getTransaction(e, n) {
      return t(Am, e, n);
    },
    getTransactionWithReceipts(e, n) {
      return t(um, e, n);
    },
    getTransactions(e, n) {
      return t(dm, e, n);
    },
    getTransactionsByOwner(e, n) {
      return t(hm, e, n);
    },
    estimatePredicates(e, n) {
      return t(lm, e, n);
    },
    getBlock(e, n) {
      return t(fm, e, n);
    },
    getBlockWithTransactions(e, n) {
      return t(gm, e, n);
    },
    getBlocks(e, n) {
      return t(pm, e, n);
    },
    getCoin(e, n) {
      return t(mm, e, n);
    },
    getCoins(e, n) {
      return t(Im, e, n);
    },
    getCoinsToSpend(e, n) {
      return t(wm, e, n);
    },
    getContract(e, n) {
      return t(Em, e, n);
    },
    getContractBalance(e, n) {
      return t(Bm, e, n);
    },
    getBalance(e, n) {
      return t(ym, e, n);
    },
    getBalances(e, n) {
      return t(Cm, e, n);
    },
    getMessages(e, n) {
      return t(bm, e, n);
    },
    getMessageProof(e, n) {
      return t(Qm, e, n);
    },
    getMessageStatus(e, n) {
      return t(xm, e, n);
    },
    dryRun(e, n) {
      return t(Fm, e, n);
    },
    submit(e, n) {
      return t(vm, e, n);
    },
    produceBlocks(e, n) {
      return t(Dm, e, n);
    },
    submitAndAwait(e, n) {
      return t(Nm, e, n);
    },
    statusChange(e, n) {
      return t(Sm, e, n);
    }
  };
}
var l0 = class {
  constructor() {
    N(this, "readable");
    N(this, "writable");
    N(this, "readableStreamController");
    this.readable = new ReadableStream({
      start: (t) => {
        this.readableStreamController = t;
      }
    }), this.writable = new WritableStream({
      write: (t) => {
        const e = l0.textDecoder.decode(t);
        if (e.startsWith("data:")) {
          const { data: n, errors: r } = JSON.parse(e.split("data:")[1]);
          Array.isArray(r) ? this.readableStreamController.enqueue(
            new D(
              D.CODES.INVALID_REQUEST,
              r.map((s) => s.message).join(`

`)
            )
          ) : this.readableStreamController.enqueue(n);
        }
      }
    });
  }
}, f0 = l0;
Wn(f0, "textDecoder", new TextDecoder());
async function* _m({
  url: t,
  variables: e,
  query: n,
  fetchFn: r
}) {
  const i = (await r(`${t}-sub`, {
    method: "POST",
    body: JSON.stringify({
      query: qu(n),
      variables: e
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    }
  })).body.pipeThrough(new f0()).getReader();
  for (; ; ) {
    const { value: o, done: c } = await i.read();
    if (o instanceof D)
      throw o;
    if (yield o, c)
      break;
  }
}
var vn = {}, km = 30 * 1e3, Mm = class {
  constructor(t = km) {
    N(this, "ttl");
    if (this.ttl = t, typeof t != "number" || this.ttl <= 0)
      throw new D(
        k.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(t, e = !0) {
    const n = V(t);
    if (vn[n]) {
      if (!e || vn[n].expires > Date.now())
        return vn[n].value;
      this.del(t);
    }
  }
  set(t) {
    const e = Date.now() + this.ttl, n = V(t);
    return vn[n] = {
      expires: e,
      value: t
    }, e;
  }
  getAllData() {
    return Object.keys(vn).reduce((t, e) => {
      const n = this.get(e, !1);
      return n && t.push(n), t;
    }, []);
  }
  getActiveData() {
    return Object.keys(vn).reduce((t, e) => {
      const n = this.get(e);
      return n && t.push(n), t;
    }, []);
  }
  del(t) {
    const e = V(t);
    delete vn[e];
  }
}, Lm = (t) => {
  const { type: e } = t;
  switch (t.type) {
    case bt.Coin: {
      const n = Y(t.predicate ?? "0x"), r = Y(t.predicateData ?? "0x");
      return {
        type: bt.Coin,
        txID: V(Y(t.id).slice(0, 32)),
        outputIndex: Y(t.id)[32],
        owner: V(t.owner),
        amount: Q(t.amount),
        assetId: V(t.assetId),
        txPointer: {
          blockHeight: Ke(Y(t.txPointer).slice(0, 8)),
          txIndex: Ke(Y(t.txPointer).slice(8, 16))
        },
        witnessIndex: t.witnessIndex,
        maturity: t.maturity ?? 0,
        predicateGasUsed: Q(t.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r)
      };
    }
    case bt.Contract:
      return {
        type: bt.Contract,
        txID: kt,
        outputIndex: 0,
        balanceRoot: kt,
        stateRoot: kt,
        txPointer: {
          blockHeight: Ke(Y(t.txPointer).slice(0, 8)),
          txIndex: Ke(Y(t.txPointer).slice(8, 16))
        },
        contractID: V(t.contractId)
      };
    case bt.Message: {
      const n = Y(t.predicate ?? "0x"), r = Y(t.predicateData ?? "0x"), s = Y(t.data ?? "0x");
      return {
        type: bt.Message,
        sender: V(t.sender),
        recipient: V(t.recipient),
        amount: Q(t.amount),
        nonce: V(t.nonce),
        witnessIndex: t.witnessIndex,
        predicateGasUsed: Q(t.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r),
        data: V(s),
        dataLength: s.length
      };
    }
    default:
      throw new D(
        k.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${e}.`
      );
  }
}, Tm = (t) => {
  const { type: e } = t;
  switch (e) {
    case yt.Coin:
      return {
        type: yt.Coin,
        to: V(t.to),
        amount: Q(t.amount),
        assetId: V(t.assetId)
      };
    case yt.Contract:
      return {
        type: yt.Contract,
        inputIndex: t.inputIndex,
        balanceRoot: kt,
        stateRoot: kt
      };
    case yt.Change:
      return {
        type: yt.Change,
        to: V(t.to),
        amount: Q(0),
        assetId: V(t.assetId)
      };
    case yt.Variable:
      return {
        type: yt.Variable,
        to: kt,
        amount: Q(0),
        assetId: kt
      };
    case yt.ContractCreated:
      return {
        type: yt.ContractCreated,
        contractId: V(t.contractId),
        stateRoot: V(t.stateRoot)
      };
    default:
      throw new D(
        k.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${e}.`
      );
  }
}, PB = (t) => "utxoId" in t, UB = (t) => "recipient" in t, bc = (t) => "id" in t, GB = (t) => "recipient" in t, Om = (t) => t.type === ut.Revert && t.val.toString("hex") === ku, Pm = (t) => t.type === ut.Panic && t.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Um = (t) => t.reduce(
  (e, n) => (Om(n) && e.missingOutputVariables.push(n), Pm(n) && e.missingOutputContractIds.push(n), e),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xt = (t) => t || kt;
function Gm(t) {
  var n, r, s, i, o, c, d, l, E, g, C, x, F, b;
  const { receiptType: e } = t;
  switch (e) {
    case "CALL":
      return {
        type: ut.Call,
        from: xt((n = t.contract) == null ? void 0 : n.id),
        to: xt((r = t == null ? void 0 : t.to) == null ? void 0 : r.id),
        amount: Q(t.amount),
        assetId: xt(t.assetId),
        gas: Q(t.gas),
        param1: Q(t.param1),
        param2: Q(t.param2),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "RETURN":
      return {
        type: ut.Return,
        id: xt((s = t.contract) == null ? void 0 : s.id),
        val: Q(t.val),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "RETURN_DATA":
      return {
        type: ut.ReturnData,
        id: xt((i = t.contract) == null ? void 0 : i.id),
        ptr: Q(t.ptr),
        len: Q(t.len),
        digest: xt(t.digest),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "PANIC":
      return {
        type: ut.Panic,
        id: xt((o = t.contract) == null ? void 0 : o.id),
        reason: Q(t.reason),
        pc: Q(t.pc),
        is: Q(t.is),
        contractId: xt(t.contractId)
      };
    case "REVERT":
      return {
        type: ut.Revert,
        id: xt((c = t.contract) == null ? void 0 : c.id),
        val: Q(t.ra),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "LOG":
      return {
        type: ut.Log,
        id: xt((d = t.contract) == null ? void 0 : d.id),
        val0: Q(t.ra),
        val1: Q(t.rb),
        val2: Q(t.rc),
        val3: Q(t.rd),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "LOG_DATA":
      return {
        type: ut.LogData,
        id: xt((l = t.contract) == null ? void 0 : l.id),
        val0: Q(t.ra),
        val1: Q(t.rb),
        ptr: Q(t.ptr),
        len: Q(t.len),
        digest: xt(t.digest),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "TRANSFER":
      return {
        type: ut.Transfer,
        from: xt((E = t.contract) == null ? void 0 : E.id),
        to: xt(t.toAddress || ((g = t == null ? void 0 : t.to) == null ? void 0 : g.id)),
        amount: Q(t.amount),
        assetId: xt(t.assetId),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "TRANSFER_OUT":
      return {
        type: ut.TransferOut,
        from: xt((C = t.contract) == null ? void 0 : C.id),
        to: xt(t.toAddress || ((x = t.to) == null ? void 0 : x.id)),
        amount: Q(t.amount),
        assetId: xt(t.assetId),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: ut.ScriptResult,
        result: Q(t.result),
        gasUsed: Q(t.gasUsed)
      };
    case "MESSAGE_OUT": {
      const v = xt(t.sender), S = xt(t.recipient), J = xt(t.nonce), O = Q(t.amount), j = t.data ? Y(t.data) : Uint8Array.from([]), M = xt(t.digest), _ = Rs.getMessageId({
        sender: v,
        recipient: S,
        nonce: J,
        amount: O,
        data: j
      });
      return {
        type: ut.MessageOut,
        sender: v,
        recipient: S,
        amount: O,
        nonce: J,
        data: j,
        digest: M,
        messageId: _
      };
    }
    case "MINT": {
      const v = xt((F = t.contract) == null ? void 0 : F.id), S = xt(t.subId), J = Tr.getAssetId(v, S);
      return {
        type: ut.Mint,
        subId: S,
        contractId: v,
        assetId: J,
        val: Q(t.val),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    }
    case "BURN": {
      const v = xt((b = t.contract) == null ? void 0 : b.id), S = xt(t.subId), J = ro.getAssetId(v, S);
      return {
        type: ut.Burn,
        subId: S,
        contractId: v,
        assetId: J,
        val: Q(t.val),
        pc: Q(t.pc),
        is: Q(t.is)
      };
    }
    default:
      throw new D(k.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${e}.`);
  }
}
var Hm = "https://fuellabs.github.io/block-explorer-v2", Jm = (t, e) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[t] || t}/${e}`, HB = (t = {}) => {
  const { blockExplorerUrl: e, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = t, c = e || Hm, d = [
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
  })), E = l.length > 0;
  if (l.length > 1)
    throw new D(
      k.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && l.length > 0) {
    const j = d.map(({ key: M }) => M).join(", ");
    throw new D(
      k.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const g = E ? Jm(
    l[0].key,
    l[0].value
  ) : "", C = /^\/|\/$/gm, x = n ? n.replace(C, "") : g, F = c.replace(C, ""), b = r == null ? void 0 : r.replace(C, ""), v = b ? encodeURIComponent(b) : void 0, S = F.match(/^https?:\/\//) ? "" : "https://", J = b != null && b.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${F}/${x}${v ? `?providerUrl=${J}${v}` : ""}`;
}, zn = (t, e, n) => Q(Math.ceil(t.mul(e).toNumber() / n.toNumber())), g0 = (t) => t.filter(
  (r) => r.type === ut.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function yn(t, e) {
  const n = Q(e.base);
  let r = Q(0);
  return e.__typename === "LightOperation" && (r = Q(t).div(Q(e.unitsPerGas))), e.__typename === "HeavyOperation" && (r = Q(t).mul(Q(e.gasPerUnit))), n.add(r);
}
function Zm(t, e, n) {
  const r = [];
  return t.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    yn(e, n.vmInitialization).add(
      yn(Y(o.predicate).length, n.contractRoot)
    ).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function p0(t) {
  const { gasCosts: e, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = t, o = yn(i, e.vmInitialization), c = Q(i).mul(n), d = Zm(r, i, e);
  return o.add(c).add(d).add(s).maxU64();
}
function Ko(t) {
  const { gasPerByte: e, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = t;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(e)), o.add(s).add(i);
}
function m0({
  gasCosts: t,
  stateRootSize: e,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = yn(r, t.contractRoot), i = yn(e, t.stateRoot), o = yn(n, t.s256), c = Q(4 + 32 + 32 + 32), d = yn(c, t.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function I0({
  gasCosts: t,
  txBytesSize: e
}) {
  return yn(e, t.s256);
}
function fo(t) {
  return Object.keys(t).forEach((e) => {
    var n;
    switch ((n = t[e]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        t[e] = V(t[e]);
        break;
      case "Array":
        t[e] = fo(t[e]);
        break;
      case "BN":
        t[e] = t[e].toHex();
        break;
      case "Address":
        t[e] = t[e].toB256();
        break;
      case "Object":
        t[e] = fo(t[e]);
        break;
    }
  }), t;
}
function Ym(t) {
  return fo(Ur(t));
}
function Xm(t) {
  return new Promise((e) => {
    setTimeout(() => {
      e(!0);
    }, t);
  });
}
var JB = (t) => Number(BigInt(t) - BigInt(2 ** 62) - BigInt(10)), Vm = (t) => (BigInt(t) + BigInt(2 ** 62) + BigInt(10)).toString(), ZB = class extends Error {
  constructor() {
    super(...arguments);
    N(this, "name", "ChangeOutputCollisionError");
    N(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, jm = class extends Error {
  constructor(e) {
    super();
    N(this, "name", "NoWitnessAtIndexError");
    this.index = e, this.message = `Witness at index "${e}" was not found`;
  }
}, YB = class extends Error {
  constructor(e) {
    super();
    N(this, "name", "NoWitnessByOwnerError");
    this.owner = e, this.message = `A witness for the given owner "${e}" was not found`;
  }
}, qm = (t) => {
  const e = Y(t);
  return {
    data: V(e),
    dataLength: e.length
  };
}, si = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    gasPrice: t,
    maturity: e,
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
    this.gasPrice = Q(t), this.maturity = e ?? 0, this.witnessLimit = r ? Q(r) : void 0, this.maxFee = n ? Q(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(t) {
    let e = 0;
    const n = [];
    return t.gasPrice && (e += Ze.GasPrice, n.push({ data: t.gasPrice, type: Ze.GasPrice })), t.witnessLimit && (e += Ze.WitnessLimit, n.push({ data: t.witnessLimit, type: Ze.WitnessLimit })), t.maturity > 0 && (e += Ze.Maturity, n.push({ data: t.maturity, type: Ze.Maturity })), t.maxFee && (e += Ze.MaxFee, n.push({ data: t.maxFee, type: Ze.MaxFee })), {
      policyTypes: e,
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
    const t = ((i = this.inputs) == null ? void 0 : i.map(Lm)) ?? [], e = ((o = this.outputs) == null ? void 0 : o.map(Tm)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(qm)) ?? [], { policyTypes: r, policies: s } = si.getPolicyMeta(this);
    return {
      policyTypes: r,
      inputs: t,
      outputs: e,
      policies: s,
      witnesses: n,
      inputsCount: t.length,
      outputsCount: e.length,
      witnessesCount: n.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new sn().encode(this.toTransaction());
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
    return this.witnesses.push(_e([kt, kt])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(t, e) {
    const n = mt.fromAddressOrString(t), r = this.getCoinInputWitnessIndexByOwner(n);
    typeof r == "number" && this.updateWitness(r, e);
  }
  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(t, e) {
    if (!this.witnesses[t])
      throw new jm(t);
    this.witnesses[t] = e;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (t) => t.type === bt.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (t) => t.type === yt.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (t) => t.type === yt.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(t) {
    const e = Fr(t), n = this.inputs.find((r) => {
      switch (r.type) {
        case bt.Coin:
          return V(r.owner) === e.toB256();
        case bt.Message:
          return V(r.recipient) === e.toB256();
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
  addCoinInput(t, e) {
    const { assetId: n, owner: r, amount: s } = t;
    let i;
    e ? i = 0 : (i = this.getCoinInputWitnessIndexByOwner(r), typeof i != "number" && (i = this.createWitness()));
    const o = {
      ...t,
      type: bt.Coin,
      owner: r.toB256(),
      amount: s,
      assetId: n,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: i,
      predicate: e == null ? void 0 : e.bytes,
      predicateData: e == null ? void 0 : e.predicateData
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
  addMessageInput(t, e) {
    const { recipient: n, sender: r, amount: s } = t, i = Ie;
    let o;
    e ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.createWitness()));
    const c = {
      ...t,
      type: bt.Message,
      sender: r.toB256(),
      recipient: n.toB256(),
      amount: s,
      witnessIndex: o,
      predicate: e == null ? void 0 : e.bytes,
      predicateData: e == null ? void 0 : e.predicateData
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
  addResource(t) {
    return bc(t) ? this.addCoinInput(t) : this.addMessageInput(t), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(t) {
    return t.forEach((e) => this.addResource(e)), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResource(t, e) {
    return bc(t) ? this.addCoinInput(t, e) : this.addMessageInput(t, e), this;
  }
  /**
   * Adds multiple predicate coin/message inputs to the transaction and change outputs
   * from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addPredicateResources(t, e) {
    return t.forEach((n) => this.addPredicateResource(n, e)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(t, e, n = Ie) {
    return this.pushOutput({
      type: yt.Coin,
      to: Fr(t).toB256(),
      amount: e,
      assetId: n
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(t, e) {
    return e.map(qo).forEach((n) => {
      this.pushOutput({
        type: yt.Coin,
        to: Fr(t).toB256(),
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
  addChangeOutput(t, e = Ie) {
    this.getChangeOutputs().find(
      (r) => V(r.assetId) === e
    ) || this.pushOutput({
      type: yt.Change,
      to: Fr(t).toB256(),
      assetId: e
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
    const { gasCosts: e, consensusParameters: n } = t, { gasPerByte: r } = n;
    return p0({
      gasPerByte: r,
      gasCosts: e,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(e)
    });
  }
  calculateMaxGas(t, e) {
    const { consensusParameters: n } = t, { gasPerByte: r } = n, s = this.toTransaction().witnesses.reduce(
      (i, o) => i + o.dataLength,
      0
    );
    return Ko({
      gasPerByte: r,
      minGas: e,
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
  fundWithFakeUtxos(t) {
    let e = 0;
    const n = () => {
      const i = String(e++);
      return kt.slice(0, -i.length).concat(i);
    }, r = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const c = r(i);
      c && "assetId" in c ? (c.id = n(), c.amount = o) : this.addResources([
        {
          id: n(),
          amount: o,
          assetId: i,
          owner: mt.fromRandom(),
          maturity: 0,
          blockCreated: Q(1),
          txCreatedIdx: Q(1)
        }
      ]);
    };
    s(Ie, Q(1e11)), t.forEach((i) => s(i.assetId, i.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: e, assetId: n }) => ({
      amount: Q(e),
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
    return Ym(this);
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
      (t) => "predicate" in t && t.predicate && t.predicate !== Y("0x")
    );
  }
};
function w0(t, e) {
  const n = t.toTransaction();
  n.type === Ce.Script && (n.receiptsRoot = kt), n.inputs = n.inputs.map((i) => {
    const o = Ur(i);
    switch (o.type) {
      case bt.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = Q(0), o;
      case bt.Message:
        return o.predicateGasUsed = Q(0), o;
      case bt.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = kt, o.outputIndex = 0, o.balanceRoot = kt, o.stateRoot = kt, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Ur(i);
    switch (o.type) {
      case yt.Contract:
        return o.balanceRoot = kt, o.stateRoot = kt, o;
      case yt.Change:
        return o.amount = Q(0), o;
      case yt.Variable:
        return o.to = kt, o.amount = Q(0), o.assetId = kt, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Rp(e), s = _e([r, new sn().encode(n)]);
  return Mt(s);
}
var $m = (t) => {
  const e = new Uint8Array(32);
  return e.set(Y(t)), e;
}, Wm = (t) => {
  let e, n;
  return Array.isArray(t) ? (e = t[0], n = t[1]) : (e = t.key, n = t.value), {
    key: V(e),
    value: V($m(n))
  };
}, go = class extends si {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({
    bytecodeWitnessIndex: e,
    salt: n,
    storageSlots: r,
    ...s
  } = {}) {
    super(s);
    /** Type of the transaction */
    N(this, "type", Ce.Create);
    /** Witness index of contract bytecode to create */
    N(this, "bytecodeWitnessIndex");
    /** Salt */
    N(this, "salt");
    /** List of storage slots to initialize */
    N(this, "storageSlots");
    this.bytecodeWitnessIndex = e ?? 0, this.salt = V(n ?? kt), this.storageSlots = [...r ?? []];
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var s;
    const e = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(Wm)) ?? [];
    return {
      type: Ce.Create,
      ...e,
      bytecodeLength: e.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? V(this.salt) : kt,
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
      (e) => e.type === yt.ContractCreated
    );
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return w0(this, e);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(e, n) {
    this.pushOutput({
      type: yt.ContractCreated,
      contractId: e,
      stateRoot: n
    });
  }
  metadataGas(e) {
    return m0({
      contractBytesSize: Q(Y(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: e,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Qc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Y("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, zm = {
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
}, Kn = class extends si {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: e, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    N(this, "type", Ce.Script);
    /** Gas limit for transaction */
    N(this, "gasLimit");
    /** Script to execute */
    N(this, "script");
    /** Script input data (parameters) */
    N(this, "scriptData");
    this.gasLimit = Q(r), this.script = Y(e ?? Qc.bytes), this.scriptData = Y(n ?? Qc.encodeScriptData());
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const e = Y(this.script ?? "0x"), n = Y(this.scriptData ?? "0x");
    return {
      type: Ce.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: e.length,
      scriptDataLength: n.length,
      receiptsRoot: kt,
      script: V(e),
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
      (e) => e.type === bt.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (e) => e.type === yt.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (e) => e.type === yt.Variable
    );
  }
  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript(e, n) {
    this.scriptData = e.encodeScriptData(n), this.script = e.bytes;
  }
  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(e = 1) {
    let n = e;
    for (; n; )
      this.pushOutput({
        type: yt.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(e, n) {
    const { consensusParameters: r } = e, { gasPerByte: s } = r, i = this.toTransaction().witnesses.reduce(
      (o, c) => o + c.dataLength,
      0
    );
    return Ko({
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
  addContractInputAndOutput(e) {
    const n = Fr(e);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: bt.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: yt.Contract,
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
  getTransactionId(e) {
    return w0(this, e);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(e, n) {
    const r = new Qn(e);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(e) {
    return I0({
      gasCosts: e,
      txBytesSize: this.byteSize()
    });
  }
}, Te = (t) => {
  if (t instanceof Kn || t instanceof go)
    return t;
  const { type: e } = t;
  switch (t.type) {
    case Ce.Script:
      return Kn.from(t);
    case Ce.Create:
      return go.from(t);
    default:
      throw new D(k.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${e}.`);
  }
}, Km = (t) => {
  var P, $;
  const {
    gasUsed: e,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = t, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), c = Y(n), [d] = new sn().decode(c, 0);
  if (d.type === Ce.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: l, witnesses: E, inputs: g, policies: C } = d;
  let x = Q(0), F = Q(0);
  if (l === Ce.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, tt = Q(Y(E[U].data).length);
    x = m0({
      contractBytesSize: tt,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: c.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (F = U), x = I0({
      gasCosts: r,
      txBytesSize: c.length
    });
  }
  const b = p0({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: g,
    metadataGas: x,
    txBytesSize: c.length
  }), v = Q((P = C.find((U) => U.type === Ze.GasPrice)) == null ? void 0 : P.data), S = ($ = C.find((U) => U.type === Ze.WitnessLimit)) == null ? void 0 : $.data, J = E.reduce((U, H) => U + H.dataLength, 0), O = Ko({
    gasPerByte: i,
    minGas: b,
    witnessesLength: J,
    gasLimit: F,
    witnessLimit: S
  }), j = zn(e, v, o), M = zn(b, v, o), _ = zn(O, v, o);
  return {
    fee: M.add(j),
    minFee: M,
    maxFee: _,
    feeFromGasUsed: j
  };
}, tI = (t) => {
  const e = d0.fromString(t, 10).toUnix();
  return new Date(e * 1e3);
}, XB = (t) => d0.fromUnix(Math.floor(t.getTime() / 1e3)).toString(10), eI = ({ abi: t, receipt: e, rawPayload: n, maxInputs: r }) => {
  var g;
  const s = new Qn(t), i = e.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const C = Q(e.param2).sub(Ws({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    d = e.param2.toHex();
  let l;
  if (d) {
    const C = o.decodeArguments(d);
    C && (l = c.reduce((x, F, b) => {
      const v = C[b], S = F.name;
      return S ? {
        ...x,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(v))
      } : x;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: l,
    ...(g = e.amount) != null && g.isZero() ? {} : { amount: e.amount, assetId: e.assetId }
  };
};
function nI(t, e) {
  return t.filter((n) => e.includes(n.type));
}
function ta(t, e) {
  return t.filter((n) => n.type === e);
}
function rI(t) {
  return ta(t, bt.Coin);
}
function sI(t) {
  return ta(t, bt.Message);
}
function iI(t) {
  return nI(t, [bt.Coin, bt.Message]);
}
function oI(t) {
  return ta(t, bt.Contract);
}
function Ps(t, e) {
  const n = rI(t), r = sI(t), s = n.find((o) => o.assetId === e), i = r.find(
    (o) => e === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function aI(t, e) {
  if (e == null)
    return;
  const n = t == null ? void 0 : t[e];
  if (n) {
    if (n.type !== bt.Contract)
      throw new D(
        k.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function Gr(t) {
  return t.type === bt.Coin ? t.owner.toString() : t.type === bt.Message ? t.recipient.toString() : "";
}
function Kr(t, e) {
  return t.filter((n) => n.type === e);
}
function cI(t) {
  return Kr(t, yt.ContractCreated);
}
function E0(t) {
  return Kr(t, yt.Coin);
}
function AI(t) {
  return Kr(t, yt.Change);
}
function uI(t) {
  return Kr(t, yt.Contract);
}
function VB(t) {
  return Kr(t, yt.Variable);
}
var dI = /* @__PURE__ */ ((t) => (t.Create = "Create", t.Mint = "Mint", t.Script = "Script", t))(dI || {}), hI = /* @__PURE__ */ ((t) => (t.submitted = "submitted", t.success = "success", t.squeezedout = "squeezedout", t.failure = "failure", t))(hI || {}), lI = /* @__PURE__ */ ((t) => (t.payBlockProducer = "Pay network fee to block producer", t.contractCreated = "Contract created", t.transfer = "Transfer asset", t.contractCall = "Contract call", t.contractTransfer = "Contract transfer", t.receive = "Receive asset", t.mint = "Mint asset", t.predicatecall = "Predicate call", t.script = "Script", t.sent = "Sent asset", t.withdrawFromFuel = "Withdraw from Fuel", t))(lI || {}), fI = /* @__PURE__ */ ((t) => (t[t.contract = 0] = "contract", t[t.account = 1] = "account", t))(fI || {}), gI = /* @__PURE__ */ ((t) => (t.ethereum = "ethereum", t.fuel = "fuel", t))(gI || {});
function ii(t, e) {
  return (t ?? []).filter((n) => n.type === e);
}
function B0(t) {
  switch (t) {
    case Ce.Mint:
      return "Mint";
    case Ce.Create:
      return "Create";
    case Ce.Script:
      return "Script";
    default:
      throw new D(
        k.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${t}.`
      );
  }
}
function ea(t, e) {
  return B0(t) === e;
}
function pI(t) {
  return ea(
    t,
    "Mint"
    /* Mint */
  );
}
function y0(t) {
  return ea(
    t,
    "Create"
    /* Create */
  );
}
function C0(t) {
  return ea(
    t,
    "Script"
    /* Script */
  );
}
function jB(t) {
  return (e) => t.assetId === e.assetId;
}
function mI(t) {
  return ii(t, ut.Call);
}
function II(t) {
  return ii(t, ut.MessageOut);
}
var wI = (t, e) => {
  const n = t.assetsSent || [], r = e.assetsSent || [], s = r.filter(
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
function EI(t, e) {
  var n, r, s, i, o, c, d, l;
  return t.name === e.name && ((n = t.from) == null ? void 0 : n.address) === ((r = e.from) == null ? void 0 : r.address) && ((s = t.to) == null ? void 0 : s.address) === ((i = e.to) == null ? void 0 : i.address) && ((o = t.from) == null ? void 0 : o.type) === ((c = e.from) == null ? void 0 : c.type) && ((d = t.to) == null ? void 0 : d.type) === ((l = e.to) == null ? void 0 : l.type);
}
function On(t, e) {
  var s, i, o;
  const n = [...t], r = n.findIndex((c) => EI(c, e));
  if (n[r]) {
    const c = { ...n[r] };
    (s = e.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? wI(c, e) : e.assetsSent), (o = e.calls) != null && o.length && (c.calls = [...c.calls || [], ...e.calls]), n[r] = c;
  } else
    n.push(e);
  return n;
}
function BI(t) {
  return ii(t, ut.TransferOut);
}
function yI({ receipts: t }) {
  return BI(t).reduce(
    (r, s) => On(r, {
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
function CI({
  inputs: t,
  receipts: e
}) {
  return II(e).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = Ps(t, o);
      if (c) {
        const d = Gr(c);
        return On(s, {
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
function bI({
  inputs: t,
  outputs: e,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = mI(n);
  return uI(e).reduce((l, E) => {
    const g = aI(t, E.inputIndex);
    return g ? o.reduce((x, F) => {
      var b;
      if (F.to === g.contractID) {
        const v = Ps(t, F.assetId);
        if (v) {
          const S = Gr(v), J = [], O = r == null ? void 0 : r[g.contractID];
          return O && J.push(
            eI({
              abi: O,
              receipt: F,
              rawPayload: s,
              maxInputs: i
            })
          ), On(x, {
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
            calls: J
          });
        }
      }
      return x;
    }, l) : l;
  }, []);
}
function xc({
  inputs: t,
  outputs: e,
  receipts: n
}) {
  const r = E0(e), [s] = ii(
    n,
    ut.Transfer
  );
  let i = [];
  return s ? AI(e).forEach((c) => {
    const { assetId: d } = c, [l] = oI(t), E = Ps(t, d);
    if (E && l) {
      const g = Gr(E);
      i = On(i, {
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
    const c = Ps(t, o.assetId);
    if (c) {
      const l = {
        name: "Transfer asset",
        from: {
          type: 1,
          address: Gr(c)
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
      i = On(i, l);
    }
  }), i;
}
function QI(t) {
  return E0(t).reduce((r, s) => On(r, {
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
function xI({ inputs: t, outputs: e }) {
  const n = cI(e), r = iI(t)[0], s = Gr(r);
  return n.reduce((o, c) => On(o, {
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
function FI({
  transactionType: t,
  inputs: e,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return y0(t) ? [
    ...xI({ inputs: e, outputs: n }),
    ...xc({ inputs: e, outputs: n, receipts: r })
  ] : C0(t) ? [
    ...xc({ inputs: e, outputs: n, receipts: r }),
    ...bI({
      inputs: e,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...yI({ receipts: r }),
    ...CI({ inputs: e, receipts: r })
  ] : [...QI(n)];
}
var tr = (t) => {
  const e = Gm(t);
  switch (e.type) {
    case ut.ReturnData:
      return {
        ...e,
        data: t.data || "0x"
      };
    case ut.LogData:
      return {
        ...e,
        data: t.data || "0x"
      };
    default:
      return e;
  }
}, vI = (t) => {
  const e = [];
  return t.forEach((n) => {
    n.type === ut.Mint && e.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), e;
}, DI = (t) => {
  const e = [];
  return t.forEach((n) => {
    n.type === ut.Burn && e.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), e;
}, NI = (t) => {
  switch (t) {
    case "FailureStatus":
      return "failure";
    case "SuccessStatus":
      return "success";
    case "SubmittedStatus":
      return "submitted";
    case "SqueezedOutStatus":
      return "squeezedout";
    default:
      throw new D(
        k.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${t}.`
      );
  }
}, SI = (t) => {
  let e, n, r, s = !1, i = !1, o = !1;
  if (t != null && t.type)
    switch (r = NI(t.type), t.type) {
      case "SuccessStatus":
        e = t.time, n = t.block.id, i = !0;
        break;
      case "FailureStatus":
        e = t.time, n = t.block.id, s = !0;
        break;
      case "SubmittedStatus":
        e = t.time, o = !0;
        break;
    }
  return {
    time: e,
    blockId: n,
    status: r,
    isStatusFailure: s,
    isStatusSuccess: i,
    isStatusPending: o
  };
};
function oi(t) {
  const {
    id: e,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: c,
    abiMap: d = {},
    maxInputs: l,
    gasCosts: E
  } = t, g = g0(n), C = V(o), x = FI({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: d,
    maxInputs: l
  }), F = B0(i.type), { fee: b } = Km({
    gasUsed: g,
    rawPayload: C,
    consensusParameters: {
      gasCosts: E,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: v, isStatusPending: S, isStatusSuccess: J, blockId: O, status: j, time: M } = SI(c), _ = vI(n), L = DI(n);
  let P;
  return M && (P = tI(M)), {
    id: e,
    fee: b,
    gasUsed: g,
    operations: x,
    type: F,
    blockId: O,
    time: M,
    status: j,
    receipts: n,
    mintedAssets: _,
    burnedAssets: L,
    isTypeMint: pI(i.type),
    isTypeCreate: y0(i.type),
    isTypeScript: C0(i.type),
    isStatusFailure: v,
    isStatusSuccess: J,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
var po = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(t, e) {
    /** Transaction ID */
    N(this, "id");
    /** Current provider */
    N(this, "provider");
    /** Gas used on the transaction */
    N(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    N(this, "gqlTransaction");
    this.id = t, this.provider = e;
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(t, e) {
    const n = new po(t, e);
    return await n.fetch(), n;
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
      const e = this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: n } of e)
        if (n)
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
    var e;
    return (e = new sn().decode(
      Y(t.rawPayload),
      0
    )) == null ? void 0 : e[0];
  }
  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary(t) {
    var l;
    let e = this.gqlTransaction;
    e || (e = await this.fetch());
    const n = this.decodeTransaction(
      e
    ), r = ((l = e.receipts) == null ? void 0 : l.map(tr)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), c = this.provider.getChain().consensusParameters.maxInputs;
    return oi({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: Y(e.rawPayload),
      gqlTransactionStatus: e.status,
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: t,
      maxInputs: c,
      gasCosts: o
    });
  }
  async waitForStatusChange() {
    var n, r;
    const t = (r = (n = this.gqlTransaction) == null ? void 0 : n.status) == null ? void 0 : r.type;
    if (t && t !== "SubmittedStatus")
      return;
    const e = this.provider.operations.statusChange({
      transactionId: this.id
    });
    for await (const { statusChange: s } of e)
      if (s.type !== "SubmittedStatus")
        break;
    await this.fetch();
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(t) {
    await this.waitForStatusChange();
    const e = await this.getTransactionSummary(t);
    return {
      gqlTransaction: this.gqlTransaction,
      ...e
    };
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(t) {
    const e = await this.waitForResult(t);
    if (e.isStatusFailure)
      throw new D(
        k.TRANSACTION_FAILED,
        `Transaction failed: ${e.gqlTransaction.status.reason}`
      );
    return e;
  }
};
function RI(t, e) {
  return t.reduce((n, r) => (r.type === ut.LogData && n.push(e.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === ut.Log && n.push(e.decodeLog(new R().encode(r.val0), r.val1.toNumber(), r.id)[0]), n), []);
}
function _I(t, e) {
  const n = t.baseDelay ?? 150;
  switch (t.backoff) {
    case "linear":
      return n * e;
    case "fixed":
      return n;
    case "exponential":
    default:
      return 2 ** (e - 1) * n;
  }
}
function b0(t, e, n = 0) {
  return e === void 0 ? t : async (...r) => {
    var s;
    try {
      return await t(...r);
    } catch (i) {
      const o = i;
      if (((s = o.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw o;
      const c = n + 1;
      if (c > e.maxRetries)
        throw o;
      const d = _I(e, c);
      return await Xm(d), b0(t, e, c)(...r);
    }
  };
}
var kI = (t, e) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return t.forEach(r), e.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, MI = 10, LI = (t) => {
  const { name: e, daHeight: n, consensusParameters: r, latestBlock: s } = t, { contractParams: i, feeParams: o, predicateParams: c, scriptParams: d, txParams: l, gasCosts: E } = r;
  return {
    name: e,
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
}, mo, Q0, We = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(t, e = {}) {
    this.url = t, Hp(this, mo), Wn(this, "operations"), Wn(this, "cache"), Wn(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...e }, this.url = t, this.operations = this.createOperations(), this.cache = e.cacheUtxo ? new Mm(e.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    We.nodeInfoCache = {}, We.chainInfoCache = {};
  }
  static getFetchFn(t) {
    const { retryOptions: e, timeout: n } = t;
    return b0((...r) => {
      if (t.fetch)
        return t.fetch(...r);
      const s = r[0], i = r[1], o = n ? AbortSignal.timeout(n) : void 0;
      return fetch(s, { ...i, signal: o });
    }, e);
  }
  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(t, e = {}) {
    const n = new We(t, e);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const t = We.chainInfoCache[this.url];
    if (!t)
      throw new D(
        k.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return t;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const t = We.nodeInfoCache[this.url];
    if (!t)
      throw new D(
        k.NODE_INFO_CACHE_EMPTY,
        "Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return t;
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  getGasConfig() {
    const { minGasPrice: t } = this.getNode(), { maxGasPerTx: e, maxGasPerPredicate: n, gasPriceFactor: r, gasPerByte: s, gasCosts: i } = this.getChain().consensusParameters;
    return {
      minGasPrice: t,
      maxGasPerTx: e,
      maxGasPerPredicate: n,
      gasPriceFactor: r,
      gasPerByte: s,
      gasCosts: i
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   */
  async connect(t, e) {
    this.url = t, this.options = e ?? this.options, this.operations = this.createOperations(), await this.fetchChainAndNodeInfo();
  }
  /**
   * Fetches both the chain and node information, saves it to the cache, and return it.
   *
   * @returns NodeInfo and Chain
   */
  async fetchChainAndNodeInfo() {
    const t = await this.fetchChain(), e = await this.fetchNode();
    return We.ensureClientVersionIsSupported(e), {
      chain: t,
      nodeInfo: e
    };
  }
  static ensureClientVersionIsSupported(t) {
    const { isMajorSupported: e, isMinorSupported: n, supportedVersion: r } = gd(t.nodeVersion);
    if (!e || !n)
      throw new D(
        D.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${t.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const t = We.getFetchFn(this.options), e = new pp.GraphQLClient(this.url, {
      fetch: (r, s) => t(r, s, this.options)
    });
    return Rm((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? _m({
        url: this.url,
        query: r,
        fetchFn: (c, d) => t(c, d, this.options),
        variables: s
      }) : e.request(r, s);
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
      consensusParameters: { chainId: e }
    } = await this.getChain(), n = new Sn(t, e.toNumber());
    return Promise.resolve(n);
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
    const { nodeInfo: t } = await this.operations.getNodeInfo(), e = {
      maxDepth: Q(t.maxDepth),
      maxTx: Q(t.maxTx),
      minGasPrice: Q(t.minGasPrice),
      nodeVersion: t.nodeVersion,
      utxoValidation: t.utxoValidation,
      vmBacktrace: t.vmBacktrace,
      peers: t.peers
    };
    return We.nodeInfoCache[this.url] = e, e;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: t } = await this.operations.getChain(), e = LI(t);
    return We.chainInfoCache[this.url] = e, e;
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
  async sendTransaction(t, { estimateTxDependencies: e = !0, awaitExecution: n = !1 } = {}) {
    const r = Te(t);
    Jp(this, mo, Q0).call(this, r.inputs), e && await this.estimateTxDependencies(r);
    const { gasUsed: s, minGasPrice: i } = await this.getTransactionCost(r, [], {
      estimateTxDependencies: !1,
      estimatePredicates: !1
    });
    if (Q(i).gt(Q(r.gasPrice)))
      throw new D(
        k.GAS_PRICE_TOO_LOW,
        `Gas price '${r.gasPrice}' is lower than the required: '${i}'.`
      );
    if (r.type === Ce.Script && Q(s).gt(Q(r.gasLimit)))
      throw new D(
        k.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r.gasLimit}' is lower than the required: '${s}'.`
      );
    const c = V(r.toTransactionBytes());
    if (n) {
      const l = this.operations.submitAndAwait({ encodedTransaction: c });
      for await (const { submitAndAwait: C } of l)
        if (C.type !== "SubmittedStatus")
          break;
      const E = r.getTransactionId(this.getChainId()), g = new po(E, this);
      return await g.fetch(), g;
    }
    const {
      submit: { id: d }
    } = await this.operations.submit({ encodedTransaction: c });
    return new po(d, this);
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
  async call(t, { utxoValidation: e, estimateTxDependencies: n = !0 } = {}) {
    const r = Te(t);
    n && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: e || !1
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
  async estimatePredicates(t) {
    const e = V(t.toTransactionBytes()), n = await this.operations.estimatePredicates({
      encodedTransaction: e
    }), r = t, [s] = new sn().decode(
      Y(n.estimatePredicates.rawPayload),
      0
    );
    return s.inputs && s.inputs.forEach((i, o) => {
      "predicate" in i && i.predicateGasUsed.gt(0) && (r.inputs[o].predicateGasUsed = i.predicateGasUsed);
    }), r;
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
    let e = 0, n = 0, r = 0;
    if (t.type === Ce.Create)
      return;
    let s = t;
    s.hasPredicateInput() && (s = await this.estimatePredicates(s));
    do {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: V(s.toTransactionBytes()),
        utxoValidation: !1
      }), o = i.map(tr), { missingOutputVariables: c, missingOutputContractIds: d } = Um(o);
      if (e = c.length, n = d.length, e === 0 && n === 0)
        return;
      s.addVariableOutputs(e), d.forEach(
        ({ contractId: l }) => s.addContractInputAndOutput(mt.fromString(l))
      ), r += 1;
    } while (r < MI);
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
  async simulate(t, { estimateTxDependencies: e = !0 } = {}) {
    const n = Te(t);
    e && await this.estimateTxDependencies(n);
    const r = V(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
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
  async getTransactionCost(t, e = [], { estimateTxDependencies: n = !0, estimatePredicates: r = !0 } = {}) {
    const s = Te(Ur(t)), i = this.getChain(), { gasPriceFactor: o, minGasPrice: c, maxGasPerTx: d } = this.getGasConfig(), l = dl(s.gasPrice, c), E = s.type === Ce.Script;
    s.hasPredicateInput() && r && (E && (s.gasLimit = Q(0)), await this.estimatePredicates(s));
    const g = s.calculateMinGas(i), C = s.calculateMaxGas(i, g), x = s.getCoinOutputsQuantities(), F = kI(x, e);
    s.fundWithFakeUtxos(F);
    let b = g, v = [];
    E ? (s.gasPrice = Q(0), s.gasLimit = Q(d.sub(C).toNumber() * 0.9), v = (await this.call(s, {
      estimateTxDependencies: n
    })).receipts, b = g0(v)) : b = g;
    const S = zn(
      b,
      l,
      o
    ).normalizeZeroToOne(), J = zn(g, l, o).normalizeZeroToOne(), O = zn(C, l, o).normalizeZeroToOne();
    return {
      requiredQuantities: F,
      receipts: v,
      gasUsed: b,
      minGasPrice: c,
      gasPrice: l,
      minGas: g,
      maxGas: C,
      usedFee: S,
      minFee: J,
      maxFee: O
    };
  }
  async getResourcesForTransaction(t, e, n = []) {
    const r = mt.fromAddressOrString(t), s = Te(Ur(e)), i = await this.getTransactionCost(s, n);
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
  async getCoins(t, e, n) {
    const r = mt.fromAddressOrString(t);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: e && V(e) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: Q(o.amount),
      owner: mt.fromAddressOrString(o.owner),
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
  async getResourcesToSpend(t, e, n) {
    var d, l, E;
    const r = mt.fromAddressOrString(t), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((g) => V(g))) || [],
      utxos: ((l = n == null ? void 0 : n.utxos) == null ? void 0 : l.map((g) => V(g))) || []
    };
    if (this.cache) {
      const g = new Set(
        s.utxos.concat((E = this.cache) == null ? void 0 : E.getActiveData().map((C) => V(C)))
      );
      s.utxos = Array.from(g);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: e.map(qo).map(({ assetId: g, amount: C, max: x }) => ({
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
            sender: mt.fromAddressOrString(g.sender),
            recipient: mt.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: Q(g.amount),
            assetId: g.assetId,
            owner: mt.fromAddressOrString(g.owner),
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
  async getBlock(t) {
    let e;
    typeof t == "number" ? e = { height: Q(t).toString(10) } : t === "latest" ? e = { height: (await this.getBlockNumber()).toString(10) } : t.length === 66 ? e = { blockId: t } : e = { blockId: Q(t).toString(10) };
    const { block: n } = await this.operations.getBlock(e);
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
  async getBlocks(t) {
    const { blocks: e } = await this.operations.getBlocks(t);
    return e.edges.map(({ node: r }) => ({
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
  async getBlockWithTransactions(t) {
    let e;
    typeof t == "number" ? e = { blockHeight: Q(t).toString(10) } : t === "latest" ? e = { blockHeight: (await this.getBlockNumber()).toString() } : e = { blockId: t };
    const { block: n } = await this.operations.getBlockWithTransactions(e);
    return n ? {
      id: n.id,
      height: Q(n.header.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new sn().decode(Y(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    var n;
    const { transaction: e } = await this.operations.getTransaction({ transactionId: t });
    return e ? (n = new sn().decode(
      Y(e.rawPayload),
      0
    )) == null ? void 0 : n[0] : null;
  }
  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(t) {
    const { contract: e } = await this.operations.getContract({ contractId: t });
    return e || null;
  }
  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(t, e) {
    const { contractBalance: n } = await this.operations.getContractBalance({
      contract: mt.fromAddressOrString(t).toB256(),
      asset: V(e)
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
  async getBalance(t, e) {
    const { balance: n } = await this.operations.getBalance({
      owner: mt.fromAddressOrString(t).toB256(),
      assetId: V(e)
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
  async getBalances(t, e) {
    return (await this.operations.getBalances({
      first: 10,
      ...e,
      filter: { owner: mt.fromAddressOrString(t).toB256() }
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
  async getMessages(t, e) {
    return (await this.operations.getMessages({
      first: 10,
      ...e,
      owner: mt.fromAddressOrString(t).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Lr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: Q(s.amount),
        data: s.data
      }),
      sender: mt.fromAddressOrString(s.sender),
      recipient: mt.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: Q(s.amount),
      data: Lr.decodeData(s.data),
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
  async getMessageProof(t, e, n, r) {
    let s = {
      transactionId: t,
      nonce: e
    };
    if (n && r)
      throw new D(
        k.INVALID_INPUT_PARAMETERS,
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
      sender: mt.fromAddressOrString(E),
      recipient: mt.fromAddressOrString(g),
      nonce: e,
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
  async getMessageStatus(t) {
    return (await this.operations.getMessageStatus({ nonce: t })).messageStatus;
  }
  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce
   * @param startTime - The UNIX timestamp to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(t, e) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: Q(t).toString(10),
      startTimestamp: e ? Vm(e) : void 0
    });
    return Q(n);
  }
}, x0 = We;
mo = /* @__PURE__ */ new WeakSet();
Q0 = function(t) {
  this.cache && t.forEach((e) => {
    var n;
    e.type === bt.Coin && ((n = this.cache) == null || n.set(e.id));
  });
};
Wn(x0, "chainInfoCache", {});
Wn(x0, "nodeInfoCache", {});
async function qB(t) {
  var C;
  const { id: e, provider: n, abiMap: r } = t, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: e
  });
  if (!s)
    throw new D(
      k.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${e}.`
    );
  const [i] = new sn().decode(
    Y(s.rawPayload),
    0
  ), o = ((C = s.receipts) == null ? void 0 : C.map(tr)) || [], {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: E }
  } = n.getChain(), g = oi({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: Y(s.rawPayload),
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
async function $B(t) {
  const { provider: e, transactionRequest: n, abiMap: r } = t, { receipts: s } = await e.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c } = e.getGasConfig(), d = e.getChain().consensusParameters.maxInputs, l = n.toTransaction(), E = n.toTransactionBytes();
  return oi({
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
async function WB(t) {
  const { filters: e, provider: n, abiMap: r } = t, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(e), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: E }
  } = n.getChain();
  return {
    transactions: i.map((C) => {
      const { node: x } = C, { id: F, rawPayload: b, receipts: v, status: S } = x, [J] = new sn().decode(Y(b), 0), O = (v == null ? void 0 : v.map(tr)) || [], j = oi({
        id: F,
        receipts: O,
        transaction: J,
        transactionBytes: Y(b),
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
let lt;
const F0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && F0.decode();
let Nr = null;
function v0() {
  return (Nr === null || Nr.byteLength === 0) && (Nr = new Uint8Array(lt.memory.buffer)), Nr;
}
function TI(t, e) {
  return t = t >>> 0, F0.decode(v0().subarray(t, t + e));
}
function D0(t) {
  const e = lt.ret(t);
  return He.__wrap(e);
}
function OI(t, e) {
  const n = lt.retd(t, e);
  return He.__wrap(n);
}
function Fc(t, e, n, r) {
  const s = lt.call(t, e, n, r);
  return He.__wrap(s);
}
function PI(t, e, n) {
  const r = lt.tr(t, e, n);
  return He.__wrap(r);
}
function vc(t, e, n) {
  const r = lt.addi(t, e, n);
  return He.__wrap(r);
}
function UI(t, e, n) {
  const r = lt.muli(t, e, n);
  return He.__wrap(r);
}
function Sr(t, e, n) {
  const r = lt.lw(t, e, n);
  return He.__wrap(r);
}
function GI(t, e, n) {
  const r = lt.gtf(t, e, n);
  return He.__wrap(r);
}
function ds(t, e) {
  const n = lt.movi(t, e);
  return He.__wrap(n);
}
let Rr = null;
function Dc() {
  return (Rr === null || Rr.byteLength === 0) && (Rr = new Int32Array(lt.memory.buffer)), Rr;
}
function HI(t, e) {
  return t = t >>> 0, v0().subarray(t / 1, t / 1 + e);
}
const JI = Object.freeze({
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
class He {
  static __wrap(e) {
    e = e >>> 0;
    const n = Object.create(He.prototype);
    return n.__wbg_ptr = e, n;
  }
  __destroy_into_raw() {
    const e = this.__wbg_ptr;
    return this.__wbg_ptr = 0, e;
  }
  free() {
    const e = this.__destroy_into_raw();
    lt.__wbg_instruction_free(e);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = lt.__wbindgen_add_to_stack_pointer(-16);
      lt.instruction_to_bytes(s, this.__wbg_ptr);
      var e = Dc()[s / 4 + 0], n = Dc()[s / 4 + 1], r = HI(e, n).slice();
      return lt.__wbindgen_free(e, n * 1, 1), r;
    } finally {
      lt.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return lt.instruction_size() >>> 0;
  }
}
class Lt {
  static __wrap(e) {
    e = e >>> 0;
    const n = Object.create(Lt.prototype);
    return n.__wbg_ptr = e, n;
  }
  __destroy_into_raw() {
    const e = this.__wbg_ptr;
    return this.__wbg_ptr = 0, e;
  }
  free() {
    const e = this.__destroy_into_raw();
    lt.__wbg_regid_free(e);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(e) {
    const n = lt.regid_new_checked(e);
    return n === 0 ? void 0 : Lt.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const e = lt.regid_bal();
    return Lt.__wrap(e);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const e = lt.regid_cgas();
    return Lt.__wrap(e);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const e = lt.regid_err();
    return Lt.__wrap(e);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const e = lt.regid_flag();
    return Lt.__wrap(e);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const e = lt.regid_fp();
    return Lt.__wrap(e);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const e = lt.regid_ggas();
    return Lt.__wrap(e);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const e = lt.regid_hp();
    return Lt.__wrap(e);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const e = lt.regid_is();
    return Lt.__wrap(e);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const e = lt.regid_of();
    return Lt.__wrap(e);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const e = lt.regid_one();
    return Lt.__wrap(e);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const e = lt.regid_pc();
    return Lt.__wrap(e);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const e = lt.regid_ret();
    return Lt.__wrap(e);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const e = lt.regid_retl();
    return Lt.__wrap(e);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const e = lt.regid_sp();
    return Lt.__wrap(e);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const e = lt.regid_spp();
    return Lt.__wrap(e);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const e = lt.regid_writable();
    return Lt.__wrap(e);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const e = lt.regid_zero();
    return Lt.__wrap(e);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(e) {
    const n = lt.regid_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const e = this.__destroy_into_raw();
    return lt.regid_to_u8(e);
  }
}
async function ZI(t, e) {
  if (typeof Response == "function" && t instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(t, e);
      } catch (r) {
        if (t.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", r);
        else
          throw r;
      }
    const n = await t.arrayBuffer();
    return await WebAssembly.instantiate(n, e);
  } else {
    const n = await WebAssembly.instantiate(t, e);
    return n instanceof WebAssembly.Instance ? { instance: n, module: t } : n;
  }
}
function YI() {
  const t = {};
  return t.wbg = {}, t.wbg.__wbindgen_throw = function(e, n) {
    throw new Error(TI(e, n));
  }, t;
}
function XI(t, e) {
  return lt = t.exports, N0.__wbindgen_wasm_module = e, Rr = null, Nr = null, lt;
}
async function N0(t) {
  if (lt !== void 0)
    return lt;
  const e = YI(), { instance: n, module: r } = await ZI(await t, e);
  return XI(n, r);
}
function VI(t, e, n, r) {
  function s(g, C, x) {
    var F = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, b = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? F(g, C) : b(g);
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
  if (t) {
    var E = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(E, r) : E;
  } else
    return s(i, r, !1);
}
function jI(t) {
  return VI(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", t);
}
async function na() {
  return await N0(jI());
}
na();
var qI = [
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
], ki = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", $I = (t) => qI.includes(t) ? t : t === "Revert(123)" ? "MismatchedSelector" : "unknown", WI = (t) => {
  if ((t == null ? void 0 : t.type) === "FailureStatus") {
    const e = $I(t.reason);
    return {
      doc: e !== "unknown" ? `${ki}#variant.${e}` : ki,
      reason: e
    };
  }
  return { doc: ki, reason: "unknown" };
};
function Mi(t, e) {
  if (!t)
    throw new D(k.TRANSACTION_ERROR, e);
}
var Nc = {
  [Vf]: "RequireFailed",
  [ku]: "TransferToAddressFailed",
  [jf]: "SendMessageFailed",
  [qf]: "AssertEqFailed",
  [$f]: "AssertFailed",
  [Wf]: "Unknown"
}, zI = (t) => {
  const e = t.val.toHex();
  return Nc[e] ? Nc[e] : void 0;
}, ts = class extends Error {
  /**
   * Creates a new instance of RevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, n) {
    super(`The script reverted with reason ${n}`);
    /**
     * The receipt associated with the revert error.
     */
    N(this, "receipt");
    this.name = "RevertError", this.receipt = e;
  }
  /**
   * Returns a string representation of the RevertError.
   *
   * @returns The string representation of the error.
   */
  toString() {
    const { id: e, ...n } = this.receipt;
    return `${this.name}: ${this.message}
    ${e}: ${JSON.stringify(n)}`;
  }
}, KI = class extends ts {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(t, e) {
    super(t, e), this.name = "RequireRevertError";
  }
}, tw = class extends ts {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(t, e) {
    super(t, e), this.name = "TransferToAddressRevertError";
  }
}, ew = class extends ts {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(t, e) {
    super(t, e), this.name = "SendMessageRevertError";
  }
}, nw = class extends ts {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(t, e) {
    super(t, e), this.name = "AssertFailedRevertError";
  }
}, rw = (t) => {
  const e = zI(t);
  if (e)
    switch (e) {
      case "RequireFailed":
        return new KI(t, e);
      case "TransferToAddressFailed":
        return new tw(t, e);
      case "SendMessageFailed":
        return new ew(t, e);
      case "AssertFailed":
        return new nw(t, e);
      default:
        return new ts(t, e);
    }
}, { warn: sw } = console, iw = (t) => t.filter((e) => e.type === ut.Revert), ow = class {
  constructor(t) {
    N(this, "revertReceipts");
    this.revertReceipts = iw(t);
  }
  assert(t) {
    const e = this.getError();
    if (e)
      throw e.cause = t, e;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && sw(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), rw(this.revertReceipts[0]);
  }
}, aw = (t, e) => typeof e == "bigint" ? e.toString() : e, cw = class extends Error {
  constructor(e, n, r) {
    var c;
    let s = "";
    (c = e == null ? void 0 : e.gqlTransaction) != null && c.status && (s = `${JSON.stringify(WI(e.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      e.receipts.map(({ type: d, ...l }) => ({ type: ut[d], ...l })),
      aw,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    N(this, "logs");
    this.logs = r, new ow(e.receipts).assert(this);
  }
}, ze, nA, S0 = (nA = class {
  constructor(...t) {
    Ee(this, ze, void 0);
    De(this, ze, t || []);
  }
  entries() {
    return Qt(this, ze);
  }
  push(...t) {
    Qt(this, ze).push(...t);
  }
  concat(t) {
    return Qt(this, ze).concat(t);
  }
  extend(t) {
    Qt(this, ze).push(...t);
  }
  toBytes() {
    return dt(
      Qt(this, ze).reduce((t, e) => (t.push(e.to_bytes()), t), [])
    );
  }
  toHex() {
    return V(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Qt(this, ze), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, ze = new WeakMap(), nA), Aw = (t) => Go + Ws({ maxInputs: t }), R0 = st + kr + Ff + st + st;
function uw(t) {
  const e = [...t.receipts];
  let n, r;
  if (e.forEach((i) => {
    i.type === ut.ScriptResult ? n = i : (i.type === ut.Return || i.type === ut.ReturnData || i.type === ut.Revert) && (r = i);
  }), !n)
    throw new D(
      k.TRANSACTION_ERROR,
      "The script call result does not contain a 'scriptResultReceipt'."
    );
  if (!r)
    throw new D(
      k.TRANSACTION_ERROR,
      "The script call result does not contain a 'returnReceipt'."
    );
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: e,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: t
  };
}
function ra(t, e, n = []) {
  try {
    const r = uw(t);
    return e(r);
  } catch (r) {
    throw new cw(
      t,
      r.message,
      n
    );
  }
}
function dw(t, e, n) {
  return ra(
    t,
    (r) => {
      if (r.returnReceipt.type === ut.Revert)
        throw new D(
          k.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ut.Return && r.returnReceipt.type !== ut.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new D(
          k.SCRIPT_REVERTED,
          `Script Return Type [${i}] Invalid. Logs: ${JSON.stringify({
            logs: n,
            receipt: r.returnReceipt
          })}`
        );
      }
      let s;
      return r.returnReceipt.type === ut.Return && (s = r.returnReceipt.val), r.returnReceipt.type === ut.ReturnData && (s = e.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var Hr = class {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(t, e, n) {
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
    this.bytes = Y(t), this.scriptDataEncoder = e, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(t, e) {
    return Ws({ maxInputs: e }) + Go + t;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(t) {
    return Hr.getScriptDataOffsetWithScriptBytes(this.bytes.length, t);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(t) {
    const e = this.scriptDataEncoder(t);
    return ArrayBuffer.isView(e) ? e : (this.bytes = Y(e.script), e.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(t, e = []) {
    return ra(t, this.scriptResultDecoder, e);
  }
}, _0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, hw = kt, k0 = ({ callDataOffset: t, gasForwardedOffset: e, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new S0(
    ds(16, t),
    ds(17, n),
    Sr(17, 17, 0),
    ds(18, r)
  );
  return e ? i.push(
    ds(19, e),
    Sr(19, 19, 0),
    Fc(16, 17, 18, 19)
  ) : i.push(Fc(16, 17, 18, Lt.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Sr(21, Lt.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Sr(22, Lt.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    UI(22, 22, s.encodedLength),
    OI(21, 22)
  ]), i;
};
function Sc(t, e) {
  if (!t.length)
    return new Uint8Array();
  const n = new S0();
  for (let r = 0; r < t.length; r += 1)
    n.extend(k0(t[r], e[r]).entries());
  return n.push(D0(1)), n.toBytes();
}
var Rc = (t) => t === ut.Return || t === ut.ReturnData, lw = (t, e) => t.find(
  ({ type: n, from: r, to: s }) => n === ut.Call && r === hw && s === e
), fw = (t, e) => (n) => {
  if (Ke(n.code) !== 0)
    throw new D(
      k.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${t} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = lw(
    n.receipts,
    t.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => Rc(o)).flatMap((o, c, d) => {
    var l;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === ut.Return)
      return [new R().encode(o.val)];
    if (o.type === ut.ReturnData) {
      const E = Y(o.data);
      if (e && Rc((l = d[c + 1]) == null ? void 0 : l.type)) {
        const g = d[c + 1];
        return dt([E, Y(g.data)]);
      }
      return [E];
    }
    return [new Uint8Array()];
  });
}, gw = (t, e, n, r = []) => ra(t, fw(e, n), r), pw = (t) => t.reduce(
  (e, n) => {
    const r = { ..._0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return e + k0(r, s).byteLength();
  },
  He.size()
  // placeholder for single RET instruction which is added later
), mw = (t) => t.map((e) => {
  const { func: n } = e.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), _c = (t, e) => new Hr(
  // Script to call the contract, start with stub size matching length of calls
  Sc(
    new Array(t.length).fill(_0),
    mw(t)
  ),
  (n) => {
    var F;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = pw(n), i = (8 - s % 8) % 8, o = s + i, c = Aw(e.toNumber()) + o, d = [];
    let l = c;
    const E = [], g = [];
    for (let b = 0; b < r; b += 1) {
      const v = n[b];
      E.push({
        isHeap: v.isOutputDataHeap,
        encodedLength: v.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: l,
        assetIdOffset: l + st,
        gasForwardedOffset: v.gas ? l + st + kr : 0,
        callDataOffset: l + st + kr + S
      }), g.push(new R().encode(v.amount || 0)), g.push(new G().encode(((F = v.assetId) == null ? void 0 : F.toString()) || Ie)), g.push(v.contractId.toBytes()), g.push(new R().encode(v.fnSelector)), v.gas && (g.push(new R().encode(v.gas)), S = st), v.isInputDataPointer) {
        const O = l + R0 + S;
        g.push(new R().encode(O));
      }
      const J = Y(v.data);
      g.push(J), l = c + dt(g).byteLength;
    }
    const C = Sc(d, E);
    return { data: dt(g), script: C };
  },
  () => [new Uint8Array()]
);
function Iw(t) {
  const e = t.receipts.find((n) => n.type === ut.ScriptResult);
  return (e == null ? void 0 : e.gasUsed) || Q(0);
}
var M0 = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, e, n) {
    N(this, "functionScopes");
    N(this, "isMultiCall");
    N(this, "gasUsed");
    N(this, "value");
    this.functionScopes = Array.isArray(t) ? t : [t], this.isMultiCall = n, this.value = this.getDecodedValue(e), this.gasUsed = Iw(e);
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
  getDecodedValue(t) {
    const e = this.getDecodedLogs(t.receipts), n = this.getFirstCallConfig();
    if (this.functionScopes.length === 1 && n && "bytes" in n.program)
      return dw(t, n, e);
    const s = gw(
      t,
      (n == null ? void 0 : n.program).id,
      (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1,
      e
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
  getDecodedLogs(t) {
    const e = this.getFirstCallConfig();
    if (!e)
      return [];
    const { program: n } = e;
    return RI(t, n.interface);
  }
}, L0 = class extends M0 {
  /**
   * Constructs an instance of FunctionInvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param transactionResponse - The transaction response.
   * @param transactionResult - The transaction result.
   * @param program - The program.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, n, r, s, i) {
    super(e, r, i);
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
  static async build(e, n, r, s) {
    const i = await n.waitForResult();
    return new L0(
      e,
      n,
      i,
      s,
      r
    );
  }
}, Io = class extends M0 {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, n, r) {
    super(e, n, r);
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
  static async build(e, n, r) {
    return await new Io(e, n, r);
  }
};
function ww(t, e) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = t.getCallConfig(), c = t.getCallConfig().func.isInputDataPointer ? R0 : 0, d = i.encodeArguments(r, e + c);
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
var T0 = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(t, e) {
    N(this, "transactionRequest");
    N(this, "program");
    N(this, "functionInvocationScopes", []);
    N(this, "txParameters");
    N(this, "requiredCoins", []);
    N(this, "isMultiCall", !1);
    this.program = t, this.isMultiCall = e, this.transactionRequest = new Kn();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const e = this.getProvider().getChain().consensusParameters;
    if (!e)
      throw new D(
        D.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = e.maxInputs, r = _c(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => ww(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const t = this.program.provider.getChain().consensusParameters.maxInputs, e = _c(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(e, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((e) => {
      e.contractId && this.transactionRequest.addContractInputAndOutput(e.contractId);
    });
  }
  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
  getRequiredCoins() {
    return this.calls.map((e) => ({
      assetId: String(e.assetId),
      amount: Q(e.amount || 0)
    })).filter(({ assetId: e, amount: n }) => e && !Q(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const t = this.getRequiredCoins(), e = (n, { assetId: r, amount: s }) => {
      var o;
      const i = ((o = n.get(r)) == null ? void 0 : o.amount) || Q(0);
      return n.set(r, {
        assetId: String(r),
        amount: i.add(s)
      });
    };
    this.requiredCoins = Array.from(
      t.reduce(e, /* @__PURE__ */ new Map()).values()
    );
  }
  /**
   * Adds a single call to the invocation scope.
   *
   * @param funcScope - The function scope to add.
   * @returns The current instance of the class.
   */
  addCall(t) {
    return this.addCalls([t]), this;
  }
  /**
   * Adds multiple calls to the invocation scope.
   *
   * @param funcScopes - An array of function scopes to add.
   * @returns The current instance of the class.
   */
  addCalls(t) {
    return this.functionInvocationScopes.push(...t), this.updateContractInputAndOutput(), this.updateRequiredCoins(), this;
  }
  /**
   * Prepares the transaction by updating the script request, required coins, and checking the gas limit.
   */
  async prepareTransaction() {
    await na(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const t = this.calls.reduce((e, n) => e.add(n.gas || 0), Q(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = t;
    else if (t.gt(this.transactionRequest.gasLimit))
      throw new D(
        k.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost ny dry running the transaction.
   *
   * @param options - Optional transaction cost options.
   * @returns The transaction cost details.
   */
  async getTransactionCost(t) {
    const e = this.getProvider(), n = await this.getTransactionRequest();
    return n.gasPrice = Q(Ke(n.gasPrice) || Ke((t == null ? void 0 : t.gasPrice) || 0)), await e.getTransactionCost(n, this.getRequiredCoins());
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins(t) {
    var e;
    return this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (n) => n.type !== bt.Coin
    ), await ((e = this.program.account) == null ? void 0 : e.fund(this.transactionRequest, this.requiredCoins, t)), this;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(t) {
    var r;
    this.txParameters = t;
    const e = this.transactionRequest, { minGasPrice: n } = this.getProvider().getGasConfig();
    return e.gasPrice = Q(t.gasPrice || e.gasPrice || n), e.gasLimit = Q(t.gasLimit || e.gasLimit), e.maxFee = t.maxFee ? Q(t.maxFee) : e.maxFee, e.witnessLimit = t.witnessLimit ? Q(t.witnessLimit) : e.witnessLimit, e.maturity = t.maturity || e.maturity, e.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
  }
  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(t) {
    return t.forEach((e) => {
      this.transactionRequest.addContractInputAndOutput(e.id), this.program.interface.updateExternalLoggedTypes(e.id.toB256(), e.interface);
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
    Mi(this.program.account, "Wallet is required!");
    const t = await this.getTransactionRequest(), { maxFee: e } = await this.getTransactionCost();
    await this.fundWithRequiredCoins(e);
    const n = await this.program.account.sendTransaction(t, {
      awaitExecution: !0
    });
    return L0.build(
      this.functionInvocationScopes,
      n,
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
    if (Mi(this.program.account, "Wallet is required!"), !this.program.account.populateTransactionWitnessesSignature)
      return this.dryRun();
    const e = await this.getTransactionRequest(), { maxFee: n } = await this.getTransactionCost();
    await this.fundWithRequiredCoins(n);
    const r = await this.program.account.simulateTransaction(e);
    return Io.build(this.functionInvocationScopes, r, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    Mi(this.program.account, "Wallet is required!");
    const t = this.getProvider(), e = await this.getTransactionRequest(), { maxFee: n } = await this.getTransactionCost();
    await this.fundWithRequiredCoins(n);
    const r = await t.call(e, {
      utxoValidation: !1
    });
    return await Io.build(
      this.functionInvocationScopes,
      r,
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
  async getTransactionId(t) {
    const e = t ?? await this.getProvider().getChainId();
    return (await this.getTransactionRequest()).getTransactionId(e);
  }
}, O0 = class extends T0 {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(e, n, r) {
    super(e, !1);
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
      args: this.args
    };
  }
  /**
   * Sets the arguments for the function invocation.
   *
   * @param args - The arguments.
   * @returns The instance of FunctionInvocationScope.
   */
  setArguments(...e) {
    return this.args = e || [], this;
  }
  /**
   * Sets the call parameters for the function invocation.
   *
   * @param callParams - The call parameters.
   * @returns The instance of FunctionInvocationScope.
   * @throws If the function is not payable and forward is set.
   */
  callParams(e) {
    if (this.callParameters = e, e != null && e.forward) {
      if (!this.func.attributes.find((n) => n.name === "payable"))
        throw new D(
          k.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = qo(e.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, Ew = class extends T0 {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(t, e) {
    super(t, !0), this.addCalls(e), this.validateHeapTypeReturnCalls();
  }
  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCall(t) {
    return super.addCalls([t]);
  }
  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCalls(t) {
    return super.addCalls(t);
  }
  validateHeapTypeReturnCalls() {
    let t = -1, e = 0;
    this.calls.forEach((s, i) => {
      const { isOutputDataHeap: o } = s;
      if (o && (t = i, ++e > 1))
        throw new D(
          k.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = t !== -1, r = t === this.calls.length - 1;
    if (n && !r)
      throw new D(
        k.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, Bw = class {
  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(t, e, n) {
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
    this.interface = e instanceof Qn ? e : new Qn(e), this.id = mt.fromAddressOrString(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
  buildFunction(t) {
    return (...e) => new O0(this, t, e);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(t) {
    return new Ew(this, t);
  }
  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  // #region contract-balance-1
  getBalance(t) {
    return this.provider.getContractBalance(this.id, t);
  }
  // #endregion contract-balance-1
}, yw = class extends O0 {
  constructor() {
    super(...arguments);
    N(this, "scriptRequest");
  }
  updateScriptRequest() {
    this.scriptRequest || this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  buildScriptRequest() {
    const e = this.program.bytes, n = this.program.provider.getChain();
    if (!n)
      throw new D(
        D.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.maxInputs.toNumber(), s = new Et(e.length).encodedLength;
    this.scriptRequest = new Hr(
      e,
      (i) => this.func.encodeArguments(
        i,
        Hr.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, zB = class extends Zf {
  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(e, n, r) {
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
    this.bytes = Y(e), this.interface = new Qn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new yw(this, this.interface.getFunction("main"), s)
    };
  }
  /**
   * Set the configurable constants of the script.
   *
   * @param configurables - An object containing the configurable constants and their values.
   * @throws Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.
   * @returns This instance of the `Script`.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new Error("The script does not have configurable constants to be set");
      Object.entries(e).forEach(([n, r]) => {
        if (!this.interface.configurables[n])
          throw new Error(`The script does not have a configurable constant named: '${n}'`);
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r);
        this.bytes.set(i, s);
      });
    } catch (n) {
      throw new D(
        k.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new Hr(
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
function KB(t) {
  return t;
}
var Cw = /* @__PURE__ */ ((t) => (t.build = "build", t.deploy = "deploy", t.dev = "dev", t.init = "init", t))(Cw || {}), bw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
function Ar(t) {
  return Mt(t);
}
var Qw = class {
  constructor(t, e, n, r, s, i = 0) {
    N(this, "left");
    N(this, "right");
    N(this, "parent");
    N(this, "hash");
    N(this, "data");
    N(this, "index");
    this.left = t, this.right = e, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, kc = Qw;
function xw(t) {
  return Ar("0x00".concat(t.slice(2)));
}
function Fw(t, e) {
  return Ar("0x01".concat(t.slice(2)).concat(e.slice(2)));
}
function P0(t) {
  if (!t.length)
    return bw;
  const e = [];
  for (let i = 0; i < t.length; i += 1) {
    const o = xw(t[i]);
    e.push(new kc(-1, -1, -1, o, t[i]));
  }
  let n = e, r = e.length + 1 >> 1, s = e.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = Fw(n[o].hash, n[o + 1].hash);
      e[i] = new kc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (e[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = e;
  }
  return e[0].hash;
}
var vw = "0x00", U0 = "0x01";
function Dw(t, e) {
  const n = "0x00".concat(t.slice(2)).concat(Ar(e).slice(2));
  return [Ar(n), n];
}
function Gn(t, e) {
  const n = "0x01".concat(t.slice(2)).concat(e.slice(2));
  return [Ar(n), n];
}
function Li(t) {
  const e = U0.length;
  return ["0x".concat(t.slice(e, e + 64)), "0x".concat(t.slice(e + 64))];
}
function Nw(t) {
  const e = U0.length;
  return ["0x".concat(t.slice(e, e + 64)), "0x".concat(t.slice(e + 64))];
}
function Ti(t) {
  return t.slice(0, 4) === vw;
}
var Sw = class {
  constructor(t, e, n, r, s) {
    N(this, "SideNodes");
    N(this, "NonMembershipLeafData");
    N(this, "BitMask");
    N(this, "NumSideNodes");
    N(this, "SiblingData");
    this.SideNodes = t, this.NonMembershipLeafData = e, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, Rw = Sw, _w = class {
  constructor(t, e, n) {
    N(this, "SideNodes");
    N(this, "NonMembershipLeafData");
    N(this, "SiblingData");
    this.SideNodes = t, this.NonMembershipLeafData = e, this.SiblingData = n;
  }
}, kw = _w, Ne = "0x0000000000000000000000000000000000000000000000000000000000000000", nn = 256;
function Vn(t, e) {
  const n = t.slice(2), r = "0x".concat(
    n.slice(Math.floor(e / 8) * 2, Math.floor(e / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - e % 8) > 0 ? 1 : 0;
}
function Mw(t) {
  let e = 0, n = t.length - 1;
  const r = t;
  for (; e < n; )
    [r[e], r[n]] = [
      r[n],
      r[e]
    ], e += 1, n -= 1;
  return r;
}
function Lw(t, e) {
  let n = 0;
  for (let r = 0; r < nn && Vn(t, r) === Vn(e, r); r += 1)
    n += 1;
  return n;
}
function Tw(t) {
  const e = [], n = [];
  let r;
  for (let i = 0; i < t.SideNodes.length; i += 1)
    r = t.SideNodes[i], r === Ne ? e.push(0) : (n.push(r), e.push(1));
  return new Rw(
    n,
    t.NonMembershipLeafData,
    e,
    t.SideNodes.length,
    t.SiblingData
  );
}
var Ow = class {
  constructor() {
    N(this, "ms");
    N(this, "root");
    const t = {};
    this.ms = t, this.root = Ne, this.ms[this.root] = Ne;
  }
  get(t) {
    return this.ms[t];
  }
  set(t, e) {
    this.ms[t] = e;
  }
  setRoot(t) {
    this.root = t;
  }
  sideNodesForRoot(t, e) {
    const n = [];
    if (e === Ne)
      return [n, Ne, "", ""];
    let r = this.get(e);
    if (Ti(r))
      return [n, e, r, ""];
    let s, i, o = "", c = "";
    for (let l = 0; l < nn; l += 1) {
      if ([s, i] = Nw(r), Vn(t, l) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Ne) {
        r = "";
        break;
      }
      if (r = this.get(o), Ti(r))
        break;
    }
    const d = this.get(c);
    return [Mw(n), o, r, d];
  }
  deleteWithSideNodes(t, e, n, r) {
    if (n === Ne)
      return this.root;
    const [s] = Li(r);
    if (s !== t)
      return this.root;
    let i = "", o = "", c = "", d = "", l = !1;
    for (let E = 0; E < e.length; E += 1)
      if (e[E] !== "") {
        if (c = e[E], o === "")
          if (d = this.get(c), Ti(d)) {
            i = c, o = c;
            continue;
          } else
            o = Ne, l = !0;
        !l && c === Ne || (l || (l = !0), Vn(t, e.length - 1 - E) === 1 ? [i, o] = Gn(c, o) : [i, o] = Gn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Ne), i;
  }
  updateWithSideNodes(t, e, n, r, s) {
    let i, o;
    this.set(Ar(e), e), [i, o] = Dw(t, e), this.set(i, o), o = i;
    let c;
    if (r === Ne)
      c = nn;
    else {
      const [d] = Li(s);
      c = Lw(t, d);
    }
    c !== nn && (Vn(t, c) === 1 ? [i, o] = Gn(r, o) : [i, o] = Gn(o, r), this.set(i, o), o = i);
    for (let d = 0; d < nn; d += 1) {
      let l;
      const E = nn - n.length;
      if (d - E < 0 || n[d - E] === "")
        if (c !== nn && c > nn - 1 - d)
          l = Ne;
        else
          continue;
      else
        l = n[d - E];
      Vn(t, nn - 1 - d) === 1 ? [i, o] = Gn(l, o) : [i, o] = Gn(o, l), this.set(i, o), o = i;
    }
    return i;
  }
  update(t, e) {
    const [n, r, s] = this.sideNodesForRoot(t, this.root), i = this.updateWithSideNodes(t, e, n, r, s);
    this.setRoot(i);
  }
  delete(t) {
    const [e, n, r] = this.sideNodesForRoot(t, this.root), s = this.deleteWithSideNodes(t, e, n, r);
    this.setRoot(s);
  }
  prove(t) {
    const [e, n, r, s] = this.sideNodesForRoot(t, this.root), i = [];
    for (let d = 0; d < e.length; d += 1)
      e[d] !== "" && i.push(e[d]);
    let o = "";
    if (n !== Ne) {
      const [d] = Li(r);
      d !== t && (o = r);
    }
    return new kw(i, o, s);
  }
  proveCompacted(t) {
    const e = this.prove(t);
    return Tw(e);
  }
}, Pw = Object.defineProperty, Uw = (t, e) => {
  for (var n in e)
    Pw(t, n, { get: e[n], enumerable: !0 });
}, Gw = {};
Uw(Gw, {
  getContractId: () => J0,
  getContractRoot: () => G0,
  getContractStorageRoot: () => H0,
  hexlifyWithPrefix: () => wo
});
var G0 = (t) => {
  const n = Y(t), r = iA(n, 16384);
  return P0(r.map((s) => V(s)));
}, H0 = (t) => {
  const e = new Ow();
  return t.forEach(({ key: n, value: r }) => e.update(Mt(n), r)), e.root;
}, J0 = (t, e, n) => {
  const r = G0(Y(t));
  return Mt(_e(["0x4655454C", e, r, n]));
}, wo = (t, e = !1) => {
  if (t.startsWith("0x"))
    return V(t);
  if (e)
    return V(`0x${t}`);
  throw new D(D.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${t}.`);
}, Hw = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(t, e, n = null) {
    N(this, "bytecode");
    N(this, "interface");
    N(this, "provider");
    N(this, "account");
    this.bytecode = Y(t), e instanceof Qn ? this.interface = e : this.interface = new Qn(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(t) {
    return new Hw(this.bytecode, this.interface, t);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(t) {
    var o;
    const e = (o = t == null ? void 0 : t.storageSlots) == null ? void 0 : o.map(({ key: c, value: d }) => ({
      key: wo(c, !0),
      value: wo(d, !0)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: bn(32),
      ...t,
      storageSlots: e || []
    };
    if (!this.provider)
      throw new D(
        k.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || H0(n.storageSlots), s = J0(this.bytecode, n.salt, r), i = new go({
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
  async deployContract(t = {}) {
    if (!this.account)
      throw new D(k.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: e } = t;
    e && this.setConfigurableConstants(e);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(t), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new Bw(n, this.interface, this.account);
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
      Object.entries(t).forEach(([n, r]) => {
        if (!this.interface.configurables[n])
          throw new Error(`Contract does not have a configurable named: '${n}'`);
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = Y(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (e) {
      throw new D(
        k.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${e.message}.`
      );
    }
  }
}, ty = 9, ey = 3, ny = 9, hs = [
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
function Eo(t) {
  const e = t.normalize("NFKD"), n = [];
  for (let r = 0; r < e.length; r += 1) {
    const s = e.charCodeAt(r);
    if (s < 128)
      n.push(s);
    else if (s < 2048)
      n.push(s >> 6 | 192), n.push(s & 63 | 128);
    else if ((s & 64512) === 55296) {
      r += 1;
      const i = e.charCodeAt(r);
      if (r >= e.length || (i & 64512) !== 56320)
        throw new D(
          k.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return Uint8Array.from(n);
}
function Jw(t) {
  return (1 << t) - 1;
}
function Z0(t) {
  return (1 << t) - 1 << 8 - t;
}
function Oi(t) {
  return Array.isArray(t) ? t : t.split(/\s+/);
}
function Zw(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
function Yw(t) {
  const e = [0];
  let n = 11;
  for (let i = 0; i < t.length; i += 1)
    n > 8 ? (e[e.length - 1] <<= 8, e[e.length - 1] |= t[i], n -= 8) : (e[e.length - 1] <<= n, e[e.length - 1] |= t[i] >> 8 - n, e.push(t[i] & Jw(8 - n)), n += 3);
  const r = t.length / 4, s = Y(Mt(t))[0] & Z0(r);
  return e[e.length - 1] <<= r, e[e.length - 1] |= s >> 8 - r, e;
}
function Xw(t, e) {
  const n = Math.ceil(11 * t.length / 8), r = Y(new Uint8Array(n));
  let s = 0;
  for (let l = 0; l < t.length; l += 1) {
    const E = e.indexOf(t[l].normalize("NFKD"));
    if (E === -1)
      throw new D(
        k.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${t[l]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      E & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * t.length / 3, o = t.length / 3, c = Z0(o);
  if ((Y(Mt(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new D(
      k.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Vw = Eo("Bitcoin seed"), jw = "0x0488ade4", qw = "0x04358394", Mc = [12, 15, 18, 21, 24];
function Lc(t) {
  if (t.length !== 2048)
    throw new D(
      k.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${t.length}.`
    );
}
function $w(t) {
  if (t.length % 4 !== 0 || t.length < 16 || t.length > 32)
    throw new D(
      k.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${t.length} bytes.`
    );
}
function Pi(t) {
  if (!Mc.includes(t.length)) {
    const e = `Invalid mnemonic size. Expected one of [${Mc.join(
      ", "
    )}] words, but got ${t.length}.`;
    throw new D(k.INVALID_MNEMONIC, e);
  }
}
var gn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(t = hs) {
    N(this, "wordlist");
    this.wordlist = t, Lc(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(t) {
    return gn.mnemonicToEntropy(t, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(t) {
    return gn.entropyToMnemonic(t, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(t, e = hs) {
    const n = Oi(t);
    return Pi(n), V(Xw(n, e));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(t, e = hs) {
    const n = Y(t);
    return Lc(e), $w(n), Yw(n).map((r) => e[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(t, e = "") {
    Pi(Oi(t));
    const n = Eo(Zw(t)), r = Eo(`mnemonic${e}`);
    return mr(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(t, e = "") {
    const n = gn.mnemonicToSeed(t, e);
    return gn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(t) {
    const e = Oi(t);
    let n = 0;
    try {
      Pi(e);
    } catch {
      return !1;
    }
    for (; n < e.length; ) {
      if (gn.binarySearch(e[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(t) {
    const e = hs;
    let n = 0, r = e.length - 1;
    for (; n <= r; ) {
      const s = Math.floor((n + r) / 2);
      if (e[s] === t)
        return !0;
      t < e[s] ? r = s - 1 : n = s + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(t) {
    const e = Y(t);
    if (e.length < 16 || e.length > 64)
      throw new D(
        k.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${e.length} bytes.`
      );
    return Y(pr("sha512", Vw, e));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(t, e = !1) {
    const n = gn.masterKeysFromSeed(t), r = Y(e ? qw : jw), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), l = _e([
      r,
      s,
      i,
      o,
      c,
      _e(["0x00", d])
    ]), E = xo(Mt(Mt(l)), 0, 4);
    return uA(_e([l, E]));
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
  static generate(t = 32, e = "") {
    const n = e ? Mt(_e([bn(t), Y(e)])) : bn(t);
    return gn.entropyToMnemonic(n);
  }
}, Y0 = gn;
function Tc(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error(`Wrong positive integer: ${t}`);
}
function Ww(t) {
  return t instanceof Uint8Array || t != null && typeof t == "object" && t.constructor.name === "Uint8Array";
}
function X0(t, ...e) {
  if (!Ww(t))
    throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(t.length))
    throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
}
function zw(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Tc(t.outputLen), Tc(t.blockLen);
}
function Us(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
function Kw(t, e) {
  X0(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Ui = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function V0(t) {
  return t instanceof Uint8Array || t != null && typeof t == "object" && t.constructor.name === "Uint8Array";
}
const Gi = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), $e = (t, e) => t << 32 - e | t >>> e, tE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!tE)
  throw new Error("Non little-endian hardware is not supported");
function eE(t) {
  if (typeof t != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof t}`);
  return new Uint8Array(new TextEncoder().encode(t));
}
function sa(t) {
  if (typeof t == "string" && (t = eE(t)), !V0(t))
    throw new Error(`expected Uint8Array, got ${typeof t}`);
  return t;
}
function nE(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    if (!V0(s))
      throw new Error("Uint8Array expected");
    e += s.length;
  }
  const n = new Uint8Array(e);
  for (let r = 0, s = 0; r < t.length; r++) {
    const i = t[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
class j0 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function rE(t) {
  const e = (r) => t().update(sa(r)).digest(), n = t();
  return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e;
}
function sE(t = 32) {
  if (Ui && typeof Ui.getRandomValues == "function")
    return Ui.getRandomValues(new Uint8Array(t));
  throw new Error("crypto.getRandomValues must be defined");
}
function iE(t, e, n, r) {
  if (typeof t.setBigUint64 == "function")
    return t.setBigUint64(e, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  t.setUint32(e + d, o, r), t.setUint32(e + l, c, r);
}
class oE extends j0 {
  constructor(e, n, r, s) {
    super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = Gi(this.buffer);
  }
  update(e) {
    Us(this);
    const { view: n, buffer: r, blockLen: s } = this;
    e = sa(e);
    const i = e.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Gi(e);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(e.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Us(this), Kw(e, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    iE(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Gi(e), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, E = this.get();
    if (l > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
      c.setUint32(4 * g, E[g], i);
  }
  digest() {
    const { buffer: e, outputLen: n } = this;
    this.digestInto(e);
    const r = e.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: n, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return e.length = s, e.pos = c, e.finished = i, e.destroyed = o, s % n && e.buffer.set(r), e;
  }
}
const aE = (t, e, n) => t & e ^ ~t & n, cE = (t, e, n) => t & e ^ t & n ^ e & n, AE = /* @__PURE__ */ new Uint32Array([
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
class uE extends oE {
  constructor() {
    super(64, 32, 8, !1), this.A = hn[0] | 0, this.B = hn[1] | 0, this.C = hn[2] | 0, this.D = hn[3] | 0, this.E = hn[4] | 0, this.F = hn[5] | 0, this.G = hn[6] | 0, this.H = hn[7] | 0;
  }
  get() {
    const { A: e, B: n, C: r, D: s, E: i, F: o, G: c, H: d } = this;
    return [e, n, r, s, i, o, c, d];
  }
  // prettier-ignore
  set(e, n, r, s, i, o, c, d) {
    this.A = e | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = d | 0;
  }
  process(e, n) {
    for (let g = 0; g < 16; g++, n += 4)
      ln[g] = e.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const C = ln[g - 15], x = ln[g - 2], F = $e(C, 7) ^ $e(C, 18) ^ C >>> 3, b = $e(x, 17) ^ $e(x, 19) ^ x >>> 10;
      ln[g] = b + ln[g - 7] + F + ln[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: E } = this;
    for (let g = 0; g < 64; g++) {
      const C = $e(c, 6) ^ $e(c, 11) ^ $e(c, 25), x = E + C + aE(c, d, l) + AE[g] + ln[g] | 0, b = ($e(r, 2) ^ $e(r, 13) ^ $e(r, 22)) + cE(r, s, i) | 0;
      E = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, l, E);
  }
  roundClean() {
    ln.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const dE = /* @__PURE__ */ rE(() => new uE());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const q0 = BigInt(0), ai = BigInt(1), hE = BigInt(2);
function tn(t) {
  return t instanceof Uint8Array || t != null && typeof t == "object" && t.constructor.name === "Uint8Array";
}
const lE = /* @__PURE__ */ Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function ur(t) {
  if (!tn(t))
    throw new Error("Uint8Array expected");
  let e = "";
  for (let n = 0; n < t.length; n++)
    e += lE[t[n]];
  return e;
}
function $0(t) {
  const e = t.toString(16);
  return e.length & 1 ? `0${e}` : e;
}
function ia(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  return BigInt(t === "" ? "0" : `0x${t}`);
}
const en = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Oc(t) {
  if (t >= en._0 && t <= en._9)
    return t - en._0;
  if (t >= en._A && t <= en._F)
    return t - (en._A - 10);
  if (t >= en._a && t <= en._f)
    return t - (en._a - 10);
}
function dr(t) {
  if (typeof t != "string")
    throw new Error("hex string expected, got " + typeof t);
  const e = t.length, n = e / 2;
  if (e % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Oc(t.charCodeAt(i)), c = Oc(t.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = t[i] + t[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function kn(t) {
  return ia(ur(t));
}
function oa(t) {
  if (!tn(t))
    throw new Error("Uint8Array expected");
  return ia(ur(Uint8Array.from(t).reverse()));
}
function hr(t, e) {
  return dr(t.toString(16).padStart(e * 2, "0"));
}
function aa(t, e) {
  return hr(t, e).reverse();
}
function fE(t) {
  return dr($0(t));
}
function Ye(t, e, n) {
  let r;
  if (typeof e == "string")
    try {
      r = dr(e);
    } catch (i) {
      throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${i}`);
    }
  else if (tn(e))
    r = Uint8Array.from(e);
  else
    throw new Error(`${t} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${t} expected ${n} bytes, got ${s}`);
  return r;
}
function Jr(...t) {
  let e = 0;
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    if (!tn(i))
      throw new Error("Uint8Array expected");
    e += i.length;
  }
  let n = new Uint8Array(e), r = 0;
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    n.set(i, r), r += i.length;
  }
  return n;
}
function gE(t, e) {
  if (t.length !== e.length)
    return !1;
  let n = 0;
  for (let r = 0; r < t.length; r++)
    n |= t[r] ^ e[r];
  return n === 0;
}
function pE(t) {
  if (typeof t != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof t}`);
  return new Uint8Array(new TextEncoder().encode(t));
}
function mE(t) {
  let e;
  for (e = 0; t > q0; t >>= ai, e += 1)
    ;
  return e;
}
function IE(t, e) {
  return t >> BigInt(e) & ai;
}
const wE = (t, e, n) => t | (n ? ai : q0) << BigInt(e), ca = (t) => (hE << BigInt(t - 1)) - ai, Hi = (t) => new Uint8Array(t), Pc = (t) => Uint8Array.from(t);
function W0(t, e, n) {
  if (typeof t != "number" || t < 2)
    throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Hi(t), s = Hi(t), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...g) => n(s, r, ...g), d = (g = Hi()) => {
    s = c(Pc([0]), g), r = c(), g.length !== 0 && (s = c(Pc([1]), g), r = c());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const C = [];
    for (; g < e; ) {
      r = c();
      const x = r.slice();
      C.push(x), g += r.length;
    }
    return Jr(...C);
  };
  return (g, C) => {
    o(), d(g);
    let x;
    for (; !(x = C(l())); )
      d();
    return o(), x;
  };
}
const EE = {
  bigint: (t) => typeof t == "bigint",
  function: (t) => typeof t == "function",
  boolean: (t) => typeof t == "boolean",
  string: (t) => typeof t == "string",
  stringOrUint8Array: (t) => typeof t == "string" || tn(t),
  isSafeInteger: (t) => Number.isSafeInteger(t),
  array: (t) => Array.isArray(t),
  field: (t, e) => e.Fp.isValid(t),
  hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen)
};
function es(t, e, n = {}) {
  const r = (s, i, o) => {
    const c = EE[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const d = t[s];
    if (!(o && d === void 0) && !c(d, t))
      throw new Error(`Invalid param ${String(s)}=${d} (${typeof d}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(e))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return t;
}
const BE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: IE,
  bitLen: mE,
  bitMask: ca,
  bitSet: wE,
  bytesToHex: ur,
  bytesToNumberBE: kn,
  bytesToNumberLE: oa,
  concatBytes: Jr,
  createHmacDrbg: W0,
  ensureBytes: Ye,
  equalBytes: gE,
  hexToBytes: dr,
  hexToNumber: ia,
  isBytes: tn,
  numberToBytesBE: hr,
  numberToBytesLE: aa,
  numberToHexUnpadded: $0,
  numberToVarBytesBE: fE,
  utf8ToBytes: pE,
  validateObject: es
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pe = BigInt(0), Pt = BigInt(1), Nn = BigInt(2), yE = BigInt(3), Bo = BigInt(4), Uc = BigInt(5), Gc = BigInt(8);
BigInt(9);
BigInt(16);
function be(t, e) {
  const n = t % e;
  return n >= pe ? n : e + n;
}
function CE(t, e, n) {
  if (n <= pe || e < pe)
    throw new Error("Expected power/modulo > 0");
  if (n === Pt)
    return pe;
  let r = Pt;
  for (; e > pe; )
    e & Pt && (r = r * t % n), t = t * t % n, e >>= Pt;
  return r;
}
function Me(t, e, n) {
  let r = t;
  for (; e-- > pe; )
    r *= r, r %= n;
  return r;
}
function yo(t, e) {
  if (t === pe || e <= pe)
    throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
  let n = be(t, e), r = e, s = pe, i = Pt;
  for (; n !== pe; ) {
    const c = r / n, d = r % n, l = s - i * c;
    r = n, n = d, s = i, i = l;
  }
  if (r !== Pt)
    throw new Error("invert: does not exist");
  return be(s, e);
}
function bE(t) {
  const e = (t - Pt) / Nn;
  let n, r, s;
  for (n = t - Pt, r = 0; n % Nn === pe; n /= Nn, r++)
    ;
  for (s = Nn; s < t && CE(s, e, t) !== t - Pt; s++)
    ;
  if (r === 1) {
    const o = (t + Pt) / Bo;
    return function(d, l) {
      const E = d.pow(l, o);
      if (!d.eql(d.sqr(E), l))
        throw new Error("Cannot find square root");
      return E;
    };
  }
  const i = (n + Pt) / Nn;
  return function(c, d) {
    if (c.pow(d, e) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let l = r, E = c.pow(c.mul(c.ONE, s), n), g = c.pow(d, i), C = c.pow(d, n);
    for (; !c.eql(C, c.ONE); ) {
      if (c.eql(C, c.ZERO))
        return c.ZERO;
      let x = 1;
      for (let b = c.sqr(C); x < l && !c.eql(b, c.ONE); x++)
        b = c.sqr(b);
      const F = c.pow(E, Pt << BigInt(l - x - 1));
      E = c.sqr(F), g = c.mul(g, F), C = c.mul(C, E), l = x;
    }
    return g;
  };
}
function QE(t) {
  if (t % Bo === yE) {
    const e = (t + Pt) / Bo;
    return function(r, s) {
      const i = r.pow(s, e);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (t % Gc === Uc) {
    const e = (t - Uc) / Gc;
    return function(r, s) {
      const i = r.mul(s, Nn), o = r.pow(i, e), c = r.mul(s, o), d = r.mul(r.mul(c, Nn), o), l = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return bE(t);
}
const xE = [
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
function FE(t) {
  const e = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = xE.reduce((r, s) => (r[s] = "function", r), e);
  return es(t, n);
}
function vE(t, e, n) {
  if (n < pe)
    throw new Error("Expected power > 0");
  if (n === pe)
    return t.ONE;
  if (n === Pt)
    return e;
  let r = t.ONE, s = e;
  for (; n > pe; )
    n & Pt && (r = t.mul(r, s)), s = t.sqr(s), n >>= Pt;
  return r;
}
function DE(t, e) {
  const n = new Array(e.length), r = e.reduce((i, o, c) => t.is0(o) ? i : (n[c] = i, t.mul(i, o)), t.ONE), s = t.inv(r);
  return e.reduceRight((i, o, c) => t.is0(o) ? i : (n[c] = t.mul(i, n[c]), t.mul(i, o)), s), n;
}
function z0(t, e) {
  const n = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function NE(t, e, n = !1, r = {}) {
  if (t <= pe)
    throw new Error(`Expected Field ORDER > 0, got ${t}`);
  const { nBitLength: s, nByteLength: i } = z0(t, e);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = QE(t), c = Object.freeze({
    ORDER: t,
    BITS: s,
    BYTES: i,
    MASK: ca(s),
    ZERO: pe,
    ONE: Pt,
    create: (d) => be(d, t),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return pe <= d && d < t;
    },
    is0: (d) => d === pe,
    isOdd: (d) => (d & Pt) === Pt,
    neg: (d) => be(-d, t),
    eql: (d, l) => d === l,
    sqr: (d) => be(d * d, t),
    add: (d, l) => be(d + l, t),
    sub: (d, l) => be(d - l, t),
    mul: (d, l) => be(d * l, t),
    pow: (d, l) => vE(c, d, l),
    div: (d, l) => be(d * yo(l, t), t),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, l) => d + l,
    subN: (d, l) => d - l,
    mulN: (d, l) => d * l,
    inv: (d) => yo(d, t),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => DE(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, l, E) => E ? l : d,
    toBytes: (d) => n ? aa(d, i) : hr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? oa(d) : kn(d);
    }
  });
  return Object.freeze(c);
}
function K0(t) {
  if (typeof t != "bigint")
    throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function td(t) {
  const e = K0(t);
  return e + Math.ceil(e / 2);
}
function SE(t, e, n = !1) {
  const r = t.length, s = K0(e), i = td(e);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? kn(t) : oa(t), c = be(o, e - Pt) + Pt;
  return n ? aa(c, s) : hr(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const RE = BigInt(0), Ji = BigInt(1);
function _E(t, e) {
  const n = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, r = (s) => {
    const i = Math.ceil(e / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: n,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = t.ZERO, c = s;
      for (; i > RE; )
        i & Ji && (o = o.add(c)), c = c.double(), i >>= Ji;
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
      let l = t.ZERO, E = t.BASE;
      const g = BigInt(2 ** s - 1), C = 2 ** s, x = BigInt(s);
      for (let F = 0; F < c; F++) {
        const b = F * d;
        let v = Number(o & g);
        o >>= x, v > d && (v -= C, o += Ji);
        const S = b, J = b + Math.abs(v) - 1, O = F % 2 !== 0, j = v < 0;
        v === 0 ? E = E.add(n(O, i[S])) : l = l.add(n(j, i[J]));
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
function ed(t) {
  return FE(t.Fp), es(t, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...z0(t.n, t.nBitLength),
    ...t,
    p: t.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function kE(t) {
  const e = ed(t);
  es(e, {
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
  const { endo: n, Fp: r, a: s } = e;
  if (n) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof n != "object" || typeof n.beta != "bigint" || typeof n.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: ME, hexToBytes: LE } = BE, _n = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(e = "") {
      super(e);
    }
  },
  _parseInt(t) {
    const { Err: e } = _n;
    if (t.length < 2 || t[0] !== 2)
      throw new e("Invalid signature integer tag");
    const n = t[1], r = t.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new e("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new e("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new e("Invalid signature integer: unnecessary leading zero");
    return { d: ME(r), l: t.subarray(n + 2) };
  },
  toSig(t) {
    const { Err: e } = _n, n = typeof t == "string" ? LE(t) : t;
    if (!tn(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new e("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new e("Invalid signature: incorrect length");
    const { d: s, l: i } = _n._parseInt(n.subarray(2)), { d: o, l: c } = _n._parseInt(i);
    if (c.length)
      throw new e("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(t) {
    const e = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, n = (l) => {
      const E = l.toString(16);
      return E.length & 1 ? `0${E}` : E;
    }, r = e(n(t.s)), s = e(n(t.r)), i = r.length / 2, o = s.length / 2, c = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${c}${r}`;
  }
}, rn = BigInt(0), Le = BigInt(1);
BigInt(2);
const Hc = BigInt(3);
BigInt(4);
function TE(t) {
  const e = kE(t), { Fp: n } = e, r = e.toBytes || ((F, b, v) => {
    const S = b.toAffine();
    return Jr(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = e.fromBytes || ((F) => {
    const b = F.subarray(1), v = n.fromBytes(b.subarray(0, n.BYTES)), S = n.fromBytes(b.subarray(n.BYTES, 2 * n.BYTES));
    return { x: v, y: S };
  });
  function i(F) {
    const { a: b, b: v } = e, S = n.sqr(F), J = n.mul(S, F);
    return n.add(n.add(J, n.mul(F, b)), v);
  }
  if (!n.eql(n.sqr(e.Gy), i(e.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(F) {
    return typeof F == "bigint" && rn < F && F < e.n;
  }
  function c(F) {
    if (!o(F))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(F) {
    const { allowedPrivateKeyLengths: b, nByteLength: v, wrapPrivateKey: S, n: J } = e;
    if (b && typeof F != "bigint") {
      if (tn(F) && (F = ur(F)), typeof F != "string" || !b.includes(F.length))
        throw new Error("Invalid key");
      F = F.padStart(v * 2, "0");
    }
    let O;
    try {
      O = typeof F == "bigint" ? F : kn(Ye("private key", F, v));
    } catch {
      throw new Error(`private key must be ${v} bytes, hex or bigint, not ${typeof F}`);
    }
    return S && (O = be(O, J)), c(O), O;
  }
  const l = /* @__PURE__ */ new Map();
  function E(F) {
    if (!(F instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(b, v, S) {
      if (this.px = b, this.py = v, this.pz = S, b == null || !n.isValid(b))
        throw new Error("x required");
      if (v == null || !n.isValid(v))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: v, y: S } = b || {};
      if (!b || !n.isValid(v) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (b instanceof g)
        throw new Error("projective point not allowed");
      const J = (O) => n.eql(O, n.ZERO);
      return J(v) && J(S) ? g.ZERO : new g(v, S, n.ONE);
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
      const v = n.invertBatch(b.map((S) => S.pz));
      return b.map((S, J) => S.toAffine(v[J])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const v = g.fromAffine(s(Ye("pointHex", b)));
      return v.assertValidity(), v;
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
        if (e.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: b, y: v } = this.toAffine();
      if (!n.isValid(b) || !n.isValid(v))
        throw new Error("bad point: x or y not FE");
      const S = n.sqr(v), J = i(b);
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
      const { px: v, py: S, pz: J } = this, { px: O, py: j, pz: M } = b, _ = n.eql(n.mul(v, M), n.mul(O, J)), L = n.eql(n.mul(S, M), n.mul(j, J));
      return _ && L;
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
      const { a: b, b: v } = e, S = n.mul(v, Hc), { px: J, py: O, pz: j } = this;
      let M = n.ZERO, _ = n.ZERO, L = n.ZERO, P = n.mul(J, J), $ = n.mul(O, O), U = n.mul(j, j), H = n.mul(J, O);
      return H = n.add(H, H), L = n.mul(J, j), L = n.add(L, L), M = n.mul(b, L), _ = n.mul(S, U), _ = n.add(M, _), M = n.sub($, _), _ = n.add($, _), _ = n.mul(M, _), M = n.mul(H, M), L = n.mul(S, L), U = n.mul(b, U), H = n.sub(P, U), H = n.mul(b, H), H = n.add(H, L), L = n.add(P, P), P = n.add(L, P), P = n.add(P, U), P = n.mul(P, H), _ = n.add(_, P), U = n.mul(O, j), U = n.add(U, U), P = n.mul(U, H), M = n.sub(M, P), L = n.mul(U, $), L = n.add(L, L), L = n.add(L, L), new g(M, _, L);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      E(b);
      const { px: v, py: S, pz: J } = this, { px: O, py: j, pz: M } = b;
      let _ = n.ZERO, L = n.ZERO, P = n.ZERO;
      const $ = e.a, U = n.mul(e.b, Hc);
      let H = n.mul(v, O), tt = n.mul(S, j), y = n.mul(J, M), a = n.add(v, S), A = n.add(O, j);
      a = n.mul(a, A), A = n.add(H, tt), a = n.sub(a, A), A = n.add(v, J);
      let h = n.add(O, M);
      return A = n.mul(A, h), h = n.add(H, y), A = n.sub(A, h), h = n.add(S, J), _ = n.add(j, M), h = n.mul(h, _), _ = n.add(tt, y), h = n.sub(h, _), P = n.mul($, A), _ = n.mul(U, y), P = n.add(_, P), _ = n.sub(tt, P), P = n.add(tt, P), L = n.mul(_, P), tt = n.add(H, H), tt = n.add(tt, H), y = n.mul($, y), A = n.mul(U, A), tt = n.add(tt, y), y = n.sub(H, y), y = n.mul($, y), A = n.add(A, y), H = n.mul(tt, A), L = n.add(L, H), H = n.mul(h, A), _ = n.mul(a, _), _ = n.sub(_, H), H = n.mul(a, tt), P = n.mul(h, P), P = n.add(P, H), new g(_, L, P);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(b) {
      return x.wNAFCached(this, l, b, (v) => {
        const S = n.invertBatch(v.map((J) => J.pz));
        return v.map((J, O) => J.toAffine(S[O])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const v = g.ZERO;
      if (b === rn)
        return v;
      if (c(b), b === Le)
        return this;
      const { endo: S } = e;
      if (!S)
        return x.unsafeLadder(this, b);
      let { k1neg: J, k1: O, k2neg: j, k2: M } = S.splitScalar(b), _ = v, L = v, P = this;
      for (; O > rn || M > rn; )
        O & Le && (_ = _.add(P)), M & Le && (L = L.add(P)), P = P.double(), O >>= Le, M >>= Le;
      return J && (_ = _.negate()), j && (L = L.negate()), L = new g(n.mul(L.px, S.beta), L.py, L.pz), _.add(L);
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
      let v = b, S, J;
      const { endo: O } = e;
      if (O) {
        const { k1neg: j, k1: M, k2neg: _, k2: L } = O.splitScalar(v);
        let { p: P, f: $ } = this.wNAF(M), { p: U, f: H } = this.wNAF(L);
        P = x.constTimeNegate(j, P), U = x.constTimeNegate(_, U), U = new g(n.mul(U.px, O.beta), U.py, U.pz), S = P.add(U), J = $.add(H);
      } else {
        const { p: j, f: M } = this.wNAF(v);
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
    multiplyAndAddUnsafe(b, v, S) {
      const J = g.BASE, O = (M, _) => _ === rn || _ === Le || !M.equals(J) ? M.multiplyUnsafe(_) : M.multiply(_), j = O(this, v).add(O(b, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      const { px: v, py: S, pz: J } = this, O = this.is0();
      b == null && (b = O ? n.ONE : n.inv(J));
      const j = n.mul(v, b), M = n.mul(S, b), _ = n.mul(J, b);
      if (O)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(_, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: M };
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: v } = e;
      if (b === Le)
        return !0;
      if (v)
        return v(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: v } = e;
      return b === Le ? this : v ? v(g, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(b = !0) {
      return this.assertValidity(), r(g, this, b);
    }
    toHex(b = !0) {
      return ur(this.toRawBytes(b));
    }
  }
  g.BASE = new g(e.Gx, e.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const C = e.nBitLength, x = _E(g, e.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: e,
    ProjectivePoint: g,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function OE(t) {
  const e = ed(t);
  return es(e, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...e });
}
function PE(t) {
  const e = OE(t), { Fp: n, n: r } = e, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return rn < A && A < n.ORDER;
  }
  function c(A) {
    return be(A, r);
  }
  function d(A) {
    return yo(A, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: E, weierstrassEquation: g, isWithinCurveOrder: C } = TE({
    ...e,
    toBytes(A, h, m) {
      const f = h.toAffine(), w = n.toBytes(f.x), B = Jr;
      return m ? B(Uint8Array.from([h.hasEvenY() ? 2 : 3]), w) : B(Uint8Array.from([4]), w, n.toBytes(f.y));
    },
    fromBytes(A) {
      const h = A.length, m = A[0], f = A.subarray(1);
      if (h === s && (m === 2 || m === 3)) {
        const w = kn(f);
        if (!o(w))
          throw new Error("Point is not on curve");
        const B = g(w);
        let p = n.sqrt(B);
        const u = (p & Le) === Le;
        return (m & 1) === 1 !== u && (p = n.neg(p)), { x: w, y: p };
      } else if (h === i && m === 4) {
        const w = n.fromBytes(f.subarray(0, n.BYTES)), B = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: w, y: B };
      } else
        throw new Error(`Point of length ${h} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (A) => ur(hr(A, e.nByteLength));
  function F(A) {
    const h = r >> Le;
    return A > h;
  }
  function b(A) {
    return F(A) ? c(-A) : A;
  }
  const v = (A, h, m) => kn(A.slice(h, m));
  class S {
    constructor(h, m, f) {
      this.r = h, this.s = m, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(h) {
      const m = e.nByteLength;
      return h = Ye("compactSignature", h, m * 2), new S(v(h, 0, m), v(h, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(h) {
      const { r: m, s: f } = _n.toSig(Ye("DER", h));
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
      const { r: m, s: f, recovery: w } = this, B = L(Ye("msgHash", h));
      if (w == null || ![0, 1, 2, 3].includes(w))
        throw new Error("recovery id invalid");
      const p = w === 2 || w === 3 ? m + e.n : m;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = w & 1 ? "03" : "02", I = l.fromHex(u + x(p)), Z = d(p), X = c(-B * Z), z = c(f * Z), q = l.BASE.multiplyAndAddUnsafe(I, X, z);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return F(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return dr(this.toDERHex());
    }
    toDERHex() {
      return _n.hexFromSig({ r: this.r, s: this.s });
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
      const A = td(e.n);
      return SE(e.randomBytes(A), e.n);
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
  function O(A, h = !0) {
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
    return l.fromHex(h).multiply(E(A)).toRawBytes(m);
  }
  const _ = e.bits2int || function(A) {
    const h = kn(A), m = A.length * 8 - e.nBitLength;
    return m > 0 ? h >> BigInt(m) : h;
  }, L = e.bits2int_modN || function(A) {
    return c(_(A));
  }, P = ca(e.nBitLength);
  function $(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(rn <= A && A < P))
      throw new Error(`bigint expected < 2^${e.nBitLength}`);
    return hr(A, e.nByteLength);
  }
  function U(A, h, m = H) {
    if (["recovered", "canonical"].some((rt) => rt in m))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: w } = e;
    let { lowS: B, prehash: p, extraEntropy: u } = m;
    B == null && (B = !0), A = Ye("msgHash", A), p && (A = Ye("prehashed msgHash", f(A)));
    const I = L(A), Z = E(h), X = [$(Z), $(I)];
    if (u != null) {
      const rt = u === !0 ? w(n.BYTES) : u;
      X.push(Ye("extraEntropy", rt));
    }
    const z = Jr(...X), q = I;
    function nt(rt) {
      const Rt = _(rt);
      if (!C(Rt))
        return;
      const ft = d(Rt), it = l.BASE.multiply(Rt).toAffine(), Nt = c(it.x);
      if (Nt === rn)
        return;
      const ht = c(ft * c(q + Nt * Z));
      if (ht === rn)
        return;
      let gt = (it.x === Nt ? 0 : 2) | Number(it.y & Le), Ve = ht;
      return B && F(ht) && (Ve = b(ht), gt ^= 1), new S(Nt, Ve, gt);
    }
    return { seed: z, k2sig: nt };
  }
  const H = { lowS: e.lowS, prehash: !1 }, tt = { lowS: e.lowS, prehash: !1 };
  function y(A, h, m = H) {
    const { seed: f, k2sig: w } = U(A, h, m), B = e;
    return W0(B.hash.outputLen, B.nByteLength, B.hmac)(f, w);
  }
  l.BASE._setWindowSize(8);
  function a(A, h, m, f = tt) {
    var it;
    const w = A;
    if (h = Ye("msgHash", h), m = Ye("publicKey", m), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: B, prehash: p } = f;
    let u, I;
    try {
      if (typeof w == "string" || tn(w))
        try {
          u = S.fromDER(w);
        } catch (Nt) {
          if (!(Nt instanceof _n.Err))
            throw Nt;
          u = S.fromCompact(w);
        }
      else if (typeof w == "object" && typeof w.r == "bigint" && typeof w.s == "bigint") {
        const { r: Nt, s: ht } = w;
        u = new S(Nt, ht);
      } else
        throw new Error("PARSE");
      I = l.fromHex(m);
    } catch (Nt) {
      if (Nt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (B && u.hasHighS())
      return !1;
    p && (h = e.hash(h));
    const { r: Z, s: X } = u, z = L(h), q = d(X), nt = c(z * q), rt = c(Z * q), Rt = (it = l.BASE.multiplyAndAddUnsafe(I, nt, rt)) == null ? void 0 : it.toAffine();
    return Rt ? c(Rt.x) === Z : !1;
  }
  return {
    CURVE: e,
    getPublicKey: O,
    getSharedSecret: M,
    sign: y,
    verify: a,
    ProjectivePoint: l,
    Signature: S,
    utils: J
  };
}
class nd extends j0 {
  constructor(e, n) {
    super(), this.finished = !1, this.destroyed = !1, zw(e);
    const r = sa(n);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(r.length > s ? e.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(e) {
    return Us(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    Us(this), X0(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return e = e, e.finished = s, e.destroyed = i, e.blockLen = o, e.outputLen = c, e.oHash = n._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const rd = (t, e, n) => new nd(t, e).update(n).digest();
rd.create = (t, e) => new nd(t, e);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function UE(t) {
  return {
    hash: t,
    hmac: (e, ...n) => rd(t, e, nE(...n)),
    randomBytes: sE
  };
}
function GE(t, e) {
  const n = (r) => PE({ ...t, ...UE(r) });
  return Object.freeze({ ...n(e), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const sd = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Jc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), HE = BigInt(1), Co = BigInt(2), Zc = (t, e) => (t + e / Co) / e;
function JE(t) {
  const e = sd, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), l = t * t * t % e, E = l * l * t % e, g = Me(E, n, e) * E % e, C = Me(g, n, e) * E % e, x = Me(C, Co, e) * l % e, F = Me(x, s, e) * x % e, b = Me(F, i, e) * F % e, v = Me(b, c, e) * b % e, S = Me(v, d, e) * v % e, J = Me(S, c, e) * b % e, O = Me(J, n, e) * E % e, j = Me(O, o, e) * F % e, M = Me(j, r, e) * l % e, _ = Me(M, Co, e);
  if (!bo.eql(bo.sqr(_), t))
    throw new Error("Cannot find square root");
  return _;
}
const bo = NE(sd, void 0, void 0, { sqrt: JE }), pn = GE({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: bo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Jc,
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
    splitScalar: (t) => {
      const e = Jc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -HE * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = Zc(i * t, e), d = Zc(-r * t, e);
      let l = be(t - c * n - d * s, e), E = be(-c * r - d * i, e);
      const g = l > o, C = E > o;
      if (g && (l = e - l), C && (E = e - E), l > o || E > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + t);
      return { k1neg: g, k1: l, k2neg: C, k2: E };
    }
  }
}, dE);
BigInt(0);
pn.ProjectivePoint;
var lr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(t) {
    N(this, "address");
    N(this, "publicKey");
    N(this, "compressedPublicKey");
    N(this, "privateKey");
    typeof t == "string" && t.match(/^[0-9a-f]*$/i) && t.length === 64 && (t = `0x${t}`);
    const e = Cn(t, 32);
    this.privateKey = V(e), this.publicKey = V(pn.getPublicKey(e, !1).slice(1)), this.compressedPublicKey = V(pn.getPublicKey(e, !0)), this.address = mt.fromPublicKey(this.publicKey);
  }
  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte. [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(t) {
    const e = pn.sign(Y(t), Y(this.privateKey)), n = Cn(`0x${e.r.toString(16)}`, 32), r = Cn(`0x${e.s.toString(16)}`, 32);
    return r[0] |= (e.recovery || 0) << 7, _e([n, r]);
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(t) {
    const e = pn.ProjectivePoint.fromHex(Y(this.compressedPublicKey)), n = pn.ProjectivePoint.fromHex(Y(t));
    return `0x${e.add(n).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(t, e) {
    const n = Y(e), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new pn.Signature(BigInt(V(r)), BigInt(V(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Y(t)).toRawBytes(!1).slice(1);
    return V(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(t, e) {
    return mt.fromPublicKey(lr.recoverPublicKey(t, e));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(t) {
    return t ? s0(_e([bn(32), Y(t)])) : bn(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(t) {
    const e = pn.ProjectivePoint.fromHex(Y(t));
    return V(e.toRawBytes(!1).slice(1));
  }
};
let ls;
const ZE = new Uint8Array(16);
function YE() {
  if (!ls && (ls = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ls))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ls(ZE);
}
const me = [];
for (let t = 0; t < 256; ++t)
  me.push((t + 256).toString(16).slice(1));
function XE(t, e = 0) {
  return (me[t[e + 0]] + me[t[e + 1]] + me[t[e + 2]] + me[t[e + 3]] + "-" + me[t[e + 4]] + me[t[e + 5]] + "-" + me[t[e + 6]] + me[t[e + 7]] + "-" + me[t[e + 8]] + me[t[e + 9]] + "-" + me[t[e + 10]] + me[t[e + 11]] + me[t[e + 12]] + me[t[e + 13]] + me[t[e + 14]] + me[t[e + 15]]).toLowerCase();
}
const VE = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Yc = {
  randomUUID: VE
};
function jE(t, e, n) {
  if (Yc.randomUUID && !e && !t)
    return Yc.randomUUID();
  t = t || {};
  const r = t.random || (t.rng || YE)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      e[n + s] = r[s];
    return e;
  }
  return XE(r);
}
var id = 2147483648, od = V("0x0488ade4"), Aa = V("0x0488b21e"), ad = V("0x04358394"), ua = V("0x043587cf");
function Xc(t) {
  return uA(_e([t, xo(Mt(Mt(t)), 0, 4)]));
}
function qE(t = !1, e = !1) {
  return t ? e ? ua : Aa : e ? ad : od;
}
function $E(t) {
  return [Aa, ua].includes(V(t.slice(0, 4)));
}
function WE(t) {
  return [od, ad, Aa, ua].includes(
    V(t.slice(0, 4))
  );
}
function zE(t, e = 0) {
  const n = t.split("/");
  if (n.length === 0 || n[0] === "m" && e !== 0)
    throw new D(k.HD_WALLET_ERROR, `invalid path - ${t}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + id : parseInt(r, 10)
  );
}
var Hn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(t) {
    N(this, "depth", 0);
    N(this, "index", 0);
    N(this, "fingerprint", V("0x00000000"));
    N(this, "parentFingerprint", V("0x00000000"));
    N(this, "privateKey");
    N(this, "publicKey");
    N(this, "chainCode");
    if (t.privateKey) {
      const e = new lr(t.privateKey);
      this.publicKey = V(e.compressedPublicKey), this.privateKey = V(t.privateKey);
    } else {
      if (!t.publicKey)
        throw new D(
          k.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = V(t.publicKey);
    }
    this.parentFingerprint = t.parentFingerprint || this.parentFingerprint, this.fingerprint = xo(Vr(Mt(this.publicKey)), 0, 4), this.depth = t.depth || this.depth, this.index = t.index || this.index, this.chainCode = t.chainCode;
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
    const e = this.privateKey && Y(this.privateKey), n = Y(this.publicKey), r = Y(this.chainCode), s = new Uint8Array(37);
    if (t & id) {
      if (!e)
        throw new D(
          k.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(e, 1);
    } else
      s.set(Y(this.publicKey));
    s.set(Cn(t, 4), 33);
    const i = Y(pr("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (e) {
      const E = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", g = Q(o).add(e).mod(E).toBytes(32);
      return new Hn({
        privateKey: g,
        chainCode: c,
        index: t,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const l = new lr(V(o)).addPoint(n);
    return new Hn({
      publicKey: l,
      chainCode: c,
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
    return zE(t, this.depth).reduce((n, r) => n.deriveIndex(r), this);
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(t = !1, e = !1) {
    if (this.depth >= 256)
      throw new D(
        k.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = qE(this.privateKey == null || t, e), r = V(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = To(this.index, 4), o = this.chainCode, c = this.privateKey != null && !t ? _e(["0x00", this.privateKey]) : this.publicKey, d = Y(
      _e([n, r, s, i, o, c])
    );
    return Xc(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(t) {
    const e = Y0.masterKeysFromSeed(t);
    return new Hn({
      chainCode: Y(e.slice(32)),
      privateKey: Y(e.slice(0, 32))
    });
  }
  static fromExtendedKey(t) {
    const e = Nd(_d(t)), n = Y(e), r = Xc(n.slice(0, 78)) === t;
    if (n.length !== 82 || !WE(n))
      throw new D(k.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new D(k.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = V(n.slice(5, 9)), o = parseInt(V(n.slice(9, 13)).substring(2), 16), c = V(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new D(
        k.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if ($E(n)) {
      if (d[0] !== 3)
        throw new D(k.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Hn({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new D(k.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Hn({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Zi = Hn, KE = Object.defineProperty, tB = (t, e, n) => e in t ? KE(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Er = (t, e, n) => (tB(t, typeof e != "symbol" ? e + "" : e, n), n), eB = async () => {
  await na();
  const t = GI(16, 0, JI.ScriptData), e = vc(17, 16, 32), n = Sr(18, 17, 0), r = vc(19, 17, 8), s = PI(16, 18, 19), i = D0(1);
  return Uint8Array.from([
    ...t.to_bytes(),
    ...e.to_bytes(),
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes()
  ]);
}, nB = (t, e, n) => {
  const s = new R().encode(new Ot(e).toNumber());
  return Uint8Array.from([
    ...Y(t),
    ...s,
    ...Y(n)
  ]);
}, da = class extends Su {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   */
  constructor(e, n) {
    super();
    /**
     * The address associated with the account.
     */
    N(this, "address");
    /**
     * The provider used to interact with the network.
     */
    N(this, "_provider");
    this._provider = n, this.address = mt.fromDynamicInput(e);
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
      throw new D(k.MISSING_PROVIDER, "Provider not set");
    return this._provider;
  }
  /**
   * Sets the provider for the account.
   *
   * @param provider - A Provider instance.
   */
  set provider(e) {
    this._provider = e;
  }
  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(e) {
    return this._provider = e, this.provider;
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(e, n) {
    return this.provider.getResourcesToSpend(this.address, e, n);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve.
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(e) {
    const n = [];
    let s;
    for (; ; ) {
      const i = await this.provider.getCoins(this.address, e, {
        first: 9999,
        after: s
      });
      if (n.push(...i), !(i.length >= 9999))
        break;
      throw new D(
        k.NOT_SUPPORTED,
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
    const e = [];
    let r;
    for (; ; ) {
      const s = await this.provider.getMessages(this.address, {
        first: 9999,
        after: r
      });
      if (e.push(...s), !(s.length >= 9999))
        break;
      throw new D(
        k.NOT_SUPPORTED,
        "Wallets containing more than 9999 messages exceed the current supported limit."
      );
    }
    return e;
  }
  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for.
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(e = Ie) {
    return await this.provider.getBalance(this.address, e);
  }
  /**
   * Retrieves all the balances for the account.
   *
   * @returns A promise that resolves to an array of Coins and their quantities.
   */
  async getBalances() {
    const e = [];
    let r;
    for (; ; ) {
      const s = await this.provider.getBalances(this.address, {
        first: 9999,
        after: r
      });
      if (e.push(...s), !(s.length >= 9999))
        break;
      throw new D(
        k.NOT_SUPPORTED,
        "Wallets containing more than 9999 balances exceed the current supported limit."
      );
    }
    return e;
  }
  /**
   * Adds resources to the transaction enough to fund it.
   *
   * @param request - The transaction request.
   * @param coinQuantities - The coin quantities required to execute the transaction.
   * @param fee - The estimated transaction fee.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund(e, n, r) {
    const s = Zp({
      amount: Q(r),
      assetId: Ie,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: g, assetId: C }) => {
      i[C] = {
        required: g,
        owned: Q(0)
      };
    });
    const o = [], c = [], d = this.address.toB256();
    e.inputs.forEach((g) => {
      if ("amount" in g)
        if ("owner" in g) {
          const F = String(g.assetId);
          if (g.owner === d && i[F]) {
            const b = Q(g.amount);
            i[F].owned = i[F].owned.add(b), o.push(g.id);
          }
        } else
          g.recipient === d && g.amount && i[Ie] && (i[Ie].owned = i[Ie].owned.add(g.amount), c.push(g.nonce));
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
      e.addResources(g);
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
  async createTransfer(e, n, r = Ie, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, c = new Kn(o);
    c.addCoinOutput(mt.fromAddressOrString(e), n, r);
    const { maxFee: d, requiredQuantities: l } = await this.provider.getTransactionCost(c);
    return await this.fund(c, l, d), c;
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
  async transfer(e, n, r = Ie, s = {}) {
    const i = await this.createTransfer(e, n, r, s);
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
  async transferToContract(e, n, r = Ie, s = {}) {
    const i = mt.fromAddressOrString(e), { minGasPrice: o } = this.provider.getGasConfig(), c = { gasPrice: o, ...s }, d = await eB(), l = nB(
      i.toB256(),
      n,
      r
    ), E = new Kn({
      ...c,
      script: d,
      scriptData: l
    });
    E.addContractInputAndOutput(i);
    const { maxFee: g, requiredQuantities: C } = await this.provider.getTransactionCost(E, [
      { amount: Q(n), assetId: String(r) }
    ]);
    return await this.fund(E, C, g), this.sendTransaction(E);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(e, n, r = {}) {
    const s = mt.fromAddressOrString(e), i = Y(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = Y(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), d = { script: new Uint8Array([
      ...Y(zm.bytes),
      ...i,
      ...o
    ]), ...r }, l = new Kn(d), E = [{ amount: Q(n), assetId: Ie }], { requiredQuantities: g, maxFee: C } = await this.provider.getTransactionCost(
      l,
      E
    );
    return await this.fund(l, g, C), this.sendTransaction(l);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(e, n) {
    const r = Te(e);
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
  async simulateTransaction(e) {
    const n = Te(e);
    return await this.provider.estimateTxDependencies(n), this.provider.simulate(n, { estimateTxDependencies: !1 });
  }
}, Vc = 13, jc = 8, qc = 1, Yi = 32, rB = 16, $c = (t) => /^0x/.test(t) ? t.slice(2) : t;
async function sB(t, e, n) {
  const r = Bn($c(t), "hex"), s = mt.fromAddressOrString(e), i = bn(Yi), o = ru({
    password: Bn(n),
    salt: i,
    dklen: Yi,
    n: 2 ** Vc,
    r: jc,
    p: qc
  }), c = bn(rB), d = await Bf(r, o, c), l = Uint8Array.from([...o.subarray(16, 32), ...d]), E = su(l), g = xr(E, "hex"), C = {
    id: jE(),
    version: 3,
    address: $c(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: xr(c, "hex") },
      ciphertext: xr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Yi,
        n: 2 ** Vc,
        p: qc,
        r: jc,
        salt: xr(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function iB(t, e) {
  const n = JSON.parse(t), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: l, salt: E }
    }
  } = n, g = Bn(s, "hex"), C = Bn(i, "hex"), x = Bn(E, "hex"), F = Bn(e), b = ru({
    password: F,
    salt: x,
    n: c,
    p: l,
    r: d,
    dklen: o
  }), v = Uint8Array.from([...b.subarray(16, 32), ...g]), S = su(v), J = xr(S, "hex");
  if (r !== J)
    throw new D(
      k.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const O = await Ef(g, b, C);
  return V(O);
}
var cd = class extends da {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(e, n) {
    const r = new lr(e);
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
  async signMessage(e) {
    return await this.signer().sign(Sp(e));
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(e) {
    const n = Te(e), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r);
    return await this.signer().sign(s);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(e) {
    const n = Te(e), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(e, n) {
    const r = Te(e);
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
  async simulateTransaction(e) {
    const n = Te(e);
    return await this.provider.estimateTxDependencies(n), this.provider.call(
      await this.populateTransactionWitnessesSignature(n),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(e) {
    return sB(this.privateKey, this.address, e);
  }
};
Er(cd, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Ad = class extends da {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(t) {
    return new Qe(t, this._provider);
  }
}, Qe = class extends cd {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new lr("0x00"), new Ad(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(t) {
    const e = lr.generatePrivateKey(t == null ? void 0 : t.entropy);
    return new Qe(e, t == null ? void 0 : t.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(t, e, n) {
    const s = Zi.fromSeed(t).derivePath(n || Qe.defaultPath);
    return new Qe(s.privateKey, e);
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
  static fromMnemonic(t, e, n, r) {
    const s = Y0.mnemonicToSeed(t, r), o = Zi.fromSeed(s).derivePath(n || Qe.defaultPath);
    return new Qe(o.privateKey, e);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(t, e) {
    const n = Zi.fromExtendedKey(t);
    return new Qe(n.privateKey, e);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(t, e, n) {
    const r = await iB(t, e);
    return new Qe(r, n);
  }
}, ns = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(t, e) {
    return new Ad(t, e);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(t, e) {
    return new Qe(t, e);
  }
};
Er(ns, "generate", Qe.generate);
Er(ns, "fromSeed", Qe.fromSeed);
Er(ns, "fromMnemonic", Qe.fromMnemonic);
Er(ns, "fromExtendedKey", Qe.fromExtendedKey);
Er(ns, "fromEncryptedJson", Qe.fromEncryptedJson);
var oB = (t) => {
  const n = Y(t), r = iA(n, 16384), s = P0(r.map((o) => V(o)));
  return s0(_e(["0x4655454C", s]));
}, Wc = class extends da {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(e, n, r, s) {
    const { predicateBytes: i, predicateInterface: o } = Wc.processPredicateData(
      e,
      r,
      s
    ), c = mt.fromB256(oB(i));
    super(c, n);
    N(this, "bytes");
    N(this, "predicateData", Uint8Array.from([]));
    N(this, "predicateArgs", []);
    N(this, "interface");
    this.bytes = i, this.interface = o;
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(e) {
    var s;
    const n = Te(e), { policies: r } = si.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === bt.Coin && V(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
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
  async createTransfer(e, n, r = Ie, s = {}) {
    const i = await super.createTransfer(e, n, r, s);
    return this.populateTransactionPredicateData(i);
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(e, n) {
    const r = this.populateTransactionPredicateData(e);
    return super.sendTransaction(r, n);
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(e) {
    const n = this.populateTransactionPredicateData(e);
    return super.simulateTransaction(n);
  }
  /**
   * Sets data for the predicate.
   *
   * @param args - Arguments for the predicate function.
   * @returns The Predicate instance with updated predicate data.
   */
  setData(...e) {
    return this.predicateArgs = e, this;
  }
  getPredicateData(e) {
    var o;
    if (!this.predicateArgs.length)
      return new Uint8Array();
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Et(this.bytes.length).encode(this.bytes), i = Ws({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + Go + Sf + st + r.byteLength + e * st;
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
  static processPredicateData(e, n, r) {
    let s = Y(e), i;
    if (n && (i = new Qn(n), i.functions.main === void 0))
      throw new D(
        k.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = Wc.setConfigurableConstants(
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
  static setConfigurableConstants(e, n, r) {
    const s = e;
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
      throw new D(
        k.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, sy = [
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
], iy = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", rA, oy = typeof process < "u" && ((rA = process == null ? void 0 : process.env) == null ? void 0 : rA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  kr as ASSET_ID_LEN,
  Su as AbstractAccount,
  Hf as AbstractAddress,
  Jf as AbstractContract,
  vB as AbstractPredicate,
  Ru as AbstractProgram,
  Zf as AbstractScript,
  FB as AbstractScriptRequest,
  da as Account,
  mt as Address,
  fI as AddressType,
  Be as ArrayCoder,
  nw as AssertFailedRevertError,
  G as B256Coder,
  Tf as B512Coder,
  Ot as BN,
  Ie as BaseAssetId,
  si as BaseTransactionRequest,
  cd as BaseWalletUnlocked,
  Of as BooleanCoder,
  Et as ByteArrayCoder,
  Ff as CONTRACT_ID_LEN,
  SB as CONTRACT_MAX_SIZE,
  gI as ChainName,
  ZB as ChangeOutputCollisionError,
  At as Coder,
  Cw as Commands,
  Bw as Contract,
  Hw as ContractFactory,
  Gw as ContractUtils,
  go as CreateTransactionRequest,
  ny as DECIMAL_UNITS,
  ey as DEFAULT_MIN_PRECISION,
  ty as DEFAULT_PRECISION,
  OB as EmptyRoot,
  wu as EnumCoder,
  qf as FAILED_ASSERT_EQ_SIGNAL,
  $f as FAILED_ASSERT_SIGNAL,
  Vf as FAILED_REQUIRE_SIGNAL,
  jf as FAILED_SEND_MESSAGE_SIGNAL,
  ku as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  Wf as FAILED_UNKNOWN_SIGNAL,
  Ms as FUEL_BECH32_HRP_PREFIX,
  oy as FUEL_NETWORK_URL,
  L0 as FunctionInvocationResult,
  O0 as FunctionInvocationScope,
  Sf as INPUT_COIN_FIXED_SIZE,
  vs as InputCoder,
  Ja as InputCoinCoder,
  Fs as InputContractCoder,
  Lr as InputMessageCoder,
  bt as InputType,
  S0 as InstructionSet,
  Qn as Interface,
  M0 as InvocationResult,
  TB as MAX_PREDICATE_DATA_LENGTH,
  LB as MAX_PREDICATE_LENGTH,
  kB as MAX_SCRIPT_DATA_LENGTH,
  _B as MAX_SCRIPT_LENGTH,
  MB as MAX_STATIC_CONTRACTS,
  RB as MAX_WITNESSES,
  Mc as MNEMONIC_SIZES,
  Y0 as Mnemonic,
  Ew as MultiCallInvocationScope,
  jm as NoWitnessAtIndexError,
  YB as NoWitnessByOwnerError,
  K as NumberCoder,
  lI as OperationName,
  Ya as OutputChangeCoder,
  Ns as OutputCoder,
  Za as OutputCoinCoder,
  Ds as OutputContractCoder,
  Va as OutputContractCreatedCoder,
  yt as OutputType,
  Xa as OutputVariableCoder,
  iy as PANIC_DOC_URL,
  sy as PANIC_REASONS,
  Ss as PoliciesCoder,
  Ze as PolicyType,
  Wc as Predicate,
  x0 as Provider,
  ro as ReceiptBurnCoder,
  ja as ReceiptCallCoder,
  DB as ReceiptCoder,
  Ka as ReceiptLogCoder,
  tc as ReceiptLogDataCoder,
  Rs as ReceiptMessageOutCoder,
  Tr as ReceiptMintCoder,
  Wa as ReceiptPanicCoder,
  qa as ReceiptReturnCoder,
  $a as ReceiptReturnDataCoder,
  za as ReceiptRevertCoder,
  rc as ReceiptScriptResultCoder,
  ec as ReceiptTransferCoder,
  nc as ReceiptTransferOutCoder,
  ut as ReceiptType,
  KI as RequireRevertError,
  ts as RevertError,
  Go as SCRIPT_FIXED_SIZE,
  zB as Script,
  Hr as ScriptRequest,
  cw as ScriptResultDecoderError,
  Kn as ScriptTransactionRequest,
  ew as SendMessageRevertError,
  lr as Signer,
  sc as StorageSlotCoder,
  Uf as StringCoder,
  zs as StructCoder,
  sn as TransactionCoder,
  oc as TransactionCreateCoder,
  ac as TransactionMintCoder,
  po as TransactionResponse,
  ic as TransactionScriptCoder,
  hI as TransactionStatus,
  Ce as TransactionType,
  dI as TransactionTypeName,
  tw as TransferToAddressRevertError,
  Cu as TupleCoder,
  ir as TxPointerCoder,
  R as U64Coder,
  NB as UtxoIdCoder,
  bu as VecCoder,
  st as WORD_SIZE,
  ns as Wallet,
  Ad as WalletLocked,
  Qe as WalletUnlocked,
  _s as WitnessCoder,
  kt as ZeroBytes32,
  Zp as addAmountToAsset,
  On as addOperation,
  Fr as addressify,
  oA as arrayify,
  Gm as assembleReceiptByType,
  oi as assembleTransactionSummary,
  Mi as assert,
  Q as bn,
  Bn as bufferFromString,
  HB as buildBlockExplorerUrl,
  m0 as calculateMetadataGasForTxCreate,
  I0 as calculateMetadataGasForTxScript,
  zn as calculatePriceWithFactor,
  Km as calculateTransactionFee,
  Ws as calculateVmTxMemory,
  cB as capitalizeString,
  iA as chunkAndPadBytes,
  rg as clearFirst12BytesFromB256,
  qo as coinQuantityfy,
  dt as concat,
  aA as concatBytes,
  KB as createConfig,
  bB as decrypt,
  Ef as decryptJsonWalletData,
  dB as defaultChainConfig,
  hB as defaultConsensusKey,
  QB as encrypt,
  Bf as encryptJsonWalletData,
  DI as extractBurnedAssetsFromReceipts,
  vI as extractMintedAssetsFromReceipts,
  IB as format,
  mB as formatUnits,
  Jo as fromBech32,
  XB as fromDateToTai64,
  tI as fromTai64ToDate,
  JB as fromTai64ToUnix,
  Vm as fromUnixToTai64,
  Zm as gasUsedByInputs,
  _u as getAssetId,
  Zo as getBytesFromBech32,
  bI as getContractCallOperations,
  xI as getContractCreatedOperations,
  yI as getContractTransferOperations,
  RI as getDecodedLogs,
  WI as getDocs,
  g0 as getGasUsedFromReceipts,
  Gr as getInputAccountAddress,
  aI as getInputContractFromIndex,
  Ps as getInputFromAssetId,
  ta as getInputsByType,
  nI as getInputsByTypes,
  rI as getInputsCoin,
  iI as getInputsCoinAndMessage,
  oI as getInputsContract,
  sI as getInputsMessage,
  Ko as getMaxGas,
  p0 as getMinGas,
  FI as getOperations,
  Kr as getOutputsByType,
  AI as getOutputsChange,
  E0 as getOutputsCoin,
  uI as getOutputsContract,
  cI as getOutputsContractCreated,
  VB as getOutputsVariable,
  QI as getPayProducerOperations,
  oB as getPredicateRoot,
  ng as getRandomB256,
  ii as getReceiptsByType,
  mI as getReceiptsCall,
  II as getReceiptsMessageOut,
  BI as getReceiptsTransferOut,
  Um as getReceiptsWithMissingData,
  NI as getTransactionStatusName,
  qB as getTransactionSummary,
  $B as getTransactionSummaryFromRequest,
  B0 as getTransactionTypeName,
  WB as getTransactionsSummaries,
  xc as getTransferOperations,
  CI as getWithdrawFromFuelOperations,
  jB as hasSameAssetId,
  s0 as hash,
  Sp as hashMessage,
  AB as hexlify,
  Lm as inputify,
  so as isB256,
  Bs as isBech32,
  bc as isCoin,
  io as isEvmAddress,
  GB as isMessage,
  Ac as isPublicKey,
  PB as isRawCoin,
  UB as isRawMessage,
  ea as isType,
  y0 as isTypeCreate,
  pI as isTypeMint,
  C0 as isTypeScript,
  su as keccak256,
  xB as keyFromPassword,
  dl as max,
  wB as multiply,
  eg as normalizeBech32,
  Ym as normalizeJSON,
  uB as normalizeString,
  Tm as outputify,
  sg as padFirst12BytesOfEvmAddress,
  tr as processGqlReceipt,
  SI as processGraphqlStatus,
  bn as randomBytes,
  yn as resolveGasDependentCosts,
  Qc as returnZeroScript,
  rw as revertErrorFactory,
  ru as scrypt,
  Xm as sleep,
  Yf as sortPolicies,
  xr as stringFromBuffer,
  uc as toB256,
  Es as toBech32,
  Cn as toBytes,
  ul as toFixed,
  To as toHex,
  Ke as toNumber,
  Te as transactionRequestify,
  Rp as uint64ToBytesBE,
  zm as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
