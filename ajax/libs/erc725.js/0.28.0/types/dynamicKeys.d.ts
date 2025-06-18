import type { EncodeDataType } from './encodeData/JSONURL';
export type DynamicKeyParts = string | string[] | number | bigint;
export interface DynamicKeyPartInput {
    dynamicKeyParts: DynamicKeyParts;
    value: EncodeDataType;
}
export interface DynamicKeyPart {
    type: string;
    value: string | boolean | number;
}
