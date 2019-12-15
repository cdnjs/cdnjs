/**
@license
 * @pnp/pnpjs v1.0.4-4 - pnp - rollup library of core functionality (mimics sp-pnp-js)
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { Logger } from '@pnp/logging';
import { PnPClientStorage, RuntimeConfig, Util } from '@pnp/common';
import { Settings } from '@pnp/config-store';
import { graph as graph$1 } from '@pnp/graph';
import { sp } from '@pnp/sp-addinhelpers';



function setup(config) {
    RuntimeConfig.extend(config);
}

/**
 * Utility methods
 */
const util = Util;
/**
 * Provides access to the SharePoint REST interface
 */
const sp$2 = sp;
/**
 * Provides access to the Microsoft Graph REST interface
 */
const graph$2 = graph$1;
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
    graph: graph$2,
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
    sp: sp$2,
    /**
     * Provides access to local and session storage
     */
    storage: storage,
    /**
     * Utility methods
     */
    util: util,
};

export { util, sp$2 as sp, graph$2 as graph, storage, config, log, setup$1 as setup };
export default Def;
export * from '@pnp/sp';
export * from '@pnp/graph';
export * from '@pnp/common';
export * from '@pnp/logging';
export * from '@pnp/config-store';
export * from '@pnp/odata';
//# sourceMappingURL=pnpjs.js.map
