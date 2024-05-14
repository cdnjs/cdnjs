var V0 = Object.defineProperty;
var X0 = (e, t, n) => t in e ? V0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var _ = (e, t, n) => (X0(e, typeof t != "symbol" ? t + "" : t, n), n), Ji = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var we = (e, t, n) => (Ji(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Le = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Et = (e, t, n, r) => (Ji(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var sn = (e, t, n) => (Ji(e, t, "access private method"), n);
function BA() {
  return {
    FORC: "0.55.0",
    FUEL_CORE: "0.24.3",
    FUELS: "0.82.0"
  };
}
function Ya(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function ko(e, t) {
  const n = Ya(e), r = Ya(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function j0(e, t) {
  const { major: n } = ko(e, t);
  return n === 0;
}
function q0(e, t) {
  const { minor: n } = ko(e, t);
  return n === 0;
}
function W0(e, t) {
  const { patch: n } = ko(e, t);
  return n === 0;
}
function $0(e) {
  const { FUEL_CORE: t } = BA();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: j0(e, t),
    isMinorSupported: q0(e, t),
    isPatchSupported: W0(e, t)
  };
}
var z0 = BA(), K0 = Object.defineProperty, el = (e, t, n) => t in e ? K0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, tl = (e, t, n) => (el(e, typeof t != "symbol" ? t + "" : t, n), n), R = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(R || {}), Bs = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    _(this, "VERSIONS", z0);
    _(this, "metadata");
    _(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
  }
  static parse(t) {
    const n = t;
    if (n.code === void 0)
      throw new Bs(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const r = Object.values(R);
    if (!r.includes(n.code))
      throw new Bs(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${r.join(", ")}.`
      );
    return new Bs(n.code, n.message);
  }
  toObject() {
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, x = Bs;
tl(x, "CODES", R);
var nl = Object.defineProperty, rl = (e, t, n) => t in e ? nl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, sl = (e, t, n) => (rl(e, typeof t != "symbol" ? t + "" : t, n), n), Dy = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, CA = (e, t) => {
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
  throw new x(R.PARSE_FAILED, "invalid BytesLike value");
}, Xr = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, re = (e) => {
  const t = e.map((n) => J(n));
  return Xr(t);
}, Za = "0123456789abcdef";
function Z(e) {
  const t = J(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Za[(s & 240) >> 4] + Za[s & 15];
  }
  return n;
}
var Ry = (e) => {
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
}, il = 37, bA = BigInt(2 ** 62) + BigInt(il), ol = (e) => Math.floor(e / 1e3), QA = (e) => e * 1e3, al = (e) => Number(BigInt(e) - bA), cl = (e) => String(BigInt(e) + bA), Al = (e) => QA(al(e)), Cs = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new Cs(Al(e));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(e) {
    return new Cs(e);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(e) {
    return new Cs(QA(e));
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
    return cl(this.toUnixSeconds());
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
    return ol(this.getTime());
  }
}, Mo = Cs;
sl(Mo, "TAI64_NULL", "");
var ul = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V1: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 3e7,
          max_size: 112640
        }
      },
      predicate_params: {
        V1: {
          max_predicate_length: 102400,
          max_predicate_data_length: 102400,
          max_message_data_length: 102400,
          max_gas_per_predicate: 3e7
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
          contract_max_size: 102400,
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
        V1: {
          add: 2,
          addi: 2,
          aloc: 1,
          and: 2,
          andi: 2,
          bal: 366,
          bhei: 2,
          bhsh: 2,
          burn: 33949,
          cb: 2,
          cfei: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 3347,
          ecr1: 46165,
          ed19: 4210,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 1,
          gm: 2,
          gt: 2,
          gtf: 16,
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
          log: 754,
          lt: 2,
          lw: 2,
          mint: 35718,
          mlog: 2,
          mod: 2,
          modi: 2,
          move: 2,
          movi: 2,
          mroo: 5,
          mul: 2,
          muli: 2,
          mldv: 4,
          noop: 1,
          not: 2,
          or: 2,
          ori: 2,
          poph: 3,
          popl: 3,
          pshh: 4,
          pshl: 4,
          ret_contract: 733,
          rvrt_contract: 722,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 253,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 29053,
          time: 79,
          tr: 46242,
          tro: 33251,
          wdcm: 3,
          wqcm: 3,
          wdop: 3,
          wqop: 3,
          wdml: 3,
          wqml: 4,
          wddv: 5,
          wqdv: 7,
          wdmd: 11,
          wqmd: 18,
          wdam: 9,
          wqam: 12,
          wdmm: 11,
          wqmm: 11,
          xor: 2,
          xori: 2,
          call: {
            LightOperation: {
              base: 21687,
              units_per_gas: 4
            }
          },
          ccp: {
            LightOperation: {
              base: 59,
              units_per_gas: 20
            }
          },
          croo: {
            LightOperation: {
              base: 1,
              units_per_gas: 1
            }
          },
          csiz: {
            LightOperation: {
              base: 59,
              units_per_gas: 195
            }
          },
          k256: {
            LightOperation: {
              base: 282,
              units_per_gas: 3
            }
          },
          ldc: {
            LightOperation: {
              base: 45,
              units_per_gas: 65
            }
          },
          logd: {
            LightOperation: {
              base: 1134,
              units_per_gas: 2
            }
          },
          mcl: {
            LightOperation: {
              base: 3,
              units_per_gas: 523
            }
          },
          mcli: {
            LightOperation: {
              base: 3,
              units_per_gas: 526
            }
          },
          mcp: {
            LightOperation: {
              base: 3,
              units_per_gas: 448
            }
          },
          mcpi: {
            LightOperation: {
              base: 7,
              units_per_gas: 585
            }
          },
          meq: {
            LightOperation: {
              base: 11,
              units_per_gas: 1097
            }
          },
          retd_contract: {
            LightOperation: {
              base: 1086,
              units_per_gas: 2
            }
          },
          s256: {
            LightOperation: {
              base: 45,
              units_per_gas: 3
            }
          },
          scwq: {
            HeavyOperation: {
              base: 30375,
              gas_per_unit: 28628
            }
          },
          smo: {
            LightOperation: {
              base: 64196,
              units_per_gas: 1
            }
          },
          srwq: {
            HeavyOperation: {
              base: 262,
              gas_per_unit: 249
            }
          },
          swwq: {
            HeavyOperation: {
              base: 28484,
              gas_per_unit: 26613
            }
          },
          contract_root: {
            LightOperation: {
              base: 45,
              units_per_gas: 1
            }
          },
          state_root: {
            HeavyOperation: {
              base: 350,
              gas_per_unit: 176
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            LightOperation: {
              base: 1645,
              units_per_gas: 14
            }
          }
        }
      },
      base_asset_id: "0000000000000000000000000000000000000000000000000000000000000000",
      block_gas_limit: 3e7,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, dl = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, ll = {
  coins: [
    {
      tx_id: "0x260eabfd50937e92939fd92687e9302a72e91c5065f64f853f2ccbe02396fe09d665",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x2a757c2317236f7883ac9bbbf7d402f034e0b725c544ef1c8725b1d2bd960f8c690f",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x634ef6cda00bac63992bbde80c6d694d484d58025a5ca0c9c848f0d35a5a3eee74b2",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xd3543bb1da137a7987a96a1bb71681fdd195ff25318c0d4a923aa30eb27ffa80bc7b",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xa4d42cbb02adb32f5f3a9eab33a0ee7bdab8910ad9f615dfc86a7bb9e49a732bc58c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xc197cb09b1d89a7862b238e9500631bd43f291aadb7ff55c8129335349634e9fde3f",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x4c4fc2451b9a9b16c520c1b89ec8968ce46823dd0396d84f7e3155861352fdce12c5",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x68df8f08555086a1ab45591e6fe4bf2f538bcb80dd519108030b7e886d6a230c2531",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x1b9bdaa290518373eb905e45ce7fcb89acedd24341ca7749ad47a938e4bf3ca9b7ce",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xa5a2e9db3d1285337fe1183dc1eabe8f9cdcd470daf95cd5c522bbae292f53977f26",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x13b685a1ea7c56309a92d69dd7e4808987ec90d62a1f9c9f2ec18e54746855c8c93c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xf8f00a234cf3fbab86befc3fd9346d7fd1ac085233c9cb58c7447f30c75cbf87ed38",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x2a36c870f624b60fbd6f2b71332ca7f704c69296ceae4ddbf3a8ede79408088934be",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x9cd180d41e67a422da8a7683f036b463a7ed7efc0de31c1692adac90decbfebce78c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xfeb4f2388fa22e6613ff85cf4e655f58acdfaa6299eba7f93b812cd1f0d7bbac48f0",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xc4d20299f43358dc32ab853f6631340b09278511b6adbaf34597ade6ef37efd018f1",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x437291414110b0aebaa8be5c0d9ff1e97d1130a24a6c9e028f2b1f6b0576be6aa961",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x28131b9acc90c2058ee14f4094a474146ba5b779cb9021867164b3d41abad3d047a7",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x033bb5f9b0e4f530d50af3a0f12dd510f799af495ef88baea3cf854a37da728d214b",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x460591398552eca338dd9577f362b91b0f9297f308258734870350004dcc303c67e9",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x447a7c37aee972dcba72f05255c5145dd63125f0fc46ef98c216f775ee0421e23d2b",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xf4a5d727606260c7ac6333fa89e7aef474df8a13326716d4d02f6392ebb7b997d268",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x25a49b0731bf610f6706aa9e9e96e5967f7c50f4302a3c75d7c8141595896551c18d",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x0a6e3585881ef2edf3f7727762799089dc0b5923e8b3718b49044dd9ddcb33b68459",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xf73bbe0635f7b6d59a090a21d87288b82164d0f6101da830ce64eff64a2d2ff2ac37",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x6cc44cb8d2a6462a591a77b6b9917eb6b22ad80d23d3cfd4f94c9da49c14b3cbac6e",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xbf2305d284ea95227040df4cc727156cccc2ca6aa3b92ed86fea4db1c37e5905f926",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xf4e1c76c72ecae699696f5e7a62ccf1425f7395080d0ca7b25ab63d1f841f425b807",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x619c80ee9f4c27c2e134cec6c67bdb268ce7fb1d2ac229ca2a44ec7ac88b2da99669",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x978d5b6be047ffbf1474dc376a6baa33264629b809e4a8210d11aaa805ec6451585d",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x673ba12fca6e52429896096262b8c59b61751976e552649fb1fe7369488fc10aa83c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbca334a06d19db5041c78fe2f465b07be5bec828f38b7796b2877e7d1542c950",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xc42a165104b9fcfa4a9ebffc707781ace233f1c0609c24c36a5c4bfcd407480ddb6c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xb353fbcd94abba347f3ba25e17744e98da26e608ebccbbbd2e9d004997644bdf993c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xc34a6fcb241dec82f885019caf5e14bb6708b435afebfef0037ac447fbb6d30378a3",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xbd9a1dc8d3ec3521c43f6c2c01611b4d0204c7610204ff0178488c8738a30bd2",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x421dfb5811c905724f2f4c6370cd15eaeb590ddeb966f9a4b9f8d65991dfe5142e12",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xa952c0487eefac5dda612011c4c82554c8660834461b9b815c6ae257b56b68005235",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xebaccf91b3b213341d047b6e6af214f1f9729b3d6dadf9c1918a9fe412486af871db",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0xb32197cf75efe05bf453c26178139f09b391582065549c1422bc92555ecffb64",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xda6d61c153e7d735954408274f4ffe8459c2dbab720ce22a1ae9ffedd33077b5b19d",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x508871600ef68c4f1e021dd0db219c733107151338aa95de530bd10dc61f6a69c144",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x509994738b4973e2dbbff9596b176a89fb07ee95f0ed575a4fe07a735a2a181f3200",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x3b24509ed4ab3c7959f5c9391c1445c59290cdb5f13d6f780922f376b7029f30",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0x6cc0cb58df0e0606fc85481aaaf5f47e145a67240b298c184bcb7fd7367c3bbf9453",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x9ddea761afc31516307e1553647ac6cc26d4a82fed9a9e6a03b994cdbf2293b3e3b6",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x82dbc478ba63abf28b92d9dce0cb8c2e6c02833d436fe812a33cf78417e4a80c1306",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x77c6f40b7da70d885f68efaad7c661327482a63ea10dcb4271de819438254ae1",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xc3b0cb232c74009fd226a6246403f78bcc33d116579f41d9387c0d76c76942749c7c",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0x708ee45d18f94ab06458712745c92c7b9b6049ba345219d6697eae5208ec0328aeaf",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0xfe26968c44ac5becc608ce543075ae9e677b7631f3beb7a11ba20703fdca3c0e3569",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x6a2c4691c547c43924650dbd30620b184b5fe3fb6dbe5c4446110b08f6f405bf",
      amount: 18446744073709552e3,
      asset_id: "0x0202020202020202020202020202020202020202020202020202020202020202"
    },
    {
      tx_id: "0xe0ec1d2c991feac69be4d0e84ad7c964616de08e16dccc4d2000b1900ba31082b993",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      tx_id: "0xfa82dbdd72252d1e6c76ee818bbac0441c3a705aff447f041c8b9fc3cb03f9ccd7e2",
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: "0x49075a7538e2c88ebe1926ce4d898198a2a4e790d14512943a9864bc536b3c82",
      amount: 18446744073709552e3,
      asset_id: "0x0101010101010101010101010101010101010101010101010101010101010101"
    },
    {
      tx_id: "0x324f45e47cef892ac3e0759f3b72207c77046f9938267af4bd4af2ae031b97cb36c8",
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
    }
  ],
  contracts: [],
  block_height: 0,
  da_block_height: 0
}, Sy = {
  chainConfigJson: ul,
  metadataJson: dl,
  stateConfigJson: ll
}, Ny = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Ls(e) {
  return e !== void 0;
}
var be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Oo(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
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
var To = { exports: {} };
const fl = {}, gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fl
}, Symbol.toStringTag, { value: "Module" })), pl = /* @__PURE__ */ Oo(gl);
To.exports;
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
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = pl.Buffer;
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
      var p = 0;
      a[0] === "-" && (p++, this.negative = 1), p < a.length && (A === 16 ? this._parseHex(a, p, l) : (this._parseBase(a, A, p), l === "le" && this._initArray(this.toArray(), A, l)));
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
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f, I, y = 0;
      if (l === "be")
        for (p = a.length - 1, f = 0; p >= 0; p -= 3)
          I = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[f] |= I << y & 67108863, this.words[f + 1] = I >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
      else if (l === "le")
        for (p = 0, f = 0; p < a.length; p += 3)
          I = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[f] |= I << y & 67108863, this.words[f + 1] = I >>> 26 - y & 67108863, y += 24, y >= 26 && (y -= 26, f++);
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
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var f = 0, I = 0, y;
      if (l === "be")
        for (p = a.length - 1; p >= A; p -= 2)
          y = d(a, A, p) << f, this.words[I] |= y & 67108863, f >= 18 ? (f -= 18, I += 1, this.words[I] |= y >>> 26) : f += 8;
      else {
        var g = a.length - A;
        for (p = g % 2 === 0 ? A + 1 : A; p < a.length; p += 2)
          y = d(a, A, p) << f, this.words[I] |= y & 67108863, f >= 18 ? (f -= 18, I += 1, this.words[I] |= y >>> 26) : f += 8;
      }
      this._strip();
    };
    function h(B, a, A, l) {
      for (var p = 0, f = 0, I = Math.min(B.length, A), y = a; y < I; y++) {
        var g = B.charCodeAt(y) - 48;
        p *= l, g >= 49 ? f = g - 49 + 10 : g >= 17 ? f = g - 17 + 10 : f = g, r(g >= 0 && f < l, "Invalid character"), p += f;
      }
      return p;
    }
    i.prototype._parseBase = function(a, A, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, f = 1; f <= 67108863; f *= A)
        p++;
      p--, f = f / A | 0;
      for (var I = a.length - l, y = I % p, g = Math.min(I, I - y) + l, u = 0, w = l; w < g; w += p)
        u = h(a, w, w + p, A), this.imuln(f), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (y !== 0) {
        var H = 1;
        for (u = h(a, w, a.length, A), w = 0; w < y; w++)
          H *= A;
        this.imuln(H), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = m;
      } catch {
        i.prototype.inspect = m;
      }
    else
      i.prototype.inspect = m;
    function m() {
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
    ], v = [
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
      var l;
      if (a === 16 || a === "hex") {
        l = "";
        for (var p = 0, f = 0, I = 0; I < this.length; I++) {
          var y = this.words[I], g = ((y << p | f) & 16777215).toString(16);
          f = y >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, I--), f !== 0 || I !== this.length - 1 ? l = b[6 - g.length] + g + l : l = g + l;
        }
        for (f !== 0 && (l = f.toString(16) + l); l.length % A !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = v[a], w = D[a];
        l = "";
        var H = this.clone();
        for (H.negative = 0; !H.isZero(); ) {
          var X = H.modrn(w).toString(a);
          H = H.idivn(w), H.isZero() ? l = X + l : l = b[u - X.length] + X + l;
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
      var p = this.byteLength(), f = l || Math.max(1, p);
      r(p <= f, "byte array longer than desired length"), r(f > 0, "Requested array length <= 0");
      var I = C(a, f), y = A === "le" ? "LE" : "BE";
      return this["_toArrayLike" + y](I, p), I;
    }, i.prototype._toArrayLikeLE = function(a, A) {
      for (var l = 0, p = 0, f = 0, I = 0; f < this.length; f++) {
        var y = this.words[f] << I | p;
        a[l++] = y & 255, l < a.length && (a[l++] = y >> 8 & 255), l < a.length && (a[l++] = y >> 16 & 255), I === 6 ? (l < a.length && (a[l++] = y >> 24 & 255), p = 0, I = 0) : (p = y >>> 24, I += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, A) {
      for (var l = a.length - 1, p = 0, f = 0, I = 0; f < this.length; f++) {
        var y = this.words[f] << I | p;
        a[l--] = y & 255, l >= 0 && (a[l--] = y >> 8 & 255), l >= 0 && (a[l--] = y >> 16 & 255), I === 6 ? (l >= 0 && (a[l--] = y >> 24 & 255), p = 0, I = 0) : (p = y >>> 24, I += 2);
      }
      if (l >= 0)
        for (a[l--] = p; l >= 0; )
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
    function k(B) {
      for (var a = new Array(B.bitLength()), A = 0; A < a.length; A++) {
        var l = A / 26 | 0, p = A % 26;
        a[A] = B.words[l] >>> p & 1;
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
      for (var p = 0; p < l.length; p++)
        this.words[p] = A.words[p] ^ l.words[p];
      if (this !== A)
        for (; p < A.length; p++)
          this.words[p] = A.words[p];
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
      for (var p = 0; p < A; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return l > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, A) {
      r(typeof a == "number" && a >= 0);
      var l = a / 26 | 0, p = a % 26;
      return this._expand(l + 1), A ? this.words[l] = this.words[l] | 1 << p : this.words[l] = this.words[l] & ~(1 << p), this._strip();
    }, i.prototype.iadd = function(a) {
      var A;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, A = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, A = this.isub(a), a.negative = 1, A._normSign();
      var l, p;
      this.length > a.length ? (l = this, p = a) : (l = a, p = this);
      for (var f = 0, I = 0; I < p.length; I++)
        A = (l.words[I] | 0) + (p.words[I] | 0) + f, this.words[I] = A & 67108863, f = A >>> 26;
      for (; f !== 0 && I < l.length; I++)
        A = (l.words[I] | 0) + f, this.words[I] = A & 67108863, f = A >>> 26;
      if (this.length = l.length, f !== 0)
        this.words[this.length] = f, this.length++;
      else if (l !== this)
        for (; I < l.length; I++)
          this.words[I] = l.words[I];
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
      var p, f;
      l > 0 ? (p = this, f = a) : (p = a, f = this);
      for (var I = 0, y = 0; y < f.length; y++)
        A = (p.words[y] | 0) - (f.words[y] | 0) + I, I = A >> 26, this.words[y] = A & 67108863;
      for (; I !== 0 && y < p.length; y++)
        A = (p.words[y] | 0) + I, I = A >> 26, this.words[y] = A & 67108863;
      if (I === 0 && y < p.length && p !== this)
        for (; y < p.length; y++)
          this.words[y] = p.words[y];
      return this.length = Math.max(this.length, y), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function N(B, a, A) {
      A.negative = a.negative ^ B.negative;
      var l = B.length + a.length | 0;
      A.length = l, l = l - 1 | 0;
      var p = B.words[0] | 0, f = a.words[0] | 0, I = p * f, y = I & 67108863, g = I / 67108864 | 0;
      A.words[0] = y;
      for (var u = 1; u < l; u++) {
        for (var w = g >>> 26, H = g & 67108863, X = Math.min(u, a.length - 1), $ = Math.max(0, u - B.length + 1); $ <= X; $++) {
          var W = u - $ | 0;
          p = B.words[W] | 0, f = a.words[$] | 0, I = p * f + H, w += I / 67108864 | 0, H = I & 67108863;
        }
        A.words[u] = H | 0, g = w | 0;
      }
      return g !== 0 ? A.words[u] = g | 0 : A.length--, A._strip();
    }
    var V = function(a, A, l) {
      var p = a.words, f = A.words, I = l.words, y = 0, g, u, w, H = p[0] | 0, X = H & 8191, $ = H >>> 13, W = p[1] | 0, te = W & 8191, ne = W >>> 13, Se = p[2] | 0, fe = Se & 8191, oe = Se >>> 13, ve = p[3] | 0, de = ve & 8191, ge = ve >>> 13, Ht = p[4] | 0, _e = Ht & 8191, ye = Ht >>> 13, Br = p[5] | 0, Ne = Br & 8191, Oe = Br >>> 13, us = p[6] | 0, Pe = us & 8191, Ue = us >>> 13, Sa = p[7] | 0, Ge = Sa & 8191, He = Sa >>> 13, Na = p[8] | 0, Je = Na & 8191, Ye = Na >>> 13, ka = p[9] | 0, Ze = ka & 8191, Ve = ka >>> 13, Ma = f[0] | 0, Xe = Ma & 8191, je = Ma >>> 13, Oa = f[1] | 0, qe = Oa & 8191, We = Oa >>> 13, Ta = f[2] | 0, $e = Ta & 8191, ze = Ta >>> 13, La = f[3] | 0, Ke = La & 8191, et = La >>> 13, Fa = f[4] | 0, tt = Fa & 8191, nt = Fa >>> 13, Pa = f[5] | 0, rt = Pa & 8191, st = Pa >>> 13, Ua = f[6] | 0, it = Ua & 8191, ot = Ua >>> 13, Ga = f[7] | 0, at = Ga & 8191, ct = Ga >>> 13, Ha = f[8] | 0, At = Ha & 8191, ut = Ha >>> 13, Ja = f[9] | 0, dt = Ja & 8191, lt = Ja >>> 13;
      l.negative = a.negative ^ A.negative, l.length = 19, g = Math.imul(X, Xe), u = Math.imul(X, je), u = u + Math.imul($, Xe) | 0, w = Math.imul($, je);
      var bi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, g = Math.imul(te, Xe), u = Math.imul(te, je), u = u + Math.imul(ne, Xe) | 0, w = Math.imul(ne, je), g = g + Math.imul(X, qe) | 0, u = u + Math.imul(X, We) | 0, u = u + Math.imul($, qe) | 0, w = w + Math.imul($, We) | 0;
      var Qi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, g = Math.imul(fe, Xe), u = Math.imul(fe, je), u = u + Math.imul(oe, Xe) | 0, w = Math.imul(oe, je), g = g + Math.imul(te, qe) | 0, u = u + Math.imul(te, We) | 0, u = u + Math.imul(ne, qe) | 0, w = w + Math.imul(ne, We) | 0, g = g + Math.imul(X, $e) | 0, u = u + Math.imul(X, ze) | 0, u = u + Math.imul($, $e) | 0, w = w + Math.imul($, ze) | 0;
      var xi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (xi >>> 26) | 0, xi &= 67108863, g = Math.imul(de, Xe), u = Math.imul(de, je), u = u + Math.imul(ge, Xe) | 0, w = Math.imul(ge, je), g = g + Math.imul(fe, qe) | 0, u = u + Math.imul(fe, We) | 0, u = u + Math.imul(oe, qe) | 0, w = w + Math.imul(oe, We) | 0, g = g + Math.imul(te, $e) | 0, u = u + Math.imul(te, ze) | 0, u = u + Math.imul(ne, $e) | 0, w = w + Math.imul(ne, ze) | 0, g = g + Math.imul(X, Ke) | 0, u = u + Math.imul(X, et) | 0, u = u + Math.imul($, Ke) | 0, w = w + Math.imul($, et) | 0;
      var vi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (vi >>> 26) | 0, vi &= 67108863, g = Math.imul(_e, Xe), u = Math.imul(_e, je), u = u + Math.imul(ye, Xe) | 0, w = Math.imul(ye, je), g = g + Math.imul(de, qe) | 0, u = u + Math.imul(de, We) | 0, u = u + Math.imul(ge, qe) | 0, w = w + Math.imul(ge, We) | 0, g = g + Math.imul(fe, $e) | 0, u = u + Math.imul(fe, ze) | 0, u = u + Math.imul(oe, $e) | 0, w = w + Math.imul(oe, ze) | 0, g = g + Math.imul(te, Ke) | 0, u = u + Math.imul(te, et) | 0, u = u + Math.imul(ne, Ke) | 0, w = w + Math.imul(ne, et) | 0, g = g + Math.imul(X, tt) | 0, u = u + Math.imul(X, nt) | 0, u = u + Math.imul($, tt) | 0, w = w + Math.imul($, nt) | 0;
      var _i = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (_i >>> 26) | 0, _i &= 67108863, g = Math.imul(Ne, Xe), u = Math.imul(Ne, je), u = u + Math.imul(Oe, Xe) | 0, w = Math.imul(Oe, je), g = g + Math.imul(_e, qe) | 0, u = u + Math.imul(_e, We) | 0, u = u + Math.imul(ye, qe) | 0, w = w + Math.imul(ye, We) | 0, g = g + Math.imul(de, $e) | 0, u = u + Math.imul(de, ze) | 0, u = u + Math.imul(ge, $e) | 0, w = w + Math.imul(ge, ze) | 0, g = g + Math.imul(fe, Ke) | 0, u = u + Math.imul(fe, et) | 0, u = u + Math.imul(oe, Ke) | 0, w = w + Math.imul(oe, et) | 0, g = g + Math.imul(te, tt) | 0, u = u + Math.imul(te, nt) | 0, u = u + Math.imul(ne, tt) | 0, w = w + Math.imul(ne, nt) | 0, g = g + Math.imul(X, rt) | 0, u = u + Math.imul(X, st) | 0, u = u + Math.imul($, rt) | 0, w = w + Math.imul($, st) | 0;
      var Di = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Di >>> 26) | 0, Di &= 67108863, g = Math.imul(Pe, Xe), u = Math.imul(Pe, je), u = u + Math.imul(Ue, Xe) | 0, w = Math.imul(Ue, je), g = g + Math.imul(Ne, qe) | 0, u = u + Math.imul(Ne, We) | 0, u = u + Math.imul(Oe, qe) | 0, w = w + Math.imul(Oe, We) | 0, g = g + Math.imul(_e, $e) | 0, u = u + Math.imul(_e, ze) | 0, u = u + Math.imul(ye, $e) | 0, w = w + Math.imul(ye, ze) | 0, g = g + Math.imul(de, Ke) | 0, u = u + Math.imul(de, et) | 0, u = u + Math.imul(ge, Ke) | 0, w = w + Math.imul(ge, et) | 0, g = g + Math.imul(fe, tt) | 0, u = u + Math.imul(fe, nt) | 0, u = u + Math.imul(oe, tt) | 0, w = w + Math.imul(oe, nt) | 0, g = g + Math.imul(te, rt) | 0, u = u + Math.imul(te, st) | 0, u = u + Math.imul(ne, rt) | 0, w = w + Math.imul(ne, st) | 0, g = g + Math.imul(X, it) | 0, u = u + Math.imul(X, ot) | 0, u = u + Math.imul($, it) | 0, w = w + Math.imul($, ot) | 0;
      var Ri = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ri >>> 26) | 0, Ri &= 67108863, g = Math.imul(Ge, Xe), u = Math.imul(Ge, je), u = u + Math.imul(He, Xe) | 0, w = Math.imul(He, je), g = g + Math.imul(Pe, qe) | 0, u = u + Math.imul(Pe, We) | 0, u = u + Math.imul(Ue, qe) | 0, w = w + Math.imul(Ue, We) | 0, g = g + Math.imul(Ne, $e) | 0, u = u + Math.imul(Ne, ze) | 0, u = u + Math.imul(Oe, $e) | 0, w = w + Math.imul(Oe, ze) | 0, g = g + Math.imul(_e, Ke) | 0, u = u + Math.imul(_e, et) | 0, u = u + Math.imul(ye, Ke) | 0, w = w + Math.imul(ye, et) | 0, g = g + Math.imul(de, tt) | 0, u = u + Math.imul(de, nt) | 0, u = u + Math.imul(ge, tt) | 0, w = w + Math.imul(ge, nt) | 0, g = g + Math.imul(fe, rt) | 0, u = u + Math.imul(fe, st) | 0, u = u + Math.imul(oe, rt) | 0, w = w + Math.imul(oe, st) | 0, g = g + Math.imul(te, it) | 0, u = u + Math.imul(te, ot) | 0, u = u + Math.imul(ne, it) | 0, w = w + Math.imul(ne, ot) | 0, g = g + Math.imul(X, at) | 0, u = u + Math.imul(X, ct) | 0, u = u + Math.imul($, at) | 0, w = w + Math.imul($, ct) | 0;
      var Si = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Si >>> 26) | 0, Si &= 67108863, g = Math.imul(Je, Xe), u = Math.imul(Je, je), u = u + Math.imul(Ye, Xe) | 0, w = Math.imul(Ye, je), g = g + Math.imul(Ge, qe) | 0, u = u + Math.imul(Ge, We) | 0, u = u + Math.imul(He, qe) | 0, w = w + Math.imul(He, We) | 0, g = g + Math.imul(Pe, $e) | 0, u = u + Math.imul(Pe, ze) | 0, u = u + Math.imul(Ue, $e) | 0, w = w + Math.imul(Ue, ze) | 0, g = g + Math.imul(Ne, Ke) | 0, u = u + Math.imul(Ne, et) | 0, u = u + Math.imul(Oe, Ke) | 0, w = w + Math.imul(Oe, et) | 0, g = g + Math.imul(_e, tt) | 0, u = u + Math.imul(_e, nt) | 0, u = u + Math.imul(ye, tt) | 0, w = w + Math.imul(ye, nt) | 0, g = g + Math.imul(de, rt) | 0, u = u + Math.imul(de, st) | 0, u = u + Math.imul(ge, rt) | 0, w = w + Math.imul(ge, st) | 0, g = g + Math.imul(fe, it) | 0, u = u + Math.imul(fe, ot) | 0, u = u + Math.imul(oe, it) | 0, w = w + Math.imul(oe, ot) | 0, g = g + Math.imul(te, at) | 0, u = u + Math.imul(te, ct) | 0, u = u + Math.imul(ne, at) | 0, w = w + Math.imul(ne, ct) | 0, g = g + Math.imul(X, At) | 0, u = u + Math.imul(X, ut) | 0, u = u + Math.imul($, At) | 0, w = w + Math.imul($, ut) | 0;
      var Ni = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ni >>> 26) | 0, Ni &= 67108863, g = Math.imul(Ze, Xe), u = Math.imul(Ze, je), u = u + Math.imul(Ve, Xe) | 0, w = Math.imul(Ve, je), g = g + Math.imul(Je, qe) | 0, u = u + Math.imul(Je, We) | 0, u = u + Math.imul(Ye, qe) | 0, w = w + Math.imul(Ye, We) | 0, g = g + Math.imul(Ge, $e) | 0, u = u + Math.imul(Ge, ze) | 0, u = u + Math.imul(He, $e) | 0, w = w + Math.imul(He, ze) | 0, g = g + Math.imul(Pe, Ke) | 0, u = u + Math.imul(Pe, et) | 0, u = u + Math.imul(Ue, Ke) | 0, w = w + Math.imul(Ue, et) | 0, g = g + Math.imul(Ne, tt) | 0, u = u + Math.imul(Ne, nt) | 0, u = u + Math.imul(Oe, tt) | 0, w = w + Math.imul(Oe, nt) | 0, g = g + Math.imul(_e, rt) | 0, u = u + Math.imul(_e, st) | 0, u = u + Math.imul(ye, rt) | 0, w = w + Math.imul(ye, st) | 0, g = g + Math.imul(de, it) | 0, u = u + Math.imul(de, ot) | 0, u = u + Math.imul(ge, it) | 0, w = w + Math.imul(ge, ot) | 0, g = g + Math.imul(fe, at) | 0, u = u + Math.imul(fe, ct) | 0, u = u + Math.imul(oe, at) | 0, w = w + Math.imul(oe, ct) | 0, g = g + Math.imul(te, At) | 0, u = u + Math.imul(te, ut) | 0, u = u + Math.imul(ne, At) | 0, w = w + Math.imul(ne, ut) | 0, g = g + Math.imul(X, dt) | 0, u = u + Math.imul(X, lt) | 0, u = u + Math.imul($, dt) | 0, w = w + Math.imul($, lt) | 0;
      var ki = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (ki >>> 26) | 0, ki &= 67108863, g = Math.imul(Ze, qe), u = Math.imul(Ze, We), u = u + Math.imul(Ve, qe) | 0, w = Math.imul(Ve, We), g = g + Math.imul(Je, $e) | 0, u = u + Math.imul(Je, ze) | 0, u = u + Math.imul(Ye, $e) | 0, w = w + Math.imul(Ye, ze) | 0, g = g + Math.imul(Ge, Ke) | 0, u = u + Math.imul(Ge, et) | 0, u = u + Math.imul(He, Ke) | 0, w = w + Math.imul(He, et) | 0, g = g + Math.imul(Pe, tt) | 0, u = u + Math.imul(Pe, nt) | 0, u = u + Math.imul(Ue, tt) | 0, w = w + Math.imul(Ue, nt) | 0, g = g + Math.imul(Ne, rt) | 0, u = u + Math.imul(Ne, st) | 0, u = u + Math.imul(Oe, rt) | 0, w = w + Math.imul(Oe, st) | 0, g = g + Math.imul(_e, it) | 0, u = u + Math.imul(_e, ot) | 0, u = u + Math.imul(ye, it) | 0, w = w + Math.imul(ye, ot) | 0, g = g + Math.imul(de, at) | 0, u = u + Math.imul(de, ct) | 0, u = u + Math.imul(ge, at) | 0, w = w + Math.imul(ge, ct) | 0, g = g + Math.imul(fe, At) | 0, u = u + Math.imul(fe, ut) | 0, u = u + Math.imul(oe, At) | 0, w = w + Math.imul(oe, ut) | 0, g = g + Math.imul(te, dt) | 0, u = u + Math.imul(te, lt) | 0, u = u + Math.imul(ne, dt) | 0, w = w + Math.imul(ne, lt) | 0;
      var Mi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Mi >>> 26) | 0, Mi &= 67108863, g = Math.imul(Ze, $e), u = Math.imul(Ze, ze), u = u + Math.imul(Ve, $e) | 0, w = Math.imul(Ve, ze), g = g + Math.imul(Je, Ke) | 0, u = u + Math.imul(Je, et) | 0, u = u + Math.imul(Ye, Ke) | 0, w = w + Math.imul(Ye, et) | 0, g = g + Math.imul(Ge, tt) | 0, u = u + Math.imul(Ge, nt) | 0, u = u + Math.imul(He, tt) | 0, w = w + Math.imul(He, nt) | 0, g = g + Math.imul(Pe, rt) | 0, u = u + Math.imul(Pe, st) | 0, u = u + Math.imul(Ue, rt) | 0, w = w + Math.imul(Ue, st) | 0, g = g + Math.imul(Ne, it) | 0, u = u + Math.imul(Ne, ot) | 0, u = u + Math.imul(Oe, it) | 0, w = w + Math.imul(Oe, ot) | 0, g = g + Math.imul(_e, at) | 0, u = u + Math.imul(_e, ct) | 0, u = u + Math.imul(ye, at) | 0, w = w + Math.imul(ye, ct) | 0, g = g + Math.imul(de, At) | 0, u = u + Math.imul(de, ut) | 0, u = u + Math.imul(ge, At) | 0, w = w + Math.imul(ge, ut) | 0, g = g + Math.imul(fe, dt) | 0, u = u + Math.imul(fe, lt) | 0, u = u + Math.imul(oe, dt) | 0, w = w + Math.imul(oe, lt) | 0;
      var Oi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Oi >>> 26) | 0, Oi &= 67108863, g = Math.imul(Ze, Ke), u = Math.imul(Ze, et), u = u + Math.imul(Ve, Ke) | 0, w = Math.imul(Ve, et), g = g + Math.imul(Je, tt) | 0, u = u + Math.imul(Je, nt) | 0, u = u + Math.imul(Ye, tt) | 0, w = w + Math.imul(Ye, nt) | 0, g = g + Math.imul(Ge, rt) | 0, u = u + Math.imul(Ge, st) | 0, u = u + Math.imul(He, rt) | 0, w = w + Math.imul(He, st) | 0, g = g + Math.imul(Pe, it) | 0, u = u + Math.imul(Pe, ot) | 0, u = u + Math.imul(Ue, it) | 0, w = w + Math.imul(Ue, ot) | 0, g = g + Math.imul(Ne, at) | 0, u = u + Math.imul(Ne, ct) | 0, u = u + Math.imul(Oe, at) | 0, w = w + Math.imul(Oe, ct) | 0, g = g + Math.imul(_e, At) | 0, u = u + Math.imul(_e, ut) | 0, u = u + Math.imul(ye, At) | 0, w = w + Math.imul(ye, ut) | 0, g = g + Math.imul(de, dt) | 0, u = u + Math.imul(de, lt) | 0, u = u + Math.imul(ge, dt) | 0, w = w + Math.imul(ge, lt) | 0;
      var Ti = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ti >>> 26) | 0, Ti &= 67108863, g = Math.imul(Ze, tt), u = Math.imul(Ze, nt), u = u + Math.imul(Ve, tt) | 0, w = Math.imul(Ve, nt), g = g + Math.imul(Je, rt) | 0, u = u + Math.imul(Je, st) | 0, u = u + Math.imul(Ye, rt) | 0, w = w + Math.imul(Ye, st) | 0, g = g + Math.imul(Ge, it) | 0, u = u + Math.imul(Ge, ot) | 0, u = u + Math.imul(He, it) | 0, w = w + Math.imul(He, ot) | 0, g = g + Math.imul(Pe, at) | 0, u = u + Math.imul(Pe, ct) | 0, u = u + Math.imul(Ue, at) | 0, w = w + Math.imul(Ue, ct) | 0, g = g + Math.imul(Ne, At) | 0, u = u + Math.imul(Ne, ut) | 0, u = u + Math.imul(Oe, At) | 0, w = w + Math.imul(Oe, ut) | 0, g = g + Math.imul(_e, dt) | 0, u = u + Math.imul(_e, lt) | 0, u = u + Math.imul(ye, dt) | 0, w = w + Math.imul(ye, lt) | 0;
      var Li = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Li >>> 26) | 0, Li &= 67108863, g = Math.imul(Ze, rt), u = Math.imul(Ze, st), u = u + Math.imul(Ve, rt) | 0, w = Math.imul(Ve, st), g = g + Math.imul(Je, it) | 0, u = u + Math.imul(Je, ot) | 0, u = u + Math.imul(Ye, it) | 0, w = w + Math.imul(Ye, ot) | 0, g = g + Math.imul(Ge, at) | 0, u = u + Math.imul(Ge, ct) | 0, u = u + Math.imul(He, at) | 0, w = w + Math.imul(He, ct) | 0, g = g + Math.imul(Pe, At) | 0, u = u + Math.imul(Pe, ut) | 0, u = u + Math.imul(Ue, At) | 0, w = w + Math.imul(Ue, ut) | 0, g = g + Math.imul(Ne, dt) | 0, u = u + Math.imul(Ne, lt) | 0, u = u + Math.imul(Oe, dt) | 0, w = w + Math.imul(Oe, lt) | 0;
      var Fi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Fi >>> 26) | 0, Fi &= 67108863, g = Math.imul(Ze, it), u = Math.imul(Ze, ot), u = u + Math.imul(Ve, it) | 0, w = Math.imul(Ve, ot), g = g + Math.imul(Je, at) | 0, u = u + Math.imul(Je, ct) | 0, u = u + Math.imul(Ye, at) | 0, w = w + Math.imul(Ye, ct) | 0, g = g + Math.imul(Ge, At) | 0, u = u + Math.imul(Ge, ut) | 0, u = u + Math.imul(He, At) | 0, w = w + Math.imul(He, ut) | 0, g = g + Math.imul(Pe, dt) | 0, u = u + Math.imul(Pe, lt) | 0, u = u + Math.imul(Ue, dt) | 0, w = w + Math.imul(Ue, lt) | 0;
      var Pi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Pi >>> 26) | 0, Pi &= 67108863, g = Math.imul(Ze, at), u = Math.imul(Ze, ct), u = u + Math.imul(Ve, at) | 0, w = Math.imul(Ve, ct), g = g + Math.imul(Je, At) | 0, u = u + Math.imul(Je, ut) | 0, u = u + Math.imul(Ye, At) | 0, w = w + Math.imul(Ye, ut) | 0, g = g + Math.imul(Ge, dt) | 0, u = u + Math.imul(Ge, lt) | 0, u = u + Math.imul(He, dt) | 0, w = w + Math.imul(He, lt) | 0;
      var Ui = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Ui >>> 26) | 0, Ui &= 67108863, g = Math.imul(Ze, At), u = Math.imul(Ze, ut), u = u + Math.imul(Ve, At) | 0, w = Math.imul(Ve, ut), g = g + Math.imul(Je, dt) | 0, u = u + Math.imul(Je, lt) | 0, u = u + Math.imul(Ye, dt) | 0, w = w + Math.imul(Ye, lt) | 0;
      var Gi = (y + g | 0) + ((u & 8191) << 13) | 0;
      y = (w + (u >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, g = Math.imul(Ze, dt), u = Math.imul(Ze, lt), u = u + Math.imul(Ve, dt) | 0, w = Math.imul(Ve, lt);
      var Hi = (y + g | 0) + ((u & 8191) << 13) | 0;
      return y = (w + (u >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, I[0] = bi, I[1] = Qi, I[2] = xi, I[3] = vi, I[4] = _i, I[5] = Di, I[6] = Ri, I[7] = Si, I[8] = Ni, I[9] = ki, I[10] = Mi, I[11] = Oi, I[12] = Ti, I[13] = Li, I[14] = Fi, I[15] = Pi, I[16] = Ui, I[17] = Gi, I[18] = Hi, y !== 0 && (I[19] = y, l.length++), l;
    };
    Math.imul || (V = N);
    function P(B, a, A) {
      A.negative = a.negative ^ B.negative, A.length = B.length + a.length;
      for (var l = 0, p = 0, f = 0; f < A.length - 1; f++) {
        var I = p;
        p = 0;
        for (var y = l & 67108863, g = Math.min(f, a.length - 1), u = Math.max(0, f - B.length + 1); u <= g; u++) {
          var w = f - u, H = B.words[w] | 0, X = a.words[u] | 0, $ = H * X, W = $ & 67108863;
          I = I + ($ / 67108864 | 0) | 0, W = W + y | 0, y = W & 67108863, I = I + (W >>> 26) | 0, p += I >>> 26, I &= 67108863;
        }
        A.words[f] = y, l = I, I = p;
      }
      return l !== 0 ? A.words[f] = l : A.length--, A._strip();
    }
    function j(B, a, A) {
      return P(B, a, A);
    }
    i.prototype.mulTo = function(a, A) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = V(this, a, A) : p < 63 ? l = N(this, a, A) : p < 1024 ? l = P(this, a, A) : l = j(this, a, A), l;
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
      for (var l = 0, p = 0; p < this.length; p++) {
        var f = (this.words[p] | 0) * a, I = (f & 67108863) + (l & 67108863);
        l >>= 26, l += f / 67108864 | 0, l += I >>> 26, this.words[p] = I & 67108863;
      }
      return l !== 0 && (this.words[p] = l, this.length++), A ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var A = k(a);
      if (A.length === 0)
        return new i(1);
      for (var l = this, p = 0; p < A.length && A[p] === 0; p++, l = l.sqr())
        ;
      if (++p < A.length)
        for (var f = l.sqr(); p < A.length; p++, f = f.sqr())
          A[p] !== 0 && (l = l.mul(f));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, l = (a - A) / 26, p = 67108863 >>> 26 - A << 26 - A, f;
      if (A !== 0) {
        var I = 0;
        for (f = 0; f < this.length; f++) {
          var y = this.words[f] & p, g = (this.words[f] | 0) - y << A;
          this.words[f] = g | I, I = y >>> 26 - A;
        }
        I && (this.words[f] = I, this.length++);
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
      var p;
      A ? p = (A - A % 26) / 26 : p = 0;
      var f = a % 26, I = Math.min((a - f) / 26, this.length), y = 67108863 ^ 67108863 >>> f << f, g = l;
      if (p -= I, p = Math.max(0, p), g) {
        for (var u = 0; u < I; u++)
          g.words[u] = this.words[u];
        g.length = I;
      }
      if (I !== 0)
        if (this.length > I)
          for (this.length -= I, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + I];
        else
          this.words[0] = 0, this.length = 1;
      var w = 0;
      for (u = this.length - 1; u >= 0 && (w !== 0 || u >= p); u--) {
        var H = this.words[u] | 0;
        this.words[u] = w << 26 - f | H >>> f, w = H & y;
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
      var A = a % 26, l = (a - A) / 26, p = 1 << A;
      if (this.length <= l)
        return !1;
      var f = this.words[l];
      return !!(f & p);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var A = a % 26, l = (a - A) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (A !== 0 && l++, this.length = Math.min(l, this.length), A !== 0) {
        var p = 67108863 ^ 67108863 >>> A << A;
        this.words[this.length - 1] &= p;
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
      var p = a.length + l, f;
      this._expand(p);
      var I, y = 0;
      for (f = 0; f < a.length; f++) {
        I = (this.words[f + l] | 0) + y;
        var g = (a.words[f] | 0) * A;
        I -= g & 67108863, y = (I >> 26) - (g / 67108864 | 0), this.words[f + l] = I & 67108863;
      }
      for (; f < this.length - l; f++)
        I = (this.words[f + l] | 0) + y, y = I >> 26, this.words[f + l] = I & 67108863;
      if (y === 0)
        return this._strip();
      for (r(y === -1), y = 0, f = 0; f < this.length; f++)
        I = -(this.words[f] | 0) + y, y = I >> 26, this.words[f] = I & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, A) {
      var l = this.length - a.length, p = this.clone(), f = a, I = f.words[f.length - 1] | 0, y = this._countBits(I);
      l = 26 - y, l !== 0 && (f = f.ushln(l), p.iushln(l), I = f.words[f.length - 1] | 0);
      var g = p.length - f.length, u;
      if (A !== "mod") {
        u = new i(null), u.length = g + 1, u.words = new Array(u.length);
        for (var w = 0; w < u.length; w++)
          u.words[w] = 0;
      }
      var H = p.clone()._ishlnsubmul(f, 1, g);
      H.negative === 0 && (p = H, u && (u.words[g] = 1));
      for (var X = g - 1; X >= 0; X--) {
        var $ = (p.words[f.length + X] | 0) * 67108864 + (p.words[f.length + X - 1] | 0);
        for ($ = Math.min($ / I | 0, 67108863), p._ishlnsubmul(f, $, X); p.negative !== 0; )
          $--, p.negative = 0, p._ishlnsubmul(f, 1, X), p.isZero() || (p.negative ^= 1);
        u && (u.words[X] = $);
      }
      return u && u._strip(), p._strip(), A !== "div" && l !== 0 && p.iushrn(l), {
        div: u || null,
        mod: p
      };
    }, i.prototype.divmod = function(a, A, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var p, f, I;
      return this.negative !== 0 && a.negative === 0 ? (I = this.neg().divmod(a, A), A !== "mod" && (p = I.div.neg()), A !== "div" && (f = I.mod.neg(), l && f.negative !== 0 && f.iadd(a)), {
        div: p,
        mod: f
      }) : this.negative === 0 && a.negative !== 0 ? (I = this.divmod(a.neg(), A), A !== "mod" && (p = I.div.neg()), {
        div: p,
        mod: I.mod
      }) : this.negative & a.negative ? (I = this.neg().divmod(a.neg(), A), A !== "div" && (f = I.mod.neg(), l && f.negative !== 0 && f.isub(a)), {
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
      var l = A.div.negative !== 0 ? A.mod.isub(a) : A.mod, p = a.ushrn(1), f = a.andln(1), I = l.cmp(p);
      return I < 0 || f === 1 && I === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, p = 0, f = this.length - 1; f >= 0; f--)
        p = (l * p + (this.words[f] | 0)) % a;
      return A ? -p : p;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var A = a < 0;
      A && (a = -a), r(a <= 67108863);
      for (var l = 0, p = this.length - 1; p >= 0; p--) {
        var f = (this.words[p] | 0) + l * 67108864;
        this.words[p] = f / a | 0, l = f % a;
      }
      return this._strip(), A ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, l = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var p = new i(1), f = new i(0), I = new i(0), y = new i(1), g = 0; A.isEven() && l.isEven(); )
        A.iushrn(1), l.iushrn(1), ++g;
      for (var u = l.clone(), w = A.clone(); !A.isZero(); ) {
        for (var H = 0, X = 1; !(A.words[0] & X) && H < 26; ++H, X <<= 1)
          ;
        if (H > 0)
          for (A.iushrn(H); H-- > 0; )
            (p.isOdd() || f.isOdd()) && (p.iadd(u), f.isub(w)), p.iushrn(1), f.iushrn(1);
        for (var $ = 0, W = 1; !(l.words[0] & W) && $ < 26; ++$, W <<= 1)
          ;
        if ($ > 0)
          for (l.iushrn($); $-- > 0; )
            (I.isOdd() || y.isOdd()) && (I.iadd(u), y.isub(w)), I.iushrn(1), y.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), p.isub(I), f.isub(y)) : (l.isub(A), I.isub(p), y.isub(f));
      }
      return {
        a: I,
        b: y,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var A = this, l = a.clone();
      A.negative !== 0 ? A = A.umod(a) : A = A.clone();
      for (var p = new i(1), f = new i(0), I = l.clone(); A.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var y = 0, g = 1; !(A.words[0] & g) && y < 26; ++y, g <<= 1)
          ;
        if (y > 0)
          for (A.iushrn(y); y-- > 0; )
            p.isOdd() && p.iadd(I), p.iushrn(1);
        for (var u = 0, w = 1; !(l.words[0] & w) && u < 26; ++u, w <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            f.isOdd() && f.iadd(I), f.iushrn(1);
        A.cmp(l) >= 0 ? (A.isub(l), p.isub(f)) : (l.isub(A), f.isub(p));
      }
      var H;
      return A.cmpn(1) === 0 ? H = p : H = f, H.cmpn(0) < 0 && H.iadd(a), H;
    }, i.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var A = this.clone(), l = a.clone();
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
          var I = A;
          A = l, l = I;
        } else if (f === 0 || l.cmpn(1) === 0)
          break;
        A.isub(l);
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
      var A = a % 26, l = (a - A) / 26, p = 1 << A;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= p, this;
      for (var f = p, I = l; f !== 0 && I < this.length; I++) {
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
      var l;
      if (this.length > 1)
        l = 1;
      else {
        A && (a = -a), r(a <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        l = p === a ? 0 : p < a ? -1 : 1;
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
        var p = this.words[l] | 0, f = a.words[l] | 0;
        if (p !== f) {
          p < f ? A = -1 : p > f && (A = 1);
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
      return new Y(a);
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
    function M(B, a) {
      this.name = B, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    M.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, M.prototype.ireduce = function(a) {
      var A = a, l;
      do
        this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), l = A.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : A.ucmp(this.p);
      return p === 0 ? (A.words[0] = 0, A.length = 1) : p > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
    }, M.prototype.split = function(a, A) {
      a.iushrn(this.n, 0, A);
    }, M.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function T() {
      M.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(T, M), T.prototype.split = function(a, A) {
      for (var l = 4194303, p = Math.min(a.length, 9), f = 0; f < p; f++)
        A.words[f] = a.words[f];
      if (A.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var I = a.words[9];
      for (A.words[A.length++] = I & l, f = 10; f < a.length; f++) {
        var y = a.words[f] | 0;
        a.words[f - 10] = (y & l) << 4 | I >>> 22, I = y;
      }
      I >>>= 22, a.words[f - 10] = I, I === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, T.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var A = 0, l = 0; l < a.length; l++) {
        var p = a.words[l] | 0;
        A += p * 977, a.words[l] = A & 67108863, A = p * 64 + (A / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function F() {
      M.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(F, M);
    function q() {
      M.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(q, M);
    function G() {
      M.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(G, M), G.prototype.imulK = function(a) {
      for (var A = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + A, f = p & 67108863;
        p >>>= 26, a.words[l] = f, A = p;
      }
      return A !== 0 && (a.words[a.length++] = A), a;
    }, i._prime = function(a) {
      if (O[a])
        return O[a];
      var A;
      if (a === "k256")
        A = new T();
      else if (a === "p224")
        A = new F();
      else if (a === "p192")
        A = new q();
      else if (a === "p25519")
        A = new G();
      else
        throw new Error("Unknown prime " + a);
      return O[a] = A, A;
    };
    function Y(B) {
      if (typeof B == "string") {
        var a = i._prime(B);
        this.m = a.p, this.prime = a;
      } else
        r(B.gtn(1), "modulus must be greater than 1"), this.m = B, this.prime = null;
    }
    Y.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(a, A) {
      r((a.negative | A.negative) === 0, "red works only with positives"), r(
        a.red && a.red === A.red,
        "red works only with red numbers"
      );
    }, Y.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (E(a, a.umod(this.m)._forceRed(this)), a);
    }, Y.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, Y.prototype.add = function(a, A) {
      this._verify2(a, A);
      var l = a.add(A);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, Y.prototype.iadd = function(a, A) {
      this._verify2(a, A);
      var l = a.iadd(A);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, Y.prototype.sub = function(a, A) {
      this._verify2(a, A);
      var l = a.sub(A);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, Y.prototype.isub = function(a, A) {
      this._verify2(a, A);
      var l = a.isub(A);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, Y.prototype.shl = function(a, A) {
      return this._verify1(a), this.imod(a.ushln(A));
    }, Y.prototype.imul = function(a, A) {
      return this._verify2(a, A), this.imod(a.imul(A));
    }, Y.prototype.mul = function(a, A) {
      return this._verify2(a, A), this.imod(a.mul(A));
    }, Y.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, Y.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, Y.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var A = this.m.andln(3);
      if (r(A % 2 === 1), A === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var p = this.m.subn(1), f = 0; !p.isZero() && p.andln(1) === 0; )
        f++, p.iushrn(1);
      r(!p.isZero());
      var I = new i(1).toRed(this), y = I.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(y) !== 0; )
        u.redIAdd(y);
      for (var w = this.pow(u, p), H = this.pow(a, p.addn(1).iushrn(1)), X = this.pow(a, p), $ = f; X.cmp(I) !== 0; ) {
        for (var W = X, te = 0; W.cmp(I) !== 0; te++)
          W = W.redSqr();
        r(te < $);
        var ne = this.pow(w, new i(1).iushln($ - te - 1));
        H = H.redMul(ne), w = ne.redSqr(), X = X.redMul(w), $ = te;
      }
      return H;
    }, Y.prototype.invm = function(a) {
      var A = a._invmp(this.m);
      return A.negative !== 0 ? (A.negative = 0, this.imod(A).redNeg()) : this.imod(A);
    }, Y.prototype.pow = function(a, A) {
      if (A.isZero())
        return new i(1).toRed(this);
      if (A.cmpn(1) === 0)
        return a.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = a;
      for (var f = 2; f < p.length; f++)
        p[f] = this.mul(p[f - 1], a);
      var I = p[0], y = 0, g = 0, u = A.bitLength() % 26;
      for (u === 0 && (u = 26), f = A.length - 1; f >= 0; f--) {
        for (var w = A.words[f], H = u - 1; H >= 0; H--) {
          var X = w >> H & 1;
          if (I !== p[0] && (I = this.sqr(I)), X === 0 && y === 0) {
            g = 0;
            continue;
          }
          y <<= 1, y |= X, g++, !(g !== l && (f !== 0 || H !== 0)) && (I = this.mul(I, p[y]), g = 0, y = 0);
        }
        u = 26;
      }
      return I;
    }, Y.prototype.convertTo = function(a) {
      var A = a.umod(this.m);
      return A === a ? A.clone() : A;
    }, Y.prototype.convertFrom = function(a) {
      var A = a.clone();
      return A.red = null, A;
    }, i.mont = function(a) {
      return new z(a);
    };
    function z(B) {
      Y.call(this, B), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(z, Y), z.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, z.prototype.convertFrom = function(a) {
      var A = this.imod(a.mul(this.rinv));
      return A.red = null, A;
    }, z.prototype.imul = function(a, A) {
      if (a.isZero() || A.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(A), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), I = f;
      return f.cmp(this.m) >= 0 ? I = f.isub(this.m) : f.cmpn(0) < 0 && (I = f.iadd(this.m)), I._forceRed(this);
    }, z.prototype.mul = function(a, A) {
      if (a.isZero() || A.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(A), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), f = l.isub(p).iushrn(this.shift), I = f;
      return f.cmp(this.m) >= 0 ? I = f.isub(this.m) : f.cmpn(0) < 0 && (I = f.iadd(this.m)), I._forceRed(this);
    }, z.prototype.invm = function(a) {
      var A = this.imod(a._invmp(this.m).mul(this.r2));
      return A._forceRed(this);
    };
  })(e, be);
})(To);
var ml = To.exports;
const ds = /* @__PURE__ */ hl(ml);
var xA = 9, vA = 3, so = 9;
function wl(e, t) {
  const { precision: n = xA, minPrecision: r = vA } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let d = i.slice(0, n);
  if (r < n) {
    const E = d.match(/.*[1-9]{1}/), m = (E == null ? void 0 : E[0].length) || 0, b = Math.max(r, m);
    d = d.slice(0, b);
  }
  const h = d ? `.${d}` : "";
  return `${c}${h}`;
}
var Te = class extends ds {
  constructor(t, n, r) {
    let s = t, i = n;
    Te.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
    super(s ?? 0, i, r);
    _(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
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
      units: n = so,
      precision: r = xA,
      minPrecision: s = vA
    } = t || {}, i = this.formatUnits(n), o = wl(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), d = c.match(/[1-9]/);
      if (d && d.index && d.index + 1 > r) {
        const [h = "0"] = o.split(".");
        return `${h}.${c.slice(0, d.index + 1)}`;
      }
    }
    return o;
  }
  formatUnits(t = so) {
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
    const r = new ds(this.toArray()).mulTo(t, n);
    return new Te(r.toArray());
  }
  egcd(t) {
    const { a: n, b: r, gcd: s } = new ds(this.toArray()).egcd(t);
    return {
      a: new Te(n.toArray()),
      b: new Te(r.toArray()),
      gcd: new Te(s.toArray())
    };
  }
  divmod(t, n, r) {
    const { div: s, mod: i } = new ds(this.toArray()).divmod(new Te(t), n, r);
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
Q.parseUnits = (e, t = so) => {
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
function Ft(e) {
  return Q(e).toNumber();
}
function Lo(e, t) {
  return Q(e).toHex(t);
}
function Pt(e, t) {
  return Q(e).toBytes(t);
}
function ky(e, t) {
  return Q(e).formatUnits(t);
}
function My(e, t) {
  return Q(e).format(t);
}
function Oy(...e) {
  return e.reduce((t, n) => Q(n).gt(t) ? Q(n) : t, Q(0));
}
function Ty(...e) {
  return Q(Math.ceil(e.reduce((t, n) => Q(t).mul(n), Q(1)).toNumber()));
}
const El = "6.12.0";
function Il(e, t, n) {
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
function Or(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && Il(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Gn(e) {
  if (e == null)
    return "null";
  if (Array.isArray(e))
    return "[ " + e.map(Gn).join(", ") + " ]";
  if (e instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let n = "0x";
    for (let r = 0; r < e.length; r++)
      n += t[e[r] >> 4], n += t[e[r] & 15];
    return n;
  }
  if (typeof e == "object" && typeof e.toJSON == "function")
    return Gn(e.toJSON());
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
      return t.sort(), "{ " + t.map((n) => `${Gn(n)}: ${Gn(e[n])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function yl(e, t, n) {
  let r = e;
  {
    const i = [];
    if (n) {
      if ("message" in n || "code" in n || "name" in n)
        throw new Error(`value will overwrite populated values: ${Gn(n)}`);
      for (const o in n) {
        if (o === "shortMessage")
          continue;
        const c = n[o];
        i.push(o + "=" + Gn(c));
      }
    }
    i.push(`code=${t}`), i.push(`version=${El}`), i.length && (e += " (" + i.join(", ") + ")");
  }
  let s;
  switch (t) {
    case "INVALID_ARGUMENT":
      s = new TypeError(e);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(e);
      break;
    default:
      s = new Error(e);
  }
  return Or(s, { code: t }), n && Object.assign(s, n), s.shortMessage == null && Or(s, { shortMessage: r }), s;
}
function wr(e, t, n, r) {
  if (!e)
    throw yl(t, n, r);
}
function Ce(e, t, n, r) {
  wr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const Bl = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
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
function Cl(e) {
  wr(Bl.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function bl(e, t, n) {
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
function Ut(e, t) {
  return bl(e, t, !1);
}
function Ql(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && e.length !== 2 + 2 * t || t === !0 && e.length % 2 !== 0);
}
const Va = "0123456789abcdef";
function jr(e) {
  const t = Ut(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Va[(s & 240) >> 4] + Va[s & 15];
  }
  return n;
}
function Fo(e, t, n) {
  const r = Ut(e);
  return n != null && n > r.length && wr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), jr(r.slice(t ?? 0, n ?? r.length));
}
const xl = BigInt(0);
BigInt(1);
const Hn = 9007199254740991;
function _n(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -Hn && e <= Hn, "overflow", t || "value", e), BigInt(e);
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
function vl(e, t) {
  const n = _n(e, t);
  return wr(n >= xl, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const Xa = "0123456789abcdef";
function _l(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += Xa[n >> 4], t += Xa[n & 15];
    return BigInt(t);
  }
  return _n(e);
}
function _A(e, t) {
  switch (typeof e) {
    case "bigint":
      return Ce(e >= -Hn && e <= Hn, "overflow", t || "value", e), Number(e);
    case "number":
      return Ce(Number.isInteger(e), "underflow", t || "value", e), Ce(e >= -Hn && e <= Hn, "overflow", t || "value", e), e;
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
function Dl(e, t) {
  let r = vl(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = _A(t, "width");
    for (wr(s * 2 >= r.length, `value exceeds width (${s} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const Fs = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let ls = null;
function Rl(e) {
  if (ls == null) {
    ls = {};
    for (let n = 0; n < Fs.length; n++)
      ls[Fs[n]] = BigInt(n);
  }
  const t = ls[e];
  return Ce(t != null, "invalid base58 value", "letter", e), t;
}
const Sl = BigInt(0), io = BigInt(58);
function DA(e) {
  const t = Ut(e);
  let n = _l(t), r = "";
  for (; n; )
    r = Fs[Number(n % io)] + r, n /= io;
  for (let s = 0; s < t.length && !t[s]; s++)
    r = Fs[0] + r;
  return r;
}
function Nl(e) {
  let t = Sl;
  for (let n = 0; n < e.length; n++)
    t *= io, t += Rl(e[n]);
  return t;
}
function kl(e, t, n, r, s) {
  Ce(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function RA(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function Ml(e, t, n, r, s) {
  return e === "OVERLONG" ? (Ce(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), RA(e, t, n));
}
const Ol = Object.freeze({
  error: kl,
  ignore: RA,
  replace: Ml
});
function Tl(e, t) {
  t == null && (t = Ol.error);
  const n = Ut(e, "bytes"), r = [];
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
function qr(e, t) {
  Ce(typeof e == "string", "invalid string value", "str", e), t != null && (Cl(t), e = e.normalize(t));
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
function Ll(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Wr(e, t) {
  return Ll(Tl(e, t));
}
function Nn(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function Po(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function SA(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Nn(e.outputLen), Nn(e.blockLen);
}
function ir(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function NA(e, t) {
  Po(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Fl = (e) => e instanceof Uint8Array, Pl = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), bs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Jt = (e, t) => e << 32 - t | e >>> t, Ul = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Ul)
  throw new Error("Non little-endian hardware is not supported");
function Gl(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function or(e) {
  if (typeof e == "string" && (e = Gl(e)), !Fl(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
let Uo = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const Hl = {}.toString;
function Jl(e, t) {
  if (t !== void 0 && Hl.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function ui(e) {
  const t = (r) => e().update(or(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
let kA = class extends Uo {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, SA(t);
    const r = or(n);
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
    return ir(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ir(this), Po(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Go = (e, t, n) => new kA(e, t).update(n).digest();
Go.create = (e, t) => new kA(e, t);
function Yl(e, t, n, r) {
  SA(e);
  const s = Jl({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Nn(i), Nn(o), Nn(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = or(t), h = or(n), E = new Uint8Array(o), m = Go.create(e, d), b = m._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: c, DK: E, PRF: m, PRFSalt: b };
}
function Zl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Vl(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Yl(e, t, n, r);
  let h;
  const E = new Uint8Array(4), m = bs(E), b = new Uint8Array(c.outputLen);
  for (let v = 1, D = 0; D < i; v++, D += c.outputLen) {
    const C = o.subarray(D, D + c.outputLen);
    m.setInt32(0, v, !1), (h = d._cloneInto(h)).update(E).digestInto(b), C.set(b.subarray(0, C.length));
    for (let k = 1; k < s; k++) {
      c._cloneInto(h).update(b).digestInto(b);
      for (let N = 0; N < C.length; N++)
        C[N] ^= b[N];
    }
  }
  return Zl(c, d, o, h, b);
}
function Xl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, c, r);
}
class Ho extends Uo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = bs(this.buffer);
  }
  update(t) {
    ir(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = or(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = bs(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ir(this), NA(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let m = o; m < s; m++)
      n[m] = 0;
    Xl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = bs(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, E = this.get();
    if (h > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < h; m++)
      c.setUint32(4 * m, E[m], i);
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
const jl = (e, t, n) => e & t ^ ~e & n, ql = (e, t, n) => e & t ^ e & n ^ t & n, Wl = /* @__PURE__ */ new Uint32Array([
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
]), on = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), an = /* @__PURE__ */ new Uint32Array(64);
let $l = class extends Ho {
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
    for (let m = 0; m < 16; m++, n += 4)
      an[m] = t.getUint32(n, !1);
    for (let m = 16; m < 64; m++) {
      const b = an[m - 15], v = an[m - 2], D = Jt(b, 7) ^ Jt(b, 18) ^ b >>> 3, C = Jt(v, 17) ^ Jt(v, 19) ^ v >>> 10;
      an[m] = C + an[m - 7] + D + an[m - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: h, H: E } = this;
    for (let m = 0; m < 64; m++) {
      const b = Jt(c, 6) ^ Jt(c, 11) ^ Jt(c, 25), v = E + b + jl(c, d, h) + Wl[m] + an[m] | 0, C = (Jt(r, 2) ^ Jt(r, 13) ^ Jt(r, 22)) + ql(r, s, i) | 0;
      E = h, h = d, d = c, c = o + v | 0, o = i, i = s, s = r, r = v + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, h, E);
  }
  roundClean() {
    an.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const MA = /* @__PURE__ */ ui(() => new $l()), hs = /* @__PURE__ */ BigInt(2 ** 32 - 1), oo = /* @__PURE__ */ BigInt(32);
function OA(e, t = !1) {
  return t ? { h: Number(e & hs), l: Number(e >> oo & hs) } : { h: Number(e >> oo & hs) | 0, l: Number(e & hs) | 0 };
}
function TA(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = OA(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const zl = (e, t) => BigInt(e >>> 0) << oo | BigInt(t >>> 0), Kl = (e, t, n) => e >>> n, eh = (e, t, n) => e << 32 - n | t >>> n, th = (e, t, n) => e >>> n | t << 32 - n, nh = (e, t, n) => e << 32 - n | t >>> n, rh = (e, t, n) => e << 64 - n | t >>> n - 32, sh = (e, t, n) => e >>> n - 32 | t << 64 - n, ih = (e, t) => t, oh = (e, t) => e, LA = (e, t, n) => e << n | t >>> 32 - n, FA = (e, t, n) => t << n | e >>> 32 - n, PA = (e, t, n) => t << n - 32 | e >>> 64 - n, UA = (e, t, n) => e << n - 32 | t >>> 64 - n;
function ah(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const ch = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Ah = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, uh = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), dh = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, lh = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), hh = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, fh = {
  fromBig: OA,
  split: TA,
  toBig: zl,
  shrSH: Kl,
  shrSL: eh,
  rotrSH: th,
  rotrSL: nh,
  rotrBH: rh,
  rotrBL: sh,
  rotr32H: ih,
  rotr32L: oh,
  rotlSH: LA,
  rotlSL: FA,
  rotlBH: PA,
  rotlBL: UA,
  add: ah,
  add3L: ch,
  add3H: Ah,
  add4L: uh,
  add4H: dh,
  add5H: hh,
  add5L: lh
}, he = fh, [gh, ph] = /* @__PURE__ */ (() => he.split([
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
].map((e) => BigInt(e))))(), cn = /* @__PURE__ */ new Uint32Array(80), An = /* @__PURE__ */ new Uint32Array(80);
class mh extends Ho {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: d, Eh: h, El: E, Fh: m, Fl: b, Gh: v, Gl: D, Hh: C, Hl: k } = this;
    return [t, n, r, s, i, o, c, d, h, E, m, b, v, D, C, k];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, d, h, E, m, b, v, D, C, k) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = d | 0, this.Eh = h | 0, this.El = E | 0, this.Fh = m | 0, this.Fl = b | 0, this.Gh = v | 0, this.Gl = D | 0, this.Hh = C | 0, this.Hl = k | 0;
  }
  process(t, n) {
    for (let P = 0; P < 16; P++, n += 4)
      cn[P] = t.getUint32(n), An[P] = t.getUint32(n += 4);
    for (let P = 16; P < 80; P++) {
      const j = cn[P - 15] | 0, O = An[P - 15] | 0, M = he.rotrSH(j, O, 1) ^ he.rotrSH(j, O, 8) ^ he.shrSH(j, O, 7), T = he.rotrSL(j, O, 1) ^ he.rotrSL(j, O, 8) ^ he.shrSL(j, O, 7), F = cn[P - 2] | 0, q = An[P - 2] | 0, G = he.rotrSH(F, q, 19) ^ he.rotrBH(F, q, 61) ^ he.shrSH(F, q, 6), Y = he.rotrSL(F, q, 19) ^ he.rotrBL(F, q, 61) ^ he.shrSL(F, q, 6), z = he.add4L(T, Y, An[P - 7], An[P - 16]), B = he.add4H(z, M, G, cn[P - 7], cn[P - 16]);
      cn[P] = B | 0, An[P] = z | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: d, Dh: h, Dl: E, Eh: m, El: b, Fh: v, Fl: D, Gh: C, Gl: k, Hh: N, Hl: V } = this;
    for (let P = 0; P < 80; P++) {
      const j = he.rotrSH(m, b, 14) ^ he.rotrSH(m, b, 18) ^ he.rotrBH(m, b, 41), O = he.rotrSL(m, b, 14) ^ he.rotrSL(m, b, 18) ^ he.rotrBL(m, b, 41), M = m & v ^ ~m & C, T = b & D ^ ~b & k, F = he.add5L(V, O, T, ph[P], An[P]), q = he.add5H(F, N, j, M, gh[P], cn[P]), G = F | 0, Y = he.rotrSH(r, s, 28) ^ he.rotrBH(r, s, 34) ^ he.rotrBH(r, s, 39), z = he.rotrSL(r, s, 28) ^ he.rotrBL(r, s, 34) ^ he.rotrBL(r, s, 39), B = r & i ^ r & c ^ i & c, a = s & o ^ s & d ^ o & d;
      N = C | 0, V = k | 0, C = v | 0, k = D | 0, v = m | 0, D = b | 0, { h: m, l: b } = he.add(h | 0, E | 0, q | 0, G | 0), h = c | 0, E = d | 0, c = i | 0, d = o | 0, i = r | 0, o = s | 0;
      const A = he.add3L(G, z, a);
      r = he.add3H(A, q, Y, B), s = A | 0;
    }
    ({ h: r, l: s } = he.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = he.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: d } = he.add(this.Ch | 0, this.Cl | 0, c | 0, d | 0), { h, l: E } = he.add(this.Dh | 0, this.Dl | 0, h | 0, E | 0), { h: m, l: b } = he.add(this.Eh | 0, this.El | 0, m | 0, b | 0), { h: v, l: D } = he.add(this.Fh | 0, this.Fl | 0, v | 0, D | 0), { h: C, l: k } = he.add(this.Gh | 0, this.Gl | 0, C | 0, k | 0), { h: N, l: V } = he.add(this.Hh | 0, this.Hl | 0, N | 0, V | 0), this.set(r, s, i, o, c, d, h, E, m, b, v, D, C, k, N, V);
  }
  roundClean() {
    cn.fill(0), An.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const GA = /* @__PURE__ */ ui(() => new mh());
function wh() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const ja = wh();
ja.crypto || ja.msCrypto;
function Eh(e, t) {
  const n = { sha256: MA, sha512: GA }[e];
  return Ce(n != null, "invalid hmac algorithm", "algorithm", e), Go.create(n, t);
}
function Ih(e, t, n, r, s) {
  const i = { sha256: MA, sha512: GA }[s];
  return Ce(i != null, "invalid pbkdf2 algorithm", "algorithm", s), Vl(i, e, t, { c: n, dkLen: r });
}
let HA = !1;
const JA = function(e, t, n) {
  return Eh(e, t).update(n).digest();
};
let YA = JA;
function Er(e, t, n) {
  const r = Ut(t, "key"), s = Ut(n, "data");
  return jr(YA(e, r, s));
}
Er._ = JA;
Er.lock = function() {
  HA = !0;
};
Er.register = function(e) {
  if (HA)
    throw new Error("computeHmac is locked");
  YA = e;
};
Object.freeze(Er);
const [ZA, VA, XA] = [[], [], []], yh = /* @__PURE__ */ BigInt(0), Cr = /* @__PURE__ */ BigInt(1), Bh = /* @__PURE__ */ BigInt(2), Ch = /* @__PURE__ */ BigInt(7), bh = /* @__PURE__ */ BigInt(256), Qh = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = Cr, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], ZA.push(2 * (5 * r + n)), VA.push((e + 1) * (e + 2) / 2 % 64);
  let s = yh;
  for (let i = 0; i < 7; i++)
    t = (t << Cr ^ (t >> Ch) * Qh) % bh, t & Bh && (s ^= Cr << (Cr << /* @__PURE__ */ BigInt(i)) - Cr);
  XA.push(s);
}
const [xh, vh] = /* @__PURE__ */ TA(XA, !0), qa = (e, t, n) => n > 32 ? PA(e, t, n) : LA(e, t, n), Wa = (e, t, n) => n > 32 ? UA(e, t, n) : FA(e, t, n);
function _h(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, h = n[d], E = n[d + 1], m = qa(h, E, 1) ^ n[c], b = Wa(h, E, 1) ^ n[c + 1];
      for (let v = 0; v < 50; v += 10)
        e[o + v] ^= m, e[o + v + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = VA[o], d = qa(s, i, c), h = Wa(s, i, c), E = ZA[o];
      s = e[E], i = e[E + 1], e[E] = d, e[E + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= xh[r], e[1] ^= vh[r];
  }
  n.fill(0);
}
let Dh = class jA extends Uo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Nn(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Pl(this.state);
  }
  keccak() {
    _h(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    ir(this);
    const { blockLen: n, state: r } = this;
    t = or(t);
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
    ir(this, !1), Po(t), this.finish();
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
    return Nn(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (NA(t, this), this.finished)
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
    return t || (t = new jA(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const Rh = (e, t, n) => ui(() => new Dh(t, e, n)), Sh = /* @__PURE__ */ Rh(1, 136, 256 / 8);
let qA = !1;
const WA = function(e) {
  return Sh(e);
};
let $A = WA;
function $r(e) {
  const t = Ut(e, "data");
  return jr($A(t));
}
$r._ = WA;
$r.lock = function() {
  qA = !0;
};
$r.register = function(e) {
  if (qA)
    throw new TypeError("keccak256 is locked");
  $A = e;
};
Object.freeze($r);
const Nh = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), zA = /* @__PURE__ */ Uint8Array.from({ length: 16 }, (e, t) => t), kh = /* @__PURE__ */ zA.map((e) => (9 * e + 5) % 16);
let Jo = [zA], Yo = [kh];
for (let e = 0; e < 4; e++)
  for (let t of [Jo, Yo])
    t.push(t[e].map((n) => Nh[n]));
const KA = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), Mh = /* @__PURE__ */ Jo.map((e, t) => e.map((n) => KA[t][n])), Oh = /* @__PURE__ */ Yo.map((e, t) => e.map((n) => KA[t][n])), Th = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), Lh = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]), fs = (e, t) => e << t | e >>> 32 - t;
function $a(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const gs = /* @__PURE__ */ new Uint32Array(16);
class Fh extends Ho {
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
    for (let v = 0; v < 16; v++, n += 4)
      gs[v] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, d = c, h = this.h3 | 0, E = h, m = this.h4 | 0, b = m;
    for (let v = 0; v < 5; v++) {
      const D = 4 - v, C = Th[v], k = Lh[v], N = Jo[v], V = Yo[v], P = Mh[v], j = Oh[v];
      for (let O = 0; O < 16; O++) {
        const M = fs(r + $a(v, i, c, h) + gs[N[O]] + C, P[O]) + m | 0;
        r = m, m = h, h = fs(c, 10) | 0, c = i, i = M;
      }
      for (let O = 0; O < 16; O++) {
        const M = fs(s + $a(D, o, d, E) + gs[V[O]] + k, j[O]) + b | 0;
        s = b, b = E, E = fs(d, 10) | 0, d = o, o = M;
      }
    }
    this.set(this.h1 + c + E | 0, this.h2 + h + b | 0, this.h3 + m + s | 0, this.h4 + r + o | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    gs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const Ph = /* @__PURE__ */ ui(() => new Fh());
let eu = !1;
const tu = function(e) {
  return Ph(e);
};
let nu = tu;
function zr(e) {
  const t = Ut(e, "data");
  return jr(nu(t));
}
zr._ = tu;
zr.lock = function() {
  eu = !0;
};
zr.register = function(e) {
  if (eu)
    throw new TypeError("ripemd160 is locked");
  nu = e;
};
Object.freeze(zr);
let ru = !1;
const su = function(e, t, n, r, s) {
  return Ih(e, t, n, r, s);
};
let iu = su;
function Ir(e, t, n, r, s) {
  const i = Ut(e, "password"), o = Ut(t, "salt");
  return jr(iu(i, o, n, r, s));
}
Ir._ = su;
Ir.lock = function() {
  ru = !0;
};
Ir.register = function(e) {
  if (ru)
    throw new Error("pbkdf2 is locked");
  iu = e;
};
Object.freeze(Ir);
const Uh = BigInt(0), Gh = BigInt(36);
function za(e) {
  e = e.toLowerCase();
  const t = e.substring(2).split(""), n = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    n[s] = t[s].charCodeAt(0);
  const r = Ut($r(n));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const Zo = {};
for (let e = 0; e < 10; e++)
  Zo[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  Zo[String.fromCharCode(65 + e)] = String(10 + e);
const Ka = 15;
function Hh(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => Zo[r]).join("");
  for (; t.length >= Ka; ) {
    let r = t.substring(0, Ka);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let n = String(98 - parseInt(t, 10) % 97);
  for (; n.length < 2; )
    n = "0" + n;
  return n;
}
const Jh = function() {
  const e = {};
  for (let t = 0; t < 36; t++) {
    const n = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    e[n] = BigInt(t);
  }
  return e;
}();
function Yh(e) {
  e = e.toLowerCase();
  let t = Uh;
  for (let n = 0; n < e.length; n++)
    t = t * Gh + Jh[e[n]];
  return t;
}
function Zh(e) {
  if (Ce(typeof e == "string", "invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    e.startsWith("0x") || (e = "0x" + e);
    const t = za(e);
    return Ce(!e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === e, "bad address checksum", "address", e), t;
  }
  if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    Ce(e.substring(2, 4) === Hh(e), "bad icap checksum", "address", e);
    let t = Yh(e.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return za("0x" + t);
  }
  Ce(!1, "invalid address", "address", e);
}
function Yi(e, t) {
  return {
    address: Zh(e),
    storageKeys: t.map((n, r) => (Ce(Ql(n, 32), "invalid slot", `storageKeys[${r}]`, n), n.toLowerCase()))
  };
}
function Vh(e) {
  if (Array.isArray(e))
    return e.map((n, r) => Array.isArray(n) ? (Ce(n.length === 2, "invalid slot set", `value[${r}]`, n), Yi(n[0], n[1])) : (Ce(n != null && typeof n == "object", "invalid address-slot set", "value", e), Yi(n.address, n.storageKeys)));
  Ce(e != null && typeof e == "object", "invalid access list", "value", e);
  const t = Object.keys(e).map((n) => {
    const r = e[n].reduce((s, i) => (s[i] = !0, s), {});
    return Yi(n, Object.keys(r).sort());
  });
  return t.sort((n, r) => n.address.localeCompare(r.address)), t;
}
const Xh = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class Kr {
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
    _(this, "name");
    Or(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new Kr(this.name);
  }
}
class di extends Kr {
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
    _(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    _(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    _(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    _(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    _(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    _(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    _(this, "txAccessListAddress");
    const s = { effectiveBlock: n };
    function i(o, c) {
      let d = (r || {})[o];
      d == null && (d = c), Ce(typeof d == "number", `invalud value for ${o}`, "costs", r), s[o] = d;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), Or(this, s);
  }
  clone() {
    return new di(this.effectiveBlock, this);
  }
}
class li extends Kr {
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
    _(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    _(this, "targetNetwork");
    Or(this, {
      address: n || Xh,
      targetNetwork: r ?? 1
    });
  }
  clone() {
    return new li(this.address, this.targetNetwork);
  }
}
var Zr, Vr;
class jh extends Kr {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(n, r) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    Le(this, Zr, void 0);
    Le(this, Vr, void 0);
    Et(this, Zr, n), Et(this, Vr, r);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return we(this, Zr);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return we(this, Vr);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Zr = new WeakMap(), Vr = new WeakMap();
const Zi = /* @__PURE__ */ new Map();
var zn, Kn, mn;
const Xn = class Xn {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, n) {
    Le(this, zn, void 0);
    Le(this, Kn, void 0);
    Le(this, mn, void 0);
    Et(this, zn, t), Et(this, Kn, _n(n)), Et(this, mn, /* @__PURE__ */ new Map());
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
    return we(this, zn);
  }
  set name(t) {
    Et(this, zn, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return we(this, Kn);
  }
  set chainId(t) {
    Et(this, Kn, _n(t, "chainId"));
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
        return this.chainId === _n(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === _n(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === _n(t.chainId);
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
    return Array.from(we(this, mn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (we(this, mn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return we(this, mn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return we(this, mn).get(t) || null;
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
    const t = new Xn(this.name, this.chainId);
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
    const n = this.getPlugin("org.ethers.plugins.network.GasCost") || new di();
    let r = n.txBase;
    if (t.to == null && (r += n.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += n.txDataZero : r += n.txDataNonzero;
    if (t.accessList) {
      const s = Vh(t.accessList);
      for (const i in s)
        r += n.txAccessListAddress + n.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (qh(), t == null)
      return Xn.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const n = Zi.get(t);
      if (n)
        return n();
      if (typeof t == "bigint")
        return new Xn("unknown", t);
      Ce(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      Ce(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const n = new Xn(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && n.attachPlugin(new li(t.ensAddress, t.ensNetwork)), n;
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
zn = new WeakMap(), Kn = new WeakMap(), mn = new WeakMap();
let Rn = Xn;
function ec(e, t) {
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
function tc(e) {
  return new jh(e, async (t, n, r) => {
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
        maxFeePerGas: ec(c.maxFee, 9),
        maxPriorityFeePerGas: ec(c.maxPriorityFee, 9)
      };
    } catch (i) {
      wr(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
let nc = !1;
function qh() {
  if (nc)
    return;
  nc = !0;
  function e(t, n, r) {
    const s = function() {
      const i = new Rn(t, n);
      return r.ensNetwork != null && i.attachPlugin(new li(null, r.ensNetwork)), i.attachPlugin(new di()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Rn.register(t, s), Rn.register(n, s), r.altNames && r.altNames.forEach((i) => {
      Rn.register(i, s);
    });
  }
  e("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), e("ropsten", 3, { ensNetwork: 3 }), e("rinkeby", 4, { ensNetwork: 4 }), e("goerli", 5, { ensNetwork: 5 }), e("kovan", 42, { ensNetwork: 42 }), e("sepolia", 11155111, { ensNetwork: 11155111 }), e("holesky", 17e3, { ensNetwork: 17e3 }), e("classic", 61, {}), e("classicKotti", 6, {}), e("arbitrum", 42161, {
    ensNetwork: 1
  }), e("arbitrum-goerli", 421613, {}), e("arbitrum-sepolia", 421614, {}), e("base", 8453, { ensNetwork: 1 }), e("base-goerli", 84531, {}), e("base-sepolia", 84532, {}), e("bnb", 56, { ensNetwork: 1 }), e("bnbt", 97, {}), e("linea", 59144, { ensNetwork: 1 }), e("linea-goerli", 59140, {}), e("linea-sepolia", 59141, {}), e("matic", 137, {
    ensNetwork: 1,
    plugins: [
      tc("https://gasstation.polygon.technology/v2")
    ]
  }), e("matic-amoy", 80002, {}), e("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      tc("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), e("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), e("optimism-goerli", 420, {}), e("optimism-sepolia", 11155420, {}), e("xdai", 100, { ensNetwork: 1 });
}
function Dt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Wh(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function es(e, ...t) {
  if (!Wh(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function ou(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Dt(e.outputLen), Dt(e.blockLen);
}
function ar(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function au(e, t) {
  es(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const Vi = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Qs = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), xs = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Yt = (e, t) => e << 32 - t | e >>> t, Ee = (e, t) => e << t | e >>> 32 - t >>> 0, Ps = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, $h = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
function Us(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = $h(e[t]);
}
function zh(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function cr(e) {
  return typeof e == "string" && (e = zh(e)), es(e), e;
}
function Kh(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    es(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
  }
  return n;
}
class Vo {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const ef = {}.toString;
function cu(e, t) {
  if (t !== void 0 && ef.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function Au(e) {
  const t = (r) => e().update(cr(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function tf(e = 32) {
  if (Vi && typeof Vi.getRandomValues == "function")
    return Vi.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function nf(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), d = r ? 4 : 0, h = r ? 0 : 4;
  e.setUint32(t + d, o, r), e.setUint32(t + h, c, r);
}
const rf = (e, t, n) => e & t ^ ~e & n, sf = (e, t, n) => e & t ^ e & n ^ t & n;
class of extends Vo {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = xs(this.buffer);
  }
  update(t) {
    ar(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = cr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const d = xs(t);
        for (; s <= i - o; o += s)
          this.process(d, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ar(this), au(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let m = o; m < s; m++)
      n[m] = 0;
    nf(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = xs(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, E = this.get();
    if (h > E.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let m = 0; m < h; m++)
      c.setUint32(4 * m, E[m], i);
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
const af = /* @__PURE__ */ new Uint32Array([
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
]), un = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), dn = /* @__PURE__ */ new Uint32Array(64);
class cf extends of {
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
    for (let m = 0; m < 16; m++, n += 4)
      dn[m] = t.getUint32(n, !1);
    for (let m = 16; m < 64; m++) {
      const b = dn[m - 15], v = dn[m - 2], D = Yt(b, 7) ^ Yt(b, 18) ^ b >>> 3, C = Yt(v, 17) ^ Yt(v, 19) ^ v >>> 10;
      dn[m] = C + dn[m - 7] + D + dn[m - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: d, G: h, H: E } = this;
    for (let m = 0; m < 64; m++) {
      const b = Yt(c, 6) ^ Yt(c, 11) ^ Yt(c, 25), v = E + b + rf(c, d, h) + af[m] + dn[m] | 0, C = (Yt(r, 2) ^ Yt(r, 13) ^ Yt(r, 22)) + sf(r, s, i) | 0;
      E = h, h = d, d = c, c = o + v | 0, o = i, i = s, s = r, r = v + C | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, E = E + this.H | 0, this.set(r, s, i, o, c, d, h, E);
  }
  roundClean() {
    dn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const ts = /* @__PURE__ */ Au(() => new cf());
class uu extends Vo {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, ou(t);
    const r = cr(n);
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
    return ar(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ar(this), es(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Xo = (e, t, n) => new uu(e, t).update(n).digest();
Xo.create = (e, t) => new uu(e, t);
function Af(e, t, n, r) {
  ou(e);
  const s = cu({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Dt(i), Dt(o), Dt(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = cr(t), h = cr(n), E = new Uint8Array(o), m = Xo.create(e, d), b = m._cloneInto().update(h);
  return { c: i, dkLen: o, asyncTick: c, DK: E, PRF: m, PRFSalt: b };
}
function uf(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function du(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: d } = Af(e, t, n, r);
  let h;
  const E = new Uint8Array(4), m = xs(E), b = new Uint8Array(c.outputLen);
  for (let v = 1, D = 0; D < i; v++, D += c.outputLen) {
    const C = o.subarray(D, D + c.outputLen);
    m.setInt32(0, v, !1), (h = d._cloneInto(h)).update(E).digestInto(b), C.set(b.subarray(0, C.length));
    for (let k = 1; k < s; k++) {
      c._cloneInto(h).update(b).digestInto(b);
      for (let N = 0; N < C.length; N++)
        C[N] ^= b[N];
    }
  }
  return uf(c, d, o, h, b);
}
function rc(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], d = e[t++] ^ n[r++], h = e[t++] ^ n[r++], E = e[t++] ^ n[r++], m = e[t++] ^ n[r++], b = e[t++] ^ n[r++], v = e[t++] ^ n[r++], D = e[t++] ^ n[r++], C = e[t++] ^ n[r++], k = e[t++] ^ n[r++], N = e[t++] ^ n[r++], V = e[t++] ^ n[r++], P = e[t++] ^ n[r++], j = e[t++] ^ n[r++], O = e[t++] ^ n[r++], M = o, T = c, F = d, q = h, G = E, Y = m, z = b, B = v, a = D, A = C, l = k, p = N, f = V, I = P, y = j, g = O;
  for (let u = 0; u < 8; u += 2)
    G ^= Ee(M + f | 0, 7), a ^= Ee(G + M | 0, 9), f ^= Ee(a + G | 0, 13), M ^= Ee(f + a | 0, 18), A ^= Ee(Y + T | 0, 7), I ^= Ee(A + Y | 0, 9), T ^= Ee(I + A | 0, 13), Y ^= Ee(T + I | 0, 18), y ^= Ee(l + z | 0, 7), F ^= Ee(y + l | 0, 9), z ^= Ee(F + y | 0, 13), l ^= Ee(z + F | 0, 18), q ^= Ee(g + p | 0, 7), B ^= Ee(q + g | 0, 9), p ^= Ee(B + q | 0, 13), g ^= Ee(p + B | 0, 18), T ^= Ee(M + q | 0, 7), F ^= Ee(T + M | 0, 9), q ^= Ee(F + T | 0, 13), M ^= Ee(q + F | 0, 18), z ^= Ee(Y + G | 0, 7), B ^= Ee(z + Y | 0, 9), G ^= Ee(B + z | 0, 13), Y ^= Ee(G + B | 0, 18), p ^= Ee(l + A | 0, 7), a ^= Ee(p + l | 0, 9), A ^= Ee(a + p | 0, 13), l ^= Ee(A + a | 0, 18), f ^= Ee(g + y | 0, 7), I ^= Ee(f + g | 0, 9), y ^= Ee(I + f | 0, 13), g ^= Ee(y + I | 0, 18);
  s[i++] = o + M | 0, s[i++] = c + T | 0, s[i++] = d + F | 0, s[i++] = h + q | 0, s[i++] = E + G | 0, s[i++] = m + Y | 0, s[i++] = b + z | 0, s[i++] = v + B | 0, s[i++] = D + a | 0, s[i++] = C + A | 0, s[i++] = k + l | 0, s[i++] = N + p | 0, s[i++] = V + f | 0, s[i++] = P + I | 0, s[i++] = j + y | 0, s[i++] = O + g | 0;
}
function Xi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    rc(n, o, e, t, n, i), c > 0 && (o += 16), rc(n, i, e, t += 16, n, o);
}
function df(e, t, n) {
  const r = cu({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: d, maxmem: h, onProgress: E } = r;
  if (Dt(s), Dt(i), Dt(o), Dt(c), Dt(d), Dt(h), E !== void 0 && typeof E != "function")
    throw new Error("progressCb should be function");
  const m = 128 * i, b = m / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (m / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / m)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const v = m * (s + o);
  if (v > h)
    throw new Error(`Scrypt: parameters too large, ${v} (128 * r * (N + p)) > ${h} (maxmem)`);
  const D = du(ts, e, t, { c: 1, dkLen: m * o }), C = Qs(D), k = Qs(new Uint8Array(m * s)), N = Qs(new Uint8Array(m));
  let V = () => {
  };
  if (E) {
    const P = 2 * s * o, j = Math.max(Math.floor(P / 1e4), 1);
    let O = 0;
    V = () => {
      O++, E && (!(O % j) || O === P) && E(O / P);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: b, V: k, B32: C, B: D, tmp: N, blockMixCb: V, asyncTick: d };
}
function lf(e, t, n, r, s) {
  const i = du(ts, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function hf(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: d, B32: h, B: E, tmp: m, blockMixCb: b } = df(e, t, n);
  Ps || Us(h);
  for (let v = 0; v < i; v++) {
    const D = c * v;
    for (let C = 0; C < c; C++)
      d[C] = h[D + C];
    for (let C = 0, k = 0; C < r - 1; C++)
      Xi(d, k, d, k += c, s), b();
    Xi(d, (r - 1) * c, h, D, s), b();
    for (let C = 0; C < r; C++) {
      const k = h[D + c - 16] % r;
      for (let N = 0; N < c; N++)
        m[N] = h[D + N] ^ d[k * c + N];
      Xi(m, 0, h, D, s), b();
    }
  }
  return Ps || Us(h), lf(e, o, E, d, m);
}
const ps = /* @__PURE__ */ BigInt(2 ** 32 - 1), sc = /* @__PURE__ */ BigInt(32);
function ff(e, t = !1) {
  return t ? { h: Number(e & ps), l: Number(e >> sc & ps) } : { h: Number(e >> sc & ps) | 0, l: Number(e & ps) | 0 };
}
function gf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = ff(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const pf = (e, t, n) => e << n | t >>> 32 - n, mf = (e, t, n) => t << n | e >>> 32 - n, wf = (e, t, n) => t << n - 32 | e >>> 64 - n, Ef = (e, t, n) => e << n - 32 | t >>> 64 - n, lu = [], hu = [], fu = [], If = /* @__PURE__ */ BigInt(0), br = /* @__PURE__ */ BigInt(1), yf = /* @__PURE__ */ BigInt(2), Bf = /* @__PURE__ */ BigInt(7), Cf = /* @__PURE__ */ BigInt(256), bf = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = br, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], lu.push(2 * (5 * r + n)), hu.push((e + 1) * (e + 2) / 2 % 64);
  let s = If;
  for (let i = 0; i < 7; i++)
    t = (t << br ^ (t >> Bf) * bf) % Cf, t & yf && (s ^= br << (br << /* @__PURE__ */ BigInt(i)) - br);
  fu.push(s);
}
const [Qf, xf] = /* @__PURE__ */ gf(fu, !0), ic = (e, t, n) => n > 32 ? wf(e, t, n) : pf(e, t, n), oc = (e, t, n) => n > 32 ? Ef(e, t, n) : mf(e, t, n);
function vf(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, d = (o + 2) % 10, h = n[d], E = n[d + 1], m = ic(h, E, 1) ^ n[c], b = oc(h, E, 1) ^ n[c + 1];
      for (let v = 0; v < 50; v += 10)
        e[o + v] ^= m, e[o + v + 1] ^= b;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = hu[o], d = ic(s, i, c), h = oc(s, i, c), E = lu[o];
      s = e[E], i = e[E + 1], e[E] = d, e[E + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= Qf[r], e[1] ^= xf[r];
  }
  n.fill(0);
}
class jo extends Vo {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Dt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Qs(this.state);
  }
  keccak() {
    Ps || Us(this.state32), vf(this.state32, this.rounds), Ps || Us(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    ar(this);
    const { blockLen: n, state: r } = this;
    t = cr(t);
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
    ar(this, !1), es(t), this.finish();
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
    if (au(t, this), this.finished)
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
    return t || (t = new jo(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const _f = (e, t, n) => Au(() => new jo(t, e, n)), Df = /* @__PURE__ */ _f(1, 136, 256 / 8);
var Rf = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return hf(t, n, { N: r, r: i, p: s, dkLen: o });
}, Sf = (e) => Df(e), jn = (e, t = "base64") => {
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
}, { crypto: hi, btoa: gu } = globalThis;
if (!hi)
  throw new x(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!gu)
  throw new x(
    R.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var ao = (e) => hi.getRandomValues(new Uint8Array(e)), vs = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return gu(n);
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
}, pu = "AES-CTR", qo = (e, t) => {
  const n = jn(String(e).normalize("NFKC"), "utf-8"), r = Ir(n, t, 1e5, 32, "sha256");
  return J(r);
}, Nf = async (e, t) => {
  const n = ao(16), r = ao(32), s = qo(e, r), i = JSON.stringify(t), o = jn(i, "utf-8"), c = {
    name: pu,
    counter: n,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), h = await crypto.subtle.encrypt(c, d, o);
  return {
    data: vs(h),
    iv: vs(n),
    salt: vs(r)
  };
}, kf = async (e, t) => {
  const n = jn(t.iv), r = jn(t.salt), s = qo(e, r), i = jn(t.data), o = {
    name: pu,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), d = await crypto.subtle.decrypt(o, c, i), h = new TextDecoder().decode(d);
  try {
    return JSON.parse(h);
  } catch {
    throw new x(R.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, Mf = async (e, t, n) => {
  const r = hi.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
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
}, Of = async (e, t, n) => {
  const r = hi.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
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
}, Tf = {
  bufferFromString: jn,
  stringFromBuffer: vs,
  decrypt: kf,
  encrypt: Nf,
  keyFromPassword: qo,
  randomBytes: ao,
  scrypt: Rf,
  keccak256: Sf,
  decryptJsonWalletData: Of,
  encryptJsonWalletData: Mf
}, Lf = Tf, {
  bufferFromString: In,
  decrypt: Ff,
  encrypt: Pf,
  keyFromPassword: Uy,
  randomBytes: jt,
  stringFromBuffer: _r,
  scrypt: mu,
  keccak256: wu,
  decryptJsonWalletData: Uf,
  encryptJsonWalletData: Gf
} = Lf;
function yt(e) {
  return Z(ts(J(e)));
}
function nn(e) {
  return yt(e);
}
function Hf(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function Jf(e) {
  return nn(In(e, "utf-8"));
}
var Yf = Object.defineProperty, Zf = (e, t, n) => t in e ? Yf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ns = (e, t, n) => (Zf(e, typeof t != "symbol" ? t + "" : t, n), n), Vf = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Eu = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Iu = (e, t, n) => (Vf(e, t, "access private method"), n), se = class {
  constructor(e, t, n) {
    _(this, "name");
    _(this, "type");
    _(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, yu = "u8", Bu = "u16", Cu = "u32", bu = "u64", Qu = "u256", xu = "raw untyped ptr", vu = "raw untyped slice", _u = "bool", Du = "b256", Ru = "struct B512", Wo = "enum Option", $o = "struct Vec", zo = "struct Bytes", Ko = "struct String", Su = "str", ea = /str\[(?<length>[0-9]+)\]/, Gs = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, ta = /^struct (?<name>\w+)$/, na = /^enum (?<name>\w+)$/, Nu = /^\((?<items>.*)\)$/, Xf = /^generic (?<name>\w+)$/, Gt = "0", Ar = "1", ee = 8, Cn = 32, co = Cn + 2, Mn = Cn, ku = Cn, jf = Cn, qf = ee * 4, Wf = ee * 2, ra = 2 ** 32 - 1, fi = ({ maxInputs: e }) => Cn + // Tx ID
Mn + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Mn + ee) + ee, sa = ee + // Identifier
ee + // Gas limit
ee + // Script size
ee + // Script data size
ee + // Policies
ee + // Inputs size
ee + // Outputs size
ee + // Witnesses size
Cn, $f = ee + // Identifier
qf + // Utxo Length
ee + // Output Index
jf + // Owner
ee + // Amount
Mn + // Asset id
Wf + // TxPointer
ee + // Witnesses index
ee + // Predicate size
ee + // Predicate data size
ee, zf = {
  u64: ee,
  u256: ee * 4
}, S = class extends se {
  constructor(e) {
    super("bigNumber", e, zf[e]);
  }
  encode(e) {
    let t;
    try {
      t = Pt(e, this.encodedLength);
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
}, Kf = 3, It = Kf * ee, eg = 2, ac = eg * ee;
function Rt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([h, E]) => {
      t[parseInt(h, 10) + n] = E;
    });
    const d = J(o);
    return n += d.byteLength / ee, d;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function Mu(e, t, n) {
  if (!e.dynamicData)
    return re([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * ee, d = new S("u64").encode(
      n + t + r
    );
    s.set(d, c);
    const h = o.dynamicData ? (
      // unpack child dynamic data
      Mu(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = re([s, h]), r += h.byteLength;
  }), s;
}
var tg = (e, t = ee) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, ng = (e) => {
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
}, rg = (e) => e === $o || e === zo || e === Ko, Tr = (e) => e % ee === 0, Ou = (e) => ee - e % ee, Tu = (e) => {
  if (Tr(e.length))
    return e;
  const t = new Uint8Array(ee - e.length % ee);
  return Xr([e, t]);
}, sg = (e) => e instanceof Uint8Array, gt = class extends se {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    _(this, "coder");
    _(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Rt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > ra)
      throw new x(R.DECODE_ERROR, "Invalid array data size.");
    let r = n;
    return [Array(this.length).fill(0).map(() => {
      let i;
      return [i, r] = this.coder.decode(t, r), i;
    }), r];
  }
}, U = class extends se {
  constructor() {
    super("b256", "b256", ee * 4);
  }
  encode(e) {
    let t;
    try {
      t = J(e);
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
    return [Lo(n, 32), t + 32];
  }
}, Lu = class extends se {
  constructor() {
    super("b512", "struct B512", ee * 8);
  }
  encode(e) {
    let t;
    try {
      t = J(e);
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
    return [Lo(n, this.encodedLength), t + this.encodedLength];
  }
}, ig = class extends se {
  constructor(t = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const n = t.isSmallBytes ? 1 : 8;
    super("boolean", "boolean", n);
    _(this, "paddingLength");
    _(this, "options");
    this.paddingLength = n, this.options = t;
  }
  encode(t) {
    if (!(t === !0 || t === !1))
      throw new x(R.ENCODE_ERROR, "Invalid boolean value.");
    const r = Pt(t ? 1 : 0, this.paddingLength);
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
}, Ao, Fu, Hs = class extends se {
  constructor() {
    super("struct", "struct Bytes", It), Eu(this, Ao);
  }
  encode(e) {
    const t = [], n = new S("u64").encode(It), r = Iu(this, Ao, Fu).call(this, e);
    return n.dynamicData = {
      0: Rt([r])
    }, t.push(n), t.push(new S("u64").encode(r.byteLength)), t.push(new S("u64").encode(e.length)), Rt(t);
  }
  decode(e, t) {
    if (e.length < It)
      throw new x(R.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = Q(new S("u64").decode(n, 0)[0]).toNumber(), s = e.slice(It, It + r);
    if (s.length !== r)
      throw new x(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + It];
  }
};
Ao = /* @__PURE__ */ new WeakSet();
Fu = function(e) {
  const t = e instanceof Uint8Array ? [e] : [new Uint8Array(e)], n = (ee - e.length % ee) % ee;
  return n && t.push(new Uint8Array(n)), re(t);
};
ns(Hs, "memorySize", 1);
var og = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), er, wn, ri, Uu, si, Gu, fA, Pu = (fA = class extends se {
  constructor(t, n) {
    const r = new S("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    Le(this, ri);
    Le(this, si);
    _(this, "name");
    _(this, "coders");
    Le(this, er, void 0);
    Le(this, wn, void 0);
    this.name = t, this.coders = n, Et(this, er, r), Et(this, wn, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return sn(this, ri, Uu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new x(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new x(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(we(this, wn) - s.encodedLength);
    return Rt([we(this, er).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < we(this, wn))
      throw new x(R.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new S("u64").decode(t, r);
    const i = Ft(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new x(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], d = we(this, wn) - c.encodedLength;
    return r += d, [s, r] = c.decode(t, r), og(this.coders) ? sn(this, si, Gu).call(this, o, r) : [{ [o]: s }, r];
  }
}, er = new WeakMap(), wn = new WeakMap(), ri = new WeakSet(), Uu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(we(this, wn) - n.encodedLength);
  return re([we(this, er).encode(s), i, r]);
}, si = new WeakSet(), Gu = function(t, n) {
  return [t, n];
}, fA), Hu = class extends Pu {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, ce = class extends se {
  constructor(t, n = {
    isSmallBytes: !1,
    isRightPadded: !1
  }) {
    const r = n.isSmallBytes && t === "u8" ? 1 : 8;
    super("number", t, r);
    // This is to align the bits to the total bytes
    // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
    _(this, "length");
    _(this, "paddingLength");
    _(this, "baseType");
    _(this, "options");
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
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Pt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Ft(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new x(R.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new x(R.DECODE_ERROR, "Invalid number byte data size.");
    return [Ft(r), n + 8];
  }
}, ag = class extends se {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ac);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new ce("u8", { isSmallBytes: !0 }), r = new S("u64").encode(
      ac
    );
    return r.dynamicData = {
      0: Rt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new S("u64").encode(e.length)), Rt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new gt(
      new ce("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, uo, Ju, Yu = class extends se {
  constructor() {
    super("struct", "struct String", 1), Eu(this, uo);
  }
  encode(e) {
    const t = [], n = new S("u64").encode(It), r = Iu(this, uo, Ju).call(this, e);
    return n.dynamicData = {
      0: Rt([r])
    }, t.push(n), t.push(new S("u64").encode(r.byteLength)), t.push(new S("u64").encode(e.length)), Rt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = Q(new S("u64").decode(n, 0)[0]).toNumber(), s = e.slice(It, It + r);
    if (s.length !== r)
      throw new x(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [Wr(s), t + It];
  }
};
uo = /* @__PURE__ */ new WeakSet();
Ju = function(e) {
  const t = [qr(e)], n = (ee - e.length % ee) % ee;
  return n && t.push(new Uint8Array(n)), re(t);
};
ns(Yu, "memorySize", 1);
var tr, gA, cg = (gA = class extends se {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    _(this, "length");
    Le(this, tr, void 0);
    this.length = t, Et(this, tr, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = qr(t), r = new Uint8Array(we(this, tr));
    return re([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new x(R.DECODE_ERROR, "Invalid string byte data size.");
    const s = Wr(r), i = we(this, tr);
    return [s, n + this.length + i];
  }
}, tr = new WeakMap(), gA), gi = class extends se {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    _(this, "name");
    _(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    const n = Object.keys(this.coders).map((r) => {
      const s = this.coders[r], i = t[r];
      if (!(s instanceof Hu) && i == null)
        throw new x(
          R.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Tr(o.length) ? o : Tu(o);
    });
    return Rt([Rt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let d;
      return [d, r] = c.decode(t, r), Tr(r) || (r += Ou(r)), i[o] = d, i;
    }, {}), r];
  }
}, Zu = class extends se {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    _(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Rt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return Tr(s.length) ? s : Tu(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), Tr(r) || (r += Ou(r)), o;
    }), r];
  }
}, Vu = class extends se {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + It);
    _(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t) && !sg(t))
      throw new x(
        R.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = [], r = new S("u64").encode(It);
    return r.dynamicData = {
      0: Rt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new S("u64").encode(t.length)), n.push(new S("u64").encode(t.length)), Rt(n);
  }
  decode(t, n) {
    if (t.length < It || t.length > ra)
      throw new x(R.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = Q(new S("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(It, It + i);
    if (o.length !== i)
      throw new x(R.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      tg(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + It
    ];
  }
}, Xu = (e) => {
  switch (e) {
    case void 0:
    case Gt:
      return Gt;
    case Ar:
      return Ar;
    default:
      throw new x(
        R.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, Ag = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new x(
      R.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, tn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new x(
      R.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, cc = (e, t) => t.filter((n) => tn(e, n.type).type !== "()"), ju = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new x(
      R.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, Kt = class {
  constructor(e, t) {
    _(this, "abi");
    _(this, "name");
    _(this, "type");
    _(this, "originalTypeArguments");
    _(this, "components");
    this.abi = e, this.name = t.name;
    const n = tn(e, t.type);
    this.type = n.type, this.originalTypeArguments = t.typeArguments, this.components = Kt.getResolvedGenericComponents(
      e,
      t,
      n.components,
      n.typeParameters ?? Kt.getImplicitGenericTypeParameters(e, n.components)
    );
  }
  static getResolvedGenericComponents(e, t, n, r) {
    if (n === null)
      return null;
    if (r === null || r.length === 0)
      return n.map((o) => new Kt(e, o));
    const s = r.reduce(
      (o, c, d) => {
        var E;
        const h = { ...o };
        return h[c] = structuredClone(
          (E = t.typeArguments) == null ? void 0 : E[d]
        ), h;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      e,
      n,
      s
    ).map((o) => new Kt(e, o));
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
      const s = tn(e, r.type), i = this.getImplicitGenericTypeParameters(e, s.components);
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
      const i = tn(e, s.type);
      if (Xf.test(i.type)) {
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
    return ta.test(this.type) ? "s" : Gs.test(this.type) ? "a" : na.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = ea.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Gs.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new Kt(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function Js(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Fn = (e, t) => {
  var d, h, E, m, b;
  switch (e.type) {
    case yu:
    case Bu:
    case Cu:
      return new ce(e.type, t);
    case bu:
    case xu:
      return new S("u64");
    case Qu:
      return new S("u256");
    case vu:
      return new ag();
    case _u:
      return new ig(t);
    case Du:
      return new U();
    case Ru:
      return new Lu();
    case zo:
      return new Hs();
    case Ko:
      return new Yu();
  }
  const n = (d = ea.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new cg(v);
  }
  const r = e.components, s = (h = Gs.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const v = parseInt(s.length, 10), D = r[0];
    if (!D)
      throw new x(
        R.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const C = Fn(D, { isSmallBytes: !0 });
    return new gt(C, v);
  }
  if (e.type === $o) {
    const v = ju(r), D = new Kt(e.abi, v), C = Fn(D, { isSmallBytes: !0, encoding: Gt });
    return new Vu(C);
  }
  const i = (E = ta.exec(e.type)) == null ? void 0 : E.groups;
  if (i) {
    const v = Js(r, { isRightPadded: !0, getCoder: Fn });
    return new gi(i.name, v);
  }
  const o = (m = na.exec(e.type)) == null ? void 0 : m.groups;
  if (o) {
    const v = Js(r, { getCoder: Fn });
    return e.type === Wo ? new Hu(o.name, v) : new Pu(o.name, v);
  }
  if ((b = Nu.exec(e.type)) == null ? void 0 : b.groups) {
    const v = r.map(
      (D) => Fn(D, { isRightPadded: !0, encoding: Gt })
    );
    return new Zu(v);
  }
  throw e.type === Su ? new x(
    R.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new x(
    R.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, ug = class extends se {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new x(R.ENCODE_ERROR, "Invalid boolean value.");
    return Pt(e ? 1 : 0, this.encodedLength);
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
}, qu = class extends se {
  constructor() {
    super("struct", "struct Bytes", ee);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new S("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ee)
      throw new x(R.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
ns(qu, "memorySize", 1);
var dg = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), nr, rr, ii, $u, oi, zu, pA, Wu = (pA = class extends se {
  constructor(t, n) {
    const r = new S("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    Le(this, ii);
    Le(this, oi);
    _(this, "name");
    _(this, "coders");
    Le(this, nr, void 0);
    Le(this, rr, void 0);
    this.name = t, this.coders = n, Et(this, nr, r), Et(this, rr, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return sn(this, ii, $u).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new x(R.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new x(R.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...we(this, nr).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < we(this, rr))
      throw new x(R.DECODE_ERROR, "Invalid enum data size.");
    const r = new S("u64").decode(t, n)[0], s = Ft(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new x(
        R.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + ee, [d, h] = o.decode(t, c);
    return dg(this.coders) ? sn(this, oi, zu).call(this, i, h) : [{ [i]: d }, h];
  }
}, nr = new WeakMap(), rr = new WeakMap(), ii = new WeakSet(), $u = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(we(this, rr) - n.encodedLength);
  return re([we(this, nr).encode(s), i, r]);
}, oi = new WeakSet(), zu = function(t, n) {
  return [t, n];
}, pA), lg = (e) => {
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
}, lo = class extends se {
  constructor(t) {
    const n = lg(t);
    super("number", t, n);
    _(this, "length");
    _(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Pt(t);
    } catch {
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new x(R.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Pt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid number byte data size.");
    return [Ft(r), n + this.length];
  }
}, ia = class extends Wu {
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
}, hg = class extends se {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ee);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const n = new gt(new lo("u8"), e.length).encode(e), r = new S("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new gt(new lo("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, oa = class extends se {
  constructor() {
    super("struct", "struct String", ee);
  }
  encode(e) {
    const t = qr(e), n = new S("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid std string byte data size.");
    return [Wr(i), n + s];
  }
};
ns(oa, "memorySize", 1);
var Ku = class extends se {
  constructor() {
    super("strSlice", "str", ee);
  }
  encode(e) {
    const t = qr(e), n = new S("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ee, r = e.slice(t, n), s = Q(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new x(R.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Wr(i), n + s];
  }
};
ns(Ku, "memorySize", 1);
var fg = class extends se {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new x(R.ENCODE_ERROR, "Value length mismatch during encode.");
    return qr(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new x(R.DECODE_ERROR, "Invalid string byte data size.");
    return [Wr(n), t + this.encodedLength];
  }
}, gg = class extends se {
  constructor(t, n) {
    const r = Object.values(n).reduce(
      (s, i) => s + i.encodedLength,
      0
    );
    super("struct", `struct ${t}`, r);
    _(this, "name");
    _(this, "coders");
    this.name = t, this.coders = n;
  }
  encode(t) {
    return Xr(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof ia) && s == null)
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
}, ed = class extends se {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    _(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new x(R.ENCODE_ERROR, "Types/values length mismatch.");
    return Xr(this.coders.map((n, r) => n.encode(t[r])));
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
}, sr, mA, pg = (mA = class extends se {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ee);
    _(this, "coder");
    Le(this, sr, void 0);
    this.coder = t, Et(this, sr, this.coder instanceof ia);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new x(R.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new S("u64").encode(t.length);
    return new Uint8Array([...r, ...Xr(n)]);
  }
  decode(t, n) {
    if (!we(this, sr) && (t.length < this.encodedLength || t.length > ra))
      throw new x(R.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ee, s = t.slice(n, r), i = Q(new S("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, c = t.slice(r, r + o);
    if (!we(this, sr) && c.length !== o)
      throw new x(R.DECODE_ERROR, "Invalid vec byte data size.");
    let d = r;
    const h = [];
    for (let E = 0; E < i; E++) {
      const [m, b] = this.coder.decode(t, d);
      h.push(m), d = b;
    }
    return [h, d];
  }
}, sr = new WeakMap(), mA), Pn = (e, t) => {
  var d, h, E, m, b;
  switch (e.type) {
    case yu:
    case Bu:
    case Cu:
      return new lo(e.type);
    case bu:
    case xu:
      return new S("u64");
    case Qu:
      return new S("u256");
    case vu:
      return new hg();
    case _u:
      return new ug();
    case Du:
      return new U();
    case Ru:
      return new Lu();
    case zo:
      return new qu();
    case Ko:
      return new oa();
    case Su:
      return new Ku();
  }
  const n = (d = ea.exec(e.type)) == null ? void 0 : d.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new fg(v);
  }
  const r = e.components, s = (h = Gs.exec(e.type)) == null ? void 0 : h.groups;
  if (s) {
    const v = parseInt(s.length, 10), D = r[0];
    if (!D)
      throw new x(
        R.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const C = Pn(D);
    return new gt(C, v);
  }
  if (e.type === $o) {
    const v = ju(r), D = new Kt(e.abi, v), C = Pn(D);
    return new pg(C);
  }
  const i = (E = ta.exec(e.type)) == null ? void 0 : E.groups;
  if (i) {
    const v = Js(r, { isRightPadded: !0, getCoder: Pn });
    return new gg(i.name, v);
  }
  const o = (m = na.exec(e.type)) == null ? void 0 : m.groups;
  if (o) {
    const v = Js(r, { getCoder: Pn });
    return e.type === Wo ? new ia(o.name, v) : new Wu(o.name, v);
  }
  if ((b = Nu.exec(e.type)) == null ? void 0 : b.groups) {
    const v = r.map(
      (D) => Pn(D)
    );
    return new ed(v);
  }
  throw new x(
    R.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function mg(e = Gt) {
  switch (e) {
    case Ar:
      return Pn;
    case Gt:
      return Fn;
    default:
      throw new x(
        R.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Jn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new Kt(e, t);
    return mg(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, ai, td, ci, nd, Ai, rd, wA, _s = (wA = class {
  constructor(e, t) {
    Le(this, ai);
    Le(this, ci);
    Le(this, Ai);
    _(this, "signature");
    _(this, "selector");
    _(this, "selectorBytes");
    _(this, "encoding");
    _(this, "name");
    _(this, "jsonFn");
    _(this, "attributes");
    _(this, "isInputDataPointer");
    _(this, "outputMetadata");
    _(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = Ag(this.jsonAbi, t), this.name = t, this.signature = _s.getSignature(this.jsonAbi, this.jsonFn), this.selector = _s.getFunctionSelector(this.signature), this.selectorBytes = new oa().encode(t), this.encoding = Xu(e.encoding), this.isInputDataPointer = sn(this, ai, td).call(this), this.outputMetadata = {
      isHeapType: sn(this, ci, nd).call(this),
      encodedLength: sn(this, Ai, rd).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new Kt(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = yt(In(e, "utf-8"));
    return Q(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    _s.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = cc(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (o) => Jn.getCoder(this.jsonAbi, o, {
        isRightPadded: r.length > 1,
        encoding: this.encoding
      })
    );
    if (this.encoding === Ar)
      return new ed(s).encode(n);
    const i = new Zu(s).encode(n);
    return Mu(i, t, i.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => tn(n, o.type)), s = r.filter(
      (o) => o.type === Wo || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new x(R.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = J(e), n = cc(this.jsonAbi, this.jsonFn.inputs);
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
        const o = Jn.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [c, d] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + d
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (tn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = J(e);
    return Jn.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, ai = new WeakSet(), td = function() {
  var t;
  const e = this.jsonFn.inputs.map((n) => tn(this.jsonAbi, n.type));
  return this.jsonFn.inputs.length > 1 || ng(((t = e[0]) == null ? void 0 : t.type) || "");
}, ci = new WeakSet(), nd = function() {
  const e = tn(this.jsonAbi, this.jsonFn.output.type);
  return rg((e == null ? void 0 : e.type) || "");
}, Ai = new WeakSet(), rd = function() {
  try {
    const e = Jn.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof Vu ? e.coder.encodedLength : e instanceof Hs ? Hs.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, wA), rn = class {
  constructor(e) {
    _(this, "functions");
    _(this, "configurables");
    _(this, "jsonAbi");
    _(this, "encoding");
    this.jsonAbi = e, this.encoding = Xu(e.encoding), this.functions = Object.fromEntries(
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
    throw new x(
      R.FUNCTION_NOT_FOUND,
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
      throw new x(
        R.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Jn.decode(this.jsonAbi, n.loggedType, J(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new x(
        R.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Jn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0,
      // TODO: Review support for configurables in v1 encoding when it becomes available
      encoding: Gt
    });
  }
  getTypeById(e) {
    return tn(this.jsonAbi, e);
  }
}, Gy = class {
}, wg = class {
}, sd = class {
}, id = class {
}, Eg = class extends id {
}, Ig = class extends id {
}, Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
var ur = Lr.bech32m = Lr.bech32 = void 0;
const Ys = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", od = {};
for (let e = 0; e < Ys.length; e++) {
  const t = Ys.charAt(e);
  od[t] = e;
}
function qn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Ac(e) {
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
function aa(e, t, n, r) {
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
function yg(e) {
  return aa(e, 8, 5, !0);
}
function Bg(e) {
  const t = aa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Cg(e) {
  const t = aa(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function ad(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, d) {
    if (d = d || 90, o.length + 7 + c.length > d)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let h = Ac(o);
    if (typeof h == "string")
      throw new Error(h);
    let E = o + "1";
    for (let m = 0; m < c.length; ++m) {
      const b = c[m];
      if (b >> 5)
        throw new Error("Non 5-bit word");
      h = qn(h) ^ b, E += Ys.charAt(b);
    }
    for (let m = 0; m < 6; ++m)
      h = qn(h);
    h ^= t;
    for (let m = 0; m < 6; ++m) {
      const b = h >> (5 - m) * 5 & 31;
      E += Ys.charAt(b);
    }
    return E;
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
    const E = o.lastIndexOf("1");
    if (E === -1)
      return "No separator character for " + o;
    if (E === 0)
      return "Missing prefix for " + o;
    const m = o.slice(0, E), b = o.slice(E + 1);
    if (b.length < 6)
      return "Data too short";
    let v = Ac(m);
    if (typeof v == "string")
      return v;
    const D = [];
    for (let C = 0; C < b.length; ++C) {
      const k = b.charAt(C), N = od[k];
      if (N === void 0)
        return "Unknown character " + k;
      v = qn(v) ^ N, !(C + 6 >= b.length) && D.push(N);
    }
    return v !== t ? "Invalid checksum for " + o : { prefix: m, words: D };
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
    toWords: yg,
    fromWordsUnsafe: Bg,
    fromWords: Cg
  };
}
Lr.bech32 = ad("bech32");
ur = Lr.bech32m = ad("bech32m");
var Zs = "fuel";
function ca(e) {
  return ur.decode(e);
}
function Ds(e) {
  return ur.encode(
    Zs,
    ur.toWords(J(Z(e)))
  );
}
function Rs(e) {
  return typeof e == "string" && e.indexOf(Zs + 1) === 0 && ca(e).prefix === Zs;
}
function ho(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function uc(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function fo(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function Aa(e) {
  return new Uint8Array(ur.fromWords(ca(e).words));
}
function dc(e) {
  if (!Rs(e))
    throw new x(
      x.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return Z(Aa(e));
}
function bg(e) {
  const { words: t } = ca(e);
  return ur.encode(Zs, t);
}
var Dr = (e) => e instanceof sd ? e.address : e instanceof Eg ? e.id : e, Qg = () => Z(jt(32)), xg = (e) => {
  let t;
  try {
    if (!ho(e))
      throw new x(
        x.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = Aa(Ds(e)), t = Z(t.fill(0, 0, 12));
  } catch {
    throw new x(
      x.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, vg = (e) => {
  if (!fo(e))
    throw new x(x.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, ue = class extends wg {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    _(this, "bech32Address");
    if (this.bech32Address = bg(t), !Rs(this.bech32Address))
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
    return dc(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return Aa(this.bech32Address);
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
    const t = dc(this.bech32Address);
    return {
      bits: xg(t)
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
    if (!uc(t))
      throw new x(x.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = Z(ts(J(t)));
    return new ue(Ds(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!ho(t))
      throw new x(
        x.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new ue(Ds(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(Qg());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Rs(t) ? new ue(t) : this.fromB256(t);
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
      return ue.fromB256(t.toB256());
    if (uc(t))
      return ue.fromPublicKey(t);
    if (Rs(t))
      return new ue(t);
    if (ho(t))
      return ue.fromB256(t);
    if (fo(t))
      return ue.fromEvmAddress(t);
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
    if (!fo(t))
      throw new x(
        x.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = vg(t);
    return new ue(Ds(n));
  }
};
function _g(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function cd(e) {
  return function t(n) {
    return arguments.length === 0 || _g(n) ? t : e.apply(this, arguments);
  };
}
var Dg = /* @__PURE__ */ cd(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
const Rg = Dg;
function Sg(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Ad(e, t, n) {
  if (n || (n = new kg()), Ng(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? Ad(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Rg(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Sg(e);
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
function Ng(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var kg = /* @__PURE__ */ function() {
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
}(), Mg = /* @__PURE__ */ cd(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Ad(t, !0);
});
const yn = Mg;
var En, EA, Ie = (EA = class extends se {
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
    _(this, "length");
    Le(this, En, void 0);
    this.length = t, Et(this, En, n);
  }
  encode(t) {
    const n = [], r = J(t);
    return n.push(r), we(this, En) && n.push(new Uint8Array(we(this, En))), re(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [Z(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return we(this, En) && ([r, s] = [null, s + we(this, En)]), [i, s];
  }
}, En = new WeakMap(), EA), dr = class extends gi {
  constructor() {
    super("TxPointer", {
      blockHeight: new ce("u32"),
      txIndex: new ce("u16")
    });
  }
}, me = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(me || {}), lc = class extends se {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.txID)), t.push(new ce("u16").encode(e.outputIndex)), t.push(new U().encode(e.owner)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new dr().encode(e.txPointer)), t.push(new ce("u16").encode(e.witnessIndex)), t.push(new S("u64").encode(e.predicateGasUsed)), t.push(new S("u64").encode(e.predicateLength)), t.push(new S("u64").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ie(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new ce("u16").decode(e, r);
    const i = n;
    [n, r] = new U().decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new U().decode(e, r);
    const d = n;
    [n, r] = new dr().decode(e, r);
    const h = n;
    [n, r] = new ce("u16").decode(e, r);
    const E = Number(n);
    [n, r] = new S("u64").decode(e, r);
    const m = n;
    [n, r] = new S("u64").decode(e, r);
    const b = n;
    [n, r] = new S("u64").decode(e, r);
    const v = n;
    [n, r] = new Ie(b.toNumber()).decode(e, r);
    const D = n;
    return [n, r] = new Ie(v.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: d,
        txPointer: h,
        witnessIndex: E,
        predicateGasUsed: m,
        predicateLength: b,
        predicateDataLength: v,
        predicate: D,
        predicateData: n
      },
      r
    ];
  }
}, Vs = class extends se {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.txID)), t.push(new ce("u16").encode(e.outputIndex)), t.push(new U().encode(e.balanceRoot)), t.push(new U().encode(e.stateRoot)), t.push(new dr().encode(e.txPointer)), t.push(new U().encode(e.contractID)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new ce("u16").decode(e, r);
    const i = n;
    [n, r] = new U().decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new dr().decode(e, r);
    const d = n;
    return [n, r] = new U().decode(e, r), [
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
}, Fr = class extends se {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new S("u64").encode(e.amount)), t.push(J(e.data || "0x")), yt(re(t));
  }
  static encodeData(e) {
    const t = J(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = Fr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new S("u64").encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new ce("u16").encode(e.witnessIndex)), t.push(new S("u64").encode(e.predicateGasUsed)), t.push(new S("u64").encode(n.length)), t.push(new S("u64").encode(e.predicateLength)), t.push(new S("u64").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ie(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), re(t);
  }
  static decodeData(e) {
    const t = J(e), n = t.length, [r] = new Ie(n).decode(t, 0);
    return J(r);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new ce("u16").decode(e, r);
    const d = Number(n);
    [n, r] = new S("u64").decode(e, r);
    const h = n;
    [n, r] = new ce("u32").decode(e, r);
    const E = n;
    [n, r] = new S("u64").decode(e, r);
    const m = n;
    [n, r] = new S("u64").decode(e, r);
    const b = n;
    [n, r] = new Ie(E).decode(e, r);
    const v = n;
    [n, r] = new Ie(m.toNumber()).decode(e, r);
    const D = n;
    return [n, r] = new Ie(b.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: d,
        nonce: c,
        predicateGasUsed: h,
        dataLength: E,
        predicateLength: m,
        predicateDataLength: b,
        data: v,
        predicate: D,
        predicateData: n
      },
      r
    ];
  }
}, Xs = class extends se {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ce("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new lc().encode(e));
        break;
      }
      case 1: {
        t.push(new Vs().encode(e));
        break;
      }
      case 2: {
        t.push(new Fr().encode(e));
        break;
      }
      default:
        throw new x(
          R.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new lc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Vs().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Fr().decode(e, r), [n, r];
      default:
        throw new x(
          R.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Be = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Be || {}), hc = class extends se {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 0,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, js = class extends se {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ce("u8").encode(e.inputIndex)), t.push(new U().encode(e.balanceRoot)), t.push(new U().encode(e.stateRoot)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u8").decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 1,
        inputIndex: s,
        balanceRoot: i,
        stateRoot: n
      },
      r
    ];
  }
}, fc = class extends se {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 2,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, gc = class extends se {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 3,
        to: s,
        amount: i,
        assetId: n
      },
      r
    ];
  }
}, pc = class extends se {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.contractId)), t.push(new U().encode(e.stateRoot)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    return [n, r] = new U().decode(e, r), [
      {
        type: 4,
        contractId: s,
        stateRoot: n
      },
      r
    ];
  }
}, qs = class extends se {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ce("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new hc().encode(e));
        break;
      }
      case 1: {
        t.push(new js().encode(e));
        break;
      }
      case 2: {
        t.push(new fc().encode(e));
        break;
      }
      case 3: {
        t.push(new gc().encode(e));
        break;
      }
      case 4: {
        t.push(new pc().encode(e));
        break;
      }
      default:
        throw new x(
          R.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new hc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new js().decode(e, r), [n, r];
      case 2:
        return [n, r] = new fc().decode(e, r), [n, r];
      case 3:
        return [n, r] = new gc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new pc().decode(e, r), [n, r];
      default:
        throw new x(
          R.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Ot = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Ot || {}), Og = (e) => e.sort((t, n) => t.type - n.type);
function Tg(e) {
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
var Ws = class extends se {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    Tg(e);
    const t = Og(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new S("u64").encode(r));
          break;
        case 4:
          n.push(new ce("u32").encode(r));
          break;
        default:
          throw new x(R.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
      }
    }), re(n);
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
      const [i, o] = new ce("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new S("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, Ae = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(Ae || {}), mc = class extends se {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.from)), t.push(new U().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new S("u64").encode(e.gas)), t.push(new S("u64").encode(e.param1)), t.push(new S("u64").encode(e.param2)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    [n, r] = new S("u64").decode(e, r);
    const h = n;
    [n, r] = new S("u64").decode(e, r);
    const E = n;
    [n, r] = new S("u64").decode(e, r);
    const m = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: d,
        param1: h,
        param2: E,
        pc: m,
        is: n
      },
      r
    ];
  }
}, wc = class extends se {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
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
}, Ec = class extends se {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new S("u64").encode(e.ptr)), t.push(new S("u64").encode(e.len)), t.push(new U().encode(e.digest)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
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
}, Ic = class extends se {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new S("u64").encode(e.reason)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), t.push(new U().encode(e.contractId)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    return [n, r] = new U().decode(e, r), [
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
}, yc = class extends se {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
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
}, Bc = class extends se {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new S("u64").encode(e.val0)), t.push(new S("u64").encode(e.val1)), t.push(new S("u64").encode(e.val2)), t.push(new S("u64").encode(e.val3)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
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
        val2: c,
        val3: d,
        pc: h,
        is: n
      },
      r
    ];
  }
}, Cc = class extends se {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.id)), t.push(new S("u64").encode(e.val0)), t.push(new S("u64").encode(e.val1)), t.push(new S("u64").encode(e.ptr)), t.push(new S("u64").encode(e.len)), t.push(new U().encode(e.digest)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new S("u64").decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    [n, r] = new U().decode(e, r);
    const h = n;
    [n, r] = new S("u64").decode(e, r);
    const E = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: d,
        digest: h,
        pc: E,
        is: n
      },
      r
    ];
  }
}, bc = class extends se {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.from)), t.push(new U().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
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
}, Qc = class extends se {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.from)), t.push(new U().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.assetId)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
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
}, xc = class extends se {
  constructor() {
    super("ReceiptScriptResult", "struct ReceiptScriptResult", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S("u64").encode(e.result)), t.push(new S("u64").encode(e.gasUsed)), re(t);
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
}, $s = class extends se {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new S("u64").encode(e.amount)), t.push(J(e.data || "0x")), yt(re(t));
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.sender)), t.push(new U().encode(e.recipient)), t.push(new S("u64").encode(e.amount)), t.push(new U().encode(e.nonce)), t.push(new ce("u16").encode(e.data.length)), t.push(new U().encode(e.digest)), t.push(new Ie(e.data.length).encode(e.data)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new U().decode(e, r);
    const c = n;
    [n, r] = new ce("u16").decode(e, r);
    const d = n;
    [n, r] = new U().decode(e, r);
    const h = n;
    [n, r] = new Ie(d).decode(e, r);
    const E = J(n), m = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: h,
      data: E
    };
    return m.messageId = $s.getMessageId(m), [m, r];
  }
}, ud = (e, t) => {
  const n = J(e), r = J(t);
  return yt(re([n, r]));
}, Pr = class extends se {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return ud(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.subId)), t.push(new U().encode(e.contractId)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
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
}, go = class extends se {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return ud(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new U().encode(e.subId)), t.push(new U().encode(e.contractId)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new U().decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new S("u64").decode(e, r);
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
}, Hy = class extends se {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ce("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new mc().encode(e));
        break;
      }
      case 1: {
        t.push(new wc().encode(e));
        break;
      }
      case 2: {
        t.push(new Ec().encode(e));
        break;
      }
      case 3: {
        t.push(new Ic().encode(e));
        break;
      }
      case 4: {
        t.push(new yc().encode(e));
        break;
      }
      case 5: {
        t.push(new Bc().encode(e));
        break;
      }
      case 6: {
        t.push(new Cc().encode(e));
        break;
      }
      case 7: {
        t.push(new bc().encode(e));
        break;
      }
      case 8: {
        t.push(new Qc().encode(e));
        break;
      }
      case 9: {
        t.push(new xc().encode(e));
        break;
      }
      case 10: {
        t.push(new $s().encode(e));
        break;
      }
      case 11: {
        t.push(new Pr().encode(e));
        break;
      }
      case 12: {
        t.push(new go().encode(e));
        break;
      }
      default:
        throw new x(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new mc().decode(e, r), [n, r];
      case 1:
        return [n, r] = new wc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Ec().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ic().decode(e, r), [n, r];
      case 4:
        return [n, r] = new yc().decode(e, r), [n, r];
      case 5:
        return [n, r] = new Bc().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Cc().decode(e, r), [n, r];
      case 7:
        return [n, r] = new bc().decode(e, r), [n, r];
      case 8:
        return [n, r] = new Qc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new xc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new $s().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Pr().decode(e, r), [n, r];
      case 12:
        return [n, r] = new go().decode(e, r), [n, r];
      default:
        throw new x(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, vc = class extends gi {
  constructor() {
    super("StorageSlot", {
      key: new U(),
      value: new U()
    });
  }
}, zs = class extends se {
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
    return t.push(new ce("u32").encode(e.dataLength)), t.push(new Ie(e.dataLength).encode(e.data)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u32").decode(e, r);
    const s = n;
    return [n, r] = new Ie(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, ft = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e))(ft || {}), _c = class extends se {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S("u64").encode(e.scriptGasLimit)), t.push(new U().encode(e.receiptsRoot)), t.push(new S("u64").encode(e.scriptLength)), t.push(new S("u64").encode(e.scriptDataLength)), t.push(new ce("u32").encode(e.policyTypes)), t.push(new ce("u16").encode(e.inputsCount)), t.push(new ce("u16").encode(e.outputsCount)), t.push(new ce("u16").encode(e.witnessesCount)), t.push(new Ie(e.scriptLength.toNumber()).encode(e.script)), t.push(new Ie(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new Ws().encode(e.policies)), t.push(new gt(new Xs(), e.inputsCount).encode(e.inputs)), t.push(new gt(new qs(), e.outputsCount).encode(e.outputs)), t.push(new gt(new zs(), e.witnessesCount).encode(e.witnesses)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new S("u64").decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new ce("u32").decode(e, r);
    const d = n;
    [n, r] = new ce("u16").decode(e, r);
    const h = n;
    [n, r] = new ce("u16").decode(e, r);
    const E = n;
    [n, r] = new ce("u16").decode(e, r);
    const m = n;
    [n, r] = new Ie(o.toNumber()).decode(e, r);
    const b = n;
    [n, r] = new Ie(c.toNumber()).decode(e, r);
    const v = n;
    [n, r] = new Ws().decode(e, r, d);
    const D = n;
    [n, r] = new gt(new Xs(), h).decode(e, r);
    const C = n;
    [n, r] = new gt(new qs(), E).decode(e, r);
    const k = n;
    return [n, r] = new gt(new zs(), m).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: c,
        policyTypes: d,
        inputsCount: h,
        outputsCount: E,
        witnessesCount: m,
        receiptsRoot: i,
        script: b,
        scriptData: v,
        policies: D,
        inputs: C,
        outputs: k,
        witnesses: n
      },
      r
    ];
  }
}, Dc = class extends se {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new ce("u16").encode(e.bytecodeWitnessIndex)), t.push(new U().encode(e.salt)), t.push(new S("u64").encode(e.storageSlotsCount)), t.push(new ce("u32").encode(e.policyTypes)), t.push(new ce("u16").encode(e.inputsCount)), t.push(new ce("u16").encode(e.outputsCount)), t.push(new ce("u16").encode(e.witnessesCount)), t.push(
      new gt(new vc(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new Ws().encode(e.policies)), t.push(new gt(new Xs(), e.inputsCount).encode(e.inputs)), t.push(new gt(new qs(), e.outputsCount).encode(e.outputs)), t.push(new gt(new zs(), e.witnessesCount).encode(e.witnesses)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u16").decode(e, r);
    const s = n;
    [n, r] = new U().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new ce("u32").decode(e, r);
    const c = n;
    [n, r] = new ce("u16").decode(e, r);
    const d = n;
    [n, r] = new ce("u16").decode(e, r);
    const h = n;
    [n, r] = new ce("u16").decode(e, r);
    const E = n;
    [n, r] = new gt(new vc(), o.toNumber()).decode(
      e,
      r
    );
    const m = n;
    [n, r] = new Ws().decode(e, r, c);
    const b = n;
    [n, r] = new gt(new Xs(), d).decode(e, r);
    const v = n;
    [n, r] = new gt(new qs(), h).decode(e, r);
    const D = n;
    return [n, r] = new gt(new zs(), E).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: c,
        storageSlotsCount: o,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: E,
        salt: i,
        policies: b,
        storageSlots: m,
        inputs: v,
        outputs: D,
        witnesses: n
      },
      r
    ];
  }
}, Rc = class extends se {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new dr().encode(e.txPointer)), t.push(new Vs().encode(e.inputContract)), t.push(new js().encode(e.outputContract)), t.push(new S("u64").encode(e.mintAmount)), t.push(new U().encode(e.mintAssetId)), t.push(new S("u64").encode(e.gasPrice)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new dr().decode(e, r);
    const s = n;
    [n, r] = new Vs().decode(e, r);
    const i = n;
    [n, r] = new js().decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new U().decode(e, r);
    const d = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: c,
        mintAssetId: d,
        gasPrice: n
      },
      r
    ];
  }
}, bn = class extends se {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new ce("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new _c().encode(e)
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
        t.push(new Rc().encode(e));
        break;
      }
      default:
        throw new x(
          R.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new ce("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new _c().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Dc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Rc().decode(e, r), [n, r];
      default:
        throw new x(
          R.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, Jy = class extends gi {
  constructor() {
    super("UtxoId", {
      transactionId: new U(),
      outputIndex: new ce("u8")
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const dd = BigInt(0), pi = BigInt(1), Lg = BigInt(2);
function On(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function rs(e) {
  if (!On(e))
    throw new Error("Uint8Array expected");
}
const Fg = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function lr(e) {
  rs(e);
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Fg[e[n]];
  return t;
}
function ld(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function ua(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const qt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Sc(e) {
  if (e >= qt._0 && e <= qt._9)
    return e - qt._0;
  if (e >= qt._A && e <= qt._F)
    return e - (qt._A - 10);
  if (e >= qt._a && e <= qt._f)
    return e - (qt._a - 10);
}
function hr(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = Sc(e.charCodeAt(i)), c = Sc(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const d = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function kn(e) {
  return ua(lr(e));
}
function da(e) {
  return rs(e), ua(lr(Uint8Array.from(e).reverse()));
}
function fr(e, t) {
  return hr(e.toString(16).padStart(t * 2, "0"));
}
function la(e, t) {
  return fr(e, t).reverse();
}
function Pg(e) {
  return hr(ld(e));
}
function Tt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = hr(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (On(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(`${e} expected ${n} bytes, got ${s}`);
  return r;
}
function Ur(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    rs(s), t += s.length;
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const i = e[r];
    n.set(i, s), s += i.length;
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
function Ug(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Gg(e) {
  let t;
  for (t = 0; e > dd; e >>= pi, t += 1)
    ;
  return t;
}
function Hg(e, t) {
  return e >> BigInt(t) & pi;
}
function Jg(e, t, n) {
  return e | (n ? pi : dd) << BigInt(t);
}
const ha = (e) => (Lg << BigInt(e - 1)) - pi, ji = (e) => new Uint8Array(e), Nc = (e) => Uint8Array.from(e);
function fd(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = ji(e), s = ji(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...m) => n(s, r, ...m), d = (m = ji()) => {
    s = c(Nc([0]), m), r = c(), m.length !== 0 && (s = c(Nc([1]), m), r = c());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let m = 0;
    const b = [];
    for (; m < t; ) {
      r = c();
      const v = r.slice();
      b.push(v), m += r.length;
    }
    return Ur(...b);
  };
  return (m, b) => {
    o(), d(m);
    let v;
    for (; !(v = b(h())); )
      d();
    return o(), v;
  };
}
const Yg = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || On(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function ss(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = Yg[i];
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
const Zg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: rs,
  bitGet: Hg,
  bitLen: Gg,
  bitMask: ha,
  bitSet: Jg,
  bytesToHex: lr,
  bytesToNumberBE: kn,
  bytesToNumberLE: da,
  concatBytes: Ur,
  createHmacDrbg: fd,
  ensureBytes: Tt,
  equalBytes: hd,
  hexToBytes: hr,
  hexToNumber: ua,
  isBytes: On,
  numberToBytesBE: fr,
  numberToBytesLE: la,
  numberToHexUnpadded: ld,
  numberToVarBytesBE: Pg,
  utf8ToBytes: Ug,
  validateObject: ss
}, Symbol.toStringTag, { value: "Module" }));
var qi = {}, po = { exports: {} };
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
        ], m = ArrayBuffer.isView || function(A) {
          return A && E.indexOf(Object.prototype.toString.call(A)) > -1;
        };
      function b(A) {
        if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
          throw new TypeError('Invalid character in header field name: "' + A + '"');
        return A.toLowerCase();
      }
      function v(A) {
        return typeof A != "string" && (A = String(A)), A;
      }
      function D(A) {
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
      function C(A) {
        this.map = {}, A instanceof C ? A.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(A) ? A.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : A && Object.getOwnPropertyNames(A).forEach(function(l) {
          this.append(l, A[l]);
        }, this);
      }
      C.prototype.append = function(A, l) {
        A = b(A), l = v(l);
        var p = this.map[A];
        this.map[A] = p ? p + ", " + l : l;
      }, C.prototype.delete = function(A) {
        delete this.map[b(A)];
      }, C.prototype.get = function(A) {
        return A = b(A), this.has(A) ? this.map[A] : null;
      }, C.prototype.has = function(A) {
        return this.map.hasOwnProperty(b(A));
      }, C.prototype.set = function(A, l) {
        this.map[b(A)] = v(l);
      }, C.prototype.forEach = function(A, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && A.call(l, this.map[p], p, this);
      }, C.prototype.keys = function() {
        var A = [];
        return this.forEach(function(l, p) {
          A.push(p);
        }), D(A);
      }, C.prototype.values = function() {
        var A = [];
        return this.forEach(function(l) {
          A.push(l);
        }), D(A);
      }, C.prototype.entries = function() {
        var A = [];
        return this.forEach(function(l, p) {
          A.push([p, l]);
        }), D(A);
      }, d.iterable && (C.prototype[Symbol.iterator] = C.prototype.entries);
      function k(A) {
        if (A.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        A.bodyUsed = !0;
      }
      function N(A) {
        return new Promise(function(l, p) {
          A.onload = function() {
            l(A.result);
          }, A.onerror = function() {
            p(A.error);
          };
        });
      }
      function V(A) {
        var l = new FileReader(), p = N(l);
        return l.readAsArrayBuffer(A), p;
      }
      function P(A) {
        var l = new FileReader(), p = N(l);
        return l.readAsText(A), p;
      }
      function j(A) {
        for (var l = new Uint8Array(A), p = new Array(l.length), f = 0; f < l.length; f++)
          p[f] = String.fromCharCode(l[f]);
        return p.join("");
      }
      function O(A) {
        if (A.slice)
          return A.slice(0);
        var l = new Uint8Array(A.byteLength);
        return l.set(new Uint8Array(A)), l.buffer;
      }
      function M() {
        return this.bodyUsed = !1, this._initBody = function(A) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && h(A) ? (this._bodyArrayBuffer = O(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || m(A)) ? this._bodyArrayBuffer = O(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, d.blob && (this.blob = function() {
          var A = k(this);
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
            var A = k(this);
            return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(V);
        }), this.text = function() {
          var A = k(this);
          if (A)
            return A;
          if (this._bodyBlob)
            return P(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(j(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, d.formData && (this.formData = function() {
          return this.text().then(G);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var T = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function F(A) {
        var l = A.toUpperCase();
        return T.indexOf(l) > -1 ? l : A;
      }
      function q(A, l) {
        if (!(this instanceof q))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var p = l.body;
        if (A instanceof q) {
          if (A.bodyUsed)
            throw new TypeError("Already read");
          this.url = A.url, this.credentials = A.credentials, l.headers || (this.headers = new C(A.headers)), this.method = A.method, this.mode = A.mode, this.signal = A.signal, !p && A._bodyInit != null && (p = A._bodyInit, A.bodyUsed = !0);
        } else
          this.url = String(A);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new C(l.headers)), this.method = F(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && p)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(p), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
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
      function G(A) {
        var l = new FormData();
        return A.trim().split("&").forEach(function(p) {
          if (p) {
            var f = p.split("="), I = f.shift().replace(/\+/g, " "), y = f.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(I), decodeURIComponent(y));
          }
        }), l;
      }
      function Y(A) {
        var l = new C(), p = A.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(f) {
          return f.indexOf(`
`) === 0 ? f.substr(1, f.length) : f;
        }).forEach(function(f) {
          var I = f.split(":"), y = I.shift().trim();
          if (y) {
            var g = I.join(":").trim();
            l.append(y, g);
          }
        }), l;
      }
      M.call(q.prototype);
      function z(A, l) {
        if (!(this instanceof z))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new C(l.headers), this.url = l.url || "", this._initBody(A);
      }
      M.call(z.prototype), z.prototype.clone = function() {
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
        o.DOMException = function(l, p) {
          this.message = l, this.name = p;
          var f = Error(l);
          this.stack = f.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(A, l) {
        return new Promise(function(p, f) {
          var I = new q(A, l);
          if (I.signal && I.signal.aborted)
            return f(new o.DOMException("Aborted", "AbortError"));
          var y = new XMLHttpRequest();
          function g() {
            y.abort();
          }
          y.onload = function() {
            var w = {
              status: y.status,
              statusText: y.statusText,
              headers: Y(y.getAllResponseHeaders() || "")
            };
            w.url = "responseURL" in y ? y.responseURL : w.headers.get("X-Request-URL");
            var H = "response" in y ? y.response : y.responseText;
            setTimeout(function() {
              p(new z(H, w));
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
          y.open(I.method, u(I.url), !0), I.credentials === "include" ? y.withCredentials = !0 : I.credentials === "omit" && (y.withCredentials = !1), "responseType" in y && (d.blob ? y.responseType = "blob" : d.arrayBuffer && I.headers.get("Content-Type") && I.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (y.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof C) ? Object.getOwnPropertyNames(l.headers).forEach(function(w) {
            y.setRequestHeader(w, v(l.headers[w]));
          }) : I.headers.forEach(function(w, H) {
            y.setRequestHeader(H, w);
          }), I.signal && (I.signal.addEventListener("abort", g), y.onreadystatechange = function() {
            y.readyState === 4 && I.signal.removeEventListener("abort", g);
          }), y.send(typeof I._bodyInit > "u" ? null : I._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = C, c.Request = q, c.Response = z), o.Headers = C, o.Request = q, o.Response = z, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})(po, po.exports);
var Vg = po.exports;
function Xg(e) {
  return typeof e == "object" && e !== null;
}
function jg(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const qg = /\r\n|[\n\r]/g;
function mo(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(qg)) {
    if (typeof s.index == "number" || jg(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Wg(e) {
  return gd(
    e.source,
    mo(e.source, e.start)
  );
}
function gd(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, d = t.column + c, h = `${e.name}:${o}:${d}
`, E = r.split(/\r\n|[\n\r]/g), m = E[s];
  if (m.length > 120) {
    const b = Math.floor(d / 80), v = d % 80, D = [];
    for (let C = 0; C < m.length; C += 80)
      D.push(m.slice(C, C + 80));
    return h + kc([
      [`${o} |`, D[0]],
      ...D.slice(1, b + 1).map((C) => ["|", C]),
      ["|", "^".padStart(v)],
      ["|", D[b + 1]]
    ]);
  }
  return h + kc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, E[s - 1]],
    [`${o} |`, m],
    ["|", "^".padStart(d)],
    [`${o + 1} |`, E[s + 1]]
  ]);
}
function kc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function $g(e) {
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
class fa extends Error {
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
    const { nodes: o, source: c, positions: d, path: h, originalError: E, extensions: m } = $g(n);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = E ?? void 0, this.nodes = Mc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const b = Mc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((D) => D.loc).filter((D) => D != null)
    );
    this.source = c ?? (b == null || (s = b[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (b == null ? void 0 : b.map((D) => D.start)), this.locations = d && c ? d.map((D) => mo(c, D)) : b == null ? void 0 : b.map((D) => mo(D.source, D.start));
    const v = Xg(
      E == null ? void 0 : E.extensions
    ) ? E == null ? void 0 : E.extensions : void 0;
    this.extensions = (i = m ?? v) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, fa) : Object.defineProperty(this, "stack", {
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

` + Wg(n.loc));
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
function Mc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function pt(e, t, n) {
  return new fa(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class zg {
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
}, Kg = new Set(Object.keys(md));
function Oc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Kg.has(t);
}
var Yn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(Yn || (Yn = {}));
var wo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(wo || (wo = {}));
var ae;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(ae || (ae = {}));
function Eo(e) {
  return e === 9 || e === 32;
}
function Gr(e) {
  return e >= 48 && e <= 57;
}
function wd(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Ed(e) {
  return wd(e) || e === 95;
}
function ep(e) {
  return wd(e) || Gr(e) || e === 95;
}
function tp(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], d = np(c);
    d !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && d < n && (n = d));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function np(e) {
  let t = 0;
  for (; t < e.length && Eo(e.charCodeAt(t)); )
    ++t;
  return t;
}
function rp(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((v) => v.length === 0 || Eo(v.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, d = e.endsWith("\\"), h = c || d, E = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || h || i || o);
  let m = "";
  const b = s && Eo(e.charCodeAt(0));
  return (E && !b || i) && (m += `
`), m += n, (E || h) && (m += `
`), '"""' + m + '"""';
}
var L;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(L || (L = {}));
class sp {
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
          const n = op(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === L.COMMENT);
    return t;
  }
}
function ip(e) {
  return e === L.BANG || e === L.DOLLAR || e === L.AMP || e === L.PAREN_L || e === L.PAREN_R || e === L.SPREAD || e === L.COLON || e === L.EQUALS || e === L.AT || e === L.BRACKET_L || e === L.BRACKET_R || e === L.BRACE_L || e === L.PIPE || e === L.BRACE_R;
}
function yr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function mi(e, t) {
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
function ht(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new pd(t, n, r, i, o, s);
}
function op(e, t) {
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
        return ap(e, s);
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
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? hp(e, s) : Ap(e, s);
    }
    if (Gr(i) || i === 45)
      return cp(e, s, i);
    if (Ed(i))
      return fp(e, s);
    throw pt(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : yr(i) || mi(n, s) ? `Unexpected character: ${Tn(e, s)}.` : `Invalid character: ${Tn(e, s)}.`
    );
  }
  return ht(e, L.EOF, r, r);
}
function ap(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (yr(i))
      ++s;
    else if (mi(n, s))
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
function cp(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), Gr(i))
      throw pt(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${Tn(
          e,
          s
        )}.`
      );
  } else
    s = Wi(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = Wi(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = Wi(e, s, i), i = r.charCodeAt(s)), i === 46 || Ed(i))
    throw pt(
      e.source,
      s,
      `Invalid number, expected digit but got: ${Tn(
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
function Wi(e, t, n) {
  if (!Gr(n))
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
  for (; Gr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function Ap(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ht(e, L.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const d = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? up(e, s) : dp(e, s) : lp(e, s);
      o += d.value, s += d.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (yr(c))
      ++s;
    else if (mi(n, s))
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
function up(e, t) {
  const n = e.source.body;
  let r = 0, s = 3;
  for (; s < 12; ) {
    const i = n.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !yr(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: s
      };
    }
    if (r = r << 4 | Rr(i), r < 0)
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
function dp(e, t) {
  const n = e.source.body, r = Tc(n, t + 2);
  if (yr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Id(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = Tc(n, t + 8);
    if (yd(s))
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
function Tc(e, t) {
  return Rr(e.charCodeAt(t)) << 12 | Rr(e.charCodeAt(t + 1)) << 8 | Rr(e.charCodeAt(t + 2)) << 4 | Rr(e.charCodeAt(t + 3));
}
function Rr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function lp(e, t) {
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
function hp(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const d = [];
  for (; i < r; ) {
    const h = n.charCodeAt(i);
    if (h === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), d.push(c);
      const E = ht(
        e,
        L.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        tp(d).join(`
`)
      );
      return e.line += d.length - 1, e.lineStart = s, E;
    }
    if (h === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      c += n.slice(o, i), d.push(c), h === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (yr(h))
      ++i;
    else if (mi(n, i))
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
function fp(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (ep(i))
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
function Ss(e, t) {
  if (!!!e)
    throw new Error(t);
}
const gp = 10, Bd = 2;
function ga(e) {
  return wi(e, []);
}
function wi(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return pp(e, t);
    default:
      return String(e);
  }
}
function pp(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (mp(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : wi(r, n);
  } else if (Array.isArray(e))
    return Ep(e, n);
  return wp(e, n);
}
function mp(e) {
  return typeof e.toJSON == "function";
}
function wp(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > Bd ? "[" + Ip(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + wi(i, t)
  ).join(", ") + " }";
}
function Ep(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Bd)
    return "[Array]";
  const n = Math.min(gp, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(wi(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Ip(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const yp = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  globalThis.process && globalThis.process.env.NODE_ENV === "production" ? function(t, n) {
    return t instanceof n;
  } : function(t, n) {
    if (t instanceof n)
      return !0;
    if (typeof t == "object" && t !== null) {
      var r;
      const s = n.prototype[Symbol.toStringTag], i = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (r = t.constructor) === null || r === void 0 ? void 0 : r.name
      );
      if (s === i) {
        const o = ga(t);
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
class Cd {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Ss(!1, `Body must be a string. Received: ${ga(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Ss(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Ss(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Bp(e) {
  return yp(e, Cd);
}
function bd(e, t) {
  return new is(e, t).parseDocument();
}
function Cp(e, t) {
  const n = new is(e, t);
  n.expectToken(L.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(L.EOF), r;
}
function bp(e, t) {
  const n = new is(e, t);
  n.expectToken(L.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(L.EOF), r;
}
function Qp(e, t) {
  const n = new is(e, t);
  n.expectToken(L.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(L.EOF), r;
}
class is {
  constructor(t, n = {}) {
    const r = Bp(t) ? t : new Cd(t);
    this._lexer = new sp(r), this._options = n, this._tokenCounter = 0;
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
        `${ms(
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
    if (Object.prototype.hasOwnProperty.call(wo, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new zg(
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
      `Expected ${Qd(t)}, found ${ms(n)}.`
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
        `Expected "${t}", found ${ms(n)}.`
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
      `Unexpected ${ms(n)}.`
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
function ms(e) {
  const t = e.value;
  return Qd(e.kind) + (t != null ? ` "${t}"` : "");
}
function Qd(e) {
  return ip(e) ? `"${e}"` : e;
}
const xp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: is,
  parse: bd,
  parseConstValue: bp,
  parseType: Qp,
  parseValue: Cp
}, Symbol.toStringTag, { value: "Module" })), vp = /* @__PURE__ */ Oo(xp);
function _p(e) {
  return `"${e.replace(Dp, Rp)}"`;
}
const Dp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Rp(e) {
  return Sp[e.charCodeAt(0)];
}
const Sp = [
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
], Np = Object.freeze({});
function kp(e, t, n = md) {
  const r = /* @__PURE__ */ new Map();
  for (const N of Object.values(ae))
    r.set(N, Mp(t, N));
  let s, i = Array.isArray(e), o = [e], c = -1, d = [], h = e, E, m;
  const b = [], v = [];
  do {
    c++;
    const N = c === o.length, V = N && d.length !== 0;
    if (N) {
      if (E = v.length === 0 ? void 0 : b[b.length - 1], h = m, m = v.pop(), V)
        if (i) {
          h = h.slice();
          let j = 0;
          for (const [O, M] of d) {
            const T = O - j;
            M === null ? (h.splice(T, 1), j++) : h[T] = M;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [j, O] of d)
            h[j] = O;
        }
      c = s.index, o = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (m) {
      if (E = i ? c : o[c], h = m[E], h == null)
        continue;
      b.push(E);
    }
    let P;
    if (!Array.isArray(h)) {
      var D, C;
      Oc(h) || Ss(!1, `Invalid AST Node: ${ga(h)}.`);
      const j = N ? (D = r.get(h.kind)) === null || D === void 0 ? void 0 : D.leave : (C = r.get(h.kind)) === null || C === void 0 ? void 0 : C.enter;
      if (P = j == null ? void 0 : j.call(t, h, E, m, b, v), P === Np)
        break;
      if (P === !1) {
        if (!N) {
          b.pop();
          continue;
        }
      } else if (P !== void 0 && (d.push([E, P]), !N))
        if (Oc(P))
          h = P;
        else {
          b.pop();
          continue;
        }
    }
    if (P === void 0 && V && d.push([E, h]), N)
      b.pop();
    else {
      var k;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: d,
        prev: s
      }, i = Array.isArray(h), o = i ? h : (k = n[h.kind]) !== null && k !== void 0 ? k : [], c = -1, d = [], m && v.push(m), m = h;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : e;
}
function Mp(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function xd(e) {
  return kp(e, Tp);
}
const Op = 80, Tp = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => K(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = pe("(", K(e.variableDefinitions, ", "), ")"), n = K(
        [
          e.operation,
          K([e.name, t]),
          K(e.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + pe(" = ", n) + pe(" ", K(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => Mt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", K(n, ", "), ")");
      return o.length > Op && (o = i + pe(`(
`, Ns(K(n, `
`)), `
)`)), K([o, K(r, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + pe(" ", K(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => K(
      [
        "...",
        pe("on ", e),
        K(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${e}${pe("(", K(n, ", "), ")")} on ${t} ${pe("", K(r, " "), " ")}` + s
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
    leave: ({ value: e, block: t }) => t ? rp(e) : _p(e)
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
    leave: ({ values: e }) => "[" + K(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + K(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + pe("(", K(t, ", "), ")")
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
`) + K(["schema", K(t, " "), Mt(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + K(["scalar", t, K(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + K(
      [
        "type",
        t,
        pe("implements ", K(n, " & ")),
        K(r, " "),
        Mt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (Lc(n) ? pe(`(
`, Ns(K(n, `
`)), `
)`) : pe("(", K(n, ", "), ")")) + ": " + r + pe(" ", K(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: s }) => pe("", e, `
`) + K(
      [t + ": " + n, pe("= ", r), K(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: s }) => pe("", e, `
`) + K(
      [
        "interface",
        t,
        pe("implements ", K(n, " & ")),
        K(r, " "),
        Mt(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => pe("", e, `
`) + K(
      ["union", t, K(n, " "), pe("= ", K(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => pe("", e, `
`) + K(["enum", t, K(n, " "), Mt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + K([t, K(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + K(["input", t, K(n, " "), Mt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (Lc(n) ? pe(`(
`, Ns(K(n, `
`)), `
)`) : pe("(", K(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + K(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => K(
      ["extend schema", K(e, " "), Mt(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => K(["extend scalar", e, K(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => K(
      [
        "extend type",
        e,
        pe("implements ", K(t, " & ")),
        K(n, " "),
        Mt(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => K(
      [
        "extend interface",
        e,
        pe("implements ", K(t, " & ")),
        K(n, " "),
        Mt(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) => K(
      [
        "extend union",
        e,
        K(t, " "),
        pe("= ", K(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => K(["extend enum", e, K(t, " "), Mt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => K(["extend input", e, K(t, " "), Mt(n)], " ")
  }
};
function K(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Mt(e) {
  return pe(`{
`, Ns(K(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function Ns(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function Lc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Lp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: xd
}, Symbol.toStringTag, { value: "Module" })), Fp = /* @__PURE__ */ Oo(Lp);
var pa = {}, Ei = {}, vd = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Pp = vd, _d = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Pp;
}, Up = _d, Gp = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = Up);
  var s, i = /* @__PURE__ */ new Map();
  function o(E, m) {
    var b = i.get(m);
    b ? b.push.apply(b, E) : i.set(m, E);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(E, m) {
        return o(["" + c + m], E), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(E, m) {
        var b = e(E, "" + c + m, r);
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
Ei.ReactNativeFile = vd;
Ei.extractFiles = Gp;
Ei.isExtractableFile = _d;
var Hp = typeof self == "object" ? self.FormData : window.FormData, os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
os.defaultJsonSerializer = void 0;
os.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Jp = be && be.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(pa, "__esModule", { value: !0 });
var Dd = Ei, Yp = Jp(Hp), Zp = os, Vp = function(e) {
  return Dd.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function Xp(e, t, n, r) {
  r === void 0 && (r = Zp.defaultJsonSerializer);
  var s = Dd.extractFiles({ query: e, variables: t, operationName: n }, "", Vp), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(b, v, D) {
      return b.push({ query: v, variables: t ? t[D] : void 0 }), b;
    }, []);
    return r.stringify(c);
  }
  var d = typeof FormData > "u" ? Yp.default : FormData, h = new d();
  h.append("operations", r.stringify(i));
  var E = {}, m = 0;
  return o.forEach(function(b) {
    E[++m] = b;
  }), h.append("map", r.stringify(E)), m = 0, o.forEach(function(b, v) {
    h.append("" + ++m, v);
  }), h;
}
pa.default = Xp;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.parseBatchRequestsExtendedArgs = Qt.parseRawRequestExtendedArgs = Qt.parseRequestExtendedArgs = Qt.parseBatchRequestArgs = Qt.parseRawRequestArgs = Qt.parseRequestArgs = void 0;
function jp(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Qt.parseRequestArgs = jp;
function qp(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Qt.parseRawRequestArgs = qp;
function Wp(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Qt.parseBatchRequestArgs = Wp;
function $p(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Qt.parseRequestExtendedArgs = $p;
function zp(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Qt.parseRawRequestExtendedArgs = zp;
function Kp(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Qt.parseBatchRequestsExtendedArgs = Kp;
var as = {}, em = be && be.__extends || function() {
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
Object.defineProperty(as, "__esModule", { value: !0 });
as.ClientError = void 0;
var tm = (
  /** @class */
  function(e) {
    em(t, e);
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
as.ClientError = tm;
var Qr = {}, Fc;
function nm() {
  if (Fc)
    return Qr;
  Fc = 1;
  var e = be && be.__assign || function() {
    return e = Object.assign || function(O) {
      for (var M, T = 1, F = arguments.length; T < F; T++) {
        M = arguments[T];
        for (var q in M)
          Object.prototype.hasOwnProperty.call(M, q) && (O[q] = M[q]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = be && be.__awaiter || function(O, M, T, F) {
    function q(G) {
      return G instanceof T ? G : new T(function(Y) {
        Y(G);
      });
    }
    return new (T || (T = Promise))(function(G, Y) {
      function z(A) {
        try {
          a(F.next(A));
        } catch (l) {
          Y(l);
        }
      }
      function B(A) {
        try {
          a(F.throw(A));
        } catch (l) {
          Y(l);
        }
      }
      function a(A) {
        A.done ? G(A.value) : q(A.value).then(z, B);
      }
      a((F = F.apply(O, M || [])).next());
    });
  }, n = be && be.__generator || function(O, M) {
    var T = { label: 0, sent: function() {
      if (G[0] & 1)
        throw G[1];
      return G[1];
    }, trys: [], ops: [] }, F, q, G, Y;
    return Y = { next: z(0), throw: z(1), return: z(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
      return this;
    }), Y;
    function z(a) {
      return function(A) {
        return B([a, A]);
      };
    }
    function B(a) {
      if (F)
        throw new TypeError("Generator is already executing.");
      for (; T; )
        try {
          if (F = 1, q && (G = a[0] & 2 ? q.return : a[0] ? q.throw || ((G = q.return) && G.call(q), 0) : q.next) && !(G = G.call(q, a[1])).done)
            return G;
          switch (q = 0, G && (a = [a[0] & 2, G.value]), a[0]) {
            case 0:
            case 1:
              G = a;
              break;
            case 4:
              return T.label++, { value: a[1], done: !1 };
            case 5:
              T.label++, q = a[1], a = [0];
              continue;
            case 7:
              a = T.ops.pop(), T.trys.pop();
              continue;
            default:
              if (G = T.trys, !(G = G.length > 0 && G[G.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                T = 0;
                continue;
              }
              if (a[0] === 3 && (!G || a[1] > G[0] && a[1] < G[3])) {
                T.label = a[1];
                break;
              }
              if (a[0] === 6 && T.label < G[1]) {
                T.label = G[1], G = a;
                break;
              }
              if (G && T.label < G[2]) {
                T.label = G[2], T.ops.push(a);
                break;
              }
              G[2] && T.ops.pop(), T.trys.pop();
              continue;
          }
          a = M.call(O, T);
        } catch (A) {
          a = [6, A], q = 0;
        } finally {
          F = G = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Qr, "__esModule", { value: !0 }), Qr.GraphQLWebSocketClient = void 0;
  var r = as, s = Rd(), i = "connection_init", o = "connection_ack", c = "ping", d = "pong", h = "subscribe", E = "next", m = "error", b = "complete", v = (
    /** @class */
    function() {
      function O(M, T, F) {
        this._type = M, this._payload = T, this._id = F;
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
          var M = { type: this.type };
          return this.id != null && this.id != null && (M.id = this.id), this.payload != null && this.payload != null && (M.payload = this.payload), JSON.stringify(M);
        },
        enumerable: !1,
        configurable: !0
      }), O.parse = function(M, T) {
        var F = JSON.parse(M), q = F.type, G = F.payload, Y = F.id;
        return new O(q, T(G), Y);
      }, O;
    }()
  ), D = (
    /** @class */
    function() {
      function O(M, T) {
        var F = this, q = T.onInit, G = T.onAcknowledged, Y = T.onPing, z = T.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = M, M.onopen = function(B) {
          return t(F, void 0, void 0, function() {
            var a, A, l, p;
            return n(this, function(f) {
              switch (f.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, A = (a = M).send, l = k, q ? [4, q()] : [3, 2];
                case 1:
                  return p = f.sent(), [3, 3];
                case 2:
                  p = null, f.label = 3;
                case 3:
                  return A.apply(a, [l.apply(void 0, [p]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, M.onclose = function(B) {
          F.socketState.acknowledged = !1, F.socketState.subscriptions = {};
        }, M.onerror = function(B) {
          console.error(B);
        }, M.onmessage = function(B) {
          try {
            var a = C(B.data);
            switch (a.type) {
              case o: {
                F.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (F.socketState.acknowledged = !0, G && G(a.payload));
                return;
              }
              case c: {
                Y ? Y(a.payload).then(function(I) {
                  return M.send(V(I).text);
                }) : M.send(V(null).text);
                return;
              }
              case d: {
                z && z(a.payload);
                return;
              }
            }
            if (!F.socketState.acknowledged || a.id === void 0 || a.id === null || !F.socketState.subscriptions[a.id])
              return;
            var A = F.socketState.subscriptions[a.id], l = A.query, p = A.variables, f = A.subscriber;
            switch (a.type) {
              case E: {
                !a.payload.errors && a.payload.data && f.next && f.next(a.payload.data), a.payload.errors && f.error && f.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case m: {
                f.error && f.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case b: {
                f.complete && f.complete(), delete F.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (I) {
            console.error(I), M.close(1006);
          }
          M.close(4400, "Unknown graphql-ws message.");
        };
      }
      return O.prototype.makeSubscribe = function(M, T, F, q) {
        var G = this, Y = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[Y] = { query: M, variables: F, subscriber: q }, this.socket.send(P(Y, { query: M, operationName: T, variables: F }).text), function() {
          G.socket.send(j(Y).text), delete G.socketState.subscriptions[Y];
        };
      }, O.prototype.rawRequest = function(M, T) {
        var F = this;
        return new Promise(function(q, G) {
          var Y;
          F.rawSubscribe(M, {
            next: function(z, B) {
              return Y = { data: z, extensions: B };
            },
            error: G,
            complete: function() {
              return q(Y);
            }
          }, T);
        });
      }, O.prototype.request = function(M, T) {
        var F = this;
        return new Promise(function(q, G) {
          var Y;
          F.subscribe(M, {
            next: function(z) {
              return Y = z;
            },
            error: G,
            complete: function() {
              return q(Y);
            }
          }, T);
        });
      }, O.prototype.subscribe = function(M, T, F) {
        var q = s.resolveRequestDocument(M), G = q.query, Y = q.operationName;
        return this.makeSubscribe(G, Y, F, T);
      }, O.prototype.rawSubscribe = function(M, T, F) {
        return this.makeSubscribe(M, void 0, F, T);
      }, O.prototype.ping = function(M) {
        this.socket.send(N(M).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  Qr.GraphQLWebSocketClient = D;
  function C(O, M) {
    M === void 0 && (M = function(F) {
      return F;
    });
    var T = v.parse(O, M);
    return T;
  }
  function k(O) {
    return new v(i, O);
  }
  function N(O) {
    return new v(c, O, void 0);
  }
  function V(O) {
    return new v(d, O, void 0);
  }
  function P(O, M) {
    return new v(h, M, O);
  }
  function j(O) {
    return new v(b, void 0, O);
  }
  return Qr;
}
var Pc;
function Rd() {
  return Pc || (Pc = 1, function(e) {
    var t = be && be.__assign || function() {
      return t = Object.assign || function(f) {
        for (var I, y = 1, g = arguments.length; y < g; y++) {
          I = arguments[y];
          for (var u in I)
            Object.prototype.hasOwnProperty.call(I, u) && (f[u] = I[u]);
        }
        return f;
      }, t.apply(this, arguments);
    }, n = be && be.__createBinding || (Object.create ? function(f, I, y, g) {
      g === void 0 && (g = y), Object.defineProperty(f, g, { enumerable: !0, get: function() {
        return I[y];
      } });
    } : function(f, I, y, g) {
      g === void 0 && (g = y), f[g] = I[y];
    }), r = be && be.__setModuleDefault || (Object.create ? function(f, I) {
      Object.defineProperty(f, "default", { enumerable: !0, value: I });
    } : function(f, I) {
      f.default = I;
    }), s = be && be.__importStar || function(f) {
      if (f && f.__esModule)
        return f;
      var I = {};
      if (f != null)
        for (var y in f)
          y !== "default" && Object.prototype.hasOwnProperty.call(f, y) && n(I, f, y);
      return r(I, f), I;
    }, i = be && be.__awaiter || function(f, I, y, g) {
      function u(w) {
        return w instanceof y ? w : new y(function(H) {
          H(w);
        });
      }
      return new (y || (y = Promise))(function(w, H) {
        function X(te) {
          try {
            W(g.next(te));
          } catch (ne) {
            H(ne);
          }
        }
        function $(te) {
          try {
            W(g.throw(te));
          } catch (ne) {
            H(ne);
          }
        }
        function W(te) {
          te.done ? w(te.value) : u(te.value).then(X, $);
        }
        W((g = g.apply(f, I || [])).next());
      });
    }, o = be && be.__generator || function(f, I) {
      var y = { label: 0, sent: function() {
        if (w[0] & 1)
          throw w[1];
        return w[1];
      }, trys: [], ops: [] }, g, u, w, H;
      return H = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (H[Symbol.iterator] = function() {
        return this;
      }), H;
      function X(W) {
        return function(te) {
          return $([W, te]);
        };
      }
      function $(W) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; y; )
          try {
            if (g = 1, u && (w = W[0] & 2 ? u.return : W[0] ? u.throw || ((w = u.return) && w.call(u), 0) : u.next) && !(w = w.call(u, W[1])).done)
              return w;
            switch (u = 0, w && (W = [W[0] & 2, w.value]), W[0]) {
              case 0:
              case 1:
                w = W;
                break;
              case 4:
                return y.label++, { value: W[1], done: !1 };
              case 5:
                y.label++, u = W[1], W = [0];
                continue;
              case 7:
                W = y.ops.pop(), y.trys.pop();
                continue;
              default:
                if (w = y.trys, !(w = w.length > 0 && w[w.length - 1]) && (W[0] === 6 || W[0] === 2)) {
                  y = 0;
                  continue;
                }
                if (W[0] === 3 && (!w || W[1] > w[0] && W[1] < w[3])) {
                  y.label = W[1];
                  break;
                }
                if (W[0] === 6 && y.label < w[1]) {
                  y.label = w[1], w = W;
                  break;
                }
                if (w && y.label < w[2]) {
                  y.label = w[2], y.ops.push(W);
                  break;
                }
                w[2] && y.ops.pop(), y.trys.pop();
                continue;
            }
            W = I.call(f, y);
          } catch (te) {
            W = [6, te], u = 0;
          } finally {
            g = w = 0;
          }
        if (W[0] & 5)
          throw W[1];
        return { value: W[0] ? W[1] : void 0, done: !0 };
      }
    }, c = be && be.__rest || function(f, I) {
      var y = {};
      for (var g in f)
        Object.prototype.hasOwnProperty.call(f, g) && I.indexOf(g) < 0 && (y[g] = f[g]);
      if (f != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(f); u < g.length; u++)
          I.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(f, g[u]) && (y[g[u]] = f[g[u]]);
      return y;
    }, d = be && be.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var h = s(Vg), E = h, m = vp, b = Fp, v = d(pa), D = os, C = Qt, k = as;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return k.ClientError;
    } });
    var N = function(f) {
      var I = {};
      return f && (typeof Headers < "u" && f instanceof Headers || E && E.Headers && f instanceof E.Headers ? I = l(f) : Array.isArray(f) ? f.forEach(function(y) {
        var g = y[0], u = y[1];
        I[g] = u;
      }) : I = f), I;
    }, V = function(f) {
      return f.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, P = function(f) {
      var I = f.query, y = f.variables, g = f.operationName, u = f.jsonSerializer;
      if (!Array.isArray(I)) {
        var w = ["query=" + encodeURIComponent(V(I))];
        return y && w.push("variables=" + encodeURIComponent(u.stringify(y))), g && w.push("operationName=" + encodeURIComponent(g)), w.join("&");
      }
      if (typeof y < "u" && !Array.isArray(y))
        throw new Error("Cannot create query with given variable type, array expected");
      var H = I.reduce(function(X, $, W) {
        return X.push({
          query: V($),
          variables: y ? u.stringify(y[W]) : void 0
        }), X;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(H));
    }, j = function(f) {
      var I = f.url, y = f.query, g = f.variables, u = f.operationName, w = f.headers, H = f.fetch, X = f.fetchOptions, $ = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var W, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return W = v.default(y, g, u, X.jsonSerializer), te = t({ method: "POST", headers: t(t({}, typeof W == "string" ? { "Content-Type": "application/json" } : {}), w), body: W }, X), $ ? [4, Promise.resolve($(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, H(I, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, O = function(f) {
      var I = f.url, y = f.query, g = f.variables, u = f.operationName, w = f.headers, H = f.fetch, X = f.fetchOptions, $ = f.middleware;
      return i(void 0, void 0, void 0, function() {
        var W, te;
        return o(this, function(ne) {
          switch (ne.label) {
            case 0:
              return W = P({
                query: y,
                variables: g,
                operationName: u,
                jsonSerializer: X.jsonSerializer
              }), te = t({ method: "GET", headers: w }, X), $ ? [4, Promise.resolve($(te))] : [3, 2];
            case 1:
              te = ne.sent(), ne.label = 2;
            case 2:
              return [4, H(I + "?" + W, te)];
            case 3:
              return [2, ne.sent()];
          }
        });
      });
    }, M = (
      /** @class */
      function() {
        function f(I, y) {
          y === void 0 && (y = {}), this.url = I, this.options = y;
        }
        return f.prototype.rawRequest = function(I, y, g) {
          return i(this, void 0, void 0, function() {
            var u, w, H, X, $, W, te, ne, Se, fe, oe, ve;
            return o(this, function(de) {
              return u = C.parseRawRequestArgs(I, y, g), w = this.options, H = w.headers, X = w.fetch, $ = X === void 0 ? h.default : X, W = w.method, te = W === void 0 ? "POST" : W, ne = w.requestMiddleware, Se = w.responseMiddleware, fe = c(w, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), oe = this.url, u.signal !== void 0 && (fe.signal = u.signal), ve = B(u.query).operationName, [2, T({
                url: oe,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, N(a(H))), N(u.requestHeaders)),
                operationName: ve,
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
        }, f.prototype.request = function(I) {
          for (var y = [], g = 1; g < arguments.length; g++)
            y[g - 1] = arguments[g];
          var u = y[0], w = y[1], H = C.parseRequestArgs(I, u, w), X = this.options, $ = X.headers, W = X.fetch, te = W === void 0 ? h.default : W, ne = X.method, Se = ne === void 0 ? "POST" : ne, fe = X.requestMiddleware, oe = X.responseMiddleware, ve = c(X, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), de = this.url;
          H.signal !== void 0 && (ve.signal = H.signal);
          var ge = B(H.document), Ht = ge.query, _e = ge.operationName;
          return T({
            url: de,
            query: Ht,
            variables: H.variables,
            headers: t(t({}, N(a($))), N(H.requestHeaders)),
            operationName: _e,
            fetch: te,
            method: Se,
            fetchOptions: ve,
            middleware: fe
          }).then(function(ye) {
            return oe && oe(ye), ye.data;
          }).catch(function(ye) {
            throw oe && oe(ye), ye;
          });
        }, f.prototype.batchRequests = function(I, y) {
          var g = C.parseBatchRequestArgs(I, y), u = this.options, w = u.headers, H = u.fetch, X = H === void 0 ? h.default : H, $ = u.method, W = $ === void 0 ? "POST" : $, te = u.requestMiddleware, ne = u.responseMiddleware, Se = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), fe = this.url;
          g.signal !== void 0 && (Se.signal = g.signal);
          var oe = g.documents.map(function(de) {
            var ge = de.document;
            return B(ge).query;
          }), ve = g.documents.map(function(de) {
            var ge = de.variables;
            return ge;
          });
          return T({
            url: fe,
            query: oe,
            variables: ve,
            headers: t(t({}, N(a(w))), N(g.requestHeaders)),
            operationName: void 0,
            fetch: X,
            method: W,
            fetchOptions: Se,
            middleware: te
          }).then(function(de) {
            return ne && ne(de), de.data;
          }).catch(function(de) {
            throw ne && ne(de), de;
          });
        }, f.prototype.setHeaders = function(I) {
          return this.options.headers = I, this;
        }, f.prototype.setHeader = function(I, y) {
          var g, u = this.options.headers;
          return u ? u[I] = y : this.options.headers = (g = {}, g[I] = y, g), this;
        }, f.prototype.setEndpoint = function(I) {
          return this.url = I, this;
        }, f;
      }()
    );
    e.GraphQLClient = M;
    function T(f) {
      var I = f.url, y = f.query, g = f.variables, u = f.headers, w = f.operationName, H = f.fetch, X = f.method, $ = X === void 0 ? "POST" : X, W = f.fetchOptions, te = f.middleware;
      return i(this, void 0, void 0, function() {
        var ne, Se, fe, oe, ve, de, ge, Ht, _e, ye, Br;
        return o(this, function(Ne) {
          switch (Ne.label) {
            case 0:
              return ne = $.toUpperCase() === "POST" ? j : O, Se = Array.isArray(y), [4, ne({
                url: I,
                query: y,
                variables: g,
                operationName: w,
                headers: u,
                fetch: H,
                fetchOptions: W,
                middleware: te
              })];
            case 1:
              return fe = Ne.sent(), [4, Y(fe, W.jsonSerializer)];
            case 2:
              if (oe = Ne.sent(), ve = Se && Array.isArray(oe) ? !oe.some(function(Oe) {
                var us = Oe.data;
                return !us;
              }) : !!oe.data, de = !oe.errors || W.errorPolicy === "all" || W.errorPolicy === "ignore", fe.ok && de && ve)
                return ge = fe.headers, Ht = fe.status, oe.errors, _e = c(oe, ["errors"]), ye = W.errorPolicy === "ignore" ? _e : oe, [2, t(t({}, Se ? { data: ye } : ye), { headers: ge, status: Ht })];
              throw Br = typeof oe == "string" ? { error: oe } : oe, new k.ClientError(t(t({}, Br), { status: fe.status, headers: fe.headers }), { query: y, variables: g });
          }
        });
      });
    }
    function F(f, I, y, g) {
      return i(this, void 0, void 0, function() {
        var u, w;
        return o(this, function(H) {
          return u = C.parseRawRequestExtendedArgs(f, I, y, g), w = new M(u.url), [2, w.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = F;
    function q(f, I) {
      for (var y = [], g = 2; g < arguments.length; g++)
        y[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, w, H, X;
        return o(this, function($) {
          return u = y[0], w = y[1], H = C.parseRequestExtendedArgs(f, I, u, w), X = new M(H.url), [2, X.request(t({}, H))];
        });
      });
    }
    e.request = q;
    function G(f, I, y) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(w) {
          return g = C.parseBatchRequestsExtendedArgs(f, I, y), u = new M(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = G, e.default = q;
    function Y(f, I) {
      return I === void 0 && (I = D.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var y, g, u;
        return o(this, function(w) {
          switch (w.label) {
            case 0:
              return f.headers.forEach(function(H, X) {
                X.toLowerCase() === "content-type" && (y = H);
              }), y && y.toLowerCase().startsWith("application/json") ? (u = (g = I).parse, [4, f.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [w.sent()])];
            case 2:
              return [2, f.text()];
          }
        });
      });
    }
    function z(f) {
      var I, y = void 0, g = f.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (y = (I = g[0].name) === null || I === void 0 ? void 0 : I.value), y;
    }
    function B(f) {
      if (typeof f == "string") {
        var I = void 0;
        try {
          var y = m.parse(f);
          I = z(y);
        } catch {
        }
        return { query: f, operationName: I };
      }
      var g = z(f);
      return { query: b.print(f), operationName: g };
    }
    e.resolveRequestDocument = B;
    function a(f) {
      return typeof f == "function" ? f() : f;
    }
    function A(f) {
      for (var I = [], y = 1; y < arguments.length; y++)
        I[y - 1] = arguments[y];
      return f.reduce(function(g, u, w) {
        return "" + g + u + (w in I ? I[w] : "");
      }, "");
    }
    e.gql = A;
    function l(f) {
      var I = {};
      return f.forEach(function(y, g) {
        I[g] = y;
      }), I;
    }
    var p = nm();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(qi)), qi;
}
var rm = Rd(), Ks = function() {
  return Ks = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Ks.apply(this, arguments);
};
var ks = /* @__PURE__ */ new Map(), Io = /* @__PURE__ */ new Map(), Sd = !0, ei = !1;
function Nd(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function sm(e) {
  return Nd(e.source.body.substring(e.start, e.end));
}
function im(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = sm(r.loc), o = Io.get(s);
      o && !o.has(i) ? Sd && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Io.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), Ks(Ks({}, e), { definitions: n });
}
function om(e) {
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
function am(e) {
  var t = Nd(e);
  if (!ks.has(t)) {
    var n = bd(e, {
      experimentalFragmentVariables: ei,
      allowLegacyFragmentVariables: ei
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    ks.set(t, om(im(n)));
  }
  return ks.get(t);
}
function gr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), am(r);
}
function cm() {
  ks.clear(), Io.clear();
}
function Am() {
  Sd = !1;
}
function um() {
  ei = !0;
}
function dm() {
  ei = !1;
}
var xr = {
  gql: gr,
  resetCaches: cm,
  disableFragmentWarnings: Am,
  enableExperimentalFragmentVariables: um,
  disableExperimentalFragmentVariables: dm
};
(function(e) {
  e.gql = xr.gql, e.resetCaches = xr.resetCaches, e.disableFragmentWarnings = xr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = xr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = xr.disableExperimentalFragmentVariables;
})(gr || (gr = {}));
gr.default = gr;
const ie = gr;
var Re = "0x0000000000000000000000000000000000000000000000000000000000000000", Yy = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Zy = 16 * 1024, Vy = 16, Xy = 1024 * 1024 * 1024, jy = 1024 * 1024 * 1024, qy = 255, Wy = 1024 * 1024, $y = 1024 * 1024, lm = "0xffffffffffff0000", kd = "0xffffffffffff0001", hm = "0xffffffffffff0003", fm = "0xffffffffffff0004", gm = "0xffffffffffff0005", zy = "0x0", pm = [
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
], mm = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let le;
const Md = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Md.decode();
let Sr = null;
function Od() {
  return (Sr === null || Sr.byteLength === 0) && (Sr = new Uint8Array(le.memory.buffer)), Sr;
}
function wm(e, t) {
  return e = e >>> 0, Md.decode(Od().subarray(e, e + t));
}
function Td(e) {
  const t = le.ret(e);
  return kt.__wrap(t);
}
function Em(e, t) {
  const n = le.retd(e, t);
  return kt.__wrap(n);
}
function Uc(e, t, n, r) {
  const s = le.call(e, t, n, r);
  return kt.__wrap(s);
}
function Im(e, t, n) {
  const r = le.tr(e, t, n);
  return kt.__wrap(r);
}
function Gc(e, t, n) {
  const r = le.addi(e, t, n);
  return kt.__wrap(r);
}
function ym(e, t, n) {
  const r = le.muli(e, t, n);
  return kt.__wrap(r);
}
function Nr(e, t, n) {
  const r = le.lw(e, t, n);
  return kt.__wrap(r);
}
function Bm(e, t, n) {
  const r = le.gtf(e, t, n);
  return kt.__wrap(r);
}
function ws(e, t) {
  const n = le.movi(e, t);
  return kt.__wrap(n);
}
let kr = null;
function Hc() {
  return (kr === null || kr.byteLength === 0) && (kr = new Int32Array(le.memory.buffer)), kr;
}
function Cm(e, t) {
  return e = e >>> 0, Od().subarray(e / 1, e / 1 + t);
}
const bm = Object.freeze({
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
class kt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(kt.prototype);
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
      var t = Hc()[s / 4 + 0], n = Hc()[s / 4 + 1], r = Cm(t, n).slice();
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
    return n === 0 ? void 0 : ke.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = le.regid_bal();
    return ke.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = le.regid_cgas();
    return ke.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = le.regid_err();
    return ke.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = le.regid_flag();
    return ke.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = le.regid_fp();
    return ke.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = le.regid_ggas();
    return ke.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = le.regid_hp();
    return ke.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = le.regid_is();
    return ke.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = le.regid_of();
    return ke.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = le.regid_one();
    return ke.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = le.regid_pc();
    return ke.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = le.regid_ret();
    return ke.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = le.regid_retl();
    return ke.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = le.regid_sp();
    return ke.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = le.regid_spp();
    return ke.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = le.regid_writable();
    return ke.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = le.regid_zero();
    return ke.__wrap(t);
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
async function Qm(e, t) {
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
function xm() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(wm(t, n));
  }, e;
}
function vm(e, t) {
  return le = e.exports, Ld.__wbindgen_wasm_module = t, kr = null, Sr = null, le;
}
async function Ld(e) {
  if (le !== void 0)
    return le;
  const t = xm(), { instance: n, module: r } = await Qm(await e, t);
  return vm(n, r);
}
function _m(e, t, n, r) {
  function s(m, b, v) {
    var D = v ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, C = v ? WebAssembly.compileStreaming : WebAssembly.compile;
    return b ? D(m, b) : C(m);
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
    var E = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(E, r) : E;
  } else
    return s(i, r, !1);
}
function Dm(e) {
  return _m(1, null, "AGFzbQEAAAABTw1gA39/fwF/YAF/AX9gAn9/AX9gBH9/f38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX9gBX9/f39/AGAEf39/fwACGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABAOBAv8BAQYCBAECAgoDAwMDAwMDAwMDBgQDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAUDAwMDAgICAgICAwMDAwMDAwMDAwMDAwMDAwMDBAMBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICwAADAACAAICAgICAgICAgICAgIEAQEBAQEBAQEBAQEBAQEBAQQBAQEBBAUJAgEABAYEBAMFCQQGBAEEAQIFBQUFBQUFBQUFBQUFBQUFBQEBBAYBAQYIBAYBAQQCCAECBAQEBAECAQEEAQICAgIBBAkJAQEBAQQAAgIBAQUGAggCAwMCBwAHAAECBwcHBAUBcAEXFwUDAQARBgkBfwFBgIDAAAsH803BBQZtZW1vcnkCAA5fX3diZ19hZGRfZnJlZQDFARJhZGRfbmV3X3R5cGVzY3JpcHQAdAZhZGRfcmEAmgEGYWRkX3JiAIsBBmFkZF9yYwCMAQNhZGQAcQNhbmQAVQNkaXYAVgJlcQBXA2V4cABYAmd0AFkCbHQAWgRtbG9nAFsEbXJvbwBcBG1vZF8AXQVtb3ZlXwB6A211bABeA25vdAB7Am9yAF8Dc2xsAGADc3JsAGEDc3ViAGIDeG9yAGMEbWxkdgA6A3JldACPAQRyZXRkAHwTYWxvY19uZXdfdHlwZXNjcmlwdACcAQRhbG9jAJABA21jbAB9A21jcABkA21lcQA7E2Joc2hfbmV3X3R5cGVzY3JpcHQAhAEEYmhzaAB+BGJoZWkAkQEEYnVybgB/E2NhbGxfbmV3X3R5cGVzY3JpcHQATQdjYWxsX3JkAJsBBGNhbGwAPANjY3AAPQRjcm9vAIABBGNzaXoAgQECY2IAkgEDbGRjAGUDbG9nAD4EbG9nZAA/BG1pbnQAggEEcnZydACTAQRzY3dxAGYDc3J3AGcEc3J3cQBAA3N3dwBoBHN3d3EAQQJ0cgBpA3RybwBCBGVjazEAagRlY3IxAGsEZWQxOQBsBGsyNTYAbQRzMjU2AG4EdGltZQCDARNub29wX25ld190eXBlc2NyaXB0AKgBBG5vb3AAngEEZmxhZwCUAQNiYWwAbwNqbXAAlQEDam5lAHADc21vAEMTYWRkaV9uZXdfdHlwZXNjcmlwdAB3CmFkZGlfaW1tMTIAjgEEYWRkaQAbBGFuZGkAHARkaXZpAB0EZXhwaQAeBG1vZGkAHwRtdWxpACADb3JpACEEc2xsaQAiBHNybGkAIwRzdWJpACQEeG9yaQAlBGpuZWkAJgJsYgAnAmx3ACgCc2IAKQJzdwAqBG1jcGkAKwNndGYALARtY2xpADQRZ21fbmV3X3R5cGVzY3JpcHQAhQEIZ21faW1tMTgAiQECZ20ANQRtb3ZpADYEam56aQA3BGptcGYAOARqbXBiADkEam56ZgAtBGpuemIALgRqbmVmAAkEam5lYgAKAmppAE4TY2ZlaV9uZXdfdHlwZXNjcmlwdACNAQpjZmVpX2ltbTI0AIgBBGNmZWkATwRjZnNpAFADY2ZlAJYBA2NmcwCXAQRwc2hsAFEEcHNoaABSBHBvcGwAUwRwb3BoAFQEd2RjbQALBHdxY20ADAR3ZG9wAA0Ed3FvcAAOBHdkbWwADwR3cW1sABAEd2RkdgARBHdxZHYAEgR3ZG1kAEQEd3FtZABFBHdkYW0ARgR3cWFtAEcEd2RtbQBIBHdxbW0ASQRlY2FsAEoTYW5kaV9uZXdfdHlwZXNjcmlwdAB3E2RpdmlfbmV3X3R5cGVzY3JpcHQAdxNleHBpX25ld190eXBlc2NyaXB0AHcTbW9kaV9uZXdfdHlwZXNjcmlwdAB3E211bGlfbmV3X3R5cGVzY3JpcHQAdxJvcmlfbmV3X3R5cGVzY3JpcHQAdxNzbGxpX25ld190eXBlc2NyaXB0AHcTc3JsaV9uZXdfdHlwZXNjcmlwdAB3E3N1YmlfbmV3X3R5cGVzY3JpcHQAdxN4b3JpX25ld190eXBlc2NyaXB0AHcTam5laV9uZXdfdHlwZXNjcmlwdAB3EWxiX25ld190eXBlc2NyaXB0AHcRbHdfbmV3X3R5cGVzY3JpcHQAdxFzYl9uZXdfdHlwZXNjcmlwdAB3EXN3X25ld190eXBlc2NyaXB0AHcTbWNwaV9uZXdfdHlwZXNjcmlwdAB3Emd0Zl9uZXdfdHlwZXNjcmlwdAB3E2puemZfbmV3X3R5cGVzY3JpcHQAdxNqbnpiX25ld190eXBlc2NyaXB0AHcGYW5kX3JjAIwBBmRpdl9yYwCMAQVlcV9yYwCMAQZleHBfcmMAjAEFZ3RfcmMAjAEFbHRfcmMAjAEHbWxvZ19yYwCMAQdtcm9vX3JjAIwBBm1vZF9yYwCMAQZtdWxfcmMAjAEFb3JfcmMAjAEGc2xsX3JjAIwBBnNybF9yYwCMAQZzdWJfcmMAjAEGeG9yX3JjAIwBB21sZHZfcmMAjAEGbWNwX3JjAIwBBm1lcV9yYwCMAQdjYWxsX3JjAIwBBmNjcF9yYwCMAQZsZGNfcmMAjAEGbG9nX3JjAIwBB2xvZ2RfcmMAjAEHc2N3cV9yYwCMAQZzcndfcmMAjAEHc3J3cV9yYwCMAQZzd3dfcmMAjAEHc3d3cV9yYwCMAQV0cl9yYwCMAQZ0cm9fcmMAjAEHZWNrMV9yYwCMAQdlY3IxX3JjAIwBB2VkMTlfcmMAjAEHazI1Nl9yYwCMAQdzMjU2X3JjAIwBBmJhbF9yYwCMAQZqbmVfcmMAjAEGc21vX3JjAIwBB2puZWZfcmMAjAEHam5lYl9yYwCMAQd3ZGNtX3JjAIwBB3dxY21fcmMAjAEHd2RvcF9yYwCMAQd3cW9wX3JjAIwBB3dkbWxfcmMAjAEHd3FtbF9yYwCMAQd3ZGR2X3JjAIwBB3dxZHZfcmMAjAEHd2RtZF9yYwCMAQd3cW1kX3JjAIwBB3dkYW1fcmMAjAEHd3FhbV9yYwCMAQd3ZG1tX3JjAIwBB3dxbW1fcmMAjAEHZWNhbF9yYwCMARNtbGR2X25ld190eXBlc2NyaXB0AE0SbWVxX25ld190eXBlc2NyaXB0AE0SY2NwX25ld190eXBlc2NyaXB0AE0SbG9nX25ld190eXBlc2NyaXB0AE0TbG9nZF9uZXdfdHlwZXNjcmlwdABNE3Nyd3FfbmV3X3R5cGVzY3JpcHQATRNzd3dxX25ld190eXBlc2NyaXB0AE0SdHJvX25ld190eXBlc2NyaXB0AE0Sc21vX25ld190eXBlc2NyaXB0AE0Tam5lZl9uZXdfdHlwZXNjcmlwdABNE2puZWJfbmV3X3R5cGVzY3JpcHQATRN3ZGNtX25ld190eXBlc2NyaXB0AE0Td3FjbV9uZXdfdHlwZXNjcmlwdABNE3dkb3BfbmV3X3R5cGVzY3JpcHQATRN3cW9wX25ld190eXBlc2NyaXB0AE0Td2RtbF9uZXdfdHlwZXNjcmlwdABNE3dxbWxfbmV3X3R5cGVzY3JpcHQATRN3ZGR2X25ld190eXBlc2NyaXB0AE0Td3Fkdl9uZXdfdHlwZXNjcmlwdABNE3dkbWRfbmV3X3R5cGVzY3JpcHQATRN3cW1kX25ld190eXBlc2NyaXB0AE0Td2RhbV9uZXdfdHlwZXNjcmlwdABNE3dxYW1fbmV3X3R5cGVzY3JpcHQATRN3ZG1tX25ld190eXBlc2NyaXB0AE0Td3FtbV9uZXdfdHlwZXNjcmlwdABNE2VjYWxfbmV3X3R5cGVzY3JpcHQATQZhbmRfcmIAiwEGZGl2X3JiAIsBBWVxX3JiAIsBBmV4cF9yYgCLAQVndF9yYgCLAQVsdF9yYgCLAQdtbG9nX3JiAIsBB21yb29fcmIAiwEGbW9kX3JiAIsBB21vdmVfcmIAiwEGbXVsX3JiAIsBBm5vdF9yYgCLAQVvcl9yYgCLAQZzbGxfcmIAiwEGc3JsX3JiAIsBBnN1Yl9yYgCLAQZ4b3JfcmIAiwEHbWxkdl9yYgCLAQdyZXRkX3JiAIsBBm1jbF9yYgCLAQZtY3BfcmIAiwEGbWVxX3JiAIsBB2Joc2hfcmIAiwEHYnVybl9yYgCLAQdjYWxsX3JiAIsBBmNjcF9yYgCLAQdjcm9vX3JiAIsBB2NzaXpfcmIAiwEGbGRjX3JiAIsBBmxvZ19yYgCLAQdsb2dkX3JiAIsBB21pbnRfcmIAiwEHc2N3cV9yYgCLAQZzcndfcmIAiwEHc3J3cV9yYgCLAQZzd3dfcmIAiwEHc3d3cV9yYgCLAQV0cl9yYgCLAQZ0cm9fcmIAiwEHZWNrMV9yYgCLAQdlY3IxX3JiAIsBB2VkMTlfcmIAiwEHazI1Nl9yYgCLAQdzMjU2X3JiAIsBB3RpbWVfcmIAiwEGYmFsX3JiAIsBBmpuZV9yYgCLAQZzbW9fcmIAiwEHYWRkaV9yYgCLAQdhbmRpX3JiAIsBB2RpdmlfcmIAiwEHZXhwaV9yYgCLAQdtb2RpX3JiAIsBB211bGlfcmIAiwEGb3JpX3JiAIsBB3NsbGlfcmIAiwEHc3JsaV9yYgCLAQdzdWJpX3JiAIsBB3hvcmlfcmIAiwEHam5laV9yYgCLAQVsYl9yYgCLAQVsd19yYgCLAQVzYl9yYgCLAQVzd19yYgCLAQdtY3BpX3JiAIsBBmd0Zl9yYgCLAQdqbnpmX3JiAIsBB2puemJfcmIAiwEHam5lZl9yYgCLAQdqbmViX3JiAIsBB3dkY21fcmIAiwEHd3FjbV9yYgCLAQd3ZG9wX3JiAIsBB3dxb3BfcmIAiwEHd2RtbF9yYgCLAQd3cW1sX3JiAIsBB3dkZHZfcmIAiwEHd3Fkdl9yYgCLAQd3ZG1kX3JiAIsBB3dxbWRfcmIAiwEHd2RhbV9yYgCLAQd3cWFtX3JiAIsBB3dkbW1fcmIAiwEHd3FtbV9yYgCLAQdlY2FsX3JiAIsBEm5vdF9uZXdfdHlwZXNjcmlwdACEARNyZXRkX25ld190eXBlc2NyaXB0AIQBE21vdmVfbmV3X3R5cGVzY3JpcHQAhAESbWNsX25ld190eXBlc2NyaXB0AIQBE2J1cm5fbmV3X3R5cGVzY3JpcHQAhAETY3Jvb19uZXdfdHlwZXNjcmlwdACEARNjc2l6X25ld190eXBlc2NyaXB0AIQBE21pbnRfbmV3X3R5cGVzY3JpcHQAhAETdGltZV9uZXdfdHlwZXNjcmlwdACEAQptY2xpX2ltbTE4AIkBCm1vdmlfaW1tMTgAiQEKam56aV9pbW0xOACJAQpqbXBmX2ltbTE4AIkBCmptcGJfaW1tMTgAiQEIamlfaW1tMjQAiAEKY2ZzaV9pbW0yNACIAQpwc2hsX2ltbTI0AIgBCnBzaGhfaW1tMjQAiAEKcG9wbF9pbW0yNACIAQpwb3BoX2ltbTI0AIgBCmFuZGlfaW1tMTIAjgEKZGl2aV9pbW0xMgCOAQpleHBpX2ltbTEyAI4BCm1vZGlfaW1tMTIAjgEKbXVsaV9pbW0xMgCOAQlvcmlfaW1tMTIAjgEKc2xsaV9pbW0xMgCOAQpzcmxpX2ltbTEyAI4BCnN1YmlfaW1tMTIAjgEKeG9yaV9pbW0xMgCOAQpqbmVpX2ltbTEyAI4BCGxiX2ltbTEyAI4BCGx3X2ltbTEyAI4BCHNiX2ltbTEyAI4BCHN3X2ltbTEyAI4BCm1jcGlfaW1tMTIAjgEJZ3RmX2ltbTEyAI4BCmpuemZfaW1tMTIAjgEKam56Yl9pbW0xMgCOARNtY2xpX25ld190eXBlc2NyaXB0AIUBE21vdmlfbmV3X3R5cGVzY3JpcHQAhQETam56aV9uZXdfdHlwZXNjcmlwdACFARNqbXBmX25ld190eXBlc2NyaXB0AIUBE2ptcGJfbmV3X3R5cGVzY3JpcHQAhQEGYW5kX3JhAJoBBmRpdl9yYQCaAQVlcV9yYQCaAQZleHBfcmEAmgEFZ3RfcmEAmgEFbHRfcmEAmgEHbWxvZ19yYQCaAQdtcm9vX3JhAJoBBm1vZF9yYQCaAQdtb3ZlX3JhAJoBBm11bF9yYQCaAQZub3RfcmEAmgEFb3JfcmEAmgEGc2xsX3JhAJoBBnNybF9yYQCaAQZzdWJfcmEAmgEGeG9yX3JhAJoBB21sZHZfcmEAmgEGcmV0X3JhAJoBB3JldGRfcmEAmgEHYWxvY19yYQCaAQZtY2xfcmEAmgEGbWNwX3JhAJoBBm1lcV9yYQCaAQdiaHNoX3JhAJoBB2JoZWlfcmEAmgEHYnVybl9yYQCaAQdjYWxsX3JhAJoBBmNjcF9yYQCaAQdjcm9vX3JhAJoBB2NzaXpfcmEAmgEFY2JfcmEAmgEGbGRjX3JhAJoBBmxvZ19yYQCaAQdsb2dkX3JhAJoBB21pbnRfcmEAmgEHcnZydF9yYQCaAQdzY3dxX3JhAJoBBnNyd19yYQCaAQdzcndxX3JhAJoBBnN3d19yYQCaAQdzd3dxX3JhAJoBBXRyX3JhAJoBBnRyb19yYQCaAQdlY2sxX3JhAJoBB2VjcjFfcmEAmgEHZWQxOV9yYQCaAQdrMjU2X3JhAJoBB3MyNTZfcmEAmgEHdGltZV9yYQCaAQdmbGFnX3JhAJoBBmJhbF9yYQCaAQZqbXBfcmEAmgEGam5lX3JhAJoBBnNtb19yYQCaAQdhZGRpX3JhAJoBB2FuZGlfcmEAmgEHZGl2aV9yYQCaAQdleHBpX3JhAJoBB21vZGlfcmEAmgEHbXVsaV9yYQCaAQZvcmlfcmEAmgEHc2xsaV9yYQCaAQdzcmxpX3JhAJoBB3N1YmlfcmEAmgEHeG9yaV9yYQCaAQdqbmVpX3JhAJoBBWxiX3JhAJoBBWx3X3JhAJoBBXNiX3JhAJoBBXN3X3JhAJoBB21jcGlfcmEAmgEGZ3RmX3JhAJoBB21jbGlfcmEAmgEFZ21fcmEAmgEHbW92aV9yYQCaAQdqbnppX3JhAJoBB2ptcGZfcmEAmgEHam1wYl9yYQCaAQdqbnpmX3JhAJoBB2puemJfcmEAmgEHam5lZl9yYQCaAQdqbmViX3JhAJoBBmNmZV9yYQCaAQZjZnNfcmEAmgEHd2RjbV9yYQCaAQd3cWNtX3JhAJoBB3dkb3BfcmEAmgEHd3FvcF9yYQCaAQd3ZG1sX3JhAJoBB3dxbWxfcmEAmgEHd2Rkdl9yYQCaAQd3cWR2X3JhAJoBB3dkbWRfcmEAmgEHd3FtZF9yYQCaAQd3ZGFtX3JhAJoBB3dxYW1fcmEAmgEHd2RtbV9yYQCaAQd3cW1tX3JhAJoBB2VjYWxfcmEAmgESYW5kX25ld190eXBlc2NyaXB0AHQSZGl2X25ld190eXBlc2NyaXB0AHQRZXFfbmV3X3R5cGVzY3JpcHQAdBJleHBfbmV3X3R5cGVzY3JpcHQAdBFndF9uZXdfdHlwZXNjcmlwdAB0EWx0X25ld190eXBlc2NyaXB0AHQTbWxvZ19uZXdfdHlwZXNjcmlwdAB0E21yb29fbmV3X3R5cGVzY3JpcHQAdBJtb2RfbmV3X3R5cGVzY3JpcHQAdBJtdWxfbmV3X3R5cGVzY3JpcHQAdBFvcl9uZXdfdHlwZXNjcmlwdAB0EnNsbF9uZXdfdHlwZXNjcmlwdAB0EnNybF9uZXdfdHlwZXNjcmlwdAB0EnN1Yl9uZXdfdHlwZXNjcmlwdAB0Enhvcl9uZXdfdHlwZXNjcmlwdAB0Em1jcF9uZXdfdHlwZXNjcmlwdAB0EmxkY19uZXdfdHlwZXNjcmlwdAB0E3Njd3FfbmV3X3R5cGVzY3JpcHQAdBJzcndfbmV3X3R5cGVzY3JpcHQAdBJzd3dfbmV3X3R5cGVzY3JpcHQAdBF0cl9uZXdfdHlwZXNjcmlwdAB0E2VjazFfbmV3X3R5cGVzY3JpcHQAdBNlY3IxX25ld190eXBlc2NyaXB0AHQTZWQxOV9uZXdfdHlwZXNjcmlwdAB0E2syNTZfbmV3X3R5cGVzY3JpcHQAdBNzMjU2X25ld190eXBlc2NyaXB0AHQSYmFsX25ld190eXBlc2NyaXB0AHQSam5lX25ld190eXBlc2NyaXB0AHQHbWxkdl9yZACbAQZtZXFfcmQAmwEGY2NwX3JkAJsBBmxvZ19yZACbAQdsb2dkX3JkAJsBB3Nyd3FfcmQAmwEHc3d3cV9yZACbAQZ0cm9fcmQAmwEGc21vX3JkAJsBCmpuZWZfaW1tMDYAmwEKam5lYl9pbW0wNgCbAQp3ZGNtX2ltbTA2AJsBCndxY21faW1tMDYAmwEKd2RvcF9pbW0wNgCbAQp3cW9wX2ltbTA2AJsBCndkbWxfaW1tMDYAmwEKd3FtbF9pbW0wNgCbAQp3ZGR2X2ltbTA2AJsBCndxZHZfaW1tMDYAmwEHd2RtZF9yZACbAQd3cW1kX3JkAJsBB3dkYW1fcmQAmwEHd3FhbV9yZACbAQd3ZG1tX3JkAJsBB3dxbW1fcmQAmwEHZWNhbF9yZACbARFqaV9uZXdfdHlwZXNjcmlwdACNARNjZnNpX25ld190eXBlc2NyaXB0AI0BE3BzaGxfbmV3X3R5cGVzY3JpcHQAjQETcHNoaF9uZXdfdHlwZXNjcmlwdACNARNwb3BsX25ld190eXBlc2NyaXB0AI0BE3BvcGhfbmV3X3R5cGVzY3JpcHQAjQEOX193YmdfYW5kX2ZyZWUAxQEOX193YmdfZGl2X2ZyZWUAxQENX193YmdfZXFfZnJlZQDFAQ5fX3diZ19leHBfZnJlZQDFAQ1fX3diZ19ndF9mcmVlAMUBDV9fd2JnX2x0X2ZyZWUAxQEPX193YmdfbWxvZ19mcmVlAMUBD19fd2JnX21yb29fZnJlZQDFAQ5fX3diZ19tb2RfZnJlZQDFAQ9fX3diZ19tb3ZlX2ZyZWUAxQEOX193YmdfbXVsX2ZyZWUAxQEOX193Ymdfbm90X2ZyZWUAxQENX193Ymdfb3JfZnJlZQDFAQ5fX3diZ19zbGxfZnJlZQDFAQ5fX3diZ19zcmxfZnJlZQDFAQ5fX3diZ19zdWJfZnJlZQDFAQ5fX3diZ194b3JfZnJlZQDFAQ9fX3diZ19tbGR2X2ZyZWUAxQEOX193YmdfcmV0X2ZyZWUAxQEPX193YmdfcmV0ZF9mcmVlAMUBD19fd2JnX2Fsb2NfZnJlZQDFAQ5fX3diZ19tY2xfZnJlZQDFAQ5fX3diZ19tY3BfZnJlZQDFAQ5fX3diZ19tZXFfZnJlZQDFAQ9fX3diZ19iaHNoX2ZyZWUAxQEPX193YmdfYmhlaV9mcmVlAMUBD19fd2JnX2J1cm5fZnJlZQDFAQ9fX3diZ19jYWxsX2ZyZWUAxQEOX193YmdfY2NwX2ZyZWUAxQEPX193YmdfY3Jvb19mcmVlAMUBD19fd2JnX2NzaXpfZnJlZQDFAQ1fX3diZ19jYl9mcmVlAMUBDl9fd2JnX2xkY19mcmVlAMUBDl9fd2JnX2xvZ19mcmVlAMUBD19fd2JnX2xvZ2RfZnJlZQDFAQ9fX3diZ19taW50X2ZyZWUAxQEPX193YmdfcnZydF9mcmVlAMUBD19fd2JnX3Njd3FfZnJlZQDFAQ5fX3diZ19zcndfZnJlZQDFAQ9fX3diZ19zcndxX2ZyZWUAxQEOX193Ymdfc3d3X2ZyZWUAxQEPX193Ymdfc3d3cV9mcmVlAMUBDV9fd2JnX3RyX2ZyZWUAxQEOX193YmdfdHJvX2ZyZWUAxQEPX193YmdfZWNrMV9mcmVlAMUBD19fd2JnX2VjcjFfZnJlZQDFAQ9fX3diZ19lZDE5X2ZyZWUAxQEPX193YmdfazI1Nl9mcmVlAMUBD19fd2JnX3MyNTZfZnJlZQDFAQ9fX3diZ190aW1lX2ZyZWUAxQEPX193Ymdfbm9vcF9mcmVlAMUBD19fd2JnX2ZsYWdfZnJlZQDFAQ5fX3diZ19iYWxfZnJlZQDFAQ5fX3diZ19qbXBfZnJlZQDFAQ5fX3diZ19qbmVfZnJlZQDFAQ5fX3diZ19zbW9fZnJlZQDFAQ9fX3diZ19hZGRpX2ZyZWUAxQEPX193YmdfYW5kaV9mcmVlAMUBD19fd2JnX2RpdmlfZnJlZQDFAQ9fX3diZ19leHBpX2ZyZWUAxQEPX193YmdfbW9kaV9mcmVlAMUBD19fd2JnX211bGlfZnJlZQDFAQ5fX3diZ19vcmlfZnJlZQDFAQ9fX3diZ19zbGxpX2ZyZWUAxQEPX193Ymdfc3JsaV9mcmVlAMUBD19fd2JnX3N1YmlfZnJlZQDFAQ9fX3diZ194b3JpX2ZyZWUAxQEPX193Ymdfam5laV9mcmVlAMUBDV9fd2JnX2xiX2ZyZWUAxQENX193YmdfbHdfZnJlZQDFAQ1fX3diZ19zYl9mcmVlAMUBDV9fd2JnX3N3X2ZyZWUAxQEPX193YmdfbWNwaV9mcmVlAMUBDl9fd2JnX2d0Zl9mcmVlAMUBD19fd2JnX21jbGlfZnJlZQDFAQ1fX3diZ19nbV9mcmVlAMUBD19fd2JnX21vdmlfZnJlZQDFAQ9fX3diZ19qbnppX2ZyZWUAxQEPX193Ymdfam1wZl9mcmVlAMUBD19fd2JnX2ptcGJfZnJlZQDFAQ9fX3diZ19qbnpmX2ZyZWUAxQEPX193Ymdfam56Yl9mcmVlAMUBD19fd2JnX2puZWZfZnJlZQDFAQ9fX3diZ19qbmViX2ZyZWUAxQENX193YmdfamlfZnJlZQDFAQ9fX3diZ19jZmVpX2ZyZWUAxQEPX193YmdfY2ZzaV9mcmVlAMUBDl9fd2JnX2NmZV9mcmVlAMUBDl9fd2JnX2Nmc19mcmVlAMUBD19fd2JnX3BzaGxfZnJlZQDFAQ9fX3diZ19wc2hoX2ZyZWUAxQEPX193YmdfcG9wbF9mcmVlAMUBD19fd2JnX3BvcGhfZnJlZQDFAQ9fX3diZ193ZGNtX2ZyZWUAxQEPX193Ymdfd3FjbV9mcmVlAMUBD19fd2JnX3dkb3BfZnJlZQDFAQ9fX3diZ193cW9wX2ZyZWUAxQEPX193Ymdfd2RtbF9mcmVlAMUBD19fd2JnX3dxbWxfZnJlZQDFAQ9fX3diZ193ZGR2X2ZyZWUAxQEPX193Ymdfd3Fkdl9mcmVlAMUBD19fd2JnX3dkbWRfZnJlZQDFAQ9fX3diZ193cW1kX2ZyZWUAxQEPX193Ymdfd2RhbV9mcmVlAMUBD19fd2JnX3dxYW1fZnJlZQDFAQ9fX3diZ193ZG1tX2ZyZWUAxQEPX193Ymdfd3FtbV9mcmVlAMUBD19fd2JnX2VjYWxfZnJlZQDFARJyZXRfbmV3X3R5cGVzY3JpcHQAnAETYmhlaV9uZXdfdHlwZXNjcmlwdACcARFjYl9uZXdfdHlwZXNjcmlwdACcARNydnJ0X25ld190eXBlc2NyaXB0AJwBE2ZsYWdfbmV3X3R5cGVzY3JpcHQAnAESam1wX25ld190eXBlc2NyaXB0AJwBEmNmZV9uZXdfdHlwZXNjcmlwdACcARJjZnNfbmV3X3R5cGVzY3JpcHQAnAEWX193YmdfY29tcGFyZWFyZ3NfZnJlZQDFARpfX3diZ19nZXRfY29tcGFyZWFyZ3NfbW9kZQDCARpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQClASJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAMYBIl9fd2JnX3NldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMArgESY29tcGFyZWFyZ3NfdG9faW1tAJkBFGNvbXBhcmVhcmdzX2Zyb21faW1tAIoBFV9fd2JnX2dldF9tYXRoYXJnc19vcADCARVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AApgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAMIBHl9fd2JnX3NldF9tdWxhcmdzX2luZGlyZWN0X3JocwCsARtfX3diZ19wYW5pY2luc3RydWN0aW9uX2ZyZWUAxQEhcGFuaWNpbnN0cnVjdGlvbl9lcnJvcl90eXBlc2NyaXB0AKABF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAMMBHHBhbmljaW5zdHJ1Y3Rpb25faW5zdHJ1Y3Rpb24AxwEfX193Ymdfc2V0X21hdGhhcmdzX2luZGlyZWN0X3JocwCuAR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMArgEeX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK4BH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAxgEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAMYBHl9fd2JnX2dldF9kaXZhcmdzX2luZGlyZWN0X3JocwDGARNfX3diZ19tYXRoYXJnc19mcmVlAMUBEl9fd2JnX211bGFyZ3NfZnJlZQDFARJfX3diZ19kaXZhcmdzX2ZyZWUAxQEQX193YmdfaW1tMDZfZnJlZQDFARFyZWdpZF9uZXdfY2hlY2tlZAChAQlyZWdpZF9iYWwAsQEKcmVnaWRfY2dhcwCyAQlyZWdpZF9lcnIAswEKcmVnaWRfZmxhZwC0AQhyZWdpZF9mcAC1AQpyZWdpZF9nZ2FzALYBCHJlZ2lkX2hwALcBCHJlZ2lkX2lzALgBCHJlZ2lkX29mALkBCXJlZ2lkX29uZQC6AQhyZWdpZF9wYwC7AQlyZWdpZF9yZXQAvAEKcmVnaWRfcmV0bAC9AQhyZWdpZF9zcAC+AQlyZWdpZF9zcHAAvwEOcmVnaWRfd3JpdGFibGUAwAEKcmVnaWRfemVybwDBARRyZWdpZF9uZXdfdHlwZXNjcmlwdACtAQtyZWdpZF90b191OACvARBfX3diZ19yZWdpZF9mcmVl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AGovAAA7AAAgAkECayAHIARB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAAIANBBGshAyAAQv/B1y9WIA4hAA0ACwsgDqciAkHjAEsEQCADQQJrIgMgBkEJamogDqciAiACQf//A3FB5ABuIgJB5ABsa0H//wNxQQF0QeSLwABqLwAAOwAACwJAIAJBCk8EQCADQQJrIgMgBkEJamogAkEBdEHki8AAai8AADsAAAwBCyADQQFrIgMgBkEJamogAkEwajoAAAsCfyAGQQlqIANqIQlBK0GAgMQAIAEiAigCHCIBQQFxIgQbIQcgBEEnIANrIgpqIQNBnIvAAEEAIAFBBHEbIQQCQAJAIAIoAgBFBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAyACKAIEIgVPBEBBASEBIAIoAhQiAyACKAIYIgIgByAEEKcBDQEMAgsgAUEIcQRAIAIoAhAhDCACQTA2AhAgAi0AICENQQEhASACQQE6ACAgAigCFCIIIAIoAhgiCyAHIAQQpwENASAFIANrQQFqIQECQANAIAFBAWsiAUUNASAIQTAgCygCEBECAEUNAAtBAQwEC0EBIQEgCCAJIAogCygCDBEAAA0BIAIgDToAICACIAw2AhBBACEBDAELIAUgA2shAwJAAkACQCACLQAgIgFBAWsOAwABAAILIAMhAUEAIQMMAQsgA0EBdiEBIANBAWpBAXYhAwsgAUEBaiEBIAJBGGooAgAhBSACKAIQIQggAigCFCECAkADQCABQQFrIgFFDQEgAiAIIAUoAhARAgBFDQALQQEMAwtBASEBIAIgBSAHIAQQpwENACACIAkgCiAFKAIMEQAADQBBACEBA0BBACABIANGDQMaIAFBAWohASACIAggBSgCEBECAEUNAAsgAUEBayADSQwCCyABDAELIAMgCSAKIAIoAgwRAAALIAZBMGokAAsQACAAIAEgAiADQdMAEPcBCxAAIAAgASACIANB1AAQ9wELEAAgACABIAIgA0HeABD3AQsQACAAIAEgAiADQd8AEPcBCxAAIAAgASACIANB4AAQ9wELEAAgACABIAIgA0HhABD3AQsQACAAIAEgAiADQeIAEPcBCxAAIAAgASACIANB4wAQ9wELEAAgACABIAIgA0HkABD3AQsQACAAIAEgAiADQeUAEPcBC7sC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", e);
}
async function ma() {
  return await Ld(Dm());
}
ma();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const mt = BigInt(0), Fe = BigInt(1), Dn = BigInt(2), Rm = BigInt(3), yo = BigInt(4), Jc = BigInt(5), Yc = BigInt(8);
BigInt(9);
BigInt(16);
function Ct(e, t) {
  const n = e % t;
  return n >= mt ? n : t + n;
}
function Sm(e, t, n) {
  if (n <= mt || t < mt)
    throw new Error("Expected power/modulo > 0");
  if (n === Fe)
    return mt;
  let r = Fe;
  for (; t > mt; )
    t & Fe && (r = r * e % n), e = e * e % n, t >>= Fe;
  return r;
}
function St(e, t, n) {
  let r = e;
  for (; t-- > mt; )
    r *= r, r %= n;
  return r;
}
function Bo(e, t) {
  if (e === mt || t <= mt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Ct(e, t), r = t, s = mt, i = Fe;
  for (; n !== mt; ) {
    const c = r / n, d = r % n, h = s - i * c;
    r = n, n = d, s = i, i = h;
  }
  if (r !== Fe)
    throw new Error("invert: does not exist");
  return Ct(s, t);
}
function Nm(e) {
  const t = (e - Fe) / Dn;
  let n, r, s;
  for (n = e - Fe, r = 0; n % Dn === mt; n /= Dn, r++)
    ;
  for (s = Dn; s < e && Sm(s, t, e) !== e - Fe; s++)
    ;
  if (r === 1) {
    const o = (e + Fe) / yo;
    return function(d, h) {
      const E = d.pow(h, o);
      if (!d.eql(d.sqr(E), h))
        throw new Error("Cannot find square root");
      return E;
    };
  }
  const i = (n + Fe) / Dn;
  return function(c, d) {
    if (c.pow(d, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let h = r, E = c.pow(c.mul(c.ONE, s), n), m = c.pow(d, i), b = c.pow(d, n);
    for (; !c.eql(b, c.ONE); ) {
      if (c.eql(b, c.ZERO))
        return c.ZERO;
      let v = 1;
      for (let C = c.sqr(b); v < h && !c.eql(C, c.ONE); v++)
        C = c.sqr(C);
      const D = c.pow(E, Fe << BigInt(h - v - 1));
      E = c.sqr(D), m = c.mul(m, D), b = c.mul(b, E), h = v;
    }
    return m;
  };
}
function km(e) {
  if (e % yo === Rm) {
    const t = (e + Fe) / yo;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % Yc === Jc) {
    const t = (e - Jc) / Yc;
    return function(r, s) {
      const i = r.mul(s, Dn), o = r.pow(i, t), c = r.mul(s, o), d = r.mul(r.mul(c, Dn), o), h = r.mul(c, r.sub(d, r.ONE));
      if (!r.eql(r.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return Nm(e);
}
const Mm = [
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
function Om(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Mm.reduce((r, s) => (r[s] = "function", r), t);
  return ss(e, n);
}
function Tm(e, t, n) {
  if (n < mt)
    throw new Error("Expected power > 0");
  if (n === mt)
    return e.ONE;
  if (n === Fe)
    return t;
  let r = e.ONE, s = t;
  for (; n > mt; )
    n & Fe && (r = e.mul(r, s)), s = e.sqr(s), n >>= Fe;
  return r;
}
function Lm(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function Fd(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Fm(e, t, n = !1, r = {}) {
  if (e <= mt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = Fd(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = km(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: ha(s),
    ZERO: mt,
    ONE: Fe,
    create: (d) => Ct(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof d}`);
      return mt <= d && d < e;
    },
    is0: (d) => d === mt,
    isOdd: (d) => (d & Fe) === Fe,
    neg: (d) => Ct(-d, e),
    eql: (d, h) => d === h,
    sqr: (d) => Ct(d * d, e),
    add: (d, h) => Ct(d + h, e),
    sub: (d, h) => Ct(d - h, e),
    mul: (d, h) => Ct(d * h, e),
    pow: (d, h) => Tm(c, d, h),
    div: (d, h) => Ct(d * Bo(h, e), e),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, h) => d + h,
    subN: (d, h) => d - h,
    mulN: (d, h) => d * h,
    inv: (d) => Bo(d, e),
    sqrt: r.sqrt || ((d) => o(c, d)),
    invertBatch: (d) => Lm(c, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, h, E) => E ? h : d,
    toBytes: (d) => n ? la(d, i) : fr(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${d.length}`);
      return n ? da(d) : kn(d);
    }
  });
  return Object.freeze(c);
}
function Pd(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Ud(e) {
  const t = Pd(e);
  return t + Math.ceil(t / 2);
}
function Pm(e, t, n = !1) {
  const r = e.length, s = Pd(t), i = Ud(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? kn(e) : da(e), c = Ct(o, t - Fe) + Fe;
  return n ? la(c, s) : fr(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Um = BigInt(0), $i = BigInt(1);
function Gm(e, t) {
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
      for (; i > Um; )
        i & $i && (o = o.add(c)), c = c.double(), i >>= $i;
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
      let h = s, E = h;
      for (let m = 0; m < o; m++) {
        E = h, d.push(E);
        for (let b = 1; b < c; b++)
          E = E.add(h), d.push(E);
        h = E.double();
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
      let h = e.ZERO, E = e.BASE;
      const m = BigInt(2 ** s - 1), b = 2 ** s, v = BigInt(s);
      for (let D = 0; D < c; D++) {
        const C = D * d;
        let k = Number(o & m);
        o >>= v, k > d && (k -= b, o += $i);
        const N = C, V = C + Math.abs(k) - 1, P = D % 2 !== 0, j = k < 0;
        k === 0 ? E = E.add(n(P, i[N])) : h = h.add(n(j, i[V]));
      }
      return { p: h, f: E };
    },
    wNAFCached(s, i, o, c) {
      const d = s._WINDOW_SIZE || 1;
      let h = i.get(s);
      return h || (h = this.precomputeWindow(s, d), d !== 1 && i.set(s, c(h))), this.wNAF(d, h, o);
    }
  };
}
function Gd(e) {
  return Om(e.Fp), ss(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Fd(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Hm(e) {
  const t = Gd(e);
  ss(t, {
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
const { bytesToNumberBE: Jm, hexToBytes: Ym } = Zg, Sn = {
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
    return { d: Jm(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Sn, n = typeof e == "string" ? Ym(e) : e;
    rs(n);
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Sn._parseInt(n.subarray(2)), { d: o, l: c } = Sn._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (h) => Number.parseInt(h[0], 16) & 8 ? "00" + h : h, n = (h) => {
      const E = h.toString(16);
      return E.length & 1 ? `0${E}` : E;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), d = n(o);
    return `30${n(o + i + 4)}02${d}${s}02${c}${r}`;
  }
}, en = BigInt(0), Nt = BigInt(1);
BigInt(2);
const Zc = BigInt(3);
BigInt(4);
function Zm(e) {
  const t = Hm(e), { Fp: n } = t, r = t.toBytes || ((D, C, k) => {
    const N = C.toAffine();
    return Ur(Uint8Array.from([4]), n.toBytes(N.x), n.toBytes(N.y));
  }), s = t.fromBytes || ((D) => {
    const C = D.subarray(1), k = n.fromBytes(C.subarray(0, n.BYTES)), N = n.fromBytes(C.subarray(n.BYTES, 2 * n.BYTES));
    return { x: k, y: N };
  });
  function i(D) {
    const { a: C, b: k } = t, N = n.sqr(D), V = n.mul(N, D);
    return n.add(n.add(V, n.mul(D, C)), k);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(D) {
    return typeof D == "bigint" && en < D && D < t.n;
  }
  function c(D) {
    if (!o(D))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function d(D) {
    const { allowedPrivateKeyLengths: C, nByteLength: k, wrapPrivateKey: N, n: V } = t;
    if (C && typeof D != "bigint") {
      if (On(D) && (D = lr(D)), typeof D != "string" || !C.includes(D.length))
        throw new Error("Invalid key");
      D = D.padStart(k * 2, "0");
    }
    let P;
    try {
      P = typeof D == "bigint" ? D : kn(Tt("private key", D, k));
    } catch {
      throw new Error(`private key must be ${k} bytes, hex or bigint, not ${typeof D}`);
    }
    return N && (P = Ct(P, V)), c(P), P;
  }
  const h = /* @__PURE__ */ new Map();
  function E(D) {
    if (!(D instanceof m))
      throw new Error("ProjectivePoint expected");
  }
  class m {
    constructor(C, k, N) {
      if (this.px = C, this.py = k, this.pz = N, C == null || !n.isValid(C))
        throw new Error("x required");
      if (k == null || !n.isValid(k))
        throw new Error("y required");
      if (N == null || !n.isValid(N))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(C) {
      const { x: k, y: N } = C || {};
      if (!C || !n.isValid(k) || !n.isValid(N))
        throw new Error("invalid affine point");
      if (C instanceof m)
        throw new Error("projective point not allowed");
      const V = (P) => n.eql(P, n.ZERO);
      return V(k) && V(N) ? m.ZERO : new m(k, N, n.ONE);
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
      const k = n.invertBatch(C.map((N) => N.pz));
      return C.map((N, V) => N.toAffine(k[V])).map(m.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(C) {
      const k = m.fromAffine(s(Tt("pointHex", C)));
      return k.assertValidity(), k;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(C) {
      return m.BASE.multiply(d(C));
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
      const { x: C, y: k } = this.toAffine();
      if (!n.isValid(C) || !n.isValid(k))
        throw new Error("bad point: x or y not FE");
      const N = n.sqr(k), V = i(C);
      if (!n.eql(N, V))
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
      E(C);
      const { px: k, py: N, pz: V } = this, { px: P, py: j, pz: O } = C, M = n.eql(n.mul(k, O), n.mul(P, V)), T = n.eql(n.mul(N, O), n.mul(j, V));
      return M && T;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new m(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: C, b: k } = t, N = n.mul(k, Zc), { px: V, py: P, pz: j } = this;
      let O = n.ZERO, M = n.ZERO, T = n.ZERO, F = n.mul(V, V), q = n.mul(P, P), G = n.mul(j, j), Y = n.mul(V, P);
      return Y = n.add(Y, Y), T = n.mul(V, j), T = n.add(T, T), O = n.mul(C, T), M = n.mul(N, G), M = n.add(O, M), O = n.sub(q, M), M = n.add(q, M), M = n.mul(O, M), O = n.mul(Y, O), T = n.mul(N, T), G = n.mul(C, G), Y = n.sub(F, G), Y = n.mul(C, Y), Y = n.add(Y, T), T = n.add(F, F), F = n.add(T, F), F = n.add(F, G), F = n.mul(F, Y), M = n.add(M, F), G = n.mul(P, j), G = n.add(G, G), F = n.mul(G, Y), O = n.sub(O, F), T = n.mul(G, q), T = n.add(T, T), T = n.add(T, T), new m(O, M, T);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(C) {
      E(C);
      const { px: k, py: N, pz: V } = this, { px: P, py: j, pz: O } = C;
      let M = n.ZERO, T = n.ZERO, F = n.ZERO;
      const q = t.a, G = n.mul(t.b, Zc);
      let Y = n.mul(k, P), z = n.mul(N, j), B = n.mul(V, O), a = n.add(k, N), A = n.add(P, j);
      a = n.mul(a, A), A = n.add(Y, z), a = n.sub(a, A), A = n.add(k, V);
      let l = n.add(P, O);
      return A = n.mul(A, l), l = n.add(Y, B), A = n.sub(A, l), l = n.add(N, V), M = n.add(j, O), l = n.mul(l, M), M = n.add(z, B), l = n.sub(l, M), F = n.mul(q, A), M = n.mul(G, B), F = n.add(M, F), M = n.sub(z, F), F = n.add(z, F), T = n.mul(M, F), z = n.add(Y, Y), z = n.add(z, Y), B = n.mul(q, B), A = n.mul(G, A), z = n.add(z, B), B = n.sub(Y, B), B = n.mul(q, B), A = n.add(A, B), Y = n.mul(z, A), T = n.add(T, Y), Y = n.mul(l, A), M = n.mul(a, M), M = n.sub(M, Y), Y = n.mul(a, z), F = n.mul(l, F), F = n.add(F, Y), new m(M, T, F);
    }
    subtract(C) {
      return this.add(C.negate());
    }
    is0() {
      return this.equals(m.ZERO);
    }
    wNAF(C) {
      return v.wNAFCached(this, h, C, (k) => {
        const N = n.invertBatch(k.map((V) => V.pz));
        return k.map((V, P) => V.toAffine(N[P])).map(m.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(C) {
      const k = m.ZERO;
      if (C === en)
        return k;
      if (c(C), C === Nt)
        return this;
      const { endo: N } = t;
      if (!N)
        return v.unsafeLadder(this, C);
      let { k1neg: V, k1: P, k2neg: j, k2: O } = N.splitScalar(C), M = k, T = k, F = this;
      for (; P > en || O > en; )
        P & Nt && (M = M.add(F)), O & Nt && (T = T.add(F)), F = F.double(), P >>= Nt, O >>= Nt;
      return V && (M = M.negate()), j && (T = T.negate()), T = new m(n.mul(T.px, N.beta), T.py, T.pz), M.add(T);
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
      let k = C, N, V;
      const { endo: P } = t;
      if (P) {
        const { k1neg: j, k1: O, k2neg: M, k2: T } = P.splitScalar(k);
        let { p: F, f: q } = this.wNAF(O), { p: G, f: Y } = this.wNAF(T);
        F = v.constTimeNegate(j, F), G = v.constTimeNegate(M, G), G = new m(n.mul(G.px, P.beta), G.py, G.pz), N = F.add(G), V = q.add(Y);
      } else {
        const { p: j, f: O } = this.wNAF(k);
        N = j, V = O;
      }
      return m.normalizeZ([N, V])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(C, k, N) {
      const V = m.BASE, P = (O, M) => M === en || M === Nt || !O.equals(V) ? O.multiplyUnsafe(M) : O.multiply(M), j = P(this, k).add(P(C, N));
      return j.is0() ? void 0 : j;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(C) {
      const { px: k, py: N, pz: V } = this, P = this.is0();
      C == null && (C = P ? n.ONE : n.inv(V));
      const j = n.mul(k, C), O = n.mul(N, C), M = n.mul(V, C);
      if (P)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(M, n.ONE))
        throw new Error("invZ was invalid");
      return { x: j, y: O };
    }
    isTorsionFree() {
      const { h: C, isTorsionFree: k } = t;
      if (C === Nt)
        return !0;
      if (k)
        return k(m, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: C, clearCofactor: k } = t;
      return C === Nt ? this : k ? k(m, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(C = !0) {
      return this.assertValidity(), r(m, this, C);
    }
    toHex(C = !0) {
      return lr(this.toRawBytes(C));
    }
  }
  m.BASE = new m(t.Gx, t.Gy, n.ONE), m.ZERO = new m(n.ZERO, n.ONE, n.ZERO);
  const b = t.nBitLength, v = Gm(m, t.endo ? Math.ceil(b / 2) : b);
  return {
    CURVE: t,
    ProjectivePoint: m,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Vm(e) {
  const t = Gd(e);
  return ss(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Xm(e) {
  const t = Vm(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(A) {
    return en < A && A < n.ORDER;
  }
  function c(A) {
    return Ct(A, r);
  }
  function d(A) {
    return Bo(A, r);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: E, weierstrassEquation: m, isWithinCurveOrder: b } = Zm({
    ...t,
    toBytes(A, l, p) {
      const f = l.toAffine(), I = n.toBytes(f.x), y = Ur;
      return p ? y(Uint8Array.from([l.hasEvenY() ? 2 : 3]), I) : y(Uint8Array.from([4]), I, n.toBytes(f.y));
    },
    fromBytes(A) {
      const l = A.length, p = A[0], f = A.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const I = kn(f);
        if (!o(I))
          throw new Error("Point is not on curve");
        const y = m(I);
        let g;
        try {
          g = n.sqrt(y);
        } catch (H) {
          const X = H instanceof Error ? ": " + H.message : "";
          throw new Error("Point is not on curve" + X);
        }
        const u = (g & Nt) === Nt;
        return (p & 1) === 1 !== u && (g = n.neg(g)), { x: I, y: g };
      } else if (l === i && p === 4) {
        const I = n.fromBytes(f.subarray(0, n.BYTES)), y = n.fromBytes(f.subarray(n.BYTES, 2 * n.BYTES));
        return { x: I, y };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), v = (A) => lr(fr(A, t.nByteLength));
  function D(A) {
    const l = r >> Nt;
    return A > l;
  }
  function C(A) {
    return D(A) ? c(-A) : A;
  }
  const k = (A, l, p) => kn(A.slice(l, p));
  class N {
    constructor(l, p, f) {
      this.r = l, this.s = p, this.recovery = f, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Tt("compactSignature", l, p * 2), new N(k(l, 0, p), k(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: f } = Sn.toSig(Tt("DER", l));
      return new N(p, f);
    }
    assertValidity() {
      if (!b(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!b(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new N(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: f, recovery: I } = this, y = T(Tt("msgHash", l));
      if (I == null || ![0, 1, 2, 3].includes(I))
        throw new Error("recovery id invalid");
      const g = I === 2 || I === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = I & 1 ? "03" : "02", w = h.fromHex(u + v(g)), H = d(g), X = c(-y * H), $ = c(f * H), W = h.BASE.multiplyAndAddUnsafe(w, X, $);
      if (!W)
        throw new Error("point at infinify");
      return W.assertValidity(), W;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return D(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new N(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hr(this.toDERHex());
    }
    toDERHex() {
      return Sn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hr(this.toCompactHex());
    }
    toCompactHex() {
      return v(this.r) + v(this.s);
    }
  }
  const V = {
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
      const A = Ud(t.n);
      return Pm(t.randomBytes(A), t.n);
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
  function P(A, l = !0) {
    return h.fromPrivateKey(A).toRawBytes(l);
  }
  function j(A) {
    const l = On(A), p = typeof A == "string", f = (l || p) && A.length;
    return l ? f === s || f === i : p ? f === 2 * s || f === 2 * i : A instanceof h;
  }
  function O(A, l, p = !0) {
    if (j(A))
      throw new Error("first arg must be private key");
    if (!j(l))
      throw new Error("second arg must be public key");
    return h.fromHex(l).multiply(E(A)).toRawBytes(p);
  }
  const M = t.bits2int || function(A) {
    const l = kn(A), p = A.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, T = t.bits2int_modN || function(A) {
    return c(M(A));
  }, F = ha(t.nBitLength);
  function q(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(en <= A && A < F))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return fr(A, t.nByteLength);
  }
  function G(A, l, p = Y) {
    if (["recovered", "canonical"].some((ne) => ne in p))
      throw new Error("sign() legacy options not supported");
    const { hash: f, randomBytes: I } = t;
    let { lowS: y, prehash: g, extraEntropy: u } = p;
    y == null && (y = !0), A = Tt("msgHash", A), g && (A = Tt("prehashed msgHash", f(A)));
    const w = T(A), H = E(l), X = [q(H), q(w)];
    if (u != null && u !== !1) {
      const ne = u === !0 ? I(n.BYTES) : u;
      X.push(Tt("extraEntropy", ne));
    }
    const $ = Ur(...X), W = w;
    function te(ne) {
      const Se = M(ne);
      if (!b(Se))
        return;
      const fe = d(Se), oe = h.BASE.multiply(Se).toAffine(), ve = c(oe.x);
      if (ve === en)
        return;
      const de = c(fe * c(W + ve * H));
      if (de === en)
        return;
      let ge = (oe.x === ve ? 0 : 2) | Number(oe.y & Nt), Ht = de;
      return y && D(de) && (Ht = C(de), ge ^= 1), new N(ve, Ht, ge);
    }
    return { seed: $, k2sig: te };
  }
  const Y = { lowS: t.lowS, prehash: !1 }, z = { lowS: t.lowS, prehash: !1 };
  function B(A, l, p = Y) {
    const { seed: f, k2sig: I } = G(A, l, p), y = t;
    return fd(y.hash.outputLen, y.nByteLength, y.hmac)(f, I);
  }
  h.BASE._setWindowSize(8);
  function a(A, l, p, f = z) {
    var oe;
    const I = A;
    if (l = Tt("msgHash", l), p = Tt("publicKey", p), "strict" in f)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: y, prehash: g } = f;
    let u, w;
    try {
      if (typeof I == "string" || On(I))
        try {
          u = N.fromDER(I);
        } catch (ve) {
          if (!(ve instanceof Sn.Err))
            throw ve;
          u = N.fromCompact(I);
        }
      else if (typeof I == "object" && typeof I.r == "bigint" && typeof I.s == "bigint") {
        const { r: ve, s: de } = I;
        u = new N(ve, de);
      } else
        throw new Error("PARSE");
      w = h.fromHex(p);
    } catch (ve) {
      if (ve.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (y && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: H, s: X } = u, $ = T(l), W = d(X), te = c($ * W), ne = c(H * W), Se = (oe = h.BASE.multiplyAndAddUnsafe(w, te, ne)) == null ? void 0 : oe.toAffine();
    return Se ? c(Se.x) === H : !1;
  }
  return {
    CURVE: t,
    getPublicKey: P,
    getSharedSecret: O,
    sign: B,
    verify: a,
    ProjectivePoint: h,
    Signature: N,
    utils: V
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function jm(e) {
  return {
    hash: e,
    hmac: (t, ...n) => Xo(e, t, Kh(...n)),
    randomBytes: tf
  };
}
function qm(e, t) {
  const n = (r) => Xm({ ...e, ...jm(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Hd = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Vc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Wm = BigInt(1), Co = BigInt(2), Xc = (e, t) => (e + t / Co) / t;
function $m(e) {
  const t = Hd, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), d = BigInt(88), h = e * e * e % t, E = h * h * e % t, m = St(E, n, t) * E % t, b = St(m, n, t) * E % t, v = St(b, Co, t) * h % t, D = St(v, s, t) * v % t, C = St(D, i, t) * D % t, k = St(C, c, t) * C % t, N = St(k, d, t) * k % t, V = St(N, c, t) * C % t, P = St(V, n, t) * E % t, j = St(P, o, t) * D % t, O = St(j, r, t) * h % t, M = St(O, Co, t);
  if (!bo.eql(bo.sqr(M), e))
    throw new Error("Cannot find square root");
  return M;
}
const bo = Fm(Hd, void 0, void 0, { sqrt: $m }), ln = qm({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: bo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Vc,
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
      const t = Vc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Wm * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = Xc(i * e, t), d = Xc(-r * e, t);
      let h = Ct(e - c * n - d * s, t), E = Ct(-c * r - d * i, t);
      const m = h > o, b = E > o;
      if (m && (h = t - h), b && (E = t - E), h > o || E > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: m, k1: h, k2neg: b, k2: E };
    }
  }
}, ts);
BigInt(0);
ln.ProjectivePoint;
let Es;
const zm = new Uint8Array(16);
function Km() {
  if (!Es && (Es = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Es))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Es(zm);
}
const wt = [];
for (let e = 0; e < 256; ++e)
  wt.push((e + 256).toString(16).slice(1));
function ew(e, t = 0) {
  return wt[e[t + 0]] + wt[e[t + 1]] + wt[e[t + 2]] + wt[e[t + 3]] + "-" + wt[e[t + 4]] + wt[e[t + 5]] + "-" + wt[e[t + 6]] + wt[e[t + 7]] + "-" + wt[e[t + 8]] + wt[e[t + 9]] + "-" + wt[e[t + 10]] + wt[e[t + 11]] + wt[e[t + 12]] + wt[e[t + 13]] + wt[e[t + 14]] + wt[e[t + 15]];
}
const tw = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), jc = {
  randomUUID: tw
};
function nw(e, t, n) {
  if (jc.randomUUID && !t && !e)
    return jc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || Km)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return ew(r);
}
var wa = { exports: {} }, Wn = typeof Reflect == "object" ? Reflect : null, qc = Wn && typeof Wn.apply == "function" ? Wn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, Ms;
Wn && typeof Wn.ownKeys == "function" ? Ms = Wn.ownKeys : Object.getOwnPropertySymbols ? Ms = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : Ms = function(t) {
  return Object.getOwnPropertyNames(t);
};
function rw(e) {
  console && console.warn && console.warn(e);
}
var Jd = Number.isNaN || function(t) {
  return t !== t;
};
function Qe() {
  Qe.init.call(this);
}
wa.exports = Qe;
wa.exports.once = aw;
Qe.EventEmitter = Qe;
Qe.prototype._events = void 0;
Qe.prototype._eventsCount = 0;
Qe.prototype._maxListeners = void 0;
var Wc = 10;
function Ii(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Qe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Wc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Jd(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Wc = e;
  }
});
Qe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Qe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || Jd(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function Yd(e) {
  return e._maxListeners === void 0 ? Qe.defaultMaxListeners : e._maxListeners;
}
Qe.prototype.getMaxListeners = function() {
  return Yd(this);
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
    qc(d, this, n);
  else
    for (var h = d.length, E = qd(d, h), r = 0; r < h; ++r)
      qc(E[r], this, n);
  return !0;
};
function Zd(e, t, n, r) {
  var s, i, o;
  if (Ii(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = Yd(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, rw(c);
  }
  return e;
}
Qe.prototype.addListener = function(t, n) {
  return Zd(this, t, n, !1);
};
Qe.prototype.on = Qe.prototype.addListener;
Qe.prototype.prependListener = function(t, n) {
  return Zd(this, t, n, !0);
};
function sw() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Vd(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = sw.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Qe.prototype.once = function(t, n) {
  return Ii(n), this.on(t, Vd(this, t, n)), this;
};
Qe.prototype.prependOnceListener = function(t, n) {
  return Ii(n), this.prependListener(t, Vd(this, t, n)), this;
};
Qe.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (Ii(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : iw(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
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
function Xd(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? ow(s) : qd(s, s.length);
}
Qe.prototype.listeners = function(t) {
  return Xd(this, t, !0);
};
Qe.prototype.rawListeners = function(t) {
  return Xd(this, t, !1);
};
Qe.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : jd.call(e, t);
};
Qe.prototype.listenerCount = jd;
function jd(e) {
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
  return this._eventsCount > 0 ? Ms(this._events) : [];
};
function qd(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function iw(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function ow(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function aw(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    Wd(e, t, i, { once: !0 }), t !== "error" && cw(e, s, { once: !0 });
  });
}
function cw(e, t, n) {
  typeof e.on == "function" && Wd(e, "error", t, n);
}
function Wd(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var $d = wa.exports, Aw = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", uw = class {
  constructor(e, t, n, r, s, i = 0) {
    _(this, "left");
    _(this, "right");
    _(this, "parent");
    _(this, "hash");
    _(this, "data");
    _(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, $c = uw;
function dw(e) {
  return nn("0x00".concat(e.slice(2)));
}
function lw(e, t) {
  return nn("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function zd(e) {
  if (!e.length)
    return Aw;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = dw(e[i]);
    t.push(new $c(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = lw(n[o].hash, n[o + 1].hash);
      t[i] = new $c(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var hw = "0x00", Kd = "0x01";
function fw(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(nn(t).slice(2));
  return [nn(n), n];
}
function Ln(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [nn(n), n];
}
function zi(e) {
  const t = Kd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function gw(e) {
  const t = Kd.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Ki(e) {
  return e.slice(0, 4) === hw;
}
var pw = class {
  constructor(e, t, n, r, s) {
    _(this, "SideNodes");
    _(this, "NonMembershipLeafData");
    _(this, "BitMask");
    _(this, "NumSideNodes");
    _(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, mw = pw, ww = class {
  constructor(e, t, n) {
    _(this, "SideNodes");
    _(this, "NonMembershipLeafData");
    _(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, Ew = ww, _t = "0x0000000000000000000000000000000000000000000000000000000000000000", zt = 256;
function Zn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 8 - 1 - t % 8) > 0 ? 1 : 0;
}
function Iw(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function yw(e, t) {
  let n = 0;
  for (let r = 0; r < zt && Zn(e, r) === Zn(t, r); r += 1)
    n += 1;
  return n;
}
function Bw(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === _t ? t.push(0) : (n.push(r), t.push(1));
  return new mw(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var Cw = class {
  constructor() {
    _(this, "ms");
    _(this, "root");
    const e = {};
    this.ms = e, this.root = _t, this.ms[this.root] = _t;
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
    if (t === _t)
      return [n, _t, "", ""];
    let r = this.get(t);
    if (Ki(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let h = 0; h < zt; h += 1) {
      if ([s, i] = gw(r), Zn(e, h) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === _t) {
        r = "";
        break;
      }
      if (r = this.get(o), Ki(r))
        break;
    }
    const d = this.get(c);
    return [Iw(n), o, r, d];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === _t)
      return this.root;
    const [s] = zi(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", d = "", h = !1;
    for (let E = 0; E < t.length; E += 1)
      if (t[E] !== "") {
        if (c = t[E], o === "")
          if (d = this.get(c), Ki(d)) {
            i = c, o = c;
            continue;
          } else
            o = _t, h = !0;
        !h && c === _t || (h || (h = !0), Zn(e, t.length - 1 - E) === 1 ? [i, o] = Ln(c, o) : [i, o] = Ln(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = _t), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(nn(t), t), [i, o] = fw(e, t), this.set(i, o), o = i;
    let c;
    if (r === _t)
      c = zt;
    else {
      const [d] = zi(s);
      c = yw(e, d);
    }
    c !== zt && (Zn(e, c) === 1 ? [i, o] = Ln(r, o) : [i, o] = Ln(o, r), this.set(i, o), o = i);
    for (let d = 0; d < zt; d += 1) {
      let h;
      const E = zt - n.length;
      if (d - E < 0 || n[d - E] === "")
        if (c !== zt && c > zt - 1 - d)
          h = _t;
        else
          continue;
      else
        h = n[d - E];
      Zn(e, zt - 1 - d) === 1 ? [i, o] = Ln(h, o) : [i, o] = Ln(o, h), this.set(i, o), o = i;
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
    if (n !== _t) {
      const [d] = zi(r);
      d !== e && (o = r);
    }
    return new Ew(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return Bw(t);
  }
}, bw = Object.defineProperty, Qw = (e, t, n) => t in e ? bw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Me = (e, t, n) => (Qw(e, typeof t != "symbol" ? t + "" : t, n), n), Ea = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, De = (e, t, n) => (Ea(e, t, "read from private field"), n ? n.call(e) : t.get(e)), gn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Lt = (e, t, n, r) => (Ea(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Qo = (e, t, n) => (Ea(e, t, "access private method"), n), Ia = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = Q(n);
  return {
    assetId: Z(t),
    amount: s.lt(1) ? Q(1) : s,
    max: r ? Q(r) : void 0
  };
}, xw = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, e0 = ie`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, t0 = ie`
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
    `, vw = ie`
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
    receipts {
      ...receiptFragment
    }
    programState {
      returnType
      data
    }
    receipts {
      ...receiptFragment
    }
  }
  ... on FailureStatus {
    block {
      id
    }
    time
    reason
    receipts {
      ...receiptFragment
    }
  }
  ... on SqueezedOutStatus {
    reason
  }
}
    ${t0}`, cs = ie`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${vw}`, _w = ie`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Dw = ie`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${_w}`, Rw = ie`
    fragment dryRunFailureStatusFragment on DryRunFailureStatus {
  reason
  programState {
    returnType
    data
  }
}
    `, Sw = ie`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  programState {
    returnType
    data
  }
}
    `, Nw = ie`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${Rw}
${Sw}`, kw = ie`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${Nw}
${t0}`, ya = ie`
    fragment coinFragment on Coin {
  __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, Mw = ie`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Ow = ie`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, Tw = ie`
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
    `, n0 = ie`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, yi = ie`
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
    `, Lw = ie`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
}
    `, Fw = ie`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Pw = ie`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, Uw = ie`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, Gw = ie`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, Hw = ie`
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
    `, Jw = ie`
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
    ${Hw}`, Yw = ie`
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
    ${Lw}
${Fw}
${Pw}
${Uw}
${Gw}
${Jw}`, Zw = ie`
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
    ${yi}
${Yw}`, Vw = ie`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Xw = ie`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, jw = ie`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, qw = ie`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, Ww = ie`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${jw}`, $w = ie`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${Zw}`, zw = ie`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${cs}`, Kw = ie`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${cs}`, eE = ie`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${cs}`, tE = ie`
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
    ${Xw}
${cs}`, nE = ie`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Dw}`, rE = ie`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${yi}`, sE = ie`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${yi}
${cs}`, iE = ie`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${yi}`, oE = ie`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${ya}`, aE = ie`
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
    ${ya}`, cE = ie`
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
    ${ya}
${Mw}`, AE = ie`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, uE = ie`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${Vw}`, dE = ie`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${n0}`, lE = ie`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, hE = ie`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, fE = ie`
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
    ${n0}`, gE = ie`
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
    ${Ow}`, pE = ie`
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
    ${Tw}`, mE = ie`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, wE = ie`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean) {
  dryRun(txs: $encodedTransactions, utxoValidation: $utxoValidation) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${kw}`, EE = ie`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, IE = ie`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, yE = ie`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${e0}`, BE = ie`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${e0}`;
function CE(e) {
  return {
    getVersion(t, n) {
      return e(qw, t, n);
    },
    getNodeInfo(t, n) {
      return e(Ww, t, n);
    },
    getChain(t, n) {
      return e($w, t, n);
    },
    getTransaction(t, n) {
      return e(zw, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(Kw, t, n);
    },
    getTransactions(t, n) {
      return e(eE, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(tE, t, n);
    },
    estimatePredicates(t, n) {
      return e(nE, t, n);
    },
    getBlock(t, n) {
      return e(rE, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(sE, t, n);
    },
    getBlocks(t, n) {
      return e(iE, t, n);
    },
    getCoin(t, n) {
      return e(oE, t, n);
    },
    getCoins(t, n) {
      return e(aE, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(cE, t, n);
    },
    getContract(t, n) {
      return e(AE, t, n);
    },
    getContractBalance(t, n) {
      return e(uE, t, n);
    },
    getBalance(t, n) {
      return e(dE, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(lE, t, n);
    },
    estimateGasPrice(t, n) {
      return e(hE, t, n);
    },
    getBalances(t, n) {
      return e(fE, t, n);
    },
    getMessages(t, n) {
      return e(gE, t, n);
    },
    getMessageProof(t, n) {
      return e(pE, t, n);
    },
    getMessageStatus(t, n) {
      return e(mE, t, n);
    },
    dryRun(t, n) {
      return e(wE, t, n);
    },
    submit(t, n) {
      return e(EE, t, n);
    },
    produceBlocks(t, n) {
      return e(IE, t, n);
    },
    submitAndAwait(t, n) {
      return e(yE, t, n);
    },
    statusChange(t, n) {
      return e(BE, t, n);
    }
  };
}
var r0 = class {
  constructor(e) {
    _(this, "stream");
    _(this, "events", []);
    _(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: xd(t),
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
        const { data: o, errors: c } = this.events.shift();
        if (Array.isArray(c))
          throw new x(
            x.CODES.INVALID_REQUEST,
            c.map((d) => d.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = r0.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new x(
            R.STREAM_PARSING_ERROR,
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
}, s0 = r0;
Me(s0, "textDecoder", new TextDecoder());
var Qn = {}, bE = 30 * 1e3, QE = class {
  constructor(e = bE) {
    _(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new x(
        R.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = Z(e);
    if (Qn[n]) {
      if (!t || Qn[n].expires > Date.now())
        return Qn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = Z(e);
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
    const t = Z(e);
    delete Qn[t];
  }
}, xE = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case me.Coin: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x");
      return {
        type: me.Coin,
        txID: Z(J(e.id).slice(0, Cn)),
        outputIndex: Ft(J(e.id).slice(Cn, co)),
        owner: Z(e.owner),
        amount: Q(e.amount),
        assetId: Z(e.assetId),
        txPointer: {
          blockHeight: Ft(J(e.txPointer).slice(0, 8)),
          txIndex: Ft(J(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: Q(n.length),
        predicateDataLength: Q(r.length),
        predicate: Z(n),
        predicateData: Z(r)
      };
    }
    case me.Contract:
      return {
        type: me.Contract,
        txID: Re,
        outputIndex: 0,
        balanceRoot: Re,
        stateRoot: Re,
        txPointer: {
          blockHeight: Ft(J(e.txPointer).slice(0, 8)),
          txIndex: Ft(J(e.txPointer).slice(8, 16))
        },
        contractID: Z(e.contractId)
      };
    case me.Message: {
      const n = J(e.predicate ?? "0x"), r = J(e.predicateData ?? "0x"), s = J(e.data ?? "0x");
      return {
        type: me.Message,
        sender: Z(e.sender),
        recipient: Z(e.recipient),
        amount: Q(e.amount),
        nonce: Z(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: Q(e.predicateGasUsed),
        predicateLength: Q(n.length),
        predicateDataLength: Q(r.length),
        predicate: Z(n),
        predicateData: Z(r),
        data: Z(s),
        dataLength: s.length
      };
    }
    default:
      throw new x(
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, vE = (e) => {
  const { type: t } = e;
  switch (t) {
    case Be.Coin:
      return {
        type: Be.Coin,
        to: Z(e.to),
        amount: Q(e.amount),
        assetId: Z(e.assetId)
      };
    case Be.Contract:
      return {
        type: Be.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Re,
        stateRoot: Re
      };
    case Be.Change:
      return {
        type: Be.Change,
        to: Z(e.to),
        amount: Q(0),
        assetId: Z(e.assetId)
      };
    case Be.Variable:
      return {
        type: Be.Variable,
        to: Re,
        amount: Q(0),
        assetId: Re
      };
    case Be.ContractCreated:
      return {
        type: Be.ContractCreated,
        contractId: Z(e.contractId),
        stateRoot: Z(e.stateRoot)
      };
    default:
      throw new x(
        R.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, eB = (e) => "utxoId" in e, tB = (e) => "recipient" in e, _E = (e) => "id" in e, nB = (e) => "recipient" in e, DE = (e) => e.type === Ae.Revert && e.val.toString("hex") === kd, RE = (e) => e.type === Ae.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", zc = (e) => e.reduce(
  (t, n) => (DE(n) && t.missingOutputVariables.push(n), RE(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || Re;
function SE(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: Ae.Call,
        from: xe(e.id || e.contractId),
        to: xe(e == null ? void 0 : e.to),
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
        type: Ae.Return,
        id: xe(e.id || e.contractId),
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "RETURN_DATA":
      return {
        type: Ae.ReturnData,
        id: xe(e.id || e.contractId),
        ptr: Q(e.ptr),
        len: Q(e.len),
        digest: xe(e.digest),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "PANIC":
      return {
        type: Ae.Panic,
        id: xe(e.id),
        reason: Q(e.reason),
        pc: Q(e.pc),
        is: Q(e.is),
        contractId: xe(e.contractId)
      };
    case "REVERT":
      return {
        type: Ae.Revert,
        id: xe(e.id || e.contractId),
        val: Q(e.ra),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "LOG":
      return {
        type: Ae.Log,
        id: xe(e.id || e.contractId),
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
        id: xe(e.id || e.contractId),
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
        type: Ae.Transfer,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || (e == null ? void 0 : e.to)),
        amount: Q(e.amount),
        assetId: xe(e.assetId),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: Ae.TransferOut,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || e.to),
        amount: Q(e.amount),
        assetId: xe(e.assetId),
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
      const n = xe(e.sender), r = xe(e.recipient), s = xe(e.nonce), i = Q(e.amount), o = e.data ? J(e.data) : Uint8Array.from([]), c = xe(e.digest), d = $s.getMessageId({
        sender: n,
        recipient: r,
        nonce: s,
        amount: i,
        data: o
      });
      return {
        type: Ae.MessageOut,
        sender: n,
        recipient: r,
        amount: i,
        nonce: s,
        data: o,
        digest: c,
        messageId: d
      };
    }
    case "MINT": {
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = Pr.getAssetId(n, r);
      return {
        type: Ae.Mint,
        subId: r,
        contractId: n,
        assetId: s,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    case "BURN": {
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = go.getAssetId(n, r);
      return {
        type: Ae.Burn,
        subId: r,
        contractId: n,
        assetId: s,
        val: Q(e.val),
        pc: Q(e.pc),
        is: Q(e.is)
      };
    }
    default:
      throw new x(R.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var NE = "https://fuellabs.github.io/block-explorer-v2", kE = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, rB = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || NE, d = [
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
  ], h = d.filter((j) => !!j.value).map(({ key: j, value: O }) => ({
    key: j,
    value: O
  })), E = h.length > 0;
  if (h.length > 1)
    throw new x(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((j) => j.key).join(", ")}.`
    );
  if (n && h.length > 0) {
    const j = d.map(({ key: O }) => O).join(", ");
    throw new x(
      R.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${j}.`
    );
  }
  const m = E ? kE(
    h[0].key,
    h[0].value
  ) : "", b = /^\/|\/$/gm, v = n ? n.replace(b, "") : m, D = c.replace(b, ""), C = r == null ? void 0 : r.replace(b, ""), k = C ? encodeURIComponent(C) : void 0, N = D.match(/^https?:\/\//) ? "" : "https://", V = C != null && C.match(/^https?:\/\//) ? "" : "https://";
  return `${N}${D}/${v}${k ? `?providerUrl=${V}${k}` : ""}`;
}, i0 = (e) => e.filter(
  (r) => r.type === Ae.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), Q(0));
function Bn(e, t) {
  const n = Q(t.base);
  let r = Q(0);
  return t.__typename === "LightOperation" && (r = Q(e).div(Q(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = Q(e).mul(Q(t.gasPerUnit))), n.add(r);
}
function ME(e, t, n) {
  const r = [], s = e.filter((c) => {
    if ("owner" in c || "sender" in c) {
      if ("predicate" in c && c.predicate && c.predicate !== "0x")
        return !0;
      if (!r.includes(c.witnessIndex))
        return r.push(c.witnessIndex), !0;
    }
    return !1;
  }), i = Bn(t, n.vmInitialization);
  return s.reduce((c, d) => "predicate" in d && d.predicate && d.predicate !== "0x" ? c.add(
    i.add(Bn(J(d.predicate).length, n.contractRoot)).add(Q(d.predicateGasUsed))
  ) : c.add(n.ecr1), Q(0));
}
function o0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = Bn(i, t.vmInitialization), c = Q(i).mul(n), d = ME(r, i, t);
  return o.add(c).add(d).add(s).maxU64();
}
function Ba(e) {
  const {
    gasPerByte: t,
    witnessesLength: n,
    witnessLimit: r,
    minGas: s,
    gasLimit: i = Q(0),
    maxGasPerTx: o
  } = e;
  let c = Q(0);
  r != null && r.gt(0) && r.gte(n) && (c = Q(r).sub(n).mul(t));
  const d = c.add(s).add(i);
  return d.gte(o) ? o : d;
}
function a0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = Bn(r, e.contractRoot), i = Bn(t, e.stateRoot), o = Bn(n, e.s256), c = Q(4 + 32 + 32 + 32), d = Bn(c, e.s256);
  return s.add(i).add(o).add(d).maxU64();
}
function c0({
  gasCosts: e,
  txBytesSize: t
}) {
  return Bn(t, e.s256);
}
var ti = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(s);
};
function xo(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = Z(e[t]);
        break;
      case "Array":
        e[t] = xo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = xo(e[t]);
        break;
    }
  }), e;
}
function OE(e) {
  return xo(yn(e));
}
function TE(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var LE = (e) => {
  let t = `The transaction reverted with reason: "${e.reason}".`;
  const n = e.reason;
  return pm.includes(e.reason) && (t = `${t}

You can read more about this error at:

${mm}#variant.${e.reason}`), { errorMessage: t, reason: n };
}, vr = (e) => JSON.stringify(e, null, 2), FE = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === Ae.Revert);
  let s = "";
  if (r)
    switch (Q(r.val).toHex()) {
      case lm: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? vr(t[0]) : "an error."}.`;
        break;
      }
      case hm: {
        const o = t.length >= 2 ? ` comparing ${vr(t[1])} and ${vr(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case gm: {
        const o = t.length >= 2 ? ` comparing ${vr(t[1])} and ${vr(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case fm:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case kd:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, A0 = (e) => {
  const { receipts: t, status: n, logs: r } = e, s = t.some(({ type: h }) => h === Ae.Panic), i = t.some(({ type: h }) => h === Ae.Revert), { errorMessage: o, reason: c } = (n == null ? void 0 : n.type) === "FailureStatus" && s ? LE(n) : FE(t, r), d = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: c
  };
  return new x(R.SCRIPT_REVERTED, o, d);
}, sB = class extends Error {
  constructor() {
    super(...arguments);
    _(this, "name", "ChangeOutputCollisionError");
    _(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, PE = class extends Error {
  constructor(t) {
    super();
    _(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, iB = class extends Error {
  constructor(t) {
    super();
    _(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, UE = (e) => {
  const t = J(e);
  return {
    data: Z(t),
    dataLength: t.length
  };
}, Hr = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: e,
    maturity: t,
    maxFee: n,
    witnessLimit: r,
    inputs: s,
    outputs: i,
    witnesses: o
  } = {}) {
    /** Gas price for transaction */
    _(this, "tip");
    /** Block until which tx cannot be included */
    _(this, "maturity");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    _(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    _(this, "witnessLimit");
    /** List of inputs */
    _(this, "inputs", []);
    /** List of outputs */
    _(this, "outputs", []);
    /** List of witnesses */
    _(this, "witnesses", []);
    this.tip = Q(e), this.maturity = t ?? 0, this.witnessLimit = r ? Q(r) : void 0, this.maxFee = n ? Q(n) : void 0, this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [];
    return e.tip && (t += Ot.Tip, n.push({ data: e.tip, type: Ot.Tip })), e.witnessLimit && (t += Ot.WitnessLimit, n.push({ data: e.witnessLimit, type: Ot.WitnessLimit })), e.maturity > 0 && (t += Ot.Maturity, n.push({ data: e.maturity, type: Ot.Maturity })), e.maxFee && (t += Ot.MaxFee, n.push({ data: e.maxFee, type: Ot.MaxFee })), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(xE)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(vE)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(UE)) ?? [], { policyTypes: r, policies: s } = Hr.getPolicyMeta(this);
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
    return new bn().encode(this.toTransaction());
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
    return this.addWitness(re([Re, Re])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = ue.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new PE(e);
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
      (e) => e.type === me.Coin
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
        case me.Coin:
          return Z(r.owner) === t.toB256();
        case me.Message:
          return Z(r.recipient) === t.toB256();
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
   */
  addCoinInput(e) {
    const { assetId: t, owner: n, amount: r } = e;
    let s;
    e.predicate ? s = 0 : (s = this.getCoinInputWitnessIndexByOwner(n), typeof s != "number" && (s = this.addEmptyWitness()));
    const i = {
      ...e,
      type: me.Coin,
      owner: n.toB256(),
      amount: r,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: s
    };
    this.pushInput(i), this.addChangeOutput(n, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: n, amount: r, assetId: s } = e;
    let i;
    e.predicate ? i = 0 : (i = this.getCoinInputWitnessIndexByOwner(t), typeof i != "number" && (i = this.addEmptyWitness()));
    const o = {
      ...e,
      type: me.Message,
      sender: n.toB256(),
      recipient: t.toB256(),
      amount: r,
      witnessIndex: i
    };
    this.pushInput(o), this.addChangeOutput(t, s);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return _E(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
  addCoinOutput(e, t, n) {
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
    return t.map(Ia).forEach((n) => {
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
  addChangeOutput(e, t) {
    this.getChangeOutputs().find(
      (r) => Z(r.assetId) === t
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
    return o0({
      gasPerByte: r,
      gasCosts: t,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(t)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: n } = e, { gasPerByte: r, maxGasPerTx: s } = n, i = this.toTransaction().witnesses.reduce(
      (o, c) => o + c.dataLength,
      0
    );
    return Ba({
      gasPerByte: r,
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
  fundWithFakeUtxos(e, t, n) {
    const r = (i) => this.inputs.find((o) => "assetId" in o ? o.assetId === i : !1), s = (i, o) => {
      const c = r(i);
      let d = o;
      i === t && (d = Q("1000000000000000000")), c && "assetId" in c ? (c.id = Z(jt(co)), c.amount = d) : this.addResources([
        {
          id: Z(jt(co)),
          amount: d,
          assetId: i,
          owner: n || ue.fromRandom(),
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
    return OE(this);
  }
  updatePredicateGasUsed(e) {
    this.inputs.forEach((t) => {
      let n;
      switch (t.type) {
        case me.Coin:
          n = e.find((r) => r.type === me.Coin && r.owner === t.owner);
          break;
        case me.Message:
          n = e.find(
            (r) => r.type === me.Message && r.sender === t.sender
          );
          break;
        default:
          return;
      }
      n && "predicateGasUsed" in n && Q(n.predicateGasUsed).gt(0) && (t.predicate = n.predicate, t.predicateData = n.predicateData, t.predicateGasUsed = n.predicateGasUsed);
    });
  }
  shiftPredicateData() {
    this.inputs.forEach((e) => {
      "predicateData" in e && "padPredicateData" in e && typeof e.padPredicateData == "function" && (e.predicateData = e.padPredicateData(
        Hr.getPolicyMeta(this).policies.length
      ));
    });
  }
};
function u0(e, t) {
  const n = e.toTransaction();
  n.type === ft.Script && (n.receiptsRoot = Re), n.inputs = n.inputs.map((i) => {
    const o = yn(i);
    switch (o.type) {
      case me.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = Q(0), o;
      case me.Message:
        return o.predicateGasUsed = Q(0), o;
      case me.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Re, o.outputIndex = 0, o.balanceRoot = Re, o.stateRoot = Re, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = yn(i);
    switch (o.type) {
      case Be.Contract:
        return o.balanceRoot = Re, o.stateRoot = Re, o;
      case Be.Change:
        return o.amount = Q(0), o;
      case Be.Variable:
        return o.to = Re, o.amount = Q(0), o.assetId = Re, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = Hf(t), s = re([r, new bn().encode(n)]);
  return yt(s);
}
var GE = (e) => {
  const t = new Uint8Array(32);
  return t.set(J(e)), t;
}, HE = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: Z(t),
    value: Z(GE(n))
  };
}, vo = class extends Hr {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    _(this, "type", ft.Create);
    /** Witness index of contract bytecode to create */
    _(this, "bytecodeWitnessIndex");
    /** Salt */
    _(this, "salt");
    /** List of storage slots to initialize */
    _(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = Z(n ?? Re), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(HE)) ?? [];
    return {
      type: ft.Create,
      ...t,
      bytecodeWitnessIndex: n,
      storageSlotsCount: Q(r.length),
      salt: this.salt ? Z(this.salt) : Re,
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
    return u0(this, t);
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
    return a0({
      contractBytesSize: Q(J(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Kc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: J("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, JE = {
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
}, $n = class extends Hr {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    _(this, "type", ft.Script);
    /** Gas limit for transaction */
    _(this, "gasLimit");
    /** Script to execute */
    _(this, "script");
    /** Script input data (parameters) */
    _(this, "scriptData");
    _(this, "abis");
    this.gasLimit = Q(r), this.script = J(t ?? Kc.bytes), this.scriptData = J(n ?? Kc.encodeScriptData()), this.abis = s.abis;
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
      scriptLength: Q(t.length),
      scriptDataLength: Q(n.length),
      receiptsRoot: Re,
      script: Z(t),
      scriptData: Z(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (t) => t.type === me.Contract
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
    const { consensusParameters: r } = t, { gasPerByte: s, maxGasPerTx: i } = r, o = this.toTransaction().witnesses.reduce(
      (c, d) => c + d.dataLength,
      0
    );
    return Ba({
      gasPerByte: s,
      minGas: n,
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
    const n = Dr(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: me.Contract,
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
    return u0(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new rn(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return c0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, xt = (e) => {
  if (e instanceof $n || e instanceof vo)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case ft.Script:
      return $n.from(e);
    case ft.Create:
      return vo.from(e);
    default:
      throw new x(R.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, YE = (e, t) => e.reduce(
  (n, r) => (r.type === me.Coin && r.owner === t && n.utxos.push(r.id), r.type === me.Message && r.recipient === t && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), ZE = (e) => {
  var T;
  const {
    gasPrice: t,
    rawPayload: n,
    tip: r,
    consensusParameters: { gasCosts: s, feeParams: i, maxGasPerTx: o }
  } = e, c = Q(i.gasPerByte), d = Q(i.gasPriceFactor), h = J(n), [E] = new bn().decode(h, 0);
  if (E.type === ft.Mint)
    return {
      fee: Q(0),
      minFee: Q(0),
      maxFee: Q(0)
    };
  const { type: m, witnesses: b, inputs: v, policies: D } = E;
  let C = Q(0), k = Q(0);
  if (m === ft.Create) {
    const { bytecodeWitnessIndex: F, storageSlots: q } = E, G = Q(J(b[F].data).length);
    C = a0({
      contractBytesSize: G,
      gasCosts: s,
      stateRootSize: q.length || 0,
      txBytesSize: h.length
    });
  } else {
    const { scriptGasLimit: F } = E;
    F && (k = F), C = c0({
      gasCosts: s,
      txBytesSize: h.length
    });
  }
  const N = o0({
    gasCosts: s,
    gasPerByte: Q(c),
    inputs: v,
    metadataGas: C,
    txBytesSize: h.length
  }), V = (T = D.find((F) => F.type === Ot.WitnessLimit)) == null ? void 0 : T.data, P = b.reduce((F, q) => F + q.dataLength, 0), j = Ba({
    gasPerByte: c,
    minGas: N,
    witnessesLength: P,
    gasLimit: k,
    witnessLimit: V,
    maxGasPerTx: o
  }), O = ti({
    gasPrice: t,
    gas: N,
    priceFactor: d,
    tip: r
  }), M = ti({
    gasPrice: t,
    gas: j,
    priceFactor: d,
    tip: r
  });
  return {
    minFee: O,
    maxFee: M,
    fee: M
  };
}, VE = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var m;
  const s = new rn(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let d;
  if (o.isInputDataPointer) {
    if (n) {
      const b = Q(t.param2).sub(fi({ maxInputs: r.toNumber() })).toNumber();
      d = `0x${n.slice(2).slice(b * 2)}`;
    }
  } else
    d = t.param2.toHex();
  let h;
  if (d) {
    const b = o.decodeArguments(d);
    b && (h = c.reduce((v, D, C) => {
      const k = b[C], N = D.name;
      return N ? {
        ...v,
        // reparse to remove bn
        [N]: JSON.parse(JSON.stringify(k))
      } : v;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: h,
    ...(m = t.amount) != null && m.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function XE(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function Ca(e, t) {
  return e.filter((n) => n.type === t);
}
function jE(e) {
  return Ca(e, me.Coin);
}
function qE(e) {
  return Ca(e, me.Message);
}
function WE(e) {
  return XE(e, [me.Coin, me.Message]);
}
function $E(e) {
  return Ca(e, me.Contract);
}
function d0(e, t) {
  const n = jE(e), r = qE(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function zE(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== me.Contract)
      throw new x(
        R.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function ba(e) {
  return e.type === me.Coin ? e.owner.toString() : e.type === me.Message ? e.recipient.toString() : "";
}
function As(e, t) {
  return e.filter((n) => n.type === t);
}
function KE(e) {
  return As(e, Be.ContractCreated);
}
function l0(e) {
  return As(e, Be.Coin);
}
function eI(e) {
  return As(e, Be.Change);
}
function tI(e) {
  return As(e, Be.Contract);
}
function oB(e) {
  return As(e, Be.Variable);
}
var nI = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e))(nI || {}), rI = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(rI || {}), sI = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(sI || {}), iI = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(iI || {}), oI = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(oI || {});
function Jr(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function h0(e) {
  switch (e) {
    case ft.Mint:
      return "Mint";
    case ft.Create:
      return "Create";
    case ft.Script:
      return "Script";
    default:
      throw new x(
        R.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function Qa(e, t) {
  return h0(e) === t;
}
function aI(e) {
  return Qa(
    e,
    "Mint"
    /* Mint */
  );
}
function f0(e) {
  return Qa(
    e,
    "Create"
    /* Create */
  );
}
function g0(e) {
  return Qa(
    e,
    "Script"
    /* Script */
  );
}
function aB(e) {
  return (t) => e.assetId === t.assetId;
}
function cI(e) {
  return Jr(e, Ae.Call);
}
function AI(e) {
  return Jr(e, Ae.MessageOut);
}
var uI = (e, t) => {
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
function dI(e, t) {
  var n, r, s, i, o, c, d, h;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((d = e.to) == null ? void 0 : d.type) === ((h = t.to) == null ? void 0 : h.type);
}
function pr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => dI(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? uI(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function cB(e) {
  return Jr(e, Ae.TransferOut);
}
function lI({
  inputs: e,
  receipts: t
}) {
  return AI(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = d0(e, o);
      if (c) {
        const d = ba(c);
        return pr(s, {
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
function hI({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = cI(n);
  return tI(t).reduce((h, E) => {
    const m = zE(e, E.inputIndex);
    return m ? o.reduce((v, D) => {
      var C;
      if (D.to === m.contractID) {
        const k = d0(e, D.assetId);
        if (k) {
          const N = ba(k), V = [], P = r == null ? void 0 : r[m.contractID];
          return P && V.push(
            VE({
              abi: P,
              receipt: D,
              rawPayload: s,
              maxInputs: i
            })
          ), pr(v, {
            name: "Contract call",
            from: {
              type: 1,
              address: N
            },
            to: {
              type: 0,
              address: D.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (C = D.amount) != null && C.isZero() ? void 0 : [
              {
                amount: D.amount,
                assetId: D.assetId
              }
            ],
            calls: V
          });
        }
      }
      return v;
    }, h) : h;
  }, []);
}
function fI(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((h) => h.contractID === r) ? 0 : 1;
  if (Re === o) {
    const h = n.find((E) => E.assetId === s);
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
function eA({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = l0(t), i = $E(e), o = eI(t);
  s.forEach((h) => {
    const { amount: E, assetId: m, to: b } = h, v = o.find((D) => D.assetId === m);
    v && (r = pr(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: v.to
      },
      to: {
        type: 1,
        address: b
      },
      assetsSent: [
        {
          assetId: m,
          amount: E
        }
      ]
    }));
  });
  const c = Jr(
    n,
    Ae.Transfer
  ), d = Jr(
    n,
    Ae.TransferOut
  );
  return [...c, ...d].forEach((h) => {
    const E = fI(h, i, o);
    r = pr(r, E);
  }), r;
}
function gI(e) {
  return l0(e).reduce((r, s) => pr(r, {
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
function pI({ inputs: e, outputs: t }) {
  const n = KE(t), r = WE(e)[0], s = ba(r);
  return n.reduce((o, c) => pr(o, {
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
function mI({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return f0(e) ? [
    ...pI({ inputs: t, outputs: n }),
    ...eA({ inputs: t, outputs: n, receipts: r })
  ] : g0(e) ? [
    ...eA({ inputs: t, outputs: n, receipts: r }),
    ...hI({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...lI({ inputs: t, receipts: r })
  ] : [...gI(n)];
}
var pn = (e) => {
  const t = SE(e);
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
}, wI = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, EI = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === Ae.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, II = (e) => {
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
}, yI = (e) => {
  let t, n, r, s = !1, i = !1, o = !1;
  if (e != null && e.type)
    switch (r = II(e.type), e.type) {
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
function Bi(e) {
  var B, a;
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
    gasCosts: E,
    maxGasPerTx: m,
    gasPrice: b
  } = e, v = i0(n), D = Z(o), C = mI({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: D,
    abiMap: d,
    maxInputs: h
  }), k = h0(i.type), N = Q((a = (B = i.policies) == null ? void 0 : B.find((A) => A.type === Ot.Tip)) == null ? void 0 : a.data), { fee: V } = ZE({
    gasPrice: b,
    rawPayload: D,
    tip: N,
    consensusParameters: {
      gasCosts: E,
      maxGasPerTx: m,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), { isStatusFailure: P, isStatusPending: j, isStatusSuccess: O, blockId: M, status: T, time: F } = yI(c), q = wI(n), G = EI(n);
  let Y;
  return F && (Y = Mo.fromTai64(F)), {
    id: t,
    fee: V,
    gasUsed: v,
    operations: C,
    type: k,
    blockId: M,
    time: F,
    status: T,
    receipts: n,
    mintedAssets: q,
    burnedAssets: G,
    isTypeMint: aI(i.type),
    isTypeCreate: f0(i.type),
    isTypeScript: g0(i.type),
    isStatusFailure: P,
    isStatusSuccess: O,
    isStatusPending: j,
    date: Y,
    transaction: i
  };
}
function p0(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === Ae.LogData || s.type === Ae.Log) {
      const i = new rn(n[s.id] || t), o = s.type === Ae.Log ? new S("u64").encode(s.val0) : s.data, [c] = i.decodeLog(o, s.val1.toNumber());
      r.push(c);
    }
    return r;
  }, []);
}
var Os = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    _(this, "id");
    /** Current provider */
    _(this, "provider");
    /** Gas used on the transaction */
    _(this, "gasUsed", Q(0));
    /** The graphql Transaction with receipts object. */
    _(this, "gqlTransaction");
    _(this, "abis");
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
    const r = new Os(e, t, n);
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
    return (t = new bn().decode(
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
    let t = this.gqlTransaction;
    t || (t = await this.fetch());
    const n = this.decodeTransaction(
      t
    );
    let r = [];
    t != null && t.status && "receipts" in t.status && (r = t.status.receipts);
    const s = r.map(pn) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: d } = this.provider.getGasConfig(), h = await this.provider.getLatestGasPrice(), E = this.provider.getChain().consensusParameters.maxInputs;
    return Bi({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: J(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: E,
      gasCosts: c,
      maxGasPerTx: d,
      gasPrice: h
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
        throw new x(
          R.TRANSACTION_SQUEEZED_OUT,
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
    if (this.abis && (r = p0(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r), n.isStatusFailure) {
      const {
        receipts: s,
        gqlTransaction: { status: i }
      } = n;
      throw A0({
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
function BI(e, t) {
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
function m0(e, t, n = 0) {
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
      const d = BI(t, c);
      return await TE(d), m0(e, t, c)(...r);
    }
  };
}
var CI = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, tA = 10, bI = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, { contractParams: i, feeParams: o, predicateParams: c, scriptParams: d, txParams: h, gasCosts: E } = r;
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
      baseAssetId: r.baseAssetId,
      gasCosts: E
    },
    gasCosts: E,
    latestBlock: {
      id: s.id,
      height: Q(s.height),
      time: s.header.time,
      transactions: s.transactions.map((m) => ({
        id: m.id
      }))
    }
  };
}, _o, w0, Zt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, gn(this, _o), Me(this, "operations"), Me(this, "cache"), Me(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new QE(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Zt.nodeInfoCache = {}, Zt.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return m0(async (...r) => {
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
    const n = new Zt(e, t);
    return await n.fetchChainAndNodeInfo(), n;
  }
  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const e = Zt.chainInfoCache[this.url];
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
    const e = Zt.nodeInfoCache[this.url];
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
    const { maxGasPerTx: e, maxGasPerPredicate: t, gasPriceFactor: n, gasPerByte: r, gasCosts: s } = this.getChain().consensusParameters;
    return {
      maxGasPerTx: e,
      maxGasPerPredicate: t,
      gasPriceFactor: n,
      gasPerByte: r,
      gasCosts: s
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
    return Zt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = $0(e.nodeVersion);
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
    const e = Zt.getFetchFn(this.options), t = new rm.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options)
    });
    return CE((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new s0({
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
    } = await this.getChain(), n = new Rn(e, t.toNumber());
    return Promise.resolve(n);
  }
  /**
   * Returns the block number.
   *
   * @returns A promise that resolves to the block number
   */
  async getBlockNumber() {
    const { chain: e } = await this.operations.getChain();
    return Q(e.latestBlock.height, 10);
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
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Zt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = bI(e);
    return Zt.chainInfoCache[this.url] = t, t;
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
    const r = xt(e);
    Qo(this, _o, w0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = Z(r.toTransactionBytes());
    let i;
    if (r.type === ft.Script && (i = r.abis), n) {
      const c = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: E } of c) {
        if (E.type === "SqueezedOutStatus")
          throw new x(
            R.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${E.reason}`
          );
        if (E.type !== "SubmittedStatus")
          break;
      }
      const d = r.getTransactionId(this.getChainId()), h = new Os(d, this, i);
      return await h.fetch(), h;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Os(o, this, i);
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
    const r = xt(e);
    if (n)
      return this.estimateTxDependencies(r);
    const s = Z(r.toTransactionBytes()), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: t || !1
    }), [{ receipts: o, status: c }] = i;
    return { receipts: o.map(pn), dryrunStatus: c };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !hd(J(i.predicate), J("0x")) && new Te(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = Z(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
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
    let t = [];
    const n = [];
    let r = 0, s;
    for (let i = 0; i < tA; i++) {
      const {
        dryRun: [{ receipts: o, status: c }]
      } = await this.operations.dryRun({
        encodedTransactions: [Z(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(pn), s = c;
      const { missingOutputVariables: d, missingOutputContractIds: h } = zc(t);
      if (d.length !== 0 || h.length !== 0) {
        r += d.length, e.addVariableOutputs(d.length), h.forEach(({ contractId: b }) => {
          e.addContractInputAndOutput(ue.fromString(b)), n.push(b);
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
      outputVariables: r,
      missingContractIds: n,
      dryrunStatus: s
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
      dryrunStatus: void 0
    })), n = yn(e), r = /* @__PURE__ */ new Map();
    n.forEach((o, c) => {
      o.type === ft.Script && r.set(c, Z(o.toTransactionBytes()));
    });
    let s = Array.from(r.keys()), i = 0;
    for (; s.length > 0 && i < tA; ) {
      const o = s.map(
        (h) => r.get(h)
      ), c = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), d = [];
      for (let h = 0; h < c.dryRun.length; h++) {
        const E = s[h], { receipts: m, status: b } = c.dryRun[h], v = t[E];
        v.receipts = m.map(pn), v.dryrunStatus = b;
        const { missingOutputVariables: D, missingOutputContractIds: C } = zc(
          v.receipts
        ), k = D.length > 0 || C.length > 0, N = n[E];
        if (k && (N == null ? void 0 : N.type) === ft.Script) {
          v.outputVariables += D.length, N.addVariableOutputs(D.length), C.forEach(({ contractId: P }) => {
            N.addContractInputAndOutput(ue.fromString(P)), v.missingContractIds.push(P);
          });
          const { maxFee: V } = await this.estimateTxGasAndFee({
            transactionRequest: N
          });
          N.maxFee = V, r.set(E, Z(N.toTransactionBytes())), d.push(E);
        }
      }
      s = d, i += 1;
    }
    return t;
  }
  async dryRunMultipleTransactions(e, { utxoValidation: t, estimateTxDependencies: n = !0 } = {}) {
    if (n)
      return this.estimateMultipleTxDependencies(e);
    const r = e.map((o) => Z(o.toTransactionBytes())), { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: t || !1
    });
    return s.map(({ receipts: o, status: c }) => ({ receipts: o.map(pn), dryrunStatus: c }));
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(e) {
    const { transactionRequest: t } = e;
    let { gasPrice: n } = e;
    const r = this.getChain(), { gasPriceFactor: s, maxGasPerTx: i } = this.getGasConfig(), o = t.calculateMinGas(r);
    n || (n = await this.estimateGasPrice(10));
    const c = ti({
      gasPrice: Q(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let d = Q(0);
    t.type === ft.Script && (d = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), d = t.gasLimit));
    const h = t.calculateMaxGas(r, o), E = ti({
      gasPrice: Q(n),
      gas: h,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: c,
      maxGas: h,
      maxFee: E,
      gasPrice: n,
      gasLimit: d
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
    const n = xt(e);
    if (t)
      return this.estimateTxDependencies(n);
    const r = [Z(n.toTransactionBytes())], { dryRun: s } = await this.operations.dryRun({
      encodedTransactions: r,
      utxoValidation: !0
    });
    return { receipts: s.map((o) => {
      const { id: c, receipts: d, status: h } = o, E = d.map(pn);
      return { id: c, receipts: E, status: h };
    })[0].receipts };
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
  async getTransactionCost(e, { resourcesOwner: t, signatureCallback: n, quantitiesToContract: r = [] } = {}) {
    const s = yn(xt(e)), i = s.type === ft.Script, o = this.getBaseAssetId(), c = s.getCoinOutputsQuantities(), d = CI(c, r);
    s.fundWithFakeUtxos(d, o, t == null ? void 0 : t.address), s.maxFee = Q(0), i && (s.gasLimit = Q(0)), t && "populateTransactionPredicateData" in t && t.populateTransactionPredicateData(s);
    const h = yn(s);
    let E = 0;
    if (n && i) {
      const O = h.witnesses.length;
      await n(h), E = h.witnesses.length - O;
    }
    await this.estimatePredicates(h);
    let { maxFee: m, maxGas: b, minFee: v, minGas: D, gasPrice: C, gasLimit: k } = await this.estimateTxGasAndFee({
      transactionRequest: h
    }), N = [], V = [], P = 0, j = Q(0);
    if (s.updatePredicateGasUsed(h.inputs), s.maxFee = m, i) {
      s.gasLimit = k, n && await n(s);
      const O = await this.estimateTxDependencies(s);
      N = O.receipts, P = O.outputVariables, V = O.missingContractIds, j = i ? i0(N) : j, s.gasLimit = j, { maxFee: m, maxGas: b, minFee: v, minGas: D, gasPrice: C } = await this.estimateTxGasAndFee({
        transactionRequest: s,
        gasPrice: C
      });
    }
    return {
      requiredQuantities: d,
      receipts: N,
      gasUsed: j,
      gasPrice: C,
      minGas: D,
      maxGas: b,
      minFee: v,
      maxFee: m,
      outputVariables: P,
      missingContractIds: V,
      addedSignatures: E,
      estimatedPredicates: s.inputs
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = ue.fromAddressOrString(e), s = xt(yn(t)), i = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
    s.addResources(
      await this.getResourcesToSpend(r, i.requiredQuantities)
    );
    const { requiredQuantities: o, ...c } = await this.getTransactionCost(s, {
      quantitiesToContract: n
    });
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
    const r = ue.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && Z(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: Q(o.amount),
      owner: ue.fromAddressOrString(o.owner),
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
    var d, h, E;
    const r = ue.fromAddressOrString(e), s = {
      messages: ((d = n == null ? void 0 : n.messages) == null ? void 0 : d.map((m) => Z(m))) || [],
      utxos: ((h = n == null ? void 0 : n.utxos) == null ? void 0 : h.map((m) => Z(m))) || []
    };
    if (this.cache) {
      const m = new Set(
        s.utxos.concat((E = this.cache) == null ? void 0 : E.getActiveData().map((b) => Z(b)))
      );
      s.utxos = Array.from(m);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(Ia).map(({ assetId: m, amount: b, max: v }) => ({
        assetId: Z(m),
        amount: b.toString(10),
        max: v ? v.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((m) => {
      switch (m.__typename) {
        case "MessageCoin":
          return {
            amount: Q(m.amount),
            assetId: m.assetId,
            daHeight: Q(m.daHeight),
            sender: ue.fromAddressOrString(m.sender),
            recipient: ue.fromAddressOrString(m.recipient),
            nonce: m.nonce
          };
        case "Coin":
          return {
            id: m.utxoId,
            amount: Q(m.amount),
            assetId: m.assetId,
            owner: ue.fromAddressOrString(m.owner),
            blockCreated: Q(m.blockCreated),
            txCreatedIdx: Q(m.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((m) => !!m);
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
      height: Q(n.height),
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
      height: Q(r.height),
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
      height: Q(n.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new bn().decode(J(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new bn().decode(
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
      contract: ue.fromAddressOrString(e).toB256(),
      asset: Z(t)
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
      owner: ue.fromAddressOrString(e).toB256(),
      assetId: Z(t)
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
      filter: { owner: ue.fromAddressOrString(e).toB256() }
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
      owner: ue.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Fr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: Q(s.amount),
        data: s.data
      }),
      sender: ue.fromAddressOrString(s.sender),
      recipient: ue.fromAddressOrString(s.recipient),
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
      sender: E,
      recipient: m,
      amount: b,
      data: v
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
        messageReceiptCount: Q(c.messageReceiptCount),
        messageOutboxRoot: c.messageOutboxRoot,
        consensusParametersVersion: c.consensusParametersVersion,
        eventInboxRoot: c.eventInboxRoot,
        stateTransitionBytecodeVersion: c.stateTransitionBytecodeVersion
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
        messageReceiptCount: Q(d.messageReceiptCount),
        messageOutboxRoot: d.messageOutboxRoot,
        consensusParametersVersion: d.consensusParametersVersion,
        eventInboxRoot: d.eventInboxRoot,
        stateTransitionBytecodeVersion: d.stateTransitionBytecodeVersion
      },
      sender: ue.fromAddressOrString(E),
      recipient: ue.fromAddressOrString(m),
      nonce: t,
      amount: Q(b),
      data: v
    };
  }
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return Q(e.gasPrice);
  }
  async estimateGasPrice(e) {
    const { estimateGasPrice: t } = await this.operations.estimateGasPrice({
      blockHorizon: String(e)
    });
    return Q(t.gasPrice);
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
      startTimestamp: t ? Mo.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return Q(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Os(e, this);
  }
}, ni = Zt;
_o = /* @__PURE__ */ new WeakSet();
w0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === me.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Me(ni, "chainInfoCache", {});
Me(ni, "nodeInfoCache", {});
async function AB(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new x(
      R.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new bn().decode(
    J(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const c = o.map(pn), {
    consensusParameters: { gasPerByte: d, gasPriceFactor: h, maxInputs: E, gasCosts: m, maxGasPerTx: b }
  } = n.getChain(), v = await n.getLatestGasPrice(), D = Bi({
    id: s.id,
    receipts: c,
    transaction: i,
    transactionBytes: J(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: Q(d),
    gasPriceFactor: Q(h),
    abiMap: r,
    maxInputs: E,
    gasCosts: m,
    maxGasPerTx: b,
    gasPrice: v
  });
  return {
    gqlTransaction: s,
    ...D
  };
}
async function uB(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: d } = t.getGasConfig(), h = t.getChain().consensusParameters.maxInputs, E = n.toTransaction(), m = n.toTransactionBytes(), b = await t.getLatestGasPrice();
  return Bi({
    receipts: s,
    transaction: E,
    transactionBytes: m,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: h,
    gasCosts: c,
    maxGasPerTx: d,
    gasPrice: b
  });
}
async function dB(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: { gasPerByte: c, gasPriceFactor: d, maxInputs: h, gasCosts: E, maxGasPerTx: m }
  } = n.getChain(), b = await n.getLatestGasPrice();
  return {
    transactions: i.map((D) => {
      const { node: C } = D, { id: k, rawPayload: N, status: V } = C, [P] = new bn().decode(J(N), 0);
      let j = [];
      C != null && C.status && "receipts" in C.status && (j = C.status.receipts);
      const O = j.map(pn), M = Bi({
        id: k,
        receipts: O,
        transaction: P,
        transactionBytes: J(N),
        gqlTransactionStatus: V,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: d,
        maxInputs: h,
        gasCosts: E,
        maxGasPerTx: m,
        gasPrice: b
      });
      return {
        gqlTransaction: C,
        ...M
      };
    }),
    pageInfo: o
  };
}
var Vn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, QI = (e) => {
  if (e === "ethereum")
    return Vn.eth.sepolia;
  if (e === "fuel")
    return Vn.fuel.beta5;
}, xI = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), E0 = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? QI(n);
  if (i === void 0)
    return;
  const o = xI({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, lB = (e, t) => E0({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), hB = (e, t) => E0({
  asset: e,
  networkType: "fuel",
  chainId: t
}), vI = "/", _I = /^\/|\/$/g, DI = (e = "") => e.replace(_I, "");
function RI(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(DI);
  return r && n && s.unshift(""), s.join(vI);
}
function fB(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: RI(t, n.icon)
  }));
}
var gB = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Vn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Vn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Vn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Vn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], SI = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new S("u64").encode(new Te(n).toNumber());
  return Uint8Array.from([
    ...J(r),
    ...i,
    ...J(t)
  ]);
}, NI = async (e) => {
  const t = SI(e);
  await ma();
  const n = Bm(16, 0, bm.ScriptData), r = Gc(17, 16, 32), s = Nr(18, 17, 0), i = Gc(19, 17, 8), o = Im(16, 18, 19), c = Td(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Ci = class extends sd {
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
    _(this, "address");
    /**
     * The provider used to interact with the network.
     */
    _(this, "_provider");
    _(this, "_connector");
    this._provider = n, this._connector = r, this.address = ue.fromDynamicInput(t);
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
  async fund(t, n) {
    const { addedSignatures: r, estimatedPredicates: s, maxFee: i, requiredQuantities: o } = n, c = this.provider.getBaseAssetId(), d = t, h = xw({
      amount: Q(i),
      assetId: c,
      coinQuantities: o
    }), E = {};
    h.forEach(({ amount: C, assetId: k }) => {
      E[k] = {
        required: C,
        owned: Q(0)
      };
    }), d.inputs.forEach((C) => {
      if (!("amount" in C))
        return;
      const V = "owner" in C ? String(C.assetId) : c;
      E[V] && (E[V].owned = E[V].owned.add(C.amount));
    });
    const m = [];
    if (Object.entries(E).forEach(([C, { owned: k, required: N }]) => {
      k.lt(N) && m.push({
        assetId: C,
        amount: N.sub(k)
      });
    }), m.length) {
      const C = YE(d.inputs, this.address.toB256()), k = await this.getResourcesToSpend(m, C);
      d.addResources(k);
    }
    d.shiftPredicateData(), d.updatePredicateGasUsed(s);
    const v = yn(d);
    r && Array.from({ length: r }).forEach(() => v.addEmptyWitness());
    const { maxFee: D } = await this.provider.estimateTxGasAndFee({
      transactionRequest: v
    });
    return d.maxFee = D, d;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, tip, maturity, maxFee, witnessLimit).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(t, n, r, s = {}) {
    const i = new $n(s), o = r ?? this.provider.getBaseAssetId();
    i.addCoinOutput(ue.fromAddressOrString(t), n, o);
    const c = await this.provider.getTransactionCost(i, {
      estimateTxDependencies: !0,
      resourcesOwner: this
    });
    return this.validateGasLimitAndMaxFee({
      gasUsed: c.gasUsed,
      maxFee: c.maxFee,
      txParams: s
    }), i.gasLimit = c.gasUsed, i.maxFee = c.maxFee, await this.fund(i, c), i;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(t, n, r, s = {}) {
    if (Q(n).lte(0))
      throw new x(
        R.INVALID_TRANSFER_AMOUNT,
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
      throw new x(
        R.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = ue.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: c, scriptData: d } = await NI({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: Q(n),
      assetId: o
    }), h = new $n({
      ...s,
      script: c,
      scriptData: d
    });
    h.addContractInputAndOutput(i);
    const E = await this.provider.getTransactionCost(h, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: Q(n), assetId: String(o) }]
    });
    return this.validateGasLimitAndMaxFee({
      gasUsed: E.gasUsed,
      maxFee: E.maxFee,
      txParams: s
    }), h.gasLimit = E.gasUsed, h.maxFee = E.maxFee, await this.fund(h, E), this.sendTransaction(h);
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
    const s = ue.fromAddressOrString(t), i = J(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = J(
      "0x".concat(Q(n).toHex().substring(2).padStart(16, "0"))
    ), d = { script: new Uint8Array([
      ...J(JE.bytes),
      ...i,
      ...o
    ]), ...r }, h = this.provider.getBaseAssetId(), E = new $n(d), m = [{ amount: Q(n), assetId: h }], b = await this.provider.getTransactionCost(E, { quantitiesToContract: m });
    return this.validateGasLimitAndMaxFee({
      gasUsed: b.gasUsed,
      maxFee: b.maxFee,
      txParams: r
    }), E.maxFee = b.maxFee, E.gasLimit = b.gasUsed, await this.fund(E, b), this.sendTransaction(E);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new x(R.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
      throw new x(
        R.MISSING_CONNECTOR,
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
    const s = xt(t);
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
    const r = xt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.simulate(r, { estimateTxDependencies: !1 });
  }
  validateGasLimitAndMaxFee({
    txParams: { gasLimit: t, maxFee: n },
    gasUsed: r,
    maxFee: s
  }) {
    if (Ls(t) && r.gt(t))
      throw new x(
        R.GAS_LIMIT_TOO_LOW,
        `Gas limit '${t}' is lower than the required: '${r}'.`
      );
    if (Ls(n) && s.gt(n))
      throw new x(
        R.MAX_FEE_TOO_LOW,
        `Max fee '${n}' is lower than the required: '${s}'.`
      );
  }
}, mr = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(e) {
    _(this, "address");
    _(this, "publicKey");
    _(this, "compressedPublicKey");
    _(this, "privateKey");
    typeof e == "string" && e.match(/^[0-9a-f]*$/i) && e.length === 64 && (e = `0x${e}`);
    const t = Pt(e, 32);
    this.privateKey = Z(t), this.publicKey = Z(ln.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = Z(ln.getPublicKey(t, !0)), this.address = ue.fromPublicKey(this.publicKey);
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
    const t = ln.sign(J(e), J(this.privateKey)), n = Pt(`0x${t.r.toString(16)}`, 32), r = Pt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, Z(re([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = ln.ProjectivePoint.fromHex(J(this.compressedPublicKey)), n = ln.ProjectivePoint.fromHex(J(e));
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
    const c = new ln.Signature(BigInt(Z(r)), BigInt(Z(s))).addRecoveryBit(
      i
    ).recoverPublicKey(J(e)).toRawBytes(!1).slice(1);
    return Z(c);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(e, t) {
    return ue.fromPublicKey(mr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? nn(re([jt(32), J(e)])) : jt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = ln.ProjectivePoint.fromHex(J(e));
    return Z(t.toRawBytes(!1).slice(1));
  }
}, nA = 13, rA = 8, sA = 1, eo = 32, kI = 16, iA = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function MI(e, t, n) {
  const r = In(iA(e), "hex"), s = ue.fromAddressOrString(t), i = jt(eo), o = mu({
    password: In(n),
    salt: i,
    dklen: eo,
    n: 2 ** nA,
    r: rA,
    p: sA
  }), c = jt(kI), d = await Gf(r, o, c), h = Uint8Array.from([...o.subarray(16, 32), ...d]), E = wu(h), m = _r(E, "hex"), b = {
    id: nw(),
    version: 3,
    address: iA(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: m,
      cipherparams: { iv: _r(c, "hex") },
      ciphertext: _r(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: eo,
        n: 2 ** nA,
        p: sA,
        r: rA,
        salt: _r(i, "hex")
      }
    }
  };
  return JSON.stringify(b);
}
async function OI(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: d, p: h, salt: E }
    }
  } = n, m = In(s, "hex"), b = In(i, "hex"), v = In(E, "hex"), D = In(t), C = mu({
    password: D,
    salt: v,
    n: c,
    p: h,
    r: d,
    dklen: o
  }), k = Uint8Array.from([...C.subarray(16, 32), ...m]), N = wu(k), V = _r(N, "hex");
  if (r !== V)
    throw new x(
      R.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const P = await Uf(m, C, b);
  return Z(P);
}
var I0 = class extends Ci {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new mr(t);
    super(r.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    _(this, "signer");
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
    const n = await this.signer().sign(Jf(t));
    return Z(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(t) {
    const n = xt(t), r = this.provider.getChainId(), s = n.getTransactionId(r), i = await this.signer().sign(s);
    return Z(i);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(t) {
    const n = xt(t), r = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, r), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(t, { estimateTxDependencies: n = !1, awaitExecution: r } = {}) {
    const s = xt(t);
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
    const r = xt(t);
    return n && await this.provider.estimateTxDependencies(r), this.provider.call(
      await this.populateTransactionWitnessesSignature(r),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  async encrypt(t) {
    return MI(this.privateKey, this.address, t);
  }
};
Me(I0, "defaultPath", "m/44'/1179993420'/0'/0/0");
var Is = [
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
], TI = /* @__PURE__ */ ((e) => (e.english = "english", e))(TI || {});
function Do(e) {
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
function LI(e) {
  return (1 << e) - 1;
}
function y0(e) {
  return (1 << e) - 1 << 8 - e;
}
function to(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function FI(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function PI(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & LI(8 - n)), n += 3);
  const r = e.length / 4, s = J(yt(e))[0] & y0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function UI(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = J(new Uint8Array(n));
  let s = 0;
  for (let h = 0; h < e.length; h += 1) {
    const E = t.indexOf(e[h].normalize("NFKD"));
    if (E === -1)
      throw new x(
        R.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[h]}' is not found in the provided wordlist.`
      );
    for (let m = 0; m < 11; m += 1)
      E & 1 << 10 - m && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = y0(o);
  if ((J(yt(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new x(
      R.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var GI = Do("Bitcoin seed"), HI = "0x0488ade4", JI = "0x04358394", oA = [12, 15, 18, 21, 24];
function aA(e) {
  if (e.length !== 2048)
    throw new x(
      R.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function YI(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new x(
      R.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function no(e) {
  if (!oA.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${oA.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new x(R.INVALID_MNEMONIC, t);
  }
}
var hn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = Is) {
    _(this, "wordlist");
    this.wordlist = e, aA(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return hn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return hn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = Is) {
    const n = to(e);
    return no(n), Z(UI(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = Is) {
    const n = J(e);
    return aA(t), YI(n), PI(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    no(to(e));
    const n = Do(FI(e)), r = Do(`mnemonic${t}`);
    return Ir(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = hn.mnemonicToSeed(e, t);
    return hn.masterKeysFromSeed(n);
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
      if (hn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = Is;
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
      throw new x(
        R.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return J(Er("sha512", GI, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = hn.masterKeysFromSeed(e), r = J(t ? JI : HI), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), d = n.slice(0, 32), h = re([
      r,
      s,
      i,
      o,
      c,
      re(["0x00", d])
    ]), E = Fo(yt(yt(h)), 0, 4);
    return DA(re([h, E]));
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
    const n = t ? yt(re([jt(e), J(t)])) : jt(e);
    return hn.entropyToMnemonic(n);
  }
}, xa = hn, B0 = 2147483648, C0 = Z("0x0488ade4"), va = Z("0x0488b21e"), b0 = Z("0x04358394"), _a = Z("0x043587cf");
function cA(e) {
  return DA(re([e, Fo(yt(yt(e)), 0, 4)]));
}
function ZI(e = !1, t = !1) {
  return e ? t ? _a : va : t ? b0 : C0;
}
function VI(e) {
  return [va, _a].includes(Z(e.slice(0, 4)));
}
function XI(e) {
  return [C0, b0, va, _a].includes(
    Z(e.slice(0, 4))
  );
}
function jI(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new x(R.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + B0 : parseInt(r, 10)
  );
}
var Un = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    _(this, "depth", 0);
    _(this, "index", 0);
    _(this, "fingerprint", Z("0x00000000"));
    _(this, "parentFingerprint", Z("0x00000000"));
    _(this, "privateKey");
    _(this, "publicKey");
    _(this, "chainCode");
    if (e.privateKey) {
      const t = new mr(e.privateKey);
      this.publicKey = Z(t.compressedPublicKey), this.privateKey = Z(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new x(
          R.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = Z(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Fo(zr(yt(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    if (e & B0) {
      if (!t)
        throw new x(
          R.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(J(this.publicKey));
    s.set(Pt(e, 4), 33);
    const i = J(Er("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const E = "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", m = Q(o).add(t).mod(E).toBytes(32);
      return new Un({
        privateKey: m,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const h = new mr(Z(o)).addPoint(n);
    return new Un({
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
    return jI(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
    const n = ZI(this.privateKey == null || e, t), r = Z(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = Lo(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? re(["0x00", this.privateKey]) : this.publicKey, d = J(re([n, r, s, i, o, c]));
    return cA(d);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = xa.masterKeysFromSeed(e);
    return new Un({
      chainCode: J(t.slice(32)),
      privateKey: J(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = Dl(Nl(e)), n = J(t), r = cA(n.slice(0, 78)) === e;
    if (n.length !== 82 || !XI(n))
      throw new x(R.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new x(R.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = Z(n.slice(5, 9)), o = parseInt(Z(n.slice(9, 13)).substring(2), 16), c = Z(n.slice(13, 45)), d = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new x(
        R.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (VI(n)) {
      if (d[0] !== 3)
        throw new x(R.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Un({
        publicKey: d,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (d[0] !== 0)
      throw new x(R.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Un({
      privateKey: d.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, ro = Un, Q0 = class extends Ci {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new bt(e, this._provider);
  }
}, bt = class extends I0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new mr("0x00"), new Q0(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = mr.generatePrivateKey(e == null ? void 0 : e.entropy);
    return new bt(t, e == null ? void 0 : e.provider);
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
    const s = ro.fromSeed(e).derivePath(t || bt.defaultPath);
    return new bt(s.privateKey, n);
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
    const s = xa.mnemonicToSeed(e, n), o = ro.fromSeed(s).derivePath(t || bt.defaultPath);
    return new bt(o.privateKey, r);
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
    return new bt(n.privateKey, t);
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
    const r = await OI(e, t);
    return new bt(r, n);
  }
}, vt = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(e, t) {
    return new Q0(e, t);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(e, t) {
    return new bt(e, t);
  }
};
Me(vt, "generate", bt.generate);
Me(vt, "fromSeed", bt.fromSeed);
Me(vt, "fromMnemonic", bt.fromMnemonic);
Me(vt, "fromExtendedKey", bt.fromExtendedKey);
Me(vt, "fromEncryptedJson", bt.fromEncryptedJson);
var qI = class {
  constructor() {
    _(this, "storage", /* @__PURE__ */ new Map());
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
}, xn, x0 = class {
  constructor(e) {
    gn(this, xn, void 0), Me(this, "pathKey", "{}"), Me(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Me(this, "numberOfAccounts", 0), Lt(this, xn, e.secret || xa.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: De(this, xn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = vt.fromMnemonic(De(this, xn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = vt.fromMnemonic(De(this, xn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = ue.fromAddressOrString(e);
    do {
      const r = vt.fromMnemonic(De(this, xn), this.getDerivePath(t));
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
    return vt.fromPrivateKey(t);
  }
};
xn = /* @__PURE__ */ new WeakMap();
Me(x0, "type", "mnemonic");
var fn, v0 = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    gn(this, fn, []), e.secret ? Lt(this, fn, [e.secret]) : Lt(this, fn, e.accounts || [vt.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: De(this, fn)
    };
  }
  getPublicAccount(e) {
    const t = vt.fromPrivateKey(e);
    return {
      address: t.address,
      publicKey: t.publicKey
    };
  }
  getAccounts() {
    return De(this, fn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = vt.generate();
    return De(this, fn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = ue.fromAddressOrString(e), n = De(this, fn).find(
      (r) => vt.fromPrivateKey(r).address.equals(t)
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
    return vt.fromPrivateKey(t);
  }
};
fn = /* @__PURE__ */ new WeakMap();
Me(v0, "type", "privateKey");
var Wt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function $t(e, t) {
  if (!e)
    throw new x(R.WALLET_MANAGER_ERROR, t);
}
var Bt, vn, Vt, Ro, _0, So, D0, R0 = class extends $d.EventEmitter {
  constructor(e) {
    super(), gn(this, Ro), gn(this, So), Me(this, "storage", new qI()), Me(this, "STORAGE_KEY", "WalletManager"), gn(this, Bt, []), gn(this, vn, ""), gn(this, Vt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return De(this, Vt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    $t(!De(this, Vt), Wt.wallet_not_unlocked);
    const t = De(this, Bt).find((n, r) => r === e);
    return $t(t, Wt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return De(this, Bt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return De(this, Bt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = ue.fromAddressOrString(e), n = De(this, Bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return $t(n, Wt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = ue.fromAddressOrString(e);
    $t(!De(this, Vt), Wt.wallet_not_unlocked);
    const n = De(this, Bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return $t(n, Wt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = De(this, Bt)[(e == null ? void 0 : e.vaultId) || 0];
    await $t(t, Wt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    De(this, Bt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Lt(this, Bt, De(this, Bt).concat({
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
    Lt(this, Vt, !0), Lt(this, Bt, []), Lt(this, vn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Lt(this, vn, e), Lt(this, Vt, !1);
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
    const n = De(this, Vt);
    await this.unlock(e), Lt(this, vn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await $t(!De(this, Vt), Wt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await Ff(De(this, vn), JSON.parse(e));
      Lt(this, Bt, Qo(this, So, D0).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await $t(!De(this, Vt), Wt.wallet_not_unlocked);
    const e = await Pf(De(this, vn), {
      vaults: Qo(this, Ro, _0).call(this, De(this, Bt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = R0.Vaults.find((n) => n.type === e);
    return $t(t, Wt.invalid_vault_type), t;
  }
}, WI = R0;
Bt = /* @__PURE__ */ new WeakMap();
vn = /* @__PURE__ */ new WeakMap();
Vt = /* @__PURE__ */ new WeakMap();
Ro = /* @__PURE__ */ new WeakSet();
_0 = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
So = /* @__PURE__ */ new WeakSet();
D0 = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
Me(WI, "Vaults", [x0, v0]);
var $I = class {
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
Me($I, "type");
var pB = class {
}, zI = (e) => {
  const n = J(e), r = CA(n, 16384), s = zd(r.map((o) => Z(o)));
  return nn(re(["0x4655454C", s]));
}, AA = class extends Ci {
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
    const { predicateBytes: o, predicateInterface: c } = AA.processPredicateData(
      t,
      n,
      i
    ), d = ue.fromB256(zI(o));
    super(d, r);
    _(this, "bytes");
    _(this, "predicateData", []);
    _(this, "interface");
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
    const n = xt(t), { policies: r } = Hr.getPolicyMeta(n);
    return (s = n.inputs) == null || s.forEach((i) => {
      i.type === me.Coin && Z(i.owner) === this.address.toB256() && (i.predicate = Z(this.bytes), i.predicateData = Z(this.getPredicateData(r.length)));
    }), n;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(t) {
    const n = xt(t);
    return super.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(t) {
    const n = xt(t);
    return super.simulateTransaction(n, { estimateTxDependencies: !1 });
  }
  getPredicateData(t) {
    var o;
    if (!this.predicateData.length)
      return new Uint8Array();
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Ie(this.bytes.length).encode(this.bytes), i = fi({
      maxInputs: this.provider.getChain().consensusParameters.maxInputs.toNumber()
    }) + sa + $f + ee + r.byteLength + t * ee;
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
    if (n && (i = new rn(n), i.functions.main === void 0))
      throw new x(
        R.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = AA.setConfigurableConstants(
      s,
      r,
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
  async getResourcesToSpend(t, n) {
    return (await this.provider.getResourcesToSpend(
      this.address,
      t,
      n
    )).map((s) => ({
      ...s,
      predicate: Z(this.bytes),
      padPredicateData: (i) => Z(this.getPredicateData(i))
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
}, S0 = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(S0 || {}), Da = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(Da || {}), N0 = "FuelConnector", KI = class {
  constructor(e) {
    _(this, "storage");
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
}, ey = class extends $d.EventEmitter {
  constructor() {
    super(...arguments);
    _(this, "name", "");
    _(this, "metadata", {});
    _(this, "connected", !1);
    _(this, "installed", !1);
    _(this, "events", Da);
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
function ty(e, { cache: t, cacheTime: n, key: r }) {
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
function mB(e) {
  window.dispatchEvent(
    new CustomEvent(N0, {
      detail: e
    })
  );
}
function ny() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function ys(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var ry = 2e3, sy = 5e3, { warn: iy } = console, Mr = class extends ey {
  constructor(t = Mr.defaultConfig) {
    super();
    _(this, "_storage", null);
    _(this, "_connectors", []);
    _(this, "_targetObject", null);
    _(this, "_unsubscribes", []);
    _(this, "_targetUnsubscribe");
    _(this, "_pingCache", {});
    _(this, "_currentConnector");
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    _(this, "setupConnectorListener", () => {
      const { _targetObject: t } = this, n = N0;
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
    _(this, "addConnector", async (t) => {
      this.getConnector(t) || this._connectors.push(t), await this.fetchConnectorStatus(t), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(t.name, {
        emitEvents: !1
      });
    });
    _(this, "triggerConnectorEvents", async () => {
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
    _(this, "getConnector", (t) => this._connectors.find((n) => {
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
      return new KI(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(Mr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(S0).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      ys(t.isConnected()),
      ys(this.pingConnector(t))
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
      return await ty(async () => ys(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: sy
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(Da)), await ((o = this._storage) == null ? void 0 : o.setItem(Mr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = ny();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), ys(t.promise, ry).then(() => !0).catch(() => !1);
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
    return iy(
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
      n = await ni.create(t.url);
    else {
      if (t)
        throw new x(R.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await ni.create(r.url);
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
    return new Ci(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Mr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, k0 = Mr;
Me(k0, "STORAGE_KEY", "fuel-current-connector");
Me(k0, "defaultConfig", {});
function uA(e, t) {
  if (!e)
    throw new x(R.TRANSACTION_ERROR, t);
}
function M0(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var Xt, IA, O0 = (IA = class {
  constructor(...e) {
    Le(this, Xt, void 0);
    Et(this, Xt, e || []);
  }
  entries() {
    return we(this, Xt);
  }
  push(...e) {
    we(this, Xt).push(...e);
  }
  concat(e) {
    return we(this, Xt).concat(e);
  }
  extend(e) {
    we(this, Xt).push(...e);
  }
  toBytes() {
    return re(
      we(this, Xt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return Z(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(we(this, Xt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, Xt = new WeakMap(), IA), oy = (e) => sa + fi({ maxInputs: e }), T0 = ee + Mn + ku + ee + ee;
function ay(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === Ae.ScriptResult ? n = i : (i.type === Ae.Return || i.type === Ae.ReturnData || i.type === Ae.Revert) && (r = i);
  }), !n || !r)
    throw new x(R.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function Ra(e, t, n = []) {
  var r;
  try {
    const s = ay(e);
    return t(s);
  } catch (s) {
    throw s.code === R.SCRIPT_REVERTED ? A0({
      logs: n,
      receipts: e.receipts,
      status: (r = e.gqlTransaction) == null ? void 0 : r.status
    }) : s;
  }
}
function cy(e, t, n) {
  return Ra(
    e,
    (r) => {
      if (r.returnReceipt.type === Ae.Revert)
        throw new x(
          R.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== Ae.Return && r.returnReceipt.type !== Ae.ReturnData) {
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
      return r.returnReceipt.type === Ae.Return && (s = r.returnReceipt.val), r.returnReceipt.type === Ae.ReturnData && (s = t.func.decodeOutput(r.returnReceipt.data)[0]), s;
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
    _(this, "bytes");
    /**
     * A function to encode the script data.
     */
    _(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    _(this, "scriptResultDecoder");
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
    return fi({ maxInputs: t }) + sa + e;
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
    return Ra(e, this.scriptResultDecoder, t);
  }
}, L0 = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, Ay = Re, F0 = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new O0(
    ws(16, e),
    ws(17, n),
    Nr(17, 17, 0),
    ws(18, r)
  );
  return t ? i.push(
    ws(19, t),
    Nr(19, 19, 0),
    Uc(16, 17, 18, 19)
  ) : i.push(Uc(16, 17, 18, ke.cgas().to_u8())), s.encoding === Gt && s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Nr(21, ke.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Nr(22, ke.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    ym(22, 22, s.encodedLength),
    Em(21, 22)
  ]), i;
};
function dA(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new O0();
  for (let r = 0; r < e.length; r += 1)
    n.extend(F0(e[r], t[r]).entries());
  return n.push(Td(1)), n.toBytes();
}
var lA = (e) => e === Ae.Return || e === Ae.ReturnData, uy = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === Ae.Call && r === Ay && s === t
), dy = (e, t) => (n) => {
  if (Ft(n.code) !== 0)
    throw new x(R.SCRIPT_REVERTED, "Transaction reverted.");
  const r = uy(
    n.receipts,
    e.toB256()
  ), s = Q(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => lA(o)).flatMap((o, c, d) => {
    var h;
    if (!s.eq(Q(o.is)))
      return [];
    if (o.type === Ae.Return)
      return [
        new S("u64").encode(o.val)
      ];
    if (o.type === Ae.ReturnData) {
      const E = J(o.data);
      if (t && lA((h = d[c + 1]) == null ? void 0 : h.type)) {
        const m = d[c + 1];
        return re([E, J(m.data)]);
      }
      return [E];
    }
    return [new Uint8Array()];
  });
}, ly = (e, t, n, r = []) => Ra(e, dy(t, n), r), hy = (e) => e.reduce(
  (t, n) => {
    const r = { ...L0 };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength,
      encoding: n.encoding ?? Gt
    };
    return t + F0(r, s).byteLength();
  },
  kt.size()
  // placeholder for single RET instruction which is added later
), fy = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength,
    encoding: n.encoding
  };
}), gy = (e, t) => {
  var o;
  const n = [];
  let r = 0;
  const s = {
    amountOffset: t,
    assetIdOffset: t + ee,
    gasForwardedOffset: e.gas ? t + ee + Mn : 0,
    callDataOffset: t + ee + Mn + r
  };
  if (n.push(new S("u64").encode(e.amount || 0)), n.push(new U().encode(((o = e.assetId) == null ? void 0 : o.toString()) || Re)), n.push(e.contractId.toBytes()), n.push(new S("u64").encode(e.fnSelector)), e.gas && (n.push(new S("u64").encode(e.gas)), r = ee), e.isInputDataPointer) {
    const c = t + T0 + r;
    n.push(new S("u64").encode(c));
  }
  const i = J(e.data);
  return n.push(i), {
    scriptData: n,
    callParamOffsets: s
  };
}, py = (e, t) => {
  var m;
  const n = [], r = t, s = r + ee, i = s + Mn, o = i + ku + ee + ee, c = o + e.fnSelectorBytes.byteLength, d = J(e.data);
  let h = 0;
  return n.push(new S("u64").encode(e.amount || 0)), n.push(new U().encode(((m = e.assetId) == null ? void 0 : m.toString()) || Re)), n.push(e.contractId.toBytes()), n.push(new S("u64").encode(o)), n.push(new S("u64").encode(c)), n.push(e.fnSelectorBytes), n.push(d), e.gas && (n.push(new S("u64").encode(e.gas)), h = c + d.byteLength), {
    scriptData: n,
    callParamOffsets: {
      amountOffset: r,
      assetIdOffset: s,
      gasForwardedOffset: h,
      callDataOffset: i
    }
  };
}, my = (e) => e === Ar ? py : gy, hA = (e, t) => new Yr(
  // Script to call the contract, start with stub size matching length of calls
  dA(
    new Array(e.length).fill(L0),
    fy(e)
  ),
  (n) => {
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = hy(n), i = (8 - s % 8) % 8, o = s + i, c = oy(t.toNumber()) + o, d = [], h = [];
    let E = c;
    const m = [];
    for (let D = 0; D < r; D += 1) {
      const C = n[D], { scriptData: k, callParamOffsets: N } = my(
        C.encoding
      )(C, E);
      h.push({
        isHeap: C.isOutputDataHeap,
        encodedLength: C.outputEncodedLength,
        encoding: C.encoding ?? Gt
      }), m.push(re(k)), d.push(N), E = c + re(m).byteLength;
    }
    const b = dA(d, h);
    return { data: re(m), script: b };
  },
  () => [new Uint8Array()]
);
function wy(e) {
  const t = e.receipts.find((n) => n.type === Ae.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || Q(0);
}
var P0 = class {
  /**
   * Constructs an instance of InvocationResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(e, t, n) {
    _(this, "functionScopes");
    _(this, "isMultiCall");
    _(this, "gasUsed");
    _(this, "value");
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = wy(t);
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
    return M0(this.functionScopes);
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
      return cy(e, n, t);
    const r = (n == null ? void 0 : n.func.encoding) === Gt && (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1, i = ly(
      e,
      (n == null ? void 0 : n.program).id,
      r,
      t
    ).map((o, c) => {
      var h;
      const { func: d } = this.functionScopes[c].getCallConfig();
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
    return p0(e, n, r);
  }
}, U0 = class extends P0 {
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
    _(this, "transactionId");
    _(this, "transactionResponse");
    _(this, "transactionResult");
    _(this, "program");
    _(this, "logs");
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
    return new U0(
      t,
      n,
      i,
      s,
      r
    );
  }
}, Ts = class extends P0 {
  /**
   * Constructs an instance of InvocationCallResult.
   *
   * @param funcScopes - The function scopes.
   * @param callResult - The call result.
   * @param isMultiCall - Whether it's a multi-call.
   */
  constructor(t, n, r) {
    super(t, n, r);
    _(this, "callResult");
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
    return await new Ts(t, n, r);
  }
};
function Ey(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o, externalAbis: c } = e.getCallConfig(), d = e.getCallConfig().func.isInputDataPointer ? T0 : 0, h = i.encodeArguments(r, t + d);
  return {
    contractId: n.id,
    fnSelector: i.selector,
    fnSelectorBytes: i.selectorBytes,
    encoding: i.encoding,
    data: h,
    isInputDataPointer: i.isInputDataPointer,
    isOutputDataHeap: i.outputMetadata.isHeapType,
    outputEncodedLength: i.outputMetadata.encodedLength,
    assetId: s == null ? void 0 : s.assetId,
    amount: s == null ? void 0 : s.amount,
    gas: o == null ? void 0 : o.gasLimit,
    externalContractsAbis: c
  };
}
var G0 = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(e, t) {
    _(this, "transactionRequest");
    _(this, "program");
    _(this, "functionInvocationScopes", []);
    _(this, "txParameters");
    _(this, "requiredCoins", []);
    _(this, "isMultiCall", !1);
    _(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    _(this, "externalAbis", {});
    _(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new $n();
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
    const n = t.maxInputs, r = hA(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => Ey(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.program.provider.getChain().consensusParameters.maxInputs, t = hA(this.functionInvocationScopes, e);
    this.transactionRequest.setScript(t, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(ue.fromB256(n))
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
    await ma(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === ft.Script && (this.transactionRequest.abis = M0(this.functionInvocationScopes));
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
  async getTransactionCost() {
    const e = this.getProvider(), t = await this.getTransactionRequest();
    return await e.getTransactionCost(t, {
      resourcesOwner: this.program.account,
      quantitiesToContract: this.getRequiredCoins(),
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Funds the transaction with the required coins.
   *
   * @returns The current instance of the class.
   */
  async fundWithRequiredCoins() {
    var c, d, h;
    const e = await this.getTransactionRequest(), t = await this.getTransactionCost(), { gasUsed: n, missingContractIds: r, outputVariables: s, maxFee: i } = t;
    this.setDefaultTxParams(e, n, i), e.inputs = e.inputs.filter((E) => E.type !== me.Coin), r.forEach((E) => {
      e.addContractInputAndOutput(ue.fromString(E));
    }), e.addVariableOutputs(s);
    const o = ((c = this.txParameters) == null ? void 0 : c.optimizeGas) ?? !0;
    if ((d = this.txParameters) != null && d.gasLimit && !o) {
      e.gasLimit = Q(this.txParameters.gasLimit);
      const { maxFee: E } = await this.getProvider().estimateTxGasAndFee({
        transactionRequest: e
      });
      e.maxFee = E;
    } else
      e.gasLimit = n, e.maxFee = i;
    return await ((h = this.program.account) == null ? void 0 : h.fund(e, t)), this.addSignersCallback && await this.addSignersCallback(e), e;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(e) {
    var n;
    this.txParameters = e;
    const t = this.transactionRequest;
    return t.tip = Q(e.tip || t.tip), t.gasLimit = Q(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? Q(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? Q(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((n = this.txParameters) == null ? void 0 : n.variableOutputs) || 0), this;
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
      ue.fromAddressOrString(e),
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
    uA(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      awaitExecution: !0,
      estimateTxDependencies: !1
    });
    return U0.build(
      this.functionInvocationScopes,
      t,
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
    if (uA(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new x(
        R.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return Ts.build(this.functionInvocationScopes, t, this.isMultiCall);
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
    return Ts.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return Ts.build(
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
   * In case the gasLimit is *not* set by the user, this method sets a default value.
   */
  setDefaultTxParams(e, t, n) {
    var o;
    const r = !!((o = this.txParameters) != null && o.gasLimit) || this.hasCallParamsGasLimit, { gasLimit: s, maxFee: i } = e;
    if (!r)
      e.gasLimit = t;
    else if (s.lt(t))
      throw new x(
        R.GAS_LIMIT_TOO_LOW,
        `Gas limit '${s}' is lower than the required: '${t}'.`
      );
    if (Ls(i) && n.gt(i))
      throw new x(
        R.MAX_FEE_TOO_LOW,
        `Max fee '${i}' is lower than the required: '${n}'.`
      );
  }
}, H0 = class extends G0 {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(t, n, r) {
    super(t, !1);
    _(this, "func");
    _(this, "callParameters");
    _(this, "forward");
    _(this, "args");
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
        throw new x(
          R.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = Ia(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, Iy = class extends G0 {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t), this.program.interface.jsonAbi.encoding !== Ar && this.validateHeapTypeReturnCalls();
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
}, yy = class {
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
    _(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    _(this, "provider");
    /**
     * The contract's ABI interface.
     */
    _(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    _(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    _(this, "functions", {});
    this.interface = t instanceof rn ? t : new rn(t), this.id = ue.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new H0(this, e, n);
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
    return new Iy(this, e);
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
}, By = class extends H0 {
  constructor() {
    super(...arguments);
    _(this, "scriptRequest");
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
}, wB = class extends Ig {
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
    _(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    _(this, "interface");
    /**
     * The account associated with the script.
     */
    _(this, "account");
    /**
     * The script request object.
     */
    _(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    _(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    _(this, "functions");
    this.bytes = J(t), this.interface = new rn(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new By(this, this.interface.getFunction("main"), s)
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
function EB(e) {
  return e;
}
var Cy = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(Cy || {}), by = Object.defineProperty, Qy = (e, t) => {
  for (var n in t)
    by(e, n, { get: t[n], enumerable: !0 });
}, xy = {};
Qy(xy, {
  getContractId: () => Z0,
  getContractRoot: () => J0,
  getContractStorageRoot: () => Y0,
  hexlifyWithPrefix: () => No
});
var J0 = (e) => {
  const n = J(e), r = CA(n, 16384);
  return zd(r.map((s) => Z(s)));
}, Y0 = (e) => {
  const t = new Cw();
  return e.forEach(({ key: n, value: r }) => t.update(yt(n), r)), t.root;
}, Z0 = (e, t, n) => {
  const r = J0(J(e));
  return yt(re(["0x4655454C", t, r, n]));
}, No = (e) => Z(e.startsWith("0x") ? e : `0x${e}`), vy = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(e, t, n = null) {
    _(this, "bytecode");
    _(this, "interface");
    _(this, "provider");
    _(this, "account");
    this.bytecode = J(e), t instanceof rn ? this.interface = t : this.interface = new rn(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new vy(this.bytecode, this.interface, e);
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
      key: No(c),
      value: No(d)
    })).sort(({ key: c }, { key: d }) => c.localeCompare(d)), n = {
      salt: jt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new x(
        R.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || Y0(n.storageSlots), s = Z0(this.bytecode, n.salt, r), i = new vo({
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
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), s = await this.account.provider.getTransactionCost(r), { maxFee: i } = e;
    if (Ls(i) && s.maxFee.gt(i))
      throw new x(
        R.MAX_FEE_TOO_LOW,
        `Max fee '${e.maxFee}' is lower than the required: '${s.maxFee}'.`
      );
    return r.maxFee = s.maxFee, await this.account.fund(r, s), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new yy(n, this.interface, this.account);
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
      throw new x(
        R.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, IB = 9, yB = 3, BB = 9, CB = 9, bB = 18, QB = 15, xB = 12, vB = 9, yA, _B = typeof process < "u" && ((yA = process == null ? void 0 : process.env) == null ? void 0 : yA.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/v1/graphql", DB = "https://beta-5.fuel.network/graphql";
export {
  Mn as ASSET_ID_LEN,
  sd as AbstractAccount,
  wg as AbstractAddress,
  Eg as AbstractContract,
  id as AbstractProgram,
  Ig as AbstractScript,
  Gy as AbstractScriptRequest,
  Ci as Account,
  ue as Address,
  iI as AddressType,
  gt as ArrayCoder,
  U as B256Coder,
  Lu as B512Coder,
  Te as BN,
  Cn as BYTES_32,
  Hr as BaseTransactionRequest,
  I0 as BaseWalletUnlocked,
  S as BigNumberCoder,
  ig as BooleanCoder,
  Ie as ByteArrayCoder,
  Hs as ByteCoder,
  Vn as CHAIN_IDS,
  ku as CONTRACT_ID_LEN,
  Zy as CONTRACT_MAX_SIZE,
  oI as ChainName,
  sB as ChangeOutputCollisionError,
  se as Coder,
  Cy as Commands,
  yy as Contract,
  vy as ContractFactory,
  xy as ContractUtils,
  vo as CreateTransactionRequest,
  CB as DECIMAL_FUEL,
  vB as DECIMAL_GWEI,
  QB as DECIMAL_KWEI,
  xB as DECIMAL_MWEI,
  bB as DECIMAL_WEI,
  BB as DEFAULT_DECIMAL_UNITS,
  yB as DEFAULT_MIN_PRECISION,
  IB as DEFAULT_PRECISION,
  Mo as DateTime,
  Gt as ENCODING_V0,
  Ar as ENCODING_V1,
  Yy as EmptyRoot,
  Pu as EnumCoder,
  hm as FAILED_ASSERT_EQ_SIGNAL,
  gm as FAILED_ASSERT_NE_SIGNAL,
  fm as FAILED_ASSERT_SIGNAL,
  lm as FAILED_REQUIRE_SIGNAL,
  kd as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  zy as FAILED_UNKNOWN_SIGNAL,
  Zs as FUEL_BECH32_HRP_PREFIX,
  DB as FUEL_BETA_5_NETWORK_URL,
  _B as FUEL_NETWORK_URL,
  k0 as Fuel,
  ey as FuelConnector,
  N0 as FuelConnectorEventType,
  Da as FuelConnectorEventTypes,
  S0 as FuelConnectorMethods,
  U0 as FunctionInvocationResult,
  H0 as FunctionInvocationScope,
  ro as HDWallet,
  $f as INPUT_COIN_FIXED_SIZE,
  Xs as InputCoder,
  lc as InputCoinCoder,
  Vs as InputContractCoder,
  Fr as InputMessageCoder,
  me as InputType,
  O0 as InstructionSet,
  rn as Interface,
  Ts as InvocationCallResult,
  P0 as InvocationResult,
  TI as Language,
  KI as LocalStorage,
  $y as MAX_PREDICATE_DATA_LENGTH,
  Wy as MAX_PREDICATE_LENGTH,
  jy as MAX_SCRIPT_DATA_LENGTH,
  Xy as MAX_SCRIPT_LENGTH,
  qy as MAX_STATIC_CONTRACTS,
  Vy as MAX_WITNESSES,
  oA as MNEMONIC_SIZES,
  qI as MemoryStorage,
  xa as Mnemonic,
  x0 as MnemonicVault,
  Iy as MultiCallInvocationScope,
  PE as NoWitnessAtIndexError,
  iB as NoWitnessByOwnerError,
  ce as NumberCoder,
  sI as OperationName,
  Hu as OptionCoder,
  fc as OutputChangeCoder,
  qs as OutputCoder,
  hc as OutputCoinCoder,
  js as OutputContractCoder,
  pc as OutputContractCreatedCoder,
  Be as OutputType,
  gc as OutputVariableCoder,
  mm as PANIC_DOC_URL,
  pm as PANIC_REASONS,
  Ws as PoliciesCoder,
  Ot as PolicyType,
  AA as Predicate,
  v0 as PrivateKeyVault,
  ni as Provider,
  ag as RawSliceCoder,
  go as ReceiptBurnCoder,
  mc as ReceiptCallCoder,
  Hy as ReceiptCoder,
  Bc as ReceiptLogCoder,
  Cc as ReceiptLogDataCoder,
  $s as ReceiptMessageOutCoder,
  Pr as ReceiptMintCoder,
  Ic as ReceiptPanicCoder,
  wc as ReceiptReturnCoder,
  Ec as ReceiptReturnDataCoder,
  yc as ReceiptRevertCoder,
  xc as ReceiptScriptResultCoder,
  bc as ReceiptTransferCoder,
  Qc as ReceiptTransferOutCoder,
  Ae as ReceiptType,
  sa as SCRIPT_FIXED_SIZE,
  wB as Script,
  Yr as ScriptRequest,
  $n as ScriptTransactionRequest,
  mr as Signer,
  Yu as StdStringCoder,
  pB as StorageAbstract,
  vc as StorageSlotCoder,
  cg as StringCoder,
  gi as StructCoder,
  bn as TransactionCoder,
  Dc as TransactionCreateCoder,
  Rc as TransactionMintCoder,
  Os as TransactionResponse,
  _c as TransactionScriptCoder,
  rI as TransactionStatus,
  ft as TransactionType,
  nI as TransactionTypeName,
  Zu as TupleCoder,
  dr as TxPointerCoder,
  co as UTXO_ID_LEN,
  Jy as UtxoIdCoder,
  $I as Vault,
  Vu as VecCoder,
  ee as WORD_SIZE,
  vt as Wallet,
  Q0 as WalletLocked,
  WI as WalletManager,
  bt as WalletUnlocked,
  zs as WitnessCoder,
  Re as ZeroBytes32,
  xw as addAmountToCoinQuantities,
  pr as addOperation,
  Dr as addressify,
  J as arrayify,
  LE as assemblePanicError,
  SE as assembleReceiptByType,
  FE as assembleRevertError,
  Bi as assembleTransactionSummary,
  uA as assert,
  gB as assets,
  Q as bn,
  In as bufferFromString,
  rB as buildBlockExplorerUrl,
  ty as cacheFor,
  YE as cacheTxInputsFromOwner,
  ti as calculateGasFee,
  a0 as calculateMetadataGasForTxCreate,
  c0 as calculateMetadataGasForTxScript,
  ZE as calculateTransactionFee,
  fi as calculateVmTxMemory,
  Dy as capitalizeString,
  CA as chunkAndPadBytes,
  xg as clearFirst12BytesFromB256,
  Ia as coinQuantityfy,
  re as concat,
  Xr as concatBytes,
  EB as createConfig,
  Ff as decrypt,
  Uf as decryptJsonWalletData,
  Ny as defaultConsensusKey,
  Sy as defaultSnapshotConfigs,
  ny as deferPromise,
  mB as dispatchFuelConnectorEvent,
  Pf as encrypt,
  Gf as encryptJsonWalletData,
  Is as english,
  EI as extractBurnedAssetsFromReceipts,
  wI as extractMintedAssetsFromReceipts,
  A0 as extractTxError,
  My as format,
  ky as formatUnits,
  ca as fromBech32,
  ME as gasUsedByInputs,
  M0 as getAbisFromAllCalls,
  lB as getAssetEth,
  hB as getAssetFuel,
  xI as getAssetNetwork,
  E0 as getAssetWithNetwork,
  Aa as getBytesFromBech32,
  hI as getContractCallOperations,
  pI as getContractCreatedOperations,
  p0 as getDecodedLogs,
  QI as getDefaultChainId,
  i0 as getGasUsedFromReceipts,
  ba as getInputAccountAddress,
  zE as getInputContractFromIndex,
  d0 as getInputFromAssetId,
  Ca as getInputsByType,
  XE as getInputsByTypes,
  jE as getInputsCoin,
  WE as getInputsCoinAndMessage,
  $E as getInputsContract,
  qE as getInputsMessage,
  Ba as getMaxGas,
  o0 as getMinGas,
  ud as getMintedAssetId,
  mI as getOperations,
  As as getOutputsByType,
  eI as getOutputsChange,
  l0 as getOutputsCoin,
  tI as getOutputsContract,
  KE as getOutputsContractCreated,
  oB as getOutputsVariable,
  gI as getPayProducerOperations,
  zI as getPredicateRoot,
  Qg as getRandomB256,
  Jr as getReceiptsByType,
  cI as getReceiptsCall,
  AI as getReceiptsMessageOut,
  cB as getReceiptsTransferOut,
  zc as getReceiptsWithMissingData,
  II as getTransactionStatusName,
  AB as getTransactionSummary,
  uB as getTransactionSummaryFromRequest,
  h0 as getTransactionTypeName,
  dB as getTransactionsSummaries,
  eA as getTransferOperations,
  lI as getWithdrawFromFuelOperations,
  aB as hasSameAssetId,
  nn as hash,
  Jf as hashMessage,
  Z as hexlify,
  xE as inputify,
  ho as isB256,
  Rs as isBech32,
  _E as isCoin,
  Ls as isDefined,
  fo as isEvmAddress,
  nB as isMessage,
  uc as isPublicKey,
  eB as isRawCoin,
  tB as isRawMessage,
  Qa as isType,
  f0 as isTypeCreate,
  aI as isTypeMint,
  g0 as isTypeScript,
  wu as keccak256,
  Uy as keyFromPassword,
  Oy as max,
  Ty as multiply,
  bg as normalizeBech32,
  OE as normalizeJSON,
  Ry as normalizeString,
  vE as outputify,
  vg as padFirst12BytesOfEvmAddress,
  pn as processGqlReceipt,
  yI as processGraphqlStatus,
  jt as randomBytes,
  Bn as resolveGasDependentCosts,
  fB as resolveIconPaths,
  Kc as returnZeroScript,
  mu as scrypt,
  yt as sha256,
  TE as sleep,
  Og as sortPolicies,
  _r as stringFromBuffer,
  dc as toB256,
  Ds as toBech32,
  Pt as toBytes,
  wl as toFixed,
  Lo as toHex,
  Ft as toNumber,
  xt as transactionRequestify,
  Hf as uint64ToBytesBE,
  RI as urlJoin,
  ys as withTimeout,
  JE as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
