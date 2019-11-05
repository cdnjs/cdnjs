/*!
FullCalendar Resource Time Grid Plugin v4.2.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2019 Adam Shaw
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fullcalendar/core'), require('@fullcalendar/resource-common'), require('@fullcalendar/timegrid'), require('@fullcalendar/resource-daygrid')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fullcalendar/core', '@fullcalendar/resource-common', '@fullcalendar/timegrid', '@fullcalendar/resource-daygrid'], factory) :
    (global = global || self, factory(global.FullCalendarResourceTimeGrid = {}, global.FullCalendar, global.FullCalendarResourceCommon, global.FullCalendarTimeGrid, global.FullCalendarResourceDayGrid));
}(this, function (exports, core, ResourceCommonPlugin, TimeGridPlugin, resourceDaygrid) { 'use strict';

    var ResourceCommonPlugin__default = 'default' in ResourceCommonPlugin ? ResourceCommonPlugin['default'] : ResourceCommonPlugin;
    var TimeGridPlugin__default = 'default' in TimeGridPlugin ? TimeGridPlugin['default'] : TimeGridPlugin;

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

    var ResourceTimeGrid = /** @class */ (function (_super) {
        __extends(ResourceTimeGrid, _super);
        function ResourceTimeGrid(context, timeGrid) {
            var _this = _super.call(this, context, timeGrid.el) || this;
            _this.buildDayRanges = core.memoize(TimeGridPlugin.buildDayRanges);
            _this.splitter = new ResourceCommonPlugin.VResourceSplitter();
            _this.slicers = {};
            _this.joiner = new ResourceTimeGridJoiner();
            _this.timeGrid = timeGrid;
            context.calendar.registerInteractiveComponent(_this, {
                el: _this.timeGrid.el
            });
            return _this;
        }
        ResourceTimeGrid.prototype.destroy = function () {
            this.calendar.unregisterInteractiveComponent(this);
        };
        ResourceTimeGrid.prototype.render = function (props) {
            var _this = this;
            var timeGrid = this.timeGrid;
            var dateProfile = props.dateProfile, resourceDayTable = props.resourceDayTable;
            var dayRanges = this.dayRanges = this.buildDayRanges(resourceDayTable.dayTable, dateProfile, this.dateEnv);
            var splitProps = this.splitter.splitProps(props);
            this.slicers = core.mapHash(splitProps, function (split, resourceId) {
                return _this.slicers[resourceId] || new TimeGridPlugin.TimeGridSlicer();
            });
            var slicedProps = core.mapHash(this.slicers, function (slicer, resourceId) {
                return slicer.sliceProps(splitProps[resourceId], dateProfile, null, timeGrid, dayRanges);
            });
            timeGrid.allowAcrossResources = dayRanges.length === 1;
            timeGrid.receiveProps(__assign({}, this.joiner.joinProps(slicedProps, resourceDayTable), { dateProfile: dateProfile, cells: resourceDayTable.cells[0] }));
        };
        ResourceTimeGrid.prototype.renderNowIndicator = function (date) {
            var timeGrid = this.timeGrid;
            var resourceDayTable = this.props.resourceDayTable;
            var nonResourceSegs = this.slicers[''].sliceNowDate(date, timeGrid, this.dayRanges);
            var segs = this.joiner.expandSegs(resourceDayTable, nonResourceSegs);
            timeGrid.renderNowIndicator(segs, date);
        };
        ResourceTimeGrid.prototype.buildPositionCaches = function () {
            this.timeGrid.buildPositionCaches();
        };
        ResourceTimeGrid.prototype.queryHit = function (positionLeft, positionTop) {
            var rawHit = this.timeGrid.positionToHit(positionLeft, positionTop);
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
                        left: rawHit.relativeRect.left,
                        right: rawHit.relativeRect.right,
                        top: rawHit.relativeRect.top,
                        bottom: rawHit.relativeRect.bottom
                    },
                    layer: 0
                };
            }
        };
        return ResourceTimeGrid;
    }(core.DateComponent));
    var ResourceTimeGridJoiner = /** @class */ (function (_super) {
        __extends(ResourceTimeGridJoiner, _super);
        function ResourceTimeGridJoiner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResourceTimeGridJoiner.prototype.transformSeg = function (seg, resourceDayTable, resourceI) {
            return [
                __assign({}, seg, { col: resourceDayTable.computeCol(seg.col, resourceI) })
            ];
        };
        return ResourceTimeGridJoiner;
    }(ResourceCommonPlugin.VResourceJoiner));

    var ResourceTimeGridView = /** @class */ (function (_super) {
        __extends(ResourceTimeGridView, _super);
        function ResourceTimeGridView(context, viewSpec, dateProfileGenerator, parentEl) {
            var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
            _this.flattenResources = core.memoize(ResourceCommonPlugin.flattenResources);
            _this.buildResourceDayTable = core.memoize(buildResourceDayTable);
            _this.resourceOrderSpecs = core.parseFieldSpecs(_this.opt('resourceOrder'));
            if (_this.opt('columnHeader')) {
                _this.header = new ResourceCommonPlugin.ResourceDayHeader(_this.context, _this.el.querySelector('.fc-head-container'));
            }
            _this.resourceTimeGrid = new ResourceTimeGrid(context, _this.timeGrid);
            if (_this.dayGrid) {
                _this.resourceDayGrid = new resourceDaygrid.ResourceDayGrid(context, _this.dayGrid);
            }
            return _this;
        }
        ResourceTimeGridView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.header) {
                this.header.destroy();
            }
            this.resourceTimeGrid.destroy();
            if (this.resourceDayGrid) {
                this.resourceDayGrid.destroy();
            }
        };
        ResourceTimeGridView.prototype.render = function (props) {
            _super.prototype.render.call(this, props); // for flags for updateSize
            var splitProps = this.splitter.splitProps(props);
            var resources = this.flattenResources(props.resourceStore, this.resourceOrderSpecs);
            var resourceDayTable = this.buildResourceDayTable(this.props.dateProfile, this.dateProfileGenerator, resources, this.opt('datesAboveResources'));
            if (this.header) {
                this.header.receiveProps({
                    resources: resources,
                    dates: resourceDayTable.dayTable.headerDates,
                    dateProfile: props.dateProfile,
                    datesRepDistinctDays: true,
                    renderIntroHtml: this.renderHeadIntroHtml
                });
            }
            this.resourceTimeGrid.receiveProps(__assign({}, splitProps['timed'], { dateProfile: props.dateProfile, resourceDayTable: resourceDayTable }));
            if (this.resourceDayGrid) {
                this.resourceDayGrid.receiveProps(__assign({}, splitProps['allDay'], { dateProfile: props.dateProfile, resourceDayTable: resourceDayTable, isRigid: false, nextDayThreshold: this.nextDayThreshold }));
            }
        };
        ResourceTimeGridView.prototype.renderNowIndicator = function (date) {
            this.resourceTimeGrid.renderNowIndicator(date);
        };
        ResourceTimeGridView.needsResourceData = true; // for ResourceViewProps
        return ResourceTimeGridView;
    }(TimeGridPlugin.AbstractTimeGridView));
    function buildResourceDayTable(dateProfile, dateProfileGenerator, resources, datesAboveResources) {
        var dayTable = TimeGridPlugin.buildDayTable(dateProfile, dateProfileGenerator);
        return datesAboveResources ?
            new ResourceCommonPlugin.DayResourceTable(dayTable, resources) :
            new ResourceCommonPlugin.ResourceDayTable(dayTable, resources);
    }

    var main = core.createPlugin({
        deps: [ResourceCommonPlugin__default, TimeGridPlugin__default],
        defaultView: 'resourceTimeGridDay',
        views: {
            resourceTimeGrid: {
                class: ResourceTimeGridView,
                // TODO: wish we didn't have to C&P from timeGrid's file
                allDaySlot: true,
                slotDuration: '00:30:00',
                slotEventOverlap: true // a bad name. confused with overlap/constraint system
            },
            resourceTimeGridDay: {
                type: 'resourceTimeGrid',
                duration: { days: 1 }
            },
            resourceTimeGridWeek: {
                type: 'resourceTimeGrid',
                duration: { weeks: 1 }
            }
        }
    });

    exports.ResourceTimeGrid = ResourceTimeGrid;
    exports.ResourceTimeGridView = ResourceTimeGridView;
    exports.default = main;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
