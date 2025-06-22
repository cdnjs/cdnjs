/**
 * @file lib/isValidSignature.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2022
 */
import type { ProviderWrapper } from '../provider/providerWrapper';
import { type Hash } from 'viem';
/**
 *
 * https://eips.ethereum.org/EIPS/eip-1271
 *
 * @param {string} messageOrHash
 * @param {string} signature
 * @param {string} address the contract address
 * @returns {Promise<boolean>} Return true if the signature is valid (if the contract returns the magic value), false if not.
 */
export declare const isValidSignature: (messageOrHash: Hash | string, signature: string, address: string, wrappedProvider: ProviderWrapper) => Promise<boolean>;
