#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_cli3 = require("@fuel-ts/abi-typegen/cli");
var import_versions = require("@fuel-ts/versions");
var import_cli4 = require("@fuel-ts/versions/cli");
var import_commander = require("commander");

// src/cli/utils/logger.ts
var import_chalk = __toESM(require("chalk"));
var loggingConfig = {
  isDebugEnabled: false,
  isLoggingEnabled: true
};
function configureLogging(params) {
  loggingConfig.isLoggingEnabled = params.isLoggingEnabled;
  loggingConfig.isDebugEnabled = params.isDebugEnabled && loggingConfig.isLoggingEnabled;
}
function log(...data) {
  if (loggingConfig.isLoggingEnabled) {
    process.stdout.write(`${data.join(" ")}
`);
  }
}
function debug(...data) {
  if (loggingConfig.isDebugEnabled) {
    log(data);
  }
}
function error(...data) {
  process.stderr.write(`${import_chalk.default.red(data.join(" "))}
`);
}

// src/cli/config/forcUtils.ts
var import_fs = require("fs");
var import_lodash = __toESM(require("lodash.camelcase"));
var import_path = require("path");
var import_toml = __toESM(require("toml"));
var forcFiles = /* @__PURE__ */ new Map();
var swayFiles = /* @__PURE__ */ new Map();
function readForcToml(path) {
  const forcPath = (0, import_path.join)(path, "./Forc.toml");
  if (!(0, import_fs.existsSync)(forcPath)) {
    throw new Error(`Toml file not found:
  ${forcPath}`);
  }
  if (!forcFiles.has(forcPath)) {
    const forcFile = (0, import_fs.readFileSync)(forcPath, "utf8");
    const tomlParsed = import_toml.default.parse(forcFile);
    forcFiles.set(forcPath, tomlParsed);
  }
  const tomlContents = forcFiles.get(forcPath);
  return tomlContents;
}
function readSwayType(path) {
  const forcToml = readForcToml(path);
  const entryFile = forcToml.project.entry || "main.sw";
  const swayEntryPath = (0, import_path.join)(path, "src", entryFile);
  if (!swayFiles.has(swayEntryPath)) {
    const swayFile = (0, import_fs.readFileSync)(swayEntryPath, "utf8");
    const [swayType] = swayFile.split(";\n");
    swayFiles.set(swayEntryPath, swayType);
  }
  return swayFiles.get(swayEntryPath);
}
function getContractName(contractPath) {
  const { project } = readForcToml(contractPath);
  return project.name;
}
function getContractCamelCase(contractPath) {
  const projectName = getContractName(contractPath);
  return (0, import_lodash.default)(projectName);
}
function getBinaryPath(contractPath) {
  const projectName = getContractName(contractPath);
  return (0, import_path.join)(contractPath, `/out/debug/${projectName}.bin`);
}
function getABIPath(contractPath) {
  const projectName = getContractName(contractPath);
  return (0, import_path.join)(contractPath, `/out/debug/${projectName}-abi.json`);
}
function getABIPaths(paths) {
  return Promise.all(paths.map((path) => getABIPath(path)));
}
var getStorageSlotsPath = (contractPath) => {
  const projectName = getContractName(contractPath);
  return (0, import_path.join)(contractPath, `/out/debug/${projectName}-storage_slots.json`);
};

// src/cli/commands/deploy/createWallet.ts
var import_providers = require("@fuel-ts/providers");
var import_wallet = require("@fuel-ts/wallet");
async function createWallet(providerUrl, privateKey) {
  let pvtKey;
  if (privateKey) {
    pvtKey = privateKey;
  } else if (process.env.PRIVATE_KEY) {
    pvtKey = process.env.PRIVATE_KEY;
  } else {
    throw new Error("You must provide a privateKey via config.privateKey or env PRIVATE_KEY");
  }
  const provider = await import_providers.Provider.create(providerUrl);
  return import_wallet.Wallet.fromPrivateKey(pvtKey, provider);
}

// src/cli/commands/deploy/deployContract.ts
var import_contract = require("@fuel-ts/contract");
var import_fs2 = require("fs");
async function deployContract(wallet, binaryPath, abiPath, storageSlotsPath, deployConfig) {
  debug(`Deploying contract for ABI: ${abiPath}`);
  const bytecode = (0, import_fs2.readFileSync)(binaryPath);
  if ((0, import_fs2.existsSync)(storageSlotsPath)) {
    const storageSlots = JSON.parse((0, import_fs2.readFileSync)(storageSlotsPath, "utf-8"));
    deployConfig.storageSlots = storageSlots;
  }
  const { minGasPrice: gasPrice } = wallet.provider.getGasConfig();
  const abi = JSON.parse((0, import_fs2.readFileSync)(abiPath, "utf-8"));
  const contractFactory = new import_contract.ContractFactory(bytecode, abi, wallet);
  deployConfig.gasPrice = deployConfig.gasPrice ?? gasPrice;
  const contract = await contractFactory.deployContract(deployConfig);
  return contract.id.toB256();
}

// src/cli/commands/deploy/getDeployConfig.ts
async function getDeployConfig(deployConfig, options) {
  let config;
  if (typeof deployConfig === "function") {
    config = await deployConfig(options);
  } else {
    config = deployConfig;
  }
  return config;
}

// src/cli/commands/deploy/saveContractIds.ts
var import_promises = require("fs/promises");
var import_path2 = require("path");
async function saveContractIds(contracts, output) {
  const contractsMap = contracts.reduce(
    (cConfig, { name, contractId }) => ({
      ...cConfig,
      [name]: contractId
    }),
    {}
  );
  const filePath = (0, import_path2.resolve)(output, "contract-ids.json");
  await (0, import_promises.mkdir)(output, { recursive: true });
  await (0, import_promises.writeFile)(filePath, JSON.stringify(contractsMap, null, 2));
  log(`Contract IDs saved at: ${filePath}`);
}

// src/cli/commands/deploy/index.ts
async function deploy(config) {
  const contracts = [];
  const wallet = await createWallet(config.providerUrl, config.privateKey);
  log(`Deploying contracts to: ${wallet.provider.url}`);
  const contractsLen = config.contracts.length;
  for (let i = 0; i < contractsLen; i++) {
    const contractPath = config.contracts[i];
    const binaryPath = getBinaryPath(contractPath);
    const abiPath = getABIPath(contractPath);
    const storageSlotsPath = getStorageSlotsPath(contractPath);
    const projectName = getContractName(contractPath);
    const contractName = getContractCamelCase(contractPath);
    const deployConfig = await getDeployConfig(config.deployConfig, {
      contracts: Array.from(contracts),
      contractName,
      contractPath
    });
    const contractId = await deployContract(
      wallet,
      binaryPath,
      abiPath,
      storageSlotsPath,
      deployConfig
    );
    debug(`Contract deployed: ${projectName} - ${contractId}`);
    contracts.push({
      name: contractName,
      contractId
    });
  }
  await saveContractIds(contracts, config.output);
  return contracts;
}

// src/cli/commands/dev/startFuelCore.ts
var import_child_process = require("child_process");
var import_fs4 = require("fs");
var import_path4 = require("path");
var import_portfinder = require("portfinder");
var import_tree_kill = __toESM(require("tree-kill"));

// src/cli/utils/findBinPath.ts
var import_fs3 = require("fs");
var import_path3 = require("path");
var npmWhich = require("npm-which")(__dirname);
function findBinPath(binCommandName) {
  let binPath = npmWhich.sync(binCommandName);
  if (!(0, import_fs3.existsSync)(binPath)) {
    binPath = (0, import_path3.join)("node_modules", ".bin", binCommandName);
  }
  return binPath;
}

// src/cli/utils/getBinarySource.ts
var import_chalk2 = __toESM(require("chalk"));
var getBinarySource = (useBuiltIn) => ({
  true: import_chalk2.default.cyan("built-in"),
  false: import_chalk2.default.green("source")
})[`${useBuiltIn}`];

// src/cli/commands/dev/defaultChainConfig.ts
var defaultConsensusKey = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
var defaultChainConfig = {
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
        owner: "0x5d99ee966b42cd8fc7bdd1364b389153a9e78b42b7d4a691470674e817888d4e",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xbdaad6a89e073e177895b3e5a9ccd15806749eda134a6438dae32fc5b6601f3f",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x95a7aa6cc32743f8706c40ef49a7423b47da763bb4bbc055b1f07254dc729036",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0xcee104acd38b940c8f1c62c6d7ea00a0ad2241d6dee0509a4bf27297508870d3",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x7e3626e306588eba79cafab73f0709e55ab8f4bdfe8c8b75034a430fc56ece89",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x1c31df52b6df56407dd95f83082e8beb9cfc9532ac111d5bd8491651d95ba775",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x09dd7a49174d6fcc9f4c6f7942c18060a935ddd03ee69b594189b8c3581276ea",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      {
        owner: "0x86604282dc604481b809845be49667607c470644f6822fc01eb0d22f167e08cf",
        amount: "0xFFFFFFFFFFFFFFFF",
        asset_id: "0x0000000000000000000000000000000000000000000000000000000000000000"
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
  transaction_parameters: {
    contract_max_size: 16777216,
    max_inputs: 255,
    max_outputs: 255,
    max_witnesses: 255,
    max_gas_per_tx: 5e8,
    max_script_length: 1048576,
    max_script_data_length: 1048576,
    max_static_contracts: 255,
    max_storage_slots: 255,
    max_predicate_length: 1048576,
    max_predicate_data_length: 1048576,
    max_gas_per_predicate: 1e8,
    gas_price_factor: 1e9,
    gas_per_byte: 4,
    max_message_data_length: 1048576
  },
  gas_costs: {
    add: 1,
    addi: 1,
    aloc: 1,
    and: 1,
    andi: 1,
    bal: 21,
    bhei: 1,
    bhsh: 1,
    burn: 35,
    cb: 2,
    cfei: 1,
    cfsi: 1,
    croo: 28,
    div: 1,
    divi: 1,
    ecr: 1703,
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
    k256: 19,
    lb: 1,
    log: 40,
    lt: 1,
    lw: 1,
    mcpi: 3,
    mint: 35,
    mlog: 1,
    mod: 1,
    modi: 1,
    move: 1,
    movi: 1,
    mroo: 2,
    mul: 1,
    muli: 1,
    noop: 1,
    not: 1,
    or: 1,
    ori: 1,
    ret_contract: 61,
    rvrt_contract: 61,
    s256: 5,
    sb: 1,
    scwq: 11,
    sll: 1,
    slli: 1,
    srl: 1,
    srli: 1,
    srw: 23,
    sub: 1,
    subi: 1,
    sw: 1,
    sww: 79,
    swwq: 72,
    time: 1,
    tr: 120,
    tro: 99,
    xor: 1,
    xori: 1,
    call: {
      base: 116,
      dep_per_unit: 14
    },
    ccp: {
      base: 24,
      dep_per_unit: 13
    },
    csiz: {
      base: 17,
      dep_per_unit: 15
    },
    ldc: {
      base: 23,
      dep_per_unit: 14
    },
    logd: {
      base: 46,
      dep_per_unit: 19
    },
    mcl: {
      base: 1,
      dep_per_unit: 2359
    },
    mcli: {
      base: 1,
      dep_per_unit: 2322
    },
    mcp: {
      base: 1,
      dep_per_unit: 1235
    },
    meq: {
      base: 1,
      dep_per_unit: 2343
    },
    retd_contract: {
      base: 65,
      dep_per_unit: 19
    },
    smo: {
      base: 84,
      dep_per_unit: 13
    },
    srwq: {
      base: 54,
      dep_per_unit: 2
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
};

// src/cli/commands/dev/startFuelCore.ts
var killNode = (params) => () => {
  const { core, state, killFn } = params;
  if (core.pid && !state.isDead) {
    state.isDead = true;
    killFn(Number(core.pid));
  }
};
var createTempChainConfig = (coreDir) => {
  const chainConfigPath = (0, import_path4.join)(coreDir, "chainConfig.json");
  const chainConfigJson = JSON.stringify(defaultChainConfig, null, 2);
  (0, import_fs4.mkdirSync)((0, import_path4.dirname)(chainConfigPath), { recursive: true });
  (0, import_fs4.writeFileSync)(chainConfigPath, chainConfigJson);
  return chainConfigPath;
};
var startFuelCore = async (config) => {
  log(`Starting ${getBinarySource(config.useBuiltinFuelCore)} 'fuel-core' node..`);
  const coreDir = (0, import_path4.join)(config.basePath, ".fuels");
  const bindIp = "0.0.0.0";
  const accessIp = "127.0.0.1";
  const chainConfig = config.chainConfig ?? createTempChainConfig(coreDir);
  const port = config.fuelCorePort ?? await (0, import_portfinder.getPortPromise)({ port: 4e3 });
  const providerUrl = `http://${accessIp}:${port}/graphql`;
  const flags = [
    "run",
    ["--ip", bindIp],
    ["--port", port.toString()],
    ["--db-path", coreDir],
    ["--min-gas-price", "0"],
    ["--poa-instant", "true"],
    ["--consensus-key", defaultConsensusKey],
    ["--chain", chainConfig],
    "--vm-backtrace",
    "--utxo-validation",
    "--manual_blocks_enabled"
  ].flat();
  return new Promise((resolve4, reject) => {
    const builtInFuelsCorePath = findBinPath("fuels-core");
    const command = config.useBuiltinFuelCore ? builtInFuelsCorePath : "fuel-core";
    const core = (0, import_child_process.spawn)(command, flags, { stdio: "pipe" });
    if (loggingConfig.isLoggingEnabled) {
      core.stderr.pipe(process.stderr);
    }
    if (loggingConfig.isDebugEnabled) {
      core.stdout.pipe(process.stdout);
    }
    const state = { isDead: false };
    const killChildProcess = killNode({ core, state, killFn: import_tree_kill.default });
    process.on("beforeExit", killChildProcess);
    process.on("uncaughtException", killChildProcess);
    core.stderr?.on("data", (data) => {
      if (/Binding GraphQL provider to/.test(data)) {
        resolve4({
          bindIp,
          accessIp,
          port,
          providerUrl,
          killChildProcess,
          chainConfig
        });
      }
      if (/error/i.test(data)) {
        error(
          `Some error occurred. Please, check to see if you have another instance running locally.`
        );
        reject(data.toString());
      }
    });
    core.on("error", reject);
  });
};
var autoStartFuelCore = async (config) => {
  let fuelCore;
  if (config.autoStartFuelCore) {
    fuelCore = await startFuelCore(config);
    config.providerUrl = fuelCore.providerUrl;
    config.privateKey = defaultConsensusKey;
  }
  return fuelCore;
};

// src/cli/commands/build/buildSwayPrograms.ts
var import_child_process2 = require("child_process");
var onForcExit = (onResultFn, onErrorFn) => (code) => {
  if (code) {
    onErrorFn(code);
  } else {
    onResultFn();
  }
};
var onForcError = (onError) => (err) => {
  error(err);
  onError(err);
};
var buildSwayProgram = async (config, path) => {
  debug("Building Sway program", path);
  return new Promise((resolve4, reject) => {
    const builtInForcPath = findBinPath("fuels-forc");
    const command = config.useBuiltinForc ? builtInForcPath : "forc";
    const forc = (0, import_child_process2.spawn)(command, ["build", "-p", path], { stdio: "pipe" });
    if (loggingConfig.isLoggingEnabled) {
      forc.stderr?.pipe(process.stderr);
    }
    if (loggingConfig.isDebugEnabled) {
      forc.stdout?.pipe(process.stdout);
    }
    const onExit = onForcExit(resolve4, reject);
    const onError = onForcError(reject);
    forc.on("exit", onExit);
    forc.on("error", onError);
  });
};
async function buildSwayPrograms(config) {
  log(`Building Sway programs using ${getBinarySource(config.useBuiltinFuelCore)} 'forc' binary`);
  const paths = config.workspace ? [config.workspace] : [config.contracts, config.predicates, config.scripts].flat();
  await Promise.all(paths.map((path) => buildSwayProgram(config, path)));
}

// src/cli/commands/build/generateTypes.ts
var import_abi_typegen = require("@fuel-ts/abi-typegen");
var import_runTypegen = require("@fuel-ts/abi-typegen/runTypegen");
var import_fs5 = require("fs");
var import_path5 = require("path");

// src/cli/templates/index.ts
var import_handlebars = require("handlebars");

// src/cli/templates/index.hbs
var templates_default = "{{#each paths}}\nexport * from './{{this}}';\n{{/each}}\n";

// src/cli/templates/index.ts
function renderIndexTemplate(paths) {
  const renderTemplate = (0, import_handlebars.compile)(templates_default, {
    strict: true,
    noEscape: true
  });
  return renderTemplate({
    paths
  });
}

// src/cli/commands/build/generateTypes.ts
async function generateTypesForProgramType(config, paths, programType) {
  debug("Generating types..");
  const filepaths = await getABIPaths(paths);
  const pluralizedDirName = `${String(programType).toLocaleLowerCase()}s`;
  (0, import_runTypegen.runTypegen)({
    programType,
    cwd: config.basePath,
    filepaths,
    output: (0, import_path5.join)(config.output, pluralizedDirName),
    silent: !loggingConfig.isDebugEnabled
  });
  return pluralizedDirName;
}
async function generateTypes(config) {
  log("Generating types..");
  const { contracts, scripts, predicates, output } = config;
  (0, import_fs5.mkdirSync)(output, { recursive: true });
  const members = [
    { type: import_abi_typegen.ProgramTypeEnum.CONTRACT, programs: contracts },
    { type: import_abi_typegen.ProgramTypeEnum.SCRIPT, programs: scripts },
    { type: import_abi_typegen.ProgramTypeEnum.PREDICATE, programs: predicates }
  ];
  const pluralizedDirNames = await Promise.all(
    members.filter(({ programs }) => !!programs.length).map(({ programs, type }) => generateTypesForProgramType(config, programs, type))
  );
  const indexFile = await renderIndexTemplate(pluralizedDirNames);
  (0, import_fs5.writeFileSync)((0, import_path5.join)(config.output, "index.ts"), indexFile);
}

// src/cli/commands/build/index.ts
async function build(config, program) {
  log("Building..");
  await buildSwayPrograms(config);
  await generateTypes(config);
  const options = program?.opts();
  if (options?.deploy) {
    const fuelCore = await autoStartFuelCore(config);
    await deploy(config);
    fuelCore?.killChildProcess();
  }
}

// src/cli/commands/dev/index.ts
var import_chokidar = require("chokidar");
var import_glob = require("glob");

// src/cli/config/loadConfig.ts
var import_configs = require("@fuel-ts/wallet/configs");
var import_bundle_require = require("bundle-require");
var import_joycon = __toESM(require("joycon"));
var import_path6 = require("path");

// src/cli/commands/init/shouldUseBuiltinForc.ts
var import_cli = require("@fuel-ts/versions/cli");
var shouldUseBuiltinForc = () => {
  const { systemForcVersion } = (0, import_cli.getSystemForc)();
  if (systemForcVersion !== null) {
    return false;
  }
  return true;
};

// src/cli/commands/init/shouldUseBuiltinFuelCore.ts
var import_cli2 = require("@fuel-ts/versions/cli");
var shouldUseBuiltinFuelCore = () => {
  const { systemFuelCoreVersion } = (0, import_cli2.getSystemFuelCore)();
  if (systemFuelCoreVersion !== null) {
    return false;
  }
  return true;
};

// src/cli/config/validateConfig.ts
var yup = __toESM(require("yup"));
var schema = yup.object({
  workspace: yup.string(),
  contracts: yup.array(yup.string()),
  scripts: yup.array(yup.string()),
  predicates: yup.array(yup.string()),
  output: yup.string().required("config.output should be a valid string")
}).required();
async function validateConfig(config) {
  return schema.validate(config);
}

// src/cli/config/loadConfig.ts
async function loadConfig(cwd) {
  const configJoycon = new import_joycon.default();
  const configPath = await configJoycon.resolve({
    files: ["ts", "js", "cjs", "mjs"].map((e) => `fuels.config.${e}`),
    cwd,
    stopDir: (0, import_path6.parse)(cwd).root
  });
  if (!configPath) {
    throw new Error("Config file not found!");
  }
  const esbuildOptions = {
    target: "ES2021",
    platform: "node",
    format: "esm"
  };
  const result = await (0, import_bundle_require.bundleRequire)({
    filepath: configPath,
    esbuildOptions,
    cwd
  });
  const userConfig = result.mod.default;
  await validateConfig(userConfig);
  const useBuiltinForc = userConfig.useBuiltinForc ?? shouldUseBuiltinForc();
  const useBuiltinFuelCore = userConfig.useBuiltinFuelCore ?? shouldUseBuiltinFuelCore();
  const config = {
    contracts: [],
    scripts: [],
    predicates: [],
    deployConfig: {},
    autoStartFuelCore: true,
    fuelCorePort: 4e3,
    providerUrl: import_configs.FUEL_NETWORK_URL,
    privateKey: defaultConsensusKey,
    ...userConfig,
    basePath: cwd,
    useBuiltinForc,
    useBuiltinFuelCore,
    configPath
  };
  config.output = (0, import_path6.resolve)(cwd, config.output);
  config.autoStartFuelCore = userConfig.autoStartFuelCore ?? true;
  if (!userConfig.workspace) {
    const { contracts, predicates, scripts } = userConfig;
    config.contracts = (contracts || []).map((c) => (0, import_path6.resolve)(cwd, c));
    config.scripts = (scripts || []).map((s) => (0, import_path6.resolve)(cwd, s));
    config.predicates = (predicates || []).map((p) => (0, import_path6.resolve)(cwd, p));
  } else {
    const workspace = (0, import_path6.resolve)(cwd, userConfig.workspace);
    const forcToml = readForcToml(workspace);
    if (!forcToml.workspace) {
      const workspaceMsg = `Forc workspace not detected in:
  ${workspace}/Forc.toml`;
      const swayProgramType = readSwayType(workspace);
      const exampleMsg = `Try using '${swayProgramType}s' instead of 'workspace' in:
  ${configPath}`;
      throw new Error([workspaceMsg, exampleMsg].join("\n\n"));
    }
    const swayMembers = forcToml.workspace.members.map((member) => (0, import_path6.resolve)(workspace, member));
    swayMembers.forEach((path) => {
      const type = readSwayType(path);
      config[`${type}s`].push(path);
    });
    config.workspace = workspace;
  }
  return config;
}

// src/cli/commands/withConfig.ts
var import_utils = require("@fuel-ts/utils");
var withConfigErrorHandler = async (err, config) => {
  error(err);
  if (config) {
    await config.onFailure?.(err, config);
  }
};
function withConfig(program, command, fn) {
  return async () => {
    const options = program.opts();
    let config;
    try {
      config = await loadConfig(options.path);
    } catch (err) {
      await withConfigErrorHandler(err);
      return;
    }
    try {
      const eventData = await fn(config, program);
      config.onSuccess?.(
        {
          type: command,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: eventData
        },
        config
      );
      log(`\u{1F389}  ${(0, import_utils.capitalizeString)(command)} completed successfully!`);
    } catch (err) {
      await withConfigErrorHandler(err, config);
    }
  };
}

// src/cli/commands/dev/index.ts
var closeAllFileHandlers = (handlers) => {
  handlers.forEach((h) => h.close());
};
var buildAndDeploy = async (config) => {
  await build(config);
  return deploy(config);
};
var getConfigFilepathsToWatch = (config) => {
  const configFilePathsToWatch = [config.configPath];
  if (config.chainConfig) {
    configFilePathsToWatch.push(config.chainConfig);
  }
  return configFilePathsToWatch;
};
var workspaceFileChanged = (state) => async (_event, path) => {
  log(`
File changed: ${path}`);
  await buildAndDeploy(state.config);
};
var configFileChanged = (state) => async (_event, path) => {
  log(`
File changed: ${path}`);
  closeAllFileHandlers(state.watchHandlers);
  state.fuelCore?.killChildProcess();
  try {
    await dev(await loadConfig(state.config.basePath));
  } catch (err) {
    await withConfigErrorHandler(err, state.config);
  }
};
var dev = async (config) => {
  const fuelCore = await autoStartFuelCore(config);
  const configFilePaths = getConfigFilepathsToWatch(config);
  const { contracts, scripts, predicates, basePath: cwd } = config;
  const workspaceFilePaths = [contracts, predicates, scripts].flat().flatMap((dir) => [
    dir,
    (0, import_glob.globSync)(`${dir}/**/*.toml`, { cwd }),
    (0, import_glob.globSync)(`${dir}/**/*.sw`, { cwd })
  ]).flat();
  try {
    await buildAndDeploy(config);
    const watchHandlers = [];
    const options = { persistent: true, ignoreInitial: true, ignored: "**/out/**" };
    const state = { config, watchHandlers, fuelCore };
    watchHandlers.push((0, import_chokidar.watch)(configFilePaths, options).on("all", configFileChanged(state)));
    watchHandlers.push((0, import_chokidar.watch)(workspaceFilePaths, options).on("all", workspaceFileChanged(state)));
  } catch (err) {
    error(err);
    throw err;
  }
};

// src/cli/commands/init/index.ts
var import_fs6 = require("fs");
var import_glob2 = require("glob");
var import_path7 = require("path");

// src/cli/templates/fuels.config.ts
var import_handlebars2 = __toESM(require("handlebars"));

// src/cli/templates/fuels.config.hbs
var fuels_config_default = "import { createConfig } from 'fuels';\n\nexport default createConfig({\n  {{#if (isDefined workspace)}}\n  workspace: '{{workspace}}',\n  {{else}}\n    {{#if (isDefined contracts)}}\n  contracts: [\n      {{#each contracts}}\n        '{{this}}',\n      {{/each}}\n  ],\n    {{/if}}\n    {{#if (isDefined predicates)}}\n  predicates: [\n      {{#each predicates}}\n        '{{this}}',\n      {{/each}}\n  ],\n    {{/if}}\n    {{#if (isDefined scripts)}}\n  scripts: [\n      {{#each scripts}}\n        '{{this}}',\n      {{/each}}\n  ],\n    {{/if}}\n  {{/if}}\n  output: '{{output}}',\n  {{#if (isDefined useBuiltinForc)}}\n  useBuiltinForc: {{useBuiltinForc}},\n  {{/if}}\n  {{#if (isDefined useBuiltinFuelCore)}}\n  useBuiltinFuelCore: {{useBuiltinFuelCore}},\n  {{/if}}\n  {{#if (isDefined autoStartFuelCore)}}\n  autoStartFuelCore: {{autoStartFuelCore}},\n  {{/if}}\n});\n\n/**\n * Check the docs:\n * https://fuellabs.github.io/fuels-ts/guide/cli/config-file\n */\n";

// src/cli/templates/fuels.config.ts
import_handlebars2.default.registerHelper("isDefined", (v) => v !== void 0);
function renderFuelsConfigTemplate(props) {
  const renderTemplate = (0, import_handlebars2.compile)(fuels_config_default, {
    strict: true,
    noEscape: true
  });
  return renderTemplate(props);
}

// src/cli/commands/init/index.ts
function init(program) {
  const options = program.opts();
  const { path, autoStartFuelCore: autoStartFuelCore2, useBuiltinForc, useBuiltinFuelCore } = options;
  let workspace;
  let absoluteWorkspace;
  if (options.workspace) {
    absoluteWorkspace = (0, import_path7.resolve)(path, options.workspace);
    workspace = `./${(0, import_path7.relative)(path, absoluteWorkspace)}`;
  }
  const absoluteOutput = (0, import_path7.resolve)(path, options.output);
  const output = `./${(0, import_path7.relative)(path, absoluteOutput)}`;
  const [contracts, scripts, predicates] = ["contracts", "scripts", "predicates"].map(
    (optionName) => {
      const pathOrGlob = options[optionName];
      if (!pathOrGlob) {
        return void 0;
      }
      const expanded = (0, import_glob2.globSync)(pathOrGlob, { cwd: path });
      const relatives = expanded.map((e) => (0, import_path7.relative)(path, e));
      return relatives;
    }
  );
  const noneIsInformed = ![workspace, contracts, scripts, predicates].find((v) => v !== void 0);
  if (noneIsInformed) {
    process.stdout.write(`error: required option '-w, --workspace <path>' not specified\r`);
    process.exit(1);
  }
  const fuelsConfigPath = (0, import_path7.join)(path, "fuels.config.ts");
  if ((0, import_fs6.existsSync)(fuelsConfigPath)) {
    throw new Error(`Config file exists, aborting.
  ${fuelsConfigPath}`);
  }
  const renderedConfig = renderFuelsConfigTemplate({
    workspace,
    contracts,
    scripts,
    predicates,
    output,
    useBuiltinForc,
    useBuiltinFuelCore,
    autoStartFuelCore: autoStartFuelCore2
  });
  (0, import_fs6.writeFileSync)(fuelsConfigPath, renderedConfig);
  log(`Config file created at:

 ${fuelsConfigPath}
`);
}

// src/cli/commands/withProgram.ts
function withProgram(program, _command, fn) {
  return async () => {
    try {
      await fn(program);
    } catch (err) {
      error(err);
    }
  };
}

// src/cli.ts
var onPreAction = (command) => {
  const opts = command.opts();
  configureLogging({
    isDebugEnabled: opts.debug,
    isLoggingEnabled: !opts.silent
  });
};
var configureCli = () => {
  const program = new import_commander.Command();
  program.name("fuels");
  program.option("-D, --debug", "Enables verbose logging", false);
  program.option("-S, --silent", "Omit output messages", false);
  program.version(import_versions.versions.FUELS, "-v, --version", "Output the version number");
  program.helpOption("-h, --help", "Display help");
  program.addHelpCommand("help [command]", "Display help for command");
  program.enablePositionalOptions(true);
  program.hook("preAction", onPreAction);
  const pathOption = new import_commander.Option("-p, --path <path>", "Path to project root").default(process.cwd());
  let command;
  const desc = `Relative path/globals to `;
  const arg = `<path|global>`;
  (command = program.command("init" /* init */)).description("Create a sample `fuel.config.ts` file").addOption(pathOption).option("-w, --workspace <path>", "Relative dir path to Forc workspace").addOption(new import_commander.Option(`-c, --contracts ${arg}`, `${desc} Contracts`).conflicts("workspace")).addOption(new import_commander.Option(`-s, --scripts ${arg}`, `${desc} Scripts`).conflicts("workspace")).addOption(new import_commander.Option(`-p, --predicates ${arg}`, `${desc} Predicates`).conflicts("workspace")).requiredOption("-o, --output <path>", "Relative dir path for Typescript generation output").option("--use-builtin-forc", "Use buit-in `forc` to build Sway programs").option("--use-builtin-fuel-core", "Use buit-in `fuel-core` when starting a Fuel node").option("--auto-start-fuel-core", "Auto-starts a `fuel-core` node during `dev` command").action(withProgram(command, "init" /* init */, init));
  (command = program.command("dev" /* dev */)).description("Start a Fuel node and run build + deploy on every file change").addOption(pathOption).action(withConfig(command, "dev" /* dev */, dev));
  (command = program.command("build" /* build */)).description("Build Sway programs and generate Typescript for them").addOption(pathOption).option(
    "-d, --deploy",
    "Deploy contracts after build (auto-starts a `fuel-core` node if needed)"
  ).action(withConfig(command, "build" /* build */, build));
  (command = program.command("deploy" /* deploy */)).description("Deploy contracts to the Fuel network").addOption(pathOption).action(withConfig(command, "deploy" /* deploy */, deploy));
  (0, import_cli3.configureCliOptions)(
    program.command("typegen").description(`Generate Typescript from Sway ABI JSON files`)
  );
  program.command("versions").description("Check for version incompatibilities").action(import_cli4.runVersions);
  program.command("core", "Wrapper around Fuel Core binary", {
    executableFile: findBinPath("fuels-core")
  });
  program.command("forc", "Wrapper around Forc binary", {
    executableFile: findBinPath("fuels-forc")
  });
  return program;
};
var run = async (argv) => {
  const program = configureCli();
  return program.parseAsync(argv);
};

// src/bin.ts
try {
  run(process.argv).catch(process.stderr.write);
} catch (err) {
  error(err?.message || err);
  process.exit(1);
}
//# sourceMappingURL=bin.js.map