/**
 * @license
 * v1.2.10-1
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pnp/common'), require('@pnp/logging'), require('@pnp/config-store'), require('@pnp/graph'), require('@pnp/sp-addinhelpers'), require('@pnp/sp'), require('@pnp/odata')) :
    typeof define === 'function' && define.amd ? define(['exports', '@pnp/common', '@pnp/logging', '@pnp/config-store', '@pnp/graph', '@pnp/sp-addinhelpers', '@pnp/sp', '@pnp/odata'], factory) :
    (factory((global.pnp = {}),global.pnp.common,global.pnp.logging,global.pnp['config-store'],global.pnp.graph,global.pnp['sp-addinhelpers'],global.pnp.sp,global.pnp.odata));
}(this, (function (exports,common,logging,configStore,graph,spAddinhelpers,sp,odata) { 'use strict';

    function setup(config) {
        common.RuntimeConfig.extend(config);
    }

    /**
     * Utility methods
     */
    var util = {
        combine: common.combine,
        dateAdd: common.dateAdd,
        extend: common.extend,
        getAttrValueFromString: common.getAttrValueFromString,
        getCtxCallback: common.getCtxCallback,
        getGUID: common.getGUID,
        getRandomString: common.getRandomString,
        isArray: common.isArray,
        isFunc: common.isFunc,
        isUrlAbsolute: common.isUrlAbsolute,
        objectDefinedNotNull: common.objectDefinedNotNull,
        sanitizeGuid: common.sanitizeGuid,
        stringIsNullOrEmpty: common.stringIsNullOrEmpty,
    };
    /**
     * Provides access to the SharePoint REST interface
     */
    var sp$1 = spAddinhelpers.sp;
    /**
     * Provides access to the Microsoft Graph REST interface
     */
    var graph$1 = graph.graph;
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

    Object.keys(common).forEach(function (key) { exports[key] = common[key]; });
    Object.keys(logging).forEach(function (key) { exports[key] = logging[key]; });
    Object.keys(configStore).forEach(function (key) { exports[key] = configStore[key]; });
    Object.keys(graph).forEach(function (key) { exports[key] = graph[key]; });
    Object.keys(sp).forEach(function (key) { exports[key] = sp[key]; });
    Object.keys(odata).forEach(function (key) { exports[key] = odata[key]; });
    exports.default = Def;
    exports.util = util;
    exports.sp = sp$1;
    exports.graph = graph$1;
    exports.storage = storage;
    exports.config = config;
    exports.log = log;
    exports.setup = setup$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pnpjs.es5.umd.js.map
