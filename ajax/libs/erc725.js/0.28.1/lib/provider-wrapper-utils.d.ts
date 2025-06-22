import type { JsonRpc } from '../types/JsonRpc';
import type { Method } from '../types/Method';
import { Hex } from 'viem';
export declare function decodeResult(method: Method, hexString: Hex): Record<string, any> | null;
export declare function constructJSONRPC(address: string, method: Method, gasInfo?: number, methodParam?: string): JsonRpc;
