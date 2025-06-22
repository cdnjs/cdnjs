export declare enum Method {
    GET_DATA_LEGACY = "getDataLegacy",// For legacy ERC725 with interface id: 0x2bd57b73 NOTE: I had to add Legacy at the end so the map keys stays unique
    GET_DATA = "getData",// For latest ERC725 with interface id: 0x5a988c0f
    GET_DATA_BATCH = "getDataBatch",
    OWNER = "owner",
    SUPPORTS_INTERFACE = "supportsInterface",// https://eips.ethereum.org/EIPS/eip-165
    IS_VALID_SIGNATURE = "isValidSignature"
}
export declare enum Encoding {
    BYTES = "bytes",
    BYTES4 = "bytes4",
    BOOL = "bool",
    UINT256 = "uint256",
    BYTES32_ARRAY = "bytes32[]",
    BYTES_ARRAY = "bytes[]",
    ADDRESS = "address"
}
export interface MethodData {
    sig: string;
    value: string;
    returnEncoding: Encoding;
}
export interface Permissions {
    CHANGEOWNER?: boolean;
    ADDCONTROLLER?: boolean;
    EDITPERMISSIONS?: boolean;
    ADDEXTENSIONS?: boolean;
    CHANGEEXTENSIONS?: boolean;
    ADDUNIVERSALRECEIVERDELEGATE?: boolean;
    CHANGEUNIVERSALRECEIVERDELEGATE?: boolean;
    REENTRANCY?: boolean;
    SUPER_TRANSFERVALUE?: boolean;
    TRANSFERVALUE?: boolean;
    SUPER_CALL?: boolean;
    CALL?: boolean;
    SUPER_STATICCALL?: boolean;
    STATICCALL?: boolean;
    SUPER_DELEGATECALL?: boolean;
    DELEGATECALL?: boolean;
    DEPLOY?: boolean;
    SUPER_SETDATA?: boolean;
    SETDATA?: boolean;
    ENCRYPT?: boolean;
    DECRYPT?: boolean;
    SIGN?: boolean;
    EXECUTE_RELAY_CALL?: boolean;
    ERC4337_PERMISSION?: boolean;
    ALL_PERMISSIONS?: boolean;
    [key: string]: boolean | undefined;
}
