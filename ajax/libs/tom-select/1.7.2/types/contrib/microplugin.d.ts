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
export default function MicroPlugin(Interface: any): {
    new (): {
        [x: string]: any;
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
        initializePlugins(plugins: any[] | object): void;
        plugins: {
            names: any[];
            settings: {};
            requested: {};
            loaded: {};
        };
        loadPlugin(name: any): void;
        /**
         * Initializes a plugin.
         *
         * @param {string} name
         */
        require(name: string): any;
    };
    [x: string]: any;
    /**
     * Registers a plugin.
     *
     * @param {string} name
     * @param {function} fn
     */
    define(name: string, fn: Function): void;
};
