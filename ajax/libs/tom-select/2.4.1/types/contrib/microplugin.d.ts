/**
 * microplugin.js
 * Copyright (c) 2013 Brian Reavis & contributors
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
type TSettings = {
    [key: string]: any;
};
type TPlugins = {
    names: string[];
    settings: TSettings;
    requested: {
        [key: string]: boolean;
    };
    loaded: {
        [key: string]: any;
    };
};
export type TPluginItem = {
    name: string;
    options: {};
};
export type TPluginHash = {
    [key: string]: {};
};
export default function MicroPlugin(Interface: any): {
    new (): {
        [x: string]: any;
        plugins: TPlugins;
        /**
         * Initializes the listed plugins (with options).
         * Acceptable formats:
         *
         * List (without options):
         *   ['a', 'b', 'c']
         *
         * List (with options):
         *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
         *
         * Hash (with options):
         *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
         *
         * @param {array|object} plugins
         */
        initializePlugins(plugins: string[] | TPluginItem[] | TPluginHash): void;
        loadPlugin(name: string): void;
        /**
         * Initializes a plugin.
         *
         */
        require(name: string): any;
    };
    [x: string]: any;
    /**
     * Registers a plugin.
     *
     * @param {function} fn
     */
    define(name: string, fn: (this: any, settings: TSettings) => any): void;
};
export {};
