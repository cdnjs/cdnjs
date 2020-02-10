/*!
FullCalendar Resource Timeline Plugin v4.2.0
Docs & License: https://fullcalendar.io/scheduler
(c) 2019 Adam Shaw
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fullcalendar/core'), require('@fullcalendar/timeline'), require('@fullcalendar/resource-common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fullcalendar/core', '@fullcalendar/timeline', '@fullcalendar/resource-common'], factory) :
    (global = global || self, factory(global.FullCalendarResourceTimeline = {}, global.FullCalendar, global.FullCalendarTimeline, global.FullCalendarResourceCommon));
}(this, function (exports, core, TimelinePlugin, ResourceCommonPlugin) { 'use strict';

    var TimelinePlugin__default = 'default' in TimelinePlugin ? TimelinePlugin['default'] : TimelinePlugin;
    var ResourceCommonPlugin__default = 'default' in ResourceCommonPlugin ? ResourceCommonPlugin['default'] : ResourceCommonPlugin;

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

    var Row = /** @class */ (function (_super) {
        __extends(Row, _super);
        function Row(context, spreadsheetParent, spreadsheetNextSibling, timeAxisParent, timeAxisNextSibling) {
            var _this = _super.call(this, context) || this;
            _this.isSizeDirty = false;
            spreadsheetParent.insertBefore(_this.spreadsheetTr = document.createElement('tr'), spreadsheetNextSibling);
            timeAxisParent.insertBefore(_this.timeAxisTr = document.createElement('tr'), timeAxisNextSibling);
            return _this;
        }
        Row.prototype.destroy = function () {
            core.removeElement(this.spreadsheetTr);
            core.removeElement(this.timeAxisTr);
            _super.prototype.destroy.call(this);
        };
        Row.prototype.updateSize = function (isResize) {
            this.isSizeDirty = false;
        };
        return Row;
    }(core.Component));

    function updateExpanderIcon(el, isExpanded) {
        var classList = el.classList;
        if (isExpanded) {
            classList.remove('fc-icon-plus-square');
            classList.add('fc-icon-minus-square');
        }
        else {
            classList.remove('fc-icon-minus-square');
            classList.add('fc-icon-plus-square');
        }
    }
    function clearExpanderIcon(el) {
        var classList = el.classList;
        classList.remove('fc-icon-minus-square');
        classList.remove('fc-icon-plus-square');
    }
    function updateTrResourceId(tr, resourceId) {
        tr.setAttribute('data-resource-id', resourceId);
    }

    var GroupRow = /** @class */ (function (_super) {
        __extends(GroupRow, _super);
        function GroupRow() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._renderCells = core.memoizeRendering(_this.renderCells, _this.unrenderCells);
            _this._updateExpanderIcon = core.memoizeRendering(_this.updateExpanderIcon, null, [_this._renderCells]);
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
            this.spreadsheetTr.appendChild(core.createElement('td', {
                className: 'fc-divider',
                colSpan: spreadsheetColCnt // span across all columns
            }, this.spreadsheetHeightEl = core.createElement('div', null, spreadsheetContentEl)) // needed by setTrInnerHeight
            );
            this.expanderIconEl = spreadsheetContentEl.querySelector('.fc-icon');
            this.expanderIconEl.parentElement.addEventListener('click', this.onExpanderClick);
            // insert a single cell, with a single empty <div>.
            // there will be no content
            this.timeAxisTr.appendChild(core.createElement('td', { className: 'fc-divider' }, this.timeAxisHeightEl = document.createElement('div')));
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
            var contentEl = core.htmlToElement('<div class="fc-cell-content">' +
                '<span class="fc-expander">' +
                '<span class="fc-icon"></span>' +
                '</span>' +
                '<span class="fc-cell-text">' +
                (text ? core.htmlEscape(text) : '&nbsp;') +
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
            updateExpanderIcon(this.expanderIconEl, isExpanded);
        };
        return GroupRow;
    }(Row));
    GroupRow.addEqualityFuncs({
        group: ResourceCommonPlugin.isGroupsEqual // HACK for ResourceTimelineView::renderRows
    });

    var SpreadsheetRow = /** @class */ (function (_super) {
        __extends(SpreadsheetRow, _super);
        function SpreadsheetRow(context, tr) {
            var _this = _super.call(this, context) || this;
            _this._renderRow = core.memoizeRendering(_this.renderRow, _this.unrenderRow);
            _this._updateTrResourceId = core.memoizeRendering(updateTrResourceId, null, [_this._renderRow]);
            _this._updateExpanderIcon = core.memoizeRendering(_this.updateExpanderIcon, null, [_this._renderRow]);
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
            var resourceFields = ResourceCommonPlugin.buildResourceFields(resource); // slightly inefficient. already done up the call stack
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
                    text = ResourceCommonPlugin.buildResourceTextFunc(colSpec.text, calendar)(resource);
                }
                var contentEl = core.htmlToElement('<div class="fc-cell-content">' +
                    (colSpec.isMain ? renderIconHtml(depth) : '') +
                    '<span class="fc-cell-text">' +
                    (text ? core.htmlEscape(text) : '&nbsp;') +
                    '</span>' +
                    '</div>');
                if (typeof colSpec.render === 'function') { // a filter function for the element
                    contentEl = colSpec.render(new ResourceCommonPlugin.ResourceApi(calendar, resource), contentEl) || contentEl;
                }
                if (rowSpan > 1) {
                    contentEl.classList.add('fc-sticky');
                }
                var td = core.createElement('td', {
                    className: theme.getClass('widgetContent'),
                    rowspan: rowSpan
                }, contentEl);
                // the first cell of the row needs to have an inner div for setTrInnerHeight
                if (colSpec.isMain) {
                    td.appendChild(this.heightEl = core.createElement('div', null, td.childNodes) // inner wrap
                    );
                    mainTd = td;
                }
                tr.appendChild(td);
            }
            this.expanderIconEl = tr.querySelector('.fc-expander-space .fc-icon');
            // wait until very end
            view.publiclyTrigger('resourceRender', [
                {
                    resource: new ResourceCommonPlugin.ResourceApi(calendar, resource),
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
            if (expanderIconEl &&
                expanderEl // why would this be null?? was the case in IE11
            ) {
                if (hasChildren) {
                    expanderEl.addEventListener('click', this.onExpanderClick);
                    expanderEl.classList.add('fc-expander');
                    updateExpanderIcon(expanderIconEl, isExpanded);
                }
                else {
                    expanderEl.removeEventListener('click', this.onExpanderClick);
                    expanderEl.classList.remove('fc-expander');
                    clearExpanderIcon(expanderIconEl);
                }
            }
        };
        return SpreadsheetRow;
    }(core.Component));
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

    var ResourceRow = /** @class */ (function (_super) {
        __extends(ResourceRow, _super);
        function ResourceRow(context, a, b, c, d, timeAxis) {
            var _this = _super.call(this, context, a, b, c, d) || this;
            _this._updateTrResourceId = core.memoizeRendering(updateTrResourceId);
            _this.spreadsheetRow = new SpreadsheetRow(context, _this.spreadsheetTr);
            _this.timeAxisTr.appendChild(core.createElement('td', { className: _this.theme.getClass('widgetContent') }, _this.innerContainerEl = document.createElement('div')));
            _this.lane = new TimelinePlugin.TimelineLane(context, _this.innerContainerEl, _this.innerContainerEl, timeAxis);
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
    }(Row));
    ResourceRow.addEqualityFuncs({
        rowSpans: core.isArraysEqual // HACK for isSizeDirty, ResourceTimelineView::renderRows
    });

    var COL_MIN_WIDTH = 30;
    var SpreadsheetHeader = /** @class */ (function (_super) {
        __extends(SpreadsheetHeader, _super);
        function SpreadsheetHeader(context, parentEl) {
            var _this = _super.call(this, context) || this;
            _this.resizables = [];
            _this.colWidths = [];
            _this.emitter = new core.EmitterMixin();
            parentEl.appendChild(_this.tableEl = core.createElement('table', {
                className: _this.theme.getClass('tableGrid')
            }));
            return _this;
        }
        SpreadsheetHeader.prototype.destroy = function () {
            for (var _i = 0, _a = this.resizables; _i < _a.length; _i++) {
                var resizable = _a[_i];
                resizable.destroy();
            }
            core.removeElement(this.tableEl);
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
                        core.htmlEscape(props.superHeaderText) +
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
                        core.htmlEscape(o.labelText || '') + // what about normalizing this value ahead of time?
                        '</span>' +
                        '</div>' +
                        (!isLast ? '<div class="fc-col-resizer"></div>' : '') +
                        '</div>' +
                        '</th>';
            }
            html += '</tr>';
            html += '</tbody>';
            this.tableEl.innerHTML = html;
            this.thEls = Array.prototype.slice.call(this.tableEl.querySelectorAll('th'));
            this.colEls = Array.prototype.slice.call(this.tableEl.querySelectorAll('col'));
            this.resizerEls = Array.prototype.slice.call(this.tableEl.querySelectorAll('.fc-col-resizer'));
            this.initColResizing();
        };
        SpreadsheetHeader.prototype.initColResizing = function () {
            var _this = this;
            var ElementDraggingImpl = this.calendar.pluginSystem.hooks.elementDraggingImpl;
            if (ElementDraggingImpl) {
                this.resizables = this.resizerEls.map(function (handleEl, colIndex) {
                    var dragging = new ElementDraggingImpl(handleEl);
                    var startWidth;
                    dragging.emitter.on('dragstart', function () {
                        startWidth = _this.colWidths[colIndex];
                        if (typeof startWidth !== 'number') {
                            startWidth = _this.thEls[colIndex].getBoundingClientRect().width;
                        }
                    });
                    dragging.emitter.on('dragmove', function (pev) {
                        _this.colWidths[colIndex] = Math.max(startWidth + pev.deltaX * (_this.isRtl ? -1 : 1), COL_MIN_WIDTH);
                        _this.emitter.trigger('colwidthchange', _this.colWidths);
                    });
                    dragging.setAutoScrollEnabled(false); // because gets weird with auto-scrolling time area
                    return dragging;
                });
            }
        };
        return SpreadsheetHeader;
    }(core.Component));

    var Spreadsheet = /** @class */ (function (_super) {
        __extends(Spreadsheet, _super);
        function Spreadsheet(context, headParentEl, bodyParentEl) {
            var _this = _super.call(this, context) || this;
            _this._renderCells = core.memoizeRendering(_this.renderCells, _this.unrenderCells);
            _this.layout = new TimelinePlugin.HeaderBodyLayout(headParentEl, bodyParentEl, 'clipped-scroll');
            var headerEnhancedScroller = _this.layout.headerScroller.enhancedScroll;
            var bodyEnhancedScroller = _this.layout.bodyScroller.enhancedScroll;
            _this.header = new SpreadsheetHeader(context, headerEnhancedScroller.canvas.contentEl);
            _this.header.emitter.on('colwidthchange', function (colWidths) {
                _this.applyColWidths(colWidths);
            });
            bodyEnhancedScroller.canvas.contentEl
                .appendChild(_this.bodyContainerEl = core.createElement('div', { className: 'fc-rows' }, '<table>' +
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
            this.bodyColEls = Array.prototype.slice.call(this.bodyColGroup.querySelectorAll('col'));
            this.applyColWidths(colSpecs.map(function (colSpec) { return colSpec.width; }));
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
        Spreadsheet.prototype.applyColWidths = function (colWidths) {
            var _this = this;
            colWidths.forEach(function (colWidth, colIndex) {
                var headEl = _this.header.colEls[colIndex]; // bad to access child
                var bodyEl = _this.bodyColEls[colIndex];
                var styleVal;
                if (typeof colWidth === 'number') {
                    styleVal = colWidth + 'px';
                }
                else if (typeof colWidth == null) {
                    styleVal = '';
                }
                headEl.style.width = bodyEl.style.width = styleVal;
            });
        };
        return Spreadsheet;
    }(core.Component));

    var MIN_RESOURCE_AREA_WIDTH = 30; // definitely bigger than scrollbars
    var ResourceTimelineView = /** @class */ (function (_super) {
        __extends(ResourceTimelineView, _super);
        function ResourceTimelineView(context, viewSpec, dateProfileGenerator, parentEl) {
            var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
            _this.isStickyScrollDirty = false;
            _this.rowNodes = [];
            _this.rowComponents = [];
            _this.rowComponentsById = {};
            _this.resourceAreaWidthDraggings = [];
            _this.splitter = new ResourceCommonPlugin.ResourceSplitter(); // doesn't let it do businessHours tho
            _this.hasResourceBusinessHours = core.memoize(hasResourceBusinessHours);
            _this.buildRowNodes = core.memoize(ResourceCommonPlugin.buildRowNodes);
            _this.hasNesting = core.memoize(hasNesting);
            _this._updateHasNesting = core.memoizeRendering(_this.updateHasNesting);
            var allColSpecs = _this.opt('resourceColumns') || [];
            var labelText = _this.opt('resourceLabelText'); // TODO: view.override
            var defaultLabelText = 'Resources'; // TODO: view.defaults
            var superHeaderText = null;
            if (!allColSpecs.length) {
                allColSpecs.push({
                    labelText: labelText || defaultLabelText,
                    text: ResourceCommonPlugin.buildResourceTextFunc(_this.opt('resourceText'), _this.calendar)
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
            var allOrderSpecs = core.parseFieldSpecs(_this.opt('resourceOrder'));
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
            _this.resourceAreaHeadEl = _this.el.querySelector('thead .fc-resource-area');
            _this.setResourceAreaWidth(_this.opt('resourceAreaWidth'));
            _this.initResourceAreaWidthDragging();
            _this.miscHeight = _this.el.offsetHeight;
            _this.spreadsheet = new Spreadsheet(_this.context, _this.resourceAreaHeadEl, _this.el.querySelector('tbody .fc-resource-area'));
            _this.timeAxis = new TimelinePlugin.TimeAxis(_this.context, _this.el.querySelector('thead .fc-time-area'), _this.el.querySelector('tbody .fc-time-area'));
            var timeAxisRowContainer = core.createElement('div', { className: 'fc-rows' }, '<table><tbody /></table>');
            _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.contentEl.appendChild(timeAxisRowContainer);
            _this.timeAxisTbody = timeAxisRowContainer.querySelector('tbody');
            _this.lane = new TimelinePlugin.TimelineLane(_this.context, null, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.bgEl, _this.timeAxis);
            _this.bodyScrollJoiner = new TimelinePlugin.ScrollJoiner('vertical', [
                _this.spreadsheet.layout.bodyScroller,
                _this.timeAxis.layout.bodyScroller
            ]);
            // after scrolljoiner
            _this.spreadsheetBodyStickyScroller = new TimelinePlugin.StickyScroller(_this.spreadsheet.layout.bodyScroller.enhancedScroll, _this.isRtl, true // isVertical
            );
            _this.spreadsheet.receiveProps({
                superHeaderText: _this.superHeaderText,
                colSpecs: _this.colSpecs
            });
            // Component...
            context.calendar.registerInteractiveComponent(_this, {
                el: _this.timeAxis.slats.el
            });
            return _this;
        }
        ResourceTimelineView.prototype.renderSkeletonHtml = function () {
            var theme = this.theme;
            return "<table class=\"" + theme.getClass('tableGrid') + "\"> <thead class=\"fc-head\"> <tr> <td class=\"fc-resource-area " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-divider fc-col-resizer " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-time-area " + theme.getClass('widgetHeader') + "\"></td> </tr> </thead> <tbody class=\"fc-body\"> <tr> <td class=\"fc-resource-area " + theme.getClass('widgetContent') + "\"></td> <td class=\"fc-divider fc-col-resizer " + theme.getClass('widgetHeader') + "\"></td> <td class=\"fc-time-area " + theme.getClass('widgetContent') + "\"></td> </tr> </tbody> </table>";
        };
        ResourceTimelineView.prototype.render = function (props) {
            _super.prototype.render.call(this, props);
            var splitProps = this.splitter.splitProps(props);
            var hasResourceBusinessHours = this.hasResourceBusinessHours(props.resourceStore);
            this.timeAxis.receiveProps({
                dateProfile: props.dateProfile
            });
            // for all-resource bg events / selections / business-hours
            this.lane.receiveProps(__assign({}, splitProps[''], { dateProfile: props.dateProfile, nextDayThreshold: this.nextDayThreshold, businessHours: hasResourceBusinessHours ? null : props.businessHours }));
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
                return new GroupRow(this.context, spreadsheetTbody, spreadsheetNext, timeAxisTbody, timeAxisNext);
            }
            else if (node.resource) {
                return new ResourceRow(this.context, spreadsheetTbody, spreadsheetNext, timeAxisTbody, timeAxisNext, this.timeAxis);
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
                    rowComponent.receiveProps(__assign({}, splitProps[resource.id], { dateProfile: dateProfile, nextDayThreshold: this.nextDayThreshold, businessHours: resource.businessHours || fallbackBusinessHours, colSpecs: this.colSpecs, id: rowNode.id, rowSpans: rowNode.rowSpans, depth: rowNode.depth, isExpanded: rowNode.isExpanded, hasChildren: rowNode.hasChildren, resource: rowNode.resource }));
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
                this.rowPositions = new core.PositionCache(this.timeAxis.slats.el, this.rowComponents.map(function (rowComponent) {
                    return rowComponent.timeAxisTr;
                }), false, // isHorizontal
                true // isVertical
                );
                this.rowPositions.build();
                this.isStickyScrollDirty = true;
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
                    var height = el.getBoundingClientRect().height;
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
            for (var _b = 0, _c = this.resourceAreaWidthDraggings; _b < _c.length; _b++) {
                var resourceAreaWidthDragging = _c[_b];
                resourceAreaWidthDragging.destroy();
            }
            this.spreadsheetBodyStickyScroller.destroy();
            _super.prototype.destroy.call(this);
            this.calendar.unregisterInteractiveComponent(this);
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
                __assign(scroll, this.queryResourceScroll());
            }
            return scroll;
        };
        ResourceTimelineView.prototype.applyScroll = function (scroll, isResize) {
            _super.prototype.applyScroll.call(this, scroll, isResize);
            if (this.props.resourceStore) {
                this.applyResourceScroll(scroll);
            }
            // avoid updating stickyscroll too often
            if (isResize || this.isStickyScrollDirty) {
                this.isStickyScrollDirty = false;
                this.spreadsheetBodyStickyScroller.updateSize();
                this.timeAxis.updateStickyScrollers();
            }
        };
        ResourceTimelineView.prototype.computeDateScroll = function (timeMs) {
            return this.timeAxis.computeDateScroll(timeMs);
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
        ResourceTimelineView.prototype.buildPositionCaches = function () {
            this.timeAxis.slats.updateSize();
            this.rowPositions.build();
        };
        ResourceTimelineView.prototype.queryHit = function (positionLeft, positionTop) {
            var rowPositions = this.rowPositions;
            var slats = this.timeAxis.slats;
            var rowIndex = rowPositions.topToIndex(positionTop);
            if (rowIndex != null) {
                var resource = this.rowNodes[rowIndex].resource;
                if (resource) { // not a group
                    var slatHit = slats.positionToHit(positionLeft);
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
        };
        // Resource Area
        // ------------------------------------------------------------------------------------------------------------------
        ResourceTimelineView.prototype.setResourceAreaWidth = function (widthVal) {
            this.resourceAreaWidth = widthVal;
            core.applyStyleProp(this.resourceAreaHeadEl, 'width', widthVal || '');
        };
        ResourceTimelineView.prototype.initResourceAreaWidthDragging = function () {
            var _this = this;
            var resourceAreaDividerEls = Array.prototype.slice.call(this.el.querySelectorAll('.fc-col-resizer'));
            var ElementDraggingImpl = this.calendar.pluginSystem.hooks.elementDraggingImpl;
            if (ElementDraggingImpl) {
                this.resourceAreaWidthDraggings = resourceAreaDividerEls.map(function (el) {
                    var dragging = new ElementDraggingImpl(el);
                    var dragStartWidth;
                    var viewWidth;
                    dragging.emitter.on('dragstart', function () {
                        dragStartWidth = _this.resourceAreaWidth;
                        if (typeof dragStartWidth !== 'number') {
                            dragStartWidth = _this.resourceAreaHeadEl.getBoundingClientRect().width;
                        }
                        viewWidth = _this.el.getBoundingClientRect().width;
                    });
                    dragging.emitter.on('dragmove', function (pev) {
                        var newWidth = dragStartWidth + pev.deltaX * (_this.isRtl ? -1 : 1);
                        newWidth = Math.max(newWidth, MIN_RESOURCE_AREA_WIDTH);
                        newWidth = Math.min(newWidth, viewWidth - MIN_RESOURCE_AREA_WIDTH);
                        _this.setResourceAreaWidth(newWidth);
                    });
                    dragging.setAutoScrollEnabled(false); // because gets weird with auto-scrolling time area
                    return dragging;
                });
            }
        };
        ResourceTimelineView.needsResourceData = true; // for ResourceViewProps
        return ResourceTimelineView;
    }(core.View));
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

    var main = core.createPlugin({
        deps: [ResourceCommonPlugin__default, TimelinePlugin__default],
        defaultView: 'resourceTimelineDay',
        views: {
            resourceTimeline: {
                class: ResourceTimelineView,
                resourceAreaWidth: '30%',
                resourcesInitiallyExpanded: true,
                eventResizableFromStart: true // TODO: not DRY with this same setting in the main timeline config
            },
            resourceTimelineDay: {
                type: 'resourceTimeline',
                duration: { days: 1 }
            },
            resourceTimelineWeek: {
                type: 'resourceTimeline',
                duration: { weeks: 1 }
            },
            resourceTimelineMonth: {
                type: 'resourceTimeline',
                duration: { months: 1 }
            },
            resourceTimelineYear: {
                type: 'resourceTimeline',
                duration: { years: 1 }
            }
        }
    });

    exports.ResourceTimelineView = ResourceTimelineView;
    exports.default = main;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
