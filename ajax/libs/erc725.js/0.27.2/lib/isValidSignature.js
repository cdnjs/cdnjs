/*
    This file is part of @erc725/erc725.js.
    @erc725/erc725.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    @erc725/erc725.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with @erc725/erc725.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file lib/isValidSignature.ts
 * @author Hugo Masclet <@Hugoo>
 * @date 2022
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { keccak256 } from 'web3-utils';
const MAGIC_VALUE = '0x1626ba7e';
// https://ethereum.stackexchange.com/a/72625
function validateHash(hash) {
    return /^0x([A-Fa-f0-9]{64})$/.test(hash);
}
/**
 *
 * https://eips.ethereum.org/EIPS/eip-1271
 *
 * @param {string} messageOrHash
 * @param {string} signature
 * @param {string} address the contract address
 * @returns {Promise<boolean>} Return true if the signature is valid (if the contract returns the magic value), false if not.
 */
export const isValidSignature = (messageOrHash, signature, address, wrappedProvider) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = validateHash(messageOrHash)
        ? messageOrHash
        : keccak256(`\x19Ethereum Signed Message:\n${messageOrHash.length}${messageOrHash}`);
    if (signature.length !== 132) {
        throw new Error('Signature length should be 132 (65bytes)');
    }
    try {
        const value = yield wrappedProvider.isValidSignature(address, hash, signature);
        return value === MAGIC_VALUE;
    }
    catch (err) {
        throw new Error(`Error when checking signature. Is ${address} a valid contract address which supports EIP-1271 standard?`);
    }
});
//# sourceMappingURL=isValidSignature.js.map