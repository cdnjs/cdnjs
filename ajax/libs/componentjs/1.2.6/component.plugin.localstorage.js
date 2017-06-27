/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2015 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License (MPL), version 2.0. If a copy of the MPL was not distributed
**  with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*
 *  This is a ComponentJS plugin which adds persistence support to
 *  models through the HTML5 "localStorage" facility. Every model value
 *  flagged with "store: true" is automatically saved and restored
 *  to/from the browser "localStorage". As "localStorage" is not
 *  available in every environment, this functionality has to stay in an
 *  optional plugin, of course.
 */

/* global ComponentJS: false */
/* eslint no-unused-vars: 0 */
/* jshint unused: false */

ComponentJS.plugin("localstorage", function (_cs, $cs, GLOBAL) {
    /*  sanity check run-time environment  */
    if (_cs.istypeof(GLOBAL.localStorage) === "undefined")
        throw _cs.exception("plugin:localstorage", "sorry, mandatory HTML5 " +
            "\"localStorage\" facility not supported by run-time environment");
    if (_cs.istypeof(GLOBAL.JSON) === "undefined")
        throw _cs.exception("plugin:localstorage", "sorry, mandatory JavaScript " +
            "\"JSON\" encoding/decoding not supported by run-time environment");
    if (   typeof GLOBAL.document === "undefined"
        || typeof GLOBAL.document.location === "undefined"
        || typeof GLOBAL.document.location.pathname === "undefined")
        throw _cs.exception("plugin:localstorage", "sorry, mandatory DOM " +
            "\"document location\" facility not supported by run-time environment");

    /*  determine unique store id  */
    var store_id = function (comp) {
        var id = "ComponentJS:store:";
        id += GLOBAL.document.location.pathname;
        id += ":" + comp.path("/");
        return id;
    };

    /*  latch into the store loading hook  */
    _cs.latch("ComponentJS:store-load", function (comp) {
        var id = store_id(comp);
        var obj = GLOBAL.localStorage.getItem(id);
        if (typeof obj === "string")
            comp.__store = GLOBAL.JSON.parse(obj);
    });

    /*  latch into the store saving hook  */
    _cs.latch("ComponentJS:store-save", function (comp) {
        var id = store_id(comp);
        var obj = GLOBAL.JSON.stringify(comp.__store);
        if (obj === "{}")
            GLOBAL.localStorage.removeItem(id);
        else
            GLOBAL.localStorage.setItem(id, obj);
    });
});

