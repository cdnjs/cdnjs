var ml = Object.defineProperty;
var wl = (e, t, n) => t in e ? ml(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var N = (e, t, n) => (wl(e, typeof t != "symbol" ? t + "" : t, n), n), eo = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var ve = (e, t, n) => (eo(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Ct = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, kt = (e, t, n, r) => (eo(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var er = (e, t, n) => (eo(e, t, "access private method"), n);
function VA() {
  return {
    FORC: "0.49.2",
    FUEL_CORE: "0.22.0",
    FUELS: "0.73.0"
  };
}
function ac(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function na(e, t) {
  const n = ac(e), r = ac(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function El(e, t) {
  const { major: n } = na(e, t);
  return n === 0;
}
function Il(e, t) {
  const { minor: n } = na(e, t);
  return n === 0;
}
function yl(e, t) {
  const { patch: n } = na(e, t);
  return n === 0;
}
function Bl(e) {
  const { FUEL_CORE: t } = VA();
  return {
    supportedVersion: t,
    isMajorSupported: El(e, t),
    isMinorSupported: Il(e, t),
    isPatchSupported: yl(e, t)
  };
}
var Cl = VA(), bl = Object.defineProperty, Ql = (e, t, n) => t in e ? bl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, vl = (e, t, n) => (Ql(e, typeof t != "symbol" ? t + "" : t, n), n), k = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.FRAGMENT_NOT_FOUND = "fragment-not-found", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.INVALID_URL = "invalid-url", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.INSUFFICIENT_BALANCE = "insufficient-balance", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.UNEXPECTED_HEX_VALUE = "unexpected-hex-value", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.LATEST_BLOCK_UNAVAILABLE = "latest-block-unavailable", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e))(k || {}), Ss = class extends Error {
  constructor(t, n) {
    super(n);
    N(this, "VERSIONS", Cl);
    N(this, "code");
    this.code = t, this.name = "FuelError";
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new Ss(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(k);
    if (!r.includes(n.code))
      throw new Ss(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new Ss(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, VERSIONS: s } = this;
    return { code: t, name: n, message: r, VERSIONS: s };
  }
}, D = Ss;
vl(D, "CODES", k);
var $B = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, jA = (e, t) => {
  const n = [];
  for (let a = 0; a < e.length; a += t) {
    const d = new Uint8Array(t);
    d.set(e.slice(a, a + t)), n.push(d);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, qA = (e) => {
  if (e instanceof Uint8Array)
    return new Uint8Array(e);
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const t = new Uint8Array((e.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < t.length; r++)
      t[r] = parseInt(e.substring(n, n + 2), 16), n += 2;
    return t;
  }
  throw new D(k.PARSE_FAILED, "invalid BytesLike value");
}, WA = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, le = (e) => {
  const t = e.map((n) => qA(n));
  return WA(t);
}, cc = "0123456789abcdef";
function KB(e) {
  const t = qA(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += cc[(s & 240) >> 4] + cc[s & 15];
  }
  return n;
}
var zB = (e) => {
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
    throw new D(k.PARSE_FAILED, r);
  }
  return n;
}, xl = {
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
}, eC = xl, tC = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const Fl = "6.7.1";
function Nl(e, t, n) {
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
function hi(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && Nl(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function sr(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(sr).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return sr(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${sr(n)}: ${sr(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Dl(e, t, n) {
  {
    const s = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${sr(n)}`);
      for (const i in n) {
        const o = n[i];
        s.push(i + "=" + sr(o));
      }
    }
    s.push(`code=${t}`), s.push(`version=${Fl}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return hi(r, { code: t }), n && Object.assign(r, n), r;
}
function Nr(e, t, n, r) {
  if (!e)
    throw Dl(t, n, r);
}
function Ce(e, t, n, r) {
  Nr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const Rl = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function Sl(e) {
  Nr(Rl.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function $A(e, t, n) {
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
  return $A(e, t, !1);
}
function Y(e, t) {
  return $A(e, t, !0);
}
function _l(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const Ac = "0123456789abcdef";
function V(e) {
  const t = Vt(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Ac[(s & 240) >> 4] + Ac[s & 15];
  }
  return n;
}
function Pt(e) {
  return "0x" + e.map((t) => V(t).substring(2)).join("");
}
function ra(e, t, n) {
  const r = Vt(e);
  return n != null && n > r.length && Nr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), V(r.slice(t ?? 0, n ?? r.length));
}
const kl = BigInt(0);
BigInt(1);
const ir = 9007199254740991;
function Jn(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -ir && e <= ir, "overflow", t || "value", e), BigInt(e);
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
function Ml(e, t) {
  const n = Jn(e, t);
  return Nr(n >= kl, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const uc = "0123456789abcdef";
function Ol(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += uc[n >> 4], t += uc[n & 15];
    return BigInt(t);
  }
  return Jn(e);
}
function KA(e, t) {
  switch (typeof e) {
    case "bigint":
      return Ce(e >= -ir && e <= ir, "overflow", t || "value", e), Number(e);
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -ir && e <= ir, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return KA(BigInt(e), t);
      } catch (n) {
        Ce(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  Ce(!1, "invalid numeric value", t || "value", e);
}
function Ll(e, t) {
  let r = Ml(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = KA(t, "width");
    for (Nr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const yo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let Is = null;
function Tl(e) {
  if (Is == null) {
    Is = {};
    for (let n = 0; n < yo.length; n++)
      Is[yo[n]] = BigInt(n);
  }
  const t = Is[e];
  return Ce(t != null, "invalid base58 value", "letter", e), t;
}
const Pl = BigInt(0), Bo = BigInt(58);
function zA(e) {
  let t = Ol(Vt(e)), n = "";
  for (; t; )
    n = yo[Number(t % Bo)] + n, t /= Bo;
  return n;
}
function Ul(e) {
  let t = Pl;
  for (let n = 0; n < e.length; n++)
    t *= Bo, t += Tl(e[n]);
  return t;
}
function Gl(e, t, n, r, s) {
  Ce(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function eu(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function Hl(e, t, n, r, s) {
  return e === "OVERLONG" ? (Ce(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), eu(e, t, n));
}
const Jl = Object.freeze({
  error: Gl,
  ignore: eu,
  replace: Hl
});
function Zl(e, t) {
  t == null && (t = Jl.error);
  const n = Vt(e, "bytes"), r = [];
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
    for (let l = 0; l < o; l++) {
      let m = n[s];
      if ((m & 192) != 128) {
        s += t("MISSING_CONTINUE", s, n, r), d = null;
        break;
      }
      d = d << 6 | m & 63, s++;
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
function tu(e, t) {
  t != null && (Sl(t), e = e.normalize(t));
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
function Yl(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function nu(e, t) {
  return Yl(Zl(e, t));
}
function Co(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Xl(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function ru(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Vl(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Co(e.outputLen), Co(e.blockLen);
}
function jl(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function ql(e, t) {
  ru(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Bt = {
  number: Co,
  bool: Xl,
  bytes: ru,
  hash: Vl,
  exists: jl,
  output: ql
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Wl = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), _s = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), tn = (e, t) => e << 32 - t | e >>> t, $l = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!$l)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Kl(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function qn(e) {
  if (typeof e == "string" && (e = Kl(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Zs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const zl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function eh(e, t) {
  if (t !== void 0 && (typeof t != "object" || !zl(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function Dr(e) {
  const t = (r) => e().update(qn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function th(e) {
  const t = (r, s) => e(s).update(qn(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
let su = class extends Zs {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Bt.hash(t);
    const r = qn(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Zs))
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
    return Bt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Bt.exists(this), Bt.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const sa = (e, t, n) => new su(e, t).update(n).digest();
sa.create = (e, t) => new su(e, t);
function nh(e, t, n, r) {
  Bt.hash(e);
  const s = eh({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: a } = s;
  if (Bt.number(i), Bt.number(o), Bt.number(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = qn(t), l = qn(n), m = new Uint8Array(o), g = sa.create(e, d), b = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: a, DK: m, PRF: g, PRFSalt: b };
}
function rh(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function sh(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: d } = nh(e, t, n, r);
  let l;
  const m = new Uint8Array(4), g = _s(m), b = new Uint8Array(a.outputLen);
  for (let Q = 1, v = 0; v < i; Q++, v += a.outputLen) {
    const C = o.subarray(v, v + a.outputLen);
    g.setInt32(0, Q, !1), (l = d._cloneInto(l)).update(m).digestInto(b), C.set(b.subarray(0, C.length));
    for (let F = 1; F < s; F++) {
      a._cloneInto(l).update(b).digestInto(b);
      for (let R = 0; R < C.length; R++)
        C[R] ^= b[R];
    }
  }
  return rh(a, d, o, l, b);
}
function ih(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, a, r);
}
let ia = class extends Zs {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = _s(this.buffer);
  }
  update(t) {
    Bt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = qn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const d = _s(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Bt.exists(this), Bt.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let d = o; d < s; d++)
      n[d] = 0;
    ih(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = _s(t);
    this.get().forEach((d, l) => a.setUint32(4 * l, d, i));
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
const oh = (e, t, n) => e & t ^ ~e & n, ah = (e, t, n) => e & t ^ e & n ^ t & n, ch = new Uint32Array([
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
let Ah = class extends ia {
  constructor() {
    super(64, 32, 8, !1), this.A = gn[0] | 0, this.B = gn[1] | 0, this.C = gn[2] | 0, this.D = gn[3] | 0, this.E = gn[4] | 0, this.F = gn[5] | 0, this.G = gn[6] | 0, this.H = gn[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      pn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const b = pn[g - 15], Q = pn[g - 2], v = tn(b, 7) ^ tn(b, 18) ^ b >>> 3, C = tn(Q, 17) ^ tn(Q, 19) ^ Q >>> 10;
      pn[g] = C + pn[g - 7] + v + pn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: d, G: l, H: m } = this;
    for (let g = 0; g < 64; g++) {
      const b = tn(a, 6) ^ tn(a, 11) ^ tn(a, 25), Q = m + b + oh(a, d, l) + ch[g] + pn[g] | 0, C = (tn(r, 2) ^ tn(r, 13) ^ tn(r, 22)) + ah(r, s, i) | 0;
      m = l, l = d, d = a, a = o + Q | 0, o = i, i = s, s = r, r = Q + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, m = m + this.H | 0, this.set(r, s, i, o, a, d, l, m);
  }
  roundClean() {
    pn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const oa = Dr(() => new Ah()), ys = BigInt(2 ** 32 - 1), bo = BigInt(32);
function iu(e, t = !1) {
  return t ? { h: Number(e & ys), l: Number(e >> bo & ys) } : { h: Number(e >> bo & ys) | 0, l: Number(e & ys) | 0 };
}
function uh(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = iu(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const dh = (e, t) => BigInt(e >>> 0) << bo | BigInt(t >>> 0), lh = (e, t, n) => e >>> n, hh = (e, t, n) => e << 32 - n | t >>> n, fh = (e, t, n) => e >>> n | t << 32 - n, gh = (e, t, n) => e << 32 - n | t >>> n, ph = (e, t, n) => e << 64 - n | t >>> n - 32, mh = (e, t, n) => e >>> n - 32 | t << 64 - n, wh = (e, t) => t, Eh = (e, t) => e, Ih = (e, t, n) => e << n | t >>> 32 - n, yh = (e, t, n) => t << n | e >>> 32 - n, Bh = (e, t, n) => t << n - 32 | e >>> 64 - n, Ch = (e, t, n) => e << n - 32 | t >>> 64 - n;
function bh(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Qh = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), vh = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, xh = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Fh = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Nh = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Dh = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Ae = {
  fromBig: iu,
  split: uh,
  toBig: dh,
  shrSH: lh,
  shrSL: hh,
  rotrSH: fh,
  rotrSL: gh,
  rotrBH: ph,
  rotrBL: mh,
  rotr32H: wh,
  rotr32L: Eh,
  rotlSH: Ih,
  rotlSL: yh,
  rotlBH: Bh,
  rotlBL: Ch,
  add: bh,
  add3L: Qh,
  add3H: vh,
  add4L: xh,
  add4H: Fh,
  add5H: Dh,
  add5L: Nh
}, [Rh, Sh] = Ae.split([
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
class aa extends ia {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: a, Dl: d, Eh: l, El: m, Fh: g, Fl: b, Gh: Q, Gl: v, Hh: C, Hl: F } = this;
    return [t, n, r, s, i, o, a, d, l, m, g, b, Q, v, C, F];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, a, d, l, m, g, b, Q, v, C, F) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = d | 0, this.Eh = l | 0, this.El = m | 0, this.Fh = g | 0, this.Fl = b | 0, this.Gh = Q | 0, this.Gl = v | 0, this.Hh = C | 0, this.Hl = F | 0;
  }
  process(t, n) {
    for (let T = 0; T < 16; T++, n += 4)
      mn[T] = t.getUint32(n), wn[T] = t.getUint32(n += 4);
    for (let T = 16; T < 80; T++) {
      const j = mn[T - 15] | 0, M = wn[T - 15] | 0, _ = Ae.rotrSH(j, M, 1) ^ Ae.rotrSH(j, M, 8) ^ Ae.shrSH(j, M, 7), O = Ae.rotrSL(j, M, 1) ^ Ae.rotrSL(j, M, 8) ^ Ae.shrSL(j, M, 7), P = mn[T - 2] | 0, W = wn[T - 2] | 0, U = Ae.rotrSH(P, W, 19) ^ Ae.rotrBH(P, W, 61) ^ Ae.shrSH(P, W, 6), J = Ae.rotrSL(P, W, 19) ^ Ae.rotrBL(P, W, 61) ^ Ae.shrSL(P, W, 6), ee = Ae.add4L(O, J, wn[T - 7], wn[T - 16]), B = Ae.add4H(ee, _, U, mn[T - 7], mn[T - 16]);
      mn[T] = B | 0, wn[T] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: a, Cl: d, Dh: l, Dl: m, Eh: g, El: b, Fh: Q, Fl: v, Gh: C, Gl: F, Hh: R, Hl: G } = this;
    for (let T = 0; T < 80; T++) {
      const j = Ae.rotrSH(g, b, 14) ^ Ae.rotrSH(g, b, 18) ^ Ae.rotrBH(g, b, 41), M = Ae.rotrSL(g, b, 14) ^ Ae.rotrSL(g, b, 18) ^ Ae.rotrBL(g, b, 41), _ = g & Q ^ ~g & C, O = b & v ^ ~b & F, P = Ae.add5L(G, M, O, Sh[T], wn[T]), W = Ae.add5H(P, R, j, _, Rh[T], mn[T]), U = P | 0, J = Ae.rotrSH(r, s, 28) ^ Ae.rotrBH(r, s, 34) ^ Ae.rotrBH(r, s, 39), ee = Ae.rotrSL(r, s, 28) ^ Ae.rotrBL(r, s, 34) ^ Ae.rotrBL(r, s, 39), B = r & i ^ r & a ^ i & a, c = s & o ^ s & d ^ o & d;
      R = C | 0, G = F | 0, C = Q | 0, F = v | 0, Q = g | 0, v = b | 0, { h: g, l: b } = Ae.add(l | 0, m | 0, W | 0, U | 0), l = a | 0, m = d | 0, a = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = Ae.add3L(U, ee, c);
      r = Ae.add3H(A, W, J, B), s = A | 0;
    }
    ({ h: r, l: s } = Ae.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = Ae.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: d } = Ae.add(this.Ch | 0, this.Cl | 0, a | 0, d | 0), { h: l, l: m } = Ae.add(this.Dh | 0, this.Dl | 0, l | 0, m | 0), { h: g, l: b } = Ae.add(this.Eh | 0, this.El | 0, g | 0, b | 0), { h: Q, l: v } = Ae.add(this.Fh | 0, this.Fl | 0, Q | 0, v | 0), { h: C, l: F } = Ae.add(this.Gh | 0, this.Gl | 0, C | 0, F | 0), { h: R, l: G } = Ae.add(this.Hh | 0, this.Hl | 0, R | 0, G | 0), this.set(r, s, i, o, a, d, l, m, g, b, Q, v, C, F, R, G);
  }
  roundClean() {
    mn.fill(0), wn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class _h extends aa {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class kh extends aa {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const ca = Dr(() => new aa());
Dr(() => new _h());
Dr(() => new kh());
function Mh() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const dc = Mh();
dc.crypto || dc.msCrypto;
function Oh(e) {
  switch (e) {
    case "sha256":
      return oa.create();
    case "sha512":
      return ca.create();
  }
  Ce(!1, "invalid hashing algorithm name", "algorithm", e);
}
function Lh(e, t) {
  const n = { sha256: oa, sha512: ca }[e];
  return Ce(n != null, "invalid hmac algorithm", "algorithm", e), sa.create(n, t);
}
function Th(e, t, n, r, s) {
  const i = { sha256: oa, sha512: ca }[s];
  return Ce(i != null, "invalid pbkdf2 algorithm", "algorithm", s), sh(i, e, t, { c: n, dkLen: r });
}
let ou = !1;
const au = function(e, t, n) {
  return Lh(e, t).update(n).digest();
};
let cu = au;
function Rr(e, t, n) {
  const r = Vt(t, "key"), s = Vt(n, "data");
  return V(cu(e, r, s));
}
Rr._ = au;
Rr.lock = function() {
  ou = !0;
};
Rr.register = function(e) {
  if (ou)
    throw new Error("computeHmac is locked");
  cu = e;
};
Object.freeze(Rr);
const [Au, uu, du] = [[], [], []], Ph = BigInt(0), Mr = BigInt(1), Uh = BigInt(2), Gh = BigInt(7), Hh = BigInt(256), Jh = BigInt(113);
for (let e = 0, t = Mr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Au.push(2 * (5 * r + n)), uu.push((e + 1) * (e + 2) / 2 % 64);
  let s = Ph;
  for (let i = 0; i < 7; i++)
    t = (t << Mr ^ (t >> Gh) * Jh) % Hh, t & Uh && (s ^= Mr << (Mr << BigInt(i)) - Mr);
  du.push(s);
}
const [Zh, Yh] = Ae.split(du, !0), lc = (e, t, n) => n > 32 ? Ae.rotlBH(e, t, n) : Ae.rotlSH(e, t, n), hc = (e, t, n) => n > 32 ? Ae.rotlBL(e, t, n) : Ae.rotlSL(e, t, n);
function Xh(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, d = (o + 2) % 10, l = n[d], m = n[d + 1], g = lc(l, m, 1) ^ n[a], b = hc(l, m, 1) ^ n[a + 1];
      for (let Q = 0; Q < 50; Q += 10)
        e[o + Q] ^= g, e[o + Q + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = uu[o], d = lc(s, i, a), l = hc(s, i, a), m = Au[o];
      s = e[m], i = e[m + 1], e[m] = d, e[m + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        n[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    e[0] ^= Zh[r], e[1] ^= Yh[r];
  }
  n.fill(0);
}
let lu = class hu extends Zs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Bt.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Wl(this.state);
  }
  keccak() {
    Xh(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Bt.exists(this);
    const { blockLen: n, state: r } = this;
    t = qn(t);
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
    Bt.exists(this, !1), Bt.bytes(t), this.finish();
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
    return Bt.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Bt.output(t, this), this.finished)
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
    return t || (t = new hu(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const Tn = (e, t, n) => Dr(() => new lu(t, e, n));
Tn(6, 144, 224 / 8);
Tn(6, 136, 256 / 8);
Tn(6, 104, 384 / 8);
Tn(6, 72, 512 / 8);
Tn(1, 144, 224 / 8);
const Vh = Tn(1, 136, 256 / 8);
Tn(1, 104, 384 / 8);
Tn(1, 72, 512 / 8);
const fu = (e, t, n) => th((r = {}) => new lu(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
fu(31, 168, 128 / 8);
fu(31, 136, 256 / 8);
let gu = !1;
const pu = function(e) {
  return Vh(e);
};
let mu = pu;
function os(e) {
  const t = Vt(e, "data");
  return V(mu(t));
}
os._ = pu;
os.lock = function() {
  gu = !0;
};
os.register = function(e) {
  if (gu)
    throw new TypeError("keccak256 is locked");
  mu = e;
};
Object.freeze(os);
const jh = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), wu = Uint8Array.from({ length: 16 }, (e, t) => t), qh = wu.map((e) => (9 * e + 5) % 16);
let Aa = [wu], ua = [qh];
for (let e = 0; e < 4; e++)
  for (let t of [Aa, ua])
    t.push(t[e].map((n) => jh[n]));
const Eu = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Wh = Aa.map((e, t) => e.map((n) => Eu[t][n])), $h = ua.map((e, t) => e.map((n) => Eu[t][n])), Kh = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), zh = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), Bs = (e, t) => e << t | e >>> 32 - t;
function fc(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const Cs = new Uint32Array(16);
class ef extends ia {
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
    for (let Q = 0; Q < 16; Q++, n += 4)
      Cs[Q] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, a = this.h2 | 0, d = a, l = this.h3 | 0, m = l, g = this.h4 | 0, b = g;
    for (let Q = 0; Q < 5; Q++) {
      const v = 4 - Q, C = Kh[Q], F = zh[Q], R = Aa[Q], G = ua[Q], T = Wh[Q], j = $h[Q];
      for (let M = 0; M < 16; M++) {
        const _ = Bs(r + fc(Q, i, a, l) + Cs[R[M]] + C, T[M]) + g | 0;
        r = g, g = l, l = Bs(a, 10) | 0, a = i, i = _;
      }
      for (let M = 0; M < 16; M++) {
        const _ = Bs(s + fc(v, o, d, m) + Cs[G[M]] + F, j[M]) + b | 0;
        s = b, b = m, m = Bs(d, 10) | 0, d = o, o = _;
      }
    }
    this.set(this.h1 + a + m | 0, this.h2 + l + b | 0, this.h3 + g + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    Cs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const tf = Dr(() => new ef());
let Iu = !1;
const yu = function(e) {
  return tf(e);
};
let Bu = yu;
function as(e) {
  const t = Vt(e, "data");
  return V(Bu(t));
}
as._ = yu;
as.lock = function() {
  Iu = !0;
};
as.register = function(e) {
  if (Iu)
    throw new TypeError("ripemd160 is locked");
  Bu = e;
};
Object.freeze(as);
let Cu = !1;
const bu = function(e, t, n, r, s) {
  return Th(e, t, n, r, s);
};
let Qu = bu;
function Sr(e, t, n, r, s) {
  const i = Vt(e, "password"), o = Vt(t, "salt");
  return V(Qu(i, o, n, r, s));
}
Sr._ = bu;
Sr.lock = function() {
  Cu = !0;
};
Sr.register = function(e) {
  if (Cu)
    throw new Error("pbkdf2 is locked");
  Qu = e;
};
Object.freeze(Sr);
const vu = function(e) {
  return Oh("sha256").update(e).digest();
};
let xu = vu, Fu = !1;
function Te(e) {
  const t = Vt(e, "data");
  return V(xu(t));
}
Te._ = vu;
Te.lock = function() {
  Fu = !0;
};
Te.register = function(e) {
  if (Fu)
    throw new Error("sha256 is locked");
  xu = e;
};
Object.freeze(Te);
Object.freeze(Te);
const nf = {}, rf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nf
}, Symbol.toStringTag, { value: "Module" })), sf = BigInt(0), of = BigInt(36);
function gc(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Vt(os(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const da = {};
for (let e = 0; e < 10; e++)
  da[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  da[String.fromCharCode(65 + e)] = String(10 + e);
const pc = 15;
function af(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => da[r]).join("");
  for (; t.length >= pc; ) {
    let r = t.substring(0, pc);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const cf = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function Af(e) {
  e = e.toLowerCase();
  let t = sf;
  for (let n = 0; n < e.length; n++)
    t = t * of + cf[e[n]];
  return t;
}
function uf(e) {
  if (Ce(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = gc(e);
    return Ce(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Ce(e.substring(2, 4) === af(e), "bad icap checksum", "address", e);
    let t = Af(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return gc("0x" + t);
  }
  Ce(!1, "invalid address", "address", e);
}
function to(e, t) {
  return {
    address: uf(e),
    storageKeys: t.map((n, r) => (Ce(_l(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function df(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Ce(n.length === 2, "invalid slot set", `value[${r}]`, n), to(n[0], n[1])) : (Ce(n != null && typeof n == "object", "invalid address-slot set", "value", e), to(n.address, n.storageKeys)));
  Ce(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return to(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const lf = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class cs {
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
    hi(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new cs(this.name);
  }
}
class fi extends cs {
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
    function i(o, a) {
      let d = (r || {})[o];
      d == null && (d = a), Ce(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), hi(this, s);
  }
  clone() {
    return new fi(this.effectiveBlock, this);
  }
}
class gi extends cs {
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
    hi(this, {
      address: n || lf,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new gi(this.address, this.targetNetwork);
  }
}
var ss, is;
class Nu extends cs {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    Ct(this, ss, void 0);
    Ct(this, is, void 0);
    kt(this, ss, n), kt(this, is, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return ve(this, ss);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return ve(this, is);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
ss = new WeakMap(), is = new WeakMap();
const no = /* @__PURE__ */ new Map();
var pr, mr, Nn;
const Ar = class {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    Ct(this, pr, void 0);
    Ct(this, mr, void 0);
    Ct(this, Nn, void 0);
    kt(this, pr, t), kt(this, mr, Jn(n)), kt(this, Nn, /* @__PURE__ */ new Map());
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
    return ve(this, pr);
  }
  set name(t) {
    kt(this, pr, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return ve(this, mr);
  }
  set chainId(t) {
    kt(this, mr, Jn(t, "chainId"));
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
    return Array.from(ve(this, Nn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (ve(this, Nn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return ve(this, Nn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return ve(this, Nn).get(t) || null;
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
    const t = new Ar(this.name, this.chainId);
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new fi();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = df(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (ff(), t == null)
      return Ar.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = no.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new Ar("unknown", t);
      Ce(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Ce(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new Ar(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new gi(t.ensAddress, t.ensNetwork)), n;
    }
    Ce(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, n) {
    typeof t == "number" && (t = BigInt(t));
    const r = no.get(t);
    r && Ce(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), no.set(t, n);
  }
};
let Yn = Ar;
pr = new WeakMap(), mr = new WeakMap(), Nn = new WeakMap();
function mc(e, t) {
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
function wc(e) {
  return new Nu(e, async (t, n, r) => {
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
        maxFeePerGas: mc(a.maxFee, 9),
        maxPriorityFeePerGas: mc(a.maxPriorityFee, 9)
      };
    } catch (i) {
      Nr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
function hf(e) {
  return new Nu("data:", async (t, n, r) => {
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
let Ec = !1;
function ff() {
  if (Ec)
    return;
  Ec = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Yn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new gi(null, r.ensNetwork)), i.attachPlugin(new fi()), (r.plugins || []).forEach((o) => {
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
      wc("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      wc("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: [
      hf(BigInt("1000000"))
    ]
  }), e("optimism-goerli", 420, {}), e("xdai", 100, { ensNetwork: 1 });
}
var se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function la(e) {
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
var ha = { exports: {} };
const pf = /* @__PURE__ */ la(rf);
ha.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = pf.Buffer;
    } catch {
    }
    i.isBN = function(c) {
      return c instanceof i ? !0 : c !== null && typeof c == "object" && c.constructor.wordSize === i.wordSize && Array.isArray(c.words);
    }, i.max = function(c, A) {
      return c.cmp(A) > 0 ? c : A;
    }, i.min = function(c, A) {
      return c.cmp(A) < 0 ? c : A;
    }, i.prototype._init = function(c, A, h) {
      if (typeof c == "number")
        return this._initNumber(c, A, h);
      if (typeof c == "object")
        return this._initArray(c, A, h);
      A === "hex" && (A = 16), r(A === (A | 0) && A >= 2 && A <= 36), c = c.toString().replace(/\s+/g, "");
      var w = 0;
      c[0] === "-" && (w++, this.negative = 1), w < c.length && (A === 16 ? this._parseHex(c, w, h) : (this._parseBase(c, A, w), h === "le" && this._initArray(this.toArray(), A, h)));
    }, i.prototype._initNumber = function(c, A, h) {
      c < 0 && (this.negative = 1, c = -c), c < 67108864 ? (this.words = [c & 67108863], this.length = 1) : c < 4503599627370496 ? (this.words = [
        c & 67108863,
        c / 67108864 & 67108863
      ], this.length = 2) : (r(c < 9007199254740992), this.words = [
        c & 67108863,
        c / 67108864 & 67108863,
        1
      ], this.length = 3), h === "le" && this._initArray(this.toArray(), A, h);
    }, i.prototype._initArray = function(c, A, h) {
      if (r(typeof c.length == "number"), c.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(c.length / 3), this.words = new Array(this.length);
      for (var w = 0; w < this.length; w++)
        this.words[w] = 0;
      var f, I, y = 0;
      if (h === "be")
        for (w = c.length - 1, f = 0; w >= 0; w -= 3)
          I = c[w] | c[w - 1] << 8 | c[w - 2] << 16, this.words[f] |= I << y & 67108863, this.words[f + 1] = I >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (h === "le")
        for (w = 0, f = 0; w < c.length; w += 3)
          I = c[w] | c[w + 1] << 8 | c[w + 2] << 16, this.words[f] |= I << y & 67108863, this.words[f + 1] = I >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
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
      var h = a(B, A);
      return A - 1 >= c && (h |= a(B, A - 1) << 4), h;
    }
    i.prototype._parseHex = function(c, A, h) {
      this.length = Math.ceil((c.length - A) / 6), this.words = new Array(this.length);
      for (var w = 0; w < this.length; w++)
        this.words[w] = 0;
      var f = 0, I = 0, y;
      if (h === "be")
        for (w = c.length - 1; w >= A; w -= 2)
          y = d(c, A, w) << f, this.words[I] |= y & 67108863, f >= 18 ? (f -= 18, I += 1, this.words[I] |= y >>> 26) : f += 8;
      else {
        var p = c.length - A;
        for (w = p % 2 === 0 ? A + 1 : A; w < c.length; w += 2)
          y = d(c, A, w) << f, this.words[I] |= y & 67108863, f >= 18 ? (f -= 18, I += 1, this.words[I] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function l(B, c, A, h) {
      for (var w = 0, f = 0, I = Math.min(B.length, A), y = c; y < I; y++) {
        var p = B.charCodeAt(y) - 48;
        w *= h, p >= 49 ? f = p - 49 + 10 : p >= 17 ? f = p - 17 + 10 : f = p, r(p >= 0 && f < h, "Invalid character"), w += f;
      }
      return w;
    }
    i.prototype._parseBase = function(c, A, h) {
      this.words = [0], this.length = 1;
      for (var w = 0, f = 1; f <= 67108863; f *= A)
        w++;
      w--, f = f / A | 0;
      for (var I = c.length - h, y = I % w, p = Math.min(I, I - y) + h, u = 0, E = h; E < p; E += w)
        u = l(c, E, E + w, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var Z = 1;
        for (u = l(c, E, c.length, A), E = 0; E < y; E++)
          Z *= A;
        this.imuln(Z), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(c) {
      c.words = new Array(this.length);
      for (var A = 0; A < this.length; A++)
        c.words[A] = this.words[A];
      c.length = this.length, c.negative = this.negative, c.red = this.red;
    };
    function m(B, c) {
      B.words = c.words, B.length = c.length, B.negative = c.negative, B.red = c.red;
    }
    if (i.prototype._move = function(c) {
      m(c, this);
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
    ], Q = [
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
    i.prototype.toString = function(c, A) {
      c = c || 10, A = A | 0 || 1;
      var h;
      if (c === 16 || c === "hex") {
        h = "";
        for (var w = 0, f = 0, I = 0; I < this.length; I++) {
          var y = this.words[I], p = ((y << w | f) & 16777215).toString(16);
          f = y >>> 24 - w & 16777215, w += 2, w >= 26 && (w -= 26, I--), f !== 0 || I !== this.length - 1 ? h = b[6 - p.length] + p + h : h = p + h;
        }
        for (f !== 0 && (h = f.toString(16) + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
      }
      if (c === (c | 0) && c >= 2 && c <= 36) {
        var u = Q[c], E = v[c];
        h = "";
        var Z = this.clone();
        for (Z.negative = 0; !Z.isZero(); ) {
          var X = Z.modrn(E).toString(c);
          Z = Z.idivn(E), Z.isZero() ? h = X + h : h = b[u - X.length] + X + h;
        }
        for (this.isZero() && (h = "0" + h); h.length % A !== 0; )
          h = "0" + h;
        return this.negative !== 0 && (h = "-" + h), h;
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
    var C = function(c, A) {
      return c.allocUnsafe ? c.allocUnsafe(A) : new c(A);
    };
    i.prototype.toArrayLike = function(c, A, h) {
      this._strip();
      var w = this.byteLength(), f = h || Math.max(1, w);
      r(w <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var I = C(c, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](I, w), I;
    }, i.prototype._toArrayLikeLE = function(c, A) {
      for (var h = 0, w = 0, f = 0, I = 0; f < this.length; f++) {
        var y = this.words[f] << I | w;
        c[h++] = y & 255, h < c.length && (c[h++] = y >> 8 & 255), h < c.length && (c[h++] = y >> 16 & 255), I === 6 ? (h < c.length && (c[h++] = y >> 24 & 255), w = 0, I = 0) : (w = y >>> 24, I += 2);
      }
      if (h < c.length)
        for (c[h++] = w; h < c.length; )
          c[h++] = 0;
    }, i.prototype._toArrayLikeBE = function(c, A) {
      for (var h = c.length - 1, w = 0, f = 0, I = 0; f < this.length; f++) {
        var y = this.words[f] << I | w;
        c[h--] = y & 255, h >= 0 && (c[h--] = y >> 8 & 255), h >= 0 && (c[h--] = y >> 16 & 255), I === 6 ? (h >= 0 && (c[h--] = y >> 24 & 255), w = 0, I = 0) : (w = y >>> 24, I += 2);
      }
      if (h >= 0)
        for (c[h--] = w; h >= 0; )
          c[h--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(c) {
      return 32 - Math.clz32(c);
    } : i.prototype._countBits = function(c) {
      var A = c, h = 0;
      return A >= 4096 && (h += 13, A >>>= 13), A >= 64 && (h += 7, A >>>= 7), A >= 8 && (h += 4, A >>>= 4), A >= 2 && (h += 2, A >>>= 2), h + A;
    }, i.prototype._zeroBits = function(c) {
      if (c === 0)
        return 26;
      var A = c, h = 0;
      return A & 8191 || (h += 13, A >>>= 13), A & 127 || (h += 7, A >>>= 7), A & 15 || (h += 4, A >>>= 4), A & 3 || (h += 2, A >>>= 2), A & 1 || h++, h;
    }, i.prototype.bitLength = function() {
      var c = this.words[this.length - 1], A = this._countBits(c);
      return (this.length - 1) * 26 + A;
    };
    function F(B) {
      for (var c = new Array(B.bitLength()), A = 0; A < c.length; A++) {
        var h = A / 26 | 0, w = A % 26;
        c[A] = B.words[h] >>> w & 1;
      }
      return c;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var c = 0, A = 0; A < this.length; A++) {
        var h = this._zeroBits(this.words[A]);
        if (c += h, h !== 26)
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
      for (var h = 0; h < A.length; h++)
        this.words[h] = this.words[h] & c.words[h];
      return this.length = A.length, this._strip();
    }, i.prototype.iand = function(c) {
      return r((this.negative | c.negative) === 0), this.iuand(c);
    }, i.prototype.and = function(c) {
      return this.length > c.length ? this.clone().iand(c) : c.clone().iand(this);
    }, i.prototype.uand = function(c) {
      return this.length > c.length ? this.clone().iuand(c) : c.clone().iuand(this);
    }, i.prototype.iuxor = function(c) {
      var A, h;
      this.length > c.length ? (A = this, h = c) : (A = c, h = this);
      for (var w = 0; w < h.length; w++)
        this.words[w] = A.words[w] ^ h.words[w];
      if (this !== A)
        for (; w < A.length; w++)
          this.words[w] = A.words[w];
      return this.length = A.length, this._strip();
    }, i.prototype.ixor = function(c) {
      return r((this.negative | c.negative) === 0), this.iuxor(c);
    }, i.prototype.xor = function(c) {
      return this.length > c.length ? this.clone().ixor(c) : c.clone().ixor(this);
    }, i.prototype.uxor = function(c) {
      return this.length > c.length ? this.clone().iuxor(c) : c.clone().iuxor(this);
    }, i.prototype.inotn = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = Math.ceil(c / 26) | 0, h = c % 26;
      this._expand(A), h > 0 && A--;
      for (var w = 0; w < A; w++)
        this.words[w] = ~this.words[w] & 67108863;
      return h > 0 && (this.words[w] = ~this.words[w] & 67108863 >> 26 - h), this._strip();
    }, i.prototype.notn = function(c) {
      return this.clone().inotn(c);
    }, i.prototype.setn = function(c, A) {
      r(typeof c == "number" && c >= 0);
      var h = c / 26 | 0, w = c % 26;
      return this._expand(h + 1), A ? this.words[h] = this.words[h] | 1 << w : this.words[h] = this.words[h] & ~(1 << w), this._strip();
    }, i.prototype.iadd = function(c) {
      var A;
      if (this.negative !== 0 && c.negative === 0)
        return this.negative = 0, A = this.isub(c), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && c.negative !== 0)
        return c.negative = 0, A = this.isub(c), c.negative = 1, A._normSign();
      var h, w;
      this.length > c.length ? (h = this, w = c) : (h = c, w = this);
      for (var f = 0, I = 0; I < w.length; I++)
        A = (h.words[I] | 0) + (w.words[I] | 0) + f, this.words[I] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && I < h.length; I++)
        A = (h.words[I] | 0) + f, this.words[I] = A & 67108863, f = A >>> 26;
      if (this.length = h.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (h !== this)
        for (; I < h.length; I++)
          this.words[I] = h.words[I];
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
      var h = this.cmp(c);
      if (h === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var w, f;
      h > 0 ? (w = this, f = c) : (w = c, f = this);
      for (var I = 0, y = 0; y < f.length; y++)
        A = (w.words[y] | 0) - (f.words[y] | 0) + I, I = A >> 26, this.words[y] = A & 67108863;
      for (; I !== 0 && y < w.length; y++)
        A = (w.words[y] | 0) + I, I = A >> 26, this.words[y] = A & 67108863;
      if (I === 0 && y < w.length && w !== this)
        for (; y < w.length; y++)
          this.words[y] = w.words[y];
      return this.length = Math.max(this.length, y), w !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(c) {
      return this.clone().isub(c);
    };
    function R(B, c, A) {
      A.negative = c.negative ^ B.negative;
      var h = B.length + c.length | 0;
      A.length = h, h = h - 1 | 0;
      var w = B.words[0] | 0, f = c.words[0] | 0, I = w * f, y = I & 67108863, p = I / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < h; u++) {
        for (var E = p >>> 26, Z = p & 67108863, X = Math.min(u, c.length - 1), K = Math.max(0, u - B.length + 1); K <= X; K++) {
          var q = u - K | 0;
          w = B.words[q] | 0, f = c.words[K] | 0, I = w * f + Z, E += I / 67108864 | 0, Z = I & 67108863;
        }
        A.words[u] = Z | 0, p = E | 0;
      }
      return p !== 0 ? A.words[u] = p | 0 : A.length--, A._strip();
    }
    var G = function(c, A, h) {
      var w = c.words, f = A.words, I = h.words, y = 0, p, u, E, Z = w[0] | 0, X = Z & 8191, K = Z >>> 13, q = w[1] | 0, ne = q & 8191, re = q >>> 13, Me = w[2] | 0, pe = Me & 8191, oe = Me >>> 13, Re = w[3] | 0, he = Re & 8191, me = Re >>> 13, en = w[4] | 0, Se = en & 8191, ye = en >>> 13, kr = w[5] | 0, Oe = kr & 8191, Ue = kr >>> 13, Es = w[6] | 0, Je = Es & 8191, Ze = Es >>> 13, ja = w[7] | 0, Ye = ja & 8191, Xe = ja >>> 13, qa = w[8] | 0, Ve = qa & 8191, je = qa >>> 13, Wa = w[9] | 0, qe = Wa & 8191, We = Wa >>> 13, $a = f[0] | 0, $e = $a & 8191, Ke = $a >>> 13, Ka = f[1] | 0, ze = Ka & 8191, et = Ka >>> 13, za = f[2] | 0, tt = za & 8191, nt = za >>> 13, ec = f[3] | 0, rt = ec & 8191, st = ec >>> 13, tc = f[4] | 0, it = tc & 8191, ot = tc >>> 13, nc = f[5] | 0, at = nc & 8191, ct = nc >>> 13, rc = f[6] | 0, At = rc & 8191, ut = rc >>> 13, sc = f[7] | 0, dt = sc & 8191, lt = sc >>> 13, ic = f[8] | 0, ht = ic & 8191, ft = ic >>> 13, oc = f[9] | 0, gt = oc & 8191, pt = oc >>> 13;
      h.negative = c.negative ^ A.negative, h.length = 19, p = Math.imul(X, $e), u = Math.imul(X, Ke), u = u + Math.imul(K, $e) | 0, E = Math.imul(K, Ke);
      var Mi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, p = Math.imul(ne, $e), u = Math.imul(ne, Ke), u = u + Math.imul(re, $e) | 0, E = Math.imul(re, Ke), p = p + Math.imul(X, ze) | 0, u = u + Math.imul(X, et) | 0, u = u + Math.imul(K, ze) | 0, E = E + Math.imul(K, et) | 0;
      var Oi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, p = Math.imul(pe, $e), u = Math.imul(pe, Ke), u = u + Math.imul(oe, $e) | 0, E = Math.imul(oe, Ke), p = p + Math.imul(ne, ze) | 0, u = u + Math.imul(ne, et) | 0, u = u + Math.imul(re, ze) | 0, E = E + Math.imul(re, et) | 0, p = p + Math.imul(X, tt) | 0, u = u + Math.imul(X, nt) | 0, u = u + Math.imul(K, tt) | 0, E = E + Math.imul(K, nt) | 0;
      var Li = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, p = Math.imul(he, $e), u = Math.imul(he, Ke), u = u + Math.imul(me, $e) | 0, E = Math.imul(me, Ke), p = p + Math.imul(pe, ze) | 0, u = u + Math.imul(pe, et) | 0, u = u + Math.imul(oe, ze) | 0, E = E + Math.imul(oe, et) | 0, p = p + Math.imul(ne, tt) | 0, u = u + Math.imul(ne, nt) | 0, u = u + Math.imul(re, tt) | 0, E = E + Math.imul(re, nt) | 0, p = p + Math.imul(X, rt) | 0, u = u + Math.imul(X, st) | 0, u = u + Math.imul(K, rt) | 0, E = E + Math.imul(K, st) | 0;
      var Ti = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, p = Math.imul(Se, $e), u = Math.imul(Se, Ke), u = u + Math.imul(ye, $e) | 0, E = Math.imul(ye, Ke), p = p + Math.imul(he, ze) | 0, u = u + Math.imul(he, et) | 0, u = u + Math.imul(me, ze) | 0, E = E + Math.imul(me, et) | 0, p = p + Math.imul(pe, tt) | 0, u = u + Math.imul(pe, nt) | 0, u = u + Math.imul(oe, tt) | 0, E = E + Math.imul(oe, nt) | 0, p = p + Math.imul(ne, rt) | 0, u = u + Math.imul(ne, st) | 0, u = u + Math.imul(re, rt) | 0, E = E + Math.imul(re, st) | 0, p = p + Math.imul(X, it) | 0, u = u + Math.imul(X, ot) | 0, u = u + Math.imul(K, it) | 0, E = E + Math.imul(K, ot) | 0;
      var Pi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, p = Math.imul(Oe, $e), u = Math.imul(Oe, Ke), u = u + Math.imul(Ue, $e) | 0, E = Math.imul(Ue, Ke), p = p + Math.imul(Se, ze) | 0, u = u + Math.imul(Se, et) | 0, u = u + Math.imul(ye, ze) | 0, E = E + Math.imul(ye, et) | 0, p = p + Math.imul(he, tt) | 0, u = u + Math.imul(he, nt) | 0, u = u + Math.imul(me, tt) | 0, E = E + Math.imul(me, nt) | 0, p = p + Math.imul(pe, rt) | 0, u = u + Math.imul(pe, st) | 0, u = u + Math.imul(oe, rt) | 0, E = E + Math.imul(oe, st) | 0, p = p + Math.imul(ne, it) | 0, u = u + Math.imul(ne, ot) | 0, u = u + Math.imul(re, it) | 0, E = E + Math.imul(re, ot) | 0, p = p + Math.imul(X, at) | 0, u = u + Math.imul(X, ct) | 0, u = u + Math.imul(K, at) | 0, E = E + Math.imul(K, ct) | 0;
      var Ui = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, p = Math.imul(Je, $e), u = Math.imul(Je, Ke), u = u + Math.imul(Ze, $e) | 0, E = Math.imul(Ze, Ke), p = p + Math.imul(Oe, ze) | 0, u = u + Math.imul(Oe, et) | 0, u = u + Math.imul(Ue, ze) | 0, E = E + Math.imul(Ue, et) | 0, p = p + Math.imul(Se, tt) | 0, u = u + Math.imul(Se, nt) | 0, u = u + Math.imul(ye, tt) | 0, E = E + Math.imul(ye, nt) | 0, p = p + Math.imul(he, rt) | 0, u = u + Math.imul(he, st) | 0, u = u + Math.imul(me, rt) | 0, E = E + Math.imul(me, st) | 0, p = p + Math.imul(pe, it) | 0, u = u + Math.imul(pe, ot) | 0, u = u + Math.imul(oe, it) | 0, E = E + Math.imul(oe, ot) | 0, p = p + Math.imul(ne, at) | 0, u = u + Math.imul(ne, ct) | 0, u = u + Math.imul(re, at) | 0, E = E + Math.imul(re, ct) | 0, p = p + Math.imul(X, At) | 0, u = u + Math.imul(X, ut) | 0, u = u + Math.imul(K, At) | 0, E = E + Math.imul(K, ut) | 0;
      var Gi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, p = Math.imul(Ye, $e), u = Math.imul(Ye, Ke), u = u + Math.imul(Xe, $e) | 0, E = Math.imul(Xe, Ke), p = p + Math.imul(Je, ze) | 0, u = u + Math.imul(Je, et) | 0, u = u + Math.imul(Ze, ze) | 0, E = E + Math.imul(Ze, et) | 0, p = p + Math.imul(Oe, tt) | 0, u = u + Math.imul(Oe, nt) | 0, u = u + Math.imul(Ue, tt) | 0, E = E + Math.imul(Ue, nt) | 0, p = p + Math.imul(Se, rt) | 0, u = u + Math.imul(Se, st) | 0, u = u + Math.imul(ye, rt) | 0, E = E + Math.imul(ye, st) | 0, p = p + Math.imul(he, it) | 0, u = u + Math.imul(he, ot) | 0, u = u + Math.imul(me, it) | 0, E = E + Math.imul(me, ot) | 0, p = p + Math.imul(pe, at) | 0, u = u + Math.imul(pe, ct) | 0, u = u + Math.imul(oe, at) | 0, E = E + Math.imul(oe, ct) | 0, p = p + Math.imul(ne, At) | 0, u = u + Math.imul(ne, ut) | 0, u = u + Math.imul(re, At) | 0, E = E + Math.imul(re, ut) | 0, p = p + Math.imul(X, dt) | 0, u = u + Math.imul(X, lt) | 0, u = u + Math.imul(K, dt) | 0, E = E + Math.imul(K, lt) | 0;
      var Hi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, p = Math.imul(Ve, $e), u = Math.imul(Ve, Ke), u = u + Math.imul(je, $e) | 0, E = Math.imul(je, Ke), p = p + Math.imul(Ye, ze) | 0, u = u + Math.imul(Ye, et) | 0, u = u + Math.imul(Xe, ze) | 0, E = E + Math.imul(Xe, et) | 0, p = p + Math.imul(Je, tt) | 0, u = u + Math.imul(Je, nt) | 0, u = u + Math.imul(Ze, tt) | 0, E = E + Math.imul(Ze, nt) | 0, p = p + Math.imul(Oe, rt) | 0, u = u + Math.imul(Oe, st) | 0, u = u + Math.imul(Ue, rt) | 0, E = E + Math.imul(Ue, st) | 0, p = p + Math.imul(Se, it) | 0, u = u + Math.imul(Se, ot) | 0, u = u + Math.imul(ye, it) | 0, E = E + Math.imul(ye, ot) | 0, p = p + Math.imul(he, at) | 0, u = u + Math.imul(he, ct) | 0, u = u + Math.imul(me, at) | 0, E = E + Math.imul(me, ct) | 0, p = p + Math.imul(pe, At) | 0, u = u + Math.imul(pe, ut) | 0, u = u + Math.imul(oe, At) | 0, E = E + Math.imul(oe, ut) | 0, p = p + Math.imul(ne, dt) | 0, u = u + Math.imul(ne, lt) | 0, u = u + Math.imul(re, dt) | 0, E = E + Math.imul(re, lt) | 0, p = p + Math.imul(X, ht) | 0, u = u + Math.imul(X, ft) | 0, u = u + Math.imul(K, ht) | 0, E = E + Math.imul(K, ft) | 0;
      var Ji = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, p = Math.imul(qe, $e), u = Math.imul(qe, Ke), u = u + Math.imul(We, $e) | 0, E = Math.imul(We, Ke), p = p + Math.imul(Ve, ze) | 0, u = u + Math.imul(Ve, et) | 0, u = u + Math.imul(je, ze) | 0, E = E + Math.imul(je, et) | 0, p = p + Math.imul(Ye, tt) | 0, u = u + Math.imul(Ye, nt) | 0, u = u + Math.imul(Xe, tt) | 0, E = E + Math.imul(Xe, nt) | 0, p = p + Math.imul(Je, rt) | 0, u = u + Math.imul(Je, st) | 0, u = u + Math.imul(Ze, rt) | 0, E = E + Math.imul(Ze, st) | 0, p = p + Math.imul(Oe, it) | 0, u = u + Math.imul(Oe, ot) | 0, u = u + Math.imul(Ue, it) | 0, E = E + Math.imul(Ue, ot) | 0, p = p + Math.imul(Se, at) | 0, u = u + Math.imul(Se, ct) | 0, u = u + Math.imul(ye, at) | 0, E = E + Math.imul(ye, ct) | 0, p = p + Math.imul(he, At) | 0, u = u + Math.imul(he, ut) | 0, u = u + Math.imul(me, At) | 0, E = E + Math.imul(me, ut) | 0, p = p + Math.imul(pe, dt) | 0, u = u + Math.imul(pe, lt) | 0, u = u + Math.imul(oe, dt) | 0, E = E + Math.imul(oe, lt) | 0, p = p + Math.imul(ne, ht) | 0, u = u + Math.imul(ne, ft) | 0, u = u + Math.imul(re, ht) | 0, E = E + Math.imul(re, ft) | 0, p = p + Math.imul(X, gt) | 0, u = u + Math.imul(X, pt) | 0, u = u + Math.imul(K, gt) | 0, E = E + Math.imul(K, pt) | 0;
      var Zi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, p = Math.imul(qe, ze), u = Math.imul(qe, et), u = u + Math.imul(We, ze) | 0, E = Math.imul(We, et), p = p + Math.imul(Ve, tt) | 0, u = u + Math.imul(Ve, nt) | 0, u = u + Math.imul(je, tt) | 0, E = E + Math.imul(je, nt) | 0, p = p + Math.imul(Ye, rt) | 0, u = u + Math.imul(Ye, st) | 0, u = u + Math.imul(Xe, rt) | 0, E = E + Math.imul(Xe, st) | 0, p = p + Math.imul(Je, it) | 0, u = u + Math.imul(Je, ot) | 0, u = u + Math.imul(Ze, it) | 0, E = E + Math.imul(Ze, ot) | 0, p = p + Math.imul(Oe, at) | 0, u = u + Math.imul(Oe, ct) | 0, u = u + Math.imul(Ue, at) | 0, E = E + Math.imul(Ue, ct) | 0, p = p + Math.imul(Se, At) | 0, u = u + Math.imul(Se, ut) | 0, u = u + Math.imul(ye, At) | 0, E = E + Math.imul(ye, ut) | 0, p = p + Math.imul(he, dt) | 0, u = u + Math.imul(he, lt) | 0, u = u + Math.imul(me, dt) | 0, E = E + Math.imul(me, lt) | 0, p = p + Math.imul(pe, ht) | 0, u = u + Math.imul(pe, ft) | 0, u = u + Math.imul(oe, ht) | 0, E = E + Math.imul(oe, ft) | 0, p = p + Math.imul(ne, gt) | 0, u = u + Math.imul(ne, pt) | 0, u = u + Math.imul(re, gt) | 0, E = E + Math.imul(re, pt) | 0;
      var Yi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, p = Math.imul(qe, tt), u = Math.imul(qe, nt), u = u + Math.imul(We, tt) | 0, E = Math.imul(We, nt), p = p + Math.imul(Ve, rt) | 0, u = u + Math.imul(Ve, st) | 0, u = u + Math.imul(je, rt) | 0, E = E + Math.imul(je, st) | 0, p = p + Math.imul(Ye, it) | 0, u = u + Math.imul(Ye, ot) | 0, u = u + Math.imul(Xe, it) | 0, E = E + Math.imul(Xe, ot) | 0, p = p + Math.imul(Je, at) | 0, u = u + Math.imul(Je, ct) | 0, u = u + Math.imul(Ze, at) | 0, E = E + Math.imul(Ze, ct) | 0, p = p + Math.imul(Oe, At) | 0, u = u + Math.imul(Oe, ut) | 0, u = u + Math.imul(Ue, At) | 0, E = E + Math.imul(Ue, ut) | 0, p = p + Math.imul(Se, dt) | 0, u = u + Math.imul(Se, lt) | 0, u = u + Math.imul(ye, dt) | 0, E = E + Math.imul(ye, lt) | 0, p = p + Math.imul(he, ht) | 0, u = u + Math.imul(he, ft) | 0, u = u + Math.imul(me, ht) | 0, E = E + Math.imul(me, ft) | 0, p = p + Math.imul(pe, gt) | 0, u = u + Math.imul(pe, pt) | 0, u = u + Math.imul(oe, gt) | 0, E = E + Math.imul(oe, pt) | 0;
      var Xi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, p = Math.imul(qe, rt), u = Math.imul(qe, st), u = u + Math.imul(We, rt) | 0, E = Math.imul(We, st), p = p + Math.imul(Ve, it) | 0, u = u + Math.imul(Ve, ot) | 0, u = u + Math.imul(je, it) | 0, E = E + Math.imul(je, ot) | 0, p = p + Math.imul(Ye, at) | 0, u = u + Math.imul(Ye, ct) | 0, u = u + Math.imul(Xe, at) | 0, E = E + Math.imul(Xe, ct) | 0, p = p + Math.imul(Je, At) | 0, u = u + Math.imul(Je, ut) | 0, u = u + Math.imul(Ze, At) | 0, E = E + Math.imul(Ze, ut) | 0, p = p + Math.imul(Oe, dt) | 0, u = u + Math.imul(Oe, lt) | 0, u = u + Math.imul(Ue, dt) | 0, E = E + Math.imul(Ue, lt) | 0, p = p + Math.imul(Se, ht) | 0, u = u + Math.imul(Se, ft) | 0, u = u + Math.imul(ye, ht) | 0, E = E + Math.imul(ye, ft) | 0, p = p + Math.imul(he, gt) | 0, u = u + Math.imul(he, pt) | 0, u = u + Math.imul(me, gt) | 0, E = E + Math.imul(me, pt) | 0;
      var Vi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, p = Math.imul(qe, it), u = Math.imul(qe, ot), u = u + Math.imul(We, it) | 0, E = Math.imul(We, ot), p = p + Math.imul(Ve, at) | 0, u = u + Math.imul(Ve, ct) | 0, u = u + Math.imul(je, at) | 0, E = E + Math.imul(je, ct) | 0, p = p + Math.imul(Ye, At) | 0, u = u + Math.imul(Ye, ut) | 0, u = u + Math.imul(Xe, At) | 0, E = E + Math.imul(Xe, ut) | 0, p = p + Math.imul(Je, dt) | 0, u = u + Math.imul(Je, lt) | 0, u = u + Math.imul(Ze, dt) | 0, E = E + Math.imul(Ze, lt) | 0, p = p + Math.imul(Oe, ht) | 0, u = u + Math.imul(Oe, ft) | 0, u = u + Math.imul(Ue, ht) | 0, E = E + Math.imul(Ue, ft) | 0, p = p + Math.imul(Se, gt) | 0, u = u + Math.imul(Se, pt) | 0, u = u + Math.imul(ye, gt) | 0, E = E + Math.imul(ye, pt) | 0;
      var ji = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (ji >>> 26) | 0, ji &= 67108863, p = Math.imul(qe, at), u = Math.imul(qe, ct), u = u + Math.imul(We, at) | 0, E = Math.imul(We, ct), p = p + Math.imul(Ve, At) | 0, u = u + Math.imul(Ve, ut) | 0, u = u + Math.imul(je, At) | 0, E = E + Math.imul(je, ut) | 0, p = p + Math.imul(Ye, dt) | 0, u = u + Math.imul(Ye, lt) | 0, u = u + Math.imul(Xe, dt) | 0, E = E + Math.imul(Xe, lt) | 0, p = p + Math.imul(Je, ht) | 0, u = u + Math.imul(Je, ft) | 0, u = u + Math.imul(Ze, ht) | 0, E = E + Math.imul(Ze, ft) | 0, p = p + Math.imul(Oe, gt) | 0, u = u + Math.imul(Oe, pt) | 0, u = u + Math.imul(Ue, gt) | 0, E = E + Math.imul(Ue, pt) | 0;
      var qi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (qi >>> 26) | 0, qi &= 67108863, p = Math.imul(qe, At), u = Math.imul(qe, ut), u = u + Math.imul(We, At) | 0, E = Math.imul(We, ut), p = p + Math.imul(Ve, dt) | 0, u = u + Math.imul(Ve, lt) | 0, u = u + Math.imul(je, dt) | 0, E = E + Math.imul(je, lt) | 0, p = p + Math.imul(Ye, ht) | 0, u = u + Math.imul(Ye, ft) | 0, u = u + Math.imul(Xe, ht) | 0, E = E + Math.imul(Xe, ft) | 0, p = p + Math.imul(Je, gt) | 0, u = u + Math.imul(Je, pt) | 0, u = u + Math.imul(Ze, gt) | 0, E = E + Math.imul(Ze, pt) | 0;
      var Wi = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, p = Math.imul(qe, dt), u = Math.imul(qe, lt), u = u + Math.imul(We, dt) | 0, E = Math.imul(We, lt), p = p + Math.imul(Ve, ht) | 0, u = u + Math.imul(Ve, ft) | 0, u = u + Math.imul(je, ht) | 0, E = E + Math.imul(je, ft) | 0, p = p + Math.imul(Ye, gt) | 0, u = u + Math.imul(Ye, pt) | 0, u = u + Math.imul(Xe, gt) | 0, E = E + Math.imul(Xe, pt) | 0;
      var $i = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + ($i >>> 26) | 0, $i &= 67108863, p = Math.imul(qe, ht), u = Math.imul(qe, ft), u = u + Math.imul(We, ht) | 0, E = Math.imul(We, ft), p = p + Math.imul(Ve, gt) | 0, u = u + Math.imul(Ve, pt) | 0, u = u + Math.imul(je, gt) | 0, E = E + Math.imul(je, pt) | 0;
      var Ki = (y + p | 0) + ((u & 8191) << 13) | 0;
      y = (E + (u >>> 13) | 0) + (Ki >>> 26) | 0, Ki &= 67108863, p = Math.imul(qe, gt), u = Math.imul(qe, pt), u = u + Math.imul(We, gt) | 0, E = Math.imul(We, pt);
      var zi = (y + p | 0) + ((u & 8191) << 13) | 0;
      return y = (E + (u >>> 13) | 0) + (zi >>> 26) | 0, zi &= 67108863, I[0] = Mi, I[1] = Oi, I[2] = Li, I[3] = Ti, I[4] = Pi, I[5] = Ui, I[6] = Gi, I[7] = Hi, I[8] = Ji, I[9] = Zi, I[10] = Yi, I[11] = Xi, I[12] = Vi, I[13] = ji, I[14] = qi, I[15] = Wi, I[16] = $i, I[17] = Ki, I[18] = zi, y !== 0 && (I[19] = y, h.length++), h;
    };
    Math.imul || (G = R);
    function T(B, c, A) {
      A.negative = c.negative ^ B.negative, A.length = B.length + c.length;
      for (var h = 0, w = 0, f = 0; f < A.length - 1; f++) {
        var I = w;
        w = 0;
        for (var y = h & 67108863, p = Math.min(f, c.length - 1), u = Math.max(0, f - B.length + 1); u <= p; u++) {
          var E = f - u, Z = B.words[E] | 0, X = c.words[u] | 0, K = Z * X, q = K & 67108863;
          I = I + (K / 67108864 | 0) | 0, q = q + y | 0, y = q & 67108863, I = I + (q >>> 26) | 0, w += I >>> 26, I &= 67108863;
        }
        A.words[f] = y, h = I, I = w;
      }
      return h !== 0 ? A.words[f] = h : A.length--, A._strip();
    }
    function j(B, c, A) {
      return T(B, c, A);
    }
    i.prototype.mulTo = function(c, A) {
      var h, w = this.length + c.length;
      return this.length === 10 && c.length === 10 ? h = G(this, c, A) : w < 63 ? h = R(this, c, A) : w < 1024 ? h = T(this, c, A) : h = j(this, c, A), h;
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
      for (var h = 0, w = 0; w < this.length; w++) {
        var f = (this.words[w] | 0) * c, I = (f & 67108863) + (h & 67108863);
        h >>= 26, h += f / 67108864 | 0, h += I >>> 26, this.words[w] = I & 67108863;
      }
      return h !== 0 && (this.words[w] = h, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(c) {
      return this.clone().imuln(c);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(c) {
      var A = F(c);
      if (A.length === 0)
        return new i(1);
      for (var h = this, w = 0; w < A.length && A[w] === 0; w++, h = h.sqr())
        ;
      if (++w < A.length)
        for (var f = h.sqr(); w < A.length; w++, f = f.sqr())
          A[w] !== 0 && (h = h.mul(f));
      return h;
    }, i.prototype.iushln = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = c % 26, h = (c - A) / 26, w = 67108863 >>> 26 - A << 26 - A, f;
      if (A !== 0) {
        var I = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & w, p = (this.words[f] | 0) - y << A;
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
    }, i.prototype.ishln = function(c) {
      return r(this.negative === 0), this.iushln(c);
    }, i.prototype.iushrn = function(c, A, h) {
      r(typeof c == "number" && c >= 0);
      var w;
      A ? w = (A - A % 26) / 26 : w = 0;
      var f = c % 26, I = Math.min((c - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, p = h;
      if (w -= I, w = Math.max(0, w), p) {
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
      var E = 0;
      for (u = this.length - 1; u >= 0 && (E !== 0 || u >= w); u--) {
        var Z = this.words[u] | 0;
        this.words[u] = E << 26 - f | Z >>> f, E = Z & y;
      }
      return p && E !== 0 && (p.words[p.length++] = E), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(c, A, h) {
      return r(this.negative === 0), this.iushrn(c, A, h);
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
      var A = c % 26, h = (c - A) / 26, w = 1 << A;
      if (this.length <= h)
        return !1;
      var f = this.words[h];
      return !!(f & w);
    }, i.prototype.imaskn = function(c) {
      r(typeof c == "number" && c >= 0);
      var A = c % 26, h = (c - A) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= h)
        return this;
      if (A !== 0 && h++, this.length = Math.min(h, this.length), A !== 0) {
        var w = 67108863 ^ 67108863 >>> A << A;
        this.words[this.length - 1] &= w;
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
    }, i.prototype._ishlnsubmul = function(c, A, h) {
      var w = c.length + h, f;
      this._expand(w);
      var I, y = 0;
      for (f = 0; f < c.length; f++) {
        I = (this.words[f + h] | 0) + y;
        var p = (c.words[f] | 0) * A;
        I -= p & 67108863, y = (I >> 26) - (p / 67108864 | 0), this.words[f + h] = I & 67108863;
      }
      for (; f < this.length - h; f++)
        I = (this.words[f + h] | 0) + y, y = I >> 26, this.words[f + h] = I & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        I = -(this.words[f] | 0) + y, y = I >> 26, this.words[f] = I & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(c, A) {
      var h = this.length - c.length, w = this.clone(), f = c, I = f.words[f.length - 1] | 0, y = this._countBits(I);
      h = 26 - y, h !== 0 && (f = f.ushln(h), w.iushln(h), I = f.words[f.length - 1] | 0);
      var p = w.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = p + 1, u.words = new Array(u.length);
        for (var E = 0; E < u.length; E++)
          u.words[E] = 0;
      }
      var Z = w.clone()._ishlnsubmul(f, 1, p);
      Z.negative === 0 && (w = Z, u && (u.words[p] = 1));
      for (var X = p - 1; X >= 0; X--) {
        var K = (w.words[f.length + X] | 0) * 67108864 + (w.words[f.length + X - 1] | 0);
        for (K = Math.min(K / I | 0, 67108863), w._ishlnsubmul(f, K, X); w.negative !== 0; )
          K--, w.negative = 0, w._ishlnsubmul(f, 1, X), w.isZero() || (w.negative ^= 1);
        u && (u.words[X] = K);
      }
      return u && u._strip(), w._strip(), A !== "div" && h !== 0 && w.iushrn(h), {
        div: u || null,
        mod: w
      };
    }, i.prototype.divmod = function(c, A, h) {
      if (r(!c.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var w, f, I;
      return this.negative !== 0 && c.negative === 0 ? (I = this.neg().divmod(c, A), A !== "mod" && (w = I.div.neg()), A !== "div" && (f = I.mod.neg(), h && f.negative !== 0 && f.iadd(c)), {
        div: w,
        mod: f
      }) : this.negative === 0 && c.negative !== 0 ? (I = this.divmod(c.neg(), A), A !== "mod" && (w = I.div.neg()), {
        div: w,
        mod: I.mod
      }) : this.negative & c.negative ? (I = this.neg().divmod(c.neg(), A), A !== "div" && (f = I.mod.neg(), h && f.negative !== 0 && f.isub(c)), {
        div: I.div,
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
      var h = A.div.negative !== 0 ? A.mod.isub(c) : A.mod, w = c.ushrn(1), f = c.andln(1), I = h.cmp(w);
      return I < 0 || f === 1 && I === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
    }, i.prototype.modrn = function(c) {
      var A = c < 0;
      A && (c = -c), r(c <= 67108863);
      for (var h = (1 << 26) % c, w = 0, f = this.length - 1; f >= 0; f--)
        w = (h * w + (this.words[f] | 0)) % c;
      return A ? -w : w;
    }, i.prototype.modn = function(c) {
      return this.modrn(c);
    }, i.prototype.idivn = function(c) {
      var A = c < 0;
      A && (c = -c), r(c <= 67108863);
      for (var h = 0, w = this.length - 1; w >= 0; w--) {
        var f = (this.words[w] | 0) + h * 67108864;
        this.words[w] = f / c | 0, h = f % c;
      }
      return this._strip(), A ? this.ineg() : this;
    }, i.prototype.divn = function(c) {
      return this.clone().idivn(c);
    }, i.prototype.egcd = function(c) {
      r(c.negative === 0), r(!c.isZero());
      var A = this, h = c.clone();
      A.negative !== 0 ? A = A.umod(c) : A = A.clone();
      for (var w = new i(1), f = new i(0), I = new i(0), y = new i(1), p = 0; A.isEven() && h.isEven(); )
        A.iushrn(1), h.iushrn(1), ++p;
      for (var u = h.clone(), E = A.clone(); !A.isZero(); ) {
        for (var Z = 0, X = 1; !(A.words[0] & X) && Z < 26; ++Z, X <<= 1)
          ;
        if (Z > 0)
          for (A.iushrn(Z); Z-- > 0; )
            (w.isOdd() || f.isOdd()) && (w.iadd(u), f.isub(E)), w.iushrn(1), f.iushrn(1);
        for (var K = 0, q = 1; !(h.words[0] & q) && K < 26; ++K, q <<= 1)
          ;
        if (K > 0)
          for (h.iushrn(K); K-- > 0; )
            (I.isOdd() || y.isOdd()) && (I.iadd(u), y.isub(E)), I.iushrn(1), y.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), w.isub(I), f.isub(y)) : (h.isub(A), I.isub(w), y.isub(f));
      }
      return {
        a: I,
        b: y,
        gcd: h.iushln(p)
      };
    }, i.prototype._invmp = function(c) {
      r(c.negative === 0), r(!c.isZero());
      var A = this, h = c.clone();
      A.negative !== 0 ? A = A.umod(c) : A = A.clone();
      for (var w = new i(1), f = new i(0), I = h.clone(); A.cmpn(1) > 0 && h.cmpn(1) > 0; ) {
        for (var y = 0, p = 1; !(A.words[0] & p) && y < 26; ++y, p <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            w.isOdd() && w.iadd(I), w.iushrn(1);
        for (var u = 0, E = 1; !(h.words[0] & E) && u < 26; ++u, E <<= 1)
          ;
        if (u > 0)
          for (h.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(I), f.iushrn(1);
        A.cmp(h) >= 0 ? (A.isub(h), w.isub(f)) : (h.isub(A), f.isub(w));
      }
      var Z;
      return A.cmpn(1) === 0 ? Z = w : Z = f, Z.cmpn(0) < 0 && Z.iadd(c), Z;
    }, i.prototype.gcd = function(c) {
      if (this.isZero())
        return c.abs();
      if (c.isZero())
        return this.abs();
      var A = this.clone(), h = c.clone();
      A.negative = 0, h.negative = 0;
      for (var w = 0; A.isEven() && h.isEven(); w++)
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
      return h.iushln(w);
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
      var A = c % 26, h = (c - A) / 26, w = 1 << A;
      if (this.length <= h)
        return this._expand(h + 1), this.words[h] |= w, this;
      for (var f = w, I = h; f !== 0 && I < this.length; I++) {
        var y = this.words[I] | 0;
        y += f, f = y >>> 26, y &= 67108863, this.words[I] = y;
      }
      return f !== 0 && (this.words[I] = f, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(c) {
      var A = c < 0;
      if (this.negative !== 0 && !A)
        return -1;
      if (this.negative === 0 && A)
        return 1;
      this._strip();
      var h;
      if (this.length > 1)
        h = 1;
      else {
        A && (c = -c), r(c <= 67108863, "Number is too big");
        var w = this.words[0] | 0;
        h = w === c ? 0 : w < c ? -1 : 1;
      }
      return this.negative !== 0 ? -h | 0 : h;
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
      for (var A = 0, h = this.length - 1; h >= 0; h--) {
        var w = this.words[h] | 0, f = c.words[h] | 0;
        if (w !== f) {
          w < f ? A = -1 : w > f && (A = 1);
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
      return new J(c);
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
    function _(B, c) {
      this.name = B, this.p = new i(c, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    _.prototype._tmp = function() {
      var c = new i(null);
      return c.words = new Array(Math.ceil(this.n / 13)), c;
    }, _.prototype.ireduce = function(c) {
      var A = c, h;
      do
        this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), h = A.bitLength();
      while (h > this.n);
      var w = h < this.n ? -1 : A.ucmp(this.p);
      return w === 0 ? (A.words[0] = 0, A.length = 1) : w > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
    }, _.prototype.split = function(c, A) {
      c.iushrn(this.n, 0, A);
    }, _.prototype.imulK = function(c) {
      return c.imul(this.k);
    };
    function O() {
      _.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(O, _), O.prototype.split = function(c, A) {
      for (var h = 4194303, w = Math.min(c.length, 9), f = 0; f < w; f++)
        A.words[f] = c.words[f];
      if (A.length = w, c.length <= 9) {
        c.words[0] = 0, c.length = 1;
        return;
      }
      var I = c.words[9];
      for (A.words[A.length++] = I & h, f = 10; f < c.length; f++) {
        var y = c.words[f] | 0;
        c.words[f - 10] = (y & h) << 4 | I >>> 22, I = y;
      }
      I >>>= 22, c.words[f - 10] = I, I === 0 && c.length > 10 ? c.length -= 10 : c.length -= 9;
    }, O.prototype.imulK = function(c) {
      c.words[c.length] = 0, c.words[c.length + 1] = 0, c.length += 2;
      for (var A = 0, h = 0; h < c.length; h++) {
        var w = c.words[h] | 0;
        A += w * 977, c.words[h] = A & 67108863, A = w * 64 + (A / 67108864 | 0);
      }
      return c.words[c.length - 1] === 0 && (c.length--, c.words[c.length - 1] === 0 && c.length--), c;
    };
    function P() {
      _.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(P, _);
    function W() {
      _.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(W, _);
    function U() {
      _.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(U, _), U.prototype.imulK = function(c) {
      for (var A = 0, h = 0; h < c.length; h++) {
        var w = (c.words[h] | 0) * 19 + A, f = w & 67108863;
        w >>>= 26, c.words[h] = f, A = w;
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
    function J(B) {
      if (typeof B == "string") {
        var c = i._prime(B);
        this.m = c.p, this.prime = c;
      } else
        r(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    J.prototype._verify1 = function(c) {
      r(c.negative === 0, "red works only with positives"), r(c.red, "red works only with red numbers");
    }, J.prototype._verify2 = function(c, A) {
      r((c.negative | A.negative) === 0, "red works only with positives"), r(
        c.red && c.red === A.red,
        "red works only with red numbers"
      );
    }, J.prototype.imod = function(c) {
      return this.prime ? this.prime.ireduce(c)._forceRed(this) : (m(c, c.umod(this.m)._forceRed(this)), c);
    }, J.prototype.neg = function(c) {
      return c.isZero() ? c.clone() : this.m.sub(c)._forceRed(this);
    }, J.prototype.add = function(c, A) {
      this._verify2(c, A);
      var h = c.add(A);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h._forceRed(this);
    }, J.prototype.iadd = function(c, A) {
      this._verify2(c, A);
      var h = c.iadd(A);
      return h.cmp(this.m) >= 0 && h.isub(this.m), h;
    }, J.prototype.sub = function(c, A) {
      this._verify2(c, A);
      var h = c.sub(A);
      return h.cmpn(0) < 0 && h.iadd(this.m), h._forceRed(this);
    }, J.prototype.isub = function(c, A) {
      this._verify2(c, A);
      var h = c.isub(A);
      return h.cmpn(0) < 0 && h.iadd(this.m), h;
    }, J.prototype.shl = function(c, A) {
      return this._verify1(c), this.imod(c.ushln(A));
    }, J.prototype.imul = function(c, A) {
      return this._verify2(c, A), this.imod(c.imul(A));
    }, J.prototype.mul = function(c, A) {
      return this._verify2(c, A), this.imod(c.mul(A));
    }, J.prototype.isqr = function(c) {
      return this.imul(c, c.clone());
    }, J.prototype.sqr = function(c) {
      return this.mul(c, c);
    }, J.prototype.sqrt = function(c) {
      if (c.isZero())
        return c.clone();
      var A = this.m.andln(3);
      if (r(A % 2 === 1), A === 3) {
        var h = this.m.add(new i(1)).iushrn(2);
        return this.pow(c, h);
      }
      for (var w = this.m.subn(1), f = 0; !w.isZero() && w.andln(1) === 0; )
        f++, w.iushrn(1);
      r(!w.isZero());
      var I = new i(1).toRed(this), y = I.redNeg(), p = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, p).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var E = this.pow(u, w), Z = this.pow(c, w.addn(1).iushrn(1)), X = this.pow(c, w), K = f; X.cmp(I) !== 0; ) {
        for (var q = X, ne = 0; q.cmp(I) !== 0; ne++)
          q = q.redSqr();
        r(ne < K);
        var re = this.pow(E, new i(1).iushln(K - ne - 1));
        Z = Z.redMul(re), E = re.redSqr(), X = X.redMul(E), K = ne;
      }
      return Z;
    }, J.prototype.invm = function(c) {
      var A = c._invmp(this.m);
      return A.negative !== 0 ? (A.negative = 0, this.imod(A).redNeg()) : this.imod(A);
    }, J.prototype.pow = function(c, A) {
      if (A.isZero())
        return new i(1).toRed(this);
      if (A.cmpn(1) === 0)
        return c.clone();
      var h = 4, w = new Array(1 << h);
      w[0] = new i(1).toRed(this), w[1] = c;
      for (var f = 2; f < w.length; f++)
        w[f] = this.mul(w[f - 1], c);
      var I = w[0], y = 0, p = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var E = A.words[f], Z = u - 1; Z >= 0; Z--) {
          var X = E >> Z & 1;
          if (I !== w[0] && (I = this.sqr(I)), X === 0 && y === 0) {
            p = 0;
            continue;
          }
          y <<= 1, y |= X, p++, !(p !== h && (f !== 0 || Z !== 0)) && (I = this.mul(I, w[y]), p = 0, y = 0);
        }
        u = 26;
      }
      return I;
    }, J.prototype.convertTo = function(c) {
      var A = c.umod(this.m);
      return A === c ? A.clone() : A;
    }, J.prototype.convertFrom = function(c) {
      var A = c.clone();
      return A.red = null, A;
    }, i.mont = function(c) {
      return new ee(c);
    };
    function ee(B) {
      J.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, J), ee.prototype.convertTo = function(c) {
      return this.imod(c.ushln(this.shift));
    }, ee.prototype.convertFrom = function(c) {
      var A = this.imod(c.mul(this.rinv));
      return A.red = null, A;
    }, ee.prototype.imul = function(c, A) {
      if (c.isZero() || A.isZero())
        return c.words[0] = 0, c.length = 1, c;
      var h = c.imul(A), w = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(w).iushrn(this.shift), I = f;
      return f.cmp(this.m) >= 0 ? I = f.isub(this.m) : f.cmpn(0) < 0 && (I = f.iadd(this.m)), I._forceRed(this);
    }, ee.prototype.mul = function(c, A) {
      if (c.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var h = c.mul(A), w = h.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = h.isub(w).iushrn(this.shift), I = f;
      return f.cmp(this.m) >= 0 ? I = f.isub(this.m) : f.cmpn(0) < 0 && (I = f.iadd(this.m)), I._forceRed(this);
    }, ee.prototype.invm = function(c) {
      var A = this.imod(c._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, se);
})(ha);
var mf = ha.exports;
const bs = /* @__PURE__ */ gf(mf);
var Du = 9, Ru = 3, Qo = 9;
function wf(e, t) {
  const { precision: n = Du, minPrecision: r = Ru } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, a = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const m = d.match(/.*[1-9]{1}/), g = (m == null ? void 0 : m[0].length) || 0, b = Math.max(r, g);
    d = d.slice(0, b);
  }
  const l = d ? `.${d}` : "";
  return `${a}${l}`;
}
var Ge = class extends bs {
  constructor(t, n, r) {
    var e = (...args) => {
      super(...args);
      N(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
    };
    if (Ge.isBN(t)) {
      e(t.toArray(), n, r);
      return;
    }
    if (typeof t == "string" && t.slice(0, 2) === "0x") {
      e(t.substring(2), n || "hex", r);
      return;
    }
    e(t ?? 0, n, r);
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
      throw new D(k.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new D(
        k.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new D(k.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      units: n = Qo,
      precision: r = Du,
      minPrecision: s = Ru
    } = t || {}, i = this.formatUnits(n), o = wf(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, a = "0"] = i.split("."), d = a.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [l = "0"] = o.split(".");
        return `${l}.${a.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = Qo) {
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
    const r = new bs(this.toArray()).mulTo(t, n);
    return new Ge(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new bs(this.toArray()).egcd(t);
    return {
      a: new Ge(n.toArray()),
      b: new Ge(r.toArray()),
      gcd: new Ge(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new bs(this.toArray()).divmod(new Ge(t), n, r);
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
}, x = (e, t, n) => new Ge(e, t, n);
x.parseUnits = (e, t = Qo) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new D(
      k.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const a = `${r.replaceAll(",", "")}${o.join("")}`;
  return x(a);
};
function cn(e) {
  return x(e).toNumber();
}
function fa(e, t) {
  return x(e).toHex(t);
}
function kn(e, t) {
  return x(e).toBytes(t);
}
function oC(e, t) {
  return x(e).formatUnits(t);
}
function aC(e, t) {
  return x(e).format(t);
}
function Ef(...e) {
  return e.reduce((t, n) => x(n).gt(t) ? x(n) : t, x(0));
}
function cC(...e) {
  return x(Math.ceil(e.reduce((t, n) => x(t).mul(n), x(1)).toNumber()));
}
function vo(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function If(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function Su(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function yf(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  vo(e.outputLen), vo(e.blockLen);
}
function Bf(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Cf(e, t) {
  Su(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const bf = {
  number: vo,
  bool: If,
  bytes: Su,
  hash: yf,
  exists: Bf,
  output: Cf
}, Fe = bf;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Qf = (e) => e instanceof Uint8Array, ks = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), Ms = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), nn = (e, t) => e << 32 - t | e >>> t, vf = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!vf)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function xf(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Wn(e) {
  if (typeof e == "string" && (e = xf(e)), !Qf(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let ga = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Ff = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function _u(e, t) {
  if (t !== void 0 && (typeof t != "object" || !Ff(t)))
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function pa(e) {
  const t = (r) => e().update(Wn(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function Nf(e) {
  const t = (r, s) => e(s).update(Wn(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
function Df(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, a, r);
}
let Rf = class extends ga {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ms(this.buffer);
  }
  update(t) {
    Fe.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Wn(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const d = Ms(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
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
    Df(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = Ms(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, m = this.get();
    if (l > m.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
      a.setUint32(4 * g, m[g], i);
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
const Sf = (e, t, n) => e & t ^ ~e & n, _f = (e, t, n) => e & t ^ e & n ^ t & n, kf = new Uint32Array([
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
let ku = class extends Rf {
  constructor() {
    super(64, 32, 8, !1), this.A = En[0] | 0, this.B = En[1] | 0, this.C = En[2] | 0, this.D = En[3] | 0, this.E = En[4] | 0, this.F = En[5] | 0, this.G = En[6] | 0, this.H = En[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      In[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const b = In[g - 15], Q = In[g - 2], v = nn(b, 7) ^ nn(b, 18) ^ b >>> 3, C = nn(Q, 17) ^ nn(Q, 19) ^ Q >>> 10;
      In[g] = C + In[g - 7] + v + In[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: d, G: l, H: m } = this;
    for (let g = 0; g < 64; g++) {
      const b = nn(a, 6) ^ nn(a, 11) ^ nn(a, 25), Q = m + b + Sf(a, d, l) + kf[g] + In[g] | 0, C = (nn(r, 2) ^ nn(r, 13) ^ nn(r, 22)) + _f(r, s, i) | 0;
      m = l, l = d, d = a, a = o + Q | 0, o = i, i = s, s = r, r = Q + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, m = m + this.H | 0, this.set(r, s, i, o, a, d, l, m);
  }
  roundClean() {
    In.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class Mf extends ku {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const Mu = pa(() => new ku());
pa(() => new Mf());
let Ou = class extends ga {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Fe.hash(t);
    const r = Wn(n);
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
    const { oHash: n, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: a } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const Lu = (e, t, n) => new Ou(e, t).update(n).digest();
Lu.create = (e, t) => new Ou(e, t);
function Of(e, t, n, r) {
  Fe.hash(e);
  const s = _u({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: a } = s;
  if (Fe.number(i), Fe.number(o), Fe.number(a), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = Wn(t), l = Wn(n), m = new Uint8Array(o), g = Lu.create(e, d), b = g._cloneInto().update(l);
  return { c: i, dkLen: o, asyncTick: a, DK: m, PRF: g, PRFSalt: b };
}
function Lf(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Tu(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: a, PRFSalt: d } = Of(e, t, n, r);
  let l;
  const m = new Uint8Array(4), g = Ms(m), b = new Uint8Array(a.outputLen);
  for (let Q = 1, v = 0; v < i; Q++, v += a.outputLen) {
    const C = o.subarray(v, v + a.outputLen);
    g.setInt32(0, Q, !1), (l = d._cloneInto(l)).update(m).digestInto(b), C.set(b.subarray(0, C.length));
    for (let F = 1; F < s; F++) {
      a._cloneInto(l).update(b).digestInto(b);
      for (let R = 0; R < C.length; R++)
        C[R] ^= b[R];
    }
  }
  return Lf(a, d, o, l, b);
}
const Ee = (e, t) => e << t | e >>> 32 - t;
function Ic(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], a = e[t++] ^ n[r++], d = e[t++] ^ n[r++], l = e[t++] ^ n[r++], m = e[t++] ^ n[r++], g = e[t++] ^ n[r++], b = e[t++] ^ n[r++], Q = e[t++] ^ n[r++], v = e[t++] ^ n[r++], C = e[t++] ^ n[r++], F = e[t++] ^ n[r++], R = e[t++] ^ n[r++], G = e[t++] ^ n[r++], T = e[t++] ^ n[r++], j = e[t++] ^ n[r++], M = e[t++] ^ n[r++], _ = o, O = a, P = d, W = l, U = m, J = g, ee = b, B = Q, c = v, A = C, h = F, w = R, f = G, I = T, y = j, p = M;
  for (let u = 0; u < 8; u += 2)
    U ^= Ee(_ + f | 0, 7), c ^= Ee(U + _ | 0, 9), f ^= Ee(c + U | 0, 13), _ ^= Ee(f + c | 0, 18), A ^= Ee(J + O | 0, 7), I ^= Ee(A + J | 0, 9), O ^= Ee(I + A | 0, 13), J ^= Ee(O + I | 0, 18), y ^= Ee(h + ee | 0, 7), P ^= Ee(y + h | 0, 9), ee ^= Ee(P + y | 0, 13), h ^= Ee(ee + P | 0, 18), W ^= Ee(p + w | 0, 7), B ^= Ee(W + p | 0, 9), w ^= Ee(B + W | 0, 13), p ^= Ee(w + B | 0, 18), O ^= Ee(_ + W | 0, 7), P ^= Ee(O + _ | 0, 9), W ^= Ee(P + O | 0, 13), _ ^= Ee(W + P | 0, 18), ee ^= Ee(J + U | 0, 7), B ^= Ee(ee + J | 0, 9), U ^= Ee(B + ee | 0, 13), J ^= Ee(U + B | 0, 18), w ^= Ee(h + A | 0, 7), c ^= Ee(w + h | 0, 9), A ^= Ee(c + w | 0, 13), h ^= Ee(A + c | 0, 18), f ^= Ee(p + y | 0, 7), I ^= Ee(f + p | 0, 9), y ^= Ee(I + f | 0, 13), p ^= Ee(y + I | 0, 18);
  s[i++] = o + _ | 0, s[i++] = a + O | 0, s[i++] = d + P | 0, s[i++] = l + W | 0, s[i++] = m + U | 0, s[i++] = g + J | 0, s[i++] = b + ee | 0, s[i++] = Q + B | 0, s[i++] = v + c | 0, s[i++] = C + A | 0, s[i++] = F + h | 0, s[i++] = R + w | 0, s[i++] = G + f | 0, s[i++] = T + I | 0, s[i++] = j + y | 0, s[i++] = M + p | 0;
}
function ro(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let a = 0; a < 16; a++)
    n[o + a] = e[t + (2 * s - 1) * 16 + a];
  for (let a = 0; a < s; a++, i += 16, t += 16)
    Ic(n, o, e, t, n, i), a > 0 && (o += 16), Ic(n, i, e, t += 16, n, o);
}
function Tf(e, t, n) {
  const r = _u({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: a, asyncTick: d, maxmem: l, onProgress: m } = r;
  if (Fe.number(s), Fe.number(i), Fe.number(o), Fe.number(a), Fe.number(d), Fe.number(l), m !== void 0 && typeof m != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, b = g / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (g / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (a < 0 || a > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const Q = g * (s + o);
  if (Q > l)
    throw new Error(`Scrypt: parameters too large, ${Q} (128 * r * (N + p)) > ${l} (maxmem)`);
  const v = Tu(Mu, e, t, { c: 1, dkLen: g * o }), C = ks(v), F = ks(new Uint8Array(g * s)), R = ks(new Uint8Array(g));
  let G = () => {
  };
  if (m) {
    const T = 2 * s * o, j = Math.max(Math.floor(T / 1e4), 1);
    let M = 0;
    G = () => {
      M++, m && (!(M % j) || M === T) && m(M / T);
    };
  }
  return { N: s, r: i, p: o, dkLen: a, blockSize32: b, V: F, B32: C, B: v, tmp: R, blockMixCb: G, asyncTick: d };
}
function Pf(e, t, n, r, s) {
  const i = Tu(Mu, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function Uf(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: a, V: d, B32: l, B: m, tmp: g, blockMixCb: b } = Tf(e, t, n);
  for (let Q = 0; Q < i; Q++) {
    const v = a * Q;
    for (let C = 0; C < a; C++)
      d[C] = l[v + C];
    for (let C = 0, F = 0; C < r - 1; C++)
      ro(d, F, d, F += a, s), b();
    ro(d, (r - 1) * a, l, v, s), b();
    for (let C = 0; C < r; C++) {
      const F = l[v + a - 16] % r;
      for (let R = 0; R < a; R++)
        g[R] = l[v + R] ^ d[F * a + R];
      ro(g, 0, l, v, s), b();
    }
  }
  return Pf(e, o, m, d, g);
}
Fe.bool;
const yc = Fe.bytes;
function Gf(e) {
  return (t) => (Fe.bytes(t), e(t));
}
(() => {
  const e = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0, t = typeof module < "u" && typeof module.require == "function" && module.require.bind(module);
  return {
    node: t && !e ? t("crypto") : void 0,
    web: e
  };
})();
function Hf(e, t, n, r, s, i, o) {
  return yc(e), yc(t), Uf(e, t, { N: n, r: s, p: r, dkLen: i, onProgress: o });
}
const Qs = BigInt(2 ** 32 - 1), xo = BigInt(32);
function Pu(e, t = !1) {
  return t ? { h: Number(e & Qs), l: Number(e >> xo & Qs) } : { h: Number(e >> xo & Qs) | 0, l: Number(e & Qs) | 0 };
}
function Jf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = Pu(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Zf = (e, t) => BigInt(e >>> 0) << xo | BigInt(t >>> 0), Yf = (e, t, n) => e >>> n, Xf = (e, t, n) => e << 32 - n | t >>> n, Vf = (e, t, n) => e >>> n | t << 32 - n, jf = (e, t, n) => e << 32 - n | t >>> n, qf = (e, t, n) => e << 64 - n | t >>> n - 32, Wf = (e, t, n) => e >>> n - 32 | t << 64 - n, $f = (e, t) => t, Kf = (e, t) => e, zf = (e, t, n) => e << n | t >>> 32 - n, eg = (e, t, n) => t << n | e >>> 32 - n, tg = (e, t, n) => t << n - 32 | e >>> 64 - n, ng = (e, t, n) => e << n - 32 | t >>> 64 - n;
function rg(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const sg = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), ig = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, og = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), ag = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, cg = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), Ag = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, Vr = {
  fromBig: Pu,
  split: Jf,
  toBig: Zf,
  shrSH: Yf,
  shrSL: Xf,
  rotrSH: Vf,
  rotrSL: jf,
  rotrBH: qf,
  rotrBL: Wf,
  rotr32H: $f,
  rotr32L: Kf,
  rotlSH: zf,
  rotlSL: eg,
  rotlBH: tg,
  rotlBL: ng,
  add: rg,
  add3L: sg,
  add3H: ig,
  add4L: og,
  add4H: ag,
  add5H: Ag,
  add5L: cg
}, [Uu, Gu, Hu] = [[], [], []], ug = BigInt(0), Or = BigInt(1), dg = BigInt(2), lg = BigInt(7), hg = BigInt(256), fg = BigInt(113);
for (let e = 0, t = Or, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Uu.push(2 * (5 * r + n)), Gu.push((e + 1) * (e + 2) / 2 % 64);
  let s = ug;
  for (let i = 0; i < 7; i++)
    t = (t << Or ^ (t >> lg) * fg) % hg, t & dg && (s ^= Or << (Or << BigInt(i)) - Or);
  Hu.push(s);
}
const [gg, pg] = Vr.split(Hu, !0), Bc = (e, t, n) => n > 32 ? Vr.rotlBH(e, t, n) : Vr.rotlSH(e, t, n), Cc = (e, t, n) => n > 32 ? Vr.rotlBL(e, t, n) : Vr.rotlSL(e, t, n);
function mg(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, d = (o + 2) % 10, l = n[d], m = n[d + 1], g = Bc(l, m, 1) ^ n[a], b = Cc(l, m, 1) ^ n[a + 1];
      for (let Q = 0; Q < 50; Q += 10)
        e[o + Q] ^= g, e[o + Q + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const a = Gu[o], d = Bc(s, i, a), l = Cc(s, i, a), m = Uu[o];
      s = e[m], i = e[m + 1], e[m] = d, e[m + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        n[a] = e[o + a];
      for (let a = 0; a < 10; a++)
        e[o + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    e[0] ^= gg[r], e[1] ^= pg[r];
  }
  n.fill(0);
}
class pi extends ga {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Fe.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ks(this.state);
  }
  keccak() {
    mg(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Fe.exists(this);
    const { blockLen: n, state: r } = this;
    t = Wn(t);
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
    return t || (t = new pi(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Pn = (e, t, n) => pa(() => new pi(t, e, n));
Pn(6, 144, 224 / 8);
Pn(6, 136, 256 / 8);
Pn(6, 104, 384 / 8);
Pn(6, 72, 512 / 8);
Pn(1, 144, 224 / 8);
const bc = Pn(1, 136, 256 / 8);
Pn(1, 104, 384 / 8);
Pn(1, 72, 512 / 8);
const Ju = (e, t, n) => Nf((r = {}) => new pi(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
Ju(31, 168, 128 / 8);
Ju(31, 136, 256 / 8);
const wg = (() => {
  const e = Gf(bc);
  return e.create = bc.create, e;
})();
var Eg = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return Hf(t, n, r, i, s, o);
}, Ig = (e) => wg(e), ur = (e, t = "base64") => {
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
}, { crypto: mi, btoa: Zu } = globalThis;
if (!mi)
  throw new D(
    k.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Zu)
  throw new D(
    k.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Fo = (e) => mi.getRandomValues(new Uint8Array(e)), Os = (e, t = "base64") => {
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
}, Yu = "AES-CTR", ma = (e, t) => {
  const n = ur(String(e).normalize("NFKC"), "utf-8"), r = Sr(n, t, 1e5, 32, "sha256");
  return Y(r);
}, yg = async (e, t) => {
  const n = Fo(16), r = Fo(32), s = ma(e, r), i = JSON.stringify(t), o = ur(i, "utf-8"), a = {
    name: Yu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, a, !1, ["encrypt"]), l = await crypto.subtle.encrypt(a, d, o);
  return {
    data: Os(l),
    iv: Os(n),
    salt: Os(r)
  };
}, Bg = async (e, t) => {
  const n = ur(t.iv), r = ur(t.salt), s = ma(e, r), i = ur(t.data), o = {
    name: Yu,
    counter: n,
    length: 64
  }, a = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, a, i), l = new TextDecoder().decode(d);
  try {
    return JSON.parse(l);
  } catch {
    throw new D(k.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Cg = async (e, t, n) => {
  const r = mi.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, a = await r.importKey(
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
}, bg = async (e, t, n) => {
  const r = mi.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, a = await r.importKey(
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
}, Qg = {
  bufferFromString: ur,
  stringFromBuffer: Os,
  decrypt: Bg,
  encrypt: yg,
  keyFromPassword: ma,
  randomBytes: Fo,
  scrypt: Eg,
  keccak256: Ig,
  decryptJsonWalletData: bg,
  encryptJsonWalletData: Cg
}, vg = Qg, {
  bufferFromString: Sn,
  decrypt: xg,
  encrypt: Fg,
  keyFromPassword: hC,
  randomBytes: Mn,
  stringFromBuffer: Pr,
  scrypt: Xu,
  keccak256: Vu,
  decryptJsonWalletData: Ng,
  encryptJsonWalletData: Dg
} = vg, Rg = Object.defineProperty, Sg = (e, t, n) => t in e ? Rg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ju = (e, t, n) => (Sg(e, typeof t != "symbol" ? t + "" : t, n), n), _g = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, qu = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Wu = (e, t, n) => (_g(e, t, "access private method"), n), ue = class {
  constructor(e, t, n) {
    N(this, "name");
    N(this, "type");
    N(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, $u = "enum Option", Ku = "struct Vec", zu = "struct Bytes", ed = "struct String", td = /str\[(?<length>[0-9]+)\]/, No = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, nd = /^struct (?<name>\w+)$/, rd = /^enum (?<name>\w+)$/, kg = /^\((?<items>.*)\)$/, Mg = /^generic (?<name>\w+)$/, ie = 8, As = 32, jr = As, Og = As, Lg = As, Tg = ie * 4, Pg = ie * 2, sd = 2 ** 32 - 1, wi = ({ maxInputs: e }) => As + // Tx ID
ie + // Tx size
// Asset ID/Balance coin input pairs
e * (jr + ie), wa = ie + // Identifier
ie + // Gas limit
ie + // Script size
ie + // Script data size
ie + // Policies
ie + // Inputs size
ie + // Outputs size
ie + // Witnesses size
As, Ug = ie + // Identifier
Tg + // Utxo Length
ie + // Output Index
Lg + // Owner
ie + // Amount
jr + // Asset id
Pg + // TxPointer
ie + // Witnesses index
ie + // Maturity
ie + // Predicate size
ie + // Predicate data size
ie, S = class extends ue {
  constructor() {
    super("u64", "u64", ie);
  }
  encode(e) {
    let t;
    try {
      t = kn(e, ie);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, `Invalid ${this.type} data size.`);
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new D(k.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [x(n), t + ie];
  }
}, Gg = 3, Qt = Gg * ie, Hg = 2, so = Hg * ie;
function Gt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const a = o.dynamicData;
    a && Object.entries(a).forEach(([l, m]) => {
      t[parseInt(l, 10) + n] = m;
    });
    const d = Y(o);
    return n += d.byteLength / ie, d;
  }), s = r.reduce((o, a) => o + a.length, 0), i = new Uint8Array(s);
  return r.reduce((o, a) => (i.set(a, o), o + a.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function id(e, t, n) {
  if (!e.dynamicData)
    return le([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const a = parseInt(i, 10) * ie, d = new S().encode(
      n + t + r
    );
    s.set(d, a);
    const l = o.dynamicData ? (
      // unpack child dynamic data
      id(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = le([s, l]), r += l.byteLength;
  }), s;
}
var Jg = (e, t = ie) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, Zg = (e) => {
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
}, Yg = (e) => e === Ku || e === zu || e === ed;
function Lt(e, t, n = () => {
  throw new D(k.ELEMENT_NOT_FOUND, "Element not found in the array.");
}) {
  const r = e.find(t);
  return r === void 0 && n(), r;
}
var qr = (e) => e % ie === 0, od = (e) => ie - e % ie, ad = (e) => {
  if (qr(e.length))
    return e;
  const t = new Uint8Array(ie - e.length % ie);
  return WA([e, t]);
}, bt = class extends ue {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    N(this, "coder");
    N(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new D(k.ENCODE_ERROR, "Types/values length mismatch.");
    return Gt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > sd)
      throw new D(k.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, H = class extends ue {
  constructor() {
    super("b256", "b256", ie * 4);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (x(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b256 byte data size.");
    return [fa(n, 32), t + 32];
  }
}, Xg = class extends ue {
  constructor() {
    super("b512", "struct B512", ie * 8);
  }
  encode(e) {
    let t;
    try {
      t = Y(e);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new D(k.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (x(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid b512 byte data size.");
    return [fa(n, this.encodedLength), t + this.encodedLength];
  }
}, Vg = class extends ue {
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
      throw new D(k.ENCODE_ERROR, "Invalid boolean value.");
    const r = kn(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new D(k.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = x(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(x(1)))
      throw new D(k.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, jg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), wr, Dn, ci, Ad, Ai, ud, GA, cd = (GA = class extends ue {
  constructor(t, n) {
    const r = new S(), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super("enum", `enum ${t}`, r.encodedLength + s);
    Ct(this, ci);
    Ct(this, Ai);
    N(this, "name");
    N(this, "coders");
    Ct(this, wr, void 0);
    Ct(this, Dn, void 0);
    this.name = t, this.coders = n, kt(this, wr, r), kt(this, Dn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return er(this, ci, Ad).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new D(k.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new D(k.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), a = new Uint8Array(ve(this, Dn) - s.encodedLength);
    return Gt([ve(this, wr).encode(i), a, o]);
  }
  decode(t, n) {
    if (t.length < ve(this, Dn))
      throw new D(k.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new S().decode(t, r);
    const i = cn(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new D(
        k.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const a = this.coders[o], d = ve(this, Dn) - a.encodedLength;
    return r += d, [s, r] = a.decode(t, r), jg(this.coders) ? er(this, Ai, ud).call(this, o, r) : [{ [o]: s }, r];
  }
}, wr = new WeakMap(), Dn = new WeakMap(), ci = new WeakSet(), Ad = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(ve(this, Dn) - n.encodedLength);
  return le([ve(this, wr).encode(s), i, r]);
}, Ai = new WeakSet(), ud = function(t, n) {
  return [t, n];
}, GA), z = class extends ue {
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
      n = kn(t);
    } catch {
      throw new D(k.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new D(k.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = kn(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [cn(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new D(k.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new D(k.DECODE_ERROR, "Invalid number byte data size.");
    return [cn(r), n + 8];
  }
}, Er, HA, qg = (HA = class extends ue {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    N(this, "length");
    Ct(this, Er, void 0);
    this.length = t, kt(this, Er, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new D(k.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = tu(t), r = new Uint8Array(ve(this, Er));
    return le([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new D(k.DECODE_ERROR, "Invalid string byte data size.");
    const s = nu(r), i = ve(this, Er);
    return [s, n + this.length + i];
  }
}, Er = new WeakMap(), HA), dd = class extends cd {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, Ei = class extends ue {
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
      if (!(s instanceof dd) && i == null)
        throw new D(
          k.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return qr(o.length) ? o : ad(o);
    });
    return Gt([Gt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const a = this.coders[o];
      let d;
      return [d, r] = a.decode(t, r), qr(r) || (r += od(r)), i[o] = d, i;
    }, {}), r];
  }
}, ld = class extends ue {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    N(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new D(k.ENCODE_ERROR, "Types/values length mismatch.");
    return Gt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return qr(s.length) ? s : ad(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), qr(r) || (r += od(r)), o;
    }), r];
  }
}, hd = class extends ue {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + Qt);
    N(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    const n = [], r = new S().encode(Qt);
    return r.dynamicData = {
      0: Gt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new S().encode(t.length)), n.push(new S().encode(t.length)), Gt(n);
  }
  decode(t, n) {
    if (t.length < Qt || t.length > sd)
      throw new D(k.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = x(new S().decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(Qt, Qt + i);
    if (o.length !== i)
      throw new D(k.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      Jg(o, this.coder.encodedLength).map(
        (a) => this.coder.decode(a, 0)[0]
      ),
      n + Qt
    ];
  }
}, Do, fd, Ys = class extends ue {
  constructor() {
    super("struct", "struct Bytes", Qt), qu(this, Do);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new S().encode(Qt), r = Wu(this, Do, fd).call(this, e);
    return n.dynamicData = {
      0: Gt([r])
    }, t.push(n), t.push(new S().encode(r.byteLength)), t.push(new S().encode(e.length)), Gt(t);
  }
  decode(e, t) {
    if (e.length < Qt)
      throw new D(k.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = x(new S().decode(n, 0)[0]).toNumber(), s = e.slice(Qt, Qt + r);
    if (s.length !== r)
      throw new D(k.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + Qt];
  }
};
Do = /* @__PURE__ */ new WeakSet();
fd = function(e) {
  const t = [Uint8Array.from(e)], n = (ie - e.length % ie) % ie;
  return n && t.push(new Uint8Array(n)), le(t);
};
ju(Ys, "memorySize", 1);
var Wg = class extends ue {
  constructor() {
    super("raw untyped slice", "raw untyped slice", so);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new D(k.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new S(), r = new S().encode(so);
    return r.dynamicData = {
      0: Gt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new S().encode(e.length * ie)), Gt(t);
  }
  decode(e, t) {
    if (e.length < so || e.length % ie !== 0)
      throw new D(k.DECODE_ERROR, "Invalid raw slice data size.");
    return new bt(new S(), e.length / ie).decode(e, t);
  }
}, Ro, gd, pd = class extends ue {
  constructor() {
    super("struct", "struct String", 1), qu(this, Ro);
  }
  encode(e) {
    const t = [], n = new S().encode(Qt), r = Wu(this, Ro, gd).call(this, e);
    return n.dynamicData = {
      0: Gt([r])
    }, t.push(n), t.push(new S().encode(r.byteLength)), t.push(new S().encode(e.length)), Gt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new D(k.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = x(new S().decode(n, 0)[0]).toNumber(), s = e.slice(Qt, Qt + r);
    if (s.length !== r)
      throw new D(k.DECODE_ERROR, "Invalid std string byte data size.");
    return [nu(s), t + Qt];
  }
};
Ro = /* @__PURE__ */ new WeakSet();
gd = function(e) {
  const t = [tu(e)], n = (ie - e.length % ie) % ie;
  return n && t.push(new Uint8Array(n)), le(t);
};
ju(pd, "memorySize", 1);
var xn = class {
  constructor(e, t) {
    N(this, "abi");
    N(this, "name");
    N(this, "type");
    N(this, "originalTypeArguments");
    N(this, "components");
    this.abi = e;
    const n = Lt(
      e.types,
      (r) => r.typeId === t.type,
      () => {
        throw new D(
          k.TYPE_NOT_FOUND,
          `Type does not exist in the provided abi: ${JSON.stringify({
            argument: t,
            abi: this.abi
          })}`
        );
      }
    );
    this.name = t.name, this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = xn.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? xn.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new xn(e, o));
    const s = r.reduce(
      (o, a, d) => {
        var m;
        const l = { ...o };
        return l[a] = structuredClone(
          (m = t.typeArguments) == null ? void 0 : m[d]
        ), l;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new xn(e, o));
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
      const s = Lt(e.types, (o) => o.typeId === r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = Lt(e.types, (o) => o.typeId === s.type);
      if (Mg.test(i.type)) {
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
    return nd.test(this.type) ? "s" : No.test(this.type) ? "a" : rd.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = td.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = No.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new xn(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
}, Ot = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new xn(e, t);
    return Ot.getCoderImpl(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r) {
    return this.getCoder(e, t).decode(n, r);
  }
  static getCoderImpl(e, t = {
    isSmallBytes: !1
  }) {
    var d, l, m, g, b, Q;
    switch (e.type) {
      case "u8":
      case "u16":
      case "u32":
        return new z(e.type, t);
      case "u64":
      case "raw untyped ptr":
        return new S();
      case "raw untyped slice":
        return new Wg();
      case "bool":
        return new Vg(t);
      case "b256":
        return new H();
      case "struct B512":
        return new Xg();
      case zu:
        return new Ys();
      case ed:
        return new pd();
    }
    const n = (d = td.exec(e.type)) == null ? void 0 : d.groups;
    if (n) {
      const v = parseInt(n.length, 10);
      return new qg(v);
    }
    const r = e.components, s = (l = No.exec(e.type)) == null ? void 0 : l.groups;
    if (s) {
      const v = parseInt(s.length, 10), C = r[0];
      if (!C)
        throw new D(
          k.INVALID_COMPONENT,
          "The provided Array type is missing an item of 'component'."
        );
      const F = Ot.getCoderImpl(C, { isSmallBytes: !0 });
      return new bt(F, v);
    }
    if (e.type === Ku) {
      const v = (m = Lt(r, (R) => R.name === "buf").originalTypeArguments) == null ? void 0 : m[0];
      if (!v)
        throw new D(
          k.INVALID_COMPONENT,
          "The provided Vec type is missing the 'type argument'."
        );
      const C = new xn(e.abi, v), F = Ot.getCoderImpl(C, { isSmallBytes: !0 });
      return new hd(F);
    }
    const i = (g = nd.exec(e.type)) == null ? void 0 : g.groups;
    if (i) {
      const v = Ot.getCoders(r, { isRightPadded: !0 });
      return new Ei(i.name, v);
    }
    const o = (b = rd.exec(e.type)) == null ? void 0 : b.groups;
    if (o) {
      const v = Ot.getCoders(r, {});
      return e.type === $u ? new dd(o.name, v) : new cd(o.name, v);
    }
    if ((Q = kg.exec(e.type)) == null ? void 0 : Q.groups) {
      const v = r.map(
        (C) => Ot.getCoderImpl(C, { isRightPadded: !0 })
      );
      return new ld(v);
    }
    throw e.type === "str" ? new D(
      k.INVALID_DATA,
      "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
    ) : new D(
      k.CODER_NOT_FOUND,
      `Coder not found: ${JSON.stringify(e)}.`
    );
  }
  static getCoders(e, t) {
    return e.reduce((n, r) => {
      const s = n;
      return s[r.name] = Ot.getCoderImpl(r, t), s;
    }, {});
  }
}, ui, md, di, wd, li, Ed, JA, Ls = (JA = class {
  constructor(e, t) {
    Ct(this, ui);
    Ct(this, di);
    Ct(this, li);
    N(this, "signature");
    N(this, "selector");
    N(this, "name");
    N(this, "jsonFn");
    N(this, "attributes");
    N(this, "isInputDataPointer");
    N(this, "outputMetadata");
    N(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Lt(this.jsonAbi.functions, (n) => n.name === t), this.name = t, this.signature = Ls.getSignature(this.jsonAbi, this.jsonFn), this.selector = Ls.getFunctionSelector(this.signature), this.isInputDataPointer = er(this, ui, md).call(this), this.outputMetadata = {
      isHeapType: er(this, di, wd).call(this),
      encodedLength: er(this, li, Ed).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new xn(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = Te(Sn(e, "utf-8"));
    return x(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    Ls.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = this.jsonFn.inputs.filter(
      (a) => Lt(this.jsonAbi.types, (d) => d.typeId === a.type).type !== "()"
    );
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (a) => Ot.getCoder(this.jsonAbi, a, {
        isRightPadded: r.length > 1
      })
    ), o = new ld(s).encode(n);
    return id(o, t, o.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => Lt(n.types, (a) => a.typeId === o.type)), s = r.filter(
      (o) => o.type === $u || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new D(k.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = Y(e), n = this.jsonFn.inputs.filter(
      (s) => Lt(this.jsonAbi.types, (i) => i.typeId === s.type).type !== "()"
    );
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new D(
        k.DECODE_ERROR,
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
        const o = Ot.getCoder(this.jsonAbi, i), [a, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, a],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    const t = Lt(
      this.jsonAbi.types,
      (s) => s.typeId === this.jsonFn.output.type
    );
    if (t.type === "()")
      return [void 0, 0];
    const n = Y(e), r = Ot.getCoder(this.jsonAbi, this.jsonFn.output);
    return t.type === "raw untyped slice" && (r.length = n.length / 8), r.decode(n, 0);
  }
}, ui = new WeakSet(), md = function() {
  var t;
  const e = this.jsonFn.inputs.map(
    (n) => this.jsonAbi.types.find((r) => r.typeId === n.type)
  );
  return this.jsonFn.inputs.length > 1 || Zg(((t = e[0]) == null ? void 0 : t.type) || "");
}, di = new WeakSet(), wd = function() {
  const e = Lt(this.jsonAbi.types, (t) => t.typeId === this.jsonFn.output.type);
  return Yg((e == null ? void 0 : e.type) || "");
}, li = new WeakSet(), Ed = function() {
  try {
    const e = Ot.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof hd ? e.coder.encodedLength : e instanceof Ys ? Ys.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, JA), On = class {
  constructor(e) {
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
    this.jsonAbi = e, this.externalLoggedTypes = {}, this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((t) => [t.name, new Ls(this.jsonAbi, t.name)])
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
    throw new D(
      k.FUNCTION_NOT_FOUND,
      `function ${e} not found: ${JSON.stringify(t)}.`
    );
  }
  decodeFunctionData(e, t) {
    const n = typeof e == "string" ? this.getFunction(e) : e;
    if (!n)
      throw new D(k.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return n.decodeArguments(t);
  }
  encodeFunctionData(e, t, n = 0) {
    const r = typeof e == "string" ? this.getFunction(e) : e;
    if (!r)
      throw new D(k.FRAGMENT_NOT_FOUND, "Fragment not found.");
    return r.encodeArguments(t, n);
  }
  // Decode the result of a function call
  decodeFunctionResult(e, t) {
    return (typeof e == "string" ? this.getFunction(e) : e).decodeOutput(t);
  }
  decodeLog(e, t, n) {
    if (this.externalLoggedTypes[n])
      return this.externalLoggedTypes[n].decodeLog(e, t, n);
    const { loggedType: s } = Lt(this.jsonAbi.loggedTypes, (i) => i.logId === t);
    return Ot.decode(this.jsonAbi, s, Y(e), 0);
  }
  updateExternalLoggedTypes(e, t) {
    this.externalLoggedTypes[e] = t;
  }
  encodeConfigurable(e, t) {
    const n = Lt(
      this.jsonAbi.configurables,
      (r) => r.name === e,
      () => {
        throw new D(
          k.CONFIGURABLE_NOT_FOUND,
          `A configurable with the '${e}' was not found in the ABI.`
        );
      }
    );
    return Ot.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0
    });
  }
  getTypeById(e) {
    return Lt(
      this.jsonAbi.types,
      (t) => t.typeId === e,
      () => {
        throw new D(
          k.TYPE_NOT_FOUND,
          `Type with typeId '${e}' doesn't exist in the ABI.`
        );
      }
    );
  }
}, fC = class {
}, $g = class {
}, Id = class {
}, yd = class {
}, Kg = class extends yd {
}, zg = class extends yd {
}, Rn, ZA, Ie = (ZA = class extends ue {
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
    Ct(this, Rn, void 0);
    this.length = t, kt(this, Rn, n);
  }
  encode(t) {
    const n = [], r = Y(t);
    return n.push(r), ve(this, Rn) && n.push(new Uint8Array(ve(this, Rn))), le(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [V(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return ve(this, Rn) && ([r, s] = [null, s + ve(this, Rn)]), [i, s];
  }
}, Rn = new WeakMap(), ZA), Ir = class extends Ei {
  constructor() {
    super("TxPointer", {
      blockHeight: new z("u32"),
      txIndex: new z("u16")
    });
  }
}, be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(be || {}), Qc = class extends ue {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new H().encode(e.owner)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), t.push(new Ir().encode(e.txPointer)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new z("u32").encode(e.maturity)), t.push(new S().encode(e.predicateGasUsed)), t.push(new z("u32").encode(e.predicateLength)), t.push(new z("u32").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new H().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    [n, r] = new H().decode(e, r);
    const d = n;
    [n, r] = new Ir().decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const m = Number(n);
    [n, r] = new z("u32").decode(e, r);
    const g = n;
    [n, r] = new S().decode(e, r);
    const b = n;
    [n, r] = new z("u32").decode(e, r);
    const Q = n;
    [n, r] = new z("u32").decode(e, r);
    const v = n;
    [n, r] = new Ie(Q).decode(e, r);
    const C = n;
    return [n, r] = new Ie(v).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: a,
        assetId: d,
        txPointer: l,
        witnessIndex: m,
        maturity: g,
        predicateGasUsed: b,
        predicateLength: Q,
        predicateDataLength: v,
        predicate: C,
        predicateData: n
      },
      r
    ];
  }
}, Xs = class extends ue {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.txID)), t.push(new z("u8").encode(e.outputIndex)), t.push(new H().encode(e.balanceRoot)), t.push(new H().encode(e.stateRoot)), t.push(new Ir().encode(e.txPointer)), t.push(new H().encode(e.contractID)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new z("u8").decode(e, r);
    const i = n;
    [n, r] = new H().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new Ir().decode(e, r);
    const d = n;
    return [n, r] = new H().decode(e, r), [
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
}, Wr = class extends ue {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new S().encode(e.amount)), t.push(Y(e.data || "0x")), Te(le(t));
  }
  static encodeData(e) {
    const t = Y(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = Wr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new S().encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new z("u8").encode(e.witnessIndex)), t.push(new S().encode(e.predicateGasUsed)), t.push(new z("u16").encode(n.length)), t.push(new z("u16").encode(e.predicateLength)), t.push(new z("u16").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength).encode(e.predicate)), t.push(new Ie(e.predicateDataLength).encode(e.predicateData)), le(t);
  }
  static decodeData(e) {
    const t = Y(e), n = t.length, [r] = new Ie(n).decode(t, 0);
    return Y(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new z("u8").decode(e, r);
    const d = Number(n);
    [n, r] = new S().decode(e, r);
    const l = n;
    [n, r] = new z("u16").decode(e, r);
    const m = n;
    [n, r] = new z("u16").decode(e, r);
    const g = n;
    [n, r] = new z("u16").decode(e, r);
    const b = n;
    [n, r] = new Ie(g).decode(e, r);
    const Q = n;
    [n, r] = new Ie(m).decode(e, r);
    const v = n;
    return [n, r] = new Ie(b).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: a,
        predicateGasUsed: l,
        dataLength: g,
        predicateLength: m,
        predicateDataLength: b,
        data: Q,
        predicate: v,
        predicateData: n
      },
      r
    ];
  }
}, Vs = class extends ue {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Qc().encode(e));
        break;
      }
      case 1: {
        t.push(new Xs().encode(e));
        break;
      }
      case 2: {
        t.push(new Wr().encode(e));
        break;
      }
      default:
        throw new D(
          k.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Qc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Xs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Wr().decode(e, r), [n, r];
      default:
        throw new D(
          k.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Be || {}), vc = class extends ue {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.to)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    return [n, r] = new H().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, js = class extends ue {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u8").encode(e.inputIndex)), t.push(new H().encode(e.balanceRoot)), t.push(new H().encode(e.stateRoot)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    return [n, r] = new H().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, xc = class extends ue {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.to)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    return [n, r] = new H().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Fc = class extends ue {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.to)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    return [n, r] = new H().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, Nc = class extends ue {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.contractId)), t.push(new H().encode(e.stateRoot)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    return [n, r] = new H().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, qs = class extends ue {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new vc().encode(e));
        break;
      }
      case 1: {
        t.push(new js().encode(e));
        break;
      }
      case 2: {
        t.push(new xc().encode(e));
        break;
      }
      case 3: {
        t.push(new Fc().encode(e));
        break;
      }
      case 4: {
        t.push(new Nc().encode(e));
        break;
      }
      default:
        throw new D(
          k.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new vc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new js().decode(e, r), [n, r];
      case 2:
        return [n, r] = new xc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Fc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new Nc().decode(e, r), [n, r];
      default:
        throw new D(
          k.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Wt = /* @__PURE__ */ ((e) => (e[e.GasPrice = 1] = "GasPrice", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Wt || {}), ep = (e) => e.sort((t, n) => t.type - n.type);
function tp(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new D(
        k.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var Ws = class extends ue {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    tp(e);
    const t = ep(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new S().encode(r));
          break;
        case 4:
          n.push(new z("u32").encode(r));
          break;
        default:
          throw new D(k.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), le(n);
  }
  decode(e, t, n) {
    let r = t;
    const s = [];
    if (n & 1) {
      const [i, o] = new S().decode(e, r);
      r = o, s.push({ type: 1, data: i });
    }
    if (n & 2) {
      const [i, o] = new S().decode(e, r);
      r = o, s.push({ type: 2, data: i });
    }
    if (n & 4) {
      const [i, o] = new z("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new S().decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, de = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(de || {}), Dc = class extends ue {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.from)), t.push(new H().encode(e.to)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), t.push(new S().encode(e.gas)), t.push(new S().encode(e.param1)), t.push(new S().encode(e.param2)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n;
    [n, r] = new S().decode(e, r);
    const l = n;
    [n, r] = new S().decode(e, r);
    const m = n;
    [n, r] = new S().decode(e, r);
    const g = n;
    return [n, r] = new S().decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: a,
        gas: d,
        param1: l,
        param2: m,
        pc: g,
        is: n
      },
      r
    ];
  }
}, Rc = class extends ue {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.id)), t.push(new S().encode(e.val)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    return [n, r] = new S().decode(e, r), [
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
}, Sc = class extends ue {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.id)), t.push(new S().encode(e.ptr)), t.push(new S().encode(e.len)), t.push(new H().encode(e.digest)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n;
    return [n, r] = new S().decode(e, r), [
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
}, _c = class extends ue {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.id)), t.push(new S().encode(e.reason)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), t.push(new H().encode(e.contractId)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    return [n, r] = new H().decode(e, r), [
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
}, kc = class extends ue {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.id)), t.push(new S().encode(e.val)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    return [n, r] = new S().decode(e, r), [
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
}, Mc = class extends ue {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.id)), t.push(new S().encode(e.val0)), t.push(new S().encode(e.val1)), t.push(new S().encode(e.val2)), t.push(new S().encode(e.val3)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n;
    [n, r] = new S().decode(e, r);
    const l = n;
    return [n, r] = new S().decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: a,
        val3: d,
        pc: l,
        is: n
      },
      r
    ];
  }
}, Oc = class extends ue {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.id)), t.push(new S().encode(e.val0)), t.push(new S().encode(e.val1)), t.push(new S().encode(e.ptr)), t.push(new S().encode(e.len)), t.push(new H().encode(e.digest)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new S().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n;
    [n, r] = new H().decode(e, r);
    const l = n;
    [n, r] = new S().decode(e, r);
    const m = n;
    return [n, r] = new S().decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: a,
        len: d,
        digest: l,
        pc: m,
        is: n
      },
      r
    ];
  }
}, Lc = class extends ue {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.from)), t.push(new H().encode(e.to)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n;
    return [n, r] = new S().decode(e, r), [
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
}, Tc = class extends ue {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.from)), t.push(new H().encode(e.to)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.assetId)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n;
    return [n, r] = new S().decode(e, r), [
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
}, Pc = class extends ue {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S().encode(e.result)), t.push(new S().encode(e.gasUsed)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new S().decode(e, r);
    const s = n;
    return [n, r] = new S().decode(e, r), [
      {
        type: 9,
        result: s,
        gasUsed: n
      },
      r
    ];
  }
}, $s = class extends ue {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new S().encode(e.amount)), t.push(Y(e.data || "0x")), Te(le(t));
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.sender)), t.push(new H().encode(e.recipient)), t.push(new S().encode(e.amount)), t.push(new H().encode(e.nonce)), t.push(new z("u16").encode(e.data.length)), t.push(new H().encode(e.digest)), t.push(new Ie(e.data.length).encode(e.data)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new H().decode(e, r);
    const a = n;
    [n, r] = new z("u16").decode(e, r);
    const d = n;
    [n, r] = new H().decode(e, r);
    const l = n;
    [n, r] = new Ie(d).decode(e, r);
    const m = Y(n), g = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: a,
      digest: l,
      data: m
    };
    return g.messageId = $s.getMessageId(g), [g, r];
  }
}, Bd = (e, t) => {
  const n = Y(e), r = Y(t);
  return Te(le([n, r]));
}, $r = class extends ue {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return Bd(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.subId)), t.push(new H().encode(e.contractId)), t.push(new S().encode(e.val)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n, l = $r.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: d,
      assetId: l
    }, r];
  }
}, So = class extends ue {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return Bd(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new H().encode(e.subId)), t.push(new H().encode(e.contractId)), t.push(new S().encode(e.val)), t.push(new S().encode(e.pc)), t.push(new S().encode(e.is)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new H().decode(e, r);
    const s = n;
    [n, r] = new H().decode(e, r);
    const i = n;
    [n, r] = new S().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    [n, r] = new S().decode(e, r);
    const d = n, l = $r.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: a,
      is: d,
      assetId: l
    }, r];
  }
}, gC = class extends ue {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new z("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Dc().encode(e));
        break;
      }
      case 1: {
        t.push(new Rc().encode(e));
        break;
      }
      case 2: {
        t.push(new Sc().encode(e));
        break;
      }
      case 3: {
        t.push(new _c().encode(e));
        break;
      }
      case 4: {
        t.push(new kc().encode(e));
        break;
      }
      case 5: {
        t.push(new Mc().encode(e));
        break;
      }
      case 6: {
        t.push(new Oc().encode(e));
        break;
      }
      case 7: {
        t.push(new Lc().encode(e));
        break;
      }
      case 8: {
        t.push(new Tc().encode(e));
        break;
      }
      case 9: {
        t.push(new Pc().encode(e));
        break;
      }
      case 10: {
        t.push(new $s().encode(e));
        break;
      }
      case 11: {
        t.push(new $r().encode(e));
        break;
      }
      case 12: {
        t.push(new So().encode(e));
        break;
      }
      default:
        throw new D(k.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Dc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Rc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Sc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new _c().decode(e, r), [n, r];
      case 4:
        return [n, r] = new kc().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Mc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Oc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new Lc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Tc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new Pc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new $s().decode(e, r), [n, r];
      case 11:
        return [n, r] = new $r().decode(e, r), [n, r];
      case 12:
        return [n, r] = new So().decode(e, r), [n, r];
      default:
        throw new D(k.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, Uc = class extends Ei {
  constructor() {
    super("StorageSlot", {
      key: new H(),
      value: new H()
    });
  }
}, Ks = class extends ue {
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
    return t.push(new z("u16").encode(e.dataLength)), t.push(new Ie(e.dataLength).encode(e.data)), le(t);
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
}, vt = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(vt || {}), Gc = class extends ue {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S().encode(e.scriptGasLimit)), t.push(new z("u16").encode(e.scriptLength)), t.push(new z("u16").encode(e.scriptDataLength)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new H().encode(e.receiptsRoot)), t.push(new Ie(e.scriptLength).encode(e.script)), t.push(new Ie(e.scriptDataLength).encode(e.scriptData)), t.push(new Ws().encode(e.policies)), t.push(new bt(new Vs(), e.inputsCount).encode(e.inputs)), t.push(new bt(new qs(), e.outputsCount).encode(e.outputs)), t.push(new bt(new Ks(), e.witnessesCount).encode(e.witnesses)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new S().decode(e, r);
    const s = n;
    [n, r] = new z("u16").decode(e, r);
    const i = n;
    [n, r] = new z("u16").decode(e, r);
    const o = n;
    [n, r] = new z("u32").decode(e, r);
    const a = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const m = n;
    [n, r] = new H().decode(e, r);
    const g = n;
    [n, r] = new Ie(i).decode(e, r);
    const b = n;
    [n, r] = new Ie(o).decode(e, r);
    const Q = n;
    [n, r] = new Ws().decode(e, r, a);
    const v = n;
    [n, r] = new bt(new Vs(), d).decode(e, r);
    const C = n;
    [n, r] = new bt(new qs(), l).decode(e, r);
    const F = n;
    return [n, r] = new bt(new Ks(), m).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: i,
        scriptDataLength: o,
        policyTypes: a,
        inputsCount: d,
        outputsCount: l,
        witnessesCount: m,
        receiptsRoot: g,
        script: b,
        scriptData: Q,
        policies: v,
        inputs: C,
        outputs: F,
        witnesses: n
      },
      r
    ];
  }
}, Hc = class extends ue {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new z("u16").encode(e.bytecodeLength)), t.push(new z("u8").encode(e.bytecodeWitnessIndex)), t.push(new z("u32").encode(e.policyTypes)), t.push(new z("u16").encode(e.storageSlotsCount)), t.push(new z("u8").encode(e.inputsCount)), t.push(new z("u8").encode(e.outputsCount)), t.push(new z("u8").encode(e.witnessesCount)), t.push(new H().encode(e.salt)), t.push(new Ws().encode(e.policies)), t.push(
      new bt(new Uc(), e.storageSlotsCount).encode(e.storageSlots)
    ), t.push(new bt(new Vs(), e.inputsCount).encode(e.inputs)), t.push(new bt(new qs(), e.outputsCount).encode(e.outputs)), t.push(new bt(new Ks(), e.witnessesCount).encode(e.witnesses)), le(t);
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
    const a = n;
    [n, r] = new z("u8").decode(e, r);
    const d = n;
    [n, r] = new z("u8").decode(e, r);
    const l = n;
    [n, r] = new z("u8").decode(e, r);
    const m = n;
    [n, r] = new H().decode(e, r);
    const g = n;
    [n, r] = new Ws().decode(e, r, o);
    const b = n;
    [n, r] = new bt(new Uc(), a).decode(e, r);
    const Q = n;
    [n, r] = new bt(new Vs(), d).decode(e, r);
    const v = n;
    [n, r] = new bt(new qs(), l).decode(e, r);
    const C = n;
    return [n, r] = new bt(new Ks(), m).decode(e, r), [
      {
        type: 1,
        bytecodeLength: s,
        bytecodeWitnessIndex: i,
        policyTypes: o,
        storageSlotsCount: a,
        inputsCount: d,
        outputsCount: l,
        witnessesCount: m,
        salt: g,
        policies: b,
        storageSlots: Q,
        inputs: v,
        outputs: C,
        witnesses: n
      },
      r
    ];
  }
}, Jc = class extends ue {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new Ir().encode(e.txPointer)), t.push(new Xs().encode(e.inputContract)), t.push(new js().encode(e.outputContract)), t.push(new S().encode(e.mintAmount)), t.push(new H().encode(e.mintAssetId)), le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new Ir().decode(e, r);
    const s = n;
    [n, r] = new Xs().decode(e, r);
    const i = n;
    [n, r] = new js().decode(e, r);
    const o = n;
    [n, r] = new S().decode(e, r);
    const a = n;
    return [n, r] = new H().decode(e, r), [
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
}, Ln = class extends ue {
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
          new Gc().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new Hc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new Jc().encode(e));
        break;
      }
      default:
        throw new D(
          k.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return le(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new z("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Gc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Hc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Jc().decode(e, r), [n, r];
      default:
        throw new D(
          k.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, pC = class extends Ei {
  constructor() {
    super("UtxoId", {
      transactionId: new H(),
      outputIndex: new z("u8")
    });
  }
}, mC = 16 * 1024, wC = 16, EC = 1024 * 1024 * 1024, IC = 1024 * 1024 * 1024, yC = 255, BC = 1024 * 1024, CC = 1024 * 1024, np = "0xffffffffffff0000", Cd = "0xffffffffffff0001", rp = "0xffffffffffff0002", sp = "0xffffffffffff0003", ip = "0xffffffffffff0004", op = "0x0";
function ap(e) {
  return Te(Sn(e, "utf-8"));
}
function cp(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function bd(e) {
  return Te(e);
}
var Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
var yr = Kr.bech32m = Kr.bech32 = void 0;
const zs = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Qd = {};
for (let e = 0; e < zs.length; e++) {
  const t = zs.charAt(e);
  Qd[t] = e;
}
function dr(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Zc(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = dr(t) ^ r >> 5;
  }
  t = dr(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = dr(t) ^ r & 31;
  }
  return t;
}
function Ea(e, t, n, r) {
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
function Ap(e) {
  return Ea(e, 8, 5, !0);
}
function up(e) {
  const t = Ea(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function dp(e) {
  const t = Ea(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function vd(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, a, d) {
    if (d = d || 90, o.length + 7 + a.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let l = Zc(o);
    if (typeof l == "string")
      throw new Error(l);
    let m = o + "1";
    for (let g = 0; g < a.length; ++g) {
      const b = a[g];
      if (b >> 5)
        throw new Error("Non 5-bit word");
      l = dr(l) ^ b, m += zs.charAt(b);
    }
    for (let g = 0; g < 6; ++g)
      l = dr(l);
    l ^= t;
    for (let g = 0; g < 6; ++g) {
      const b = l >> (5 - g) * 5 & 31;
      m += zs.charAt(b);
    }
    return m;
  }
  function r(o, a) {
    if (a = a || 90, o.length < 8)
      return o + " too short";
    if (o.length > a)
      return "Exceeds length limit";
    const d = o.toLowerCase(), l = o.toUpperCase();
    if (o !== d && o !== l)
      return "Mixed-case string " + o;
    o = d;
    const m = o.lastIndexOf("1");
    if (m === -1)
      return "No separator character for " + o;
    if (m === 0)
      return "Missing prefix for " + o;
    const g = o.slice(0, m), b = o.slice(m + 1);
    if (b.length < 6)
      return "Data too short";
    let Q = Zc(g);
    if (typeof Q == "string")
      return Q;
    const v = [];
    for (let C = 0; C < b.length; ++C) {
      const F = b.charAt(C), R = Qd[F];
      if (R === void 0)
        return "Unknown character " + F;
      Q = dr(Q) ^ R, !(C + 6 >= b.length) && v.push(R);
    }
    return Q !== t ? "Invalid checksum for " + o : { prefix: g, words: v };
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
    toWords: Ap,
    fromWordsUnsafe: up,
    fromWords: dp
  };
}
Kr.bech32 = vd("bech32");
yr = Kr.bech32m = vd("bech32m");
var ei = "fuel";
function Ia(e) {
  return yr.decode(e);
}
function Ts(e) {
  return yr.encode(
    ei,
    yr.toWords(Y(V(e)))
  );
}
function Ps(e) {
  return typeof e == "string" && e.indexOf(ei + 1) === 0 && Ia(e).prefix === ei;
}
function _o(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Yc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function ko(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function ya(e) {
  return new Uint8Array(yr.fromWords(Ia(e).words));
}
function Xc(e) {
  if (!Ps(e))
    throw new D(
      D.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return V(ya(e));
}
function lp(e) {
  const { words: t } = Ia(e);
  return yr.encode(ei, t);
}
var Ur = (e) => e instanceof Id ? e.address : e instanceof Kg ? e.id : e, hp = () => V(Mn(32)), fp = (e) => {
  let t;
  try {
    if (!_o(e))
      throw new D(
        D.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = ya(Ts(e)), t = V(t.fill(0, 0, 12));
  } catch {
    throw new D(
      D.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, gp = (e) => {
  if (!ko(e))
    throw new D(D.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ge = class extends $g {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    N(this, "bech32Address");
    if (this.bech32Address = lp(t), !Ps(this.bech32Address))
      throw new D(
        D.CODES.INVALID_BECH32_ADDRESS,
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
    return Xc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return ya(this.bech32Address);
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
    const t = Xc(this.bech32Address);
    return {
      value: fp(t)
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
    if (!Yc(t))
      throw new D(D.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = Te(V(Y(t)));
    return new ge(Ts(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!_o(t))
      throw new D(
        D.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ge(Ts(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(hp());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Ps(t) ? new ge(t) : this.fromB256(t);
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
      return ge.fromB256(t.toB256());
    if (Yc(t))
      return ge.fromPublicKey(t);
    if (Ps(t))
      return new ge(t);
    if (_o(t))
      return ge.fromB256(t);
    if (ko(t))
      return ge.fromEvmAddress(t);
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
  static fromEvmAddress(t) {
    if (!ko(t))
      throw new D(
        D.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = gp(t);
    return new ge(Ts(n));
  }
}, Le = "0x0000000000000000000000000000000000000000000000000000000000000000", yt = Le, bC = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", io = {}, Mo = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof se < "u" && se, r = function() {
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
      function l(A) {
        return A && DataView.prototype.isPrototypeOf(A);
      }
      if (d.arrayBuffer)
        var m = [
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
          return A && m.indexOf(Object.prototype.toString.call(A)) > -1;
        };
      function b(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function Q(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function v(A) {
        var h = {
          next: function() {
            var w = A.shift();
            return { done: w === void 0, value: w };
          }
        };
        return d.iterable && (h[Symbol.iterator] = function() {
          return h;
        }), h;
      }
      function C(A) {
        this.map = {}, A instanceof C ? A.forEach(function(h, w) {
          this.append(w, h);
        }, this) : Array.isArray(A) ? A.forEach(function(h) {
          this.append(h[0], h[1]);
        }, this) : A && Object.getOwnPropertyNames(A).forEach(function(h) {
          this.append(h, A[h]);
        }, this);
      }
      C.prototype.append = function(A, h) {
        A = b(A), h = Q(h);
        var w = this.map[A];
        this.map[A] = w ? w + ", " + h : h;
      }, C.prototype.delete = function(A) {
        delete this.map[b(A)];
      }, C.prototype.get = function(A) {
        return A = b(A), this.has(A) ? this.map[A] : null;
      }, C.prototype.has = function(A) {
        return this.map.hasOwnProperty(b(A));
      }, C.prototype.set = function(A, h) {
        this.map[b(A)] = Q(h);
      }, C.prototype.forEach = function(A, h) {
        for (var w in this.map)
          this.map.hasOwnProperty(w) && A.call(h, this.map[w], w, this);
      }, C.prototype.keys = function() {
        var A = [];
        return this.forEach(function(h, w) {
          A.push(w);
        }), v(A);
      }, C.prototype.values = function() {
        var A = [];
        return this.forEach(function(h) {
          A.push(h);
        }), v(A);
      }, C.prototype.entries = function() {
        var A = [];
        return this.forEach(function(h, w) {
          A.push([w, h]);
        }), v(A);
      }, d.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
      function F(A) {
        if (A.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        A.bodyUsed = !0;
      }
      function R(A) {
        return new Promise(function(h, w) {
          A.onload = function() {
            h(A.result);
          }, A.onerror = function() {
            w(A.error);
          };
        });
      }
      function G(A) {
        var h = new FileReader(), w = R(h);
        return h.readAsArrayBuffer(A), w;
      }
      function T(A) {
        var h = new FileReader(), w = R(h);
        return h.readAsText(A), w;
      }
      function j(A) {
        for (var h = new Uint8Array(A), w = new Array(h.length), f = 0; f < h.length; f++)
          w[f] = String.fromCharCode(h[f]);
        return w.join("");
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
            return this.blob().then(G);
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
      function W(A, h) {
        if (!(this instanceof W))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        h = h || {};
        var w = h.body;
        if (A instanceof W) {
          if (A.bodyUsed)
            throw new TypeError("Already read");
          this.url = A.url, this.credentials = A.credentials, h.headers || (this.headers = new C(A.headers)), this.method = A.method, this.mode = A.mode, this.signal = A.signal, !w && A._bodyInit != null && (w = A._bodyInit, A.bodyUsed = !0);
        } else
          this.url = String(A);
        if (this.credentials = h.credentials || this.credentials || "same-origin", (h.headers || !this.headers) && (this.headers = new C(h.headers)), this.method = P(h.method || this.method || "GET"), this.mode = h.mode || this.mode || null, this.signal = h.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && w)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(w), (this.method === "GET" || this.method === "HEAD") && (h.cache === "no-store" || h.cache === "no-cache")) {
          var f = /([?&])_=[^&]*/;
          if (f.test(this.url))
            this.url = this.url.replace(f, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var I = /\?/;
            this.url += (I.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      W.prototype.clone = function() {
        return new W(this, { body: this._bodyInit });
      };
      function U(A) {
        var h = new FormData();
        return A.trim().split("&").forEach(function(w) {
          if (w) {
            var f = w.split("="), I = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            h.append(decodeURIComponent(I), decodeURIComponent(y));
          }
        }), h;
      }
      function J(A) {
        var h = new C(), w = A.replace(/\r?\n[\t ]+/g, " ");
        return w.split("\r").map(function(f) {
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
      _.call(W.prototype);
      function ee(A, h) {
        if (!(this instanceof ee))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        h || (h = {}), this.type = "default", this.status = h.status === void 0 ? 200 : h.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = h.statusText === void 0 ? "" : "" + h.statusText, this.headers = new C(h.headers), this.url = h.url || "", this._initBody(A);
      }
      _.call(ee.prototype), ee.prototype.clone = function() {
        return new ee(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new C(this.headers),
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
      }, o.DOMException = a.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(h, w) {
          this.message = h, this.name = w;
          var f = Error(h);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function c(A, h) {
        return new Promise(function(w, f) {
          var I = new W(A, h);
          if (I.signal && I.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var y = new XMLHttpRequest();
          function p() {
            y.abort();
          }
          y.onload = function() {
            var E = {
              status: y.status,
              statusText: y.statusText,
              headers: J(y.getAllResponseHeaders() || "")
            };
            E.url = "responseURL" in y ? y.responseURL : E.headers.get("X-Request-URL");
            var Z = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              w(new ee(Z, E));
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
              return E === "" && a.location.href ? a.location.href : E;
            } catch {
              return E;
            }
          }
          y.open(I.method, u(I.url), !0), I.credentials === "include" ? y.withCredentials = !0 : I.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && I.headers.get("Content-Type") && I.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), h && typeof h.headers == "object" && !(h.headers instanceof C) ? Object.getOwnPropertyNames(h.headers).forEach(function(E) {
            y.setRequestHeader(E, Q(h.headers[E]));
          }) : I.headers.forEach(function(E, Z) {
            y.setRequestHeader(Z, E);
          }), I.signal && (I.signal.addEventListener("abort", p), y.onreadystatechange = function() {
            y.readyState === 4 && I.signal.removeEventListener("abort", p);
          }), y.send(typeof I._bodyInit > "u" ? null : I._bodyInit);
        });
      }
      return c.polyfill = !0, a.fetch || (a.fetch = c, a.Headers = C, a.Request = W, a.Response = ee), o.Headers = C, o.Request = W, o.Response = ee, o.fetch = c, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(Mo, Mo.exports);
var pp = Mo.exports;
function mp(e) {
  return typeof e == "object" && e !== null;
}
function wp(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const Ep = /\r\n|[\n\r]/g;
function Oo(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(Ep)) {
    if (typeof s.index == "number" || wp(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Ip(e) {
  return xd(
    e.source,
    Oo(e.source, e.start)
  );
}
function xd(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, a = t.line === 1 ? n : 0, d = t.column + a, l = `${e.name}:${o}:${d}
`, m = r.split(/\r\n|[\n\r]/g), g = m[s];
  if (g.length > 120) {
    const b = Math.floor(d / 80), Q = d % 80, v = [];
    for (let C = 0; C < g.length; C += 80)
      v.push(g.slice(C, C + 80));
    return l + Vc([
      [`${o} |`, v[0]],
      ...v.slice(1, b + 1).map((C) => ["|", C]),
      ["|", "^".padStart(Q)],
      ["|", v[b + 1]]
    ]);
  }
  return l + Vc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, m[s - 1]],
    [`${o} |`, g],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, m[s + 1]]
  ]);
}
function Vc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function yp(e) {
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
class Ba extends Error {
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
    const { nodes: o, source: a, positions: d, path: l, originalError: m, extensions: g } = yp(n);
    super(t), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = m ?? void 0, this.nodes = jc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const b = jc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((v) => v.loc).filter((v) => v != null)
    );
    this.source = a ?? (b == null || (s = b[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (b == null ? void 0 : b.map((v) => v.start)), this.locations = d && a ? d.map((v) => Oo(a, v)) : b == null ? void 0 : b.map((v) => Oo(v.source, v.start));
    const Q = mp(
      m == null ? void 0 : m.extensions
    ) ? m == null ? void 0 : m.extensions : void 0;
    this.extensions = (i = g ?? Q) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), m != null && m.stack ? Object.defineProperty(this, "stack", {
      value: m.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Ba) : Object.defineProperty(this, "stack", {
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

` + Ip(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + xd(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function jc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function wt(e, t, n) {
  return new Ba(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class Bp {
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
class Fd {
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
const Nd = {
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
}, Cp = new Set(Object.keys(Nd));
function qc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Cp.has(t);
}
var or;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(or || (or = {}));
var Lo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Lo || (Lo = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function To(e) {
  return e === 9 || e === 32;
}
function zr(e) {
  return e >= 48 && e <= 57;
}
function Dd(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Rd(e) {
  return Dd(e) || e === 95;
}
function bp(e) {
  return Dd(e) || zr(e) || e === 95;
}
function Qp(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const a = e[o], d = vp(a);
    d !== a.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, a) => a === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function vp(e) {
  let t = 0;
  for (; t < e.length && To(e.charCodeAt(t)); )
    ++t;
  return t;
}
function xp(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((Q) => Q.length === 0 || To(Q.charCodeAt(0))), o = n.endsWith('\\"""'), a = e.endsWith('"') && !o, d = e.endsWith("\\"), l = a || d, m = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || l || i || o);
  let g = "";
  const b = s && To(e.charCodeAt(0));
  return (m && !b || i) && (g += `
`), g += n, (m || l) && (g += `
`), '"""' + g + '"""';
}
var L;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(L || (L = {}));
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
    const n = new Fd(L.SOF, 0, 0, 0, 0);
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
          const n = Dp(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === L.COMMENT);
    return t;
  }
}
function Np(e) {
  return e === L.BANG || e === L.DOLLAR || e === L.AMP || e === L.PAREN_L || e === L.PAREN_R || e === L.SPREAD || e === L.COLON || e === L.EQUALS || e === L.AT || e === L.BRACKET_L || e === L.BRACKET_R || e === L.BRACE_L || e === L.PIPE || e === L.BRACE_R;
}
function _r(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ii(e, t) {
  return Sd(e.charCodeAt(t)) && _d(e.charCodeAt(t + 1));
}
function Sd(e) {
  return e >= 55296 && e <= 56319;
}
function _d(e) {
  return e >= 56320 && e <= 57343;
}
function $n(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return L.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function mt(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new Fd(t, n, r, i, o, s);
}
function Dp(e, t) {
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
        return Rp(e, s);
      case 33:
        return mt(e, L.BANG, s, s + 1);
      case 36:
        return mt(e, L.DOLLAR, s, s + 1);
      case 38:
        return mt(e, L.AMP, s, s + 1);
      case 40:
        return mt(e, L.PAREN_L, s, s + 1);
      case 41:
        return mt(e, L.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return mt(e, L.SPREAD, s, s + 3);
        break;
      case 58:
        return mt(e, L.COLON, s, s + 1);
      case 61:
        return mt(e, L.EQUALS, s, s + 1);
      case 64:
        return mt(e, L.AT, s, s + 1);
      case 91:
        return mt(e, L.BRACKET_L, s, s + 1);
      case 93:
        return mt(e, L.BRACKET_R, s, s + 1);
      case 123:
        return mt(e, L.BRACE_L, s, s + 1);
      case 124:
        return mt(e, L.PIPE, s, s + 1);
      case 125:
        return mt(e, L.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Lp(e, s) : _p(e, s);
    }
    if (zr(i) || i === 45)
      return Sp(e, s, i);
    if (Rd(i))
      return Tp(e, s);
    throw wt(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : _r(i) || Ii(n, s) ? `Unexpected character: ${$n(e, s)}.` : `Invalid character: ${$n(e, s)}.`
    );
  }
  return mt(e, L.EOF, r, r);
}
function Rp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (_r(i))
      ++s;
    else if (Ii(n, s))
      s += 2;
    else
      break;
  }
  return mt(
    e,
    L.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function Sp(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), zr(i))
      throw wt(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${$n(
          e,
          s
        )}.`
      );
  } else
    s = oo(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = oo(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = oo(e, s, i), i = r.charCodeAt(s)), i === 46 || Rd(i))
    throw wt(
      e.source,
      s,
      `Invalid number, expected digit but got: ${$n(
        e,
        s
      )}.`
    );
  return mt(
    e,
    o ? L.FLOAT : L.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function oo(e, t, n) {
  if (!zr(n))
    throw wt(
      e.source,
      t,
      `Invalid number, expected digit but got: ${$n(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; zr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function _p(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const a = n.charCodeAt(s);
    if (a === 34)
      return o += n.slice(i, s), mt(e, L.STRING, t, s + 1, o);
    if (a === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? kp(e, s) : Mp(e, s) : Op(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (_r(a))
      ++s;
    else if (Ii(n, s))
      s += 2;
    else
      throw wt(
        e.source,
        s,
        `Invalid character within String: ${$n(
          e,
          s
        )}.`
      );
  }
  throw wt(e.source, s, "Unterminated string.");
}
function kp(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !_r(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | Gr(i), r < 0)
      break;
  }
  throw wt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + s
    )}".`
  );
}
function Mp(e, t) {
  const n = e.source.body, r = Wc(n, t + 2);
  if (_r(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Sd(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Wc(n, t + 8);
    if (_d(s))
      return {
        value: String.fromCodePoint(r, s),
        size: 12
      };
  }
  throw wt(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function Wc(e, t) {
  return Gr(e.charCodeAt(t)) << 12 | Gr(e.charCodeAt(t + 1)) << 8 | Gr(e.charCodeAt(t + 2)) << 4 | Gr(e.charCodeAt(t + 3));
}
function Gr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Op(e, t) {
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
  throw wt(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function Lp(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, a = "";
  const d = [];
  for (; i < r; ) {
    const l = n.charCodeAt(i);
    if (l === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      a += n.slice(o, i), d.push(a);
      const m = mt(
        e,
        L.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Qp(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, m;
    }
    if (l === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      a += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (l === 10 || l === 13) {
      a += n.slice(o, i), d.push(a), l === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, a = "", o = i, s = i;
      continue;
    }
    if (_r(l))
      ++i;
    else if (Ii(n, i))
      i += 2;
    else
      throw wt(
        e.source,
        i,
        `Invalid character within String: ${$n(
          e,
          i
        )}.`
      );
  }
  throw wt(e.source, i, "Unterminated string.");
}
function Tp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (bp(i))
      ++s;
    else
      break;
  }
  return mt(
    e,
    L.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Us(e, t) {
  if (!!!e)
    throw new Error(t);
}
const Pp = 10, kd = 2;
function Md(e) {
  return yi(e, []);
}
function yi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return Up(e, t);
    default:
      return String(e);
  }
}
function Up(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (Gp(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : yi(r, n);
  } else if (Array.isArray(e))
    return Jp(e, n);
  return Hp(e, n);
}
function Gp(e) {
  return typeof e.toJSON == "function";
}
function Hp(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > kd ? "[" + Zp(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + yi(i, t)
  ).join(", ") + " }";
}
function Jp(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > kd)
    return "[Array]";
  const n = Math.min(Pp, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(yi(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Zp(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Yp = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
  function(t, n) {
    return t instanceof n;
  }
);
class Od {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Us(!1, `Body must be a string. Received: ${Md(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Us(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Us(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Xp(e) {
  return Yp(e, Od);
}
function Ld(e, t) {
  return new us(e, t).parseDocument();
}
function Vp(e, t) {
  const n = new us(e, t);
  n.expectToken(L.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(L.EOF), r;
}
function jp(e, t) {
  const n = new us(e, t);
  n.expectToken(L.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(L.EOF), r;
}
function qp(e, t) {
  const n = new us(e, t);
  n.expectToken(L.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(L.EOF), r;
}
class us {
  constructor(t, n = {}) {
    const r = Xp(t) ? t : new Od(t);
    this._lexer = new Fp(r), this._options = n, this._tokenCounter = 0;
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
        throw wt(
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
        operation: or.QUERY,
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
        return or.QUERY;
      case "mutation":
        return or.MUTATION;
      case "subscription":
        return or.SUBSCRIPTION;
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
            throw wt(
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
      throw wt(
        this._lexer.source,
        this._lexer.token.start,
        `${vs(
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
    if (Object.prototype.hasOwnProperty.call(Lo, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new Bp(
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
    throw wt(
      this._lexer.source,
      n.start,
      `Expected ${Td(t)}, found ${vs(n)}.`
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
      throw wt(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${vs(n)}.`
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
    return wt(
      this._lexer.source,
      n.start,
      `Unexpected ${vs(n)}.`
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
      throw wt(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function vs(e) {
  const t = e.value;
  return Td(e.kind) + (t != null ? ` "${t}"` : "");
}
function Td(e) {
  return Np(e) ? `"${e}"` : e;
}
const Wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: us,
  parse: Ld,
  parseConstValue: jp,
  parseType: qp,
  parseValue: Vp
}, Symbol.toStringTag, { value: "Module" })), $p = /* @__PURE__ */ la(Wp);
function Kp(e) {
  return `"${e.replace(zp, em)}"`;
}
const zp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function em(e) {
  return tm[e.charCodeAt(0)];
}
const tm = [
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
], nm = Object.freeze({});
function rm(e, t, n = Nd) {
  const r = /* @__PURE__ */ new Map();
  for (const R of Object.values(ae))
    r.set(R, sm(t, R));
  let s, i = Array.isArray(e), o = [e], a = -1, d = [], l = e, m, g;
  const b = [], Q = [];
  do {
    a++;
    const R = a === o.length, G = R && d.length !== 0;
    if (R) {
      if (m = Q.length === 0 ? void 0 : b[b.length - 1], l = g, g = Q.pop(), G)
        if (i) {
          l = l.slice();
          let j = 0;
          for (const [M, _] of d) {
            const O = M - j;
            _ === null ? (l.splice(O, 1), j++) : l[O] = _;
          }
        } else {
          l = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(l)
          );
          for (const [j, M] of d)
            l[j] = M;
        }
      a = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (m = i ? a : o[a], l = g[m], l == null)
        continue;
      b.push(m);
    }
    let T;
    if (!Array.isArray(l)) {
      var v, C;
      qc(l) || Us(!1, `Invalid AST Node: ${Md(l)}.`);
      const j = R ? (v = r.get(l.kind)) === null || v === void 0 ? void 0 : v.leave : (C = r.get(l.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (T = j == null ? void 0 : j.call(t, l, m, g, b, Q), T === nm)
        break;
      if (T === !1) {
        if (!R) {
          b.pop();
          continue;
        }
      } else if (T !== void 0 && (d.push([m, T]), !R))
        if (qc(T))
          l = T;
        else {
          b.pop();
          continue;
        }
    }
    if (T === void 0 && G && d.push([m, l]), R)
      b.pop();
    else {
      var F;
      s = {
        inArray: i,
        index: a,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(l), o = i ? l : (F = n[l.kind]) !== null && F !== void 0 ? F : [], a = -1, d = [], g && Q.push(g), g = l;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function sm(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Pd(e) {
  return rm(e, om);
}
const im = 80, om = {
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
      const t = we("(", te(e.variableDefinitions, ", "), ")"), n = te(
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
    leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + we(" = ", n) + we(" ", te(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => qt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = we("", e, ": ") + t;
      let o = i + we("(", te(n, ", "), ")");
      return o.length > im && (o = i + we(`(
`, Gs(te(n, `
`)), `
)`)), te([o, te(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + we(" ", te(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => te(
      [
        "...",
        we("on ", e),
        te(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${we("(", te(n, ", "), ")")} on ${t} ${we("", te(r, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? xp(e) : Kp(e)
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
    leave: ({ name: e, arguments: t }) => "@" + e + we("(", te(t, ", "), ")")
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
    leave: ({ description: e, directives: t, operationTypes: n }) => we("", e, `
`) + te(["schema", te(t, " "), qt(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => we("", e, `
`) + te(["scalar", t, te(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => we("", e, `
`) + te(
      [
        "type",
        t,
        we("implements ", te(n, " & ")),
        te(r, " "),
        qt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => we("", e, `
`) + t + ($c(n) ? we(`(
`, Gs(te(n, `
`)), `
)`) : we("(", te(n, ", "), ")")) + ": " + r + we(" ", te(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: s }) => we("", e, `
`) + te(
      [t + ": " + n, we("= ", r), te(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => we("", e, `
`) + te(
      [
        "interface",
        t,
        we("implements ", te(n, " & ")),
        te(r, " "),
        qt(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => we("", e, `
`) + te(
      ["union", t, te(n, " "), we("= ", te(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => we("", e, `
`) + te(["enum", t, te(n, " "), qt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => we("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => we("", e, `
`) + te(["input", t, te(n, " "), qt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => we("", e, `
`) + "directive @" + t + ($c(n) ? we(`(
`, Gs(te(n, `
`)), `
)`) : we("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
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
        we("implements ", te(t, " & ")),
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
        we("implements ", te(t, " & ")),
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
        we("= ", te(n, " | "))
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
  return we(`{
`, Gs(te(e, `
`)), `
}`);
}
function we(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Gs(e) {
  return we("  ", e.replace(/\n/g, `
  `));
}
function $c(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const am = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: Pd
}, Symbol.toStringTag, { value: "Module" })), cm = /* @__PURE__ */ la(am);
var Ca = {}, Bi = {}, Ud = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Am = Ud, Gd = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Am;
}, um = Gd, dm = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = um);
  var s, i = /* @__PURE__ */ new Map();
  function o(m, g) {
    var b = i.get(g);
    b ? b.push.apply(b, m) : i.set(g, m);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var a = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(m, g) {
        return o(["" + a + g], m), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(m, g) {
        var b = e(m, "" + a + g, r);
        return b.files.forEach(o), b.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var d in t) {
        var l = e(t[d], "" + a + d, r);
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
Bi.ReactNativeFile = Ud;
Bi.extractFiles = dm;
Bi.isExtractableFile = Gd;
var lm = typeof self == "object" ? self.FormData : window.FormData, ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.defaultJsonSerializer = void 0;
ds.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var hm = se && se.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ca, "__esModule", { value: !0 });
var Hd = Bi, fm = hm(lm), gm = ds, pm = function(e) {
  return Hd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function mm(e, t, n, r) {
  r === void 0 && (r = gm.defaultJsonSerializer);
  var s = Hd.extractFiles({ query: e, variables: t, operationName: n }, "", pm), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var a = e.reduce(function(b, Q, v) {
      return b.push({ query: Q, variables: t ? t[v] : void 0 }), b;
    }, []);
    return r.stringify(a);
  }
  var d = typeof FormData > "u" ? fm.default : FormData, l = new d();
  l.append("operations", r.stringify(i));
  var m = {}, g = 0;
  return o.forEach(function(b) {
    m[++g] = b;
  }), l.append("map", r.stringify(m)), g = 0, o.forEach(function(b, Q) {
    l.append("" + ++g, Q);
  }), l;
}
Ca.default = mm;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.parseBatchRequestsExtendedArgs = Dt.parseRawRequestExtendedArgs = Dt.parseRequestExtendedArgs = Dt.parseBatchRequestArgs = Dt.parseRawRequestArgs = Dt.parseRequestArgs = void 0;
function wm(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Dt.parseRequestArgs = wm;
function Em(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Dt.parseRawRequestArgs = Em;
function Im(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Dt.parseBatchRequestArgs = Im;
function ym(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Dt.parseRequestExtendedArgs = ym;
function Bm(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Dt.parseRawRequestExtendedArgs = Bm;
function Cm(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Dt.parseBatchRequestsExtendedArgs = Cm;
var ls = {}, bm = se && se.__extends || function() {
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
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.ClientError = void 0;
var Qm = (
  /** @class */
  function(e) {
    bm(t, e);
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
ls.ClientError = Qm;
var Lr = {}, Kc;
function vm() {
  if (Kc)
    return Lr;
  Kc = 1;
  var e = se && se.__assign || function() {
    return e = Object.assign || function(M) {
      for (var _, O = 1, P = arguments.length; O < P; O++) {
        _ = arguments[O];
        for (var W in _)
          Object.prototype.hasOwnProperty.call(_, W) && (M[W] = _[W]);
      }
      return M;
    }, e.apply(this, arguments);
  }, t = se && se.__awaiter || function(M, _, O, P) {
    function W(U) {
      return U instanceof O ? U : new O(function(J) {
        J(U);
      });
    }
    return new (O || (O = Promise))(function(U, J) {
      function ee(A) {
        try {
          c(P.next(A));
        } catch (h) {
          J(h);
        }
      }
      function B(A) {
        try {
          c(P.throw(A));
        } catch (h) {
          J(h);
        }
      }
      function c(A) {
        A.done ? U(A.value) : W(A.value).then(ee, B);
      }
      c((P = P.apply(M, _ || [])).next());
    });
  }, n = se && se.__generator || function(M, _) {
    var O = { label: 0, sent: function() {
      if (U[0] & 1)
        throw U[1];
      return U[1];
    }, trys: [], ops: [] }, P, W, U, J;
    return J = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (J[Symbol.iterator] = function() {
      return this;
    }), J;
    function ee(c) {
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
          c = _.call(M, O);
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
  Object.defineProperty(Lr, "__esModule", { value: !0 }), Lr.GraphQLWebSocketClient = void 0;
  var r = ls, s = Jd(), i = "connection_init", o = "connection_ack", a = "ping", d = "pong", l = "subscribe", m = "next", g = "error", b = "complete", Q = (
    /** @class */
    function() {
      function M(_, O, P) {
        this._type = _, this._payload = O, this._id = P;
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
      }), M.parse = function(_, O) {
        var P = JSON.parse(_), W = P.type, U = P.payload, J = P.id;
        return new M(W, O(U), J);
      }, M;
    }()
  ), v = (
    /** @class */
    function() {
      function M(_, O) {
        var P = this, W = O.onInit, U = O.onAcknowledged, J = O.onPing, ee = O.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = _, _.onopen = function(B) {
          return t(P, void 0, void 0, function() {
            var c, A, h, w;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (c = _).send, h = F, W ? [4, W()] : [3, 2];
                case 1:
                  return w = f.sent(), [3, 3];
                case 2:
                  w = null, f.label = 3;
                case 3:
                  return A.apply(c, [h.apply(void 0, [w]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, _.onclose = function(B) {
          P.socketState.acknowledged = !1, P.socketState.subscriptions = {};
        }, _.onerror = function(B) {
          console.error(B);
        }, _.onmessage = function(B) {
          try {
            var c = C(B.data);
            switch (c.type) {
              case o: {
                P.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (P.socketState.acknowledged = !0, U && U(c.payload));
                return;
              }
              case a: {
                J ? J(c.payload).then(function(I) {
                  return _.send(G(I).text);
                }) : _.send(G(null).text);
                return;
              }
              case d: {
                ee && ee(c.payload);
                return;
              }
            }
            if (!P.socketState.acknowledged || c.id === void 0 || c.id === null || !P.socketState.subscriptions[c.id])
              return;
            var A = P.socketState.subscriptions[c.id], h = A.query, w = A.variables, f = A.subscriber;
            switch (c.type) {
              case m: {
                !c.payload.errors && c.payload.data && f.next && f.next(c.payload.data), c.payload.errors && f.error && f.error(new r.ClientError(e(e({}, c.payload), { status: 200 }), { query: h, variables: w }));
                return;
              }
              case g: {
                f.error && f.error(new r.ClientError({ errors: c.payload, status: 200 }, { query: h, variables: w }));
                return;
              }
              case b: {
                f.complete && f.complete(), delete P.socketState.subscriptions[c.id];
                return;
              }
            }
          } catch (I) {
            console.error(I), _.close(1006);
          }
          _.close(4400, "Unknown graphql-ws message.");
        };
      }
      return M.prototype.makeSubscribe = function(_, O, P, W) {
        var U = this, J = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[J] = { query: _, variables: P, subscriber: W }, this.socket.send(T(J, { query: _, operationName: O, variables: P }).text), function() {
          U.socket.send(j(J).text), delete U.socketState.subscriptions[J];
        };
      }, M.prototype.rawRequest = function(_, O) {
        var P = this;
        return new Promise(function(W, U) {
          var J;
          P.rawSubscribe(_, {
            next: function(ee, B) {
              return J = { data: ee, extensions: B };
            },
            error: U,
            complete: function() {
              return W(J);
            }
          }, O);
        });
      }, M.prototype.request = function(_, O) {
        var P = this;
        return new Promise(function(W, U) {
          var J;
          P.subscribe(_, {
            next: function(ee) {
              return J = ee;
            },
            error: U,
            complete: function() {
              return W(J);
            }
          }, O);
        });
      }, M.prototype.subscribe = function(_, O, P) {
        var W = s.resolveRequestDocument(_), U = W.query, J = W.operationName;
        return this.makeSubscribe(U, J, P, O);
      }, M.prototype.rawSubscribe = function(_, O, P) {
        return this.makeSubscribe(_, void 0, P, O);
      }, M.prototype.ping = function(_) {
        this.socket.send(R(_).text);
      }, M.prototype.close = function() {
        this.socket.close(1e3);
      }, M.PROTOCOL = "graphql-transport-ws", M;
    }()
  );
  Lr.GraphQLWebSocketClient = v;
  function C(M, _) {
    _ === void 0 && (_ = function(P) {
      return P;
    });
    var O = Q.parse(M, _);
    return O;
  }
  function F(M) {
    return new Q(i, M);
  }
  function R(M) {
    return new Q(a, M, void 0);
  }
  function G(M) {
    return new Q(d, M, void 0);
  }
  function T(M, _) {
    return new Q(l, _, M);
  }
  function j(M) {
    return new Q(b, void 0, M);
  }
  return Lr;
}
var zc;
function Jd() {
  return zc || (zc = 1, function(e) {
    var t = se && se.__assign || function() {
      return t = Object.assign || function(f) {
        for (var I, y = 1, p = arguments.length; y < p; y++) {
          I = arguments[y];
          for (var u in I)
            Object.prototype.hasOwnProperty.call(I, u) && (f[u] = I[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = se && se.__createBinding || (Object.create ? function(f, I, y, p) {
      p === void 0 && (p = y), Object.defineProperty(f, p, { enumerable: !0, get: function() {
        return I[y];
      } });
    } : function(f, I, y, p) {
      p === void 0 && (p = y), f[p] = I[y];
    }), r = se && se.__setModuleDefault || (Object.create ? function(f, I) {
      Object.defineProperty(f, "default", { enumerable: !0, value: I });
    } : function(f, I) {
      f.default = I;
    }), s = se && se.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var I = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(I, f, y);
      return r(I, f), I;
    }, i = se && se.__awaiter || function(f, I, y, p) {
      function u(E) {
        return E instanceof y ? E : new y(function(Z) {
          Z(E);
        });
      }
      return new (y || (y = Promise))(function(E, Z) {
        function X(ne) {
          try {
            q(p.next(ne));
          } catch (re) {
            Z(re);
          }
        }
        function K(ne) {
          try {
            q(p.throw(ne));
          } catch (re) {
            Z(re);
          }
        }
        function q(ne) {
          ne.done ? E(ne.value) : u(ne.value).then(X, K);
        }
        q((p = p.apply(f, I || [])).next());
      });
    }, o = se && se.__generator || function(f, I) {
      var y = { label: 0, sent: function() {
        if (E[0] & 1)
          throw E[1];
        return E[1];
      }, trys: [], ops: [] }, p, u, E, Z;
      return Z = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (Z[Symbol.iterator] = function() {
        return this;
      }), Z;
      function X(q) {
        return function(ne) {
          return K([q, ne]);
        };
      }
      function K(q) {
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
            q = I.call(f, y);
          } catch (ne) {
            q = [6, ne], u = 0;
          } finally {
            p = E = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, a = se && se.__rest || function(f, I) {
      var y = {};
      for (var p in f)
        Object.prototype.hasOwnProperty.call(f, p) && I.indexOf(p) < 0 && (y[p] = f[p]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, p = Object.getOwnPropertySymbols(f); u < p.length; u++)
          I.indexOf(p[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, p[u]) && (y[p[u]] = f[p[u]]);
      return y;
    }, d = se && se.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var l = s(pp), m = l, g = $p, b = cm, Q = d(Ca), v = ds, C = Dt, F = ls;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return F.ClientError;
    } });
    var R = function(f) {
      var I = {};
      return f && (typeof Headers < "u" && f instanceof Headers || m && m.Headers && f instanceof m.Headers ? I = h(f) : Array.isArray(f) ? f.forEach(function(y) {
        var p = y[0], u = y[1];
        I[p] = u;
      }) : I = f), I;
    }, G = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, T = function(f) {
      var I = f.query, y = f.variables, p = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(I)) {
        var E = ["query=" + encodeURIComponent(G(I))];
        return y && E.push("variables=" + encodeURIComponent(u.stringify(y))), p && E.push("operationName=" + encodeURIComponent(p)), E.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var Z = I.reduce(function(X, K, q) {
        return X.push({
          query: G(K),
          variables: y ? u.stringify(y[q]) : void 0
        }), X;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(Z));
    }, j = function(f) {
      var I = f.url, y = f.query, p = f.variables, u = f.operationName, E = f.headers, Z = f.fetch, X = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return q = Q.default(y, p, u, X.jsonSerializer), ne = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), E), body: q }, X), K ? [4, Promise.resolve(K(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Z(I, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, M = function(f) {
      var I = f.url, y = f.query, p = f.variables, u = f.operationName, E = f.headers, Z = f.fetch, X = f.fetchOptions, K = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, ne;
        return o(this, function(re) {
          switch (re.label) {
            case 0:
              return q = T({
                query: y,
                variables: p,
                operationName: u,
                jsonSerializer: X.jsonSerializer
              }), ne = t({ method: "GET", headers: E }, X), K ? [4, Promise.resolve(K(ne))] : [3, 2];
            case 1:
              ne = re.sent(), re.label = 2;
            case 2:
              return [4, Z(I + "?" + q, ne)];
            case 3:
              return [2, re.sent()];
          }
        });
      });
    }, _ = (
      /** @class */
      function() {
        function f(I, y) {
          y === void 0 && (y = {}), this.url = I, this.options = y;
        }
        return f.prototype.rawRequest = function(I, y, p) {
          return i(this, void 0, void 0, function() {
            var u, E, Z, X, K, q, ne, re, Me, pe, oe, Re;
            return o(this, function(he) {
              return u = C.parseRawRequestArgs(I, y, p), E = this.options, Z = E.headers, X = E.fetch, K = X === void 0 ? l.default : X, q = E.method, ne = q === void 0 ? "POST" : q, re = E.requestMiddleware, Me = E.responseMiddleware, pe = a(E, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (pe.signal = u.signal), Re = B(u.query).operationName, [2, O({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, R(c(Z))), R(u.requestHeaders)),
                operationName: Re,
                fetch: K,
                method: ne,
                fetchOptions: pe,
                middleware: re
              }).then(function(me) {
                return Me && Me(me), me;
              }).catch(function(me) {
                throw Me && Me(me), me;
              })];
            });
          });
        }, f.prototype.request = function(I) {
          for (var y = [], p = 1; p < arguments.length; p++)
            y[p - 1] = arguments[p];
          var u = y[0], E = y[1], Z = C.parseRequestArgs(I, u, E), X = this.options, K = X.headers, q = X.fetch, ne = q === void 0 ? l.default : q, re = X.method, Me = re === void 0 ? "POST" : re, pe = X.requestMiddleware, oe = X.responseMiddleware, Re = a(X, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), he = this.url;
          Z.signal !== void 0 && (Re.signal = Z.signal);
          var me = B(Z.document), en = me.query, Se = me.operationName;
          return O({
            url: he,
            query: en,
            variables: Z.variables,
            headers: t(t({}, R(c(K))), R(Z.requestHeaders)),
            operationName: Se,
            fetch: ne,
            method: Me,
            fetchOptions: Re,
            middleware: pe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(I, y) {
          var p = C.parseBatchRequestArgs(I, y), u = this.options, E = u.headers, Z = u.fetch, X = Z === void 0 ? l.default : Z, K = u.method, q = K === void 0 ? "POST" : K, ne = u.requestMiddleware, re = u.responseMiddleware, Me = a(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), pe = this.url;
          p.signal !== void 0 && (Me.signal = p.signal);
          var oe = p.documents.map(function(he) {
            var me = he.document;
            return B(me).query;
          }), Re = p.documents.map(function(he) {
            var me = he.variables;
            return me;
          });
          return O({
            url: pe,
            query: oe,
            variables: Re,
            headers: t(t({}, R(c(E))), R(p.requestHeaders)),
            operationName: void 0,
            fetch: X,
            method: q,
            fetchOptions: Me,
            middleware: ne
          }).then(function(he) {
            return re && re(he), he.data;
          }).catch(function(he) {
            throw re && re(he), he;
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
    e.GraphQLClient = _;
    function O(f) {
      var I = f.url, y = f.query, p = f.variables, u = f.headers, E = f.operationName, Z = f.fetch, X = f.method, K = X === void 0 ? "POST" : X, q = f.fetchOptions, ne = f.middleware;
      return i(this, void 0, void 0, function() {
        var re, Me, pe, oe, Re, he, me, en, Se, ye, kr;
        return o(this, function(Oe) {
          switch (Oe.label) {
            case 0:
              return re = K.toUpperCase() === "POST" ? j : M, Me = Array.isArray(y), [4, re({
                url: I,
                query: y,
                variables: p,
                operationName: E,
                headers: u,
                fetch: Z,
                fetchOptions: q,
                middleware: ne
              })];
            case 1:
              return pe = Oe.sent(), [4, J(pe, q.jsonSerializer)];
            case 2:
              if (oe = Oe.sent(), Re = Me && Array.isArray(oe) ? !oe.some(function(Ue) {
                var Es = Ue.data;
                return !Es;
              }) : !!oe.data, he = !oe.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", pe.ok && he && Re)
                return me = pe.headers, en = pe.status, oe.errors, Se = a(oe, ["errors"]), ye = q.errorPolicy === "ignore" ? Se : oe, [2, t(t({}, Me ? { data: ye } : ye), { headers: me, status: en })];
              throw kr = typeof oe == "string" ? { error: oe } : oe, new F.ClientError(t(t({}, kr), { status: pe.status, headers: pe.headers }), { query: y, variables: p });
          }
        });
      });
    }
    function P(f, I, y, p) {
      return i(this, void 0, void 0, function() {
        var u, E;
        return o(this, function(Z) {
          return u = C.parseRawRequestExtendedArgs(f, I, y, p), E = new _(u.url), [2, E.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = P;
    function W(f, I) {
      for (var y = [], p = 2; p < arguments.length; p++)
        y[p - 2] = arguments[p];
      return i(this, void 0, void 0, function() {
        var u, E, Z, X;
        return o(this, function(K) {
          return u = y[0], E = y[1], Z = C.parseRequestExtendedArgs(f, I, u, E), X = new _(Z.url), [2, X.request(t({}, Z))];
        });
      });
    }
    e.request = W;
    function U(f, I, y) {
      return i(this, void 0, void 0, function() {
        var p, u;
        return o(this, function(E) {
          return p = C.parseBatchRequestsExtendedArgs(f, I, y), u = new _(p.url), [2, u.batchRequests(t({}, p))];
        });
      });
    }
    e.batchRequests = U, e.default = W;
    function J(f, I) {
      return I === void 0 && (I = v.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, p, u;
        return o(this, function(E) {
          switch (E.label) {
            case 0:
              return f.headers.forEach(function(Z, X) {
                X.toLowerCase() === "content-type" && (y = Z);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (p = I).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(p, [E.sent()])];
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
      return { query: b.print(f), operationName: p };
    }
    e.resolveRequestDocument = B;
    function c(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var I = [], y = 1; y < arguments.length; y++)
        I[y - 1] = arguments[y];
      return f.reduce(function(p, u, E) {
        return "" + p + u + (E in I ? I[E] : "");
      }, "");
    }
    e.gql = A;
    function h(f) {
      var I = {};
      return f.forEach(function(y, p) {
        I[p] = y;
      }), I;
    }
    var w = vm();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return w.GraphQLWebSocketClient;
    } });
  }(io)), io;
}
var xm = Jd();
function Fm(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Zd(e) {
  return function t(n) {
    return arguments.length === 0 || Fm(n) ? t : e.apply(this, arguments);
  };
}
var Nm = /* @__PURE__ */ Zd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Dm(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Yd(e, t, n) {
  if (n || (n = new Sm()), Rm(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (i[a] = t ? Yd(e[a], !0, n) : e[a]);
    return i;
  };
  switch (Nm(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Dm(e);
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
function Rm(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Sm = /* @__PURE__ */ function() {
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
}(), _m = /* @__PURE__ */ Zd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Yd(t, !0);
});
const es = _m;
var ti = function() {
  return ti = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, ti.apply(this, arguments);
};
var Hs = /* @__PURE__ */ new Map(), Po = /* @__PURE__ */ new Map(), Xd = !0, ni = !1;
function Vd(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function km(e) {
  return Vd(e.source.body.substring(e.start, e.end));
}
function Mm(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = km(r.loc), o = Po.get(s);
      o && !o.has(i) ? Xd && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Po.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), ti(ti({}, e), { definitions: n });
}
function Om(e) {
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
function Lm(e) {
  var t = Vd(e);
  if (!Hs.has(t)) {
    var n = Ld(e, {
      experimentalFragmentVariables: ni,
      allowLegacyFragmentVariables: ni
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Hs.set(t, Om(Mm(n)));
  }
  return Hs.get(t);
}
function Br(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), Lm(r);
}
function Tm() {
  Hs.clear(), Po.clear();
}
function Pm() {
  Xd = !1;
}
function Um() {
  ni = !0;
}
function Gm() {
  ni = !1;
}
var Tr = {
  gql: Br,
  resetCaches: Tm,
  disableFragmentWarnings: Pm,
  enableExperimentalFragmentVariables: Um,
  disableExperimentalFragmentVariables: Gm
};
(function(e) {
  e.gql = Tr.gql, e.resetCaches = Tr.resetCaches, e.disableFragmentWarnings = Tr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Tr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Tr.disableExperimentalFragmentVariables;
})(Br || (Br = {}));
Br.default = Br;
const ce = Br;
var jd = {}, ba = {}, Hm = Ne, Zt = null;
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
function Ne(e, t, n) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!n;
}
Ne.prototype.__isLong__;
Object.defineProperty(Ne.prototype, "__isLong__", { value: !0 });
function _t(e) {
  return (e && e.__isLong__) === !0;
}
Ne.isLong = _t;
var eA = {}, tA = {};
function zn(e, t) {
  var n, r, s;
  return t ? (e >>>= 0, (s = 0 <= e && e < 256) && (r = tA[e], r) ? r : (n = De(e, (e | 0) < 0 ? -1 : 0, !0), s && (tA[e] = n), n)) : (e |= 0, (s = -128 <= e && e < 128) && (r = eA[e], r) ? r : (n = De(e, e < 0 ? -1 : 0, !1), s && (eA[e] = n), n));
}
Ne.fromInt = zn;
function Yt(e, t) {
  if (isNaN(e))
    return t ? Xn : Xt;
  if (t) {
    if (e < 0)
      return Xn;
    if (e >= qd)
      return Kd;
  } else {
    if (e <= -rA)
      return St;
    if (e + 1 >= rA)
      return $d;
  }
  return e < 0 ? Yt(-e, t).neg() : De(e % Cr | 0, e / Cr | 0, t);
}
Ne.fromNumber = Yt;
function De(e, t, n) {
  return new Ne(e, t, n);
}
Ne.fromBits = De;
var ri = Math.pow;
function Qa(e, t, n) {
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
    return Qa(e.substring(1), t, n).neg();
  for (var s = Yt(ri(n, 8)), i = Xt, o = 0; o < e.length; o += 8) {
    var a = Math.min(8, e.length - o), d = parseInt(e.substring(o, o + a), n);
    if (a < 8) {
      var l = Yt(ri(n, a));
      i = i.mul(l).add(Yt(d));
    } else
      i = i.mul(s), i = i.add(Yt(d));
  }
  return i.unsigned = t, i;
}
Ne.fromString = Qa;
function zt(e, t) {
  return typeof e == "number" ? Yt(e, t) : typeof e == "string" ? Qa(e, t) : De(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
Ne.fromValue = zt;
var nA = 65536, Jm = 1 << 24, Cr = nA * nA, qd = Cr * Cr, rA = qd / 2, sA = zn(Jm), Xt = zn(0);
Ne.ZERO = Xt;
var Xn = zn(0, !0);
Ne.UZERO = Xn;
var ar = zn(1);
Ne.ONE = ar;
var Wd = zn(1, !0);
Ne.UONE = Wd;
var Uo = zn(-1);
Ne.NEG_ONE = Uo;
var $d = De(-1, 2147483647, !1);
Ne.MAX_VALUE = $d;
var Kd = De(-1, -1, !0);
Ne.MAX_UNSIGNED_VALUE = Kd;
var St = De(0, -2147483648, !1);
Ne.MIN_VALUE = St;
var $ = Ne.prototype;
$.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
$.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * Cr + (this.low >>> 0) : this.high * Cr + (this.low >>> 0);
};
$.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(St)) {
      var n = Yt(t), r = this.div(n), s = r.mul(n).sub(this);
      return r.toString(t) + s.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = Yt(ri(t, 6), this.unsigned), o = this, a = ""; ; ) {
    var d = o.div(i), l = o.sub(d.mul(i)).toInt() >>> 0, m = l.toString(t);
    if (o = d, o.isZero())
      return m + a;
    for (; m.length < 6; )
      m = "0" + m;
    a = "" + m + a;
  }
};
$.getHighBits = function() {
  return this.high;
};
$.getHighBitsUnsigned = function() {
  return this.high >>> 0;
};
$.getLowBits = function() {
  return this.low;
};
$.getLowBitsUnsigned = function() {
  return this.low >>> 0;
};
$.getNumBitsAbs = function() {
  if (this.isNegative())
    return this.eq(St) ? 64 : this.neg().getNumBitsAbs();
  for (var t = this.high != 0 ? this.high : this.low, n = 31; n > 0 && !(t & 1 << n); n--)
    ;
  return this.high != 0 ? n + 33 : n + 1;
};
$.isZero = function() {
  return this.high === 0 && this.low === 0;
};
$.eqz = $.isZero;
$.isNegative = function() {
  return !this.unsigned && this.high < 0;
};
$.isPositive = function() {
  return this.unsigned || this.high >= 0;
};
$.isOdd = function() {
  return (this.low & 1) === 1;
};
$.isEven = function() {
  return (this.low & 1) === 0;
};
$.equals = function(t) {
  return _t(t) || (t = zt(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
};
$.eq = $.equals;
$.notEquals = function(t) {
  return !this.eq(
    /* validates */
    t
  );
};
$.neq = $.notEquals;
$.ne = $.notEquals;
$.lessThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) < 0;
};
$.lt = $.lessThan;
$.lessThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) <= 0;
};
$.lte = $.lessThanOrEqual;
$.le = $.lessThanOrEqual;
$.greaterThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) > 0;
};
$.gt = $.greaterThan;
$.greaterThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) >= 0;
};
$.gte = $.greaterThanOrEqual;
$.ge = $.greaterThanOrEqual;
$.compare = function(t) {
  if (_t(t) || (t = zt(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), r = t.isNegative();
  return n && !r ? -1 : !n && r ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
$.comp = $.compare;
$.negate = function() {
  return !this.unsigned && this.eq(St) ? St : this.not().add(ar);
};
$.neg = $.negate;
$.add = function(t) {
  _t(t) || (t = zt(t));
  var n = this.high >>> 16, r = this.high & 65535, s = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, a = t.high & 65535, d = t.low >>> 16, l = t.low & 65535, m = 0, g = 0, b = 0, Q = 0;
  return Q += i + l, b += Q >>> 16, Q &= 65535, b += s + d, g += b >>> 16, b &= 65535, g += r + a, m += g >>> 16, g &= 65535, m += n + o, m &= 65535, De(b << 16 | Q, m << 16 | g, this.unsigned);
};
$.subtract = function(t) {
  return _t(t) || (t = zt(t)), this.add(t.neg());
};
$.sub = $.subtract;
$.multiply = function(t) {
  if (this.isZero())
    return Xt;
  if (_t(t) || (t = zt(t)), Zt) {
    var n = Zt.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return De(n, Zt.get_high(), this.unsigned);
  }
  if (t.isZero())
    return Xt;
  if (this.eq(St))
    return t.isOdd() ? St : Xt;
  if (t.eq(St))
    return this.isOdd() ? St : Xt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(sA) && t.lt(sA))
    return Yt(this.toNumber() * t.toNumber(), this.unsigned);
  var r = this.high >>> 16, s = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, a = t.high >>> 16, d = t.high & 65535, l = t.low >>> 16, m = t.low & 65535, g = 0, b = 0, Q = 0, v = 0;
  return v += o * m, Q += v >>> 16, v &= 65535, Q += i * m, b += Q >>> 16, Q &= 65535, Q += o * l, b += Q >>> 16, Q &= 65535, b += s * m, g += b >>> 16, b &= 65535, b += i * l, g += b >>> 16, b &= 65535, b += o * d, g += b >>> 16, b &= 65535, g += r * m + s * l + i * d + o * a, g &= 65535, De(Q << 16 | v, g << 16 | b, this.unsigned);
};
$.mul = $.multiply;
$.divide = function(t) {
  if (_t(t) || (t = zt(t)), t.isZero())
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
    return De(n, Zt.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? Xn : Xt;
  var r, s, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return Xn;
    if (t.gt(this.shru(1)))
      return Wd;
    i = Xn;
  } else {
    if (this.eq(St)) {
      if (t.eq(ar) || t.eq(Uo))
        return St;
      if (t.eq(St))
        return ar;
      var o = this.shr(1);
      return r = o.div(t).shl(1), r.eq(Xt) ? t.isNegative() ? ar : Uo : (s = this.sub(t.mul(r)), i = r.add(s.div(t)), i);
    } else if (t.eq(St))
      return this.unsigned ? Xn : Xt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = Xt;
  }
  for (s = this; s.gte(t); ) {
    r = Math.max(1, Math.floor(s.toNumber() / t.toNumber()));
    for (var a = Math.ceil(Math.log(r) / Math.LN2), d = a <= 48 ? 1 : ri(2, a - 48), l = Yt(r), m = l.mul(t); m.isNegative() || m.gt(s); )
      r -= d, l = Yt(r, this.unsigned), m = l.mul(t);
    l.isZero() && (l = ar), i = i.add(l), s = s.sub(m);
  }
  return i;
};
$.div = $.divide;
$.modulo = function(t) {
  if (_t(t) || (t = zt(t)), Zt) {
    var n = (this.unsigned ? Zt.rem_u : Zt.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return De(n, Zt.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
$.mod = $.modulo;
$.rem = $.modulo;
$.not = function() {
  return De(~this.low, ~this.high, this.unsigned);
};
$.and = function(t) {
  return _t(t) || (t = zt(t)), De(this.low & t.low, this.high & t.high, this.unsigned);
};
$.or = function(t) {
  return _t(t) || (t = zt(t)), De(this.low | t.low, this.high | t.high, this.unsigned);
};
$.xor = function(t) {
  return _t(t) || (t = zt(t)), De(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
$.shiftLeft = function(t) {
  return _t(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? De(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : De(0, this.low << t - 32, this.unsigned);
};
$.shl = $.shiftLeft;
$.shiftRight = function(t) {
  return _t(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? De(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : De(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
$.shr = $.shiftRight;
$.shiftRightUnsigned = function(t) {
  if (_t(t) && (t = t.toInt()), t &= 63, t === 0)
    return this;
  var n = this.high;
  if (t < 32) {
    var r = this.low;
    return De(r >>> t | n << 32 - t, n >>> t, this.unsigned);
  } else
    return t === 32 ? De(n, 0, this.unsigned) : De(n >>> t - 32, 0, this.unsigned);
};
$.shru = $.shiftRightUnsigned;
$.shr_u = $.shiftRightUnsigned;
$.toSigned = function() {
  return this.unsigned ? De(this.low, this.high, !1) : this;
};
$.toUnsigned = function() {
  return this.unsigned ? this : De(this.low, this.high, !0);
};
$.toBytes = function(t) {
  return t ? this.toBytesLE() : this.toBytesBE();
};
$.toBytesLE = function() {
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
$.toBytesBE = function() {
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
Ne.fromBytes = function(t, n, r) {
  return r ? Ne.fromBytesLE(t, n) : Ne.fromBytesBE(t, n);
};
Ne.fromBytesLE = function(t, n) {
  return new Ne(
    t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,
    t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,
    n
  );
};
Ne.fromBytesBE = function(t, n) {
  return new Ne(
    t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],
    t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],
    n
  );
};
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
const zd = [
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
], Zm = (e) => {
  const t = zd.find(([n]) => e >= n);
  return e + (t ? t[1] : 0);
};
Ci.addLeapSeconds = Zm;
const Ym = (e) => {
  const t = zd.find(([n, r]) => e - r >= n);
  return e - (t ? t[1] : 0);
};
Ci.removeLeapSeconds = Ym;
var Xm = se && se.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ba, "__esModule", { value: !0 });
const Hr = Xm(Hm), iA = Ci;
let Go = class Cn {
  /**
   * Construct an instance of TAI64.
   *
   * @param label - The TAI64 label between 0 and 2^63-1, inclusive
   * @returns An instance of TAI64
   * @throws RangeError if the given label is not between 0 and 2^63-1, inclusive
   */
  constructor(t) {
    if (this.label = t, t.lt(Hr.default.ZERO) || t.gte(Hr.default.MAX_VALUE))
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
    const n = iA.addLeapSeconds(t), r = Cn.EPOCH.label.add(n);
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
    const r = Hr.default.fromString(t, !1, n);
    return new Cn(r);
  }
  /**
   * Return a TAI64 corresponding to the given byte array representing a TAI64.
   *
   * @param bytes - The byte array
   * @returns An instance of TAI64
   */
  static fromByteArray(t) {
    const n = Hr.default.fromBytes(t, !1);
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
    return iA.removeLeapSeconds(t.toNumber());
  }
};
Go.EPOCH = new Go(Hr.default.MAX_VALUE.shiftRight(1).add(1));
ba.TAI64 = Go;
Object.defineProperty(jd, "__esModule", { value: !0 });
var Vm = ba, e0 = jd.TAI64 = Vm.TAI64;
let fe;
const t0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && t0.decode();
let Jr = null;
function n0() {
  return (Jr === null || Jr.byteLength === 0) && (Jr = new Uint8Array(fe.memory.buffer)), Jr;
}
function jm(e, t) {
  return e = e >>> 0, t0.decode(n0().subarray(e, e + t));
}
function r0(e) {
  const t = fe.ret(e);
  return jt.__wrap(t);
}
function qm(e, t) {
  const n = fe.retd(e, t);
  return jt.__wrap(n);
}
function oA(e, t, n, r) {
  const s = fe.call(e, t, n, r);
  return jt.__wrap(s);
}
function Wm(e, t, n) {
  const r = fe.tr(e, t, n);
  return jt.__wrap(r);
}
function aA(e, t, n) {
  const r = fe.addi(e, t, n);
  return jt.__wrap(r);
}
function $m(e, t, n) {
  const r = fe.muli(e, t, n);
  return jt.__wrap(r);
}
function Zr(e, t, n) {
  const r = fe.lw(e, t, n);
  return jt.__wrap(r);
}
function Km(e, t, n) {
  const r = fe.gtf(e, t, n);
  return jt.__wrap(r);
}
function xs(e, t) {
  const n = fe.movi(e, t);
  return jt.__wrap(n);
}
let Yr = null;
function cA() {
  return (Yr === null || Yr.byteLength === 0) && (Yr = new Int32Array(fe.memory.buffer)), Yr;
}
function zm(e, t) {
  return e = e >>> 0, n0().subarray(e / 1, e / 1 + t);
}
const ew = Object.freeze({
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
    fe.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = fe.__wbindgen_add_to_stack_pointer(-16);
      fe.instruction_to_bytes(s, this.__wbg_ptr);
      var t = cA()[s / 4 + 0], n = cA()[s / 4 + 1], r = zm(t, n).slice();
      return fe.__wbindgen_free(t, n * 1, 1), r;
    } finally {
      fe.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return fe.instruction_size() >>> 0;
  }
}
class Pe {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Pe.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    const t = this.__destroy_into_raw();
    fe.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = fe.regid_new_checked(t);
    return n === 0 ? void 0 : Pe.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = fe.regid_bal();
    return Pe.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = fe.regid_cgas();
    return Pe.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = fe.regid_err();
    return Pe.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = fe.regid_flag();
    return Pe.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = fe.regid_fp();
    return Pe.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = fe.regid_ggas();
    return Pe.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = fe.regid_hp();
    return Pe.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = fe.regid_is();
    return Pe.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = fe.regid_of();
    return Pe.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = fe.regid_one();
    return Pe.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = fe.regid_pc();
    return Pe.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = fe.regid_ret();
    return Pe.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = fe.regid_retl();
    return Pe.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = fe.regid_sp();
    return Pe.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = fe.regid_spp();
    return Pe.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = fe.regid_writable();
    return Pe.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = fe.regid_zero();
    return Pe.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = fe.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return fe.regid_to_u8(t);
  }
}
async function tw(e, t) {
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
function nw() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(jm(t, n));
  }, e;
}
function rw(e, t) {
  return fe = e.exports, s0.__wbindgen_wasm_module = t, Yr = null, Jr = null, fe;
}
async function s0(e) {
  if (fe !== void 0)
    return fe;
  const t = nw(), { instance: n, module: r } = await tw(await e, t);
  return rw(n, r);
}
function sw(e, t, n, r) {
  function s(g, b, Q) {
    var v = Q ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = Q ? WebAssembly.compileStreaming : WebAssembly.compile;
    return b ? v(g, b) : C(g);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var a = globalThis.atob(n), d = a.length;
    i = new Uint8Array(new ArrayBuffer(d));
    for (var l = 0; l < d; l++)
      i[l] = a.charCodeAt(l);
  }
  if (e) {
    var m = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(m, r) : m;
  } else
    return s(i, r, !1);
}
function iw(e) {
  return sw(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function va() {
  return await s0(iw());
}
va();
let Fs;
const ow = new Uint8Array(16);
function aw() {
  if (!Fs && (Fs = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Fs))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Fs(ow);
}
const It = [];
for (let e = 0; e < 256; ++e)
  It.push((e + 256).toString(16).slice(1));
function cw(e, t = 0) {
  return (It[e[t + 0]] + It[e[t + 1]] + It[e[t + 2]] + It[e[t + 3]] + "-" + It[e[t + 4]] + It[e[t + 5]] + "-" + It[e[t + 6]] + It[e[t + 7]] + "-" + It[e[t + 8]] + It[e[t + 9]] + "-" + It[e[t + 10]] + It[e[t + 11]] + It[e[t + 12]] + It[e[t + 13]] + It[e[t + 14]] + It[e[t + 15]]).toLowerCase();
}
const Aw = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), AA = {
  randomUUID: Aw
};
function i0(e, t, n) {
  if (AA.randomUUID && !t && !e)
    return AA.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || aw)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return cw(r);
}
function uA(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function uw(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function o0(e, ...t) {
  if (!uw(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function dw(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  uA(e.outputLen), uA(e.blockLen);
}
function si(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function lw(e, t) {
  o0(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const ao = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function a0(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const co = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), rn = (e, t) => e << 32 - t | e >>> t, hw = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!hw)
  throw new Error("Non little-endian hardware is not supported");
function fw(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function xa(e) {
  if (typeof e == "string" && (e = fw(e)), !a0(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function gw(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!a0(s))
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
class c0 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function pw(e) {
  const t = (r) => e().update(xa(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function mw(e = 32) {
  if (ao && typeof ao.getRandomValues == "function")
    return ao.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function ww(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), a = Number(n & i), d = r ? 4 : 0, l = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + l, a, r);
}
class Ew extends c0 {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = co(this.buffer);
  }
  update(t) {
    si(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = xa(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const d = co(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    si(this), lw(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let g = o; g < s; g++)
      n[g] = 0;
    ww(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = co(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = d / 4, m = this.get();
    if (l > m.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < l; g++)
      a.setUint32(4 * g, m[g], i);
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
const Iw = (e, t, n) => e & t ^ ~e & n, yw = (e, t, n) => e & t ^ e & n ^ t & n, Bw = /* @__PURE__ */ new Uint32Array([
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
class Cw extends Ew {
  constructor() {
    super(64, 32, 8, !1), this.A = yn[0] | 0, this.B = yn[1] | 0, this.C = yn[2] | 0, this.D = yn[3] | 0, this.E = yn[4] | 0, this.F = yn[5] | 0, this.G = yn[6] | 0, this.H = yn[7] | 0;
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
    for (let g = 0; g < 16; g++, n += 4)
      Bn[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const b = Bn[g - 15], Q = Bn[g - 2], v = rn(b, 7) ^ rn(b, 18) ^ b >>> 3, C = rn(Q, 17) ^ rn(Q, 19) ^ Q >>> 10;
      Bn[g] = C + Bn[g - 7] + v + Bn[g - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: d, G: l, H: m } = this;
    for (let g = 0; g < 64; g++) {
      const b = rn(a, 6) ^ rn(a, 11) ^ rn(a, 25), Q = m + b + Iw(a, d, l) + Bw[g] + Bn[g] | 0, C = (rn(r, 2) ^ rn(r, 13) ^ rn(r, 22)) + yw(r, s, i) | 0;
      m = l, l = d, d = a, a = o + Q | 0, o = i, i = s, s = r, r = Q + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, d = d + this.F | 0, l = l + this.G | 0, m = m + this.H | 0, this.set(r, s, i, o, a, d, l, m);
  }
  roundClean() {
    Bn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const bw = /* @__PURE__ */ pw(() => new Cw());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const A0 = BigInt(0), bi = BigInt(1), Qw = BigInt(2);
function An(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const vw = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function br(e) {
  if (!An(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += vw[e[n]];
  return t;
}
function u0(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Fa(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const un = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function dA(e) {
  if (e >= un._0 && e <= un._9)
    return e - un._0;
  if (e >= un._A && e <= un._F)
    return e - (un._A - 10);
  if (e >= un._a && e <= un._f)
    return e - (un._a - 10);
}
function Qr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = dA(e.charCodeAt(i)), a = dA(e.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + a;
  }
  return r;
}
function jn(e) {
  return Fa(br(e));
}
function Na(e) {
  if (!An(e))
    throw new Error("Uint8Array expected");
  return Fa(br(Uint8Array.from(e).reverse()));
}
function vr(e, t) {
  return Qr(e.toString(16).padStart(t * 2, "0"));
}
function Da(e, t) {
  return vr(e, t).reverse();
}
function xw(e) {
  return Qr(u0(e));
}
function $t(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Qr(t);
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
function ts(...e) {
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
function Fw(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function Nw(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Dw(e) {
  let t;
  for (t = 0; e > A0; e >>= bi, t += 1)
    ;
  return t;
}
function Rw(e, t) {
  return e >> BigInt(t) & bi;
}
const Sw = (e, t, n) => e | (n ? bi : A0) << BigInt(t), Ra = (e) => (Qw << BigInt(e - 1)) - bi, Ao = (e) => new Uint8Array(e), lA = (e) => Uint8Array.from(e);
function d0(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Ao(e), s = Ao(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, a = (...g) => n(s, r, ...g), d = (g = Ao()) => {
    s = a(lA([0]), g), r = a(), g.length !== 0 && (s = a(lA([1]), g), r = a());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const b = [];
    for (; g < t; ) {
      r = a();
      const Q = r.slice();
      b.push(Q), g += r.length;
    }
    return ts(...b);
  };
  return (g, b) => {
    o(), d(g);
    let Q;
    for (; !(Q = b(l())); )
      d();
    return o(), Q;
  };
}
const _w = {
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
    const a = _w[i];
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
const kw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Rw,
  bitLen: Dw,
  bitMask: Ra,
  bitSet: Sw,
  bytesToHex: br,
  bytesToNumberBE: jn,
  bytesToNumberLE: Na,
  concatBytes: ts,
  createHmacDrbg: d0,
  ensureBytes: $t,
  equalBytes: Fw,
  hexToBytes: Qr,
  hexToNumber: Fa,
  isBytes: An,
  numberToBytesBE: vr,
  numberToBytesLE: Da,
  numberToHexUnpadded: u0,
  numberToVarBytesBE: xw,
  utf8ToBytes: Nw,
  validateObject: hs
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Et = BigInt(0), He = BigInt(1), Zn = BigInt(2), Mw = BigInt(3), Ho = BigInt(4), hA = BigInt(5), fA = BigInt(8);
BigInt(9);
BigInt(16);
function Ft(e, t) {
  const n = e % t;
  return n >= Et ? n : t + n;
}
function Ow(e, t, n) {
  if (n <= Et || t < Et)
    throw new Error("Expected power/modulo > 0");
  if (n === He)
    return Et;
  let r = He;
  for (; t > Et; )
    t & He && (r = r * e % n), e = e * e % n, t >>= He;
  return r;
}
function Ht(e, t, n) {
  let r = e;
  for (; t-- > Et; )
    r *= r, r %= n;
  return r;
}
function Jo(e, t) {
  if (e === Et || t <= Et)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Ft(e, t), r = t, s = Et, i = He;
  for (; n !== Et; ) {
    const a = r / n, d = r % n, l = s - i * a;
    r = n, n = d, s = i, i = l;
  }
  if (r !== He)
    throw new Error("invert: does not exist");
  return Ft(s, t);
}
function Lw(e) {
  const t = (e - He) / Zn;
  let n, r, s;
  for (n = e - He, r = 0; n % Zn === Et; n /= Zn, r++)
    ;
  for (s = Zn; s < e && Ow(s, t, e) !== e - He; s++)
    ;
  if (r === 1) {
    const o = (e + He) / Ho;
    return function(d, l) {
      const m = d.pow(l, o);
      if (!d.eql(d.sqr(m), l))
        throw new Error("Cannot find square root");
      return m;
    };
  }
  const i = (n + He) / Zn;
  return function(a, d) {
    if (a.pow(d, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let l = r, m = a.pow(a.mul(a.ONE, s), n), g = a.pow(d, i), b = a.pow(d, n);
    for (; !a.eql(b, a.ONE); ) {
      if (a.eql(b, a.ZERO))
        return a.ZERO;
      let Q = 1;
      for (let C = a.sqr(b); Q < l && !a.eql(C, a.ONE); Q++)
        C = a.sqr(C);
      const v = a.pow(m, He << BigInt(l - Q - 1));
      m = a.sqr(v), g = a.mul(g, v), b = a.mul(b, m), l = Q;
    }
    return g;
  };
}
function Tw(e) {
  if (e % Ho === Mw) {
    const t = (e + He) / Ho;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % fA === hA) {
    const t = (e - hA) / fA;
    return function(r, s) {
      const i = r.mul(s, Zn), o = r.pow(i, t), a = r.mul(s, o), d = r.mul(r.mul(a, Zn), o), l = r.mul(a, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return Lw(e);
}
const Pw = [
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
function Uw(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Pw.reduce((r, s) => (r[s] = "function", r), t);
  return hs(e, n);
}
function Gw(e, t, n) {
  if (n < Et)
    throw new Error("Expected power > 0");
  if (n === Et)
    return e.ONE;
  if (n === He)
    return t;
  let r = e.ONE, s = t;
  for (; n > Et; )
    n & He && (r = e.mul(r, s)), s = e.sqr(s), n >>= He;
  return r;
}
function Hw(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, a) => e.is0(o) ? i : (n[a] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, a) => e.is0(o) ? i : (n[a] = e.mul(i, n[a]), e.mul(i, o)), s), n;
}
function l0(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Jw(e, t, n = !1, r = {}) {
  if (e <= Et)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = l0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Tw(e), a = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: Ra(s),
    ZERO: Et,
    ONE: He,
    create: (d) => Ft(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return Et <= d && d < e;
    },
    is0: (d) => d === Et,
    isOdd: (d) => (d & He) === He,
    neg: (d) => Ft(-d, e),
    eql: (d, l) => d === l,
    sqr: (d) => Ft(d * d, e),
    add: (d, l) => Ft(d + l, e),
    sub: (d, l) => Ft(d - l, e),
    mul: (d, l) => Ft(d * l, e),
    pow: (d, l) => Gw(a, d, l),
    div: (d, l) => Ft(d * Jo(l, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, l) => d + l,
    subN: (d, l) => d - l,
    mulN: (d, l) => d * l,
    inv: (d) => Jo(d, e),
    sqrt: r.sqrt || ((d) => o(a, d)),
    invertBatch: (d) => Hw(a, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, l, m) => m ? l : d,
    toBytes: (d) => n ? Da(d, i) : vr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? Na(d) : jn(d);
    }
  });
  return Object.freeze(a);
}
function h0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function f0(e) {
  const t = h0(e);
  return t + Math.ceil(t / 2);
}
function Zw(e, t, n = !1) {
  const r = e.length, s = h0(t), i = f0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? jn(e) : Na(e), a = Ft(o, t - He) + He;
  return n ? Da(a, s) : vr(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Yw = BigInt(0), uo = BigInt(1);
function Xw(e, t) {
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
      for (; i > Yw; )
        i & uo && (o = o.add(a)), a = a.double(), i >>= uo;
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
      let l = s, m = l;
      for (let g = 0; g < o; g++) {
        m = l, d.push(m);
        for (let b = 1; b < a; b++)
          m = m.add(l), d.push(m);
        l = m.double();
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
      let l = e.ZERO, m = e.BASE;
      const g = BigInt(2 ** s - 1), b = 2 ** s, Q = BigInt(s);
      for (let v = 0; v < a; v++) {
        const C = v * d;
        let F = Number(o & g);
        o >>= Q, F > d && (F -= b, o += uo);
        const R = C, G = C + Math.abs(F) - 1, T = v % 2 !== 0, j = F < 0;
        F === 0 ? m = m.add(n(T, i[R])) : l = l.add(n(j, i[G]));
      }
      return { p: l, f: m };
    },
    wNAFCached(s, i, o, a) {
      const d = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, d), d !== 1 && i.set(s, a(l))), this.wNAF(d, l, o);
    }
  };
}
function g0(e) {
  return Uw(e.Fp), hs(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...l0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Vw(e) {
  const t = g0(e);
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
const { bytesToNumberBE: jw, hexToBytes: qw } = kw, Vn = {
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
    return { d: jw(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Vn, n = typeof e == "string" ? qw(e) : e;
    if (!An(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Vn._parseInt(n.subarray(2)), { d: o, l: a } = Vn._parseInt(i);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, n = (l) => {
      const m = l.toString(16);
      return m.length & 1 ? `0${m}` : m;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, a = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${a}${r}`;
  }
}, fn = BigInt(0), Jt = BigInt(1);
BigInt(2);
const gA = BigInt(3);
BigInt(4);
function Ww(e) {
  const t = Vw(e), { Fp: n } = t, r = t.toBytes || ((v, C, F) => {
    const R = C.toAffine();
    return ts(Uint8Array.from([4]), n.toBytes(R.x), n.toBytes(R.y));
  }), s = t.fromBytes || ((v) => {
    const C = v.subarray(1), F = n.fromBytes(C.subarray(0, n.BYTES)), R = n.fromBytes(C.subarray(n.BYTES, 2 * n.BYTES));
    return { x: F, y: R };
  });
  function i(v) {
    const { a: C, b: F } = t, R = n.sqr(v), G = n.mul(R, v);
    return n.add(n.add(G, n.mul(v, C)), F);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(v) {
    return typeof v == "bigint" && fn < v && v < t.n;
  }
  function a(v) {
    if (!o(v))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(v) {
    const { allowedPrivateKeyLengths: C, nByteLength: F, wrapPrivateKey: R, n: G } = t;
    if (C && typeof v != "bigint") {
      if (An(v) && (v = br(v)), typeof v != "string" || !C.includes(v.length))
        throw new Error("Invalid key");
      v = v.padStart(F * 2, "0");
    }
    let T;
    try {
      T = typeof v == "bigint" ? v : jn($t("private key", v, F));
    } catch {
      throw new Error(`private key must be ${F} bytes, hex or bigint, not ${typeof v}`);
    }
    return R && (T = Ft(T, G)), a(T), T;
  }
  const l = /* @__PURE__ */ new Map();
  function m(v) {
    if (!(v instanceof g))
      throw new Error("ProjectivePoint expected");
  }
  class g {
    constructor(C, F, R) {
      if (this.px = C, this.py = F, this.pz = R, C == null || !n.isValid(C))
        throw new Error("x required");
      if (F == null || !n.isValid(F))
        throw new Error("y required");
      if (R == null || !n.isValid(R))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(C) {
      const { x: F, y: R } = C || {};
      if (!C || !n.isValid(F) || !n.isValid(R))
        throw new Error("invalid affine point");
      if (C instanceof g)
        throw new Error("projective point not allowed");
      const G = (T) => n.eql(T, n.ZERO);
      return G(F) && G(R) ? g.ZERO : new g(F, R, n.ONE);
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
      const F = n.invertBatch(C.map((R) => R.pz));
      return C.map((R, G) => R.toAffine(F[G])).map(g.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const F = g.fromAffine(s($t("pointHex", C)));
      return F.assertValidity(), F;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return g.BASE.multiply(d(C));
    }
    // "Private method", don't use it directly
    _setWindowSize(C) {
      this._WINDOW_SIZE = C, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: C, y: F } = this.toAffine();
      if (!n.isValid(C) || !n.isValid(F))
        throw new Error("bad point: x or y not FE");
      const R = n.sqr(F), G = i(C);
      if (!n.eql(R, G))
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
      m(C);
      const { px: F, py: R, pz: G } = this, { px: T, py: j, pz: M } = C, _ = n.eql(n.mul(F, M), n.mul(T, G)), O = n.eql(n.mul(R, M), n.mul(j, G));
      return _ && O;
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
      const { a: C, b: F } = t, R = n.mul(F, gA), { px: G, py: T, pz: j } = this;
      let M = n.ZERO, _ = n.ZERO, O = n.ZERO, P = n.mul(G, G), W = n.mul(T, T), U = n.mul(j, j), J = n.mul(G, T);
      return J = n.add(J, J), O = n.mul(G, j), O = n.add(O, O), M = n.mul(C, O), _ = n.mul(R, U), _ = n.add(M, _), M = n.sub(W, _), _ = n.add(W, _), _ = n.mul(M, _), M = n.mul(J, M), O = n.mul(R, O), U = n.mul(C, U), J = n.sub(P, U), J = n.mul(C, J), J = n.add(J, O), O = n.add(P, P), P = n.add(O, P), P = n.add(P, U), P = n.mul(P, J), _ = n.add(_, P), U = n.mul(T, j), U = n.add(U, U), P = n.mul(U, J), M = n.sub(M, P), O = n.mul(U, W), O = n.add(O, O), O = n.add(O, O), new g(M, _, O);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      m(C);
      const { px: F, py: R, pz: G } = this, { px: T, py: j, pz: M } = C;
      let _ = n.ZERO, O = n.ZERO, P = n.ZERO;
      const W = t.a, U = n.mul(t.b, gA);
      let J = n.mul(F, T), ee = n.mul(R, j), B = n.mul(G, M), c = n.add(F, R), A = n.add(T, j);
      c = n.mul(c, A), A = n.add(J, ee), c = n.sub(c, A), A = n.add(F, G);
      let h = n.add(T, M);
      return A = n.mul(A, h), h = n.add(J, B), A = n.sub(A, h), h = n.add(R, G), _ = n.add(j, M), h = n.mul(h, _), _ = n.add(ee, B), h = n.sub(h, _), P = n.mul(W, A), _ = n.mul(U, B), P = n.add(_, P), _ = n.sub(ee, P), P = n.add(ee, P), O = n.mul(_, P), ee = n.add(J, J), ee = n.add(ee, J), B = n.mul(W, B), A = n.mul(U, A), ee = n.add(ee, B), B = n.sub(J, B), B = n.mul(W, B), A = n.add(A, B), J = n.mul(ee, A), O = n.add(O, J), J = n.mul(h, A), _ = n.mul(c, _), _ = n.sub(_, J), J = n.mul(c, ee), P = n.mul(h, P), P = n.add(P, J), new g(_, O, P);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(g.ZERO);
    }
    wNAF(C) {
      return Q.wNAFCached(this, l, C, (F) => {
        const R = n.invertBatch(F.map((G) => G.pz));
        return F.map((G, T) => G.toAffine(R[T])).map(g.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const F = g.ZERO;
      if (C === fn)
        return F;
      if (a(C), C === Jt)
        return this;
      const { endo: R } = t;
      if (!R)
        return Q.unsafeLadder(this, C);
      let { k1neg: G, k1: T, k2neg: j, k2: M } = R.splitScalar(C), _ = F, O = F, P = this;
      for (; T > fn || M > fn; )
        T & Jt && (_ = _.add(P)), M & Jt && (O = O.add(P)), P = P.double(), T >>= Jt, M >>= Jt;
      return G && (_ = _.negate()), j && (O = O.negate()), O = new g(n.mul(O.px, R.beta), O.py, O.pz), _.add(O);
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
      a(C);
      let F = C, R, G;
      const { endo: T } = t;
      if (T) {
        const { k1neg: j, k1: M, k2neg: _, k2: O } = T.splitScalar(F);
        let { p: P, f: W } = this.wNAF(M), { p: U, f: J } = this.wNAF(O);
        P = Q.constTimeNegate(j, P), U = Q.constTimeNegate(_, U), U = new g(n.mul(U.px, T.beta), U.py, U.pz), R = P.add(U), G = W.add(J);
      } else {
        const { p: j, f: M } = this.wNAF(F);
        R = j, G = M;
      }
      return g.normalizeZ([R, G])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, F, R) {
      const G = g.BASE, T = (M, _) => _ === fn || _ === Jt || !M.equals(G) ? M.multiplyUnsafe(_) : M.multiply(_), j = T(this, F).add(T(C, R));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: F, py: R, pz: G } = this, T = this.is0();
      C == null && (C = T ? n.ONE : n.inv(G));
      const j = n.mul(F, C), M = n.mul(R, C), _ = n.mul(G, C);
      if (T)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(_, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: M };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: F } = t;
      if (C === Jt)
        return !0;
      if (F)
        return F(g, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: F } = t;
      return C === Jt ? this : F ? F(g, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(g, this, C);
    }
    toHex(C = !0) {
      return br(this.toRawBytes(C));
    }
  }
  g.BASE = new g(t.Gx, t.Gy, n.ONE), g.ZERO = new g(n.ZERO, n.ONE, n.ZERO);
  const b = t.nBitLength, Q = Xw(g, t.endo ? Math.ceil(b / 2) : b);
  return {
    CURVE: t,
    ProjectivePoint: g,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function $w(e) {
  const t = g0(e);
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
function Kw(e) {
  const t = $w(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return fn < A && A < n.ORDER;
  }
  function a(A) {
    return Ft(A, r);
  }
  function d(A) {
    return Jo(A, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: m, weierstrassEquation: g, isWithinCurveOrder: b } = Ww({
    ...t,
    toBytes(A, h, w) {
      const f = h.toAffine(), I = n.toBytes(f.x), y = ts;
      return w ? y(Uint8Array.from([h.hasEvenY() ? 2 : 3]), I) : y(Uint8Array.from([4]), I, n.toBytes(f.y));
    },
    fromBytes(A) {
      const h = A.length, w = A[0], f = A.subarray(1);
      if (h === s && (w === 2 || w === 3)) {
        const I = jn(f);
        if (!o(I))
          throw new Error("Point is not on curve");
        const y = g(I);
        let p = n.sqrt(y);
        const u = (p & Jt) === Jt;
        return (w & 1) === 1 !== u && (p = n.neg(p)), { x: I, y: p };
      } else if (h === i && w === 4) {
        const I = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: I, y };
      } else
        throw new Error(`Point of length ${h} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), Q = (A) => br(vr(A, t.nByteLength));
  function v(A) {
    const h = r >> Jt;
    return A > h;
  }
  function C(A) {
    return v(A) ? a(-A) : A;
  }
  const F = (A, h, w) => jn(A.slice(h, w));
  class R {
    constructor(h, w, f) {
      this.r = h, this.s = w, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(h) {
      const w = t.nByteLength;
      return h = $t("compactSignature", h, w * 2), new R(F(h, 0, w), F(h, w, 2 * w));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(h) {
      const { r: w, s: f } = Vn.toSig($t("DER", h));
      return new R(w, f);
    }
    assertValidity() {
      if (!b(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!b(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(h) {
      return new R(this.r, this.s, h);
    }
    recoverPublicKey(h) {
      const { r: w, s: f, recovery: I } = this, y = O($t("msgHash", h));
      if (I == null || ![0, 1, 2, 3].includes(I))
        throw new Error("recovery id invalid");
      const p = I === 2 || I === 3 ? w + t.n : w;
      if (p >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = I & 1 ? "03" : "02", E = l.fromHex(u + Q(p)), Z = d(p), X = a(-y * Z), K = a(f * Z), q = l.BASE.multiplyAndAddUnsafe(E, X, K);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return v(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new R(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Qr(this.toDERHex());
    }
    toDERHex() {
      return Vn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Qr(this.toCompactHex());
    }
    toCompactHex() {
      return Q(this.r) + Q(this.s);
    }
  }
  const G = {
    isValidPrivateKey(A) {
      try {
        return m(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: m,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = f0(t.n);
      return Zw(t.randomBytes(A), t.n);
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
    const h = An(A), w = typeof A == "string", f = (h || w) && A.length;
    return h ? f === s || f === i : w ? f === 2 * s || f === 2 * i : A instanceof l;
  }
  function M(A, h, w = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(h))
      throw new Error("second arg must be public key");
    return l.fromHex(h).multiply(m(A)).toRawBytes(w);
  }
  const _ = t.bits2int || function(A) {
    const h = jn(A), w = A.length * 8 - t.nBitLength;
    return w > 0 ? h >> BigInt(w) : h;
  }, O = t.bits2int_modN || function(A) {
    return a(_(A));
  }, P = Ra(t.nBitLength);
  function W(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(fn <= A && A < P))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return vr(A, t.nByteLength);
  }
  function U(A, h, w = J) {
    if (["recovered", "canonical"].some((re) => re in w))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: I } = t;
    let { lowS: y, prehash: p, extraEntropy: u } = w;
    y == null && (y = !0), A = $t("msgHash", A), p && (A = $t("prehashed msgHash", f(A)));
    const E = O(A), Z = m(h), X = [W(Z), W(E)];
    if (u != null) {
      const re = u === !0 ? I(n.BYTES) : u;
      X.push($t("extraEntropy", re));
    }
    const K = ts(...X), q = E;
    function ne(re) {
      const Me = _(re);
      if (!b(Me))
        return;
      const pe = d(Me), oe = l.BASE.multiply(Me).toAffine(), Re = a(oe.x);
      if (Re === fn)
        return;
      const he = a(pe * a(q + Re * Z));
      if (he === fn)
        return;
      let me = (oe.x === Re ? 0 : 2) | Number(oe.y & Jt), en = he;
      return y && v(he) && (en = C(he), me ^= 1), new R(Re, en, me);
    }
    return { seed: K, k2sig: ne };
  }
  const J = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function B(A, h, w = J) {
    const { seed: f, k2sig: I } = U(A, h, w), y = t;
    return d0(y.hash.outputLen, y.nByteLength, y.hmac)(f, I);
  }
  l.BASE._setWindowSize(8);
  function c(A, h, w, f = ee) {
    var oe;
    const I = A;
    if (h = $t("msgHash", h), w = $t("publicKey", w), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: p } = f;
    let u, E;
    try {
      if (typeof I == "string" || An(I))
        try {
          u = R.fromDER(I);
        } catch (Re) {
          if (!(Re instanceof Vn.Err))
            throw Re;
          u = R.fromCompact(I);
        }
      else if (typeof I == "object" && typeof I.r == "bigint" && typeof I.s == "bigint") {
        const { r: Re, s: he } = I;
        u = new R(Re, he);
      } else
        throw new Error("PARSE");
      E = l.fromHex(w);
    } catch (Re) {
      if (Re.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    p && (h = t.hash(h));
    const { r: Z, s: X } = u, K = O(h), q = d(X), ne = a(K * q), re = a(Z * q), Me = (oe = l.BASE.multiplyAndAddUnsafe(E, ne, re)) == null ? void 0 : oe.toAffine();
    return Me ? a(Me.x) === Z : !1;
  }
  return {
    CURVE: t,
    getPublicKey: T,
    getSharedSecret: M,
    sign: B,
    verify: c,
    ProjectivePoint: l,
    Signature: R,
    utils: G
  };
}
class p0 extends c0 {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, dw(t);
    const r = xa(n);
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
    return si(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    si(this), o0(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const m0 = (e, t, n) => new p0(e, t).update(n).digest();
m0.create = (e, t) => new p0(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function zw(e) {
  return {
    hash: e,
    hmac: (t, ...n) => m0(e, t, gw(...n)),
    randomBytes: mw
  };
}
function eE(e, t) {
  const n = (r) => Kw({ ...e, ...zw(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const w0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), pA = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), tE = BigInt(1), Zo = BigInt(2), mA = (e, t) => (e + t / Zo) / t;
function nE(e) {
  const t = w0, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), d = BigInt(88), l = e * e * e % t, m = l * l * e % t, g = Ht(m, n, t) * m % t, b = Ht(g, n, t) * m % t, Q = Ht(b, Zo, t) * l % t, v = Ht(Q, s, t) * Q % t, C = Ht(v, i, t) * v % t, F = Ht(C, a, t) * C % t, R = Ht(F, d, t) * F % t, G = Ht(R, a, t) * C % t, T = Ht(G, n, t) * m % t, j = Ht(T, o, t) * v % t, M = Ht(j, r, t) * l % t, _ = Ht(M, Zo, t);
  if (!Yo.eql(Yo.sqr(_), e))
    throw new Error("Cannot find square root");
  return _;
}
const Yo = Jw(w0, void 0, void 0, { sqrt: nE }), bn = eE({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Yo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: pA,
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
      const t = pA, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -tE * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), a = mA(i * e, t), d = mA(-r * e, t);
      let l = Ft(e - a * n - d * s, t), m = Ft(-a * r - d * i, t);
      const g = l > o, b = m > o;
      if (g && (l = t - l), b && (m = t - m), l > o || m > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: g, k1: l, k2neg: b, k2: m };
    }
  }
}, bw);
BigInt(0);
bn.ProjectivePoint;
var Sa = { exports: {} }, lr = typeof Reflect == "object" ? Reflect : null, wA = lr && typeof lr.apply == "function" ? lr.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Js;
lr && typeof lr.ownKeys == "function" ? Js = lr.ownKeys : Object.getOwnPropertySymbols ? Js = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Js = function(t) {
  return Object.getOwnPropertyNames(t);
};
function rE(e) {
  console && console.warn && console.warn(e);
}
var E0 = Number.isNaN || function(t) {
  return t !== t;
};
function Qe() {
  Qe.init.call(this);
}
Sa.exports = Qe;
Sa.exports.once = aE;
Qe.EventEmitter = Qe;
Qe.prototype._events = void 0;
Qe.prototype._eventsCount = 0;
Qe.prototype._maxListeners = void 0;
var EA = 10;
function Qi(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Qe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return EA;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || E0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    EA = e;
  }
});
Qe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Qe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || E0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function I0(e) {
  return e._maxListeners === void 0 ? Qe.defaultMaxListeners : e._maxListeners;
}
Qe.prototype.getMaxListeners = function() {
  return I0(this);
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
    var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw a.context = o, a;
  }
  var d = i[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    wA(d, this, n);
  else
    for (var l = d.length, m = Q0(d, l), r = 0; r < l; ++r)
      wA(m[r], this, n);
  return !0;
};
function y0(e, t, n, r) {
  var s, i, o;
  if (Qi(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = I0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var a = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    a.name = "MaxListenersExceededWarning", a.emitter = e, a.type = t, a.count = o.length, rE(a);
  }
  return e;
}
Qe.prototype.addListener = function(t, n) {
  return y0(this, t, n, !1);
};
Qe.prototype.on = Qe.prototype.addListener;
Qe.prototype.prependListener = function(t, n) {
  return y0(this, t, n, !0);
};
function sE() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function B0(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = sE.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Qe.prototype.once = function(t, n) {
  return Qi(n), this.on(t, B0(this, t, n)), this;
};
Qe.prototype.prependOnceListener = function(t, n) {
  return Qi(n), this.prependListener(t, B0(this, t, n)), this;
};
Qe.prototype.removeListener = function(t, n) {
  var r, s, i, o, a;
  if (Qi(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : iE(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, a || n);
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
function C0(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? oE(s) : Q0(s, s.length);
}
Qe.prototype.listeners = function(t) {
  return C0(this, t, !0);
};
Qe.prototype.rawListeners = function(t) {
  return C0(this, t, !1);
};
Qe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : b0.call(e, t);
};
Qe.prototype.listenerCount = b0;
function b0(e) {
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
  return this._eventsCount > 0 ? Js(this._events) : [];
};
function Q0(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function iE(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function oE(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function aE(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    v0(e, t, i, { once: !0 }), t !== "error" && cE(e, s, { once: !0 });
  });
}
function cE(e, t, n) {
  typeof e.on == "function" && v0(e, "error", t, n);
}
function v0(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var x0 = Sa.exports, AE = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
function xr(e) {
  return Te(e);
}
var uE = class {
  constructor(e, t, n, r, s, i = 0) {
    N(this, "left");
    N(this, "right");
    N(this, "parent");
    N(this, "hash");
    N(this, "data");
    N(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, IA = uE;
function dE(e) {
  return xr("0x00".concat(e.slice(2)));
}
function lE(e, t) {
  return xr("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function F0(e) {
  if (!e.length)
    return AE;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = dE(e[i]);
    t.push(new IA(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, a = lE(n[o].hash, n[o + 1].hash);
      t[i] = new IA(n[o].index, n[o + 1].index, -1, a, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var hE = "0x00", N0 = "0x01";
function fE(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(xr(t).slice(2));
  return [xr(n), n];
}
function tr(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [xr(n), n];
}
function lo(e) {
  const t = N0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function gE(e) {
  const t = N0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function ho(e) {
  return e.slice(0, 4) === hE;
}
var pE = class {
  constructor(e, t, n, r, s) {
    N(this, "SideNodes");
    N(this, "NonMembershipLeafData");
    N(this, "BitMask");
    N(this, "NumSideNodes");
    N(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, mE = pE, wE = class {
  constructor(e, t, n) {
    N(this, "SideNodes");
    N(this, "NonMembershipLeafData");
    N(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, EE = wE, Mt = "0x0000000000000000000000000000000000000000000000000000000000000000", hn = 256;
function cr(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function IE(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function yE(e, t) {
  let n = 0;
  for (let r = 0; r < hn && cr(e, r) === cr(t, r); r += 1)
    n += 1;
  return n;
}
function BE(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === Mt ? t.push(0) : (n.push(r), t.push(1));
  return new mE(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var CE = class {
  constructor() {
    N(this, "ms");
    N(this, "root");
    const e = {};
    this.ms = e, this.root = Mt, this.ms[this.root] = Mt;
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
    if (t === Mt)
      return [n, Mt, "", ""];
    let r = this.get(t);
    if (ho(r))
      return [n, t, r, ""];
    let s, i, o = "", a = "";
    for (let l = 0; l < hn; l += 1) {
      if ([s, i] = gE(r), cr(e, l) === 1 ? (a = s, o = i) : (a = i, o = s), n.push(a), o === Mt) {
        r = "";
        break;
      }
      if (r = this.get(o), ho(r))
        break;
    }
    const d = this.get(a);
    return [IE(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === Mt)
      return this.root;
    const [s] = lo(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", a = "", d = "", l = !1;
    for (let m = 0; m < t.length; m += 1)
      if (t[m] !== "") {
        if (a = t[m], o === "")
          if (d = this.get(a), ho(d)) {
            i = a, o = a;
            continue;
          } else
            o = Mt, l = !0;
        !l && a === Mt || (l || (l = !0), cr(e, t.length - 1 - m) === 1 ? [i, o] = tr(a, o) : [i, o] = tr(o, a), this.set(i, o), o = i);
      }
    return i === "" && (i = Mt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(xr(t), t), [i, o] = fE(e, t), this.set(i, o), o = i;
    let a;
    if (r === Mt)
      a = hn;
    else {
      const [d] = lo(s);
      a = yE(e, d);
    }
    a !== hn && (cr(e, a) === 1 ? [i, o] = tr(r, o) : [i, o] = tr(o, r), this.set(i, o), o = i);
    for (let d = 0; d < hn; d += 1) {
      let l;
      const m = hn - n.length;
      if (d - m < 0 || n[d - m] === "")
        if (a !== hn && a > hn - 1 - d)
          l = Mt;
        else
          continue;
      else
        l = n[d - m];
      cr(e, hn - 1 - d) === 1 ? [i, o] = tr(l, o) : [i, o] = tr(o, l), this.set(i, o), o = i;
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
    if (n !== Mt) {
      const [d] = lo(r);
      d !== e && (o = r);
    }
    return new EE(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return BE(t);
  }
}, D0 = {}, vi = {}, fs = {};
(function(e) {
  var t = se && se.__extends || function() {
    var Q = function(v, C) {
      return Q = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(F, R) {
        F.__proto__ = R;
      } || function(F, R) {
        for (var G in R)
          Object.prototype.hasOwnProperty.call(R, G) && (F[G] = R[G]);
      }, Q(v, C);
    };
    return function(v, C) {
      if (typeof C != "function" && C !== null)
        throw new TypeError("Class extends value " + String(C) + " is not a constructor or null");
      Q(v, C);
      function F() {
        this.constructor = v;
      }
      v.prototype = C === null ? Object.create(C) : (F.prototype = C.prototype, new F());
    };
  }();
  Object.defineProperty(e, "__esModule", { value: !0 }), e.createJSONRPCNotification = e.createJSONRPCRequest = e.createJSONRPCSuccessResponse = e.createJSONRPCErrorResponse = e.JSONRPCErrorCode = e.JSONRPCErrorException = e.isJSONRPCResponses = e.isJSONRPCResponse = e.isJSONRPCRequests = e.isJSONRPCRequest = e.isJSONRPCID = e.JSONRPC = void 0, e.JSONRPC = "2.0";
  var n = function(Q) {
    return typeof Q == "string" || typeof Q == "number" || Q === null;
  };
  e.isJSONRPCID = n;
  var r = function(Q) {
    return Q.jsonrpc === e.JSONRPC && Q.method !== void 0 && Q.result === void 0 && Q.error === void 0;
  };
  e.isJSONRPCRequest = r;
  var s = function(Q) {
    return Array.isArray(Q) && Q.every(e.isJSONRPCRequest);
  };
  e.isJSONRPCRequests = s;
  var i = function(Q) {
    return Q.jsonrpc === e.JSONRPC && Q.id !== void 0 && (Q.result !== void 0 || Q.error !== void 0);
  };
  e.isJSONRPCResponse = i;
  var o = function(Q) {
    return Array.isArray(Q) && Q.every(e.isJSONRPCResponse);
  };
  e.isJSONRPCResponses = o;
  var a = function(Q, v, C) {
    var F = { code: Q, message: v };
    return C != null && (F.data = C), F;
  }, d = (
    /** @class */
    function(Q) {
      t(v, Q);
      function v(C, F, R) {
        var G = Q.call(this, C) || this;
        return Object.setPrototypeOf(G, v.prototype), G.code = F, G.data = R, G;
      }
      return v.prototype.toObject = function() {
        return a(this.code, this.message, this.data);
      }, v;
    }(Error)
  );
  e.JSONRPCErrorException = d, function(Q) {
    Q[Q.ParseError = -32700] = "ParseError", Q[Q.InvalidRequest = -32600] = "InvalidRequest", Q[Q.MethodNotFound = -32601] = "MethodNotFound", Q[Q.InvalidParams = -32602] = "InvalidParams", Q[Q.InternalError = -32603] = "InternalError";
  }(e.JSONRPCErrorCode || (e.JSONRPCErrorCode = {}));
  var l = function(Q, v, C, F) {
    return {
      jsonrpc: e.JSONRPC,
      id: Q,
      error: a(v, C, F)
    };
  };
  e.createJSONRPCErrorResponse = l;
  var m = function(Q, v) {
    return {
      jsonrpc: e.JSONRPC,
      id: Q,
      result: v ?? null
    };
  };
  e.createJSONRPCSuccessResponse = m;
  var g = function(Q, v, C) {
    return {
      jsonrpc: e.JSONRPC,
      id: Q,
      method: v,
      params: C
    };
  };
  e.createJSONRPCRequest = g;
  var b = function(Q, v) {
    return {
      jsonrpc: e.JSONRPC,
      method: Q,
      params: v
    };
  };
  e.createJSONRPCNotification = b;
})(fs);
var gs = {};
Object.defineProperty(gs, "__esModule", { value: !0 });
gs.DefaultErrorCode = void 0;
gs.DefaultErrorCode = 0;
var yA = se && se.__awaiter || function(e, t, n, r) {
  function s(i) {
    return i instanceof n ? i : new n(function(o) {
      o(i);
    });
  }
  return new (n || (n = Promise))(function(i, o) {
    function a(m) {
      try {
        l(r.next(m));
      } catch (g) {
        o(g);
      }
    }
    function d(m) {
      try {
        l(r.throw(m));
      } catch (g) {
        o(g);
      }
    }
    function l(m) {
      m.done ? i(m.value) : s(m.value).then(a, d);
    }
    l((r = r.apply(e, t || [])).next());
  });
}, BA = se && se.__generator || function(e, t) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, s, i, o;
  return o = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(l) {
    return function(m) {
      return d([l, m]);
    };
  }
  function d(l) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, l[0] && (n = 0)), n; )
      try {
        if (r = 1, s && (i = l[0] & 2 ? s.return : l[0] ? s.throw || ((i = s.return) && i.call(s), 0) : s.next) && !(i = i.call(s, l[1])).done)
          return i;
        switch (s = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
          case 0:
          case 1:
            i = l;
            break;
          case 4:
            return n.label++, { value: l[1], done: !1 };
          case 5:
            n.label++, s = l[1], l = [0];
            continue;
          case 7:
            l = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              n = 0;
              continue;
            }
            if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
              n.label = l[1];
              break;
            }
            if (l[0] === 6 && n.label < i[1]) {
              n.label = i[1], i = l;
              break;
            }
            if (i && n.label < i[2]) {
              n.label = i[2], n.ops.push(l);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        l = t.call(e, n);
      } catch (m) {
        l = [6, m], s = 0;
      } finally {
        r = i = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
};
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.JSONRPCClient = void 0;
var nr = fs, fo = gs, bE = (
  /** @class */
  function() {
    function e(t, n) {
      this._send = t, this.createID = n, this.idToResolveMap = /* @__PURE__ */ new Map(), this.id = 0;
    }
    return e.prototype._createID = function() {
      return this.createID ? this.createID() : ++this.id;
    }, e.prototype.timeout = function(t, n) {
      var r = this;
      n === void 0 && (n = function(o) {
        return (0, nr.createJSONRPCErrorResponse)(o, fo.DefaultErrorCode, "Request timeout");
      });
      var s = function(o, a) {
        var d = setTimeout(function() {
          o.forEach(function(l) {
            var m = r.idToResolveMap.get(l);
            m && (r.idToResolveMap.delete(l), m(n(l)));
          });
        }, t);
        return a().then(function(l) {
          return clearTimeout(d), l;
        }, function(l) {
          return clearTimeout(d), Promise.reject(l);
        });
      }, i = function(o, a) {
        var d = (Array.isArray(o) ? o : [o]).map(function(l) {
          return l.id;
        }).filter(CA);
        return s(d, function() {
          return r.requestAdvanced(o, a);
        });
      };
      return {
        request: function(o, a, d) {
          var l = r._createID();
          return s([l], function() {
            return r.requestWithID(o, a, d, l);
          });
        },
        requestAdvanced: function(o, a) {
          return i(o, a);
        }
      };
    }, e.prototype.request = function(t, n, r) {
      return this.requestWithID(t, n, r, this._createID());
    }, e.prototype.requestWithID = function(t, n, r, s) {
      return yA(this, void 0, void 0, function() {
        var i, o;
        return BA(this, function(a) {
          switch (a.label) {
            case 0:
              return i = (0, nr.createJSONRPCRequest)(s, t, n), [4, this.requestAdvanced(i, r)];
            case 1:
              return o = a.sent(), o.result !== void 0 && !o.error ? [2, o.result] : o.result === void 0 && o.error ? [2, Promise.reject(new nr.JSONRPCErrorException(o.error.message, o.error.code, o.error.data))] : [2, Promise.reject(new Error("An unexpected error occurred"))];
          }
        });
      });
    }, e.prototype.requestAdvanced = function(t, n) {
      var r = this, s = Array.isArray(t);
      Array.isArray(t) || (t = [t]);
      var i = t.filter(function(d) {
        return CA(d.id);
      }), o = i.map(function(d) {
        return new Promise(function(l) {
          return r.idToResolveMap.set(d.id, l);
        });
      }), a = Promise.all(o).then(function(d) {
        return s || !d.length ? d : d[0];
      });
      return this.send(s ? t : t[0], n).then(function() {
        return a;
      }, function(d) {
        return i.forEach(function(l) {
          r.receive((0, nr.createJSONRPCErrorResponse)(l.id, fo.DefaultErrorCode, d && d.message || "Failed to send a request"));
        }), a;
      });
    }, e.prototype.notify = function(t, n, r) {
      var s = (0, nr.createJSONRPCNotification)(t, n);
      this.send(s, r).then(void 0, function() {
      });
    }, e.prototype.send = function(t, n) {
      return yA(this, void 0, void 0, function() {
        return BA(this, function(r) {
          return [2, this._send(t, n)];
        });
      });
    }, e.prototype.rejectAllPendingRequests = function(t) {
      this.idToResolveMap.forEach(function(n, r) {
        return n((0, nr.createJSONRPCErrorResponse)(r, fo.DefaultErrorCode, t));
      }), this.idToResolveMap.clear();
    }, e.prototype.receive = function(t) {
      var n = this;
      Array.isArray(t) || (t = [t]), t.forEach(function(r) {
        var s = n.idToResolveMap.get(r.id);
        s && (n.idToResolveMap.delete(r.id), s(r));
      });
    }, e;
  }()
);
vi.JSONRPCClient = bE;
var CA = function(e) {
  return e != null;
}, R0 = {};
Object.defineProperty(R0, "__esModule", { value: !0 });
var xi = {}, ii = se && se.__assign || function() {
  return ii = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
  }, ii.apply(this, arguments);
}, bA = se && se.__awaiter || function(e, t, n, r) {
  function s(i) {
    return i instanceof n ? i : new n(function(o) {
      o(i);
    });
  }
  return new (n || (n = Promise))(function(i, o) {
    function a(m) {
      try {
        l(r.next(m));
      } catch (g) {
        o(g);
      }
    }
    function d(m) {
      try {
        l(r.throw(m));
      } catch (g) {
        o(g);
      }
    }
    function l(m) {
      m.done ? i(m.value) : s(m.value).then(a, d);
    }
    l((r = r.apply(e, t || [])).next());
  });
}, QA = se && se.__generator || function(e, t) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, s, i, o;
  return o = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(l) {
    return function(m) {
      return d([l, m]);
    };
  }
  function d(l) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, l[0] && (n = 0)), n; )
      try {
        if (r = 1, s && (i = l[0] & 2 ? s.return : l[0] ? s.throw || ((i = s.return) && i.call(s), 0) : s.next) && !(i = i.call(s, l[1])).done)
          return i;
        switch (s = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
          case 0:
          case 1:
            i = l;
            break;
          case 4:
            return n.label++, { value: l[1], done: !1 };
          case 5:
            n.label++, s = l[1], l = [0];
            continue;
          case 7:
            l = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              n = 0;
              continue;
            }
            if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
              n.label = l[1];
              break;
            }
            if (l[0] === 6 && n.label < i[1]) {
              n.label = i[1], i = l;
              break;
            }
            if (i && n.label < i[2]) {
              n.label = i[2], n.ops.push(l);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        l = t.call(e, n);
      } catch (m) {
        l = [6, m], s = 0;
      } finally {
        r = i = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}, QE = se && se.__spreadArray || function(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, s = t.length, i; r < s; r++)
      (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
};
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.JSONRPCServer = void 0;
var Ut = fs, vE = gs, xE = function() {
  return (0, Ut.createJSONRPCErrorResponse)(null, Ut.JSONRPCErrorCode.ParseError, "Parse error");
}, FE = function(e) {
  return (0, Ut.createJSONRPCErrorResponse)((0, Ut.isJSONRPCID)(e.id) ? e.id : null, Ut.JSONRPCErrorCode.InvalidRequest, "Invalid Request");
}, NE = function(e) {
  return (0, Ut.createJSONRPCErrorResponse)(e, Ut.JSONRPCErrorCode.MethodNotFound, "Method not found");
}, DE = (
  /** @class */
  function() {
    function e(t) {
      t === void 0 && (t = {});
      var n;
      this.mapErrorToJSONRPCErrorResponse = kE, this.nameToMethodDictionary = {}, this.middleware = null, this.errorListener = (n = t.errorListener) !== null && n !== void 0 ? n : console.warn;
    }
    return e.prototype.hasMethod = function(t) {
      return !!this.nameToMethodDictionary[t];
    }, e.prototype.addMethod = function(t, n) {
      this.addMethodAdvanced(t, this.toJSONRPCMethod(n));
    }, e.prototype.removeMethod = function(t) {
      delete this.nameToMethodDictionary[t];
    }, e.prototype.toJSONRPCMethod = function(t) {
      return function(n, r) {
        var s = t(n.params, r);
        return Promise.resolve(s).then(function(i) {
          return _E(n.id, i);
        });
      };
    }, e.prototype.addMethodAdvanced = function(t, n) {
      var r;
      this.nameToMethodDictionary = ii(ii({}, this.nameToMethodDictionary), (r = {}, r[t] = n, r));
    }, e.prototype.receiveJSON = function(t, n) {
      var r = this.tryParseRequestJSON(t);
      return r ? this.receive(r, n) : Promise.resolve(xE());
    }, e.prototype.tryParseRequestJSON = function(t) {
      try {
        return JSON.parse(t);
      } catch {
        return null;
      }
    }, e.prototype.receive = function(t, n) {
      return Array.isArray(t) ? this.receiveMultiple(t, n) : this.receiveSingle(t, n);
    }, e.prototype.receiveMultiple = function(t, n) {
      return bA(this, void 0, void 0, function() {
        var r, s = this;
        return QA(this, function(i) {
          switch (i.label) {
            case 0:
              return [4, Promise.all(t.map(function(o) {
                return s.receiveSingle(o, n);
              }))];
            case 1:
              return r = i.sent().filter(RE), r.length === 1 ? [2, r[0]] : r.length ? [2, r] : [2, null];
          }
        });
      });
    }, e.prototype.receiveSingle = function(t, n) {
      return bA(this, void 0, void 0, function() {
        var r, s;
        return QA(this, function(i) {
          switch (i.label) {
            case 0:
              return r = this.nameToMethodDictionary[t.method], (0, Ut.isJSONRPCRequest)(t) ? [3, 1] : [2, FE(t)];
            case 1:
              return [4, this.callMethod(r, t, n)];
            case 2:
              return s = i.sent(), [2, ME(t, s)];
          }
        });
      });
    }, e.prototype.applyMiddleware = function() {
      for (var t = [], n = 0; n < arguments.length; n++)
        t[n] = arguments[n];
      this.middleware ? this.middleware = this.combineMiddlewares(QE([
        this.middleware
      ], t, !0)) : this.middleware = this.combineMiddlewares(t);
    }, e.prototype.combineMiddlewares = function(t) {
      return t.length ? t.reduce(this.middlewareReducer) : null;
    }, e.prototype.middlewareReducer = function(t, n) {
      return function(r, s, i) {
        return t(function(o, a) {
          return n(r, o, a);
        }, s, i);
      };
    }, e.prototype.callMethod = function(t, n, r) {
      var s = this, i = function(a, d) {
        return t ? t(a, d) : a.id !== void 0 ? Promise.resolve(NE(a.id)) : Promise.resolve(null);
      }, o = function(a) {
        return s.errorListener('An unexpected error occurred while executing "'.concat(n.method, '" JSON-RPC method:'), a), Promise.resolve(s.mapErrorToJSONRPCErrorResponseIfNecessary(n.id, a));
      };
      try {
        return (this.middleware || SE)(i, n, r).then(void 0, o);
      } catch (a) {
        return o(a);
      }
    }, e.prototype.mapErrorToJSONRPCErrorResponseIfNecessary = function(t, n) {
      return t !== void 0 ? this.mapErrorToJSONRPCErrorResponse(t, n) : null;
    }, e;
  }()
);
xi.JSONRPCServer = DE;
var RE = function(e) {
  return e !== null;
}, SE = function(e, t, n) {
  return e(t, n);
}, _E = function(e, t) {
  return e !== void 0 ? (0, Ut.createJSONRPCSuccessResponse)(e, t) : null;
}, kE = function(e, t) {
  var n, r = (n = t == null ? void 0 : t.message) !== null && n !== void 0 ? n : "An unexpected error occurred", s = vE.DefaultErrorCode, i;
  return t instanceof Ut.JSONRPCErrorException && (s = t.code, i = t.data), (0, Ut.createJSONRPCErrorResponse)(e, s, r, i);
}, ME = function(e, t) {
  return t || (e.id !== void 0 ? (0, Ut.createJSONRPCErrorResponse)(e.id, Ut.JSONRPCErrorCode.InternalError, "Internal error") : null);
}, Fi = {}, OE = se && se.__awaiter || function(e, t, n, r) {
  function s(i) {
    return i instanceof n ? i : new n(function(o) {
      o(i);
    });
  }
  return new (n || (n = Promise))(function(i, o) {
    function a(m) {
      try {
        l(r.next(m));
      } catch (g) {
        o(g);
      }
    }
    function d(m) {
      try {
        l(r.throw(m));
      } catch (g) {
        o(g);
      }
    }
    function l(m) {
      m.done ? i(m.value) : s(m.value).then(a, d);
    }
    l((r = r.apply(e, t || [])).next());
  });
}, LE = se && se.__generator || function(e, t) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, s, i, o;
  return o = { next: a(0), throw: a(1), return: a(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(l) {
    return function(m) {
      return d([l, m]);
    };
  }
  function d(l) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, l[0] && (n = 0)), n; )
      try {
        if (r = 1, s && (i = l[0] & 2 ? s.return : l[0] ? s.throw || ((i = s.return) && i.call(s), 0) : s.next) && !(i = i.call(s, l[1])).done)
          return i;
        switch (s = 0, i && (l = [l[0] & 2, i.value]), l[0]) {
          case 0:
          case 1:
            i = l;
            break;
          case 4:
            return n.label++, { value: l[1], done: !1 };
          case 5:
            n.label++, s = l[1], l = [0];
            continue;
          case 7:
            l = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (i = n.trys, !(i = i.length > 0 && i[i.length - 1]) && (l[0] === 6 || l[0] === 2)) {
              n = 0;
              continue;
            }
            if (l[0] === 3 && (!i || l[1] > i[0] && l[1] < i[3])) {
              n.label = l[1];
              break;
            }
            if (l[0] === 6 && n.label < i[1]) {
              n.label = i[1], i = l;
              break;
            }
            if (i && n.label < i[2]) {
              n.label = i[2], n.ops.push(l);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        l = t.call(e, n);
      } catch (m) {
        l = [6, m], s = 0;
      } finally {
        r = i = 0;
      }
    if (l[0] & 5)
      throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
};
Object.defineProperty(Fi, "__esModule", { value: !0 });
Fi.JSONRPCServerAndClient = void 0;
var Ns = fs, TE = (
  /** @class */
  function() {
    function e(t, n, r) {
      r === void 0 && (r = {});
      var s;
      this.server = t, this.client = n, this.errorListener = (s = r.errorListener) !== null && s !== void 0 ? s : console.warn;
    }
    return e.prototype.applyServerMiddleware = function() {
      for (var t, n = [], r = 0; r < arguments.length; r++)
        n[r] = arguments[r];
      (t = this.server).applyMiddleware.apply(t, n);
    }, e.prototype.hasMethod = function(t) {
      return this.server.hasMethod(t);
    }, e.prototype.addMethod = function(t, n) {
      this.server.addMethod(t, n);
    }, e.prototype.addMethodAdvanced = function(t, n) {
      this.server.addMethodAdvanced(t, n);
    }, e.prototype.removeMethod = function(t) {
      this.server.removeMethod(t);
    }, e.prototype.timeout = function(t) {
      return this.client.timeout(t);
    }, e.prototype.request = function(t, n, r) {
      return this.client.request(t, n, r);
    }, e.prototype.requestAdvanced = function(t, n) {
      return this.client.requestAdvanced(t, n);
    }, e.prototype.notify = function(t, n, r) {
      this.client.notify(t, n, r);
    }, e.prototype.rejectAllPendingRequests = function(t) {
      this.client.rejectAllPendingRequests(t);
    }, e.prototype.receiveAndSend = function(t, n, r) {
      return OE(this, void 0, void 0, function() {
        var s, i;
        return LE(this, function(o) {
          switch (o.label) {
            case 0:
              return (0, Ns.isJSONRPCResponse)(t) || (0, Ns.isJSONRPCResponses)(t) ? (this.client.receive(t), [3, 4]) : [3, 1];
            case 1:
              return (0, Ns.isJSONRPCRequest)(t) || (0, Ns.isJSONRPCRequests)(t) ? [4, this.server.receive(t, n)] : [3, 3];
            case 2:
              return s = o.sent(), s ? [2, this.client.send(s, r)] : [3, 4];
            case 3:
              return i = "Received an invalid JSON-RPC message", this.errorListener(i, t), [2, Promise.reject(new Error(i))];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e;
  }()
);
Fi.JSONRPCServerAndClient = TE;
(function(e) {
  var t = se && se.__createBinding || (Object.create ? function(r, s, i, o) {
    o === void 0 && (o = i);
    var a = Object.getOwnPropertyDescriptor(s, i);
    (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
      return s[i];
    } }), Object.defineProperty(r, o, a);
  } : function(r, s, i, o) {
    o === void 0 && (o = i), r[o] = s[i];
  }), n = se && se.__exportStar || function(r, s) {
    for (var i in r)
      i !== "default" && !Object.prototype.hasOwnProperty.call(s, i) && t(s, r, i);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(vi, e), n(R0, e), n(fs, e), n(xi, e), n(Fi, e);
})(D0);
var PE = Object.defineProperty, UE = (e, t, n) => t in e ? PE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ke = (e, t, n) => (UE(e, typeof t != "symbol" ? t + "" : t, n), n), _a = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, _e = (e, t, n) => (_a(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Fn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Kt = (e, t, n, r) => (_a(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Xo = (e, t, n) => (_a(e, t, "access private method"), n), ka = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1] ?? yt, r = e[2] ?? void 0) : (n = e.amount, t = e.assetId ?? yt, r = e.max ?? void 0);
  const s = x(n);
  return {
    assetId: V(t),
    amount: s.lt(1) ? x(1) : s,
    max: r ? x(r) : void 0
  };
}, GE = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, Ma = ce`
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
    `, Oa = ce`
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
    `, ps = ce`
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
    ${Ma}
${Oa}`, HE = ce`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, JE = ce`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${HE}`, La = ce`
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
    `, ZE = ce`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, YE = ce`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, XE = ce`
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
    `, S0 = ce`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, Ni = ce`
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
    `, VE = ce`
    fragment TxParametersFragment on TxParameters {
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, jE = ce`
    fragment PredicateParametersFragment on PredicateParameters {
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, qE = ce`
    fragment ScriptParametersFragment on ScriptParameters {
  maxScriptLength
  maxScriptDataLength
}
    `, WE = ce`
    fragment ContractParametersFragment on ContractParameters {
  contractMaxSize
  maxStorageSlots
}
    `, $E = ce`
    fragment FeeParametersFragment on FeeParameters {
  gasPriceFactor
  gasPerByte
}
    `, KE = ce`
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
    `, zE = ce`
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
    ${KE}`, eI = ce`
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
    ${VE}
${jE}
${qE}
${WE}
${$E}
${zE}`, tI = ce`
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
    ${Ni}
${eI}`, nI = ce`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, rI = ce`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, sI = ce`
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
    `, iI = ce`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, oI = ce`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${sI}`, aI = ce`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${tI}`, cI = ce`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${ps}`, AI = ce`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
    receipts {
      ...receiptFragment
    }
  }
}
    ${ps}
${Ma}`, uI = ce`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${ps}`, dI = ce`
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
    ${rI}
${ps}`, lI = ce`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${JE}`, hI = ce`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Ni}`, fI = ce`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${Ni}
${ps}`, gI = ce`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Ni}`, pI = ce`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${La}`, mI = ce`
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
    ${La}`, wI = ce`
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
    ${La}
${ZE}`, EI = ce`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, II = ce`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${nI}`, yI = ce`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${S0}`, BI = ce`
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
    ${S0}`, CI = ce`
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
    ${YE}`, bI = ce`
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
    ${XE}`, QI = ce`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, vI = ce`
    mutation dryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    ...receiptFragment
  }
}
    ${Ma}`, xI = ce`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, FI = ce`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, NI = ce`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusFragment
  }
}
    ${Oa}`, DI = ce`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusFragment
  }
}
    ${Oa}`;
function RI(e) {
  return {
    getVersion(t, n) {
      return e(iI, t, n);
    },
    getNodeInfo(t, n) {
      return e(oI, t, n);
    },
    getChain(t, n) {
      return e(aI, t, n);
    },
    getTransaction(t, n) {
      return e(cI, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(AI, t, n);
    },
    getTransactions(t, n) {
      return e(uI, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(dI, t, n);
    },
    estimatePredicates(t, n) {
      return e(lI, t, n);
    },
    getBlock(t, n) {
      return e(hI, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(fI, t, n);
    },
    getBlocks(t, n) {
      return e(gI, t, n);
    },
    getCoin(t, n) {
      return e(pI, t, n);
    },
    getCoins(t, n) {
      return e(mI, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(wI, t, n);
    },
    getContract(t, n) {
      return e(EI, t, n);
    },
    getContractBalance(t, n) {
      return e(II, t, n);
    },
    getBalance(t, n) {
      return e(yI, t, n);
    },
    getBalances(t, n) {
      return e(BI, t, n);
    },
    getMessages(t, n) {
      return e(CI, t, n);
    },
    getMessageProof(t, n) {
      return e(bI, t, n);
    },
    getMessageStatus(t, n) {
      return e(QI, t, n);
    },
    dryRun(t, n) {
      return e(vI, t, n);
    },
    submit(t, n) {
      return e(xI, t, n);
    },
    produceBlocks(t, n) {
      return e(FI, t, n);
    },
    submitAndAwait(t, n) {
      return e(NI, t, n);
    },
    statusChange(t, n) {
      return e(DI, t, n);
    }
  };
}
var _0 = class {
  constructor() {
    N(this, "readable");
    N(this, "writable");
    N(this, "readableStreamController");
    this.readable = new ReadableStream({
      start: (e) => {
        this.readableStreamController = e;
      }
    }), this.writable = new WritableStream({
      write: (e) => {
        const t = _0.textDecoder.decode(e);
        if (t.startsWith("data:")) {
          const { data: n, errors: r } = JSON.parse(t.split("data:")[1]);
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
}, k0 = _0;
ke(k0, "textDecoder", new TextDecoder());
async function* SI({
  url: e,
  variables: t,
  query: n,
  fetchFn: r
}) {
  const i = (await r(`${e}-sub`, {
    method: "POST",
    body: JSON.stringify({
      query: Pd(n),
      variables: t
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream"
    }
  })).body.pipeThrough(new k0()).getReader();
  for (; ; ) {
    const { value: o, done: a } = await i.read();
    if (o instanceof D)
      throw o;
    if (yield o, a)
      break;
  }
}
var Un = {}, _I = 30 * 1e3, kI = class {
  constructor(e = _I) {
    N(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new D(
        k.INVALID_TTL,
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
}, MI = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case be.Coin: {
      const n = Y(e.predicate ?? "0x"), r = Y(e.predicateData ?? "0x");
      return {
        type: be.Coin,
        txID: V(Y(e.id).slice(0, 32)),
        outputIndex: Y(e.id)[32],
        owner: V(e.owner),
        amount: x(e.amount),
        assetId: V(e.assetId),
        txPointer: {
          blockHeight: cn(Y(e.txPointer).slice(0, 8)),
          txIndex: cn(Y(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        maturity: e.maturity ?? 0,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: n.length,
        predicateDataLength: r.length,
        predicate: V(n),
        predicateData: V(r)
      };
    }
    case be.Contract:
      return {
        type: be.Contract,
        txID: Le,
        outputIndex: 0,
        balanceRoot: Le,
        stateRoot: Le,
        txPointer: {
          blockHeight: cn(Y(e.txPointer).slice(0, 8)),
          txIndex: cn(Y(e.txPointer).slice(8, 16))
        },
        contractID: V(e.contractId)
      };
    case be.Message: {
      const n = Y(e.predicate ?? "0x"), r = Y(e.predicateData ?? "0x"), s = Y(e.data ?? "0x");
      return {
        type: be.Message,
        sender: V(e.sender),
        recipient: V(e.recipient),
        amount: x(e.amount),
        nonce: V(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
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
        `Invalid transaction input type: ${t}.`
      );
  }
}, OI = (e) => {
  const { type: t } = e;
  switch (t) {
    case Be.Coin:
      return {
        type: Be.Coin,
        to: V(e.to),
        amount: x(e.amount),
        assetId: V(e.assetId)
      };
    case Be.Contract:
      return {
        type: Be.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Le,
        stateRoot: Le
      };
    case Be.Change:
      return {
        type: Be.Change,
        to: V(e.to),
        amount: x(0),
        assetId: V(e.assetId)
      };
    case Be.Variable:
      return {
        type: Be.Variable,
        to: Le,
        amount: x(0),
        assetId: Le
      };
    case Be.ContractCreated:
      return {
        type: Be.ContractCreated,
        contractId: V(e.contractId),
        stateRoot: V(e.stateRoot)
      };
    default:
      throw new D(
        k.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, vC = (e) => "utxoId" in e, xC = (e) => "recipient" in e, vA = (e) => "id" in e, FC = (e) => "recipient" in e, LI = (e) => e.type === de.Revert && e.val.toString("hex") === Cd, TI = (e) => e.type === de.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", PI = (e) => e.reduce(
  (t, n) => (LI(n) && t.missingOutputVariables.push(n), TI(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || Le;
function UI(e) {
  var n, r, s, i, o, a, d, l, m, g, b, Q, v, C;
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: de.Call,
        from: xe((n = e.contract) == null ? void 0 : n.id),
        to: xe((r = e == null ? void 0 : e.to) == null ? void 0 : r.id),
        amount: x(e.amount),
        assetId: xe(e.assetId),
        gas: x(e.gas),
        param1: x(e.param1),
        param2: x(e.param2),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "RETURN":
      return {
        type: de.Return,
        id: xe((s = e.contract) == null ? void 0 : s.id),
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "RETURN_DATA":
      return {
        type: de.ReturnData,
        id: xe((i = e.contract) == null ? void 0 : i.id),
        ptr: x(e.ptr),
        len: x(e.len),
        digest: xe(e.digest),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "PANIC":
      return {
        type: de.Panic,
        id: xe((o = e.contract) == null ? void 0 : o.id),
        reason: x(e.reason),
        pc: x(e.pc),
        is: x(e.is),
        contractId: xe(e.contractId)
      };
    case "REVERT":
      return {
        type: de.Revert,
        id: xe((a = e.contract) == null ? void 0 : a.id),
        val: x(e.ra),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG":
      return {
        type: de.Log,
        id: xe((d = e.contract) == null ? void 0 : d.id),
        val0: x(e.ra),
        val1: x(e.rb),
        val2: x(e.rc),
        val3: x(e.rd),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG_DATA":
      return {
        type: de.LogData,
        id: xe((l = e.contract) == null ? void 0 : l.id),
        val0: x(e.ra),
        val1: x(e.rb),
        ptr: x(e.ptr),
        len: x(e.len),
        digest: xe(e.digest),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "TRANSFER":
      return {
        type: de.Transfer,
        from: xe((m = e.contract) == null ? void 0 : m.id),
        to: xe(e.toAddress || ((g = e == null ? void 0 : e.to) == null ? void 0 : g.id)),
        amount: x(e.amount),
        assetId: xe(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: de.TransferOut,
        from: xe((b = e.contract) == null ? void 0 : b.id),
        to: xe(e.toAddress || ((Q = e.to) == null ? void 0 : Q.id)),
        amount: x(e.amount),
        assetId: xe(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: de.ScriptResult,
        result: x(e.result),
        gasUsed: x(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const F = xe(e.sender), R = xe(e.recipient), G = xe(e.nonce), T = x(e.amount), j = e.data ? Y(e.data) : Uint8Array.from([]), M = xe(e.digest), _ = $s.getMessageId({
        sender: F,
        recipient: R,
        nonce: G,
        amount: T,
        data: j
      });
      return {
        type: de.MessageOut,
        sender: F,
        recipient: R,
        amount: T,
        nonce: G,
        data: j,
        digest: M,
        messageId: _
      };
    }
    case "MINT": {
      const F = xe((v = e.contract) == null ? void 0 : v.id), R = xe(e.subId), G = $r.getAssetId(F, R);
      return {
        type: de.Mint,
        subId: R,
        contractId: F,
        assetId: G,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "BURN": {
      const F = xe((C = e.contract) == null ? void 0 : C.id), R = xe(e.subId), G = So.getAssetId(F, R);
      return {
        type: de.Burn,
        subId: R,
        contractId: F,
        assetId: G,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    default:
      throw new D(k.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var GI = "https://fuellabs.github.io/block-explorer-v2", HI = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, NC = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, a = t || GI, d = [
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
  })), m = l.length > 0;
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
  const g = m ? HI(
    l[0].key,
    l[0].value
  ) : "", b = /^\/|\/$/gm, Q = n ? n.replace(b, "") : g, v = a.replace(b, ""), C = r == null ? void 0 : r.replace(b, ""), F = C ? encodeURIComponent(C) : void 0, R = v.match(/^https?:\/\//) ? "" : "https://", G = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${R}${v}/${Q}${F ? `?providerUrl=${G}${F}` : ""}`;
}, hr = (e, t, n) => x(Math.ceil(e.mul(t).toNumber() / n.toNumber())), M0 = (e) => e.filter(
  (r) => r.type === de.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), x(0));
function _n(e, t) {
  const n = x(t.base);
  let r = x(0);
  return t.__typename === "LightOperation" && (r = x(e).div(x(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = x(e).mul(x(t.gasPerUnit))), n.add(r);
}
function JI(e, t, n) {
  const r = [];
  return e.reduce((i, o) => "predicate" in o && o.predicate && o.predicate !== "0x" ? i.add(
    _n(t, n.vmInitialization).add(
      _n(Y(o.predicate).length, n.contractRoot)
    ).add(x(o.predicateGasUsed))
  ) : "witnessIndex" in o && !r.includes(o.witnessIndex) ? (r.push(o.witnessIndex), i.add(n.ecr1)) : i, x());
}
function O0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = _n(i, t.vmInitialization), a = x(i).mul(n), d = JI(r, i, t);
  return o.add(a).add(d).add(s).maxU64();
}
function Ta(e) {
  const { gasPerByte: t, witnessesLength: n, witnessLimit: r, minGas: s, gasLimit: i = x(0) } = e;
  let o = x(0);
  return r != null && r.gt(0) && r.gte(n) && (o = x(r).sub(n).mul(t)), o.add(s).add(i);
}
function L0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = _n(r, e.contractRoot), i = _n(t, e.stateRoot), o = _n(n, e.s256), a = x(4 + 32 + 32 + 32), d = _n(a, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function T0({
  gasCosts: e,
  txBytesSize: t
}) {
  return _n(t, e.s256);
}
function Vo(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = V(e[t]);
        break;
      case "Array":
        e[t] = Vo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = Vo(e[t]);
        break;
    }
  }), e;
}
function ZI(e) {
  return Vo(es(e));
}
function YI(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var DC = (e) => Number(BigInt(e) - BigInt(2 ** 62) - BigInt(10)), XI = (e) => (BigInt(e) + BigInt(2 ** 62) + BigInt(10)).toString(), RC = class extends Error {
  constructor() {
    super(...arguments);
    N(this, "name", "ChangeOutputCollisionError");
    N(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, VI = class extends Error {
  constructor(t) {
    super();
    N(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, SC = class extends Error {
  constructor(t) {
    super();
    N(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, jI = (e) => {
  const t = Y(e);
  return {
    data: V(t),
    dataLength: t.length
  };
}, Di = class {
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
    this.gasPrice = x(e), this.maturity = t ?? 0, this.witnessLimit = r ? x(r) : void 0, this.maxFee = n ? x(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.gasPrice && (t += Wt.GasPrice, n.push({ data: e.gasPrice, type: Wt.GasPrice })), e.witnessLimit && (t += Wt.WitnessLimit, n.push({ data: e.witnessLimit, type: Wt.WitnessLimit })), e.maturity > 0 && (t += Wt.Maturity, n.push({ data: e.maturity, type: Wt.Maturity })), e.maxFee && (t += Wt.MaxFee, n.push({ data: e.maxFee, type: Wt.MaxFee })), {
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
    var i, o, a;
    const e = ((i = this.inputs) == null ? void 0 : i.map(MI)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(OI)) ?? [], n = ((a = this.witnesses) == null ? void 0 : a.map(jI)) ?? [], { policyTypes: r, policies: s } = Di.getPolicyMeta(this);
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
    return new Ln().encode(this.toTransaction());
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
    return this.witnesses.push(Pt([Le, Le])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = ge.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new VI(e);
    this.witnesses[e] = t;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (e) => e.type === be.Coin
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
    const t = Ur(e), n = this.inputs.find((r) => {
      switch (r.type) {
        case be.Coin:
          return V(r.owner) === t.toB256();
        case be.Message:
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
      type: be.Coin,
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
    const { recipient: n, sender: r, amount: s } = e, i = yt;
    let o;
    t ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.createWitness()));
    const a = {
      ...e,
      type: be.Message,
      sender: r.toB256(),
      recipient: n.toB256(),
      amount: s,
      witnessIndex: o,
      predicate: t == null ? void 0 : t.bytes,
      predicateData: t == null ? void 0 : t.predicateData
    };
    this.pushInput(a), this.addChangeOutput(n, i);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return vA(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
    return vA(e) ? this.addCoinInput(e, t) : this.addMessageInput(e, t), this;
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
  addCoinOutput(e, t, n = yt) {
    return this.pushOutput({
      type: Be.Coin,
      to: Ur(e).toB256(),
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
    return t.map(ka).forEach((n) => {
      this.pushOutput({
        type: Be.Coin,
        to: Ur(e).toB256(),
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
  addChangeOutput(e, t = yt) {
    this.getChangeOutputs().find(
      (r) => V(r.assetId) === t
    ) || this.pushOutput({
      type: Be.Change,
      to: Ur(e).toB256(),
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
    return O0({
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
    return Ta({
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
      return Le.slice(0, -i.length).concat(i);
    }, r = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const a = r(i);
      a && "assetId" in a ? (a.id = n(), a.amount = o) : this.addResources([
        {
          id: n(),
          amount: o,
          assetId: i,
          owner: ge.fromRandom(),
          maturity: 0,
          blockCreated: x(1),
          txCreatedIdx: x(1)
        }
      ]);
    };
    s(yt, x(1e11)), e.forEach((i) => s(i.assetId, i.amount));
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: t, assetId: n }) => ({
      amount: x(t),
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
function P0(e, t) {
  const n = e.toTransaction();
  n.type === vt.Script && (n.receiptsRoot = Le), n.inputs = n.inputs.map((i) => {
    const o = es(i);
    switch (o.type) {
      case be.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = x(0), o;
      case be.Message:
        return o.predicateGasUsed = x(0), o;
      case be.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Le, o.outputIndex = 0, o.balanceRoot = Le, o.stateRoot = Le, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = es(i);
    switch (o.type) {
      case Be.Contract:
        return o.balanceRoot = Le, o.stateRoot = Le, o;
      case Be.Change:
        return o.amount = x(0), o;
      case Be.Variable:
        return o.to = Le, o.amount = x(0), o.assetId = Le, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = cp(t), s = Pt([r, new Ln().encode(n)]);
  return Te(s);
}
var qI = (e) => {
  const t = new Uint8Array(32);
  return t.set(Y(e)), t;
}, WI = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: V(t),
    value: V(qI(n))
  };
}, jo = class extends Di {
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
    N(this, "type", vt.Create);
    /** Witness index of contract bytecode to create */
    N(this, "bytecodeWitnessIndex");
    /** Salt */
    N(this, "salt");
    /** List of storage slots to initialize */
    N(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = V(n ?? Le), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(WI)) ?? [];
    return {
      type: vt.Create,
      ...t,
      bytecodeLength: t.witnesses[n].dataLength / 4,
      bytecodeWitnessIndex: n,
      storageSlotsCount: r.length,
      salt: this.salt ? V(this.salt) : Le,
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
    return P0(this, t);
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
    return L0({
      contractBytesSize: x(Y(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, xA = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: Y("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, $I = {
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
}, fr = class extends Di {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    N(this, "type", vt.Script);
    /** Gas limit for transaction */
    N(this, "gasLimit");
    /** Script to execute */
    N(this, "script");
    /** Script input data (parameters) */
    N(this, "scriptData");
    this.gasLimit = x(r), this.script = Y(t ?? xA.bytes), this.scriptData = Y(n ?? xA.encodeScriptData());
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
      receiptsRoot: Le,
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
      (t) => t.type === be.Contract
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
      (o, a) => o + a.dataLength,
      0
    );
    return Ta({
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
    const n = Ur(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: be.Contract,
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
    return P0(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new On(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return T0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, Tt = (e) => {
  if (e instanceof fr || e instanceof jo)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case vt.Script:
      return fr.from(e);
    case vt.Create:
      return jo.from(e);
    default:
      throw new D(k.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, KI = (e) => {
  var P, W;
  const {
    gasUsed: t,
    rawPayload: n,
    consensusParameters: { gasCosts: r, feeParams: s }
  } = e, i = x(s.gasPerByte), o = x(s.gasPriceFactor), a = Y(n), [d] = new Ln().decode(a, 0);
  if (d.type === vt.Mint)
    return {
      fee: x(0),
      minFee: x(0),
      maxFee: x(0),
      feeFromGasUsed: x(0)
    };
  const { type: l, witnesses: m, inputs: g, policies: b } = d;
  let Q = x(0), v = x(0);
  if (l === vt.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: J } = d, ee = x(Y(m[U].data).length);
    Q = L0({
      contractBytesSize: ee,
      gasCosts: r,
      stateRootSize: J.length || 0,
      txBytesSize: a.length
    });
  } else {
    const { scriptGasLimit: U } = d;
    U && (v = U), Q = T0({
      gasCosts: r,
      txBytesSize: a.length
    });
  }
  const C = O0({
    gasCosts: r,
    gasPerByte: x(i),
    inputs: g,
    metadataGas: Q,
    txBytesSize: a.length
  }), F = x((P = b.find((U) => U.type === Wt.GasPrice)) == null ? void 0 : P.data), R = (W = b.find((U) => U.type === Wt.WitnessLimit)) == null ? void 0 : W.data, G = m.reduce((U, J) => U + J.dataLength, 0), T = Ta({
    gasPerByte: i,
    minGas: C,
    witnessesLength: G,
    gasLimit: v,
    witnessLimit: R
  }), j = hr(t, F, o), M = hr(C, F, o), _ = hr(T, F, o);
  return {
    fee: M.add(j),
    minFee: M,
    maxFee: _,
    feeFromGasUsed: j
  };
}, zI = (e) => {
  const t = e0.fromString(e, 10).toUnix();
  return new Date(t * 1e3);
}, _C = (e) => e0.fromUnix(Math.floor(e.getTime() / 1e3)).toString(10), ey = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var g;
  const s = new On(e), i = t.param1.toHex(8), o = s.getFunction(i), a = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const b = x(t.param2).sub(wi({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(b * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let l;
  if (d) {
    const b = o.decodeArguments(d);
    b && (l = a.reduce((Q, v, C) => {
      const F = b[C], R = v.name;
      return R ? {
        ...Q,
        // reparse to remove bn
        [R]: JSON.parse(JSON.stringify(F))
      } : Q;
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
function Pa(e, t) {
  return e.filter((n) => n.type === t);
}
function ny(e) {
  return Pa(e, be.Coin);
}
function ry(e) {
  return Pa(e, be.Message);
}
function sy(e) {
  return ty(e, [be.Coin, be.Message]);
}
function iy(e) {
  return Pa(e, be.Contract);
}
function oi(e, t) {
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
    if (n.type !== be.Contract)
      throw new D(
        k.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function ns(e) {
  return e.type === be.Coin ? e.owner.toString() : e.type === be.Message ? e.recipient.toString() : "";
}
function ms(e, t) {
  return e.filter((n) => n.type === t);
}
function ay(e) {
  return ms(e, Be.ContractCreated);
}
function U0(e) {
  return ms(e, Be.Coin);
}
function cy(e) {
  return ms(e, Be.Change);
}
function Ay(e) {
  return ms(e, Be.Contract);
}
function kC(e) {
  return ms(e, Be.Variable);
}
var uy = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(uy || {}), dy = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(dy || {}), ly = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.contractTransfer = "Contract transfer", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(ly || {}), hy = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(hy || {}), fy = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(fy || {});
function Ri(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function G0(e) {
  switch (e) {
    case vt.Mint:
      return "Mint";
    case vt.Create:
      return "Create";
    case vt.Script:
      return "Script";
    default:
      throw new D(
        k.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Ua(e, t) {
  return G0(e) === t;
}
function gy(e) {
  return Ua(
    e,
    "Mint"
    /* Mint */
  );
}
function H0(e) {
  return Ua(
    e,
    "Create"
    /* Create */
  );
}
function J0(e) {
  return Ua(
    e,
    "Script"
    /* Script */
  );
}
function MC(e) {
  return (t) => e.assetId === t.assetId;
}
function py(e) {
  return Ri(e, de.Call);
}
function my(e) {
  return Ri(e, de.MessageOut);
}
var wy = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((a) => a.assetId === o.assetId)
  );
  return n.map((o) => {
    const a = r.find((l) => l.assetId === o.assetId);
    if (!a)
      return o;
    const d = x(o.amount).add(a.amount);
    return { ...o, amount: d };
  }).concat(s);
};
function Ey(e, t) {
  var n, r, s, i, o, a, d, l;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((a = t.from) == null ? void 0 : a.type) && ((d = e.to) == null ? void 0 : d.type) === ((l = t.to) == null ? void 0 : l.type);
}
function Kn(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((a) => Ey(a, t));
  if (n[r]) {
    const a = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (a.assetsSent = (i = a.assetsSent) != null && i.length ? wy(a, t) : t.assetsSent), (o = t.calls) != null && o.length && (a.calls = [...a.calls || [], ...t.calls]), n[r] = a;
  } else
    n.push(t);
  return n;
}
function Iy(e) {
  return Ri(e, de.TransferOut);
}
function yy({ receipts: e }) {
  return Iy(e).reduce(
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
function By({
  inputs: e,
  receipts: t
}) {
  return my(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", a = oi(e, o);
      if (a) {
        const d = ns(a);
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
function Cy({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = py(n);
  return Ay(t).reduce((l, m) => {
    const g = oy(e, m.inputIndex);
    return g ? o.reduce((Q, v) => {
      var C;
      if (v.to === g.contractID) {
        const F = oi(e, v.assetId);
        if (F) {
          const R = ns(F), G = [], T = r == null ? void 0 : r[g.contractID];
          return T && G.push(
            ey({
              abi: T,
              receipt: v,
              rawPayload: s,
              maxInputs: i
            })
          ), Kn(Q, {
            name: "Contract call",
            from: {
              type: 1,
              address: R
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
            calls: G
          });
        }
      }
      return Q;
    }, l) : l;
  }, []);
}
function FA({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  const r = U0(t), [s] = Ri(
    n,
    de.Transfer
  );
  let i = [];
  return s ? cy(t).forEach((a) => {
    const { assetId: d } = a, [l] = iy(e), m = oi(e, d);
    if (m && l) {
      const g = ns(m);
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
    const a = oi(e, o.assetId);
    if (a) {
      const l = {
        name: "Transfer asset",
        from: {
          type: 1,
          address: ns(a)
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
function by(e) {
  return U0(e).reduce((r, s) => Kn(r, {
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
function Qy({ inputs: e, outputs: t }) {
  const n = ay(t), r = sy(e)[0], s = ns(r);
  return n.reduce((o, a) => Kn(o, {
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
function vy({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return H0(e) ? [
    ...Qy({ inputs: t, outputs: n }),
    ...FA({ inputs: t, outputs: n, receipts: r })
  ] : J0(e) ? [
    ...FA({ inputs: t, outputs: n, receipts: r }),
    ...Cy({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...yy({ receipts: r }),
    ...By({ inputs: t, receipts: r })
  ] : [...by(n)];
}
var gr = (e) => {
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
}, Fy = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === de.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Ny = (e) => {
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
      throw new D(
        k.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, Dy = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = Ny(e.type), e.type) {
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
function Si(e) {
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: a,
    abiMap: d = {},
    maxInputs: l,
    gasCosts: m
  } = e, g = M0(n), b = V(o), Q = vy({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: b,
    abiMap: d,
    maxInputs: l
  }), v = G0(i.type), { fee: C } = KI({
    gasUsed: g,
    rawPayload: b,
    consensusParameters: {
      gasCosts: m,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: F, isStatusPending: R, isStatusSuccess: G, blockId: T, status: j, time: M } = Dy(a), _ = xy(n), O = Fy(n);
  let P;
  return M && (P = zI(M)), {
    id: t,
    fee: C,
    gasUsed: g,
    operations: Q,
    type: v,
    blockId: T,
    time: M,
    status: j,
    receipts: n,
    mintedAssets: _,
    burnedAssets: O,
    isTypeMint: gy(i.type),
    isTypeCreate: H0(i.type),
    isTypeScript: J0(i.type),
    isStatusFailure: F,
    isStatusSuccess: G,
    isStatusPending: R,
    date: P,
    transaction: i
  };
}
var ai = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t) {
    /** Transaction ID */
    N(this, "id");
    /** Current provider */
    N(this, "provider");
    /** Gas used on the transaction */
    N(this, "gasUsed", x(0));
    /** The graphql Transaction with receipts object. */
    N(this, "gqlTransaction");
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
    const n = new ai(e, t);
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
    return (t = new Ln().decode(
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
    ), r = ((l = t.receipts) == null ? void 0 : l.map(gr)) || [], { gasPerByte: s, gasPriceFactor: i, gasCosts: o } = this.provider.getGasConfig(), a = this.provider.getChain().consensusParameters.maxInputs;
    return Si({
      id: this.id,
      receipts: r,
      transaction: n,
      transactionBytes: Y(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: e,
      maxInputs: a,
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
      throw new D(
        k.TRANSACTION_FAILED,
        `Transaction failed: ${t.gqlTransaction.status.reason}`
      );
    return t;
  }
};
function Ry(e, t) {
  return e.reduce((n, r) => (r.type === de.LogData && n.push(t.decodeLog(r.data, r.val1.toNumber(), r.id)[0]), r.type === de.Log && n.push(t.decodeLog(new S().encode(r.val0), r.val1.toNumber(), r.id)[0]), n), []);
}
function Sy(e, t) {
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
function Z0(e, t, n = 0) {
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
      const d = Sy(t, a);
      return await YI(d), Z0(e, t, a)(...r);
    }
  };
}
var _y = (e, t) => {
  const n = {};
  function r({ amount: s, assetId: i }) {
    n[i] ? n[i] = n[i].add(s) : n[i] = s;
  }
  return e.forEach(r), t.forEach(r), Object.entries(n).map(([s, i]) => ({ assetId: s, amount: i }));
}, ky = 10, My = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: a, scriptParams: d, txParams: l, gasCosts: m } = r;
  return {
    name: t,
    baseChainHeight: x(n),
    consensusParameters: {
      contractMaxSize: x(i.contractMaxSize),
      maxInputs: x(l.maxInputs),
      maxOutputs: x(l.maxOutputs),
      maxWitnesses: x(l.maxWitnesses),
      maxGasPerTx: x(l.maxGasPerTx),
      maxScriptLength: x(d.maxScriptLength),
      maxScriptDataLength: x(d.maxScriptDataLength),
      maxStorageSlots: x(i.maxStorageSlots),
      maxPredicateLength: x(a.maxPredicateLength),
      maxPredicateDataLength: x(a.maxPredicateDataLength),
      maxGasPerPredicate: x(a.maxGasPerPredicate),
      gasPriceFactor: x(o.gasPriceFactor),
      gasPerByte: x(o.gasPerByte),
      maxMessageDataLength: x(a.maxMessageDataLength),
      chainId: x(r.chainId),
      gasCosts: m
    },
    gasCosts: m,
    latestBlock: {
      id: s.id,
      height: x(s.header.height),
      time: s.header.time,
      transactions: s.transactions.map((g) => ({
        id: g.id
      }))
    }
  };
}, qo, Y0, sn = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, Fn(this, qo), ke(this, "operations"), ke(this, "cache"), ke(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new kI(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    sn.nodeInfoCache = {}, sn.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return Z0((...r) => {
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
    const n = new sn(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = sn.chainInfoCache[this.url];
    if (!e)
      throw new D(
        k.CHAIN_INFO_CACHE_EMPTY,
        "Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const e = sn.nodeInfoCache[this.url];
    if (!e)
      throw new D(
        k.NODE_INFO_CACHE_EMPTY,
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
    return sn.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = Bl(e.nodeVersion);
    if (!t || !n)
      throw new D(
        D.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${e.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const e = sn.getFetchFn(this.options), t = new xm.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return RI((r, s) => {
      const i = r.definitions.find((a) => a.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? SI({
        url: this.url,
        query: r,
        fetchFn: (a, d) => e(a, d, this.options),
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
    return x(e.latestBlock.header.height, 10);
  }
  /**
   * Returns the chain information.
   * @param url - The URL of the Fuel node
   * @returns NodeInfo object
   */
  async fetchNode() {
    const { nodeInfo: e } = await this.operations.getNodeInfo(), t = {
      maxDepth: x(e.maxDepth),
      maxTx: x(e.maxTx),
      minGasPrice: x(e.minGasPrice),
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace,
      peers: e.peers
    };
    return sn.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = My(e);
    return sn.chainInfoCache[this.url] = t, t;
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
    const r = Tt(e);
    Xo(this, qo, Y0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const { gasUsed: s, minGasPrice: i } = await this.getTransactionCost(r, [], {
      estimateTxDependencies: !1,
      estimatePredicates: !1
    });
    if (x(i).gt(x(r.gasPrice)))
      throw new D(
        k.GAS_PRICE_TOO_LOW,
        `Gas price '${r.gasPrice}' is lower than the required: '${i}'.`
      );
    if (r.type === vt.Script && x(s).gt(x(r.gasLimit)))
      throw new D(
        k.GAS_LIMIT_TOO_LOW,
        `Gas limit '${r.gasLimit}' is lower than the required: '${s}'.`
      );
    const a = V(r.toTransactionBytes());
    if (n) {
      const l = this.operations.submitAndAwait({ encodedTransaction: a });
      for await (const { submitAndAwait: b } of l)
        if (b.type !== "SubmittedStatus")
          break;
      const m = r.getTransactionId(this.getChainId()), g = new ai(m, this);
      return await g.fetch(), g;
    }
    const {
      submit: { id: d }
    } = await this.operations.submit({ encodedTransaction: a });
    return new ai(d, this);
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
    const r = Tt(e);
    n && await this.estimateTxDependencies(r);
    const s = V(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransaction: s,
      utxoValidation: t || !1
    });
    return {
      receipts: i.map(gr)
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
      "predicateGasUsed" in s && x(s.predicateGasUsed).gt(0) && (e.inputs[i].predicateGasUsed = s.predicateGasUsed);
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
    for (s.hasPredicateInput() && (s = await this.estimatePredicates(s)); r < ky; ) {
      const { dryRun: i } = await this.operations.dryRun({
        encodedTransaction: V(s.toTransactionBytes()),
        utxoValidation: !1
      }), o = i.map(gr), { missingOutputVariables: a, missingOutputContractIds: d } = PI(o);
      if (t = a.length, n = d.length, t === 0 && n === 0)
        return;
      s.addVariableOutputs(t), d.forEach(
        ({ contractId: l }) => s.addContractInputAndOutput(ge.fromString(l))
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
    const n = Tt(e);
    t && await this.estimateTxDependencies(n);
    const r = V(n.toTransactionBytes()), { dryRun: s } = await this.operations.dryRun({
      encodedTransaction: r,
      utxoValidation: !0
    });
    return {
      receipts: s.map(gr)
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
    const s = Tt(es(e)), i = this.getChain(), { gasPriceFactor: o, minGasPrice: a, maxGasPerTx: d } = this.getGasConfig(), l = Ef(s.gasPrice, a), m = s.type === vt.Script;
    s.hasPredicateInput() && r && (m && (s.gasLimit = x(0)), await this.estimatePredicates(s));
    const g = s.calculateMinGas(i), b = s.calculateMaxGas(i, g), Q = s.getCoinOutputsQuantities(), v = _y(Q, t);
    s.fundWithFakeUtxos(v);
    let C = g, F = [];
    m ? (s.gasPrice = x(0), s.gasLimit = x(d.sub(b).toNumber() * 0.9), F = (await this.call(s, {
      estimateTxDependencies: n
    })).receipts, C = M0(F)) : C = g;
    const R = hr(
      C,
      l,
      o
    ).normalizeZeroToOne(), G = hr(g, l, o).normalizeZeroToOne(), T = hr(b, l, o).normalizeZeroToOne();
    return {
      requiredQuantities: v,
      receipts: F,
      gasUsed: C,
      minGasPrice: a,
      gasPrice: l,
      minGas: g,
      maxGas: b,
      usedFee: R,
      minFee: G,
      maxFee: T
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = ge.fromAddressOrString(e), s = Tt(es(t)), i = await this.getTransactionCost(s, n);
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...a } = await this.getTransactionCost(
      s,
      n
    );
    return {
      resources: await this.getResourcesToSpend(r, o),
      requiredQuantities: o,
      ...a
    };
  }
  /**
   * Returns coins for the given owner.
   */
  async getCoins(e, t, n) {
    const r = ge.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && V(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: x(o.amount),
      owner: ge.fromAddressOrString(o.owner),
      maturity: x(o.maturity).toNumber(),
      blockCreated: x(o.blockCreated),
      txCreatedIdx: x(o.txCreatedIdx)
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
    var d, l, m;
    const r = ge.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((g) => V(g))) || [],
      utxos: ((l = n == null ? void 0 : n.utxos) == null ? void 0 : l.map((g) => V(g))) || []
    };
    if (this.cache) {
      const g = new Set(
        s.utxos.concat((m = this.cache) == null ? void 0 : m.getActiveData().map((b) => V(b)))
      );
      s.utxos = Array.from(g);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(ka).map(({ assetId: g, amount: b, max: Q }) => ({
        assetId: V(g),
        amount: b.toString(10),
        max: Q ? Q.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((g) => {
      switch (g.__typename) {
        case "MessageCoin":
          return {
            amount: x(g.amount),
            assetId: g.assetId,
            daHeight: x(g.daHeight),
            sender: ge.fromAddressOrString(g.sender),
            recipient: ge.fromAddressOrString(g.recipient),
            nonce: g.nonce
          };
        case "Coin":
          return {
            id: g.utxoId,
            amount: x(g.amount),
            assetId: g.assetId,
            owner: ge.fromAddressOrString(g.owner),
            maturity: x(g.maturity).toNumber(),
            blockCreated: x(g.blockCreated),
            txCreatedIdx: x(g.txCreatedIdx)
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
    typeof e == "number" ? t = { height: x(e).toString(10) } : e === "latest" ? t = { height: (await this.getBlockNumber()).toString(10) } : e.length === 66 ? t = { blockId: e } : t = { blockId: x(e).toString(10) };
    const { block: n } = await this.operations.getBlock(t);
    return n ? {
      id: n.id,
      height: x(n.header.height),
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
      height: x(r.header.height),
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
    typeof e == "number" ? t = { blockHeight: x(e).toString(10) } : e === "latest" ? t = { blockHeight: (await this.getBlockNumber()).toString() } : t = { blockId: e };
    const { block: n } = await this.operations.getBlockWithTransactions(t);
    return n ? {
      id: n.id,
      height: x(n.header.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new Ln().decode(Y(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new Ln().decode(
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
      contract: ge.fromAddressOrString(e).toB256(),
      asset: V(t)
    });
    return x(n.amount, 10);
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
      owner: ge.fromAddressOrString(e).toB256(),
      assetId: V(t)
    });
    return x(n.amount, 10);
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
      filter: { owner: ge.fromAddressOrString(e).toB256() }
    })).balances.edges.map((s) => s.node).map((s) => ({
      assetId: s.assetId,
      amount: x(s.amount)
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
      owner: ge.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Wr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: x(s.amount),
        data: s.data
      }),
      sender: ge.fromAddressOrString(s.sender),
      recipient: ge.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: x(s.amount),
      data: Wr.decodeData(s.data),
      daHeight: x(s.daHeight)
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
      messageBlockHeader: a,
      commitBlockHeader: d,
      blockProof: l,
      sender: m,
      recipient: g,
      amount: b,
      data: Q
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: x(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: x(l.proofIndex),
        proofSet: l.proofSet
      },
      messageBlockHeader: {
        id: a.id,
        daHeight: x(a.daHeight),
        transactionsCount: x(a.transactionsCount),
        transactionsRoot: a.transactionsRoot,
        height: x(a.height),
        prevRoot: a.prevRoot,
        time: a.time,
        applicationHash: a.applicationHash,
        messageReceiptRoot: a.messageReceiptRoot,
        messageReceiptCount: x(a.messageReceiptCount)
      },
      commitBlockHeader: {
        id: d.id,
        daHeight: x(d.daHeight),
        transactionsCount: x(d.transactionsCount),
        transactionsRoot: d.transactionsRoot,
        height: x(d.height),
        prevRoot: d.prevRoot,
        time: d.time,
        applicationHash: d.applicationHash,
        messageReceiptRoot: d.messageReceiptRoot,
        messageReceiptCount: x(d.messageReceiptCount)
      },
      sender: ge.fromAddressOrString(m),
      recipient: ge.fromAddressOrString(g),
      nonce: t,
      amount: x(b),
      data: Q
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
      blocksToProduce: x(e).toString(10),
      startTimestamp: t ? XI(t) : void 0
    });
    return x(n);
  }
}, _i = sn;
qo = /* @__PURE__ */ new WeakSet();
Y0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === be.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
ke(_i, "chainInfoCache", {});
ke(_i, "nodeInfoCache", {});
async function OC(e) {
  var b;
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new D(
      k.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Ln().decode(
    Y(s.rawPayload),
    0
  ), o = ((b = s.receipts) == null ? void 0 : b.map(gr)) || [], {
    consensusParameters: { gasPerByte: a, gasPriceFactor: d, maxInputs: l, gasCosts: m }
  } = n.getChain(), g = Si({
    id: s.id,
    receipts: o,
    transaction: i,
    transactionBytes: Y(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: x(a),
    gasPriceFactor: x(d),
    abiMap: r,
    maxInputs: l,
    gasCosts: m
  });
  return {
    gqlTransaction: s,
    ...g
  };
}
async function LC(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: a } = t.getGasConfig(), d = t.getChain().consensusParameters.maxInputs, l = n.toTransaction(), m = n.toTransactionBytes();
  return Si({
    receipts: s,
    transaction: l,
    transactionBytes: m,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: d,
    gasCosts: a
  });
}
async function TC(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: a, gasPriceFactor: d, maxInputs: l, gasCosts: m }
  } = n.getChain();
  return {
    transactions: i.map((b) => {
      const { node: Q } = b, { id: v, rawPayload: C, receipts: F, status: R } = Q, [G] = new Ln().decode(Y(C), 0), T = (F == null ? void 0 : F.map(gr)) || [], j = Si({
        id: v,
        receipts: T,
        transaction: G,
        transactionBytes: Y(C),
        gqlTransactionStatus: R,
        abiMap: r,
        gasPerByte: a,
        gasPriceFactor: d,
        maxInputs: l,
        gasCosts: m
      });
      return {
        gqlTransaction: Q,
        ...j
      };
    }),
    pageInfo: o
  };
}
var Oy = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new S().encode(new Ge(n).toNumber());
  return Uint8Array.from([
    ...Y(r),
    ...i,
    ...Y(t)
  ]);
}, Ly = async (e) => {
  const t = Oy(e);
  await va();
  const n = Km(16, 0, ew.ScriptData), r = aA(17, 16, 32), s = Zr(18, 17, 0), i = aA(19, 17, 8), o = Wm(16, 18, 19), a = r0(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...a.to_bytes()
  ]), scriptData: t };
}, Ga = class extends Id {
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
    N(this, "address");
    /**
     * The provider used to interact with the network.
     */
    N(this, "_provider");
    this._provider = n, this.address = ge.fromDynamicInput(t);
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
    const t = [];
    let r;
    for (; ; ) {
      const s = await this.provider.getMessages(this.address, {
        first: 9999,
        after: r
      });
      if (t.push(...s), !(s.length >= 9999))
        break;
      throw new D(
        k.NOT_SUPPORTED,
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
  async getBalance(t = yt) {
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
      throw new D(
        k.NOT_SUPPORTED,
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
    const s = GE({
      amount: x(r),
      assetId: yt,
      coinQuantities: n
    }), i = {};
    s.forEach(({ amount: g, assetId: b }) => {
      i[b] = {
        required: g,
        owned: x(0)
      };
    });
    const o = [], a = [], d = this.address.toB256();
    t.inputs.forEach((g) => {
      if ("amount" in g)
        if ("owner" in g) {
          const v = String(g.assetId);
          if (g.owner === d && i[v]) {
            const C = x(g.amount);
            i[v].owned = i[v].owned.add(C), o.push(g.id);
          }
        } else
          g.recipient === d && g.amount && i[yt] && (i[yt].owned = i[yt].owned.add(g.amount), a.push(g.nonce));
    });
    const l = [];
    if (Object.entries(i).forEach(([g, { owned: b, required: Q }]) => {
      b.lt(Q) && l.push({
        assetId: g,
        amount: Q.sub(b)
      });
    }), l.length) {
      const g = await this.getResourcesToSpend(l, {
        messages: a,
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
  async createTransfer(t, n, r = yt, s = {}) {
    const { minGasPrice: i } = this.provider.getGasConfig(), o = { gasPrice: i, ...s }, a = new fr(o);
    a.addCoinOutput(ge.fromAddressOrString(t), n, r);
    const { maxFee: d, requiredQuantities: l } = await this.provider.getTransactionCost(a);
    return await this.fund(a, l, d), a;
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
  async transfer(t, n, r = yt, s = {}) {
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
  async transferToContract(t, n, r = yt, s = {}) {
    const i = ge.fromAddressOrString(t), { minGasPrice: o } = this.provider.getGasConfig(), a = { gasPrice: o, ...s }, { script: d, scriptData: l } = await Ly({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: x(n),
      assetId: r
    }), m = new fr({
      ...a,
      script: d,
      scriptData: l
    });
    m.addContractInputAndOutput(i);
    const { maxFee: g, requiredQuantities: b } = await this.provider.getTransactionCost(m, [
      { amount: x(n), assetId: String(r) }
    ]);
    return await this.fund(m, b, g), this.sendTransaction(m);
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
    const s = ge.fromAddressOrString(t), i = Y(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = Y(
      "0x".concat(x(n).toHex().substring(2).padStart(16, "0"))
    ), d = { script: new Uint8Array([
      ...Y($I.bytes),
      ...i,
      ...o
    ]), ...r }, l = new fr(d), m = [{ amount: x(n), assetId: yt }], { requiredQuantities: g, maxFee: b } = await this.provider.getTransactionCost(
      l,
      m
    );
    return await this.fund(l, g, b), this.sendTransaction(l);
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(t, n) {
    const r = Tt(t);
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
    const n = Tt(t);
    return await this.provider.estimateTxDependencies(n), this.provider.simulate(n, { estimateTxDependencies: !1 });
  }
}, NA = 13, DA = 8, RA = 1, go = 32, Ty = 16, SA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function Py(e, t, n) {
  const r = Sn(SA(e), "hex"), s = ge.fromAddressOrString(t), i = Mn(go), o = Xu({
    password: Sn(n),
    salt: i,
    dklen: go,
    n: 2 ** NA,
    r: DA,
    p: RA
  }), a = Mn(Ty), d = await Dg(r, o, a), l = Uint8Array.from([...o.subarray(16, 32), ...d]), m = Vu(l), g = Pr(m, "hex"), b = {
    id: i0(),
    version: 3,
    address: SA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Pr(a, "hex") },
      ciphertext: Pr(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: go,
        n: 2 ** NA,
        p: RA,
        r: DA,
        salt: Pr(i, "hex")
      }
    }
  };
  return JSON.stringify(b);
}
async function Uy(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: a, r: d, p: l, salt: m }
    }
  } = n, g = Sn(s, "hex"), b = Sn(i, "hex"), Q = Sn(m, "hex"), v = Sn(t), C = Xu({
    password: v,
    salt: Q,
    n: a,
    p: l,
    r: d,
    dklen: o
  }), F = Uint8Array.from([...C.subarray(16, 32), ...g]), R = Vu(F), G = Pr(R, "hex");
  if (r !== G)
    throw new D(
      k.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const T = await Ng(g, C, b);
  return V(T);
}
var Fr = class {
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
    const t = kn(e, 32);
    this.privateKey = V(t), this.publicKey = V(bn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = V(bn.getPublicKey(t, !0)), this.address = ge.fromPublicKey(this.publicKey);
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
    const t = bn.sign(Y(e), Y(this.privateKey)), n = kn(`0x${t.r.toString(16)}`, 32), r = kn(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, Pt([n, r]);
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
    const a = new bn.Signature(BigInt(V(r)), BigInt(V(s))).addRecoveryBit(
      i
    ).recoverPublicKey(Y(e)).toRawBytes(!1).slice(1);
    return V(a);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return ge.fromPublicKey(Fr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? bd(Pt([Mn(32), Y(e)])) : Mn(32);
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
}, X0 = class extends Ga {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new Fr(t);
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
    return await this.signer().sign(ap(t));
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = Tt(t), r = this.provider.getChain().consensusParameters.chainId.toNumber(), s = n.getTransactionId(r);
    return await this.signer().sign(s);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = Tt(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, n) {
    const r = Tt(t);
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
    const n = Tt(t);
    return await this.provider.estimateTxDependencies(n), this.provider.call(
      await this.populateTransactionWitnessesSignature(n),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return Py(this.privateKey, this.address, t);
  }
};
ke(X0, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Ds = [
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
], Gy = /* @__PURE__ */ ((e) => (e.english = "english", e))(Gy || {});
function Wo(e) {
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
function Hy(e) {
  return (1 << e) - 1;
}
function V0(e) {
  return (1 << e) - 1 << 8 - e;
}
function po(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function Jy(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function Zy(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & Hy(8 - n)), n += 3);
  const r = e.length / 4, s = Y(Te(e))[0] & V0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function Yy(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = Y(new Uint8Array(n));
  let s = 0;
  for (let l = 0; l < e.length; l += 1) {
    const m = t.indexOf(e[l].normalize("NFKD"));
    if (m === -1)
      throw new D(
        k.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[l]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      m & 1 << 10 - g && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, a = V0(o);
  if ((Y(Te(r.slice(0, i / 8)))[0] & a) !== (r[r.length - 1] & a))
    throw new D(
      k.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var Xy = Wo("Bitcoin seed"), Vy = "0x0488ade4", jy = "0x04358394", _A = [12, 15, 18, 21, 24];
function kA(e) {
  if (e.length !== 2048)
    throw new D(
      k.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function qy(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new D(
      k.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function mo(e) {
  if (!_A.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${_A.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new D(k.INVALID_MNEMONIC, t);
  }
}
var Qn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Ds) {
    N(this, "wordlist");
    this.wordlist = e, kA(this.wordlist);
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
  static mnemonicToEntropy(e, t = Ds) {
    const n = po(e);
    return mo(n), V(Yy(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Ds) {
    const n = Y(e);
    return kA(t), qy(n), Zy(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    mo(po(e));
    const n = Wo(Jy(e)), r = Wo(`mnemonic${t}`);
    return Sr(n, r, 2048, 64, "sha512");
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
    const t = po(e);
    let n = 0;
    try {
      mo(t);
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
    const t = Ds;
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
      throw new D(
        k.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return Y(Rr("sha512", Xy, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = Qn.masterKeysFromSeed(e), r = Y(t ? jy : Vy), s = "0x00", i = "0x00000000", o = "0x00000000", a = n.slice(32), d = n.slice(0, 32), l = Pt([
      r,
      s,
      i,
      o,
      a,
      Pt(["0x00", d])
    ]), m = ra(Te(Te(l)), 0, 4);
    return zA(Pt([l, m]));
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
    const n = t ? Te(Pt([Mn(e), Y(t)])) : Mn(e);
    return Qn.entropyToMnemonic(n);
  }
}, Ha = Qn, j0 = 2147483648, q0 = V("0x0488ade4"), Ja = V("0x0488b21e"), W0 = V("0x04358394"), Za = V("0x043587cf");
function MA(e) {
  return zA(Pt([e, ra(Te(Te(e)), 0, 4)]));
}
function Wy(e = !1, t = !1) {
  return e ? t ? Za : Ja : t ? W0 : q0;
}
function $y(e) {
  return [Ja, Za].includes(V(e.slice(0, 4)));
}
function Ky(e) {
  return [q0, W0, Ja, Za].includes(
    V(e.slice(0, 4))
  );
}
function zy(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new D(k.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + j0 : parseInt(r, 10)
  );
}
var rr = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    N(this, "depth", 0);
    N(this, "index", 0);
    N(this, "fingerprint", V("0x00000000"));
    N(this, "parentFingerprint", V("0x00000000"));
    N(this, "privateKey");
    N(this, "publicKey");
    N(this, "chainCode");
    if (e.privateKey) {
      const t = new Fr(e.privateKey);
      this.publicKey = V(t.compressedPublicKey), this.privateKey = V(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new D(
          k.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = V(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = ra(as(Te(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & j0) {
      if (!t)
        throw new D(
          k.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(Y(this.publicKey));
    s.set(kn(e, 4), 33);
    const i = Y(Rr("sha512", r, s)), o = i.slice(0, 32), a = i.slice(32);
    if (t) {
      const m = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", g = x(o).add(t).mod(m).toBytes(32);
      return new rr({
        privateKey: g,
        chainCode: a,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const l = new Fr(V(o)).addPoint(n);
    return new rr({
      publicKey: l,
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
    return zy(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
      throw new D(
        k.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = Wy(this.privateKey == null || e, t), r = V(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = fa(this.index, 4), o = this.chainCode, a = this.privateKey != null && !e ? Pt(["0x00", this.privateKey]) : this.publicKey, d = Y(
      Pt([n, r, s, i, o, a])
    );
    return MA(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = Ha.masterKeysFromSeed(e);
    return new rr({
      chainCode: Y(t.slice(32)),
      privateKey: Y(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Ll(Ul(e)), n = Y(t), r = MA(n.slice(0, 78)) === e;
    if (n.length !== 82 || !Ky(n))
      throw new D(k.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new D(k.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = V(n.slice(5, 9)), o = parseInt(V(n.slice(9, 13)).substring(2), 16), a = V(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new D(
        k.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if ($y(n)) {
      if (d[0] !== 3)
        throw new D(k.HD_WALLET_ERROR, "Invalid public extended key.");
      return new rr({
        publicKey: d,
        chainCode: a,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new D(k.HD_WALLET_ERROR, "Invalid private extended key.");
    return new rr({
      privateKey: d.slice(1),
      chainCode: a,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, wo = rr, Ya = class extends Ga {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Nt(e, this._provider);
  }
}, Nt = class extends X0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new Fr("0x00"), new Ya(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = Fr.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = wo.fromSeed(e).derivePath(n || Nt.defaultPath);
    return new Nt(s.privateKey, t);
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
    const s = Ha.mnemonicToSeed(e, r), o = wo.fromSeed(s).derivePath(n || Nt.defaultPath);
    return new Nt(o.privateKey, t);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(e, t) {
    const n = wo.fromExtendedKey(e);
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
    const r = await Uy(e, t);
    return new Nt(r, n);
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
    return new Ya(e, t);
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
ke(Rt, "generate", Nt.generate);
ke(Rt, "fromSeed", Nt.fromSeed);
ke(Rt, "fromMnemonic", Nt.fromMnemonic);
ke(Rt, "fromExtendedKey", Nt.fromExtendedKey);
ke(Rt, "fromEncryptedJson", Nt.fromEncryptedJson);
var eB = class {
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
}, Gn, $0 = class {
  constructor(e) {
    Fn(this, Gn, void 0), ke(this, "pathKey", "{}"), ke(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), ke(this, "numberOfAccounts", 0), ke(this, "provider"), Kt(this, Gn, e.secret || Ha.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1, this.provider = e.provider;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: _e(this, Gn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts,
      provider: this.provider
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = Rt.fromMnemonic(
        _e(this, Gn),
        this.provider,
        this.getDerivePath(t)
      );
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = Rt.fromMnemonic(
      _e(this, Gn),
      this.provider,
      this.getDerivePath(this.numberOfAccounts - 1)
    );
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = ge.fromAddressOrString(e);
    do {
      const r = Rt.fromMnemonic(
        _e(this, Gn),
        this.provider,
        this.getDerivePath(t)
      );
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new D(
      k.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Rt.fromPrivateKey(t, this.provider);
  }
};
Gn = /* @__PURE__ */ new WeakMap();
ke($0, "type", "mnemonic");
var vn, K0 = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e) {
    ke(this, "provider"), Fn(this, vn, []), this.provider = e.provider, e.secret ? Kt(this, vn, [e.secret]) : Kt(this, vn, e.accounts || [
      Rt.generate({
        provider: e.provider
      }).privateKey
    ]);
  }
  serialize() {
    return {
      accounts: _e(this, vn),
      provider: this.provider
    };
  }
  getPublicAccount(e) {
    const t = Rt.fromPrivateKey(e, this.provider);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return _e(this, vn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = Rt.generate({
      provider: this.provider
    });
    return _e(this, vn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ge.fromAddressOrString(e), n = _e(this, vn).find(
      (r) => Rt.fromPrivateKey(r, this.provider).address.equals(t)
    );
    if (!n)
      throw new D(
        k.WALLET_MANAGER_ERROR,
        `No private key found for address '${e}'.`
      );
    return n;
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return Rt.fromPrivateKey(t, this.provider);
  }
};
vn = /* @__PURE__ */ new WeakMap();
ke(K0, "type", "privateKey");
var dn = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function ln(e, t) {
  if (!e)
    throw new D(k.WALLET_MANAGER_ERROR, t);
}
var xt, Hn, on, $o, z0, Ko, el, tl = class extends x0.EventEmitter {
  constructor(e) {
    super(), Fn(this, $o), Fn(this, Ko), ke(this, "storage", new eB()), ke(this, "STORAGE_KEY", "WalletManager"), Fn(this, xt, []), Fn(this, Hn, ""), Fn(this, on, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return _e(this, on);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    ln(!_e(this, on), dn.wallet_not_unlocked);
    const t = _e(this, xt).find((n, r) => r === e);
    return ln(t, dn.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return _e(this, xt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return _e(this, xt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = ge.fromAddressOrString(e), n = _e(this, xt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return ln(n, dn.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ge.fromAddressOrString(e);
    ln(!_e(this, on), dn.wallet_not_unlocked);
    const n = _e(this, xt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return ln(n, dn.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = _e(this, xt)[(e == null ? void 0 : e.vaultId) || 0];
    await ln(t, dn.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    _e(this, xt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Kt(this, xt, _e(this, xt).concat({
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
    Kt(this, on, !0), Kt(this, xt, []), Kt(this, Hn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Kt(this, Hn, e), Kt(this, on, !1);
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
    const n = _e(this, on);
    await this.unlock(e), Kt(this, Hn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await ln(!_e(this, on), dn.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await xg(_e(this, Hn), JSON.parse(e));
      Kt(this, xt, Xo(this, Ko, el).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await ln(!_e(this, on), dn.wallet_not_unlocked);
    const e = await Fg(_e(this, Hn), {
      vaults: Xo(this, $o, z0).call(this, _e(this, xt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = tl.Vaults.find((n) => n.type === e);
    return ln(t, dn.invalid_vault_type), t;
  }
}, tB = tl;
xt = /* @__PURE__ */ new WeakMap();
Hn = /* @__PURE__ */ new WeakMap();
on = /* @__PURE__ */ new WeakMap();
$o = /* @__PURE__ */ new WeakSet();
z0 = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
Ko = /* @__PURE__ */ new WeakSet();
el = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
ke(tB, "Vaults", [$0, K0]);
var nB = class {
  constructor(e) {
    throw new D(k.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new D(k.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new D(k.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new D(k.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new D(k.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new D(k.NOT_IMPLEMENTED, "Not implemented.");
  }
};
ke(nB, "type");
var PC = class {
}, rB = (e) => {
  const n = Y(e), r = jA(n, 16384), s = F0(r.map((o) => V(o)));
  return bd(Pt(["0x4655454C", s]));
}, OA = class extends Ga {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytes - The bytes of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor(t, n, r, s) {
    const { predicateBytes: i, predicateInterface: o } = OA.processPredicateData(
      t,
      r,
      s
    ), a = ge.fromB256(rB(i));
    super(a, n);
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
  populateTransactionPredicateData(t) {
    var s;
    const n = Tt(t), { policies: r } = Di.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === be.Coin && V(i.owner) === this.address.toB256() && (i.predicate = this.bytes, i.predicateData = this.getPredicateData(r.length));
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
  async createTransfer(t, n, r = yt, s = {}) {
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
    }) + wa + Ug + ie + r.byteLength + t * ie;
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
    if (n && (i = new On(n), i.functions.main === void 0))
      throw new D(
        k.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = OA.setConfigurableConstants(
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
        const { offset: a } = r.configurables[i], d = r.encodeConfigurable(i, o);
        s.set(d, a);
      });
    } catch (i) {
      throw new D(
        k.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
}, nl = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(nl || {}), ki = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(ki || {}), rl = "FuelConnector", sB = "FuelConnectorScript", iB = "FuelContentScript", UC = "FuelBackgroundScript", GC = "FuelPopUpScript", HC = "FuelVaultScript", oB = "message", aB = /* @__PURE__ */ ((e) => (e.ping = "ping", e.uiEvent = "uiEvent", e.event = "event", e.request = "request", e.response = "response", e.removeConnection = "removeConnection", e))(aB || {}), sl = class extends x0.EventEmitter {
  constructor() {
    super(...arguments);
    N(this, "name", "");
    N(this, "metadata", {});
    N(this, "connected", !1);
    N(this, "installed", !1);
    N(this, "events", ki);
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
}, { warn: cB } = console, Xa = class extends sl {
  constructor(t = "Fuel Wallet") {
    super();
    N(this, "name", "");
    N(this, "connected", !1);
    N(this, "installed", !1);
    N(this, "events", ki);
    N(this, "metadata", {
      image: "/connectors/fuel-wallet.svg",
      install: {
        action: "Install",
        description: "To connect your Fuel Wallet, install the browser extension.",
        link: "https://chrome.google.com/webstore/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok"
      }
    });
    N(this, "client");
    N(this, "onMessage", (t) => {
      const n = Object.freeze(t);
      if (!this.acceptMessage(n))
        return;
      const { data: r } = n;
      this.onCommunicationMessage(r);
    });
    N(this, "onCommunicationMessage", (t) => {
      switch (t.type) {
        case "response":
          this.onResponse(t);
          break;
        case "event":
          this.onEvent(t);
          break;
      }
    });
    this.name = t, this.setMaxListeners(100), this.client = new D0.JSONRPCClient(this.sendRequest.bind(this), this.createRequestId), this.setupListener(), this.setupConnector();
  }
  /**
   * ============================================================
   * Application communication methods
   * ============================================================
   */
  async setupConnector() {
    if (typeof window < "u")
      try {
        await this.ping(), window.dispatchEvent(new CustomEvent("FuelConnector", { detail: this }));
      } catch (t) {
        cB(t);
      }
  }
  acceptMessage(t) {
    const { data: n } = t;
    return t.origin === window.origin && n.type !== "request" && n.connectorName === this.name && n.target === sB;
  }
  setupListener() {
    typeof window > "u" || window.addEventListener(oB, this.onMessage.bind(this));
  }
  createRequestId() {
    return i0();
  }
  postMessage(t, n) {
    window.postMessage(t, n || window.origin);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async sendRequest(t) {
    t && this.postMessage({
      type: "request",
      target: iB,
      connectorName: this.name,
      request: t
    });
  }
  onResponse(t) {
    this.client.receive(t.response);
  }
  onEvent(t) {
    t.events.forEach((n) => {
      n.event === "start" ? this.setupConnector() : this.emit(n.event, ...n.params);
    });
  }
  /**
   * ============================================================
   * Connector methods
   * ============================================================
   */
  async ping() {
    return this.client.timeout(800).request("ping", {});
  }
  async isConnected() {
    try {
      return await this.client.request("isConnected", {});
    } catch {
      return !1;
    }
  }
  async connect() {
    return this.client.request("connect", {});
  }
  async disconnect() {
    return this.client.request("disconnect", {});
  }
  async accounts() {
    return this.client.request("accounts", {});
  }
  async currentAccount() {
    return this.client.request("currentAccount", {});
  }
  async signMessage(t, n) {
    if (!n.trim())
      throw new Error("Message is required");
    return this.client.request("signMessage", {
      address: t,
      message: n
    });
  }
  async sendTransaction(t, n) {
    if (!n)
      throw new Error("Transaction is required");
    const r = Tt(n), i = {
      url: (await this.currentNetwork()).url
    };
    return this.client.request("sendTransaction", {
      address: t,
      transaction: JSON.stringify(r),
      provider: i
    });
  }
  async assets() {
    return this.client.request("assets", {});
  }
  async addAsset(t) {
    return this.addAssets([t]);
  }
  async addAssets(t) {
    const n = t.map((r) => {
      const s = r.networks.find((i) => i.type === "fuel");
      if (!s)
        throw new Error("Asset for Fuel Network not found!");
      return {
        ...r,
        imageUrl: r.icon,
        decimals: s.decimals,
        assetId: s.assetId
      };
    });
    return this.client.request("addAssets", {
      assets: n
    });
  }
  async addABI(t, n) {
    return this.client.request("addAbi", {
      abiMap: {
        [t]: n
      }
    });
  }
  async getABI(t) {
    return this.client.request("getAbi", {
      contractId: t
    });
  }
  async hasABI(t) {
    return !!await this.getABI(t);
  }
  async currentNetwork() {
    return this.client.request("network", {});
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async selectNetwork(t) {
    throw new Error("Method not implemented.");
  }
  async networks() {
    return this.client.request("networks", {});
  }
  async addNetwork(t) {
    const n = await _i.create(t);
    return this.client.request("addNetwork", {
      network: {
        url: n.url,
        name: n.getChain().name
      }
    });
  }
  async version() {
    return this.client.request("version", {
      app: "0.0.0",
      network: "0.0.0"
    });
  }
}, AB = class extends Xa {
  constructor() {
    super("Fuel Wallet Development");
    N(this, "metadata", {
      image: "/connectors/fuel-wallet-dev.svg",
      install: {
        action: "Install",
        description: "To connect your Fuel Wallet, you need to install the browser extension first.",
        link: "https://chrome.google.com/webstore/detail/fuel-wallet-development/hcgmehahnlbhpilepakbdinkhhaackmc"
      }
    });
  }
}, uB = class extends Xa {
  constructor() {
    super("Fuelet Wallet");
    N(this, "name", "Fuelet Wallet");
    N(this, "metadata", {
      image: {
        light: "/connectors/fuelet-light.svg",
        dark: "/connectors/fuelet-dark.svg"
      },
      install: {
        action: "Install",
        description: "Install Fuelet Wallet in order to connect it.",
        link: "https://fuelet.app/download/"
      }
    });
  }
};
function dB({ devMode: e } = {}) {
  const t = [new Xa(), new uB()];
  return e && t.push(new AB()), t;
}
var lB = class extends Ya {
  constructor(t, n, r) {
    super(t, r);
    N(this, "connector");
    N(this, "_provider");
    this.connector = n, this._provider = r;
  }
  async signMessage(t) {
    return this.connector.signMessage(this.address.toString(), t);
  }
  async sendTransaction(t) {
    const n = await this.connector.sendTransaction(
      this.address.toString(),
      t
    );
    return this.provider.getTransactionResponse(n);
  }
}, zo = class extends _i {
  static async create(e, t) {
    const n = new zo(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new ai(e, this);
  }
};
function hB(e, { cache: t, cacheTime: n, key: r }) {
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
function JC(e) {
  window.dispatchEvent(
    new CustomEvent(rl, {
      detail: e
    })
  );
}
function ZC(e, t, n = "fuel") {
  const r = e.networks.find(
    (s) => s.chainId === t && s.type === n
  );
  if (!r)
    throw new Error("Asset not found for the given chain and network.");
  return {
    ...e,
    assetId: r.assetId,
    decimals: r.decimals,
    chainId: r.chainId,
    network: r.type
  };
}
function fB() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function Rs(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var gB = 2e3, pB = 5e3, Xr = class extends sl {
  constructor(t = Xr.defaultConfig) {
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
      const { _targetObject: t } = this, n = rl;
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
    this.setMaxListeners(1e3), this._connectors = t.connectors ?? dB({
      devMode: t.devMode
    }), this._targetObject = this.getTargetObject(t.targetObject), this._storage = t.storage === void 0 ? this.getStorage() : t.storage, this.setupMethods(), this.setDefaultConnector(), this._targetUnsubscribe = this.setupConnectorListener();
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
      return window.localStorage;
  }
  /**
   * Setup the default connector from the storage.
   */
  setDefaultConnector() {
    var n, r;
    const t = ((n = this._storage) == null ? void 0 : n.getItem(Xr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(nl).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      Rs(t.isConnected()),
      Rs(this.pingConnector(t))
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
      return await hB(async () => Rs(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: pB
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(ki)), (o = this._storage) == null || o.setItem(Xr.STORAGE_KEY, r.name), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = fB();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), Rs(t.promise, gB).then(() => !0).catch(() => !1);
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
      n = await zo.create(t.url);
    else {
      if (t)
        throw new Error("Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await zo.create(r.url);
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
    return new lB(t, this, r);
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
  clean() {
    var t;
    (t = this._storage) == null || t.removeItem(Xr.STORAGE_KEY);
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  destroy() {
    this.unsubscribe(), this.clean();
  }
}, il = Xr;
ke(il, "STORAGE_KEY", "fuel-current-connector");
ke(il, "defaultConfig", {});
var mB = [
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
], Eo = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", wB = (e) => mB.includes(e) ? e : e === "Revert(123)" ? "MismatchedSelector" : "unknown", EB = (e) => {
  if ((e == null ? void 0 : e.type) === "FailureStatus") {
    const t = wB(e.reason);
    return {
      doc: t !== "unknown" ? `${Eo}#variant.${t}` : Eo,
      reason: t
    };
  }
  return { doc: Eo, reason: "unknown" };
};
function Io(e, t) {
  if (!e)
    throw new D(k.TRANSACTION_ERROR, t);
}
var LA = {
  [np]: "RequireFailed",
  [Cd]: "TransferToAddressFailed",
  [rp]: "SendMessageFailed",
  [sp]: "AssertEqFailed",
  [ip]: "AssertFailed",
  [op]: "Unknown"
}, IB = (e) => {
  const t = e.val.toHex();
  return LA[t] ? LA[t] : void 0;
}, ws = class extends Error {
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
    N(this, "receipt");
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
}, yB = class extends ws {
  /**
   * Creates a new instance of RequireRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "RequireRevertError";
  }
}, BB = class extends ws {
  /**
   * Creates a new instance of TransferToAddressRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "TransferToAddressRevertError";
  }
}, CB = class extends ws {
  /**
   * Creates a new instance of SendMessageRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "SendMessageRevertError";
  }
}, bB = class extends ws {
  /**
   * Creates a new instance of AssertFailedRevertError.
   *
   * @param receipt - The transaction revert receipt.
   * @param reason - The revert reason.
   */
  constructor(e, t) {
    super(e, t), this.name = "AssertFailedRevertError";
  }
}, QB = (e) => {
  const t = IB(e);
  if (t)
    switch (t) {
      case "RequireFailed":
        return new yB(e, t);
      case "TransferToAddressFailed":
        return new BB(e, t);
      case "SendMessageFailed":
        return new CB(e, t);
      case "AssertFailed":
        return new bB(e, t);
      default:
        return new ws(e, t);
    }
}, { warn: vB } = console, xB = (e) => e.filter((t) => t.type === de.Revert), FB = class {
  constructor(e) {
    N(this, "revertReceipts");
    this.revertReceipts = xB(e);
  }
  assert(e) {
    const t = this.getError();
    if (t)
      throw t.cause = e, t;
  }
  getError() {
    if (this.revertReceipts.length)
      return this.revertReceipts.length !== 1 && vB(
        "Multiple revert receipts found, expected one. Receipts:",
        JSON.stringify(this.revertReceipts)
      ), QB(this.revertReceipts[0]);
  }
}, NB = (e, t) => typeof t == "bigint" ? t.toString() : t, DB = class extends Error {
  constructor(t, n, r) {
    var a;
    let s = "";
    (a = t == null ? void 0 : t.gqlTransaction) != null && a.status && (s = `${JSON.stringify(EB(t.gqlTransaction.status), null, 2)}

`);
    const i = r.length ? `Logs:
${JSON.stringify(r, null, 2)}

` : "", o = `Receipts:
${JSON.stringify(
      t.receipts.map(({ type: d, ...l }) => ({ type: de[d], ...l })),
      NB,
      2
    )}`;
    super(`${n}

${s}${i}${o}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    N(this, "logs");
    this.logs = r, new FB(t.receipts).assert(this);
  }
}, an, YA, ol = (YA = class {
  constructor(...e) {
    Ct(this, an, void 0);
    kt(this, an, e || []);
  }
  entries() {
    return ve(this, an);
  }
  push(...e) {
    ve(this, an).push(...e);
  }
  concat(e) {
    return ve(this, an).concat(e);
  }
  extend(e) {
    ve(this, an).push(...e);
  }
  toBytes() {
    return le(
      ve(this, an).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return V(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(ve(this, an), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, an = new WeakMap(), YA), RB = (e) => wa + wi({ maxInputs: e }), al = ie + jr + Og + ie + ie;
function SB(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === de.ScriptResult ? n = i : (i.type === de.Return || i.type === de.ReturnData || i.type === de.Revert) && (r = i);
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
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function Va(e, t, n = []) {
  try {
    const r = SB(e);
    return t(r);
  } catch (r) {
    throw new DB(
      e,
      r.message,
      n
    );
  }
}
function _B(e, t, n) {
  return Va(
    e,
    (r) => {
      if (r.returnReceipt.type === de.Revert)
        throw new D(
          k.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== de.Return && r.returnReceipt.type !== de.ReturnData) {
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
      return r.returnReceipt.type === de.Return && (s = r.returnReceipt.val), r.returnReceipt.type === de.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
    },
    n
  );
}
var rs = class {
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
    return wi({ maxInputs: t }) + wa + e;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(e) {
    return rs.getScriptDataOffsetWithScriptBytes(this.bytes.length, e);
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
    return Va(e, this.scriptResultDecoder, t);
  }
}, cl = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, kB = Le, Al = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new ol(
    xs(16, e),
    xs(17, n),
    Zr(17, 17, 0),
    xs(18, r)
  );
  return t ? i.push(
    xs(19, t),
    Zr(19, 19, 0),
    oA(16, 17, 18, 19)
  ) : i.push(oA(16, 17, 18, Pe.cgas().to_u8())), s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Zr(21, Pe.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Zr(22, Pe.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    $m(22, 22, s.encodedLength),
    qm(21, 22)
  ]), i;
};
function TA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new ol();
  for (let r = 0; r < e.length; r += 1)
    n.extend(Al(e[r], t[r]).entries());
  return n.push(r0(1)), n.toBytes();
}
var PA = (e) => e === de.Return || e === de.ReturnData, MB = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === de.Call && r === kB && s === t
), OB = (e, t) => (n) => {
  if (cn(n.code) !== 0)
    throw new D(
      k.TRANSACTION_ERROR,
      `Execution of the script associated with contract ${e} resulted in a non-zero exit code: ${n.code}.`
    );
  const r = MB(
    n.receipts,
    e.toB256()
  ), s = x(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => PA(o)).flatMap((o, a, d) => {
    var l;
    if (!s.eq(x(o.is)))
      return [];
    if (o.type === de.Return)
      return [new S().encode(o.val)];
    if (o.type === de.ReturnData) {
      const m = Y(o.data);
      if (t && PA((l = d[a + 1]) == null ? void 0 : l.type)) {
        const g = d[a + 1];
        return le([m, Y(g.data)]);
      }
      return [m];
    }
    return [new Uint8Array()];
  });
}, LB = (e, t, n, r = []) => Va(e, OB(t, n), r), TB = (e) => e.reduce(
  (t, n) => {
    const r = { ...cl };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength
    };
    return t + Al(r, s).byteLength();
  },
  jt.size()
  // placeholder for single RET instruction which is added later
), PB = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength
  };
}), UA = (e, t) => new rs(
  // Script to call the contract, start with stub size matching length of calls
  TA(
    new Array(e.length).fill(cl),
    PB(e)
  ),
  (n) => {
    var v;
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = TB(n), i = (8 - s % 8) % 8, o = s + i, a = RB(t.toNumber()) + o, d = [];
    let l = a;
    const m = [], g = [];
    for (let C = 0; C < r; C += 1) {
      const F = n[C];
      m.push({
        isHeap: F.isOutputDataHeap,
        encodedLength: F.outputEncodedLength
      });
      let R = 0;
      if (d.push({
        amountOffset: l,
        assetIdOffset: l + ie,
        gasForwardedOffset: F.gas ? l + ie + jr : 0,
        callDataOffset: l + ie + jr + R
      }), g.push(new S().encode(F.amount || 0)), g.push(new H().encode(((v = F.assetId) == null ? void 0 : v.toString()) || yt)), g.push(F.contractId.toBytes()), g.push(new S().encode(F.fnSelector)), F.gas && (g.push(new S().encode(F.gas)), R = ie), F.isInputDataPointer) {
        const T = l + al + R;
        g.push(new S().encode(T));
      }
      const G = Y(F.data);
      g.push(G), l = a + le(g).byteLength;
    }
    const b = TA(d, m);
    return { data: le(g), script: b };
  },
  () => [new Uint8Array()]
);
function UB(e) {
  const t = e.receipts.find((n) => n.type === de.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || x(0);
}
var ul = class {
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
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = UB(t);
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
      return _B(e, n, t);
    const s = LB(
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
    return Ry(e, n.interface);
  }
}, dl = class extends ul {
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
    return new dl(
      t,
      n,
      i,
      s,
      r
    );
  }
}, ea = class extends ul {
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
    return await new ea(t, n, r);
  }
};
function GB(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o } = e.getCallConfig(), a = e.getCallConfig().func.isInputDataPointer ? al : 0, d = i.encodeArguments(r, t + a);
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
var ll = class {
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
    this.program = e, this.isMultiCall = t, this.transactionRequest = new fr();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const t = this.getProvider().getChain().consensusParameters;
    if (!t)
      throw new D(
        D.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = t.maxInputs, r = UA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => GB(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = UA(this.functionInvocationScopes, e);
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
      amount: x(t.amount || 0)
    })).filter(({ assetId: t, amount: n }) => t && !x(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const e = this.getRequiredCoins(), t = (n, { assetId: r, amount: s }) => {
      var o;
      const i = ((o = n.get(r)) == null ? void 0 : o.amount) || x(0);
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
    await va(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal();
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), x(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
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
  async getTransactionCost(e) {
    const t = this.getProvider(), n = await this.getTransactionRequest();
    return n.gasPrice = x(cn(n.gasPrice) || cn((e == null ? void 0 : e.gasPrice) || 0)), await t.getTransactionCost(n, this.getRequiredCoins());
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins(e) {
    var t;
    return this.transactionRequest.inputs = this.transactionRequest.inputs.filter(
      (n) => n.type !== be.Coin
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
    return t.gasPrice = x(e.gasPrice || t.gasPrice || n), t.gasLimit = x(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? x(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? x(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((r = this.txParameters) == null ? void 0 : r.variableOutputs) || 0), this;
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
    Io(this.program.account, "Wallet is required!");
    const e = await this.getTransactionRequest(), { maxFee: t } = await this.getTransactionCost();
    await this.fundWithRequiredCoins(t);
    const n = await this.program.account.sendTransaction(e, {
      awaitExecution: !0
    });
    return dl.build(
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
    if (Io(this.program.account, "Wallet is required!"), !this.program.account.populateTransactionWitnessesSignature)
      return this.dryRun();
    const t = await this.getTransactionRequest(), { maxFee: n } = await this.getTransactionCost();
    await this.fundWithRequiredCoins(n);
    const r = await this.program.account.simulateTransaction(t);
    return ea.build(this.functionInvocationScopes, r, this.isMultiCall);
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   */
  async dryRun() {
    Io(this.program.account, "Wallet is required!");
    const e = this.getProvider(), t = await this.getTransactionRequest(), { maxFee: n } = await this.getTransactionCost();
    await this.fundWithRequiredCoins(n);
    const r = await e.call(t, {
      utxoValidation: !1
    });
    return await ea.build(
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
  async getTransactionId(e) {
    const t = e ?? await this.getProvider().getChainId();
    return (await this.getTransactionRequest()).getTransactionId(t);
  }
}, hl = class extends ll {
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
    if (this.callParameters = t, t != null && t.forward) {
      if (!this.func.attributes.find((n) => n.name === "payable"))
        throw new D(
          k.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = ka(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, HB = class extends ll {
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
        throw new D(
          k.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new D(
        k.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, JB = class {
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
    this.interface = t instanceof On ? t : new On(t), this.id = ge.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
    return (...t) => new hl(this, e, t);
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(e) {
    return new HB(this, e);
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
}, ZB = class extends hl {
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
      throw new D(
        D.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.maxInputs.toNumber(), s = new Ie(t.length).encodedLength;
    this.scriptRequest = new rs(
      t,
      (i) => this.func.encodeArguments(
        i,
        rs.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, YC = class extends zg {
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
    this.bytes = Y(t), this.interface = new On(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new ZB(this, this.interface.getFunction("main"), s)
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
      throw new D(
        k.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
};
new rs(
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
function XC(e) {
  return e;
}
var YB = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(YB || {}), XB = Object.defineProperty, VB = (e, t) => {
  for (var n in t)
    XB(e, n, { get: t[n], enumerable: !0 });
}, jB = {};
VB(jB, {
  getContractId: () => pl,
  getContractRoot: () => fl,
  getContractStorageRoot: () => gl,
  hexlifyWithPrefix: () => ta
});
var fl = (e) => {
  const n = Y(e), r = jA(n, 16384);
  return F0(r.map((s) => V(s)));
}, gl = (e) => {
  const t = new CE();
  return e.forEach(({ key: n, value: r }) => t.update(Te(n), r)), t.root;
}, pl = (e, t, n) => {
  const r = fl(Y(e));
  return Te(Pt(["0x4655454C", t, r, n]));
}, ta = (e, t = !1) => {
  if (e.startsWith("0x"))
    return V(e);
  if (t)
    return V(`0x${e}`);
  throw new D(D.CODES.UNEXPECTED_HEX_VALUE, `Value should be hex string ${e}.`);
}, qB = class {
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
    this.bytecode = Y(e), t instanceof On ? this.interface = t : this.interface = new On(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new qB(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: a, value: d }) => ({
      key: ta(a, !0),
      value: ta(d, !0)
    })).sort(({ key: a }, { key: d }) => a.localeCompare(d)), n = {
      salt: Mn(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new D(
        k.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || gl(n.storageSlots), s = pl(this.bytecode, n.salt, r), i = new jo({
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
      throw new D(k.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), { requiredQuantities: s, maxFee: i } = await this.account.provider.getTransactionCost(r);
    return r.gasPrice = this.account.provider.getGasConfig().minGasPrice, r.maxFee = this.account.provider.getGasConfig().maxGasPerTx, await this.account.fund(r, s, i), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new JB(n, this.interface, this.account);
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
      throw new D(
        k.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, VC = 9, jC = 3, qC = 9, WC = [
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
], $C = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html", XA, KC = typeof process < "u" && ((XA = process == null ? void 0 : process.env) == null ? void 0 : XA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/graphql";
export {
  jr as ASSET_ID_LEN,
  Id as AbstractAccount,
  $g as AbstractAddress,
  Kg as AbstractContract,
  yd as AbstractProgram,
  zg as AbstractScript,
  fC as AbstractScriptRequest,
  Ga as Account,
  ge as Address,
  hy as AddressType,
  bt as ArrayCoder,
  bB as AssertFailedRevertError,
  H as B256Coder,
  Xg as B512Coder,
  UC as BACKGROUND_SCRIPT_NAME,
  Ge as BN,
  yt as BaseAssetId,
  Di as BaseTransactionRequest,
  X0 as BaseWalletUnlocked,
  Vg as BooleanCoder,
  Ie as ByteArrayCoder,
  sB as CONNECTOR_SCRIPT,
  iB as CONTENT_SCRIPT_NAME,
  Og as CONTRACT_ID_LEN,
  mC as CONTRACT_MAX_SIZE,
  fy as ChainName,
  RC as ChangeOutputCollisionError,
  ue as Coder,
  YB as Commands,
  JB as Contract,
  qB as ContractFactory,
  jB as ContractUtils,
  jo as CreateTransactionRequest,
  qC as DECIMAL_UNITS,
  jC as DEFAULT_MIN_PRECISION,
  VC as DEFAULT_PRECISION,
  oB as EVENT_MESSAGE,
  bC as EmptyRoot,
  cd as EnumCoder,
  sp as FAILED_ASSERT_EQ_SIGNAL,
  ip as FAILED_ASSERT_SIGNAL,
  np as FAILED_REQUIRE_SIGNAL,
  rp as FAILED_SEND_MESSAGE_SIGNAL,
  Cd as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  op as FAILED_UNKNOWN_SIGNAL,
  ei as FUEL_BECH32_HRP_PREFIX,
  KC as FUEL_NETWORK_URL,
  il as Fuel,
  sl as FuelConnector,
  rl as FuelConnectorEventType,
  ki as FuelConnectorEventTypes,
  nl as FuelConnectorMethods,
  Xa as FuelWalletConnector,
  AB as FuelWalletDevelopmentConnector,
  lB as FuelWalletLocked,
  zo as FuelWalletProvider,
  uB as FueletWalletConnector,
  dl as FunctionInvocationResult,
  hl as FunctionInvocationScope,
  wo as HDWallet,
  Ug as INPUT_COIN_FIXED_SIZE,
  Vs as InputCoder,
  Qc as InputCoinCoder,
  Xs as InputContractCoder,
  Wr as InputMessageCoder,
  be as InputType,
  ol as InstructionSet,
  On as Interface,
  ul as InvocationResult,
  Gy as Language,
  CC as MAX_PREDICATE_DATA_LENGTH,
  BC as MAX_PREDICATE_LENGTH,
  IC as MAX_SCRIPT_DATA_LENGTH,
  EC as MAX_SCRIPT_LENGTH,
  yC as MAX_STATIC_CONTRACTS,
  wC as MAX_WITNESSES,
  _A as MNEMONIC_SIZES,
  eB as MemoryStorage,
  aB as MessageTypes,
  Ha as Mnemonic,
  $0 as MnemonicVault,
  HB as MultiCallInvocationScope,
  VI as NoWitnessAtIndexError,
  SC as NoWitnessByOwnerError,
  z as NumberCoder,
  ly as OperationName,
  xc as OutputChangeCoder,
  qs as OutputCoder,
  vc as OutputCoinCoder,
  js as OutputContractCoder,
  Nc as OutputContractCreatedCoder,
  Be as OutputType,
  Fc as OutputVariableCoder,
  $C as PANIC_DOC_URL,
  WC as PANIC_REASONS,
  GC as POPUP_SCRIPT_NAME,
  Ws as PoliciesCoder,
  Wt as PolicyType,
  OA as Predicate,
  K0 as PrivateKeyVault,
  _i as Provider,
  So as ReceiptBurnCoder,
  Dc as ReceiptCallCoder,
  gC as ReceiptCoder,
  Mc as ReceiptLogCoder,
  Oc as ReceiptLogDataCoder,
  $s as ReceiptMessageOutCoder,
  $r as ReceiptMintCoder,
  _c as ReceiptPanicCoder,
  Rc as ReceiptReturnCoder,
  Sc as ReceiptReturnDataCoder,
  kc as ReceiptRevertCoder,
  Pc as ReceiptScriptResultCoder,
  Lc as ReceiptTransferCoder,
  Tc as ReceiptTransferOutCoder,
  de as ReceiptType,
  yB as RequireRevertError,
  ws as RevertError,
  wa as SCRIPT_FIXED_SIZE,
  YC as Script,
  rs as ScriptRequest,
  DB as ScriptResultDecoderError,
  fr as ScriptTransactionRequest,
  CB as SendMessageRevertError,
  Fr as Signer,
  PC as StorageAbstract,
  Uc as StorageSlotCoder,
  qg as StringCoder,
  Ei as StructCoder,
  Ln as TransactionCoder,
  Hc as TransactionCreateCoder,
  Jc as TransactionMintCoder,
  ai as TransactionResponse,
  Gc as TransactionScriptCoder,
  dy as TransactionStatus,
  vt as TransactionType,
  uy as TransactionTypeName,
  BB as TransferToAddressRevertError,
  ld as TupleCoder,
  Ir as TxPointerCoder,
  S as U64Coder,
  pC as UtxoIdCoder,
  HC as VAULT_SCRIPT_NAME,
  nB as Vault,
  hd as VecCoder,
  ie as WORD_SIZE,
  Rt as Wallet,
  Ya as WalletLocked,
  tB as WalletManager,
  Nt as WalletUnlocked,
  Ks as WitnessCoder,
  Le as ZeroBytes32,
  GE as addAmountToAsset,
  Kn as addOperation,
  Ur as addressify,
  qA as arrayify,
  UI as assembleReceiptByType,
  Si as assembleTransactionSummary,
  Io as assert,
  x as bn,
  Sn as bufferFromString,
  NC as buildBlockExplorerUrl,
  hB as cacheFor,
  L0 as calculateMetadataGasForTxCreate,
  T0 as calculateMetadataGasForTxScript,
  hr as calculatePriceWithFactor,
  KI as calculateTransactionFee,
  wi as calculateVmTxMemory,
  $B as capitalizeString,
  jA as chunkAndPadBytes,
  fp as clearFirst12BytesFromB256,
  ka as coinQuantityfy,
  le as concat,
  WA as concatBytes,
  XC as createConfig,
  xg as decrypt,
  Ng as decryptJsonWalletData,
  eC as defaultChainConfig,
  dB as defaultConnectors,
  tC as defaultConsensusKey,
  fB as deferPromise,
  JC as dispatchFuelConnectorEvent,
  Fg as encrypt,
  Dg as encryptJsonWalletData,
  Ds as english,
  Fy as extractBurnedAssetsFromReceipts,
  xy as extractMintedAssetsFromReceipts,
  aC as format,
  oC as formatUnits,
  Ia as fromBech32,
  _C as fromDateToTai64,
  zI as fromTai64ToDate,
  DC as fromTai64ToUnix,
  XI as fromUnixToTai64,
  JI as gasUsedByInputs,
  ZC as getAssetByChain,
  Bd as getAssetId,
  ya as getBytesFromBech32,
  Cy as getContractCallOperations,
  Qy as getContractCreatedOperations,
  yy as getContractTransferOperations,
  Ry as getDecodedLogs,
  EB as getDocs,
  M0 as getGasUsedFromReceipts,
  ns as getInputAccountAddress,
  oy as getInputContractFromIndex,
  oi as getInputFromAssetId,
  Pa as getInputsByType,
  ty as getInputsByTypes,
  ny as getInputsCoin,
  sy as getInputsCoinAndMessage,
  iy as getInputsContract,
  ry as getInputsMessage,
  Ta as getMaxGas,
  O0 as getMinGas,
  vy as getOperations,
  ms as getOutputsByType,
  cy as getOutputsChange,
  U0 as getOutputsCoin,
  Ay as getOutputsContract,
  ay as getOutputsContractCreated,
  kC as getOutputsVariable,
  by as getPayProducerOperations,
  rB as getPredicateRoot,
  hp as getRandomB256,
  Ri as getReceiptsByType,
  py as getReceiptsCall,
  my as getReceiptsMessageOut,
  Iy as getReceiptsTransferOut,
  PI as getReceiptsWithMissingData,
  Ny as getTransactionStatusName,
  OC as getTransactionSummary,
  LC as getTransactionSummaryFromRequest,
  G0 as getTransactionTypeName,
  TC as getTransactionsSummaries,
  FA as getTransferOperations,
  By as getWithdrawFromFuelOperations,
  MC as hasSameAssetId,
  bd as hash,
  ap as hashMessage,
  KB as hexlify,
  MI as inputify,
  _o as isB256,
  Ps as isBech32,
  vA as isCoin,
  ko as isEvmAddress,
  FC as isMessage,
  Yc as isPublicKey,
  vC as isRawCoin,
  xC as isRawMessage,
  Ua as isType,
  H0 as isTypeCreate,
  gy as isTypeMint,
  J0 as isTypeScript,
  Vu as keccak256,
  hC as keyFromPassword,
  Ef as max,
  cC as multiply,
  lp as normalizeBech32,
  ZI as normalizeJSON,
  zB as normalizeString,
  OI as outputify,
  gp as padFirst12BytesOfEvmAddress,
  gr as processGqlReceipt,
  Dy as processGraphqlStatus,
  Mn as randomBytes,
  _n as resolveGasDependentCosts,
  xA as returnZeroScript,
  QB as revertErrorFactory,
  Xu as scrypt,
  YI as sleep,
  ep as sortPolicies,
  Pr as stringFromBuffer,
  Xc as toB256,
  Ts as toBech32,
  kn as toBytes,
  wf as toFixed,
  fa as toHex,
  cn as toNumber,
  Tt as transactionRequestify,
  cp as uint64ToBytesBE,
  Rs as withTimeout,
  $I as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
