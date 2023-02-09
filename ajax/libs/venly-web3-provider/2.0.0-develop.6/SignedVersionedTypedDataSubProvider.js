"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedVersionedTypedDataSubProvider = void 0;
const Subprovider = require('@arkane-network/web3-provider-engine/subproviders/subprovider');
class SignedVersionedTypedDataSubProvider extends Subprovider {
    constructor(VenlyWalletSubProvider) {
        super();
        this.VenlyWalletSubProvider = VenlyWalletSubProvider;
    }
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    // tslint:disable-next-line:prefer-function-over-method async-suffix
    handleRequest(payload, next, end) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (payload.method) {
                case 'eth_signTypedData_v4':
                case 'eth_signTypedData_v3':
                case 'eth_signTypedData_v2':
                    if (!payload.params[0] || !payload.params[1]) {
                        end(new Error('Missing parameters for signing data, 2 params needed: address, eip712Data'));
                    }
                    else {
                        let result = yield this.VenlyWalletSubProvider.signTypedDataAsync(payload.params[0], payload.params[1]);
                        end(null, result);
                    }
                    return;
                default:
                    next();
                    return;
            }
        });
    }
}
exports.SignedVersionedTypedDataSubProvider = SignedVersionedTypedDataSubProvider;
