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
 * @file lib/getDataFromExternalSources.ts
 * @author Hugo Masclet <@Hugoo>
 * @author Callum Grindle <@CallumGrindle>
 * @author Reto Ryter <@rryter>
 * @date 2021
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
import { SUPPORTED_VERIFICATION_METHOD_STRINGS } from '../constants/constants';
import { isDataAuthentic, patchIPFSUrlsIfApplicable } from './utils';
export const getDataFromExternalSources = (schemas, dataFromChain, ipfsGateway) => {
    const promises = dataFromChain.map((dataEntry) => __awaiter(void 0, void 0, void 0, function* () {
        const schemaElement = schemas.find((schema) => schema.key === dataEntry.key);
        if (!schemaElement) {
            // It is weird if we can't find the schema element for the key...
            // Let's simply ignore and return it...
            return dataEntry;
        }
        if (!['jsonurl', 'asseturl', 'verifiableuri'].includes(schemaElement.valueContent.toLowerCase())) {
            return dataEntry;
        }
        // At this stage, value should be of type jsonurl, verifiableuri or asseturl
        if (typeof dataEntry.value === 'string') {
            console.error(`Value of key: ${dataEntry.name} (${dataEntry.value}) is string but valueContent is: ${schemaElement.valueContent}. Expected type should be object with url key.`);
            return dataEntry;
        }
        if (!dataEntry.value) {
            return dataEntry;
        }
        if (Array.isArray(dataEntry.value)) {
            console.error(`Value of key: ${dataEntry.name} (${dataEntry.value}) is string[] but valueContent is: ${schemaElement.valueContent}. Expected type should be object with url key.`);
            return dataEntry;
        }
        const urlDataWithHash = dataEntry.value; // Type URLDataWithHash
        let receivedData;
        try {
            const { url } = patchIPFSUrlsIfApplicable(urlDataWithHash, ipfsGateway);
            receivedData = yield fetch(url).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                if (((_a = urlDataWithHash.verification) === null || _a === void 0 ? void 0 : _a.method) ===
                    SUPPORTED_VERIFICATION_METHOD_STRINGS.KECCAK256_BYTES) {
                    return response
                        .arrayBuffer()
                        .then((buffer) => new Uint8Array(buffer));
                }
                return response.json();
            }));
        }
        catch (error) {
            console.error(error, `GET request to ${urlDataWithHash.url} failed`);
            throw error;
        }
        return isDataAuthentic(receivedData, urlDataWithHash.verification)
            ? Object.assign(Object.assign({}, dataEntry), { value: receivedData }) : Object.assign(Object.assign({}, dataEntry), { value: null });
    }));
    return Promise.all(promises);
};
//# sourceMappingURL=getDataFromExternalSources.js.map