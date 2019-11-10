/*!
 * FullCalendar Scheduler v4.0.0-alpha.3
 * Docs & License: https://fullcalendar.io/scheduler/
 * (c) 2018 Adam Shaw
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fullcalendar"), require("superagent"));
	else if(typeof define === 'function' && define.amd)
		define(["fullcalendar", "superagent"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("fullcalendar"), require("superagent")) : factory(root["FullCalendar"], root["superagent"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_65__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
derived from:
https://github.com/Microsoft/tslib/blob/v1.6.0/tslib.js

only include the helpers we need, to keep down filesize
*/
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p]; };
exports.__extends = function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
exports.__assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var tslib_2 = __webpack_require__(1);
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
exports.AbstractResourceDayTable = AbstractResourceDayTable;
/*
resources over dates
*/
var ResourceDayTable = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceDayTable, _super);
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
exports.ResourceDayTable = ResourceDayTable;
/*
dates over resources
*/
var DayResourceTable = /** @class */ (function (_super) {
    tslib_1.__extends(DayResourceTable, _super);
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
exports.DayResourceTable = DayResourceTable;
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
exports.ResourceIndex = ResourceIndex;
function isVResourceViewEnabled(viewSpec) {
    var options = viewSpec.options;
    if (!options.resources) {
        return false;
    }
    if (options.groupByResource || options.groupByDateAndResource) {
        return true;
    }
    if (options.groupByResource === false || options.groupByDateAndResource === false) {
        return false;
    }
    return viewSpec.singleUnit === 'day';
}
exports.isVResourceViewEnabled = isVResourceViewEnabled;
/*
TODO: just use ResourceHash somehow? could then use the generic ResourceSplitter
*/
var VResourceSplitter = /** @class */ (function (_super) {
    tslib_1.__extends(VResourceSplitter, _super);
    function VResourceSplitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VResourceSplitter.prototype.getKeyInfo = function (props) {
        var resourceDayTable = props.resourceDayTable;
        var hash = fullcalendar_1.mapHash(resourceDayTable.resourceIndex.indicesById, function (i) {
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
}(fullcalendar_1.Splitter));
exports.VResourceSplitter = VResourceSplitter;
// joiner
var NO_SEGS = []; // for memoizing
var VResourceJoiner = /** @class */ (function () {
    function VResourceJoiner() {
        this.joinDateSelection = fullcalendar_1.memoize(this.joinSegs);
        this.joinBusinessHours = fullcalendar_1.memoize(this.joinSegs);
        this.joinFgEvents = fullcalendar_1.memoize(this.joinSegs);
        this.joinBgEvents = fullcalendar_1.memoize(this.joinSegs);
        this.joinEventDrags = fullcalendar_1.memoize(this.joinInteractions);
        this.joinEventResizes = fullcalendar_1.memoize(this.joinInteractions);
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
                tslib_2.__assign(affectedInstances, interaction.affectedInstances);
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
exports.VResourceJoiner = VResourceJoiner;


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
/*
doesn't accept grouping
*/
function flattenResources(resourceStore, orderSpecs) {
    return buildRowNodes(resourceStore, [], orderSpecs, false, {}, true)
        .map(function (node) {
        return node.resource;
    });
}
exports.flattenResources = flattenResources;
function buildRowNodes(resourceStore, groupSpecs, orderSpecs, isVGrouping, expansions, expansionDefault) {
    var complexNodes = buildHierarchy(resourceStore, isVGrouping ? -1 : 1, groupSpecs, orderSpecs);
    var flatNodes = [];
    flattenNodes(complexNodes, flatNodes, isVGrouping, [], 0, expansions, expansionDefault);
    return flatNodes;
}
exports.buildRowNodes = buildRowNodes;
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
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.group) {
                var cmp = fullcalendar_1.flexibleCompare(groupValue, node.group.value) * groupSpec.order;
                if (cmp === 0) {
                    groupNode = node;
                    break;
                }
                else if (cmp > 0) {
                    newGroupIndex = i;
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
        var cmp = fullcalendar_1.compareByFieldSpecs(siblings[i].resourceFields, resourceNode.resourceFields, orderSpecs);
        if (cmp > 0) { // went 1 past. insert at i
            break;
        }
    }
    siblings.splice(i, 0, resourceNode);
}
function buildResourceFields(resource) {
    var obj = tslib_1.__assign({}, resource.extendedProps, resource.ui, resource);
    delete obj.ui;
    delete obj.extendedProps;
    return obj;
}
exports.buildResourceFields = buildResourceFields;
function isGroupsEqual(group0, group1) {
    return group0.spec === group1.spec && group0.value === group1.value;
}
exports.isGroupsEqual = isGroupsEqual;


/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var RESOURCE_SOURCE_PROPS = {
    id: String
};
var defs = [];
var uid = 0;
function registerResourceSourceDef(def) {
    defs.push(def);
}
exports.registerResourceSourceDef = registerResourceSourceDef;
function getResourceSourceDef(id) {
    return defs[id];
}
exports.getResourceSourceDef = getResourceSourceDef;
function doesSourceIgnoreRange(source) {
    return Boolean(defs[source.sourceDefId].ignoreRange);
}
exports.doesSourceIgnoreRange = doesSourceIgnoreRange;
function parseResourceSource(input) {
    for (var i = defs.length - 1; i >= 0; i--) { // later-added plugins take precedence
        var def = defs[i];
        var meta = def.parseMeta(input);
        if (meta) {
            return parseResourceSourceProps((typeof input === 'object' && input) ? input : {}, meta, i);
        }
    }
    return null;
}
exports.parseResourceSource = parseResourceSource;
function parseResourceSourceProps(input, meta, sourceDefId) {
    var props = fullcalendar_1.refineProps(input, RESOURCE_SOURCE_PROPS);
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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
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
                eventApis.push(new fullcalendar_1.EventApi(calendar, def, instance));
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
    Object.defineProperty(ResourceApi.prototype, "extendedProps", {
        get: function () { return this._resource.extendedProps; },
        enumerable: true,
        configurable: true
    });
    return ResourceApi;
}());
exports.default = ResourceApi;


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var RESOURCE_PROPS = {
    id: String,
    title: String,
    parentId: String,
    businessHours: null,
    children: null
};
var PRIVATE_ID_PREFIX = '_fc:';
var uid = 0;
/*
needs a full store so that it can populate children too
*/
function parseResource(input, parentId, store, calendar) {
    if (parentId === void 0) { parentId = ''; }
    var leftovers0 = {};
    var props = fullcalendar_1.refineProps(input, RESOURCE_PROPS, {}, leftovers0);
    var leftovers1 = {};
    var ui = fullcalendar_1.processScopedUiProps('event', leftovers0, calendar, leftovers1);
    if (!props.id) {
        props.id = PRIVATE_ID_PREFIX + (uid++);
    }
    if (!props.parentId) { // give precedence to the parentId property
        props.parentId = parentId;
    }
    props.businessHours = props.businessHours ? fullcalendar_1.parseBusinessHours(props.businessHours, calendar) : null;
    props.ui = ui;
    props.extendedProps = tslib_1.__assign({}, leftovers1, props.extendedProps);
    // help out ResourceApi from having user modify props
    Object.freeze(props.extendedProps);
    if (store[props.id]) {
        // console.warn('duplicate resource ID')
    }
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
exports.parseResource = parseResource;
/*
TODO: use this in more places
*/
function getPublicId(id) {
    if (id.indexOf(PRIVATE_ID_PREFIX) === 0) {
        return '';
    }
    return id;
}
exports.getPublicId = getPublicId;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var TimeAxis_1 = __webpack_require__(22);
var TimelineLane_1 = __webpack_require__(17);
var TimelineView = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineView, _super);
    function TimelineView(context, viewSpec, dateProfileGenerator, parentEl) {
        var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
        _this.el.classList.add('fc-timeline');
        if (_this.opt('eventOverlap') === false) {
            _this.el.classList.add('fc-no-overlap');
        }
        _this.el.innerHTML = _this.renderSkeletonHtml();
        _this.timeAxis = new TimeAxis_1.default(_this.context, _this.el.querySelector('thead .fc-time-area'), _this.el.querySelector('tbody .fc-time-area'));
        _this.lane = new TimelineLane_1.default(_this.context, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.contentEl, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.bgEl, _this.timeAxis);
        return _this;
    }
    TimelineView.prototype.destroy = function () {
        this.timeAxis.destroy();
        this.lane.destroy();
        _super.prototype.destroy.call(this);
    };
    TimelineView.prototype.renderSkeletonHtml = function () {
        var theme = this.theme;
        return "<table class=\"" + theme.getClass('tableGrid') + "\"> <thead class=\"fc-head\"> <tr> <td class=\"fc-time-area " + theme.getClass('widgetHeader') + "\"></td> </tr> </thead> <tbody class=\"fc-body\"> <tr> <td class=\"fc-time-area " + theme.getClass('widgetContent') + "\"></td> </tr> </tbody> </table>";
    };
    TimelineView.prototype.render = function (props) {
        _super.prototype.render.call(this, props); // flags for updateSize, addScroll
        this.timeAxis.receiveProps({
            dateProfile: props.dateProfile
        });
        this.lane.receiveProps(tslib_1.__assign({}, props, { nextDayThreshold: this.nextDayThreshold }));
    };
    TimelineView.prototype.updateSize = function (isResize, totalHeight, isAuto) {
        this.timeAxis.updateSize(isResize, totalHeight, isAuto);
        this.lane.updateSize(isResize);
    };
    // Now Indicator
    // ------------------------------------------------------------------------------------------
    TimelineView.prototype.getNowIndicatorUnit = function (dateProfile) {
        return this.timeAxis.getNowIndicatorUnit(dateProfile);
    };
    TimelineView.prototype.renderNowIndicator = function (date) {
        this.timeAxis.renderNowIndicator(date);
    };
    TimelineView.prototype.unrenderNowIndicator = function () {
        this.timeAxis.unrenderNowIndicator();
    };
    // Scroll System
    // ------------------------------------------------------------------------------------------
    TimelineView.prototype.computeInitialDateScroll = function () {
        return this.timeAxis.computeInitialDateScroll();
    };
    TimelineView.prototype.applyDateScroll = function (scroll) {
        this.timeAxis.applyDateScroll(scroll);
    };
    TimelineView.prototype.queryScroll = function () {
        var enhancedScroll = this.timeAxis.layout.bodyScroller.enhancedScroll;
        return {
            top: enhancedScroll.getScrollTop(),
            left: enhancedScroll.getScrollLeft()
        };
    };
    // Hit System
    // ------------------------------------------------------------------------------------------
    TimelineView.prototype.prepareHits = function () {
        this.offsetTracker = new fullcalendar_1.OffsetTracker(this.timeAxis.slats.el);
    };
    TimelineView.prototype.releaseHits = function () {
        this.offsetTracker.destroy();
    };
    TimelineView.prototype.queryHit = function (leftOffset, topOffset) {
        var offsetTracker = this.offsetTracker;
        var slats = this.timeAxis.slats;
        if (offsetTracker.isWithinClipping(leftOffset, topOffset)) {
            var slatHit = slats.positionToHit(leftOffset - offsetTracker.computeLeft());
            if (slatHit) {
                return {
                    component: this,
                    dateSpan: slatHit.dateSpan,
                    rect: {
                        left: slatHit.left,
                        right: slatHit.right,
                        top: offsetTracker.origTop,
                        bottom: offsetTracker.origBottom
                    },
                    dayEl: slatHit.dayEl,
                    layer: 0
                };
            }
        }
    };
    return TimelineView;
}(fullcalendar_1.View));
exports.default = TimelineView;
TimelineView.prototype.isInteractable = true;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var timeline_date_profile_1 = __webpack_require__(25);
var TimelineLaneEventRenderer_1 = __webpack_require__(54);
var TimelineLaneFillRenderer_1 = __webpack_require__(55);
var TimelineLane = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineLane, _super);
    function TimelineLane(context, fgContainerEl, bgContainerEl, timeAxis) {
        var _this = _super.call(this, context, bgContainerEl) // should el be bgContainerEl???
         || this;
        _this.slicer = new TimelineLaneSlicer();
        _this.renderEventDrag = fullcalendar_1.memoizeRendering(_this._renderEventDrag, _this._unrenderEventDrag);
        _this.renderEventResize = fullcalendar_1.memoizeRendering(_this._renderEventResize, _this._unrenderEventResize);
        var fillRenderer = _this.fillRenderer = new TimelineLaneFillRenderer_1.default(context, bgContainerEl, timeAxis);
        var eventRenderer = _this.eventRenderer = new TimelineLaneEventRenderer_1.default(context, fgContainerEl, timeAxis);
        _this.mirrorRenderer = new TimelineLaneEventRenderer_1.default(context, fgContainerEl, timeAxis);
        _this.renderBusinessHours = fullcalendar_1.memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'));
        _this.renderDateSelection = fullcalendar_1.memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'highlight'), fillRenderer.unrender.bind(fillRenderer, 'highlight'));
        _this.renderBgEvents = fullcalendar_1.memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'));
        _this.renderFgEvents = fullcalendar_1.memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer));
        _this.renderEventSelection = fullcalendar_1.memoizeRendering(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
        _this.timeAxis = timeAxis;
        return _this;
    }
    TimelineLane.prototype.render = function (props) {
        var slicedProps = this.slicer.sliceProps(props, props.dateProfile, this.timeAxis.tDateProfile.isTimeScale ? null : props.nextDayThreshold, this, this.timeAxis);
        this.renderBusinessHours(slicedProps.businessHourSegs);
        this.renderDateSelection(slicedProps.dateSelectionSegs);
        this.renderBgEvents(slicedProps.bgEventSegs);
        this.renderFgEvents(slicedProps.fgEventSegs);
        this.renderEventSelection(slicedProps.eventSelection);
        this.renderEventDrag(slicedProps.eventDrag);
        this.renderEventResize(slicedProps.eventResize);
    };
    TimelineLane.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.renderBusinessHours.unrender();
        this.renderDateSelection.unrender();
        this.renderBgEvents.unrender();
        this.renderFgEvents.unrender();
        this.renderEventSelection.unrender();
        this.renderEventDrag.unrender();
        this.renderEventResize.unrender();
    };
    TimelineLane.prototype._renderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.mirrorRenderer.renderSegs(state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
        }
    };
    TimelineLane.prototype._unrenderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.mirrorRenderer.unrender();
        }
    };
    TimelineLane.prototype._renderEventResize = function (state) {
        if (state) {
            // HACK. eventRenderer and fillRenderer both use these segs. would compete over seg.el
            var segsForHighlight = state.segs.map(function (seg) {
                return tslib_1.__assign({}, seg);
            });
            this.eventRenderer.hideByHash(state.affectedInstances);
            this.fillRenderer.renderSegs('highlight', segsForHighlight);
            this.mirrorRenderer.renderSegs(state.segs, { isDragging: true, sourceSeg: state.sourceSeg });
        }
    };
    TimelineLane.prototype._unrenderEventResize = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances);
            this.fillRenderer.unrender('highlight');
            this.mirrorRenderer.unrender();
        }
    };
    TimelineLane.prototype.updateSize = function (isResize) {
        var _a = this, fillRenderer = _a.fillRenderer, eventRenderer = _a.eventRenderer, mirrorRenderer = _a.mirrorRenderer;
        fillRenderer.computeSizes(isResize);
        eventRenderer.computeSizes(isResize);
        mirrorRenderer.computeSizes(isResize);
        fillRenderer.assignSizes(isResize);
        eventRenderer.assignSizes(isResize);
        mirrorRenderer.assignSizes(isResize);
    };
    return TimelineLane;
}(fullcalendar_1.DateComponent));
exports.default = TimelineLane;
var TimelineLaneSlicer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineLaneSlicer, _super);
    function TimelineLaneSlicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineLaneSlicer.prototype.sliceRange = function (origRange, timeAxis) {
        var tDateProfile = timeAxis.tDateProfile;
        var dateProfile = timeAxis.props.dateProfile;
        var normalRange = timeline_date_profile_1.normalizeRange(origRange, tDateProfile, timeAxis.dateEnv);
        var segs = [];
        // protect against when the span is entirely in an invalid date region
        if (timeAxis.computeDateSnapCoverage(normalRange.start) < timeAxis.computeDateSnapCoverage(normalRange.end)) {
            // intersect the footprint's range with the grid's range
            var slicedRange = fullcalendar_1.intersectRanges(normalRange, tDateProfile.normalizedRange);
            if (slicedRange) {
                segs.push({
                    start: slicedRange.start,
                    end: slicedRange.end,
                    isStart: slicedRange.start.valueOf() === normalRange.start.valueOf() && timeline_date_profile_1.isValidDate(slicedRange.start, tDateProfile, dateProfile, timeAxis.view),
                    isEnd: slicedRange.end.valueOf() === normalRange.end.valueOf() && timeline_date_profile_1.isValidDate(fullcalendar_1.addMs(slicedRange.end, -1), tDateProfile, dateProfile, timeAxis.view)
                });
            }
        }
        return segs;
    };
    return TimelineLaneSlicer;
}(fullcalendar_1.Slicer));


/***/ }),
/* 18 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var LEFT_TRIANGLE_ICON = 'fc-icon-left-triangle';
var RIGHT_TRIANGLE_ICON = 'fc-icon-right-triangle';
var DOWN_TRIANGLE_ICON = 'fc-icon-down-triangle';
function updateExpanderIcon(el, isExpanded, isRtl) {
    var classList = el.classList;
    if (isExpanded) {
        classList.remove(LEFT_TRIANGLE_ICON);
        classList.remove(RIGHT_TRIANGLE_ICON);
        classList.add(DOWN_TRIANGLE_ICON);
    }
    else {
        classList.remove(DOWN_TRIANGLE_ICON);
        classList.add(this.isRtl ? LEFT_TRIANGLE_ICON : RIGHT_TRIANGLE_ICON);
    }
}
exports.updateExpanderIcon = updateExpanderIcon;
function clearExpanderIcon(el) {
    var classList = el.classList;
    classList.remove(LEFT_TRIANGLE_ICON);
    classList.remove(RIGHT_TRIANGLE_ICON);
    classList.remove(DOWN_TRIANGLE_ICON);
}
exports.clearExpanderIcon = clearExpanderIcon;
function updateTrResourceId(tr, resourceId) {
    tr.setAttribute('data-resource-id', resourceId);
}
exports.updateTrResourceId = updateTrResourceId;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var resource_1 = __webpack_require__(15);
var ResourceApi_1 = __webpack_require__(11);
function buildResourceTextFunc(resourceTextSetting, calendar) {
    if (typeof resourceTextSetting === 'function') {
        return function (resource) {
            return resourceTextSetting(new ResourceApi_1.default(calendar, resource));
        };
    }
    else {
        return function (resource) {
            return resource.title || resource_1.getPublicId(resource.id);
        };
    }
}
exports.buildResourceTextFunc = buildResourceTextFunc;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.massageEventDragMutation = massageEventDragMutation;
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
exports.applyEventDefMutation = applyEventDefMutation;
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
                resourceEditable = true; // TODO: use defaults system instead
            }
        }
    }
    return resourceEditable;
}
exports.computeResourceEditable = computeResourceEditable;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
/*
splits things BASED OFF OF which resources they are associated with.
creates a '' entry which is when something has NO resource.
*/
var ResourceSplitter = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceSplitter, _super);
    function ResourceSplitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceSplitter.prototype.getKeyInfo = function (props) {
        return tslib_1.__assign({ '': {} }, props.resourceStore // already has `ui` and `businessHours` keys!
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
}(fullcalendar_1.Splitter));
exports.default = ResourceSplitter;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var HeaderBodyLayout_1 = __webpack_require__(23);
var TimelineHeader_1 = __webpack_require__(51);
var TimelineSlats_1 = __webpack_require__(52);
var timeline_date_profile_1 = __webpack_require__(25);
var TimelineNowIndicator_1 = __webpack_require__(53);
var TimeAxis = /** @class */ (function (_super) {
    tslib_1.__extends(TimeAxis, _super);
    function TimeAxis(context, headerContainerEl, bodyContainerEl) {
        var _this = _super.call(this, context) || this;
        var layout = _this.layout = new HeaderBodyLayout_1.default(headerContainerEl, bodyContainerEl, 'auto');
        _this.header = new TimelineHeader_1.default(context, layout.headerScroller.enhancedScroll.canvas.contentEl);
        _this.slats = new TimelineSlats_1.default(context, layout.bodyScroller.enhancedScroll.canvas.bgEl);
        _this.nowIndicator = new TimelineNowIndicator_1.default(layout.headerScroller.enhancedScroll.canvas.el, layout.bodyScroller.enhancedScroll.canvas.el);
        return _this;
    }
    TimeAxis.prototype.destroy = function () {
        this.layout.destroy();
        this.header.destroy();
        this.slats.destroy();
        this.nowIndicator.unrender();
        _super.prototype.destroy.call(this);
    };
    TimeAxis.prototype.render = function (props) {
        var tDateProfile = this.tDateProfile =
            timeline_date_profile_1.buildTimelineDateProfile(props.dateProfile, this.view); // TODO: cache
        this.header.receiveProps({
            dateProfile: props.dateProfile,
            tDateProfile: tDateProfile
        });
        this.slats.receiveProps({
            dateProfile: props.dateProfile,
            tDateProfile: tDateProfile
        });
    };
    // Now Indicator
    // ------------------------------------------------------------------------------------------
    TimeAxis.prototype.getNowIndicatorUnit = function (dateProfile) {
        // yuck
        var tDateProfile = this.tDateProfile =
            timeline_date_profile_1.buildTimelineDateProfile(dateProfile, this.view); // TODO: cache
        if (tDateProfile.isTimeScale) {
            return fullcalendar_1.greatestDurationDenominator(tDateProfile.slotDuration).unit;
        }
    };
    // will only execute if isTimeScale
    TimeAxis.prototype.renderNowIndicator = function (date) {
        if (fullcalendar_1.rangeContainsMarker(this.tDateProfile.normalizedRange, date)) {
            this.nowIndicator.render(this.dateToCoord(date), this.isRtl);
        }
    };
    // will only execute if isTimeScale
    TimeAxis.prototype.unrenderNowIndicator = function () {
        this.nowIndicator.unrender();
    };
    // Sizing
    // ------------------------------------------------------------------------------------------
    TimeAxis.prototype.updateSize = function (isResize, totalHeight, isAuto) {
        this.applySlotWidth(this.computeSlotWidth());
        // adjusts gutters. do after slot widths set
        this.layout.setHeight(totalHeight, isAuto);
        // pretty much just queries coords. do last
        this.slats.updateSize();
    };
    TimeAxis.prototype.computeSlotWidth = function () {
        var slotWidth = this.opt('slotWidth') || '';
        if (slotWidth === '') {
            slotWidth = this.computeDefaultSlotWidth(this.tDateProfile);
        }
        return slotWidth;
    };
    TimeAxis.prototype.computeDefaultSlotWidth = function (tDateProfile) {
        var maxInnerWidth = 0; // TODO: harness core's `matchCellWidths` for this
        this.header.innerEls.forEach(function (innerEl, i) {
            maxInnerWidth = Math.max(maxInnerWidth, innerEl.offsetWidth);
        });
        var headerWidth = maxInnerWidth + 1; // assume no padding, and one pixel border
        // in TimelineView.defaults we ensured that labelInterval is an interval of slotDuration
        // TODO: rename labelDuration?
        var slotsPerLabel = fullcalendar_1.wholeDivideDurations(tDateProfile.labelInterval, tDateProfile.slotDuration);
        var slotWidth = Math.ceil(headerWidth / slotsPerLabel);
        var minWidth = window.getComputedStyle(this.header.slatColEls[0]).minWidth;
        if (minWidth) {
            minWidth = parseInt(minWidth, 10);
            if (minWidth) {
                slotWidth = Math.max(slotWidth, minWidth);
            }
        }
        return slotWidth;
    };
    TimeAxis.prototype.applySlotWidth = function (slotWidth) {
        var _a = this, layout = _a.layout, tDateProfile = _a.tDateProfile;
        var containerWidth = '';
        var containerMinWidth = '';
        var nonLastSlotWidth = '';
        if (slotWidth !== '') {
            slotWidth = Math.round(slotWidth);
            containerWidth = slotWidth * tDateProfile.slotDates.length;
            containerMinWidth = '';
            nonLastSlotWidth = slotWidth;
            var availableWidth = layout.bodyScroller.enhancedScroll.getClientWidth();
            if (availableWidth > containerWidth) {
                containerMinWidth = availableWidth;
                containerWidth = '';
                nonLastSlotWidth = Math.floor(availableWidth / tDateProfile.slotDates.length);
            }
        }
        layout.headerScroller.enhancedScroll.canvas.setWidth(containerWidth);
        layout.headerScroller.enhancedScroll.canvas.setMinWidth(containerMinWidth);
        layout.bodyScroller.enhancedScroll.canvas.setWidth(containerWidth);
        layout.bodyScroller.enhancedScroll.canvas.setMinWidth(containerMinWidth);
        if (nonLastSlotWidth !== '') {
            this.header.slatColEls.slice(0, -1).concat(this.slats.slatColEls.slice(0, -1)).forEach(function (el) {
                el.style.width = nonLastSlotWidth + 'px';
            });
        }
    };
    // returned value is between 0 and the number of snaps
    TimeAxis.prototype.computeDateSnapCoverage = function (date) {
        var _a = this, dateEnv = _a.dateEnv, tDateProfile = _a.tDateProfile;
        var snapDiff = dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.snapDuration);
        if (snapDiff < 0) {
            return 0;
        }
        else if (snapDiff >= tDateProfile.snapDiffToIndex.length) {
            return tDateProfile.snapCnt;
        }
        else {
            var snapDiffInt = Math.floor(snapDiff);
            var snapCoverage = tDateProfile.snapDiffToIndex[snapDiffInt];
            if (fullcalendar_1.isInt(snapCoverage)) { // not an in-between value
                snapCoverage += snapDiff - snapDiffInt; // add the remainder
            }
            else {
                // a fractional value, meaning the date is not visible
                // always round up in this case. works for start AND end dates in a range.
                snapCoverage = Math.ceil(snapCoverage);
            }
            return snapCoverage;
        }
    };
    // for LTR, results range from 0 to width of area
    // for RTL, results range from negative width of area to 0
    TimeAxis.prototype.dateToCoord = function (date) {
        var tDateProfile = this.tDateProfile;
        var snapCoverage = this.computeDateSnapCoverage(date);
        var slotCoverage = snapCoverage / tDateProfile.snapsPerSlot;
        var slotIndex = Math.floor(slotCoverage);
        slotIndex = Math.min(slotIndex, tDateProfile.slotCnt - 1);
        var partial = slotCoverage - slotIndex;
        var coordCache = this.slats.innerCoordCache;
        if (this.isRtl) {
            return (coordCache.rights[slotIndex] -
                (coordCache.getWidth(slotIndex) * partial)) - coordCache.originClientRect.width;
        }
        else {
            return (coordCache.lefts[slotIndex] +
                (coordCache.getWidth(slotIndex) * partial));
        }
    };
    TimeAxis.prototype.rangeToCoords = function (range) {
        if (this.isRtl) {
            return { right: this.dateToCoord(range.start), left: this.dateToCoord(range.end) };
        }
        else {
            return { left: this.dateToCoord(range.start), right: this.dateToCoord(range.end) };
        }
    };
    // Scrolling
    // ------------------------------------------------------------------------------------------
    TimeAxis.prototype.computeInitialDateScroll = function () {
        var dateEnv = this.dateEnv;
        var dateProfile = this.props.dateProfile;
        var left = 0;
        if (dateProfile) {
            var scrollTime = this.opt('scrollTime');
            if (scrollTime) {
                scrollTime = fullcalendar_1.createDuration(scrollTime);
                left = this.dateToCoord(dateEnv.add(fullcalendar_1.startOfDay(dateProfile.activeRange.start), // startOfDay needed?
                scrollTime));
            }
        }
        return { left: left };
    };
    TimeAxis.prototype.queryDateScroll = function () {
        var enhancedScroll = this.layout.bodyScroller.enhancedScroll;
        return {
            left: enhancedScroll.getScrollLeft()
        };
    };
    TimeAxis.prototype.applyDateScroll = function (scroll) {
        var enhancedScroll = this.layout.bodyScroller.enhancedScroll;
        enhancedScroll.setScrollLeft(scroll.left || 0);
    };
    return TimeAxis;
}(fullcalendar_1.Component));
exports.default = TimeAxis;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var ClippedScroller_1 = __webpack_require__(48);
var ScrollJoiner_1 = __webpack_require__(24);
var HeaderBodyLayout = /** @class */ (function () {
    /*
    verticalScroll = 'auto' | 'clipped-scroll'
    */
    function HeaderBodyLayout(headerContainerEl, bodyContainerEl, verticalScroll) {
        this.headerScroller = new ClippedScroller_1.default('clipped-scroll', 'hidden', headerContainerEl);
        this.bodyScroller = new ClippedScroller_1.default('auto', verticalScroll, bodyContainerEl);
        this.scrollJoiner = new ScrollJoiner_1.default('horizontal', [
            this.headerScroller,
            this.bodyScroller
        ]);
    }
    HeaderBodyLayout.prototype.destroy = function () {
        this.headerScroller.destroy();
        this.bodyScroller.destroy();
    };
    HeaderBodyLayout.prototype.setHeight = function (totalHeight, isAuto) {
        var bodyHeight;
        if (isAuto) {
            bodyHeight = 'auto';
        }
        else {
            bodyHeight = totalHeight - this.queryHeadHeight();
        }
        this.bodyScroller.setHeight(bodyHeight);
        this.headerScroller.updateSize(); // adjusts gutters and classNames
        this.bodyScroller.updateSize(); // adjusts gutters and classNames
        this.scrollJoiner.update();
    };
    HeaderBodyLayout.prototype.queryHeadHeight = function () {
        return this.headerScroller.enhancedScroll.canvas.contentEl.offsetHeight; // flawed?
    };
    return HeaderBodyLayout;
}());
exports.default = HeaderBodyLayout;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var ScrollJoiner = /** @class */ (function () {
    function ScrollJoiner(axis, scrollers) {
        this.axis = axis;
        this.scrollers = scrollers;
        for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
            var scroller = _a[_i];
            this.initScroller(scroller);
        }
    }
    ScrollJoiner.prototype.initScroller = function (scroller) {
        var _this = this;
        var enhancedScroll = scroller.enhancedScroll;
        // when the user scrolls via mousewheel, we know for sure the target
        // scroller should be the master. capture the various x-browser events that fire.
        var onScroll = function () {
            _this.assignMasterScroller(scroller);
        };
        'wheel mousewheel DomMouseScroll MozMousePixelScroll'.split(' ').forEach(function (evName) {
            enhancedScroll.el.addEventListener(evName, onScroll);
        });
        enhancedScroll
            .on('scrollStart', function () {
            if (!_this.masterScroller) {
                _this.assignMasterScroller(scroller);
            }
        })
            .on('scroll', function () {
            if (scroller === _this.masterScroller) {
                for (var _i = 0, _a = _this.scrollers; _i < _a.length; _i++) {
                    var otherScroller = _a[_i];
                    if (otherScroller !== scroller) {
                        switch (_this.axis) {
                            case 'horizontal':
                                otherScroller.enhancedScroll.el.scrollLeft = enhancedScroll.el.scrollLeft;
                                break;
                            case 'vertical':
                                otherScroller.enhancedScroll.setScrollTop(enhancedScroll.getScrollTop());
                                break;
                        }
                    }
                }
            }
        })
            .on('scrollEnd', function () {
            if (scroller === _this.masterScroller) {
                _this.unassignMasterScroller();
            }
        });
    };
    ScrollJoiner.prototype.assignMasterScroller = function (scroller) {
        this.unassignMasterScroller();
        this.masterScroller = scroller;
        for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
            var otherScroller = _a[_i];
            if (otherScroller !== scroller) {
                otherScroller.enhancedScroll.disableTouchScroll();
            }
        }
    };
    ScrollJoiner.prototype.unassignMasterScroller = function () {
        if (this.masterScroller) {
            for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
                var otherScroller = _a[_i];
                otherScroller.enhancedScroll.enableTouchScroll();
            }
            this.masterScroller = null;
        }
    };
    ScrollJoiner.prototype.update = function () {
        var allWidths = this.scrollers.map(function (scroller) { return scroller.getScrollbarWidths(); });
        var maxLeft = 0;
        var maxRight = 0;
        var maxTop = 0;
        var maxBottom = 0;
        var widths;
        var i;
        for (var _i = 0, allWidths_1 = allWidths; _i < allWidths_1.length; _i++) {
            widths = allWidths_1[_i];
            maxLeft = Math.max(maxLeft, widths.left);
            maxRight = Math.max(maxRight, widths.right);
            maxTop = Math.max(maxTop, widths.top);
            maxBottom = Math.max(maxBottom, widths.bottom);
        }
        for (i = 0; i < this.scrollers.length; i++) {
            var scroller = this.scrollers[i];
            widths = allWidths[i];
            scroller.enhancedScroll.canvas.setGutters(this.axis === 'horizontal' ?
                {
                    left: maxLeft - widths.left,
                    right: maxRight - widths.right
                } :
                {
                    top: maxTop - widths.top,
                    bottom: maxBottom - widths.bottom
                });
        }
    };
    return ScrollJoiner;
}());
exports.default = ScrollJoiner;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core = __webpack_require__(0);
var fullcalendar_1 = __webpack_require__(0);
var MIN_AUTO_LABELS = 18; // more than `12` months but less that `24` hours
var MAX_AUTO_SLOTS_PER_LABEL = 6; // allows 6 10-min slots in an hour
var MAX_AUTO_CELLS = 200; // allows 4-days to have a :30 slot duration
core.MAX_TIMELINE_SLOTS = 1000;
// potential nice values for slot-duration and interval-duration
var STOCK_SUB_DURATIONS = [
    { years: 1 },
    { months: 1 },
    { days: 1 },
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { minutes: 10 },
    { minutes: 5 },
    { minutes: 1 },
    { seconds: 30 },
    { seconds: 15 },
    { seconds: 10 },
    { seconds: 5 },
    { seconds: 1 },
    { milliseconds: 500 },
    { milliseconds: 100 },
    { milliseconds: 10 },
    { milliseconds: 1 }
];
function buildTimelineDateProfile(dateProfile, view) {
    var dateEnv = view.dateEnv;
    var tDateProfile = {
        labelInterval: queryDurationOption(view, 'slotLabelInterval'),
        slotDuration: queryDurationOption(view, 'slotDuration')
    };
    validateLabelAndSlot(tDateProfile, dateProfile, dateEnv); // validate after computed grid duration
    ensureLabelInterval(tDateProfile, dateProfile, dateEnv);
    ensureSlotDuration(tDateProfile, dateProfile, dateEnv);
    var input = view.opt('slotLabelFormat');
    var rawFormats = Array.isArray(input) ?
        input
        : (input != null) ?
            [input]
            :
                computeHeaderFormats(tDateProfile, dateProfile, dateEnv, view);
    tDateProfile.headerFormats = rawFormats.map(function (rawFormat) {
        return fullcalendar_1.createFormatter(rawFormat);
    });
    tDateProfile.isTimeScale = Boolean(tDateProfile.slotDuration.milliseconds);
    var largeUnit = null;
    if (!tDateProfile.isTimeScale) {
        var slotUnit = fullcalendar_1.greatestDurationDenominator(tDateProfile.slotDuration).unit;
        if (/year|month|week/.test(slotUnit)) {
            largeUnit = slotUnit;
        }
    }
    tDateProfile.largeUnit = largeUnit;
    tDateProfile.emphasizeWeeks =
        fullcalendar_1.isSingleDay(tDateProfile.slotDuration) &&
            currentRangeAs('weeks', dateProfile, dateEnv) >= 2 &&
            !view.opt('businessHours');
    /*
    console.log('label interval =', timelineView.labelInterval.humanize())
    console.log('slot duration =', timelineView.slotDuration.humanize())
    console.log('header formats =', timelineView.headerFormats)
    console.log('isTimeScale', timelineView.isTimeScale)
    console.log('largeUnit', timelineView.largeUnit)
    */
    var rawSnapDuration = view.opt('snapDuration');
    var snapDuration;
    var snapsPerSlot;
    if (rawSnapDuration) {
        snapDuration = fullcalendar_1.createDuration(rawSnapDuration);
        snapsPerSlot = fullcalendar_1.wholeDivideDurations(tDateProfile.slotDuration, snapDuration);
        // ^ TODO: warning if not whole?
    }
    if (snapsPerSlot == null) {
        snapDuration = tDateProfile.slotDuration;
        snapsPerSlot = 1;
    }
    tDateProfile.snapDuration = snapDuration;
    tDateProfile.snapsPerSlot = snapsPerSlot;
    // more...
    var timeWindowMs = fullcalendar_1.asRoughMs(dateProfile.maxTime) - fullcalendar_1.asRoughMs(dateProfile.minTime);
    // TODO: why not use normalizeRange!?
    var normalizedStart = normalizeDate(dateProfile.renderRange.start, tDateProfile, dateEnv);
    var normalizedEnd = normalizeDate(dateProfile.renderRange.end, tDateProfile, dateEnv);
    // apply minTime/maxTime
    // TODO: View should be responsible.
    if (tDateProfile.isTimeScale) {
        normalizedStart = dateEnv.add(normalizedStart, dateProfile.minTime);
        normalizedEnd = dateEnv.add(fullcalendar_1.addDays(normalizedEnd, -1), dateProfile.maxTime);
    }
    tDateProfile.timeWindowMs = timeWindowMs;
    tDateProfile.normalizedRange = { start: normalizedStart, end: normalizedEnd };
    var slotDates = [];
    var date = normalizedStart;
    while (date < normalizedEnd) {
        if (isValidDate(date, tDateProfile, dateProfile, view)) {
            slotDates.push(date);
        }
        date = dateEnv.add(date, tDateProfile.slotDuration);
    }
    tDateProfile.slotDates = slotDates;
    // more...
    var snapIndex = -1;
    var snapDiff = 0; // index of the diff :(
    var snapDiffToIndex = [];
    var snapIndexToDiff = [];
    date = normalizedStart;
    while (date < normalizedEnd) {
        if (isValidDate(date, tDateProfile, dateProfile, view)) {
            snapIndex++;
            snapDiffToIndex.push(snapIndex);
            snapIndexToDiff.push(snapDiff);
        }
        else {
            snapDiffToIndex.push(snapIndex + 0.5);
        }
        date = dateEnv.add(date, tDateProfile.snapDuration);
        snapDiff++;
    }
    tDateProfile.snapDiffToIndex = snapDiffToIndex;
    tDateProfile.snapIndexToDiff = snapIndexToDiff;
    tDateProfile.snapCnt = snapIndex + 1; // is always one behind
    tDateProfile.slotCnt = tDateProfile.snapCnt / tDateProfile.snapsPerSlot;
    // more...
    tDateProfile.isWeekStarts = buildIsWeekStarts(tDateProfile, dateEnv);
    tDateProfile.cellRows = buildCellRows(tDateProfile, dateEnv, view);
    return tDateProfile;
}
exports.buildTimelineDateProfile = buildTimelineDateProfile;
/*
snaps to appropriate unit
*/
function normalizeDate(date, tDateProfile, dateEnv) {
    var normalDate = date;
    if (!tDateProfile.isTimeScale) {
        normalDate = fullcalendar_1.startOfDay(normalDate);
        if (tDateProfile.largeUnit) {
            normalDate = dateEnv.startOf(normalDate, tDateProfile.largeUnit);
        }
    }
    return normalDate;
}
exports.normalizeDate = normalizeDate;
/*
snaps to appropriate unit
*/
function normalizeRange(range, tDateProfile, dateEnv) {
    if (!tDateProfile.isTimeScale) {
        range = fullcalendar_1.computeVisibleDayRange(range);
        if (tDateProfile.largeUnit) {
            var dayRange = range; // preserve original result
            range = {
                start: dateEnv.startOf(range.start, tDateProfile.largeUnit),
                end: dateEnv.startOf(range.end, tDateProfile.largeUnit)
            };
            // if date is partially through the interval, or is in the same interval as the start,
            // make the exclusive end be the *next* interval
            if (range.end.valueOf() !== dayRange.end.valueOf() || range.end <= range.start) {
                range = {
                    start: range.start,
                    end: dateEnv.add(range.end, tDateProfile.slotDuration)
                };
            }
        }
    }
    return range;
}
exports.normalizeRange = normalizeRange;
function isValidDate(date, tDateProfile, dateProfile, view) {
    if (view.dateProfileGenerator.isHiddenDay(date)) {
        return false;
    }
    else if (tDateProfile.isTimeScale) {
        // determine if the time is within minTime/maxTime, which may have wacky values
        var day = fullcalendar_1.startOfDay(date);
        var timeMs = date.valueOf() - day.valueOf();
        var ms = timeMs - fullcalendar_1.asRoughMs(dateProfile.minTime); // milliseconds since minTime
        ms = ((ms % 86400000) + 86400000) % 86400000; // make negative values wrap to 24hr clock
        return ms < tDateProfile.timeWindowMs; // before the maxTime?
    }
    else {
        return true;
    }
}
exports.isValidDate = isValidDate;
function queryDurationOption(view, name) {
    var input = view.opt(name);
    if (input != null) {
        return fullcalendar_1.createDuration(input);
    }
}
function validateLabelAndSlot(tDateProfile, dateProfile, dateEnv) {
    var currentRange = dateProfile.currentRange;
    // make sure labelInterval doesn't exceed the max number of cells
    if (tDateProfile.labelInterval) {
        var labelCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, tDateProfile.labelInterval);
        if (labelCnt > core.MAX_TIMELINE_SLOTS) {
            fullcalendar_1.warn('slotLabelInterval results in too many cells');
            tDateProfile.labelInterval = null;
        }
    }
    // make sure slotDuration doesn't exceed the maximum number of cells
    if (tDateProfile.slotDuration) {
        var slotCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, tDateProfile.slotDuration);
        if (slotCnt > core.MAX_TIMELINE_SLOTS) {
            fullcalendar_1.warn('slotDuration results in too many cells');
            tDateProfile.slotDuration = null;
        }
    }
    // make sure labelInterval is a multiple of slotDuration
    if (tDateProfile.labelInterval && tDateProfile.slotDuration) {
        var slotsPerLabel = fullcalendar_1.wholeDivideDurations(tDateProfile.labelInterval, tDateProfile.slotDuration);
        if (slotsPerLabel === null || slotsPerLabel < 1) {
            fullcalendar_1.warn('slotLabelInterval must be a multiple of slotDuration');
            tDateProfile.slotDuration = null;
        }
    }
}
function ensureLabelInterval(tDateProfile, dateProfile, dateEnv) {
    var currentRange = dateProfile.currentRange;
    var labelInterval = tDateProfile.labelInterval;
    if (!labelInterval) {
        // compute based off the slot duration
        // find the largest label interval with an acceptable slots-per-label
        var input = void 0;
        if (tDateProfile.slotDuration) {
            for (var _i = 0, STOCK_SUB_DURATIONS_1 = STOCK_SUB_DURATIONS; _i < STOCK_SUB_DURATIONS_1.length; _i++) {
                input = STOCK_SUB_DURATIONS_1[_i];
                var tryLabelInterval = fullcalendar_1.createDuration(input);
                var slotsPerLabel = fullcalendar_1.wholeDivideDurations(tryLabelInterval, tDateProfile.slotDuration);
                if (slotsPerLabel !== null && slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL) {
                    labelInterval = tryLabelInterval;
                    break;
                }
            }
            // use the slot duration as a last resort
            if (!labelInterval) {
                labelInterval = tDateProfile.slotDuration;
            }
            // compute based off the view's duration
            // find the largest label interval that yields the minimum number of labels
        }
        else {
            for (var _a = 0, STOCK_SUB_DURATIONS_2 = STOCK_SUB_DURATIONS; _a < STOCK_SUB_DURATIONS_2.length; _a++) {
                input = STOCK_SUB_DURATIONS_2[_a];
                labelInterval = fullcalendar_1.createDuration(input);
                var labelCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, labelInterval);
                if (labelCnt >= MIN_AUTO_LABELS) {
                    break;
                }
            }
        }
        tDateProfile.labelInterval = labelInterval;
    }
    return labelInterval;
}
function ensureSlotDuration(tDateProfile, dateProfile, dateEnv) {
    var currentRange = dateProfile.currentRange;
    var slotDuration = tDateProfile.slotDuration;
    if (!slotDuration) {
        var labelInterval = ensureLabelInterval(tDateProfile, dateProfile, dateEnv); // will compute if necessary
        // compute based off the label interval
        // find the largest slot duration that is different from labelInterval, but still acceptable
        for (var _i = 0, STOCK_SUB_DURATIONS_3 = STOCK_SUB_DURATIONS; _i < STOCK_SUB_DURATIONS_3.length; _i++) {
            var input = STOCK_SUB_DURATIONS_3[_i];
            var trySlotDuration = fullcalendar_1.createDuration(input);
            var slotsPerLabel = fullcalendar_1.wholeDivideDurations(labelInterval, trySlotDuration);
            if (slotsPerLabel !== null && slotsPerLabel > 1 && slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL) {
                slotDuration = trySlotDuration;
                break;
            }
        }
        // only allow the value if it won't exceed the view's # of slots limit
        if (slotDuration) {
            var slotCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, slotDuration);
            if (slotCnt > MAX_AUTO_CELLS) {
                slotDuration = null;
            }
        }
        // use the label interval as a last resort
        if (!slotDuration) {
            slotDuration = labelInterval;
        }
        tDateProfile.slotDuration = slotDuration;
    }
    return slotDuration;
}
function computeHeaderFormats(tDateProfile, dateProfile, dateEnv, view) {
    var format1;
    var format2;
    var labelInterval = tDateProfile.labelInterval;
    var unit = fullcalendar_1.greatestDurationDenominator(labelInterval).unit;
    var weekNumbersVisible = view.opt('weekNumbers');
    var format0 = (format1 = (format2 = null));
    // NOTE: weekNumber computation function wont work
    if ((unit === 'week') && !weekNumbersVisible) {
        unit = 'day';
    }
    switch (unit) {
        case 'year':
            format0 = { year: 'numeric' }; // '2015'
            break;
        case 'month':
            if (currentRangeAs('years', dateProfile, dateEnv) > 1) {
                format0 = { year: 'numeric' }; // '2015'
            }
            format1 = { month: 'short' }; // 'Jan'
            break;
        case 'week':
            if (currentRangeAs('years', dateProfile, dateEnv) > 1) {
                format0 = { year: 'numeric' }; // '2015'
            }
            format1 = { week: 'narrow' }; // 'Wk4'
            break;
        case 'day':
            if (currentRangeAs('years', dateProfile, dateEnv) > 1) {
                format0 = { year: 'numeric', month: 'long' }; // 'January 2014'
            }
            else if (currentRangeAs('months', dateProfile, dateEnv) > 1) {
                format0 = { month: 'long' }; // 'January'
            }
            if (weekNumbersVisible) {
                format1 = { week: 'short' }; // 'Wk 4'
            }
            format2 = { weekday: 'narrow', day: 'numeric' }; // 'Su 9'
            break;
        case 'hour':
            if (weekNumbersVisible) {
                format0 = { week: 'short' }; // 'Wk 4'
            }
            if (currentRangeAs('days', dateProfile, dateEnv) > 1) {
                format1 = { weekday: 'short', day: 'numeric', month: 'numeric', omitCommas: true }; // Sat 4/7
            }
            format2 = {
                hour: 'numeric',
                minute: '2-digit',
                omitZeroMinute: true,
                meridiem: 'short'
            };
            break;
        case 'minute':
            // sufficiently large number of different minute cells?
            if ((fullcalendar_1.asRoughMinutes(labelInterval) / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                format0 = {
                    hour: 'numeric',
                    meridiem: 'short'
                };
                format1 = function (params) {
                    return ':' + fullcalendar_1.padStart(params.date.minute, 2); // ':30'
                };
            }
            else {
                format0 = {
                    hour: 'numeric',
                    minute: 'numeric',
                    meridiem: 'short'
                };
            }
            break;
        case 'second':
            // sufficiently large number of different second cells?
            if ((fullcalendar_1.asRoughSeconds(labelInterval) / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                format0 = { hour: 'numeric', minute: '2-digit', meridiem: 'lowercase' }; // '8:30 PM'
                format1 = function (params) {
                    return ':' + fullcalendar_1.padStart(params.date.second, 2); // ':30'
                };
            }
            else {
                format0 = { hour: 'numeric', minute: '2-digit', second: '2-digit', meridiem: 'lowercase' }; // '8:30:45 PM'
            }
            break;
        case 'millisecond':
            format0 = { hour: 'numeric', minute: '2-digit', second: '2-digit', meridiem: 'lowercase' }; // '8:30:45 PM'
            format1 = function (params) {
                return '.' + fullcalendar_1.padStart(params.millisecond, 3);
            };
            break;
    }
    return [].concat(format0 || [], format1 || [], format2 || []);
}
// Compute the number of the give units in the "current" range.
// Won't go more precise than days.
// Will return `0` if there's not a clean whole interval.
function currentRangeAs(unit, dateProfile, dateEnv) {
    var range = dateProfile.currentRange;
    var res = null;
    if (unit === 'years') {
        res = dateEnv.diffWholeYears(range.start, range.end);
    }
    else if (unit === 'months') {
        res = dateEnv.diffWholeMonths(range.start, range.end);
    }
    else if (unit === 'weeks') {
        res = dateEnv.diffWholeMonths(range.start, range.end);
    }
    else if (unit === 'days') {
        res = fullcalendar_1.diffWholeDays(range.start, range.end);
    }
    return res || 0;
}
function buildIsWeekStarts(tDateProfile, dateEnv) {
    var slotDates = tDateProfile.slotDates, emphasizeWeeks = tDateProfile.emphasizeWeeks;
    var prevWeekNumber = null;
    var isWeekStarts = [];
    for (var _i = 0, slotDates_1 = slotDates; _i < slotDates_1.length; _i++) {
        var slotDate = slotDates_1[_i];
        var weekNumber = dateEnv.computeWeekNumber(slotDate);
        var isWeekStart = emphasizeWeeks && (prevWeekNumber !== null) && (prevWeekNumber !== weekNumber);
        prevWeekNumber = weekNumber;
        isWeekStarts.push(isWeekStart);
    }
    return isWeekStarts;
}
function buildCellRows(tDateProfile, dateEnv, view) {
    var slotDates = tDateProfile.slotDates;
    var formats = tDateProfile.headerFormats;
    var cellRows = formats.map(function (format) { return []; }); // indexed by row,col
    // specifically for navclicks
    var rowUnits = formats.map(function (format) {
        return format.getLargestUnit ? format.getLargestUnit() : null;
    });
    // builds cellRows and slotCells
    for (var i = 0; i < slotDates.length; i++) {
        var date = slotDates[i];
        var isWeekStart = tDateProfile.isWeekStarts[i];
        for (var row = 0; row < formats.length; row++) {
            var format = formats[row];
            var rowCells = cellRows[row];
            var leadingCell = rowCells[rowCells.length - 1];
            var isSuperRow = (formats.length > 1) && (row < (formats.length - 1)); // more than one row and not the last
            var newCell = null;
            if (isSuperRow) {
                var text = dateEnv.format(date, format);
                if (!leadingCell || (leadingCell.text !== text)) {
                    newCell = buildCellObject(date, text, rowUnits[row], view);
                }
                else {
                    leadingCell.colspan += 1;
                }
            }
            else {
                if (!leadingCell ||
                    fullcalendar_1.isInt(dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.labelInterval))) {
                    var text = dateEnv.format(date, format);
                    newCell = buildCellObject(date, text, rowUnits[row], view);
                }
                else {
                    leadingCell.colspan += 1;
                }
            }
            if (newCell) {
                newCell.weekStart = isWeekStart;
                rowCells.push(newCell);
            }
        }
    }
    return cellRows;
}
function buildCellObject(date, text, rowUnit, view) {
    var spanHtml = fullcalendar_1.buildGotoAnchorHtml(view, {
        date: date,
        type: rowUnit,
        forceOff: !rowUnit
    }, {
        'class': 'fc-cell-text'
    }, fullcalendar_1.htmlEscape(text));
    return { text: text, spanHtml: spanHtml, date: date, colspan: 1, isWeekStart: false };
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var TimeAxis_1 = __webpack_require__(22);
var resource_hierarchy_1 = __webpack_require__(8);
var GroupRow_1 = __webpack_require__(56);
var ResourceRow_1 = __webpack_require__(57);
var ScrollJoiner_1 = __webpack_require__(24);
var Spreadsheet_1 = __webpack_require__(59);
var TimelineLane_1 = __webpack_require__(17);
var ResourceSplitter_1 = __webpack_require__(21);
var resource_rendering_1 = __webpack_require__(19);
var tslib_2 = __webpack_require__(1);
var ResourceTimelineView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTimelineView, _super);
    function ResourceTimelineView(context, viewSpec, dateProfileGenerator, parentEl) {
        var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
        _this.rowNodes = [];
        _this.rowComponents = [];
        _this.rowComponentsById = {};
        _this.splitter = new ResourceSplitter_1.default(); // doesn't let it do businessHours tho
        _this.hasResourceBusinessHours = fullcalendar_1.memoize(hasResourceBusinessHours);
        _this.buildRowNodes = fullcalendar_1.memoize(resource_hierarchy_1.buildRowNodes);
        _this.hasNesting = fullcalendar_1.memoize(hasNesting);
        _this._updateHasNesting = fullcalendar_1.memoizeRendering(_this.updateHasNesting);
        var allColSpecs = _this.opt('resourceColumns') || [];
        var labelText = _this.opt('resourceLabelText'); // TODO: view.override
        var defaultLabelText = 'Resources'; // TODO: view.defaults
        var superHeaderText = null;
        if (!allColSpecs.length) {
            allColSpecs.push({
                labelText: labelText || defaultLabelText,
                text: resource_rendering_1.buildResourceTextFunc(_this.opt('resourceText'), _this.calendar)
            });
        }
        else {
            superHeaderText = labelText;
        }
        var plainColSpecs = [];
        var groupColSpecs = [];
        var groupSpecs = [];
        var isVGrouping = false;
        var isHGrouping = false;
        for (var _i = 0, allColSpecs_1 = allColSpecs; _i < allColSpecs_1.length; _i++) {
            var colSpec = allColSpecs_1[_i];
            if (colSpec.group) {
                groupColSpecs.push(colSpec);
            }
            else {
                plainColSpecs.push(colSpec);
            }
        }
        plainColSpecs[0].isMain = true;
        if (groupColSpecs.length) {
            groupSpecs = groupColSpecs;
            isVGrouping = true;
        }
        else {
            var hGroupField = _this.opt('resourceGroupField');
            if (hGroupField) {
                isHGrouping = true;
                groupSpecs.push({
                    field: hGroupField,
                    text: _this.opt('resourceGroupText'),
                    render: _this.opt('resourceGroupRender')
                });
            }
        }
        var allOrderSpecs = fullcalendar_1.parseFieldSpecs(_this.opt('resourceOrder'));
        var plainOrderSpecs = [];
        for (var _a = 0, allOrderSpecs_1 = allOrderSpecs; _a < allOrderSpecs_1.length; _a++) {
            var orderSpec = allOrderSpecs_1[_a];
            var isGroup = false;
            for (var _b = 0, groupSpecs_1 = groupSpecs; _b < groupSpecs_1.length; _b++) {
                var groupSpec = groupSpecs_1[_b];
                if (groupSpec.field === orderSpec.field) {
                    groupSpec.order = orderSpec.order; // -1, 0, 1
                    isGroup = true;
                    break;
                }
            }
            if (!isGroup) {
                plainOrderSpecs.push(orderSpec);
            }
        }
        _this.superHeaderText = superHeaderText;
        _this.isVGrouping = isVGrouping;
        _this.isHGrouping = isHGrouping;
        _this.groupSpecs = groupSpecs;
        _this.colSpecs = groupColSpecs.concat(plainColSpecs);
        _this.orderSpecs = plainOrderSpecs;
        // START RENDERING...
        _this.el.classList.add('fc-timeline');
        if (_this.opt('eventOverlap') === false) {
            _this.el.classList.add('fc-no-overlap');
        }
        _this.el.innerHTML = _this.renderSkeletonHtml();
        _this.miscHeight = _this.el.offsetHeight;
        _this.spreadsheet = new Spreadsheet_1.default(_this.context, _this.el.querySelector('thead .fc-resource-area'), _this.el.querySelector('tbody .fc-resource-area'));
        _this.timeAxis = new TimeAxis_1.default(_this.context, _this.el.querySelector('thead .fc-time-area'), _this.el.querySelector('tbody .fc-time-area'));
        var timeAxisRowContainer = fullcalendar_1.createElement('div', { className: 'fc-rows' }, '<table><tbody /></table>');
        _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.contentEl.appendChild(timeAxisRowContainer);
        _this.timeAxisTbody = timeAxisRowContainer.querySelector('tbody');
        _this.lane = new TimelineLane_1.default(_this.context, null, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.bgEl, _this.timeAxis);
        _this.bodyScrollJoiner = new ScrollJoiner_1.default('vertical', [
            _this.spreadsheet.layout.bodyScroller,
            _this.timeAxis.layout.bodyScroller
        ]);
        _this.spreadsheet.receiveProps({
            superHeaderText: _this.superHeaderText,
            colSpecs: _this.colSpecs
        });
        return _this;
    }
    ResourceTimelineView.prototype.renderSkeletonHtml = function () {
        var theme = this.theme;
        var width = this.opt('resourceAreaWidth');
        var widthAttr = '';
        if (width) {
            widthAttr = 'style="width:' + (typeof width === 'number' ? width + 'px' : width) + '"';
        }
        return "<table class=\"" + theme.getClass('tableGrid') + "\"> <thead class=\"fc-head\"> <tr> <td class=\"fc-resource-area " + theme.getClass('widgetHeader') + "\" " + widthAttr + "></td> <td class=\"fc-divider fc-col-resizer " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-time-area " + theme.getClass('widgetHeader') + "\"></td> </tr> </thead> <tbody class=\"fc-body\"> <tr> <td class=\"fc-resource-area " + theme.getClass('widgetContent') + "\"></td> <td class=\"fc-divider fc-col-resizer " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-time-area " + theme.getClass('widgetContent') + "\"></td> </tr> </tbody> </table>";
    };
    ResourceTimelineView.prototype.render = function (props) {
        _super.prototype.render.call(this, props);
        var splitProps = this.splitter.splitProps(props);
        var hasResourceBusinessHours = this.hasResourceBusinessHours(props.resourceStore);
        this.timeAxis.receiveProps({
            dateProfile: props.dateProfile
        });
        // for all-resource bg events / selections / business-hours
        this.lane.receiveProps(tslib_1.__assign({}, splitProps[''], { dateProfile: props.dateProfile, nextDayThreshold: this.nextDayThreshold, businessHours: hasResourceBusinessHours ? null : props.businessHours }));
        var newRowNodes = this.buildRowNodes(props.resourceStore, this.groupSpecs, this.orderSpecs, this.isVGrouping, props.resourceEntityExpansions, this.opt('resourcesInitiallyExpanded'));
        this._updateHasNesting(this.hasNesting(newRowNodes));
        this.diffRows(newRowNodes);
        this.renderRows(props.dateProfile, hasResourceBusinessHours ? props.businessHours : null, // CONFUSING, comment
        splitProps);
    };
    ResourceTimelineView.prototype.updateHasNesting = function (isNesting) {
        var classList = this.el.classList;
        if (isNesting) {
            classList.remove('fc-flat');
        }
        else {
            classList.add('fc-flat');
        }
    };
    ResourceTimelineView.prototype.diffRows = function (newNodes) {
        var oldNodes = this.rowNodes;
        var oldLen = oldNodes.length;
        var oldIndexHash = {}; // id -> index
        var oldI = 0;
        var newI = 0;
        for (oldI = 0; oldI < oldLen; oldI++) {
            oldIndexHash[oldNodes[oldI].id] = oldI;
        }
        // iterate new nodes
        for (oldI = 0, newI = 0; newI < newNodes.length; newI++) {
            var newNode = newNodes[newI];
            var oldIFound = oldIndexHash[newNode.id];
            if (oldIFound != null && oldIFound >= oldI) {
                this.removeRows(newI, oldIFound - oldI, oldNodes); // won't do anything if same index
                oldI = oldIFound + 1;
            }
            else {
                this.addRow(newI, newNode);
            }
        }
        // old rows that weren't found need to be removed
        this.removeRows(newI, oldLen - oldI, oldNodes); // won't do anything if same index
        this.rowNodes = newNodes;
    };
    /*
    rowComponents is the in-progress result
    */
    ResourceTimelineView.prototype.addRow = function (index, rowNode) {
        var _a = this, rowComponents = _a.rowComponents, rowComponentsById = _a.rowComponentsById;
        var nextComponent = rowComponents[index];
        var newComponent = this.buildChildComponent(rowNode, this.spreadsheet.bodyTbody, nextComponent ? nextComponent.spreadsheetTr : null, this.timeAxisTbody, nextComponent ? nextComponent.timeAxisTr : null);
        rowComponents.splice(index, 0, newComponent);
        rowComponentsById[rowNode.id] = newComponent;
    };
    ResourceTimelineView.prototype.removeRows = function (startIndex, len, oldRowNodes) {
        if (len) {
            var _a = this, rowComponents = _a.rowComponents, rowComponentsById = _a.rowComponentsById;
            for (var i = 0; i < len; i++) {
                var rowComponent = rowComponents[startIndex + i];
                rowComponent.destroy();
                delete rowComponentsById[oldRowNodes[i].id];
            }
            rowComponents.splice(startIndex, len);
        }
    };
    ResourceTimelineView.prototype.buildChildComponent = function (node, spreadsheetTbody, spreadsheetNext, timeAxisTbody, timeAxisNext) {
        if (node.group) {
            return new GroupRow_1.default(this.context, spreadsheetTbody, spreadsheetNext, timeAxisTbody, timeAxisNext);
        }
        else if (node.resource) {
            return new ResourceRow_1.default(this.context, spreadsheetTbody, spreadsheetNext, timeAxisTbody, timeAxisNext, this.timeAxis);
        }
    };
    ResourceTimelineView.prototype.renderRows = function (dateProfile, fallbackBusinessHours, splitProps) {
        var _a = this, rowNodes = _a.rowNodes, rowComponents = _a.rowComponents;
        for (var i = 0; i < rowNodes.length; i++) {
            var rowNode = rowNodes[i];
            var rowComponent = rowComponents[i];
            if (rowNode.group) {
                rowComponent.receiveProps({
                    spreadsheetColCnt: this.colSpecs.length,
                    id: rowNode.id,
                    isExpanded: rowNode.isExpanded,
                    group: rowNode.group
                });
            }
            else {
                var resource = rowNode.resource;
                rowComponent.receiveProps(tslib_1.__assign({}, splitProps[resource.id], { dateProfile: dateProfile, nextDayThreshold: this.nextDayThreshold, businessHours: resource.businessHours || fallbackBusinessHours, colSpecs: this.colSpecs, id: rowNode.id, rowSpans: rowNode.rowSpans, depth: rowNode.depth, isExpanded: rowNode.isExpanded, hasChildren: rowNode.hasChildren, resource: rowNode.resource }));
            }
        }
    };
    ResourceTimelineView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        // FYI: this ordering is really important
        var calendar = this.calendar;
        var isBaseSizing = isResize || calendar.isViewUpdated || calendar.isDatesUpdated || calendar.isEventsUpdated;
        if (isBaseSizing) {
            this.syncHeadHeights();
            this.timeAxis.updateSize(isResize, viewHeight - this.miscHeight, isAuto);
            this.spreadsheet.updateSize(isResize, viewHeight - this.miscHeight, isAuto);
        }
        var rowSizingCnt = this.updateRowSizes(isResize);
        this.lane.updateSize(isResize); // is efficient. uses flags
        if (isBaseSizing || rowSizingCnt) {
            this.bodyScrollJoiner.update();
            this.timeAxis.layout.scrollJoiner.update(); // hack
        }
    };
    ResourceTimelineView.prototype.syncHeadHeights = function () {
        var spreadsheetHeadEl = this.spreadsheet.header.tableEl;
        var timeAxisHeadEl = this.timeAxis.header.tableEl;
        spreadsheetHeadEl.style.height = '';
        timeAxisHeadEl.style.height = '';
        var max = Math.max(spreadsheetHeadEl.offsetHeight, timeAxisHeadEl.offsetHeight);
        spreadsheetHeadEl.style.height =
            timeAxisHeadEl.style.height = max + 'px';
    };
    ResourceTimelineView.prototype.updateRowSizes = function (isResize) {
        var dirtyRowComponents = this.rowComponents;
        if (!isResize) {
            dirtyRowComponents = dirtyRowComponents.filter(function (rowComponent) {
                return rowComponent.isSizeDirty;
            });
        }
        var elArrays = dirtyRowComponents.map(function (rowComponent) {
            return rowComponent.getHeightEls();
        });
        // reset to natural heights
        for (var _i = 0, elArrays_1 = elArrays; _i < elArrays_1.length; _i++) {
            var elArray = elArrays_1[_i];
            for (var _a = 0, elArray_1 = elArray; _a < elArray_1.length; _a++) {
                var el = elArray_1[_a];
                el.style.height = '';
            }
        }
        // let rows update their contents' heights
        for (var _b = 0, dirtyRowComponents_1 = dirtyRowComponents; _b < dirtyRowComponents_1.length; _b++) {
            var rowComponent = dirtyRowComponents_1[_b];
            rowComponent.updateSize(isResize); // will reset isSizeDirty
        }
        var maxHeights = elArrays.map(function (elArray) {
            var maxHeight = null;
            for (var _i = 0, elArray_2 = elArray; _i < elArray_2.length; _i++) {
                var el = elArray_2[_i];
                var height = el.offsetHeight;
                if (maxHeight === null || height > maxHeight) {
                    maxHeight = height;
                }
            }
            return maxHeight;
        });
        for (var i = 0; i < elArrays.length; i++) {
            for (var _c = 0, _d = elArrays[i]; _c < _d.length; _c++) {
                var el = _d[_c];
                el.style.height = maxHeights[i] + 'px';
            }
        }
        return dirtyRowComponents.length;
    };
    ResourceTimelineView.prototype.destroy = function () {
        for (var _i = 0, _a = this.rowComponents; _i < _a.length; _i++) {
            var rowComponent = _a[_i];
            rowComponent.destroy();
        }
        this.rowNodes = [];
        this.rowComponents = [];
        this.spreadsheet.destroy();
        this.timeAxis.destroy();
        _super.prototype.destroy.call(this);
    };
    // Now Indicator
    // ------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.getNowIndicatorUnit = function (dateProfile) {
        return this.timeAxis.getNowIndicatorUnit(dateProfile);
    };
    ResourceTimelineView.prototype.renderNowIndicator = function (date) {
        this.timeAxis.renderNowIndicator(date);
    };
    ResourceTimelineView.prototype.unrenderNowIndicator = function () {
        this.timeAxis.unrenderNowIndicator();
    };
    // Scrolling
    // ------------------------------------------------------------------------------------------------------------------
    // this is useful for scrolling prev/next dates while resource is scrolled down
    ResourceTimelineView.prototype.queryScroll = function () {
        var scroll = _super.prototype.queryScroll.call(this);
        if (this.props.resourceStore) {
            tslib_2.__assign(scroll, this.queryResourceScroll());
        }
        return scroll;
    };
    ResourceTimelineView.prototype.applyScroll = function (scroll) {
        _super.prototype.applyScroll.call(this, scroll);
        if (this.props.resourceStore) {
            this.applyResourceScroll(scroll);
        }
    };
    ResourceTimelineView.prototype.computeInitialDateScroll = function () {
        return this.timeAxis.computeInitialDateScroll();
    };
    ResourceTimelineView.prototype.queryDateScroll = function () {
        return this.timeAxis.queryDateScroll();
    };
    ResourceTimelineView.prototype.applyDateScroll = function (scroll) {
        this.timeAxis.applyDateScroll(scroll);
    };
    ResourceTimelineView.prototype.queryResourceScroll = function () {
        var _a = this, rowComponents = _a.rowComponents, rowNodes = _a.rowNodes;
        var scroll = {};
        var scrollerTop = this.timeAxis.layout.bodyScroller.el.getBoundingClientRect().top; // fixed position
        for (var i = 0; i < rowComponents.length; i++) {
            var rowComponent = rowComponents[i];
            var rowNode = rowNodes[i];
            var el = rowComponent.timeAxisTr;
            var elBottom = el.getBoundingClientRect().bottom; // fixed position
            if (elBottom > scrollerTop) {
                scroll.rowId = rowNode.id;
                scroll.bottom = elBottom - scrollerTop;
                break;
            }
        }
        // TODO: what about left scroll state for spreadsheet area?
        return scroll;
    };
    ResourceTimelineView.prototype.applyResourceScroll = function (scroll) {
        var rowId = scroll.forcedRowId || scroll.rowId;
        if (rowId) {
            var rowComponent = this.rowComponentsById[rowId];
            if (rowComponent) {
                var el = rowComponent.timeAxisTr;
                if (el) {
                    var innerTop = this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.el.getBoundingClientRect().top;
                    var rowRect = el.getBoundingClientRect();
                    var scrollTop = (scroll.forcedRowId ?
                        rowRect.top : // just use top edge
                        rowRect.bottom - scroll.bottom) - // pixels from bottom edge
                        innerTop;
                    this.timeAxis.layout.bodyScroller.enhancedScroll.setScrollTop(scrollTop);
                    this.spreadsheet.layout.bodyScroller.enhancedScroll.setScrollTop(scrollTop);
                }
            }
        }
    };
    // TODO: scrollToResource
    // Hit System
    // ------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.prepareHits = function () {
        var originEl = this.timeAxis.slats.el;
        this.offsetTracker = new fullcalendar_1.OffsetTracker(originEl);
        this.rowPositions = new fullcalendar_1.PositionCache(originEl, this.rowComponents.map(function (rowComponent) {
            return rowComponent.timeAxisTr;
        }), false, // isHorizontal
        true // isVertical
        );
        this.rowPositions.build();
    };
    ResourceTimelineView.prototype.releaseHits = function () {
        this.offsetTracker.destroy();
        this.rowPositions = null;
    };
    ResourceTimelineView.prototype.queryHit = function (leftOffset, topOffset) {
        var _a = this, offsetTracker = _a.offsetTracker, rowPositions = _a.rowPositions;
        var slats = this.timeAxis.slats;
        var rowIndex = rowPositions.topToIndex(topOffset - offsetTracker.computeTop());
        if (rowIndex != null) {
            var resource = this.rowNodes[rowIndex].resource;
            if (resource) { // not a group
                if (offsetTracker.isWithinClipping(leftOffset, topOffset)) {
                    var slatHit = slats.positionToHit(leftOffset - offsetTracker.computeLeft());
                    if (slatHit) {
                        return {
                            component: this,
                            dateSpan: {
                                range: slatHit.dateSpan.range,
                                allDay: slatHit.dateSpan.allDay,
                                resourceId: resource.id
                            },
                            rect: {
                                left: slatHit.left,
                                right: slatHit.right,
                                top: rowPositions.tops[rowIndex],
                                bottom: rowPositions.bottoms[rowIndex]
                            },
                            dayEl: slatHit.dayEl,
                            layer: 0
                        };
                    }
                }
            }
        }
    };
    ResourceTimelineView.needsResourceData = true; // for ResourceViewProps
    return ResourceTimelineView;
}(fullcalendar_1.View));
exports.default = ResourceTimelineView;
ResourceTimelineView.prototype.isInteractable = true;
function hasResourceBusinessHours(resourceStore) {
    for (var resourceId in resourceStore) {
        var resource = resourceStore[resourceId];
        if (resource.businessHours) {
            return true;
        }
    }
    return false;
}
function hasNesting(nodes) {
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        if (node.group) {
            return true;
        }
        else if (node.resource) {
            if (node.hasChildren) {
                return true;
            }
        }
    }
    return false;
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row(context, spreadsheetParent, spreadsheetNextSibling, timeAxisParent, timeAxisNextSibling) {
        var _this = _super.call(this, context) || this;
        _this.isSizeDirty = false;
        spreadsheetParent.insertBefore(_this.spreadsheetTr = document.createElement('tr'), spreadsheetNextSibling);
        timeAxisParent.insertBefore(_this.timeAxisTr = document.createElement('tr'), timeAxisNextSibling);
        return _this;
    }
    Row.prototype.destroy = function () {
        fullcalendar_1.removeElement(this.spreadsheetTr);
        fullcalendar_1.removeElement(this.timeAxisTr);
        _super.prototype.destroy.call(this);
    };
    Row.prototype.updateSize = function (isResize) {
        this.isSizeDirty = false;
    };
    return Row;
}(fullcalendar_1.Component));
exports.default = Row;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceDayHeader_1 = __webpack_require__(29);
var resource_hierarchy_1 = __webpack_require__(8);
var resource_day_table_1 = __webpack_require__(6);
var ResourceTimeGrid_1 = __webpack_require__(61);
var ResourceDayGrid_1 = __webpack_require__(30);
var ResourceAgendaView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceAgendaView, _super);
    function ResourceAgendaView(context, viewSpec, dateProfileGenerator, parentEl) {
        var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
        _this.flattenResources = fullcalendar_1.memoize(resource_hierarchy_1.flattenResources);
        _this.buildResourceDayTable = fullcalendar_1.memoize(buildResourceDayTable);
        _this.resourceOrderSpecs = fullcalendar_1.parseFieldSpecs(_this.opt('resourceOrder'));
        if (_this.opt('columnHeader')) {
            _this.header = new ResourceDayHeader_1.default(_this.context, _this.el.querySelector('.fc-head-container'));
        }
        _this.resourceTimeGrid = new ResourceTimeGrid_1.default(context, _this.timeGrid);
        if (_this.dayGrid) {
            _this.resourceDayGrid = new ResourceDayGrid_1.default(context, _this.dayGrid);
        }
        return _this;
    }
    ResourceAgendaView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.header) {
            this.header.destroy();
        }
        this.resourceTimeGrid.destroy();
        if (this.resourceDayGrid) {
            this.resourceDayGrid.destroy();
        }
    };
    ResourceAgendaView.prototype.render = function (props) {
        _super.prototype.render.call(this, props); // for flags for updateSize
        var splitProps = this.splitter.splitProps(props);
        var resources = this.flattenResources(props.resourceStore, this.resourceOrderSpecs);
        var resourceDayTable = this.buildResourceDayTable(this.props.dateProfile, this.dateProfileGenerator, resources, this.opt('groupByDateAndResource'));
        if (this.header) {
            this.header.receiveProps({
                resources: resources,
                dates: resourceDayTable.dayTable.headerDates,
                dateProfile: props.dateProfile,
                datesRepDistinctDays: true,
                renderIntroHtml: this.renderHeadIntroHtml
            });
        }
        this.resourceTimeGrid.receiveProps(tslib_1.__assign({}, splitProps['timed'], { dateProfile: props.dateProfile, resourceDayTable: resourceDayTable }));
        if (this.resourceDayGrid) {
            this.resourceDayGrid.receiveProps(tslib_1.__assign({}, splitProps['allDay'], { dateProfile: props.dateProfile, resourceDayTable: resourceDayTable, isRigid: false, nextDayThreshold: this.nextDayThreshold }));
        }
    };
    ResourceAgendaView.prototype.renderNowIndicator = function (date) {
        this.resourceTimeGrid.renderNowIndicator(date);
    };
    ResourceAgendaView.needsResourceData = true; // for ResourceViewProps
    return ResourceAgendaView;
}(fullcalendar_1.AbstractAgendaView));
exports.default = ResourceAgendaView;
function buildResourceDayTable(dateProfile, dateProfileGenerator, resources, groupByDateAndResource) {
    var dayTable = fullcalendar_1.buildAgendaDayTable(dateProfile, dateProfileGenerator);
    return groupByDateAndResource ?
        new resource_day_table_1.DayResourceTable(dayTable, resources) :
        new resource_day_table_1.ResourceDayTable(dayTable, resources);
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceApi_1 = __webpack_require__(11);
var resource_rendering_1 = __webpack_require__(19);
var ResourceDayHeader = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceDayHeader, _super);
    function ResourceDayHeader(context, parentEl) {
        var _this = _super.call(this, context) || this;
        _this.datesAboveResources = _this.opt('groupByDateAndResource');
        _this.resourceTextFunc = resource_rendering_1.buildResourceTextFunc(_this.opt('resourceText'), _this.calendar);
        parentEl.innerHTML = ''; // because might be nbsp
        parentEl.appendChild(_this.el = fullcalendar_1.htmlToElement('<div class="fc-row ' + _this.theme.getClass('headerRow') + '">' +
            '<table class="' + _this.theme.getClass('tableGrid') + '">' +
            '<thead></thead>' +
            '</table>' +
            '</div>'));
        _this.thead = _this.el.querySelector('thead');
        return _this;
    }
    ResourceDayHeader.prototype.destroy = function () {
        fullcalendar_1.removeElement(this.el);
    };
    ResourceDayHeader.prototype.render = function (props) {
        var html;
        this.dateFormat = fullcalendar_1.createFormatter(this.opt('columnHeaderFormat') ||
            fullcalendar_1.computeFallbackHeaderFormat(props.datesRepDistinctDays, props.dates.length));
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
            fullcalendar_1.htmlEscape(this.resourceTextFunc(resource)) +
            '</th>';
    };
    // a cell with date text. might have a resource associated with it
    ResourceDayHeader.prototype.renderDateCell = function (date, colspan, resource) {
        var props = this.props;
        return fullcalendar_1.renderDateCell(date, props.dateProfile, props.datesRepDistinctDays, props.dates.length * props.resources.length, this.dateFormat, this.context, colspan, resource ? 'data-resource-id="' + resource.id + '"' : '');
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
        fullcalendar_1.findElements(this.thead, '.fc-resource-cell').forEach(function (node, col) {
            col = col % resources.length;
            if (_this.isRtl) {
                col = resources.length - 1 - col;
            }
            var resource = resources[col];
            view.publiclyTrigger('resourceRender', [
                {
                    resource: new ResourceApi_1.default(_this.calendar, resource),
                    el: node,
                    view: view
                }
            ]);
        });
    };
    return ResourceDayHeader;
}(fullcalendar_1.Component));
exports.default = ResourceDayHeader;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var resource_day_table_1 = __webpack_require__(6);
var ResourceDayGrid = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceDayGrid, _super);
    function ResourceDayGrid(context, dayGrid) {
        var _this = _super.call(this, context, dayGrid.el) || this;
        _this.splitter = new resource_day_table_1.VResourceSplitter();
        _this.slicers = {};
        _this.joiner = new ResourceDayGridJoiner();
        _this.dayGrid = dayGrid;
        return _this;
    }
    ResourceDayGrid.prototype.render = function (props) {
        var _this = this;
        var dayGrid = this.dayGrid;
        var dateProfile = props.dateProfile, resourceDayTable = props.resourceDayTable, nextDayThreshold = props.nextDayThreshold;
        var splitProps = this.splitter.splitProps(props);
        this.slicers = fullcalendar_1.mapHash(splitProps, function (split, resourceId) {
            return _this.slicers[resourceId] || new fullcalendar_1.DayGridSlicer();
        });
        var slicedProps = fullcalendar_1.mapHash(this.slicers, function (slicer, resourceId) {
            return slicer.sliceProps(splitProps[resourceId], dateProfile, nextDayThreshold, dayGrid, resourceDayTable.dayTable);
        });
        dayGrid.allowAcrossResources = resourceDayTable.dayTable.colCnt === 1;
        dayGrid.receiveProps(tslib_1.__assign({}, this.joiner.joinProps(slicedProps, resourceDayTable), { dateProfile: dateProfile, cells: resourceDayTable.cells, isRigid: props.isRigid }));
    };
    ResourceDayGrid.prototype.prepareHits = function () {
        this.offsetTracker = new fullcalendar_1.OffsetTracker(this.dayGrid.el);
    };
    ResourceDayGrid.prototype.releaseHits = function () {
        this.offsetTracker.destroy();
    };
    ResourceDayGrid.prototype.queryHit = function (leftOffset, topOffset) {
        var offsetTracker = this.offsetTracker;
        if (offsetTracker.isWithinClipping(leftOffset, topOffset)) {
            var originLeft = offsetTracker.computeLeft();
            var originTop = offsetTracker.computeTop();
            var rawHit = this.dayGrid.positionToHit(leftOffset - originLeft, topOffset - originTop);
            if (rawHit) {
                return {
                    component: this.dayGrid,
                    dateSpan: {
                        range: rawHit.dateSpan.range,
                        allDay: rawHit.dateSpan.allDay,
                        resourceId: this.props.resourceDayTable.cells[rawHit.row][rawHit.col].resource.id
                    },
                    dayEl: rawHit.dayEl,
                    rect: {
                        left: rawHit.relativeRect.left + originLeft,
                        right: rawHit.relativeRect.right + originLeft,
                        top: rawHit.relativeRect.top + originTop,
                        bottom: rawHit.relativeRect.bottom + originTop
                    },
                    layer: 0
                };
            }
        }
    };
    return ResourceDayGrid;
}(fullcalendar_1.DateComponent));
exports.default = ResourceDayGrid;
ResourceDayGrid.prototype.isInteractable = true;
var ResourceDayGridJoiner = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceDayGridJoiner, _super);
    function ResourceDayGridJoiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceDayGridJoiner.prototype.transformSeg = function (seg, resourceDayTable, resourceI) {
        var colRanges = resourceDayTable.computeColRanges(seg.firstCol, seg.lastCol, resourceI);
        return colRanges.map(function (colRange) {
            return tslib_1.__assign({}, seg, colRange, { isStart: seg.isStart && colRange.isStart, isEnd: seg.isEnd && colRange.isEnd });
        });
    };
    return ResourceDayGridJoiner;
}(resource_day_table_1.VResourceJoiner));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceDayHeader_1 = __webpack_require__(29);
var resource_hierarchy_1 = __webpack_require__(8);
var resource_day_table_1 = __webpack_require__(6);
var ResourceDayGrid_1 = __webpack_require__(30);
var ResourceBasicView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceBasicView, _super);
    function ResourceBasicView(context, viewSpec, dateProfileGenerator, parentEl) {
        var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
        _this.flattenResources = fullcalendar_1.memoize(resource_hierarchy_1.flattenResources);
        _this.buildResourceDayTable = fullcalendar_1.memoize(buildResourceDayTable);
        _this.resourceOrderSpecs = fullcalendar_1.parseFieldSpecs(_this.opt('resourceOrder'));
        if (_this.opt('columnHeader')) {
            _this.header = new ResourceDayHeader_1.default(_this.context, _this.el.querySelector('.fc-head-container'));
        }
        _this.resourceDayGrid = new ResourceDayGrid_1.default(context, _this.dayGrid);
        return _this;
    }
    ResourceBasicView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.header) {
            this.header.destroy();
        }
        this.resourceDayGrid.destroy();
    };
    ResourceBasicView.prototype.render = function (props) {
        _super.prototype.render.call(this, props); // for flags for updateSize
        var resources = this.flattenResources(props.resourceStore, this.resourceOrderSpecs);
        var resourceDayTable = this.buildResourceDayTable(this.props.dateProfile, this.dateProfileGenerator, resources, this.opt('groupByDateAndResource'));
        if (this.header) {
            this.header.receiveProps({
                resources: resources,
                dates: resourceDayTable.dayTable.headerDates,
                dateProfile: props.dateProfile,
                datesRepDistinctDays: true,
                renderIntroHtml: this.renderHeadIntroHtml
            });
        }
        this.resourceDayGrid.receiveProps({
            dateProfile: props.dateProfile,
            resourceDayTable: resourceDayTable,
            businessHours: props.businessHours,
            eventStore: props.eventStore,
            eventUiBases: props.eventUiBases,
            dateSelection: props.dateSelection,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize,
            isRigid: this.hasRigidRows(),
            nextDayThreshold: this.nextDayThreshold
        });
    };
    ResourceBasicView.needsResourceData = true; // for ResourceViewProps
    return ResourceBasicView;
}(fullcalendar_1.AbstractBasicView));
exports.default = ResourceBasicView;
function buildResourceDayTable(dateProfile, dateProfileGenerator, resources, groupByDateAndResource) {
    var dayTable = fullcalendar_1.buildBasicDayTable(dateProfile, dateProfileGenerator);
    return groupByDateAndResource ?
        new resource_day_table_1.DayResourceTable(dayTable, resources) :
        new resource_day_table_1.ResourceDayTable(dayTable, resources);
}


/***/ }),
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var exportHooks = __webpack_require__(0);
var View_1 = __webpack_require__(35); // TODO: ResourceDataAdder should be own plugin
var resources_1 = __webpack_require__(36);
var event_1 = __webpack_require__(40);
var EventDragging_1 = __webpack_require__(20);
var DateSelecting_1 = __webpack_require__(41);
var Calendar_1 = __webpack_require__(42);
var validation_1 = __webpack_require__(43);
var ExternalElementDragging_1 = __webpack_require__(44);
var EventResizing_1 = __webpack_require__(45);
__webpack_require__(46);
var license_1 = __webpack_require__(47);
var TimelineView_1 = __webpack_require__(16);
var ResourceTimelineView_1 = __webpack_require__(26);
var ResourceAgendaView_1 = __webpack_require__(28);
var ResourceBasicView_1 = __webpack_require__(31);
// TODO: plugin-ify
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(64);
var config_1 = __webpack_require__(66);
var config_2 = __webpack_require__(67);
var config_3 = __webpack_require__(68);
var config_4 = __webpack_require__(69);
exports.GeneralPlugin = exportHooks.createPlugin({
    reducers: [resources_1.default],
    eventDefParsers: [event_1.parseEventDef],
    eventDragMutationMassagers: [EventDragging_1.massageEventDragMutation],
    eventDefMutationAppliers: [EventDragging_1.applyEventDefMutation],
    dateSelectionTransformers: [DateSelecting_1.transformDateSelectionJoin],
    datePointTransforms: [Calendar_1.transformDatePoint],
    dateSpanTransforms: [Calendar_1.transformDateSpan],
    viewPropsTransformers: [View_1.ResourceDataAdder, View_1.ResourceEventConfigAdder],
    isPropsValid: validation_1.isPropsValidWithResources,
    externalDefTransforms: [ExternalElementDragging_1.transformExternalDef],
    eventResizeJoinTransforms: [EventResizing_1.transformEventResizeJoin],
    viewContainerModifiers: [license_1.injectLicenseWarning]
});
exportHooks.Calendar.defaultPlugins.push(// TODO: kill
exports.GeneralPlugin, config_1.default, config_2.default, config_3.default, config_4.default);
exportHooks.TimelineView = TimelineView_1.default;
exportHooks.ResourceTimelineView = ResourceTimelineView_1.default;
exportHooks.ResourceTimelineView = ResourceTimelineView_1.default;
exportHooks.ResourceAgendaView = ResourceAgendaView_1.default;
exportHooks.ResourceBasicView = ResourceBasicView_1.default;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var tslib_1 = __webpack_require__(1);
var ResourceDataAdder = /** @class */ (function () {
    function ResourceDataAdder() {
        this.filterResources = fullcalendar_1.memoize(filterResources);
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
exports.ResourceDataAdder = ResourceDataAdder;
function filterResources(resourceStore, doFilterResourcesWithEvents, eventStore, activeRange) {
    if (doFilterResourcesWithEvents) {
        var instancesInRange = filterEventInstancesInRange(eventStore.instances, activeRange);
        var hasEvents_1 = computeHasEvents(instancesInRange, eventStore.defs);
        tslib_1.__assign(hasEvents_1, computeAncestorHasEvents(hasEvents_1, resourceStore));
        return fullcalendar_1.filterHash(resourceStore, function (resource, resourceId) {
            return hasEvents_1[resourceId];
        });
    }
    else {
        return resourceStore;
    }
}
function filterEventInstancesInRange(eventInstances, activeRange) {
    return fullcalendar_1.filterHash(eventInstances, function (eventInstance) {
        return fullcalendar_1.rangesIntersect(eventInstance.range, activeRange);
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
        this.buildResourceEventUis = fullcalendar_1.memoizeOutput(buildResourceEventUis, fullcalendar_1.isPropsEqual);
        this.injectResourceEventUis = fullcalendar_1.memoize(injectResourceEventUis);
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
exports.ResourceEventConfigAdder = ResourceEventConfigAdder;
function buildResourceEventUis(resourceStore) {
    return fullcalendar_1.mapHash(resourceStore, function (resource) {
        return resource.ui;
    });
}
function injectResourceEventUis(eventUiBases, eventDefs, resourceEventUis) {
    return fullcalendar_1.mapHash(eventUiBases, function (eventUi, defId) {
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
    return fullcalendar_1.combineEventUis(parts);
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var resourceSource_1 = __webpack_require__(37);
var resourceStore_1 = __webpack_require__(38);
var resourceEntityExpansions_1 = __webpack_require__(39);
function default_1(state, action, calendar) {
    var resourceSource = resourceSource_1.default(state.resourceSource, action, state.dateProfile, calendar);
    var resourceStore = resourceStore_1.default(state.resourceStore, action, resourceSource, calendar);
    var resourceEntityExpansions = resourceEntityExpansions_1.reduceResourceEntityExpansions(state.resourceEntityExpansions, action);
    return tslib_1.__assign({}, state, { resourceSource: resourceSource,
        resourceStore: resourceStore,
        resourceEntityExpansions: resourceEntityExpansions });
}
exports.default = default_1;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var resource_source_1 = __webpack_require__(10);
function default_1(source, action, dateProfile, calendar) {
    switch (action.type) {
        case 'INIT':
            return createInitialSource(calendar);
        case 'SET_VIEW_TYPE': // TODO: how do we track all actions that affect dateProfile :(
        case 'SET_DATE':
        case 'SET_DATE_PROFILE':
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
exports.default = default_1;
var uid = 0;
function createInitialSource(calendar) {
    var input = calendar.opt('resources');
    if (input) {
        var source = resource_source_1.parseResourceSource(input);
        if (!calendar.opt('refetchResourcesOnNavigate')) {
            source = fetchSource(source, null, calendar);
        }
        return source;
    }
    return null;
}
function handleRange(source, activeRange, calendar) {
    if (calendar.opt('refetchResourcesOnNavigate') &&
        !resource_source_1.doesSourceIgnoreRange(source) &&
        (!source.fetchRange || !fullcalendar_1.rangesEqual(source.fetchRange, activeRange))) {
        return fetchSource(source, activeRange, calendar);
    }
    else {
        return source;
    }
}
function fetchSource(source, fetchRange, calendar) {
    var sourceDef = resource_source_1.getResourceSourceDef(source.sourceDefId);
    var fetchId = String(uid++);
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
    return tslib_1.__assign({}, source, { isFetching: true, latestFetchId: fetchId });
}
function receiveResponse(source, fetchId, fetchRange) {
    if (fetchId === source.latestFetchId) {
        return tslib_1.__assign({}, source, { isFetching: false, fetchRange: fetchRange });
    }
    return source;
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var resource_1 = __webpack_require__(15);
function default_1(store, action, source, calendar) {
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
            return fullcalendar_1.mapHash(store, function (resource) {
                return tslib_1.__assign({}, resource);
            });
        default:
            return store;
    }
}
exports.default = default_1;
function receiveRawResources(existingStore, inputs, fetchId, source, calendar) {
    if (source.latestFetchId === fetchId) {
        var nextStore = {};
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            resource_1.parseResource(input, '', nextStore, calendar);
        }
        return nextStore;
    }
    else {
        return existingStore;
    }
}
function addResource(existingStore, additions) {
    // TODO: warn about duplicate IDs
    return tslib_1.__assign({}, existingStore, additions);
}
function removeResource(existingStore, resourceId) {
    var newStore = tslib_1.__assign({}, existingStore);
    delete newStore[resourceId];
    // promote children
    for (var childResourceId in newStore) { // a child, *maybe* but probably not
        if (newStore[childResourceId].parentId === resourceId) {
            newStore[childResourceId] = tslib_1.__assign({}, newStore[childResourceId], { parentId: '' });
        }
    }
    return newStore;
}
function setResourceProp(existingStore, resourceId, name, value) {
    var _a, _b;
    var existingResource = existingStore[resourceId];
    // TODO: sanitization
    if (existingResource) {
        return tslib_1.__assign({}, existingStore, (_a = {}, _a[resourceId] = tslib_1.__assign({}, existingResource, (_b = {}, _b[name] = value, _b)), _a));
    }
    else {
        return existingStore;
    }
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
function reduceResourceEntityExpansions(expansions, action) {
    var _a;
    switch (action.type) {
        case 'INIT':
            return {};
        case 'SET_RESOURCE_ENTITY_EXPANDED':
            return tslib_1.__assign({}, expansions, (_a = {}, _a[action.id] = action.isExpanded, _a));
        default:
            return expansions;
    }
}
exports.reduceResourceEntityExpansions = reduceResourceEntityExpansions;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
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
    var resourceRelatedProps = fullcalendar_1.refineProps(props, RESOURCE_RELATED_PROPS, {}, leftovers);
    var resourceIds = resourceRelatedProps.resourceIds;
    if (resourceRelatedProps.resourceId) {
        resourceIds.push(resourceRelatedProps.resourceId);
    }
    def.resourceIds = resourceIds;
    def.resourceEditable = resourceRelatedProps.resourceEditable;
}
exports.parseEventDef = parseEventDef;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.transformDateSelectionJoin = transformDateSelectionJoin;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ResourceApi_1 = __webpack_require__(11);
var resource_1 = __webpack_require__(15);
fullcalendar_1.Calendar.prototype.addResource = function (input, scrollTo) {
    if (scrollTo === void 0) { scrollTo = true; }
    var _a;
    var resourceHash;
    var resource;
    if (input instanceof ResourceApi_1.default) {
        resource = input._resource;
        resourceHash = (_a = {}, _a[resource.id] = resource, _a);
    }
    else {
        resourceHash = {};
        resource = resource_1.parseResource(input, '', resourceHash, this);
    }
    // HACK
    if (scrollTo) {
        this.component.view.addScroll({ forcedRowId: resource.id });
    }
    this.dispatch({
        type: 'ADD_RESOURCE',
        resourceHash: resourceHash
    });
    return new ResourceApi_1.default(this, resource);
};
fullcalendar_1.Calendar.prototype.getResourceById = function (id) {
    id = String(id);
    if (this.state.resourceStore) { // guard against calendar with no resource functionality
        var rawResource = this.state.resourceStore[id];
        if (rawResource) {
            return new ResourceApi_1.default(this, rawResource);
        }
    }
    return null;
};
fullcalendar_1.Calendar.prototype.getResources = function () {
    var resourceStore = this.state.resourceStore;
    var resourceApis = [];
    if (resourceStore) { // guard against calendar with no resource functionality
        for (var resourceId in resourceStore) {
            resourceApis.push(new ResourceApi_1.default(this, resourceStore[resourceId]));
        }
    }
    return resourceApis;
};
fullcalendar_1.Calendar.prototype.getTopLevelResources = function () {
    var resourceStore = this.state.resourceStore;
    var resourceApis = [];
    if (resourceStore) { // guard against calendar with no resource functionality
        for (var resourceId in resourceStore) {
            if (!resourceStore[resourceId].parentId) {
                resourceApis.push(new ResourceApi_1.default(this, resourceStore[resourceId]));
            }
        }
    }
    return resourceApis;
};
fullcalendar_1.Calendar.prototype.rerenderResources = function () {
    this.dispatch({
        type: 'RESET_RESOURCES'
    });
};
fullcalendar_1.Calendar.prototype.refetchResources = function () {
    this.dispatch({
        type: 'REFETCH_RESOURCES'
    });
};
function transformDatePoint(dateSpan, calendar) {
    return dateSpan.resourceId ?
        { resource: calendar.getResourceById(dateSpan.resourceId) } :
        {};
}
exports.transformDatePoint = transformDatePoint;
function transformDateSpan(dateSpan, calendar) {
    return dateSpan.resourceId ?
        { resource: calendar.getResourceById(dateSpan.resourceId) } :
        {};
}
exports.transformDateSpan = transformDateSpan;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceSplitter_1 = __webpack_require__(21);
function isPropsValidWithResources(props, calendar) {
    var splitter = new ResourceSplitter_1.default();
    var sets = splitter.splitProps(tslib_1.__assign({}, props, { resourceStore: calendar.state.resourceStore }));
    for (var resourceId in sets) {
        var props_1 = sets[resourceId];
        // merge in event data from the non-resource segment
        if (resourceId && sets['']) { // current segment is not the non-resource one, and there IS a non-resource one
            props_1 = tslib_1.__assign({}, props_1, { eventStore: fullcalendar_1.mergeEventStores(sets[''].eventStore, props_1.eventStore), eventUiBases: tslib_1.__assign({}, sets[''].eventUiBases, props_1.eventUiBases) });
        }
        if (!fullcalendar_1.isPropsValid(props_1, calendar, { resourceId: resourceId }, filterConfig.bind(null, resourceId))) {
            return false;
        }
    }
    return true;
}
exports.isPropsValidWithResources = isPropsValidWithResources;
function filterConfig(resourceId, config) {
    return tslib_1.__assign({}, config, { constraints: filterConstraints(resourceId, config.constraints) });
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


/***/ }),
/* 44 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function transformExternalDef(dateSpan) {
    return dateSpan.resourceId ?
        { resourceId: dateSpan.resourceId } :
        {};
}
exports.transformExternalDef = transformExternalDef;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function transformEventResizeJoin(hit0, hit1) {
    var component = hit0.component;
    if (component.allowAcrossResources === false &&
        hit0.dateSpan.resourceId !== hit1.dateSpan.resourceId) {
        return false;
    }
}
exports.transformEventResizeJoin = transformEventResizeJoin;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
fullcalendar_1.EventApi.prototype.getResources = function () {
    var calendar = this._calendar;
    return this._def.resourceIds.map(function (resourceId) {
        return calendar.getResourceById(resourceId);
    });
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var core = __webpack_require__(0);
var fullcalendar_1 = __webpack_require__(0);
/* tslint:enable */
var RELEASE_DATE = '2018-12-21'; // for Scheduler
var UPGRADE_WINDOW = 365 + 7; // days. 1 week leeway, for tz shift reasons too
var LICENSE_INFO_URL = 'http://fullcalendar.io/scheduler/license/';
var PRESET_LICENSE_KEYS = [
    'GPL-My-Project-Is-Open-Source',
    'CC-Attribution-NonCommercial-NoDerivatives'
];
function injectLicenseWarning(containerEl, calendar) {
    var key = calendar.opt('schedulerLicenseKey');
    if (!isImmuneUrl(window.location.href) && !isValidKey(key)) {
        fullcalendar_1.appendToElement(containerEl, '<div class="fc-license-message">' +
            'Please use a valid license key. <a href="' + LICENSE_INFO_URL + '">More Info</a>' +
            '</div>');
    }
}
exports.injectLicenseWarning = injectLicenseWarning;
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
        var releaseDate = new Date(core.mockSchedulerReleaseDate || RELEASE_DATE);
        if (fullcalendar_1.isValidDate(releaseDate)) { // token won't be replaced in dev mode
            var minPurchaseDate = fullcalendar_1.addDays(releaseDate, -UPGRADE_WINDOW);
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


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var EnhancedScroller_1 = __webpack_require__(49);
/*
A Scroller, but with a wrapping div that allows "clipping" away of native scrollbars,
giving the appearance that there are no scrollbars.
*/
var ClippedScroller = /** @class */ (function () {
    /*
    Received overflows can be set to 'clipped', meaning scrollbars shouldn't be visible
    to the user, but the area should still scroll.
    */
    function ClippedScroller(overflowX, overflowY, parentEl) {
        this.isHScrollbarsClipped = false;
        this.isVScrollbarsClipped = false;
        if (overflowX === 'clipped-scroll') {
            overflowX = 'scroll';
            this.isHScrollbarsClipped = true;
        }
        if (overflowY === 'clipped-scroll') {
            overflowY = 'scroll';
            this.isVScrollbarsClipped = true;
        }
        this.enhancedScroll = new EnhancedScroller_1.default(overflowX, overflowY);
        parentEl.appendChild(this.el = fullcalendar_1.createElement('div', {
            className: 'fc-scroller-clip'
        }));
        this.el.appendChild(this.enhancedScroll.el);
    }
    ClippedScroller.prototype.destroy = function () {
        fullcalendar_1.removeElement(this.el);
    };
    ClippedScroller.prototype.updateSize = function () {
        var enhancedScroll = this.enhancedScroll;
        var scrollEl = enhancedScroll.el;
        var edges = fullcalendar_1.computeEdges(scrollEl);
        var cssProps = { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0 };
        // give the inner scrolling div negative margins so that its scrollbars
        // are nudged outside of the bounding box of the wrapper, which is overflow:hidden
        if (this.isVScrollbarsClipped) {
            cssProps.marginLeft = -edges.scrollbarLeft;
            cssProps.marginRight = -edges.scrollbarRight;
        }
        if (this.isHScrollbarsClipped) {
            cssProps.marginBottom = -edges.scrollbarBottom;
        }
        fullcalendar_1.applyStyle(scrollEl, cssProps);
        // if we are attempting to hide the scrollbars offscreen, OSX/iOS will still
        // display the floating scrollbars. attach a className to force-hide them.
        if ((this.isHScrollbarsClipped || (enhancedScroll.overflowX === 'hidden')) && // should never show?
            (this.isVScrollbarsClipped || (enhancedScroll.overflowY === 'hidden')) && // should never show?
            !( // doesn't have any scrollbar mass
            edges.scrollbarLeft ||
                edges.scrollbarRight ||
                edges.scrollbarBottom)) {
            scrollEl.classList.add('fc-no-scrollbars');
        }
        else {
            scrollEl.classList.remove('fc-no-scrollbars');
        }
    };
    ClippedScroller.prototype.setHeight = function (height) {
        this.enhancedScroll.setHeight(height);
    };
    /*
    Accounts for 'clipped' scrollbars
    */
    ClippedScroller.prototype.getScrollbarWidths = function () {
        var widths = this.enhancedScroll.getScrollbarWidths();
        if (this.isVScrollbarsClipped) {
            widths.left = 0;
            widths.right = 0;
        }
        if (this.isHScrollbarsClipped) {
            widths.bottom = 0;
        }
        return widths;
    };
    return ClippedScroller;
}());
exports.default = ClippedScroller;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ScrollerCanvas_1 = __webpack_require__(50);
var EnhancedScroller = /** @class */ (function (_super) {
    tslib_1.__extends(EnhancedScroller, _super);
    function EnhancedScroller(overflowX, overflowY) {
        var _this = _super.call(this, overflowX, overflowY) || this;
        // Scroll Events
        // ----------------------------------------------------------------------------------------------
        _this.reportScroll = function () {
            if (!_this.isScrolling) {
                _this.reportScrollStart();
            }
            _this.trigger('scroll');
            _this.isMoving = true;
            _this.requestMovingEnd();
        };
        _this.reportScrollStart = function () {
            if (!_this.isScrolling) {
                _this.isScrolling = true;
                _this.trigger('scrollStart', _this.isTouching); // created in constructor
            }
        };
        // Touch Events
        // ----------------------------------------------------------------------------------------------
        // will fire *before* the scroll event is fired
        _this.reportTouchStart = function () {
            _this.isTouching = true;
            _this.isTouchedEver = true;
        };
        _this.reportTouchEnd = function () {
            if (_this.isTouching) {
                _this.isTouching = false;
                // if touch scrolling was re-enabled during a recent touch scroll
                // then unbind the handlers that are preventing it from happening.
                if (_this.isTouchScrollEnabled) {
                    _this.unbindPreventTouchScroll(); // won't do anything if not bound
                }
                // if the user ended their touch, and the scroll area wasn't moving,
                // we consider this to be the end of the scroll.
                if (!_this.isMoving) {
                    _this.reportScrollEnd(); // won't fire if already ended
                }
            }
        };
        _this.isScrolling = false;
        _this.isTouching = false;
        _this.isTouchedEver = false;
        _this.isMoving = false;
        _this.isTouchScrollEnabled = true;
        _this.requestMovingEnd = fullcalendar_1.debounce(_this.reportMovingEnd, 500);
        _this.canvas = new ScrollerCanvas_1.default();
        _this.el.appendChild(_this.canvas.el);
        _this.applyOverflow();
        _this.bindHandlers();
        return _this;
    }
    EnhancedScroller.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unbindHandlers();
    };
    // Touch scroll prevention
    // ----------------------------------------------------------------------------------------------
    EnhancedScroller.prototype.disableTouchScroll = function () {
        this.isTouchScrollEnabled = false;
        this.bindPreventTouchScroll(); // will be unbound in enableTouchScroll or reportTouchEnd
    };
    EnhancedScroller.prototype.enableTouchScroll = function () {
        this.isTouchScrollEnabled = true;
        // only immediately unbind if a touch event is NOT in progress.
        // otherwise, it will be handled by reportTouchEnd.
        if (!this.isTouching) {
            this.unbindPreventTouchScroll();
        }
    };
    EnhancedScroller.prototype.bindPreventTouchScroll = function () {
        if (!this.preventTouchScrollHandler) {
            this.el.addEventListener('touchmove', (this.preventTouchScrollHandler = fullcalendar_1.preventDefault));
        }
    };
    EnhancedScroller.prototype.unbindPreventTouchScroll = function () {
        if (this.preventTouchScrollHandler) {
            this.el.removeEventListener('touchmove', this.preventTouchScrollHandler);
            this.preventTouchScrollHandler = null;
        }
    };
    // Handlers
    // ----------------------------------------------------------------------------------------------
    EnhancedScroller.prototype.bindHandlers = function () {
        this.el.addEventListener('scroll', this.reportScroll);
        this.el.addEventListener('touchstart', this.reportTouchStart);
        this.el.addEventListener('touchend', this.reportTouchEnd);
    };
    EnhancedScroller.prototype.unbindHandlers = function () {
        this.el.removeEventListener('scroll', this.reportScroll);
        this.el.removeEventListener('touchstart', this.reportTouchStart);
        this.el.removeEventListener('touchend', this.reportTouchEnd);
    };
    EnhancedScroller.prototype.reportMovingEnd = function () {
        this.isMoving = false;
        // only end the scroll if not currently touching.
        // if touching, the scrolling will end later, on touchend.
        if (!this.isTouching) {
            this.reportScrollEnd();
        }
    };
    EnhancedScroller.prototype.reportScrollEnd = function () {
        if (this.isScrolling) {
            this.trigger('scrollEnd');
            this.isScrolling = false;
        }
    };
    // Horizontal Scroll Normalization
    // ----------------------------------------------------------------------------------------------
    // http://stackoverflow.com/questions/24276619/better-way-to-get-the-viewport-of-a-scrollable-div-in-rtl-mode/24394376#24394376
    // TODO: move all this to util functions
    /*
    If RTL, and scrolled to the left, returns NEGATIVE value (like Firefox)
    */
    EnhancedScroller.prototype.getScrollLeft = function () {
        var el = this.el;
        var direction = window.getComputedStyle(el).direction;
        var val = el.scrollLeft;
        if (direction === 'rtl') {
            switch (getRtlScrollSystem()) {
                case 'positive':
                    val = (val + el.clientWidth) - el.scrollWidth;
                    break;
                case 'reverse':
                    val = -val;
                    break;
            }
        }
        return val;
    };
    /*
    Accepts a NEGATIVE value for when scrolled in RTL
    */
    EnhancedScroller.prototype.setScrollLeft = function (val) {
        var el = this.el;
        var direction = window.getComputedStyle(el).direction;
        if (direction === 'rtl') {
            switch (getRtlScrollSystem()) {
                case 'positive':
                    val = (val - el.clientWidth) + el.scrollWidth;
                    break;
                case 'reverse':
                    val = -val;
                    break;
            }
        }
        el.scrollLeft = val;
    };
    /*
    Always returns the number of pixels scrolled from the leftmost position (even if RTL).
    Always positive.
    */
    EnhancedScroller.prototype.getScrollFromLeft = function () {
        var el = this.el;
        var direction = window.getComputedStyle(el).direction;
        var val = el.scrollLeft;
        if (direction === 'rtl') {
            switch (getRtlScrollSystem()) {
                case 'negative':
                    val = (val - el.clientWidth) + el.scrollWidth;
                    break;
                case 'reverse':
                    val = (-val - el.clientWidth) + el.scrollWidth;
                    break;
            }
        }
        return val;
    };
    return EnhancedScroller;
}(fullcalendar_1.ScrollComponent));
exports.default = EnhancedScroller;
fullcalendar_1.EmitterMixin.mixInto(EnhancedScroller);
// Horizontal Scroll System Detection
// ----------------------------------------------------------------------------------------------
var _rtlScrollSystem;
function getRtlScrollSystem() {
    return _rtlScrollSystem || (_rtlScrollSystem = detectRtlScrollSystem());
}
function detectRtlScrollSystem() {
    var el = fullcalendar_1.htmlToElement("<div style=\" position: absolute; top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 100px; \">A</div>");
    document.body.appendChild(el);
    var system;
    if (el.scrollLeft > 0) {
        system = 'positive';
    }
    else {
        el.scrollLeft = 1;
        if (el.scrollLeft > 0) {
            system = 'reverse';
        }
        else {
            system = 'negative';
        }
    }
    fullcalendar_1.removeElement(el);
    return system;
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var tslib_1 = __webpack_require__(1);
/*
A rectangular area of content that lives within a Scroller.
Can have "gutters", areas of dead spacing around the perimeter.
Also very useful for forcing a width, which a Scroller cannot do alone.
Has a content area that lives above a background area.
*/
var ScrollerCanvas = /** @class */ (function () {
    function ScrollerCanvas() {
        this.gutters = {};
        this.el = fullcalendar_1.htmlToElement("<div class=\"fc-scroller-canvas\"> <div class=\"fc-content\"></div> <div class=\"fc-bg\"></div> </div>");
        this.contentEl = this.el.querySelector('.fc-content');
        this.bgEl = this.el.querySelector('.fc-bg');
    }
    /*
    If falsy, resets all the gutters to 0
    */
    ScrollerCanvas.prototype.setGutters = function (gutters) {
        if (!gutters) {
            this.gutters = {};
        }
        else {
            tslib_1.__assign(this.gutters, gutters);
        }
        this.updateSize();
    };
    ScrollerCanvas.prototype.setWidth = function (width) {
        this.width = width;
        this.updateSize();
    };
    ScrollerCanvas.prototype.setMinWidth = function (minWidth) {
        this.minWidth = minWidth;
        this.updateSize();
    };
    ScrollerCanvas.prototype.clearWidth = function () {
        this.width = null;
        this.minWidth = null;
        this.updateSize();
    };
    ScrollerCanvas.prototype.updateSize = function () {
        var _a = this, gutters = _a.gutters, el = _a.el;
        // is border-box (width includes padding)
        fullcalendar_1.forceClassName(el, 'fc-gutter-left', gutters.left);
        fullcalendar_1.forceClassName(el, 'fc-gutter-right', gutters.right);
        fullcalendar_1.forceClassName(el, 'fc-gutter-top', gutters.top);
        fullcalendar_1.forceClassName(el, 'fc-gutter-bottom', gutters.bottom);
        fullcalendar_1.applyStyle(el, {
            paddingLeft: gutters.left || '',
            paddingRight: gutters.right || '',
            paddingTop: gutters.top || '',
            paddingBottom: gutters.bottom || '',
            width: (this.width != null) ?
                this.width + (gutters.left || 0) + (gutters.right || 0) :
                '',
            minWidth: (this.minWidth != null) ?
                this.minWidth + (gutters.left || 0) + (gutters.right || 0) :
                ''
        });
        fullcalendar_1.applyStyle(this.bgEl, {
            left: gutters.left || '',
            right: gutters.right || '',
            top: gutters.top || '',
            bottom: gutters.bottom || ''
        });
    };
    return ScrollerCanvas;
}());
exports.default = ScrollerCanvas;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var TimelineHeader = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineHeader, _super);
    function TimelineHeader(context, parentEl) {
        var _this = _super.call(this, context) || this;
        parentEl.appendChild(_this.tableEl = fullcalendar_1.createElement('table', {
            className: _this.theme.getClass('tableGrid')
        }));
        return _this;
    }
    TimelineHeader.prototype.destroy = function () {
        fullcalendar_1.removeElement(this.tableEl);
        _super.prototype.destroy.call(this);
    };
    TimelineHeader.prototype.render = function (props) {
        this.renderDates(props.tDateProfile);
    };
    TimelineHeader.prototype.renderDates = function (tDateProfile) {
        var _a = this, dateEnv = _a.dateEnv, theme = _a.theme;
        var cellRows = tDateProfile.cellRows;
        var lastRow = cellRows[cellRows.length - 1];
        var isChrono = fullcalendar_1.asRoughMs(tDateProfile.labelInterval) > fullcalendar_1.asRoughMs(tDateProfile.slotDuration);
        var oneDay = fullcalendar_1.isSingleDay(tDateProfile.slotDuration);
        var html = '<colgroup>';
        for (var _i = 0, lastRow_1 = lastRow; _i < lastRow_1.length; _i++) {
            var _cell = lastRow_1[_i];
            html += '<col/>';
        }
        html += '</colgroup>';
        html += '<tbody>';
        for (var _b = 0, cellRows_1 = cellRows; _b < cellRows_1.length; _b++) {
            var rowCells = cellRows_1[_b];
            var isLast = rowCells === lastRow;
            html += '<tr' + (isChrono && isLast ? ' class="fc-chrono"' : '') + '>';
            for (var _c = 0, rowCells_1 = rowCells; _c < rowCells_1.length; _c++) {
                var cell = rowCells_1[_c];
                var headerCellClassNames = [theme.getClass('widgetHeader')];
                if (cell.isWeekStart) {
                    headerCellClassNames.push('fc-em-cell');
                }
                if (oneDay) {
                    headerCellClassNames = headerCellClassNames.concat(fullcalendar_1.getDayClasses(cell.date, this.props.dateProfile, this.context, true) // adds "today" class and other day-based classes
                    );
                }
                html +=
                    '<th class="' + headerCellClassNames.join(' ') + '"' +
                        ' data-date="' + dateEnv.formatIso(cell.date, { omitTime: !tDateProfile.isTimeScale, omitTimeZoneOffset: true }) + '"' +
                        (cell.colspan > 1 ? ' colspan="' + cell.colspan + '"' : '') +
                        '>' +
                        '<div class="fc-cell-content">' +
                        cell.spanHtml +
                        '</div>' +
                        '</th>';
            }
            html += '</tr>';
        }
        html += '</tbody>';
        this.tableEl.innerHTML = html; // TODO: does this work cross-browser?
        this.slatColEls = fullcalendar_1.findElements(this.tableEl, 'col');
        this.innerEls = fullcalendar_1.findElements(this.tableEl.querySelector('tr:last-child'), // compound selector won't work because of query-root problem
        'th .fc-cell-text');
    };
    return TimelineHeader;
}(fullcalendar_1.Component));
exports.default = TimelineHeader;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var TimelineSlats = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineSlats, _super);
    function TimelineSlats(context, parentEl) {
        var _this = _super.call(this, context) || this;
        parentEl.appendChild(_this.el = fullcalendar_1.createElement('div', { className: 'fc-slats' }));
        return _this;
    }
    TimelineSlats.prototype.destroy = function () {
        fullcalendar_1.removeElement(this.el);
        _super.prototype.destroy.call(this);
    };
    TimelineSlats.prototype.render = function (props) {
        this.renderDates(props.tDateProfile);
    };
    TimelineSlats.prototype.renderDates = function (tDateProfile) {
        var theme = this.theme;
        var slotDates = tDateProfile.slotDates, isWeekStarts = tDateProfile.isWeekStarts;
        var html = '<table class="' + theme.getClass('tableGrid') + '">' +
            '<colgroup>';
        for (var i = 0; i < slotDates.length; i++) {
            html += '<col/>';
        }
        html += '</colgroup>';
        html += '<tbody><tr>';
        for (var i = 0; i < slotDates.length; i++) {
            html += this.slatCellHtml(slotDates[i], isWeekStarts[i], tDateProfile);
        }
        html += '</tr></tbody></table>';
        this.el.innerHTML = html;
        this.slatColEls = fullcalendar_1.findElements(this.el, 'col');
        this.slatEls = fullcalendar_1.findElements(this.el, 'td');
        this.outerCoordCache = new fullcalendar_1.PositionCache(this.el, this.slatEls, true, // isHorizontal
        false // isVertical
        );
        // for the inner divs within the slats
        // used for event rendering and scrollTime, to disregard slat border
        this.innerCoordCache = new fullcalendar_1.PositionCache(this.el, fullcalendar_1.findChildren(this.slatEls, 'div'), true, // isHorizontal
        false // isVertical
        );
    };
    TimelineSlats.prototype.slatCellHtml = function (date, isEm, tDateProfile) {
        var _a = this, theme = _a.theme, dateEnv = _a.dateEnv;
        var classes;
        if (tDateProfile.isTimeScale) {
            classes = [];
            classes.push(fullcalendar_1.isInt(dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.labelInterval)) ?
                'fc-major' :
                'fc-minor');
        }
        else {
            classes = fullcalendar_1.getDayClasses(date, this.props.dateProfile, this.context);
            classes.push('fc-day');
        }
        classes.unshift(theme.getClass('widgetContent'));
        if (isEm) {
            classes.push('fc-em-cell');
        }
        return '<td class="' + classes.join(' ') + '"' +
            ' data-date="' + dateEnv.formatIso(date, { omitTime: !tDateProfile.isTimeScale, omitTimeZoneOffset: true }) + '"' +
            '><div></div></td>';
    };
    TimelineSlats.prototype.updateSize = function () {
        this.outerCoordCache.build();
        this.innerCoordCache.build();
    };
    TimelineSlats.prototype.positionToHit = function (leftPosition) {
        var outerCoordCache = this.outerCoordCache;
        var tDateProfile = this.props.tDateProfile;
        var slatIndex = outerCoordCache.leftToIndex(leftPosition);
        if (slatIndex != null) {
            // somewhat similar to what TimeGrid does. consolidate?
            var slatWidth = outerCoordCache.getWidth(slatIndex);
            var partial = this.isRtl ?
                (outerCoordCache.rights[slatIndex] - leftPosition) / slatWidth :
                (leftPosition - outerCoordCache.lefts[slatIndex]) / slatWidth;
            var localSnapIndex = Math.floor(partial * tDateProfile.snapsPerSlot);
            var start = this.dateEnv.add(tDateProfile.slotDates[slatIndex], fullcalendar_1.multiplyDuration(tDateProfile.snapDuration, localSnapIndex));
            var end = this.dateEnv.add(start, tDateProfile.snapDuration);
            return {
                dateSpan: {
                    range: { start: start, end: end },
                    allDay: !this.props.tDateProfile.isTimeScale
                },
                dayEl: this.slatColEls[slatIndex],
                left: outerCoordCache.lefts[slatIndex],
                right: outerCoordCache.rights[slatIndex]
            };
        }
        return null;
    };
    return TimelineSlats;
}(fullcalendar_1.Component));
exports.default = TimelineSlats;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var TimelineNowIndicator = /** @class */ (function () {
    function TimelineNowIndicator(headParent, bodyParent) {
        this.headParent = headParent;
        this.bodyParent = bodyParent;
    }
    TimelineNowIndicator.prototype.render = function (coord, isRtl) {
        var styleProps = isRtl ? { right: -coord } : { left: coord };
        this.headParent.appendChild(this.arrowEl = fullcalendar_1.createElement('div', {
            className: 'fc-now-indicator fc-now-indicator-arrow',
            style: styleProps
        }));
        this.bodyParent.appendChild(this.lineEl = fullcalendar_1.createElement('div', {
            className: 'fc-now-indicator fc-now-indicator-line',
            style: styleProps
        }));
    };
    TimelineNowIndicator.prototype.unrender = function () {
        if (this.arrowEl) {
            fullcalendar_1.removeElement(this.arrowEl);
        }
        if (this.lineEl) {
            fullcalendar_1.removeElement(this.lineEl);
        }
    };
    return TimelineNowIndicator;
}());
exports.default = TimelineNowIndicator;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var EventDragging_1 = __webpack_require__(20);
var TimelineLaneEventRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineLaneEventRenderer, _super);
    function TimelineLaneEventRenderer(context, masterContainerEl, timeAxis) {
        var _this = _super.call(this, context) || this;
        _this.masterContainerEl = masterContainerEl;
        _this.timeAxis = timeAxis;
        return _this;
    }
    TimelineLaneEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
        var eventRange = seg.eventRange;
        var eventDef = eventRange.def;
        var eventUi = eventRange.ui;
        var isDraggable = eventUi.startEditable || EventDragging_1.computeResourceEditable(eventDef, this.timeAxis.calendar);
        var isResizableFromStart = seg.isStart && eventUi.durationEditable && this.context.options.eventResizableFromStart;
        var isResizableFromEnd = seg.isEnd && eventUi.durationEditable;
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo);
        classes.unshift('fc-timeline-event', 'fc-h-event');
        var timeText = this.getTimeText(eventRange);
        return '<a class="' + classes.join(' ') + '" style="' + fullcalendar_1.cssToStr(this.getSkinCss(eventUi)) + '"' +
            (eventDef.url ?
                ' href="' + fullcalendar_1.htmlEscape(eventDef.url) + '"' :
                '') +
            '>' +
            '<div class="fc-content">' +
            (timeText ?
                '<span class="fc-time">' +
                    fullcalendar_1.htmlEscape(timeText) +
                    '</span>'
                :
                    '') +
            '<span class="fc-title">' +
            (eventDef.title ? fullcalendar_1.htmlEscape(eventDef.title) : '&nbsp;') +
            '</span>' +
            '</div>' +
            '<div class="fc-bg"></div>' +
            (isResizableFromStart ?
                '<div class="fc-resizer fc-start-resizer"></div>' :
                '') +
            (isResizableFromEnd ?
                '<div class="fc-resizer fc-end-resizer"></div>' :
                '') +
            '</a>';
    };
    TimelineLaneEventRenderer.prototype.computeDisplayEventTime = function () {
        return !this.timeAxis.tDateProfile.isTimeScale; // because times should be obvious via axis
    };
    TimelineLaneEventRenderer.prototype.computeDisplayEventEnd = function () {
        return false;
    };
    // Computes a default event time formatting string if `timeFormat` is not explicitly defined
    TimelineLaneEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'narrow'
        };
    };
    TimelineLaneEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        if (!this.el && this.masterContainerEl) {
            this.el = fullcalendar_1.createElement('div', { className: 'fc-event-container' });
            if (mirrorInfo) {
                this.el.classList.add('fc-mirror-container');
            }
            this.masterContainerEl.appendChild(this.el);
        }
        if (this.el) {
            for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                var seg = segs_1[_i];
                this.el.appendChild(seg.el);
            }
        }
    };
    TimelineLaneEventRenderer.prototype.detachSegs = function (segs) {
        for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            var seg = segs_2[_i];
            fullcalendar_1.removeElement(seg.el);
        }
    };
    // computes AND assigns (assigns the left/right at least). bad
    TimelineLaneEventRenderer.prototype.computeSegSizes = function (segs) {
        var timeAxis = this.timeAxis;
        for (var _i = 0, segs_3 = segs; _i < segs_3.length; _i++) {
            var seg = segs_3[_i];
            var coords = timeAxis.rangeToCoords(seg); // works because Seg has start/end
            fullcalendar_1.applyStyle(seg.el, {
                left: (seg.left = coords.left),
                right: -(seg.right = coords.right)
            });
        }
    };
    TimelineLaneEventRenderer.prototype.assignSegSizes = function (segs) {
        if (!this.el) {
            return;
        }
        // compute seg verticals
        for (var _i = 0, segs_4 = segs; _i < segs_4.length; _i++) {
            var seg = segs_4[_i];
            seg.height = fullcalendar_1.computeHeightAndMargins(seg.el);
        }
        this.buildSegLevels(segs); // populates above/below props for computeOffsetForSegs
        var totalHeight = computeOffsetForSegs(segs); // also assigns seg.top
        fullcalendar_1.applyStyleProp(this.el, 'height', totalHeight);
        // assign seg verticals
        for (var _a = 0, segs_5 = segs; _a < segs_5.length; _a++) {
            var seg = segs_5[_a];
            fullcalendar_1.applyStyleProp(seg.el, 'top', seg.top);
        }
    };
    TimelineLaneEventRenderer.prototype.buildSegLevels = function (segs) {
        var segLevels = [];
        segs = this.sortEventSegs(segs);
        for (var _i = 0, segs_6 = segs; _i < segs_6.length; _i++) {
            var unplacedSeg = segs_6[_i];
            unplacedSeg.above = [];
            // determine the first level with no collisions
            var level = 0; // level index
            while (level < segLevels.length) {
                var isLevelCollision = false;
                // determine collisions
                for (var _a = 0, _b = segLevels[level]; _a < _b.length; _a++) {
                    var placedSeg = _b[_a];
                    if (timeRowSegsCollide(unplacedSeg, placedSeg)) {
                        unplacedSeg.above.push(placedSeg);
                        isLevelCollision = true;
                    }
                }
                if (isLevelCollision) {
                    level += 1;
                }
                else {
                    break;
                }
            }
            // insert into the first non-colliding level. create if necessary
            (segLevels[level] || (segLevels[level] = []))
                .push(unplacedSeg);
            // record possible colliding segments below (TODO: automated test for this)
            level += 1;
            while (level < segLevels.length) {
                for (var _c = 0, _d = segLevels[level]; _c < _d.length; _c++) {
                    var belowSeg = _d[_c];
                    if (timeRowSegsCollide(unplacedSeg, belowSeg)) {
                        belowSeg.above.push(unplacedSeg);
                    }
                }
                level += 1;
            }
        }
        return segLevels;
    };
    return TimelineLaneEventRenderer;
}(fullcalendar_1.FgEventRenderer));
exports.default = TimelineLaneEventRenderer;
function computeOffsetForSegs(segs) {
    var max = 0;
    for (var _i = 0, segs_7 = segs; _i < segs_7.length; _i++) {
        var seg = segs_7[_i];
        max = Math.max(max, computeOffsetForSeg(seg));
    }
    return max;
}
function computeOffsetForSeg(seg) {
    if ((seg.top == null)) {
        seg.top = computeOffsetForSegs(seg.above);
    }
    return seg.top + seg.height;
}
function timeRowSegsCollide(seg0, seg1) {
    return (seg0.left < seg1.right) && (seg0.right > seg1.left);
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var TimelineLaneFillRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineLaneFillRenderer, _super);
    function TimelineLaneFillRenderer(context, masterContainerEl, timeAxis) {
        var _this = _super.call(this, context) || this;
        _this.masterContainerEl = masterContainerEl;
        _this.timeAxis = timeAxis;
        return _this;
    }
    TimelineLaneFillRenderer.prototype.attachSegs = function (type, segs) {
        if (segs.length) {
            var className = void 0;
            if (type === 'businessHours') {
                className = 'bgevent';
            }
            else {
                className = type.toLowerCase();
            }
            // making a new container each time is OKAY
            // all types of segs (background or business hours or whatever) are rendered in one pass
            var containerEl = fullcalendar_1.createElement('div', { className: 'fc-' + className + '-container' });
            this.masterContainerEl.appendChild(containerEl);
            for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                var seg = segs_1[_i];
                containerEl.appendChild(seg.el);
            }
            return [containerEl]; // return value
        }
    };
    TimelineLaneFillRenderer.prototype.computeSegSizes = function (segs) {
        var timeAxis = this.timeAxis;
        for (var _i = 0, segs_2 = segs; _i < segs_2.length; _i++) {
            var seg = segs_2[_i];
            var coords = timeAxis.rangeToCoords(seg);
            seg.left = coords.left;
            seg.right = coords.right;
        }
    };
    TimelineLaneFillRenderer.prototype.assignSegSizes = function (segs) {
        for (var _i = 0, segs_3 = segs; _i < segs_3.length; _i++) {
            var seg = segs_3[_i];
            fullcalendar_1.applyStyle(seg.el, {
                left: seg.left,
                right: -seg.right
            });
        }
    };
    return TimelineLaneFillRenderer;
}(fullcalendar_1.FillRenderer));
exports.default = TimelineLaneFillRenderer;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var resource_hierarchy_1 = __webpack_require__(8);
var Row_1 = __webpack_require__(27);
var render_utils_1 = __webpack_require__(18);
var GroupRow = /** @class */ (function (_super) {
    tslib_1.__extends(GroupRow, _super);
    function GroupRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._renderCells = fullcalendar_1.memoizeRendering(_this.renderCells, _this.unrenderCells);
        _this._updateExpanderIcon = fullcalendar_1.memoizeRendering(_this.updateExpanderIcon, null, [_this._renderCells]);
        _this.onExpanderClick = function (ev) {
            var props = _this.props;
            _this.calendar.dispatch({
                type: 'SET_RESOURCE_ENTITY_EXPANDED',
                id: props.id,
                isExpanded: !props.isExpanded
            });
        };
        return _this;
    }
    GroupRow.prototype.render = function (props) {
        this._renderCells(props.group, props.spreadsheetColCnt);
        this._updateExpanderIcon(props.isExpanded);
        this.isSizeDirty = true;
    };
    GroupRow.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._renderCells.unrender(); // should unrender everything else
    };
    GroupRow.prototype.renderCells = function (group, spreadsheetColCnt) {
        var spreadsheetContentEl = this.renderSpreadsheetContent(group);
        this.spreadsheetTr.appendChild(fullcalendar_1.createElement('td', {
            className: 'fc-divider',
            colSpan: spreadsheetColCnt // span across all columns
        }, this.spreadsheetHeightEl = fullcalendar_1.createElement('div', null, spreadsheetContentEl)) // needed by setTrInnerHeight
        );
        this.expanderIconEl = spreadsheetContentEl.querySelector('.fc-icon');
        this.expanderIconEl.parentElement.addEventListener('click', this.onExpanderClick);
        // insert a single cell, with a single empty <div>.
        // there will be no content
        this.timeAxisTr.appendChild(fullcalendar_1.createElement('td', { className: 'fc-divider' }, this.timeAxisHeightEl = document.createElement('div')));
    };
    GroupRow.prototype.unrenderCells = function () {
        this.spreadsheetTr.innerHTML = '';
        this.timeAxisTr.innerHTML = '';
    };
    /*
    Renders the content wrapper element that will be inserted into this row's TD cell.
    */
    GroupRow.prototype.renderSpreadsheetContent = function (group) {
        var text = this.renderCellText(group);
        var contentEl = fullcalendar_1.htmlToElement('<div class="fc-cell-content">' +
            '<span class="fc-expander">' +
            '<span class="fc-icon"></span>' +
            '</span>' +
            '<span class="fc-cell-text">' +
            (text ? fullcalendar_1.htmlEscape(text) : '&nbsp;') +
            '</span>' +
            '</div>');
        var filter = group.spec.render;
        if (typeof filter === 'function') {
            contentEl = filter(contentEl, group.value) || contentEl;
        }
        return contentEl;
    };
    GroupRow.prototype.renderCellText = function (group) {
        var text = group.value || ''; // might be null/undefined if an ad-hoc grouping
        var filter = group.spec.text;
        if (typeof filter === 'function') {
            text = filter(text) || text;
        }
        return text;
    };
    GroupRow.prototype.getHeightEls = function () {
        return [this.spreadsheetHeightEl, this.timeAxisHeightEl];
    };
    GroupRow.prototype.updateExpanderIcon = function (isExpanded) {
        render_utils_1.updateExpanderIcon(this.expanderIconEl, isExpanded, this.isRtl);
    };
    return GroupRow;
}(Row_1.default));
exports.default = GroupRow;
GroupRow.addEqualityFuncs({
    group: resource_hierarchy_1.isGroupsEqual // HACK for ResourceTimelineView::renderRows
});


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var Row_1 = __webpack_require__(27);
var SpreadsheetRow_1 = __webpack_require__(58);
var TimelineLane_1 = __webpack_require__(17);
var render_utils_1 = __webpack_require__(18);
var ResourceRow = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceRow, _super);
    function ResourceRow(context, a, b, c, d, timeAxis) {
        var _this = _super.call(this, context, a, b, c, d) || this;
        _this._updateTrResourceId = fullcalendar_1.memoizeRendering(render_utils_1.updateTrResourceId);
        _this.spreadsheetRow = new SpreadsheetRow_1.default(context, _this.spreadsheetTr);
        _this.timeAxisTr.appendChild(fullcalendar_1.createElement('td', { className: _this.theme.getClass('widgetContent') }, _this.innerContainerEl = document.createElement('div')));
        _this.lane = new TimelineLane_1.default(context, _this.innerContainerEl, _this.innerContainerEl, timeAxis);
        return _this;
    }
    ResourceRow.prototype.destroy = function () {
        this.spreadsheetRow.destroy();
        this.lane.destroy();
        _super.prototype.destroy.call(this);
    };
    ResourceRow.prototype.render = function (props) {
        // spreadsheetRow handles calling updateTrResourceId for spreadsheetTr
        this.spreadsheetRow.receiveProps({
            colSpecs: props.colSpecs,
            id: props.id,
            rowSpans: props.rowSpans,
            depth: props.depth,
            isExpanded: props.isExpanded,
            hasChildren: props.hasChildren,
            resource: props.resource
        });
        this._updateTrResourceId(this.timeAxisTr, props.resource.id);
        this.lane.receiveProps({
            dateProfile: props.dateProfile,
            nextDayThreshold: props.nextDayThreshold,
            businessHours: props.businessHours,
            eventStore: props.eventStore,
            eventUiBases: props.eventUiBases,
            dateSelection: props.dateSelection,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize
        });
        this.isSizeDirty = true;
    };
    ResourceRow.prototype.updateSize = function (isResize) {
        _super.prototype.updateSize.call(this, isResize);
        this.lane.updateSize(isResize);
    };
    ResourceRow.prototype.getHeightEls = function () {
        return [this.spreadsheetRow.heightEl, this.innerContainerEl];
    };
    return ResourceRow;
}(Row_1.default));
exports.default = ResourceRow;
ResourceRow.addEqualityFuncs({
    rowSpans: fullcalendar_1.isArraysEqual // HACK for isSizeDirty, ResourceTimelineView::renderRows
});


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var render_utils_1 = __webpack_require__(18);
var ResourceApi_1 = __webpack_require__(11);
var resource_hierarchy_1 = __webpack_require__(8);
var resource_rendering_1 = __webpack_require__(19);
var SpreadsheetRow = /** @class */ (function (_super) {
    tslib_1.__extends(SpreadsheetRow, _super);
    function SpreadsheetRow(context, tr) {
        var _this = _super.call(this, context) || this;
        _this._renderRow = fullcalendar_1.memoizeRendering(_this.renderRow, _this.unrenderRow);
        _this._updateTrResourceId = fullcalendar_1.memoizeRendering(render_utils_1.updateTrResourceId, null, [_this._renderRow]);
        _this._updateExpanderIcon = fullcalendar_1.memoizeRendering(_this.updateExpanderIcon, null, [_this._renderRow]);
        _this.onExpanderClick = function (ev) {
            var props = _this.props;
            _this.calendar.dispatch({
                type: 'SET_RESOURCE_ENTITY_EXPANDED',
                id: props.id,
                isExpanded: !props.isExpanded
            });
        };
        _this.tr = tr;
        return _this;
    }
    SpreadsheetRow.prototype.render = function (props) {
        this._renderRow(props.resource, props.rowSpans, props.depth, props.colSpecs);
        this._updateTrResourceId(this.tr, props.resource.id); // TODO: only use public ID?
        this._updateExpanderIcon(props.hasChildren, props.isExpanded);
    };
    SpreadsheetRow.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._renderRow.unrender(); // should unrender everything else
    };
    SpreadsheetRow.prototype.renderRow = function (resource, rowSpans, depth, colSpecs) {
        var _a = this, tr = _a.tr, theme = _a.theme, calendar = _a.calendar, view = _a.view;
        var resourceFields = resource_hierarchy_1.buildResourceFields(resource); // slightly inefficient. already done up the call stack
        var mainTd;
        for (var i = 0; i < colSpecs.length; i++) {
            var colSpec = colSpecs[i];
            var rowSpan = rowSpans[i];
            if (rowSpan === 0) { // not responsible for group-based rows. VRowGroup is
                continue;
            }
            else if (rowSpan == null) {
                rowSpan = 1;
            }
            var text = void 0;
            if (colSpec.field) {
                text = resourceFields[colSpec.field];
            }
            else {
                text = resource_rendering_1.buildResourceTextFunc(colSpec.text, calendar)(resource);
            }
            var contentEl = fullcalendar_1.htmlToElement('<div class="fc-cell-content">' +
                (colSpec.isMain ? renderIconHtml(depth) : '') +
                '<span class="fc-cell-text">' +
                (text ? fullcalendar_1.htmlEscape(text) : '&nbsp;') +
                '</span>' +
                '</div>');
            if (typeof colSpec.render === 'function') { // a filter function for the element
                contentEl = colSpec.render(new ResourceApi_1.default(calendar, resource), contentEl) || contentEl;
            }
            var td = fullcalendar_1.createElement('td', {
                className: theme.getClass('widgetContent'),
                rowspan: rowSpan
            }, contentEl);
            // the first cell of the row needs to have an inner div for setTrInnerHeight
            if (colSpec.isMain) {
                td.appendChild(this.heightEl = fullcalendar_1.createElement('div', null, td.childNodes) // inner wrap
                );
                mainTd = td;
            }
            tr.appendChild(td);
        }
        this.expanderIconEl = tr.querySelector('.fc-expander-space .fc-icon');
        // wait until very end
        view.publiclyTrigger('resourceRender', [
            {
                resource: new ResourceApi_1.default(calendar, resource),
                el: mainTd,
                view: view
            }
        ]);
    };
    SpreadsheetRow.prototype.unrenderRow = function () {
        this.tr.innerHTML = '';
    };
    SpreadsheetRow.prototype.updateExpanderIcon = function (hasChildren, isExpanded) {
        var expanderIconEl = this.expanderIconEl;
        var expanderEl = expanderIconEl.parentElement;
        if (expanderIconEl) {
            if (hasChildren) {
                expanderEl.addEventListener('click', this.onExpanderClick);
                expanderEl.classList.add('fc-expander');
                render_utils_1.updateExpanderIcon(expanderIconEl, isExpanded, this.isRtl);
            }
            else {
                expanderEl.removeEventListener('click', this.onExpanderClick);
                expanderEl.classList.remove('fc-expander');
                render_utils_1.clearExpanderIcon(expanderIconEl);
            }
        }
    };
    return SpreadsheetRow;
}(fullcalendar_1.Component));
exports.default = SpreadsheetRow;
/*
Renders the HTML responsible for the subrow expander area,
as well as the space before it (used to align expanders of similar depths)
*/
function renderIconHtml(depth) {
    var html = '';
    for (var i = 0; i < depth; i++) {
        html += '<span class="fc-icon"></span>';
    }
    html +=
        '<span class="fc-expander-space">' +
            '<span class="fc-icon"></span>' +
            '</span>';
    return html;
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var SpreadsheetHeader_1 = __webpack_require__(60);
var HeaderBodyLayout_1 = __webpack_require__(23);
var Spreadsheet = /** @class */ (function (_super) {
    tslib_1.__extends(Spreadsheet, _super);
    function Spreadsheet(context, headParentEl, bodyParentEl) {
        var _this = _super.call(this, context) || this;
        _this._renderCells = fullcalendar_1.memoizeRendering(_this.renderCells, _this.unrenderCells);
        _this.layout = new HeaderBodyLayout_1.default(headParentEl, bodyParentEl, 'clipped-scroll');
        _this.header = new SpreadsheetHeader_1.default(context, _this.layout.headerScroller.enhancedScroll.canvas.contentEl);
        _this.layout.bodyScroller.enhancedScroll.canvas.contentEl
            .appendChild(_this.bodyContainerEl = fullcalendar_1.createElement('div', { className: 'fc-rows' }, '<table>' +
            '<colgroup />' +
            '<tbody />' +
            '</table>'));
        _this.bodyColGroup = _this.bodyContainerEl.querySelector('colgroup');
        _this.bodyTbody = _this.bodyContainerEl.querySelector('tbody');
        return _this;
    }
    Spreadsheet.prototype.destroy = function () {
        this.header.destroy();
        this.layout.destroy();
        this._renderCells.unrender();
        _super.prototype.destroy.call(this);
    };
    Spreadsheet.prototype.render = function (props) {
        this._renderCells(props.superHeaderText, props.colSpecs);
    };
    Spreadsheet.prototype.renderCells = function (superHeaderText, colSpecs) {
        var colTags = this.renderColTags(colSpecs);
        this.header.receiveProps({
            superHeaderText: superHeaderText,
            colSpecs: colSpecs,
            colTags: colTags
        });
        this.bodyColGroup.innerHTML = colTags;
    };
    Spreadsheet.prototype.unrenderCells = function () {
        this.bodyColGroup.innerHTML = '';
    };
    Spreadsheet.prototype.renderColTags = function (colSpecs) {
        var html = '';
        for (var _i = 0, colSpecs_1 = colSpecs; _i < colSpecs_1.length; _i++) {
            var o = colSpecs_1[_i];
            if (o.isMain) {
                html += '<col class="fc-main-col"/>';
            }
            else {
                html += '<col/>';
            }
        }
        return html;
    };
    Spreadsheet.prototype.updateSize = function (isResize, totalHeight, isAuto) {
        this.layout.setHeight(totalHeight, isAuto);
    };
    return Spreadsheet;
}(fullcalendar_1.Component));
exports.default = Spreadsheet;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var SpreadsheetHeader = /** @class */ (function (_super) {
    tslib_1.__extends(SpreadsheetHeader, _super);
    function SpreadsheetHeader(context, parentEl) {
        var _this = _super.call(this, context) || this;
        parentEl.appendChild(_this.tableEl = fullcalendar_1.createElement('table', {
            className: _this.theme.getClass('tableGrid')
        }));
        return _this;
    }
    SpreadsheetHeader.prototype.destroy = function () {
        fullcalendar_1.removeElement(this.tableEl);
        _super.prototype.destroy.call(this);
    };
    SpreadsheetHeader.prototype.render = function (props) {
        var theme = this.theme;
        var colSpecs = props.colSpecs;
        var html = '<colgroup>' + props.colTags + '</colgroup>' +
            '<tbody>';
        if (props.superHeaderText) {
            html +=
                '<tr class="fc-super">' +
                    '<th class="' + theme.getClass('widgetHeader') + '" colspan="' + colSpecs.length + '">' +
                    '<div class="fc-cell-content">' +
                    '<span class="fc-cell-text">' +
                    fullcalendar_1.htmlEscape(props.superHeaderText) +
                    '</span>' +
                    '</div>' +
                    '</th>' +
                    '</tr>';
        }
        html += '<tr>';
        for (var i = 0; i < colSpecs.length; i++) {
            var o = colSpecs[i];
            var isLast = i === (colSpecs.length - 1);
            html +=
                "<th class=\"" + theme.getClass('widgetHeader') + "\">" +
                    '<div>' +
                    '<div class="fc-cell-content">' +
                    (o.isMain ?
                        '<span class="fc-expander-space">' +
                            '<span class="fc-icon"></span>' +
                            '</span>' :
                        '') +
                    '<span class="fc-cell-text">' +
                    fullcalendar_1.htmlEscape(o.labelText || '') + // what about normalizing this value ahead of time?
                    '</span>' +
                    '</div>' +
                    (!isLast ? '<div class="fc-col-resizer"></div>' : '') +
                    '</div>' +
                    '</th>';
        }
        html += '</tr>';
        html += '</tbody>';
        this.tableEl.innerHTML = html;
    };
    return SpreadsheetHeader;
}(fullcalendar_1.Component));
exports.default = SpreadsheetHeader;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var resource_day_table_1 = __webpack_require__(6);
var ResourceTimeGrid = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTimeGrid, _super);
    function ResourceTimeGrid(context, timeGrid) {
        var _this = _super.call(this, context, timeGrid.el) || this;
        _this.buildDayRanges = fullcalendar_1.memoize(fullcalendar_1.buildDayRanges);
        _this.splitter = new resource_day_table_1.VResourceSplitter();
        _this.slicers = {};
        _this.joiner = new ResourceTimeGridJoiner();
        _this.timeGrid = timeGrid;
        return _this;
    }
    ResourceTimeGrid.prototype.render = function (props) {
        var _this = this;
        var timeGrid = this.timeGrid;
        var dateProfile = props.dateProfile, resourceDayTable = props.resourceDayTable;
        var dayRanges = this.dayRanges = this.buildDayRanges(resourceDayTable.dayTable, dateProfile, this.dateEnv);
        var splitProps = this.splitter.splitProps(props);
        this.slicers = fullcalendar_1.mapHash(splitProps, function (split, resourceId) {
            return _this.slicers[resourceId] || new fullcalendar_1.TimeGridSlicer();
        });
        var slicedProps = fullcalendar_1.mapHash(this.slicers, function (slicer, resourceId) {
            return slicer.sliceProps(splitProps[resourceId], dateProfile, null, timeGrid, dayRanges);
        });
        timeGrid.allowAcrossResources = dayRanges.length === 1;
        timeGrid.receiveProps(tslib_1.__assign({}, this.joiner.joinProps(slicedProps, resourceDayTable), { dateProfile: dateProfile, cells: resourceDayTable.cells[0] }));
    };
    ResourceTimeGrid.prototype.renderNowIndicator = function (date) {
        var timeGrid = this.timeGrid;
        var resourceDayTable = this.props.resourceDayTable;
        var nonResourceSegs = this.slicers[''].sliceNowDate(date, timeGrid, this.dayRanges);
        var segs = this.joiner.expandSegs(resourceDayTable, nonResourceSegs);
        timeGrid.renderNowIndicator(segs, date);
    };
    ResourceTimeGrid.prototype.prepareHits = function () {
        this.offsetTracker = new fullcalendar_1.OffsetTracker(this.timeGrid.el);
    };
    ResourceTimeGrid.prototype.releaseHits = function () {
        this.offsetTracker.destroy();
    };
    ResourceTimeGrid.prototype.queryHit = function (leftOffset, topOffset) {
        var offsetTracker = this.offsetTracker;
        if (offsetTracker.isWithinClipping(leftOffset, topOffset)) {
            var originLeft = offsetTracker.computeLeft();
            var originTop = offsetTracker.computeTop();
            var rawHit = this.timeGrid.positionToHit(leftOffset - originLeft, topOffset - originTop);
            if (rawHit) {
                return {
                    component: this.timeGrid,
                    dateSpan: {
                        range: rawHit.dateSpan.range,
                        allDay: rawHit.dateSpan.allDay,
                        resourceId: this.props.resourceDayTable.cells[0][rawHit.col].resource.id
                    },
                    dayEl: rawHit.dayEl,
                    rect: {
                        left: rawHit.relativeRect.left + originLeft,
                        right: rawHit.relativeRect.right + originLeft,
                        top: rawHit.relativeRect.top + originTop,
                        bottom: rawHit.relativeRect.bottom + originTop
                    },
                    layer: 0
                };
            }
        }
    };
    return ResourceTimeGrid;
}(fullcalendar_1.DateComponent));
exports.default = ResourceTimeGrid;
ResourceTimeGrid.prototype.isInteractable = true;
var ResourceTimeGridJoiner = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTimeGridJoiner, _super);
    function ResourceTimeGridJoiner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceTimeGridJoiner.prototype.transformSeg = function (seg, resourceDayTable, resourceI) {
        return [
            tslib_1.__assign({}, seg, { col: resourceDayTable.computeCol(seg.col, resourceI) })
        ];
    };
    return ResourceTimeGridJoiner;
}(resource_day_table_1.VResourceJoiner));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var resource_source_1 = __webpack_require__(10);
resource_source_1.registerResourceSourceDef({
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


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var resource_source_1 = __webpack_require__(10);
resource_source_1.registerResourceSourceDef({
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
        fullcalendar_1.unpromisify(func.bind(null, publicArg), function (rawResources) {
            success({ rawResources: rawResources }); // needs an object response
        }, failure // send errorObj directly to failure callback
        );
    }
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var request = __webpack_require__(65);
var resource_source_1 = __webpack_require__(10);
var tslib_1 = __webpack_require__(1);
resource_source_1.registerResourceSourceDef({
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
        var theRequest;
        var requestParams = buildRequestParams(meta, arg.range, arg.calendar);
        if (meta.method === 'GET') {
            theRequest = request.get(meta.url).query(requestParams); // querystring params
        }
        else {
            theRequest = request(meta.method, meta.url).send(requestParams); // body data
        }
        theRequest.end(function (error, res) {
            var rawResources;
            if (!error) {
                if (res.body) { // parsed JSON
                    rawResources = res.body;
                }
                else if (res.text) {
                    // if the server doesn't set Content-Type, won't be parsed as JSON. parse anyway.
                    rawResources = JSON.parse(res.text);
                }
                if (rawResources) {
                    successCallback({ rawResources: rawResources, response: res });
                }
                else {
                    failureCallback({ message: 'Invalid JSON response', response: res });
                }
            }
            else {
                failureCallback(error); // error has { error, response }
            }
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
    tslib_1.__assign(params, customRequestParams);
    return params;
}


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_65__;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var TimelineView_1 = __webpack_require__(16);
exports.default = fullcalendar_1.createPlugin({
    viewConfigs: {
        timeline: {
            class: TimelineView_1.default,
            eventResizableFromStart: true // how is this consumed for TimelineView tho?
        },
        timelineDay: {
            type: 'timeline',
            duration: { days: 1 }
        },
        timelineWeek: {
            type: 'timeline',
            duration: { weeks: 1 }
        },
        timelineMonth: {
            type: 'timeline',
            duration: { months: 1 }
        },
        timelineYear: {
            type: 'timeline',
            duration: { years: 1 }
        }
    }
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceTimelineView_1 = __webpack_require__(26);
var TimelineView_1 = __webpack_require__(16);
var RESOURCE_TIMELINE_DEFAULTS = {
    resourceAreaWidth: '30%',
    resourcesInitiallyExpanded: true,
    eventResizableFromStart: true // how is this consumed for TimelineView tho?
};
function transformViewSpec(viewSpec) {
    if (viewSpec.class === TimelineView_1.default && viewSpec.options.resources) {
        return tslib_1.__assign({}, viewSpec, { class: ResourceTimelineView_1.default, options: tslib_1.__assign({}, RESOURCE_TIMELINE_DEFAULTS, viewSpec.options) });
    }
    return viewSpec;
}
exports.default = fullcalendar_1.createPlugin({
    viewSpecTransformers: [transformViewSpec]
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceAgendaView_1 = __webpack_require__(28);
var resource_day_table_1 = __webpack_require__(6);
function transformViewSpec(viewSpec) {
    if (viewSpec.class === fullcalendar_1.AgendaView && resource_day_table_1.isVResourceViewEnabled(viewSpec)) {
        return tslib_1.__assign({}, viewSpec, { class: ResourceAgendaView_1.default });
    }
    return viewSpec;
}
exports.default = fullcalendar_1.createPlugin({
    viewSpecTransformers: [transformViewSpec]
});


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceBasicView_1 = __webpack_require__(31);
var resource_day_table_1 = __webpack_require__(6);
function transformViewSpec(viewSpec) {
    if (viewSpec.class === fullcalendar_1.BasicView && resource_day_table_1.isVResourceViewEnabled(viewSpec)) {
        return tslib_1.__assign({}, viewSpec, { class: ResourceBasicView_1.default });
    }
    return viewSpec;
}
exports.default = fullcalendar_1.createPlugin({
    viewSpecTransformers: [transformViewSpec]
});


/***/ })
/******/ ]);
});