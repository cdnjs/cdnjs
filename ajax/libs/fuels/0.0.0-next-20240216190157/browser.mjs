var ih = Object.defineProperty;
var oh = (e, t, n) => t in e ? ih(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var F = (e, t, n) => (oh(e, typeof t != "symbol" ? t + "" : t, n), n), $i = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var be = (e, t, n) => ($i(e, t, "read from private field"), n ? n.call(e) : t.get(e)), wt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, xt = (e, t, n, r) => ($i(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var Pn = (e, t, n) => ($i(e, t, "access private method"), n);
function OA() {
  return {
    FORC: "0.50.0",
    FUEL_CORE: "0.22.1",
    FUELS: "0.74.0"
  };
}
function ec(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function qo(e, t) {
  const n = ec(e), r = ec(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function ah(e, t) {
  const { major: n } = qo(e, t);
  return n === 0;
}
function ch(e, t) {
  const { minor: n } = qo(e, t);
  return n === 0;
}
function Ah(e, t) {
  const { patch: n } = qo(e, t);
  return n === 0;
}
function uh(e) {
  const { FUEL_CORE: t } = OA();
  return {
    supportedVersion: t,
    isMajorSupported: ah(e, t),
    isMinorSupported: ch(e, t),
    isPatchSupported: Ah(e, t)
  };
}
var dh = OA(), hh = Object.defineProperty, lh = (e, t, n) => t in e ? hh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, fh = (e, t, n) => (lh(e, typeof t != "symbol" ? t + "" : t, n), n), R = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e))(R || {}), Fs = class extends Error {
  constructor(t, n) {
    super(n);
    F(this, "VERSIONS", dh);
    F(this, "code");
    this.code = t, this.name = "FuelError";
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new Fs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(R);
    if (!r.includes(n.code))
      throw new Fs(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new Fs(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, VERSIONS: s } = this;
    return { code: t, name: n, message: r, VERSIONS: s };
  }
}, v = Fs;
fh(v, "CODES", R);
var vB = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, TA = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(c, c + t)), n.push(d);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, PA = (e) => {
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
}, UA = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, de = (e) => {
  const t = e.map((n) => PA(n));
  return UA(t);
}, tc = "0123456789abcdef";
function FB(e) {
  const t = PA(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += tc[(s & 240) >> 4] + tc[s & 15];
  }
  return n;
}
var DB = (e) => {
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
}, gh = {
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
}, NB = gh, RB = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const ph = "6.7.1";
function mh(e, t, n) {
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
function di(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && mh(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function nr(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(nr).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return nr(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${nr(n)}: ${nr(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function wh(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${nr(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + nr(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${ph}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return di(r, { code: t }), n && Object.assign(r, n), r;
}
function vr(e, t, n, r) {
  if (!e)
    throw wh(t, n, r);
}
function Ce(e, t, n, r) {
  vr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const Eh = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function Ih(e) {
  vr(Eh.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function GA(e, t, n) {
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
function Vt(e, t) {
  return GA(e, t, !1);
}
function Y(e, t) {
  return GA(e, t, !0);
}
function yh(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const nc = "0123456789abcdef";
function V(e) {
  const t = Vt(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += nc[(s & 240) >> 4] + nc[s & 15];
  }
  return n;
}
function Tt(e) {
  return "0x" + e.map((t) => V(t).substring(2)).join("");
}
function $o(e, t, n) {
  const r = Vt(e);
  return n != null && n > r.length && vr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), V(r.slice(t ?? 0, n ?? r.length));
}
const Bh = BigInt(0);
BigInt(1);
const rr = 9007199254740991;
function Jn(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -rr && e <= rr, "overflow", t || "value", e), BigInt(e);
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
function Ch(e, t) {
  const n = Jn(e, t);
  return vr(n >= Bh, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const rc = "0123456789abcdef";
function bh(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += rc[n >> 4], t += rc[n & 15];
    return BigInt(t);
  }
  return Jn(e);
}
function HA(e, t) {
  switch (typeof e) {
    case "bigint":
      return Ce(e >= -rr && e <= rr, "overflow", t || "value", e), Number(e);
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -rr && e <= rr, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return HA(BigInt(e), t);
      } catch (n) {
        Ce(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  Ce(!1, "invalid numeric value", t || "value", e);
}
function Qh(e, t) {
  let r = Ch(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = HA(t, "width");
    for (vr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const go = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let ms = null;
function xh(e) {
  if (ms == null) {
    ms = {};
    for (let n = 0; n < go.length; n++)
      ms[go[n]] = BigInt(n);
  }
  const t = ms[e];
  return Ce(t != null, "invalid base58 value", "letter", e), t;
}
const vh = BigInt(0), po = BigInt(58);
function JA(e) {
  let t = bh(Vt(e)), n = "";
  for (; t; )
    n = go[Number(t % po)] + n, t /= po;
  return n;
}
function Fh(e) {
  let t = vh;
  for (let n = 0; n < e.length; n++)
    t *= po, t += xh(e[n]);
  return t;
}
function Dh(e, t, n, r, s) {
  Ce(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function ZA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function Nh(e, t, n, r, s) {
  return e === "OVERLONG" ? (Ce(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), ZA(e, t, n));
}
const Rh = Object.freeze({
  error: Dh,
  ignore: ZA,
  replace: Nh
});
function Sh(e, t) {
  t == null && (t = Rh.error);
  const n = Vt(e, "bytes"), r = [];
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
function Wo(e, t) {
  t != null && (Ih(t), e = e.normalize(t));
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
function _h(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function hi(e, t) {
  return _h(Sh(e, t));
}
function mo(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function kh(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function YA(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Lh(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  mo(e.outputLen), mo(e.blockLen);
}
function Mh(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Oh(e, t) {
  YA(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const bt = {
  number: mo,
  bool: kh,
  bytes: YA,
  hash: Lh,
  exists: Mh,
  output: Oh
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Th = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Ds = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), nn = (e, t) => e << 32 - t | e >>> t, Ph = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Ph)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Uh(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function qn(e) {
  if (typeof e == "string" && (e = Uh(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Gs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Gh = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function Hh(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Gh(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function Fr(e) {
  const t = (r) => e().update(qn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Jh(e) {
  const t = (r, s) => e(s).update(qn(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let XA = class extends Gs {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, bt.hash(t);
    const r = qn(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Gs))
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
const Ko = (e, t, n) => new XA(e, t).update(n).digest();
Ko.create = (e, t) => new XA(e, t);
function Zh(e, t, n, r) {
  bt.hash(e);
  const s = Hh({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (bt.number(i), bt.number(o), bt.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = qn(t), l = qn(n), I = new Uint8Array(o), g = Ko.create(e, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: g, PRFSalt: C };
}
function Yh(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Xh(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Zh(e, t, n, r);
  let l;
  const I = new Uint8Array(4), g = Ds(I), C = new Uint8Array(c.outputLen);
  for (let x = 1, N = 0; N < i; x++, N += c.outputLen) {
    const b = o.subarray(N, N + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(I).digestInto(C), b.set(C.subarray(0, b.length));
    for (let D = 1; D < s; D++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Yh(c, d, o, l, C);
}
function Vh(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
let zo = class extends Gs {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ds(this.buffer);
  }
  update(t) {
    bt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = qn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Ds(t);
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
    Vh(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Ds(t);
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
const jh = (e, t, n) => e & t ^ ~e & n, qh = (e, t, n) => e & t ^ e & n ^ t & n, $h = new Uint32Array([
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
let Wh = class extends zo {
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
      const C = pn[g - 15], x = pn[g - 2], N = nn(C, 7) ^ nn(C, 18) ^ C >>> 3, b = nn(x, 17) ^ nn(x, 19) ^ x >>> 10;
      pn[g] = b + pn[g - 7] + N + pn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const C = nn(c, 6) ^ nn(c, 11) ^ nn(c, 25), x = I + C + jh(c, d, l) + $h[g] + pn[g] | 0, b = (nn(r, 2) ^ nn(r, 13) ^ nn(r, 22)) + qh(r, s, i) | 0;
      I = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, l, I);
  }
  roundClean() {
    pn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const ea = Fr(() => new Wh()), ws = BigInt(2 ** 32 - 1), wo = BigInt(32);
function VA(e, t = !1) {
  return t ? { h: Number(e & ws), l: Number(e >> wo & ws) } : { h: Number(e >> wo & ws) | 0, l: Number(e & ws) | 0 };
}
function Kh(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = VA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const zh = (e, t) => BigInt(e >>> 0) << wo | BigInt(t >>> 0), el = (e, t, n) => e >>> n, tl = (e, t, n) => e << 32 - n | t >>> n, nl = (e, t, n) => e >>> n | t << 32 - n, rl = (e, t, n) => e << 32 - n | t >>> n, sl = (e, t, n) => e << 64 - n | t >>> n - 32, il = (e, t, n) => e >>> n - 32 | t << 64 - n, ol = (e, t) => t, al = (e, t) => e, cl = (e, t, n) => e << n | t >>> 32 - n, Al = (e, t, n) => t << n | e >>> 32 - n, ul = (e, t, n) => t << n - 32 | e >>> 64 - n, dl = (e, t, n) => e << n - 32 | t >>> 64 - n;
function hl(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const ll = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), fl = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, gl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), pl = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, ml = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), wl = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Ae = {
  fromBig: VA,
  split: Kh,
  toBig: zh,
  shrSH: el,
  shrSL: tl,
  rotrSH: nl,
  rotrSL: rl,
  rotrBH: sl,
  rotrBL: il,
  rotr32H: ol,
  rotr32L: al,
  rotlSH: cl,
  rotlSL: Al,
  rotlBH: ul,
  rotlBL: dl,
  add: hl,
  add3L: ll,
  add3H: fl,
  add4L: gl,
  add4H: pl,
  add5H: wl,
  add5L: ml
}, [El, Il] = Ae.split([
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
class ta extends zo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: l, El: I, Fh: g, Fl: C, Gh: x, Gl: N, Hh: b, Hl: D } = this;
    return [t, n, r, s, i, o, c, d, l, I, g, C, x, N, b, D];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d, l, I, g, C, x, N, b, D) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = l | 0, this.El = I | 0, this.Fh = g | 0, this.Fl = C | 0, this.Gh = x | 0, this.Gl = N | 0, this.Hh = b | 0, this.Hl = D | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      mn[T] = t.getUint32(n), wn[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = mn[T - 15] | 0, L = wn[T - 15] | 0, k = Ae.rotrSH(j, L, 1) ^ Ae.rotrSH(j, L, 8) ^ Ae.shrSH(j, L, 7), M = Ae.rotrSL(j, L, 1) ^ Ae.rotrSL(j, L, 8) ^ Ae.shrSL(j, L, 7), P = mn[T - 2] | 0, $ = wn[T - 2] | 0, U = Ae.rotrSH(P, $, 19) ^ Ae.rotrBH(P, $, 61) ^ Ae.shrSH(P, $, 6), H = Ae.rotrSL(P, $, 19) ^ Ae.rotrBL(P, $, 61) ^ Ae.shrSL(P, $, 6), ee = Ae.add4L(M, H, wn[T - 7], wn[T - 16]), B = Ae.add4H(ee, k, U, mn[T - 7], mn[T - 16]);
      mn[T] = B | 0, wn[T] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: l, Dl: I, Eh: g, El: C, Fh: x, Fl: N, Gh: b, Gl: D, Hh: S, Hl: J } = this;
    for (let T = 0; T < 80; T++) {
      const j = Ae.rotrSH(g, C, 14) ^ Ae.rotrSH(g, C, 18) ^ Ae.rotrBH(g, C, 41), L = Ae.rotrSL(g, C, 14) ^ Ae.rotrSL(g, C, 18) ^ Ae.rotrBL(g, C, 41), k = g & x ^ ~g & b, M = C & N ^ ~C & D, P = Ae.add5L(J, L, M, Il[T], wn[T]), $ = Ae.add5H(P, S, j, k, El[T], mn[T]), U = P | 0, H = Ae.rotrSH(r, s, 28) ^ Ae.rotrBH(r, s, 34) ^ Ae.rotrBH(r, s, 39), ee = Ae.rotrSL(r, s, 28) ^ Ae.rotrBL(r, s, 34) ^ Ae.rotrBL(r, s, 39), B = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      S = b | 0, J = D | 0, b = x | 0, D = N | 0, x = g | 0, N = C | 0, { h: g, l: C } = Ae.add(l | 0, I | 0, $ | 0, U | 0), l = c | 0, I = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = Ae.add3L(U, ee, a);
      r = Ae.add3H(A, $, H, B), s = A | 0;
    }
    ({ h: r, l: s } = Ae.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = Ae.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = Ae.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h: l, l: I } = Ae.add(this.Dh | 0, this.Dl | 0, l | 0, I | 0), { h: g, l: C } = Ae.add(this.Eh | 0, this.El | 0, g | 0, C | 0), { h: x, l: N } = Ae.add(this.Fh | 0, this.Fl | 0, x | 0, N | 0), { h: b, l: D } = Ae.add(this.Gh | 0, this.Gl | 0, b | 0, D | 0), { h: S, l: J } = Ae.add(this.Hh | 0, this.Hl | 0, S | 0, J | 0), this.set(r, s, i, o, c, d, l, I, g, C, x, N, b, D, S, J);
  }
  roundClean() {
    mn.fill(0), wn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class yl extends ta {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class Bl extends ta {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const na = Fr(() => new ta());
Fr(() => new yl());
Fr(() => new Bl());
function Cl() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const sc = Cl();
sc.crypto || sc.msCrypto;
function bl(e) {
  switch (e) {
    case "sha256":
      return ea.create();
    case "sha512":
      return na.create();
  }
  Ce(!1, "invalid hashing algorithm name", "algorithm", e);
}
function Ql(e, t) {
  const n = { sha256: ea, sha512: na }[e];
  return Ce(n != null, "invalid hmac algorithm", "algorithm", e), Ko.create(n, t);
}
function xl(e, t, n, r, s) {
  const i = { sha256: ea, sha512: na }[s];
  return Ce(i != null, "invalid pbkdf2 algorithm", "algorithm", s), Xh(i, e, t, { c: n, dkLen: r });
}
let jA = !1;
const qA = function(e, t, n) {
  return Ql(e, t).update(n).digest();
};
let $A = qA;
function Dr(e, t, n) {
  const r = Vt(t, "key"), s = Vt(n, "data");
  return V($A(e, r, s));
}
Dr._ = qA;
Dr.lock = function() {
  jA = !0;
};
Dr.register = function(e) {
  if (jA)
    throw new Error("computeHmac is locked");
  $A = e;
};
Object.freeze(Dr);
const [WA, KA, zA] = [[], [], []], vl = BigInt(0), _r = BigInt(1), Fl = BigInt(2), Dl = BigInt(7), Nl = BigInt(256), Rl = BigInt(113);
for (let e = 0, t = _r, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], WA.push(2 * (5 * r + n)), KA.push((e + 1) * (e + 2) / 2 % 64);
  let s = vl;
  for (let i = 0; i < 7; i++)
    t = (t << _r ^ (t >> Dl) * Rl) % Nl, t & Fl && (s ^= _r << (_r << BigInt(i)) - _r);
  zA.push(s);
}
const [Sl, _l] = Ae.split(zA, !0), ic = (e, t, n) => n > 32 ? Ae.rotlBH(e, t, n) : Ae.rotlSH(e, t, n), oc = (e, t, n) => n > 32 ? Ae.rotlBL(e, t, n) : Ae.rotlSL(e, t, n);
function kl(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], I = n[d + 1], g = ic(l, I, 1) ^ n[c], C = oc(l, I, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = KA[o], d = ic(s, i, c), l = oc(s, i, c), I = WA[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= Sl[r], e[1] ^= _l[r];
  }
  n.fill(0);
}
let eu = class tu extends Gs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, bt.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Th(this.state);
  }
  keccak() {
    kl(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    bt.exists(this);
    const { blockLen: n, state: r } = this;
    t = qn(t);
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
    return t || (t = new tu(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const On = (e, t, n) => Fr(() => new eu(t, e, n));
On(6, 144, 224 / 8);
On(6, 136, 256 / 8);
On(6, 104, 384 / 8);
On(6, 72, 512 / 8);
On(1, 144, 224 / 8);
const Ll = On(1, 136, 256 / 8);
On(1, 104, 384 / 8);
On(1, 72, 512 / 8);
const nu = (e, t, n) => Jh((r = {}) => new eu(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
nu(31, 168, 128 / 8);
nu(31, 136, 256 / 8);
let ru = !1;
const su = function(e) {
  return Ll(e);
};
let iu = su;
function is(e) {
  const t = Vt(e, "data");
  return V(iu(t));
}
is._ = su;
is.lock = function() {
  ru = !0;
};
is.register = function(e) {
  if (ru)
    throw new TypeError("keccak256 is locked");
  iu = e;
};
Object.freeze(is);
const Ml = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), ou = Uint8Array.from({ length: 16 }, (e, t) => t), Ol = ou.map((e) => (9 * e + 5) % 16);
let ra = [ou], sa = [Ol];
for (let e = 0; e < 4; e++)
  for (let t of [ra, sa])
    t.push(t[e].map((n) => Ml[n]));
const au = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Tl = ra.map((e, t) => e.map((n) => au[t][n])), Pl = sa.map((e, t) => e.map((n) => au[t][n])), Ul = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), Gl = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), Es = (e, t) => e << t | e >>> 32 - t;
function ac(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Is = new Uint32Array(16);
class Hl extends zo {
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
      Is[x] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, l = this.h3 | 0, I = l, g = this.h4 | 0, C = g;
    for (let x = 0; x < 5; x++) {
      const N = 4 - x, b = Ul[x], D = Gl[x], S = ra[x], J = sa[x], T = Tl[x], j = Pl[x];
      for (let L = 0; L < 16; L++) {
        const k = Es(r + ac(x, i, c, l) + Is[S[L]] + b, T[L]) + g | 0;
        r = g, g = l, l = Es(c, 10) | 0, c = i, i = k;
      }
      for (let L = 0; L < 16; L++) {
        const k = Es(s + ac(N, o, d, I) + Is[J[L]] + D, j[L]) + C | 0;
        s = C, C = I, I = Es(d, 10) | 0, d = o, o = k;
      }
    }
    this.set(this.h1 + c + I | 0, this.h2 + l + C | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    Is.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Jl = Fr(() => new Hl());
let cu = !1;
const Au = function(e) {
  return Jl(e);
};
let uu = Au;
function os(e) {
  const t = Vt(e, "data");
  return V(uu(t));
}
os._ = Au;
os.lock = function() {
  cu = !0;
};
os.register = function(e) {
  if (cu)
    throw new TypeError("ripemd160 is locked");
  uu = e;
};
Object.freeze(os);
let du = !1;
const hu = function(e, t, n, r, s) {
  return xl(e, t, n, r, s);
};
let lu = hu;
function Nr(e, t, n, r, s) {
  const i = Vt(e, "password"), o = Vt(t, "salt");
  return V(lu(i, o, n, r, s));
}
Nr._ = hu;
Nr.lock = function() {
  du = !0;
};
Nr.register = function(e) {
  if (du)
    throw new Error("pbkdf2 is locked");
  lu = e;
};
Object.freeze(Nr);
const fu = function(e) {
  return bl("sha256").update(e).digest();
};
let gu = fu, pu = !1;
function Oe(e) {
  const t = Vt(e, "data");
  return V(gu(t));
}
Oe._ = fu;
Oe.lock = function() {
  pu = !0;
};
Oe.register = function(e) {
  if (pu)
    throw new Error("sha256 is locked");
  gu = e;
};
Object.freeze(Oe);
Object.freeze(Oe);
const Zl = {}, Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zl
}, Symbol.toStringTag, { value: "Module" })), Xl = BigInt(0), Vl = BigInt(36);
function cc(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Vt(is(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const ia = {};
for (let e = 0; e < 10; e++)
  ia[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  ia[String.fromCharCode(65 + e)] = String(10 + e);
const Ac = 15;
function jl(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => ia[r]).join("");
  for (; t.length >= Ac; ) {
    let r = t.substring(0, Ac);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const ql = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function $l(e) {
  e = e.toLowerCase();
  let t = Xl;
  for (let n = 0; n < e.length; n++)
    t = t * Vl + ql[e[n]];
  return t;
}
function Wl(e) {
  if (Ce(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = cc(e);
    return Ce(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Ce(e.substring(2, 4) === jl(e), "bad icap checksum", "address", e);
    let t = $l(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return cc("0x" + t);
  }
  Ce(!1, "invalid address", "address", e);
}
function Wi(e, t) {
  return {
    address: Wl(e),
    storageKeys: t.map((n, r) => (Ce(yh(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function Kl(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Ce(n.length === 2, "invalid slot set", `value[${r}]`, n), Wi(n[0], n[1])) : (Ce(n != null && typeof n == "object", "invalid address-slot set", "value", e), Wi(n.address, n.storageKeys)));
  Ce(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return Wi(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const zl = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class as {
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
    F(this, "name");
    di(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new as(this.name);
  }
}
class li extends as {
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
    F(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    F(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    F(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    F(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    F(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    F(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    F(this, "txAccessListAddress");
    const s = { effectiveBlock: n };
    function i(o, c) {
      let d = (r || {})[o];
      d == null && (d = c), Ce(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), di(this, s);
  }
  clone() {
    return new li(this.effectiveBlock, this);
  }
}
class fi extends as {
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
    F(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    F(this, "targetNetwork");
    di(this, {
      address: n || zl,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new fi(this.address, this.targetNetwork);
  }
}
var ns, rs;
class mu extends as {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    wt(this, ns, void 0);
    wt(this, rs, void 0);
    xt(this, ns, n), xt(this, rs, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return be(this, ns);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return be(this, rs);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
ns = new WeakMap(), rs = new WeakMap();
const Ki = /* @__PURE__ */ new Map();
var fr, gr, Dn;
const ar = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    wt(this, fr, void 0);
    wt(this, gr, void 0);
    wt(this, Dn, void 0);
    xt(this, fr, t), xt(this, gr, Jn(n)), xt(this, Dn, /* @__PURE__ */ new Map());
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
    return be(this, fr);
  }
  set name(t) {
    xt(this, fr, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return be(this, gr);
  }
  set chainId(t) {
    xt(this, gr, Jn(t, "chainId"));
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
        return this.chainId === Jn(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === Jn(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === Jn(t.chainId);
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
    return Array.from(be(this, Dn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (be(this, Dn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return be(this, Dn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return be(this, Dn).get(t) || null;
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
    const t = new ar(this.name, this.chainId);
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new li();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = Kl(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (tf(), t == null)
      return ar.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = Ki.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new ar("unknown", t);
      Ce(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Ce(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new ar(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new fi(t.ensAddress, t.ensNetwork)), n;
    }
    Ce(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = Ki.get(t);
    r && Ce(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), Ki.set(t, n);
  }
};
let Yn = ar;
fr = new WeakMap(), gr = new WeakMap(), Dn = new WeakMap();
function uc(e, t) {
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
function dc(e) {
  return new mu(e, async (t, n, r) => {
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
        maxFeePerGas: uc(c.maxFee, 9),
        maxPriorityFeePerGas: uc(c.maxPriorityFee, 9)
      };
    } catch (i) {
      vr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function ef(e) {
  return new mu("data:", async (t, n, r) => {
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
let hc = !1;
function tf() {
  if (hc)
    return;
  hc = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Yn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new fi(null, r.ensNetwork)), i.attachPlugin(new li()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Yn.register(t, s), Yn.register(n, s), r.altNames && r.altNames.forEach((i) => {
      Yn.register(i, s);
    });
  }
  e("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), e("ropsten", 3, { ensNetwork: 3 }), e("rinkeby", 4, { ensNetwork: 4 }), e("goerli", 5, { ensNetwork: 5 }), e("kovan", 42, { ensNetwork: 42 }), e("sepolia", 11155111, {}), e("classic", 61, {}), e("classicKotti", 6, {}), e("arbitrum", 42161, {
    ensNetwork: 1
  }), e("arbitrum-goerli", 421613, {}), e("bnb", 56, { ensNetwork: 1 }), e("bnbt", 97, {}), e("linea", 59144, { ensNetwork: 1 }), e("linea-goerli", 59140, {}), e("matic", 137, {
    ensNetwork: 1,
    plugins: [
      dc("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      dc("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      ef(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function oa(e) {
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
var aa = { exports: {} };
const rf = /* @__PURE__ */ oa(Yl);
aa.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = rf.Buffer;
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
      var f, E, y = 0;
      if (h === "be")
        for (m = a.length - 1, f = 0; m >= 0; m -= 3)
          E = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[f] |= E << y & 67108863, this.words[f + 1] = E >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (h === "le")
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
      var h = c(B, A);
      return A - 1 >= a && (h |= c(B, A - 1) << 4), h;
    }
    i.prototype._parseHex = function(a, A, h) {
      this.length = Math.ceil((a.length - A) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var f = 0, E = 0, y;
      if (h === "be")
        for (m = a.length - 1; m >= A; m -= 2)
          y = d(a, A, m) << f, this.words[E] |= y & 67108863, f >= 18 ? (f -= 18, E += 1, this.words[E] |= y >>> 26) : f += 8;
      else {
        var p = a.length - A;
        for (m = p % 2 === 0 ? A + 1 : A; m < a.length; m += 2)
          y = d(a, A, m) << f, this.words[E] |= y & 67108863, f >= 18 ? (f -= 18, E += 1, this.words[E] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function l(B, a, A, h) {
      for (var m = 0, f = 0, E = Math.min(B.length, A), y = a; y < E; y++) {
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
      for (var E = a.length - h, y = E % m, p = Math.min(E, E - y) + h, u = 0, w = h; w < p; w += m)
        u = l(a, w, w + m, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var Z = 1;
        for (u = l(a, w, a.length, A), w = 0; w < y; w++)
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
    ], N = [
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
        for (var m = 0, f = 0, E = 0; E < this.length; E++) {
          var y = this.words[E], p = ((y << m | f) & 16777215).toString(16);
          f = y >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, E--), f !== 0 || E !== this.length - 1 ? h = C[6 - p.length] + p + h : h = p + h;
        }
        for (f !== 0 && (h = f.toString(16) + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = x[a], w = N[a];
        h = "";
        var Z = this.clone();
        for (Z.negative = 0; !Z.isZero(); ) {
          var X = Z.modrn(w).toString(a);
          Z = Z.idivn(w), Z.isZero() ? h = X + h : h = C[u - X.length] + X + h;
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
      var E = b(a, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](E, m), E;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var h = 0, m = 0, f = 0, E = 0; f < this.length; f++) {
        var y = this.words[f] << E | m;
        a[h++] = y & 255, h < a.length && (a[h++] = y >> 8 & 255), h < a.length && (a[h++] = y >> 16 & 255), E === 6 ? (h < a.length && (a[h++] = y >> 24 & 255), m = 0, E = 0) : (m = y >>> 24, E += 2);
      }
      if (h < a.length)
        for (a[h++] = m; h < a.length; )
          a[h++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var h = a.length - 1, m = 0, f = 0, E = 0; f < this.length; f++) {
        var y = this.words[f] << E | m;
        a[h--] = y & 255, h >= 0 && (a[h--] = y >> 8 & 255), h >= 0 && (a[h--] = y >> 16 & 255), E === 6 ? (h >= 0 && (a[h--] = y >> 24 & 255), m = 0, E = 0) : (m = y >>> 24, E += 2);
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
    function D(B) {
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
      for (var f = 0, E = 0; E < m.length; E++)
        A = (h.words[E] | 0) + (m.words[E] | 0) + f, this.words[E] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && E < h.length; E++)
        A = (h.words[E] | 0) + f, this.words[E] = A & 67108863, f = A >>> 26;
      if (this.length = h.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (h !== this)
        for (; E < h.length; E++)
          this.words[E] = h.words[E];
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
      var h = B.length + a.length | 0;
      A.length = h, h = h - 1 | 0;
      var m = B.words[0] | 0, f = a.words[0] | 0, E = m * f, y = E & 67108863, p = E / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < h; u++) {
        for (var w = p >>> 26, Z = p & 67108863, X = Math.min(u, a.length - 1), K = Math.max(0, u - B.length + 1); K <= X; K++) {
          var q = u - K | 0;
          m = B.words[q] | 0, f = a.words[K] | 0, E = m * f + Z, w += E / 67108864 | 0, Z = E & 67108863;
        }
        A.words[u] = Z | 0, p = w | 0;
      }
      return p !== 0 ? A.words[u] = p | 0 : A.length--, A._strip();
    }
    var J = function(a, A, h) {
      var m = a.words, f = A.words, E = h.words, y = 0, p, u, w, Z = m[0] | 0, X = Z & 8191, K = Z >>> 13, q = m[1] | 0, re = q & 8191, se = q >>> 13, ke = m[2] | 0, ge = ke & 8191, oe = ke >>> 13, Re = m[3] | 0, he = Re & 8191, pe = Re >>> 13, tn = m[4] | 0, Se = tn & 8191, ye = tn >>> 13, Sr = m[5] | 0, Le = Sr & 8191, Ue = Sr >>> 13, ps = m[6] | 0, Je = ps & 8191, Ze = ps >>> 13, Ga = m[7] | 0, Ye = Ga & 8191, Xe = Ga >>> 13, Ha = m[8] | 0, Ve = Ha & 8191, je = Ha >>> 13, Ja = m[9] | 0, qe = Ja & 8191, $e = Ja >>> 13, Za = f[0] | 0, We = Za & 8191, Ke = Za >>> 13, Ya = f[1] | 0, ze = Ya & 8191, et = Ya >>> 13, Xa = f[2] | 0, tt = Xa & 8191, nt = Xa >>> 13, Va = f[3] | 0, rt = Va & 8191, st = Va >>> 13, ja = f[4] | 0, it = ja & 8191, ot = ja >>> 13, qa = f[5] | 0, at = qa & 8191, ct = qa >>> 13, $a = f[6] | 0, At = $a & 8191, ut = $a >>> 13, Wa = f[7] | 0, dt = Wa & 8191, ht = Wa >>> 13, Ka = f[8] | 0, lt = Ka & 8191, ft = Ka >>> 13, za = f[9] | 0, gt = za & 8191, pt = za >>> 13;
      h.negative = a.negative ^ A.negative, h.length = 19, p = Math.imul(X, We), u = Math.imul(X, Ke), u = u + Math.imul(K, We) | 0, w = Math.imul(K, Ke);
      var Ri = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, p = Math.imul(re, We), u = Math.imul(re, Ke), u = u + Math.imul(se, We) | 0, w = Math.imul(se, Ke), p = p + Math.imul(X, ze) | 0, u = u + Math.imul(X, et) | 0, u = u + Math.imul(K, ze) | 0, w = w + Math.imul(K, et) | 0;
      var Si = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, p = Math.imul(ge, We), u = Math.imul(ge, Ke), u = u + Math.imul(oe, We) | 0, w = Math.imul(oe, Ke), p = p + Math.imul(re, ze) | 0, u = u + Math.imul(re, et) | 0, u = u + Math.imul(se, ze) | 0, w = w + Math.imul(se, et) | 0, p = p + Math.imul(X, tt) | 0, u = u + Math.imul(X, nt) | 0, u = u + Math.imul(K, tt) | 0, w = w + Math.imul(K, nt) | 0;
      var _i = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, p = Math.imul(he, We), u = Math.imul(he, Ke), u = u + Math.imul(pe, We) | 0, w = Math.imul(pe, Ke), p = p + Math.imul(ge, ze) | 0, u = u + Math.imul(ge, et) | 0, u = u + Math.imul(oe, ze) | 0, w = w + Math.imul(oe, et) | 0, p = p + Math.imul(re, tt) | 0, u = u + Math.imul(re, nt) | 0, u = u + Math.imul(se, tt) | 0, w = w + Math.imul(se, nt) | 0, p = p + Math.imul(X, rt) | 0, u = u + Math.imul(X, st) | 0, u = u + Math.imul(K, rt) | 0, w = w + Math.imul(K, st) | 0;
      var ki = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, p = Math.imul(Se, We), u = Math.imul(Se, Ke), u = u + Math.imul(ye, We) | 0, w = Math.imul(ye, Ke), p = p + Math.imul(he, ze) | 0, u = u + Math.imul(he, et) | 0, u = u + Math.imul(pe, ze) | 0, w = w + Math.imul(pe, et) | 0, p = p + Math.imul(ge, tt) | 0, u = u + Math.imul(ge, nt) | 0, u = u + Math.imul(oe, tt) | 0, w = w + Math.imul(oe, nt) | 0, p = p + Math.imul(re, rt) | 0, u = u + Math.imul(re, st) | 0, u = u + Math.imul(se, rt) | 0, w = w + Math.imul(se, st) | 0, p = p + Math.imul(X, it) | 0, u = u + Math.imul(X, ot) | 0, u = u + Math.imul(K, it) | 0, w = w + Math.imul(K, ot) | 0;
      var Li = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, p = Math.imul(Le, We), u = Math.imul(Le, Ke), u = u + Math.imul(Ue, We) | 0, w = Math.imul(Ue, Ke), p = p + Math.imul(Se, ze) | 0, u = u + Math.imul(Se, et) | 0, u = u + Math.imul(ye, ze) | 0, w = w + Math.imul(ye, et) | 0, p = p + Math.imul(he, tt) | 0, u = u + Math.imul(he, nt) | 0, u = u + Math.imul(pe, tt) | 0, w = w + Math.imul(pe, nt) | 0, p = p + Math.imul(ge, rt) | 0, u = u + Math.imul(ge, st) | 0, u = u + Math.imul(oe, rt) | 0, w = w + Math.imul(oe, st) | 0, p = p + Math.imul(re, it) | 0, u = u + Math.imul(re, ot) | 0, u = u + Math.imul(se, it) | 0, w = w + Math.imul(se, ot) | 0, p = p + Math.imul(X, at) | 0, u = u + Math.imul(X, ct) | 0, u = u + Math.imul(K, at) | 0, w = w + Math.imul(K, ct) | 0;
      var Mi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, p = Math.imul(Je, We), u = Math.imul(Je, Ke), u = u + Math.imul(Ze, We) | 0, w = Math.imul(Ze, Ke), p = p + Math.imul(Le, ze) | 0, u = u + Math.imul(Le, et) | 0, u = u + Math.imul(Ue, ze) | 0, w = w + Math.imul(Ue, et) | 0, p = p + Math.imul(Se, tt) | 0, u = u + Math.imul(Se, nt) | 0, u = u + Math.imul(ye, tt) | 0, w = w + Math.imul(ye, nt) | 0, p = p + Math.imul(he, rt) | 0, u = u + Math.imul(he, st) | 0, u = u + Math.imul(pe, rt) | 0, w = w + Math.imul(pe, st) | 0, p = p + Math.imul(ge, it) | 0, u = u + Math.imul(ge, ot) | 0, u = u + Math.imul(oe, it) | 0, w = w + Math.imul(oe, ot) | 0, p = p + Math.imul(re, at) | 0, u = u + Math.imul(re, ct) | 0, u = u + Math.imul(se, at) | 0, w = w + Math.imul(se, ct) | 0, p = p + Math.imul(X, At) | 0, u = u + Math.imul(X, ut) | 0, u = u + Math.imul(K, At) | 0, w = w + Math.imul(K, ut) | 0;
      var Oi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, p = Math.imul(Ye, We), u = Math.imul(Ye, Ke), u = u + Math.imul(Xe, We) | 0, w = Math.imul(Xe, Ke), p = p + Math.imul(Je, ze) | 0, u = u + Math.imul(Je, et) | 0, u = u + Math.imul(Ze, ze) | 0, w = w + Math.imul(Ze, et) | 0, p = p + Math.imul(Le, tt) | 0, u = u + Math.imul(Le, nt) | 0, u = u + Math.imul(Ue, tt) | 0, w = w + Math.imul(Ue, nt) | 0, p = p + Math.imul(Se, rt) | 0, u = u + Math.imul(Se, st) | 0, u = u + Math.imul(ye, rt) | 0, w = w + Math.imul(ye, st) | 0, p = p + Math.imul(he, it) | 0, u = u + Math.imul(he, ot) | 0, u = u + Math.imul(pe, it) | 0, w = w + Math.imul(pe, ot) | 0, p = p + Math.imul(ge, at) | 0, u = u + Math.imul(ge, ct) | 0, u = u + Math.imul(oe, at) | 0, w = w + Math.imul(oe, ct) | 0, p = p + Math.imul(re, At) | 0, u = u + Math.imul(re, ut) | 0, u = u + Math.imul(se, At) | 0, w = w + Math.imul(se, ut) | 0, p = p + Math.imul(X, dt) | 0, u = u + Math.imul(X, ht) | 0, u = u + Math.imul(K, dt) | 0, w = w + Math.imul(K, ht) | 0;
      var Ti = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, p = Math.imul(Ve, We), u = Math.imul(Ve, Ke), u = u + Math.imul(je, We) | 0, w = Math.imul(je, Ke), p = p + Math.imul(Ye, ze) | 0, u = u + Math.imul(Ye, et) | 0, u = u + Math.imul(Xe, ze) | 0, w = w + Math.imul(Xe, et) | 0, p = p + Math.imul(Je, tt) | 0, u = u + Math.imul(Je, nt) | 0, u = u + Math.imul(Ze, tt) | 0, w = w + Math.imul(Ze, nt) | 0, p = p + Math.imul(Le, rt) | 0, u = u + Math.imul(Le, st) | 0, u = u + Math.imul(Ue, rt) | 0, w = w + Math.imul(Ue, st) | 0, p = p + Math.imul(Se, it) | 0, u = u + Math.imul(Se, ot) | 0, u = u + Math.imul(ye, it) | 0, w = w + Math.imul(ye, ot) | 0, p = p + Math.imul(he, at) | 0, u = u + Math.imul(he, ct) | 0, u = u + Math.imul(pe, at) | 0, w = w + Math.imul(pe, ct) | 0, p = p + Math.imul(ge, At) | 0, u = u + Math.imul(ge, ut) | 0, u = u + Math.imul(oe, At) | 0, w = w + Math.imul(oe, ut) | 0, p = p + Math.imul(re, dt) | 0, u = u + Math.imul(re, ht) | 0, u = u + Math.imul(se, dt) | 0, w = w + Math.imul(se, ht) | 0, p = p + Math.imul(X, lt) | 0, u = u + Math.imul(X, ft) | 0, u = u + Math.imul(K, lt) | 0, w = w + Math.imul(K, ft) | 0;
      var Pi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, p = Math.imul(qe, We), u = Math.imul(qe, Ke), u = u + Math.imul($e, We) | 0, w = Math.imul($e, Ke), p = p + Math.imul(Ve, ze) | 0, u = u + Math.imul(Ve, et) | 0, u = u + Math.imul(je, ze) | 0, w = w + Math.imul(je, et) | 0, p = p + Math.imul(Ye, tt) | 0, u = u + Math.imul(Ye, nt) | 0, u = u + Math.imul(Xe, tt) | 0, w = w + Math.imul(Xe, nt) | 0, p = p + Math.imul(Je, rt) | 0, u = u + Math.imul(Je, st) | 0, u = u + Math.imul(Ze, rt) | 0, w = w + Math.imul(Ze, st) | 0, p = p + Math.imul(Le, it) | 0, u = u + Math.imul(Le, ot) | 0, u = u + Math.imul(Ue, it) | 0, w = w + Math.imul(Ue, ot) | 0, p = p + Math.imul(Se, at) | 0, u = u + Math.imul(Se, ct) | 0, u = u + Math.imul(ye, at) | 0, w = w + Math.imul(ye, ct) | 0, p = p + Math.imul(he, At) | 0, u = u + Math.imul(he, ut) | 0, u = u + Math.imul(pe, At) | 0, w = w + Math.imul(pe, ut) | 0, p = p + Math.imul(ge, dt) | 0, u = u + Math.imul(ge, ht) | 0, u = u + Math.imul(oe, dt) | 0, w = w + Math.imul(oe, ht) | 0, p = p + Math.imul(re, lt) | 0, u = u + Math.imul(re, ft) | 0, u = u + Math.imul(se, lt) | 0, w = w + Math.imul(se, ft) | 0, p = p + Math.imul(X, gt) | 0, u = u + Math.imul(X, pt) | 0, u = u + Math.imul(K, gt) | 0, w = w + Math.imul(K, pt) | 0;
      var Ui = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, p = Math.imul(qe, ze), u = Math.imul(qe, et), u = u + Math.imul($e, ze) | 0, w = Math.imul($e, et), p = p + Math.imul(Ve, tt) | 0, u = u + Math.imul(Ve, nt) | 0, u = u + Math.imul(je, tt) | 0, w = w + Math.imul(je, nt) | 0, p = p + Math.imul(Ye, rt) | 0, u = u + Math.imul(Ye, st) | 0, u = u + Math.imul(Xe, rt) | 0, w = w + Math.imul(Xe, st) | 0, p = p + Math.imul(Je, it) | 0, u = u + Math.imul(Je, ot) | 0, u = u + Math.imul(Ze, it) | 0, w = w + Math.imul(Ze, ot) | 0, p = p + Math.imul(Le, at) | 0, u = u + Math.imul(Le, ct) | 0, u = u + Math.imul(Ue, at) | 0, w = w + Math.imul(Ue, ct) | 0, p = p + Math.imul(Se, At) | 0, u = u + Math.imul(Se, ut) | 0, u = u + Math.imul(ye, At) | 0, w = w + Math.imul(ye, ut) | 0, p = p + Math.imul(he, dt) | 0, u = u + Math.imul(he, ht) | 0, u = u + Math.imul(pe, dt) | 0, w = w + Math.imul(pe, ht) | 0, p = p + Math.imul(ge, lt) | 0, u = u + Math.imul(ge, ft) | 0, u = u + Math.imul(oe, lt) | 0, w = w + Math.imul(oe, ft) | 0, p = p + Math.imul(re, gt) | 0, u = u + Math.imul(re, pt) | 0, u = u + Math.imul(se, gt) | 0, w = w + Math.imul(se, pt) | 0;
      var Gi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, p = Math.imul(qe, tt), u = Math.imul(qe, nt), u = u + Math.imul($e, tt) | 0, w = Math.imul($e, nt), p = p + Math.imul(Ve, rt) | 0, u = u + Math.imul(Ve, st) | 0, u = u + Math.imul(je, rt) | 0, w = w + Math.imul(je, st) | 0, p = p + Math.imul(Ye, it) | 0, u = u + Math.imul(Ye, ot) | 0, u = u + Math.imul(Xe, it) | 0, w = w + Math.imul(Xe, ot) | 0, p = p + Math.imul(Je, at) | 0, u = u + Math.imul(Je, ct) | 0, u = u + Math.imul(Ze, at) | 0, w = w + Math.imul(Ze, ct) | 0, p = p + Math.imul(Le, At) | 0, u = u + Math.imul(Le, ut) | 0, u = u + Math.imul(Ue, At) | 0, w = w + Math.imul(Ue, ut) | 0, p = p + Math.imul(Se, dt) | 0, u = u + Math.imul(Se, ht) | 0, u = u + Math.imul(ye, dt) | 0, w = w + Math.imul(ye, ht) | 0, p = p + Math.imul(he, lt) | 0, u = u + Math.imul(he, ft) | 0, u = u + Math.imul(pe, lt) | 0, w = w + Math.imul(pe, ft) | 0, p = p + Math.imul(ge, gt) | 0, u = u + Math.imul(ge, pt) | 0, u = u + Math.imul(oe, gt) | 0, w = w + Math.imul(oe, pt) | 0;
      var Hi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, p = Math.imul(qe, rt), u = Math.imul(qe, st), u = u + Math.imul($e, rt) | 0, w = Math.imul($e, st), p = p + Math.imul(Ve, it) | 0, u = u + Math.imul(Ve, ot) | 0, u = u + Math.imul(je, it) | 0, w = w + Math.imul(je, ot) | 0, p = p + Math.imul(Ye, at) | 0, u = u + Math.imul(Ye, ct) | 0, u = u + Math.imul(Xe, at) | 0, w = w + Math.imul(Xe, ct) | 0, p = p + Math.imul(Je, At) | 0, u = u + Math.imul(Je, ut) | 0, u = u + Math.imul(Ze, At) | 0, w = w + Math.imul(Ze, ut) | 0, p = p + Math.imul(Le, dt) | 0, u = u + Math.imul(Le, ht) | 0, u = u + Math.imul(Ue, dt) | 0, w = w + Math.imul(Ue, ht) | 0, p = p + Math.imul(Se, lt) | 0, u = u + Math.imul(Se, ft) | 0, u = u + Math.imul(ye, lt) | 0, w = w + Math.imul(ye, ft) | 0, p = p + Math.imul(he, gt) | 0, u = u + Math.imul(he, pt) | 0, u = u + Math.imul(pe, gt) | 0, w = w + Math.imul(pe, pt) | 0;
      var Ji = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, p = Math.imul(qe, it), u = Math.imul(qe, ot), u = u + Math.imul($e, it) | 0, w = Math.imul($e, ot), p = p + Math.imul(Ve, at) | 0, u = u + Math.imul(Ve, ct) | 0, u = u + Math.imul(je, at) | 0, w = w + Math.imul(je, ct) | 0, p = p + Math.imul(Ye, At) | 0, u = u + Math.imul(Ye, ut) | 0, u = u + Math.imul(Xe, At) | 0, w = w + Math.imul(Xe, ut) | 0, p = p + Math.imul(Je, dt) | 0, u = u + Math.imul(Je, ht) | 0, u = u + Math.imul(Ze, dt) | 0, w = w + Math.imul(Ze, ht) | 0, p = p + Math.imul(Le, lt) | 0, u = u + Math.imul(Le, ft) | 0, u = u + Math.imul(Ue, lt) | 0, w = w + Math.imul(Ue, ft) | 0, p = p + Math.imul(Se, gt) | 0, u = u + Math.imul(Se, pt) | 0, u = u + Math.imul(ye, gt) | 0, w = w + Math.imul(ye, pt) | 0;
      var Zi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, p = Math.imul(qe, at), u = Math.imul(qe, ct), u = u + Math.imul($e, at) | 0, w = Math.imul($e, ct), p = p + Math.imul(Ve, At) | 0, u = u + Math.imul(Ve, ut) | 0, u = u + Math.imul(je, At) | 0, w = w + Math.imul(je, ut) | 0, p = p + Math.imul(Ye, dt) | 0, u = u + Math.imul(Ye, ht) | 0, u = u + Math.imul(Xe, dt) | 0, w = w + Math.imul(Xe, ht) | 0, p = p + Math.imul(Je, lt) | 0, u = u + Math.imul(Je, ft) | 0, u = u + Math.imul(Ze, lt) | 0, w = w + Math.imul(Ze, ft) | 0, p = p + Math.imul(Le, gt) | 0, u = u + Math.imul(Le, pt) | 0, u = u + Math.imul(Ue, gt) | 0, w = w + Math.imul(Ue, pt) | 0;
      var Yi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, p = Math.imul(qe, At), u = Math.imul(qe, ut), u = u + Math.imul($e, At) | 0, w = Math.imul($e, ut), p = p + Math.imul(Ve, dt) | 0, u = u + Math.imul(Ve, ht) | 0, u = u + Math.imul(je, dt) | 0, w = w + Math.imul(je, ht) | 0, p = p + Math.imul(Ye, lt) | 0, u = u + Math.imul(Ye, ft) | 0, u = u + Math.imul(Xe, lt) | 0, w = w + Math.imul(Xe, ft) | 0, p = p + Math.imul(Je, gt) | 0, u = u + Math.imul(Je, pt) | 0, u = u + Math.imul(Ze, gt) | 0, w = w + Math.imul(Ze, pt) | 0;
      var Xi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, p = Math.imul(qe, dt), u = Math.imul(qe, ht), u = u + Math.imul($e, dt) | 0, w = Math.imul($e, ht), p = p + Math.imul(Ve, lt) | 0, u = u + Math.imul(Ve, ft) | 0, u = u + Math.imul(je, lt) | 0, w = w + Math.imul(je, ft) | 0, p = p + Math.imul(Ye, gt) | 0, u = u + Math.imul(Ye, pt) | 0, u = u + Math.imul(Xe, gt) | 0, w = w + Math.imul(Xe, pt) | 0;
      var Vi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, p = Math.imul(qe, lt), u = Math.imul(qe, ft), u = u + Math.imul($e, lt) | 0, w = Math.imul($e, ft), p = p + Math.imul(Ve, gt) | 0, u = u + Math.imul(Ve, pt) | 0, u = u + Math.imul(je, gt) | 0, w = w + Math.imul(je, pt) | 0;
      var ji = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, p = Math.imul(qe, gt), u = Math.imul(qe, pt), u = u + Math.imul($e, gt) | 0, w = Math.imul($e, pt);
      var qi = (y + p | 0) + ((u & 8191) << 13) | 0;
      return y = (w + (u >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, E[0] = Ri, E[1] = Si, E[2] = _i, E[3] = ki, E[4] = Li, E[5] = Mi, E[6] = Oi, E[7] = Ti, E[8] = Pi, E[9] = Ui, E[10] = Gi, E[11] = Hi, E[12] = Ji, E[13] = Zi, E[14] = Yi, E[15] = Xi, E[16] = Vi, E[17] = ji, E[18] = qi, y !== 0 && (E[19] = y, h.length++), h;
    };
    Math.imul || (J = S);
    function T(B, a, A) {
      A.negative = a.negative ^ B.negative, A.length = B.length + a.length;
      for (var h = 0, m = 0, f = 0; f < A.length - 1; f++) {
        var E = m;
        m = 0;
        for (var y = h & 67108863, p = Math.min(f, a.length - 1), u = Math.max(0, f - B.length + 1); u <= p; u++) {
          var w = f - u, Z = B.words[w] | 0, X = a.words[u] | 0, K = Z * X, q = K & 67108863;
          E = E + (K / 67108864 | 0) | 0, q = q + y | 0, y = q & 67108863, E = E + (q >>> 26) | 0, m += E >>> 26, E &= 67108863;
        }
        A.words[f] = y, h = E, E = m;
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
        var f = (this.words[m] | 0) * a, E = (f & 67108863) + (h & 67108863);
        h >>= 26, h += f / 67108864 | 0, h += E >>> 26, this.words[m] = E & 67108863;
      }
      return h !== 0 && (this.words[m] = h, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var A = D(a);
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
        var E = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & m, p = (this.words[f] | 0) - y << A;
          this.words[f] = p | E, E = y >>> 26 - A;
        }
        E && (this.words[f] = E, this.length++);
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
      var f = a % 26, E = Math.min((a - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, p = h;
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
        var Z = this.words[u] | 0;
        this.words[u] = w << 26 - f | Z >>> f, w = Z & y;
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
      var E, y = 0;
      for (f = 0; f < a.length; f++) {
        E = (this.words[f + h] | 0) + y;
        var p = (a.words[f] | 0) * A;
        E -= p & 67108863, y = (E >> 26) - (p / 67108864 | 0), this.words[f + h] = E & 67108863;
      }
      for (; f < this.length - h; f++)
        E = (this.words[f + h] | 0) + y, y = E >> 26, this.words[f + h] = E & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        E = -(this.words[f] | 0) + y, y = E >> 26, this.words[f] = E & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var h = this.length - a.length, m = this.clone(), f = a, E = f.words[f.length - 1] | 0, y = this._countBits(E);
      h = 26 - y, h !== 0 && (f = f.ushln(h), m.iushln(h), E = f.words[f.length - 1] | 0);
      var p = m.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = p + 1, u.words = new Array(u.length);
        for (var w = 0; w < u.length; w++)
          u.words[w] = 0;
      }
      var Z = m.clone()._ishlnsubmul(f, 1, p);
      Z.negative === 0 && (m = Z, u && (u.words[p] = 1));
      for (var X = p - 1; X >= 0; X--) {
        var K = (m.words[f.length + X] | 0) * 67108864 + (m.words[f.length + X - 1] | 0);
        for (K = Math.min(K / E | 0, 67108863), m._ishlnsubmul(f, K, X); m.negative !== 0; )
          K--, m.negative = 0, m._ishlnsubmul(f, 1, X), m.isZero() || (m.negative ^= 1);
        u && (u.words[X] = K);
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
      var m, f, E;
      return this.negative !== 0 && a.negative === 0 ? (E = this.neg().divmod(a, A), A !== "mod" && (m = E.div.neg()), A !== "div" && (f = E.mod.neg(), h && f.negative !== 0 && f.iadd(a)), {
        div: m,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (E = this.divmod(a.neg(), A), A !== "mod" && (m = E.div.neg()), {
        div: m,
        mod: E.mod
      }) : this.negative & a.negative ? (E = this.neg().divmod(a.neg(), A), A !== "div" && (f = E.mod.neg(), h && f.negative !== 0 && f.isub(a)), {
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
      var h = A.div.negative !== 0 ? A.mod.isub(a) : A.mod, m = a.ushrn(1), f = a.andln(1), E = h.cmp(m);
      return E < 0 || f === 1 && E === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
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
      for (var m = new i(1), f = new i(0), E = new i(0), y = new i(1), p = 0; A.isEven() && h.isEven(); )
        A.iushrn(1), h.iushrn(1), ++p;
      for (var u = h.clone(), w = A.clone(); !A.isZero(); ) {
        for (var Z = 0, X = 1; !(A.words[0] & X) && Z < 26; ++Z, X <<= 1)
          ;
        if (Z > 0)
          for (A.iushrn(Z); Z-- > 0; )
            (m.isOdd() || f.isOdd()) && (m.iadd(u), f.isub(w)), m.iushrn(1), f.iushrn(1);
        for (var K = 0, q = 1; !(h.words[0] & q) && K < 26; ++K, q <<= 1)
          ;
        if (K > 0)
          for (h.iushrn(K); K-- > 0; )
            (E.isOdd() || y.isOdd()) && (E.iadd(u), y.isub(w)), E.iushrn(1), y.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), m.isub(E), f.isub(y)) : (h.isub(A), E.isub(m), y.isub(f));
      }
      return {
        a: E,
        b: y,
        gcd: h.iushln(p)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, h = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var m = new i(1), f = new i(0), E = h.clone(); A.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var y = 0, p = 1; !(A.words[0] & p) && y < 26; ++y, p <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            m.isOdd() && m.iadd(E), m.iushrn(1);
        for (var u = 0, w = 1; !(h.words[0] & w) && u < 26; ++u, w <<= 1)
          ;
        if (u > 0)
          for (h.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(E), f.iushrn(1);
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
          var E = A;
          A = h, h = E;
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
      for (var f = m, E = h; f !== 0 && E < this.length; E++) {
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
    var L = {
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
    function M() {
      k.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(M, k), M.prototype.split = function(a, A) {
      for (var h = 4194303, m = Math.min(a.length, 9), f = 0; f < m; f++)
        A.words[f] = a.words[f];
      if (A.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var E = a.words[9];
      for (A.words[A.length++] = E & h, f = 10; f < a.length; f++) {
        var y = a.words[f] | 0;
        a.words[f - 10] = (y & h) << 4 | E >>> 22, E = y;
      }
      E >>>= 22, a.words[f - 10] = E, E === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, M.prototype.imulK = function(a) {
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
      if (L[a])
        return L[a];
      var A;
      if (a === "k256")
        A = new M();
      else if (a === "p224")
        A = new P();
      else if (a === "p192")
        A = new $();
      else if (a === "p25519")
        A = new U();
      else
        throw new Error("Unknown prime " + a);
      return L[a] = A, A;
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
      var E = new i(1).toRed(this), y = E.redNeg(), p = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, p).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var w = this.pow(u, m), Z = this.pow(a, m.addn(1).iushrn(1)), X = this.pow(a, m), K = f; X.cmp(E) !== 0; ) {
        for (var q = X, re = 0; q.cmp(E) !== 0; re++)
          q = q.redSqr();
        r(re < K);
        var se = this.pow(w, new i(1).iushln(K - re - 1));
        Z = Z.redMul(se), w = se.redSqr(), X = X.redMul(w), K = re;
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
      var E = m[0], y = 0, p = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var w = A.words[f], Z = u - 1; Z >= 0; Z--) {
          var X = w >> Z & 1;
          if (E !== m[0] && (E = this.sqr(E)), X === 0 && y === 0) {
            p = 0;
            continue;
          }
          y <<= 1, y |= X, p++, !(p !== h && (f !== 0 || Z !== 0)) && (E = this.mul(E, m[y]), p = 0, y = 0);
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
      var h = a.imul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), E = f;
      return f.cmp(this.m) >= 0 ? E = f.isub(this.m) : f.cmpn(0) < 0 && (E = f.iadd(this.m)), E._forceRed(this);
    }, ee.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var h = a.mul(A), m = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(m).iushrn(this.shift), E = f;
      return f.cmp(this.m) >= 0 ? E = f.isub(this.m) : f.cmpn(0) < 0 && (E = f.iadd(this.m)), E._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, Ee);
})(aa);
var sf = aa.exports;
const ys = /* @__PURE__ */ nf(sf);
var wu = 9, Eu = 3, Eo = 9;
function of(e, t) {
  const { precision: n = wu, minPrecision: r = Eu } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const I = d.match(/.*[1-9]{1}/), g = (I == null ? void 0 : I[0].length) || 0, C = Math.max(r, g);
    d = d.slice(0, C);
  }
  const l = d ? `.${d}` : "";
  return `${c}${l}`;
}
var Ge = class extends ys {
  constructor(t, n, r) {
    let s = t, i = n;
    Ge.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    F(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      throw new v(R.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new v(
        R.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new v(R.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = Eo,
      precision: r = wu,
      minPrecision: s = Eu
    } = t || {}, i = this.formatUnits(n), o = of(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [l = "0"] = o.split(".");
        return `${l}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Eo) {
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
    const r = new ys(this.toArray()).mulTo(t, n);
    return new Ge(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new ys(this.toArray()).egcd(t);
    return {
      a: new Ge(n.toArray()),
      b: new Ge(r.toArray()),
      gcd: new Ge(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new ys(this.toArray()).divmod(new Ge(t), n, r);
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
Q.parseUnits = (e, t = Eo) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new v(
      R.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return Q(c);
};
function Jt(e) {
  return Q(e).toNumber();
}
function ca(e, t) {
  return Q(e).toHex(t);
}
function zt(e, t) {
  return Q(e).toBytes(t);
}
function MB(e, t) {
  return Q(e).formatUnits(t);
}
function OB(e, t) {
  return Q(e).format(t);
}
function af(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function TB(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
function Io(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function cf(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function Iu(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Af(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Io(e.outputLen), Io(e.blockLen);
}
function uf(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function df(e, t) {
  Iu(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const hf = {
  number: Io,
  bool: cf,
  bytes: Iu,
  hash: Af,
  exists: uf,
  output: df
}, Fe = hf;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const lf = (e) => e instanceof Uint8Array, Ns = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Rs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), rn = (e, t) => e << 32 - t | e >>> t, ff = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!ff)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function gf(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function $n(e) {
  if (typeof e == "string" && (e = gf(e)), !lf(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let Aa = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const pf = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function yu(e, t) {
  if (t !== void 0 && (typeof t != "object" || !pf(t)))
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function ua(e) {
  const t = (r) => e().update($n(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function mf(e) {
  const t = (r, s) => e(s).update($n(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
function wf(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
let Ef = class extends Aa {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Rs(this.buffer);
  }
  update(t) {
    Fe.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = $n(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = Rs(t);
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
    wf(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Rs(t), d = this.outputLen;
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
const If = (e, t, n) => e & t ^ ~e & n, yf = (e, t, n) => e & t ^ e & n ^ t & n, Bf = new Uint32Array([
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
let Bu = class extends Ef {
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
      const C = In[g - 15], x = In[g - 2], N = rn(C, 7) ^ rn(C, 18) ^ C >>> 3, b = rn(x, 17) ^ rn(x, 19) ^ x >>> 10;
      In[g] = b + In[g - 7] + N + In[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const C = rn(c, 6) ^ rn(c, 11) ^ rn(c, 25), x = I + C + If(c, d, l) + Bf[g] + In[g] | 0, b = (rn(r, 2) ^ rn(r, 13) ^ rn(r, 22)) + yf(r, s, i) | 0;
      I = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, l, I);
  }
  roundClean() {
    In.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class Cf extends Bu {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const Cu = ua(() => new Bu());
ua(() => new Cf());
let bu = class extends Aa {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Fe.hash(t);
    const r = $n(n);
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
const Qu = (e, t, n) => new bu(e, t).update(n).digest();
Qu.create = (e, t) => new bu(e, t);
function bf(e, t, n, r) {
  Fe.hash(e);
  const s = yu({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Fe.number(i), Fe.number(o), Fe.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = $n(t), l = $n(n), I = new Uint8Array(o), g = Qu.create(e, d), C = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: g, PRFSalt: C };
}
function Qf(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function xu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = bf(e, t, n, r);
  let l;
  const I = new Uint8Array(4), g = Rs(I), C = new Uint8Array(c.outputLen);
  for (let x = 1, N = 0; N < i; x++, N += c.outputLen) {
    const b = o.subarray(N, N + c.outputLen);
    g.setInt32(0, x, !1), (l = d._cloneInto(l)).update(I).digestInto(C), b.set(C.subarray(0, b.length));
    for (let D = 1; D < s; D++) {
      c._cloneInto(l).update(C).digestInto(C);
      for (let S = 0; S < b.length; S++)
        b[S] ^= C[S];
    }
  }
  return Qf(c, d, o, l, C);
}
const we = (e, t) => e << t | e >>> 32 - t;
function lc(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], d = e[t++] ^ n[r++], l = e[t++] ^ n[r++], I = e[t++] ^ n[r++], g = e[t++] ^ n[r++], C = e[t++] ^ n[r++], x = e[t++] ^ n[r++], N = e[t++] ^ n[r++], b = e[t++] ^ n[r++], D = e[t++] ^ n[r++], S = e[t++] ^ n[r++], J = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], L = e[t++] ^ n[r++], k = o, M = c, P = d, $ = l, U = I, H = g, ee = C, B = x, a = N, A = b, h = D, m = S, f = J, E = T, y = j, p = L;
  for (let u = 0; u < 8; u += 2)
    U ^= we(k + f | 0, 7), a ^= we(U + k | 0, 9), f ^= we(a + U | 0, 13), k ^= we(f + a | 0, 18), A ^= we(H + M | 0, 7), E ^= we(A + H | 0, 9), M ^= we(E + A | 0, 13), H ^= we(M + E | 0, 18), y ^= we(h + ee | 0, 7), P ^= we(y + h | 0, 9), ee ^= we(P + y | 0, 13), h ^= we(ee + P | 0, 18), $ ^= we(p + m | 0, 7), B ^= we($ + p | 0, 9), m ^= we(B + $ | 0, 13), p ^= we(m + B | 0, 18), M ^= we(k + $ | 0, 7), P ^= we(M + k | 0, 9), $ ^= we(P + M | 0, 13), k ^= we($ + P | 0, 18), ee ^= we(H + U | 0, 7), B ^= we(ee + H | 0, 9), U ^= we(B + ee | 0, 13), H ^= we(U + B | 0, 18), m ^= we(h + A | 0, 7), a ^= we(m + h | 0, 9), A ^= we(a + m | 0, 13), h ^= we(A + a | 0, 18), f ^= we(p + y | 0, 7), E ^= we(f + p | 0, 9), y ^= we(E + f | 0, 13), p ^= we(y + E | 0, 18);
  s[i++] = o + k | 0, s[i++] = c + M | 0, s[i++] = d + P | 0, s[i++] = l + $ | 0, s[i++] = I + U | 0, s[i++] = g + H | 0, s[i++] = C + ee | 0, s[i++] = x + B | 0, s[i++] = N + a | 0, s[i++] = b + A | 0, s[i++] = D + h | 0, s[i++] = S + m | 0, s[i++] = J + f | 0, s[i++] = T + E | 0, s[i++] = j + y | 0, s[i++] = L + p | 0;
}
function zi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    lc(n, o, e, t, n, i), c > 0 && (o += 16), lc(n, i, e, t += 16, n, o);
}
function xf(e, t, n) {
  const r = yu({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: l, onProgress: I } = r;
  if (Fe.number(s), Fe.number(i), Fe.number(o), Fe.number(c), Fe.number(d), Fe.number(l), I !== void 0 && typeof I != "function")
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
  const N = xu(Cu, e, t, { c: 1, dkLen: g * o }), b = Ns(N), D = Ns(new Uint8Array(g * s)), S = Ns(new Uint8Array(g));
  let J = () => {
  };
  if (I) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let L = 0;
    J = () => {
      L++, I && (!(L % j) || L === T) && I(L / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: C, V: D, B32: b, B: N, tmp: S, blockMixCb: J, asyncTick: d };
}
function vf(e, t, n, r, s) {
  const i = xu(Cu, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function Ff(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: l, B: I, tmp: g, blockMixCb: C } = xf(e, t, n);
  for (let x = 0; x < i; x++) {
    const N = c * x;
    for (let b = 0; b < c; b++)
      d[b] = l[N + b];
    for (let b = 0, D = 0; b < r - 1; b++)
      zi(d, D, d, D += c, s), C();
    zi(d, (r - 1) * c, l, N, s), C();
    for (let b = 0; b < r; b++) {
      const D = l[N + c - 16] % r;
      for (let S = 0; S < c; S++)
        g[S] = l[N + S] ^ d[D * c + S];
      zi(g, 0, l, N, s), C();
    }
  }
  return vf(e, o, I, d, g);
}
Fe.bool;
const fc = Fe.bytes;
function Df(e) {
  return (t) => (Fe.bytes(t), e(t));
}
(() => {
  const e = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, t = typeof module < "u" && typeof module.require == "function" && module.require.bind(module);
  return {
    node: t && !e ? t("crypto") : void 0,
    web: e
  };
})();
function Nf(e, t, n, r, s, i, o) {
  return fc(e), fc(t), Ff(e, t, { N: n, r: s, p: r, dkLen: i, onProgress: o });
}
const Bs = BigInt(2 ** 32 - 1), yo = BigInt(32);
function vu(e, t = !1) {
  return t ? { h: Number(e & Bs), l: Number(e >> yo & Bs) } : { h: Number(e >> yo & Bs) | 0, l: Number(e & Bs) | 0 };
}
function Rf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = vu(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Sf = (e, t) => BigInt(e >>> 0) << yo | BigInt(t >>> 0), _f = (e, t, n) => e >>> n, kf = (e, t, n) => e << 32 - n | t >>> n, Lf = (e, t, n) => e >>> n | t << 32 - n, Mf = (e, t, n) => e << 32 - n | t >>> n, Of = (e, t, n) => e << 64 - n | t >>> n - 32, Tf = (e, t, n) => e >>> n - 32 | t << 64 - n, Pf = (e, t) => t, Uf = (e, t) => e, Gf = (e, t, n) => e << n | t >>> 32 - n, Hf = (e, t, n) => t << n | e >>> 32 - n, Jf = (e, t, n) => t << n - 32 | e >>> 64 - n, Zf = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Yf(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Xf = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Vf = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, jf = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), qf = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, $f = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Wf = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Yr = {
  fromBig: vu,
  split: Rf,
  toBig: Sf,
  shrSH: _f,
  shrSL: kf,
  rotrSH: Lf,
  rotrSL: Mf,
  rotrBH: Of,
  rotrBL: Tf,
  rotr32H: Pf,
  rotr32L: Uf,
  rotlSH: Gf,
  rotlSL: Hf,
  rotlBH: Jf,
  rotlBL: Zf,
  add: Yf,
  add3L: Xf,
  add3H: Vf,
  add4L: jf,
  add4H: qf,
  add5H: Wf,
  add5L: $f
}, [Fu, Du, Nu] = [[], [], []], Kf = BigInt(0), kr = BigInt(1), zf = BigInt(2), eg = BigInt(7), tg = BigInt(256), ng = BigInt(113);
for (let e = 0, t = kr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Fu.push(2 * (5 * r + n)), Du.push((e + 1) * (e + 2) / 2 % 64);
  let s = Kf;
  for (let i = 0; i < 7; i++)
    t = (t << kr ^ (t >> eg) * ng) % tg, t & zf && (s ^= kr << (kr << BigInt(i)) - kr);
  Nu.push(s);
}
const [rg, sg] = Yr.split(Nu, !0), gc = (e, t, n) => n > 32 ? Yr.rotlBH(e, t, n) : Yr.rotlSH(e, t, n), pc = (e, t, n) => n > 32 ? Yr.rotlBL(e, t, n) : Yr.rotlSL(e, t, n);
function ig(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, l = n[d], I = n[d + 1], g = gc(l, I, 1) ^ n[c], C = pc(l, I, 1) ^ n[c + 1];
      for (let x = 0; x < 50; x += 10)
        e[o + x] ^= g, e[o + x + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = Du[o], d = gc(s, i, c), l = pc(s, i, c), I = Fu[o];
      s = e[I], i = e[I + 1], e[I] = d, e[I + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= rg[r], e[1] ^= sg[r];
  }
  n.fill(0);
}
class gi extends Aa {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Fe.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ns(this.state);
  }
  keccak() {
    ig(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Fe.exists(this);
    const { blockLen: n, state: r } = this;
    t = $n(t);
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
    return t || (t = new gi(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Tn = (e, t, n) => ua(() => new gi(t, e, n));
Tn(6, 144, 224 / 8);
Tn(6, 136, 256 / 8);
Tn(6, 104, 384 / 8);
Tn(6, 72, 512 / 8);
Tn(1, 144, 224 / 8);
const mc = Tn(1, 136, 256 / 8);
Tn(1, 104, 384 / 8);
Tn(1, 72, 512 / 8);
const Ru = (e, t, n) => mf((r = {}) => new gi(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
Ru(31, 168, 128 / 8);
Ru(31, 136, 256 / 8);
const og = (() => {
  const e = Df(mc);
  return e.create = mc.create, e;
})();
var ag = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return Nf(t, n, r, i, s, o);
}, cg = (e) => og(e), cr = (e, t = "base64") => {
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
}, { crypto: pi, btoa: Su } = globalThis;
if (!pi)
  throw new v(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Su)
  throw new v(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Bo = (e) => pi.getRandomValues(new Uint8Array(e)), Ss = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return Su(n);
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
}, _u = "AES-CTR", da = (e, t) => {
  const n = cr(String(e).normalize("NFKC"), "utf-8"), r = Nr(n, t, 1e5, 32, "sha256");
  return Y(r);
}, Ag = async (e, t) => {
  const n = Bo(16), r = Bo(32), s = da(e, r), i = JSON.stringify(t), o = cr(i, "utf-8"), c = {
    name: _u,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), l = await crypto.subtle.encrypt(c, d, o);
  return {
    data: Ss(l),
    iv: Ss(n),
    salt: Ss(r)
  };
}, ug = async (e, t) => {
  const n = cr(t.iv), r = cr(t.salt), s = da(e, r), i = cr(t.data), o = {
    name: _u,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), l = new TextDecoder().decode(d);
  try {
    return JSON.parse(l);
  } catch {
    throw new v(R.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, dg = async (e, t, n) => {
  const r = pi.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, hg = async (e, t, n) => {
  const r = pi.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
  bufferFromString: cr,
  stringFromBuffer: Ss,
  decrypt: ug,
  encrypt: Ag,
  keyFromPassword: da,
  randomBytes: Bo,
  scrypt: ag,
  keccak256: cg,
  decryptJsonWalletData: hg,
  encryptJsonWalletData: dg
}, fg = lg, {
  bufferFromString: Sn,
  decrypt: gg,
  encrypt: pg,
  keyFromPassword: JB,
  randomBytes: kn,
  stringFromBuffer: Or,
  scrypt: ku,
  keccak256: Lu,
  decryptJsonWalletData: mg,
  encryptJsonWalletData: wg
} = fg, Eg = Object.defineProperty, Ig = (e, t, n) => t in e ? Eg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, mi = (e, t, n) => (Ig(e, typeof t != "symbol" ? t + "" : t, n), n), yg = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Mu = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Ou = (e, t, n) => (yg(e, t, "access private method"), n), ie = class {
  constructor(e, t, n) {
    F(this, "name");
    F(this, "type");
    F(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, Tu = "enum Option", Pu = "struct Vec", Uu = "struct Bytes", Gu = "struct String", Hu = /str\[(?<length>[0-9]+)\]/, Co = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, Ju = /^struct (?<name>\w+)$/, Zu = /^enum (?<name>\w+)$/, Bg = /^\((?<items>.*)\)$/, Cg = /^generic (?<name>\w+)$/, ne = 8, cs = 32, Xr = cs, bg = cs, Qg = cs, xg = ne * 4, vg = ne * 2, ha = 2 ** 32 - 1, wi = ({ maxInputs: e }) => cs + // Tx ID
ne + // Tx size
// Asset ID/Balance coin input pairs
e * (Xr + ne), la = ne + // Identifier
ne + // Gas limit
ne + // Script size
ne + // Script data size
ne + // Policies
ne + // Inputs size
ne + // Outputs size
ne + // Witnesses size
cs, Fg = ne + // Identifier
xg + // Utxo Length
ne + // Output Index
Qg + // Owner
ne + // Amount
Xr + // Asset id
vg + // TxPointer
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
      t = zt(e, ne);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + ne);
    if (n = n.slice(0, ne), n.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [Q(n), t + ne];
  }
}, Dg = 3, Qt = Dg * ne, Ng = 2, wc = Ng * ne;
function Pt(e) {
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
function Yu(e, t, n) {
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
      Yu(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = de([s, l]), r += l.byteLength;
  }), s;
}
var Xu = (e, t = ne) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Rg = (e) => {
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
}, Sg = (e) => e === Pu || e === Uu || e === Gu;
function Ot(e, t, n = () => {
  throw new v(R.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var Vr = (e) => e % ne === 0, Vu = (e) => ne - e % ne, ju = (e) => {
  if (Vr(e.length))
    return e;
  const t = new Uint8Array(ne - e.length % ne);
  return UA([e, t]);
}, Ct = class extends ie {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    F(this, "coder");
    F(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Pt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > ha)
      throw new v(R.DECODE_ERROR, "Invalid array data size.");
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
    return [ca(n, 32), t + 32];
  }
}, _g = class extends ie {
  constructor() {
    super("b512", "struct B512", ne * 8);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
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
    return [ca(n, this.encodedLength), t + this.encodedLength];
  }
}, kg = class extends ie {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    F(this, "paddingLength");
    F(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new v(R.ENCODE_ERROR, "Invalid boolean value.");
    const r = zt(t ? 1 : 0, this.paddingLength);
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
}, Lg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), pr, Nn, si, $u, ii, Wu, NA, qu = (NA = class extends ie {
  constructor(t, n) {
    const r = new _(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    wt(this, si);
    wt(this, ii);
    F(this, "name");
    F(this, "coders");
    wt(this, pr, void 0);
    wt(this, Nn, void 0);
    this.name = t, this.coders = n, xt(this, pr, r), xt(this, Nn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return Pn(this, si, $u).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new v(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new v(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(be(this, Nn) - s.encodedLength);
    return Pt([be(this, pr).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < be(this, Nn))
      throw new v(R.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new _().decode(t, r);
    const i = Jt(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new v(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = be(this, Nn) - c.encodedLength;
    return r += d, [s, r] = c.decode(t, r), Lg(this.coders) ? Pn(this, ii, Wu).call(this, o, r) : [{ [o]: s }, r];
  }
}, pr = new WeakMap(), Nn = new WeakMap(), si = new WeakSet(), $u = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(be(this, Nn) - n.encodedLength);
  return de([be(this, pr).encode(s), i, r]);
}, ii = new WeakSet(), Wu = function(t, n) {
  return [t, n];
}, NA), z = class extends ie {
  constructor(t, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && t === "u8" ? 1 : 8;
    super("number", t, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    F(this, "length");
    F(this, "paddingLength");
    F(this, "baseType");
    F(this, "options");
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
      n = zt(t);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = zt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Jt(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new v(R.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new v(R.DECODE_ERROR, "Invalid number byte data size.");
    return [Jt(r), n + 8];
  }
}, mr, RA, Mg = (RA = class extends ie {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    F(this, "length");
    wt(this, mr, void 0);
    this.length = t, xt(this, mr, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = Wo(t), r = new Uint8Array(be(this, mr));
    return de([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new v(R.DECODE_ERROR, "Invalid string byte data size.");
    const s = hi(r), i = be(this, mr);
    return [s, n + this.length + i];
  }
}, mr = new WeakMap(), RA), Ku = class extends qu {
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
}, Ei = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    F(this, "name");
    F(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof Ku) && i == null)
        throw new v(
          R.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Vr(o.length) ? o : ju(o);
    });
    return Pt([Pt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), Vr(r) || (r += Vu(r)), i[o] = d, i;
    }, {}), r];
  }
}, zu = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    F(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new v(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Pt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return Vr(s.length) ? s : ju(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), Vr(r) || (r += Vu(r)), o;
    }), r];
  }
}, ed = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Qt);
    F(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new _().encode(Qt);
    return r.dynamicData = {
      0: Pt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new _().encode(t.length)), n.push(new _().encode(t.length)), Pt(n);
  }
  decode(t, n) {
    if (t.length < Qt || t.length > ha)
      throw new v(R.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new _().decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Qt, Qt + i);
    if (o.length !== i)
      throw new v(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Xu(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + Qt
    ];
  }
}, bo, td, Hs = class extends ie {
  constructor() {
    super("struct", "struct Bytes", Qt), Mu(this, bo);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new _().encode(Qt), r = Ou(this, bo, td).call(this, e);
    return n.dynamicData = {
      0: Pt([r])
    }, t.push(n), t.push(new _().encode(r.byteLength)), t.push(new _().encode(e.length)), Pt(t);
  }
  decode(e, t) {
    if (e.length < Qt)
      throw new v(R.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new _().decode(n, 0)[0]).toNumber(), s = e.slice(Qt, Qt + r);
    if (s.length !== r)
      throw new v(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Qt];
  }
};
bo = /* @__PURE__ */ new WeakSet();
td = function(e) {
  const t = [Uint8Array.from(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), de(t);
};
mi(Hs, "memorySize", 1);
var Og = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", wc);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new v(R.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new z("u8", { isSmallBytes: !0 }), r = new _().encode(wc);
    return r.dynamicData = {
      0: Pt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new _().encode(e.length)), Pt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new Ct(
      new z("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, Qo, nd, rd = class extends ie {
  constructor() {
    super("struct", "struct String", 1), Mu(this, Qo);
  }
  encode(e) {
    const t = [], n = new _().encode(Qt), r = Ou(this, Qo, nd).call(this, e);
    return n.dynamicData = {
      0: Pt([r])
    }, t.push(n), t.push(new _().encode(r.byteLength)), t.push(new _().encode(e.length)), Pt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new _().decode(n, 0)[0]).toNumber(), s = e.slice(Qt, Qt + r);
    if (s.length !== r)
      throw new v(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [hi(s), t + Qt];
  }
};
Qo = /* @__PURE__ */ new WeakSet();
nd = function(e) {
  const t = [Wo(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), de(t);
};
mi(rd, "memorySize", 1);
var Tg = class extends ie {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new v(R.ENCODE_ERROR, "Invalid boolean value.");
    return zt(e ? 1 : 0, this.encodedLength);
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
}, sd = class extends ie {
  constructor() {
    super("struct", "struct Bytes", 1);
  }
  encode(e) {
    throw new v(R.ENCODE_ERROR, "Bytes encode unsupported in v1");
  }
  decode(e, t) {
    if (e.length < ne)
      throw new v(R.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = s * this.encodedLength, o = e.slice(n, n + i);
    if (o.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [o, t + i];
  }
};
mi(sd, "memorySize", 1);
var Pg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), oi, ss, ai, id, SA, Ug = (SA = class extends ie {
  constructor(t, n) {
    const r = new _(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    wt(this, ai);
    F(this, "name");
    F(this, "coders");
    wt(this, oi, void 0);
    wt(this, ss, void 0);
    this.name = t, this.coders = n, xt(this, oi, r), xt(this, ss, s);
  }
  encode(t) {
    throw new v(R.ENCODE_ERROR, "Enum encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < be(this, ss))
      throw new v(R.DECODE_ERROR, "Invalid enum data size.");
    const r = new _().decode(t, n)[0], s = Jt(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new v(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + ne, [d, l] = o.decode(t, c);
    return Pg(this.coders) ? Pn(this, ai, id).call(this, i, l) : [{ [i]: d }, l];
  }
}, oi = new WeakMap(), ss = new WeakMap(), ai = new WeakSet(), id = function(t, n) {
  return [t, n];
}, SA), Gg = (e) => {
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
}, od = class extends ie {
  constructor(t) {
    const n = Gg(t);
    super("number", t, n);
    F(this, "length");
    F(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = zt(t);
    } catch {
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new v(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return zt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid number byte data size.");
    return [Jt(r), n + this.length];
  }
}, Hg = class extends ie {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ne);
  }
  encode(e) {
    throw new v(R.ENCODE_ERROR, "Raw slice encode unsupported in v1");
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new Ct(new od("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, ad = class extends ie {
  constructor() {
    super("struct", "struct String", ne);
  }
  encode(e) {
    throw new v(R.ENCODE_ERROR, "StdString encode unsupported in v1");
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ne, r = e.slice(t, n), s = Q(new _().decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new v(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [hi(i), n + s];
  }
};
mi(ad, "memorySize", 1);
var Jg = class extends ie {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new v(R.ENCODE_ERROR, "Value length mismatch during encode.");
    return Wo(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid string byte data size.");
    return [hi(n), t + this.encodedLength];
  }
}, Zg = class extends ie {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    F(this, "name");
    F(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    throw new v(R.ENCODE_ERROR, "Struct encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new v(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), i[o] = d, i;
    }, {}), r];
  }
}, Yg = class extends ie {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    F(this, "coders");
    this.coders = t;
  }
  encode(t) {
    throw this.coders.length !== t.length ? new v(R.ENCODE_ERROR, "Types/values length mismatch.") : new v(R.ENCODE_ERROR, "Tuple encode unsupported in v1");
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
}, Xg = class extends ie {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ne);
    F(this, "coder");
    this.coder = t;
  }
  encode(t) {
    throw new v(R.ENCODE_ERROR, "Vec encode unsupported in v1");
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > ha)
      throw new v(R.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ne, s = t.slice(n, r), o = Q(new _().decode(s, 0)[0]).toNumber() * this.coder.encodedLength, c = t.slice(r, r + o);
    if (c.length !== o)
      throw new v(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Xu(c, this.coder.encodedLength).map(
        (d) => this.coder.decode(d, 0)[0]
      ),
      r + o
    ];
  }
}, vn = class {
  constructor(e, t) {
    F(this, "abi");
    F(this, "name");
    F(this, "type");
    F(this, "originalTypeArguments");
    F(this, "components");
    this.abi = e;
    const n = Ot(
      e.types,
      (r) => r.typeId === t.type,
      () => {
        throw new v(
          R.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: t,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = t.name, this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = vn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? vn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new vn(e, o));
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
    ).map((o) => new vn(e, o));
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
      const s = Ot(e.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Ot(e.types, (o) => o.typeId === s.type);
      if (Cg.test(i.type)) {
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
    return Ju.test(this.type) ? "s" : Co.test(this.type) ? "a" : Zu.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Hu.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Co.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new vn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
}, Mt = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new vn(e, t);
    return Mt.getCoderImpl(r, n);
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
    var l, I, g, C, x, N;
    const { version: n } = t;
    switch (e.type) {
      case "u8":
      case "u16":
      case "u32":
        return n ? new od(e.type) : new z(e.type, t);
      case "u64":
      case "raw untyped ptr":
        return new _();
      case "raw untyped slice":
        return n ? new Hg() : new Og();
      case "bool":
        return n ? new Tg() : new kg(t);
      case "b256":
        return new G();
      case "struct B512":
        return new _g();
      case Uu:
        return n ? new sd() : new Hs();
      case Gu:
        return n ? new ad() : new rd();
    }
    const r = (l = Hu.exec(e.type)) == null ? void 0 : l.groups;
    if (r) {
      const b = parseInt(r.length, 10);
      return n ? new Jg(b) : new Mg(b);
    }
    const s = e.components, i = (I = Co.exec(e.type)) == null ? void 0 : I.groups;
    if (i) {
      const b = parseInt(i.length, 10), D = s[0];
      if (!D)
        throw new v(
          R.INVALID_COMPONENT,
          "The provided Array type is missing an item of 'component'."
        );
      const S = Mt.getCoderImpl(D, { version: n, isSmallBytes: !0 });
      return new Ct(S, b);
    }
    if (e.type === Pu) {
      const b = (g = Ot(s, (J) => J.name === "buf").originalTypeArguments) == null ? void 0 : g[0];
      if (!b)
        throw new v(
          R.INVALID_COMPONENT,
          "The provided Vec type is missing the 'type argument'."
        );
      const D = new vn(e.abi, b), S = Mt.getCoderImpl(D, { version: n, isSmallBytes: !0 });
      return n ? new Xg(S) : new ed(S);
    }
    const o = (C = Ju.exec(e.type)) == null ? void 0 : C.groups;
    if (o) {
      const b = Mt.getCoders(s, { version: n, isRightPadded: !0 });
      return n ? new Zg(o.name, b) : new Ei(o.name, b);
    }
    const c = (x = Zu.exec(e.type)) == null ? void 0 : x.groups;
    if (c) {
      const b = Mt.getCoders(s, { version: n });
      return e.type === Tu ? new Ku(c.name, b) : n ? new Ug(c.name, b) : new qu(c.name, b);
    }
    if ((N = Bg.exec(e.type)) == null ? void 0 : N.groups) {
      const b = s.map(
        (D) => Mt.getCoderImpl(D, { version: n, isRightPadded: !0 })
      );
      return n ? new Yg(b) : new zu(b);
    }
    throw e.type === "str" ? new v(
      R.INVALID_DATA,
      "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
    ) : new v(
      R.CODER_NOT_FOUND,
      `Coder not found: ${JSON.stringify(e)}.`
    );
  }
  static getCoders(e, t) {
    return e.reduce((n, r) => {
      const s = n;
      return s[r.name] = Mt.getCoderImpl(r, t), s;
    }, {});
  }
}, ci, cd, Ai, Ad, ui, ud, _A, _s = (_A = class {
  constructor(e, t) {
    wt(this, ci);
    wt(this, Ai);
    wt(this, ui);
    F(this, "signature");
    F(this, "selector");
    F(this, "name");
    F(this, "jsonFn");
    F(this, "attributes");
    F(this, "isInputDataPointer");
    F(this, "outputMetadata");
    F(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Ot(this.jsonAbi.functions, (n) => n.name === t), this.name = t, this.signature = _s.getSignature(this.jsonAbi, this.jsonFn), this.selector = _s.getFunctionSelector(this.signature), this.isInputDataPointer = Pn(this, ci, cd).call(this), this.outputMetadata = {
      isHeapType: Pn(this, Ai, Ad).call(this),
      encodedLength: Pn(this, ui, ud).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new vn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Oe(Sn(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    _s.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = this.jsonFn.inputs.filter(
      (c) => Ot(this.jsonAbi.types, (d) => d.typeId === c.type).type !== "()"
    );
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (c) => Mt.getCoder(this.jsonAbi, c, {
        isRightPadded: r.length > 1
      })
    ), o = new zu(s).encode(n);
    return Yu(o, t, o.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Ot(n.types, (c) => c.typeId === o.type)), s = r.filter(
      (o) => o.type === Tu || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new v(R.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = Y(e), n = this.jsonFn.inputs.filter(
      (s) => Ot(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new v(
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
        const o = Mt.getCoder(this.jsonAbi, i), [c, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (Ot(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    ).type === "()")
      return [void 0, 0];
    const n = Y(e);
    return Mt.getCoder(this.jsonAbi, this.jsonFn.output).decode(n, 0);
  }
}, ci = new WeakSet(), cd = function() {
  var t;
  const e = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Rg(((t = e[0]) == null ? void 0 : t.type) || "");
}, Ai = new WeakSet(), Ad = function() {
  const e = Ot(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);
  return Sg((e == null ? void 0 : e.type) || "");
}, ui = new WeakSet(), ud = function() {
  try {
    const e = Mt.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof ed ? e.coder.encodedLength : e instanceof Hs ? Hs.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, _A), Ln = class {
  constructor(e) {
    F(this, "functions");
    F(this, "configurables");
    /*
      TODO: Refactor so that there's no need for externalLoggedTypes
    
      This is dedicated to external contracts added via `<base-invocation-scope.ts>.addContracts()` method.
      This is used to decode logs from contracts other than the main contract
      we're interacting with.
      */
    F(this, "externalLoggedTypes");
    F(this, "jsonAbi");
    this.jsonAbi = e, this.externalLoggedTypes = {}, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new _s(this.jsonAbi, t.name)])
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
    const { loggedType: s } = Ot(this.jsonAbi.loggedTypes, (i) => i.logId === t);
    return Mt.decode(this.jsonAbi, s, Y(e), 0, {
      version: this.jsonAbi.encoding
    });
  }
  updateExternalLoggedTypes(e, t) {
    this.externalLoggedTypes[e] = t;
  }
  encodeConfigurable(e, t) {
    const n = Ot(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new v(
          R.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return Mt.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return Ot(
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
}, ZB = class {
}, Vg = class {
}, dd = class {
}, hd = class {
}, jg = class extends hd {
}, qg = class extends hd {
}, Rn, kA, Ie = (kA = class extends ie {
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
    F(this, "length");
    wt(this, Rn, void 0);
    this.length = t, xt(this, Rn, n);
  }
  encode(t) {
    const n = [], r = Y(t);
    return n.push(r), be(this, Rn) && n.push(new Uint8Array(be(this, Rn))), de(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [V(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return be(this, Rn) && ([r, s] = [null, s + be(this, Rn)]), [i, s];
  }
}, Rn = new WeakMap(), kA), wr = class extends Ei {
  constructor() {
    super("TxPointer", {
      blockHeight: new z("u32"),
      txIndex: new z("u16")
    });
  }
}, Qe = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(Qe || {}), Ec = class extends ie {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new wr().encode(e.txPointer)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new z("u32").encode(e.maturity)), t.push(new _().encode(e.predicateGasUsed)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), de(t);
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
    [n, r] = new wr().decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const I = Number(n);
    [n, r] = new z("u32").decode(e, r);
    const g = n;
    [n, r] = new _().decode(e, r);
    const C = n;
    [n, r] = new z("u32").decode(e, r);
    const x = n;
    [n, r] = new z("u32").decode(e, r);
    const N = n;
    [n, r] = new Ie(x).decode(e, r);
    const b = n;
    return [n, r] = new Ie(N).decode(e, r), [
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
        predicateDataLength: N,
        predicate: b,
        predicateData: n
      },
      r
    ];
  }
}, Js = class extends ie {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new wr().encode(e.txPointer)), t.push(new G().encode(e.contractID)), de(t);
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
    [n, r] = new wr().decode(e, r);
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
}, jr = class extends ie {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _().encode(e.amount)), t.push(Y(e.data || "0x")), Oe(de(t));
  }
  static encodeData(e) {
    const t = Y(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = jr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new _().encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new _().encode(e.predicateGasUsed)), t.push(new z("u16").encode(n.length)), t.push(new z("u16").encode(e.predicateLength)), t.push(new z("u16").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), de(t);
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
    [n, r] = new z("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new _().decode(e, r);
    const l = n;
    [n, r] = new z("u16").decode(e, r);
    const I = n;
    [n, r] = new z("u16").decode(e, r);
    const g = n;
    [n, r] = new z("u16").decode(e, r);
    const C = n;
    [n, r] = new Ie(g).decode(e, r);
    const x = n;
    [n, r] = new Ie(I).decode(e, r);
    const N = n;
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
        predicate: N,
        predicateData: n
      },
      r
    ];
  }
}, Zs = class extends ie {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Ec().encode(e));
        break;
      }
      case 1: {
        t.push(new Js().encode(e));
        break;
      }
      case 2: {
        t.push(new jr().encode(e));
        break;
      }
      default:
        throw new v(
          R.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ec().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Js().decode(e, r), [n, r];
      case 2:
        return [n, r] = new jr().decode(e, r), [n, r];
      default:
        throw new v(
          R.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Be || {}), Ic = class extends ie {
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
}, Ys = class extends ie {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u8").encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), de(t);
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
}, yc = class extends ie {
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
}, Bc = class extends ie {
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
}, Cc = class extends ie {
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
}, Xs = class extends ie {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Ic().encode(e));
        break;
      }
      case 1: {
        t.push(new Ys().encode(e));
        break;
      }
      case 2: {
        t.push(new yc().encode(e));
        break;
      }
      case 3: {
        t.push(new Bc().encode(e));
        break;
      }
      case 4: {
        t.push(new Cc().encode(e));
        break;
      }
      default:
        throw new v(
          R.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ic().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ys().decode(e, r), [n, r];
      case 2:
        return [n, r] = new yc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Bc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Cc().decode(e, r), [n, r];
      default:
        throw new v(
          R.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, $t = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))($t || {}), $g = (e) => e.sort((t, n) => t.type - n.type);
function Wg(e) {
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
var Vs = class extends ie {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Wg(e);
    const t = $g(e), n = [];
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
          throw new v(R.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
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
      const [i, o] = new z("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new _().decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, ue = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ue || {}), bc = class extends ie {
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
}, Qc = class extends ie {
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
}, xc = class extends ie {
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
}, vc = class extends ie {
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
}, Fc = class extends ie {
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
}, Dc = class extends ie {
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
}, Nc = class extends ie {
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
}, Rc = class extends ie {
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
}, Sc = class extends ie {
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
}, _c = class extends ie {
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
}, js = class extends ie {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new _().encode(e.amount)), t.push(Y(e.data || "0x")), Oe(de(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new _().encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new z("u16").encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new Ie(e.data.length).encode(e.data)), de(t);
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
    return g.messageId = js.getMessageId(g), [g, r];
  }
}, ld = (e, t) => {
  const n = Y(e), r = Y(t);
  return Oe(de([n, r]));
}, qr = class extends ie {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return ld(e, t);
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
    const d = n, l = qr.getAssetId(i, s);
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
}, xo = class extends ie {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return ld(e, t);
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
    const d = n, l = qr.getAssetId(i, s);
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
}, YB = class extends ie {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new bc().encode(e));
        break;
      }
      case 1: {
        t.push(new Qc().encode(e));
        break;
      }
      case 2: {
        t.push(new xc().encode(e));
        break;
      }
      case 3: {
        t.push(new vc().encode(e));
        break;
      }
      case 4: {
        t.push(new Fc().encode(e));
        break;
      }
      case 5: {
        t.push(new Dc().encode(e));
        break;
      }
      case 6: {
        t.push(new Nc().encode(e));
        break;
      }
      case 7: {
        t.push(new Rc().encode(e));
        break;
      }
      case 8: {
        t.push(new Sc().encode(e));
        break;
      }
      case 9: {
        t.push(new _c().encode(e));
        break;
      }
      case 10: {
        t.push(new js().encode(e));
        break;
      }
      case 11: {
        t.push(new qr().encode(e));
        break;
      }
      case 12: {
        t.push(new xo().encode(e));
        break;
      }
      default:
        throw new v(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new bc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Qc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new xc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new vc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Fc().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Dc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Nc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new Rc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Sc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new _c().decode(e, r), [n, r];
      case 10:
        return [n, r] = new js().decode(e, r), [n, r];
      case 11:
        return [n, r] = new qr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new xo().decode(e, r), [n, r];
      default:
        throw new v(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, kc = class extends Ei {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, qs = class extends ie {
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
    return t.push(new z("u16").encode(e.dataLength)), t.push(new Ie(e.dataLength).encode(e.data)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u16").decode(e, r);
    const s = n;
    return [n, r] = new Ie(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, vt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(vt || {}), Lc = class extends ie {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new _().encode(e.scriptGasLimit)), t.push(new z("u16").encode(e.scriptLength)), t.push(new z("u16").encode(e.scriptDataLength)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new G().encode(e.receiptsRoot)), t.push(new Ie(e.scriptLength).encode(e.script)), t.push(new Ie(e.scriptDataLength).encode(e.scriptData)), t.push(new Vs().encode(e.policies)), t.push(new Ct(new Zs(), e.inputsCount).encode(e.inputs)), t.push(new Ct(new Xs(), e.outputsCount).encode(e.outputs)), t.push(new Ct(new qs(), e.witnessesCount).encode(e.witnesses)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new _().decode(e, r);
    const s = n;
    [n, r] = new z("u16").decode(e, r);
    const i = n;
    [n, r] = new z("u16").decode(e, r);
    const o = n;
    [n, r] = new z("u32").decode(e, r);
    const c = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const I = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Ie(i).decode(e, r);
    const C = n;
    [n, r] = new Ie(o).decode(e, r);
    const x = n;
    [n, r] = new Vs().decode(e, r, c);
    const N = n;
    [n, r] = new Ct(new Zs(), d).decode(e, r);
    const b = n;
    [n, r] = new Ct(new Xs(), l).decode(e, r);
    const D = n;
    return [n, r] = new Ct(new qs(), I).decode(e, r), [
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
        policies: N,
        inputs: b,
        outputs: D,
        witnesses: n
      },
      r
    ];
  }
}, Mc = class extends ie {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u16").encode(e.bytecodeLength)), t.push(new z("u8").encode(e.bytecodeWitnessIndex)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u16").encode(e.storageSlotsCount)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new G().encode(e.salt)), t.push(new Vs().encode(e.policies)), t.push(
      new Ct(new kc(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new Ct(new Zs(), e.inputsCount).encode(e.inputs)), t.push(new Ct(new Xs(), e.outputsCount).encode(e.outputs)), t.push(new Ct(new qs(), e.witnessesCount).encode(e.witnesses)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u16").decode(e, r);
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
    const I = n;
    [n, r] = new G().decode(e, r);
    const g = n;
    [n, r] = new Vs().decode(e, r, o);
    const C = n;
    [n, r] = new Ct(new kc(), c).decode(e, r);
    const x = n;
    [n, r] = new Ct(new Zs(), d).decode(e, r);
    const N = n;
    [n, r] = new Ct(new Xs(), l).decode(e, r);
    const b = n;
    return [n, r] = new Ct(new qs(), I).decode(e, r), [
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
        inputs: N,
        outputs: b,
        witnesses: n
      },
      r
    ];
  }
}, Oc = class extends ie {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new wr().encode(e.txPointer)), t.push(new Js().encode(e.inputContract)), t.push(new Ys().encode(e.outputContract)), t.push(new _().encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new wr().decode(e, r);
    const s = n;
    [n, r] = new Js().decode(e, r);
    const i = n;
    [n, r] = new Ys().decode(e, r);
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
}, Mn = class extends ie {
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
          new Lc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Mc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Oc().encode(e));
        break;
      }
      default:
        throw new v(
          R.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return de(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Lc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Mc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Oc().decode(e, r), [n, r];
      default:
        throw new v(
          R.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, XB = class extends Ei {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new z("u8")
    });
  }
}, VB = 16 * 1024, jB = 16, qB = 1024 * 1024 * 1024, $B = 1024 * 1024 * 1024, WB = 255, KB = 1024 * 1024, zB = 1024 * 1024, Kg = "0xffffffffffff0000", fd = "0xffffffffffff0001", zg = "0xffffffffffff0002", ep = "0xffffffffffff0003", tp = "0xffffffffffff0004", np = "0x0", $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
var Er = $r.bech32m = $r.bech32 = void 0;
const $s = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", gd = {};
for (let e = 0; e < $s.length; e++) {
  const t = $s.charAt(e);
  gd[t] = e;
}
function Ar(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Tc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = Ar(t) ^ r >> 5;
  }
  t = Ar(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = Ar(t) ^ r & 31;
  }
  return t;
}
function fa(e, t, n, r) {
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
  return fa(e, 8, 5, !0);
}
function sp(e) {
  const t = fa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function ip(e) {
  const t = fa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function pd(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let l = Tc(o);
    if (typeof l == "string")
      throw new Error(l);
    let I = o + "1";
    for (let g = 0; g < c.length; ++g) {
      const C = c[g];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      l = Ar(l) ^ C, I += $s.charAt(C);
    }
    for (let g = 0; g < 6; ++g)
      l = Ar(l);
    l ^= t;
    for (let g = 0; g < 6; ++g) {
      const C = l >> (5 - g) * 5 & 31;
      I += $s.charAt(C);
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
    let x = Tc(g);
    if (typeof x == "string")
      return x;
    const N = [];
    for (let b = 0; b < C.length; ++b) {
      const D = C.charAt(b), S = gd[D];
      if (S === void 0)
        return "Unknown character " + D;
      x = Ar(x) ^ S, !(b + 6 >= C.length) && N.push(S);
    }
    return x !== t ? "Invalid checksum for " + o : { prefix: g, words: N };
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
$r.bech32 = pd("bech32");
Er = $r.bech32m = pd("bech32m");
var Ws = "fuel";
function ga(e) {
  return Er.decode(e);
}
function ks(e) {
  return Er.encode(
    Ws,
    Er.toWords(Y(V(e)))
  );
}
function Ls(e) {
  return typeof e == "string" && e.indexOf(Ws + 1) === 0 && ga(e).prefix === Ws;
}
function vo(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Pc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function Fo(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function pa(e) {
  return new Uint8Array(Er.fromWords(ga(e).words));
}
function Uc(e) {
  if (!Ls(e))
    throw new v(
      v.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return V(pa(e));
}
function op(e) {
  const { words: t } = ga(e);
  return Er.encode(Ws, t);
}
var Tr = (e) => e instanceof dd ? e.address : e instanceof jg ? e.id : e, ap = () => V(kn(32)), cp = (e) => {
  let t;
  try {
    if (!vo(e))
      throw new v(
        v.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = pa(ks(e)), t = V(t.fill(0, 0, 12));
  } catch {
    throw new v(
      v.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Ap = (e) => {
  if (!Fo(e))
    throw new v(v.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, fe = class extends Vg {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    F(this, "bech32Address");
    if (this.bech32Address = op(t), !Ls(this.bech32Address))
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
    return Uc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return pa(this.bech32Address);
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
    const t = Uc(this.bech32Address);
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
    if (!Pc(t))
      throw new v(v.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = Oe(V(Y(t)));
    return new fe(ks(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!vo(t))
      throw new v(
        v.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new fe(ks(t));
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
    return Ls(t) ? new fe(t) : this.fromB256(t);
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
    if (Pc(t))
      return fe.fromPublicKey(t);
    if (Ls(t))
      return new fe(t);
    if (vo(t))
      return fe.fromB256(t);
    if (Fo(t))
      return fe.fromEvmAddress(t);
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
    if (!Fo(t))
      throw new v(
        v.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Ap(t);
    return new fe(ks(n));
  }
}, Me = "0x0000000000000000000000000000000000000000000000000000000000000000", Bt = Me, eC = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", eo = {}, Do = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ee < "u" && Ee, r = function() {
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
      function N(A) {
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
        }), N(A);
      }, b.prototype.values = function() {
        var A = [];
        return this.forEach(function(h) {
          A.push(h);
        }), N(A);
      }, b.prototype.entries = function() {
        var A = [];
        return this.forEach(function(h, m) {
          A.push([m, h]);
        }), N(A);
      }, d.iterable && (b.prototype[Symbol.iterator] = b.prototype.entries);
      function D(A) {
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
      function L(A) {
        if (A.slice)
          return A.slice(0);
        var h = new Uint8Array(A.byteLength);
        return h.set(new Uint8Array(A)), h.buffer;
      }
      function k() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && l(A) ? (this._bodyArrayBuffer = L(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || g(A)) ? this._bodyArrayBuffer = L(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var A = D(this);
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
            var A = D(this);
            return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(J);
        }), this.text = function() {
          var A = D(this);
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
      var M = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function P(A) {
        var h = A.toUpperCase();
        return M.indexOf(h) > -1 ? h : A;
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
            var E = /\?/;
            this.url += (E.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
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
            var f = m.split("="), E = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            h.append(decodeURIComponent(E), decodeURIComponent(y));
          }
        }), h;
      }
      function H(A) {
        var h = new b(), m = A.replace(/\r?\n[\t ]+/g, " ");
        return m.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var E = f.split(":"), y = E.shift().trim();
          if (y) {
            var p = E.join(":").trim();
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
          var E = new $(A, h);
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
            var Z = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              m(new ee(Z, w));
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
          y.open(E.method, u(E.url), !0), E.credentials === "include" ? y.withCredentials = !0 : E.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && E.headers.get("Content-Type") && E.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), h && typeof h.headers == "object" && !(h.headers instanceof b) ? Object.getOwnPropertyNames(h.headers).forEach(function(w) {
            y.setRequestHeader(w, x(h.headers[w]));
          }) : E.headers.forEach(function(w, Z) {
            y.setRequestHeader(Z, w);
          }), E.signal && (E.signal.addEventListener("abort", p), y.onreadystatechange = function() {
            y.readyState === 4 && E.signal.removeEventListener("abort", p);
          }), y.send(typeof E._bodyInit > "u" ? null : E._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = b, c.Request = $, c.Response = ee), o.Headers = b, o.Request = $, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Do, Do.exports);
var up = Do.exports;
function dp(e) {
  return typeof e == "object" && e !== null;
}
function hp(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const lp = /\r\n|[\n\r]/g;
function No(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(lp)) {
    if (typeof s.index == "number" || hp(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function fp(e) {
  return md(
    e.source,
    No(e.source, e.start)
  );
}
function md(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, d = t.column + c, l = `${e.name}:${o}:${d}
`, I = r.split(/\r\n|[\n\r]/g), g = I[s];
  if (g.length > 120) {
    const C = Math.floor(d / 80), x = d % 80, N = [];
    for (let b = 0; b < g.length; b += 80)
      N.push(g.slice(b, b + 80));
    return l + Gc([
      [`${o} |`, N[0]],
      ...N.slice(1, C + 1).map((b) => ["|", b]),
      ["|", "^".padStart(x)],
      ["|", N[C + 1]]
    ]);
  }
  return l + Gc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, I[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, I[s + 1]]
  ]);
}
function Gc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function gp(e) {
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
class ma extends Error {
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
    const { nodes: o, source: c, positions: d, path: l, originalError: I, extensions: g } = gp(n);
    super(t), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = I ?? void 0, this.nodes = Hc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = Hc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((N) => N.loc).filter((N) => N != null)
    );
    this.source = c ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (C == null ? void 0 : C.map((N) => N.start)), this.locations = d && c ? d.map((N) => No(c, N)) : C == null ? void 0 : C.map((N) => No(N.source, N.start));
    const x = dp(
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, ma) : Object.defineProperty(this, "stack", {
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

` + fp(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + md(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Hc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function Et(e, t, n) {
  return new ma(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class pp {
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
class wd {
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
const Ed = {
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
}, mp = new Set(Object.keys(Ed));
function Jc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && mp.has(t);
}
var sr;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(sr || (sr = {}));
var Ro;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Ro || (Ro = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function So(e) {
  return e === 9 || e === 32;
}
function Wr(e) {
  return e >= 48 && e <= 57;
}
function Id(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function yd(e) {
  return Id(e) || e === 95;
}
function wp(e) {
  return Id(e) || Wr(e) || e === 95;
}
function Ep(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], d = Ip(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function Ip(e) {
  let t = 0;
  for (; t < e.length && So(e.charCodeAt(t)); )
    ++t;
  return t;
}
function yp(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((x) => x.length === 0 || So(x.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, d = e.endsWith("\\"), l = c || d, I = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || l || i || o);
  let g = "";
  const C = s && So(e.charCodeAt(0));
  return (I && !C || i) && (g += `
`), g += n, (I || l) && (g += `
`), '"""' + g + '"""';
}
var O;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(O || (O = {}));
class Bp {
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
    const n = new wd(O.SOF, 0, 0, 0, 0);
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
    if (t.kind !== O.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = bp(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === O.COMMENT);
    return t;
  }
}
function Cp(e) {
  return e === O.BANG || e === O.DOLLAR || e === O.AMP || e === O.PAREN_L || e === O.PAREN_R || e === O.SPREAD || e === O.COLON || e === O.EQUALS || e === O.AT || e === O.BRACKET_L || e === O.BRACKET_R || e === O.BRACE_L || e === O.PIPE || e === O.BRACE_R;
}
function Rr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ii(e, t) {
  return Bd(e.charCodeAt(t)) && Cd(e.charCodeAt(t + 1));
}
function Bd(e) {
  return e >= 55296 && e <= 56319;
}
function Cd(e) {
  return e >= 56320 && e <= 57343;
}
function Wn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return O.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function mt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new wd(t, n, r, i, o, s);
}
function bp(e, t) {
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
        return Qp(e, s);
      case 33:
        return mt(e, O.BANG, s, s + 1);
      case 36:
        return mt(e, O.DOLLAR, s, s + 1);
      case 38:
        return mt(e, O.AMP, s, s + 1);
      case 40:
        return mt(e, O.PAREN_L, s, s + 1);
      case 41:
        return mt(e, O.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return mt(e, O.SPREAD, s, s + 3);
        break;
      case 58:
        return mt(e, O.COLON, s, s + 1);
      case 61:
        return mt(e, O.EQUALS, s, s + 1);
      case 64:
        return mt(e, O.AT, s, s + 1);
      case 91:
        return mt(e, O.BRACKET_L, s, s + 1);
      case 93:
        return mt(e, O.BRACKET_R, s, s + 1);
      case 123:
        return mt(e, O.BRACE_L, s, s + 1);
      case 124:
        return mt(e, O.PIPE, s, s + 1);
      case 125:
        return mt(e, O.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Rp(e, s) : vp(e, s);
    }
    if (Wr(i) || i === 45)
      return xp(e, s, i);
    if (yd(i))
      return Sp(e, s);
    throw Et(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Rr(i) || Ii(n, s) ? `Unexpected character: ${Wn(e, s)}.` : `Invalid character: ${Wn(e, s)}.`
    );
  }
  return mt(e, O.EOF, r, r);
}
function Qp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Rr(i))
      ++s;
    else if (Ii(n, s))
      s += 2;
    else
      break;
  }
  return mt(
    e,
    O.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function xp(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Wr(i))
      throw Et(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Wn(
          e,
          s
        )}.`
      );
  } else
    s = to(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = to(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = to(e, s, i), i = r.charCodeAt(s)), i === 46 || yd(i))
    throw Et(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Wn(
        e,
        s
      )}.`
    );
  return mt(
    e,
    o ? O.FLOAT : O.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function to(e, t, n) {
  if (!Wr(n))
    throw Et(
      e.source,
      t,
      `Invalid number, expected digit but got: ${Wn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; Wr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function vp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), mt(e, O.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Fp(e, s) : Dp(e, s) : Np(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (Rr(c))
      ++s;
    else if (Ii(n, s))
      s += 2;
    else
      throw Et(
        e.source,
        s,
        `Invalid character within String: ${Wn(
          e,
          s
        )}.`
      );
  }
  throw Et(e.source, s, "Unterminated string.");
}
function Fp(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Rr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | Pr(i), r < 0)
      break;
  }
  throw Et(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function Dp(e, t) {
  const n = e.source.body, r = Zc(n, t + 2);
  if (Rr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Bd(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Zc(n, t + 8);
    if (Cd(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw Et(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function Zc(e, t) {
  return Pr(e.charCodeAt(t)) << 12 | Pr(e.charCodeAt(t + 1)) << 8 | Pr(e.charCodeAt(t + 2)) << 4 | Pr(e.charCodeAt(t + 3));
}
function Pr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Np(e, t) {
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
  throw Et(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function Rp(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const l = n.charCodeAt(i);
    if (l === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const I = mt(
        e,
        O.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Ep(d).join(`
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
    if (Rr(l))
      ++i;
    else if (Ii(n, i))
      i += 2;
    else
      throw Et(
        e.source,
        i,
        `Invalid character within String: ${Wn(
          e,
          i
        )}.`
      );
  }
  throw Et(e.source, i, "Unterminated string.");
}
function Sp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (wp(i))
      ++s;
    else
      break;
  }
  return mt(
    e,
    O.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Ms(e, t) {
  if (!!!e)
    throw new Error(t);
}
const _p = 10, bd = 2;
function Qd(e) {
  return yi(e, []);
}
function yi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return kp(e, t);
    default:
      return String(e);
  }
}
function kp(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Lp(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : yi(r, n);
  } else if (Array.isArray(e))
    return Op(e, n);
  return Mp(e, n);
}
function Lp(e) {
  return typeof e.toJSON == "function";
}
function Mp(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > bd ? "[" + Tp(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + yi(i, t)
  ).join(", ") + " }";
}
function Op(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > bd)
    return "[Array]";
  const n = Math.min(_p, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(yi(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Tp(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Pp = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class xd {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ms(!1, `Body must be a string. Received: ${Qd(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Ms(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Ms(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Up(e) {
  return Pp(e, xd);
}
function vd(e, t) {
  return new As(e, t).parseDocument();
}
function Gp(e, t) {
  const n = new As(e, t);
  n.expectToken(O.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(O.EOF), r;
}
function Hp(e, t) {
  const n = new As(e, t);
  n.expectToken(O.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(O.EOF), r;
}
function Jp(e, t) {
  const n = new As(e, t);
  n.expectToken(O.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(O.EOF), r;
}
class As {
  constructor(t, n = {}) {
    const r = Up(t) ? t : new xd(t);
    this._lexer = new Bp(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(O.NAME);
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
        O.SOF,
        this.parseDefinition,
        O.EOF
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
    if (this.peek(O.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === O.NAME) {
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
        throw Et(
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
    if (this.peek(O.BRACE_L))
      return this.node(t, {
        kind: ae.OPERATION_DEFINITION,
        operation: sr.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(O.NAME) && (r = this.parseName()), this.node(t, {
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
    const t = this.expectToken(O.NAME);
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
      O.PAREN_L,
      this.parseVariableDefinition,
      O.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ae.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(O.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(O.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(O.DOLLAR), this.node(t, {
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
        O.BRACE_L,
        this.parseSelection,
        O.BRACE_R
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
    return this.peek(O.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(O.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: ae.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(O.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(O.PAREN_L, n, O.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(O.COLON), this.node(n, {
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
    this.expectToken(O.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(O.NAME) ? this.node(t, {
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
      case O.BRACKET_L:
        return this.parseList(t);
      case O.BRACE_L:
        return this.parseObject(t);
      case O.INT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.INT,
          value: n.value
        });
      case O.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: ae.FLOAT,
          value: n.value
        });
      case O.STRING:
      case O.BLOCK_STRING:
        return this.parseStringLiteral();
      case O.NAME:
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
      case O.DOLLAR:
        if (t)
          if (this.expectToken(O.DOLLAR), this._lexer.token.kind === O.NAME) {
            const r = this._lexer.token.value;
            throw Et(
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
      block: t.kind === O.BLOCK_STRING
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
      values: this.any(O.BRACKET_L, n, O.BRACKET_R)
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
      fields: this.any(O.BRACE_L, n, O.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(O.COLON), this.node(n, {
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
    for (; this.peek(O.AT); )
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
    return this.expectToken(O.AT), this.node(n, {
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
    if (this.expectOptionalToken(O.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(O.BRACKET_R), n = this.node(t, {
        kind: ae.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(O.BANG) ? this.node(t, {
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
    return this.peek(O.STRING) || this.peek(O.BLOCK_STRING);
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
      O.BRACE_L,
      this.parseOperationTypeDefinition,
      O.BRACE_R
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
    this.expectToken(O.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(O.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      O.BRACE_L,
      this.parseFieldDefinition,
      O.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(O.COLON);
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
      O.PAREN_L,
      this.parseInputValueDef,
      O.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(O.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(O.EQUALS) && (i = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(O.EQUALS) ? this.delimitedMany(O.PIPE, this.parseNamedType) : [];
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
      O.BRACE_L,
      this.parseEnumValueDefinition,
      O.BRACE_R
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
      throw Et(
        this._lexer.source,
        this._lexer.token.start,
        `${Cs(
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
      O.BRACE_L,
      this.parseInputValueDef,
      O.BRACE_R
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
    if (t.kind === O.NAME)
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
      O.BRACE_L,
      this.parseOperationTypeDefinition,
      O.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(O.AT);
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
    return this.delimitedMany(O.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(Ro, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new pp(
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
    throw Et(
      this._lexer.source,
      n.start,
      `Expected ${Fd(t)}, found ${Cs(n)}.`
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
    if (n.kind === O.NAME && n.value === t)
      this.advanceLexer();
    else
      throw Et(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${Cs(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === O.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return Et(
      this._lexer.source,
      n.start,
      `Unexpected ${Cs(n)}.`
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
    if (t !== void 0 && n.kind !== O.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw Et(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function Cs(e) {
  const t = e.value;
  return Fd(e.kind) + (t != null ? ` "${t}"` : "");
}
function Fd(e) {
  return Cp(e) ? `"${e}"` : e;
}
const Zp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: As,
  parse: vd,
  parseConstValue: Hp,
  parseType: Jp,
  parseValue: Gp
}, Symbol.toStringTag, { value: "Module" })), Yp = /* @__PURE__ */ oa(Zp);
function Xp(e) {
  return `"${e.replace(Vp, jp)}"`;
}
const Vp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function jp(e) {
  return qp[e.charCodeAt(0)];
}
const qp = [
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
], $p = Object.freeze({});
function Wp(e, t, n = Ed) {
  const r = /* @__PURE__ */ new Map();
  for (const S of Object.values(ae))
    r.set(S, Kp(t, S));
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
          for (const [L, k] of d) {
            const M = L - j;
            k === null ? (l.splice(M, 1), j++) : l[M] = k;
          }
        } else {
          l = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(l)
          );
          for (const [j, L] of d)
            l[j] = L;
        }
      c = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (I = i ? c : o[c], l = g[I], l == null)
        continue;
      C.push(I);
    }
    let T;
    if (!Array.isArray(l)) {
      var N, b;
      Jc(l) || Ms(!1, `Invalid AST Node: ${Qd(l)}.`);
      const j = S ? (N = r.get(l.kind)) === null || N === void 0 ? void 0 : N.leave : (b = r.get(l.kind)) === null || b === void 0 ? void 0 : b.enter;
      if (T = j == null ? void 0 : j.call(t, l, I, g, C, x), T === $p)
        break;
      if (T === !1) {
        if (!S) {
          C.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([I, T]), !S))
        if (Jc(T))
          l = T;
        else {
          C.pop();
          continue;
        }
    }
    if (T === void 0 && J && d.push([I, l]), S)
      C.pop();
    else {
      var D;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(l), o = i ? l : (D = n[l.kind]) !== null && D !== void 0 ? D : [], c = -1, d = [], g && x.push(g), g = l;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function Kp(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Dd(e) {
  return Wp(e, em);
}
const zp = 80, em = {
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
    leave: ({ selections: e }) => qt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = me("", e, ": ") + t;
      let o = i + me("(", te(n, ", "), ")");
      return o.length > zp && (o = i + me(`(
`, Os(te(n, `
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
    leave: ({ value: e, block: t }) => t ? yp(e) : Xp(e)
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
`) + te(["schema", te(t, " "), qt(n)], " ")
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
        qt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => me("", e, `
`) + t + (Yc(n) ? me(`(
`, Os(te(n, `
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
        qt(s)
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
`) + te(["enum", t, te(n, " "), qt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => me("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => me("", e, `
`) + te(["input", t, te(n, " "), qt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => me("", e, `
`) + "directive @" + t + (Yc(n) ? me(`(
`, Os(te(n, `
`)), `
)`) : me("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), qt(t)],
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
        qt(r)
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
        qt(r)
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
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), qt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), qt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function qt(e) {
  return me(`{
`, Os(te(e, `
`)), `
}`);
}
function me(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Os(e) {
  return me("  ", e.replace(/\n/g, `
  `));
}
function Yc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const tm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: Dd
}, Symbol.toStringTag, { value: "Module" })), nm = /* @__PURE__ */ oa(tm);
var wa = {}, Bi = {}, Nd = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, rm = Nd, Rd = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof rm;
}, sm = Rd, im = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = sm);
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
Bi.ReactNativeFile = Nd;
Bi.extractFiles = im;
Bi.isExtractableFile = Rd;
var om = typeof self == "object" ? self.FormData : window.FormData, us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
us.defaultJsonSerializer = void 0;
us.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var am = Ee && Ee.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(wa, "__esModule", { value: !0 });
var Sd = Bi, cm = am(om), Am = us, um = function(e) {
  return Sd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function dm(e, t, n, r) {
  r === void 0 && (r = Am.defaultJsonSerializer);
  var s = Sd.extractFiles({ query: e, variables: t, operationName: n }, "", um), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(C, x, N) {
      return C.push({ query: x, variables: t ? t[N] : void 0 }), C;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? cm.default : FormData, l = new d();
  l.append("operations", r.stringify(i));
  var I = {}, g = 0;
  return o.forEach(function(C) {
    I[++g] = C;
  }), l.append("map", r.stringify(I)), g = 0, o.forEach(function(C, x) {
    l.append("" + ++g, x);
  }), l;
}
wa.default = dm;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.parseBatchRequestsExtendedArgs = Rt.parseRawRequestExtendedArgs = Rt.parseRequestExtendedArgs = Rt.parseBatchRequestArgs = Rt.parseRawRequestArgs = Rt.parseRequestArgs = void 0;
function hm(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Rt.parseRequestArgs = hm;
function lm(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Rt.parseRawRequestArgs = lm;
function fm(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Rt.parseBatchRequestArgs = fm;
function gm(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Rt.parseRequestExtendedArgs = gm;
function pm(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Rt.parseRawRequestExtendedArgs = pm;
function mm(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Rt.parseBatchRequestsExtendedArgs = mm;
var ds = {}, wm = Ee && Ee.__extends || function() {
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
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.ClientError = void 0;
var Em = (
  /** @class */
  function(e) {
    wm(t, e);
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
ds.ClientError = Em;
var Lr = {}, Xc;
function Im() {
  if (Xc)
    return Lr;
  Xc = 1;
  var e = Ee && Ee.__assign || function() {
    return e = Object.assign || function(L) {
      for (var k, M = 1, P = arguments.length; M < P; M++) {
        k = arguments[M];
        for (var $ in k)
          Object.prototype.hasOwnProperty.call(k, $) && (L[$] = k[$]);
      }
      return L;
    }, e.apply(this, arguments);
  }, t = Ee && Ee.__awaiter || function(L, k, M, P) {
    function $(U) {
      return U instanceof M ? U : new M(function(H) {
        H(U);
      });
    }
    return new (M || (M = Promise))(function(U, H) {
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
      a((P = P.apply(L, k || [])).next());
    });
  }, n = Ee && Ee.__generator || function(L, k) {
    var M = { label: 0, sent: function() {
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
      for (; M; )
        try {
          if (P = 1, $ && (U = a[0] & 2 ? $.return : a[0] ? $.throw || ((U = $.return) && U.call($), 0) : $.next) && !(U = U.call($, a[1])).done)
            return U;
          switch ($ = 0, U && (a = [a[0] & 2, U.value]), a[0]) {
            case 0:
            case 1:
              U = a;
              break;
            case 4:
              return M.label++, { value: a[1], done: !1 };
            case 5:
              M.label++, $ = a[1], a = [0];
              continue;
            case 7:
              a = M.ops.pop(), M.trys.pop();
              continue;
            default:
              if (U = M.trys, !(U = U.length > 0 && U[U.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                M = 0;
                continue;
              }
              if (a[0] === 3 && (!U || a[1] > U[0] && a[1] < U[3])) {
                M.label = a[1];
                break;
              }
              if (a[0] === 6 && M.label < U[1]) {
                M.label = U[1], U = a;
                break;
              }
              if (U && M.label < U[2]) {
                M.label = U[2], M.ops.push(a);
                break;
              }
              U[2] && M.ops.pop(), M.trys.pop();
              continue;
          }
          a = k.call(L, M);
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
  Object.defineProperty(Lr, "__esModule", { value: !0 }), Lr.GraphQLWebSocketClient = void 0;
  var r = ds, s = _d(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", l = "subscribe", I = "next", g = "error", C = "complete", x = (
    /** @class */
    function() {
      function L(k, M, P) {
        this._type = k, this._payload = M, this._id = P;
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
          var k = { type: this.type };
          return this.id != null && this.id != null && (k.id = this.id), this.payload != null && this.payload != null && (k.payload = this.payload), JSON.stringify(k);
        },
        enumerable: !1,
        configurable: !0
      }), L.parse = function(k, M) {
        var P = JSON.parse(k), $ = P.type, U = P.payload, H = P.id;
        return new L($, M(U), H);
      }, L;
    }()
  ), N = (
    /** @class */
    function() {
      function L(k, M) {
        var P = this, $ = M.onInit, U = M.onAcknowledged, H = M.onPing, ee = M.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = k, k.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var a, A, h, m;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = k).send, h = D, $ ? [4, $()] : [3, 2];
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
                H ? H(a.payload).then(function(E) {
                  return k.send(J(E).text);
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
          } catch (E) {
            console.error(E), k.close(1006);
          }
          k.close(4400, "Unknown graphql-ws message.");
        };
      }
      return L.prototype.makeSubscribe = function(k, M, P, $) {
        var U = this, H = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[H] = { query: k, variables: P, subscriber: $ }, this.socket.send(T(H, { query: k, operationName: M, variables: P }).text), function() {
          U.socket.send(j(H).text), delete U.socketState.subscriptions[H];
        };
      }, L.prototype.rawRequest = function(k, M) {
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
          }, M);
        });
      }, L.prototype.request = function(k, M) {
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
          }, M);
        });
      }, L.prototype.subscribe = function(k, M, P) {
        var $ = s.resolveRequestDocument(k), U = $.query, H = $.operationName;
        return this.makeSubscribe(U, H, P, M);
      }, L.prototype.rawSubscribe = function(k, M, P) {
        return this.makeSubscribe(k, void 0, P, M);
      }, L.prototype.ping = function(k) {
        this.socket.send(S(k).text);
      }, L.prototype.close = function() {
        this.socket.close(1e3);
      }, L.PROTOCOL = "graphql-transport-ws", L;
    }()
  );
  Lr.GraphQLWebSocketClient = N;
  function b(L, k) {
    k === void 0 && (k = function(P) {
      return P;
    });
    var M = x.parse(L, k);
    return M;
  }
  function D(L) {
    return new x(i, L);
  }
  function S(L) {
    return new x(c, L, void 0);
  }
  function J(L) {
    return new x(d, L, void 0);
  }
  function T(L, k) {
    return new x(l, k, L);
  }
  function j(L) {
    return new x(C, void 0, L);
  }
  return Lr;
}
var Vc;
function _d() {
  return Vc || (Vc = 1, function(e) {
    var t = Ee && Ee.__assign || function() {
      return t = Object.assign || function(f) {
        for (var E, y = 1, p = arguments.length; y < p; y++) {
          E = arguments[y];
          for (var u in E)
            Object.prototype.hasOwnProperty.call(E, u) && (f[u] = E[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = Ee && Ee.__createBinding || (Object.create ? function(f, E, y, p) {
      p === void 0 && (p = y), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return E[y];
      } });
    } : function(f, E, y, p) {
      p === void 0 && (p = y), f[p] = E[y];
    }), r = Ee && Ee.__setModuleDefault || (Object.create ? function(f, E) {
      Object.defineProperty(f, "default", { enumerable: !0, value: E });
    } : function(f, E) {
      f.default = E;
    }), s = Ee && Ee.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var E = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(E, f, y);
      return r(E, f), E;
    }, i = Ee && Ee.__awaiter || function(f, E, y, p) {
      function u(w) {
        return w instanceof y ? w : new y(function(Z) {
          Z(w);
        });
      }
      return new (y || (y = Promise))(function(w, Z) {
        function X(re) {
          try {
            q(p.next(re));
          } catch (se) {
            Z(se);
          }
        }
        function K(re) {
          try {
            q(p.throw(re));
          } catch (se) {
            Z(se);
          }
        }
        function q(re) {
          re.done ? w(re.value) : u(re.value).then(X, K);
        }
        q((p = p.apply(f, E || [])).next());
      });
    }, o = Ee && Ee.__generator || function(f, E) {
      var y = { label: 0, sent: function() {
        if (w[0] & 1)
          throw w[1];
        return w[1];
      }, trys: [], ops: [] }, p, u, w, Z;
      return Z = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
        return this;
      }), Z;
      function X(q) {
        return function(re) {
          return K([q, re]);
        };
      }
      function K(q) {
        if (p)
          throw new TypeError("Generator is already executing.");
        for (; y; )
          try {
            if (p = 1, u && (w = q[0] & 2 ? u.return : q[0] ? u.throw || ((w = u.return) && w.call(u), 0) : u.next) && !(w = w.call(u, q[1])).done)
              return w;
            switch (u = 0, w && (q = [q[0] & 2, w.value]), q[0]) {
              case 0:
              case 1:
                w = q;
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
                if (w = y.trys, !(w = w.length > 0 && w[w.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  y = 0;
                  continue;
                }
                if (q[0] === 3 && (!w || q[1] > w[0] && q[1] < w[3])) {
                  y.label = q[1];
                  break;
                }
                if (q[0] === 6 && y.label < w[1]) {
                  y.label = w[1], w = q;
                  break;
                }
                if (w && y.label < w[2]) {
                  y.label = w[2], y.ops.push(q);
                  break;
                }
                w[2] && y.ops.pop(), y.trys.pop();
                continue;
            }
            q = E.call(f, y);
          } catch (re) {
            q = [6, re], u = 0;
          } finally {
            p = w = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, c = Ee && Ee.__rest || function(f, E) {
      var y = {};
      for (var p in f)
        Object.prototype.hasOwnProperty.call(f, p) && E.indexOf(p) < 0 && (y[p] = f[p]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, p = Object.getOwnPropertySymbols(f); u < p.length; u++)
          E.indexOf(p[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, p[u]) && (y[p[u]] = f[p[u]]);
      return y;
    }, d = Ee && Ee.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var l = s(up), I = l, g = Yp, C = nm, x = d(wa), N = us, b = Rt, D = ds;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return D.ClientError;
    } });
    var S = function(f) {
      var E = {};
      return f && (typeof Headers < "u" && f instanceof Headers || I && I.Headers && f instanceof I.Headers ? E = h(f) : Array.isArray(f) ? f.forEach(function(y) {
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
      var Z = E.reduce(function(X, K, q) {
        return X.push({
          query: J(K),
          variables: y ? u.stringify(y[q]) : void 0
        }), X;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Z));
    }, j = function(f) {
      var E = f.url, y = f.query, p = f.variables, u = f.operationName, w = f.headers, Z = f.fetch, X = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, re;
        return o(this, function(se) {
          switch (se.label) {
            case 0:
              return q = x.default(y, p, u, X.jsonSerializer), re = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), w), body: q }, X), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Z(E, re)];
            case 3:
              return [2, se.sent()];
          }
        });
      });
    }, L = function(f) {
      var E = f.url, y = f.query, p = f.variables, u = f.operationName, w = f.headers, Z = f.fetch, X = f.fetchOptions, K = f.middleware;
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
              }), re = t({ method: "GET", headers: w }, X), K ? [4, Promise.resolve(K(re))] : [3, 2];
            case 1:
              re = se.sent(), se.label = 2;
            case 2:
              return [4, Z(E + "?" + q, re)];
            case 3:
              return [2, se.sent()];
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
            var u, w, Z, X, K, q, re, se, ke, ge, oe, Re;
            return o(this, function(he) {
              return u = b.parseRawRequestArgs(E, y, p), w = this.options, Z = w.headers, X = w.fetch, K = X === void 0 ? l.default : X, q = w.method, re = q === void 0 ? "POST" : q, se = w.requestMiddleware, ke = w.responseMiddleware, ge = c(w, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (ge.signal = u.signal), Re = B(u.query).operationName, [2, M({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, S(a(Z))), S(u.requestHeaders)),
                operationName: Re,
                fetch: K,
                method: re,
                fetchOptions: ge,
                middleware: se
              }).then(function(pe) {
                return ke && ke(pe), pe;
              }).catch(function(pe) {
                throw ke && ke(pe), pe;
              })];
            });
          });
        }, f.prototype.request = function(E) {
          for (var y = [], p = 1; p < arguments.length; p++)
            y[p - 1] = arguments[p];
          var u = y[0], w = y[1], Z = b.parseRequestArgs(E, u, w), X = this.options, K = X.headers, q = X.fetch, re = q === void 0 ? l.default : q, se = X.method, ke = se === void 0 ? "POST" : se, ge = X.requestMiddleware, oe = X.responseMiddleware, Re = c(X, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), he = this.url;
          Z.signal !== void 0 && (Re.signal = Z.signal);
          var pe = B(Z.document), tn = pe.query, Se = pe.operationName;
          return M({
            url: he,
            query: tn,
            variables: Z.variables,
            headers: t(t({}, S(a(K))), S(Z.requestHeaders)),
            operationName: Se,
            fetch: re,
            method: ke,
            fetchOptions: Re,
            middleware: ge
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(E, y) {
          var p = b.parseBatchRequestArgs(E, y), u = this.options, w = u.headers, Z = u.fetch, X = Z === void 0 ? l.default : Z, K = u.method, q = K === void 0 ? "POST" : K, re = u.requestMiddleware, se = u.responseMiddleware, ke = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ge = this.url;
          p.signal !== void 0 && (ke.signal = p.signal);
          var oe = p.documents.map(function(he) {
            var pe = he.document;
            return B(pe).query;
          }), Re = p.documents.map(function(he) {
            var pe = he.variables;
            return pe;
          });
          return M({
            url: ge,
            query: oe,
            variables: Re,
            headers: t(t({}, S(a(w))), S(p.requestHeaders)),
            operationName: void 0,
            fetch: X,
            method: q,
            fetchOptions: ke,
            middleware: re
          }).then(function(he) {
            return se && se(he), he.data;
          }).catch(function(he) {
            throw se && se(he), he;
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
    function M(f) {
      var E = f.url, y = f.query, p = f.variables, u = f.headers, w = f.operationName, Z = f.fetch, X = f.method, K = X === void 0 ? "POST" : X, q = f.fetchOptions, re = f.middleware;
      return i(this, void 0, void 0, function() {
        var se, ke, ge, oe, Re, he, pe, tn, Se, ye, Sr;
        return o(this, function(Le) {
          switch (Le.label) {
            case 0:
              return se = K.toUpperCase() === "POST" ? j : L, ke = Array.isArray(y), [4, se({
                url: E,
                query: y,
                variables: p,
                operationName: w,
                headers: u,
                fetch: Z,
                fetchOptions: q,
                middleware: re
              })];
            case 1:
              return ge = Le.sent(), [4, H(ge, q.jsonSerializer)];
            case 2:
              if (oe = Le.sent(), Re = ke && Array.isArray(oe) ? !oe.some(function(Ue) {
                var ps = Ue.data;
                return !ps;
              }) : !!oe.data, he = !oe.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", ge.ok && he && Re)
                return pe = ge.headers, tn = ge.status, oe.errors, Se = c(oe, ["errors"]), ye = q.errorPolicy === "ignore" ? Se : oe, [2, t(t({}, ke ? { data: ye } : ye), { headers: pe, status: tn })];
              throw Sr = typeof oe == "string" ? { error: oe } : oe, new D.ClientError(t(t({}, Sr), { status: ge.status, headers: ge.headers }), { query: y, variables: p });
          }
        });
      });
    }
    function P(f, E, y, p) {
      return i(this, void 0, void 0, function() {
        var u, w;
        return o(this, function(Z) {
          return u = b.parseRawRequestExtendedArgs(f, E, y, p), w = new k(u.url), [2, w.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function $(f, E) {
      for (var y = [], p = 2; p < arguments.length; p++)
        y[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var u, w, Z, X;
        return o(this, function(K) {
          return u = y[0], w = y[1], Z = b.parseRequestExtendedArgs(f, E, u, w), X = new k(Z.url), [2, X.request(t({}, Z))];
        });
      });
    }
    e.request = $;
    function U(f, E, y) {
      return i(this, void 0, void 0, function() {
        var p, u;
        return o(this, function(w) {
          return p = b.parseBatchRequestsExtendedArgs(f, E, y), u = new k(p.url), [2, u.batchRequests(t({}, p))];
        });
      });
    }
    e.batchRequests = U, e.default = $;
    function H(f, E) {
      return E === void 0 && (E = N.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, p, u;
        return o(this, function(w) {
          switch (w.label) {
            case 0:
              return f.headers.forEach(function(Z, X) {
                X.toLowerCase() === "content-type" && (y = Z);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (p = E).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(p, [w.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function ee(f) {
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
          E = ee(y);
        } catch {
        }
        return { query: f, operationName: E };
      }
      var p = ee(f);
      return { query: C.print(f), operationName: p };
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
    function h(f) {
      var E = {};
      return f.forEach(function(y, p) {
        E[p] = y;
      }), E;
    }
    var m = Im();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return m.GraphQLWebSocketClient;
    } });
  }(eo)), eo;
}
var ym = _d();
function Bm(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function kd(e) {
  return function t(n) {
    return arguments.length === 0 || Bm(n) ? t : e.apply(this, arguments);
  };
}
var Cm = /* @__PURE__ */ kd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function bm(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Ld(e, t, n) {
  if (n || (n = new xm()), Qm(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? Ld(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Cm(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return bm(e);
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
function Qm(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var xm = /* @__PURE__ */ function() {
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
}(), vm = /* @__PURE__ */ kd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Ld(t, !0);
});
const Kr = vm;
var Ks = function() {
  return Ks = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Ks.apply(this, arguments);
};
var Ts = /* @__PURE__ */ new Map(), _o = /* @__PURE__ */ new Map(), Md = !0, zs = !1;
function Od(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function Fm(e) {
  return Od(e.source.body.substring(e.start, e.end));
}
function Dm(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = Fm(r.loc), o = _o.get(s);
      o && !o.has(i) ? Md && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || _o.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Ks(Ks({}, e), { definitions: n });
}
function Nm(e) {
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
function Rm(e) {
  var t = Od(e);
  if (!Ts.has(t)) {
    var n = vd(e, {
      experimentalFragmentVariables: zs,
      allowLegacyFragmentVariables: zs
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ts.set(t, Nm(Dm(n)));
  }
  return Ts.get(t);
}
function Ir(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), Rm(r);
}
function Sm() {
  Ts.clear(), _o.clear();
}
function _m() {
  Md = !1;
}
function km() {
  zs = !0;
}
function Lm() {
  zs = !1;
}
var Mr = {
  gql: Ir,
  resetCaches: Sm,
  disableFragmentWarnings: _m,
  enableExperimentalFragmentVariables: km,
  disableExperimentalFragmentVariables: Lm
};
(function(e) {
  e.gql = Mr.gql, e.resetCaches = Mr.resetCaches, e.disableFragmentWarnings = Mr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Mr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Mr.disableExperimentalFragmentVariables;
})(Ir || (Ir = {}));
Ir.default = Ir;
const ce = Ir;
function Mm(e) {
  return Oe(Sn(e, "utf-8"));
}
function Om(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function Td(e) {
  return Oe(e);
}
var Pd = {}, Ea = {}, Tm = De, Zt = null;
try {
  Zt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
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
function kt(e) {
  return (e && e.__isLong__) === !0;
}
De.isLong = kt;
var jc = {}, qc = {};
function zn(e, t) {
  var n, r, s;
  return t ? (e >>>= 0, (s = 0 <= e && e < 256) && (r = qc[e], r) ? r : (n = Ne(e, (e | 0) < 0 ? -1 : 0, !0), s && (qc[e] = n), n)) : (e |= 0, (s = -128 <= e && e < 128) && (r = jc[e], r) ? r : (n = Ne(e, e < 0 ? -1 : 0, !1), s && (jc[e] = n), n));
}
De.fromInt = zn;
function Yt(e, t) {
  if (isNaN(e))
    return t ? Xn : Xt;
  if (t) {
    if (e < 0)
      return Xn;
    if (e >= Ud)
      return Jd;
  } else {
    if (e <= -Wc)
      return _t;
    if (e + 1 >= Wc)
      return Hd;
  }
  return e < 0 ? Yt(-e, t).neg() : Ne(e % yr | 0, e / yr | 0, t);
}
De.fromNumber = Yt;
function Ne(e, t, n) {
  return new De(e, t, n);
}
De.fromBits = Ne;
var ei = Math.pow;
function Ia(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return Xt;
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var r;
  if ((r = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (r === 0)
    return Ia(e.substring(1), t, n).neg();
  for (var s = Yt(ei(n, 8)), i = Xt, o = 0; o < e.length; o += 8) {
    var c = Math.min(8, e.length - o), d = parseInt(e.substring(o, o + c), n);
    if (c < 8) {
      var l = Yt(ei(n, c));
      i = i.mul(l).add(Yt(d));
    } else
      i = i.mul(s), i = i.add(Yt(d));
  }
  return i.unsigned = t, i;
}
De.fromString = Ia;
function en(e, t) {
  return typeof e == "number" ? Yt(e, t) : typeof e == "string" ? Ia(e, t) : Ne(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
De.fromValue = en;
var $c = 65536, Pm = 1 << 24, yr = $c * $c, Ud = yr * yr, Wc = Ud / 2, Kc = zn(Pm), Xt = zn(0);
De.ZERO = Xt;
var Xn = zn(0, !0);
De.UZERO = Xn;
var ir = zn(1);
De.ONE = ir;
var Gd = zn(1, !0);
De.UONE = Gd;
var ko = zn(-1);
De.NEG_ONE = ko;
var Hd = Ne(-1, 2147483647, !1);
De.MAX_VALUE = Hd;
var Jd = Ne(-1, -1, !0);
De.MAX_UNSIGNED_VALUE = Jd;
var _t = Ne(0, -2147483648, !1);
De.MIN_VALUE = _t;
var W = De.prototype;
W.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
W.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * yr + (this.low >>> 0) : this.high * yr + (this.low >>> 0);
};
W.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(_t)) {
      var n = Yt(t), r = this.div(n), s = r.mul(n).sub(this);
      return r.toString(t) + s.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Yt(ei(t, 6), this.unsigned), o = this, c = ""; ; ) {
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
    return this.eq(_t) ? 64 : this.neg().getNumBitsAbs();
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
  return kt(t) || (t = en(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
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
  if (kt(t) || (t = en(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), r = t.isNegative();
  return n && !r ? -1 : !n && r ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
W.comp = W.compare;
W.negate = function() {
  return !this.unsigned && this.eq(_t) ? _t : this.not().add(ir);
};
W.neg = W.negate;
W.add = function(t) {
  kt(t) || (t = en(t));
  var n = this.high >>> 16, r = this.high & 65535, s = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, c = t.high & 65535, d = t.low >>> 16, l = t.low & 65535, I = 0, g = 0, C = 0, x = 0;
  return x += i + l, C += x >>> 16, x &= 65535, C += s + d, g += C >>> 16, C &= 65535, g += r + c, I += g >>> 16, g &= 65535, I += n + o, I &= 65535, Ne(C << 16 | x, I << 16 | g, this.unsigned);
};
W.subtract = function(t) {
  return kt(t) || (t = en(t)), this.add(t.neg());
};
W.sub = W.subtract;
W.multiply = function(t) {
  if (this.isZero())
    return Xt;
  if (kt(t) || (t = en(t)), Zt) {
    var n = Zt.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return Ne(n, Zt.get_high(), this.unsigned);
  }
  if (t.isZero())
    return Xt;
  if (this.eq(_t))
    return t.isOdd() ? _t : Xt;
  if (t.eq(_t))
    return this.isOdd() ? _t : Xt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(Kc) && t.lt(Kc))
    return Yt(this.toNumber() * t.toNumber(), this.unsigned);
  var r = this.high >>> 16, s = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, c = t.high >>> 16, d = t.high & 65535, l = t.low >>> 16, I = t.low & 65535, g = 0, C = 0, x = 0, N = 0;
  return N += o * I, x += N >>> 16, N &= 65535, x += i * I, C += x >>> 16, x &= 65535, x += o * l, C += x >>> 16, x &= 65535, C += s * I, g += C >>> 16, C &= 65535, C += i * l, g += C >>> 16, C &= 65535, C += o * d, g += C >>> 16, C &= 65535, g += r * I + s * l + i * d + o * c, g &= 65535, Ne(x << 16 | N, g << 16 | C, this.unsigned);
};
W.mul = W.multiply;
W.divide = function(t) {
  if (kt(t) || (t = en(t)), t.isZero())
    throw Error("division by zero");
  if (Zt) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? Zt.div_u : Zt.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return Ne(n, Zt.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? Xn : Xt;
  var r, s, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return Xn;
    if (t.gt(this.shru(1)))
      return Gd;
    i = Xn;
  } else {
    if (this.eq(_t)) {
      if (t.eq(ir) || t.eq(ko))
        return _t;
      if (t.eq(_t))
        return ir;
      var o = this.shr(1);
      return r = o.div(t).shl(1), r.eq(Xt) ? t.isNegative() ? ir : ko : (s = this.sub(t.mul(r)), i = r.add(s.div(t)), i);
    } else if (t.eq(_t))
      return this.unsigned ? Xn : Xt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = Xt;
  }
  for (s = this; s.gte(t); ) {
    r = Math.max(1, Math.floor(s.toNumber() / t.toNumber()));
    for (var c = Math.ceil(Math.log(r) / Math.LN2), d = c <= 48 ? 1 : ei(2, c - 48), l = Yt(r), I = l.mul(t); I.isNegative() || I.gt(s); )
      r -= d, l = Yt(r, this.unsigned), I = l.mul(t);
    l.isZero() && (l = ir), i = i.add(l), s = s.sub(I);
  }
  return i;
};
W.div = W.divide;
W.modulo = function(t) {
  if (kt(t) || (t = en(t)), Zt) {
    var n = (this.unsigned ? Zt.rem_u : Zt.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return Ne(n, Zt.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
W.mod = W.modulo;
W.rem = W.modulo;
W.not = function() {
  return Ne(~this.low, ~this.high, this.unsigned);
};
W.and = function(t) {
  return kt(t) || (t = en(t)), Ne(this.low & t.low, this.high & t.high, this.unsigned);
};
W.or = function(t) {
  return kt(t) || (t = en(t)), Ne(this.low | t.low, this.high | t.high, this.unsigned);
};
W.xor = function(t) {
  return kt(t) || (t = en(t)), Ne(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
W.shiftLeft = function(t) {
  return kt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? Ne(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : Ne(0, this.low << t - 32, this.unsigned);
};
W.shl = W.shiftLeft;
W.shiftRight = function(t) {
  return kt(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? Ne(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : Ne(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
W.shr = W.shiftRight;
W.shiftRightUnsigned = function(t) {
  if (kt(t) && (t = t.toInt()), t &= 63, t === 0)
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
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
const Zd = [
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
], Um = (e) => {
  const t = Zd.find(([n]) => e >= n);
  return e + (t ? t[1] : 0);
};
Ci.addLeapSeconds = Um;
const Gm = (e) => {
  const t = Zd.find(([n, r]) => e - r >= n);
  return e - (t ? t[1] : 0);
};
Ci.removeLeapSeconds = Gm;
var Hm = Ee && Ee.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ea, "__esModule", { value: !0 });
const Ur = Hm(Tm), zc = Ci;
let Lo = class Cn {
  /**
   * Construct an instance of TAI64.
   *
   * @param label - The TAI64 label between 0 and 2^63-1, inclusive
   * @returns An instance of TAI64
   * @throws RangeError if the given label is not between 0 and 2^63-1, inclusive
   */
  constructor(t) {
    if (this.label = t, t.lt(Ur.default.ZERO) || t.gte(Ur.default.MAX_VALUE))
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
    const n = zc.addLeapSeconds(t), r = Cn.EPOCH.label.add(n);
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
    const r = Ur.default.fromString(t, !1, n);
    return new Cn(r);
  }
  /**
   * Return a TAI64 corresponding to the given byte array representing a TAI64.
   *
   * @param bytes - The byte array
   * @returns An instance of TAI64
   */
  static fromByteArray(t) {
    const n = Ur.default.fromBytes(t, !1);
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
    return zc.removeLeapSeconds(t.toNumber());
  }
};
Lo.EPOCH = new Lo(Ur.default.MAX_VALUE.shiftRight(1).add(1));
Ea.TAI64 = Lo;
Object.defineProperty(Pd, "__esModule", { value: !0 });
var Jm = Ea, Yd = Pd.TAI64 = Jm.TAI64;
let le;
const Xd = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Xd.decode();
let Gr = null;
function Vd() {
  return (Gr === null || Gr.byteLength === 0) && (Gr = new Uint8Array(le.memory.buffer)), Gr;
}
function Zm(e, t) {
  return e = e >>> 0, Xd.decode(Vd().subarray(e, e + t));
}
function jd(e) {
  const t = le.ret(e);
  return jt.__wrap(t);
}
function Ym(e, t) {
  const n = le.retd(e, t);
  return jt.__wrap(n);
}
function eA(e, t, n, r) {
  const s = le.call(e, t, n, r);
  return jt.__wrap(s);
}
function Xm(e, t, n) {
  const r = le.tr(e, t, n);
  return jt.__wrap(r);
}
function tA(e, t, n) {
  const r = le.addi(e, t, n);
  return jt.__wrap(r);
}
function Vm(e, t, n) {
  const r = le.muli(e, t, n);
  return jt.__wrap(r);
}
function Hr(e, t, n) {
  const r = le.lw(e, t, n);
  return jt.__wrap(r);
}
function jm(e, t, n) {
  const r = le.gtf(e, t, n);
  return jt.__wrap(r);
}
function bs(e, t) {
  const n = le.movi(e, t);
  return jt.__wrap(n);
}
let Jr = null;
function nA() {
  return (Jr === null || Jr.byteLength === 0) && (Jr = new Int32Array(le.memory.buffer)), Jr;
}
function qm(e, t) {
  return e = e >>> 0, Vd().subarray(e / 1, e / 1 + t);
}
const $m = Object.freeze({
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
class jt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(jt.prototype);
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
      var t = nA()[s / 4 + 0], n = nA()[s / 4 + 1], r = qm(t, n).slice();
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
async function Wm(e, t) {
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
function Km() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Zm(t, n));
  }, e;
}
function zm(e, t) {
  return le = e.exports, qd.__wbindgen_wasm_module = t, Jr = null, Gr = null, le;
}
async function qd(e) {
  if (le !== void 0)
    return le;
  const t = Km(), { instance: n, module: r } = await Wm(await e, t);
  return zm(n, r);
}
function ew(e, t, n, r) {
  function s(g, C, x) {
    var N = x ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, b = x ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? N(g, C) : b(g);
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
function tw(e) {
  return ew(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function ya() {
  return await qd(tw());
}
ya();
function rA(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function nw(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function $d(e, ...t) {
  if (!nw(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function rw(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  rA(e.outputLen), rA(e.blockLen);
}
function ti(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function sw(e, t) {
  $d(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const no = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Wd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ro = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), sn = (e, t) => e << 32 - t | e >>> t, iw = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!iw)
  throw new Error("Non little-endian hardware is not supported");
function ow(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Ba(e) {
  if (typeof e == "string" && (e = ow(e)), !Wd(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function aw(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!Wd(s))
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
class Kd {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function cw(e) {
  const t = (r) => e().update(Ba(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Aw(e = 32) {
  if (no && typeof no.getRandomValues == "function")
    return no.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function uw(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, c, r);
}
class dw extends Kd {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ro(this.buffer);
  }
  update(t) {
    ti(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Ba(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = ro(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ti(this), sw(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    uw(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ro(t), d = this.outputLen;
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
const hw = (e, t, n) => e & t ^ ~e & n, lw = (e, t, n) => e & t ^ e & n ^ t & n, fw = /* @__PURE__ */ new Uint32Array([
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
class gw extends dw {
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
      const C = Bn[g - 15], x = Bn[g - 2], N = sn(C, 7) ^ sn(C, 18) ^ C >>> 3, b = sn(x, 17) ^ sn(x, 19) ^ x >>> 10;
      Bn[g] = b + Bn[g - 7] + N + Bn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: l, H: I } = this;
    for (let g = 0; g < 64; g++) {
      const C = sn(c, 6) ^ sn(c, 11) ^ sn(c, 25), x = I + C + hw(c, d, l) + fw[g] + Bn[g] | 0, b = (sn(r, 2) ^ sn(r, 13) ^ sn(r, 22)) + lw(r, s, i) | 0;
      I = l, l = d, d = c, c = o + x | 0, o = i, i = s, s = r, r = x + b | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, d, l, I);
  }
  roundClean() {
    Bn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const pw = /* @__PURE__ */ cw(() => new gw());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const zd = BigInt(0), bi = BigInt(1), mw = BigInt(2);
function An(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ww = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Br(e) {
  if (!An(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += ww[e[n]];
  return t;
}
function e0(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Ca(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const un = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function sA(e) {
  if (e >= un._0 && e <= un._9)
    return e - un._0;
  if (e >= un._A && e <= un._F)
    return e - (un._A - 10);
  if (e >= un._a && e <= un._f)
    return e - (un._a - 10);
}
function Cr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = sA(e.charCodeAt(i)), c = sA(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function jn(e) {
  return Ca(Br(e));
}
function ba(e) {
  if (!An(e))
    throw new Error("Uint8Array expected");
  return Ca(Br(Uint8Array.from(e).reverse()));
}
function br(e, t) {
  return Cr(e.toString(16).padStart(t * 2, "0"));
}
function Qa(e, t) {
  return br(e, t).reverse();
}
function Ew(e) {
  return Cr(e0(e));
}
function Wt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Cr(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (An(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function zr(...e) {
  let t = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (!An(i))
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
function Iw(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function yw(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Bw(e) {
  let t;
  for (t = 0; e > zd; e >>= bi, t += 1)
    ;
  return t;
}
function Cw(e, t) {
  return e >> BigInt(t) & bi;
}
const bw = (e, t, n) => e | (n ? bi : zd) << BigInt(t), xa = (e) => (mw << BigInt(e - 1)) - bi, so = (e) => new Uint8Array(e), iA = (e) => Uint8Array.from(e);
function t0(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = so(e), s = so(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...g) => n(s, r, ...g), d = (g = so()) => {
    s = c(iA([0]), g), r = c(), g.length !== 0 && (s = c(iA([1]), g), r = c());
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
    return zr(...C);
  };
  return (g, C) => {
    o(), d(g);
    let x;
    for (; !(x = C(l())); )
      d();
    return o(), x;
  };
}
const Qw = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || An(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function hs(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = Qw[i];
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
const xw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Cw,
  bitLen: Bw,
  bitMask: xa,
  bitSet: bw,
  bytesToHex: Br,
  bytesToNumberBE: jn,
  bytesToNumberLE: ba,
  concatBytes: zr,
  createHmacDrbg: t0,
  ensureBytes: Wt,
  equalBytes: Iw,
  hexToBytes: Cr,
  hexToNumber: Ca,
  isBytes: An,
  numberToBytesBE: br,
  numberToBytesLE: Qa,
  numberToHexUnpadded: e0,
  numberToVarBytesBE: Ew,
  utf8ToBytes: yw,
  validateObject: hs
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const It = BigInt(0), He = BigInt(1), Zn = BigInt(2), vw = BigInt(3), Mo = BigInt(4), oA = BigInt(5), aA = BigInt(8);
BigInt(9);
BigInt(16);
function Dt(e, t) {
  const n = e % t;
  return n >= It ? n : t + n;
}
function Fw(e, t, n) {
  if (n <= It || t < It)
    throw new Error("Expected power/modulo > 0");
  if (n === He)
    return It;
  let r = He;
  for (; t > It; )
    t & He && (r = r * e % n), e = e * e % n, t >>= He;
  return r;
}
function Ut(e, t, n) {
  let r = e;
  for (; t-- > It; )
    r *= r, r %= n;
  return r;
}
function Oo(e, t) {
  if (e === It || t <= It)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Dt(e, t), r = t, s = It, i = He;
  for (; n !== It; ) {
    const c = r / n, d = r % n, l = s - i * c;
    r = n, n = d, s = i, i = l;
  }
  if (r !== He)
    throw new Error("invert: does not exist");
  return Dt(s, t);
}
function Dw(e) {
  const t = (e - He) / Zn;
  let n, r, s;
  for (n = e - He, r = 0; n % Zn === It; n /= Zn, r++)
    ;
  for (s = Zn; s < e && Fw(s, t, e) !== e - He; s++)
    ;
  if (r === 1) {
    const o = (e + He) / Mo;
    return function(d, l) {
      const I = d.pow(l, o);
      if (!d.eql(d.sqr(I), l))
        throw new Error("Cannot find square root");
      return I;
    };
  }
  const i = (n + He) / Zn;
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
      const N = c.pow(I, He << BigInt(l - x - 1));
      I = c.sqr(N), g = c.mul(g, N), C = c.mul(C, I), l = x;
    }
    return g;
  };
}
function Nw(e) {
  if (e % Mo === vw) {
    const t = (e + He) / Mo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % aA === oA) {
    const t = (e - oA) / aA;
    return function(r, s) {
      const i = r.mul(s, Zn), o = r.pow(i, t), c = r.mul(s, o), d = r.mul(r.mul(c, Zn), o), l = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return Dw(e);
}
const Rw = [
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
function Sw(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Rw.reduce((r, s) => (r[s] = "function", r), t);
  return hs(e, n);
}
function _w(e, t, n) {
  if (n < It)
    throw new Error("Expected power > 0");
  if (n === It)
    return e.ONE;
  if (n === He)
    return t;
  let r = e.ONE, s = t;
  for (; n > It; )
    n & He && (r = e.mul(r, s)), s = e.sqr(s), n >>= He;
  return r;
}
function kw(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function n0(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Lw(e, t, n = !1, r = {}) {
  if (e <= It)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = n0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Nw(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: xa(s),
    ZERO: It,
    ONE: He,
    create: (d) => Dt(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return It <= d && d < e;
    },
    is0: (d) => d === It,
    isOdd: (d) => (d & He) === He,
    neg: (d) => Dt(-d, e),
    eql: (d, l) => d === l,
    sqr: (d) => Dt(d * d, e),
    add: (d, l) => Dt(d + l, e),
    sub: (d, l) => Dt(d - l, e),
    mul: (d, l) => Dt(d * l, e),
    pow: (d, l) => _w(c, d, l),
    div: (d, l) => Dt(d * Oo(l, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, l) => d + l,
    subN: (d, l) => d - l,
    mulN: (d, l) => d * l,
    inv: (d) => Oo(d, e),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => kw(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, l, I) => I ? l : d,
    toBytes: (d) => n ? Qa(d, i) : br(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? ba(d) : jn(d);
    }
  });
  return Object.freeze(c);
}
function r0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function s0(e) {
  const t = r0(e);
  return t + Math.ceil(t / 2);
}
function Mw(e, t, n = !1) {
  const r = e.length, s = r0(t), i = s0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? jn(e) : ba(e), c = Dt(o, t - He) + He;
  return n ? Qa(c, s) : br(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ow = BigInt(0), io = BigInt(1);
function Tw(e, t) {
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
      for (; i > Ow; )
        i & io && (o = o.add(c)), c = c.double(), i >>= io;
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
      for (let N = 0; N < c; N++) {
        const b = N * d;
        let D = Number(o & g);
        o >>= x, D > d && (D -= C, o += io);
        const S = b, J = b + Math.abs(D) - 1, T = N % 2 !== 0, j = D < 0;
        D === 0 ? I = I.add(n(T, i[S])) : l = l.add(n(j, i[J]));
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
function i0(e) {
  return Sw(e.Fp), hs(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...n0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Pw(e) {
  const t = i0(e);
  hs(t, {
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
const { bytesToNumberBE: Uw, hexToBytes: Gw } = xw, Vn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(e) {
    const { Err: t } = Vn;
    if (e.length < 2 || e[0] !== 2)
      throw new t("Invalid signature integer tag");
    const n = e[1], r = e.subarray(2, n + 2);
    if (!n || r.length !== n)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Uw(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Vn, n = typeof e == "string" ? Gw(e) : e;
    if (!An(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Vn._parseInt(n.subarray(2)), { d: o, l: c } = Vn._parseInt(i);
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
}, fn = BigInt(0), Gt = BigInt(1);
BigInt(2);
const cA = BigInt(3);
BigInt(4);
function Hw(e) {
  const t = Pw(e), { Fp: n } = t, r = t.toBytes || ((N, b, D) => {
    const S = b.toAffine();
    return zr(Uint8Array.from([4]), n.toBytes(S.x), n.toBytes(S.y));
  }), s = t.fromBytes || ((N) => {
    const b = N.subarray(1), D = n.fromBytes(b.subarray(0, n.BYTES)), S = n.fromBytes(b.subarray(n.BYTES, 2 * n.BYTES));
    return { x: D, y: S };
  });
  function i(N) {
    const { a: b, b: D } = t, S = n.sqr(N), J = n.mul(S, N);
    return n.add(n.add(J, n.mul(N, b)), D);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(N) {
    return typeof N == "bigint" && fn < N && N < t.n;
  }
  function c(N) {
    if (!o(N))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(N) {
    const { allowedPrivateKeyLengths: b, nByteLength: D, wrapPrivateKey: S, n: J } = t;
    if (b && typeof N != "bigint") {
      if (An(N) && (N = Br(N)), typeof N != "string" || !b.includes(N.length))
        throw new Error("Invalid key");
      N = N.padStart(D * 2, "0");
    }
    let T;
    try {
      T = typeof N == "bigint" ? N : jn(Wt("private key", N, D));
    } catch {
      throw new Error(`private key must be ${D} bytes, hex or bigint, not ${typeof N}`);
    }
    return S && (T = Dt(T, J)), c(T), T;
  }
  const l = /* @__PURE__ */ new Map();
  function I(N) {
    if (!(N instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(b, D, S) {
      if (this.px = b, this.py = D, this.pz = S, b == null || !n.isValid(b))
        throw new Error("x required");
      if (D == null || !n.isValid(D))
        throw new Error("y required");
      if (S == null || !n.isValid(S))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: D, y: S } = b || {};
      if (!b || !n.isValid(D) || !n.isValid(S))
        throw new Error("invalid affine point");
      if (b instanceof g)
        throw new Error("projective point not allowed");
      const J = (T) => n.eql(T, n.ZERO);
      return J(D) && J(S) ? g.ZERO : new g(D, S, n.ONE);
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
      const D = n.invertBatch(b.map((S) => S.pz));
      return b.map((S, J) => S.toAffine(D[J])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const D = g.fromAffine(s(Wt("pointHex", b)));
      return D.assertValidity(), D;
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
      const { x: b, y: D } = this.toAffine();
      if (!n.isValid(b) || !n.isValid(D))
        throw new Error("bad point: x or y not FE");
      const S = n.sqr(D), J = i(b);
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
      const { px: D, py: S, pz: J } = this, { px: T, py: j, pz: L } = b, k = n.eql(n.mul(D, L), n.mul(T, J)), M = n.eql(n.mul(S, L), n.mul(j, J));
      return k && M;
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
      const { a: b, b: D } = t, S = n.mul(D, cA), { px: J, py: T, pz: j } = this;
      let L = n.ZERO, k = n.ZERO, M = n.ZERO, P = n.mul(J, J), $ = n.mul(T, T), U = n.mul(j, j), H = n.mul(J, T);
      return H = n.add(H, H), M = n.mul(J, j), M = n.add(M, M), L = n.mul(b, M), k = n.mul(S, U), k = n.add(L, k), L = n.sub($, k), k = n.add($, k), k = n.mul(L, k), L = n.mul(H, L), M = n.mul(S, M), U = n.mul(b, U), H = n.sub(P, U), H = n.mul(b, H), H = n.add(H, M), M = n.add(P, P), P = n.add(M, P), P = n.add(P, U), P = n.mul(P, H), k = n.add(k, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, H), L = n.sub(L, P), M = n.mul(U, $), M = n.add(M, M), M = n.add(M, M), new g(L, k, M);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      I(b);
      const { px: D, py: S, pz: J } = this, { px: T, py: j, pz: L } = b;
      let k = n.ZERO, M = n.ZERO, P = n.ZERO;
      const $ = t.a, U = n.mul(t.b, cA);
      let H = n.mul(D, T), ee = n.mul(S, j), B = n.mul(J, L), a = n.add(D, S), A = n.add(T, j);
      a = n.mul(a, A), A = n.add(H, ee), a = n.sub(a, A), A = n.add(D, J);
      let h = n.add(T, L);
      return A = n.mul(A, h), h = n.add(H, B), A = n.sub(A, h), h = n.add(S, J), k = n.add(j, L), h = n.mul(h, k), k = n.add(ee, B), h = n.sub(h, k), P = n.mul($, A), k = n.mul(U, B), P = n.add(k, P), k = n.sub(ee, P), P = n.add(ee, P), M = n.mul(k, P), ee = n.add(H, H), ee = n.add(ee, H), B = n.mul($, B), A = n.mul(U, A), ee = n.add(ee, B), B = n.sub(H, B), B = n.mul($, B), A = n.add(A, B), H = n.mul(ee, A), M = n.add(M, H), H = n.mul(h, A), k = n.mul(a, k), k = n.sub(k, H), H = n.mul(a, ee), P = n.mul(h, P), P = n.add(P, H), new g(k, M, P);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(b) {
      return x.wNAFCached(this, l, b, (D) => {
        const S = n.invertBatch(D.map((J) => J.pz));
        return D.map((J, T) => J.toAffine(S[T])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const D = g.ZERO;
      if (b === fn)
        return D;
      if (c(b), b === Gt)
        return this;
      const { endo: S } = t;
      if (!S)
        return x.unsafeLadder(this, b);
      let { k1neg: J, k1: T, k2neg: j, k2: L } = S.splitScalar(b), k = D, M = D, P = this;
      for (; T > fn || L > fn; )
        T & Gt && (k = k.add(P)), L & Gt && (M = M.add(P)), P = P.double(), T >>= Gt, L >>= Gt;
      return J && (k = k.negate()), j && (M = M.negate()), M = new g(n.mul(M.px, S.beta), M.py, M.pz), k.add(M);
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
      let D = b, S, J;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: L, k2neg: k, k2: M } = T.splitScalar(D);
        let { p: P, f: $ } = this.wNAF(L), { p: U, f: H } = this.wNAF(M);
        P = x.constTimeNegate(j, P), U = x.constTimeNegate(k, U), U = new g(n.mul(U.px, T.beta), U.py, U.pz), S = P.add(U), J = $.add(H);
      } else {
        const { p: j, f: L } = this.wNAF(D);
        S = j, J = L;
      }
      return g.normalizeZ([S, J])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(b, D, S) {
      const J = g.BASE, T = (L, k) => k === fn || k === Gt || !L.equals(J) ? L.multiplyUnsafe(k) : L.multiply(k), j = T(this, D).add(T(b, S));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      const { px: D, py: S, pz: J } = this, T = this.is0();
      b == null && (b = T ? n.ONE : n.inv(J));
      const j = n.mul(D, b), L = n.mul(S, b), k = n.mul(J, b);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(k, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: L };
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: D } = t;
      if (b === Gt)
        return !0;
      if (D)
        return D(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: D } = t;
      return b === Gt ? this : D ? D(g, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(b = !0) {
      return this.assertValidity(), r(g, this, b);
    }
    toHex(b = !0) {
      return Br(this.toRawBytes(b));
    }
  }
  g.BASE = new g(t.Gx, t.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, x = Tw(g, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: g,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Jw(e) {
  const t = i0(e);
  return hs(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Zw(e) {
  const t = Jw(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return fn < A && A < n.ORDER;
  }
  function c(A) {
    return Dt(A, r);
  }
  function d(A) {
    return Oo(A, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: I, weierstrassEquation: g, isWithinCurveOrder: C } = Hw({
    ...t,
    toBytes(A, h, m) {
      const f = h.toAffine(), E = n.toBytes(f.x), y = zr;
      return m ? y(Uint8Array.from([h.hasEvenY() ? 2 : 3]), E) : y(Uint8Array.from([4]), E, n.toBytes(f.y));
    },
    fromBytes(A) {
      const h = A.length, m = A[0], f = A.subarray(1);
      if (h === s && (m === 2 || m === 3)) {
        const E = jn(f);
        if (!o(E))
          throw new Error("Point is not on curve");
        const y = g(E);
        let p = n.sqrt(y);
        const u = (p & Gt) === Gt;
        return (m & 1) === 1 !== u && (p = n.neg(p)), { x: E, y: p };
      } else if (h === i && m === 4) {
        const E = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: E, y };
      } else
        throw new Error(`Point of length ${h} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), x = (A) => Br(br(A, t.nByteLength));
  function N(A) {
    const h = r >> Gt;
    return A > h;
  }
  function b(A) {
    return N(A) ? c(-A) : A;
  }
  const D = (A, h, m) => jn(A.slice(h, m));
  class S {
    constructor(h, m, f) {
      this.r = h, this.s = m, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(h) {
      const m = t.nByteLength;
      return h = Wt("compactSignature", h, m * 2), new S(D(h, 0, m), D(h, m, 2 * m));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(h) {
      const { r: m, s: f } = Vn.toSig(Wt("DER", h));
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
      const { r: m, s: f, recovery: E } = this, y = M(Wt("msgHash", h));
      if (E == null || ![0, 1, 2, 3].includes(E))
        throw new Error("recovery id invalid");
      const p = E === 2 || E === 3 ? m + t.n : m;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = E & 1 ? "03" : "02", w = l.fromHex(u + x(p)), Z = d(p), X = c(-y * Z), K = c(f * Z), q = l.BASE.multiplyAndAddUnsafe(w, X, K);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return N(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new S(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Cr(this.toDERHex());
    }
    toDERHex() {
      return Vn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Cr(this.toCompactHex());
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
      const A = s0(t.n);
      return Mw(t.randomBytes(A), t.n);
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
    const h = An(A), m = typeof A == "string", f = (h || m) && A.length;
    return h ? f === s || f === i : m ? f === 2 * s || f === 2 * i : A instanceof l;
  }
  function L(A, h, m = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(h))
      throw new Error("second arg must be public key");
    return l.fromHex(h).multiply(I(A)).toRawBytes(m);
  }
  const k = t.bits2int || function(A) {
    const h = jn(A), m = A.length * 8 - t.nBitLength;
    return m > 0 ? h >> BigInt(m) : h;
  }, M = t.bits2int_modN || function(A) {
    return c(k(A));
  }, P = xa(t.nBitLength);
  function $(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(fn <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return br(A, t.nByteLength);
  }
  function U(A, h, m = H) {
    if (["recovered", "canonical"].some((se) => se in m))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: E } = t;
    let { lowS: y, prehash: p, extraEntropy: u } = m;
    y == null && (y = !0), A = Wt("msgHash", A), p && (A = Wt("prehashed msgHash", f(A)));
    const w = M(A), Z = I(h), X = [$(Z), $(w)];
    if (u != null) {
      const se = u === !0 ? E(n.BYTES) : u;
      X.push(Wt("extraEntropy", se));
    }
    const K = zr(...X), q = w;
    function re(se) {
      const ke = k(se);
      if (!C(ke))
        return;
      const ge = d(ke), oe = l.BASE.multiply(ke).toAffine(), Re = c(oe.x);
      if (Re === fn)
        return;
      const he = c(ge * c(q + Re * Z));
      if (he === fn)
        return;
      let pe = (oe.x === Re ? 0 : 2) | Number(oe.y & Gt), tn = he;
      return y && N(he) && (tn = b(he), pe ^= 1), new S(Re, tn, pe);
    }
    return { seed: K, k2sig: re };
  }
  const H = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function B(A, h, m = H) {
    const { seed: f, k2sig: E } = U(A, h, m), y = t;
    return t0(y.hash.outputLen, y.nByteLength, y.hmac)(f, E);
  }
  l.BASE._setWindowSize(8);
  function a(A, h, m, f = ee) {
    var oe;
    const E = A;
    if (h = Wt("msgHash", h), m = Wt("publicKey", m), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: p } = f;
    let u, w;
    try {
      if (typeof E == "string" || An(E))
        try {
          u = S.fromDER(E);
        } catch (Re) {
          if (!(Re instanceof Vn.Err))
            throw Re;
          u = S.fromCompact(E);
        }
      else if (typeof E == "object" && typeof E.r == "bigint" && typeof E.s == "bigint") {
        const { r: Re, s: he } = E;
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
    const { r: Z, s: X } = u, K = M(h), q = d(X), re = c(K * q), se = c(Z * q), ke = (oe = l.BASE.multiplyAndAddUnsafe(w, re, se)) == null ? void 0 : oe.toAffine();
    return ke ? c(ke.x) === Z : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: L,
    sign: B,
    verify: a,
    ProjectivePoint: l,
    Signature: S,
    utils: J
  };
}
class o0 extends Kd {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, rw(t);
    const r = Ba(n);
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
    return ti(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ti(this), $d(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const a0 = (e, t, n) => new o0(e, t).update(n).digest();
a0.create = (e, t) => new o0(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Yw(e) {
  return {
    hash: e,
    hmac: (t, ...n) => a0(e, t, aw(...n)),
    randomBytes: Aw
  };
}
function Xw(e, t) {
  const n = (r) => Zw({ ...e, ...Yw(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const c0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), AA = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Vw = BigInt(1), To = BigInt(2), uA = (e, t) => (e + t / To) / t;
function jw(e) {
  const t = c0, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), l = e * e * e % t, I = l * l * e % t, g = Ut(I, n, t) * I % t, C = Ut(g, n, t) * I % t, x = Ut(C, To, t) * l % t, N = Ut(x, s, t) * x % t, b = Ut(N, i, t) * N % t, D = Ut(b, c, t) * b % t, S = Ut(D, d, t) * D % t, J = Ut(S, c, t) * b % t, T = Ut(J, n, t) * I % t, j = Ut(T, o, t) * N % t, L = Ut(j, r, t) * l % t, k = Ut(L, To, t);
  if (!Po.eql(Po.sqr(k), e))
    throw new Error("Cannot find square root");
  return k;
}
const Po = Lw(c0, void 0, void 0, { sqrt: jw }), bn = Xw({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Po,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: AA,
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
      const t = AA, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Vw * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = uA(i * e, t), d = uA(-r * e, t);
      let l = Dt(e - c * n - d * s, t), I = Dt(-c * r - d * i, t);
      const g = l > o, C = I > o;
      if (g && (l = t - l), C && (I = t - I), l > o || I > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: l, k2neg: C, k2: I };
    }
  }
}, pw);
BigInt(0);
bn.ProjectivePoint;
let Qs;
const qw = new Uint8Array(16);
function $w() {
  if (!Qs && (Qs = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Qs))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Qs(qw);
}
const yt = [];
for (let e = 0; e < 256; ++e)
  yt.push((e + 256).toString(16).slice(1));
function Ww(e, t = 0) {
  return (yt[e[t + 0]] + yt[e[t + 1]] + yt[e[t + 2]] + yt[e[t + 3]] + "-" + yt[e[t + 4]] + yt[e[t + 5]] + "-" + yt[e[t + 6]] + yt[e[t + 7]] + "-" + yt[e[t + 8]] + yt[e[t + 9]] + "-" + yt[e[t + 10]] + yt[e[t + 11]] + yt[e[t + 12]] + yt[e[t + 13]] + yt[e[t + 14]] + yt[e[t + 15]]).toLowerCase();
}
const Kw = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), dA = {
  randomUUID: Kw
};
function zw(e, t, n) {
  if (dA.randomUUID && !t && !e)
    return dA.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || $w)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return Ww(r);
}
var va = { exports: {} }, ur = typeof Reflect == "object" ? Reflect : null, hA = ur && typeof ur.apply == "function" ? ur.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Ps;
ur && typeof ur.ownKeys == "function" ? Ps = ur.ownKeys : Object.getOwnPropertySymbols ? Ps = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Ps = function(t) {
  return Object.getOwnPropertyNames(t);
};
function eE(e) {
  console && console.warn && console.warn(e);
}
var A0 = Number.isNaN || function(t) {
  return t !== t;
};
function xe() {
  xe.init.call(this);
}
va.exports = xe;
va.exports.once = sE;
xe.EventEmitter = xe;
xe.prototype._events = void 0;
xe.prototype._eventsCount = 0;
xe.prototype._maxListeners = void 0;
var lA = 10;
function Qi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(xe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return lA;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || A0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    lA = e;
  }
});
xe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
xe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || A0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function u0(e) {
  return e._maxListeners === void 0 ? xe.defaultMaxListeners : e._maxListeners;
}
xe.prototype.getMaxListeners = function() {
  return u0(this);
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
    hA(d, this, n);
  else
    for (var l = d.length, I = g0(d, l), r = 0; r < l; ++r)
      hA(I[r], this, n);
  return !0;
};
function d0(e, t, n, r) {
  var s, i, o;
  if (Qi(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = u0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, eE(c);
  }
  return e;
}
xe.prototype.addListener = function(t, n) {
  return d0(this, t, n, !1);
};
xe.prototype.on = xe.prototype.addListener;
xe.prototype.prependListener = function(t, n) {
  return d0(this, t, n, !0);
};
function tE() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function h0(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = tE.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
xe.prototype.once = function(t, n) {
  return Qi(n), this.on(t, h0(this, t, n)), this;
};
xe.prototype.prependOnceListener = function(t, n) {
  return Qi(n), this.prependListener(t, h0(this, t, n)), this;
};
xe.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (Qi(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : nE(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
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
function l0(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? rE(s) : g0(s, s.length);
}
xe.prototype.listeners = function(t) {
  return l0(this, t, !0);
};
xe.prototype.rawListeners = function(t) {
  return l0(this, t, !1);
};
xe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : f0.call(e, t);
};
xe.prototype.listenerCount = f0;
function f0(e) {
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
  return this._eventsCount > 0 ? Ps(this._events) : [];
};
function g0(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function nE(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function rE(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function sE(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    p0(e, t, i, { once: !0 }), t !== "error" && iE(e, s, { once: !0 });
  });
}
function iE(e, t, n) {
  typeof e.on == "function" && p0(e, "error", t, n);
}
function p0(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var m0 = va.exports, oE = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
function Qr(e) {
  return Oe(e);
}
var aE = class {
  constructor(e, t, n, r, s, i = 0) {
    F(this, "left");
    F(this, "right");
    F(this, "parent");
    F(this, "hash");
    F(this, "data");
    F(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, fA = aE;
function cE(e) {
  return Qr("0x00".concat(e.slice(2)));
}
function AE(e, t) {
  return Qr("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function w0(e) {
  if (!e.length)
    return oE;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = cE(e[i]);
    t.push(new fA(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = AE(n[o].hash, n[o + 1].hash);
      t[i] = new fA(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var uE = "0x00", E0 = "0x01";
function dE(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(Qr(t).slice(2));
  return [Qr(n), n];
}
function er(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [Qr(n), n];
}
function oo(e) {
  const t = E0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function hE(e) {
  const t = E0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function ao(e) {
  return e.slice(0, 4) === uE;
}
var lE = class {
  constructor(e, t, n, r, s) {
    F(this, "SideNodes");
    F(this, "NonMembershipLeafData");
    F(this, "BitMask");
    F(this, "NumSideNodes");
    F(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, fE = lE, gE = class {
  constructor(e, t, n) {
    F(this, "SideNodes");
    F(this, "NonMembershipLeafData");
    F(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, pE = gE, Lt = "0x0000000000000000000000000000000000000000000000000000000000000000", ln = 256;
function or(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function mE(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function wE(e, t) {
  let n = 0;
  for (let r = 0; r < ln && or(e, r) === or(t, r); r += 1)
    n += 1;
  return n;
}
function EE(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Lt ? t.push(0) : (n.push(r), t.push(1));
  return new fE(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var IE = class {
  constructor() {
    F(this, "ms");
    F(this, "root");
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
    if (ao(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let l = 0; l < ln; l += 1) {
      if ([s, i] = hE(r), or(e, l) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === Lt) {
        r = "";
        break;
      }
      if (r = this.get(o), ao(r))
        break;
    }
    const d = this.get(c);
    return [mE(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Lt)
      return this.root;
    const [s] = oo(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", d = "", l = !1;
    for (let I = 0; I < t.length; I += 1)
      if (t[I] !== "") {
        if (c = t[I], o === "")
          if (d = this.get(c), ao(d)) {
            i = c, o = c;
            continue;
          } else
            o = Lt, l = !0;
        !l && c === Lt || (l || (l = !0), or(e, t.length - 1 - I) === 1 ? [i, o] = er(c, o) : [i, o] = er(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = Lt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(Qr(t), t), [i, o] = dE(e, t), this.set(i, o), o = i;
    let c;
    if (r === Lt)
      c = ln;
    else {
      const [d] = oo(s);
      c = wE(e, d);
    }
    c !== ln && (or(e, c) === 1 ? [i, o] = er(r, o) : [i, o] = er(o, r), this.set(i, o), o = i);
    for (let d = 0; d < ln; d += 1) {
      let l;
      const I = ln - n.length;
      if (d - I < 0 || n[d - I] === "")
        if (c !== ln && c > ln - 1 - d)
          l = Lt;
        else
          continue;
      else
        l = n[d - I];
      or(e, ln - 1 - d) === 1 ? [i, o] = er(l, o) : [i, o] = er(o, l), this.set(i, o), o = i;
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
      const [d] = oo(r);
      d !== e && (o = r);
    }
    return new pE(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return EE(t);
  }
}, yE = Object.defineProperty, BE = (e, t, n) => t in e ? yE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Pe = (e, t, n) => (BE(e, typeof t != "symbol" ? t + "" : t, n), n), Fa = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, _e = (e, t, n) => (Fa(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Fn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Kt = (e, t, n, r) => (Fa(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Uo = (e, t, n) => (Fa(e, t, "access private method"), n), Da = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? Bt, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? Bt, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: V(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, CE = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, Na = ce`
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
    `, Ra = ce`
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
    `, ls = ce`
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
    ${Na}
${Ra}`, bE = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, QE = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${bE}`, Sa = ce`
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
    `, xE = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, vE = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, FE = ce`
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
    `, I0 = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, xi = ce`
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
    `, DE = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, NE = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, RE = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, SE = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, _E = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, kE = ce`
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
    `, LE = ce`
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
    ${kE}`, ME = ce`
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
    ${DE}
${NE}
${RE}
${SE}
${_E}
${LE}`, OE = ce`
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
    ${xi}
${ME}`, TE = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, PE = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, UE = ce`
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
    `, GE = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, HE = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${UE}`, JE = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${OE}`, ZE = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ls}`, YE = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${ls}
${Na}`, XE = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${ls}`, VE = ce`
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
    ${PE}
${ls}`, jE = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${QE}`, qE = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${xi}`, $E = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${xi}
${ls}`, WE = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${xi}`, KE = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${Sa}`, zE = ce`
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
    ${Sa}`, eI = ce`
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
    ${Sa}
${xE}`, tI = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, nI = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${TE}`, rI = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${I0}`, sI = ce`
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
    ${I0}`, iI = ce`
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
    ${vE}`, oI = ce`
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
    ${FE}`, aI = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, cI = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${Na}`, AI = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, uI = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, dI = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${Ra}`, hI = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${Ra}`;
function lI(e) {
  return {
    getVersion(t, n) {
      return e(GE, t, n);
    },
    getNodeInfo(t, n) {
      return e(HE, t, n);
    },
    getChain(t, n) {
      return e(JE, t, n);
    },
    getTransaction(t, n) {
      return e(ZE, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(YE, t, n);
    },
    getTransactions(t, n) {
      return e(XE, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(VE, t, n);
    },
    estimatePredicates(t, n) {
      return e(jE, t, n);
    },
    getBlock(t, n) {
      return e(qE, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e($E, t, n);
    },
    getBlocks(t, n) {
      return e(WE, t, n);
    },
    getCoin(t, n) {
      return e(KE, t, n);
    },
    getCoins(t, n) {
      return e(zE, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(eI, t, n);
    },
    getContract(t, n) {
      return e(tI, t, n);
    },
    getContractBalance(t, n) {
      return e(nI, t, n);
    },
    getBalance(t, n) {
      return e(rI, t, n);
    },
    getBalances(t, n) {
      return e(sI, t, n);
    },
    getMessages(t, n) {
      return e(iI, t, n);
    },
    getMessageProof(t, n) {
      return e(oI, t, n);
    },
    getMessageStatus(t, n) {
      return e(aI, t, n);
    },
    dryRun(t, n) {
      return e(cI, t, n);
    },
    submit(t, n) {
      return e(AI, t, n);
    },
    produceBlocks(t, n) {
      return e(uI, t, n);
    },
    submitAndAwait(t, n) {
      return e(dI, t, n);
    },
    statusChange(t, n) {
      return e(hI, t, n);
    }
  };
}
var y0 = class {
  constructor() {
    F(this, "readable");
    F(this, "writable");
    F(this, "readableStreamController");
    this.readable = new ReadableStream({
      start: (e) => {
        this.readableStreamController = e;
      }
    }), this.writable = new WritableStream({
      write: (e) => {
        const t = y0.textDecoder.decode(e);
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
}, B0 = y0;
Pe(B0, "textDecoder", new TextDecoder());
async function* fI({
  url: e,
  variables: t,
  query: n,
  fetchFn: r
}) {
  const i = (await r(`${e}-sub`, {
    method: "POST",
    body: JSON.stringify({
      query: Dd(n),
      variables: t
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    }
  })).body.pipeThrough(new B0()).getReader();
  for (; ; ) {
    const { value: o, done: c } = await i.read();
    if (o instanceof v)
      throw o;
    if (yield o, c)
      break;
  }
}
var Un = {}, gI = 30 * 1e3, pI = class {
  constructor(e = gI) {
    F(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new v(
        R.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = V(e);
    if (Un[n]) {
      if (!t || Un[n].expires > Date.now())
        return Un[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = V(e);
    return Un[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Un).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Un).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = V(e);
    delete Un[t];
  }
}, mI = (e) => {
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
          blockHeight: Jt(Y(e.txPointer).slice(0, 8)),
          txIndex: Jt(Y(e.txPointer).slice(8, 16))
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
        txID: Me,
        outputIndex: 0,
        balanceRoot: Me,
        stateRoot: Me,
        txPointer: {
          blockHeight: Jt(Y(e.txPointer).slice(0, 8)),
          txIndex: Jt(Y(e.txPointer).slice(8, 16))
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
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, wI = (e) => {
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
        balanceRoot: Me,
        stateRoot: Me
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
        to: Me,
        amount: Q(0),
        assetId: Me
      };
    case Be.ContractCreated:
      return {
        type: Be.ContractCreated,
        contractId: V(e.contractId),
        stateRoot: V(e.stateRoot)
      };
    default:
      throw new v(
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, nC = (e) => "utxoId" in e, rC = (e) => "recipient" in e, gA = (e) => "id" in e, sC = (e) => "recipient" in e, EI = (e) => e.type === ue.Revert && e.val.toString("hex") === fd, II = (e) => e.type === ue.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", yI = (e) => e.reduce(
  (t, n) => (EI(n) && t.missingOutputVariables.push(n), II(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), ve = (e) => e || Me;
function BI(e) {
  var n, r, s, i, o, c, d, l, I, g, C, x, N, b;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: ue.Call,
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
        type: ue.Return,
        id: ve((s = e.contract) == null ? void 0 : s.id),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ue.ReturnData,
        id: ve((i = e.contract) == null ? void 0 : i.id),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: ve(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: ue.Panic,
        id: ve((o = e.contract) == null ? void 0 : o.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: ve(e.contractId)
      };
    case "REVERT":
      return {
        type: ue.Revert,
        id: ve((c = e.contract) == null ? void 0 : c.id),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: ue.Log,
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
        type: ue.LogData,
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
        type: ue.Transfer,
        from: ve((I = e.contract) == null ? void 0 : I.id),
        to: ve(e.toAddress || ((g = e == null ? void 0 : e.to) == null ? void 0 : g.id)),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: ue.TransferOut,
        from: ve((C = e.contract) == null ? void 0 : C.id),
        to: ve(e.toAddress || ((x = e.to) == null ? void 0 : x.id)),
        amount: Q(e.amount),
        assetId: ve(e.assetId),
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
      const D = ve(e.sender), S = ve(e.recipient), J = ve(e.nonce), T = Q(e.amount), j = e.data ? Y(e.data) : Uint8Array.from([]), L = ve(e.digest), k = js.getMessageId({
        sender: D,
        recipient: S,
        nonce: J,
        amount: T,
        data: j
      });
      return {
        type: ue.MessageOut,
        sender: D,
        recipient: S,
        amount: T,
        nonce: J,
        data: j,
        digest: L,
        messageId: k
      };
    }
    case "MINT": {
      const D = ve((N = e.contract) == null ? void 0 : N.id), S = ve(e.subId), J = qr.getAssetId(D, S);
      return {
        type: ue.Mint,
        subId: S,
        contractId: D,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const D = ve((b = e.contract) == null ? void 0 : b.id), S = ve(e.subId), J = xo.getAssetId(D, S);
      return {
        type: ue.Burn,
        subId: S,
        contractId: D,
        assetId: J,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new v(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var CI = "https://fuellabs.github.io/block-explorer-v2", bI = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, iC = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || CI, d = [
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
  ], l = d.filter((j) => !!j.value).map(({ key: j, value: L }) => ({
    key: j,
    value: L
  })), I = l.length > 0;
  if (l.length > 1)
    throw new v(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && l.length > 0) {
    const j = d.map(({ key: L }) => L).join(", ");
    throw new v(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const g = I ? bI(
    l[0].key,
    l[0].value
  ) : "", C = /^\/|\/$/gm, x = n ? n.replace(C, "") : g, N = c.replace(C, ""), b = r == null ? void 0 : r.replace(C, ""), D = b ? encodeURIComponent(b) : void 0, S = N.match(/^https?:\/\//) ? "" : "https://", J = b != null && b.match(/^https?:\/\//) ? "" : "https://";
  return `${S}${N}/${x}${D ? `?providerUrl=${J}${D}` : ""}`;
}, dr = (e, t, n) => Q(Math.ceil(e.mul(t).toNumber() / n.toNumber())), C0 = (e) => e.filter(
  (r) => r.type === ue.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function _n(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function QI(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    _n(t, n.vmInitialization).add(
      _n(Y(o.predicate).length, n.contractRoot)
    ).add(Q(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, Q());
}
function b0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = _n(i, t.vmInitialization), c = Q(i).mul(n), d = QI(r, i, t);
  return o.add(c).add(d).add(s).maxU64();
}
function _a(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = Q(0) } = e;
  let o = Q(0);
  return r != null && r.gt(0) && r.gte(n) && (o = Q(r).sub(n).mul(t)), o.add(s).add(i);
}
function Q0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = _n(r, e.contractRoot), i = _n(t, e.stateRoot), o = _n(n, e.s256), c = Q(4 + 32 + 32 + 32), d = _n(c, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function x0({
  gasCosts: e,
  txBytesSize: t
}) {
  return _n(t, e.s256);
}
function Go(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = V(e[t]);
        break;
      case "Array":
        e[t] = Go(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Go(e[t]);
        break;
    }
  }), e;
}
function xI(e) {
  return Go(Kr(e));
}
function vI(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var oC = (e) => Number(BigInt(e) - BigInt(2 ** 62) - BigInt(10)), FI = (e) => (BigInt(e) + BigInt(2 ** 62) + BigInt(10)).toString(), aC = class extends Error {
  constructor() {
    super(...arguments);
    F(this, "name", "ChangeOutputCollisionError");
    F(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, DI = class extends Error {
  constructor(t) {
    super();
    F(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, cC = class extends Error {
  constructor(t) {
    super();
    F(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, NI = (e) => {
  const t = Y(e);
  return {
    data: V(t),
    dataLength: t.length
  };
}, vi = class {
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
    F(this, "gasPrice");
    /** Block until which tx cannot be included */
    F(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    F(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    F(this, "witnessLimit");
    /** List of inputs */
    F(this, "inputs", []);
    /** List of outputs */
    F(this, "outputs", []);
    /** List of witnesses */
    F(this, "witnesses", []);
    this.gasPrice = Q(e), this.maturity = t ?? 0, this.witnessLimit = r ? Q(r) : void 0, this.maxFee = n ? Q(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.gasPrice && (t += $t.GasPrice, n.push({ data: e.gasPrice, type: $t.GasPrice })), e.witnessLimit && (t += $t.WitnessLimit, n.push({ data: e.witnessLimit, type: $t.WitnessLimit })), e.maturity > 0 && (t += $t.Maturity, n.push({ data: e.maturity, type: $t.Maturity })), e.maxFee && (t += $t.MaxFee, n.push({ data: e.maxFee, type: $t.MaxFee })), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(mI)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(wI)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(NI)) ?? [], { policyTypes: r, policies: s } = vi.getPolicyMeta(this);
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
    return new Mn().encode(this.toTransaction());
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
    return this.witnesses.push(Tt([Me, Me])), this.witnesses.length - 1;
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
      throw new DI(e);
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
    const t = Tr(e), n = this.inputs.find((r) => {
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
    const { recipient: n, sender: r, amount: s } = e, i = Bt;
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
    return gA(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
    return gA(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
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
  addCoinOutput(e, t, n = Bt) {
    return this.pushOutput({
      type: Be.Coin,
      to: Tr(e).toB256(),
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
    return t.map(Da).forEach((n) => {
      this.pushOutput({
        type: Be.Coin,
        to: Tr(e).toB256(),
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
  addChangeOutput(e, t = Bt) {
    this.getChangeOutputs().find(
      (r) => V(r.assetId) === t
    ) || this.pushOutput({
      type: Be.Change,
      to: Tr(e).toB256(),
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
    return b0({
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
    return _a({
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
      return Me.slice(0, -o.length).concat(o);
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
    i(Bt, Q(1e11)), e.forEach((o) => i(o.assetId, o.amount));
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
    return xI(this);
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
function v0(e, t) {
  const n = e.toTransaction();
  n.type === vt.Script && (n.receiptsRoot = Me), n.inputs = n.inputs.map((i) => {
    const o = Kr(i);
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
        }, o.txID = Me, o.outputIndex = 0, o.balanceRoot = Me, o.stateRoot = Me, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = Kr(i);
    switch (o.type) {
      case Be.Contract:
        return o.balanceRoot = Me, o.stateRoot = Me, o;
      case Be.Change:
        return o.amount = Q(0), o;
      case Be.Variable:
        return o.to = Me, o.amount = Q(0), o.assetId = Me, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Om(t), s = Tt([r, new Mn().encode(n)]);
  return Oe(s);
}
var RI = (e) => {
  const t = new Uint8Array(32);
  return t.set(Y(e)), t;
}, SI = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: V(t),
    value: V(RI(n))
  };
}, Ho = class extends vi {
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
    F(this, "type", vt.Create);
    /** Witness index of contract bytecode to create */
    F(this, "bytecodeWitnessIndex");
    /** Salt */
    F(this, "salt");
    /** List of storage slots to initialize */
    F(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = V(n ?? Me), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(SI)) ?? [];
    return {
      type: vt.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? V(this.salt) : Me,
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
    return v0(this, t);
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
    return Q0({
      contractBytesSize: Q(Y(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, pA = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Y("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, _I = {
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
}, hr = class extends vi {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    F(this, "type", vt.Script);
    /** Gas limit for transaction */
    F(this, "gasLimit");
    /** Script to execute */
    F(this, "script");
    /** Script input data (parameters) */
    F(this, "scriptData");
    this.gasLimit = Q(r), this.script = Y(t ?? pA.bytes), this.scriptData = Y(n ?? pA.encodeScriptData());
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
      type: vt.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: t.length,
      scriptDataLength: n.length,
      receiptsRoot: Me,
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
    return _a({
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
    const n = Tr(t);
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
    return v0(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new Ln(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return x0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Ht = (e) => {
  if (e instanceof hr || e instanceof Ho)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case vt.Script:
      return hr.from(e);
    case vt.Create:
      return Ho.from(e);
    default:
      throw new v(R.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, kI = (e) => {
  var P, $;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = Q(s.gasPerByte), o = Q(s.gasPriceFactor), c = Y(n), [d] = new Mn().decode(c, 0);
  if (d.type === vt.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0),
      feeFromGasUsed: Q(0)
    };
  const { type: l, witnesses: I, inputs: g, policies: C } = d;
  let x = Q(0), N = Q(0);
  if (l === vt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: H } = d, ee = Q(Y(I[U].data).length);
    x = Q0({
      contractBytesSize: ee,
      gasCosts: r,
      stateRootSize: H.length || 0,
      txBytesSize: c.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (N = U), x = x0({
      gasCosts: r,
      txBytesSize: c.length
    });
  }
  const b = b0({
    gasCosts: r,
    gasPerByte: Q(i),
    inputs: g,
    metadataGas: x,
    txBytesSize: c.length
  }), D = Q((P = C.find((U) => U.type === $t.GasPrice)) == null ? void 0 : P.data), S = ($ = C.find((U) => U.type === $t.WitnessLimit)) == null ? void 0 : $.data, J = I.reduce((U, H) => U + H.dataLength, 0), T = _a({
    gasPerByte: i,
    minGas: b,
    witnessesLength: J,
    gasLimit: N,
    witnessLimit: S
  }), j = dr(t, D, o), L = dr(b, D, o), k = dr(T, D, o);
  return {
    fee: L.add(j),
    minFee: L,
    maxFee: k,
    feeFromGasUsed: j
  };
}, LI = (e) => {
  const t = Yd.fromString(e, 10).toUnix();
  return new Date(t * 1e3);
}, AC = (e) => Yd.fromUnix(Math.floor(e.getTime() / 1e3)).toString(10), MI = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var g;
  const s = new Ln(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const C = Q(t.param2).sub(wi({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let l;
  if (d) {
    const C = o.decodeArguments(d);
    C && (l = c.reduce((x, N, b) => {
      const D = C[b], S = N.name;
      return S ? {
        ...x,
        // reparse to remove bn
        [S]: JSON.parse(JSON.stringify(D))
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
function OI(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function ka(e, t) {
  return e.filter((n) => n.type === t);
}
function TI(e) {
  return ka(e, Qe.Coin);
}
function PI(e) {
  return ka(e, Qe.Message);
}
function UI(e) {
  return OI(e, [Qe.Coin, Qe.Message]);
}
function GI(e) {
  return ka(e, Qe.Contract);
}
function ni(e, t) {
  const n = TI(e), r = PI(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function HI(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== Qe.Contract)
      throw new v(
        R.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function es(e) {
  return e.type === Qe.Coin ? e.owner.toString() : e.type === Qe.Message ? e.recipient.toString() : "";
}
function fs(e, t) {
  return e.filter((n) => n.type === t);
}
function JI(e) {
  return fs(e, Be.ContractCreated);
}
function F0(e) {
  return fs(e, Be.Coin);
}
function ZI(e) {
  return fs(e, Be.Change);
}
function YI(e) {
  return fs(e, Be.Contract);
}
function uC(e) {
  return fs(e, Be.Variable);
}
var XI = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(XI || {}), VI = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(VI || {}), jI = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.contractTransfer = "Contract transfer", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(jI || {}), qI = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(qI || {}), $I = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))($I || {});
function Fi(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function D0(e) {
  switch (e) {
    case vt.Mint:
      return "Mint";
    case vt.Create:
      return "Create";
    case vt.Script:
      return "Script";
    default:
      throw new v(
        R.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function La(e, t) {
  return D0(e) === t;
}
function WI(e) {
  return La(
    e,
    "Mint"
    /* Mint */
  );
}
function N0(e) {
  return La(
    e,
    "Create"
    /* Create */
  );
}
function R0(e) {
  return La(
    e,
    "Script"
    /* Script */
  );
}
function dC(e) {
  return (t) => e.assetId === t.assetId;
}
function KI(e) {
  return Fi(e, ue.Call);
}
function zI(e) {
  return Fi(e, ue.MessageOut);
}
var ey = (e, t) => {
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
function ty(e, t) {
  var n, r, s, i, o, c, d, l;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((d = e.to) == null ? void 0 : d.type) === ((l = t.to) == null ? void 0 : l.type);
}
function Kn(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => ty(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? ey(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function ny(e) {
  return Fi(e, ue.TransferOut);
}
function ry({ receipts: e }) {
  return ny(e).reduce(
    (r, s) => Kn(r, {
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
function sy({
  inputs: e,
  receipts: t
}) {
  return zI(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = ni(e, o);
      if (c) {
        const d = es(c);
        return Kn(s, {
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
function iy({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = KI(n);
  return YI(t).reduce((l, I) => {
    const g = HI(e, I.inputIndex);
    return g ? o.reduce((x, N) => {
      var b;
      if (N.to === g.contractID) {
        const D = ni(e, N.assetId);
        if (D) {
          const S = es(D), J = [], T = r == null ? void 0 : r[g.contractID];
          return T && J.push(
            MI({
              abi: T,
              receipt: N,
              rawPayload: s,
              maxInputs: i
            })
          ), Kn(x, {
            name: "Contract call",
            from: {
              type: 1,
              address: S
            },
            to: {
              type: 0,
              address: N.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (b = N.amount) != null && b.isZero() ? void 0 : [
              {
                amount: N.amount,
                assetId: N.assetId
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
function mA({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  const r = F0(t), [s] = Fi(
    n,
    ue.Transfer
  );
  let i = [];
  return s ? ZI(t).forEach((c) => {
    const { assetId: d } = c, [l] = GI(e), I = ni(e, d);
    if (I && l) {
      const g = es(I);
      i = Kn(i, {
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
    const c = ni(e, o.assetId);
    if (c) {
      const l = {
        name: "Transfer asset",
        from: {
          type: 1,
          address: es(c)
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
      i = Kn(i, l);
    }
  }), i;
}
function oy(e) {
  return F0(e).reduce((r, s) => Kn(r, {
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
function ay({ inputs: e, outputs: t }) {
  const n = JI(t), r = UI(e)[0], s = es(r);
  return n.reduce((o, c) => Kn(o, {
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
function cy({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return N0(e) ? [
    ...ay({ inputs: t, outputs: n }),
    ...mA({ inputs: t, outputs: n, receipts: r })
  ] : R0(e) ? [
    ...mA({ inputs: t, outputs: n, receipts: r }),
    ...iy({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...ry({ receipts: r }),
    ...sy({ inputs: t, receipts: r })
  ] : [...oy(n)];
}
var lr = (e) => {
  const t = BI(e);
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
}, Ay = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, uy = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, dy = (e) => {
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
}, hy = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = dy(e.type), e.type) {
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
function Di(e) {
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
  } = e, g = C0(n), C = V(o), x = cy({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: C,
    abiMap: d,
    maxInputs: l
  }), N = D0(i.type), { fee: b } = kI({
    gasUsed: g,
    rawPayload: C,
    consensusParameters: {
      gasCosts: I,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: D, isStatusPending: S, isStatusSuccess: J, blockId: T, status: j, time: L } = hy(c), k = Ay(n), M = uy(n);
  let P;
  return L && (P = LI(L)), {
    id: t,
    fee: b,
    gasUsed: g,
    operations: x,
    type: N,
    blockId: T,
    time: L,
    status: j,
    receipts: n,
    mintedAssets: k,
    burnedAssets: M,
    isTypeMint: WI(i.type),
    isTypeCreate: N0(i.type),
    isTypeScript: R0(i.type),
    isStatusFailure: D,
    isStatusSuccess: J,
    isStatusPending: S,
    date: P,
    transaction: i
  };
}
var Us = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t) {
    /** Transaction ID */
    F(this, "id");
    /** Current provider */
    F(this, "provider");
    /** Gas used on the transaction */
    F(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    F(this, "gqlTransaction");
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
    const n = new Us(e, t);
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
    return (t = new Mn().decode(
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
    ), r = ((l = t.receipts) == null ? void 0 : l.map(lr)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), c = this.provider.getChain().consensusParameters.maxInputs;
    return Di({
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
        R.TRANSACTION_FAILED,
        `Transaction failed: ${t.gqlTransaction.status.reason}`
      );
    return t;
  }
};
function ly(e, t) {
  return e.reduce((n, r) => (r.type === ue.LogData && n.push(t.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === ue.Log && n.push(t.decodeLog(new _().encode(r.val0), r.val1.toNumber(), r.id)[0]), n), []);
}
function fy(e, t) {
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
function S0(e, t, n = 0) {
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
      const d = fy(t, c);
      return await vI(d), S0(e, t, c)(...r);
    }
  };
}
var gy = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, py = 10, my = (e) => {
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
}, Jo, _0, on = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, Fn(this, Jo), Pe(this, "operations"), Pe(this, "cache"), Pe(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new pI(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    on.nodeInfoCache = {}, on.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return S0((...r) => {
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
    const n = new on(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = on.chainInfoCache[this.url];
    if (!e)
      throw new v(
        R.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = on.nodeInfoCache[this.url];
    if (!e)
      throw new v(
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
    return on.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = uh(e.nodeVersion);
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
    const e = on.getFetchFn(this.options), t = new ym.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return lI((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? fI({
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
    } = await this.getChain(), n = new Yn(e, t.toNumber());
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
    return on.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = my(e);
    return on.chainInfoCache[this.url] = t, t;
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
    const r = Ht(e);
    Uo(this, Jo, _0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes());
    if (n) {
      const o = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: l } of o)
        if (l.type !== "SubmittedStatus")
          break;
      const c = r.getTransactionId(this.getChainId()), d = new Us(c, this);
      return await d.fetch(), d;
    }
    const {
      submit: { id: i }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Us(i, this);
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
    const r = Ht(e);
    n && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map(lr)
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
    if (e.type === vt.Create)
      return;
    let s = e;
    for (s.hasPredicateInput() && (s = await this.estimatePredicates(s)); r < py; ) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: V(s.toTransactionBytes()),
        utxoValidation: !1
      }), o = i.map(lr), { missingOutputVariables: c, missingOutputContractIds: d } = yI(o);
      if (t = c.length, n = d.length, t === 0 && n === 0)
        return;
      s.addVariableOutputs(t), d.forEach(
        ({ contractId: l }) => s.addContractInputAndOutput(fe.fromString(l))
      ), r += 1;
    }
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
    const n = Ht(e);
    t && await this.estimateTxDependencies(n);
    const r = V(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map(lr)
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
    const i = Ht(Kr(e)), o = this.getChain(), { gasPriceFactor: c, minGasPrice: d, maxGasPerTx: l } = this.getGasConfig(), I = af(i.gasPrice, d), g = i.type === vt.Script;
    i.hasPredicateInput() && r && (g && (i.gasLimit = Q(0)), await this.estimatePredicates(i));
    const C = i.calculateMinGas(o), x = i.calculateMaxGas(o, C), N = i.getCoinOutputsQuantities(), b = gy(N, t);
    i.fundWithFakeUtxos(b, s);
    let D = C, S = [];
    g ? (i.gasPrice = Q(0), i.gasLimit = Q(l.sub(x).toNumber() * 0.9), S = (await this.call(i, {
      estimateTxDependencies: n
    })).receipts, D = C0(S)) : D = C;
    const J = dr(
      D,
      I,
      c
    ).normalizeZeroToOne(), T = dr(C, I, c).normalizeZeroToOne(), j = dr(x, I, c).normalizeZeroToOne();
    return {
      requiredQuantities: b,
      receipts: S,
      gasUsed: D,
      minGasPrice: d,
      gasPrice: I,
      minGas: C,
      maxGas: x,
      usedFee: J,
      minFee: T,
      maxFee: j
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = fe.fromAddressOrString(e), s = Ht(Kr(t)), i = await this.getTransactionCost(s, n);
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
      filter: { owner: r.toB256(), assetId: t && V(t) }
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
    var d, l, I;
    const r = fe.fromAddressOrString(e), s = {
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
      queryPerAsset: t.map(Da).map(({ assetId: g, amount: C, max: x }) => ({
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
          return (s = new Mn().decode(Y(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new Mn().decode(
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
      contract: fe.fromAddressOrString(e).toB256(),
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
      owner: fe.fromAddressOrString(e).toB256(),
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
      messageId: jr.getMessageId({
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
      data: jr.decodeData(s.data),
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
      sender: fe.fromAddressOrString(I),
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
      startTimestamp: t ? FI(t) : void 0
    });
    return Q(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Us(e, this);
  }
}, ri = on;
Jo = /* @__PURE__ */ new WeakSet();
_0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === Qe.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Pe(ri, "chainInfoCache", {});
Pe(ri, "nodeInfoCache", {});
async function hC(e) {
  var C;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new v(
      R.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Mn().decode(
    Y(s.rawPayload),
    0
  ), o = ((C = s.receipts) == null ? void 0 : C.map(lr)) || [], {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: I }
  } = n.getChain(), g = Di({
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
async function lC(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, l = n.toTransaction(), I = n.toTransactionBytes();
  return Di({
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
async function fC(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: l, gasCosts: I }
  } = n.getChain();
  return {
    transactions: i.map((C) => {
      const { node: x } = C, { id: N, rawPayload: b, receipts: D, status: S } = x, [J] = new Mn().decode(Y(b), 0), T = (D == null ? void 0 : D.map(lr)) || [], j = Di({
        id: N,
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
var wy = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new _().encode(new Ge(n).toNumber());
  return Uint8Array.from([
    ...Y(r),
    ...i,
    ...Y(t)
  ]);
}, Ey = async (e) => {
  const t = wy(e);
  await ya();
  const n = jm(16, 0, $m.ScriptData), r = tA(17, 16, 32), s = Hr(18, 17, 0), i = tA(19, 17, 8), o = Xm(16, 18, 19), c = jd(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Ni = class extends dd {
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
    F(this, "address");
    /**
     * The provider used to interact with the network.
     */
    F(this, "_provider");
    F(this, "_connector");
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
  async getBalance(t = Bt) {
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
    const s = CE({
      amount: Q(r),
      assetId: Bt,
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
          const N = String(g.assetId);
          if (g.owner === d && i[N]) {
            const b = Q(g.amount);
            i[N].owned = i[N].owned.add(b), o.push(g.id);
          }
        } else
          g.recipient === d && g.amount && i[Bt] && (i[Bt].owned = i[Bt].owned.add(g.amount), c.push(g.nonce));
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
  async createTransfer(t, n, r = Bt, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, c = new hr(o);
    c.addCoinOutput(fe.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: l, gasUsed: I } = await this.provider.getTransactionCost(c);
    return c.gasPrice = Q(s.gasPrice ?? i), c.gasLimit = Q(s.gasLimit ?? I), this.validateGas({
      gasUsed: I,
      gasPrice: c.gasPrice,
      gasLimit: c.gasLimit,
      minGasPrice: i
    }), await this.fund(c, l, d), c;
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
  async transfer(t, n, r = Bt, s = {}) {
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
  async transferToContract(t, n, r = Bt, s = {}) {
    const i = fe.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), c = { gasPrice: o, ...s }, { script: d, scriptData: l } = await Ey({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: r
    }), I = new hr({
      ...c,
      script: d,
      scriptData: l
    });
    I.addContractInputAndOutput(i);
    const { maxFee: g, requiredQuantities: C, gasUsed: x } = await this.provider.getTransactionCost(
      I,
      [{ amount: Q(n), assetId: String(r) }]
    );
    return I.gasLimit = Q(c.gasLimit ?? x), this.validateGas({
      gasUsed: x,
      gasPrice: I.gasPrice,
      gasLimit: I.gasLimit,
      minGasPrice: o
    }), await this.fund(I, C, g), this.sendTransaction(I);
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
    const { minGasPrice: s } = this.provider.getGasConfig(), i = fe.fromAddressOrString(t), o = Y(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), c = Y(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), l = { script: new Uint8Array([
      ...Y(_I.bytes),
      ...o,
      ...c
    ]), gasPrice: s, ...r }, I = new hr(l), g = [{ amount: Q(n), assetId: Bt }], { requiredQuantities: C, maxFee: x, gasUsed: N } = await this.provider.getTransactionCost(
      I,
      g
    );
    return I.gasLimit = Q(l.gasLimit ?? N), this.validateGas({
      gasUsed: N,
      gasPrice: I.gasPrice,
      gasLimit: I.gasLimit,
      minGasPrice: s
    }), await this.fund(I, C, x), this.sendTransaction(I);
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
  async sendTransaction(t, n) {
    if (this._connector)
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), t)
      );
    const r = Ht(t);
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
    const n = Ht(t);
    return await this.provider.estimateTxDependencies(n), this.provider.simulate(n, { estimateTxDependencies: !1 });
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
}, xr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    F(this, "address");
    F(this, "publicKey");
    F(this, "compressedPublicKey");
    F(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = zt(e, 32);
    this.privateKey = V(t), this.publicKey = V(bn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = V(bn.getPublicKey(t, !0)), this.address = fe.fromPublicKey(this.publicKey);
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
    const t = bn.sign(Y(e), Y(this.privateKey)), n = zt(`0x${t.r.toString(16)}`, 32), r = zt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, Tt([n, r]);
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = bn.ProjectivePoint.fromHex(Y(this.compressedPublicKey)), n = bn.ProjectivePoint.fromHex(Y(e));
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
    const c = new bn.Signature(BigInt(V(r)), BigInt(V(s))).addRecoveryBit(
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
    return fe.fromPublicKey(xr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? Td(Tt([kn(32), Y(e)])) : kn(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = bn.ProjectivePoint.fromHex(Y(e));
    return V(t.toRawBytes(!1).slice(1));
  }
}, wA = 13, EA = 8, IA = 1, co = 32, Iy = 16, yA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function yy(e, t, n) {
  const r = Sn(yA(e), "hex"), s = fe.fromAddressOrString(t), i = kn(co), o = ku({
    password: Sn(n),
    salt: i,
    dklen: co,
    n: 2 ** wA,
    r: EA,
    p: IA
  }), c = kn(Iy), d = await wg(r, o, c), l = Uint8Array.from([...o.subarray(16, 32), ...d]), I = Lu(l), g = Or(I, "hex"), C = {
    id: zw(),
    version: 3,
    address: yA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Or(c, "hex") },
      ciphertext: Or(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: co,
        n: 2 ** wA,
        p: IA,
        r: EA,
        salt: Or(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function By(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: l, salt: I }
    }
  } = n, g = Sn(s, "hex"), C = Sn(i, "hex"), x = Sn(I, "hex"), N = Sn(t), b = ku({
    password: N,
    salt: x,
    n: c,
    p: l,
    r: d,
    dklen: o
  }), D = Uint8Array.from([...b.subarray(16, 32), ...g]), S = Lu(D), J = Or(S, "hex");
  if (r !== J)
    throw new v(
      R.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await mg(g, b, C);
  return V(T);
}
var k0 = class extends Ni {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new xr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    F(this, "signer");
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
    return await this.signer().sign(Mm(t));
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Ht(t), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r);
    return await this.signer().sign(s);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = Ht(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, n) {
    const r = Ht(t);
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
    const n = Ht(t);
    return await this.provider.estimateTxDependencies(n), this.provider.call(
      await this.populateTransactionWitnessesSignature(n),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return yy(this.privateKey, this.address, t);
  }
};
Pe(k0, "defaultPath", "m/44'/1179993420'/0'/0/0");
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
], Cy = /* @__PURE__ */ ((e) => (e.english = "english", e))(Cy || {});
function Zo(e) {
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
function by(e) {
  return (1 << e) - 1;
}
function L0(e) {
  return (1 << e) - 1 << 8 - e;
}
function Ao(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function Qy(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function xy(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & by(8 - n)), n += 3);
  const r = e.length / 4, s = Y(Oe(e))[0] & L0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function vy(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = Y(new Uint8Array(n));
  let s = 0;
  for (let l = 0; l < e.length; l += 1) {
    const I = t.indexOf(e[l].normalize("NFKD"));
    if (I === -1)
      throw new v(
        R.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[l]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      I & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = L0(o);
  if ((Y(Oe(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new v(
      R.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Fy = Zo("Bitcoin seed"), Dy = "0x0488ade4", Ny = "0x04358394", BA = [12, 15, 18, 21, 24];
function CA(e) {
  if (e.length !== 2048)
    throw new v(
      R.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function Ry(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new v(
      R.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function uo(e) {
  if (!BA.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${BA.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new v(R.INVALID_MNEMONIC, t);
  }
}
var Qn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = xs) {
    F(this, "wordlist");
    this.wordlist = e, CA(this.wordlist);
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
  static mnemonicToEntropy(e, t = xs) {
    const n = Ao(e);
    return uo(n), V(vy(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = xs) {
    const n = Y(e);
    return CA(t), Ry(n), xy(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    uo(Ao(e));
    const n = Zo(Qy(e)), r = Zo(`mnemonic${t}`);
    return Nr(n, r, 2048, 64, "sha512");
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
    const t = Ao(e);
    let n = 0;
    try {
      uo(t);
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
    const t = xs;
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
        R.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Y(Dr("sha512", Fy, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = Qn.masterKeysFromSeed(e), r = Y(t ? Ny : Dy), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), l = Tt([
      r,
      s,
      i,
      o,
      c,
      Tt(["0x00", d])
    ]), I = $o(Oe(Oe(l)), 0, 4);
    return JA(Tt([l, I]));
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
    const n = t ? Oe(Tt([kn(e), Y(t)])) : kn(e);
    return Qn.entropyToMnemonic(n);
  }
}, Ma = Qn, M0 = 2147483648, O0 = V("0x0488ade4"), Oa = V("0x0488b21e"), T0 = V("0x04358394"), Ta = V("0x043587cf");
function bA(e) {
  return JA(Tt([e, $o(Oe(Oe(e)), 0, 4)]));
}
function Sy(e = !1, t = !1) {
  return e ? t ? Ta : Oa : t ? T0 : O0;
}
function _y(e) {
  return [Oa, Ta].includes(V(e.slice(0, 4)));
}
function ky(e) {
  return [O0, T0, Oa, Ta].includes(
    V(e.slice(0, 4))
  );
}
function Ly(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new v(R.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + M0 : parseInt(r, 10)
  );
}
var tr = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    F(this, "depth", 0);
    F(this, "index", 0);
    F(this, "fingerprint", V("0x00000000"));
    F(this, "parentFingerprint", V("0x00000000"));
    F(this, "privateKey");
    F(this, "publicKey");
    F(this, "chainCode");
    if (e.privateKey) {
      const t = new xr(e.privateKey);
      this.publicKey = V(t.compressedPublicKey), this.privateKey = V(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new v(
          R.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = V(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = $o(os(Oe(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & M0) {
      if (!t)
        throw new v(
          R.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Y(this.publicKey));
    s.set(zt(e, 4), 33);
    const i = Y(Dr("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const I = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", g = Q(o).add(t).mod(I).toBytes(32);
      return new tr({
        privateKey: g,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const l = new xr(V(o)).addPoint(n);
    return new tr({
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
    return Ly(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
        R.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = Sy(this.privateKey == null || e, t), r = V(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = ca(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? Tt(["0x00", this.privateKey]) : this.publicKey, d = Y(
      Tt([n, r, s, i, o, c])
    );
    return bA(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Ma.masterKeysFromSeed(e);
    return new tr({
      chainCode: Y(t.slice(32)),
      privateKey: Y(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Qh(Fh(e)), n = Y(t), r = bA(n.slice(0, 78)) === e;
    if (n.length !== 82 || !ky(n))
      throw new v(R.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new v(R.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = V(n.slice(5, 9)), o = parseInt(V(n.slice(9, 13)).substring(2), 16), c = V(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new v(
        R.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (_y(n)) {
      if (d[0] !== 3)
        throw new v(R.HD_WALLET_ERROR, "Invalid public extended key.");
      return new tr({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new v(R.HD_WALLET_ERROR, "Invalid private extended key.");
    return new tr({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, ho = tr, P0 = class extends Ni {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Nt(e, this._provider);
  }
}, Nt = class extends k0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new xr("0x00"), new P0(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = xr.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = ho.fromSeed(e).derivePath(t || Nt.defaultPath);
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
    const s = Ma.mnemonicToSeed(e, n), o = ho.fromSeed(s).derivePath(t || Nt.defaultPath);
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
    const n = ho.fromExtendedKey(e);
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
    const r = await By(e, t);
    return new Nt(r, n);
  }
}, St = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new P0(e, t);
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
Pe(St, "generate", Nt.generate);
Pe(St, "fromSeed", Nt.fromSeed);
Pe(St, "fromMnemonic", Nt.fromMnemonic);
Pe(St, "fromExtendedKey", Nt.fromExtendedKey);
Pe(St, "fromEncryptedJson", Nt.fromEncryptedJson);
var My = class {
  constructor() {
    F(this, "storage", /* @__PURE__ */ new Map());
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
}, Gn, U0 = class {
  constructor(e) {
    Fn(this, Gn, void 0), Pe(this, "pathKey", "{}"), Pe(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Pe(this, "numberOfAccounts", 0), Kt(this, Gn, e.secret || Ma.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: _e(this, Gn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = St.fromMnemonic(_e(this, Gn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = St.fromMnemonic(_e(this, Gn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = fe.fromAddressOrString(e);
    do {
      const r = St.fromMnemonic(_e(this, Gn), this.getDerivePath(t));
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
    return St.fromPrivateKey(t);
  }
};
Gn = /* @__PURE__ */ new WeakMap();
Pe(U0, "type", "mnemonic");
var xn, G0 = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    Fn(this, xn, []), e.secret ? Kt(this, xn, [e.secret]) : Kt(this, xn, e.accounts || [St.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: _e(this, xn)
    };
  }
  getPublicAccount(e) {
    const t = St.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return _e(this, xn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = St.generate();
    return _e(this, xn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = fe.fromAddressOrString(e), n = _e(this, xn).find(
      (r) => St.fromPrivateKey(r).address.equals(t)
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
    return St.fromPrivateKey(t);
  }
};
xn = /* @__PURE__ */ new WeakMap();
Pe(G0, "type", "privateKey");
var dn = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function hn(e, t) {
  if (!e)
    throw new v(R.WALLET_MANAGER_ERROR, t);
}
var Ft, Hn, an, Yo, H0, Xo, J0, Z0 = class extends m0.EventEmitter {
  constructor(e) {
    super(), Fn(this, Yo), Fn(this, Xo), Pe(this, "storage", new My()), Pe(this, "STORAGE_KEY", "WalletManager"), Fn(this, Ft, []), Fn(this, Hn, ""), Fn(this, an, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return _e(this, an);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    hn(!_e(this, an), dn.wallet_not_unlocked);
    const t = _e(this, Ft).find((n, r) => r === e);
    return hn(t, dn.vault_not_found), t.vault.serialize();
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
    return hn(n, dn.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = fe.fromAddressOrString(e);
    hn(!_e(this, an), dn.wallet_not_unlocked);
    const n = _e(this, Ft).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return hn(n, dn.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = _e(this, Ft)[(e == null ? void 0 : e.vaultId) || 0];
    await hn(t, dn.vault_not_found);
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
    Kt(this, Ft, _e(this, Ft).concat({
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
    Kt(this, an, !0), Kt(this, Ft, []), Kt(this, Hn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Kt(this, Hn, e), Kt(this, an, !1);
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
    const n = _e(this, an);
    await this.unlock(e), Kt(this, Hn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await hn(!_e(this, an), dn.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await gg(_e(this, Hn), JSON.parse(e));
      Kt(this, Ft, Uo(this, Xo, J0).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await hn(!_e(this, an), dn.wallet_not_unlocked);
    const e = await pg(_e(this, Hn), {
      vaults: Uo(this, Yo, H0).call(this, _e(this, Ft))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = Z0.Vaults.find((n) => n.type === e);
    return hn(t, dn.invalid_vault_type), t;
  }
}, Oy = Z0;
Ft = /* @__PURE__ */ new WeakMap();
Hn = /* @__PURE__ */ new WeakMap();
an = /* @__PURE__ */ new WeakMap();
Yo = /* @__PURE__ */ new WeakSet();
H0 = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Xo = /* @__PURE__ */ new WeakSet();
J0 = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
Pe(Oy, "Vaults", [U0, G0]);
var Ty = class {
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
};
Pe(Ty, "type");
var gC = class {
}, Py = (e) => {
  const n = Y(e), r = TA(n, 16384), s = w0(r.map((o) => V(o)));
  return Td(Tt(["0x4655454C", s]));
}, QA = class extends Ni {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(t, n, r, s) {
    const { predicateBytes: i, predicateInterface: o } = QA.processPredicateData(
      t,
      r,
      s
    ), c = fe.fromB256(Py(i));
    super(c, n);
    F(this, "bytes");
    F(this, "predicateData", Uint8Array.from([]));
    F(this, "predicateArgs", []);
    F(this, "interface");
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
    const n = Ht(t), { policies: r } = vi.getPolicyMeta(n);
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
  async createTransfer(t, n, r = Bt, s = {}) {
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
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Ie(this.bytes.length).encode(this.bytes), i = wi({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + la + Fg + ne + r.byteLength + t * ne;
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
    if (n && (i = new Ln(n), i.functions.main === void 0))
      throw new v(
        R.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = QA.setConfigurableConstants(
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
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, Y0 = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(Y0 || {}), Pa = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Pa || {}), X0 = "FuelConnector", Uy = /* @__PURE__ */ ((e) => (e.ping = "ping", e.uiEvent = "uiEvent", e.event = "event", e.request = "request", e.response = "response", e.removeConnection = "removeConnection", e))(Uy || {}), Gy = class {
  constructor(e) {
    F(this, "storage");
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
}, Hy = class extends m0.EventEmitter {
  constructor() {
    super(...arguments);
    F(this, "name", "");
    F(this, "metadata", {});
    F(this, "connected", !1);
    F(this, "installed", !1);
    F(this, "events", Pa);
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
function Jy(e, { cache: t, cacheTime: n, key: r }) {
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
function pC(e) {
  window.dispatchEvent(
    new CustomEvent(X0, {
      detail: e
    })
  );
}
function Zy() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function vs(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var Yy = 2e3, Xy = 5e3, Zr = class extends Hy {
  constructor(t = Zr.defaultConfig) {
    super();
    F(this, "_storage", null);
    F(this, "_connectors", []);
    F(this, "_targetObject", null);
    F(this, "_unsubscribes", []);
    F(this, "_targetUnsubscribe");
    F(this, "_pingCache", {});
    F(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    F(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = X0;
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
    F(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    F(this, "triggerConnectorEvents", async () => {
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
    F(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new Gy(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(Zr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(Y0).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      vs(t.isConnected()),
      vs(this.pingConnector(t))
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
      return await Jy(async () => vs(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: Xy
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Pa)), await ((o = this._storage) == null ? void 0 : o.setItem(Zr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = Zy();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), vs(t.promise, Yy).then(() => !0).catch(() => !1);
  }
  async hasWallet() {
    return this.hasConnector();
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   *
   * @deprecated Provider is going to be deprecated in the future.
   */
  async getProvider(t) {
    return this._getProvider(t);
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
      n = await ri.create(t.url);
    else {
      if (t)
        throw new Error("Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await ri.create(r.url);
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
    return new Ni(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Zr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, V0 = Zr;
Pe(V0, "STORAGE_KEY", "fuel-current-connector");
Pe(V0, "defaultConfig", {});
var Vy = [
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
], lo = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", jy = (e) => Vy.includes(e) ? e : e === "Revert(123)" ? "MismatchedSelector" : "unknown", qy = (e) => {
  if ((e == null ? void 0 : e.type) === "FailureStatus") {
    const t = jy(e.reason);
    return {
      doc: t !== "unknown" ? `${lo}#variant.${t}` : lo,
      reason: t
    };
  }
  return { doc: lo, reason: "unknown" };
};
function fo(e, t) {
  if (!e)
    throw new v(R.TRANSACTION_ERROR, t);
}
var xA = {
  [Kg]: "RequireFailed",
  [fd]: "TransferToAddressFailed",
  [zg]: "SendMessageFailed",
  [ep]: "AssertEqFailed",
  [tp]: "AssertFailed",
  [np]: "Unknown"
}, $y = (e) => {
  const t = e.val.toHex();
  return xA[t] ? xA[t] : void 0;
}, gs = class extends Error {
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
    F(this, "receipt");
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
}, Wy = class extends gs {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "RequireRevertError";
  }
}, Ky = class extends gs {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "TransferToAddressRevertError";
  }
}, zy = class extends gs {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "SendMessageRevertError";
  }
}, eB = class extends gs {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "AssertFailedRevertError";
  }
}, tB = (e) => {
  const t = $y(e);
  if (t)
    switch (t) {
      case "RequireFailed":
        return new Wy(e, t);
      case "TransferToAddressFailed":
        return new Ky(e, t);
      case "SendMessageFailed":
        return new zy(e, t);
      case "AssertFailed":
        return new eB(e, t);
      default:
        return new gs(e, t);
    }
}, { warn: nB } = console, rB = (e) => e.filter((t) => t.type === ue.Revert), sB = class {
  constructor(e) {
    F(this, "revertReceipts");
    this.revertReceipts = rB(e);
  }
  assert(e) {
    const t = this.getError();
    if (t)
      throw t.cause = e, t;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && nB(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), tB(this.revertReceipts[0]);
  }
}, iB = (e, t) => typeof t == "bigint" ? t.toString() : t, oB = class extends Error {
  constructor(t, n, r) {
    var c;
    let s = "";
    (c = t == null ? void 0 : t.gqlTransaction) != null && c.status && (s = `${JSON.stringify(qy(t.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      t.receipts.map(({ type: d, ...l }) => ({ type: ue[d], ...l })),
      iB,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    F(this, "logs");
    this.logs = r, new sB(t.receipts).assert(this);
  }
}, cn, LA, j0 = (LA = class {
  constructor(...e) {
    wt(this, cn, void 0);
    xt(this, cn, e || []);
  }
  entries() {
    return be(this, cn);
  }
  push(...e) {
    be(this, cn).push(...e);
  }
  concat(e) {
    return be(this, cn).concat(e);
  }
  extend(e) {
    be(this, cn).push(...e);
  }
  toBytes() {
    return de(
      be(this, cn).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return V(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(be(this, cn), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, cn = new WeakMap(), LA), aB = (e) => la + wi({ maxInputs: e }), q0 = ne + Xr + bg + ne + ne;
function cB(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === ue.ScriptResult ? n = i : (i.type === ue.Return || i.type === ue.ReturnData || i.type === ue.Revert) && (r = i);
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
function Ua(e, t, n = []) {
  try {
    const r = cB(e);
    return t(r);
  } catch (r) {
    throw new oB(
      e,
      r.message,
      n
    );
  }
}
function AB(e, t, n) {
  return Ua(
    e,
    (r) => {
      if (r.returnReceipt.type === ue.Revert)
        throw new v(
          R.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ue.Return && r.returnReceipt.type !== ue.ReturnData) {
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
      return r.returnReceipt.type === ue.Return && (s = r.returnReceipt.val), r.returnReceipt.type === ue.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var ts = class {
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
    F(this, "bytes");
    /**
     * A function to encode the script data.
     */
    F(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    F(this, "scriptResultDecoder");
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
    return wi({ maxInputs: t }) + la + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return ts.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return Ua(e, this.scriptResultDecoder, t);
  }
}, $0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, uB = Me, W0 = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new j0(
    bs(16, e),
    bs(17, n),
    Hr(17, 17, 0),
    bs(18, r)
  );
  return t ? i.push(
    bs(19, t),
    Hr(19, 19, 0),
    eA(16, 17, 18, 19)
  ) : i.push(eA(16, 17, 18, Te.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Hr(21, Te.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Hr(22, Te.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    Vm(22, 22, s.encodedLength),
    Ym(21, 22)
  ]), i;
};
function vA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new j0();
  for (let r = 0; r < e.length; r += 1)
    n.extend(W0(e[r], t[r]).entries());
  return n.push(jd(1)), n.toBytes();
}
var FA = (e) => e === ue.Return || e === ue.ReturnData, dB = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === ue.Call && r === uB && s === t
), hB = (e, t) => (n) => {
  if (Jt(n.code) !== 0)
    throw new v(
      R.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${e} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = dB(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => FA(o)).flatMap((o, c, d) => {
    var l;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === ue.Return)
      return [new _().encode(o.val)];
    if (o.type === ue.ReturnData) {
      const I = Y(o.data);
      if (t && FA((l = d[c + 1]) == null ? void 0 : l.type)) {
        const g = d[c + 1];
        return de([I, Y(g.data)]);
      }
      return [I];
    }
    return [new Uint8Array()];
  });
}, lB = (e, t, n, r = []) => Ua(e, hB(t, n), r), fB = (e) => e.reduce(
  (t, n) => {
    const r = { ...$0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + W0(r, s).byteLength();
  },
  jt.size()
  // placeholder for single RET instruction which is added later
), gB = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), DA = (e, t) => new ts(
  // Script to call the contract, start with stub size matching length of calls
  vA(
    new Array(e.length).fill($0),
    gB(e)
  ),
  (n) => {
    var N;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = fB(n), i = (8 - s % 8) % 8, o = s + i, c = aB(t.toNumber()) + o, d = [];
    let l = c;
    const I = [], g = [];
    for (let b = 0; b < r; b += 1) {
      const D = n[b];
      I.push({
        isHeap: D.isOutputDataHeap,
        encodedLength: D.outputEncodedLength
      });
      let S = 0;
      if (d.push({
        amountOffset: l,
        assetIdOffset: l + ne,
        gasForwardedOffset: D.gas ? l + ne + Xr : 0,
        callDataOffset: l + ne + Xr + S
      }), g.push(new _().encode(D.amount || 0)), g.push(new G().encode(((N = D.assetId) == null ? void 0 : N.toString()) || Bt)), g.push(D.contractId.toBytes()), g.push(new _().encode(D.fnSelector)), D.gas && (g.push(new _().encode(D.gas)), S = ne), D.isInputDataPointer) {
        const T = l + q0 + S;
        g.push(new _().encode(T));
      }
      const J = Y(D.data);
      g.push(J), l = c + de(g).byteLength;
    }
    const C = vA(d, I);
    return { data: de(g), script: C };
  },
  () => [new Uint8Array()]
);
function pB(e) {
  const t = e.receipts.find((n) => n.type === ue.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var K0 = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    F(this, "functionScopes");
    F(this, "isMultiCall");
    F(this, "gasUsed");
    F(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = pB(t);
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
      return AB(e, n, t);
    const s = lB(
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
    return ly(e, n.interface);
  }
}, z0 = class extends K0 {
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
    F(this, "transactionId");
    F(this, "transactionResponse");
    F(this, "transactionResult");
    F(this, "program");
    F(this, "logs");
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
    return new z0(
      t,
      n,
      i,
      s,
      r
    );
  }
}, Vo = class extends K0 {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    F(this, "callResult");
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
    return await new Vo(t, n, r);
  }
};
function mB(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), c = e.getCallConfig().func.isInputDataPointer ? q0 : 0, d = i.encodeArguments(r, t + c);
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
var eh = class {
  // flag to check if any of the callParams has gasLimit set
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    F(this, "transactionRequest");
    F(this, "program");
    F(this, "functionInvocationScopes", []);
    F(this, "txParameters");
    F(this, "requiredCoins", []);
    F(this, "isMultiCall", !1);
    F(this, "hasCallParamsGasLimit", !1);
    this.program = e, this.isMultiCall = t, this.transactionRequest = new hr();
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
    const n = t.maxInputs, r = DA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => mB(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = DA(this.functionInvocationScopes, e);
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
    await ya(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
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
    var s;
    const t = this.getProvider(), n = await this.getTransactionRequest();
    return n.gasPrice = Q(Jt(n.gasPrice) || Jt((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins(), {
      resourcesOwner: (s = this.program.account) == null ? void 0 : s.address
    });
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
    fo(this.program.account, "Wallet is required!");
    const e = await this.getTransactionRequest(), { maxFee: t, gasUsed: n, minGasPrice: r } = await this.getTransactionCost();
    this.setDefaultTxParams(e, r, n), await this.fundWithRequiredCoins(t);
    const s = await this.program.account.sendTransaction(e, {
      awaitExecution: !0
    });
    return z0.build(
      this.functionInvocationScopes,
      s,
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
    if (fo(this.program.account, "Wallet is required!"), !this.program.account.populateTransactionWitnessesSignature)
      return this.dryRun();
    const t = await this.getTransactionRequest(), { maxFee: n, gasUsed: r, minGasPrice: s } = await this.getTransactionCost();
    this.setDefaultTxParams(t, s, r), await this.fundWithRequiredCoins(n);
    const i = await this.program.account.simulateTransaction(t);
    return Vo.build(this.functionInvocationScopes, i, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    fo(this.program.account, "Wallet is required!");
    const e = this.getProvider(), t = await this.getTransactionRequest(), { maxFee: n, gasUsed: r, minGasPrice: s } = await this.getTransactionCost();
    this.setDefaultTxParams(t, s, r), await this.fundWithRequiredCoins(n);
    const i = await e.call(t, {
      utxoValidation: !1
    });
    return await Vo.build(
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
    var c, d;
    const r = !!((c = this.txParameters) != null && c.gasLimit) || this.hasCallParamsGasLimit, s = !!((d = this.txParameters) != null && d.gasPrice), { gasLimit: i, gasPrice: o } = e;
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
}, th = class extends eh {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    F(this, "func");
    F(this, "callParameters");
    F(this, "forward");
    F(this, "args");
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
      this.forward = Da(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, wB = class extends eh {
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
}, EB = class {
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
    F(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    F(this, "provider");
    /**
     * The contract's ABI interface.
     */
    F(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    F(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    F(this, "functions", {});
    this.interface = t instanceof Ln ? t : new Ln(t), this.id = fe.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new th(this, e, t);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new wB(this, e);
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
}, IB = class extends th {
  constructor() {
    super(...arguments);
    F(this, "scriptRequest");
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
    this.scriptRequest = new ts(
      t,
      (i) => this.func.encodeArguments(
        i,
        ts.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, mC = class extends qg {
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
    F(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    F(this, "interface");
    /**
     * The account associated with the script.
     */
    F(this, "account");
    /**
     * The script request object.
     */
    F(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    F(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    F(this, "functions");
    this.bytes = Y(t), this.interface = new Ln(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new IB(this, this.interface.getFunction("main"), s)
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
new ts(
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
function wC(e) {
  return e;
}
var yB = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(yB || {}), BB = Object.defineProperty, CB = (e, t) => {
  for (var n in t)
    BB(e, n, { get: t[n], enumerable: !0 });
}, bB = {};
CB(bB, {
  getContractId: () => sh,
  getContractRoot: () => nh,
  getContractStorageRoot: () => rh,
  hexlifyWithPrefix: () => jo
});
var nh = (e) => {
  const n = Y(e), r = TA(n, 16384);
  return w0(r.map((s) => V(s)));
}, rh = (e) => {
  const t = new IE();
  return e.forEach(({ key: n, value: r }) => t.update(Oe(n), r)), t.root;
}, sh = (e, t, n) => {
  const r = nh(Y(e));
  return Oe(Tt(["0x4655454C", t, r, n]));
}, jo = (e, t = !1) => {
  if (e.startsWith("0x"))
    return V(e);
  if (t)
    return V(`0x${e}`);
  throw new v(v.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, QB = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    F(this, "bytecode");
    F(this, "interface");
    F(this, "provider");
    F(this, "account");
    this.bytecode = Y(e), t instanceof Ln ? this.interface = t : this.interface = new Ln(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new QB(this.bytecode, this.interface, e);
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
      key: jo(c, !0),
      value: jo(d, !0)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: kn(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new v(
        R.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || rh(n.storageSlots), s = sh(this.bytecode, n.salt, r), i = new Ho({
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
      throw new v(R.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new EB(n, this.interface, this.account);
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
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, EC = 9, IC = 3, yC = 9, BC = [
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
], CC = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", MA, bC = typeof process < "u" && ((MA = process == null ? void 0 : process.env) == null ? void 0 : MA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  Xr as ASSET_ID_LEN,
  dd as AbstractAccount,
  Vg as AbstractAddress,
  jg as AbstractContract,
  hd as AbstractProgram,
  qg as AbstractScript,
  ZB as AbstractScriptRequest,
  Ni as Account,
  fe as Address,
  qI as AddressType,
  Ct as ArrayCoder,
  eB as AssertFailedRevertError,
  G as B256Coder,
  _g as B512Coder,
  Ge as BN,
  Bt as BaseAssetId,
  vi as BaseTransactionRequest,
  k0 as BaseWalletUnlocked,
  kg as BooleanCoder,
  Ie as ByteArrayCoder,
  bg as CONTRACT_ID_LEN,
  VB as CONTRACT_MAX_SIZE,
  $I as ChainName,
  aC as ChangeOutputCollisionError,
  ie as Coder,
  yB as Commands,
  EB as Contract,
  QB as ContractFactory,
  bB as ContractUtils,
  Ho as CreateTransactionRequest,
  yC as DECIMAL_UNITS,
  IC as DEFAULT_MIN_PRECISION,
  EC as DEFAULT_PRECISION,
  eC as EmptyRoot,
  qu as EnumCoder,
  ep as FAILED_ASSERT_EQ_SIGNAL,
  tp as FAILED_ASSERT_SIGNAL,
  Kg as FAILED_REQUIRE_SIGNAL,
  zg as FAILED_SEND_MESSAGE_SIGNAL,
  fd as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  np as FAILED_UNKNOWN_SIGNAL,
  Ws as FUEL_BECH32_HRP_PREFIX,
  bC as FUEL_NETWORK_URL,
  V0 as Fuel,
  Hy as FuelConnector,
  X0 as FuelConnectorEventType,
  Pa as FuelConnectorEventTypes,
  Y0 as FuelConnectorMethods,
  z0 as FunctionInvocationResult,
  th as FunctionInvocationScope,
  ho as HDWallet,
  Fg as INPUT_COIN_FIXED_SIZE,
  Zs as InputCoder,
  Ec as InputCoinCoder,
  Js as InputContractCoder,
  jr as InputMessageCoder,
  Qe as InputType,
  j0 as InstructionSet,
  Ln as Interface,
  K0 as InvocationResult,
  Cy as Language,
  Gy as LocalStorage,
  zB as MAX_PREDICATE_DATA_LENGTH,
  KB as MAX_PREDICATE_LENGTH,
  $B as MAX_SCRIPT_DATA_LENGTH,
  qB as MAX_SCRIPT_LENGTH,
  WB as MAX_STATIC_CONTRACTS,
  jB as MAX_WITNESSES,
  BA as MNEMONIC_SIZES,
  My as MemoryStorage,
  Uy as MessageTypes,
  Ma as Mnemonic,
  U0 as MnemonicVault,
  wB as MultiCallInvocationScope,
  DI as NoWitnessAtIndexError,
  cC as NoWitnessByOwnerError,
  z as NumberCoder,
  jI as OperationName,
  yc as OutputChangeCoder,
  Xs as OutputCoder,
  Ic as OutputCoinCoder,
  Ys as OutputContractCoder,
  Cc as OutputContractCreatedCoder,
  Be as OutputType,
  Bc as OutputVariableCoder,
  CC as PANIC_DOC_URL,
  BC as PANIC_REASONS,
  Vs as PoliciesCoder,
  $t as PolicyType,
  QA as Predicate,
  G0 as PrivateKeyVault,
  ri as Provider,
  xo as ReceiptBurnCoder,
  bc as ReceiptCallCoder,
  YB as ReceiptCoder,
  Dc as ReceiptLogCoder,
  Nc as ReceiptLogDataCoder,
  js as ReceiptMessageOutCoder,
  qr as ReceiptMintCoder,
  vc as ReceiptPanicCoder,
  Qc as ReceiptReturnCoder,
  xc as ReceiptReturnDataCoder,
  Fc as ReceiptRevertCoder,
  _c as ReceiptScriptResultCoder,
  Rc as ReceiptTransferCoder,
  Sc as ReceiptTransferOutCoder,
  ue as ReceiptType,
  Wy as RequireRevertError,
  gs as RevertError,
  la as SCRIPT_FIXED_SIZE,
  mC as Script,
  ts as ScriptRequest,
  oB as ScriptResultDecoderError,
  hr as ScriptTransactionRequest,
  zy as SendMessageRevertError,
  xr as Signer,
  gC as StorageAbstract,
  kc as StorageSlotCoder,
  Mg as StringCoder,
  Ei as StructCoder,
  Mn as TransactionCoder,
  Mc as TransactionCreateCoder,
  Oc as TransactionMintCoder,
  Us as TransactionResponse,
  Lc as TransactionScriptCoder,
  VI as TransactionStatus,
  vt as TransactionType,
  XI as TransactionTypeName,
  Ky as TransferToAddressRevertError,
  zu as TupleCoder,
  wr as TxPointerCoder,
  _ as U64Coder,
  XB as UtxoIdCoder,
  Ty as Vault,
  ed as VecCoder,
  ne as WORD_SIZE,
  St as Wallet,
  P0 as WalletLocked,
  Oy as WalletManager,
  Nt as WalletUnlocked,
  qs as WitnessCoder,
  Me as ZeroBytes32,
  CE as addAmountToAsset,
  Kn as addOperation,
  Tr as addressify,
  PA as arrayify,
  BI as assembleReceiptByType,
  Di as assembleTransactionSummary,
  fo as assert,
  Q as bn,
  Sn as bufferFromString,
  iC as buildBlockExplorerUrl,
  Jy as cacheFor,
  Q0 as calculateMetadataGasForTxCreate,
  x0 as calculateMetadataGasForTxScript,
  dr as calculatePriceWithFactor,
  kI as calculateTransactionFee,
  wi as calculateVmTxMemory,
  vB as capitalizeString,
  TA as chunkAndPadBytes,
  cp as clearFirst12BytesFromB256,
  Da as coinQuantityfy,
  de as concat,
  UA as concatBytes,
  wC as createConfig,
  gg as decrypt,
  mg as decryptJsonWalletData,
  NB as defaultChainConfig,
  RB as defaultConsensusKey,
  Zy as deferPromise,
  pC as dispatchFuelConnectorEvent,
  pg as encrypt,
  wg as encryptJsonWalletData,
  xs as english,
  uy as extractBurnedAssetsFromReceipts,
  Ay as extractMintedAssetsFromReceipts,
  OB as format,
  MB as formatUnits,
  ga as fromBech32,
  AC as fromDateToTai64,
  LI as fromTai64ToDate,
  oC as fromTai64ToUnix,
  FI as fromUnixToTai64,
  QI as gasUsedByInputs,
  ld as getAssetId,
  pa as getBytesFromBech32,
  iy as getContractCallOperations,
  ay as getContractCreatedOperations,
  ry as getContractTransferOperations,
  ly as getDecodedLogs,
  qy as getDocs,
  C0 as getGasUsedFromReceipts,
  es as getInputAccountAddress,
  HI as getInputContractFromIndex,
  ni as getInputFromAssetId,
  ka as getInputsByType,
  OI as getInputsByTypes,
  TI as getInputsCoin,
  UI as getInputsCoinAndMessage,
  GI as getInputsContract,
  PI as getInputsMessage,
  _a as getMaxGas,
  b0 as getMinGas,
  cy as getOperations,
  fs as getOutputsByType,
  ZI as getOutputsChange,
  F0 as getOutputsCoin,
  YI as getOutputsContract,
  JI as getOutputsContractCreated,
  uC as getOutputsVariable,
  oy as getPayProducerOperations,
  Py as getPredicateRoot,
  ap as getRandomB256,
  Fi as getReceiptsByType,
  KI as getReceiptsCall,
  zI as getReceiptsMessageOut,
  ny as getReceiptsTransferOut,
  yI as getReceiptsWithMissingData,
  dy as getTransactionStatusName,
  hC as getTransactionSummary,
  lC as getTransactionSummaryFromRequest,
  D0 as getTransactionTypeName,
  fC as getTransactionsSummaries,
  mA as getTransferOperations,
  sy as getWithdrawFromFuelOperations,
  dC as hasSameAssetId,
  Td as hash,
  Mm as hashMessage,
  FB as hexlify,
  mI as inputify,
  vo as isB256,
  Ls as isBech32,
  gA as isCoin,
  Fo as isEvmAddress,
  sC as isMessage,
  Pc as isPublicKey,
  nC as isRawCoin,
  rC as isRawMessage,
  La as isType,
  N0 as isTypeCreate,
  WI as isTypeMint,
  R0 as isTypeScript,
  Lu as keccak256,
  JB as keyFromPassword,
  af as max,
  TB as multiply,
  op as normalizeBech32,
  xI as normalizeJSON,
  DB as normalizeString,
  wI as outputify,
  Ap as padFirst12BytesOfEvmAddress,
  lr as processGqlReceipt,
  hy as processGraphqlStatus,
  kn as randomBytes,
  _n as resolveGasDependentCosts,
  pA as returnZeroScript,
  tB as revertErrorFactory,
  ku as scrypt,
  vI as sleep,
  $g as sortPolicies,
  Or as stringFromBuffer,
  Uc as toB256,
  ks as toBech32,
  zt as toBytes,
  of as toFixed,
  ca as toHex,
  Jt as toNumber,
  Ht as transactionRequestify,
  Om as uint64ToBytesBE,
  vs as withTimeout,
  _I as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
