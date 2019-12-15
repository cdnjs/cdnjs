/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2018 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License (MPL), version 2.0. If a copy of the MPL was not distributed
**  with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*
 *  This is a ComponentJS plugin which integrates the awesome Vue
 *  library for view mask rendering and data binding.
 */

/* global ComponentJS: false */
/* global Vue: false */
/* global Event: false */
/* eslint no-unused-vars: 0 */
/* jshint unused: false */

/*  helper function for detecting jQuery object  */
var isjQuery = function (obj) {
    return (
           typeof obj === "object"
        && typeof obj.jquery === "string"
        && obj.jquery.match(/^[0-9]+(?:\.[0-9]+)+$/) !== null
    );
};

/*  helper function for detecting Vue object  */
var isVue = function (obj) {
    return (
           typeof obj === "object"
        && typeof obj._isVue === "boolean"
        && obj._isVue === true
    );
};

/*  hook as a plugin into ComponentJS  */
ComponentJS.plugin("vue", function (_cs, $cs, GLOBAL) {
    /*  define the extra trait for components  */
    var trait = $cs.trait({
        protos: {
            /*  create a new Vue instance  */
            vue: function () {
                /*  determine parameters  */
                var self = this;
                var vm;
                var params = $cs.params("vue", arguments, {
                    options: { pos: 0, req: true },
                    spool:   { pos: 1, def: null }
                });

                /*  prepare the HTML mask template  */
                if (   typeof params.options.template === "undefined"
                    && typeof params.options.render   === "undefined")
                    throw _cs.exception("vue", "missing mandatory Vue options \"template\" or \"render\"");
                if (typeof params.options.template !== "undefined") {
                    /*  unwrap jQuery wrapper object  */
                    if (isjQuery(params.options.template))
                        params.options.template = params.options.template.get(0);

                    /*  process string representation  */
                    if (typeof params.options.template === "string") {
                        for (;;) {
                            var reduced = params.options.template.replace(/^\s*<!--.*?-->\s*/, "");
                            if (params.options.template !== reduced)
                                params.options.template = reduced;
                            else
                                break;
                        }
                        params.options.template = params.options.template
                            .replace(/^\s+/, "").replace(/\s+$/, "");
                    }
                }

                /*  iterate over all ComponentJS models towards the root component and find all model values  */
                var values = {};
                var owner, model;
                var comp = this;
                while (comp !== null) {
                    /*  find next component with a model  */
                    owner = comp.property({ name: "ComponentJS:model", returnowner: true });
                    if (!_cs.isdefined(owner))
                        break;
                    model = owner.property("ComponentJS:model");
                    comp = owner.parent();

                    /*  remember all model values  */
                    for (var name in model.data)
                        values[name] = { owner: owner, observers: false };
                }
                var names = Object.keys(values);
                if (names.length === 0)
                    throw _cs.exception("vue", "no models values found at all");

                /*  prepare Vue options  */
                if (typeof params.options.data !== "object")
                    params.options.data = {};
                if (typeof params.options.computed !== "object")
                    params.options.computed = {};
                if (typeof params.options.methods !== "object")
                    params.options.methods = {};

                /*  the Vue symbol prefix for ComponentJS trigger model values  */
                var prefix = "ComponentJS_trigger_";

                /*  provide Vue model entries for all ComponentJS model values  */
                _cs.foreach(names, function (name) {
                    var symbol = name.replace(/[^a-zA-Z0-9_$]+/g, "_");
                    if (symbol.match(/^event.+$/)) {
                        /*  ComponentJS event values "eventXXX" are implemented as Vue methods  */
                        params.options.methods[symbol] = function (value) {
                            $cs(self).value(name,
                                (typeof value === "object" && value instanceof Event) ? true : value);
                        };
                    }
                    else {
                        var onChange =  function (/* ev, value */) {
                            /*  just update the Vue trigger value  */
                            vm[prefix + symbol]++;
                        };

                        /*  other ComponentJS values are implemented as Vue computed properties
                            with an associated trigger property for firing the invalidation
                            of the internal Vue caching mechanism by forcing a re-get operation  */
                        params.options.data[prefix + symbol] = 0;
                        params.options.computed[symbol] = {
                            get: function () {
                                /*  tell Vue that we are depending on our trigger value by just accessing
                                    it once (so we can later force Vue to call us again instead of using
                                    the cached value we returned beforehand). This operation is observed
                                    by Vue and leads to the dependency between the computed property and
                                    the trigger property  */
                                void (this[prefix + symbol]);

                                /*  lazy provide observers for the ComponentJS model values  */
                                if (!values[name].observers) {
                                    _cs.foreach([ "set", "splice", "delete" ], function (op) {
                                        var id = $cs(self).observe({ name: name, op: op, func: onChange });
                                        vm.__ComponentJS.observers.push(id);
                                    });
                                    values[name].observers = true;
                                }

                                /*  get the underlying ComponentJS model value  */
                                return $cs(self).value(name);
                            },
                            set: function (value) {
                                /*  update the Vue trigger value to ensure that Vue
                                    is forced to update the cached value of the above getter  */
                                this[prefix + symbol]++;

                                /*  lazy provide observers for the ComponentJS model values  */
                                if (!values[name].observers) {
                                    _cs.foreach([ "set", "splice", "delete" ], function (op) {
                                        var id = $cs(self).observe({ name: name, op: op, func: onChange });
                                        vm.__ComponentJS.observers.push(id);
                                    });
                                    values[name].observers = true;
                                }

                                /*  set the underlying ComponentJS model value  */
                                $cs(self).value(name, value);
                            }
                        };
                    }
                });

                /*  provide Vue trampoline methods for all ComponentJS
                    view component backing object utility methods "utilXXX"  */
                var base = self.obj();
                if (base !== null) {
                    var stateMethods = _cs.state_methods();
                    for (var obj = base; obj !== null; obj = Object.getPrototypeOf(obj)) {
                        var methods = Object.getOwnPropertyNames(obj);
                        _cs.foreach(methods, function (method) {
                            if (   stateMethods[method] === undefined
                                && typeof obj[method] === "function"
                                && method.match(/^util.+$/)) {
                                params.options.methods[method] = function () {
                                    return base[method].apply(base, arguments);
                                };
                            }
                        });
                    }
                }

                /*  hook into Vue instance life-cycle to destroy observers and sockets  */
                params.options.beforeDestroy = function () {
                    _cs.foreach(this.__ComponentJS.observers, function (id) {
                        $cs(self).unobserve(id);
                    });
                    _cs.foreach(this.__ComponentJS.sockets, function (id) {
                        $cs(self).unsocket(id);
                    });
                };

                /*  create Vue instance  */
                vm = new Vue(params.options);

                /*  attach ComponentJS information to Vue instance  */
                vm.__ComponentJS = { observers: [], sockets: [] };

                /*  render into a still stand-alone DOM fragment  */
                vm.$mount();

                /*  automatically create ComponentJS sockets for all
                    DOM elements which are tagged as sockets  */
                var createSocketForElement = function (element) {
                    var socketName  = element.getAttribute("data-socket");
                    var socketScope = "";
                    var m = socketName.match(/^(.*)@(.+)$/);
                    if (m !== null) {
                        socketName  = m[1];
                        socketScope = m[2];
                    }
                    var opts = { ctx: element };
                    if (socketName  !== "") opts.name  = socketName;
                    if (socketScope !== "") opts.scope = socketScope;
                    var id = $cs(self).socket(opts);
                    vm.__ComponentJS.sockets.push(id);
                };
                if (vm.$el.hasAttribute("data-socket"))
                    createSocketForElement(vm.$el);
                var elements = vm.$el.querySelectorAll("*[data-socket]");
                for (var i = 0; i < elements.length; i++)
                    createSocketForElement(elements[i]);

                /*  optionally spool Vue instance destruction  */
                if (params.spool !== null) {
                    var info = _cs.spool_spec_parse(this, params.spool);
                    info.comp.spool(info.name, this, function (vm) {
                        vm.$destroy();
                    }, vm);
                }

                /*  return Vue model  */
                return vm;
            },

            /*  destroy a Vue instance  */
            unvue: function (vm) {
                /*  determine parameters  */
                var params = $cs.params("unvue", arguments, {
                    vm: { pos: 0, req: true }
                });

                /*  sanity check parameter  */
                if (!isVue(params.vm))
                    throw _cs.exception("unvue", "invalid Vue instance");

                /*  destroy Vue instance  */
                params.vm.$destroy();
            },

            /*  override the original ComponentJS socket() API method  */
            socket: function () {
                /*  determine parameters  */
                var params = $cs.params("socket", arguments, {
                    name:   {         def: "default"  },
                    scope:  {         def: null       },
                    ctx:    { pos: 0, req: true       },
                    plug:   { pos: 1, def: null       }, /*  removed "req: true"  */
                    unplug: { pos: 2, def: null       }, /*  removed "req: true"  */
                    spool:  {         def: null       }
                });

                /*  provide specialized socket "plug" functionality  */
                if (params.plug === null) {
                    params.plug = function (el /*, comp */) {
                        /*  on-the-fly get the HTML element from jQuery/Vue object  */
                        if (isjQuery(el))
                            el = el.get(0);
                        else if (isVue(el))
                            el = el.$el;

                        /*  append it to the DOM tree (the jQuery or plain way)  */
                        if (isjQuery(this))
                            this.append(el);
                        else
                            this.appendChild(el);
                    };
                }

                /*  provide specialized socket "unplug" functionality  */
                if (params.unplug === null) {
                    params.unplug = function (el /*, comp */) {
                        /*  remove it from the DOM tree (the jQuery way)  */
                        if (isjQuery(el))
                            el.detach();
                        else {
                            /*  on-the-fly get the HTML element from Vue object  */
                            if (isVue(el))
                                el = el.$el;

                            /*  remove it from the DOM tree (the plain way)  */
                            var parent = el.parentElement;
                            if (parent !== null)
                                parent.removeChild(el);
                        }
                    };
                }

                /*  pass-through execution to original/base method  */
                return this.base(params);
            }
        }
    });

    /*  mixin this trait to all components  */
    _cs.latch("ComponentJS:bootstrap:comp:mixin", function (mixins) {
        mixins.push(trait);
    });
});

