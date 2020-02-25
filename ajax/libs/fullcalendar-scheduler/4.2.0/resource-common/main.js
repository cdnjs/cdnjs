/*!
FullCalendar Resources Common Plugin v4.2.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2019 Adam Shaw
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fullcalendar/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fullcalendar/core'], factory) :
    (global = global || self, factory(global.FullCalendarResourceCommon = {}, global.FullCalendar));
}(this, function (exports, core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var ResourceDataAdder = /** @class */ (function () {
        function ResourceDataAdder() {
            this.filterResources = core.memoize(filterResources);
        }
        ResourceDataAdder.prototype.transform = function (viewProps, viewSpec, calendarProps, view) {
            if (viewSpec.class.needsResourceData) {
                return {
                    resourceStore: this.filterResources(calendarProps.resourceStore, view.opt('filterResourcesWithEvents'), calendarProps.eventStore, calendarProps.dateProfile.activeRange),
                    resourceEntityExpansions: calendarProps.resourceEntityExpansions
                };
            }
        };
        return ResourceDataAdder;
    }());
    function filterResources(resourceStore, doFilterResourcesWithEvents, eventStore, activeRange) {
        if (doFilterResourcesWithEvents) {
            var instancesInRange = filterEventInstancesInRange(eventStore.instances, activeRange);
            var hasEvents_1 = computeHasEvents(instancesInRange, eventStore.defs);
            __assign(hasEvents_1, computeAncestorHasEvents(hasEvents_1, resourceStore));
            return core.filterHash(resourceStore, function (resource, resourceId) {
                return hasEvents_1[resourceId];
            });
        }
        else {
            return resourceStore;
        }
    }
    function filterEventInstancesInRange(eventInstances, activeRange) {
        return core.filterHash(eventInstances, function (eventInstance) {
            return core.rangesIntersect(eventInstance.range, activeRange);
        });
    }
    function computeHasEvents(eventInstances, eventDefs) {
        var hasEvents = {};
        for (var instanceId in eventInstances) {
            var instance = eventInstances[instanceId];
            for (var _i = 0, _a = eventDefs[instance.defId].resourceIds; _i < _a.length; _i++) {
                var resourceId = _a[_i];
                hasEvents[resourceId] = true;
            }
        }
        return hasEvents;
    }
    /*
    mark resources as having events if any of their ancestors have them
    NOTE: resourceStore might not have all the resources that hasEvents{} has keyed
    */
    function computeAncestorHasEvents(hasEvents, resourceStore) {
        var res = {};
        for (var resourceId in hasEvents) {
            var resource = void 0;
            while ((resource = resourceStore[resourceId])) {
                resourceId = resource.parentId; // now functioning as the parentId
                if (resourceId) {
                    res[resourceId] = true;
                }
                else {
                    break;
                }
            }
        }
        return res;
    }
    // for when non-resource view should be given EventUi info (for event coloring/constraints based off of resource data)
    var ResourceEventConfigAdder = /** @class */ (function () {
        function ResourceEventConfigAdder() {
            this.buildResourceEventUis = core.memoizeOutput(buildResourceEventUis, core.isPropsEqual);
            this.injectResourceEventUis = core.memoize(injectResourceEventUis);
        }
        ResourceEventConfigAdder.prototype.transform = function (viewProps, viewSpec, calendarProps) {
            if (!viewSpec.class.needsResourceData) { // is a non-resource view?
                return {
                    eventUiBases: this.injectResourceEventUis(viewProps.eventUiBases, viewProps.eventStore.defs, this.buildResourceEventUis(calendarProps.resourceStore))
                };
            }
        };
        return ResourceEventConfigAdder;
    }());
    function buildResourceEventUis(resourceStore) {
        return core.mapHash(resourceStore, function (resource) {
            return resource.ui;
        });
    }
    function injectResourceEventUis(eventUiBases, eventDefs, resourceEventUis) {
        return core.mapHash(eventUiBases, function (eventUi, defId) {
            if (defId) { // not the '' key
                return injectResourceEventUi(eventUi, eventDefs[defId], resourceEventUis);
            }
            else {
                return eventUi;
            }
        });
    }
    function injectResourceEventUi(origEventUi, eventDef, resourceEventUis) {
        var parts = [];
        // first resource takes precedence, which fights with the ordering of combineEventUis, thus the unshifts
        for (var _i = 0, _a = eventDef.resourceIds; _i < _a.length; _i++) {
            var resourceId = _a[_i];
            if (resourceEventUis[resourceId]) {
                parts.unshift(resourceEventUis[resourceId]);
            }
        }
        parts.unshift(origEventUi);
        return core.combineEventUis(parts);
    }

    var RESOURCE_SOURCE_PROPS = {
        id: String
    };
    var defs = [];
    var uid = 0;
    function registerResourceSourceDef(def) {
        defs.push(def);
    }
    function getResourceSourceDef(id) {
        return defs[id];
    }
    function doesSourceIgnoreRange(source) {
        return Boolean(defs[source.sourceDefId].ignoreRange);
    }
    function parseResourceSource(input) {
        for (var i = defs.length - 1; i >= 0; i--) { // later-added plugins take precedence
            var def = defs[i];
            var meta = def.parseMeta(input);
            if (meta) {
                var res = parseResourceSourceProps((typeof input === 'object' && input) ? input : {}, meta, i);
                res._raw = input;
                return res;
            }
        }
        return null;
    }
    function parseResourceSourceProps(input, meta, sourceDefId) {
        var props = core.refineProps(input, RESOURCE_SOURCE_PROPS);
        props.sourceId = String(uid++);
        props.sourceDefId = sourceDefId;
        props.meta = meta;
        props.publicId = props.id;
        props.isFetching = false;
        props.latestFetchId = '';
        props.fetchRange = null;
        delete props.id;
        return props;
    }

    function reduceResourceSource (source, action, dateProfile, calendar) {
        switch (action.type) {
            case 'INIT':
                return createSource(calendar.opt('resources'), calendar);
            case 'RESET_RESOURCE_SOURCE':
                return createSource(action.resourceSourceInput, calendar, true);
            case 'PREV': // TODO: how do we track all actions that affect dateProfile :(
            case 'NEXT':
            case 'SET_DATE':
            case 'SET_VIEW_TYPE':
                return handleRange(source, dateProfile.activeRange, calendar);
            case 'RECEIVE_RESOURCES':
            case 'RECEIVE_RESOURCE_ERROR':
                return receiveResponse(source, action.fetchId, action.fetchRange);
            case 'REFETCH_RESOURCES':
                return fetchSource(source, dateProfile.activeRange, calendar);
            default:
                return source;
        }
    }
    var uid$1 = 0;
    function createSource(input, calendar, forceFetch) {
        if (input) {
            var source = parseResourceSource(input);
            if (forceFetch || !calendar.opt('refetchResourcesOnNavigate')) { // because assumes handleRange will do it later
                source = fetchSource(source, null, calendar);
            }
            return source;
        }
        return null;
    }
    function handleRange(source, activeRange, calendar) {
        if (calendar.opt('refetchResourcesOnNavigate') &&
            !doesSourceIgnoreRange(source) &&
            (!source.fetchRange || !core.rangesEqual(source.fetchRange, activeRange))) {
            return fetchSource(source, activeRange, calendar);
        }
        else {
            return source;
        }
    }
    function fetchSource(source, fetchRange, calendar) {
        var sourceDef = getResourceSourceDef(source.sourceDefId);
        var fetchId = String(uid$1++);
        sourceDef.fetch({
            resourceSource: source,
            calendar: calendar,
            range: fetchRange
        }, function (res) {
            // HACK
            // do before calling dispatch in case dispatch renders synchronously
            calendar.afterSizingTriggers._resourcesRendered = [null]; // fire once
            calendar.dispatch({
                type: 'RECEIVE_RESOURCES',
                fetchId: fetchId,
                fetchRange: fetchRange,
                rawResources: res.rawResources
            });
        }, function (error) {
            calendar.dispatch({
                type: 'RECEIVE_RESOURCE_ERROR',
                fetchId: fetchId,
                fetchRange: fetchRange,
                error: error
            });
        });
        return __assign({}, source, { isFetching: true, latestFetchId: fetchId });
    }
    function receiveResponse(source, fetchId, fetchRange) {
        if (fetchId === source.latestFetchId) {
            return __assign({}, source, { isFetching: false, fetchRange: fetchRange });
        }
        return source;
    }

    var RESOURCE_PROPS = {
        id: String,
        title: String,
        parentId: String,
        businessHours: null,
        children: null,
        extendedProps: null
    };
    var PRIVATE_ID_PREFIX = '_fc:';
    var uid$2 = 0;
    /*
    needs a full store so that it can populate children too
    */
    function parseResource(input, parentId, store, calendar) {
        if (parentId === void 0) { parentId = ''; }
        var leftovers0 = {};
        var props = core.refineProps(input, RESOURCE_PROPS, {}, leftovers0);
        var leftovers1 = {};
        var ui = core.processScopedUiProps('event', leftovers0, calendar, leftovers1);
        if (!props.id) {
            props.id = PRIVATE_ID_PREFIX + (uid$2++);
        }
        if (!props.parentId) { // give precedence to the parentId property
            props.parentId = parentId;
        }
        props.businessHours = props.businessHours ? core.parseBusinessHours(props.businessHours, calendar) : null;
        props.ui = ui;
        props.extendedProps = __assign({}, leftovers1, props.extendedProps);
        // help out ResourceApi from having user modify props
        Object.freeze(ui.classNames);
        Object.freeze(props.extendedProps);
        if (store[props.id]) ;
        else {
            store[props.id] = props;
            if (props.children) {
                for (var _i = 0, _a = props.children; _i < _a.length; _i++) {
                    var childInput = _a[_i];
                    parseResource(childInput, props.id, store, calendar);
                }
                delete props.children;
            }
        }
        return props;
    }
    /*
    TODO: use this in more places
    */
    function getPublicId(id) {
        if (id.indexOf(PRIVATE_ID_PREFIX) === 0) {
            return '';
        }
        return id;
    }

    function reduceResourceStore (store, action, source, calendar) {
        switch (action.type) {
            case 'INIT':
                return {};
            case 'RECEIVE_RESOURCES':
                return receiveRawResources(store, action.rawResources, action.fetchId, source, calendar);
            case 'ADD_RESOURCE':
                return addResource(store, action.resourceHash);
            case 'REMOVE_RESOURCE':
                return removeResource(store, action.resourceId);
            case 'SET_RESOURCE_PROP':
                return setResourceProp(store, action.resourceId, action.propName, action.propValue);
            case 'RESET_RESOURCES':
                // must make the calendar think each resource is a new object :/
                return core.mapHash(store, function (resource) {
                    return __assign({}, resource);
                });
            default:
                return store;
        }
    }
    function receiveRawResources(existingStore, inputs, fetchId, source, calendar) {
        if (source.latestFetchId === fetchId) {
            var nextStore = {};
            for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
                var input = inputs_1[_i];
                parseResource(input, '', nextStore, calendar);
            }
            return nextStore;
        }
        else {
            return existingStore;
        }
    }
    function addResource(existingStore, additions) {
        // TODO: warn about duplicate IDs
        return __assign({}, existingStore, additions);
    }
    function removeResource(existingStore, resourceId) {
        var newStore = __assign({}, existingStore);
        delete newStore[resourceId];
        // promote children
        for (var childResourceId in newStore) { // a child, *maybe* but probably not
            if (newStore[childResourceId].parentId === resourceId) {
                newStore[childResourceId] = __assign({}, newStore[childResourceId], { parentId: '' });
            }
        }
        return newStore;
    }
    function setResourceProp(existingStore, resourceId, name, value) {
        var _a, _b;
        var existingResource = existingStore[resourceId];
        // TODO: sanitization
        if (existingResource) {
            return __assign({}, existingStore, (_a = {}, _a[resourceId] = __assign({}, existingResource, (_b = {}, _b[name] = value, _b)), _a));
        }
        else {
            return existingStore;
        }
    }

    function reduceResourceEntityExpansions(expansions, action) {
        var _a;
        switch (action.type) {
            case 'INIT':
                return {};
            case 'SET_RESOURCE_ENTITY_EXPANDED':
                return __assign({}, expansions, (_a = {}, _a[action.id] = action.isExpanded, _a));
            default:
                return expansions;
        }
    }

    function resourcesReducers (state, action, calendar) {
        var resourceSource = reduceResourceSource(state.resourceSource, action, state.dateProfile, calendar);
        var resourceStore = reduceResourceStore(state.resourceStore, action, resourceSource, calendar);
        var resourceEntityExpansions = reduceResourceEntityExpansions(state.resourceEntityExpansions, action);
        return __assign({}, state, { resourceSource: resourceSource,
            resourceStore: resourceStore,
            resourceEntityExpansions: resourceEntityExpansions });
    }

    var RESOURCE_RELATED_PROPS = {
        resourceId: String,
        resourceIds: function (items) {
            return (items || []).map(function (item) {
                return String(item);
            });
        },
        resourceEditable: Boolean
    };
    function parseEventDef(def, props, leftovers) {
        var resourceRelatedProps = core.refineProps(props, RESOURCE_RELATED_PROPS, {}, leftovers);
        var resourceIds = resourceRelatedProps.resourceIds;
        if (resourceRelatedProps.resourceId) {
            resourceIds.push(resourceRelatedProps.resourceId);
        }
        def.resourceIds = resourceIds;
        def.resourceEditable = resourceRelatedProps.resourceEditable;
    }

    function massageEventDragMutation(eventMutation, hit0, hit1) {
        var resource0 = hit0.dateSpan.resourceId;
        var resource1 = hit1.dateSpan.resourceId;
        if (resource0 && resource1 &&
            resource0 !== resource1) {
            eventMutation.resourceMutation = {
                matchResourceId: resource0,
                setResourceId: resource1
            };
        }
    }
    /*
    TODO: all this would be much easier if we were using a hash!
    */
    function applyEventDefMutation(eventDef, mutation, calendar) {
        var resourceMutation = mutation.resourceMutation;
        if (resourceMutation && computeResourceEditable(eventDef, calendar)) {
            var index = eventDef.resourceIds.indexOf(resourceMutation.matchResourceId);
            if (index !== -1) {
                var resourceIds = eventDef.resourceIds.slice(); // copy
                resourceIds.splice(index, 1); // remove
                if (resourceIds.indexOf(resourceMutation.setResourceId) === -1) { // not already in there
                    resourceIds.push(resourceMutation.setResourceId); // add
                }
                eventDef.resourceIds = resourceIds;
            }
        }
    }
    /*
    HACK
    TODO: use EventUi system instead of this
    */
    function computeResourceEditable(eventDef, calendar) {
        var resourceEditable = eventDef.resourceEditable;
        if (resourceEditable == null) {
            var source = eventDef.sourceId && calendar.state.eventSources[eventDef.sourceId];
            if (source) {
                resourceEditable = source.extendedProps.resourceEditable; // used the Source::extendedProps hack
            }
            if (resourceEditable == null) {
                resourceEditable = calendar.opt('eventResourceEditable');
                if (resourceEditable == null) {
                    resourceEditable = calendar.opt('editable'); // TODO: use defaults system instead
                }
            }
        }
        return resourceEditable;
    }
    function transformEventDrop(mutation, calendar) {
        var resourceMutation = mutation.resourceMutation;
        if (resourceMutation) {
            return {
                oldResource: calendar.getResourceById(resourceMutation.matchResourceId),
                newResource: calendar.getResourceById(resourceMutation.setResourceId)
            };
        }
        else {
            return {
                oldResource: null,
                newResource: null
            };
        }
    }

    function transformDateSelectionJoin(hit0, hit1) {
        var resourceId0 = hit0.dateSpan.resourceId;
        var resourceId1 = hit1.dateSpan.resourceId;
        if (resourceId0 && resourceId1) {
            if (hit0.component.allowAcrossResources === false &&
                resourceId0 !== resourceId1) {
                return false;
            }
            else {
                return { resourceId: resourceId0 };
            }
        }
    }

    var ResourceApi = /** @class */ (function () {
        function ResourceApi(calendar, rawResource) {
            this._calendar = calendar;
            this._resource = rawResource;
        }
        ResourceApi.prototype.setProp = function (name, value) {
            this._calendar.dispatch({
                type: 'SET_RESOURCE_PROP',
                resourceId: this._resource.id,
                propName: name,
                propValue: value
            });
        };
        ResourceApi.prototype.remove = function () {
            this._calendar.dispatch({
                type: 'REMOVE_RESOURCE',
                resourceId: this._resource.id
            });
        };
        ResourceApi.prototype.getParent = function () {
            var calendar = this._calendar;
            var parentId = this._resource.parentId;
            if (parentId) {
                return new ResourceApi(calendar, calendar.state.resourceSource[parentId]);
            }
            else {
                return null;
            }
        };
        ResourceApi.prototype.getChildren = function () {
            var thisResourceId = this._resource.id;
            var calendar = this._calendar;
            var resourceStore = calendar.state.resourceStore;
            var childApis = [];
            for (var resourceId in resourceStore) {
                if (resourceStore[resourceId].parentId === thisResourceId) {
                    childApis.push(new ResourceApi(calendar, resourceStore[resourceId]));
                }
            }
            return childApis;
        };
        /*
        this is really inefficient!
        TODO: make EventApi::resourceIds a hash or keep an index in the Calendar's state
        */
        ResourceApi.prototype.getEvents = function () {
            var thisResourceId = this._resource.id;
            var calendar = this._calendar;
            var _a = calendar.state.eventStore, defs = _a.defs, instances = _a.instances;
            var eventApis = [];
            for (var instanceId in instances) {
                var instance = instances[instanceId];
                var def = defs[instance.defId];
                if (def.resourceIds.indexOf(thisResourceId) !== -1) { // inefficient!!!
                    eventApis.push(new core.EventApi(calendar, def, instance));
                }
            }
            return eventApis;
        };
        Object.defineProperty(ResourceApi.prototype, "id", {
            get: function () { return this._resource.id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "title", {
            get: function () { return this._resource.title; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventConstraint", {
            get: function () { return this._resource.ui.constraints[0] || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventOverlap", {
            get: function () { return this._resource.ui.overlap; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventAllow", {
            get: function () { return this._resource.ui.allows[0] || null; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventBackgroundColor", {
            get: function () { return this._resource.ui.backgroundColor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventBorderColor", {
            get: function () { return this._resource.ui.borderColor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventTextColor", {
            get: function () { return this._resource.ui.textColor; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "eventClassNames", {
            // NOTE: user can't modify these because Object.freeze was called in event-def parsing
            get: function () { return this._resource.ui.classNames; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceApi.prototype, "extendedProps", {
            get: function () { return this._resource.extendedProps; },
            enumerable: true,
            configurable: true
        });
        return ResourceApi;
    }());

    core.Calendar.prototype.addResource = function (input, scrollTo) {
        var _a;
        if (scrollTo === void 0) { scrollTo = true; }
        var resourceHash;
        var resource;
        if (input instanceof ResourceApi) {
            resource = input._resource;
            resourceHash = (_a = {}, _a[resource.id] = resource, _a);
        }
        else {
            resourceHash = {};
            resource = parseResource(input, '', resourceHash, this);
        }
        // HACK
        if (scrollTo) {
            this.component.view.addScroll({ forcedRowId: resource.id });
        }
        this.dispatch({
            type: 'ADD_RESOURCE',
            resourceHash: resourceHash
        });
        return new ResourceApi(this, resource);
    };
    core.Calendar.prototype.getResourceById = function (id) {
        id = String(id);
        if (this.state.resourceStore) { // guard against calendar with no resource functionality
            var rawResource = this.state.resourceStore[id];
            if (rawResource) {
                return new ResourceApi(this, rawResource);
            }
        }
        return null;
    };
    core.Calendar.prototype.getResources = function () {
        var resourceStore = this.state.resourceStore;
        var resourceApis = [];
        if (resourceStore) { // guard against calendar with no resource functionality
            for (var resourceId in resourceStore) {
                resourceApis.push(new ResourceApi(this, resourceStore[resourceId]));
            }
        }
        return resourceApis;
    };
    core.Calendar.prototype.getTopLevelResources = function () {
        var resourceStore = this.state.resourceStore;
        var resourceApis = [];
        if (resourceStore) { // guard against calendar with no resource functionality
            for (var resourceId in resourceStore) {
                if (!resourceStore[resourceId].parentId) {
                    resourceApis.push(new ResourceApi(this, resourceStore[resourceId]));
                }
            }
        }
        return resourceApis;
    };
    core.Calendar.prototype.rerenderResources = function () {
        this.dispatch({
            type: 'RESET_RESOURCES'
        });
    };
    core.Calendar.prototype.refetchResources = function () {
        this.dispatch({
            type: 'REFETCH_RESOURCES'
        });
    };
    function transformDatePoint(dateSpan, calendar) {
        return dateSpan.resourceId ?
            { resource: calendar.getResourceById(dateSpan.resourceId) } :
            {};
    }
    function transformDateSpan(dateSpan, calendar) {
        return dateSpan.resourceId ?
            { resource: calendar.getResourceById(dateSpan.resourceId) } :
            {};
    }

    /*
    splits things BASED OFF OF which resources they are associated with.
    creates a '' entry which is when something has NO resource.
    */
    var ResourceSplitter = /** @class */ (function (_super) {
        __extends(ResourceSplitter, _super);
        function ResourceSplitter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResourceSplitter.prototype.getKeyInfo = function (props) {
            return __assign({ '': {} }, props.resourceStore // already has `ui` and `businessHours` keys!
            );
        };
        ResourceSplitter.prototype.getKeysForDateSpan = function (dateSpan) {
            return [dateSpan.resourceId || ''];
        };
        ResourceSplitter.prototype.getKeysForEventDef = function (eventDef) {
            var resourceIds = eventDef.resourceIds;
            if (!resourceIds.length) {
                return [''];
            }
            return resourceIds;
        };
        return ResourceSplitter;
    }(core.Splitter));

    function isPropsValidWithResources(props, calendar) {
        var splitter = new ResourceSplitter();
        var sets = splitter.splitProps(__assign({}, props, { resourceStore: calendar.state.resourceStore }));
        for (var resourceId in sets) {
            var props_1 = sets[resourceId];
            // merge in event data from the non-resource segment
            if (resourceId && sets['']) { // current segment is not the non-resource one, and there IS a non-resource one
                props_1 = __assign({}, props_1, { eventStore: core.mergeEventStores(sets[''].eventStore, props_1.eventStore), eventUiBases: __assign({}, sets[''].eventUiBases, props_1.eventUiBases) });
            }
            if (!core.isPropsValid(props_1, calendar, { resourceId: resourceId }, filterConfig.bind(null, resourceId))) {
                return false;
            }
        }
        return true;
    }
    function filterConfig(resourceId, config) {
        return __assign({}, config, { constraints: filterConstraints(resourceId, config.constraints) });
    }
    function filterConstraints(resourceId, constraints) {
        return constraints.map(function (constraint) {
            var defs = constraint.defs;
            if (defs) { // we are dealing with an EventStore
                // if any of the events define constraints to resources that are NOT this resource,
                // then this resource is unconditionally prohibited, which is what a `false` value does.
                for (var defId in defs) {
                    var resourceIds = defs[defId].resourceIds;
                    if (resourceIds.length && resourceIds.indexOf(resourceId) === -1) { // TODO: use a hash?!!! (for other reasons too)
                        return false;
                    }
                }
            }
            return constraint;
        });
    }

    function transformExternalDef(dateSpan) {
        return dateSpan.resourceId ?
            { resourceId: dateSpan.resourceId } :
            {};
    }

    function transformEventResizeJoin(hit0, hit1) {
        var component = hit0.component;
        if (component.allowAcrossResources === false &&
            hit0.dateSpan.resourceId !== hit1.dateSpan.resourceId) {
            return false;
        }
    }

    core.EventApi.prototype.getResources = function () {
        var calendar = this._calendar;
        return this._def.resourceIds.map(function (resourceId) {
            return calendar.getResourceById(resourceId);
        });
    };
    core.EventApi.prototype.setResources = function (resources) {
        var resourceIds = [];
        // massage resources -> resourceIds
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            var resourceId = null;
            if (typeof resource === 'string') {
                resourceId = resource;
            }
            else if (typeof resource === 'number') {
                resourceId = String(resource);
            }
            else if (resource instanceof ResourceApi) {
                resourceId = resource.id; // guaranteed to always have an ID. hmmm
            }
            else {
                console.warn('unknown resource type: ' + resource);
            }
            if (resourceId) {
                resourceIds.push(resourceId);
            }
        }
        this.mutate({
            standardProps: {
                resourceIds: resourceIds
            }
        });
    };

    var RELEASE_DATE = '2019-06-02'; // for Scheduler
    var UPGRADE_WINDOW = 365 + 7; // days. 1 week leeway, for tz shift reasons too
    var LICENSE_INFO_URL = 'http://fullcalendar.io/scheduler/license/';
    var PRESET_LICENSE_KEYS = [
        'GPL-My-Project-Is-Open-Source',
        'CC-Attribution-NonCommercial-NoDerivatives'
    ];
    var CSS = {
        position: 'absolute',
        'z-index': 99999,
        bottom: '1px',
        left: '1px',
        background: '#eee',
        'border-color': '#ddd',
        'border-style': 'solid',
        'border-width': '1px 1px 0 0',
        padding: '2px 4px',
        'font-size': '12px',
        'border-top-right-radius': '3px'
    };
    function injectLicenseWarning(containerEl, calendar) {
        var key = calendar.opt('schedulerLicenseKey');
        if (!isImmuneUrl(window.location.href) && !isValidKey(key)) {
            core.appendToElement(containerEl, '<div class="fc-license-message" style="' + core.htmlEscape(core.cssToStr(CSS)) + '">' +
                'Please use a valid license key. <a href="' + LICENSE_INFO_URL + '">More Info</a>' +
                '</div>');
        }
    }
    /*
    This decryption is not meant to be bulletproof. Just a way to remind about an upgrade.
    */
    function isValidKey(key) {
        if (PRESET_LICENSE_KEYS.indexOf(key) !== -1) {
            return true;
        }
        var parts = (key || '').match(/^(\d+)\-fcs\-(\d+)$/);
        if (parts && (parts[1].length === 10)) {
            var purchaseDate = new Date(parseInt(parts[2], 10) * 1000);
            var releaseDate = new Date(core.config.mockSchedulerReleaseDate || RELEASE_DATE);
            if (core.isValidDate(releaseDate)) { // token won't be replaced in dev mode
                var minPurchaseDate = core.addDays(releaseDate, -UPGRADE_WINDOW);
                if (minPurchaseDate < purchaseDate) {
                    return true;
                }
            }
        }
        return false;
    }
    function isImmuneUrl(url) {
        return /\w+\:\/\/fullcalendar\.io\/|\/demos\/[\w-]+\.html$/.test(url);
    }

    var optionChangeHandlers = {
        resources: handleResources
    };
    function handleResources(newSourceInput, calendar, deepEquals) {
        var oldSourceInput = calendar.state.resourceSource._raw;
        if (!deepEquals(oldSourceInput, newSourceInput)) {
            calendar.dispatch({
                type: 'RESET_RESOURCE_SOURCE',
                resourceSourceInput: newSourceInput
            });
        }
    }

    registerResourceSourceDef({
        ignoreRange: true,
        parseMeta: function (raw) {
            if (Array.isArray(raw)) {
                return raw;
            }
            else if (Array.isArray(raw.resources)) {
                return raw.resources;
            }
            return null;
        },
        fetch: function (arg, successCallback) {
            successCallback({
                rawResources: arg.resourceSource.meta
            });
        }
    });

    registerResourceSourceDef({
        parseMeta: function (raw) {
            if (typeof raw === 'function') {
                return raw;
            }
            else if (typeof raw.resources === 'function') {
                return raw.resources;
            }
            return null;
        },
        fetch: function (arg, success, failure) {
            var dateEnv = arg.calendar.dateEnv;
            var func = arg.resourceSource.meta;
            var publicArg = {};
            if (arg.range) {
                publicArg = {
                    start: dateEnv.toDate(arg.range.start),
                    end: dateEnv.toDate(arg.range.end),
                    startStr: dateEnv.formatIso(arg.range.start),
                    endStr: dateEnv.formatIso(arg.range.end),
                    timeZone: dateEnv.timeZone
                };
            }
            // TODO: make more dry with EventSourceFunc
            // TODO: accept a response?
            core.unpromisify(func.bind(null, publicArg), function (rawResources) {
                success({ rawResources: rawResources }); // needs an object response
            }, failure // send errorObj directly to failure callback
            );
        }
    });

    registerResourceSourceDef({
        parseMeta: function (raw) {
            if (typeof raw === 'string') {
                raw = { url: raw };
            }
            else if (!raw || typeof raw !== 'object' || !raw.url) {
                return null;
            }
            return {
                url: raw.url,
                method: (raw.method || 'GET').toUpperCase(),
                extraParams: raw.extraParams
            };
        },
        fetch: function (arg, successCallback, failureCallback) {
            var meta = arg.resourceSource.meta;
            var requestParams = buildRequestParams(meta, arg.range, arg.calendar);
            core.requestJson(meta.method, meta.url, requestParams, function (rawResources, xhr) {
                successCallback({ rawResources: rawResources, xhr: xhr });
            }, function (message, xhr) {
                failureCallback({ message: message, xhr: xhr });
            });
        }
    });
    // TODO: somehow consolidate with event json feed
    function buildRequestParams(meta, range, calendar) {
        var dateEnv = calendar.dateEnv;
        var startParam;
        var endParam;
        var timeZoneParam;
        var customRequestParams;
        var params = {};
        if (range) {
            // startParam = meta.startParam
            // if (startParam == null) {
            startParam = calendar.opt('startParam');
            // }
            // endParam = meta.endParam
            // if (endParam == null) {
            endParam = calendar.opt('endParam');
            // }
            // timeZoneParam = meta.timeZoneParam
            // if (timeZoneParam == null) {
            timeZoneParam = calendar.opt('timeZoneParam');
            // }
            params[startParam] = dateEnv.formatIso(range.start);
            params[endParam] = dateEnv.formatIso(range.end);
            if (dateEnv.timeZone !== 'local') {
                params[timeZoneParam] = dateEnv.timeZone;
            }
        }
        // retrieve any outbound GET/POST data from the options
        if (typeof meta.extraParams === 'function') {
            // supplied as a function that returns a key/value object
            customRequestParams = meta.extraParams();
        }
        else {
            // probably supplied as a straight key/value object
            customRequestParams = meta.extraParams || {};
        }
        __assign(params, customRequestParams);
        return params;
    }

    function buildResourceTextFunc(resourceTextSetting, calendar) {
        if (typeof resourceTextSetting === 'function') {
            return function (resource) {
                return resourceTextSetting(new ResourceApi(calendar, resource));
            };
        }
        else {
            return function (resource) {
                return resource.title || getPublicId(resource.id);
            };
        }
    }

    var ResourceDayHeader = /** @class */ (function (_super) {
        __extends(ResourceDayHeader, _super);
        function ResourceDayHeader(context, parentEl) {
            var _this = _super.call(this, context) || this;
            _this.datesAboveResources = _this.opt('datesAboveResources');
            _this.resourceTextFunc = buildResourceTextFunc(_this.opt('resourceText'), _this.calendar);
            parentEl.innerHTML = ''; // because might be nbsp
            parentEl.appendChild(_this.el = core.htmlToElement('<div class="fc-row ' + _this.theme.getClass('headerRow') + '">' +
                '<table class="' + _this.theme.getClass('tableGrid') + '">' +
                '<thead></thead>' +
                '</table>' +
                '</div>'));
            _this.thead = _this.el.querySelector('thead');
            return _this;
        }
        ResourceDayHeader.prototype.destroy = function () {
            core.removeElement(this.el);
        };
        ResourceDayHeader.prototype.render = function (props) {
            var html;
            this.dateFormat = core.createFormatter(this.opt('columnHeaderFormat') ||
                core.computeFallbackHeaderFormat(props.datesRepDistinctDays, props.dates.length));
            if (props.dates.length === 1) {
                html = this.renderResourceRow(props.resources);
            }
            else {
                if (this.datesAboveResources) {
                    html = this.renderDayAndResourceRows(props.dates, props.resources);
                }
                else {
                    html = this.renderResourceAndDayRows(props.resources, props.dates);
                }
            }
            this.thead.innerHTML = html;
            this.processResourceEls(props.resources);
        };
        ResourceDayHeader.prototype.renderResourceRow = function (resources) {
            var _this = this;
            var cellHtmls = resources.map(function (resource) {
                return _this.renderResourceCell(resource, 1);
            });
            return this.buildTr(cellHtmls);
        };
        ResourceDayHeader.prototype.renderDayAndResourceRows = function (dates, resources) {
            var dateHtmls = [];
            var resourceHtmls = [];
            for (var _i = 0, dates_1 = dates; _i < dates_1.length; _i++) {
                var date = dates_1[_i];
                dateHtmls.push(this.renderDateCell(date, resources.length));
                for (var _a = 0, resources_1 = resources; _a < resources_1.length; _a++) {
                    var resource = resources_1[_a];
                    resourceHtmls.push(this.renderResourceCell(resource, 1, date));
                }
            }
            return this.buildTr(dateHtmls) +
                this.buildTr(resourceHtmls);
        };
        ResourceDayHeader.prototype.renderResourceAndDayRows = function (resources, dates) {
            var resourceHtmls = [];
            var dateHtmls = [];
            for (var _i = 0, resources_2 = resources; _i < resources_2.length; _i++) {
                var resource = resources_2[_i];
                resourceHtmls.push(this.renderResourceCell(resource, dates.length));
                for (var _a = 0, dates_2 = dates; _a < dates_2.length; _a++) {
                    var date = dates_2[_a];
                    dateHtmls.push(this.renderDateCell(date, 1, resource));
                }
            }
            return this.buildTr(resourceHtmls) +
                this.buildTr(dateHtmls);
        };
        // Cell Rendering Utils
        // ----------------------------------------------------------------------------------------------
        // a cell with the resource name. might be associated with a specific day
        ResourceDayHeader.prototype.renderResourceCell = function (resource, colspan, date) {
            var dateEnv = this.dateEnv;
            return '<th class="fc-resource-cell"' +
                ' data-resource-id="' + resource.id + '"' +
                (date ?
                    ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
                    '') +
                (colspan > 1 ?
                    ' colspan="' + colspan + '"' :
                    '') +
                '>' +
                core.htmlEscape(this.resourceTextFunc(resource)) +
                '</th>';
        };
        // a cell with date text. might have a resource associated with it
        ResourceDayHeader.prototype.renderDateCell = function (date, colspan, resource) {
            var props = this.props;
            return core.renderDateCell(date, props.dateProfile, props.datesRepDistinctDays, props.dates.length * props.resources.length, this.dateFormat, this.context, colspan, resource ? 'data-resource-id="' + resource.id + '"' : '');
        };
        ResourceDayHeader.prototype.buildTr = function (cellHtmls) {
            if (!cellHtmls.length) {
                cellHtmls = ['<td>&nbsp;</td>'];
            }
            if (this.props.renderIntroHtml) {
                cellHtmls = [this.props.renderIntroHtml()].concat(cellHtmls);
            }
            if (this.isRtl) {
                cellHtmls.reverse();
            }
            return '<tr>' +
                cellHtmls.join('') +
                '</tr>';
        };
        // Post-rendering
        // ----------------------------------------------------------------------------------------------
        // given a container with already rendered resource cells
        ResourceDayHeader.prototype.processResourceEls = function (resources) {
            var _this = this;
            var view = this.view;
            core.findElements(this.thead, '.fc-resource-cell').forEach(function (node, col) {
                col = col % resources.length;
                if (_this.isRtl) {
                    col = resources.length - 1 - col;
                }
                var resource = resources[col];
                view.publiclyTrigger('resourceRender', [
                    {
                        resource: new ResourceApi(_this.calendar, resource),
                        el: node,
                        view: view
                    }
                ]);
            });
        };
        return ResourceDayHeader;
    }(core.Component));

    var AbstractResourceDayTable = /** @class */ (function () {
        function AbstractResourceDayTable(dayTable, resources) {
            this.dayTable = dayTable;
            this.resources = resources;
            this.resourceIndex = new ResourceIndex(resources);
            this.rowCnt = dayTable.rowCnt;
            this.colCnt = dayTable.colCnt * resources.length;
            this.cells = this.buildCells();
        }
        AbstractResourceDayTable.prototype.buildCells = function () {
            var _a = this, rowCnt = _a.rowCnt, dayTable = _a.dayTable, resources = _a.resources;
            var rows = [];
            for (var row = 0; row < rowCnt; row++) {
                var rowCells = [];
                for (var dateCol = 0; dateCol < dayTable.colCnt; dateCol++) {
                    for (var resourceCol = 0; resourceCol < resources.length; resourceCol++) {
                        var resource = resources[resourceCol];
                        var htmlAttrs = 'data-resource-id="' + resource.id + '"';
                        rowCells[this.computeCol(dateCol, resourceCol)] = {
                            date: dayTable.cells[row][dateCol].date,
                            resource: resource,
                            htmlAttrs: htmlAttrs
                        };
                    }
                }
                rows.push(rowCells);
            }
            return rows;
        };
        return AbstractResourceDayTable;
    }());
    /*
    resources over dates
    */
    var ResourceDayTable = /** @class */ (function (_super) {
        __extends(ResourceDayTable, _super);
        function ResourceDayTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResourceDayTable.prototype.computeCol = function (dateI, resourceI) {
            return resourceI * this.dayTable.colCnt + dateI;
        };
        /*
        all date ranges are intact
        */
        ResourceDayTable.prototype.computeColRanges = function (dateStartI, dateEndI, resourceI) {
            return [
                {
                    firstCol: this.computeCol(dateStartI, resourceI),
                    lastCol: this.computeCol(dateEndI, resourceI),
                    isStart: true,
                    isEnd: true
                }
            ];
        };
        return ResourceDayTable;
    }(AbstractResourceDayTable));
    /*
    dates over resources
    */
    var DayResourceTable = /** @class */ (function (_super) {
        __extends(DayResourceTable, _super);
        function DayResourceTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DayResourceTable.prototype.computeCol = function (dateI, resourceI) {
            return dateI * this.resources.length + resourceI;
        };
        /*
        every single day is broken up
        */
        DayResourceTable.prototype.computeColRanges = function (dateStartI, dateEndI, resourceI) {
            var segs = [];
            for (var i = dateStartI; i <= dateEndI; i++) {
                var col = this.computeCol(i, resourceI);
                segs.push({
                    firstCol: col,
                    lastCol: col,
                    isStart: i === dateStartI,
                    isEnd: i === dateEndI
                });
            }
            return segs;
        };
        return DayResourceTable;
    }(AbstractResourceDayTable));
    var ResourceIndex = /** @class */ (function () {
        function ResourceIndex(resources) {
            var indicesById = {};
            var ids = [];
            for (var i = 0; i < resources.length; i++) {
                var id = resources[i].id;
                ids.push(id);
                indicesById[id] = i;
            }
            this.ids = ids;
            this.indicesById = indicesById;
            this.length = resources.length;
        }
        return ResourceIndex;
    }());
    /*
    TODO: just use ResourceHash somehow? could then use the generic ResourceSplitter
    */
    var VResourceSplitter = /** @class */ (function (_super) {
        __extends(VResourceSplitter, _super);
        function VResourceSplitter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VResourceSplitter.prototype.getKeyInfo = function (props) {
            var resourceDayTable = props.resourceDayTable;
            var hash = core.mapHash(resourceDayTable.resourceIndex.indicesById, function (i) {
                return resourceDayTable.resources[i]; // has `ui` AND `businessHours` keys!
            }); // :(
            hash[''] = {};
            return hash;
        };
        VResourceSplitter.prototype.getKeysForDateSpan = function (dateSpan) {
            return [dateSpan.resourceId || ''];
        };
        VResourceSplitter.prototype.getKeysForEventDef = function (eventDef) {
            var resourceIds = eventDef.resourceIds;
            if (!resourceIds.length) {
                return [''];
            }
            return resourceIds;
        };
        return VResourceSplitter;
    }(core.Splitter));
    // joiner
    var NO_SEGS = []; // for memoizing
    var VResourceJoiner = /** @class */ (function () {
        function VResourceJoiner() {
            this.joinDateSelection = core.memoize(this.joinSegs);
            this.joinBusinessHours = core.memoize(this.joinSegs);
            this.joinFgEvents = core.memoize(this.joinSegs);
            this.joinBgEvents = core.memoize(this.joinSegs);
            this.joinEventDrags = core.memoize(this.joinInteractions);
            this.joinEventResizes = core.memoize(this.joinInteractions);
        }
        /*
        propSets also has a '' key for things with no resource
        */
        VResourceJoiner.prototype.joinProps = function (propSets, resourceDayTable) {
            var dateSelectionSets = [];
            var businessHoursSets = [];
            var fgEventSets = [];
            var bgEventSets = [];
            var eventDrags = [];
            var eventResizes = [];
            var eventSelection = '';
            var keys = resourceDayTable.resourceIndex.ids.concat(['']); // add in the all-resource key
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var props = propSets[key];
                dateSelectionSets.push(props.dateSelectionSegs);
                businessHoursSets.push(key ? props.businessHourSegs : NO_SEGS); // don't include redundant all-resource businesshours
                fgEventSets.push(key ? props.fgEventSegs : NO_SEGS); // don't include fg all-resource segs
                bgEventSets.push(props.bgEventSegs);
                eventDrags.push(props.eventDrag);
                eventResizes.push(props.eventResize);
                eventSelection = eventSelection || props.eventSelection;
            }
            return {
                dateSelectionSegs: this.joinDateSelection.apply(this, [resourceDayTable].concat(dateSelectionSets)),
                businessHourSegs: this.joinBusinessHours.apply(this, [resourceDayTable].concat(businessHoursSets)),
                fgEventSegs: this.joinFgEvents.apply(this, [resourceDayTable].concat(fgEventSets)),
                bgEventSegs: this.joinBgEvents.apply(this, [resourceDayTable].concat(bgEventSets)),
                eventDrag: this.joinEventDrags.apply(this, [resourceDayTable].concat(eventDrags)),
                eventResize: this.joinEventResizes.apply(this, [resourceDayTable].concat(eventResizes)),
                eventSelection: eventSelection
            };
        };
        VResourceJoiner.prototype.joinSegs = function (resourceDayTable) {
            var segGroups = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                segGroups[_i - 1] = arguments[_i];
            }
            var resourceCnt = resourceDayTable.resources.length;
            var transformedSegs = [];
            for (var i = 0; i < resourceCnt; i++) {
                for (var _a = 0, _b = segGroups[i]; _a < _b.length; _a++) {
                    var seg = _b[_a];
                    transformedSegs.push.apply(transformedSegs, this.transformSeg(seg, resourceDayTable, i));
                }
                for (var _c = 0, _d = segGroups[resourceCnt]; _c < _d.length; _c++) { // one beyond. the all-resource
                    var seg = _d[_c];
                    transformedSegs.push.apply(// one beyond. the all-resource
                    transformedSegs, this.transformSeg(seg, resourceDayTable, i));
                }
            }
            return transformedSegs;
        };
        /*
        for expanding non-resource segs to all resources.
        only for public use.
        no memoizing.
        */
        VResourceJoiner.prototype.expandSegs = function (resourceDayTable, segs) {
            var resourceCnt = resourceDayTable.resources.length;
            var transformedSegs = [];
            for (var i = 0; i < resourceCnt; i++) {
                for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                    var seg = segs_1[_i];
                    transformedSegs.push.apply(transformedSegs, this.transformSeg(seg, resourceDayTable, i));
                }
            }
            return transformedSegs;
        };
        VResourceJoiner.prototype.joinInteractions = function (resourceDayTable) {
            var interactions = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                interactions[_i - 1] = arguments[_i];
            }
            var resourceCnt = resourceDayTable.resources.length;
            var affectedInstances = {};
            var transformedSegs = [];
            var isEvent = false;
            var sourceSeg = null;
            for (var i = 0; i < resourceCnt; i++) {
                var interaction = interactions[i];
                if (interaction) {
                    for (var _a = 0, _b = interaction.segs; _a < _b.length; _a++) {
                        var seg = _b[_a];
                        transformedSegs.push.apply(transformedSegs, this.transformSeg(seg, resourceDayTable, i) // TODO: templateify Interaction::segs
                        );
                    }
                    __assign(affectedInstances, interaction.affectedInstances);
                    isEvent = isEvent || interaction.isEvent;
                    sourceSeg = sourceSeg || interaction.sourceSeg;
                }
                if (interactions[resourceCnt]) { // one beyond. the all-resource
                    for (var _c = 0, _d = interactions[resourceCnt].segs; _c < _d.length; _c++) {
                        var seg = _d[_c];
                        transformedSegs.push.apply(transformedSegs, this.transformSeg(seg, resourceDayTable, i) // TODO: templateify Interaction::segs
                        );
                    }
                }
            }
            return {
                affectedInstances: affectedInstances,
                segs: transformedSegs,
                isEvent: isEvent,
                sourceSeg: sourceSeg
            };
        };
        return VResourceJoiner;
    }());

    /*
    doesn't accept grouping
    */
    function flattenResources(resourceStore, orderSpecs) {
        return buildRowNodes(resourceStore, [], orderSpecs, false, {}, true)
            .map(function (node) {
            return node.resource;
        });
    }
    function buildRowNodes(resourceStore, groupSpecs, orderSpecs, isVGrouping, expansions, expansionDefault) {
        var complexNodes = buildHierarchy(resourceStore, isVGrouping ? -1 : 1, groupSpecs, orderSpecs);
        var flatNodes = [];
        flattenNodes(complexNodes, flatNodes, isVGrouping, [], 0, expansions, expansionDefault);
        return flatNodes;
    }
    function flattenNodes(complexNodes, res, isVGrouping, rowSpans, depth, expansions, expansionDefault) {
        for (var i = 0; i < complexNodes.length; i++) {
            var complexNode = complexNodes[i];
            var group = complexNode.group;
            if (group) {
                if (isVGrouping) {
                    var firstRowIndex = res.length;
                    var rowSpanIndex = rowSpans.length;
                    flattenNodes(complexNode.children, res, isVGrouping, rowSpans.concat(0), depth, expansions, expansionDefault);
                    if (firstRowIndex < res.length) {
                        var firstRow = res[firstRowIndex];
                        var firstRowSpans = firstRow.rowSpans = firstRow.rowSpans.slice();
                        firstRowSpans[rowSpanIndex] = res.length - firstRowIndex;
                    }
                }
                else {
                    var id = group.spec.field + ':' + group.value;
                    var isExpanded = expansions[id] != null ? expansions[id] : expansionDefault;
                    res.push({ id: id, group: group, isExpanded: isExpanded });
                    if (isExpanded) {
                        flattenNodes(complexNode.children, res, isVGrouping, rowSpans, depth + 1, expansions, expansionDefault);
                    }
                }
            }
            else if (complexNode.resource) {
                var id = complexNode.resource.id;
                var isExpanded = expansions[id] != null ? expansions[id] : expansionDefault;
                res.push({
                    id: id,
                    rowSpans: rowSpans,
                    depth: depth,
                    isExpanded: isExpanded,
                    hasChildren: Boolean(complexNode.children.length),
                    resource: complexNode.resource,
                    resourceFields: complexNode.resourceFields
                });
                if (isExpanded) {
                    flattenNodes(complexNode.children, res, isVGrouping, rowSpans, depth + 1, expansions, expansionDefault);
                }
            }
        }
    }
    function buildHierarchy(resourceStore, maxDepth, groupSpecs, orderSpecs) {
        var resourceNodes = buildResourceNodes(resourceStore, orderSpecs);
        var builtNodes = [];
        for (var resourceId in resourceNodes) {
            var resourceNode = resourceNodes[resourceId];
            if (!resourceNode.resource.parentId) {
                insertResourceNode(resourceNode, builtNodes, groupSpecs, 0, maxDepth, orderSpecs);
            }
        }
        return builtNodes;
    }
    function buildResourceNodes(resourceStore, orderSpecs) {
        var nodeHash = {};
        for (var resourceId in resourceStore) {
            var resource = resourceStore[resourceId];
            nodeHash[resourceId] = {
                resource: resource,
                resourceFields: buildResourceFields(resource),
                children: []
            };
        }
        for (var resourceId in resourceStore) {
            var resource = resourceStore[resourceId];
            if (resource.parentId) {
                var parentNode = nodeHash[resource.parentId];
                if (parentNode) {
                    insertResourceNodeInSiblings(nodeHash[resourceId], parentNode.children, orderSpecs);
                }
            }
        }
        return nodeHash;
    }
    function insertResourceNode(resourceNode, nodes, groupSpecs, depth, maxDepth, orderSpecs) {
        if (groupSpecs.length && (maxDepth === -1 || depth <= maxDepth)) {
            var groupNode = ensureGroupNodes(resourceNode, nodes, groupSpecs[0]);
            insertResourceNode(resourceNode, groupNode.children, groupSpecs.slice(1), depth + 1, maxDepth, orderSpecs);
        }
        else {
            insertResourceNodeInSiblings(resourceNode, nodes, orderSpecs);
        }
    }
    function ensureGroupNodes(resourceNode, nodes, groupSpec) {
        var groupValue = resourceNode.resourceFields[groupSpec.field];
        var groupNode;
        var newGroupIndex;
        // find an existing group that matches, or determine the position for a new group
        if (groupSpec.order) {
            for (newGroupIndex = 0; newGroupIndex < nodes.length; newGroupIndex++) {
                var node = nodes[newGroupIndex];
                if (node.group) {
                    var cmp = core.flexibleCompare(groupValue, node.group.value) * groupSpec.order;
                    if (cmp === 0) {
                        groupNode = node;
                        break;
                    }
                    else if (cmp < 0) {
                        break;
                    }
                }
            }
        }
        else { // the groups are unordered
            for (newGroupIndex = 0; newGroupIndex < nodes.length; newGroupIndex++) {
                var node = nodes[newGroupIndex];
                if (node.group && groupValue === node.group.value) {
                    groupNode = node;
                    break;
                }
            }
        }
        if (!groupNode) {
            groupNode = {
                group: {
                    value: groupValue,
                    spec: groupSpec
                },
                children: []
            };
            nodes.splice(newGroupIndex, 0, groupNode);
        }
        return groupNode;
    }
    function insertResourceNodeInSiblings(resourceNode, siblings, orderSpecs) {
        var i;
        for (i = 0; i < siblings.length; i++) {
            var cmp = core.compareByFieldSpecs(siblings[i].resourceFields, resourceNode.resourceFields, orderSpecs);
            if (cmp > 0) { // went 1 past. insert at i
                break;
            }
        }
        siblings.splice(i, 0, resourceNode);
    }
    function buildResourceFields(resource) {
        var obj = __assign({}, resource.extendedProps, resource.ui, resource);
        delete obj.ui;
        delete obj.extendedProps;
        return obj;
    }
    function isGroupsEqual(group0, group1) {
        return group0.spec === group1.spec && group0.value === group1.value;
    }

    var main = core.createPlugin({
        reducers: [resourcesReducers],
        eventDefParsers: [parseEventDef],
        eventDragMutationMassagers: [massageEventDragMutation],
        eventDefMutationAppliers: [applyEventDefMutation],
        dateSelectionTransformers: [transformDateSelectionJoin],
        datePointTransforms: [transformDatePoint],
        dateSpanTransforms: [transformDateSpan],
        viewPropsTransformers: [ResourceDataAdder, ResourceEventConfigAdder],
        isPropsValid: isPropsValidWithResources,
        externalDefTransforms: [transformExternalDef],
        eventResizeJoinTransforms: [transformEventResizeJoin],
        viewContainerModifiers: [injectLicenseWarning],
        eventDropTransformers: [transformEventDrop],
        optionChangeHandlers: optionChangeHandlers
    });

    exports.AbstractResourceDayTable = AbstractResourceDayTable;
    exports.DayResourceTable = DayResourceTable;
    exports.ResourceApi = ResourceApi;
    exports.ResourceDayHeader = ResourceDayHeader;
    exports.ResourceDayTable = ResourceDayTable;
    exports.ResourceSplitter = ResourceSplitter;
    exports.VResourceJoiner = VResourceJoiner;
    exports.VResourceSplitter = VResourceSplitter;
    exports.buildResourceFields = buildResourceFields;
    exports.buildResourceTextFunc = buildResourceTextFunc;
    exports.buildRowNodes = buildRowNodes;
    exports.computeResourceEditable = computeResourceEditable;
    exports.default = main;
    exports.flattenResources = flattenResources;
    exports.isGroupsEqual = isGroupsEqual;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
