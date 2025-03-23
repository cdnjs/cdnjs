/*
    This file is part of @erc725/erc725.js.
    @erc725/erc725.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    @erc725/erc725.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file providers/web3ProviderWrapper.ts
 * @author Robert McLeod <@robertdavid010>, Fabian Vogelsteller <fabian@lukso.network>
 * @date 2020
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
  This file will handle querying the Ethereum web3 rpc based on a given provider
  in accordance with implementation of smart contract interfaces of ERC725
*/
import { encodeParameter, encodeParameters } from 'web3-eth-abi';
import { Method } from '../types/Method';
import { constructJSONRPC, decodeResult } from '../lib/provider-wrapper-utils';
import { ProviderTypes } from '../types/provider';
import { ERC725_VERSION, ERC725Y_INTERFACE_IDS } from '../constants/constants';
export class ProviderWrapper {
    constructor(provider, gasInfo) {
        if (typeof provider.request === 'function') {
            this.type = ProviderTypes.ETHEREUM;
        }
        else {
            this.type = ProviderTypes.WEB3;
        }
        this.provider = provider;
        this.gas = gasInfo;
    }
    getOwner(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.callContract(constructJSONRPC(address, Method.OWNER, this.gas));
            return decodeResult(Method.OWNER, result);
        });
    }
    getErc725YVersion(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const isErc725Yv5 = yield this.supportsInterface(address, ERC725Y_INTERFACE_IDS['5.0']);
            if (isErc725Yv5) {
                return ERC725_VERSION.ERC725_v5;
            }
            const isErc725Yv3 = yield this.supportsInterface(address, ERC725Y_INTERFACE_IDS['3.0']);
            // The version 3 of the package can use the getData function from v2, still compatible
            if (isErc725Yv3) {
                return ERC725_VERSION.ERC725_v2;
            }
            const isErc725Yv2 = yield this.supportsInterface(address, ERC725Y_INTERFACE_IDS['2.0']);
            if (isErc725Yv2) {
                return ERC725_VERSION.ERC725_v2;
            }
            // v0.2.0 and v0.6.0 have the same function signatures for getData, only versions before v0.2.0 requires a different call
            const isErc725YLegacy = yield this.supportsInterface(address, ERC725Y_INTERFACE_IDS.legacy);
            if (isErc725YLegacy) {
                return ERC725_VERSION.ERC725_LEGACY;
            }
            return ERC725_VERSION.NOT_ERC725;
        });
    }
    /**
     * https://eips.ethereum.org/EIPS/eip-165
     *
     * @param address the smart contract address
     * @param interfaceId ERC-165 identifier as described here: https://github.com/ERC725Alliance/ERC725/blob/develop/docs/ERC-725.md#specification
     */
    supportsInterface(address, interfaceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.callContract(constructJSONRPC(address, Method.SUPPORTS_INTERFACE, this.gas, `${interfaceId}${'00000000000000000000000000000000000000000000000000000000'}`));
            return decodeResult(Method.SUPPORTS_INTERFACE, result);
        });
    }
    /**
     * https://eips.ethereum.org/EIPS/eip-1271
     *
     * @param address the contract address
     * @param hash
     * @param signature
     */
    isValidSignature(address, hash, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type === ProviderTypes.ETHEREUM) {
                const encodedParams = encodeParameters(['bytes32', 'bytes'], [hash, signature]);
                const result = yield this.callContract(constructJSONRPC(address, Method.IS_VALID_SIGNATURE, undefined, // this.gas,
                encodedParams));
                if (result.error) {
                    throw result.error;
                }
                // Passing Method.IS_VALID_SIGNATURE ensures this will be string
                return decodeResult(Method.IS_VALID_SIGNATURE, result);
            }
            const encodedParams = encodeParameters(['bytes32', 'bytes'], [hash, signature]);
            const results = yield this.callContract([
                constructJSONRPC(address, Method.IS_VALID_SIGNATURE, undefined, // this.gas,
                encodedParams),
            ]);
            if (results.error) {
                throw results.error;
            }
            // Passing Method.IS_VALID_SIGNATURE ensures this will be string
            return decodeResult(Method.IS_VALID_SIGNATURE, results[0].result);
        });
    }
    getData(address, keyHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAllData(address, [keyHash]);
            try {
                return result[0].value;
            }
            catch (_a) {
                return null;
            }
        });
    }
    getAllData(address, keyHashes) {
        return __awaiter(this, void 0, void 0, function* () {
            const erc725Version = yield this.getErc725YVersion(address);
            if (erc725Version === ERC725_VERSION.NOT_ERC725) {
                throw new Error(`Contract: ${address} does not support ERC725Y interface.`);
            }
            switch (erc725Version) {
                case ERC725_VERSION.ERC725_v5:
                    return this._getAllDataGeneric(address, keyHashes, Method.GET_DATA_BATCH);
                case ERC725_VERSION.ERC725_v2:
                    return this._getAllDataGeneric(address, keyHashes, Method.GET_DATA);
                case ERC725_VERSION.ERC725_LEGACY:
                    return this._getAllDataLegacy(address, keyHashes);
                default:
                    return [];
            }
        });
    }
    _getAllDataGeneric(address, keyHashes, method) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type === ProviderTypes.ETHEREUM) {
                const encodedResults = yield this.callContract(constructJSONRPC(address, method, undefined, // this.gas,
                encodeParameter('bytes32[]', keyHashes)));
                const decodedValues = decodeResult(method, encodedResults);
                return keyHashes.map((keyHash, index) => ({
                    key: keyHash,
                    value: decodedValues ? decodedValues[index] : decodedValues,
                }));
            }
            const payload = [
                constructJSONRPC(address, method, undefined, // this.gas,
                encodeParameter('bytes32[]', keyHashes)),
            ];
            const results = yield this.callContract(payload);
            const decodedValues = decodeResult(method, results[0].result);
            return keyHashes.map((key, index) => ({
                key,
                value: decodedValues ? decodedValues[index] : decodedValues,
            }));
        });
    }
    _getAllDataLegacy(address, keyHashes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type === ProviderTypes.ETHEREUM) {
                // Here we could use `getDataMultiple` instead of sending multiple calls to `getData`
                // But this is already legacy and it won't be used anymore..
                const encodedResultsPromises = keyHashes.map((keyHash) => this.callContract(constructJSONRPC(address, Method.GET_DATA_LEGACY, this.gas, keyHash)));
                const decodedResults = yield Promise.all(encodedResultsPromises);
                return decodedResults.map((decodedResult, index) => ({
                    key: keyHashes[index],
                    value: decodeResult(Method.GET_DATA_LEGACY, decodedResult),
                }));
            }
            const payload = [];
            // Here we could use `getDataMultiple` instead of sending multiple calls to `getData`
            // But this is already legacy and it won't be used anymore..
            for (let index = 0; index < keyHashes.length; index++) {
                payload.push(constructJSONRPC(address, Method.GET_DATA_LEGACY, this.gas, keyHashes[index]));
            }
            const results = yield this.callContract(payload);
            return payload.map((payloadCall, index) => ({
                key: keyHashes[index],
                value: decodeResult(Method.GET_DATA_LEGACY, results.find((element) => payloadCall.id === element.id).result),
            }));
        });
    }
    callContract(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Make this mock provider always return the result in terms of data.
            // So if the result is wrapped in an object as result.result then unwrap it.
            // Some code was assuming it's wrapped and other was it's not wrapped.
            if (this.type === ProviderTypes.ETHEREUM) {
                const result = yield this.provider.request(payload);
                if (result.error) {
                    const error = new Error('Call failed');
                    Object.assign(error, result.error);
                    throw error;
                }
                if (result.result) {
                    return result.result;
                }
                return result;
            }
            return new Promise((resolve, reject) => {
                // Send old web3 method with callback to resolve promise
                // This is deprecated: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-send-deprecated
                this.provider.send(payload, (e, r) => {
                    if (e) {
                        reject(e);
                    }
                    else {
                        if (r.error) {
                            let error;
                            ({ error } = r);
                            if (!(error instanceof Error)) {
                                error = new Error('Call failed');
                                Object.assign(error, r.error);
                            }
                            reject(error);
                            return;
                        }
                        if (r.result) {
                            resolve(r.result);
                            return;
                        }
                        resolve(r);
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=providerWrapper.js.map