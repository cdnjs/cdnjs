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
import { arrToBufArr } from 'ethereumjs-util';
import { isDataAuthentic, patchIPFSUrlsIfApplicable } from './utils';
export const getDataFromExternalSources = (schemas, dataFromChain, ipfsGateway, throwException = true) => {
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
        try {
            // At this stage, value should be of type jsonurl, verifiableuri or asseturl
            if (typeof dataEntry.value === 'string') {
                throw new Error(`Value of key: ${dataEntry.name} (${dataEntry.value}) is string but valueContent is: ${schemaElement.valueContent}. Expected type should be object with url key.`);
            }
            if (!dataEntry.value) {
                throw new Error(`Value of key: ${dataEntry.name} is empty`);
            }
            if (Array.isArray(dataEntry.value)) {
                throw new Error(`Value of key: ${dataEntry.name} (${dataEntry.value}) is string[] but valueContent is: ${schemaElement.valueContent}. Expected type should be object with url key.`);
            }
            const urlDataWithHash = dataEntry.value; // Type URLDataWithHash
            const { url } = patchIPFSUrlsIfApplicable(urlDataWithHash, ipfsGateway);
            try {
                if (/[=?/]$/.test(url)) {
                    // this URL is not verifiable and the URL ends with a / or ? or = meaning it's not a file
                    // and more likely to be some kind of directory or query BaseURI
                    return dataEntry;
                }
                const receivedData = yield fetch(url).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response
                        .arrayBuffer()
                        .then((buffer) => new Uint8Array(buffer));
                }));
                if (receivedData.length >= 2) {
                    // JSON data cannot be less than 2 characters long.
                    try {
                        // - Build a string containing the first and last byte of the received data
                        //   and try to convert it to utf8. If that succeeds then
                        // - check whether those could represent valid JSON data.
                        // - then validate the data as JSON
                        // - then verfiy the data against the verification method
                        const key = String.fromCharCode(receivedData[0], receivedData[receivedData.length - 1]);
                        // Currently not supported even though they could be added and can represent valid JSON.
                        // " " => JSON.stringify("") NOT SUPPORTED as valid JSON
                        // t or f and e => JSON.stringify(true) or JSON.stringify(false) NOT SUPPORTED as valid JSON
                        // 0-9 => JSON.stringify(0) integer or float (note .5 is not legitimate JSON) NOT SUPPORTED as valid JSON
                        // if (/^(\[\]|\{\}|(tf)e|\d\d)$/.test(key)) {
                        // Check if the beginning or end are
                        // { and } => JSON.stringify({...}) => pretty much 100% of our JSON will be this.
                        // [ and ] => JSON.stringify([...])
                        if (/^(\[\]|\{\})$/.test(key)) {
                            const json = arrToBufArr(receivedData).toString();
                            const value = JSON.parse(json);
                            if (isDataAuthentic(value, urlDataWithHash.verification)) {
                                return Object.assign(Object.assign({}, dataEntry), { value });
                            }
                            throw new Error('result did not correctly validate');
                        }
                    }
                    catch (_a) {
                        // ignore
                    }
                }
                if (isDataAuthentic(receivedData, urlDataWithHash.verification)) {
                    return Object.assign(Object.assign({}, dataEntry), { value: receivedData });
                }
                throw new Error('result did not correctly validate');
            }
            catch (error) {
                error.message = `GET request to ${urlDataWithHash.url} (resolved as ${url}) failed: ${error.message}`;
                throw error;
            }
        }
        catch (error) {
            error.message = `Value of key: ${dataEntry.name} has an error: ${error.message}`;
            if (throwException) {
                throw error;
            }
            console.error(error);
        }
        // Invalid data
        return Object.assign(Object.assign({}, dataEntry), { value: null });
    }));
    return Promise.all(promises);
};
//# sourceMappingURL=getDataFromExternalSources.js.map