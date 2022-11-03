declare const _default: {
    encodeEventSignature: (functionName: string | import("web3-eth-abi").AbiEventFragment) => string;
    encodeFunctionCall: (jsonInterface: import("web3-eth-abi").AbiFunctionFragment, params: unknown[]) => string;
    encodeFunctionSignature: (functionName: string | import("web3-eth-abi").AbiFunctionFragment) => string;
    encodeParameter: (abi: import("web3-eth-abi").AbiInput, param: unknown) => string;
    encodeParameters: (abi: readonly import("web3-eth-abi").AbiInput[], params: unknown[]) => string;
    decodeParameter: (abi: import("web3-eth-abi").AbiInput, bytes: string) => unknown;
    decodeParameters: (abi: import("web3-eth-abi").AbiInput[], bytes: string) => {
        [key: string]: unknown;
        __length__: number;
    };
    decodeLog: <ReturnType_1 extends Record<string, unknown>>(inputs: import("web3-eth-abi").AbiParameter[], data: string, topics: string | string[]) => ReturnType_1 & {
        __length__: number;
    };
};
export default _default;
//# sourceMappingURL=abi.d.ts.map