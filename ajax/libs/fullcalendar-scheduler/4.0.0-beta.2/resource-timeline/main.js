/*!
@fullcalendar/resource-timeline v4.0.0-beta.2
Docs & License: https://fullcalendar.io/scheduler/
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

    /*
    A rectangular area of content that lives within a Scroller.
    Can have "gutters", areas of dead spacing around the perimeter.
    Also very useful for forcing a width, which a Scroller cannot do alone.
    Has a content area that lives above a background area.
    */
    var ScrollerCanvas = /** @class */ (function () {
        function ScrollerCanvas() {
            this.gutters = {};
            this.el = core.htmlToElement("<div class=\"fc-scroller-canvas\"> <div class=\"fc-content\"></div> <div class=\"fc-bg\"></div> </div>");
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
                __assign(this.gutters, gutters);
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
            core.forceClassName(el, 'fc-gutter-left', gutters.left);
            core.forceClassName(el, 'fc-gutter-right', gutters.right);
            core.forceClassName(el, 'fc-gutter-top', gutters.top);
            core.forceClassName(el, 'fc-gutter-bottom', gutters.bottom);
            core.applyStyle(el, {
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
            core.applyStyle(this.bgEl, {
                left: gutters.left || '',
                right: gutters.right || '',
                top: gutters.top || '',
                bottom: gutters.bottom || ''
            });
        };
        return ScrollerCanvas;
    }());

    var EnhancedScroller = /** @class */ (function (_super) {
        __extends(EnhancedScroller, _super);
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
            _this.requestMovingEnd = core.debounce(_this.reportMovingEnd, 500);
            _this.canvas = new ScrollerCanvas();
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
                this.el.addEventListener('touchmove', (this.preventTouchScrollHandler = core.preventDefault));
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
            this.el.addEventListener('touchstart', this.reportTouchStart, { passive: true });
            this.el.addEventListener('touchend', this.reportTouchEnd);
        };
        EnhancedScroller.prototype.unbindHandlers = function () {
            this.el.removeEventListener('scroll', this.reportScroll);
            this.el.removeEventListener('touchstart', this.reportTouchStart, { passive: true });
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
    }(core.ScrollComponent));
    core.EmitterMixin.mixInto(EnhancedScroller);
    // Horizontal Scroll System Detection
    // ----------------------------------------------------------------------------------------------
    var _rtlScrollSystem;
    function getRtlScrollSystem() {
        return _rtlScrollSystem || (_rtlScrollSystem = detectRtlScrollSystem());
    }
    function detectRtlScrollSystem() {
        var el = core.htmlToElement("<div style=\" position: absolute; top: -1000px; width: 1px; height: 1px; overflow: scroll; direction: rtl; font-size: 100px; \">A</div>");
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
        core.removeElement(el);
        return system;
    }

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
            this.enhancedScroll = new EnhancedScroller(overflowX, overflowY);
            parentEl.appendChild(this.el = core.createElement('div', {
                className: 'fc-scroller-clip'
            }));
            this.el.appendChild(this.enhancedScroll.el);
        }
        ClippedScroller.prototype.destroy = function () {
            core.removeElement(this.el);
        };
        ClippedScroller.prototype.updateSize = function () {
            var enhancedScroll = this.enhancedScroll;
            var scrollEl = enhancedScroll.el;
            var edges = core.computeEdges(scrollEl);
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
            core.applyStyle(scrollEl, cssProps);
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

    var HeaderBodyLayout = /** @class */ (function () {
        /*
        verticalScroll = 'auto' | 'clipped-scroll'
        */
        function HeaderBodyLayout(headerContainerEl, bodyContainerEl, verticalScroll) {
            this.headerScroller = new ClippedScroller('clipped-scroll', 'hidden', headerContainerEl);
            this.bodyScroller = new ClippedScroller('auto', verticalScroll, bodyContainerEl);
            this.scrollJoiner = new ScrollJoiner('horizontal', [
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

    var TimelineHeader = /** @class */ (function (_super) {
        __extends(TimelineHeader, _super);
        function TimelineHeader(context, parentEl) {
            var _this = _super.call(this, context) || this;
            parentEl.appendChild(_this.tableEl = core.createElement('table', {
                className: _this.theme.getClass('tableGrid')
            }));
            return _this;
        }
        TimelineHeader.prototype.destroy = function () {
            core.removeElement(this.tableEl);
            _super.prototype.destroy.call(this);
        };
        TimelineHeader.prototype.render = function (props) {
            this.renderDates(props.tDateProfile);
        };
        TimelineHeader.prototype.renderDates = function (tDateProfile) {
            var _a = this, dateEnv = _a.dateEnv, theme = _a.theme;
            var cellRows = tDateProfile.cellRows;
            var lastRow = cellRows[cellRows.length - 1];
            var isChrono = core.asRoughMs(tDateProfile.labelInterval) > core.asRoughMs(tDateProfile.slotDuration);
            var oneDay = core.isSingleDay(tDateProfile.slotDuration);
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
                        headerCellClassNames = headerCellClassNames.concat(core.getDayClasses(cell.date, this.props.dateProfile, this.context, true) // adds "today" class and other day-based classes
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
            this.slatColEls = core.findElements(this.tableEl, 'col');
            this.innerEls = core.findElements(this.tableEl.querySelector('tr:last-child'), // compound selector won't work because of query-root problem
            'th .fc-cell-text');
        };
        return TimelineHeader;
    }(core.Component));

    var TimelineSlats = /** @class */ (function (_super) {
        __extends(TimelineSlats, _super);
        function TimelineSlats(context, parentEl) {
            var _this = _super.call(this, context) || this;
            parentEl.appendChild(_this.el = core.createElement('div', { className: 'fc-slats' }));
            return _this;
        }
        TimelineSlats.prototype.destroy = function () {
            core.removeElement(this.el);
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
            this.slatColEls = core.findElements(this.el, 'col');
            this.slatEls = core.findElements(this.el, 'td');
            this.outerCoordCache = new core.PositionCache(this.el, this.slatEls, true, // isHorizontal
            false // isVertical
            );
            // for the inner divs within the slats
            // used for event rendering and scrollTime, to disregard slat border
            this.innerCoordCache = new core.PositionCache(this.el, core.findChildren(this.slatEls, 'div'), true, // isHorizontal
            false // isVertical
            );
        };
        TimelineSlats.prototype.slatCellHtml = function (date, isEm, tDateProfile) {
            var _a = this, theme = _a.theme, dateEnv = _a.dateEnv;
            var classes;
            if (tDateProfile.isTimeScale) {
                classes = [];
                classes.push(core.isInt(dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.labelInterval)) ?
                    'fc-major' :
                    'fc-minor');
            }
            else {
                classes = core.getDayClasses(date, this.props.dateProfile, this.context);
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
                var start = this.dateEnv.add(tDateProfile.slotDates[slatIndex], core.multiplyDuration(tDateProfile.snapDuration, localSnapIndex));
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
    }(core.Component));

    var MIN_AUTO_LABELS = 18; // more than `12` months but less that `24` hours
    var MAX_AUTO_SLOTS_PER_LABEL = 6; // allows 6 10-min slots in an hour
    var MAX_AUTO_CELLS = 200; // allows 4-days to have a :30 slot duration
    core.config.MAX_TIMELINE_SLOTS = 1000;
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
            return core.createFormatter(rawFormat);
        });
        tDateProfile.isTimeScale = Boolean(tDateProfile.slotDuration.milliseconds);
        var largeUnit = null;
        if (!tDateProfile.isTimeScale) {
            var slotUnit = core.greatestDurationDenominator(tDateProfile.slotDuration).unit;
            if (/year|month|week/.test(slotUnit)) {
                largeUnit = slotUnit;
            }
        }
        tDateProfile.largeUnit = largeUnit;
        tDateProfile.emphasizeWeeks =
            core.isSingleDay(tDateProfile.slotDuration) &&
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
            snapDuration = core.createDuration(rawSnapDuration);
            snapsPerSlot = core.wholeDivideDurations(tDateProfile.slotDuration, snapDuration);
            // ^ TODO: warning if not whole?
        }
        if (snapsPerSlot == null) {
            snapDuration = tDateProfile.slotDuration;
            snapsPerSlot = 1;
        }
        tDateProfile.snapDuration = snapDuration;
        tDateProfile.snapsPerSlot = snapsPerSlot;
        // more...
        var timeWindowMs = core.asRoughMs(dateProfile.maxTime) - core.asRoughMs(dateProfile.minTime);
        // TODO: why not use normalizeRange!?
        var normalizedStart = normalizeDate(dateProfile.renderRange.start, tDateProfile, dateEnv);
        var normalizedEnd = normalizeDate(dateProfile.renderRange.end, tDateProfile, dateEnv);
        // apply minTime/maxTime
        // TODO: View should be responsible.
        if (tDateProfile.isTimeScale) {
            normalizedStart = dateEnv.add(normalizedStart, dateProfile.minTime);
            normalizedEnd = dateEnv.add(core.addDays(normalizedEnd, -1), dateProfile.maxTime);
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
    /*
    snaps to appropriate unit
    */
    function normalizeDate(date, tDateProfile, dateEnv) {
        var normalDate = date;
        if (!tDateProfile.isTimeScale) {
            normalDate = core.startOfDay(normalDate);
            if (tDateProfile.largeUnit) {
                normalDate = dateEnv.startOf(normalDate, tDateProfile.largeUnit);
            }
        }
        return normalDate;
    }
    function isValidDate(date, tDateProfile, dateProfile, view) {
        if (view.dateProfileGenerator.isHiddenDay(date)) {
            return false;
        }
        else if (tDateProfile.isTimeScale) {
            // determine if the time is within minTime/maxTime, which may have wacky values
            var day = core.startOfDay(date);
            var timeMs = date.valueOf() - day.valueOf();
            var ms = timeMs - core.asRoughMs(dateProfile.minTime); // milliseconds since minTime
            ms = ((ms % 86400000) + 86400000) % 86400000; // make negative values wrap to 24hr clock
            return ms < tDateProfile.timeWindowMs; // before the maxTime?
        }
        else {
            return true;
        }
    }
    function queryDurationOption(view, name) {
        var input = view.opt(name);
        if (input != null) {
            return core.createDuration(input);
        }
    }
    function validateLabelAndSlot(tDateProfile, dateProfile, dateEnv) {
        var currentRange = dateProfile.currentRange;
        // make sure labelInterval doesn't exceed the max number of cells
        if (tDateProfile.labelInterval) {
            var labelCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, tDateProfile.labelInterval);
            if (labelCnt > core.config.MAX_TIMELINE_SLOTS) {
                console.warn('slotLabelInterval results in too many cells');
                tDateProfile.labelInterval = null;
            }
        }
        // make sure slotDuration doesn't exceed the maximum number of cells
        if (tDateProfile.slotDuration) {
            var slotCnt = dateEnv.countDurationsBetween(currentRange.start, currentRange.end, tDateProfile.slotDuration);
            if (slotCnt > core.config.MAX_TIMELINE_SLOTS) {
                console.warn('slotDuration results in too many cells');
                tDateProfile.slotDuration = null;
            }
        }
        // make sure labelInterval is a multiple of slotDuration
        if (tDateProfile.labelInterval && tDateProfile.slotDuration) {
            var slotsPerLabel = core.wholeDivideDurations(tDateProfile.labelInterval, tDateProfile.slotDuration);
            if (slotsPerLabel === null || slotsPerLabel < 1) {
                console.warn('slotLabelInterval must be a multiple of slotDuration');
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
                    var tryLabelInterval = core.createDuration(input);
                    var slotsPerLabel = core.wholeDivideDurations(tryLabelInterval, tDateProfile.slotDuration);
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
                    labelInterval = core.createDuration(input);
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
                var trySlotDuration = core.createDuration(input);
                var slotsPerLabel = core.wholeDivideDurations(labelInterval, trySlotDuration);
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
        var unit = core.greatestDurationDenominator(labelInterval).unit;
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
                if ((core.asRoughMinutes(labelInterval) / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                    format0 = {
                        hour: 'numeric',
                        meridiem: 'short'
                    };
                    format1 = function (params) {
                        return ':' + core.padStart(params.date.minute, 2); // ':30'
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
                if ((core.asRoughSeconds(labelInterval) / 60) >= MAX_AUTO_SLOTS_PER_LABEL) {
                    format0 = { hour: 'numeric', minute: '2-digit', meridiem: 'lowercase' }; // '8:30 PM'
                    format1 = function (params) {
                        return ':' + core.padStart(params.date.second, 2); // ':30'
                    };
                }
                else {
                    format0 = { hour: 'numeric', minute: '2-digit', second: '2-digit', meridiem: 'lowercase' }; // '8:30:45 PM'
                }
                break;
            case 'millisecond':
                format0 = { hour: 'numeric', minute: '2-digit', second: '2-digit', meridiem: 'lowercase' }; // '8:30:45 PM'
                format1 = function (params) {
                    return '.' + core.padStart(params.millisecond, 3);
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
            res = core.diffWholeDays(range.start, range.end);
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
                        core.isInt(dateEnv.countDurationsBetween(tDateProfile.normalizedRange.start, date, tDateProfile.labelInterval))) {
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
        var spanHtml = core.buildGotoAnchorHtml(view, {
            date: date,
            type: rowUnit,
            forceOff: !rowUnit
        }, {
            'class': 'fc-cell-text'
        }, core.htmlEscape(text));
        return { text: text, spanHtml: spanHtml, date: date, colspan: 1, isWeekStart: false };
    }

    var TimelineNowIndicator = /** @class */ (function () {
        function TimelineNowIndicator(headParent, bodyParent) {
            this.headParent = headParent;
            this.bodyParent = bodyParent;
        }
        TimelineNowIndicator.prototype.render = function (coord, isRtl) {
            var styleProps = isRtl ? { right: -coord } : { left: coord };
            this.headParent.appendChild(this.arrowEl = core.createElement('div', {
                className: 'fc-now-indicator fc-now-indicator-arrow',
                style: styleProps
            }));
            this.bodyParent.appendChild(this.lineEl = core.createElement('div', {
                className: 'fc-now-indicator fc-now-indicator-line',
                style: styleProps
            }));
        };
        TimelineNowIndicator.prototype.unrender = function () {
            if (this.arrowEl) {
                core.removeElement(this.arrowEl);
            }
            if (this.lineEl) {
                core.removeElement(this.lineEl);
            }
        };
        return TimelineNowIndicator;
    }());

    var TimeAxis = /** @class */ (function (_super) {
        __extends(TimeAxis, _super);
        function TimeAxis(context, headerContainerEl, bodyContainerEl) {
            var _this = _super.call(this, context) || this;
            var layout = _this.layout = new HeaderBodyLayout(headerContainerEl, bodyContainerEl, 'auto');
            _this.header = new TimelineHeader(context, layout.headerScroller.enhancedScroll.canvas.contentEl);
            _this.slats = new TimelineSlats(context, layout.bodyScroller.enhancedScroll.canvas.bgEl);
            _this.nowIndicator = new TimelineNowIndicator(layout.headerScroller.enhancedScroll.canvas.el, layout.bodyScroller.enhancedScroll.canvas.el);
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
                buildTimelineDateProfile(props.dateProfile, this.view); // TODO: cache
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
                buildTimelineDateProfile(dateProfile, this.view); // TODO: cache
            if (tDateProfile.isTimeScale) {
                return core.greatestDurationDenominator(tDateProfile.slotDuration).unit;
            }
        };
        // will only execute if isTimeScale
        TimeAxis.prototype.renderNowIndicator = function (date) {
            if (core.rangeContainsMarker(this.tDateProfile.normalizedRange, date)) {
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
            var slotsPerLabel = core.wholeDivideDurations(tDateProfile.labelInterval, tDateProfile.slotDuration);
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
                if (core.isInt(snapCoverage)) { // not an in-between value
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
                    scrollTime = core.createDuration(scrollTime);
                    left = this.dateToCoord(dateEnv.add(core.startOfDay(dateProfile.activeRange.start), // startOfDay needed?
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
    }(core.Component));

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
            classList.add(isRtl ? LEFT_TRIANGLE_ICON : RIGHT_TRIANGLE_ICON);
        }
    }
    function clearExpanderIcon(el) {
        var classList = el.classList;
        classList.remove(LEFT_TRIANGLE_ICON);
        classList.remove(RIGHT_TRIANGLE_ICON);
        classList.remove(DOWN_TRIANGLE_ICON);
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
            updateExpanderIcon(this.expanderIconEl, isExpanded, this.isRtl);
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
            if (expanderIconEl) {
                if (hasChildren) {
                    expanderEl.addEventListener('click', this.onExpanderClick);
                    expanderEl.classList.add('fc-expander');
                    updateExpanderIcon(expanderIconEl, isExpanded, this.isRtl);
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

    var SpreadsheetHeader = /** @class */ (function (_super) {
        __extends(SpreadsheetHeader, _super);
        function SpreadsheetHeader(context, parentEl) {
            var _this = _super.call(this, context) || this;
            parentEl.appendChild(_this.tableEl = core.createElement('table', {
                className: _this.theme.getClass('tableGrid')
            }));
            return _this;
        }
        SpreadsheetHeader.prototype.destroy = function () {
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
        };
        return SpreadsheetHeader;
    }(core.Component));

    var Spreadsheet = /** @class */ (function (_super) {
        __extends(Spreadsheet, _super);
        function Spreadsheet(context, headParentEl, bodyParentEl) {
            var _this = _super.call(this, context) || this;
            _this._renderCells = core.memoizeRendering(_this.renderCells, _this.unrenderCells);
            _this.layout = new HeaderBodyLayout(headParentEl, bodyParentEl, 'clipped-scroll');
            _this.header = new SpreadsheetHeader(context, _this.layout.headerScroller.enhancedScroll.canvas.contentEl);
            _this.layout.bodyScroller.enhancedScroll.canvas.contentEl
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
    }(core.Component));

    var ResourceTimelineView = /** @class */ (function (_super) {
        __extends(ResourceTimelineView, _super);
        function ResourceTimelineView(context, viewSpec, dateProfileGenerator, parentEl) {
            var _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this;
            _this.rowNodes = [];
            _this.rowComponents = [];
            _this.rowComponentsById = {};
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
            _this.miscHeight = _this.el.offsetHeight;
            _this.spreadsheet = new Spreadsheet(_this.context, _this.el.querySelector('thead .fc-resource-area'), _this.el.querySelector('tbody .fc-resource-area'));
            _this.timeAxis = new TimeAxis(_this.context, _this.el.querySelector('thead .fc-time-area'), _this.el.querySelector('tbody .fc-time-area'));
            var timeAxisRowContainer = core.createElement('div', { className: 'fc-rows' }, '<table><tbody /></table>');
            _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.contentEl.appendChild(timeAxisRowContainer);
            _this.timeAxisTbody = timeAxisRowContainer.querySelector('tbody');
            _this.lane = new TimelinePlugin.TimelineLane(_this.context, null, _this.timeAxis.layout.bodyScroller.enhancedScroll.canvas.bgEl, _this.timeAxis);
            _this.bodyScrollJoiner = new TimelinePlugin.ScrollJoiner('vertical', [
                _this.spreadsheet.layout.bodyScroller,
                _this.timeAxis.layout.bodyScroller
            ]);
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
