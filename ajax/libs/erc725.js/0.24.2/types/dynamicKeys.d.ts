import { EncodeDataType } from './encodeData/JSONURL';
export type DynamicKeyParts = string | string[];
export interface DynamicKeyPartInput {
    dynamicKeyParts: DynamicKeyParts;
    value: EncodeDataType;
}
export interface DynamicKeyPart {
    type: string;
    value: string | boolean | number;
}
