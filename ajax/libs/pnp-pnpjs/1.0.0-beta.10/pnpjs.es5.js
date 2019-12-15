/**
@license
 * @pnp/pnpjs v1.0.0-beta.10 - pnp - rollup library of core functionality (mimics sp-pnp-js)
 * MIT (https://github.com/pnp/pnp/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: http://officedev.github.io/PnP-JS-Core
 * source: https://github.com/pnp/pnp
 * bugs: https://github.com/pnp/pnp/issues
 */
import { Logger } from '@pnp/logging';
import { PnPClientStorage, RuntimeConfig, Util } from '@pnp/common';
import { Settings } from '@pnp/config-store';
import { graph as graph$1 } from '@pnp/graph';
import { sp } from '@pnp/sp-addinhelpers';



function setup$1(config) {
    RuntimeConfig.extend(config);
}

/**
 * Utility methods
 */
var util = Util;
/**
 * Provides access to the SharePoint REST interface
 */
var sp$2 = sp;
/**
 * Provides access to the Microsoft Graph REST interface
 */
var graph$2 = graph$1;
/**
 * Provides access to local and session storage
 */
var storage = new PnPClientStorage();
/**
 * Global configuration instance to which providers can be added
 */
var config = new Settings();
/**
 * Global logging instance to which subscribers can be registered and messages written
 */
var log = Logger;
/**
 * Allows for the configuration of the library
 */
var setup$$1 = setup$1;
/**
 * Enables use of the import pnp from syntax
 */

export { util, sp$2 as sp, graph$2 as graph, storage, config, log, setup$$1 as setup };
export * from '@pnp/sp';
export * from '@pnp/graph';
export * from '@pnp/common';
export * from '@pnp/logging';
export * from '@pnp/config-store';
export * from '@pnp/odata';
//# sourceMappingURL=pnpjs.es5.js.map
