export interface GetDataDynamicKey {
    keyName: string;
    dynamicKeyParts: string | string[];
}
export type GetDataInput = string | GetDataDynamicKey | Array<string | GetDataDynamicKey>;
