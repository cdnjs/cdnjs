/*!
 * FullCalendar Scheduler v1.9.1
 * Docs & License: https://fullcalendar.io/scheduler/
 * (c) 2017 Adam Shaw
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fullcalendar"), require("jquery"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["fullcalendar", "jquery", "moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("fullcalendar"), require("jquery"), require("moment")) : factory(root["FullCalendar"], root["jQuery"], root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_15__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceComponentFootprint = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceComponentFootprint, _super);
    function ResourceComponentFootprint(unzonedRange, isAllDay, resourceId) {
        var _this = _super.call(this, unzonedRange, isAllDay) || this;
        _this.resourceId = resourceId;
        return _this;
    }
    ResourceComponentFootprint.prototype.toLegacy = function (calendar) {
        var obj = _super.prototype.toLegacy.call(this, calendar);
        obj.resourceId = this.resourceId;
        return obj;
    };
    return ResourceComponentFootprint;
}(fullcalendar_1.ComponentFootprint));
exports.default = ResourceComponentFootprint;


/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ResourceViewMixin = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceViewMixin, _super);
    function ResourceViewMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceViewMixin.mixInto = function (destClass) {
        var _this = this;
        fullcalendar_1.Mixin.mixInto.call(this, destClass);
        [
            'bindBaseRenderHandlers',
            'queryScroll',
            'applyScroll',
            'triggerDayClick',
            'triggerSelect',
            'triggerExternalDrop',
            'handleResourceAdd',
            'handleResourceRemove'
        ].forEach(function (methodName) {
            destClass.prototype[methodName] = _this.prototype[methodName];
        });
    };
    ResourceViewMixin.prototype.initResourceView = function () {
        var _this = this;
        // new task
        var resourceDeps = ['hasResources'];
        if (!this.canHandleSpecificResources) {
            resourceDeps.push('displayingDates');
        }
        this.watch('displayingResources', resourceDeps, function () {
            _this.requestResourcesRender(_this.get('currentResources'));
        }, function () {
            _this.requestResourcesUnrender();
        });
        // start relying on displayingResources
        this.watch('displayingBusinessHours', [
            'businessHourGenerator',
            'displayingResources',
            'displayingDates'
        ], function (deps) {
            _this.requestBusinessHoursRender(deps.businessHourGenerator);
        }, function () {
            _this.requestBusinessHoursUnrender();
        });
        // start relying on resource displaying rather than just current resources
        this.watch('displayingEvents', ['displayingResources', 'hasEvents'], function () {
            _this.requestEventsRender(_this.get('currentEvents'));
        }, function () {
            _this.requestEventsUnrender();
        });
    };
    // Logic: base render trigger should fire when BOTH the resources and dates have rendered,
    // but the unrender trigger should fire after ONLY the dates are about to be unrendered.
    ResourceViewMixin.prototype.bindBaseRenderHandlers = function () {
        var isResourcesRendered = false;
        var isDatesRendered = false;
        this.on('resourcesRendered', function () {
            if (!isResourcesRendered) {
                isResourcesRendered = true;
                if (isDatesRendered) {
                    this.whenSizeUpdated(this.triggerViewRender);
                }
            }
        });
        this.on('datesRendered', function () {
            if (!isDatesRendered) {
                isDatesRendered = true;
                if (isResourcesRendered) {
                    this.whenSizeUpdated(this.triggerViewRender);
                }
            }
        });
        this.on('before:resourcesUnrendered', function () {
            if (isResourcesRendered) {
                isResourcesRendered = false;
            }
        });
        this.on('before:datesUnrendered', function () {
            if (isDatesRendered) {
                isDatesRendered = false;
                this.triggerViewDestroy();
            }
        });
    };
    // Scroll
    // ----------------------------------------------------------------------------------------------
    ResourceViewMixin.prototype.queryScroll = function () {
        var scroll = fullcalendar_1.View.prototype.queryScroll.apply(this, arguments);
        if (this.isResourcesRendered) {
            $.extend(scroll, this.queryResourceScroll());
        }
        return scroll;
    };
    ResourceViewMixin.prototype.applyScroll = function (scroll) {
        fullcalendar_1.View.prototype.applyScroll.apply(this, arguments);
        if (this.isResourcesRendered) {
            this.applyResourceScroll(scroll);
        }
    };
    ResourceViewMixin.prototype.queryResourceScroll = function () {
        return {}; // subclasses must implement
    };
    ResourceViewMixin.prototype.applyResourceScroll = function () {
        // subclasses must implement
    };
    // Rendering Utils
    // ----------------------------------------------------------------------------------------------
    ResourceViewMixin.prototype.getResourceText = function (resource) {
        return this.getResourceTextFunc()(resource);
    };
    ResourceViewMixin.prototype.getResourceTextFunc = function () {
        if (this.resourceTextFunc) {
            return this.resourceTextFunc;
        }
        else {
            var func = this.opt('resourceText');
            if (typeof func !== 'function') {
                func = function (resource) { return resource.title || resource.id; };
            }
            this.resourceTextFunc = func;
            return func;
        }
    };
    // Resource Change Handling
    // ----------------------------------------------------------------------------------------------
    ResourceViewMixin.prototype.handleResourceAdd = function (resource) {
        this.requestResourceRender(resource);
    };
    ResourceViewMixin.prototype.handleResourceRemove = function (resource) {
        this.requestResourceUnrender(resource);
    };
    // Resource Rendering
    // ----------------------------------------------------------------------------------------------
    ResourceViewMixin.prototype.requestResourcesRender = function (resources) {
        var _this = this;
        this.requestRender(function () {
            _this.executeResourcesRender(resources);
        }, 'resource', 'init');
    };
    ResourceViewMixin.prototype.requestResourcesUnrender = function () {
        var _this = this;
        this.requestRender(function () {
            _this.executeResourcesUnrender();
        }, 'resource', 'destroy');
    };
    ResourceViewMixin.prototype.requestResourceRender = function (resource) {
        var _this = this;
        this.requestRender(function () {
            _this.executeResourceRender(resource);
        }, 'resource', 'add');
    };
    ResourceViewMixin.prototype.requestResourceUnrender = function (resource) {
        var _this = this;
        this.requestRender(function () {
            _this.executeResourceUnrender(resource);
        }, 'resource', 'remove');
    };
    // Resource High-level Rendering/Unrendering
    // ----------------------------------------------------------------------------------------------
    ResourceViewMixin.prototype.executeResourcesRender = function (resources) {
        this.renderResources(resources);
        this.isResourcesRendered = true;
        this.trigger('resourcesRendered');
    };
    ResourceViewMixin.prototype.executeResourcesUnrender = function () {
        this.trigger('before:resourcesUnrendered');
        this.unrenderResources();
        this.isResourcesRendered = false;
    };
    ResourceViewMixin.prototype.executeResourceRender = function (resource) {
        this.renderResource(resource);
    };
    ResourceViewMixin.prototype.executeResourceUnrender = function (resource) {
        this.unrenderResource(resource);
    };
    // Triggering
    // ----------------------------------------------------------------------------------------------
    /*
    footprint is a ResourceComponentFootprint
    */
    ResourceViewMixin.prototype.triggerDayClick = function (footprint, dayEl, ev) {
        var dateProfile = this.calendar.footprintToDateProfile(footprint);
        this.publiclyTrigger('dayClick', {
            context: dayEl,
            args: [
                dateProfile.start,
                ev,
                this,
                footprint.resourceId ?
                    this.calendar.resourceManager.getResourceById(footprint.resourceId) :
                    null
            ]
        });
    };
    /*
    footprint is a ResourceComponentFootprint
    */
    ResourceViewMixin.prototype.triggerSelect = function (footprint, ev) {
        var dateProfile = this.calendar.footprintToDateProfile(footprint);
        this.publiclyTrigger('select', {
            context: this,
            args: [
                dateProfile.start,
                dateProfile.end,
                ev,
                this,
                footprint.resourceId ?
                    this.calendar.resourceManager.getResourceById(footprint.resourceId) :
                    null
            ]
        });
    };
    // override the view's default trigger in order to provide a resourceId to the `drop` event
    // TODO: make more DRY with core
    ResourceViewMixin.prototype.triggerExternalDrop = function (singleEventDef, isEvent, el, ev, ui) {
        // trigger 'drop' regardless of whether element represents an event
        this.publiclyTrigger('drop', {
            context: el[0],
            args: [
                singleEventDef.dateProfile.start.clone(),
                ev,
                ui,
                singleEventDef.getResourceIds()[0],
                this
            ]
        });
        if (isEvent) {
            // signal an external event landed
            this.publiclyTrigger('eventReceive', {
                context: this,
                args: [
                    singleEventDef.buildInstance().toLegacy(),
                    this
                ]
            });
        }
    };
    return ResourceViewMixin;
}(fullcalendar_1.Mixin));
exports.default = ResourceViewMixin;
ResourceViewMixin.prototype.isResourcesRendered = false;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ResourceDayTableMixin_1 = __webpack_require__(21);
var ResourceComponentFootprint_1 = __webpack_require__(6);
var ResourceDayGrid = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceDayGrid, _super);
    function ResourceDayGrid(view) {
        var _this = _super.call(this, view) || this;
        _this.isResourceFootprintsEnabled = true;
        return _this;
    }
    ResourceDayGrid.prototype.renderDates = function (dateProfile) {
        this.dateProfile = dateProfile;
    };
    ResourceDayGrid.prototype.renderResources = function (resources) {
        this.registerResources(resources);
        this.renderGrid();
        if (this.headContainerEl) {
            this.processHeadResourceEls(this.headContainerEl);
        }
    };
    // TODO: make DRY with ResourceTimeGrid
    ResourceDayGrid.prototype.getHitFootprint = function (hit) {
        var plainFootprint = _super.prototype.getHitFootprint.call(this, hit);
        return new ResourceComponentFootprint_1.default(plainFootprint.unzonedRange, plainFootprint.isAllDay, this.getColResource(hit.col).id);
    };
    ResourceDayGrid.prototype.componentFootprintToSegs = function (componentFootprint) {
        var resourceCnt = this.resourceCnt;
        var genericSegs = this.datesAboveResources ?
            this.sliceRangeByDay(componentFootprint.unzonedRange) : // each day-per-resource will need its own column
            this.sliceRangeByRow(componentFootprint.unzonedRange);
        var resourceSegs = [];
        for (var _i = 0, genericSegs_1 = genericSegs; _i < genericSegs_1.length; _i++) {
            var seg = genericSegs_1[_i];
            for (var resourceIndex = 0; resourceIndex < resourceCnt; resourceIndex++) {
                var resourceObj = this.flattenedResources[resourceIndex];
                if (!(componentFootprint instanceof ResourceComponentFootprint_1.default) ||
                    (componentFootprint.resourceId === resourceObj.id)) {
                    var copy = $.extend({}, seg);
                    copy.resource = resourceObj;
                    if (this.isRTL) {
                        copy.leftCol = this.indicesToCol(resourceIndex, seg.lastRowDayIndex);
                        copy.rightCol = this.indicesToCol(resourceIndex, seg.firstRowDayIndex);
                    }
                    else {
                        copy.leftCol = this.indicesToCol(resourceIndex, seg.firstRowDayIndex);
                        copy.rightCol = this.indicesToCol(resourceIndex, seg.lastRowDayIndex);
                    }
                    resourceSegs.push(copy);
                }
            }
        }
        return resourceSegs;
    };
    return ResourceDayGrid;
}(fullcalendar_1.DayGrid));
exports.default = ResourceDayGrid;
ResourceDayTableMixin_1.default.mixInto(ResourceDayGrid);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var moment = __webpack_require__(15);
var fullcalendar_1 = __webpack_require__(0);
var ClippedScroller_1 = __webpack_require__(24);
var ScrollerCanvas_1 = __webpack_require__(25);
var ScrollJoiner_1 = __webpack_require__(16);
var ScrollFollower_1 = __webpack_require__(26);
var TimelineEventRenderer_1 = __webpack_require__(17);
var TimelineFillRenderer_1 = __webpack_require__(28);
var TimelineHelperRenderer_1 = __webpack_require__(29);
var TimelineEventDragging_1 = __webpack_require__(40);
var TimelineEventResizing_1 = __webpack_require__(41);
var TimelineView_defaults_1 = __webpack_require__(42);
var TimelineView = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineView, _super);
    function TimelineView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.emphasizeWeeks = false;
        _this.isTimeBodyScrolled = false;
        _this.slotWidth = _this.opt('slotWidth');
        return _this;
    }
    // Footprints
    // ------------------------------------------------------------------------------------------------------------------
    /*
    TODO: avoid using Moments. use slat system somehow
    THEN, can have componentFootprintToSegs handle this on its own
    */
    TimelineView.prototype.normalizeComponentFootprint = function (componentFootprint) {
        var adjustedEnd;
        var adjustedStart;
        var unzonedRange = componentFootprint.unzonedRange;
        if (this.isTimeScale) {
            adjustedStart = this.normalizeGridDate(unzonedRange.getStart());
            adjustedEnd = this.normalizeGridDate(unzonedRange.getEnd());
        }
        else {
            var dayRange = this.computeDayRange(unzonedRange);
            if (this.largeUnit) {
                adjustedStart = dayRange.start.clone().startOf(this.largeUnit);
                adjustedEnd = dayRange.end.clone().startOf(this.largeUnit);
                // if date is partially through the interval, or is in the same interval as the start,
                // make the exclusive end be the *next* interval
                if (!adjustedEnd.isSame(dayRange.end) || !adjustedEnd.isAfter(adjustedStart)) {
                    adjustedEnd.add(this.slotDuration);
                }
            }
            else {
                adjustedStart = dayRange.start;
                adjustedEnd = dayRange.end;
            }
        }
        return new fullcalendar_1.ComponentFootprint(new fullcalendar_1.UnzonedRange(adjustedStart, adjustedEnd), !this.isTimeScale // isAllDay
        );
    };
    TimelineView.prototype.componentFootprintToSegs = function (footprint) {
        var footprintStart = footprint.unzonedRange.getStart();
        var footprintEnd = footprint.unzonedRange.getEnd();
        var normalFootprint = this.normalizeComponentFootprint(footprint);
        var segs = [];
        // protect against when the span is entirely in an invalid date region
        if (this.computeDateSnapCoverage(footprintStart) < this.computeDateSnapCoverage(footprintEnd)) {
            // intersect the footprint's range with the grid'd range
            var segRange = normalFootprint.unzonedRange.intersect(this.normalizedUnzonedRange);
            if (segRange) {
                var segStart = segRange.getStart();
                var segEnd = segRange.getEnd();
                segs.push({
                    start: segStart,
                    end: segEnd,
                    isStart: segRange.isStart && this.isValidDate(segStart),
                    isEnd: segRange.isEnd && this.isValidDate(segEnd.clone().subtract(1))
                });
            }
        }
        // TODO: what if month slots? should round it to nearest month
        // TODO: dragging/resizing in this situation? deltas for dragging/resizing breaks down
        return segs;
    };
    // Date Computation
    // ------------------------------------------------------------------------------------------------------------------
    /*
    Makes the given date consistent with isTimeScale/largeUnit,
    so, either removes the times, ensures a time, or makes it the startOf largeUnit.
    Strips all timezones. Returns new copy.
    TODO: should maybe be called "normalizeRangeDate".
    */
    TimelineView.prototype.normalizeGridDate = function (date) {
        var normalDate;
        if (this.isTimeScale) {
            normalDate = date.clone();
            if (!normalDate.hasTime()) {
                normalDate.time(0);
            }
        }
        else {
            normalDate = date.clone().stripTime();
            if (this.largeUnit) {
                normalDate.startOf(this.largeUnit);
            }
        }
        return normalDate;
    };
    TimelineView.prototype.isValidDate = function (date) {
        if (this.isHiddenDay(date)) {
            return false;
        }
        else if (this.isTimeScale) {
            // determine if the time is within minTime/maxTime, which may have wacky values
            var ms = date.time() - this.dateProfile.minTime; // milliseconds since minTime
            ms = ((ms % 86400000) + 86400000) % 86400000; // make negative values wrap to 24hr clock
            return ms < this.timeWindowMs; // before the maxTime?
        }
        else {
            return true;
        }
    };
    TimelineView.prototype.updateGridDates = function () {
        var snapIndex = -1;
        var snapDiff = 0; // index of the diff :(
        var snapDiffToIndex = [];
        var snapIndexToDiff = [];
        var date = this.normalizedUnzonedStart.clone();
        while (date < this.normalizedUnzonedEnd) {
            if (this.isValidDate(date)) {
                snapIndex++;
                snapDiffToIndex.push(snapIndex);
                snapIndexToDiff.push(snapDiff);
            }
            else {
                snapDiffToIndex.push(snapIndex + 0.5);
            }
            date.add(this.snapDuration);
            snapDiff++;
        }
        this.snapDiffToIndex = snapDiffToIndex;
        this.snapIndexToDiff = snapIndexToDiff;
        this.snapCnt = snapIndex + 1; // is always one behind
        this.slotCnt = this.snapCnt / this.snapsPerSlot;
    };
    // Skeleton Rendering
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.renderSkeleton = function () {
        this.el.addClass('fc-timeline');
        if (this.opt('eventOverlap') === false) {
            this.el.addClass('fc-no-overlap');
        }
        this.el.html(this.renderSkeletonHtml());
        this.timeHeadEl = this.el.find('thead .fc-time-area');
        this.timeBodyEl = this.el.find('tbody .fc-time-area');
        this.timeHeadScroller = new ClippedScroller_1.default({
            overflowX: 'clipped-scroll',
            overflowY: 'hidden'
        });
        this.timeHeadScroller.canvas = new ScrollerCanvas_1.default();
        this.timeHeadScroller.render();
        this.timeHeadScroller.el.appendTo(this.timeHeadEl);
        this.timeBodyScroller = new ClippedScroller_1.default();
        this.timeBodyScroller.canvas = new ScrollerCanvas_1.default();
        this.timeBodyScroller.render();
        this.timeBodyScroller.el.appendTo(this.timeBodyEl);
        this.isTimeBodyScrolled = false; // because if the grid has been rerendered, it will get a zero scroll
        this.timeBodyScroller.on('scroll', fullcalendar_1.proxy(this, 'handleTimeBodyScrolled'));
        this.slatContainerEl = $('<div class="fc-slats"/>').appendTo(this.timeBodyScroller.canvas.bgEl);
        this.segContainerEl = $('<div class="fc-event-container"/>').appendTo(this.timeBodyScroller.canvas.contentEl);
        this.bgSegContainerEl = this.timeBodyScroller.canvas.bgEl;
        this.timeBodyBoundCache = new fullcalendar_1.CoordCache({
            els: this.timeBodyScroller.canvas.el,
            isHorizontal: true,
            isVertical: true
        });
        this.timeScrollJoiner = new ScrollJoiner_1.default('horizontal', [this.timeHeadScroller, this.timeBodyScroller]);
        // the date/time text on the top axis that stays put while scrolling happens
        this.headDateFollower = new ScrollFollower_1.default(this.timeHeadScroller, true); // allowPointerEvents=true
        // the event titles that stay put while scrolling happens
        this.eventTitleFollower = new ScrollFollower_1.default(this.timeBodyScroller);
        this.eventTitleFollower.minTravel = 50;
        //
        if (this.isRTL) {
            this.eventTitleFollower.containOnNaturalRight = true;
        }
        else {
            this.eventTitleFollower.containOnNaturalLeft = true;
        }
        _super.prototype.renderSkeleton.call(this);
    };
    TimelineView.prototype.renderSkeletonHtml = function () {
        var theme = this.calendar.theme;
        return "<table class=\"" + theme.getClass('tableGrid') + "\"> <thead class=\"fc-head\"> <tr> <td class=\"fc-time-area " + theme.getClass('widgetHeader') + "\"></td> </tr> </thead> <tbody class=\"fc-body\"> <tr> <td class=\"fc-time-area " + theme.getClass('widgetContent') + "\"></td> </tr> </tbody> </table>";
    };
    TimelineView.prototype.unrenderSkeleton = function () {
        this.handleTimeBodyScrolled(0);
        _super.prototype.unrenderSkeleton.call(this);
    };
    // Date Rendering
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.renderDates = function (dateProfile) {
        TimelineView_defaults_1.initScaleProps(this);
        this.timeWindowMs = dateProfile.maxTime - dateProfile.minTime;
        // makes sure zone is stripped
        this.normalizedUnzonedStart = this.normalizeGridDate(dateProfile.renderUnzonedRange.getStart());
        this.normalizedUnzonedEnd = this.normalizeGridDate(dateProfile.renderUnzonedRange.getEnd());
        // apply minTime/maxTime
        // TODO: move towards .time(), but didn't play well with negatives.
        // TODO: View should be responsible.
        if (this.isTimeScale) {
            this.normalizedUnzonedStart.add(dateProfile.minTime);
            this.normalizedUnzonedEnd.subtract(1, 'day').add(dateProfile.maxTime);
        }
        this.normalizedUnzonedRange = new fullcalendar_1.UnzonedRange(this.normalizedUnzonedStart, this.normalizedUnzonedEnd);
        var slotDates = [];
        var date = this.normalizedUnzonedStart.clone();
        this.calendar.localizeMoment(date);
        while (date < this.normalizedUnzonedEnd) {
            if (this.isValidDate(date)) {
                slotDates.push(date.clone());
            }
            date.add(this.slotDuration);
        }
        this.slotDates = slotDates;
        this.updateGridDates();
        var slatHtmlRes = this.renderSlatHtml();
        this.timeHeadScroller.canvas.contentEl.html(slatHtmlRes.headHtml);
        this.timeHeadColEls = this.timeHeadScroller.canvas.contentEl.find('col');
        this.slatContainerEl.html(slatHtmlRes.bodyHtml);
        this.slatColEls = this.slatContainerEl.find('col');
        this.slatEls = this.slatContainerEl.find('td');
        this.slatCoordCache = new fullcalendar_1.CoordCache({
            els: this.slatEls,
            isHorizontal: true
        });
        // for the inner divs within the slats
        // used for event rendering and scrollTime, to disregard slat border
        this.slatInnerCoordCache = new fullcalendar_1.CoordCache({
            els: this.slatEls.find('> div'),
            isHorizontal: true,
            // we use this coord cache for getPosition* for event rendering.
            // workaround for .fc-content's negative margins.
            offsetParent: this.timeBodyScroller.canvas.el
        });
        for (var i = 0; i < this.slotDates.length; i++) {
            date = this.slotDates[i];
            this.publiclyTrigger('dayRender', {
                context: this,
                args: [date, this.slatEls.eq(i), this]
            });
        }
        if (this.headDateFollower) {
            this.headDateFollower.setSpriteEls(this.timeHeadEl.find('tr:not(:last-child) .fc-cell-text'));
        }
    };
    TimelineView.prototype.unrenderDates = function () {
        if (this.headDateFollower) {
            this.headDateFollower.clearSprites();
        }
        this.timeHeadScroller.canvas.contentEl.empty();
        this.slatContainerEl.empty();
        // clear the widths,
        // for no jupiness when navigating
        this.timeHeadScroller.canvas.clearWidth();
        this.timeBodyScroller.canvas.clearWidth();
    };
    TimelineView.prototype.renderSlatHtml = function () {
        var cell;
        var date;
        var rowCells;
        var format;
        var theme = this.calendar.theme;
        var labelInterval = this.labelInterval;
        var formats = this.headerFormats;
        var cellRows = formats.map(function (format) { return []; }); // indexed by row,col
        var leadingCell = null;
        var prevWeekNumber = null;
        var slotDates = this.slotDates;
        var slotCells = []; // meta
        var rowUnits = formats.map(function (format) { return (fullcalendar_1.queryMostGranularFormatUnit(format)); });
        for (var _i = 0, slotDates_1 = slotDates; _i < slotDates_1.length; _i++) {
            date = slotDates_1[_i];
            var weekNumber = date.week();
            var isWeekStart = this.emphasizeWeeks && (prevWeekNumber !== null) && (prevWeekNumber !== weekNumber);
            for (var row = 0; row < formats.length; row++) {
                format = formats[row];
                rowCells = cellRows[row];
                leadingCell = rowCells[rowCells.length - 1];
                var isSuperRow = (formats.length > 1) && (row < (formats.length - 1)); // more than one row and not the last
                var newCell = null;
                if (isSuperRow) {
                    var text = date.format(format);
                    if (!leadingCell || (leadingCell.text !== text)) {
                        newCell = this.buildCellObject(date, text, rowUnits[row]);
                    }
                    else {
                        leadingCell.colspan += 1;
                    }
                }
                else {
                    if (!leadingCell || fullcalendar_1.isInt(fullcalendar_1.divideRangeByDuration(this.normalizedUnzonedStart, date, labelInterval))) {
                        var text = date.format(format);
                        newCell = this.buildCellObject(date, text, rowUnits[row]);
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
            slotCells.push({ weekStart: isWeekStart });
            prevWeekNumber = weekNumber;
        }
        var isChrono = labelInterval > this.slotDuration;
        var isSingleDay = this.slotDuration.as('days') === 1;
        var html = '<table class="' + theme.getClass('tableGrid') + '">';
        html += '<colgroup>';
        for (var _a = 0, slotDates_2 = slotDates; _a < slotDates_2.length; _a++) {
            date = slotDates_2[_a];
            html += '<col/>';
        }
        html += '</colgroup>';
        html += '<tbody>';
        for (var i = 0; i < cellRows.length; i++) {
            rowCells = cellRows[i];
            var isLast = i === (cellRows.length - 1);
            html += '<tr' + (isChrono && isLast ? ' class="fc-chrono"' : '') + '>';
            for (var _b = 0, rowCells_1 = rowCells; _b < rowCells_1.length; _b++) {
                cell = rowCells_1[_b];
                var headerCellClassNames = [theme.getClass('widgetHeader')];
                if (cell.weekStart) {
                    headerCellClassNames.push('fc-em-cell');
                }
                if (isSingleDay) {
                    headerCellClassNames = headerCellClassNames.concat(this.getDayClasses(cell.date, true) // adds "today" class and other day-based classes
                    );
                }
                html +=
                    '<th class="' + headerCellClassNames.join(' ') + '"' +
                        ' data-date="' + cell.date.format() + '"' +
                        (cell.colspan > 1 ? ' colspan="' + cell.colspan + '"' : '') +
                        '>' +
                        '<div class="fc-cell-content">' +
                        cell.spanHtml +
                        '</div>' +
                        '</th>';
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        var slatHtml = '<table class="' + theme.getClass('tableGrid') + '">';
        slatHtml += '<colgroup>';
        for (var _c = 0, slotCells_1 = slotCells; _c < slotCells_1.length; _c++) {
            cell = slotCells_1[_c];
            slatHtml += '<col/>';
        }
        slatHtml += '</colgroup>';
        slatHtml += '<tbody><tr>';
        for (var i = 0; i < slotCells.length; i++) {
            cell = slotCells[i];
            date = slotDates[i];
            slatHtml += this.slatCellHtml(date, cell.weekStart);
        }
        slatHtml += '</tr></tbody></table>';
        return { headHtml: html, bodyHtml: slatHtml };
    };
    TimelineView.prototype.buildCellObject = function (date, text, rowUnit) {
        date = date.clone(); // ensure our own reference
        var spanHtml = this.buildGotoAnchorHtml({
            date: date,
            type: rowUnit,
            forceOff: !rowUnit
        }, {
            'class': 'fc-cell-text'
        }, fullcalendar_1.htmlEscape(text));
        return { text: text, spanHtml: spanHtml, date: date, colspan: 1 };
    };
    TimelineView.prototype.slatCellHtml = function (date, isEm) {
        var classes;
        var theme = this.calendar.theme;
        if (this.isTimeScale) {
            classes = [];
            classes.push(fullcalendar_1.isInt(fullcalendar_1.divideRangeByDuration(this.normalizedUnzonedStart, date, this.labelInterval)) ?
                'fc-major' :
                'fc-minor');
        }
        else {
            classes = this.getDayClasses(date);
            classes.push('fc-day');
        }
        classes.unshift(theme.getClass('widgetContent'));
        if (isEm) {
            classes.push('fc-em-cell');
        }
        return '<td class="' + classes.join(' ') + '"' +
            ' data-date="' + date.format() + '"' +
            '><div /></td>';
    };
    // Business Hours
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.renderBusinessHours = function (businessHourPayload) {
        if (!this.largeUnit) {
            return _super.prototype.renderBusinessHours.call(this, businessHourPayload);
        }
    };
    // Now Indicator
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.getNowIndicatorUnit = function () {
        // TODO: converge with largeUnit. precompute
        if (this.isTimeScale) {
            return fullcalendar_1.computeGreatestUnit(this.slotDuration);
        }
    };
    // will only execute if isTimeScale
    TimelineView.prototype.renderNowIndicator = function (date) {
        var nodes = [];
        date = this.normalizeGridDate(date);
        if (this.normalizedUnzonedRange.containsDate(date)) {
            var coord = this.dateToCoord(date);
            var css = this.isRTL ?
                { right: -coord } :
                { left: coord };
            nodes.push($("<div class='fc-now-indicator fc-now-indicator-arrow'></div>")
                .css(css)
                .appendTo(this.timeHeadScroller.canvas.el)[0]);
            nodes.push($("<div class='fc-now-indicator fc-now-indicator-line'></div>")
                .css(css)
                .appendTo(this.timeBodyScroller.canvas.el)[0]);
        }
        this.nowIndicatorEls = $(nodes);
    };
    // will only execute if isTimeScale
    TimelineView.prototype.unrenderNowIndicator = function () {
        if (this.nowIndicatorEls) {
            this.nowIndicatorEls.remove();
            this.nowIndicatorEls = null;
        }
    };
    // Sizing
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        var bodyHeight;
        var containerMinWidth;
        var containerWidth;
        var nonLastSlotWidth;
        if (isAuto) {
            bodyHeight = 'auto';
        }
        else {
            bodyHeight = totalHeight - this.headHeight() - this.queryMiscHeight();
        }
        this.timeBodyScroller.setHeight(bodyHeight);
        // reason for this complicated method is that things went wrong when:
        //  slots/headers didn't fill content area and needed to be stretched
        //  cells wouldn't align (rounding issues with available width calculated
        //  differently because of padding VS scrollbar trick)
        var isDatesRendered = this.timeHeadColEls; // TODO: refactor use of this
        if (isDatesRendered) {
            var slotWidth = Math.round(this.slotWidth || (this.slotWidth = this.computeSlotWidth()));
            containerWidth = slotWidth * this.slotDates.length;
            containerMinWidth = '';
            nonLastSlotWidth = slotWidth;
            var availableWidth = this.timeBodyScroller.getClientWidth();
            if (availableWidth > containerWidth) {
                containerMinWidth = availableWidth;
                containerWidth = '';
                nonLastSlotWidth = Math.floor(availableWidth / this.slotDates.length);
            }
        }
        else {
            containerWidth = '';
            containerMinWidth = '';
        }
        this.timeHeadScroller.canvas.setWidth(containerWidth);
        this.timeHeadScroller.canvas.setMinWidth(containerMinWidth);
        this.timeBodyScroller.canvas.setWidth(containerWidth);
        this.timeBodyScroller.canvas.setMinWidth(containerMinWidth);
        if (isDatesRendered) {
            this.timeHeadColEls.slice(0, -1).add(this.slatColEls.slice(0, -1))
                .css('width', nonLastSlotWidth);
        }
        this.timeHeadScroller.updateSize();
        this.timeBodyScroller.updateSize();
        this.timeScrollJoiner.update();
        if (isDatesRendered) {
            this.buildCoords();
            // TODO: left/right CSS assignment also happens earlier in renderFgSegs
            this.updateSegPositions();
            // this updateSize method is triggered by callers who don't always subsequently call updateNowIndicator,
            // and updateSize always has the risk of changing horizontal spacing which will affect nowIndicator positioning,
            // so always call it here too. will often rerender twice unfortunately.
            // TODO: more closely integrate updateSize with updateNowIndicator
            this.updateNowIndicator();
        }
        if (this.headDateFollower) {
            this.headDateFollower.update();
        }
        if (this.eventTitleFollower) {
            this.eventTitleFollower.update();
        }
    };
    TimelineView.prototype.queryMiscHeight = function () {
        return this.el.outerHeight() -
            this.timeHeadScroller.el.outerHeight() -
            this.timeBodyScroller.el.outerHeight();
    };
    TimelineView.prototype.computeSlotWidth = function () {
        var maxInnerWidth = 0; // TODO: harness core's `matchCellWidths` for this
        var innerEls = this.timeHeadEl.find('tr:last-child th .fc-cell-text'); // TODO: cache
        innerEls.each(function (i, node) {
            var innerWidth = $(node).outerWidth();
            return maxInnerWidth = Math.max(maxInnerWidth, innerWidth);
        });
        var headerWidth = maxInnerWidth + 1; // assume no padding, and one pixel border
        var slotsPerLabel = fullcalendar_1.divideDurationByDuration(this.labelInterval, this.slotDuration); // TODO: rename labelDuration?
        var slotWidth = Math.ceil(headerWidth / slotsPerLabel);
        var minWidth = this.timeHeadColEls.eq(0).css('min-width');
        if (minWidth) {
            minWidth = parseInt(minWidth, 10);
            if (minWidth) {
                slotWidth = Math.max(slotWidth, minWidth);
            }
        }
        return slotWidth;
    };
    // Coordinates
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.buildCoords = function () {
        this.timeBodyBoundCache.build();
        this.slatCoordCache.build();
        this.slatInnerCoordCache.build();
    };
    // returned value is between 0 and the number of snaps
    TimelineView.prototype.computeDateSnapCoverage = function (date) {
        var snapDiff = fullcalendar_1.divideRangeByDuration(this.normalizedUnzonedStart, date, this.snapDuration);
        if (snapDiff < 0) {
            return 0;
        }
        else if (snapDiff >= this.snapDiffToIndex.length) {
            return this.snapCnt;
        }
        else {
            var snapDiffInt = Math.floor(snapDiff);
            var snapCoverage = this.snapDiffToIndex[snapDiffInt];
            if (fullcalendar_1.isInt(snapCoverage)) {
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
    TimelineView.prototype.dateToCoord = function (date) {
        var snapCoverage = this.computeDateSnapCoverage(date);
        var slotCoverage = snapCoverage / this.snapsPerSlot;
        var slotIndex = Math.floor(slotCoverage);
        slotIndex = Math.min(slotIndex, this.slotCnt - 1);
        var partial = slotCoverage - slotIndex;
        var coordCache = this.slatInnerCoordCache;
        if (this.isRTL) {
            return (coordCache.getRightPosition(slotIndex) -
                (coordCache.getWidth(slotIndex) * partial)) - this.timeBodyBoundCache.getWidth(0);
        }
        else {
            return (coordCache.getLeftPosition(slotIndex) +
                (coordCache.getWidth(slotIndex) * partial));
        }
    };
    TimelineView.prototype.rangeToCoords = function (range) {
        if (this.isRTL) {
            return { right: this.dateToCoord(range.start), left: this.dateToCoord(range.end) };
        }
        else {
            return { left: this.dateToCoord(range.start), right: this.dateToCoord(range.end) };
        }
    };
    // a getter / setter
    TimelineView.prototype.headHeight = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var table = this.timeHeadScroller.canvas.contentEl.find('table');
        return table.height.apply(table, args);
    };
    // this needs to be called if v scrollbars appear on body container. or zooming
    TimelineView.prototype.updateSegPositions = function () {
        var segs = [].concat(this.getEventSegs(), this.getBusinessHourSegs());
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            var coords = this.rangeToCoords(seg);
            seg.el.css({
                left: (seg.left = coords.left),
                right: -(seg.right = coords.right)
            });
        }
    };
    // Scrolling
    // ---------------------------------------------------------------------------------
    TimelineView.prototype.handleTimeBodyScrolled = function (top) {
        if (top) {
            if (!this.isTimeBodyScrolled) {
                this.isTimeBodyScrolled = true;
                this.el.addClass('fc-scrolled');
            }
        }
        else {
            if (this.isTimeBodyScrolled) {
                this.isTimeBodyScrolled = false;
                this.el.removeClass('fc-scrolled');
            }
        }
    };
    TimelineView.prototype.computeInitialDateScroll = function () {
        var unzonedRange = this.get('dateProfile').activeUnzonedRange;
        var left = 0;
        if (this.isTimeScale) {
            var scrollTime = this.opt('scrollTime');
            if (scrollTime) {
                scrollTime = moment.duration(scrollTime);
                left = this.dateToCoord(unzonedRange.getStart().time(scrollTime)); // TODO: fix this for RTL
            }
        }
        return { left: left };
    };
    TimelineView.prototype.queryDateScroll = function () {
        return { left: this.timeBodyScroller.getScrollLeft() };
    };
    TimelineView.prototype.applyDateScroll = function (scroll) {
        if (scroll.left != null) {
            // TODO: workaround for FF. the ScrollJoiner sibling won't react fast enough
            // to override the native initial crappy scroll that FF applies.
            // TODO: have the ScrollJoiner handle this
            // Similar code in ResourceTimelineView::setScroll
            this.timeHeadScroller.setScrollLeft(scroll.left);
            this.timeBodyScroller.setScrollLeft(scroll.left);
        }
    };
    // Hit System
    // ------------------------------------------------------------------------------------------------------------------
    TimelineView.prototype.prepareHits = function () {
        this.buildCoords();
    };
    // FYI: we don't want to clear the slatCoordCache in releaseHits()
    // because those coordinates are needed for dateToCoord()
    TimelineView.prototype.queryHit = function (leftOffset, topOffset) {
        var snapsPerSlot = this.snapsPerSlot;
        var slatCoordCache = this.slatCoordCache;
        var timeBodyBoundCache = this.timeBodyBoundCache;
        // within scroll container's content rectangle?
        if (timeBodyBoundCache.isPointInBounds(leftOffset, topOffset)) {
            var slatIndex = slatCoordCache.getHorizontalIndex(leftOffset);
            if (slatIndex != null) {
                var localSnapIndex = void 0;
                var partial = void 0;
                var snapIndex = void 0;
                var snapLeft = void 0;
                var snapRight = void 0;
                var slatWidth = slatCoordCache.getWidth(slatIndex);
                if (this.isRTL) {
                    var slatRight = slatCoordCache.getRightOffset(slatIndex);
                    partial = (slatRight - leftOffset) / slatWidth;
                    localSnapIndex = Math.floor(partial * snapsPerSlot);
                    snapIndex = (slatIndex * snapsPerSlot) + localSnapIndex;
                    snapRight = slatRight - ((localSnapIndex / snapsPerSlot) * slatWidth);
                    snapLeft = snapRight - (((localSnapIndex + 1) / snapsPerSlot) * slatWidth);
                }
                else {
                    var slatLeft = slatCoordCache.getLeftOffset(slatIndex);
                    partial = (leftOffset - slatLeft) / slatWidth;
                    localSnapIndex = Math.floor(partial * snapsPerSlot);
                    snapIndex = (slatIndex * snapsPerSlot) + localSnapIndex;
                    snapLeft = slatLeft + ((localSnapIndex / snapsPerSlot) * slatWidth);
                    snapRight = slatLeft + (((localSnapIndex + 1) / snapsPerSlot) * slatWidth);
                }
                return {
                    snap: snapIndex,
                    component: this,
                    left: snapLeft,
                    right: snapRight,
                    top: timeBodyBoundCache.getTopOffset(0),
                    bottom: timeBodyBoundCache.getBottomOffset(0)
                };
            }
        }
    };
    TimelineView.prototype.getHitFootprint = function (hit) {
        return new fullcalendar_1.ComponentFootprint(this.getSnapUnzonedRange(hit.snap), !this.isTimeScale // isAllDay
        );
    };
    TimelineView.prototype.getHitEl = function (hit) {
        return this.getSnapEl(hit.snap); // TODO: write a test for this
    };
    /*
    TODO: avoid using moments
    */
    TimelineView.prototype.getSnapUnzonedRange = function (snapIndex) {
        var start = this.normalizedUnzonedStart.clone();
        start.add(fullcalendar_1.multiplyDuration(this.snapDuration, this.snapIndexToDiff[snapIndex]));
        var end = start.clone().add(this.snapDuration);
        return new fullcalendar_1.UnzonedRange(start, end);
    };
    TimelineView.prototype.getSnapEl = function (snapIndex) {
        return this.slatEls.eq(Math.floor(snapIndex / this.snapsPerSlot));
    };
    // Event Resizing
    // ------------------------------------------------------------------------------------------------------------------
    // Renders a visual indication of an event being resized
    TimelineView.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        for (var _i = 0, eventFootprints_1 = eventFootprints; _i < eventFootprints_1.length; _i++) {
            var eventFootprint = eventFootprints_1[_i];
            this.renderHighlight(eventFootprint.componentFootprint);
        }
        return this.helperRenderer.renderEventResizingFootprints(eventFootprints, seg, isTouch);
    };
    // Unrenders a visual indication of an event being resized
    TimelineView.prototype.unrenderEventResize = function () {
        this.unrenderHighlight();
        return this.helperRenderer.unrender();
    };
    // DnD
    // ------------------------------------------------------------------------------------------------------------------
    // TODO: different technique based on scale.
    //  when dragging, middle of event is the drop.
    //  should be the edges when isTimeScale.
    TimelineView.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        if (seg) {
            this.helperRenderer.renderEventDraggingFootprints(eventFootprints, seg, isTouch);
            return true; // signal helper rendered
        }
        else {
            for (var _i = 0, eventFootprints_2 = eventFootprints; _i < eventFootprints_2.length; _i++) {
                var eventFootprint = eventFootprints_2[_i];
                this.renderHighlight(eventFootprint.componentFootprint);
            }
            return false; // signal helper not rendered
        }
    };
    TimelineView.prototype.unrenderDrag = function () {
        this.helperRenderer.unrender();
        return this.unrenderHighlight();
    };
    return TimelineView;
}(fullcalendar_1.View));
exports.default = TimelineView;
// config
TimelineView.prototype.usesMinMaxTime = true; // for View. indicates that minTime/maxTime affects rendering
// TODO: rename these
TimelineView.prototype.eventRendererClass = TimelineEventRenderer_1.default;
TimelineView.prototype.fillRendererClass = TimelineFillRenderer_1.default;
TimelineView.prototype.businessHourRendererClass = fullcalendar_1.BusinessHourRenderer;
TimelineView.prototype.helperRendererClass = TimelineHelperRenderer_1.default;
TimelineView.prototype.eventDraggingClass = TimelineEventDragging_1.default;
TimelineView.prototype.eventResizingClass = TimelineEventResizing_1.default;
fullcalendar_1.StandardInteractionsMixin.mixInto(TimelineView);


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
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
        // when the user scrolls via mousewheel, we know for sure the target
        // scroller should be the master. capture the various x-browser events that fire.
        scroller.scrollEl.on('wheel mousewheel DomMouseScroll MozMousePixelScroll', function () {
            _this.assignMasterScroller(scroller);
        });
        scroller.on('scrollStart', function () {
            if (!_this.masterScroller) {
                _this.assignMasterScroller(scroller);
            }
        }).on('scroll', function () {
            if (scroller === _this.masterScroller) {
                for (var _i = 0, _a = _this.scrollers; _i < _a.length; _i++) {
                    var otherScroller = _a[_i];
                    if (otherScroller !== scroller) {
                        switch (_this.axis) {
                            case 'horizontal':
                                otherScroller.setNativeScrollLeft(scroller.getNativeScrollLeft());
                                break;
                            case 'vertical':
                                otherScroller.setScrollTop(scroller.getScrollTop());
                                break;
                        }
                    }
                }
            }
        }).on('scrollEnd', function () {
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
                otherScroller.disableTouchScroll();
            }
        }
    };
    ScrollJoiner.prototype.unassignMasterScroller = function () {
        if (this.masterScroller) {
            for (var _i = 0, _a = this.scrollers; _i < _a.length; _i++) {
                var otherScroller = _a[_i];
                otherScroller.enableTouchScroll();
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
        var scroller;
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
            scroller = this.scrollers[i];
            widths = allWidths[i];
            scroller.canvas.setGutters(this.axis === 'horizontal' ?
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ScrollFollowerSprite_1 = __webpack_require__(27);
var TimelineEventRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineEventRenderer, _super);
    function TimelineEventRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    component must be { segContainerEl, segContainerHeight, rangeToCoords }
    */
    TimelineEventRenderer.prototype.computeDisplayEventTime = function () {
        return !this.view.isTimeScale; // because times should be obvious via axis
    };
    TimelineEventRenderer.prototype.computeDisplayEventEnd = function () {
        return false;
    };
    // Computes a default event time formatting string if `timeFormat` is not explicitly defined
    TimelineEventRenderer.prototype.computeEventTimeFormat = function () {
        return this.view.opt('extraSmallTimeFormat');
    };
    TimelineEventRenderer.prototype.renderFgSegs = function (segs) {
        var eventTitleFollower = this.view.eventTitleFollower;
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            // TODO: centralize logic (also in updateSegPositions)
            var coords = this.component.rangeToCoords(seg);
            seg.el.css({
                left: (seg.left = coords.left),
                right: -(seg.right = coords.right)
            });
        }
        // attach segs
        for (var _a = 0, segs_2 = segs; _a < segs_2.length; _a++) {
            var seg = segs_2[_a];
            seg.el.appendTo(this.component.segContainerEl);
        }
        // compute seg verticals
        for (var _b = 0, segs_3 = segs; _b < segs_3.length; _b++) {
            var seg = segs_3[_b];
            seg.height = seg.el.outerHeight(true); // include margin
        }
        this.buildSegLevels(segs);
        this.component.segContainerHeight = computeOffsetForSegs(segs); // returns this value!
        // assign seg verticals
        for (var _c = 0, segs_4 = segs; _c < segs_4.length; _c++) {
            var seg = segs_4[_c];
            seg.el.css('top', seg.top);
        }
        this.component.segContainerEl.height(this.component.segContainerHeight);
        for (var _d = 0, segs_5 = segs; _d < segs_5.length; _d++) {
            var seg = segs_5[_d];
            var titleEl = seg.el.find('.fc-title');
            if (titleEl.length) {
                seg.scrollFollowerSprite = new ScrollFollowerSprite_1.default(titleEl);
                eventTitleFollower.addSprite(seg.scrollFollowerSprite);
            }
        }
    };
    // NOTE: this modifies the order of segs
    TimelineEventRenderer.prototype.buildSegLevels = function (segs) {
        var segLevels = [];
        this.sortEventSegs(segs);
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
    TimelineEventRenderer.prototype.unrenderFgSegs = function (segs) {
        if (this.component.segContainerEl) {
            var eventTitleFollower = this.view.eventTitleFollower;
            for (var _i = 0, segs_7 = segs; _i < segs_7.length; _i++) {
                var seg = segs_7[_i];
                if (seg.scrollFollowerSprite) {
                    eventTitleFollower.removeSprite(seg.scrollFollowerSprite);
                }
            }
            this.component.segContainerEl.empty();
            this.component.segContainerEl.height('');
            this.component.segContainerHeight = null;
        }
    };
    TimelineEventRenderer.prototype.fgSegHtml = function (seg, disableResizing) {
        var eventDef = seg.footprint.eventDef;
        var isDraggable = this.view.isEventDefDraggable(eventDef);
        var isResizableFromStart = seg.isStart && this.view.isEventDefResizableFromStart(eventDef);
        var isResizableFromEnd = seg.isEnd && this.view.isEventDefResizableFromEnd(eventDef);
        var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd);
        classes.unshift('fc-timeline-event', 'fc-h-event');
        var timeText = this.getTimeText(seg.footprint);
        return '<a class="' + classes.join(' ') + '" style="' + fullcalendar_1.cssToStr(this.getSkinCss(seg.footprint.eventDef)) + '"' +
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
            '<div class="fc-bg" />' +
            (isResizableFromStart ?
                '<div class="fc-resizer fc-start-resizer"></div>' :
                '') +
            (isResizableFromEnd ?
                '<div class="fc-resizer fc-end-resizer"></div>' :
                '') +
            '</a>';
    };
    return TimelineEventRenderer;
}(fullcalendar_1.EventRenderer));
exports.default = TimelineEventRenderer;
// Seg Rendering Utils
// ----------------------------------------------------------------------------------------------------------------------
function computeOffsetForSegs(segs) {
    var max = 0;
    for (var _i = 0, segs_8 = segs; _i < segs_8.length; _i++) {
        var seg = segs_8[_i];
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var util_1 = __webpack_require__(44);
/*
An abstract node in a row-hierarchy tree.
May be a self-contained single row, a row with subrows,
OR a grouping of rows without its own distinct row.
*/
var RowParent = /** @class */ (function (_super) {
    tslib_1.__extends(RowParent, _super);
    function RowParent(view) {
        var _this = _super.call(this, view) // will assign this.view
         || this;
        _this.children = [];
        _this.depth = 0;
        _this.trHash = {};
        _this.trs = $();
        _this.isExpanded = _this.view.opt('resourcesInitiallyExpanded');
        return _this;
    }
    // Hierarchy
    // ------------------------------------------------------------------------------------------------------------------
    /*
    Adds the given node as a child.
    Will be inserted at the `index`. If not given, will be appended to the end.
    */
    RowParent.prototype.addChildRowNode = function (child, index) {
        child.removeFromParentAndDom(); // in case it belonged somewhere else previously
        var children = this.children;
        // insert into the children array
        if (index != null) {
            children.splice(index, 0, child);
        }
        else {
            index = children.length;
            children.push(child);
        }
        // compute the previous sibling of child
        child.prevSibling =
            index > 0 ?
                children[index - 1] :
                null;
        // update the next sibling's prevSibling
        if (index < (children.length - 1)) {
            children[index + 1].prevSibling = child;
        }
        child.parent = this;
        child.depth = this.depth + (this.hasOwnRow ? 1 : 0);
        this.descendantAdded(child);
    };
    /*
    Removes the given child from the node. Assumes it is a direct child.
    If not a direct child, returns false and nothing happens.
    */
    RowParent.prototype.removeChild = function (child) {
        var i;
        var children = this.children;
        var isFound = false;
        // look for the node in the children array
        for (i = 0; i < children.length; i++) {
            var testChild = children[i];
            if (testChild === child) {
                isFound = true;
                break; // after this, `i` will contain the index
            }
        }
        if (!isFound) {
            return false; // return false if not found
        }
        else {
            // rewire the next sibling's prevSibling to skip
            if (i < (children.length - 1)) {
                children[i + 1].prevSibling = child.prevSibling;
            }
            children.splice(i, 1); // remove node from the array
            // unwire child from the parent/siblings
            child.parent = null;
            child.prevSibling = null;
            this.descendantRemoved(child);
            return child; // return on success (needed?)
        }
    };
    /*
    Removes all of the node's children from the hierarchy.
    */
    RowParent.prototype.removeChildren = function () {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            this.descendantRemoved(child);
        }
        this.children = [];
    };
    /*
    Removes this node from its parent
    */
    RowParent.prototype.removeFromParentAndDom = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.get('isInDom')) {
            this.removeElement();
        }
    };
    /*
    Gets the last direct child node
    */
    RowParent.prototype.getLastChild = function () {
        var children = this.children;
        return children[children.length - 1];
    };
    /*
    Walks backward in the hierarchy to find the previous row leaf node.
    When looking at the hierarchy in a flat linear fashion, this is the revealed row just before the current.
    */
    RowParent.prototype.getPrevRowInDom = function () {
        var node = this;
        while (node) {
            if (node.prevSibling) {
                // attempt to go into the deepest last child of the previous sibling
                var lastChild = void 0;
                node = node.prevSibling;
                while ((lastChild = node.getLastChild())) {
                    node = lastChild;
                }
            }
            else {
                // otherwise, move up to the parent
                node = node.parent;
            }
            // return this "previous" node if it has an exposed row
            if (node && node.get('isInDom') && node.hasOwnRow) {
                return node;
            }
        }
        return null;
    };
    /*
    Returns the first node in the subtree that has a revealed row
    */
    RowParent.prototype.getLeadingRow = function () {
        if (this.hasOwnRow) {
            return this;
        }
        else if (this.isExpanded && this.children.length) {
            return this.children[0].getLeadingRow();
        }
    };
    /*
    Generates a flat array containing all the row-nodes of the subtree. Descendants + self
    */
    RowParent.prototype.getRows = function (batchArray) {
        if (batchArray === void 0) { batchArray = []; }
        if (this.hasOwnRow) {
            batchArray.push(this);
        }
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.getRows(batchArray);
        }
        return batchArray;
    };
    /*
    Generates a flat array containing all the nodes (row/non-row) of the subtree. Descendants + self
    */
    RowParent.prototype.getNodes = function (batchArray) {
        if (batchArray === void 0) { batchArray = []; }
        batchArray.push(this);
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.getNodes(batchArray);
        }
        return batchArray;
    };
    /*
    Generates a flat array containing all the descendant nodes the current node
    */
    RowParent.prototype.getDescendants = function () {
        var batchArray = [];
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.getNodes(batchArray);
        }
        return batchArray;
    };
    // Rendering
    // ------------------------------------------------------------------------------------------------------------------
    RowParent.prototype.show = function () {
        if (!this.get('isInDom')) {
            this.renderSkeleton();
        }
    };
    RowParent.prototype.hide = function () {
        if (this.get('isInDom')) {
            this.removeElement();
        }
    };
    /*
    Builds and populates the TRs for each row type. Inserts them into the DOM.
    Does this only for this single row. Not recursive. If not a row (hasOwnRow=false), does not render anything.
    PRECONDITION: assumes the parent has already been rendered.
    */
    RowParent.prototype.renderSkeleton = function () {
        this.trHash = {};
        var trNodes = [];
        if (this.hasOwnRow) {
            var prevRow = this.getPrevRowInDom(); // the row before this row, in the overall linear flat list
            // let the view's tbody structure determine which TRs should be rendered
            for (var type in this.view.tbodyHash) {
                // build the TR and record it
                // assign before calling the render methods, because they might rely
                var tbody = this.view.tbodyHash[type];
                var tr = $('<tr/>');
                this.trHash[type] = tr;
                trNodes.push(tr[0]);
                // call the subclass' render method for this row type (if available)
                var renderMethodName = 'render' + fullcalendar_1.capitaliseFirstLetter(type) + 'Skeleton';
                if (this[renderMethodName]) {
                    this[renderMethodName](tr);
                }
                // insert the TR into the DOM
                if (prevRow) {
                    prevRow.trHash[type].after(tr);
                }
                else {
                    tbody.prepend(tr); // belongs in the very first position
                }
            }
            // build a single jQuery object. use event delegation for calling toggleExpanded
            this.trs = $(trNodes)
                .on('click', '.fc-expander', fullcalendar_1.proxy(this, 'toggleExpanded'));
            this.thisRowShown();
        }
        this.set('isInDom', true);
        if (this.isExpanded) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.renderSkeleton();
            }
        }
    };
    /*
    Unpopulates and removes all of this row's TRs from the DOM. Only for this single row. Not recursive.
    Will trigger "hidden".
    */
    RowParent.prototype.removeElement = function () {
        // call the subclass' render method for each row type (if available)
        for (var type in this.trHash) {
            var tr = this.trHash[type];
            var unrenderMethodName = 'unrender' + fullcalendar_1.capitaliseFirstLetter(type) + 'Skeleton';
            if (this[unrenderMethodName]) {
                this[unrenderMethodName](tr);
            }
        }
        this.unset('isInDom');
        this.thisRowHidden();
        this.trHash = {};
        this.trs.remove(); // remove from DOM
        this.trs = $();
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.get('isInDom')) {
                child.removeElement();
            }
        }
    };
    /*
    A simple getter for retrieving a TR jQuery object of a certain row type
    */
    RowParent.prototype.getTr = function (type) {
        return this.trHash[type];
    };
    // Expanding / Collapsing
    // ------------------------------------------------------------------------------------------------------------------
    // Use by row groups and rows with subrows
    /*
    Reveals this node's children if they have not already been revealed. Changes any expander icon.
    */
    RowParent.prototype.expand = function () {
        if (!this.isExpanded) {
            this.isExpanded = true;
            this.indicateExpanded();
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.show();
            }
            this.view.calendar.updateViewSize(); // notify view of dimension change
            this.animateExpand();
        }
    };
    /*
    Hides this node's children if they are not already hidden. Changes any expander icon.
    */
    RowParent.prototype.collapse = function () {
        if (this.isExpanded) {
            this.isExpanded = false;
            this.indicateCollapsed();
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.hide();
            }
            this.view.calendar.updateViewSize(); // notify view of dimension change
        }
    };
    /*
    Switches between expanded/collapsed states
    */
    RowParent.prototype.toggleExpanded = function () {
        if (this.isExpanded) {
            this.collapse();
        }
        else {
            this.expand();
        }
    };
    /*
    Changes the expander icon to the "expanded" state
    */
    RowParent.prototype.indicateExpanded = function () {
        this.trs.find('.fc-expander .fc-icon')
            .removeClass(this.getCollapsedIcon())
            .addClass(this.getExpandedIcon());
    };
    /*
    Changes the expander icon to the "collapsed" state
    */
    RowParent.prototype.indicateCollapsed = function () {
        this.trs.find('.fc-expander .fc-icon')
            .removeClass(this.getExpandedIcon())
            .addClass(this.getCollapsedIcon());
    };
    RowParent.prototype.indicateExpandingEnabled = function () {
        this.trs.find('.fc-expander-space')
            .addClass('fc-expander');
        if (this.isExpanded) {
            this.indicateExpanded();
        }
        else {
            this.indicateCollapsed();
        }
    };
    RowParent.prototype.indicateExpandingDisabled = function () {
        this.trs.find('.fc-expander-space')
            .removeClass('fc-expander')
            .find('.fc-icon')
            .removeClass(this.getExpandedIcon())
            .removeClass(this.getCollapsedIcon());
    };
    RowParent.prototype.updateExpandingEnabled = function () {
        if (this.hasOwnRow && this.children.length) {
            this.indicateExpandingEnabled();
        }
        else {
            this.indicateExpandingDisabled();
        }
    };
    RowParent.prototype.getExpandedIcon = function () {
        return 'fc-icon-down-triangle';
    };
    RowParent.prototype.getCollapsedIcon = function () {
        var dir = this.view.isRTL ? 'left' : 'right';
        return 'fc-icon-' + dir + '-triangle';
    };
    /*
    Causes a slide-down CSS transition to demonstrate that the expand has happened
    */
    RowParent.prototype.animateExpand = function () {
        var firstChild = this.children[0];
        var leadingRow = firstChild && firstChild.getLeadingRow();
        var trs = leadingRow && leadingRow.trs;
        if (trs) {
            trs.addClass('fc-collapsed');
            setTimeout(function () {
                trs.addClass('fc-transitioning'); // enable transitioning
                trs.removeClass('fc-collapsed'); // transition back to non-collapsed state
            });
            // cross-browser way to determine when the transition finishes
            trs.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                trs.removeClass('fc-transitioning'); // will remove the overflow:hidden
            });
        }
    };
    // Sizing
    // ------------------------------------------------------------------------------------------------------------------
    /*
    Find each TRs "inner div" (div within first cell). This div controls each TRs height.
    Returns the max pixel height.
    */
    RowParent.prototype.getMaxTrInnerHeight = function () {
        var max = 0;
        $.each(this.trHash, function (type, tr) {
            // exclude multi-rowspans (probably done for row grouping)
            var innerEl = util_1.getOwnCells(tr).find('> div:not(.fc-cell-content):first');
            max = Math.max(innerEl.height(), max);
        });
        return max;
    };
    /*
    Find each TRs "inner div" and sets all of their heights to the same value.
    */
    RowParent.prototype.setTrInnerHeight = function (height) {
        // exclude multi-rowspans (probably done for row grouping)
        $.each(this.trHash, function (type, tr) {
            util_1.getOwnCells(tr).find('> div:not(.fc-cell-content):first')
                .height(height);
        });
    };
    // Triggering
    // ------------------------------------------------------------------------------------------------------------------
    RowParent.prototype.descendantAdded = function (row) {
        if (this.get('isInDom') && this.hasOwnRow && (this.children.length === 1)) {
            this.indicateExpandingEnabled();
        }
        (this.parent || this.view).descendantAdded(row);
    };
    RowParent.prototype.descendantRemoved = function (row) {
        if (this.get('isInDom') && this.hasOwnRow && (this.children.length === 0)) {
            this.indicateExpandingDisabled();
        }
        (this.parent || this.view).descendantRemoved(row);
    };
    RowParent.prototype.thisRowShown = function () {
        (this.parent || this.view).descendantShown(this);
    };
    RowParent.prototype.thisRowHidden = function () {
        (this.parent || this.view).descendantHidden(this);
    };
    RowParent.prototype.descendantShown = function (row) {
        (this.parent || this.view).descendantShown(row);
    };
    RowParent.prototype.descendantHidden = function (row) {
        (this.parent || this.view).descendantHidden(row);
    };
    return RowParent;
}(fullcalendar_1.DateComponent));
exports.default = RowParent;
RowParent.prototype.hasOwnRow = false;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var Resource = /** @class */ (function () {
    function Resource() {
    }
    Resource.extractIds = function (rawProps, calendar) {
        var resourceField = calendar.opt('eventResourceField') || 'resourceId';
        var resourceIds = [];
        if (rawProps.resourceIds) {
            for (var _i = 0, _a = rawProps.resourceIds; _i < _a.length; _i++) {
                var rawResourceId = _a[_i];
                resourceIds.push(Resource.normalizeId(rawResourceId));
            }
        }
        if (rawProps[resourceField] != null) {
            resourceIds.push(Resource.normalizeId(rawProps[resourceField]));
        }
        return resourceIds;
    };
    Resource.normalizeId = function (rawId) {
        return String(rawId);
    };
    return Resource;
}());
exports.default = Resource;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceViewMixin_1 = __webpack_require__(9);
var ResourceDayGrid_1 = __webpack_require__(13);
var ResourceTimeGrid_1 = __webpack_require__(38);
var ResourceAgendaView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceAgendaView, _super);
    function ResourceAgendaView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.initResourceView();
        return _this;
    }
    return ResourceAgendaView;
}(fullcalendar_1.AgendaView));
exports.default = ResourceAgendaView;
ResourceAgendaView.prototype.timeGridClass = ResourceTimeGrid_1.default;
ResourceAgendaView.prototype.dayGridClass = ResourceDayGrid_1.default;
ResourceViewMixin_1.default.mixInto(ResourceAgendaView);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ResourceComponentFootprint_1 = __webpack_require__(6);
/*
Requirements:
- must be a Grid
- grid must have a view that's a ResourceView
- DayTableMixin must already be mixed in
*/
var ResourceDayTableMixin = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceDayTableMixin, _super);
    function ResourceDayTableMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceDayTableMixin.mixInto = function (destClass) {
        var _this = this;
        fullcalendar_1.Mixin.mixInto.call(this, destClass);
        [
            'updateDayTableCols',
            'computeColCnt',
            'getColDayIndex',
            'renderHeadTrHtml',
            'renderBgCellsHtml',
            'renderBusinessHours',
            'allowCrossResource'
        ].forEach(function (methodName) {
            destClass.prototype[methodName] = _this.prototype[methodName];
        });
    };
    // Resource Data
    // ----------------------------------------------------------------------------------------------
    // does not do any rendering. rendering is responsibility of host object
    ResourceDayTableMixin.prototype.registerResources = function (resources) {
        this.flattenedResources = this.flattenResources(resources);
        this.resourceCnt = this.flattenedResources.length;
        this.updateDayTable(); // will call computeColCnt
    };
    // flattens and sorts
    ResourceDayTableMixin.prototype.flattenResources = function (resources) {
        var sortFunc;
        var orderVal = this.opt('resourceOrder');
        if (orderVal) {
            var orderSpecs_1 = fullcalendar_1.parseFieldSpecs(orderVal);
            sortFunc = function (a, b) { return fullcalendar_1.compareByFieldSpecs(a, b, orderSpecs_1); };
        }
        else {
            sortFunc = null;
        }
        var res = [];
        this.accumulateResources(resources, sortFunc, res);
        return res;
    };
    // just flattens
    ResourceDayTableMixin.prototype.accumulateResources = function (resources, sortFunc, res) {
        var sortedResources;
        if (sortFunc) {
            sortedResources = resources.slice(0); // make copy
            sortedResources.sort(sortFunc); // sorts in place
        }
        else {
            sortedResources = resources;
        }
        for (var _i = 0, sortedResources_1 = sortedResources; _i < sortedResources_1.length; _i++) {
            var resource = sortedResources_1[_i];
            res.push(resource);
            this.accumulateResources(resource.children, sortFunc, res);
        }
    };
    // Table Layout
    // ----------------------------------------------------------------------------------------------
    ResourceDayTableMixin.prototype.updateDayTableCols = function () {
        this.datesAboveResources = this.opt('groupByDateAndResource');
        fullcalendar_1.DayTableMixin.prototype.updateDayTableCols.call(this);
    };
    ResourceDayTableMixin.prototype.computeColCnt = function () {
        return this.resourceCnt * this.daysPerRow;
    };
    ResourceDayTableMixin.prototype.getColDayIndex = function (col) {
        if (this.isRTL) {
            col = this.colCnt - 1 - col;
        }
        if (this.datesAboveResources) {
            return Math.floor(col / (this.resourceCnt || 1));
        }
        else {
            return col % this.daysPerRow;
        }
    };
    ResourceDayTableMixin.prototype.getColResource = function (col) {
        return this.flattenedResources[this.getColResourceIndex(col)];
    };
    ResourceDayTableMixin.prototype.getColResourceIndex = function (col) {
        if (this.isRTL) {
            col = this.colCnt - 1 - col;
        }
        if (this.datesAboveResources) {
            return col % (this.resourceCnt || 1);
        }
        else {
            return Math.floor(col / this.daysPerRow);
        }
    };
    ResourceDayTableMixin.prototype.indicesToCol = function (resourceIndex, dayIndex) {
        var col = this.datesAboveResources ?
            (dayIndex * (this.resourceCnt || 1)) + resourceIndex :
            (resourceIndex * this.daysPerRow) + dayIndex;
        if (this.isRTL) {
            col = this.colCnt - 1 - col;
        }
        return col;
    };
    // Header Rendering
    // ----------------------------------------------------------------------------------------------
    ResourceDayTableMixin.prototype.renderHeadTrHtml = function () {
        if (this.daysPerRow > 1) {
            // do two levels
            if (this.datesAboveResources) {
                return this.renderHeadDateAndResourceHtml();
            }
            else {
                return this.renderHeadResourceAndDateHtml();
            }
        }
        else {
            // do one level
            return this.renderHeadResourceHtml();
        }
    };
    // renders one row of resources header cell
    ResourceDayTableMixin.prototype.renderHeadResourceHtml = function () {
        var _this = this;
        var resourceHtmls = this.flattenedResources.map(function (resource) { return (_this.renderHeadResourceCellHtml(resource)); });
        if (!resourceHtmls.length) {
            resourceHtmls.push('<td>&nbsp;</td>');
        }
        return this.wrapTr(resourceHtmls, 'renderHeadIntroHtml');
    };
    // renders resource cells above date cells
    ResourceDayTableMixin.prototype.renderHeadResourceAndDateHtml = function () {
        var resourceHtmls = [];
        var dateHtmls = [];
        var daysPerRow = this.daysPerRow;
        for (var _i = 0, _a = this.flattenedResources; _i < _a.length; _i++) {
            var resource = _a[_i];
            resourceHtmls.push(this.renderHeadResourceCellHtml(resource, null, this.daysPerRow));
            for (var dayIndex = 0; dayIndex < daysPerRow; dayIndex++) {
                var date = this.dayDates[dayIndex].clone();
                dateHtmls.push(this.renderHeadResourceDateCellHtml(date, resource));
            }
        }
        if (!resourceHtmls.length) {
            resourceHtmls.push('<td>&nbsp;</td>');
        }
        if (!dateHtmls.length) {
            dateHtmls.push('<td>&nbsp;</td>');
        }
        return this.wrapTr(resourceHtmls, 'renderHeadIntroHtml') +
            this.wrapTr(dateHtmls, 'renderHeadIntroHtml');
    };
    // renders date cells above resource cells
    ResourceDayTableMixin.prototype.renderHeadDateAndResourceHtml = function () {
        var dateHtmls = [];
        var resourceHtmls = [];
        var daysPerRow = this.daysPerRow;
        for (var dayIndex = 0; dayIndex < daysPerRow; dayIndex++) {
            var date = this.dayDates[dayIndex].clone();
            dateHtmls.push(this.renderHeadDateCellHtml(date, this.resourceCnt) // with colspan
            );
            for (var _i = 0, _a = this.flattenedResources; _i < _a.length; _i++) {
                var resource = _a[_i];
                resourceHtmls.push(this.renderHeadResourceCellHtml(resource, date));
            }
        }
        if (!dateHtmls.length) {
            dateHtmls.push('<td>&nbsp;</td>');
        }
        if (!resourceHtmls.length) {
            resourceHtmls.push('<td>&nbsp;</td>');
        }
        return this.wrapTr(dateHtmls, 'renderHeadIntroHtml') +
            this.wrapTr(resourceHtmls, 'renderHeadIntroHtml');
    };
    // given a resource and an optional date
    ResourceDayTableMixin.prototype.renderHeadResourceCellHtml = function (resource, date, colspan) {
        if (colspan === void 0) { colspan = 1; }
        return '<th class="fc-resource-cell"' +
            ' data-resource-id="' + resource.id + '"' +
            (date ?
                ' data-date="' + date.format('YYYY-MM-DD') + '"' :
                '') +
            (colspan > 1 ?
                ' colspan="' + colspan + '"' :
                '') +
            '>' +
            fullcalendar_1.htmlEscape(this.view.getResourceText(resource)) +
            '</th>';
    };
    // given a date and a required resource
    ResourceDayTableMixin.prototype.renderHeadResourceDateCellHtml = function (date, resource, colspan) {
        if (colspan === void 0) { colspan = 1; }
        return this.renderHeadDateCellHtml(date, colspan, 'data-resource-id="' + resource.id + '"');
    };
    // given a container with already rendered resource cells
    ResourceDayTableMixin.prototype.processHeadResourceEls = function (containerEl) {
        var _this = this;
        containerEl.find('.fc-resource-cell').each(function (col, node) {
            var resource;
            if (_this.datesAboveResources) {
                // each resource <td> is a distinct column
                resource = _this.getColResource(col);
            }
            else {
                // each resource <td> covers multiple columns of dates
                resource = _this.flattenedResources[_this.isRTL ?
                    _this.flattenedResources.length - 1 - col :
                    col];
            }
            _this.publiclyTrigger('resourceRender', {
                context: resource,
                args: [
                    resource,
                    $(node),
                    $(),
                    _this.view
                ]
            });
        });
    };
    // Bg Rendering
    // ----------------------------------------------------------------------------------------------
    // TODO: unify with DayTableMixin more, instead of completely redefining
    ResourceDayTableMixin.prototype.renderBgCellsHtml = function (row) {
        var htmls = [];
        var colCnt = this.colCnt;
        for (var col = 0; col < colCnt; col++) {
            var date = this.getCellDate(row, col);
            var resource = this.getColResource(col);
            htmls.push(this.renderResourceBgCellHtml(date, resource));
        }
        if (!htmls.length) {
            htmls.push('<td>&nbsp;</td>');
        }
        return htmls.join(''); // already accounted for RTL
    };
    ResourceDayTableMixin.prototype.renderResourceBgCellHtml = function (date, resource) {
        return this.renderBgCellHtml(date, 'data-resource-id="' + resource.id + '"');
    };
    // Rendering Utils
    // ----------------------------------------------------------------------------------------------
    // only works for when given cells are ordered chronologically
    // mutates cellHtmls
    // TODO: make this a DayTableMixin utility
    ResourceDayTableMixin.prototype.wrapTr = function (cellHtmls, introMethodName) {
        if (this.isRTL) {
            cellHtmls.reverse();
            return '<tr>' +
                cellHtmls.join('') +
                this[introMethodName]() +
                '</tr>';
        }
        else {
            return '<tr>' +
                this[introMethodName]() +
                cellHtmls.join('') +
                '</tr>';
        }
    };
    // Business Hours
    // ----------------------------------------------------------------------------------------------
    ResourceDayTableMixin.prototype.renderBusinessHours = function (businessHourGenerator) {
        var isAllDay = this.hasAllDayBusinessHours;
        var unzonedRange = this.dateProfile.activeUnzonedRange;
        var eventFootprints = [];
        for (var _i = 0, _a = this.flattenedResources; _i < _a.length; _i++) {
            var resource = _a[_i];
            var eventInstanceGroup = (resource.businessHourGenerator || businessHourGenerator)
                .buildEventInstanceGroup(isAllDay, unzonedRange);
            if (eventInstanceGroup) {
                for (var _b = 0, _c = eventInstanceGroup.sliceRenderRanges(unzonedRange); _b < _c.length; _b++) {
                    var eventRange = _c[_b];
                    eventFootprints.push(new fullcalendar_1.EventFootprint(new ResourceComponentFootprint_1.default(eventRange.unzonedRange, isAllDay, resource.id), eventRange.eventDef, eventRange.eventInstance));
                }
            }
        }
        return this.businessHourRenderer.renderEventFootprints(eventFootprints);
    };
    return ResourceDayTableMixin;
}(fullcalendar_1.Mixin));
exports.default = ResourceDayTableMixin;
ResourceDayTableMixin.prototype.resourceCnt = 0;
ResourceDayTableMixin.prototype.datesAboveResources = false;
ResourceDayTableMixin.prototype.allowCrossResource = false;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceViewMixin_1 = __webpack_require__(9);
var ResourceDayGrid_1 = __webpack_require__(13);
var ResourceBasicView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceBasicView, _super);
    function ResourceBasicView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.initResourceView();
        return _this;
    }
    return ResourceBasicView;
}(fullcalendar_1.BasicView));
exports.default = ResourceBasicView;
ResourceBasicView.prototype.dayGridClass = ResourceDayGrid_1.default;
ResourceViewMixin_1.default.mixInto(ResourceBasicView);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var ResourceViewMixin_1 = __webpack_require__(9);
var ResourceDayGrid_1 = __webpack_require__(13);
var ResourceMonthView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceMonthView, _super);
    function ResourceMonthView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.initResourceView();
        return _this;
    }
    return ResourceMonthView;
}(fullcalendar_1.MonthView));
exports.default = ResourceMonthView;
ResourceMonthView.prototype.dayGridClass = ResourceDayGrid_1.default;
ResourceViewMixin_1.default.mixInto(ResourceMonthView);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var EnhancedScroller_1 = __webpack_require__(39);
/*
A Scroller, but with a wrapping div that allows "clipping" away of native scrollbars,
giving the appearance that there are no scrollbars.
*/
var ClippedScroller = /** @class */ (function (_super) {
    tslib_1.__extends(ClippedScroller, _super);
    /*
    Received overflows can be set to 'clipped', meaning scrollbars shouldn't be visible
    to the user, but the area should still scroll.
    */
    function ClippedScroller(options) {
        var _this = _super.call(this, options) || this;
        _this.isHScrollbarsClipped = false;
        _this.isVScrollbarsClipped = false;
        if (_this.overflowX === 'clipped-scroll') {
            _this.overflowX = 'scroll';
            _this.isHScrollbarsClipped = true;
        }
        if (_this.overflowY === 'clipped-scroll') {
            _this.overflowY = 'scroll';
            _this.isVScrollbarsClipped = true;
        }
        return _this;
    }
    ClippedScroller.prototype.renderEl = function () {
        var scrollEl = _super.prototype.renderEl.call(this);
        return $('<div class="fc-scroller-clip" />').append(scrollEl); // return value
    };
    ClippedScroller.prototype.updateSize = function () {
        var scrollEl = this.scrollEl;
        var scrollbarWidths = fullcalendar_1.getScrollbarWidths(scrollEl); // the native ones
        var cssProps = { marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0 };
        // give the inner scrolling div negative margins so that its scrollbars
        // are nudged outside of the bounding box of the wrapper, which is overflow:hidden
        if (this.isHScrollbarsClipped) {
            cssProps.marginTop = -scrollbarWidths.top;
            cssProps.marginBottom = -scrollbarWidths.bottom;
        }
        if (this.isVScrollbarsClipped) {
            cssProps.marginLeft = -scrollbarWidths.left;
            cssProps.marginRight = -scrollbarWidths.right;
        }
        scrollEl.css(cssProps);
        // if we are attempting to hide the scrollbars offscreen, OSX/iOS will still
        // display the floating scrollbars. attach a className to force-hide them.
        return scrollEl.toggleClass('fc-no-scrollbars', (this.isHScrollbarsClipped || (this.overflowX === 'hidden')) && // should never show?
            (this.isVScrollbarsClipped || (this.overflowY === 'hidden')) && // should never show?
            !(scrollbarWidths.top ||
                scrollbarWidths.bottom ||
                scrollbarWidths.left ||
                scrollbarWidths.right));
    };
    /*
    Accounts for 'clipped' scrollbars
    */
    ClippedScroller.prototype.getScrollbarWidths = function () {
        var widths = fullcalendar_1.getScrollbarWidths(this.scrollEl);
        if (this.isHScrollbarsClipped) {
            widths.top = 0;
            widths.bottom = 0;
        }
        if (this.isVScrollbarsClipped) {
            widths.left = 0;
            widths.right = 0;
        }
        return widths;
    };
    return ClippedScroller;
}(EnhancedScroller_1.default));
exports.default = ClippedScroller;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
/*
A rectangular area of content that lives within a Scroller.
Can have "gutters", areas of dead spacing around the perimeter.
Also very useful for forcing a width, which a Scroller cannot do alone.
Has a content area that lives above a background area.
*/
var ScrollerCanvas = /** @class */ (function () {
    function ScrollerCanvas() {
        this.gutters = {};
    }
    ScrollerCanvas.prototype.render = function () {
        this.el = $("<div class=\"fc-scroller-canvas\"> <div class=\"fc-content\"></div> <div class=\"fc-bg\"></div> </div>");
        this.contentEl = this.el.find('.fc-content');
        this.bgEl = this.el.find('.fc-bg');
    };
    /*
    If falsy, resets all the gutters to 0
    */
    ScrollerCanvas.prototype.setGutters = function (gutters) {
        if (!gutters) {
            this.gutters = {};
        }
        else {
            $.extend(this.gutters, gutters);
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
        var gutters = this.gutters;
        this.el // is border-box (width includes padding)
            .toggleClass('fc-gutter-left', Boolean(gutters.left))
            .toggleClass('fc-gutter-right', Boolean(gutters.right))
            .toggleClass('fc-gutter-top', Boolean(gutters.top))
            .toggleClass('fc-gutter-bottom', Boolean(gutters.bottom))
            .css({
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
        this.bgEl.css({
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ScrollFollowerSprite_1 = __webpack_require__(27);
var ScrollFollower = /** @class */ (function () {
    function ScrollFollower(scroller, allowPointerEvents) {
        if (allowPointerEvents === void 0) { allowPointerEvents = false; }
        var _this = this;
        this.isHFollowing = true;
        this.isVFollowing = false;
        this.allowPointerEvents = false;
        this.containOnNaturalLeft = false;
        this.containOnNaturalRight = false;
        this.minTravel = 0;
        this.allowPointerEvents = allowPointerEvents;
        this.scroller = scroller;
        this.spritesById = {};
        scroller.on('scroll', function () {
            if (scroller.isTouchedEver) {
                // touch devices should only updated after the scroll is over
                _this.isTouch = true;
                _this.isForcedRelative = true; // touch devices scroll too quick to make absolute ever look good
            }
            else {
                _this.isTouch = false;
                // this.isForcedRelative = false // why?
                _this.handleScroll();
            }
        });
        // for touch devices
        scroller.on('scrollEnd', function () {
            _this.handleScroll();
        });
    }
    // TODO: have a destroy method.
    // View's whose skeletons get destroyed should unregister their scrollfollowers.
    /*
    `els` is as a jQuery set of elements.
    If elements are already position:relative, is a performance benefit.
    */
    ScrollFollower.prototype.setSpriteEls = function (els) {
        var _this = this;
        this.clearSprites();
        els.each(function (i, node) {
            _this.addSprite(new ScrollFollowerSprite_1.default($(node)));
        });
    };
    ScrollFollower.prototype.clearSprites = function () {
        this.iterSprites(function (sprite) { return sprite.clear(); });
        this.spritesById = {};
    };
    ScrollFollower.prototype.addSprite = function (sprite) {
        sprite.follower = this;
        this.spritesById[sprite.id] = sprite;
    };
    ScrollFollower.prototype.removeSprite = function (sprite) {
        sprite.clear();
        delete this.spritesById[sprite.id];
    };
    ScrollFollower.prototype.handleScroll = function () {
        this.updateViewport();
        this.updatePositions();
    };
    ScrollFollower.prototype.cacheDimensions = function () {
        this.updateViewport();
        this.scrollbarWidths = this.scroller.getScrollbarWidths();
        this.contentOffset = this.scroller.canvas.el.offset();
        this.iterSprites(function (sprite) { return sprite.cacheDimensions(); });
    };
    ScrollFollower.prototype.updateViewport = function () {
        var scroller = this.scroller;
        var left = scroller.getScrollFromLeft();
        var top = scroller.getScrollTop();
        // TODO: use getViewportRect() for getting this rect
        return this.viewportRect = {
            left: left,
            right: left + scroller.getClientWidth(),
            top: top,
            bottom: top + scroller.getClientHeight()
        };
    };
    ScrollFollower.prototype.forceRelative = function () {
        if (!this.isForcedRelative) {
            this.isForcedRelative = true;
            this.iterSprites(function (sprite) {
                if (sprite.doAbsolute) {
                    return sprite.assignPosition();
                }
            });
        }
    };
    ScrollFollower.prototype.clearForce = function () {
        if (this.isForcedRelative && !this.isTouch) {
            this.isForcedRelative = false;
            this.iterSprites(function (sprite) { return sprite.assignPosition(); });
        }
    };
    ScrollFollower.prototype.update = function () {
        this.cacheDimensions();
        this.updatePositions();
    };
    ScrollFollower.prototype.updatePositions = function () {
        this.iterSprites(function (sprite) { return sprite.updatePosition(); });
    };
    // relative to inner content pane
    ScrollFollower.prototype.getContentRect = function (el) {
        return fullcalendar_1.getContentRect(el, this.contentOffset);
    };
    // relative to inner content pane
    ScrollFollower.prototype.getBoundingRect = function (el) {
        return fullcalendar_1.getOuterRect(el, this.contentOffset);
    };
    ScrollFollower.prototype.iterSprites = function (func) {
        for (var id in this.spritesById) {
            var sprite = this.spritesById[id];
            func(sprite, id);
        }
    };
    return ScrollFollower;
}());
exports.default = ScrollFollower;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ScrollFollowerSprite = /** @class */ (function () {
    /*
    If given el is already position:relative, is a performance gain
    */
    function ScrollFollowerSprite(el) {
        this.isEnabled = true;
        this.isHFollowing = false;
        this.isVFollowing = false;
        this.doAbsolute = false;
        this.isAbsolute = false;
        this.isCentered = false;
        this.isBlock = false;
        this.el = el;
        this.id = String(ScrollFollowerSprite.uid++);
        this.isBlock = this.el.css('display') === 'block';
        if (this.el.css('position') !== 'relative') {
            this.el.css('position', 'relative');
        }
    }
    ScrollFollowerSprite.prototype.disable = function () {
        if (this.isEnabled) {
            this.isEnabled = false;
            this.resetPosition();
            this.unabsolutize();
        }
    };
    ScrollFollowerSprite.prototype.enable = function () {
        if (!this.isEnabled) {
            this.isEnabled = true;
            this.assignPosition();
        }
    };
    ScrollFollowerSprite.prototype.clear = function () {
        this.disable();
        this.follower = null;
        this.absoluteEl = null;
    };
    ScrollFollowerSprite.prototype.cacheDimensions = function () {
        var isHFollowing = false;
        var isVFollowing = false;
        var isCentered = false;
        this.naturalWidth = this.el.width();
        this.resetPosition();
        var follower = this.follower;
        var naturalRect = (this.naturalRect = follower.getBoundingRect(this.el));
        var parentEl = this.el.parent();
        this.parentRect = follower.getBoundingRect(parentEl);
        var containerRect = (this.containerRect = joinRects(follower.getContentRect(parentEl), naturalRect));
        var minTravel = follower.minTravel;
        if (follower.containOnNaturalLeft) {
            containerRect.left = naturalRect.left;
        }
        if (follower.containOnNaturalRight) {
            containerRect.right = naturalRect.right;
        }
        if (follower.isHFollowing) {
            if ((getRectWidth(containerRect) - getRectWidth(naturalRect)) >= minTravel) {
                isCentered = this.el.css('text-align') === 'center';
                isHFollowing = true;
            }
        }
        if (follower.isVFollowing) {
            if ((getRectHeight(containerRect) - getRectHeight(naturalRect)) >= minTravel) {
                isVFollowing = true;
            }
        }
        this.isHFollowing = isHFollowing;
        this.isVFollowing = isVFollowing;
        this.isCentered = isCentered;
    };
    ScrollFollowerSprite.prototype.updatePosition = function () {
        this.computePosition();
        this.assignPosition();
    };
    ScrollFollowerSprite.prototype.resetPosition = function () {
        this.el.css({
            top: '',
            left: ''
        });
    };
    ScrollFollowerSprite.prototype.computePosition = function () {
        var viewportRect = this.follower.viewportRect;
        var parentRect = this.parentRect;
        var containerRect = this.containerRect;
        var visibleParentRect = fullcalendar_1.intersectRects(viewportRect, parentRect);
        var rect = null;
        var doAbsolute = false;
        if (visibleParentRect) {
            rect = copyRect(this.naturalRect);
            var subjectRect = fullcalendar_1.intersectRects(rect, parentRect);
            // will we need to reposition?
            if ((this.isCentered && !testRectContains(viewportRect, parentRect)) || // centering and container not completely in view?
                (subjectRect && !testRectContains(viewportRect, subjectRect))) {
                doAbsolute = true;
                if (this.isHFollowing) {
                    if (this.isCentered) {
                        var rectWidth = getRectWidth(rect);
                        rect.left = ((visibleParentRect.left + visibleParentRect.right) / 2) - (rectWidth / 2);
                        rect.right = rect.left + rectWidth;
                    }
                    else {
                        if (!hContainRect(rect, viewportRect)) {
                            doAbsolute = false;
                        }
                    }
                    if (hContainRect(rect, containerRect)) {
                        doAbsolute = false;
                    }
                }
                if (this.isVFollowing) {
                    if (!vContainRect(rect, viewportRect)) {
                        doAbsolute = false;
                    }
                    if (vContainRect(rect, containerRect)) {
                        doAbsolute = false;
                    }
                }
                if (!testRectContains(viewportRect, rect)) {
                    doAbsolute = false;
                }
            }
        }
        this.rect = rect;
        this.doAbsolute = doAbsolute;
    };
    ScrollFollowerSprite.prototype.assignPosition = function () {
        if (this.isEnabled) {
            if (!this.rect) {
                this.unabsolutize();
            }
            else if (this.doAbsolute && !this.follower.isForcedRelative) {
                this.absolutize();
                this.absoluteEl.css({
                    top: (this.rect.top - this.follower.viewportRect.top) + this.follower.scrollbarWidths.top,
                    left: (this.rect.left - this.follower.viewportRect.left) + this.follower.scrollbarWidths.left,
                    width: this.isBlock ? this.naturalWidth : ''
                });
            }
            else {
                var top_1 = this.rect.top - this.naturalRect.top;
                var left = this.rect.left - this.naturalRect.left;
                this.unabsolutize();
                this.el.toggleClass('fc-following', Boolean(top_1 || left))
                    .css({
                    top: top_1,
                    left: left
                });
            }
        }
    };
    ScrollFollowerSprite.prototype.absolutize = function () {
        if (!this.isAbsolute) {
            if (!this.absoluteEl) {
                this.absoluteEl = this.buildAbsoluteEl();
            }
            this.absoluteEl.appendTo(this.follower.scroller.el);
            this.el.css('visibility', 'hidden');
            this.isAbsolute = true;
        }
    };
    ScrollFollowerSprite.prototype.unabsolutize = function () {
        if (this.isAbsolute) {
            this.absoluteEl.detach();
            this.el.css('visibility', '');
            this.isAbsolute = false;
        }
    };
    ScrollFollowerSprite.prototype.buildAbsoluteEl = function () {
        var el = this.el.clone().addClass('fc-following');
        el.css({
            'position': 'absolute',
            'z-index': 1000,
            'font-weight': this.el.css('font-weight'),
            'font-size': this.el.css('font-size'),
            'font-family': this.el.css('font-family'),
            'text-decoration': this.el.css('text-decoration'),
            'color': this.el.css('color'),
            'padding-top': this.el.css('padding-top'),
            'padding-bottom': this.el.css('padding-bottom'),
            'padding-left': this.el.css('padding-left'),
            'padding-right': this.el.css('padding-right')
        });
        if (!this.follower.allowPointerEvents) {
            el.css('pointer-events', 'none');
        }
        return el;
    };
    ScrollFollowerSprite.uid = 0;
    return ScrollFollowerSprite;
}());
exports.default = ScrollFollowerSprite;
// Geometry Utils
// ----------------------------------------------------------------------------------------------------------------------
// TODO: move somewhere more common
function copyRect(rect) {
    return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom
    };
}
function getRectWidth(rect) {
    return rect.right - rect.left;
}
function getRectHeight(rect) {
    return rect.bottom - rect.top;
}
function testRectContains(rect, innerRect) {
    return testRectHContains(rect, innerRect) && testRectVContains(rect, innerRect);
}
function testRectHContains(rect, innerRect) {
    return (innerRect.left >= rect.left) && (innerRect.right <= rect.right);
}
function testRectVContains(rect, innerRect) {
    return (innerRect.top >= rect.top) && (innerRect.bottom <= rect.bottom);
}
function hContainRect(rect, outerRect) {
    if (rect.left < outerRect.left) {
        rect.right = outerRect.left + getRectWidth(rect);
        rect.left = outerRect.left;
        return true;
    }
    else if (rect.right > outerRect.right) {
        rect.left = outerRect.right - getRectWidth(rect);
        rect.right = outerRect.right;
        return true;
    }
    else {
        return false;
    }
}
function vContainRect(rect, outerRect) {
    if (rect.top < outerRect.top) {
        rect.bottom = outerRect.top + getRectHeight(rect);
        rect.top = outerRect.top;
        return true;
    }
    else if (rect.bottom > outerRect.bottom) {
        rect.top = outerRect.bottom - getRectHeight(rect);
        rect.bottom = outerRect.bottom;
        return true;
    }
    else {
        return false;
    }
}
function joinRects(rect1, rect2) {
    return {
        left: Math.min(rect1.left, rect2.left),
        right: Math.max(rect1.right, rect2.right),
        top: Math.min(rect1.top, rect2.top),
        bottom: Math.max(rect1.bottom, rect2.bottom)
    };
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var TimelineFillRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineFillRenderer, _super);
    function TimelineFillRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    component must be { bgSegContainerEl, rangeToCoords }
    */
    TimelineFillRenderer.prototype.attachSegEls = function (type, segs) {
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
            var containerEl = $('<div class="fc-' + className + '-container" />')
                .appendTo(this.component.bgSegContainerEl);
            for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
                var seg = segs_1[_i];
                var coords = this.component.rangeToCoords(seg); // TODO: make DRY
                seg.el.css({
                    left: (seg.left = coords.left),
                    right: -(seg.right = coords.right)
                });
                seg.el.appendTo(containerEl);
            }
            return containerEl; // return value
        }
    };
    return TimelineFillRenderer;
}(fullcalendar_1.FillRenderer));
exports.default = TimelineFillRenderer;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var TimelineHelperRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineHelperRenderer, _super);
    function TimelineHelperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    component must be { innerEl, rangeToCoords, ?resource }
    */
    TimelineHelperRenderer.prototype.renderSegs = function (segs, sourceSeg) {
        var helperNodes = []; // .fc-event-container
        for (var _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            var seg = segs_1[_i];
            // TODO: centralize logic (also in renderFgSegsInContainers)
            var coords = this.component.rangeToCoords(seg);
            seg.el.css({
                left: (seg.left = coords.left),
                right: -(seg.right = coords.right)
            });
            // TODO: detangle the concept of resources
            // TODO: how to identify these two segs as the same!?
            if (sourceSeg && (sourceSeg.resourceId === (this.component.resource != null ? this.component.resource.id : undefined))) {
                seg.el.css('top', sourceSeg.el.css('top'));
            }
            else {
                seg.el.css('top', 0);
            }
        }
        var helperContainerEl = $('<div class="fc-event-container fc-helper-container"/>')
            .appendTo(this.component.innerEl);
        helperNodes.push(helperContainerEl[0]);
        for (var _a = 0, segs_2 = segs; _a < segs_2.length; _a++) {
            var seg = segs_2[_a];
            helperContainerEl.append(seg.el);
        }
        return $(helperNodes); // return value. TODO: need to accumulate across calls?
    };
    return TimelineHelperRenderer;
}(fullcalendar_1.HelperRenderer));
exports.default = TimelineHelperRenderer;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ScrollJoiner_1 = __webpack_require__(16);
var ResourceComponentFootprint_1 = __webpack_require__(6);
var ResourceViewMixin_1 = __webpack_require__(9);
var TimelineView_1 = __webpack_require__(14);
var Spreadsheet_1 = __webpack_require__(43);
var ResourceTimelineEventRenderer_1 = __webpack_require__(45);
var RowParent_1 = __webpack_require__(18);
var ResourceRow_1 = __webpack_require__(46);
var HRowGroup_1 = __webpack_require__(47);
var VRowGroup_1 = __webpack_require__(31);
var EventRow_1 = __webpack_require__(33);
var ResourceTimelineView = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTimelineView, _super);
    function ResourceTimelineView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.canHandleSpecificResources = true;
        _this.isResourceFootprintsEnabled = true;
        _this.nestingCnt = 0;
        _this.indiBizCnt = 0;
        _this.isIndiBizRendered = false;
        _this.isGenericBizRendered = false;
        _this.initResourceView();
        _this.processResourceOptions();
        _this.spreadsheet = new Spreadsheet_1.default(_this);
        _this.rowHierarchy = new RowParent_1.default(_this);
        _this.rowHierarchy.isExpanded = true; // hack to always show, regardless of resourcesInitiallyExpanded
        _this.resourceRowHash = {};
        return _this;
    }
    // Resource Options
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.processResourceOptions = function () {
        var allColSpecs = this.opt('resourceColumns') || [];
        var labelText = this.opt('resourceLabelText'); // TODO: view.override
        var defaultLabelText = 'Resources'; // TODO: view.defaults
        var superHeaderText = null;
        if (!allColSpecs.length) {
            allColSpecs.push({
                labelText: labelText || defaultLabelText,
                text: this.getResourceTextFunc()
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
            var hGroupField = this.opt('resourceGroupField');
            if (hGroupField) {
                isHGrouping = true;
                groupSpecs.push({
                    field: hGroupField,
                    text: this.opt('resourceGroupText'),
                    render: this.opt('resourceGroupRender')
                });
            }
        }
        var allOrderSpecs = fullcalendar_1.parseFieldSpecs(this.opt('resourceOrder'));
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
        this.superHeaderText = superHeaderText;
        this.isVGrouping = isVGrouping;
        this.isHGrouping = isHGrouping;
        this.groupSpecs = groupSpecs;
        this.colSpecs = groupColSpecs.concat(plainColSpecs);
        this.orderSpecs = plainOrderSpecs;
    };
    // Skeleton Rendering
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.renderSkeleton = function () {
        _super.prototype.renderSkeleton.call(this);
        var theme = this.calendar.theme;
        this.spreadsheet.el = this.el.find('tbody .fc-resource-area');
        this.spreadsheet.headEl = this.el.find('thead .fc-resource-area');
        this.spreadsheet.renderSkeleton();
        // ^ is not a Grid/DateComponent
        // only non-resource grid needs this, so kill it
        // TODO: look into better solution
        this.segContainerEl.remove();
        this.segContainerEl = null;
        var timeBodyContainerEl = $("<div class=\"fc-rows\"> <table class=\"" + theme.getClass('tableGrid') + "\"> <tbody/> </table> </div>").appendTo(this.timeBodyScroller.canvas.contentEl);
        this.timeBodyTbodyEl = timeBodyContainerEl.find('tbody');
        this.tbodyHash = {
            spreadsheet: this.spreadsheet.tbodyEl,
            event: this.timeBodyTbodyEl
        };
        this.resourceScrollJoiner = new ScrollJoiner_1.default('vertical', [
            this.spreadsheet.bodyScroller,
            this.timeBodyScroller
        ]);
        this.initDividerMoving();
    };
    ResourceTimelineView.prototype.renderSkeletonHtml = function () {
        var theme = this.calendar.theme;
        return "<table class=\"" + theme.getClass('tableGrid') + "\"> <thead class=\"fc-head\"> <tr> <td class=\"fc-resource-area " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-divider fc-col-resizer " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-time-area " + theme.getClass('widgetHeader') + "\"></td> </tr> </thead> <tbody class=\"fc-body\"> <tr> <td class=\"fc-resource-area " + theme.getClass('widgetContent') + "\"></td> <td class=\"fc-divider fc-col-resizer " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-time-area " + theme.getClass('widgetContent') + "\"></td> </tr> </tbody> </table>";
    };
    // Divider Moving
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.initDividerMoving = function () {
        var _this = this;
        var left = this.opt('resourceAreaWidth');
        this.dividerEls = this.el.find('.fc-divider');
        // tableWidth available after spreadsheet.renderSkeleton
        this.dividerWidth = left != null ? left : this.spreadsheet.tableWidth;
        if (this.dividerWidth != null) {
            this.positionDivider(this.dividerWidth);
        }
        this.dividerEls.on('mousedown', function (ev) {
            _this.dividerMousedown(ev);
        });
    };
    ResourceTimelineView.prototype.dividerMousedown = function (ev) {
        var _this = this;
        var isRTL = this.opt('isRTL');
        var minWidth = 30;
        var maxWidth = this.el.width() - 30;
        var origWidth = this.getNaturalDividerWidth();
        var dragListener = new fullcalendar_1.DragListener({
            dragStart: function () {
                _this.dividerEls.addClass('fc-active');
            },
            drag: function (dx, dy) {
                var width;
                if (isRTL) {
                    width = origWidth - dx;
                }
                else {
                    width = origWidth + dx;
                }
                width = Math.max(width, minWidth);
                width = Math.min(width, maxWidth);
                _this.dividerWidth = width;
                _this.positionDivider(width);
                _this.calendar.updateViewSize();
            },
            dragEnd: function () {
                _this.dividerEls.removeClass('fc-active');
            }
        });
        dragListener.startInteraction(ev);
    };
    ResourceTimelineView.prototype.getNaturalDividerWidth = function () {
        return this.el.find('.fc-resource-area').width(); // TODO: don't we have this cached?
    };
    ResourceTimelineView.prototype.positionDivider = function (w) {
        this.el.find('.fc-resource-area').css('width', w); // TODO: don't we have this cached?
    };
    // Sizing
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.updateSize = function (totalHeight, isAuto, isResize) {
        var bodyHeight;
        if (this.rowsNeedingHeightSync) {
            this.syncRowHeights(this.rowsNeedingHeightSync);
            this.rowsNeedingHeightSync = null;
        }
        else {
            this.syncRowHeights(); // sync all
        }
        var headHeight = this.syncHeadHeights();
        if (isAuto) {
            bodyHeight = 'auto';
        }
        else {
            bodyHeight = totalHeight - headHeight - this.queryMiscHeight();
        }
        this.timeBodyScroller.setHeight(bodyHeight);
        this.spreadsheet.bodyScroller.setHeight(bodyHeight);
        this.spreadsheet.updateSize();
        // do children AFTER because of ScrollFollowerSprite abs position issues
        _super.prototype.updateSize.call(this, totalHeight, isAuto, isResize);
        // do once spreadsheet area and event slat area have correct height, for gutters
        this.resourceScrollJoiner.update();
    };
    ResourceTimelineView.prototype.queryMiscHeight = function () {
        return this.el.outerHeight() -
            Math.max(this.spreadsheet.headScroller.el.outerHeight(), this.timeHeadScroller.el.outerHeight()) -
            Math.max(this.spreadsheet.bodyScroller.el.outerHeight(), this.timeBodyScroller.el.outerHeight());
    };
    ResourceTimelineView.prototype.syncHeadHeights = function () {
        this.spreadsheet.headHeight('auto');
        this.headHeight('auto');
        var headHeight = Math.max(this.spreadsheet.headHeight(), this.headHeight());
        this.spreadsheet.headHeight(headHeight);
        this.headHeight(headHeight);
        return headHeight;
    };
    // Scrolling
    // ------------------------------------------------------------------------------------------------------------------
    // this is useful for scrolling prev/next dates while resource is scrolled down
    ResourceTimelineView.prototype.queryResourceScroll = function () {
        var scroll = {};
        var scrollerTop = this.timeBodyScroller.scrollEl.offset().top; // TODO: use getClientRect
        for (var _i = 0, _a = this.getVisibleRows(); _i < _a.length; _i++) {
            var rowObj = _a[_i];
            if (rowObj.resource) {
                var el = rowObj.getTr('event');
                var elBottom = el.offset().top + el.outerHeight();
                if (elBottom > scrollerTop) {
                    scroll.resourceId = rowObj.resource.id;
                    scroll.bottom = elBottom - scrollerTop;
                    break;
                }
            }
        }
        // TODO: what about left scroll state for spreadsheet area?
        return scroll;
    };
    ResourceTimelineView.prototype.applyResourceScroll = function (scroll) {
        if (scroll.resourceId) {
            var row = this.getResourceRow(scroll.resourceId);
            if (row) {
                var el = row.getTr('event');
                if (el) {
                    var innerTop = this.timeBodyScroller.canvas.el.offset().top; // TODO: use -scrollHeight or something
                    var elBottom = el.offset().top + el.outerHeight();
                    var scrollTop = elBottom - scroll.bottom - innerTop;
                    this.timeBodyScroller.setScrollTop(scrollTop);
                    this.spreadsheet.bodyScroller.setScrollTop(scrollTop);
                }
            }
        }
    };
    ResourceTimelineView.prototype.scrollToResource = function (resource) {
        var row = this.getResourceRow(resource.id);
        if (row) {
            var el = row.getTr('event');
            if (el) {
                var innerTop = this.timeBodyScroller.canvas.el.offset().top; // TODO: use -scrollHeight or something
                var scrollTop = el.offset().top - innerTop;
                this.timeBodyScroller.setScrollTop(scrollTop);
                this.spreadsheet.bodyScroller.setScrollTop(scrollTop);
            }
        }
    };
    // Hit System
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.prepareHits = function () {
        var shownEventRows = [];
        _super.prototype.prepareHits.call(this);
        this.eventRows = this.getEventRows();
        this.eventRows.forEach(function (row) {
            if (row.get('isInDom')) {
                shownEventRows.push(row);
            }
        });
        var trArray = shownEventRows.map(function (row) { return (row.getTr('event')[0]); });
        this.shownEventRows = shownEventRows;
        this.rowCoordCache = new fullcalendar_1.CoordCache({
            els: trArray,
            isVertical: true
        });
        this.rowCoordCache.build();
    };
    ResourceTimelineView.prototype.releaseHits = function () {
        _super.prototype.releaseHits.call(this);
        this.eventRows = null;
        this.shownEventRows = null;
        this.rowCoordCache.clear();
    };
    ResourceTimelineView.prototype.queryHit = function (leftOffset, topOffset) {
        var simpleHit = _super.prototype.queryHit.call(this, leftOffset, topOffset);
        if (simpleHit) {
            var rowIndex = this.rowCoordCache.getVerticalIndex(topOffset);
            if (rowIndex != null) {
                return {
                    resourceId: this.shownEventRows[rowIndex].resource.id,
                    snap: simpleHit.snap,
                    component: this,
                    left: simpleHit.left,
                    right: simpleHit.right,
                    top: this.rowCoordCache.getTopOffset(rowIndex),
                    bottom: this.rowCoordCache.getBottomOffset(rowIndex)
                };
            }
        }
    };
    ResourceTimelineView.prototype.getHitFootprint = function (hit) {
        var componentFootprint = _super.prototype.getHitFootprint.call(this, hit);
        return new ResourceComponentFootprint_1.default(componentFootprint.unzonedRange, componentFootprint.isAllDay, hit.resourceId);
    };
    ResourceTimelineView.prototype.getHitEl = function (hit) {
        return this.getSnapEl(hit.snap);
    };
    // Resource Data
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.renderResources = function (resources) {
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            this.renderResource(resource);
        }
    };
    ResourceTimelineView.prototype.unrenderResources = function () {
        this.rowHierarchy.removeElement();
        this.rowHierarchy.removeChildren();
        for (var id in this.resourceRowHash) {
            this.removeChild(this.resourceRowHash[id]); // for DateComponent!
        }
        this.resourceRowHash = {};
    };
    ResourceTimelineView.prototype.renderResource = function (resource) {
        this.insertResource(resource);
    };
    ResourceTimelineView.prototype.unrenderResource = function (resource) {
        this.removeResource(resource);
    };
    // Event Rendering
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.executeEventRender = function (eventsPayload) {
        var payloadsByResourceId = {};
        var genericPayload = {};
        var resourceId;
        for (var eventDefId in eventsPayload) {
            var eventInstanceGroup = eventsPayload[eventDefId];
            var eventDef = eventInstanceGroup.getEventDef();
            var resourceIds = eventDef.getResourceIds();
            if (resourceIds.length) {
                for (var _i = 0, resourceIds_1 = resourceIds; _i < resourceIds_1.length; _i++) {
                    resourceId = resourceIds_1[_i];
                    var bucket = payloadsByResourceId[resourceId] || (payloadsByResourceId[resourceId] = {});
                    bucket[eventDefId] = eventInstanceGroup;
                }
                // only render bg segs that have no resources
            }
            else if (eventDef.hasBgRendering()) {
                genericPayload[eventDefId] = eventInstanceGroup;
            }
        }
        this.eventRenderer.render(genericPayload);
        for (resourceId in payloadsByResourceId) {
            var resourceEventsPayload = payloadsByResourceId[resourceId];
            var row = this.getResourceRow(resourceId);
            if (row) {
                row.executeEventRender(resourceEventsPayload);
            }
        }
    };
    // Business Hours Rendering
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.renderBusinessHours = function (businessHourGenerator) {
        this.genericBiz = businessHourGenerator; // save for later
        this.isIndiBizRendered = false;
        this.isGenericBizRendered = false;
        if (this.indiBizCnt) {
            this.isIndiBizRendered = true;
            for (var _i = 0, _a = this.getEventRows(); _i < _a.length; _i++) {
                var row = _a[_i];
                row.renderBusinessHours(row.resource.businessHourGenerator || businessHourGenerator);
            }
        }
        else {
            this.isGenericBizRendered = true;
            this.businessHourRenderer.render(businessHourGenerator);
        }
    };
    ResourceTimelineView.prototype.updateIndiBiz = function () {
        if ((this.indiBizCnt && this.isGenericBizRendered) ||
            (!this.indiBizCnt && this.isIndiBizRendered)) {
            this.unrenderBusinessHours();
            this.renderBusinessHours(this.genericBiz);
        }
    };
    // Row Management
    // ------------------------------------------------------------------------------------------------------------------
    // creates a row for the given resource and inserts it into the hierarchy.
    // if `parentResourceRow` is given, inserts it as a direct child
    // does not render
    ResourceTimelineView.prototype.insertResource = function (resource, parentResourceRow) {
        var noExplicitParent = !parentResourceRow;
        var row = new ResourceRow_1.default(this, resource);
        if (!parentResourceRow) {
            if (resource.parent) {
                parentResourceRow = this.getResourceRow(resource.parent.id);
            }
            else if (resource.parentId) {
                parentResourceRow = this.getResourceRow(resource.parentId);
            }
        }
        if (parentResourceRow) {
            this.insertRowAsChild(row, parentResourceRow);
        }
        else {
            this.insertRow(row);
        }
        this.addChild(row); // for DateComponent!
        this.resourceRowHash[resource.id] = row;
        if (resource.businessHourGenerator) {
            this.indiBizCnt++;
            // hack to get dynamically-added resources with custom business hours to render
            if (this.isIndiBizRendered) {
                row.businessHourGenerator = resource.businessHourGenerator;
            }
            this.updateIndiBiz();
        }
        for (var _i = 0, _a = resource.children; _i < _a.length; _i++) {
            var childResource = _a[_i];
            this.insertResource(childResource, row);
        }
        if (noExplicitParent && computeIsChildrenVisible(row.parent)) {
            row.renderSkeleton();
        }
        return row;
    };
    // does not unrender
    ResourceTimelineView.prototype.removeResource = function (resource) {
        var row = this.resourceRowHash[resource.id];
        if (row) {
            delete this.resourceRowHash[resource.id];
            this.removeChild(row); // for DateComponent!
            row.removeFromParentAndDom();
            if (resource.businessHourGenerator) {
                this.indiBizCnt--;
                this.updateIndiBiz();
            }
        }
        return row;
    };
    // inserts the given row into the hierarchy.
    // `parent` can be any tree root of the hierarchy.
    // `orderSpecs` will recursively create groups within the root before inserting the row.
    ResourceTimelineView.prototype.insertRow = function (row, parent, groupSpecs) {
        if (parent === void 0) { parent = this.rowHierarchy; }
        if (groupSpecs === void 0) { groupSpecs = this.groupSpecs; }
        if (groupSpecs.length) {
            var group = this.ensureResourceGroup(row, parent, groupSpecs[0]);
            if (group instanceof HRowGroup_1.default) {
                this.insertRowAsChild(row, group); // horizontal rows can only be one level deep
            }
            else {
                this.insertRow(row, group, groupSpecs.slice(1));
            }
        }
        else {
            this.insertRowAsChild(row, parent);
        }
    };
    // inserts the given row as a direct child of the given parent
    ResourceTimelineView.prototype.insertRowAsChild = function (row, parent) {
        return parent.addChildRowNode(row, this.computeChildRowPosition(row, parent));
    };
    // computes the position at which the given node should be inserted into the parent's children
    // if no specific position is determined, returns null
    ResourceTimelineView.prototype.computeChildRowPosition = function (child, parent) {
        if (this.orderSpecs.length) {
            for (var i = 0; i < parent.children.length; i++) {
                var sibling = parent.children[i];
                var cmp = this.compareResources(sibling.resource || {}, child.resource || {});
                if (cmp > 0) {
                    return i;
                }
            }
        }
        return null;
    };
    // given two resources, returns a cmp value (-1, 0, 1)
    ResourceTimelineView.prototype.compareResources = function (a, b) {
        return fullcalendar_1.compareByFieldSpecs(a, b, this.orderSpecs);
    };
    // given information on how a row should be inserted into one of the parent's child groups,
    // ensure a child group exists, creating it if necessary, and then return it.
    // spec MIGHT NOT HAVE AN ORDER
    ResourceTimelineView.prototype.ensureResourceGroup = function (row, parent, spec) {
        var i;
        var testGroup;
        var groupValue = (row.resource || {})[spec.field]; // the groupValue of the row
        var group = null;
        // find an existing group that matches, or determine the position for a new group
        if (spec.order) {
            for (i = 0; i < parent.children.length; i++) {
                testGroup = parent.children[i];
                var cmp = fullcalendar_1.flexibleCompare(testGroup.groupValue, groupValue) * spec.order;
                if (cmp === 0) {
                    group = testGroup;
                    break;
                }
                else if (cmp > 0) {
                    break;
                }
            }
        }
        else {
            for (i = 0; i < parent.children.length; i++) {
                testGroup = parent.children[i];
                if (testGroup.groupValue === groupValue) {
                    group = testGroup;
                    break;
                }
            }
        } // `i` will be at the end if group was not found
        // create a new group
        if (!group) {
            if (this.isVGrouping) {
                group = new VRowGroup_1.default(this, spec, groupValue);
            }
            else {
                group = new HRowGroup_1.default(this, spec, groupValue);
            }
            parent.addChildRowNode(group, i);
            group.renderSkeleton(); // always immediately render groups
        }
        return group;
    };
    // Row Rendering
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.descendantAdded = function (row) {
        var wasNesting = this.isNesting;
        var isNesting = Boolean(this.nestingCnt += row.depth ? 1 : 0);
        if (wasNesting !== isNesting) {
            this.el.toggleClass('fc-nested', isNesting)
                .toggleClass('fc-flat', !isNesting);
            this.isNesting = isNesting;
        }
    };
    ResourceTimelineView.prototype.descendantRemoved = function (row) {
        var wasNesting = this.isNesting;
        var isNesting = Boolean(this.nestingCnt -= row.depth ? 1 : 0);
        if (wasNesting !== isNesting) {
            this.el.toggleClass('fc-nested', isNesting)
                .toggleClass('fc-flat', !isNesting);
            this.isNesting = isNesting;
        }
    };
    ResourceTimelineView.prototype.descendantShown = function (row) {
        (this.rowsNeedingHeightSync || (this.rowsNeedingHeightSync = [])).push(row);
    };
    ResourceTimelineView.prototype.descendantHidden = function (row) {
        if (!this.rowsNeedingHeightSync) {
            this.rowsNeedingHeightSync = [];
        }
    };
    // visibleRows is flat. does not do recursive
    ResourceTimelineView.prototype.syncRowHeights = function (visibleRows, safe) {
        if (visibleRows === void 0) { visibleRows = this.getVisibleRows(); }
        if (safe === void 0) { safe = false; }
        for (var _i = 0, visibleRows_1 = visibleRows; _i < visibleRows_1.length; _i++) {
            var row = visibleRows_1[_i];
            row.setTrInnerHeight('');
        }
        var innerHeights = visibleRows.map(function (row) {
            var h = row.getMaxTrInnerHeight();
            if (safe) {
                h += h % 2; // FF and zoom only like even numbers for alignment
            }
            return h;
        });
        for (var i = 0; i < visibleRows.length; i++) {
            var row = visibleRows[i];
            row.setTrInnerHeight(innerHeights[i]);
        }
        if (!safe) {
            var h1 = this.spreadsheet.tbodyEl.height();
            var h2 = this.timeBodyTbodyEl.height();
            if (Math.abs(h1 - h2) > 1) {
                this.syncRowHeights(visibleRows, true);
            }
        }
    };
    // Row Querying
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.getVisibleRows = function () {
        var result = [];
        for (var _i = 0, _a = this.rowHierarchy.getRows(); _i < _a.length; _i++) {
            var row = _a[_i];
            if (row.get('isInDom')) {
                result.push(row);
            }
        }
        return result;
    };
    ResourceTimelineView.prototype.getEventRows = function () {
        return this.rowHierarchy.getRows().filter(function (row) { return (row instanceof EventRow_1.default); });
    };
    ResourceTimelineView.prototype.getResourceRow = function (resourceId) {
        return this.resourceRowHash[resourceId];
    };
    // Selection
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.renderSelectionFootprint = function (componentFootprint) {
        if (componentFootprint.resourceId) {
            var rowObj = this.getResourceRow(componentFootprint.resourceId);
            if (rowObj) {
                return rowObj.renderSelectionFootprint(componentFootprint);
            }
        }
        else {
            return _super.prototype.renderSelectionFootprint.call(this, componentFootprint);
        }
    };
    // Event Resizing (route to rows)
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.renderEventResize = function (eventFootprints, seg, isTouch) {
        var map = groupEventFootprintsByResourceId(eventFootprints);
        for (var resourceId in map) {
            var resourceEventFootprints = map[resourceId];
            var rowObj = this.getResourceRow(resourceId);
            // render helpers
            rowObj.helperRenderer.renderEventDraggingFootprints(resourceEventFootprints, seg, isTouch);
            // render highlight
            for (var _i = 0, resourceEventFootprints_1 = resourceEventFootprints; _i < resourceEventFootprints_1.length; _i++) {
                var eventFootprint = resourceEventFootprints_1[_i];
                rowObj.renderHighlight(eventFootprint.componentFootprint);
            }
        }
    };
    ResourceTimelineView.prototype.unrenderEventResize = function () {
        for (var _i = 0, _a = this.getEventRows(); _i < _a.length; _i++) {
            var rowObj = _a[_i];
            rowObj.helperRenderer.unrender();
        }
    };
    // DnD (route to rows)
    // ------------------------------------------------------------------------------------------------------------------
    ResourceTimelineView.prototype.renderDrag = function (eventFootprints, seg, isTouch) {
        var map = groupEventFootprintsByResourceId(eventFootprints);
        var resourceEventFootprints;
        var resourceId;
        var rowObj;
        if (seg) {
            // draw helper
            for (resourceId in map) {
                resourceEventFootprints = map[resourceId];
                rowObj = this.getResourceRow(resourceId);
                rowObj.helperRenderer.renderEventDraggingFootprints(resourceEventFootprints, seg, isTouch);
            }
            return true; // signal helper rendered
        }
        else {
            // draw highlight
            for (resourceId in map) {
                resourceEventFootprints = map[resourceId];
                for (var _i = 0, resourceEventFootprints_2 = resourceEventFootprints; _i < resourceEventFootprints_2.length; _i++) {
                    var eventFootprint = resourceEventFootprints_2[_i];
                    rowObj = this.getResourceRow(resourceId);
                    rowObj.renderHighlight(eventFootprint.componentFootprint);
                }
            }
            return false; // signal helper not rendered
        }
    };
    ResourceTimelineView.prototype.unrenderDrag = function () {
        for (var _i = 0, _a = this.getEventRows(); _i < _a.length; _i++) {
            var rowObj = _a[_i];
            rowObj.helperRenderer.unrender();
            rowObj.unrenderHighlight();
        }
    };
    return ResourceTimelineView;
}(TimelineView_1.default));
exports.default = ResourceTimelineView;
ResourceTimelineView.prototype.eventRendererClass = ResourceTimelineEventRenderer_1.default;
ResourceViewMixin_1.default.mixInto(ResourceTimelineView);
// Utils
// ------------------------------------------------------------------------------------------------------------------
function groupEventFootprintsByResourceId(eventFootprints) {
    var map = {};
    for (var _i = 0, eventFootprints_1 = eventFootprints; _i < eventFootprints_1.length; _i++) {
        var eventFootprint = eventFootprints_1[_i];
        (map[eventFootprint.componentFootprint.resourceId] || (map[eventFootprint.componentFootprint.resourceId] = []))
            .push(eventFootprint);
    }
    return map;
}
/*
if `current` is null, returns true
*/
function computeIsChildrenVisible(current) {
    while (current) {
        if (!current.isExpanded) {
            return false;
        }
        current = current.parent;
    }
    return true;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var RowGroup_1 = __webpack_require__(32);
/*
A row grouping that renders as a tall multi-cell vertical span in the "spreadsheet" area
*/
var VRowGroup = /** @class */ (function (_super) {
    tslib_1.__extends(VRowGroup, _super);
    function VRowGroup(view, groupSpec, groupValue) {
        var _this = _super.call(this, view, groupSpec, groupValue) || this;
        _this.rowspan = 0;
        return _this;
    }
    /*
    Makes sure the groupTd has the correct rowspan / place in the DOM.
    PRECONDITION: in the case of multiple group nesting, a child's renderRowspan()
    will be called before the parent's renderRowspan().
    */
    VRowGroup.prototype.renderRowspan = function () {
        var leadingTr;
        var theme = this.view.calendar.theme;
        if (this.rowspan) {
            // ensure the TD element
            if (!this.groupTd) {
                this.groupTd = $('<td class="' + theme.getClass('widgetContent') + '"/>')
                    .append(this.renderGroupContentEl());
            }
            this.groupTd.attr('rowspan', this.rowspan);
            // (re)insert groupTd if it was never inserted, or the first TR is different
            leadingTr = this.getLeadingRow().getTr('spreadsheet');
            if (leadingTr !== this.leadingTr) {
                if (leadingTr) {
                    leadingTr.prepend(this.groupTd); // parents will later prepend their own
                }
                this.leadingTr = leadingTr;
            }
        }
        else {
            // remove the TD element if it was rendered
            if (this.groupTd) {
                this.groupTd.remove();
                this.groupTd = null;
            }
            this.leadingTr = null;
        }
    };
    /*
    Called when a row somewhere within the grouping is shown
    */
    VRowGroup.prototype.descendantShown = function (row) {
        this.rowspan += 1;
        this.renderRowspan();
        _super.prototype.descendantShown.call(this, row); // will bubble to parent
    };
    /*
    Called when a row somewhere within the grouping is hidden
    */
    VRowGroup.prototype.descendantHidden = function (row) {
        this.rowspan -= 1;
        this.renderRowspan();
        _super.prototype.descendantHidden.call(this, row);
    };
    return VRowGroup;
}(RowGroup_1.default));
exports.default = VRowGroup;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var RowParent_1 = __webpack_require__(18);
/*
An abstract node in a row-hierarchy tree that contains other nodes.
Will have some sort of rendered label indicating the grouping,
up to the subclass for determining what to do with it.
*/
var RowGroup = /** @class */ (function (_super) {
    tslib_1.__extends(RowGroup, _super);
    function RowGroup(view, groupSpec, groupValue) {
        var _this = _super.call(this, view) || this;
        _this.groupSpec = groupSpec;
        _this.groupValue = groupValue;
        return _this;
    }
    /*
    Called when this row (if it renders a row) or a subrow is removed
    */
    RowGroup.prototype.descendantRemoved = function (row) {
        _super.prototype.descendantRemoved.call(this, row); // bubble up to the view and let the node be fully removed
        // and there are no more children in the group, implictly remove this group as well
        if (!this.children.length) {
            this.removeFromParentAndDom();
        }
    };
    /*
    Renders the content wrapper element that will be inserted into this row's TD cell
    */
    RowGroup.prototype.renderGroupContentEl = function () {
        var contentEl = $('<div class="fc-cell-content" />')
            .append(this.renderGroupTextEl());
        var filter = this.groupSpec.render;
        if (typeof filter === 'function') {
            contentEl = filter(contentEl, this.groupValue) || contentEl;
        }
        return contentEl;
    };
    /*
    Renders the text span element that will be inserted into this row's TD cell.
    Goes within the content element.
    */
    RowGroup.prototype.renderGroupTextEl = function () {
        var text = this.groupValue || ''; // might be null/undefined if an ad-hoc grouping
        var filter = this.groupSpec.text;
        if (typeof filter === 'function') {
            text = filter(text) || text;
        }
        return $('<span class="fc-cell-text" />').text(text);
    };
    return RowGroup;
}(RowParent_1.default));
exports.default = RowGroup;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
var RowParent_1 = __webpack_require__(18);
var TimelineFillRenderer_1 = __webpack_require__(28);
var TimelineEventRenderer_1 = __webpack_require__(17);
var TimelineHelperRenderer_1 = __webpack_require__(29);
var EventRow = /** @class */ (function (_super) {
    tslib_1.__extends(EventRow, _super);
    function EventRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventRow.prototype.renderEventSkeleton = function (tr) {
        var theme = this.view.calendar.theme;
        tr.html("<td class=\"" + theme.getClass('widgetContent') + "\"> <div> <div class=\"fc-event-container\" /> </div> </td>");
        this.segContainerEl = tr.find('.fc-event-container');
        this.innerEl = (this.bgSegContainerEl = tr.find('td > div'));
    };
    EventRow.prototype.rangeToCoords = function (range) {
        return this.view.rangeToCoords(range);
    };
    EventRow.prototype.componentFootprintToSegs = function (componentFootprint) {
        return this.view.componentFootprintToSegs(componentFootprint);
    };
    return EventRow;
}(RowParent_1.default));
exports.default = EventRow;
EventRow.prototype.fillRendererClass = TimelineFillRenderer_1.default;
EventRow.prototype.eventRendererClass = TimelineEventRenderer_1.default;
EventRow.prototype.helperRendererClass = TimelineHelperRenderer_1.default;
EventRow.prototype.businessHourRendererClass = fullcalendar_1.BusinessHourRenderer;
EventRow.prototype.hasOwnRow = true;


/***/ }),
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var exportHooks = __webpack_require__(0);
// imports solely for side-effects
__webpack_require__(37);
__webpack_require__(48);
__webpack_require__(50);
__webpack_require__(51);
__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(59);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(64);
__webpack_require__(65);
__webpack_require__(66);
__webpack_require__(67);
__webpack_require__(68);
var schedulerVersion = '1.9.1';
exportHooks.schedulerVersion = schedulerVersion;
/*
When the required internal version is upped,
also update the .json files with a new minor version requirement.
Example: bump ~2.7.2 to ~2.8.0
Use a tilde to match future patch-level changes only!
*/
if (exportHooks.internalApiVersion !== 12) {
    throw new Error('v' + schedulerVersion + ' of FullCalendar Scheduler ' +
        'is incompatible with v' + exportHooks.version + ' of the core.\n' +
        'Please see http://fullcalendar.io/support/ for more information.');
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var exportHooks = __webpack_require__(0);
var ResourceAgendaView_1 = __webpack_require__(20);
var ResourceBasicView_1 = __webpack_require__(22);
var ResourceMonthView_1 = __webpack_require__(23);
var TimelineView_1 = __webpack_require__(14);
var ResourceTimelineView_1 = __webpack_require__(30);
// TODO: find a better way
exportHooks.ResourceAgendaView = ResourceAgendaView_1.default;
exportHooks.ResourceBasicView = ResourceBasicView_1.default;
exportHooks.ResourceMonthView = ResourceMonthView_1.default;
exportHooks.TimelineView = TimelineView_1.default;
exportHooks.ResourceTimelineView = ResourceTimelineView_1.default;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ResourceDayTableMixin_1 = __webpack_require__(21);
var ResourceComponentFootprint_1 = __webpack_require__(6);
var ResourceTimeGrid = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTimeGrid, _super);
    function ResourceTimeGrid(view) {
        var _this = _super.call(this, view) || this;
        _this.isResourceFootprintsEnabled = true;
        return _this;
    }
    ResourceTimeGrid.prototype.renderDates = function (dateProfile) {
        this.dateProfile = dateProfile;
        this.renderSlats();
    };
    ResourceTimeGrid.prototype.renderResources = function (resources) {
        this.registerResources(resources);
        this.renderColumns();
        if (this.headContainerEl) {
            this.processHeadResourceEls(this.headContainerEl);
        }
    };
    // TODO: make DRY with ResourceDayGrid
    ResourceTimeGrid.prototype.getHitFootprint = function (hit) {
        var plainFootprint = _super.prototype.getHitFootprint.call(this, hit);
        return new ResourceComponentFootprint_1.default(plainFootprint.unzonedRange, plainFootprint.isAllDay, this.getColResource(hit.col).id);
    };
    ResourceTimeGrid.prototype.componentFootprintToSegs = function (componentFootprint) {
        var resourceCnt = this.resourceCnt;
        var genericSegs = this.sliceRangeByTimes(componentFootprint.unzonedRange); // no assigned resources
        var resourceSegs = [];
        for (var _i = 0, genericSegs_1 = genericSegs; _i < genericSegs_1.length; _i++) {
            var seg = genericSegs_1[_i];
            for (var resourceIndex = 0; resourceIndex < resourceCnt; resourceIndex++) {
                var resourceObj = this.flattenedResources[resourceIndex];
                if (!(componentFootprint instanceof ResourceComponentFootprint_1.default) ||
                    (componentFootprint.resourceId === resourceObj.id)) {
                    var copy = $.extend({}, seg);
                    copy.resource = resourceObj;
                    copy.col = this.indicesToCol(resourceIndex, seg.dayIndex);
                    resourceSegs.push(copy);
                }
            }
        }
        return resourceSegs;
    };
    return ResourceTimeGrid;
}(fullcalendar_1.TimeGrid));
exports.default = ResourceTimeGrid;
ResourceDayTableMixin_1.default.mixInto(ResourceTimeGrid);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var rtlScrollSystem = null;
/*
A Scroller with additional functionality:
- optional ScrollerCanvas for content
- fired events for scroll start/end
- cross-browser normalization of horizontal scroll for RTL
*/
var EnhancedScroller = /** @class */ (function (_super) {
    tslib_1.__extends(EnhancedScroller, _super);
    function EnhancedScroller(options) {
        var _this = _super.call(this, options) || this;
        _this.isScrolling = false;
        _this.isTouching = false;
        _this.isTouchedEver = false;
        _this.isMoving = false;
        _this.isTouchScrollEnabled = true;
        _this.requestMovingEnd = fullcalendar_1.debounce(_this.reportMovingEnd, 500);
        return _this;
    }
    EnhancedScroller.prototype.render = function () {
        _super.prototype.render.call(this);
        if (this.canvas) {
            this.canvas.render();
            this.canvas.el.appendTo(this.scrollEl);
        }
        this.bindHandlers();
    };
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
            this.scrollEl.on('touchmove', (this.preventTouchScrollHandler = fullcalendar_1.preventDefault));
        }
    };
    EnhancedScroller.prototype.unbindPreventTouchScroll = function () {
        if (this.preventTouchScrollHandler) {
            this.scrollEl.off('touchmove', this.preventTouchScrollHandler);
            this.preventTouchScrollHandler = null;
        }
    };
    // Handlers
    // ----------------------------------------------------------------------------------------------
    EnhancedScroller.prototype.bindHandlers = function () {
        return this.listenTo(this.scrollEl, {
            scroll: this.reportScroll,
            touchstart: this.reportTouchStart,
            touchend: this.reportTouchEnd
        });
    };
    EnhancedScroller.prototype.unbindHandlers = function () {
        return this.stopListeningTo(this.scrollEl);
    };
    // Scroll Events
    // ----------------------------------------------------------------------------------------------
    EnhancedScroller.prototype.reportScroll = function () {
        if (!this.isScrolling) {
            this.reportScrollStart();
        }
        this.trigger('scroll');
        this.isMoving = true;
        this.requestMovingEnd();
    };
    EnhancedScroller.prototype.reportScrollStart = function () {
        if (!this.isScrolling) {
            this.isScrolling = true;
            this.trigger('scrollStart', this.isTouching); // created in constructor
        }
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
    // Touch Events
    // ----------------------------------------------------------------------------------------------
    // will fire *before* the scroll event is fired
    EnhancedScroller.prototype.reportTouchStart = function () {
        this.isTouching = true;
        this.isTouchedEver = true;
    };
    EnhancedScroller.prototype.reportTouchEnd = function () {
        if (this.isTouching) {
            this.isTouching = false;
            // if touch scrolling was re-enabled during a recent touch scroll
            // then unbind the handlers that are preventing it from happening.
            if (this.isTouchScrollEnabled) {
                this.unbindPreventTouchScroll(); // won't do anything if not bound
            }
            // if the user ended their touch, and the scroll area wasn't moving,
            // we consider this to be the end of the scroll.
            if (!this.isMoving) {
                this.reportScrollEnd(); // won't fire if already ended
            }
        }
    };
    // Horizontal Scroll Normalization
    // ----------------------------------------------------------------------------------------------
    // http://stackoverflow.com/questions/24276619/better-way-to-get-the-viewport-of-a-scrollable-div-in-rtl-mode/24394376#24394376
    /*
    If RTL, and scrolled to the left, returns NEGATIVE value (like Firefox)
    */
    EnhancedScroller.prototype.getScrollLeft = function () {
        var direction = this.scrollEl.css('direction');
        var node = this.scrollEl[0];
        var val = node.scrollLeft;
        if (direction === 'rtl') {
            switch (rtlScrollSystem) {
                case 'positive':
                    val = (val + node.clientWidth) - node.scrollWidth;
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
        var direction = this.scrollEl.css('direction');
        var node = this.scrollEl[0];
        if (direction === 'rtl') {
            switch (rtlScrollSystem) {
                case 'positive':
                    val = (val - node.clientWidth) + node.scrollWidth;
                    break;
                case 'reverse':
                    val = -val;
                    break;
            }
        }
        node.scrollLeft = val;
    };
    /*
    Always returns the number of pixels scrolled from the leftmost position (even if RTL).
    Always positive.
    */
    EnhancedScroller.prototype.getScrollFromLeft = function () {
        var direction = this.scrollEl.css('direction');
        var node = this.scrollEl[0];
        var val = node.scrollLeft;
        if (direction === 'rtl') {
            switch (rtlScrollSystem) {
                case 'negative':
                    val = (val - node.clientWidth) + node.scrollWidth;
                    break;
                case 'reverse':
                    val = (-val - node.clientWidth) + node.scrollWidth;
                    break;
            }
        }
        return val;
    };
    EnhancedScroller.prototype.getNativeScrollLeft = function () {
        return this.scrollEl[0].scrollLeft;
    };
    EnhancedScroller.prototype.setNativeScrollLeft = function (val) {
        this.scrollEl[0].scrollLeft = val;
    };
    return EnhancedScroller;
}(fullcalendar_1.Scroller));
exports.default = EnhancedScroller;
fullcalendar_1.EmitterMixin.mixInto(EnhancedScroller);
fullcalendar_1.ListenerMixin.mixInto(EnhancedScroller);
// Horizontal Scroll System Detection
// ----------------------------------------------------------------------------------------------
function detectRtlScrollSystem() {
    var el = $("<div style=\" position: absolute; top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 100px; \">A</div>").appendTo('body');
    var node = el[0];
    var system = (function () {
        if (node.scrollLeft > 0) {
            return 'positive';
        }
        else {
            node.scrollLeft = 1;
            if (node.scrollLeft > 0) {
                return 'reverse';
            }
            else {
                return 'negative';
            }
        }
    })();
    el.remove();
    return system;
}
$(function () {
    rtlScrollSystem = detectRtlScrollSystem();
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
/*
TODO: use pubsub instead?
*/
var TimelineEventDragging = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineEventDragging, _super);
    function TimelineEventDragging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineEventDragging.prototype.segDragStart = function (seg, ev) {
        _super.prototype.segDragStart.call(this, seg, ev);
        if (this.component.eventTitleFollower) {
            this.component.eventTitleFollower.forceRelative();
        }
    };
    TimelineEventDragging.prototype.segDragStop = function (seg, ev) {
        _super.prototype.segDragStop.call(this, seg, ev);
        if (this.component.eventTitleFollower) {
            this.component.eventTitleFollower.clearForce();
        }
    };
    return TimelineEventDragging;
}(fullcalendar_1.EventDragging));
exports.default = TimelineEventDragging;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var fullcalendar_1 = __webpack_require__(0);
/*
TODO: use pubsub instead?
*/
var TimelineEventResizing = /** @class */ (function (_super) {
    tslib_1.__extends(TimelineEventResizing, _super);
    function TimelineEventResizing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimelineEventResizing.prototype.segResizeStart = function (seg, ev) {
        _super.prototype.segResizeStart.call(this, seg, ev);
        if (this.component.eventTitleFollower) {
            return this.component.eventTitleFollower.forceRelative();
        }
    };
    TimelineEventResizing.prototype.segResizeStop = function (seg, ev) {
        _super.prototype.segResizeStop.call(this, seg, ev);
        if (this.component.eventTitleFollower) {
            return this.component.eventTitleFollower.clearForce();
        }
    };
    return TimelineEventResizing;
}(fullcalendar_1.EventResizing));
exports.default = TimelineEventResizing;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var moment = __webpack_require__(15);
var core = __webpack_require__(0);
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
function initScaleProps(timelineView) {
    timelineView.labelInterval = queryDurationOption(timelineView, 'slotLabelInterval');
    timelineView.slotDuration = queryDurationOption(timelineView, 'slotDuration');
    validateLabelAndSlot(timelineView); // validate after computed grid duration
    ensureLabelInterval(timelineView);
    ensureSlotDuration(timelineView);
    var input = timelineView.opt('slotLabelFormat');
    var type = $.type(input);
    timelineView.headerFormats =
        type === 'array' ?
            input
            : type === 'string' ?
                [input]
                :
                    computeHeaderFormats(timelineView);
    timelineView.isTimeScale = core.durationHasTime(timelineView.slotDuration);
    var largeUnit = null;
    if (!timelineView.isTimeScale) {
        var slotUnit = core.computeGreatestUnit(timelineView.slotDuration);
        if (/year|month|week/.test(slotUnit)) {
            largeUnit = slotUnit;
        }
    }
    timelineView.largeUnit = largeUnit;
    timelineView.emphasizeWeeks = (timelineView.slotDuration.as('days') === 1) &&
        (timelineView.currentRangeAs('weeks') >= 2) &&
        !timelineView.opt('businessHours');
    /*
    console.log('label interval =', timelineView.labelInterval.humanize())
    console.log('slot duration =', timelineView.slotDuration.humanize())
    console.log('header formats =', timelineView.headerFormats)
    console.log('isTimeScale', timelineView.isTimeScale)
    console.log('largeUnit', timelineView.largeUnit)
    */
    var rawSnapDuration = timelineView.opt('snapDuration');
    timelineView.snapDuration =
        rawSnapDuration ?
            moment.duration(rawSnapDuration) :
            timelineView.slotDuration;
    timelineView.snapsPerSlot = core.divideDurationByDuration(timelineView.slotDuration, timelineView.snapDuration);
}
exports.initScaleProps = initScaleProps;
function queryDurationOption(timelineView, name) {
    var input = timelineView.opt(name);
    if (input != null) {
        var dur = moment.duration(input);
        if (+dur) {
            return dur;
        }
    }
}
function validateLabelAndSlot(timelineView) {
    var currentUnzonedRange = timelineView.dateProfile.currentUnzonedRange;
    // make sure labelInterval doesn't exceed the max number of cells
    if (timelineView.labelInterval) {
        var labelCnt = core.divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), timelineView.labelInterval);
        if (labelCnt > core.MAX_TIMELINE_SLOTS) {
            core.warn('slotLabelInterval results in too many cells');
            timelineView.labelInterval = null;
        }
    }
    // make sure slotDuration doesn't exceed the maximum number of cells
    if (timelineView.slotDuration) {
        var slotCnt = core.divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), timelineView.slotDuration);
        if (slotCnt > core.MAX_TIMELINE_SLOTS) {
            core.warn('slotDuration results in too many cells');
            timelineView.slotDuration = null;
        }
    }
    // make sure labelInterval is a multiple of slotDuration
    if (timelineView.labelInterval && timelineView.slotDuration) {
        var slotsPerLabel = core.divideDurationByDuration(timelineView.labelInterval, timelineView.slotDuration);
        if (!core.isInt(slotsPerLabel) || (slotsPerLabel < 1)) {
            core.warn('slotLabelInterval must be a multiple of slotDuration');
            return timelineView.slotDuration = null;
        }
    }
}
function ensureLabelInterval(timelineView) {
    var currentUnzonedRange = timelineView.dateProfile.currentUnzonedRange;
    var labelInterval = timelineView.labelInterval;
    if (!labelInterval) {
        // compute based off the slot duration
        // find the largest label interval with an acceptable slots-per-label
        var input = void 0;
        if (timelineView.slotDuration) {
            for (var _i = 0, STOCK_SUB_DURATIONS_1 = STOCK_SUB_DURATIONS; _i < STOCK_SUB_DURATIONS_1.length; _i++) {
                input = STOCK_SUB_DURATIONS_1[_i];
                var tryLabelInterval = moment.duration(input);
                var slotsPerLabel = core.divideDurationByDuration(tryLabelInterval, timelineView.slotDuration);
                if (core.isInt(slotsPerLabel) && (slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL)) {
                    labelInterval = tryLabelInterval;
                    break;
                }
            }
            // use the slot duration as a last resort
            if (!labelInterval) {
                labelInterval = timelineView.slotDuration;
            }
            // compute based off the view's duration
            // find the largest label interval that yields the minimum number of labels
        }
        else {
            for (var _a = 0, STOCK_SUB_DURATIONS_2 = STOCK_SUB_DURATIONS; _a < STOCK_SUB_DURATIONS_2.length; _a++) {
                input = STOCK_SUB_DURATIONS_2[_a];
                labelInterval = moment.duration(input);
                var labelCnt = core.divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), labelInterval);
                if (labelCnt >= MIN_AUTO_LABELS) {
                    break;
                }
            }
        }
        timelineView.labelInterval = labelInterval;
    }
    return labelInterval;
}
function ensureSlotDuration(timelineView) {
    var currentUnzonedRange = timelineView.dateProfile.currentUnzonedRange;
    var slotDuration = timelineView.slotDuration;
    if (!slotDuration) {
        var labelInterval = ensureLabelInterval(timelineView); // will compute if necessary
        // compute based off the label interval
        // find the largest slot duration that is different from labelInterval, but still acceptable
        for (var _i = 0, STOCK_SUB_DURATIONS_3 = STOCK_SUB_DURATIONS; _i < STOCK_SUB_DURATIONS_3.length; _i++) {
            var input = STOCK_SUB_DURATIONS_3[_i];
            var trySlotDuration = moment.duration(input);
            var slotsPerLabel = core.divideDurationByDuration(labelInterval, trySlotDuration);
            if (core.isInt(slotsPerLabel) && (slotsPerLabel > 1) && (slotsPerLabel <= MAX_AUTO_SLOTS_PER_LABEL)) {
                slotDuration = trySlotDuration;
                break;
            }
        }
        // only allow the value if it won't exceed the view's # of slots limit
        if (slotDuration) {
            var slotCnt = core.divideRangeByDuration(currentUnzonedRange.getStart(), currentUnzonedRange.getEnd(), slotDuration);
            if (slotCnt > MAX_AUTO_CELLS) {
                slotDuration = null;
            }
        }
        // use the label interval as a last resort
        if (!slotDuration) {
            slotDuration = labelInterval;
        }
        timelineView.slotDuration = slotDuration;
    }
    return slotDuration;
}
function computeHeaderFormats(timelineView) {
    var format1;
    var format2;
    var labelInterval = timelineView.labelInterval;
    var unit = core.computeGreatestUnit(labelInterval);
    var weekNumbersVisible = timelineView.opt('weekNumbers');
    var format0 = (format1 = (format2 = null));
    // NOTE: weekNumber computation function wont work
    if ((unit === 'week') && !weekNumbersVisible) {
        unit = 'day';
    }
    switch (unit) {
        case 'year':
            format0 = 'YYYY'; // '2015'
            break;
        case 'month':
            if (timelineView.currentRangeAs('years') > 1) {
                format0 = 'YYYY'; // '2015'
            }
            format1 = 'MMM'; // 'Jan'
            break;
        case 'week':
            if (timelineView.currentRangeAs('years') > 1) {
                format0 = 'YYYY'; // '2015'
            }
            format1 = timelineView.opt('shortWeekFormat'); // 'Wk4'
            break;
        case 'day':
            if (timelineView.currentRangeAs('years') > 1) {
                format0 = timelineView.opt('monthYearFormat'); // 'January 2014'
            }
            else if (timelineView.currentRangeAs('months') > 1) {
                format0 = 'MMMM'; // 'January'
            }
            if (weekNumbersVisible) {
                format1 = timelineView.opt('weekFormat'); // 'Wk 4'
            }
            // TODO: would use smallDayDateFormat but the way timeline does RTL,
            // we don't want the text to be flipped
            format2 = 'dd D'; // @opt('smallDayDateFormat') # 'Su 9'
            break;
        case 'hour':
            if (weekNumbersVisible) {
                format0 = timelineView.opt('weekFormat'); // 'Wk 4'
            }
            if (timelineView.currentRangeAs('days') > 1) {
                format1 = timelineView.opt('dayOfMonthFormat'); // 'Fri 9/15'
            }
            format2 = timelineView.opt('smallTimeFormat'); // '6pm'
            break;
        case 'minute':
            // sufficiently large number of different minute cells?
            if ((labelInterval.asMinutes() / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                format0 = timelineView.opt('hourFormat'); // '6pm'
                format1 = '[:]mm'; // ':30'
            }
            else {
                format0 = timelineView.opt('mediumTimeFormat'); // '6:30pm'
            }
            break;
        case 'second':
            // sufficiently large number of different second cells?
            if ((labelInterval.asSeconds() / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                format0 = 'LT'; // '8:30 PM'
                format1 = '[:]ss'; // ':30'
            }
            else {
                format0 = 'LTS'; // '8:30:45 PM'
            }
            break;
        case 'millisecond':
            format0 = 'LTS'; // '8:30:45 PM'
            format1 = '[.]SSS'; // '750'
            break;
    }
    return [].concat(format0 || [], format1 || [], format2 || []);
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ClippedScroller_1 = __webpack_require__(24);
var ScrollerCanvas_1 = __webpack_require__(25);
var ScrollJoiner_1 = __webpack_require__(16);
var ScrollFollower_1 = __webpack_require__(26);
var VRowGroup_1 = __webpack_require__(31);
var COL_MIN_WIDTH = 30;
var Spreadsheet = /** @class */ (function () {
    function Spreadsheet(view) {
        this.colGroupHtml = '';
        this.view = view;
        this.isRTL = this.view.opt('isRTL'); // doesn't descend from Grid, so needs to do this
        this.givenColWidths = this.colWidths =
            this.view.colSpecs.map(function (colSpec) { return colSpec.width; });
    }
    Spreadsheet.prototype.renderSkeleton = function () {
        var theme = this.view.calendar.theme;
        this.headScroller = new ClippedScroller_1.default({
            overflowX: 'clipped-scroll',
            overflowY: 'hidden'
        });
        this.headScroller.canvas = new ScrollerCanvas_1.default();
        this.headScroller.render();
        this.headScroller.canvas.contentEl.html(this.renderHeadHtml());
        this.headEl.append(this.headScroller.el);
        this.bodyScroller = new ClippedScroller_1.default({ overflowY: 'clipped-scroll' });
        this.bodyScroller.canvas = new ScrollerCanvas_1.default();
        this.bodyScroller.render();
        this.bodyScroller.canvas.contentEl.html("<div class=\"fc-rows\"> <table class=\"" + theme.getClass('tableGrid') + "\">" + this.colGroupHtml + "<tbody/> </table> </div>"); // colGroupHtml hack
        this.tbodyEl = this.bodyScroller.canvas.contentEl.find('tbody');
        this.el.append(this.bodyScroller.el);
        this.scrollJoiner = new ScrollJoiner_1.default('horizontal', [this.headScroller, this.bodyScroller]);
        this.headTable = this.headEl.find('table');
        this.headColEls = this.headEl.find('col');
        this.headCellEls = this.headScroller.canvas.contentEl.find('tr:last-child th');
        this.bodyColEls = this.el.find('col');
        this.bodyTable = this.el.find('table');
        this.colMinWidths = this.computeColMinWidths();
        this.applyColWidths();
        this.initColResizing();
    };
    Spreadsheet.prototype.renderHeadHtml = function () {
        var theme = this.view.calendar.theme;
        var colSpecs = this.view.colSpecs;
        var html = '<table class="' + theme.getClass('tableGrid') + '">';
        var colGroupHtml = '<colgroup>';
        for (var _i = 0, colSpecs_1 = colSpecs; _i < colSpecs_1.length; _i++) {
            var o = colSpecs_1[_i];
            if (o.isMain) {
                colGroupHtml += '<col class="fc-main-col"/>';
            }
            else {
                colGroupHtml += '<col/>';
            }
        }
        colGroupHtml += '</colgroup>';
        this.colGroupHtml = colGroupHtml;
        html += colGroupHtml;
        html += '<tbody>';
        if (this.view.superHeaderText) {
            html +=
                '<tr class="fc-super">' +
                    '<th class="' + theme.getClass('widgetHeader') + '" colspan="' + colSpecs.length + '">' +
                    '<div class="fc-cell-content">' +
                    '<span class="fc-cell-text">' +
                    fullcalendar_1.htmlEscape(this.view.superHeaderText) +
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
        html += '</tbody></table>';
        return html;
    };
    Spreadsheet.prototype.initColResizing = function () {
        var _this = this;
        this.headEl.find('th .fc-col-resizer').each(function (i, resizerEl) {
            resizerEl = $(resizerEl);
            resizerEl.on('mousedown', function (ev) {
                _this.colResizeMousedown(i, ev, resizerEl);
            });
        });
    };
    Spreadsheet.prototype.colResizeMousedown = function (i, ev, resizerEl) {
        var _this = this;
        var colWidths = (this.colWidths = this.queryColWidths());
        colWidths.pop();
        colWidths.push(null); // will result in 'auto' or ''
        var origColWidth = colWidths[i];
        var minWidth = Math.min(this.colMinWidths[i], COL_MIN_WIDTH); // if given width is smaller, allow it
        var dragListener = new fullcalendar_1.DragListener({
            dragStart: function () {
                resizerEl.addClass('fc-active');
            },
            drag: function (dx, dy) {
                var width = origColWidth + (_this.isRTL ? -dx : dx);
                width = Math.max(width, minWidth);
                colWidths[i] = width;
                _this.applyColWidths();
            },
            dragEnd: function () {
                resizerEl.removeClass('fc-active');
            }
        });
        dragListener.startInteraction(ev);
    };
    Spreadsheet.prototype.applyColWidths = function () {
        var cssWidth;
        var i;
        var colWidth;
        var colMinWidths = this.colMinWidths;
        var colWidths = this.colWidths;
        var allNumbers = true;
        var anyPercentages = false;
        var total = 0;
        for (var _i = 0, colWidths_1 = colWidths; _i < colWidths_1.length; _i++) {
            colWidth = colWidths_1[_i];
            if (typeof colWidth === 'number') {
                total += colWidth;
            }
            else {
                allNumbers = false;
                if (colWidth) {
                    anyPercentages = true;
                }
            }
        }
        // percentage widths play better with 'auto' but h-grouped cells don't
        var defaultCssWidth = anyPercentages && !this.view.isHGrouping ?
            'auto' :
            '';
        var cssWidths = colWidths.map(function (colWidth) { return (colWidth != null ? colWidth : defaultCssWidth); });
        // if allNumbers
        //    cssWidths.pop()
        //    cssWidths.push('auto')
        var tableMinWidth = 0;
        for (i = 0; i < cssWidths.length; i++) {
            cssWidth = cssWidths[i];
            tableMinWidth +=
                typeof cssWidth === 'number' ?
                    cssWidth :
                    colMinWidths[i];
        }
        for (i = 0; i < cssWidths.length; i++) {
            cssWidth = cssWidths[i];
            this.headColEls.eq(i).css('width', cssWidth);
            this.bodyColEls.eq(i).css('width', cssWidth);
        }
        this.headScroller.canvas.setMinWidth(tableMinWidth); // not really a table width anymore
        this.bodyScroller.canvas.setMinWidth(tableMinWidth);
        this.tableMinWidth = tableMinWidth;
        this.tableWidth = allNumbers ? total : undefined;
    };
    Spreadsheet.prototype.computeColMinWidths = function () {
        var _this = this;
        return this.givenColWidths.map(function (width, i) { return (typeof width === 'number' ?
            width :
            parseInt(_this.headColEls.eq(i).css('min-width'), 10) || COL_MIN_WIDTH); });
    };
    Spreadsheet.prototype.queryColWidths = function () {
        return this.headCellEls.map(function (i, node) { return ($(node).outerWidth()); }).get();
    };
    // Sizing
    // ---------------------------------------------------------------------------------
    Spreadsheet.prototype.updateSize = function () {
        this.headScroller.updateSize();
        this.bodyScroller.updateSize();
        this.scrollJoiner.update();
        this.updateCellFollower();
    };
    Spreadsheet.prototype.headHeight = function () {
        var table = this.headScroller.canvas.contentEl.find('table');
        return table.height.apply(table, arguments);
    };
    // completely reninitializes every time there's add/remove
    // TODO: optimize
    Spreadsheet.prototype.updateCellFollower = function () {
        if (this.cellFollower) {
            this.cellFollower.clearSprites(); // the closest thing to a destroy
        }
        this.cellFollower = new ScrollFollower_1.default(this.bodyScroller, true); // allowPointerEvents
        this.cellFollower.isHFollowing = false;
        this.cellFollower.isVFollowing = true;
        var nodes = [];
        for (var _i = 0, _a = this.view.rowHierarchy.getNodes(); _i < _a.length; _i++) {
            var row = _a[_i];
            if (row instanceof VRowGroup_1.default) {
                if (row.groupTd) {
                    var cellContent = row.groupTd.find('.fc-cell-content');
                    if (cellContent.length) {
                        nodes.push(cellContent[0]);
                    }
                }
            }
        }
        this.cellFollower.setSpriteEls($(nodes));
        this.cellFollower.update();
    };
    return Spreadsheet;
}());
exports.default = Spreadsheet;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/*
Given a jQuery <tr> set, returns the <td>'s that do not have multi-line rowspans.
Would use the [rowspan] selector, but never not defined in IE8.
*/
function getOwnCells(trs) {
    return trs.find('> td').filter(function (i, tdNode) { return (tdNode.rowSpan <= 1); });
}
exports.getOwnCells = getOwnCells;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var TimelineEventRenderer_1 = __webpack_require__(17);
var ResourceTimelineEventRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceTimelineEventRenderer, _super);
    function ResourceTimelineEventRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // don't render any fg segs
    ResourceTimelineEventRenderer.prototype.renderFgRanges = function (eventRanges) {
        // subclasses can implement
    };
    ResourceTimelineEventRenderer.prototype.unrenderFgRanges = function () {
        // otherwise will try do manip DOM, js error
    };
    return ResourceTimelineEventRenderer;
}(TimelineEventRenderer_1.default));
exports.default = ResourceTimelineEventRenderer;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var EventRow_1 = __webpack_require__(33);
/*
A row that renders information about a particular resource, as well as it events (handled by superclass)
*/
var ResourceRow = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceRow, _super);
    function ResourceRow(view, resource) {
        var _this = _super.call(this, view) || this;
        _this.resource = resource;
        _this.eventRenderer.designatedResource = _this.resource;
        return _this;
    }
    ResourceRow.prototype.renderSkeleton = function () {
        _super.prototype.renderSkeleton.call(this);
        this.updateExpandingEnabled();
        if (this.eventsPayload) {
            EventRow_1.default.prototype.executeEventRender.call(this, this.eventsPayload);
        }
        if (this.businessHourGenerator) {
            EventRow_1.default.prototype.renderBusinessHours.call(this, this.businessHourGenerator);
        }
        this.view.publiclyTrigger('resourceRender', {
            context: this.resource,
            args: [
                this.resource,
                this.getTr('spreadsheet').find('> td'),
                this.getTr('event').find('> td'),
                this.view
            ]
        });
    };
    ResourceRow.prototype.removeElement = function () {
        _super.prototype.removeElement.call(this);
        if (this.eventsPayload) {
            EventRow_1.default.prototype.executeEventUnrender.call(this, this.eventsPayload);
        }
        if (this.businessHourGenerator) {
            EventRow_1.default.prototype.unrenderBusinessHours.call(this, this.businessHourGenerator);
        }
    };
    ResourceRow.prototype.renderEventSkeleton = function (tr) {
        _super.prototype.renderEventSkeleton.call(this, tr);
        tr.attr('data-resource-id', this.resource.id);
    };
    ResourceRow.prototype.executeEventRender = function (eventsPayload) {
        this.eventsPayload = eventsPayload;
        if (this.get('isInDom')) {
            _super.prototype.executeEventRender.call(this, this.eventsPayload);
        }
    };
    ResourceRow.prototype.executeEventUnrender = function () {
        _super.prototype.executeEventUnrender.call(this);
        this.eventsPayload = null;
    };
    ResourceRow.prototype.renderBusinessHours = function (businessHourGenerator) {
        this.businessHourGenerator = businessHourGenerator;
        if (this.get('isInDom')) {
            _super.prototype.renderBusinessHours.call(this, this.businessHourGenerator);
        }
    };
    ResourceRow.prototype.unrenderBusinessHours = function () {
        _super.prototype.unrenderBusinessHours.call(this);
        this.businessHourGenerator = null;
    };
    /*
    Populates the TR with cells containing data about the resource
    */
    ResourceRow.prototype.renderSpreadsheetSkeleton = function (tr) {
        var theme = this.view.calendar.theme;
        var resource = this.resource;
        for (var _i = 0, _a = this.view.colSpecs; _i < _a.length; _i++) {
            var colSpec = _a[_i];
            if (colSpec.group) {
                continue;
            }
            var input = colSpec.field ?
                resource[colSpec.field] || null :
                resource;
            var text = typeof colSpec.text === 'function' ?
                colSpec.text(resource, input) : // the colspec provided a text filter function
                input;
            var contentEl = $('<div class="fc-cell-content">' +
                (colSpec.isMain ? this.renderGutterHtml() : '') +
                '<span class="fc-cell-text">' +
                (text ? fullcalendar_1.htmlEscape(text) : '&nbsp;') +
                '</span>' +
                '</div>');
            if (typeof colSpec.render === 'function') {
                contentEl = colSpec.render(resource, contentEl, input) || contentEl;
            }
            var td = $('<td class="' + theme.getClass('widgetContent') + '"/>')
                .append(contentEl);
            // the first cell of the row needs to have an inner div for setTrInnerHeight
            if (colSpec.isMain) {
                td.wrapInner('<div/>');
            }
            tr.append(td);
        }
        tr.attr('data-resource-id', resource.id);
    };
    /*
    Renders the HTML responsible for the subrow expander area,
    as well as the space before it (used to align expanders of similar depths)
    */
    ResourceRow.prototype.renderGutterHtml = function () {
        var html = '';
        var depth = this.depth;
        for (var i = 0; i < depth; i++) {
            html += '<span class="fc-icon"/>';
        }
        html +=
            '<span class="fc-expander-space">' +
                '<span class="fc-icon"></span>' +
                '</span>';
        return html;
    };
    return ResourceRow;
}(EventRow_1.default));
exports.default = ResourceRow;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var RowGroup_1 = __webpack_require__(32);
/*
A row grouping that renders as a single solid row that spans width-wise (like a horizontal rule)
*/
var HRowGroup = /** @class */ (function (_super) {
    tslib_1.__extends(HRowGroup, _super);
    function HRowGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HRowGroup.prototype.renderSkeleton = function () {
        _super.prototype.renderSkeleton.call(this);
        this.updateExpandingEnabled();
    };
    /*
    Renders this row's TR for the "spreadsheet" quadrant, the area with info about each resource
    */
    HRowGroup.prototype.renderSpreadsheetSkeleton = function (tr) {
        var contentEl = this.renderGroupContentEl();
        // add an expander icon. binding handlers and updating are done by RowParent
        contentEl.prepend('<span class="fc-expander">' +
            '<span class="fc-icon"></span>' +
            '</span>');
        return $('<td class="fc-divider" />')
            .attr('colspan', this.view.colSpecs.length) // span across all columns
            .append($('<div/>').append(contentEl) // needed by setTrInnerHeight
        )
            .appendTo(tr);
    };
    /*
    Renders this row's TR for the quadrant that contains a resource's events
    */
    HRowGroup.prototype.renderEventSkeleton = function (tr) {
        // insert a single cell, with a single empty <div> (needed by setTrInnerHeight).
        // there will be no content
        return tr.append("<td class=\"fc-divider\"> <div/> </td>");
    };
    return HRowGroup;
}(RowGroup_1.default));
exports.default = HRowGroup;
HRowGroup.prototype.hasOwnRow = true; // actually renders its own row and takes up height


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var Resource_1 = __webpack_require__(19);
var ResourceManager_1 = __webpack_require__(49);
var ResourceComponentFootprint_1 = __webpack_require__(6);
// NOTE: for public methods, always be sure of the return value. for chaining
var origMethods = {
    constructed: fullcalendar_1.Calendar.prototype.constructed,
    buildSelectFootprint: fullcalendar_1.Calendar.prototype.buildSelectFootprint
};
// option defaults
fullcalendar_1.Calendar.defaults.refetchResourcesOnNavigate = false;
fullcalendar_1.Calendar.defaults.filterResourcesWithEvents = false;
fullcalendar_1.Calendar.prototype.resourceManager = null;
fullcalendar_1.Calendar.prototype.constructed = function () {
    origMethods.constructed.apply(this, arguments);
    this.resourceManager = new ResourceManager_1.default(this);
};
fullcalendar_1.Calendar.prototype.instantiateView = function (viewType) {
    var spec = this.viewSpecManager.getViewSpec(viewType);
    var viewClass = spec['class'];
    if (this.opt('resources') && (spec.options.resources !== false)) {
        if (spec.queryResourceClass) {
            viewClass = spec.queryResourceClass(spec) || viewClass; // might return falsy
        }
        else if (spec.resourceClass) {
            viewClass = spec.resourceClass;
        }
    }
    return new viewClass(this, spec);
};
// for the API only
// retrieves what is currently in memory. no fetching
fullcalendar_1.Calendar.prototype.getResources = function () {
    return Array.prototype.slice.call(// make a copy
    this.resourceManager.topLevelResources);
};
// assumes all resources already loaded
fullcalendar_1.Calendar.prototype.addResource = function (resourceInput, scroll) {
    var _this = this;
    if (scroll === void 0) { scroll = false; }
    this.resourceManager.addResource(resourceInput)
        .then(function (resource) {
        if (scroll && _this.view.scrollToResource) {
            return _this.view.scrollToResource(resource);
        }
    });
};
// assumes all resources already loaded
fullcalendar_1.Calendar.prototype.removeResource = function (idOrResource) {
    return this.resourceManager.removeResource(idOrResource);
};
fullcalendar_1.Calendar.prototype.refetchResources = function () {
    this.resourceManager.clear();
    this.view.flash('initialResources');
};
fullcalendar_1.Calendar.prototype.rerenderResources = function () {
    this.resourceManager.resetCurrentResources();
};
fullcalendar_1.Calendar.prototype.buildSelectFootprint = function (zonedStartInput, zonedEndInput, resourceId) {
    var plainFootprint = origMethods.buildSelectFootprint.apply(this, arguments);
    if (resourceId) {
        return new ResourceComponentFootprint_1.default(plainFootprint.unzonedRange, plainFootprint.isAllDay, resourceId);
    }
    else {
        return plainFootprint;
    }
};
fullcalendar_1.Calendar.prototype.getResourceById = function (id) {
    return this.resourceManager.getResourceById(id);
};
// Resources + Events
// ----------------------------------------------------------------------------------------
// DEPRECATED. for external API backwards compatibility
fullcalendar_1.Calendar.prototype.getEventResourceId = function (event) {
    return this.getEventResourceIds(event)[0];
};
fullcalendar_1.Calendar.prototype.getEventResourceIds = function (event) {
    var eventDef = this.eventManager.getEventDefByUid(event._id);
    if (eventDef) {
        return eventDef.getResourceIds();
    }
    else {
        return [];
    }
};
// DEPRECATED
fullcalendar_1.Calendar.prototype.setEventResourceId = function (event, resourceId) {
    this.setEventResourceIds(event, resourceId ? [resourceId] : []);
};
fullcalendar_1.Calendar.prototype.setEventResourceIds = function (event, resourceIds) {
    var eventDef = this.eventManager.getEventDefByUid(event._id);
    if (eventDef) {
        eventDef.resourceIds = resourceIds.map(function (rawResourceId) {
            return Resource_1.default.normalizeId(rawResourceId);
        });
    }
};
// NOTE: views pair *segments* to resources. that's why there's no code reuse
fullcalendar_1.Calendar.prototype.getResourceEvents = function (idOrResource) {
    var _this = this;
    var resource = typeof idOrResource === 'object' ?
        idOrResource :
        this.getResourceById(idOrResource);
    if (resource) {
        // return the event cache, filtered by events assigned to the resource
        // TODO: move away from using clientId
        return this.clientEvents(function (event) {
            return $.inArray(resource.id, _this.getEventResourceIds(event)) !== -1;
        });
    }
    else {
        return [];
    }
};
// DEPRECATED. for external API backwards compatibility
fullcalendar_1.Calendar.prototype.getEventResource = function (idOrEvent) {
    return this.getEventResources(idOrEvent)[0];
};
fullcalendar_1.Calendar.prototype.getEventResources = function (idOrEvent) {
    var event = typeof idOrEvent === 'object' ?
        idOrEvent :
        this.clientEvents(idOrEvent)[0];
    var resources = [];
    if (event) {
        for (var _i = 0, _a = this.getEventResourceIds(event); _i < _a.length; _i++) {
            var resourceId = _a[_i];
            var resource = this.getResourceById(resourceId);
            if (resource) {
                resources.push(resource);
            }
        }
    }
    return resources;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var ResourceManager = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceManager, _super);
    function ResourceManager(calendar) {
        var _this = _super.call(this) || this;
        _this.fetchId = 0;
        _this.calendar = calendar;
        _this.initializeCache();
        return _this;
    }
    // Resource Data Getting
    // ------------------------------------------------------------------------------------------------------------------
    /*
    Like fetchResources, but won't refetch if already fetched.
    */
    ResourceManager.prototype.getResources = function (start, end) {
        var isSameRange = (!start && !this.currentStart) || // both nonexistent ranges?
            (start && this.currentStart && start.isSame(this.currentStart) && end.isSame(this.currentEnd));
        if (!this.fetching || !isSameRange) {
            return this.fetchResources(start, end);
        }
        else {
            return this.fetching;
        }
    };
    /*
    Will always fetch, even if done previously.
    Accepts optional chrono-related params to pass on to the raw resource sources.
    Returns a promise.
    */
    ResourceManager.prototype.fetchResources = function (start, end) {
        var _this = this;
        var currentFetchId = (this.fetchId += 1);
        return this.fetching =
            fullcalendar_1.Promise.construct(function (resolve, reject) {
                _this.fetchResourceInputs(function (resourceInputs) {
                    if (currentFetchId === _this.fetchId) {
                        _this.setResources(resourceInputs);
                        return resolve(_this.topLevelResources);
                    }
                    else {
                        return reject();
                    }
                }, start, end);
            });
    };
    /*
    Accepts optional chrono-related params to pass on to the raw resource sources.
    Calls callback when done.
    */
    ResourceManager.prototype.fetchResourceInputs = function (callback, start, end) {
        var _this = this;
        var calendar = this.calendar;
        var source = calendar.opt('resources');
        var timezone = calendar.opt('timezone');
        if ($.type(source) === 'string') {
            source = { url: source };
        }
        switch ($.type(source)) {
            case 'function':
                this.calendar.pushLoading();
                source(function (resourceInputs) {
                    _this.calendar.popLoading();
                    callback(resourceInputs);
                }, start, end, calendar.opt('timezone'));
                break;
            case 'object':
                calendar.pushLoading();
                var requestParams = {};
                if (start && end) {
                    requestParams[calendar.opt('startParam')] = start.format();
                    requestParams[calendar.opt('endParam')] = end.format();
                    // mimick what EventManager does
                    // TODO: more DRY
                    if (timezone && (timezone !== 'local')) {
                        requestParams[calendar.opt('timezoneParam')] = timezone;
                    }
                }
                $.ajax(// TODO: handle failure
                $.extend({ data: requestParams }, ResourceManager.ajaxDefaults, source)).then(function (resourceInputs) {
                    calendar.popLoading();
                    callback(resourceInputs);
                });
                break;
            case 'array':
                callback(source);
                break;
            default:
                callback([]);
                break;
        }
    };
    ResourceManager.prototype.getResourceById = function (id) {
        return this.resourcesById[id];
    };
    // assumes already completed fetch
    // does not guarantee order
    ResourceManager.prototype.getFlatResources = function () {
        var result = [];
        for (var id in this.resourcesById) {
            result.push(this.resourcesById[id]);
        }
        return result;
    };
    // Resource Adding
    // ------------------------------------------------------------------------------------------------------------------
    ResourceManager.prototype.initializeCache = function () {
        this.topLevelResources = [];
        this.resourcesById = {};
    };
    ResourceManager.prototype.setResources = function (resourceInputs) {
        var _this = this;
        var resource;
        var wasSet = Boolean(this.topLevelResources);
        this.initializeCache();
        var resources = resourceInputs.map(function (resourceInput) { return (_this.buildResource(resourceInput)); });
        var validResources = [];
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            resource = resources_1[_i];
            if (this.addResourceToIndex(resource)) {
                validResources.push(resource);
            }
        }
        for (var _a = 0, validResources_1 = validResources; _a < validResources_1.length; _a++) {
            resource = validResources_1[_a];
            this.addResourceToTree(resource);
        }
        if (wasSet) {
            this.trigger('reset', this.topLevelResources);
        }
        else {
            this.trigger('set', this.topLevelResources);
        }
        this.calendar.publiclyTrigger('resourcesSet', [this.topLevelResources]);
    };
    ResourceManager.prototype.resetCurrentResources = function () {
        if (this.topLevelResources) {
            this.trigger('reset', this.topLevelResources);
        }
    };
    ResourceManager.prototype.clear = function () {
        this.topLevelResources = null;
        this.fetching = null;
    };
    ResourceManager.prototype.addResource = function (resourceInput) {
        var _this = this;
        if (this.fetching) {
            return this.fetching.then(function () {
                var resource = _this.buildResource(resourceInput);
                if (_this.addResourceToIndex(resource)) {
                    _this.addResourceToTree(resource);
                    _this.trigger('add', resource, _this.topLevelResources);
                    return resource;
                }
                else {
                    return false;
                }
            });
        }
        else {
            return fullcalendar_1.Promise.reject();
        }
    };
    ResourceManager.prototype.addResourceToIndex = function (resource) {
        if (this.resourcesById[resource.id]) {
            return false;
        }
        else {
            this.resourcesById[resource.id] = resource;
            for (var _i = 0, _a = resource.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.addResourceToIndex(child);
            }
            return true;
        }
    };
    ResourceManager.prototype.addResourceToTree = function (resource) {
        if (!resource.parent) {
            var siblings = void 0;
            var parentId = String(resource['parentId'] != null ? resource['parentId'] : '');
            if (parentId) {
                var parent_1 = this.resourcesById[parentId];
                if (parent_1) {
                    resource.parent = parent_1;
                    siblings = parent_1.children;
                }
                else {
                    return false;
                }
            }
            else {
                siblings = this.topLevelResources;
            }
            siblings.push(resource);
        }
        return true;
    };
    // Resource Removing
    // ------------------------------------------------------------------------------------------------------------------
    ResourceManager.prototype.removeResource = function (idOrResource) {
        var _this = this;
        var id = typeof idOrResource === 'object' ?
            idOrResource.id :
            idOrResource;
        if (this.fetching) {
            return this.fetching.then(function () {
                var resource = _this.removeResourceFromIndex(id);
                if (resource) {
                    _this.removeResourceFromTree(resource);
                    _this.trigger('remove', resource, _this.topLevelResources);
                }
                return resource;
            });
        }
        else {
            return fullcalendar_1.Promise.reject();
        }
    };
    ResourceManager.prototype.removeResourceFromIndex = function (resourceId) {
        var resource = this.resourcesById[resourceId];
        if (resource) {
            delete this.resourcesById[resourceId];
            for (var _i = 0, _a = resource.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.removeResourceFromIndex(child.id);
            }
            return resource;
        }
        else {
            return false;
        }
    };
    ResourceManager.prototype.removeResourceFromTree = function (resource, siblings) {
        if (siblings === void 0) { siblings = this.topLevelResources; }
        for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (sibling === resource) {
                resource.parent = null;
                siblings.splice(i, 1);
                return true;
            }
            if (this.removeResourceFromTree(resource, sibling.children)) {
                return true;
            }
        }
        return false;
    };
    // Resource Data Utils
    // ------------------------------------------------------------------------------------------------------------------
    ResourceManager.prototype.buildResource = function (resourceInput) {
        var _this = this;
        var resource = $.extend({}, resourceInput);
        var rawClassName = resourceInput.eventClassName;
        resource.id = String(resourceInput.id != null ?
            resourceInput.id :
            '_fc' + (ResourceManager.resourceGuid++));
        // TODO: consolidate repeat logic
        resource.eventClassName = (function () {
            switch ($.type(rawClassName)) {
                case 'string':
                    return rawClassName.split(/\s+/);
                case 'array':
                    return rawClassName;
                default:
                    return [];
            }
        })();
        if (resourceInput.businessHours) {
            resource.businessHourGenerator = new fullcalendar_1.BusinessHourGenerator(resourceInput.businessHours, this.calendar);
        }
        resource.children = (resourceInput.children || []).map(function (childInput) {
            var child = _this.buildResource(childInput);
            child.parent = resource;
            return child;
        });
        return resource;
    };
    ResourceManager.resourceGuid = 1;
    ResourceManager.ajaxDefaults = {
        dataType: 'json',
        cache: false
    };
    return ResourceManager;
}(fullcalendar_1.Class));
exports.default = ResourceManager;
fullcalendar_1.EmitterMixin.mixInto(ResourceManager);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var Resource_1 = __webpack_require__(19);
var ResourceComponentFootprint_1 = __webpack_require__(6);
var origMethods = {
    getPeerEventInstances: fullcalendar_1.Constraints.prototype.getPeerEventInstances,
    isFootprintAllowed: fullcalendar_1.Constraints.prototype.isFootprintAllowed,
    buildCurrentBusinessFootprints: fullcalendar_1.Constraints.prototype.buildCurrentBusinessFootprints,
    footprintContainsFootprint: fullcalendar_1.Constraints.prototype.footprintContainsFootprint,
    footprintsIntersect: fullcalendar_1.Constraints.prototype.footprintsIntersect,
    eventRangeToEventFootprints: fullcalendar_1.Constraints.prototype.eventRangeToEventFootprints,
    parseFootprints: fullcalendar_1.Constraints.prototype.parseFootprints
};
fullcalendar_1.Constraints.prototype.getPeerEventInstances = function (subjectEventDef) {
    var subjectResourceIds = subjectEventDef.getResourceIds();
    var peerInstances = origMethods.getPeerEventInstances.apply(this, arguments);
    if (!subjectResourceIds.length) {
        return peerInstances;
    }
    else {
        return peerInstances.filter(function (peerInstance) {
            // always consider non-resource events to be peers
            if (!peerInstance.def.resourceIds.length) {
                return true;
            }
            // has same resource? consider it a peer
            for (var _i = 0, subjectResourceIds_1 = subjectResourceIds; _i < subjectResourceIds_1.length; _i++) {
                var resourceId = subjectResourceIds_1[_i];
                if (peerInstance.def.hasResourceId(resourceId)) {
                    return true;
                }
            }
            return false;
        });
    }
};
// enforce resource ID constraint
fullcalendar_1.Constraints.prototype.isFootprintAllowed = function (footprint, peerEventFootprints, constraintVal, overlapVal, subjectEventInstance) {
    if (typeof constraintVal === 'object') {
        var constrainToResourceIds = Resource_1.default.extractIds(constraintVal, this);
        if (constrainToResourceIds.length && (!(footprint instanceof ResourceComponentFootprint_1.default) ||
            $.inArray(footprint.resourceId, constrainToResourceIds) === -1)) {
            return false;
        }
    }
    return origMethods.isFootprintAllowed.apply(this, arguments);
};
fullcalendar_1.Constraints.prototype.buildCurrentBusinessFootprints = function (isAllDay) {
    var flatResources = this._calendar.resourceManager.getFlatResources();
    var anyCustomBusinessHours = false;
    // any per-resource business hours? or will one global businessHours suffice?
    for (var _i = 0, flatResources_1 = flatResources; _i < flatResources_1.length; _i++) {
        var resource = flatResources_1[_i];
        if (resource.businessHourGenerator) {
            anyCustomBusinessHours = true;
        }
    }
    // if there are any custom business hours, all business hours must be sliced per-resources
    if (anyCustomBusinessHours) {
        var view = this._calendar.view;
        var generalBusinessHourGenerator = view.get('businessHourGenerator');
        var unzonedRange = view.dateProfile.activeUnzonedRange;
        var componentFootprints = [];
        for (var _a = 0, flatResources_2 = flatResources; _a < flatResources_2.length; _a++) {
            var resource = flatResources_2[_a];
            var businessHourGenerator = resource.businessHourGenerator || generalBusinessHourGenerator;
            var eventInstanceGroup = businessHourGenerator.buildEventInstanceGroup(isAllDay, unzonedRange);
            if (eventInstanceGroup) {
                for (var _b = 0, _c = eventInstanceGroup.getAllEventRanges(); _b < _c.length; _b++) {
                    var eventRange = _c[_b];
                    componentFootprints.push(new ResourceComponentFootprint_1.default(eventRange.unzonedRange, isAllDay, // isAllDay
                    resource.id));
                }
            }
        }
        return componentFootprints;
    }
    else {
        return origMethods.buildCurrentBusinessFootprints.apply(this, arguments);
    }
};
fullcalendar_1.Constraints.prototype.footprintContainsFootprint = function (outerFootprint, innerFootprint) {
    if (outerFootprint instanceof ResourceComponentFootprint_1.default &&
        (!(innerFootprint instanceof ResourceComponentFootprint_1.default) ||
            (innerFootprint.resourceId !== outerFootprint.resourceId))) {
        return false;
    }
    return origMethods.footprintContainsFootprint.apply(this, arguments);
};
fullcalendar_1.Constraints.prototype.footprintsIntersect = function (footprint0, footprint1) {
    if (footprint0 instanceof ResourceComponentFootprint_1.default &&
        footprint1 instanceof ResourceComponentFootprint_1.default &&
        (footprint0.resourceId !== footprint1.resourceId)) {
        return false;
    }
    return origMethods.footprintsIntersect.apply(this, arguments);
};
/*
TODO: somehow more DRY with DateComponent::eventRangeToEventFootprints monkeypatch
*/
fullcalendar_1.Constraints.prototype.eventRangeToEventFootprints = function (eventRange) {
    var eventDef = eventRange.eventDef;
    var resourceIds = eventDef.getResourceIds();
    if (resourceIds.length) {
        return resourceIds.map(function (resourceId) { return (new fullcalendar_1.EventFootprint(new ResourceComponentFootprint_1.default(eventRange.unzonedRange, eventDef.isAllDay(), resourceId), eventDef, eventRange.eventInstance // might not exist
        )); });
    }
    else {
        return origMethods.eventRangeToEventFootprints.apply(this, arguments);
    }
};
fullcalendar_1.Constraints.prototype.parseFootprints = function (input) {
    var plainFootprints = origMethods.parseFootprints.apply(this, arguments);
    var resourceIds = input.resourceIds || [];
    if (input.resourceId) {
        resourceIds = [input.resourceId].concat(resourceIds);
    }
    if (resourceIds.length) {
        var footprints = [];
        for (var _i = 0, resourceIds_1 = resourceIds; _i < resourceIds_1.length; _i++) {
            var resourceId = resourceIds_1[_i];
            for (var _a = 0, plainFootprints_1 = plainFootprints; _a < plainFootprints_1.length; _a++) {
                var plainFootprint = plainFootprints_1[_a];
                footprints.push(new ResourceComponentFootprint_1.default(plainFootprint.unzonedRange, plainFootprint.isAllDay, resourceId));
            }
        }
        return footprints;
    }
    else {
        return plainFootprints;
    }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var license_1 = __webpack_require__(52);
// pre-monkeypatch methods
var origMethods = {
    setElement: fullcalendar_1.View.prototype.setElement,
    removeElement: fullcalendar_1.View.prototype.removeElement,
    triggerViewRender: fullcalendar_1.View.prototype.triggerViewRender
};
// new properties
fullcalendar_1.View.prototype.canHandleSpecificResources = false;
// View Rendering
// --------------------------------------------------------------------------------------------------
fullcalendar_1.View.prototype.setElement = function () {
    origMethods.setElement.apply(this, arguments);
    this.watchResources(); // do after have the el, because might render, which assumes a render skeleton
};
fullcalendar_1.View.prototype.removeElement = function () {
    this.unwatchResources();
    origMethods.removeElement.apply(this, arguments);
};
// Show the warning even for non-resource views
// inject license key before 'viewRender' which is called by super's afterBaseDisplay
fullcalendar_1.View.prototype.triggerViewRender = function () {
    license_1.processLicenseKey(this.opt('schedulerLicenseKey'), this.el // container element
    );
    origMethods.triggerViewRender.apply(this, arguments);
};
// Resource Binding
// --------------------------------------------------------------------------------------------------
fullcalendar_1.View.prototype.watchResources = function () {
    var _this = this;
    var initialDepNames = [];
    var bindingDepNames = ['initialResources'];
    if (this.opt('refetchResourcesOnNavigate')) {
        initialDepNames.push('dateProfile');
    }
    if (this.opt('filterResourcesWithEvents')) {
        bindingDepNames.push('currentEvents');
    }
    this.watch('initialResources', initialDepNames, function (deps) {
        return _this.getInitialResources(deps.dateProfile); // promise
    });
    this.watch('bindingResources', bindingDepNames, function (deps) {
        _this.bindResourceChanges(deps.currentEvents);
        _this.setResources(deps.initialResources, deps.currentEvents);
    }, function () {
        _this.unbindResourceChanges();
        _this.unsetResources();
    });
};
fullcalendar_1.View.prototype.unwatchResources = function () {
    this.unwatch('initialResources');
    this.unwatch('bindingResources');
};
// dateProfile is optional
fullcalendar_1.View.prototype.getInitialResources = function (dateProfile) {
    var calendar = this.calendar;
    if (dateProfile) {
        return calendar.resourceManager.getResources(calendar.msToMoment(dateProfile.activeUnzonedRange.startMs, dateProfile.isRangeAllDay), calendar.msToMoment(dateProfile.activeUnzonedRange.endMs, dateProfile.isRangeAllDay));
    }
    else {
        return calendar.resourceManager.getResources();
    }
};
// eventsPayload is optional
fullcalendar_1.View.prototype.bindResourceChanges = function (eventsPayload) {
    var _this = this;
    this.listenTo(this.calendar.resourceManager, {
        set: function (resources) {
            _this.setResources(resources, eventsPayload);
        },
        unset: function () {
            _this.unsetResources();
        },
        reset: function (resources) {
            _this.resetResources(resources, eventsPayload);
        },
        add: function (resource, allResources) {
            _this.addResource(resource, allResources, eventsPayload);
        },
        remove: function (resource, allResources) {
            _this.removeResource(resource, allResources, eventsPayload);
        }
    });
};
fullcalendar_1.View.prototype.unbindResourceChanges = function () {
    this.stopListeningTo(this.calendar.resourceManager);
};
// Event Rendering
// --------------------------------------------------------------------------------------------------
fullcalendar_1.View.watch('displayingEvents', ['displayingDates', 'hasEvents', 'currentResources'], function (deps) {
    this.requestEventsRender(this.get('currentEvents'));
}, function () {
    this.requestEventsUnrender();
});
// Resource Data
// --------------------------------------------------------------------------------------------------
// currentEvents is optional
fullcalendar_1.View.prototype.setResources = function (resources, eventsPayload) {
    if (eventsPayload) {
        resources = this.filterResourcesWithEvents(resources, eventsPayload);
    }
    this.set('currentResources', resources);
    this.set('hasResources', true);
};
fullcalendar_1.View.prototype.unsetResources = function () {
    this.unset('currentResources');
    this.unset('hasResources');
};
// eventsPayload is optional
fullcalendar_1.View.prototype.resetResources = function (resources, eventsPayload) {
    this.startBatchRender();
    this.unsetResources();
    this.setResources(resources, eventsPayload);
    this.stopBatchRender();
};
// eventsPayload is optional
fullcalendar_1.View.prototype.addResource = function (resource, allResources, eventsPayload) {
    if (!this.canHandleSpecificResources) {
        this.resetResources(allResources, eventsPayload);
        return;
    }
    if (eventsPayload) {
        var a = this.filterResourcesWithEvents([resource], eventsPayload);
        if (!a.length) {
            resource = null;
        }
    }
    if (resource) {
        this.set('currentResources', allResources); // TODO: filter against eventsPayload?
        this.handleResourceAdd(resource);
    }
};
fullcalendar_1.View.prototype.removeResource = function (resource, allResources, eventsPayload) {
    if (!this.canHandleSpecificResources) {
        this.resetResources(allResources, eventsPayload);
        return;
    }
    this.set('currentResources', allResources); // TODO: filter against eventsPayload?
    this.handleResourceRemove(resource);
};
// Resource Change Handling
// --------------------------------------------------------------------------------------------------
fullcalendar_1.View.prototype.handleResourceAdd = function (resource) {
    // subclasses should implement
};
fullcalendar_1.View.prototype.handleResourceRemove = function (resource) {
    // subclasses should implement
};
// Resource Filtering
// ------------------------------------------------------------------------------------------------------------------
fullcalendar_1.View.prototype.filterResourcesWithEvents = function (resources, eventsPayload) {
    var eventRanges = this.eventsPayloadToRanges(eventsPayload);
    var resourceIdHits = {};
    for (var _i = 0, eventRanges_1 = eventRanges; _i < eventRanges_1.length; _i++) {
        var eventRange = eventRanges_1[_i];
        for (var _a = 0, _b = eventRange.eventDef.getResourceIds(); _a < _b.length; _a++) {
            var resourceId = _b[_a];
            resourceIdHits[resourceId] = true;
        }
    }
    return _filterResourcesWithEvents(resources, resourceIdHits);
};
fullcalendar_1.View.prototype.eventsPayloadToRanges = function (eventsPayload) {
    var dateProfile = this._getDateProfile();
    var allEventRanges = [];
    for (var eventDefId in eventsPayload) {
        var instanceGroup = eventsPayload[eventDefId];
        var eventRanges = instanceGroup.sliceRenderRanges(dateProfile.activeUnzonedRange);
        allEventRanges.push.apply(allEventRanges, (eventRanges || []));
    }
    return allEventRanges;
};
// provides a new structure with masked objects
function _filterResourcesWithEvents(sourceResources, resourceIdHits) {
    var filteredResources = [];
    for (var _i = 0, sourceResources_1 = sourceResources; _i < sourceResources_1.length; _i++) {
        var sourceResource = sourceResources_1[_i];
        if (sourceResource.children.length) {
            var filteredChildren = _filterResourcesWithEvents(sourceResource.children, resourceIdHits);
            if (filteredChildren.length || resourceIdHits[sourceResource.id]) {
                var filteredResource = Object.create(sourceResource); // mask
                filteredResource.children = filteredChildren;
                filteredResources.push(filteredResource);
            }
        }
        else {
            if (resourceIdHits[sourceResource.id]) {
                filteredResources.push(sourceResource);
            }
        }
    }
    return filteredResources;
}


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var moment = __webpack_require__(15);
var exportHooks = __webpack_require__(0);
var RELEASE_DATE = '2017-12-18'; // for Scheduler
var UPGRADE_WINDOW = { years: 1, weeks: 1 }; // 1 week leeway, for tz shift reasons too
var LICENSE_INFO_URL = 'http://fullcalendar.io/scheduler/license/';
var PRESET_LICENSE_KEYS = [
    'GPL-My-Project-Is-Open-Source',
    'CC-Attribution-NonCommercial-NoDerivatives'
];
function processLicenseKey(key, containerEl) {
    if (!isImmuneUrl(window.location.href) && !isValidKey(key)) {
        if (!detectWarningInContainer(containerEl)) {
            return renderingWarningInContainer('Please use a valid license key. <a href="' + LICENSE_INFO_URL + '">More Info</a>', containerEl);
        }
    }
}
exports.processLicenseKey = processLicenseKey;
/*
This decryption is not meant to be bulletproof. Just a way to remind about an upgrade.
*/
function isValidKey(key) {
    if ($.inArray(key, PRESET_LICENSE_KEYS) !== -1) {
        return true;
    }
    var parts = (key || '').match(/^(\d+)\-fcs\-(\d+)$/);
    if (parts && (parts[1].length === 10)) {
        var purchaseDate = moment.utc(parseInt(parts[2], 10) * 1000);
        var releaseDate = moment.utc(exportHooks.mockSchedulerReleaseDate || RELEASE_DATE);
        if (releaseDate.isValid()) {
            var minPurchaseDate = releaseDate.clone().subtract(UPGRADE_WINDOW);
            if (purchaseDate.isAfter(minPurchaseDate)) {
                return true;
            }
        }
    }
    return false;
}
exports.isValidKey = isValidKey;
function isImmuneUrl(url) {
    return /\w+\:\/\/fullcalendar\.io\/|\/demos\/[\w-]+\.html$/.test(url);
}
exports.isImmuneUrl = isImmuneUrl;
function renderingWarningInContainer(messageHtml, containerEl) {
    return containerEl.append($('<div class="fc-license-message" />').html(messageHtml));
}
exports.renderingWarningInContainer = renderingWarningInContainer;
// returns boolean of whether a license message is already rendered
function detectWarningInContainer(containerEl) {
    return containerEl.find('.fc-license-message').length >= 1;
}
exports.detectWarningInContainer = detectWarningInContainer;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ResourceComponentFootprint_1 = __webpack_require__(6);
// references to pre-monkeypatched methods
var origMethods = {
    eventRangeToEventFootprints: fullcalendar_1.DateComponent.prototype.eventRangeToEventFootprints
};
// configuration for subclasses
fullcalendar_1.DateComponent.prototype.isResourceFootprintsEnabled = false;
fullcalendar_1.DateComponent.prototype.eventRangeToEventFootprints = function (eventRange) {
    if (!this.isResourceFootprintsEnabled) {
        return origMethods.eventRangeToEventFootprints.apply(this, arguments);
    }
    else {
        var eventDef_1 = eventRange.eventDef;
        var resourceIds = eventDef_1.getResourceIds();
        if (resourceIds.length) {
            return resourceIds.map(function (resourceId) { return (new fullcalendar_1.EventFootprint(new ResourceComponentFootprint_1.default(eventRange.unzonedRange, eventDef_1.isAllDay(), resourceId), eventDef_1, eventRange.eventInstance // might not exist
            )); });
        }
        else if (eventDef_1.hasBgRendering()) {
            return origMethods.eventRangeToEventFootprints.apply(this, arguments);
        }
        else {
            return [];
        }
    }
};
// Resource Low-level Rendering
// ----------------------------------------------------------------------------------------------
// ResourceViewMixin wires these up
fullcalendar_1.DateComponent.prototype.renderResources = function (resources) {
    this.callChildren('renderResources', arguments);
};
fullcalendar_1.DateComponent.prototype.unrenderResources = function () {
    this.callChildren('unrenderResources', arguments);
};
fullcalendar_1.DateComponent.prototype.renderResource = function (resource) {
    this.callChildren('renderResource', arguments);
};
fullcalendar_1.DateComponent.prototype.unrenderResource = function (resource) {
    this.callChildren('unrenderResource', arguments);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
// references to pre-monkeypatched methods
var origMethods = {
    isEventDefDraggable: fullcalendar_1.InteractiveDateComponent.prototype.isEventDefDraggable
};
// configuration for subclasses
// whether we should attempt to render selections or resizes that span across different resources
fullcalendar_1.InteractiveDateComponent.prototype.allowCrossResource = true;
// ^ is this worth the complexity?
// if an event's dates are not draggable, but it's resource IS, still allow dragging
fullcalendar_1.InteractiveDateComponent.prototype.isEventDefDraggable = function (eventDef) {
    return this.isEventDefResourceEditable(eventDef) ||
        origMethods.isEventDefDraggable.call(this, eventDef);
};
fullcalendar_1.InteractiveDateComponent.prototype.isEventDefResourceEditable = function (eventDef) {
    var bool = eventDef.resourceEditable;
    if (bool == null) {
        bool = (eventDef.source || {}).resourceEditable;
        if (bool == null) {
            bool = this.opt('eventResourceEditable');
            if (bool == null) {
                bool = this.isEventDefGenerallyEditable(eventDef);
            }
        }
    }
    return bool;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
// references to pre-monkeypatched methods
var origMethods = {
    getFallbackStylingObjs: fullcalendar_1.EventRenderer.prototype.getFallbackStylingObjs
};
fullcalendar_1.EventRenderer.prototype.designatedResource = null; // optionally set by caller. forces @currentResource
fullcalendar_1.EventRenderer.prototype.currentResource = null; // when set, will affect future rendered segs
fullcalendar_1.EventRenderer.prototype.beforeFgSegHtml = function (seg) {
    var segResourceId = seg.footprint.componentFootprint.resourceId;
    if (this.designatedResource) {
        this.currentResource = this.designatedResource;
    }
    else if (segResourceId) {
        this.currentResource = queryResourceObject(this, segResourceId);
    }
    else {
        this.currentResource = null;
    }
};
fullcalendar_1.EventRenderer.prototype.getFallbackStylingObjs = function (eventDef) {
    var objs = origMethods.getFallbackStylingObjs.apply(this, arguments);
    if (this.currentResource) {
        objs.unshift(this.currentResource);
    }
    else {
        var resources = [];
        for (var _i = 0, _a = eventDef.getResourceIds(); _i < _a.length; _i++) {
            var id = _a[_i];
            var resource = queryResourceObject(this, id);
            if (resource) {
                resources.push(resource);
            }
        }
        objs = resources.concat(objs);
    }
    return objs;
};
function queryResourceObject(eventRenderer, id) {
    return eventRenderer.view.calendar.resourceManager.getResourceById(id);
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ResourceComponentFootprint_1 = __webpack_require__(6);
// references to pre-monkeypatched methods
var origMethods = {
    computeSelectionFootprint: fullcalendar_1.DateSelecting.prototype.computeSelectionFootprint
};
fullcalendar_1.DateSelecting.prototype.computeSelectionFootprint = function (startFootprint, endFootprint) {
    if (startFootprint.resourceId && endFootprint.resourceId &&
        (startFootprint.resourceId !== endFootprint.resourceId) &&
        !this.component.allowCrossResource) {
        return null; // explicity disallow selection across two different resources
    }
    else {
        var footprint = origMethods.computeSelectionFootprint.apply(this, arguments);
        if (startFootprint.resourceId) {
            // create a new footprint with resourceId data
            footprint = new ResourceComponentFootprint_1.default(footprint.unzonedRange, footprint.isAllDay, startFootprint.resourceId);
        }
        return footprint;
    }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
// references to pre-monkeypatched methods
var origMethods = {
    computeEventDropMutation: fullcalendar_1.EventDragging.prototype.computeEventDropMutation
};
/*
monkeypatching can cause an event to seem draggable if the resource is editable but the
start/end dates are NOT. make sure to account for this.
*/
fullcalendar_1.EventDragging.prototype.computeEventDropMutation = function (startFootprint, endFootprint, eventDef) {
    var isDatesDraggable = this.component.isEventDefStartEditable(eventDef);
    if (startFootprint.resourceId && endFootprint.resourceId &&
        (startFootprint.resourceId !== endFootprint.resourceId) &&
        this.component.isEventDefResourceEditable(eventDef)) {
        var mutation = new fullcalendar_1.EventDefMutation();
        mutation.oldResourceId = startFootprint.resourceId;
        mutation.newResourceId = endFootprint.resourceId;
        if (isDatesDraggable) {
            mutation.setDateMutation(this.computeEventDateMutation(startFootprint, endFootprint));
        }
        return mutation;
    }
    else if (isDatesDraggable) {
        return origMethods.computeEventDropMutation.apply(this, arguments);
    }
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
// references to pre-monkeypatched methods
var origMethods = {
    computeEventStartResizeMutation: fullcalendar_1.EventResizing.prototype.computeEventStartResizeMutation,
    computeEventEndResizeMutation: fullcalendar_1.EventResizing.prototype.computeEventEndResizeMutation
};
fullcalendar_1.EventResizing.prototype.computeEventStartResizeMutation = function (startFootprint, endFootprint, origEventFootprint) {
    if (startFootprint.resourceId && endFootprint.resourceId &&
        (startFootprint.resourceId !== endFootprint.resourceId) &&
        !this.component.allowCrossResource) {
        return null; // explicity disallow resizing across two different resources
    }
    else {
        return origMethods.computeEventStartResizeMutation.apply(this, arguments);
    }
};
fullcalendar_1.EventResizing.prototype.computeEventEndResizeMutation = function (startFootprint, endFootprint, origEventFootprint) {
    if (startFootprint.resourceId && endFootprint.resourceId &&
        (startFootprint.resourceId !== endFootprint.resourceId) &&
        !this.component.allowCrossResource) {
        return null; // explicity disallow resizing across two different resources
    }
    else {
        return origMethods.computeEventEndResizeMutation.apply(this, arguments);
    }
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
// references to pre-monkeypatched methods
var origMethods = {
    computeExternalDrop: fullcalendar_1.ExternalDropping.prototype.computeExternalDrop
};
fullcalendar_1.ExternalDropping.prototype.computeExternalDrop = function (componentFootprint, meta) {
    var eventDef = origMethods.computeExternalDrop.apply(this, arguments);
    if (componentFootprint.resourceId) {
        eventDef.addResourceId(componentFootprint.resourceId);
    }
    return eventDef;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
// defineStandardProps won't work :(
// TODO: find a better way
fullcalendar_1.EventSource.prototype.standardPropMap.resourceEditable = true; // automatically transfer


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(2);
var fullcalendar_1 = __webpack_require__(0);
var Resource_1 = __webpack_require__(19);
var origMethods = {
    applyMiscProps: fullcalendar_1.EventDef.prototype.applyMiscProps,
    clone: fullcalendar_1.EventDef.prototype.clone,
    toLegacy: fullcalendar_1.EventDef.prototype.toLegacy
};
fullcalendar_1.EventDef.defineStandardProps({
    resourceEditable: true // automatically transfer
});
/*
new class members
*/
fullcalendar_1.EventDef.prototype.resourceIds = null;
fullcalendar_1.EventDef.prototype.resourceEditable = null; // `null` is unspecified state
/*
NOTE: we can use defineStandardProps/applyManualStandardProps (example below)
once we do away with the deprecated eventResourceField.
*/
fullcalendar_1.EventDef.prototype.applyMiscProps = function (rawProps) {
    rawProps = $.extend({}, rawProps); // clone, because of delete
    this.resourceIds = Resource_1.default.extractIds(rawProps, this.source.calendar);
    delete rawProps.resourceId;
    delete rawProps.resourceIds;
    origMethods.applyMiscProps.apply(this, arguments);
};
/*
EventDef.defineStandardProps({
  resourceId: false # manually handle
  resourceIds: false # manually handle
});
EventDef.prototype.applyManualStandardProps = function(rawProps) {
  origApplyManualStandardProps.apply(this, arguments);
  this.resourceIds = Resource.extractIds(rawProps, this.source.calendar);
};
*/
/*
resourceId should already be normalized
*/
fullcalendar_1.EventDef.prototype.hasResourceId = function (resourceId) {
    return $.inArray(resourceId, this.resourceIds) !== -1;
};
/*
resourceId should already be normalized
*/
fullcalendar_1.EventDef.prototype.removeResourceId = function (resourceId) {
    fullcalendar_1.removeExact(this.resourceIds, resourceId);
};
/*
resourceId should already be normalized
*/
fullcalendar_1.EventDef.prototype.addResourceId = function (resourceId) {
    if (!this.hasResourceId(resourceId)) {
        this.resourceIds.push(resourceId);
    }
};
fullcalendar_1.EventDef.prototype.getResourceIds = function () {
    if (this.resourceIds) {
        return this.resourceIds.slice(); // clone
    }
    else {
        return [];
    }
};
fullcalendar_1.EventDef.prototype.clone = function () {
    var def = origMethods.clone.apply(this, arguments);
    def.resourceIds = this.getResourceIds();
    return def;
};
fullcalendar_1.EventDef.prototype.toLegacy = function () {
    var obj = origMethods.toLegacy.apply(this, arguments);
    var resourceIds = this.getResourceIds();
    obj.resourceId =
        resourceIds.length === 1 ?
            resourceIds[0] :
            null;
    obj.resourceIds =
        resourceIds.length > 1 ?
            resourceIds :
            null;
    if (this.resourceEditable != null) {
        obj.resourceEditable = this.resourceEditable;
    }
    return obj;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var oldMutateSingle = fullcalendar_1.EventDefMutation.prototype.mutateSingle;
// either both will be set, or neither will be set
fullcalendar_1.EventDefMutation.prototype.oldResourceId = null;
fullcalendar_1.EventDefMutation.prototype.newResourceId = null;
fullcalendar_1.EventDefMutation.prototype.mutateSingle = function (eventDef) {
    var undo = oldMutateSingle.apply(this, arguments);
    var savedResourceIds = null;
    if (this.oldResourceId && eventDef.hasResourceId(this.oldResourceId)) {
        savedResourceIds = eventDef.getResourceIds();
        eventDef.removeResourceId(this.oldResourceId);
        eventDef.addResourceId(this.newResourceId);
    }
    return function () {
        undo();
        if (savedResourceIds) {
            eventDef.resourceIds = savedResourceIds;
        }
    };
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var TimelineView_1 = __webpack_require__(14);
fullcalendar_1.defineView('timeline', {
    class: TimelineView_1.default,
    defaults: {
        eventResizableFromStart: true
    }
});
fullcalendar_1.defineView('timelineDay', {
    type: 'timeline',
    duration: { days: 1 }
});
fullcalendar_1.defineView('timelineWeek', {
    type: 'timeline',
    duration: { weeks: 1 }
});
fullcalendar_1.defineView('timelineMonth', {
    type: 'timeline',
    duration: { months: 1 }
});
fullcalendar_1.defineView('timelineYear', {
    type: 'timeline',
    duration: { years: 1 }
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ResourceTimelineView_1 = __webpack_require__(30);
fullcalendar_1.getViewConfig('timeline').resourceClass = ResourceTimelineView_1.default;
fullcalendar_1.Calendar.defaults.resourcesInitiallyExpanded = true;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ResourceBasicView_1 = __webpack_require__(22);
var ResourceMonthView_1 = __webpack_require__(23);
// TODO: make more DRY (with agenda's config too)
fullcalendar_1.getViewConfig('basic').queryResourceClass = function (viewSpec) {
    var explicitGrouping = viewSpec.options.groupByResource ||
        viewSpec.options.groupByDateAndResource;
    var showsResources = false;
    if (explicitGrouping != null) {
        showsResources = explicitGrouping;
    }
    else if (viewSpec.duration) {
        showsResources = viewSpec.duration.as('days') === 1;
    }
    if (showsResources) {
        return ResourceBasicView_1.default;
    }
};
fullcalendar_1.getViewConfig('month').queryResourceClass = function (viewSpec) {
    if (viewSpec.options.groupByResource ||
        viewSpec.options.groupByDateAndResource) {
        return ResourceMonthView_1.default;
    }
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var fullcalendar_1 = __webpack_require__(0);
var ResourceAgendaView_1 = __webpack_require__(20);
/*
TODO: make more DRY, with basic's config
*/
fullcalendar_1.getViewConfig('agenda').queryResourceClass = function (viewSpec) {
    var explicitGrouping = viewSpec.options.groupByResource ||
        viewSpec.options.groupByDateAndResource;
    var showsResources = false;
    if (explicitGrouping != null) {
        showsResources = explicitGrouping;
    }
    else if (viewSpec.duration) {
        showsResources = viewSpec.duration.as('days') === 1;
    }
    if (showsResources) {
        return ResourceAgendaView_1.default;
    }
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 68 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });


/***/ })
/******/ ]);
});