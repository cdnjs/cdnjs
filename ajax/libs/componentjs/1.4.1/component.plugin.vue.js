/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2016 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License (MPL), version 2.0. If a copy of the MPL was not distributed
**  with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*
 *  This is a ComponentJS plugin which integrates the awesome Vue
 *  library for view mask rendering and data binding. It is smart enough
 *  to accept intermixed jQuery objects. This plugin requires Vue, but
 *  jQuery is not directly required.
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
                var params = $cs.params("vue", arguments, {
                    options: { pos: 0, req: {}   },
                    spool:   { pos: 1, def: null }
                });

                /*  prepare the HTML mask template  */
                if (typeof params.options.template === "undefined")
                    throw _cs.exception("vue", "missing mandatory Vue template");
                if (isjQuery(params.options.template))
                    params.options.template = params.options.template.get(0);
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

                /*  iterate over all models towards the root component and find all model values  */
                var values = {};
                var comp = this;
                var owner, model;
                while (comp !== null) {
                    owner = comp.property({ name: "ComponentJS:model", returnowner: true });
                    if (!_cs.isdefined(owner))
                        break;
                    model = owner.property("ComponentJS:model");
                    comp = owner.parent();

                    /*  remember all model values  */
                    for (var name in model.data)
                        values[name] = owner;
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

                /*  the symbol prefix for ComponentJS trigger model values  */
                var prefix = "ComponentJS_trigger_";

                /*  provide Vue model entries for all ComponentJS model values  */
                _cs.foreach(names, function (name) {
                    var symbol = name.replace(/[^a-zA-Z0-9_$]+/g, "_");
                    if (symbol.match(/^event.+$/)) {
                        /*  ComponentJS event values are implemented as Vue methods  */
                        params.options.methods[symbol] = function (value) {
                            $cs(self).value(name,
                                (typeof value === "object" && value instanceof Event) ? true : value);
                        };
                    }
                    else {
                        /*  other ComponentJS values are implemented as Vue computed properties  */
                        params.options.data[prefix + symbol] = 0;
                        params.options.computed[symbol] = {
                            get: function () {
                                /*  tell Vue that we are depending on our trigger value
                                    (so we can later force Vue to call us again instead of
                                    using the cached value we returned beforehand)  */
                                void (this[prefix + symbol]);

                                /*  get the underlying ComponentJS value  */
                                return $cs(self).value(name);
                            },
                            set: function (value) {
                                /*  update the Vue trigger value to ensure that Vue
                                    is forced to update the cached value of the above getter  */
                                this[prefix + symbol]++;

                                /*  set the underlying ComponentJS value  */
                                $cs(self).value(name, value);
                            }
                        };
                    }
                });

                /*  hook into Vue instance life-cycle  */
                params.options.beforeDestroy = function () {
                    _cs.foreach(this.__ComponentJS.observers, function (id) {
                        $cs(self).unobserve(id);
                    });
                    _cs.foreach(this.__ComponentJS.sockets, function (id) {
                        $cs(self).unsocket(id);
                    });
                };

                /*  create Vue instance  */
                var vm = new Vue(params.options);

                /*  render into a still stand-alone DOM fragment  */
                vm.$mount();

                /*  attach ComponentJS information to Vue instance  */
                vm.__ComponentJS = { observers: [], sockets: [] };

                /*  provide observers for the ComponentJS model values  */
                _cs.foreach(names, function (name) {
                    var symbol = name.replace(/[^a-zA-Z0-9_$]+/g, "_");
                    var onChange =  function (/* ev, value */) {
                        /*  just update the Vue trigger value  */
                        vm[prefix + symbol]++;
                    };
                    _cs.foreach([ "set", "splice", "delete" ], function (op) {
                        var id = $cs(self).observe({ name: name, op: op, func: onChange });
                        vm.__ComponentJS.observers.push(id);
                    });
                });

                /*  automatically create ComponentJS sockets for all
                    DOM elements which are tagged as sockets  */
                var elements = vm.$el.querySelectorAll("*[data-socket]");
                for (var i = 0; i < elements.length; i++) {
                    var socketName  = elements[i].getAttribute("data-socket");
                    var socketScope = "";
                    var m = socketName.match(/^(.*)@(.+)$/);
                    if (m !== null) {
                        socketName  = m[1];
                        socketScope = m[2];
                    }
                    var opts = { ctx: elements[i] };
                    if (socketName  !== "") opts.name  = socketName;
                    if (socketScope !== "") opts.scope = socketScope;
                    var id = $cs(self).socket(opts);
                    vm.__ComponentJS.sockets.push(id);
                }

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
                    vm: { pos: 0, req: null }
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

                        /*  append to the DOM tree (the jQuery or plain way)  */
                        if (isjQuery(this))
                            this.append(el);
                        else
                            this.appendChild(el);
                    };
                }

                /*  provide specialized socket "unplug" functionality  */
                if (params.unplug === null) {
                    params.unplug = function (el /*, comp */) {
                        /*  remove from the DOM tree (the jQuery way)  */
                        if (isjQuery(el))
                            el.detach();
                        else {
                            /*  on-the-fly get the HTML element from Vue object  */
                            if (isVue(el))
                                el = el.$el;

                            /*  remove from the DOM tree (the plain way)  */
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

