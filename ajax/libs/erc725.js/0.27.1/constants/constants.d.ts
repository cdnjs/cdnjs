import { MethodData, Method } from '../types/Method';
export declare const ERC725Y_INTERFACE_IDS: {
    legacy: string;
    '2.0': string;
    '3.0': string;
    '5.0': string;
};
export declare enum ERC725_VERSION {
    NOT_ERC725 = "NOT_ERC725",
    ERC725_LEGACY = "ERC725_LEGACY",
    ERC725_v2 = "ERC725_v2",// https://github.com/ERC725Alliance/ERC725/releases/tag/v2.2.0
    ERC725_v5 = "ERC725_v5"
}
export declare const METHODS: Record<Method, MethodData>;
export declare const NONE_VERIFICATION_METHOD = "0x00000000";
export declare enum SUPPORTED_VERIFICATION_METHOD_STRINGS {
    KECCAK256_UTF8 = "keccak256(utf8)",
    KECCAK256_BYTES = "keccak256(bytes)"
}
export declare enum SUPPORTED_VERIFICATION_METHOD_HASHES {
    HASH_KECCAK256_UTF8 = "0x6f357c6a",
    HASH_KECCAK256_BYTES = "0x8019f9b1"
}
export type SUPPORTED_VERIFICATION_METHODS = SUPPORTED_VERIFICATION_METHOD_STRINGS | SUPPORTED_VERIFICATION_METHOD_HASHES;
export declare const SUPPORTED_VERIFICATION_METHODS_LIST: SUPPORTED_VERIFICATION_METHOD_STRINGS[];
export declare const HASH_METHODS: {
    [key: string]: {
        method: (data: object | string | Uint8Array | null) => string;
        name: SUPPORTED_VERIFICATION_METHOD_STRINGS;
        sig: SUPPORTED_VERIFICATION_METHODS;
    };
};
export declare const LSP6_DEFAULT_PERMISSIONS: {
    CHANGEOWNER: string;
    ADDCONTROLLER: string;
    EDITPERMISSIONS: string;
    ADDEXTENSIONS: string;
    CHANGEEXTENSIONS: string;
    ADDUNIVERSALRECEIVERDELEGATE: string;
    CHANGEUNIVERSALRECEIVERDELEGATE: string;
    REENTRANCY: string;
    SUPER_TRANSFERVALUE: string;
    TRANSFERVALUE: string;
    SUPER_CALL: string;
    CALL: string;
    SUPER_STATICCALL: string;
    STATICCALL: string;
    SUPER_DELEGATECALL: string;
    DELEGATECALL: string;
    DEPLOY: string;
    SUPER_SETDATA: string;
    SETDATA: string;
    ENCRYPT: string;
    DECRYPT: string;
    SIGN: string;
    EXECUTE_RELAY_CALL: string;
    ERC4337_PERMISSION: string;
    ALL_PERMISSIONS: string;
};
export declare const LSP6_ALL_PERMISSIONS = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export declare const COMPACT_BYTES_ARRAY_STRING = "[CompactBytesArray]";
export declare const DEFAULT_GAS_VALUE = 1000000;
