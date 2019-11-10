/**
 * @license
 * v1.3.1-1
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { RuntimeConfig, PnPClientStorage, dateAdd, combine, getCtxCallback, getRandomString, getGUID, isFunc, objectDefinedNotNull, isArray, extend, isUrlAbsolute, stringIsNullOrEmpty, getAttrValueFromString, sanitizeGuid } from '@pnp/common';
export * from '@pnp/common';
import { Logger } from '@pnp/logging';
export * from '@pnp/logging';
import { Settings } from '@pnp/config-store';
export * from '@pnp/config-store';
import { graph } from '@pnp/graph';
export * from '@pnp/graph';
import { sp } from '@pnp/sp-addinhelpers';
export * from '@pnp/sp';
export * from '@pnp/odata';

function setup(config) {
    RuntimeConfig.extend(config);
}

/**
 * Utility methods
 */
const util = {
    combine,
    dateAdd,
    extend,
    getAttrValueFromString,
    getCtxCallback,
    getGUID,
    getRandomString,
    isArray,
    isFunc,
    isUrlAbsolute,
    objectDefinedNotNull,
    sanitizeGuid,
    stringIsNullOrEmpty,
};
/**
 * Provides access to the SharePoint REST interface
 */
const sp$1 = sp;
/**
 * Provides access to the Microsoft Graph REST interface
 */
const graph$1 = graph;
/**
 * Provides access to local and session storage
 */
const storage = new PnPClientStorage();
/**
 * Global configuration instance to which providers can be added
 */
const config = new Settings();
/**
 * Global logging instance to which subscribers can be registered and messages written
 */
const log = Logger;
/**
 * Allows for the configuration of the library
 */
const setup$1 = setup;
// /**
//  * Expose a subset of classes from the library for public consumption
//  */
// creating this class instead of directly assigning to default fixes issue #116
const Def = {
    /**
     * Global configuration instance to which providers can be added
     */
    config: config,
    /**
     * Provides access to the Microsoft Graph REST interface
     */
    graph: graph$1,
    /**
     * Global logging instance to which subscribers can be registered and messages written
     */
    log: log,
    /**
     * Provides access to local and session storage
     */
    setup: setup$1,
    /**
     * Provides access to the REST interface
     */
    sp: sp$1,
    /**
     * Provides access to local and session storage
     */
    storage: storage,
    /**
     * Utility methods
     */
    util: util,
};

export default Def;
export { util, sp$1 as sp, graph$1 as graph, storage, config, log, setup$1 as setup };
//# sourceMappingURL=pnpjs.js.map
