/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2016 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License (MPL), version 2.0. If a copy of the MPL was not distributed
**  with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*
 *  This is a small ComponentJS plugin which adds a "values" method
 *  to all components which is like the regular "value" method,
 *  but instead of getter/setter-based access to a particular
 *  model value, it provides an ECMAScript/5 property-based object
 *  for direct access to all model values. Getting a property via
 *  component.values().foo is equivalent to component.value("foo").
 *  Setting a property via component.values().foo = "bar" is equivalent
 *  to component.value("foo", "bar"). As ECMAScript/5 properties are
 *  still not available in every environment, this functionality has to
 *  stay in an optional plugin, of course.
 */

/* global ComponentJS: false */
/* eslint no-unused-vars: 0 */
/* jshint unused: false */

ComponentJS.plugin("values", function (_cs, $cs, GLOBAL) {
    /*  sanity check run-time environment  */
    if (_cs.istypeof(Object.defineProperty) !== "function")
        throw _cs.exception("plugin:values", "sorry, mandatory ECMAScript/5 " +
            "Object.defineProperty() method not supported by run-time environment");

    /*  define the extra trait for components  */
    var trait = $cs.trait({
        protos: {
            /*  retrieve a property-based values object  */
            values: function () {
                /*  create initial values object  */
                var values = {};

                /*  iterate over all models towards the root component  */
                var found = false;
                var comp = this;
                var owner, model;
                while (comp !== null) {
                    owner = comp.property({ name: "ComponentJS:model", returnowner: true });
                    if (!_cs.isdefined(owner))
                        break;
                    found = true;
                    model = owner.property("ComponentJS:model");
                    comp = owner.parent();

                    /*  enhance values object with properties of all models  */
                    for (var name in model.data) {
                        var symbol = name.replace(/[^a-zA-Z0-9_]+/g, "_");
                        (function (owner, name, symbol) {
                            Object.defineProperty(values, symbol, {
                                enumerable:   false,
                                configurable: false,
                                writeable:    true,
                                get: function ()      { return owner.value(name);        },
                                set: function (value) { return owner.value(name, value); }
                            });
                        })(owner, name, symbol);
                    }
                }

                /*  sanity check situation  */
                if (!found)
                    throw _cs.exception("values", "no models found at all");

                /*  return generated object  */
                return values;
            }
        }
    });

    /*  mixin this trait to all components  */
    _cs.latch("ComponentJS:bootstrap:comp:mixin", function (mixins) {
        mixins.push(trait);
    });
});

