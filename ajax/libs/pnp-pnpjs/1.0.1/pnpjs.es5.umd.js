/**
@license
 * @pnp/pnpjs v1.0.1 - pnp - rollup library of core functionality (mimics sp-pnp-js)
 * MIT (https://github.com/pnp/pnp/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: http://officedev.github.io/PnP-JS-Core
 * source: https://github.com/pnp/pnp
 * bugs: https://github.com/pnp/pnp/issues
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pnp/logging'), require('@pnp/common'), require('@pnp/config-store'), require('@pnp/graph'), require('@pnp/sp-addinhelpers'), require('@pnp/sp'), require('@pnp/odata')) :
	typeof define === 'function' && define.amd ? define(['exports', '@pnp/logging', '@pnp/common', '@pnp/config-store', '@pnp/graph', '@pnp/sp-addinhelpers', '@pnp/sp', '@pnp/odata'], factory) :
	(factory((global.$pnp = {}),global.pnp.logging,global.pnp.common,global.pnp['config-store'],global.pnp.graph,global.pnp['sp-addinhelpers'],global.pnp.sp,global.pnp.odata));
}(this, (function (exports,logging,common,configStore,graph,spAddinhelpers,sp$1,odata) { 'use strict';

function setup(config) {
    common.RuntimeConfig.extend(config);
}

/**
 * Utility methods
 */
var util = common.Util;
/**
 * Provides access to the SharePoint REST interface
 */
var sp$2 = spAddinhelpers.sp;
/**
 * Provides access to the Microsoft Graph REST interface
 */
var graph$2 = graph.graph;
/**
 * Provides access to local and session storage
 */
var storage = new common.PnPClientStorage();
/**
 * Global configuration instance to which providers can be added
 */
var config = new configStore.Settings();
/**
 * Global logging instance to which subscribers can be registered and messages written
 */
var log = logging.Logger;
/**
 * Allows for the configuration of the library
 */
var setup$1 = setup;
// /**
//  * Expose a subset of classes from the library for public consumption
//  */
// creating this class instead of directly assigning to default fixes issue #116
var Def = {
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

exports['default'] = Def;
exports.util = util;
exports.sp = sp$2;
exports.graph = graph$2;
exports.storage = storage;
exports.config = config;
exports.log = log;
exports.setup = setup$1;
Object.keys(sp$1).forEach(function (key) { exports[key] = sp$1[key]; });
Object.keys(graph).forEach(function (key) { exports[key] = graph[key]; });
Object.keys(common).forEach(function (key) { exports[key] = common[key]; });
Object.keys(logging).forEach(function (key) { exports[key] = logging[key]; });
Object.keys(configStore).forEach(function (key) { exports[key] = configStore[key]; });
Object.keys(odata).forEach(function (key) { exports[key] = odata[key]; });

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pnpjs.es5.umd.js.map
