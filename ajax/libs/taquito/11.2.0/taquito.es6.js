import { OpKind, RpcClient } from '@taquito/rpc';
export { OpKind } from '@taquito/rpc';
import { ReplaySubject, defer, timer, from, of, EMPTY, combineLatest, throwError, range, concat, BehaviorSubject, Subject, NEVER, Observable } from 'rxjs';
import { first, tap, map, switchMap, mapTo, switchMapTo, filter, shareReplay, catchError, distinctUntilChanged, takeWhile, distinctUntilKeyChanged, timeoutWith, startWith, concatMap, retry, takeUntil, publish, refCount, pluck } from 'rxjs/operators';
import { Schema, ParameterSchema, ViewSchema, MichelsonMap } from '@taquito/michelson-encoder';
export { MichelsonMap, UnitValue } from '@taquito/michelson-encoder';
import BigNumber from 'bignumber.js';
import { validateOperation, ValidationResult, InvalidOperationHashError, validateAddress, InvalidAddressError, validateKeyHash, InvalidKeyHashError, validateContractAddress, InvalidContractAddressError, encodeExpr } from '@taquito/utils';
import { HttpResponseError, STATUS_CODE } from '@taquito/http-utils';
import { Parser, packDataBytes } from '@taquito/michel-codec';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class RpcForger {
    constructor(context) {
        this.context = context;
    }
    forge({ branch, contents }) {
        return this.context.rpc.forgeOperations({ branch, contents });
    }
}

class RpcInjector {
    constructor(context) {
        this.context = context;
    }
    inject(signedOperationBytes) {
        return this.context.rpc.injectOperation(signedOperationBytes);
    }
}

class UnconfiguredSignerError extends Error {
    constructor() {
        super('No signer has been configured. Please configure one by calling setProvider({signer}) on your TezosToolkit instance.');
        this.name = 'UnconfiguredSignerError';
    }
}
/**
 * @description Default signer implementation which does nothing and produce invalid signature
 */
class NoopSigner {
    publicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new UnconfiguredSignerError();
        });
    }
    publicKeyHash() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new UnconfiguredSignerError();
        });
    }
    secretKey() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new UnconfiguredSignerError();
        });
    }
    sign(_bytes, _watermark) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new UnconfiguredSignerError();
        });
    }
}

var DEFAULT_GAS_LIMIT;
(function (DEFAULT_GAS_LIMIT) {
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["DELEGATION"] = 10600] = "DELEGATION";
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["ORIGINATION"] = 10600] = "ORIGINATION";
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["TRANSFER"] = 10600] = "TRANSFER";
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL"] = 1100] = "REVEAL";
})(DEFAULT_GAS_LIMIT || (DEFAULT_GAS_LIMIT = {}));
var DEFAULT_FEE;
(function (DEFAULT_FEE) {
    DEFAULT_FEE[DEFAULT_FEE["DELEGATION"] = 1257] = "DELEGATION";
    DEFAULT_FEE[DEFAULT_FEE["ORIGINATION"] = 10000] = "ORIGINATION";
    DEFAULT_FEE[DEFAULT_FEE["TRANSFER"] = 10000] = "TRANSFER";
    DEFAULT_FEE[DEFAULT_FEE["REVEAL"] = 374] = "REVEAL";
})(DEFAULT_FEE || (DEFAULT_FEE = {}));
var DEFAULT_STORAGE_LIMIT;
(function (DEFAULT_STORAGE_LIMIT) {
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["DELEGATION"] = 0] = "DELEGATION";
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["ORIGINATION"] = 257] = "ORIGINATION";
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["TRANSFER"] = 257] = "TRANSFER";
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["REVEAL"] = 0] = "REVEAL";
})(DEFAULT_STORAGE_LIMIT || (DEFAULT_STORAGE_LIMIT = {}));
var Protocols;
(function (Protocols) {
    Protocols["Pt24m4xi"] = "Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd";
    Protocols["PsBABY5H"] = "PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU";
    Protocols["PsBabyM1"] = "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS";
    Protocols["PsCARTHA"] = "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb";
    Protocols["PsDELPH1"] = "PsDELPH1Kxsxt8f9eWbxQeRxkjfbxoqM52jvs5Y5fBxWWh4ifpo";
    Protocols["PtEdo2Zk"] = "PtEdo2ZkT9oKpimTah6x2embF25oss54njMuPzkJTEi5RqfdZFA";
    Protocols["PsFLorena"] = "PsFLorenaUUuikDWvMDr6fGBRG8kt3e3D3fHoXK1j1BFRxeSH4i";
    Protocols["PtGRANADs"] = "PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV";
    Protocols["PtHangz2"] = "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx";
    Protocols["PsiThaCa"] = "PsiThaCaT47Zboaw71QWScM8sXeMM7bbQFncK9FLqYc6EKdpjVP";
    Protocols["Psithaca2"] = "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A";
    Protocols["ProtoALpha"] = "ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK";
})(Protocols || (Protocols = {}));
const protocols = {
    '004': [Protocols.Pt24m4xi],
    '005': [Protocols.PsBABY5H, Protocols.PsBabyM1],
    '006': [Protocols.PsCARTHA],
    '007': [Protocols.PsDELPH1],
    '008': [Protocols.PtEdo2Zk],
    '009': [Protocols.PsFLorena],
    '010': [Protocols.PtGRANADs],
    '011': [Protocols.PtHangz2],
    '012': [Protocols.PsiThaCa],
    '013': [Protocols.Psithaca2],
    '014': [Protocols.ProtoALpha],
};
var DefaultLambdaAddresses;
(function (DefaultLambdaAddresses) {
    DefaultLambdaAddresses["MAINNET"] = "KT1CPuTzwC7h7uLXd5WQmpMFso1HxrLBUtpE";
    DefaultLambdaAddresses["CARTHAGENET"] = "KT1VAy1o1FGiXYfD3YT7x7k5eF5HSHhmc1u6";
    DefaultLambdaAddresses["DELPHINET"] = "KT19abMFs3haqyKYwqdLjK9GbtofryZLvpiK";
    DefaultLambdaAddresses["EDONET"] = "KT1A64nVZDccAHGAsf1ZyVajXZcbiwjV3SnN";
    DefaultLambdaAddresses["FLORENCENET"] = "KT1KCe3YqGnudsiCWb5twbe2DH5T3EMdLpSE";
    DefaultLambdaAddresses["GRANADANET"] = "KT1BCun2vsA4GBQvsKAuGD5x873MfW2jsN9z";
    DefaultLambdaAddresses["HANGZHOUNET"] = "KT1PWtBAr1hjK9M9s9oZNZFbfzPdkkD6PSJR";
    DefaultLambdaAddresses["ITHACANET"] = "KT1CsEGfRHWeuUQFh9LfVFLVMbm7DFBuHPPU";
    DefaultLambdaAddresses["ITHACANET2"] = "KT1H2a5vGkMLFGBPMs6oRRJshCvYeXSBSadn";
})(DefaultLambdaAddresses || (DefaultLambdaAddresses = {}));
var ChainIds;
(function (ChainIds) {
    ChainIds["MAINNET"] = "NetXdQprcVkpaWU";
    ChainIds["CARTHAGENET"] = "NetXjD3HPJJjmcd";
    ChainIds["DELPHINET"] = "NetXm8tYqnMWky1";
    ChainIds["EDONET"] = "NetXSgo1ZT2DRUG";
    ChainIds["FLORENCENET"] = "NetXxkAx4woPLyu";
    ChainIds["GRANADANET"] = "NetXz969SFaFn8k";
    ChainIds["HANGZHOUNET"] = "NetXZSsxBpMQeAT";
    ChainIds["ITHACANET"] = "NetXbhmtAbMukLc";
    ChainIds["ITHACANET2"] = "NetXnHfVqm9iesp";
})(ChainIds || (ChainIds = {}));

const TZ_DECIMALS = 6;
const MTZ_DECIMALS = 3;
function getDecimal(format) {
    switch (format) {
        case 'tz':
            return TZ_DECIMALS;
        case 'mtz':
            return MTZ_DECIMALS;
        case 'mutez':
        default:
            return 0;
    }
}
function format(from = 'mutez', to = 'mutez', amount) {
    const bigNum = new BigNumber(amount);
    if (bigNum.isNaN()) {
        return amount;
    }
    return bigNum
        .multipliedBy(Math.pow(10, getDecimal(from)))
        .dividedBy(Math.pow(10, getDecimal(to)));
}

class InvalidParameterError extends Error {
    constructor(smartContractMethodName, sigs, args) {
        super(`${smartContractMethodName} Received ${args.length} arguments while expecting one of the following signatures (${JSON.stringify(sigs)})`);
        this.smartContractMethodName = smartContractMethodName;
        this.sigs = sigs;
        this.args = args;
        this.name = 'Invalid parameters error';
    }
}
class UndefinedLambdaContractError extends Error {
    constructor() {
        super('This might happen if you are using a sandbox. Please provide the address of a lambda contract as a parameter of the read method.');
        this.name = 'Undefined LambdaContract error';
    }
}
class InvalidDelegationSource extends Error {
    constructor(source) {
        super(`Since Babylon delegation source can no longer be a contract address ${source}. Please use the smart contract abstraction to set your delegate.`);
        this.source = source;
        this.name = 'Invalid delegation source error';
    }
}
class InvalidCodeParameter extends Error {
    constructor(message, data) {
        super(message);
        this.message = message;
        this.data = data;
        this.name = 'InvalidCodeParameter';
    }
}
class InvalidInitParameter extends Error {
    constructor(message, data) {
        super(message);
        this.message = message;
        this.data = data;
        this.name = 'InvalidInitParameter';
    }
}
class InvalidViewParameterError extends Error {
    constructor(smartContractViewName, sigs, args, originalError) {
        super(`Unable to encode the parameter of the view: ${smartContractViewName}. Received ${args} as parameter while expecting one of the following signatures (${JSON.stringify(sigs)})`);
        this.smartContractViewName = smartContractViewName;
        this.sigs = sigs;
        this.args = args;
        this.originalError = originalError;
        this.name = 'Invalid view parameters error';
        this.cause = originalError;
    }
}
class ViewSimulationError extends Error {
    constructor(message, viewName, failWith, originalError) {
        super(message);
        this.message = message;
        this.viewName = viewName;
        this.failWith = failWith;
        this.originalError = originalError;
        this.name = 'ViewSimulationError';
    }
}
const validateAndExtractFailwith = (error) => {
    if (isJsonString(error.body)) {
        const parsedError = JSON.parse(error.body);
        if (Array.isArray(parsedError) && 'with' in parsedError[parsedError.length - 1]) {
            return parsedError[parsedError.length - 1].with;
        }
    }
};
const isJsonString = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
class InvalidViewSimulationContext extends Error {
    constructor(info) {
        super(`${info} Please configure the context of the view execution in the executeView method.`);
        this.info = info;
        this.name = 'InvalidViewSimulationContext';
    }
}

const createOriginationOperation = ({ code, init, balance = '0', delegate, storage, fee = DEFAULT_FEE.ORIGINATION, gasLimit = DEFAULT_GAS_LIMIT.ORIGINATION, storageLimit = DEFAULT_STORAGE_LIMIT.ORIGINATION, mutez = false, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (storage !== undefined && init !== undefined) {
        throw new Error('Storage and Init cannot be set a the same time. Please either use storage or init but not both.');
    }
    if (!Array.isArray(code)) {
        throw new InvalidCodeParameter('Wrong code parameter type, expected an array', code);
    }
    let contractStorage;
    if (storage !== undefined) {
        const storageType = code.find((p) => 'prim' in p && p.prim === 'storage');
        if ((storageType === null || storageType === void 0 ? void 0 : storageType.args) === undefined) {
            throw new InvalidCodeParameter('The storage section is missing from the script', code);
        }
        const schema = new Schema(storageType.args[0]); // TODO
        contractStorage = schema.Encode(storage);
    }
    else if (init !== undefined && typeof init === 'object') {
        contractStorage = init;
    }
    else {
        throw new InvalidInitParameter('Wrong init parameter type, expected JSON Michelson', init);
    }
    const script = {
        code,
        storage: contractStorage,
    };
    const operation = {
        kind: OpKind.ORIGINATION,
        fee,
        gas_limit: gasLimit,
        storage_limit: storageLimit,
        balance: mutez ? balance.toString() : format('tz', 'mutez', balance).toString(),
        script,
    };
    if (delegate) {
        operation.delegate = delegate;
    }
    return operation;
});
const createTransferOperation = ({ to, amount, parameter, fee = DEFAULT_FEE.TRANSFER, gasLimit = DEFAULT_GAS_LIMIT.TRANSFER, storageLimit = DEFAULT_STORAGE_LIMIT.TRANSFER, mutez = false, }) => __awaiter(void 0, void 0, void 0, function* () {
    const operation = {
        kind: OpKind.TRANSACTION,
        fee,
        gas_limit: gasLimit,
        storage_limit: storageLimit,
        amount: mutez ? amount.toString() : format('tz', 'mutez', amount).toString(),
        destination: to,
        parameters: parameter,
    };
    return operation;
});
const createSetDelegateOperation = ({ delegate, source, fee = DEFAULT_FEE.DELEGATION, gasLimit = DEFAULT_GAS_LIMIT.DELEGATION, storageLimit = DEFAULT_STORAGE_LIMIT.DELEGATION, }) => __awaiter(void 0, void 0, void 0, function* () {
    const operation = {
        kind: OpKind.DELEGATION,
        source,
        fee,
        gas_limit: gasLimit,
        storage_limit: storageLimit,
        delegate,
    };
    return operation;
});
const createRegisterDelegateOperation = ({ fee = DEFAULT_FEE.DELEGATION, gasLimit = DEFAULT_GAS_LIMIT.DELEGATION, storageLimit = DEFAULT_STORAGE_LIMIT.DELEGATION, }, source) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        kind: OpKind.DELEGATION,
        fee,
        gas_limit: gasLimit,
        storage_limit: storageLimit,
        delegate: source,
    };
});
const createRevealOperation = ({ fee = DEFAULT_FEE.REVEAL, gasLimit = DEFAULT_GAS_LIMIT.REVEAL, storageLimit = DEFAULT_STORAGE_LIMIT.REVEAL, }, source, publicKey) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        kind: OpKind.REVEAL,
        fee,
        public_key: publicKey,
        source,
        gas_limit: gasLimit,
        storage_limit: storageLimit,
    };
});
const createRegisterGlobalConstantOperation = ({ value, source, fee, gasLimit, storageLimit, }) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        kind: OpKind.REGISTER_GLOBAL_CONSTANT,
        value,
        fee,
        gas_limit: gasLimit,
        storage_limit: storageLimit,
        source,
    };
});

const attachKind = (op, kind) => {
    return Object.assign(Object.assign({}, op), { kind });
};
const findWithKind = (arr, kind) => {
    if (Array.isArray(arr)) {
        const found = arr.find(op => op.kind === kind);
        if (found && isKind(found, kind)) {
            return found;
        }
    }
};
const isKind = (op, kind) => {
    return op.kind === kind;
};
const isOpWithFee = (op) => {
    return ['transaction', 'delegation', 'origination', 'reveal', 'register_global_constant'].indexOf(op.kind) !== -1;
};
const isOpRequireReveal = (op) => {
    return ['transaction', 'delegation', 'origination', 'register_global_constant'].indexOf(op.kind) !== -1;
};
const hasMetadata = (op) => {
    return 'metadata' in op;
};
const hasMetadataWithResult = (op) => {
    return hasMetadata(op) && 'operation_result' in op.metadata;
};
const hasMetadataWithInternalOperationResult = (op) => {
    return hasMetadata(op) && 'internal_operation_results' in op.metadata;
};

const isErrorWithMessage = (error) => {
    return 'with' in error;
};
class TezosOperationError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
        this.name = 'TezosOperationError';
        // Last error is 'often' the one with more detail
        const lastError = errors[errors.length - 1];
        this.id = lastError.id;
        this.kind = lastError.kind;
        this.message = `(${this.kind}) ${this.id}`;
        if (isErrorWithMessage(lastError) && lastError.with.string) {
            this.message = lastError.with.string;
        }
    }
}
class TezosPreapplyFailureError extends Error {
    constructor(result) {
        super('Preapply returned an unexpected result');
        this.result = result;
        this.name = 'TezosPreapplyFailureError';
    }
}
// Flatten all operation content results and internal operation results into a single array
// Some cases where we can have multiple operation results or internal operation results are:
// - When an operation includes a reveal operation
// - When an operation is made using the batch API
// - Smart contract call can contains internal operation results when they call other smart contract internally or originate contracts
const flattenOperationResult = (response) => {
    const results = Array.isArray(response) ? response : [response];
    const returnedResults = [];
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].contents.length; j++) {
            const content = results[i].contents[j];
            if (hasMetadataWithResult(content)) {
                returnedResults.push(Object.assign({ fee: content.fee }, content.metadata.operation_result));
                if (Array.isArray(content.metadata.internal_operation_results)) {
                    content.metadata.internal_operation_results.forEach((x) => returnedResults.push(x.result));
                }
            }
        }
    }
    return returnedResults;
};
/***
 * @description Flatten all error from preapply response (including internal error)
 */
const flattenErrors = (response, status = 'failed') => {
    const results = Array.isArray(response) ? response : [response];
    let errors = [];
    // Transaction that do not fail will be backtracked in case one failure occur
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].contents.length; j++) {
            const content = results[i].contents[j];
            if (hasMetadata(content)) {
                if (hasMetadataWithResult(content) && content.metadata.operation_result.status === status) {
                    errors = errors.concat(content.metadata.operation_result.errors || []);
                }
                if (hasMetadataWithInternalOperationResult(content) &&
                    Array.isArray(content.metadata.internal_operation_results)) {
                    for (const internalResult of content.metadata.internal_operation_results) {
                        if ('result' in internalResult && internalResult.result.status === status) {
                            errors = errors.concat(internalResult.result.errors || []);
                        }
                    }
                }
            }
        }
    }
    return errors;
};

/**
 * @description Utility class to interact with Tezos operations
 */
class Operation {
    /**
     *
     * @param hash Operation hash
     * @param raw Raw operation that was injected
     * @param context Taquito context allowing access to rpc and signer
     */
    constructor(hash, raw, results, context) {
        this.hash = hash;
        this.raw = raw;
        this.results = results;
        this.context = context;
        this._pollingConfig$ = new ReplaySubject(1);
        this._currentHeadPromise = undefined;
        // Caching the current head for one second
        this.currentHead$ = defer(() => {
            if (!this._currentHeadPromise) {
                this._currentHeadPromise = this.context.rpc.getBlock();
                timer(1000)
                    .pipe(first())
                    .subscribe(() => {
                    this._currentHeadPromise = undefined;
                });
            }
            return from(this._currentHeadPromise);
        });
        // Polling observable that emit until timeout is reached
        this.polling$ = defer(() => this._pollingConfig$.pipe(tap(({ timeout, interval }) => {
            if (timeout <= 0) {
                throw new Error('Timeout must be more than 0');
            }
            if (interval <= 0) {
                throw new Error('Interval must be more than 0');
            }
        }), map((config) => (Object.assign(Object.assign({}, config), { timeoutAt: Math.ceil(config.timeout / config.interval) + 1, count: 0 }))), switchMap((config) => timer(0, config.interval * 1000).pipe(mapTo(config))), tap((config) => {
            config.count++;
            if (config.count > config.timeoutAt) {
                throw new Error(`Confirmation polling timed out`);
            }
        })));
        // Observable that emit once operation is seen in a block
        this.confirmed$ = this.polling$.pipe(switchMapTo(this.currentHead$), map((head) => {
            for (let i = 3; i >= 0; i--) {
                head.operations[i].forEach((op) => {
                    if (op.hash === this.hash) {
                        this._foundAt = head.header.level;
                    }
                });
            }
            if (head.header.level - this._foundAt >= 0) {
                return this._foundAt;
            }
        }), filter((x) => x !== undefined), first(), shareReplay());
        this._foundAt = Number.POSITIVE_INFINITY;
        if (validateOperation(this.hash) !== ValidationResult.VALID) {
            throw new InvalidOperationHashError(`Invalid Operation Hash: ${this.hash}`);
        }
        this.confirmed$.pipe(first(), catchError(() => {
            return of(EMPTY);
        })).subscribe();
    }
    get includedInBlock() {
        return this._foundAt;
    }
    get revealOperation() {
        return (Array.isArray(this.results) &&
            this.results.find((op) => op.kind === 'reveal'));
    }
    get revealStatus() {
        if (this.revealOperation) {
            return this.revealOperation.metadata.operation_result.status;
        }
        else {
            return 'unknown';
        }
    }
    get status() {
        return (this.results.map((result) => {
            if (hasMetadataWithResult(result)) {
                return result.metadata.operation_result.status;
            }
            else {
                return 'unknown';
            }
        })[0] || 'unknown');
    }
    /**
     *
     * @param confirmations [0] Number of confirmation to wait for
     * @param interval [10] Polling interval
     * @param timeout [180] Timeout
     */
    confirmation(confirmations, interval, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof confirmations !== 'undefined' && confirmations < 1) {
                throw new Error('Confirmation count must be at least 1');
            }
            const confirmationPollingIntervalSecond = this.context.config.confirmationPollingIntervalSecond !== undefined
                ? this.context.config.confirmationPollingIntervalSecond
                : yield this.context.getConfirmationPollingInterval();
            const { defaultConfirmationCount, confirmationPollingTimeoutSecond } = this.context.config;
            this._pollingConfig$.next({
                interval: interval || confirmationPollingIntervalSecond,
                timeout: timeout || confirmationPollingTimeoutSecond,
            });
            const conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
            return new Promise((resolve, reject) => {
                this.confirmed$
                    .pipe(switchMap(() => this.polling$), switchMap(() => this.currentHead$), filter((head) => head.header.level - this._foundAt >= conf - 1), first())
                    .subscribe((_) => {
                    resolve(this._foundAt + (conf - 1));
                }, reject);
            });
        });
    }
}

class BatchOperation extends Operation {
    constructor(hash, params, source, raw, results, context) {
        super(hash, raw, results, context);
        this.params = params;
        this.source = source;
    }
    sumProp(arr, prop) {
        return arr.reduce((prev, current) => {
            return prop in current ? Number(current[prop]) + prev : prev;
        }, 0);
    }
    get status() {
        return (this.results
            .filter((result) => BATCH_KINDS.indexOf(result.kind) !== -1)
            .map((result) => {
            if (hasMetadataWithResult(result)) {
                return result.metadata.operation_result.status;
            }
            else {
                return 'unknown';
            }
        })[0] || 'unknown');
    }
    get fee() {
        return this.sumProp(this.params, 'fee');
    }
    get gasLimit() {
        return this.sumProp(this.params, 'gas_limit');
    }
    get storageLimit() {
        return this.sumProp(this.params, 'storage_limit');
    }
    get consumedGas() {
        return String(this.sumProp(flattenOperationResult({ contents: this.results }), 'consumed_gas'));
    }
    get storageDiff() {
        return String(this.sumProp(flattenOperationResult({ contents: this.results }), 'paid_storage_size_diff'));
    }
    get errors() {
        return flattenErrors({ contents: this.results });
    }
}

class OperationEmitter {
    constructor(context) {
        this.context = context;
    }
    get rpc() {
        return this.context.rpc;
    }
    get signer() {
        return this.context.signer;
    }
    isRevealOpNeeded(op, pkh) {
        return __awaiter(this, void 0, void 0, function* () {
            return !(yield this.isAccountRevealRequired(pkh)) || !this.isRevealRequiredForOpType(op)
                ? false
                : true;
        });
    }
    isAccountRevealRequired(publicKeyHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield this.rpc.getManagerKey(publicKeyHash);
            const haveManager = manager && typeof manager === 'object' ? !!manager.key : !!manager;
            return !haveManager;
        });
    }
    isRevealRequiredForOpType(op) {
        let opRequireReveal = false;
        for (const operation of op) {
            if (isOpRequireReveal(operation)) {
                opRequireReveal = true;
            }
        }
        return opRequireReveal;
    }
    // Originally from sotez (Copyright (c) 2018 Andrew Kishino)
    prepareOperation({ operation, source, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const counters = {};
            let ops = [];
            const blockHeaderPromise = this.rpc.getBlockHeader({ block: 'head~2' });
            const blockMetaPromise = this.rpc.getBlockMetadata();
            if (Array.isArray(operation)) {
                ops = [...operation];
            }
            else {
                ops = [operation];
            }
            // Implicit account who emit the operation
            const publicKeyHash = yield this.signer.publicKeyHash();
            let counterPromise = Promise.resolve(undefined);
            for (let i = 0; i < ops.length; i++) {
                if (isOpRequireReveal(ops[i]) || ops[i].kind === 'reveal') {
                    const { counter } = yield this.rpc.getContract(publicKeyHash);
                    counterPromise = Promise.resolve(counter);
                    break;
                }
            }
            const [header, metadata, headCounter] = yield Promise.all([
                blockHeaderPromise,
                blockMetaPromise,
                counterPromise,
            ]);
            if (!header) {
                throw new Error('Unable to fetch latest block header');
            }
            if (!metadata) {
                throw new Error('Unable to fetch latest metadata');
            }
            const head = header;
            const counter = parseInt(headCounter || '0', 10);
            if (!counters[publicKeyHash] || counters[publicKeyHash] < counter) {
                counters[publicKeyHash] = counter;
            }
            const getFee = (op) => {
                const opCounter = ++counters[publicKeyHash];
                return {
                    counter: `${opCounter}`,
                    fee: typeof op.fee === 'undefined' ? '0' : `${op.fee}`,
                    gas_limit: typeof op.gas_limit === 'undefined' ? '0' : `${op.gas_limit}`,
                    storage_limit: typeof op.storage_limit === 'undefined' ? '0' : `${op.storage_limit}`,
                };
            };
            const getSource = (op) => {
                return {
                    source: typeof op.source === 'undefined' ? source || publicKeyHash : op.source,
                };
            };
            const constructOps = (cOps) => cOps.map((op) => {
                switch (op.kind) {
                    case OpKind.ACTIVATION:
                        return Object.assign({}, op);
                    case OpKind.REVEAL:
                        return Object.assign(Object.assign(Object.assign({}, op), getSource(op)), getFee(op));
                    case OpKind.ORIGINATION:
                        return Object.assign(Object.assign(Object.assign(Object.assign({}, op), { balance: typeof op.balance !== 'undefined' ? `${op.balance}` : '0' }), getSource(op)), getFee(op));
                    case OpKind.TRANSACTION: {
                        const cops = Object.assign(Object.assign(Object.assign(Object.assign({}, op), { amount: typeof op.amount !== 'undefined' ? `${op.amount}` : '0' }), getSource(op)), getFee(op));
                        if (cops.source.toLowerCase().startsWith('kt1')) {
                            throw new Error(`KT1 addresses are not supported as source since ${Protocols.PsBabyM1}`);
                        }
                        return cops;
                    }
                    case OpKind.DELEGATION:
                        return Object.assign(Object.assign(Object.assign({}, op), getSource(op)), getFee(op));
                    case OpKind.REGISTER_GLOBAL_CONSTANT:
                        return Object.assign(Object.assign(Object.assign({}, op), getSource(op)), getFee(op));
                    default:
                        throw new Error('Unsupported operation');
                }
            });
            const branch = head.hash;
            const contents = constructOps(ops);
            const protocol = metadata.next_protocol;
            return {
                opOb: {
                    branch,
                    contents,
                    protocol,
                },
                counter,
            };
        });
    }
    forge({ opOb: { branch, contents, protocol }, counter }) {
        return __awaiter(this, void 0, void 0, function* () {
            const forgedBytes = yield this.context.forger.forge({ branch, contents });
            return {
                opbytes: forgedBytes,
                opOb: {
                    branch,
                    contents,
                    protocol,
                },
                counter,
            };
        });
    }
    simulate(op) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                opResponse: yield this.rpc.runOperation(op),
                op,
                context: this.context.clone(),
            };
        });
    }
    estimate(_a, estimator) {
        var { fee, gasLimit, storageLimit } = _a, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
        return __awaiter(this, void 0, void 0, function* () {
            let calculatedFee = fee;
            let calculatedGas = gasLimit;
            let calculatedStorage = storageLimit;
            if (fee === undefined || gasLimit === undefined || storageLimit === undefined) {
                const estimation = yield estimator(Object.assign({ fee, gasLimit, storageLimit }, rest));
                if (calculatedFee === undefined) {
                    calculatedFee = estimation.suggestedFeeMutez;
                }
                if (calculatedGas === undefined) {
                    calculatedGas = estimation.gasLimit;
                }
                if (calculatedStorage === undefined) {
                    calculatedStorage = estimation.storageLimit;
                }
            }
            return {
                fee: calculatedFee,
                gasLimit: calculatedGas,
                storageLimit: calculatedStorage,
            };
        });
    }
    signAndInject(forgedBytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const signed = yield this.signer.sign(forgedBytes.opbytes, new Uint8Array([3]));
            forgedBytes.opbytes = signed.sbytes;
            forgedBytes.opOb.signature = signed.prefixSig;
            const opResponse = [];
            const results = yield this.rpc.preapplyOperations([forgedBytes.opOb]);
            if (!Array.isArray(results)) {
                throw new TezosPreapplyFailureError(results);
            }
            for (let i = 0; i < results.length; i++) {
                for (let j = 0; j < results[i].contents.length; j++) {
                    opResponse.push(results[i].contents[j]);
                }
            }
            const errors = flattenErrors(results);
            if (errors.length) {
                throw new TezosOperationError(errors);
            }
            return {
                hash: yield this.context.injector.inject(forgedBytes.opbytes),
                forgedBytes,
                opResponse,
                context: this.context.clone(),
            };
        });
    }
}

const BATCH_KINDS = [
    OpKind.ACTIVATION,
    OpKind.ORIGINATION,
    OpKind.TRANSACTION,
    OpKind.DELEGATION,
];
class OperationBatch extends OperationEmitter {
    constructor(context, estimator) {
        super(context);
        this.estimator = estimator;
        this.operations = [];
    }
    /**
     *
     * @description Add a transaction operation to the batch
     *
     * @param params Transfer operation parameter
     */
    withTransfer(params) {
        if (validateAddress(params.to) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid 'to' address: ${params.to}`);
        }
        this.operations.push(Object.assign({ kind: OpKind.TRANSACTION }, params));
        return this;
    }
    /**
     *
     * @description Add a transaction operation to the batch
     *
     * @param params Transfer operation parameter
     */
    withContractCall(params) {
        return this.withTransfer(params.toTransferParams());
    }
    /**
     *
     * @description Add a delegation operation to the batch
     *
     * @param params Delegation operation parameter
     */
    withDelegation(params) {
        if (params.source && validateAddress(params.source) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid source address: ${params.source}`);
        }
        if (params.delegate && validateAddress(params.delegate) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid delegate address: ${params.delegate}`);
        }
        this.operations.push(Object.assign({ kind: OpKind.DELEGATION }, params));
        return this;
    }
    /**
     *
     * @description Add an activation operation to the batch
     *
     * @param params Activation operation parameter
     */
    withActivation({ pkh, secret }) {
        if (validateKeyHash(pkh) !== ValidationResult.VALID) {
            throw new InvalidKeyHashError(`Invalid Key Hash: ${pkh}`);
        }
        this.operations.push({ kind: OpKind.ACTIVATION, pkh, secret });
        return this;
    }
    /**
     *
     * @description Add an origination operation to the batch
     *
     * @param params Origination operation parameter
     */
    withOrigination(params) {
        this.operations.push(Object.assign({ kind: OpKind.ORIGINATION }, params));
        return this;
    }
    /**
     *
     * @description Add an operation to register a global constant to the batch
     *
     * @param params RegisterGlobalConstant operation parameter
     */
    withRegisterGlobalConstant(params) {
        this.operations.push(Object.assign({ kind: OpKind.REGISTER_GLOBAL_CONSTANT }, params));
        return this;
    }
    getRPCOp(param) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (param.kind) {
                case OpKind.TRANSACTION:
                    return createTransferOperation(Object.assign({}, param));
                case OpKind.ORIGINATION:
                    return createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign({}, param)));
                case OpKind.DELEGATION:
                    return createSetDelegateOperation(Object.assign({}, param));
                case OpKind.ACTIVATION:
                    return Object.assign({}, param);
                case OpKind.REGISTER_GLOBAL_CONSTANT:
                    return createRegisterGlobalConstantOperation(Object.assign({}, param));
                default:
                    throw new Error(`Unsupported operation kind: ${param.kind}`);
            }
        });
    }
    /**
     *
     * @description Add a group operation to the batch. Operation will be applied in the order they are in the params array
     *
     * @param params Operations parameter
     */
    with(params) {
        for (const param of params) {
            switch (param.kind) {
                case OpKind.TRANSACTION:
                    this.withTransfer(param);
                    break;
                case OpKind.ORIGINATION:
                    this.withOrigination(param);
                    break;
                case OpKind.DELEGATION:
                    this.withDelegation(param);
                    break;
                case OpKind.ACTIVATION:
                    this.withActivation(param);
                    break;
                case OpKind.REGISTER_GLOBAL_CONSTANT:
                    this.withRegisterGlobalConstant(param);
                    break;
                default:
                    throw new Error(`Unsupported operation kind: ${param.kind}`);
            }
        }
        return this;
    }
    /**
     *
     * @description Forge and Inject the operation batch
     *
     * @param params Optionally specify the source of the operation
     */
    send(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicKeyHash = yield this.signer.publicKeyHash();
            const publicKey = yield this.signer.publicKey();
            const estimates = yield this.estimator.batch(this.operations);
            const revealNeeded = yield this.isRevealOpNeeded(this.operations, publicKeyHash);
            let i = revealNeeded ? 1 : 0;
            const ops = [];
            for (const op of this.operations) {
                if (isOpWithFee(op)) {
                    const estimated = yield this.estimate(op, () => __awaiter(this, void 0, void 0, function* () { return estimates[i]; }));
                    ops.push(yield this.getRPCOp(Object.assign(Object.assign({}, op), estimated)));
                }
                else {
                    ops.push(Object.assign({}, op));
                }
                i++;
            }
            if (revealNeeded) {
                const reveal = { kind: OpKind.REVEAL };
                const estimatedReveal = yield this.estimate(reveal, () => __awaiter(this, void 0, void 0, function* () { return estimates[0]; }));
                ops.unshift(yield createRevealOperation(Object.assign({}, estimatedReveal), publicKeyHash, publicKey));
            }
            const source = (params && params.source) || publicKeyHash;
            const prepared = yield this.prepareOperation({
                operation: ops,
                source,
            });
            const opBytes = yield this.forge(prepared);
            const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
            return new BatchOperation(hash, ops, source, forgedBytes, opResponse, context);
        });
    }
}
class RPCBatchProvider {
    constructor(context, estimator) {
        this.context = context;
        this.estimator = estimator;
    }
    /***
     *
     * @description Batch a group of operation together. Operations will be applied in the order in which they are added to the batch
     *
     * @param params List of operation to batch together
     */
    batch(params) {
        const batch = new OperationBatch(this.context, this.estimator);
        if (Array.isArray(params)) {
            batch.with(params);
        }
        return batch;
    }
}

const receiptFromOperation = (op, { ALLOCATION_BURN, ORIGINATION_BURN } = {
    ALLOCATION_BURN: 257,
    ORIGINATION_BURN: 257,
}) => {
    const operationResults = flattenOperationResult({ contents: op });
    let totalGas = new BigNumber(0);
    let totalStorage = new BigNumber(0);
    let totalFee = new BigNumber(0);
    let totalOriginationBurn = new BigNumber(0);
    let totalAllocationBurn = new BigNumber(0);
    let totalPaidStorageDiff = new BigNumber(0);
    operationResults.forEach(result => {
        totalFee = totalFee.plus(result.fee || 0);
        totalOriginationBurn = totalOriginationBurn.plus(Array.isArray(result.originated_contracts)
            ? result.originated_contracts.length * ORIGINATION_BURN
            : 0);
        totalAllocationBurn = totalAllocationBurn.plus('allocated_destination_contract' in result ? ALLOCATION_BURN : 0);
        totalGas = totalGas.plus(result.consumed_gas || 0);
        totalPaidStorageDiff = totalPaidStorageDiff.plus('paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0);
    });
    totalStorage = totalStorage
        .plus(totalAllocationBurn)
        .plus(totalOriginationBurn)
        .plus(totalPaidStorageDiff);
    return {
        totalFee,
        totalGas,
        totalStorage,
        totalAllocationBurn,
        totalOriginationBurn,
        totalPaidStorageDiff,
        totalStorageBurn: new BigNumber(totalStorage.multipliedBy(1000)),
    };
};

class MissedBlockDuringConfirmationError extends Error {
    constructor() {
        super('Taquito missed a block while waiting for operation confirmation and was not able to find the operation');
        this.name = 'MissedBlockDuringConfirmationError';
    }
}
const MAX_BRANCH_ANCESTORS = 60;
/**
 * @description WalletOperation allows to monitor operation inclusion on chains and surface information related to the operation
 */
class WalletOperation {
    /**
     *
     * @param opHash Operation hash
     * @param raw Raw operation that was injected
     * @param context Taquito context allowing access to rpc and signer
     */
    constructor(opHash, context, _newHead$) {
        this.opHash = opHash;
        this.context = context;
        this._newHead$ = _newHead$;
        this._operationResult = new ReplaySubject(1);
        this._includedInBlock = new ReplaySubject(1);
        this._included = false;
        this.newHead$ = this._newHead$.pipe(tap((newHead) => {
            if (!this._included &&
                this.lastHead &&
                newHead.header.level - this.lastHead.header.level > 1) {
                throw new MissedBlockDuringConfirmationError();
            }
            this.lastHead = newHead;
        }), shareReplay({ bufferSize: 1, refCount: true }));
        // Observable that emit once operation is seen in a block
        this.confirmed$ = this.newHead$.pipe(map((head) => {
            for (const opGroup of head.operations) {
                for (const op of opGroup) {
                    if (op.hash === this.opHash) {
                        this._included = true;
                        this._includedInBlock.next(head);
                        this._operationResult.next(op.contents);
                        // Return the block where the operation was found
                        return head;
                    }
                }
            }
        }), filter((x) => {
            return typeof x !== 'undefined';
        }), first(), shareReplay({ bufferSize: 1, refCount: true }));
        if (validateOperation(this.opHash) !== ValidationResult.VALID) {
            throw new InvalidOperationHashError(`Invalid operation hash: ${this.opHash}`);
        }
        this.confirmed$
            .pipe(first(), catchError(() => of(undefined)))
            .subscribe();
    }
    operationResults() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._operationResult.pipe(first()).toPromise();
        });
    }
    /**
     * @description Receipt expose the total amount of tezos token burn and spent on fees
     * The promise returned by receipt will resolve only once the transaction is included
     */
    receipt() {
        return __awaiter(this, void 0, void 0, function* () {
            return receiptFromOperation(yield this.operationResults());
        });
    }
    getCurrentConfirmation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._included) {
                return 0;
            }
            return combineLatest([this._includedInBlock, from(this.context.rpc.getBlock())])
                .pipe(map(([foundAtBlock, head]) => {
                return head.header.level - foundAtBlock.header.level + 1;
            }), first())
                .toPromise();
        });
    }
    isInCurrentBranch(tipBlockIdentifier = 'head') {
        return __awaiter(this, void 0, void 0, function* () {
            // By default it is assumed that the operation is in the current branch
            if (!this._included) {
                return true;
            }
            const tipBlockHeader = yield this.context.rpc.getBlockHeader({ block: tipBlockIdentifier });
            const inclusionBlock = yield this._includedInBlock.pipe(first()).toPromise();
            const levelDiff = tipBlockHeader.level - inclusionBlock.header.level;
            // Block produced before the operation is included are assumed to be part of the current branch
            if (levelDiff <= 0) {
                return true;
            }
            const tipBlockLevel = Math.min(inclusionBlock.header.level + levelDiff, inclusionBlock.header.level + MAX_BRANCH_ANCESTORS);
            const blocks = new Set(yield this.context.rpc.getLiveBlocks({ block: String(tipBlockLevel) }));
            return blocks.has(inclusionBlock.hash);
        });
    }
    confirmationObservable(confirmations) {
        if (typeof confirmations !== 'undefined' && confirmations < 1) {
            throw new Error('Confirmation count must be at least 1');
        }
        const { defaultConfirmationCount } = this.context.config;
        const conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
        if (conf === undefined) {
            throw new Error('Default confirmation count can not be undefined!');
        }
        return combineLatest([this._includedInBlock, this.newHead$]).pipe(distinctUntilChanged(([, previousHead], [, newHead]) => {
            return previousHead.hash === newHead.hash;
        }), map(([foundAtBlock, head]) => {
            return {
                block: head,
                expectedConfirmation: conf,
                currentConfirmation: head.header.level - foundAtBlock.header.level + 1,
                completed: head.header.level - foundAtBlock.header.level >= conf - 1,
                isInCurrentBranch: () => this.isInCurrentBranch(head.hash),
            };
        }), takeWhile(({ completed }) => !completed, true));
    }
    /**
     *
     * @param confirmations [0] Number of confirmation to wait for
     */
    confirmation(confirmations) {
        return this.confirmationObservable(confirmations).toPromise();
    }
}

class BatchWalletOperation extends WalletOperation {
    constructor(opHash, context, newHead$) {
        super(opHash, context, newHead$);
        this.opHash = opHash;
        this.context = context;
    }
    revealOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return operationResult.find(x => x.kind === OpKind.REVEAL);
        });
    }
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._included) {
                return 'pending';
            }
            const op = yield this.operationResults();
            return (op
                .filter((result) => BATCH_KINDS.indexOf(result.kind) !== -1)
                .map((result) => {
                if (hasMetadataWithResult(result)) {
                    return result.metadata.operation_result.status;
                }
                else {
                    return 'unknown';
                }
            })[0] || 'unknown');
        });
    }
}

class DelegationWalletOperation extends WalletOperation {
    constructor(opHash, context, newHead$) {
        super(opHash, context, newHead$);
        this.opHash = opHash;
        this.context = context;
    }
    revealOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return operationResult.find(x => x.kind === OpKind.REVEAL);
        });
    }
    delegationOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return operationResult.find(x => x.kind === OpKind.DELEGATION);
        });
    }
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._included) {
                return 'pending';
            }
            const op = yield this.delegationOperation();
            if (!op) {
                return 'unknown';
            }
            return op.metadata.operation_result.status;
        });
    }
}

class OriginationWalletOperation extends WalletOperation {
    constructor(opHash, context, newHead$) {
        super(opHash, context, newHead$);
        this.opHash = opHash;
        this.context = context;
    }
    originationOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return findWithKind(operationResult, OpKind.ORIGINATION);
        });
    }
    revealOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return findWithKind(operationResult, OpKind.REVEAL);
        });
    }
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._included) {
                return 'pending';
            }
            const op = yield this.originationOperation();
            if (!op) {
                return 'unknown';
            }
            return op.metadata.operation_result.status;
        });
    }
    contract() {
        return __awaiter(this, void 0, void 0, function* () {
            const op = yield this.originationOperation();
            const address = ((op === null || op === void 0 ? void 0 : op.metadata.operation_result.originated_contracts) || [])[0];
            return this.context.wallet.at(address);
        });
    }
}

class TransactionWalletOperation extends WalletOperation {
    constructor(opHash, context, newHead$) {
        super(opHash, context, newHead$);
        this.opHash = opHash;
        this.context = context;
    }
    revealOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return operationResult.find(x => x.kind === OpKind.REVEAL);
        });
    }
    transactionOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            const operationResult = yield this.operationResults();
            return operationResult.find(x => x.kind === OpKind.TRANSACTION);
        });
    }
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._included) {
                return 'pending';
            }
            const op = yield this.transactionOperation();
            if (!op) {
                return 'unknown';
            }
            return op.metadata.operation_result.status;
        });
    }
}

const cacheUntil = (cacheUntilObs) => (source) => {
    let subject = null;
    return defer(() => {
        if (!subject) {
            subject = new ReplaySubject();
            source.pipe(first()).subscribe(subject);
            cacheUntilObs.pipe(first()).subscribe(() => {
                subject = null;
            });
        }
        return subject;
    });
};
const createNewPollingBasedHeadObservable = (pollingTimer, sharedHeadOb, context, scheduler) => {
    return pollingTimer.pipe(switchMap(() => sharedHeadOb), distinctUntilKeyChanged('hash'), timeoutWith(context.config.confirmationPollingTimeoutSecond * 1000, throwError(new Error('Confirmation polling timed out')), scheduler), shareReplay({
        refCount: true,
        scheduler,
    }));
};
class OperationFactory {
    constructor(context) {
        this.context = context;
        // Cache the last block for one second across all operations
        this.sharedHeadObs = defer(() => from(this.context.rpc.getBlock())).pipe(cacheUntil(timer(0, 1000)));
    }
    createNewHeadObservable() {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmationPollingIntervalSecond = this.context.config.confirmationPollingIntervalSecond !== undefined
                ? this.context.config.confirmationPollingIntervalSecond
                : yield this.context.getConfirmationPollingInterval();
            return createNewPollingBasedHeadObservable(timer(0, confirmationPollingIntervalSecond * 1000), this.sharedHeadObs, this.context);
        });
    }
    createPastBlockWalker(startBlock, count = 1) {
        return from(this.context.rpc.getBlock({ block: startBlock })).pipe(switchMap((block) => {
            if (count === 1) {
                return of(block);
            }
            return range(block.header.level, count - 1).pipe(startWith(block), concatMap((level) => __awaiter(this, void 0, void 0, function* () {
                return this.context.rpc.getBlock({ block: String(level) });
            })));
        }));
    }
    createHeadObservableFromConfig({ blockIdentifier }) {
        return __awaiter(this, void 0, void 0, function* () {
            const observableSequence = [];
            if (blockIdentifier) {
                observableSequence.push(this.createPastBlockWalker(blockIdentifier));
            }
            observableSequence.push(yield this.createNewHeadObservable());
            return concat(...observableSequence);
        });
    }
    createOperation(hash, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new WalletOperation(hash, this.context.clone(), yield this.createHeadObservableFromConfig(config));
        });
    }
    createBatchOperation(hash, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new BatchWalletOperation(hash, this.context.clone(), yield this.createHeadObservableFromConfig(config));
        });
    }
    createTransactionOperation(hash, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new TransactionWalletOperation(hash, this.context.clone(), yield this.createHeadObservableFromConfig(config));
        });
    }
    createDelegationOperation(hash, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new DelegationWalletOperation(hash, this.context.clone(), yield this.createHeadObservableFromConfig(config));
        });
    }
    createOriginationOperation(hash, config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new OriginationWalletOperation(hash, this.context.clone(), yield this.createHeadObservableFromConfig(config));
        });
    }
}

class RpcTzProvider extends OperationEmitter {
    constructor(context) {
        super(context);
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateAddress(address) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid address: ${address}`);
            }
            return this.rpc.getBalance(address);
        });
    }
    getDelegate(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateAddress(address) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid address: ${address}`);
            }
            return this.rpc.getDelegate(address);
        });
    }
    activate(pkh, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateKeyHash(pkh) !== ValidationResult.VALID) {
                throw new InvalidKeyHashError(`Invalid Public Key Hash: ${pkh}`);
            }
            const operation = {
                kind: OpKind.ACTIVATION,
                pkh,
                secret,
            };
            const prepared = yield this.prepareOperation({ operation: [operation], source: pkh });
            const forgedBytes = yield this.forge(prepared);
            const bytes = `${forgedBytes.opbytes}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`;
            return new Operation(yield this.rpc.injectOperation(bytes), Object.assign(Object.assign({}, forgedBytes), { opbytes: bytes }), [], this.context.clone());
        });
    }
}

const MINIMAL_FEE_MUTEZ = 100;
const MINIMAL_FEE_PER_BYTE_MUTEZ = 1;
const MINIMAL_FEE_PER_GAS_MUTEZ = 0.1;
const GAS_BUFFER = 100;
/**
 * Examples of use :
 *
 *  Estimate a transfer operation :
 * ```
 * // Assuming that provider and signer are already configured...
 *
 * const amount = 2;
 * const address = 'tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY';
 *
 * // Estimate gasLimit, storageLimit and fees for a transfer operation
 * const est = await Tezos.estimate.transfer({ to: address, amount: amount })
 * console.log(est.burnFeeMutez, est.gasLimit, est.minimalFeeMutez, est.storageLimit,
 *  est.suggestedFeeMutez, est.totalCost, est.usingBaseFeeMutez)
 *
 * ```
 *
 * Estimate a contract origination :
 * ```
 * // generic.json is referring to a Michelson Smart Contract
 *
 * const genericMultisigJSON = require('./generic.json')
 * const est = await Tezos.estimate.originate({
 *   code: genericMultisigJSON,
 *   storage: {
 *     stored_counter: 0,
 *     threshold: 1,
 *     keys: ['edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t']
 *   }
 * })
 * console.log(est.burnFeeMutez, est.gasLimit, est.minimalFeeMutez, est.storageLimit,
 *   est.suggestedFeeMutez, est.totalCost, est.usingBaseFeeMutez)
 *
 * ```
 */
class Estimate {
    constructor(_milligasLimit, _storageLimit, opSize, minimalFeePerStorageByteMutez, 
    /**
     * @description Base fee in mutez (1 mutez = 1e10−6 tez)
     */
    baseFeeMutez = MINIMAL_FEE_MUTEZ) {
        this._milligasLimit = _milligasLimit;
        this._storageLimit = _storageLimit;
        this.opSize = opSize;
        this.minimalFeePerStorageByteMutez = minimalFeePerStorageByteMutez;
        this.baseFeeMutez = baseFeeMutez;
    }
    /**
     * @description The number of Mutez that will be burned for the storage of the [operation](https://tezos.gitlab.io/user/glossary.html#operations). (Storage + Allocation fees)
     */
    get burnFeeMutez() {
        return this.roundUp(Number(this.storageLimit) * Number(this.minimalFeePerStorageByteMutez));
    }
    /**
     * @description  The limit on the amount of storage an [operation](https://tezos.gitlab.io/user/glossary.html#operations) can use.
     */
    get storageLimit() {
        const limit = Math.max(Number(this._storageLimit), 0);
        return limit > 0 ? limit : 0;
    }
    /**
     * @description The limit on the amount of [gas](https://tezos.gitlab.io/user/glossary.html#gas) a given operation can consume.
     */
    get gasLimit() {
        return this.roundUp(Number(this._milligasLimit) / 1000 + GAS_BUFFER);
    }
    get operationFeeMutez() {
        return ((Number(this._milligasLimit) / 1000 + GAS_BUFFER) * MINIMAL_FEE_PER_GAS_MUTEZ + Number(this.opSize) * MINIMAL_FEE_PER_BYTE_MUTEZ);
    }
    roundUp(nanotez) {
        return Math.ceil(Number(nanotez));
    }
    /**
     * @description Minimum fees for the [operation](https://tezos.gitlab.io/user/glossary.html#operations) according to [baker](https://tezos.gitlab.io/user/glossary.html#baker) defaults.
     */
    get minimalFeeMutez() {
        return this.roundUp(MINIMAL_FEE_MUTEZ + this.operationFeeMutez);
    }
    /**
     * @description The suggested fee for the operation which includes minimal fees and a small buffer.
     */
    get suggestedFeeMutez() {
        return this.roundUp(this.operationFeeMutez + MINIMAL_FEE_MUTEZ * 2);
    }
    /**
     * @description Fees according to your specified base fee will ensure that at least minimum fees are used.
     */
    get usingBaseFeeMutez() {
        return (Math.max(Number(this.baseFeeMutez), MINIMAL_FEE_MUTEZ) + this.roundUp(this.operationFeeMutez));
    }
    /**
     * @description The sum of `minimalFeeMutez` + `burnFeeMutez`.
     */
    get totalCost() {
        return this.minimalFeeMutez + this.burnFeeMutez;
    }
    /**
     * @description Since Delphinet, consumed gas is provided in milligas for more precision.
     * This function returns an estimation of the gas that operation will consume in milligas.
     */
    get consumedMilligas() {
        return Number(this._milligasLimit);
    }
    static createEstimateInstanceFromProperties(estimateProperties) {
        let milligasLimit = 0;
        let storageLimit = 0;
        let opSize = 0;
        let minimalFeePerStorageByteMutez = 0;
        let baseFeeMutez;
        estimateProperties.forEach(estimate => {
            milligasLimit += estimate.milligasLimit;
            storageLimit += estimate.storageLimit;
            opSize += estimate.opSize;
            minimalFeePerStorageByteMutez = Math.max(estimate.minimalFeePerStorageByteMutez, minimalFeePerStorageByteMutez);
            if (estimate.baseFeeMutez) {
                baseFeeMutez = baseFeeMutez ? baseFeeMutez + estimate.baseFeeMutez : estimate.baseFeeMutez;
            }
        });
        return new Estimate(milligasLimit, storageLimit, opSize, minimalFeePerStorageByteMutez, baseFeeMutez);
    }
    static createArrayEstimateInstancesFromProperties(estimateProperties) {
        return estimateProperties.map(x => new Estimate(x.milligasLimit, x.storageLimit, x.opSize, x.minimalFeePerStorageByteMutez, x.baseFeeMutez));
    }
}

const mergeLimits = (userDefinedLimit, defaultLimits) => {
    return {
        fee: typeof userDefinedLimit.fee === 'undefined' ? defaultLimits.fee : userDefinedLimit.fee,
        gasLimit: typeof userDefinedLimit.gasLimit === 'undefined'
            ? defaultLimits.gasLimit
            : userDefinedLimit.gasLimit,
        storageLimit: typeof userDefinedLimit.storageLimit === 'undefined'
            ? defaultLimits.storageLimit
            : userDefinedLimit.storageLimit,
    };
};
// RPC requires a signature but does not verify it
const SIGNATURE_STUB = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';
class RPCEstimateProvider extends OperationEmitter {
    constructor() {
        super(...arguments);
        this.ALLOCATION_STORAGE = 257;
        this.ORIGINATION_STORAGE = 257;
        this.OP_SIZE_REVEAL = 128;
    }
    // Maximum values defined by the protocol
    getAccountLimits(pkh, constants, numberOfOps) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.rpc.getBalance(pkh);
            const { hard_gas_limit_per_operation, hard_gas_limit_per_block, hard_storage_limit_per_operation, cost_per_byte, } = constants;
            return {
                fee: 0,
                gasLimit: numberOfOps
                    ? Math.floor(this.ajustGasForBatchOperation(hard_gas_limit_per_block, hard_gas_limit_per_operation, numberOfOps).toNumber())
                    : hard_gas_limit_per_operation.toNumber(),
                storageLimit: Math.floor(BigNumber.min(balance.dividedBy(cost_per_byte), hard_storage_limit_per_operation).toNumber()),
            };
        });
    }
    // Fix for Granada where the total gasLimit of a batch can not exceed the hard_gas_limit_per_block.
    // If the total gasLimit of the batch is higher than the hard_gas_limit_per_block,
    // the gasLimit is calculated by dividing the hard_gas_limit_per_block by the number of operation in the batch (numberOfOps).
    // numberOfOps is incremented by 1 for safety in case a reveal operation is needed
    ajustGasForBatchOperation(gasLimitBlock, gaslimitOp, numberOfOps) {
        return BigNumber.min(gaslimitOp, gasLimitBlock.div(numberOfOps + 1));
    }
    getEstimationPropertiesFromOperationContent(content, size, costPerByte) {
        const operationResults = flattenOperationResult({ contents: [content] });
        let totalGas = 0;
        let totalMilligas = 0;
        let totalStorage = 0;
        operationResults.forEach((result) => {
            totalStorage +=
                'originated_contracts' in result && typeof result.originated_contracts !== 'undefined'
                    ? result.originated_contracts.length * this.ORIGINATION_STORAGE
                    : 0;
            totalStorage += 'allocated_destination_contract' in result ? this.ALLOCATION_STORAGE : 0;
            totalGas += Number(result.consumed_gas) || 0;
            totalMilligas += Number(result.consumed_milligas) || 0;
            totalStorage +=
                'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
            totalStorage +=
                'storage_size' in result && 'global_address' in result
                    ? Number(result.storage_size) || 0
                    : 0;
        });
        if (totalGas !== 0 && totalMilligas === 0) {
            // This will convert gas to milligas for Carthagenet where result does not contain consumed gas in milligas.
            totalMilligas = totalGas * 1000;
        }
        if (isOpWithFee(content)) {
            return {
                milligasLimit: totalMilligas || 0,
                storageLimit: Number(totalStorage || 0),
                opSize: size,
                minimalFeePerStorageByteMutez: costPerByte.toNumber(),
            };
        }
        else {
            return {
                milligasLimit: 0,
                storageLimit: 0,
                opSize: size,
                minimalFeePerStorageByteMutez: costPerByte.toNumber(),
                baseFeeMutez: 0,
            };
        }
    }
    prepareEstimate(params, constants) {
        return __awaiter(this, void 0, void 0, function* () {
            const prepared = yield this.prepareOperation(params);
            const { opbytes, opOb: { branch, contents }, } = yield this.forge(prepared);
            const operation = {
                operation: { branch, contents, signature: SIGNATURE_STUB },
                chain_id: yield this.rpc.getChainId(),
            };
            const { opResponse } = yield this.simulate(operation);
            const { cost_per_byte } = constants;
            const errors = [...flattenErrors(opResponse, 'backtracked'), ...flattenErrors(opResponse)];
            // Fail early in case of errors
            if (errors.length) {
                throw new TezosOperationError(errors);
            }
            let numberOfOps = 1;
            if (Array.isArray(params.operation) && params.operation.length > 1) {
                numberOfOps =
                    opResponse.contents[0].kind === 'reveal'
                        ? params.operation.length - 1
                        : params.operation.length;
            }
            return opResponse.contents.map((x) => {
                return this.getEstimationPropertiesFromOperationContent(x, 
                // TODO: Calculate a specific opSize for each operation.
                x.kind === 'reveal' ? this.OP_SIZE_REVEAL / 2 : opbytes.length / 2 / numberOfOps, cost_per_byte);
            });
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an origination operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param OriginationOperation Originate operation parameter
     */
    originate(_a) {
        var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
        return __awaiter(this, void 0, void 0, function* () {
            const pkh = yield this.signer.publicKeyHash();
            const protocolConstants = yield this.rpc.getConstants();
            const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
            const op = yield createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS))));
            const isRevealNeeded = yield this.isRevealOpNeeded([op], pkh);
            const ops = isRevealNeeded ? yield this.addRevealOp([op], pkh) : op;
            const estimateProperties = yield this.prepareEstimate({ operation: ops, source: pkh }, protocolConstants);
            if (isRevealNeeded) {
                estimateProperties.shift();
            }
            return Estimate.createEstimateInstanceFromProperties(estimateProperties);
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an transfer operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param TransferOperation Originate operation parameter
     */
    transfer(_a) {
        var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
        return __awaiter(this, void 0, void 0, function* () {
            if (validateAddress(rest.to) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid 'to' address: ${rest.to}`);
            }
            if (rest.source && validateAddress(rest.source) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid 'source' address: ${rest.source}`);
            }
            const pkh = yield this.signer.publicKeyHash();
            const protocolConstants = yield this.rpc.getConstants();
            const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
            const op = yield createTransferOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
            const isRevealNeeded = yield this.isRevealOpNeeded([op], pkh);
            const ops = isRevealNeeded ? yield this.addRevealOp([op], pkh) : op;
            const estimateProperties = yield this.prepareEstimate({ operation: ops, source: pkh }, protocolConstants);
            if (isRevealNeeded) {
                estimateProperties.shift();
            }
            return Estimate.createEstimateInstanceFromProperties(estimateProperties);
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a delegate operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    setDelegate(_a) {
        var { fee, gasLimit, storageLimit } = _a, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
        return __awaiter(this, void 0, void 0, function* () {
            if (rest.source && validateAddress(rest.source) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid source address: ${rest.source}`);
            }
            if (rest.delegate && validateAddress(rest.delegate) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid delegate address: ${rest.delegate}`);
            }
            const pkh = yield this.signer.publicKeyHash();
            const sourceOrDefault = rest.source || pkh;
            const protocolConstants = yield this.rpc.getConstants();
            const DEFAULT_PARAMS = yield this.getAccountLimits(sourceOrDefault, protocolConstants);
            const op = yield createSetDelegateOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
            const isRevealNeeded = yield this.isRevealOpNeeded([op], pkh);
            const ops = isRevealNeeded ? yield this.addRevealOp([op], pkh) : op;
            const estimateProperties = yield this.prepareEstimate({ operation: ops, source: pkh }, protocolConstants);
            if (isRevealNeeded) {
                estimateProperties.shift();
            }
            return Estimate.createEstimateInstanceFromProperties(estimateProperties);
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a each operation in the batch
     *
     * @returns An array of Estimate objects. If a reveal operation is needed, the first element of the array is the Estimate for the reveal operation.
     */
    batch(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pkh = yield this.signer.publicKeyHash();
            let operations = [];
            const protocolConstants = yield this.rpc.getConstants();
            const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants, params.length);
            for (const param of params) {
                switch (param.kind) {
                    case OpKind.TRANSACTION:
                        operations.push(yield createTransferOperation(Object.assign(Object.assign({}, param), mergeLimits(param, DEFAULT_PARAMS))));
                        break;
                    case OpKind.ORIGINATION:
                        operations.push(yield createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign(Object.assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))));
                        break;
                    case OpKind.DELEGATION:
                        operations.push(yield createSetDelegateOperation(Object.assign(Object.assign({}, param), mergeLimits(param, DEFAULT_PARAMS))));
                        break;
                    case OpKind.ACTIVATION:
                        operations.push(Object.assign(Object.assign({}, param), DEFAULT_PARAMS));
                        break;
                    case OpKind.REGISTER_GLOBAL_CONSTANT:
                        operations.push(yield createRegisterGlobalConstantOperation(Object.assign(Object.assign({}, param), mergeLimits(param, DEFAULT_PARAMS))));
                        break;
                    default:
                        throw new Error(`Unsupported operation kind: ${param.kind}`);
                }
            }
            const isRevealNeeded = yield this.isRevealOpNeeded(operations, pkh);
            operations = isRevealNeeded ? yield this.addRevealOp(operations, pkh) : operations;
            const estimateProperties = yield this.prepareEstimate({ operation: operations, source: pkh }, protocolConstants);
            return Estimate.createArrayEstimateInstancesFromProperties(estimateProperties);
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a delegate operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    registerDelegate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pkh = yield this.signer.publicKeyHash();
            const protocolConstants = yield this.rpc.getConstants();
            const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
            const op = yield createRegisterDelegateOperation(Object.assign(Object.assign({}, params), DEFAULT_PARAMS), pkh);
            const isRevealNeeded = yield this.isRevealOpNeeded([op], pkh);
            const ops = isRevealNeeded ? yield this.addRevealOp([op], pkh) : op;
            const estimateProperties = yield this.prepareEstimate({ operation: ops, source: pkh }, protocolConstants);
            if (isRevealNeeded) {
                estimateProperties.shift();
            }
            return Estimate.createEstimateInstanceFromProperties(estimateProperties);
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees to reveal the current account
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation or undefined if the account is already revealed
     *
     * @param Estimate
     */
    reveal(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const pkh = yield this.signer.publicKeyHash();
            if (yield this.isAccountRevealRequired(pkh)) {
                const protocolConstants = yield this.rpc.getConstants();
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createRevealOperation(Object.assign(Object.assign({}, params), DEFAULT_PARAMS), pkh, yield this.signer.publicKey());
                const estimateProperties = yield this.prepareEstimate({ operation: op, source: pkh }, protocolConstants);
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            }
        });
    }
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an registerGlobalConstant operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param params registerGlobalConstant operation parameter
     */
    registerGlobalConstant(_a) {
        var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
        return __awaiter(this, void 0, void 0, function* () {
            const pkh = yield this.signer.publicKeyHash();
            const protocolConstants = yield this.rpc.getConstants();
            const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
            const op = yield createRegisterGlobalConstantOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
            const isRevealNeeded = yield this.isRevealOpNeeded([op], pkh);
            const ops = isRevealNeeded ? yield this.addRevealOp([op], pkh) : op;
            const estimateProperties = yield this.prepareEstimate({ operation: ops, source: pkh }, protocolConstants);
            if (isRevealNeeded) {
                estimateProperties.shift();
            }
            return Estimate.createEstimateInstanceFromProperties(estimateProperties);
        });
    }
    addRevealOp(op, pkh) {
        return __awaiter(this, void 0, void 0, function* () {
            op.unshift(yield createRevealOperation(Object.assign({
                fee: DEFAULT_FEE.REVEAL,
                gasLimit: DEFAULT_GAS_LIMIT.REVEAL,
                storageLimit: DEFAULT_STORAGE_LIMIT.REVEAL,
            }), pkh, yield this.signer.publicKey()));
            return op;
        });
    }
}

/**
 * @description Delegation operation provide utility function to fetch newly issued delegation
 *
 * @warn Currently support only one delegation per operation
 */
class DelegateOperation extends Operation {
    constructor(hash, params, source, raw, results, context) {
        super(hash, raw, results, context);
        this.params = params;
        this.source = source;
    }
    get operationResults() {
        const delegationOp = Array.isArray(this.results) &&
            this.results.find(op => op.kind === 'delegation');
        const result = delegationOp && delegationOp.metadata && delegationOp.metadata.operation_result;
        return result ? result : undefined;
    }
    get status() {
        const operationResults = this.operationResults;
        if (operationResults) {
            return operationResults.status;
        }
        else {
            return 'unknown';
        }
    }
    get delegate() {
        return this.delegate;
    }
    get isRegisterOperation() {
        return this.delegate === this.source;
    }
    get fee() {
        return this.params.fee;
    }
    get gasLimit() {
        return this.params.gas_limit;
    }
    get storageLimit() {
        return this.params.storage_limit;
    }
    get consumedGas() {
        const consumedGas = this.operationResults && this.operationResults.consumed_gas;
        return consumedGas ? consumedGas : undefined;
    }
    get errors() {
        return this.operationResults && this.operationResults.errors;
    }
}

/**
 * @description Origination operation provide utility function to fetch newly originated contract
 *
 * @warn Currently support only one origination per operation
 */
class OriginationOperation extends Operation {
    constructor(hash, params, raw, results, context, contractProvider) {
        super(hash, raw, results, context);
        this.params = params;
        this.contractProvider = contractProvider;
        const originatedContracts = this.operationResults && this.operationResults.originated_contracts;
        if (Array.isArray(originatedContracts)) {
            this.contractAddress = originatedContracts[0];
        }
    }
    get status() {
        const operationResults = this.operationResults;
        if (operationResults) {
            return operationResults.status;
        }
        else {
            return 'unknown';
        }
    }
    get operationResults() {
        const originationOp = Array.isArray(this.results) &&
            this.results.find((op) => op.kind === 'origination');
        const result = originationOp &&
            hasMetadataWithResult(originationOp) &&
            originationOp.metadata.operation_result;
        return result ? result : undefined;
    }
    get fee() {
        return this.params.fee;
    }
    get gasLimit() {
        return this.params.gas_limit;
    }
    get storageLimit() {
        return this.params.storage_limit;
    }
    get consumedGas() {
        const consumedGas = this.operationResults && this.operationResults.consumed_gas;
        return consumedGas ? consumedGas : undefined;
    }
    get storageDiff() {
        const storageDiff = this.operationResults && this.operationResults.paid_storage_size_diff;
        return storageDiff ? storageDiff : undefined;
    }
    get storageSize() {
        const storageSize = this.operationResults && this.operationResults.storage_size;
        return storageSize ? storageSize : undefined;
    }
    get errors() {
        return this.operationResults && this.operationResults.errors;
    }
    /**
     * @description Provide the contract abstract of the newly originated contract
     */
    contract(confirmations, interval, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.contractAddress) {
                throw new Error('No contract was originated in this operation');
            }
            yield this.confirmation(confirmations, interval, timeout);
            return this.contractProvider.at(this.contractAddress);
        });
    }
}

/**
 * @description RegisterGlobalConstantOperation provides utility functions to fetch a newly issued operation of kind register_global_constant
 */
class RegisterGlobalConstantOperation extends Operation {
    constructor(hash, params, source, raw, results, context) {
        super(hash, raw, results, context);
        this.params = params;
        this.source = source;
        this.globalConstantHash = this.operationResults && this.operationResults.global_address;
    }
    get operationResults() {
        const registerGlobalConstantOp = Array.isArray(this.results) &&
            this.results.find(op => op.kind === 'register_global_constant');
        const result = registerGlobalConstantOp && registerGlobalConstantOp.metadata && registerGlobalConstantOp.metadata.operation_result;
        return result ? result : undefined;
    }
    get status() {
        const operationResults = this.operationResults;
        if (operationResults) {
            return operationResults.status;
        }
        else {
            return 'unknown';
        }
    }
    get registeredExpression() {
        return this.params.value;
    }
    get fee() {
        return this.params.fee;
    }
    get gasLimit() {
        return this.params.gas_limit;
    }
    get storageLimit() {
        return this.params.storage_limit;
    }
    get errors() {
        return this.operationResults && this.operationResults.errors;
    }
}

/**
 * @description Reveal operation provides utility functions to fetch a newly issued revelation
 */
class RevealOperation extends Operation {
    constructor(hash, params, source, raw, results, context) {
        super(hash, raw, results, context);
        this.params = params;
        this.source = source;
    }
    get operationResults() {
        const revealOp = Array.isArray(this.results) &&
            this.results.find(op => op.kind === 'reveal');
        return revealOp ? [revealOp] : [];
    }
    get status() {
        const operationResults = this.operationResults;
        const txResult = operationResults[0];
        if (txResult) {
            return txResult.metadata.operation_result.status;
        }
        else {
            return 'unknown';
        }
    }
    get fee() {
        return this.params.fee;
    }
    get gasLimit() {
        return this.params.gas_limit;
    }
    get storageLimit() {
        return this.params.storage_limit;
    }
    get publicKey() {
        return this.params.public_key;
    }
    sumProp(arr, prop) {
        return arr.reduce((prev, current) => {
            return prop in current ? Number(current[prop]) + prev : prev;
        }, 0);
    }
    get consumedGas() {
        return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'consumed_gas'));
    }
    get storageDiff() {
        return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'paid_storage_size_diff'));
    }
    get storageSize() {
        return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'storage_size'));
    }
    get errors() {
        return flattenErrors({ contents: this.operationResults });
    }
}

/**
 * @description Transaction operation provides utility functions to fetch a newly issued transaction
 *
 * @warn Currently supports one transaction per operation
 */
class TransactionOperation extends Operation {
    constructor(hash, params, source, raw, results, context) {
        super(hash, raw, results, context);
        this.params = params;
        this.source = source;
    }
    get operationResults() {
        const transactionOp = Array.isArray(this.results) &&
            this.results.find(op => op.kind === 'transaction');
        return transactionOp ? [transactionOp] : [];
    }
    get status() {
        const operationResults = this.operationResults;
        const txResult = operationResults[0];
        if (txResult) {
            return txResult.metadata.operation_result.status;
        }
        else {
            return 'unknown';
        }
    }
    get amount() {
        return new BigNumber(this.params.amount);
    }
    get destination() {
        return this.params.destination;
    }
    get fee() {
        return this.params.fee;
    }
    get gasLimit() {
        return this.params.gas_limit;
    }
    get storageLimit() {
        return this.params.storage_limit;
    }
    sumProp(arr, prop) {
        return arr.reduce((prev, current) => {
            return prop in current ? Number(current[prop]) + prev : prev;
        }, 0);
    }
    get consumedGas() {
        return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'consumed_gas'));
    }
    get storageDiff() {
        return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'paid_storage_size_diff'));
    }
    get storageSize() {
        return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'storage_size'));
    }
    get errors() {
        return flattenErrors({ contents: this.operationResults });
    }
}

const setDelegate = (key) => {
    return [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        {
            prim: 'PUSH',
            args: [{ prim: 'key_hash' }, { string: key }],
        },
        { prim: 'SOME' },
        { prim: 'SET_DELEGATE' },
        { prim: 'CONS' },
    ];
};
const transferImplicit = (key, mutez) => {
    return [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        {
            prim: 'PUSH',
            args: [{ prim: 'key_hash' }, { string: key }],
        },
        { prim: 'IMPLICIT_ACCOUNT' },
        {
            prim: 'PUSH',
            args: [{ prim: 'mutez' }, { int: `${mutez}` }],
        },
        { prim: 'UNIT' },
        { prim: 'TRANSFER_TOKENS' },
        { prim: 'CONS' },
    ];
};
const removeDelegate = () => {
    return [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        { prim: 'NONE', args: [{ prim: 'key_hash' }] },
        { prim: 'SET_DELEGATE' },
        { prim: 'CONS' },
    ];
};
const transferToContract = (key, amount) => {
    return [
        { prim: 'DROP' },
        { prim: 'NIL', args: [{ prim: 'operation' }] },
        {
            prim: 'PUSH',
            args: [{ prim: 'address' }, { string: key }],
        },
        { prim: 'CONTRACT', args: [{ prim: 'unit' }] },
        [
            {
                prim: 'IF_NONE',
                args: [[[{ prim: 'UNIT' }, { prim: 'FAILWITH' }]], []],
            },
        ],
        {
            prim: 'PUSH',
            args: [{ prim: 'mutez' }, { int: `${amount}` }],
        },
        { prim: 'UNIT' },
        { prim: 'TRANSFER_TOKENS' },
        { prim: 'CONS' },
    ];
};
const MANAGER_LAMBDA = {
    setDelegate,
    removeDelegate,
    transferImplicit,
    transferToContract,
};

const code = [
    {
        prim: 'parameter',
        args: [
            {
                prim: 'lambda',
                args: [
                    { prim: 'unit' },
                    {
                        prim: 'pair',
                        args: [{ prim: 'list', args: [{ prim: 'operation' }] }, { prim: 'unit' }],
                    },
                ],
            },
        ],
    },
    { prim: 'storage', args: [{ prim: 'unit' }] },
    { prim: 'code', args: [[{ prim: 'CAR' }, { prim: 'UNIT' }, { prim: 'EXEC' }]] },
];
const storage = 'Unit';
const VIEW_LAMBDA = {
    code,
    storage
};

function compose(functioncomposer1, functioncomposer2) {
    return (contractAbstraction, context) => functioncomposer2(functioncomposer1(contractAbstraction, context), context);
}

/**
 * @description Utility class to send smart contract operation
 * The format for the arguments is the flattened representation
 */
class ContractMethod {
    constructor(provider, address, parameterSchema, name, args, isMultipleEntrypoint = true, isAnonymous = false) {
        this.provider = provider;
        this.address = address;
        this.parameterSchema = parameterSchema;
        this.name = name;
        this.args = args;
        this.isMultipleEntrypoint = isMultipleEntrypoint;
        this.isAnonymous = isAnonymous;
    }
    validateArgs(args, schema, name) {
        const sigs = schema.ExtractSignatures();
        if (!sigs.find((x) => x.length === args.length)) {
            throw new InvalidParameterError(name, sigs, args);
        }
    }
    /**
     * @description Get the schema of the smart contract method
     */
    get schema() {
        return this.isAnonymous
            ? this.parameterSchema.ExtractSchema()[this.name]
            : this.parameterSchema.ExtractSchema();
    }
    /**
     * @description Get the signature of the smart contract method
     */
    getSignature() {
        if (this.isAnonymous) {
            const sig = this.parameterSchema.ExtractSignatures().find((x) => x[0] === this.name);
            if (sig) {
                sig.shift();
                return sig;
            }
        }
        else {
            const sig = this.parameterSchema.ExtractSignatures();
            return sig.length == 1 ? sig[0] : sig;
        }
    }
    /**
     *
     * @description Send the smart contract operation
     *
     * @param Options generic operation parameter
     */
    send(params = {}) {
        if (this.provider instanceof Wallet) {
            return this.provider
                .transfer(this.toTransferParams(params))
                .send();
        }
        else {
            return this.provider.transfer(this.toTransferParams(params));
        }
    }
    /**
     *
     * @description Create transfer params to be used with TezosToolkit.contract.transfer methods
     *
     * @param Options generic transfer operation parameters
     */
    toTransferParams({ fee, gasLimit, storageLimit, source, amount = 0, mutez = false, } = {}) {
        const fullTransferParams = {
            to: this.address,
            amount,
            fee,
            mutez,
            source,
            gasLimit,
            storageLimit,
            parameter: {
                entrypoint: this.isMultipleEntrypoint ? this.name : DEFAULT_SMART_CONTRACT_METHOD_NAME,
                value: this.isAnonymous
                    ? this.parameterSchema.Encode(this.name, ...this.args)
                    : this.parameterSchema.Encode(...this.args),
            },
        };
        return fullTransferParams;
    }
}

class WalletOperationBatch {
    constructor(walletProvider, context) {
        this.walletProvider = walletProvider;
        this.context = context;
        this.operations = [];
    }
    /**
     *
     * @description Add a transaction operation to the batch
     *
     * @param params Transfer operation parameter
     */
    withTransfer(params) {
        if (validateAddress(params.to) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid 'to' address: ${params.to}`);
        }
        this.operations.push(Object.assign({ kind: OpKind.TRANSACTION }, params));
        return this;
    }
    /**
     *
     * @description Add a transaction operation to the batch
     *
     * @param params Transfer operation parameter
     */
    withContractCall(params) {
        return this.withTransfer(params.toTransferParams());
    }
    /**
     *
     * @description Add a delegation operation to the batch
     *
     * @param params Delegation operation parameter
     */
    withDelegation(params) {
        if (params.delegate && validateAddress(params.delegate) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid delegate address: ${params.delegate}`);
        }
        this.operations.push(Object.assign({ kind: OpKind.DELEGATION }, params));
        return this;
    }
    /**
     *
     * @description Add an origination operation to the batch
     *
     * @param params Origination operation parameter
     */
    withOrigination(params) {
        this.operations.push(Object.assign({ kind: OpKind.ORIGINATION }, params));
        return this;
    }
    mapOperation(param) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (param.kind) {
                case OpKind.TRANSACTION:
                    return this.walletProvider.mapTransferParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return param; }));
                case OpKind.ORIGINATION:
                    return this.walletProvider.mapOriginateParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () {
                        return this.context.parser.prepareCodeOrigination(Object.assign({}, param));
                    }));
                case OpKind.DELEGATION:
                    return this.walletProvider.mapDelegateParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return param; }));
                default:
                    throw new Error(`Unsupported operation kind: ${param.kind}`);
            }
        });
    }
    /**
     *
     * @description Add a group operation to the batch. Operation will be applied in the order they are in the params array
     *
     * @param params Operations parameter
     */
    with(params) {
        for (const param of params) {
            switch (param.kind) {
                case OpKind.TRANSACTION:
                    this.withTransfer(param);
                    break;
                case OpKind.ORIGINATION:
                    this.withOrigination(param);
                    break;
                case OpKind.DELEGATION:
                    this.withDelegation(param);
                    break;
                default:
                    throw new Error(`Unsupported operation kind: ${param.kind}`);
            }
        }
        return this;
    }
    /**
     *
     * @description Submit batch operation to wallet
     *
     */
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const ops = [];
            for (const op of this.operations) {
                ops.push(yield this.mapOperation(op));
            }
            const opHash = yield this.walletProvider.sendOperations(ops);
            return this.context.operationFactory.createBatchOperation(opHash);
        });
    }
}
class Wallet {
    constructor(context) {
        this.context = context;
        this.walletCommand = (send) => {
            return {
                send,
            };
        };
    }
    get walletProvider() {
        return this.context.walletProvider;
    }
    /**
     * @description Retrieve the PKH of the account that is currently in use by the wallet
     *
     * @param option Option to use while fetching the PKH.
     * If forceRefetch is specified the wallet provider implementation will refetch the PKH from the wallet
     */
    pkh({ forceRefetch } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._pkh || forceRefetch) {
                this._pkh = yield this.walletProvider.getPKH();
            }
            return this._pkh;
        });
    }
    /**
     *
     * @description Originate a new contract according to the script in parameters.
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param originateParams Originate operation parameter
     */
    originate(params) {
        return this.walletCommand(() => __awaiter(this, void 0, void 0, function* () {
            const mappedParams = yield this.walletProvider.mapOriginateParamsToWalletParams(() => this.context.parser.prepareCodeOrigination(Object.assign({}, params)));
            const opHash = yield this.walletProvider.sendOperations([mappedParams]);
            if (!this.context.proto) {
                this.context.proto = (yield this.context.rpc.getBlock()).protocol;
            }
            return this.context.operationFactory.createOriginationOperation(opHash);
        }));
    }
    /**
     *
     * @description Set the delegate for a contract.
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param delegateParams operation parameter
     */
    setDelegate(params) {
        if (params.delegate && validateAddress(params.delegate) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid address error: ${params.delegate}`);
        }
        return this.walletCommand(() => __awaiter(this, void 0, void 0, function* () {
            const mappedParams = yield this.walletProvider.mapDelegateParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return params; }));
            const opHash = yield this.walletProvider.sendOperations([mappedParams]);
            return this.context.operationFactory.createDelegationOperation(opHash);
        }));
    }
    /**
     *
     * @description Register the current address as delegate.
     *
     * @returns An operation handle with the result from the rpc node
     *
     */
    registerDelegate() {
        return this.walletCommand(() => __awaiter(this, void 0, void 0, function* () {
            const mappedParams = yield this.walletProvider.mapDelegateParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () {
                const delegate = yield this.pkh();
                return { delegate };
            }));
            const opHash = yield this.walletProvider.sendOperations([mappedParams]);
            return this.context.operationFactory.createDelegationOperation(opHash);
        }));
    }
    /**
     *
     * @description Transfer tezos tokens from current address to a specific address or call a smart contract.
     *
     * @returns A wallet command from which we can send the operation to the wallet
     *
     * @param params operation parameter
     */
    transfer(params) {
        if (validateAddress(params.to) !== ValidationResult.VALID) {
            throw new InvalidAddressError(`Invalid 'to' address: ${params.to}`);
        }
        return this.walletCommand(() => __awaiter(this, void 0, void 0, function* () {
            const mappedParams = yield this.walletProvider.mapTransferParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return params; }));
            const opHash = yield this.walletProvider.sendOperations([mappedParams]);
            return this.context.operationFactory.createTransactionOperation(opHash);
        }));
    }
    /**
     *
     * @description Create a batch of operation
     *
     * @returns A batch object from which we can add more operation or send a command to the wallet to execute the batch
     *
     * @param params List of operation to initialize the batch with
     */
    batch(params) {
        const batch = new WalletOperationBatch(this.walletProvider, this.context);
        if (Array.isArray(params)) {
            batch.with(params);
        }
        return batch;
    }
    /**
     *
     * @description Create an smart contract abstraction for the address specified. Calling entrypoints with the returned
     * smart contract abstraction will leverage the wallet provider to make smart contract calls
     *
     * @param address Smart contract address
     */
    at(address, contractAbstractionComposer = (x) => x) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateContractAddress(address) !== ValidationResult.VALID) {
                throw new InvalidContractAddressError(`Invalid contract address: ${address}`);
            }
            const rpc = this.context.withExtensions().rpc;
            const script = yield rpc.getNormalizedScript(address);
            const entrypoints = yield rpc.getEntrypoints(address);
            const blockHeader = yield this.context.rpc.getBlockHeader();
            const chainId = blockHeader.chain_id;
            const abs = new ContractAbstraction(address, script, this, this.context.contract, entrypoints, chainId, rpc);
            return contractAbstractionComposer(abs, this.context);
        });
    }
}

class LegacyWalletProvider {
    constructor(context) {
        this.context = context;
    }
    getPKH() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.context.signer.publicKeyHash();
        });
    }
    mapTransferParamsToWalletParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return attachKind(yield params(), OpKind.TRANSACTION);
        });
    }
    mapOriginateParamsToWalletParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return attachKind(yield params(), OpKind.ORIGINATION);
        });
    }
    mapDelegateParamsToWalletParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return attachKind(yield params(), OpKind.DELEGATION);
        });
    }
    sendOperations(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const op = yield this.context.batch.batch(params).send();
            return op.hash;
        });
    }
}

/**
 * @description Utility class to send smart contract operation
 * The format for the arguments is the object representation
 */
class ContractMethodObject {
    constructor(provider, address, parameterSchema, name, args = 'unit', isMultipleEntrypoint = true, isAnonymous = false) {
        this.provider = provider;
        this.address = address;
        this.parameterSchema = parameterSchema;
        this.name = name;
        this.args = args;
        this.isMultipleEntrypoint = isMultipleEntrypoint;
        this.isAnonymous = isAnonymous;
    }
    /**
     * @description Get the signature of the smart contract method
     */
    getSignature() {
        return this.isAnonymous
            ? this.parameterSchema.ExtractSchema()[this.name]
            : this.parameterSchema.ExtractSchema();
    }
    /**
     *
     * @description Send the smart contract operation
     *
     * @param Options generic operation parameter
     */
    send(params = {}) {
        if (this.provider instanceof Wallet) {
            return this.provider.transfer(this.toTransferParams(params)).send();
        }
        else {
            return this.provider.transfer(this.toTransferParams(params));
        }
    }
    /**
     *
     * @description Create transfer params to be used with TezosToolkit.contract.transfer methods
     *
     * @param Options generic transfer operation parameters
     */
    toTransferParams({ fee, gasLimit, storageLimit, source, amount = 0, mutez = false, } = {}) {
        const fullTransferParams = {
            to: this.address,
            amount,
            fee,
            mutez,
            source,
            gasLimit,
            storageLimit,
            parameter: {
                entrypoint: this.isMultipleEntrypoint ? this.name : DEFAULT_SMART_CONTRACT_METHOD_NAME,
                value: this.isAnonymous
                    ? this.parameterSchema.EncodeObject({ [this.name]: this.args })
                    : this.parameterSchema.EncodeObject(this.args),
            },
        };
        return fullTransferParams;
    }
}

const runCodeHelper = (viewArgsType, viewReturnType, contractStorageType, viewInstructions, viewArgs, contractStorageValue, balance, chain_id, source, amount = '0') => {
    return {
        script: [
            { prim: 'parameter', args: [{ prim: 'pair', args: [viewArgsType, contractStorageType] }] },
            { prim: 'storage', args: [{ prim: 'option', args: [viewReturnType] }] },
            {
                prim: 'code',
                args: [
                    [
                        { prim: 'CAR' },
                        viewInstructions,
                        { prim: 'SOME' },
                        { prim: 'NIL', args: [{ prim: 'operation' }] },
                        { prim: 'PAIR' },
                    ],
                ],
            },
        ],
        storage: { prim: 'None' },
        input: { prim: 'Pair', args: [viewArgs, contractStorageValue] },
        amount,
        balance,
        chain_id,
        source,
    };
};
class OnChainView {
    constructor(_rpc, _contractAddress, _smartContractViewSchema, _contractStorageType, _contractStorageValue, _args = 'Unit') {
        this._rpc = _rpc;
        this._contractAddress = _contractAddress;
        this._smartContractViewSchema = _smartContractViewSchema;
        this._contractStorageType = _contractStorageType;
        this._contractStorageValue = _contractStorageValue;
        this._args = _args;
    }
    /**
     * @description Get the signature of the smart contract view
     */
    getSignature() {
        return {
            parameter: this._smartContractViewSchema.extractArgsSchema(),
            result: this._smartContractViewSchema.extractResultSchema(),
        };
    }
    /**
     * @description Get the result of the view simulation
     * @param executionContext.source the public key hash of the account who initialized this view execution.
     * @param executionContext.viewCaller the contract address which is the caller of view.
     */
    executeView(executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyContextExecution(executionContext);
            const balance = (yield this._rpc.getBalance(this._contractAddress)).toString();
            const chainId = yield this._rpc.getChainId();
            return this.executeViewAndDecodeResult(runCodeHelper(this._smartContractViewSchema.viewArgsType, this._smartContractViewSchema.viewReturnType, this._contractStorageType, this.adaptViewCodeToContext(this._smartContractViewSchema.instructions, executionContext.viewCaller, balance), this.transformArgsToMichelson(), this._contractStorageValue, balance, chainId, executionContext.source));
        });
    }
    verifyContextExecution(executionContext) {
        if (executionContext.source &&
            validateAddress(executionContext.source) !== ValidationResult.VALID) {
            throw new InvalidViewSimulationContext(`The source account who initialized the view execution is invalid: ${executionContext.source}.`);
        }
        if (!executionContext.viewCaller ||
            validateAddress(executionContext.viewCaller) !== ValidationResult.VALID) {
            throw new InvalidViewSimulationContext(`The contract which is the caller of view is invalid: ${executionContext.viewCaller}.`);
        }
    }
    transformArgsToMichelson() {
        try {
            return this._smartContractViewSchema.encodeViewArgs(this._args);
        }
        catch (error) {
            throw new InvalidViewParameterError(this._smartContractViewSchema.viewName, this.getSignature(), this._args, error);
        }
    }
    /**
     * @description Loops through the view's instructions and replace BALANCE, SENDER, SELF_ADDRESS and AMOUNT with Michelson expressions that match the current context, if applicable.
     *
     * Certain specific instructions have different semantics in view:
     * BALANCE represents the current amount of mutez held by the contract where view is;
     * SENDER represents the contract which is the caller of view;
     * SELF_ADDRESS represents the contract where view is;
     * AMOUNT is always 0 mutez.
     *
     */
    adaptViewCodeToContext(instructions, viewCaller, contractBalance) {
        const instructionsToReplace = {
            BALANCE: [{ prim: 'PUSH', args: [{ prim: 'mutez' }, { int: contractBalance }] }],
            SENDER: [{ prim: 'PUSH', args: [{ prim: 'address' }, { string: viewCaller }] }],
            SELF_ADDRESS: [
                { prim: 'PUSH', args: [{ prim: 'address' }, { string: this._contractAddress }] },
            ],
            AMOUNT: [{ prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] }],
        };
        instructions.forEach((inst, i) => {
            if (inst.prim in instructionsToReplace) {
                instructions[i] = Object(instructionsToReplace)[inst.prim];
            }
            if (inst.args && inst.args.length !== 0) {
                this.adaptViewCodeToContext(inst.args, viewCaller, contractBalance);
            }
            else if (Array.isArray(inst)) {
                this.adaptViewCodeToContext(inst, viewCaller, contractBalance);
            }
        });
        return instructions;
    }
    executeViewAndDecodeResult(viewScript) {
        return __awaiter(this, void 0, void 0, function* () {
            let storage;
            try {
                storage = (yield this._rpc.runCode(viewScript)).storage;
            }
            catch (error) {
                const failWith = validateAndExtractFailwith(error);
                throw failWith
                    ? new ViewSimulationError(`The simulation of the on-chain view named ${this._smartContractViewSchema.viewName} failed with: ${JSON.stringify(failWith)}`, this._smartContractViewSchema.viewName, failWith, error)
                    : error;
            }
            if (!storage.args) {
                throw new ViewSimulationError(`View simulation failed with an invalid result: ${storage}`, this._smartContractViewSchema.viewName);
            }
            return this._smartContractViewSchema.decodeViewResult(storage.args[0]);
        });
    }
}

class ContractMethodFactory {
    constructor(provider, contractAddress) {
        this.provider = provider;
        this.contractAddress = contractAddress;
    }
    createContractMethodFlatParams(smartContractMethodSchema, smartContractMethodName, args, isMultipleEntrypoint = true, isAnonymous = false) {
        return new ContractMethod(this.provider, this.contractAddress, smartContractMethodSchema, smartContractMethodName, args, isMultipleEntrypoint, isAnonymous);
    }
    createContractMethodObjectParam(smartContractMethodSchema, smartContractMethodName, args, isMultipleEntrypoint = true, isAnonymous = false) {
        return new ContractMethodObject(this.provider, this.contractAddress, smartContractMethodSchema, smartContractMethodName, args, isMultipleEntrypoint, isAnonymous);
    }
    createContractViewObjectParam(rpc, smartContractViewSchema, contractStorageType, contractStorageValue, viewArgs) {
        return new OnChainView(rpc, this.contractAddress, smartContractViewSchema, contractStorageType, contractStorageValue, viewArgs);
    }
}

class LambdaView {
    constructor(lambdaContract, viewContract, viewMethod = 'default', contractParameter = { prim: 'Unit' }) {
        this.lambdaContract = lambdaContract;
        this.viewContract = viewContract;
        this.viewMethod = viewMethod;
        this.contractParameter = contractParameter;
        this.voidLambda = this.createVoidLambda();
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.lambdaContract.methods.default(this.voidLambda).send();
            }
            catch (ex) {
                if (ex instanceof TezosOperationError) {
                    const lastError = ex.errors[ex.errors.length - 1];
                    const failedWith = lastError.with;
                    return failedWith;
                }
                else {
                    throw ex;
                }
            }
        });
    }
    createVoidLambda() {
        const [parameter, callback] = this.getView();
        let contractArgs = [
            {
                prim: 'pair',
                args: [parameter, { prim: 'contract', args: [callback] }],
            },
        ];
        if (this.viewMethod === 'default') {
            contractArgs = [{ string: '%default' }].concat(contractArgs);
        }
        return [
            { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
            { prim: 'NONE', args: [{ prim: 'key_hash' }] },
            {
                prim: 'CREATE_CONTRACT',
                args: [
                    [
                        { prim: 'parameter', args: [callback] },
                        { prim: 'storage', args: [{ prim: 'unit' }] },
                        {
                            prim: 'code',
                            args: [[{ prim: 'CAR' }, { prim: 'FAILWITH' }]],
                        },
                    ],
                ],
            },
            {
                prim: 'DIP',
                args: [
                    [
                        {
                            prim: 'DIP',
                            args: [
                                [
                                    {
                                        prim: 'LAMBDA',
                                        args: [
                                            {
                                                prim: 'pair',
                                                args: [{ prim: 'address' }, { prim: 'unit' }],
                                            },
                                            {
                                                prim: 'pair',
                                                args: [{ prim: 'list', args: [{ prim: 'operation' }] }, { prim: 'unit' }],
                                            },
                                            [
                                                { prim: 'CAR' },
                                                { prim: 'CONTRACT', args: [callback] },
                                                {
                                                    prim: 'IF_NONE',
                                                    args: [
                                                        [
                                                            {
                                                                prim: 'PUSH',
                                                                args: [{ prim: 'string' }, { string: `Callback type unmatched` }],
                                                            },
                                                            { prim: 'FAILWITH' },
                                                        ],
                                                        [],
                                                    ],
                                                },
                                                {
                                                    prim: 'PUSH',
                                                    args: [parameter, this.contractParameter],
                                                },
                                                { prim: 'PAIR' },
                                                {
                                                    prim: 'DIP',
                                                    args: [
                                                        [
                                                            {
                                                                prim: 'PUSH',
                                                                args: [
                                                                    { prim: 'address' },
                                                                    { string: `${this.viewContract.address}%${this.viewMethod}` },
                                                                ],
                                                            },
                                                            { prim: 'DUP' },
                                                            { prim: 'CONTRACT', args: contractArgs },
                                                            {
                                                                prim: 'IF_NONE',
                                                                args: [
                                                                    [
                                                                        {
                                                                            prim: 'PUSH',
                                                                            args: [
                                                                                { prim: 'string' },
                                                                                { string: `Contract does not exist` },
                                                                            ],
                                                                        },
                                                                        { prim: 'FAILWITH' },
                                                                    ],
                                                                    [{ prim: 'DIP', args: [[{ prim: 'DROP' }]] }],
                                                                ],
                                                            },
                                                            {
                                                                prim: 'PUSH',
                                                                args: [{ prim: 'mutez' }, { int: '0' }],
                                                            },
                                                        ],
                                                    ],
                                                },
                                                { prim: 'TRANSFER_TOKENS' },
                                                {
                                                    prim: 'DIP',
                                                    args: [[{ prim: 'NIL', args: [{ prim: 'operation' }] }]],
                                                },
                                                { prim: 'CONS' },
                                                { prim: 'DIP', args: [[{ prim: 'UNIT' }]] },
                                                { prim: 'PAIR' },
                                            ],
                                        ],
                                    },
                                ],
                            ],
                        },
                        { prim: 'APPLY' },
                        {
                            prim: 'DIP',
                            args: [
                                [
                                    {
                                        prim: 'PUSH',
                                        args: [{ prim: 'address' }, { string: this.lambdaContract.address }],
                                    },
                                    { prim: 'DUP' },
                                    {
                                        prim: 'CONTRACT',
                                        args: [
                                            {
                                                prim: 'lambda',
                                                args: [
                                                    { prim: 'unit' },
                                                    {
                                                        prim: 'pair',
                                                        args: [
                                                            { prim: 'list', args: [{ prim: 'operation' }] },
                                                            { prim: 'unit' },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        prim: 'IF_NONE',
                                        args: [
                                            [
                                                {
                                                    prim: 'PUSH',
                                                    args: [{ prim: 'string' }, { string: `Contract does not exists` }],
                                                },
                                                { prim: 'FAILWITH' },
                                            ],
                                            [{ prim: 'DIP', args: [[{ prim: 'DROP' }]] }],
                                        ],
                                    },
                                    { prim: 'PUSH', args: [{ prim: 'mutez' }, { int: '0' }] },
                                ],
                            ],
                        },
                        { prim: 'TRANSFER_TOKENS' },
                        {
                            prim: 'DIP',
                            args: [[{ prim: 'NIL', args: [{ prim: 'operation' }] }]],
                        },
                        { prim: 'CONS' },
                    ],
                ],
            },
            { prim: 'CONS' },
            { prim: 'DIP', args: [[{ prim: 'UNIT' }]] },
            { prim: 'PAIR' },
        ];
    }
    getView() {
        const entrypoints = this.viewContract.entrypoints.entrypoints;
        const entrypoint = entrypoints[this.viewMethod];
        if (!entrypoint) {
            throw Error(`Contract at ${this.viewContract.address} does not have entrypoint: ${this.viewMethod}`);
        }
        if (!('prim' in entrypoint) || !entrypoint.args) {
            // TODO: Enhance this error message to be more descriptive
            throw Error('Entrypoint args undefined');
        }
        const args = Array.from(entrypoint.args);
        const [parameter, callbackContract] = args;
        if ('annots' in parameter) {
            delete parameter['annots'];
        }
        if (!('prim' in callbackContract) || !callbackContract.args) {
            // TODO: Enhance this error message to be more descriptive
            throw Error('Callback contract args undefined');
        }
        let message;
        if (entrypoint.prim !== 'pair') {
            message = `Expected {'prim': 'pair', ..} but found {'prim': ${entrypoint.prim}, ..}`;
        }
        else if (args.length !== 2) {
            message = `Expected an Array of length 2, but found: ${args}`;
        }
        else if (callbackContract.prim !== 'contract') {
            message = `Expected a {prim: 'contract', ...}, but found: ${callbackContract.prim}`;
        }
        else if (callbackContract.args && callbackContract.args.length !== 1) {
            message = `Expected a single argument to 'contract', but found: ${callbackContract.args}`;
        }
        if (message)
            throw Error(message);
        return [parameter, callbackContract.args[0]];
    }
}

const DEFAULT_SMART_CONTRACT_METHOD_NAME = 'default';
/**
 * @description Utility class to retrieve data from a smart contract's storage without incurring fees via a contract's view method
 */
class ContractView {
    constructor(currentContract, provider, name, chainId, callbackParametersSchema, parameterSchema, args) {
        this.currentContract = currentContract;
        this.provider = provider;
        this.name = name;
        this.chainId = chainId;
        this.callbackParametersSchema = callbackParametersSchema;
        this.parameterSchema = parameterSchema;
        this.args = args;
    }
    /**
     *
     * @description Find which lambda contract to use based on the current network,
     * encode parameters to Michelson,
     * create an instance of Lambdaview to retrieve data, and
     * Decode Michelson response
     *
     * @param Options Address of a lambda contract (sandbox users)
     */
    read(customLambdaAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let lambdaAddress;
            // TODO Verify if the 'customLambdaAdress' is a valid originated contract and if not, return an appropriate error message.  
            if (customLambdaAddress) {
                lambdaAddress = customLambdaAddress;
            }
            else if (this.chainId === ChainIds.GRANADANET) {
                lambdaAddress = DefaultLambdaAddresses.GRANADANET;
            }
            else if (this.chainId === ChainIds.HANGZHOUNET) {
                lambdaAddress = DefaultLambdaAddresses.HANGZHOUNET;
            }
            else if (this.chainId === ChainIds.ITHACANET) {
                lambdaAddress = DefaultLambdaAddresses.ITHACANET;
            }
            else if (this.chainId === ChainIds.ITHACANET2) {
                lambdaAddress = DefaultLambdaAddresses.ITHACANET2;
            }
            else if (this.chainId === ChainIds.MAINNET) {
                lambdaAddress = DefaultLambdaAddresses.MAINNET;
            }
            else {
                throw new UndefinedLambdaContractError();
            }
            const lambdaContract = yield this.provider.at(lambdaAddress);
            const arg = this.parameterSchema.Encode(...this.args);
            const lambdaView = new LambdaView(lambdaContract, this.currentContract, this.name, arg);
            const failedWith = yield lambdaView.execute();
            const response = this.callbackParametersSchema.Execute(failedWith);
            return response;
        });
    }
}
const validateArgs = (args, schema, name) => {
    const sigs = schema.ExtractSignatures();
    if (!sigs.find((x) => x.length === args.length)) {
        throw new InvalidParameterError(name, sigs, args);
    }
};
// lambda view tzip4
const isView = (entrypoint) => {
    let isView = false;
    if ('prim' in entrypoint && entrypoint.prim === 'pair' && entrypoint.args) {
        const lastElement = entrypoint.args[entrypoint.args.length - 1];
        if ('prim' in lastElement && lastElement.prim === 'contract') {
            isView = true;
        }
    }
    return isView;
};
const isContractProvider = (variableToCheck) => variableToCheck.contractProviderTypeSymbol !== undefined;
/**
 * @description Smart contract abstraction
 */
class ContractAbstraction {
    constructor(address, script, provider, storageProvider, entrypoints, chainId, rpc) {
        this.address = address;
        this.script = script;
        this.storageProvider = storageProvider;
        this.entrypoints = entrypoints;
        this.chainId = chainId;
        /**
         * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
         * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
         *
         */
        this.methods = {};
        /**
         * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
         * `methodsObject` serves the exact same purpose as the `methods` member. The difference is that it allows passing the parameter in an object format when calling the smart contract method (instead of the flattened representation)
         * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
         *
         */
        this.methodsObject = {};
        /**
         * @description Contains lamda views (tzip4) that are implemented by the target Tezos Smart Contract, and offers the user to call the lambda views as if they were native TS/JS methods.
         * NB: These are the view defined in the tzip4 standard, not the views introduced by the Hangzhou protocol.
         */
        this.views = {};
        /**
         * @description Contains on-chain views that are defined by the target Tezos Smart Contract, and offers the user to simulate the views execution as if they were native TS/JS methods.
         * NB: the expected format for the parameter when calling a smart contract view is the object format (same format as for the storage) and not the flattened representation.
         *
         */
        this.contractViews = {};
        this.contractMethodFactory = new ContractMethodFactory(provider, address);
        this.schema = Schema.fromRPCResponse({ script: this.script });
        this.parameterSchema = ParameterSchema.fromRPCResponse({ script: this.script });
        this.viewSchema = ViewSchema.fromRPCResponse({ script: this.script });
        if (this.viewSchema.length !== 0) {
            this._initializeOnChainViews(this, rpc, this.viewSchema);
        }
        this._initializeMethods(this, provider, this.entrypoints.entrypoints, this.chainId);
    }
    _initializeMethods(currentContract, provider, entrypoints, chainId) {
        const parameterSchema = this.parameterSchema;
        const keys = Object.keys(entrypoints);
        if (parameterSchema.isMultipleEntryPoint) {
            keys.forEach((smartContractMethodName) => {
                const smartContractMethodSchema = new ParameterSchema(entrypoints[smartContractMethodName]);
                this.methods[smartContractMethodName] = function (...args) {
                    return currentContract.contractMethodFactory.createContractMethodFlatParams(smartContractMethodSchema, smartContractMethodName, args);
                };
                this.methodsObject[smartContractMethodName] = function (args) {
                    return currentContract.contractMethodFactory.createContractMethodObjectParam(smartContractMethodSchema, smartContractMethodName, args);
                };
                if (isContractProvider(provider)) {
                    if (isView(entrypoints[smartContractMethodName])) {
                        const view = function (...args) {
                            const entrypointParamWithoutCallback = entrypoints[smartContractMethodName]
                                .args[0];
                            const smartContractMethodSchemaWithoutCallback = new ParameterSchema(entrypointParamWithoutCallback);
                            const parametersCallback = entrypoints[smartContractMethodName].args[1]
                                .args[0];
                            const smartContractMethodCallbackSchema = new ParameterSchema(parametersCallback);
                            validateArgs(args, smartContractMethodSchemaWithoutCallback, smartContractMethodName);
                            return new ContractView(currentContract, provider, smartContractMethodName, chainId, smartContractMethodCallbackSchema, smartContractMethodSchemaWithoutCallback, args);
                        };
                        this.views[smartContractMethodName] = view;
                    }
                }
            });
            // Deal with methods with no annotations which were not discovered by the RPC endpoint
            // Methods with no annotations are discovered using parameter schema
            const anonymousMethods = Object.keys(parameterSchema.ExtractSchema()).filter((key) => Object.keys(entrypoints).indexOf(key) === -1);
            anonymousMethods.forEach((smartContractMethodName) => {
                this.methods[smartContractMethodName] = function (...args) {
                    return currentContract.contractMethodFactory.createContractMethodFlatParams(parameterSchema, smartContractMethodName, args, false, true);
                };
                this.methodsObject[smartContractMethodName] = function (args) {
                    return currentContract.contractMethodFactory.createContractMethodObjectParam(parameterSchema, smartContractMethodName, args, false, true);
                };
            });
        }
        else {
            const smartContractMethodSchema = this.parameterSchema;
            this.methods[DEFAULT_SMART_CONTRACT_METHOD_NAME] = function (...args) {
                return currentContract.contractMethodFactory.createContractMethodFlatParams(smartContractMethodSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME, args, false);
            };
            this.methodsObject[DEFAULT_SMART_CONTRACT_METHOD_NAME] = function (args) {
                return currentContract.contractMethodFactory.createContractMethodObjectParam(smartContractMethodSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME, args, false);
            };
        }
    }
    _initializeOnChainViews(currentContract, rpc, allContractViews) {
        const storageType = this.schema.val;
        const storageValue = this.script.storage;
        allContractViews.forEach((viewSchema) => {
            this.contractViews[viewSchema.viewName] = function (args) {
                return currentContract.contractMethodFactory.createContractViewObjectParam(rpc, viewSchema, storageType, storageValue, args);
            };
        });
    }
    /**
     * @description Return a friendly representation of the smart contract storage
     */
    storage() {
        return this.storageProvider.getStorage(this.address, this.schema);
    }
    /**
     *
     * @description Return a friendly representation of the smart contract big map value
     *
     * @param key BigMap key to fetch
     *
     * @deprecated getBigMapKey has been deprecated in favor of getBigMapKeyByID
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
     */
    bigMap(key) {
        return this.storageProvider.getBigMapKey(this.address, key, this.schema);
    }
}

class BigMapAbstraction {
    constructor(id, schema, provider) {
        this.id = id;
        this.schema = schema;
        this.provider = provider;
    }
    /**
     *
     * @description Fetch one value in a big map
     *
     * @param keysToEncode Key to query (will be encoded properly according to the schema)
     * @param block optional block level to fetch the values from (head will be use by default)
     * @returns Return a well formatted json object of a big map value or undefined if the key is not found in the big map
     *
     */
    get(keyToEncode, block) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield this.provider.getBigMapKeyByID(this.id.toString(), keyToEncode, this.schema, block);
                return id;
            }
            catch (e) {
                if (e instanceof HttpResponseError && e.status === STATUS_CODE.NOT_FOUND) {
                    return undefined;
                }
                else {
                    throw e;
                }
            }
        });
    }
    /**
     *
     * @description Fetch multiple values in a big map
     * All values will be fetched on the same block level. If a block is specified in the request, the values will be fetched at it.
     * Otherwise, a first request will be done to the node to fetch the level of the head and all values will be fetched at this level.
     * If one of the keys does not exist in the big map, its value will be set to undefined.
     *
     * @param keysToEncode Array of keys to query (will be encoded properly according to the schema)
     * @param block optional block level to fetch the values from
     * @param batchSize optional batch size representing the number of requests to execute in parallel
     * @returns A MichelsonMap containing the keys queried in the big map and their value in a well-formatted JSON object format
     *
     */
    getMultipleValues(keysToEncode, block, batchSize = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider.getBigMapKeysByID(this.id.toString(), keysToEncode, this.schema, block, batchSize);
        });
    }
    toJSON() {
        return this.id.toString();
    }
    toString() {
        return this.id.toString();
    }
}

class SaplingStateAbstraction {
    constructor(id, provider) {
        this.id = id;
        this.provider = provider;
    }
    /**
     *
     * @description Fetch the sapling state
     *
     * @param block optional block level to fetch the values from (head will be use by default)
     * @returns Return a json object of the sapling_state
     *
     */
    getSaplingDiff(block) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider.getSaplingDiffByID(this.id.toString(), block);
        });
    }
    getId() {
        return this.id.toString();
    }
}

// Override the default michelson encoder semantic to provide richer abstraction over storage properties
const smartContractAbstractionSemantic = (provider) => ({
    // Provide a specific abstraction for BigMaps
    big_map: (val, code) => {
        if (!val || !('int' in val) || val.int === undefined) {
            // Return an empty object in case of missing big map ID
            return {};
        }
        else {
            const schema = new Schema(code);
            return new BigMapAbstraction(new BigNumber(val.int), schema, provider);
        }
    },
    sapling_state: (val) => {
        if (!val || !('int' in val) || val.int === undefined) {
            // Return an empty object in case of missing sapling state ID
            return {};
        }
        else {
            return new SaplingStateAbstraction(new BigNumber(val.int), provider);
        }
    }
    /*
    // TODO: embed useful other abstractions
    'contract':  () => {},
    'address':  () => {}
    */
});

class RpcContractProvider extends OperationEmitter {
    constructor(context, estimator) {
        super(context);
        this.estimator = estimator;
        this.contractProviderTypeSymbol = Symbol.for('taquito--provider-type-symbol');
    }
    /**
     *
     * @description Return a well formatted json object of the contract storage
     *
     * @param contract contract address you want to get the storage from
     * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
     */
    getStorage(contract, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateContractAddress(contract) !== ValidationResult.VALID) {
                throw new InvalidContractAddressError(`Invalid contract address: ${contract}`);
            }
            if (!schema) {
                schema = yield this.rpc.getNormalizedScript(contract);
            }
            let contractSchema;
            if (Schema.isSchema(schema)) {
                contractSchema = schema;
            }
            else {
                contractSchema = Schema.fromRPCResponse({ script: schema });
            }
            const storage = yield this.rpc.getStorage(contract);
            return contractSchema.Execute(storage, smartContractAbstractionSemantic(this)); // Cast into T because only the caller can know the true type of the storage
        });
    }
    /**
     *
     * @description Return a well formatted json object of the contract big map storage
     *
     * @param contract contract address you want to get the storage from
     * @param key contract big map key to fetch value from
     * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
     *
     * @deprecated Deprecated in favor of getBigMapKeyByID
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
     */
    getBigMapKey(contract, key, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateContractAddress(contract) !== ValidationResult.VALID) {
                throw new InvalidContractAddressError(`Invalid contract address: ${contract}`);
            }
            if (!schema) {
                schema = yield this.rpc.getNormalizedScript(contract);
            }
            let contractSchema;
            if (Schema.isSchema(schema)) {
                contractSchema = schema;
            }
            else {
                contractSchema = Schema.fromRPCResponse({ script: schema });
            }
            const encodedKey = contractSchema.EncodeBigMapKey(key);
            const val = yield this.rpc.getBigMapKey(contract, encodedKey);
            return contractSchema.ExecuteOnBigMapValue(val); // Cast into T because only the caller can know the true type of the storage
        });
    }
    /**
     *
     * @description Return a well formatted json object of a big map value
     *
     * @param id Big Map ID
     * @param keyToEncode key to query (will be encoded properly according to the schema)
     * @param schema Big Map schema (can be determined using your contract type)
     * @param block optional block level to fetch the values from
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
     */
    getBigMapKeyByID(id, keyToEncode, schema, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const { key, type } = schema.EncodeBigMapKey(keyToEncode);
            const { packed } = yield this.context.packer.packData({ data: key, type });
            const encodedExpr = encodeExpr(packed);
            const bigMapValue = block
                ? yield this.context.rpc.getBigMapExpr(id.toString(), encodedExpr, { block: String(block) })
                : yield this.context.rpc.getBigMapExpr(id.toString(), encodedExpr);
            return schema.ExecuteOnBigMapValue(bigMapValue, smartContractAbstractionSemantic(this));
        });
    }
    /**
     *
     * @description Fetch multiple values in a big map
     * All values will be fetched on the same block level. If a block is specified in the request, the values will be fetched at it.
     * Otherwise, a first request will be done to the node to fetch the level of the head and all values will be fetched at this level.
     * If one of the keys does not exist in the big map, its value will be set to undefined.
     *
     * @param id Big Map ID
     * @param keys Array of keys to query (will be encoded properly according to the schema)
     * @param schema Big Map schema (can be determined using your contract type)
     * @param block optional block level to fetch the values from
     * @param batchSize optional batch size representing the number of requests to execute in parallel
     * @returns A MichelsonMap containing the keys queried in the big map and their value in a well-formatted JSON object format
     *
     */
    getBigMapKeysByID(id, keys, schema, block, batchSize = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            const level = yield this.getBlockForRequest(keys, block);
            const bigMapValues = new MichelsonMap();
            // Execute batch of promises in series
            let position = 0;
            let results = [];
            while (position < keys.length) {
                const keysBatch = keys.slice(position, position + batchSize);
                const batch = keysBatch.map((keyToEncode) => this.getBigMapValueOrUndefined(keyToEncode, id, schema, level));
                results = [...results, ...(yield Promise.all(batch))];
                position += batchSize;
            }
            for (let i = 0; i < results.length; i++) {
                bigMapValues.set(keys[i], results[i]);
            }
            return bigMapValues;
        });
    }
    getBlockForRequest(keys, block) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return keys.length === 1 || typeof block !== 'undefined'
                ? block
                : (_a = (yield this.rpc.getBlock())) === null || _a === void 0 ? void 0 : _a.header.level;
        });
    }
    getBigMapValueOrUndefined(keyToEncode, id, schema, level) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getBigMapKeyByID(id, keyToEncode, schema, level);
            }
            catch (ex) {
                if (ex instanceof HttpResponseError && ex.status === STATUS_CODE.NOT_FOUND) {
                    return;
                }
                else {
                    throw ex;
                }
            }
        });
    }
    /**
     *
     * @description Return a well formatted json object of a sapling state
     *
     * @param id Sapling state ID
     * @param block optional block level to fetch the value from
     *
     */
    getSaplingDiffByID(id, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const saplingState = block
                ? yield this.context.rpc.getSaplingDiffById(id.toString(), { block: String(block) })
                : yield this.context.rpc.getSaplingDiffById(id.toString());
            return saplingState;
        });
    }
    addRevealOperationIfNeeded(operation, publicKeyHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isOpRequireReveal(operation)) {
                const ops = [operation];
                const publicKey = yield this.signer.publicKey();
                const estimateReveal = yield this.estimator.reveal();
                if (estimateReveal) {
                    const reveal = { kind: OpKind.REVEAL };
                    const estimatedReveal = yield this.estimate(reveal, () => __awaiter(this, void 0, void 0, function* () { return estimateReveal; }));
                    ops.unshift(yield createRevealOperation(Object.assign({}, estimatedReveal), publicKeyHash, publicKey));
                    return ops;
                }
            }
            return operation;
        });
    }
    /**
     *
     * @description Originate a new contract according to the script in parameters. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @warn You cannot specify storage and init at the same time (use init to pass the raw michelson representation of storage)
     *
     * @param OriginationOperation Originate operation parameter
     */
    originate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimate = yield this.estimate(params, this.estimator.originate.bind(this.estimator));
            const publicKeyHash = yield this.signer.publicKeyHash();
            const operation = yield createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign(Object.assign({}, params), estimate)));
            const ops = yield this.addRevealOperationIfNeeded(operation, publicKeyHash);
            const preparedOrigination = yield this.prepareOperation({
                operation: ops,
                source: publicKeyHash,
            });
            const forgedOrigination = yield this.forge(preparedOrigination);
            const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(forgedOrigination);
            return new OriginationOperation(hash, operation, forgedBytes, opResponse, context, this);
        });
    }
    /**
     *
     * @description Set the delegate for a contract. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param SetDelegate operation parameter
     */
    setDelegate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.source && validateAddress(params.source) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid source Address: ${params.source}`);
            }
            if (params.delegate && validateAddress(params.delegate) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid delegate Address: ${params.delegate}`);
            }
            // Since babylon delegation source cannot smart contract
            if (/kt1/i.test(params.source)) {
                throw new InvalidDelegationSource(params.source);
            }
            const estimate = yield this.estimate(params, this.estimator.setDelegate.bind(this.estimator));
            const publicKeyHash = yield this.signer.publicKeyHash();
            const operation = yield createSetDelegateOperation(Object.assign(Object.assign({}, params), estimate));
            const sourceOrDefault = params.source || publicKeyHash;
            const ops = yield this.addRevealOperationIfNeeded(operation, publicKeyHash);
            const prepared = yield this.prepareOperation({
                operation: ops,
                source: sourceOrDefault,
            });
            const opBytes = yield this.forge(prepared);
            const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
            return new DelegateOperation(hash, operation, sourceOrDefault, forgedBytes, opResponse, context);
        });
    }
    /**
     *
     * @description Register the current address as delegate. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param RegisterDelegate operation parameter
     */
    registerDelegate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimate = yield this.estimate(params, this.estimator.registerDelegate.bind(this.estimator));
            const source = yield this.signer.publicKeyHash();
            const operation = yield createRegisterDelegateOperation(Object.assign(Object.assign({}, params), estimate), source);
            const ops = yield this.addRevealOperationIfNeeded(operation, source);
            const prepared = yield this.prepareOperation({ operation: ops });
            const opBytes = yield this.forge(prepared);
            const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
            return new DelegateOperation(hash, operation, source, forgedBytes, opResponse, context);
        });
    }
    /**
     *
     * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param Transfer operation parameter
     */
    transfer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateAddress(params.to) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid address passed in 'to' parameter: ${params.to}`);
            }
            if (params.source && validateAddress(params.source) !== ValidationResult.VALID) {
                throw new InvalidAddressError(`Invalid address passed in 'source' parameter: ${params.source}`);
            }
            const publickKeyHash = yield this.signer.publicKeyHash();
            const estimate = yield this.estimate(params, this.estimator.transfer.bind(this.estimator));
            const operation = yield createTransferOperation(Object.assign(Object.assign({}, params), estimate));
            const source = params.source || publickKeyHash;
            const ops = yield this.addRevealOperationIfNeeded(operation, publickKeyHash);
            const prepared = yield this.prepareOperation({ operation: ops, source: params.source });
            const opBytes = yield this.forge(prepared);
            const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
            return new TransactionOperation(hash, operation, source, forgedBytes, opResponse, context);
        });
    }
    /**
     *
     * @description Reveal the current address. Will throw an error if the address is already revealed.
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param RevealParams operation parameter
     */
    reveal(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicKeyHash = yield this.signer.publicKeyHash();
            const estimateReveal = yield this.estimator.reveal(params);
            if (estimateReveal) {
                const estimated = yield this.estimate(params, () => __awaiter(this, void 0, void 0, function* () { return estimateReveal; }));
                const operation = yield createRevealOperation(Object.assign({}, estimated), publicKeyHash, yield this.signer.publicKey());
                const prepared = yield this.prepareOperation({ operation, source: publicKeyHash });
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new RevealOperation(hash, operation, publicKeyHash, forgedBytes, opResponse, context);
            }
            else {
                throw new Error('The current address is already revealed.');
            }
        });
    }
    /**
     *
     * @description Register a Micheline expression in a global table of constants. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param params registerGlobalConstant operation parameter
     */
    registerGlobalConstant(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const publickKeyHash = yield this.signer.publicKeyHash();
            const estimate = yield this.estimate(params, this.estimator.registerGlobalConstant.bind(this.estimator));
            const operation = yield createRegisterGlobalConstantOperation(Object.assign(Object.assign({}, params), estimate));
            const ops = yield this.addRevealOperationIfNeeded(operation, publickKeyHash);
            const prepared = yield this.prepareOperation({ operation: ops, source: publickKeyHash });
            const opBytes = yield this.forge(prepared);
            const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
            return new RegisterGlobalConstantOperation(hash, operation, publickKeyHash, forgedBytes, opResponse, context);
        });
    }
    at(address, contractAbstractionComposer = (x) => x) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validateContractAddress(address) !== ValidationResult.VALID) {
                throw new InvalidContractAddressError(`Invalid contract address: ${address}`);
            }
            const rpc = this.context.withExtensions().rpc;
            const script = yield rpc.getNormalizedScript(address);
            const entrypoints = yield rpc.getEntrypoints(address);
            const blockHeader = yield this.rpc.getBlockHeader();
            const chainId = blockHeader.chain_id;
            const abs = new ContractAbstraction(address, script, this, this, entrypoints, chainId, rpc);
            return contractAbstractionComposer(abs, this.context);
        });
    }
    /**
     *
     * @description Batch a group of operation together. Operations will be applied in the order in which they are added to the batch
     *
     * @returns A batch object from which we can add more operation or send a command to execute the batch
     *
     * @param params List of operation to batch together
     */
    batch(params) {
        const batch = new OperationBatch(this.context, this.estimator);
        if (Array.isArray(params)) {
            batch.with(params);
        }
        return batch;
    }
}

class MichelCodecParser {
    constructor(context) {
        this.context = context;
    }
    getNextProto() {
        return __awaiter(this, void 0, void 0, function* () {
            const { next_protocol } = yield this.context.rpc.getBlockMetadata();
            return next_protocol;
        });
    }
    parseScript(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new Parser({ protocol: yield this.getNextProto() });
            return parser.parseScript(src);
        });
    }
    parseMichelineExpression(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new Parser({ protocol: yield this.getNextProto() });
            return parser.parseMichelineExpression(src);
        });
    }
    parseJSON(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new Parser({ protocol: yield this.getNextProto() });
            return parser.parseJSON(src);
        });
    }
    prepareCodeOrigination(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedParams = params;
            parsedParams.code = yield this.formatCodeParam(params.code);
            if (params.init) {
                parsedParams.init = yield this.formatInitParam(params.init);
            }
            else if (params.storage) {
                const storageType = parsedParams.code.find((p) => 'prim' in p && p.prim === 'storage');
                if (!(storageType === null || storageType === void 0 ? void 0 : storageType.args)) {
                    throw new InvalidCodeParameter('The storage section is missing from the script', params.code);
                }
                const schema = new Schema(storageType.args[0]);
                const globalconstantsHashAndValue = yield this.findGlobalConstantsHashAndValue(schema);
                if (Object.keys(globalconstantsHashAndValue).length !== 0) {
                    // If there are global constants in the storage part of the contract code,
                    // they need to be locally expanded in order to encode the storage arguments
                    const p = new Parser({ expandGlobalConstant: globalconstantsHashAndValue });
                    const storageTypeNoGlobalConst = p.parseJSON(storageType.args[0]);
                    const schemaNoGlobalConst = new Schema(storageTypeNoGlobalConst);
                    parsedParams.init = schemaNoGlobalConst.Encode(params.storage);
                }
                else {
                    parsedParams.init = schema.Encode(params.storage);
                }
                delete parsedParams.storage;
            }
            return parsedParams;
        });
    }
    formatCodeParam(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsedCode;
            if (typeof code === 'string') {
                const c = yield this.parseScript(code);
                if (c === null) {
                    throw new InvalidCodeParameter('Invalid code parameter', code);
                }
                parsedCode = c;
            }
            else {
                const c = yield this.parseJSON(code);
                const order = ['parameter', 'storage', 'code'];
                // Ensure correct ordering for RPC
                parsedCode = c.sort((a, b) => order.indexOf(a.prim) - order.indexOf(b.prim));
            }
            return parsedCode;
        });
    }
    formatInitParam(init) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsedInit;
            if (typeof init === 'string') {
                const c = yield this.parseMichelineExpression(init);
                if (c === null) {
                    throw new InvalidInitParameter('Invalid init parameter', init);
                }
                parsedInit = c;
            }
            else {
                parsedInit = yield this.parseJSON(init);
            }
            return parsedInit;
        });
    }
    findGlobalConstantsHashAndValue(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            const globalConstantTokens = schema.findToken('constant');
            const globalConstantsHashAndValue = {};
            if (globalConstantTokens.length !== 0) {
                for (const token of globalConstantTokens) {
                    const tokenArgs = token.tokenVal.args;
                    if (tokenArgs) {
                        const hash = tokenArgs[0]['string'];
                        const michelineValue = yield this.context.globalConstantsProvider.getGlobalConstantByHash(hash);
                        Object.assign(globalConstantsHashAndValue, {
                            [hash]: michelineValue,
                        });
                    }
                }
            }
            return globalConstantsHashAndValue;
        });
    }
}

class RpcPacker {
    constructor(context) {
        this.context = context;
    }
    packData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.context.rpc.packData(data);
        });
    }
}

class GlobalConstantNotFound extends Error {
    constructor(hash) {
        super(`Please load the value associated with the constant ${hash} using the loadGlobalConstant method of the DefaultGlobalConstantsProvider.`);
        this.hash = hash;
        this.name = 'GlobalConstantNotFound';
    }
}
class UnconfiguredGlobalConstantsProviderError extends Error {
    constructor() {
        super('No global constants provider has been configured. Please configure one by calling setGlobalConstantsProvider({globalConstantsProvider}) on your TezosToolkit instance.');
        this.name = 'UnconfiguredGlobalConstantsProviderError';
    }
}

class NoopGlobalConstantsProvider {
    getGlobalConstantByHash(_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new UnconfiguredGlobalConstantsProviderError();
        });
    }
}

const defaultConfigConfirmation = {
    defaultConfirmationCount: 1,
    confirmationPollingTimeoutSecond: 180,
};
const defaultConfigStreamer = {
    streamerPollingIntervalMilliseconds: 20000,
    shouldObservableSubscriptionRetry: false,
    observableSubscriptionRetryFunction: retry(),
};
/**
 * @description Encapsulate common service used throughout different part of the library
 */
class Context {
    constructor(_rpc, _signer = new NoopSigner(), _proto, _config = new BehaviorSubject(Object.assign(Object.assign({}, defaultConfigStreamer), defaultConfigConfirmation)), forger, injector, packer, wallet, parser, globalConstantsProvider) {
        this._rpc = _rpc;
        this._signer = _signer;
        this._proto = _proto;
        this._config = _config;
        this.providerDecorator = [];
        this.tz = new RpcTzProvider(this);
        this.estimate = new RPCEstimateProvider(this);
        this.contract = new RpcContractProvider(this, this.estimate);
        this.batch = new RPCBatchProvider(this, this.estimate);
        this.wallet = new Wallet(this);
        /**
         * @description Applies the decorators on a cloned instance of the context and returned this cloned instance.
         * The decorators are functions that inject logic into the context.
         * They are provided by the extensions set on the TezosToolkit by calling the registerProviderDecorator method.
         */
        this.withExtensions = () => {
            let clonedContext = this.clone();
            this.providerDecorator.forEach((decorator) => {
                clonedContext = decorator(clonedContext);
            });
            return clonedContext;
        };
        if (typeof this._rpc === 'string') {
            this._rpcClient = new RpcClient(this._rpc);
        }
        else {
            this._rpcClient = this._rpc;
        }
        this._forger = forger ? forger : new RpcForger(this);
        this._injector = injector ? injector : new RpcInjector(this);
        this.operationFactory = new OperationFactory(this);
        this._walletProvider = wallet ? wallet : new LegacyWalletProvider(this);
        this._parser = parser ? parser : new MichelCodecParser(this);
        this._packer = packer ? packer : new RpcPacker(this);
        this._globalConstantsProvider = globalConstantsProvider
            ? globalConstantsProvider
            : new NoopGlobalConstantsProvider();
    }
    get config() {
        return this._config.getValue();
    }
    set config(value) {
        this._config.next(Object.assign({}, value));
    }
    setPartialConfig(value) {
        this._config.next(Object.assign(Object.assign({}, this._config.getValue()), value));
    }
    get rpc() {
        return this._rpcClient;
    }
    set rpc(value) {
        this._rpcClient = value;
    }
    get injector() {
        return this._injector;
    }
    set injector(value) {
        this._injector = value;
    }
    get forger() {
        return this._forger;
    }
    set forger(value) {
        this._forger = value;
    }
    get signer() {
        return this._signer;
    }
    set signer(value) {
        this._signer = value;
    }
    get walletProvider() {
        return this._walletProvider;
    }
    set walletProvider(value) {
        this._walletProvider = value;
    }
    set proto(value) {
        this._proto = value;
    }
    get proto() {
        return this._proto;
    }
    get parser() {
        return this._parser;
    }
    set parser(value) {
        this._parser = value;
    }
    get packer() {
        return this._packer;
    }
    set packer(value) {
        this._packer = value;
    }
    get globalConstantsProvider() {
        return this._globalConstantsProvider;
    }
    set globalConstantsProvider(value) {
        this._globalConstantsProvider = value;
    }
    isAnyProtocolActive(protocol = []) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._proto) {
                return protocol.includes(this._proto);
            }
            else {
                const { next_protocol } = yield this.rpc.getBlockMetadata();
                return protocol.includes(next_protocol);
            }
        });
    }
    getConfirmationPollingInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            // Granada will generally halve the time between blocks, from 60 seconds to 30 seconds (mainnet).
            // We reduce the default value in the same proportion, from 10 to 5.
            const defaultInterval = 5;
            try {
                const constants = yield this.rpc.getConstants();
                let blockTime = constants.time_between_blocks[0];
                if (constants.minimal_block_delay !== undefined) {
                    blockTime = constants.minimal_block_delay;
                }
                let confirmationPollingInterval = BigNumber.sum(blockTime, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                new BigNumber(constants.delay_per_missing_endorsement).multipliedBy(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Math.max(0, constants.initial_endorsers - constants.endorsers_per_block)));
                // Divide the polling interval by a constant 3
                // to improvise for polling time to work in prod,
                // testnet and sandbox enviornment.
                confirmationPollingInterval = confirmationPollingInterval.dividedBy(3);
                this.config.confirmationPollingIntervalSecond =
                    confirmationPollingInterval.toNumber() === 0 ? 0.1 : confirmationPollingInterval.toNumber();
                return this.config.confirmationPollingIntervalSecond;
            }
            catch (exception) {
                // Return default value if there is
                // an issue returning from constants
                // file.
                return defaultInterval;
            }
        });
    }
    /**
     * @description Create a copy of the current context. Useful when you have long running operation and you do not want a context change to affect the operation
     */
    clone() {
        return new Context(this.rpc, this.signer, this.proto, this._config, this.forger, this._injector, this.packer);
    }
    /**
     * @description Allows extensions set on the TezosToolkit to inject logic into the context
     */
    registerProviderDecorator(fx) {
        this.providerDecorator.push(fx);
    }
}

const opHashFilter = (op, filter) => op.hash === filter.opHash;
const sourceFilter = (x, filter) => {
    switch (x.kind) {
        case 'endorsement':
            return 'metadata' in x && x.metadata.delegate === filter.source;
        case 'activate_account':
            return 'metadata' in x && x.pkh === filter.source;
        default:
            return 'source' in x && x.source === filter.source;
    }
};
const kindFilter = (x, filter) => 'kind' in x && x.kind === filter.kind;
const destinationFilter = (x, filter) => {
    switch (x.kind) {
        case 'delegation':
            return x.delegate === filter.destination;
        case 'origination':
            if ('metadata' in x &&
                'operation_result' in x.metadata &&
                'originated_contracts' in x.metadata.operation_result &&
                Array.isArray(x.metadata.operation_result.originated_contracts)) {
                return x.metadata.operation_result.originated_contracts.some(contract => contract === filter.destination);
            }
            break;
        case 'transaction':
            return x.destination === filter.destination;
        default:
            return false;
    }
};
const evaluateOpFilter = (op, filter) => {
    if ('opHash' in filter) {
        return opHashFilter(op, filter);
    }
    else if ('source' in filter) {
        return sourceFilter(op, filter);
    }
    else if ('kind' in filter) {
        return kindFilter(op, filter);
    }
    else if ('destination' in filter) {
        return destinationFilter(op, filter);
    }
    return false;
};
const evaluateExpression = (op, exp) => {
    if (Array.isArray(exp.and)) {
        return exp.and.every((x) => evaluateFilter(op, x));
    }
    else if (Array.isArray(exp.or)) {
        return exp.or.some((x) => evaluateFilter(op, x));
    }
    else {
        throw new Error('Filter expression must contains either and/or property');
    }
};
const evaluateFilter = (op, filter) => {
    const filters = [];
    if (!Array.isArray(filter)) {
        filters.push(filter);
    }
    else {
        filters.push(...filter);
    }
    return filters.every((filterOrExp) => {
        if ('and' in filterOrExp || 'or' in filterOrExp) {
            return evaluateExpression(op, filterOrExp);
        }
        else {
            return evaluateOpFilter(op, filterOrExp);
        }
    });
};

/* eslint-disable no-dupe-class-members */
class ObservableSubscription {
    constructor(obs, shouldRetry = false, operatorFunction = retry()) {
        this.shouldRetry = shouldRetry;
        this.operatorFunction = operatorFunction;
        this.errorListeners = [];
        this.messageListeners = [];
        this.closeListeners = [];
        this.completed$ = new Subject();
        obs
            .pipe(takeUntil(this.completed$), tap((data) => {
            this.call(this.messageListeners, data);
        }, (error) => {
            this.call(this.errorListeners, error);
        }, () => {
            this.call(this.closeListeners);
        }), this.shouldRetry ? operatorFunction : tap(), catchError(() => NEVER))
            .subscribe();
    }
    call(listeners, value) {
        for (const l of listeners) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                l(value);
            }
            catch (ex) {
                console.error(ex);
            }
        }
    }
    remove(listeners, value) {
        const idx = listeners.indexOf(value);
        if (idx !== -1) {
            listeners.splice(idx, 1);
        }
    }
    on(type, cb) {
        switch (type) {
            case 'data':
                this.messageListeners.push(cb);
                break;
            case 'error':
                this.errorListeners.push(cb);
                break;
            case 'close':
                this.closeListeners.push(cb);
                break;
            default:
                throw new Error(`Trying to register on an unsupported event: ${type}`);
        }
    }
    off(type, cb) {
        switch (type) {
            case 'data':
                this.remove(this.messageListeners, cb);
                break;
            case 'error':
                this.remove(this.errorListeners, cb);
                break;
            case 'close':
                this.remove(this.closeListeners, cb);
                break;
            default:
                throw new Error(`Trying to unregister on an unsupported event: ${type}`);
        }
    }
    close() {
        this.completed$.next();
    }
}

const getLastBlock = (context) => {
    return from(context.rpc.getBlock()).pipe(first());
};
const applyFilter = (filter) => concatMap(block => {
    return new Observable(sub => {
        for (const ops of block.operations) {
            for (const op of ops) {
                for (const content of op.contents) {
                    if (evaluateFilter(Object.assign({ hash: op.hash }, content), filter)) {
                        sub.next(Object.assign({ hash: op.hash }, content));
                    }
                }
            }
        }
        sub.complete();
    });
});
class PollingSubscribeProvider {
    constructor(context) {
        this.context = context;
        // Map the changing polling interval to a timer, which will automatically terminate the previous timer when the next one starts.
        this.timer$ = this.context._config.pipe(switchMap((val) => timer(0, val.streamerPollingIntervalMilliseconds)));
        this.newBlock$ = this.timer$.pipe(map(() => this.context), switchMap(getLastBlock), distinctUntilKeyChanged('hash'), publish(), refCount());
    }
    subscribe(_filter) {
        return new ObservableSubscription(this.newBlock$.pipe(pluck('hash')), this.context.config.shouldObservableSubscriptionRetry, this.context.config.observableSubscriptionRetryFunction);
    }
    subscribeOperation(filter) {
        return new ObservableSubscription(this.newBlock$.pipe(applyFilter(filter)), this.context.config.shouldObservableSubscriptionRetry, this.context.config.observableSubscriptionRetryFunction);
    }
}

// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
const VERSION = {
    "commitHash": "81f0a5b103f867f57fbe5d526315c375a3788346",
    "version": "11.2.0"
};

class ForgingMismatchError extends Error {
    constructor(results) {
        super('Forging mismatch error');
        this.results = results;
        this.name = 'ForgingMismatchError';
    }
}
class CompositeForger {
    constructor(forgers) {
        this.forgers = forgers;
        if (forgers.length === 0) {
            throw new Error('At least one forger must be specified');
        }
    }
    forge({ branch, contents }) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield Promise.all(this.forgers.map((forger) => {
                return forger.forge({ branch, contents });
            }));
            if (results.length === 0) {
                throw new Error('At least one forger must be specified');
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            let lastResult = results.pop(); // Assumed to be more than one since we
            while (results.length) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const currentResult = results.pop();
                if (currentResult !== lastResult) {
                    throw new ForgingMismatchError([lastResult, currentResult]);
                }
                lastResult = currentResult;
            }
            return lastResult;
        });
    }
}

class NoopParser {
    prepareCodeOrigination(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return params;
        });
    }
}

class MichelCodecPacker {
    packData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bytes } = packDataBytes(data.data, data.type);
            return { packed: bytes };
        });
    }
}

class DefaultGlobalConstantsProvider {
    constructor() {
        this._globalConstantsLibrary = {};
    }
    /**
     *
     * @description Allows to load global constant hashes and their corresponding Michelson JSON values
     */
    loadGlobalConstant(globalConstant) {
        for (const hash in globalConstant) {
            Object.assign(this._globalConstantsLibrary, {
                [hash]: globalConstant[hash],
            });
        }
    }
    /**
     *
     * @description Retrieve the Michelson value of a global constant based on its hash
     *
     * @param hash a string representing the global constant hash
     * @returns Expr, the JSON Michelson value
     */
    getGlobalConstantByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this._globalConstantsLibrary[hash];
            if (!value) {
                throw new GlobalConstantNotFound(hash);
            }
            return value;
        });
    }
}

/**
 * @packageDocumentation
 * @module @taquito/taquito
 */
/**
 * @description Facade class that surfaces all of the libraries capability and allow it's configuration
 *
 * @param _rpc The RPC server to use
 */
class TezosToolkit {
    constructor(_rpc) {
        this._rpc = _rpc;
        this._options = {};
        this.format = format;
        if (typeof this._rpc === 'string') {
            this._rpcClient = new RpcClient(this._rpc);
        }
        else {
            this._rpcClient = this._rpc;
        }
        this._context = new Context(_rpc);
        this._wallet = new Wallet(this._context);
        this.setProvider({ rpc: this._rpcClient });
        this.batch = this._context.batch.batch.bind(this._context.batch);
    }
    /**
     * @description Sets configuration on the Tezos Taquito instance. Allows user to choose which signer, rpc client, rpc url, forger and so forth
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network
     *
     * @example Tezos.setProvider({rpc: 'https://mainnet.api.tez.ie/', signer: new InMemorySigner.fromSecretKey(“edsk...”)})
     * @example Tezos.setProvider({ config: { confirmationPollingTimeoutSecond: 300 }})
     *
     */
    setProvider({ rpc, stream, signer, protocol, config, forger, wallet, packer, globalConstantsProvider, }) {
        this.setRpcProvider(rpc);
        this.setStreamProvider(stream);
        this.setSignerProvider(signer);
        this.setForgerProvider(forger);
        this.setWalletProvider(wallet);
        this.setPackerProvider(packer);
        this.setGlobalConstantsProvider(globalConstantsProvider);
        this._context.proto = protocol;
        if (config) {
            this._context.setPartialConfig(config);
        }
    }
    /**
     * @description Sets signer provider on the Tezos Taquito instance.
     *
     * @param options signer to use to interact with the Tezos network
     *
     * @example Tezos.setSignerProvider(new InMemorySigner.fromSecretKey('edsk...'))
     *
     */
    setSignerProvider(signer) {
        if (!this._options.signer && typeof signer === 'undefined') {
            this._context.signer = new NoopSigner();
            this._options.signer = signer;
        }
        else if (typeof signer !== 'undefined') {
            this._context.signer = signer;
            this._options.signer = signer;
        }
    }
    /**
     * @description Sets rpc provider on the Tezos Taquito instance
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network
     *
     * @example Tezos.setRpcProvider('https://mainnet.api.tez.ie/')
     *
     */
    setRpcProvider(rpc) {
        if (typeof rpc === 'string') {
            this._rpcClient = new RpcClient(rpc);
        }
        else if (rpc === undefined) ;
        else {
            this._rpcClient = rpc;
        }
        this._options.rpc = this._rpcClient;
        this._context.rpc = this._rpcClient;
    }
    /**
     * @description Sets forger provider on the Tezos Taquito instance
     *
     * @param options forger to use to interact with the Tezos network
     *
     * @example Tezos.setForgerProvider(localForger)
     *
     */
    setForgerProvider(forger) {
        const f = typeof forger === 'undefined' ? this.getFactory(RpcForger)() : forger;
        this._options.forger = f;
        this._context.forger = f;
    }
    /**
     * @description Sets stream provider on the Tezos Taquito instance
     *
     * @param options stream to use to interact with the Tezos network
     *
     * @example Tezos.setStreamProvider(...)
     *
     */
    setStreamProvider(stream) {
        if (typeof stream === 'string') {
            this._stream = new PollingSubscribeProvider(new Context(new RpcClient(stream)));
        }
        else if (typeof stream !== 'undefined') {
            this._stream = stream;
        }
        else if (this._options.stream === undefined) {
            this._stream = this.getFactory(PollingSubscribeProvider)();
        }
        this._options.stream = stream;
    }
    /**
     * @description Sets wallet provider on the Tezos Taquito instance
     *
     * @param options wallet to use to interact with the Tezos network
     *
     * @example Tezos.setWalletProvider(...)
     *
     */
    setWalletProvider(wallet) {
        if (!this._options.wallet && typeof wallet === 'undefined') {
            const w = this.getFactory(LegacyWalletProvider)();
            this._options.wallet = w;
            this._context.walletProvider = w;
        }
        else if (typeof wallet !== 'undefined') {
            this._options.wallet = wallet;
            this._context.walletProvider = wallet;
        }
    }
    /**
     * @description Sets Packer provider on the Tezos Taquito instance
     *
     * @param options packer to use to interact with the Tezos network
     *
     * @example Tezos.setPackerProvider(new MichelCodecPacker())
     *
     */
    setPackerProvider(packer) {
        const p = typeof packer === 'undefined' ? this.getFactory(RpcPacker)() : packer;
        this._options.packer = p;
        this._context.packer = p;
    }
    /**
     * @description Sets global constants provider on the Tezos Taquito instance
     *
     * @param options globalConstantsProvider to use to interact with the Tezos network
     *
     * @example
     * ```
     * const globalConst = new DefaultGlobalConstantsProvider();
     * globalConst.loadGlobalConstant({
     *  "expruu5BTdW7ajqJ9XPTF3kgcV78pRiaBW3Gq31mgp3WSYjjUBYxre": { prim: "int" },
     *  // ...
     * })
     * Tezos.setGlobalConstantsProvider(globalConst);
     * ```
     *
     */
    setGlobalConstantsProvider(globalConstantsProvider) {
        const g = typeof globalConstantsProvider === 'undefined'
            ? new NoopGlobalConstantsProvider()
            : globalConstantsProvider;
        this._options.globalConstantsProvider = g;
        this._context.globalConstantsProvider = g;
    }
    /**
     * @description Provide access to tezos account management
     */
    get tz() {
        return this._context.tz;
    }
    /**
     * @description Provide access to smart contract utilities
     */
    get contract() {
        return this._context.contract;
    }
    get wallet() {
        return this._wallet;
    }
    get operation() {
        return this._context.operationFactory;
    }
    /**
     * @description Provide access to operation estimation utilities
     */
    get estimate() {
        return this._context.estimate;
    }
    /**
     * @description Provide access to streaming utilities backed by an streamer implementation
     */
    get stream() {
        return this._stream;
    }
    /**
     * @description Provide access to the currently used rpc client
     */
    get rpc() {
        return this._context.rpc;
    }
    /**
     * @description Provide access to the currently used signer
     */
    get signer() {
        return this._context.signer;
    }
    /**
     * @description Provide access to the currently used globalConstantsProvider
     */
    get globalConstants() {
        return this._context.globalConstantsProvider;
    }
    /**
     * @description Allow to add a module to the TezosToolkit instance. This method adds the appropriate Providers(s) required by the module to the internal context.
     *
     * @param module extension to add to the TezosToolkit instance
     *
     * @example Tezos.addExtension(new Tzip16Module());
     */
    addExtension(module) {
        if (Array.isArray(module)) {
            module.forEach((extension) => extension.configureContext(this._context));
        }
        else {
            module.configureContext(this._context);
        }
    }
    getFactory(ctor) {
        return (...args) => {
            return new ctor(this._context, ...args);
        };
    }
    /**
     * @description Gets an object containing the version of Taquito library and git sha of the commit this library is compiled from
     */
    getVersionInfo() {
        return VERSION;
    }
}

export { BatchOperation, BigMapAbstraction, ChainIds, CompositeForger, Context, ContractAbstraction, ContractMethod, ContractMethodObject, ContractView, DEFAULT_FEE, DEFAULT_GAS_LIMIT, DEFAULT_SMART_CONTRACT_METHOD_NAME, DEFAULT_STORAGE_LIMIT, DefaultGlobalConstantsProvider, DefaultLambdaAddresses, DelegateOperation, DelegationWalletOperation, GlobalConstantNotFound, InvalidCodeParameter, InvalidDelegationSource, InvalidInitParameter, InvalidParameterError, InvalidViewParameterError, InvalidViewSimulationContext, LegacyWalletProvider, MANAGER_LAMBDA, MichelCodecPacker, MichelCodecParser, MissedBlockDuringConfirmationError, NoopParser, ObservableSubscription, Operation, OperationBatch, OriginationOperation, OriginationWalletOperation, PollingSubscribeProvider, Protocols, RpcForger, RpcPacker, TezosOperationError, TezosPreapplyFailureError, TezosToolkit, TransactionOperation, TransactionWalletOperation, UnconfiguredGlobalConstantsProviderError, UndefinedLambdaContractError, VIEW_LAMBDA, ViewSimulationError, Wallet, WalletOperation, WalletOperationBatch, compose, createOriginationOperation, createRegisterDelegateOperation, createRegisterGlobalConstantOperation, createRevealOperation, createSetDelegateOperation, createTransferOperation, defaultConfigConfirmation, defaultConfigStreamer, protocols, validateAndExtractFailwith };
//# sourceMappingURL=taquito.es6.js.map
