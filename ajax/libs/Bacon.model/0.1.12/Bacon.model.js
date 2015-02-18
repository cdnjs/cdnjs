(function() {
    var Bacon, init,
        __slice = [].slice;

    init = function(Bacon) {
        var Lens, Model, defaultEquals, fold, globalModCount, id, idCounter, isModel, nonEmpty, sameValue, shallowCopy, valueLens;
        id = function(x) {
            return x;
        };
        nonEmpty = function(x) {
            return x.length > 0;
        };
        fold = function(xs, seed, f) {
            var x, _i, _len;
            for (_i = 0, _len = xs.length; _i < _len; _i++) {
                x = xs[_i];
                seed = f(seed, x);
            }
            return seed;
        };
        isModel = function(obj) {
            return obj instanceof Bacon.Property;
        };
        globalModCount = 0;
        idCounter = 1;
        defaultEquals = function(a, b) {
            return a === b;
        };
        sameValue = function(eq) {
            return function(a, b) {
                return !a.initial && eq(a.value, b.value);
            };
        };
        Model = Bacon.Model = function(initValue) {
            var currentValue, eq, model, modificationBus, myId, myModCount, syncBus, valueWithSource;
            myId = idCounter++;
            eq = defaultEquals;
            myModCount = 0;
            modificationBus = new Bacon.Bus();
            syncBus = new Bacon.Bus();
            currentValue = void 0;
            valueWithSource = Bacon.update({
                initial: true
            }, [modificationBus], (function(_arg, _arg1) {
                var changed, f, modStack, newValue, source, value;
                value = _arg.value;
                source = _arg1.source, f = _arg1.f;
                newValue = f(value);
                modStack = [myId];
                changed = newValue !== value;
                return {
                    source: source,
                    value: newValue,
                    modStack: modStack,
                    changed: changed
                };
            }), [syncBus], (function(_, syncEvent) {
                return syncEvent;
            })).skipDuplicates(sameValue(eq)).changes().toProperty();
            model = valueWithSource.map(".value").skipDuplicates(eq);
            model.dispatcher.subscribe(function(event) {
                if (event.hasValue()) {
                    return currentValue = event.value();
                }
            });
            if (!model.id) {
                model.id = myId;
            }
            model.addSyncSource = function(syncEvents) {
                return syncBus.plug(syncEvents.filter(function(e) {
                    return e.changed && !Bacon._.contains(e.modStack, myId);
                }).doAction(function() {
                    return Bacon.Model.syncCount++;
                }).map(function(e) {
                    return shallowCopy(e, "modStack", e.modStack.concat([myId]));
                }).map(function(e) {
                    return valueLens.set(e, model.syncConverter(valueLens.get(e)));
                }));
            };
            model.apply = function(source) {
                modificationBus.plug(source.toEventStream().map(function(f) {
                    return {
                        source: source,
                        f: f
                    };
                }));
                return valueWithSource.changes().filter(function(change) {
                    return change.source !== source;
                }).map(function(change) {
                    return change.value;
                });
            };
            model.addSource = function(source) {
                return model.apply(source.map(function(v) {
                    return function() {
                        return v;
                    };
                }));
            };
            model.modify = function(f) {
                return model.apply(Bacon.once(f));
            };
            model.set = function(value) {
                return model.modify(function() {
                    return value;
                });
            };
            model.get = function() {
                return currentValue;
            };
            model.syncEvents = function() {
                return valueWithSource.toEventStream();
            };
            model.bind = function(other) {
                this.addSyncSource(other.syncEvents());
                return other.addSyncSource(this.syncEvents());
            };
            model.lens = function(lens) {
                var lensed;
                lens = Lens(lens);
                lensed = Model();
                this.addSyncSource(model.sampledBy(lensed.syncEvents(), function(full, lensedSync) {
                    return valueLens.set(lensedSync, lens.set(full, lensedSync.value));
                }));
                lensed.addSyncSource(this.syncEvents().map(function(e) {
                    return valueLens.set(e, lens.get(e.value));
                }));
                return lensed;
            };
            model.syncConverter = id;
            if (arguments.length >= 1) {
                model.set(initValue);
            }
            return model;
        };
        Bacon.Model.syncCount = 0;
        Model.combine = function(template) {
            var initValue, key, lens, lensedModel, model, value;
            if (typeof template !== "object") {
                return Model(template);
            } else if (isModel(template)) {
                return template;
            } else {
                initValue = template instanceof Array ? [] : {};
                model = Model(initValue);
                for (key in template) {
                    value = template[key];
                    lens = Lens.objectLens(key);
                    lensedModel = model.lens(lens);
                    lensedModel.bind(Model.combine(value));
                }
                return model;
            }
        };
        Bacon.Binding = function(_arg) {
            var events, externalChanges, get, initValue, inputs, model, set;
            initValue = _arg.initValue, get = _arg.get, events = _arg.events, set = _arg.set;
            inputs = events.map(get);
            if (initValue != null) {
                set(initValue);
            } else {
                initValue = get();
            }
            model = Bacon.Model(initValue);
            externalChanges = model.addSource(inputs);
            externalChanges.assign(set);
            return model;
        };
        Lens = Bacon.Lens = function(lens) {
            if (typeof lens === "object") {
                return lens;
            } else {
                return Lens.objectLens(lens);
            }
        };
        Lens.id = Lens({
            get: function(x) {
                return x;
            },
            set: function(context, value) {
                return value;
            }
        });
        Lens.objectLens = function(path) {
            var keys, objectKeyLens;
            objectKeyLens = function(key) {
                return Lens({
                    get: function(x) {
                        return x != null ? x[key] : void 0;
                    },
                    set: function(context, value) {
                        return shallowCopy(context, key, value);
                    }
                });
            };
            keys = Bacon._.filter(nonEmpty, path.split("."));
            return Lens.compose.apply(Lens, Bacon._.map(objectKeyLens, keys));
        };
        Lens.compose = function() {
            var args, compose2;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            compose2 = function(outer, inner) {
                return Lens({
                    get: function(x) {
                        return inner.get(outer.get(x));
                    },
                    set: function(context, value) {
                        var innerContext, newInnerContext;
                        innerContext = outer.get(context);
                        newInnerContext = inner.set(innerContext, value);
                        return outer.set(context, newInnerContext);
                    }
                });
            };
            return fold(args, Lens.id, compose2);
        };
        valueLens = Lens.objectLens("value");
        shallowCopy = function(x, key, value) {
            var copy, k, v;
            copy = x instanceof Array ? [] : {};
            for (k in x) {
                v = x[k];
                copy[k] = v;
            }
            if (key != null) {
                copy[key] = value;
            }
            return copy;
        };
        return Bacon;
    };

    if (typeof module !== "undefined" && module !== null) {
        Bacon = require("baconjs");
        module.exports = init(Bacon);
    } else {
        if (typeof define === "function" && define.amd) {
            define(["bacon"], init);
        } else {
            init(this.Bacon);
        }
    }

}).call(this);