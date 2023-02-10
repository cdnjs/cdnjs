"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowMode = exports.WalletSubproviderErrors = void 0;
var WalletSubproviderErrors;
(function (WalletSubproviderErrors) {
    WalletSubproviderErrors["AddressNotFound"] = "ADDRESS_NOT_FOUND";
    WalletSubproviderErrors["DataMissingForSignPersonalMessage"] = "DATA_MISSING_FOR_SIGN_PERSONAL_MESSAGE";
    WalletSubproviderErrors["DataMissingForSignTypedData"] = "DATA_MISSING_FOR_SIGN_TYPED_DATA";
    WalletSubproviderErrors["SenderInvalidOrNotSupplied"] = "SENDER_INVALID_OR_NOT_SUPPLIED";
    WalletSubproviderErrors["FromAddressMissingOrInvalid"] = "FROM_ADDRESS_MISSING_OR_INVALID";
    WalletSubproviderErrors["MethodNotSupported"] = "METHOD_NOT_SUPPORTED";
})(WalletSubproviderErrors = exports.WalletSubproviderErrors || (exports.WalletSubproviderErrors = {}));
var WindowMode;
(function (WindowMode) {
    WindowMode["POPUP"] = "POPUP";
    WindowMode["REDIRECT"] = "REDIRECT";
})(WindowMode = exports.WindowMode || (exports.WindowMode = {}));
