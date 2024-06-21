var wA = Object.defineProperty;
var yA = (e, t, n) => t in e ? wA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var D = (e, t, n) => (yA(e, typeof t != "symbol" ? t + "" : t, n), n), xi = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Re = (e, t, n) => (xi(e, t, "read from private field"), n ? n.call(e) : t.get(e)), mt = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Wt = (e, t, n, r) => (xi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
var cn = (e, t, n) => (xi(e, t, "access private method"), n);
function sd() {
  return {
    FORC: "0.56.0",
    FUEL_CORE: "0.26.0",
    FUELS: "0.84.0"
  };
}
function va(e) {
  const [t, n, r] = e.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: n, patch: r };
}
function mo(e, t) {
  const n = va(e), r = va(t), s = n.major - r.major, i = n.minor - r.minor, o = n.patch - r.patch;
  return {
    major: s,
    minor: i,
    patch: o,
    fullVersionDiff: s || i || o
  };
}
function IA(e, t) {
  const { major: n } = mo(e, t);
  return n === 0;
}
function bA(e, t) {
  const { minor: n } = mo(e, t);
  return n === 0;
}
function EA(e, t) {
  const { patch: n } = mo(e, t);
  return n === 0;
}
function CA(e) {
  const { FUEL_CORE: t } = sd();
  return /^\d+\.\d+\.\d+\D+/m.test(e) && console.warn(`You're running against an unreleased fuel-core version: ${e}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: IA(e, t),
    isMinorSupported: bA(e, t),
    isPatchSupported: EA(e, t)
  };
}
var BA = sd(), xA = Object.defineProperty, _A = (e, t, n) => t in e ? xA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, vA = (e, t, n) => (_A(e, typeof t != "symbol" ? t + "" : t, n), n), N = /* @__PURE__ */ ((e) => (e.NO_ABIS_FOUND = "no-abis-found", e.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", e.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", e.INVALID_COMPONENT = "invalid-component", e.CONFIGURABLE_NOT_FOUND = "configurable-not-found", e.TYPE_NOT_FOUND = "type-not-found", e.LOG_TYPE_NOT_FOUND = "log-type-not-found", e.TYPE_NOT_SUPPORTED = "type-not-supported", e.INVALID_DECODE_VALUE = "invalid-decode-value", e.JSON_ABI_ERROR = "json-abi-error", e.TYPE_ID_NOT_FOUND = "type-id-not-found", e.BIN_FILE_NOT_FOUND = "bin-file-not-found", e.CODER_NOT_FOUND = "coder-not-found", e.INVALID_DATA = "invalid-data", e.FUNCTION_NOT_FOUND = "function-not-found", e.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", e.INVALID_BECH32_ADDRESS = "invalid-bech32-address", e.INVALID_EVM_ADDRESS = "invalid-evm-address", e.INVALID_B256_ADDRESS = "invalid-b256-address", e.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", e.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", e.MISSING_PROVIDER = "missing-provider", e.INVALID_PROVIDER = "invalid-provider", e.CONNECTION_REFUSED = "connection-refused", e.INVALID_PUBLIC_KEY = "invalid-public-key", e.WALLET_MANAGER_ERROR = "wallet-manager-error", e.HD_WALLET_ERROR = "hd-wallet-error", e.MISSING_CONNECTOR = "missing-connector", e.PARSE_FAILED = "parse-failed", e.ENCODE_ERROR = "encode-error", e.DECODE_ERROR = "decode-error", e.INVALID_CREDENTIALS = "invalid-credentials", e.ENV_DEPENDENCY_MISSING = "env-dependency-missing", e.INVALID_TTL = "invalid-ttl", e.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", e.NOT_IMPLEMENTED = "not-implemented", e.NOT_SUPPORTED = "not-supported", e.CONVERTING_FAILED = "converting-error", e.ELEMENT_NOT_FOUND = "element-not-found", e.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", e.INVALID_REQUEST = "invalid-request", e.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", e.GAS_PRICE_TOO_LOW = "gas-price-too-low", e.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", e.MAX_FEE_TOO_LOW = "max-fee-too-low", e.TRANSACTION_NOT_FOUND = "transaction-not-found", e.TRANSACTION_FAILED = "transaction-failed", e.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", e.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", e.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", e.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", e.INVALID_TRANSACTION_TYPE = "invalid-transaction-type", e.TRANSACTION_ERROR = "transaction-error", e.INVALID_POLICY_TYPE = "invalid-policy-type", e.DUPLICATED_POLICY = "duplicated-policy", e.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", e.INVALID_RECEIPT_TYPE = "invalid-receipt-type", e.INVALID_WORD_LIST = "invalid-word-list", e.INVALID_MNEMONIC = "invalid-mnemonic", e.INVALID_ENTROPY = "invalid-entropy", e.INVALID_SEED = "invalid-seed", e.INVALID_CHECKSUM = "invalid-checksum", e.INVALID_PASSWORD = "invalid-password", e.ACCOUNT_REQUIRED = "account-required", e.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", e.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", e.UNSUPPORTED_FUEL_CLIENT_VERSION = "unsupported-fuel-client-version", e.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", e.INVALID_MULTICALL = "invalid-multicall", e.SCRIPT_REVERTED = "script-reverted", e.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", e.STREAM_PARSING_ERROR = "stream-parsing-error", e))(N || {}), gs = class extends Error {
  constructor(t, n, r = {}) {
    super(n);
    D(this, "VERSIONS", BA);
    D(this, "metadata");
    D(this, "code");
    this.code = t, this.name = "FuelError", this.metadata = r;
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
    const { code: t, name: n, message: r, metadata: s, VERSIONS: i } = this;
    return { code: t, name: n, message: r, metadata: s, VERSIONS: i };
  }
}, _ = gs;
vA(_, "CODES", N);
var RA = Object.defineProperty, NA = (e, t, n) => t in e ? RA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, SA = (e, t, n) => (NA(e, typeof t != "symbol" ? t + "" : t, n), n), zI = (e) => e.length ? e[0].toUpperCase() + e.slice(1) : e, id = (e, t) => {
  const n = [];
  for (let c = 0; c < e.length; c += t) {
    const A = new Uint8Array(t);
    A.set(e.slice(c, c + t)), n.push(A);
  }
  const r = n[n.length - 1], s = e.length % t, i = s + (8 - s % 8) % 8, o = r.slice(0, i);
  return n[n.length - 1] = o, n;
}, X = (e) => {
  if (e instanceof Uint8Array)
    return new Uint8Array(e);
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const t = new Uint8Array((e.length - 2) / 2);
    let n = 2;
    for (let r = 0; r < t.length; r++)
      t[r] = parseInt(e.substring(n, n + 2), 16), n += 2;
    return t;
  }
  throw new _(N.PARSE_FAILED, "invalid BytesLike value");
}, Vr = (e) => {
  const t = e.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), n = t.reduce((s, i) => s + i.length, 0), r = new Uint8Array(n);
  return t.reduce((s, i) => (r.set(i, s), s + i.length), 0), r;
}, re = (e) => {
  const t = e.map((n) => X(n));
  return Vr(t);
}, Ra = "0123456789abcdef";
function Z(e) {
  const t = X(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Ra[(s & 240) >> 4] + Ra[s & 15];
  }
  return n;
}
var ZI = (e) => {
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
    throw new _(N.PARSE_FAILED, r);
  }
  return n;
}, DA = 37, od = BigInt(2 ** 62) + BigInt(DA), QA = (e) => Math.floor(e / 1e3), ad = (e) => e * 1e3, TA = (e) => Number(BigInt(e) - od), FA = (e) => String(BigInt(e) + od), MA = (e) => ad(TA(e)), ps = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(e) {
    return new ps(MA(e));
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
    return new ps(ad(e));
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
    return FA(this.toUnixSeconds());
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
    return QA(this.getTime());
  }
}, wo = ps;
SA(wo, "TAI64_NULL", "");
var OA = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V1: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 3e7,
          max_size: 112640,
          max_bytecode_subsections: 256
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
}, LA = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, kA = {
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
    },
    {
      sender: "0x22cae5308938e8b4caf217b6464884f6331eff05e81468df8ccd08126effc8d0",
      recipient: "0x8d2af98a4198732a46bf65d87a73427dd7608acaad2414585d8ccdd6f59c437b",
      nonce: "0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0",
      amount: 18446744073709552e3,
      data: "",
      da_height: 0
    }
  ],
  contracts: [],
  block_height: 0,
  da_block_height: 0
}, JI = {
  chainConfigJson: OA,
  metadataJson: LA,
  stateConfigJson: kA
}, WI = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function On(e) {
  return e !== void 0;
}
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function PA(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function yo(e) {
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
var Io = { exports: {} };
const UA = {}, GA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UA
}, Symbol.toStringTag, { value: "Module" })), VA = /* @__PURE__ */ yo(GA);
Io.exports;
(function(e) {
  (function(t, n) {
    function r(E, a) {
      if (!E)
        throw new Error(a || "Assertion failed");
    }
    function s(E, a) {
      E.super_ = a;
      var d = function() {
      };
      d.prototype = a.prototype, E.prototype = new d(), E.prototype.constructor = E;
    }
    function i(E, a, d) {
      if (i.isBN(E))
        return E;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, E !== null && ((a === "le" || a === "be") && (d = a, a = 10), this._init(E || 0, a || 10, d || "be"));
    }
    typeof t == "object" ? t.exports = i : n.BN = i, i.BN = i, i.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = VA.Buffer;
    } catch {
    }
    i.isBN = function(a) {
      return a instanceof i ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === i.wordSize && Array.isArray(a.words);
    }, i.max = function(a, d) {
      return a.cmp(d) > 0 ? a : d;
    }, i.min = function(a, d) {
      return a.cmp(d) < 0 ? a : d;
    }, i.prototype._init = function(a, d, l) {
      if (typeof a == "number")
        return this._initNumber(a, d, l);
      if (typeof a == "object")
        return this._initArray(a, d, l);
      d === "hex" && (d = 16), r(d === (d | 0) && d >= 2 && d <= 36), a = a.toString().replace(/\s+/g, "");
      var p = 0;
      a[0] === "-" && (p++, this.negative = 1), p < a.length && (d === 16 ? this._parseHex(a, p, l) : (this._parseBase(a, d, p), l === "le" && this._initArray(this.toArray(), d, l)));
    }, i.prototype._initNumber = function(a, d, l) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (r(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), d, l);
    }, i.prototype._initArray = function(a, d, l) {
      if (r(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var h, y, b = 0;
      if (l === "be")
        for (p = a.length - 1, h = 0; p >= 0; p -= 3)
          y = a[p] | a[p - 1] << 8 | a[p - 2] << 16, this.words[h] |= y << b & 67108863, this.words[h + 1] = y >>> 26 - b & 67108863, b += 24, b >= 26 && (b -= 26, h++);
      else if (l === "le")
        for (p = 0, h = 0; p < a.length; p += 3)
          y = a[p] | a[p + 1] << 8 | a[p + 2] << 16, this.words[h] |= y << b & 67108863, this.words[h + 1] = y >>> 26 - b & 67108863, b += 24, b >= 26 && (b -= 26, h++);
      return this._strip();
    };
    function c(E, a) {
      var d = E.charCodeAt(a);
      if (d >= 48 && d <= 57)
        return d - 48;
      if (d >= 65 && d <= 70)
        return d - 55;
      if (d >= 97 && d <= 102)
        return d - 87;
      r(!1, "Invalid character in " + E);
    }
    function A(E, a, d) {
      var l = c(E, d);
      return d - 1 >= a && (l |= c(E, d - 1) << 4), l;
    }
    i.prototype._parseHex = function(a, d, l) {
      this.length = Math.ceil((a.length - d) / 6), this.words = new Array(this.length);
      for (var p = 0; p < this.length; p++)
        this.words[p] = 0;
      var h = 0, y = 0, b;
      if (l === "be")
        for (p = a.length - 1; p >= d; p -= 2)
          b = A(a, d, p) << h, this.words[y] |= b & 67108863, h >= 18 ? (h -= 18, y += 1, this.words[y] |= b >>> 26) : h += 8;
      else {
        var g = a.length - d;
        for (p = g % 2 === 0 ? d + 1 : d; p < a.length; p += 2)
          b = A(a, d, p) << h, this.words[y] |= b & 67108863, h >= 18 ? (h -= 18, y += 1, this.words[y] |= b >>> 26) : h += 8;
      }
      this._strip();
    };
    function f(E, a, d, l) {
      for (var p = 0, h = 0, y = Math.min(E.length, d), b = a; b < y; b++) {
        var g = E.charCodeAt(b) - 48;
        p *= l, g >= 49 ? h = g - 49 + 10 : g >= 17 ? h = g - 17 + 10 : h = g, r(g >= 0 && h < l, "Invalid character"), p += h;
      }
      return p;
    }
    i.prototype._parseBase = function(a, d, l) {
      this.words = [0], this.length = 1;
      for (var p = 0, h = 1; h <= 67108863; h *= d)
        p++;
      p--, h = h / d | 0;
      for (var y = a.length - l, b = y % p, g = Math.min(y, y - b) + l, u = 0, m = l; m < g; m += p)
        u = f(a, m, m + p, d), this.imuln(h), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (b !== 0) {
        var z = 1;
        for (u = f(a, m, a.length, d), m = 0; m < b; m++)
          z *= d;
        this.imuln(z), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this._strip();
    }, i.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var d = 0; d < this.length; d++)
        a.words[d] = this.words[d];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function I(E, a) {
      E.words = a.words, E.length = a.length, E.negative = a.negative, E.red = a.red;
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
        i.prototype[Symbol.for("nodejs.util.inspect.custom")] = w;
      } catch {
        i.prototype.inspect = w;
      }
    else
      i.prototype.inspect = w;
    function w() {
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
    ], R = [
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
    i.prototype.toString = function(a, d) {
      a = a || 10, d = d | 0 || 1;
      var l;
      if (a === 16 || a === "hex") {
        l = "";
        for (var p = 0, h = 0, y = 0; y < this.length; y++) {
          var b = this.words[y], g = ((b << p | h) & 16777215).toString(16);
          h = b >>> 24 - p & 16777215, p += 2, p >= 26 && (p -= 26, y--), h !== 0 || y !== this.length - 1 ? l = C[6 - g.length] + g + l : l = g + l;
        }
        for (h !== 0 && (l = h.toString(16) + l); l.length % d !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var u = v[a], m = R[a];
        l = "";
        var z = this.clone();
        for (z.negative = 0; !z.isZero(); ) {
          var W = z.modrn(m).toString(a);
          z = z.idivn(m), z.isZero() ? l = W + l : l = C[u - W.length] + W + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % d !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, i.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, i.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (i.prototype.toBuffer = function(a, d) {
      return this.toArrayLike(o, a, d);
    }), i.prototype.toArray = function(a, d) {
      return this.toArrayLike(Array, a, d);
    };
    var B = function(a, d) {
      return a.allocUnsafe ? a.allocUnsafe(d) : new a(d);
    };
    i.prototype.toArrayLike = function(a, d, l) {
      this._strip();
      var p = this.byteLength(), h = l || Math.max(1, p);
      r(p <= h, "byte array longer than desired length"), r(h > 0, "Requested array length <= 0");
      var y = B(a, h), b = d === "le" ? "LE" : "BE";
      return this["_toArrayLike" + b](y, p), y;
    }, i.prototype._toArrayLikeLE = function(a, d) {
      for (var l = 0, p = 0, h = 0, y = 0; h < this.length; h++) {
        var b = this.words[h] << y | p;
        a[l++] = b & 255, l < a.length && (a[l++] = b >> 8 & 255), l < a.length && (a[l++] = b >> 16 & 255), y === 6 ? (l < a.length && (a[l++] = b >> 24 & 255), p = 0, y = 0) : (p = b >>> 24, y += 2);
      }
      if (l < a.length)
        for (a[l++] = p; l < a.length; )
          a[l++] = 0;
    }, i.prototype._toArrayLikeBE = function(a, d) {
      for (var l = a.length - 1, p = 0, h = 0, y = 0; h < this.length; h++) {
        var b = this.words[h] << y | p;
        a[l--] = b & 255, l >= 0 && (a[l--] = b >> 8 & 255), l >= 0 && (a[l--] = b >> 16 & 255), y === 6 ? (l >= 0 && (a[l--] = b >> 24 & 255), p = 0, y = 0) : (p = b >>> 24, y += 2);
      }
      if (l >= 0)
        for (a[l--] = p; l >= 0; )
          a[l--] = 0;
    }, Math.clz32 ? i.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : i.prototype._countBits = function(a) {
      var d = a, l = 0;
      return d >= 4096 && (l += 13, d >>>= 13), d >= 64 && (l += 7, d >>>= 7), d >= 8 && (l += 4, d >>>= 4), d >= 2 && (l += 2, d >>>= 2), l + d;
    }, i.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var d = a, l = 0;
      return d & 8191 || (l += 13, d >>>= 13), d & 127 || (l += 7, d >>>= 7), d & 15 || (l += 4, d >>>= 4), d & 3 || (l += 2, d >>>= 2), d & 1 || l++, l;
    }, i.prototype.bitLength = function() {
      var a = this.words[this.length - 1], d = this._countBits(a);
      return (this.length - 1) * 26 + d;
    };
    function M(E) {
      for (var a = new Array(E.bitLength()), d = 0; d < a.length; d++) {
        var l = d / 26 | 0, p = d % 26;
        a[d] = E.words[l] >>> p & 1;
      }
      return a;
    }
    i.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, d = 0; d < this.length; d++) {
        var l = this._zeroBits(this.words[d]);
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
      for (var d = 0; d < a.length; d++)
        this.words[d] = this.words[d] | a.words[d];
      return this._strip();
    }, i.prototype.ior = function(a) {
      return r((this.negative | a.negative) === 0), this.iuor(a);
    }, i.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, i.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, i.prototype.iuand = function(a) {
      var d;
      this.length > a.length ? d = a : d = this;
      for (var l = 0; l < d.length; l++)
        this.words[l] = this.words[l] & a.words[l];
      return this.length = d.length, this._strip();
    }, i.prototype.iand = function(a) {
      return r((this.negative | a.negative) === 0), this.iuand(a);
    }, i.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, i.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, i.prototype.iuxor = function(a) {
      var d, l;
      this.length > a.length ? (d = this, l = a) : (d = a, l = this);
      for (var p = 0; p < l.length; p++)
        this.words[p] = d.words[p] ^ l.words[p];
      if (this !== d)
        for (; p < d.length; p++)
          this.words[p] = d.words[p];
      return this.length = d.length, this._strip();
    }, i.prototype.ixor = function(a) {
      return r((this.negative | a.negative) === 0), this.iuxor(a);
    }, i.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, i.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, i.prototype.inotn = function(a) {
      r(typeof a == "number" && a >= 0);
      var d = Math.ceil(a / 26) | 0, l = a % 26;
      this._expand(d), l > 0 && d--;
      for (var p = 0; p < d; p++)
        this.words[p] = ~this.words[p] & 67108863;
      return l > 0 && (this.words[p] = ~this.words[p] & 67108863 >> 26 - l), this._strip();
    }, i.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, i.prototype.setn = function(a, d) {
      r(typeof a == "number" && a >= 0);
      var l = a / 26 | 0, p = a % 26;
      return this._expand(l + 1), d ? this.words[l] = this.words[l] | 1 << p : this.words[l] = this.words[l] & ~(1 << p), this._strip();
    }, i.prototype.iadd = function(a) {
      var d;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, d = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, d = this.isub(a), a.negative = 1, d._normSign();
      var l, p;
      this.length > a.length ? (l = this, p = a) : (l = a, p = this);
      for (var h = 0, y = 0; y < p.length; y++)
        d = (l.words[y] | 0) + (p.words[y] | 0) + h, this.words[y] = d & 67108863, h = d >>> 26;
      for (; h !== 0 && y < l.length; y++)
        d = (l.words[y] | 0) + h, this.words[y] = d & 67108863, h = d >>> 26;
      if (this.length = l.length, h !== 0)
        this.words[this.length] = h, this.length++;
      else if (l !== this)
        for (; y < l.length; y++)
          this.words[y] = l.words[y];
      return this;
    }, i.prototype.add = function(a) {
      var d;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, d = this.sub(a), a.negative ^= 1, d) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, d = a.sub(this), this.negative = 1, d) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, i.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var d = this.iadd(a);
        return a.negative = 1, d._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var l = this.cmp(a);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var p, h;
      l > 0 ? (p = this, h = a) : (p = a, h = this);
      for (var y = 0, b = 0; b < h.length; b++)
        d = (p.words[b] | 0) - (h.words[b] | 0) + y, y = d >> 26, this.words[b] = d & 67108863;
      for (; y !== 0 && b < p.length; b++)
        d = (p.words[b] | 0) + y, y = d >> 26, this.words[b] = d & 67108863;
      if (y === 0 && b < p.length && p !== this)
        for (; b < p.length; b++)
          this.words[b] = p.words[b];
      return this.length = Math.max(this.length, b), p !== this && (this.negative = 1), this._strip();
    }, i.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function T(E, a, d) {
      d.negative = a.negative ^ E.negative;
      var l = E.length + a.length | 0;
      d.length = l, l = l - 1 | 0;
      var p = E.words[0] | 0, h = a.words[0] | 0, y = p * h, b = y & 67108863, g = y / 67108864 | 0;
      d.words[0] = b;
      for (var u = 1; u < l; u++) {
        for (var m = g >>> 26, z = g & 67108863, W = Math.min(u, a.length - 1), K = Math.max(0, u - E.length + 1); K <= W; K++) {
          var q = u - K | 0;
          p = E.words[q] | 0, h = a.words[K] | 0, y = p * h + z, m += y / 67108864 | 0, z = y & 67108863;
        }
        d.words[u] = z | 0, g = m | 0;
      }
      return g !== 0 ? d.words[u] = g | 0 : d.length--, d._strip();
    }
    var V = function(a, d, l) {
      var p = a.words, h = d.words, y = l.words, b = 0, g, u, m, z = p[0] | 0, W = z & 8191, K = z >>> 13, q = p[1] | 0, se = q & 8191, ie = q >>> 13, De = p[2] | 0, he = De & 8191, ce = De >>> 13, _e = p[3] | 0, le = _e & 8191, ge = _e >>> 13, Gt = p[4] | 0, ve = Gt & 8191, be = Gt >>> 13, Ir = p[5] | 0, Qe = Ir & 8191, Me = Ir >>> 13, rs = p[6] | 0, Pe = rs & 8191, Ue = rs >>> 13, ha = p[7] | 0, Ge = ha & 8191, Ve = ha >>> 13, ga = p[8] | 0, He = ga & 8191, Xe = ga >>> 13, pa = p[9] | 0, Ye = pa & 8191, ze = pa >>> 13, ma = h[0] | 0, Ze = ma & 8191, Je = ma >>> 13, wa = h[1] | 0, We = wa & 8191, je = wa >>> 13, ya = h[2] | 0, qe = ya & 8191, $e = ya >>> 13, Ia = h[3] | 0, Ke = Ia & 8191, et = Ia >>> 13, ba = h[4] | 0, tt = ba & 8191, nt = ba >>> 13, Ea = h[5] | 0, rt = Ea & 8191, st = Ea >>> 13, Ca = h[6] | 0, it = Ca & 8191, ot = Ca >>> 13, Ba = h[7] | 0, at = Ba & 8191, ct = Ba >>> 13, xa = h[8] | 0, dt = xa & 8191, ut = xa >>> 13, _a = h[9] | 0, At = _a & 8191, lt = _a >>> 13;
      l.negative = a.negative ^ d.negative, l.length = 19, g = Math.imul(W, Ze), u = Math.imul(W, Je), u = u + Math.imul(K, Ze) | 0, m = Math.imul(K, Je);
      var oi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (oi >>> 26) | 0, oi &= 67108863, g = Math.imul(se, Ze), u = Math.imul(se, Je), u = u + Math.imul(ie, Ze) | 0, m = Math.imul(ie, Je), g = g + Math.imul(W, We) | 0, u = u + Math.imul(W, je) | 0, u = u + Math.imul(K, We) | 0, m = m + Math.imul(K, je) | 0;
      var ai = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, g = Math.imul(he, Ze), u = Math.imul(he, Je), u = u + Math.imul(ce, Ze) | 0, m = Math.imul(ce, Je), g = g + Math.imul(se, We) | 0, u = u + Math.imul(se, je) | 0, u = u + Math.imul(ie, We) | 0, m = m + Math.imul(ie, je) | 0, g = g + Math.imul(W, qe) | 0, u = u + Math.imul(W, $e) | 0, u = u + Math.imul(K, qe) | 0, m = m + Math.imul(K, $e) | 0;
      var ci = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (ci >>> 26) | 0, ci &= 67108863, g = Math.imul(le, Ze), u = Math.imul(le, Je), u = u + Math.imul(ge, Ze) | 0, m = Math.imul(ge, Je), g = g + Math.imul(he, We) | 0, u = u + Math.imul(he, je) | 0, u = u + Math.imul(ce, We) | 0, m = m + Math.imul(ce, je) | 0, g = g + Math.imul(se, qe) | 0, u = u + Math.imul(se, $e) | 0, u = u + Math.imul(ie, qe) | 0, m = m + Math.imul(ie, $e) | 0, g = g + Math.imul(W, Ke) | 0, u = u + Math.imul(W, et) | 0, u = u + Math.imul(K, Ke) | 0, m = m + Math.imul(K, et) | 0;
      var di = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (di >>> 26) | 0, di &= 67108863, g = Math.imul(ve, Ze), u = Math.imul(ve, Je), u = u + Math.imul(be, Ze) | 0, m = Math.imul(be, Je), g = g + Math.imul(le, We) | 0, u = u + Math.imul(le, je) | 0, u = u + Math.imul(ge, We) | 0, m = m + Math.imul(ge, je) | 0, g = g + Math.imul(he, qe) | 0, u = u + Math.imul(he, $e) | 0, u = u + Math.imul(ce, qe) | 0, m = m + Math.imul(ce, $e) | 0, g = g + Math.imul(se, Ke) | 0, u = u + Math.imul(se, et) | 0, u = u + Math.imul(ie, Ke) | 0, m = m + Math.imul(ie, et) | 0, g = g + Math.imul(W, tt) | 0, u = u + Math.imul(W, nt) | 0, u = u + Math.imul(K, tt) | 0, m = m + Math.imul(K, nt) | 0;
      var ui = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (ui >>> 26) | 0, ui &= 67108863, g = Math.imul(Qe, Ze), u = Math.imul(Qe, Je), u = u + Math.imul(Me, Ze) | 0, m = Math.imul(Me, Je), g = g + Math.imul(ve, We) | 0, u = u + Math.imul(ve, je) | 0, u = u + Math.imul(be, We) | 0, m = m + Math.imul(be, je) | 0, g = g + Math.imul(le, qe) | 0, u = u + Math.imul(le, $e) | 0, u = u + Math.imul(ge, qe) | 0, m = m + Math.imul(ge, $e) | 0, g = g + Math.imul(he, Ke) | 0, u = u + Math.imul(he, et) | 0, u = u + Math.imul(ce, Ke) | 0, m = m + Math.imul(ce, et) | 0, g = g + Math.imul(se, tt) | 0, u = u + Math.imul(se, nt) | 0, u = u + Math.imul(ie, tt) | 0, m = m + Math.imul(ie, nt) | 0, g = g + Math.imul(W, rt) | 0, u = u + Math.imul(W, st) | 0, u = u + Math.imul(K, rt) | 0, m = m + Math.imul(K, st) | 0;
      var Ai = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (Ai >>> 26) | 0, Ai &= 67108863, g = Math.imul(Pe, Ze), u = Math.imul(Pe, Je), u = u + Math.imul(Ue, Ze) | 0, m = Math.imul(Ue, Je), g = g + Math.imul(Qe, We) | 0, u = u + Math.imul(Qe, je) | 0, u = u + Math.imul(Me, We) | 0, m = m + Math.imul(Me, je) | 0, g = g + Math.imul(ve, qe) | 0, u = u + Math.imul(ve, $e) | 0, u = u + Math.imul(be, qe) | 0, m = m + Math.imul(be, $e) | 0, g = g + Math.imul(le, Ke) | 0, u = u + Math.imul(le, et) | 0, u = u + Math.imul(ge, Ke) | 0, m = m + Math.imul(ge, et) | 0, g = g + Math.imul(he, tt) | 0, u = u + Math.imul(he, nt) | 0, u = u + Math.imul(ce, tt) | 0, m = m + Math.imul(ce, nt) | 0, g = g + Math.imul(se, rt) | 0, u = u + Math.imul(se, st) | 0, u = u + Math.imul(ie, rt) | 0, m = m + Math.imul(ie, st) | 0, g = g + Math.imul(W, it) | 0, u = u + Math.imul(W, ot) | 0, u = u + Math.imul(K, it) | 0, m = m + Math.imul(K, ot) | 0;
      var li = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (li >>> 26) | 0, li &= 67108863, g = Math.imul(Ge, Ze), u = Math.imul(Ge, Je), u = u + Math.imul(Ve, Ze) | 0, m = Math.imul(Ve, Je), g = g + Math.imul(Pe, We) | 0, u = u + Math.imul(Pe, je) | 0, u = u + Math.imul(Ue, We) | 0, m = m + Math.imul(Ue, je) | 0, g = g + Math.imul(Qe, qe) | 0, u = u + Math.imul(Qe, $e) | 0, u = u + Math.imul(Me, qe) | 0, m = m + Math.imul(Me, $e) | 0, g = g + Math.imul(ve, Ke) | 0, u = u + Math.imul(ve, et) | 0, u = u + Math.imul(be, Ke) | 0, m = m + Math.imul(be, et) | 0, g = g + Math.imul(le, tt) | 0, u = u + Math.imul(le, nt) | 0, u = u + Math.imul(ge, tt) | 0, m = m + Math.imul(ge, nt) | 0, g = g + Math.imul(he, rt) | 0, u = u + Math.imul(he, st) | 0, u = u + Math.imul(ce, rt) | 0, m = m + Math.imul(ce, st) | 0, g = g + Math.imul(se, it) | 0, u = u + Math.imul(se, ot) | 0, u = u + Math.imul(ie, it) | 0, m = m + Math.imul(ie, ot) | 0, g = g + Math.imul(W, at) | 0, u = u + Math.imul(W, ct) | 0, u = u + Math.imul(K, at) | 0, m = m + Math.imul(K, ct) | 0;
      var fi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (fi >>> 26) | 0, fi &= 67108863, g = Math.imul(He, Ze), u = Math.imul(He, Je), u = u + Math.imul(Xe, Ze) | 0, m = Math.imul(Xe, Je), g = g + Math.imul(Ge, We) | 0, u = u + Math.imul(Ge, je) | 0, u = u + Math.imul(Ve, We) | 0, m = m + Math.imul(Ve, je) | 0, g = g + Math.imul(Pe, qe) | 0, u = u + Math.imul(Pe, $e) | 0, u = u + Math.imul(Ue, qe) | 0, m = m + Math.imul(Ue, $e) | 0, g = g + Math.imul(Qe, Ke) | 0, u = u + Math.imul(Qe, et) | 0, u = u + Math.imul(Me, Ke) | 0, m = m + Math.imul(Me, et) | 0, g = g + Math.imul(ve, tt) | 0, u = u + Math.imul(ve, nt) | 0, u = u + Math.imul(be, tt) | 0, m = m + Math.imul(be, nt) | 0, g = g + Math.imul(le, rt) | 0, u = u + Math.imul(le, st) | 0, u = u + Math.imul(ge, rt) | 0, m = m + Math.imul(ge, st) | 0, g = g + Math.imul(he, it) | 0, u = u + Math.imul(he, ot) | 0, u = u + Math.imul(ce, it) | 0, m = m + Math.imul(ce, ot) | 0, g = g + Math.imul(se, at) | 0, u = u + Math.imul(se, ct) | 0, u = u + Math.imul(ie, at) | 0, m = m + Math.imul(ie, ct) | 0, g = g + Math.imul(W, dt) | 0, u = u + Math.imul(W, ut) | 0, u = u + Math.imul(K, dt) | 0, m = m + Math.imul(K, ut) | 0;
      var hi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (hi >>> 26) | 0, hi &= 67108863, g = Math.imul(Ye, Ze), u = Math.imul(Ye, Je), u = u + Math.imul(ze, Ze) | 0, m = Math.imul(ze, Je), g = g + Math.imul(He, We) | 0, u = u + Math.imul(He, je) | 0, u = u + Math.imul(Xe, We) | 0, m = m + Math.imul(Xe, je) | 0, g = g + Math.imul(Ge, qe) | 0, u = u + Math.imul(Ge, $e) | 0, u = u + Math.imul(Ve, qe) | 0, m = m + Math.imul(Ve, $e) | 0, g = g + Math.imul(Pe, Ke) | 0, u = u + Math.imul(Pe, et) | 0, u = u + Math.imul(Ue, Ke) | 0, m = m + Math.imul(Ue, et) | 0, g = g + Math.imul(Qe, tt) | 0, u = u + Math.imul(Qe, nt) | 0, u = u + Math.imul(Me, tt) | 0, m = m + Math.imul(Me, nt) | 0, g = g + Math.imul(ve, rt) | 0, u = u + Math.imul(ve, st) | 0, u = u + Math.imul(be, rt) | 0, m = m + Math.imul(be, st) | 0, g = g + Math.imul(le, it) | 0, u = u + Math.imul(le, ot) | 0, u = u + Math.imul(ge, it) | 0, m = m + Math.imul(ge, ot) | 0, g = g + Math.imul(he, at) | 0, u = u + Math.imul(he, ct) | 0, u = u + Math.imul(ce, at) | 0, m = m + Math.imul(ce, ct) | 0, g = g + Math.imul(se, dt) | 0, u = u + Math.imul(se, ut) | 0, u = u + Math.imul(ie, dt) | 0, m = m + Math.imul(ie, ut) | 0, g = g + Math.imul(W, At) | 0, u = u + Math.imul(W, lt) | 0, u = u + Math.imul(K, At) | 0, m = m + Math.imul(K, lt) | 0;
      var gi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (gi >>> 26) | 0, gi &= 67108863, g = Math.imul(Ye, We), u = Math.imul(Ye, je), u = u + Math.imul(ze, We) | 0, m = Math.imul(ze, je), g = g + Math.imul(He, qe) | 0, u = u + Math.imul(He, $e) | 0, u = u + Math.imul(Xe, qe) | 0, m = m + Math.imul(Xe, $e) | 0, g = g + Math.imul(Ge, Ke) | 0, u = u + Math.imul(Ge, et) | 0, u = u + Math.imul(Ve, Ke) | 0, m = m + Math.imul(Ve, et) | 0, g = g + Math.imul(Pe, tt) | 0, u = u + Math.imul(Pe, nt) | 0, u = u + Math.imul(Ue, tt) | 0, m = m + Math.imul(Ue, nt) | 0, g = g + Math.imul(Qe, rt) | 0, u = u + Math.imul(Qe, st) | 0, u = u + Math.imul(Me, rt) | 0, m = m + Math.imul(Me, st) | 0, g = g + Math.imul(ve, it) | 0, u = u + Math.imul(ve, ot) | 0, u = u + Math.imul(be, it) | 0, m = m + Math.imul(be, ot) | 0, g = g + Math.imul(le, at) | 0, u = u + Math.imul(le, ct) | 0, u = u + Math.imul(ge, at) | 0, m = m + Math.imul(ge, ct) | 0, g = g + Math.imul(he, dt) | 0, u = u + Math.imul(he, ut) | 0, u = u + Math.imul(ce, dt) | 0, m = m + Math.imul(ce, ut) | 0, g = g + Math.imul(se, At) | 0, u = u + Math.imul(se, lt) | 0, u = u + Math.imul(ie, At) | 0, m = m + Math.imul(ie, lt) | 0;
      var pi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (pi >>> 26) | 0, pi &= 67108863, g = Math.imul(Ye, qe), u = Math.imul(Ye, $e), u = u + Math.imul(ze, qe) | 0, m = Math.imul(ze, $e), g = g + Math.imul(He, Ke) | 0, u = u + Math.imul(He, et) | 0, u = u + Math.imul(Xe, Ke) | 0, m = m + Math.imul(Xe, et) | 0, g = g + Math.imul(Ge, tt) | 0, u = u + Math.imul(Ge, nt) | 0, u = u + Math.imul(Ve, tt) | 0, m = m + Math.imul(Ve, nt) | 0, g = g + Math.imul(Pe, rt) | 0, u = u + Math.imul(Pe, st) | 0, u = u + Math.imul(Ue, rt) | 0, m = m + Math.imul(Ue, st) | 0, g = g + Math.imul(Qe, it) | 0, u = u + Math.imul(Qe, ot) | 0, u = u + Math.imul(Me, it) | 0, m = m + Math.imul(Me, ot) | 0, g = g + Math.imul(ve, at) | 0, u = u + Math.imul(ve, ct) | 0, u = u + Math.imul(be, at) | 0, m = m + Math.imul(be, ct) | 0, g = g + Math.imul(le, dt) | 0, u = u + Math.imul(le, ut) | 0, u = u + Math.imul(ge, dt) | 0, m = m + Math.imul(ge, ut) | 0, g = g + Math.imul(he, At) | 0, u = u + Math.imul(he, lt) | 0, u = u + Math.imul(ce, At) | 0, m = m + Math.imul(ce, lt) | 0;
      var mi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (mi >>> 26) | 0, mi &= 67108863, g = Math.imul(Ye, Ke), u = Math.imul(Ye, et), u = u + Math.imul(ze, Ke) | 0, m = Math.imul(ze, et), g = g + Math.imul(He, tt) | 0, u = u + Math.imul(He, nt) | 0, u = u + Math.imul(Xe, tt) | 0, m = m + Math.imul(Xe, nt) | 0, g = g + Math.imul(Ge, rt) | 0, u = u + Math.imul(Ge, st) | 0, u = u + Math.imul(Ve, rt) | 0, m = m + Math.imul(Ve, st) | 0, g = g + Math.imul(Pe, it) | 0, u = u + Math.imul(Pe, ot) | 0, u = u + Math.imul(Ue, it) | 0, m = m + Math.imul(Ue, ot) | 0, g = g + Math.imul(Qe, at) | 0, u = u + Math.imul(Qe, ct) | 0, u = u + Math.imul(Me, at) | 0, m = m + Math.imul(Me, ct) | 0, g = g + Math.imul(ve, dt) | 0, u = u + Math.imul(ve, ut) | 0, u = u + Math.imul(be, dt) | 0, m = m + Math.imul(be, ut) | 0, g = g + Math.imul(le, At) | 0, u = u + Math.imul(le, lt) | 0, u = u + Math.imul(ge, At) | 0, m = m + Math.imul(ge, lt) | 0;
      var wi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (wi >>> 26) | 0, wi &= 67108863, g = Math.imul(Ye, tt), u = Math.imul(Ye, nt), u = u + Math.imul(ze, tt) | 0, m = Math.imul(ze, nt), g = g + Math.imul(He, rt) | 0, u = u + Math.imul(He, st) | 0, u = u + Math.imul(Xe, rt) | 0, m = m + Math.imul(Xe, st) | 0, g = g + Math.imul(Ge, it) | 0, u = u + Math.imul(Ge, ot) | 0, u = u + Math.imul(Ve, it) | 0, m = m + Math.imul(Ve, ot) | 0, g = g + Math.imul(Pe, at) | 0, u = u + Math.imul(Pe, ct) | 0, u = u + Math.imul(Ue, at) | 0, m = m + Math.imul(Ue, ct) | 0, g = g + Math.imul(Qe, dt) | 0, u = u + Math.imul(Qe, ut) | 0, u = u + Math.imul(Me, dt) | 0, m = m + Math.imul(Me, ut) | 0, g = g + Math.imul(ve, At) | 0, u = u + Math.imul(ve, lt) | 0, u = u + Math.imul(be, At) | 0, m = m + Math.imul(be, lt) | 0;
      var yi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (yi >>> 26) | 0, yi &= 67108863, g = Math.imul(Ye, rt), u = Math.imul(Ye, st), u = u + Math.imul(ze, rt) | 0, m = Math.imul(ze, st), g = g + Math.imul(He, it) | 0, u = u + Math.imul(He, ot) | 0, u = u + Math.imul(Xe, it) | 0, m = m + Math.imul(Xe, ot) | 0, g = g + Math.imul(Ge, at) | 0, u = u + Math.imul(Ge, ct) | 0, u = u + Math.imul(Ve, at) | 0, m = m + Math.imul(Ve, ct) | 0, g = g + Math.imul(Pe, dt) | 0, u = u + Math.imul(Pe, ut) | 0, u = u + Math.imul(Ue, dt) | 0, m = m + Math.imul(Ue, ut) | 0, g = g + Math.imul(Qe, At) | 0, u = u + Math.imul(Qe, lt) | 0, u = u + Math.imul(Me, At) | 0, m = m + Math.imul(Me, lt) | 0;
      var Ii = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (Ii >>> 26) | 0, Ii &= 67108863, g = Math.imul(Ye, it), u = Math.imul(Ye, ot), u = u + Math.imul(ze, it) | 0, m = Math.imul(ze, ot), g = g + Math.imul(He, at) | 0, u = u + Math.imul(He, ct) | 0, u = u + Math.imul(Xe, at) | 0, m = m + Math.imul(Xe, ct) | 0, g = g + Math.imul(Ge, dt) | 0, u = u + Math.imul(Ge, ut) | 0, u = u + Math.imul(Ve, dt) | 0, m = m + Math.imul(Ve, ut) | 0, g = g + Math.imul(Pe, At) | 0, u = u + Math.imul(Pe, lt) | 0, u = u + Math.imul(Ue, At) | 0, m = m + Math.imul(Ue, lt) | 0;
      var bi = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (bi >>> 26) | 0, bi &= 67108863, g = Math.imul(Ye, at), u = Math.imul(Ye, ct), u = u + Math.imul(ze, at) | 0, m = Math.imul(ze, ct), g = g + Math.imul(He, dt) | 0, u = u + Math.imul(He, ut) | 0, u = u + Math.imul(Xe, dt) | 0, m = m + Math.imul(Xe, ut) | 0, g = g + Math.imul(Ge, At) | 0, u = u + Math.imul(Ge, lt) | 0, u = u + Math.imul(Ve, At) | 0, m = m + Math.imul(Ve, lt) | 0;
      var Ei = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (Ei >>> 26) | 0, Ei &= 67108863, g = Math.imul(Ye, dt), u = Math.imul(Ye, ut), u = u + Math.imul(ze, dt) | 0, m = Math.imul(ze, ut), g = g + Math.imul(He, At) | 0, u = u + Math.imul(He, lt) | 0, u = u + Math.imul(Xe, At) | 0, m = m + Math.imul(Xe, lt) | 0;
      var Ci = (b + g | 0) + ((u & 8191) << 13) | 0;
      b = (m + (u >>> 13) | 0) + (Ci >>> 26) | 0, Ci &= 67108863, g = Math.imul(Ye, At), u = Math.imul(Ye, lt), u = u + Math.imul(ze, At) | 0, m = Math.imul(ze, lt);
      var Bi = (b + g | 0) + ((u & 8191) << 13) | 0;
      return b = (m + (u >>> 13) | 0) + (Bi >>> 26) | 0, Bi &= 67108863, y[0] = oi, y[1] = ai, y[2] = ci, y[3] = di, y[4] = ui, y[5] = Ai, y[6] = li, y[7] = fi, y[8] = hi, y[9] = gi, y[10] = pi, y[11] = mi, y[12] = wi, y[13] = yi, y[14] = Ii, y[15] = bi, y[16] = Ei, y[17] = Ci, y[18] = Bi, b !== 0 && (y[19] = b, l.length++), l;
    };
    Math.imul || (V = T);
    function k(E, a, d) {
      d.negative = a.negative ^ E.negative, d.length = E.length + a.length;
      for (var l = 0, p = 0, h = 0; h < d.length - 1; h++) {
        var y = p;
        p = 0;
        for (var b = l & 67108863, g = Math.min(h, a.length - 1), u = Math.max(0, h - E.length + 1); u <= g; u++) {
          var m = h - u, z = E.words[m] | 0, W = a.words[u] | 0, K = z * W, q = K & 67108863;
          y = y + (K / 67108864 | 0) | 0, q = q + b | 0, b = q & 67108863, y = y + (q >>> 26) | 0, p += y >>> 26, y &= 67108863;
        }
        d.words[h] = b, l = y, y = p;
      }
      return l !== 0 ? d.words[h] = l : d.length--, d._strip();
    }
    function J(E, a, d) {
      return k(E, a, d);
    }
    i.prototype.mulTo = function(a, d) {
      var l, p = this.length + a.length;
      return this.length === 10 && a.length === 10 ? l = V(this, a, d) : p < 63 ? l = T(this, a, d) : p < 1024 ? l = k(this, a, d) : l = J(this, a, d), l;
    }, i.prototype.mul = function(a) {
      var d = new i(null);
      return d.words = new Array(this.length + a.length), this.mulTo(a, d);
    }, i.prototype.mulf = function(a) {
      var d = new i(null);
      return d.words = new Array(this.length + a.length), J(this, a, d);
    }, i.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, i.prototype.imuln = function(a) {
      var d = a < 0;
      d && (a = -a), r(typeof a == "number"), r(a < 67108864);
      for (var l = 0, p = 0; p < this.length; p++) {
        var h = (this.words[p] | 0) * a, y = (h & 67108863) + (l & 67108863);
        l >>= 26, l += h / 67108864 | 0, l += y >>> 26, this.words[p] = y & 67108863;
      }
      return l !== 0 && (this.words[p] = l, this.length++), d ? this.ineg() : this;
    }, i.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, i.prototype.sqr = function() {
      return this.mul(this);
    }, i.prototype.isqr = function() {
      return this.imul(this.clone());
    }, i.prototype.pow = function(a) {
      var d = M(a);
      if (d.length === 0)
        return new i(1);
      for (var l = this, p = 0; p < d.length && d[p] === 0; p++, l = l.sqr())
        ;
      if (++p < d.length)
        for (var h = l.sqr(); p < d.length; p++, h = h.sqr())
          d[p] !== 0 && (l = l.mul(h));
      return l;
    }, i.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var d = a % 26, l = (a - d) / 26, p = 67108863 >>> 26 - d << 26 - d, h;
      if (d !== 0) {
        var y = 0;
        for (h = 0; h < this.length; h++) {
          var b = this.words[h] & p, g = (this.words[h] | 0) - b << d;
          this.words[h] = g | y, y = b >>> 26 - d;
        }
        y && (this.words[h] = y, this.length++);
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
    }, i.prototype.iushrn = function(a, d, l) {
      r(typeof a == "number" && a >= 0);
      var p;
      d ? p = (d - d % 26) / 26 : p = 0;
      var h = a % 26, y = Math.min((a - h) / 26, this.length), b = 67108863 ^ 67108863 >>> h << h, g = l;
      if (p -= y, p = Math.max(0, p), g) {
        for (var u = 0; u < y; u++)
          g.words[u] = this.words[u];
        g.length = y;
      }
      if (y !== 0)
        if (this.length > y)
          for (this.length -= y, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + y];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (u = this.length - 1; u >= 0 && (m !== 0 || u >= p); u--) {
        var z = this.words[u] | 0;
        this.words[u] = m << 26 - h | z >>> h, m = z & b;
      }
      return g && m !== 0 && (g.words[g.length++] = m), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, i.prototype.ishrn = function(a, d, l) {
      return r(this.negative === 0), this.iushrn(a, d, l);
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
      var d = a % 26, l = (a - d) / 26, p = 1 << d;
      if (this.length <= l)
        return !1;
      var h = this.words[l];
      return !!(h & p);
    }, i.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var d = a % 26, l = (a - d) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (d !== 0 && l++, this.length = Math.min(l, this.length), d !== 0) {
        var p = 67108863 ^ 67108863 >>> d << d;
        this.words[this.length - 1] &= p;
      }
      return this._strip();
    }, i.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, i.prototype.iaddn = function(a) {
      return r(typeof a == "number"), r(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, i.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var d = 0; d < this.length && this.words[d] >= 67108864; d++)
        this.words[d] -= 67108864, d === this.length - 1 ? this.words[d + 1] = 1 : this.words[d + 1]++;
      return this.length = Math.max(this.length, d + 1), this;
    }, i.prototype.isubn = function(a) {
      if (r(typeof a == "number"), r(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var d = 0; d < this.length && this.words[d] < 0; d++)
          this.words[d] += 67108864, this.words[d + 1] -= 1;
      return this._strip();
    }, i.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, i.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, i.prototype.iabs = function() {
      return this.negative = 0, this;
    }, i.prototype.abs = function() {
      return this.clone().iabs();
    }, i.prototype._ishlnsubmul = function(a, d, l) {
      var p = a.length + l, h;
      this._expand(p);
      var y, b = 0;
      for (h = 0; h < a.length; h++) {
        y = (this.words[h + l] | 0) + b;
        var g = (a.words[h] | 0) * d;
        y -= g & 67108863, b = (y >> 26) - (g / 67108864 | 0), this.words[h + l] = y & 67108863;
      }
      for (; h < this.length - l; h++)
        y = (this.words[h + l] | 0) + b, b = y >> 26, this.words[h + l] = y & 67108863;
      if (b === 0)
        return this._strip();
      for (r(b === -1), b = 0, h = 0; h < this.length; h++)
        y = -(this.words[h] | 0) + b, b = y >> 26, this.words[h] = y & 67108863;
      return this.negative = 1, this._strip();
    }, i.prototype._wordDiv = function(a, d) {
      var l = this.length - a.length, p = this.clone(), h = a, y = h.words[h.length - 1] | 0, b = this._countBits(y);
      l = 26 - b, l !== 0 && (h = h.ushln(l), p.iushln(l), y = h.words[h.length - 1] | 0);
      var g = p.length - h.length, u;
      if (d !== "mod") {
        u = new i(null), u.length = g + 1, u.words = new Array(u.length);
        for (var m = 0; m < u.length; m++)
          u.words[m] = 0;
      }
      var z = p.clone()._ishlnsubmul(h, 1, g);
      z.negative === 0 && (p = z, u && (u.words[g] = 1));
      for (var W = g - 1; W >= 0; W--) {
        var K = (p.words[h.length + W] | 0) * 67108864 + (p.words[h.length + W - 1] | 0);
        for (K = Math.min(K / y | 0, 67108863), p._ishlnsubmul(h, K, W); p.negative !== 0; )
          K--, p.negative = 0, p._ishlnsubmul(h, 1, W), p.isZero() || (p.negative ^= 1);
        u && (u.words[W] = K);
      }
      return u && u._strip(), p._strip(), d !== "div" && l !== 0 && p.iushrn(l), {
        div: u || null,
        mod: p
      };
    }, i.prototype.divmod = function(a, d, l) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new i(0),
          mod: new i(0)
        };
      var p, h, y;
      return this.negative !== 0 && a.negative === 0 ? (y = this.neg().divmod(a, d), d !== "mod" && (p = y.div.neg()), d !== "div" && (h = y.mod.neg(), l && h.negative !== 0 && h.iadd(a)), {
        div: p,
        mod: h
      }) : this.negative === 0 && a.negative !== 0 ? (y = this.divmod(a.neg(), d), d !== "mod" && (p = y.div.neg()), {
        div: p,
        mod: y.mod
      }) : this.negative & a.negative ? (y = this.neg().divmod(a.neg(), d), d !== "div" && (h = y.mod.neg(), l && h.negative !== 0 && h.isub(a)), {
        div: y.div,
        mod: h
      }) : a.length > this.length || this.cmp(a) < 0 ? {
        div: new i(0),
        mod: this
      } : a.length === 1 ? d === "div" ? {
        div: this.divn(a.words[0]),
        mod: null
      } : d === "mod" ? {
        div: null,
        mod: new i(this.modrn(a.words[0]))
      } : {
        div: this.divn(a.words[0]),
        mod: new i(this.modrn(a.words[0]))
      } : this._wordDiv(a, d);
    }, i.prototype.div = function(a) {
      return this.divmod(a, "div", !1).div;
    }, i.prototype.mod = function(a) {
      return this.divmod(a, "mod", !1).mod;
    }, i.prototype.umod = function(a) {
      return this.divmod(a, "mod", !0).mod;
    }, i.prototype.divRound = function(a) {
      var d = this.divmod(a);
      if (d.mod.isZero())
        return d.div;
      var l = d.div.negative !== 0 ? d.mod.isub(a) : d.mod, p = a.ushrn(1), h = a.andln(1), y = l.cmp(p);
      return y < 0 || h === 1 && y === 0 ? d.div : d.div.negative !== 0 ? d.div.isubn(1) : d.div.iaddn(1);
    }, i.prototype.modrn = function(a) {
      var d = a < 0;
      d && (a = -a), r(a <= 67108863);
      for (var l = (1 << 26) % a, p = 0, h = this.length - 1; h >= 0; h--)
        p = (l * p + (this.words[h] | 0)) % a;
      return d ? -p : p;
    }, i.prototype.modn = function(a) {
      return this.modrn(a);
    }, i.prototype.idivn = function(a) {
      var d = a < 0;
      d && (a = -a), r(a <= 67108863);
      for (var l = 0, p = this.length - 1; p >= 0; p--) {
        var h = (this.words[p] | 0) + l * 67108864;
        this.words[p] = h / a | 0, l = h % a;
      }
      return this._strip(), d ? this.ineg() : this;
    }, i.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, i.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var d = this, l = a.clone();
      d.negative !== 0 ? d = d.umod(a) : d = d.clone();
      for (var p = new i(1), h = new i(0), y = new i(0), b = new i(1), g = 0; d.isEven() && l.isEven(); )
        d.iushrn(1), l.iushrn(1), ++g;
      for (var u = l.clone(), m = d.clone(); !d.isZero(); ) {
        for (var z = 0, W = 1; !(d.words[0] & W) && z < 26; ++z, W <<= 1)
          ;
        if (z > 0)
          for (d.iushrn(z); z-- > 0; )
            (p.isOdd() || h.isOdd()) && (p.iadd(u), h.isub(m)), p.iushrn(1), h.iushrn(1);
        for (var K = 0, q = 1; !(l.words[0] & q) && K < 26; ++K, q <<= 1)
          ;
        if (K > 0)
          for (l.iushrn(K); K-- > 0; )
            (y.isOdd() || b.isOdd()) && (y.iadd(u), b.isub(m)), y.iushrn(1), b.iushrn(1);
        d.cmp(l) >= 0 ? (d.isub(l), p.isub(y), h.isub(b)) : (l.isub(d), y.isub(p), b.isub(h));
      }
      return {
        a: y,
        b,
        gcd: l.iushln(g)
      };
    }, i.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var d = this, l = a.clone();
      d.negative !== 0 ? d = d.umod(a) : d = d.clone();
      for (var p = new i(1), h = new i(0), y = l.clone(); d.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var b = 0, g = 1; !(d.words[0] & g) && b < 26; ++b, g <<= 1)
          ;
        if (b > 0)
          for (d.iushrn(b); b-- > 0; )
            p.isOdd() && p.iadd(y), p.iushrn(1);
        for (var u = 0, m = 1; !(l.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (l.iushrn(u); u-- > 0; )
            h.isOdd() && h.iadd(y), h.iushrn(1);
        d.cmp(l) >= 0 ? (d.isub(l), p.isub(h)) : (l.isub(d), h.isub(p));
      }
      var z;
      return d.cmpn(1) === 0 ? z = p : z = h, z.cmpn(0) < 0 && z.iadd(a), z;
    }, i.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var d = this.clone(), l = a.clone();
      d.negative = 0, l.negative = 0;
      for (var p = 0; d.isEven() && l.isEven(); p++)
        d.iushrn(1), l.iushrn(1);
      do {
        for (; d.isEven(); )
          d.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var h = d.cmp(l);
        if (h < 0) {
          var y = d;
          d = l, l = y;
        } else if (h === 0 || l.cmpn(1) === 0)
          break;
        d.isub(l);
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
      var d = a % 26, l = (a - d) / 26, p = 1 << d;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= p, this;
      for (var h = p, y = l; h !== 0 && y < this.length; y++) {
        var b = this.words[y] | 0;
        b += h, h = b >>> 26, b &= 67108863, this.words[y] = b;
      }
      return h !== 0 && (this.words[y] = h, this.length++), this;
    }, i.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, i.prototype.cmpn = function(a) {
      var d = a < 0;
      if (this.negative !== 0 && !d)
        return -1;
      if (this.negative === 0 && d)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        d && (a = -a), r(a <= 67108863, "Number is too big");
        var p = this.words[0] | 0;
        l = p === a ? 0 : p < a ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, i.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var d = this.ucmp(a);
      return this.negative !== 0 ? -d | 0 : d;
    }, i.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var d = 0, l = this.length - 1; l >= 0; l--) {
        var p = this.words[l] | 0, h = a.words[l] | 0;
        if (p !== h) {
          p < h ? d = -1 : p > h && (d = 1);
          break;
        }
      }
      return d;
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
    function F(E, a) {
      this.name = E, this.p = new i(a, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    F.prototype._tmp = function() {
      var a = new i(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, F.prototype.ireduce = function(a) {
      var d = a, l;
      do
        this.split(d, this.tmp), d = this.imulK(d), d = d.iadd(this.tmp), l = d.bitLength();
      while (l > this.n);
      var p = l < this.n ? -1 : d.ucmp(this.p);
      return p === 0 ? (d.words[0] = 0, d.length = 1) : p > 0 ? d.isub(this.p) : d.strip !== void 0 ? d.strip() : d._strip(), d;
    }, F.prototype.split = function(a, d) {
      a.iushrn(this.n, 0, d);
    }, F.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function L() {
      F.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    s(L, F), L.prototype.split = function(a, d) {
      for (var l = 4194303, p = Math.min(a.length, 9), h = 0; h < p; h++)
        d.words[h] = a.words[h];
      if (d.length = p, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var y = a.words[9];
      for (d.words[d.length++] = y & l, h = 10; h < a.length; h++) {
        var b = a.words[h] | 0;
        a.words[h - 10] = (b & l) << 4 | y >>> 22, y = b;
      }
      y >>>= 22, a.words[h - 10] = y, y === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, L.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var d = 0, l = 0; l < a.length; l++) {
        var p = a.words[l] | 0;
        d += p * 977, a.words[l] = d & 67108863, d = p * 64 + (d / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function U() {
      F.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    s(U, F);
    function j() {
      F.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    s(j, F);
    function H() {
      F.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    s(H, F), H.prototype.imulK = function(a) {
      for (var d = 0, l = 0; l < a.length; l++) {
        var p = (a.words[l] | 0) * 19 + d, h = p & 67108863;
        p >>>= 26, a.words[l] = h, d = p;
      }
      return d !== 0 && (a.words[a.length++] = d), a;
    }, i._prime = function(a) {
      if (O[a])
        return O[a];
      var d;
      if (a === "k256")
        d = new L();
      else if (a === "p224")
        d = new U();
      else if (a === "p192")
        d = new j();
      else if (a === "p25519")
        d = new H();
      else
        throw new Error("Unknown prime " + a);
      return O[a] = d, d;
    };
    function Y(E) {
      if (typeof E == "string") {
        var a = i._prime(E);
        this.m = a.p, this.prime = a;
      } else
        r(E.gtn(1), "modulus must be greater than 1"), this.m = E, this.prime = null;
    }
    Y.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(a, d) {
      r((a.negative | d.negative) === 0, "red works only with positives"), r(
        a.red && a.red === d.red,
        "red works only with red numbers"
      );
    }, Y.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (I(a, a.umod(this.m)._forceRed(this)), a);
    }, Y.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, Y.prototype.add = function(a, d) {
      this._verify2(a, d);
      var l = a.add(d);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, Y.prototype.iadd = function(a, d) {
      this._verify2(a, d);
      var l = a.iadd(d);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, Y.prototype.sub = function(a, d) {
      this._verify2(a, d);
      var l = a.sub(d);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, Y.prototype.isub = function(a, d) {
      this._verify2(a, d);
      var l = a.isub(d);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, Y.prototype.shl = function(a, d) {
      return this._verify1(a), this.imod(a.ushln(d));
    }, Y.prototype.imul = function(a, d) {
      return this._verify2(a, d), this.imod(a.imul(d));
    }, Y.prototype.mul = function(a, d) {
      return this._verify2(a, d), this.imod(a.mul(d));
    }, Y.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, Y.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, Y.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var d = this.m.andln(3);
      if (r(d % 2 === 1), d === 3) {
        var l = this.m.add(new i(1)).iushrn(2);
        return this.pow(a, l);
      }
      for (var p = this.m.subn(1), h = 0; !p.isZero() && p.andln(1) === 0; )
        h++, p.iushrn(1);
      r(!p.isZero());
      var y = new i(1).toRed(this), b = y.redNeg(), g = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new i(2 * u * u).toRed(this); this.pow(u, g).cmp(b) !== 0; )
        u.redIAdd(b);
      for (var m = this.pow(u, p), z = this.pow(a, p.addn(1).iushrn(1)), W = this.pow(a, p), K = h; W.cmp(y) !== 0; ) {
        for (var q = W, se = 0; q.cmp(y) !== 0; se++)
          q = q.redSqr();
        r(se < K);
        var ie = this.pow(m, new i(1).iushln(K - se - 1));
        z = z.redMul(ie), m = ie.redSqr(), W = W.redMul(m), K = se;
      }
      return z;
    }, Y.prototype.invm = function(a) {
      var d = a._invmp(this.m);
      return d.negative !== 0 ? (d.negative = 0, this.imod(d).redNeg()) : this.imod(d);
    }, Y.prototype.pow = function(a, d) {
      if (d.isZero())
        return new i(1).toRed(this);
      if (d.cmpn(1) === 0)
        return a.clone();
      var l = 4, p = new Array(1 << l);
      p[0] = new i(1).toRed(this), p[1] = a;
      for (var h = 2; h < p.length; h++)
        p[h] = this.mul(p[h - 1], a);
      var y = p[0], b = 0, g = 0, u = d.bitLength() % 26;
      for (u === 0 && (u = 26), h = d.length - 1; h >= 0; h--) {
        for (var m = d.words[h], z = u - 1; z >= 0; z--) {
          var W = m >> z & 1;
          if (y !== p[0] && (y = this.sqr(y)), W === 0 && b === 0) {
            g = 0;
            continue;
          }
          b <<= 1, b |= W, g++, !(g !== l && (h !== 0 || z !== 0)) && (y = this.mul(y, p[b]), g = 0, b = 0);
        }
        u = 26;
      }
      return y;
    }, Y.prototype.convertTo = function(a) {
      var d = a.umod(this.m);
      return d === a ? d.clone() : d;
    }, Y.prototype.convertFrom = function(a) {
      var d = a.clone();
      return d.red = null, d;
    }, i.mont = function(a) {
      return new ee(a);
    };
    function ee(E) {
      Y.call(this, E), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    s(ee, Y), ee.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, ee.prototype.convertFrom = function(a) {
      var d = this.imod(a.mul(this.rinv));
      return d.red = null, d;
    }, ee.prototype.imul = function(a, d) {
      if (a.isZero() || d.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var l = a.imul(d), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(p).iushrn(this.shift), y = h;
      return h.cmp(this.m) >= 0 ? y = h.isub(this.m) : h.cmpn(0) < 0 && (y = h.iadd(this.m)), y._forceRed(this);
    }, ee.prototype.mul = function(a, d) {
      if (a.isZero() || d.isZero())
        return new i(0)._forceRed(this);
      var l = a.mul(d), p = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = l.isub(p).iushrn(this.shift), y = h;
      return h.cmp(this.m) >= 0 ? y = h.isub(this.m) : h.cmpn(0) < 0 && (y = h.iadd(this.m)), y._forceRed(this);
    }, ee.prototype.invm = function(a) {
      var d = this.imod(a._invmp(this.m).mul(this.r2));
      return d._forceRed(this);
    };
  })(e, Ce);
})(Io);
var HA = Io.exports;
const ss = /* @__PURE__ */ PA(HA);
var cd = 9, dd = 3, ki = 9;
function XA(e, t) {
  const { precision: n = cd, minPrecision: r = dd } = t || {}, [s = "0", i = "0"] = String(e || "0.0").split("."), o = /(\d)(?=(\d{3})+\b)/g, c = s.replace(o, "$1,");
  let A = i.slice(0, n);
  if (r < n) {
    const I = A.match(/.*[1-9]{1}/), w = (I == null ? void 0 : I[0].length) || 0, C = Math.max(r, w);
    A = A.slice(0, C);
  }
  const f = A ? `.${A}` : "";
  return `${c}${f}`;
}
var Oe = class extends ss {
  constructor(t, n, r) {
    let s = t, i = n;
    Oe.isBN(t) ? s = t.toArray() : typeof t == "string" && t.slice(0, 2) === "0x" && (s = t.substring(2), i = n || "hex");
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
      throw new _(N.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (t && this.byteLength() > t)
      throw new _(
        N.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${t} bytes.`
      );
    return this.toString(16, r);
  }
  toBytes(t) {
    if (this.isNeg())
      throw new _(N.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
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
      precision: r = cd,
      minPrecision: s = dd
    } = t || {}, i = this.formatUnits(n), o = XA(i, { precision: r, minPrecision: s });
    if (!parseFloat(o)) {
      const [, c = "0"] = i.split("."), A = c.match(/[1-9]/);
      if (A && A.index && A.index + 1 > r) {
        const [f = "0"] = o.split(".");
        return `${f}.${c.slice(0, A.index + 1)}`;
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
}, x = (e, t, n) => new Oe(e, t, n);
x.parseUnits = (e, t = ki) => {
  const n = e === "." ? "0." : e, [r = "0", s = "0"] = n.split("."), i = s.length;
  if (i > t)
    throw new _(
      N.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const o = Array.from({ length: t }).fill("0");
  o.splice(0, i, s);
  const c = `${r.replaceAll(",", "")}${o.join("")}`;
  return x(c);
};
function Lt(e) {
  return x(e).toNumber();
}
function bo(e, t) {
  return x(e).toHex(t);
}
function Pt(e, t) {
  return x(e).toBytes(t);
}
function jI(e, t) {
  return x(e).formatUnits(t);
}
function qI(e, t) {
  return x(e).format(t);
}
function $I(...e) {
  return e.reduce((t, n) => x(n).gt(t) ? x(n) : t, x(0));
}
function KI(...e) {
  return x(Math.ceil(e.reduce((t, n) => x(t).mul(n), x(1)).toNumber()));
}
const YA = "6.7.1";
function zA(e, t, n) {
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
function ZA(e, t, n) {
  for (let r in t) {
    let s = t[r];
    const i = n ? n[r] : null;
    i && zA(s, i, r), Object.defineProperty(e, r, { enumerable: !0, value: s, writable: !1 });
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
function JA(e, t, n) {
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
    s.push(`code=${t}`), s.push(`version=${YA}`), s.length && (e += " (" + s.join(", ") + ")");
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
  return ZA(r, { code: t }), n && Object.assign(r, n), r;
}
function Hr(e, t, n, r) {
  if (!e)
    throw JA(t, n, r);
}
function yt(e, t, n, r) {
  Hr(e, t, "INVALID_ARGUMENT", { argument: n, value: r });
}
const WA = ["NFD", "NFC", "NFKD", "NFKC"].reduce((e, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD" && "é".normalize("NFD") !== "é")
      throw new Error("broken");
    e.push(t);
  } catch {
  }
  return e;
}, []);
function jA(e) {
  Hr(WA.indexOf(e) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
    operation: "String.prototype.normalize",
    info: { form: e }
  });
}
function qA(e, t, n) {
  if (e instanceof Uint8Array)
    return n ? new Uint8Array(e) : e;
  if (typeof e == "string" && e.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((e.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(e.substring(s, s + 2), 16), s += 2;
    return r;
  }
  yt(!1, "invalid BytesLike value", t || "value", e);
}
function sn(e, t) {
  return qA(e, t, !1);
}
const Na = "0123456789abcdef";
function Js(e) {
  const t = sn(e);
  let n = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    n += Na[(s & 240) >> 4] + Na[s & 15];
  }
  return n;
}
function Eo(e, t, n) {
  const r = sn(e);
  return n != null && n > r.length && Hr(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: n
  }), Js(r.slice(t ?? 0, n ?? r.length));
}
const $A = BigInt(0);
BigInt(1);
const Xn = 9007199254740991;
function ud(e, t) {
  switch (typeof e) {
    case "bigint":
      return e;
    case "number":
      return yt(Number.isInteger(e), "underflow", t || "value", e), yt(e >= -Xn && e <= Xn, "overflow", t || "value", e), BigInt(e);
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return e[0] === "-" && e[1] !== "-" ? -BigInt(e.substring(1)) : BigInt(e);
      } catch (n) {
        yt(!1, `invalid BigNumberish string: ${n.message}`, t || "value", e);
      }
  }
  yt(!1, "invalid BigNumberish value", t || "value", e);
}
function KA(e, t) {
  const n = ud(e, t);
  return Hr(n >= $A, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: e
  }), n;
}
const Sa = "0123456789abcdef";
function el(e) {
  if (e instanceof Uint8Array) {
    let t = "0x0";
    for (const n of e)
      t += Sa[n >> 4], t += Sa[n & 15];
    return BigInt(t);
  }
  return ud(e);
}
function Ad(e, t) {
  switch (typeof e) {
    case "bigint":
      return yt(e >= -Xn && e <= Xn, "overflow", t || "value", e), Number(e);
    case "number":
      return yt(Number.isInteger(e), "underflow", t || "value", e), yt(e >= -Xn && e <= Xn, "overflow", t || "value", e), e;
    case "string":
      try {
        if (e === "")
          throw new Error("empty string");
        return Ad(BigInt(e), t);
      } catch (n) {
        yt(!1, `invalid numeric string: ${n.message}`, t || "value", e);
      }
  }
  yt(!1, "invalid numeric value", t || "value", e);
}
function tl(e, t) {
  let r = KA(e, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = Ad(t, "width");
    for (Hr(s * 2 >= r.length, `value exceeds width (${s} bits)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: e
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
const Pi = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
let is = null;
function nl(e) {
  if (is == null) {
    is = {};
    for (let n = 0; n < Pi.length; n++)
      is[Pi[n]] = BigInt(n);
  }
  const t = is[e];
  return yt(t != null, "invalid base58 value", "letter", e), t;
}
const rl = BigInt(0), Ui = BigInt(58);
function ld(e) {
  let t = el(sn(e)), n = "";
  for (; t; )
    n = Pi[Number(t % Ui)] + n, t /= Ui;
  return n;
}
function sl(e) {
  let t = rl;
  for (let n = 0; n < e.length; n++)
    t *= Ui, t += nl(e[n]);
  return t;
}
function il(e, t, n, r, s) {
  yt(!1, `invalid codepoint at offset ${t}; ${e}`, "bytes", n);
}
function fd(e, t, n, r, s) {
  if (e === "BAD_PREFIX" || e === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < n.length && n[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return e === "OVERRUN" ? n.length - t - 1 : 0;
}
function ol(e, t, n, r, s) {
  return e === "OVERLONG" ? (yt(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), fd(e, t, n));
}
const al = Object.freeze({
  error: il,
  ignore: fd,
  replace: ol
});
function cl(e, t) {
  t == null && (t = al.error);
  const n = sn(e, "bytes"), r = [];
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
    let A = i & (1 << 8 - o - 1) - 1;
    for (let f = 0; f < o; f++) {
      let I = n[s];
      if ((I & 192) != 128) {
        s += t("MISSING_CONTINUE", s, n, r), A = null;
        break;
      }
      A = A << 6 | I & 63, s++;
    }
    if (A !== null) {
      if (A > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - o, n, r, A);
        continue;
      }
      if (A >= 55296 && A <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - o, n, r, A);
        continue;
      }
      if (A <= c) {
        s += t("OVERLONG", s - 1 - o, n, r, A);
        continue;
      }
      r.push(A);
    }
  }
  return r;
}
function Xr(e, t) {
  t != null && (jA(t), e = e.normalize(t));
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
      yt(r < e.length && (i & 64512) === 56320, "invalid surrogate pair", "str", e);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(s >> 12 | 224), n.push(s >> 6 & 63 | 128), n.push(s & 63 | 128);
  }
  return new Uint8Array(n);
}
function dl(e) {
  return e.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Yr(e, t) {
  return dl(cl(e, t));
}
function Gi(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function ul(e) {
  if (typeof e != "boolean")
    throw new Error(`Expected boolean, not ${e}`);
}
function hd(e, ...t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Al(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Gi(e.outputLen), Gi(e.blockLen);
}
function ll(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function fl(e, t) {
  hd(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const kt = {
  number: Gi,
  bool: ul,
  bytes: hd,
  hash: Al,
  exists: ll,
  output: fl
};
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ms = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Vt = (e, t) => e << 32 - t | e >>> t, hl = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!hl)
  throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function gl(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function Qr(e) {
  if (typeof e == "string" && (e = gl(e)), !(e instanceof Uint8Array))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
let Vi = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
const pl = (e) => Object.prototype.toString.call(e) === "[object Object]" && e.constructor === Object;
function ml(e, t) {
  if (t !== void 0 && (typeof t != "object" || !pl(t)))
    throw new TypeError("Options should be object or undefined");
  return Object.assign(e, t);
}
function zr(e) {
  const t = (r) => e().update(Qr(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
let gd = class extends Vi {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, kt.hash(t);
    const r = Qr(n);
    if (this.iHash = t.create(), !(this.iHash instanceof Vi))
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
    return kt.exists(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    kt.exists(this), kt.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Co = (e, t, n) => new gd(e, t).update(n).digest();
Co.create = (e, t) => new gd(e, t);
function wl(e, t, n, r) {
  kt.hash(e);
  const s = ml({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (kt.number(i), kt.number(o), kt.number(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = Qr(t), f = Qr(n), I = new Uint8Array(o), w = Co.create(e, A), C = w._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: w, PRFSalt: C };
}
function yl(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Il(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: A } = wl(e, t, n, r);
  let f;
  const I = new Uint8Array(4), w = ms(I), C = new Uint8Array(c.outputLen);
  for (let v = 1, R = 0; R < i; v++, R += c.outputLen) {
    const B = o.subarray(R, R + c.outputLen);
    w.setInt32(0, v, !1), (f = A._cloneInto(f)).update(I).digestInto(C), B.set(C.subarray(0, B.length));
    for (let M = 1; M < s; M++) {
      c._cloneInto(f).update(C).digestInto(C);
      for (let T = 0; T < B.length; T++)
        B[T] ^= C[T];
    }
  }
  return yl(c, A, o, f, C);
}
function bl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + f, c, r);
}
let Bo = class extends Vi {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ms(this.buffer);
  }
  update(t) {
    kt.exists(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = Qr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = ms(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    kt.exists(this), kt.output(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let A = o; A < s; A++)
      n[A] = 0;
    bl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ms(t);
    this.get().forEach((A, f) => c.setUint32(4 * f, A, i));
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
const El = (e, t, n) => e & t ^ ~e & n, Cl = (e, t, n) => e & t ^ e & n ^ t & n, Bl = new Uint32Array([
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
]), dn = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), un = new Uint32Array(64);
let xl = class extends Bo {
  constructor() {
    super(64, 32, 8, !1), this.A = dn[0] | 0, this.B = dn[1] | 0, this.C = dn[2] | 0, this.D = dn[3] | 0, this.E = dn[4] | 0, this.F = dn[5] | 0, this.G = dn[6] | 0, this.H = dn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: c, H: A } = this;
    return [t, n, r, s, i, o, c, A];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = A | 0;
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      un[w] = t.getUint32(n, !1);
    for (let w = 16; w < 64; w++) {
      const C = un[w - 15], v = un[w - 2], R = Vt(C, 7) ^ Vt(C, 18) ^ C >>> 3, B = Vt(v, 17) ^ Vt(v, 19) ^ v >>> 10;
      un[w] = B + un[w - 7] + R + un[w - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: f, H: I } = this;
    for (let w = 0; w < 64; w++) {
      const C = Vt(c, 6) ^ Vt(c, 11) ^ Vt(c, 25), v = I + C + El(c, A, f) + Bl[w] + un[w] | 0, B = (Vt(r, 2) ^ Vt(r, 13) ^ Vt(r, 22)) + Cl(r, s, i) | 0;
      I = f, f = A, A = c, c = o + v | 0, o = i, i = s, s = r, r = v + B | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, f = f + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, A, f, I);
  }
  roundClean() {
    un.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const pd = zr(() => new xl()), os = BigInt(2 ** 32 - 1), Hi = BigInt(32);
function md(e, t = !1) {
  return t ? { h: Number(e & os), l: Number(e >> Hi & os) } : { h: Number(e >> Hi & os) | 0, l: Number(e & os) | 0 };
}
function _l(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = md(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const vl = (e, t) => BigInt(e >>> 0) << Hi | BigInt(t >>> 0), Rl = (e, t, n) => e >>> n, Nl = (e, t, n) => e << 32 - n | t >>> n, Sl = (e, t, n) => e >>> n | t << 32 - n, Dl = (e, t, n) => e << 32 - n | t >>> n, Ql = (e, t, n) => e << 64 - n | t >>> n - 32, Tl = (e, t, n) => e >>> n - 32 | t << 64 - n, Fl = (e, t) => t, Ml = (e, t) => e, Ol = (e, t, n) => e << n | t >>> 32 - n, Ll = (e, t, n) => t << n | e >>> 32 - n, kl = (e, t, n) => t << n - 32 | e >>> 64 - n, Pl = (e, t, n) => e << n - 32 | t >>> 64 - n;
function Ul(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: e + n + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Gl = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), Vl = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, Hl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), Xl = (e, t, n, r, s) => t + n + r + s + (e / 2 ** 32 | 0) | 0, Yl = (e, t, n, r, s) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0), zl = (e, t, n, r, s, i) => t + n + r + s + i + (e / 2 ** 32 | 0) | 0, fe = {
  fromBig: md,
  split: _l,
  toBig: vl,
  shrSH: Rl,
  shrSL: Nl,
  rotrSH: Sl,
  rotrSL: Dl,
  rotrBH: Ql,
  rotrBL: Tl,
  rotr32H: Fl,
  rotr32L: Ml,
  rotlSH: Ol,
  rotlSL: Ll,
  rotlBH: kl,
  rotlBL: Pl,
  add: Ul,
  add3L: Gl,
  add3H: Vl,
  add4L: Hl,
  add4H: Xl,
  add5H: zl,
  add5L: Yl
}, [Zl, Jl] = fe.split([
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
].map((e) => BigInt(e))), An = new Uint32Array(80), ln = new Uint32Array(80);
class xo extends Bo {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: n, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: A, Eh: f, El: I, Fh: w, Fl: C, Gh: v, Gl: R, Hh: B, Hl: M } = this;
    return [t, n, r, s, i, o, c, A, f, I, w, C, v, R, B, M];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A, f, I, w, C, v, R, B, M) {
    this.Ah = t | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = A | 0, this.Eh = f | 0, this.El = I | 0, this.Fh = w | 0, this.Fl = C | 0, this.Gh = v | 0, this.Gl = R | 0, this.Hh = B | 0, this.Hl = M | 0;
  }
  process(t, n) {
    for (let k = 0; k < 16; k++, n += 4)
      An[k] = t.getUint32(n), ln[k] = t.getUint32(n += 4);
    for (let k = 16; k < 80; k++) {
      const J = An[k - 15] | 0, O = ln[k - 15] | 0, F = fe.rotrSH(J, O, 1) ^ fe.rotrSH(J, O, 8) ^ fe.shrSH(J, O, 7), L = fe.rotrSL(J, O, 1) ^ fe.rotrSL(J, O, 8) ^ fe.shrSL(J, O, 7), U = An[k - 2] | 0, j = ln[k - 2] | 0, H = fe.rotrSH(U, j, 19) ^ fe.rotrBH(U, j, 61) ^ fe.shrSH(U, j, 6), Y = fe.rotrSL(U, j, 19) ^ fe.rotrBL(U, j, 61) ^ fe.shrSL(U, j, 6), ee = fe.add4L(L, Y, ln[k - 7], ln[k - 16]), E = fe.add4H(ee, F, H, An[k - 7], An[k - 16]);
      An[k] = E | 0, ln[k] = ee | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: A, Dh: f, Dl: I, Eh: w, El: C, Fh: v, Fl: R, Gh: B, Gl: M, Hh: T, Hl: V } = this;
    for (let k = 0; k < 80; k++) {
      const J = fe.rotrSH(w, C, 14) ^ fe.rotrSH(w, C, 18) ^ fe.rotrBH(w, C, 41), O = fe.rotrSL(w, C, 14) ^ fe.rotrSL(w, C, 18) ^ fe.rotrBL(w, C, 41), F = w & v ^ ~w & B, L = C & R ^ ~C & M, U = fe.add5L(V, O, L, Jl[k], ln[k]), j = fe.add5H(U, T, J, F, Zl[k], An[k]), H = U | 0, Y = fe.rotrSH(r, s, 28) ^ fe.rotrBH(r, s, 34) ^ fe.rotrBH(r, s, 39), ee = fe.rotrSL(r, s, 28) ^ fe.rotrBL(r, s, 34) ^ fe.rotrBL(r, s, 39), E = r & i ^ r & c ^ i & c, a = s & o ^ s & A ^ o & A;
      T = B | 0, V = M | 0, B = v | 0, M = R | 0, v = w | 0, R = C | 0, { h: w, l: C } = fe.add(f | 0, I | 0, j | 0, H | 0), f = c | 0, I = A | 0, c = i | 0, A = o | 0, i = r | 0, o = s | 0;
      const d = fe.add3L(H, ee, a);
      r = fe.add3H(d, j, Y, E), s = d | 0;
    }
    ({ h: r, l: s } = fe.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = fe.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: A } = fe.add(this.Ch | 0, this.Cl | 0, c | 0, A | 0), { h: f, l: I } = fe.add(this.Dh | 0, this.Dl | 0, f | 0, I | 0), { h: w, l: C } = fe.add(this.Eh | 0, this.El | 0, w | 0, C | 0), { h: v, l: R } = fe.add(this.Fh | 0, this.Fl | 0, v | 0, R | 0), { h: B, l: M } = fe.add(this.Gh | 0, this.Gl | 0, B | 0, M | 0), { h: T, l: V } = fe.add(this.Hh | 0, this.Hl | 0, T | 0, V | 0), this.set(r, s, i, o, c, A, f, I, w, C, v, R, B, M, T, V);
  }
  roundClean() {
    An.fill(0), ln.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class Wl extends xo {
  constructor() {
    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32;
  }
}
class jl extends xo {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
}
const wd = zr(() => new xo());
zr(() => new Wl());
zr(() => new jl());
function ql() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}
const Da = ql();
Da.crypto || Da.msCrypto;
function $l(e, t) {
  const n = { sha256: pd, sha512: wd }[e];
  return yt(n != null, "invalid hmac algorithm", "algorithm", e), Co.create(n, t);
}
function Kl(e, t, n, r, s) {
  const i = { sha256: pd, sha512: wd }[s];
  return yt(i != null, "invalid pbkdf2 algorithm", "algorithm", s), Il(i, e, t, { c: n, dkLen: r });
}
let yd = !1;
const Id = function(e, t, n) {
  return $l(e, t).update(n).digest();
};
let bd = Id;
function pr(e, t, n) {
  const r = sn(t, "key"), s = sn(n, "data");
  return Js(bd(e, r, s));
}
pr._ = Id;
pr.lock = function() {
  yd = !0;
};
pr.register = function(e) {
  if (yd)
    throw new Error("computeHmac is locked");
  bd = e;
};
Object.freeze(pr);
const ef = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), Ed = Uint8Array.from({ length: 16 }, (e, t) => t), tf = Ed.map((e) => (9 * e + 5) % 16);
let _o = [Ed], vo = [tf];
for (let e = 0; e < 4; e++)
  for (let t of [_o, vo])
    t.push(t[e].map((n) => ef[n]));
const Cd = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((e) => new Uint8Array(e)), nf = _o.map((e, t) => e.map((n) => Cd[t][n])), rf = vo.map((e, t) => e.map((n) => Cd[t][n])), sf = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]), of = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]), as = (e, t) => e << t | e >>> 32 - t;
function Qa(e, t, n, r) {
  return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r);
}
const cs = new Uint32Array(16);
class af extends Bo {
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
      cs[v] = t.getUint32(n, !0);
    let r = this.h0 | 0, s = r, i = this.h1 | 0, o = i, c = this.h2 | 0, A = c, f = this.h3 | 0, I = f, w = this.h4 | 0, C = w;
    for (let v = 0; v < 5; v++) {
      const R = 4 - v, B = sf[v], M = of[v], T = _o[v], V = vo[v], k = nf[v], J = rf[v];
      for (let O = 0; O < 16; O++) {
        const F = as(r + Qa(v, i, c, f) + cs[T[O]] + B, k[O]) + w | 0;
        r = w, w = f, f = as(c, 10) | 0, c = i, i = F;
      }
      for (let O = 0; O < 16; O++) {
        const F = as(s + Qa(R, o, A, I) + cs[V[O]] + M, J[O]) + C | 0;
        s = C, C = I, I = as(A, 10) | 0, A = o, o = F;
      }
    }
    this.set(this.h1 + c + I | 0, this.h2 + f + C | 0, this.h3 + w + s | 0, this.h4 + r + o | 0, this.h0 + i + A | 0);
  }
  roundClean() {
    cs.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const cf = zr(() => new af());
let Bd = !1;
const xd = function(e) {
  return cf(e);
};
let _d = xd;
function Zr(e) {
  const t = sn(e, "data");
  return Js(_d(t));
}
Zr._ = xd;
Zr.lock = function() {
  Bd = !0;
};
Zr.register = function(e) {
  if (Bd)
    throw new TypeError("ripemd160 is locked");
  _d = e;
};
Object.freeze(Zr);
let vd = !1;
const Rd = function(e, t, n, r, s) {
  return Kl(e, t, n, r, s);
};
let Nd = Rd;
function mr(e, t, n, r, s) {
  const i = sn(e, "password"), o = sn(t, "salt");
  return Js(Nd(i, o, n, r, s));
}
mr._ = Rd;
mr.lock = function() {
  vd = !0;
};
mr.register = function(e) {
  if (vd)
    throw new Error("pbkdf2 is locked");
  Nd = e;
};
Object.freeze(mr);
function Rt(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function df(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function Ro(e, ...t) {
  if (!df(e))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${e.length}`);
}
function Sd(e) {
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
function Dd(e, t) {
  Ro(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
const _i = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ws = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
function Qd(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const ys = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength), Ht = (e, t) => e << 32 - t | e >>> t, uf = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!uf)
  throw new Error("Non little-endian hardware is not supported");
function Af(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ir(e) {
  if (typeof e == "string" && (e = Af(e)), !Qd(e))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function lf(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (!Qd(s))
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
class No {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
const ff = {}.toString;
function Td(e, t) {
  if (t !== void 0 && ff.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(e, t);
}
function Fd(e) {
  const t = (r) => e().update(ir(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
function hf(e = 32) {
  if (_i && typeof _i.getRandomValues == "function")
    return _i.getRandomValues(new Uint8Array(e));
  throw new Error("crypto.getRandomValues must be defined");
}
function gf(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(n >> s & i), c = Number(n & i), A = r ? 4 : 0, f = r ? 0 : 4;
  e.setUint32(t + A, o, r), e.setUint32(t + f, c, r);
}
class pf extends No {
  constructor(t, n, r, s) {
    super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ys(this.buffer);
  }
  update(t) {
    sr(this);
    const { view: n, buffer: r, blockLen: s } = this;
    t = ir(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const A = ys(t);
        for (; s <= i - o; o += s)
          this.process(A, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    sr(this), Dd(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    n[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let w = o; w < s; w++)
      n[w] = 0;
    gf(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = ys(t), A = this.outputLen;
    if (A % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const f = A / 4, I = this.get();
    if (f > I.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let w = 0; w < f; w++)
      c.setUint32(4 * w, I[w], i);
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
const mf = (e, t, n) => e & t ^ ~e & n, wf = (e, t, n) => e & t ^ e & n ^ t & n, yf = /* @__PURE__ */ new Uint32Array([
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
]), fn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), hn = /* @__PURE__ */ new Uint32Array(64);
class If extends pf {
  constructor() {
    super(64, 32, 8, !1), this.A = fn[0] | 0, this.B = fn[1] | 0, this.C = fn[2] | 0, this.D = fn[3] | 0, this.E = fn[4] | 0, this.F = fn[5] | 0, this.G = fn[6] | 0, this.H = fn[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: i, F: o, G: c, H: A } = this;
    return [t, n, r, s, i, o, c, A];
  }
  // prettier-ignore
  set(t, n, r, s, i, o, c, A) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = A | 0;
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      hn[w] = t.getUint32(n, !1);
    for (let w = 16; w < 64; w++) {
      const C = hn[w - 15], v = hn[w - 2], R = Ht(C, 7) ^ Ht(C, 18) ^ C >>> 3, B = Ht(v, 17) ^ Ht(v, 19) ^ v >>> 10;
      hn[w] = B + hn[w - 7] + R + hn[w - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: A, G: f, H: I } = this;
    for (let w = 0; w < 64; w++) {
      const C = Ht(c, 6) ^ Ht(c, 11) ^ Ht(c, 25), v = I + C + mf(c, A, f) + yf[w] + hn[w] | 0, B = (Ht(r, 2) ^ Ht(r, 13) ^ Ht(r, 22)) + wf(r, s, i) | 0;
      I = f, f = A, A = c, c = o + v | 0, o = i, i = s, s = r, r = v + B | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, A = A + this.F | 0, f = f + this.G | 0, I = I + this.H | 0, this.set(r, s, i, o, c, A, f, I);
  }
  roundClean() {
    hn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Jr = /* @__PURE__ */ Fd(() => new If());
class Md extends No {
  constructor(t, n) {
    super(), this.finished = !1, this.destroyed = !1, Sd(t);
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
    sr(this), Ro(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const So = (e, t, n) => new Md(e, t).update(n).digest();
So.create = (e, t) => new Md(e, t);
function bf(e, t, n, r) {
  Sd(e);
  const s = Td({ dkLen: 32, asyncTick: 10 }, r), { c: i, dkLen: o, asyncTick: c } = s;
  if (Rt(i), Rt(o), Rt(c), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const A = ir(t), f = ir(n), I = new Uint8Array(o), w = So.create(e, A), C = w._cloneInto().update(f);
  return { c: i, dkLen: o, asyncTick: c, DK: I, PRF: w, PRFSalt: C };
}
function Ef(e, t, n, r, s) {
  return e.destroy(), t.destroy(), r && r.destroy(), s.fill(0), n;
}
function Od(e, t, n, r) {
  const { c: s, dkLen: i, DK: o, PRF: c, PRFSalt: A } = bf(e, t, n, r);
  let f;
  const I = new Uint8Array(4), w = ys(I), C = new Uint8Array(c.outputLen);
  for (let v = 1, R = 0; R < i; v++, R += c.outputLen) {
    const B = o.subarray(R, R + c.outputLen);
    w.setInt32(0, v, !1), (f = A._cloneInto(f)).update(I).digestInto(C), B.set(C.subarray(0, B.length));
    for (let M = 1; M < s; M++) {
      c._cloneInto(f).update(C).digestInto(C);
      for (let T = 0; T < B.length; T++)
        B[T] ^= C[T];
    }
  }
  return Ef(c, A, o, f, C);
}
const ye = (e, t) => e << t | e >>> 32 - t;
function Ta(e, t, n, r, s, i) {
  let o = e[t++] ^ n[r++], c = e[t++] ^ n[r++], A = e[t++] ^ n[r++], f = e[t++] ^ n[r++], I = e[t++] ^ n[r++], w = e[t++] ^ n[r++], C = e[t++] ^ n[r++], v = e[t++] ^ n[r++], R = e[t++] ^ n[r++], B = e[t++] ^ n[r++], M = e[t++] ^ n[r++], T = e[t++] ^ n[r++], V = e[t++] ^ n[r++], k = e[t++] ^ n[r++], J = e[t++] ^ n[r++], O = e[t++] ^ n[r++], F = o, L = c, U = A, j = f, H = I, Y = w, ee = C, E = v, a = R, d = B, l = M, p = T, h = V, y = k, b = J, g = O;
  for (let u = 0; u < 8; u += 2)
    H ^= ye(F + h | 0, 7), a ^= ye(H + F | 0, 9), h ^= ye(a + H | 0, 13), F ^= ye(h + a | 0, 18), d ^= ye(Y + L | 0, 7), y ^= ye(d + Y | 0, 9), L ^= ye(y + d | 0, 13), Y ^= ye(L + y | 0, 18), b ^= ye(l + ee | 0, 7), U ^= ye(b + l | 0, 9), ee ^= ye(U + b | 0, 13), l ^= ye(ee + U | 0, 18), j ^= ye(g + p | 0, 7), E ^= ye(j + g | 0, 9), p ^= ye(E + j | 0, 13), g ^= ye(p + E | 0, 18), L ^= ye(F + j | 0, 7), U ^= ye(L + F | 0, 9), j ^= ye(U + L | 0, 13), F ^= ye(j + U | 0, 18), ee ^= ye(Y + H | 0, 7), E ^= ye(ee + Y | 0, 9), H ^= ye(E + ee | 0, 13), Y ^= ye(H + E | 0, 18), p ^= ye(l + d | 0, 7), a ^= ye(p + l | 0, 9), d ^= ye(a + p | 0, 13), l ^= ye(d + a | 0, 18), h ^= ye(g + b | 0, 7), y ^= ye(h + g | 0, 9), b ^= ye(y + h | 0, 13), g ^= ye(b + y | 0, 18);
  s[i++] = o + F | 0, s[i++] = c + L | 0, s[i++] = A + U | 0, s[i++] = f + j | 0, s[i++] = I + H | 0, s[i++] = w + Y | 0, s[i++] = C + ee | 0, s[i++] = v + E | 0, s[i++] = R + a | 0, s[i++] = B + d | 0, s[i++] = M + l | 0, s[i++] = T + p | 0, s[i++] = V + h | 0, s[i++] = k + y | 0, s[i++] = J + b | 0, s[i++] = O + g | 0;
}
function vi(e, t, n, r, s) {
  let i = r + 0, o = r + 16 * s;
  for (let c = 0; c < 16; c++)
    n[o + c] = e[t + (2 * s - 1) * 16 + c];
  for (let c = 0; c < s; c++, i += 16, t += 16)
    Ta(n, o, e, t, n, i), c > 0 && (o += 16), Ta(n, i, e, t += 16, n, o);
}
function Cf(e, t, n) {
  const r = Td({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, n), { N: s, r: i, p: o, dkLen: c, asyncTick: A, maxmem: f, onProgress: I } = r;
  if (Rt(s), Rt(i), Rt(o), Rt(c), Rt(A), Rt(f), I !== void 0 && typeof I != "function")
    throw new Error("progressCb should be function");
  const w = 128 * i, C = w / 4;
  if (s <= 1 || s & s - 1 || s >= 2 ** (w / 8) || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (o < 0 || o > (2 ** 32 - 1) * 32 / w)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (c < 0 || c > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  const v = w * (s + o);
  if (v > f)
    throw new Error(`Scrypt: parameters too large, ${v} (128 * r * (N + p)) > ${f} (maxmem)`);
  const R = Od(Jr, e, t, { c: 1, dkLen: w * o }), B = ws(R), M = ws(new Uint8Array(w * s)), T = ws(new Uint8Array(w));
  let V = () => {
  };
  if (I) {
    const k = 2 * s * o, J = Math.max(Math.floor(k / 1e4), 1);
    let O = 0;
    V = () => {
      O++, I && (!(O % J) || O === k) && I(O / k);
    };
  }
  return { N: s, r: i, p: o, dkLen: c, blockSize32: C, V: M, B32: B, B: R, tmp: T, blockMixCb: V, asyncTick: A };
}
function Bf(e, t, n, r, s) {
  const i = Od(Jr, e, n, { c: 1, dkLen: t });
  return n.fill(0), r.fill(0), s.fill(0), i;
}
function xf(e, t, n) {
  const { N: r, r: s, p: i, dkLen: o, blockSize32: c, V: A, B32: f, B: I, tmp: w, blockMixCb: C } = Cf(e, t, n);
  for (let v = 0; v < i; v++) {
    const R = c * v;
    for (let B = 0; B < c; B++)
      A[B] = f[R + B];
    for (let B = 0, M = 0; B < r - 1; B++)
      vi(A, M, A, M += c, s), C();
    vi(A, (r - 1) * c, f, R, s), C();
    for (let B = 0; B < r; B++) {
      const M = f[R + c - 16] % r;
      for (let T = 0; T < c; T++)
        w[T] = f[R + T] ^ A[M * c + T];
      vi(w, 0, f, R, s), C();
    }
  }
  return Bf(e, o, I, A, w);
}
const ds = /* @__PURE__ */ BigInt(2 ** 32 - 1), Fa = /* @__PURE__ */ BigInt(32);
function _f(e, t = !1) {
  return t ? { h: Number(e & ds), l: Number(e >> Fa & ds) } : { h: Number(e >> Fa & ds) | 0, l: Number(e & ds) | 0 };
}
function vf(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let s = 0; s < e.length; s++) {
    const { h: i, l: o } = _f(e[s], t);
    [n[s], r[s]] = [i, o];
  }
  return [n, r];
}
const Rf = (e, t, n) => e << n | t >>> 32 - n, Nf = (e, t, n) => t << n | e >>> 32 - n, Sf = (e, t, n) => t << n - 32 | e >>> 64 - n, Df = (e, t, n) => e << n - 32 | t >>> 64 - n, [Ld, kd, Pd] = [[], [], []], Qf = /* @__PURE__ */ BigInt(0), br = /* @__PURE__ */ BigInt(1), Tf = /* @__PURE__ */ BigInt(2), Ff = /* @__PURE__ */ BigInt(7), Mf = /* @__PURE__ */ BigInt(256), Of = /* @__PURE__ */ BigInt(113);
for (let e = 0, t = br, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], Ld.push(2 * (5 * r + n)), kd.push((e + 1) * (e + 2) / 2 % 64);
  let s = Qf;
  for (let i = 0; i < 7; i++)
    t = (t << br ^ (t >> Ff) * Of) % Mf, t & Tf && (s ^= br << (br << /* @__PURE__ */ BigInt(i)) - br);
  Pd.push(s);
}
const [Lf, kf] = /* @__PURE__ */ vf(Pd, !0), Ma = (e, t, n) => n > 32 ? Sf(e, t, n) : Rf(e, t, n), Oa = (e, t, n) => n > 32 ? Df(e, t, n) : Nf(e, t, n);
function Pf(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, A = (o + 2) % 10, f = n[A], I = n[A + 1], w = Ma(f, I, 1) ^ n[c], C = Oa(f, I, 1) ^ n[c + 1];
      for (let v = 0; v < 50; v += 10)
        e[o + v] ^= w, e[o + v + 1] ^= C;
    }
    let s = e[2], i = e[3];
    for (let o = 0; o < 24; o++) {
      const c = kd[o], A = Ma(s, i, c), f = Oa(s, i, c), I = Ld[o];
      s = e[I], i = e[I + 1], e[I] = A, e[I + 1] = f;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        n[c] = e[o + c];
      for (let c = 0; c < 10; c++)
        e[o + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    e[0] ^= Lf[r], e[1] ^= kf[r];
  }
  n.fill(0);
}
class Do extends No {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Rt(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ws(this.state);
  }
  keccak() {
    Pf(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
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
    sr(this, !1), Ro(t), this.finish();
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
    if (Dd(t, this), this.finished)
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
    return t || (t = new Do(n, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Uf = (e, t, n) => Fd(() => new Do(t, e, n)), Gf = /* @__PURE__ */ Uf(1, 136, 256 / 8);
var Vf = (e) => {
  const { password: t, salt: n, n: r, p: s, r: i, dklen: o } = e;
  return xf(t, n, { N: r, r: i, p: s, dkLen: o });
}, Hf = (e) => Gf(e), Wn = (e, t = "base64") => {
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
}, { crypto: Ws, btoa: Ud } = globalThis;
if (!Ws)
  throw new _(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!Ud)
  throw new _(
    N.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Xi = (e) => Ws.getRandomValues(new Uint8Array(e)), Is = (e, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(e);
    case "base64": {
      const n = String.fromCharCode.apply(null, new Uint8Array(e));
      return Ud(n);
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
}, Gd = "AES-CTR", Qo = (e, t) => {
  const n = Wn(String(e).normalize("NFKC"), "utf-8"), r = mr(n, t, 1e5, 32, "sha256");
  return X(r);
}, Xf = async (e, t) => {
  const n = Xi(16), r = Xi(32), s = Qo(e, r), i = JSON.stringify(t), o = Wn(i, "utf-8"), c = {
    name: Gd,
    counter: n,
    length: 64
  }, A = await crypto.subtle.importKey("raw", s, c, !1, ["encrypt"]), f = await crypto.subtle.encrypt(c, A, o);
  return {
    data: Is(f),
    iv: Is(n),
    salt: Is(r)
  };
}, Yf = async (e, t) => {
  const n = Wn(t.iv), r = Wn(t.salt), s = Qo(e, r), i = Wn(t.data), o = {
    name: Gd,
    counter: n,
    length: 64
  }, c = await crypto.subtle.importKey("raw", s, o, !1, ["decrypt"]), A = await crypto.subtle.decrypt(o, c, i), f = new TextDecoder().decode(A);
  try {
    return JSON.parse(f);
  } catch {
    throw new _(N.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, zf = async (e, t, n) => {
  const r = Ws.subtle, s = new Uint8Array(t.subarray(0, 16)), i = n, o = e, c = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    c,
    o
  );
  return new Uint8Array(A);
}, Zf = async (e, t, n) => {
  const r = Ws.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(n).buffer, o = new Uint8Array(e).buffer, c = await r.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), A = await r.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    c,
    o
  );
  return new Uint8Array(A);
}, Jf = {
  bufferFromString: Wn,
  stringFromBuffer: Is,
  decrypt: Yf,
  encrypt: Xf,
  keyFromPassword: Qo,
  randomBytes: Xi,
  scrypt: Vf,
  keccak256: Hf,
  decryptJsonWalletData: Zf,
  encryptJsonWalletData: zf
}, Wf = Jf, {
  bufferFromString: En,
  decrypt: jf,
  encrypt: qf,
  keyFromPassword: sb,
  randomBytes: Zt,
  stringFromBuffer: xr,
  scrypt: Vd,
  keccak256: Hd,
  decryptJsonWalletData: $f,
  encryptJsonWalletData: Kf
} = Wf;
function It(e) {
  return Z(Jr(X(e)));
}
function on(e) {
  return It(e);
}
function eh(e) {
  const t = BigInt(e), n = new ArrayBuffer(8), r = new DataView(n);
  return r.setBigUint64(0, t, !1), new Uint8Array(r.buffer);
}
function th(e) {
  return on(En(e, "utf-8"));
}
var nh = Object.defineProperty, rh = (e, t, n) => t in e ? nh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Wr = (e, t, n) => (rh(e, typeof t != "symbol" ? t + "" : t, n), n), sh = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Xd = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Yd = (e, t, n) => (sh(e, t, "access private method"), n), oe = class {
  constructor(e, t, n) {
    D(this, "name");
    D(this, "type");
    D(this, "encodedLength");
    this.name = e, this.type = t, this.encodedLength = n;
  }
}, zd = "u8", Zd = "u16", Jd = "u32", Wd = "u64", jd = "u256", qd = "raw untyped ptr", $d = "raw untyped slice", Kd = "bool", eu = "b256", tu = "struct B512", To = "enum Option", Fo = "struct Vec", Mo = "struct Bytes", Oo = "struct String", nu = "str", Lo = /str\[(?<length>[0-9]+)\]/, Ss = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, ko = /^struct (?<name>\w+)$/, Po = /^enum (?<name>\w+)$/, ru = /^\((?<items>.*)\)$/, ih = /^generic (?<name>\w+)$/, Ut = "0", or = "1", ne = 8, Bn = 32, Yi = Bn + 2, Ln = Bn, su = Bn, oh = Bn, ah = ne * 4, ch = ne * 2, Uo = 2 ** 32 - 1, js = ({ maxInputs: e }) => Bn + // Tx ID
Ln + // Base asset ID
// Asset ID/Balance coin input pairs
e * (Ln + ne) + ne, Go = ne + // Identifier
ne + // Gas limit
ne + // Script size
ne + // Script data size
ne + // Policies
ne + // Inputs size
ne + // Outputs size
ne + // Witnesses size
Bn, dh = ne + // Identifier
ah + // Utxo Length
ne + // Output Index
oh + // Owner
ne + // Amount
Ln + // Asset id
ch + // TxPointer
ne + // Witnesses index
ne + // Predicate size
ne + // Predicate data size
ne, uh = {
  u64: ne,
  u256: ne * 4
}, S = class extends oe {
  constructor(e) {
    super("bigNumber", e, uh[e]);
  }
  encode(e) {
    let t;
    try {
      t = Pt(e, this.encodedLength);
    } catch {
      throw new _(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = e.slice(t, t + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new _(N.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [x(n), t + this.encodedLength];
  }
}, Ah = 3, wt = Ah * ne, lh = 2, La = lh * ne;
function Nt(e) {
  const t = {};
  let n = 0;
  const r = e.map((o) => {
    const c = o.dynamicData;
    c && Object.entries(c).forEach(([f, I]) => {
      t[parseInt(f, 10) + n] = I;
    });
    const A = X(o);
    return n += A.byteLength / ne, A;
  }), s = r.reduce((o, c) => o + c.length, 0), i = new Uint8Array(s);
  return r.reduce((o, c) => (i.set(c, o), o + c.length), 0), Object.keys(t).length && (i.dynamicData = t), i;
}
function iu(e, t, n) {
  if (!e.dynamicData)
    return re([e]);
  let r = 0, s = e;
  return Object.entries(e.dynamicData).forEach(([i, o]) => {
    const c = parseInt(i, 10) * ne, A = new S("u64").encode(
      n + t + r
    );
    s.set(A, c);
    const f = o.dynamicData ? (
      // unpack child dynamic data
      iu(
        o,
        t,
        n + o.byteLength + r
      )
    ) : o;
    s = re([s, f]), r += f.byteLength;
  }), s;
}
var fh = (e, t = ne) => {
  const n = [];
  let r = 0, s = e.slice(r, r + t);
  for (; s.length; )
    n.push(s), r += t, s = e.slice(r, r + t);
  return n;
}, hh = (e) => {
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
}, gh = (e) => e === Fo || e === Mo || e === Oo, Tr = (e) => e % ne === 0, ou = (e) => ne - e % ne, au = (e) => {
  if (Tr(e.length))
    return e;
  const t = new Uint8Array(ne - e.length % ne);
  return Vr([e, t]);
}, ph = (e) => e instanceof Uint8Array, we = class extends oe {
  constructor(t, n) {
    super("array", `[${t.type}; ${n}]`, n * t.encodedLength);
    D(this, "coder");
    D(this, "length");
    this.coder = t, this.length = n;
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new _(N.ENCODE_ERROR, "Expected array value.");
    if (this.length !== t.length)
      throw new _(N.ENCODE_ERROR, "Types/values length mismatch.");
    return Nt(Array.from(t).map((n) => this.coder.encode(n)));
  }
  decode(t, n) {
    if (t.length < this.encodedLength || t.length > Uo)
      throw new _(N.DECODE_ERROR, "Invalid array data size.");
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
      t = X(e);
    } catch {
      throw new _(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new _(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid b256 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (x(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid b256 byte data size.");
    return [bo(n, 32), t + 32];
  }
}, cu = class extends oe {
  constructor() {
    super("b512", "struct B512", ne * 8);
  }
  encode(e) {
    let t;
    try {
      t = X(e);
    } catch {
      throw new _(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (t.length !== this.encodedLength)
      throw new _(N.ENCODE_ERROR, `Invalid ${this.type}.`);
    return t;
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid b512 data size.");
    let n = e.slice(t, t + this.encodedLength);
    if (x(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid b512 byte data size.");
    return [bo(n, this.encodedLength), t + this.encodedLength];
  }
}, mh = class extends oe {
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
      throw new _(N.ENCODE_ERROR, "Invalid boolean value.");
    const r = Pt(t ? 1 : 0, this.paddingLength);
    return this.options.isRightPadded ? r.reverse() : r;
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new _(N.DECODE_ERROR, "Invalid boolean data size.");
    let r;
    this.options.isRightPadded ? r = t.slice(n, n + 1) : r = t.slice(n, n + this.paddingLength);
    const s = x(r);
    if (s.isZero())
      return [!1, n + this.paddingLength];
    if (!s.eq(x(1)))
      throw new _(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.paddingLength];
  }
}, zi, du, Ds = class extends oe {
  constructor() {
    super("struct", "struct Bytes", wt), Xd(this, zi);
  }
  encode(e) {
    const t = [], n = new S("u64").encode(wt), r = Yd(this, zi, du).call(this, e);
    return n.dynamicData = {
      0: Nt([r])
    }, t.push(n), t.push(new S("u64").encode(r.byteLength)), t.push(new S("u64").encode(e.length)), Nt(t);
  }
  decode(e, t) {
    if (e.length < wt)
      throw new _(N.DECODE_ERROR, "Invalid byte data size.");
    const n = e.slice(16, 24), r = x(new S("u64").decode(n, 0)[0]).toNumber(), s = e.slice(wt, wt + r);
    if (s.length !== r)
      throw new _(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [s, t + wt];
  }
};
zi = /* @__PURE__ */ new WeakSet();
du = function(e) {
  const t = e instanceof Uint8Array ? [e] : [new Uint8Array(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), re(t);
};
Wr(Ds, "memorySize", 1);
var wh = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), Kn, In, Gs, Au, Vs, lu, jc, uu = (jc = class extends oe {
  constructor(t, n) {
    const r = new S("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    mt(this, Gs);
    mt(this, Vs);
    D(this, "name");
    D(this, "coders");
    mt(this, Kn, void 0);
    mt(this, In, void 0);
    this.name = t, this.coders = n, Wt(this, Kn, r), Wt(this, In, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return cn(this, Gs, Au).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new _(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new _(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]), c = new Uint8Array(Re(this, In) - s.encodedLength);
    return Nt([Re(this, Kn).encode(i), c, o]);
  }
  decode(t, n) {
    if (t.length < Re(this, In))
      throw new _(N.DECODE_ERROR, "Invalid enum data size.");
    let r = n, s;
    [s, r] = new S("u64").decode(t, r);
    const i = Lt(s), o = Object.keys(this.coders)[i];
    if (!o)
      throw new _(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const c = this.coders[o], A = Re(this, In) - c.encodedLength;
    return r += A, [s, r] = c.decode(t, r), wh(this.coders) ? cn(this, Vs, lu).call(this, o, r) : [{ [o]: s }, r];
  }
}, Kn = new WeakMap(), In = new WeakMap(), Gs = new WeakSet(), Au = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Re(this, In) - n.encodedLength);
  return re([Re(this, Kn).encode(s), i, r]);
}, Vs = new WeakSet(), lu = function(t, n) {
  return [t, n];
}, jc), fu = class extends uu {
  encode(e) {
    return super.encode(this.toSwayOption(e));
  }
  toSwayOption(e) {
    return e !== void 0 ? { Some: e } : { None: [] };
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid option data size.");
    const [n, r] = super.decode(e, t);
    return [this.toOption(n), r];
  }
  toOption(e) {
    if (e && "Some" in e)
      return e.Some;
  }
}, $ = class extends oe {
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
      n = Pt(t);
    } catch {
      throw new _(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new _(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    const r = Pt(n, this.paddingLength);
    return this.baseType !== "u8" ? r : this.options.isRightPadded ? r.reverse() : r;
  }
  decodeU8(t, n) {
    let r;
    return this.options.isRightPadded ? r = t.slice(n, n + 1) : (r = t.slice(n, n + this.paddingLength), r = r.slice(this.paddingLength - this.length, this.paddingLength)), [Lt(r), n + this.paddingLength];
  }
  decode(t, n) {
    if (t.length < this.paddingLength)
      throw new _(N.DECODE_ERROR, "Invalid number data size.");
    if (this.baseType === "u8")
      return this.decodeU8(t, n);
    let r = t.slice(n, n + this.paddingLength);
    if (r = r.slice(8 - this.length, 8), r.length !== this.paddingLength - (this.paddingLength - this.length))
      throw new _(N.DECODE_ERROR, "Invalid number byte data size.");
    return [Lt(r), n + 8];
  }
}, yh = class extends oe {
  constructor() {
    super("raw untyped slice", "raw untyped slice", La);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new _(N.ENCODE_ERROR, "Expected array value.");
    const t = [], n = new $("u8", { isSmallBytes: !0 }), r = new S("u64").encode(
      La
    );
    return r.dynamicData = {
      0: Nt(e.map((s) => n.encode(s)))
    }, t.push(r), t.push(new S("u64").encode(e.length)), Nt(t);
  }
  decode(e, t) {
    const n = e.slice(t), r = new we(
      new $("u8", { isSmallBytes: !0 }),
      n.length
    ), [s] = r.decode(n, 0);
    return [s, t + n.length];
  }
}, Zi, hu, gu = class extends oe {
  constructor() {
    super("struct", "struct String", 1), Xd(this, Zi);
  }
  encode(e) {
    const t = [], n = new S("u64").encode(wt), r = Yd(this, Zi, hu).call(this, e);
    return n.dynamicData = {
      0: Nt([r])
    }, t.push(n), t.push(new S("u64").encode(r.byteLength)), t.push(new S("u64").encode(e.length)), Nt(t);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid std string data size.");
    const n = e.slice(16, 24), r = x(new S("u64").decode(n, 0)[0]).toNumber(), s = e.slice(wt, wt + r);
    if (s.length !== r)
      throw new _(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [Yr(s), t + wt];
  }
};
Zi = /* @__PURE__ */ new WeakSet();
hu = function(e) {
  const t = [Xr(e)], n = (ne - e.length % ne) % ne;
  return n && t.push(new Uint8Array(n)), re(t);
};
Wr(gu, "memorySize", 1);
var er, qc, Ih = (qc = class extends oe {
  constructor(t) {
    let n = (8 - t) % 8;
    n = n < 0 ? n + 8 : n;
    super("string", `str[${t}]`, t + n);
    D(this, "length");
    mt(this, er, void 0);
    this.length = t, Wt(this, er, n);
  }
  encode(t) {
    if (this.length !== t.length)
      throw new _(N.ENCODE_ERROR, "Value length mismatch during encode.");
    const n = Xr(t), r = new Uint8Array(Re(this, er));
    return re([n, r]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid string data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.length)
      throw new _(N.DECODE_ERROR, "Invalid string byte data size.");
    const s = Yr(r), i = Re(this, er);
    return [s, n + this.length + i];
  }
}, er = new WeakMap(), qc), qs = class extends oe {
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
      if (!(s instanceof fu) && i == null)
        throw new _(
          N.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${r}" not present.`
        );
      const o = s.encode(i);
      return Tr(o.length) ? o : au(o);
    });
    return Nt([Nt(n)]);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let A;
      return [A, r] = c.decode(t, r), Tr(r) || (r += ou(r)), i[o] = A, i;
    }, {}), r];
  }
}, pu = class extends oe {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new _(N.ENCODE_ERROR, "Types/values length mismatch.");
    return Nt(
      this.coders.map((n, r) => {
        const s = n.encode(t[r]);
        return Tr(s.length) ? s : au(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), Tr(r) || (r += ou(r)), o;
    }), r];
  }
}, mu = class extends oe {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + wt);
    D(this, "coder");
    this.coder = t;
  }
  encode(t) {
    if (!Array.isArray(t) && !ph(t))
      throw new _(
        N.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = [], r = new S("u64").encode(wt);
    return r.dynamicData = {
      0: Nt(Array.from(t).map((s) => this.coder.encode(s)))
    }, n.push(r), n.push(new S("u64").encode(t.length)), n.push(new S("u64").encode(t.length)), Nt(n);
  }
  decode(t, n) {
    if (t.length < wt || t.length > Uo)
      throw new _(N.DECODE_ERROR, "Invalid vec data size.");
    const r = t.slice(16, 24), i = x(new S("u64").decode(r, 0)[0]).toNumber() * this.coder.encodedLength, o = t.slice(wt, wt + i);
    if (o.length !== i)
      throw new _(N.DECODE_ERROR, "Invalid vec byte data size.");
    return [
      fh(o, this.coder.encodedLength).map(
        (c) => this.coder.decode(c, 0)[0]
      ),
      n + wt
    ];
  }
}, wu = (e) => {
  switch (e) {
    case void 0:
    case Ut:
      return Ut;
    case or:
      return or;
    default:
      throw new _(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${e}' is unsupported.`
      );
  }
}, bh = (e, t) => {
  const n = e.functions.find((r) => r.name === t);
  if (!n)
    throw new _(
      N.FUNCTION_NOT_FOUND,
      `Function with name '${t}' doesn't exist in the ABI`
    );
  return n;
}, nn = (e, t) => {
  const n = e.types.find((r) => r.typeId === t);
  if (!n)
    throw new _(
      N.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return n;
}, ka = (e, t) => t.filter((n) => nn(e, n.type).type !== "()"), yu = (e) => {
  var r;
  const t = e.find((s) => s.name === "buf"), n = (r = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : r[0];
  if (!t || !n)
    throw new _(
      N.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return n;
}, en = class {
  constructor(e, t) {
    D(this, "abi");
    D(this, "name");
    D(this, "type");
    D(this, "originalTypeArguments");
    D(this, "components");
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
      (o, c, A) => {
        var I;
        const f = { ...o };
        return f[c] = structuredClone(
          (I = t.typeArguments) == null ? void 0 : I[A]
        ), f;
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
      if (ih.test(i.type)) {
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
    return ko.test(this.type) ? "s" : Ss.test(this.type) ? "a" : Po.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var s, i;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const e = (s = Lo.exec(this.type)) == null ? void 0 : s.groups;
    if (e)
      return `str[${e.length}]`;
    if (this.components === null)
      return this.type;
    const t = (i = Ss.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `[${this.components[0].getSignature()};${t.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new en(this.abi, o).getSignature()).join(",")}>` : "", r = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${r}`;
  }
};
function Qs(e, t) {
  const { getCoder: n } = t;
  return e.reduce((r, s) => {
    const i = r;
    return i[s.name] = n(s, t), i;
  }, {});
}
var Un = (e, t) => {
  var A, f, I, w, C;
  switch (e.type) {
    case zd:
    case Zd:
    case Jd:
      return new $(e.type, t);
    case Wd:
    case qd:
      return new S("u64");
    case jd:
      return new S("u256");
    case $d:
      return new yh();
    case Kd:
      return new mh(t);
    case eu:
      return new G();
    case tu:
      return new cu();
    case Mo:
      return new Ds();
    case Oo:
      return new gu();
  }
  const n = (A = Lo.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new Ih(v);
  }
  const r = e.components, s = (f = Ss.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const v = parseInt(s.length, 10), R = r[0];
    if (!R)
      throw new _(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const B = Un(R, { isSmallBytes: !0 });
    return new we(B, v);
  }
  if (e.type === Fo) {
    const v = yu(r), R = new en(e.abi, v), B = Un(R, { isSmallBytes: !0, encoding: Ut });
    return new mu(B);
  }
  const i = (I = ko.exec(e.type)) == null ? void 0 : I.groups;
  if (i) {
    const v = Qs(r, { isRightPadded: !0, getCoder: Un });
    return new qs(i.name, v);
  }
  const o = (w = Po.exec(e.type)) == null ? void 0 : w.groups;
  if (o) {
    const v = Qs(r, { getCoder: Un });
    return e.type === To ? new fu(o.name, v) : new uu(o.name, v);
  }
  if ((C = ru.exec(e.type)) == null ? void 0 : C.groups) {
    const v = r.map(
      (R) => Un(R, { isRightPadded: !0, encoding: Ut })
    );
    return new pu(v);
  }
  throw e.type === nu ? new _(
    N.INVALID_DATA,
    "String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`"
  ) : new _(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
}, Eh = class extends oe {
  constructor() {
    super("boolean", "boolean", 1);
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new _(N.ENCODE_ERROR, "Invalid boolean value.");
    return Pt(e ? 1 : 0, this.encodedLength);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid boolean data size.");
    const n = x(e.slice(t, t + this.encodedLength));
    if (n.isZero())
      return [!1, t + this.encodedLength];
    if (!n.eq(x(1)))
      throw new _(N.DECODE_ERROR, "Invalid boolean value.");
    return [!0, t + this.encodedLength];
  }
}, Iu = class extends oe {
  constructor() {
    super("struct", "struct Bytes", ne);
  }
  encode(e) {
    const t = e instanceof Uint8Array ? e : new Uint8Array(e), n = new S("u64").encode(t.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < ne)
      throw new _(N.DECODE_ERROR, "Invalid byte data size.");
    const n = t + ne, r = e.slice(t, n), s = x(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new _(N.DECODE_ERROR, "Invalid bytes byte data size.");
    return [i, n + s];
  }
};
Wr(Iu, "memorySize", 1);
var Ch = (e) => Object.values(e).every(
  // @ts-expect-error complicated types
  ({ type: t, coders: n }) => t === "()" && JSON.stringify(n) === JSON.stringify([])
), tr, nr, Hs, Eu, Xs, Cu, $c, bu = ($c = class extends oe {
  constructor(t, n) {
    const r = new S("u64"), s = Object.values(n).reduce(
      (i, o) => Math.max(i, o.encodedLength),
      0
    );
    super(`enum ${t}`, `enum ${t}`, r.encodedLength + s);
    mt(this, Hs);
    mt(this, Xs);
    D(this, "name");
    D(this, "coders");
    mt(this, tr, void 0);
    mt(this, nr, void 0);
    this.name = t, this.coders = n, Wt(this, tr, r), Wt(this, nr, s);
  }
  encode(t) {
    if (typeof t == "string" && this.coders[t])
      return cn(this, Hs, Eu).call(this, t);
    const [n, ...r] = Object.keys(t);
    if (!n)
      throw new _(N.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (r.length !== 0)
      throw new _(N.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const s = this.coders[n], i = Object.keys(this.coders).indexOf(n), o = s.encode(t[n]);
    return new Uint8Array([...Re(this, tr).encode(i), ...o]);
  }
  decode(t, n) {
    if (t.length < Re(this, nr))
      throw new _(N.DECODE_ERROR, "Invalid enum data size.");
    const r = new S("u64").decode(t, n)[0], s = Lt(r), i = Object.keys(this.coders)[s];
    if (!i)
      throw new _(
        N.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${s}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[i], c = n + ne, [A, f] = o.decode(t, c);
    return Ch(this.coders) ? cn(this, Xs, Cu).call(this, i, f) : [{ [i]: A }, f];
  }
}, tr = new WeakMap(), nr = new WeakMap(), Hs = new WeakSet(), Eu = function(t) {
  const n = this.coders[t], r = n.encode([]), s = Object.keys(this.coders).indexOf(t), i = new Uint8Array(Re(this, nr) - n.encodedLength);
  return re([Re(this, tr).encode(s), i, r]);
}, Xs = new WeakSet(), Cu = function(t, n) {
  return [t, n];
}, $c), Bh = (e) => {
  switch (e) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new _(N.TYPE_NOT_SUPPORTED, `Invalid number type: ${e}`);
  }
}, Ji = class extends oe {
  constructor(t) {
    const n = Bh(t);
    super("number", t, n);
    D(this, "length");
    D(this, "baseType");
    this.baseType = t, this.length = n;
  }
  encode(t) {
    let n;
    try {
      n = Pt(t);
    } catch {
      throw new _(N.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.length)
      throw new _(N.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Pt(n, this.length);
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid number data size.");
    const r = t.slice(n, n + this.length);
    if (r.length !== this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid number byte data size.");
    return [Lt(r), n + this.length];
  }
}, Vo = class extends bu {
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
}, xh = class extends oe {
  constructor() {
    super("raw untyped slice", "raw untyped slice", ne);
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new _(N.ENCODE_ERROR, "Expected array value.");
    const n = new we(new Ji("u8"), e.length).encode(e), r = new S("u64").encode(n.length);
    return new Uint8Array([...r, ...n]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid raw slice data size.");
    const n = t + ne, r = e.slice(t, n), s = x(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new _(N.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new we(new Ji("u8"), s), [c] = o.decode(i, 0);
    return [c, n + s];
  }
}, Ho = class extends oe {
  constructor() {
    super("struct", "struct String", ne);
  }
  encode(e) {
    const t = Xr(e), n = new S("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid std string data size.");
    const n = t + ne, r = e.slice(t, n), s = x(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new _(N.DECODE_ERROR, "Invalid std string byte data size.");
    return [Yr(i), n + s];
  }
};
Wr(Ho, "memorySize", 1);
var Bu = class extends oe {
  constructor() {
    super("strSlice", "str", ne);
  }
  encode(e) {
    const t = Xr(e), n = new S("u64").encode(e.length);
    return new Uint8Array([...n, ...t]);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid string slice data size.");
    const n = t + ne, r = e.slice(t, n), s = x(new S("u64").decode(r, 0)[0]).toNumber(), i = e.slice(n, n + s);
    if (i.length !== s)
      throw new _(N.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Yr(i), n + s];
  }
};
Wr(Bu, "memorySize", 1);
var _h = class extends oe {
  constructor(e) {
    super("string", `str[${e}]`, e);
  }
  encode(e) {
    if (e.length !== this.encodedLength)
      throw new _(N.ENCODE_ERROR, "Value length mismatch during encode.");
    return Xr(e);
  }
  decode(e, t) {
    if (e.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid string data size.");
    const n = e.slice(t, t + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid string byte data size.");
    return [Yr(n), t + this.encodedLength];
  }
}, vh = class extends oe {
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
    return Vr(
      Object.keys(this.coders).map((n) => {
        const r = this.coders[n], s = t[n];
        if (!(r instanceof Vo) && s == null)
          throw new _(
            N.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return r.encode(s);
      })
    );
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid struct data size.");
    let r = n;
    return [Object.keys(this.coders).reduce((i, o) => {
      const c = this.coders[o];
      let A;
      return [A, r] = c.decode(t, r), i[o] = A, i;
    }, {}), r];
  }
}, xu = class extends oe {
  constructor(t) {
    const n = t.reduce((r, s) => r + s.encodedLength, 0);
    super("tuple", `(${t.map((r) => r.type).join(", ")})`, n);
    D(this, "coders");
    this.coders = t;
  }
  encode(t) {
    if (this.coders.length !== t.length)
      throw new _(N.ENCODE_ERROR, "Types/values length mismatch.");
    return Vr(this.coders.map((n, r) => n.encode(t[r])));
  }
  decode(t, n) {
    if (t.length < this.encodedLength)
      throw new _(N.DECODE_ERROR, "Invalid tuple data size.");
    let r = n;
    return [this.coders.map((i) => {
      let o;
      return [o, r] = i.decode(t, r), o;
    }), r];
  }
}, rr, Kc, Rh = (Kc = class extends oe {
  constructor(t) {
    super("struct", "struct Vec", t.encodedLength + ne);
    D(this, "coder");
    mt(this, rr, void 0);
    this.coder = t, Wt(this, rr, this.coder instanceof Vo);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new _(N.ENCODE_ERROR, "Expected array value.");
    const n = t.map((s) => this.coder.encode(s)), r = new S("u64").encode(t.length);
    return new Uint8Array([...r, ...Vr(n)]);
  }
  decode(t, n) {
    if (!Re(this, rr) && (t.length < this.encodedLength || t.length > Uo))
      throw new _(N.DECODE_ERROR, "Invalid vec data size.");
    const r = n + ne, s = t.slice(n, r), i = x(new S("u64").decode(s, 0)[0]).toNumber(), o = i * this.coder.encodedLength, c = t.slice(r, r + o);
    if (!Re(this, rr) && c.length !== o)
      throw new _(N.DECODE_ERROR, "Invalid vec byte data size.");
    let A = r;
    const f = [];
    for (let I = 0; I < i; I++) {
      const [w, C] = this.coder.decode(t, A);
      f.push(w), A = C;
    }
    return [f, A];
  }
}, rr = new WeakMap(), Kc), Gn = (e, t) => {
  var A, f, I, w, C;
  switch (e.type) {
    case zd:
    case Zd:
    case Jd:
      return new Ji(e.type);
    case Wd:
    case qd:
      return new S("u64");
    case jd:
      return new S("u256");
    case $d:
      return new xh();
    case Kd:
      return new Eh();
    case eu:
      return new G();
    case tu:
      return new cu();
    case Mo:
      return new Iu();
    case Oo:
      return new Ho();
    case nu:
      return new Bu();
  }
  const n = (A = Lo.exec(e.type)) == null ? void 0 : A.groups;
  if (n) {
    const v = parseInt(n.length, 10);
    return new _h(v);
  }
  const r = e.components, s = (f = Ss.exec(e.type)) == null ? void 0 : f.groups;
  if (s) {
    const v = parseInt(s.length, 10), R = r[0];
    if (!R)
      throw new _(
        N.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const B = Gn(R);
    return new we(B, v);
  }
  if (e.type === Fo) {
    const v = yu(r), R = new en(e.abi, v), B = Gn(R);
    return new Rh(B);
  }
  const i = (I = ko.exec(e.type)) == null ? void 0 : I.groups;
  if (i) {
    const v = Qs(r, { isRightPadded: !0, getCoder: Gn });
    return new vh(i.name, v);
  }
  const o = (w = Po.exec(e.type)) == null ? void 0 : w.groups;
  if (o) {
    const v = Qs(r, { getCoder: Gn });
    return e.type === To ? new Vo(o.name, v) : new bu(o.name, v);
  }
  if ((C = ru.exec(e.type)) == null ? void 0 : C.groups) {
    const v = r.map(
      (R) => Gn(R)
    );
    return new xu(v);
  }
  throw new _(
    N.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(e)}.`
  );
};
function Nh(e = Ut) {
  switch (e) {
    case or:
      return Gn;
    case Ut:
      return Un;
    default:
      throw new _(
        N.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${e} is unsupported.`
      );
  }
}
var Yn = class {
  static getCoder(e, t, n = {
    isSmallBytes: !1
  }) {
    const r = new en(e, t);
    return Nh(n.encoding)(r, n);
  }
  static encode(e, t, n, r) {
    return this.getCoder(e, t, r).encode(n);
  }
  static decode(e, t, n, r, s) {
    return this.getCoder(e, t, s).decode(n, r);
  }
}, Ys, _u, zs, vu, Zs, Ru, ed, bs = (ed = class {
  constructor(e, t) {
    mt(this, Ys);
    mt(this, zs);
    mt(this, Zs);
    D(this, "signature");
    D(this, "selector");
    D(this, "selectorBytes");
    D(this, "encoding");
    D(this, "name");
    D(this, "jsonFn");
    D(this, "attributes");
    D(this, "isInputDataPointer");
    D(this, "outputMetadata");
    D(this, "jsonAbi");
    this.jsonAbi = e, this.jsonFn = bh(this.jsonAbi, t), this.name = t, this.signature = bs.getSignature(this.jsonAbi, this.jsonFn), this.selector = bs.getFunctionSelector(this.signature), this.selectorBytes = new Ho().encode(t), this.encoding = wu(e.encoding), this.isInputDataPointer = cn(this, Ys, _u).call(this), this.outputMetadata = {
      isHeapType: cn(this, zs, vu).call(this),
      encodedLength: cn(this, Zs, Ru).call(this)
    }, this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(e, t) {
    const n = t.inputs.map(
      (r) => new en(e, r).getSignature()
    );
    return `${t.name}(${n.join(",")})`;
  }
  static getFunctionSelector(e) {
    const t = It(En(e, "utf-8"));
    return x(t.slice(0, 10)).toHex(8);
  }
  encodeArguments(e, t = 0) {
    bs.verifyArgsAndInputsAlign(e, this.jsonFn.inputs, this.jsonAbi);
    const n = e.slice(), r = ka(this.jsonAbi, this.jsonFn.inputs);
    Array.isArray(e) && r.length !== e.length && (n.length = this.jsonFn.inputs.length, n.fill(void 0, e.length));
    const s = r.map(
      (o) => Yn.getCoder(this.jsonAbi, o, {
        isRightPadded: r.length > 1,
        encoding: this.encoding
      })
    );
    if (this.encoding === or)
      return new xu(s).encode(n);
    const i = new pu(s).encode(n);
    return iu(i, t, i.byteLength);
  }
  static verifyArgsAndInputsAlign(e, t, n) {
    if (e.length === t.length)
      return;
    const r = t.map((o) => nn(n, o.type)), s = r.filter(
      (o) => o.type === To || o.type === "()"
    );
    if (s.length === r.length || r.length - s.length === e.length)
      return;
    const i = `Mismatch between provided arguments and expected ABI inputs. Provided ${e.length} arguments, but expected ${t.length - s.length} (excluding ${s.length} optional inputs).`;
    throw new _(N.ABI_TYPES_AND_VALUES_MISMATCH, i);
  }
  decodeArguments(e) {
    const t = X(e), n = ka(this.jsonAbi, this.jsonFn.inputs);
    if (n.length === 0) {
      if (t.length === 0)
        return;
      throw new _(
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
        const o = Yn.getCoder(this.jsonAbi, i, { encoding: this.encoding }), [c, A] = o.decode(t, s.offset);
        return {
          decoded: [...s.decoded, c],
          offset: s.offset + A
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(e) {
    if (nn(this.jsonAbi, this.jsonFn.output.type).type === "()")
      return [void 0, 0];
    const n = X(e);
    return Yn.getCoder(this.jsonAbi, this.jsonFn.output, {
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
}, Ys = new WeakSet(), _u = function() {
  var t;
  const e = this.jsonFn.inputs.map((n) => nn(this.jsonAbi, n.type));
  return this.jsonFn.inputs.length > 1 || hh(((t = e[0]) == null ? void 0 : t.type) || "");
}, zs = new WeakSet(), vu = function() {
  const e = nn(this.jsonAbi, this.jsonFn.output.type);
  return gh((e == null ? void 0 : e.type) || "");
}, Zs = new WeakSet(), Ru = function() {
  try {
    const e = Yn.getCoder(this.jsonAbi, this.jsonFn.output);
    return e instanceof mu ? e.coder.encodedLength : e instanceof Ds ? Ds.memorySize : e.encodedLength;
  } catch {
    return 0;
  }
}, ed), an = class {
  constructor(e) {
    D(this, "functions");
    D(this, "configurables");
    D(this, "jsonAbi");
    D(this, "encoding");
    this.jsonAbi = e, this.encoding = wu(e.encoding), this.functions = Object.fromEntries(
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
    throw new _(
      N.FUNCTION_NOT_FOUND,
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
      throw new _(
        N.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${t}' doesn't exist in the ABI.`
      );
    return Yn.decode(this.jsonAbi, n.loggedType, X(e), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(e, t) {
    const n = this.jsonAbi.configurables.find((r) => r.name === e);
    if (!n)
      throw new _(
        N.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${e}' was not found in the ABI.`
      );
    return Yn.encode(this.jsonAbi, n.configurableType, t, {
      isRightPadded: !0,
      // TODO: Review support for configurables in v1 encoding when it becomes available
      encoding: Ut
    });
  }
  getTypeById(e) {
    return nn(this.jsonAbi, e);
  }
}, ib = class {
}, Sh = class {
}, Nu = class {
}, Su = class {
}, Dh = class extends Su {
}, Qh = class extends Su {
}, Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
var ar = Fr.bech32m = Fr.bech32 = void 0;
const Ts = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Du = {};
for (let e = 0; e < Ts.length; e++) {
  const t = Ts.charAt(e);
  Du[t] = e;
}
function jn(e) {
  const t = e >> 25;
  return (e & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Pa(e) {
  let t = 1;
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + e + ")";
    t = jn(t) ^ r >> 5;
  }
  t = jn(t);
  for (let n = 0; n < e.length; ++n) {
    const r = e.charCodeAt(n);
    t = jn(t) ^ r & 31;
  }
  return t;
}
function Xo(e, t, n, r) {
  let s = 0, i = 0;
  const o = (1 << n) - 1, c = [];
  for (let A = 0; A < e.length; ++A)
    for (s = s << t | e[A], i += t; i >= n; )
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
function Th(e) {
  return Xo(e, 8, 5, !0);
}
function Fh(e) {
  const t = Xo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function Mh(e) {
  const t = Xo(e, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function Qu(e) {
  let t;
  e === "bech32" ? t = 1 : t = 734539939;
  function n(o, c, A) {
    if (A = A || 90, o.length + 7 + c.length > A)
      throw new TypeError("Exceeds length limit");
    o = o.toLowerCase();
    let f = Pa(o);
    if (typeof f == "string")
      throw new Error(f);
    let I = o + "1";
    for (let w = 0; w < c.length; ++w) {
      const C = c[w];
      if (C >> 5)
        throw new Error("Non 5-bit word");
      f = jn(f) ^ C, I += Ts.charAt(C);
    }
    for (let w = 0; w < 6; ++w)
      f = jn(f);
    f ^= t;
    for (let w = 0; w < 6; ++w) {
      const C = f >> (5 - w) * 5 & 31;
      I += Ts.charAt(C);
    }
    return I;
  }
  function r(o, c) {
    if (c = c || 90, o.length < 8)
      return o + " too short";
    if (o.length > c)
      return "Exceeds length limit";
    const A = o.toLowerCase(), f = o.toUpperCase();
    if (o !== A && o !== f)
      return "Mixed-case string " + o;
    o = A;
    const I = o.lastIndexOf("1");
    if (I === -1)
      return "No separator character for " + o;
    if (I === 0)
      return "Missing prefix for " + o;
    const w = o.slice(0, I), C = o.slice(I + 1);
    if (C.length < 6)
      return "Data too short";
    let v = Pa(w);
    if (typeof v == "string")
      return v;
    const R = [];
    for (let B = 0; B < C.length; ++B) {
      const M = C.charAt(B), T = Du[M];
      if (T === void 0)
        return "Unknown character " + M;
      v = jn(v) ^ T, !(B + 6 >= C.length) && R.push(T);
    }
    return v !== t ? "Invalid checksum for " + o : { prefix: w, words: R };
  }
  function s(o, c) {
    const A = r(o, c);
    if (typeof A == "object")
      return A;
  }
  function i(o, c) {
    const A = r(o, c);
    if (typeof A == "object")
      return A;
    throw new Error(A);
  }
  return {
    decodeUnsafe: s,
    decode: i,
    encode: n,
    toWords: Th,
    fromWordsUnsafe: Fh,
    fromWords: Mh
  };
}
Fr.bech32 = Qu("bech32");
ar = Fr.bech32m = Qu("bech32m");
var Fs = "fuel";
function Yo(e) {
  return ar.decode(e);
}
function Es(e) {
  return ar.encode(
    Fs,
    ar.toWords(X(Z(e)))
  );
}
function Cs(e) {
  return typeof e == "string" && e.indexOf(Fs + 1) === 0 && Yo(e).prefix === Fs;
}
function Wi(e) {
  return e.length === 66 && /(0x)[0-9a-f]{64}$/i.test(e);
}
function Ua(e) {
  return e.length === 130 && /(0x)[0-9a-f]{128}$/i.test(e);
}
function ji(e) {
  return e.length === 42 && /(0x)[0-9a-f]{40}$/i.test(e);
}
function zo(e) {
  return new Uint8Array(ar.fromWords(Yo(e).words));
}
function Ga(e) {
  if (!Cs(e))
    throw new _(
      _.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${e}.`
    );
  return Z(zo(e));
}
function Oh(e) {
  const { words: t } = Yo(e);
  return ar.encode(Fs, t);
}
var _r = (e) => e instanceof Nu ? e.address : e instanceof Dh ? e.id : e, Lh = () => Z(Zt(32)), kh = (e) => {
  let t;
  try {
    if (!Wi(e))
      throw new _(
        _.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${e}.`
      );
    t = zo(Es(e)), t = Z(t.fill(0, 0, 12));
  } catch {
    throw new _(
      _.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${e}.`
    );
  }
  return t;
}, Ph = (e) => {
  if (!ji(e))
    throw new _(_.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return e.replace("0x", "0x000000000000000000000000");
}, Ae = class extends Sh {
  // #endregion address-2
  /**
   * @param address - A Bech32 address
   */
  constructor(t) {
    super();
    // #region address-2
    D(this, "bech32Address");
    if (this.bech32Address = Oh(t), !Cs(this.bech32Address))
      throw new _(
        _.CODES.INVALID_BECH32_ADDRESS,
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
    return Ga(this.bech32Address);
  }
  /**
   * Converts and returns the `bech32Address` property to a byte array
   *
   * @returns The `bech32Address` property as a byte array
   */
  toBytes() {
    return zo(this.bech32Address);
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
    const t = Ga(this.bech32Address);
    return {
      bits: kh(t)
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
    if (!Ua(t))
      throw new _(_.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${t}.`);
    const n = Z(Jr(X(t)));
    return new Ae(Es(n));
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(t) {
    if (!Wi(t))
      throw new _(
        _.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new Ae(Es(t));
  }
  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return this.fromB256(Lh());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(t) {
    return Cs(t) ? new Ae(t) : this.fromB256(t);
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
      return Ae.fromB256(t.toB256());
    if (Ua(t))
      return Ae.fromPublicKey(t);
    if (Cs(t))
      return new Ae(t);
    if (Wi(t))
      return Ae.fromB256(t);
    if (ji(t))
      return Ae.fromEvmAddress(t);
    throw new _(
      _.CODES.PARSE_FAILED,
      "Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported."
    );
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(t) {
    if (!ji(t))
      throw new _(
        _.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    const n = Ph(t);
    return new Ae(Es(n));
  }
};
function Uh(e) {
  return e != null && typeof e == "object" && e["@@functional/placeholder"] === !0;
}
function Tu(e) {
  return function t(n) {
    return arguments.length === 0 || Uh(n) ? t : e.apply(this, arguments);
  };
}
var Gh = /* @__PURE__ */ Tu(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function Vh(e) {
  return new RegExp(e.source, e.flags ? e.flags : (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.sticky ? "y" : "") + (e.unicode ? "u" : "") + (e.dotAll ? "s" : ""));
}
function Fu(e, t, n) {
  if (n || (n = new Xh()), Hh(e))
    return e;
  var r = function(i) {
    var o = n.get(e);
    if (o)
      return o;
    n.set(e, i);
    for (var c in e)
      Object.prototype.hasOwnProperty.call(e, c) && (i[c] = t ? Fu(e[c], !0, n) : e[c]);
    return i;
  };
  switch (Gh(e)) {
    case "Object":
      return r(Object.create(Object.getPrototypeOf(e)));
    case "Array":
      return r([]);
    case "Date":
      return new Date(e.valueOf());
    case "RegExp":
      return Vh(e);
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
function Hh(e) {
  var t = typeof e;
  return e == null || t != "object" && t != "function";
}
var Xh = /* @__PURE__ */ function() {
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
}(), rn = /* @__PURE__ */ Tu(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Fu(t, !0);
}), bn, td, Ie = (td = class extends oe {
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
    mt(this, bn, void 0);
    this.length = t, Wt(this, bn, n);
  }
  encode(t) {
    const n = [], r = X(t);
    return n.push(r), Re(this, bn) && n.push(new Uint8Array(Re(this, bn))), re(n);
  }
  decode(t, n) {
    let r, s = n;
    [r, s] = [Z(t.slice(s, s + this.length)), s + this.length];
    const i = r;
    return Re(this, bn) && ([r, s] = [null, s + Re(this, bn)]), [i, s];
  }
}, bn = new WeakMap(), td), cr = class extends qs {
  constructor() {
    super("TxPointer", {
      blockHeight: new $("u32"),
      txIndex: new $("u16")
    });
  }
}, me = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Message = 2] = "Message", e))(me || {}), Va = class extends oe {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new $("u16").encode(e.outputIndex)), t.push(new G().encode(e.owner)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new cr().encode(e.txPointer)), t.push(new $("u16").encode(e.witnessIndex)), t.push(new S("u64").encode(e.predicateGasUsed)), t.push(new S("u64").encode(e.predicateLength)), t.push(new S("u64").encode(e.predicateDataLength)), t.push(new Ie(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ie(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new $("u16").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    [n, r] = new cr().decode(e, r);
    const f = n;
    [n, r] = new $("u16").decode(e, r);
    const I = Number(n);
    [n, r] = new S("u64").decode(e, r);
    const w = n;
    [n, r] = new S("u64").decode(e, r);
    const C = n;
    [n, r] = new S("u64").decode(e, r);
    const v = n;
    [n, r] = new Ie(C.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new Ie(v.toNumber()).decode(e, r), [
      {
        type: 0,
        txID: s,
        outputIndex: i,
        owner: o,
        amount: c,
        assetId: A,
        txPointer: f,
        witnessIndex: I,
        predicateGasUsed: w,
        predicateLength: C,
        predicateDataLength: v,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, Ms = class extends oe {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.txID)), t.push(new $("u16").encode(e.outputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), t.push(new cr().encode(e.txPointer)), t.push(new G().encode(e.contractID)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new $("u16").decode(e, r);
    const i = n;
    [n, r] = new G().decode(e, r);
    const o = n;
    [n, r] = new G().decode(e, r);
    const c = n;
    [n, r] = new cr().decode(e, r);
    const A = n;
    return [n, r] = new G().decode(e, r), [
      {
        type: 1,
        txID: s,
        outputIndex: i,
        balanceRoot: o,
        stateRoot: c,
        txPointer: A,
        contractID: n
      },
      r
    ];
  }
}, Mr = class extends oe {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new S("u64").encode(e.amount)), t.push(X(e.data || "0x")), It(re(t));
  }
  static encodeData(e) {
    const t = X(e || "0x"), n = t.length;
    return new Ie(n).encode(t);
  }
  encode(e) {
    const t = [], n = Mr.encodeData(e.data);
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new S("u64").encode(e.amount)), t.push(new Ie(32).encode(e.nonce)), t.push(new $("u16").encode(e.witnessIndex)), t.push(new S("u64").encode(e.predicateGasUsed)), t.push(new S("u64").encode(n.length)), t.push(new S("u64").encode(e.predicateLength)), t.push(new S("u64").encode(e.predicateDataLength)), t.push(new Ie(n.length).encode(n)), t.push(new Ie(e.predicateLength.toNumber()).encode(e.predicate)), t.push(
      new Ie(e.predicateDataLength.toNumber()).encode(e.predicateData)
    ), re(t);
  }
  static decodeData(e) {
    const t = X(e), n = t.length, [r] = new Ie(n).decode(t, 0);
    return X(r);
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
    const c = n;
    [n, r] = new $("u16").decode(e, r);
    const A = Number(n);
    [n, r] = new S("u64").decode(e, r);
    const f = n;
    [n, r] = new $("u32").decode(e, r);
    const I = n;
    [n, r] = new S("u64").decode(e, r);
    const w = n;
    [n, r] = new S("u64").decode(e, r);
    const C = n;
    [n, r] = new Ie(I).decode(e, r);
    const v = n;
    [n, r] = new Ie(w.toNumber()).decode(e, r);
    const R = n;
    return [n, r] = new Ie(C.toNumber()).decode(e, r), [
      {
        type: 2,
        sender: s,
        recipient: i,
        amount: o,
        witnessIndex: A,
        nonce: c,
        predicateGasUsed: f,
        dataLength: I,
        predicateLength: w,
        predicateDataLength: C,
        data: v,
        predicate: R,
        predicateData: n
      },
      r
    ];
  }
}, xn = class extends oe {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Va().encode(e));
        break;
      }
      case 1: {
        t.push(new Ms().encode(e));
        break;
      }
      case 2: {
        t.push(new Mr().encode(e));
        break;
      }
      default:
        throw new _(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Va().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ms().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Mr().decode(e, r), [n, r];
      default:
        throw new _(
          N.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${s}.`
        );
    }
  }
}, Ee = /* @__PURE__ */ ((e) => (e[e.Coin = 0] = "Coin", e[e.Contract = 1] = "Contract", e[e.Change = 2] = "Change", e[e.Variable = 3] = "Variable", e[e.ContractCreated = 4] = "ContractCreated", e))(Ee || {}), Ha = class extends oe {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), re(t);
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
}, Os = class extends oe {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u8").encode(e.inputIndex)), t.push(new G().encode(e.balanceRoot)), t.push(new G().encode(e.stateRoot)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8").decode(e, r);
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
}, Xa = class extends oe {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), re(t);
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
}, Ya = class extends oe {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), re(t);
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
}, za = class extends oe {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.contractId)), t.push(new G().encode(e.stateRoot)), re(t);
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
}, _n = class extends oe {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8").encode(e.type));
    const { type: n } = e;
    switch (n) {
      case 0: {
        t.push(new Ha().encode(e));
        break;
      }
      case 1: {
        t.push(new Os().encode(e));
        break;
      }
      case 2: {
        t.push(new Xa().encode(e));
        break;
      }
      case 3: {
        t.push(new Ya().encode(e));
        break;
      }
      case 4: {
        t.push(new za().encode(e));
        break;
      }
      default:
        throw new _(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Ha().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Os().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Xa().decode(e, r), [n, r];
      case 3:
        return [n, r] = new Ya().decode(e, r), [n, r];
      case 4:
        return [n, r] = new za().decode(e, r), [n, r];
      default:
        throw new _(
          N.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${s}.`
        );
    }
  }
}, Ft = /* @__PURE__ */ ((e) => (e[e.Tip = 1] = "Tip", e[e.WitnessLimit = 2] = "WitnessLimit", e[e.Maturity = 4] = "Maturity", e[e.MaxFee = 8] = "MaxFee", e))(Ft || {}), Yh = (e) => e.sort((t, n) => t.type - n.type);
function zh(e) {
  const t = /* @__PURE__ */ new Set();
  e.forEach((n) => {
    if (t.has(n.type))
      throw new _(
        N.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(n.type);
  });
}
var vn = class extends oe {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(e) {
    zh(e);
    const t = Yh(e), n = [];
    return t.forEach(({ data: r, type: s }) => {
      switch (s) {
        case 8:
        case 1:
        case 2:
          n.push(new S("u64").encode(r));
          break;
        case 4:
          n.push(new $("u32").encode(r));
          break;
        default:
          throw new _(N.INVALID_POLICY_TYPE, `Invalid policy type: ${s}`);
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
      const [i, o] = new $("u32").decode(e, r);
      r = o, s.push({ type: 4, data: i });
    }
    if (n & 8) {
      const [i, o] = new S("u64").decode(e, r);
      r = o, s.push({ type: 8, data: i });
    }
    return [s, r];
  }
}, ue = /* @__PURE__ */ ((e) => (e[e.Call = 0] = "Call", e[e.Return = 1] = "Return", e[e.ReturnData = 2] = "ReturnData", e[e.Panic = 3] = "Panic", e[e.Revert = 4] = "Revert", e[e.Log = 5] = "Log", e[e.LogData = 6] = "LogData", e[e.Transfer = 7] = "Transfer", e[e.TransferOut = 8] = "TransferOut", e[e.ScriptResult = 9] = "ScriptResult", e[e.MessageOut = 10] = "MessageOut", e[e.Mint = 11] = "Mint", e[e.Burn = 12] = "Burn", e))(ue || {}), Za = class extends oe {
  constructor() {
    super("ReceiptCall", "struct ReceiptCall", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new S("u64").encode(e.gas)), t.push(new S("u64").encode(e.param1)), t.push(new S("u64").encode(e.param2)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const f = n;
    [n, r] = new S("u64").decode(e, r);
    const I = n;
    [n, r] = new S("u64").decode(e, r);
    const w = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 0,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        gas: A,
        param1: f,
        param2: I,
        pc: w,
        is: n
      },
      r
    ];
  }
}, Ja = class extends oe {
  constructor() {
    super("ReceiptReturn", "struct ReceiptReturn", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
}, Wa = class extends oe {
  constructor() {
    super("ReceiptReturnData", "struct ReceiptReturnData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.ptr)), t.push(new S("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 2,
        id: s,
        ptr: i,
        len: o,
        digest: c,
        pc: A,
        is: n
      },
      r
    ];
  }
}, ja = class extends oe {
  constructor() {
    super("ReceiptPanic", "struct ReceiptPanic", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.reason)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), t.push(new G().encode(e.contractId)), re(t);
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
}, qa = class extends oe {
  constructor() {
    super("ReceiptRevert", "struct ReceiptRevert", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
}, $a = class extends oe {
  constructor() {
    super("ReceiptLog", "struct ReceiptLog", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val0)), t.push(new S("u64").encode(e.val1)), t.push(new S("u64").encode(e.val2)), t.push(new S("u64").encode(e.val3)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new S("u64").decode(e, r);
    const f = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 5,
        id: s,
        val0: i,
        val1: o,
        val2: c,
        val3: A,
        pc: f,
        is: n
      },
      r
    ];
  }
}, Ka = class extends oe {
  constructor() {
    super("ReceiptLogData", "struct ReceiptLogData", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.id)), t.push(new S("u64").encode(e.val0)), t.push(new S("u64").encode(e.val1)), t.push(new S("u64").encode(e.ptr)), t.push(new S("u64").encode(e.len)), t.push(new G().encode(e.digest)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    [n, r] = new G().decode(e, r);
    const f = n;
    [n, r] = new S("u64").decode(e, r);
    const I = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 6,
        id: s,
        val0: i,
        val1: o,
        ptr: c,
        len: A,
        digest: f,
        pc: I,
        is: n
      },
      r
    ];
  }
}, ec = class extends oe {
  constructor() {
    super("ReceiptTransfer", "struct ReceiptTransfer", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 7,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        pc: A,
        is: n
      },
      r
    ];
  }
}, tc = class extends oe {
  constructor() {
    super("ReceiptTransferOut", "struct ReceiptTransferOut", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.from)), t.push(new G().encode(e.to)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.assetId)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 8,
        from: s,
        to: i,
        amount: o,
        assetId: c,
        pc: A,
        is: n
      },
      r
    ];
  }
}, nc = class extends oe {
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
}, Ls = class extends oe {
  constructor() {
    super("ReceiptMessageOut", "struct ReceiptMessageOut", 0);
  }
  static getMessageId(e) {
    const t = [];
    return t.push(new Ie(32).encode(e.sender)), t.push(new Ie(32).encode(e.recipient)), t.push(new Ie(32).encode(e.nonce)), t.push(new S("u64").encode(e.amount)), t.push(X(e.data || "0x")), It(re(t));
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.sender)), t.push(new G().encode(e.recipient)), t.push(new S("u64").encode(e.amount)), t.push(new G().encode(e.nonce)), t.push(new $("u16").encode(e.data.length)), t.push(new G().encode(e.digest)), t.push(new Ie(e.data.length).encode(e.data)), re(t);
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
    const c = n;
    [n, r] = new $("u16").decode(e, r);
    const A = n;
    [n, r] = new G().decode(e, r);
    const f = n;
    [n, r] = new Ie(A).decode(e, r);
    const I = X(n), w = {
      type: 10,
      messageId: "",
      sender: s,
      recipient: i,
      amount: o,
      nonce: c,
      digest: f,
      data: I
    };
    return w.messageId = Ls.getMessageId(w), [w, r];
  }
}, Mu = (e, t) => {
  const n = X(e), r = X(t);
  return It(re([n, r]));
}, Or = class extends oe {
  constructor() {
    super("ReceiptMint", "struct ReceiptMint", 0);
  }
  static getAssetId(e, t) {
    return Mu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n, f = Or.getAssetId(i, s);
    return [{
      type: 11,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: A,
      assetId: f
    }, r];
  }
}, qi = class extends oe {
  constructor() {
    super("ReceiptBurn", "struct ReceiptBurn", 0);
  }
  static getAssetId(e, t) {
    return Mu(e, t);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.subId)), t.push(new G().encode(e.contractId)), t.push(new S("u64").encode(e.val)), t.push(new S("u64").encode(e.pc)), t.push(new S("u64").encode(e.is)), re(t);
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
    const c = n;
    [n, r] = new S("u64").decode(e, r);
    const A = n, f = Or.getAssetId(i, s);
    return [{
      type: 12,
      subId: s,
      contractId: i,
      val: o,
      pc: c,
      is: A,
      assetId: f
    }, r];
  }
}, ob = class extends oe {
  constructor() {
    super("Receipt", "struct Receipt", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(new Za().encode(e));
        break;
      }
      case 1: {
        t.push(new Ja().encode(e));
        break;
      }
      case 2: {
        t.push(new Wa().encode(e));
        break;
      }
      case 3: {
        t.push(new ja().encode(e));
        break;
      }
      case 4: {
        t.push(new qa().encode(e));
        break;
      }
      case 5: {
        t.push(new $a().encode(e));
        break;
      }
      case 6: {
        t.push(new Ka().encode(e));
        break;
      }
      case 7: {
        t.push(new ec().encode(e));
        break;
      }
      case 8: {
        t.push(new tc().encode(e));
        break;
      }
      case 9: {
        t.push(new nc().encode(e));
        break;
      }
      case 10: {
        t.push(new Ls().encode(e));
        break;
      }
      case 11: {
        t.push(new Or().encode(e));
        break;
      }
      case 12: {
        t.push(new qi().encode(e));
        break;
      }
      default:
        throw new _(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${n}`);
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new Za().decode(e, r), [n, r];
      case 1:
        return [n, r] = new Ja().decode(e, r), [n, r];
      case 2:
        return [n, r] = new Wa().decode(e, r), [n, r];
      case 3:
        return [n, r] = new ja().decode(e, r), [n, r];
      case 4:
        return [n, r] = new qa().decode(e, r), [n, r];
      case 5:
        return [n, r] = new $a().decode(e, r), [n, r];
      case 6:
        return [n, r] = new Ka().decode(e, r), [n, r];
      case 7:
        return [n, r] = new ec().decode(e, r), [n, r];
      case 8:
        return [n, r] = new tc().decode(e, r), [n, r];
      case 9:
        return [n, r] = new nc().decode(e, r), [n, r];
      case 10:
        return [n, r] = new Ls().decode(e, r), [n, r];
      case 11:
        return [n, r] = new Or().decode(e, r), [n, r];
      case 12:
        return [n, r] = new qi().decode(e, r), [n, r];
      default:
        throw new _(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${s}`);
    }
  }
}, rc = class extends qs {
  constructor() {
    super("StorageSlot", {
      key: new G(),
      value: new G()
    });
  }
}, sc = class extends oe {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(e) {
    const t = [], { type: n } = e;
    switch (t.push(new $("u8").encode(n)), n) {
      case 0: {
        const r = e.data;
        t.push(new $("u16").encode(r.witnessIndex)), t.push(new G().encode(r.checksum));
        break;
      }
      case 1: {
        const r = e.data;
        t.push(new G().encode(r.bytecodeRoot));
        break;
      }
      default:
        throw new _(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n = t, r;
    [r, n] = new $("u8").decode(e, n);
    const s = r;
    switch (s) {
      case 0: {
        [r, n] = new $("u16").decode(e, n);
        const i = r;
        return [r, n] = new G().decode(e, n), [{ type: s, data: { witnessIndex: i, checksum: r } }, n];
      }
      case 1:
        return [r, n] = new G().decode(e, n), [{ type: s, data: { bytecodeRoot: r } }, n];
      default:
        throw new _(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, Rn = class extends oe {
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
    return t.push(new $("u32").encode(e.dataLength)), t.push(new Ie(e.dataLength).encode(e.data)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u32").decode(e, r);
    const s = n;
    return [n, r] = new Ie(s).decode(e, r), [
      {
        dataLength: s,
        data: n
      },
      r
    ];
  }
}, Le = /* @__PURE__ */ ((e) => (e[e.Script = 0] = "Script", e[e.Create = 1] = "Create", e[e.Mint = 2] = "Mint", e[e.Upgrade = 3] = "Upgrade", e[e.Upload = 4] = "Upload", e))(Le || {}), ic = class extends oe {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new S("u64").encode(e.scriptGasLimit)), t.push(new G().encode(e.receiptsRoot)), t.push(new S("u64").encode(e.scriptLength)), t.push(new S("u64").encode(e.scriptDataLength)), t.push(new $("u32").encode(e.policyTypes)), t.push(new $("u16").encode(e.inputsCount)), t.push(new $("u16").encode(e.outputsCount)), t.push(new $("u16").encode(e.witnessesCount)), t.push(new Ie(e.scriptLength.toNumber()).encode(e.script)), t.push(new Ie(e.scriptDataLength.toNumber()).encode(e.scriptData)), t.push(new vn().encode(e.policies)), t.push(new we(new xn(), e.inputsCount).encode(e.inputs)), t.push(new we(new _n(), e.outputsCount).encode(e.outputs)), t.push(new we(new Rn(), e.witnessesCount).encode(e.witnesses)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new S("u64").decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new $("u32").decode(e, r);
    const A = n;
    [n, r] = new $("u16").decode(e, r);
    const f = n;
    [n, r] = new $("u16").decode(e, r);
    const I = n;
    [n, r] = new $("u16").decode(e, r);
    const w = n;
    [n, r] = new Ie(o.toNumber()).decode(e, r);
    const C = n;
    [n, r] = new Ie(c.toNumber()).decode(e, r);
    const v = n;
    [n, r] = new vn().decode(e, r, A);
    const R = n;
    [n, r] = new we(new xn(), f).decode(e, r);
    const B = n;
    [n, r] = new we(new _n(), I).decode(e, r);
    const M = n;
    return [n, r] = new we(new Rn(), w).decode(e, r), [
      {
        type: 0,
        scriptGasLimit: s,
        scriptLength: o,
        scriptDataLength: c,
        policyTypes: A,
        inputsCount: f,
        outputsCount: I,
        witnessesCount: w,
        receiptsRoot: i,
        script: C,
        scriptData: v,
        policies: R,
        inputs: B,
        outputs: M,
        witnesses: n
      },
      r
    ];
  }
}, oc = class extends oe {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new $("u16").encode(e.bytecodeWitnessIndex)), t.push(new G().encode(e.salt)), t.push(new S("u64").encode(e.storageSlotsCount)), t.push(new $("u32").encode(e.policyTypes)), t.push(new $("u16").encode(e.inputsCount)), t.push(new $("u16").encode(e.outputsCount)), t.push(new $("u16").encode(e.witnessesCount)), t.push(
      new we(new rc(), e.storageSlotsCount.toNumber()).encode(
        e.storageSlots
      )
    ), t.push(new vn().encode(e.policies)), t.push(new we(new xn(), e.inputsCount).encode(e.inputs)), t.push(new we(new _n(), e.outputsCount).encode(e.outputs)), t.push(new we(new Rn(), e.witnessesCount).encode(e.witnesses)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u16").decode(e, r);
    const s = n;
    [n, r] = new G().decode(e, r);
    const i = n;
    [n, r] = new S("u64").decode(e, r);
    const o = n;
    [n, r] = new $("u32").decode(e, r);
    const c = n;
    [n, r] = new $("u16").decode(e, r);
    const A = n;
    [n, r] = new $("u16").decode(e, r);
    const f = n;
    [n, r] = new $("u16").decode(e, r);
    const I = n;
    [n, r] = new we(new rc(), o.toNumber()).decode(
      e,
      r
    );
    const w = n;
    [n, r] = new vn().decode(e, r, c);
    const C = n;
    [n, r] = new we(new xn(), A).decode(e, r);
    const v = n;
    [n, r] = new we(new _n(), f).decode(e, r);
    const R = n;
    return [n, r] = new we(new Rn(), I).decode(e, r), [
      {
        type: 1,
        bytecodeWitnessIndex: s,
        policyTypes: c,
        storageSlotsCount: o,
        inputsCount: A,
        outputsCount: f,
        witnessesCount: I,
        salt: i,
        policies: C,
        storageSlots: w,
        inputs: v,
        outputs: R,
        witnesses: n
      },
      r
    ];
  }
}, ac = class extends oe {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new cr().encode(e.txPointer)), t.push(new Ms().encode(e.inputContract)), t.push(new Os().encode(e.outputContract)), t.push(new S("u64").encode(e.mintAmount)), t.push(new G().encode(e.mintAssetId)), t.push(new S("u64").encode(e.gasPrice)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new cr().decode(e, r);
    const s = n;
    [n, r] = new Ms().decode(e, r);
    const i = n;
    [n, r] = new Os().decode(e, r);
    const o = n;
    [n, r] = new S("u64").decode(e, r);
    const c = n;
    [n, r] = new G().decode(e, r);
    const A = n;
    return [n, r] = new S("u64").decode(e, r), [
      {
        type: 2,
        txPointer: s,
        inputContract: i,
        outputContract: o,
        mintAmount: c,
        mintAssetId: A,
        gasPrice: n
      },
      r
    ];
  }
}, cc = class extends oe {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new sc().encode(e.upgradePurpose)), t.push(new $("u32").encode(e.policyTypes)), t.push(new $("u16").encode(e.inputsCount)), t.push(new $("u16").encode(e.outputsCount)), t.push(new $("u16").encode(e.witnessesCount)), t.push(new vn().encode(e.policies)), t.push(new we(new xn(), e.inputsCount).encode(e.inputs)), t.push(new we(new _n(), e.outputsCount).encode(e.outputs)), t.push(new we(new Rn(), e.witnessesCount).encode(e.witnesses)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new sc().decode(e, r);
    const s = n;
    [n, r] = new $("u32").decode(e, r);
    const i = n;
    [n, r] = new $("u16").decode(e, r);
    const o = n;
    [n, r] = new $("u16").decode(e, r);
    const c = n;
    [n, r] = new $("u16").decode(e, r);
    const A = n;
    [n, r] = new vn().decode(e, r, i);
    const f = n;
    [n, r] = new we(new xn(), o).decode(e, r);
    const I = n;
    [n, r] = new we(new _n(), c).decode(e, r);
    const w = n;
    return [n, r] = new we(new Rn(), A).decode(e, r), [
      {
        type: 3,
        upgradePurpose: s,
        policyTypes: i,
        inputsCount: o,
        outputsCount: c,
        witnessesCount: A,
        policies: f,
        inputs: I,
        outputs: w,
        witnesses: n
      },
      r
    ];
  }
}, dc = class extends oe {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(e) {
    const t = [];
    return t.push(new G().encode(e.root)), t.push(new $("u16").encode(e.witnessIndex)), t.push(new $("u16").encode(e.subsectionIndex)), t.push(new $("u16").encode(e.subsectionsNumber)), t.push(new $("u16").encode(e.proofSetCount)), t.push(new $("u32").encode(e.policyTypes)), t.push(new $("u16").encode(e.inputsCount)), t.push(new $("u16").encode(e.outputsCount)), t.push(new $("u16").encode(e.witnessesCount)), t.push(new we(new G(), e.proofSetCount).encode(e.proofSet)), t.push(new vn().encode(e.policies)), t.push(new we(new xn(), e.inputsCount).encode(e.inputs)), t.push(new we(new _n(), e.outputsCount).encode(e.outputs)), t.push(new we(new Rn(), e.witnessesCount).encode(e.witnesses)), re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new G().decode(e, r);
    const s = n;
    [n, r] = new $("u16").decode(e, r);
    const i = n;
    [n, r] = new $("u16").decode(e, r);
    const o = n;
    [n, r] = new $("u16").decode(e, r);
    const c = n;
    [n, r] = new $("u16").decode(e, r);
    const A = n;
    [n, r] = new $("u32").decode(e, r);
    const f = n;
    [n, r] = new $("u16").decode(e, r);
    const I = n;
    [n, r] = new $("u16").decode(e, r);
    const w = n;
    [n, r] = new $("u16").decode(e, r);
    const C = n;
    [n, r] = new we(new G(), A).decode(e, r);
    const v = n;
    [n, r] = new vn().decode(e, r, f);
    const R = n;
    [n, r] = new we(new xn(), I).decode(e, r);
    const B = n;
    [n, r] = new we(new _n(), w).decode(e, r);
    const M = n;
    return [n, r] = new we(new Rn(), C).decode(e, r), [
      {
        type: 4,
        root: s,
        witnessIndex: i,
        subsectionIndex: o,
        subsectionsNumber: c,
        proofSetCount: A,
        policyTypes: f,
        inputsCount: I,
        outputsCount: w,
        witnessesCount: C,
        proofSet: v,
        policies: R,
        inputs: B,
        outputs: M,
        witnesses: n
      },
      r
    ];
  }
}, Nn = class extends oe {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(e) {
    const t = [];
    t.push(new $("u8").encode(e.type));
    const { type: n } = e;
    switch (e.type) {
      case 0: {
        t.push(
          new ic().encode(e)
        );
        break;
      }
      case 1: {
        t.push(
          new oc().encode(e)
        );
        break;
      }
      case 2: {
        t.push(new ac().encode(e));
        break;
      }
      case 3: {
        t.push(
          new cc().encode(e)
        );
        break;
      }
      case 4: {
        t.push(
          new dc().encode(e)
        );
        break;
      }
      default:
        throw new _(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${n}`
        );
    }
    return re(t);
  }
  decode(e, t) {
    let n, r = t;
    [n, r] = new $("u8").decode(e, r);
    const s = n;
    switch (s) {
      case 0:
        return [n, r] = new ic().decode(e, r), [n, r];
      case 1:
        return [n, r] = new oc().decode(e, r), [n, r];
      case 2:
        return [n, r] = new ac().decode(e, r), [n, r];
      case 3:
        return [n, r] = new cc().decode(e, r), [n, r];
      case 4:
        return [n, r] = new dc().decode(e, r), [n, r];
      default:
        throw new _(
          N.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${s}`
        );
    }
  }
}, ab = class extends qs {
  constructor() {
    super("UtxoId", {
      transactionId: new G(),
      outputIndex: new $("u8")
    });
  }
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ou = BigInt(0), $s = BigInt(1), Zh = BigInt(2);
function Jt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
const Jh = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function dr(e) {
  if (!Jt(e))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Jh[e[n]];
  return t;
}
function Lu(e) {
  const t = e.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Zo(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const jt = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function uc(e) {
  if (e >= jt._0 && e <= jt._9)
    return e - jt._0;
  if (e >= jt._A && e <= jt._F)
    return e - (jt._A - 10);
  if (e >= jt._a && e <= jt._f)
    return e - (jt._a - 10);
}
function ur(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, i = 0; s < n; s++, i += 2) {
    const o = uc(e.charCodeAt(i)), c = uc(e.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const A = e[i] + e[i + 1];
      throw new Error('hex string expected, got non-hex character "' + A + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Mn(e) {
  return Zo(dr(e));
}
function Jo(e) {
  if (!Jt(e))
    throw new Error("Uint8Array expected");
  return Zo(dr(Uint8Array.from(e).reverse()));
}
function Ar(e, t) {
  return ur(e.toString(16).padStart(t * 2, "0"));
}
function Wo(e, t) {
  return Ar(e, t).reverse();
}
function Wh(e) {
  return ur(Lu(e));
}
function Mt(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = ur(t);
    } catch (i) {
      throw new Error(`${e} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Jt(t))
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
    if (!Jt(i))
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
function ku(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    n |= e[r] ^ t[r];
  return n === 0;
}
function jh(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function qh(e) {
  let t;
  for (t = 0; e > Ou; e >>= $s, t += 1)
    ;
  return t;
}
function $h(e, t) {
  return e >> BigInt(t) & $s;
}
const Kh = (e, t, n) => e | (n ? $s : Ou) << BigInt(t), jo = (e) => (Zh << BigInt(e - 1)) - $s, Ri = (e) => new Uint8Array(e), Ac = (e) => Uint8Array.from(e);
function Pu(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function")
    throw new Error("hmacFn must be a function");
  let r = Ri(e), s = Ri(e), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...w) => n(s, r, ...w), A = (w = Ri()) => {
    s = c(Ac([0]), w), r = c(), w.length !== 0 && (s = c(Ac([1]), w), r = c());
  }, f = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let w = 0;
    const C = [];
    for (; w < t; ) {
      r = c();
      const v = r.slice();
      C.push(v), w += r.length;
    }
    return Lr(...C);
  };
  return (w, C) => {
    o(), A(w);
    let v;
    for (; !(v = C(f())); )
      A();
    return o(), v;
  };
}
const eg = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || Jt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function jr(e, t, n = {}) {
  const r = (s, i, o) => {
    const c = eg[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const A = e[s];
    if (!(o && A === void 0) && !c(A, e))
      throw new Error(`Invalid param ${String(s)}=${A} (${typeof A}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(n))
    r(s, i, !0);
  return e;
}
const tg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: $h,
  bitLen: qh,
  bitMask: jo,
  bitSet: Kh,
  bytesToHex: dr,
  bytesToNumberBE: Mn,
  bytesToNumberLE: Jo,
  concatBytes: Lr,
  createHmacDrbg: Pu,
  ensureBytes: Mt,
  equalBytes: ku,
  hexToBytes: ur,
  hexToNumber: Zo,
  isBytes: Jt,
  numberToBytesBE: Ar,
  numberToBytesLE: Wo,
  numberToHexUnpadded: Lu,
  numberToVarBytesBE: Wh,
  utf8ToBytes: jh,
  validateObject: jr
}, Symbol.toStringTag, { value: "Module" }));
var Ni = {}, $i = { exports: {} };
(function(e, t) {
  var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof Ce < "u" && Ce, r = function() {
    function i() {
      this.fetch = !1, this.DOMException = n.DOMException;
    }
    return i.prototype = n, new i();
  }();
  (function(i) {
    (function(o) {
      var c = typeof i < "u" && i || typeof self < "u" && self || typeof c < "u" && c, A = {
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
      function f(d) {
        return d && DataView.prototype.isPrototypeOf(d);
      }
      if (A.arrayBuffer)
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
        ], w = ArrayBuffer.isView || function(d) {
          return d && I.indexOf(Object.prototype.toString.call(d)) > -1;
        };
      function C(d) {
        if (typeof d != "string" && (d = String(d)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(d) || d === "")
          throw new TypeError('Invalid character in header field name: "' + d + '"');
        return d.toLowerCase();
      }
      function v(d) {
        return typeof d != "string" && (d = String(d)), d;
      }
      function R(d) {
        var l = {
          next: function() {
            var p = d.shift();
            return { done: p === void 0, value: p };
          }
        };
        return A.iterable && (l[Symbol.iterator] = function() {
          return l;
        }), l;
      }
      function B(d) {
        this.map = {}, d instanceof B ? d.forEach(function(l, p) {
          this.append(p, l);
        }, this) : Array.isArray(d) ? d.forEach(function(l) {
          this.append(l[0], l[1]);
        }, this) : d && Object.getOwnPropertyNames(d).forEach(function(l) {
          this.append(l, d[l]);
        }, this);
      }
      B.prototype.append = function(d, l) {
        d = C(d), l = v(l);
        var p = this.map[d];
        this.map[d] = p ? p + ", " + l : l;
      }, B.prototype.delete = function(d) {
        delete this.map[C(d)];
      }, B.prototype.get = function(d) {
        return d = C(d), this.has(d) ? this.map[d] : null;
      }, B.prototype.has = function(d) {
        return this.map.hasOwnProperty(C(d));
      }, B.prototype.set = function(d, l) {
        this.map[C(d)] = v(l);
      }, B.prototype.forEach = function(d, l) {
        for (var p in this.map)
          this.map.hasOwnProperty(p) && d.call(l, this.map[p], p, this);
      }, B.prototype.keys = function() {
        var d = [];
        return this.forEach(function(l, p) {
          d.push(p);
        }), R(d);
      }, B.prototype.values = function() {
        var d = [];
        return this.forEach(function(l) {
          d.push(l);
        }), R(d);
      }, B.prototype.entries = function() {
        var d = [];
        return this.forEach(function(l, p) {
          d.push([p, l]);
        }), R(d);
      }, A.iterable && (B.prototype[Symbol.iterator] = B.prototype.entries);
      function M(d) {
        if (d.bodyUsed)
          return Promise.reject(new TypeError("Already read"));
        d.bodyUsed = !0;
      }
      function T(d) {
        return new Promise(function(l, p) {
          d.onload = function() {
            l(d.result);
          }, d.onerror = function() {
            p(d.error);
          };
        });
      }
      function V(d) {
        var l = new FileReader(), p = T(l);
        return l.readAsArrayBuffer(d), p;
      }
      function k(d) {
        var l = new FileReader(), p = T(l);
        return l.readAsText(d), p;
      }
      function J(d) {
        for (var l = new Uint8Array(d), p = new Array(l.length), h = 0; h < l.length; h++)
          p[h] = String.fromCharCode(l[h]);
        return p.join("");
      }
      function O(d) {
        if (d.slice)
          return d.slice(0);
        var l = new Uint8Array(d.byteLength);
        return l.set(new Uint8Array(d)), l.buffer;
      }
      function F() {
        return this.bodyUsed = !1, this._initBody = function(d) {
          this.bodyUsed = this.bodyUsed, this._bodyInit = d, d ? typeof d == "string" ? this._bodyText = d : A.blob && Blob.prototype.isPrototypeOf(d) ? this._bodyBlob = d : A.formData && FormData.prototype.isPrototypeOf(d) ? this._bodyFormData = d : A.searchParams && URLSearchParams.prototype.isPrototypeOf(d) ? this._bodyText = d.toString() : A.arrayBuffer && A.blob && f(d) ? (this._bodyArrayBuffer = O(d.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : A.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(d) || w(d)) ? this._bodyArrayBuffer = O(d) : this._bodyText = d = Object.prototype.toString.call(d) : this._bodyText = "", this.headers.get("content-type") || (typeof d == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : A.searchParams && URLSearchParams.prototype.isPrototypeOf(d) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        }, A.blob && (this.blob = function() {
          var d = M(this);
          if (d)
            return d;
          if (this._bodyBlob)
            return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }, this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var d = M(this);
            return d || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            ) : Promise.resolve(this._bodyArrayBuffer));
          } else
            return this.blob().then(V);
        }), this.text = function() {
          var d = M(this);
          if (d)
            return d;
          if (this._bodyBlob)
            return k(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(J(this._bodyArrayBuffer));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }, A.formData && (this.formData = function() {
          return this.text().then(H);
        }), this.json = function() {
          return this.text().then(JSON.parse);
        }, this;
      }
      var L = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function U(d) {
        var l = d.toUpperCase();
        return L.indexOf(l) > -1 ? l : d;
      }
      function j(d, l) {
        if (!(this instanceof j))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l = l || {};
        var p = l.body;
        if (d instanceof j) {
          if (d.bodyUsed)
            throw new TypeError("Already read");
          this.url = d.url, this.credentials = d.credentials, l.headers || (this.headers = new B(d.headers)), this.method = d.method, this.mode = d.mode, this.signal = d.signal, !p && d._bodyInit != null && (p = d._bodyInit, d.bodyUsed = !0);
        } else
          this.url = String(d);
        if (this.credentials = l.credentials || this.credentials || "same-origin", (l.headers || !this.headers) && (this.headers = new B(l.headers)), this.method = U(l.method || this.method || "GET"), this.mode = l.mode || this.mode || null, this.signal = l.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && p)
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (this._initBody(p), (this.method === "GET" || this.method === "HEAD") && (l.cache === "no-store" || l.cache === "no-cache")) {
          var h = /([?&])_=[^&]*/;
          if (h.test(this.url))
            this.url = this.url.replace(h, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
          else {
            var y = /\?/;
            this.url += (y.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
          }
        }
      }
      j.prototype.clone = function() {
        return new j(this, { body: this._bodyInit });
      };
      function H(d) {
        var l = new FormData();
        return d.trim().split("&").forEach(function(p) {
          if (p) {
            var h = p.split("="), y = h.shift().replace(/\+/g, " "), b = h.join("=").replace(/\+/g, " ");
            l.append(decodeURIComponent(y), decodeURIComponent(b));
          }
        }), l;
      }
      function Y(d) {
        var l = new B(), p = d.replace(/\r?\n[\t ]+/g, " ");
        return p.split("\r").map(function(h) {
          return h.indexOf(`
`) === 0 ? h.substr(1, h.length) : h;
        }).forEach(function(h) {
          var y = h.split(":"), b = y.shift().trim();
          if (b) {
            var g = y.join(":").trim();
            l.append(b, g);
          }
        }), l;
      }
      F.call(j.prototype);
      function ee(d, l) {
        if (!(this instanceof ee))
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        l || (l = {}), this.type = "default", this.status = l.status === void 0 ? 200 : l.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = l.statusText === void 0 ? "" : "" + l.statusText, this.headers = new B(l.headers), this.url = l.url || "", this._initBody(d);
      }
      F.call(ee.prototype), ee.prototype.clone = function() {
        return new ee(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new B(this.headers),
          url: this.url
        });
      }, ee.error = function() {
        var d = new ee(null, { status: 0, statusText: "" });
        return d.type = "error", d;
      };
      var E = [301, 302, 303, 307, 308];
      ee.redirect = function(d, l) {
        if (E.indexOf(l) === -1)
          throw new RangeError("Invalid status code");
        return new ee(null, { status: l, headers: { location: d } });
      }, o.DOMException = c.DOMException;
      try {
        new o.DOMException();
      } catch {
        o.DOMException = function(l, p) {
          this.message = l, this.name = p;
          var h = Error(l);
          this.stack = h.stack;
        }, o.DOMException.prototype = Object.create(Error.prototype), o.DOMException.prototype.constructor = o.DOMException;
      }
      function a(d, l) {
        return new Promise(function(p, h) {
          var y = new j(d, l);
          if (y.signal && y.signal.aborted)
            return h(new o.DOMException("Aborted", "AbortError"));
          var b = new XMLHttpRequest();
          function g() {
            b.abort();
          }
          b.onload = function() {
            var m = {
              status: b.status,
              statusText: b.statusText,
              headers: Y(b.getAllResponseHeaders() || "")
            };
            m.url = "responseURL" in b ? b.responseURL : m.headers.get("X-Request-URL");
            var z = "response" in b ? b.response : b.responseText;
            setTimeout(function() {
              p(new ee(z, m));
            }, 0);
          }, b.onerror = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, b.ontimeout = function() {
            setTimeout(function() {
              h(new TypeError("Network request failed"));
            }, 0);
          }, b.onabort = function() {
            setTimeout(function() {
              h(new o.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function u(m) {
            try {
              return m === "" && c.location.href ? c.location.href : m;
            } catch {
              return m;
            }
          }
          b.open(y.method, u(y.url), !0), y.credentials === "include" ? b.withCredentials = !0 : y.credentials === "omit" && (b.withCredentials = !1), "responseType" in b && (A.blob ? b.responseType = "blob" : A.arrayBuffer && y.headers.get("Content-Type") && y.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (b.responseType = "arraybuffer")), l && typeof l.headers == "object" && !(l.headers instanceof B) ? Object.getOwnPropertyNames(l.headers).forEach(function(m) {
            b.setRequestHeader(m, v(l.headers[m]));
          }) : y.headers.forEach(function(m, z) {
            b.setRequestHeader(z, m);
          }), y.signal && (y.signal.addEventListener("abort", g), b.onreadystatechange = function() {
            b.readyState === 4 && y.signal.removeEventListener("abort", g);
          }), b.send(typeof y._bodyInit > "u" ? null : y._bodyInit);
        });
      }
      return a.polyfill = !0, c.fetch || (c.fetch = a, c.Headers = B, c.Request = j, c.Response = ee), o.Headers = B, o.Request = j, o.Response = ee, o.fetch = a, o;
    })({});
  })(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
  var s = n.fetch ? n : r;
  t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, e.exports = t;
})($i, $i.exports);
var ng = $i.exports;
function rg(e) {
  return typeof e == "object" && e !== null;
}
function sg(e, t) {
  if (!!!e)
    throw new Error(
      t ?? "Unexpected invariant triggered."
    );
}
const ig = /\r\n|[\n\r]/g;
function Ki(e, t) {
  let n = 0, r = 1;
  for (const s of e.body.matchAll(ig)) {
    if (typeof s.index == "number" || sg(!1), s.index >= t)
      break;
    n = s.index + s[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function og(e) {
  return Uu(
    e.source,
    Ki(e.source, e.start)
  );
}
function Uu(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, s = t.line - 1, i = e.locationOffset.line - 1, o = t.line + i, c = t.line === 1 ? n : 0, A = t.column + c, f = `${e.name}:${o}:${A}
`, I = r.split(/\r\n|[\n\r]/g), w = I[s];
  if (w.length > 120) {
    const C = Math.floor(A / 80), v = A % 80, R = [];
    for (let B = 0; B < w.length; B += 80)
      R.push(w.slice(B, B + 80));
    return f + lc([
      [`${o} |`, R[0]],
      ...R.slice(1, C + 1).map((B) => ["|", B]),
      ["|", "^".padStart(v)],
      ["|", R[C + 1]]
    ]);
  }
  return f + lc([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, I[s - 1]],
    [`${o} |`, w],
    ["|", "^".padStart(A)],
    [`${o + 1} |`, I[s + 1]]
  ]);
}
function lc(e) {
  const t = e.filter(([r, s]) => s !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, s]) => r.padStart(n) + (s ? " " + s : "")).join(`
`);
}
function ag(e) {
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
class qo extends Error {
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
    const { nodes: o, source: c, positions: A, path: f, originalError: I, extensions: w } = ag(n);
    super(t), this.name = "GraphQLError", this.path = f ?? void 0, this.originalError = I ?? void 0, this.nodes = fc(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const C = fc(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((R) => R.loc).filter((R) => R != null)
    );
    this.source = c ?? (C == null || (s = C[0]) === null || s === void 0 ? void 0 : s.source), this.positions = A ?? (C == null ? void 0 : C.map((R) => R.start)), this.locations = A && c ? A.map((R) => Ki(c, R)) : C == null ? void 0 : C.map((R) => Ki(R.source, R.start));
    const v = rg(
      I == null ? void 0 : I.extensions
    ) ? I == null ? void 0 : I.extensions : void 0;
    this.extensions = (i = w ?? v) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, qo) : Object.defineProperty(this, "stack", {
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

` + og(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Uu(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function fc(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function ht(e, t, n) {
  return new qo(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class cg {
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
class Gu {
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
const Vu = {
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
}, dg = new Set(Object.keys(Vu));
function hc(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && dg.has(t);
}
var zn;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(zn || (zn = {}));
var eo;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(eo || (eo = {}));
var de;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(de || (de = {}));
function to(e) {
  return e === 9 || e === 32;
}
function kr(e) {
  return e >= 48 && e <= 57;
}
function Hu(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Xu(e) {
  return Hu(e) || e === 95;
}
function ug(e) {
  return Hu(e) || kr(e) || e === 95;
}
function Ag(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, s = -1;
  for (let o = 0; o < e.length; ++o) {
    var i;
    const c = e[o], A = lg(c);
    A !== c.length && (r = (i = r) !== null && i !== void 0 ? i : o, s = o, o !== 0 && A < n && (n = A));
  }
  return e.map((o, c) => c === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function lg(e) {
  let t = 0;
  for (; t < e.length && to(e.charCodeAt(t)); )
    ++t;
  return t;
}
function fg(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), s = r.length === 1, i = r.length > 1 && r.slice(1).every((v) => v.length === 0 || to(v.charCodeAt(0))), o = n.endsWith('\\"""'), c = e.endsWith('"') && !o, A = e.endsWith("\\"), f = c || A, I = !(t != null && t.minimize) && // add leading and trailing new lines only if it improves readability
  (!s || e.length > 70 || f || i || o);
  let w = "";
  const C = s && to(e.charCodeAt(0));
  return (I && !C || i) && (w += `
`), w += n, (I || f) && (w += `
`), '"""' + w + '"""';
}
var P;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(P || (P = {}));
class hg {
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
    const n = new Gu(P.SOF, 0, 0, 0, 0);
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
    if (t.kind !== P.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = pg(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === P.COMMENT);
    return t;
  }
}
function gg(e) {
  return e === P.BANG || e === P.DOLLAR || e === P.AMP || e === P.PAREN_L || e === P.PAREN_R || e === P.SPREAD || e === P.COLON || e === P.EQUALS || e === P.AT || e === P.BRACKET_L || e === P.BRACKET_R || e === P.BRACE_L || e === P.PIPE || e === P.BRACE_R;
}
function wr(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Ks(e, t) {
  return Yu(e.charCodeAt(t)) && zu(e.charCodeAt(t + 1));
}
function Yu(e) {
  return e >= 55296 && e <= 56319;
}
function zu(e) {
  return e >= 56320 && e <= 57343;
}
function kn(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return P.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function ft(e, t, n, r, s) {
  const i = e.line, o = 1 + n - e.lineStart;
  return new Gu(t, n, r, i, o, s);
}
function pg(e, t) {
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
        return mg(e, s);
      case 33:
        return ft(e, P.BANG, s, s + 1);
      case 36:
        return ft(e, P.DOLLAR, s, s + 1);
      case 38:
        return ft(e, P.AMP, s, s + 1);
      case 40:
        return ft(e, P.PAREN_L, s, s + 1);
      case 41:
        return ft(e, P.PAREN_R, s, s + 1);
      case 46:
        if (n.charCodeAt(s + 1) === 46 && n.charCodeAt(s + 2) === 46)
          return ft(e, P.SPREAD, s, s + 3);
        break;
      case 58:
        return ft(e, P.COLON, s, s + 1);
      case 61:
        return ft(e, P.EQUALS, s, s + 1);
      case 64:
        return ft(e, P.AT, s, s + 1);
      case 91:
        return ft(e, P.BRACKET_L, s, s + 1);
      case 93:
        return ft(e, P.BRACKET_R, s, s + 1);
      case 123:
        return ft(e, P.BRACE_L, s, s + 1);
      case 124:
        return ft(e, P.PIPE, s, s + 1);
      case 125:
        return ft(e, P.BRACE_R, s, s + 1);
      case 34:
        return n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 ? Cg(e, s) : yg(e, s);
    }
    if (kr(i) || i === 45)
      return wg(e, s, i);
    if (Xu(i))
      return Bg(e, s);
    throw ht(
      e.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : wr(i) || Ks(n, s) ? `Unexpected character: ${kn(e, s)}.` : `Invalid character: ${kn(e, s)}.`
    );
  }
  return ft(e, P.EOF, r, r);
}
function mg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (wr(i))
      ++s;
    else if (Ks(n, s))
      s += 2;
    else
      break;
  }
  return ft(
    e,
    P.COMMENT,
    t,
    s,
    n.slice(t + 1, s)
  );
}
function wg(e, t, n) {
  const r = e.source.body;
  let s = t, i = n, o = !1;
  if (i === 45 && (i = r.charCodeAt(++s)), i === 48) {
    if (i = r.charCodeAt(++s), kr(i))
      throw ht(
        e.source,
        s,
        `Invalid number, unexpected digit after 0: ${kn(
          e,
          s
        )}.`
      );
  } else
    s = Si(e, s, i), i = r.charCodeAt(s);
  if (i === 46 && (o = !0, i = r.charCodeAt(++s), s = Si(e, s, i), i = r.charCodeAt(s)), (i === 69 || i === 101) && (o = !0, i = r.charCodeAt(++s), (i === 43 || i === 45) && (i = r.charCodeAt(++s)), s = Si(e, s, i), i = r.charCodeAt(s)), i === 46 || Xu(i))
    throw ht(
      e.source,
      s,
      `Invalid number, expected digit but got: ${kn(
        e,
        s
      )}.`
    );
  return ft(
    e,
    o ? P.FLOAT : P.INT,
    t,
    s,
    r.slice(t, s)
  );
}
function Si(e, t, n) {
  if (!kr(n))
    throw ht(
      e.source,
      t,
      `Invalid number, expected digit but got: ${kn(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let s = t + 1;
  for (; kr(r.charCodeAt(s)); )
    ++s;
  return s;
}
function yg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1, i = s, o = "";
  for (; s < r; ) {
    const c = n.charCodeAt(s);
    if (c === 34)
      return o += n.slice(i, s), ft(e, P.STRING, t, s + 1, o);
    if (c === 92) {
      o += n.slice(i, s);
      const A = n.charCodeAt(s + 1) === 117 ? n.charCodeAt(s + 2) === 123 ? Ig(e, s) : bg(e, s) : Eg(e, s);
      o += A.value, s += A.size, i = s;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (wr(c))
      ++s;
    else if (Ks(n, s))
      s += 2;
    else
      throw ht(
        e.source,
        s,
        `Invalid character within String: ${kn(
          e,
          s
        )}.`
      );
  }
  throw ht(e.source, s, "Unterminated string.");
}
function Ig(e, t) {
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
    if (r = r << 4 | vr(i), r < 0)
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
function bg(e, t) {
  const n = e.source.body, r = gc(n, t + 2);
  if (wr(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Yu(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const s = gc(n, t + 8);
    if (zu(s))
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
function gc(e, t) {
  return vr(e.charCodeAt(t)) << 12 | vr(e.charCodeAt(t + 1)) << 8 | vr(e.charCodeAt(t + 2)) << 4 | vr(e.charCodeAt(t + 3));
}
function vr(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Eg(e, t) {
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
function Cg(e, t) {
  const n = e.source.body, r = n.length;
  let s = e.lineStart, i = t + 3, o = i, c = "";
  const A = [];
  for (; i < r; ) {
    const f = n.charCodeAt(i);
    if (f === 34 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34) {
      c += n.slice(o, i), A.push(c);
      const I = ft(
        e,
        P.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        Ag(A).join(`
`)
      );
      return e.line += A.length - 1, e.lineStart = s, I;
    }
    if (f === 92 && n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 && n.charCodeAt(i + 3) === 34) {
      c += n.slice(o, i), o = i + 1, i += 4;
      continue;
    }
    if (f === 10 || f === 13) {
      c += n.slice(o, i), A.push(c), f === 13 && n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, c = "", o = i, s = i;
      continue;
    }
    if (wr(f))
      ++i;
    else if (Ks(n, i))
      i += 2;
    else
      throw ht(
        e.source,
        i,
        `Invalid character within String: ${kn(
          e,
          i
        )}.`
      );
  }
  throw ht(e.source, i, "Unterminated string.");
}
function Bg(e, t) {
  const n = e.source.body, r = n.length;
  let s = t + 1;
  for (; s < r; ) {
    const i = n.charCodeAt(s);
    if (ug(i))
      ++s;
    else
      break;
  }
  return ft(
    e,
    P.NAME,
    t,
    s,
    n.slice(t, s)
  );
}
function Bs(e, t) {
  if (!!!e)
    throw new Error(t);
}
const xg = 10, Zu = 2;
function $o(e) {
  return ei(e, []);
}
function ei(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return _g(e, t);
    default:
      return String(e);
  }
}
function _g(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (vg(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : ei(r, n);
  } else if (Array.isArray(e))
    return Ng(e, n);
  return Rg(e, n);
}
function vg(e) {
  return typeof e.toJSON == "function";
}
function Rg(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > Zu ? "[" + Sg(e) + "]" : "{ " + n.map(
    ([s, i]) => s + ": " + ei(i, t)
  ).join(", ") + " }";
}
function Ng(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Zu)
    return "[Array]";
  const n = Math.min(xg, e.length), r = e.length - n, s = [];
  for (let i = 0; i < n; ++i)
    s.push(ei(e[i], t));
  return r === 1 ? s.push("... 1 more item") : r > 1 && s.push(`... ${r} more items`), "[" + s.join(", ") + "]";
}
function Sg(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const Dg = (
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
        const o = $o(t);
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
class Ju {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Bs(!1, `Body must be a string. Received: ${$o(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || Bs(
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
function Qg(e) {
  return Dg(e, Ju);
}
function Wu(e, t) {
  return new qr(e, t).parseDocument();
}
function Tg(e, t) {
  const n = new qr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseValueLiteral(!1);
  return n.expectToken(P.EOF), r;
}
function Fg(e, t) {
  const n = new qr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseConstValueLiteral();
  return n.expectToken(P.EOF), r;
}
function Mg(e, t) {
  const n = new qr(e, t);
  n.expectToken(P.SOF);
  const r = n.parseTypeReference();
  return n.expectToken(P.EOF), r;
}
class qr {
  constructor(t, n = {}) {
    const r = Qg(t) ? t : new Ju(t);
    this._lexer = new hg(r), this._options = n, this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(P.NAME);
    return this.node(t, {
      kind: de.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: de.DOCUMENT,
      definitions: this.many(
        P.SOF,
        this.parseDefinition,
        P.EOF
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
    if (this.peek(P.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === P.NAME) {
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
    if (this.peek(P.BRACE_L))
      return this.node(t, {
        kind: de.OPERATION_DEFINITION,
        operation: zn.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let r;
    return this.peek(P.NAME) && (r = this.parseName()), this.node(t, {
      kind: de.OPERATION_DEFINITION,
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
    const t = this.expectToken(P.NAME);
    switch (t.value) {
      case "query":
        return zn.QUERY;
      case "mutation":
        return zn.MUTATION;
      case "subscription":
        return zn.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      P.PAREN_L,
      this.parseVariableDefinition,
      P.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: de.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(P.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(P.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(P.DOLLAR), this.node(t, {
      kind: de.VARIABLE,
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
      kind: de.SELECTION_SET,
      selections: this.many(
        P.BRACE_L,
        this.parseSelection,
        P.BRACE_R
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
    return this.peek(P.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, s;
    return this.expectOptionalToken(P.COLON) ? (r = n, s = this.parseName()) : s = n, this.node(t, {
      kind: de.FIELD,
      alias: r,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(P.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(P.PAREN_L, n, P.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(P.COLON), this.node(n, {
      kind: de.ARGUMENT,
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
    this.expectToken(P.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(P.NAME) ? this.node(t, {
      kind: de.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: de.INLINE_FRAGMENT,
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
      kind: de.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: de.FRAGMENT_DEFINITION,
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
      case P.BRACKET_L:
        return this.parseList(t);
      case P.BRACE_L:
        return this.parseObject(t);
      case P.INT:
        return this.advanceLexer(), this.node(n, {
          kind: de.INT,
          value: n.value
        });
      case P.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: de.FLOAT,
          value: n.value
        });
      case P.STRING:
      case P.BLOCK_STRING:
        return this.parseStringLiteral();
      case P.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: de.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: de.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: de.NULL
            });
          default:
            return this.node(n, {
              kind: de.ENUM,
              value: n.value
            });
        }
      case P.DOLLAR:
        if (t)
          if (this.expectToken(P.DOLLAR), this._lexer.token.kind === P.NAME) {
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
      kind: de.STRING,
      value: t.value,
      block: t.kind === P.BLOCK_STRING
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
      kind: de.LIST,
      values: this.any(P.BRACKET_L, n, P.BRACKET_R)
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
      kind: de.OBJECT,
      fields: this.any(P.BRACE_L, n, P.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(P.COLON), this.node(n, {
      kind: de.OBJECT_FIELD,
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
    for (; this.peek(P.AT); )
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
    return this.expectToken(P.AT), this.node(n, {
      kind: de.DIRECTIVE,
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
    if (this.expectOptionalToken(P.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(P.BRACKET_R), n = this.node(t, {
        kind: de.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(P.BANG) ? this.node(t, {
      kind: de.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: de.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(P.STRING) || this.peek(P.BLOCK_STRING);
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
      P.BRACE_L,
      this.parseOperationTypeDefinition,
      P.BRACE_R
    );
    return this.node(t, {
      kind: de.SCHEMA_DEFINITION,
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
    this.expectToken(P.COLON);
    const r = this.parseNamedType();
    return this.node(t, {
      kind: de.OPERATION_TYPE_DEFINITION,
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
      kind: de.SCALAR_TYPE_DEFINITION,
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
      kind: de.OBJECT_TYPE_DEFINITION,
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(P.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      P.BRACE_L,
      this.parseFieldDefinition,
      P.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(P.COLON);
    const i = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(t, {
      kind: de.FIELD_DEFINITION,
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
      P.PAREN_L,
      this.parseInputValueDef,
      P.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(P.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(P.EQUALS) && (i = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(t, {
      kind: de.INPUT_VALUE_DEFINITION,
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
      kind: de.INTERFACE_TYPE_DEFINITION,
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
      kind: de.UNION_TYPE_DEFINITION,
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
    return this.expectOptionalToken(P.EQUALS) ? this.delimitedMany(P.PIPE, this.parseNamedType) : [];
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
      kind: de.ENUM_TYPE_DEFINITION,
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
      P.BRACE_L,
      this.parseEnumValueDefinition,
      P.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: de.ENUM_VALUE_DEFINITION,
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
      kind: de.INPUT_OBJECT_TYPE_DEFINITION,
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
      P.BRACE_L,
      this.parseInputValueDef,
      P.BRACE_R
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
    if (t.kind === P.NAME)
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
      P.BRACE_L,
      this.parseOperationTypeDefinition,
      P.BRACE_R
    );
    if (n.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: de.SCHEMA_EXTENSION,
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
      kind: de.SCALAR_TYPE_EXTENSION,
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
      kind: de.OBJECT_TYPE_EXTENSION,
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
      kind: de.INTERFACE_TYPE_EXTENSION,
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
      kind: de.UNION_TYPE_EXTENSION,
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
      kind: de.ENUM_TYPE_EXTENSION,
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
      kind: de.INPUT_OBJECT_TYPE_EXTENSION,
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
    this.expectKeyword("directive"), this.expectToken(P.AT);
    const r = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(t, {
      kind: de.DIRECTIVE_DEFINITION,
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
    return this.delimitedMany(P.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(eo, n.value))
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
    return this._options.noLocation !== !0 && (n.loc = new cg(
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
      `Expected ${ju(t)}, found ${us(n)}.`
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
    if (n.kind === P.NAME && n.value === t)
      this.advanceLexer();
    else
      throw ht(
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
    return n.kind === P.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return ht(
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
    if (t !== void 0 && n.kind !== P.EOF && (++this._tokenCounter, this._tokenCounter > t))
      throw ht(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function us(e) {
  const t = e.value;
  return ju(e.kind) + (t != null ? ` "${t}"` : "");
}
function ju(e) {
  return gg(e) ? `"${e}"` : e;
}
const Og = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Parser: qr,
  parse: Wu,
  parseConstValue: Fg,
  parseType: Mg,
  parseValue: Tg
}, Symbol.toStringTag, { value: "Module" })), Lg = /* @__PURE__ */ yo(Og);
function kg(e) {
  return `"${e.replace(Pg, Ug)}"`;
}
const Pg = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Ug(e) {
  return Gg[e.charCodeAt(0)];
}
const Gg = [
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
], Vg = Object.freeze({});
function Hg(e, t, n = Vu) {
  const r = /* @__PURE__ */ new Map();
  for (const T of Object.values(de))
    r.set(T, Xg(t, T));
  let s, i = Array.isArray(e), o = [e], c = -1, A = [], f = e, I, w;
  const C = [], v = [];
  do {
    c++;
    const T = c === o.length, V = T && A.length !== 0;
    if (T) {
      if (I = v.length === 0 ? void 0 : C[C.length - 1], f = w, w = v.pop(), V)
        if (i) {
          f = f.slice();
          let J = 0;
          for (const [O, F] of A) {
            const L = O - J;
            F === null ? (f.splice(L, 1), J++) : f[L] = F;
          }
        } else {
          f = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(f)
          );
          for (const [J, O] of A)
            f[J] = O;
        }
      c = s.index, o = s.keys, A = s.edits, i = s.inArray, s = s.prev;
    } else if (w) {
      if (I = i ? c : o[c], f = w[I], f == null)
        continue;
      C.push(I);
    }
    let k;
    if (!Array.isArray(f)) {
      var R, B;
      hc(f) || Bs(!1, `Invalid AST Node: ${$o(f)}.`);
      const J = T ? (R = r.get(f.kind)) === null || R === void 0 ? void 0 : R.leave : (B = r.get(f.kind)) === null || B === void 0 ? void 0 : B.enter;
      if (k = J == null ? void 0 : J.call(t, f, I, w, C, v), k === Vg)
        break;
      if (k === !1) {
        if (!T) {
          C.pop();
          continue;
        }
      } else if (k !== void 0 && (A.push([I, k]), !T))
        if (hc(k))
          f = k;
        else {
          C.pop();
          continue;
        }
    }
    if (k === void 0 && V && A.push([I, f]), T)
      C.pop();
    else {
      var M;
      s = {
        inArray: i,
        index: c,
        keys: o,
        edits: A,
        prev: s
      }, i = Array.isArray(f), o = i ? f : (M = n[f.kind]) !== null && M !== void 0 ? M : [], c = -1, A = [], w && v.push(w), w = f;
    }
  } while (s !== void 0);
  return A.length !== 0 ? A[A.length - 1][1] : e;
}
function Xg(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function qu(e) {
  return Hg(e, zg);
}
const Yg = 80, zg = {
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
    leave: ({ selections: e }) => Tt(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: s }) {
      const i = pe("", e, ": ") + t;
      let o = i + pe("(", te(n, ", "), ")");
      return o.length > Yg && (o = i + pe(`(
`, xs(te(n, `
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
    leave: ({ value: e, block: t }) => t ? fg(e) : kg(e)
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
`) + te(["schema", te(t, " "), Tt(n)], " ")
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
        Tt(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: s }) => pe("", e, `
`) + t + (pc(n) ? pe(`(
`, xs(te(n, `
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
        Tt(s)
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
`) + te(["enum", t, te(n, " "), Tt(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => pe("", e, `
`) + te([t, te(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => pe("", e, `
`) + te(["input", t, te(n, " "), Tt(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: s }) => pe("", e, `
`) + "directive @" + t + (pc(n) ? pe(`(
`, xs(te(n, `
`)), `
)`) : pe("(", te(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + te(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => te(
      ["extend schema", te(e, " "), Tt(t)],
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
        Tt(r)
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
        Tt(r)
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
    leave: ({ name: e, directives: t, values: n }) => te(["extend enum", e, te(t, " "), Tt(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => te(["extend input", e, te(t, " "), Tt(n)], " ")
  }
};
function te(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function Tt(e) {
  return pe(`{
`, xs(te(e, `
`)), `
}`);
}
function pe(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function xs(e) {
  return pe("  ", e.replace(/\n/g, `
  `));
}
function pc(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Zg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  print: qu
}, Symbol.toStringTag, { value: "Module" })), Jg = /* @__PURE__ */ yo(Zg);
var Ko = {}, ti = {}, $u = function(t) {
  var n = t.uri, r = t.name, s = t.type;
  this.uri = n, this.name = r, this.type = s;
}, Wg = $u, Ku = function(t) {
  return typeof File < "u" && t instanceof File || typeof Blob < "u" && t instanceof Blob || t instanceof Wg;
}, jg = Ku, qg = function e(t, n, r) {
  n === void 0 && (n = ""), r === void 0 && (r = jg);
  var s, i = /* @__PURE__ */ new Map();
  function o(I, w) {
    var C = i.get(w);
    C ? C.push.apply(C, I) : i.set(w, I);
  }
  if (r(t))
    s = null, o([n], t);
  else {
    var c = n ? n + "." : "";
    if (typeof FileList < "u" && t instanceof FileList)
      s = Array.prototype.map.call(t, function(I, w) {
        return o(["" + c + w], I), null;
      });
    else if (Array.isArray(t))
      s = t.map(function(I, w) {
        var C = e(I, "" + c + w, r);
        return C.files.forEach(o), C.clone;
      });
    else if (t && t.constructor === Object) {
      s = {};
      for (var A in t) {
        var f = e(t[A], "" + c + A, r);
        f.files.forEach(o), s[A] = f.clone;
      }
    } else
      s = t;
  }
  return {
    clone: s,
    files: i
  };
};
ti.ReactNativeFile = $u;
ti.extractFiles = qg;
ti.isExtractableFile = Ku;
var $g = typeof self == "object" ? self.FormData : window.FormData, $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
$r.defaultJsonSerializer = void 0;
$r.defaultJsonSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
var Kg = Ce && Ce.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ko, "__esModule", { value: !0 });
var e0 = ti, ep = Kg($g), tp = $r, np = function(e) {
  return e0.isExtractableFile(e) || e !== null && typeof e == "object" && typeof e.pipe == "function";
};
function rp(e, t, n, r) {
  r === void 0 && (r = tp.defaultJsonSerializer);
  var s = e0.extractFiles({ query: e, variables: t, operationName: n }, "", np), i = s.clone, o = s.files;
  if (o.size === 0) {
    if (!Array.isArray(e))
      return r.stringify(i);
    if (typeof t < "u" && !Array.isArray(t))
      throw new Error("Cannot create request body with given variable type, array expected");
    var c = e.reduce(function(C, v, R) {
      return C.push({ query: v, variables: t ? t[R] : void 0 }), C;
    }, []);
    return r.stringify(c);
  }
  var A = typeof FormData > "u" ? ep.default : FormData, f = new A();
  f.append("operations", r.stringify(i));
  var I = {}, w = 0;
  return o.forEach(function(C) {
    I[++w] = C;
  }), f.append("map", r.stringify(I)), w = 0, o.forEach(function(C, v) {
    f.append("" + ++w, v);
  }), f;
}
Ko.default = rp;
var Bt = {};
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.parseBatchRequestsExtendedArgs = Bt.parseRawRequestExtendedArgs = Bt.parseRequestExtendedArgs = Bt.parseBatchRequestArgs = Bt.parseRawRequestArgs = Bt.parseRequestArgs = void 0;
function sp(e, t, n) {
  return e.document ? e : {
    document: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Bt.parseRequestArgs = sp;
function ip(e, t, n) {
  return e.query ? e : {
    query: e,
    variables: t,
    requestHeaders: n,
    signal: void 0
  };
}
Bt.parseRawRequestArgs = ip;
function op(e, t) {
  return e.documents ? e : {
    documents: e,
    requestHeaders: t,
    signal: void 0
  };
}
Bt.parseBatchRequestArgs = op;
function ap(e, t, n, r) {
  return e.document ? e : {
    url: e,
    document: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Bt.parseRequestExtendedArgs = ap;
function cp(e, t, n, r) {
  return e.query ? e : {
    url: e,
    query: t,
    variables: n,
    requestHeaders: r,
    signal: void 0
  };
}
Bt.parseRawRequestExtendedArgs = cp;
function dp(e, t, n) {
  return e.documents ? e : {
    url: e,
    documents: t,
    requestHeaders: n,
    signal: void 0
  };
}
Bt.parseBatchRequestsExtendedArgs = dp;
var Kr = {}, up = Ce && Ce.__extends || /* @__PURE__ */ function() {
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
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.ClientError = void 0;
var Ap = (
  /** @class */
  function(e) {
    up(t, e);
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
Kr.ClientError = Ap;
var Er = {}, mc;
function lp() {
  if (mc)
    return Er;
  mc = 1;
  var e = Ce && Ce.__assign || function() {
    return e = Object.assign || function(O) {
      for (var F, L = 1, U = arguments.length; L < U; L++) {
        F = arguments[L];
        for (var j in F)
          Object.prototype.hasOwnProperty.call(F, j) && (O[j] = F[j]);
      }
      return O;
    }, e.apply(this, arguments);
  }, t = Ce && Ce.__awaiter || function(O, F, L, U) {
    function j(H) {
      return H instanceof L ? H : new L(function(Y) {
        Y(H);
      });
    }
    return new (L || (L = Promise))(function(H, Y) {
      function ee(d) {
        try {
          a(U.next(d));
        } catch (l) {
          Y(l);
        }
      }
      function E(d) {
        try {
          a(U.throw(d));
        } catch (l) {
          Y(l);
        }
      }
      function a(d) {
        d.done ? H(d.value) : j(d.value).then(ee, E);
      }
      a((U = U.apply(O, F || [])).next());
    });
  }, n = Ce && Ce.__generator || function(O, F) {
    var L = { label: 0, sent: function() {
      if (H[0] & 1)
        throw H[1];
      return H[1];
    }, trys: [], ops: [] }, U, j, H, Y;
    return Y = { next: ee(0), throw: ee(1), return: ee(2) }, typeof Symbol == "function" && (Y[Symbol.iterator] = function() {
      return this;
    }), Y;
    function ee(a) {
      return function(d) {
        return E([a, d]);
      };
    }
    function E(a) {
      if (U)
        throw new TypeError("Generator is already executing.");
      for (; L; )
        try {
          if (U = 1, j && (H = a[0] & 2 ? j.return : a[0] ? j.throw || ((H = j.return) && H.call(j), 0) : j.next) && !(H = H.call(j, a[1])).done)
            return H;
          switch (j = 0, H && (a = [a[0] & 2, H.value]), a[0]) {
            case 0:
            case 1:
              H = a;
              break;
            case 4:
              return L.label++, { value: a[1], done: !1 };
            case 5:
              L.label++, j = a[1], a = [0];
              continue;
            case 7:
              a = L.ops.pop(), L.trys.pop();
              continue;
            default:
              if (H = L.trys, !(H = H.length > 0 && H[H.length - 1]) && (a[0] === 6 || a[0] === 2)) {
                L = 0;
                continue;
              }
              if (a[0] === 3 && (!H || a[1] > H[0] && a[1] < H[3])) {
                L.label = a[1];
                break;
              }
              if (a[0] === 6 && L.label < H[1]) {
                L.label = H[1], H = a;
                break;
              }
              if (H && L.label < H[2]) {
                L.label = H[2], L.ops.push(a);
                break;
              }
              H[2] && L.ops.pop(), L.trys.pop();
              continue;
          }
          a = F.call(O, L);
        } catch (d) {
          a = [6, d], j = 0;
        } finally {
          U = H = 0;
        }
      if (a[0] & 5)
        throw a[1];
      return { value: a[0] ? a[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(Er, "__esModule", { value: !0 }), Er.GraphQLWebSocketClient = void 0;
  var r = Kr, s = t0(), i = "connection_init", o = "connection_ack", c = "ping", A = "pong", f = "subscribe", I = "next", w = "error", C = "complete", v = (
    /** @class */
    function() {
      function O(F, L, U) {
        this._type = F, this._payload = L, this._id = U;
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
          var F = { type: this.type };
          return this.id != null && this.id != null && (F.id = this.id), this.payload != null && this.payload != null && (F.payload = this.payload), JSON.stringify(F);
        },
        enumerable: !1,
        configurable: !0
      }), O.parse = function(F, L) {
        var U = JSON.parse(F), j = U.type, H = U.payload, Y = U.id;
        return new O(j, L(H), Y);
      }, O;
    }()
  ), R = (
    /** @class */
    function() {
      function O(F, L) {
        var U = this, j = L.onInit, H = L.onAcknowledged, Y = L.onPing, ee = L.onPong;
        this.socketState = { acknowledged: !1, lastRequestId: 0, subscriptions: {} }, this.socket = F, F.onopen = function(E) {
          return t(U, void 0, void 0, function() {
            var a, d, l, p;
            return n(this, function(h) {
              switch (h.label) {
                case 0:
                  return this.socketState.acknowledged = !1, this.socketState.subscriptions = {}, d = (a = F).send, l = M, j ? [4, j()] : [3, 2];
                case 1:
                  return p = h.sent(), [3, 3];
                case 2:
                  p = null, h.label = 3;
                case 3:
                  return d.apply(a, [l.apply(void 0, [p]).text]), [
                    2
                    /*return*/
                  ];
              }
            });
          });
        }, F.onclose = function(E) {
          U.socketState.acknowledged = !1, U.socketState.subscriptions = {};
        }, F.onerror = function(E) {
          console.error(E);
        }, F.onmessage = function(E) {
          try {
            var a = B(E.data);
            switch (a.type) {
              case o: {
                U.socketState.acknowledged ? console.warn("Duplicate CONNECTION_ACK message ignored") : (U.socketState.acknowledged = !0, H && H(a.payload));
                return;
              }
              case c: {
                Y ? Y(a.payload).then(function(y) {
                  return F.send(V(y).text);
                }) : F.send(V(null).text);
                return;
              }
              case A: {
                ee && ee(a.payload);
                return;
              }
            }
            if (!U.socketState.acknowledged || a.id === void 0 || a.id === null || !U.socketState.subscriptions[a.id])
              return;
            var d = U.socketState.subscriptions[a.id], l = d.query, p = d.variables, h = d.subscriber;
            switch (a.type) {
              case I: {
                !a.payload.errors && a.payload.data && h.next && h.next(a.payload.data), a.payload.errors && h.error && h.error(new r.ClientError(e(e({}, a.payload), { status: 200 }), { query: l, variables: p }));
                return;
              }
              case w: {
                h.error && h.error(new r.ClientError({ errors: a.payload, status: 200 }, { query: l, variables: p }));
                return;
              }
              case C: {
                h.complete && h.complete(), delete U.socketState.subscriptions[a.id];
                return;
              }
            }
          } catch (y) {
            console.error(y), F.close(1006);
          }
          F.close(4400, "Unknown graphql-ws message.");
        };
      }
      return O.prototype.makeSubscribe = function(F, L, U, j) {
        var H = this, Y = (this.socketState.lastRequestId++).toString();
        return this.socketState.subscriptions[Y] = { query: F, variables: U, subscriber: j }, this.socket.send(k(Y, { query: F, operationName: L, variables: U }).text), function() {
          H.socket.send(J(Y).text), delete H.socketState.subscriptions[Y];
        };
      }, O.prototype.rawRequest = function(F, L) {
        var U = this;
        return new Promise(function(j, H) {
          var Y;
          U.rawSubscribe(F, {
            next: function(ee, E) {
              return Y = { data: ee, extensions: E };
            },
            error: H,
            complete: function() {
              return j(Y);
            }
          }, L);
        });
      }, O.prototype.request = function(F, L) {
        var U = this;
        return new Promise(function(j, H) {
          var Y;
          U.subscribe(F, {
            next: function(ee) {
              return Y = ee;
            },
            error: H,
            complete: function() {
              return j(Y);
            }
          }, L);
        });
      }, O.prototype.subscribe = function(F, L, U) {
        var j = s.resolveRequestDocument(F), H = j.query, Y = j.operationName;
        return this.makeSubscribe(H, Y, U, L);
      }, O.prototype.rawSubscribe = function(F, L, U) {
        return this.makeSubscribe(F, void 0, U, L);
      }, O.prototype.ping = function(F) {
        this.socket.send(T(F).text);
      }, O.prototype.close = function() {
        this.socket.close(1e3);
      }, O.PROTOCOL = "graphql-transport-ws", O;
    }()
  );
  Er.GraphQLWebSocketClient = R;
  function B(O, F) {
    F === void 0 && (F = function(U) {
      return U;
    });
    var L = v.parse(O, F);
    return L;
  }
  function M(O) {
    return new v(i, O);
  }
  function T(O) {
    return new v(c, O, void 0);
  }
  function V(O) {
    return new v(A, O, void 0);
  }
  function k(O, F) {
    return new v(f, F, O);
  }
  function J(O) {
    return new v(C, void 0, O);
  }
  return Er;
}
var wc;
function t0() {
  return wc || (wc = 1, function(e) {
    var t = Ce && Ce.__assign || function() {
      return t = Object.assign || function(h) {
        for (var y, b = 1, g = arguments.length; b < g; b++) {
          y = arguments[b];
          for (var u in y)
            Object.prototype.hasOwnProperty.call(y, u) && (h[u] = y[u]);
        }
        return h;
      }, t.apply(this, arguments);
    }, n = Ce && Ce.__createBinding || (Object.create ? function(h, y, b, g) {
      g === void 0 && (g = b), Object.defineProperty(h, g, { enumerable: !0, get: function() {
        return y[b];
      } });
    } : function(h, y, b, g) {
      g === void 0 && (g = b), h[g] = y[b];
    }), r = Ce && Ce.__setModuleDefault || (Object.create ? function(h, y) {
      Object.defineProperty(h, "default", { enumerable: !0, value: y });
    } : function(h, y) {
      h.default = y;
    }), s = Ce && Ce.__importStar || function(h) {
      if (h && h.__esModule)
        return h;
      var y = {};
      if (h != null)
        for (var b in h)
          b !== "default" && Object.prototype.hasOwnProperty.call(h, b) && n(y, h, b);
      return r(y, h), y;
    }, i = Ce && Ce.__awaiter || function(h, y, b, g) {
      function u(m) {
        return m instanceof b ? m : new b(function(z) {
          z(m);
        });
      }
      return new (b || (b = Promise))(function(m, z) {
        function W(se) {
          try {
            q(g.next(se));
          } catch (ie) {
            z(ie);
          }
        }
        function K(se) {
          try {
            q(g.throw(se));
          } catch (ie) {
            z(ie);
          }
        }
        function q(se) {
          se.done ? m(se.value) : u(se.value).then(W, K);
        }
        q((g = g.apply(h, y || [])).next());
      });
    }, o = Ce && Ce.__generator || function(h, y) {
      var b = { label: 0, sent: function() {
        if (m[0] & 1)
          throw m[1];
        return m[1];
      }, trys: [], ops: [] }, g, u, m, z;
      return z = { next: W(0), throw: W(1), return: W(2) }, typeof Symbol == "function" && (z[Symbol.iterator] = function() {
        return this;
      }), z;
      function W(q) {
        return function(se) {
          return K([q, se]);
        };
      }
      function K(q) {
        if (g)
          throw new TypeError("Generator is already executing.");
        for (; b; )
          try {
            if (g = 1, u && (m = q[0] & 2 ? u.return : q[0] ? u.throw || ((m = u.return) && m.call(u), 0) : u.next) && !(m = m.call(u, q[1])).done)
              return m;
            switch (u = 0, m && (q = [q[0] & 2, m.value]), q[0]) {
              case 0:
              case 1:
                m = q;
                break;
              case 4:
                return b.label++, { value: q[1], done: !1 };
              case 5:
                b.label++, u = q[1], q = [0];
                continue;
              case 7:
                q = b.ops.pop(), b.trys.pop();
                continue;
              default:
                if (m = b.trys, !(m = m.length > 0 && m[m.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                  b = 0;
                  continue;
                }
                if (q[0] === 3 && (!m || q[1] > m[0] && q[1] < m[3])) {
                  b.label = q[1];
                  break;
                }
                if (q[0] === 6 && b.label < m[1]) {
                  b.label = m[1], m = q;
                  break;
                }
                if (m && b.label < m[2]) {
                  b.label = m[2], b.ops.push(q);
                  break;
                }
                m[2] && b.ops.pop(), b.trys.pop();
                continue;
            }
            q = y.call(h, b);
          } catch (se) {
            q = [6, se], u = 0;
          } finally {
            g = m = 0;
          }
        if (q[0] & 5)
          throw q[1];
        return { value: q[0] ? q[1] : void 0, done: !0 };
      }
    }, c = Ce && Ce.__rest || function(h, y) {
      var b = {};
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && y.indexOf(g) < 0 && (b[g] = h[g]);
      if (h != null && typeof Object.getOwnPropertySymbols == "function")
        for (var u = 0, g = Object.getOwnPropertySymbols(h); u < g.length; u++)
          y.indexOf(g[u]) < 0 && Object.prototype.propertyIsEnumerable.call(h, g[u]) && (b[g[u]] = h[g[u]]);
      return b;
    }, A = Ce && Ce.__importDefault || function(h) {
      return h && h.__esModule ? h : { default: h };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.GraphQLWebSocketClient = e.gql = e.resolveRequestDocument = e.batchRequests = e.request = e.rawRequest = e.GraphQLClient = e.ClientError = void 0;
    var f = s(ng), I = f, w = Lg, C = Jg, v = A(Ko), R = $r, B = Bt, M = Kr;
    Object.defineProperty(e, "ClientError", { enumerable: !0, get: function() {
      return M.ClientError;
    } });
    var T = function(h) {
      var y = {};
      return h && (typeof Headers < "u" && h instanceof Headers || I && I.Headers && h instanceof I.Headers ? y = l(h) : Array.isArray(h) ? h.forEach(function(b) {
        var g = b[0], u = b[1];
        y[g] = u;
      }) : y = h), y;
    }, V = function(h) {
      return h.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
    }, k = function(h) {
      var y = h.query, b = h.variables, g = h.operationName, u = h.jsonSerializer;
      if (!Array.isArray(y)) {
        var m = ["query=" + encodeURIComponent(V(y))];
        return b && m.push("variables=" + encodeURIComponent(u.stringify(b))), g && m.push("operationName=" + encodeURIComponent(g)), m.join("&");
      }
      if (typeof b < "u" && !Array.isArray(b))
        throw new Error("Cannot create query with given variable type, array expected");
      var z = y.reduce(function(W, K, q) {
        return W.push({
          query: V(K),
          variables: b ? u.stringify(b[q]) : void 0
        }), W;
      }, []);
      return "query=" + encodeURIComponent(u.stringify(z));
    }, J = function(h) {
      var y = h.url, b = h.query, g = h.variables, u = h.operationName, m = h.headers, z = h.fetch, W = h.fetchOptions, K = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, se;
        return o(this, function(ie) {
          switch (ie.label) {
            case 0:
              return q = v.default(b, g, u, W.jsonSerializer), se = t({ method: "POST", headers: t(t({}, typeof q == "string" ? { "Content-Type": "application/json" } : {}), m), body: q }, W), K ? [4, Promise.resolve(K(se))] : [3, 2];
            case 1:
              se = ie.sent(), ie.label = 2;
            case 2:
              return [4, z(y, se)];
            case 3:
              return [2, ie.sent()];
          }
        });
      });
    }, O = function(h) {
      var y = h.url, b = h.query, g = h.variables, u = h.operationName, m = h.headers, z = h.fetch, W = h.fetchOptions, K = h.middleware;
      return i(void 0, void 0, void 0, function() {
        var q, se;
        return o(this, function(ie) {
          switch (ie.label) {
            case 0:
              return q = k({
                query: b,
                variables: g,
                operationName: u,
                jsonSerializer: W.jsonSerializer
              }), se = t({ method: "GET", headers: m }, W), K ? [4, Promise.resolve(K(se))] : [3, 2];
            case 1:
              se = ie.sent(), ie.label = 2;
            case 2:
              return [4, z(y + "?" + q, se)];
            case 3:
              return [2, ie.sent()];
          }
        });
      });
    }, F = (
      /** @class */
      function() {
        function h(y, b) {
          b === void 0 && (b = {}), this.url = y, this.options = b;
        }
        return h.prototype.rawRequest = function(y, b, g) {
          return i(this, void 0, void 0, function() {
            var u, m, z, W, K, q, se, ie, De, he, ce, _e;
            return o(this, function(le) {
              return u = B.parseRawRequestArgs(y, b, g), m = this.options, z = m.headers, W = m.fetch, K = W === void 0 ? f.default : W, q = m.method, se = q === void 0 ? "POST" : q, ie = m.requestMiddleware, De = m.responseMiddleware, he = c(m, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), ce = this.url, u.signal !== void 0 && (he.signal = u.signal), _e = E(u.query).operationName, [2, L({
                url: ce,
                query: u.query,
                variables: u.variables,
                headers: t(t({}, T(a(z))), T(u.requestHeaders)),
                operationName: _e,
                fetch: K,
                method: se,
                fetchOptions: he,
                middleware: ie
              }).then(function(ge) {
                return De && De(ge), ge;
              }).catch(function(ge) {
                throw De && De(ge), ge;
              })];
            });
          });
        }, h.prototype.request = function(y) {
          for (var b = [], g = 1; g < arguments.length; g++)
            b[g - 1] = arguments[g];
          var u = b[0], m = b[1], z = B.parseRequestArgs(y, u, m), W = this.options, K = W.headers, q = W.fetch, se = q === void 0 ? f.default : q, ie = W.method, De = ie === void 0 ? "POST" : ie, he = W.requestMiddleware, ce = W.responseMiddleware, _e = c(W, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), le = this.url;
          z.signal !== void 0 && (_e.signal = z.signal);
          var ge = E(z.document), Gt = ge.query, ve = ge.operationName;
          return L({
            url: le,
            query: Gt,
            variables: z.variables,
            headers: t(t({}, T(a(K))), T(z.requestHeaders)),
            operationName: ve,
            fetch: se,
            method: De,
            fetchOptions: _e,
            middleware: he
          }).then(function(be) {
            return ce && ce(be), be.data;
          }).catch(function(be) {
            throw ce && ce(be), be;
          });
        }, h.prototype.batchRequests = function(y, b) {
          var g = B.parseBatchRequestArgs(y, b), u = this.options, m = u.headers, z = u.fetch, W = z === void 0 ? f.default : z, K = u.method, q = K === void 0 ? "POST" : K, se = u.requestMiddleware, ie = u.responseMiddleware, De = c(u, ["headers", "fetch", "method", "requestMiddleware", "responseMiddleware"]), he = this.url;
          g.signal !== void 0 && (De.signal = g.signal);
          var ce = g.documents.map(function(le) {
            var ge = le.document;
            return E(ge).query;
          }), _e = g.documents.map(function(le) {
            var ge = le.variables;
            return ge;
          });
          return L({
            url: he,
            query: ce,
            variables: _e,
            headers: t(t({}, T(a(m))), T(g.requestHeaders)),
            operationName: void 0,
            fetch: W,
            method: q,
            fetchOptions: De,
            middleware: se
          }).then(function(le) {
            return ie && ie(le), le.data;
          }).catch(function(le) {
            throw ie && ie(le), le;
          });
        }, h.prototype.setHeaders = function(y) {
          return this.options.headers = y, this;
        }, h.prototype.setHeader = function(y, b) {
          var g, u = this.options.headers;
          return u ? u[y] = b : this.options.headers = (g = {}, g[y] = b, g), this;
        }, h.prototype.setEndpoint = function(y) {
          return this.url = y, this;
        }, h;
      }()
    );
    e.GraphQLClient = F;
    function L(h) {
      var y = h.url, b = h.query, g = h.variables, u = h.headers, m = h.operationName, z = h.fetch, W = h.method, K = W === void 0 ? "POST" : W, q = h.fetchOptions, se = h.middleware;
      return i(this, void 0, void 0, function() {
        var ie, De, he, ce, _e, le, ge, Gt, ve, be, Ir;
        return o(this, function(Qe) {
          switch (Qe.label) {
            case 0:
              return ie = K.toUpperCase() === "POST" ? J : O, De = Array.isArray(b), [4, ie({
                url: y,
                query: b,
                variables: g,
                operationName: m,
                headers: u,
                fetch: z,
                fetchOptions: q,
                middleware: se
              })];
            case 1:
              return he = Qe.sent(), [4, Y(he, q.jsonSerializer)];
            case 2:
              if (ce = Qe.sent(), _e = De && Array.isArray(ce) ? !ce.some(function(Me) {
                var rs = Me.data;
                return !rs;
              }) : !!ce.data, le = !ce.errors || q.errorPolicy === "all" || q.errorPolicy === "ignore", he.ok && le && _e)
                return ge = he.headers, Gt = he.status, ce.errors, ve = c(ce, ["errors"]), be = q.errorPolicy === "ignore" ? ve : ce, [2, t(t({}, De ? { data: be } : be), { headers: ge, status: Gt })];
              throw Ir = typeof ce == "string" ? { error: ce } : ce, new M.ClientError(t(t({}, Ir), { status: he.status, headers: he.headers }), { query: b, variables: g });
          }
        });
      });
    }
    function U(h, y, b, g) {
      return i(this, void 0, void 0, function() {
        var u, m;
        return o(this, function(z) {
          return u = B.parseRawRequestExtendedArgs(h, y, b, g), m = new F(u.url), [2, m.rawRequest(t({}, u))];
        });
      });
    }
    e.rawRequest = U;
    function j(h, y) {
      for (var b = [], g = 2; g < arguments.length; g++)
        b[g - 2] = arguments[g];
      return i(this, void 0, void 0, function() {
        var u, m, z, W;
        return o(this, function(K) {
          return u = b[0], m = b[1], z = B.parseRequestExtendedArgs(h, y, u, m), W = new F(z.url), [2, W.request(t({}, z))];
        });
      });
    }
    e.request = j;
    function H(h, y, b) {
      return i(this, void 0, void 0, function() {
        var g, u;
        return o(this, function(m) {
          return g = B.parseBatchRequestsExtendedArgs(h, y, b), u = new F(g.url), [2, u.batchRequests(t({}, g))];
        });
      });
    }
    e.batchRequests = H, e.default = j;
    function Y(h, y) {
      return y === void 0 && (y = R.defaultJsonSerializer), i(this, void 0, void 0, function() {
        var b, g, u;
        return o(this, function(m) {
          switch (m.label) {
            case 0:
              return h.headers.forEach(function(z, W) {
                W.toLowerCase() === "content-type" && (b = z);
              }), b && b.toLowerCase().startsWith("application/json") ? (u = (g = y).parse, [4, h.text()]) : [3, 2];
            case 1:
              return [2, u.apply(g, [m.sent()])];
            case 2:
              return [2, h.text()];
          }
        });
      });
    }
    function ee(h) {
      var y, b = void 0, g = h.definitions.filter(function(u) {
        return u.kind === "OperationDefinition";
      });
      return g.length === 1 && (b = (y = g[0].name) === null || y === void 0 ? void 0 : y.value), b;
    }
    function E(h) {
      if (typeof h == "string") {
        var y = void 0;
        try {
          var b = w.parse(h);
          y = ee(b);
        } catch {
        }
        return { query: h, operationName: y };
      }
      var g = ee(h);
      return { query: C.print(h), operationName: g };
    }
    e.resolveRequestDocument = E;
    function a(h) {
      return typeof h == "function" ? h() : h;
    }
    function d(h) {
      for (var y = [], b = 1; b < arguments.length; b++)
        y[b - 1] = arguments[b];
      return h.reduce(function(g, u, m) {
        return "" + g + u + (m in y ? y[m] : "");
      }, "");
    }
    e.gql = d;
    function l(h) {
      var y = {};
      return h.forEach(function(b, g) {
        y[g] = b;
      }), y;
    }
    var p = lp();
    Object.defineProperty(e, "GraphQLWebSocketClient", { enumerable: !0, get: function() {
      return p.GraphQLWebSocketClient;
    } });
  }(Ni)), Ni;
}
var fp = t0(), ks = function() {
  return ks = Object.assign || function(t) {
    for (var n, r = 1, s = arguments.length; r < s; r++) {
      n = arguments[r];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, ks.apply(this, arguments);
};
var _s = /* @__PURE__ */ new Map(), no = /* @__PURE__ */ new Map(), n0 = !0, Ps = !1;
function r0(e) {
  return e.replace(/[\s,]+/g, " ").trim();
}
function hp(e) {
  return r0(e.source.body.substring(e.start, e.end));
}
function gp(e) {
  var t = /* @__PURE__ */ new Set(), n = [];
  return e.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var s = r.name.value, i = hp(r.loc), o = no.get(s);
      o && !o.has(i) ? n0 && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || no.set(s, o = /* @__PURE__ */ new Set()), o.add(i), t.has(i) || (t.add(i), n.push(r));
    } else
      n.push(r);
  }), ks(ks({}, e), { definitions: n });
}
function pp(e) {
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
function mp(e) {
  var t = r0(e);
  if (!_s.has(t)) {
    var n = Wu(e, {
      experimentalFragmentVariables: Ps,
      allowLegacyFragmentVariables: Ps
    });
    if (!n || n.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    _s.set(t, pp(gp(n)));
  }
  return _s.get(t);
}
function lr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  typeof e == "string" && (e = [e]);
  var r = e[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? r += s.loc.source.body : r += s, r += e[i + 1];
  }), mp(r);
}
function wp() {
  _s.clear(), no.clear();
}
function yp() {
  n0 = !1;
}
function Ip() {
  Ps = !0;
}
function bp() {
  Ps = !1;
}
var Cr = {
  gql: lr,
  resetCaches: wp,
  disableFragmentWarnings: yp,
  enableExperimentalFragmentVariables: Ip,
  disableExperimentalFragmentVariables: bp
};
(function(e) {
  e.gql = Cr.gql, e.resetCaches = Cr.resetCaches, e.disableFragmentWarnings = Cr.disableFragmentWarnings, e.enableExperimentalFragmentVariables = Cr.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = Cr.disableExperimentalFragmentVariables;
})(lr || (lr = {}));
lr.default = lr;
const ae = lr;
var Se = "0x0000000000000000000000000000000000000000000000000000000000000000", cb = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", db = 16 * 1024, ub = 16, Ab = 1024 * 1024 * 1024, lb = 1024 * 1024 * 1024, fb = 255, hb = 1024 * 1024, gb = 1024 * 1024, Ep = "0xffffffffffff0000", s0 = "0xffffffffffff0001", Cp = "0xffffffffffff0003", Bp = "0xffffffffffff0004", xp = "0xffffffffffff0005", pb = "0x0", _p = [
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
], vp = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
let Q;
const i0 = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && i0.decode();
let Rr = null;
function o0() {
  return (Rr === null || Rr.byteLength === 0) && (Rr = new Uint8Array(Q.memory.buffer)), Rr;
}
function Rp(e, t) {
  return e = e >>> 0, i0.decode(o0().subarray(e, e + t));
}
function a0(e) {
  const t = Q.ret(e);
  return Qt.__wrap(t);
}
function Np(e, t) {
  const n = Q.retd(e, t);
  return Qt.__wrap(n);
}
function yc(e, t, n, r) {
  const s = Q.call(e, t, n, r);
  return Qt.__wrap(s);
}
function Sp(e, t, n) {
  const r = Q.tr(e, t, n);
  return Qt.__wrap(r);
}
function Ic(e, t, n) {
  const r = Q.addi(e, t, n);
  return Qt.__wrap(r);
}
function Dp(e, t, n) {
  const r = Q.muli(e, t, n);
  return Qt.__wrap(r);
}
function Nr(e, t, n) {
  const r = Q.lw(e, t, n);
  return Qt.__wrap(r);
}
function Qp(e, t, n) {
  const r = Q.gtf(e, t, n);
  return Qt.__wrap(r);
}
function As(e, t) {
  const n = Q.movi(e, t);
  return Qt.__wrap(n);
}
let Sr = null;
function bc() {
  return (Sr === null || Sr.byteLength === 0) && (Sr = new Int32Array(Q.memory.buffer)), Sr;
}
function Tp(e, t) {
  return e = e >>> 0, o0().subarray(e / 1, e / 1 + t);
}
const Fp = Object.freeze({
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
  *r" Set `$rA` to size of the transaction in memory, in bytes
  */
  TxLength: 14,
  14: "TxLength",
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
  PolicyTip: 1281,
  1281: "PolicyTip",
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
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_add_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_addi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_aloc_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_and_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_andi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_bal_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_bhei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_bhsh_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_burn_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_call_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ccp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfe_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_cfsi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_croo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_csiz_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_compareargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_div_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_divi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_divargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ecal_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_eck1_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ecr1_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ed19_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_eq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_exp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_expi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_flag_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_gm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_gt_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_gtf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm06_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm12_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm18_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_imm24_free(e >>> 0));
const Ec = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_instruction_free(e >>> 0));
class Qt {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Qt.prototype);
    return n.__wbg_ptr = t, Ec.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ec.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    Q.__wbg_instruction_free(t);
  }
  /**
  * Convenience method for converting to bytes
  * @returns {Uint8Array}
  */
  to_bytes() {
    try {
      const s = Q.__wbindgen_add_to_stack_pointer(-16);
      Q.instruction_to_bytes(s, this.__wbg_ptr);
      var t = bc()[s / 4 + 0], n = bc()[s / 4 + 1], r = Tp(t, n).slice();
      return Q.__wbindgen_export_0(t, n * 1, 1), r;
    } finally {
      Q.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * Size of an instruction in bytes
  * @returns {number}
  */
  static size() {
    return Q.instruction_size() >>> 0;
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ji_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jmp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jmpb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jmpf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jne_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jneb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnef_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnei_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnzb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnzf_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_jnzi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_k256_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_lb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ldc_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_log_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_logd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_lt_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_lw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcp_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mcpi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_meq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mint_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mldv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mlog_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mod_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_modi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_move_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_movi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mroo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mul_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_muli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mathargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_mulargs_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_noop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_not_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_or_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ori_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_poph_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_popl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_pshh_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_pshl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_panicinstruction_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_ret_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_retd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_rvrt_free(e >>> 0));
const Cc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => Q.__wbg_regid_free(e >>> 0));
class Te {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Te.prototype);
    return n.__wbg_ptr = t, Cc.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    Q.__wbg_regid_free(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * Returns `None` if the value is outside the 6-bit value range.
  * @param {number} u
  * @returns {RegId | undefined}
  */
  static new_checked(t) {
    const n = Q.regid_new_checked(t);
    return n === 0 ? void 0 : Te.__wrap(n);
  }
  /**
  * Received balance for this context.
  * @returns {RegId}
  */
  static bal() {
    const t = Q.regid_bal();
    return Te.__wrap(t);
  }
  /**
  * Remaining gas in the context.
  * @returns {RegId}
  */
  static cgas() {
    const t = Q.regid_cgas();
    return Te.__wrap(t);
  }
  /**
  * Error codes for particular operations.
  * @returns {RegId}
  */
  static err() {
    const t = Q.regid_err();
    return Te.__wrap(t);
  }
  /**
  * Flags register.
  * @returns {RegId}
  */
  static flag() {
    const t = Q.regid_flag();
    return Te.__wrap(t);
  }
  /**
  * Frame pointer. Memory address of beginning of current call frame.
  * @returns {RegId}
  */
  static fp() {
    const t = Q.regid_fp();
    return Te.__wrap(t);
  }
  /**
  * Remaining gas globally.
  * @returns {RegId}
  */
  static ggas() {
    const t = Q.regid_ggas();
    return Te.__wrap(t);
  }
  /**
  * Heap pointer. Memory address below the current bottom of the heap (points to free
  * memory).
  * @returns {RegId}
  */
  static hp() {
    const t = Q.regid_hp();
    return Te.__wrap(t);
  }
  /**
  * Instructions start. Pointer to the start of the currently-executing code.
  * @returns {RegId}
  */
  static is() {
    const t = Q.regid_is();
    return Te.__wrap(t);
  }
  /**
  * Contains overflow/underflow of addition, subtraction, and multiplication.
  * @returns {RegId}
  */
  static of() {
    const t = Q.regid_of();
    return Te.__wrap(t);
  }
  /**
  * Contains one (1), for convenience.
  * @returns {RegId}
  */
  static one() {
    const t = Q.regid_one();
    return Te.__wrap(t);
  }
  /**
  * The program counter. Memory address of the current instruction.
  * @returns {RegId}
  */
  static pc() {
    const t = Q.regid_pc();
    return Te.__wrap(t);
  }
  /**
  * Return value or pointer.
  * @returns {RegId}
  */
  static ret() {
    const t = Q.regid_ret();
    return Te.__wrap(t);
  }
  /**
  * Return value length in bytes.
  * @returns {RegId}
  */
  static retl() {
    const t = Q.regid_retl();
    return Te.__wrap(t);
  }
  /**
  * Stack pointer. Memory address on top of current writable stack area (points to
  * free memory).
  * @returns {RegId}
  */
  static sp() {
    const t = Q.regid_sp();
    return Te.__wrap(t);
  }
  /**
  * Stack start pointer. Memory address of bottom of current writable stack area.
  * @returns {RegId}
  */
  static spp() {
    const t = Q.regid_spp();
    return Te.__wrap(t);
  }
  /**
  * Smallest writable register.
  * @returns {RegId}
  */
  static writable() {
    const t = Q.regid_writable();
    return Te.__wrap(t);
  }
  /**
  * Contains zero (0), for convenience.
  * @returns {RegId}
  */
  static zero() {
    const t = Q.regid_zero();
    return Te.__wrap(t);
  }
  /**
  * Construct a register ID from the given value.
  *
  * The given value will be masked to 6 bits.
  * @param {number} u
  */
  constructor(t) {
    const n = Q.regid_new_typescript(t);
    return this.__wbg_ptr = n >>> 0, this;
  }
  /**
  * A const alternative to the `Into<u8>` implementation.
  * @returns {number}
  */
  to_u8() {
    const t = this.__destroy_into_raw();
    return Q.regid_to_u8(t);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_s256_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sb_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_scwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sll_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_slli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_smo_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srl_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srli_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_srwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sub_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_subi_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sw_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_sww_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_swwq_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_time_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_tr_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_tro_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdam_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdcm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wddv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdmd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdml_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdmm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wdop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqam_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqcm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqdv_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqmd_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqml_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqmm_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_wqop_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_xor_free(e >>> 0));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => Q.__wbg_xori_free(e >>> 0));
async function Mp(e, t) {
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
function Op() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbindgen_throw = function(t, n) {
    throw new Error(Rp(t, n));
  }, e;
}
function Lp(e, t) {
  return Q = e.exports, c0.__wbindgen_wasm_module = t, Sr = null, Rr = null, Q;
}
async function c0(e) {
  if (Q !== void 0)
    return Q;
  const t = Op(), { instance: n, module: r } = await Mp(await e, t);
  return Lp(n, r);
}
function kp(e, t, n, r) {
  function s(w, C, v) {
    var R = v ? WebAssembly.instantiateStreaming : WebAssembly.instantiate, B = v ? WebAssembly.compileStreaming : WebAssembly.compile;
    return C ? R(w, C) : B(w);
  }
  var i = null, o = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (o)
    i = Buffer.from(n, "base64");
  else {
    var c = globalThis.atob(n), A = c.length;
    i = new Uint8Array(new ArrayBuffer(A));
    for (var f = 0; f < A; f++)
      i[f] = c.charCodeAt(f);
  }
  if (e) {
    var I = new WebAssembly.Module(i);
    return r ? new WebAssembly.Instance(I, r) : I;
  } else
    return s(i, r, !1);
}
function Pp(e) {
  return kp(1, null, "AGFzbQEAAAABQAtgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2AAAX9gAn9/AGABfwBgBX9/f39/AX9gA39/fwBgAABgAn5/AX8CGAEDd2JnEF9fd2JpbmRnZW5fdGhyb3cABQP7AfkBAQMKBgEFBQUBBQEBAQEBAQECBQICAQEDAgICAgUCAwMDAwMDAwIBBQEFAAMDAwMDAwMDAwMDAQABAQUFAQEBAQEBAQEBAQIBBQUFAwIBAAABAQEFAgIBAQYABgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGAwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDBgADAQEBBwICAAIABgEEAwEDBQgBCQkDAwMFAQEBBgYGBgQEBAQEBAQEBAQEBAQEBAQEBAQGBwcCAgIDBwcACAADBAUBcAEHBwUDAQARBgkBfwFBgIDAAAsHxEvBBQZtZW1vcnkCABZfX3diZ19jb21wYXJlYXJnc19mcmVlAHcaX193YmdfZ2V0X2NvbXBhcmVhcmdzX21vZGUAORpfX3diZ19zZXRfY29tcGFyZWFyZ3NfbW9kZQAoIl9fd2JnX2dldF9jb21wYXJlYXJnc19pbmRpcmVjdF9yaHMAOiJfX3diZ19zZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzADsSY29tcGFyZWFyZ3NfdG9faW1tAEgUY29tcGFyZWFyZ3NfZnJvbV9pbW0AKRVfX3diZ19nZXRfbWF0aGFyZ3Nfb3AAORVfX3diZ19zZXRfbWF0aGFyZ3Nfb3AAKhJfX3diZ19tdWxhcmdzX2ZyZWUAeB5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAOR5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9yaHMAPBJfX3diZ19kaXZhcmdzX2ZyZWUA1gEeX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAK0BIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABMF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAD4ccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgA/DGdtX2Zyb21fYXJncwDJAQ1ndGZfZnJvbV9hcmdzAMEBB2dtX2FyZ3MAeQhndGZfYXJncwBaDndkY21fZnJvbV9hcmdzACYOd2RvcF9mcm9tX2FyZ3MAJg53ZG1sX2Zyb21fYXJncwAeDndkZHZfZnJvbV9hcmdzAL8BCXdkY21fYXJncwAZCXdxY21fYXJncwAaCXdkb3BfYXJncwAbCXdxb3BfYXJncwAcCXdkbWxfYXJncwAUCXdxbWxfYXJncwAVCXdkZHZfYXJncwBVCXdxZHZfYXJncwBWEF9fd2JnX2ltbTA2X2ZyZWUA1wEQX193YmdfaW1tMTJfZnJlZQDYARBfX3diZ19pbW0xOF9mcmVlANkBDl9fd2JnX2FkZF9mcmVlALgBD19fd2JnX25vb3BfZnJlZQBbEmFkZF9uZXdfdHlwZXNjcmlwdABPBmFkZF9yYQAWBmFkZF9yYgALBmFkZF9yYwAPA2FkZAC5AQNhbmQAewNkaXYAfAJlcQB9A2V4cAB+Amd0AH8CbHQAgAEEbWxvZwCBAQRtcm9vAIIBBG1vZF8AgwEFbW92ZV8ALANtdWwAhAEDbm90AC0Cb3IAhQEDc2xsAIYBA3NybACHAQNzdWIAiAEDeG9yAIkBBG1sZHYAXANyZXQArgEEcmV0ZAAuE2Fsb2NfbmV3X3R5cGVzY3JpcHQAVwdhbG9jX3JhAE4EYWxvYwCvAQNtY2wALwNtY3AAigEDbWVxAF0TYmhzaF9uZXdfdHlwZXNjcmlwdAAfBGJoc2gAMARiaGVpALABBGJ1cm4AMRNjYWxsX25ld190eXBlc2NyaXB0AE0HY2FsbF9yZAAXBGNhbGwAXgNjY3AAXwRjcm9vADIEY3NpegAzAmNiALEBA2xkYwCLAQNsb2cAYARsb2dkAGEEbWludAA0BHJ2cnQAsgEEc2N3cQCMAQNzcncAjQEEc3J3cQBiA3N3dwCOAQRzd3dxAGMCdHIAjwEDdHJvAGQEZWNrMQCQAQRlY3IxAJEBBGVkMTkAkgEEazI1NgCTAQRzMjU2AJQBBHRpbWUANRNub29wX25ld190eXBlc2NyaXB0AMYBBG5vb3AA2gEEZmxhZwCzAQNiYWwAlQEDam1wALQBA2puZQCWAQNzbW8AZRNhZGRpX25ld190eXBlc2NyaXB0AFAKYWRkaV9pbW0xMgAMBGFkZGkAlwEEYW5kaQCYAQRkaXZpAJkBBGV4cGkAmgEEbW9kaQCbAQRtdWxpAJwBA29yaQCdAQRzbGxpAJ4BBHNybGkAnwEEc3ViaQCgAQR4b3JpAKEBBGpuZWkAogECbGIAowECbHcApAECc2IApQECc3cApgEEbWNwaQCnARJndGZfbmV3X3R5cGVzY3JpcHQAwwEDZ3RmAKgBBG1jbGkAIBFnbV9uZXdfdHlwZXNjcmlwdAA2CGdtX2ltbTE4AAkCZ20AIQRtb3ZpACIEam56aQAjBGptcGYAJBNqbXBiX25ld190eXBlc2NyaXB0ABgEam1wYgAlBGpuemYAqQEEam56YgCqAQRqbmVmAGYKam5lYl9pbW0wNgAXBGpuZWIAZwJqaQBAE2NmZWlfbmV3X3R5cGVzY3JpcHQANwpjZmVpX2ltbTI0ACcEY2ZlaQBBBGNmc2kAQgNjZmUAtQEDY2ZzALYBBHBzaGwAQwRwc2hoAEQEcG9wbABFBHBvcGgARhN3ZGNtX25ld190eXBlc2NyaXB0AMABBHdkY20AaAR3cWNtAGkEd2RvcABqBHdxb3AAawR3ZG1sAGwEd3FtbABtBHdkZHYAbgR3cWR2AG8Ed2RtZABwBHdxbWQAcQR3ZGFtAHIEd3FhbQBzBHdkbW0AdAR3cW1tAHUEZWNhbAB2Fl9fd2JnX2luc3RydWN0aW9uX2ZyZWUAWRRpbnN0cnVjdGlvbl90b19ieXRlcwAKEGluc3RydWN0aW9uX3NpemUA7AERcmVnaWRfbmV3X2NoZWNrZWQAqwEJcmVnaWRfYmFsANsBCnJlZ2lkX2NnYXMA3AEJcmVnaWRfZXJyAN0BCnJlZ2lkX2ZsYWcA3gEIcmVnaWRfZnAA3wEKcmVnaWRfZ2dhcwDgAQhyZWdpZF9ocADhAQhyZWdpZF9pcwDiAQhyZWdpZF9vZgDjAQlyZWdpZF9vbmUA5AEIcmVnaWRfcGMA5QEJcmVnaWRfcmV0AOYBCnJlZ2lkX3JldGwA5wEIcmVnaWRfc3AA6AEJcmVnaWRfc3BwAOkBDnJlZ2lkX3dyaXRhYmxlAOoBCnJlZ2lkX3plcm8A6wEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA0wELcmVnaWRfdG9fdTgA1AETbW92aV9uZXdfdHlwZXNjcmlwdAAYE21jbGlfbmV3X3R5cGVzY3JpcHQAGBNqbnppX25ld190eXBlc2NyaXB0ABgTam1wZl9uZXdfdHlwZXNjcmlwdAAYEm5vdF9uZXdfdHlwZXNjcmlwdAAfE3JldGRfbmV3X3R5cGVzY3JpcHQAHxNtb3ZlX25ld190eXBlc2NyaXB0AB8SbWNsX25ld190eXBlc2NyaXB0AB8TYnVybl9uZXdfdHlwZXNjcmlwdAAfE2Nyb29fbmV3X3R5cGVzY3JpcHQAHxNjc2l6X25ld190eXBlc2NyaXB0AB8TbWludF9uZXdfdHlwZXNjcmlwdAAfE3RpbWVfbmV3X3R5cGVzY3JpcHQAHxJyZXRfbmV3X3R5cGVzY3JpcHQAVxNiaGVpX25ld190eXBlc2NyaXB0AFcRY2JfbmV3X3R5cGVzY3JpcHQAVxNydnJ0X25ld190eXBlc2NyaXB0AFcTZmxhZ19uZXdfdHlwZXNjcmlwdABXEmptcF9uZXdfdHlwZXNjcmlwdABXEmNmZV9uZXdfdHlwZXNjcmlwdABXEmNmc19uZXdfdHlwZXNjcmlwdABXE21sZHZfbmV3X3R5cGVzY3JpcHQATRJtZXFfbmV3X3R5cGVzY3JpcHQATRJjY3BfbmV3X3R5cGVzY3JpcHQATRJsb2dfbmV3X3R5cGVzY3JpcHQATRNsb2dkX25ld190eXBlc2NyaXB0AE0Tc3J3cV9uZXdfdHlwZXNjcmlwdABNE3N3d3FfbmV3X3R5cGVzY3JpcHQATRJ0cm9fbmV3X3R5cGVzY3JpcHQATRJzbW9fbmV3X3R5cGVzY3JpcHQATRNqbmVmX25ld190eXBlc2NyaXB0AE0Td2RtZF9uZXdfdHlwZXNjcmlwdABNE3dxbWRfbmV3X3R5cGVzY3JpcHQATRN3ZGFtX25ld190eXBlc2NyaXB0AE0Td3FhbV9uZXdfdHlwZXNjcmlwdABNE3dkbW1fbmV3X3R5cGVzY3JpcHQATRN3cW1tX25ld190eXBlc2NyaXB0AE0TZWNhbF9uZXdfdHlwZXNjcmlwdABNEmFuZF9uZXdfdHlwZXNjcmlwdABPEmRpdl9uZXdfdHlwZXNjcmlwdABPEWVxX25ld190eXBlc2NyaXB0AE8SZXhwX25ld190eXBlc2NyaXB0AE8RZ3RfbmV3X3R5cGVzY3JpcHQATxFsdF9uZXdfdHlwZXNjcmlwdABPE21sb2dfbmV3X3R5cGVzY3JpcHQATxNtcm9vX25ld190eXBlc2NyaXB0AE8SbW9kX25ld190eXBlc2NyaXB0AE8SbXVsX25ld190eXBlc2NyaXB0AE8Rb3JfbmV3X3R5cGVzY3JpcHQATxJzbGxfbmV3X3R5cGVzY3JpcHQATxJzcmxfbmV3X3R5cGVzY3JpcHQATxJzdWJfbmV3X3R5cGVzY3JpcHQATxJ4b3JfbmV3X3R5cGVzY3JpcHQATxJtY3BfbmV3X3R5cGVzY3JpcHQATxJsZGNfbmV3X3R5cGVzY3JpcHQATxNzY3dxX25ld190eXBlc2NyaXB0AE8Sc3J3X25ld190eXBlc2NyaXB0AE8Sc3d3X25ld190eXBlc2NyaXB0AE8RdHJfbmV3X3R5cGVzY3JpcHQATxNlY2sxX25ld190eXBlc2NyaXB0AE8TZWNyMV9uZXdfdHlwZXNjcmlwdABPE2VkMTlfbmV3X3R5cGVzY3JpcHQATxNrMjU2X25ld190eXBlc2NyaXB0AE8TczI1Nl9uZXdfdHlwZXNjcmlwdABPEmJhbF9uZXdfdHlwZXNjcmlwdABPEmpuZV9uZXdfdHlwZXNjcmlwdABPE2FuZGlfbmV3X3R5cGVzY3JpcHQAUBNkaXZpX25ld190eXBlc2NyaXB0AFATZXhwaV9uZXdfdHlwZXNjcmlwdABQE21vZGlfbmV3X3R5cGVzY3JpcHQAUBNtdWxpX25ld190eXBlc2NyaXB0AFASb3JpX25ld190eXBlc2NyaXB0AFATc2xsaV9uZXdfdHlwZXNjcmlwdABQE3NybGlfbmV3X3R5cGVzY3JpcHQAUBNzdWJpX25ld190eXBlc2NyaXB0AFATeG9yaV9uZXdfdHlwZXNjcmlwdABQE2puZWlfbmV3X3R5cGVzY3JpcHQAUBFsYl9uZXdfdHlwZXNjcmlwdABQEWx3X25ld190eXBlc2NyaXB0AFARc2JfbmV3X3R5cGVzY3JpcHQAUBFzd19uZXdfdHlwZXNjcmlwdABQE21jcGlfbmV3X3R5cGVzY3JpcHQAUBNqbnpmX25ld190eXBlc2NyaXB0AFATam56Yl9uZXdfdHlwZXNjcmlwdABQDndxY21fZnJvbV9hcmdzACYOd3FvcF9mcm9tX2FyZ3MAJh9fX3diZ19zZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzADseX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzADseX193Ymdfc2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzADsRamlfbmV3X3R5cGVzY3JpcHQANxNjZnNpX25ld190eXBlc2NyaXB0ADcTcHNobF9uZXdfdHlwZXNjcmlwdAA3E3BzaGhfbmV3X3R5cGVzY3JpcHQANxNwb3BsX25ld190eXBlc2NyaXB0ADcTcG9waF9uZXdfdHlwZXNjcmlwdAA3E3dxZHZfbmV3X3R5cGVzY3JpcHQAwAEOd3Fkdl9mcm9tX2FyZ3MAvwETd3FvcF9uZXdfdHlwZXNjcmlwdADAARN3ZG9wX25ld190eXBlc2NyaXB0AMABE3dkZHZfbmV3X3R5cGVzY3JpcHQAwAETd3FjbV9uZXdfdHlwZXNjcmlwdADAARN3ZG1sX25ld190eXBlc2NyaXB0AMABDndxbWxfZnJvbV9hcmdzAB4Td3FtbF9uZXdfdHlwZXNjcmlwdADAARBfX3diZ19yZWdpZF9mcmVlANcBEF9fd2JnX2ltbTI0X2ZyZWUA2QEPX193Ymdfc3JsaV9mcmVlALgBDl9fd2JnX21jbF9mcmVlALgBDl9fd2JnX2xkY19mcmVlALgBDV9fd2JnX3N3X2ZyZWUAuAEOX193YmdfbW9kX2ZyZWUAuAEPX193Ymdfc3J3cV9mcmVlALgBD19fd2JnX2ZsYWdfZnJlZQC4AQ5fX3diZ19leHBfZnJlZQC4AQ9fX3diZ19lZDE5X2ZyZWUAuAEPX193YmdfZWNhbF9mcmVlALgBDl9fd2JnX3Ntb19mcmVlALgBD19fd2JnX2RpdmlfZnJlZQC4AQ9fX3diZ19qbmVmX2ZyZWUAuAEPX193Ymdfd2RtbV9mcmVlALgBD19fd2JnX2V4cGlfZnJlZQC4AQ9fX3diZ19taW50X2ZyZWUAuAEPX193YmdfcG9wbF9mcmVlALgBDl9fd2JnX25vdF9mcmVlALgBDV9fd2JnX2VxX2ZyZWUAuAENX193Ymdfc2JfZnJlZQC4AQ9fX3diZ193cW1tX2ZyZWUAuAEPX193YmdfYmhzaF9mcmVlALgBD19fd2JnX21vdmlfZnJlZQC4AQ5fX3diZ19tY3BfZnJlZQC4AQ5fX3diZ19jY3BfZnJlZQC4AQ9fX3diZ193ZG1kX2ZyZWUAuAEOX193YmdfZ3RmX2ZyZWUAuAEOX193YmdfdHJvX2ZyZWUAuAEPX193YmdfbXVsaV9mcmVlALgBDl9fd2JnX29yaV9mcmVlALgBD19fd2JnX3dkZHZfZnJlZQC4AQ9fX3diZ19qbXBiX2ZyZWUAuAENX193YmdfbGJfZnJlZQC4AQ9fX3diZ19jcm9vX2ZyZWUAuAEPX193Ymdfd3FhbV9mcmVlALgBD19fd2JnX2puZWJfZnJlZQC4AQdmbGFnX3JhAE4OX193YmdfY2ZlX2ZyZWUAuAEPX193Ymdfd2RvcF9mcmVlALgBD19fd2JnX2NzaXpfZnJlZQC4AQ9fX3diZ19tcm9vX2ZyZWUAuAEPX193Ymdfam56Zl9mcmVlALgBCnBvcGxfaW1tMjQAJw9fX3diZ19jZnNpX2ZyZWUAuAEPX193YmdfYW5kaV9mcmVlALgBD19fd2JnX3RpbWVfZnJlZQC4AQ9fX3diZ19tY2xpX2ZyZWUAuAEKcHNoaF9pbW0yNAAnD19fd2JnX3BzaGhfZnJlZQC4AQ9fX3diZ194b3JpX2ZyZWUAuAEPX193YmdfcmV0ZF9mcmVlALgBD19fd2JnX3dxb3BfZnJlZQC4AQ9fX3diZ19rMjU2X2ZyZWUAuAEPX193Ymdfc3ViaV9mcmVlALgBBnJldF9yYQBODl9fd2JnX3JldF9mcmVlALgBDl9fd2JnX2puZV9mcmVlALgBDl9fd2JnX3N3d19mcmVlALgBD19fd2JnX2xvZ2RfZnJlZQC4AQ5fX3diZ19tZXFfZnJlZQC4AQZjZmVfcmEATg9fX3diZ19iaGVpX2ZyZWUAuAEPX193YmdfbWxkdl9mcmVlALgBDl9fd2JnX2Rpdl9mcmVlALgBD19fd2JnX3dxbWxfZnJlZQC4AQ9fX3diZ19tbG9nX2ZyZWUAuAENX193YmdfdHJfZnJlZQC4AQ9fX3diZ193cWR2X2ZyZWUAuAENX193YmdfbHdfZnJlZQC4AQVjYl9yYQBODV9fd2JnX2NiX2ZyZWUAuAEGam1wX3JhAE4OX193Ymdfam1wX2ZyZWUAuAEOX193YmdfYW5kX2ZyZWUAuAEOX193YmdfbXVsX2ZyZWUAuAEKY2ZzaV9pbW0yNAAnD19fd2JnX2NmZWlfZnJlZQC4AQZjZnNfcmEATg5fX3diZ19jZnNfZnJlZQC4AQ9fX3diZ19idXJuX2ZyZWUAuAEOX193YmdfbG9nX2ZyZWUAuAEPX193YmdfczI1Nl9mcmVlALgBD19fd2JnX21jcGlfZnJlZQC4AQ5fX3diZ19zbGxfZnJlZQC4AQ9fX3diZ19tb3ZlX2ZyZWUAuAENX193YmdfbHRfZnJlZQC4AQpwb3BoX2ltbTI0ACcPX193YmdfcG9waF9mcmVlALgBDV9fd2JnX2d0X2ZyZWUAuAEOX193Ymdfc3ViX2ZyZWUAuAEPX193Ymdfd3FtZF9mcmVlALgBD19fd2JnX21vZGlfZnJlZQC4AQ9fX3diZ19lY3IxX2ZyZWUAuAEPX193Ymdfc2xsaV9mcmVlALgBB2JoZWlfcmEATg9fX3diZ19hbG9jX2ZyZWUAuAENX193YmdfZ21fZnJlZQC4AQ5fX3diZ194b3JfZnJlZQC4AQ5fX3diZ19zcmxfZnJlZQC4AQ5fX3diZ19iYWxfZnJlZQC4AQ9fX3diZ19qbmVpX2ZyZWUAuAEPX193YmdfZWNrMV9mcmVlALgBCnBzaGxfaW1tMjQAJw9fX3diZ19wc2hsX2ZyZWUAuAENX193Ymdfb3JfZnJlZQC4AQ5fX3diZ19zcndfZnJlZQC4AQhqaV9pbW0yNAAnDV9fd2JnX2ppX2ZyZWUAuAEPX193Ymdfd3FjbV9mcmVlALgBD19fd2JnX2FkZGlfZnJlZQC4AR5fX3diZ19nZXRfbXVsYXJnc19pbmRpcmVjdF9saHMAOg9fX3diZ19zY3dxX2ZyZWUAuAEHcnZydF9yYQBOD19fd2JnX3J2cnRfZnJlZQC4AQ9fX3diZ19zd3dxX2ZyZWUAuAEPX193Ymdfam56Yl9mcmVlALgBH19fd2JnX2dldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAOg9fX3diZ193ZGNtX2ZyZWUAuAEPX193Ymdfd2RtbF9mcmVlALgBD19fd2JnX2ptcGZfZnJlZQC4AQ9fX3diZ193ZGFtX2ZyZWUAuAEPX193Ymdfam56aV9mcmVlALgBD19fd2JnX2NhbGxfZnJlZQC4ARNqbmViX25ld190eXBlc2NyaXB0AE0Kd3Fkdl9pbW0wNgAXCndxbWxfaW1tMDYAFwp3ZG1sX2ltbTA2ABcKd3FvcF9pbW0wNgAXCndkb3BfaW1tMDYAFwp3cWNtX2ltbTA2ABcKd2Rkdl9pbW0wNgAXCndkY21faW1tMDYAFwpqbmVmX2ltbTA2ABcHc3JsaV9yYgALB3NybGlfcmEAFgZtY2xfcmIACwZtY2xfcmEAFgZsZGNfcmMADwZsZGNfcmIACwZsZGNfcmEAFgZtb2RfcmMADwZtb2RfcmIACwZtb2RfcmEAFgdzcndxX3JjAA8Hc3J3cV9yYgALB3Nyd3FfcmEAFgZleHBfcmMADwZleHBfcmIACwZleHBfcmEAFgdlZDE5X3JjAA8HZWQxOV9yYgALB2VkMTlfcmEAFgdzcndxX3JkABcHZWNhbF9yYwAPB2VjYWxfcmIACwdlY2FsX3JhABYGc21vX3JkABcGc21vX3JjAA8Gc21vX3JiAAsGc21vX3JhABYKc3JsaV9pbW0xMgAMB2RpdmlfcmIACwdkaXZpX3JhABYHam5lZl9yYwAPB2puZWZfcmIACwdqbmVmX3JhABYHd2RtbV9yZAAXB3dkbW1fcmMADwd3ZG1tX3JiAAsHd2RtbV9yYQAWCmV4cGlfaW1tMTIADAdleHBpX3JiAAsHZXhwaV9yYQAWB21pbnRfcmIACwdtaW50X3JhABYGbm90X3JiAAsGbm90X3JhABYIc3dfaW1tMTIADAVzd19yYgALBXN3X3JhABYIc2JfaW1tMTIADAVzYl9yYgALBXNiX3JhABYHd3FtbV9yZAAXB3dxbW1fcmMADwd3cW1tX3JiAAsHd3FtbV9yYQAWB2Joc2hfcmIACwdiaHNoX3JhABYHbW92aV9yYQAWBm1jcF9yYwAPBm1jcF9yYgALBm1jcF9yYQAWB2VjYWxfcmQAFwZjY3BfcmMADwZjY3BfcmIACwZjY3BfcmEAFgd3ZG1kX3JkABcHd2RtZF9yYwAPB3dkbWRfcmIACwd3ZG1kX3JhABYJZ3RmX2ltbTEyAAwGZ3RmX3JiAAsGZ3RmX3JhABYGdHJvX3JkABcGdHJvX3JjAA8GdHJvX3JiAAsGdHJvX3JhABYKbXVsaV9pbW0xMgAMB211bGlfcmIACwdtdWxpX3JhABYJb3JpX2ltbTEyAAwGb3JpX3JiAAsGb3JpX3JhABYHd2Rkdl9yYwAPB3dkZHZfcmIACwd3ZGR2X3JhABYKbW92aV9pbW0xOAAJB2ptcGJfcmEAFghsYl9pbW0xMgAMBWxiX3JiAAsFbGJfcmEAFgdjcm9vX3JiAAsHY3Jvb19yYQAWB3dxYW1fcmQAFwd3cWFtX3JjAA8Hd3FhbV9yYgALB3dxYW1fcmEAFgdqbmViX3JjAA8Ham5lYl9yYgALB2puZWJfcmEAFgd3ZG9wX3JjAA8Hd2RvcF9yYgALB3dkb3BfcmEAFgdjc2l6X3JiAAsHY3Npel9yYQAWB21yb29fcmMADwdtcm9vX3JiAAsHbXJvb19yYQAWCmpuemZfaW1tMTIADAdqbnpmX3JiAAsHam56Zl9yYQAWCmRpdmlfaW1tMTIADAdhbmRpX3JiAAsHYW5kaV9yYQAWB3RpbWVfcmIACwd0aW1lX3JhABYKbWNsaV9pbW0xOAAJB21jbGlfcmEAFgp4b3JpX2ltbTEyAAwHeG9yaV9yYgALB3hvcmlfcmEAFgdyZXRkX3JiAAsHcmV0ZF9yYQAWB3dxb3BfcmMADwd3cW9wX3JiAAsHd3FvcF9yYQAWB2syNTZfcmMADwdrMjU2X3JiAAsHazI1Nl9yYQAWCnN1YmlfaW1tMTIADAdzdWJpX3JiAAsHc3ViaV9yYQAWBmpuZV9yYwAPBmpuZV9yYgALBmpuZV9yYQAWBnN3d19yYwAPBnN3d19yYgALBnN3d19yYQAWB2xvZ2RfcmQAFwdsb2dkX3JjAA8HbG9nZF9yYgALB2xvZ2RfcmEAFgZtZXFfcmQAFwZtZXFfcmMADwZtZXFfcmIACwZtZXFfcmEAFgdtbGR2X3JkABcHbWxkdl9yYwAPB21sZHZfcmIACwdtbGR2X3JhABYGZGl2X3JjAA8GZGl2X3JiAAsGZGl2X3JhABYHd3FtbF9yYwAPB3dxbWxfcmIACwd3cW1sX3JhABYHbWxvZ19yYwAPB21sb2dfcmIACwdtbG9nX3JhABYFdHJfcmMADwV0cl9yYgALBXRyX3JhABYHd3Fkdl9yYwAPB3dxZHZfcmIACwd3cWR2X3JhABYIbHdfaW1tMTIADAVsd19yYgALBWx3X3JhABYKYW5kaV9pbW0xMgAMBmFuZF9yYgALBmFuZF9yYQAWBm11bF9yYwAPBm11bF9yYgALBm11bF9yYQAWB2J1cm5fcmIACwdidXJuX3JhABYGbG9nX3JkABcGbG9nX3JjAA8GbG9nX3JiAAsGbG9nX3JhABYHczI1Nl9yYwAPB3MyNTZfcmIACwdzMjU2X3JhABYFZXFfcmMADwVlcV9yYgALBWVxX3JhABYKbWNwaV9pbW0xMgAMB21jcGlfcmIACwdtY3BpX3JhABYGc2xsX3JjAA8Gc2xsX3JiAAsGc2xsX3JhABYHbW92ZV9yYgALB21vdmVfcmEAFgVsdF9yYwAPBWx0X3JiAAsFbHRfcmEAFgVndF9yYwAPBWd0X3JiAAsFZ3RfcmEAFgZzdWJfcmMADwZzdWJfcmIACwZzdWJfcmEAFgd3cW1kX3JkABcHd3FtZF9yYwAPB3dxbWRfcmIACwd3cW1kX3JhABYKbW9kaV9pbW0xMgAMB21vZGlfcmIACwdtb2RpX3JhABYHZWNyMV9yYwAPB2VjcjFfcmIACwdlY3IxX3JhABYKc2xsaV9pbW0xMgAMB3NsbGlfcmIACwdzbGxpX3JhABYKam1wYl9pbW0xOAAJBWdtX3JhABYGeG9yX3JjAA8GeG9yX3JiAAsGeG9yX3JhABYGc3JsX3JjAA8Gc3JsX3JiAAsGc3JsX3JhABYGYmFsX3JjAA8GYmFsX3JiAAsGYmFsX3JhABYKam5laV9pbW0xMgAMB2puZWlfcmIACwdqbmVpX3JhABYHZWNrMV9yYwAPB2VjazFfcmIACwdlY2sxX3JhABYFb3JfcmMADwVvcl9yYgALBW9yX3JhABYGc3J3X3JjAA8Gc3J3X3JiAAsGc3J3X3JhABYHd3FjbV9yYwAPB3dxY21fcmIACwd3cWNtX3JhABYGYW5kX3JjAA8HYWRkaV9yYgALB2FkZGlfcmEAFgdzY3dxX3JjAA8Hc2N3cV9yYgALB3Njd3FfcmEAFgdzd3dxX3JkABcHc3d3cV9yYwAPB3N3d3FfcmIACwdzd3dxX3JhABYKam56Yl9pbW0xMgAMB2puemJfcmIACwdqbnpiX3JhABYTX193YmdfbWF0aGFyZ3NfZnJlZQB3B3dkY21fcmMADwd3ZGNtX3JiAAsHd2RjbV9yYQAWB3dkbWxfcmMADwd3ZG1sX3JiAAsHd2RtbF9yYQAWCmptcGZfaW1tMTgACQdqbXBmX3JhABYHd2RhbV9yZAAXB3dkYW1fcmMADwd3ZGFtX3JiAAsHd2RhbV9yYQAWCmpuemlfaW1tMTgACQdqbnppX3JhABYGY2NwX3JkABcHY2FsbF9yYwAPB2NhbGxfcmIACwdjYWxsX3JhABYbX193YmdfcGFuaWNpbnN0cnVjdGlvbl9mcmVlALgBH19fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIAzAETX193YmluZGdlbl9leHBvcnRfMADLAQkRAQBBAQsGAs8B0AHRAe0BygEK1oEB+QGJIwIIfwF+AkACQAJAAkACQAJAAkACQCAAQfUBTwRAIABBzf97Tw0FIABBC2oiAEF4cSEFQfiMwAAoAgAiCEUNBEEAIAVrIQQCf0EAIAVBgAJJDQAaQR8gBUH///8HSw0AGiAFQQYgAEEIdmciAGt2QQFxIABBAXRrQT5qCyIHQQJ0QdyJwABqKAIAIgFFBEBBACEADAILQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAwNAAkAgASgCBEF4cSIGIAVJDQAgBiAFayIGIARPDQAgASECIAYiBA0AQQAhBCABIQAMBAsgAUEUaigCACIGIAAgBiABIANBHXZBBHFqQRBqKAIAIgFHGyAAIAYbIQAgA0EBdCEDIAENAAsMAQtB9IzAACgCACICQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAUEDdCIAQeyKwABqIgMgAEH0isAAaigCACIAKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiABd3E2AgALIAAgAUEDdCIBQQNyNgIEIAAgAWoiASABKAIEQQFyNgIEDAgLIAVB/IzAACgCAE0NAwJAAkAgAUUEQEH4jMAAKAIAIgBFDQYgAGhBAnRB3InAAGooAgAiASgCBEF4cSAFayEEIAEhAgNAAkAgASgCECIADQAgAUEUaigCACIADQAgAigCGCEHAkACQCACIAIoAgwiAEYEQCACQRRBECACQRRqIgAoAgAiAxtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAAgAkEQaiADGyEDA0AgAyEGIAEiAEEUaiIBIABBEGogASgCACIBGyEDIABBFEEQIAEbaigCACIBDQALIAZBADYCAAsgB0UNBCACIAIoAhxBAnRB3InAAGoiASgCAEcEQCAHQRBBFCAHKAIQIAJGG2ogADYCACAARQ0FDAQLIAEgADYCACAADQNB+IzAAEH4jMAAKAIAQX4gAigCHHdxNgIADAQLIAAoAgRBeHEgBWsiASAEIAEgBEkiARshBCAAIAIgARshAiAAIQEMAAsACwJAQQIgAHQiA0EAIANrciABIAB0cWgiAEEDdCIBQeyKwABqIgMgAUH0isAAaigCACIBKAIIIgRHBEAgBCADNgIMIAMgBDYCCAwBC0H0jMAAIAJBfiAAd3E2AgALIAEgBUEDcjYCBCABIAVqIgYgAEEDdCIAIAVrIgRBAXI2AgQgACABaiAENgIAQfyMwAAoAgAiAgRAIAJBeHFB7IrAAGohAEGEjcAAKAIAIQMCf0H0jMAAKAIAIgVBASACQQN2dCICcUUEQEH0jMAAIAIgBXI2AgAgAAwBCyAAKAIICyECIAAgAzYCCCACIAM2AgwgAyAANgIMIAMgAjYCCAtBhI3AACAGNgIAQfyMwAAgBDYCACABQQhqDwsgACAHNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAJBFGooAgAiAUUNACAAQRRqIAE2AgAgASAANgIYCwJAAkAgBEEQTwRAIAIgBUEDcjYCBCACIAVqIgUgBEEBcjYCBCAEIAVqIAQ2AgBB/IzAACgCACIDRQ0BIANBeHFB7IrAAGohAEGEjcAAKAIAIQECf0H0jMAAKAIAIgZBASADQQN2dCIDcUUEQEH0jMAAIAMgBnI2AgAgAAwBCyAAKAIICyEDIAAgATYCCCADIAE2AgwgASAANgIMIAEgAzYCCAwBCyACIAQgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBC0GEjcAAIAU2AgBB/IzAACAENgIACyACQQhqDwsgACACckUEQEEAIQJBAiAHdCIAQQAgAGtyIAhxIgBFDQMgAGhBAnRB3InAAGooAgAhAAsgAEUNAQsDQCAAIAIgACgCBEF4cSIDIAVrIgYgBEkiBxshCCAAKAIQIgFFBEAgAEEUaigCACEBCyACIAggAyAFSSIAGyECIAQgBiAEIAcbIAAbIQQgASIADQALCyACRQ0AIAVB/IzAACgCACIATSAEIAAgBWtPcQ0AIAIoAhghBwJAAkAgAiACKAIMIgBGBEAgAkEUQRAgAkEUaiIAKAIAIgMbaigCACIBDQFBACEADAILIAIoAggiASAANgIMIAAgATYCCAwBCyAAIAJBEGogAxshAwNAIAMhBiABIgBBFGoiASAAQRBqIAEoAgAiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQMgAiACKAIcQQJ0QdyJwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBAwDCyABIAA2AgAgAA0CQfiMwABB+IzAACgCAEF+IAIoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUH8jMAAKAIAIgFLBEAgBUGAjcAAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYyNwABBACAAQYCAfHEgAxsiBEGMjcAAKAIAaiIANgIAQZCNwABBkI3AACgCACIBIAAgACABSRs2AgACQAJAQYiNwAAoAgAiAwRAQdyKwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQZiNwAAoAgAiAEEAIAAgAk0bRQRAQZiNwAAgAjYCAAtBnI3AAEH/HzYCAEHgisAAIAQ2AgBB3IrAACACNgIAQfiKwABB7IrAADYCAEGAi8AAQfSKwAA2AgBB9IrAAEHsisAANgIAQYiLwABB/IrAADYCAEH8isAAQfSKwAA2AgBBkIvAAEGEi8AANgIAQYSLwABB/IrAADYCAEGYi8AAQYyLwAA2AgBBjIvAAEGEi8AANgIAQaCLwABBlIvAADYCAEGUi8AAQYyLwAA2AgBBqIvAAEGci8AANgIAQZyLwABBlIvAADYCAEGwi8AAQaSLwAA2AgBBpIvAAEGci8AANgIAQeiKwABBADYCAEG4i8AAQayLwAA2AgBBrIvAAEGki8AANgIAQbSLwABBrIvAADYCAEHAi8AAQbSLwAA2AgBBvIvAAEG0i8AANgIAQciLwABBvIvAADYCAEHEi8AAQbyLwAA2AgBB0IvAAEHEi8AANgIAQcyLwABBxIvAADYCAEHYi8AAQcyLwAA2AgBB1IvAAEHMi8AANgIAQeCLwABB1IvAADYCAEHci8AAQdSLwAA2AgBB6IvAAEHci8AANgIAQeSLwABB3IvAADYCAEHwi8AAQeSLwAA2AgBB7IvAAEHki8AANgIAQfiLwABB7IvAADYCAEGAjMAAQfSLwAA2AgBB9IvAAEHsi8AANgIAQYiMwABB/IvAADYCAEH8i8AAQfSLwAA2AgBBkIzAAEGEjMAANgIAQYSMwABB/IvAADYCAEGYjMAAQYyMwAA2AgBBjIzAAEGEjMAANgIAQaCMwABBlIzAADYCAEGUjMAAQYyMwAA2AgBBqIzAAEGcjMAANgIAQZyMwABBlIzAADYCAEGwjMAAQaSMwAA2AgBBpIzAAEGcjMAANgIAQbiMwABBrIzAADYCAEGsjMAAQaSMwAA2AgBBwIzAAEG0jMAANgIAQbSMwABBrIzAADYCAEHIjMAAQbyMwAA2AgBBvIzAAEG0jMAANgIAQdCMwABBxIzAADYCAEHEjMAAQbyMwAA2AgBB2IzAAEHMjMAANgIAQcyMwABBxIzAADYCAEHgjMAAQdSMwAA2AgBB1IzAAEHMjMAANgIAQeiMwABB3IzAADYCAEHcjMAAQdSMwAA2AgBB8IzAAEHkjMAANgIAQeSMwABB3IzAADYCAEGIjcAAIAI2AgBB7IzAAEHkjMAANgIAQYCNwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBlI3AAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GYjcAAQZiNwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHcisAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HcisAAIQADQAJAIAMgACgCACIBTwRAIAEgACgCBGoiBiADSw0BCyAAKAIIIQAMAQsLQYiNwAAgAjYCAEGAjcAAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQZSNwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB3IrAACkCACEJIAFBEGpB5IrAACkCADcCACABIAk3AghB4IrAACAENgIAQdyKwAAgAjYCAEHkisAAIAFBCGo2AgBB6IrAAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQCAwICyAAQXhxQeyKwABqIQECf0H0jMAAKAIAIgJBASAAQQN2dCIAcUUEQEH0jMAAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQYiNwAAoAgBGDQMgAUGEjcAAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAcgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAIDAYLIAVBeHFB7IrAAGohAAJ/QfSMwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQfSMwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQYCNwAAgACAFayIBNgIAQYiNwABBiI3AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtBhI3AACgCACEAAkAgASAFayICQQ9NBEBBhI3AAEEANgIAQfyMwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB/IzAACACNgIAQYSNwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRBiI3AAEGIjcAAKAIAIgBBD2pBeHEiAUEIayICNgIAQYCNwABBgI3AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGUjcAAQYCAgAE2AgAMAwtBiI3AACADNgIAQYCNwABBgI3AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0GEjcAAIAM2AgBB/IzAAEH8jMAAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEGAjcAAKAIAIgAgBU0NAEGAjcAAIAAgBWsiATYCAEGIjcAAQYiNwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACQRRqKAIAIgFFDQAgAEEUaiABNgIAIAEgADYCGAsCQCAEQRBPBEAgAiAFQQNyNgIEIAIgBWoiASAEQQFyNgIEIAEgBGogBDYCACAEQYACTwRAIAEgBBAIDAILIARBeHFB7IrAAGohAAJ/QfSMwAAoAgAiA0EBIARBA3Z0IgRxRQRAQfSMwAAgAyAEcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIDAELIAIgBCAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqDwsgAEEIagvtCwELfyAAKAIEIQcgACgCACEFAkACQAJAIAEoAgAiCiABKAIIIgByBEACQCAARQ0AIAUgB2ohCSABQQxqKAIAQQFqIQYgBSECA0ACQCACIQAgBkEBayIGRQ0AIAAgCUYNAgJ/IAAsAAAiBEEATgRAIARB/wFxIQQgAEEBagwBCyAALQABQT9xIQggBEEfcSECIARBX00EQCACQQZ0IAhyIQQgAEECagwBCyAALQACQT9xIAhBBnRyIQggBEFwSQRAIAggAkEMdHIhBCAAQQNqDAELIAJBEnRBgIDwAHEgAC0AA0E/cSAIQQZ0cnIiBEGAgMQARg0DIABBBGoLIgIgAyAAa2ohAyAEQYCAxABHDQEMAgsLIAAgCUYNACAALAAAIgJBAE4gAkFgSXIgAkFwSXJFBEAgAkH/AXFBEnRBgIDwAHEgAC0AA0E/cSAALQACQT9xQQZ0IAAtAAFBP3FBDHRycnJBgIDEAEYNAQsCQAJAIANFDQAgAyAHTwRAQQAhACADIAdGDQEMAgtBACEAIAMgBWosAABBQEgNAQsgBSEACyADIAcgABshByAAIAUgABshBQsgCkUNAyABKAIEIQsgB0EQTwRAIAcgBSAFQQNqQXxxIgRrIgZqIgpBA3EhCEEAIQlBACEAIAQgBUcEQCAEIAVBf3NqQQNPBEBBACEDA0AgACADIAVqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIANBBGoiAw0ACwsgBSECA0AgACACLAAAQb9/SmohACACQQFqIQIgBkEBaiIGDQALCwJAIAhFDQAgBCAKQXxxaiICLAAAQb9/SiEJIAhBAUYNACAJIAIsAAFBv39KaiEJIAhBAkYNACAJIAIsAAJBv39KaiEJCyAKQQJ2IQggACAJaiEDA0AgBCEGIAhFDQRBwAEgCCAIQcABTxsiCUEDcSEKIAlBAnQhBEEAIQIgCUEETwRAIAYgBEHwB3FqIQwgBiEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIABBBGooAgAiAkF/c0EHdiACQQZ2ckGBgoQIcWogAEEIaigCACICQX9zQQd2IAJBBnZyQYGChAhxaiAAQQxqKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAIIAlrIQggBCAGaiEEIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAYgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgB0UEQEEAIQMMAwsgB0EDcSECAkAgB0EESQRAQQAhA0EAIQYMAQtBACEDIAUhACAHQXxxIgYhBANAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIARBBGsiBA0ACwsgAkUNAiAFIAZqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEDQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAMhAEEAIQMMAQsgA0EBdiEAIANBAWpBAXYhAwsgAEEBaiEAIAFBGGooAgAhAiABKAIQIQYgASgCFCEBA0AgAEEBayIARQ0CIAEgBiACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBSAHIAIoAgwRAAAEf0EBBUEAIQACfwNAIAMgACADRg0BGiAAQQFqIQAgASAGIAIoAhARAwBFDQALIABBAWsLIANJCw8LIAEoAhQgBSAHIAFBGGooAgAoAgwRAAALpgYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QciGwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEHIhsAAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEHIhsAAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRByIbAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMGo6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBHXRBH3VB6IjAAHEhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEEcNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBHDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQRw0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgAUEYaigCACEGIAEoAhAhBCABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBHDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC/wFAQV/IABBCGsiASAAQQRrKAIAIgNBeHEiAGohAgJAAkACQAJAIANBAXENACADQQNxRQ0BIAEoAgAiAyAAaiEAIAEgA2siAUGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAA2AgAgAiACKAIEQX5xNgIEIAEgAEEBcjYCBCACIAA2AgAPCyABIAMQBwsCQAJAIAIoAgQiA0ECcUUEQCACQYiNwAAoAgBGDQIgAkGEjcAAKAIARg0FIAIgA0F4cSICEAcgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFBhI3AACgCAEcNAUH8jMAAIAA2AgAPCyACIANBfnE2AgQgASAAQQFyNgIEIAAgAWogADYCAAsgAEGAAkkNAiABIAAQCEEAIQFBnI3AAEGcjcAAKAIAQQFrIgA2AgAgAA0BQeSKwAAoAgAiAARAA0AgAUEBaiEBIAAoAggiAA0ACwtBnI3AAEH/HyABIAFB/x9NGzYCAA8LQYiNwAAgATYCAEGAjcAAQYCNwAAoAgAgAGoiADYCACABIABBAXI2AgRBhI3AACgCACABRgRAQfyMwABBADYCAEGEjcAAQQA2AgALIABBlI3AACgCACIDTQ0AQYiNwAAoAgAiAkUNAEEAIQECQEGAjcAAKAIAIgRBKUkNAEHcisAAIQADQCACIAAoAgAiBU8EQCAFIAAoAgRqIAJLDQILIAAoAggiAA0ACwtB5IrAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GcjcAAQf8fIAEgAUH/H00bNgIAIAMgBE8NAEGUjcAAQX82AgALDwsgAEF4cUHsisAAaiECAn9B9IzAACgCACIDQQEgAEEDdnQiAHFFBEBB9IzAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0GEjcAAIAE2AgBB/IzAAEH8jMAAKAIAIABqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAuBBQEBfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQYAEaw4mAQIDBAUGBwgsCQoLDA0sLCwsLCwsLCwsLCwsLCwsLCwODywsLBAAC0EBIQECQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEEBaw4OQgECAwQFBgcICQoLDA0ACwJAIABBwARrDgwoKSorLC0uLzAxMjMACwJAIABBgQJrDgoODxAREhMUFRYXAAsCQCAAQYAGaw4JNDU2NzhDQzk6AAsCQCAAQYAKaw4FPT4/QEEACyAAQYAIaw4COjtCC0ECDwtBAw8LQQQPC0EFDwtBBg8LQQcPC0EIDwtBCQ8LQQoPC0ELDwtBDA8LQQ0PC0EODwtBgQIPC0GCAg8LQYMCDwtBhAIPC0GFAg8LQYYCDwtBhwIPC0GIAg8LQYkCDwtBigIPC0GABA8LQYEEDwtBggQPC0GDBA8LQYQEDwtBhQQPC0GGBA8LQYcEDwtBiQQPC0GKBA8LQYsEDwtBjAQPC0GNBA8LQaAEDwtBoQQPC0GlBA8LQcAEDwtBwQQPC0HCBA8LQcMEDwtBxAQPC0HFBA8LQcYEDwtBxwQPC0HIBA8LQckEDwtBygQPC0HLBA8LQYAGDwtBgQYPC0GCBg8LQYMGDwtBhAYPC0GHBg8LQYgGDwtBgAgPC0GBCA8LQYAKDwtBgQoPC0GCCg8LQYMKDwtBhAohAQsgAQ8LQeCCwABBGRDSAQAL+AMBAn8gACABaiECAkACQCAAKAIEIgNBAXENACADQQNxRQ0BIAAoAgAiAyABaiEBIAAgA2siAEGEjcAAKAIARgRAIAIoAgRBA3FBA0cNAUH8jMAAIAE2AgAgAiACKAIEQX5xNgIEIAAgAUEBcjYCBCACIAE2AgAPCyAAIAMQBwsCQAJAAkAgAigCBCIDQQJxRQRAIAJBiI3AACgCAEYNAiACQYSNwAAoAgBGDQMgAiADQXhxIgIQByAAIAEgAmoiAUEBcjYCBCAAIAFqIAE2AgAgAEGEjcAAKAIARw0BQfyMwAAgATYCAA8LIAIgA0F+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQYACTwRAIAAgARAIDAMLIAFBeHFB7IrAAGohAgJ/QfSMwAAoAgAiA0EBIAFBA3Z0IgFxRQRAQfSMwAAgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBiI3AACAANgIAQYCNwABBgI3AACgCACABaiIBNgIAIAAgAUEBcjYCBCAAQYSNwAAoAgBHDQFB/IzAAEEANgIAQYSNwABBADYCAA8LQYSNwAAgADYCAEH8jMAAQfyMwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgACABaiABNgIACwv7AgEEfyAAKAIMIQICQAJAIAFBgAJPBEAgACgCGCEDAkACQCAAIAJGBEAgAEEUQRAgAEEUaiICKAIAIgQbaigCACIBDQFBACECDAILIAAoAggiASACNgIMIAIgATYCCAwBCyACIABBEGogBBshBANAIAQhBSABIgJBFGoiASACQRBqIAEoAgAiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdyJwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQfiMwABB+IzAACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB9IzAAEH0jMAAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIABBFGooAgAiAEUNACACQRRqIAA2AgAgACACNgIYCwusAgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdyJwABqIQQCQEH4jMAAKAIAIgVBASACdCIDcUUEQEH4jMAAIAMgBXI2AgAgBCAANgIAIAAgBDYCGAwBCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEEA0AgAyAEQR12QQRxakEQaiIFKAIAIgJFDQIgBEEBdCEEIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAFIAA2AgAgACADNgIYCyAAIAA2AgwgACAANgIIC2kBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYD+A3EgAEEYdnJyELwBIAFBEGokAAt5AQN/IAEQxAECQCABKAIAIgJBf0cEQCABIAJBAWo2AgAgASgCBCgAACIDQRh0QRZ1QfyCwABqKAIAIQRBAUEEEMcBIgJFDQEgAiAEIANBgH5xcjYAACABIAEoAgBBAWs2AgAgAEEENgIEIAAgAjYCAA8LEM4BAAsAC2YBA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQYAGcUEIdCAAQQh2QYDgA3FyQQx2ELsBIAFBEGokAAtuAQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggiAC8AACAAQQJqLQAAQRB0chDVASEAIAEoAgwiAiACKAIAQQFrNgIAQQhBBBC6ASICIABBCHZBgB5xIABBGHZyOwEEIAJBADYCACABQRBqJAAgAgttAQF/IwBBMGsiASQAIAEgADoADyAAQf8BcUHAAE8EQCABQRxqQgE3AgAgAUECNgIUIAFB9IDAADYCECABQQI2AiwgASABQShqNgIYIAEgAUEPajYCKCABQRBqQYSBwAAQSQALIAFBMGokACAAC24BAX8jAEEwayIBJAAgASAAOwEOIABB//8DcUGAIE8EQCABQRxqQgE3AgAgAUECNgIUIAFBuIHAADYCECABQQM2AiwgASABQShqNgIYIAEgAUEOajYCKCABQRBqQciBwAAQSQALIAFBMGokACAAC10BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDVASIAQR52IABBDnZBPHFyELsBIAFBEGokAAsVACAAQYyCwABB/IHAAEGAgBAQ8gELFgAgAEHQgsAAQcCCwABBgICACBDyAQtMACADQf8BcSABQf8BcUEMdCAAQf8BcUESdHIiACACQf8BcUEGdHJyIgFBEHRBgID8B3EgAEEIdkGA/gNxIAFBgP4DcUEIdHJBCHZyC1UCAX8BfiMAQRBrIgIkACABEMQBIAJBCGogARBUIAIoAgxBADYCACABKQIAIQMgARAEIAAgA0IoiKdBAXE6AAEgACADQiCIp0EBcToAACACQRBqJAALEAAgACABIAIgA0HiABD0AQsQACAAIAEgAiADQeMAEPQBC08BA38jAEEQayIBJAAgAUEIaiAAEEogASgCCCIAQQJqLQAAIQIgAC8AACABKAIMIgMgAygCAEEBazYCACACQRB0chDIARC7ASABQRBqJAALVQEDfyMAQRBrIgEkACABQQhqIAAQSiABKAIIIgBBAmotAAAhAiAALwAAIAEoAgwiAyADKAIAQQFrNgIAIAJBEHRyENUBQRh2QT9xELsBIAFBEGokAAtSAQF/IAAQUSECIAEQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgACACQf8BcUESdHIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyrUIghjcCACABCxAAIAAgASACIANB3gAQ9QELEAAgACABIAIgA0HfABD1AQsQACAAIAEgAiADQeAAEPUBCxAAIAAgASACIANB4QAQ9QELUQIBfwF+IwBBEGsiAiQAIAEQxAEgAkEIaiABEFQgAigCDEEANgIAIAEpAgAhAyABEAQgACADQiiIPAABIAAgA0IgiKdBAXE6AAAgAkEQaiQACz4BAX8jAEEQayIEJAAgABBRIAEQUSACEFEgBEEIaiADEBMgBC0ACEEBcSAELQAJQQFxEHoQrAEgBEEQaiQAC0kBAX8gABBRIQAgARBRIQFBCEEEELoBIgIgAUH/AXFBDHQgAEESdHIiAEGA4ANxQQh0IABBCHZBgP4DcXJBCHatQiCGNwIAIAILDAAgACABQcsAEPYBCwwAIAAgAUHMABD2AQsMACAAIAFBzQAQ9gELDAAgACABQc4AEPYBCwwAIAAgAUHPABD2AQsMACAAIAFB0AAQ9gELPAEBfyMAQRBrIgQkACAAEFEgARBRIAIQUSAEQQhqIAMQHSAELQAIQQFxIAQtAAkQvgEQrAEgBEEQaiQAC0gAIAAQxAEgACgCAEF/RgRAEM4BAAsgAC8ABCAAQQZqLQAAQRB0chDVASIAQYD+A3FBCHQgAEEIdkGA/gNxIABBGHZychC8AQsLACAAIAFBBxD3AQs/AQJ/AkAgABBRIgBBGHENACAAQQdxIgJBB0YNAEEIQQQQugEiASAAQQV2QQFxrUIghiACrUIohoQ3AgALIAELCwAgACABQQgQ9wELPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCwsAIAAgAUEKEPgBCwsAIAAgAUEMEPgBCwsAIAAgAUEUEPgBCwsAIAAgAUEWEPgBCwsAIAAgAUEZEPgBCwsAIAAgAUEbEPgBCwsAIAAgAUEeEPgBCwsAIAAgAUEfEPgBCwsAIAAgAUEkEPgBCwsAIAAgAUEyEPgBCz8AIAAQUSEAIAEQUyIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chCsAQtAAQF/IAAQUyEAQQhBBBC6ASIBIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCACABCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDEASABQQhqIAAQSyABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEEsgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALOQEBfyMAQRBrIgIkACAAEMQBIAJBCGogABBUIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDEASACQQhqIAAQVCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAs4AQJ/IwBBEGsiASQAIAAQxAEgAUEIaiAAEFQgASgCDEEANgIAIAAtAAQgABAEIAFBEGokAEEBcQs3AQJ/IwBBEGsiASQAIAFBCGogABBKIAEoAggtAAQgASgCDCICIAIoAgBBAWs2AgAgAUEQaiQACzcBAn8jAEEQayIBJAAgAUEIaiAAEEogASgCCCgCACABKAIMIgIgAigCAEEBazYCACABQRBqJAALCgAgAEHVABD5AQsKACAAQdYAEPkBCwoAIABB1wAQ+QELCgAgAEHaABD5AQsKACAAQdsAEPkBCwoAIABB3AAQ+QELCgAgAEHdABD5AQs5AAJAAn8gAkGAgMQARwRAQQEgACACIAEoAhARAwANARoLIAMNAUEACw8LIAAgA0EAIAEoAgwRAAALMQEBfyMAQRBrIgEkACABQQhqIAAQHSABLQAJIAEtAAhBBXRBIHFyELsBIAFBEGokAAuhAgEBfyMAQSBrIgIkACACQQE7ARwgAiABNgIYIAIgADYCFCACQbiGwAA2AhAgAkHoiMAANgIMIAJBDGoiACgCCCIBRQRAIwBBIGsiACQAIABBDGpCADcCACAAQQE2AgQgAEHoiMAANgIIIABBKzYCHCAAQZCIwAA2AhggACAAQRhqNgIAIABB2IjAABBJAAsgAUEMaigCACECAkACQCABKAIEDgIAAAELIAINAAsgAC0AECEBIAAtABEaQdiJwABB2InAACgCACIAQQFqNgIAAkAgAEEASA0AQaSNwAAtAABBAXENAEGkjcAAQQE6AABBoI3AAEGgjcAAKAIAQQFqNgIAQdSJwAAoAgBBAEgNAEGkjcAAQQA6AAAgAUUNAAALAAs1AQF/IAEQxAEgASgCACICQX9GBEAQzgEACyABIAJBAWo2AgAgACABNgIEIAAgAUEEajYCAAsxAQF/IAEoAgAiAkF/RwRAIAEgAkEBajYCACAAIAE2AgQgACABQQRqNgIADwsQzgEACzUBAX8gAEE2TwRAQeCCwABBGRDSAQALQQxBBBC6ASICIAA6AAggAiABNgIEIAJBADYCACACCzAAIAAQUSABEFEgAhBRIAMQURASIQBBCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQstACAAEMQBIAAoAgBBf0YEQBDOAQALIAAvAAQgAEEGai0AAEEQdHIQyAEQuwELLAAgABBRIAEQUSACEFEQKyEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELLAAgABBRIAEQUSACEFIQOCEAQQhBBBC6ASIBIACtQv///weDQiCGNwIAIAELJQEBfwJAIAAEQCAAKAIADQEgAC0ABCAAEAQPCxDNAQALEM4BAAslAQF/AkAgAARAIAAoAgANASAALwEEIAAQBA8LEM0BAAsQzgEACyUBAX8CQCAABEAgACgCAA0BIAAoAgQgABAEDwsQzQEACxDOAQALKAAgASgCAEUEQCABQX82AgAgACABNgIEIAAgAUEEajYCAA8LEM4BAAspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeQAchDFARC8AQspACADED0hAyAAEL0BIAEQvQEgAhC9ASADEMIBQQh0QeUAchDFARC8AQslAQF/IAAQUSEAQQhBBBC6ASIBIABBAnRB/AFxrUIghjcCACABCyAAIABBAWsiAEEFTQRAIABBAWoPC0HggsAAQRkQ0gEACyABAX8gABDEASAAKAIABEAQzgEACyAAKAIEIAAQBBAECyMAIAIQBSECIAAQvQEgARC9ASACEDhBCHRBygByEMUBELwBCx4AAkAgAARAIAAoAgANASAAEAQPCxDNAQALEM4BAAsPACAAIAEgAiADQRIQ7gELDwAgACABIAIgA0EYEO4BCw8AIAAgASACIANBHBDuAQsPACAAIAEgAiADQR0Q7gELDwAgACABIAIgA0EiEO4BCw8AIAAgASACIANBIxDuAQsPACAAIAEgAiADQSgQ7gELDwAgACABIAIgA0EqEO4BCw8AIAAgASACIANBLBDuAQsPACAAIAEgAiADQTgQ7gELEAAgACABIAIgA0HTABDvAQsQACAAIAEgAiADQdQAEO8BCxAAIAAgASACIANB3gAQ7wELEAAgACABIAIgA0HfABDvAQsQACAAIAEgAiADQeAAEO8BCxAAIAAgASACIANB4QAQ7wELEAAgACABIAIgA0HiABDvAQsQACAAIAEgAiADQeMAEO8BCxAAIAAgASACIANB5AAQ7wELEAAgACABIAIgA0HlABDvAQsQACAAIAEgAiADQeYAEO4BCxAAIAAgASACIANB5wAQ7gELEAAgACABIAIgA0HoABDuAQsQACAAIAEgAiADQekAEO4BCxAAIAAgASACIANB6gAQ7gELEAAgACABIAIgA0HrABDuAQsQACAAIAEgAiADQewAEO4BCx0BAX8jAEEQayIBJAAgAUEIaiAAEB0gAUEQaiQACx0BAX8jAEEQayIBJAAgAUEIaiAAEBMgAUEQaiQACx8AIAEQWCEBIAAQvQEgARC3AUEIdEHMAHIQxQEQvAELGQAgACABIAJBIEEAIAQbQRBBACADG3IQEgsNACAAIAEgAkEBEPABCw0AIAAgASACQQIQ8AELDQAgACABIAJBAxDwAQsNACAAIAEgAkEEEPABCw0AIAAgASACQQUQ8AELDQAgACABIAJBBhDwAQsNACAAIAEgAkEHEPABCw0AIAAgASACQQgQ8AELDQAgACABIAJBCRDwAQsNACAAIAEgAkELEPABCw0AIAAgASACQQ0Q8AELDQAgACABIAJBDhDwAQsNACAAIAEgAkEPEPABCw0AIAAgASACQRAQ8AELDQAgACABIAJBERDwAQsNACAAIAEgAkEXEPABCw0AIAAgASACQSEQ8AELDQAgACABIAJBJhDwAQsNACAAIAEgAkEnEPABCw0AIAAgASACQSkQ8AELDQAgACABIAJBKxDwAQsNACAAIAEgAkEtEPABCw0AIAAgASACQS4Q8AELDQAgACABIAJBLxDwAQsNACAAIAEgAkEwEPABCw0AIAAgASACQTEQ8AELDQAgACABIAJBNRDwAQsNACAAIAEgAkE3EPABCw0AIAAgASACQTkQ8QELDQAgACABIAJBOhDxAQsNACAAIAEgAkE7EPEBCw0AIAAgASACQTwQ8QELDQAgACABIAJBPRDxAQsNACAAIAEgAkE+EPEBCw0AIAAgASACQT8Q8QELDgAgACABIAJBwAAQ8QELDgAgACABIAJBwQAQ8QELDgAgACABIAJBwgAQ8QELDgAgACABIAJBwwAQ8QELDgAgACABIAJBxAAQ8QELDgAgACABIAJBxQAQ8QELDgAgACABIAJBxgAQ8QELDgAgACABIAJBxwAQ8QELDgAgACABIAJByAAQ8QELDgAgACABIAJByQAQ8QELDgAgACABIAJBygAQ8QELDgAgACABIAJB0QAQ8QELDgAgACABIAJB0gAQ8QELGAEBfyAAQf8BcUE/TQR/IAAQuwEFQQALCx4BAX9BCEEEELoBIgEgAK1C////B4NCIIY3AgAgAQsbACAAEMQBIAAoAgBBf0YEQBDOAQALIAAtAAQLCQAgAEETEPMBCwkAIABBFRDzAQsJACAAQRoQ8wELCQAgAEEgEPMBCwkAIABBJRDzAQsJACAAQTQQ8wELCQAgAEE2EPMBCwoAIABB2AAQ8wELCgAgAEHZABDzAQsXACABQRB0QYCA/AdxIABBAnRB/AFxcgsXACAAEMQBIAAoAgAEQBDOAQALIAAQBAscACAAEL0BIAEQvQEgAhC9ARArQQh0EMUBELwBCxIAIAEgABDHASIABEAgAA8LAAsbAQF/QQhBBBC6ASIBIAA6AAQgAUEANgIAIAELGwEBf0EIQQQQugEiASAANgIEIAFBADYCACABC24AIABB/wFxQcAATwRAIwBBMGsiACQAIABBIjYCDCAAQYCAwAA2AgggAEEcakIBNwIAIABBATYCFCAAQbCGwAA2AhAgAEEBNgIsIAAgAEEoajYCGCAAIABBCGo2AiggAEEQakG4gMAAEEkACyAACxQAIAAgASACQSBBACADGyAEchASCxgAIAAQUSABEFEgAhBRIAMQPRDCARCsAQsXACAAEFEgARBRIAIQUSADEFEQEhCsAQsTACAAEFEgARBRIAIQBRA4EKwBCxEAIAAgASACQSBBACADGxASCxMAIAAQUSABEFEgAhBSEDgQrAELDAAgAARADwsQzQEACxQBAX9BBEEBELoBIgEgADYAACABCxQBAX9BCEEEELoBIgBCADcCACAAC4EDAQV/QaWNwAAtAAAaAn8gAEEJTwRAAkBBzf97QRAgACAAQRBNGyIAayABTQ0AIABBECABQQtqQXhxIAFBC0kbIgRqQQxqEAEiAkUNACACQQhrIQECQCAAQQFrIgMgAnFFBEAgASEADAELIAJBBGsiBSgCACIGQXhxIAIgA2pBACAAa3FBCGsiAiAAQQAgAiABa0EQTRtqIgAgAWsiAmshAyAGQQNxBEAgACADIAAoAgRBAXFyQQJyNgIEIAAgA2oiAyADKAIEQQFyNgIEIAUgAiAFKAIAQQFxckECcjYCACABIAJqIgMgAygCBEEBcjYCBCABIAIQBgwBCyABKAIAIQEgACADNgIEIAAgASACajYCAAsCQCAAKAIEIgFBA3FFDQAgAUF4cSICIARBEGpNDQAgACAEIAFBAXFyQQJyNgIEIAAgBGoiASACIARrIgRBA3I2AgQgACACaiICIAIoAgRBAXI2AgQgASAEEAYLIABBCGohAwsgAwwBCyABEAELCw0AIAAQ1QFBCnZBP3ELEAAgABBRIAEQWBC3ARCsAQsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsLACABBEAgABAECwsLACAAIwBqJAAjAAsNAEHoiMAAQRsQ0gEACw4AQYOJwABBzwAQ0gEACwsAIAAxAAAgARADCwsAIAAzAQAgARADCwsAIAA1AgAgARADCwkAIAAgARAAAAsKACAAQT9xELsBCwoAIAAQUUH/AXELBwAgAEEIdAsHACAAED0aCwcAIAAQURoLBwAgABBSGgsHACAAEFMaCwoAQTMQxQEQvAELBwBBCxC7AQsHAEEKELsBCwcAQQgQuwELBwBBDxC7AQsHAEEGELsBCwcAQQkQuwELBwBBBxC7AQsHAEEMELsBCwcAQQIQuwELBwBBARC7AQsHAEEDELsBCwcAQQ0QuwELBwBBDhC7AQsHAEEFELsBCwcAQQQQuwELBwBBEBC7AQsHAEEAELsBCwQAQQQLAgALJAAgABC9ASABEL0BIAIQvQEgAxC9ARASQQh0IARyEMUBELwBCyMAIAAQvQEgARC9ASACEL0BIAMQDRASQQh0IARyEMUBELwBCx8AIAAQvQEgARC9ASACEL0BECtBCHQgA3IQxQEQvAELHgAgABC9ASABEL0BIAIQDhA4QQh0IANyEMUBELwBC2IBAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQRxqQgE3AgAgBEECNgIUIAQgAjYCECAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQSQALIARBMGokACAACxsAIAAQvQEaIABBCnRBgPgDcSABchDFARC8AQtSAQJ/IwBBEGsiBSQAIAVBCGogAxATIAUtAAkhAyAFLQAIIQYgABC9ASABEL0BIAIQvQEgBkEBcSADQQFxEHpBCHQgBHIQxQEQvAEgBUEQaiQAC1ABAn8jAEEQayIFJAAgBUEIaiADEB0gBS0ACCEDIAUtAAkhBiAAEL0BIAEQvQEgAhC9ASADQQFxIAYQvgFBCHQgBHIQxQEQvAEgBUEQaiQAC0oAIAAQvQEaIAEQECIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMUBELwBC0kBAX8jAEEQayIDJAAgABDEASABIAJPBEBB4ILAAEEZENIBAAsgA0EIaiAAEFQgAygCDCADKAIIIAE6AAFBADYCACADQRBqJAALQgAgABC9ARogARC9ARogAEESdEGAgPAHcSABQQx0QYDgP3FyIgBBCHZBgP4DcSAAQYDgA3FBCHRyIAJyEMUBELwBCzYAIAAQESIAQRB0QYCA/AdxIABBCHZBgP4DcSAAQYD+A3FBCHRyQQh2ckEIdCABchDFARC8AQsL3AkBAEGAgMAAC9IJQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAGgAAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACjAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAAKgDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAArQMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAACyAwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWQAAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAaAQQAAAAAAAFAAAAAAAAAAEAAAAGAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTljYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5ycwA7BBAAHAAAAIQCAAAeAAAAbnVsbCBwb2ludGVyIHBhc3NlZCB0byBydXN0cmVjdXJzaXZlIHVzZSBvZiBhbiBvYmplY3QgZGV0ZWN0ZWQgd2hpY2ggd291bGQgbGVhZCB0byB1bnNhZmUgYWxpYXNpbmcgaW4gcnVzdAA7CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AgZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbgYwLjIuOTI=", e);
}
async function ea() {
  return await c0(Pp());
}
ea();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const gt = BigInt(0), ke = BigInt(1), Tn = BigInt(2), Up = BigInt(3), ro = BigInt(4), Bc = BigInt(5), xc = BigInt(8);
BigInt(9);
BigInt(16);
function Et(e, t) {
  const n = e % t;
  return n >= gt ? n : t + n;
}
function Gp(e, t, n) {
  if (n <= gt || t < gt)
    throw new Error("Expected power/modulo > 0");
  if (n === ke)
    return gt;
  let r = ke;
  for (; t > gt; )
    t & ke && (r = r * e % n), e = e * e % n, t >>= ke;
  return r;
}
function St(e, t, n) {
  let r = e;
  for (; t-- > gt; )
    r *= r, r %= n;
  return r;
}
function so(e, t) {
  if (e === gt || t <= gt)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
  let n = Et(e, t), r = t, s = gt, i = ke;
  for (; n !== gt; ) {
    const c = r / n, A = r % n, f = s - i * c;
    r = n, n = A, s = i, i = f;
  }
  if (r !== ke)
    throw new Error("invert: does not exist");
  return Et(s, t);
}
function Vp(e) {
  const t = (e - ke) / Tn;
  let n, r, s;
  for (n = e - ke, r = 0; n % Tn === gt; n /= Tn, r++)
    ;
  for (s = Tn; s < e && Gp(s, t, e) !== e - ke; s++)
    ;
  if (r === 1) {
    const o = (e + ke) / ro;
    return function(A, f) {
      const I = A.pow(f, o);
      if (!A.eql(A.sqr(I), f))
        throw new Error("Cannot find square root");
      return I;
    };
  }
  const i = (n + ke) / Tn;
  return function(c, A) {
    if (c.pow(A, t) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let f = r, I = c.pow(c.mul(c.ONE, s), n), w = c.pow(A, i), C = c.pow(A, n);
    for (; !c.eql(C, c.ONE); ) {
      if (c.eql(C, c.ZERO))
        return c.ZERO;
      let v = 1;
      for (let B = c.sqr(C); v < f && !c.eql(B, c.ONE); v++)
        B = c.sqr(B);
      const R = c.pow(I, ke << BigInt(f - v - 1));
      I = c.sqr(R), w = c.mul(w, R), C = c.mul(C, I), f = v;
    }
    return w;
  };
}
function Hp(e) {
  if (e % ro === Up) {
    const t = (e + ke) / ro;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (e % xc === Bc) {
    const t = (e - Bc) / xc;
    return function(r, s) {
      const i = r.mul(s, Tn), o = r.pow(i, t), c = r.mul(s, o), A = r.mul(r.mul(c, Tn), o), f = r.mul(c, r.sub(A, r.ONE));
      if (!r.eql(r.sqr(f), s))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  return Vp(e);
}
const Xp = [
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
function Yp(e) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, n = Xp.reduce((r, s) => (r[s] = "function", r), t);
  return jr(e, n);
}
function zp(e, t, n) {
  if (n < gt)
    throw new Error("Expected power > 0");
  if (n === gt)
    return e.ONE;
  if (n === ke)
    return t;
  let r = e.ONE, s = t;
  for (; n > gt; )
    n & ke && (r = e.mul(r, s)), s = e.sqr(s), n >>= ke;
  return r;
}
function Zp(e, t) {
  const n = new Array(t.length), r = t.reduce((i, o, c) => e.is0(o) ? i : (n[c] = i, e.mul(i, o)), e.ONE), s = e.inv(r);
  return t.reduceRight((i, o, c) => e.is0(o) ? i : (n[c] = e.mul(i, n[c]), e.mul(i, o)), s), n;
}
function d0(e, t) {
  const n = t !== void 0 ? t : e.toString(2).length, r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function Jp(e, t, n = !1, r = {}) {
  if (e <= gt)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: i } = d0(e, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Hp(e), c = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: i,
    MASK: jo(s),
    ZERO: gt,
    ONE: ke,
    create: (A) => Et(A, e),
    isValid: (A) => {
      if (typeof A != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof A}`);
      return gt <= A && A < e;
    },
    is0: (A) => A === gt,
    isOdd: (A) => (A & ke) === ke,
    neg: (A) => Et(-A, e),
    eql: (A, f) => A === f,
    sqr: (A) => Et(A * A, e),
    add: (A, f) => Et(A + f, e),
    sub: (A, f) => Et(A - f, e),
    mul: (A, f) => Et(A * f, e),
    pow: (A, f) => zp(c, A, f),
    div: (A, f) => Et(A * so(f, e), e),
    // Same as above, but doesn't normalize
    sqrN: (A) => A * A,
    addN: (A, f) => A + f,
    subN: (A, f) => A - f,
    mulN: (A, f) => A * f,
    inv: (A) => so(A, e),
    sqrt: r.sqrt || ((A) => o(c, A)),
    invertBatch: (A) => Zp(c, A),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (A, f, I) => I ? f : A,
    toBytes: (A) => n ? Wo(A, i) : Ar(A, i),
    fromBytes: (A) => {
      if (A.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${A.length}`);
      return n ? Jo(A) : Mn(A);
    }
  });
  return Object.freeze(c);
}
function u0(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function A0(e) {
  const t = u0(e);
  return t + Math.ceil(t / 2);
}
function Wp(e, t, n = !1) {
  const r = e.length, s = u0(t), i = A0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = n ? Mn(e) : Jo(e), c = Et(o, t - ke) + ke;
  return n ? Wo(c, s) : Ar(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const jp = BigInt(0), Di = BigInt(1);
function qp(e, t) {
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
      for (; i > jp; )
        i & Di && (o = o.add(c)), c = c.double(), i >>= Di;
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
      const { windows: o, windowSize: c } = r(i), A = [];
      let f = s, I = f;
      for (let w = 0; w < o; w++) {
        I = f, A.push(I);
        for (let C = 1; C < c; C++)
          I = I.add(f), A.push(I);
        f = I.double();
      }
      return A;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: c, windowSize: A } = r(s);
      let f = e.ZERO, I = e.BASE;
      const w = BigInt(2 ** s - 1), C = 2 ** s, v = BigInt(s);
      for (let R = 0; R < c; R++) {
        const B = R * A;
        let M = Number(o & w);
        o >>= v, M > A && (M -= C, o += Di);
        const T = B, V = B + Math.abs(M) - 1, k = R % 2 !== 0, J = M < 0;
        M === 0 ? I = I.add(n(k, i[T])) : f = f.add(n(J, i[V]));
      }
      return { p: f, f: I };
    },
    wNAFCached(s, i, o, c) {
      const A = s._WINDOW_SIZE || 1;
      let f = i.get(s);
      return f || (f = this.precomputeWindow(s, A), A !== 1 && i.set(s, c(f))), this.wNAF(A, f, o);
    }
  };
}
function l0(e) {
  return Yp(e.Fp), jr(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...d0(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function $p(e) {
  const t = l0(e);
  jr(t, {
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
const { bytesToNumberBE: Kp, hexToBytes: em } = tg, Fn = {
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
    return { d: Kp(r), l: e.subarray(n + 2) };
  },
  toSig(e) {
    const { Err: t } = Fn, n = typeof e == "string" ? em(e) : e;
    if (!Jt(n))
      throw new Error("ui8a expected");
    let r = n.length;
    if (r < 2 || n[0] != 48)
      throw new t("Invalid signature tag");
    if (n[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Fn._parseInt(n.subarray(2)), { d: o, l: c } = Fn._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(e) {
    const t = (f) => Number.parseInt(f[0], 16) & 8 ? "00" + f : f, n = (f) => {
      const I = f.toString(16);
      return I.length & 1 ? `0${I}` : I;
    }, r = t(n(e.s)), s = t(n(e.r)), i = r.length / 2, o = s.length / 2, c = n(i), A = n(o);
    return `30${n(o + i + 4)}02${A}${s}02${c}${r}`;
  }
}, tn = BigInt(0), Dt = BigInt(1);
BigInt(2);
const _c = BigInt(3);
BigInt(4);
function tm(e) {
  const t = $p(e), { Fp: n } = t, r = t.toBytes || ((R, B, M) => {
    const T = B.toAffine();
    return Lr(Uint8Array.from([4]), n.toBytes(T.x), n.toBytes(T.y));
  }), s = t.fromBytes || ((R) => {
    const B = R.subarray(1), M = n.fromBytes(B.subarray(0, n.BYTES)), T = n.fromBytes(B.subarray(n.BYTES, 2 * n.BYTES));
    return { x: M, y: T };
  });
  function i(R) {
    const { a: B, b: M } = t, T = n.sqr(R), V = n.mul(T, R);
    return n.add(n.add(V, n.mul(R, B)), M);
  }
  if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(R) {
    return typeof R == "bigint" && tn < R && R < t.n;
  }
  function c(R) {
    if (!o(R))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function A(R) {
    const { allowedPrivateKeyLengths: B, nByteLength: M, wrapPrivateKey: T, n: V } = t;
    if (B && typeof R != "bigint") {
      if (Jt(R) && (R = dr(R)), typeof R != "string" || !B.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(M * 2, "0");
    }
    let k;
    try {
      k = typeof R == "bigint" ? R : Mn(Mt("private key", R, M));
    } catch {
      throw new Error(`private key must be ${M} bytes, hex or bigint, not ${typeof R}`);
    }
    return T && (k = Et(k, V)), c(k), k;
  }
  const f = /* @__PURE__ */ new Map();
  function I(R) {
    if (!(R instanceof w))
      throw new Error("ProjectivePoint expected");
  }
  class w {
    constructor(B, M, T) {
      if (this.px = B, this.py = M, this.pz = T, B == null || !n.isValid(B))
        throw new Error("x required");
      if (M == null || !n.isValid(M))
        throw new Error("y required");
      if (T == null || !n.isValid(T))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(B) {
      const { x: M, y: T } = B || {};
      if (!B || !n.isValid(M) || !n.isValid(T))
        throw new Error("invalid affine point");
      if (B instanceof w)
        throw new Error("projective point not allowed");
      const V = (k) => n.eql(k, n.ZERO);
      return V(M) && V(T) ? w.ZERO : new w(M, T, n.ONE);
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
    static normalizeZ(B) {
      const M = n.invertBatch(B.map((T) => T.pz));
      return B.map((T, V) => T.toAffine(M[V])).map(w.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(B) {
      const M = w.fromAffine(s(Mt("pointHex", B)));
      return M.assertValidity(), M;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(B) {
      return w.BASE.multiply(A(B));
    }
    // "Private method", don't use it directly
    _setWindowSize(B) {
      this._WINDOW_SIZE = B, f.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !n.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: B, y: M } = this.toAffine();
      if (!n.isValid(B) || !n.isValid(M))
        throw new Error("bad point: x or y not FE");
      const T = n.sqr(M), V = i(B);
      if (!n.eql(T, V))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: B } = this.toAffine();
      if (n.isOdd)
        return !n.isOdd(B);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(B) {
      I(B);
      const { px: M, py: T, pz: V } = this, { px: k, py: J, pz: O } = B, F = n.eql(n.mul(M, O), n.mul(k, V)), L = n.eql(n.mul(T, O), n.mul(J, V));
      return F && L;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new w(this.px, n.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: B, b: M } = t, T = n.mul(M, _c), { px: V, py: k, pz: J } = this;
      let O = n.ZERO, F = n.ZERO, L = n.ZERO, U = n.mul(V, V), j = n.mul(k, k), H = n.mul(J, J), Y = n.mul(V, k);
      return Y = n.add(Y, Y), L = n.mul(V, J), L = n.add(L, L), O = n.mul(B, L), F = n.mul(T, H), F = n.add(O, F), O = n.sub(j, F), F = n.add(j, F), F = n.mul(O, F), O = n.mul(Y, O), L = n.mul(T, L), H = n.mul(B, H), Y = n.sub(U, H), Y = n.mul(B, Y), Y = n.add(Y, L), L = n.add(U, U), U = n.add(L, U), U = n.add(U, H), U = n.mul(U, Y), F = n.add(F, U), H = n.mul(k, J), H = n.add(H, H), U = n.mul(H, Y), O = n.sub(O, U), L = n.mul(H, j), L = n.add(L, L), L = n.add(L, L), new w(O, F, L);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(B) {
      I(B);
      const { px: M, py: T, pz: V } = this, { px: k, py: J, pz: O } = B;
      let F = n.ZERO, L = n.ZERO, U = n.ZERO;
      const j = t.a, H = n.mul(t.b, _c);
      let Y = n.mul(M, k), ee = n.mul(T, J), E = n.mul(V, O), a = n.add(M, T), d = n.add(k, J);
      a = n.mul(a, d), d = n.add(Y, ee), a = n.sub(a, d), d = n.add(M, V);
      let l = n.add(k, O);
      return d = n.mul(d, l), l = n.add(Y, E), d = n.sub(d, l), l = n.add(T, V), F = n.add(J, O), l = n.mul(l, F), F = n.add(ee, E), l = n.sub(l, F), U = n.mul(j, d), F = n.mul(H, E), U = n.add(F, U), F = n.sub(ee, U), U = n.add(ee, U), L = n.mul(F, U), ee = n.add(Y, Y), ee = n.add(ee, Y), E = n.mul(j, E), d = n.mul(H, d), ee = n.add(ee, E), E = n.sub(Y, E), E = n.mul(j, E), d = n.add(d, E), Y = n.mul(ee, d), L = n.add(L, Y), Y = n.mul(l, d), F = n.mul(a, F), F = n.sub(F, Y), Y = n.mul(a, ee), U = n.mul(l, U), U = n.add(U, Y), new w(F, L, U);
    }
    subtract(B) {
      return this.add(B.negate());
    }
    is0() {
      return this.equals(w.ZERO);
    }
    wNAF(B) {
      return v.wNAFCached(this, f, B, (M) => {
        const T = n.invertBatch(M.map((V) => V.pz));
        return M.map((V, k) => V.toAffine(T[k])).map(w.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(B) {
      const M = w.ZERO;
      if (B === tn)
        return M;
      if (c(B), B === Dt)
        return this;
      const { endo: T } = t;
      if (!T)
        return v.unsafeLadder(this, B);
      let { k1neg: V, k1: k, k2neg: J, k2: O } = T.splitScalar(B), F = M, L = M, U = this;
      for (; k > tn || O > tn; )
        k & Dt && (F = F.add(U)), O & Dt && (L = L.add(U)), U = U.double(), k >>= Dt, O >>= Dt;
      return V && (F = F.negate()), J && (L = L.negate()), L = new w(n.mul(L.px, T.beta), L.py, L.pz), F.add(L);
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
    multiply(B) {
      c(B);
      let M = B, T, V;
      const { endo: k } = t;
      if (k) {
        const { k1neg: J, k1: O, k2neg: F, k2: L } = k.splitScalar(M);
        let { p: U, f: j } = this.wNAF(O), { p: H, f: Y } = this.wNAF(L);
        U = v.constTimeNegate(J, U), H = v.constTimeNegate(F, H), H = new w(n.mul(H.px, k.beta), H.py, H.pz), T = U.add(H), V = j.add(Y);
      } else {
        const { p: J, f: O } = this.wNAF(M);
        T = J, V = O;
      }
      return w.normalizeZ([T, V])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(B, M, T) {
      const V = w.BASE, k = (O, F) => F === tn || F === Dt || !O.equals(V) ? O.multiplyUnsafe(F) : O.multiply(F), J = k(this, M).add(k(B, T));
      return J.is0() ? void 0 : J;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(B) {
      const { px: M, py: T, pz: V } = this, k = this.is0();
      B == null && (B = k ? n.ONE : n.inv(V));
      const J = n.mul(M, B), O = n.mul(T, B), F = n.mul(V, B);
      if (k)
        return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(F, n.ONE))
        throw new Error("invZ was invalid");
      return { x: J, y: O };
    }
    isTorsionFree() {
      const { h: B, isTorsionFree: M } = t;
      if (B === Dt)
        return !0;
      if (M)
        return M(w, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: B, clearCofactor: M } = t;
      return B === Dt ? this : M ? M(w, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(B = !0) {
      return this.assertValidity(), r(w, this, B);
    }
    toHex(B = !0) {
      return dr(this.toRawBytes(B));
    }
  }
  w.BASE = new w(t.Gx, t.Gy, n.ONE), w.ZERO = new w(n.ZERO, n.ONE, n.ZERO);
  const C = t.nBitLength, v = qp(w, t.endo ? Math.ceil(C / 2) : C);
  return {
    CURVE: t,
    ProjectivePoint: w,
    normPrivateKeyToScalar: A,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function nm(e) {
  const t = l0(e);
  return jr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function rm(e) {
  const t = nm(e), { Fp: n, n: r } = t, s = n.BYTES + 1, i = 2 * n.BYTES + 1;
  function o(d) {
    return tn < d && d < n.ORDER;
  }
  function c(d) {
    return Et(d, r);
  }
  function A(d) {
    return so(d, r);
  }
  const { ProjectivePoint: f, normPrivateKeyToScalar: I, weierstrassEquation: w, isWithinCurveOrder: C } = tm({
    ...t,
    toBytes(d, l, p) {
      const h = l.toAffine(), y = n.toBytes(h.x), b = Lr;
      return p ? b(Uint8Array.from([l.hasEvenY() ? 2 : 3]), y) : b(Uint8Array.from([4]), y, n.toBytes(h.y));
    },
    fromBytes(d) {
      const l = d.length, p = d[0], h = d.subarray(1);
      if (l === s && (p === 2 || p === 3)) {
        const y = Mn(h);
        if (!o(y))
          throw new Error("Point is not on curve");
        const b = w(y);
        let g = n.sqrt(b);
        const u = (g & Dt) === Dt;
        return (p & 1) === 1 !== u && (g = n.neg(g)), { x: y, y: g };
      } else if (l === i && p === 4) {
        const y = n.fromBytes(h.subarray(0, n.BYTES)), b = n.fromBytes(h.subarray(n.BYTES, 2 * n.BYTES));
        return { x: y, y: b };
      } else
        throw new Error(`Point of length ${l} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), v = (d) => dr(Ar(d, t.nByteLength));
  function R(d) {
    const l = r >> Dt;
    return d > l;
  }
  function B(d) {
    return R(d) ? c(-d) : d;
  }
  const M = (d, l, p) => Mn(d.slice(l, p));
  class T {
    constructor(l, p, h) {
      this.r = l, this.s = p, this.recovery = h, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(l) {
      const p = t.nByteLength;
      return l = Mt("compactSignature", l, p * 2), new T(M(l, 0, p), M(l, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(l) {
      const { r: p, s: h } = Fn.toSig(Mt("DER", l));
      return new T(p, h);
    }
    assertValidity() {
      if (!C(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!C(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(l) {
      return new T(this.r, this.s, l);
    }
    recoverPublicKey(l) {
      const { r: p, s: h, recovery: y } = this, b = L(Mt("msgHash", l));
      if (y == null || ![0, 1, 2, 3].includes(y))
        throw new Error("recovery id invalid");
      const g = y === 2 || y === 3 ? p + t.n : p;
      if (g >= n.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const u = y & 1 ? "03" : "02", m = f.fromHex(u + v(g)), z = A(g), W = c(-b * z), K = c(h * z), q = f.BASE.multiplyAndAddUnsafe(m, W, K);
      if (!q)
        throw new Error("point at infinify");
      return q.assertValidity(), q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new T(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return ur(this.toDERHex());
    }
    toDERHex() {
      return Fn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return ur(this.toCompactHex());
    }
    toCompactHex() {
      return v(this.r) + v(this.s);
    }
  }
  const V = {
    isValidPrivateKey(d) {
      try {
        return I(d), !0;
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
      const d = A0(t.n);
      return Wp(t.randomBytes(d), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(d = 8, l = f.BASE) {
      return l._setWindowSize(d), l.multiply(BigInt(3)), l;
    }
  };
  function k(d, l = !0) {
    return f.fromPrivateKey(d).toRawBytes(l);
  }
  function J(d) {
    const l = Jt(d), p = typeof d == "string", h = (l || p) && d.length;
    return l ? h === s || h === i : p ? h === 2 * s || h === 2 * i : d instanceof f;
  }
  function O(d, l, p = !0) {
    if (J(d))
      throw new Error("first arg must be private key");
    if (!J(l))
      throw new Error("second arg must be public key");
    return f.fromHex(l).multiply(I(d)).toRawBytes(p);
  }
  const F = t.bits2int || function(d) {
    const l = Mn(d), p = d.length * 8 - t.nBitLength;
    return p > 0 ? l >> BigInt(p) : l;
  }, L = t.bits2int_modN || function(d) {
    return c(F(d));
  }, U = jo(t.nBitLength);
  function j(d) {
    if (typeof d != "bigint")
      throw new Error("bigint expected");
    if (!(tn <= d && d < U))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return Ar(d, t.nByteLength);
  }
  function H(d, l, p = Y) {
    if (["recovered", "canonical"].some((ie) => ie in p))
      throw new Error("sign() legacy options not supported");
    const { hash: h, randomBytes: y } = t;
    let { lowS: b, prehash: g, extraEntropy: u } = p;
    b == null && (b = !0), d = Mt("msgHash", d), g && (d = Mt("prehashed msgHash", h(d)));
    const m = L(d), z = I(l), W = [j(z), j(m)];
    if (u != null) {
      const ie = u === !0 ? y(n.BYTES) : u;
      W.push(Mt("extraEntropy", ie));
    }
    const K = Lr(...W), q = m;
    function se(ie) {
      const De = F(ie);
      if (!C(De))
        return;
      const he = A(De), ce = f.BASE.multiply(De).toAffine(), _e = c(ce.x);
      if (_e === tn)
        return;
      const le = c(he * c(q + _e * z));
      if (le === tn)
        return;
      let ge = (ce.x === _e ? 0 : 2) | Number(ce.y & Dt), Gt = le;
      return b && R(le) && (Gt = B(le), ge ^= 1), new T(_e, Gt, ge);
    }
    return { seed: K, k2sig: se };
  }
  const Y = { lowS: t.lowS, prehash: !1 }, ee = { lowS: t.lowS, prehash: !1 };
  function E(d, l, p = Y) {
    const { seed: h, k2sig: y } = H(d, l, p), b = t;
    return Pu(b.hash.outputLen, b.nByteLength, b.hmac)(h, y);
  }
  f.BASE._setWindowSize(8);
  function a(d, l, p, h = ee) {
    var ce;
    const y = d;
    if (l = Mt("msgHash", l), p = Mt("publicKey", p), "strict" in h)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: b, prehash: g } = h;
    let u, m;
    try {
      if (typeof y == "string" || Jt(y))
        try {
          u = T.fromDER(y);
        } catch (_e) {
          if (!(_e instanceof Fn.Err))
            throw _e;
          u = T.fromCompact(y);
        }
      else if (typeof y == "object" && typeof y.r == "bigint" && typeof y.s == "bigint") {
        const { r: _e, s: le } = y;
        u = new T(_e, le);
      } else
        throw new Error("PARSE");
      m = f.fromHex(p);
    } catch (_e) {
      if (_e.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (b && u.hasHighS())
      return !1;
    g && (l = t.hash(l));
    const { r: z, s: W } = u, K = L(l), q = A(W), se = c(K * q), ie = c(z * q), De = (ce = f.BASE.multiplyAndAddUnsafe(m, se, ie)) == null ? void 0 : ce.toAffine();
    return De ? c(De.x) === z : !1;
  }
  return {
    CURVE: t,
    getPublicKey: k,
    getSharedSecret: O,
    sign: E,
    verify: a,
    ProjectivePoint: f,
    Signature: T,
    utils: V
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function sm(e) {
  return {
    hash: e,
    hmac: (t, ...n) => So(e, t, lf(...n)),
    randomBytes: hf
  };
}
function im(e, t) {
  const n = (r) => rm({ ...e, ...sm(r) });
  return Object.freeze({ ...n(t), create: n });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const f0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), vc = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), om = BigInt(1), io = BigInt(2), Rc = (e, t) => (e + t / io) / t;
function am(e) {
  const t = f0, n = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), A = BigInt(88), f = e * e * e % t, I = f * f * e % t, w = St(I, n, t) * I % t, C = St(w, n, t) * I % t, v = St(C, io, t) * f % t, R = St(v, s, t) * v % t, B = St(R, i, t) * R % t, M = St(B, c, t) * B % t, T = St(M, A, t) * M % t, V = St(T, c, t) * B % t, k = St(V, n, t) * I % t, J = St(k, o, t) * R % t, O = St(J, r, t) * f % t, F = St(O, io, t);
  if (!oo.eql(oo.sqr(F), e))
    throw new Error("Cannot find square root");
  return F;
}
const oo = Jp(f0, void 0, void 0, { sqrt: am }), gn = im({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: oo,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: vc,
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
      const t = vc, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -om * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, o = BigInt("0x100000000000000000000000000000000"), c = Rc(i * e, t), A = Rc(-r * e, t);
      let f = Et(e - c * n - A * s, t), I = Et(-c * r - A * i, t);
      const w = f > o, C = I > o;
      if (w && (f = t - f), C && (I = t - I), f > o || I > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: w, k1: f, k2neg: C, k2: I };
    }
  }
}, Jr);
BigInt(0);
gn.ProjectivePoint;
let ls;
const cm = new Uint8Array(16);
function dm() {
  if (!ls && (ls = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ls))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ls(cm);
}
const pt = [];
for (let e = 0; e < 256; ++e)
  pt.push((e + 256).toString(16).slice(1));
function um(e, t = 0) {
  return (pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]]).toLowerCase();
}
const Am = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Nc = {
  randomUUID: Am
};
function lm(e, t, n) {
  if (Nc.randomUUID && !t && !e)
    return Nc.randomUUID();
  e = e || {};
  const r = e.random || (e.rng || dm)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
    n = n || 0;
    for (let s = 0; s < 16; ++s)
      t[n + s] = r[s];
    return t;
  }
  return um(r);
}
var ta = { exports: {} }, qn = typeof Reflect == "object" ? Reflect : null, Sc = qn && typeof qn.apply == "function" ? qn.apply : function(t, n, r) {
  return Function.prototype.apply.call(t, n, r);
}, vs;
qn && typeof qn.ownKeys == "function" ? vs = qn.ownKeys : Object.getOwnPropertySymbols ? vs = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : vs = function(t) {
  return Object.getOwnPropertyNames(t);
};
function fm(e) {
  console && console.warn && console.warn(e);
}
var h0 = Number.isNaN || function(t) {
  return t !== t;
};
function Be() {
  Be.init.call(this);
}
ta.exports = Be;
ta.exports.once = mm;
Be.EventEmitter = Be;
Be.prototype._events = void 0;
Be.prototype._eventsCount = 0;
Be.prototype._maxListeners = void 0;
var Dc = 10;
function ni(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(Be, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Dc;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || h0(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Dc = e;
  }
});
Be.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Be.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || h0(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function g0(e) {
  return e._maxListeners === void 0 ? Be.defaultMaxListeners : e._maxListeners;
}
Be.prototype.getMaxListeners = function() {
  return g0(this);
};
Be.prototype.emit = function(t) {
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
  var A = i[t];
  if (A === void 0)
    return !1;
  if (typeof A == "function")
    Sc(A, this, n);
  else
    for (var f = A.length, I = I0(A, f), r = 0; r < f; ++r)
      Sc(I[r], this, n);
  return !0;
};
function p0(e, t, n, r) {
  var s, i, o;
  if (ni(n), i = e._events, i === void 0 ? (i = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    n.listener ? n.listener : n
  ), i = e._events), o = i[t]), o === void 0)
    o = i[t] = n, ++e._eventsCount;
  else if (typeof o == "function" ? o = i[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), s = g0(e), s > 0 && o.length > s && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = o.length, fm(c);
  }
  return e;
}
Be.prototype.addListener = function(t, n) {
  return p0(this, t, n, !1);
};
Be.prototype.on = Be.prototype.addListener;
Be.prototype.prependListener = function(t, n) {
  return p0(this, t, n, !0);
};
function hm() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function m0(e, t, n) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n }, s = hm.bind(r);
  return s.listener = n, r.wrapFn = s, s;
}
Be.prototype.once = function(t, n) {
  return ni(n), this.on(t, m0(this, t, n)), this;
};
Be.prototype.prependOnceListener = function(t, n) {
  return ni(n), this.prependListener(t, m0(this, t, n)), this;
};
Be.prototype.removeListener = function(t, n) {
  var r, s, i, o, c;
  if (ni(n), s = this._events, s === void 0)
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
    i === 0 ? r.shift() : gm(r, i), r.length === 1 && (s[t] = r[0]), s.removeListener !== void 0 && this.emit("removeListener", t, c || n);
  }
  return this;
};
Be.prototype.off = Be.prototype.removeListener;
Be.prototype.removeAllListeners = function(t) {
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
function w0(e, t, n) {
  var r = e._events;
  if (r === void 0)
    return [];
  var s = r[t];
  return s === void 0 ? [] : typeof s == "function" ? n ? [s.listener || s] : [s] : n ? pm(s) : I0(s, s.length);
}
Be.prototype.listeners = function(t) {
  return w0(this, t, !0);
};
Be.prototype.rawListeners = function(t) {
  return w0(this, t, !1);
};
Be.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : y0.call(e, t);
};
Be.prototype.listenerCount = y0;
function y0(e) {
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
Be.prototype.eventNames = function() {
  return this._eventsCount > 0 ? vs(this._events) : [];
};
function I0(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r)
    n[r] = e[r];
  return n;
}
function gm(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function pm(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n)
    t[n] = e[n].listener || e[n];
  return t;
}
function mm(e, t) {
  return new Promise(function(n, r) {
    function s(o) {
      e.removeListener(t, i), r(o);
    }
    function i() {
      typeof e.removeListener == "function" && e.removeListener("error", s), n([].slice.call(arguments));
    }
    b0(e, t, i, { once: !0 }), t !== "error" && wm(e, s, { once: !0 });
  });
}
function wm(e, t, n) {
  typeof e.on == "function" && b0(e, "error", t, n);
}
function b0(e, t, n, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, n) : e.on(t, n);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function s(i) {
      r.once && e.removeEventListener(t, s), n(i);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var E0 = ta.exports, ym = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Im = class {
  constructor(e, t, n, r, s, i = 0) {
    D(this, "left");
    D(this, "right");
    D(this, "parent");
    D(this, "hash");
    D(this, "data");
    D(this, "index");
    this.left = e, this.right = t, this.parent = n, this.hash = r, this.data = s, this.index = i;
  }
}, Qc = Im;
function bm(e) {
  return on("0x00".concat(e.slice(2)));
}
function Em(e, t) {
  return on("0x01".concat(e.slice(2)).concat(t.slice(2)));
}
function C0(e) {
  if (!e.length)
    return ym;
  const t = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = bm(e[i]);
    t.push(new Qc(-1, -1, -1, o, e[i]));
  }
  let n = t, r = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < r - s; i += 1) {
      const o = i << 1, c = Em(n[o].hash, n[o + 1].hash);
      t[i] = new Qc(n[o].index, n[o + 1].index, -1, c, "");
    }
    if (s === 1 && (t[i] = n[i << 1]), r === 1)
      break;
    s = r & 1, r = r + 1 >> 1, n = t;
  }
  return t[0].hash;
}
var Cm = "0x00", B0 = "0x01";
function Bm(e, t) {
  const n = "0x00".concat(e.slice(2)).concat(on(t).slice(2));
  return [on(n), n];
}
function Pn(e, t) {
  const n = "0x01".concat(e.slice(2)).concat(t.slice(2));
  return [on(n), n];
}
function Qi(e) {
  const t = B0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function xm(e) {
  const t = B0.length;
  return ["0x".concat(e.slice(t, t + 64)), "0x".concat(e.slice(t + 64))];
}
function Ti(e) {
  return e.slice(0, 4) === Cm;
}
var _m = class {
  constructor(e, t, n, r, s) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "BitMask");
    D(this, "NumSideNodes");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.BitMask = n, this.NumSideNodes = r, this.SiblingData = s;
  }
}, vm = _m, Rm = class {
  constructor(e, t, n) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "SiblingData");
    this.SideNodes = e, this.NonMembershipLeafData = t, this.SiblingData = n;
  }
}, Nm = Rm, vt = "0x0000000000000000000000000000000000000000000000000000000000000000", Kt = 256;
function Zn(e, t) {
  const n = e.slice(2), r = "0x".concat(
    n.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(r) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
function Sm(e) {
  let t = 0, n = e.length - 1;
  const r = e;
  for (; t < n; )
    [r[t], r[n]] = [
      r[n],
      r[t]
    ], t += 1, n -= 1;
  return r;
}
function Dm(e, t) {
  let n = 0;
  for (let r = 0; r < Kt && Zn(e, r) === Zn(t, r); r += 1)
    n += 1;
  return n;
}
function Qm(e) {
  const t = [], n = [];
  let r;
  for (let i = 0; i < e.SideNodes.length; i += 1)
    r = e.SideNodes[i], r === vt ? t.push(0) : (n.push(r), t.push(1));
  return new vm(
    n,
    e.NonMembershipLeafData,
    t,
    e.SideNodes.length,
    e.SiblingData
  );
}
var Tm = class {
  constructor() {
    D(this, "ms");
    D(this, "root");
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
    if (Ti(r))
      return [n, t, r, ""];
    let s, i, o = "", c = "";
    for (let f = 0; f < Kt; f += 1) {
      if ([s, i] = xm(r), Zn(e, f) === 1 ? (c = s, o = i) : (c = i, o = s), n.push(c), o === vt) {
        r = "";
        break;
      }
      if (r = this.get(o), Ti(r))
        break;
    }
    const A = this.get(c);
    return [Sm(n), o, r, A];
  }
  deleteWithSideNodes(e, t, n, r) {
    if (n === vt)
      return this.root;
    const [s] = Qi(r);
    if (s !== e)
      return this.root;
    let i = "", o = "", c = "", A = "", f = !1;
    for (let I = 0; I < t.length; I += 1)
      if (t[I] !== "") {
        if (c = t[I], o === "")
          if (A = this.get(c), Ti(A)) {
            i = c, o = c;
            continue;
          } else
            o = vt, f = !0;
        !f && c === vt || (f || (f = !0), Zn(e, t.length - 1 - I) === 1 ? [i, o] = Pn(c, o) : [i, o] = Pn(o, c), this.set(i, o), o = i);
      }
    return i === "" && (i = vt), i;
  }
  updateWithSideNodes(e, t, n, r, s) {
    let i, o;
    this.set(on(t), t), [i, o] = Bm(e, t), this.set(i, o), o = i;
    let c;
    if (r === vt)
      c = Kt;
    else {
      const [A] = Qi(s);
      c = Dm(e, A);
    }
    c !== Kt && (Zn(e, c) === 1 ? [i, o] = Pn(r, o) : [i, o] = Pn(o, r), this.set(i, o), o = i);
    for (let A = 0; A < Kt; A += 1) {
      let f;
      const I = Kt - n.length;
      if (A - I < 0 || n[A - I] === "")
        if (c !== Kt && c > Kt - 1 - A)
          f = vt;
        else
          continue;
      else
        f = n[A - I];
      Zn(e, Kt - 1 - A) === 1 ? [i, o] = Pn(f, o) : [i, o] = Pn(o, f), this.set(i, o), o = i;
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
    for (let A = 0; A < t.length; A += 1)
      t[A] !== "" && i.push(t[A]);
    let o = "";
    if (n !== vt) {
      const [A] = Qi(r);
      A !== e && (o = r);
    }
    return new Nm(i, o, s);
  }
  proveCompacted(e) {
    const t = this.prove(e);
    return Qm(t);
  }
}, Fm = Object.defineProperty, Mm = (e, t, n) => t in e ? Fm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Fe = (e, t, n) => (Mm(e, typeof t != "symbol" ? t + "" : t, n), n), na = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, Ne = (e, t, n) => (na(e, t, "read from private field"), n ? n.call(e) : t.get(e)), wn = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, Ot = (e, t, n, r) => (na(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), ao = (e, t, n) => (na(e, t, "access private method"), n), ra = (e) => {
  let t, n, r;
  Array.isArray(e) ? (n = e[0], t = e[1], r = e[2] ?? void 0) : (n = e.amount, t = e.assetId, r = e.max ?? void 0);
  const s = x(n);
  return {
    assetId: Z(t),
    amount: s.lt(1) ? x(1) : s,
    max: r ? x(r) : void 0
  };
}, Om = (e) => {
  const { amount: t, assetId: n } = e, r = [...e.coinQuantities], s = r.findIndex((i) => i.assetId === n);
  return s !== -1 ? r[s].amount = r[s].amount.add(t) : r.push({ assetId: n, amount: t }), r;
}, x0 = ae`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  type: __typename
  ... on SqueezedOutStatus {
    reason
  }
}
    `, _0 = ae`
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
    `, Lm = ae`
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
    receipts {
      ...receiptFragment
    }
    totalGas
    totalFee
  }
  ... on FailureStatus {
    block {
      id
    }
    totalGas
    totalFee
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
    ${_0}`, es = ae`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${Lm}`, km = ae`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Pm = ae`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${km}`, Um = ae`
    fragment dryRunFailureStatusFragment on DryRunFailureStatus {
  totalGas
  totalFee
  reason
  programState {
    returnType
    data
  }
}
    `, Gm = ae`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, Vm = ae`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${Um}
${Gm}`, Hm = ae`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${Vm}
${_0}`, sa = ae`
    fragment coinFragment on Coin {
  __typename
  utxoId
  owner
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, Xm = ae`
    fragment messageCoinFragment on MessageCoin {
  __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, v0 = ae`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  nonce
  daHeight
}
    `, Ym = ae`
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
    `, R0 = ae`
    fragment balanceFragment on Balance {
  owner
  amount
  assetId
}
    `, ri = ae`
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
    `, zm = ae`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, Zm = ae`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, Jm = ae`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, Wm = ae`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, jm = ae`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, qm = ae`
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
    `, $m = ae`
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
    ${qm}`, Km = ae`
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
    ${zm}
${Zm}
${Jm}
${Wm}
${jm}
${$m}`, ew = ae`
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
${Km}`, tw = ae`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, nw = ae`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, rw = ae`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
}
    `, sw = ae`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, iw = ae`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, ow = ae`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${rw}`, aw = ae`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${ew}`, cw = ae`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${es}`, dw = ae`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${es}`, uw = ae`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${es}`, Aw = ae`
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
    ${nw}
${es}`, lw = ae`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Pm}`, fw = ae`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${ri}`, hw = ae`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionFragment
    }
  }
}
    ${ri}
${es}`, gw = ae`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${ri}`, pw = ae`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
  }
}
    ${sa}`, mw = ae`
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
    ${sa}`, ww = ae`
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
${Xm}`, yw = ae`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, Iw = ae`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${tw}`, bw = ae`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    ...balanceFragment
  }
}
    ${R0}`, Ew = ae`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, Cw = ae`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, Bw = ae`
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
    ${R0}`, xw = ae`
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
    ${v0}`, _w = ae`
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
    ${Ym}`, vw = ae`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Rw = ae`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${sw}`, Nw = ae`
    mutation dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean) {
  dryRun(txs: $encodedTransactions, utxoValidation: $utxoValidation) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${Hm}`, Sw = ae`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, Dw = ae`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, Qw = ae`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${v0}`, Tw = ae`
    subscription submitAndAwait($encodedTransaction: HexString!) {
  submitAndAwait(tx: $encodedTransaction) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${x0}`, Fw = ae`
    subscription statusChange($transactionId: TransactionId!) {
  statusChange(id: $transactionId) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${x0}`;
function Mw(e) {
  return {
    getVersion(t, n) {
      return e(iw, t, n);
    },
    getNodeInfo(t, n) {
      return e(ow, t, n);
    },
    getChain(t, n) {
      return e(aw, t, n);
    },
    getTransaction(t, n) {
      return e(cw, t, n);
    },
    getTransactionWithReceipts(t, n) {
      return e(dw, t, n);
    },
    getTransactions(t, n) {
      return e(uw, t, n);
    },
    getTransactionsByOwner(t, n) {
      return e(Aw, t, n);
    },
    estimatePredicates(t, n) {
      return e(lw, t, n);
    },
    getBlock(t, n) {
      return e(fw, t, n);
    },
    getBlockWithTransactions(t, n) {
      return e(hw, t, n);
    },
    getBlocks(t, n) {
      return e(gw, t, n);
    },
    getCoin(t, n) {
      return e(pw, t, n);
    },
    getCoins(t, n) {
      return e(mw, t, n);
    },
    getCoinsToSpend(t, n) {
      return e(ww, t, n);
    },
    getContract(t, n) {
      return e(yw, t, n);
    },
    getContractBalance(t, n) {
      return e(Iw, t, n);
    },
    getBalance(t, n) {
      return e(bw, t, n);
    },
    getLatestGasPrice(t, n) {
      return e(Ew, t, n);
    },
    estimateGasPrice(t, n) {
      return e(Cw, t, n);
    },
    getBalances(t, n) {
      return e(Bw, t, n);
    },
    getMessages(t, n) {
      return e(xw, t, n);
    },
    getMessageProof(t, n) {
      return e(_w, t, n);
    },
    getMessageStatus(t, n) {
      return e(vw, t, n);
    },
    getRelayedTransactionStatus(t, n) {
      return e(Rw, t, n);
    },
    dryRun(t, n) {
      return e(Nw, t, n);
    },
    submit(t, n) {
      return e(Sw, t, n);
    },
    produceBlocks(t, n) {
      return e(Dw, t, n);
    },
    getMessageByNonce(t, n) {
      return e(Qw, t, n);
    },
    submitAndAwait(t, n) {
      return e(Tw, t, n);
    },
    statusChange(t, n) {
      return e(Fw, t, n);
    }
  };
}
var N0 = class {
  constructor(e) {
    D(this, "stream");
    D(this, "events", []);
    D(this, "parsingLeftover", "");
    this.options = e;
  }
  async setStream() {
    const { url: e, query: t, variables: n, fetchFn: r } = this.options, s = await r(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: qu(t),
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
          throw new _(
            _.CODES.INVALID_REQUEST,
            c.map((A) => A.message).join(`

`)
          );
        return { value: o, done: !1 };
      }
      const { value: e, done: t } = await this.stream.read();
      if (t)
        return { value: e, done: t };
      const n = N0.textDecoder.decode(e).replace(`:keep-alive-text

`, "");
      if (n === "")
        continue;
      const r = `${this.parsingLeftover}${n}`, s = /data:.*\n\n/g, i = [...r.matchAll(s)].flatMap((o) => o);
      i.forEach((o) => {
        try {
          this.events.push(JSON.parse(o.replace(/^data:/, "")));
        } catch {
          throw new _(
            N.STREAM_PARSING_ERROR,
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
}, S0 = N0;
Fe(S0, "textDecoder", new TextDecoder());
var Sn = {}, Ow = 30 * 1e3, Lw = class {
  constructor(e = Ow) {
    D(this, "ttl");
    if (this.ttl = e, typeof e != "number" || this.ttl <= 0)
      throw new _(
        N.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  get(e, t = !0) {
    const n = Z(e);
    if (Sn[n]) {
      if (!t || Sn[n].expires > Date.now())
        return Sn[n].value;
      this.del(e);
    }
  }
  set(e) {
    const t = Date.now() + this.ttl, n = Z(e);
    return Sn[n] = {
      expires: t,
      value: e
    }, t;
  }
  getAllData() {
    return Object.keys(Sn).reduce((e, t) => {
      const n = this.get(t, !1);
      return n && e.push(n), e;
    }, []);
  }
  getActiveData() {
    return Object.keys(Sn).reduce((e, t) => {
      const n = this.get(t);
      return n && e.push(n), e;
    }, []);
  }
  del(e) {
    const t = Z(e);
    delete Sn[t];
  }
}, kw = (e) => {
  const { type: t } = e;
  switch (e.type) {
    case me.Coin: {
      const n = X(e.predicate ?? "0x"), r = X(e.predicateData ?? "0x");
      return {
        type: me.Coin,
        txID: Z(X(e.id).slice(0, Bn)),
        outputIndex: Lt(X(e.id).slice(Bn, Yi)),
        owner: Z(e.owner),
        amount: x(e.amount),
        assetId: Z(e.assetId),
        txPointer: {
          blockHeight: Lt(X(e.txPointer).slice(0, 8)),
          txIndex: Lt(X(e.txPointer).slice(8, 16))
        },
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(n.length),
        predicateDataLength: x(r.length),
        predicate: Z(n),
        predicateData: Z(r)
      };
    }
    case me.Contract:
      return {
        type: me.Contract,
        txID: Se,
        outputIndex: 0,
        balanceRoot: Se,
        stateRoot: Se,
        txPointer: {
          blockHeight: Lt(X(e.txPointer).slice(0, 8)),
          txIndex: Lt(X(e.txPointer).slice(8, 16))
        },
        contractID: Z(e.contractId)
      };
    case me.Message: {
      const n = X(e.predicate ?? "0x"), r = X(e.predicateData ?? "0x"), s = X(e.data ?? "0x");
      return {
        type: me.Message,
        sender: Z(e.sender),
        recipient: Z(e.recipient),
        amount: x(e.amount),
        nonce: Z(e.nonce),
        witnessIndex: e.witnessIndex,
        predicateGasUsed: x(e.predicateGasUsed),
        predicateLength: x(n.length),
        predicateDataLength: x(r.length),
        predicate: Z(n),
        predicateData: Z(r),
        data: Z(s),
        dataLength: s.length
      };
    }
    default:
      throw new _(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, Pw = (e) => {
  const { type: t } = e;
  switch (t) {
    case Ee.Coin:
      return {
        type: Ee.Coin,
        to: Z(e.to),
        amount: x(e.amount),
        assetId: Z(e.assetId)
      };
    case Ee.Contract:
      return {
        type: Ee.Contract,
        inputIndex: e.inputIndex,
        balanceRoot: Se,
        stateRoot: Se
      };
    case Ee.Change:
      return {
        type: Ee.Change,
        to: Z(e.to),
        amount: x(0),
        assetId: Z(e.assetId)
      };
    case Ee.Variable:
      return {
        type: Ee.Variable,
        to: Se,
        amount: x(0),
        assetId: Se
      };
    case Ee.ContractCreated:
      return {
        type: Ee.ContractCreated,
        contractId: Z(e.contractId),
        stateRoot: Z(e.stateRoot)
      };
    default:
      throw new _(
        N.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, wb = (e) => "utxoId" in e, yb = (e) => "recipient" in e, Uw = (e) => "id" in e, Ib = (e) => "recipient" in e, Gw = (e) => e.type === ue.Revert && e.val.toString("hex") === s0, Vw = (e) => e.type === ue.Panic && e.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", Tc = (e) => e.reduce(
  (t, n) => (Gw(n) && t.missingOutputVariables.push(n), Vw(n) && t.missingOutputContractIds.push(n), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), xe = (e) => e || Se;
function Hw(e) {
  const { receiptType: t } = e;
  switch (t) {
    case "CALL":
      return {
        type: ue.Call,
        from: xe(e.id || e.contractId),
        to: xe(e == null ? void 0 : e.to),
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
        type: ue.Return,
        id: xe(e.id || e.contractId),
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "RETURN_DATA":
      return {
        type: ue.ReturnData,
        id: xe(e.id || e.contractId),
        ptr: x(e.ptr),
        len: x(e.len),
        digest: xe(e.digest),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "PANIC":
      return {
        type: ue.Panic,
        id: xe(e.id),
        reason: x(e.reason),
        pc: x(e.pc),
        is: x(e.is),
        contractId: xe(e.contractId)
      };
    case "REVERT":
      return {
        type: ue.Revert,
        id: xe(e.id || e.contractId),
        val: x(e.ra),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG":
      return {
        type: ue.Log,
        id: xe(e.id || e.contractId),
        val0: x(e.ra),
        val1: x(e.rb),
        val2: x(e.rc),
        val3: x(e.rd),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "LOG_DATA":
      return {
        type: ue.LogData,
        id: xe(e.id || e.contractId),
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
        type: ue.Transfer,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || (e == null ? void 0 : e.to)),
        amount: x(e.amount),
        assetId: xe(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "TRANSFER_OUT":
      return {
        type: ue.TransferOut,
        from: xe(e.id || e.contractId),
        to: xe(e.toAddress || e.to),
        amount: x(e.amount),
        assetId: xe(e.assetId),
        pc: x(e.pc),
        is: x(e.is)
      };
    case "SCRIPT_RESULT":
      return {
        type: ue.ScriptResult,
        result: x(e.result),
        gasUsed: x(e.gasUsed)
      };
    case "MESSAGE_OUT": {
      const n = xe(e.sender), r = xe(e.recipient), s = xe(e.nonce), i = x(e.amount), o = e.data ? X(e.data) : Uint8Array.from([]), c = xe(e.digest), A = Ls.getMessageId({
        sender: n,
        recipient: r,
        nonce: s,
        amount: i,
        data: o
      });
      return {
        type: ue.MessageOut,
        sender: n,
        recipient: r,
        amount: i,
        nonce: s,
        data: o,
        digest: c,
        messageId: A
      };
    }
    case "MINT": {
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = Or.getAssetId(n, r);
      return {
        type: ue.Mint,
        subId: r,
        contractId: n,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    case "BURN": {
      const n = xe(e.id || e.contractId), r = xe(e.subId), s = qi.getAssetId(n, r);
      return {
        type: ue.Burn,
        subId: r,
        contractId: n,
        assetId: s,
        val: x(e.val),
        pc: x(e.pc),
        is: x(e.is)
      };
    }
    default:
      throw new _(N.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}
var Xw = "https://fuellabs.github.io/block-explorer-v2", Yw = (e, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[e] || e}/${t}`, bb = (e = {}) => {
  const { blockExplorerUrl: t, path: n, providerUrl: r, address: s, txId: i, blockNumber: o } = e, c = t || Xw, A = [
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
  ], f = A.filter((J) => !!J.value).map(({ key: J, value: O }) => ({
    key: J,
    value: O
  })), I = f.length > 0;
  if (f.length > 1)
    throw new _(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${A.map((J) => J.key).join(", ")}.`
    );
  if (n && f.length > 0) {
    const J = A.map(({ key: O }) => O).join(", ");
    throw new _(
      N.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${J}.`
    );
  }
  const w = I ? Yw(
    f[0].key,
    f[0].value
  ) : "", C = /^\/|\/$/gm, v = n ? n.replace(C, "") : w, R = c.replace(C, ""), B = r == null ? void 0 : r.replace(C, ""), M = B ? encodeURIComponent(B) : void 0, T = R.match(/^https?:\/\//) ? "" : "https://", V = B != null && B.match(/^https?:\/\//) ? "" : "https://";
  return `${T}${R}/${v}${M ? `?providerUrl=${V}${M}` : ""}`;
}, D0 = (e) => e.filter(
  (r) => r.type === ue.ScriptResult
).reduce((r, s) => r.add(s.gasUsed), x(0));
function Cn(e, t) {
  const n = x(t.base);
  let r = x(0);
  return t.__typename === "LightOperation" && (r = x(e).div(x(t.unitsPerGas))), t.__typename === "HeavyOperation" && (r = x(e).mul(x(t.gasPerUnit))), n.add(r);
}
function zw(e, t, n) {
  const r = [], s = e.filter((c) => {
    if ("owner" in c || "sender" in c) {
      if ("predicate" in c && c.predicate && c.predicate !== "0x")
        return !0;
      if (!r.includes(c.witnessIndex))
        return r.push(c.witnessIndex), !0;
    }
    return !1;
  }), i = Cn(t, n.vmInitialization);
  return s.reduce((c, A) => "predicate" in A && A.predicate && A.predicate !== "0x" ? c.add(
    i.add(Cn(X(A.predicate).length, n.contractRoot)).add(x(A.predicateGasUsed))
  ) : c.add(n.ecr1), x(0));
}
function Q0(e) {
  const { gasCosts: t, gasPerByte: n, inputs: r, metadataGas: s, txBytesSize: i } = e, o = Cn(i, t.vmInitialization), c = x(i).mul(n), A = zw(r, i, t);
  return o.add(c).add(A).add(s).maxU64();
}
function ia(e) {
  const {
    gasPerByte: t,
    witnessesLength: n,
    witnessLimit: r,
    minGas: s,
    gasLimit: i = x(0),
    maxGasPerTx: o
  } = e;
  let c = x(0);
  r != null && r.gt(0) && r.gte(n) && (c = x(r).sub(n).mul(t));
  const A = c.add(s).add(i);
  return A.gte(o) ? o : A;
}
function T0({
  gasCosts: e,
  stateRootSize: t,
  txBytesSize: n,
  contractBytesSize: r
}) {
  const s = Cn(r, e.contractRoot), i = Cn(t, e.stateRoot), o = Cn(n, e.s256), c = x(100), A = Cn(c, e.s256);
  return s.add(i).add(o).add(A).maxU64();
}
function F0({
  gasCosts: e,
  txBytesSize: t
}) {
  return Cn(t, e.s256);
}
var co = (e) => {
  const { gas: t, gasPrice: n, priceFactor: r, tip: s } = e;
  return t.mul(n).div(r).add(x(s));
};
function uo(e) {
  return Object.keys(e).forEach((t) => {
    var n;
    switch ((n = e[t]) == null ? void 0 : n.constructor.name) {
      case "Uint8Array":
        e[t] = Z(e[t]);
        break;
      case "Array":
        e[t] = uo(e[t]);
        break;
      case "BN":
        e[t] = e[t].toHex();
        break;
      case "Address":
        e[t] = e[t].toB256();
        break;
      case "Object":
        e[t] = uo(e[t]);
        break;
    }
  }), e;
}
function Zw(e) {
  return uo(rn(e));
}
function Jw(e) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, e);
  });
}
var Ww = (e) => {
  let t = `The transaction reverted with reason: "${e.reason}".`;
  const n = e.reason;
  return _p.includes(e.reason) && (t = `${t}

You can read more about this error at:

${vp}#variant.${e.reason}`), { errorMessage: t, reason: n };
}, Br = (e) => JSON.stringify(e, null, 2), jw = (e, t) => {
  let n = "The transaction reverted with an unknown reason.";
  const r = e.find(({ type: i }) => i === ue.Revert);
  let s = "";
  if (r)
    switch (x(r.val).toHex()) {
      case Ep: {
        s = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Br(t[0]) : "an error."}.`;
        break;
      }
      case Cp: {
        const o = t.length >= 2 ? ` comparing ${Br(t[1])} and ${Br(t[0])}.` : ".";
        s = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${o}`;
        break;
      }
      case xp: {
        const o = t.length >= 2 ? ` comparing ${Br(t[1])} and ${Br(t[0])}.` : ".";
        s = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${o}`;
        break;
      }
      case Bp:
        s = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case s0:
        s = "MissingOutputChange", n = `The transaction reverted because it's missing an "OutputChange".`;
        break;
      default:
        s = "unknown", n = `The transaction reverted with an unknown reason: ${r.val}`;
    }
  return { errorMessage: n, reason: s };
}, M0 = (e) => {
  const { receipts: t, status: n, logs: r } = e, s = t.some(({ type: f }) => f === ue.Panic), i = t.some(({ type: f }) => f === ue.Revert), { errorMessage: o, reason: c } = (n == null ? void 0 : n.type) === "FailureStatus" && s ? Ww(n) : jw(t, r), A = {
    logs: r,
    receipts: t,
    panic: s,
    revert: i,
    reason: c
  };
  return new _(N.SCRIPT_REVERTED, o, A);
}, Eb = class extends Error {
  constructor() {
    super(...arguments);
    D(this, "name", "ChangeOutputCollisionError");
    D(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, qw = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessAtIndexError");
    this.index = t, this.message = `Witness at index "${t}" was not found`;
  }
}, Cb = class extends Error {
  constructor(t) {
    super();
    D(this, "name", "NoWitnessByOwnerError");
    this.owner = t, this.message = `A witness for the given owner "${t}" was not found`;
  }
}, yr = (e) => e.type === me.Coin, oa = (e) => e.type === me.Message, fr = (e) => yr(e) || oa(e), $w = (e) => yr(e) ? e.owner : e.recipient, Fc = (e, t) => $w(e) === t.toB256(), Kw = (e, t, n) => e.filter(fr).reduce((r, s) => yr(s) && s.assetId === t || oa(s) && t === n ? r.add(s.amount) : r, x(0)), Bb = (e) => e.filter(fr).reduce(
  (t, n) => (yr(n) ? t.utxos.push(n.id) : t.messages.push(n.nonce), t),
  {
    utxos: [],
    messages: []
  }
), ey = (e, t) => e.reduce(
  (n, r) => (yr(r) && r.owner === t.toB256() ? n.utxos.push(r.id) : oa(r) && r.recipient === t.toB256() && n.messages.push(r.nonce), n),
  {
    utxos: [],
    messages: []
  }
), ty = (e) => {
  const t = X(e);
  return {
    data: Z(t),
    dataLength: t.length
  };
}, Pr = class {
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
    D(this, "tip");
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
    this.tip = e ? x(e) : void 0, this.maturity = t && t > 0 ? t : void 0, this.witnessLimit = On(r) ? x(r) : void 0, this.maxFee = x(n), this.inputs = s ?? [], this.outputs = i ?? [], this.witnesses = o ?? [];
  }
  static getPolicyMeta(e) {
    let t = 0;
    const n = [], { tip: r, witnessLimit: s, maturity: i } = e;
    return x(r).gt(0) && (t += Ft.Tip, n.push({ data: x(r), type: Ft.Tip })), On(s) && x(s).gte(0) && (t += Ft.WitnessLimit, n.push({ data: x(s), type: Ft.WitnessLimit })), i && i > 0 && (t += Ft.Maturity, n.push({ data: i, type: Ft.Maturity })), t += Ft.MaxFee, n.push({ data: e.maxFee, type: Ft.MaxFee }), {
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
    const e = ((i = this.inputs) == null ? void 0 : i.map(kw)) ?? [], t = ((o = this.outputs) == null ? void 0 : o.map(Pw)) ?? [], n = ((c = this.witnesses) == null ? void 0 : c.map(ty)) ?? [], { policyTypes: r, policies: s } = Pr.getPolicyMeta(this);
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
    return new Nn().encode(this.toTransaction());
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
    return this.addWitness(re([Se, Se])), this.witnesses.length - 1;
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(e, t) {
    const n = Ae.fromAddressOrString(e), r = this.getCoinInputWitnessIndexByOwner(n);
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
      throw new qw(e);
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
      (e) => e.type === Ee.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (e) => e.type === Ee.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(e) {
    const t = _r(e), n = this.inputs.find((r) => {
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
    const { assetId: t, owner: n, amount: r, id: s, predicate: i } = e;
    let o;
    e.predicate ? o = 0 : (o = this.getCoinInputWitnessIndexByOwner(n), typeof o != "number" && (o = this.addEmptyWitness()));
    const c = {
      id: s,
      type: me.Coin,
      owner: n.toB256(),
      amount: r,
      assetId: t,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: o,
      predicate: i
    };
    this.pushInput(c), this.addChangeOutput(n, t);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(e) {
    const { recipient: t, sender: n, amount: r, predicate: s, nonce: i, assetId: o } = e;
    let c;
    e.predicate ? c = 0 : (c = this.getCoinInputWitnessIndexByOwner(t), typeof c != "number" && (c = this.addEmptyWitness()));
    const A = {
      nonce: i,
      type: me.Message,
      sender: n.toB256(),
      recipient: t.toB256(),
      amount: r,
      witnessIndex: c,
      predicate: s
    };
    this.pushInput(A), this.addChangeOutput(t, o);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(e) {
    return Uw(e) ? this.addCoinInput(e) : this.addMessageInput(e), this;
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
      type: Ee.Coin,
      to: _r(e).toB256(),
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
    return t.map(ra).forEach((n) => {
      this.pushOutput({
        type: Ee.Coin,
        to: _r(e).toB256(),
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
      type: Ee.Change,
      to: _r(e).toB256(),
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
    const { consensusParameters: t } = e, {
      gasCosts: n,
      feeParameters: { gasPerByte: r }
    } = t;
    return Q0({
      gasPerByte: r,
      gasCosts: n,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(n)
    });
  }
  calculateMaxGas(e, t) {
    const { consensusParameters: n } = e, {
      feeParameters: { gasPerByte: r },
      txParameters: { maxGasPerTx: s }
    } = n, i = this.toTransaction().witnesses.reduce(
      (o, c) => o + c.dataLength,
      0
    );
    return ia({
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
      let A = o;
      i === t && (A = x("1000000000000000000")), c && "assetId" in c ? (c.id = Z(Zt(Yi)), c.amount = A) : this.addResources([
        {
          id: Z(Zt(Yi)),
          amount: A,
          assetId: i,
          owner: n || Ae.fromRandom(),
          blockCreated: x(1),
          txCreatedIdx: x(1)
        }
      ]);
    };
    s(t, x(1e11)), e.forEach((i) => s(i.assetId, i.amount));
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
    return Zw(this);
  }
  removeWitness(e) {
    this.witnesses.splice(e, 1), this.adjustWitnessIndexes(e);
  }
  adjustWitnessIndexes(e) {
    this.inputs.filter(fr).forEach((t) => {
      t.witnessIndex > e && (t.witnessIndex -= 1);
    });
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
      n && "predicateGasUsed" in n && x(n.predicateGasUsed).gt(0) && (t.predicate = n.predicate, t.predicateData = n.predicateData, t.predicateGasUsed = n.predicateGasUsed);
    });
  }
  shiftPredicateData() {
    this.inputs.forEach((e) => {
      "predicateData" in e && "padPredicateData" in e && typeof e.padPredicateData == "function" && (e.predicateData = e.padPredicateData(
        Pr.getPolicyMeta(this).policies.length
      ));
    });
  }
};
function O0(e, t) {
  const n = e.toTransaction();
  n.type === Le.Script && (n.receiptsRoot = Se), n.inputs = n.inputs.map((i) => {
    const o = rn(i);
    switch (o.type) {
      case me.Coin:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.predicateGasUsed = x(0), o;
      case me.Message:
        return o.predicateGasUsed = x(0), o;
      case me.Contract:
        return o.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, o.txID = Se, o.outputIndex = 0, o.balanceRoot = Se, o.stateRoot = Se, o;
      default:
        return o;
    }
  }), n.outputs = n.outputs.map((i) => {
    const o = rn(i);
    switch (o.type) {
      case Ee.Contract:
        return o.balanceRoot = Se, o.stateRoot = Se, o;
      case Ee.Change:
        return o.amount = x(0), o;
      case Ee.Variable:
        return o.to = Se, o.amount = x(0), o.assetId = Se, o;
      default:
        return o;
    }
  }), n.witnessesCount = 0, n.witnesses = [];
  const r = eh(t), s = re([r, new Nn().encode(n)]);
  return It(s);
}
var ny = (e) => {
  const t = new Uint8Array(32);
  return t.set(X(e)), t;
}, ry = (e) => {
  let t, n;
  return Array.isArray(e) ? (t = e[0], n = e[1]) : (t = e.key, n = e.value), {
    key: Z(t),
    value: Z(ny(n))
  };
}, Ao = class extends Pr {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: t, salt: n, storageSlots: r, ...s }) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Le.Create);
    /** Witness index of contract bytecode to create */
    D(this, "bytecodeWitnessIndex");
    /** Salt */
    D(this, "salt");
    /** List of storage slots to initialize */
    D(this, "storageSlots");
    this.bytecodeWitnessIndex = t ?? 0, this.salt = Z(n ?? Se), this.storageSlots = [...r ?? []];
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
    const t = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, r = ((s = this.storageSlots) == null ? void 0 : s.map(ry)) ?? [];
    return {
      type: Le.Create,
      ...t,
      bytecodeWitnessIndex: n,
      storageSlotsCount: x(r.length),
      salt: this.salt ? Z(this.salt) : Se,
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
      (t) => t.type === Ee.ContractCreated
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
    return O0(this, t);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(t, n) {
    this.pushOutput({
      type: Ee.ContractCreated,
      contractId: t,
      stateRoot: n
    });
  }
  metadataGas(t) {
    return T0({
      contractBytesSize: x(X(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: t,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, Mc = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: X("0x24000000"),
  encodeScriptData: () => new Uint8Array(0)
}, sy = {
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
  bytes: X("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: () => new Uint8Array(0)
}, $n = class extends Pr {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: t, scriptData: n, gasLimit: r, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Le.Script);
    /** Gas limit for transaction */
    D(this, "gasLimit");
    /** Script to execute */
    D(this, "script");
    /** Script input data (parameters) */
    D(this, "scriptData");
    D(this, "abis");
    this.gasLimit = x(r), this.script = X(t ?? Mc.bytes), this.scriptData = X(n ?? Mc.encodeScriptData()), this.abis = s.abis;
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
    const t = X(this.script ?? "0x"), n = X(this.scriptData ?? "0x");
    return {
      type: Le.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: x(t.length),
      scriptDataLength: x(n.length),
      receiptsRoot: Se,
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
      (t) => t.type === Ee.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (t) => t.type === Ee.Variable
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
        type: Ee.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  calculateMaxGas(t, n) {
    const { consensusParameters: r } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = r, o = this.toTransaction().witnesses.reduce(
      (c, A) => c + A.dataLength,
      0
    );
    return ia({
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
    const n = _r(t);
    if (this.getContractInputs().find((s) => s.contractId === n.toB256()))
      return this;
    const r = super.pushInput({
      type: me.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: Ee.Contract,
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
    return O0(this, t);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(t, n) {
    const r = new an(t);
    return this.scriptData = r.functions.main.encodeArguments(n), this;
  }
  metadataGas(t) {
    return F0({
      gasCosts: t,
      txBytesSize: this.byteSize()
    });
  }
}, xt = (e) => {
  if (e instanceof $n || e instanceof Ao)
    return e;
  const { type: t } = e;
  switch (e.type) {
    case Le.Script:
      return $n.from(e);
    case Le.Create:
      return Ao.from(e);
    default:
      throw new _(N.INVALID_TRANSACTION_TYPE, `Invalid transaction type: ${t}.`);
  }
}, iy = (e) => {
  var L;
  const {
    gasPrice: t,
    rawPayload: n,
    tip: r,
    totalFee: s,
    consensusParameters: { gasCosts: i, feeParams: o, maxGasPerTx: c }
  } = e;
  if (s)
    return s;
  const A = x(o.gasPerByte), f = x(o.gasPriceFactor), I = X(n), [w] = new Nn().decode(I, 0), { type: C, witnesses: v, inputs: R, policies: B } = w;
  let M = x(0), T = x(0);
  if (C !== Le.Create && C !== Le.Script)
    return x(0);
  if (C === Le.Create) {
    const { bytecodeWitnessIndex: U, storageSlots: j } = w, H = x(X(v[U].data).length);
    M = T0({
      contractBytesSize: H,
      gasCosts: i,
      stateRootSize: j.length || 0,
      txBytesSize: I.length
    });
  } else {
    const { scriptGasLimit: U } = w;
    U && (T = U), M = F0({
      gasCosts: i,
      txBytesSize: I.length
    });
  }
  const V = Q0({
    gasCosts: i,
    gasPerByte: x(A),
    inputs: R,
    metadataGas: M,
    txBytesSize: I.length
  }), k = (L = B.find((U) => U.type === Ft.WitnessLimit)) == null ? void 0 : L.data, J = v.reduce((U, j) => U + j.dataLength, 0), O = ia({
    gasPerByte: A,
    minGas: V,
    witnessesLength: J,
    gasLimit: T,
    witnessLimit: k,
    maxGasPerTx: c
  });
  return co({
    gasPrice: t,
    gas: O,
    priceFactor: f,
    tip: r
  });
}, oy = ({ abi: e, receipt: t, rawPayload: n, maxInputs: r }) => {
  var w;
  const s = new an(e), i = t.param1.toHex(8), o = s.getFunction(i), c = o.jsonFn.inputs;
  let A;
  if (o.isInputDataPointer) {
    if (n) {
      const C = x(t.param2).sub(js({ maxInputs: r.toNumber() })).toNumber();
      A = `0x${n.slice(2).slice(C * 2)}`;
    }
  } else
    A = t.param2.toHex();
  let f;
  if (A) {
    const C = o.decodeArguments(A);
    C && (f = c.reduce((v, R, B) => {
      const M = C[B], T = R.name;
      return T ? {
        ...v,
        // reparse to remove bn
        [T]: JSON.parse(JSON.stringify(M))
      } : v;
    }, {}));
  }
  return {
    functionSignature: o.signature,
    functionName: o.name,
    argumentsProvided: f,
    ...(w = t.amount) != null && w.isZero() ? {} : { amount: t.amount, assetId: t.assetId }
  };
};
function ay(e, t) {
  return e.filter((n) => t.includes(n.type));
}
function aa(e, t) {
  return e.filter((n) => n.type === t);
}
function cy(e) {
  return aa(e, me.Coin);
}
function dy(e) {
  return aa(e, me.Message);
}
function uy(e) {
  return ay(e, [me.Coin, me.Message]);
}
function Ay(e) {
  return aa(e, me.Contract);
}
function L0(e, t) {
  const n = cy(e), r = dy(e), s = n.find((o) => o.assetId === t), i = r.find(
    (o) => t === "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  return s || i;
}
function ly(e, t) {
  if (t == null)
    return;
  const n = e == null ? void 0 : e[t];
  if (n) {
    if (n.type !== me.Contract)
      throw new _(
        N.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return n;
  }
}
function ca(e) {
  return e.type === me.Coin ? e.owner.toString() : e.type === me.Message ? e.recipient.toString() : "";
}
function ts(e, t) {
  return e.filter((n) => n.type === t);
}
function fy(e) {
  return ts(e, Ee.ContractCreated);
}
function k0(e) {
  return ts(e, Ee.Coin);
}
function hy(e) {
  return ts(e, Ee.Change);
}
function gy(e) {
  return ts(e, Ee.Contract);
}
function xb(e) {
  return ts(e, Ee.Variable);
}
var py = /* @__PURE__ */ ((e) => (e.Create = "Create", e.Mint = "Mint", e.Script = "Script", e.Upgrade = "Upgrade", e.Upload = "Upload", e))(py || {}), my = /* @__PURE__ */ ((e) => (e.submitted = "submitted", e.success = "success", e.squeezedout = "squeezedout", e.failure = "failure", e))(my || {}), wy = /* @__PURE__ */ ((e) => (e.payBlockProducer = "Pay network fee to block producer", e.contractCreated = "Contract created", e.transfer = "Transfer asset", e.contractCall = "Contract call", e.receive = "Receive asset", e.mint = "Mint asset", e.predicatecall = "Predicate call", e.script = "Script", e.sent = "Sent asset", e.withdrawFromFuel = "Withdraw from Fuel", e))(wy || {}), yy = /* @__PURE__ */ ((e) => (e[e.contract = 0] = "contract", e[e.account = 1] = "account", e))(yy || {}), Iy = /* @__PURE__ */ ((e) => (e.ethereum = "ethereum", e.fuel = "fuel", e))(Iy || {});
function Ur(e, t) {
  return (e ?? []).filter((n) => n.type === t);
}
function P0(e) {
  switch (e) {
    case Le.Mint:
      return "Mint";
    case Le.Create:
      return "Create";
    case Le.Script:
      return "Script";
    default:
      throw new _(
        N.INVALID_TRANSACTION_TYPE,
        `Invalid transaction type: ${e}.`
      );
  }
}
function ns(e, t) {
  return P0(e) === t;
}
function by(e) {
  return ns(
    e,
    "Mint"
    /* Mint */
  );
}
function U0(e) {
  return ns(
    e,
    "Create"
    /* Create */
  );
}
function G0(e) {
  return ns(
    e,
    "Script"
    /* Script */
  );
}
function Ey(e) {
  return ns(
    e,
    "Upgrade"
    /* Upgrade */
  );
}
function Cy(e) {
  return ns(
    e,
    "Upload"
    /* Upload */
  );
}
function _b(e) {
  return (t) => e.assetId === t.assetId;
}
function By(e) {
  return Ur(e, ue.Call);
}
function xy(e) {
  return Ur(e, ue.MessageOut);
}
var _y = (e, t) => {
  const n = e.assetsSent || [], r = t.assetsSent || [], s = r.filter(
    (o) => !n.some((c) => c.assetId === o.assetId)
  );
  return n.map((o) => {
    const c = r.find((f) => f.assetId === o.assetId);
    if (!c)
      return o;
    const A = x(o.amount).add(c.amount);
    return { ...o, amount: A };
  }).concat(s);
};
function vy(e, t) {
  var n, r, s, i, o, c, A, f;
  return e.name === t.name && ((n = e.from) == null ? void 0 : n.address) === ((r = t.from) == null ? void 0 : r.address) && ((s = e.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((o = e.from) == null ? void 0 : o.type) === ((c = t.from) == null ? void 0 : c.type) && ((A = e.to) == null ? void 0 : A.type) === ((f = t.to) == null ? void 0 : f.type);
}
function hr(e, t) {
  var s, i, o;
  const n = [...e], r = n.findIndex((c) => vy(c, t));
  if (n[r]) {
    const c = { ...n[r] };
    (s = t.assetsSent) != null && s.length && (c.assetsSent = (i = c.assetsSent) != null && i.length ? _y(c, t) : t.assetsSent), (o = t.calls) != null && o.length && (c.calls = [...c.calls || [], ...t.calls]), n[r] = c;
  } else
    n.push(t);
  return n;
}
function vb(e) {
  return Ur(e, ue.TransferOut);
}
function Ry({
  inputs: e,
  receipts: t
}) {
  return xy(t).reduce(
    (s, i) => {
      const o = "0x0000000000000000000000000000000000000000000000000000000000000000", c = L0(e, o);
      if (c) {
        const A = ca(c);
        return hr(s, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: A
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
function Ny({
  inputs: e,
  outputs: t,
  receipts: n,
  abiMap: r,
  rawPayload: s,
  maxInputs: i
}) {
  const o = By(n);
  return gy(t).reduce((f, I) => {
    const w = ly(e, I.inputIndex);
    return w ? o.reduce((v, R) => {
      var B;
      if (R.to === w.contractID) {
        const M = L0(e, R.assetId);
        if (M) {
          const T = ca(M), V = [], k = r == null ? void 0 : r[w.contractID];
          return k && V.push(
            oy({
              abi: k,
              receipt: R,
              rawPayload: s,
              maxInputs: i
            })
          ), hr(v, {
            name: "Contract call",
            from: {
              type: 1,
              address: T
            },
            to: {
              type: 0,
              address: R.to
            },
            // if no amount is forwarded to the contract, skip showing assetsSent
            assetsSent: (B = R.amount) != null && B.isZero() ? void 0 : [
              {
                amount: R.amount,
                assetId: R.assetId
              }
            ],
            calls: V
          });
        }
      }
      return v;
    }, f) : f;
  }, []);
}
function Sy(e, t, n) {
  const { to: r, assetId: s, amount: i } = e;
  let { from: o } = e;
  const c = t.some((f) => f.contractID === r) ? 0 : 1;
  if (Se === o) {
    const f = n.find((I) => I.assetId === s);
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
function Oc({
  inputs: e,
  outputs: t,
  receipts: n
}) {
  let r = [];
  const s = k0(t), i = Ay(e), o = hy(t);
  s.forEach((f) => {
    const { amount: I, assetId: w, to: C } = f, v = o.find((R) => R.assetId === w);
    v && (r = hr(r, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: v.to
      },
      to: {
        type: 1,
        address: C
      },
      assetsSent: [
        {
          assetId: w,
          amount: I
        }
      ]
    }));
  });
  const c = Ur(
    n,
    ue.Transfer
  ), A = Ur(
    n,
    ue.TransferOut
  );
  return [...c, ...A].forEach((f) => {
    const I = Sy(f, i, o);
    r = hr(r, I);
  }), r;
}
function Dy(e) {
  return k0(e).reduce((r, s) => hr(r, {
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
  const n = fy(t), r = uy(e)[0], s = ca(r);
  return n.reduce((o, c) => hr(o, {
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
function Ty({
  transactionType: e,
  inputs: t,
  outputs: n,
  receipts: r,
  abiMap: s,
  rawPayload: i,
  maxInputs: o
}) {
  return U0(e) ? [
    ...Qy({ inputs: t, outputs: n }),
    ...Oc({ inputs: t, outputs: n, receipts: r })
  ] : G0(e) ? [
    ...Oc({ inputs: t, outputs: n, receipts: r }),
    ...Ny({
      inputs: t,
      outputs: n,
      receipts: r,
      abiMap: s,
      rawPayload: i,
      maxInputs: o
    }),
    ...Ry({ inputs: t, receipts: r })
  ] : [...Dy(n)];
}
var yn = (e) => {
  const t = Hw(e);
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
}, Fy = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Mint && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, My = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.type === ue.Burn && t.push({
      subId: n.subId,
      contractId: n.contractId,
      assetId: n.assetId,
      amount: n.val
    });
  }), t;
}, Oy = (e) => {
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
      throw new _(
        N.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${e}.`
      );
  }
}, Ly = (e) => {
  let t, n, r, s, i, o = !1, c = !1, A = !1;
  if (e != null && e.type)
    switch (r = Oy(e.type), e.type) {
      case "SuccessStatus":
        t = e.time, n = e.block.id, c = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "FailureStatus":
        t = e.time, n = e.block.id, o = !0, s = x(e.totalFee), i = x(e.totalGas);
        break;
      case "SubmittedStatus":
        t = e.time, A = !0;
        break;
    }
  return {
    time: t,
    blockId: n,
    status: r,
    totalFee: s,
    totalGas: i,
    isStatusFailure: o,
    isStatusSuccess: c,
    isStatusPending: A
  };
};
function si(e) {
  var a, d;
  const {
    id: t,
    receipts: n,
    gasPerByte: r,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: o,
    gqlTransactionStatus: c,
    abiMap: A = {},
    maxInputs: f,
    gasCosts: I,
    maxGasPerTx: w,
    gasPrice: C
  } = e, v = D0(n), R = Z(o), B = Ty({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: n,
    rawPayload: R,
    abiMap: A,
    maxInputs: f
  }), M = P0(i.type), T = x((d = (a = i.policies) == null ? void 0 : a.find((l) => l.type === Ft.Tip)) == null ? void 0 : d.data), { isStatusFailure: V, isStatusPending: k, isStatusSuccess: J, blockId: O, status: F, time: L, totalFee: U } = Ly(c), j = iy({
    totalFee: U,
    gasPrice: C,
    rawPayload: R,
    tip: T,
    consensusParameters: {
      gasCosts: I,
      maxGasPerTx: w,
      feeParams: {
        gasPerByte: r,
        gasPriceFactor: s
      }
    }
  }), H = Fy(n), Y = My(n);
  let ee;
  return L && (ee = wo.fromTai64(L)), {
    id: t,
    tip: T,
    fee: j,
    gasUsed: v,
    operations: B,
    type: M,
    blockId: O,
    time: L,
    status: F,
    receipts: n,
    mintedAssets: H,
    burnedAssets: Y,
    isTypeMint: by(i.type),
    isTypeCreate: U0(i.type),
    isTypeScript: G0(i.type),
    isTypeUpgrade: Ey(i.type),
    isTypeUpload: Cy(i.type),
    isStatusFailure: V,
    isStatusSuccess: J,
    isStatusPending: k,
    date: ee,
    transaction: i
  };
}
function V0(e, t, n = {}) {
  return e.reduce((r, s) => {
    if (s.type === ue.LogData || s.type === ue.Log) {
      const i = new an(n[s.id] || t), o = s.type === ue.Log ? new S("u64").encode(s.val0) : s.data, [c] = i.decodeLog(o, s.val1.toNumber());
      r.push(c);
    }
    return r;
  }, []);
}
var Rs = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(e, t, n) {
    /** Transaction ID */
    D(this, "id");
    /** Current provider */
    D(this, "provider");
    /** Gas used on the transaction */
    D(this, "gasUsed", x(0));
    /** The graphql Transaction with receipts object. */
    D(this, "gqlTransaction");
    D(this, "abis");
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
    const r = new Rs(e, t, n);
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
    return (t = new Nn().decode(
      X(e.rawPayload),
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
    const s = r.map(yn) || [], { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = this.provider.getGasConfig(), f = await this.provider.getLatestGasPrice(), I = this.provider.getChain().consensusParameters.txParameters.maxInputs;
    return si({
      id: this.id,
      receipts: s,
      transaction: n,
      transactionBytes: X(t.rawPayload),
      gqlTransactionStatus: t.status,
      gasPerByte: i,
      gasPriceFactor: o,
      abiMap: e,
      maxInputs: I,
      gasCosts: c,
      maxGasPerTx: A,
      gasPrice: f
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
        throw new _(
          N.TRANSACTION_SQUEEZED_OUT,
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
    if (this.abis && (r = V0(
      t.receipts,
      this.abis.main,
      this.abis.otherContractsAbis
    ), n.logs = r), n.isStatusFailure) {
      const {
        receipts: s,
        gqlTransaction: { status: i }
      } = n;
      throw M0({
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
function ky(e, t) {
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
function H0(e, t, n = 0) {
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
      const A = ky(t, c);
      return await Jw(A), H0(e, t, c)(...r);
    }
  };
}
var Py = (...e) => {
  const t = {};
  function n({ amount: r, assetId: s }) {
    t[s] ? t[s] = t[s].add(r) : t[s] = r;
  }
  return e.forEach((r) => r.forEach(n)), Object.entries(t).map(([r, s]) => ({ assetId: r, amount: s }));
}, Lc = 10, Uy = (e) => {
  const { name: t, daHeight: n, consensusParameters: r, latestBlock: s } = e, {
    contractParams: i,
    feeParams: o,
    predicateParams: c,
    scriptParams: A,
    txParams: f,
    gasCosts: I,
    baseAssetId: w,
    chainId: C,
    version: v
  } = r;
  return {
    name: t,
    baseChainHeight: x(n),
    consensusParameters: {
      version: v,
      chainId: x(C),
      baseAssetId: w,
      feeParameters: {
        version: o.version,
        gasPerByte: x(o.gasPerByte),
        gasPriceFactor: x(o.gasPriceFactor)
      },
      contractParameters: {
        version: i.version,
        contractMaxSize: x(i.contractMaxSize),
        maxStorageSlots: x(i.maxStorageSlots)
      },
      txParameters: {
        version: f.version,
        maxInputs: x(f.maxInputs),
        maxOutputs: x(f.maxOutputs),
        maxWitnesses: x(f.maxWitnesses),
        maxGasPerTx: x(f.maxGasPerTx),
        maxSize: x(f.maxSize),
        maxBytecodeSubsections: x(f.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: c.version,
        maxPredicateLength: x(c.maxPredicateLength),
        maxPredicateDataLength: x(c.maxPredicateDataLength),
        maxGasPerPredicate: x(c.maxGasPerPredicate),
        maxMessageDataLength: x(c.maxMessageDataLength)
      },
      scriptParameters: {
        version: A.version,
        maxScriptLength: x(A.maxScriptLength),
        maxScriptDataLength: x(A.maxScriptDataLength)
      },
      gasCosts: I
    },
    latestBlock: {
      id: s.id,
      height: x(s.height),
      time: s.header.time,
      transactions: s.transactions.map((R) => ({
        id: R.id
      }))
    }
  };
}, lo, X0, Xt = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(e, t = {}) {
    this.url = e, wn(this, lo), Fe(this, "operations"), Fe(this, "cache"), Fe(this, "options", {
      timeout: void 0,
      cacheUtxo: void 0,
      fetch: void 0,
      retryOptions: void 0
    }), this.options = { ...this.options, ...t }, this.url = e, this.operations = this.createOperations(), this.cache = t.cacheUtxo ? new Lw(t.cacheUtxo) : void 0;
  }
  static clearChainAndNodeCaches() {
    Xt.nodeInfoCache = {}, Xt.chainInfoCache = {};
  }
  static getFetchFn(e) {
    const { retryOptions: t, timeout: n } = e;
    return H0(async (...r) => {
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
      throw new _(
        N.CHAIN_INFO_CACHE_EMPTY,
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
      throw new _(
        N.NODE_INFO_CACHE_EMPTY,
        "Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider."
      );
    return e;
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  getGasConfig() {
    const {
      txParameters: { maxGasPerTx: e },
      predicateParameters: { maxGasPerPredicate: t },
      feeParameters: { gasPriceFactor: n, gasPerByte: r },
      gasCosts: s
    } = this.getChain().consensusParameters;
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
    return Xt.ensureClientVersionIsSupported(t), {
      chain: e,
      nodeInfo: t
    };
  }
  static ensureClientVersionIsSupported(e) {
    const { isMajorSupported: t, isMinorSupported: n, supportedVersion: r } = CA(e.nodeVersion);
    if (!t || !n)
      throw new _(
        _.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${e.nodeVersion}, Supported version: ${r}`
      );
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  createOperations() {
    const e = Xt.getFetchFn(this.options), t = new fp.GraphQLClient(this.url, {
      fetch: (r, s) => e(r, s, this.options),
      responseMiddleware: (r) => {
        if ("response" in r) {
          const s = r.response;
          if (Array.isArray(s == null ? void 0 : s.errors))
            throw new _(
              _.CODES.INVALID_REQUEST,
              s.errors.map((i) => i.message).join(`

`)
            );
        }
      }
    });
    return Mw((r, s) => {
      const i = r.definitions.find((c) => c.kind === "OperationDefinition");
      return (i == null ? void 0 : i.operation) === "subscription" ? new S0({
        url: this.url,
        query: r,
        fetchFn: (c, A) => e(c, A, this.options),
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
    return x(e.latestBlock.height, 10);
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
      nodeVersion: e.nodeVersion,
      utxoValidation: e.utxoValidation,
      vmBacktrace: e.vmBacktrace
    };
    return Xt.nodeInfoCache[this.url] = t, t;
  }
  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain() {
    const { chain: e } = await this.operations.getChain(), t = Uy(e);
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
    ao(this, lo, X0).call(this, r.inputs), t && await this.estimateTxDependencies(r);
    const s = Z(r.toTransactionBytes());
    let i;
    if (r.type === Le.Script && (i = r.abis), n) {
      const c = this.operations.submitAndAwait({ encodedTransaction: s });
      for await (const { submitAndAwait: I } of c) {
        if (I.type === "SqueezedOutStatus")
          throw new _(
            N.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${I.reason}`
          );
        if (I.type !== "SubmittedStatus")
          break;
      }
      const A = r.getTransactionId(this.getChainId()), f = new Rs(A, this, i);
      return await f.fetch(), f;
    }
    const {
      submit: { id: o }
    } = await this.operations.submit({ encodedTransaction: s });
    return new Rs(o, this, i);
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
    return { receipts: o.map(yn), dryRunStatus: c };
  }
  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(e) {
    if (!!!e.inputs.find(
      (i) => "predicate" in i && i.predicate && !ku(X(i.predicate), X("0x")) && new Oe(i.predicateGasUsed).isZero()
    ))
      return e;
    const n = Z(e.toTransactionBytes()), r = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), {
      estimatePredicates: { inputs: s }
    } = r;
    return s && s.forEach((i, o) => {
      "predicateGasUsed" in i && x(i.predicateGasUsed).gt(0) && (e.inputs[o].predicateGasUsed = i.predicateGasUsed);
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
    if (e.type === Le.Create)
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let t = [];
    const n = [];
    let r = 0, s;
    for (let i = 0; i < Lc; i++) {
      const {
        dryRun: [{ receipts: o, status: c }]
      } = await this.operations.dryRun({
        encodedTransactions: [Z(e.toTransactionBytes())],
        utxoValidation: !1
      });
      t = o.map(yn), s = c;
      const { missingOutputVariables: A, missingOutputContractIds: f } = Tc(t);
      if (A.length !== 0 || f.length !== 0) {
        r += A.length, e.addVariableOutputs(A.length), f.forEach(({ contractId: C }) => {
          e.addContractInputAndOutput(Ae.fromString(C)), n.push(C);
        });
        const { maxFee: w } = await this.estimateTxGasAndFee({
          transactionRequest: e
        });
        e.maxFee = w;
      } else
        break;
    }
    return {
      receipts: t,
      outputVariables: r,
      missingContractIds: n,
      dryRunStatus: s
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
      dryRunStatus: void 0
    })), n = rn(e), r = /* @__PURE__ */ new Map();
    n.forEach((o, c) => {
      o.type === Le.Script && r.set(c, Z(o.toTransactionBytes()));
    });
    let s = Array.from(r.keys()), i = 0;
    for (; s.length > 0 && i < Lc; ) {
      const o = s.map(
        (f) => r.get(f)
      ), c = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), A = [];
      for (let f = 0; f < c.dryRun.length; f++) {
        const I = s[f], { receipts: w, status: C } = c.dryRun[f], v = t[I];
        v.receipts = w.map(yn), v.dryRunStatus = C;
        const { missingOutputVariables: R, missingOutputContractIds: B } = Tc(
          v.receipts
        ), M = R.length > 0 || B.length > 0, T = n[I];
        if (M && (T == null ? void 0 : T.type) === Le.Script) {
          v.outputVariables += R.length, T.addVariableOutputs(R.length), B.forEach(({ contractId: k }) => {
            T.addContractInputAndOutput(Ae.fromString(k)), v.missingContractIds.push(k);
          });
          const { maxFee: V } = await this.estimateTxGasAndFee({
            transactionRequest: T
          });
          T.maxFee = V, r.set(I, Z(T.toTransactionBytes())), A.push(I);
        }
      }
      s = A, i += 1;
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
    return s.map(({ receipts: o, status: c }) => ({ receipts: o.map(yn), dryRunStatus: c }));
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
    const c = co({
      gasPrice: x(n),
      gas: o,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    let A = x(0);
    t.type === Le.Script && (A = t.gasLimit, t.gasLimit.eq(0) && (t.gasLimit = o, t.gasLimit = i.sub(
      t.calculateMaxGas(r, o)
    ), A = t.gasLimit));
    const f = t.calculateMaxGas(r, o), I = co({
      gasPrice: x(n),
      gas: f,
      priceFactor: s,
      tip: t.tip
    }).add(1);
    return {
      minGas: o,
      minFee: c,
      maxGas: f,
      maxFee: I,
      gasPrice: n,
      gasLimit: A
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
      const { id: c, receipts: A, status: f } = o, I = A.map(yn);
      return { id: c, receipts: I, status: f };
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
    const s = rn(xt(e)), i = s.type === Le.Script, o = this.getBaseAssetId(), c = s.getCoinOutputsQuantities(), A = Py(c, r);
    s.fundWithFakeUtxos(A, o, t == null ? void 0 : t.address), s.maxFee = x(0), i && (s.gasLimit = x(0)), t && "populateTransactionPredicateData" in t && t.populateTransactionPredicateData(s);
    const f = rn(s);
    let I = 0;
    if (n && i) {
      const F = f.witnesses.length;
      await n(f), I = f.witnesses.length - F;
    }
    await this.estimatePredicates(f);
    let { maxFee: w, maxGas: C, minFee: v, minGas: R, gasPrice: B, gasLimit: M } = await this.estimateTxGasAndFee({
      transactionRequest: f
    }), T = [], V, k = [], J = 0, O = x(0);
    return s.updatePredicateGasUsed(f.inputs), s.maxFee = w, i && (s.gasLimit = M, n && await n(s), { receipts: T, missingContractIds: k, outputVariables: J, dryRunStatus: V } = await this.estimateTxDependencies(s), O = i ? D0(T) : O, s.gasLimit = O, { maxFee: w, maxGas: C, minFee: v, minGas: R, gasPrice: B } = await this.estimateTxGasAndFee({
      transactionRequest: s,
      gasPrice: B
    })), {
      requiredQuantities: A,
      receipts: T,
      gasUsed: O,
      gasPrice: B,
      minGas: R,
      maxGas: C,
      minFee: v,
      maxFee: w,
      outputVariables: J,
      missingContractIds: k,
      addedSignatures: I,
      estimatedPredicates: s.inputs,
      dryRunStatus: V
    };
  }
  async getResourcesForTransaction(e, t, n = []) {
    const r = Ae.fromAddressOrString(e), s = xt(rn(t)), i = await this.getTransactionCost(s, {
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
    const r = Ae.fromAddressOrString(e);
    return (await this.operations.getCoins({
      first: 10,
      ...n,
      filter: { owner: r.toB256(), assetId: t && Z(t) }
    })).coins.edges.map((o) => o.node).map((o) => ({
      id: o.utxoId,
      assetId: o.assetId,
      amount: x(o.amount),
      owner: Ae.fromAddressOrString(o.owner),
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
    var A, f, I;
    const r = Ae.fromAddressOrString(e), s = {
      messages: ((A = n == null ? void 0 : n.messages) == null ? void 0 : A.map((w) => Z(w))) || [],
      utxos: ((f = n == null ? void 0 : n.utxos) == null ? void 0 : f.map((w) => Z(w))) || []
    };
    if (this.cache) {
      const w = new Set(
        s.utxos.concat((I = this.cache) == null ? void 0 : I.getActiveData().map((C) => Z(C)))
      );
      s.utxos = Array.from(w);
    }
    const i = {
      owner: r.toB256(),
      queryPerAsset: t.map(ra).map(({ assetId: w, amount: C, max: v }) => ({
        assetId: Z(w),
        amount: C.toString(10),
        max: v ? v.toString(10) : void 0
      })),
      excludedIds: s
    };
    return (await this.operations.getCoinsToSpend(i)).coinsToSpend.flat().map((w) => {
      switch (w.__typename) {
        case "MessageCoin":
          return {
            amount: x(w.amount),
            assetId: w.assetId,
            daHeight: x(w.daHeight),
            sender: Ae.fromAddressOrString(w.sender),
            recipient: Ae.fromAddressOrString(w.recipient),
            nonce: w.nonce
          };
        case "Coin":
          return {
            id: w.utxoId,
            amount: x(w.amount),
            assetId: w.assetId,
            owner: Ae.fromAddressOrString(w.owner),
            blockCreated: x(w.blockCreated),
            txCreatedIdx: x(w.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((w) => !!w);
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
      height: x(n.height),
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
      height: x(r.height),
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
      height: x(n.height, 10),
      time: n.header.time,
      transactionIds: n.transactions.map((r) => r.id),
      transactions: n.transactions.map(
        (r) => {
          var s;
          return (s = new Nn().decode(X(r.rawPayload), 0)) == null ? void 0 : s[0];
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
    return t ? (n = new Nn().decode(
      X(t.rawPayload),
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
      contract: Ae.fromAddressOrString(e).toB256(),
      asset: Z(t)
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
      owner: Ae.fromAddressOrString(e).toB256(),
      assetId: Z(t)
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
      filter: { owner: Ae.fromAddressOrString(e).toB256() }
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
      owner: Ae.fromAddressOrString(e).toB256()
    })).messages.edges.map((s) => s.node).map((s) => ({
      messageId: Mr.getMessageId({
        sender: s.sender,
        recipient: s.recipient,
        nonce: s.nonce,
        amount: x(s.amount),
        data: s.data
      }),
      sender: Ae.fromAddressOrString(s.sender),
      recipient: Ae.fromAddressOrString(s.recipient),
      nonce: s.nonce,
      amount: x(s.amount),
      data: Mr.decodeData(s.data),
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
      throw new _(
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
      commitBlockHeader: A,
      blockProof: f,
      sender: I,
      recipient: w,
      amount: C,
      data: v
    } = i.messageProof;
    return {
      messageProof: {
        proofIndex: x(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: x(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: c.id,
        daHeight: x(c.daHeight),
        transactionsCount: Number(c.transactionsCount),
        transactionsRoot: c.transactionsRoot,
        height: x(c.height),
        prevRoot: c.prevRoot,
        time: c.time,
        applicationHash: c.applicationHash,
        messageReceiptCount: Number(c.messageReceiptCount),
        messageOutboxRoot: c.messageOutboxRoot,
        consensusParametersVersion: Number(c.consensusParametersVersion),
        eventInboxRoot: c.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(c.stateTransitionBytecodeVersion)
      },
      commitBlockHeader: {
        id: A.id,
        daHeight: x(A.daHeight),
        transactionsCount: Number(A.transactionsCount),
        transactionsRoot: A.transactionsRoot,
        height: x(A.height),
        prevRoot: A.prevRoot,
        time: A.time,
        applicationHash: A.applicationHash,
        messageReceiptCount: Number(A.messageReceiptCount),
        messageOutboxRoot: A.messageOutboxRoot,
        consensusParametersVersion: Number(A.consensusParametersVersion),
        eventInboxRoot: A.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(A.stateTransitionBytecodeVersion)
      },
      sender: Ae.fromAddressOrString(I),
      recipient: Ae.fromAddressOrString(w),
      nonce: t,
      amount: x(C),
      data: v
    };
  }
  async getLatestGasPrice() {
    const { latestGasPrice: e } = await this.operations.getLatestGasPrice();
    return x(e.gasPrice);
  }
  async estimateGasPrice(e) {
    const { estimateGasPrice: t } = await this.operations.estimateGasPrice({
      blockHorizon: String(e)
    });
    return x(t.gasPrice);
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
      blocksToProduce: x(e).toString(10),
      startTimestamp: t ? wo.fromUnixMilliseconds(t).toTai64() : void 0
    });
    return x(n);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(e) {
    return new Rs(e, this);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object.
   */
  async getMessageByNonce(e) {
    const { message: t } = await this.operations.getMessageByNonce({ nonce: e });
    return t || null;
  }
  async getRelayedTransactionStatus(e) {
    const { relayedTransactionStatus: t } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId: e
    });
    return t || null;
  }
}, Us = Xt;
lo = /* @__PURE__ */ new WeakSet();
X0 = function(e) {
  this.cache && e.forEach((t) => {
    var n;
    t.type === me.Coin && ((n = this.cache) == null || n.set(t.id));
  });
};
Fe(Us, "chainInfoCache", {});
Fe(Us, "nodeInfoCache", {});
async function Rb(e) {
  const { id: t, provider: n, abiMap: r } = e, { transaction: s } = await n.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new _(
      N.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new Nn().decode(
    X(s.rawPayload),
    0
  );
  let o = [];
  s != null && s.status && "receipts" in s.status && (o = s.status.receipts);
  const c = o.map(yn), {
    consensusParameters: {
      feeParameters: { gasPerByte: A, gasPriceFactor: f },
      txParameters: { maxInputs: I, maxGasPerTx: w },
      gasCosts: C
    }
  } = n.getChain(), v = await n.getLatestGasPrice(), R = si({
    id: s.id,
    receipts: c,
    transaction: i,
    transactionBytes: X(s.rawPayload),
    gqlTransactionStatus: s.status,
    gasPerByte: x(A),
    gasPriceFactor: x(f),
    abiMap: r,
    maxInputs: I,
    gasCosts: C,
    maxGasPerTx: w,
    gasPrice: v
  });
  return {
    gqlTransaction: s,
    ...R
  };
}
async function Nb(e) {
  const { provider: t, transactionRequest: n, abiMap: r } = e, { receipts: s } = await t.call(n), { gasPerByte: i, gasPriceFactor: o, gasCosts: c, maxGasPerTx: A } = t.getGasConfig(), f = t.getChain().consensusParameters.txParameters.maxInputs, I = n.toTransaction(), w = n.toTransactionBytes(), C = await t.getLatestGasPrice();
  return si({
    receipts: s,
    transaction: I,
    transactionBytes: w,
    abiMap: r,
    gasPerByte: i,
    gasPriceFactor: o,
    maxInputs: f,
    gasCosts: c,
    maxGasPerTx: A,
    gasPrice: C
  });
}
async function Sb(e) {
  const { filters: t, provider: n, abiMap: r } = e, { transactionsByOwner: s } = await n.operations.getTransactionsByOwner(t), { edges: i, pageInfo: o } = s, {
    consensusParameters: {
      feeParameters: { gasPerByte: c, gasPriceFactor: A },
      txParameters: { maxInputs: f, maxGasPerTx: I },
      gasCosts: w
    }
  } = n.getChain(), C = await n.getLatestGasPrice();
  return {
    transactions: i.map((R) => {
      const { node: B } = R, { id: M, rawPayload: T, status: V } = B, [k] = new Nn().decode(X(T), 0);
      let J = [];
      B != null && B.status && "receipts" in B.status && (J = B.status.receipts);
      const O = J.map(yn), F = si({
        id: M,
        receipts: O,
        transaction: k,
        transactionBytes: X(T),
        gqlTransactionStatus: V,
        abiMap: r,
        gasPerByte: c,
        gasPriceFactor: A,
        maxInputs: f,
        gasCosts: w,
        maxGasPerTx: I,
        gasPrice: C
      });
      return {
        gqlTransaction: B,
        ...F
      };
    }),
    pageInfo: o
  };
}
var Jn = {
  eth: {
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    beta5: 0,
    devnet: 10
  }
}, Gy = (e) => {
  if (e === "ethereum")
    return Jn.eth.sepolia;
  if (e === "fuel")
    return Jn.fuel.beta5;
}, Vy = ({
  asset: e,
  chainId: t,
  networkType: n
}) => e.networks.find(
  (s) => s.chainId === t && s.type === n
), Y0 = ({
  asset: e,
  chainId: t,
  networkType: n
}) => {
  const { networks: r, ...s } = e, i = t ?? Gy(n);
  if (i === void 0)
    return;
  const o = Vy({
    asset: e,
    chainId: i,
    networkType: n
  });
  if (o)
    return {
      ...s,
      ...o
    };
}, Db = (e, t) => Y0({
  asset: e,
  networkType: "ethereum",
  chainId: t
}), Qb = (e, t) => Y0({
  asset: e,
  networkType: "fuel",
  chainId: t
}), Hy = "/", Xy = /^\/|\/$/g, Yy = (e = "") => e.replace(Xy, "");
function zy(e, ...t) {
  const n = e != null, r = (e == null ? void 0 : e[0]) === "/" && e.length > 1, s = [e, ...t].filter(Boolean).map(Yy);
  return r && n && s.unshift(""), s.join(Hy);
}
function Tb(e, t = "./") {
  return e.map((n) => ({
    ...n,
    icon: zy(t, n.icon)
  }));
}
var Fb = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: Jn.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: Jn.eth.foundry,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: Jn.fuel.beta5,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        type: "fuel",
        chainId: Jn.fuel.devnet,
        decimals: 9,
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
], Zy = (e) => {
  const { assetId: t, amountToTransfer: n, hexlifiedContractId: r } = e, i = new S("u64").encode(new Oe(n).toNumber());
  return Uint8Array.from([
    ...X(r),
    ...i,
    ...X(t)
  ]);
}, Jy = async (e) => {
  const t = Zy(e);
  await ea();
  const n = Qp(16, 0, Fp.ScriptData), r = Ic(17, 16, 32), s = Nr(18, 17, 0), i = Ic(19, 17, 8), o = Sp(16, 18, 19), c = a0(1);
  return { script: Uint8Array.from([
    ...n.to_bytes(),
    ...r.to_bytes(),
    ...s.to_bytes(),
    ...i.to_bytes(),
    ...o.to_bytes(),
    ...c.to_bytes()
  ]), scriptData: t };
}, Wy = 2, ii = class extends Nu {
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
    this._provider = n, this._connector = r, this.address = Ae.fromDynamicInput(t);
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
      throw new _(N.MISSING_PROVIDER, "Provider not set");
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
      throw new _(
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
      throw new _(
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
      throw new _(
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
   * @param requiredQuantities - The coin quantities required to execute the transaction.
   * @param fee - The estimated transaction fee.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund(t, n) {
    var T;
    const { addedSignatures: r, estimatedPredicates: s, maxFee: i, requiredQuantities: o } = n, c = this.provider.getBaseAssetId(), A = ((T = o.find((V) => V.assetId === c)) == null ? void 0 : T.amount) || x(0), f = t, I = Om({
      amount: x(i),
      assetId: c,
      coinQuantities: o
    }), w = {};
    I.forEach(({ amount: V, assetId: k }) => {
      w[k] = {
        required: V,
        owned: x(0)
      };
    }), t.inputs.filter(fr).forEach((V) => {
      const J = yr(V) ? String(V.assetId) : c;
      w[J] && (w[J].owned = w[J].owned.add(V.amount));
    });
    let C = [];
    Object.entries(w).forEach(([V, { owned: k, required: J }]) => {
      k.lt(J) && C.push({
        assetId: V,
        amount: J.sub(k)
      });
    });
    let v = C.length > 0, R = 0;
    for (; v && R < Wy; ) {
      const V = await this.getResourcesToSpend(
        C,
        ey(t.inputs, this.address)
      );
      t.addResources(V), f.shiftPredicateData(), f.updatePredicateGasUsed(s);
      const k = rn(f);
      r && Array.from({ length: r }).forEach(
        () => k.addEmptyWitness()
      );
      const { maxFee: J } = await this.provider.estimateTxGasAndFee({
        transactionRequest: k
      }), O = Kw(
        t.inputs,
        c,
        c
      ), F = A.add(J);
      O.gt(F) ? v = !1 : C = [
        {
          amount: F.sub(O),
          assetId: c
        }
      ], R += 1;
    }
    f.shiftPredicateData(), f.updatePredicateGasUsed(s);
    const B = rn(f);
    r && Array.from({ length: r }).forEach(() => B.addEmptyWitness());
    const { maxFee: M } = await this.provider.estimateTxGasAndFee({
      transactionRequest: B
    });
    return f.maxFee = M, f;
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
    i.addCoinOutput(Ae.fromAddressOrString(t), n, o);
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
    if (x(n).lte(0))
      throw new _(
        N.INVALID_TRANSFER_AMOUNT,
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
    if (x(n).lte(0))
      throw new _(
        N.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
    const i = Ae.fromAddressOrString(t), o = r ?? this.provider.getBaseAssetId(), { script: c, scriptData: A } = await Jy({
      hexlifiedContractId: i.toB256(),
      amountToTransfer: x(n),
      assetId: o
    }), f = new $n({
      ...s,
      script: c,
      scriptData: A
    });
    f.addContractInputAndOutput(i);
    const I = await this.provider.getTransactionCost(f, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: x(n), assetId: String(o) }]
    });
    return this.validateGasLimitAndMaxFee({
      gasUsed: I.gasUsed,
      maxFee: I.maxFee,
      txParams: s
    }), f.gasLimit = I.gasUsed, f.maxFee = I.maxFee, await this.fund(f, I), this.sendTransaction(f);
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
    const s = Ae.fromAddressOrString(t), i = X(
      "0x".concat(s.toHexString().substring(2).padStart(64, "0"))
    ), o = X(
      "0x".concat(x(n).toHex().substring(2).padStart(16, "0"))
    ), A = { script: new Uint8Array([
      ...X(sy.bytes),
      ...i,
      ...o
    ]), ...r }, f = this.provider.getBaseAssetId(), I = new $n(A), w = [{ amount: x(n), assetId: f }], C = await this.provider.getTransactionCost(I, { quantitiesToContract: w });
    return this.validateGasLimitAndMaxFee({
      gasUsed: C.gasUsed,
      maxFee: C.maxFee,
      txParams: r
    }), I.maxFee = C.maxFee, I.gasLimit = C.gasUsed, await this.fund(I, C), this.sendTransaction(I);
  }
  async signMessage(t) {
    if (!this._connector)
      throw new _(N.MISSING_CONNECTOR, "A connector is required to sign messages.");
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
      throw new _(
        N.MISSING_CONNECTOR,
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
    if (On(t) && r.gt(t))
      throw new _(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${t}' is lower than the required: '${r}'.`
      );
    if (On(n) && s.gt(n))
      throw new _(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${n}' is lower than the required: '${s}'.`
      );
  }
}, gr = class {
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
    const t = Pt(e, 32);
    this.privateKey = Z(t), this.publicKey = Z(gn.getPublicKey(t, !1).slice(1)), this.compressedPublicKey = Z(gn.getPublicKey(t, !0)), this.address = Ae.fromPublicKey(this.publicKey);
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
    const t = gn.sign(X(e), X(this.privateKey)), n = Pt(`0x${t.r.toString(16)}`, 32), r = Pt(`0x${t.s.toString(16)}`, 32);
    return r[0] |= (t.recovery || 0) << 7, Z(re([n, r]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(e) {
    const t = gn.ProjectivePoint.fromHex(X(this.compressedPublicKey)), n = gn.ProjectivePoint.fromHex(X(e));
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
    const n = X(t), r = n.slice(0, 32), s = n.slice(32, 64), i = (s[0] & 128) >> 7;
    s[0] &= 127;
    const c = new gn.Signature(BigInt(Z(r)), BigInt(Z(s))).addRecoveryBit(
      i
    ).recoverPublicKey(X(e)).toRawBytes(!1).slice(1);
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
    return Ae.fromPublicKey(gr.recoverPublicKey(e, t));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(e) {
    return e ? on(re([Zt(32), X(e)])) : Zt(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(e) {
    const t = gn.ProjectivePoint.fromHex(X(e));
    return Z(t.toRawBytes(!1).slice(1));
  }
}, kc = 13, Pc = 8, Uc = 1, Fi = 32, jy = 16, Gc = (e) => /^0x/.test(e) ? e.slice(2) : e;
async function qy(e, t, n) {
  const r = En(Gc(e), "hex"), s = Ae.fromAddressOrString(t), i = Zt(Fi), o = Vd({
    password: En(n),
    salt: i,
    dklen: Fi,
    n: 2 ** kc,
    r: Pc,
    p: Uc
  }), c = Zt(jy), A = await Kf(r, o, c), f = Uint8Array.from([...o.subarray(16, 32), ...A]), I = Hd(f), w = xr(I, "hex"), C = {
    id: lm(),
    version: 3,
    address: Gc(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: w,
      cipherparams: { iv: xr(c, "hex") },
      ciphertext: xr(A, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Fi,
        n: 2 ** kc,
        p: Uc,
        r: Pc,
        salt: xr(i, "hex")
      }
    }
  };
  return JSON.stringify(C);
}
async function $y(e, t) {
  const n = JSON.parse(e), {
    crypto: {
      mac: r,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: o, n: c, r: A, p: f, salt: I }
    }
  } = n, w = En(s, "hex"), C = En(i, "hex"), v = En(I, "hex"), R = En(t), B = Vd({
    password: R,
    salt: v,
    n: c,
    p: f,
    r: A,
    dklen: o
  }), M = Uint8Array.from([...B.subarray(16, 32), ...w]), T = Hd(M), V = xr(T, "hex");
  if (r !== V)
    throw new _(
      N.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const k = await $f(w, B, C);
  return Z(k);
}
var z0 = class extends ii {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(t, n) {
    const r = new gr(t);
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
    const n = await this.signer().sign(th(t));
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
    return qy(this.privateKey, this.address, t);
  }
};
Fe(z0, "defaultPath", "m/44'/1179993420'/0'/0/0");
var fs = [
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
], Ky = /* @__PURE__ */ ((e) => (e.english = "english", e))(Ky || {});
function fo(e) {
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
        throw new _(
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
function eI(e) {
  return (1 << e) - 1;
}
function Z0(e) {
  return (1 << e) - 1 << 8 - e;
}
function Mi(e) {
  return Array.isArray(e) ? e : e.split(/\s+/);
}
function tI(e) {
  return Array.isArray(e) ? e.join(" ") : e;
}
function nI(e) {
  const t = [0];
  let n = 11;
  for (let i = 0; i < e.length; i += 1)
    n > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= e[i], n -= 8) : (t[t.length - 1] <<= n, t[t.length - 1] |= e[i] >> 8 - n, t.push(e[i] & eI(8 - n)), n += 3);
  const r = e.length / 4, s = X(It(e))[0] & Z0(r);
  return t[t.length - 1] <<= r, t[t.length - 1] |= s >> 8 - r, t;
}
function rI(e, t) {
  const n = Math.ceil(11 * e.length / 8), r = X(new Uint8Array(n));
  let s = 0;
  for (let f = 0; f < e.length; f += 1) {
    const I = t.indexOf(e[f].normalize("NFKD"));
    if (I === -1)
      throw new _(
        N.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${e[f]}' is not found in the provided wordlist.`
      );
    for (let w = 0; w < 11; w += 1)
      I & 1 << 10 - w && (r[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * e.length / 3, o = e.length / 3, c = Z0(o);
  if ((X(It(r.slice(0, i / 8)))[0] & c) !== (r[r.length - 1] & c))
    throw new _(
      N.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return r.slice(0, i / 8);
}
var sI = fo("Bitcoin seed"), iI = "0x0488ade4", oI = "0x04358394", Vc = [12, 15, 18, 21, 24];
function Hc(e) {
  if (e.length !== 2048)
    throw new _(
      N.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${e.length}.`
    );
}
function aI(e) {
  if (e.length % 4 !== 0 || e.length < 16 || e.length > 32)
    throw new _(
      N.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${e.length} bytes.`
    );
}
function Oi(e) {
  if (!Vc.includes(e.length)) {
    const t = `Invalid mnemonic size. Expected one of [${Vc.join(
      ", "
    )}] words, but got ${e.length}.`;
    throw new _(N.INVALID_MNEMONIC, t);
  }
}
var pn = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(e = fs) {
    D(this, "wordlist");
    this.wordlist = e, Hc(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(e) {
    return pn.mnemonicToEntropy(e, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(e) {
    return pn.entropyToMnemonic(e, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(e, t = fs) {
    const n = Mi(e);
    return Oi(n), Z(rI(n, t));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(e, t = fs) {
    const n = X(e);
    return Hc(t), aI(n), nI(n).map((r) => t[r]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(e, t = "") {
    Oi(Mi(e));
    const n = fo(tI(e)), r = fo(`mnemonic${t}`);
    return mr(n, r, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(e, t = "") {
    const n = pn.mnemonicToSeed(e, t);
    return pn.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(e) {
    const t = Mi(e);
    let n = 0;
    try {
      Oi(t);
    } catch {
      return !1;
    }
    for (; n < t.length; ) {
      if (pn.binarySearch(t[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(e) {
    const t = fs;
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
    const t = X(e);
    if (t.length < 16 || t.length > 64)
      throw new _(
        N.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${t.length} bytes.`
      );
    return X(pr("sha512", sI, t));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(e, t = !1) {
    const n = pn.masterKeysFromSeed(e), r = X(t ? oI : iI), s = "0x00", i = "0x00000000", o = "0x00000000", c = n.slice(32), A = n.slice(0, 32), f = re([
      r,
      s,
      i,
      o,
      c,
      re(["0x00", A])
    ]), I = Eo(It(It(f)), 0, 4);
    return ld(re([f, I]));
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
    const n = t ? It(re([Zt(e), X(t)])) : Zt(e);
    return pn.entropyToMnemonic(n);
  }
}, da = pn, J0 = 2147483648, W0 = Z("0x0488ade4"), ua = Z("0x0488b21e"), j0 = Z("0x04358394"), Aa = Z("0x043587cf");
function Xc(e) {
  return ld(re([e, Eo(It(It(e)), 0, 4)]));
}
function cI(e = !1, t = !1) {
  return e ? t ? Aa : ua : t ? j0 : W0;
}
function dI(e) {
  return [ua, Aa].includes(Z(e.slice(0, 4)));
}
function uI(e) {
  return [W0, j0, ua, Aa].includes(
    Z(e.slice(0, 4))
  );
}
function AI(e, t = 0) {
  const n = e.split("/");
  if (n.length === 0 || n[0] === "m" && t !== 0)
    throw new _(N.HD_WALLET_ERROR, `invalid path - ${e}`);
  return n[0] === "m" && n.shift(), n.map(
    (r) => ~r.indexOf("'") ? parseInt(r, 10) + J0 : parseInt(r, 10)
  );
}
var Vn = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(e) {
    D(this, "depth", 0);
    D(this, "index", 0);
    D(this, "fingerprint", Z("0x00000000"));
    D(this, "parentFingerprint", Z("0x00000000"));
    D(this, "privateKey");
    D(this, "publicKey");
    D(this, "chainCode");
    if (e.privateKey) {
      const t = new gr(e.privateKey);
      this.publicKey = Z(t.compressedPublicKey), this.privateKey = Z(e.privateKey);
    } else {
      if (!e.publicKey)
        throw new _(
          N.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = Z(e.publicKey);
    }
    this.parentFingerprint = e.parentFingerprint || this.parentFingerprint, this.fingerprint = Eo(Zr(It(this.publicKey)), 0, 4), this.depth = e.depth || this.depth, this.index = e.index || this.index, this.chainCode = e.chainCode;
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
    const t = this.privateKey && X(this.privateKey), n = X(this.publicKey), r = X(this.chainCode), s = new Uint8Array(37);
    if (e & J0) {
      if (!t)
        throw new _(
          N.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      s.set(t, 1);
    } else
      s.set(X(this.publicKey));
    s.set(Pt(e, 4), 33);
    const i = X(pr("sha512", r, s)), o = i.slice(0, 32), c = i.slice(32);
    if (t) {
      const w = x(o).add(t).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new Vn({
        privateKey: w,
        chainCode: c,
        index: e,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new gr(Z(o)).addPoint(n);
    return new Vn({
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
    return AI(e, this.depth).reduce((n, r) => n.deriveIndex(r), this);
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
      throw new _(
        N.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = cI(this.privateKey == null || e, t), r = Z(Uint8Array.from([this.depth])), s = this.parentFingerprint, i = bo(this.index, 4), o = this.chainCode, c = this.privateKey != null && !e ? re(["0x00", this.privateKey]) : this.publicKey, A = X(re([n, r, s, i, o, c]));
    return Xc(A);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(e) {
    const t = da.masterKeysFromSeed(e);
    return new Vn({
      chainCode: X(t.slice(32)),
      privateKey: X(t.slice(0, 32))
    });
  }
  static fromExtendedKey(e) {
    const t = tl(sl(e)), n = X(t), r = Xc(n.slice(0, 78)) === e;
    if (n.length !== 82 || !uI(n))
      throw new _(N.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!r)
      throw new _(N.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const s = n[4], i = Z(n.slice(5, 9)), o = parseInt(Z(n.slice(9, 13)).substring(2), 16), c = Z(n.slice(13, 45)), A = n.slice(45, 78);
    if (s === 0 && i !== "0x00000000" || s === 0 && o !== 0)
      throw new _(
        N.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (dI(n)) {
      if (A[0] !== 3)
        throw new _(N.HD_WALLET_ERROR, "Invalid public extended key.");
      return new Vn({
        publicKey: A,
        chainCode: c,
        index: o,
        depth: s,
        parentFingerprint: i
      });
    }
    if (A[0] !== 0)
      throw new _(N.HD_WALLET_ERROR, "Invalid private extended key.");
    return new Vn({
      privateKey: A.slice(1),
      chainCode: c,
      index: o,
      depth: s,
      parentFingerprint: i
    });
  }
}, Li = Vn, q0 = class extends ii {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(e) {
    return new Ct(e, this._provider);
  }
}, Ct = class extends z0 {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new gr("0x00"), new q0(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(e) {
    const t = gr.generatePrivateKey(e == null ? void 0 : e.entropy);
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
    const s = Li.fromSeed(e).derivePath(t || Ct.defaultPath);
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
    const s = da.mnemonicToSeed(e, n), o = Li.fromSeed(s).derivePath(t || Ct.defaultPath);
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
    const n = Li.fromExtendedKey(e);
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
    const r = await $y(e, t);
    return new Ct(r, n);
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
    return new q0(e, t);
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
Fe(_t, "generate", Ct.generate);
Fe(_t, "fromSeed", Ct.fromSeed);
Fe(_t, "fromMnemonic", Ct.fromMnemonic);
Fe(_t, "fromExtendedKey", Ct.fromExtendedKey);
Fe(_t, "fromEncryptedJson", Ct.fromEncryptedJson);
var lI = class {
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
}, Dn, $0 = class {
  constructor(e) {
    wn(this, Dn, void 0), Fe(this, "pathKey", "{}"), Fe(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`), Fe(this, "numberOfAccounts", 0), Ot(this, Dn, e.secret || da.generate()), this.rootPath = e.rootPath || this.rootPath, this.numberOfAccounts = e.numberOfAccounts || 1;
  }
  getDerivePath(e) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(e)) : `${this.rootPath}/${e}`;
  }
  serialize() {
    return {
      secret: Ne(this, Dn),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const e = [];
    let t = 0;
    do {
      const n = _t.fromMnemonic(Ne(this, Dn), this.getDerivePath(t));
      e.push({
        publicKey: n.publicKey,
        address: n.address
      }), t += 1;
    } while (t < this.numberOfAccounts);
    return e;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const e = _t.fromMnemonic(Ne(this, Dn), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: e.publicKey,
      address: e.address
    };
  }
  exportAccount(e) {
    let t = 0;
    const n = Ae.fromAddressOrString(e);
    do {
      const r = _t.fromMnemonic(Ne(this, Dn), this.getDerivePath(t));
      if (r.address.equals(n))
        return r.privateKey;
      t += 1;
    } while (t < this.numberOfAccounts);
    throw new _(
      N.WALLET_MANAGER_ERROR,
      `Account with address '${e}' not found in derived wallets.`
    );
  }
  getWallet(e) {
    const t = this.exportAccount(e);
    return _t.fromPrivateKey(t);
  }
};
Dn = /* @__PURE__ */ new WeakMap();
Fe($0, "type", "mnemonic");
var mn, K0 = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(e = {}) {
    wn(this, mn, []), e.secret ? Ot(this, mn, [e.secret]) : Ot(this, mn, e.accounts || [_t.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: Ne(this, mn)
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
    return Ne(this, mn).map((e) => this.getPublicAccount(e));
  }
  addAccount() {
    const e = _t.generate();
    return Ne(this, mn).push(e.privateKey), this.getPublicAccount(e.privateKey);
  }
  exportAccount(e) {
    const t = Ae.fromAddressOrString(e), n = Ne(this, mn).find(
      (r) => _t.fromPrivateKey(r).address.equals(t)
    );
    if (!n)
      throw new _(
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
mn = /* @__PURE__ */ new WeakMap();
Fe(K0, "type", "privateKey");
var qt = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked.",
  passphrase_not_match: "The provided passphrase did not match the expected value."
};
function $t(e, t) {
  if (!e)
    throw new _(N.WALLET_MANAGER_ERROR, t);
}
var bt, Qn, Yt, ho, eA, go, tA, nA = class extends E0.EventEmitter {
  constructor(e) {
    super(), wn(this, ho), wn(this, go), Fe(this, "storage", new lI()), Fe(this, "STORAGE_KEY", "WalletManager"), wn(this, bt, []), wn(this, Qn, ""), wn(this, Yt, !0), this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return Ne(this, Yt);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    $t(!Ne(this, Yt), qt.wallet_not_unlocked);
    const t = Ne(this, bt).find((n, r) => r === e);
    return $t(t, qt.vault_not_found), t.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return Ne(this, bt).map((e, t) => ({
      title: e.title,
      type: e.type,
      vaultId: t
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return Ne(this, bt).flatMap(
      (e, t) => e.vault.getAccounts().map((n) => ({ ...n, vaultId: t }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const t = Ae.fromAddressOrString(e), n = Ne(this, bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return $t(n, qt.address_not_found), n.vault.getWallet(t);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const t = Ae.fromAddressOrString(e);
    $t(!Ne(this, Yt), qt.wallet_not_unlocked);
    const n = Ne(this, bt).find(
      (r) => r.vault.getAccounts().find((s) => s.address.equals(t))
    );
    return $t(n, qt.address_not_found), n.vault.exportAccount(t);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const t = Ne(this, bt)[(e == null ? void 0 : e.vaultId) || 0];
    await $t(t, qt.vault_not_found);
    const n = t.vault.addAccount();
    return await this.saveState(), n;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    Ne(this, bt).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const t = this.getVaultClass(e.type), n = new t(e);
    Ot(this, bt, Ne(this, bt).concat({
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
    Ot(this, Yt, !0), Ot(this, bt, []), Ot(this, Qn, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Ot(this, Qn, e), Ot(this, Yt, !1);
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
    const n = Ne(this, Yt);
    await this.unlock(e), Ot(this, Qn, t), await this.saveState(), await this.loadState(), n && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await $t(!Ne(this, Yt), qt.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const t = await jf(Ne(this, Qn), JSON.parse(e));
      Ot(this, bt, ao(this, go, tA).call(this, t.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await $t(!Ne(this, Yt), qt.wallet_not_unlocked);
    const e = await qf(Ne(this, Qn), {
      vaults: ao(this, ho, eA).call(this, Ne(this, bt))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const t = nA.Vaults.find((n) => n.type === e);
    return $t(t, qt.invalid_vault_type), t;
  }
}, fI = nA;
bt = /* @__PURE__ */ new WeakMap();
Qn = /* @__PURE__ */ new WeakMap();
Yt = /* @__PURE__ */ new WeakMap();
ho = /* @__PURE__ */ new WeakSet();
eA = function(e) {
  return e.map(({ title: t, type: n, vault: r }) => ({
    title: t,
    type: n,
    data: r.serialize()
  }));
};
go = /* @__PURE__ */ new WeakSet();
tA = function(e) {
  return e.map(({ title: t, type: n, data: r }) => {
    const s = this.getVaultClass(n);
    return {
      title: t,
      type: n,
      vault: new s(r)
    };
  });
};
Fe(fI, "Vaults", [$0, K0]);
var hI = class {
  constructor(e) {
    throw new _(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new _(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new _(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new _(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(e) {
    throw new _(N.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(e) {
    throw new _(N.NOT_IMPLEMENTED, "Not implemented.");
  }
};
Fe(hI, "type");
var Mb = class {
}, gI = (e) => {
  const n = X(e), r = id(n, 16384), s = C0(r.map((o) => Z(o)));
  return on(re(["0x4655454C", s]));
}, Yc = class extends ii {
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
    const { predicateBytes: o, predicateInterface: c } = Yc.processPredicateData(
      t,
      n,
      i
    ), A = Ae.fromB256(gI(o));
    super(A, r);
    D(this, "bytes");
    D(this, "predicateData", []);
    D(this, "interface");
    this.bytes = o, this.interface = c, s !== void 0 && s.length > 0 && (this.predicateData = s);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(t) {
    const n = xt(t), { policies: r } = Pr.getPolicyMeta(n), s = this.getIndexFromPlaceholderWitness(n);
    return s !== -1 && n.removeWitness(s), n.inputs.filter(fr).forEach((i) => {
      Fc(i, this.address) && (i.predicate = Z(this.bytes), i.predicateData = Z(this.getPredicateData(r.length)), i.witnessIndex = 0);
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
    const n = (o = this.interface) == null ? void 0 : o.functions.main, r = new Ie(this.bytes.length).encode(this.bytes), i = js({
      maxInputs: this.provider.getChain().consensusParameters.txParameters.maxInputs.toNumber()
    }) + Go + dh + ne + r.byteLength + t * ne;
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
    let s = X(t), i;
    if (n && (i = new an(n), i.functions.main === void 0))
      throw new _(
        N.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return r && Object.keys(r).length && (s = Yc.setConfigurableConstants(
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
        const { offset: c } = r.configurables[i], A = r.encodeConfigurable(i, o);
        s.set(A, c);
      });
    } catch (i) {
      throw new _(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${i.message}.`
      );
    }
    return s;
  }
  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  getIndexFromPlaceholderWitness(t) {
    var i;
    const n = t.inputs.filter(fr).filter((o) => Fc(o, this.address));
    let r = -1;
    const s = n.find((o) => !o.predicate);
    return s && (r = s.witnessIndex, n.every((c) => !c.predicate) || (i = n[0]) != null && i.predicate && (r = -1)), r;
  }
}, rA = /* @__PURE__ */ ((e) => (e.ping = "ping", e.version = "version", e.connect = "connect", e.disconnect = "disconnect", e.isConnected = "isConnected", e.accounts = "accounts", e.currentAccount = "currentAccount", e.signMessage = "signMessage", e.sendTransaction = "sendTransaction", e.assets = "assets", e.addAsset = "addAsset", e.addAssets = "addAssets", e.networks = "networks", e.currentNetwork = "currentNetwork", e.addNetwork = "addNetwork", e.selectNetwork = "selectNetwork", e.addABI = "addABI", e.getABI = "getABI", e.hasABI = "hasABI", e))(rA || {}), la = /* @__PURE__ */ ((e) => (e.connectors = "connectors", e.currentConnector = "currentConnector", e.connection = "connection", e.accounts = "accounts", e.currentAccount = "currentAccount", e.networks = "networks", e.currentNetwork = "currentNetwork", e.assets = "assets", e.abis = "abis", e))(la || {}), sA = "FuelConnector", pI = class {
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
}, mI = class extends E0.EventEmitter {
  constructor() {
    super(...arguments);
    D(this, "name", "");
    D(this, "metadata", {});
    D(this, "connected", !1);
    D(this, "installed", !1);
    D(this, "events", la);
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
function wI(e, { cache: t, cacheTime: n, key: r }) {
  return async (...s) => {
    var o, c, A;
    if (t[r] && ((o = t[r]) != null && o.value))
      return (c = t[r]) == null ? void 0 : c.value;
    clearTimeout((A = t[r]) == null ? void 0 : A.timeout);
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
function Ob(e) {
  window.dispatchEvent(
    new CustomEvent(sA, {
      detail: e
    })
  );
}
function yI() {
  const e = {};
  return e.promise = new Promise((t, n) => {
    e.reject = n, e.resolve = t;
  }), e;
}
async function hs(e, t = 1050) {
  const n = new Promise((r, s) => {
    setTimeout(() => {
      s(new Error("Promise timed out"));
    }, t);
  });
  return Promise.race([n, e]);
}
var II = 2e3, bI = 5e3, { warn: EI } = console, Dr = class extends mI {
  constructor(t = Dr.defaultConfig) {
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
      const { _targetObject: t } = this, n = sA;
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
      return new pI(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, r;
    const t = await ((n = this._storage) == null ? void 0 : n.getItem(Dr.STORAGE_KEY)) || ((r = this._connectors[0]) == null ? void 0 : r.name);
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
    Object.values(rA).forEach((t) => {
      this[t] = async (...n) => this.callMethod(t, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(t) {
    const n = Date.now(), [r, s] = await Promise.allSettled([
      hs(t.isConnected()),
      hs(this.pingConnector(t))
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
      return await wI(async () => hs(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: bI
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
    return s ? (this._currentConnector = r, this.emit(this.events.currentConnector, r), this.setupConnectorEvents(Object.values(la)), await ((o = this._storage) == null ? void 0 : o.setItem(Dr.STORAGE_KEY, r.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
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
    const t = yI();
    return this.once(this.events.currentConnector, () => {
      t.resolve(!0);
    }), hs(t.promise, II).then(() => !0).catch(() => !1);
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
    return EI(
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
      n = await Us.create(t.url);
    else {
      if (t)
        throw new _(N.INVALID_PROVIDER, "Provider is not valid.");
      {
        const r = await this.currentNetwork();
        n = await Us.create(r.url);
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
    return new ii(t, r, this);
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
    await ((t = this._storage) == null ? void 0 : t.removeItem(Dr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, iA = Dr;
Fe(iA, "STORAGE_KEY", "fuel-current-connector");
Fe(iA, "defaultConfig", {});
function zc(e, t) {
  if (!e)
    throw new _(N.TRANSACTION_ERROR, t);
}
function oA(e) {
  return e.reduce((t, n, r) => {
    const { program: s, externalAbis: i } = n.getCallConfig();
    return r === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
var zt, nd, aA = (nd = class {
  constructor(...e) {
    mt(this, zt, void 0);
    Wt(this, zt, e || []);
  }
  entries() {
    return Re(this, zt);
  }
  push(...e) {
    Re(this, zt).push(...e);
  }
  concat(e) {
    return Re(this, zt).concat(e);
  }
  extend(e) {
    Re(this, zt).push(...e);
  }
  toBytes() {
    return re(
      Re(this, zt).reduce((e, t) => (e.push(t.to_bytes()), e), [])
    );
  }
  toHex() {
    return Z(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(Re(this, zt), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, zt = new WeakMap(), nd), CI = (e) => Go + js({ maxInputs: e }), cA = ne + Ln + su + ne + ne;
function BI(e) {
  const t = [...e.receipts];
  let n, r;
  if (t.forEach((i) => {
    i.type === ue.ScriptResult ? n = i : (i.type === ue.Return || i.type === ue.ReturnData || i.type === ue.Revert) && (r = i);
  }), !n || !r)
    throw new _(N.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: n.result,
    gasUsed: n.gasUsed,
    receipts: t,
    scriptResultReceipt: n,
    returnReceipt: r,
    callResult: e
  };
}
function fa(e, t, n = []) {
  var r;
  try {
    const s = BI(e);
    return t(s);
  } catch (s) {
    throw s.code === N.SCRIPT_REVERTED ? M0({
      logs: n,
      receipts: e.receipts,
      status: (r = e.gqlTransaction) == null ? void 0 : r.status
    }) : s;
  }
}
function xI(e, t, n) {
  return fa(
    e,
    (r) => {
      if (r.returnReceipt.type === ue.Revert)
        throw new _(
          N.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(n)}`
        );
      if (r.returnReceipt.type !== ue.Return && r.returnReceipt.type !== ue.ReturnData) {
        const { type: i } = r.returnReceipt;
        throw new _(
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
    D(this, "bytes");
    /**
     * A function to encode the script data.
     */
    D(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    D(this, "scriptResultDecoder");
    this.bytes = X(e), this.scriptDataEncoder = t, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(e, t) {
    return js({ maxInputs: t }) + Go + e;
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
    return ArrayBuffer.isView(t) ? t : (this.bytes = X(t.script), t.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(e, t = []) {
    return fa(e, this.scriptResultDecoder, t);
  }
}, dA = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, _I = Se, uA = ({ callDataOffset: e, gasForwardedOffset: t, amountOffset: n, assetIdOffset: r }, s) => {
  const i = new aA(
    As(16, e),
    As(17, n),
    Nr(17, 17, 0),
    As(18, r)
  );
  return t ? i.push(
    As(19, t),
    Nr(19, 19, 0),
    yc(16, 17, 18, 19)
  ) : i.push(yc(16, 17, 18, Te.cgas().to_u8())), s.encoding === Ut && s.isHeap && i.extend([
    // The RET register contains the pointer address of the `CALL` return (a stack
    // address).
    // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
    // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
    // changes in the compiler.
    // Load the word located at the address contained in RET, it's a word that
    // translates to a heap address. 0x15 is a free register.
    Nr(21, Te.ret().to_u8(), 0),
    // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
    // vector, so use a 2 offset to store the length in 0x16, which is a free register.
    Nr(22, Te.ret().to_u8(), 2),
    // The in-memory size of the type is (in-memory size of the inner type) * length
    Dp(22, 22, s.encodedLength),
    Np(21, 22)
  ]), i;
};
function Zc(e, t) {
  if (!e.length)
    return new Uint8Array();
  const n = new aA();
  for (let r = 0; r < e.length; r += 1)
    n.extend(uA(e[r], t[r]).entries());
  return n.push(a0(1)), n.toBytes();
}
var Jc = (e) => e === ue.Return || e === ue.ReturnData, vI = (e, t) => e.find(
  ({ type: n, from: r, to: s }) => n === ue.Call && r === _I && s === t
), RI = (e, t) => (n) => {
  if (Lt(n.code) !== 0)
    throw new _(N.SCRIPT_REVERTED, "Transaction reverted.");
  const r = vI(
    n.receipts,
    e.toB256()
  ), s = x(r == null ? void 0 : r.is);
  return n.receipts.filter(({ type: o }) => Jc(o)).flatMap((o, c, A) => {
    var f;
    if (!s.eq(x(o.is)))
      return [];
    if (o.type === ue.Return)
      return [
        new S("u64").encode(o.val)
      ];
    if (o.type === ue.ReturnData) {
      const I = X(o.data);
      if (t && Jc((f = A[c + 1]) == null ? void 0 : f.type)) {
        const w = A[c + 1];
        return re([I, X(w.data)]);
      }
      return [I];
    }
    return [new Uint8Array()];
  });
}, NI = (e, t, n, r = []) => fa(e, RI(t, n), r), SI = (e) => e.reduce(
  (t, n) => {
    const r = { ...dA };
    n.gas && (r.gasForwardedOffset = 1);
    const s = {
      isHeap: n.isOutputDataHeap,
      encodedLength: n.outputEncodedLength,
      encoding: n.encoding ?? Ut
    };
    return t + uA(r, s).byteLength();
  },
  Qt.size()
  // placeholder for single RET instruction which is added later
), DI = (e) => e.map((t) => {
  const { func: n } = t.getCallConfig();
  return {
    isHeap: n.outputMetadata.isHeapType,
    encodedLength: n.outputMetadata.encodedLength,
    encoding: n.encoding
  };
}), QI = (e, t) => {
  var o;
  const n = [];
  let r = 0;
  const s = {
    amountOffset: t,
    assetIdOffset: t + ne,
    gasForwardedOffset: e.gas ? t + ne + Ln : 0,
    callDataOffset: t + ne + Ln + r
  };
  if (n.push(new S("u64").encode(e.amount || 0)), n.push(new G().encode(((o = e.assetId) == null ? void 0 : o.toString()) || Se)), n.push(e.contractId.toBytes()), n.push(new S("u64").encode(e.fnSelector)), e.gas && (n.push(new S("u64").encode(e.gas)), r = ne), e.isInputDataPointer) {
    const c = t + cA + r;
    n.push(new S("u64").encode(c));
  }
  const i = X(e.data);
  return n.push(i), {
    scriptData: n,
    callParamOffsets: s
  };
}, TI = (e, t) => {
  var w;
  const n = [], r = t, s = r + ne, i = s + Ln, o = i + su + ne + ne, c = o + e.fnSelectorBytes.byteLength, A = X(e.data);
  let f = 0;
  return n.push(new S("u64").encode(e.amount || 0)), n.push(new G().encode(((w = e.assetId) == null ? void 0 : w.toString()) || Se)), n.push(e.contractId.toBytes()), n.push(new S("u64").encode(o)), n.push(new S("u64").encode(c)), n.push(e.fnSelectorBytes), n.push(A), e.gas && (n.push(new S("u64").encode(e.gas)), f = c + A.byteLength), {
    scriptData: n,
    callParamOffsets: {
      amountOffset: r,
      assetIdOffset: s,
      gasForwardedOffset: f,
      callDataOffset: i
    }
  };
}, FI = (e) => e === or ? TI : QI, Wc = (e, t) => new Gr(
  // Script to call the contract, start with stub size matching length of calls
  Zc(
    new Array(e.length).fill(dA),
    DI(e)
  ),
  (n) => {
    const r = n.length;
    if (r === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = SI(n), i = (8 - s % 8) % 8, o = s + i, c = CI(t.toNumber()) + o, A = [], f = [];
    let I = c;
    const w = [];
    for (let R = 0; R < r; R += 1) {
      const B = n[R], { scriptData: M, callParamOffsets: T } = FI(
        B.encoding
      )(B, I);
      f.push({
        isHeap: B.isOutputDataHeap,
        encodedLength: B.outputEncodedLength,
        encoding: B.encoding ?? Ut
      }), w.push(re(M)), A.push(T), I = c + re(w).byteLength;
    }
    const C = Zc(A, f);
    return { data: re(w), script: C };
  },
  () => [new Uint8Array()]
);
function MI(e) {
  const t = e.receipts.find((n) => n.type === ue.ScriptResult);
  return (t == null ? void 0 : t.gasUsed) || x(0);
}
var AA = class {
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
    this.functionScopes = Array.isArray(e) ? e : [e], this.isMultiCall = n, this.value = this.getDecodedValue(t), this.gasUsed = MI(t);
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
    return oA(this.functionScopes);
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
      return xI(e, n, t);
    const r = (n == null ? void 0 : n.func.encoding) === Ut && (n == null ? void 0 : n.func.outputMetadata.isHeapType) || !1, i = NI(
      e,
      (n == null ? void 0 : n.program).id,
      r,
      t
    ).map((o, c) => {
      var f;
      const { func: A } = this.functionScopes[c].getCallConfig();
      return (f = A.decodeOutput(o)) == null ? void 0 : f[0];
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
    return V0(e, n, r);
  }
}, lA = class extends AA {
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
    return new lA(
      t,
      n,
      i,
      s,
      r
    );
  }
}, Ns = class extends AA {
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
    return await new Ns(t, n, r);
  }
};
function OI(e, t) {
  const { program: n, args: r, forward: s, func: i, callParameters: o, externalAbis: c } = e.getCallConfig(), A = e.getCallConfig().func.isInputDataPointer ? cA : 0, f = i.encodeArguments(r, t + A);
  return {
    contractId: n.id,
    fnSelector: i.selector,
    fnSelectorBytes: i.selectorBytes,
    encoding: i.encoding,
    data: f,
    isInputDataPointer: i.isInputDataPointer,
    isOutputDataHeap: i.outputMetadata.isHeapType,
    outputEncodedLength: i.outputMetadata.encodedLength,
    assetId: s == null ? void 0 : s.assetId,
    amount: s == null ? void 0 : s.amount,
    gas: o == null ? void 0 : o.gasLimit,
    externalContractsAbis: c
  };
}
var fA = class {
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
    // flag to check if any of the callParams has gasLimit set
    D(this, "externalAbis", {});
    D(this, "addSignersCallback");
    this.program = e, this.isMultiCall = t, this.transactionRequest = new $n();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    const t = this.getProvider().getChain();
    if (!t)
      throw new _(
        _.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()``"
      );
    const n = t.consensusParameters.txParameters.maxInputs, r = Wc(this.functionInvocationScopes, n);
    return this.functionInvocationScopes.map(
      (s) => OI(s, r.getScriptDataOffset(n.toNumber()))
    );
  }
  /**
   * Updates the script request with the current contract calls.
   */
  updateScriptRequest() {
    const e = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: t }
      }
    } = e.getChain(), n = Wc(this.functionInvocationScopes, t);
    this.transactionRequest.setScript(n, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((t) => {
      t.contractId && this.transactionRequest.addContractInputAndOutput(t.contractId), t.externalContractsAbis && Object.keys(t.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(Ae.fromB256(n))
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
    await ea(), this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Le.Script && (this.transactionRequest.abis = oA(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const e = this.calls.reduce((t, n) => t.add(n.gas || 0), x(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = e;
    else if (e.gt(this.transactionRequest.gasLimit))
      throw new _(
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
    var c, A, f;
    const e = await this.getTransactionRequest(), t = await this.getTransactionCost(), { gasUsed: n, missingContractIds: r, outputVariables: s, maxFee: i } = t;
    this.setDefaultTxParams(e, n, i), e.inputs = e.inputs.filter((I) => I.type !== me.Coin), r.forEach((I) => {
      e.addContractInputAndOutput(Ae.fromString(I));
    }), e.addVariableOutputs(s);
    const o = ((c = this.txParameters) == null ? void 0 : c.optimizeGas) ?? !0;
    if ((A = this.txParameters) != null && A.gasLimit && !o) {
      e.gasLimit = x(this.txParameters.gasLimit);
      const { maxFee: I } = await this.getProvider().estimateTxGasAndFee({
        transactionRequest: e
      });
      e.maxFee = I;
    }
    return await ((f = this.program.account) == null ? void 0 : f.fund(e, t)), this.addSignersCallback && await this.addSignersCallback(e), e;
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
    return t.tip = x(e.tip || t.tip), t.gasLimit = x(e.gasLimit || t.gasLimit), t.maxFee = e.maxFee ? x(e.maxFee) : t.maxFee, t.witnessLimit = e.witnessLimit ? x(e.witnessLimit) : t.witnessLimit, t.maturity = e.maturity || t.maturity, t.addVariableOutputs(((n = this.txParameters) == null ? void 0 : n.variableOutputs) || 0), this;
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
      Ae.fromAddressOrString(e),
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
    zc(this.program.account, "Wallet is required!");
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.sendTransaction(e, {
      awaitExecution: !0,
      estimateTxDependencies: !1
    });
    return lA.build(
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
    if (zc(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new _(
        N.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const e = await this.fundWithRequiredCoins(), t = await this.program.account.simulateTransaction(e, {
      estimateTxDependencies: !1
    });
    return Ns.build(this.functionInvocationScopes, t, this.isMultiCall);
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
    return Ns.build(
      this.functionInvocationScopes,
      t,
      this.isMultiCall
    );
  }
  async get() {
    const { receipts: e } = await this.getTransactionCost(), t = {
      receipts: e
    };
    return Ns.build(
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
    var c, A;
    const r = On((c = this.txParameters) == null ? void 0 : c.gasLimit) || this.hasCallParamsGasLimit, s = On((A = this.txParameters) == null ? void 0 : A.maxFee), { gasLimit: i, maxFee: o } = e;
    if (r && i.lt(t))
      throw new _(
        N.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${t}'.`
      );
    if (s && n.gt(o))
      throw new _(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${n}'.`
      );
    e.gasLimit = t, e.maxFee = n;
  }
}, hA = class extends fA {
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
        throw new _(
          N.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = ra(t.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, LI = class extends fA {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(e, t) {
    super(e, !0), this.addCalls(t), this.program.interface.jsonAbi.encoding !== or && this.validateHeapTypeReturnCalls();
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
        throw new _(
          N.INVALID_MULTICALL,
          "A multicall can have only one call that returns a heap type."
        );
    });
    const n = e !== -1, r = e === this.calls.length - 1;
    if (n && !r)
      throw new _(
        N.INVALID_MULTICALL,
        "In a multicall, the contract call returning a heap type must be the last call."
      );
  }
}, kI = class {
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
    this.interface = t instanceof an ? t : new an(t), this.id = Ae.fromAddressOrString(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((r) => {
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
      const t = (...n) => new hA(this, e, n);
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
    return new LI(this, e);
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
}, PI = class extends hA {
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
      throw new _(
        _.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `await Provider.create()`"
      );
    const r = n.consensusParameters.txParameters.maxInputs.toNumber(), s = new Ie(t.length).encodedLength;
    this.scriptRequest = new Gr(
      t,
      (i) => this.func.encodeArguments(
        i,
        Gr.getScriptDataOffsetWithScriptBytes(s, r)
      ),
      () => []
    );
  }
}, Lb = class extends Qh {
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
    this.bytes = X(t), this.interface = new an(n), this.provider = r.provider, this.account = r, this.functions = {
      main: (...s) => new PI(this, this.interface.getFunction("main"), s)
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
      throw new _(
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
function kb(e) {
  return e;
}
var UI = /* @__PURE__ */ ((e) => (e.build = "build", e.deploy = "deploy", e.dev = "dev", e.init = "init", e))(UI || {}), GI = Object.defineProperty, VI = (e, t) => {
  for (var n in t)
    GI(e, n, { get: t[n], enumerable: !0 });
}, HI = {};
VI(HI, {
  getContractId: () => mA,
  getContractRoot: () => gA,
  getContractStorageRoot: () => pA,
  hexlifyWithPrefix: () => po
});
var gA = (e) => {
  const n = X(e), r = id(n, 16384);
  return C0(r.map((s) => Z(s)));
}, pA = (e) => {
  const t = new Tm();
  return e.forEach(({ key: n, value: r }) => t.update(It(n), r)), t.root;
}, mA = (e, t, n) => {
  const r = gA(X(e));
  return It(re(["0x4655454C", t, r, n]));
}, po = (e) => Z(e.startsWith("0x") ? e : `0x${e}`), XI = class {
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
    this.bytecode = X(e), t instanceof an ? this.interface = t : this.interface = new an(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null);
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(e) {
    return new XI(this.bytecode, this.interface, e);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployContractOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(e) {
    var o;
    const t = (o = e == null ? void 0 : e.storageSlots) == null ? void 0 : o.map(({ key: c, value: A }) => ({
      key: po(c),
      value: po(A)
    })).sort(({ key: c }, { key: A }) => c.localeCompare(A)), n = {
      salt: Zt(32),
      ...e,
      storageSlots: t || []
    };
    if (!this.provider)
      throw new _(
        N.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const r = n.stateRoot || pA(n.storageSlots), s = mA(this.bytecode, n.salt, r), i = new Ao({
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
      throw new _(N.ACCOUNT_REQUIRED, "Cannot deploy Contract without account.");
    const { configurableConstants: t } = e;
    t && this.setConfigurableConstants(t);
    const { contractId: n, transactionRequest: r } = this.createTransactionRequest(e), s = await this.account.provider.getTransactionCost(r), { maxFee: i } = e;
    if (On(i) && s.maxFee.gt(i))
      throw new _(
        N.MAX_FEE_TOO_LOW,
        `Max fee '${e.maxFee}' is lower than the required: '${s.maxFee}'.`
      );
    return r.maxFee = s.maxFee, await this.account.fund(r, s), await this.account.sendTransaction(r, {
      awaitExecution: !0
    }), new kI(n, this.interface, this.account);
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
        const { offset: s } = this.interface.configurables[n], i = this.interface.encodeConfigurable(n, r), o = X(this.bytecode);
        o.set(i, s), this.bytecode = o;
      });
    } catch (t) {
      throw new _(
        N.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${t.message}.`
      );
    }
  }
}, Pb = 9, Ub = 3, Gb = 9, Vb = 9, Hb = 18, Xb = 15, Yb = 12, zb = 9, rd, Zb = typeof process < "u" && ((rd = process == null ? void 0 : process.env) == null ? void 0 : rd.FUEL_NETWORK_URL) || "http://127.0.0.1:4000/v1/graphql", Jb = "https://beta-5.fuel.network/graphql";
export {
  Ln as ASSET_ID_LEN,
  Nu as AbstractAccount,
  Sh as AbstractAddress,
  Dh as AbstractContract,
  Su as AbstractProgram,
  Qh as AbstractScript,
  ib as AbstractScriptRequest,
  ii as Account,
  Ae as Address,
  yy as AddressType,
  we as ArrayCoder,
  G as B256Coder,
  cu as B512Coder,
  Oe as BN,
  Bn as BYTES_32,
  Pr as BaseTransactionRequest,
  z0 as BaseWalletUnlocked,
  S as BigNumberCoder,
  mh as BooleanCoder,
  Ie as ByteArrayCoder,
  Ds as ByteCoder,
  Jn as CHAIN_IDS,
  su as CONTRACT_ID_LEN,
  db as CONTRACT_MAX_SIZE,
  Iy as ChainName,
  Eb as ChangeOutputCollisionError,
  oe as Coder,
  UI as Commands,
  kI as Contract,
  XI as ContractFactory,
  HI as ContractUtils,
  Ao as CreateTransactionRequest,
  Vb as DECIMAL_FUEL,
  zb as DECIMAL_GWEI,
  Xb as DECIMAL_KWEI,
  Yb as DECIMAL_MWEI,
  Hb as DECIMAL_WEI,
  Gb as DEFAULT_DECIMAL_UNITS,
  Ub as DEFAULT_MIN_PRECISION,
  Pb as DEFAULT_PRECISION,
  wo as DateTime,
  Ut as ENCODING_V0,
  or as ENCODING_V1,
  cb as EmptyRoot,
  uu as EnumCoder,
  Cp as FAILED_ASSERT_EQ_SIGNAL,
  xp as FAILED_ASSERT_NE_SIGNAL,
  Bp as FAILED_ASSERT_SIGNAL,
  Ep as FAILED_REQUIRE_SIGNAL,
  s0 as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  pb as FAILED_UNKNOWN_SIGNAL,
  Fs as FUEL_BECH32_HRP_PREFIX,
  Jb as FUEL_BETA_5_NETWORK_URL,
  Zb as FUEL_NETWORK_URL,
  iA as Fuel,
  mI as FuelConnector,
  sA as FuelConnectorEventType,
  la as FuelConnectorEventTypes,
  rA as FuelConnectorMethods,
  lA as FunctionInvocationResult,
  hA as FunctionInvocationScope,
  Li as HDWallet,
  dh as INPUT_COIN_FIXED_SIZE,
  xn as InputCoder,
  Va as InputCoinCoder,
  Ms as InputContractCoder,
  Mr as InputMessageCoder,
  me as InputType,
  aA as InstructionSet,
  an as Interface,
  Ns as InvocationCallResult,
  AA as InvocationResult,
  Ky as Language,
  pI as LocalStorage,
  gb as MAX_PREDICATE_DATA_LENGTH,
  hb as MAX_PREDICATE_LENGTH,
  lb as MAX_SCRIPT_DATA_LENGTH,
  Ab as MAX_SCRIPT_LENGTH,
  fb as MAX_STATIC_CONTRACTS,
  ub as MAX_WITNESSES,
  Vc as MNEMONIC_SIZES,
  lI as MemoryStorage,
  da as Mnemonic,
  $0 as MnemonicVault,
  LI as MultiCallInvocationScope,
  qw as NoWitnessAtIndexError,
  Cb as NoWitnessByOwnerError,
  $ as NumberCoder,
  wy as OperationName,
  fu as OptionCoder,
  Xa as OutputChangeCoder,
  _n as OutputCoder,
  Ha as OutputCoinCoder,
  Os as OutputContractCoder,
  za as OutputContractCreatedCoder,
  Ee as OutputType,
  Ya as OutputVariableCoder,
  vp as PANIC_DOC_URL,
  _p as PANIC_REASONS,
  vn as PoliciesCoder,
  Ft as PolicyType,
  Yc as Predicate,
  K0 as PrivateKeyVault,
  Us as Provider,
  yh as RawSliceCoder,
  qi as ReceiptBurnCoder,
  Za as ReceiptCallCoder,
  ob as ReceiptCoder,
  $a as ReceiptLogCoder,
  Ka as ReceiptLogDataCoder,
  Ls as ReceiptMessageOutCoder,
  Or as ReceiptMintCoder,
  ja as ReceiptPanicCoder,
  Ja as ReceiptReturnCoder,
  Wa as ReceiptReturnDataCoder,
  qa as ReceiptRevertCoder,
  nc as ReceiptScriptResultCoder,
  ec as ReceiptTransferCoder,
  tc as ReceiptTransferOutCoder,
  ue as ReceiptType,
  Go as SCRIPT_FIXED_SIZE,
  Lb as Script,
  Gr as ScriptRequest,
  $n as ScriptTransactionRequest,
  gr as Signer,
  gu as StdStringCoder,
  Mb as StorageAbstract,
  rc as StorageSlotCoder,
  Ih as StringCoder,
  qs as StructCoder,
  Nn as TransactionCoder,
  oc as TransactionCreateCoder,
  ac as TransactionMintCoder,
  Rs as TransactionResponse,
  ic as TransactionScriptCoder,
  my as TransactionStatus,
  Le as TransactionType,
  py as TransactionTypeName,
  cc as TransactionUpgradeCoder,
  dc as TransactionUploadCoder,
  pu as TupleCoder,
  cr as TxPointerCoder,
  Yi as UTXO_ID_LEN,
  ab as UtxoIdCoder,
  hI as Vault,
  mu as VecCoder,
  ne as WORD_SIZE,
  _t as Wallet,
  q0 as WalletLocked,
  fI as WalletManager,
  Ct as WalletUnlocked,
  Rn as WitnessCoder,
  Se as ZeroBytes32,
  Om as addAmountToCoinQuantities,
  hr as addOperation,
  _r as addressify,
  X as arrayify,
  Ww as assemblePanicError,
  Hw as assembleReceiptByType,
  jw as assembleRevertError,
  si as assembleTransactionSummary,
  zc as assert,
  Fb as assets,
  x as bn,
  En as bufferFromString,
  bb as buildBlockExplorerUrl,
  wI as cacheFor,
  Bb as cacheRequestInputsResources,
  ey as cacheRequestInputsResourcesFromOwner,
  co as calculateGasFee,
  T0 as calculateMetadataGasForTxCreate,
  F0 as calculateMetadataGasForTxScript,
  iy as calculateTXFeeForSummary,
  js as calculateVmTxMemory,
  zI as capitalizeString,
  id as chunkAndPadBytes,
  kh as clearFirst12BytesFromB256,
  ra as coinQuantityfy,
  re as concat,
  Vr as concatBytes,
  kb as createConfig,
  jf as decrypt,
  $f as decryptJsonWalletData,
  WI as defaultConsensusKey,
  JI as defaultSnapshotConfigs,
  yI as deferPromise,
  Ob as dispatchFuelConnectorEvent,
  qf as encrypt,
  Kf as encryptJsonWalletData,
  fs as english,
  My as extractBurnedAssetsFromReceipts,
  Fy as extractMintedAssetsFromReceipts,
  M0 as extractTxError,
  qI as format,
  jI as formatUnits,
  Yo as fromBech32,
  zw as gasUsedByInputs,
  oA as getAbisFromAllCalls,
  Kw as getAssetAmountInRequestInputs,
  Db as getAssetEth,
  Qb as getAssetFuel,
  Vy as getAssetNetwork,
  Y0 as getAssetWithNetwork,
  zo as getBytesFromBech32,
  Ny as getContractCallOperations,
  Qy as getContractCreatedOperations,
  V0 as getDecodedLogs,
  Gy as getDefaultChainId,
  D0 as getGasUsedFromReceipts,
  ca as getInputAccountAddress,
  ly as getInputContractFromIndex,
  L0 as getInputFromAssetId,
  aa as getInputsByType,
  ay as getInputsByTypes,
  cy as getInputsCoin,
  uy as getInputsCoinAndMessage,
  Ay as getInputsContract,
  dy as getInputsMessage,
  ia as getMaxGas,
  Q0 as getMinGas,
  Mu as getMintedAssetId,
  Ty as getOperations,
  ts as getOutputsByType,
  hy as getOutputsChange,
  k0 as getOutputsCoin,
  gy as getOutputsContract,
  fy as getOutputsContractCreated,
  xb as getOutputsVariable,
  Dy as getPayProducerOperations,
  gI as getPredicateRoot,
  Lh as getRandomB256,
  Ur as getReceiptsByType,
  By as getReceiptsCall,
  xy as getReceiptsMessageOut,
  vb as getReceiptsTransferOut,
  Tc as getReceiptsWithMissingData,
  $w as getRequestInputResourceOwner,
  Oy as getTransactionStatusName,
  Rb as getTransactionSummary,
  Nb as getTransactionSummaryFromRequest,
  P0 as getTransactionTypeName,
  Sb as getTransactionsSummaries,
  Oc as getTransferOperations,
  Ry as getWithdrawFromFuelOperations,
  _b as hasSameAssetId,
  on as hash,
  th as hashMessage,
  Z as hexlify,
  kw as inputify,
  Wi as isB256,
  Cs as isBech32,
  Uw as isCoin,
  On as isDefined,
  ji as isEvmAddress,
  Ib as isMessage,
  Ua as isPublicKey,
  wb as isRawCoin,
  yb as isRawMessage,
  yr as isRequestInputCoin,
  oa as isRequestInputMessage,
  fr as isRequestInputResource,
  Fc as isRequestInputResourceFromOwner,
  ns as isType,
  U0 as isTypeCreate,
  by as isTypeMint,
  G0 as isTypeScript,
  Ey as isTypeUpgrade,
  Cy as isTypeUpload,
  Hd as keccak256,
  sb as keyFromPassword,
  $I as max,
  KI as multiply,
  Oh as normalizeBech32,
  Zw as normalizeJSON,
  ZI as normalizeString,
  Pw as outputify,
  Ph as padFirst12BytesOfEvmAddress,
  yn as processGqlReceipt,
  Ly as processGraphqlStatus,
  Zt as randomBytes,
  Cn as resolveGasDependentCosts,
  Tb as resolveIconPaths,
  Mc as returnZeroScript,
  Vd as scrypt,
  It as sha256,
  Jw as sleep,
  Yh as sortPolicies,
  xr as stringFromBuffer,
  Ga as toB256,
  Es as toBech32,
  Pt as toBytes,
  XA as toFixed,
  bo as toHex,
  Lt as toNumber,
  xt as transactionRequestify,
  eh as uint64ToBytesBE,
  zy as urlJoin,
  hs as withTimeout,
  sy as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
