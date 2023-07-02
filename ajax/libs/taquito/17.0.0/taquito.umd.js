(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@taquito/rpc'), require('@taquito/http-utils'), require('rxjs'), require('rxjs/operators'), require('@taquito/michelson-encoder'), require('@taquito/utils'), require('bignumber.js'), require('@taquito/core'), require('@taquito/michel-codec'), require('@taquito/local-forging')) :
    typeof define === 'function' && define.amd ? define(['exports', '@taquito/rpc', '@taquito/http-utils', 'rxjs', 'rxjs/operators', '@taquito/michelson-encoder', '@taquito/utils', 'bignumber.js', '@taquito/core', '@taquito/michel-codec', '@taquito/local-forging'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.taquito = {}, global.rpc, global.httpUtils, global.rxjs, global.operators, global.michelsonEncoder, global.utils, global.BigNumber, global.core, global.michelCodec, global.localForging));
})(this, (function (exports, rpc, httpUtils, rxjs, operators, michelsonEncoder, utils, BigNumber, core, michelCodec, localForging) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);

    /******************************************************************************
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

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    function formatErrorMessage(error, stringToReplace) {
        const body = JSON.parse(error.body);
        if (body[0] && body[0].kind && body[0].msg) {
            const newBody = JSON.stringify({
                kind: body[0].kind,
                id: body[0].id,
                msg: body[0].msg.replace(stringToReplace, ''),
            });
            return new httpUtils.HttpResponseError(`Http error response: (${error.status}) ${newBody}`, error.status, error.statusText, newBody, error.url);
        }
        else {
            return error;
        }
    }

    class RpcInjector {
        constructor(context) {
            this.context = context;
        }
        inject(signedOperationBytes) {
            return __awaiter(this, void 0, void 0, function* () {
                let hash;
                try {
                    hash = yield this.context.rpc.injectOperation(signedOperationBytes);
                }
                catch (error) {
                    const stringToStrip = '. You may want to use --replace to provide adequate fee and replace it';
                    if (error instanceof httpUtils.HttpResponseError && error.message.includes(stringToStrip)) {
                        throw formatErrorMessage(error, stringToStrip);
                    }
                    else {
                        throw error;
                    }
                }
                return hash;
            });
        }
    }

    /**
     *  @category Error
     *  @description Error that indicates the signer has been unconfigured in the TezosToolkit instance
     */
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

    function createObservableFromSubscription(sub) {
        return new rxjs.Observable((subscriber) => {
            sub.on('data', (data) => {
                subscriber.next(data);
            });
            sub.on('error', (error) => {
                subscriber.error(error);
            });
            sub.on('close', () => {
                subscriber.complete();
            });
            return () => {
                sub.close();
            };
        });
    }

    exports.DEFAULT_GAS_LIMIT = void 0;
    (function (DEFAULT_GAS_LIMIT) {
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["DELEGATION"] = 10600] = "DELEGATION";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["ORIGINATION"] = 10600] = "ORIGINATION";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["TRANSFER"] = 10600] = "TRANSFER";
        /* This is used for gas_limit. There is no harm in setting a higher limit.
         Only if an account has a balance that is very close to the total gas consumption,
         then this margin can fail the operation.
         Another benefit of this higher value is that then Dapps build with Taquito 17 can
         still work with Mumbainet, as this value is higher than the reveal cost in Mumbai.
        */
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL_TZ1"] = 2000] = "REVEAL_TZ1";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL_TZ2"] = 2000] = "REVEAL_TZ2";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL_TZ3"] = 2000] = "REVEAL_TZ3";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL_TZ4"] = 2000] = "REVEAL_TZ4";
    })(exports.DEFAULT_GAS_LIMIT || (exports.DEFAULT_GAS_LIMIT = {}));
    exports.DEFAULT_FEE = void 0;
    (function (DEFAULT_FEE) {
        DEFAULT_FEE[DEFAULT_FEE["DELEGATION"] = 1257] = "DELEGATION";
        DEFAULT_FEE[DEFAULT_FEE["ORIGINATION"] = 10000] = "ORIGINATION";
        DEFAULT_FEE[DEFAULT_FEE["TRANSFER"] = 10000] = "TRANSFER";
        DEFAULT_FEE[DEFAULT_FEE["REVEAL"] = 374] = "REVEAL";
    })(exports.DEFAULT_FEE || (exports.DEFAULT_FEE = {}));
    exports.DEFAULT_STORAGE_LIMIT = void 0;
    (function (DEFAULT_STORAGE_LIMIT) {
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["DELEGATION"] = 0] = "DELEGATION";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["ORIGINATION"] = 257] = "ORIGINATION";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["TRANSFER"] = 257] = "TRANSFER";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["REVEAL"] = 0] = "REVEAL";
    })(exports.DEFAULT_STORAGE_LIMIT || (exports.DEFAULT_STORAGE_LIMIT = {}));
    const COST_PER_BYTE = 250;
    exports.Protocols = void 0;
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
        Protocols["PtJakart2"] = "PtJakart2xVj7pYXJBXrqHgd82rdkLey5ZeeGwDgPp9rhQUbSqY";
        Protocols["PtKathman"] = "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg";
        Protocols["PtLimaPtL"] = "PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW";
        Protocols["PtMumbaii"] = "PtMumbaiiFFEGbew1rRjzSPyzRbA51Tm3RVZL5suHPxSZYDhCEc";
        Protocols["PtMumbai2"] = "PtMumbai2TmsJHNGRkD8v8YDbtao7BLUC3wjASn1inAKLFCjaH1";
        Protocols["PtNairobi"] = "PtNairobiyssHuh87hEhfVBGCVrK3WnS8Z2FT4ymB5tAa4r1nQf";
        Protocols["ProtoALpha"] = "ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK";
    })(exports.Protocols || (exports.Protocols = {}));
    const protocols = {
        '004': [exports.Protocols.Pt24m4xi],
        '005': [exports.Protocols.PsBABY5H, exports.Protocols.PsBabyM1],
        '006': [exports.Protocols.PsCARTHA],
        '007': [exports.Protocols.PsDELPH1],
        '008': [exports.Protocols.PtEdo2Zk],
        '009': [exports.Protocols.PsFLorena],
        '010': [exports.Protocols.PtGRANADs],
        '011': [exports.Protocols.PtHangz2],
        '012': [exports.Protocols.PsiThaCa, exports.Protocols.Psithaca2],
        '013': [exports.Protocols.PtJakart2],
        '014': [exports.Protocols.PtKathman],
        '015': [exports.Protocols.PtLimaPtL],
        '016': [exports.Protocols.PtMumbai2],
        '017': [exports.Protocols.PtNairobi],
        '018': [exports.Protocols.ProtoALpha],
    };
    exports.ChainIds = void 0;
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
        ChainIds["JAKARTANET2"] = "NetXLH1uAxK7CCh";
        ChainIds["KATHMANDUNET"] = "NetXazhm4yetmff";
        ChainIds["LIMANET"] = "NetXizpkH94bocH";
        ChainIds["MUMBAINET"] = "NetXQw6nWSnrJ5t";
        ChainIds["MUMBAINET2"] = "NetXgbcrNtXD2yA";
        ChainIds["NAIROBINET"] = "NetXyuzvDo2Ugzb";
    })(exports.ChainIds || (exports.ChainIds = {}));
    const getRevealGasLimit = (address) => Math.round((getRevealGasLimitInternal(address) * 11) / 10);
    const getRevealGasLimitInternal = (address) => {
        switch (address.substring(0, 3)) {
            case 'tz1':
                return exports.DEFAULT_GAS_LIMIT.REVEAL_TZ1;
            case 'tz2':
                return exports.DEFAULT_GAS_LIMIT.REVEAL_TZ2;
            case 'tz3':
                return exports.DEFAULT_GAS_LIMIT.REVEAL_TZ3;
            case 'tz4':
                return exports.DEFAULT_GAS_LIMIT.REVEAL_TZ4;
            default:
                throw new Error(`Cannot estimate reveal gas limit for ${address}`);
        }
    };

    /**
     *  @category Error
     *  @description Error that indicates invalid smart contract parameters being passed or used
     */
    class InvalidParameterError extends Error {
        constructor(smartContractMethodName, sigs, args) {
            super(`${smartContractMethodName} Received ${args.length} arguments while expecting one of the following signatures (${JSON.stringify(sigs)})`);
            this.smartContractMethodName = smartContractMethodName;
            this.sigs = sigs;
            this.args = args;
            this.name = 'Invalid parameters error';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates an invalid delegation source contract address being passed or used
     */
    class InvalidDelegationSource extends Error {
        constructor(source) {
            super(`Since Babylon delegation source can no longer be a contract address ${source}. Please use the smart contract abstraction to set your delegate.`);
            this.source = source;
            this.name = 'Invalid delegation source error';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates an invalid smart contract code parameter being passed or used
     */
    class InvalidCodeParameter extends Error {
        constructor(message, data) {
            super(message);
            this.message = message;
            this.data = data;
            this.name = 'InvalidCodeParameter';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates invalid smart contract init parameter being passed or used
     */
    class InvalidInitParameter extends Error {
        constructor(message, data) {
            super(message);
            this.message = message;
            this.data = data;
            this.name = 'InvalidInitParameter';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates a failure when conducting a view simulation
     */
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
    /**
     *  @category Error
     *  @description Error that indicates invalid or unconfigured context when executing a view
     */
    class InvalidViewSimulationContext extends Error {
        constructor(info) {
            super(`${info} Please configure the context of the view execution in the executeView method.`);
            this.info = info;
            this.name = 'InvalidViewSimulationContext';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates a mistake happening during the reveal operation
     */
    class RevealOperationError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'RevealOperationError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates a mistake in the parameters in the preparation of an Origination operation
     */
    class OriginationParameterError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'OriginationParameterError';
        }
    }
    class IntegerError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'IntegerError';
        }
    }

    const createActivationOperation = ({ pkh, secret }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.ACTIVATION,
            pkh,
            secret,
        };
    });
    const createOriginationOperation = ({ code, init, balance = '0', delegate, storage, fee = exports.DEFAULT_FEE.ORIGINATION, gasLimit = exports.DEFAULT_GAS_LIMIT.ORIGINATION, storageLimit = exports.DEFAULT_STORAGE_LIMIT.ORIGINATION, mutez = false, }) => __awaiter(void 0, void 0, void 0, function* () {
        if (storage !== undefined && init !== undefined) {
            throw new OriginationParameterError('Storage and Init cannot be set a the same time. Please either use storage or init but not both.');
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
            const schema = new michelsonEncoder.Schema(storageType.args[0]); // TODO
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
        if (isNaN(Number(balance))) {
            throw new IntegerError(`Unexpected Invalid Integer ${balance}`);
        }
        const operation = {
            kind: rpc.OpKind.ORIGINATION,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            balance: mutez ? balance.toString() : utils.format('tz', 'mutez', balance).toString(),
            script,
        };
        if (delegate) {
            operation.delegate = delegate;
        }
        return operation;
    });
    const createTransferOperation = ({ to, amount, parameter, fee = exports.DEFAULT_FEE.TRANSFER, gasLimit = exports.DEFAULT_GAS_LIMIT.TRANSFER, storageLimit = exports.DEFAULT_STORAGE_LIMIT.TRANSFER, mutez = false, }) => __awaiter(void 0, void 0, void 0, function* () {
        const operation = {
            kind: rpc.OpKind.TRANSACTION,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            amount: mutez ? amount.toString() : utils.format('tz', 'mutez', amount).toString(),
            destination: to,
            parameters: parameter,
        };
        return operation;
    });
    const createSetDelegateOperation = ({ delegate, source, fee = exports.DEFAULT_FEE.DELEGATION, gasLimit = exports.DEFAULT_GAS_LIMIT.DELEGATION, storageLimit = exports.DEFAULT_STORAGE_LIMIT.DELEGATION, }) => __awaiter(void 0, void 0, void 0, function* () {
        const operation = {
            kind: rpc.OpKind.DELEGATION,
            source,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            delegate,
        };
        return operation;
    });
    const createRegisterDelegateOperation = ({ fee = exports.DEFAULT_FEE.DELEGATION, gasLimit = exports.DEFAULT_GAS_LIMIT.DELEGATION, storageLimit = exports.DEFAULT_STORAGE_LIMIT.DELEGATION, }, source) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.DELEGATION,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            delegate: source,
        };
    });
    const createRevealOperation = ({ fee = exports.DEFAULT_FEE.REVEAL, gasLimit = undefined, storageLimit = exports.DEFAULT_STORAGE_LIMIT.REVEAL, }, source, publicKey) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.REVEAL,
            fee,
            public_key: publicKey,
            source,
            gas_limit: gasLimit !== null && gasLimit !== void 0 ? gasLimit : getRevealGasLimit(source),
            storage_limit: storageLimit,
        };
    });
    const createRegisterGlobalConstantOperation = ({ value, source, fee, gasLimit, storageLimit, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.REGISTER_GLOBAL_CONSTANT,
            value,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            source,
        };
    });
    const createTransferTicketOperation = ({ ticketContents, ticketTy, ticketTicketer, ticketAmount, destination, entrypoint, source, fee, gasLimit, storageLimit, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.TRANSFER_TICKET,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            source,
            ticket_contents: ticketContents,
            ticket_ty: ticketTy,
            ticket_ticketer: ticketTicketer,
            ticket_amount: ticketAmount,
            destination,
            entrypoint,
        };
    });
    const createIncreasePaidStorageOperation = ({ source, fee, gasLimit, storageLimit, amount, destination, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.INCREASE_PAID_STORAGE,
            source,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            amount,
            destination,
        };
    });
    const createDrainDelegateOperation = ({ consensus_key, delegate, destination, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.DRAIN_DELEGATE,
            consensus_key,
            delegate,
            destination,
        };
    });
    const createBallotOperation = ({ source, proposal, ballot }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.BALLOT,
            source,
            proposal,
            ballot,
        };
    });
    const createProposalsOperation = ({ source, proposals }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.PROPOSALS,
            source,
            proposals,
        };
    });
    const createUpdateConsensusKeyOperation = ({ source, fee, gasLimit, storageLimit, pk, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.UPDATE_CONSENSUS_KEY,
            source,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            pk,
        };
    });
    const createSmartRollupAddMessagesOperation = ({ source, fee, gasLimit, storageLimit, message, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES,
            source,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            message,
        };
    });
    const createSmartRollupOriginateOperation = ({ source, fee, gasLimit, storageLimit, pvmKind, kernel, originationProof, parametersType, }) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            kind: rpc.OpKind.SMART_ROLLUP_ORIGINATE,
            source,
            fee,
            gas_limit: gasLimit,
            storage_limit: storageLimit,
            pvm_kind: pvmKind,
            kernel,
            origination_proof: originationProof,
            parameters_ty: parametersType,
        };
    });

    const attachKind = (op, kind) => {
        return Object.assign(Object.assign({}, op), { kind });
    };
    const findWithKind = (arr, kind) => {
        if (Array.isArray(arr)) {
            const found = arr.find((op) => op.kind === kind);
            if (found && isKind(found, kind)) {
                return found;
            }
        }
    };
    const isKind = (op, kind) => {
        return op.kind === kind;
    };
    const isOpWithFee = (op) => {
        return ([
            'transaction',
            'delegation',
            'origination',
            'reveal',
            'register_global_constant',
            'increase_paid_storage',
            'tx_rollup_origination',
            'tx_rollup_submit_batch',
            'transfer_ticket',
            'update_consensus_key',
            'smart_rollup_add_messages',
            'smart_rollup_originate',
        ].indexOf(op.kind) !== -1);
    };
    const isOpRequireReveal = (op) => {
        return ([
            'transaction',
            'delegation',
            'origination',
            'register_global_constant',
            'increase_paid_storage',
            'tx_rollup_origination',
            'tx_rollup_submit_batch',
            'transfer_ticket',
            'update_consensus_key',
            'smart_rollup_add_messages',
            'smart_rollup_originate',
        ].indexOf(op.kind) !== -1);
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
    /**
     *  @category Error
     *  @description Generic tezos error that will be thrown when a mistake occurs when doing an operation; more details here https://tezos.gitlab.io/api/errors.html
     */
    class TezosOperationError extends Error {
        constructor(errors, errorDetails) {
            super();
            this.errors = errors;
            this.errorDetails = errorDetails;
            this.name = 'TezosOperationError';
            // Last error is 'often' the one with more detail
            const lastError = errors[errors.length - 1];
            this.id = lastError.id;
            this.kind = lastError.kind;
            this.message = `(${this.kind}) ${this.id}`;
            if (isErrorWithMessage(lastError)) {
                if (lastError.with.string) {
                    this.message = lastError.with.string;
                }
                else if (lastError.with.int) {
                    this.message = lastError.with.int;
                }
                else {
                    this.message = JSON.stringify(lastError.with);
                }
            }
        }
    }
    /**
     *  @category Error
     *  @description Tezos error that will be thrown when a mistake happens during the preapply stage
     */
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
     *  @category Error
     *  @description Error that indicates a general failure happening during an origination operation
     */
    class OriginationOperationError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'OriginationOperationError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates an invalid estimate value being passed
     */
    class InvalidEstimateValueError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'InvalidEstimateValueError';
        }
    }

    /**
     *  @category Error
     *  @description Error that indicates invalid confirmation count has been passed or configured
     */
    class InvalidConfirmationCountError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'InvalidConfirmationCountError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates undefined confirmation has not been specified or configured
     */
    class ConfirmationUndefinedError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'ConfirmationUndefinedError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates an invalid filter expression being passed or used
     */
    class InvalidFilterExpressionError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'InvalidFilterExpressionError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates an error being returned from the RPC response
     */
    class RPCResponseError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'RPCResponseError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates invalid Preparation parameters being passed
     */
    class PublicKeyNotFoundError extends Error {
        constructor() {
            super(`Unable to retrieve public key from signer. If you are using a wallet, make sure your account is revealed`);
            this.name = 'PublicKeyNotFoundError';
        }
    }

    /**
     * @description Utility class to interact with Tezos operations
     */
    class Operation {
        /**
         *
         * @param hash Operation hash
         * @param raw Raw operation that was injected
         * @param context Taquito context allowing access to rpc and signer
         * @throws {@link InvalidOperationHashError}
         */
        constructor(hash, raw, results, context) {
            this.hash = hash;
            this.raw = raw;
            this.results = results;
            this.context = context;
            this._pollingConfig$ = new rxjs.ReplaySubject(1);
            this.currentHead$ = this._pollingConfig$.pipe(operators.switchMap((config) => {
                return new rxjs.BehaviorSubject(config).pipe(operators.timeoutWith(config.timeout * 1000, rxjs.throwError(new Error('Confirmation polling timed out'))));
            }), operators.switchMap(() => {
                return rxjs.defer(() => createObservableFromSubscription(this.context.stream.subscribeBlock('head'))).pipe(operators.switchMap((newHead) => {
                    var _a, _b;
                    const prevHead = (_b = (_a = this.lastHead) === null || _a === void 0 ? void 0 : _a.header.level) !== null && _b !== void 0 ? _b : newHead.header.level - 1;
                    return rxjs.range(prevHead + 1, newHead.header.level - prevHead - 1).pipe(operators.concatMap((level) => this.context.readProvider.getBlock(level)), operators.endWith(newHead));
                }), operators.tap((newHead) => (this.lastHead = newHead)));
            }), operators.shareReplay({ refCount: true }));
            // Observable that emit once operation is seen in a block
            this.confirmed$ = this.currentHead$.pipe(operators.map((head) => {
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
            }), operators.filter((x) => x !== undefined), operators.first(), operators.shareReplay());
            this._foundAt = Number.POSITIVE_INFINITY;
            if (utils.validateOperation(this.hash) !== utils.ValidationResult.VALID) {
                throw new core.InvalidOperationHashError(this.hash);
            }
            this.confirmed$
                .pipe(operators.first(), operators.catchError(() => {
                return rxjs.of(rxjs.EMPTY);
            }))
                .subscribe();
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
         * @param timeout [180] Timeout
         */
        confirmation(confirmations, timeout) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof confirmations !== 'undefined' && confirmations < 1) {
                    throw new InvalidConfirmationCountError('Confirmation count must be at least 1');
                }
                const { defaultConfirmationCount, confirmationPollingTimeoutSecond } = this.context.config;
                this._pollingConfig$.next({
                    timeout: timeout || confirmationPollingTimeoutSecond,
                });
                const conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
                return new Promise((resolve, reject) => {
                    this.confirmed$
                        .pipe(operators.switchMap(() => this.currentHead$), operators.filter((head) => head.header.level - this._foundAt >= conf - 1), operators.first())
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
        getOriginatedContractAddresses() {
            const originationOpResults = this.results.filter((x) => x.kind === 'origination');
            let addresses = [];
            for (const res of originationOpResults) {
                if (res.metadata.operation_result.originated_contracts) {
                    addresses = [...addresses, ...res.metadata.operation_result.originated_contracts];
                }
            }
            return addresses;
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
            BigNumber__default["default"].config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber__default["default"].ROUND_UP });
            return new BigNumber__default["default"](this.consumedMilliGas).dividedBy(1000).toString();
        }
        get consumedMilliGas() {
            return String(this.sumProp(flattenOperationResult({ contents: this.results }), 'consumed_milligas'));
        }
        get storageDiff() {
            return String(this.sumProp(flattenOperationResult({ contents: this.results }), 'paid_storage_size_diff'));
        }
        get errors() {
            return flattenErrors({ contents: this.results });
        }
    }

    class Provider {
        constructor(context) {
            this.context = context;
        }
        get rpc() {
            return this.context.rpc;
        }
        get signer() {
            return this.context.signer;
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
        estimate(_a, estimator) {
            var { fee, gasLimit, storageLimit } = _a, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                let calculatedFee = fee;
                let calculatedGas = gasLimit;
                let calculatedStorage = storageLimit;
                if (calculatedFee && calculatedFee % 1 !== 0) {
                    throw new InvalidEstimateValueError(`Fee value must not be a decimal: ${calculatedFee}`);
                }
                if (calculatedGas && calculatedGas % 1 !== 0) {
                    throw new InvalidEstimateValueError(`Gas Limit value must not be a decimal: ${calculatedGas}`);
                }
                if (calculatedStorage && calculatedStorage % 1 !== 0) {
                    throw new InvalidEstimateValueError(`Storage Limit value must not be a decimal: ${calculatedStorage}`);
                }
                if (fee === undefined || gasLimit === undefined || storageLimit === undefined) {
                    const estimation = yield estimator(Object.assign({ fee, gasLimit, storageLimit }, rest));
                    calculatedFee !== null && calculatedFee !== void 0 ? calculatedFee : (calculatedFee = estimation.suggestedFeeMutez);
                    calculatedGas !== null && calculatedGas !== void 0 ? calculatedGas : (calculatedGas = estimation.gasLimit);
                    calculatedStorage !== null && calculatedStorage !== void 0 ? calculatedStorage : (calculatedStorage = estimation.storageLimit);
                }
                return {
                    fee: calculatedFee,
                    gasLimit: calculatedGas,
                    storageLimit: calculatedStorage,
                };
            });
        }
        getRPCOp(param) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (param.kind) {
                    case rpc.OpKind.TRANSACTION:
                        return createTransferOperation(Object.assign({}, param));
                    case rpc.OpKind.ORIGINATION:
                        return createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign({}, param)));
                    case rpc.OpKind.DELEGATION:
                        return createSetDelegateOperation(Object.assign({}, param));
                    case rpc.OpKind.REGISTER_GLOBAL_CONSTANT:
                        return createRegisterGlobalConstantOperation(Object.assign({}, param));
                    case rpc.OpKind.INCREASE_PAID_STORAGE:
                        return createIncreasePaidStorageOperation(Object.assign({}, param));
                    case rpc.OpKind.TRANSFER_TICKET:
                        return createTransferTicketOperation(Object.assign({}, param));
                    case rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES:
                        return createSmartRollupAddMessagesOperation(Object.assign({}, param));
                    case rpc.OpKind.SMART_ROLLUP_ORIGINATE:
                        return createSmartRollupOriginateOperation(Object.assign({}, param));
                    default:
                        throw new utils.InvalidOperationKindError(param.kind);
                }
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
        isRevealOpNeeded(op, pkh) {
            return __awaiter(this, void 0, void 0, function* () {
                return !(yield this.isAccountRevealRequired(pkh)) || !this.isRevealRequiredForOpType(op)
                    ? false
                    : true;
            });
        }
        isAccountRevealRequired(publicKeyHash) {
            return __awaiter(this, void 0, void 0, function* () {
                return !(yield this.context.readProvider.isAccountRevealed(publicKeyHash, 'head'));
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
                    throw new TezosOperationError(errors, 'Error occurred during validation simulation of operation');
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
            const toValidation = utils.validateAddress(params.to);
            if (toValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.to, utils.invalidDetail(toValidation));
            }
            this.operations.push(Object.assign({ kind: rpc.OpKind.TRANSACTION }, params));
            return this;
        }
        /**
         *
         * @description Add a contract call to the batch
         *
         * @param params Call a contract method
         * @param options Generic operation parameters
         */
        withContractCall(params, options = {}) {
            return this.withTransfer(params.toTransferParams(options));
        }
        /**
         *
         * @description Add a delegation operation to the batch
         *
         * @param params Delegation operation parameter
         */
        withDelegation(params) {
            var _a;
            const delegateValidation = utils.validateAddress((_a = params.delegate) !== null && _a !== void 0 ? _a : '');
            if (params.delegate && delegateValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.delegate, utils.invalidDetail(delegateValidation));
            }
            this.operations.push(Object.assign({ kind: rpc.OpKind.DELEGATION }, params));
            return this;
        }
        /**
         *
         * @description Add an origination operation to the batch
         *
         * @param params Origination operation parameter
         */
        withOrigination(params) {
            this.operations.push(Object.assign({ kind: rpc.OpKind.ORIGINATION }, params));
            return this;
        }
        /**
         *
         * @description Add an IncreasePaidStorage operation to the batch
         *
         * @param param IncreasePaidStorage operation parameter
         */
        withIncreasePaidStorage(params) {
            const destinationValidation = utils.validateAddress(params.destination);
            if (destinationValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.destination, utils.invalidDetail(destinationValidation));
            }
            this.operations.push(Object.assign({ kind: rpc.OpKind.INCREASE_PAID_STORAGE }, params));
            return this;
        }
        mapOperation(param) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (param.kind) {
                    case rpc.OpKind.TRANSACTION:
                        return this.walletProvider.mapTransferParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return param; }));
                    case rpc.OpKind.ORIGINATION:
                        return this.walletProvider.mapOriginateParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () {
                            return this.context.parser.prepareCodeOrigination(Object.assign({}, param));
                        }));
                    case rpc.OpKind.DELEGATION:
                        return this.walletProvider.mapDelegateParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return param; }));
                    case rpc.OpKind.INCREASE_PAID_STORAGE:
                        return this.walletProvider.mapIncreasePaidStorageWalletParams(() => __awaiter(this, void 0, void 0, function* () { return param; }));
                    default:
                        throw new core.InvalidOperationKindError(JSON.stringify(param.kind));
                }
            });
        }
        /**
         *
         * @description Add a group operation to the batch. Operation will be applied in the order they are in the params array
         *
         * @param params Operations parameter
         * @throws {@link InvalidOperationKindError}
         */
        with(params) {
            for (const param of params) {
                switch (param.kind) {
                    case rpc.OpKind.TRANSACTION:
                        this.withTransfer(param);
                        break;
                    case rpc.OpKind.ORIGINATION:
                        this.withOrigination(param);
                        break;
                    case rpc.OpKind.DELEGATION:
                        this.withDelegation(param);
                        break;
                    case rpc.OpKind.INCREASE_PAID_STORAGE:
                        this.withIncreasePaidStorage(param);
                        break;
                    default:
                        throw new core.InvalidOperationKindError(JSON.stringify(param.kind));
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
            var _a;
            const delegateValidation = utils.validateAddress((_a = params.delegate) !== null && _a !== void 0 ? _a : '');
            if (params.delegate && delegateValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.delegate, utils.invalidDetail(delegateValidation));
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
            const toValidation = utils.validateAddress(params.to);
            if (toValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.to, utils.invalidDetail(toValidation));
            }
            return this.walletCommand(() => __awaiter(this, void 0, void 0, function* () {
                const mappedParams = yield this.walletProvider.mapTransferParamsToWalletParams(() => __awaiter(this, void 0, void 0, function* () { return params; }));
                const opHash = yield this.walletProvider.sendOperations([mappedParams]);
                return this.context.operationFactory.createTransactionOperation(opHash);
            }));
        }
        /**
         *
         * @description
         *
         * @returns
         *
         * @param params
         */
        increasePaidStorage(params) {
            const destinationValidation = utils.validateAddress(params.destination);
            if (destinationValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.destination, utils.invalidDetail(destinationValidation));
            }
            return this.walletCommand(() => __awaiter(this, void 0, void 0, function* () {
                const mappedParams = yield this.walletProvider.mapIncreasePaidStorageWalletParams(() => __awaiter(this, void 0, void 0, function* () { return params; }));
                const opHash = yield this.walletProvider.sendOperations([mappedParams]);
                return this.context.operationFactory.createIncreasePaidStorageOperation(opHash);
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
         * @throws {@link InvalidContractAddressError} If the contract address is not valid
         */
        at(address, contractAbstractionComposer = (x) => x) {
            return __awaiter(this, void 0, void 0, function* () {
                const addressValidation = utils.validateContractAddress(address);
                if (addressValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidContractAddressError(address, utils.invalidDetail(addressValidation));
                }
                const rpc = this.context.withExtensions().rpc;
                const readProvider = this.context.withExtensions().readProvider;
                const script = yield readProvider.getScript(address, 'head');
                const entrypoints = yield readProvider.getEntrypoints(address);
                const abs = new ContractAbstraction(address, script, this, this.context.contract, entrypoints, rpc, readProvider);
                return contractAbstractionComposer(abs, this.context);
            });
        }
    }

    const receiptFromOperation = (op, { ALLOCATION_BURN, ORIGINATION_BURN } = {
        ALLOCATION_BURN: 257,
        ORIGINATION_BURN: 257,
    }) => {
        BigNumber__default["default"].config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber__default["default"].ROUND_UP });
        const operationResults = flattenOperationResult({ contents: op });
        let totalMilliGas = new BigNumber__default["default"](0);
        let totalStorage = new BigNumber__default["default"](0);
        let totalFee = new BigNumber__default["default"](0);
        let totalOriginationBurn = new BigNumber__default["default"](0);
        let totalAllocationBurn = new BigNumber__default["default"](0);
        let totalPaidStorageDiff = new BigNumber__default["default"](0);
        operationResults.forEach((result) => {
            totalFee = totalFee.plus(result.fee || 0);
            totalOriginationBurn = totalOriginationBurn.plus(Array.isArray(result.originated_contracts)
                ? result.originated_contracts.length * ORIGINATION_BURN
                : 0);
            totalAllocationBurn = totalAllocationBurn.plus('allocated_destination_contract' in result ? ALLOCATION_BURN : 0);
            totalMilliGas = totalMilliGas.plus(result.consumed_milligas || 0);
            totalPaidStorageDiff = totalPaidStorageDiff.plus('paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0);
        });
        totalStorage = totalStorage
            .plus(totalAllocationBurn)
            .plus(totalOriginationBurn)
            .plus(totalPaidStorageDiff);
        return {
            totalFee,
            totalMilliGas,
            totalGas: totalMilliGas.dividedBy(1000),
            totalStorage,
            totalAllocationBurn,
            totalOriginationBurn,
            totalPaidStorageDiff,
            totalStorageBurn: new BigNumber__default["default"](totalStorage.multipliedBy(COST_PER_BYTE)),
        };
    };

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
         * @throws {InvalidOperationHashError}
         */
        constructor(opHash, context, _newHead$) {
            this.opHash = opHash;
            this.context = context;
            this._newHead$ = _newHead$;
            this._operationResult = new rxjs.ReplaySubject(1);
            this._includedInBlock = new rxjs.ReplaySubject(1);
            this._included = false;
            this.newHead$ = this._newHead$.pipe(operators.switchMap((newHead) => {
                var _a, _b;
                const prevHead = (_b = (_a = this.lastHead) === null || _a === void 0 ? void 0 : _a.header.level) !== null && _b !== void 0 ? _b : newHead.header.level - 1;
                return rxjs.range(prevHead + 1, newHead.header.level - prevHead - 1).pipe(operators.concatMap((level) => this.context.readProvider.getBlock(level)), operators.endWith(newHead));
            }), operators.tap((newHead) => (this.lastHead = newHead)), operators.publishReplay(1), operators.refCount());
            // Observable that emit once operation is seen in a block
            this.confirmed$ = this.newHead$.pipe(operators.map((head) => {
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
            }), operators.filter((x) => {
                return typeof x !== 'undefined';
            }), operators.first(), operators.publishReplay(1), operators.refCount());
            if (utils.validateOperation(this.opHash) !== utils.ValidationResult.VALID) {
                throw new core.InvalidOperationHashError(this.opHash);
            }
            this.confirmed$
                .pipe(operators.first(), operators.catchError(() => rxjs.of(undefined)))
                .subscribe();
        }
        operationResults() {
            return __awaiter(this, void 0, void 0, function* () {
                return this._operationResult.pipe(operators.first()).toPromise();
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
                return rxjs.combineLatest([this._includedInBlock, rxjs.from(this.context.readProvider.getBlock('head'))])
                    .pipe(operators.map(([foundAtBlock, head]) => {
                    return head.header.level - foundAtBlock.header.level + 1;
                }), operators.first())
                    .toPromise();
            });
        }
        isInCurrentBranch(tipBlockIdentifier = 'head') {
            return __awaiter(this, void 0, void 0, function* () {
                // By default it is assumed that the operation is in the current branch
                if (!this._included) {
                    return true;
                }
                const tipBlockHeaderLevel = yield this.context.readProvider.getBlockLevel(tipBlockIdentifier);
                const inclusionBlock = yield this._includedInBlock.pipe(operators.first()).toPromise();
                const levelDiff = tipBlockHeaderLevel - inclusionBlock.header.level;
                // Block produced before the operation is included are assumed to be part of the current branch
                if (levelDiff <= 0) {
                    return true;
                }
                const tipBlockLevel = Math.min(inclusionBlock.header.level + levelDiff, inclusionBlock.header.level + MAX_BRANCH_ANCESTORS);
                const blocks = new Set(yield this.context.readProvider.getLiveBlocks(tipBlockLevel));
                return blocks.has(inclusionBlock.hash);
            });
        }
        confirmationObservable(confirmations) {
            if (typeof confirmations !== 'undefined' && confirmations < 1) {
                throw new InvalidConfirmationCountError('Confirmation count must be at least 1');
            }
            const { defaultConfirmationCount } = this.context.config;
            const conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
            if (conf === undefined) {
                throw new ConfirmationUndefinedError('Default confirmation count can not be undefined!');
            }
            return rxjs.combineLatest([this._includedInBlock, this.newHead$]).pipe(operators.distinctUntilChanged(([, previousHead], [, newHead]) => {
                return previousHead.hash === newHead.hash;
            }), operators.map(([foundAtBlock, head]) => {
                return {
                    block: head,
                    expectedConfirmation: conf,
                    currentConfirmation: head.header.level - foundAtBlock.header.level + 1,
                    completed: head.header.level - foundAtBlock.header.level >= conf - 1,
                    isInCurrentBranch: () => this.isInCurrentBranch(head.hash),
                };
            }), operators.takeWhile(({ completed }) => !completed, true));
        }
        /**
         *
         * @param confirmations [0] Number of confirmation to wait for
         */
        confirmation(confirmations) {
            return this.confirmationObservable(confirmations).toPromise();
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
                return operationResult.find(x => x.kind === rpc.OpKind.REVEAL);
            });
        }
        transactionOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return operationResult.find(x => x.kind === rpc.OpKind.TRANSACTION);
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

    class OriginationWalletOperation extends WalletOperation {
        constructor(opHash, context, newHead$) {
            super(opHash, context, newHead$);
            this.opHash = opHash;
            this.context = context;
        }
        originationOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return findWithKind(operationResult, rpc.OpKind.ORIGINATION);
            });
        }
        revealOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return findWithKind(operationResult, rpc.OpKind.REVEAL);
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

    class DelegationWalletOperation extends WalletOperation {
        constructor(opHash, context, newHead$) {
            super(opHash, context, newHead$);
            this.opHash = opHash;
            this.context = context;
        }
        revealOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return operationResult.find((x) => x.kind === rpc.OpKind.REVEAL);
            });
        }
        delegationOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return operationResult.find((x) => x.kind === rpc.OpKind.DELEGATION);
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
                return attachKind(yield params(), rpc.OpKind.TRANSACTION);
            });
        }
        mapOriginateParamsToWalletParams(params) {
            return __awaiter(this, void 0, void 0, function* () {
                return attachKind(yield params(), rpc.OpKind.ORIGINATION);
            });
        }
        mapDelegateParamsToWalletParams(params) {
            return __awaiter(this, void 0, void 0, function* () {
                return attachKind(yield params(), rpc.OpKind.DELEGATION);
            });
        }
        mapIncreasePaidStorageWalletParams(params) {
            return __awaiter(this, void 0, void 0, function* () {
                return attachKind(yield params(), rpc.OpKind.INCREASE_PAID_STORAGE);
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

    class OnChainView {
        constructor(_rpc, _readProvider, _contractAddress, _smartContractViewSchema, _contractStorageType, _args = 'Unit') {
            this._rpc = _rpc;
            this._readProvider = _readProvider;
            this._contractAddress = _contractAddress;
            this._smartContractViewSchema = _smartContractViewSchema;
            this._contractStorageType = _contractStorageType;
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
                const chainId = yield this._readProvider.getChainId();
                const viewArgs = this.transformArgsToMichelson();
                const scriptView = {
                    contract: this._contractAddress,
                    view: this._smartContractViewSchema.viewName,
                    input: viewArgs,
                    chain_id: chainId,
                    source: executionContext.viewCaller,
                };
                if (executionContext.source) {
                    scriptView.payer = executionContext.source;
                }
                return this.executeViewAndDecodeResult(scriptView);
            });
        }
        verifyContextExecution(executionContext) {
            if (executionContext.source &&
                utils.validateAddress(executionContext.source) !== utils.ValidationResult.VALID) {
                throw new InvalidViewSimulationContext(`The source account who initialized the view execution is invalid: ${executionContext.source}.`);
            }
            if (!executionContext.viewCaller ||
                utils.validateAddress(executionContext.viewCaller) !== utils.ValidationResult.VALID) {
                throw new InvalidViewSimulationContext(`The contract which is the caller of view is invalid: ${executionContext.viewCaller}.`);
            }
        }
        transformArgsToMichelson() {
            try {
                return this._smartContractViewSchema.encodeViewArgs(this._args);
            }
            catch (error) {
                throw new core.InvalidViewParameterError(this._smartContractViewSchema.viewName, this.getSignature(), this._args, error);
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
                    storage = (yield this._rpc.runScriptView(viewScript))
                        .data;
                }
                catch (error) {
                    const failWith = validateAndExtractFailwith(error);
                    throw failWith
                        ? new ViewSimulationError(`The simulation of the on-chain view named ${this._smartContractViewSchema.viewName} failed with: ${JSON.stringify(failWith)}`, this._smartContractViewSchema.viewName, failWith, error)
                        : error;
                }
                return this._smartContractViewSchema.decodeViewResult(storage);
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
        createContractViewObjectParam(rpc, readProvider, smartContractViewSchema, contractStorageType, viewArgs) {
            return new OnChainView(rpc, readProvider, this.contractAddress, smartContractViewSchema, contractStorageType, viewArgs);
        }
    }

    const DEFAULT_SMART_CONTRACT_METHOD_NAME = 'default';
    /**
     * @description Utility class to retrieve data from a smart contract's storage without incurring fees via a contract's view method
     */
    class ContractView {
        constructor(currentContract, name, callbackParametersSchema, parameterSchema, args, rpc, readProvider) {
            this.currentContract = currentContract;
            this.name = name;
            this.callbackParametersSchema = callbackParametersSchema;
            this.parameterSchema = parameterSchema;
            this.args = args;
            this.rpc = rpc;
            this.readProvider = readProvider;
        }
        read(chainId) {
            return __awaiter(this, void 0, void 0, function* () {
                const chainIdValidation = utils.validateChain(chainId !== null && chainId !== void 0 ? chainId : '');
                if (utils.validateContractAddress(chainId !== null && chainId !== void 0 ? chainId : '') == utils.ValidationResult.VALID) {
                    throw new core.DeprecationError(`Since version 12, the lambda view no longer depends on a lambda contract. The read method no longer accepts a contract address as a parameter.`);
                }
                else if (chainId && chainIdValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidChainIdError(chainId, utils.invalidDetail(chainIdValidation));
                }
                const arg = this.parameterSchema.Encode(...this.args);
                const result = yield this.rpc.runView({
                    contract: this.currentContract.address,
                    entrypoint: this.name,
                    input: arg,
                    chain_id: chainId ? chainId : yield this.readProvider.getChainId(),
                });
                return this.callbackParametersSchema.Execute(result.data);
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
    /**
     * @description Smart contract abstraction
     */
    class ContractAbstraction {
        constructor(address, script, provider, storageProvider, entrypoints, rpc, readProvider) {
            this.address = address;
            this.script = script;
            this.storageProvider = storageProvider;
            this.entrypoints = entrypoints;
            this.rpc = rpc;
            this.readProvider = readProvider;
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
            this.schema = michelsonEncoder.Schema.fromRPCResponse({ script: this.script });
            this.parameterSchema = michelsonEncoder.ParameterSchema.fromRPCResponse({ script: this.script });
            this.viewSchema = michelsonEncoder.ViewSchema.fromRPCResponse({ script: this.script });
            if (this.viewSchema.length !== 0) {
                this._initializeOnChainViews(this, rpc, this.readProvider, this.viewSchema);
            }
            this.eventSchema = michelsonEncoder.EventSchema.fromRPCResponse({ script: this.script });
            this._initializeMethods(this, this.entrypoints.entrypoints, this.rpc, this.readProvider);
        }
        _initializeMethods(currentContract, entrypoints, rpc, readProvider) {
            const parameterSchema = this.parameterSchema;
            const keys = Object.keys(entrypoints);
            if (parameterSchema.isMultipleEntryPoint) {
                keys.forEach((smartContractMethodName) => {
                    const smartContractMethodSchema = new michelsonEncoder.ParameterSchema(entrypoints[smartContractMethodName]);
                    this.methods[smartContractMethodName] = function (...args) {
                        return currentContract.contractMethodFactory.createContractMethodFlatParams(smartContractMethodSchema, smartContractMethodName, args);
                    };
                    this.methodsObject[smartContractMethodName] = function (args) {
                        return currentContract.contractMethodFactory.createContractMethodObjectParam(smartContractMethodSchema, smartContractMethodName, args);
                    };
                    if (isView(entrypoints[smartContractMethodName])) {
                        const view = function (...args) {
                            const entrypointParamWithoutCallback = entrypoints[smartContractMethodName]
                                .args[0];
                            const smartContractMethodSchemaWithoutCallback = new michelsonEncoder.ParameterSchema(entrypointParamWithoutCallback);
                            const parametersCallback = entrypoints[smartContractMethodName].args[1]
                                .args[0];
                            const smartContractMethodCallbackSchema = new michelsonEncoder.ParameterSchema(parametersCallback);
                            validateArgs(args, smartContractMethodSchemaWithoutCallback, smartContractMethodName);
                            return new ContractView(currentContract, smartContractMethodName, smartContractMethodCallbackSchema, smartContractMethodSchemaWithoutCallback, args, rpc, readProvider);
                        };
                        this.views[smartContractMethodName] = view;
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
                this.methodsObject[DEFAULT_SMART_CONTRACT_METHOD_NAME] =
                    function (args) {
                        return currentContract.contractMethodFactory.createContractMethodObjectParam(smartContractMethodSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME, args, false);
                    };
            }
        }
        _initializeOnChainViews(currentContract, rpc, readProvider, allContractViews) {
            const storageType = this.schema.val;
            allContractViews.forEach((viewSchema) => {
                this.contractViews[viewSchema.viewName] = function (args) {
                    return currentContract.contractMethodFactory.createContractViewObjectParam(rpc, readProvider, viewSchema, storageType, args);
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
            return ((Number(this._milligasLimit) / 1000 + GAS_BUFFER) * MINIMAL_FEE_PER_GAS_MUTEZ +
                Number(this.opSize) * MINIMAL_FEE_PER_BYTE_MUTEZ);
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
            estimateProperties.forEach((estimate) => {
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
            return estimateProperties.map((x) => new Estimate(x.milligasLimit, x.storageLimit, x.opSize, x.minimalFeePerStorageByteMutez, x.baseFeeMutez));
        }
    }

    /**
     *  @category Error
     *  @description Error that indicates invalid public key being passed when doing a reveal operation estimate
     */
    class RevealEstimateError extends Error {
        constructor() {
            super('Unable to estimate the reveal operation, the public key is unknown');
            this.name = 'Reveal Estimate Error';
        }
    }

    // RPC requires a signature but does not verify it
    const SIGNATURE_STUB = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';
    class RPCEstimateProvider extends Provider {
        constructor() {
            super(...arguments);
            this.ALLOCATION_STORAGE = 257;
            this.ORIGINATION_STORAGE = 257;
            this.OP_SIZE_REVEAL = 128;
            this.prepare = new PrepareProvider(this.context);
        }
        getKeys() {
            return __awaiter(this, void 0, void 0, function* () {
                const isSignerConfigured = this.context.isAnySignerConfigured();
                return {
                    publicKeyHash: isSignerConfigured
                        ? yield this.signer.publicKeyHash()
                        : yield this.context.walletProvider.getPKH(),
                    publicKey: isSignerConfigured ? yield this.signer.publicKey() : undefined,
                };
            });
        }
        getEstimationPropertiesFromOperationContent(content, size, costPerByte) {
            const operationResults = flattenOperationResult({ contents: [content] });
            let totalMilligas = 0;
            let totalStorage = 0;
            operationResults.forEach((result) => {
                totalStorage +=
                    'originated_contracts' in result && typeof result.originated_contracts !== 'undefined'
                        ? result.originated_contracts.length * this.ORIGINATION_STORAGE
                        : 0;
                totalStorage += 'allocated_destination_contract' in result ? this.ALLOCATION_STORAGE : 0;
                totalMilligas += Number(result.consumed_milligas) || 0;
                totalStorage +=
                    'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
                totalStorage +=
                    'storage_size' in result && 'global_address' in result
                        ? Number(result.storage_size) || 0
                        : 0;
                totalStorage += 'genesis_commitment_hash' in result ? Number(result.size) : 0;
            });
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
        calculateEstimates(op, constants) {
            return __awaiter(this, void 0, void 0, function* () {
                const { opbytes, opOb: { branch, contents }, } = yield this.forge(op);
                const operation = {
                    operation: { branch, contents, signature: SIGNATURE_STUB },
                    chain_id: yield this.context.readProvider.getChainId(),
                };
                const { opResponse } = yield this.simulate(operation);
                const { cost_per_byte } = constants;
                const errors = [...flattenErrors(opResponse, 'backtracked'), ...flattenErrors(opResponse)];
                // Fail early in case of errors
                if (errors.length) {
                    throw new TezosOperationError(errors, 'Error occurred during estimation');
                }
                let numberOfOps = 1;
                if (Array.isArray(op.opOb.contents) && op.opOb.contents.length > 1) {
                    numberOfOps =
                        opResponse.contents[0].kind === 'reveal'
                            ? op.opOb.contents.length - 1
                            : op.opOb.contents.length;
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
        originate(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const preparedOperation = yield this.prepare.originate(params);
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
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
            var _b;
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const toValidation = utils.validateAddress(rest.to);
                if (toValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(rest.to, utils.invalidDetail(toValidation));
                }
                const srouceValidation = utils.validateAddress((_b = rest.source) !== null && _b !== void 0 ? _b : '');
                if (rest.source && srouceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(rest.source, utils.invalidDetail(srouceValidation));
                }
                if (rest.amount < 0) {
                    throw new core.InvalidAmountError(rest.amount.toString());
                }
                const preparedOperation = yield this.prepare.transaction(Object.assign({ fee,
                    storageLimit,
                    gasLimit }, rest));
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for a transferTicket operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param TransferTicketParams operation parameter
         */
        transferTicket(_a) {
            var _b;
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const destinationValidation = utils.validateAddress(rest.destination);
                if (destinationValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(rest.destination, utils.invalidDetail(destinationValidation));
                }
                const sourceValidation = utils.validateAddress((_b = rest.source) !== null && _b !== void 0 ? _b : '');
                if (rest.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(rest.source, utils.invalidDetail(sourceValidation));
                }
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperation = yield this.prepare.transferTicket(Object.assign({ fee,
                    storageLimit,
                    gasLimit }, rest));
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
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
            var _b;
            var { fee, gasLimit, storageLimit } = _a, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const sourceValidation = utils.validateAddress(rest.source);
                if (rest.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(rest.source, utils.invalidDetail(sourceValidation));
                }
                const delegateValidation = utils.validateAddress((_b = rest.delegate) !== null && _b !== void 0 ? _b : '');
                if (rest.delegate && delegateValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(rest.delegate, utils.invalidDetail(delegateValidation));
                }
                const preparedOperation = yield this.prepare.delegation(Object.assign({ fee,
                    storageLimit,
                    gasLimit }, rest));
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
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
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperations = yield this.prepare.batch(params);
                const estimateProperties = yield this.calculateEstimates(preparedOperations, protocolConstants);
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
        registerDelegate(_a, source) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const pkh = (yield this.getKeys()).publicKeyHash;
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const checkSource = source || pkh;
                const preparedOperation = yield this.prepare.registerDelegate(Object.assign({ fee, storageLimit, gasLimit }, rest), checkSource);
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
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
                const { publicKeyHash, publicKey } = yield this.getKeys();
                if (!publicKey) {
                    throw new RevealEstimateError();
                }
                if (yield this.isAccountRevealRequired(publicKeyHash)) {
                    const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                    const preparedOperation = params
                        ? yield this.prepare.reveal(params)
                        : yield this.prepare.reveal({});
                    const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
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
                const preparedOperation = yield this.prepare.registerGlobalConstant(Object.assign({ fee,
                    storageLimit,
                    gasLimit }, rest));
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
        /**
         *
         * @description Estimate gasLimit, storageLimit, and fees for an increasePaidStorage operation
         *
         * @returns An estimation of gasLimit, storageLimit, and fees for the operation
         *
         * @param params increasePaidStorage operation parameters
         */
        increasePaidStorage(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                if (rest.amount < 0) {
                    throw new core.InvalidAmountError(rest.amount.toString());
                }
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperation = yield this.prepare.increasePaidStorage(Object.assign({ fee,
                    storageLimit,
                    gasLimit }, rest));
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for an Update Consensus Key operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param Estimate
         */
        updateConsensusKey(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperation = yield this.prepare.updateConsensusKey(params);
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for a smart_rollup_add_messages operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param Estimate
         */
        smartRollupAddMessages(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperation = yield this.prepare.smartRollupAddMessages(params);
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for an Smart Rollup Originate operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param SmartRollupOriginateParams
         */
        smartRollupOriginate(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperation = yield this.prepare.smartRollupOriginate(params);
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for contract call
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the contract call
         *
         * @param Estimate
         */
        contractCall(contractMethod) {
            return __awaiter(this, void 0, void 0, function* () {
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const preparedOperation = yield this.prepare.contractCall(contractMethod);
                const estimateProperties = yield this.calculateEstimates(preparedOperation, protocolConstants);
                if (preparedOperation.opOb.contents[0].kind === 'reveal') {
                    estimateProperties.shift();
                }
                return Estimate.createEstimateInstanceFromProperties(estimateProperties);
            });
        }
    }

    var _counters;
    const mergeLimits = (userDefinedLimit, defaultLimits) => {
        var _a, _b, _c;
        return {
            fee: (_a = userDefinedLimit.fee) !== null && _a !== void 0 ? _a : defaultLimits.fee,
            gasLimit: (_b = userDefinedLimit.gasLimit) !== null && _b !== void 0 ? _b : defaultLimits.gasLimit,
            storageLimit: (_c = userDefinedLimit.storageLimit) !== null && _c !== void 0 ? _c : defaultLimits.storageLimit,
        };
    };
    /**
     * @description PrepareProvider is a utility class to output the prepared format of an operation
     */
    class PrepareProvider extends Provider {
        constructor(context) {
            super(context);
            this.context = context;
            _counters.set(this, void 0);
            __classPrivateFieldSet(this, _counters, {});
        }
        getBlockHash() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.context.readProvider.getBlockHash('head~2');
            });
        }
        getProtocolHash() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.context.readProvider.getNextProtocol('head');
            });
        }
        getHeadCounter(pkh) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                return (_a = this.context.readProvider.getCounter(pkh, 'head')) !== null && _a !== void 0 ? _a : '0';
            });
        }
        adjustGasForBatchOperation(gasLimitBlock, gaslimitOp, numberOfOps) {
            return BigNumber__default["default"].min(gaslimitOp, gasLimitBlock.div(numberOfOps + 1));
        }
        getAccountLimits(pkh, constants, numberOfOps) {
            return __awaiter(this, void 0, void 0, function* () {
                const balance = yield this.context.readProvider.getBalance(pkh, 'head');
                const { hard_gas_limit_per_operation, hard_gas_limit_per_block, hard_storage_limit_per_operation, cost_per_byte, } = constants;
                return {
                    fee: 0,
                    gasLimit: numberOfOps
                        ? Math.floor(this.adjustGasForBatchOperation(hard_gas_limit_per_block, hard_gas_limit_per_operation, numberOfOps).toNumber())
                        : hard_gas_limit_per_operation.toNumber(),
                    storageLimit: Math.floor(BigNumber__default["default"].min(balance.dividedBy(cost_per_byte), hard_storage_limit_per_operation).toNumber()),
                };
            });
        }
        getFee(op, pkh, headCounter) {
            if (!__classPrivateFieldGet(this, _counters)[pkh] || __classPrivateFieldGet(this, _counters)[pkh] < headCounter) {
                __classPrivateFieldGet(this, _counters)[pkh] = headCounter;
            }
            const opCounter = ++__classPrivateFieldGet(this, _counters)[pkh];
            return {
                counter: `${opCounter}`,
                fee: typeof op.fee === 'undefined' ? '0' : `${op.fee}`,
                gas_limit: typeof op.gas_limit === 'undefined' ? '0' : `${op.gas_limit}`,
                storage_limit: typeof op.storage_limit === 'undefined' ? '0' : `${op.storage_limit}`,
            };
        }
        getSource(op, pkh, source) {
            return { source: typeof op.source === 'undefined' ? source || pkh : op.source };
        }
        addRevealOperationIfNeeded(operation, publicKeyHash) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isOpRequireReveal(operation)) {
                    const ops = [operation];
                    const { publicKey, pkh } = yield this.getKeys();
                    if (yield this.isAccountRevealRequired(publicKeyHash)) {
                        if (!publicKey) {
                            throw new RevealEstimateError();
                        }
                        ops.unshift(yield createRevealOperation({
                            fee: exports.DEFAULT_FEE.REVEAL,
                            storageLimit: exports.DEFAULT_STORAGE_LIMIT.REVEAL,
                            gasLimit: getRevealGasLimit(pkh),
                        }, publicKeyHash, publicKey));
                        return ops;
                    }
                }
                return operation;
            });
        }
        getKeys() {
            return __awaiter(this, void 0, void 0, function* () {
                const isSignerConfigured = this.context.isAnySignerConfigured();
                return {
                    pkh: isSignerConfigured
                        ? yield this.signer.publicKeyHash()
                        : yield this.context.walletProvider.getPKH(),
                    publicKey: isSignerConfigured ? yield this.signer.publicKey() : undefined,
                };
            });
        }
        convertIntoArray(op) {
            if (Array.isArray(op)) {
                return [...op];
            }
            else {
                return [op];
            }
        }
        constructOpContents(ops, headCounter, pkh, source, currentVotingPeriod) {
            return ops.map((op) => {
                switch (op.kind) {
                    case rpc.OpKind.ACTIVATION:
                    case rpc.OpKind.DRAIN_DELEGATE:
                        return Object.assign({}, op);
                    case rpc.OpKind.ORIGINATION:
                        return Object.assign(Object.assign(Object.assign(Object.assign({}, op), { balance: typeof op.balance !== 'undefined' ? `${op.balance}` : '0' }), this.getSource(op, pkh, source)), this.getFee(op, pkh, headCounter));
                    case rpc.OpKind.TRANSACTION: {
                        const cops = Object.assign(Object.assign(Object.assign(Object.assign({}, op), { amount: typeof op.amount !== 'undefined' ? `${op.amount}` : '0' }), this.getSource(op, pkh, source)), this.getFee(op, pkh, headCounter));
                        if (cops.source.toLowerCase().startsWith('kt1')) {
                            throw new utils.DeprecationError(`KT1 addresses are not supported as source since ${exports.Protocols.PsBabyM1}`);
                        }
                        return cops;
                    }
                    case rpc.OpKind.REVEAL:
                    case rpc.OpKind.DELEGATION:
                    case rpc.OpKind.REGISTER_GLOBAL_CONSTANT:
                    case rpc.OpKind.UPDATE_CONSENSUS_KEY:
                    case rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES:
                    case rpc.OpKind.SMART_ROLLUP_ORIGINATE:
                        return Object.assign(Object.assign(Object.assign({}, op), this.getSource(op, pkh, source)), this.getFee(op, pkh, headCounter));
                    case rpc.OpKind.TRANSFER_TICKET:
                        return Object.assign(Object.assign(Object.assign(Object.assign({}, op), { ticket_amount: `${op.ticket_amount}` }), this.getSource(op, pkh, source)), this.getFee(op, pkh, headCounter));
                    case rpc.OpKind.INCREASE_PAID_STORAGE:
                        return Object.assign(Object.assign(Object.assign(Object.assign({}, op), { amount: `${op.amount}` }), this.getSource(op, pkh, source)), this.getFee(op, pkh, headCounter));
                    case rpc.OpKind.BALLOT:
                        if (currentVotingPeriod === undefined) {
                            throw new RPCResponseError(`Failed to get the current voting period index`);
                        }
                        return Object.assign(Object.assign({}, op), { period: currentVotingPeriod === null || currentVotingPeriod === void 0 ? void 0 : currentVotingPeriod.voting_period.index });
                    case rpc.OpKind.PROPOSALS:
                        if (currentVotingPeriod === undefined) {
                            throw new RPCResponseError(`Failed to get the current voting period index`);
                        }
                        return Object.assign(Object.assign({}, op), { period: currentVotingPeriod === null || currentVotingPeriod === void 0 ? void 0 : currentVotingPeriod.voting_period.index });
                    default:
                        throw new utils.InvalidOperationKindError(op.kind);
                }
            });
        }
        /**
         *
         * @description Method to prepare an activation operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        activate({ pkh, secret }) {
            return __awaiter(this, void 0, void 0, function* () {
                const op = yield createActivationOperation({
                    pkh,
                    secret,
                });
                const ops = this.convertIntoArray(op);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a reveal operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        reveal({ fee, gasLimit, storageLimit }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh, publicKey } = yield this.getKeys();
                if (!publicKey) {
                    throw new PublicKeyNotFoundError();
                }
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const mergedEstimates = mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS);
                const op = yield createRevealOperation({
                    fee: mergedEstimates.fee,
                    gasLimit: mergedEstimates.gasLimit,
                    storageLimit: mergedEstimates.storageLimit,
                }, pkh, publicKey);
                const ops = this.convertIntoArray(op);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare an origination operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        originate(_a, source) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS))));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a transaction operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        transaction(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createTransferOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a delegation operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        delegation(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createSetDelegateOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a register delegate operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        registerDelegate({ fee, storageLimit, gasLimit }, source) {
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const mergedEstimates = mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS);
                const op = yield createRegisterDelegateOperation({
                    fee: mergedEstimates.fee,
                    storageLimit: mergedEstimates.storageLimit,
                    gasLimit: mergedEstimates.gasLimit,
                }, pkh);
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a register_global_constant operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        registerGlobalConstant(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createRegisterGlobalConstantOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare an update_consensus_key operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        updateConsensusKey(_a, source) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createUpdateConsensusKeyOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare an increase_paid_storage operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        increasePaidStorage(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createIncreasePaidStorageOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a ballot operation
         * @param operation RPCOperation object or RPCOperation array
         * @returns a PreparedOperation object
         */
        ballot(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const op = yield createBallotOperation(Object.assign({}, params));
                const ops = this.convertIntoArray(op);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                let currentVotingPeriod;
                try {
                    currentVotingPeriod = yield this.rpc.getCurrentPeriod();
                }
                catch (e) {
                    throw new RPCResponseError('Failed to get the current voting period index');
                }
                const contents = this.constructOpContents(ops, headCounter, pkh, undefined, currentVotingPeriod);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a proposals operation
         * @param operation RPCOperation object or RPCOperation array
         * @returns a PreparedOperation object
         */
        proposals(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const op = yield createProposalsOperation(Object.assign({}, params));
                const ops = this.convertIntoArray(op);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                let currentVotingPeriod;
                try {
                    currentVotingPeriod = yield this.rpc.getCurrentPeriod();
                }
                catch (e) {
                    throw new RPCResponseError('Failed to get the current voting period index');
                }
                const contents = this.constructOpContents(ops, headCounter, pkh, undefined, currentVotingPeriod);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a drain_delegate operation
         * @param operation RPCOperation object or RPCOperation array
         * @returns a PreparedOperation object
         */
        drainDelegate(params, source) {
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const op = yield createDrainDelegateOperation(Object.assign({}, params));
                const ops = this.convertIntoArray(op);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a transfer_ticket operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        transferTicket(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createTransferTicketOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a smart_rollup_add_messages operation
         * @param operation RPCOperation object or RPCOperation array
         * @param source string or undefined source pkh
         * @returns a PreparedOperation object
         */
        smartRollupAddMessages(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createSmartRollupAddMessagesOperation(Object.assign(Object.assign({}, rest), mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a smart_rollup_originate operation
         * @param operation RPCOperation object or RPCOperation array
         * @returns a PreparedOperation object
         */
        smartRollupOriginate(_a) {
            var { fee, storageLimit, gasLimit } = _a, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh } = yield this.getKeys();
                const originationProof = yield this.rpc.getOriginationProof({
                    kind: rest.pvmKind,
                    kernel: rest.kernel,
                });
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const op = yield createSmartRollupOriginateOperation(Object.assign(Object.assign(Object.assign({}, mergeLimits({ fee, storageLimit, gasLimit }, DEFAULT_PARAMS)), rest), { originationProof }));
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh, rest.source);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a batch operation
         * @param operation RPCOperation object or RPCOperation array
         * @returns a PreparedOperation object
         */
        batch(batchParams, estimates) {
            return __awaiter(this, void 0, void 0, function* () {
                const { pkh, publicKey } = yield this.getKeys();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants, batchParams.length);
                const revealNeeded = yield this.isRevealOpNeeded(batchParams, pkh);
                const ops = [];
                if (!estimates) {
                    for (const op of batchParams) {
                        if (isOpWithFee(op)) {
                            const limits = mergeLimits(op, DEFAULT_PARAMS);
                            ops.push(yield this.getRPCOp(Object.assign(Object.assign({}, op), limits)));
                        }
                        else {
                            ops.push(Object.assign({}, op));
                        }
                    }
                }
                else {
                    for (const op of batchParams) {
                        if (isOpWithFee(op)) {
                            const e = estimates.shift();
                            const limits = mergeLimits(op, {
                                fee: e.suggestedFeeMutez,
                                storageLimit: e.storageLimit,
                                gasLimit: e.gasLimit,
                            });
                            ops.push(yield this.getRPCOp(Object.assign(Object.assign({}, op), limits)));
                        }
                        else {
                            ops.push(Object.assign({}, op));
                        }
                    }
                }
                if (revealNeeded) {
                    if (!publicKey) {
                        throw new RevealEstimateError();
                    }
                    ops.unshift(yield createRevealOperation({
                        fee: exports.DEFAULT_FEE.REVEAL,
                        storageLimit: exports.DEFAULT_STORAGE_LIMIT.REVEAL,
                        gasLimit: getRevealGasLimit(pkh),
                    }, pkh, publicKey));
                }
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const contents = this.constructOpContents(ops, headCounter, pkh);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to prepare a batch operation
         * @param operation RPCOperation object or RPCOperation array
         * @returns a PreparedOperation object
         */
        contractCall(contractMethod) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                const hash = yield this.getBlockHash();
                const protocol = yield this.getProtocolHash();
                const { pkh } = yield this.getKeys();
                __classPrivateFieldSet(this, _counters, {});
                const headCounter = parseInt(yield this.getHeadCounter(pkh), 10);
                const params = contractMethod.toTransferParams();
                const protocolConstants = yield this.context.readProvider.getProtocolConstants('head');
                const DEFAULT_PARAMS = yield this.getAccountLimits(pkh, protocolConstants);
                const estimateLimits = mergeLimits({
                    fee: params.fee,
                    storageLimit: params.storageLimit,
                    gasLimit: params.gasLimit,
                }, DEFAULT_PARAMS);
                const op = {
                    kind: rpc.OpKind.TRANSACTION,
                    fee: (_a = params.fee) !== null && _a !== void 0 ? _a : estimateLimits.fee,
                    gas_limit: (_b = params.gasLimit) !== null && _b !== void 0 ? _b : estimateLimits.gasLimit,
                    storage_limit: (_c = params.storageLimit) !== null && _c !== void 0 ? _c : estimateLimits.storageLimit,
                    amount: String(params.amount),
                    destination: params.to,
                    parameters: params.parameter,
                };
                const operation = yield this.addRevealOperationIfNeeded(op, pkh);
                const ops = this.convertIntoArray(operation);
                const contents = this.constructOpContents(ops, headCounter, pkh);
                return {
                    opOb: {
                        branch: hash,
                        contents,
                        protocol,
                    },
                    counter: headCounter,
                };
            });
        }
        /**
         *
         * @description Method to convert a PreparedOperation to the params needed for the preapplyOperation method
         * @param prepared a Prepared Operation
         * @returns a PreapplyParams object
         */
        toPreapply(prepared) {
            return __awaiter(this, void 0, void 0, function* () {
                const { opOb: { contents, branch, protocol }, } = prepared;
                const forgeParams = this.toForge(prepared);
                const forged = yield this.context.forger.forge(forgeParams);
                const sig = yield this.context.signer.sign(forged, new Uint8Array([3]));
                return [{ contents, branch, protocol, signature: sig.prefixSig }];
            });
        }
        /**
         *
         * @description Method to convert a PreparedOperation to the params needed for forging
         * @param param a Prepared Operation
         * @returns a ForgeParams object
         */
        toForge({ opOb: { contents, branch } }) {
            return {
                branch,
                contents,
            };
        }
    }
    _counters = new WeakMap();

    const BATCH_KINDS = [
        rpc.OpKind.ACTIVATION,
        rpc.OpKind.ORIGINATION,
        rpc.OpKind.TRANSACTION,
        rpc.OpKind.DELEGATION,
    ];
    class OperationBatch extends Provider {
        constructor(context, estimator) {
            super(context);
            this.estimator = estimator;
            this.operations = [];
            this.prepare = new PrepareProvider(this.context);
        }
        /**
         *
         * @description Add a transaction operation to the batch
         *
         * @param params Transfer operation parameter
         */
        withTransfer(params) {
            const toValidation = utils.validateAddress(params.to);
            if (params.amount < 0) {
                throw new core.InvalidAmountError(params.amount.toString());
            }
            if (toValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.to, utils.invalidDetail(toValidation));
            }
            this.operations.push(Object.assign({ kind: rpc.OpKind.TRANSACTION }, params));
            return this;
        }
        /**
         *
         * @description Transfer tickets from a Tezos address (tz1,tz2 or tz3) to a smart contract address( KT1)
         *
         * @param params Transfer operation parameter
         */
        withTransferTicket(params) {
            const destinationValidation = utils.validateAddress(params.destination);
            if (destinationValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.destination, utils.invalidDetail(destinationValidation));
            }
            this.operations.push(Object.assign({ kind: rpc.OpKind.TRANSFER_TICKET }, params));
            return this;
        }
        /**
         *
         * @description Add a contract call to the batch
         *
         * @param params Call a contract method
         * @param options Generic operation parameters
         */
        withContractCall(params, options = {}) {
            return this.withTransfer(params.toTransferParams(options));
        }
        /**
         *
         * @description Add a delegation operation to the batch
         *
         * @param params Delegation operation parameter
         */
        withDelegation(params) {
            var _a;
            const sourceValidation = utils.validateAddress(params.source);
            if (params.source && sourceValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.source, utils.invalidDetail(sourceValidation));
            }
            const delegateValidation = utils.validateAddress((_a = params.delegate) !== null && _a !== void 0 ? _a : '');
            if (params.delegate && delegateValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidAddressError(params.delegate, utils.invalidDetail(delegateValidation));
            }
            this.operations.push(Object.assign({ kind: rpc.OpKind.DELEGATION }, params));
            return this;
        }
        /**
         *
         * @description Add an activation operation to the batch
         *
         * @param params Activation operation parameter
         * @throws {@link InvalidKeyHashError}
         */
        withActivation({ pkh, secret }) {
            const pkhValidation = utils.validateKeyHash(pkh);
            if (pkhValidation !== utils.ValidationResult.VALID) {
                throw new core.InvalidKeyHashError(pkh, utils.invalidDetail(pkhValidation));
            }
            this.operations.push({ kind: rpc.OpKind.ACTIVATION, pkh, secret });
            return this;
        }
        /**
         *
         * @description Add an origination operation to the batch
         *
         * @param params Origination operation parameter
         */
        withOrigination(params) {
            this.operations.push(Object.assign({ kind: rpc.OpKind.ORIGINATION }, params));
            return this;
        }
        /**
         *
         * @description Add a register a global constant operation to the batch
         *
         * @param params RegisterGlobalConstant operation parameter
         */
        withRegisterGlobalConstant(params) {
            this.operations.push(Object.assign({ kind: rpc.OpKind.REGISTER_GLOBAL_CONSTANT }, params));
            return this;
        }
        /**
         *
         * @description Add an increase paid storage operation to the batch
         *
         * @param params IncreasePaidStorage operation parameter
         */
        withIncreasePaidStorage(params) {
            this.operations.push(Object.assign({ kind: rpc.OpKind.INCREASE_PAID_STORAGE }, params));
            return this;
        }
        /**
         *
         * @description Add a smart rollup add messages operation to the batch
         *
         * @param params Rollup origination operation parameter
         */
        withSmartRollupAddMessages(params) {
            this.operations.push(Object.assign({ kind: rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES }, params));
            return this;
        }
        /**
         *
         * @description Add a smart rollup originate operation to the batch
         *
         * @param params Smart Rollup Originate operation parameter
         */
        withSmartRollupOriginate(params) {
            this.operations.push(Object.assign({ kind: rpc.OpKind.SMART_ROLLUP_ORIGINATE }, params));
            return this;
        }
        getRPCOp(param) {
            return __awaiter(this, void 0, void 0, function* () {
                switch (param.kind) {
                    case rpc.OpKind.TRANSACTION:
                        return createTransferOperation(Object.assign({}, param));
                    case rpc.OpKind.ORIGINATION:
                        return createOriginationOperation(yield this.context.parser.prepareCodeOrigination(Object.assign({}, param)));
                    case rpc.OpKind.DELEGATION:
                        return createSetDelegateOperation(Object.assign({}, param));
                    case rpc.OpKind.REGISTER_GLOBAL_CONSTANT:
                        return createRegisterGlobalConstantOperation(Object.assign({}, param));
                    case rpc.OpKind.INCREASE_PAID_STORAGE:
                        return createIncreasePaidStorageOperation(Object.assign({}, param));
                    case rpc.OpKind.TRANSFER_TICKET:
                        return createTransferTicketOperation(Object.assign({}, param));
                    case rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES:
                        return createSmartRollupAddMessagesOperation(Object.assign({}, param));
                    case rpc.OpKind.SMART_ROLLUP_ORIGINATE:
                        return createSmartRollupOriginateOperation(Object.assign({}, param));
                    default:
                        throw new core.InvalidOperationKindError(JSON.stringify(param.kind));
                }
            });
        }
        /**
         *
         * @description Add a group operation to the batch. Operation will be applied in the order they are in the params array
         *
         * @param params Operations parameter
         * @throws {@link InvalidOperationKindError}
         */
        with(params) {
            for (const param of params) {
                switch (param.kind) {
                    case rpc.OpKind.TRANSACTION:
                        this.withTransfer(param);
                        break;
                    case rpc.OpKind.ORIGINATION:
                        this.withOrigination(param);
                        break;
                    case rpc.OpKind.DELEGATION:
                        this.withDelegation(param);
                        break;
                    case rpc.OpKind.ACTIVATION:
                        this.withActivation(param);
                        break;
                    case rpc.OpKind.REGISTER_GLOBAL_CONSTANT:
                        this.withRegisterGlobalConstant(param);
                        break;
                    case rpc.OpKind.INCREASE_PAID_STORAGE:
                        this.withIncreasePaidStorage(param);
                        break;
                    case rpc.OpKind.TRANSFER_TICKET:
                        this.withTransferTicket(param);
                        break;
                    case rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES:
                        this.withSmartRollupAddMessages(param);
                        break;
                    case rpc.OpKind.SMART_ROLLUP_ORIGINATE:
                        this.withSmartRollupOriginate(param);
                        break;
                    default:
                        throw new core.InvalidOperationKindError(JSON.stringify(param.kind));
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
                const source = (params && params.source) || publicKeyHash;
                const estimates = yield this.estimator.batch(this.operations);
                if (estimates.length !== this.operations.length) {
                    estimates.shift();
                }
                const preparedOp = yield this.prepare.batch(this.operations, estimates);
                const opBytes = yield this.forge(preparedOp);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new BatchOperation(hash, preparedOp.opOb.contents, source, forgedBytes, opResponse, context);
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

    class BatchWalletOperation extends WalletOperation {
        constructor(opHash, context, newHead$) {
            super(opHash, context, newHead$);
            this.opHash = opHash;
            this.context = context;
            this.getOriginatedContractAddresses = () => __awaiter(this, void 0, void 0, function* () {
                const opResult = yield this.operationResults();
                const originationOpResults = opResult.filter((x) => x.kind === 'origination');
                let addresses = [];
                for (const res of originationOpResults) {
                    if (res.metadata.operation_result.originated_contracts) {
                        addresses = [...addresses, ...res.metadata.operation_result.originated_contracts];
                    }
                }
                return addresses;
            });
        }
        revealOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return operationResult.find((x) => x.kind === rpc.OpKind.REVEAL);
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

    class IncreasePaidStorageWalletOperation extends WalletOperation {
        constructor(opHash, context, newHead$) {
            super(opHash, context, newHead$);
            this.opHash = opHash;
            this.context = context;
        }
        revealOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return operationResult.find(x => x.kind === rpc.OpKind.REVEAL);
            });
        }
        increasePaidStorageOperation() {
            return __awaiter(this, void 0, void 0, function* () {
                const operationResult = yield this.operationResults();
                return operationResult.find(x => x.kind === rpc.OpKind.INCREASE_PAID_STORAGE);
            });
        }
        status() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this._included) {
                    return 'pending';
                }
                const op = yield this.increasePaidStorageOperation();
                if (!op) {
                    return 'unknown';
                }
                return op.metadata.operation_result.status;
            });
        }
    }

    function timeoutAfter(timeoutMillisec) {
        return function inner(source) {
            return new rxjs.BehaviorSubject(null).pipe(operators.timeoutWith(timeoutMillisec, rxjs.throwError(new Error('Confirmation polling timed out'))), operators.mergeMap(() => source));
        };
    }
    const createNewPollingBasedHeadObservable = (sharedHeadOb, context, _scheduler) => {
        return sharedHeadOb.pipe(timeoutAfter(context.config.confirmationPollingTimeoutSecond * 1000), operators.publishReplay(1), operators.refCount());
    };
    class OperationFactory {
        constructor(context) {
            this.context = context;
            // Cache the last block for one second across all operations
            this.sharedHeadObs = rxjs.defer(() => {
                return createObservableFromSubscription(this.context.stream.subscribeBlock('head'));
            });
        }
        createNewHeadObservable() {
            return __awaiter(this, void 0, void 0, function* () {
                return createNewPollingBasedHeadObservable(this.sharedHeadObs, this.context);
            });
        }
        createPastBlockWalker(startBlock, count = 1) {
            return rxjs.from(this.context.readProvider.getBlock(startBlock)).pipe(operators.switchMap((block) => {
                if (count === 1) {
                    return rxjs.of(block);
                }
                return rxjs.range(block.header.level, count - 1).pipe(operators.startWith(block), operators.concatMap((level) => __awaiter(this, void 0, void 0, function* () {
                    return this.context.readProvider.getBlock(typeof level === 'number' ? level : level.header.level);
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
                return rxjs.concat(...observableSequence);
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
        createIncreasePaidStorageOperation(hash, config = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                return new IncreasePaidStorageWalletOperation(hash, this.context.clone(), yield this.createHeadObservableFromConfig(config));
            });
        }
    }

    class RpcTzProvider extends Provider {
        constructor(context) {
            super(context);
            this.prepare = new PrepareProvider(this.context);
        }
        getBalance(address) {
            return __awaiter(this, void 0, void 0, function* () {
                const addressValidation = utils.validateAddress(address);
                if (addressValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(address, utils.invalidDetail(addressValidation));
                }
                return this.context.readProvider.getBalance(address, 'head');
            });
        }
        getDelegate(address) {
            return __awaiter(this, void 0, void 0, function* () {
                const addressValidation = utils.validateAddress(address);
                if (addressValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(address, utils.invalidDetail(addressValidation));
                }
                return this.context.readProvider.getDelegate(address, 'head');
            });
        }
        activate(pkh, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                const pkhValidation = utils.validateKeyHash(pkh);
                if (pkhValidation !== utils.ValidationResult.VALID) {
                    throw new utils.InvalidKeyHashError(pkh, utils.invalidDetail(pkhValidation));
                }
                const prepared = yield this.prepare.activate({ pkh, secret });
                const forgedBytes = yield this.forge(prepared);
                const bytes = `${forgedBytes.opbytes}00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`;
                return new Operation(yield this.rpc.injectOperation(bytes), Object.assign(Object.assign({}, forgedBytes), { opbytes: bytes }), [], this.context.clone());
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
                this.results.find((op) => op.kind === 'delegation');
            const result = delegationOp && delegationOp.metadata && delegationOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get delegate() {
            return this.params.delegate;
        }
        get isRegisterOperation() {
            return this.delegate === this.source;
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get consumedGas() {
            BigNumber.BigNumber.config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber.BigNumber.ROUND_UP });
            return this.consumedMilliGas
                ? new BigNumber.BigNumber(this.consumedMilliGas).dividedBy(1000).toString()
                : undefined;
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
        }
        get errors() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
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
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
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
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get consumedGas() {
            BigNumber.BigNumber.config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber.BigNumber.ROUND_UP });
            return this.consumedMilliGas
                ? new BigNumber.BigNumber(this.consumedMilliGas).dividedBy(1000).toString()
                : undefined;
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
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
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
        }
        /**
         * @description Provide the contract abstract of the newly originated contract
         */
        contract(confirmations, timeout) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.contractAddress) {
                    throw new OriginationOperationError('No contract was originated in this operation');
                }
                yield this.confirmation(confirmations, timeout);
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
                this.results.find((op) => op.kind === 'register_global_constant');
            const result = registerGlobalConstantOp &&
                registerGlobalConstantOp.metadata &&
                registerGlobalConstantOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get registeredExpression() {
            return this.params.value;
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get errors() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
        }
        get consumedGas() {
            BigNumber.BigNumber.config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber.BigNumber.ROUND_UP });
            return this.consumedMilliGas
                ? new BigNumber.BigNumber(this.consumedMilliGas).dividedBy(1000).toString()
                : undefined;
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
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
                this.results.find((op) => op.kind === 'reveal');
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
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
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
            BigNumber.BigNumber.config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber.BigNumber.ROUND_UP });
            return new BigNumber.BigNumber(this.consumedMilliGas).dividedBy(1000).toString();
        }
        get consumedMilliGas() {
            return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'consumed_milligas'));
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
                this.results.find((op) => op.kind === 'transaction');
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
            return new BigNumber__default["default"](this.params.amount);
        }
        get destination() {
            return this.params.destination;
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        sumProp(arr, prop) {
            return arr.reduce((prev, current) => {
                return prop in current ? Number(current[prop]) + prev : prev;
            }, 0);
        }
        get consumedGas() {
            BigNumber__default["default"].config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber__default["default"].ROUND_UP });
            return new BigNumber__default["default"](this.consumedMilliGas).dividedBy(1000).toString();
        }
        get consumedMilliGas() {
            return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'consumed_milligas'));
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
                    if (e instanceof httpUtils.HttpResponseError && e.status === httpUtils.STATUS_CODE.NOT_FOUND) {
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

    // Override the default michelson encoder semantic to provide richer abstraction over storage properties
    const smartContractAbstractionSemantic = (provider) => ({
        // Provide a specific abstraction for BigMaps
        big_map: (val, code) => {
            if (!val || !('int' in val) || val.int === undefined) {
                // Return an empty object in case of missing big map ID
                return {};
            }
            else {
                const schema = new michelsonEncoder.Schema(code);
                return new BigMapAbstraction(new BigNumber__default["default"](val.int), schema, provider);
            }
        },
        sapling_state: (val) => {
            if (!val || !('int' in val) || val.int === undefined) {
                // Return an empty object in case of missing sapling state ID
                return {};
            }
            else {
                return new SaplingStateAbstraction(new BigNumber__default["default"](val.int), provider);
            }
        }
        /*
        // TODO: embed useful other abstractions
        'contract':  () => {},
        'address':  () => {}
        */
    });

    /**
     *
     * @description BallotOperation provides utility functions to fetch a new operation of kind ballot
     *
     */
    class BallotOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const ballotOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === 'ballot');
            const result = ballotOp;
            return result ? result : undefined;
        }
        get period() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.period;
        }
        get proposal() {
            return this.params.proposal;
        }
        get ballot() {
            return this.params.ballot;
        }
    }

    /**
     *
     * @description DrainDelegateOperation provides utility functions to fetch a new operation of kind drain_delegate
     *
     */
    class DrainDelegateOperation extends Operation {
        constructor(hash, params, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
        }
        get operationResults() {
            const drainDelegateOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === 'drain_delegate');
            const result = drainDelegateOp && drainDelegateOp.metadata && drainDelegateOp.metadata.balance_updates;
            return result ? result : undefined;
        }
        get consensusKey() {
            return this.params.consensus_key;
        }
        get delegate() {
            return this.params.delegate;
        }
        get destination() {
            return this.params.destination;
        }
    }

    /**
     *
     * @description Transfer tickets from a Tezos address (tz1, tz2 or tz3) to a smart contract address (KT1) (everything on layer 1 at this step)
     *
     * @warn Currently only supports one L2 ticket holder transfer at once. ie. one collection of tickets owned by tz1, tz2 or tz3 to a smart contract.
     */
    class TransferTicketOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const transferOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === rpc.OpKind.TRANSFER_TICKET);
            const result = transferOp && transferOp.metadata && transferOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get consumedGas() {
            BigNumber.BigNumber.config({ DECIMAL_PLACES: 0, ROUNDING_MODE: BigNumber.BigNumber.ROUND_UP });
            return this.consumedMilliGas
                ? new BigNumber.BigNumber(this.consumedMilliGas).dividedBy(1000).toString()
                : undefined;
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
        }
    }

    /**
     *
     * @description IncreasePaidStorageOperation provides utility functions to fetch a new operation of kind increase_paid_storage
     *
     */
    class IncreasePaidStorageOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const increasePaidStorageOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === 'increase_paid_storage');
            const result = increasePaidStorageOp &&
                increasePaidStorageOp.metadata &&
                increasePaidStorageOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get errors() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
        }
        get amount() {
            return this.params.amount;
        }
        get destination() {
            return this.params.destination;
        }
    }

    /**
     *
     * @description ProposalsOperation provides utility functions to fetch a new operation of kind proposals
     *
     */
    class ProposalsOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const proposalsOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === 'proposals');
            const result = proposalsOp;
            return result ? result : undefined;
        }
        get proposals() {
            return this.params.proposals;
        }
        get period() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.period;
        }
    }

    /**
     *
     * @description UpdateConsensusKeyOperation provides utility to fetch properties for Operation of kind UpdateConsensusKey
     *
     */
    class UpdateConsensusKeyOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const updateConsensusKeyOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === 'update_consensus_key');
            const result = updateConsensusKeyOp &&
                updateConsensusKeyOp.metadata &&
                updateConsensusKeyOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get pk() {
            return this.params.pk;
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
        }
        get errors() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
        }
    }

    /**
     * @description SmartRollupAddMessagesOperation provides utility to fetch properties of SmartRollupAddMessages
     */
    class SmartRollupAddMessagesOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const smartRollupAddMessagesOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === 'smart_rollup_add_messages');
            const result = smartRollupAddMessagesOp &&
                smartRollupAddMessagesOp.metadata &&
                smartRollupAddMessagesOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get message() {
            return this.params.message;
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
        }
        get errors() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
        }
    }

    /**
     *
     * @description SmartRollupOriginate Operation provides utility to fetch properties for Operation of kind SmartRollupOriginate
     *
     */
    class SmartRollupOriginateOperation extends Operation {
        constructor(hash, params, source, raw, results, context) {
            super(hash, raw, results, context);
            this.params = params;
            this.source = source;
        }
        get operationResults() {
            const smartRollupOriginateOp = Array.isArray(this.results) &&
                this.results.find((op) => op.kind === rpc.OpKind.SMART_ROLLUP_ORIGINATE);
            const result = smartRollupOriginateOp &&
                smartRollupOriginateOp.metadata &&
                smartRollupOriginateOp.metadata.operation_result;
            return result ? result : undefined;
        }
        get status() {
            var _a, _b;
            return (_b = (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : 'unknown';
        }
        get fee() {
            return Number(this.params.fee);
        }
        get gasLimit() {
            return Number(this.params.gas_limit);
        }
        get storageLimit() {
            return Number(this.params.storage_limit);
        }
        get consumedMilliGas() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.consumed_milligas;
        }
        get pvmKind() {
            return this.params.pvm_kind;
        }
        get kernel() {
            return this.params.kernel;
        }
        get originationProof() {
            return this.params.origination_proof;
        }
        get errors() {
            var _a;
            return (_a = this.operationResults) === null || _a === void 0 ? void 0 : _a.errors;
        }
    }

    class RpcContractProvider extends Provider {
        constructor(context, estimator) {
            super(context);
            this.estimator = estimator;
            this.contractProviderTypeSymbol = Symbol.for('taquito-contract-provider-type-symbol');
            this.prepare = new PrepareProvider(this.context);
        }
        /**
         *
         * @description Return a well formatted json object of the contract storage
         *
         * @param contract contract address you want to get the storage from
         * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
         * @throws {@link InvalidContractAddressError}
         * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
         */
        getStorage(contract, schema) {
            return __awaiter(this, void 0, void 0, function* () {
                const contractValidation = utils.validateContractAddress(contract);
                if (contractValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidContractAddressError(contract, utils.invalidDetail(contractValidation));
                }
                const script = yield this.context.readProvider.getScript(contract, 'head');
                if (!schema) {
                    schema = script;
                }
                let contractSchema;
                if (michelsonEncoder.Schema.isSchema(schema)) {
                    contractSchema = schema;
                }
                else {
                    contractSchema = michelsonEncoder.Schema.fromRPCResponse({ script: schema });
                }
                return contractSchema.Execute(script.storage, smartContractAbstractionSemantic(this)); // Cast into T because only the caller can know the true type of the storage
            });
        }
        /**
         *
         * @description Return a well formatted json object of the contract big map storage
         *
         * @param contract contract address you want to get the storage from
         * @param key contract big map key to fetch value from
         * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
         * @throws {@link InvalidContractAddressError}
         * @deprecated Deprecated in favor of getBigMapKeyByID
         *
         * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
         */
        getBigMapKey(contract, key, schema) {
            return __awaiter(this, void 0, void 0, function* () {
                const contractValidation = utils.validateContractAddress(contract);
                if (contractValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidContractAddressError(contract, utils.invalidDetail(contractValidation));
                }
                if (!schema) {
                    schema = (yield this.rpc.getContract(contract)).script;
                }
                let contractSchema;
                if (michelsonEncoder.Schema.isSchema(schema)) {
                    contractSchema = schema;
                }
                else {
                    contractSchema = michelsonEncoder.Schema.fromRPCResponse({ script: schema });
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
                const encodedExpr = utils.encodeExpr(packed);
                const bigMapValue = block
                    ? yield this.context.readProvider.getBigMapValue({ id: id.toString(), expr: encodedExpr }, block)
                    : yield this.context.readProvider.getBigMapValue({ id: id.toString(), expr: encodedExpr }, 'head');
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
                const bigMapValues = new michelsonEncoder.MichelsonMap();
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
            return __awaiter(this, void 0, void 0, function* () {
                return keys.length === 1 || typeof block !== 'undefined'
                    ? block
                    : yield this.context.readProvider.getBlockLevel('head');
            });
        }
        getBigMapValueOrUndefined(keyToEncode, id, schema, level) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.getBigMapKeyByID(id, keyToEncode, schema, level);
                }
                catch (ex) {
                    if (ex instanceof httpUtils.HttpResponseError && ex.status === httpUtils.STATUS_CODE.NOT_FOUND) {
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
                    ? yield this.context.readProvider.getSaplingDiffById({ id: id.toString() }, block)
                    : yield this.context.readProvider.getSaplingDiffById({ id: id.toString() }, 'head');
                return saplingState;
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
                const preparedOrigination = yield this.prepare.originate(Object.assign(Object.assign({}, params), estimate));
                const content = preparedOrigination.opOb.contents.find((op) => op.kind === rpc.OpKind.ORIGINATION);
                const forgedOrigination = yield this.forge(preparedOrigination);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(forgedOrigination);
                return new OriginationOperation(hash, content, forgedBytes, opResponse, context, this);
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
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const sourceValidation = utils.validateAddress(params.source);
                if (params.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.source, utils.invalidDetail(sourceValidation));
                }
                const delegateValidation = utils.validateAddress((_a = params.delegate) !== null && _a !== void 0 ? _a : '');
                if (params.delegate && delegateValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.delegate, utils.invalidDetail(delegateValidation));
                }
                // Since babylon delegation source cannot smart contract
                if (/kt1/i.test(params.source)) {
                    throw new InvalidDelegationSource(params.source);
                }
                const publicKeyHash = yield this.signer.publicKeyHash();
                const sourceOrDefault = params.source || publicKeyHash;
                const estimate = yield this.estimate(params, this.estimator.setDelegate.bind(this.estimator));
                const preparedDelegation = yield this.prepare.delegation(Object.assign(Object.assign({}, params), estimate));
                const content = preparedDelegation.opOb.contents.find((op) => op.kind === rpc.OpKind.DELEGATION);
                const opBytes = yield this.forge(preparedDelegation);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new DelegateOperation(hash, content, sourceOrDefault, forgedBytes, opResponse, context);
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
                const prepared = yield this.prepare.registerDelegate(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.DELEGATION);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new DelegateOperation(hash, content, source, forgedBytes, opResponse, context);
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
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const toValidation = utils.validateAddress(params.to);
                if (toValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.to, utils.invalidDetail(toValidation));
                }
                const sourceValidation = utils.validateAddress((_a = params.source) !== null && _a !== void 0 ? _a : '');
                if (params.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.source, utils.invalidDetail(sourceValidation));
                }
                if (params.amount < 0) {
                    throw new core.InvalidAmountError(params.amount.toString());
                }
                const publicKeyHash = yield this.signer.publicKeyHash();
                const estimate = yield this.estimate(params, this.estimator.transfer.bind(this.estimator));
                const source = params.source || publicKeyHash;
                const prepared = yield this.prepare.transaction(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.TRANSACTION);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new TransactionOperation(hash, content, source, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Transfer Tickets to a smart contract address
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param TransferTicketParams operation parameter
         */
        transferTicket(params) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const destinationValidation = utils.validateAddress(params.destination);
                if (destinationValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.destination, utils.invalidDetail(destinationValidation));
                }
                const sourceValidation = utils.validateAddress((_a = params.source) !== null && _a !== void 0 ? _a : '');
                if (params.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.source, utils.invalidDetail(sourceValidation));
                }
                const publicKeyHash = yield this.signer.publicKeyHash();
                const source = (_b = params.source) !== null && _b !== void 0 ? _b : publicKeyHash;
                const estimate = yield this.estimate(params, this.estimator.transferTicket.bind(this.estimator));
                const prepared = yield this.prepare.transferTicket(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.TRANSFER_TICKET);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new TransferTicketOperation(hash, content, source, forgedBytes, opResponse, context);
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
                    const prepared = yield this.prepare.reveal(Object.assign(Object.assign({}, params), estimated));
                    const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.REVEAL);
                    const opBytes = yield this.forge(prepared);
                    const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                    return new RevealOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
                }
                else {
                    throw new RevealOperationError(`The publicKeyHash '${publicKeyHash}' has already been revealed.`);
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
                const publicKeyHash = yield this.signer.publicKeyHash();
                const estimate = yield this.estimate(params, this.estimator.registerGlobalConstant.bind(this.estimator));
                const prepared = yield this.prepare.registerGlobalConstant(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.REGISTER_GLOBAL_CONSTANT);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new RegisterGlobalConstantOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Increase the paid storage of a smart contract
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param params increasePaidStorage operation parameter
         */
        increasePaidStorage(params) {
            return __awaiter(this, void 0, void 0, function* () {
                if (params.amount < 0) {
                    throw new core.InvalidAmountError(params.amount.toString());
                }
                const publicKeyHash = yield this.signer.publicKeyHash();
                const estimate = yield this.estimate(params, this.estimator.increasePaidStorage.bind(this.estimator));
                const prepared = yield this.prepare.increasePaidStorage(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.INCREASE_PAID_STORAGE);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new IncreasePaidStorageOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Transfers the spendable balance of the delegate to destination when consensus_key is the active consensus key of delegate
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param params drainDelegate operation parameter
         */
        drainDelegate(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const prepared = yield this.prepare.drainDelegate(params);
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.DRAIN_DELEGATE);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new DrainDelegateOperation(hash, content, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Submit a ballot vote to a specified proposal
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param BallotParams Ballot operation parameter
         */
        ballot(params) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const publicKeyHash = yield this.signer.publicKeyHash();
                const sourceValidation = utils.validateAddress((_a = params.source) !== null && _a !== void 0 ? _a : '');
                if (params.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.source, utils.invalidDetail(sourceValidation));
                }
                const source = (_b = params.source) !== null && _b !== void 0 ? _b : publicKeyHash;
                const prepared = yield this.prepare.ballot(Object.assign(Object.assign({}, params), { source }));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.BALLOT);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new BallotOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Submit or upvote a proposal during the Proposal period
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param ProposalsParams Proposals operation parameter
         */
        proposals(params) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const publicKeyHash = yield this.signer.publicKeyHash();
                const sourceValidation = utils.validateAddress((_a = params.source) !== null && _a !== void 0 ? _a : '');
                if (params.source && sourceValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidAddressError(params.source, utils.invalidDetail(sourceValidation));
                }
                const source = (_b = params.source) !== null && _b !== void 0 ? _b : publicKeyHash;
                const prepared = yield this.prepare.proposals(Object.assign(Object.assign({}, params), { source }));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.PROPOSALS);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new ProposalsOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Updates the consensus key of the baker to public_key starting from the current cycle plus PRESERVED_CYCLES + 1
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param UpdateConsensusKeyParams
         */
        updateConsensusKey(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const publicKeyHash = yield this.signer.publicKeyHash();
                const estimate = yield this.estimate(params, this.estimator.updateConsensusKey.bind(this.estimator));
                const prepared = yield this.prepare.updateConsensusKey(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.UPDATE_CONSENSUS_KEY);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new UpdateConsensusKeyOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         * @description Adds messages to the rollup inbox that can be executed/claimed after it gets cemented
         * @param SmartRollupAddMessagesParams
         * @returns An operation handle with results from the RPC node
         */
        smartRollupAddMessages(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const publicKeyHash = yield this.signer.publicKeyHash();
                const estimate = yield this.estimate(params, this.estimator.smartRollupAddMessages.bind(this.estimator));
                const prepared = yield this.prepare.smartRollupAddMessages(Object.assign(Object.assign({}, params), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.SMART_ROLLUP_ADD_MESSAGES);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new SmartRollupAddMessagesOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         * @description Creates a smart rollup originate operation
         * @param SmartRollupOriginateParams
         * @returns An operation handle with results from the RPC node
         */
        smartRollupOriginate(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const publicKeyHash = yield this.signer.publicKeyHash();
                const estimate = yield this.estimate(params, this.estimator.smartRollupOriginate.bind(this.estimator));
                const originationProof = yield this.rpc.getOriginationProof({
                    kind: params.pvmKind,
                    kernel: params.kernel,
                });
                const completeParams = Object.assign(Object.assign({}, params), { originationProof });
                const prepared = yield this.prepare.smartRollupOriginate(Object.assign(Object.assign({}, completeParams), estimate));
                const content = prepared.opOb.contents.find((op) => op.kind === rpc.OpKind.SMART_ROLLUP_ORIGINATE);
                const opBytes = yield this.forge(prepared);
                const { hash, context, forgedBytes, opResponse } = yield this.signAndInject(opBytes);
                return new SmartRollupOriginateOperation(hash, content, publicKeyHash, forgedBytes, opResponse, context);
            });
        }
        /**
         *
         * @description Create an smart contract abstraction for the address specified.
         *
         * @param address Smart contract address
         * @throws {@link InvalidContractAddressError}
         */
        at(address, contractAbstractionComposer = (x) => x) {
            return __awaiter(this, void 0, void 0, function* () {
                const addressValidation = utils.validateContractAddress(address);
                if (addressValidation !== utils.ValidationResult.VALID) {
                    throw new core.InvalidContractAddressError(address, utils.invalidDetail(addressValidation));
                }
                const rpc = this.context.withExtensions().rpc;
                const readProvider = this.context.withExtensions().readProvider;
                const script = yield readProvider.getScript(address, 'head');
                const entrypoints = yield readProvider.getEntrypoints(address);
                const abs = new ContractAbstraction(address, script, this, this, entrypoints, rpc, readProvider);
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
                if (!this.context.proto) {
                    const nextProto = yield this.context.readProvider.getNextProtocol('head');
                    this.context.proto = nextProto;
                }
                return this.context.proto;
            });
        }
        parseScript(src) {
            return __awaiter(this, void 0, void 0, function* () {
                const parser = new michelCodec.Parser({ protocol: yield this.getNextProto() });
                return parser.parseScript(src);
            });
        }
        parseMichelineExpression(src) {
            return __awaiter(this, void 0, void 0, function* () {
                const parser = new michelCodec.Parser({ protocol: yield this.getNextProto() });
                return parser.parseMichelineExpression(src);
            });
        }
        parseJSON(src) {
            return __awaiter(this, void 0, void 0, function* () {
                const parser = new michelCodec.Parser({ protocol: yield this.getNextProto() });
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
                    const schema = new michelsonEncoder.Schema(storageType.args[0]);
                    const globalconstantsHashAndValue = yield this.findGlobalConstantsHashAndValue(schema);
                    if (Object.keys(globalconstantsHashAndValue).length !== 0) {
                        // If there are global constants in the storage part of the contract code,
                        // they need to be locally expanded in order to encode the storage arguments
                        const p = new michelCodec.Parser({ expandGlobalConstant: globalconstantsHashAndValue });
                        const storageTypeNoGlobalConst = p.parseJSON(storageType.args[0]);
                        const schemaNoGlobalConst = new michelsonEncoder.Schema(storageTypeNoGlobalConst);
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
                            const expression = tokenArgs[0];
                            if (expression.string) {
                                const hash = expression.string;
                                const michelineValue = yield this.context.globalConstantsProvider.getGlobalConstantByHash(hash);
                                Object.assign(globalConstantsHashAndValue, {
                                    [hash]: michelineValue,
                                });
                            }
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

    /**
     *  @category Error
     *  @description Error that indicates that a global constant does not exist
     */
    class GlobalConstantNotFound extends Error {
        constructor(hash) {
            super(`Please load the value associated with the constant ${hash} using the loadGlobalConstant method of the DefaultGlobalConstantsProvider.`);
            this.hash = hash;
            this.name = 'GlobalConstantNotFound';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates the global constant provider not being configured under TezosToolkit
     */
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

    /**
     * @description Converts calls from TzReadProvider into calls to the wrapped RpcClient in a format it can understand.
     */
    class RpcReadAdapter {
        constructor(rpc) {
            this.rpc = rpc;
        }
        /**
         * @description Access the balance of a contract.
         * @param address address from which we want to retrieve the balance
         * @param block from which we want to retrieve the balance
         * @returns the balance in mutez
         */
        getBalance(address, block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getBalance(address, { block: String(block) });
            });
        }
        /**
         * @description Access the delegate of a contract, if any.
         * @param address contract address from which we want to retrieve the delegate (baker)
         * @param block from which we want to retrieve the delegate
         * @returns the public key hash of the delegate or null if no delegate
         */
        getDelegate(address, block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getDelegate(address, { block: String(block) });
            });
        }
        /**
         * @description Access the next protocol hash
         * @param block from which we want to retrieve the next protocol hash
         */
        getNextProtocol(block) {
            return __awaiter(this, void 0, void 0, function* () {
                const protocols = yield this.rpc.getProtocols({ block: String(block) });
                return protocols.next_protocol;
            });
        }
        /**
         * @description Access protocol constants used in Taquito
         * @param block from which we want to retrieve the constants
         */
        getProtocolConstants(block) {
            return __awaiter(this, void 0, void 0, function* () {
                const { time_between_blocks, minimal_block_delay, hard_gas_limit_per_operation, hard_gas_limit_per_block, hard_storage_limit_per_operation, cost_per_byte, tx_rollup_origination_size, smart_rollup_origination_size, } = yield this.rpc.getConstants({ block: String(block) });
                return {
                    time_between_blocks,
                    minimal_block_delay,
                    hard_gas_limit_per_operation,
                    hard_gas_limit_per_block,
                    hard_storage_limit_per_operation,
                    cost_per_byte,
                    tx_rollup_origination_size,
                    smart_rollup_origination_size,
                };
            });
        }
        /**
         * @description Access the script (code and storage) of a smart contract
         * @param contract contract address from which we want to retrieve the script
         * @param block from which we want to retrieve the storage value
         * @returns Note: The code must be in the JSON format and not contain global constant
         */
        getScript(contract, block) {
            return __awaiter(this, void 0, void 0, function* () {
                const { script } = yield this.rpc.getContract(contract, { block: String(block) });
                return script;
            });
        }
        /**
         * @description Access the storage value of a contract
         * @param contract contract address from which we want to retrieve the storage
         * @param block from which we want to retrieve the storage value
         */
        getStorage(contract, block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getStorage(contract, { block: String(block) });
            });
        }
        /**
         * @description Access the block hash
         */
        getBlockHash(block) {
            return __awaiter(this, void 0, void 0, function* () {
                const { hash } = yield this.rpc.getBlockHeader({ block: String(block) });
                return hash;
            });
        }
        /**
         * @description Access the block level
         */
        getBlockLevel(block) {
            return __awaiter(this, void 0, void 0, function* () {
                const { level } = yield this.rpc.getBlockHeader({ block: String(block) });
                return level;
            });
        }
        /**
         * @description Access the counter of an address
         * @param pkh from which we want to retrieve the counter
         * @param block from which we want to retrieve the counter
         */
        getCounter(pkh, block) {
            return __awaiter(this, void 0, void 0, function* () {
                const { counter } = yield this.rpc.getContract(pkh, { block: String(block) });
                return counter || '0';
            });
        }
        /**
         * @description Access the timestamp of a block
         * @param block from which we want to retrieve the timestamp
         * @returns date ISO format zero UTC offset ("2022-01-19T22:37:07Z")
         */
        getBlockTimestamp(block) {
            return __awaiter(this, void 0, void 0, function* () {
                const { timestamp } = yield this.rpc.getBlockHeader({ block: String(block) });
                return timestamp;
            });
        }
        /**
         * @description Access the value associated with a key in a big map.
         * @param bigMapQuery Big Map ID and Expression hash to query (A b58check encoded Blake2b hash of the expression)
         * @param block from which we want to retrieve the big map value
         */
        getBigMapValue(bigMapQuery, block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getBigMapExpr(bigMapQuery.id, bigMapQuery.expr, {
                    block: String(block),
                });
            });
        }
        /**
         * @description Access the value associated with a sapling state ID.
         * @param id Sapling state ID
         * @param block from which we want to retrieve the sapling state
         */
        getSaplingDiffById(saplingStateQuery, block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getSaplingDiffById(saplingStateQuery.id, { block: String(block) });
            });
        }
        /**
         * @description Access the sapling state of a smart contract.
         * @param contractAddress The address of the smart contract
         * @param block The block you want to retrieve the sapling state from
         */
        getSaplingDiffByContract(contractAddress, block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getSaplingDiffByContract(contractAddress, { block: String(block) });
            });
        }
        /**
         * @description Return the list of entrypoints of the contract
         * @param contract address of the contract we want to get the entrypoints of
         */
        getEntrypoints(contract) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getEntrypoints(contract);
            });
        }
        /**
         * @description Access the chain id
         */
        getChainId() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getChainId();
            });
        }
        /**
         * @description Indicate if an account is revealed
         * @param publicKeyHash of the account
         * @param block from which we want to know if the account is revealed
         */
        isAccountRevealed(publicKeyHash, block) {
            return __awaiter(this, void 0, void 0, function* () {
                const manager = yield this.rpc.getManagerKey(publicKeyHash, { block: String(block) });
                const haveManager = manager && typeof manager === 'object' ? !!manager.key : !!manager;
                return haveManager;
            });
        }
        /**
         * @description Return all the information about a block
         * @param block from which we want to retrieve the information
         */
        getBlock(block) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.rpc.getBlock({ block: String(block) });
            });
        }
        /**
         * @description Return a list of the ancestors of the given block which, if referred to as the branch in an operation header, are recent enough for that operation to be included in the current block.
         * @param block from which we want to retrieve the information
         */
        getLiveBlocks(block) {
            return this.rpc.getLiveBlocks({ block: String(block) });
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
                    return x.metadata.operation_result.originated_contracts.some((contract) => contract === filter.destination);
                }
                break;
            case 'transaction':
                return x.destination === filter.destination;
            default:
                return false;
        }
    };
    const eventFilter = (result, address, tag, excludeFailedOperations) => {
        if (result.kind !== 'event') {
            return false;
        }
        if (tag && result.tag !== tag) {
            return false;
        }
        if (address && result.source !== address) {
            return false;
        }
        if (excludeFailedOperations && result.result.status !== 'applied') {
            return false;
        }
        return true;
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
            throw new InvalidFilterExpressionError('Filter expression must contain either and/or property');
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
    /**
     *  @category Error
     *  @description Error that indicates an unsupported event being passed or used
     */
    class UnsupportedEventError extends Error {
        constructor(message) {
            super(message);
            this.message = message;
            this.name = 'UnsupportedEventError';
        }
    }
    class ObservableSubscription {
        constructor(obs, shouldRetry = false, operatorFunction = operators.retry()) {
            this.shouldRetry = shouldRetry;
            this.operatorFunction = operatorFunction;
            this.errorListeners = [];
            this.messageListeners = [];
            this.closeListeners = [];
            this.completed$ = new rxjs.Subject();
            obs
                .pipe(operators.takeUntil(this.completed$), operators.tap((data) => {
                this.call(this.messageListeners, data);
            }, (error) => {
                this.call(this.errorListeners, error);
            }, () => {
                this.call(this.closeListeners);
            }), this.shouldRetry ? operatorFunction : operators.tap(), operators.catchError(() => rxjs.NEVER))
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
                    throw new UnsupportedEventError(`Trying to register on an unsupported event: ${type}`);
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
                    throw new UnsupportedEventError(`Trying to unregister on an unsupported event: ${type}`);
            }
        }
        close() {
            this.completed$.next();
        }
    }

    const defaultConfigStreamer = {
        shouldObservableSubscriptionRetry: false,
        observableSubscriptionRetryFunction: operators.retry(),
    };
    const getLastBlock = (context) => {
        return rxjs.from(context.rpc.getBlock()).pipe(operators.first());
    };
    const applyFilter = (filter) => operators.concatMap((block) => {
        return new rxjs.Observable((sub) => {
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
    const applyEventFilter = (filter) => operators.concatMap((block) => {
        return new rxjs.Observable((sub) => {
            for (const ops of block.operations) {
                for (const op of ops) {
                    for (const content of op.contents) {
                        const tx = content;
                        const internalOpResults = tx.metadata.internal_operation_results;
                        if (internalOpResults) {
                            for (const event of internalOpResults) {
                                if (eventFilter(event, filter === null || filter === void 0 ? void 0 : filter.address, filter === null || filter === void 0 ? void 0 : filter.tag, filter === null || filter === void 0 ? void 0 : filter.excludeFailedOperations)) {
                                    sub.next(Object.assign({ opHash: op.hash, blockHash: block.hash, level: block.header.level }, event));
                                }
                            }
                        }
                    }
                }
            }
            sub.complete();
        });
    });
    class PollingSubscribeProvider {
        constructor(context, config = {}) {
            this.context = context;
            this._config$ = new rxjs.BehaviorSubject(Object.assign(Object.assign({}, defaultConfigStreamer), config));
            this.timer$ = this._config$.pipe(operators.pluck('pollingIntervalMilliseconds'), operators.switchMap((pollingIntervalMilliseconds) => {
                if (!pollingIntervalMilliseconds) {
                    return rxjs.from(this.getConfirmationPollingInterval()).pipe(operators.switchMap((interval) => {
                        return rxjs.timer(0, interval);
                    }));
                }
                else {
                    return rxjs.timer(0, pollingIntervalMilliseconds);
                }
            }));
            this.newBlock$ = this.timer$.pipe(operators.switchMap(() => getLastBlock(this.context)), operators.distinctUntilKeyChanged('hash'), operators.publish(), operators.refCount());
        }
        get config() {
            return this._config$.getValue();
        }
        getConfirmationPollingInterval() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.config.pollingIntervalMilliseconds) {
                    const defaultIntervalTestnetsMainnet = 5000;
                    const defaultIntervalSandbox = 1000;
                    try {
                        const constants = yield this.context.readProvider.getProtocolConstants('head');
                        const blockTime = constants.minimal_block_delay
                            ? constants.minimal_block_delay.multipliedBy(1000)
                            : constants.time_between_blocks
                                ? constants.time_between_blocks[0].multipliedBy(1000)
                                : new BigNumber__default["default"](defaultIntervalTestnetsMainnet);
                        const confirmationPollingInterval = blockTime.dividedBy(3);
                        this.config.pollingIntervalMilliseconds =
                            confirmationPollingInterval.toNumber() === 0
                                ? defaultIntervalSandbox
                                : confirmationPollingInterval.toNumber();
                    }
                    catch (exception) {
                        return defaultIntervalTestnetsMainnet;
                    }
                }
                return this.config.pollingIntervalMilliseconds;
            });
        }
        subscribeBlock(_filter) {
            return new ObservableSubscription(this.newBlock$, this.config.shouldObservableSubscriptionRetry, this.config.observableSubscriptionRetryFunction);
        }
        subscribe(_filter) {
            return new ObservableSubscription(this.newBlock$.pipe(operators.pluck('hash')), this.config.shouldObservableSubscriptionRetry, this.config.observableSubscriptionRetryFunction);
        }
        subscribeOperation(filter) {
            return new ObservableSubscription(this.newBlock$.pipe(applyFilter(filter)), this.config.shouldObservableSubscriptionRetry, this.config.observableSubscriptionRetryFunction);
        }
        subscribeEvent(eventFilter) {
            return new ObservableSubscription(this.newBlock$.pipe(applyEventFilter(eventFilter)), this.config.shouldObservableSubscriptionRetry, this.config.observableSubscriptionRetryFunction);
        }
    }

    class TaquitoLocalForger {
        constructor(context) {
            this.context = context;
        }
        getNextProto() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.context.proto) {
                    const nextProto = yield this.context.readProvider.getNextProtocol('head');
                    this.context.proto = nextProto;
                }
                return this.context.proto;
            });
        }
        forge({ branch, contents }) {
            return __awaiter(this, void 0, void 0, function* () {
                const forger = new localForging.LocalForger(yield this.getNextProto());
                return forger.forge({ branch, contents });
            });
        }
    }

    const defaultConfigConfirmation = {
        defaultConfirmationCount: 1,
        confirmationPollingTimeoutSecond: 180,
    };
    /**
     * @description Encapsulate common service used throughout different part of the library
     */
    class Context {
        constructor(_rpc, _signer = new NoopSigner(), _proto, _config = new rxjs.BehaviorSubject(Object.assign({}, defaultConfigConfirmation)), forger, injector, packer, wallet, parser, globalConstantsProvider, readProvider, stream) {
            this._rpc = _rpc;
            this._signer = _signer;
            this._proto = _proto;
            this._config = _config;
            this.providerDecorator = [];
            this.tz = new RpcTzProvider(this);
            this.estimate = new RPCEstimateProvider(this);
            this.contract = new RpcContractProvider(this, this.estimate);
            this.prepare = new PrepareProvider(this);
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
                this._rpcClient = new rpc.RpcClient(this._rpc);
            }
            else {
                this._rpcClient = this._rpc;
            }
            this._forger = forger ? forger : new TaquitoLocalForger(this);
            this._injector = injector ? injector : new RpcInjector(this);
            this.operationFactory = new OperationFactory(this);
            this._walletProvider = wallet ? wallet : new LegacyWalletProvider(this);
            this._parser = parser ? parser : new MichelCodecParser(this);
            this._packer = packer ? packer : new RpcPacker(this);
            this._globalConstantsProvider = globalConstantsProvider
                ? globalConstantsProvider
                : new NoopGlobalConstantsProvider();
            this._readProvider = readProvider ? readProvider : new RpcReadAdapter(this._rpcClient);
            this._stream = stream ? stream : new PollingSubscribeProvider(this);
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
        get readProvider() {
            return this._readProvider;
        }
        set readProvider(value) {
            this._readProvider = value;
        }
        get stream() {
            return this._stream;
        }
        set stream(value) {
            this._stream = value;
        }
        isAnyProtocolActive(protocol = []) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._proto) {
                    return protocol.includes(this._proto);
                }
                else {
                    const next_protocol = yield this.readProvider.getNextProtocol('head');
                    return protocol.includes(next_protocol);
                }
            });
        }
        isAnySignerConfigured() {
            return !(this.signer instanceof NoopSigner);
        }
        /**
         * @description Create a copy of the current context. Useful when you have long running operation and you do not want a context change to affect the operation
         */
        clone() {
            return new Context(this.rpc, this.signer, this.proto, this._config, this.forger, this._injector, this.packer, this._walletProvider, this._parser, this._globalConstantsProvider, this._readProvider, this._stream);
        }
        /**
         * @description Allows extensions set on the TezosToolkit to inject logic into the context
         */
        registerProviderDecorator(fx) {
            this.providerDecorator.push(fx);
        }
    }

    // IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
    const VERSION = {
        "commitHash": "b357541c90c2168d48216d62a07de5dd3baab9a0",
        "version": "17.0.0"
    };

    /**
     *  @category Error
     *  @description Error that indicates a value mismatch when forging
     */
    class ForgingMismatchError extends Error {
        constructor(results) {
            super('Forging mismatch error');
            this.results = results;
            this.name = 'ForgingMismatchError';
        }
    }
    /**
     *  @category Error
     *  @description Error that indicates a forger not being specified in TezosToolkit
     */
    class UnspecifiedForgerError extends Error {
        constructor() {
            super('At least one forger must be specified');
            this.name = 'UnspecifiedForgerError';
        }
    }
    class CompositeForger {
        constructor(forgers) {
            this.forgers = forgers;
            if (forgers.length === 0) {
                throw new UnspecifiedForgerError();
            }
        }
        forge({ branch, contents }) {
            return __awaiter(this, void 0, void 0, function* () {
                const results = yield Promise.all(this.forgers.map((forger) => {
                    return forger.forge({ branch, contents });
                }));
                if (results.length === 0) {
                    throw new UnspecifiedForgerError();
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

    class RpcForger {
        constructor(context) {
            this.context = context;
        }
        forge({ branch, contents }) {
            return this.context.rpc.forgeOperations({ branch, contents });
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
                const { bytes } = michelCodec.packDataBytes(data.data, data.type);
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
            this.format = utils.format;
            if (typeof this._rpc === 'string') {
                this._rpcClient = new rpc.RpcClient(this._rpc);
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
        setProvider({ rpc, stream, signer, protocol, config, forger, wallet, packer, globalConstantsProvider, readProvider, parserProvider, }) {
            this.setRpcProvider(rpc);
            this.setStreamProvider(stream);
            this.setSignerProvider(signer);
            this.setForgerProvider(forger);
            this.setWalletProvider(wallet);
            this.setPackerProvider(packer);
            this.setGlobalConstantsProvider(globalConstantsProvider);
            this.setReadProvider(readProvider);
            this.setParserProvider(parserProvider);
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
        setRpcProvider(rpc$1) {
            if (typeof rpc$1 === 'string') {
                this._rpcClient = new rpc.RpcClient(rpc$1);
            }
            else if (rpc$1 === undefined) ;
            else {
                this._rpcClient = rpc$1;
            }
            this._options.rpc = this._rpcClient;
            this._context.rpc = this._rpcClient;
        }
        /**
         * @description Sets forger provider on the Tezos Taquito instance
         * The `LocalForger` from `@taquito/local-forging` is set by default.
         *
         * @param options forger to use to interact with the Tezos network
         *
         * @example Tezos.setForgerProvider(this.getFactory(RpcForger)())
         *
         */
        setForgerProvider(forger) {
            if (typeof forger !== 'undefined') {
                this._options.forger = forger;
                this._context.forger = forger;
            }
            else if (this._options.forger === undefined) {
                const f = this.getFactory(TaquitoLocalForger)();
                this._options.forger = f;
                this._context.forger = f;
            }
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
                const s = new PollingSubscribeProvider(new Context(new rpc.RpcClient(stream)));
                this._options.stream = s;
                this._context.stream = s;
            }
            else if (typeof stream !== 'undefined') {
                this._options.stream = stream;
                this._context.stream = stream;
            }
            else if (this._options.stream === undefined) {
                const s = this.getFactory(PollingSubscribeProvider)();
                this._options.stream = s;
                this._context.stream = s;
            }
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
            if (!this._options.packer && typeof packer === 'undefined') {
                const p = this.getFactory(RpcPacker)();
                this._context.packer = p;
                this._options.packer = p;
            }
            else if (typeof packer !== 'undefined') {
                this._context.packer = packer;
                this._options.packer = packer;
            }
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
            if (!this._options.globalConstantsProvider && typeof globalConstantsProvider === 'undefined') {
                const g = new NoopGlobalConstantsProvider();
                this._context.globalConstantsProvider = g;
                this._options.globalConstantsProvider = g;
            }
            else if (typeof globalConstantsProvider !== 'undefined') {
                this._context.globalConstantsProvider = globalConstantsProvider;
                this._options.globalConstantsProvider = globalConstantsProvider;
            }
        }
        /**
         * @description Sets read provider on the Tezos Taquito instance
         * By default reads are done from the RPC usign the RpcReadAdapter class, this can be overridden to read from an indexer that implements the TzReadProvider interface
         *
         * @param options TzReadProvider to use to interact with the Tezos network
         *
         */
        setReadProvider(readProvider) {
            const readP = readProvider ? readProvider : new RpcReadAdapter(this._context.rpc);
            this._options.readProvider = readP;
            this._context.readProvider = readP;
        }
        /**
         * @description Sets parser provider on the Tezos Taquito instance
         *
         * @param options parserProvider to use to interact with the Tezos network
         *
         */
        setParserProvider(parserProvider) {
            if (!this._options.parserProvider && typeof parserProvider === 'undefined') {
                const p = new MichelCodecParser(this._context);
                this._context.parser = p;
                this._options.parserProvider = p;
            }
            else if (typeof parserProvider !== 'undefined') {
                this._context.parser = parserProvider;
                this._options.parserProvider = parserProvider;
            }
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
        /**
         * @description Provide access to tezos operation preparation utilities
         */
        get prepare() {
            return this._context.prepare;
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
            return this._context.stream;
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

    Object.defineProperty(exports, 'OpKind', {
        enumerable: true,
        get: function () { return rpc.OpKind; }
    });
    Object.defineProperty(exports, 'MichelsonMap', {
        enumerable: true,
        get: function () { return michelsonEncoder.MichelsonMap; }
    });
    Object.defineProperty(exports, 'UnitValue', {
        enumerable: true,
        get: function () { return michelsonEncoder.UnitValue; }
    });
    exports.BallotOperation = BallotOperation;
    exports.BatchOperation = BatchOperation;
    exports.BigMapAbstraction = BigMapAbstraction;
    exports.COST_PER_BYTE = COST_PER_BYTE;
    exports.CompositeForger = CompositeForger;
    exports.Context = Context;
    exports.ContractAbstraction = ContractAbstraction;
    exports.ContractMethod = ContractMethod;
    exports.ContractMethodObject = ContractMethodObject;
    exports.ContractView = ContractView;
    exports.DEFAULT_SMART_CONTRACT_METHOD_NAME = DEFAULT_SMART_CONTRACT_METHOD_NAME;
    exports.DefaultGlobalConstantsProvider = DefaultGlobalConstantsProvider;
    exports.DelegateOperation = DelegateOperation;
    exports.DelegationWalletOperation = DelegationWalletOperation;
    exports.DrainDelegateOperation = DrainDelegateOperation;
    exports.Estimate = Estimate;
    exports.GlobalConstantNotFound = GlobalConstantNotFound;
    exports.IntegerError = IntegerError;
    exports.InvalidCodeParameter = InvalidCodeParameter;
    exports.InvalidDelegationSource = InvalidDelegationSource;
    exports.InvalidEstimateValueError = InvalidEstimateValueError;
    exports.InvalidInitParameter = InvalidInitParameter;
    exports.InvalidParameterError = InvalidParameterError;
    exports.InvalidViewSimulationContext = InvalidViewSimulationContext;
    exports.LegacyWalletProvider = LegacyWalletProvider;
    exports.MANAGER_LAMBDA = MANAGER_LAMBDA;
    exports.MichelCodecPacker = MichelCodecPacker;
    exports.MichelCodecParser = MichelCodecParser;
    exports.NoopParser = NoopParser;
    exports.ObservableSubscription = ObservableSubscription;
    exports.Operation = Operation;
    exports.OperationBatch = OperationBatch;
    exports.OriginationOperation = OriginationOperation;
    exports.OriginationParameterError = OriginationParameterError;
    exports.OriginationWalletOperation = OriginationWalletOperation;
    exports.PollingSubscribeProvider = PollingSubscribeProvider;
    exports.PrepareProvider = PrepareProvider;
    exports.RPCEstimateProvider = RPCEstimateProvider;
    exports.RevealEstimateError = RevealEstimateError;
    exports.RevealOperationError = RevealOperationError;
    exports.RpcForger = RpcForger;
    exports.RpcPacker = RpcPacker;
    exports.RpcReadAdapter = RpcReadAdapter;
    exports.SaplingStateAbstraction = SaplingStateAbstraction;
    exports.TaquitoLocalForger = TaquitoLocalForger;
    exports.TezosOperationError = TezosOperationError;
    exports.TezosPreapplyFailureError = TezosPreapplyFailureError;
    exports.TezosToolkit = TezosToolkit;
    exports.TransactionOperation = TransactionOperation;
    exports.TransactionWalletOperation = TransactionWalletOperation;
    exports.UnconfiguredGlobalConstantsProviderError = UnconfiguredGlobalConstantsProviderError;
    exports.VIEW_LAMBDA = VIEW_LAMBDA;
    exports.ViewSimulationError = ViewSimulationError;
    exports.Wallet = Wallet;
    exports.WalletOperation = WalletOperation;
    exports.WalletOperationBatch = WalletOperationBatch;
    exports.compose = compose;
    exports.createActivationOperation = createActivationOperation;
    exports.createBallotOperation = createBallotOperation;
    exports.createDrainDelegateOperation = createDrainDelegateOperation;
    exports.createIncreasePaidStorageOperation = createIncreasePaidStorageOperation;
    exports.createOriginationOperation = createOriginationOperation;
    exports.createProposalsOperation = createProposalsOperation;
    exports.createRegisterDelegateOperation = createRegisterDelegateOperation;
    exports.createRegisterGlobalConstantOperation = createRegisterGlobalConstantOperation;
    exports.createRevealOperation = createRevealOperation;
    exports.createSetDelegateOperation = createSetDelegateOperation;
    exports.createSmartRollupAddMessagesOperation = createSmartRollupAddMessagesOperation;
    exports.createSmartRollupOriginateOperation = createSmartRollupOriginateOperation;
    exports.createTransferOperation = createTransferOperation;
    exports.createTransferTicketOperation = createTransferTicketOperation;
    exports.createUpdateConsensusKeyOperation = createUpdateConsensusKeyOperation;
    exports.defaultConfigConfirmation = defaultConfigConfirmation;
    exports.getRevealGasLimit = getRevealGasLimit;
    exports.protocols = protocols;
    exports.validateAndExtractFailwith = validateAndExtractFailwith;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=taquito.umd.js.map
