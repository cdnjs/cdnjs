/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2016 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License (MPL), version 2.0. If a copy of the MPL was not distributed
**  with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*
 *  This is a small ComponentJS plugin which allows one to easily
 *  migrate one or more components from their current parent component
 *  to a new common parent component.
 */

/* global ComponentJS: false */
/* eslint no-unused-vars: 0 */
/* jshint unused: false */

ComponentJS.plugin("migrate", function (_cs, $cs, GLOBAL) {
    /*  define the extra trait for components  */
    var trait = $cs.trait({
        protos: {
            /*  migrate a component  */
            migrate: function () {
                /*  determine parameters  */
                var params = $cs.params("migrate", arguments, {
                    comps:     { pos: "...", req: true    },
                    sync:      {             def: false   },
                    completed: {             def: $cs.nop }
                });

                /*  iterate over all components to migrate  */
                var n = 0;
                var parent = this;
                _cs.foreach(params.comps, function (comp) {
                    if (params.sync) {
                        /*  migrate synchronously  */
                        var state_old = comp.state();
                        comp.state({ state: "created", sync: true });
                        comp.detach();
                        comp.attach(parent);
                        comp.state(state_old);
                    }
                    else {
                        /*  migrate asynchronously  */
                        (function (comp, state_old) {
                            comp.state({ state: "created", sync: false, callback: function (/* state_new */) {
                                this.detach();
                                this.attach(parent);
                                this.state({ state: state_old, sync: false, callback: function (/* state_old */) {
                                    n--;
                                    if (n === 0)
                                        params.completed.call(null);
                                }});
                            }});
                        })(comp, comp.state());
                        n++;
                    }
                });
            }
        }
    });

    /*  mixin this trait to all components  */
    _cs.latch("ComponentJS:bootstrap:comp:mixin", function (mixins) {
        mixins.push(trait);
    });
});

