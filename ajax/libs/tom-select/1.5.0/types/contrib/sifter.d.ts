/**
 * sifter.js
 * Copyright (c) 2013–2020 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */
declare type TOptions = {
    fields: string | string[];
    sort: any[];
    score?: () => any;
    filter?: boolean;
    limit?: number;
    sort_empty?: any;
    nesting?: boolean;
    respect_word_boundaries?: boolean;
    conjunction?: string;
};
declare type TPrepareObj = {
    options: TOptions;
    query: string;
    tokens: any;
    total: number;
    items: any[];
};
export default class Sifter {
    items: [] | {};
    settings: {
        diacritics: boolean;
    };
    /**
     * Textually searches arrays and hashes of objects
     * by property (or multiple properties). Designed
     * specifically for autocomplete.
     *
     * @constructor
     * @param {array|object} items
     * @param {object} items
     */
    constructor(items: any, settings: any);
    /**
     * Splits a search string into an array of individual
     * regexps to be used to match results.
     *
     * @param {string} query
     * @returns {array}
     */
    tokenize(query: any, options: any): any[];
    /**
     * Iterates over arrays and hashes.
     *
     * ```
     * this.iterator(this.items, function(item, id) {
     *    // invoked for each item
     * });
     * ```
     *
     * @param {array|object} object
     */
    iterator(object: any, callback: any): void;
    /**
     * Returns a function to be used to score individual results.
     *
     * Good matches will have a higher score than poor matches.
     * If an item is not a match, 0 will be returned by the function.
     *
     * @returns {function}
     */
    getScoreFunction(query: string, options?: TOptions): (data: any) => any;
    /**
     * Returns a function that can be used to compare two
     * results, for sorting purposes. If no sorting should
     * be performed, `null` will be returned.
     *
     * @param {string|object} search
     * @return function(a,b)
     */
    getSortFunction(search: any, options: TOptions): (a: any, b: any) => any;
    /**
     * Parses a search query and returns an object
     * with tokens and fields ready to be populated
     * with results.
     *
     */
    prepareSearch(query: string | TPrepareObj, options: TOptions): TPrepareObj;
    /**
     * Searches through all items and returns a sorted array of matches.
     *
     */
    search(query: string, options: TOptions): TPrepareObj;
}
export {};
