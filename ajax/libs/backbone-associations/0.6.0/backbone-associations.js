//
//  Backbone-associations.js 0.6.0
//
//  (c) 2013 Dhruva Ray, Jaynti Kanani, Persistent Systems Ltd.
//  Backbone-associations may be freely distributed under the MIT license.
//  For all details and documentation:
//  https://github.com/dhruvaray/backbone-associations/
//

(function(root, factory) {
    // Set up Backbone-associations appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], function(_, Backbone) {
            // Export global even in AMD case in case this script is loaded with
            // others that may still expect a global Backbone.
            factory(root, Backbone, _);
        });

    // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        var _ = require('underscore'),
            Backbone = require('backbone');
        factory(root, Backbone, _);

    // Finally, as a browser global.
    } else {
        factory(root, root.Backbone, root._);
    }

}(this, function(root, Backbone, _) {
    "use strict";

    // Initial Setup
    // --------------

    // The top-level namespace. All public Backbone classes and modules will be attached to this.
    // Exported for the browser and CommonJS.
    var BackboneModel, BackboneCollection, ModelProto, BackboneEvent,
        CollectionProto, AssociatedModel, pathChecker,
        delimiters, pathSeparator, sourceModel, sourceKey, endPoints = {};

    // Create local reference `Model` prototype.
    BackboneModel = Backbone.Model;
    BackboneCollection = Backbone.Collection;
    ModelProto = BackboneModel.prototype;
    CollectionProto = BackboneCollection.prototype;
    BackboneEvent = Backbone.Events;

    Backbone.Associations = {
        VERSION: "0.6.0"
    };

    // Alternative scopes other than root
    Backbone.Associations.scopes = [];

    // Define `getter` and `setter` for `separator`
    var getSeparator = function() {
        return pathSeparator;
    };
    // Define `setSeperator`
    var setSeparator = function(value) {
        if (!_.isString(value) || _.size(value) < 1) {
            value = ".";
        }
        // set private properties
        pathSeparator = value;
        pathChecker = new RegExp("[\\" + pathSeparator + "\\[\\]]+", "g");
        delimiters = new RegExp("[^\\" + pathSeparator + "\\[\\]]+", "g");
    };

    try {
        // Define `SEPERATOR` property to Backbone.Associations
        Object.defineProperty(Backbone.Associations, 'SEPARATOR', {
            enumerable: true,
            get: getSeparator,
            set: setSeparator
        });
    } catch (e) {}

    // Backbone.AssociatedModel
    // --------------

    //Add `Many` and `One` relations to Backbone Object.
    Backbone.Associations.Many = Backbone.Many = "Many";
    Backbone.Associations.One = Backbone.One = "One";
    Backbone.Associations.Self = Backbone.Self = "Self";
    // Set default separator
    Backbone.Associations.SEPARATOR = ".";
    Backbone.Associations.getSeparator = getSeparator;
    Backbone.Associations.setSeparator = setSeparator;

    Backbone.Associations.EVENTS_BUBBLE = true;
    Backbone.Associations.EVENTS_WILDCARD = true;
    Backbone.Associations.EVENTS_NC = false;


    setSeparator();

    // Define `AssociatedModel` (Extends Backbone.Model).
    AssociatedModel = Backbone.AssociatedModel = Backbone.Associations.AssociatedModel = BackboneModel.extend({
        // Define relations with Associated Model.
        relations:undefined,
        // Define `Model` property which can keep track of already fired `events`,
        // and prevent redundant event to be triggered in case of cyclic model graphs.
        _proxyCalls:undefined,

        on: function (name, callback, context) {

            var result = BackboneEvent.on.apply(this, arguments);

            // No optimization possible if nested-events is wanted by the application
            if (Backbone.Associations.EVENTS_NC) return result;

            // Regular expression used to split event strings.
            var eventSplitter = /\s+/;

            // Handle atomic event names only
            if (_.isString(name) && name && (!eventSplitter.test(name)) && callback) {
                var endPoint = getPathEndPoint(name);
                if (endPoint) {
                    //Increment end point counter. Represents # of nodes which listen to this end point
                    endPoints[endPoint] = (typeof endPoints[endPoint] === 'undefined') ? 1 : (endPoints[endPoint] + 1);
                }
            }
            return result;
        },

        off: function (name, callback, context) {

            // No optimization possible if nested-events is wanted by the application
            if (Backbone.Associations.EVENTS_NC) return BackboneEvent.off.apply(this, arguments);

            var eventSplitter = /\s+/,
                events = this._events,
                listeners = {},
                names = events ? _.keys(events) : [],
                all = (!name && !callback && !context),
                atomic_event = (_.isString(name) && (!eventSplitter.test(name)));

            if (all || atomic_event) {
                for (var i = 0, l = names.length; i < l; i++) {
                    // Store the # of callbacks listening to the event name prior to the `off` call
                    listeners[names[i]] = events[names[i]] ? events[names[i]].length : 0;
                }
            }
            // Call Backbone off implementation
            var result = BackboneEvent.off.apply(this, arguments);

            if (all || atomic_event) {
                for (i = 0, l = names.length; i < l; i++) {
                    var endPoint = getPathEndPoint(names[i]);
                    if (endPoint) {
                        if (events[names[i]]) {
                            // Some listeners wiped out for this name for this object
                            endPoints[endPoint] -= (listeners[names[i]] - events[names[i]].length);
                        } else {
                            // All listeners wiped out for this name for this object
                            endPoints[endPoint] -= listeners[names[i]];
                        }
                    }
                }
            }
            return result;
        },

        // Get the value of an attribute.
        get:function (attr) {
            var obj = ModelProto.get.call(this, attr);
            return obj ? obj : this._getAttr.apply(this, arguments);
        },

        // Set a hash of model attributes on the Backbone Model.
        set:function (key, value, options) {
            var attributes, result;
            // Duplicate backbone's behavior to allow separate key/value parameters,
            // instead of a single 'attributes' object.
            if (_.isObject(key) || key == null) {
                attributes = key;
                options = value;
            } else {
                attributes = {};
                attributes[key] = value;
            }
            result = this._set(attributes, options);
            // Trigger events which have been blocked until the entire object graph is updated.
            this._processPendingEvents();
            return result;

        },

        // Works with an attribute hash and options + fully qualified paths
        _set:function (attributes, options) {
            var attr, modelMap, modelId, obj, result = this;
            if (!attributes) return this;
            for (attr in attributes) {
                //Create a map for each unique object whose attributes we want to set
                modelMap || (modelMap = {});
                if (attr.match(pathChecker)) {
                    var pathTokens = getPathArray(attr), initials = _.initial(pathTokens),
                        last = pathTokens[pathTokens.length - 1],
                        parentModel = this.get(initials);
                    if (parentModel instanceof AssociatedModel) {
                        obj = modelMap[parentModel.cid] || (modelMap[parentModel.cid] = {'model':parentModel, 'data':{}});
                        obj.data[last] = attributes[attr];
                    }
                } else {
                    obj = modelMap[this.cid] || (modelMap[this.cid] = {'model':this, 'data':{}});
                    obj.data[attr] = attributes[attr];
                }
            }

            if (modelMap) {
                for (modelId in modelMap) {
                    obj = modelMap[modelId];
                    this._setAttr.call(obj.model, obj.data, options) || (result = false);

                }
            } else {
                result = this._setAttr.call(this, attributes, options);
            }
            return result;

        },

        // Set a hash of model attributes on the object,
        // fire Backbone `event` with options.
        // It maintains relations between models during the set operation.
        // It also bubbles up child events to the parent.
        _setAttr:function (attributes, options) {
            var attr;
            // Extract attributes and options.
            options || (options = {});
            if (options.unset) for (attr in attributes) attributes[attr] = void 0;
            this.parents = this.parents || [];

            if (this.relations) {
                // Iterate over `this.relations` and `set` model and collection values
                // if `relations` are available.
                _.each(this.relations, function (relation) {
                    var relationKey = relation.key,
                        relatedModel = relation.relatedModel,
                        collectionType = relation.collectionType,
                        activationContext = relation.scope || root,
                        map = relation.map,
                        currVal = this.attributes[relationKey],
                        idKey = currVal && currVal.idAttribute,
                        val, relationOptions, data, relationValue, newCtx = false;

                    // Call function if relatedModel is implemented as a function
                    if (relatedModel && !(relatedModel.prototype instanceof BackboneModel))
                        relatedModel = _.isFunction(relatedModel) ?
                            relatedModel.call(this, relation, attributes) :
                            relatedModel;

                    // Get class if relation and map is stored as a string.
                    if (relatedModel && _.isString(relatedModel)) {
                        relatedModel = (relatedModel === Backbone.Self) ?
                            this.constructor :
                            map2Scope(relatedModel, activationContext);
                    }

                    map && _.isString(map) && (map = map2Scope(map, activationContext));
                    // Merge in `options` specific to this relation.
                    relationOptions = relation.options ? _.extend({}, relation.options, options) : options;

                    if (attributes[relationKey]) {
                        // Get value of attribute with relation key in `val`.
                        val = _.result(attributes, relationKey);
                        // Map `val` if a transformation function is provided.
                        val = map ? map.call(this, val, collectionType ? collectionType : relatedModel) : val;

                        // If `relation.type` is `Backbone.Many`,
                        // Create `Backbone.Collection` with passed data and perform Backbone `set`.
                        if (relation.type === Backbone.Many) {

                            if (collectionType && _.isFunction(collectionType) &&
                                (collectionType.prototype instanceof BackboneModel))
                                throw new Error('type is of Backbone.Model. Specify derivatives of Backbone.Collection');

                            // Call function if collectionType is implemented as a function
                            if (collectionType && !(collectionType.prototype instanceof BackboneCollection))
                                collectionType = _.isFunction(collectionType) ?
                                    collectionType.call(this, relation, attributes) : collectionType;

                            collectionType && _.isString(collectionType) &&
                            (collectionType = map2Scope(collectionType, activationContext));

                            if ((!relatedModel) && (!collectionType))
                                throw new Error('specify either a relatedModel or collectionType');

                            // `collectionType` of defined `relation` should be instance of `Backbone.Collection`.
                            if (collectionType && !collectionType.prototype instanceof BackboneCollection) {
                                throw new Error('collectionType must inherit from Backbone.Collection');
                            }

                            if (currVal) {
                                // Setting this flag will prevent events from firing immediately. That way clients
                                // will not get events until the entire object graph is updated.
                                currVal._deferEvents = true;

                                // Use Backbone.Collection's `reset` or smart `set` method
                                currVal[relationOptions.reset ? 'reset' : 'set'](
                                    val instanceof BackboneCollection ? val.models : val, relationOptions);

                                data = currVal;

                            } else {
                                newCtx = true;

                                if (val instanceof BackboneCollection) {
                                    data = val;
                                } else {
                                    data = collectionType ?
                                        new collectionType() : this._createCollection(relatedModel, activationContext);
                                    data[relationOptions.reset ? 'reset' : 'set'](val, relationOptions);
                                }
                            }

                        } else if (relation.type === Backbone.One) {

                            if (!relatedModel)
                                throw new Error('specify a relatedModel for Backbone.One type');

                            if (!(relatedModel.prototype instanceof Backbone.AssociatedModel))
                                throw new Error('specify an AssociatedModel for Backbone.One type');

                            data = val instanceof AssociatedModel ? val : new relatedModel(val, relationOptions);
                            //Is the passed in data for the same key?
                            if (currVal && data.attributes[idKey] &&
                                currVal.attributes[idKey] === data.attributes[idKey]) {
                                // Setting this flag will prevent events from firing immediately. That way clients
                                // will not get events until the entire object graph is updated.
                                currVal._deferEvents = true;
                                // Perform the traditional `set` operation
                                currVal._set(val instanceof AssociatedModel ? val.attributes : val, relationOptions);
                                data = currVal;
                            } else {
                                newCtx = true;
                            }

                        } else {
                            throw new Error('type attribute must be specified and have the values Backbone.One or Backbone.Many');
                        }


                        attributes[relationKey] = data;
                        relationValue = data;

                        // Add proxy events to respective parents.
                        // Only add callback if not defined or new Ctx has been identified.
                        if (newCtx || (relationValue && !relationValue._proxyCallback)) {
                            relationValue._proxyCallback = function () {
                                return Backbone.Associations.EVENTS_BUBBLE &&
                                    this._bubbleEvent.call(this, relationKey, relationValue, arguments);
                            };
                            relationValue.on("all", relationValue._proxyCallback, this);
                        }

                    }
                    //Distinguish between the value of undefined versus a set no-op
                    if (attributes.hasOwnProperty(relationKey)) {
                        //Maintain reverse pointers - a.k.a parents
                        var updated = attributes[relationKey];
                        var original = this.attributes[relationKey];
                        if (updated) {
                            updated.parents = updated.parents || [];
                            (_.indexOf(updated.parents, this) == -1) && updated.parents.push(this);
                        } else if (original && original.parents.length > 0) { // New value is undefined
                            original.parents = _.difference(original.parents, [this]);
                            // Don't bubble to this parent anymore
                            original._proxyCallback && original.off("all", original._proxyCallback, this);
                        }
                    }
                }, this);
            }
            // Return results for `BackboneModel.set`.
            return  ModelProto.set.call(this, attributes, options);
        },


        // Bubble-up event to `parent` Model
        _bubbleEvent:function (relationKey, relationValue, eventArguments) {
            var args = eventArguments,
                opt = args[0].split(":"),
                eventType = opt[0],
                catch_all = args[0] == "nested-change",
                isChangeEvent = eventType === "change",
                eventObject = args[1],
                indexEventObject = -1,
                _proxyCalls = relationValue._proxyCalls,
                cargs,
                eventPath = opt[1],
                eSrc = !eventPath || (eventPath.indexOf(pathSeparator) == -1),
                basecolEventPath;


            // Short circuit the listen in to the nested-graph event
            if (catch_all) return;

            // Record the source of the event
            if (eSrc) sourceKey = (getPathEndPoint(args[0]) || relationKey);

            // Short circuit the event bubbling as there are no listeners for this end point
            if (!Backbone.Associations.EVENTS_NC && !endPoints[sourceKey]) return;

            // Short circuit the listen in to the wild-card event
            if (Backbone.Associations.EVENTS_WILDCARD) {
                if (/\[\*\]/g.test(eventPath)) return this;
            }

            if (relationValue instanceof BackboneCollection && (isChangeEvent || eventPath)) {
                // O(n) search :(
                indexEventObject = relationValue.indexOf(sourceModel || eventObject);
            }

            if (this instanceof BackboneModel) {
                // A quicker way to identify the model which caused an update inside the collection (while bubbling up)
                sourceModel = this;
            }
            // Manipulate `eventPath`.
            eventPath = relationKey + ((indexEventObject !== -1 && (isChangeEvent || eventPath)) ?
                "[" + indexEventObject + "]" : "") + (eventPath ? pathSeparator + eventPath : "");

            // Short circuit collection * events

            if (Backbone.Associations.EVENTS_WILDCARD) {
                basecolEventPath = eventPath.replace(/\[\d+\]/g, '[*]');
            }

            cargs = [];
            cargs.push.apply(cargs, args);
            cargs[0] = eventType + ":" + eventPath;

            // Create a collection modified event with wild-card
            if (Backbone.Associations.EVENTS_WILDCARD && eventPath !== basecolEventPath) {
                cargs[0] = cargs[0] + " " + eventType + ":" + basecolEventPath;
            }

            // If event has been already triggered as result of same source `eventPath`,
            // no need to re-trigger event to prevent cycle.
            _proxyCalls = relationValue._proxyCalls = (_proxyCalls || {});
            if (this._isEventAvailable.call(this, _proxyCalls, eventPath)) return this;

            // Add `eventPath` in `_proxyCalls` to keep track of already triggered `event`.
            _proxyCalls[eventPath] = true;


            // Set up previous attributes correctly.
            if (isChangeEvent) {
                this._previousAttributes[relationKey] = relationValue._previousAttributes;
                this.changed[relationKey] = relationValue;
            }


            // Bubble up event to parent `model` with new changed arguments.

            this.trigger.apply(this, cargs);

            //Only fire for change. Not change:attribute
            if (Backbone.Associations.EVENTS_NC && isChangeEvent && this.get(eventPath) != args[2]) {
                var ncargs = ["nested-change", eventPath, args[1]];
                args[2] && ncargs.push(args[2]); //args[2] will be options if present
                this.trigger.apply(this, ncargs);
            }

            // Remove `eventPath` from `_proxyCalls`,
            // if `eventPath` and `_proxyCalls` are available,
            // which allow event to be triggered on for next operation of `set`.
            if (_proxyCalls && eventPath) delete _proxyCalls[eventPath];

            sourceModel = undefined;

            return this;
        },

        // Has event been fired from this source. Used to prevent event recursion in cyclic graphs
        _isEventAvailable:function (_proxyCalls, path) {
            return _.find(_proxyCalls, function (value, eventKey) {
                return path.indexOf(eventKey, path.length - eventKey.length) !== -1;
            });
        },

        // Returns New `collection` of type `relation.relatedModel`.
        _createCollection: function (type, context) {
            var collection, relatedModel = type;
            _.isString(relatedModel) && (relatedModel = map2Scope(relatedModel, context));
            // Creates new `Backbone.Collection` and defines model class.
            if (relatedModel && (relatedModel.prototype instanceof AssociatedModel) || _.isFunction(relatedModel)) {
                collection = new BackboneCollection();
                collection.model = relatedModel;
            } else {
                throw new Error('type must inherit from Backbone.AssociatedModel');
            }
            return collection;
        },

        // Process all pending events after the entire object graph has been updated
        _processPendingEvents:function () {
            if (!this._processedEvents) {
                this._processedEvents = true;

                this._deferEvents = false;

                // Trigger all pending events
                _.each(this._pendingEvents, function (e) {
                    e.c.trigger.apply(e.c, e.a);
                });

                this._pendingEvents = [];

                // Traverse down the object graph and call process pending events on sub-trees
                _.each(this.relations, function (relation) {
                    var val = this.attributes[relation.key];
                    val && val._processPendingEvents();
                }, this);

                delete this._processedEvents;
            }
        },

        // Override trigger to defer events in the object graph.
        trigger:function (name) {
            // Defer event processing
            if (this._deferEvents) {
                this._pendingEvents = this._pendingEvents || [];
                // Maintain a queue of pending events to trigger after the entire object graph is updated.
                this._pendingEvents.push({c:this, a:arguments});
            } else {
                ModelProto.trigger.apply(this, arguments);
            }
        },

        // The JSON representation of the model.
        toJSON:function (options) {
            var json = {}, aJson;
            json[this.idAttribute] = this.id;
            if (!this.visited) {
                this.visited = true;
                // Get json representation from `BackboneModel.toJSON`.
                json = ModelProto.toJSON.apply(this, arguments);

                // Pick up only the keys you want to serialize
                if (options && options.serialize_keys) {
                    json = _.pick(json, options.serialize_keys);
                }
                // If `this.relations` is defined, iterate through each `relation`
                // and added it's json representation to parents' json representation.
                if (this.relations) {
                    _.each(this.relations, function (relation) {
                        var key = relation.key,
                            remoteKey = relation.remoteKey,
                            attr = this.attributes[key],
                            serialize = !relation.isTransient,
                            serialize_keys = relation.serialize || []

                        // Remove default Backbone serialization for associations.
                        delete json[key];

                        //Assign to remoteKey if specified. Otherwise use the default key.
                        //Only for non-transient relationships
                        if (serialize) {

                            // Pass the keys to serialize as options to the toJSON method.
                            if (serialize_keys.length) {
                                options ?
                                    (options.serialize_keys = serialize_keys) :
                                    (options = {serialize_keys: serialize_keys})
                            }

                            aJson = attr && attr.toJSON ? attr.toJSON(options) : attr;
                            json[remoteKey || key] = _.isArray(aJson) ? _.compact(aJson) : aJson;
                        }

                    }, this);
                }

                delete this.visited;
            }
            return json;
        },

        // Create a new model with identical attributes to this one.
        clone: function (options) {
            return new this.constructor(this.toJSON(options));
        },

        // Call this if you want to set an `AssociatedModel` to a falsy value like undefined/null directly.
        // Not calling this will leak memory and have wrong parents.
        // See test case "parent relations"
        cleanup:function () {
            _.each(this.relations, function (relation) {
                var val = this.attributes[relation.key];
                val && (val.parents = _.difference(val.parents, [this]));
            }, this);
            this.off();
        },

        // Navigate the path to the leaf object in the path to query for the attribute value
        _getAttr:function (path) {

            var result = this,
            //Tokenize the path
                attrs = getPathArray(path),
                key,
                i;
            if (_.size(attrs) < 1) return;
            for (i = 0; i < attrs.length; i++) {
                key = attrs[i];
                if (!result) break;
                //Navigate the path to get to the result
                result = result instanceof BackboneCollection
                    ? (isNaN(key) ? undefined : result.at(key))
                    : result.attributes[key];
            }
            return result;
        }
    });

    // Tokenize the fully qualified event path
    var getPathArray = function (path) {
        if (path === '') return [''];
        return _.isString(path) ? (path.match(delimiters)) : path || [];
    };

    // Get the end point of the path.
    var getPathEndPoint = function (path) {

        if (!path) return path;

        //event_type:<path>
        var tokens = path.split(":");

        if (tokens.length > 1) {
            path = tokens[tokens.length - 1];
            tokens = path.split(pathSeparator);
            return tokens.length > 1 ? tokens[tokens.length - 1].split('[')[0] : tokens[0].split('[')[0];
        } else {
            //path of 0 depth
            return "";
        }

    };

    var map2Scope = function (path, context) {
        var target,
            scopes = [context];

        //Check global scopes after passed-in context
        scopes.push.apply(scopes, Backbone.Associations.scopes);

        for (var ctx, i = 0, l = scopes.length; i < l; ++i) {
            if (ctx = scopes[i]) {
                target = _.reduce(path.split(pathSeparator), function (memo, elem) {
                    return memo[elem];
                }, ctx);
                if (target) break;
            }
        }
        return target;
    };


    //Infer the relation from the collection's parents and find the appropriate map for the passed in `models`
    var map2models = function (parents, target, models) {
        var relation, surrogate;
        //Iterate over collection's parents
        _.find(parents, function (parent) {
            //Iterate over relations
            relation = _.find(parent.relations, function (rel) {
                return parent.get(rel.key) === target;
            }, this);
            if (relation) {
                surrogate = parent;//surrogate for transformation
                return true;//break;
            }
        }, this);

        //If we found a relation and it has a mapping function
        if (relation && relation.map) {
            return relation.map.call(surrogate, models, target);
        }
        return models;
    };

    var proxies = {};
    // Proxy Backbone collection methods
    _.each(['set', 'remove', 'reset'], function (method) {
        proxies[method] = BackboneCollection.prototype[method];

        CollectionProto[method] = function (models, options) {
            //Short-circuit if this collection doesn't hold `AssociatedModels`
            if (this.model.prototype instanceof AssociatedModel && this.parents) {
                //Find a map function if available and perform a transformation
                arguments[0] = map2models(this.parents, this, models);
            }
            return proxies[method].apply(this, arguments);
        }
    });

    // Override trigger to defer events in the object graph.
    proxies['trigger'] = CollectionProto['trigger'];
    CollectionProto['trigger'] = function (name) {
        if (this._deferEvents) {
            this._pendingEvents = this._pendingEvents || [];
            // Maintain a queue of pending events to trigger after the entire object graph is updated.
            this._pendingEvents.push({c:this, a:arguments});
        } else {
            proxies['trigger'].apply(this, arguments);
        }
    };

    // Attach process pending event functionality on collections as well. Re-use from `AssociatedModel`
    CollectionProto._processPendingEvents = AssociatedModel.prototype._processPendingEvents;
    CollectionProto.on = AssociatedModel.prototype.on;
    CollectionProto.off = AssociatedModel.prototype.off;

}));
