interface JsonRpcEthereumProviderParams {
    to: string;
    gas?: string;
    value: string;
    data: any;
}
export type JsonRpcEthereumProviderParamsWithLatest = [
    JsonRpcEthereumProviderParams,
    'latest'
];
export interface JsonRpc {
    jsonrpc: '2.0';
    method: 'eth_call';
    params: JsonRpcEthereumProviderParamsWithLatest;
    id: number;
}
export {};
